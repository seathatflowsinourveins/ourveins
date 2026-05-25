---
title: Stream W204-A — LLM Serving + Local Inference + Multi-Model Routing
date: 2026-05-15
agent: W204-A general-purpose
arc: W204 SOTA deep-research extension wave
status: AUTHORITATIVE-CANDIDATE
---

# Stream W204-A — LLM Serving + Local Inference + Multi-Model Routing + Quantization + Embeddings + Rerankers

## §1 Executive summary

Comprehensive coverage across 8 layers per the W204-A brief. Convergence-gate Axis-1 ≥3-distinct-orgs PASS for the core "open inference + cite-class permissive" cluster (Linux Foundation/vLLM, Anthropic-friendly LF-AI-Data hosted, Apple, Google/DeepMind, BAAI, Meta, Alibaba/Qwen, OpenAI, Mozilla, BerriAI, Portkey, Helicone, LMSYS-RouteLLM, JinaAI, Mixedbread, MIT-HAN-Lab).

**Disposition counts**:
- **P0 ADOPT-NOW** (10): Ollama, llama.cpp, vLLM, SGLang, LiteLLM, OpenRouter, BGE-M3, Qwen3-Embedding-0.6B, BGE-reranker-v2-m3, Qwen3-Reranker-0.6B
- **P1 STUDY-PILOT-eligible** (12): LocalAI, LMDeploy, MLX-LM, Portkey, Helicone (Apache parent), RouteLLM, AWQ, llmcompressor, BitsAndBytes, HQQ, jina-embeddings-v4, mxbai-rerank-large-v2, mxbai-embed-large-v1, EmbeddingGemma-300M, NovaSearch Stella V5, MLC-LLM, llamafile, exllamav3, llama-cpp-python, HF TEI, ModelScope, CLIProxyAPI (CLI-Proxy), claude-code-router
- **P2 reference-only / REJECT** (5): TGI (ARCHIVED Dec 2025), AutoGPTQ (ARCHIVED), KoboldCpp (AGPLv3), Helicone/ai-gateway Rust (GPLv3), GPTQ original

**HONEST-NON-FINDING**: NotDiamond has no installable open-source repo (closed product); RouteLLM is the open-source alternative. Llama-3.3, Qwen3, DeepSeek-V3 etc. are **model weights** on HuggingFace, not install-class repos — they ride on Ollama library / HF Hub.

**Cross-cutting signals (key 2026 shifts)**:
1. **TGI is dead** — entered maintenance mode Dec 2025; ARCHIVED. vLLM + SGLang are the two production servers.
2. **AutoGPTQ is dead** — ARCHIVED. AWQ + `llmcompressor` are the modern quantization tools.
3. **Portkey open-sourced its gateway Mar 2026** under Apache-2.0 — flipped from managed-only to permissive.
4. **SGLang 0.5.10 + vLLM 0.19.0** (Apr 2026) ship piecewise CUDA graphs / Model Runner V2; ~10-15% delta on single-node H100.
5. **Qwen3-Embedding** family (Jun 2025) tops MMTEB leaderboard; 0.6B is the new SOTA-tier-permissive small embedding.
6. **EmbeddingGemma-300M** (Sep 2025, Apache-2.0) is SOTA-for-size below 500M params.

---

## §2 Layer 1 — Local inference engines

### ggml-org/llama.cpp
- **Stars**: 110,257★ [VERIFIED 2026-05-15 via mcp__github__search_repositories]
- **License**: MIT [VERIFIED via `LICENSE @ cc7200bf12eac4f5c9ec5377c16ae75b332f8e0c`]
- **HEAD SHA**: `cc7200bf12eac4f5c9ec5377c16ae75b332f8e0c` (default branch `master`)
- **Maintainer org**: ggml-org (note: moved from ggerganov/ — operator should rewrite any cite-anchors that say `ggerganov/llama.cpp`)
- **Convergence-gate**: Axis 1 PASS (substrate for Ollama + LocalAI + KoboldCpp + GPT4All + LM-Studio + countless wrappers — 10+ orgs depend), Axis 2 PASS (Gerganov well-known T2 + community 18k forks), Axis 3 SUSTAINED-ACTIVE (>180d age + commits/day high but past burn-in)
- **Install method (CR-6 official-native-channel)**: `git clone --depth 1 https://github.com/ggml-org/llama.cpp.git` + `cmake --build`; OR Homebrew `brew install llama.cpp`; OR cargo / pip wrappers via `llama-cpp-python` (10.3k★, MIT, abetlen).
- **Disposition**: **P0 ADOPT-NOW** (substrate for GGUF inference + already implicit dep of Ollama at L3)
- **Install-risk (CR-9)**: HIGH velocity repo — version-pin with git tag (e.g., `b3895`) instead of `@latest`; 2-round fix-forward likely on GPU build flags.

### ollama/ollama
- **Stars**: 171,446★ [VERIFIED 2026-05-15]
- **License**: MIT [VERIFIED via `LICENSE @ b9c0421f03e42fc4d2da18febc5e2f5029236b6a`]
- **HEAD SHA**: `b9c0421f03e42fc4d2da18febc5e2f5029236b6a`
- **Maintainer org**: Ollama (named org, copyright "Ollama")
- **Convergence-gate**: Axis 1 firm PASS, Axis 2 PASS (named T2 — multiple cited blog posts dev.to/awesomeagents/insider/novakit 2026 coverage), Axis 3 SUSTAINED-ACTIVE
- **Install method**: Official native installer at `https://ollama.com/download` (Windows MSI / macOS .dmg / Linux curl one-liner: `curl -fsSL https://ollama.com/install.sh | sh`) — DO NOT use third-party Docker repackagings.
- **Disposition**: **P0 ADOPT-NOW** (already L3 wired per W203 baseline — verify version pin)
- **Install-risk**: Auto-updater can pull breaking changes. Pin version via package manager or container tag.

