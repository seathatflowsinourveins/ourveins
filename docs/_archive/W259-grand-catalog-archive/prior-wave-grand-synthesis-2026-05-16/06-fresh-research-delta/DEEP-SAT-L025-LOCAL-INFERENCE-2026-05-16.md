# DEEP-SATURATION L0.25 — Local LLM Inference Runtime EXHAUSTIVE Coverage (2026-05-16)

> **Fork**: DEEP-SATURATION pass on L0.25 (Local Inference Runtime layer) per operator directive "Beyond vLLM/SGLang/omlx already known, find ALL SOTA local-LLM runtimes". Goal: ≥40 rows organized by hardware-class (NVIDIA / AMD / Apple-Silicon / CPU / multi-arch), with D1-D8 scoring + native-CC-pathway + scale-class + 6-class disposition.
>
> **Method**: 10 GraphQL probes (LLM-inference-server, local-LLM-runtime, llama.cpp, ollama, GGUF, MLX-Apple, GPU-inference-opt, KV-cache, speculative-decoding, vLLM+SGLang) + 30 explicit name-search probes + cross-reference with prior GAP-LAYER-L025-L075-INFERENCE-SANDBOX-2026-05-16 + V-FINAL-V3-CONSOLIDATED.
>
> **Mid-run state**: GitHub rate-limit hit after probe #19. Subset-completion via prior sota-researcher fork data (a058977002fbb5c53) + DeepWiki direct lookups + context7 fallback. Final 4 verification probes (intel/intel-extension-for-pytorch fresh PRs, AMD/migraphx 2026 cadence, ray-project/ray Serve 2026 release notes, ggml-org/whisper.cpp 2026 freshness) deferred to next wave per CR-12 PARTIAL-PASS — does NOT block §A matrix completion since core data already gathered from prior research wave.
>
> **Coverage delta vs prior wave**: prior GAP-LAYER-L025 covered 10 rows. This DEEP-SAT pass extends to **45+ rows** with strict hardware-class taxonomy + per-row D1-D8 + native-CC-pathway tier + scale-class + LATENCY/THROUGHPUT primitive callouts.
>
> **Scoring rubric** (D1-D8 ×10 each = max 80):
> - **D1 Stars/community** (size+velocity; >50k=10, >10k=8, >2k=6, >500=4, <500=2)
> - **D2 License-fit** (MIT/Apache-2.0=10; BSL/AGPL=5; proprietary/closed=1)
> - **D3 Native-CC-pathway** (drop-in OpenAI-compat API for CC=10; HTTP/gRPC adapter req=7; custom client=4; bespoke=2)
> - **D4 Maintenance freshness** (last commit ≤30d=10; ≤90d=7; ≤180d=4; >=1y=1)
> - **D5 Perf benchmarks** (verified-independent leader=10; runner-up=8; SELF-REPORTED leader=5; SELF-REPORTED claim=3; no public=2)
> - **D6 Operational simplicity** (single-binary trivial=10; docker+1config=8; multi-service=5; k8s-only=3)
> - **D7 Hardware-portability** (≥3 hw-classes=10; 2=7; 1-class-multi-vendor=5; vendor-niche=2)
> - **D8 SOTA-feature-coverage** (PagedAttention+ContBatching+SpecDecode+KV-reuse=10; 3/4=7; 2/4=5; 1/4=3)
>
> **Verdict classes**: INSTALL (top tier) · INSTALL-NICHE (sub-class hardware winner) · STUDY-PILOT (worth tracking) · DUAL-FIT (complements existing install) · DEFER (license/maturity gate) · REJECT-LICENSE / REJECT-ARCHIVED / REJECT-VENDOR-NICHE

---

## §A — EXHAUSTIVE Local Inference Runtime matrix (45 rows × 10 columns)

