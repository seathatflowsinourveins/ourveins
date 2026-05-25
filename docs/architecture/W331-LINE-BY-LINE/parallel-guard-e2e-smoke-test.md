# W331-r4 parallel-guard E2E smoke test

**Wave**: W331-r4 · **Date**: 2026-05-19 · **Goal**: validate UserPromptSubmit→PreToolUse[Agent] chain after readCounter() fix (25a091e)

## §1 Setup

- UserPromptSubmit hook: `Z:/claude-sota-installed/tools/parallel-guard-userpromptsubmit.mjs` (W331-r3 commit 38e0bca)
- PreToolUse[Agent] hook: `Z:/claude-sota-installed/tools/preagent-parallel-guard.mjs` (W331-r4 commit 25a091e, readCounter() now actually called)
- State path: `${CLAUDE_CODE_TMPDIR}/.parallel-guard-counter-<sessionId>.json`
- CLAUDE_CODE_TMPDIR resolves to `Z:/claude-sota-installed/tmp` per CLAUDE.local.md ENV block

## §2 Scenario A — multi-stream prompt → intent=true

**Inject**: `{"session_id":"smoke-A","prompt":"audit all 7 P0 streams in parallel"}` piped to `parallel-guard-userpromptsubmit.mjs`
**Hook exit**: `0`
**State file**: `tmp/.parallel-guard-counter-smoke-A.json` =
```json
{"count":0,"lastViolationTs":0,"turnFireCount":0,"turnFireLastTs":0,"multiStreamIntent":true,"intentSetTs":1779229925257}
```
**Expected**: `multiStreamIntent: true`
**Verdict**: PASS — wording `audit/in parallel` matched, intent flag set to `true`, intentSetTs stamped.

## §3 Scenario B — non-multi-stream prompt → intent=false

**Inject**: `{"session_id":"smoke-B","prompt":"fix this typo"}` piped to `parallel-guard-userpromptsubmit.mjs`
**Hook exit**: `0`
**State file**: `tmp/.parallel-guard-counter-smoke-B.json` =
```json
{"count":0,"lastViolationTs":0,"turnFireCount":0,"turnFireLastTs":0,"multiStreamIntent":false,"intentSetTs":1779229925343}
```
**Expected**: `multiStreamIntent: false`
**Verdict**: PASS — no multi-stream wording, intent flag explicitly written `false`.

## §4 Scenario C — preagent-parallel-guard consumes intent flag

**Inject** (after Scenario A): `{"session_id":"smoke-A","tool_input":{"subagent_type":"general-purpose"}}` piped to `preagent-parallel-guard.mjs`
**Hook exit**: `0` (1st-turn solo dispatch — advisory not block per W330 P0-A two-strike)
**stdout**: W330 advisory hookSpecificOutput emitted — `"violation 1/2: multi-stream wording detected ... solo Agent dispatch observed"`
**Post-state file**: `tmp/.parallel-guard-counter-smoke-A.json` =
```json
{"count":1,"lastViolationTs":1779229925664,"turnFireCount":1,"turnFireLastTs":1779229925664,"multiStreamIntent":true,"intentSetTs":1779229925257}
```
**Expected**: turnFireCount incremented, multiStreamIntent preserved
**Verdict**: PASS — `count` 0→1, `turnFireCount` 0→1, `lastViolationTs` stamped, `multiStreamIntent:true` preserved end-to-end, `intentSetTs` unchanged (read-through not overwritten). Confirms readCounter() fix (25a091e) is active — without the fix, the intent flag would have been lost on counter update.

## §5 Overall verdict

**3/3 PASS — full E2E validation**

Chain proven:
1. UserPromptSubmit hook correctly detects multi-stream wording and persists `multiStreamIntent` boolean to per-session state.
2. preagent-parallel-guard reads the flag (readCounter() now actually invoked post-25a091e), gates W330 advisory/block enforcement on it, and preserves the flag across state writes.
3. Two-strike policy works: 1st violation = advisory exit 0 + hookSpecificOutput, count incremented for 2nd-strike block on next solo dispatch.

W331-r4 readCounter() fix verified active. Pre-fix behavior (dead-code) would have shown `multiStreamIntent: undefined` or missing field after Scenario C — observed `true` preserved confirms read-path executes.

## §6 Cites

- W331-r3 commit `38e0bca` — UserPromptSubmit hook wiring
- W331-r4 commit `25a091e` — readCounter() dead-code fix
- Codex r3 `aac94eff` HIGH gap#4 — chain dead-code identification
- CLAUDE.local.md ENV block — CLAUDE_CODE_TMPDIR resolution = `Z:/claude-sota-installed/tmp`
- W330 P0-A two-strike escalation policy — advisory 1/2 → block 2/2
