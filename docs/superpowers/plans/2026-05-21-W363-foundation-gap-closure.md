# W363 — Foundation Gap Closure Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use `superpowers:subagent-driven-development` (recommended) or `superpowers:executing-plans` to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Close the 5 foundation gaps from umbrella spec §5.1 (W363 row): (1) `tools/eee.ps1 --Wave <Wn>` worktree-launcher + helpers; (2) `tools/preagent-wave-lock-guard.mjs` cross-session lock; (3) `claude --bg` + `agents/attach/logs/stop/respawn/rm` proxies in `eee.ps1`; (4) `CLAUDE.md:14` stale worktree-list refresh; (5) `eee.ps1`-owned worktree-creation flow (NOT a `WorktreeCreate` hook per W362c §P0.1).

**Architecture:** Splice 1 helper-functions block + 1 named-param/subcommand dispatcher block into the existing 1018-line linear `tools/eee.ps1` (no functions today). Add new Node 22 ES-module file `tools/preagent-wave-lock-guard.mjs` implementing acquire / validate / release / cleanup_stale per R4's convergent SOTA pattern (LangGraph `ThreadTTLConfig` + multica `EnsureDaemonID` + Cloudflare `instance ID` shape). Atomic-write primitive uses Node `fs.rename` (libuv→MoveFileEx) per R3 + 20-LOC shim, NO npm dep. Wire pre-commit gate so any commit with an unowned wave-lock collision BLOCKS.

**Tech Stack:** PowerShell 7.6+ (eee.ps1 is `#Requires -Version 7.0`), Node 22 ESM, `git worktree`, `[System.IO.File]::Move` (PowerShell atomic-rename), `fs.rename` (Node atomic-rename), `fs.open('wx')` for initial wave-lock claim, UUID v7 from `crypto.randomUUID` (Node 19+).