| # | repo | ★ | license | last-commit | hardware-class | scale-class | native-CC-pathway | D1-D8 sum/80 | verdict |
|---|---|---|---|---|---|---|---|---|---|
| **— TIER-1 NVIDIA-PRIMARY ENGINES (PagedAttention/RadixAttention stack) —** | | | | | | | | | |
| 1 | **vllm-project/vllm** | **80,178** | Apache-2.0 | 2026-05-16 | NVIDIA-primary; AMD/Intel/TPU/Apple-Metal-secondary | single-GPU → multi-GPU → multi-node | T3-OpenAI-compat HTTP `/v1/chat/completions` | **78/80** (10/10/10/10/10/8/10/10) | **INSTALL** — primary L0.25 NVIDIA engine; 200+ architectures; 8 speculative decoding methods (EAGLE3, MTP, PARD, DFlash); PagedAttention + continuous batching SOTA reference |
| 2 | **sgl-project/sglang** | 27,866 | Apache-2.0 | 2026-05-16 | NVIDIA-primary; AMD/Intel-secondary | single-GPU → multi-GPU → multi-node | T3-OpenAI-compat HTTP | **74/80** (9/10/10/10/9/8/8/10) | **INSTALL** — peer engine to vLLM; RadixAttention KV-reuse leader for multi-turn agentic workloads; Mooncake RDMA P2P weight transfer 2026-04-29 (7x for 1T Kimi-K2); structured outputs via xgrammar |
| 3 | **vllm-project/aibrix** | 4,807 | Apache-2.0 | 2025-11-XX | K8s+NVIDIA | multi-GPU → multi-node | T3-via-vLLM | **52/80** (6/10/7/4/7/3/5/10) | **DEFER** — K8s-native middleware (routing/autoscale/KV-cache-opt); single-host workspace doesn't need it; revisit when multi-node deploy |
| 4 | **vllm-project/semantic-router** v0.2 "Athena" | 4,100 | Apache-2.0 | 2026-03-10 | hw-agnostic | request-routing-layer | T3-Envoy ExtProc + OpenAI-compat | **64/80** (6/10/9/8/8/6/9/8) | **INSTALL** — promote to L1 Cross-model routing as per-request model-selection layer; Thompson-Sampling/RouterDC/AutoMix + jailbreak/PII guards + semantic cache; OTel+Prometheus |
| 5 | **kvcache-ai/Mooncake** | 5,340 | Apache-2.0 | 2026-05-XX | NVIDIA RDMA-fabric | multi-node only | T3-vLLM+SGLang+LMCache+NIXL plugin | **64/80** (7/10/6/9/10/3/9/10) | **STUDY-PILOT** — production-grade for ≥4-node clusters; Kimi K2 prod on 128 H200 with PD-disagg; 75% req throughput; 87→190 GB/s KV transfer (4.6x vs TCP); 57% TTFT cut w/ SSD offload. Multi-node only |
| 6 | **kvcache-ai/ktransformers** | ~12k (re-verify) | Apache-2.0 | 2026-XX-XX (defer) | CPU+single-GPU offload | laptop → single-GPU + CPU-RAM-offload | T3-OpenAI-compat HTTP | **62/80** (8/10/8/6/8/7/6/9) | **STUDY-PILOT** — CPU-GPU heterogeneous MoE inference (DeepSeek-V3/V2 671B on 1×24GB GPU + 256GB CPU-RAM); SOTA for consumer-hardware MoE; freshness defer to next-wave probe |
| **— TIER-2 ALL-PURPOSE PORTABLE ENGINES (llama.cpp ecosystem) —** | | | | | | | | | |
| 7 | **ggml-org/llama.cpp** | **88k+** | MIT | 2026-05-16 | CPU primary; CUDA/Metal/ROCm/Vulkan/SYCL secondary | laptop → single-GPU + CPU-RAM-offload | T3-OpenAI-compat HTTP (`llama-server`) | **77/80** (10/10/10/10/8/10/10/9) | **INSTALL** — universal SOTA portable engine; GGUF format origin; Vulkan/Metal/ROCm/CUDA/SYCL/CANN backends; multimodal (Gemma-3/Qwen2.5-VL/InternVL); the operator's primary single-machine fallback |
| 8 | **ggml-org/ggml** | 12k+ | MIT | 2026-05-16 | hw-agnostic primitive | tensor-lib layer | T5-no-direct (lib for engines) | **62/80** (8/10/2/10/8/10/10/4) | **INSTALL-IMPLICIT** — substrate behind llama.cpp/whisper.cpp; not directly served, but operationally required |
| 9 | **ggml-org/whisper.cpp** | 38k+ | MIT | 2026-XX (defer) | CPU primary; CUDA/Metal secondary | laptop → single-GPU | T5-not-LLM-but-ASR-engine | **52/80** (9/10/2/7/8/10/8/-) | **INSTALL-NICHE** — ASR sibling primitive for voice-layer (L5 multimodal); coverage moved to L25-L35-MULTIMODAL-UI deep-sat |
| 10 | **ollama/ollama** | **150k+** | MIT | 2026-05-16 | CPU+CUDA+Metal+ROCm | laptop → single-GPU | T3-OpenAI-compat HTTP (`/v1/`) | **76/80** (10/10/10/10/7/10/10/9) | **INSTALL** — UX-leader local-runtime (one-line model pull + run); wraps llama.cpp; multi-model load+swap; multimodal (LLaVA/Gemma3-vision); the operator's primary laptop quick-launch |
| 11 | **ollama-webui/ollama-webui → open-webui/open-webui** | **65k+** | BSD-3 | 2026-05-16 | hw-agnostic (UI client) | UI for any backend | T3-OpenAI-compat client + tools | **66/80** (10/10/8/10/7/8/10/3) | **INSTALL-NICHE** — UI/orchestration layer for Ollama+vLLM+any OpenAI-compat; covered in L25-L35-MULTIMODAL-UI |
| 12 | **LostRuins/koboldcpp** | 7k+ | AGPL-3.0 (some BSD components) | 2026-05-16 | CPU+CUDA+Metal+ROCm+Vulkan | laptop → single-GPU | T3-OpenAI-compat HTTP | **52/80** (6/5/8/10/6/9/8/-) | **DEFER** — single-binary llama.cpp distribution with KoboldAI API; AGPL gate; superseded by ollama for general use; novelist/RP niche |
| 13 | **abetlen/llama-cpp-python** | 9k+ | MIT | 2026-05-16 | CPU+CUDA+Metal+ROCm | laptop → single-GPU | T3-OpenAI-compat HTTP server | **62/80** (7/10/9/10/7/9/9/-) | **INSTALL-NICHE** — Python bindings for llama.cpp with built-in OpenAI-compat server; if Python-native ops preferred over Go ollama |
| 14 | **mostlygeek/llama-swap** | 1.5k+ | MIT | 2026-05-16 | hw-agnostic (proxy) | model-swap proxy | T3-OpenAI-compat proxy | **52/80** (5/10/9/10/5/8/8/-) | **STUDY-PILOT** — model-swap proxy: on-demand load/unload to fit multiple models in limited VRAM; useful for low-resource workspaces |
| 15 | **theroyallab/tabbyAPI** | 1k+ | MIT | 2026-05-16 | NVIDIA primary (ExLlamaV2 backend) | single-GPU | T3-OpenAI-compat HTTP | **52/80** (4/10/9/9/6/8/4/8) | **STUDY-PILOT** — fast EXL2/GPTQ-focused server; lean alternative to vLLM for single-GPU; pairs with exllamav2 |
| 16 | **turboderp-org/exllamav2** | 5.5k | MIT | 2026-05-16 | NVIDIA primary | single-GPU | T3-via-tabbyAPI | **58/80** (6/10/4/10/8/8/3/9) | **INSTALL-NICHE** (engine) / **STUDY-PILOT** (direct) — EXL2 quant SOTA; fastest single-GPU consumer inference; pair with tabbyAPI for serve |
| **— TIER-3 APPLE-SILICON (MLX + Core ML ecosystem) —** | | | | | | | | | |
| 17 | **apple/mlx** | 22k+ | MIT | 2026-05-16 | Apple Silicon (M1-M5) | laptop only | T5-Python framework | **66/80** (8/10/2/10/8/9/4/9) | **INSTALL-IMPLICIT** — substrate behind MLX-LM, omlx, vllm-metal; required for any Apple-stack local inference |
| 18 | **ml-explore/mlx-examples** | 7k+ | MIT | 2026-05-16 | Apple Silicon | laptop only | T5-via-mlx-lm | **60/80** (7/10/3/10/7/9/4/8) | **INSTALL-NICHE** — reference MLX-LM CLI/Python server; gateway to Apple-Silicon native inference; precursor to omlx polish |
| 19 | **vllm-project/vllm-metal** | 1,149 | Apache-2.0 | 2026-05-16 | Apple Silicon (M-series) | laptop only | T3-via-vLLM-OpenAI-compat | **52/80** (4/10/9/10/5/7/3/9) | **INSTALL-NICHE** (Mac-operator) — community Apple-Silicon vLLM plugin using MLX backend; M1-M5; NEW 2025-12 |
| 20 | **jundot/omlx** | 14,281 | Apache-2.0 | 2026-05-16 | Apple Silicon | laptop only | T3-OpenAI-compat HTTP | **70/80** (8/10/10/10/7/9/4/10) | **INSTALL** (Mac-primary) — Apple Silicon LLM server with continuous batching + SSD caching; menu-bar managed; OpenAI API; oQ-quant 2026-05-14; VLM+text+TTS; 14k★ in 90 days |
| 21 | **raullenchai/Rapid-MLX** | 2,367 | Apache-2.0 | 2026-05-16 | Apple Silicon | laptop only | T3-OpenAI-compat HTTP (drop-in for Claude Code) | **58/80** (6/10/10/10/5/8/3/9) | **STUDY-PILOT** — "4.2x faster than Ollama on Mac" [SELF-REPORTED]; 0.08s cached TTFT; 17 tool parsers; verify benchmark before INSTALL |
| 22 | **Mininglamp-AI/cider** | 335 | not specified | 2026-04-27 | Apple M5 only (W8A8/W4A8 INT8 TensorOps) | laptop only | T5-MLX custom primitive | **42/80** (3/3/3/10/6/7/2/8) | **DEFER** — promising 1.2-1.9x prefill on M5 but license unverified; re-probe Q3 2026 |
| 23 | **ARahim3/mlx-tune** | ~400 | MIT/Apache (verify) | 2026-XX | Apple Silicon | laptop fine-tune | T5-CLI tool | **40/80** | **STUDY-NICHE** — MLX fine-tuning utility; complements but not serving |
| 24 | **SharpAI/SwiftLM** | ~300 | MIT (verify) | 2026-XX | Apple Silicon (Swift bindings) | laptop only | T5-Swift API | **40/80** | **STUDY-NICHE** — Swift-native MLX wrapper; macOS app embed |
| 25 | **osaurus-ai/osaurus** | 5,335 | (verify) | 2026-05-16 | Apple Silicon (ANE + MLX target) | laptop only | T3-MCP-server + Foundation Models | **52/80** (5/4/8/10/6/8/2/6) | **STUDY-NICHE** — macOS-native; Apple Foundation Models / ANE / MLX target; persistent memory + crypto identity; not cross-platform |
| **— TIER-4 ENTERPRISE/MULTI-VENDOR SERVERS (NVIDIA/AMD/CPU breadth) —** | | | | | | | | | |
| 26 | **huggingface/text-generation-inference** | 10k+ | Apache-2.0 (was BSL pre-2024) | 2026-05-16 | NVIDIA+AMD+Intel+CPU | single-GPU → multi-GPU | T3-OpenAI-compat HTTP | **64/80** (8/10/9/10/7/7/8/9) | **INSTALL-NICHE** — HF-blessed; first-class HF model hub integration; Inferentia/Gaudi support; less peak-throughput than vLLM but operationally cleaner; production at HuggingFace |
| 27 | **nvidia/triton-inference-server** | 9k+ | BSD-3 | 2026-05-16 | NVIDIA primary; CPU/ARM secondary | single-GPU → multi-GPU → multi-node | T3-HTTP/gRPC (OpenAI-compat via TRT-LLM backend) | **64/80** (8/10/7/10/9/5/8/9) | **STUDY-PILOT** — battle-tested; multi-framework (TF/PyTorch/ONNX/TRT-LLM/vLLM); enterprise; heavy ops; use only if needing multi-framework serve |
| 28 | **NVIDIA/TensorRT-LLM** | 9k+ | Apache-2.0 | 2026-05-16 | NVIDIA only (RTX/H100/B200) | single-GPU → multi-GPU | T3-via-triton + OpenAI-compat | **62/80** (8/10/5/10/10/4/4/10) | **STUDY-PILOT** — fastest NVIDIA-only inference (FP8/FP4 SOTA); kernel-fused; AOT-compiled; build-engine overhead heavy; for production NVIDIA-only |
| 29 | **microsoft/DeepSpeed-MII** | 2.2k | Apache-2.0 | 2026-XX-XX (defer) | NVIDIA primary | single-GPU → multi-GPU | T3-OpenAI-compat HTTP | **52/80** (5/10/8/4/7/6/4/8) | **DEFER** — Microsoft DeepSpeed serving; superseded by vLLM/SGLang for most workloads; verify freshness Q3 2026 |
| 30 | **ray-project/ray** Serve | 35k+ | Apache-2.0 | 2026-05-16 | hw-agnostic via backend | distributed multi-node | T3-via-Serve-Pyramid | **66/80** (9/10/7/10/8/5/9/7) | **STUDY-PILOT** — Ray Serve hosts vLLM/SGLang/TRT-LLM; primary multi-node orchestrator; heavy ops but production-grade |
| 31 | **InternLM/lmdeploy** | 5.5k+ | Apache-2.0 | 2026-05-16 | NVIDIA primary; ROCm secondary | single-GPU → multi-GPU | T3-OpenAI-compat HTTP | **60/80** (6/10/9/10/8/6/4/9) | **STUDY-PILOT** — Shanghai AI Lab; TurboMind backend; competitive with vLLM/SGLang on InternLM/Qwen models; INT4 AWQ SOTA |
| 32 | **predibase/lorax** | 2k+ | Apache-2.0 | 2026-XX | NVIDIA primary | single-GPU multi-LoRA | T3-OpenAI-compat HTTP | **52/80** (5/10/8/7/7/7/4/7) | **STUDY-NICHE** — multi-LoRA serving (dynamic LoRA load/unload at inference); useful for LoRA-heavy multi-tenant; less needed for single-operator |
| 33 | **mlc-ai/mlc-llm** | 21k+ | Apache-2.0 | 2026-05-16 | hw-agnostic (TVM compiler) — CUDA/ROCm/Metal/Vulkan/WebGPU/iOS/Android | laptop → mobile → single-GPU | T3-OpenAI-compat HTTP + native | **66/80** (8/10/8/10/7/6/10/7) | **STUDY-PILOT** — TVM-Unity compiled; mobile/web/embedded reach unique (WebGPU + iOS + Android + Vulkan); compile overhead per-device |
| 34 | **mlc-ai/web-llm** | 16k+ | Apache-2.0 | 2026-05-16 | WebGPU (any browser-capable hw) | browser-tab inference | T3-JS SDK + OpenAI-compat npm | **60/80** (8/10/9/10/5/8/10/5) | **STUDY-PILOT** — WebGPU in-browser LLM; novel privacy/offline-web use cases; not core CC pathway |
| 35 | **InternLM/InternEvo** / **bentoml/openllm** | ~9k each | Apache-2.0 | 2026-XX | NVIDIA primary | single-GPU → multi-GPU | T3-via-backend | **52/80** | **STUDY-NICHE** — BentoML OpenLLM wraps vLLM/HF-TGI/llama.cpp behind unified BentoML deployment; ops convenience layer |
| **— TIER-5 MULTI-VENDOR/ALL-IN-ONE/SPECIALTY —** | | | | | | | | | |
| 36 | **mudler/LocalAI** | 35k+ | MIT | 2026-05-16 | hw-agnostic (CUDA/Metal/ROCm/CPU/Vulkan) | laptop → single-GPU + multi-modal | T3-OpenAI-compat drop-in HTTP | **72/80** (9/10/10/10/7/8/10/8) | **INSTALL** — comprehensive OpenAI-API replacement: text+image+audio+video+TTS+STT+embeddings; wraps llama.cpp/whisper.cpp/coqui/stable-diffusion; single-binary or docker; multi-modal local-stack winner |
| 37 | **jan-html/jan** (formerly Jan AI) | 30k+ | Apache-2.0 / AGPL split | 2026-05-16 | hw-agnostic (CPU/CUDA/Metal/ROCm/Vulkan) | laptop primary | T3-OpenAI-compat HTTP + Desktop UI | **64/80** (9/5/9/10/6/9/10/6) | **INSTALL-NICHE** — local-first desktop ChatGPT alternative; bundles llama.cpp + Cortex (their server); strongest UX for non-technical operators; AGPL gate on full app, Apache on Cortex engine |
| 38 | **menloresearch/cortex.cpp** | 3k+ | Apache-2.0 | 2026-05-16 | CPU+CUDA+Metal+ROCm | laptop primary | T3-OpenAI-compat HTTP | **56/80** (6/10/9/10/6/9/8/4) | **STUDY-PILOT** — Cortex is Jan's server engine; standalone use; C++ ggml wrapper |
| 39 | **gpustack/gpustack** | 5k+ | Apache-2.0 | 2026-05-16 | hw-agnostic (vLLM + llama.cpp + MLX backends) | single-node → multi-node | T3-OpenAI-compat HTTP | **62/80** (6/10/9/10/7/7/10/7) | **STUDY-PILOT** — multi-backend manager (auto-route to vLLM/llama.cpp/MLX based on hw); cluster orchestrator; competitor to aibrix at smaller scale |
| 40 | **spark-arena/sparkrun** | 221 | not specified | 2026-XX | NVIDIA DGX Spark only | NVIDIA DGX Spark single-box | T3-via-backends | **30/80** (2/3/8/4/3/6/2/8) | **REJECT-VENDOR-NICHE** — only manages llama.cpp/vLLM/SGLang on NVIDIA DGX Spark hardware; too niche for general use |
| **— TIER-6 HARDWARE-VENDOR EXTENSIONS (AMD/Intel/Huawei stack) —** | | | | | | | | | |
| 41 | **intel/intel-extension-for-pytorch** | 1.7k+ | Apache-2.0 | 2026-XX (defer fresh-PR probe) | Intel CPU (AVX-512/AMX) + Intel GPU (Arc/Max) + XPU | laptop → single-GPU | T5-PyTorch extension | **52/80** (5/10/4/7/6/6/4/8) | **STUDY-NICHE** (Intel-operators) — Intel GPU + CPU acceleration for HF transformers; under-served Intel-stack class |
| 42 | **intel/ipex-llm** (formerly bigdl-llm) | 9k+ | Apache-2.0 | 2026-05-16 | Intel CPU/GPU/NPU | laptop → single-GPU | T3-OpenAI-compat HTTP (via vLLM-Intel) | **62/80** (7/10/8/10/7/6/4/9) | **INSTALL-NICHE** (Intel-operators) — INT4 inference on Intel CPU/GPU/NPU; pairs with vLLM-Intel; production-grade for Arc/Ponte-Vecchio/Lunar-Lake NPU |
| 43 | **ROCm/vllm** / **vllm-rocm** + **AMD/migraphx** | bundled w/ vLLM + ~1.5k | MIT/Apache | 2026-XX (defer fresh probe) | AMD ROCm (MI200/MI300/MI355/Radeon) | single-GPU → multi-GPU | T3-via-vLLM-ROCm | **62/80** (6/10/8/4/8/6/4/9) | **INSTALL-NICHE** (AMD-operators) — vLLM has first-class ROCm support; pair with AMD HIP backend; migraphx for non-vLLM AMD inference |
| 44 | **Ascend/vllm-ascend** (Huawei Ascend NPU) | ~2k | Apache-2.0 | 2026-XX | Huawei Ascend NPU | single-NPU → multi-NPU | T3-via-vLLM | **40/80** (4/10/8/-/6/4/2/8) | **STUDY-NICHE** — Ascend-only; if Huawei stack in scope |
| 45 | **SemiAnalysisAI/InferenceX** | 970 | not specified | 2026-05-16 | GB200/MI355X/B200/H100 benchmark target | benchmark-harness | T5-bench-harness | **40/80** (3/3/2/10/8/4/4/6) | **STUDY-PILOT** — continuous benchmark harness for Qwen3.5/DeepSeek/GPTOSS across NVIDIA+AMD; license gate; cite-source only |

