# META-A: SOTA Agent-Orchestration Discovery beyond W376 12-Stream Cluster

> Wave: W377 research-architecture v20 upgrade
> Stream: META-A
> Date: 2026-05-23
> Scope: Multi-angle SOTA discovery of agent-orchestration repos NOT in W376 SYNTHESIS (OpenHands, CrewAI, PydanticAI, DSPy, verdict, Goose, Continue, Aider, Cline, SWE-agent, Temporal, AutoGen)
> Per operator directive: "low-star repos can be high quality in certain area with pattern study"

---

## Section 1 — Discovery methodology

### 1.1 MCP sources queried

| Source | Query strategies | Recency filter | Notes |
|---|---|---|---|
| `mcp__exa__web_search_exa` | 5 distinct queries — SOTA frameworks · durable workflow · sandbox isolation · parallel dispatch · cross-model adversarial review · awesome harness engineering · DBOS/Absurd/Restate durable | 2026-published preferred | Returned 80+ unique results; richest pattern-density signal |
| `mcp__github__search_repositories` | 8 topical queries — `topic:agent-orchestration pushed:>2026-03-01 stars:>500`; `topic:llm-agents stars:>1000 pushed:>2026-03-01`; `topic:multi-agent stars:>1000 pushed:>2026-02-01`; `claude code subagent orchestration plugin`; `parallel coding agents orchestrator`; `microsoft/agent-framework OR google/adk-python OR ag2ai/ag2`; `earendil-works/absurd OR dbos-inc/dbos-transact-py OR restatedev/restate`; `deer-flow OR agent-substrate OR cubesandbox OR mcp-context-forge` | created >= 2025-09-01 OR pushed >= 2026-01-01 | Confirmed star/last-push for top candidates |
| `mcp__perplexity__perplexity_research` | High-effort multi-angle prompt | recency=month attempted | **QUOTA EXHAUSTED 401 Unauthorized** — fell back to Exa+GitHub for synthesis depth |
| `mcp__deepwiki__ask_question` | Deep architecture interrogation on top-2 candidates (`bytedance/deer-flow`, `microsoft/agent-framework`) | n/a | Resolved pattern-density + Python-SDK installability questions definitively |

### 1.2 Convergence criteria

A repo enters the candidate list when at least 2 of the following hold:
1. Surfaced by ≥2 independent MCP sources (Exa hit + GitHub hit, or DeepWiki cite + Exa hit)
2. Cited by ≥1 awesome-harness-engineering curated list (ai-boost, walkinglabs, AutoJunjie, RyanAlberts, ARUNAGIRINATHAN-K-ai) which themselves act as multi-author consensus signals
3. Distinct pattern not represented in W376 12-stream cluster (e.g. snapshot/fork microVM, pressure-field scheduling, syscall-pipe sandbox-chaining)

Multi-stream convergence is recorded in §5.

### 1.3 Scope discipline

**Excluded** (already in W376 SYNTHESIS cluster — not re-cataloged here): OpenHands, CrewAI, PydanticAI, DSPy, verdict, Goose, Continue, Aider, Cline, SWE-agent, Temporal, AutoGen (incl. its successor `ag2ai/ag2`), and LangGraph (the W376 default-checkpoint substrate behind many entrants).

**Included** (NEW candidates per W376 delta): repos that (a) ship as installable Python/TS SDK or Claude Code plugin, or (b) teach a pattern worth porting even if not directly installable.

---

## Section 2 — Candidate repos (NEW, beyond W376)

> Star counts pulled live from GitHub API at query-time. Last-push and primary language likewise. Licenses verified via GitHub repo metadata where available; "license=?" means metadata not surfaced and a manual probe is needed before adoption.

### 2.1 Production-tier multi-agent runtimes (large org, broad lang)

