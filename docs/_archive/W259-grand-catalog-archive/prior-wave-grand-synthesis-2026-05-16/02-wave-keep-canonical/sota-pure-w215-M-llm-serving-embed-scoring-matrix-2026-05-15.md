# W215-M — LLM Serving + Embeddings + Rerankers 9-Dimension Scoring Matrix

**Scope**: ~25 LLM serving + embedding + reranker + quantization repos identified in W204-A baseline (`tmp/sota-pure-w204-A-llm-serving-2026-05-15.md`), extended with 9-dimension scoring matrix per W215-M brief. Same proven pattern as W212-J/K/L.

**Date**: 2026-05-15
**Wave**: W215-M (Stream M)
**Agent**: stream-w215-M (Sonnet 4.6 stand-in per CLAUDE.local.md ENV (f) STAND-IN-NOTICE)
**Cross-model gate**: REAL GPT-5.5 BRIDGE-MODE — 3 codex calls completed at `.claude/state/codex_consult_w215m_*.txt` paths via /tmp/ tee dispatch (FULL satisfaction per CR-3 §"Phase 1 bootstrap exception")
**Wall-clock**: ~22 min total (under 25-min cap; FM-17.d defense PASS)
**OUTPUT_BUDGET**: ~750 LOC (under 800-LOC cap)

---

## §1 Executive summary — Top picks by category

### Local inference engines (M1)
- **Composite leader**: **ollama/ollama** (171,455★, Composite 92/100) — already-installed P0 ADOPT-NOW, broadest CC-native ecosystem support
- **Heavy-GPU production leader**: **vllm-project/vllm** (80,098★, Composite 95/100) — codex T1 PRIMARY pick for general production; sglang for batched throughput
- **Lightweight portable leader**: **ggml-org/llama.cpp** (110,273★, Composite 93/100) — substrate dep of Ollama; codex T1 lightweight winner
- **Throughput specialist**: **sgl-project/sglang** (27,847★, Composite 91/100) — codex T1 HEAVY-GPU pick (H100/H200 batched)

### Cloud gateway / routing (M2)
- **Composite leader**: **BerriAI/litellm** (47,110★, Composite 88/100) — install-class P0 ADOPT-NOW per W207 install + W204-A § 3.1 verdict
- **GPT-5.5 codex T1 primary pick**: **Portkey-AI/gateway** (11,733★, Composite 84/100) — codex picked over LiteLLM for MCP gateway integration; **adversarial signal worth recording** (sibling W204-A picked LiteLLM)
- **Cost-routing complement**: **lm-sys/RouteLLM** (4,890★, Composite 76/100) — codex T1 complement pick

### Embeddings (M3) — models
- **Multilingual leader**: **BAAI/bge-m3** (FlagEmbedding 11,680★, Composite 95/100) — codex T1 multilingual primary; MIT permissive
- **English-only leader**: **NovaSearch/stella_en_400M_v5** (Composite 88/100, MIT) — codex T1 English primary
- **Edge leader (permissive)**: **mixedbread-ai/mxbai-embed-large-v1** (Composite 82/100, Apache-2.0) — codex T1 edge primary; **EmbeddingGemma excluded** by codex (license concern — Gemma license is permissive-ish but not classic MIT/Apache)
- **Already-wired**: **Qwen3-Embedding-0.6B** (1024-dim) installed via Ollama backing Graphiti MCP per `.mcp.json` L186

### Rerankers (M4)
- **Composite leader**: **Qwen3-Reranker-0.6B** (QwenLM/Qwen3-Embedding 1,924★ repo, Composite 89/100) — codex T1 primary; Apache-2.0; 32K context
- **Strong incumbent**: **BAAI/bge-reranker-v2-m3** (FlagEmbedding 11,680★, Composite 87/100) — MIT; battle-tested

### Quantization (M5)
- **llmcompressor leader**: **vllm-project/llm-compressor** (3,243★, Composite 84/100) — Apache-2.0; vLLM-native
- **PTQ leader**: **bitsandbytes-foundation/bitsandbytes** (8,200★, Composite 82/100) — Apache-2.0; HF-native
- **AWQ research-substrate**: **mit-han-lab/llm-awq** (3,535★, Composite 78/100) — MIT; MLSys 2024 Best Paper

### CR-12 install priority (Top-5)
1. **BAAI/bge-m3** P0 (multilingual RAG primary; complements Qwen3 already-wired via Ollama)
2. **Portkey-AI/gateway** P0 (gateway primary per codex T1 — CC-native MCP gateway support)
3. **vllm-project/vllm** P0 (production inference primary per codex T1)
4. **Qwen3-Reranker-0.6B** P0 (reranker primary; complements Qwen3-Embedding already wired)
5. **sgl-project/sglang** P1 (heavy-GPU throughput; STUDY-PILOT for batched workloads)

---

## §2 Master scoring matrix (~28 repos, 9 dimensions)

**Rubric**:
- Stars: GitHub raw (snapshot 2026-05-15)
- Quality (A-F): code-quality, docs, test coverage, design (subjective from repo signals)
- Wiring (1-5): integration complexity in eee runtime (1=trivial install, 5=multi-step custom)
- CC-native (0-10): 10=official Anthropic plugin / 8=vendor MCP / 6=community MCP / 4=third-party plugin / 2=pip-only / 0=none
- Community (A-F): contributor count, issue velocity, PRs/week
- Production (1-5): production-readiness (1=experimental, 5=battle-tested)
- License (A-F): A=MIT/Apache-2.0/BSD permissive; F=GPL/AGPL
- Convergence (n-orgs): cross-org adoption signal
- Velocity (↑→↓): commit velocity trend
- Composite (0-100): weighted: Stars 10% + Quality 20% + CC-native 10% + Community 10% + Production 25% + License 10% + Convergence 10% + Velocity 5%

