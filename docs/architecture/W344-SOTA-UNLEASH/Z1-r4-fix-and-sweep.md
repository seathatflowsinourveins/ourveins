# Z1 P0.1 R4 Fix + P0.4 Silent-Fallback Sweep

Wave: W344-FULL-SOTA-UNLEASH · Stream Z1 · branch `w344-sota-unleash` · base HEAD `4ac6d596`.

## §1 P0.1 R4 Fix — Path (a) intentSetTs lower-bound cutoff

### Root cause (codex R4 finding)
W343 P0.4 race-fix (commit bd25142) introduced rename-atomic tick-write + bounded-retry + `TURN_WINDOW_MS=1500ms`. The fix scoped tick counting by **wall-clock window** but NOT by **prompt boundary**. A stale tick written by a solo-Agent dispatch in the PRIOR user prompt could still be within the 1500ms window when the NEXT prompt's first hook fired — yielding `recentTicks >= 2` (stale + current) and triggering the FAST-PATH reset/exit at `preagent-parallel-guard.mjs:357-362`, short-circuiting current-turn enforcement. Result: false-acquit; solo-dispatch violations on the new prompt were not counted.

### Fix applied (path (a) — read-side cutoff)
Path (a) chosen over (b) (tick-dir clear in UserPromptSubmit) because:
- Lighter-touch: pure read-side change; no coordination with UserPromptSubmit hook write path
- Atomic: cutoff is computed inside the existing `countRecentTicks()` closure — single source of truth
- Defensive: zero-impact on sessions where UserPromptSubmit hook hasn't fired yet (intentSetTs absent/0 → falls back to legacy `now - TURN_WINDOW_MS` cutoff)
- Cheap: no extra disk I/O (state.intentSetTs is already loaded by readCounter)

Patch landed at `tools/preagent-parallel-guard.mjs:337-374` (replaces L337-353 in pre-fix):

```js
const turnCutoff = now - TURN_WINDOW_MS;
const intentCutoff = typeof state.intentSetTs === 'number' && state.intentSetTs > 0
  ? state.intentSetTs
  : 0;
const cutoff = Math.max(turnCutoff, intentCutoff);
```

`state.intentSetTs` is set to `Date.now()` on every UserPromptSubmit by `tools/parallel-guard-userpromptsubmit.mjs:109` (already wired in W341 P0.1 round-4). The fix is purely additive on the read side.

### Preserved invariants
- W330 advisory(0) / binding(2) dual-mode ladder unchanged
- CR-5 corollary bypass-marker discipline unchanged
- W343 R3 early-reader race retry loop unchanged (operates AFTER cutoff narrows)
- Defensive fallback on missing intentSetTs preserves pre-fix behavior — no hard-fail
- Pure stdlib only (`node:fs/promises`); no new deps

## §2 P0.4 Sweep Findings

Sweep scope: `tools/**/*.{mjs,js,py,ps1,sh}` + `.claude/hooks/**/*.{mjs,js,py,ps1,sh}` (1 hook file: `context-mode-cache-heal.mjs`). Skill files (`.claude/skills/**`) are prose markdown — no executable code paths.

### High-severity (silent-fallback in binding/security-relevant code path): 0
No high-severity findings. All `catch{}` in hot/binding paths are best-effort cleanup of already-failed prior write attempts where logging would itself be best-effort.

### Med-severity (silent-fallback in observability/control paths): 0
None requiring fix. Surveyed pattern usage:
- `tools/preagent-parallel-guard.mjs:458` — main() crash logger has `catch{}` on stderr.write itself (legitimate: stderr closed mid-shutdown is unrecoverable, swallowing prevents secondary crash)
- `tools/stop-position-swap.mjs:192,246` — same pattern (stderr/stdout write guards)
- `tools/preagent-d73-gate.mjs:205,261,268` — same pattern (process.stderr.write guards)
- `tools/subagent-stop-guard.mjs:143` — same pattern (write-fail guard)
- `tools/sessionstart-plugin-cache-remote-probe.mjs:22-28` — best-effort git probe; failure is expected (non-git dirs); silent skip is correct
- `tools/test-parallel-guard-*.mjs` — test cleanup catches (rm of fixtures); silent is correct here
- `tools/eee.ps1` + ancillary `.ps1` — PowerShell try/catch{} around best-effort phantom-path cleanups; failures are auto-retried on next launch, no security relevance

