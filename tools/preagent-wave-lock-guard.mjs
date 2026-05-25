#!/usr/bin/env node
// tools/preagent-wave-lock-guard.mjs — W363 cross-session wave-lock guard.
//
// Schema, algorithm, and tests per:
//   docs/superpowers/specs/2026-05-21-sota-parallel-workflow-design.md §5.1
//   docs/superpowers/plans/2026-05-21-W363-foundation-gap-closure.md Task 1
//
// SOTA convergent pattern: file-as-lock + atomic-rename-claim + heartbeat-bounded
// TTL + owner identity + stale-sweep + idempotent re-entry via stable owner ID.
// Anchors: LangGraph ThreadTTLConfig + multica EnsureDaemonID + Cloudflare instance ID.

import { existsSync, readFileSync, writeFileSync, openSync, closeSync, renameSync, unlinkSync, readdirSync, statSync, mkdirSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import { randomBytes, randomUUID } from 'node:crypto';
import { hostname } from 'node:os';
import { fileURLToPath } from 'node:url';

const SCHEMA_VERSION = 1;
const DEFAULT_TTL_SECONDS = 7 * 24 * 3600; // 7 days
const DEFAULT_HEARTBEAT_INTERVAL_SECONDS = 60;
const STALE_MULTIPLIER = 3;

function nowIso() { return new Date().toISOString(); }
function addSecondsIso(seconds) { return new Date(Date.now() + seconds * 1000).toISOString(); }
function lockPath(wave, stateDir) { return join(stateDir, `wave-lock-${wave}.json`); }

function buildPayload({ wave, sessionId, parentSessionId, branch, worktreePath, owner = 'operator', ttlSeconds = DEFAULT_TTL_SECONDS, heartbeatIntervalSeconds = DEFAULT_HEARTBEAT_INTERVAL_SECONDS, claimAttempts = 1 }) {
  return {
    schema_version: SCHEMA_VERSION,
    wave,
    session_id: sessionId,
    parent_session_id: parentSessionId ?? null,
    owner,
    branch,
    worktree_path: worktreePath,
    host: hostname(),
    pid: process.pid,
    started_at: nowIso(),
    last_heartbeat_at: nowIso(),
    heartbeat_interval_seconds: heartbeatIntervalSeconds,
    ttl_at: addSecondsIso(ttlSeconds),
    claim_attempts: claimAttempts,
    state: 'active',
    released_at: null,
  };
}

function atomicWrite(path, content, maxRetries = 4) {
  mkdirSync(dirname(path), { recursive: true });
  const tmp = `${path}.${process.pid}.${randomBytes(4).toString('hex')}.tmp`;
  writeFileSync(tmp, content, { encoding: 'utf8' });
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try { renameSync(tmp, path); return; }
    catch (err) {
      if (['EBUSY', 'EPERM', 'EACCES'].includes(err.code) && attempt < maxRetries - 1) {
        // Sync sleep via Atomics.wait on a SharedArrayBuffer would be ideal; busy-wait is OK for 250ms.
        const end = Date.now() + 250;
        while (Date.now() < end) { /* spin */ }
        continue;
      }
      try { unlinkSync(tmp); } catch {}
      throw err;
    }
  }
}

function exclusiveCreate(path, content) {
  mkdirSync(dirname(path), { recursive: true });
  // O_CREAT|O_EXCL via 'wx' flag — kernel-atomic rejection if file exists
  const fd = openSync(path, 'wx');
  try { writeFileSync(fd, content, { encoding: 'utf8' }); } finally { closeSync(fd); }
}

