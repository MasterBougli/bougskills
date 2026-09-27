import test from 'node:test';
import assert from 'node:assert/strict';
import { gzipSync } from 'node:zlib';
import { inspectTarGz } from '../scripts/check_bougskills_update.mjs';

function tarGz(entries) {
  const blocks = [];
  for (const { name, body = Buffer.alloc(0), type = '0' } of entries) {
    const header = Buffer.alloc(512);
    header.write(name, 0, 100, 'utf8');
    header.write('0000644\0', 100, 8, 'ascii');
    header.write('0000000\0', 108, 8, 'ascii');
    header.write('0000000\0', 116, 8, 'ascii');
    header.write(`${body.length.toString(8).padStart(11, '0')}\0`, 124, 12, 'ascii');
    header.write('00000000000\0', 136, 12, 'ascii');
    header.fill(0x20, 148, 156);
    header[156] = type.charCodeAt(0);
    header.write('ustar\0', 257, 6, 'ascii');
    header.write('00', 263, 2, 'ascii');
    const checksum = header.reduce((sum, byte) => sum + byte, 0);
    header.write(`${checksum.toString(8).padStart(6, '0')}\0 `, 148, 8, 'ascii');
    blocks.push(header, body);
    const padding = (512 - (body.length % 512)) % 512;
    if (padding) blocks.push(Buffer.alloc(padding));
  }
  blocks.push(Buffer.alloc(1024));
  return gzipSync(Buffer.concat(blocks));
}

function paxRecord(key, value) {
  let record = `${key}=${value}\n`;
  let length = Buffer.byteLength(record) + 2;
  while (String(length).length + 1 + Buffer.byteLength(record) !== length) {
    length = String(length).length + 1 + Buffer.byteLength(record);
  }
  return `${length} ${record}`;
}

test('accepte une archive ordinaire, enregistre son chemin et sa taille', () => {
  const result = inspectTarGz(tarGz([{ name: 'bougskills-main/SKILL.md', body: Buffer.from('ok') }]));
  assert.equal(result[0].member, 'bougskills-main/SKILL.md');
  assert.equal(result[0].size, 2);
});

test('rejette les chemins qui sortent du dossier racine', () => {
  assert.throws(() => inspectTarGz(tarGz([{ name: 'bougskills-main/../../outside' }])), /Chemin dangereux/);
});

test('rejette les liens tar avant extraction', () => {
  assert.throws(() => inspectTarGz(tarGz([{ name: 'bougskills-main/link', type: '2' }])), /Type d’entrée tar non pris en charge/);
});

test('accepte uniquement le commentaire PAX global SHA utilisé par GitHub', () => {
  const result = inspectTarGz(tarGz([
    { name: 'pax_global_header', type: 'g', body: Buffer.from(paxRecord('comment', '625ba236c39ae6c1678d16f6307476c4c80faf50')) },
    { name: 'bougskills-main/SKILL.md', body: Buffer.from('ok') },
  ]));
  assert.equal(result.length, 1);
  assert.equal(result[0].member, 'bougskills-main/SKILL.md');
});

test('refuse les attributs PAX globaux capables de changer les chemins', () => {
  assert.throws(() => inspectTarGz(tarGz([
    { name: 'pax_global_header', type: 'g', body: Buffer.from(paxRecord('path', '../../outside')) },
  ])), /commentaire PAX contenant le SHA Git/);
});

test('rejette une entrée déclarant un volume individuel supérieur à 64 Mio', () => {
  const oversized = Buffer.alloc(512);
  oversized.write('bougskills-main/large.bin', 0, 100, 'utf8');
  oversized.write(`${(65 * 1024 * 1024).toString(8).padStart(11, '0')}\0`, 124, 12, 'ascii');
  oversized[156] = 48;
  assert.throws(() => inspectTarGz(gzipSync(Buffer.concat([oversized, Buffer.alloc(1024)]))), /Entrée trop volumineuse/);
});

test('rejette plus de 20 000 entrées', () => {
  const archive = tarGz(Array.from({ length: 20001 }, (_, index) => ({ name: `bougskills-main/${index}` })));
  assert.throws(() => inspectTarGz(archive), /plus de 20 000 entrées/);
});
