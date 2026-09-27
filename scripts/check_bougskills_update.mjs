#!/usr/bin/env node
import { spawnSync } from 'node:child_process';
import { cp, lstat, mkdir, mkdtemp, readFile, readdir, realpath, rename, rm, stat, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { randomUUID } from 'node:crypto';
import { gunzipSync } from 'node:zlib';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { validateRoot } from './verify_bougskills.mjs';

const repository = 'https://github.com/MasterBougli/bougskills';
const defaultRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const MAX_ARCHIVE_BYTES = 30 * 1024 * 1024;
const MAX_EXPANDED_BYTES = 128 * 1024 * 1024;
const MAX_ARCHIVE_MEMBERS = 20000;
const MAX_MEMBER_BYTES = 64 * 1024 * 1024;

function parseVersion(value, source) {
  const trimmed = value.trim();
  if (!/^\d+\.\d+\.\d+$/.test(trimmed)) throw new Error(`Version SemVer invalide dans ${source} : ${trimmed}`);
  return trimmed.split('.').map(Number);
}

function compareVersions(left, right) {
  for (let index = 0; index < 3; index += 1) {
    if (left[index] !== right[index]) return left[index] - right[index];
  }
  return 0;
}

async function fetchText(url) {
  const response = await fetch(url, { signal: AbortSignal.timeout(15000), headers: { 'User-Agent': 'BougSkills-version-check' } });
  if (!response.ok) throw new Error(`GitHub a répondu HTTP ${response.status} pour ${url}`);
  return response.text();
}

export function inspectTarGz(archive) {
  let tar;
  try { tar = gunzipSync(archive, { maxOutputLength: MAX_EXPANDED_BYTES }); }
  catch { throw new Error('Archive gzip invalide ou volume décompressé supérieur à 128 Mio.'); }
  const members = [];
  let offset = 0;
  let totalPayload = 0;
  while (offset + 512 <= tar.length) {
    const header = tar.subarray(offset, offset + 512);
    if (header.every((byte) => byte === 0)) break;
    const readString = (start, end) => header.subarray(start, end).toString('utf8').replace(/\0.*$/s, '');
    const name = readString(0, 100);
    const prefix = readString(345, 500);
    const member = prefix ? `${prefix}/${name}` : name;
    const type = String.fromCharCode(header[156] || 48);
    const sizeText = readString(124, 136).trim();
    if (!/^[0-7]+$/.test(sizeText || '0')) throw new Error(`Taille tar invalide pour ${member || '(sans nom)'}.`);
    const size = Number.parseInt(sizeText || '0', 8);
    if (!Number.isSafeInteger(size) || size > MAX_MEMBER_BYTES) throw new Error(`Entrée trop volumineuse dans l’archive : ${member}`);
    if (!['0', '\0', '5'].includes(type)) throw new Error(`Type d’entrée tar non pris en charge : ${member}`);
    const normalized = member.replaceAll('\\', '/');
    const parts = normalized.split('/').filter((part) => part && part !== '.');
    if (!parts.length || normalized.startsWith('/') || parts.includes('..') || parts[0].includes(':')) {
      throw new Error(`Chemin dangereux détecté dans l'archive : ${member}`);
    }
    members.push({ member, parts, size, type });
    if (members.length > MAX_ARCHIVE_MEMBERS) throw new Error('L’archive contient plus de 20 000 entrées.');
    totalPayload += size;
    if (totalPayload > MAX_EXPANDED_BYTES) throw new Error('Le volume des fichiers de l’archive dépasse 128 Mio.');
    offset += 512 + Math.ceil(size / 512) * 512;
  }
  if (!members.length || offset > tar.length) throw new Error('Archive tar tronquée ou vide.');
  return members;
}

async function extractArchive(archivePath, extractPath) {
  const archive = await readFile(archivePath);
  if (archive.byteLength > MAX_ARCHIVE_BYTES) throw new Error('L’archive dépasse la taille maximale autorisée de 30 Mio.');
  const inspected = inspectTarGz(archive);
  const list = spawnSync('tar', ['-tf', archivePath], { encoding: 'utf8' });
  if (list.status !== 0) throw new Error(`Impossible de lire l'archive avec tar : ${(list.stderr || '').trim()}`);
  const members = list.stdout.split(/\r?\n/).filter(Boolean);
  if (members.length !== inspected.length) throw new Error('Le contenu tar ne correspond pas à sa liste de membres pré-vérifiée.');
  const verbose = spawnSync('tar', ['-tvf', archivePath], { encoding: 'utf8' });
  if (verbose.status !== 0) throw new Error(`Impossible d’inspecter les types de fichiers de l’archive : ${(verbose.stderr || '').trim()}`);
  if (verbose.stdout.split(/\r?\n/).some((line) => /^[lh]/.test(line))) throw new Error('Les liens symboliques ou physiques sont refusés dans l’archive.');
  const roots = new Set();
  for (const member of members) {
    const normalized = member.replaceAll('\\', '/');
    const parts = normalized.split('/').filter((part) => part && part !== '.');
    roots.add(parts[0]);
  }
  if (roots.size !== 1) throw new Error('Structure inattendue : l’archive doit contenir un seul dossier racine.');
  const extracted = spawnSync('tar', ['-xf', archivePath, '-C', extractPath], { encoding: 'utf8' });
  if (extracted.status !== 0) throw new Error(`Extraction impossible : ${(extracted.stderr || '').trim()}`);
  const rootName = [...roots][0];
  if (!/^[A-Za-z0-9._-]*bougskills-[A-Za-z0-9._-]+$/i.test(rootName)) throw new Error('Le dossier racine de l’archive ne correspond pas au dépôt officiel.');
  const source = path.join(extractPath, rootName);
  await rejectSymlinks(source);
  return source;
}

async function rejectSymlinks(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const target = path.join(directory, entry.name);
    const details = await lstat(target);
    if (details.isSymbolicLink()) throw new Error(`Lien symbolique refusé dans l’archive : ${target}`);
    if (details.isDirectory()) await rejectSymlinks(target);
  }
}

