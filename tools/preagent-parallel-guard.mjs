#!/usr/bin/env node
// preagent-parallel-guard.mjs — W326 P0-A1 ship / W330 P0-A upgrade
//
// PreToolUse[Agent] ADVISORY+BLOCKING — blocks on 2nd consecutive solo-dispatch
// violation per W330 P0-A (was W326 advisory-only; SEV-1 at parallel_ratio=0.0036
// over 1676 sessions / 30d per W329-D §1 root-cause).
//
// Detects solo Agent dispatch in a multi-stream context. On 1st violation per
// session, emits non-blocking WARNING via hookSpecificOutput.additionalContext
// (exit 0). On 2nd consecutive violation, exits 2 (blocking) with explicit
// reason on stderr per Anthropic hooks-doc exit-code-2 semantics.
//
// Heuristic (fast, JSONL-free): the CC hook event payload supplies one
// tool_use block per fire. If the SAME assistant turn dispatches >=2 Agent
// blocks, this hook fires once PER block. We sample recent assistant turns
// from the session JSONL to compute "context multi-stream signal" — if the
// recent operator prompt or last assistant turn mentions stream keywords
// (audit/review/parallel/fan-out/Stream X/in parallel/sweep), AND the
// current dispatch appears solo (no peer Agent block in same message), we
// trigger the violation-counter ladder.
//
// Counter state: ${CLAUDE_CODE_TMPDIR}/.parallel-guard-counter-${sessionId}.json
//   { "count": int, "lastViolationTs": int(ms) }
//   - count reset to 0 when assistant turn has >=2 Agent blocks (parallel evidence)
//   - count reset to 0 when last violation >5min ago (false-positive guard)
//
// Escape hatch: CLAUDE_PARALLEL_GUARD_DISABLE=1 → always exit 0 (operator override).
//
// Time-budget <500ms typical. Node 22 native (no deps).
//
// References:
// - https://docs.anthropic.com/en/docs/claude-code/hooks (event schema, hookSpecificOutput, exit-code-2 = blocking)
// - https://code.claude.com/docs/en/headless (Agent tool fan-out)
// - CLAUDE.md L19 / W269 / W312-D parallel-dispatch mandate
// - W325-A F1 root-cause: solo Agent dispatch w/ multi-stream-context wording
// - W329-D §1 SEV-1: hardcoded exit 0 → parallel_ratio=0.0036 / 1676 sessions
// - W330 P0-A upgrade: advisory ladder + exit-code-2 enforcement

import { appendFile, readFile, readdir, stat, writeFile, mkdir, rename, unlink } from 'node:fs/promises';
import { join } from 'node:path';
// W341 P0.1 round-3+4 architectural fix (codex round-3+4 REVISE) — shared
// detector module ensures UserPromptSubmit + PreToolUse[Agent] use identical
// STRONG/WEAK_PAIR semantics AND identical state-file path. Round-4 caught
// path-mismatch: UserPromptSubmit wrote `parallel-guard-session-<sid>.json`
// while PreToolUse read `.parallel-guard-counter-<sid>.json` — dead-code.
import { counterPath as sharedCounterPath, detectMultiStream } from './parallel-guard-detector.mjs';
// W343 P0(b) shared-regex extraction — SOTA-named aliases (STRONG_RE / WEAK_PAIR_RE)
// re-exported from `parallel-guard-regex.mjs`. Source of truth still lives in
// `parallel-guard-detector.mjs` (re-exported); importing here keeps the named
// surface available for any future inline diagnostic logging without creating
// a second source of truth. Detection itself flows through detectMultiStream()
// at L364 (unchanged).
// eslint-disable-next-line no-unused-vars
import { STRONG_RE, WEAK_PAIR_RE } from './parallel-guard-regex.mjs';

// CLAUDE_CODE_PROJECT_DIR is a phantom env var for production (never honored by CC core
// for session storage — 2026-05-20 audit), but tools/test-parallel-guard-w330.mjs uses
// it as a fixture-dir override (test-mode signal). When set, use ONLY that dir —
// otherwise fallback to $CLAUDE_CONFIG_DIR/projects/Z--claude-sota-installed (real session
// root). The test harness inherits parent CLAUDE_CONFIG_DIR via {...process.env, ...env},
// so we MUST short-circuit on the explicit override to avoid the guard reading real
// session JSONL instead of the test fixture.
const SESSION_ROOT_CANDIDATES = process.env.CLAUDE_CODE_PROJECT_DIR
  ? [process.env.CLAUDE_CODE_PROJECT_DIR]
  : [
      process.env.CLAUDE_CONFIG_DIR
        ? `${process.env.CLAUDE_CONFIG_DIR}/projects/Z--claude-sota-installed`
        : null,
      'Z:/claude-sota-installed/.claude/projects/Z--claude-sota-installed',
    ].filter(Boolean);