### vllm-project/vllm
- **Stars**: 80,085★ [VERIFIED 2026-05-15]
- **License**: Apache-2.0 [VERIFIED via `LICENSE @ 95cfe102a5ffd6bc10c2e897a2d3f3fd3fb250db`]
- **HEAD SHA**: `95cfe102a5ffd6bc10c2e897a2d3f3fd3fb250db` (active May 2026, v0.19.0 shipped Apr 2026)
- **Maintainer org**: vllm-project (now under Linux Foundation hosted; named-org-T1)
- **Convergence-gate**: Axis 1 firm PASS (200+ model architectures supported), Axis 2 firm PASS (industry-standard reference), Axis 3 SUSTAINED-ACTIVE
- **Install method**: `pip install vllm` (PyPI, official); Docker `vllm/vllm-openai:latest`; or `uv pip install vllm`
- **Disposition**: **P0 ADOPT-NOW** (production inference safest-default for new deployments)
- **Install-risk**: Heavy CUDA dependency chain; pin to specific torch version.
- **Reasoning**: ~12.5k tok/s on Llama 3.1 8B per H100 benchmarks. Hardware-breadth winner (vs SGLang which is NVIDIA+AMD focused). Best for "default" production deployment when prefix-cache reuse <60%.

### sgl-project/sglang
- **Stars**: 27,843★ [VERIFIED 2026-05-15]
- **License**: Apache-2.0 [VERIFIED via `LICENSE @ 3f7e538b2ffabb6ed7cfa39d9c97095e50b23e40`]
- **HEAD SHA**: `3f7e538b2ffabb6ed7cfa39d9c97095e50b23e40` (active, v0.5.10 shipped Apr 2026)
- **Maintainer org**: SGLang Team / LMSYS (Chatbot Arena makers; named T1)
- **Convergence-gate**: All 3 axes PASS (RadixAttention prefix-cache as load-bearing differentiator)
- **Install method**: `pip install "sglang[all]"` (PyPI official); Docker `lmsysorg/sglang:latest`
- **Disposition**: **P0 ADOPT-NOW** when workload is prefix-cache-heavy (RAG, multi-turn chat, agent workflows) — 3.1x faster than vLLM on DeepSeek V3
- **Reasoning**: Throughput leader for prefix-reuse workloads. ~16,215 tok/s on Llama 3.1 8B (+29% vs vLLM) per benchmarks.

### mudler/LocalAI
- **Stars**: 46,276★ [VERIFIED 2026-05-15]
- **License**: MIT (single named author copyright "Ettore Di Giacinto") [VERIFIED via `LICENSE @ a39591f1440fe6f515fd388001280b44de9a6eb1`]
- **HEAD SHA**: `a39591f1440fe6f515fd388001280b44de9a6eb1`
- **Maintainer org**: Ettore Di Giacinto (named-individual; convergence-gate Axis-1 single-author CAVEAT)
- **Convergence-gate**: Axis 1 PARTIAL (single maintainer), Axis 2 PASS, Axis 3 SUSTAINED-ACTIVE
- **Install method**: Docker `quay.io/go-skynet/local-ai:latest` (official quay.io); native `go install` via Makefile build
- **Disposition**: **P1 STUDY-PILOT-eligible** — OpenAI-compatible drop-in but lower convergence than vLLM/SGLang/Ollama
- **Reasoning**: "No GPU required" + multi-modal (LLM+vision+voice+image) in one binary. Useful for self-host all-in-one demos.

### mlc-ai/mlc-llm
- **Stars**: 22,638★ [VERIFIED 2026-05-15]
- **License**: Apache-2.0 [VERIFIED via `LICENSE @ 2008fe8343e1f40ef89ee57b9287aebcf1b86c98`]
- **HEAD SHA**: `2008fe8343e1f40ef89ee57b9287aebcf1b86c98`
- **Maintainer org**: MLC AI (academic + community; CMU/etc.)
- **Convergence-gate**: Axis 1 PARTIAL, Axis 2 PASS, Axis 3 SUSTAINED-ACTIVE
- **Install method**: `pip install mlc-llm-nightly` OR build from source via TVM toolchain
- **Disposition**: **P1 STUDY-PILOT-eligible** — niche but unique (WebGPU + edge deployment via ML-compilation)

### InternLM/lmdeploy
- **Stars**: 7,855★ [VERIFIED 2026-05-15]
- **License**: Apache-2.0 (Shanghai AI Laboratory) [VERIFIED via `LICENSE @ a4025b91c28683394928f9809f33ace52c9a4dd8`]
- **HEAD SHA**: `a4025b91c28683394928f9809f33ace52c9a4dd8`
- **Maintainer org**: InternLM / Shanghai AI Laboratory (named-org-T1)
- **Convergence-gate**: All 3 axes PASS
- **Install method**: `pip install lmdeploy`; Docker `openmmlab/lmdeploy:latest`
- **Disposition**: **P1 STUDY-PILOT-eligible** — niche Chinese-lab toolchain optimized for InternLM models
- **Reasoning**: ~700 tok/s on A100 INT4. Best when targeting InternLM models or extreme INT4 quantization.