function validateInstall(root) {
  const errors = validateRoot(root);
  if (errors.length) throw new Error(`Validation de la copie échouée :\n${errors.join('\n')}`);
}

async function applyUpdate(root, expectedVersion) {
  const tempRoot = await mkdtemp(path.join(os.tmpdir(), 'bougskills-update-'));
  const archivePath = path.join(tempRoot, 'bougskills.tar.gz');
  const extractPath = path.join(tempRoot, 'extract');
  const stagePath = `${root}.stage-${randomUUID()}`;
  const oldPath = `${root}.previous-${randomUUID()}`;
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const backupPath = `${root}.backup-${timestamp}`;
  let movedOld = false;
  try {
    const response = await fetch(`${repository}/archive/refs/heads/main.tar.gz`, {
      signal: AbortSignal.timeout(30000),
      headers: { 'User-Agent': 'BougSkills-updater' },
    });
    if (!response.ok) throw new Error(`Téléchargement GitHub échoué : HTTP ${response.status}`);
    const contentLength = Number(response.headers.get('content-length') || 0);
    if (contentLength > MAX_ARCHIVE_BYTES) throw new Error('L’archive dépasse la taille maximale autorisée de 30 Mio.');
    const reader = response.body.getReader();
    const chunks = [];
    let received = 0;
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      received += value.byteLength;
      if (received > MAX_ARCHIVE_BYTES) {
        await reader.cancel();
        throw new Error('L’archive dépasse la taille maximale autorisée de 30 Mio.');
      }
      chunks.push(Buffer.from(value));
    }
    await writeFile(archivePath, Buffer.concat(chunks));
    await mkdir(extractPath);
    const source = await extractArchive(archivePath, extractPath);
    for (const required of ['SKILL.md', 'VERSION', 'agents', 'references', 'scripts']) {
      try { await stat(path.join(source, required)); }
      catch { throw new Error(`Élément requis absent de l’archive : ${required}`); }
    }
    const archiveVersion = parseVersion(await readFile(path.join(source, 'VERSION'), 'utf8'), 'archive');
    if (compareVersions(archiveVersion, expectedVersion) !== 0) throw new Error('La version de l’archive ne correspond pas à la version distante annoncée.');
    await cp(source, stagePath, { recursive: true, errorOnExist: true });
    await validateInstall(stagePath);
    await cp(root, backupPath, { recursive: true, errorOnExist: true, dereference: false });
    await rename(root, oldPath);
    movedOld = true;
    await rename(stagePath, root);
    try { await validateInstall(root); }
    catch (error) {
      await rm(root, { recursive: true, force: true });
      await rename(oldPath, root);
      movedOld = false;
      throw error;
    }
    await rm(oldPath, { recursive: true, force: true });
    movedOld = false;
    console.log(`Mise à jour appliquée. Sauvegarde : ${backupPath}`);
  } catch (error) {
    if (movedOld) {
      try {
        if (await exists(root)) await rm(root, { recursive: true, force: true });
        await rename(oldPath, root);
        console.error('La copie précédente a été restaurée.');
      } catch (restoreError) {
        console.error(`ÉCHEC DE RESTAURATION. Ancienne copie conservée ici : ${oldPath}. Détail : ${restoreError.message}`);
      }
    }
    throw error;
  } finally {
    await rm(stagePath, { recursive: true, force: true });
    await rm(tempRoot, { recursive: true, force: true });
  }
}

