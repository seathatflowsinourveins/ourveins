# LAYER-C — Evals, Observability, LLM Serving, Routers, Context Optimization, Benchmarking

> W259 final-synthesis · LAYER-C deep-dive · pulled 2026-05-16 18:30Z · author: Layer-C researcher · scope: 54 candidates across 6 sublayers, raw GitHub API + Exa endorsements + DeepWiki quality probes · companion files: LAYER-A (foundation), LAYER-B (orchestration), LAYER-D (browser/codeintel/sandbox).

---

## §0 — Landscape map

### Six concentric sublayers

```
                   ┌────────────────────────────────────────────────────┐
                   │              EVAL FRAMEWORKS  (§1)                 │
                   │ inspect_ai · promptfoo · openai/evals · ragas …    │
                   └─────────────┬──────────────────────────────────────┘
                                 │ traces + scores
                   ┌─────────────▼──────────────────────────────────────┐
                   │           OBSERVABILITY / TRACING  (§2)            │
                   │ Langfuse · Phoenix · Helicone · Opik · Logfire …   │
                   └─────────────┬──────────────────────────────────────┘
                                 │ instrumented LLM calls
                   ┌─────────────▼──────────────────────────────────────┐
                   │             ROUTERS / GATEWAYS  (§4)               │
                   │ LiteLLM · Portkey · Bifrost · RouteLLM · Glide …   │
                   └─────────────┬──────────────────────────────────────┘
                                 │ provider-agnostic OpenAI-shape API
                   ┌─────────────▼──────────────────────────────────────┐
                   │              LLM SERVING  (§3)                     │
                   │ vLLM · SGLang · TGI · TensorRT-LLM · Ollama …      │
                   └─────────────┬──────────────────────────────────────┘
                                 │ raw inference + KV cache
                   ┌─────────────▼──────────────────────────────────────┐
                   │     CONTEXT / TOKEN OPTIMIZATION  (§5)             │
                   │ LLMLingua · prompt-poet · LMCache · sglang radix … │
                   └─────────────┬──────────────────────────────────────┘
                                 │ benchmarked under
                   ┌─────────────▼──────────────────────────────────────┐
                   │            BENCHMARKING INFRA  (§6)                │
                   │ lm-eval-harness · FastChat · gpt-fast · llmperf …  │
                   └────────────────────────────────────────────────────┘
```

### Key 2026 phase transitions

1. **OpenTelemetry GenAI semantic conventions stabilized** (early 2026) — Phoenix and Langfuse both ingest OTLP natively; LangSmith added OTel ingestion but remains LangChain-tilted. Vendor lock-in on observability has dropped.
2. **vLLM passed 80k stars and absorbed the production-stack** ("vLLM production stack" by Berkeley × UChicago) — TGI is now a Hugging-Face-ecosystem niche; SGLang owns the structured-output / agent-orchestration niche.
3. **LiteLLM crossed 47k stars and 8k forks** — has become the de facto OSS LLM-proxy reference; Bifrost (Go) emerged in 2025 with 50× claimed throughput advantage.
4. **Inspect AI (UK AISI)** is now the architectural reference for agent eval: its `AgentBridge` patches Anthropic/OpenAI/Google SDKs and routes through Inspect's model providers — explicit native support for Claude Code as a CLI-sandbox agent.
5. **LMCache crossed 8k stars** (KV-cache reuse across requests, integrated into vLLM) — the closest open-source analog to Anthropic prompt-caching at the serving layer.

### Native-CC pathway summary

| Layer | Pathway | Native? |
|---|---|---|
| Evals | Inspect AI `agent_bridge` patches Anthropic SDK; promptfoo has Claude provider | **Yes (Inspect explicit Claude Code)** |
| Observability | Langfuse MCP server in `web/src/features/mcp/`; OTel/Phoenix instruments SDK calls | **Yes (MCP integration)** |
| Routers | LiteLLM provides `anthropic/` + `bedrock/anthropic/` + `vertex_ai/anthropic/`; Portkey same | **Yes (proxy)** |
| Serving | vLLM/SGLang serve OSS models — Anthropic models are API-only, so serving is T1 fallback (Qwen, DeepSeek, Llama for local) | **Fallback** |

---

## §1 — EVAL FRAMEWORKS

### §1.1 Per-candidate table (sorted by stars)

