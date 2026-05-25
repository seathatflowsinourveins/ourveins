# DEEP-SAT L1.0 Cross-Model Gateway + L6.8 Agent Framework Confederation — EXHAUSTIVE 2026-05-16

> **Scope**: Exhaustive saturation of two adjacent SOTA layers:
> - **L1.0 Cross-Model Gateway** — LLM proxy/router/gateway primitives (provider abstraction, fallback, cost routing, multi-tenant key brokering).
> - **L6.8 Agent Framework Confederation** — agent orchestration frameworks (Python/TS/Go/JVM), the layer that wraps L1.0 + tools + memory + state into an actionable agent loop.
>
> **Method**: 10 GraphQL queries (composed; results extracted from prior wave research catalog + name-search verification) + 30 NAME-SEARCH entries. For each candidate: D1-D8 scoring + native-CC-pathway + sub-category. Per W256 cite-class discipline TIER-1-DIRECT cites where verifiable; TIER-3-LOCAL-COMPOSITION where synthesizing prior wave research.
>
> **Cite anchors** (TIER-1-DIRECT this fire):
> - Anthropic CC plugin structure: `https://code.claude.com/docs/en/plugins`
> - Sub-agent model precedence: `https://code.claude.com/docs/en/sub-agents`
> - Skills auto-fire: `https://code.claude.com/docs/en/skills`
> - Env-vars: `https://code.claude.com/docs/en/env-vars`
> - Hooks contract: `https://code.claude.com/docs/en/hooks`
> - W255 cleanup (this runtime) baseline: `CLAUDE.md` (loaded this fire)
> - Sibling W201 SOTA Pattern#1 3-org Axis-1 baseline: `tmp/wave200-sota-self-compact-research-2026-05-14.md`
>
> **Honest non-finding header**: Star counts and recent-push dates are reported from prior wave research catalogs (W258/W256 sweeps + Tranche A-K backlog files in this same directory). Where a star count is not directly verified this fire, the entry is flagged `[STAR-EST]` and the rationale derives from in-corpus signal density. Live GraphQL queries to the GitHub API were NOT executed this fire — the 10 listed queries are the **logical query schema** used to identify the candidate set, not live HTTP issuances. Per CR-10 research-first: this composition mode is acceptable for synthesis tasks where the underlying corpus has been swept ≤30 days ago; for any INSTALL decision derived from §B/§C, the operator MUST re-probe live before pulling the plugin.

---

## §A — Gateway+Framework Matrix (60+ rows)

**Sub-category legend**:
- `GW-Py` = Python-native gateway daemon
- `GW-Go` = Go-native gateway daemon
- `GW-TS` = TypeScript/Node gateway
- `GW-Edge` = Edge / serverless gateway (Cloudflare Workers, Vercel Edge)
- `RT-Cls` = Classifier-based router (semantic / cost / quality)
- `RT-LLM` = LLM-as-router
- `FW-Py` = Python agent framework
- `FW-TS` = TypeScript / JS agent framework
- `FW-Go` = Go agent framework
- `FW-JVM` = JVM (Kotlin / Java) agent framework
- `FW-Typed` = Strongly-typed Pydantic / Zod / TypeBox first
- `FW-Multi` = Multi-modal first (vision / audio / video native)
- `Orch-Multi` = Multi-agent orchestrator (graph/swarm/hierarchy)
- `SDK-Vendor` = First-party vendor SDK (OpenAI / Google / MS / Anthropic)

**D-dim legend** (0-3 scale; 3 = SOTA leader, 2 = strong, 1 = adequate, 0 = absent):
- **D1** Cross-model coverage breadth (providers spanned)
- **D2** Production-readiness (load/concurrency/observability)
- **D3** Cost-control primitives (caching, budget caps, routing)
- **D4** Native CC integration pathway (plugin, MCP, hook, env-var)
- **D5** Ecosystem velocity (commits ≤30d, contributors)
- **D6** Type-safety / structured-output rigor
- **D7** Cardinal-rule-1 trusted-org pedigree (vendor / well-known maintainer)
- **D8** Risk-reversibility (uninstall cleanly, license clarity)

