#!/usr/bin/env node
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const removable = new Set([0x00ad, 0x034f, 0x061c, 0x115f, 0x1160, 0x17b4, 0x17b5, 0x180e, 0x200b, 0x2060, 0xfeff]);
const protectedPoints = new Set([0x200c, 0x200d, 0x200e, 0x200f, 0x202a, 0x202b, 0x202c, 0x202d, 0x202e, 0x2066, 0x2067, 0x2068, 0x2069]);
const names = new Map([
  [0x00ad, 'SOFT HYPHEN'], [0x034f, 'COMBINING GRAPHEME JOINER'], [0x061c, 'ARABIC LETTER MARK'],
  [0x115f, 'HANGUL CHOSEONG FILLER'], [0x1160, 'HANGUL JUNGSEONG FILLER'],
  [0x17b4, 'KHMER VOWEL INHERENT AQ'], [0x17b5, 'KHMER VOWEL INHERENT AA'],
  [0x180e, 'MONGOLIAN VOWEL SEPARATOR'], [0x200b, 'ZERO WIDTH SPACE'],
  [0x200c, 'ZERO WIDTH NON-JOINER'], [0x200d, 'ZERO WIDTH JOINER'],
  [0x200e, 'LEFT-TO-RIGHT MARK'], [0x200f, 'RIGHT-TO-LEFT MARK'],
  [0x202a, 'LEFT-TO-RIGHT EMBEDDING'], [0x202b, 'RIGHT-TO-LEFT EMBEDDING'],
  [0x202c, 'POP DIRECTIONAL FORMATTING'], [0x202d, 'LEFT-TO-RIGHT OVERRIDE'],
  [0x202e, 'RIGHT-TO-LEFT OVERRIDE'], [0x2060, 'WORD JOINER'],
  [0x2066, 'LEFT-TO-RIGHT ISOLATE'], [0x2067, 'RIGHT-TO-LEFT ISOLATE'],
  [0x2068, 'FIRST STRONG ISOLATE'], [0x2069, 'POP DIRECTIONAL ISOLATE'],
  [0xfeff, 'ZERO WIDTH NO-BREAK SPACE / BOM'],
]);

function describe(codepoint, count) {
  return { codepoint: `U+${codepoint.toString(16).toUpperCase().padStart(4, '0')}`, name: names.get(codepoint) || 'UNICODE TAG CHARACTER', count };
}

function summarize(counts) {
  return [...counts.entries()].sort(([a], [b]) => a - b).map(([codepoint, count]) => describe(codepoint, count));
}

export function analyze(text, clean) {
  const removableCounts = new Map();
  const protectedCounts = new Map();
  const tagCounts = new Map();
  const result = [];
  for (const character of text) {
    const codepoint = character.codePointAt(0);
    if (removable.has(codepoint)) {
      removableCounts.set(codepoint, (removableCounts.get(codepoint) || 0) + 1);
      if (!clean) result.push(character);
    } else if (protectedPoints.has(codepoint)) {
      protectedCounts.set(codepoint, (protectedCounts.get(codepoint) || 0) + 1);
      result.push(character);
    } else if (codepoint >= 0xe0000 && codepoint <= 0xe007f) {
      tagCounts.set(codepoint, (tagCounts.get(codepoint) || 0) + 1);
      if (!clean) result.push(character);
    } else result.push(character);
  }
  const removedCount = [...removableCounts.values()].reduce((sum, value) => sum + value, 0)
    + [...tagCounts.values()].reduce((sum, value) => sum + value, 0);
  return {
    text: result.join(''),
    report: {
      changed: Boolean(removedCount && clean),
      removable: summarize(removableCounts),
      protected: summarize(protectedCounts),
      tag_characters: summarize(tagCounts),
      removed_count: clean ? removedCount : 0,
      note: 'Les caractères protégés sont signalés mais conservés pour préserver les langues et emojis.',
    },
  };
}

function usage() {
  console.log('Usage : node scripts/clean_content.mjs <fichier> [--clean --output <copie>]');
}

async function main(argv) {
  if (argv.includes('--help') || argv.includes('-h')) { usage(); return 0; }
  let inputArg;
  let outputArg;
  let clean = false;
  for (let index = 0; index < argv.length; index += 1) {
    if (argv[index] === '--clean') clean = true;
    else if (argv[index] === '--output') {
      if (!argv[index + 1]) throw new Error('--output nécessite un chemin.');
      outputArg = argv[++index];
    } else if (argv[index].startsWith('-')) throw new Error(`Option inconnue : ${argv[index]}`);
    else if (!inputArg) inputArg = argv[index];
    else throw new Error(`Argument inattendu : ${argv[index]}`);
  }
  if (!inputArg) throw new Error('Indiquer un fichier texte UTF-8 à inspecter.');
  if (clean && !outputArg) throw new Error('--output est obligatoire avec --clean ; le fichier source n’est jamais écrasé.');

  const input = path.resolve(inputArg);
  const output = outputArg ? path.resolve(outputArg) : undefined;
  if (output && output === input) throw new Error('La sortie doit être différente du fichier source.');
  const raw = await readFile(input);
  if (raw.includes(0)) throw new Error('Fichier probablement binaire ; aucun nettoyage effectué.');
  const hasBom = raw.length >= 3 && raw[0] === 0xef && raw[1] === 0xbb && raw[2] === 0xbf;
  let text;
  try { text = new TextDecoder('utf-8', { fatal: true }).decode(hasBom ? raw.subarray(3) : raw); }
  catch { throw new Error('Encodage UTF-8 non reconnu ; aucun nettoyage effectué.'); }
  const result = analyze(text, clean);
  if (clean) {
    await mkdir(path.dirname(output), { recursive: true });
    await writeFile(output, `${hasBom ? '\ufeff' : ''}${result.text}`, 'utf8');
  }
  result.report.input = input;
  result.report.output = clean ? output : null;
  result.report.mode = clean ? 'clean' : 'inspect';
  console.log(JSON.stringify(result.report, null, 2));
  return 0;
}

if (import.meta.url === pathToFileURL(path.resolve(process.argv[1] || '')).href) {
  main(process.argv.slice(2)).then((code) => { process.exitCode = code; }).catch((error) => {
    console.error(`Erreur : ${error.message}`);
    process.exitCode = 2;
  });
}
