#!/usr/bin/env node
import { spawnSync } from 'node:child_process';
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const requiredPaths = ['SKILL.md', 'VERSION', 'README.md', 'LICENCE.md', 'DECISIONS.md', 'package.json', 'agents/openai.yaml', 'references/creation-projet.md', 'references/creation-verrouillee.md', 'references/controle-cloture-feature.md', 'references/protocole-securite.md', 'references/passation-session.md', 'references/modes.md', 'references/mode-audit.md', 'references/gabarits-audit.md', 'references/protocole-preuves.md', 'references/securite-avancee.md', 'references/qualite-livraison.md', 'references/audit-skills-installes.md', 'references/entretien-developpement.md', 'references/gabarit-cadrage-developpement.md', 'references/cycle-developpement.md', 'references/nettoyage-contenu.md', 'references/gabarit-preuves-livraison.md', 'references/fiabilite-raisonnement.md', 'references/formats-reponses.md', 'references/gestion-decisions.md', 'references/composition-skills.md', 'references/gestion-contexte.md', 'references/boucle-apprentissage.md', 'references/garde-fous.md', 'references/delegation.md', 'references/analyse-impact.md', 'references/reconnaissance-projet.md', 'references/traceabilite.md', 'references/definition-terminaison.md', 'references/verification-sources.md', 'references/outils-externes.md', 'references/gestion-version-skill.md', 'scripts/check_bougskills_update.mjs', 'scripts/score_bougskills.mjs', 'scripts/clean_content.mjs', 'tests/test_score_bougskills.test.mjs', 'tests/test_clean_content.test.mjs', 'tests/test_update_archive.test.mjs', 'tests/scenarios.md'];
const secretPattern = /(ghp_[A-Za-z0-9]{20,}|github_pat_[A-Za-z0-9_]{20,}|sk-[A-Za-z0-9]{20,}|-----BEGIN (RSA|OPENSSH|EC|DSA) PRIVATE KEY-----)/i;
function walkMarkdown(directory) {
  const files = [];
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    if (entry.name === '.git' || entry.name === 'node_modules') continue;
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...walkMarkdown(absolute));
    else if (entry.isFile() && entry.name.endsWith('.md')) files.push(absolute);
  }
  return files;
}

export function validateRoot(root) {
  const errors = [];
  for (const relative of requiredPaths) if (!existsSync(path.join(root, relative))) errors.push(`Fichier ou dossier manquant : ${relative}`);
  try {
    const version = readFileSync(path.join(root, 'VERSION'), 'utf8').trim();
    const packageJson = JSON.parse(readFileSync(path.join(root, 'package.json'), 'utf8'));
    if (packageJson.version !== version) errors.push(`Version incohérente : VERSION=${version}, package.json=${packageJson.version}`);
    if (!packageJson.engines?.node || Number(packageJson.engines.node.match(/\d+/)?.[0] || 0) < 18) errors.push('package.json doit déclarer Node.js 18 ou supérieur.');
  } catch (error) {
    errors.push(`Métadonnées de version invalides : ${error.message}`);
  }
  const skillPath = path.join(root, 'SKILL.md');
  if (existsSync(skillPath)) {
    const text = readFileSync(skillPath, 'utf8');
    const frontmatter = text.match(/^---[ \t]*\r?\n([\s\S]*?)\r?\n---[ \t]*(?:\r?\n|$)/m);
    if (!frontmatter || !/^name:[ \t]*bougskills[ \t]*$/m.test(frontmatter[1]) || !/^description:[ \t]*\S.*$/m.test(frontmatter[1])) {
      errors.push('Frontmatter SKILL.md invalide ou incomplet.');
    }
  }
  for (const file of walkMarkdown(root)) {
    const text = readFileSync(file, 'utf8');
    if (secretPattern.test(text)) errors.push(`Motif de secret potentiel dans : ${path.relative(root, file)}`);
    for (const match of text.matchAll(/\]\(([^)#?]+)\)/g)) {
      const link = match[1].trim();
      if (/^(https?:\/\/|mailto:|#)/i.test(link) || (link.startsWith('<') && link.endsWith('>'))) continue;
      if (!existsSync(path.resolve(path.dirname(file), link))) errors.push(`Lien interne introuvable dans ${path.basename(file)} : ${link}`);
    }
  }
  const git = process.platform === 'win32' ? 'git.exe' : 'git';
  const inside = spawnSync(git, ['-C', root, 'rev-parse', '--is-inside-work-tree'], { encoding: 'utf8' });
  if (inside.status === 0 && inside.stdout.trim() === 'true') {
    const diff = spawnSync(git, ['-C', root, 'diff', '--check'], { encoding: 'utf8' });
    if (diff.status !== 0) errors.push(`git diff --check a détecté un problème : ${(diff.stdout + diff.stderr).trim()}`);
  }
  return errors;
}

function main(argv) {
  let root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
  for (let i = 0; i < argv.length; i += 1) {
    if (argv[i] === '--root' && argv[i + 1]) root = path.resolve(argv[++i]);
    else if (argv[i] === '--help' || argv[i] === '-h') {
      console.log('Usage: node scripts/verify_bougskills.mjs [--root PATH]');
      return 0;
    } else { console.error(`Option inconnue : ${argv[i]}`); return 2; }
  }
  if (!existsSync(root) || !statSync(root).isDirectory()) { console.error(`Dossier introuvable : ${root}`); return 2; }
  const errors = validateRoot(root);
  if (errors.length) { console.error(errors.map((error) => `- ${error}`).join('\n')); return 1; }
  console.log('BougSkills valide : structure, références, liens, frontmatter et scan de secrets passés.');
  return 0;
}

if (import.meta.url === pathToFileURL(path.resolve(process.argv[1] || '')).href) process.exitCode = main(process.argv.slice(2));
