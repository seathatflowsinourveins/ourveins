// tools/research-arch-v23/verdict-store.mjs
import { writeFileSync, mkdirSync, existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const DIR = join(import.meta.dirname, '../../docs/architecture/W443-SP1-VERDICTS');

export function saveVerdict(verdict) {
  if (!existsSync(DIR)) mkdirSync(DIR, { recursive: true });
  const id = verdict.target?.identifier?.replace(/\//g, '--') || 'unknown';
  const path = join(DIR, `${id}.json`);
  writeFileSync(path, JSON.stringify(verdict, null, 2), 'utf8');
  return path;
}

export function loadAllVerdicts() {
  if (!existsSync(DIR)) return [];
  return readdirSync(DIR).filter((f) => f.endsWith('.json')).map((f) => JSON.parse(readFileSync(join(DIR, f), 'utf8')));
}

export function computeAccuracy(feedback) {
  if (!feedback.length) return { accuracy: 0, fp: 0, fn: 0 };
  const fp = feedback.filter((f) => f.verdict.decision_tier?.startsWith('INSTALL') && f.outcome === 'negative').length;
  const fn = feedback.filter((f) => !f.verdict.decision_tier?.startsWith('INSTALL') && f.outcome === 'positive').length;
  return { accuracy: (feedback.length - fp - fn) / feedback.length, fp, fn };
}
