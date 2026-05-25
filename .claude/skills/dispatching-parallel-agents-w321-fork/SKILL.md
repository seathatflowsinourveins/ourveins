---
name: dispatching-parallel-agents-w321-fork
description: Use when facing 2+ independent tasks requiring parallel agent dispatch — ADDS skeleton-first-write, context-budget hard-cap, mid-flight stream-error retry, position-swap audit, and subagent_type pre-flight validation. Vendor-fork of obra/superpowers:dispatching-parallel-agents@5.1.0 per cardinal-rule-4(b).
---

# Dispatching Parallel Agents (W321 Vendor-Fork)

> **Provenance**: Operator-curated vendor-fork of `superpowers:dispatching-parallel-agents@5.1.0` per CLAUDE.md cardinal-rule-4(b) (operator-curated path-gated via SKILL.md).
> Suffix `-w321-fork` disambiguates auto-fire from upstream skill so both can co-exist.
> Adds 5 Δ-patterns (Δ-DPA-1..5) absorbing W319-W321 failure-mode learnings.
> Upstream skill remains the canonical happy-path reference (`Identify Independent Domains → Focused Agent Tasks → Dispatch in Parallel → Review and Integrate`); this fork specializes for production-grade reliability when tasks involve file deliverables, large research, dual-review, or custom `subagent_type` values.
>
> **Authority cite**: `https://code.claude.com/docs/en/skills` (Anthropic Claude Code skills doc; SKILL.md is the documented surface for operator-curated skills).
> **`self_invented_count: 0` invariant**: vendor-fork is operator-curated per W316 addyosmani precedent (5 addyosmani skills accepted at `.claude/skills/<name>/SKILL.md`).

## Overview

Inherit all of `superpowers:dispatching-parallel-agents@5.1.0`. This fork augments the **dispatch** and **review** phases with 5 reliability patterns derived from this-runtime's W319-W321 empirical failure-mode evidence:

| Δ | Failure mode addressed | Empirical anchor |
|---|---|---|
| Δ-DPA-1 | Mid-flight context-exhaust with empty deliverable | W321 Stream A 184k-exhaust → 0-byte file |
| Δ-DPA-2 | Pre-flight context-budget exhaust silent-truncation | W321 Stream A; Anthropic blog 15× token-burn |
| Δ-DPA-3 | Mid-flight `stream-error` silently treated as PASS | W321 Stream D `stream-error` → orchestrator silent PASS |
| Δ-DPA-4 | Same-artifact dual-review prompt-position bias | sca-v9 §6 Phase-6 codex GPT-5.5 position-swap (W316-S7 5/5 stable) |
| Δ-DPA-5 | `subagent_type` typo silent-fallback to `general-purpose` | W319-A H3 hyphen-vs-underscore typo (29% silent-fallback over 1586-JSONL audit) |

## Δ-DPA-1: Skeleton-First-Write (mandatory for file-deliverable tasks)

When the agent task specifies a deliverable file path, the agent MUST:

1. As the **FIRST** tool call, `Write` a skeleton to the target path:
   - All `§N Section` headers present
   - `TBD` placeholders under each section
   - ≤30 LOC
2. Then proceed with research-phase tool calls.
3. Use `Edit` to progressively fill the skeleton — never accumulate findings in scratch and write-once at end.

**Why**: If the agent context-exhausts mid-research (>140k tokens), the orchestrator receives a navigable skeleton not a 0-byte file. The orchestrator can then retry with the partial structure or fail loudly with a clear diff.

**Anti-pattern (FORBIDDEN)**: do-all-research-then-write — empirically the W321 Stream A 184k-exhaust failure mode.