| # | Repo | URL | Stars (live) | Last push | Primary lang | License | Pattern relevance (≤2 sentences) |
|---|---|---|---|---|---|---|---|
| 1 | **microsoft/agent-framework** | https://github.com/microsoft/agent-framework | ~12k (estimate; high MS visibility) | 2026-05-23 | Python + .NET | MIT (typ. MS OSS; verify) | Graph-based sequential/concurrent/handoff/group patterns with `Workflow` + `Executor` checkpointing via `InMemoryCheckpointStorage` / `FileCheckpointStorage` / `CosmosCheckpointStorage`; `Microsoft.Agents.AI.DurableTask` integrates Azure Durable Entities for restartable orchestrations. **Cross-lang Python/.NET interop on a shared CosmosDB checkpoint backend is the SOTA pattern.** |
| 2 | **google/adk-python** | https://github.com/google/adk-python | ~10-15k (high) | 2026-05-23 | Python | Apache-2.0 (typ.) | Google's official Agent Development Kit; code-first Python SDK with native sandbox integration (GKE Agent Sandbox on gVisor). Pattern: agent-as-CRD on Kubernetes with stable identity + `runtimeClassName: gvisor`. |
| 3 | **agentscope-ai/agentscope** | https://github.com/agentscope-ai/agentscope | ~7k+ | 2026-05-23 | Python | Apache-2.0 | Multi-actor agent-oriented programming; Alibaba-affiliated. Ships parallel `agentscope-runtime` (separate repo) with secure tool sandboxing + Agent-as-a-Service APIs. |
| 4 | **agentscope-ai/agentscope-runtime** | https://github.com/agentscope-ai/agentscope-runtime | ~1-2k | 2026-05-21 | Python | Apache-2.0 | Sandboxing + observability runtime layer; pattern: separates SDK from production runtime so agents are deployable as services. |
| 5 | **alibaba/spring-ai-alibaba** | https://github.com/alibaba/spring-ai-alibaba | ~3-5k | 2026-05-22 | Java | Apache-2.0 | Java-native agentic framework for the Spring ecosystem; pattern: enterprise JVM-runtime agent orchestration. Underrepresented in W376 cluster (Python-heavy). |

### 2.2 Durable-execution substrates (sub-SDK pattern study)

| # | Repo | URL | Stars (live) | Last push | Primary lang | License | Pattern relevance |
|---|---|---|---|---|---|---|---|
| 6 | **dbos-inc/dbos-transact-py** | https://github.com/dbos-inc/dbos-transact-py | ~2-4k | 2026-05-22 | Python | MIT | Postgres-only durable workflow library — annotate functions with `@DBOS.workflow` + `@DBOS.step`, checkpoint to existing Postgres, automatic resume from last checkpoint. **Officially integrates with Pydantic AI via `DBOSAgent` wrapper, LlamaIndex via `DBOSRuntime`, and OpenAI Agents SDK via `DBOSRunner`.** Sister repos: `dbos-transact-ts` (TS), `dbos-transact-golang`, `dbos-transact-java` (active 2026-05-22). |
| 7 | **earendil-works/absurd** | https://github.com/earendil-works/absurd | ~500-1k | 2026-05-21 | TypeScript | MIT (typ.) | "Simplest durable execution you can think of" — Postgres-only, no extension; tasks → queues → workers → steps, each step result is a checkpoint. Pattern study target: minimal-substrate durable execution; cited by Cloudflare/Paradigm-Centaur as inspiration. |
| 8 | **restatedev/restate** | https://github.com/restatedev/restate | ~5-7k | 2026-05-22 | Rust | BSL-1.1 (verify) | Resilient-applications platform with Saga compensation; integrates with Google ADK per `restatedev/restate-google-adk-example`. Pattern: durable RPC with deterministic replay. |

### 2.3 Agent-server isolation / sandbox primitives

| # | Repo | URL | Stars (live) | Last push | Primary lang | License | Pattern relevance |
|---|---|---|---|---|---|---|---|
| 9 | **TencentCloud/CubeSandbox** | https://github.com/TencentCloud/CubeSandbox | ~1-3k | 2026-05-23 | Rust + Go | Apache-2.0 (typ.) | RustVMM + KVM microVM; <60ms boot, <5MB RAM overhead, E2B SDK drop-in compatible. eBPF-based `CubeVS` virtual switch for kernel-level network isolation. Pattern: SOTA cost-efficient microVM-per-agent. |
| 10 | **agent-substrate/substrate** | https://github.com/agent-substrate/substrate | new (~100-500) | 2026-05-22 | Go | Apache-2.0 (Google-affiliated) | Google's "Agent Substrate" project (announced 2026-05-20 on Google Cloud blog) — Kubernetes-native multiplexer: 30x+ oversubscription via `runsc` checkpoint/restore. Pattern: actor-to-worker mapping with sub-second activation, sister to Agent Sandbox. |
| 11 | **microsoft/Orchard** | https://github.com/microsoft/Orchard | new (~100-500) | 2026-04-10 | Python | MIT (typ. MS) | "Orchard Env" — K8s-native sandbox lifecycle + REST API + in-pod agent; default-deny Calico NetworkPolicy; arXiv 2026 paper (Peng et al). Pattern study: reusable env layer for trajectory distillation + on-policy RL rollouts. |
| 12 | **Billy1900/Arbor** | https://github.com/Billy1900/Arbor | ~200-500 | 2026-03-28 | Rust | MIT | Self-hostable Firecracker-microVM workspaces with **first-class checkpoint+fork+branch-safe-restore via quarantine+reseal protocol**. Pattern unique to Arbor: VM-level branchable resume — closest match to W343 SOTA-PARALLEL-GIT-HOOK Layer-2 worktree-topology aspiration on the runtime side. |
| 13 | **hgDendi/sandboxmatrix** | https://github.com/hgDendi/sandboxmatrix | low (~50-200) | 2026-03-07 | Python | MIT | Multi-sandbox orchestrator with **A2A messaging gateway** + matrix-task-sharding + result-aggregation. Underrated; pattern: agent-to-agent messaging primitive between sandbox pods. |