| Repo | Stars | Forks | License | Last push | Native CC | Class | Notes |
|---|---|---|---|---|---|---|---|
| `promptfoo/promptfoo` | **21,303** | 1,847 | MIT | 2026-05-16 | Yes (claude provider) | EVAL · red-team | Used by OpenAI + Anthropic per repo description; CLI + CI integration; TypeScript |
| `openai/evals` | 18,472 | 2,956 | NOASSERTION | 2026-04-14 | Indirect | EVAL · classic | Original OpenAI framework + benchmark registry; broad community but slowing development; license-ambiguous |
| `confident-ai/deepeval` | 15,473 | 1,433 | Apache-2.0 | 2026-05-14 | Yes (model adapters) | EVAL · LLM-judge | "pytest for LLMs" idiom; 40+ metrics (G-Eval, faithfulness, hallucination); strong CI ergonomics |
| `explodinggradients/ragas` | 13,932 | 1,420 | Apache-2.0 | 2026-02-24 | Yes (LiteLLM) | EVAL · RAG | The reference RAG evaluator (context precision/recall, faithfulness, answer relevance) |
| `EleutherAI/lm-evaluation-harness` | 12,583 | 3,275 | MIT | 2026-05-11 | Indirect | EVAL · base | 60+ academic benchmarks; native vLLM + SGLang batch inference adapters |
| `NVIDIA/garak` | 7,824 | 946 | Apache-2.0 | 2026-05-15 | Yes (HTTP) | EVAL · red-team | The LLM vulnerability scanner; Anthropic provider; jailbreak + leakage probes |
| `Giskard-AI/giskard-oss` | 5,352 | 456 | Apache-2.0 | 2026-05-16 | Yes (LiteLLM) | EVAL · agent | OSS test framework for LLM agents; behavioral test suites |
| `princeton-nlp/SWE-bench` | 4,954 | 860 | MIT | 2026-04-01 | Indirect | BENCH · code | The repo-level coding benchmark; Claude 3.5 Sonnet → Claude 4.7 trajectory tracked on leaderboard |
| `EvolvingLMMs-Lab/lmms-eval` | 4,129 | 585 | NOASSERTION | 2026-05-15 | Yes (api) | EVAL · multimodal | Text/image/video/audio unified; integrates with lm-eval-harness |
| `THUDM/AgentBench` | 3,427 | 254 | Apache-2.0 | 2026-02-08 | Indirect | BENCH · agent | 8-environment agent benchmark; slower commit cadence |
| `truera/trulens` | 3,324 | 278 | MIT | 2026-05-16 | Yes (LiteLLM) | EVAL · RAG-tracker | Snowflake-acquired (formerly TruEra); RAG triad metrics + tracking; broad framework support |
| `stanford-crfm/helm` | 2,791 | 388 | Apache-2.0 | 2026-05-14 | Yes (api) | EVAL · holistic | Stanford CRFM's holistic-evaluation framework; reproducibility-grade |
| `UKGovernmentBEIS/inspect_ai` | **2,063** | 509 | MIT | 2026-05-16 | **YES (explicit Claude Code agent)** | EVAL · agent | UK AISI authoritative agent-eval framework; AgentBridge patches Anthropic/OpenAI/Google SDKs |
| `openai/mle-bench` | 1,530 | 246 | NOASSERTION | 2026-04-24 | Indirect | BENCH · ML | 75 Kaggle competitions as ML-engineering benchmark |
| `openai/SWELancer-Benchmark` | 1,441 | 138 | none | 2025-07-18 | Indirect | BENCH · freelance | $1M Upwork-style coding tasks; stagnant since mid-2025 |
| `sierra-research/tau-bench` | 1,229 | 197 | MIT | 2026-03-18 | Indirect | BENCH · tool-use | Sierra Research's tool-agent benchmark; standard agent reference |
| `JudgmentLabs/judgeval` | 1,035 | 93 | Apache-2.0 | 2026-05-15 | Yes (api) | EVAL · production | Continuous-improvement eval stack; agentic-focus |

### §1.2 Comparison axes

| Axis | Inspect AI | promptfoo | deepeval | ragas | lm-eval-harness | openai/evals |
|---|---|---|---|---|---|---|
| Primary use | Agent eval, red-team | Prompt regression, CI | Unit-test LLMs | RAG quality | Base-model academic | Generic eval registry |
| Anthropic Claude native | ✅ SDK-patching | ✅ provider | ✅ adapter | ✅ via LiteLLM | indirect | indirect |
| Tool-use eval | ✅ first-class | partial | partial | no | partial | no |
| Multi-turn agent loops | ✅ AgentBridge | basic | partial | no | no | no |
| CI/CD ready | partial | ✅ best-in-class | ✅ | ✅ | partial | partial |
| Activity (commits last 30d) | ~daily | ~daily | ~daily | weekly | ~daily | sparse |
| Convergence axes (orgs) | UK AISI + Anthropic ecosystem + many adopters | OpenAI + Anthropic + community | Confident AI + community | Snowflake + community | EleutherAI + academic | OpenAI + community |

### §1.3 Convergence verdict — EVAL

**Three winners by use-class:**

1. **Inspect AI** for **agent + Claude Code evaluation** — only framework with explicit `agent_bridge()` SDK-patching for Anthropic + native sandbox-CLI Claude Code support. UK AISI authority gives it regulatory grade.
2. **promptfoo** for **prompt regression + red-team in CI** — 21k stars, used by both OpenAI and Anthropic per repo, TypeScript-native works well for Next.js / Node.js teams.
3. **ragas** + **deepeval** for **RAG quality + LLM-as-judge unit-tests** respectively — both Apache-2.0, both daily commits, both have first-class LiteLLM integration.

**SOTA-status**: Eval frameworks are still fragmenting by **use-class** (agent vs. RAG vs. red-team vs. CI-regression). The 2026 transition is from "one framework wins" → "stack 2-3 by axis." Convergence on **Inspect AI for agent evals** is real (≥3 orgs: UK AISI, Anthropic ecosystem, many academic adopters); convergence on **promptfoo for CI** is similarly real.

---

## §2 — OBSERVABILITY / TRACING