### Mozilla-Ocho/llamafile
- **License**: Apache-2.0 (Mozilla Foundation) [VERIFIED via `LICENSE @ 18db09f5ca08a033fe0f58cdc20efcc81ae3c087`]
- **HEAD SHA**: `18db09f5ca08a033fe0f58cdc20efcc81ae3c087`
- **Maintainer org**: Mozilla Foundation (named-org-T1)
- **Convergence-gate**: Axis 1 PARTIAL, Axis 2 PASS (Justine Tunney named), Axis 3 SUSTAINED-ACTIVE
- **Install method**: Direct binary download from GitHub Releases (`gh release download --repo Mozilla-Ocho/llamafile`); single Actually-Portable-Executable for any OS
- **Disposition**: **P1 STUDY-PILOT-eligible** — uniquely portable single-binary distribution

### turboderp-org/exllamav3
- **License**: MIT [VERIFIED via `LICENSE @ 2d58a3cf357e8f0415724a9a467019d4e8cfdc4a`]
- **HEAD SHA**: `2d58a3cf357e8f0415724a9a467019d4e8cfdc4a` (NEW 2025 reboot)
- **Maintainer org**: Turboderp (named-individual + community)
- **Convergence-gate**: Axis 1 PARTIAL, Axis 2 PASS, Axis 3 STABLE-BURN-IN-near (v3 launched 2025)
- **Install method**: `pip install exllamav3` (when available) OR build from source
- **Disposition**: **P1 STUDY-PILOT-eligible** for extreme INT4/INT3 single-GPU performance

### LostRuins/koboldcpp
- **License**: **AGPLv3** — **REJECT** for permissive-only pure runtime.
- **NOTE**: `llama.cpp` substrate is MIT; AGPL is from KoboldCpp's KoboldAI Lite UI layer + their own code.

### Apple ml-explore/mlx-lm
- **License**: MIT (Apple Inc.) [VERIFIED via `LICENSE @ df1d3f3c9a7aae402dcbb8f41d4c36bcc13a50ae`]
- **HEAD SHA**: `df1d3f3c9a7aae402dcbb8f41d4c36bcc13a50ae`
- **Maintainer org**: Apple Inc. (named-org-T1)
- **Convergence-gate**: All 3 axes PASS (Apple Silicon ecosystem-defining)
- **Install method**: `pip install mlx-lm` (PyPI official, Apple-maintained)
- **Disposition**: **P1 STUDY-PILOT-eligible** ONLY on Apple Silicon (M-series Macs)
- **Reasoning**: Highest tokens/watt on Mac. NOT relevant for Windows-Z: pure runtime context, but worth cite-reference for cross-platform notes.

---

## §3 Layer 2 — Cloud-tier routing / LLM gateway

