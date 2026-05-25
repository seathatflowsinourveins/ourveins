# W331-X4 Subagent-level parallel-dispatch mandate codification — PROPOSAL

> **Status**: PROPOSAL (NOT APPLIED) — operator authorization required before any skill edit
> **Finding ID**: W331-X4
> **Source**: SYNTHESIS.md §5 (P0.1 was prematurely marked RESOLVED in V2; demoted to ⏸ INPUT-READY in V3 absorb per codex round-1 R3 + I5)
> **Date**: 2026-05-19

## §1 The gap

The current `parallel-dispatch-mandate` skill (`.claude/skills/parallel-dispatch-mandate/SKILL.md`) codifies parent-orchestrator behavior:

> "Any user prompt where 2+ independent workstreams exist. Heuristic triggers:
>  - explicit 'Stream A', 'Stream B' enumeration
>  - 'in parallel', 'fan-out', 'parallel sweep'
>  - 'audit X across', 'review N candidates', 'research M sources'
>  - 2+ independent files / dimensions / repos named for investigation"
>
> "When the orchestrator dispatches subagents for >=2 of these streams: MUST issue 2+ Agent (or Task) tool_use blocks in a SINGLE assistant message."

The SUBAGENT-STOP block of `superpowers:using-superpowers` says:
> "If you were dispatched as a subagent to execute a specific task, skip this skill."

But the parallel-dispatch-mandate skill does NOT have a parallel SUBAGENT-CONTINUE clause that says: **"if you ARE a subagent and you yourself face 2+ independent sub-streams, the same mandate applies recursively to your dispatch."**

This is the W331-X4 codify-gap. Three concrete consequences:

1. **Subagent A** dispatched to handle "research X" might itself face 2+ independent sub-questions (e.g. "audit X across libraries L1+L2+L3") and silently fall back to serial dispatch — bypassing the mandate that the parent applied at depth-1.
2. **Agent-team leads** (`agent-teams:team-lead`) inherit the parent-orchestrator role at depth-2 but the current skill targets only depth-1 invocation.
3. **GOAL-W331 mandates parallel_ratio ≥0.7 per session** — measured across ALL Agent dispatches in JSONL, not just depth-1 — so silent-serial at depth-2+ degrades the ratio invisibly.

## §2 Proposed codify

### Option α — Add subagent-recursion clause to existing skill (minimal surface)

Insert into `.claude/skills/parallel-dispatch-mandate/SKILL.md` AFTER the "Mandatory behavior" block:

```markdown
## Subagent-recursion mandate (W331-X4)

This skill applies RECURSIVELY. If you ARE a subagent (dispatched via `Agent`/`Task` from a parent orchestrator) AND you yourself face 2+ independent workstreams:

1. The same mandate applies — issue 2+ `Agent`/`Task` calls in a single assistant message.
2. Solo serial dispatch is only acceptable when sub-streams have hard sequential dependencies — and the subagent MUST explicitly note "single-target dependent stream, parallel impossible".
3. Empty/whitespace `final_message` strip-test + retry-once-then-escalate ladder applies symmetrically at each recursion depth.
4. F4 (NO repomix-pack inside fork) + F5 (empty-response detection) apply at every depth.

The `SUBAGENT-STOP` block in `superpowers:using-superpowers` means "skip the using-superpowers skill loader" — it does NOT mean "skip every superpowers skill". Subagents continue to apply mandatory-behavior skills (TDD, debugging discipline, parallel-dispatch-mandate, F4/F5 hygiene) within their own work scope.

**Counter-pattern (FORBIDDEN)**: subagent receives "audit X across libraries L1+L2+L3" task → silently dispatches 3 serial `mcp__deepwiki__ask_question` calls or 3 serial `WebFetch` calls → returns serial-stitched result.

**SOTA pattern**: subagent receives the same task → dispatches 3 parallel `mcp__deepwiki__ask_question` calls in a single tool-use block OR 3 parallel `mcp__exa__web_search_exa` calls → returns parallel-merged result.

Cite-anchor: same Anthropic `claude-cookbooks @ 39a350b6 patterns/agents/prompts/research_lead_agent.md:135-137` `<use_parallel_tool_calls>` — the MUST-block applies to the dispatching entity at any depth.
```

