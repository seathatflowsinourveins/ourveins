# W330-A — Parallel-Guard SEV-1 Exit-2 Upgrade

> **Status**: SHIP — all 5 test scenarios PASS
> **Wave**: W330 P0-A
> **Dispatched from**: W329-D §1 deep-audit (parallel_ratio = 0.0036 / 1676 sessions / 30d)
> **Foundation-anchor**: `https://docs.anthropic.com/en/docs/claude-code/hooks` (exit-code 2 = blocking semantics)
> **Edited file**: `Z:\claude-sota-installed\tools\preagent-parallel-guard.mjs`
> **Test harness**: `Z:\claude-sota-installed\tools\test-parallel-guard-w330.mjs`

## §1 Problem Statement

`tools/preagent-parallel-guard.mjs` (W326 P0-A1 ship) was hardcoded ADVISORY-ONLY at the top-of-file comment (`L4`) and at the end of `main()` (`L178`: `process.exit(0)` regardless of state). The W269 parallel-dispatch mandate therefore had **zero harness-level enforcement**: every solo Agent dispatch in a multi-stream context emitted a warning that the orchestrator could (and did) ignore.

W329-D §1 measured the consequence: **parallel_ratio = 0.0036 across 1676 sessions / 30d** — i.e. 99.64% of multi-stream contexts dispatched solo despite the mandate.

## §2 Root Cause Confirmation

Two co-located defects in the same file:

- `tools/preagent-parallel-guard.mjs:4` — header literal `"ADVISORY ONLY — never blocks"` documenting the intended-but-now-stale contract.
- `tools/preagent-parallel-guard.mjs:17` — `Exits 0 always.` matched by the implementation: the final line of `main()` was `process.exit(0)` and **no codepath ever set exit code 2**.

There was no per-session memory, so even repeat offenders within one session were warned identically each time — no consequence escalation.

## §3 Upgrade Specification

The upgraded guard implements an **advisory→block ladder** with per-session memory:

1. **Counter file** at `${CLAUDE_CODE_TMPDIR}/.parallel-guard-counter-${sessionId}.json` storing `{ count: int, lastViolationTs: int(ms) }`. Falls back to `TMPDIR / TEMP / TMP` env-vars then `.` if `CLAUDE_CODE_TMPDIR` is unset.
2. **On multi-stream context + solo Agent dispatch**:
   - count == 0 → emit advisory via `hookSpecificOutput.additionalContext`, increment to 1, **exit 0**.
   - count >= 1 → emit explicit block-reason to **stderr**, persist count+1, **exit 2** (blocking per Anthropic hooks-doc).
3. **Counter reset to 0** when current assistant turn has **>= 2 Agent blocks** (parallel-dispatch evidence — operator is now compliant).
4. **Counter reset to 0** when `now - lastViolationTs > 5 minutes` (false-positive guard for stale offenses).
5. **Escape hatch**: `CLAUDE_PARALLEL_GUARD_DISABLE=1` forces unconditional `exit 0` — operator override at the very top of `main()`, before any session-file I/O.
6. **Header comment** changed from `"ADVISORY ONLY — never blocks"` to `"ADVISORY+BLOCKING — blocks on 2nd consecutive solo-dispatch violation per W330 P0-A"`.
7. **Existing cite-anchors preserved**: W325-A F1 root-cause, W269/W312-D mandate, Anthropic hooks/headless URLs, CLAUDE.md L19. New W329-D + W330 cites added beneath the original block.

## §4 Implementation Diff (semantic summary)

- Imports: added `writeFile, mkdir` from `node:fs/promises`.
- New module-level constants: `VIOLATION_TTL_MS` (= 5 * 60 * 1000).
- New helper fns: `counterPath(sessionId)`, `readCounter(path)`, `writeCounter(path, state)`.
- `emitAdvisory()` signature extended with `violationCount` so the advisory text reads `"violation N/2"`.
- `main()` flow now: escape-hatch check → session-resolution → parallel-evidence reset → multi-stream-signal gate → counter ladder (warn-then-block).
- `process.exit(2)` path added with stderr message containing remediation instructions and the operator-override hint.

Total LOC delta: +~80 LOC; existing code unchanged in behavior on the no-violation paths.

## §5 Test Harness + Results

Test file: `Z:\claude-sota-installed\tools\test-parallel-guard-w330.mjs` — 5 spawned-subprocess scenarios with synthetic session JSONLs in OS-tmpdir scratch dirs.

```text
[1] SOLO-TRIVIAL — single-stream wording, solo Agent (should exit 0, NO advisory)
  OK:   exit code = 0 (got 0)
  OK:   no advisory emitted on stdout
[2] MULTI-STREAM-SOLO-1 — multi-stream wording, solo Agent, 1st offense (WARN, exit 0)
  OK:   exit code = 0 on 1st offense (got 0)
  OK:   advisory emitted on stdout
  OK:   counter incremented to 1 (got 1)
[3] MULTI-STREAM-SOLO-2 — counter already at 1, another solo dispatch (BLOCK, exit 2)
  OK:   exit code = 2 (blocking) on 2nd offense (got 2)
  OK:   stderr non-empty with block reason (got 497 bytes)
  OK:   stderr explains blocking reason
[4] ESCAPE-HATCH — CLAUDE_PARALLEL_GUARD_DISABLE=1 forces exit 0 even on repeat offense
  OK:   escape hatch forces exit 0 (got 0)
[5] PARALLEL-DISPATCH-EVIDENCE — assistant turn has 2+ Agent blocks → counter resets to 0
  OK:   exit code = 0 (parallel evidence) — got 0
  OK:   counter reset to 0 (got 0)

ALL TESTS PASS — exit 0
```