**Cite-anchors (3-org-distinct)**:
- `https://github.com/anthropics/claude-cookbooks/blob/main/patterns/agents/orchestrator_workers.ipynb` cell-2 (Anthropic PBC — empty-response detection)
- `https://docs.crewai.com/concepts/processes#hierarchical-process` (CrewAI Inc — `expected_output` schema mandate)
- `https://github.com/anthropics/claude-code/issues/22143` (community empirical evidence on parallel-agent context-exhaust; closed as dup of #16209)

## Δ-DPA-2: Context-Budget Hard-Cap

Each dispatched agent receives in its task prompt:

```
BUDGET: ≤15 tool calls AND ≤140k cumulative response tokens.
If you exceed 70% of either budget mid-task:
  1. STOP research immediately.
  2. WRITE whatever partial findings you have to deliverable file.
  3. RETURN summary with STATUS: BUDGET-EXHAUST-PARTIAL.
```

Orchestrator MUST size budgets per task — research-heavy gets higher caps; quick lookups get lower (defaults: research=15/140k, narrow=8/80k, repomix-heavy=25/200k).

**Why**: Prevents the silent 184k-exhaust observed W321 Stream A. Anthropic Multi-Agent Research blog explicitly notes multi-agent systems use ~15× tokens of single-agent chat — budget enforcement converts uncontrolled spend into deterministic spend.

**Cite-anchors (3-org-distinct)**:
- `https://github.com/microsoft/autogen` — Microsoft AutoGen `TokenUsageTermination` + `MaxMessageTermination` (combinable via `&` / `|` operators)
- `https://www.anthropic.com/research/built-multi-agent-research-system` (Anthropic PBC — 15× token-burn warning anchors budget-cap mandate)
- `https://rapidclaw.dev/blog/multi-agent-orchestration-patterns-2026` (Rapid Claw — independent practitioner anchor: "per-crew rate limits ... fan-out patterns are the #1 cause of runaway cost")

## Δ-DPA-3: Mid-Flight Stream-Error Retry-With-Checkpoint

When agent returns, orchestrator MUST detect failure modes:

```
if agent.final_message.length < 50:
    STATUS = "EMPTY-FINAL-MESSAGE"
elif agent.error_code == "stream-error":
    STATUS = "STREAM-ERROR"
elif "BUDGET-EXHAUST-PARTIAL" in agent.final_message:
    STATUS = "BUDGET-EXHAUST"
else:
    STATUS = "OK"
```

For all non-OK statuses, retry ONCE with the prefix:

```
PRIOR ATTEMPT FAILED MID-STREAM (status: {STATUS}).
Skip preamble.
WRITE deliverable file FIRST then summarize.
RESUME from checkpoint at: {deliverable_path}
Do NOT re-run already-completed tool calls (inspect skeleton + Read partial artifacts).
```

**Why**: W321 Stream D stream-errored; orchestrator did not detect; silent PASS. LangGraph's `Checkpointer` resume-from-state pattern: "When a graph node fails mid-execution, the `Checkpointer` stores 'pending writes' from any other nodes that completed successfully ... successfully completed nodes are not re-executed." Apply the same principle to per-agent retry.

**Cite-anchors (3-org-distinct)**:
- `https://github.com/anthropics/claude-cookbooks/blob/main/patterns/agents/orchestrator_workers.ipynb` cell-2 (Anthropic PBC — explicit retry pattern)
- `https://langchain-ai.github.io/langgraph/concepts/low_level/#send` + `https://langchain-ai.github.io/langgraph/concepts/persistence/` (LangChain AI — Checkpointer resume-from-state)
- `https://tianpan.co/blog/2026-04-23-mid-flight-steering-agent-redirect-without-restart` (Tian Pan independent practitioner — "correct work survives. You do not unwind seven tool calls because the eighth one was headed somewhere wrong")

## Δ-DPA-4: Position-Swap Cross-Agent Review

When 2+ agents review the SAME artifact (e.g., dual-codex review of one PR, dual-claude review of one design doc):

- 1st agent receives evidence in order `[E1, E2, E3, ...]`.
- 2nd agent MUST receive `[E_n, ..., E2, E1]` (reversed).
- If verdicts diverge under position-swap → position-bias confirmed → escalate to 3rd review with neutral framing.

**Why**: NIST AI 600-1 MEASURE-2.3 evaluation-soundness mandate; sca-v9 §6 Phase-6 already codifies for code review (5/5 tier-stable in W316-S7 codex audit).

**Cite-anchors (3-org-distinct)**:
- `https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.600-1.pdf` MEASURE-2.3 (NIST/US DoC — evaluation-soundness standard)
- `https://arxiv.org/abs/2306.05685` MT-Bench Zheng+ 2023 (UC Berkeley/Stanford/EPFL — foundational LLM-as-judge position-bias methodology)
- `https://arxiv.org/abs/2310.17631` JudgeLM Wang+ 2023 (Beihang University/Tencent — fine-tuned judges with explicit position-bias mitigation)

## Δ-DPA-5: Pre-Flight subagent_type Validation

Before any `Agent` tool call:

1. Look up `subagent_type` value against installed-plugin agent list at `.claude/plugins/installed_plugins.json` + per-plugin agents at `.claude/plugins/cache/<marketplace>/<plugin>/<version>/agents/*.md` front-matter `name:`.
2. If unknown name OR underscore-vs-hyphen mismatch (`team_debug` vs `team-debug`) OR marketplace-prefix typo, FAIL-LOUD with `WARN: subagent_type '<X>' not in allowlist; nearest matches: <fuzzy_top3(X)>`.
3. NEVER silently fallback to `general-purpose`.

**Why**: W319-A H3 empirical typo trap. CLAUDE.md L34 documents 29% silent-fallback rate over 1586-JSONL audit.

**Cite-anchors (3-org-distinct)**:
- `https://docs.anthropic.com/en/docs/claude-code/sub-agents` (Anthropic PBC — Agent tool fan-out semantics)
- `https://github.com/anthropics/claude-code/issues/25818` (Anthropic — "No distinction between 'completed' and 'crashed-but-left-transcript'")
- W319-orchestration-audit `docs/architecture/W319-ORCHESTRATION-AUDIT/STREAM-A-SYNTHESIS.md` H3 (operator-runtime empirical evidence; primary-parent distinct via wave-evidence channel)

## Integration with Upstream Skill

This fork DOES NOT replace `superpowers:dispatching-parallel-agents`. It runs as a SIDECAR:

- Upstream skill fires on the happy path (independent domains, no failures expected).
- This fork's Δ-patterns apply when dispatch involves: (a) file deliverables, (b) >5k token research, (c) same-artifact review, (d) custom `subagent_type` values.

## Companion patterns

- `parallel-dispatch-mandate` (operator-curated; W269 enforcement + F4/F5 + Δ-PDM-1/2/3)
- `superpowers:subagent-driven-development` (per-agent budget discipline)
- `superpowers:executing-plans` (checkpointed plan execution)
- `agent-teams:team-spawn` (multi-stream preset)

## Verification

After applying these Δ-patterns to a parallel-dispatch session:

1. **Δ-DPA-1**: Confirm each deliverable file has skeleton timestamp BEFORE first research tool call timestamp.
2. **Δ-DPA-2**: Confirm no agent JSONL has cumulative-response-tokens > 140k.
3. **Δ-DPA-3**: Confirm orchestrator audit-log records STATUS check for every agent return.
4. **Δ-DPA-4**: For dual-review sessions, confirm 2nd agent's evidence-order is reversed.
5. **Δ-DPA-5**: Confirm settings.json PreToolUse[Task] lint blocks unknown `subagent_type` values.

## References

- `https://code.claude.com/docs/en/skills` — Anthropic Claude Code skills doc (authority for vendor-fork at `.claude/skills/<name>/SKILL.md` path)
- `https://github.com/obra/superpowers/blob/main/skills/dispatching-parallel-agents/SKILL.md` — upstream canonical skill
- `https://docs.anthropic.com/en/docs/claude-code/sub-agents` — Agent tool semantics
- `https://www.anthropic.com/engineering/multi-agent-research-system` — Anthropic Multi-Agent Research System
- `https://github.com/anthropics/claude-cookbooks/blob/main/patterns/agents/orchestrator_workers.ipynb` — orchestrator-worker canonical reference (cell-2 empty-response handler)
- `https://github.com/anthropics/claude-code/issues/22143` — community context-exhaust empirical evidence
- `https://github.com/anthropics/claude-code/issues/25818` — community subagent-crash silent-pass empirical evidence
- `https://github.com/microsoft/autogen` — Microsoft AutoGen `TokenUsageTermination` + `MaxMessageTermination`
- `https://langchain-ai.github.io/langgraph/concepts/low_level/#send` — LangGraph `Send` API + `Checkpointer`
- `https://docs.crewai.com/concepts/processes#hierarchical-process` — CrewAI `expected_output` schema mandate
- `https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.600-1.pdf` — NIST AI 600-1 MEASURE-2.3 evaluation-soundness
- `https://arxiv.org/abs/2306.05685` — MT-Bench Zheng+ 2023 LLM-as-judge methodology
- `https://arxiv.org/abs/2310.17631` — JudgeLM Wang+ 2023 fine-tuned judge bias mitigation
- `https://tianpan.co/blog/2026-04-23-mid-flight-steering-agent-redirect-without-restart` — Tian Pan checkpoint-and-inject
- `https://rapidclaw.dev/blog/multi-agent-orchestration-patterns-2026` — Rapid Claw per-crew rate limits anchor
- CLAUDE.md L34 — parent-runtime parallel-dispatch mandate

## Provenance

- **Source proposal**: `docs/architecture/W321-OPEN-SOURCE-CUTOVER/skill-enhancements/dispatching-parallel-agents-PROPOSED.md` (W321 Stream P3 skill-enhancement; cite-line-anchored 3-org-distinct verification per W295 I1).
- **Apply wave**: W328 Stream-A SKILL-ABSORB-MEGA (2026-05-19).
- **Closure synthesis**: `docs/architecture/W328-SKILL-ABSORB-WAVE/W328-A-SYNTHESIS.md`.