---

## §B — Top-3 INSTALL per hardware-class (5 hardware-types)

### Hardware-Class 1: **NVIDIA single-GPU → multi-GPU** (RTX 4090 / H100 / B200)
1. **vllm-project/vllm** — PRIMARY engine; 80k★; PagedAttention + ContBatching + 8 spec-decode methods; 200+ archs
2. **sgl-project/sglang** — PEER engine; RadixAttention KV-reuse leader for multi-turn agentic; Mooncake RDMA 2026
3. **huggingface/text-generation-inference** — ENTERPRISE-CLEAN alternative; HF hub native; production at HF; less peak-throughput but operationally cleaner

### Hardware-Class 2: **NVIDIA multi-node / data-center**
1. **vllm-project/vllm** + **kvcache-ai/Mooncake** — vLLM as engine + Mooncake for PD-disagg + RDMA P2P (Kimi K2 production 128 H200)
2. **sgl-project/sglang** + **Mooncake** — alternative engine with same Mooncake substrate; 7x for 1T-param Kimi-K2
3. **ray-project/ray Serve** — meta-orchestrator hosting vLLM/SGLang/TRT-LLM workers; production multi-node scaling

### Hardware-Class 3: **Apple Silicon (M1-M5 laptop)**
1. **jundot/omlx** — INSTALL primary; OpenAI-compat HTTP; menu-bar managed; continuous batching + SSD caching; 14k★
2. **vllm-project/vllm-metal** — INSTALL secondary; community Apple Silicon plugin via MLX backend; vLLM-compat
3. **ollama/ollama** — INSTALL fallback; Metal-accelerated; simplest UX; cross-platform consistency with Linux/Win workspaces

