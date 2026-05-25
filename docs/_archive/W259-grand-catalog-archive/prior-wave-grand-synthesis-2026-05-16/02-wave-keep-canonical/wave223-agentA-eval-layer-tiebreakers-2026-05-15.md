---
title: Wave 223 Agent A — Eval-Layer Tie-Breaker Deep-Dive
status: AUTHORITATIVE-CANDIDATE
date: 2026-05-15
agent: sota-researcher (Sonnet stand-in per CLAUDE.local.md ENV (f); STAND-IN-NOTICE per cmc-env-funneled-disclosure.md §The mandate; cross-model gate NOT structurally satisfied — orchestrator MUST file Path P codex T1 ratification before ADOPT-NOW prescriptions land in claude-sota-pure)
wave: W223 P7 action from W218 MASTER SYNTHESIS
---

# Wave 223 Agent A — Eval-Layer Tie-Breaker Deep-Dive

## Dispatch context

W218 MASTER SYNTHESIS P7 action: tie-break eval-layer DEFER candidates → pick winners per category for target runtime `Z:\claude-sota-pure\`. Target audit per CR-9 sibling-bleed defense item (e): orchestrator MUST path-rewrite + re-Probe-DAG before any install-class cite-import lands in claude-sota-pure.

## Probe data captured (LICENSE direct-read + stars + freshness, 2026-05-15)

| Candidate | License | Stars | Created | Notes |
|---|---|---|---|---|
| explodinggradients/ragas | Apache-2.0 (Vibrant Labs, blob SHA 8bcca742) | 13.9k | 2023 | RAG-eval primary; v0.4.3 (2026-01-13); Anthropic Claude native + Langfuse integration via @observe() decorator |
| confident-ai/deepeval | Apache-2.0 (Confident AI Inc., blob SHA a27de832) | 15,455 | 2023-08 | LLM-eval generalist; pytest CI/CD-first; 15+ benchmarks; conversational + agentic + red-team + multi-modal metrics; offline-capable; native Anthropic Claude |
| promptfoo/promptfoo | MIT (Promptfoo 2025, blob SHA af3fa111) | 21,291 | 2023-04 | CLI-first YAML-config; "Used by OpenAI and Anthropic" per README; red-team + RAG eval + CI/CD gates; NO MCP server |
| UKGovernmentBEIS/inspect_ai | MIT (UK AI Security Institute 2024, blob SHA 72fc8774) | 2,061 | 2023-11 | 200+ pre-built evals; AISI-backed; capability eval + safety eval focus |
| NVIDIA/garak | Apache-2.0 (Leon Derczynski + NVIDIA 2023, blob SHA 95a30a74) | 7,822 | 2023-05 | LLM-security vulnerability scanner; red-team specialist (narrow); 320 open issues |
| langfuse/langfuse | MIT-Expat + `ee/`-dir ELv2 (Langfuse GmbH 2023-25, blob SHA 3fb6fb5c) | 27,279 | 2023-05 | YC W23; full-stack platform (tracing+evals+prompts+playground+datasets); OpenTelemetry + Langchain + OpenAI SDK + LiteLLM integrations; MCP server (6 prompt-mgmt tools) |
| Arize-ai/phoenix | ELv2 (Elastic 2.0; blob SHA 23d3aa7c) | 9,693 | 2022-11 | "AI Observability & Evaluation"; ELv2 self-host single-user OK; ALREADY INSTALLED in claude-sota-installed |
| comet-ml/opik | Apache-2.0 (Comet ML 2024, blob SHA 97fbc6c7) | 19,296 | 2023-05 | Hybrid (self-host Docker/K8s OR SaaS); Apache 2.0 — NOT open-core; Agent Optimizer + Guardrails; MCP server |
| traceloop/openllmetry | Apache-2.0 (blob SHA 261eeb9e) | 7,112 | 2023-09 | OTel-conventions SUBSTRATE (NOT competing platform); 24+ backend integrations; semantic conventions contributed back to upstream OTel |
| zilliztech/claude-context | MIT (Zilliz 2025, blob SHA 075865fd) | 11,131 | 2025-06 | Code-search MCP; Merkle-tree + embedding + vector DB; REJECTED-FOR-FIT in claude-sota-installed (Wave 125 Mia #59) — duplicate w/ zilliz plugin + Probe 7.a demand-absence |
| getzep/graphiti | Apache-2.0 (blob SHA 5feb0d9d) | 26,100 | 2024-08 | Temporal knowledge-graph for AI agents; ALREADY INSTALLED in claude-sota-installed |
| abhigyanpatwari/GitNexus | PolyForm Noncommercial 1.0.0 (blob SHA 485af9b5) | 38,509 | 2025-08 | Zero-server code-intelligence knowledge graph; INSTALLED via npm `gitnexus@1.6.4-rc.112`; LICENSE permits non-commercial use only |

## Section 1 — Category 1: RAG Evaluation Tie-Breaker

### Top-2 winners

**🥇 #1 — confident-ai/deepeval** (Apache-2.0, 15,455★)
- **Rationale**: per DeepWiki primary-source verification — deepeval's differentiator vs ragas is BREADTH (15+ benchmarks: MMLU/HellaSwag/DROP; conversational + agentic + red-team + multi-modal metrics) + DEVELOPER ERGONOMICS (pytest-first CI/CD; cleaner error handling; explainability/reasoning for scores; verbose debugging; cost tracking)
- **Workflow fit for claude-sota-pure**: pytest integration aligns with sss test discipline. Native Anthropic Claude via `AnthropicModel`. Offline-capable WITHOUT Confident AI cloud
- **CR-12 disposition**: GENUINELY-NEW (no eval-framework incumbent; orthogonal to graphiti which is memory not eval)
- **Install vector**: `pip install deepeval` (PyPI canonical)

**🥈 #2 — promptfoo/promptfoo** (MIT, 21,291★)
- **Rationale**: CLI-first + YAML configs aligns with shell-script discipline. "Used by OpenAI and Anthropic" per README = named-T2 endorsement. Covers RAG + red-team in single tool
- **Workflow fit**: PLANNED-DAY-1 in claude-sota-installed manifest. Probe 7 demand-gate PASS
- **CR-12 disposition**: PARTIAL-OVERLAP with deepeval (both eval). Complementary if both adopt (deepeval=Python pytest; promptfoo=CLI YAML). If only one, deepeval wins on breadth
- **Install vector**: `npm install -g promptfoo@<exact-version>` (NEVER `@latest` per CR-9)

### Losers (3 justifications)

**❌ explodinggradients/ragas** (Apache-2.0, 13.9k★) — REJECT-FOR-NARROWNESS. Functionally a STRICT SUBSET of deepeval per DeepWiki: ragas covers RAG-eval only; deepeval covers RAG + agentic + conversational + red-team + multimodal. Ragas has no explainability, no cost-tracking, no benchmarks. Probe 4 plugin-namespace: subset of deepeval — kiss-dry-yagni Must-Never #4.

**❌ UKGovernmentBEIS/inspect_ai** (MIT, 2,061★) — REJECT-FOR-FIT-WORKFLOW-MISMATCH. Built for AISI capability-evaluation use-case. Probe 5 mode-harness-shape MISMATCH: research-grade eval HARNESS not developer-grade eval LIBRARY. Stars (2k) far below deepeval (15k) + promptfoo (21k) — axis-1 FAIL for general LLM dev. Reserve only if AI-safety-eval workflow added.

**❌ NVIDIA/garak** (Apache-2.0, 7,822★) — REJECT-FOR-DUPLICATE-FUNCTIONALITY. promptfoo + deepeval BOTH have red-team metric coverage; garak is red-team-narrow specialist. 320 open issues indicates maintenance load. Probe 7.a demand-absence — no claude-sota-pure workflow exclusively requires standalone red-team scanner.

## Section 2 — Category 2: LLM Observability Tie-Breaker

### Top-2 winners

**🥇 #1 — langfuse/langfuse** (MIT-Expat core + ELv2 `ee/` dirs, 27,279★)
- **Rationale**: MOST-STARRED + full-stack (tracing + evals + prompts + playground + datasets). YC W23 named-org. Already operationally LIVE in sibling per manifest PLANNED row. MCP server exposes 6 prompt-management tools — direct Claude Code integration. OpenTelemetry + Langchain + OpenAI SDK + LiteLLM integrations broadest in category
- **CR-12 disposition for claude-sota-pure**: GENUINELY-NEW (no incumbent observability platform; phoenix INSTALLED in claude-sota-installed but NOT claude-sota-pure). Trade-off: requires Docker + PostgreSQL + Redis + ClickHouse + MinIO stack
- **License gotcha**: `ee/`-dir paths are ELv2 (commercial-license-required); core MIT — operator MUST avoid `ee/` features for fully-MIT operation
- **Install vector**: `docker pull langfuse/langfuse:latest` per manifest PLANNED row

**🥈 #2 — traceloop/openllmetry** (Apache-2.0, 7,112★)
- **Rationale**: NOT a competing platform — it IS the OPENTELEMETRY SUBSTRATE that other platforms consume per DeepWiki verification ("OpenLLMetry's semantic conventions have been contributed back to the OpenTelemetry project itself"). 24+ supported observability backends (Datadog/Honeycomb/Grafana/Langfuse/Phoenix-via-OTLP). CITE-CLASS-CANONICAL
- **Workflow fit**: complements (NOT competes with) Langfuse choice — openllmetry instruments LLM apps + emits OTLP → Langfuse consumes OTLP. Two-layer stack = SOTA
- **CR-12 disposition**: CITE-CLASS-CANONICAL (substrate adoption) + PROVIDER-COMPLEMENT to Langfuse
- **Install vector**: `pip install openllmetry` (Python) OR `npm install @traceloop/node-server-sdk` (Node)

### Losers (2 justifications)

**❌ Arize-ai/phoenix** (ELv2, 9,693★) — REJECT-FOR-LICENSE-RISK + DUPLICATE-CLASS-INSTALLED-ELSEWHERE. ELv2 self-host single-user OK BUT restriction "may not provide the software to third parties as a hosted or managed service" creates fork-and-redistribute friction. Already INSTALLED in claude-sota-installed. CR-12 disposition for claude-sota-pure: DUPLICATE-CLASS with langfuse choice. Phoenix has 3.5k FEWER stars than langfuse + narrower OTel-only integration scope.

**❌ comet-ml/opik** (Apache-2.0, 19,296★) — REJECT-FOR-FIT (PARTIAL-DUPLICATE). Has MCP server + Apache 2.0 + Agent Optimizer + Guardrails — legitimate differentiators. BUT: 19k stars vs Langfuse 27k = weaker axis-2 community endorsement. Hybrid SaaS/self-host architecture introduces split-loyalty risk (Comet's commercial incentive favors Cloud). Langfuse's pure-MIT-core wins clearer license posture.

## Section 3 — Category 3: Code-Context / Semantic Search Tie-Breaker

### Top-2 winners (note: this category installs in claude-sota-pure, NOT claude-sota-installed)

**🥇 #1 — getzep/graphiti** (Apache-2.0, 26,100★)
- **Rationale**: ALREADY INSTALLED + WIRED in claude-sota-installed sibling per CLAUDE.md Memory Stack L3 (FalkorDB v1.6.1 Docker container port 16379 + Graphiti MCP server c427615). PROVEN install path documented in `docs/install-provenance.md`. Apache-2.0 full commercial-OK. Temporal knowledge graph IS the SOTA primitive for AI agent memory
- **Workflow fit for claude-sota-pure**: graphiti L3 install pattern from claude-sota-installed serves as TIER-2 cite-import-AMBER candidate per CR-12 + Section 14.5. Install vector well-trodden — minimizes CR-9 2-round fix-forward risk
- **CR-12 disposition**: ECOSYSTEM-IMPORT from sibling (path-rewrite required per CR-9)
- **Install vector**: `pip install graphiti-core[falkordb]` + `docker run falkordb/falkordb:1.6.1` + `git clone https://github.com/getzep/graphiti` for MCP server

