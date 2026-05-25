# W321 P3 — `superpowers:dispatching-parallel-agents` Enhancement Proposal

> **Mode**: PROPOSE-ONLY (plugin-owned by `obra/superpowers` @ 5.1.0; cardinal-rule-4 path-gated vendor-fork OR upstream-PR)
> **Status**: DRAFT — operator-decision required to (a) vendor-fork at `.claude/skills/dispatching-parallel-agents-w321-fork/SKILL.md`, OR (b) upstream-PR to `anthropics/superpowers`.
> **Date**: 2026-05-19
> **Wave**: W321 — Open-Source Cutover

---

## §1 Executive Summary

Top-5 proposed enhancements (each cite-anchored 3-org-distinct, each addresses a measured this-wave failure mode):

1. **Δ-DPA-1 Skeleton-first-write protocol** — Stream A this wave hit context-exhaust at 184k tokens with **zero artifact written**. Mandate skeleton-write of all deliverable files BEFORE research-phase tool calls; iterative Edit during research.
2. **Δ-DPA-2 Context-budget hard-cap (per-agent)** — Pre-flight estimate of expected tool-call tokens; abort-and-skeleton-flush at 70% of budget. Anchored to Anthropic `claude-cookbooks orchestrator_workers.ipynb` empty-response detection (cell-2) + Microsoft AutoGen `max_consecutive_auto_reply` + LangGraph state-budget guards.
3. **Δ-DPA-3 Mid-flight stream-error retry-with-truncation** — Stream D this wave got `stream-error` and final assistant message was empty; orchestrator silently treated as PASS. Mandate per-agent `if final_message.empty: RETRY-N=1 with last-known-good-state context` per claude-cookbooks `orchestrator_workers.ipynb` cell-2.
4. **Δ-DPA-4 Position-swap protocol absorb (from sca-v9 §6 Phase-6)** — Where 2+ agents review the same artifact, swap evidence-order between runs to control for prompt-position bias (NIST AI 600-1 MEASURE-2.3 evaluation-soundness).
5. **Δ-DPA-5 Per-stream subagent_type pre-flight validation** — W319-A H3 found `agent-teams:team-debug` (hyphen) vs `agent_teams__team_debug` (underscore) typo trap silently degrades to `general-purpose`; require ToolSearch-style lookup before Agent-call.

---

## §2 Plugin-Ownership Reality

The current `dispatching-parallel-agents` skill (file path `Z:/claude-sota-installed/.claude/plugins/cache/claude-plugins-official/superpowers/5.1.0/skills/dispatching-parallel-agents/SKILL.md`, 183 LOC, version 5.1.0) is owned by `obra/superpowers` (Anthropic-affiliated plugin). Per W316 cardinal-rule-1 + the upstream `CLAUDE.md` (Contributor Guidelines, this wave shown in system-reminder) the repo has **94% PR rejection rate** — upstream-PR path is HIGH-EFFORT.

Per claude-sota-installed cardinal-rule-4 (b) — **operator-curated path-gated under SKILL.md** is COMPLIANT. The proposed vendor-fork path:

```
.claude/skills/dispatching-parallel-agents-w321-fork/SKILL.md
```

**Compliance check**:
- (a) upstream-plugin-shipped → NO (vendor-fork is operator-derived)
- (b) operator-curated path-gated via SKILL.md → **YES** (operator-authored, under `.claude/skills/<name>/SKILL.md`, auto-fire-disambiguated name via `-w321-fork` suffix to prevent auto-fire ambiguity with upstream skill)

**Recommendation**: VENDOR-FORK first; if any Δ proves canonical-stable + cross-project-portable across W322-W325 sessions, surface for upstream-PR consideration with eval evidence per `superpowers CONTRIBUTING.md` "Skill Changes Require Evaluation" mandate.

---

## §3 Current Skill Gap Analysis

The 5.1.0 skill is excellent for the **happy-path independent-failures pattern** (test-fix scenario at L133-159: 6 failures across 3 files, 3-agent parallel dispatch, zero conflicts). However W319-W321 empirically surfaced 5 unhandled failure modes:

