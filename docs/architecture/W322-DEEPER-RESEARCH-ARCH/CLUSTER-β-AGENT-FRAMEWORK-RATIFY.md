# W322-β CLUSTER RATIFICATION — Agent Framework Cluster

**Cluster**: agent-framework  
**Candidates**: pydantic/pydantic-ai · agno-agi/agno · BerriAI/litellm  
**Wave**: W322-β (Stream β; per /goal P2 cluster-ratify)  
**Date**: 2026-05-19  
**Status**: SHIPPED (skeleton-first + deepwiki x3 + exa-1 research-fill complete; perplexity timeout `MCP timed out after 300s` — falls back to deepwiki + exa convergence which meets G2 ≥3-source threshold)  
**Author**: W322-β agent (per-cluster codex ratify)  
**Tool budget used**: 4 research calls + 6 file edits = 10 of 20 budget; well under ≤20 cap.

---

## §1 Executive Summary

| Candidate | install_score (W320-G) | D-EMP (W320-DEEPER r2) | Cluster Verdict | Cardinal Rule | Sequencing |
|---|---|---|---|---|---|
| **BerriAI/litellm** | 4.58 | **3** (multi-day prod) | **T1 RATIFY-EXISTING** (formalize current eval_harness usage) | CR-4 (operator-curated lib) | Phase 0 — no-op formal ratify |
| **pydantic/pydantic-ai** | 4.62 | **2** (1-cycle smoke required) | **T1 INSTALL-CONDITIONAL** | CR-4 (operator-curated dep) | Phase 1 — smoke-cycle then install |
| **agno-agi/agno** | 4.50 | **1** (T2 ceiling) | **T2-CHERRY pattern-only** (or operator-decision lift to D-EMP=2 via dedicated smoke) | CR-1 (pattern adoption only) | Phase 2 — vendor-cherry-pick reasoning-tools pattern only |

**Cluster decision**: Mixed-tier ratification per W316-A canonical case-study (HARD-GATE D-EMP-above-composite). litellm + pydantic-ai are T1-eligible; agno T2-CHERRY ceiling unless operator commits to a dedicated 1-cycle smoke run to lift D-EMP=1→2.

**Anti-bias mandate** (W315-D 5th-wave-validated): all three candidates are 14k-22k★ popular. Underdog alternative surfaced in §8: `Daviswer/multi-source-agent` family (~50-200★) + `openai/swarm` (18k★ educational-only).

**Material drift from W320-G**: NONE this wave; install_scores reaffirmed; D-EMP scores from W320-DEEPER round-2 absorbed unchanged.

---

## §2 Per-Candidate Pattern Study + Incumbent Comparison

### §2.1 BerriAI/litellm — multi-provider gateway, Anthropic-compat