async function readEvent() {
  return await new Promise((resolve) => {
    let buf = '';
    process.stdin.setEncoding('utf8');
    process.stdin.on('data', (c) => (buf += c));
    process.stdin.on('end', () => {
      try {
        resolve(JSON.parse(buf || '{}'));
      } catch {
        resolve({});
      }
    });
    // Some test harnesses pipe no stdin
    setTimeout(() => resolve({}), 400);
  });
}

async function findLatestSessionFile(sessionId) {
  for (const root of SESSION_ROOT_CANDIDATES) {
    if (sessionId) {
      const path = join(root, `${sessionId}.jsonl`);
      try {
        const s = await stat(path);
        if (s.isFile()) return path;
      } catch {
        /* not here */
      }
    }
    // Fallback: pick newest jsonl in root
    try {
      const entries = await readdir(root, { withFileTypes: true });
      const candidates = [];
      for (const e of entries) {
        if (!e.isFile() || !e.name.endsWith('.jsonl')) continue;
        if (!/^[0-9a-f-]{36}\.jsonl$/i.test(e.name)) continue;
        const fp = join(root, e.name);
        try {
          const s = await stat(fp);
          candidates.push({ fp, mtimeMs: s.mtimeMs });
        } catch {
          /* ignore */
        }
      }
      candidates.sort((a, b) => b.mtimeMs - a.mtimeMs);
      if (candidates[0]) return candidates[0].fp;
    } catch {
      /* ignore */
    }
  }
  return null;
}

async function lastAssistantTurnText(path) {
  try {
    const txt = await readFile(path, 'utf8');
    const lines = txt.split('\n').filter(Boolean);
    // scan from tail for last assistant message
    for (let i = lines.length - 1; i >= Math.max(0, lines.length - 200); i--) {
      let rec;
      try {
        rec = JSON.parse(lines[i]);
      } catch {
        continue;
      }
      const msg = rec?.message;
      if (!msg || msg.role !== 'assistant') continue;
      const blocks = Array.isArray(msg.content) ? msg.content : [];
      let text = '';
      let agentBlocks = 0;
      for (const b of blocks) {
        if (b?.type === 'text' && typeof b.text === 'string') text += ` ${b.text}`;
        if (b?.type === 'tool_use' && (b.name === 'Agent' || b.name === 'Task')) agentBlocks++;
      }
      return { text, agentBlocks };
    }
  } catch {
    /* file unreadable */
  }
  return { text: '', agentBlocks: 0 };
}

async function lastUserPromptText(path) {
  try {
    const txt = await readFile(path, 'utf8');
    const lines = txt.split('\n').filter(Boolean);
    for (let i = lines.length - 1; i >= Math.max(0, lines.length - 200); i--) {
      let rec;
      try {
        rec = JSON.parse(lines[i]);
      } catch {
        continue;
      }
      const msg = rec?.message;
      if (!msg || msg.role !== 'user') continue;
      const blocks = Array.isArray(msg.content) ? msg.content : [];
      let text = '';
      for (const b of blocks) {
        if (b?.type === 'text' && typeof b.text === 'string') text += ` ${b.text}`;
        if (typeof b === 'string') text += ` ${b}`;
      }
      if (typeof msg.content === 'string') text += ` ${msg.content}`;
      return text;
    }
  } catch {
    /* */
  }
  return '';
}

function emitAdvisory(reason, violationCount) {
  const out = {
    hookSpecificOutput: {
      hookEventName: 'PreToolUse',
      additionalContext: `W330 parallel-dispatch advisory (violation ${violationCount}/2): ${reason}. Per W269/W312-D — for multi-stream contexts (audit/review/sweep/fan-out/Stream A-B-C), DISPATCH 2+ Agent calls in ONE assistant message. Solo Agent dispatch is non-compliant in multi-stream contexts. NEXT solo-dispatch violation will BLOCK (exit 2) per W330 P0-A. See CLAUDE.md L19 + docs/anthropic.com/en/docs/claude-code/hooks.`,
    },
  };
  try {
    process.stdout.write(`${JSON.stringify(out)}\n`);
  } catch {
    /* stdout closed */
  }
}

