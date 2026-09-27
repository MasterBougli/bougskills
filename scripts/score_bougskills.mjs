#!/usr/bin/env node
import { pathToFileURL } from 'node:url';

const CRITERION_COUNT = 11;
const FULL_SCORE = 22;

function parseReasons(value) {
  const reasons = new Map();
  if (!value.trim()) return reasons;
  for (const entry of value.split('|')) {
    const separator = entry.indexOf('=');
    if (separator < 1 || separator === entry.length - 1) throw new Error(`Raison N/A invalide : '${entry}'. Format attendu : numéro=justification.`);
    const indexText = entry.slice(0, separator).trim();
    const index = Number(indexText);
    const reason = entry.slice(separator + 1).trim();
    if (!/^\d+$/.test(indexText) || !Number.isInteger(index) || index < 1 || index > CRITERION_COUNT) throw new Error(`Numéro de critère invalide dans la raison N/A : '${indexText}'.`);
    if (!reason) throw new Error(`La justification N/A du critère ${index} est vide.`);
    if (reasons.has(index)) throw new Error(`Raison N/A dupliquée pour le critère ${index}.`);
    reasons.set(index, reason);
  }
  return reasons;
}

export function calculate(scoresCsv, reasonsCsv = '', criticalFailure = false) {
  const scores = scoresCsv.split(',').map((item) => item.trim());
  if (scores.length !== CRITERION_COUNT) throw new Error(`Il faut exactement ${CRITERION_COUNT} valeurs, dans l'ordre de tests/grille-evaluation.md. Valeurs reçues : ${scores.length}.`);
  const reasons = parseReasons(reasonsCsv);
  let rawScore = 0;
  let applicable = 0;
  const naIndexes = new Set();
  scores.forEach((value, offset) => {
    const index = offset + 1;
    if (value.toLowerCase() === 'n/a') {
      if (!reasons.has(index)) throw new Error(`Le critère ${index} est N/A sans justification.`);
      naIndexes.add(index);
      return;
    }
    if (!/^(0|1|2)$/.test(value)) throw new Error(`Note invalide au critère ${index} : '${value}'. Utiliser 0, 1, 2 ou N/A.`);
    if (reasons.has(index)) throw new Error(`Une justification N/A a été fournie pour le critère ${index}, qui n'est pas noté N/A.`);
    rawScore += Number(value);
    applicable += 1;
  });
  for (const index of reasons.keys()) if (!naIndexes.has(index)) throw new Error(`La justification N/A du critère ${index} ne correspond pas à une note N/A.`);
  if (applicable === 0) return ['Statut : non évaluable (aucun critère applicable)'];

  const maximum = applicable * 2;
  const percentage = (rawScore / maximum) * 100;
  const normalized = (rawScore / maximum) * FULL_SCORE;
  const rating = criticalFailure ? 'échec critique'
    : percentage >= 90 ? 'excellent'
      : percentage >= 75 ? 'acceptable'
        : percentage >= 55 ? 'insuffisant' : 'échec';
  return [
    `Critères applicables : ${applicable}/${CRITERION_COUNT}`,
    `Score brut : ${rawScore}/${maximum}`,
    `Score normalisé : ${normalized.toFixed(1)}/${FULL_SCORE}`,
    `Pourcentage : ${percentage.toFixed(1)}%`,
    `Évaluation : ${rating}`,
  ];
}

function main(argv) {
  let scores;
  let reasons = '';
  let critical = false;
  for (let i = 0; i < argv.length; i += 1) {
    if (argv[i] === '--scores' && argv[i + 1]) scores = argv[++i];
    else if (argv[i] === '--na-reasons' && argv[i + 1]) reasons = argv[++i];
    else if (argv[i] === '--critical-failure') critical = true;
    else if (argv[i] === '--help' || argv[i] === '-h') {
      console.log('Usage: npm run score -- --scores "2,1,N/A,..." [--na-reasons "3=raison"] [--critical-failure]');
      return 0;
    } else throw new Error(`Option ou valeur inconnue : ${argv[i]}`);
  }
  if (!scores) throw new Error('L’option --scores est obligatoire.');
  console.log(calculate(scores, reasons, critical).join('\n'));
  return 0;
}

if (import.meta.url === pathToFileURL(process.argv[1] || '').href) {
  try {
    process.exitCode = main(process.argv.slice(2));
  } catch (error) {
    console.error(`Erreur : ${error.message}`);
    process.exitCode = 2;
  }
}
