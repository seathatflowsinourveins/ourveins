#!/usr/bin/env node
// W347 P0(a) — sca-v17 §4 decision-impact telemetry: RE-EVALUATE
// Re-scores all prior decisions vs current sca-v17 rubric; surfaces drift.
// Output: JSON array of per-decision delta records.
import { loadState, reScoreUnderV17 } from './lib/sca-telemetry-core.mjs';

const args = process.argv.slice(2);
const wantMarkdown = args.includes('--markdown');
const slugFilter = (args.find(a => a.startsWith('--slug=')) || '').slice('--slug='.length);

const state = await loadState();
if (!state.length) {
  console.error('No decisions recorded yet. Use sca-record-decision.mjs first.');
  process.exit(0);
}

const filtered = slugFilter ? state.filter(d => d.slug === slugFilter) : state;
const deltas = filtered.map(reScoreUnderV17);
const drift = deltas.filter(d => d.drift_flagged);

if (wantMarkdown) {
  console.log('# sca-v17 §4 Re-Evaluation Drift Report\n');
  console.log(`Generated ${new Date().toISOString()} | total=${deltas.length} | drift=${drift.length}\n`);
  console.log('| slug | wave | prior_version | install_score | pattern_score | drift |');
  console.log('|---|---|---|---|---|---|');
  for (const d of deltas) {
    const flag = d.drift_flagged ? 'DRIFT-FLAG' : 'stable';
    console.log(`| ${d.slug} | ${d.wave} | ${d.prior_version} | ${d.prior_install_score} | ${d.prior_pattern_score} | ${flag} |`);
  }
} else {
  console.log(JSON.stringify({
    total: deltas.length, drift_count: drift.length, deltas,
  }, null, 2));
}

process.exit(drift.length > 0 ? 0 : 0); // non-fatal; drift surfaced via report