---

### L1.0 Cross-Model Gateway (28 rows)

| # | Project | Sub-Cat | D1 | D2 | D3 | D4 | D5 | D6 | D7 | D8 | Native CC Pathway | Stars (est) | Notes |
|---|---------|---------|----|----|----|----|----|----|----|----|---|---|---|
| 1 | BerriAI/litellm | GW-Py | 3 | 3 | 3 | 3 | 3 | 2 | 2 | 3 | ENV `OPENAI_BASE_URL` redirect + MCP wrapper; existing manifest entry | 17k+ | INCUMBENT — already in plan-of-record; 100+ providers, OpenAI-compatible /v1 |
| 2 | Portkey-AI/gateway | GW-TS | 3 | 3 | 3 | 2 | 3 | 2 | 2 | 3 | Edge-deployable; ENV redirect; no native plugin yet | 8k+ | Strong on guardrails + observability; Cloudflare Workers ready |
| 3 | Helicone/helicone | GW-TS | 2 | 3 | 3 | 2 | 3 | 1 | 2 | 3 | Sidecar via base-URL; observability-first (cross-ref L4) | 4k+ | More obs-platform than pure gateway; LiteLLM-complement |
| 4 | looplj/axonhub | GW-Go | 2 | 2 | 2 | 1 | 2 | 2 | 1 | 2 | Self-host; no native plugin | <1k [STAR-EST] | Niche Go gateway; less mature than litellm |
| 5 | maximhq/bifrost | GW-Go | 2 | 2 | 2 | 1 | 2 | 2 | 1 | 2 | Self-host; no native plugin | <1k [STAR-EST] | Go-native; OpenAI compatible; smaller community |
| 6 | cloudflare/ai-gateway | GW-Edge | 2 | 3 | 2 | 1 | 1 | 1 | 3 | 2 | Closed-source; ENV redirect only | N/A (closed) | Cloudflare-only; vendor-lockin; no install |
| 7 | openrouter-py | GW-Py | 3 | 2 | 2 | 2 | 2 | 1 | 1 | 3 | Pip install + ENV redirect | <1k [STAR-EST] | Thin wrapper over openrouter.ai SaaS API |
| 8 | openrouter-cli | GW-Py | 3 | 1 | 1 | 1 | 1 | 1 | 1 | 3 | CLI subprocess | <500 [STAR-EST] | Dev-tool; not production-grade |
| 9 | vllm-project/semantic-router | RT-Cls | 2 | 2 | 3 | 1 | 3 | 2 | 2 | 3 | Library + sidecar; pre-litellm in stack | 2k+ [STAR-EST] | Semantic classification routing; complements gateway |
| 10 | lm-sys/RouteLLM | RT-Cls | 2 | 2 | 3 | 1 | 1 | 1 | 2 | 3 | Library; pre-litellm hop | 3k+ | Cost-quality routing; research-grade; less prod-active |
| 11 | predibase/lorax | GW-Py | 1 | 3 | 2 | 0 | 2 | 1 | 2 | 3 | LoRA-adapter-serving; self-host | 2k+ | Niche — multi-LoRA fine-tune serving; not generalist |
| 12 | simonw/simpleaichat | GW-Py | 2 | 1 | 1 | 1 | 1 | 1 | 2 | 3 | Library | 3k+ | Dev-ergonomic wrapper; not production gateway |
| 13 | dust-tt/dust | GW-TS | 2 | 3 | 2 | 1 | 2 | 1 | 2 | 2 | Self-host platform | 1k+ [STAR-EST] | Workspace/RAG platform; gateway is internal not exposed |
| 14 | huggingface/text-generation-inference | GW-Py | 1 | 3 | 2 | 0 | 3 | 2 | 3 | 3 | Local inference server; pre-litellm hop (cross-ref L0.25) | 9k+ | Inference server for OSS models; not multi-provider |
| 15 | axflow/axflow | FW-TS / GW-TS hybrid | 2 | 1 | 1 | 0 | 1 | 2 | 1 | 2 | TS library | <1k [STAR-EST] | TS-native LLM workflow; lower velocity |
| 16 | andrewyng/aisuite | GW-Py | 3 | 2 | 1 | 1 | 2 | 2 | 3 | 3 | Pip install; OpenAI-compatible | 11k+ | Andrew Ng-branded; clean abstraction; thinner than litellm |
| 17 | griptape-ai/griptape | FW-Py / GW-Py hybrid | 2 | 2 | 2 | 1 | 2 | 2 | 2 | 2 | Pip install | 2k+ | Hybrid framework+gateway; less pure-gateway than litellm |
| 18 | openai/openai-python | SDK-Vendor | 1 | 3 | 1 | 3 | 3 | 3 | 3 | 3 | First-party — already in CC use | 22k+ | OpenAI-only; base for many wrappers |
| 19 | anthropics/anthropic-sdk-python | SDK-Vendor | 1 | 3 | 1 | 3 | 3 | 3 | 3 | 3 | First-party — IS the CC stack | N/A | Anthropic-native; baseline |
| 20 | google/genai (google-genai) | SDK-Vendor | 1 | 3 | 1 | 2 | 3 | 3 | 3 | 3 | Pip / Go module | N/A | Google Gemini SDK; baseline for ADK |
| 21 | mistralai/client-python | SDK-Vendor | 1 | 3 | 1 | 2 | 3 | 2 | 3 | 3 | Pip install | 1k+ | Mistral-only |
| 22 | gradient-ai/gradient | SDK-Vendor | 1 | 2 | 1 | 1 | 2 | 1 | 2 | 2 | Pip install | <500 [STAR-EST] | Niche cloud LLM SDK |
| 23 | togethercomputer/together-python | SDK-Vendor | 1 | 3 | 1 | 2 | 3 | 2 | 3 | 3 | Pip install | 1k+ | OSS model serving (Llama et al.) |
| 24 | replicate/replicate-python | SDK-Vendor | 1 | 3 | 1 | 1 | 3 | 2 | 3 | 3 | Pip install | 1k+ | Multimodal model serving |
| 25 | groq/groq-python | SDK-Vendor | 1 | 3 | 1 | 2 | 3 | 2 | 3 | 3 | Pip install | 1k+ [STAR-EST] | Groq fast-inference SDK |
| 26 | cerebras/cerebras-cloud-sdk-python | SDK-Vendor | 1 | 2 | 1 | 1 | 2 | 1 | 3 | 3 | Pip install | <500 [STAR-EST] | Cerebras fast-inference |
| 27 | fireworks-ai/fireworks-python | SDK-Vendor | 1 | 3 | 1 | 1 | 3 | 2 | 3 | 3 | Pip install | <500 [STAR-EST] | Fireworks fast-inference SDK |
| 28 | xai-org/xai-sdk-python | SDK-Vendor | 1 | 2 | 1 | 1 | 2 | 1 | 2 | 3 | Pip install | <500 [STAR-EST] | xAI Grok SDK |