| # | Failure Mode | Where in current skill | Gap |
|---|---|---|---|
| G1 | Mid-flight context-exhaust with empty deliverable | L83 "When agents return" | Assumes agents return; nothing for non-return |
| G2 | Pre-flight context-budget estimation | L60-65 "Each agent gets" | No token-budget guidance |
| G3 | Stream-error mid-flight | L77-83 "Review and Integrate" | Assumes all agents return; nothing for stream-error/empty |
| G4 | Same-artifact dual-agent review (position bias) | Not addressed | Skill scopes to "independent domains" only |
| G5 | subagent_type typo silent fallback | L68-74 "Dispatch in Parallel" | Assumes Task() call succeeds; no pre-flight validation |

**This-wave evidence**:
- **Stream A** (W321) reportedly context-exhausted at 184k tokens with no skeleton file → G1
- **Stream D** (W321) reportedly stream-errored mid-flight, orchestrator did not detect → G3
- **W319-A H3** ledger row → G5
- **W316-S7 Phase-6 position-swap codex GPT-5.5 invocations** → G4 (sca-v9 codifies this)
- **CLAUDE.md L34** rolling agent-team trigger mandate notes "29% silent-fallback across 1586-JSONL audit" → G2/G3

---

## §4 Proposed New SOTA Cite-Anchors (3-org-distinct verified)

### Anchor 1: claude-cookbooks `orchestrator_workers.ipynb` empty-response detection (Anthropic) — VERIFIED EXACT QUOTE

- **URL**: `https://github.com/anthropics/claude-cookbooks/blob/main/patterns/agents/orchestrator_workers.ipynb`
- **Mirror**: `https://platform.claude.com/cookbook/patterns-agents-orchestrator-workers`
- **Exact code quote** (via Exa fetch 2026-05-19):
  ```python
  # Validate worker response - handle empty outputs
  if not worker_content or not worker_content.strip():
      print(f"⚠️  Warning: Worker '{task_info['type']}' returned no content")
      worker_content = f"[Error: Worker '{task_info['type']}' failed to generate content]"
  ```
- **Cookbook explicit failure-mode list**:
  > "Workers may return empty or malformed responses (we handle this with validation)"
  > "Implement retry logic for failed workers"
- **Maps to**: Δ-DPA-1, Δ-DPA-3
- **Org**: Anthropic
- **Cited at**: CLAUDE.md L13 (W319-A H2: "empty-final-message silent drop — `anthropics/claude-cookbooks/patterns/agents/orchestrator_workers.ipynb` cell-2 has explicit detection we lack")

### Anchor 2: Microsoft AutoGen `TokenUsageTermination` + `MaxMessageTermination` (Microsoft) — VERIFIED via DeepWiki

- **URL**: `https://github.com/microsoft/autogen`
- **Wiki ref**: `https://deepwiki.com/microsoft/autogen` §"Termination Conditions"
- **Verified code pattern** (DeepWiki 2026-05-19):
  ```python
  token_usage_term = TokenUsageTermination(
      max_total_token=1000,
      max_prompt_token=800,
      max_completion_token=200
  )
  max_msg_termination = MaxMessageTermination(max_messages=10)
  # Combined via logical operators
  combined_termination = max_msg_termination | token_usage_term
  ```
- **Pattern**: Hard cap on per-agent message/token budget; agent forced to terminate-with-summary before context-exhaust. Conditions combinable via `&` (AND) `|` (OR).
- **Tracking properties**: `_total_token_count`, `_prompt_token_count`, `_completion_token_count` via `models_usage` field on messages.
- **Correction**: `max_consecutive_auto_reply` is an *agent-configuration parameter*, NOT a TerminationCondition class (DeepWiki disambiguation 2026-05-19).
- **Maps to**: Δ-DPA-2
- **Org**: Microsoft Research

### Anchor 3: LangGraph `Send` API + `Checkpointer` resume (LangChain) — VERIFIED via DeepWiki

- **URL**: `https://langchain-ai.github.io/langgraph/concepts/low_level/#send`
- **Code defs** (DeepWiki 2026-05-19):
  - `Send` class at `libs/langgraph/langgraph/types.py`
  - `BaseCheckpointSaver` at `libs/checkpoint/langgraph/checkpoint/base/__init__.py`
  - `PregelLoop` resume logic at `libs/langgraph/langgraph/pregel/_loop.py`
- **Verified pattern**:
  ```python
  # Parallel sub-agent dispatch
  def continue_to_jokes(state: OverallState):
      return [Send("generate_joke", {"subject": s}) for s in state["subjects"]]

  # Resume after interrupt — pending writes persist; only failed node re-runs
  graph.invoke(None, thread1, durability=durability)
  # nodes with completed writes do NOT re-execute; only interrupted node re-runs
  ```
