# W343 — Parallel-Guard Bypass-Marker Migration Rationale

> Wave W343 / branch `goal/W343`. Cite W329-R5 cond-(b) acceptance-record + W342-AUDIT §2 root-cause stack.

## What the marker was

`Z:/claude-sota-installed/.claude/state/parallel-guard-bypass.marker` — operator-set 0-byte sentinel file. Presence suppressed `tools/preagent-parallel-guard.mjs` binding `exit(2)` 2nd-violation gate per W329-R5 CR-5-exception condition-(b).

- **Created**: 2026-05-20 ~10:45 UTC (per `stat` mtime).
- **Authority**: CLAUDE.md cardinal-rule-5 corollary (W329-A + W331 r2 binding-gate + W331 r4 in-session-bypass-marker).
- **Recorded at**: `docs/architecture/W329-R5-CORROLLARY-PATCHC1/{ACCEPTANCE-RECORD-DRAFT.md, R5-COROLLARY-DETAIL.md}` (operator-sign-pending at time of W342 audit).

## Why W342 audit surfaced removal

W342 8-stream parallel deep-audit (Stream E1 + E2 + E7) converged on a 3-layer root-cause for SEV-1 `parallel_ratio = 0.0031` (denom 1963):

1. **Bypass-marker present** — binding `exit(2)` 2nd-violation gate structurally inert (this file).
2. **Intent-flag pathway DEAD-CODE** — `tools/parallel-guard-userpromptsubmit.mjs:26-31` writes to `parallel-guard-session-<sid>.json`; `tools/preagent-parallel-guard.mjs:218-219` reads from `.parallel-guard-counter-<sid>.json`. Two different files; entire W331-r3 P0.1 intent-flag pathway never fires. (E2 P0 confirmed by E7 Finding #2.)
3. **All guards `exit(0)` on failure** — per codex E7 Finding #3: 5 enumerated silent-fallback paths make every cardinal-rule-2 hook opt-in rather than fail-closed.

Removing the bypass-marker alone cannot fix the SEV-1; the intent-flag pathway and silent-fallback inversion (W343 P0.b + P0.d) are co-mandatory. But leaving the marker in place blocks measurement of whether (b) and (d) are landing — the marker masks the guard signal regardless of whether the guard works.

## Decision

Per W343 goal predicate P0.a: **"DELETE .claude/state/parallel-guard-bypass.marker OR migrate to dated .bypass-W342-rationale.md cite W329-R5 cond-(b)"**.

**Action taken**: migrate. This doc IS the dated rationale; the active marker is deleted as part of W343 P0.a commit. The W329-R5 cond-(b) acceptance-record (cite-anchored at `docs/architecture/W329-R5-CORROLLARY-PATCHC1/`) remains the authority for the original carve-out; this doc records the W343-time deprecation context.

## Re-instatement path (if operator later wants the bypass back)

The marker is a 0-byte sentinel — recreate via:

```powershell
New-Item -ItemType File Z:\claude-sota-installed\.claude\state\parallel-guard-bypass.marker
```

Or document a new dated rationale alongside.

The W331-r4 surgical in-session-bypass-marker design is preserved: `CLAUDE_PARALLEL_GUARD_DISABLE=1` env-var still suppresses the guard for a single session without persisting any sentinel.

## Verification post-removal

- `Test-Path Z:/claude-sota-installed/.claude/state/parallel-guard-bypass.marker` → False
- `node tools/parallel-ratio-telemetry.mjs` baseline 0.0031 (denom 1963) — record post-fix trajectory after P0.b + P0.d ship.
- Operator-sign on `docs/architecture/W343-SOTA-UNLEASH/OP-SIGN.md` row OS-7 ratifies the deletion.