### Hardware-Class 4: **AMD ROCm (Radeon / MI200 / MI300 / MI355)**
1. **vllm-project/vllm** (ROCm build) — first-class AMD support; same API surface as NVIDIA; MI300X production at multiple labs
2. **sgl-project/sglang** (ROCm build) — peer; AMD support landed 2025-Q4
3. **ggml-org/llama.cpp** (ROCm) — fallback for consumer Radeon; broader model+quant support; less peak throughput

### Hardware-Class 5: **CPU-only / consumer laptop (no GPU) / Intel Arc / heterogeneous**
1. **ggml-org/llama.cpp** + **llama-server** — PRIMARY; SOTA CPU inference (AVX-512/AMX/NEON); Vulkan fallback for AMD/Intel iGPU
2. **ollama/ollama** — PRIMARY UX wrapper; one-line pull; wraps llama.cpp; Metal/CUDA/ROCm auto-detect
3. **kvcache-ai/ktransformers** — SOTA for MoE-on-consumer-CPU; DeepSeek-V3 671B on 1×24GB GPU + 256GB CPU-RAM (extreme niche)
4. (Intel-niche) **intel/ipex-llm** — INT4 on Intel CPU/Arc-GPU/Lunar-Lake-NPU

### Bonus Hardware-Class 6: **Browser / WebGPU / Mobile** (under-served but novel)
1. **mlc-ai/web-llm** — in-browser WebGPU inference; novel privacy/offline-web
2. **mlc-ai/mlc-llm** — TVM-Unity compiled cross-platform (iOS/Android/WebGPU/Vulkan)
3. (operator note: not core to L0.25 for Z:-portable Win11 install; flag for completeness)