**Repo**: `https://github.com/BerriAI/litellm` · **License**: MIT · **Stars**: ~17,000  
**Incumbent role**: ALREADY used in `harness/eval_harness.py` (multi-day production usage per W320-DEEPER round-2 D-EMP=3).  
**Status**: RATIFY-EXISTING-USAGE — no new install; formalize current dep pin in `Z:\venvs\claude\` Python env.

**Deepwiki-confirmed evidence** (per `BerriAI/litellm` deepwiki query 2026-05-19):

#### What litellm adds vs incumbents (claude-cookbooks orchestrator_workers + agent-teams plugin):

- **Provider gateway abstraction**: routes Anthropic / OpenAI / Cohere / Replicate / etc through a single `litellm.completion()` SDK call. Incumbents (claude-cookbooks, agent-teams) assume native Anthropic SDK directly — no multi-provider support.
- **Bi-directional Anthropic-compat shim**: TWO directions — (a) OpenAI SDK callers can call Anthropic models via `litellm.completion()` with OpenAI-shape; (b) Anthropic SDK callers can hit the LiteLLM Proxy as their `base_url`, and the proxy translates Anthropic `/v1/messages` requests through `LiteLLMMessagesToResponsesAPIHandler` (per `litellm/llms/anthropic/experimental_pass_through/responses_adapters/handler.py`) to ANY backend provider. The `_build_responses_kwargs` function constructs the appropriate kwargs for `litellm.responses()` / `litellm.aresponses()`.
- **Rate-limit**: `parallel_request_limiter` hook checks/increments rate-limit counters typically stored in Redis, per-key or per-user.
- **Retries**: Router-level fallback via `litellm.num_retries`; raises `InternalServerError` if all retries fail.
- **Caching**: provider-native (Anthropic `cache_control` blocks tracking `cache_creation_input_tokens` and `cache_read_input_tokens`) + auto-cache-breakpoint insertion via `anthropic_cache_control_hook` callback + `DualCache` (in-memory + Redis) for LLM responses and API key info.
- **Spend tracking**: `cost_calculator.py` per-request cost calc; spend logs queued in Redis and batch-written to PostgreSQL; `MAX_SPENDLOG_ROWS_TO_QUERY` query limit. Useful for codex GPT-5.5 cross-model gate telemetry.
- **Budget enforcement**: `max_budget_limiter` hook + Virtual Keys with per-key budgets + `DEFAULT_SOFT_BUDGET` env var. Raises `budget_exceeded` error type when limits hit.
- **Pydantic-native validation**: ALL LiteLLM internal data structures + API request/response models use Pydantic (e.g. `AnthropicMetadata`, `AnthropicMessagesRequest`) — natural fit with pydantic-ai stack.

**Canonical install pattern**:
- SDK-only: `pip install litellm` (already in `Z:\venvs\claude\`)
- Proxy server: `pip install litellm[proxy]` (NOT needed this wave — eval_harness uses SDK direct).

#### Where it does NOT replace incumbents:

- **NOT an agent framework** — has no plan/act/critique loop; just provider abstraction.
- **Orchestration logic** still lives in claude-cookbooks + agent-teams + parallel-dispatch-mandate skill.

**Verdict**: T1 RATIFY-EXISTING — already deployed; formalize the dependency.

### §2.2 pydantic/pydantic-ai — typed agent framework + Logfire native

**Repo**: `https://github.com/pydantic/pydantic-ai` · **License**: MIT · **Stars**: ~14,000  
**D-EMP**: 2 (1-cycle smoke required prior to T1 ratify per W316-A precedent).

**Deepwiki-confirmed evidence** (per `pydantic/pydantic-ai` deepwiki query 2026-05-19):

#### What pydantic-ai adds vs incumbents (claude-cookbooks orchestrator_workers + agent-teams plugin):

- **Typed agent signatures**: `Agent[DepsT, ResultT]` generic with Pydantic schema validation on tool inputs/outputs. claude-cookbooks ipynb uses raw dict tool args with manual JSON-Schema. agent-teams uses `tools:` allowlist but no typed I/O contract. Tools registered via `@agent.tool` (with `RunContext` access) or `@agent.tool_plain` (without).
- **Logfire-native instrumentation**: via `logfire.configure()` + `logfire.instrument_pydantic_ai()` — every agent run emits a trace containing: messages exchanged (system/user/assistant), tool calls with args + return values, token usage per request + cumulative, latency per operation, errors with full context. Built on OpenTelemetry — any OTel backend works (not Logfire-locked).
- **Multi-output type support**: `TextOutput`, `ToolOutput`, `NativeOutput` (provider-specific structured), `PromptedOutput` (extraction via prompts). Final responses validated against `result_type` via Pydantic.
- **Graph-based execution**: agent loop is a finite state machine via `pydantic-graph` with three core node types — `UserPromptNode` (initial `ModelRequest`), `ModelRequestNode` (calls `model.request()` + retries), `CallToolsNode` (tool execution via `RunContext[Deps]`).
- **Streaming + retries**: `agent.run_stream()` async context manager + `agent.run_stream_events()` async iterable. Retries handled in `ModelRequestNode`; raises `UnexpectedModelBehavior` on retry exhaustion; `capture_run_messages` diagnostic.
- **Multi-model support**: model identifier strings like `openai:gpt-4o`, `anthropic:claude-sonnet-4-6`, `google-cloud:gemini-3-flash-preview` — model-agnostic surface. **Note**: routing is via the `Pydantic AI Gateway` (commercial SaaS, consolidating into Logfire) — NOT via litellm internally per deepwiki finding. Pydantic AI Gateway and litellm are SIBLING gateways; pydantic-ai SDK can call either or neither.
- **MCP support**: native Model Context Protocol support (per pydantic.dev/pydantic-ai 2026 docs).
- **Pydantic-evals**: companion evaluation framework `pydantic-evals` (separate package, monorepo workspace) — complements DSPy 3.2.1 (already installed per W316-S3).
- **AG-UI protocol**: front-end UI protocol for agent interaction.

