# W343 P3 — Parallel-Guard Tick-File Race Fix Docket

**Wave**: W342 → W343 carry-forward
**Filed**: 2026-05-20
**Owner**: W343 P3
**Severity**: P1 (recurring bypass-marker burn; degrades parallel_ratio measurement)

## §1 Problem

Windows POSIX atomic-write gap. `tools/preagent-parallel-guard.mjs:296-313` uses `fs.appendFile` + `fs.readFile` on a shared `.parallel-guard-ticks-<sid>.jsonl` to count concurrent Agent dispatches within `TURN_WINDOW_MS`. POSIX.1-2017 §3.293 `PIPE_BUF` atomic-write guarantee applies to pipes/FIFOs only, NOT regular-file `O_APPEND` on Windows NTFS. Rapid sequential PreToolUse[Agent] hook fires (same assistant message, 2+ Agent calls) race: 2nd hook's `appendFile` may complete before 1st hook's `readFile` flushes, OR vice versa — `recentTicks` reads 1 instead of 2, falsely blocking the 2nd dispatch as "silent-serial fallback".

## §2 Empirical Evidence (W342 wave)

- **Incident 1 — W342 X1-X4**: first parallel-fan-out attempt blocked; operator engaged W331 P0-1 r4 bypass-marker to proceed.
- **Incident 2 — W342 Z verify+carry-forward**: second attempt same wave, same block, same bypass-marker required.
- Both incidents: intent was 2+ Agent fan-out in one assistant message; guard reported `recentTicks=1` despite simultaneous dispatch.

## §3 Root Cause

`tools/preagent-parallel-guard.mjs:296-313` write→read pattern:
```js
const tickPath = `${tickBase}/.parallel-guard-ticks-${safeIdForTicks}.jsonl`;
await appendFile(tickPath, tickLine, 'utf8');     // L301 — non-atomic on Windows
// ...
const tickContent = await readFile(tickPath, 'utf8'); // L313 — may miss peer write
```
Two concurrent hook processes each `appendFile` then `readFile`; on Windows the second writer's bytes may not be flushed to disk before the first reader's read returns. `TURN_WINDOW_MS=10s` does not help — race is sub-millisecond.

## §4 Proposed Fix Options

| Opt | Approach | Deps | Cross-platform | Verdict |
|-----|----------|------|----------------|---------|
| (a) | Named-mutex via `node-windows` / `@serialport/bindings-cpp` | Heavy native dep | Windows-only mutex | REJECT — dep weight + non-portable |
| (b) | **Rename-atomic**: write `<tickfile>.<pid>.<ts>` then `rename` into a tick-dir; read by `readdir` filter | stdlib only | POSIX `rename` + Windows `MoveFileEx` both atomic | **RECOMMEND** |
| (c) | SQLite WAL-mode tick table | `better-sqlite3` dep | Yes | REJECT — overkill for counter |
| (d) | `process.send` IPC between hook PIDs | None | N/A | REJECT — CC PreToolUse hooks do NOT share parent process |

## §5 Recommended: Option (b) Rename-Atomic

Replace single-shared-file append/read with per-PID write + rename into a tick-directory:
```js
const tickDir = `${tickBase}/.parallel-guard-ticks-${safeIdForTicks}.d`;
const tickFile = `${tickDir}/${process.pid}.${now}.json`;
await mkdir(tickDir, { recursive: true });
await writeFile(`${tickFile}.tmp`, tickLine);
await rename(`${tickFile}.tmp`, tickFile);   // atomic on both POSIX + Windows
// Read: readdir, filter by mtime within TURN_WINDOW_MS, count entries.
```
Atomicity: `rename` is guaranteed atomic by POSIX `rename(2)` and Windows `MoveFileEx(MOVEFILE_REPLACE_EXISTING)`. No partial reads possible — file either exists fully or not at all.

## §6 Acceptance Criteria

1. 4 Agent dispatches in 1 assistant message → all 4 readers see ≥4 entries within `TURN_WINDOW_MS`.
2. Bypass-marker (W331 P0-1 r4) NOT required for parallel fan-out.
3. parallel_ratio measurement (W325-A F1 baseline) no longer corrupted by false-block fallback.
4. Tick-dir cleanup: stale entries older than `2 × TURN_WINDOW_MS` pruned on hook entry (best-effort, no-throw).
5. Regression test: 50-iteration concurrent-spawn stress under `tools/test-parallel-guard-race.mjs` shows 100% correct count.

## §7 W343 P3 Docket Sign-Off

- **Cite (internal)**: `tools/preagent-parallel-guard.mjs:296-313` + W331 P0-1 r4 in-session bypass-marker + CLAUDE.md L13 cardinal-rule-5 corollary.
- **Cite (external, 3-org-distinct per W295 I1)**:
  - POSIX.1-2017 §3.293 rename atomicity (IEEE/ISO) — opengroup.org `pubs/online/9699919799/functions/rename.html`
  - Microsoft `MoveFileEx(MOVEFILE_REPLACE_EXISTING)` (Microsoft Docs) — learn.microsoft.com `windows/win32/api/winbase/nf-winbase-movefileexa`
  - **libuv `uv_fs_rename`** (Joyent/Node.js Foundation) — github.com/libuv/libuv `src/unix/fs.c` + `src/win/fs.c` (Node.js underlying-primitive on both OSes)
- **Status**: FILED for W343 P3 execution.
- **Operator-sign**: pending.