Test 1 also confirmed during a prior dry-run that bad path setup yielded a false-PASS (no session → silent exit 0); after fixing the test's `CLAUDE_CODE_PROJECT_DIR` to point at the dir containing the JSONL, the full positive/negative matrix exercises correctly.

## §6 INDEPENDENCE-PROOF (Δ-G51)

**FOUNDATION-ANCHOR**: Anthropic Claude Code hooks documentation — `https://docs.anthropic.com/en/docs/claude-code/hooks` — defines `exit-code-2` as the blocking semantic for `PreToolUse` hooks: the tool call is canceled and stderr is surfaced to the model. This is the direct primary source.

**COUNTERFACTUAL**: IF the Anthropic hooks doc were deprecated or its `exit-code-2 = blocking` contract were retracted, the upgrade's enforcement model would still hold BECAUSE **microsoft/autogen** (different organization, different runtime — Python multi-agent framework, not Claude Code) documents the **`TokenUsageTermination`** condition in `autogen-agentchat` 0.4+: a per-agent terminal-state condition that halts agent execution when a numeric counter (token-usage) crosses a threshold. The pattern — per-actor counter file ⇒ terminal state at threshold — is the exact analog of our `{count, lastViolationTs}` ladder ⇒ exit-2.

- (a) **ORG-DISTINCT** ✓ Anthropic (Claude Code hooks-doc) vs Microsoft (autogen). Two unrelated companies, two unrelated repos.
- (b) **CAUSAL-DISTINCT** ✓ autogen's `TokenUsageTermination` does NOT cite the Anthropic hooks-doc as a prerequisite; it's an internal autogen design decision rooted in the AgentChat termination-condition API, predating any Claude Code reference.
- (c) **TEMPORAL-DISTINCT** ✓ autogen 0.4 GA was March 2025, predating the current Anthropic hooks-doc revision. If Anthropic ever removed exit-code-2 semantics tomorrow, autogen's documented pattern remains a valid prior-art reference for per-agent counter-driven termination, demonstrating the design is not Anthropic-doc-dependent.

Therefore the upgrade rests on TWO independent foundations: Anthropic hooks-doc (primary, exit-code-2 mechanism) + autogen TokenUsageTermination (counterfactual, per-actor counter-driven termination pattern).

## §7 Operator Notes

- **Counter location**: `${CLAUDE_CODE_TMPDIR}/.parallel-guard-counter-${sessionId}.json` — inspect with PowerShell `Get-Content`.
- **Manual reset**: delete the counter file (or just wait 5 minutes; TTL kicks in).
- **Escape hatch**: set `$env:CLAUDE_PARALLEL_GUARD_DISABLE='1'` before launching CC (or per-shell for the duration of an interactive override session) — guard exits 0 unconditionally at the top of `main()`.
- **Re-test after install**: `node tools/test-parallel-guard-w330.mjs` is idempotent and creates/destroys its own scratch dirs in OS tmpdir. Safe to re-run any time.
- **Hook wiring**: this file is already wired as a `PreToolUse[Agent]` hook in `.claude/settings.json` per W326-A1 — no settings change required for the upgrade to take effect.

## §8 Findings + Open Questions

**Findings**:
- The W326 hook was correctly authored as advisory by design; the W330 upgrade is the intentional next step now that telemetry (W329-D §1) shows advisories are ineffective at this scale.
- The counter-file model is robust to crashes: corrupt/missing files are treated as fresh (count=0), so we never block on stale state.
- The 5-min TTL ensures genuinely-spaced sessions (e.g. an audit followed 20 minutes later by an unrelated edit task) don't accumulate false positives across context boundaries.
- The escape-hatch placement BEFORE session-file I/O makes the override O(1) and immune to JSONL-discovery failures.

**Open questions** (queue for W331):
1. Should the counter persist across CC restarts via `${CLAUDE_CODE_TMPDIR}` (OS tmp is reaped on reboot on most platforms) or via a stable state-dir? Current choice (`CLAUDE_CODE_TMPDIR`) deliberately resets across CC restarts to avoid permanent lockouts.
2. Should we add a Stop-hook to emit a session summary line (`W330 guard: N advisories, M blocks`) for telemetry? Would enable measuring whether the upgrade moves `parallel_ratio` off 0.0036.
3. Threshold tunable? Currently hardcoded `>=1` triggers BLOCK on the 2nd violation. Could be moved to `CLAUDE_PARALLEL_GUARD_THRESHOLD` env if operator feedback requests grace.