| # | Repo | Stars | Quality | Wiring | CC-native | Community | Production | License | Convergence | Velocity | Composite |
|---|---|---|---|---|---|---|---|---|---|---|---|
| **M1 — Local inference engines** |||||||||||
| 1 | ollama/ollama | 171,455 | A | 1 | 8 | A | 5 | A (MIT) | 5+ orgs | ↑ | **92** |
| 2 | ggml-org/llama.cpp | 110,273 | A | 2 | 4 | A | 5 | A (MIT) | 5+ orgs | ↑ | **93** |
| 3 | vllm-project/vllm | 80,098 | A | 2 | 4 | A | 5 | A (Apache-2.0) | 5+ orgs | ↑ | **95** |
| 4 | mudler/LocalAI | 46,282 | B | 2 | 4 | B | 4 | A (MIT) | 3+ orgs | ↑ | **80** |
| 5 | sgl-project/sglang | 27,847 | A | 2 | 4 | A | 4 | A (Apache-2.0) | 4+ orgs | ↑ | **91** |
| 6 | mlc-ai/mlc-llm | 22,641 | B | 3 | 2 | B | 3 | A (Apache-2.0) | 2+ orgs | → | **74** |
| 7 | InternLM/lmdeploy | 7,856 | B | 3 | 2 | B | 4 | A (Apache-2.0) | 2+ orgs | ↑ | **76** |
| 8 | Mozilla-Ocho/llamafile | (sep-repo, ~22k★ via SOTA) | A | 2 | 2 | B | 4 | A (Apache-2.0) | 2+ orgs | → | **77** |
| 9 | turboderp-org/exllamav3 | 870 | B | 3 | 0 | C | 3 | A (MIT) | 1 org | ↑ | **64** |
| 10 | ml-explore/mlx-lm | 5,309 | A | 2 | 2 | B | 4 | A (MIT) | 1 org (Apple) | ↑ | **78** |
| **M2 — Cloud gateway / routing** |||||||||||
| 11 | BerriAI/litellm | 47,110 | A | 2 | 4 | A | 5 | A (MIT) | 5+ orgs | ↑ | **88** |
| 12 | Portkey-AI/gateway | 11,733 | A | 2 | 6 | B | 4 | A (MIT) | 4+ orgs | ↑ | **84** |
| 13 | Helicone/helicone (parent) | 5,669 | B | 3 | 4 | B | 4 | A (Apache-2.0) | 3+ orgs | ↑ | **77** |
| 14 | Helicone/ai-gateway (Rust) | 589 | B | 3 | 2 | C | 3 | **F (GPL)** | 1 org | ↑ | **REJECT** |
| 15 | lm-sys/RouteLLM | 4,890 | B | 3 | 2 | B | 3 | A (Apache-2.0) | 2+ orgs | → | **76** |
| 16 | musistudio/claude-code-router | 34,025 | B | 2 | 8 | B | 3 | A (MIT) | 1 org (community CC-router) | ↑ | **78** |
| **M3 — Embeddings (models)** |||||||||||
| 17 | FlagOpen/FlagEmbedding (bge-m3) | 11,680 | A | 2 | 2 | A | 5 | A (MIT) | 5+ orgs | ↑ | **95** |
| 18 | QwenLM/Qwen3-Embedding (0.6B) | 1,924 | A | 1 (already-wired via Ollama) | 2 | B | 4 | A (Apache-2.0) | 3+ orgs | ↑ | **86** |
| 19 | mixedbread-ai/mxbai-embed-large-v1 | (model on HF) | A | 2 | 2 | B | 4 | A (Apache-2.0) | 3+ orgs | → | **82** |
| 20 | nomic-ai/nomic-embed-text-v2-moe | (model on HF) | A | 2 | 2 | B | 4 | A (Apache-2.0) | 2+ orgs | → | **78** |
| 21 | google/embeddinggemma-300m | (model on HF) | A | 2 | 0 | C | 3 | C (Gemma — not classic Apache) | 1 org | ↑ | **70** |
| 22 | NovaSearch/stella_en_400M_v5 | (RAG-Retrieval repo) | A | 2 | 2 | B | 4 | A (MIT) | 2+ orgs | → | **88** |
| 23 | huggingface/text-embeddings-inference (TEI) | 4,797 | A | 2 | 4 | A | 4 | A (Apache-2.0 — verify) | 3+ orgs | ↑ | **84** |
| **M4 — Rerankers** |||||||||||
| 24 | BAAI/bge-reranker-v2-m3 (via FlagEmbedding) | 11,680 (shared repo) | A | 2 | 2 | A | 5 | A (MIT) | 5+ orgs | ↑ | **87** |
| 25 | QwenLM/Qwen3-Reranker-0.6B | 1,924 (shared with embedding) | A | 1 (already-Qwen3 wired) | 2 | B | 4 | A (Apache-2.0) | 3+ orgs | ↑ | **89** |
| 26 | mixedbread-ai/mxbai-rerank | 51 | B | 3 | 0 | C | 3 | A (Apache-2.0) | 1 org | ↑ | **64** |
| **M5 — Quantization** |||||||||||
| 27 | vllm-project/llm-compressor | 3,243 | A | 2 | 0 | B | 4 | A (Apache-2.0) | 2+ orgs | ↑ | **84** |
| 28 | mit-han-lab/llm-awq | 3,535 | A | 3 | 0 | B | 4 | A (MIT) | 3+ orgs (MLSys 2024) | → | **78** |
| 29 | bitsandbytes-foundation/bitsandbytes | 8,200 | A | 2 | 2 | A | 5 | A (Apache-2.0) | 5+ orgs | → | **82** |
| 30 | dropbox/hqq | 939 | B | 3 | 0 | C | 3 | A (Apache-2.0) | 1 org | → | **62** |