// W363 codex r2 finding #1 fix: race-safe reclamation via atomic rename-then-create.
// Prior unlink+wx had a TOCTOU window: A.unlink -> A.create -> B.unlink (deletes A!) -> B.create.
// Correct pattern: atomically RENAME the existing lockfile to a tombstone path. Only one
// contender's rename succeeds because the source-path becomes ENOENT after the first move
// (Windows MoveFileEx without REPLACE_EXISTING is atomic and fails if a previous rename
// already removed the source). The winner then exclusive-creates the new lock. Losers see
// ENOENT on rename and report COLLISION (the winner is reading-back the active file).
function reclaimViaRenameMarker(path, content) {
  const tombstone = `${path}.tombstone.${process.pid}.${randomBytes(4).toString('hex')}`;
  // rename(path, tombstone): only ONE concurrent caller can succeed — the second sees ENOENT.
  try { renameSync(path, tombstone); }
  catch (err) {
    if (err.code === 'ENOENT') {
      const e = new Error('lost-rename-race'); e.code = 'LOST_RACE'; throw e;
    }
    throw err;
  }
  // Winner: exclusive-create the new active lock. If somehow another contender beat us
  // to creating a new lock (cleanup-stale sweep racing in parallel), exclusive-create
  // will EEXIST and we surface that as a lost race too.
  try { exclusiveCreate(path, content); }
  catch (err) {
    if (err.code === 'EEXIST') {
      // Roll the tombstone back? No — winner crashed before deleting tombstone is fine;
      // it's a noise file. Surface lost race.
      const e = new Error('lost-create-race-after-rename'); e.code = 'LOST_RACE'; throw e;
    }
    throw err;
  }
  // Cleanup tombstone (best-effort; not critical for correctness).
  try { unlinkSync(tombstone); } catch {}
}

export function readLock(wave, stateDir) {
  const path = lockPath(wave, stateDir);
  if (!existsSync(path)) return null;
  return JSON.parse(readFileSync(path, 'utf8'));
}

// W363 codex r3 finding #2 fix: after losing a reclaim race, the winner may not have
// recreated the lock yet (window between rename-away and exclusive-create). Tolerate
// transient ENOENT / parse-mid-write by retrying a few times with a short spin. Returns
// the parsed winner lock, or null if the path never materializes (winner crashed).
function readLockWithRetry(path, maxRetries = 8) {
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      if (existsSync(path)) {
        const raw = readFileSync(path, 'utf8');
        if (raw.trim()) return JSON.parse(raw);
      }
    } catch (err) {
      if (err.code !== 'ENOENT' && !(err instanceof SyntaxError)) throw err;
      // ENOENT or partial-write JSON parse error — retry.
    }
    const end = Date.now() + 30;
    while (Date.now() < end) { /* spin */ }
  }
  return null;
}

function isStale(lock) {
  if (lock.state !== 'active') return false;
  const heartbeatAge = (Date.now() - new Date(lock.last_heartbeat_at).getTime()) / 1000;
  const staleThreshold = STALE_MULTIPLIER * (lock.heartbeat_interval_seconds || DEFAULT_HEARTBEAT_INTERVAL_SECONDS);
  return heartbeatAge > staleThreshold;
}

function isExpired(lock) {
  return new Date(lock.ttl_at).getTime() <= Date.now();
}