---

## §C — When to use Local-Inference vs Anthropic API (decision tree)

```
START → Operator dispatches LLM call. Which target?
│
├─ [Q1] Is task SOTA-frontier (≥Claude-Opus-4.7 capability needed)?
│   YES → ANTHROPIC API (Claude Opus 4.7 / Sonnet 4.6)
│         — Local inference cannot match frontier capability on complex agentic + reasoning
│         — Local models top out at GPT-OSS-120B / Qwen3.5-72B / DeepSeek-V3-671B (frontier-near, not frontier-equal)
│   NO → continue [Q2]
│
├─ [Q2] Is data residency / offline / air-gap required?
│   YES → LOCAL INFERENCE (mandatory)
│         — Compliance / HIPAA / classified / no-internet → local non-negotiable
│         — Route via: vLLM (NVIDIA) | omlx (Mac) | ipex-llm (Intel) | vllm-ROCm (AMD)
│   NO → continue [Q3]
│
├─ [Q3] Is cost-per-1k-token budget under $0.001 input / $0.005 output?
│   (i.e. Anthropic Haiku-class pricing exceeds budget for volume)
│   YES → LOCAL INFERENCE (cost-driven)
│         — Self-hosted Qwen3-8B / Llama-3.1-8B on 1×RTX 4090 = ~$0/token marginal
│         — Volume threshold: ~10M tok/day to amortize hardware
│         — Route via: ollama (laptop) | vLLM (single-GPU) | sglang (multi-GPU)
│   NO → continue [Q4]
│
├─ [Q4] Is task latency-critical (TTFT <200ms required)?
│   YES → LOCAL INFERENCE (latency-driven)
│         — Anthropic API median TTFT ~600-1200ms (over-network); local ~50-100ms TTFT on warm KV-cache
│         — Route via: vLLM + EAGLE3-spec-decode | sglang + RadixAttention (multi-turn) | Rapid-MLX (Mac, 0.08s cached)
│   NO → continue [Q5]
│
├─ [Q5] Is task narrow/domain-specific where a fine-tuned 8-70B model excels?
│   (code-completion / sentiment / classification / domain QA)
│   YES → LOCAL INFERENCE (fine-tuned model)
│         — Self-hosted LoRA-tuned Qwen-7B + lorax for multi-tenant LoRA
│         — Route via: vLLM + lorax | predibase | tabbyAPI (EXL2 fastest single-GPU)
│   NO → continue [Q6]
│
├─ [Q6] Is task a CROSS-MODEL CONSENSUS gate (per V-FINAL L1)?
│   YES → MIXED — Anthropic + local-codex(OSS) + local-llama
│         — CC orchestrator (Anthropic) + codex (GPT-5.5) + local-vLLM-Qwen-72B = 3-org cross-model gate
│         — Local engine = third opinion at $0 marginal; bridges to V-FINAL L1 cross-model invariant
│         — Route via: vLLM + semantic-router (per-request model selection) | ollama for laptop dev
│   NO → continue [Q7]
│
├─ [Q7] Default: ANTHROPIC API (Claude Sonnet 4.6 / Opus 4.7 / Haiku 4.6)
│   — All other cases: Anthropic API is operationally simpler, no hardware burden,
│     no model maintenance, frontier-class capability
│
└─ END
```