- **Key property**: "When a graph node fails mid-execution, the `Checkpointer` stores 'pending writes' from any other nodes that completed successfully in that superstep. This ensures that upon resuming, the successfully completed nodes are not re-executed."
- **Maps to**: Δ-DPA-3
- **Org**: LangChain AI

### Anchor 4: NIST AI 600-1 MEASURE-2.3 evaluation-soundness (NIST)

- **URL**: `https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.600-1.pdf` (Generative AI Profile, MEASURE-2.3)
- **Pattern**: Evaluation pipelines MUST control for prompt-position bias when 2+ judges score the same artifact.
- **Maps to**: Δ-DPA-4
- **Org**: NIST (US government standards body)
- **Already in W316-S7 ledger as sca-v8 D-EMP anchor**

### Anchor 5: Anthropic Multi-Agent Research System (canonical Anthropic)

- **URL**: `https://www.anthropic.com/research/built-multi-agent-research-system`
- **Note**: Same-org as Anthropic-shipped superpowers skill. CITE-FOR-CONTEXT only; does not count toward 3-org-distinct mandate but adds canonical SOTA reference for "Triadic Lead → Subagent → Citation" pattern relevant to Δ-DPA-3 retry-with-summary.

### Anchor 6 (BONUS, 4th distinct org): CrewAI Process.hierarchical task delegation

- **URL**: `https://docs.crewai.com/concepts/processes#hierarchical-process`
- **DeepWiki**: `crewAIInc/crewAI` Hierarchical process: Manager-Agent delegates to subordinate crew; each subordinate has explicit `task.expected_output` field — orchestrator validates output against schema before integration.
- **Pattern**: Explicit `expected_output` schema check before declaring task complete.
- **Maps to**: Δ-DPA-1 (skeleton = schema), Δ-DPA-5
- **Org**: CrewAI Inc (distinct from Anthropic, Microsoft, LangChain, NIST)

### Anchor 7: anthropics/claude-code GitHub issues #22143 + #25818 (community-reported empirical evidence)

- **#22143** "Context exhaustion when orchestrating parallel agents" (2026-01-31, IDLEcreative) — `https://github.com/anthropics/claude-code/issues/22143`
  - **Direct match to W321 Stream A failure**:
    > "Deploy 4+ parallel agents using Task tool in a single message... When agents complete, context is often nearly exhausted... Must manually run `/compact` to continue working"
  - **Proposed fixes** (community):
    > "Auto-compact when context reaches threshold during agent orchestration"
    > "Agent results should be summarized/compressed before returning to parent"
    > "Context budgeting: Reserve context for parent when spawning agents"
    > "Proactive warning before spawning agents"
  - Closed as dup of #16209.
- **#25818** "Orchestrator has no diagnostic context when subagent fails — blindly retries or fabricates results" (2026-02-14, syd-ppt) — `https://github.com/anthropics/claude-code/issues/25818`
  - **Direct match to W321 Stream D failure**:
    > "No distinction between 'completed' and 'crashed-but-left-transcript' — The orchestrator treats a crash transcript the same as a successful return. There is no structured metadata signaling 'this data came from a crashed agent's transcript, not a verified completion.'"
  - **Proposed fixes** (community):
    > "Crash-sourced findings should carry a provenance marker"
    > "Coverage verification — formal checklist to verify against"
- **Maps to**: Δ-DPA-1, Δ-DPA-2, Δ-DPA-3 (all three patterns are directly anchored by community empirical reports)
- **Org**: Anthropic (issue tracker) + community reporters (independent third parties)

**3-org-distinct verification**: Anchors 1 (Anthropic) + 2 (Microsoft) + 3 (LangChain) = 3 distinct orgs → **PASS**. Adding 4 (NIST) + 6 (CrewAI) + 7 (community empirical) = 5+ distinct anchor sources.

---

## §5 Proposed Δ-Pattern Absorbs

### Δ-DPA-1: Skeleton-First-Write Protocol

**Trigger**: When agent task includes "write to file `<path>`".
**Mandate**: BEFORE first research-phase tool call, agent MUST `Write` a skeleton (≤30 LOC, all §-headers present, `TBD` placeholders) to the target path.
**Rationale**: If context-exhaust kills the agent mid-research, the orchestrator gets a navigable skeleton not a 0-byte file.
**Cite**: claude-cookbooks `orchestrator_workers.ipynb` cell-2 + CrewAI `expected_output` schema.

