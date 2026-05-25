# Wave-close runbook — Insights ritual (P1.2)

> **Wave**: W342-FULL-GAP-RESOLUTE Stream X4 §2 deliverable
> **Date**: 2026-05-20
> **Status**: Operator-facing process documentation
> **Trigger**: Invoke at every wave-close (after final verdict-ledger row written, before `git push`).

## Purpose

Make wave-close insights generation a deliberate, repeatable ritual instead of ad-hoc. Surfaces telemetry, ccusage, ctx-insight, and operator recap in one pass so the next wave begins with a calibrated context budget and a clean memory snapshot.

## Ritual sequence

Run these in order at the END of each wave (after VERDICT-LEDGER row landed, before commit/push):

1. **`/insights`** — generates a structured insights digest from the wave session (decisions, patterns, mishaps, next-wave carry-forwards). Per Anthropic Claude Code docs §insights. Output: persisted to `docs/architecture/W<N>-INSIGHTS.md` or operator-decided location.
2. **`/recap`** — operator-facing wave recap (TL;DR + scoreboard + decisions). Per Anthropic Claude Code `/recap` slash command. Output: console + log entry.
3. **`/context-mode:ctx-insight`** — opens browser dashboard with personal metrics (tool usage, parallel-ratio, error rate, project focus). Per context-mode plugin docs. Output: HTML dashboard at localhost.
4. **`mcp__ccusage__blocks`** — surface 5-hour billing-block snapshot with cost summary. Per ccusage MCP tool. Output: structured token/cost telemetry to inform next-wave budget.

## Carry-forward step

After the four-step ritual completes, the operator MUST:

- File any unresolved tasks/decisions as **explicit-carry-forward** rows in next-wave VERDICT-LEDGER (per `task-close-discipline` skill).
- Update T6 basic-memory with wave-close note via `mcp__basic-memory__write_note` (canonical-primary per W295).
- If 3+ waves dwell on a P0 item → trigger `ops-rhythm` escalation per CLAUDE.md.

## Invariants

- All four steps MUST run before `git push` of the wave-final commit.
- Skipping any step is permitted ONLY for trivial single-file-fix waves (operator-declared, recorded in commit message).
- Output of step 4 (`mcp__ccusage__blocks`) MUST be captured in wave-summary for next-wave context-budget calibration.

## Cite-anchors

- Anthropic Claude Code slash commands: `https://docs.anthropic.com/en/docs/claude-code/cli-reference`
- W341 Stream D §5 (ECC port spec)
- task-close-discipline skill: `.claude/skills/task-close-discipline/SKILL.md`
- ops-rhythm skill (3/5/8-wave dwell-threshold): CLAUDE.md L42 cite
- T6 basic-memory canonical-primary: `docs/architecture/W295-AUDIT-2026-05-18.md`

## Future integration

If a `closure-synthesis` skill is created in a future wave, this runbook content should be merged into `SKILL.md` §"Insights ritual" as a proper auto-firing skill. Until then this runbook is the canonical reference.