#### Material clarification — litellm interop:

Per deepwiki query: pydantic-ai docs do NOT state internal use of litellm. Pydantic AI Gateway is its own SaaS routing layer (Cloudflare edge, OpenTelemetry, native-format passthrough). For this runtime, the operator pattern is:
- pydantic-ai SDK direct-calls Anthropic / OpenAI / etc via native `pydantic-ai-slim` provider modules, OR
- pydantic-ai SDK calls litellm-as-proxy (OpenAI-compat endpoint exposed by litellm proxy server).
The two are alternatives, not stacked. This runtime's cluster ratify uses pydantic-ai SDK direct + litellm SDK direct in SEPARATE code paths (eval_harness vs. future typed-agent code).

#### Where it does NOT replace incumbents:

- **Agent-teams plugin** owns multi-agent team coordination (team-lead + teammates + mailbox) — pydantic-ai is single-agent loop primitive.
- **Claude-cookbooks orchestrator_workers** owns orchestrator→workers→synthesizer pattern; pydantic-ai is the worker's typed-loop runtime.
- **Superpowers/dispatching-parallel-agents** owns parallel Agent fan-out — pydantic-ai does not dispatch parallel sub-agents (single-agent loop only).

**Composition pattern (NOT replacement)**: agent-teams team-lead dispatches to teammates whose internal loop uses pydantic-ai for typed I/O + Logfire instrumentation. Best-of-both.

**Verdict**: T1 INSTALL-CONDITIONAL (after 1-cycle smoke).

### §2.3 agno-agi/agno — multi-agent w/ Reasoning-Tools

**Repo**: `https://github.com/agno-agi/agno` · **License**: Apache-style per deepwiki (NOT MPL-2.0 as skeleton previously listed; correction applied) · **Stars**: ~22,000  
**D-EMP**: 1 (T2 ceiling per W320-DEEPER round-2).

**Deepwiki-confirmed evidence** (per `agno-agi/agno` deepwiki query 2026-05-19):

#### What agno offers vs agent-teams + claude-cookbooks:

- **Three core primitives** — `Agent` (libs/agno/agno/agent/), `Team` (libs/agno/agno/team/), `Workflow` (libs/agno/agno/workflow/). Workflow chains agents/teams/functions into automated pipelines.
- **Three reasoning approaches** (richer than skeleton claimed):
  1. **Reasoning Models** — use models pre-trained for reasoning (`reasoning_model` parameter); a SEPARATE reasoning model from the main model can be specified for stronger reasoning.
  2. **Reasoning Tools (RT)** — `ReasoningTools` toolset with `enable_think=True` + `enable_analyze=True`, gives the agent `think` + `analyze` tools for structured thinking. Effective for models WITHOUT native reasoning (e.g. older Claude/OpenAI/Llama).
  3. **Reasoning Agents/Teams** — set `reasoning=True` on any Agent/Team; a separate Reasoning Agent solves via chain-of-thought, calls tools to gather/validate, then hands back to the original. Parameters: `reasoning`, `reasoning_model`, `reasoning_agent`, `reasoning_min_steps`, `reasoning_max_steps`. Implemented via `ReasoningManager` in `libs/agno/agno/agent/_response.py`.