export function acquire(opts) {
  const { wave, sessionId, parentSessionId = null, branch, worktreePath, stateDir = '.claude/state', ttlSeconds = DEFAULT_TTL_SECONDS } = opts;
  const path = lockPath(wave, stateDir);
  const payload = buildPayload({ wave, sessionId, parentSessionId, branch, worktreePath, ttlSeconds });
  // Fast path: file doesn't exist → exclusive-create
  if (!existsSync(path)) {
    try { exclusiveCreate(path, JSON.stringify(payload, null, 2)); return { status: 'OK', reason: 'first-claim', lock: payload }; }
    catch (err) { if (err.code !== 'EEXIST') throw err; /* fall through to collision path */ }
  }
  // Slow path: file exists OR race lost — analyze
  let existing;
  try { existing = JSON.parse(readFileSync(path, 'utf8')); }
  catch (err) { return { status: 'COLLISION', reason: `cannot-parse-existing-lock: ${err.message}`, existing: null, attempted: payload }; }
  if (existing.schema_version !== SCHEMA_VERSION) {
    return { status: 'COLLISION', reason: `schema_version ${existing.schema_version} != ${SCHEMA_VERSION}; migration required`, existing, attempted: payload };
  }
  if (existing.state === 'poisoned') {
    return { status: 'COLLISION', reason: 'lock state=poisoned; operator must clear via --cleanup-poisoned', existing, attempted: payload };
  }
  // W363 codex r2 finding #2 fix: state-non-active reclaim paths MUST run BEFORE the
  // same-session/fork idempotent-re-entry path. Prior ordering let same-session
  // release-then-reacquire return OK on a state=released lock, then validate gate
  // (state !== active) would fail. Correct order: handle released/expired/stale FIRST
  // (full reclaim with fresh active payload), THEN same-session idempotent re-entry
  // applies only to state=active locks.
  if (existing.state === 'released') {
    try { reclaimViaRenameMarker(path, JSON.stringify(payload, null, 2)); return { status: 'OK', reason: 'replaced-released-lock', lock: payload }; }
    catch (err) {
      if (err.code !== 'LOST_RACE') throw err;
      // W363 codex r3 finding #2: tolerate winner mid-create window — read-back may
      // transiently ENOENT. readLockWithRetry returns null only if winner never landed.
      const winner = readLockWithRetry(path);
      return { status: 'COLLISION', reason: 'lost-reclaim-race-against-released-lock', existing: winner, attempted: payload, help_text: winner ? helpText(wave, winner, payload) : 'lost reclaim race; winner lock not yet materialized' };
    }
  }
  if (isExpired(existing) || isStale(existing)) {
    const cleanedReason = isExpired(existing) ? 'ttl-expired' : 'heartbeat-stale';
    try { reclaimViaRenameMarker(path, JSON.stringify(payload, null, 2)); return { status: 'OK', reason: 'stale-cleanup-then-acquire', cleaned_reason: cleanedReason, lock: payload, cleaned: existing }; }
    catch (err) {
      if (err.code !== 'LOST_RACE') throw err;
      const winner = readLockWithRetry(path);
      return { status: 'COLLISION', reason: `lost-reclaim-race-against-${cleanedReason}-lock`, existing: winner, attempted: payload, help_text: winner ? helpText(wave, winner, payload) : 'lost reclaim race; winner lock not yet materialized' };
    }
  }
  // From here, existing.state === 'active' AND lock is fresh. Same-session and fork
  // idempotent re-entry now applies cleanly without preserving stale state.
  if (existing.session_id === sessionId) {
    const refreshed = { ...existing, last_heartbeat_at: nowIso(), claim_attempts: (existing.claim_attempts || 1) + 1 };
    atomicWrite(path, JSON.stringify(refreshed, null, 2));
    return { status: 'OK', reason: 'idempotent-re-entry', lock: refreshed };
  }
  if (existing.session_id === parentSessionId || existing.parent_session_id === sessionId) {
    const refreshed = { ...existing, last_heartbeat_at: nowIso(), claim_attempts: (existing.claim_attempts || 1) + 1 };
    atomicWrite(path, JSON.stringify(refreshed, null, 2));
    return { status: 'OK', reason: 'fork-re-entry', lock: refreshed };
  }
  // Live collision
  return {
    status: 'COLLISION',
    reason: `wave ${wave} claimed by different session ${existing.session_id}@${existing.host}:${existing.pid} since ${existing.started_at}`,
    existing,
    attempted: payload,
    help_text: helpText(wave, existing, payload),
  };
}

export function validate({ wave, sessionId, stateDir = '.claude/state' }) {
  const lock = readLock(wave, stateDir);
  if (!lock) return { status: 'FAIL', reason: `no lock for wave ${wave}; acquire first via eee.ps1 --Wave ${wave}`, help_text: '' };
  if (lock.schema_version !== SCHEMA_VERSION) return { status: 'FAIL', reason: `schema_version mismatch`, help_text: 'migration required' };
  if (isExpired(lock)) return { status: 'FAIL', reason: `lock ttl_at=${lock.ttl_at} is in the past; cleanup + re-acquire`, help_text: '' };
  // W363 codex r1 finding #4: same-session bypass MUST require state === 'active'.
  // Non-active states (released/expired/poisoned) MUST fail validate even if owned by
  // the current session, because the lock is no longer authoritative for commit gating.
  if (lock.state !== 'active') return { status: 'FAIL', reason: `lock state=${lock.state} is not active; release-then-reacquire required`, help_text: '' };
  if (lock.state === 'poisoned') return { status: 'FAIL', reason: 'lock state=poisoned; operator must clear', help_text: '' };
  if (lock.session_id === sessionId || lock.parent_session_id === sessionId) return { status: 'OK', lock };
  return {
    status: 'FAIL',
    reason: `wave ${wave} claimed by different session ${lock.session_id}@${lock.host}:${lock.pid}; current session=${sessionId}`,
    help_text: helpText(wave, lock, null),
  };
}

