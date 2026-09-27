import test from 'node:test';
import assert from 'node:assert/strict';
import { calculate } from '../scripts/score_bougskills.mjs';

const oneNa = '6=Le scénario ne comporte pas de code applicatif';

test('55 % exact est insuffisant', () => assert.match(calculate('2,2,2,2,2,N/A,1,0,0,0,0', oneNa).at(-1), /insuffisant/));
test('moins de 55 % est un échec', () => assert.match(calculate('2,2,2,2,1,N/A,0,0,0,0,0', oneNa).at(-1), /Évaluation : échec$/));
test('90 % exact est excellent', () => assert.match(calculate('2,2,2,2,2,N/A,2,2,2,2,0', oneNa).at(-1), /excellent/));
test('moins de 90 % reste acceptable à 85 %', () => assert.match(calculate('2,2,2,2,2,N/A,2,2,2,1,0', oneNa).at(-1), /acceptable/));
test('tous les critères N/A sont non évaluables', () => {
  const scores = Array(11).fill('N/A').join(',');
  const reasons = Array.from({ length: 11 }, (_, index) => `${index + 1}=Hors périmètre`).join('|');
  assert.match(calculate(scores, reasons)[0], /non évaluable/);
});
test('N/A sans justification est rejeté', () => assert.throws(() => calculate('2,2,2,2,2,N/A,2,2,2,2,2'), /sans justification/));
test('note hors plage et mauvaise longueur sont rejetées', () => {
  assert.throws(() => calculate('2,2,2,2,2,3,2,2,2,2,2'), /Note invalide/);
  assert.throws(() => calculate('2,2,2'), /exactement 11/);
});
test('raison N/A surnuméraire ou mal formée est rejetée', () => {
  assert.throws(() => calculate('2,2,2,2,2,2,2,2,2,2,2', oneNa), /pas noté N\/A/);
  assert.throws(() => calculate('2,2,2,2,2,N/A,2,2,2,2,2', '6'), /invalide/);
});
test('échec critique prévaut sur un score excellent', () => assert.match(calculate('2,2,2,2,2,N/A,2,2,2,2,2', oneNa, true).at(-1), /échec critique/));
