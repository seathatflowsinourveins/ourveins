#!/usr/bin/env node
// W347 P0(a) — sca-v17 §4 decision-impact telemetry: RECORD
// CLI: echo '{...}' | sca-record-decision.mjs  OR  sca-record-decision.mjs --decision='{...}'
// Appends to .claude/state/sca-decision-outcomes.json (atomic rename).
import { loadState, saveState, validateDecision } from './lib/sca-telemetry-core.mjs';

async function readStdin() {
  if (process.stdin.isTTY) return '';
  let buf = ''; for await (const c of process.stdin) buf += c; return buf;
}

const args = process.argv.slice(2);
const flag = args.find(a => a.startsWith('--decision='));
let raw = flag ? flag.slice('--decision='.length) : await readStdin();
if (!raw || !raw.trim()) {
  console.error('usage: sca-record-decision.mjs --decision=\'{...}\'  OR  echo \'{...}\' | sca-record-decision.mjs');
  console.error('required fields: slug, wave, verdict, install_score, pattern_score, rule_version, mcp_family_attribution, date');
  process.exit(2);
}

let decision;
try { decision = JSON.parse(raw); } catch (e) {
  console.error(`JSON parse error: ${e.message}`); process.exit(2);
}

try { validateDecision(decision); } catch (e) {
  console.error(`Validation error: ${e.message}`); process.exit(2);
}

decision.recorded_at = new Date().toISOString();
decision.outcome_tracked = decision.outcome_tracked ?? null; // populated after N waves

const state = await loadState();
// dedupe: same (slug, wave) overwrites (operator can re-record with updated scores)
const idx = state.findIndex(d => d.slug === decision.slug && d.wave === decision.wave);
if (idx >= 0) state[idx] = decision; else state.push(decision);
await saveState(state);

console.log(JSON.stringify({
  ok: true, slug: decision.slug, wave: decision.wave,
  verdict: decision.verdict, total_decisions: state.length,
}));