**🥈 #2 — abhigyanpatwari/GitNexus** (PolyForm Noncommercial 1.0.0, 38,509★)
- **Rationale**: HIGHEST-STAR in category (38k) + already INSTALLED in claude-sota-installed `gitnexus@1.6.4-rc.112` — full integration verified. Code-intelligence-graph specialization complements graphiti (temporal-memory-graph) — orthogonal NOT duplicate
- **Workflow fit for claude-sota-pure**: claude-sota-pure CLAUDE.md indicates GitNexus already configured. Use-class compatible if claude-sota-pure is non-commercial dev/research runtime
- **License gate (CR-9 strict)**: PolyForm Noncommercial 1.0.0 — license direct-read confirms "Noncommercial purpose is permitted; commercial use forbidden outside the grant". For claude-sota-pure: if non-commercial use only, ADOPT-NOW; if commercial path possible, hold pending commercial-license negotiation
- **CR-12 disposition**: ECOSYSTEM-IMPORT from sibling (path-rewrite mandatory per CR-9)
- **Install vector**: `npm install -g gitnexus@<pinned-version>` (NEVER `@latest`; 7.2 RCs/day cadence per W132 F2 D6 acknowledgment)

### Loser (1 justification)

**❌ zilliztech/claude-context** (MIT, 11,131★) — REJECT-FOR-FIT-DEPENDENCY-CHAIN. Per Wave 125 Mia OVER #59 in claude-sota-installed manifest: requires Zilliz Cloud or self-hosted Milvus vector DB. Probe 7.a demand-absence: no claude-sota-pure workflow surface requires Zilliz vector backend (graphiti+FalkorDB covers vector + temporal already). Dependency on external vector DB infrastructure for code-search use case overlaps with what graphiti+FalkorDB serves for memory → kiss-dry-yagni Must-Never #4 redundant-vector-store-class.

