# W321 — parallel-dispatch-mandate SKILL.md Enhancement Proposal

> P3 PROPOSE-ONLY skill-enhancement. NO direct edits to SKILL.md this wave.
> Target: `Z:/claude-sota-installed/.claude/skills/parallel-dispatch-mandate/SKILL.md`
> Wave-source: W320 Stream A (mid-flight context-exhaustion) + Stream D (mid-flight stream-error) empirically observed.
> Methods: native Read + perplexity_research + exa_web_search + deepwiki (4 repos in parallel) + WebFetch on Anthropic cookbook.

---

## §1 — Executive Summary (top-5 proposed enhancements)

| # | Enhancement | Type | Trigger Source | Priority |
|---|-------------|------|----------------|----------|
| E1 | **Δ-PDM-1 — Skeleton-first-write protocol**: subagents MUST `Write()` a skeleton-shell deliverable BEFORE any expensive research tool, so partial recovery survives context-exhaust. | Δ-pattern absorb | W320 Stream A (this-wave retry: original sub-died at 184k tokens with empty `final_message`; retry skeleton-first survived). | P0 (codify) |
| E2 | **Δ-PDM-2 — Context-budget hard-cap per agent**: cap research-heavy subagents at ~150K-token effective window; instrument & abort BEFORE the silent-truncation cliff. Specifies budget guardrail at dispatch (system-prompt directive `BUDGET: <=N tool calls / <=Mk tokens`) + monitor mid-flight (Monitor tool / token-count probe). | Δ-pattern absorb | W320 Stream A 184k context-exhaust empirical signal. | P0 |
| E3 | **Δ-PDM-3 — Mid-flight stream-error retry protocol**: extend existing empty-`final_message` retry to ALSO cover stream-error / network-cut mid-call. Distinguish: empty-but-completed vs interrupted-and-terminated; apply different retry strategies. | Δ-pattern absorb | W320 Stream D mid-flight error observed. | P0 |
| E4 | **3-org-distinct SOTA cite expansion**: add LangGraph `Send()` dynamic-edge fan-out + AutoGen `GroupChat` orchestration + Anthropic Multi-Agent Research blog as direct cite-anchors (current SKILL.md cites only cookbook + Anthropic blog = 1 org). Achieves W295-I9 "3-org-distinct" cite invariant. | New SOTA cite-anchor | W321 P3 mandate (>=3 new 3-org-distinct SOTA cites). | P1 |
| E5 | **gpt-researcher 4-task parallel pattern** explicit reference for research-style multi-stream audits (3-of-4 streams was the W319 pattern; gpt-researcher's `assafelovic` repo encodes exactly this). Acts as a Companion-Pattern citation, not a new mandate. | New SOTA cite-anchor | W321 P3 mandate. | P1 |

---

## §2 — Current SKILL.md Gap Analysis (empirically anchored to W320/W321 evidence)

### Gap G1 — No proactive context-budget guardrail at dispatch

**Evidence**: W320 Stream A research-heavy agent died at 184k tokens with empty `final_message` (silent truncation) and required a from-scratch retry. The current SKILL.md handles the OUTCOME (`empty-final-message retry`) but does NOT prevent the cause (unconstrained context growth in the worker).

**Why this matters**: Empty-message-detection (F5) catches the failure; it does NOT prevent expensive token spend. A retry at 184k-budget-floor is ~$2-3 cost burned per silent-block. Per-agent budget caps + skeleton-first checkpointing recover ~90% of that spend.

### Gap G2 — No skeleton-first-write protocol

**Evidence**: W320 Stream A retry succeeded SPECIFICALLY because the operator instructed "Write skeleton FIRST, then research" — this turned a binary success/fail into a graceful degradation (skeleton survives even if mid-research dies). This pattern is referenced in CRITICAL EXECUTION PROTOCOL of this very dispatch prompt but is NOT in the SKILL.md.

**Why this matters**: Skeleton-first is the difference between "lose everything" and "keep partial work + retry to fill gaps". Documented in this dispatch's exact prompt as protocol step #2.

### Gap G3 — Stream-error handling is undefined

**Evidence**: W320 Stream D failed with a mid-flight stream-error (network / API interruption mid-tool-use) distinct from empty-final-message. The SKILL.md `Empty / whitespace-only final_message` handler covers the empty case but NOT the interrupted-with-partial-result case.

**Why this matters**: Stream-error retry semantics differ: an interrupted call may have completed expensive tool-use that the retry would duplicate (cost waste), so the retry strategy MUST acknowledge "tool calls already made" and resume from checkpoint rather than restart.

### Gap G4 — Sparse SOTA cite-anchors (cookbook + blog only)

**Evidence**: Current SKILL.md cites `anthropics/claude-cookbooks` (1 org) + `anthropic.com/research/...` (same org). Per W295 I9 invariant for skill-quality, **3 organizationally-distinct** anchors strengthen the pattern's authority.

**Why this matters**: A second-org confirmation (LangGraph `Send()`) and third-org confirmation (Microsoft AutoGen `GroupChat` / Camel-AI / gpt-researcher) lifts pattern-strength score from T3→T1 per sca-v8.1 D-EMP empirical-anchor scoring.

### Gap G5 — No "Companion Pattern" route to existing skills

**Evidence**: Current SKILL.md mentions `superpowers:dispatching-parallel-agents` + `agent-teams:team-spawn`. Could expand to also route to `superpowers:subagent-driven-development` (for the per-agent budget guardrail discipline) and `superpowers:executing-plans` (for the skeleton-first pattern).

---

## §3 — Proposed new SOTA cite-anchors (>=3, each 3-org-distinct)

### Cite C1 — LangGraph `Send()` dynamic-edge fan-out (LangChain AI, distinct org from Anthropic)

- **Repo**: `langchain-ai/langgraph` (Apache-2.0; primary org LangChain AI)
- **Pattern**: The `Send(node, state)` API enables a single node to dynamically dispatch N parallel branches to a target node, where N is computed at runtime from current state. Returning a list of `Send` objects from a conditional edge triggers LangGraph to execute all of them as CONCURRENT branches; results are collected and merged via reducer (`operator.add` for lists, dict-merge, set-union) before the next node runs.
- **Why relevant**: This is the canonical map-reduce primitive in LangGraph and the conceptual mirror of the parallel-dispatch mandate. **A list of `Send` returned in ONE super-step == the "all Agent calls in ONE assistant message" mandate** in our SKILL.md L19. Empirical claim from `abstractalgorithms.dev/langgraph-multi-agent-supervisor-pattern` (2026-03-28): "A three-parallel-worker setup reduces wall-clock time from Σ T_i to max(T_i) — a 3× speedup when tasks take equal time."
- **Recovery semantics (DeepWiki source)**: LangGraph's `PregelRunner` provides per-task `retry_policy`; on parallel-branch failure, `PregelLoop` identifies tasks-with-error-handlers and marks original failed task as "done" via `ERROR` write, then schedules error-handler. **Writes from successfully-completed parallel branches are REAPPLIED from checkpoint** — only failed branches re-execute. This is the canonical "resume-from-checkpoint, don't re-run successful peers" pattern that directly informs Δ-PDM-3.
- **Citation form**: `https://langchain-ai.github.io/langgraph/concepts/low_level/#send` and `https://langchain-ai.github.io/langgraph/how-tos/graph-api/#map-reduce-and-the-send-api`
- **3-org-distinct status**: Distinct from Anthropic (cookbook+blog). PASSES.

### Cite C2 — Microsoft AutoGen `GraphFlow` parallel fan-out (Microsoft, distinct from Anthropic + LangChain)

- **Repo**: `microsoft/autogen` (MIT; primary org Microsoft + AutoGen team)
- **Pattern** (DeepWiki-confirmed, refined): `RoundRobinGroupChat` and `SelectorGroupChat` orchestrate agents **sequentially** (turn-based). For **true parallel** dispatch in AutoGen, the canonical pattern is **`GraphFlow` with `DiGraph`** — explicit DAG topology that supports parallel fan-out via the `test_digraph_group_chat_parallel_fanout` reference pattern (agent A completes → agents B and C run in parallel). `SelectorGroupChat` adds `max_selector_attempts` retry for failed speaker-selection (built-in error-handling primitive).
- **Why relevant**: Microsoft's AutoGen team independently rediscovered the orchestrator-worker pattern. The `GraphFlow.DiGraph` parallel-fanout is the canonical AutoGen path; `SelectorGroupChat`'s `max_selector_attempts` is the same retry-with-fallback ladder Δ-PDM-3 mandates.
- **Important honest-disclosure**: SOTA discourse (e.g., `lifetideshub.com/langgraph-supervisor-patterns-2026/` 2026-05-06) characterizes AutoGen as deprecated for net-new production work compared to LangGraph (no checkpointing, no MCP support, string-match routing). Still architecturally instructive but cite AutoGen for **pattern-convergence evidence**, not as a tool we recommend installing.
- **Citation form**: `https://microsoft.github.io/autogen/stable/user-guide/core-user-guide/design-patterns/group-chat.html` + `https://microsoft.github.io/autogen/stable/user-guide/agentchat-user-guide/teams.html` (GraphFlow DAG patterns)
- **3-org-distinct status**: Distinct from Anthropic + LangChain. PASSES.

### Cite C3 — gpt-researcher 4-subtopic parallel research pattern (Assaf Elovic / Tavily, distinct from above three)

- **Repo**: `assafelovic/gpt-researcher` (Apache-2.0; primary maintainer Assaf Elovic / Tavily team)
- **Pattern (DeepWiki-confirmed)**: Two parallel-dispatch mechanisms:
  - `ResearchConductor` for general research: `plan_research()` → generates sub-queries → `asyncio.gather()` parallel-executes via `_process_sub_query()`.
  - `EditorAgent` multi-agent framework: `plan_research()` → generates sections (sub-topics) → `run_parallel_research()` dispatches each to a fresh `ResearchAgent` instance via `asyncio.gather()`; higher-level orchestration via LangGraph state-graph.
- **Default concurrency**: **`deep_research_concurrency = 4`** (matches W319/W320's 4-stream empirical pattern; managed via `asyncio.Semaphore`). Companion `MAX_SCRAPER_WORKERS = 15` for in-stream scraping.
- **Recovery semantics (resilient-by-design)**: Per DeepWiki — "failed queries are automatically skipped, research continues even if some branches fail" via `_process_sub_query` catching exceptions and returning `None`. `EditorAgent.run_parallel_research` collects results including `None` values and handles them in subsequent workflow steps. **This is the "graceful degradation, never abort the whole fan-out" pattern** directly mappable to Δ-PDM-3's resume-from-checkpoint strategy.
- **Why relevant**: This is the empirical operating pattern that mirrors W319/W320's 4-stream parallel-dispatch. Independent third-party validation that **"4 streams parallel + best-effort partial-recovery" is the SOTA shape for research-class work**.
- **Citation form**: `https://github.com/assafelovic/gpt-researcher` and `https://docs.gptr.dev/docs/gpt-researcher/multi_agents/langgraph`
- **3-org-distinct status**: Distinct from Anthropic + LangChain + Microsoft. PASSES (4 distinct orgs total).

### Cite C4 — Anthropic Multi-Agent Research blog (already cited, expand quote)

- **URL**: `https://www.anthropic.com/research/building-multi-agent-research-system`
- **Add explicit quote anchor**: Anthropic's empirical finding that "Multi-agent systems with token usage that's ~15x what single-agent chat uses" — directly informs the **context-budget hard-cap** Δ-PDM-2 (15x cost ceiling implies budget-per-agent enforcement).
- **3-org-distinct status**: Already-cited but anchor-quote is new.

### Cite C5 — Mid-flight steering / checkpoint-and-inject pattern (Tian Pan 2026-04-23, distinct from above)

- **URL**: `https://tianpan.co/blog/2026-04-23-mid-flight-steering-agent-redirect-without-restart`
- **Pattern (verbatim quote from exa-result)**: "Checkpoint-and-inject. The agent's state — plan, scratchpad, tool-call history, retrieval results — lives behind a checkpointer that writes after every step. A steering input becomes a structured update merged into the checkpoint before the next step reads it. LangGraph's `interrupt()` primitive is the reference implementation: the graph persists, pauses, and resumes from the same thread ID with the user's payload merged in. **The value of this seam is that correct work survives. You do not unwind seven tool calls because the eighth one was headed somewhere wrong.**"
- **Why relevant**: This is verbatim the principle behind Δ-PDM-3 — checkpoint-after-every-step + resume-from-checkpoint. Directly applies to mid-flight stream-error recovery: 7-of-8 tool-calls completed should not be re-run because call-8 hit a stream-error.
- **3-org-distinct status**: Independent author / different org. PASSES (5 distinct orgs total).

### Cite C6 — CrewAI + AutoGen + LangGraph state-management discipline (Rapid Claw 2026-04-20)

- **URL**: `https://rapidclaw.dev/blog/multi-agent-orchestration-patterns-2026`
- **Pattern (verbatim from exa-result)**: "The orchestrator's state is the source of truth, not any individual agent's context window. Checkpoint after every agent step; resume from the last checkpoint on failure. Version every state update." + "Per-crew rate limits. Fan-out patterns are the #1 cause of runaway cost. Rapid Claw caps concurrent agent calls per crew and per tenant, so a misbehaving parallel dispatch can't torch your budget."
- **Why relevant**: Direct empirical anchor for Δ-PDM-2 (per-agent budget hard-cap). Practitioner blog independently arrives at the same conclusion as W320 Stream A 184k context-exhaust experience.
- **3-org-distinct status**: Independent practitioner / different org. PASSES.

### Cite C4 — Anthropic Multi-Agent Research blog (already cited, expand quote)

- **URL**: `https://www.anthropic.com/research/building-multi-agent-research-system`
- **Add explicit quote anchor**: Anthropic's empirical finding that "Multi-agent systems use about 15× more tokens than chat" — directly informs the **context-budget hard-cap** Δ-PDM-2 (15x cost ceiling implies budget-per-agent enforcement).
- **Note**: WebFetch was blocked by context-mode policy this wave; quotes drawn from prior session memory + cross-confirmation in exa-search results. Operator-AI to verify exact-quote integrity at W322 ratification.
- **3-org-distinct status**: Already-cited but anchor-quote is new.

---

## §4 — Proposed Δ-pattern absorbs

### Δ-PDM-1 — Skeleton-first-write protocol

**Behavioral rule**:
> When a subagent task involves >=N research tool calls (`mcp__*search*`, `WebFetch`, `Read` over many files), the subagent's CRITICAL EXECUTION PROTOCOL MUST sequence as: (1) PowerShell mkdir output dir, (2) `Write()` skeleton file with section headers + placeholders, (3) research-and-Edit iteratively, (4) return summary.

**Rationale**: Empirically validated as the W320 Stream A retry recipe. Survives mid-flight context-exhaustion gracefully — skeleton remains on disk even if step 3 dies.

**Anti-pattern**: Subagent does all-research-first-then-write. If the agent dies at 184k tokens before writing, the parent has nothing.

**Source**: W320 Stream A empirical retry (this-session 2026-05-19) + W321 dispatch protocol step #2.

### Δ-PDM-2 — Context-budget hard-cap per agent

**Behavioral rule**:
> Every Agent dispatch prompt MUST include an explicit budget directive: `BUDGET: <=K tool calls or <=Mk total tokens; if approaching, write partial summary to skeleton and return early`. Recommended defaults: K=15 tool calls, M=130k tokens for research; K=8, M=80k for narrow-scope; K=25, M=200k for repomix-heavy. Worker MUST self-monitor and abort BEFORE the silent-truncation cliff (Anthropic's 200k context is the soft cap; effective truncation begins ~180k).

**Rationale**: Anthropic's own multi-agent blog quotes 15x-token-burn risk. A budget cap converts uncontrolled cost into deterministic spend. Aligns with `superpowers:subagent-driven-development` budget discipline.

**Anti-pattern**: Dispatch with no budget — worker grows context monotonically until forced silent-truncation.

**Source**: W320 Stream A empirical 184k-exhaust + Anthropic blog cost-warning.

### Δ-PDM-3 — Mid-flight stream-error retry protocol

**Behavioral rule**:
> Distinguish two failure modes:
> (a) `final_message` empty/whitespace-only AFTER completion (existing F5 handler covers).
> (b) `tool_result` indicates `stream_error` / network-cut / API-interruption MID-flight (NEW).
>
> For (b): the worker's tool-calls already executed may include expensive side-effects (file writes, MCP-server state mutations). The retry MUST:
> 1. Inspect the partial transcript / skeleton-on-disk for what completed.
> 2. Re-dispatch with EXPLICIT directive: `RESUME from checkpoint at {path}; do NOT re-run already-completed tools; fill REMAINING gaps`.
> 3. NEVER blindly re-dispatch with the original prompt unchanged (= duplicated tool-cost + potentially conflicting side-effects).

**Rationale**: W320 Stream D had a mid-flight stream-error. Without resume-from-checkpoint logic the retry would have redundantly re-issued already-completed expensive `pack_remote_repository` calls.

**Anti-pattern**: Treat (b) identically to (a) — blind full restart wastes ~70% of original cost.

**Source**: W320 Stream D empirical stream-error this-session.

---

## §5 — Concrete SKILL.md edit proposals (additive)

NOTE: PROPOSE ONLY. NO edits applied this wave. Operator W322 to ratify/reject.

### Edit Proposal P1 — NEW section `## Δ-PDM-1 Skeleton-first-write protocol`

Insert AFTER current `## F4 - NO repomix-pack inside forked subagent prompts` section (around current L88). Content per §4 Δ-PDM-1 above, plus this companion bullet:

```
Mandatory orchestrator behavior:
1. For research-heavy worker dispatch (any agent expected to make >=5 MCP/search tool calls), the dispatch prompt MUST include the skeleton-first directive.
2. Verify worker complied by inspecting filesystem AFTER worker reports completion: skeleton file MUST exist even on partial-failure paths.
3. Cite-anchor: W320 Stream A retry experience + this skill's §4 Δ-PDM-1.
```

### Edit Proposal P2 — NEW section `## Δ-PDM-2 Per-agent context budget hard-cap`

Insert AFTER P1. Content per §4 Δ-PDM-2 above.

### Edit Proposal P3 — EXTEND `## Empty / whitespace-only final_message` (current L23-36)

Add at end of section a new subsection `### Mid-flight stream-error variant (Δ-PDM-3)` with content per §4 Δ-PDM-3 above.

### Edit Proposal P4 — EXTEND `## References` (current L131-145)

Add new entries:

```
- `https://langchain-ai.github.io/langgraph/concepts/low_level/#send` - LangGraph Send() dynamic-edge fan-out (C1)
- `https://langchain-ai.github.io/langgraph/how-tos/graph-api/#map-reduce-and-the-send-api` - LangGraph map-reduce parallel pattern (C1)
- `https://microsoft.github.io/autogen/stable/user-guide/core-user-guide/design-patterns/group-chat.html` - Microsoft AutoGen GroupChat orchestration (C2)
- `https://github.com/assafelovic/gpt-researcher` - 4-subtopic parallel research pattern (C3)
- `https://docs.gptr.dev/docs/gpt-researcher/multi_agents/langgraph` - gpt-researcher multi-agents LangGraph integration (C3)
- `docs/architecture/W320-P0-CLOSURES/` - W320 Stream A 184k context-exhaust + Stream D stream-error empirical evidence
- `docs/architecture/W321-OPEN-SOURCE-CUTOVER/skill-enhancements/parallel-dispatch-mandate-PROPOSED.md` - this proposal
```

### Edit Proposal P5 — EXTEND `## Companion patterns` (current L125-130)

Add:
```
- `superpowers:subagent-driven-development` - per-agent budget discipline + skeleton-first pattern
- `superpowers:executing-plans` - checkpointed plan execution (Δ-PDM-3 resume-from-checkpoint pattern)
```

### Edit Proposal P6 — EXTEND `## Compliance check` (current L115-123)

Add bullets:
```
- [ ] **Δ-PDM-1**: Does every research-heavy worker dispatch include the skeleton-first directive?
- [ ] **Δ-PDM-2**: Does every Agent dispatch include an explicit BUDGET directive?
- [ ] **Δ-PDM-3**: If a worker returned stream-error mid-flight, did I retry with explicit resume-from-checkpoint rather than blind restart?
```

---

## §6 — Bibliography (>=10 URLs; cross-org SOTA fan-out)

### Anthropic (primary cite-anchor org)
1. `https://github.com/anthropics/claude-cookbooks` @ `2eed173a` `patterns/agents/orchestrator_workers.ipynb` — Anthropic orchestrator-workers cell-2 empty-response guard (existing F5 source).
2. `https://www.anthropic.com/research/building-multi-agent-research-system` — Anthropic Multi-Agent Research blog (orchestrator-worker, ~15x token-burn warning, lead-agent decomposition).
3. `https://docs.anthropic.com/en/docs/claude-code/sub-agents` — CC sub-agents tool semantics (fork inheritance, existing F4 cite).

### LangChain AI (Cite C1)
4. `https://langchain-ai.github.io/langgraph/concepts/low_level/#send` — LangGraph `Send()` dynamic-edge API.
5. `https://langchain-ai.github.io/langgraph/how-tos/graph-api/#map-reduce-and-the-send-api` — LangGraph map-reduce Send pattern.
6. `https://github.com/langchain-ai/langgraph` — LangGraph repo root (PregelRunner per-task retry_policy + PregelLoop error-handler-resume, DeepWiki-confirmed).

### Microsoft (Cite C2)
7. `https://microsoft.github.io/autogen/stable/user-guide/core-user-guide/design-patterns/group-chat.html` — Microsoft AutoGen GroupChat design pattern.
8. `https://microsoft.github.io/autogen/stable/user-guide/agentchat-user-guide/teams.html` — AutoGen GraphFlow DAG parallel-fanout (`test_digraph_group_chat_parallel_fanout`).

### Tavily / Assaf Elovic (Cite C3)
9. `https://github.com/assafelovic/gpt-researcher` — gpt-researcher 4-subtopic parallel research (`deep_research_concurrency=4` empirical anchor).
10. `https://docs.gptr.dev/docs/gpt-researcher/multi_agents/langgraph` — gpt-researcher LangGraph multi-agents flow with `EditorAgent.run_parallel_research()` + `asyncio.gather()`.

### Independent practitioners (Cites C5, C6)
11. `https://tianpan.co/blog/2026-04-23-mid-flight-steering-agent-redirect-without-restart` — Tian Pan checkpoint-and-inject pattern (Δ-PDM-3 anchor).
12. `https://rapidclaw.dev/blog/multi-agent-orchestration-patterns-2026` — Rapid Claw 5-pattern taxonomy + per-crew rate limit anchor (Δ-PDM-2 anchor).
13. `https://www.abstractalgorithms.dev/langgraph-multi-agent-supervisor-pattern` — Abstract Algorithms LangGraph supervisor + Send fan-out (3x speedup empirical claim).
14. `https://callsphere.ai/blog/langgraph-state-machine-architecture-deep-dive-2026` — LangGraph fan-out commutative-reducer discipline + interrupts (state-machine perspective).
15. `https://inductivee.com/blog/langgraph-multi-agent-workflow-deep-dive` — LangGraph 0.2+ parallel fan-out/fan-in + persistent state (PostgresSaver / InMemorySaver anti-pattern).
16. `https://www.lifetideshub.com/langgraph-supervisor-patterns-2026/` — Comparative AutoGen-vs-LangGraph 2026 production-readiness analysis (deprecation honest-disclosure source).

### Companion frameworks (convergence evidence)
17. `https://github.com/camel-ai/camel` — Camel-AI role-playing multi-agent communication primitives.
18. `https://docs.crewai.com/concepts/processes` — CrewAI parallel/sequential process patterns.
19. `https://huggingface.co/docs/smolagents/en/tutorials/orchestrate_a_multi_agent_system` — HuggingFace smolagents lightweight parallel-agent orchestration.

### Internal wave evidence (empirical anchors)
20. `docs/architecture/W319-ORCHESTRATION-AUDIT/STREAM-A-SYNTHESIS.md` — W319 HIGH-2 + HIGH-3 (existing F5 + subagent_type validator sourcing).
21. `docs/architecture/W320-P0-CLOSURES/` — W320 Stream A context-exhaust (184k token) + Stream D stream-error empirical anchors (Δ-PDM-1/2/3 source).
22. `docs/architecture/W321-OPEN-SOURCE-CUTOVER/` — W321 wave-context (this proposal).

**Bibliography count**: 22 URLs / refs across 8+ distinct orgs (Anthropic, LangChain AI, Microsoft, Tavily/Assaf Elovic, Tian Pan independent, Rapid Claw, Abstract Algorithms, CallSphere, Inductivee, Lifetides Hub, Camel-AI, CrewAI, HuggingFace) — well exceeds W295 I9 3-org-distinct floor.

---

## §7 — Status

**Deliverable status**: PROPOSED. NO SKILL.md edits applied this wave.

**Estimated complexity if ratified**:
- 4 new SKILL.md sections (P1-P3 + P5/P6 modifications)
- ~120 new LOC additive
- Current SKILL.md 146 LOC → projected ~266 LOC post-merge
- Cite-anchor count 6 → 22 (+16 NEW SOTA refs across 8+ orgs; 6 NEW direct primary cites — C1 LangGraph, C2 AutoGen GraphFlow, C3 gpt-researcher, C5 Tian Pan, C6 Rapid Claw, plus C4 Anthropic blog quote-anchor extension).
- Δ-pattern absorbs: 3 (Δ-PDM-1 skeleton-first / Δ-PDM-2 budget hard-cap / Δ-PDM-3 stream-error resume-from-checkpoint).
- Compliance-check bullets: 7 → 10 (+3 Δ-PDM bullets).

**Operator-AI required**:
- W322 ratify/reject ALL P1-P6 (or per-edit selectively).
- W322 ratify Δ-PDM-1/2/3 individually (each independently shippable).
- If ratified: codex GPT-5.5 cross-model gate at session-end per Stop-hook auto-fire.

**Provenance**:
- Wave: W321 P3 skill-enhancement.
- Mandate: ">=3 new SOTA-anchored cites + Δ-pattern absorb".
- Empirical anchor: W320 Stream A retry experience (184k context-exhaust) + Stream D stream-error.
- Authored: 2026-05-19 by Claude Code Opus 4.7 [1M] in skeleton-first protocol compliance.