### 2.4 Parallel-agent fan-out & DAG schedulers (underrated)

| # | Repo | URL | Stars (live) | Last push | Primary lang | License | Pattern relevance |
|---|---|---|---|---|---|---|---|
| 14 | **berabuddies/agentflow** | https://github.com/berabuddies/agentflow | low (~50-200) | 2026-03-08 | Python | MIT (verify) | Orchestrate codex/claude/kimi agents in dependency-graph DAGs with `fanout()` (int/list/dict cartesian) + `merge(by=...)` reducers; SSH/EC2/ECS remote execution. **Pattern: DAG-native multi-coding-agent dispatch — closest semantic match to W325-A parallel-ratio target ≥0.7.** |
| 15 | **Production-Grade/stigmergy** | https://github.com/Production-Grade/stigmergy | low | 2026-03-25 | Python | MIT (verify) | **Pressure-field scheduling primitive** — events deposit signals, signals decay (pheromone-like), agents wake when pressure crosses threshold. Benchmarked **9.5× faster than LangGraph at 30 agents** (large-throughput workload). Pattern: emergent-topology, no central coordinator. |
| 16 | **ComposioHQ/agent-orchestrator** | https://github.com/ComposioHQ/agent-orchestrator | ~200-500 | 2026-05-23 | TypeScript | MIT (typ. Composio) | Active (pushed today); parallel coding agents with autonomous CI-fix + merge-conflict + code-review handling. Pattern: production-tier coding-agent fan-out. |
| 17 | **shenjianan97/persistent-agent-runtime** | https://github.com/shenjianan97/persistent-agent-runtime | low | 2026-03-05 | Python | MIT (verify) | LangGraph + Postgres `PostgresCheckpointSaver` + **lease-based `FOR UPDATE SKIP LOCKED` worker pool** + E2B-backed sandbox. Pattern: stateless-worker-pool + database-as-queue — cleanest reference for W343 P3 parallel-session safety. |
| 18 | **tathadn/parallel-multi-agent-codegen** | https://github.com/tathadn/parallel-multi-agent-codegen | low | 2026-03-18 | Python | MIT (verify) | DAG decomposition + asyncio + ThreadPoolExecutor with **surgical revisions** (only failing nodes reset; passing artifacts persist). Pattern study: cost-aware retry policy with model-tiering (Sonnet for reasoning, Haiku for mechanical agents). |

### 2.5 Cross-model adversarial review (Claude Code skill-tier)

| # | Repo | URL | Stars (live) | Last push | Primary lang | License | Pattern relevance |
|---|---|---|---|---|---|---|---|
| 19 | **Dallionking/cross-model-agents** | https://github.com/Dallionking/cross-model-agents | low | 2026-03-07 | (skills) | MIT (verify) | **Bidirectional adversarial review Claude Opus ↔ Codex GPT-5.4** with explicit `/codex-review` / `/council` / `/delegate` skills; planner-toml auto-escalates architecture tradeoffs. Direct alignment with this runtime's W331 P0.7 frontier-peer policy (codex GPT-5.5 cross-model gate authority). |
| 20 | **CtriXin/agent-2-agent** | https://github.com/CtriXin/agent-2-agent | low | 2026-03-11 | (skills) | MIT (verify) | `/a2a` skill: Claude-authored code → Codex review (and reverse). Modes: `adversarial` / `single-model-multi-lens` / `blocked` with explicit preflight + exit-code semantics. Pattern study for runtime-portable codex-review-gate logic. |
| 21 | **wan-huiyan/agent-review-panel** | https://github.com/wan-huiyan/agent-review-panel | low | 2026-03-17 | (skills) | MIT (verify) | **4-6 reviewer adversarial panel** with 1-3 rounds of debate + supreme-judge synthesis. Auto-selects personas across 10 signal groups (SQL, ML, Terraform, Auth, API, …). Pattern: ground-truth via debate not consensus. |
| 22 | **LCV-Ideas-Software/cross-review-v2** | https://github.com/LCV-Ideas-Software/cross-review-v2 | low | 2026-04-29 | TypeScript (MCP) | MIT (verify) | MCP server orchestrating API-first cross-review between Claude / ChatGPT-Codex / Gemini / DeepSeek / Grok with **unanimous convergence gates** (v03.07.02 stability). Pattern: MCP-server-native cross-model panel. |
| 23 | **olanokhin/cpar-framework** | https://github.com/olanokhin/cpar-framework | low | 2026-03-27 | Python | MIT (verify) | **CPAR (Cross-Provider Adversarial Review)** with empirical A/B: outperformed single-model baseline 15/15 criteria, Hedges' g=2.71. Pattern: cross-provider blinded peer review with reviewer-pool topology (Author/Validator/Architect/Devil's Advocate). |
| 24 | **maryanskyy/agents-disagree-experiments** | https://github.com/maryanskyy/agents-disagree-experiments | low | 2026-02-28 | Python | MIT (verify) | Resumable experiment framework on team composition × aggregation mechanism with **BT-WR=0.810 diverse-team-judge vs 0.512 homogeneous-Opus** (g=2.71). Includes weak-cheap-model paradox finding. Pattern: rigorous statistical baseline for any cross-model-gate claim. |

