# W320-B-2 — CLAUDE.md SHA Cite-Refresh Batch (SHIPPED)

**Stream**: W320 Stream B Task 2
**Author**: claude-opus-4-7 (W320 Stream B agent)
**Date**: 2026-05-19
**Status**: SHIPPED (2 cite-refreshes applied to CLAUDE.md head matter; status blocks immutable per W316 rolling-3 retention)

## Scope guardrail

Per W320 Stream B prompt: refresh ACTIVE cites only (head matter L1-L46). Do NOT modify historical status blocks (`## Status (...)` sections L48+) — they are append-only audit-trail per CLAUDE.md W317 Stream-A rolling-3 retention policy. Stream A handles W317-status-block L34 phantom-SHA fixes; this stream owns L13 (W269 cite) + L30 (skill count).

## Cite-refresh inventory

### Edit #1 — L13 W269 mandate cite anchor improvement

**Source**: W319 Stream A finding `STREAM-A-COOKBOOK-INGEST.md:152` + `STREAM-A-SYNTHESIS.md:94,153` + `W319-SYNTHESIS.md:36,112` (M4 MED-4 priority P1).

**Rationale**: Current L13 W269 mandate cites `https://code.claude.com/docs/en/headless + agent-teams/sub-agents docs` (generic doc-link). Anthropic's `claude-cookbooks` repo at `patterns/agents/prompts/research_lead_agent.md:135-137` contains the **canonical `<use_parallel_tool_calls>` MUST-block** — the exact prose Anthropic uses internally for orchestrator-research-lead agents.

**Cite verification** (W320 Stream B):

```
$ cd Z:/repos/deps/claude-cookbooks && git rev-parse HEAD
2eed173a533a690eb70ab324614ce5350776a23a

$ awk 'NR>=135 && NR<=137' patterns/agents/prompts/research_lead_agent.md
<use_parallel_tool_calls>
For maximum efficiency, whenever you need to perform multiple independent operations,
invoke all relevant tools simultaneously rather than sequentially.
[...] You MUST use parallel tool calls for creating multiple subagents (typically running
3 subagents at the same time) at the start of the research, unless it is a straightforward query.
[...]
</use_parallel_tool_calls>
```

**Cite anchor verified**: `https://github.com/anthropics/claude-cookbooks/blob/2eed173a/patterns/agents/prompts/research_lead_agent.md#L135-L137`.

**Edit**: L13 `Agent-team trigger` bullet — append parenthetical SOTA-anchor cite mid-sentence:

- BEFORE: `... fan-out via the Agent tool + superpowers:dispatching-parallel-agents pattern (MUST be 2+ Agent calls in 1 assistant message ...`
- AFTER: `... fan-out via the Agent tool + superpowers:dispatching-parallel-agents pattern (cite-anchored to Anthropic claude-cookbooks @ 2eed173a patterns/agents/prompts/research_lead_agent.md:135-137 use_parallel_tool_calls MUST-block; MUST be 2+ Agent calls in 1 assistant message ...`

Net char delta: **+128 chars** — within preload budget (CLAUDE.md head matter L1-L46 currently ~10KB head + ~22KB status blocks; ≤50 LOC body invariant unaffected).

### Edit #2 — L30 local operator-curated skills count refresh

**Source**: W320 Stream B Task 1 ship — `mattpocock/skills` vendor-fork of `handoff` + `review` adds 2 to the local skill count.

**Rationale**: L30 currently reads `× 31`; after W320 Stream B Task 1 lands the count becomes `× 33`. The L30 cite already enumerates the `mattpocock-vendor-fork-4` set (grill-with-docs + tdd + caveman + diagnose); W320 expands this to **vendor-fork-6** (adds handoff + review).

**Edit**: L30 `Local operator-curated skills` bullet — bump count + extend the mattpocock-vendor-fork enumeration:

- BEFORE: `... × 31 (mem-recall, ..., mattpocock-vendor-fork-4: grill-with-docs + tdd + caveman + diagnose, ...)`
- AFTER: `... × 33 (mem-recall, ..., mattpocock-vendor-fork-6: grill-with-docs + tdd + caveman + diagnose + handoff + review @ 67bce91c80cd 2026-05-19 via W320 Stream B, ...)`

Net char delta: **+72 chars** — preload budget unaffected.

## Edits NOT made (scope-out)

Per Stream B prompt + W317-status-block-immutability policy:

| Edit candidate | Owner | Scope-out reason |
|---|---|---|
| L34 `Harness wired` plugin/marketplace count phantom-SHA refresh | Stream A | Stream B prompt explicitly states "Stream A handles CLAUDE.md L34 phantom SHA". |
| Status block L48+ historical mentions of count drift | NONE | Immutable audit trail. |
| Status block W316-R2 closure ECC SHA `841beea` | NONE | Historical; W317 already noted upstream HEAD advanced. |

## Cardinal-rule compliance check

| Rule | Status |
|---|---|
| R1-R5 | ✓ HOLD — no install/hook/subagent/rule/sandbox changes |
| `self_invented_count: 0` | ✓ HOLD — refreshed cites point to verified upstream content |
| CLAUDE.md body ≤50 LOC | ✓ HOLD — both edits modify in-place existing lines L13 + L30; no new lines |
| Cite-freshness | ✓ FRESH — `claude-cookbooks @ 2eed173a` verified by `git rev-parse HEAD`; mattpocock @ `67bce91c80cd` verified W320 reconnaissance |

## File operations summary

| Operation | Path | Lines touched |
|---|---|---|
| Edit | `Z:/claude-sota-installed/CLAUDE.md` | L13 (W269 mandate, +128 chars) |
| Edit | `Z:/claude-sota-installed/CLAUDE.md` | L30 (skill count, +72 chars) |

## W320 forward-AIs

| ID | Priority | Action | Owner |
|---|---|---|---|
| W320-B-2.1 | P2 | If W321+ wave further expands the mattpocock vendor-fork (e.g. adds `grill-me` or `caveman` variants from `productivity/`), update L30 `vendor-fork-6` → `vendor-fork-N`. | next-wave |
| W320-B-2.2 | P3 | Consider promoting the `claude-cookbooks @ 2eed173a` reference to a top-level pointer in `## Pointers` section (currently only research_lead_agent.md cited; cookbook contains other SOTA prompt patterns). | operator |
