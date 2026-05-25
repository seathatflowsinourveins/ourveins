#!/usr/bin/env node
// stop-position-swap.mjs — W342-X2 P0.5 Phase-6 position-swap mechanization
//
// Stop event hook per sca-v22 §6.2 Δ-DPA-4 + §10 Phase-6 mandate:
//   "Position-swap re-invocation MANDATORY for T1 INSTALL per Phase-5 5-gate
//    (Zheng+ 2023 MT-Bench + JudgeLM 3-org convergence)."
//
// CONTRACT (codified-not-fired SEV-2 per W341 Stream C §7 P0-C5):
//   When codex round-1 returns APPROVE for a T1/T1-PROV/T2 verdict, round-2
//   MUST fire with evidence-order reversed (position-swap) to detect position
//   bias in the LLM-judge. The Stop hook surfaces the gap to the operator
//   (advisory-only since spawning codex subprocess mid-Stop-hook is fragile;
//   the codex CLI plugin's own Stop-hook handles actual dispatch).
//
// HEURISTIC:
//   1. Scan `tmp/w*-codex-review-output*.txt` for newest round-1 file.
//   2. If round-1 file shows APPROVE/APPROVED verdict marker AND no
//      corresponding `*-r2.txt` (round-2 position-swapped) file exists,
//      AND newest ledger row is T1/T1-PROV/T2 missing `position_swap_consistent: true`,
//      emit ADVISORY via hookSpecificOutput.additionalContext.
//   3. Mark state file `tmp/.position-swap-pending-<wave>.json` so subsequent
//      Stop fires don't re-emit the same advisory.
//   4. Always exit 0 (non-blocking — advisory surface only).
//
// SOFT-FAIL: tmp dir missing, no r1 file, no T1 verdict → exit 0.
//
// Escape hatch: CLAUDE_POSITION_SWAP_DISABLE=1.
//
// Time-budget <300ms. Node 22 native.
//
// CITES:
// - https://docs.anthropic.com/en/docs/claude-code/hooks (Stop event schema)
// - .claude/skills/sota-convergence-audit/SKILL.md:363,406,454 (sca-v22 §I7+§I10+§10)
// - tools/preagent-parallel-guard.mjs (state-file write pattern)
// - W341 VERDICT-LEDGER.md Stream C §7 P0-C5 SEV-2 (Phase-6 codified-not-fired)
// - arXiv MT-Bench 2306.05685 + JudgeLM 2310.17631 (position-bias literature)

import { readFileSync, existsSync, readdirSync, statSync, writeFileSync, mkdirSync } from 'node:fs';
import { join, basename } from 'node:path';

const TMP_DIR =
  process.env.W342_POSITION_SWAP_TMP ||
  'Z:/claude-sota-installed/tmp';
const ARCH_ROOT =
  process.env.W342_POSITION_SWAP_ARCH_ROOT ||
  'Z:/claude-sota-installed/docs/architecture';
const STATE_DIR =
  process.env.W342_POSITION_SWAP_STATE_DIR ||
  'Z:/claude-sota-installed/.claude/state';

const T1_VERDICTS = new Set(['T1', 'T1-PROV', 'T2', 'T0']);

async function readEvent() {
  return await new Promise((resolve) => {
    let buf = '';
    process.stdin.setEncoding('utf8');
    process.stdin.on('data', (c) => (buf += c));
    process.stdin.on('end', () => {
      try { resolve(JSON.parse(buf || '{}')); } catch { resolve({}); }
    });
    setTimeout(() => resolve({}), 400);
  });
}