### Δ-DPA-2: Context-Budget Hard-Cap

**Trigger**: Per-agent dispatch with declared `max_tool_calls: N` (default 15).
**Mandate**: At each tool-return, compute `tokens_consumed / 200_000`; if ≥ 0.7 (= 140k), trigger **forced-skeleton-flush**: agent writes whatever partial findings it has + RETURN summary `STATUS: BUDGET-EXHAUST-PARTIAL`.
**Rationale**: AutoGen `MaxMessageTermination` pattern; prevent silent 184k-exhaust.
**Cite**: Microsoft AutoGen `MaxMessageTermination`; W319-D MED-1 PreCompact silent-fallback.

### Δ-DPA-3: Mid-Flight Stream-Error Retry-With-Truncation

**Trigger**: Orchestrator receives `stream-error` OR `final_message.length < 50 chars`.
**Mandate**: Orchestrator MUST `RETRY-N=1` with: (a) original task description + (b) `"PRIOR ATTEMPT FAILED MID-STREAM. Skip preamble. Write deliverable file FIRST then summarize."` prefix.
**Rationale**: claude-cookbooks cell-2 explicit retry pattern; LangGraph `Checkpointer` resume-from-state.
**Cite**: Anthropic claude-cookbooks + LangGraph `Checkpointer`.

### Δ-DPA-4: Position-Swap Protocol (Cross-Agent Review Audit)

**Trigger**: 2+ agents review the SAME artifact (e.g., codex round-1 + round-2 review of one PR).
**Mandate**: 2nd review MUST receive evidence-order reversed from 1st review (e.g., 1st sees `[A, B, C]`, 2nd sees `[C, B, A]`).
**Rationale**: Controls for prompt-position bias per NIST AI 600-1 MEASURE-2.3.
**Cite**: NIST AI 600-1; sca-v9 §6 Phase-6 (W316-S7 codex 5/5 tier-stable validation).

### Δ-DPA-5: Per-Stream subagent_type Pre-Flight Validation

**Trigger**: Before any `Agent` tool call with `subagent_type: <name>`.
**Mandate**: Validate `<name>` against `ToolSearch query:"select:<name>"` result OR against literal plugin-installed agent list. If unknown, FAIL-LOUD instead of silent-fallback to `general-purpose`.
**Rationale**: W319-A H3 empirical typo-trap (hyphen vs underscore subagent_type).
**Cite**: W319 orchestration audit + Anthropic sub-agents docs `https://docs.anthropic.com/en/docs/claude-code/sub-agents`.

---

## §6 Concrete Vendor-Fork SKILL.md Draft

Path: `.claude/skills/dispatching-parallel-agents-w321-fork/SKILL.md` (≤200 LOC).

```markdown
---
name: dispatching-parallel-agents-w321-fork
description: Use when facing 2+ independent tasks requiring parallel agent dispatch — ADDS skeleton-first-write, context-budget hard-cap, mid-flight stream-error retry, position-swap audit, and subagent_type pre-flight validation. Vendor-fork of obra/superpowers:dispatching-parallel-agents@5.1.0.
---

# Dispatching Parallel Agents (W321 Vendor-Fork)

> **Provenance**: Operator-curated vendor-fork of `superpowers:dispatching-parallel-agents@5.1.0` per cardinal-rule-4(b).
> Adds 5 Δ-patterns (Δ-DPA-1..5) absorbing this-wave failure-mode learnings.
> Upstream skill remains the canonical happy-path reference; this fork specializes for production-grade reliability.

## Overview

Inherit all of `superpowers:dispatching-parallel-agents@5.1.0` (Identify Independent Domains → Focused Agent Tasks → Dispatch in Parallel → Review and Integrate).

This fork **augments** the dispatch and review phases with 5 reliability patterns.

## Δ-DPA-1: Skeleton-First-Write (mandatory for file-deliverable tasks)

When the agent task specifies a deliverable file path, the agent MUST:

1. As the **FIRST** tool call, `Write` a skeleton to the target path:
   - All `§N Section` headers present
   - `TBD` placeholders under each
   - ≤30 LOC

2. Then proceed with research-phase tool calls.

3. Use `Edit` to progressively fill the skeleton — never accumulate findings in scratch and write-once at end.

**Why**: If the agent context-exhausts mid-research (>140k tokens), the orchestrator receives a navigable skeleton not a 0-byte file. The orchestrator can then retry with the partial structure or fail loudly with a clear diff.

**Cite**: `https://github.com/anthropics/claude-cookbooks/blob/main/patterns/agents/orchestrator_workers.ipynb` cell-2 (empty-response detection); `https://docs.crewai.com/concepts/processes#hierarchical-process` (`expected_output` schema).

