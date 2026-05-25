---
name: mcp-agent-patterns
description: Five reusable agentic workflow patterns extracted from lastmile-ai/mcp-agent (8.2k stars MIT) — Router, ParallelLLM (fan-out/fan-in), Orchestrator (planner-workers-synthesizer), Evaluator-Optimizer (generate-evaluate refinement loop), and MCPAggregator (namespaced multi-MCP-server aggregation). Use when selecting an agent-workflow topology, designing multi-MCP-server orchestration, picking between fan-out vs orchestrator vs router decompositions, or extracting agent-pattern primitives for a Claude Code skill / subagent / plugin from Anthropic's effective-agents catalog.
---

# mcp-agent-patterns (P0-1 W335 ship)

<!-- Source: lastmile-ai/mcp-agent @ f62d849350816588b1c6294e7914bbe4d8b84072 (HEAD 2026-01-25, MIT) cloned to Z:/claude-sota-installed-repos/lastmile-ai-mcp-agent. Anthropic "Building effective agents" 2024-12-19 https://www.anthropic.com/research/building-effective-agents is the canonical taxonomy these five patterns implement. -->

Five reusable agentic workflow primitives from Anthropic's "Building effective agents" taxonomy, codified in Python at lastmile-ai/mcp-agent. Use this skill as a **topology-selection reference** BEFORE designing any multi-step Claude Code workflow, subagent fan-out, or MCP-server aggregation. Per CR-1 trust-tuple this is `T3 PATTERN-STUDY` — patterns are extracted; the upstream package is NOT installed.

## Topology selection (60-second lookup)

| Pattern | Shape | Use when | Anti-when |
|---|---|---|---|
| **Router** | 1 → choose-1-of-N specialist | distinct categories; classification can be done accurately; cost/speed tier-routing (Haiku-vs-Opus) | task spans multiple categories simultaneously; sequential pipeline needed |
| **ParallelLLM** | 1 → N → 1 (fan-out + fan-in) | sectioning (split into independent subtasks) OR voting (multiple perspectives / guardrails) | sequential dependencies; subtasks share state |
| **Orchestrator** | planner → workers (dynamic N) → synthesizer | task shape unpredictable at design-time; subtask count + scope only known at runtime (coding tasks across unknown file-count) | task decomposition is static; cheaper Router suffices |
| **Evaluator-Optimizer** | generate ↔ evaluate refinement loop | clear quality criteria + iteration adds value (literary translation, multi-revision docs, search-with-feedback) | one-shot tasks; no measurable quality signal; cost-bounded |
| **MCPAggregator** | N MCP servers → 1 namespaced surface | multiple MCP servers must look like one tool surface; per-tool name-collision risk | single-server case; no namespacing need |

Patterns COMPOSE: Evaluator-Optimizer can wrap any of Router / Orchestrator / ParallelLLM as its `optimizer` to add a refinement loop. MCPAggregator is foundational — the other four can consume tools through it.

---

## 1. Router (`src/mcp_agent/workflows/router/router_base.py`)

> Routing classifies an input and directs it to one or more specialized followup tasks. Routes to MCP servers, Agents (aggregations of servers), or plain Callables.

**Core types** (line refs at f62d849):
- `RouterResult[ResultT]` (L20) — `result: str | Agent | AugmentedLLM | Callable`, optional `p_score: float`
- `RouterCategory` (L35) — `name`, `description`, `category` (the routable target)
- `ServerRouterCategory` (L53) extends RouterCategory with `tools: List[FastTool]`
- `AgentRouterCategory` (L59) extends RouterCategory with `servers: List[ServerRouterCategory]`
- `Router(ABC, ContextDependent)` (L65) — abstract; `route(request, top_k=1) -> List[RouterResult]`

**Subclasses shipped**:
- `router_llm.py` + provider-specific (`router_llm_anthropic.py`, `router_llm_openai.py`) — LLM-driven classification
- `router_embedding.py` + provider-specific (`router_embedding_cohere.py`, `router_embedding_openai.py`) — cosine-similarity classification

**Claude Code translation**: a Router is what the SDK `subagent_type=*` selector does, OR what a `RoutingAgent` defined in `.claude/agents/` does when it inspects user prompts and dispatches to one of N specialist subagents. The pattern surfaces in CC as the `Agent({subagent_type: ...})` dispatch when there is exactly one downstream specialist per classified intent.

---

## 2. ParallelLLM (`src/mcp_agent/workflows/parallel/parallel_llm.py`)

> Fan-out + fan-in over multiple LLM workers. Two named modes: **sectioning** (independent subtasks) and **voting** (multiple perspectives → consensus).