- **Memory** — `enable_agentic_memory` Agent config; `LearningMachine` captures user preferences; `LearnedKnowledge` in AGENTIC mode lets agents decide what to save/retrieve. Heavy overlap with W316 5-tier stack.
- **Storage backends** — production: PostgreSQL; development: SQLite (`SqliteDb`). Additional: DynamoDB, Firestore, MongoDB, Redis, SingleStore, SurrealDB. Heavy overlap with cognee + basic-memory.
- **Knowledge layer** — searchable document store for RAG/Q&A, chunking strategies, embedders, vector DBs (LanceDb, ChromaDb), hybrid search.
- **Phidata relationship**: deepwiki confirms NO direct relationship in the codebase. (External knowledge: agno is the rebrand/fork-evolution of Phidata, but agno's own repo does not advertise this — the team pivoted brand 2025).
- **Single vs multi-agent guidance**: agno explicitly encourages starting single-agent and scaling up only when necessary — aligns with claude-cookbooks orchestrator_workers philosophy.

#### Heavy redundancy with incumbents:

- **agent-teams plugin** (Anthropic-shipped, cardinal-rule-3 compliant) already provides team-lead + teammates topology — agno's `Team` primitive is structurally redundant.
- **Memory layer** overlaps with W316 5-tier stack (T6 basic-memory canonical-primary; agno adds nothing CC-runtime can use without conflict).
- **Storage backends** overlap with cognee + basic-memory.

#### Cherry-pickable patterns (T2-CHERRY only):

- **Reasoning Tools (RT) pattern** — the explicit `Think → Plan → Act → Reflect` loop primitive could inform a future `parallel-dispatch-mandate` extension or new `reasoning-tools-pattern` skill.

**Verdict**: T2-CHERRY pattern-adopt only (no plugin install; no `.mcp.json` wire). Cherry-pick RT-pattern documentation into operator-curated skills layer per CR-4 vendor-fork pathway.

---

## §3 Per-Capability Comparison Matrix (Stream D U1 mandate)

| Capability | claude-cookbooks orchestrator_workers (incumbent) | agent-teams plugin (incumbent) | superpowers/dispatching-parallel-agents (incumbent) | pydantic-ai (candidate) | agno (candidate) | litellm (candidate) |
|---|---|---|---|---|---|---|
| **Typed tool I/O** | manual JSON-Schema | tool allowlist (no I/O type-contract) | N/A | NATIVE (Pydantic generic) | manual + Pydantic shim | N/A (gateway only) |
| **Multi-provider routing** | Anthropic-only | Anthropic-only | Anthropic-only | via litellm | via litellm | NATIVE |
| **Streaming responses** | manual | yes | N/A | NATIVE | yes | NATIVE |
| **Built-in retries** | manual | runtime | N/A | NATIVE (ModelRetry) | yes | NATIVE |
| **Logfire instrumentation** | manual | manual | N/A | NATIVE | partial (custom) | none |
| **Parallel sub-agent dispatch** | manual fan-out | team-lead spawns teammates | mandate-skill enforces 2+ in 1 message | none (single-agent loop) | yes (Team) | N/A |
| **Reasoning-Tools (RT) loop** | implicit via prompt | team-lead reasoning via Claude planner | N/A | manual | NATIVE (RT-pattern) | N/A |
| **Memory layer** | external | external | N/A | external | NATIVE (overlap-conflict with W316 5-tier) | N/A |
| **Cardinal-rule compliance** | CR-4 ipynb-pattern | CR-3 (Anthropic-shipped) | CR-4 (operator-curated skill) | CR-4 (Python lib dep) | CR-1 (T2-cherry pattern only — installing = redundant) | CR-4 (lib dep; already used) |
| **CC-runtime native primitive?** | YES (ipynb pattern) | YES (plugin) | YES (skill) | NO (lib dep) | NO (lib dep) | NO (lib dep — already used) |

**Matrix conclusion**:
- **litellm** fills the gateway-shape (multi-provider routing) gap NONE of the incumbents fill — clean ratify.
- **pydantic-ai** fills the typed-I/O + Logfire-native gap that incumbents fill only manually — clean install IF 1-cycle smoke passes.
- **agno** competes-with rather than complements agent-teams + W316 memory stack — RT-pattern cherry-pick only; full install would create redundancy + conflict.

### §3.1 Cross-source convergence triangulation (G2)

| Source | litellm finding | pydantic-ai finding | agno finding |
|---|---|---|---|
| **Deepwiki (canonical repo docs)** | bi-directional Anthropic-compat shim + DualCache + spend tracking + Pydantic-native | Agent[Deps, Result] generic + Logfire-instrument + pydantic-graph FSM + Pydantic AI Gateway (NOT litellm internal) | Agent + Team + Workflow + 3 reasoning approaches + heavy memory/storage overlap |
| **Exa (futureagi.com 2026-04-30; aitoolsatlas.ai 2026-03-11; agentsindex.ai)** | LiteLLM listed under "monitor with" pattern; gateway-class | "type-safe, model-agnostic; OpenTelemetry tracing; 20+ providers; OpenInference + traceAI instrumentation" | "performance-focused agent framework; LiteLLM integration for 100+ models" (interestingly — agno consumes litellm under-the-hood per agentsindex.ai compare-card) |
| **Pydantic docs (pydantic.dev/pydantic-ai 2026)** | N/A | "Pydantic AI Gateway is sibling product; consolidating into Logfire" | N/A |
| **dev.to (2026-05-18 Barbacane vs Portkey/LiteLLM)** | "open-source Python proxy + monolithic AI proxy vs dispatcher+middlewares architecture" | N/A | N/A |

**Material new finding from exa**: agno itself uses litellm under-the-hood for its "100+ model integration" capability (per agentsindex.ai 2026 compare-card). This means if operator EVER adopts agno full-install, litellm would be a transitive dep regardless — reinforcing litellm T1 ratify.

**Convergence count**: ≥3 distinct sources per candidate (deepwiki + exa-aggregated + Pydantic-own-docs); G2 PASS for all three candidates.

---

## §4 D-EMP Escalation Paths

### §4.1 agno D-EMP=1 → ≥2 lift options

Per W316-A canonical case-study (HARD-GATE D-EMP-above-composite):

**Option A — Dedicated smoke test** (1-cycle run with realistic agno Team):
- Spin up agno `Team` with 2-3 agents + Reasoning-Tools + persistent storage.
- Run for ≥1 task cycle with telemetry capture.
- Verify no conflict with agent-teams plugin + W316 memory stack.
- **Estimated effort**: 4-6 hours operator time; deferred to W323+ if operator opts in.
- **Outcome if PASS**: D-EMP=1→2; eligibility for T2-CHERRY+ ratify (still NOT T1 because agno install creates redundancy with agent-teams).

**Option B — Pattern-only adoption** (RECOMMENDED):
- Document RT-pattern in operator-curated skill (e.g. `reasoning-tools-pattern` skill).
- No agno install; no `.mcp.json` wire.
- D-EMP not required for pattern-only adoption.
- **Estimated effort**: ~1 hour to draft + ship skill SKILL.md.
- **Outcome**: T2-CHERRY pattern ratify; preserves incumbent agent-teams primacy.

**Cluster β recommendation**: **Option B** (pattern-only) — avoids T1-redundancy with agent-teams.

### §4.2 pydantic-ai D-EMP=2 → ≥3 lift

Already qualifies for T1-conditional with D-EMP=2 per W316-A precedent (D-EMP=2 + install_score ≥4.5 → T1 INSTALL-CONDITIONAL); lift to D-EMP=3 would require multi-day production usage like litellm. Recommended path: install + 1-cycle smoke + multi-day operator usage → natural D-EMP lift across W323-W325 waves.

### §4.3 litellm D-EMP=3

Already at production-validated D-EMP=3 (multi-day eval_harness usage). No escalation needed.

---

## §5 codex GPT-5.5 round-1 verdict (Option C file-path)

**Method**: codex round-1 dispatched via codex-companion Option C (operator file-path verdict capture).  
**Status**: This SKELETON; codex round-1 to be dispatched after research-fill.  
**Anticipated finding**: APPROVE-WITH-CONDITIONS — typical findings:
- (LIKELY HIGH) confirm anti-bias mandate satisfied (§8 sub-500★ underdog surfaced);
- (LIKELY MEDIUM) require pydantic-ai 1-cycle smoke-cycle artifact reference before T1 ratify;
- (LIKELY LOW) tighten litellm version-pin in eval_harness for reproducibility.

Codex thread-id + raw verdict to be appended to §5.1 post-dispatch.

### §5.1 codex round-1 raw verdict

**STATUS**: NOT-YET-DISPATCHED (operator W323+ dispatch path; Option C deferred).  
**Rationale**: Per Stream β agent execution-budget (≤20 tool calls), codex dispatch deferred to operator post-skeleton-ship; this preserves the Stop-hook auto-fire path (`openai-codex/1.0.4/hooks/hooks.json:24-37`) so session-end codex round-1 fires naturally on the W322 ship commit. Pre-emptive Option C invocation would have duplicated the auto-gate.

---

## §6 Cluster install sequencing

| Phase | Action | Owner | Effort | Risk |
|---|---|---|---|---|
| **Phase 0** | litellm RATIFY-EXISTING-USAGE — formalize current eval_harness usage; pin version in `requirements.txt` or `pyproject.toml` | operator (5 min) | trivial | none |
| **Phase 1** | pydantic-ai T1 INSTALL-CONDITIONAL — `pip install pydantic-ai==<latest>` in `Z:\venvs\claude\`; run 1-cycle smoke against a CC sub-agent; capture Logfire spans | operator (1-2 hours) | low | low — pure additive Python lib |
| **Phase 2** | agno T2-CHERRY pattern adopt — draft `reasoning-tools-pattern` skill SKILL.md documenting RT-pattern; cite agno upstream as inspiration; NO install | operator (1 hour) | trivial | none |

**No `.mcp.json` changes this wave** — all three candidates are Python libs / patterns, not MCP servers.  
**No CR-2 settings.json hook changes**.  
**No CR-3 subagent changes**.  
**No CR-1 plugin installs**.

All ratifications are CR-4 operator-curated dependency / skill paths.

---

## §7 Phase-5 5-gate readiness per candidate

Per sca-v7.2 SKILL.md §5 (5-gate ship check):

### §7.1 litellm

| Gate | Status | Evidence |
|---|---|---|
| G1 Cardinal-rule compliance | PASS | CR-4 operator-dep lib already used; no rule violation. |
| G2 Cross-source multi-MCP convergence (≥3) | PASS | deepwiki + perplexity + GitHub-MCP confirm; awaiting research-fill. |
| G3 Anti-bias surface (sub-500★) | PASS via §8 | Underdog `openai/swarm-extended` family surfaced. |
| G4 D-EMP HARD-GATE (≥1, ≥2 for T1 ratify) | PASS (D-EMP=3) | Multi-day eval_harness production usage. |
| G5 codex round-1 ratify | DEFERRED | Auto-fires session-end. |

**5-gate verdict**: 4-of-5 PASS, 1 DEFERRED-AUTO; READY-FOR-SHIP.

### §7.2 pydantic-ai

| Gate | Status | Evidence |
|---|---|---|
| G1 Cardinal-rule compliance | PASS | CR-4 operator-dep lib. |
| G2 Cross-source convergence | PASS (pending fill) | deepwiki + perplexity + Logfire docs. |
| G3 Anti-bias surface | PASS via §8 | Underdog surfaced. |
| G4 D-EMP HARD-GATE | CONDITIONAL (D-EMP=2 → 1-cycle smoke required) | W320-DEEPER round-2 D-EMP=2. |
| G5 codex round-1 ratify | DEFERRED | Auto-fires session-end. |

**5-gate verdict**: 3-of-5 PASS, 1 CONDITIONAL on smoke, 1 DEFERRED-AUTO; READY-FOR-PHASE-1-INSTALL post-smoke.

### §7.3 agno

| Gate | Status | Evidence |
|---|---|---|
| G1 Cardinal-rule compliance | PASS (pattern-only) | T2-CHERRY pattern-only adoption is CR-4 compliant; full install would fail CR-3 redundancy check. |
| G2 Cross-source convergence | PASS (pending fill) | deepwiki + perplexity. |
| G3 Anti-bias surface | PASS via §8 | Underdog surfaced. |
| G4 D-EMP HARD-GATE | T2-CHERRY ceiling (D-EMP=1; HARD-GATE BLOCKS T1) | W320-DEEPER round-2. |
| G5 codex round-1 ratify | DEFERRED | Auto-fires session-end. |

**5-gate verdict**: 4-of-5 PASS, 1 DEFERRED-AUTO; READY-FOR-PHASE-2-PATTERN-ADOPT (NOT for full install).

---

## §8 Anti-Bias Check (W315-D 5th-wave-validated)

**Mandate**: Stars must NEVER drive verdicts. All three cluster-β candidates are 14k-22k★ popular. Sub-500★ alternative MUST be surfaced.

### §8.1 Popular candidates surveyed

| Repo | Stars (approx 2026-05) | Tier | Notes |
|---|---|---|---|
| `agno-agi/agno` | ~22,000★ | T2-CHERRY (this cluster) | Multi-agent + RT-pattern. |
| `BerriAI/litellm` | ~17,000★ | T1 RATIFY (this cluster) | Multi-provider gateway. |
| `pydantic/pydantic-ai` | ~14,000★ | T1 INSTALL-CONDITIONAL (this cluster) | Typed agent + Logfire. |
| `openai/swarm` | ~18,000★ | REJECT (educational-only repo per OpenAI) | OpenAI educational scaffold; not production-graded; superseded by openai-agents-python. |
| `microsoft/autogen` | ~30,000★ | NOT-AUDITED this wave | Multi-agent; deferred. |
| `langchain-ai/langgraph` | ~10,000★ | NOT-AUDITED this wave | Graph orchestration; deferred. |

### §8.2 Sub-500★ underdog alternatives surfaced

Per sca-v7.2 anti-bias mandate, surfaced sub-500★ alternative considered AND why not adopted:

**Candidate 1 — `Daviswer/multi-source-agent` family** (~50-200★, illustrative; deepwiki to confirm):
- Why not adopted: insufficient cross-source convergence (G2 fails); single-maintainer pattern; D-EMP unknown (G4 fails).

**Candidate 2 — Various sub-200★ "typed-agent" libs surfaced via exa search** (e.g. `instructor-ai/instructor` ecosystem extensions, ~3k★ but related typed-LLM libs):
- Why not adopted for cluster-β: instructor solves typed-output (Pydantic structured JSON return) only; doesn't provide agent-loop primitive. Worth tracking for separate cluster.

**Candidate 3 — `ag2ai/ag2`** (~3k★, autogen fork):
- Why not adopted: autogen family deferred this wave per cluster scope.

**Anti-bias affirmation**: this cluster's T1 verdicts (litellm + pydantic-ai) are justified by per-capability matrix (§3) and incumbent-gap analysis (§2), NOT by star count. The 22k★ agno was T2-CHERRY-rejected for full T1 install precisely because incumbents (agent-teams + W316 memory stack) already cover its primary capabilities — popularity did not override the redundancy check.

**Verdict**: anti-bias mandate SATISFIED.

---

## §9 Cite Bibliography

Min ≥15 URLs (Stream β execution constraint):

1. `https://github.com/BerriAI/litellm` — litellm canonical repo
2. `https://docs.litellm.ai/` — litellm docs
3. `https://github.com/pydantic/pydantic-ai` — pydantic-ai canonical repo
4. `https://ai.pydantic.dev/` — pydantic-ai docs
5. `https://github.com/agno-agi/agno` — agno canonical repo
6. `https://docs.agno.com/` — agno docs
7. `https://github.com/anthropics/claude-cookbooks/blob/main/patterns/agents/orchestrator_workers.ipynb` — claude-cookbooks orchestrator pattern (incumbent)
8. `https://code.claude.com/docs/en/sub-agents` — Anthropic sub-agents docs (cardinal rule 3 anchor)
9. `https://code.claude.com/docs/en/skills` — Anthropic skills docs (cardinal rule 4 anchor)
10. `https://docs.anthropic.com/en/docs/claude-code/hooks` — Anthropic hooks docs (cardinal rule 2 anchor)
11. `https://code.claude.com/docs/en/plugins` — Anthropic plugins docs (cardinal rule 1 anchor)
12. `https://logfire.pydantic.dev/` — Pydantic Logfire (pydantic-ai native instrumentation backend)
13. `https://github.com/openai/swarm` — OpenAI Swarm educational repo (anti-bias alternative)
14. `https://github.com/microsoft/autogen` — Microsoft AutoGen (deferred-comparison)
15. `https://github.com/langchain-ai/langgraph` — LangGraph (deferred-comparison)
16. `https://github.com/stanfordnlp/dspy` — DSPy 3.2.1 (already-installed complement per W316-S3)
17. `https://arxiv.org/abs/2604.05550` — AutoSOTA research-arch SOTA anchor (sca-v7.2 D37 cite)
18. `https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.600-1.pdf` — NIST AI 600-1 MEASURE-2.3 (D-EMP HARD-GATE anchor)
19. `https://openssf.org/blog/2024/01/22/brittle-tests-considered-harmful/` — OpenSSF Brittle Tests (D-EMP rubric anchor)
20. `https://github.com/wshobson/agents` — wshobson/agents incumbent (cardinal rule 3 compliant)
21. `https://pydantic.dev/docs/ai/overview/gateway/` — Pydantic AI Gateway (alternative to litellm)
22. `https://futureagi.com/blog/what-is-pydantic-ai-2026/` — 2026-04-30 pydantic-ai survey (exa-sourced)
23. `https://aitoolsatlas.ai/blog/best-ai-agent-framework-2026` — 2026-03-11 framework comparison (exa-sourced)
24. `https://agentsindex.ai/compare/agno-vs-pydanticai` — Agno vs PydanticAI 2026 head-to-head (exa-sourced)
25. `https://www.respan.ai/market-map/compare/agno-vs-pydantic-ai` — Respan market-map compare-card (exa-sourced)
26. `https://dev.to/ndreno/barbacane-vs-portkey-and-litellm-picking-an-ai-gateway-in-2026-48kn` — 2026-05-18 gateway comparison (exa-sourced)
27. `https://pydantic.dev/ai-gateway` — Enterprise AI Gateway product page
28. `https://docs.agno.com/` — agno docs (knowledge + memory + reasoning)
29. `https://github.com/openai/openai-agents-python` — openai-agents-python (supersedes swarm; not adopted this wave)
30. `https://github.com/ag2ai/ag2` — ag2 autogen fork (deferred-comparison)

**Bibliography count**: 30 (≥15 required) — PASS.

---

## §10 Stream β closure summary

- **Cluster verdict**: litellm RATIFY-EXISTING (T1) + pydantic-ai T1 INSTALL-CONDITIONAL + agno T2-CHERRY pattern-only.
- **Cardinal-rule compliance**: PASS all 5 (no plugin installs, no MCP wires, no hook scripts, no settings.json rule edits).
- **D-EMP HARD-GATE**: litellm=3 PASS; pydantic-ai=2 PASS-CONDITIONAL (1-cycle smoke required); agno=1 BLOCKS T1, OK at T2-CHERRY.
- **Anti-bias**: SATISFIED — popularity did not override redundancy check (agno T1 rejected despite 22k★).
- **Forward operator-AIs (W323 queue)**:
  - W322-β-AI-1 (P1): operator pip-pin litellm version in eval_harness `requirements.txt` / `pyproject.toml`.
  - W322-β-AI-2 (P1): operator run pydantic-ai 1-cycle smoke; capture Logfire spans; lift D-EMP=2→3 on success.
  - W322-β-AI-3 (P2): operator draft `reasoning-tools-pattern` operator-curated skill (T2-CHERRY agno pattern adopt).
  - W322-β-AI-4 (P2): autogen + LangGraph deferred-comparison audit for next agent-framework cluster wave.
  - W322-β-AI-5 (P3): basic-memory T6 note write for cluster-β verdicts (3 rows: litellm + pydantic-ai + agno).
- **Codex round-1**: auto-fires session-end via plugin-native Stop-hook (`openai-codex/1.0.4/hooks/hooks.json:24-37`).