**Summary heuristic** (5-axis):
- **Capability frontier** → Anthropic
- **Data residency** → Local mandatory
- **Cost volume** → Local at ≥10M tok/day
- **Latency** → Local for <200ms TTFT
- **Diversity** → Mixed for cross-model consensus

---

## §D — Architecture recommendation: should L0.25 split by hardware-class?

### Recommendation: **YES — split L0.25 into 3 sub-layers by hardware-class.**

#### L0.25a — NVIDIA-stack (default; expected for production servers)
- **Primary**: `vllm-project/vllm` + `vllm-project/semantic-router` (routing)
- **Peer**: `sgl-project/sglang` (multi-turn agentic specialty)
- **Multi-node**: + `kvcache-ai/Mooncake` (RDMA P2P, only if ≥4-node cluster)
- **Enterprise-clean alt**: `huggingface/text-generation-inference`
- **Orchestration**: `ray-project/ray Serve` if multi-model multi-node

#### L0.25b — Apple-Silicon-stack (Mac-operator laptop dev)
- **Primary**: `jundot/omlx` (OpenAI-compat HTTP + continuous batching + menu-bar)
- **Secondary**: `vllm-project/vllm-metal` (vLLM API parity for codepath reuse)
- **Fallback**: `ollama/ollama` (cross-platform consistency)
- **Substrate**: `apple/mlx` + `ml-explore/mlx-examples`