**Constructor** (L54):
```python
ParallelLLM(
    fan_in_agent: Agent | AugmentedLLM | Callable[[FanInInput], Any],  # aggregator
    fan_out_agents: List[Agent | AugmentedLLM] | None = None,           # workers
    fan_out_functions: List[Callable] | None = None,                    # plain fns
    llm_factory: Callable[[Agent], AugmentedLLM] = None,
)
```

**Companion files**: `fan_in.py` (FanIn class + FanInInput typedef), `fan_out.py` (FanOut class). History tracking is NOT supported (`self.history = None`, L80) — fan-out is by-design stateless across calls.

**Claude Code translation**: a single assistant message containing 2+ `Agent` tool_use blocks IS the fan-out; the orchestrator's synthesis turn (reading all `tool_result` blocks) IS the fan-in. This is exactly the contract that `parallel-dispatch-mandate` SKILL.md enforces — empty `final_message` from any worker triggers retry-once-then-escalate (cookbook canonical pattern), and a 2nd-occurrence empty is HARD-BLOCK.

---

## 3. Orchestrator (`src/mcp_agent/workflows/orchestrator/orchestrator.py`)

> Central planner LLM dynamically decomposes the task into subtasks, delegates to worker LLMs, loops until done, and synthesizes results.

**Constructor** (L133):
```python
Orchestrator(
    llm_factory: Callable[[Agent], AugmentedLLM],
    planner: Agent | AugmentedLLM | None = None,           # custom or default
    synthesizer: Agent | AugmentedLLM | None = None,
    available_agents: List[Agent | AugmentedLLM] | None = None,
    plan_type: Literal["full", "iterative"] = "full",
    overrides: OrchestratorOverrides | None = None,
)
```

**Two plan modes**:
- `plan_type="full"` (L226) — planner generates ALL steps upfront, executor walks the DAG
- `plan_type="iterative"` (L646 `_get_next_step`) — plan one step at a time, re-plan after each completes

**Prompt seams** (`OrchestratorOverrides` L91): `orchestrator_instruction`, `planner_instruction`, `synthesizer_instruction`, `get_full_plan_prompt`, `get_iterative_plan_prompt`, `get_task_prompt`, `get_synthesize_plan_prompt` — every prompt template is overrideable per-invocation. Default planner_instruction at L172: "You are an expert planner. Given an objective task and a list of MCP servers ... break down the objective into a series of steps."

**Companion files**: `orchestrator_models.py` (Step / PlanResult / TaskWithResult pydantic models), `orchestrator_prompts.py` (default prompt templates).

**Claude Code translation**: `agent-teams:team-lead` orchestrator with `team-feature` preset is the closest CC primitive — team-lead does the planner role + delegates to teammates + synthesizes final report. Alternatively a parent Claude Code session that emits multiple `Agent` tool_use blocks with `subagent_type` per step IS the Orchestrator pattern at the harness level.

---

## 4. Evaluator-Optimizer (`src/mcp_agent/workflows/evaluator_optimizer/evaluator_optimizer.py`)

> One LLM generates; another LLM evaluates + provides feedback; the loop runs until quality threshold is met OR refinement budget is exhausted.

**Constructor** (L70):
```python
EvaluatorOptimizerLLM(
    optimizer: Agent | AugmentedLLM,             # the generator
    evaluator: str | Agent | AugmentedLLM,       # the critic
    min_rating: QualityRating = QualityRating.GOOD,   # threshold
    max_refinements: int = 3,                    # budget
    llm_factory: Callable[[Agent], AugmentedLLM] | None = None,
)
```

**Quality tiers** (`QualityRating` L25):
- `POOR = 0` — major improvements needed
- `FAIR = 1` — several improvements
- `GOOD = 2` — minor improvements possible (DEFAULT threshold)
- `EXCELLENT = 3` — no improvements

**EvaluationResult** (L34) emitted per loop iteration: `rating`, `feedback`, `needs_improvement`, `focus_areas: List[str]`.

**Composes other workflows**: the `optimizer` parameter accepts any AugmentedLLM, including `Orchestrator`, `Router`, or `ParallelLLM` — wrapping them with a quality-gated refinement loop.

**Claude Code translation**: this is the **codex-review-gate** pattern at the wave-ship level. Codex GPT-5.5 plays evaluator; the Claude orchestrator plays optimizer; `min_rating` corresponds to the Codex-Verdict trailer requirement (`APPROVE` ≈ GOOD; `REVISE`/`NEEDS-REVISION` triggers another round; `BLOCK` is the budget-exhaustion / hard-fail terminal state). Per W331 P0.7 FRONTIER-PEER POLICY.

---

## 5. MCPAggregator (`src/mcp_agent/mcp/mcp_aggregator.py`)

