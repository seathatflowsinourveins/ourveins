# Z5 — Research-Architecture Repo Ingest

**Wave**: W344-SOTA-UNLEASH
**Stream**: Z5 (P2.4 research-arch ingest)
**Date**: 2026-05-20
**Author**: Stream Z5 (forked subagent)

## Scope

Ingest 3 research-architecture repos to extract primitives we haven't absorbed:
1. **lastmile-ai/mcp-agent**
2. **microsoft/autogen**
3. **langchain-ai/langgraph**

MCP-family fan-out per D81 — use ≥3 distinct families per repo.

---

## Repo 1: lastmile-ai/mcp-agent

**Source**: https://github.com/lastmile-ai/mcp-agent (~8.2k★ at audit-time)
**License**: MIT
**Last-commit**: active (within 60d ✓)

**Patterns enumerated** (5):
1. **Router** — single-input → N-output topology selection; routes prompt to specialized worker by intent classification
2. **ParallelLLM** — fan-out → fan-in; sends same prompt to N workers concurrently → aggregator merges
3. **Orchestrator** — planner-workers-synthesizer; planner decomposes goal → worker subagents → synthesizer reconciles
4. **Evaluator-Optimizer** — generate→evaluate refinement loop; output regenerated until quality-evaluator passes
5. **MCPAggregator** — namespaced multi-MCP-server aggregation; multiple MCP servers exposed as one virtual server with namespace prefix

**Runtime mapping check**:

| Pattern | Local skill | Present? | Drift? |
|---------|-------------|----------|--------|
| Router | `mcp-agent-patterns:Router` | ✓ in `.claude/skills/mcp-agent-patterns/` | NO drift — pattern reference complete |
| ParallelLLM | `mcp-agent-patterns:ParallelLLM` | ✓ | NO drift |
| Orchestrator | `mcp-agent-patterns:Orchestrator` | ✓ | NO drift |
| Evaluator-Optimizer | `mcp-agent-patterns:Evaluator-Optimizer` | ✓ | NO drift |
| MCPAggregator | `mcp-agent-patterns:MCPAggregator` | ✓ | NO drift |

**Verdict**: NO DRIFT. All 5 patterns present in local skill `mcp-agent-patterns` (verified via Skill catalog 2026-05-20).

**Cite-anchor**: lastmile-ai/mcp-agent README + src/mcp_agent/workflows/{router,parallel,orchestrator,evaluator_optimizer,aggregator}.py modules.

**MCP families used in this audit**:
- (1) deepwiki `read_wiki_structure` (code-graph)
- (2) WebFetch on README.md (doc-fetch)
- (3) mcp__github__search_code `mcp-agent` (GitHub-graph)

**Decision**: T2-CHERRY (already absorbed); CITE-ONLY for future Router/Orchestrator skill re-evaluation.

---

## Repo 2: microsoft/autogen

**Source**: https://github.com/microsoft/autogen
**License**: MIT
**Last-commit**: active (within 60d ✓)
**Status**: 2026-04-03 successor to retired autogen v0.4 — AutoGen+SemanticKernel merger now ships as `microsoft/agent-framework` v1.0 GA

**Patterns enumerated** (3 targeted for D78 verification):
1. **TokenUsageTermination** — `class TokenUsageTermination(TerminationCondition)`: terminate when cumulative tokens > N
2. **MaxMessageTermination** — `class MaxMessageTermination(TerminationCondition)`: terminate when message-count > N
3. **_signal_termination_with_error** — base-worker contract: failed worker MUST call `_signal_termination_with_error(error)` to propagate exception up; orchestrator NEVER silently exit-0's

**Runtime mapping check (D78 = worker-failure-termination-guard)**:

| Pattern | Local skill | Present? | Drift? |
|---------|-------------|----------|--------|
| TokenUsageTermination | `agent-budget-discipline` | ✓ TokenUsageTermination + MaxMessageTermination cited | NO drift — both anchors named |
| MaxMessageTermination | `agent-budget-discipline` | ✓ | NO drift |
| `_signal_termination_with_error` | `worker-failure-termination-guard` (D78) | ✓ cite-anchored to "microsoft autogen `_signal_termination_with_error`" | NO drift |

**Verdict**: NO DRIFT. Both budget-discipline (TokenUsage/MaxMessage) and D78 (signal_termination) properly cite-anchor microsoft autogen primitives.

**Cite-anchor**: microsoft/agent-framework v1.0 GA MIT (2026-04-03). Python source path `python/packages/autogen-agentchat/src/autogen_agentchat/conditions/__init__.py` (TerminationCondition subclasses); `python/packages/autogen-core/src/autogen_core/_runtime_impl_helpers.py` `_signal_termination_with_error`.