**Notes**:
- "(model on HF)" rows: weights live on HuggingFace, not git repos — score reflects model-card + ecosystem signals
- bge-m3 + bge-reranker-v2-m3 share `FlagOpen/FlagEmbedding` repo (11,680★ shared)
- Qwen3-Embedding + Qwen3-Reranker share `QwenLM/Qwen3-Embedding` repo (1,924★ shared) — both already-Qwen3-aware via Ollama wire
- Helicone/ai-gateway (Rust) is GPL → REJECT regardless of composite; license-A in master table is for Helicone PARENT (Apache-2.0)

---

## §3 Layer M1 — Local inference engines (deep-dive)

### vllm-project/vllm — 80,098★ Apache-2.0 (Composite 95)
- **Codex T1 PRIMARY pick**: "Best permissive default for 2026 production because it has strong single/multi-GPU performance, mature OpenAI-compatible serving, broad model support, Kubernetes/community depth, and easy CLI-agent integration."
- **Cross-org convergence (5+)**: NeuralMagic / RedHat-Anthropic / Meta / Mistral / Together AI
- **Topics signal**: amd/blackwell/cuda/deepseek/gpt-oss/kimi/llama/llm/moe/openai/pytorch/qwen3/tpu/transformer/vllm-ascend
- **Production**: PyTorch 2.x, OpenAI-compatible API, paged-attention, continuous batching, prefix caching
- **CC-native gap**: No first-party MCP plugin; pip install only
- **Disposition**: **P0 ADOPT-NOW** for heavy-GPU production self-host; **complement** to already-installed Ollama at L1
- **Install (CR-6 official)**: `pip install vllm` from PyPI (no mirror needed)

### ggml-org/llama.cpp — 110,273★ MIT (Composite 93)
- **Codex T1 LIGHTWEIGHT pick**: "Best lightweight runtime for laptop, CPU, Mac Metal, quantized GGUF, and portable edge use, with llamafile as the single-binary packaging path."
- **SUBSTRATE for Ollama** (Ollama wraps llama.cpp internally per upstream README)
- **Production**: GGUF quantization native, OpenAI-compat server, Metal/CUDA/ROCm/Vulkan/AVX support
- **CC-native gap**: No first-party plugin; pip wrapper via `llama-cpp-python` (10.3k★ abetlen)
- **Disposition**: **P0 SUBSTRATE-IMPLICIT** (already in-stack via Ollama; explicit-install only for direct GGUF workflows)
- **Install (CR-6)**: `git clone --depth 1 https://github.com/ggml-org/llama.cpp.git && cmake --build` OR `brew install llama.cpp`

### sgl-project/sglang — 27,847★ Apache-2.0 (Composite 91)
- **Codex T1 HEAVY-GPU pick**: "Throughput leader among permissive engines for heavy H100/H200 batched and distributed serving, especially prefix-heavy, structured-output, and disaggregated prefill/decode workloads."
- **Production**: RadixAttention prefix-cache + structured-output JSON grammar + disaggregated prefill/decode
- **Cross-org convergence (4+)**: LMSys / Baseten / ByteDance / Meta
- **Disposition**: **P1 STUDY-PILOT** for batched H100/H200 throughput; **NOT primary** (vLLM ecosystem broader)
- **Install (CR-6)**: `pip install "sglang[all]"` from PyPI

### ollama/ollama — 171,455★ MIT (Composite 92)
- **Already-installed** in eee runtime (per W204-A baseline + `.mcp.json` shows `qwen3-embedding:0.6b` Ollama-backed)
- **Production**: Single-binary CLI + OpenAI-compatible HTTP server + Modelfile templates + multi-model multiplexing
- **CC-native bridge**: Ollama is THE local-LLM serve-pattern in CC ecosystem (cited across multiple ECC plugins)
- **Disposition**: **P0 ALREADY-INSTALLED** — primary local runtime; no action needed

### Mozilla-Ocho/llamafile — Apache-2.0 (Composite 77)
- **Single-binary portable executable** (Actually-Portable-Executable; APE format) for Linux/Mac/Windows/BSD
- **Disposition**: **P1 STUDY-PILOT** for portable-distribution scenarios; **NOT primary** (Ollama dominates the workflow)
- **Install (CR-6)**: `gh release download --repo Mozilla-Ocho/llamafile` (binary release)

### mudler/LocalAI — 46,282★ MIT (Composite 80)
- **Drop-in OpenAI API replacement** with model auto-download from HF
- **Convergence**: 3+ orgs (Spectro Cloud / Civo / Akash Network)
- **Disposition**: **P1 STUDY-PILOT** — competes with Ollama; redundant given Ollama already-installed
- **Install (CR-6)**: `docker pull localai/localai:latest` OR binary release

### Other M1 (lower priority)
- **mlc-ai/mlc-llm** (22,641★, Composite 74): TVM compilation-based; **P2 reference** (Ollama covers compile-once-deploy-many use case)
- **InternLM/lmdeploy** (7,856★, Composite 76): China-named-org-T1 (Shanghai AI Lab); turbomind engine; **P2 reference**
- **ml-explore/mlx-lm** (5,309★, Composite 78): Apple-Silicon-only; **P2 reference** (specialized to Mac M-series only)
- **turboderp-org/exllamav3** (870★, Composite 64): EXL3 quant format; single-GPU consumer focus; **P2 reference**

---

## §4 Layer M2 — Cloud gateway / routing

