#!/usr/bin/env node
import { mkdtemp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { extractArchive } from '../scripts/check_bougskills_update.mjs';
import { validateRoot } from '../scripts/verify_bougskills.mjs';

const archiveUrl = 'https://github.com/MasterBougli/bougskills/archive/refs/heads/main.tar.gz';
const maxBytes = 30 * 1024 * 1024;

async function main(argv) {
  if (argv.length && argv[0] !== '--help' && argv[0] !== '-h') throw new Error(`Option inconnue : ${argv[0]}`);
  if (argv.length) {
    console.log('Usage: npm run test:archive');
    return 0;
  }
  console.log('Requête GET publique vers GitHub (redirection possible vers codeload.github.com).');
  console.log('Seuls l’URL et un User-Agent générique sont envoyés ; aucun fichier local, secret ou credential. Aucun remplacement de skill.');
  const response = await fetch(archiveUrl, {
    signal: AbortSignal.timeout(30000),
    headers: { 'User-Agent': 'BougSkills-public-archive-test' },
  });
  if (!response.ok) throw new Error(`GitHub a répondu HTTP ${response.status}.`);
  const finalUrl = new URL(response.url);
  if (finalUrl.protocol !== 'https:' || !['github.com', 'codeload.github.com'].includes(finalUrl.hostname)) {
    throw new Error(`Hôte final inattendu : ${finalUrl.host}`);
  }
  const announcedLength = Number(response.headers.get('content-length') || 0);
  if (announcedLength > maxBytes) throw new Error('L’archive dépasse 30 Mio.');
  const chunks = [];
  let received = 0;
  for await (const chunk of response.body) {
    received += chunk.byteLength;
    if (received > maxBytes) throw new Error('L’archive dépasse 30 Mio.');
    chunks.push(Buffer.from(chunk));
  }

  const tempRoot = await mkdtemp(path.join(os.tmpdir(), 'bougskills-public-archive-'));
  try {
    const archivePath = path.join(tempRoot, 'bougskills.tar.gz');
    const extractPath = path.join(tempRoot, 'extract');
    await writeFile(archivePath, Buffer.concat(chunks));
    await mkdir(extractPath);
    const source = await extractArchive(archivePath, extractPath);
    const errors = validateRoot(source);
    if (errors.length) throw new Error(`Structure de l’archive invalide :\n${errors.join('\n')}`);
    const version = (await readFile(path.join(source, 'VERSION'), 'utf8')).trim();
    const packageJson = JSON.parse(await readFile(path.join(source, 'package.json'), 'utf8'));
    if (packageJson.version !== version) throw new Error('La version distante de package.json ne correspond pas à VERSION.');
    console.log(`Archive validée : hôte=${finalUrl.hostname}, octets=${received}, version=${version}.`);
    console.log('L’archive a été extraite et validée dans un dossier temporaire, puis sera supprimée ; aucune installation modifiée.');
    return 0;
  } finally {
    await rm(tempRoot, { recursive: true, force: true });
  }
}

if (import.meta.url === pathToFileURL(path.resolve(process.argv[1] || '')).href) {
  main(process.argv.slice(2)).then((code) => { process.exitCode = code; }).catch((error) => {
    console.error(`Échec du contrôle d’archive publique : ${error.message}`);
    process.exitCode = 2;
  });
}