**Diff stats**: +~25 LOC to existing SKILL.md (currently ~190 LOC); no other surface touched.

### Option β — Companion skill `parallel-dispatch-recursion` (separate surface)

Create new skill `.claude/skills/parallel-dispatch-recursion/SKILL.md` (~50 LOC) with the same content as Option α §2 but auto-fire description:

```yaml
---
name: parallel-dispatch-recursion
description: Use when invoked AS a subagent facing 2+ independent sub-streams. Mirrors parallel-dispatch-mandate at recursion depth-2+. Auto-fires on subagent invocation with multi-stream task descriptions.
---
```

**Pros**: doesn't bloat existing skill; clearer trigger surface for subagents.
**Cons**: skill-count creep; auto-fire description-match at subagent level less reliable.

### Option γ — CLAUDE.md L26 Cardinal-Rule strengthening

Edit `CLAUDE.md` L26 "Agent-team trigger" to add explicit recursion clause:

```markdown
**Agent-team trigger (W269 mandate, W312-D tightening, W320-B-2 cite-refresh, W331-X4 recursion clause)**:
... [existing text] ...
**Recursion**: this mandate applies AT EVERY DISPATCH DEPTH. Subagents that themselves face 2+ independent sub-streams MUST apply the same single-message parallel-dispatch discipline. Silent-serial at depth-2+ counts toward the parallel_ratio denominator as a violation.
```

**Pros**: cite-anchored to cardinal rule surface; highest-priority load.
**Cons**: edits CLAUDE.md (which we want to keep ≤50 LOC); CLAUDE.md L26 is already 8 lines of dense prose.

### Option δ — Defer codify; rely on emergent skill-fire convergence

Don't codify. Trust that the parallel-dispatch-mandate skill's auto-fire description matches subagent prompts containing multi-stream language.

**Risk**: empirical W325-A F1 SEV-1 measured parallel_ratio=0.0036 across all-depth dispatches — the assumption that auto-fire convergence works is REFUTED by telemetry. δ is the status quo and known to fail.

## §3 Recommendation

**α (in-place addition to existing skill)** — minimal surface, cite-anchored, auto-fires via existing skill loader, no CLAUDE.md bloat, no skill-count creep.

Operator-decision-row:

| Option | Surface edited | LOC delta | Reload required? |
|---|---|---|---|
| α | parallel-dispatch-mandate/SKILL.md | +~25 | `/reload-skills` after edit |
| β | new parallel-dispatch-recursion/SKILL.md | +~50 (new file) | `/reload-skills` |
| γ | CLAUDE.md L26 | +~2 LOC | session-restart for cardinal-rule reload |
| δ | none | 0 | n/a (status quo) |

**Default-recommendation**: α.

## §4 Verification plan (post-apply)

1. After edit, run `tools/parallel-ratio-telemetry.mjs` to baseline parallel_ratio across last 30d.
2. Spawn an Agent test-case: dispatch single subagent with prompt "audit X across L1+L2+L3" → verify subagent dispatches parallel sub-calls (not serial).
3. Re-run telemetry after 1 wave to confirm depth-2+ parallel_ratio rises above floor.
4. Add finding to W332 if parallel_ratio still <0.30 after codify (indicates root-cause is parser/skill-loader bug, not codify gap).

## §5 STOP-gate compliance

| CR | Concern | Compliance |
|---|---|---|
| CR-1 | trusted source | ✅ skill edit operator-curated (cardinal-rule 4 allows operator-curated path-gated SKILL.md per W299-A reversal W308 2026-05-19) |
| CR-2 | no self-invented hook bodies | ✅ no hook edit |
| CR-3 | sub-agent invocation | ✅ this IS a sub-agent invocation discipline clarification, cite-anchored to Anthropic cookbook |
| CR-4 | project behavior in CLAUDE.md + settings.json | ✅ option α touches skill not CLAUDE.md (preserves 50-LOC discipline); option γ would edit CLAUDE.md L26 with +2 LOC delta (within budget) |
| CR-5 | safety boundaries via CC permissions | ✅ no custom guard script |

## §6 Rollback

Single `git checkout HEAD -- .claude/skills/parallel-dispatch-mandate/SKILL.md` → restores pre-edit state. No CLAUDE.md change in α (no rollback needed there). For γ: `git checkout HEAD -- CLAUDE.md`.