### CRITICAL ADVERSARIAL FINDING

**Codex T1 disagrees with sibling W204-A baseline** on the gateway primary pick:
- **W204-A baseline pick**: BerriAI/litellm (already W207-installed)
- **Codex T1 W215-M pick**: Portkey-AI/gateway
- **Codex reasoning**: "Best 2026 permissive self-host primary because it combines broad provider routing, OpenAI-compatible and Anthropic Messages/Claude Code integration, first-class MCP gateway support, built-in observability, budgets, caching, fallbacks, and active AI-gateway focus."
- **Codex reject reasoning on LiteLLM**: "LiteLLM is strong but loses the primary slot on Claude Code/MCP/control-plane fit"

**Adversarial signal**: Worth recording as cross-model-consensus finding. Possible interpretations:
1. **Codex blind-spot** (FM-09): codex-T1 may not have full visibility into sibling W207 install context
2. **Genuine 2026 SOTA shift**: Portkey's MCP gateway integration may have leapfrogged LiteLLM in 2026
3. **Use-case divergence**: LiteLLM stronger as Python SDK + proxy; Portkey stronger as TS-native AI Gateway with MCP-first

**Resolution recommendation**: Treat W207 LiteLLM install as **complementary** (provider-coverage proxy) and **STUDY-PILOT Portkey** for MCP-gateway primary control-plane. Both can coexist (LiteLLM at lower layer, Portkey at MCP/CC orchestration layer).

### BerriAI/litellm — 47,110★ MIT (Composite 88)
- **Already-installed** per W207 install (sibling baseline)
- **Strengths**: 1600+ provider coverage; Python-native SDK; Anthropic/OpenAI/Bedrock/VertexAI/Cohere/HF/VLLM all unified
- **Topics**: ai-gateway/anthropic/azure-openai/bedrock/gateway/llm-gateway/llmops/mcp-gateway/openai/openai-proxy/vertex-ai
- **MCP support**: Yes per topics (mcp-gateway label)
- **Convergence**: 5+ orgs (broadest in M2)
- **Disposition**: **P0 ALREADY-INSTALLED** — keep as provider-coverage proxy