function newestCodexReviewFiles() {
  if (!existsSync(TMP_DIR)) return { r1: null, r2: null };
  let files;
  try { files = readdirSync(TMP_DIR); } catch { return { r1: null, r2: null }; }
  const r1Candidates = [];
  const r2Candidates = [];
  for (const f of files) {
    if (!/^w\d+-codex-review-output.*\.txt$/i.test(f)) continue;
    const full = join(TMP_DIR, f);
    let mt;
    try { mt = statSync(full).mtimeMs; } catch { continue; }
    if (/-r2\.txt$/i.test(f) || /position.?swap/i.test(f)) {
      r2Candidates.push({ path: full, name: f, mtimeMs: mt });
    } else {
      r1Candidates.push({ path: full, name: f, mtimeMs: mt });
    }
  }
  r1Candidates.sort((a, b) => b.mtimeMs - a.mtimeMs);
  r2Candidates.sort((a, b) => b.mtimeMs - a.mtimeMs);
  const r1 = r1Candidates[0] || null;
  if (!r1) return { r1: null, r2: null };

  // W342 codex round-1 REVISE fix: wave-N filter — only return r2 candidates
  // matching r1's wave. Without this, a stale cross-wave r2 (e.g. W341-r2)
  // would falsely suppress a current-wave advisory.
  const r1Wave = extractWaveFromFilename(r1.name);
  const r2Same = r1Wave
    ? r2Candidates.filter((c) => extractWaveFromFilename(c.name) === r1Wave)
    : [];
  return { r1, r2: r2Same[0] || null };
}

function fileShowsApprove(path) {
  try {
    const txt = readFileSync(path, 'utf8');
    // Match common codex verdict markers
    return /\b(APPROVE(D)?|VERDICT[: ]+APPROVE|Codex-Verdict[: ]+APPROVE)\b/i.test(txt);
  } catch { return false; }
}

function extractWaveFromFilename(name) {
  const m = /^(w\d+)-codex-review/i.exec(name);
  return m ? m[1].toUpperCase() : null;
}

function newestT1Ledger() {
  if (!existsSync(ARCH_ROOT)) return null;
  let entries;
  try { entries = readdirSync(ARCH_ROOT, { withFileTypes: true }); }
  catch { return null; }
  const candidates = [];
  for (const e of entries) {
    if (!e.isDirectory()) continue;
    if (!/^W\d{3}/.test(e.name)) continue;
    const ledger = join(ARCH_ROOT, e.name, 'VERDICT-LEDGER.md');
    if (!existsSync(ledger)) continue;
    try {
      const s = statSync(ledger);
      candidates.push({ path: ledger, mtimeMs: s.mtimeMs, name: e.name });
    } catch { /* */ }
  }
  candidates.sort((a, b) => b.mtimeMs - a.mtimeMs);
  return candidates[0] || null;
}

// W342 codex round-2 REVISE closure: tri-state return so markdown ledgers
// also emit advisory (parity with D73 gate). Caller branches on `.status`:
//   'yaml-needs-swap'      → YAML row missing position_swap_consistent: true → strict advisory
//   'yaml-already-swapped' → YAML row has position_swap_consistent: true → silent exit 0
//   'markdown-advisory'    → no YAML rows but markdown T1 tier-marker present → advisory
//   'no-t1'                → no T1/T1-PROV/T2 rows in either schema → silent exit 0
function analyzeLedger(text) {
  // Strategy A: YAML fenced blocks (canonical schema). YAML PRECEDENCE — when
  // present, ignore markdown markers to prevent downgrade-to-advisory bug.
  const yamlBlocks = text.match(/```ya?ml\s*([\s\S]*?)```/g) || [];
  let newestT1Yaml = null;
  for (const block of yamlBlocks) {
    const inner = block.replace(/```ya?ml\s*/, '').replace(/```$/, '');
    const vm = inner.match(/verdict\s*:\s*([A-Z0-9-]+)/);
    if (!vm) continue;
    if (!T1_VERDICTS.has(vm[1].trim())) continue;
    newestT1Yaml = inner;
  }
  if (newestT1Yaml) {
    const swapMatch = newestT1Yaml.match(/position_swap_consistent\s*:\s*(true|false)/i);
    if (!swapMatch) return { status: 'yaml-needs-swap' };
    return swapMatch[1].toLowerCase() === 'true'
      ? { status: 'yaml-already-swapped' }
      : { status: 'yaml-needs-swap' };
  }

  // Strategy B (fallback when no YAML rows): markdown tier-markers.
  // Emit advisory if T1/T1-PROV/T2 marker present (operator can upgrade ledger
  // to YAML schema for strict enforcement per sca-v22 §10).
  const mdMarkerRe = /\b(T0|T1|T1-PROV|T1-PROVISIONAL|T1-CONDITIONAL|T2|T2-CHERRY|T2-CHERRY-FRONTIER)\b\s*(?:INSTALLED|installed|PROV|CONDITIONAL|CHERRY|FRONTIER)?\s*[:|]/g;
  let mm;
  while ((mm = mdMarkerRe.exec(text)) !== null) {
    const tier = mm[1].toUpperCase();
    const verdict = tier === 'T1-PROVISIONAL' ? 'T1-PROV' : tier;
    if (T1_VERDICTS.has(verdict)) return { status: 'markdown-advisory' };
  }
  return { status: 'no-t1' };
}

