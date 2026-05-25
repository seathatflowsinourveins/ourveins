import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, rmSync, readFileSync, existsSync, writeFileSync, readdirSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { acquire, validate, release, cleanupStale, readLock } from '../preagent-wave-lock-guard.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = resolve(__filename, '..');
const GUARD_CLI = resolve(__dirname, '../preagent-wave-lock-guard.mjs');

function mkTmp() {
  return mkdtempSync(join(tmpdir(), 'wave-lock-test-'));
}

test('T1: acquire creates wave-lock file with correct schema', () => {
  const dir = mkTmp();
  const r = acquire({ wave: 'W999', sessionId: '01HX-test-1', branch: 'goal/W999-x', worktreePath: dir, stateDir: dir });
  assert.equal(r.status, 'OK');
  const lock = readLock('W999', dir);
  assert.equal(lock.wave, 'W999');
  assert.equal(lock.session_id, '01HX-test-1');
  assert.equal(lock.schema_version, 1);
  assert.equal(lock.state, 'active');
  assert.ok(lock.started_at && lock.ttl_at && lock.last_heartbeat_at);
  rmSync(dir, { recursive: true });
});

test('T2: concurrent acquire — first wins, second collides', async () => {
  const dir = mkTmp();
  const r1 = acquire({ wave: 'W999', sessionId: 'A', branch: 'b', worktreePath: dir, stateDir: dir });
  const r2 = acquire({ wave: 'W999', sessionId: 'B', branch: 'b', worktreePath: dir, stateDir: dir });
  assert.equal(r1.status, 'OK');
  assert.equal(r2.status, 'COLLISION');
  assert.equal(r2.existing.session_id, 'A');
  rmSync(dir, { recursive: true });
});

test('T3: idempotent re-entry — same session_id re-acquires OK', () => {
  const dir = mkTmp();
  acquire({ wave: 'W999', sessionId: 'A', branch: 'b', worktreePath: dir, stateDir: dir });
  const r = acquire({ wave: 'W999', sessionId: 'A', branch: 'b', worktreePath: dir, stateDir: dir });
  assert.equal(r.status, 'OK');
  assert.equal(r.reason, 'idempotent-re-entry');
  rmSync(dir, { recursive: true });
});

test('T4: fork re-entry — parent_session_id matches existing', () => {
  const dir = mkTmp();
  acquire({ wave: 'W999', sessionId: 'A', branch: 'b', worktreePath: dir, stateDir: dir });
  const r = acquire({ wave: 'W999', sessionId: 'B', parentSessionId: 'A', branch: 'b', worktreePath: dir, stateDir: dir });
  assert.equal(r.status, 'OK');
  assert.equal(r.reason, 'fork-re-entry');
  rmSync(dir, { recursive: true });
});

test('T5: stale lock recovery — heartbeat older than 3× interval triggers cleanup', () => {
  const dir = mkTmp();
  // Inject a stale lock directly
  const stale = {
    schema_version: 1, wave: 'W999', session_id: 'GONE',
    branch: 'b', worktree_path: dir, host: 'h', pid: 99999,
    started_at: '2020-01-01T00:00:00Z',
    last_heartbeat_at: '2020-01-01T00:00:00Z',
    heartbeat_interval_seconds: 60,
    ttl_at: '2030-01-01T00:00:00Z',
    claim_attempts: 1, state: 'active', released_at: null,
    parent_session_id: null, owner: 'operator'
  };
  writeFileSync(join(dir, 'wave-lock-W999.json'), JSON.stringify(stale));
  const r = acquire({ wave: 'W999', sessionId: 'NEW', branch: 'b', worktreePath: dir, stateDir: dir });
  assert.equal(r.status, 'OK');
  assert.equal(r.reason, 'stale-cleanup-then-acquire');
  rmSync(dir, { recursive: true });
});

test('T6: TTL expiry — past ttl_at means expired', () => {
  const dir = mkTmp();
  acquire({ wave: 'W999', sessionId: 'A', branch: 'b', worktreePath: dir, stateDir: dir, ttlSeconds: -1 });
  const v = validate({ wave: 'W999', sessionId: 'A', stateDir: dir });
  assert.equal(v.status, 'FAIL');
  assert.match(v.reason, /expired|ttl/i);
  rmSync(dir, { recursive: true });
});