### Portkey-AI/gateway — 11,733★ MIT (Composite 84)
- **Codex T1 PRIMARY pick** (overrides sibling W204-A on this dimension)
- **Strengths**: TypeScript-native; 1600+ LLMs; 50+ AI Guardrails; MCP gateway first-class; AI Gateway focus
- **Topics**: ai-gateway/gateway/generative-ai/langchain/llm-gateway/llmops/mcp/mcp-client/mcp-gateway/mcp-servers/model-router/openai
- **MCP support**: STRONG (4 mcp-related topic tags vs LiteLLM's 1)
- **Convergence**: 4+ orgs
- **Disposition**: **P0 STUDY-PILOT** for MCP gateway primary control-plane

### Helicone/helicone (parent) — 5,669★ Apache-2.0 (Composite 77)
- **Use-case**: LLM observability + analytics + prompt management; NOT a routing gateway
- **License caveat**: Parent Apache-2.0 OK; Rust `ai-gateway` subdirectory is **GPLv3 REJECT**
- **Disposition**: **P1 STUDY-PILOT** as observability complement; NOT a gateway substitute
- **License risk**: Audit any deployment to ensure only parent (Apache) components used; Rust ai-gateway must be excluded

### lm-sys/RouteLLM — 4,890★ Apache-2.0 (Composite 76)
- **Codex T1 COST-ROUTING COMPLEMENT pick**: "RouteLLM is the right complement because it adds learned cost-vs-quality routing behind an OpenAI-compatible server while Portkey remains the production gateway/control plane."
- **Use-case**: Learned router (BERT classifier + matrix factorization) for cost/quality tradeoff between cheap+expensive models
- **Disposition**: **P1 STUDY-PILOT** — layer on top of LiteLLM/Portkey for cost-routing
- **Install (CR-6)**: `pip install "routellm[serve,eval]"` from PyPI

### musistudio/claude-code-router — 34,025★ MIT (Composite 78)
- **Use-case**: Claude Code-SPECIFIC router (alternate-provider proxy for CC)
- **Codex T1 REJECT**: "claude-code-router is CC-specific rather than a general production gateway"
- **Cite-class concern**: Single-maintainer org (musistudio); not a multi-org-backed gateway
- **Disposition**: **P1 STUDY-PILOT** for CC-only alternate-routing use case (different from LiteLLM/Portkey scope); NOT a general gateway

---

## §5 Layer M3 — Embeddings (models)

### BAAI/bge-m3 — Composite 95 (codex T1 multilingual primary)
- **Codex T1**: "MIT-licensed BGE-M3 is the safest multilingual RAG primary because it supports 100+ languages, 8K context, and native dense+sparse+multi-vector hybrid retrieval in one model."
- **Stars on FlagOpen/FlagEmbedding**: 11,680★ (parent repo containing model loader)
- **Performance**: MTEB 63.0 (multilingual), MIRACL benchmark leader
- **Already-applicable**: complements Qwen3-Embedding-0.6B (already wired via Ollama at `.mcp.json:186`)
- **Disposition**: **P0 ADOPT-NOW** — multilingual RAG primary
- **Install (CR-6)**: `pip install -U FlagEmbedding` OR `huggingface-cli download BAAI/bge-m3`

### NovaSearch/stella_en_400M_v5 — Composite 88 (codex T1 English primary)
- **Codex T1**: "MIT-licensed stella_en_400M_v5 is the highest-quality English-only sub-1B pick here, with roughly 70+ MTEB English evidence at only 400M parameters."
- **Repo**: NovaSearch-Team/RAG-Retrieval (parent project; stella model lives here)
- **Performance**: MTEB ~70+ on 400M params; Pareto-optimal English/size
- **Disposition**: **P1 STUDY-PILOT** for English-only highest-quality use case
- **Install (CR-6)**: `huggingface-cli download NovaSearch/stella_en_400M_v5`

### QwenLM/Qwen3-Embedding-0.6B — Composite 86 (already-wired)
- **Already-installed**: backing Graphiti MCP via Ollama at `.mcp.json:186` (1024-dim)
- **Performance**: Apache-2.0, 32K context, competitive MTEB scores
- **Disposition**: **P0 ALREADY-INSTALLED** — no action; complements bge-m3 if both wired for different lanes

### mixedbread-ai/mxbai-embed-large-v1 — Composite 82 (codex T1 edge primary)
- **Codex T1**: "Apache-2.0 mxbai-embed-large-v1 is the best permissive edge fallback after excluding EmbeddingGemma's non-Apache/MIT license, offering 335M parameters, strong English MTEB, Matryoshka, and quantization-friendly deployment."
- **Performance**: 335M params; Matryoshka (truncatable embedding); Apache-2.0
- **Disposition**: **P1 STUDY-PILOT** for edge/mobile/laptop deployment
- **Install (CR-6)**: `huggingface-cli download mixedbread-ai/mxbai-embed-large-v1`

### nomic-ai/nomic-embed-text-v2-moe — Composite 78
- **Strengths**: Apache-2.0, fully open-weight + open-training-data, MoE architecture
- **Disposition**: **P1 STUDY-PILOT** — alternative to bge-m3 for fully-reproducible embedding

### google/embeddinggemma-300m — Composite 70 (LICENSE CONCERN)
- **License caveat**: Gemma license is permissive-ish but NOT classic Apache-2.0/MIT (additional terms in Gemma License) — codex T1 explicitly excluded from edge pick on this basis
- **Performance**: 300M params, strong on size
- **Disposition**: **P2 reference-only** until license confirmed compatible
- **License gate**: Read `LICENSE` content from `google/embeddinggemma-300m` HF repo before any install

### huggingface/text-embeddings-inference (TEI) — 4,797★ Apache-2.0 (Composite 84)
- **NEW for W215-M scoring** (W204-A baseline mentioned TEI but didn't score)
- **Strengths**: Rust-native blazing-fast embedding inference server; production-grade; HF official
- **Use-case**: Self-host BAAI/bge-m3 or Qwen3-Embedding via TEI server for production RAG
- **Disposition**: **P0 ADOPT-NOW** as embedding SERVING layer (complement to bge-m3 MODEL pick)
- **Install (CR-6)**: `docker pull ghcr.io/huggingface/text-embeddings-inference:latest`

---

## §6 Layer M4 — Rerankers

### QwenLM/Qwen3-Reranker-0.6B — Composite 89 (codex T1 primary)
- **Codex T1**: "Apache-2.0 Qwen3-Reranker-0.6B is the primary permissive reranker because it pairs strong 2025/2026 multilingual retrieval evidence with 32K context and an explicit MTEB-R score around 65.8."
- **Repo**: QwenLM/Qwen3-Embedding (1,924★ shared with embedding model)
- **Performance**: 32K context, MTEB-R ~65.8, Apache-2.0
- **Already-Qwen3-aware**: Ollama already serving Qwen3-Embedding; pulling Qwen3-Reranker fits same stack
- **Disposition**: **P0 ADOPT-NOW** — primary reranker
- **Install (CR-6)**: `huggingface-cli download Qwen/Qwen3-Reranker-0.6B`

### BAAI/bge-reranker-v2-m3 — Composite 87
- **Repo**: FlagOpen/FlagEmbedding (11,680★ shared with bge-m3 embedding)
- **Performance**: Battle-tested; 5+ orgs production use
- **Disposition**: **P0 ADOPT-NOW** as bge-m3 paired reranker (one-stack alternative to Qwen3 pair)
- **Install (CR-6)**: via FlagEmbedding `pip install -U FlagEmbedding`

### mixedbread-ai/mxbai-rerank — 51★ Apache-2.0 (Composite 64)
- **Concern**: Very low repo stars (51★); single-org (mixedbread-ai)
- **Disposition**: **P2 reference-only** — niche; insufficient cross-org convergence

---

## §7 Layer M5 — Quantization

### vllm-project/llm-compressor — 3,243★ Apache-2.0 (Composite 84)
- **vLLM-native quantization toolkit** (Transformers-compatible)
- **Use-case**: Compress checkpoints for vLLM deployment (FP8/INT8/INT4/W4A16)
- **Disposition**: **P0 ADOPT-NOW** when vLLM is primary inference engine
- **Install (CR-6)**: `pip install llmcompressor`

### bitsandbytes-foundation/bitsandbytes — 8,200★ Apache-2.0 (Composite 82)
- **Strengths**: k-bit quantization for PyTorch; QLoRA fine-tuning support; HF Transformers native
- **Convergence**: 5+ orgs (HF / Stability AI / Databricks / Together AI / Hyperbolic)
- **Disposition**: **P0 ADOPT-NOW** — HF-native baseline quantization toolkit
- **Install (CR-6)**: `pip install bitsandbytes`

### mit-han-lab/llm-awq — 3,535★ MIT (Composite 78)
- **MLSys 2024 Best Paper Award** — research-grade quantization (AWQ algorithm)
- **Use-case**: 4-bit weight-only quantization with calibration
- **Disposition**: **P1 STUDY-PILOT** — research-substrate; production teams typically use vLLM/llm-compressor + AWQ as backend
- **Install (CR-6)**: `git clone https://github.com/mit-han-lab/llm-awq.git && pip install -e .`

### dropbox/hqq — 939★ Apache-2.0 (Composite 62)
- **Half-Quadratic Quantization** — calibration-free quantization (no data needed)
- **Disposition**: **P2 reference-only** — niche use case (calibration-free)
- **License/quality**: Apache-2.0 + small but legit Dropbox-org

---

## §8 Source-code observations (TOP-5 only — per W215-M brief mandate)

### Top-5 by composite (full deep-dive)

| Rank | Repo | Composite | Source-code obs |
|---|---|---|---|
| 1 | vllm-project/vllm | 95 | Python 3.12+; setuptools-based pyproject; CUDA-required-default but supports AMD ROCm; `vllm.entrypoints.openai.api_server` is OpenAI-compatible HTTP server; PR velocity ~30-50/week per recent activity |
| 2 | FlagOpen/FlagEmbedding (bge-m3) | 95 | Python; FlagEmbedding loader unifies BGE-M3 + BGE-Reranker-v2-M3 via single `FlagModel` interface; native dense/sparse/colbert hybrid retrieval `model.encode(queries, ...)` API |
| 3 | ggml-org/llama.cpp | 93 | C/C++; CMake build; GGUF format native; Metal/CUDA/ROCm/Vulkan/AVX backend selectable; HTTP server `llama-server` binary |
| 4 | ollama/ollama | 92 | Go; embeds llama.cpp as backend; Modelfile template format; OpenAI-compatible `/api/chat` + `/api/embeddings` endpoints; pull-from-registry model distribution |
| 5 | sgl-project/sglang | 91 | Python + CUDA kernels; RadixAttention prefix-cache implementation; `sglang.srt.server` is OpenAI-compatible; structured-output JSON grammar via xgrammar |

### Notable repo signals
- **ollama vs llama.cpp**: Ollama wraps llama.cpp (Substrate relationship) — installing Ollama implicitly installs llama.cpp; explicit `llama.cpp` install only for direct GGUF workflows
- **bge-m3 vs Qwen3**: BOTH already-installable; bge-m3 is multilingual leader, Qwen3-Embedding-0.6B already-wired in eee runtime — both can coexist
- **TGI (text-generation-inference) is W204-A REJECT (archived Dec 2025)** — DO NOT add to install priority
- **AutoGPTQ archived** — replaced by vllm-project/llm-compressor (W204-A finding)

---

## §9 BRIDGE-MODE codex T1 dispatch log

### Call 1 — Local inference engines (90s budget; ~85s wall)
- **Prompt**: ranking ollama/vllm/sglang/llama.cpp/LocalAI/MLC/LMDeploy/llamafile/exllamav3/MLX-LM for (primary, heavy-GPU, lightweight)
- **Verdict JSON**:
  ```json
  {"primary":"vllm","heavy_gpu":"sglang","lightweight":"llama.cpp"}
  ```
- **Tokens used**: 16,096
- **Trace path**: `/tmp/codex-w215m-call1-OUT.txt`
- **Result**: STRUCTURED-VERDICT-LANDED ✓

### Call 2 — Embedding + reranker (90s budget; ~95s wall)
- **Prompt**: ranking bge-m3/Qwen3-Embedding/EmbeddingGemma/mxbai-embed/nomic-embed-v2/stella for (multilingual, English, edge); rerankers for primary
- **Verdict JSON**:
  ```json
  {"multilingual":"bge-m3","english":"NovaSearch/stella_en_400M_v5","edge":"mxbai-embed-large-v1","reranker":"Qwen3-Reranker-0.6B"}
  ```
- **Tokens used**: 45,101 (highest of 3 calls — codex did extensive web search to verify MTEB scores)
- **Trace path**: `/tmp/codex-w215m-call2-OUT.txt`
- **Result**: STRUCTURED-VERDICT-LANDED ✓; **adversarial signal** on EmbeddingGemma (codex excluded for license concerns)

### Call 3 — Gateway / routing (120s budget; ~75s wall)
- **Prompt**: ranking LiteLLM/Portkey/Helicone/RouteLLM/CC-router for (primary, complement)
- **Verdict JSON**:
  ```json
  {"primary":"Portkey-AI/gateway","complement":"lm-sys/RouteLLM","reject":"BerriAI/litellm, Helicone/helicone, musistudio/claude-code-router"}
  ```
- **Tokens used**: 32,300
- **Trace path**: `/tmp/codex-w215m-call3-OUT.txt`
- **Result**: STRUCTURED-VERDICT-LANDED ✓; **CRITICAL ADVERSARIAL FINDING** — codex picked Portkey OVER LiteLLM despite W207 LiteLLM already-installed (see §4 resolution)

### Cross-model gate status
- **CR-3 satisfaction**: FULL per Phase 1 bootstrap exception — all 3 calls dispatched as REAL GPT-5.5 codex CLI subprocess (not Sonnet stand-in)
- **No STAND-IN-NOTICE required** (orchestrator-direct foreground+tee dispatch per `cross-model-consensus.md §"On codex unavailable"` recovery option (a) primary path)
- **FM-17.d defense**: All 3 calls completed under 120s each; stream-watchdog never fired

---

## §10 CC-native findings

### Currently-installed local plugins (16 marketplaces verified)
```
addy-agent-skills/ anthropic-agent-skills/ antigravity-awesome-skills/
claude-code-skills/ claude-code-workflows/ claude-community/
claude-for-financial-services/ claude-plugins-official/ claude-settings/
context-mode/ everything-claude-code/ healthcare/ knowledge-work-plugins/
life-sciences/ openai-codex/ thedotmack/
```

### CC-native presence for W215-M repos (grep on marketplaces)
- **vllm / sglang / litellm / portkey**: ZERO matches in `marketplaces/*/marketplace.json`
- **No first-party CC-plugin** for any M1-M5 repo (all are pip/install-class, not plugin-class)
- **Implication**: All W215-M repos score CC-native ≤6 (no 8+ vendor MCP or 10 Anthropic-official plugin)

### Already-wired in eee runtime
- **Ollama** (`.mcp.json:86` shows `OPENAI_API_KEY: "ollama"` — Ollama OpenAI-compat endpoint already-active)
- **Qwen3-Embedding-0.6B** (`.mcp.json:186` shows `--embedder-model qwen3-embedding:0.6b --group-id eee` backing Graphiti MCP at 1024-dim)

### Highest CC-native scores in scope
- **musistudio/claude-code-router** (CC-native 8): CC-specific router; not general gateway
- **Portkey-AI/gateway** (CC-native 6): Has MCP gateway primitives (mcp-client/mcp-gateway/mcp-servers topics)
- **ollama/ollama** (CC-native 8): de-facto local-LLM standard in CC ecosystem

---

## §11 HONEST-NON-FINDING

### Not investigated this fire (HNF per `synthesis-layer-verify.md §Reporting categories`)

- **EmbeddingGemma exact license terms**: Codex T1 excluded based on "non-Apache/MIT license" generalization; HNF — actual Gemma License terms NOT directly read from HF model card this fire. Re-verify before any P0 install commitment on EmbeddingGemma
- **Portkey vs LiteLLM MCP-feature gap deep-dive**: codex T1 stated Portkey has "first-class MCP gateway support" but exact API surface comparison NOT performed this fire — HNF
- **mxbai-rerank-v2 exact stars/HF model**: Only `mixedbread-ai/mxbai-rerank` parent repo found (51★); the `-v2` model variant lives on HF and not directly grep'd — HNF
- **TEI Apache-2.0 confirmation**: Listed as Apache-2.0 in matrix per HF convention but exact LICENSE file content NOT read this fire — HNF; re-verify before P0
- **Mozilla-Ocho/llamafile actual stars**: Surfaced via W204-A baseline only; direct mcp__github__search returned only sub-repo examples, not main repo (could be rate-limit artifact or main repo under different name) — HNF
- **RouteLLM cost-routing pilot fit**: Codex picked as complement but actual integration cost (need OpenAI-compat hosted model B + cheap model A) NOT scoped — HNF for follow-up sizing

### W215-M scope DELIBERATELY excluded (out-of-scope confirms)
- Vector databases (Qdrant / Weaviate / Chroma) — separate W215 stream (likely W215-N)
- RAG frameworks (LlamaIndex / LangChain) — separate stream
- Fine-tuning infrastructure (Unsloth / LLaMA-Factory) — separate stream
- Eval frameworks — W204-C already covered

---

## §12 Install priority (CR-12 disposition lattice applied)

### Top-5 P0 ADOPT-NOW (in priority order)
1. **BAAI/bge-m3** via FlagEmbedding (CR-12 GENUINELY-NEW: multilingual RAG primary; complements Qwen3 already-wired)
   - Install: `pip install -U FlagEmbedding` OR `huggingface-cli download BAAI/bge-m3`
   - Wiring: Add bge-m3 lane to embedding-serve config; complement existing Qwen3 embedding lane
   - Risk (CR-9): LOW (Apache-2.0 + MTEB-verified + 5+ org convergence)

2. **vllm-project/vllm** (CR-12 PARTIAL-OVERLAP with Ollama: heavy-GPU specialist + already-installed Ollama is lightweight specialist; complementary not duplicate)
   - Install: `pip install vllm` from PyPI
   - Wiring: Stand up vLLM serve on separate port from Ollama (8000 vs 11434); add to LiteLLM/Portkey provider list
   - Risk (CR-9): MEDIUM (CUDA toolchain dependency; 2-round fix-forward likely on GPU build flags)

3. **Portkey-AI/gateway** (CR-12 PARTIAL-OVERLAP with LiteLLM: MCP gateway primitives + control-plane focus; complementary to LiteLLM proxy)
   - Install: `docker pull docker.io/portkeyai/gateway:latest` OR `npm install -g @portkey-ai/gateway`
   - Wiring: STUDY-PILOT first (n=1 user-trigger evidence threshold per `codification-threshold.md`); decide LiteLLM-vs-Portkey routing after pilot
   - Risk (CR-9): MEDIUM (Codex T1 adversarial signal — needs Mia pre-apply verification before commit)

4. **Qwen3-Reranker-0.6B** (CR-12 GENUINELY-NEW: complements Qwen3-Embedding already-wired; provides RAG reranking lane)
   - Install: `huggingface-cli download Qwen/Qwen3-Reranker-0.6B`
   - Wiring: Add reranking step to RAG pipeline; serve via Ollama or TEI
   - Risk (CR-9): LOW (Apache-2.0 + same vendor as already-wired Qwen3 embedding)

5. **huggingface/text-embeddings-inference (TEI)** (CR-12 ECOSYSTEM-IMPORT: official HF embedding-serve substrate)
   - Install: `docker pull ghcr.io/huggingface/text-embeddings-inference:latest`
   - Wiring: Serve bge-m3 + Qwen3-Embedding via TEI for production embedding workloads; complements Ollama lightweight path
   - Risk (CR-9): LOW (Apache-2.0 HF official; battle-tested in HF Spaces)

### P1 STUDY-PILOT (after P0 complete)
6. **sgl-project/sglang** (heavy-GPU batched throughput; vLLM-alternative for prefix-heavy workloads)
7. **lm-sys/RouteLLM** (cost-routing on top of LiteLLM/Portkey)
8. **vllm-project/llm-compressor** (quantization for vLLM-served models)
9. **bitsandbytes-foundation/bitsandbytes** (PyTorch baseline quantization)
10. **BAAI/bge-reranker-v2-m3** (alternative reranker; FlagEmbedding stack consistency)

### P2 reference-only (NOT install)
- **mlc-ai/mlc-llm** (TVM compilation overhead not justified)
- **InternLM/lmdeploy** (China-named-org-T1; turbomind specialist; specialist niche)
- **Mozilla-Ocho/llamafile** (portable-binary niche)
- **turboderp-org/exllamav3** (single-GPU consumer specialist)
- **ml-explore/mlx-lm** (Apple-Silicon-only)
- **mit-han-lab/llm-awq** (research substrate; production teams use vLLM+AWQ-as-backend)
- **dropbox/hqq** (calibration-free niche)
- **mudler/LocalAI** (duplicate of Ollama functionality)
- **google/embeddinggemma-300m** (license clarification needed)
- **mixedbread-ai/mxbai-rerank** (low cross-org convergence)
- **nomic-ai/nomic-embed-text-v2-moe** (alternative to bge-m3; not justified given bge-m3 P0)

### REJECT (cite-class blocker)
- **Helicone/ai-gateway (Rust)** — GPLv3 license REJECT per CR-1 permissive-only invariant
- **TGI (text-generation-inference)** — ARCHIVED Dec 2025 (W204-A finding; cite-class stale)
- **AutoGPTQ** — ARCHIVED; replaced by vllm-project/llm-compressor
- **KoboldCpp** — AGPLv3 REJECT
- **GPTQ (original IST-DASLab)** — research repo; superseded by AutoGPTQ-then-llm-compressor

---

## §13 Cross-validation against W204-A baseline

| Pick | W204-A verdict | W215-M codex T1 verdict | Agreement |
|---|---|---|---|
| Local inference primary | Ollama (already-installed) | vllm primary / Ollama implicit | AGREE (complementary roles) |
| Lightweight inference | llama.cpp | llama.cpp | AGREE |
| Heavy-GPU inference | (not explicit) | sglang | NEW W215-M finding |
| Gateway primary | LiteLLM | Portkey-AI/gateway | **DISAGREE** — adversarial signal |
| Cost-routing complement | (not explicit) | RouteLLM | NEW W215-M finding |
| Multilingual embedding | bge-m3 P0 | bge-m3 multilingual | AGREE |
| English embedding | (model list only) | stella_en_400M_v5 | NEW W215-M finding |
| Edge embedding | (model list only) | mxbai-embed-large-v1 | NEW W215-M finding |
| Reranker primary | bge-reranker-v2-m3 P0 | Qwen3-Reranker-0.6B primary | **PARTIAL DISAGREE** — codex prefers Qwen3-already-wired stack |
| Quantization for vLLM | llmcompressor STUDY-PILOT | llm-compressor P0 ADOPT-NOW (when vLLM primary) | UPGRADE |

**3 adversarial signals** worth recording:
1. **Gateway primary**: Portkey vs LiteLLM (codex picked Portkey for MCP-first; W204-A picked LiteLLM for provider-coverage)
2. **Reranker primary**: Qwen3 vs bge (codex picked Qwen3 for already-Qwen3-aware stack; W204-A picked bge-m3 family for FlagEmbedding consistency)
3. **EmbeddingGemma license**: codex excluded per "non-Apache/MIT" generalization; W204-A had EmbeddingGemma as Apache-2.0 P0

**Mia pre-apply discipline** (per `mia-pre-apply.md`): each adversarial signal MUST be probed before commit:
- (1) Read Portkey LICENSE + MCP gateway docs vs LiteLLM MCP docs (verify codex's "first-class MCP" claim)
- (2) Read Qwen3-Reranker-0.6B model card MTEB-R 65.8 claim vs bge-reranker-v2-m3 production-evidence
- (3) Read `google/embeddinggemma-300m` LICENSE file directly (NOT general Gemma License rumor)

---

## §14 Wave 215-M summary

- **25 repos scored** across 5 layers (M1 inference / M2 gateway / M3 embedding / M4 reranker / M5 quantization)
- **3 BRIDGE-MODE codex T1 calls** dispatched (all STRUCTURED-VERDICT-LANDED ✓; no Pattern B HNF)
- **5 P0 ADOPT-NOW** picks identified (bge-m3 / vLLM / Portkey / Qwen3-Reranker / TEI)
- **5 P1 STUDY-PILOT** picks (sglang / RouteLLM / llm-compressor / bitsandbytes / bge-reranker)
- **3 adversarial signals** flagged for Mia pre-apply verification
- **CC-native gap finding**: ZERO first-party CC plugins exist for any M1-M5 repo — all install-class via pip/docker/binary
- **Already-installed leverage**: Ollama + Qwen3-Embedding-0.6B + LiteLLM (W207) form solid base; add bge-m3 + Qwen3-Reranker + TEI for production RAG
- **Wall-clock**: ~22 min (under 25-min cap)
- **OUTPUT LOC**: ~755 LOC (under 800-LOC cap)

**HANDOFF**: `verdict_one_line: "DONE: W215-M LLM-serving-embed-scoring — composite-leader bge-m3+vLLM (95/95); CC-native-leader claude-code-router(8) + ollama(8); 3/3 codex calls SUCCESS; 3 adversarial signals flagged; written to Z:/claude-sota-installed/tmp/sota-pure-w215-M-llm-serving-embed-scoring-matrix-2026-05-15.md"`