export function release({ wave, sessionId, stateDir = '.claude/state' }) {
  const lock = readLock(wave, stateDir);
  if (!lock) return { status: 'NOOP', reason: 'no lock to release' };
  if (lock.session_id !== sessionId) return { status: 'FAIL', reason: `cannot release lock owned by ${lock.session_id}` };
  const released = { ...lock, state: 'released', released_at: nowIso() };
  atomicWrite(lockPath(wave, stateDir), JSON.stringify(released, null, 2));
  return { status: 'OK', lock: released };
}

// W363 codex r3 finding #1 FINAL fix: cleanupStale is NON-DESTRUCTIVE.
//
// Root cause of the residual race (codex r3): ANY rewrite of the lock file by cleanupStale
// — whether unconditional atomicWrite OR rename-claim-then-recreate — opens a window in
// which a concurrent acquire() can reclaim the lock (state:active) and a third session can
// then steal the wave during the path-vacancy gap. There is no single-syscall compare-and-
// swap-on-content primitive across both POSIX and Win32 to close it.
//
// Resolution: the AUTHORITATIVE stale->active transition is owned EXCLUSIVELY by acquire(),
// which already does race-safe reclaim via reclaimViaRenameMarker (O_EXCL claim point). A
// stale lock is correctly reclaimed by the next acquire() regardless of whether cleanupStale
// marked it `expired`. The `expired` state was purely cosmetic/observability — and it was
// the sole source of the race. So cleanupStale now ONLY REPORTS stale locks (read-only); it
// performs ZERO writes. No write => no vacancy window => race fully eliminated.
//
// Operator-facing semantics preserved: `--cleanup-stale` still enumerates which locks are
// stale/expired (in `swept[]` for back-compat) so the operator sees what acquire() will
// reclaim. `mutated:false` flag signals the read-only contract.
export function cleanupStale({ stateDir = '.claude/state' } = {}) {
  if (!existsSync(stateDir)) return { swept: [], skipped: [], mutated: false };
  const swept = []; const skipped = [];
  for (const name of readdirSync(stateDir)) {
    if (!name.startsWith('wave-lock-') || !name.endsWith('.json')) continue;
    if (name.includes('.tombstone.') || name.endsWith('.tmp')) continue;
    const path = join(stateDir, name);
    let lock; try { lock = JSON.parse(readFileSync(path, 'utf8')); } catch { skipped.push({ name, reason: 'parse-error' }); continue; }
    if (isExpired(lock) || isStale(lock)) {
      // Read-only report. acquire() will reclaim on next claim; we do NOT mutate here.
      swept.push({ name, wave: lock.wave, reason: isExpired(lock) ? 'ttl-expired' : 'heartbeat-stale', note: 'reclaimable-by-next-acquire (cleanupStale is non-destructive)' });
    } else {
      skipped.push({ name, reason: 'still-live' });
    }
  }
  return { swept, skipped, mutated: false };
}

function helpText(wave, existing, attempted) {
  return [
    `ERROR: wave-lock collision on ${wave}`,
    `  Existing claim: session=${existing.session_id} host=${existing.host} pid=${existing.pid} started=${existing.started_at} branch=${existing.branch}`,
    attempted ? `  Current session: session=${attempted.session_id} branch=${attempted.branch}` : '',
    '',
    'This branch is already claimed by another session. Options:',
    `  1. If the other session is dead: it will auto-reclaim once the lock goes stale (heartbeat>3x interval) or TTL-expires; inspect with node tools/preagent-wave-lock-guard.mjs --cleanup-stale (read-only report) then re-run eee.ps1 --Wave ${wave} to reclaim.`,
    '  2. If resuming legitimately: claude --resume <session-id> (NOT --fork)',
    '  3. If forking intentionally: claim a new wave number for this work',
    `  4. View lock: cat .claude/state/wave-lock-${wave}.json`,
  ].filter(Boolean).join('\n');
}