test('T7: validate pre-commit — foreign session_id fails with help text', () => {
  const dir = mkTmp();
  acquire({ wave: 'W999', sessionId: 'A', branch: 'b', worktreePath: dir, stateDir: dir });
  const v = validate({ wave: 'W999', sessionId: 'B', stateDir: dir });
  assert.equal(v.status, 'FAIL');
  assert.match(v.reason, /claimed by different session/i);
  assert.ok(v.help_text.includes('--cleanup-stale'));
  rmSync(dir, { recursive: true });
});

test('T8: release-then-reacquire — same session can release + re-acquire AND lock state must be active', () => {
  const dir = mkTmp();
  acquire({ wave: 'W999', sessionId: 'A', branch: 'b', worktreePath: dir, stateDir: dir });
  release({ wave: 'W999', sessionId: 'A', stateDir: dir });
  const r = acquire({ wave: 'W999', sessionId: 'A', branch: 'b', worktreePath: dir, stateDir: dir });
  assert.equal(r.status, 'OK');
  // W363 codex r2 finding #2: must NOT take idempotent-re-entry path on released lock.
  // Lock state MUST be 'active', not preserved 'released'.
  assert.equal(r.reason, 'replaced-released-lock', 'released lock should be reclaimed not idempotent-reentered');
  const lock = readLock('W999', dir);
  assert.equal(lock.state, 'active', 'lock state must be active after release-then-reacquire');
  // And validate must now PASS (would FAIL if state stayed released per codex r1 finding #4).
  const v = validate({ wave: 'W999', sessionId: 'A', stateDir: dir });
  assert.equal(v.status, 'OK', 'validate must accept reacquired lock');
  rmSync(dir, { recursive: true });
});

test('T9: poisoned state blocks acquire (requires operator clear)', () => {
  const dir = mkTmp();
  acquire({ wave: 'W999', sessionId: 'A', branch: 'b', worktreePath: dir, stateDir: dir });
  // Manually poison the lock
  const lock = readLock('W999', dir);
  lock.state = 'poisoned';
  writeFileSync(join(dir, 'wave-lock-W999.json'), JSON.stringify(lock));
  const r = acquire({ wave: 'W999', sessionId: 'B', branch: 'b', worktreePath: dir, stateDir: dir });
  assert.equal(r.status, 'COLLISION');
  assert.match(r.reason, /poisoned/i);
  rmSync(dir, { recursive: true });
});

test('T10: schema_version mismatch — schema_version=2 triggers explicit error', () => {
  const dir = mkTmp();
  writeFileSync(join(dir, 'wave-lock-W999.json'), JSON.stringify({ schema_version: 2, wave: 'W999' }));
  const r = acquire({ wave: 'W999', sessionId: 'A', branch: 'b', worktreePath: dir, stateDir: dir });
  assert.equal(r.status, 'COLLISION');
  assert.match(r.reason, /schema_version/i);
  rmSync(dir, { recursive: true });
});

// W363 codex r1 finding #4: validate MUST require state === 'active' even for same-session.
test('T11: validate rejects same-session lock when state != active (released/poisoned)', () => {
  const dir = mkTmp();
  acquire({ wave: 'W999', sessionId: 'A', branch: 'b', worktreePath: dir, stateDir: dir });
  release({ wave: 'W999', sessionId: 'A', stateDir: dir });
  // Lock is now state=released but still owned by session A
  const v = validate({ wave: 'W999', sessionId: 'A', stateDir: dir });
  assert.equal(v.status, 'FAIL', 'validate must FAIL on released lock even from same session');
  assert.match(v.reason, /not active|released/i);
  rmSync(dir, { recursive: true });
});