### §2.1 Per-candidate table (sorted by stars)

| Repo | Stars | Forks | License | Last push | OTel native | Class | Notes |
|---|---|---|---|---|---|---|---|
| `langfuse/langfuse` | **27,314** | 2,781 | MIT (core) + commercial `ee/` | 2026-05-15 | ✅ ingest | OBS · all-in-one | YC W23; tracing + prompts + evals + datasets; open-core (ee/ directory under enterprise license); has Langfuse MCP server for Claude Code |
| `mlflow/mlflow` | 25,962 | 5,740 | Apache-2.0 | 2026-05-16 | ✅ via OTel | OBS · classic ML | Databricks-backed; added native LLM observability mid-2025; classic ML + LLM unified |
| `comet-ml/opik` | 19,322 | 1,476 | Apache-2.0 | 2026-05-15 | ✅ partial | OBS · all-in-one | Comet's OSS observability; fastest-growing star count in space |
| `Arize-ai/phoenix` | **9,705** | 874 | Elastic-v2 (NOASSERTION) | 2026-05-16 | ✅ best-in-class | OBS · OTel-first | OpenInference semconv author; UMAP embedding visualization; single-container self-host (vs Langfuse's ClickHouse + Redis + S3) |
| `traceloop/openllmetry` | 7,115 | 963 | Apache-2.0 | 2026-05-14 | ✅ source-of-truth | OBS · instrumentation | OpenLLMetry is the OTel instrumentation lib (export to any OTel backend) |
| `Helicone/helicone` | 5,677 | 577 | Apache-2.0 | 2026-05-14 | partial | OBS · gateway | YC W23; gateway-first (URL-swap deployment); AI Gateway labeled beta |
| `AgentOps-AI/agentops` | 5,555 | 577 | MIT | 2026-03-19 | partial | OBS · agent | Agent-specific tracing; activity slowing |
| `pydantic/logfire` | 4,249 | 236 | MIT | 2026-05-15 | ✅ | OBS · pydantic-tilt | Pydantic-team observability; tight pydantic-ai integration |
| `lmnr-ai/lmnr` | 2,893 | 194 | Apache-2.0 | 2026-05-16 | ✅ | OBS · agent | Laminar; YC S24; purpose-built for AI agents; high commit cadence |
| `wandb/weave` | 1,093 | 151 | Apache-2.0 | 2026-05-16 | partial | OBS · W&B-tilt | Weights & Biases LLM toolkit; W&B-ecosystem native |
| `langchain-ai/langsmith-sdk` | 887 | 233 | MIT | 2026-05-16 | partial ingest | OBS · LangChain | LangSmith SDK (server is closed); LangChain-ecosystem default; per-seat pricing |
| `lunary-ai/lunary` | (private/empty) | — | — | — | — | OBS · all-in-one | listed in landscape; very small footprint relative to peers; deprioritize |

### §2.2 Endorsement-derived comparison (from Exa research May 2026)

Synthesized from 7 recent comparison articles (futureagi 2026-04, open-techstack 2026-04, turion.ai 2026-04, examcert 2026-05, firecrawl 2025-12, pkgpulse 2026-04, apiscout 2026-03):

| Constraint | Recommended primary | Why |
|---|---|---|
| "We run OpenTelemetry and want zero lock-in" | **Phoenix** | OTLP-native receiver; OpenInference semconv authority; single-container self-host |
| "Prompts + evals + tracing in one product" | **Langfuse** | Open-core MIT (most code); best-in-class prompt-management UI |
| "Eval-first workflow + CI/CD gates" | **Braintrust** (closed-source) | Turnkey GitHub Action; closed-loop eval-to-prompt iteration |
| "Already in LangChain ecosystem" | **LangSmith** | Native LangGraph trace shape; but per-seat pricing breaks at scale |
| "RAG quality is primary risk" | **Phoenix** | UMAP embedding-drift visualization (nothing else competes in OSS) |
| "Gateway + observability in one" | **Helicone** | URL-swap deploy; built-in caching; AI Gateway in beta |
| "Most generally useful default" | **Langfuse** | Cited by 5/7 comparison articles as "default pick for new teams" |

### §2.3 Convergence verdict — OBSERVABILITY

**Three-way race won by Langfuse for breadth, Phoenix for OTel-purity:**

1. **Langfuse** — **the default pick.** MIT-licensed core, framework-agnostic, has the broadest community + best prompt-management. The risk: enterprise features (`ee/`) under separate commercial license; OLAP + blob + queue/cache + workers makes self-host heavier.
2. **Phoenix (Arize)** — **the OTel-purist pick.** Single-container self-host, OpenInference semconv author, UMAP embedding-drift killer feature. License is Elastic-v2 (NOASSERTION-flagged but Apache-style for self-host).
3. **Opik (Comet)** — **fastest-rising challenger** at 19k stars Apache-2.0; closes the gap on Langfuse for teams already paying Comet for experiment tracking.

**SOTA-status**: The market consolidated to three positions in 2026 (per turion.ai April 2026). LangSmith remains framework-locked to LangChain. Helicone is gateway-first not observability-first. Braintrust + Patronus + Galileo are commercial-only and excluded from this OSS-priority catalog.

**Convergence axes:**
- **Langfuse**: YC W23, Anthropic ecosystem MCP integration, ≥4 named-T2 endorsements, 3+ years stability — **PRIMARY OSS WINNER.**
- **Phoenix**: Arize backing, OpenInference semconv standardization vote, ≥3 distinct named-T2 endorsements — **OTel-PURIST WINNER.**

---

## §3 — LLM SERVING (T1 fallback for local models)

### §3.1 Per-candidate table (sorted by stars)

| Repo | Stars | Forks | License | Last push | Class | Lang | Notes |
|---|---|---|---|---|---|---|---|
| `ollama/ollama` | **171,528** | 16,150 | MIT | 2026-05-15 | SERVE · single-user/local | Go | Default dev-experience standard; CPU+GPU, edge; not production-multi-tenant |
| `ggml-org/llama.cpp` | **110,441** | 18,278 | MIT | 2026-05-16 | SERVE · embedded | C++ | Reference inference for GGUF; Metal/CUDA/Vulkan/CPU; lowest TTFT but no continuous batching |
| `vllm-project/vllm` | **80,191** | 16,854 | Apache-2.0 | 2026-05-16 | SERVE · production primary | Python+CUDA | PagedAttention + continuous batching; reference production serving |
| `sgl-project/sglang` | **27,870** | 5,939 | Apache-2.0 | 2026-05-16 | SERVE · structured-output | Python+CUDA | RadixAttention prefix-sharing; lowest TTFT; agent-workflow tilt |
| `mlc-ai/mlc-llm` | 22,646 | 2,039 | Apache-2.0 | 2026-05-11 | SERVE · cross-platform | Python | TVM-compiled; iOS/Android/WebGPU |
| `NVIDIA/TensorRT-LLM` | 13,659 | 2,386 | NOASSERTION | 2026-05-16 | SERVE · NVIDIA-optimal | Python+CUDA | Peak throughput on H100/H200; 2-4hr compile cost |
| `bentoml/OpenLLM` | 12,321 | 811 | Apache-2.0 | 2026-05-11 | SERVE · platform | Python | OpenAI-compatible API over BentoML; ops-tooling tilt |
| `huggingface/text-generation-inference` (TGI) | 10,855 | 1,269 | Apache-2.0 | 2026-03-21 | SERVE · HF-ecosystem | Python+Rust | Lower aggressiveness on throughput optimization; declining mindshare in 2026 |
| `InternLM/lmdeploy` | 7,855 | 697 | Apache-2.0 | 2026-05-14 | SERVE · InternLM-ecosystem | Python | InternLM/Shanghai AI Lab; high-performance TurboMind backend |
| `predibase/lorax` | 3,781 | 312 | Apache-2.0 | 2026-05-15 | SERVE · multi-LoRA | Python | 1000s of fine-tuned models on shared GPU |
| `lmstudio-ai/lmstudio.js` | 1,646 | 261 | MIT | 2026-05-07 | SERVE · GUI | TypeScript | LM Studio's JS SDK; consumer-grade |
| `kvcache-ai/ktransformers` | ~13k (est) | (rate-limited) | Apache-2.0 | active | SERVE · expert-heavy | Python | THU; MoE-CPU-offload king; DeepSeek-V3 CPU+single-GPU |

### §3.2 Benchmark synthesis (from Exa-sourced multi-source benchmarks, May 2026)

Aggregating: deploybase.ai 2026-02 (vLLM 0.8.3 / SGLang 0.3.1 / TGI 2.1.1 / TensorRT-LLM 0.11.0); sglang official benchmark vs vLLM 0.6.0; iotdigitaltwinplm Q2 2026; charleschen.ai wiki; yottalabs 2026-05; vllm-tgi arxiv 2511.17593.

**Llama 3.3 70B on H100, batch=32, 4K context, 2026-Q2:**

| Engine | Throughput (tok/s) | P50 TTFT | P99 TTFT | P50 TPOT | Notes |
|---|---|---|---|---|---|
| **TensorRT-LLM** | 4,500 | 75ms | 118ms | 7.6ms | Peak throughput; tight p99; 2-4hr compile |
| **SGLang** | 4,880 | 79ms | 135ms | 7.9ms | RadixAttention prefix-sharing; best TTFT |
| **vLLM** | 4,250 | 82ms | 140ms | 8.2ms | Most balanced; widest hardware support |
| **TGI** | 3,120 | 94ms | 165ms | 9.1ms | Trailing; Rust+Python overhead |

**Throughput speedups (LLaMA-2-7B @ 100 concurrent, arxiv 2511.17593):**
- vLLM: 15,243 tok/s · TGI: 4,156 tok/s · **3.67× speedup for vLLM**
- vLLM uses 19-27% less GPU memory + 85-92% utilization (TGI: 68-74%)

### §3.3 Convergence verdict — SERVING

**Three winners by deployment class:**

1. **vLLM** — **production primary.** 80k stars, Apache-2.0, Anyscale + NVIDIA NeMo-RL + Kthena + llm-d + vLLM-production-stack all integrate it. PagedAttention is now standard. The de facto OSS serving reference. ≥5 organizationally-distinct major adopters.
2. **SGLang** — **agent / structured-output tilt.** 27k stars, RadixAttention prefix-sharing is materially better than vLLM's for chat workloads with shared system prompts. Best TTFT in OSS. NVFP4 not yet supported (lags vLLM on Blackwell).
3. **Ollama** — **dev-experience standard.** 171k stars but architectural class is single-user/CPU+GPU/edge, not production multi-tenant. Use for local dev, prototyping, Claude Code offline-fallback testing.

**SOTA-status**: vLLM is converged-on for production serving in 2026 (≥5 distinct major orgs: UC Berkeley, Anyscale, NVIDIA, Hugging Face RL libraries, Ray). SGLang is converged-on for agent workflows. TGI is in mindshare-decline (last push 2026-03-21 vs vLLM daily); TensorRT-LLM remains the absolute-peak NVIDIA tilt but operational complexity gates adoption.

---

## §4 — ROUTERS / GATEWAYS

### §4.1 Per-candidate table (sorted by stars)

| Repo | Stars | Forks | License | Last push | Class | Lang | Notes |
|---|---|---|---|---|---|---|---|
| `BerriAI/litellm` | **47,216** | 8,103 | open-core (NOASSERTION) + enterprise | 2026-05-16 | ROUTER · de facto | Python | 100+ providers; OpenAI-compatible; virtual keys + spend tracking + guardrails + LB; widely deployed |
| `Portkey-AI/gateway` | 11,748 | 1,069 | MIT | 2026-03-25 | ROUTER · enterprise-tilt | TypeScript | 250+ models; 20-40ms overhead; cited by firecrawl as "Portkey is the gateway pick" |
| `maximhq/bifrost` | **4,961** | 600 | Apache-2.0 | 2026-05-16 | ROUTER · ultra-fast | Go | Claims 50× faster than LiteLLM; <100µs overhead at 5k RPS; emerging Q1 2025 |
| `lm-sys/RouteLLM` | 4,893 | 377 | Apache-2.0 | 2024-08-10 | ROUTER · cost-routing | Python | LMSYS framework for prompt-difficulty routing (cheap-vs-expensive); stale since 2024-08 |
| `NVIDIA-AI-Blueprints/llm-router` | 272 | 73 | Apache-2.0 | 2026-05-07 | ROUTER · NVIDIA-blueprint | Jupyter | NVIDIA's reference router blueprint; experimental |
| `EinStack/glide` | 160 | 26 | Apache-2.0 | 2024-08-12 | ROUTER · niche | Go | Stale; abandoned in 2024-08 |

### §4.2 Comparison axes

| Axis | LiteLLM | Portkey | Bifrost | RouteLLM |
|---|---|---|---|---|
| Providers supported | 100+ | 250+ | 1000+ claimed | OpenAI/Anthropic |
| OpenAI-compatible API | ✅ | ✅ | ✅ | ✅ |
| Anthropic native (incl. Bedrock, Vertex) | ✅ first-class | ✅ | ✅ | ✅ |
| Throughput overhead | ~ms-range | 20-40ms | <100µs @ 5k RPS | n/a (routing layer) |
| Virtual keys + spend tracking | ✅ | ✅ | ✅ | no |
| Guardrails | ✅ | ✅ | ✅ | no |
| OSS license | open-core + commercial `enterprise/` | MIT (full) | Apache-2.0 (full) | Apache-2.0 |
| Adoption (2026) | de facto reference | enterprise-tilt | rising fast | research-cite |
| Activity | daily | weekly | daily | stale (2024-08) |

### §4.3 Convergence verdict — ROUTERS

**Two clear winners, one rising challenger:**

1. **LiteLLM** — **the de facto OSS router.** 47k stars Apache-style core + commercial `enterprise/` dir. Cited as the proxy reference across all Layer-A/B research and almost every observability comparison. Pairs with Langfuse/Phoenix as the proxy+observe pattern.
2. **Portkey-AI/gateway** — **the enterprise tilt.** 11k stars MIT-full (no open-core gotcha), 250+ models, lower latency than LiteLLM at scale, recommended by firecrawl 2025-12 for production routing.
3. **Bifrost** — **the throughput challenger.** Go-native, claims 50× LiteLLM throughput. Worth piloting but emerging (created 2025-03); license clean Apache-2.0. Not yet ≥3-org converged.

**SKIP**: RouteLLM (stale since 2024-08), Glide (abandoned 2024-08), NVIDIA-AI-Blueprints/llm-router (272 stars, experimental Jupyter notebooks).

**SOTA-status**: LiteLLM convergence is unambiguous (≥5 orgs: BerriAI + Langfuse integration + LangChain + LlamaIndex + extensive plugin-ecosystem dependence). Portkey convergence is enterprise-tilted but real. Bifrost is genuine emerging-SOTA — re-audit Q3 2026.

---

## §5 — CONTEXT / TOKEN OPTIMIZATION

### §5.1 Per-candidate table

| Repo | Stars | Forks | License | Last push | Class | Notes |
|---|---|---|---|---|---|---|
| `LMCache/LMCache` | **8,278** | 1,177 | Apache-2.0 | 2026-05-16 | KV-cache reuse | "Supercharge Your LLM with the Fastest KV Cache Layer"; integrated into vLLM upstream; cross-request prefix-cache |
| `microsoft/LLMLingua` (incl. LLMLingua-2) | **6,193** | 383 | MIT | 2026-04-08 | Prompt compression | ACL 2024 Findings; 3-6× faster than v1; 20× compression with minimal perf loss; LangChain + LlamaIndex integrations |
| `character-ai/prompt-poet` | 1,148 | 95 | MIT | 2026-02-12 | Prompt templating | Character.AI's production prompt-orchestration library |

### §5.2 Stratification

| Strategy | Where it runs | When to use | Claude Code applicability |
|---|---|---|---|
| **Anthropic prompt-caching** (server-side) | Anthropic infra | Default for Claude calls with repeated system prompts | ✅ already in CC environment via SDK; <https://docs.anthropic.com/en/docs/build-with-claude/prompt-caching> |
| **LMCache** (server-side, OSS) | Local vLLM/SGLang serving | When self-hosting Llama/Qwen/DeepSeek for T1 fallback | ⚠ only useful for local-model fallback; doesn't reduce Anthropic API token cost |
| **SGLang RadixAttention** (server-side) | SGLang serving runtime | When using SGLang for local agent workflows | ⚠ same caveat — local-model only |
| **LLMLingua-2** (client-side, pre-API) | Python prompt-compression before API call | Cuts client→Anthropic API tokens 20-60% on long-context | ✅ usable; trade-off: <2% quality loss on most tasks per ACL paper |
| **prompt-poet** (client-side, templating) | Python templating | Structured prompt construction at scale | ✅ structural-pattern; complementary to caching |

### §5.3 Convergence verdict — CONTEXT OPTIMIZATION

**Primary recommendation for Claude Code workloads:**

1. **Anthropic prompt-caching** (native) — already supported in the Anthropic SDK; the **first-tier** approach. No external deps. CC plugin layer should always-on cache stable system prompts + tool definitions.
2. **LLMLingua-2** — **adopt for client-side compression** when long-context (>100K tokens) inputs are common. MIT license, 3-6× faster than v1, integrates with LangChain. Caveat: research-grade — pilot in a contained workflow first.
3. **LMCache** + **SGLang RadixAttention** — **adopt only for local-model fallback path**. They reduce serving cost on self-hosted Llama/DeepSeek/Qwen; don't help with Anthropic API.

**SOTA-status**: Anthropic prompt-caching is the converged-on default for CC workloads (Anthropic CC official docs, ≥3 SDK integrations). LMCache is converged in the vLLM ecosystem. LLMLingua-2 is research-converged but production-pilot stage.

---

## §6 — BENCHMARKING INFRA

### §6.1 Per-candidate table

| Repo | Stars | Forks | License | Last push | Class | Notes |
|---|---|---|---|---|---|---|
| `lm-sys/FastChat` | **39,470** | 4,794 | Apache-2.0 | 2026-05-01 | BENCH · arena | LMSYS Chatbot Arena framework; historically the Arena reference; activity slowing |
| `EleutherAI/lm-evaluation-harness` (§1) | 12,583 | 3,275 | MIT | 2026-05-11 | BENCH · academic | The base-model academic-benchmark de facto reference; native vLLM + SGLang adapters |
| `pytorch-labs/gpt-fast` | 6,206 | 573 | BSD-3 | 2025-08-22 | BENCH · minimal-impl | Reference minimal-fast-inference impl; PyTorch foundation; stale 2025-08 |
| `ray-project/llmperf` | ~5k (est) | (rate-limited) | Apache-2.0 | active | BENCH · serving | Anyscale's LLM-serving benchmark suite; standard for vLLM-perf reproducibility |
| `OpenRouterTeam/openrouter-runner` | (rate-limited) | — | — | — | BENCH · OR-tilt | OpenRouter's serving runner; OpenRouter-ecosystem-specific |

### §6.2 Convergence verdict — BENCHMARKING

**Two winners:**

1. **lm-eval-harness** — **academic-benchmark reference.** 60+ benchmarks, native vLLM + SGLang adapters, MIT license, daily commits. Use for any base-model capability comparison.
2. **ray-project/llmperf** — **serving-benchmark reference.** Anyscale-maintained; the standard for reproducing vLLM benchmark claims.

**Use FastChat only if you need Arena-style ELO leaderboard infrastructure** (slowing development; activity declining 2026); the Arena live-service is more useful than the OSS framework now.

**Use gpt-fast only as reference reading** (stale; 2025-08); educational not production.

---

## §7 — Cross-sublayer convergence findings

### §7.1 The 2026 "production stack" pattern

Cross-referenced across §2's 7 endorsement articles + §3's 6 benchmark articles + DeepWiki probes on Inspect AI/Langfuse/Phoenix/vLLM:

```
   ┌──────────────────────────────────────────────────────────┐
   │   Claude Code application                                │
   └──────────────┬───────────────────────────────────────────┘
                  │ Anthropic SDK calls
   ┌──────────────▼───────────────────────────────────────────┐
   │   OBSERVE: Langfuse (default) or Phoenix (OTel-pure)     │
   │           [+ Anthropic prompt-cache always-on]           │
   └──────────────┬───────────────────────────────────────────┘
                  │ optionally proxied
   ┌──────────────▼───────────────────────────────────────────┐
   │   ROUTE: LiteLLM (de facto) — Anthropic/Bedrock/Vertex   │
   │           virtual keys + spend tracking + guardrails     │
   └──────────────┬───────────────────────────────────────────┘
                  │ for local-model fallback only
   ┌──────────────▼───────────────────────────────────────────┐
   │   SERVE: vLLM (production) or SGLang (agent/structured)  │
   │           [LMCache for KV reuse]                         │
   └──────────────────────────────────────────────────────────┘

   ┌──────────────────────────────────────────────────────────┐
   │   EVALUATE (offline / CI):                               │
   │   - Inspect AI for agent / Claude Code workflows         │
   │   - promptfoo for prompt regression                      │
   │   - ragas for RAG quality                                │
   │   - deepeval for LLM-as-judge unit tests                 │
   │   - lm-eval-harness for base-model capability            │
   └──────────────────────────────────────────────────────────┘
```

### §7.2 Convergence-axis matrix (≥3 orgs, ≥2 named-T2, ≥3 months stability)

| Tool | Orgs (Axis-1) | Named endorsements (Axis-2) | Stability (Axis-3) | Verdict |
|---|---|---|---|---|
| Inspect AI | UK AISI + Anthropic ecosystem + ≥3 academic adopters | UK AISI authority + DeepWiki confirms Claude Code support | 2+ years daily commits | **PASS** (agent-eval class) |
| promptfoo | OpenAI + Anthropic + 21k community | "Used by OpenAI and Anthropic" (repo desc) | 3+ years daily commits | **PASS** (CI-prompt-regression class) |
| Langfuse | YC W23 + Anthropic MCP integration + 5/7 comparison articles default | 5 named endorsements (futureagi, open-techstack, turion.ai, examcert, pkgpulse) | 3+ years daily commits | **PASS** (OSS observability class) |
| Phoenix | Arize + OpenInference semconv + ≥3 comparison articles | "OTel-purist pick" across 4 articles | 3+ years daily commits | **PASS** (OTel-native observability class) |
| LiteLLM | BerriAI + LangChain + LlamaIndex + Langfuse + Phoenix | "the OSS LLM-proxy reference" in 5+ articles | 2+ years daily commits | **PASS** (router class) |
| vLLM | UC Berkeley + Anyscale + NVIDIA NeMo-RL + Kthena + llm-d + RL libs | ≥5 named comparison-article endorsements | 3+ years daily commits | **PASS** (production-serving class) |
| SGLang | sgl-project + lm-eval-harness adapter + agent-framework integrations | ≥3 named (deploybase, charleschen wiki, yottalabs) | 2+ years daily commits | **PASS** (structured-output serving class) |
| LMCache | LMCache org + vLLM upstream + Apache-2.0 ecosystem | ≥2 named endorsements + vLLM integration | 2 years daily commits | **PASS** (KV-cache class) |
| LLMLingua-2 | Microsoft + ACL 2024 publication + LangChain integration | ACL paper + LangChain docs | 2 years sporadic | **PASS-WITH-PILOT** (compression class) |

### §7.3 Notable non-converged (still single-org or stale)

- **Bifrost** — genuine emerging-SOTA but only ≥1 org; re-audit Q3 2026.
- **RouteLLM** — stale since 2024-08; superseded by LiteLLM's built-in routing or commercial alternatives.
- **Helicone** — gateway-first tilt; AI Gateway labeled beta; pick Langfuse + LiteLLM instead unless URL-swap deploy is mandatory.
- **lunary, glide, openrouter-runner** — sub-1000 stars or stale; deprioritize.
- **openai/SWELancer-Benchmark** — no commits since 2025-07; benchmark of historical interest only.

---

## §8 — Recommended install set with rationale

### §8.1 Tier-A (install in next install wave) — pure-OSS Anthropic-compatible

| Pick | Sublayer | Use class | Install mechanism | Rationale |
|---|---|---|---|---|
| **Inspect AI** | §1 EVAL | Agent / Claude Code eval | `pip install inspect-ai` | Explicit native Claude Code support via `agent_bridge()`; UK AISI authority; ≥3-org converged |
| **promptfoo** | §1 EVAL | CI prompt-regression | `npm i -g promptfoo` | Used by OpenAI + Anthropic per repo; TypeScript-native; best CI integration in space |
| **Langfuse** | §2 OBS | All-in-one observability | self-host Docker compose | Default pick across 5/7 endorsement articles; MIT core; Anthropic MCP server included |
| **LiteLLM** | §4 ROUTER | OSS proxy | self-host or pip | De facto OSS router; pairs with Langfuse; first-class Anthropic + Bedrock + Vertex |
| **vLLM** | §3 SERVE | Local-model T1 fallback | docker pull vllm/vllm-openai | Production-serving reference; ≥5-org converged; ecosystem leader |
| **LMCache** | §5 CONTEXT | KV reuse for vLLM | pip via vLLM integration | Closes serving-side prompt-cache gap; Apache-2.0 |
| **lm-eval-harness** | §6 BENCH | Base-model academic eval | pip + vLLM adapter | Academic-benchmark reference; daily commits; vLLM/SGLang native |

### §8.2 Tier-B (install when use-case arrives)

| Pick | When to install | Rationale |
|---|---|---|
| **ragas** | When RAG quality becomes a SLO | Apache-2.0; the RAG eval reference |
| **deepeval** | When LLM-as-judge unit tests become CI need | Apache-2.0; "pytest for LLMs" idiom |
| **NVIDIA/garak** | Before any LLM-touching public release | LLM vulnerability scanner; jailbreak/leakage probes |
| **SGLang** | When agent workflows justify dual serving | Best TTFT + RadixAttention prefix-sharing for chat workloads |
| **Phoenix (Arize)** | If OTel purity is mandated | Single-container self-host; OpenInference semconv author |
| **LLMLingua-2** | When long-context input cost becomes top-3 expense | MIT; 20× compression with <2% quality loss |
| **Ollama** | For dev/offline-fallback testing | Local single-user reference; 171k-star DX standard |

### §8.3 Tier-C (study/pilot only — re-audit later)

| Candidate | Why deferred | Re-audit trigger |
|---|---|---|
| **Bifrost** | Genuine emerging-SOTA but single-org Axis-1 only | Q3 2026 — if ≥3-org adoption emerges |
| **Opik** | Apache-2.0, 19k stars — but Langfuse already chosen for breadth | If Comet-ecosystem dependency emerges |
| **Helicone** | Gateway-first; AI Gateway in beta | If URL-swap deploy becomes mandatory |
| **TensorRT-LLM** | Peak NVIDIA throughput but 2-4hr compile cost + operational complexity | If H100/H200 cost optimization becomes top priority |
| **prompt-poet** | Production-grade but Character.AI-specific patterns | If structured prompt-templating-at-scale need emerges |

### §8.4 Explicit SKIP (do not install)

| Candidate | Reason |
|---|---|
| RouteLLM | Stale since 2024-08 — superseded by LiteLLM built-in routing |
| EinStack/glide | Stale since 2024-08 — abandoned |
| openai/SWELancer-Benchmark | No license + stale since 2025-07 |
| openai/evals | NOASSERTION license + slowing development; superseded by Inspect AI for agent eval |
| FastChat | Slowing development; Arena live-service more useful than OSS framework now |
| AgentOps | Activity slowing (2026-03-19 last push) — superseded by Langfuse / Phoenix |
| Lunary | Sub-significant adoption signal at this scale |
| TGI (Hugging Face) | Mindshare-decline; last push 2026-03-21 vs vLLM daily; 3.67× slower per arxiv 2511.17593 |
| THUDM/AgentBench | Stagnant (last push 2026-02-08); superseded by tau-bench + SWE-bench for agent benchmarking |

---

## §9 — Cross-references to W258 v13

W258 v13 already documents some of this layer at a higher level. This LAYER-C deep-dive **supplements** rather than supersedes W258 v13's choices.

| W258 v13 says | This document confirms | This document adds |
|---|---|---|
| Langfuse for observability | ✅ confirmed §2.3 | + Phoenix as OTel-purist alternative; + endorsement-grounded comparison matrix |
| LiteLLM for routing | ✅ confirmed §4.3 | + Portkey as enterprise tilt; + Bifrost as Tier-C emerging |
| vLLM for serving | ✅ confirmed §3.3 | + SGLang for structured-output / agent-workflow; + benchmark-grounded throughput data |
| (eval framework picks not finalized in v13) | — | **NEW §1**: Inspect AI as agent-eval primary; promptfoo for CI; ragas + deepeval as Tier-B |
| (context optimization not in v13) | — | **NEW §5**: Anthropic prompt-cache → LMCache → LLMLingua-2 strategy stratification |
| (benchmark infra not in v13) | — | **NEW §6**: lm-eval-harness + ray-project/llmperf reference benchmarks |

---

## Appendix A — Raw data sources

- **GitHub API**: 51 of 54 repos fetched directly via `https://api.github.com/repos/{path}` 2026-05-16 18:30Z; 3 rate-limited (kvcache-ai/ktransformers, ray-project/llmperf, OpenRouterTeam/openrouter-runner) — values derived from prior knowledge or marked as "(rate-limited)" inline.
- **Exa endorsements**: 7 LLM-observability comparison articles (Apr-May 2026) + 6 LLM-serving benchmark articles (Feb-May 2026).
- **DeepWiki probes**: Inspect AI, Langfuse, Phoenix, LiteLLM, vLLM, microsoft/LLMLingua, lm-eval-harness — quality + integration claims directly verified.
- **Raw JSON cache**: `Z:\claude-sota-installed\.claude\worktrees\w259-final-synthesis\tmp-layer-c-repos.json` (delete after W259 closeout).

## Appendix B — Re-audit triggers

| Trigger | Action |
|---|---|
| Bifrost ≥3-org Axis-1 PASS | Promote from Tier-C to Tier-A (router class) |
| Phoenix Elastic-v2 → Apache-2.0 license change | Reconsider Phoenix as default observability over Langfuse |
| SGLang adds NVFP4 support | Re-benchmark vs vLLM on Blackwell |
| Inspect AI Anthropic-official-adoption announcement | Codify as canonical Claude Code eval harness |
| openai/evals development resumption | Re-audit vs Inspect AI |
| New context-optimization breakthrough (LLMLingua-3 or alt) | Re-audit §5 |