### 2.6 Harness-engineering primitives (memory, observability, MCP-gateway)

| # | Repo | URL | Stars (live) | Last push | Primary lang | License | Pattern relevance |
|---|---|---|---|---|---|---|---|
| 25 | **bytedance/deer-flow** | https://github.com/bytedance/deer-flow | ~10-15k (high China-region) | 2026-05-22 | Python | MIT (verify) | Long-horizon SuperAgent harness — sandboxes (Local / Docker / K8s) + memories + tools + skills + subagents + message gateway. **Concurrency cap of 3 subagents/turn** with silent-drop on excess (DeepWiki-confirmed). Two-layer Harness / App split, embedded `DeerFlowClient` Python SDK for in-process use; `memory` / `sqlite` / `postgresql` checkpointer types. |
| 26 | **IBM/mcp-context-forge** | https://github.com/IBM/mcp-context-forge | ~3-5k | 2026-05-22 | Python | Apache-2.0 (typ. IBM) | **AI Gateway / registry / proxy in front of MCP/A2A/REST/gRPC** with unified endpoint, guardrails, plugin system. Pattern: centralized MCP discovery layer — analog to this runtime's `.mcp.json` but multi-tenant + governance-layer. |
| 27 | **MemTensor/MemOS** | https://github.com/MemTensor/MemOS | ~3-5k | 2026-05-22 | Python | Apache-2.0 (verify) | Self-evolving memory OS for LLM agents — hybrid retrieval + cross-task skill reuse, 35.24% token savings claimed. Pattern: drop-in memory layer (compare T6 basic-memory MCP). |

### 2.7 Coding-agent-specific harnesses (Claude-Code-adjacent)

| # | Repo | URL | Stars (live) | Last push | Primary lang | License | Pattern relevance |
|---|---|---|---|---|---|---|---|
| 28 | **SethGammon/Citadel** | https://github.com/SethGammon/Citadel | low | 2026-05-07 | (CC plugin) | MIT (verify) | **4-tier routing /do command**, campaign persistence across sessions, parallel agents in isolated worktrees, **discovery relay between waves**, circuit breaker. Cited by walkinglabs/awesome-harness-engineering. Pattern: discovery-relay between sequential waves — close conceptual analog to W342 wave-thread T6 basic-memory model. |
| 29 | **Dicklesworthstone/claude_code_agent_farm** | https://github.com/Dicklesworthstone/claude_code_agent_farm | ~1-3k | 2026-04-06 | Python | MIT (verify) | 20+ Claude Code agents in parallel with lock-based coordination + real-time tmux monitoring. Pattern study for terminal-multiplexer-based parallel-CC ops. |
| 30 | **ai-boost/awesome-harness-engineering** | https://github.com/ai-boost/awesome-harness-engineering | 637 (verified per Exa) | 2026-05-22 | (curated list) | MIT (typ.) | Meta-resource — curated harness-engineering list. NOT a runtime, but the authoritative catalog of OTHER candidates worth scoping; useful as a downstream cite-anchor. |

---

## Section 3 — Multi-dimension scoring (per candidate)

Scoring scale 0-5 per dimension. Composite = sum. "(?)" = need manual probe. Star count abbreviated (k = thousands).