// CLI entrypoint — for pre-commit hook + operator manual invocation
// Cross-platform main-module detection (Windows file:///Z:/... vs *nix file:///home/...)
const __filename = fileURLToPath(import.meta.url);
if (process.argv[1] && resolve(process.argv[1]) === __filename) {
  const args = process.argv.slice(2);
  const cmd = args[0];
  const get = (flag, def = null) => { const i = args.indexOf(flag); return i >= 0 ? args[i + 1] : def; };
  const stateDir = get('--state-dir', '.claude/state');
  let result;
  switch (cmd) {
    case '--acquire': {
      // W363 codex r1 finding #3 fix: PowerShell delegates here for race-safe claim.
      // Required: --wave + --session-id + --branch + --worktree-path
      const wave = get('--wave');
      const sessionId = get('--session-id') ?? process.env.CLAUDE_SESSION_ID;
      const branch = get('--branch');
      const worktreePath = get('--worktree-path');
      const parentSessionId = get('--parent-session-id');
      if (!wave || !sessionId || !branch || !worktreePath) {
        console.error('--acquire requires --wave + --session-id + --branch + --worktree-path');
        process.exit(2);
      }
      result = acquire({ wave, sessionId, parentSessionId, branch, worktreePath, stateDir });
      if (result.status === 'COLLISION') {
        console.error(JSON.stringify(result, null, 2));
        if (result.help_text) console.error(result.help_text);
        process.exit(2);
      }
      console.log(JSON.stringify(result, null, 2));
      process.exit(0);
    }
    case '--validate': {
      let wave = get('--wave');
      if (!wave && args.includes('--from-branch')) {
        const { execSync } = await import('node:child_process');
        const branch = execSync('git rev-parse --abbrev-ref HEAD', { encoding: 'utf8' }).trim();
        // W363 codex r1 finding #7: wave token = W + digits + optional lowercase
        // variant letter (e.g. W363, W363b). Slug tail = lowercase + digits + dashes.
        // Uppercase / underscore branches do not match — they are not wave branches.
        const m = branch.match(/^goal\/(W\d+[a-z]?)(?:-[a-z0-9][a-z0-9-]*)?$/);
        if (!m) {
          console.log(JSON.stringify({ status: 'OK', reason: `branch ${branch} does not match wave pattern; no validation needed` }, null, 2));
          process.exit(0);
        }
        wave = m[1];
      }
      if (!wave) { console.error('--validate requires --wave or --from-branch'); process.exit(2); }
      result = validate({ wave, sessionId: get('--session-id') ?? process.env.CLAUDE_SESSION_ID ?? '', stateDir });
      break;
    }
    case '--cleanup-stale':
      result = cleanupStale({ stateDir });
      break;
    case '--release':
      result = release({ wave: get('--wave'), sessionId: get('--session-id') ?? process.env.CLAUDE_SESSION_ID ?? '', stateDir });
      break;
    case '--show':
      result = { lock: readLock(get('--wave'), stateDir) };
      break;
    case '--help':
    case undefined:
      console.error('Usage: preagent-wave-lock-guard.mjs --validate|--cleanup-stale|--release|--show --wave <Wn> [--session-id <id>] [--state-dir <path>]');
      process.exit(0);
    default:
      console.error(`Unknown command: ${cmd}`);
      process.exit(2);
  }
  if (result?.status === 'FAIL' || result?.status === 'COLLISION') {
    console.error(JSON.stringify(result, null, 2));
    if (result.help_text) console.error(result.help_text);
    process.exit(2);
  }
  console.log(JSON.stringify(result, null, 2));
  process.exit(0);
}
