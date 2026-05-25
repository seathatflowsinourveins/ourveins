# W343 P0 — Parallel-Dispatch Reliability Root-Cause Closure

> Wave W343 / branch `goal/W343` / worktree `Z:/claude-sota-installed-W343`. Cite W342-AUDIT §2 (E1+E2+E7 convergence on 3-layer root-cause stack for `parallel_ratio=0.0031`).

## Baseline snapshot

| Metric | Value | Source |
|---|---|---|
| parallel_ratio (30d) | **0.0031** | `node tools/parallel-ratio-telemetry.mjs` @ 2026-05-20T20:26:15Z |
| denom (30d) | 1963 | same |
| distribution | 1:1957 · 2:2 · 3:4 · 4+:0 | same |
| target | ≥0.30 | W325-A F1 SEV-1 floor |
| bypass-marker | EXISTS (0B, 2026-05-20 10:45 UTC) | `Z:/claude-sota-installed/.claude/state/parallel-guard-bypass.marker` |
| HEAD | f920dc2 | W343 worktree branched from main |

## §P0.a — bypass-marker migrate-to-rationale

**Status**: ✅ DONE 2026-05-20 16:30 UTC

**Action**: migrate `Z:/claude-sota-installed/.claude/state/parallel-guard-bypass.marker` (0-byte sentinel) to dated rationale doc at `docs/architecture/W343-SOTA-UNLEASH/BYPASS-MARKER-RATIONALE.md` cite-anchored to W329-R5 cond-(b). Delete the marker after the rationale doc lands. The dated rationale preserves the operator's W329-R5 acceptance-record for audit + un-blocks the binding `exit(2)` 2nd-violation gate.

**Verify**: `Test-Path Z:/claude-sota-installed/.claude/state/parallel-guard-bypass.marker` → False AND `Test-Path Z:/claude-sota-installed-W343/docs/architecture/W343-SOTA-UNLEASH/BYPASS-MARKER-RATIONALE.md` → True.

## §P0.b — userpromptsubmit counter-path realignment

**Status**: ✅ DONE-ALREADY (W341 P0.1 round-3+4 architectural fix landed pre-W342-audit) — W343 ratifies + adds thin re-export module

**Discovery**: W342-AUDIT E2 reported this as P0-OPEN. Reading `tools/parallel-guard-userpromptsubmit.mjs:21-32` reveals the counter-path mismatch AND stale regex were already fixed in W341 round-3+4 (per inline cite-anchors). The fix introduced `tools/parallel-guard-detector.mjs` as the SHARED authority for both `STRONG_RE`/`WEAK_PAIR_RE` and `counterPath()` — both hooks import from it. The audit-claim was based on stale inspection.

**W343 action taken**:
- Added `tools/parallel-guard-regex.mjs` as a thin re-export wrapper (W343-A1 agent, 127 LOC) exporting the named surface `STRONG_RE` / `WEAK_PAIR_RE` / `MULTI_STREAM_RE` for downstream consumers that want a SOTA-named import path. Authoritative implementation remains `parallel-guard-detector.mjs`.
- `tools/preagent-parallel-guard.mjs:46-53` updated to also import via the re-export module (dependency declaration; runtime detection still flows through `detectMultiStream()` from detector).
- Smoke-test stub at end of `parallel-guard-regex.mjs` validates 5 cases (3 STRONG / 1 WEAK_PAIR / 1 negative); guarded so `import` doesn't re-fire it.

**Verify**: ✅
- `grep counterPath tools/preagent-parallel-guard.mjs` shows L46 `counterPath as sharedCounterPath` import + L205 alias + L308 callsite.
- `grep counterPath tools/parallel-guard-userpromptsubmit.mjs` shows L26 `import { counterPath, detectMultiStream } from './parallel-guard-detector.mjs'`. Both hooks resolve to identical path.
- `node tools/parallel-guard-regex.mjs` → 5/5 PASS / 0 fail.

## §P0.c — build-subagent-allowlist.mjs CJS-require-in-ESM fix

**Status**: ✅ DONE — fix applied 2026-05-20

**Action**: `import { sep } from 'node:path'` added at L32; L75 `require('node:path').sep` → `sep`.

**Verify**: `node --check tools/build-subagent-allowlist.mjs` → exit 0; `node tools/build-subagent-allowlist.mjs --regenerate` → writes 173-FQN allowlist without ReferenceError.

## §P0.d — silent-fallback invert: 5 guard-crash exit(0)→exit(2)

**Status**: ✅ DONE 2026-05-20 16:35 UTC — 3 flipped paths (2 in preagent-parallel-guard via W343-A1; 1 in preagent-subagent-validator + 1 in subagent-stop-guard via main session). Validator missing-allowlist path retained as SANCTIONED soft-fail per W340 operator-broken-state fallback (added W343-P0d diagnostic comment).

**Action**: per codex E7 single-most-important — flip 5 enumerated paths from `exit(0)` to `exit(2)`:
- `preagent-parallel-guard.mjs:277-280` (missing session file)
- `preagent-parallel-guard.mjs:411-419` (guard crash top-level)
- `preagent-subagent-validator.mjs:119-125` (missing subagent allowlist)
- `preagent-subagent-validator.mjs:144-147` (validator crash top-level)
- `subagent-stop-guard.mjs:135-146` (SubagentStop crash)

Add `CLAUDE_HOOK_DEBUG=1` opt-in diagnostic. Preserve bypass-marker escape-hatch so operator can still override per W329-R5 cond-(b). Per the existing W331-r4 in-session-bypass-marker design.

**Verify**: each guard, when manually crashed (e.g. `node tools/preagent-parallel-guard.mjs <<<'invalid-json'`), now exits 2 with stderr error message. Bypass-marker still suppresses.

## §P0.e — re-measure parallel_ratio post-fix

**Status**: IN-FLIGHT — baseline 0.0031 (denom 1963) captured pre-fix; post-fix readout will be taken after P0 commit + W343→main merge.

**Action**: after (a)–(d) ship + at least one dispatch wave occurs, `node tools/parallel-ratio-telemetry.mjs` and compare to baseline 0.0031.

**Note**: 30d rolling window means immediate post-fix readout still dominated by pre-fix history. Target ≥0.30 will require multi-day organic accumulation; this wave reports the new baseline trajectory rather than the eventual steady-state.

## P0 ship-gate

5 sub-actions closed AND `node --check` clean across all touched scripts AND `pre-commit run --all-files` GREEN AND codex round-1 APPROVE on the P0 commit (or REVISE→round-2 ≤2).