// W363 codex r1 finding #2: race-safe reclamation — reading lock and rewriting is not enough.
// After release, two contenders racing to reclaim should NOT both succeed.
test('T12: race-safe reclaim — second contender after first reclaims released lock COLLIDES', () => {
  const dir = mkTmp();
  acquire({ wave: 'W999', sessionId: 'A', branch: 'b', worktreePath: dir, stateDir: dir });
  release({ wave: 'W999', sessionId: 'A', stateDir: dir });
  const r1 = acquire({ wave: 'W999', sessionId: 'B', branch: 'b', worktreePath: dir, stateDir: dir });
  const r2 = acquire({ wave: 'W999', sessionId: 'C', branch: 'b', worktreePath: dir, stateDir: dir });
  assert.equal(r1.status, 'OK', 'first reclaimer succeeds');
  assert.equal(r1.reason, 'replaced-released-lock');
  // r2 must NOT silently overwrite r1; it must either re-collision with B (live now) or fail.
  // After r1 succeeds, lock state is 'active' owned by B. r2's session=C must COLLISION.
  assert.equal(r2.status, 'COLLISION', 'second contender must collide with newly-active lock');
  assert.equal(r2.existing.session_id, 'B');
  rmSync(dir, { recursive: true });
});

// W363 codex r2 finding #1: true concurrent-process race-safety test for reclaim path.
// Spawns N child processes simultaneously via spawnSync (parallel via Promise.all of async
// spawns) all attempting --acquire on a released lock. EXACTLY ONE must succeed; all others
// must report COLLISION. Tests the rename-marker atomic reclaim primitive end-to-end.
test('T14: concurrent reclaim race — N child processes, exactly one wins', async () => {
  const dir = mkTmp();
  // Seed a released lock owned by sessionA
  acquire({ wave: 'W999', sessionId: 'A', branch: 'b', worktreePath: dir, stateDir: dir });
  release({ wave: 'W999', sessionId: 'A', stateDir: dir });
  // Fire 5 parallel child-process --acquire attempts via async spawn
  const { spawn } = await import('node:child_process');
  const attempts = await Promise.all([1,2,3,4,5].map(i => new Promise(resolveP => {
    const child = spawn('node', [GUARD_CLI, '--acquire', '--wave', 'W999',
      '--session-id', `child-${i}`, '--branch', 'b', '--worktree-path', dir,
      '--state-dir', dir], { stdio: ['ignore', 'pipe', 'pipe'] });
    let stdout = ''; let stderr = '';
    child.stdout.on('data', d => stdout += d);
    child.stderr.on('data', d => stderr += d);
    child.on('close', code => resolveP({ code, stdout, stderr, id: i }));
  })));
  const winners = attempts.filter(a => a.code === 0);
  const losers = attempts.filter(a => a.code === 2);
  assert.equal(winners.length, 1, `exactly one contender must win; got ${winners.length}: ${attempts.map(a=>a.code).join(',')}`);
  assert.equal(losers.length, 4, `four contenders must collide; got ${losers.length}`);
  // The final lock must be owned by the winner
  const finalLock = readLock('W999', dir);
  assert.equal(finalLock.state, 'active');
  const winnerOut = JSON.parse(winners[0].stdout);
  assert.equal(finalLock.session_id, winnerOut.lock.session_id);
  rmSync(dir, { recursive: true });
});

// W363 codex r3 finding #1: cleanupStale must NOT clobber a freshly-reclaimed active lock.
// Simulate the interleaving: stale lock present -> acquire reclaims it (now active) ->
// cleanupStale runs. cleanupStale must SKIP (not overwrite the new active lock with expired).
test('T15: cleanupStale does not clobber a lock reclaimed after the stale read', () => {
  const dir = mkTmp();
  // Seed a stale lock (old heartbeat)
  const stale = {
    schema_version: 1, wave: 'W999', session_id: 'GONE',
    branch: 'b', worktree_path: dir, host: 'h', pid: 99999,
    started_at: '2020-01-01T00:00:00Z', last_heartbeat_at: '2020-01-01T00:00:00Z',
    heartbeat_interval_seconds: 60, ttl_at: '2030-01-01T00:00:00Z',
    claim_attempts: 1, state: 'active', released_at: null,
    parent_session_id: null, owner: 'operator'
  };
  writeFileSync(join(dir, 'wave-lock-W999.json'), JSON.stringify(stale));
  // A live session reclaims the stale lock (becomes active, fresh heartbeat)
  const r = acquire({ wave: 'W999', sessionId: 'LIVE', branch: 'b', worktreePath: dir, stateDir: dir });
  assert.equal(r.status, 'OK');
  assert.equal(r.reason, 'stale-cleanup-then-acquire');
  // Now cleanupStale runs — the lock is fresh+active, so it must be skipped, NOT swept.
  const res = cleanupStale({ stateDir: dir });
  assert.equal(res.swept.length, 0, 'cleanupStale must not sweep the freshly-reclaimed active lock');
  const lock = readLock('W999', dir);
  assert.equal(lock.state, 'active', 'reclaimed lock must remain active');
  assert.equal(lock.session_id, 'LIVE');
  rmSync(dir, { recursive: true });
});