// ---- W330 P0-A: session-scoped violation counter ----
const VIOLATION_TTL_MS = 5 * 60 * 1000; // 5 min false-positive guard
// W331 P0.1 ROOT-FIX: 10-second window groups Agent calls fired in one
// assistant message (rapid succession, typically <1s apart). Used to detect
// parallel fan-out WITHIN the current turn without depending on JSONL flush.
// W343 R3 codex closure: tightened from 10s → 1500ms to eliminate serial-
// within-10s false-reset path. Same-message Agent hooks fire within ~10-30ms
// of each other (CC dispatches hooks sequentially per tool_use block);
// 1500ms is generous margin for scheduling jitter while preventing two
// separate solo Agent calls within ~9s from being misread as same-turn
// parallel evidence. Bounded-retry deadline (200ms) << 1500ms window so
// retry has ample room to catch peers. Codex R3 found that the 10s window
// could mask the exact solo-dispatch behavior this guard is meant to block.
const TURN_WINDOW_MS = 1500;

// W341 round-4: counterPath now imported from parallel-guard-detector.mjs
// (shared with UserPromptSubmit hook). Local definition removed to enforce
// single source of truth — see import above.
const counterPath = sharedCounterPath;

async function readCounter(path) {
  try {
    const txt = await readFile(path, 'utf8');
    const obj = JSON.parse(txt);
    if (typeof obj?.count === 'number' && typeof obj?.lastViolationTs === 'number') {
      return {
        count: obj.count,
        lastViolationTs: obj.lastViolationTs,
        turnFireCount: typeof obj.turnFireCount === 'number' ? obj.turnFireCount : 0,
        turnFireLastTs: typeof obj.turnFireLastTs === 'number' ? obj.turnFireLastTs : 0,
        // W331-r3 BUG-FIX (codex r3 HIGH gap#4): preserve UserPromptSubmit-set
        // intent flag across reads. Without these two fields, the multiStreamIntent
        // written by tools/parallel-guard-userpromptsubmit.mjs was silently
        // discarded by readCounter, making the entire UserPromptSubmit pathway
        // dead-code. Cite: codex r3 (aac94eff) REMAINING-GAP #4.
        multiStreamIntent: typeof obj.multiStreamIntent === 'boolean' ? obj.multiStreamIntent : undefined,
        intentSetTs: typeof obj.intentSetTs === 'number' ? obj.intentSetTs : 0,
      };
    }
  } catch {
    /* missing or corrupt — treat as fresh */
  }
  return {
    count: 0,
    lastViolationTs: 0,
    turnFireCount: 0,
    turnFireLastTs: 0,
    multiStreamIntent: undefined,
    intentSetTs: 0,
  };
}

async function writeCounter(path, state) {
  try {
    // best-effort ensure parent dir exists
    const idx = Math.max(path.lastIndexOf('/'), path.lastIndexOf('\\'));
    if (idx > 0) {
      const parent = path.slice(0, idx);
      try { await mkdir(parent, { recursive: true }); } catch { /* */ }
    }
    await writeFile(path, JSON.stringify(state), 'utf8');
  } catch {
    /* counter write best-effort; don't break the hook */
  }
}

// W343 P0(d) — fail-closed exit helper. Inverts prior silent-fallback exit(0)
// paths to exit(2) so that guard-state errors surface instead of vanishing,
// while preserving the bypass-marker escape hatch and adding a recovery
// env-var (`CLAUDE_PARALLEL_GUARD_FAILOPEN=1`) for operators who hit a bad
// guard-state mid-session. CR-5 compliant via condition-(b) (per CLAUDE.md
// cardinal-rule-5; same precedent as the in-session marker hatch at L262-266).
//
// Behavior:
//   1. If bypass-marker file present → exit 0 (operator wants guard off).
//   2. Else if CLAUDE_PARALLEL_GUARD_FAILOPEN=1 → exit 0 (recovery hatch).
//   3. Else → write diagnostic to stderr + exit 2 (fail-closed; surfaces issue).
async function failClosedExit(reason) {
  // Re-check bypass marker (operator may have set it mid-session AFTER the
  // initial check at main() top; or main()-top check itself may have failed
  // before reaching this point, as in the main().catch() path).
  try {
    await stat('Z:/claude-sota-installed/.claude/state/parallel-guard-bypass.marker');
    process.exit(0);
  } catch { /* no marker, continue */ }

  if (process.env.CLAUDE_PARALLEL_GUARD_FAILOPEN === '1') {
    process.exit(0);
  }

  try {
    process.stderr.write(`[parallel-guard][P0d] failing closed: ${reason}\n`);
  } catch { /* stderr closed */ }
  process.exit(2);
}