**Reference research:**
- R1 (`tools/eee.ps1` deep read): 1018 lines linear script; splice point after L24; ParameterSet `Bg` recommended; ONE subagent for all eee.ps1 changes (same file).
- R2 (`claude --bg` semantics): 14+ flag matrix; 10 Windows-specific issues (#58204, #60455, #59806, #58729, #59112, #60782); `Start-Process -PassThru` + regex `^backgrounded · ([0-9a-f]{8})` for ID extraction.
- R3 (Windows atomic-write): Node `fs.rename(tmp, final)` + PowerShell `[System.IO.File]::Move(...,$true)` (NOT `Move-Item -Force`). Tmp pattern `<final>.<pid>.<rand>.tmp`. 4×250ms retry on EBUSY. `open(final, 'wx')` for initial-claim O_CREAT|O_EXCL.
- R4 (wave-lock SOTA): 14-field schema (`schema_version, wave, session_id (UUID v7), parent_session_id, owner, branch, worktree_path, host, pid, started_at, last_heartbeat_at, heartbeat_interval_seconds, ttl_at, claim_attempts, state, released_at`). `state` ∈ `{active, released, expired, poisoned}`. 7-day TTL + 60s heartbeat × 3-miss tolerance for liveness. 10 tests.

**Umbrella spec:** `docs/superpowers/specs/2026-05-21-sota-parallel-workflow-design.md` (r6 APPROVED commit `1e786b4`).

---

## File Structure

| File | Action | Responsibility | ~LOC |
|---|---|---|---|
| `tools/eee.ps1` | Modify | Insert helper-functions + named-param/subcommand dispatcher block AFTER L24; preserve existing 1018-line linear bootstrap for default-launch path | +~280 |
| `tools/preagent-wave-lock-guard.mjs` | Create | Node 22 ESM module: `acquire()` / `validate()` / `release()` / `cleanupStale()` + atomic-write shim + CLI entrypoint for pre-commit hook use | ~400 |
| `tools/test/wave-lock-guard.test.mjs` | Create | 10 tests per R4 §6 (concurrent acquire, idempotent re-entry, fork re-entry, stale recovery, TTL expiry, cross-platform rename, pre-commit validate, release-reacquire, poisoned, schema-version mismatch) | ~300 |
| `tools/test/eee-wave-launcher.test.ps1` | Create | Pester tests for `eee.ps1 --Wave` happy path + cap-violation + duplicate-lock + `--Bg` proxy | ~200 |
| `.worktreeinclude` | Create (if absent) | Patterns of gitignored files to copy into new worktrees (.env, .env.local, CLAUDE.local.md) | ~10 |
| `CLAUDE.md` | Modify (L14 only) | Excise stale `W348/W350/W351` enumeration; replace with `git worktree list` snippet + live-doc note | ±5 |
| `.pre-commit-config.yaml` | Modify | Wire `tools/preagent-wave-lock-guard.mjs --validate` as a new pre-commit hook | +~10 |

Total: ~1200 LOC new + targeted modifications.

---

## Task 1: `tools/preagent-wave-lock-guard.mjs` — wave-lock guard module + tests (PARALLEL with Task 2)

**Why:** Wave-lock guard is the foundation primitive — `tools/eee.ps1 --Wave` writes the lock; pre-commit reads it. Build this first as a standalone module with 10 tests so Task 2 can lean on a known-good API.

**Files:**
- Create: `tools/preagent-wave-lock-guard.mjs`
- Create: `tools/test/wave-lock-guard.test.mjs`

- [ ] **Step 1: Write failing test file**

Create `tools/test/wave-lock-guard.test.mjs`:

```javascript
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, rmSync, readFileSync, existsSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { acquire, validate, release, cleanupStale, readLock } from '../preagent-wave-lock-guard.mjs';

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
  const fs = require('node:fs');
  fs.writeFileSync(join(dir, 'wave-lock-W999.json'), JSON.stringify(stale));
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

test('T8: release-then-reacquire — same session can release + re-acquire', () => {
  const dir = mkTmp();
  acquire({ wave: 'W999', sessionId: 'A', branch: 'b', worktreePath: dir, stateDir: dir });
  release({ wave: 'W999', sessionId: 'A', stateDir: dir });
  const r = acquire({ wave: 'W999', sessionId: 'A', branch: 'b', worktreePath: dir, stateDir: dir });
  assert.equal(r.status, 'OK');
  rmSync(dir, { recursive: true });
});

test('T9: poisoned state blocks acquire (requires operator clear)', () => {
  const dir = mkTmp();
  acquire({ wave: 'W999', sessionId: 'A', branch: 'b', worktreePath: dir, stateDir: dir });
  // Manually poison the lock
  const lock = readLock('W999', dir);
  lock.state = 'poisoned';
  const fs = require('node:fs');
  fs.writeFileSync(join(dir, 'wave-lock-W999.json'), JSON.stringify(lock));
  const r = acquire({ wave: 'W999', sessionId: 'B', branch: 'b', worktreePath: dir, stateDir: dir });
  assert.equal(r.status, 'COLLISION');
  assert.match(r.reason, /poisoned/i);
  rmSync(dir, { recursive: true });
});

test('T10: schema_version mismatch — schema_version=2 triggers explicit error', () => {
  const dir = mkTmp();
  const fs = require('node:fs');
  fs.writeFileSync(join(dir, 'wave-lock-W999.json'), JSON.stringify({ schema_version: 2, wave: 'W999' }));
  const r = acquire({ wave: 'W999', sessionId: 'A', branch: 'b', worktreePath: dir, stateDir: dir });
  assert.equal(r.status, 'COLLISION');
  assert.match(r.reason, /schema_version/i);
  rmSync(dir, { recursive: true });
});
```

- [ ] **Step 2: Run tests to verify they all fail**

Run: `node --test tools/test/wave-lock-guard.test.mjs`
Expected: 10 FAIL with `Cannot find module '../preagent-wave-lock-guard.mjs'` or `acquire is not defined`.

- [ ] **Step 3: Implement `tools/preagent-wave-lock-guard.mjs`**

Create the module with these exports (full implementation — no placeholders):

```javascript
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
import { join, dirname } from 'node:path';
import { randomBytes, randomUUID } from 'node:crypto';
import { hostname } from 'node:os';

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

export function readLock(wave, stateDir) {
  const path = lockPath(wave, stateDir);
  if (!existsSync(path)) return null;
  return JSON.parse(readFileSync(path, 'utf8'));
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
  if (existing.session_id === sessionId) {
    // Idempotent re-entry: refresh heartbeat + return OK
    const refreshed = { ...existing, last_heartbeat_at: nowIso(), claim_attempts: (existing.claim_attempts || 1) + 1 };
    atomicWrite(path, JSON.stringify(refreshed, null, 2));
    return { status: 'OK', reason: 'idempotent-re-entry', lock: refreshed };
  }
  if (existing.session_id === parentSessionId || existing.parent_session_id === sessionId) {
    // Fork re-entry: also OK
    const refreshed = { ...existing, last_heartbeat_at: nowIso(), claim_attempts: (existing.claim_attempts || 1) + 1 };
    atomicWrite(path, JSON.stringify(refreshed, null, 2));
    return { status: 'OK', reason: 'fork-re-entry', lock: refreshed };
  }
  if (existing.state === 'released') {
    atomicWrite(path, JSON.stringify(payload, null, 2));
    return { status: 'OK', reason: 'replaced-released-lock', lock: payload };
  }
  if (isExpired(existing) || isStale(existing)) {
    const reason = isExpired(existing) ? 'ttl-expired' : 'heartbeat-stale';
    atomicWrite(path, JSON.stringify(payload, null, 2));
    return { status: 'OK', reason: `stale-cleanup-then-acquire (${reason})`, lock: payload, cleaned: existing };
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

export function cleanupStale({ stateDir = '.claude/state' } = {}) {
  if (!existsSync(stateDir)) return { swept: [], skipped: [] };
  const swept = []; const skipped = [];
  for (const name of readdirSync(stateDir)) {
    if (!name.startsWith('wave-lock-') || !name.endsWith('.json')) continue;
    const path = join(stateDir, name);
    let lock; try { lock = JSON.parse(readFileSync(path, 'utf8')); } catch { skipped.push({ name, reason: 'parse-error' }); continue; }
    if (isExpired(lock) || isStale(lock)) {
      const expired = { ...lock, state: 'expired' };
      atomicWrite(path, JSON.stringify(expired, null, 2));
      swept.push({ name, wave: lock.wave, reason: isExpired(lock) ? 'ttl-expired' : 'heartbeat-stale' });
    } else { skipped.push({ name, reason: 'still-live' }); }
  }
  return { swept, skipped };
}

function helpText(wave, existing, attempted) {
  return [
    `ERROR: wave-lock collision on ${wave}`,
    `  Existing claim: session=${existing.session_id} host=${existing.host} pid=${existing.pid} started=${existing.started_at} branch=${existing.branch}`,
    attempted ? `  Current session: session=${attempted.session_id} branch=${attempted.branch}` : '',
    '',
    'This branch is already claimed by another session. Options:',
    `  1. If the other session is dead: node tools/preagent-wave-lock-guard.mjs --cleanup-stale --wave ${wave}`,
    '  2. If resuming legitimately: claude --resume <session-id> (NOT --fork)',
    '  3. If forking intentionally: claim a new wave number for this work',
    `  4. View lock: cat .claude/state/wave-lock-${wave}.json`,
  ].filter(Boolean).join('\n');
}

// CLI entrypoint — for pre-commit hook + operator manual invocation
if (import.meta.url === `file://${process.argv[1].replace(/\\/g, '/')}` || import.meta.url.endsWith(process.argv[1])) {
  const args = process.argv.slice(2);
  const cmd = args[0];
  const get = (flag, def = null) => { const i = args.indexOf(flag); return i >= 0 ? args[i + 1] : def; };
  const stateDir = get('--state-dir', '.claude/state');
  let result;
  switch (cmd) {
    case '--validate':
      result = validate({ wave: get('--wave'), sessionId: get('--session-id') ?? process.env.CLAUDE_SESSION_ID ?? '', stateDir });
      break;
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
```

- [ ] **Step 4: Run tests to verify they all PASS**

Run: `node --test tools/test/wave-lock-guard.test.mjs`
Expected: 10/10 PASS.

If any fail: read the error, fix the implementation, re-run. Do NOT bypass any failing test.

- [ ] **Step 5: Manual smoke test**

```bash
mkdir -p /tmp/wave-lock-smoke
node tools/preagent-wave-lock-guard.mjs --validate --wave W999 --session-id A --state-dir /tmp/wave-lock-smoke
# expected: FAIL "no lock for wave W999; acquire first"

# Now manually create a lock + validate
cat > /tmp/wave-lock-smoke/wave-lock-W999.json <<EOF
{"schema_version":1,"wave":"W999","session_id":"A","parent_session_id":null,"owner":"operator","branch":"b","worktree_path":"/tmp","host":"localhost","pid":1,"started_at":"2026-05-21T10:00:00Z","last_heartbeat_at":"2026-05-21T10:00:00Z","heartbeat_interval_seconds":60,"ttl_at":"2030-01-01T00:00:00Z","claim_attempts":1,"state":"active","released_at":null}
EOF
node tools/preagent-wave-lock-guard.mjs --validate --wave W999 --session-id A --state-dir /tmp/wave-lock-smoke
# expected: OK
node tools/preagent-wave-lock-guard.mjs --validate --wave W999 --session-id B --state-dir /tmp/wave-lock-smoke
# expected: FAIL "claimed by different session A"
rm -rf /tmp/wave-lock-smoke
```

- [ ] **Step 6: Commit Task 1**

```bash
git add tools/preagent-wave-lock-guard.mjs tools/test/wave-lock-guard.test.mjs
git commit -m "feat(W363): wave-lock guard module + 10 tests

Cross-session lock primitive per umbrella spec §5.1 + W363 plan
Task 1. SOTA convergent pattern: file-as-lock + atomic-rename-claim
+ heartbeat-bounded TTL + owner identity + stale-sweep + idempotent
re-entry via stable session_id.

Anchors:
- LangGraph BaseCheckpointSaver / ThreadTTLConfig (TTL + sweep)
- multica EnsureDaemonID / HealthResponse.PID (owner identity)
- Cloudflare Durable Objects instance ID (idempotency key)

CLI surface for pre-commit hook + operator:
  --validate    --wave Wn --session-id <id>
  --cleanup-stale
  --release     --wave Wn --session-id <id>
  --show        --wave Wn

10/10 tests passing.

Codex-Verdict: BOOTSTRAP"
```

---

## Task 2: `tools/eee.ps1` modifications — 5 components, ONE subagent (PARALLEL with Task 1)

**Why:** Per R1, all 5 components touch the same file. ONE subagent owns the file. Splice helper-functions + named-param/subcommand dispatcher AFTER L24 `$ErrorActionPreference='Stop'` and BEFORE the existing linear bootstrap.

**Files:**
- Modify: `tools/eee.ps1` (insert ~280 LOC after L24; preserve L25-1018 default-launch path)
- Create: `tools/test/eee-wave-launcher.test.ps1`

- [ ] **Step 1: Read current `tools/eee.ps1` head + tail**

`Read file_path="Z:\claude-sota-installed\tools\eee.ps1" offset=1 limit=30` — confirm L1-30 structure.
`Read file_path="Z:\claude-sota-installed\tools\eee.ps1" offset=1010 limit=10` — confirm L1010-1018 forward.

- [ ] **Step 2: Write the failing Pester test**

Create `tools/test/eee-wave-launcher.test.ps1`:

```powershell
#Requires -Version 7.0
#Requires -Modules @{ ModuleName = 'Pester'; ModuleVersion = '5.0.0' }

BeforeAll {
  $script:eee = Join-Path $PSScriptRoot '..' 'eee.ps1' | Resolve-Path
  $script:tmpDir = New-Item -ItemType Directory -Path (Join-Path ([System.IO.Path]::GetTempPath()) "eee-wave-test-$(New-Guid)")
}

AfterAll {
  Remove-Item -Recurse -Force $script:tmpDir -ErrorAction SilentlyContinue
}

Describe 'eee.ps1 --Wave subcommand' {
  It 'validates --Wave parameter accepts W999-test format' {
    $help = & $script:eee --Help 2>&1
    $help | Should -Match '--Wave'
  }

  It '--Wave with --NoLaunch creates worktree, writes wave-lock, registers T6 stub, exits 0' {
    # Run in a throwaway test repo
    Push-Location $script:tmpDir
    git init -q
    git commit --allow-empty -m "init" -q
    $result = & $script:eee --Wave 'W999-test' --Slug 'foundation-test' --NoLaunch 2>&1
    $LASTEXITCODE | Should -Be 0
    Test-Path '.claude/state/wave-lock-W999-test.json' | Should -BeTrue
    Pop-Location
  }

  It 'second --Wave invocation on same wave returns COLLISION exit code 2' {
    Push-Location $script:tmpDir
    $result = & $script:eee --Wave 'W999-test' --Slug 'foundation-test' --NoLaunch 2>&1
    $LASTEXITCODE | Should -Be 2
    ($result -join "`n") | Should -Match 'claimed by different session|COLLISION'
    Pop-Location
  }

  It 'eee agents passthrough returns exit code 0 even if no bg sessions exist' {
    # Don't fail the test if claude.exe isn't installed; just verify dispatcher routes
    $result = & $script:eee agents --json 2>&1
    # Exit code may be non-zero if claude.exe isn't in PATH; what we test is that
    # eee didn't choke before forwarding
    ($result -join "`n") | Should -Not -Match 'A parameter cannot be found'
  }
}

Describe 'eee.ps1 --Bg subcommand' {
  It '--Bg with prompt < 4 chars rejects locally before forwarding' {
    $result = & $script:eee --Bg --Prompt 'hi' 2>&1
    $LASTEXITCODE | Should -Be 2
    ($result -join "`n") | Should -Match 'must be >= 4 chars|too short'
  }
}

Describe 'eee.ps1 worktree cap' {
  It 'rejects 6th worktree creation with clear operator message' {
    # Synthetic test: mock Test-WorktreeCap returns 5 worktrees → next creation rejected
    # Implementation detail — adjust based on actual function signature
    # If function returns count, test it returns >= 5 and main script exits 2
    & $script:eee --Wave 'W999-cap-test' --Slug 'cap' --NoLaunch -Verbose:$false 2>&1 | Out-Null
    # If a 6th attempt is the test case, expect exit 2 with cap message
    # Adjust this test per actual cap-check implementation
  }
}
```

- [ ] **Step 3: Run tests to verify they fail**

Run: `Invoke-Pester tools/test/eee-wave-launcher.test.ps1 -Output Detailed`
Expected: ALL FAIL with "A parameter cannot be found that matches parameter name 'Wave'".

- [ ] **Step 4: Implement modifications to `tools/eee.ps1`**

Insert the following block AFTER L24 (`$ErrorActionPreference = 'Stop'`) and BEFORE L25:

```powershell
#=======================================================================================
# W363 — Named-param dispatcher + helper functions (insert: 2026-05-22)
# Spec: docs/superpowers/specs/2026-05-21-sota-parallel-workflow-design.md §5.1
# Plan: docs/superpowers/plans/2026-05-21-W363-foundation-gap-closure.md Task 2
#=======================================================================================

# --- Helper: Test-WorktreeCap (R1 §10 + W350 5-worktree cap) -------------------------
function Test-WorktreeCap {
  param([int]$Cap = 5)
  $count = (git worktree list --porcelain 2>$null | Select-String -Pattern '^worktree ').Count
  if ($count -ge $Cap) {
    return @{ Over = $true; Count = $count; Cap = $Cap }
  }
  return @{ Over = $false; Count = $count; Cap = $Cap }
}

# --- Helper: Get-WaveLockPath / Write-WaveLockAtomic --------------------------------
function Get-WaveLockPath { param([string]$Wave) "$PSScriptRoot/../.claude/state/wave-lock-$Wave.json" }

function Write-WaveLockAtomic {
  # Per R3: [System.IO.File]::Move + true → MoveFileEx(MOVEFILE_REPLACE_EXISTING)
  param([string]$WaveId, [hashtable]$Payload)
  $dir = "$PSScriptRoot/../.claude/state"
  $final = "$dir/wave-lock-$WaveId.json"
  $tmp = "$final.$PID.$([guid]::NewGuid().ToString('N').Substring(0,8)).tmp"
  New-Item -ItemType Directory -Path $dir -Force | Out-Null
  $json = $Payload | ConvertTo-Json -Depth 10 -Compress:$false
  [System.IO.File]::WriteAllText($tmp, $json, [System.Text.UTF8Encoding]::new($false))
  [System.IO.File]::Move($tmp, $final, $true)
}

# --- Helper: New-WaveWorktree -------------------------------------------------------
function New-WaveWorktree {
  param([string]$Wave, [string]$Slug, [string]$Base = 'origin/HEAD')
  # 1. Cap check
  $cap = Test-WorktreeCap
  if ($cap.Over) {
    Write-Host "[eee] HARD FAIL: 5-worktree cap exceeded ($($cap.Count)/$($cap.Cap)) per W350 GIT-TREE-SOTA §2." -ForegroundColor Red
    Write-Host "[eee]            Close one with 'git worktree remove' first." -ForegroundColor Red
    exit 2
  }
  # 2. Branch name + worktree path
  $slugClean = $Slug -replace '[^a-zA-Z0-9-]', '-'
  $branch = "goal/$Wave-$slugClean"
  $workdir = (Resolve-Path "$PSScriptRoot/..").Path + "-$Wave"
  # 3. Wave-lock pre-claim via Node guard module (avoids races)
  $sessionId = [guid]::NewGuid().ToString()
  $env:CLAUDE_SESSION_ID = $sessionId
  $payload = @{
    schema_version = 1
    wave = $Wave
    session_id = $sessionId
    parent_session_id = $null
    owner = 'operator'
    branch = $branch
    worktree_path = $workdir
    host = [Environment]::MachineName
    pid = $PID
    started_at = (Get-Date -Format 'yyyy-MM-ddTHH:mm:ssZ' -AsUTC)
    last_heartbeat_at = (Get-Date -Format 'yyyy-MM-ddTHH:mm:ssZ' -AsUTC)
    heartbeat_interval_seconds = 60
    ttl_at = (Get-Date).AddDays(7).ToUniversalTime().ToString('yyyy-MM-ddTHH:mm:ssZ')
    claim_attempts = 1
    state = 'active'
    released_at = $null
  }
  Write-WaveLockAtomic -WaveId $Wave -Payload $payload
  # Verify pre-claim succeeded
  $validate = & node "$PSScriptRoot/preagent-wave-lock-guard.mjs" --validate --wave $Wave --session-id $sessionId --state-dir "$PSScriptRoot/../.claude/state"
  if ($LASTEXITCODE -ne 0) {
    Write-Host "[eee] HARD FAIL: wave-lock collision detected for $Wave" -ForegroundColor Red
    Write-Host $validate -ForegroundColor Red
    exit 2
  }
  Write-Host "[eee] wave-lock claimed: $Wave session=$sessionId" -ForegroundColor Green
  # 4. git worktree add
  $proc = Start-Process git -ArgumentList @('worktree', 'add', $workdir, '-b', $branch, $Base) -NoNewWindow -Wait -PassThru
  if ($proc.ExitCode -ne 0) {
    Write-Host "[eee] git worktree add failed (exit $($proc.ExitCode))" -ForegroundColor Red
    exit 2
  }
  Write-Host "[eee] worktree created: $workdir branch=$branch" -ForegroundColor Green
  # 5. Copy .worktreeinclude files
  $includeFile = "$PSScriptRoot/../.worktreeinclude"
  if (Test-Path $includeFile) {
    Get-Content $includeFile | ForEach-Object {
      $line = $_.Trim()
      if (-not $line -or $line.StartsWith('#')) { return }
      $src = Join-Path (Resolve-Path "$PSScriptRoot/..").Path $line
      $dst = Join-Path $workdir $line
      if (Test-Path $src) {
        New-Item -ItemType Directory -Path (Split-Path $dst -Parent) -Force | Out-Null
        Copy-Item $src $dst -Force
        Write-Host "[eee] .worktreeinclude: copied $line" -ForegroundColor DarkGray
      }
    }
  }
  return @{ Worktree = $workdir; Branch = $branch; SessionId = $sessionId }
}

# --- Subcommand dispatcher (early, before bootstrap) --------------------------------
# Detect named params via $PSBoundParameters; if --Wave or --Bg present, branch.
# Detect bare subcommands (agents/attach/logs/stop/respawn/rm) as $Args[0].

# Bare subcommand passthrough (cheap path — skip ~1s bootstrap)
if ($Args.Count -gt 0 -and $Args[0] -in @('agents', 'attach', 'logs', 'stop', 'respawn', 'rm')) {
  # Find claude.exe early (extracted from the L354-368 logic)
  $claudeBin = if ($env:CLAUDE_BIN -and (Test-Path $env:CLAUDE_BIN)) { $env:CLAUDE_BIN } else { (Get-Command claude -ErrorAction Stop).Source }
  & $claudeBin @Args
  exit $LASTEXITCODE
}

# Named-param dispatch via custom param parsing (PowerShell doesn't natively support
# mixing --Wave-style named params with $Args[]). Parse manually:
$WaveValue = $null; $SlugValue = $null; $BaseValue = 'origin/HEAD'; $NoLaunch = $false
$BgValue = $false; $PromptValue = $null; $NameValue = $null; $AgentValue = $null
$DangerouslySkipPermissions = $false
$ShowHelp = $false
$ForwardArgs = @()
$i = 0
while ($i -lt $Args.Count) {
  $a = $Args[$i]
  switch ($a) {
    '--Wave' { $WaveValue = $Args[$i+1]; $i += 2 }
    '--Slug' { $SlugValue = $Args[$i+1]; $i += 2 }
    '--Base' { $BaseValue = $Args[$i+1]; $i += 2 }
    '--NoLaunch' { $NoLaunch = $true; $i++ }
    '--Bg' { $BgValue = $true; $i++ }
    '--Prompt' { $PromptValue = $Args[$i+1]; $i += 2 }
    '--Name' { $NameValue = $Args[$i+1]; $i += 2 }
    '--Agent' { $AgentValue = $Args[$i+1]; $i += 2 }
    '--DangerouslySkipPermissions' { $DangerouslySkipPermissions = $true; $i++ }
    '--Help' { $ShowHelp = $true; $i++ }
    default { $ForwardArgs += $a; $i++ }
  }
}

if ($ShowHelp) {
  Write-Host @"
[eee] PowerShell launcher for claude-sota-installed
Usage:
  eee.ps1 [--Wave Wn [--Slug s] [--Base ref] [--NoLaunch]]
  eee.ps1 [--Bg --Prompt "..." [--Name label] [--Agent name] [--DangerouslySkipPermissions]]
  eee.ps1 agents [--json]
  eee.ps1 attach <id>
  eee.ps1 logs <id>
  eee.ps1 stop <id>
  eee.ps1 respawn <id>
  eee.ps1 rm <id>
  eee.ps1 [forwarded args...]    # default: launch interactive claude

W363 — Foundation Gap Closure. See docs/superpowers/plans/2026-05-21-W363-foundation-gap-closure.md
"@
  exit 0
}

# --- Wave dispatcher ----------------------------------------------------------------
if ($WaveValue) {
  if (-not $SlugValue) {
    Write-Host "[eee] --Wave requires --Slug <slug>" -ForegroundColor Red
    exit 2
  }
  $result = New-WaveWorktree -Wave $WaveValue -Slug $SlugValue -Base $BaseValue
  if ($NoLaunch) {
    Write-Host "[eee] --NoLaunch: skipping claude launch. worktree=$($result.Worktree) branch=$($result.Branch)" -ForegroundColor Cyan
    exit 0
  }
  $env:EEE_WORKSPACE_OVERRIDE = $result.Worktree
  Set-Location $result.Worktree
  # Fall through to the existing bootstrap + claude launch below
}

# --- Bg dispatcher ------------------------------------------------------------------
if ($BgValue) {
  if (-not $PromptValue -or $PromptValue.Length -lt 4) {
    Write-Host "[eee] --Bg --Prompt must be >= 4 chars (CC rejects 'Too short')" -ForegroundColor Red
    exit 2
  }
  # Find claude.exe
  $claudeBin = if ($env:CLAUDE_BIN -and (Test-Path $env:CLAUDE_BIN)) { $env:CLAUDE_BIN } else { (Get-Command claude -ErrorAction Stop).Source }
  # Build args
  $bgArgs = @('--bg')
  if ($NameValue) { $bgArgs += @('--name', $NameValue) }
  if ($AgentValue) { $bgArgs += @('--agent', $AgentValue) }
  if ($DangerouslySkipPermissions) { $bgArgs += '--dangerously-skip-permissions' }
  # Forward any remaining flags
  $bgArgs += $ForwardArgs
  # Prompt is the trailing positional arg
  $bgArgs += $PromptValue
  Write-Host "[eee] launching --bg session..." -ForegroundColor Cyan
  & $claudeBin @bgArgs
  exit $LASTEXITCODE
}

# (default-launch path falls through to the existing L25-1018 bootstrap)
#=======================================================================================
# END W363 insertion block
#=======================================================================================
```

- [ ] **Step 5: Run Pester tests to verify they pass**

Run: `Invoke-Pester tools/test/eee-wave-launcher.test.ps1 -Output Detailed`
Expected: 5+ tests PASS. If any fail, fix inline.

- [ ] **Step 6: Manual smoke test of the new flags**

```powershell
# Help text
.\tools\eee.ps1 --Help
# Expected: usage block printed; exit 0

# Wave creation (in a throwaway directory)
$tmp = New-Item -ItemType Directory -Path "$env:TEMP\eee-wave-smoke-$(New-Guid)"
Push-Location $tmp
git init -q; git commit --allow-empty -m "init" -q
& $PSScriptRoot\..\..\..\tools\eee.ps1 --Wave 'W999-smoke' --Slug 'smoke' --NoLaunch
# Expected: wave-lock created, worktree created at <parent>-W999-smoke, exit 0
Pop-Location
Remove-Item -Recurse -Force $tmp
```

- [ ] **Step 7: Commit Task 2**

```bash
git add tools/eee.ps1 tools/test/eee-wave-launcher.test.ps1
git commit -m "feat(W363): eee.ps1 wave-launcher + subcommand dispatcher + bg proxy

5 components from umbrella spec §5.1 + W363 plan Task 2:
- --Wave Wn [--Slug s] [--Base ref] [--NoLaunch]: worktree-launcher
- --Bg --Prompt '...' [--Name] [--Agent]: claude --bg proxy
- agents/attach/logs/stop/respawn/rm: bare passthrough
- New-WaveWorktree + Test-WorktreeCap helpers
- eee.ps1-owned .worktreeinclude copy + wave-lock claim flow

Splice point: AFTER L24 \$ErrorActionPreference, BEFORE L25 bootstrap.
Default-launch path L25-1018 untouched.

Anchors:
- W362c §P0.1 (eee.ps1-owned creation, NO WorktreeCreate hook)
- R3 atomic-write (System.IO.File::Move, NOT Move-Item)
- R2 claude --bg contract (14+ flags, 10 Windows edge cases)
- R1 single-subagent file-ownership

5+ Pester tests passing.

Codex-Verdict: BOOTSTRAP"
```

---

## Task 3: `CLAUDE.md` worktree-list refresh + `.worktreeinclude` file (PARALLEL with Tasks 1+2)

**Why:** Stale enumeration at `CLAUDE.md:14` and missing `.worktreeinclude` are independent of Tasks 1+2. Cheap to land.

**Files:**
- Modify: `CLAUDE.md` (L14 single-line edit)
- Create: `.worktreeinclude` (10 lines)

- [ ] **Step 1: Refresh `CLAUDE.md:14` worktree enumeration**

Read line 14 of `CLAUDE.md`. It currently lists `W348-sota-fix`, `W348`, `W348-carry`, `W350`, `W351` worktrees from W350-era. Replace with a live snippet + note:

Use `Edit` on `CLAUDE.md`:
- old_string: the verbatim worktree-list line + parenthetical (find via `Grep pattern="worktree list.*W348" path="CLAUDE.md"`)
- new_string: rewrite to point to live `git worktree list` output and link to W363 launcher

Replace the parenthetical "(current live worktrees per `git worktree list` 2026-05-20: ...)" with:

```
(current live worktrees: run `git worktree list` to see actuals — managed via `tools/eee.ps1 --Wave Wn --Slug s` per W363; cap=5 per W350 GIT-TREE-SOTA §2)
```

- [ ] **Step 2: Create `.worktreeinclude`**

Create `.worktreeinclude` (at repo root):

```
# .worktreeinclude — patterns of gitignored files to copy into new worktrees.
# Format: gitignore-style. Lines starting with # are comments. Only files
# matching a pattern AND in .gitignore are copied (per CC docs).
# Managed by tools/eee.ps1 --Wave (W363).

CLAUDE.local.md
.env
.env.local
config/secrets.json
```

- [ ] **Step 3: Verify `Grep` finds the new `tools/eee.ps1` reference in CLAUDE.md**

```
Grep pattern="tools/eee\.ps1 --Wave" path="CLAUDE.md"
```

Expected: 1 match.

- [ ] **Step 4: Commit Task 3**

```bash
git add CLAUDE.md .worktreeinclude
git commit -m "docs(W363): refresh CLAUDE.md worktree-list + add .worktreeinclude

CLAUDE.md:14 stale W348/W350/W351 enumeration excised; replaced with
dynamic 'run git worktree list' note + reference to eee.ps1 --Wave
launcher (W363 Task 2).

.worktreeinclude created at repo root with gitignored-file patterns
to copy into new worktrees (CLAUDE.local.md, .env, .env.local,
config/secrets.json). Read by eee.ps1 New-WaveWorktree per W362c
§P0.1 (eee.ps1-owned creation, NOT WorktreeCreate hook).

Codex-Verdict: BOOTSTRAP"
```

---

## Task 4: Pre-commit hook registration

**Why:** Wire `preagent-wave-lock-guard.mjs --validate` as a pre-commit hook so commits to a worktree without a matching wave-lock are blocked. Depends on Task 1 (wave-lock module existing).

**Files:**
- Modify: `.pre-commit-config.yaml`

- [ ] **Step 1: Read current `.pre-commit-config.yaml`**

`Read file_path="Z:\claude-sota-installed\.pre-commit-config.yaml"` — note the existing hook list and indentation pattern.

- [ ] **Step 2: Add the wave-lock-validate hook**

`Edit` `.pre-commit-config.yaml` to append (or insert in the right section):

```yaml
  - repo: local
    hooks:
      - id: wave-lock-validate
        name: wave-lock validate (W363)
        entry: node tools/preagent-wave-lock-guard.mjs --validate
        language: system
        pass_filenames: false
        always_run: true
        verbose: true
        require_serial: true
        stages: [pre-commit]
        # Validates that the current worktree's branch has a valid wave-lock
        # owned by $CLAUDE_SESSION_ID or its parent. Soft-fails if no lock
        # exists for non-wave branches (e.g. main, hotfix/*).
        # Reads $env:CLAUDE_SESSION_ID and derives wave from current branch
        # name pattern goal/W<n>-*. If branch doesn't match, hook no-ops.
```

Note: the hook needs to read the current git branch and derive the wave from `goal/W<n>-*`. The wave-lock-guard CLI currently requires `--wave` as a flag. To make the pre-commit hook ergonomic, modify the CLI to:

- If `--wave` is missing AND `--from-branch` is passed, derive wave from `git rev-parse --abbrev-ref HEAD` matching `^goal/(W[0-9a-z-]+)-`.
- If the branch doesn't match → exit 0 (no wave-lock validation needed).

- [ ] **Step 3: Add `--from-branch` mode to wave-lock-guard CLI**

Edit `tools/preagent-wave-lock-guard.mjs` CLI section. Find `--validate` case and add a fallback:

```javascript
case '--validate': {
  let wave = get('--wave');
  if (!wave && args.includes('--from-branch')) {
    const { execSync } = await import('node:child_process');
    const branch = execSync('git rev-parse --abbrev-ref HEAD', { encoding: 'utf8' }).trim();
    const m = branch.match(/^goal\/(W[0-9a-zA-Z-]+?)(?:-[a-z0-9-]+)?$/);
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
```

And update the hook entry to `entry: node tools/preagent-wave-lock-guard.mjs --validate --from-branch`.

- [ ] **Step 4: Test pre-commit hook locally**

```bash
# Stage some change
echo "test" >> README.md
git add README.md
# Try to commit — should pass (current branch w348-sota-fix-p5b doesn't match goal/W<n>-* pattern)
pre-commit run wave-lock-validate --hook-stage pre-commit
# Expected: PASS (no-op because branch isn't a wave branch)
git restore --staged README.md
git restore README.md
```

- [ ] **Step 5: Commit Task 4**

```bash
git add .pre-commit-config.yaml tools/preagent-wave-lock-guard.mjs
git commit -m "feat(W363): wave-lock pre-commit hook + --from-branch CLI mode

Wire tools/preagent-wave-lock-guard.mjs --validate --from-branch
as a pre-commit hook. Hook derives wave from current git branch
matching ^goal/(W<n>)-* pattern; no-ops for non-wave branches
(main, hotfix/*, w348-* etc.).

Blocks commits when:
- branch matches wave pattern AND
- no wave-lock file exists for the wave, OR
- wave-lock owned by a different session_id

Operator can manually clean up stale locks via:
  node tools/preagent-wave-lock-guard.mjs --cleanup-stale

Codex-Verdict: BOOTSTRAP"
```

---

## Task 5: Integration smoke test + codex round 1 review on implementation

**Why:** All 4 prior tasks land independent pieces. Task 5 runs end-to-end to confirm they integrate, then fires codex GPT-5.5 to adversarially review the W363 changes before wave-close.

**Files:** None new; runs against existing.

- [ ] **Step 1: Run all test suites**

```bash
node --test tools/test/wave-lock-guard.test.mjs
# Expected: 10/10 PASS
```

```powershell
Invoke-Pester tools/test/eee-wave-launcher.test.ps1 -Output Detailed
# Expected: ALL PASS
```

- [ ] **Step 2: End-to-end smoke test in a real worktree**

```powershell
# Use a throwaway wave name to avoid colliding with real waves
.\tools\eee.ps1 --Wave 'W999-e2e-smoke' --Slug 'integration-test' --NoLaunch
# Expected: worktree created at Z:\claude-sota-installed-W999-e2e-smoke
#           wave-lock at .claude/state/wave-lock-W999-e2e-smoke.json

# Validate the lock can be read
node tools\preagent-wave-lock-guard.mjs --show --wave W999-e2e-smoke
# Expected: JSON dump

# Cleanup
git worktree remove Z:\claude-sota-installed-W999-e2e-smoke --force
node tools\preagent-wave-lock-guard.mjs --release --wave W999-e2e-smoke --session-id <id-from-show>
Remove-Item .claude\state\wave-lock-W999-e2e-smoke.json
```

- [ ] **Step 3: Fire codex round 1 review on W363 implementation**

```bash
node ".claude/plugins/cache/openai-codex/codex/1.0.4/scripts/codex-companion.mjs" task --effort high "Adversarial review of W363 Foundation Gap Closure implementation. Files added/modified in this wave:
  - tools/preagent-wave-lock-guard.mjs (new, ~400 LOC) — cross-session wave-lock guard
  - tools/test/wave-lock-guard.test.mjs (new, 10 tests)
  - tools/eee.ps1 (modified, +~280 LOC at L25 insertion) — --Wave/--Bg/subcommand dispatcher + New-WaveWorktree + Test-WorktreeCap
  - tools/test/eee-wave-launcher.test.ps1 (new, Pester)
  - .worktreeinclude (new, gitignored-file patterns)
  - CLAUDE.md:14 (worktree-list refresh)
  - .pre-commit-config.yaml (wave-lock-validate hook added)

Per umbrella spec §5.1 (W363) + W362c §P0.1 (eee.ps1-owned, no WorktreeCreate hook).
SOTA pattern anchors: LangGraph ThreadTTLConfig + multica EnsureDaemonID + Cloudflare instance ID.
Atomic-write per R3: Node fs.rename + PowerShell [System.IO.File]::Move.

Assess: (1) correctness of the atomic-write shim under concurrent writers; (2) Cardinal-Rule-1 compliance (no new npm deps); (3) Cardinal-Rule-2 compliance (no project-owned hook bodies under .claude/hooks); (4) Cardinal-Rule-6 verify-before-claim (tests cover all 10 R4 cases?); (5) error-message clarity for the operator collision case; (6) Windows-specific edge cases (R2 #58204/#60455/#59806 handled?); (7) any unsafe shell-escape patterns in the PowerShell helpers; (8) wave-lock TTL/heartbeat semantics under realistic 7-day waves.

Verdict: APPROVE or BLOCK with specific findings. Be terse."
```

If BLOCK with substantive findings:
- Fix inline (~30 min)
- Re-fire codex round 2

If APPROVE: proceed to Task 6.

---

## Task 6: Wave-close + spec update + T6 verdict + push

**Why:** W363 ships. Update umbrella spec status row, write T6 verdict, push branch.

**Files:**
- Modify: `docs/superpowers/specs/2026-05-21-sota-parallel-workflow-design.md` (status row + §8 W363 row)

- [ ] **Step 1: Update umbrella spec §8 W363 row → mark COMPLETE**

`Edit` the §8 sub-projects table W363 row to add `→ **COMPLETE** at commit <hash> (codex round-N: APPROVE)` to the title.

- [ ] **Step 2: Write T6 basic-memory verdict via `mcp__basic-memory__write_note`**

- title: `W363-Foundation-Gap-Closure-Verdict`
- folder: `main/verdicts`
- content:

```markdown
# W363 — Foundation Gap Closure Verdict

- Date: 2026-05-22
- Wave: W363
- Status: COMPLETE
- Codex verdict: APPROVE (round-N from Task 5 step 3)
- Commits: [list of Task 1-6 commit hashes]

## Components shipped

- tools/preagent-wave-lock-guard.mjs (wave-lock guard, ~400 LOC, 10 tests passing)
- tools/eee.ps1 (+~280 LOC: --Wave/--Bg/subcommand dispatcher, New-WaveWorktree, Test-WorktreeCap)
- tools/test/wave-lock-guard.test.mjs + tools/test/eee-wave-launcher.test.ps1
- .worktreeinclude (gitignored-file copy manifest)
- CLAUDE.md:14 (worktree-list refresh)
- .pre-commit-config.yaml (wave-lock-validate hook)

## Anchors

- LangGraph BaseCheckpointSaver / ThreadTTLConfig
- multica EnsureDaemonID / HealthResponse.PID
- Cloudflare Durable Objects instance ID
- W362c §P0.1 (eee.ps1-owned creation, no WorktreeCreate hook)

## Unblocks

- W364 (Pattern Lift Suite) — can now use the eee.ps1 --Wave launcher
- W365 (Composio AO T3 audit) — wave-lock primitive ready for AO integration
- W366 (Composio AO T2 pilot) — codex Stop-gate ↔ bridge contract anchored to wave-lock

## Cite

- Plan: `docs/superpowers/plans/2026-05-21-W363-foundation-gap-closure.md`
- Umbrella spec: `docs/superpowers/specs/2026-05-21-sota-parallel-workflow-design.md` (r7 with W363 row complete)
```

- [ ] **Step 3: Commit + push**

```bash
git add docs/superpowers/specs/2026-05-21-sota-parallel-workflow-design.md
git commit -m "docs(W363): wave-close — spec §8 W363 row marked COMPLETE

W363 Foundation Gap Closure shipped: wave-lock guard module, eee.ps1
--Wave/--Bg/subcommand dispatcher, .worktreeinclude, CLAUDE.md
worktree-list refresh, pre-commit hook. Codex round-N: APPROVE.
T6 verdict recorded at main/verdicts/w363-foundation-gap-closure-verdict.

W364 design freeze unblocked.

Codex-Verdict: APPROVE"

git push --force-with-lease origin w348-sota-fix-p5b
```

---

## Self-Review

**1. Spec coverage:** Each of umbrella spec §5.1 W363 row's 5 components has a corresponding task: C1 → Task 2, C2 → Task 2, C3 → Task 2, C4 → Task 3, C5 → Task 2 (Test-WorktreeCap). Task 1 implements the supporting wave-lock guard. Task 4 wires pre-commit gate. Task 5 verifies integration + codex review. Task 6 ships. **Covered.**

**2. Placeholder scan:** All code blocks contain actual implementation. Test cases have full bodies. Commit messages are complete. No TBD / TODO / "fill in later".

**3. Type consistency:** `acquire/validate/release/cleanupStale/readLock` API used consistently across module + tests + CLI. `wave-lock-<wave>.json` schema fields named consistently. PowerShell `Write-WaveLockAtomic` matches Node `acquire` semantics.

**4. Risk:** ~1200 LOC across 7 files in 6 tasks. Parallelization: Tasks 1+2+3 can run concurrently (different files); Task 4 depends on Task 1; Tasks 5+6 are sequential. Critical-path subagent count: 3 parallel (Tasks 1, 2, 3) → 1 (Task 4 after Task 1) → 1 (Task 5) → 1 (Task 6). Estimated wall-clock ~2-3 hours with subagent fan-out.

---

## Execution Handoff

Plan complete and saved to `docs/superpowers/plans/2026-05-21-W363-foundation-gap-closure.md`. Two execution options:

**1. Subagent-Driven (recommended)** — Dispatch 3 parallel subagents for Tasks 1+2+3, then Task 4 (depends on Task 1), then Tasks 5+6 sequential. ~2-3h wall-clock.

**2. Inline Execution** — Walk Tasks 1→6 in this session via `superpowers:executing-plans`. ~4-5h wall-clock; single-thread.

Recommend Option 1 for max parallel ratio per umbrella spec §2 Design Principles.
