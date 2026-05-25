# DEEP-SATURATION L4 — Eval Frameworks + Observability + Cost Tracking + Mutation Testing + Benchmarks

> **Date**: 2026-05-16 · **Scope**: Exhaustive coverage of L4 Evaluation + Observability layer (5 sub-categories) · **Probed**: 47 entries
>
> **Sources**: GitHub Search API v3 (10 GraphQL-equivalent REST queries + 25 name-search probes) + vendor docs (Phoenix/Langfuse/Opik MCP server READMEs) + Anthropic claude-plugins-official live directory listing + OpenInference instrumentation registry + Helicone/Promptfoo/Logfire native-CC docs.
>
> **Anti-overlap**: This file deepens what `GAP-EVAL-REASONING-2026-05-16.md` (eval harnesses high-level) + `SATURATION-WORKFLOW-OBS-DEVOPS-2026-05-16.md` (L4 obs row #20-31) cover. New material: (1) 5-way sub-class taxonomy; (2) full native-CC-pathway audit per row; (3) definitive Phoenix-vs-Langfuse-vs-Opik comparison with feature parity matrix; (4) cost-tracking + mutation-testing categories not previously covered in depth.
>
> **Methodology**: Each row probed for stars, license, language, last-pushed (≤180d freshness gate), **native-CC-pathway** (Anthropic-official-plugin / standalone-MCP-server / OpenInference-instrumentation / OTEL-via-env-vars / none), sub-class, and **D1-D8 + verdict** (INSTALL / RETAIN / STUDY-PILOT / STUDY / REJECT / DEFER).

---

## §A — Full Matrix (47 rows across 5 sub-categories)

### Sub-class 1: eval-framework (general-purpose LLM/agent evaluation harnesses)

| # | repo | ★ | license | last-pushed | native-CC-pathway | D1 fresh | D2 stars | D3 license | D4 reproducible | D5 mature | D6 cite-anchored | D7 alt-coverage | D8 ops-burden | verdict |
|---|---|---:|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | **promptfoo/promptfoo** | 21.3k | MIT | 2026-05-16 | **MCP-as-provider** (Anthropic listed as provider; no Promptfoo-MCP-server) | Y | Y | clean | Y CI-native | Y v0.x+ | wide adoption | unique red-teaming | low (npm one-line) | **INSTALL** |
| 2 | **confident-ai/deepeval** | 15.5k | Apache-2.0 | 2026-05-14 | OTEL emit; no MCP server | Y | Y | clean | Y pytest-style | Y | YC + Comet ML adjacencies | overlap with Ragas | low (pip + decorator) | **INSTALL** |
| 3 | **openai/evals** | 18.5k | NOASSERTION (research) | 2026-04-14 | OTEL via openllmetry; no MCP | Y | Y | non-OSS-strict (research license) | Y registry-driven | Y reference | OpenAI canonical | wide overlap | medium (registry author) | **STUDY-PILOT** (research license) |
| 4 | **EleutherAI/lm-evaluation-harness** | 12.6k | MIT | 2026-05-11 | none | Y | Y | clean | Y few-shot framework | Y `lm-eval-harness` is THE LLM-task substrate | HuggingFace-leaderboard origin | base-LLM not agent | medium | INSTALL-IF-BASE-LM-EVAL |
| 5 | **explodinggradients/ragas** | 13.9k | Apache-2.0 | 2026-02-24 (slightly stale, 80d) | OTEL via openllmetry; no MCP | partial (>60d) | Y | clean | Y RAG metrics | Y | wide RAG-adoption | RAG-specific | low | INSTALL-IF-RAG |
| 6 | **Marker-Inc-Korea/AutoRAG** | 4.8k | Apache-2.0 | 2026-05-14 | none | Y | Y | clean | Y AutoML-style | Y | Korean academic | RAG-specific (cf. Ragas) | medium | STUDY-IF-RAG |
| 7 | **modelscope/evalscope** | 2.8k | Apache-2.0 | 2026-05-15 | none | Y | Y | clean | Y VLM-supported | Y | Alibaba/ModelScope (named-T1) | Chinese ecosystem | medium | STUDY |
| 8 | **stanford-crfm/helm** | 2.8k | Apache-2.0 | 2026-05-14 | none | Y | Y | clean | Y HELM methodology | Y CRFM (named-T1) | Stanford-canonical | wide overlap | high (heavy substrate) | STUDY |
| 9 | **UKGovernmentBEIS/inspect_ai** | 2.1k | MIT | 2026-05-16 | OTEL via openllmetry | Y | Y | clean | Y Docker-sandbox | Y v0.12.0 | UK AISI (named-T1 govt) | unique meta-runner | low-med | **INSTALL** (L4.5 meta-runner) |
| 10 | **UKGovernmentBEIS/inspect_evals** | 495 | MIT | 2026-05-15 | (via inspect_ai) | Y | low | clean | Y 200+ wrapped evals | Y | UK AISI | unique | low | **INSTALL** (companion to #9) |
| 11 | **microsoft/promptbench** | 2.8k | MIT | 2026-02-20 (~85d) | none | partial | Y | clean | Y adversarial-attacks | Y | MSR (named-T1) | adversarial-specific | medium | STUDY-IF-ADVERSARIAL |
| 12 | **NousResearch/atropos** | 1.2k | MIT | 2026-05-14 | none | Y | Y | clean | Y RL-trajectories | new (Q1 2026) | NousResearch (named-T1) | RL-specific | medium | STUDY-IF-RL |
| 13 | **agentscope-ai/OpenJudge** | 604 | Apache-2.0 | 2026-05-15 | none | Y | Y | clean | Y holistic+rewards | newer | Alibaba/Agentscope | quality-rewards niche | medium | STUDY |
| 14 | **bigcode-evaluation-harness** | 1.0k | Apache-2.0 | 2025-07-22 STALE | none | N >280d | Y | clean | Y code-gen | Y BigCode (named-T1) | code-gen-specific | medium | DEFER (stale) |

**Eval-framework Axis-1 (3+ distinct named-T1 orgs publishing fresh ≤180d general eval harness)**: PASS — Promptfoo (community-T1) + Confident-AI (YC/Comet) + OpenAI + EleutherAI + Stanford-CRFM + UK-AISI + MS-Research + NousResearch = **8 distinct named-T1 orgs**.

---

### Sub-class 2: observability (LLM tracing + APM backends — span-store + UI)

| # | repo | ★ | license | last-pushed | native-CC-pathway | D1-D8 verdict | sub-verdict |
|---|---|---:|---|---|---|---|---|
| 15 | **langfuse/langfuse** | 27.3k | MIT-like (Other) | 2026-05-15 | **OpenTelemetry receiver** + `langfuse/mcp-server-langfuse` (167★, prompt-mgmt only — get-prompts/get-prompt; supports Claude Desktop + Cursor); OTEL-via-CLAUDE_CODE_ENABLE_TELEMETRY=1 | fresh+wide+OSS+OTEL+mature+YC+self-host+low-ops | **INSTALL** (top-pick observability backend) |
| 16 | **comet-ml/opik** | 19.3k | Apache-2.0 | 2026-05-15 | **`comet-ml/opik-mcp` (203★)** with 7 toolsets: core/integration/expert-prompts/expert-datasets/expert-trace-actions/expert-project-actions/metrics; **OTEL endpoint** `https://www.comet.com/opik/api/v1/private/otel`; explicit Claude Code telemetry docs at comet.com/docs/opik/integrations/claude-agent-sdk; Cursor/VS Code/Windsurf supported (Claude Code NOT explicit but stdio MCP works) | fresh+wide+OSS+OTEL+broadest-frameworks+mature+low-ops | **INSTALL** (top-pick — broadest integration surface + Claude Code explicit) |
| 17 | **Arize-ai/phoenix** | 9.7k | ELv2 (non-OSS, source-available) | 2026-05-16 | **`@arizeai/phoenix-mcp`** (NPM) + **`openinference-instrumentation-claude-agent-sdk`** (Py + TS) + **`@arizeai/phoenix-cli`** (CLI "for fetching traces, datasets, and experiments for use with Claude Code, Cursor, and other coding agents") + **dedicated coding-agent skills** for Claude Code/Cursor in repo | fresh+wide+ELv2-restricted+OTEL+mature+**MOST-CC-NATIVE-ECOSYSTEM** | **RETAIN** (incumbent — see §C for vs Langfuse/Opik) |
| 18 | **Helicone/helicone** | 5.7k | Apache-2.0 | 2026-05-14 | **`helicone-mcp` directory in repo** + `@helicone/mcp` (npm) with 3 tools: use_ai_gateway/query_requests/query_sessions; AI-Gateway-mode (proxy) + tracing | fresh+broad+OSS+MCP-server-native+mature+YC | **INSTALL** (gateway+obs hybrid; complements Langfuse-as-backend) |
| 19 | **AgentOps-AI/agentops** | 5.6k | MIT | 2026-03-19 (~58d) | **MCP server badge in README** + native CrewAI/AG2/Agno/LangGraph integration; OpenAI Agents SDK native | fresh+broad+OSS+MCP+broad-framework | **INSTALL** (agent-specific obs; cheapest bolt-on) |
| 20 | **langwatch/langwatch** | 3.3k | Apache-2.0 (Other-license file present) | 2026-05-16 | **MCP support** for Claude Desktop + OTEL + agent simulations | fresh+modest+OSS+MCP+unique-sim | STUDY-PILOT |
| 21 | **pydantic/logfire** | 4.2k | MIT | 2026-05-15 | **`.claude/` dir + CLAUDE.md** in repo; OTEL-native; pydantic-AI integration | fresh+modest+MIT+OTEL+pydantic-T1 | **INSTALL** (Python+pydantic-shop best; cleaner OTEL story than Phoenix) |
| 22 | **traceloop/openllmetry** | 7.1k | Apache-2.0 | 2026-05-14 | **THE OTEL adapter layer** — emits to 24+ obs backends incl. all rows above; 10+ LLM providers; **native MCP instrumentation package** | fresh+broad+OSS+OTEL-standard+mature | **INSTALL** (instrumentation tier — not a backend; install ALONGSIDE one obs backend) |
| 23 | **traceloop/openllmetry-js** | 398 | Apache-2.0 | 2026-05-11 | TS companion to #22 | fresh+OSS+TS-specific | INSTALL-IF-TS |
| 24 | **mlflow/mlflow** | 26.0k | Apache-2.0 | 2026-05-16 | OTEL emit; no MCP server | fresh+widest+OSS+broad-ML-platform | STUDY (ML-platform-tier, not LLM-first; overlaps with #15) |
| 25 | **openlit/openlit** | 2.4k | Apache-2.0 | 2026-05-16 | OTEL-native; GPU monitoring unique; no MCP | fresh+modest+OSS+OTEL+GPU-unique | INSTALL-IF-GPU-OBS |
| 26 | **openobserve/openobserve** | 18.9k | AGPL-3.0 | 2026-05-16 | OTEL receiver; 140x lower storage costs claimed | fresh+wide+AGPL+OTEL+general-obs | STUDY (general APM, not LLM-first) |
| 27 | **evidentlyai/evidently** | 7.5k | Apache-2.0 | 2026-05-02 | OTEL emit; no MCP | fresh+wide+OSS+ML+LLM-both | STUDY (ML-drift origin) |
| 28 | **raga-ai-hub/RagaAI-Catalyst** | 16.2k | Apache-2.0 | 2026-02-11 (~94d) | none | partial+wide+OSS+no-MCP | STUDY (no Claude bridge) |
| 29 | **pezzolabs/pezzo** | 3.2k | Apache-2.0 | 2026-03-31 (~46d) | none | fresh+modest+OSS+no-MCP+prompt-only-scope | REJECT (subsumed by Langfuse/Phoenix prompt-mgmt) |
| 30 | **langchain-ai/langsmith-mcp-server** | n/a | LangChain TOS (SaaS-tied) | recent | **Official LangChain MCP** exposing prompts/traces/datasets/experiments | SaaS-only+MCP-canonical | STUDY-IF-LANGSMITH |
| 31 | **wandb/wandb-mcp-server** | n/a | W&B TOS (SaaS-tied) | recent | **Official W&B Weave + Models MCP** hosted at `mcp.withwandb.com` | SaaS-only+MCP-canonical | STUDY-IF-WANDB |
| 32 | **future-agi/future-agi** | 974 | Apache-2.0 | 2026-05-16 | OTEL; eval+sim+guardrails+datasets unified | fresh+low+OSS+broad-platform | STUDY |
| 33 | **deepchecks/deepchecks** | (medium) | Apache-2.0 | recent | OpenInference + OTEL; CrewAI integration; MCP span-type for tool calls | fresh+OSS+broad-eval | STUDY |

**Observability Axis-1 (3+ distinct orgs with fresh ≤180d, MCP-native or OpenInference-native CC-pathway)**: PASS — Arize + Comet + Helicone + Pydantic + Traceloop + AgentOps + LangChain + LangWatch + W&B = **9 distinct named-T1 orgs**.

---

### Sub-class 3: cost-tracking (gateway-tier or sidecar — proxy that tracks tokens/cost across providers)

| # | repo | ★ | license | last-pushed | native-CC-pathway | verdict |
|---|---|---:|---|---|---|---|
| 34 | **BerriAI/litellm** | 47.2k | Other (MIT-like) | 2026-05-16 | **THE OpenAI-compatible proxy** for 100+ LLMs incl. Anthropic; built-in cost tracking + guardrails + load-balancing + logging | **INSTALL** (incumbent; canonical multi-provider proxy with cost ledger) |
| 35 | **Portkey-AI/gateway** | 11.7k | MIT | 2026-03-25 (~52d) | Routes 1,600+ LLMs + integrated guardrails; **mcp/mcp-gateway/mcp-servers topics** | INSTALL-ALT (incumbent if multi-provider routing required) |
| 36 | **tensorzero/tensorzero** | 11.4k | Apache-2.0 | 2026-05-16 | LLMOps platform unifying gateway + observability + optimization; Rust core | **INSTALL** (unique unified gateway+obs+optimization stack) |
| 37 | **Helicone/ai-gateway** | 589 | GPL-3.0 | 2025-11-21 STALE | Rust core; OSS Helicone alt | DEFER (stale >180d) |
| 38 | **katanemo/plano** | 6.5k | Apache-2.0 | 2026-05-15 | AI-native proxy with orchestration + safety + observability + smart LLM routing | STUDY |
| 39 | **agentops** (cost tracking column of #19) | 5.6k | MIT | 2026-03-19 | Native cost-tracking decorator across CrewAI/AG2/Agno | (covered in #19 row) |
| 40 | **OmniRoute** | 4.7k | MIT | 2026-05-16 | Multi-provider AI gateway 160+ providers | STUDY-ALT |
| 41 | **axonhub** | 3.8k | Other | 2026-05-16 | Open-source AI Gateway 100+ LLMs with failover | STUDY |
| 42 | **higress** | 8.4k | Apache-2.0 | 2026-05-15 | AI-native API Gateway, intelligent routing | STUDY (Envoy-based, K8s-heavy) |
| 43 | **kong/kong** | 43.4k | Apache-2.0 | 2026-03-27 | Generic API+AI gateway; AI plugins | RETAIN-IF-K8S |

**Cost-tracking Axis-1**: PASS — BerriAI + Portkey + TensorZero + AgentOps + Kong + Katanemo = **6 distinct orgs**.

---

### Sub-class 4: mutation-testing (test-suite-quality validation; AI angle = mutation-aware test-gen)

| # | repo | ★ | license | last-pushed | language | verdict |
|---|---|---:|---|---|---|---|
| 44 | **stryker-mutator/stryker-js** | 2.9k | Apache-2.0 | 2026-05-15 | JS/TS | **INSTALL-IF-JS** (de-facto JS standard) |
| 45 | **stryker-mutator/stryker-net** | 2.0k | Apache-2.0 | 2026-05-16 | .NET | INSTALL-IF-DOTNET |
| 46 | **hcoles/pitest** | 1.8k | Apache-2.0 | 2026-05-15 | Java | **INSTALL-IF-JVM** (canonical JVM mutation testing) |
| 47 | **infection/infection** | 2.2k | BSD-3 | 2026-05-15 | PHP | INSTALL-IF-PHP |
| 48 | **mbj/mutant** | 2.1k | Other (MIT-like) | 2026-05-12 | Ruby | INSTALL-IF-RUBY |
| 49 | **boxed/mutmut** | 1.3k | BSD-3 | 2026-05-09 | Python | **INSTALL-IF-PYTHON** (more active than cosmic-ray) |
| 50 | **sixty-north/cosmic-ray** | 632 | MIT | 2026-04-02 | Python | INSTALL-ALT-PYTHON (slower than mutmut) |
| 51 | **mull-project/mull** | 812 | Apache-2.0 | 2026-05-12 | C/C++ | INSTALL-IF-CPP |
| 52 | **muter-mutation-testing/muter** | 551 | MIT | 2026-04-27 | Swift | INSTALL-IF-SWIFT |
| 53 | **avito-tech/go-mutesting** | 669 | MIT | 2024-07-04 STALE | Go | DEFER (stale) |

**Mutation-testing Axis-1**: PASS — Stryker(JS+.NET) + PIT(JVM) + Infection(PHP) + Mutant(Ruby) + Mutmut+Cosmic-Ray(Py) + Mull(C++) + Muter(Swift) = **language-per-org canonical coverage**. No "AI-native" mutation-test framework with ≥500★ found in this fire (LLM-as-mutation-generator is a paper-tier idea, not a productized OSS substrate yet — see §D non-finding).

---

### Sub-class 5: benchmark-bench (named eval datasets — used INSIDE harnesses #9-10)

| # | repo | ★ | license | last-pushed | wrapped-by-inspect_evals | verdict |
|---|---|---:|---|---|---|---|
| 54 | **openai/mle-bench** | 1.5k | NOASSERTION | 2026-04-24 | YES | STUDY-PILOT (leaderboard paused 2026-04-24) |
| 55 | **xlang-ai/OSWorld** | 2.9k | Apache-2.0 | 2026-05-11 | YES | **INSTALL** (computer-use canonical) |
| 56 | **sierra-research/tau2-bench** | 1.2k | MIT | 2026-05-15 | YES | **INSTALL** (multi-turn tool-agent canonical) |
| 57 | **ShishirPatil/gorilla** (BFCL v4) | 12.9k | Apache-2.0 | 2026-04-13 | YES | **INSTALL** (function-calling canonical) |
| 58 | **princeton-nlp/SWE-bench** | 5.0k | MIT | 2026-04-01 | YES | **INSTALL** (SWE canonical) |
| 59 | **THUDM/AgentBench** | 3.4k | Apache-2.0 | 2026-02-08 | YES (but reward-hacked 2026-04-12) | DEFER (contamination) |
| 60 | **princeton-pli/hal-harness** | 281 | none-spec | 2026-05-06 | (HAL ≠ inspect_evals — competing meta-runner) | STUDY (Princeton meta-runner alt) |
| 61 | **scicode-bench** | low | Apache-2.0 | (via #9-10 wrapper) | YES | STUDY-PILOT (via #10) |
| 62 | **gaia-benchmark** (HF Space) | n/a | Open | (via #9-10 wrapper) | YES | INSTALL (via #10) |

**Benchmark-bench Axis-1**: PASS — OpenAI + XLang + Sierra + UC-Berkeley + Princeton-NLP + Princeton-PLI + Tsinghua + HF + UChicago = **9 distinct named-T1 orgs**. ALL run inside inspect_evals meta-runner — substrate-substrate consolidation viable.

---

## §B — Top-3 INSTALL per sub-class

### B1 — eval-framework (top-3)
1. **promptfoo/promptfoo** (21.3k★, MIT, fresh) — broadest red-team + prompt-eval + CI-native; Anthropic provider supported; one-line npm install; **fewest-deps + widest-eval-surface trade**.
2. **UKGovernmentBEIS/inspect_ai + inspect_evals** (2.1k + 0.5k★, MIT, fresh) — UK AISI-grade meta-runner subsumes 200+ benchmarks (incl. MLE/SWE/GAIA/BFCL/AgentBench/SciCode); Docker sandboxed; **L4.5 meta-substrate** that supersedes per-eval installs.
3. **confident-ai/deepeval** (15.5k★, Apache-2.0, fresh) — pytest-style metric API; broadest framework integration (Comet/CrewAI/Autogen/LangChain); **CI-friendly Python-first** complement to #1.

### B2 — observability (top-3)
1. **comet-ml/opik** (19.3k★, Apache-2.0, fresh) — broadest framework coverage AND **explicit Claude Agent SDK telemetry guide** AND `opik-mcp` (203★ official) AND OTEL-native; **only top-3 obs platform with first-class Claude Code OTEL docs published**.
2. **langfuse/langfuse** (27.3k★, MIT-like, fresh) — largest ★, longest history (YC W23), strongest self-host UX, OpenTelemetry receiver + `mcp-server-langfuse` (167★) for prompt-mgmt; **the safe default open-source choice**.
3. **traceloop/openllmetry** (7.1k★, Apache-2.0, fresh) — **instrumentation tier, not backend** — install ALONGSIDE #1 or #2 to standardize OTEL emission across 24+ backends and 10+ LLM providers. **Canonical SDK-side adapter**.

### B3 — cost-tracking (top-3)
1. **BerriAI/litellm** (47.2k★, MIT-like, fresh) — canonical OpenAI-compatible proxy for 100+ LLMs with cost tracking + guardrails + load-balancing; **already incumbent in W258 stack**.
2. **tensorzero/tensorzero** (11.4k★, Apache-2.0, fresh) — unified gateway + observability + optimization (Rust core); **fewer-moving-parts alternative when consolidation desired**.
3. **Portkey-AI/gateway** (11.7k★, MIT, slightly stale ~52d) — routes 1,600+ LLMs with native MCP topic tagging; **strongest enterprise-tier alt to #1**.

### B4 — mutation-testing (top-3 across-languages, one per dominant lang)
1. **stryker-mutator/stryker-js** (2.9k★, Apache-2.0, fresh) — JS/TS canonical; **install when CC builds JS/TS test suites**.
2. **hcoles/pitest** (1.8k★, Apache-2.0, fresh) — JVM canonical; **install when CC builds Java/Kotlin test suites**.
3. **boxed/mutmut** (1.3k★, BSD-3, fresh) — Python canonical (more active than cosmic-ray); **install when CC builds Python test suites**.

### B5 — benchmark-bench (top-3)
1. **princeton-nlp/SWE-bench** (5.0k★, MIT, fresh) — coding-agent canonical; via inspect_evals.
2. **xlang-ai/OSWorld** (2.9k★, Apache-2.0, fresh) — computer-use canonical; via inspect_evals; OSWorld-Verified upgrade live.
3. **ShishirPatil/gorilla** / BFCL v4 (12.9k★, Apache-2.0, fresh) — function-calling canonical; web-search + memory categories added v4 (2026-04-12).

---

## §C — Phoenix vs Langfuse vs Opik DEFINITIVE COMPARISON

> Prior synthesis was AMBIGUOUS. This section settles the choice with feature parity matrix + cost-of-switching + native-CC-pathway diff. **Verdict** at bottom.

### C.1 — Feature parity matrix

| Dimension | Arize-ai/phoenix | langfuse/langfuse | comet-ml/opik |
|---|---|---|---|
| **Stars (2026-05-16)** | 9,701 | 27,309 | 19,321 |
| **License** | ELv2 (source-available, **NOT OSI-OSS**) | MIT-like (Other; effectively MIT for self-host) | **Apache-2.0** (pure OSS, OSI-approved) |
| **Last pushed** | 2026-05-16 | 2026-05-15 | 2026-05-15 |
| **Primary language** | Python (+TS UI) | TypeScript | Python (+Java/TS) |
| **Storage backend** | Postgres + Phoenix-native | Postgres + ClickHouse | ClickHouse + MySQL/Postgres |
| **Self-host ops complexity** | Medium (docker-compose viable) | **Low** (docker-compose first-class; vol-mount Postgres) | Medium-High (ClickHouse + Redis required) |
| **OpenInference instrumentation** | **NATIVE** (Arize is openinference home) | via OTEL receiver | via OTEL receiver |
| **`claude-agent-sdk` instrumentation** | **`openinference-instrumentation-claude-agent-sdk`** (Py + TS) — first-party | via OTEL+CLAUDE_CODE_ENABLE_TELEMETRY=1 | via OTEL+CLAUDE_CODE_ENABLE_TELEMETRY=1 + **explicit doc at comet.com/docs/opik/integrations/claude-agent-sdk** |
| **Official MCP server** | **`@arizeai/phoenix-mcp`** (NPM, first-party) | `langfuse/mcp-server-langfuse` (167★, official org, **prompt-mgmt ONLY** — get-prompts/get-prompt) | **`comet-ml/opik-mcp`** (203★, official, **7 toolsets** — core/integration/expert-prompts/expert-datasets/expert-trace-actions/expert-project-actions/metrics) |
| **MCP-server breadth** | High (Phoenix MCP exposes traces/datasets/experiments) | **LOW** (prompt-mgmt only) | **HIGHEST** (most complete tool surface) |
| **CLI for Claude Code** | **`@arizeai/phoenix-cli`** ("for fetching traces, datasets, and experiments for use with Claude Code, Cursor, and other coding agents") | none | none |
| **Dedicated coding-agent skill** | **YES** (Claude Code + Cursor skills in repo) | none | none |
| **Prompt management** | YES (datasets-style) | **YES** (canonical; YC-mature feature) | YES (versioning + variables) |
| **Eval framework built-in** | Phoenix-evals + LLM-as-judge | langfuse-evals + LLM-as-judge | opik-evals + LLM-as-judge + hallucination/answer-relevance/G-Eval |
| **Tracing standard** | OpenInference (OTEL-extending) | **OpenTelemetry-canonical** (broadest receiver) | OpenTelemetry-canonical |
| **Cost tracking** | YES | YES | YES |
| **Datasets + experiments** | **YES** (canonical Phoenix concept) | YES | **YES** (most polished UX) |
| **YC affiliation** | (none) | YC W23 | (Comet ML — series-A unicorn) |
| **License risk for commercial deploy** | ELv2 limits managed-service rehosting; **fine for own-use** | low (MIT-like) | **lowest** (Apache-2.0 clean) |

### C.2 — Cost-of-switching matrix

| From → To | Effort | Notes |
|---|---|---|
| **Phoenix → Langfuse** | LOW-MED | OTEL spans replay-able via openllmetry; lose phoenix-native concepts |
| **Phoenix → Opik** | LOW-MED | Same OTEL replay; gain Apache-license + opik-mcp breadth |
| **Langfuse → Opik** | LOW | OTEL spans natively portable |
| **Opik → Langfuse** | LOW | OTEL spans natively portable |
| **Any → Phoenix** | MED | Phoenix-native concepts require re-instrument; gain openinference-claude-agent-sdk first-party + Phoenix-CLI for Claude Code |

### C.3 — Verdict matrix (per persona/use-case)

| Persona / use-case | RECOMMENDED | RATIONALE |
|---|---|---|
| **Claude Code orchestrator primary user (this runtime)** | **RETAIN Arize Phoenix** | Only platform with: (a) `openinference-instrumentation-claude-agent-sdk` first-party Py+TS, (b) `@arizeai/phoenix-cli` explicitly for Claude Code, (c) dedicated coding-agent skill in repo. **Cost of leaving Phoenix = losing 3 unique Claude Code substrates.** |
| **OSS-purist commercial deploy** | **Opik (Apache-2.0)** | ELv2 risk on Phoenix; Langfuse MIT-like-but-Other-licensed. **Opik is the cleanest license for build-on-top-of work.** |
| **Mass framework coverage + lowest ops** | **Langfuse** | YC-W23 mature self-host story; broadest 70+ framework adoption; OpenTelemetry-canonical; **the safe-default open-source choice for non-Claude-specific shops**. |
| **Smallest team / fastest pilot** | **Langfuse** | docker-compose-up + one SDK line + OTEL receiver = production. |
| **Need MCP exposure of traces/datasets** | **Opik** > Phoenix > Langfuse | opik-mcp 7 toolsets > phoenix-mcp 5-ish > langfuse-mcp 2 tools (prompt-mgmt only). |
| **Need Anthropic-first eval/sim workflow** | **Phoenix** (incumbent) | Native Anthropic topic tag + Claude Agent SDK first-party + Anthropic-listed in topics. |

### C.4 — FINAL RECOMMENDATION for claude-sota-installed runtime

**RETAIN Phoenix as incumbent** — DO NOT SWITCH. Rationale (in priority order):

1. **Three Claude-Code-unique substrates** (instrumentation-package, CLI, skills) that Langfuse and Opik DO NOT have.
2. **ELv2 license is NOT a blocker for own-use** (only blocks managed-service rehosting — irrelevant to this runtime).
3. **OpenInference is the upstream Arize project** — Phoenix has zero-latency access to instrumentation packages BEFORE they ship to other backends.
4. **Switching cost (LOW-MED) is not justified** when no concrete pain-point with Phoenix is reported.

**INSTALL Opik ALONGSIDE Phoenix in STUDY-PILOT mode** — for two specific use-cases:
- (a) When OSS-purity matters for downstream redistribution (Apache-2.0 vs ELv2).
- (b) When MCP toolset breadth on traces/datasets/experiments matters (opik-mcp's 7 toolsets > phoenix-mcp).

**DEFER Langfuse to STUDY** — strongest "general" choice but **no Claude Code first-party hook**; gains nothing over Phoenix incumbent for this runtime's use-case.

---

## §D — Honest Non-Findings

### D.1 — NO "Anthropic-official-plugin" exists for any eval/obs tool
Probed `anthropics/claude-plugins-official` `/plugins/` (40 dirs) and `/external_plugins/` (16 dirs) live 2026-05-16. **Zero** entries match: langfuse, phoenix, opik, mlflow, helicone, agentops, langwatch, openllmetry, openlit, openobserve, traceloop, promptfoo, deepeval, ragas, inspect_ai. Only adjacencies: `dash0` (Claude-specific OTEL tracing — earlier W258 row #55), `datadog` (preview; vendor MCP authoritative), `claude-code-setup`, `commit-commands`, `code-review`, `pr-review-toolkit`. **Conclusion**: native-CC-pathway for L4 lives in **vendor-published MCP servers** (Phoenix/Opik/Helicone/Langfuse/AgentOps/Datadog/Grafana/Sentry) and **OpenInference instrumentation packages**, NOT in the Anthropic-official plugin marketplace.

### D.2 — Langfuse MCP server is WEAKER than competitors' MCP servers
Probed `langfuse/mcp-server-langfuse` directly. **Only 2 tools**: get-prompts (list) + get-prompt (retrieve+compile). **No trace/dataset/experiment tools.** Compare to opik-mcp (7 toolsets) and phoenix-mcp (full traces+datasets+experiments). Decision impact: choosing Langfuse for Claude-Code-native workflows incurs **80%+ MCP-tool-coverage gap** vs Phoenix/Opik.

### D.3 — NO "LLM-as-mutation-generator" productized OSS substrate found ≥500★
The 10 mutation-testing repos found are all classic mutation testing (AST-walk + operator-mutate). No "AI uses LLM to write smarter mutations" or "LLM scores mutation kill-rate" repo cleared the ≥200★ + ≤180d-fresh + meaningful-LOC bar. The closest finding (`mbj/mutant`, 2.1k★) only mentions "AI writes your code, AI writes your tests" rhetorically — no LLM-driven mutation operators in code. **Conclusion**: mutation-testing × AI is a paper-tier research idea (e.g. `LLM-MUT`, `μBert`, `MuTAP`) NOT yet productized to OSS install-tier.

### D.4 — `THUDM/AgentBench` is REWARD-HACKED (2026-04-12 Berkeley/RDI exploit)
Inherited from prior `GAP-EVAL-REASONING-2026-05-16.md`. Reconfirmed at this fire. **DEFER from any benchmark-bench install**.

### D.5 — `Helicone/ai-gateway` is STALE
Last push 2025-11-21 (~178d, edge-of-180-day window). The main `Helicone/helicone` repo IS fresh (2026-05-14) but the dedicated `ai-gateway` carve-out is borderline. **Use main helicone repo (with `helicone-mcp` subdirectory) instead of ai-gateway repo.**

### D.6 — `openai/evals` license is NOASSERTION (research)
While 18.5k★ canonical, the NOASSERTION license is research-grade — **NOT a clean OSS license for downstream redistribution**. Downgrade from INSTALL to STUDY-PILOT vs prior assumption.

### D.7 — `Marker-Inc-Korea/AutoRAG` (4.8k★) under-noticed at this layer
AutoRAG was tagged STUDY-IF-RAG. The "AutoML-style automation" claim distinguishes it from Ragas — automated pipeline-search vs metric-evaluation. Worth re-investigating in a RAG-specific saturation pass.

### D.8 — Logfire's `CLAUDE.md` is DEV-INTERNAL not USER-FACING
Probed `pydantic/logfire/CLAUDE.md` content — it is a contributor guide for logfire-repo development (pre-commit / pyright / pytest patterns), NOT a Claude Code integration guide for end users instrumenting their apps with logfire. **The `.claude/` dir + CLAUDE.md does not constitute a user-facing Claude Code integration** — only the OTEL pathway is the Claude Code integration surface. Adjust expectations accordingly.

### D.9 — `princeton-pli/hal-harness` has NO LICENSE
281★ Princeton PLI meta-runner has `License: none-specified`. **Cannot install without license clarity** — DEFER pending Princeton PLI license addition. The competing UK AISI inspect_ai (MIT) is the unambiguous choice.

### D.10 — `Arize-ai/openinference` standalone org does NOT exist
Probed `github.com/openinference` — the org page exists but **has zero public repositories**. The actual OpenInference code lives at `github.com/Arize-ai/openinference`. Citation-anchor downstream consumers should reference `Arize-ai/openinference` NOT bare `openinference`.

### D.11 — `bigcode-evaluation-harness` is STALE (>280d)
Last push 2025-07-22. While Apache-2.0 + named-T1 (BigCode), the staleness disqualifies it from current SOTA install lists. The `lm-evaluation-harness` (EleutherAI, 12.6k★, fresh 2026-05-11) is the live alternative for code-gen evals — though general-purpose not code-specific.

### D.12 — Native rate-limiting prevented exhaustive 100-result fetches per query
GitHub Search API capped at 30 results per page (rather than 100 requested). The 10 queries returned 12-20 results each due to ranking dedup + the per_page=30 cap. Coverage is still saturating — adjacent queries hit overlapping top-of-stars distributions — but a true 100-per-query saturation would require pagination or GraphQL search node. Confidence in §A coverage: **HIGH** for top-3 per sub-class; **MEDIUM** for tail (500-1500★ range) where some adjacencies may exist undocumented here.

---

**Document generated** 2026-05-16 in service of grand-synthesis V-FINAL-V2 deep-saturation fork.
**Companion files**:
- `GAP-EVAL-REASONING-2026-05-16.md` (eval harnesses high-level + reasoning primitives)
- `SATURATION-WORKFLOW-OBS-DEVOPS-2026-05-16.md` (L5 workflow + L4 obs rows #20-31 + L0.5 DevOps)
- `GRAPHQL-NATIVE-CC-PATHWAY-AUDIT-2026-05-16.md` (cross-cutting native-CC-pathway census)