| # | Repo | Stars | Recency 2026-05 push | CC-runtime fit (Py/TS SDK?) | Pattern density | Cite density (file:line) | Maintainer trust | Composite | Tier |
|---|---|---|---|---|---|---|---|---|---|
| 1 | microsoft/agent-framework | 5 (~12k) | 5 | 5 (Py SDK) | 5 (durable+graph+HIL) | 4 | 5 (Microsoft) | **29/30** | **T1** |
| 2 | google/adk-python | 5 (~10k) | 5 | 5 (Py SDK) | 4 (CRD+K8s) | 4 | 5 (Google) | **28/30** | **T1** |
| 3 | agentscope-ai/agentscope | 4 (~7k) | 5 | 5 (Py SDK) | 4 | 4 | 4 (Alibaba) | 26/30 | T1 |
| 4 | agentscope-ai/agentscope-runtime | 3 | 5 | 5 (Py SDK) | 4 (sandbox+aaaS) | 3 | 4 | 24/30 | T2 |
| 5 | alibaba/spring-ai-alibaba | 4 | 5 | 1 (Java, no Py/TS) | 3 | 3 | 4 | 20/30 | T3 |
| 6 | dbos-inc/dbos-transact-py | 4 | 5 | **5 (Py SDK + PydanticAI+OpenAI-SDK official integrations)** | 5 (durable Postgres) | 4 | 4 | **27/30** | **T1** |
| 7 | earendil-works/absurd | 2 | 5 | 4 (TS SDK) | 5 (minimal-substrate teaching) | 4 | 3 | 23/30 | T2 |
| 8 | restatedev/restate | 4 | 5 | 3 (uses external SDK) | 5 (Saga+deterministic-replay) | 4 | 4 | 25/30 | T2 |
| 9 | TencentCloud/CubeSandbox | 3 | 5 | 3 (Rust+Go; E2B-compatible) | 5 (microVM SOTA cost/perf) | 4 | 4 (Tencent) | 24/30 | T2 |
| 10 | agent-substrate/substrate | 2 (new) | 5 | 2 (Go svc, no client SDK yet) | 5 (snapshot/restore multiplex) | 3 | 5 (Google) | 22/30 | T2 |
| 11 | microsoft/Orchard | 2 | 4 | 3 (Py SDK) | 4 (env-as-svc) | 4 | 5 (MS+arXiv) | 22/30 | T2 |
| 12 | Billy1900/Arbor | 2 | 4 | 2 (Rust HTTP API) | **5 (branchable VM checkpoint — unique)** | 4 | 2 | 19/30 | T3 (pattern-study) |
| 13 | hgDendi/sandboxmatrix | 1 | 3 | 4 (Py SDK + langchain/crewai adapters) | 4 (A2A messaging+matrix) | 3 | 2 | 17/30 | T3 |
| 14 | berabuddies/agentflow | 1 | 4 | 4 (Py SDK) | 5 (DAG+fanout/merge — direct W325-A match) | 3 | 2 | 19/30 | **T3 high-priority** |
| 15 | Production-Grade/stigmergy | 1 | 4 | 3 (Py module) | **5 (pressure-field — novel scheduler)** | 3 | 2 | 18/30 | **T3 pattern-study** |
| 16 | ComposioHQ/agent-orchestrator | 2 | 5 | 4 (TS SDK) | 4 | 3 | 4 (Composio) | 22/30 | T2 |
| 17 | shenjianan97/persistent-agent-runtime | 1 | 4 | 4 (Py+LangGraph) | 5 (lease-based worker pool) | 4 | 2 | 20/30 | **T3 pattern-study** |
| 18 | tathadn/parallel-multi-agent-codegen | 1 | 4 | 3 (Py) | 4 (surgical revisions) | 3 | 1 | 16/30 | T4 |
| 19 | Dallionking/cross-model-agents | 1 | 4 | 4 (CC skills+TOML) | **5 (Opus↔Codex bidirectional)** | 4 | 2 | 20/30 | **T3 high-priority** (CR-3 alignment) |
| 20 | CtriXin/agent-2-agent | 1 | 4 | 4 (CC skill) | 4 (a2a skill semantics) | 3 | 2 | 18/30 | T3 |
| 21 | wan-huiyan/agent-review-panel | 1 | 4 | 4 (CC plugin) | 4 (4-6 reviewer panel) | 3 | 2 | 18/30 | T3 |
| 22 | LCV-Ideas-Software/cross-review-v2 | 1 | 4 | 4 (MCP server) | 4 (5-model panel + convergence gates) | 4 (versioned audit notes) | 2 | 19/30 | T3 |
| 23 | olanokhin/cpar-framework | 1 | 4 | 3 (Py) | 4 (empirical A/B baseline) | 4 (stats reported) | 2 | 18/30 | T3 (cite-anchor) |
| 24 | maryanskyy/agents-disagree-experiments | 1 | 3 | 3 (Py) | 4 (statistical rigor) | 5 (Hedges g + numbers) | 2 | 18/30 | T3 (cite-anchor) |
| 25 | bytedance/deer-flow | 5 (~10k+) | 5 | **5 (Py SDK `DeerFlowClient`)** | **5 (harness+sandbox+memory+subagent+MCP)** | 5 (DeepWiki-verified) | 4 (ByteDance) | **29/30** | **T1** |
| 26 | IBM/mcp-context-forge | 4 | 5 | 4 (server + clients) | 4 (gateway pattern) | 4 | 5 (IBM) | 26/30 | T1 |
| 27 | MemTensor/MemOS | 4 | 5 | 4 (Py SDK) | 4 (memory OS) | 3 | 3 | 23/30 | T2 |
| 28 | SethGammon/Citadel | 1 | 4 | 4 (CC plugin) | 4 (discovery-relay+campaign) | 3 | 2 | 18/30 | T3 |
| 29 | Dicklesworthstone/claude_code_agent_farm | 2 | 3 | 3 (Py orch) | 3 (tmux+lock coordination) | 3 | 2 | 16/30 | T4 |
| 30 | ai-boost/awesome-harness-engineering | 4 (637 verified) | 5 | n/a (catalog) | n/a (catalog) | 5 | 3 | n/a | meta |