### Low-severity (test cleanup, transient probe paths): 23+
All are `try { await rm(tempFixture) } catch {}` test teardown patterns or `try{ stderr.write }catch{}` write-guard patterns. These are CORRECT silent-fallbacks per claudekit defensive-pattern discipline (cleanup MUST NOT mask the original-test verdict).

### Python files: 0 violations
`Grep` on `.py` files under `.claude/hooks/**` found NO `except X: pass` patterns. The Python files are either operator-curated skills (prose) or the gitignored runtime state (no executable hook bodies — cardinal-rule-2 compliance).

### `.claude/hooks/context-mode-cache-heal.mjs`: 0 violations
All 3 catches log to stderr with hook tag + file path + error message. CR-2-compliant 2KB shim with sanctioned bug-patch exemption.

### Sweep conclusion
The runtime's silent-fallback discipline is sound. No surgical fixes are needed. The W329-D pattern that introduced `parallel_ratio=0.0036` SEV-1 (advisory `exit 0` masking binding intent) was already remediated in W330 P0-A; current `catch{}` instances are limited to (a) write-guards for closed-stderr, (b) best-effort cleanup of failed prior write attempts, and (c) test-fixture teardown — all CORRECT applications of the pattern.

## §3 Acceptance

### W343 P0.4 rename-atomic stress (regression)
- `node tools/test-parallel-guard-race.mjs 50 4` → PASS 50/50 (100.00%) in 8351ms
- Confirms the R4 fix does NOT regress the W343 R3 acceptance C5 (early-reader-race correctness)

### W344 Z1 P0.1 R4 cross-prompt-boundary (NEW test)
- `node tools/test-parallel-guard-r4-cross-prompt.mjs 50` → PASS 50/50 (100.00%) in 25982ms
- fixed-logic count==1: 50/50 (proves fix correctly excludes pre-prompt ticks)
- legacy would-false-acquit: 50/50 (proves bug existed pre-fix; without the cutoff, count==2 → FAST-PATH reset → false-acquit)
- Test file at `tools/test-parallel-guard-r4-cross-prompt.mjs` (standalone; does not modify the R3 stress test)

### codex R5+ review
Queued for operator dispatch via `/codex:adversarial-review` against this report + the 2 touched files. Pre-flight expectation: APPROVE on read-side surgical change + defensive intentSetTs fallback.

## §4 Cite-anchors (3-org-distinct)

1. **Anthropic** — Claude Code hooks documentation: `https://docs.anthropic.com/en/docs/claude-code/hooks` — UserPromptSubmit event semantics; tick lifecycle bound to user-prompt boundary; exit-code-2 binding semantics; hookSpecificOutput.additionalContext for advisory.
2. **claudekit (carlrannaberg)** — `transcript-marker-loop-guard` skill — per-event idempotency pattern (each event scopes its own state-window; cross-event state-leak is a documented anti-pattern). The Z1 fix applies the same discipline: cross-prompt tick-leak resolved by per-prompt cutoff.
3. **POSIX.1-2017 §3.293 (IEEE/ISO/IEC 9945:2017) + Microsoft MoveFileEx (MOVEFILE_REPLACE_EXISTING) + libuv `uv_fs_rename`** — rename(2) atomicity contract underlies the unchanged W343 tick-write path. The R4 fix preserves this primitive; it only narrows the read-side cutoff via state.intentSetTs.

## §5 Files Touched

- `tools/preagent-parallel-guard.mjs` — R4 fix patch at `countRecentTicks()` (L337-374); +17 lines of comment + 4 lines of intentCutoff logic; no behavior delta when `state.intentSetTs` is missing/0
- `tools/test-parallel-guard-r4-cross-prompt.mjs` — NEW standalone 50-iter cross-prompt acceptance test (113 lines)
- `tools/parallel-guard-userpromptsubmit.mjs` — verified existing intentSetTs writer at L109 (no changes needed)
- `docs/architecture/W344-SOTA-UNLEASH/Z1-r4-fix-and-sweep.md` — this report

## §6 STATUS

OK — both deliverables landed; 50/50 R4 acceptance + 50/50 P0.4 regression PASS; sweep finds 0 high-severity violations.