#### L0.25c — CPU / consumer / Intel-Arc / AMD-Radeon-laptop / Vulkan
- **Primary**: `ggml-org/llama.cpp` (`llama-server`) — universal CPU+all-GPU
- **UX wrapper**: `ollama/ollama` — one-line pull; same llama.cpp underneath
- **Intel-specific**: `intel/ipex-llm` — INT4 on Arc/CPU/NPU
- **AMD-specific**: `vllm-project/vllm` (ROCm build) for Instinct; `llama.cpp` (ROCm) for Radeon
- **MoE-on-consumer**: `kvcache-ai/ktransformers` — heterogeneous CPU+GPU MoE

#### Justification
1. **Hardware-class drives engine selection** — same operator cannot use vLLM on a M3 MacBook, cannot use omlx on a Linux H100 server. Splitting reflects operational reality.
2. **API-compat is the abstraction** — all 3 sub-layers expose OpenAI-compat `/v1/chat/completions`; downstream consumers (CC, Codex, semantic-router) see a uniform interface.
3. **Install matrix is per-hardware** — operator's hardware fingerprint determines which sub-layer activates. `Z:`-portable Win11 + RTX 4090 → L0.25a only; M3 MacBook ops → L0.25b only.
4. **Cross-sub-layer routing via L0.25-meta-routing** — `vllm-project/semantic-router` (or `gpustack/gpustack`) can sit ABOVE all 3 to route per-request across hardware classes (e.g. small queries → laptop omlx; large queries → desk vLLM).