**MCP families used in this audit**:
- (1) mcp__hf-mcp-server__hub_repo_search `autogen` (HF-resources)
- (2) mcp__github__search_code `_signal_termination_with_error` (GitHub-graph)
- (3) Read `.claude/skills/worker-failure-termination-guard/SKILL.md` (local file-graph)

**Decision**: T2-CHERRY (already absorbed); CITE-ONLY confirmation.

---

## Repo 3: langchain-ai/langgraph

**Source**: https://github.com/langchain-ai/langgraph
**License**: MIT
**Last-commit**: active (within 60d ✓)
**Latest**: v0.4 MIT (HITL checkpoints landed 2026-04)

**Patterns enumerated** (3 targeted):
1. **BaseCheckpointSaver** — `langgraph.checkpoint.base.BaseCheckpointSaver`: machine-serialized save/resume contract; `(thread_id, checkpoint_id) → state` retrieval
2. **supervisor `last_message` extraction** — supervisor-pattern: when worker completes, supervisor extracts `last_message` from worker's message-list as canonical output anchor
3. **Pregel exception bubble** — `langgraph.pregel.Pregel.invoke()`: exceptions from any node bubble up to top-level; NEVER silently swallowed

**Runtime mapping check**:

| Pattern | Local skill | Present? | Drift? |
|---------|-------------|----------|--------|
| BaseCheckpointSaver | `checkpoint-resume` | ✓ cite-anchored to `langchain-ai/langgraph v0.4 MIT` | NO drift |
| supervisor `last_message` | `empty-final-message-guard` (D79) | ✓ cite-anchored to "LangGraph supervisor `last_message` extraction" | NO drift |
| Pregel exception bubble | `worker-failure-termination-guard` (D78) | ✓ cite-anchored to "LangGraph Pregel exception bubble" | NO drift |

**Verdict**: NO DRIFT. All 3 LangGraph primitives properly cite-anchored across `checkpoint-resume` + D79 + D78 skills.

**Bonus primitives discovered (not yet absorbed)**:
- **`add_messages` reducer** — LangGraph state-graph annotation: `Annotated[list[BaseMessage], add_messages]` controls how concurrent worker outputs reduce into shared state
- **Conditional edges** — `graph.add_conditional_edges(source, router_fn, mapping)`: branch-by-router-output topology

**Recommendation**: D84 candidate (W345+) — `state-reducer-discipline` skill citing LangGraph `add_messages` + LangChain `ConditionalEdge` + Anthropic `claude-cookbooks` orchestrator state-merge pattern.

**Cite-anchor**: langchain-ai/langgraph v0.4 source paths `libs/langgraph/langgraph/{checkpoint/base.py, pregel/__init__.py, graph/state.py}`.

**MCP families used in this audit**:
- (1) mcp__deepwiki__read_wiki_structure `langchain-ai/langgraph` (code-graph)
- (2) WebFetch `langchain-ai.github.io/langgraph/` docs (doc-fetch)
- (3) Read `.claude/skills/checkpoint-resume/SKILL.md` (local file-graph)
- (4) mcp__github__search_code `BaseCheckpointSaver` (GitHub-graph)

**Decision**: T2-CHERRY (3 absorbed); D84 NEW SKILL queued (`state-reducer-discipline`).

---

## Summary

| Repo | Patterns Audited | Drift Found | New Primitives | Decision |
|------|------------------|-------------|----------------|----------|
| lastmile-ai/mcp-agent | 5 | 0 | 0 | CITE-ONLY |
| microsoft/autogen | 3 | 0 | 0 | CITE-ONLY |
| langchain-ai/langgraph | 3 | 0 | 2 (add_messages + ConditionalEdge) | D84 SKILL QUEUED |

**Aggregate**: 11 patterns audited across 3 repos. 0 drift. 2 new primitives queued for W345+ as D84 `state-reducer-discipline` skill.

**MCP family fan-out per D81 PASS gate**: ≥4 families used across the 3-repo audit — code-graph + doc-fetch + GitHub-graph + HF-resources + local-file-graph = 5 distinct families. PASS.

## Acceptance

- [x] 3 repos audited
- [x] 11 patterns mapped to local skills
- [x] Drift report: NO drift across all 3
- [x] 2 NEW primitives surfaced (langgraph add_messages + ConditionalEdge → D84 candidate)
- [x] D81 PASS — 5 MCP families used
- [ ] D84 skill drafting deferred to W345+ (queued)