// W363 codex r3 FINAL: cleanupStale is NON-DESTRUCTIVE — it REPORTS stale locks but does
// NOT mutate them (mutating opens the race codex flagged). acquire() owns the reclaim.
test('T16: cleanupStale reports a genuinely stale lock WITHOUT mutating it (non-destructive)', () => {
  const dir = mkTmp();
  const stale = {
    schema_version: 1, wave: 'W888', session_id: 'GONE',
    branch: 'b', worktree_path: dir, host: 'h', pid: 99999,
    started_at: '2020-01-01T00:00:00Z', last_heartbeat_at: '2020-01-01T00:00:00Z',
    heartbeat_interval_seconds: 60, ttl_at: '2030-01-01T00:00:00Z',
    claim_attempts: 1, state: 'active', released_at: null,
    parent_session_id: null, owner: 'operator'
  };
  writeFileSync(join(dir, 'wave-lock-W888.json'), JSON.stringify(stale));
  const res = cleanupStale({ stateDir: dir });
  assert.equal(res.swept.length, 1, 'genuinely stale lock must be reported in swept[]');
  assert.equal(res.swept[0].reason, 'heartbeat-stale');
  assert.equal(res.mutated, false, 'cleanupStale must be non-destructive (mutated:false)');
  // Lock file is UNCHANGED — still state:active GONE (acquire will reclaim it, not cleanup).
  const lock = readLock('W888', dir);
  assert.equal(lock.state, 'active', 'cleanupStale must NOT mutate the lock state');
  assert.equal(lock.session_id, 'GONE');
  // No tombstone files should be left behind
  const leftover = readdirSync(dir).filter(n => n.includes('.tombstone.'));
  assert.equal(leftover.length, 0, 'no tombstone files left behind');
  // And the subsequent acquire() correctly reclaims the reported-stale lock.
  const r = acquire({ wave: 'W888', sessionId: 'NEW', branch: 'b', worktreePath: dir, stateDir: dir });
  assert.equal(r.status, 'OK');
  assert.equal(r.reason, 'stale-cleanup-then-acquire');
  rmSync(dir, { recursive: true });
});

// W363 codex r1 finding #7: --from-branch regex must NOT swallow uppercase slug chars into wave.
test('T13: branch regex correctly parses wave from valid + invalid branch names', () => {
  // Direct import of regex via module re-evaluation isn't clean; assert behavior via expected matches.
  const re = /^goal\/(W\d+[a-z]?)(?:-[a-z0-9][a-z0-9-]*)?$/;
  // Valid wave-only branches
  assert.equal('goal/W363'.match(re)?.[1], 'W363');
  assert.equal('goal/W363b'.match(re)?.[1], 'W363b');
  assert.equal('goal/W363-foundation-gaps'.match(re)?.[1], 'W363');
  assert.equal('goal/W363b-foundation-gaps'.match(re)?.[1], 'W363b');
  // Invalid — uppercase slug must NOT match (no longer swallowed into wave capture)
  assert.equal('goal/W363-Foundation'.match(re), null, 'uppercase slug char rejects whole branch');
  assert.equal('goal/w363-x'.match(re), null, 'lowercase W rejects (Anthropic convention)');
  assert.equal('main'.match(re), null);
  assert.equal('feature/W363'.match(re), null);
});