> Aggregates N MCP servers into a single namespaced tool/prompt/resource surface. Tools become `<server_name>.<tool_name>`; collisions resolved via namespacing.

**Core types** (line refs):
- `NamespacedTool` (L52), `NamespacedPrompt` (L62), `NamespacedResource` (L72) — wrap upstream MCP `Tool`/`Prompt`/`Resource` with `namespaced_tool_name: server.tool`
- `MCPAggregator(ContextDependent)` (L82) — async context manager (`__aenter__`/`__aexit__` L97-101)

**Lifecycle methods**:
- `initialize(force: bool = False)` (L150) — connects to all configured servers + populates capability cache
- `load_server(server_name)` (L320), `load_servers(force=False)` (L451) — per-server / all-servers loading
- `refresh(server_name | None)` (L609) — re-fetch capabilities for one or all servers
- `close()` (L198) — shutdown

**Capability surface**:
- `list_servers() -> List[str]` (L622)
- `list_tools(server_name=None)` (L636), `list_prompts` (L958), `list_resources` (L681)
- `call_tool(name, arguments)` (L829) — parses `server.tool` namespace and dispatches
- `get_prompt(name)` (L1017), `read_resource(uri)` (L730)
- `_parse_capability_name` (L1169) — namespace parser (splits on first `.`)

**Compound server** (`MCPCompoundServer(Server)` L1375): exposes the aggregated surface AS its own MCP server via `run_stdio_async()` (L1451). The aggregator can be both consumer-of-many AND server-to-others — composable indefinitely.