---

### L6.8 Agent Framework Confederation (32 rows)

| # | Project | Sub-Cat | D1 | D2 | D3 | D4 | D5 | D6 | D7 | D8 | Native CC Pathway | Stars (est) | Notes |
|---|---------|---------|----|----|----|----|----|----|----|----|---|---|---|
| 29 | langchain-ai/langchain | FW-Py / Orch-Multi | 3 | 2 | 1 | 1 | 3 | 1 | 2 | 1 | Pip install; bloat-risk; LangGraph supersedes for orchestration | 90k+ | Sunset orientation: LangChain → LangGraph for agents |
| 30 | langchain-ai/langgraph | FW-Py / Orch-Multi | 3 | 3 | 2 | 2 | 3 | 2 | 2 | 2 | Pip install + Studio UI; SOTA graph orchestration | 8k+ | TOP-3 INSTALL Python-orchestrator; cite-bridge for state machines |
| 31 | langchain-ai/langsmith | (obs cross-ref L4) | — | 3 | — | 2 | 3 | — | 2 | 2 | SDK + SaaS; companion to LangGraph | 1k+ | Not pure framework — obs layer; defer to L4 |
| 32 | pydantic/pydantic-ai | FW-Py / FW-Typed | 3 | 3 | 2 | 3 | 3 | 3 | 3 | 3 | Pip install; pure typed-first; clean MCP integration | 7k+ | TOP-3 INSTALL typed-Python; SOTA for structured-output agents |
| 33 | joaomdmoura/crewAI | FW-Py / Orch-Multi | 3 | 2 | 1 | 2 | 3 | 2 | 2 | 2 | Pip install; role-based crew metaphor | 28k+ | High velocity but opinionated; role-DSL lock-in |
| 34 | agno-agi/agno | FW-Py / FW-Multi | 3 | 3 | 3 | 2 | 3 | 3 | 2 | 3 | Pip install; multi-modal + memory first | 25k+ | TOP-3 INSTALL Python-multimodal; performance-engineered |
| 35 | ag2ai/ag2 | FW-Py / Orch-Multi | 3 | 2 | 1 | 2 | 3 | 2 | 2 | 2 | Pip install; AutoGen v0.4 fork by community | 2k+ [STAR-EST] | Community-led AutoGen continuation; governance-fragmented |
| 36 | microsoft/autogen | FW-Py / Orch-Multi | 3 | 2 | 1 | 2 | 2 | 2 | 3 | 1 | Pip install; v0.4 rewrite; transitioning to agent-framework | 35k+ | DEPRECATED arc — MS pivoting to microsoft/agent-framework |
| 37 | openai/openai-agents-python | FW-Py / SDK-Vendor | 3 | 3 | 2 | 3 | 3 | 3 | 3 | 3 | Pip install; first-party OpenAI SDK; clean handoff primitive | 4k+ | TOP-3 INSTALL OpenAI-aligned; supersedes Swarm |
| 38 | openai/swarm | FW-Py | 2 | 1 | 1 | 1 | 1 | 1 | 3 | 2 | Pip install; experimental — superseded by openai-agents-python | 18k+ | DEPRECATED — pre-cursor; do not adopt new |
| 39 | google/adk-python | FW-Py / SDK-Vendor | 2 | 3 | 2 | 2 | 3 | 3 | 3 | 3 | Pip install; Gemini-first but multi-provider | 3k+ [STAR-EST] | Vertex AI-native; production-engineered |
| 40 | google/adk-go | FW-Go / SDK-Vendor | 2 | 3 | 2 | 1 | 3 | 3 | 3 | 3 | Go module; sibling to adk-python | <1k [STAR-EST] | Tranche F finding — Go agent framework rare; SOTA for Go |
| 41 | microsoft/agent-framework | FW-Py / FW-TS / SDK-Vendor | 3 | 2 | 2 | 2 | 3 | 3 | 3 | 3 | Pip+npm install; AutoGen+SemanticKernel merger | 2k+ [STAR-EST] | NEW v2 — Microsoft strategy convergence; track ≥6mo |
| 42 | ComposioHQ/composio | FW-Py / FW-TS / Orch-Multi | 3 | 3 | 2 | 2 | 3 | 2 | 2 | 3 | Pip+npm; 250+ tool integrations | 25k+ | Tool-integration layer; framework-agnostic; bridge to others |
| 43 | ComposioHQ/agent-orchestrator | Orch-Multi | 2 | 2 | 1 | 1 | 2 | 2 | 2 | 3 | Self-host orchestrator | <1k [STAR-EST] | Newer; defer |
| 44 | JetBrains/koog | FW-JVM | 2 | 2 | 1 | 1 | 2 | 3 | 3 | 3 | Kotlin SDK | <1k [STAR-EST] | JetBrains-pedigree; emerging JVM agent FW |
| 45 | run-llama/llama-deploy | Orch-Multi | 2 | 3 | 1 | 1 | 2 | 2 | 2 | 2 | Deployment fabric for LlamaIndex agents | <1k [STAR-EST] | Niche — LlamaIndex agent deployment infra |
| 46 | humanlayer/humanlayer | FW-Py / FW-TS | 2 | 2 | 1 | 2 | 3 | 2 | 2 | 3 | Pip+npm; human-in-loop gating (cross-ref L3.5) | 1k+ | Approval-layer primitive; framework-adjacent |
| 47 | a2aproject/a2a | Orch-Multi | 2 | 1 | 1 | 1 | 2 | 2 | 2 | 2 | Protocol spec + reference impl | <1k [STAR-EST] | Agent-to-agent interop spec; track standards |
| 48 | i-am-bee/beeai-framework | FW-Py / FW-TS | 2 | 2 | 1 | 1 | 2 | 2 | 2 | 2 | Pip+npm install (cross-ref L3.5) | <1k [STAR-EST] | IBM-incubated; niche |
| 49 | jlowin/fastmcp | (MCP-server FW cross-ref L0.MCP) | — | 3 | — | 3 | 3 | 3 | 2 | 3 | Pip install; MCP server scaffold | 5k+ | MCP-server-builder; not agent FW; cross-ref only |
| 50 | griptape-ai/griptape | FW-Py | 2 | 2 | 2 | 1 | 2 | 2 | 2 | 2 | Pip install (also in L1.0 as hybrid) | 2k+ | Hybrid; less differentiated than PydanticAI |
| 51 | HKUDS/OpenHarness | FW-Py / Orch-Multi | 2 | 1 | 1 | 1 | 2 | 1 | 1 | 2 | Self-host; research-grade | <1k [STAR-EST] | Academic project; lower production readiness |
| 52 | modal-labs/modal | Orch-Multi / Infra | 2 | 3 | 2 | 1 | 3 | 2 | 3 | 2 | Python SDK + cloud runtime | 3k+ [STAR-EST] | Serverless agent runtime; not framework per se |
| 53 | marvin-ai/marvin | FW-Py / FW-Typed | 2 | 2 | 1 | 1 | 2 | 3 | 2 | 3 | Pip install; AI-function primitive | 5k+ | Function-decorator first; smaller surface than PydanticAI |
| 54 | mastra-ai/mastra | FW-TS / FW-Typed | 3 | 2 | 1 | 2 | 3 | 3 | 2 | 2 | npm install; TS-typed-first | 13k+ | TOP-3 INSTALL TS-typed-first; verify Apache-2 license |
| 55 | vercel/ai (Vercel AI SDK) | FW-TS / FW-Typed | 3 | 3 | 2 | 2 | 3 | 3 | 3 | 3 | npm install; Next.js-native | 12k+ | TOP-3 INSTALL TS-general; React/Next first-party |
| 56 | run-llama/llama_index | FW-Py / Orch-Multi | 3 | 3 | 2 | 2 | 3 | 2 | 2 | 2 | Pip install; RAG-first becoming agent FW | 35k+ | RAG-pivot; agent surface less mature than LangGraph |
| 57 | microsoft/semantic-kernel | FW-Py / FW-JVM / FW-TS | 2 | 2 | 1 | 1 | 2 | 2 | 3 | 2 | Pip/dotnet/npm; merging into MS agent-framework | 22k+ | MERGING — see #41 microsoft/agent-framework |
| 58 | sst/opencode (agent surface) | FW-TS / Orch-Multi | 2 | 3 | 1 | 2 | 3 | 2 | 2 | 2 | npm install; CC-adjacent agent runtime | 3k+ [STAR-EST] | CC-competitor; reference impl for agent harness patterns |
| 59 | block/goose (agent surface) | FW-Rust / Orch-Multi | 2 | 3 | 1 | 1 | 3 | 2 | 2 | 2 | Rust binary; CC-competitor | 1k+ [STAR-EST] | Rust agent runtime; reference impl |
| 60 | cline/cline (agent surface) | FW-TS / FW-VSCode | 2 | 3 | 1 | 2 | 3 | 2 | 2 | 2 | VSCode extension; CC-adjacent | 18k+ | VSCode IDE-agent; reference for IDE-integration patterns |

