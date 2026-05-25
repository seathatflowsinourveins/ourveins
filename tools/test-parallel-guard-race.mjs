#!/usr/bin/env node
// test-parallel-guard-race.mjs — W343 P0.4 acceptance C5 (R3 closure)
//
// Subprocess-based stress test for the rename-atomic tick-write fix in
// preagent-parallel-guard.mjs. R1 used Promise.all(writes)→Promise.all(reads)
// which pre-synchronizes all writes before any read — masking the early-reader
// race codex GPT-5.5 R2 flagged. R2 + R3 spawns N independent Node subprocesses
// per iteration, each doing write-then-immediate-count INDEPENDENTLY with
// bounded-retry. This exercises the realistic interleaving codex R3 flagged.
//
// Usage:  node tools/test-parallel-guard-race.mjs [iterations] [writersPerIter]
// Defaults: 50 iterations, 4 writers per iteration (matches acceptance C1).
//
// References:
// - docs/architecture/W343-EXECUTE/P3-tick-file-race-fix.md §5 §6.C5
// - W343 codex R2 review (early-reader race finding)
// - W343 codex R3 review (clean-state false-violation + serial-within-window)
// - POSIX rename(2) atomicity (IEEE/ISO §3.293)
// - Windows MoveFileEx(MOVEFILE_REPLACE_EXISTING) atomicity (Microsoft)
// - libuv uv_fs_rename (Joyent/Node.js Foundation)

import { mkdir, rm } from 'node:fs/promises';
import { spawn } from 'node:child_process';
import { tmpdir } from 'node:os';

const ITER = parseInt(process.argv[2] || '50', 10);
const WRITERS = parseInt(process.argv[3] || '4', 10);

const root = `${tmpdir()}/w343-p04-race-test-${process.pid}`;
let pass = 0;
let fail = 0;
const failures = [];

// Worker script: each child writes its own tick, then bounded-retry-counts
// until it sees >= expectedPeers OR a small deadline elapses. Matches the
// production hook's early-reader-race-tolerant count step. TURN_WINDOW_MS
// matches the production constant (1500ms post-R3).
const WORKER_SCRIPT = `
const fsp = require('node:fs/promises');
const tickDir = process.argv[1];
const idx = parseInt(process.argv[2], 10);
const expectedPeers = parseInt(process.argv[3], 10);
const TURN_WINDOW_MS = 1500;
const DEADLINE_MS = 200;
const POLL_MS = 20;
(async () => {
  const now = Date.now();
  const uniq = process.pid + '.' + now + '.' + idx + '.' + Math.random().toString(36).slice(2, 10);
  const tickFinal = tickDir + '/' + uniq + '.json';
  const tickTmp = tickFinal + '.tmp';
  await fsp.mkdir(tickDir, { recursive: true });
  await fsp.writeFile(tickTmp, JSON.stringify({ ts: now, pid: process.pid, idx }), 'utf8');
  await fsp.rename(tickTmp, tickFinal);
  let count = 0;
  const deadline = Date.now() + DEADLINE_MS;
  do {
    count = 0;
    const entries = await fsp.readdir(tickDir);
    const cutoff = now - TURN_WINDOW_MS;
    for (const name of entries) {
      if (!name.endsWith('.json')) continue;
      try {
        const s = await fsp.stat(tickDir + '/' + name);
        if (s.mtimeMs >= cutoff) count++;
      } catch {}
    }
    if (count >= expectedPeers) break;
    if (Date.now() >= deadline) break;
    await new Promise((r) => setTimeout(r, POLL_MS));
  } while (true);
  process.stdout.write(JSON.stringify({ count, pid: process.pid, idx }));
})().catch((err) => {
  process.stderr.write(String(err && err.stack || err));
  process.exit(1);
});
`;

function spawnWorker(tickDir, idx, expectedPeers) {
  return new Promise((resolve, reject) => {
    const child = spawn(
      process.execPath,
      ['-e', WORKER_SCRIPT, tickDir, String(idx), String(expectedPeers)],
      { stdio: ['ignore', 'pipe', 'inherit'] },
    );
    let out = '';
    child.stdout.on('data', (d) => { out += d.toString('utf8'); });
    child.on('exit', (code) => {
      if (code !== 0) return reject(new Error(`worker idx=${idx} exit ${code}`));
      try { resolve(JSON.parse(out)); } catch (e) { reject(e); }
    });
    child.on('error', reject);
  });
}

async function runIteration(i) {
  const tickDir = `${root}/iter-${i}`;
  await mkdir(tickDir, { recursive: true });
  const promises = [];
  for (let w = 0; w < WRITERS; w++) promises.push(spawnWorker(tickDir, w, WRITERS));
  const results = await Promise.all(promises);
  const allOk = results.every((r) => r.count === WRITERS);
  if (allOk) {
    pass++;
  } else {
    fail++;
    failures.push({ iter: i, counts: results.map((r) => r.count), expected: WRITERS });
  }
}

async function main() {
  await rm(root, { recursive: true, force: true });
  await mkdir(root, { recursive: true });
  const start = Date.now();
  for (let i = 0; i < ITER; i++) await runIteration(i);
  const elapsedMs = Date.now() - start;
  await rm(root, { recursive: true, force: true });

  const ratio = pass / ITER;
  process.stdout.write(`\nW343 P0.4 RENAME-ATOMIC STRESS TEST (R3 subprocess-based)\n`);
  process.stdout.write(`  iterations:    ${ITER}\n`);
  process.stdout.write(`  writers/iter:  ${WRITERS}\n`);
  process.stdout.write(`  pass:          ${pass}/${ITER}\n`);
  process.stdout.write(`  fail:          ${fail}/${ITER}\n`);
  process.stdout.write(`  pass-ratio:    ${(ratio * 100).toFixed(2)}%\n`);
  process.stdout.write(`  elapsed:       ${elapsedMs}ms\n`);
  if (failures.length) {
    process.stdout.write(`\nFAILURES (first 5):\n`);
    for (const f of failures.slice(0, 5)) {
      process.stdout.write(`  iter ${f.iter}: counts=${JSON.stringify(f.counts)} expected=${f.expected}\n`);
    }
  }
  process.stdout.write(`\nACCEPTANCE C5: ${ratio === 1 ? 'PASS' : 'FAIL'} (require 100% correct count)\n`);
  process.exit(ratio === 1 ? 0 : 1);
}

main().catch((err) => {
  process.stderr.write(`STRESS TEST CRASHED: ${err?.stack || err?.message || String(err)}\n`);
  process.exit(2);
});
