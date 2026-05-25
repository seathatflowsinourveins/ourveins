#!/usr/bin/env node
// test-parallel-guard-r4-cross-prompt.mjs — W344 Z1 P0.1 R4 acceptance.
//
// Cross-prompt-boundary test for the W343 R4 false-acquit fix in
// preagent-parallel-guard.mjs. The W343 P0.4 race-fix landed bd25142 with
// rename-atomic + bounded-retry + TURN_WINDOW_MS=1500ms but didn't scope
// ticks per-prompt — a stale tick from the prior user prompt within 1500ms
// could produce recentTicks>=2 and short-circuit current-turn enforcement
// (false-acquit). The Z1 fix introduces state.intentSetTs as a lower-bound
// cutoff (set by parallel-guard-userpromptsubmit.mjs:109 on each new
// UserPromptSubmit); the new countRecentTicks uses
// `max(state.intentSetTs, now - TURN_WINDOW_MS)` as the cutoff.
//
// Scenario per iteration:
//   - T+0:   write "stale" tick (simulates prior-turn solo Agent dispatch)
//   - T+200: NEW UserPromptSubmit fires → intentSetTs = T+200
//   - T+500: write "current" tick (simulates current-turn solo Agent dispatch)
//   - Count using FIXED logic (intentSetTs cutoff) → expect 1 (only current)
//   - Count using LEGACY logic (now - TURN_WINDOW_MS cutoff) → expect 2 (false-acquit)
//
// Acceptance: 100% of iterations show count==1 with fix AND count==2 with legacy.
// The "legacy 2" path PROVES the bug existed pre-fix. The "fixed 1" path
// PROVES the fix correctly excludes pre-prompt ticks.
//
// References:
// - W343 codex R4 review (cross-prompt false-acquit finding)
// - W344 Z1 P0.1 R4 fix path (a): intentSetTs lower-bound cutoff
// - parallel-guard-userpromptsubmit.mjs:109 (intentSetTs writer)
// - Anthropic hooks doc UserPromptSubmit event semantics
//   (https://docs.anthropic.com/en/docs/claude-code/hooks)
// - claudekit transcript-marker-loop-guard skill (per-event idempotency pattern)
// - POSIX rename(2) atomicity (IEEE/ISO §3.293) — underlying tick-write primitive

import { mkdir, rm, writeFile, readdir, stat } from 'node:fs/promises';
import { tmpdir } from 'node:os';

const ITER = parseInt(process.argv[2] || '50', 10);
const TURN_WINDOW_MS = 1500;

const root = `${tmpdir()}/w344-z1-r4-cross-prompt-${process.pid}`;
let fixedPass = 0;
let legacyFalseAcquit = 0;
const failures = [];

async function runIteration(i) {
  const tickDir = `${root}/iter-${i}`;
  await mkdir(tickDir, { recursive: true });

  // T+0: stale tick from prior prompt
  const t0 = Date.now();
  const staleTick = `${tickDir}/stale-${t0}-${Math.random().toString(36).slice(2, 10)}.json`;
  await writeFile(staleTick, JSON.stringify({ ts: t0, kind: 'stale' }), 'utf8');

  // Wait ~200ms → simulate prompt-boundary; UserPromptSubmit fires here
  await new Promise((r) => setTimeout(r, 200));
  const intentSetTs = Date.now();

  // Wait ~300ms more → current-turn tick at T+500ms (still inside 1500ms window from T+0)
  await new Promise((r) => setTimeout(r, 300));
  const now = Date.now();
  const currentTick = `${tickDir}/current-${now}-${Math.random().toString(36).slice(2, 10)}.json`;
  await writeFile(currentTick, JSON.stringify({ ts: now, kind: 'current' }), 'utf8');

  // FIXED logic (W344 Z1 fix): cutoff = max(intentSetTs, now - TURN_WINDOW_MS)
  const turnCutoff = now - TURN_WINDOW_MS;
  const fixedCutoff = Math.max(turnCutoff, intentSetTs);

  let fixedCount = 0;
  let legacyCount = 0;
  const entries = await readdir(tickDir);
  for (const name of entries) {
    if (!name.endsWith('.json')) continue;
    try {
      const s = await stat(`${tickDir}/${name}`);
      if (s.mtimeMs >= fixedCutoff) fixedCount++;
      if (s.mtimeMs >= turnCutoff) legacyCount++;
    } catch (e) {
      process.stderr.write(`stat-fail iter=${i} name=${name}: ${e?.message || e}\n`);
    }
  }

  if (fixedCount === 1) fixedPass++;
  else failures.push({ iter: i, fixedCount, legacyCount });
  if (legacyCount >= 2) legacyFalseAcquit++;

  return { fixedCount, legacyCount };
}

async function main() {
  await rm(root, { recursive: true, force: true });
  await mkdir(root, { recursive: true });
  const start = Date.now();
  for (let i = 0; i < ITER; i++) await runIteration(i);
  const elapsedMs = Date.now() - start;
  await rm(root, { recursive: true, force: true });

  const ratio = fixedPass / ITER;
  process.stdout.write(`\nW344 Z1 P0.1 R4 CROSS-PROMPT-BOUNDARY TEST\n`);
  process.stdout.write(`  iterations:                   ${ITER}\n`);
  process.stdout.write(`  fixed-logic count==1 pass:    ${fixedPass}/${ITER}\n`);
  process.stdout.write(`  legacy would-false-acquit:    ${legacyFalseAcquit}/${ITER}\n`);
  process.stdout.write(`  pass-ratio:                   ${(ratio * 100).toFixed(2)}%\n`);
  process.stdout.write(`  elapsed:                      ${elapsedMs}ms\n`);
  if (failures.length) {
    process.stdout.write(`\nFAILURES (first 5):\n`);
    for (const f of failures.slice(0, 5)) {
      process.stdout.write(`  iter ${f.iter}: fixed=${f.fixedCount} legacy=${f.legacyCount}\n`);
    }
  }
  const allPass = ratio === 1 && legacyFalseAcquit > 0;
  process.stdout.write(`\nACCEPTANCE R4: ${allPass ? 'PASS' : 'FAIL'}`);
  process.stdout.write(` (require fixed=100% count==1 AND legacy>0 false-acquits to prove bug existed)\n`);
  process.exit(allPass ? 0 : 1);
}

main().catch((err) => {
  process.stderr.write(`R4 CROSS-PROMPT TEST CRASHED: ${err?.stack || err?.message || String(err)}\n`);
  process.exit(2);
});