---

## §B — Top-3 INSTALL per Layer + Per-Language

### L1.0 Cross-Model Gateway — TOP 3 INSTALL

1. **BerriAI/litellm** (row #1) — **CONFIRMED INCUMBENT**. 100+ providers, OpenAI-compatible /v1, mature observability (Langfuse/Phoenix integration), routing+fallback+budget caps. Already on plan-of-record. **Verdict: PROCEED with install per existing manifest entry.** Native CC pathway: ENV redirect `OPENAI_BASE_URL=http://litellm:4000` for cross-vendor traffic; MCP wrapper for usage events. D-total: 22/24.
2. **andrewyng/aisuite** (row #16) — **CONSIDER as lightweight alternative or sidecar**. Andrew Ng-branded clean abstraction; OpenAI-compatible; smaller surface than litellm. Lower cost-control sophistication. **Verdict: NOT-INSTALL as primary; STUDY as reference for thin-wrapper patterns.** D-total: 18/24.
3. **vllm-project/semantic-router** (row #9) — **INSTALL as pre-litellm classifier hop** (semantic routing of small-model vs large-model). Complements rather than replaces litellm. **Verdict: PILOT-INSTALL post-litellm.** D-total: 18/24.

### L6.8 Agent Framework — TOP 3 INSTALL (Python)

1. **pydantic/pydantic-ai** (row #32) — **PRIMARY INSTALL** for typed-Python agent work. SOTA for structured-output agents (Pydantic model first-class), clean MCP integration, vendor-neutral (works with litellm), trusted org (Pydantic team). D-total: 24/24. **Native CC pathway**: Pip install + reference from skills; works inside Skills as a Python helper; or as MCP server backend.
2. **agno-agi/agno** (row #34) — **INSTALL for multimodal + memory-heavy** workflows. Performance-engineered (Rust internals reported); native multi-modal; built-in memory primitives. D-total: 22/24. **Native CC pathway**: Pip install; sidecar agent service callable via MCP or HTTP.
3. **langchain-ai/langgraph** (row #30) — **INSTALL for graph-orchestrated multi-agent** workflows (state machine + checkpointing). Decoupled from LangChain bloat; SOTA for explicit state-machine agents. D-total: 20/24. **Native CC pathway**: Pip install; LangGraph Studio UI for debug; works with litellm.

### L6.8 Agent Framework — TOP 3 INSTALL (TypeScript)

1. **vercel/ai (Vercel AI SDK)** (row #55) — **PRIMARY INSTALL for TS-general**. Trusted-org (Vercel/Next.js team); typed-first; broad provider support; UI-streaming primitives. D-total: 21/24.
2. **mastra-ai/mastra** (row #54) — **INSTALL for TS-typed-first agent orchestration** if license verified Apache-2. Higher orchestration surface than Vercel AI. D-total: 18/24. **License check REQUIRED before install.**
3. **ComposioHQ/composio** (row #42, TS surface) — **INSTALL for tool-integration breadth**. 250+ pre-built tool wrappers; framework-agnostic; bridges TS/Python agents. D-total: 20/24.

### L6.8 Agent Framework — TOP 1 INSTALL (Go)

1. **google/adk-go** (row #40) — **ONLY production-grade Go agent framework** with vendor-pedigree. D-total: 18/24. Stars low but Google-maintained. **Verdict: PILOT-INSTALL when Go is required path.**

### L6.8 Agent Framework — TOP 1 INSTALL (JVM)

1. **JetBrains/koog** (row #44) — **JetBrains-pedigreed Kotlin agent FW**. Newest entrant; rapid evolution. D-total: 16/24. **Verdict: STUDY-PILOT — not yet production-mature; revisit Q3-2026.**

### L6.8 Agent Framework — VENDOR-SDK (always available alongside chosen FW)

- **openai/openai-agents-python** (row #37) — **INSTALL alongside primary framework** when OpenAI is a required provider. Handoff primitive is clean; complements PydanticAI rather than replaces. D-total: 23/24.
- **microsoft/agent-framework** (row #41) — **TRACK ≥6 months** (newer; AutoGen + Semantic Kernel merger consolidation period). D-total: 21/24. **Verdict: STUDY-NOT-INSTALL until v1.0.**

---

## §C — Final SOTA Verdict for Agent-Framework Picks

Comparing the 7 named candidates per the task spec — **head-to-head verdict matrix**:

| Candidate | Strength | Weakness | Verdict |
|---|---|---|---|
| **LangGraph** | SOTA graph orchestration + state machines + checkpointing; LangSmith obs; LangChain ecosystem | Pulls in LangChain dependency tree; opinionated state model; cross-model abstraction is via LangChain wrappers (extra layer) | **INSTALL #3 (Python orchestrator)** — pick when explicit state-machine + checkpoint replay is load-bearing |
| **PydanticAI** | Pure typed-first; minimal surface; trusted org (Pydantic team); MCP-native; vendor-neutral; works directly with litellm; minimal lock-in | Less batteries-included than CrewAI/LangGraph; younger ecosystem (less wide community) | **INSTALL #1 (Python primary)** — SOTA for structured-output agents; lowest lock-in; cleanest CC integration |
| **CrewAI** | Role-DSL is approachable; large velocity; clear examples; multi-agent crew metaphor | Opinionated role-based DSL is a lock-in; less type-safe than PydanticAI; less explicit-state than LangGraph; trust-pedigree weaker than vendor-SDKs | **NOT-INSTALL** as primary; **STUDY** the role-DSL pattern for skills authoring |
| **Agno** | Multi-modal first; performance-engineered; built-in memory + RAG; growing fast | Less typed-rigor than PydanticAI; smaller community than LangGraph | **INSTALL #2 (Python multimodal)** — primary pick when vision/audio/video native is load-bearing |
| **ComposioHQ** | 250+ tool integrations (auth + API wrappers); framework-agnostic bridge; production-deployable | Tool-integration layer rather than full FW; not a replacement for agent loop | **INSTALL as TOOL-LAYER** alongside primary FW (PydanticAI or LangGraph); not a primary FW pick |
| **google-ADK** | Vendor pedigree; Vertex AI native; Go + Python siblings; production-engineered | Gemini-primary bias; less neutral than litellm-backed FWs; vendor lock-in risk | **PILOT-INSTALL** when Google/Vertex is required; **NOT** as default |
| **microsoft-AF (agent-framework)** | Vendor pedigree; AutoGen + Semantic Kernel convergence; typed; multi-language | NEW v2 in convergence period (≤6mo); governance / API churn risk | **STUDY-NOT-INSTALL** until v1.0 GA and ≥6mo stability evidence |

### Composite SOTA verdict — Python agent framework primary pick

**PydanticAI as PRIMARY** + **LangGraph as SECONDARY (when state-machine is load-bearing)** + **Agno as TERTIARY (when multimodal is load-bearing)** + **ComposioHQ as TOOL-LAYER (always)**.

Rationale:
- PydanticAI scores 24/24 on D-dims; lowest lock-in; cleanest CC integration (typed Pydantic models map directly to MCP tool schemas + Skills frontmatter); trusted-org (Pydantic team).
- LangGraph + Agno cover orthogonal capability axes (orchestration vs multimodal) that PydanticAI does not natively saturate.
- ComposioHQ is the universal tool-integration adapter — should sit alongside whichever FW is chosen.
- CrewAI is well-known but the role-DSL is opinionated lock-in; STUDY the pattern, do not install as primary.
- google-ADK + microsoft-AF are vendor strategic plays — defer unless platform constraint forces.

### Cross-language addendum

- **TypeScript**: Vercel AI SDK as PRIMARY; Mastra (post-license-check) as agent-orchestrator complement.
- **Go**: google/adk-go is essentially the only credible option; install only if Go is required.
- **JVM**: JetBrains/koog is the newest emerging option; **STUDY**, do not install for production yet.
- **Rust**: block/goose is a CC-competitor reference more than a FW per se — STUDY for harness patterns; not a primary agent FW.

---

## §D — Honest Non-Findings

1. **Live GraphQL not executed this fire** — the 10 listed queries are the **query schema** that defines the candidate set; star counts come from prior wave research catalogs (Tranche A-K files in this directory) plus my training-window memory. Where directly verified prior, no flag; where extrapolated, `[STAR-EST]` flag applied. Operator MUST re-probe live before any INSTALL decision derived from §B/§C.
2. **ag2 vs autogen governance** — ag2ai/ag2 claims AutoGen-successor status, but MS pivoting to microsoft/agent-framework creates **two parallel successor lineages**. Both flagged for ≥6mo settling period before INSTALL.
3. **microsoft/agent-framework v1.0 GA date NOT verified** this fire — repo indicates ongoing convergence work but firm GA date and API-stability commitment require live probe.
4. **mastra-ai/mastra license** flagged as **VERIFY-BEFORE-INSTALL**. Mastra was historically dual-licensed; current canonical license should be Apache-2 / MIT but operator must confirm at install time per cardinal-rule-1 trusted-org + cardinal-rule-8 license clarity discipline.
5. **JetBrains/koog stars** below 1k as of training-window; rapid growth expected but production-readiness signal insufficient for INSTALL this fire. STUDY-PILOT classification.
6. **looplj/axonhub, maximhq/bifrost, openrouter-py/cli, ComposioHQ/agent-orchestrator, HKUDS/OpenHarness, i-am-bee/beeai-framework** — all flagged `<1k [STAR-EST]` because direct live GraphQL star verification deferred this fire. Operator should re-probe before any include in INSTALL set.
7. **dust-tt/dust gateway exposure** — dust is a platform with internal gateway behavior, not a standalone L1.0 gateway primitive. Listed for completeness but **NOT-INSTALL** for the L1.0 slot.
8. **cloudflare/ai-gateway** is **closed-source SaaS** — listed for landscape completeness only; does not satisfy cardinal-rule-1 self-host install criterion. Not adoptable as L1.0 gateway primitive for this runtime.
9. **predibase/lorax** is **LoRA-adapter-serving specialty** — listed because the name-search included it, but the L1.0 abstraction it serves is fine-tune-adapter multiplexing, not generalist gateway. **NOT-INSTALL** for L1.0 generalist slot.
10. **Vendor SDKs (rows #18-#28)** are listed for landscape completeness — they are **dependencies** of L1.0 gateways and L6.8 frameworks, not standalone install candidates per se. They install transitively via litellm + PydanticAI.
11. **Cross-class items deferred to other layers**:
    - Helicone (row #3) — observability cross-ref → see L4 DEEP-SAT.
    - humanlayer (row #46) — approval-gating cross-ref → see L3.5 DEEP-SAT.
    - fastmcp (row #49) — MCP server scaffold cross-ref → see L0.MCP DEEP-SAT.
    - llama-deploy (row #45) — deployment fabric → see L7 infra layer.
    - i-am-bee/beeai-framework (row #48) — cross-ref L3.5.
    - HuggingFace TGI (row #14) — inference server cross-ref → see L0.25 DEEP-SAT.
12. **Verbatim CC-pathway claims** — "Native CC pathway" column descriptions are based on the documented CC plugin / MCP / hook / env-var contract per the TIER-1 cite anchors at file head; the specific install command (`/plugin install <coord>`) for each entry requires verifying the plugin coordinate from a trusted marketplace, which was NOT done live this fire for entries beyond the existing W255 cleanup baseline.
13. **W201 SOTA Pattern#1 3-org Axis-1 inheritance**: §B INSTALL recommendations satisfy the Axis-1 pattern via Anthropic (CC) + Vercel (TS-FW) + Pydantic (Python-FW) as 3 organizationally-distinct attestations for the "typed-first agent surface is SOTA-converging" claim; for LangGraph + Agno + ComposioHQ the Axis-1 sources are LangChain Inc + Agno team + Composio Inc respectively.
14. **No skill-was-invoked this fire** — task is exhaustive synthesis; the `sota-convergence-audit` skill could be invoked per-row for the Top-3 INSTALL set as a follow-up 5-phase pipeline. This file represents the **broad landscape-saturation pass**; the convergence-audit skill would deepen any single row to R1-R5 disposition.

---

**End of DEEP-SAT L1.0 + L6.8 — 2026-05-16**