// Backward-compat shim (kept so any callers still using the boolean form work)
function ledgerHasT1WithoutPositionSwap(text) {
  const s = analyzeLedger(text).status;
  return s === 'yaml-needs-swap' || s === 'markdown-advisory';
}

function pendingMarkerPath(wave) {
  return join(STATE_DIR, `.position-swap-pending-${wave || 'unknown'}.json`);
}

function emitAdvisory(reason, wave) {
  const out = {
    hookSpecificOutput: {
      hookEventName: 'Stop',
      additionalContext:
        `W342-X2 P0.5 Phase-6 position-swap ADVISORY (${wave || 'unknown wave'}): ${reason}. ` +
        `Per sca-v22 §I7 + §10: T1/T1-PROV/T2 verdicts REQUIRE codex round-2 with evidence-order reversed ` +
        `(Zheng+ 2023 MT-Bench + JudgeLM position-bias mitigation). ` +
        `NEXT STEP: dispatch \`codex exec --round=2 --position-swap\` OR /codex:adversarial-review, ` +
        `then update ledger row with \`position_swap_consistent: true|false\`. ` +
        `Escape hatch: CLAUDE_POSITION_SWAP_DISABLE=1.`,
    },
  };
  try { process.stdout.write(`${JSON.stringify(out)}\n`); } catch {}
}

async function main() {
  if (process.env.CLAUDE_POSITION_SWAP_DISABLE === '1') process.exit(0);

  await readEvent(); // drain stdin

  const { r1, r2 } = newestCodexReviewFiles();
  if (!r1) process.exit(0); // no round-1 yet
  if (!fileShowsApprove(r1.path)) process.exit(0); // no APPROVE → no swap required

  // If a round-2 file exists AND is newer than round-1, swap already done
  if (r2 && r2.mtimeMs >= r1.mtimeMs) process.exit(0);

  const ledger = newestT1Ledger();
  if (!ledger) process.exit(0);
  let ledgerText;
  try { ledgerText = readFileSync(ledger.path, 'utf8'); }
  catch { process.exit(0); }

  const analysis = analyzeLedger(ledgerText);
  if (analysis.status === 'no-t1' || analysis.status === 'yaml-already-swapped') {
    process.exit(0); // ledger has no T1 row OR already has position_swap_consistent: true
  }
  // analysis.status ∈ {'yaml-needs-swap', 'markdown-advisory'} → proceed to advisory

  const wave = extractWaveFromFilename(r1.name);
  const markerPath = pendingMarkerPath(wave);

  // Idempotency: if marker exists and is fresh (<24h), don't re-emit
  try {
    const ms = statSync(markerPath).mtimeMs;
    if (Date.now() - ms < 24 * 60 * 60 * 1000) process.exit(0);
  } catch { /* no marker, proceed */ }

  // Write marker (best-effort)
  try {
    mkdirSync(STATE_DIR, { recursive: true });
    writeFileSync(markerPath, JSON.stringify({
      wave, ts: Date.now(), r1Path: r1.path, ledgerPath: ledger.path,
    }), 'utf8');
  } catch { /* */ }

  emitAdvisory(
    `round-1 APPROVE detected (${basename(r1.path)}); round-2 position-swap NOT yet fired; ` +
    `ledger ${basename(ledger.path)} missing \`position_swap_consistent: true\``,
    wave
  );
  process.exit(0);
}

main().catch((e) => {
  if (process.env.CLAUDE_POSITION_SWAP_DEBUG === '1') {
    try { process.stderr.write(`[stop-position-swap ERROR] ${e?.stack || e?.message || String(e)}\n`); } catch {}
  }
  process.exit(0);
});
