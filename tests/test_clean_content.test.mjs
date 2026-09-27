import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
import { analyze } from '../scripts/clean_content.mjs';

test('retire uniquement les marqueurs autorisés et garde les caractères protégés', () => {
  const result = analyze(`A\u200bB\u200d😊`, true);
  assert.equal(result.text, 'AB\u200d😊');
  assert.equal(result.report.removed_count, 1);
  assert.equal(result.report.protected[0].codepoint, 'U+200D');
  assert.equal(result.report.removable[0].name, 'ZERO WIDTH SPACE');
});
test('le mode inspection ne change pas le texte', () => {
  const input = `A\u200bB`;
  const result = analyze(input, false);
  assert.equal(result.text, input);
  assert.equal(result.report.changed, false);
  assert.equal(result.report.removed_count, 0);
});
test('les caractères tag sont détectés et retirés uniquement en mode nettoyage', () => {
  const input = `x${String.fromCodePoint(0xe0001)}y`;
  const result = analyze(input, true);
  assert.equal(result.text, 'xy');
  assert.equal(result.report.tag_characters[0].codepoint, 'U+E0001');
});

test('la commande écrit une copie UTF-8 et conserve intacte la source', async () => {
  const temporary = await mkdtemp(path.join(os.tmpdir(), 'bougskills-clean-test-'));
  try {
    const source = path.join(temporary, 'source.txt');
    const destination = path.join(temporary, 'result.txt');
    const content = '\ufeffA\u200bB\u200d😊';
    await writeFile(source, content, 'utf8');
    const script = fileURLToPath(new URL('../scripts/clean_content.mjs', import.meta.url));
    const result = spawnSync(process.execPath, [script, source, '--clean', '--output', destination], { encoding: 'utf8' });
    assert.equal(result.status, 0, result.stderr);
    assert.equal(await readFile(source, 'utf8'), content);
    assert.equal(await readFile(destination, 'utf8'), '\ufeffAB\u200d😊');
  } finally {
    await rm(temporary, { recursive: true, force: true });
  }
});