## Δ-DPA-2: Context-Budget Hard-Cap

Each dispatched agent receives in its task prompt:

```
BUDGET: ≤15 tool calls AND ≤140k cumulative response tokens.
If you exceed 70% of either budget mid-task:
  1. STOP research immediately.
  2. WRITE whatever partial findings you have to deliverable file.
  3. RETURN summary with STATUS: BUDGET-EXHAUST-PARTIAL.
```

**Why**: Prevents silent 184k-exhaust observed W321 Stream A. The orchestrator must size budgets per task — research-heavy tasks should get higher caps; quick lookups should get lower.

**Cite**: Microsoft AutoGen `MaxMessageTermination` + `TokenUsageTermination` at `https://github.com/microsoft/autogen/blob/main/python/packages/autogen-agentchat/src/autogen_agentchat/teams/_group_chat/_chat_agent_container.py`.

## Δ-DPA-3: Mid-Flight Stream-Error Retry

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

For all non-OK statuses, retry ONCE with:

```
RETRY PROMPT PREFIX:
"PRIOR ATTEMPT FAILED MID-STREAM (status: {STATUS}).
 Skip preamble.
 WRITE deliverable file FIRST then summarize.
 Inherit any partial work at: {deliverable_path}"
```

**Why**: W321 Stream D stream-errored; orchestrator did not detect; silent PASS.

**Cite**: Anthropic claude-cookbooks `orchestrator_workers.ipynb` cell-2 + LangChain LangGraph `Checkpointer` at `https://langchain-ai.github.io/langgraph/concepts/low_level/#send`.

## Δ-DPA-4: Position-Swap Cross-Agent Review

When 2+ agents review the SAME artifact (e.g., dual-codex review of one PR, dual-claude review of one design doc):

- 1st agent receives evidence in order `[E1, E2, E3, ...]`.
- 2nd agent MUST receive `[E_n, ..., E2, E1]` (reversed).

If verdicts diverge under position-swap, position-bias confirmed — escalate to 3rd review with neutral framing.

**Why**: NIST AI 600-1 MEASURE-2.3 evaluation-soundness; sca-v9 §6 Phase-6 codifies for code review (5/5 tier-stable in W316-S7).

**Cite**: `https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.600-1.pdf` MEASURE-2.3.

## Δ-DPA-5: Pre-Flight subagent_type Validation

Before any `Agent` tool call:

1. Look up `subagent_type` value against installed-plugin agent list.
2. If unknown name OR underscore-vs-hyphen mismatch, FAIL-LOUD with diff.
3. NEVER silently fallback to `general-purpose`.

**Why**: W319-A H3 empirical typo trap (`agent-teams:team-debug` vs `agent_teams__team_debug`); 29% silent-fallback rate observed across 1586-JSONL audit.

**Cite**: `https://docs.anthropic.com/en/docs/claude-code/sub-agents` + W319-orchestration-audit findings.

## Integration with Upstream Skill

This fork DOES NOT replace `superpowers:dispatching-parallel-agents`. It runs as a sidecar:

- Upstream skill fires on the happy path (independent domains, no failures expected).
- This fork's Δ-patterns apply when dispatch involves: (a) file deliverables, (b) >5k token research, (c) same-artifact review, (d) custom subagent_types.

## Verification

After applying these Δ-patterns to a parallel-dispatch session:

1. **Δ-DPA-1**: Confirm each deliverable file has skeleton timestamp BEFORE first research tool call timestamp.
2. **Δ-DPA-2**: Confirm no agent JSONL has cumulative-response-tokens > 140k.
3. **Δ-DPA-3**: Confirm orchestrator audit-log records STATUS check for every agent return.
4. **Δ-DPA-4**: For dual-review sessions, confirm 2nd agent's evidence-order is reversed.
5. **Δ-DPA-5**: Confirm settings.json PreToolUse[Task] hook lints subagent_type values.
```

---

## §7 Bibliography (≥10 URLs)

1. Anthropic, "How we built our multi-agent research system" — `https://www.anthropic.com/engineering/multi-agent-research-system`
2. Anthropic, claude-cookbooks `orchestrator_workers.ipynb` — `https://github.com/anthropics/claude-cookbooks/blob/main/patterns/agents/orchestrator_workers.ipynb`
3. Anthropic, claude-cookbook mirror — `https://platform.claude.com/cookbook/patterns-agents-orchestrator-workers`
4. Anthropic, sub-agents docs — `https://docs.anthropic.com/en/docs/claude-code/sub-agents`
5. Anthropic, hooks docs — `https://docs.anthropic.com/en/docs/claude-code/hooks`
6. Anthropic, GitHub issue #22143 (parallel-agent context-exhaust) — `https://github.com/anthropics/claude-code/issues/22143`
7. Anthropic, GitHub issue #25818 (no diagnostic context when subagent fails) — `https://github.com/anthropics/claude-code/issues/25818`
8. Microsoft AutoGen, GroupChat orchestration — `https://github.com/microsoft/autogen`
9. Microsoft AutoGen, TerminationCondition API — `https://microsoft.github.io/autogen/stable/reference/python/autogen_agentchat.conditions.html`
10. Microsoft AutoGen DeepWiki, Termination Conditions — `https://deepwiki.com/microsoft/autogen`
11. LangChain LangGraph, `Send` pattern + Checkpointer — `https://langchain-ai.github.io/langgraph/concepts/low_level/#send`
12. LangChain LangGraph, persistence docs — `https://langchain-ai.github.io/langgraph/concepts/persistence/`
13. LangChain LangGraph DeepWiki, Core Execution System — `https://deepwiki.com/langchain-ai/langgraph`
14. CrewAI, Hierarchical Process — `https://docs.crewai.com/concepts/processes#hierarchical-process`
15. NIST AI 600-1, Generative AI Profile (MEASURE-2.3) — `https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.600-1.pdf`
16. obra/superpowers, upstream skill — `https://github.com/obra/superpowers/blob/main/skills/dispatching-parallel-agents/SKILL.md`
17. camel-ai/camel, multi-agent communication — `https://github.com/camel-ai/camel`
18. assafelovic/gpt-researcher, Triadic agent pattern — `https://github.com/assafelovic/gpt-researcher`
19. huggingface/smolagents, code-execution agents — `https://github.com/huggingface/smolagents`
20. CLAUDE.md (this runtime), L13 W319-A H2 + L34 parallel-dispatch mandate — `Z:/claude-sota-installed/CLAUDE.md`

---

## §8 Compliance & Routing

- **Cardinal-rule-4 (b)** compliance: VENDOR-FORK path `.claude/skills/dispatching-parallel-agents-w321-fork/SKILL.md` is operator-curated + path-gated via SKILL.md → **COMPLIANT**.
- **Cardinal-rule-1**: Trusted-source — operator-derived from this-wave failure-mode evidence; cite-anchored to 5 distinct upstream orgs (Anthropic + Microsoft + LangChain + NIST + CrewAI) → **COMPLIANT**.
- **`self_invented_count: 0` invariant**: This skill counts as operator-curated vendor-fork per W316 addyosmani precedent (5 addyosmani skills accepted at `.claude/skills/<name>/SKILL.md`).
- **Auto-fire disambiguation**: Suffix `-w321-fork` prevents description-match collision with upstream `superpowers:dispatching-parallel-agents`.
- **Upstream-PR pathway** (alternative): NOT recommended this wave per upstream `CLAUDE.md` 94% rejection rate + "Skill Changes Require Evaluation" mandate (would require multi-session eval evidence + before/after measurements). Re-evaluate W323+ if Δ-patterns prove canonical-stable.

## §9 Operator-Decision Points

1. **VENDOR-FORK vs UPSTREAM-PR**: recommend VENDOR-FORK (low-risk, reversible, no upstream-rejection blast).
2. **Sidecar vs Replace**: recommend SIDECAR (description-match disambiguated by `-w321-fork` suffix) so upstream skill continues to fire on happy-path; this fork fires on file-deliverable / large-research / dual-review / custom-subagent_type triggers.
3. **PreToolUse[Task] hook for Δ-DPA-5**: optional; can be CR-2-compliant direct-CLI bash lint similar to W317 Stream-A Δ34 supersession-chain hook (≤500B). DRAFT-paste-ready next wave if operator approves.