**Claude Code translation**: this is exactly what `.mcp.json` does at the harness level — Claude Code IS the aggregator, each `mcpServers.<name>` entry is one upstream server, and tool calls land as `mcp__<plugin>_<server>__<tool>` (CC's namespacing scheme). The `MCPAggregator` pattern shows what a custom CC subagent / external coordinator could do if it wanted to programmatically curate which MCP servers an agent sees per-task (instead of static `.mcp.json`).

---

## How the 5 patterns compose (DAG sketch)

```
  ┌──────────────────────────────────────────────────────────┐
  │  EvaluatorOptimizerLLM  (refinement loop ≤ max_refinements)│
  │     ┌─────────────────────────┐    ┌────────────────────┐│
  │     │ optimizer (one of:)     │ ←→ │ evaluator (critic)  ││
  │     │   Orchestrator          │    └────────────────────┘│
  │     │   Router                │                          │
  │     │   ParallelLLM           │                          │
  │     │   plain AugmentedLLM    │                          │
  │     └──┬──────────────────────┘                          │
  └────────┼──────────────────────────────────────────────────┘
           ↓ (any of these consume tools through ↓)
  ┌──────────────────────────────────────────────────────────┐
  │  MCPAggregator  (N MCP servers → 1 namespaced surface)   │
  │     server_A.tool_1, server_A.tool_2, server_B.tool_1...  │
  └──────────────────────────────────────────────────────────┘
```

Router selects 1-of-N. ParallelLLM hits N-then-1. Orchestrator plans + delegates dynamically. Evaluator-Optimizer wraps any of them with a refinement loop. MCPAggregator is the tool-substrate they all share.

## When to use which (decision shortlist)

1. **"I need cheap classification → specialist"** → Router (LLM-classify or embedding-classify)
2. **"I have N independent perspectives or sections"** → ParallelLLM (sectioning) or ParallelLLM (voting)
3. **"I don't know how many steps until I start"** → Orchestrator (`plan_type="iterative"` for max safety)
4. **"Quality matters more than latency"** → wrap the chosen workflow in Evaluator-Optimizer
5. **"Many MCP servers, one agent"** → MCPAggregator (or rely on `.mcp.json` if static)

## Anti-patterns

- **Stacking Orchestrator inside Orchestrator** — explosive token cost (W321 Δ-PDM-2 budget mandate). If you need recursive planning, prefer `plan_type="iterative"` once + Evaluator-Optimizer wrapper.
- **Using ParallelLLM for sequentially-dependent subtasks** — fan-out is by-design stateless (`history = None`). Use Orchestrator instead.
- **Using Router when categories overlap >30%** — the LLM router will thrash; collapse the categories or use ParallelLLM-voting.
- **Long refinement loops without `min_rating` calibration** — Evaluator-Optimizer with `max_refinements > 5` AND `min_rating = EXCELLENT` is the L329-1 "ship-blocker-by-perfectionism" antipattern. Default to `GOOD` + `max_refinements=3` as the upstream package does.
- **MCPAggregator without `refresh()` on long-lived sessions** — capability cache goes stale when an upstream server hot-reloads tools.

## 3-org-distinct cite-anchors (CR-1 sca-v13 D2 / D5 floor)

1. **lastmile-ai/mcp-agent** — `https://github.com/lastmile-ai/mcp-agent` MIT @ `f62d849350816588b1c6294e7914bbe4d8b84072` (HEAD 2026-01-25; LastMile AI Inc) — implementation source
2. **Anthropic PBC** — `https://www.anthropic.com/research/building-effective-agents` (2024-12-19, Anthropic PBC) — canonical pattern taxonomy (router / parallelization / orchestrator-workers / evaluator-optimizer)
3. **CrewAI Inc** — `https://github.com/joaomdmoura/crewAI` MIT (`crewai.com` org) — independent multi-agent orchestrator-workers + router implementation; demonstrates the four-pattern taxonomy is substrate-independent rather than Anthropic-specific (W336 codex r1 REVISE-correction: replaced Anthropic-cookbooks here since cookbooks is Anthropic-controlled, not org-distinct)
4. **(supplementary, intra-org reference)** Anthropic claude-cookbooks — `https://github.com/anthropics/claude-cookbooks` `patterns/agents/` (orchestrator_workers.ipynb empty-response handler, evaluator_optimizer.ipynb refinement-loop, routing.ipynb, parallelization.ipynb) — reference implementations cited cross-skill by `parallel-dispatch-mandate` (NOT an independent third org; listed as supplementary alongside the canonical Anthropic blog)
5. **(supplementary, protocol)** Model Context Protocol spec — `https://modelcontextprotocol.io/specification` — MCPAggregator depends on the upstream MCP server contract (List Tools / Call Tool / List Prompts / Read Resource)
6. **(supplementary, second org-distinct)** Microsoft AutoGen — `https://github.com/microsoft/autogen` MIT (Microsoft Corp) — independent ParallelLLM-equivalent (group-chat fan-out + MaxMessageTermination); further evidence the ParallelLLM pattern is org-independent

## CR-conformance

- **CR-1** trust-tuple: lastmile-ai org, MIT license (in OK-list), HEAD 4-months-old (>30d aged per W331 axis-1#3), single-org (`lastmile-ai/mcp-agent`) — `T3 PATTERN-STUDY`-tier per sca-v13 §9, NOT T1 INSTALL.
- **CR-3** subagents: this skill informs subagent design; it does NOT itself spawn subagents.
- **CR-4** operator-curated: path-gated SKILL.md with description-match auto-fire per `https://code.claude.com/docs/en/skills`.
- **CR-6** verify-before-claim: every line-number reference above is reproducible via `grep -n '^class\|^    def\|^    async def' <file>` against the cited SHA in the cloned repo at `Z:/claude-sota-installed-repos/lastmile-ai-mcp-agent`.

## Independence-proof (sca-v13 D69 dense-rubric)

- **FOUNDATION-ANCHOR**: Anthropic's "Building effective agents" blog post 2024-12-19 (canonical taxonomy).
- **COUNTERFACTUAL**: IF lastmile-ai/mcp-agent were deleted from GitHub tomorrow, these five patterns would survive BECAUSE (a) Anthropic claude-cookbooks ships independent notebook implementations of all four (router / parallelization / orchestrator-workers / evaluator-optimizer); (b) MCPAggregator is structurally identical to the way Claude Code's own `.mcp.json` aggregates MCP servers — the namespacing pattern is intrinsic to the MCP spec; (c) CrewAI Inc (`crewai.com`) ships independent implementations of orchestrator-workers and router patterns; (d) Microsoft AutoGen ships independent ParallelLLM-equivalent (`MaxMessageTermination` + group-chat fan-out).
- **ORG-DISTINCT**: LastMile AI ≠ Anthropic PBC ≠ CrewAI Inc ≠ Microsoft.
- **TEMPORAL-DISTINCT**: Anthropic pattern taxonomy (2024-12-19) predates lastmile-ai/mcp-agent's current synthesis (2025-09-* onward).

The patterns survive substrate change; this SKILL.md is one of several substrate-instances.

## Provenance + verification

- Cloned to `Z:/claude-sota-installed-repos/lastmile-ai-mcp-agent` @ SHA `f62d849350816588b1c6294e7914bbe4d8b84072` (HEAD 2026-01-25).
- Five pattern files line-counted: router_base.py=277, evaluator_optimizer.py=478, orchestrator.py=716, parallel_llm.py=282, mcp_aggregator.py=1458 (total 3211 LOC studied; this SKILL.md condenses to ~210 LOC pointer-only).
- Companion `parallel-dispatch-mandate` SKILL.md F4/F5 explicitly cross-references the ParallelLLM + cookbook canonical empty-response handler.
- W335 P0-1 deliverable per `docs/architecture/W335-SOTA-CONVERGENCE-MAX/PASTE-BODY.txt` L31.