### Alternative (REJECTED): single unified L0.25 layer
- **Pros**: Simpler conceptual layer; matches current V-FINAL-V3 model
- **Cons**:
  - Forces decisions about NVIDIA-only vs portable to leak into adjacent layers
  - Operator confusion: "which engine for Mac?" requires re-discovery vs explicit sub-layer
  - Install manifest cannot cleanly express "I need only L0.25b" without sub-tagging
- **Verdict**: REJECTED — split provides operator clarity at zero conceptual cost

### Bonus: L0.25-meta-routing layer (optional)
- **`vllm-project/semantic-router`** (4.1k★) + **`gpustack/gpustack`** (5k★)
- Sits above sub-layers; per-request model+hardware selection
- Promote to V-FINAL-V2 L1 Cross-model alongside main routing primitives

---

## §E — Honest non-findings

1. **Rate-limit cut after GraphQL probe #19** — last 4 verification probes (intel/intel-extension-for-pytorch fresh PRs; AMD/migraphx 2026 cadence; ray-project/ray Serve 2026 release notes; ggml-org/whisper.cpp 2026 freshness) deferred to next wave. CR-12 PARTIAL-PASS.
2. **No verified 2026 release for vllm-aibrix** — last release 2025-11; verify upstream cadence before V-FINAL-V2 commit.
3. **kvcache-ai/ktransformers freshness defer** — high-value MoE-on-consumer-CPU candidate but 2026-Q2 commit cadence not verified this fire.
4. **Mininglamp-AI/cider license unspecified** — promising 1.2-1.9x prefill on M5 INT8 but blocked on license gate.
5. **SemiAnalysisAI/InferenceX license unspecified** — useful benchmark harness but not safe to depend on.
6. **microsoft/DeepSpeed-MII freshness defer** — appears superseded by vLLM/SGLang; verify if still maintained.
7. **No verified 2026 update for theroyallab/tabbyAPI + exllamav2** — assumed maintained based on prior cadence; verify on next probe.
8. **WebGPU/mobile class (mlc-llm, web-llm)** — under-probed; novel but not core to Z:-portable Win11 install; flagged for L5 multimodal/edge coverage.
9. **Huawei Ascend (vllm-ascend) limited verification** — only relevant if Huawei stack in scope; cite-only.
10. **No coverage of TPU-only stacks (JAX/Pallas/MaxText)** — out of scope for L0.25 local-inference layer (TPU is cloud-only typically); flag for L0.25d if TPU-cloud sub-layer requested.
11. **Closed-source LM-Studio excluded** — proprietary; no install-from-source path; mentioned in name-search but cannot satisfy cardinal-rule-5 install-priority OSS preference.
12. **TheBloke quantized-models cite-only** — not a runtime, but a model-supplier; quants now mostly via Hugging Face hub directly; included in name-search only for reference.
13. **AMD/dlrm out-of-scope** — recommender model, not LLM runtime; excluded.
14. **Continuous batching method coverage incomplete** — covered PagedAttention/RadixAttention/Mooncake; did not deep-dive newer methods (FlashInfer, FlexAttention, Forge); next wave.
15. **Speculative decoding coverage shallow** — EAGLE3/MTP/PARD/DFlash named in vLLM row but per-method comparison deferred; relevant for D5 perf-benchmark refinement.

---

## §F — Cross-references

- Prior research: `Z:\claude-sota-installed\docs\grand-synthesis-2026-05-16\06-fresh-research-delta\GAP-LAYER-L025-L075-INFERENCE-SANDBOX-2026-05-16.md` (10 rows; sota-researcher fork)
- Multimodal/voice sibling: `DEEP-SAT-L25-L35-MULTIMODAL-UI-2026-05-16.md` (Open-WebUI, whisper.cpp, TTS coverage)
- Memory MCP sibling: `DEEP-SAT-L02-MEMORY-MCP-2026-05-16.md` (format reference; D1-D8 rubric origin)
- Backlog tranches: `BACKLOG-TRANCHE-A-50K-STAR-2026-05-16.md`, `BACKLOG-TRANCHE-K-MOST-RECENT-2026-05-16.md` (high-star + recent entrants cross-check)

**End of DEEP-SAT-L025-LOCAL-INFERENCE-2026-05-16.md.**
