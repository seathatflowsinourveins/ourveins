#!/usr/bin/env node
// W347 P0(a) — sca-v17 §4 decision-impact telemetry: EFFECTIVENESS REPORT
// Computes effectiveness_ratio (target SLO 80% per Google SRE Ch.4 + evaluator-optimizer pattern).
// Outcome-tracked-after-N=3-waves: decisions <3 waves old marked PENDING.
// Output: markdown table to stdout.
import { loadState, wilsonLowerBound, SLO_EFFECTIVENESS_RATIO, OUTCOME_TRACKED_AFTER_N_WAVES } from './lib/sca-telemetry-core.mjs';

function waveNum(w) { return parseInt(String(w).replace(/^W/, ''), 10) || 0; }

const state = await loadState();
const currentWaveArg = (process.argv.find(a => a.startsWith('--current-wave=')) || '').slice('--current-wave='.length);
const currentWave = currentWaveArg ? waveNum(currentWaveArg) : Math.max(0, ...state.map(d => waveNum(d.wave)));

const enriched = state.map(d => {
  const age = currentWave - waveNum(d.wave);
  const pending = age < OUTCOME_TRACKED_AFTER_N_WAVES;
  // effectiveness: if outcome_tracked is null AND age >= N → assume neutral (not counted);
  // outcome_tracked = 'effective' | 'regret' | 'neutral' | null
  return { ...d, _age: age, _pending: pending };
});

const tracked = enriched.filter(d => !d._pending && d.outcome_tracked);
const effective = tracked.filter(d => d.outcome_tracked === 'effective').length;
const regret = tracked.filter(d => d.outcome_tracked === 'regret').length;
const neutral = tracked.filter(d => d.outcome_tracked === 'neutral').length;
const totalScorable = effective + regret; // neutral excluded from ratio
const ratio = totalScorable > 0 ? effective / totalScorable : 0;
const wilsonCI = wilsonLowerBound(effective, totalScorable);
const meetsSLO = wilsonCI >= SLO_EFFECTIVENESS_RATIO;

console.log('# sca-v17 §4 Decision-Impact Effectiveness Report\n');
console.log(`Generated ${new Date().toISOString()} | current_wave=W${currentWave} | SLO=${SLO_EFFECTIVENESS_RATIO}\n`);
console.log('## Summary\n');
console.log('| metric | value |');
console.log('|---|---|');
console.log(`| total_decisions | ${state.length} |`);
console.log(`| outcome_tracked | ${tracked.length} |`);
console.log(`| pending (age<${OUTCOME_TRACKED_AFTER_N_WAVES} waves) | ${enriched.filter(d => d._pending).length} |`);
console.log(`| effective | ${effective} |`);
console.log(`| regret | ${regret} |`);
console.log(`| neutral | ${neutral} |`);
console.log(`| effectiveness_ratio | ${ratio.toFixed(3)} |`);
console.log(`| wilson_ci_lower_95 | ${wilsonCI.toFixed(3)} |`);
console.log(`| slo_status | ${meetsSLO ? 'MEETS' : 'BELOW'} (target ${SLO_EFFECTIVENESS_RATIO}) |\n`);
console.log('## Per-Decision\n');
console.log('| slug | wave | verdict | install | pattern | outcome | age |');
console.log('|---|---|---|---|---|---|---|');
for (const d of enriched.sort((a, b) => waveNum(b.wave) - waveNum(a.wave))) {
  const out = d._pending ? 'PENDING' : (d.outcome_tracked || 'untracked');
  console.log(`| ${d.slug} | ${d.wave} | ${d.verdict} | ${d.install_score} | ${d.pattern_score} | ${out} | ${d._age} |`);
}

process.exit(0);