async function exists(target) {
  try { await lstat(target); return true; } catch { return false; }
}

async function main(argv) {
  let root = defaultRoot;
  let apply = false;
  let skipRemote = false;
  for (let index = 0; index < argv.length; index += 1) {
    if (argv[index] === '--root' && argv[index + 1]) root = path.resolve(argv[++index]);
    else if (argv[index] === '--apply') apply = true;
    else if (argv[index] === '--skip-remote') skipRemote = true;
    else if (argv[index] === '--help' || argv[index] === '-h') {
      console.log('Usage: npm run update -- [--root PATH] [--skip-remote] [--apply]');
      return 0;
    } else throw new Error(`Option ou valeur inconnue : ${argv[index]}`);
  }
  const requestedRoot = path.resolve(root);
  if ((await lstat(requestedRoot)).isSymbolicLink()) throw new Error('Le dossier cible ne peut pas être un lien symbolique.');
  const realRoot = await realpath(requestedRoot);
  const localText = await readFile(path.join(realRoot, 'VERSION'), 'utf8');
  const localVersion = parseVersion(localText, 'VERSION local');
  const packageJson = JSON.parse(await readFile(path.join(realRoot, 'package.json'), 'utf8'));
  if (packageJson.version !== localVersion.join('.')) throw new Error('La version de package.json ne correspond pas à VERSION.');
  console.log(`Version locale : ${localVersion.join('.')}`);
  console.log(`Dépôt public : ${repository}`);
  if (skipRemote) { console.log('Vérification distante ignorée à la demande.'); return 0; }

  const remoteText = await fetchText('https://raw.githubusercontent.com/MasterBougli/bougskills/refs/heads/main/VERSION');
  const remoteVersion = parseVersion(remoteText, 'version distante');
  console.log(`Version distante : ${remoteVersion.join('.')}`);
  const comparison = compareVersions(remoteVersion, localVersion);
  if (comparison <= 0) {
    console.log(comparison === 0 ? 'BougSkills est à jour. Aucun remplacement effectué.' : 'La copie locale est plus récente. Aucun remplacement effectué.');
    return 0;
  }
  console.log(`Mise à jour disponible : ${localVersion.join('.')} -> ${remoteVersion.join('.')}`);
  if (!apply) { console.log('Aucune modification effectuée. Après autorisation explicite, relancer avec --apply.'); return 0; }
  await applyUpdate(realRoot, remoteVersion);
  return 0;
}

if (import.meta.url === pathToFileURL(path.resolve(process.argv[1] || '')).href) {
  main(process.argv.slice(2)).then((code) => { process.exitCode = code; }).catch((error) => {
    console.error(`Erreur : ${error.message}`);
    process.exitCode = 2;
  });
}