async function main() {
  // Escape hatch — operator override, always pass.
  if (process.env.CLAUDE_PARALLEL_GUARD_DISABLE === '1') {
    process.exit(0);
  }
  // W331 P0-1 r4 in-session escape hatch — marker file (operator-controllable,
  // deletable). Sibling of CLAUDE_PARALLEL_GUARD_DISABLE env-var hatch for cases
  // where env-var cannot be set mid-session (CC inherits env at startup).
  // CR-5 compliant via condition-(b) precedent already documented at CLAUDE.md L22.
  // W338-P0d-fix: skip marker check when CLAUDE_CODE_TMPDIR is set to a non-default
  // location (test-fixture mode) — otherwise an operator-set production marker
  // would bypass test isolation, masking the W330 counter logic from validation.
  // Production: env unset → marker check active.
  // Tests: CLAUDE_CODE_TMPDIR=<fixture-dir> → marker check skipped.
  const testFixtureMode = !!process.env.CLAUDE_CODE_TMPDIR &&
    !process.env.CLAUDE_CODE_TMPDIR.includes('claude-sota-installed');
  if (!testFixtureMode) {
    try {
      await stat('Z:/claude-sota-installed/.claude/state/parallel-guard-bypass.marker');
      process.exit(0);
    } catch { /* no marker, continue */ }
  }

  const ev = await readEvent();
  const sessionId = ev?.session_id || process.env.CLAUDE_SESSION_ID;
  const cPath = counterPath(sessionId);
  const sessionPath = await findLatestSessionFile(sessionId);
  if (!sessionPath) {
    // W343-P0(d) round-2 (codex REVIEW r2 P1 #2): REVERTED to exit(0). Codex
    // correctly identified that fail-closed here breaks the documented
    // linked-worktree workflow — `findLatestSessionFile` encodes cwd into the
    // .claude/projects/<encoded-cwd>/<sid>.jsonl path; in a linked worktree
    // (Z:/claude-sota-installed-W343/, -W335/, -W337/) the encoded path differs
    // and the canonical session-JSONL is not findable. This is NOT a true
    // silent-fallback (the W342-E2 audit conflated this with the top-level
    // crash path). Real silent-fallback flip is preserved at main().catch L457+.
    // Emit diagnostic so legitimate anomalies remain visible.
    if (process.env.CLAUDE_PARALLEL_GUARD_DEBUG === '1') {
      try {
        process.stderr.write(
          `[parallel-guard] no session JSONL found (sessionId=${sessionId || 'unset'}, cwd=${process.cwd()}) — legitimate fallback for linked-worktree or test-fixture; soft-passing.\n`
        );
      } catch {}
    }
    process.exit(0);
  }
  const [assistantInfo, userText] = await Promise.all([
    lastAssistantTurnText(sessionPath),
    lastUserPromptText(sessionPath),
  ]);

  const now = Date.now();
  const state = await readCounter(cPath);

  // W343 P0.4 RENAME-ATOMIC FIX (supersedes W333-P0-a single-file appendFile race):
  // Per-PID temp-write + rename(2) into per-session tick-DIRECTORY. Each Agent
  // dispatch writes a uniquely-named entry; readdir+stat counts entries within
  // TURN_WINDOW_MS. Rename is atomic on POSIX (rename(2) §3.293 IEEE/ISO) AND
  // Windows (MoveFileEx MOVEFILE_REPLACE_EXISTING); libuv uv_fs_rename is the
  // Node.js underlying primitive on both OSes. No partial reads possible —
  // entries either exist fully on disk or not at all. Closes the Windows NTFS
  // appendFile+readFile race that produced 2/2 W342 bypass-marker incidents.
  // Cite: P3-tick-file-race-fix.md §5 + POSIX.1-2017 §3.293 + MS MoveFileEx +
  //       libuv src/unix/fs.c + src/win/fs.c.
  const safeIdForTicks = String(sessionId || 'unknown').replace(/[^a-z0-9-]/gi, '_');
  const tickBase = process.env.CLAUDE_CODE_TMPDIR || 'Z:/claude-sota-installed/.claude/state';
  const tickDir = `${tickBase}/.parallel-guard-ticks-${safeIdForTicks}.d`;
  // Unique per-PID + ts + random suffix avoids collision when same PID retries.
  const uniqSuffix = `${process.pid}.${now}.${Math.random().toString(36).slice(2, 10)}`;
  const tickFinal = `${tickDir}/${uniqSuffix}.json`;
  const tickTmp = `${tickFinal}.tmp`;
  const tickPayload = JSON.stringify({ ts: now, pid: process.pid });
  try {
    await mkdir(tickDir, { recursive: true });
    await writeFile(tickTmp, tickPayload, 'utf8');
    await rename(tickTmp, tickFinal); // atomic on POSIX + Windows
  } catch {
    // Best-effort tick write; on failure recentTicks may under-count and
    // legacy JSONL-based fallback (>=2 Agent blocks in prior turn) still
    // resets the violation counter on the next hook fire.
    try { await unlink(tickTmp); } catch { /* */ }
  }

  // Best-effort prune of entries older than 2 × TURN_WINDOW_MS (acceptance C4).
  // Runs BEFORE counting to keep tick-dir bounded under high-frequency fire.
  try {
    const staleCutoff = now - 2 * TURN_WINDOW_MS;
    const entries = await readdir(tickDir);
    for (const name of entries) {
      if (!name.endsWith('.json')) continue;
      const fp = `${tickDir}/${name}`;
      try {
        const s = await stat(fp);
        if (s.mtimeMs < staleCutoff) {
          try { await unlink(fp); } catch { /* */ }
        }
      } catch { /* */ }
    }
  } catch { /* tick-dir absent on first call */ }

  // Count entries written within TURN_WINDOW_MS by mtime AND within the
  // current prompt (mtime >= state.intentSetTs). Per-prompt scoping fixes
  // W343 R4 cross-prompt false-acquit: a stale tick from the prior user
  // prompt within 1500ms could otherwise produce recentTicks>=2 and
  // short-circuit current-turn enforcement. UserPromptSubmit hook
  // (parallel-guard-userpromptsubmit.mjs) sets state.intentSetTs to
  // Date.now() on every new prompt; using max(intentSetTs, now-WINDOW)
  // as the cutoff guarantees no pre-prompt tick is counted.
  //
  // Defensive fallback: if state.intentSetTs is missing/zero (sessions
  // started before the hook was wired, or first-prompt-after-cold-start),
  // fall back to now-TURN_WINDOW_MS alone (legacy behavior). This keeps
  // the hook backward-compatible AND avoids hard-fail when a new session
  // hasn't yet emitted UserPromptSubmit.
  //
  // Cite: W343 codex R4 review (cross-prompt false-acquit finding) +
  //       parallel-guard-userpromptsubmit.mjs:109 (intentSetTs writer) +
  //       Anthropic hooks doc UserPromptSubmit event semantics.
  async function countRecentTicks() {
    let count = 0;
    const turnCutoff = now - TURN_WINDOW_MS;
    const intentCutoff = typeof state.intentSetTs === 'number' && state.intentSetTs > 0
      ? state.intentSetTs
      : 0;
    const cutoff = Math.max(turnCutoff, intentCutoff);
    try {
      const entries = await readdir(tickDir);
      for (const name of entries) {
        if (!name.endsWith('.json')) continue;
        const fp = `${tickDir}/${name}`;
        try {
          const s = await stat(fp);
          if (s.mtimeMs >= cutoff) count++;
        } catch { /* skip unreadable entry */ }
      }
    } catch { /* readdir failed; count stays 0 */ }
    return count;
  }
  let recentTicks = await countRecentTicks();

  // FAST PATH: clean parallel evidence in current turn-window → reset + exit.
  if (recentTicks >= 2) {
    state.count = 0;
    state.lastViolationTs = 0;
    await writeCounter(cPath, state);
    process.exit(0);
  }

  // FAST PATH: legacy JSONL-based reset — prior-turn parallel evidence
  // (>=2 Agent blocks in PRIOR turn). Belt-and-suspenders fallback.
  if (assistantInfo.agentBlocks >= 2) {
    state.count = 0;
    state.lastViolationTs = 0;
    await writeCounter(cPath, state);
    process.exit(0);
  }

  // W331-r3 P0.1: prefer UserPromptSubmit-set intent flag (message-level).
  // Falls back to JSONL text-scan if flag not present (defensive — handles
  // sessions started before the UserPromptSubmit hook was wired).
  let multiStreamContext;
  if (typeof state.multiStreamIntent === 'boolean') {
    multiStreamContext = state.multiStreamIntent;
  } else {
    const haystack = `${userText} ${assistantInfo.text}`;
    multiStreamContext = detectMultiStream(haystack);
  }
  if (!multiStreamContext) {
    // FAST PATH: no multi-stream context — persist turn state and pass.
    await writeCounter(cPath, state);
    process.exit(0);
  }

  // W343 R3 codex closure (early-reader race in multi-stream context):
  // The first hook process in a real parallel fan-out may readdir before peer
  // hooks have renamed their ticks. We are NOW in confirmed multi-stream
  // context (above gates), so wait briefly for peer ticks to land before
  // deciding violation. This guards BOTH first-violation (clean state) AND
  // about-to-block paths — codex R2 finding only the latter was insufficient
  // because the race could poison clean state with a spurious first violation.
  // Zero cost on solo context (returned above at the multi-stream gate).
  // Cite: W343 codex GPT-5.5 R3 review (clean-state false-violation finding).
  if (recentTicks < 2) {
    const PARALLEL_DETECT_DEADLINE_MS = 200;
    const POLL_INTERVAL_MS = 20;
    const deadline = Date.now() + PARALLEL_DETECT_DEADLINE_MS;
    while (Date.now() < deadline) {
      await new Promise((r) => setTimeout(r, POLL_INTERVAL_MS));
      recentTicks = await countRecentTicks();
      if (recentTicks >= 2) break;
    }
  }

  if (recentTicks >= 2) {
    // Retry caught peers — proven parallel within window. Reset + exit.
    state.count = 0;
    state.lastViolationTs = 0;
    await writeCounter(cPath, state);
    process.exit(0);
  }

  // Stale-violation false-positive guard.
  if (state.lastViolationTs > 0 && now - state.lastViolationTs > VIOLATION_TTL_MS) {
    state.count = 0;
  }

  const reason =
    'multi-stream wording detected (audit/review/sweep/Stream X/in parallel) but solo Agent dispatch observed';

  if (state.count >= 1) {
    // 2nd+ consecutive violation — BLOCK.
    const blockMsg =
      `W330 P0-A BLOCK (2nd consecutive solo-dispatch violation): ${reason}. ` +
      `Per W269/W312-D parallel-dispatch mandate + Anthropic hooks-doc exit-code-2 semantics. ` +
      `REMEDIATION: in your NEXT assistant turn, dispatch 2+ Agent calls in ONE message (parallel fan-out), ` +
      `OR set CLAUDE_PARALLEL_GUARD_DISABLE=1 to override. ` +
      `Counter resets on parallel evidence (>=2 Agent blocks in one turn) or after 5 minutes idle.`;
    try {
      process.stderr.write(`${blockMsg}\n`);
    } catch {
      /* stderr closed */
    }
    state.count = state.count + 1;
    state.lastViolationTs = now;
    await writeCounter(cPath, state);
    process.exit(2);
  }

  // 1st violation — advisory + increment.
  state.count = state.count + 1;
  state.lastViolationTs = now;
  emitAdvisory(reason, state.count);
  await writeCounter(cPath, state);
  process.exit(0);
}

main().catch(async (err) => {
  // W338-P0d-debug: log error before exit so guard failures don't vanish
  // (per codex pre-flight review — silent error swallowing masks W330 test failures).
  // CLAUDE_PARALLEL_GUARD_DEBUG=1 gates verbose stacktrace output.
  if (process.env.CLAUDE_PARALLEL_GUARD_DEBUG === '1') {
    try { process.stderr.write(`[parallel-guard ERROR] ${err?.stack || err?.message || String(err)}\n`); } catch {}
  }
  // W343 P0(d) — invert silent-fallback. Previously this catch always exited 0,
  // hiding crashes (W342-E7 root-cause class). failClosedExit re-checks the
  // bypass marker AND honors CLAUDE_PARALLEL_GUARD_FAILOPEN=1, so operators
  // retain a recovery path while genuine guard failures now surface as exit 2.
  try {
    await failClosedExit(`main() rejected: ${err?.message || String(err)}`);
  } catch {
    // failClosedExit calls process.exit — should never reach here. If it did
    // (e.g., import failed), fall through to a defensive exit 2 with no marker
    // re-check (we cannot import stat safely from here). This preserves the
    // P0(d) fail-closed contract under catastrophic init failure.
    process.exit(2);
  }
});