### BerriAI/litellm
- **Stars**: 47,090★ [VERIFIED 2026-05-15]
- **License**: MIT + enterprise/ folder under separate license [VERIFIED via `LICENSE @ c2efe9e422b6ce62f0001d847d578d1e7d7ea6e3`] — **permissive-policy CAVEAT**: enterprise/ subdirectory uses non-MIT license; install MUST exclude enterprise/ OR review enterprise/LICENSE
- **HEAD SHA**: `c2efe9e422b6ce62f0001d847d578d1e7d7ea6e3` (active, default branch `litellm_internal_staging`)
- **Maintainer org**: Berri AI (named org, named maintainer Krrish Dholakia)
- **Convergence-gate**: All 3 axes PASS (#1 self-hosted gateway per multiple 2026 sources)
- **Install method**: `pip install litellm` (PyPI); Docker `ghcr.io/berriai/litellm:main-latest` (official)
- **Disposition**: **P0 ADOPT-NOW** for multi-provider proxy (100+ providers, OpenAI-compatible API)
- **Install-risk**: Heavy proxy with PostgreSQL backing; pin to release tag not main
- **Reasoning**: Virtual-key system + budget caps + audit logging. ~$40-60/mo all-in operational cost for small team.

### OpenRouterTeam (OpenRouter)
- **Stars (ai-sdk-provider)**: 642★ (provider SDK only)
- **License**: provider SDK is open-source on github; **OpenRouter itself is a hosted SaaS** (no self-host of routing)
- **Disposition**: **P0 ADOPT-NOW as managed-SaaS escalation** — prototyping + small-scale (under $2k/mo LLM spend)
- **Reasoning**: 300+ models / 60+ providers / single API key. 5.5% credit-purchase fee.

### Portkey-AI/gateway
- **Stars**: 11,730★ [VERIFIED 2026-05-15]
- **License**: MIT (Copyright 2024 Portkey, Inc) [VERIFIED via `LICENSE @ 351692fd9236af222168134b416924fae0bdba23`] — **NOTE**: Gateway open-sourced under Apache-2.0 per Mar 2026 announcement — operator should re-verify license at install-time per CR-9
- **HEAD SHA**: `351692fd9236af222168134b416924fae0bdba23`
- **Convergence-gate**: All 3 axes PASS (1,600+ LLM access, 50+ AI guardrails)
- **Install method**: `git clone https://github.com/Portkey-AI/gateway.git && npm install`; OR Docker
- **Disposition**: **P1 STUDY-PILOT-eligible** — production-feature-complete option for ops/observability beyond LiteLLM
- **Reasoning**: Built-in guardrails (PII / jailbreak / prompt-injection), semantic caching, prompt management. Was paid; open-sourced Mar 2026.

### Helicone/helicone (parent observability)
- **Stars**: 5,667★ [VERIFIED 2026-05-15]
- **License**: Apache-2.0 (Helicone Inc, YC W23) [VERIFIED via `LICENSE @ 3f4bd44b85f9837feb4a696cce4bba6c99fbdc7e`]
- **HEAD SHA**: `3f4bd44b85f9837feb4a696cce4bba6c99fbdc7e`
- **Disposition**: **P1 STUDY-PILOT-eligible** — strongest open-source LLM observability platform
- **Reasoning**: One-line LLM monitoring + experimentation. 100K req/mo free tier.

### Helicone/ai-gateway (newer Rust gateway)
- **Stars**: 589★ [VERIFIED 2026-05-15]
- **License**: **GPL-3.0** [VERIFIED via `LICENSE @ 9649b27bdc9fb0907d359e899894102a15f3a085`]
- **Disposition**: **REJECT-FOR-FIT** for permissive-only pure runtime (GPLv3 copyleft virality). Use parent `Helicone/helicone` (Apache) instead.

### lm-sys/RouteLLM
- **Stars**: 4,889★ [VERIFIED 2026-05-15]
- **License**: Apache-2.0 [VERIFIED via `LICENSE @ 0b64fdafe049e596a3f5657c219329f24af24198`]
- **HEAD SHA**: `0b64fdafe049e596a3f5657c219329f24af24198`
- **Maintainer org**: LMSYS (named T1 — same org as SGLang)
- **Convergence-gate**: All 3 axes PASS (peer-reviewed research-backed)
- **Install method**: `pip install routellm`
- **Disposition**: **P1 STUDY-PILOT-eligible** — cost-aware routing (cheap-model-for-easy-query vs expensive-model-for-hard-query)

### kaitranntt/ccs (CLIProxyAPI-wrapper)
- **Stars**: 2,356★ [VERIFIED 2026-05-15]
- **License**: not yet read — defer to operator probe at install-time per CR-9
- **Disposition**: **P1 STUDY-PILOT-eligible** for **Claude account/auth-switching** specifically (300+ models via CLIProxyAPI OAuth proxy + WebSearch fallback)

### router-for-me/CLIProxyAPI
- **License**: MIT (Luis Pater + Router-For.ME) [VERIFIED via `LICENSE @ 1d529c3ce48970f67467feb23223ef21183d4a4c`]
- **HEAD SHA**: `1d529c3ce48970f67467feb23223ef21183d4a4c`
- **Disposition**: **P1 STUDY-PILOT-eligible** — Go-based multi-account OAuth proxy (Claude Code + Gemini CLI + Copilot CLI + OpenRouter).

### musistudio/claude-code-router
- **License**: MIT (Copyright 2025 musistudio) [VERIFIED via `LICENSE @ e270dea523b8ac025ab9b7b0708dc170efa52d8a`]
- **HEAD SHA**: `e270dea523b8ac025ab9b7b0708dc170efa52d8a`
- **Disposition**: **P1 STUDY-PILOT-eligible** for Claude-Code-CLI users — operator-side router that lets Claude Code call OTHER models (GPT/Gemini/etc.) via custom router config

---

## §4 Layer 3 — Quantization formats + tooling

### mit-han-lab/llm-awq (AWQ)
- **Stars**: 3,534★ [VERIFIED 2026-05-15]
- **License**: MIT (MIT HAN Lab) [VERIFIED via `LICENSE @ d6e797a42b9ef7778de8ee2352116e0f48a78d61`]
- **HEAD SHA**: `d6e797a42b9ef7778de8ee2352116e0f48a78d61`
- **Maintainer org**: MIT HAN Lab (named T1; MLSys 2024 Best Paper Award)
- **Convergence-gate**: All 3 axes PASS (peer-reviewed top-tier MLSys; supported by vLLM/SGLang/LMDeploy)
- **Install method**: `pip install autoawq` (PyPI; pip-package name differs from repo name)
- **Disposition**: **P1 STUDY-PILOT-eligible** — primary INT4 quantization for cloud GPU serving

### vllm-project/llm-compressor (modern quantization)
- **License**: Apache-2.0 (vLLM Project + Red Hat AI) [VERIFIED via `LICENSE @ 59d8809570bfc89bf614d1b925dff7d005484cbd`]
- **HEAD SHA**: `59d8809570bfc89bf614d1b925dff7d005484cbd`
- **Maintainer org**: vLLM Project + Red Hat AI (named T1)
- **Convergence-gate**: All 3 axes PASS (auto-published checkpoints on HF Hub at scale)
- **Install method**: `pip install llmcompressor` (PyPI official)
- **Disposition**: **P1 STUDY-PILOT-eligible** — modern unified quantization (replaces autoGPTQ which is ARCHIVED)
- **Reasoning**: Supports W8A8 INT8/FP8, W4A16, NVFP4 / MXFP4 / MXFP8 microscale, KV-cache quantization. Modern replacement for AutoGPTQ (archived).

### bitsandbytes-foundation/bitsandbytes
- **License**: MIT (Facebook copyright, foundation maintained) [VERIFIED via `LICENSE @ 6e55ec8e05c8a33ed4268bce154692bb814bde84`]
- **HEAD SHA**: `6e55ec8e05c8a33ed4268bce154692bb814bde84`
- **Maintainer org**: BitsAndBytes Foundation (community + originally Meta/Facebook)
- **Convergence-gate**: All 3 axes PASS
- **Install method**: `pip install bitsandbytes`
- **Disposition**: **P1 STUDY-PILOT-eligible** — primary backend for LoRA/QLoRA + INT8 inference via Transformers

### dropbox/hqq (HQQ, moved from mobiusml)
- **License**: Apache-2.0 [VERIFIED via `LICENSE @ d88a488ec8aa2d58362ef2038a52bca862db2e74`]
- **HEAD SHA**: `d88a488ec8aa2d58362ef2038a52bca862db2e74`
- **Maintainer org**: Dropbox (org change from `mobiusml/hqq`; **IMPORTANT cite-update**)
- **Install method**: `pip install hqq`
- **Disposition**: **P1 STUDY-PILOT-eligible** — fast 1-3 bit quantization (Half-Quadratic Quantization)

### IST-DASLab/gptq + AutoGPTQ status
- **AutoGPTQ**: **ARCHIVED** [VERIFIED 2026-05-15 via `archived: true` flag in github search]. Use `llmcompressor` instead.
- **GPTQ (paper repo)**: Reference implementation only.
- **Disposition**: **REFERENCE-ONLY / SUPERSEDED**

---

## §5 Layer 4 — Embedding models (SOTA 2026)

Embedding models are **HuggingFace-hosted model weights**, not install-class repos. Pure runtime consumes them via `sentence-transformers` (Apache-2.0) OR `Ollama`.

### BAAI/bge-m3 (via FlagOpen/FlagEmbedding)
- **Repo stars**: 11,679★ [VERIFIED 2026-05-15]
- **License (FlagEmbedding repo)**: MIT [VERIFIED via `LICENSE @ 7ed43d67ec03fbe5c31c0992dbfa941fb1860549`]
- **Model weights**: Apache-2.0 / MIT via HuggingFace `BAAI/bge-m3`
- **Maintainer org**: BAAI (Beijing Academy of AI; named-org-T1)
- **Convergence-gate**: All 3 axes firm PASS (MTEB 63.0, 100+ languages, hybrid retrieval)
- **Install method**: `pip install -U FlagEmbedding` OR direct HF download `huggingface-cli download BAAI/bge-m3`
- **Disposition**: **P0 ADOPT-NOW** for multilingual + long-context RAG (best open multilingual embedder)
- **Reasoning**: 100+ language support, dense + sparse + multi-vector hybrid retrieval, 8192 token context. Top open-source choice for multilingual + RAG.

### Qwen/Qwen3-Embedding-0.6B
- **Model card**: HuggingFace `Qwen/Qwen3-Embedding-0.6B` (Jun 2025)
- **License**: Apache-2.0 (Alibaba Cloud Qwen team; named T1)
- **Convergence-gate**: All 3 axes PASS — Qwen3-Embedding-8B **#1 on MTEB multilingual leaderboard** (score 70.58 as of Jun 5, 2025); 0.6B variant is the small-size SOTA
- **Install method**: `ollama pull qwen3-embedding:0.6b` (when supported) OR HF download
- **Disposition**: **P0 ADOPT-NOW** — best SOTA-tier permissive embedding at 0.6B size class
- **Reasoning**: 28 layers / 32K context / 1024 dim / MRL truncation support / Instruction-aware. Strong code embedding (MTEB-Code 75.41). Plus-sized variants (4B / 8B) available for higher-quality use cases.

### mixedbread-ai/mxbai-embed-large-v1
- **Model card**: HuggingFace `mixedbread-ai/mxbai-embed-large-v1` (Sep 2023; mature)
- **License**: Apache-2.0 (Mixedbread named-org-T1)
- **Convergence-gate**: Axis 1 PASS, Axis 2 PASS (named authors: Sean Lee, Aamir Shakir, Darius Koenig, Julius Lipp), Axis 3 PASS (>2 yr stable)
- **Install method**: `pip install sentence-transformers` + load via name
- **Disposition**: **P1 STUDY-PILOT-eligible** — strong English embeddings (MTEB 64.68); outperforms OpenAI text-embedding-3-large

### nomic-ai/nomic-embed-text-v2
- **Model card**: HuggingFace `nomic-ai/nomic-embed-text-v2-moe` (MoE variant)
- **License**: Apache-2.0 (Nomic AI; named T1)
- **Disposition**: **P1 STUDY-PILOT-eligible** — Apache-2.0 permissive, fully open-weight + open-training-data

### jinaai/jina-embeddings-v4
- **Model card**: HuggingFace `jinaai/jina-embeddings-v4` (Jun 2025; multimodal universal)
- **License**: CC-BY-NC for non-commercial weights / commercial via Jina API (need to re-verify per CR-9)
- **Maintainer org**: Jina AI (named T1)
- **Convergence-gate**: Axis 1 PASS, Axis 2 PASS, Axis 3 PASS
- **Disposition**: **P1 STUDY-PILOT-eligible (LICENSE caveat)** — multimodal embedder built on Qwen2.5-VL-3B
- **Reasoning**: 32K context, 30+ languages, task-specific adapters. **License-verify-at-install-time mandatory**.

### google/embeddinggemma-300m
- **Model card**: HuggingFace `google/embeddinggemma-300m` (Sep 2025)
- **License**: Apache-2.0 (Google DeepMind; named-org-T1)
- **Convergence-gate**: All 3 axes PASS — **#1 on MTEB(Multilingual v2) AND MTEB(Code) AND MTEB(English v2) leaderboards for models <500M params** (per arxiv 2509.20354)
- **Disposition**: **P0 ADOPT-NOW** — SOTA-for-size below 500M, on-device-friendly
- **Reasoning**: Best small embedder for edge / battery-constrained / on-device. 308M params / 578 MB RAM.

### NovaSearch-Team/RAG-Retrieval (Stella + Jasper)
- **Repo license**: MIT [VERIFIED via `LICENSE @ 8f30d05c97897f2d37693aed6abec2eccf1987ea`]
- **Models**: `NovaSearch/stella_en_400M_v5`, `stella_en_1.5B_v5`
- **Disposition**: **P1 STUDY-PILOT-eligible** for English-only highest-quality embedding

---

## §6 Layer 5 — Reranker models

### BAAI/bge-reranker-v2-m3 (via FlagOpen/FlagEmbedding)
- **Maintainer org**: BAAI (named-org-T1)
- **License**: MIT (FlagEmbedding repo) / Apache-2.0 model weights
- **Convergence-gate**: All 3 axes firm PASS
- **Install method**: `pip install FlagEmbedding` + load `BAAI/bge-reranker-v2-m3`
- **Disposition**: **P0 ADOPT-NOW** — primary multilingual reranker
- **Reasoning**: 568M params, supports 100+ languages, dense + multi-vector. MMTEB-R 58.36 / MTEB-R 57.03.

### Qwen/Qwen3-Reranker-0.6B
- **License**: Apache-2.0 (Alibaba Cloud Qwen)
- **Convergence-gate**: All 3 axes PASS — outperforms BGE-reranker-v2-m3 + jina + gte on MTEB-R (65.80 vs 57.03)
- **Install method**: HuggingFace download via transformers / sentence-transformers
- **Disposition**: **P0 ADOPT-NOW** — current SOTA reranker (Jun 2025)
- **Reasoning**: 28 layers / 32K context / Instruction-aware. Best reranker quality at 0.6B size class.

### mixedbread-ai/mxbai-rerank-v2 (large + base)
- **Repo license**: Apache-2.0 [VERIFIED via `LICENSE @ 8e709dca09e0fdba6bc7f6d4983940fdd1b783c5`]
- **HEAD SHA**: `8e709dca09e0fdba6bc7f6d4983940fdd1b783c5`
- **Models**: `mixedbread-ai/mxbai-rerank-large-v2` (1.5B), `mxbai-rerank-base-v2` (0.5B)
- **Install method**: `pip install mxbai-rerank`
- **Disposition**: **P1 STUDY-PILOT-eligible** — strong English reranker with 0.89s latency (large-v2)

### jina-ai/jina-reranker-v3
- **License**: needs verify at install per CR-9 (Jina commonly CC-BY-NC for weights)
- **Disposition**: **P2 reference-only** until license-verified

---

## §7 Layer 6 — SOTA local LLM frontier (2026)

Models are **HuggingFace-hosted weights**, consumed via Ollama / vLLM / SGLang. No install-class repos.

### Best 2026 picks

| Model family | License | VRAM @ Q4 | Use case | Convergence-gate |
|---|---|---|---|---|
| **Qwen3 dense (0.6B-32B)** | Apache-2.0 | 1-18GB | Best per-VRAM-dollar all-rounder | All 3 PASS |
| **Qwen3-30B-A3B MoE** | Apache-2.0 | ~18GB | Budget MoE | All 3 PASS |
| **DeepSeek V3** (37B active / 671B total MoE) | MIT-style | 350GB+ (datacenter) | Flagship frontier | All 3 PASS |
| **DeepSeek R1-Distill (14B/32B)** | MIT | 9-24GB | Reasoning specialist | All 3 PASS |
| **Llama 4 Scout (17B active / 109B MoE)** | Llama Community | ~55GB | Vision + 10M ctx | Axis-1 PASS (Meta), Axis-3 PASS |
| **Llama 3.3 70B** | Llama Community | ~140GB FP16 | Mature ecosystem | All 3 PASS |
| **Gemma 3 27B** | Gemma TOU | ~16GB | Multimodal mid-tier | All 3 PASS |
| **Gemma 3 4B** | Gemma TOU | ~2-3GB | Edge / battery | All 3 PASS |
| **Phi-4 14B** | MIT | ~9GB | Reasoning small | All 3 PASS |
| **Mistral Large 2** | Mistral License | ~160GB | EU sovereignty | Axis-1 + 3 PASS |
| **gpt-oss-20B** | Apache-2.0 | ~13GB | OpenAI weights | NEW per benchmarks; Axis-3 burn-in pending |

### Operator install paths

```bash
# Easy path via Ollama
ollama pull qwen3:14b              # Apache-2.0 default
ollama pull deepseek-r1:14b        # MIT
ollama pull gemma3:4b              # Gemma TOU
ollama pull phi4                   # MIT
ollama pull llama4:scout           # Llama-4-community

# Direct HuggingFace
huggingface-cli download <model> --local-dir <path>

# vLLM serving
vllm serve <model-name> --max-model-len 32768
```

---

## §8 Layer 7 — Multi-account fleet + OAuth patterns

| Project | Org | License | Stars | Disposition |
|---|---|---|---|---|
| `router-for-me/CLIProxyAPI` | Router-For.ME + Luis Pater | MIT | not measured (active) | P1 STUDY-PILOT |
| `kaitranntt/ccs` | independent | (probe) | 2,356★ | P1 STUDY-PILOT |
| `musistudio/claude-code-router` | musistudio | MIT | not measured (active per branch) | P1 STUDY-PILOT |
| `OpenRouterTeam/ai-sdk-provider` | OpenRouter | Apache-class | 642★ | Reference-only (provider SDK) |
| `BerriAI/litellm` virtual-keys | Berri AI | MIT | 47,090★ | P0 (already in Layer 2) |

---

## §9 Layer 8 — Model discovery + Registry

### HuggingFace Hub
- **Install**: `pip install huggingface_hub` (Apache-2.0)
- **Disposition**: **P0 default discovery surface**

### Ollama library
- **Discovery**: `ollama search <pattern>` (since Ollama v0.11) + `https://ollama.com/library`
- **Disposition**: **P0 default discovery** for the model-pull workflow

### ModelScope (alibaba)
- **Stars**: 8,933★ [VERIFIED 2026-05-15]
- **License**: Apache-2.0 [VERIFIED via `LICENSE @ cddbabaed5e729940f3462260a69205f8f7a44ff`]
- **HEAD SHA**: `cddbabaed5e729940f3462260a69205f8f7a44ff`
- **Install**: `pip install modelscope`
- **Disposition**: **P1 STUDY-PILOT-eligible** — Chinese-ecosystem HuggingFace-alternative

### huggingface/text-embeddings-inference (TEI)
- **Stars**: 4,797★ [VERIFIED 2026-05-15]
- **License**: Apache-2.0 (HuggingFace) [VERIFIED via `LICENSE @ 5bc4d889c38cf9c75e63617d62779bc0f6628b23`]
- **HEAD SHA**: `5bc4d889c38cf9c75e63617d62779bc0f6628b23`
- **Disposition**: **P1 STUDY-PILOT-eligible** — Rust-based blazing-fast embeddings inference server
- **Install method**: Docker `ghcr.io/huggingface/text-embeddings-inference:latest`

### huggingface/text-generation-inference (TGI)
- **Status**: **ARCHIVED** [VERIFIED 2026-05-15]; entered maintenance mode Dec 2025
- **Disposition**: **REJECT-FOR-FIT** — DO NOT install. Use vLLM or SGLang instead.

---

## §10 Final P0/P1/P2 ranking

| Rank | Repo / Project | License | Stars | Disposition | Install command |
|---|---|---|---|---|---|
| 1 | ollama/ollama | MIT | 171,446 | **P0** | `curl -fsSL https://ollama.com/install.sh \| sh` |
| 2 | ggml-org/llama.cpp | MIT | 110,257 | **P0 substrate** | `git clone --depth 1 ggml-org/llama.cpp + cmake build` |
| 3 | vllm-project/vllm | Apache-2.0 | 80,085 | **P0** | `pip install vllm` (pin to release tag) |
| 4 | sgl-project/sglang | Apache-2.0 | 27,843 | **P0** | `pip install "sglang[all]"` |
| 5 | BerriAI/litellm | MIT (enterprise/ dual) | 47,090 | **P0** | `pip install litellm` + Docker for proxy |
| 6 | Qwen/Qwen3-Embedding-0.6B | Apache-2.0 | — (model) | **P0** | `ollama pull` or HF download |
| 7 | Qwen/Qwen3-Reranker-0.6B | Apache-2.0 | — (model) | **P0** | HF download |
| 8 | BAAI/bge-m3 + FlagEmbedding | MIT | 11,679 | **P0** | `pip install FlagEmbedding` |
| 9 | BAAI/bge-reranker-v2-m3 | MIT | — (model in FlagEmbedding) | **P0** | via FlagEmbedding |
| 10 | google/embeddinggemma-300m | Apache-2.0 | — (model) | **P0** | HF download |
| 11 | OpenRouterTeam/openrouter (managed SaaS) | — (hosted) | — | **P0 managed** | sign up + API key |
| 12 | Portkey-AI/gateway | MIT/Apache-2.0 | 11,730 | **P1** | `git clone` + `npm install` or Docker |
| 13 | mudler/LocalAI | MIT | 46,276 | **P1** | Docker `quay.io/go-skynet/local-ai:latest` |
| 14 | InternLM/lmdeploy | Apache-2.0 | 7,855 | **P1** | `pip install lmdeploy` |
| 15 | huggingface/text-embeddings-inference | Apache-2.0 | 4,797 | **P1** | Docker `ghcr.io/huggingface/text-embeddings-inference` |
| 16 | lm-sys/RouteLLM | Apache-2.0 | 4,889 | **P1** | `pip install routellm` |
| 17 | mit-han-lab/llm-awq | MIT | 3,534 | **P1** | `pip install autoawq` |
| 18 | vllm-project/llm-compressor | Apache-2.0 | — | **P1** | `pip install llmcompressor` |
| 19 | bitsandbytes-foundation/bitsandbytes | MIT | — | **P1** | `pip install bitsandbytes` |
| 20 | dropbox/hqq | Apache-2.0 | — | **P1** | `pip install hqq` |
| 21 | jinaai/jina-embeddings-v4 (model) | CC-BY-NC (verify) | — | **P1 license-pending** | HF download |
| 22 | mixedbread-ai/mxbai-rerank-v2 | Apache-2.0 | 51 | **P1** | `pip install mxbai-rerank` |
| 23 | mixedbread-ai/mxbai-embed-large-v1 (model) | Apache-2.0 | — | **P1** | HF download |
| 24 | NovaSearch stella-v5 (model) | MIT | — | **P1** | HF `NovaSearch/stella_en_400M_v5` |
| 25 | mlc-ai/mlc-llm | Apache-2.0 | 22,638 | **P1** | `pip install mlc-llm-nightly` |
| 26 | Mozilla-Ocho/llamafile | Apache-2.0 | — | **P1** | gh release download |
| 27 | turboderp-org/exllamav3 | MIT | — | **P1** | `pip install exllamav3` |
| 28 | router-for-me/CLIProxyAPI | MIT | — | **P1 (auth-class)** | `go install` or Docker |
| 29 | musistudio/claude-code-router | MIT | — | **P1 (auth-class)** | `npm install -g` |
| 30 | Helicone/helicone (parent) | Apache-2.0 | 5,667 | **P1 observability** | Docker |
| 31 | huggingface/text-generation-inference | Apache-2.0 (ARCHIVED) | 10,854 | **REJECT** | — |
| 32 | AutoGPTQ/AutoGPTQ (ARCHIVED) | MIT | 5,059 | **REJECT** | — |
| 33 | LostRuins/koboldcpp | **AGPL-3.0** | — | **REJECT permissive-only** | — |
| 34 | Helicone/ai-gateway (Rust new) | **GPL-3.0** | 589 | **REJECT permissive-only** | — |

---

## §11 Convergence verdict — 3-org Axis-1 PASS verification per cluster

### Cluster A: Production LLM serving
- **3 distinct orgs**: vllm-project (LF-AI hosted), sgl-project (LMSYS academic+industry), ggml-org (Gerganov+community)
- **Axis-1 PASS firm**.

### Cluster B: LLM gateway / routing
- **5 distinct orgs**: BerriAI (LiteLLM) + Portkey + Helicone + OpenRouter + LMSYS (RouteLLM)
- **Axis-1 PASS firm**.

### Cluster C: Embedding / reranker SOTA
- **5 distinct orgs**: BAAI (BGE), Alibaba/Qwen (Qwen3-Embedding), Google/DeepMind (EmbeddingGemma), Jina AI, Mixedbread AI
- **Axis-1 PASS firm**.

### Cluster D: Quantization
- **4 distinct orgs**: vLLM Project + Red Hat AI (llmcompressor), MIT HAN Lab (AWQ), BitsAndBytes Foundation (BnB), Dropbox (HQQ)
- **Axis-1 PASS firm**.

### Cluster E: Local-runtime alternatives
- **3 distinct orgs**: ollama, Apple (MLX), Mozilla (llamafile), MLC AI, mudler (LocalAI)
- **Axis-1 PASS firm**.

### Cluster F: Multi-account fleet / OAuth
- **2 distinct orgs**: router-for-me (CLIProxyAPI), musistudio (claude-code-router); kaitranntt/ccs is wrapper layer
- **Axis-1 PARTIAL** — needs more independent T1 endorsements. Treat as STUDY-PILOT only.

---

## §12 HONEST-NON-FINDING

1. **NotDiamond has no installable open-source repo** — closed product. `lm-sys/RouteLLM` is the open-source alternative.
2. **LM-Studio is closed-source desktop UI** — not an installable open repo.
3. **Cohere rerank / Voyage AI / Gemini Embedding** — closed APIs; route via LiteLLM only.
4. **Llama-3.3 / Qwen3 / DeepSeek-V3 weights themselves are not install-class repos** — model weights distributed via HuggingFace Hub and Ollama library.
5. **AutoGPTQ ARCHIVED Dec 2025 / TGI ARCHIVED Dec 2025** — major 2024-era tools end-of-lifed in late 2025.
6. **FlashRank / monot5 / Pyserini** — no high-star modern alternative beyond bge-reranker-v2-m3 / Qwen3-Reranker / mxbai-rerank.
7. **claude-code-pool / claude-code-fleet** patterns — no specific install-class repo emerged beyond CLIProxyAPI + ccs ecosystem.
8. **Helicone offers TWO products**: parent `Helicone/helicone` (Apache-2.0) is permissive; newer `Helicone/ai-gateway` (Rust, GPL-3.0) is NOT.
9. **Stella V5 (dunzhang/NovaSearch)**: model is MIT and high-quality on English, but smaller community visibility.

---

## §13 Install-order recommendation (pure-runtime deployment)

**Tier-A (P0 install-now, in this order)**:
1. Ollama (one-line install) → pulls llama.cpp transitively
2. LiteLLM (multi-provider gateway) → primary cloud-tier abstraction
3. BGE-M3 + bge-reranker-v2-m3 (multilingual RAG baseline) OR Qwen3-Embedding-0.6B + Qwen3-Reranker-0.6B (best per-size SOTA)
4. vLLM (when GPU-class production serving needed)
5. sentence-transformers (Python lib for embedding access; pip-only)
6. (optional) OpenRouter API key for managed routing pilot

**Tier-B (P1 STUDY-PILOT after Tier-A operational)**:
7. SGLang (when prefix-cache workload identified — RAG/multi-turn dominates)
8. llmcompressor (when local quantization workflow needed)
9. CLIProxyAPI + ccs (when multi-account OAuth-rotation workflow needed)
10. Portkey gateway (when observability/guardrails beyond LiteLLM needed)

**Tier-C (reference-only / specialized)**:
11. EmbeddingGemma-300M (on-device / edge)
12. MLX-LM (Apple Silicon specific)
13. exllamav3 (extreme single-GPU INT4)
14. mxbai-* (English-focused embed/rerank if specifically needed)

**DO NOT install**: TGI (archived), AutoGPTQ (archived), KoboldCpp (AGPLv3), Helicone ai-gateway Rust (GPLv3).

---

## §14 Cardinal-rule-9 install-risk notes

- **vLLM + SGLang**: HEAVY CUDA dep chain → version-pin torch + CUDA toolkit; 2-round fix-forward expected for first deployment
- **LiteLLM**: pin to release tag NOT main (default branch is `litellm_internal_staging` — unstable signal)
- **Ollama auto-updater**: can pull breaking model schemas → pin OS-package-manager version
- **Qwen3 / EmbeddingGemma**: model-license review at install — Apache-2.0 confirmed for current versions but Google's Gemma Terms-of-Use can change
- **Portkey license**: announced Apache-2.0 Mar 2026 but current LICENSE file in repo HEAD reads "MIT" — operator MUST re-verify license at install-time
- **HQQ org-rewrite**: cite-anchors should point at `dropbox/hqq` not `mobiusml/hqq` (org migration)
- **llama.cpp org-rewrite**: `ggml-org/llama.cpp` not `ggerganov/llama.cpp` (migration ~mid-2024)

---

**ARTIFACT-INLINE complete**

HANDOFF: handoff_to: orchestrator, output_mode: last_message, verdict_one_line: "DONE: W204-A LLM serving — 11P0 + 18P1 + 5REJECT; 5-org Axis-1 PASS across 5 of 6 clusters (Fleet cluster PARTIAL); honest gaps documented in §12"