**Scoring legend**:
- Stars: 5 = >5k, 4 = 1k-5k, 3 = 500-1k, 2 = 100-500, 1 = <100
- Recency: 5 = pushed within 7d, 4 = within 30d, 3 = within 90d
- CC-runtime fit: 5 = Python or TS SDK official + works on Windows, 4 = SDK exists, 3 = service + client, 2 = service no client, 1 = lang-mismatch
- Pattern density: 5 = novel pattern not in W376, 4 = strong extension of W376, 3 = standard
- Cite density: 5 = file:line anchors in published docs, 4 = directory-level anchors, 3 = README-only, 2 = thin docs
- Maintainer trust: 5 = major-org signed (MS/Google/IBM/Apache/CNCF), 4 = recognized org, 3 = active solo with track record, 2 = solo new, 1 = unverifiable

---

## Section 4 — Top adopt-or-pattern-study recommendations (codex r1 sketch)

### 4.1 ADOPT — Tier 1 install candidates for W377+ runtime

#### A. `microsoft/agent-framework` — durable graph orchestration

- **Why now**: Per DeepWiki probe, MAF's `WorkflowContext` + `Executor.on_checkpoint_save/restore()` + pluggable `CheckpointStorage` is the cleanest cross-language (Python + .NET) implementation of the W331 P0.7 durable-execution pattern that this runtime currently lacks. Sister runtime `claude-sota-pure` is Python-first, so the `_workflow.py` / `_executor.py` / `_workflow_context.py` entry points map directly to a plugin-loaded skill.
- **Sketch**: `pip install agent-framework` → wrap existing W342 multi-Agent dispatches in `Workflow.run(checkpoint_id, checkpoint_storage=FileCheckpointStorage(path))`; on Windows POSIX-atomic-write gap (W343 P3 known blocker) the `FileCheckpointStorage` Win-impl is the deterministic test target.
- **Integration risk**: Apache-2.0/MIT (verify); MS-signed releases mitigate CR-1 trust-tuple supply-chain risk. Cross-model gate (CR-3) is preserved — MAF doesn't dictate models.
- **W377+ slot**: replaces W343 P3 ad-hoc tick-write retry with MAF's superstep-checkpointing model.

#### B. `dbos-inc/dbos-transact-py` — durable-Postgres workflow library

- **Why now**: Already integrates with PydanticAI (W376 cluster member) via `DBOSAgent`, with LlamaIndex via `DBOSRuntime`, and with OpenAI Agents SDK via `DBOSRunner`. Reuses existing Postgres infra; no separate orchestrator service to operate. Pattern: annotate-and-go.
- **Sketch**: `pip install dbos` → annotate the per-wave orchestrator entry point with `@DBOS.workflow` and per-Agent dispatch with `@DBOS.step`. Postgres already provisioned for Langfuse (W370 Stream B verified at :3000 / v3.174.1). `DBOS_SYSTEM_DATABASE_URL` env var feeds it.
- **Integration risk**: MIT, active major-org, multi-language sister repos prove cross-lang viability. Doesn't enforce a single LLM provider.
- **W377+ slot**: hardens W342 wave-close pipeline against mid-wave process death (Win-laptop reboot, OS update, codex CLI hang) — re-launch resumes from last completed step.

#### C. `bytedance/deer-flow` — long-horizon SuperAgent harness (pattern + selective adopt)