## Section 4 — Final Eval-Layer Stack Recommendation for claude-sota-pure

Composite 3-finalist stack (1 RAG eval + 1 observability + 1 code-context):

| Category | Winner | License | Install Vector | CR-12 disposition |
|---|---|---|---|---|
| RAG eval | **confident-ai/deepeval** | Apache-2.0 | `pip install deepeval` | GENUINELY-NEW |
| LLM observability | **langfuse/langfuse** (+ optional traceloop/openllmetry substrate) | MIT-Expat + ELv2 `ee/` | `docker pull langfuse/langfuse:latest` + `pip install openllmetry` | GENUINELY-NEW + CITE-CLASS-CANONICAL (substrate) |
| Code-context | **getzep/graphiti** | Apache-2.0 | `pip install graphiti-core[falkordb]` + `docker run falkordb/falkordb:1.6.1` | ECOSYSTEM-IMPORT from claude-sota-installed sibling |

### Notes for orchestrator

- **CR-3 cross-model satisfaction**: this Sonnet stand-in dispatch satisfies only the Phase 1 bootstrap path per CR-3. Orchestrator MUST file Path P codex T1 ratification (`codex exec --ephemeral -p deep-review-exec foreground+tee`) on the 3-finalist composite BEFORE landing install-class artifacts
- **CR-9 sibling-bleed defense (item (e))**: every install-class cite-import containing `Z:/claude-sota-installed/` paths MUST be path-rewritten to claude-sota-pure context
- **CR-12 disposition lattice application**: each adoption must record disposition before install row commits
- **Probe 7 demand-gate per candidate**: each winner must have a named operational use case in claude-sota-pure
- **Pinned RC discipline**: deepeval/langfuse/promptfoo install commands MUST pin exact version at install fire. NEVER `@latest`

### Section 4b — Probe 7.b DEMAND-CREATES-NEW-WORKFLOW candidates (queued)

The 4 losers can be revisited if claude-sota-pure adds:
- ragas → if pure RAG-only workflow without agentic dimension
- inspect_ai → if AI-safety-eval workflow added  
- garak → if standalone red-team scanner workflow added
- opik → if dedicated prompt-optimization (Agent Optimizer) workflow added

## Section 5 — Verdict

VERDICT: ADOPT-NOW (3-finalist composite) for claude-sota-pure pending Path P codex T1 ratification — deepeval (Apache-2.0, RAG eval, GENUINELY-NEW) + langfuse with optional openllmetry substrate (MIT-Expat core + Apache-2.0 substrate, observability, GENUINELY-NEW + CITE-CLASS-CANONICAL) + graphiti (Apache-2.0, code-context, ECOSYSTEM-IMPORT from claude-sota-installed sibling); orchestrator MUST apply CR-9 sibling-bleed path-rewrite + file Path P codex T1 before install-class artifacts land.
