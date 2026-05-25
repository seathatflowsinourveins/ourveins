# H — ECC_DISABLED_HOOKS Rationale (W325-H HIGH-G16 closure)

**Wave**: W326-H. **Date**: 2026-05-19.
**Cite**: `.claude/settings.json:7` env block `ECC_DISABLED_HOOKS` (8-hook list).
**Context-cites**: W316-S6 codex APPROVE on hook-profile=standard; W325-H G16 finding.

## 8 Disabled Hooks + Per-Hook Rationale

| # | Hook ID | Disabled-Reason |
|---|---|---|
| 1 | `pre:edit-write:gateguard-fact-force` | Self-invent risk per cardinal-rule-2; gateguard-fact-force enforces project-owned fact assertions which conflict with the upstream-only CCBP policy. **W316-S6 codex-ratified disable**. |
| 2 | `post:edit:design-quality-check` | Synchronous design-lint on every Edit/Write creates 200-500ms hot-path latency; net negative on multi-stream parallel work (4 streams × 50 Edits = ~120s aggregate cost). Async equivalent runs at session-end via `superpowers:verification-before-completion`. |
| 3 | `pre:observe:continuous-learning` | Outbound telemetry to ECC analytics endpoint; conflicts with project's local-first-no-egress posture (R5 sandbox/observability principle). |
| 4 | `post:observe:continuous-learning` | Symmetric pair to #3; same telemetry-egress concern. |
| 5 | `post:session-activity-tracker` | Duplicates langfuse `:3000` session telemetry already captured via T5 (Langfuse v3.170.0). Avoids double-counting + double-cost. |
| 6 | `stop:evaluate-session` | Conflicts with codex GPT-5.5 Stop-hook cross-model gate (`openai-codex/1.0.4/hooks/hooks.json:24-37`); the canonical session-end evaluator is codex-review, not ECC self-eval. |
| 7 | `stop:cost-tracker` | Duplicates `mcp__ccusage__session` + `Z:\claude-sota-installed-state` JSONL cost accounting. |
| 8 | `stop:desktop-notify` | OS-level toast notifications inappropriate for headless CI/loop runs (`/loop` cron + `claude --bg` background sessions). |

## Cardinal-Rule Compliance

- **R2 (hooks)**: ECC ships these hooks upstream; disabling them is a configuration choice per `ECC_DISABLED_HOOKS` env contract — NOT a self-invent (cardinal-rule-2 compliant). The disable list is operator-curated, not a project-authored hook body.
- **R5 (safety)**: hooks #3/#4 disable is a SAFETY action (prevents outbound telemetry), aligning with W316-S6 ratification.

## Re-Enable Procedure

To re-enable any hook: edit `.claude/settings.json:7` `ECC_DISABLED_HOOKS` (CSV format) and remove the hook-ID. NO restart needed (env evaluates per-hook-fire). W325-H P-H6 recommends re-enabling #7 (cost-tracker) and #6 (evaluate-session) IF the codex-review Stop-hook gate is decommissioned — currently it is NOT, so these stay disabled.

## W326-H Status

CARRY-FORWARD G16 HIGH → CLOSED-AS-DOCUMENTED. Rationale is now CLAUDE-readable. Operator decision (re-enable cost-tracker/evaluate-session) deferred to W327+ pending Stop-hook gate retention policy.