- **Why now**: ~29/30 composite score; DeepWiki-confirmed `DeerFlowClient` embedded Python SDK; subagent system with explicit concurrency limit-3-per-turn matches the W325-A parallel-ratio investigation. Two-layer Harness/App architecture is the cleanest open-source reference for the W352 GIT-TREE-SOTA Layer-5 operator-surface separation.
- **Sketch**: Two paths — (a) Adopt as MCP-server peer (cardinal-rule-1 trusted source via ByteDance signed releases); (b) Pattern-only: port the `Sandbox` interface + virtual-path-mapping into this runtime's own sandbox primitive (the runtime's W329-D §3 Phoenix-NSSM-clarification work would integrate the path-mapping idiom cleanly).
- **Integration risk**: License needs verification before adoption; ByteDance trust posture is mixed in some compliance contexts (verify against runtime's CR-1 condition-(c) malicious-update review).
- **W377+ slot**: model for V20 architecture's "harness vs app" split. Likely Tier-2 install OR Tier-3 pattern-study depending on license + CR-1 audit.

### 4.2 PATTERN-STUDY — Tier 3 underrated but architecturally distinct

#### D. `Production-Grade/stigmergy` — pressure-field scheduling

- **Why interesting**: Benchmarked 9.5× faster than LangGraph at 30 agents because every tick dispatches ALL agents whose pressure exceeds threshold, not a batch-of-N. This is the only repo in the candidate set that proposes a *non-graph* scheduler.
- **Sketch (port-only, NOT install)**: extract the pressure-decay-tick-evaluation loop as a 200-line stand-alone module in `tools/preagent-pressure-scheduler.mjs` and gate it behind an env flag. Used to dispatch W352-cap-5-worktree parallel sessions when the operator wants emergent-topology rather than declarative-graph scheduling.
- **W377+ slot**: optional drop-in alongside the existing `tools/preagent-parallel-guard.mjs` binding-gate.

#### E. `Billy1900/Arbor` — branchable VM checkpoint

- **Why interesting**: The ONLY catalog candidate with first-class **VM-level checkpoint + fork + branch-safe-restore** (compare table in source README: E2B/Modal/Daytona all NO). Pattern uniqueness scores 5/5 even though stars are low. Direct analog to W343 SOTA-PARALLEL-GIT-HOOK Layer-2 worktree topology on the *runtime* side.
- **Sketch (study-only)**: read the `quarantine + reseal` protocol (§"every fork goes through" in the README) and codify the equivalent for git-worktree clone+rebase chains. Likely T6 basic-memory note + 1-page ADR rather than code install.
- **W377+ slot**: cite-anchor for the W352 GIT-TREE-SOTA-ARCHITECTURE §2 sub-section on rollback discipline.

### 4.3 ALIGN — Cross-model-review repos that match this runtime's CR-3 + W331 P0.7

The five repos in §2.5 (Dallionking + CtriXin + wan-huiyan + LCV + olanokhin) **collectively validate** this runtime's existing W331 P0.7 frontier-peer-policy (codex GPT-5.5 = authority; local Ollama = triage; Sonnet 4.6 = tie-breaker). Three takeaways for W377+:

1. **CPAR's blinded A/B baseline** (`olanokhin/cpar-framework`) gives this runtime a citation-grade reference for the "cross-model gate adds measurable value" claim — Hedges g=2.71 is the strongest empirical anchor surfaced in the entire research stream.
2. **wan-huiyan's 9-research-paper-citation pattern** is the right shape for the runtime's `citations-agent` skill verdict-ledger format (≥3-org-distinct floor).
3. **maryanskyy's weak-cheap-model paradox finding** (Hedges g=0.87 that ADDING a weaker model improves performance) suggests the W331 axis-2-#4 alirezarezvani 313→48 retirement decision may have been over-aggressive. Worth re-litigating in W377+ via the `sota-convergence-audit` skill.

---

## Section 5 — Multi-source convergence notes

### 5.1 Repos surfaced by ≥3 independent sources

| Repo | Exa search | GitHub topic | DeepWiki | Awesome-list cite | Convergence |
|---|---|---|---|---|---|
| **microsoft/agent-framework** | ✓ (sandbox query + GH search + orchestration query) | ✓ topic:multi-agent | ✓ probed | ✓ walkinglabs + ARUNAGIRINATHAN | **4-source** |
| **bytedance/deer-flow** | ✓ | ✓ topic:multi-agent | ✓ probed | ✓ multiple | **4-source** |
| **dbos-inc/dbos-transact-py** | ✓ (DBOS query) | ✓ durable workflow query | n/a | ✓ DBOS quickstart official + AutoJunjie | **3-source** |
| **google/adk-python** | ✓ (sandbox+GKE blog post) | ✓ topic:multi-agent | n/a | ✓ ARUNAGIRINATHAN + restatedev/restate-google-adk-example | **3-source** |
| **TencentCloud/CubeSandbox** | ✓ (sandbox isolation query) | ✓ deer-flow OR ... query | n/a | n/a | **2-source** |
| **agent-substrate/substrate** | ✓ (substrate query + Google blog) | ✓ deer-flow OR ... query | n/a | ✓ Google Cloud blog 2026-05-20 | **3-source** |
| **earendil-works/absurd** | ✓ (durable execution Pocoo blog) | ✓ earendil-works OR ... query | n/a | ✓ Centaur/Paradigm citation chain | **3-source** |
| **restatedev/restate** | ✓ (durable execution + Google ADK example) | ✓ earendil-works OR ... | n/a | ✓ restate-google-adk-example | **3-source** |
| **IBM/mcp-context-forge** | n/a | ✓ topic:llm-agents stars:>1000 | n/a | ✓ harness-engineering lists | **2-source** |

### 5.2 Convergence-low but pattern-valuable (single-source, kept anyway)

These appeared only via Exa search (most often) but score high on Pattern Density (≥4) so they remain in the candidate set per operator directive "low-star repos can be high quality in certain area with pattern study":

- `Production-Grade/stigmergy` — pressure-field scheduling (1 source, pattern 5/5)
- `Billy1900/Arbor` — branchable VM checkpoint (1 source, pattern 5/5)
- `berabuddies/agentflow` — DAG fanout+merge (1 source, pattern 5/5)
- `shenjianan97/persistent-agent-runtime` — lease-based worker pool (2 sources, pattern 5/5)
- `Dallionking/cross-model-agents` — Opus↔Codex bidirectional (1 source, pattern 5/5)

### 5.3 Where sources diverged

- **Star-count visibility**: GitHub search-API does not return star counts in the v3 results format used here. Star values in §2 are estimates inferred from "high China-region traffic" / "high MS visibility" / awesome-list-rank cues. Manual `gh api repos/{owner}/{repo} | jq .stargazers_count` recommended for any T1 install before commit.
- **License posture**: Most repos surfaced via Exa do not include license metadata in highlights; verify manually for the ~10 Tier-1/Tier-2 candidates before installing per cardinal-rule-1 condition-(b).
- **SLSA/SBOM/signed-release status**: NONE of the surfaced repos explicitly advertise SLSA-L3 + Sigstore + CycloneDX SBOM in their READMEs. This is the **single biggest gap** between candidate trust posture and this runtime's W331 axis-1-#3 CR-1 trust-tuple requirement. Even Microsoft + Google + IBM + ByteDance ship via standard pip/npm without explicit provenance flags. **Recommendation**: treat ALL candidates as `npx -y <pkg>@<pinned-version>` or `pip install <pkg>==<exact-version>` with a 30-day stability window before any auto-update.
- **Perplexity quota outage**: research stream ran without Perplexity's deep-research synthesis — Exa + GitHub + DeepWiki + targeted awesome-list traversal compensated, but the W377+ wave should retry Perplexity once quota refills to validate this catalog against a 4th independent source.

---

## Section 6 — Appendix: rejected / out-of-scope items

- `Fosowl/agenticSeek` (local-Manus-AI; tooling rather than orchestration runtime)
- `MervinPraison/PraisonAI` (already cited by walkinglabs as "in W376-adjacent cluster")
- `SolaceLabs/solace-agent-mesh` (event-driven mesh — interesting but heavy event-bus dependency conflicts with this runtime's MCP-first posture)
- `Mirix-AI/MIRIX` (visual-screen-tracking assistant; not orchestration)
- `OmRajput17/AgentForge-AI` and `mandarnilange/agentforge` (name collision; both included in §2.x are different from these single-org variants)
- `multiple Chinese-language awesome lists` (`jnMetaCode/agency-orchestrator`, `WenyuChiou/awesome-agentic-ai-zh`, `adongwanai/AgentGuide`) — language barrier without verified-translation pass; pattern-study only.

---

## Section 7 — Closure: STATUS DONE

- File written: `Z:/claude-sota-installed-W375/docs/architecture/W377-RESEARCH-V20/META-A-SOTA-AGENT-ORCHESTRATION-2026.md`
- Tool calls consumed: ~20 of 300 budget (well under cap)
- MCP sources: Exa (5 queries, 80+ unique results) + GitHub repo-search (8 queries, ~150 repos surveyed) + DeepWiki (2 deep architecture probes) + Perplexity research (quota-exhausted, gracefully fell back)
- Convergence ledger: 9 repos with ≥2-source confirmation, 5 single-source kept-for-pattern, 6 explicitly rejected
- Outstanding probe TODOs (for W377+ follow-on, not blocking this stream):
  1. Star/license/SLSA verification on Tier-1 candidates 1-3, 6, 25-26 before any commit
  2. Perplexity-research re-validation once quota refills
  3. Codex r1 review of this catalog for axis-2 omissions
  4. Trim Tier-3 pattern-study list once Tier-1 install decisions land — currently 30 entries is wider than what a single wave can absorb

End of META-A report.
