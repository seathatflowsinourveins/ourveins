# LAYER-G — Vertical Domain Gaps (W259 Wave-3)

> **Wave-3 mandate**: prior W259 catalog (6,939 files / 98 repos / 23-dim master matrix) covered horizontal layers A-F (memory · orchestration · evals · browser · identity · knowledge). Vertical domains (voice, image, video, data-science, scraping, finance, healthcare, robotics, games, self-hosted serving) were UNPROBED. This file fills the gap.
>
> **Scope**: operator = single-dev with multi-MAX Claude accounts on Z:-portable Windows 11 runtime. NO production voice/video/robotics workload exists today. Most domains are T4 WATCH (catalog-only, no install) — exceptions called out below.
>
> **Date**: 2026-05-16. Sourced from GitHub repo metadata (stars/license/last-push) + 2026 vendor-neutral comparison articles (Exa) + arxiv reports (HunyuanVideo 1.5, X-VLA, Voyager). No Tier-1 Anthropic CC cite-anchors (verticals fall outside CC core surface).

---

## §0 — Vertical-Domain Landscape

| Domain | SOTA-mature? | Operator-relevance today | Disposition class |
|---|---|---|---|
| 1. Voice/Audio/TTS/STT | YES (Kokoro/Chatterbox/CosyVoice 2026) | LOW — no voice product | T4 WATCH (LiveKit/Whisper hooks if asked) |
| 2. Image generation | YES (ComfyUI dominant) | LOW-MED — useful for design demos | T4 WATCH + optional STUDY-PILOT (ComfyUI) |
| 3. Video generation | EMERGING (HunyuanVideo 1.5 + Wan 2.2 = consumer-tractable Nov 2025+) | LOW — research/demo only | T4 WATCH |
| 4. Data-science / text-to-SQL | YES (Vanna + PandasAI mature) | MED — if operator does data analytics arcs | T3 STUDY-PILOT candidate (Vanna) |
| 5. Web scraping for AI | YES (Crawl4AI + Firecrawl dominant) | **HIGH** — directly load-bearing for research/RAG arcs | **T1 INSTALL candidate (Crawl4AI MCP)** |
| 6. Financial / quant | YES (FinRL-X v1.0 Mar 2026 + FinGPT 19.8K stars) | LOW unless operator runs trading arcs | T4 WATCH |
| 7. Healthcare / scientific | YES (scispaCy + BioGPT mature) | LOW unless biomedical arcs | T4 WATCH |
| 8. Robotics / embodied | EMERGING-MATURE (LeRobot + OpenVLA + X-VLA Oct 2025) | NONE | T4 WATCH (no hardware) |
| 9. Game / simulation | NICHE (Voyager unmaintained since 2024) | NONE | T5 REJECT-FOR-OPERATOR (no Minecraft) |
| 10. Self-hosted LLM serving | YES (vLLM dominant + TGI maintenance-mode 2026) | **MED-HIGH** — Z:-portable favors local serving | **T2 ADJACENT INSTALL candidate (vLLM/LocalAI/MLX-LM)** |

**Key insight**: Of 10 verticals, only 3 are operator-relevant today: scraping (T1), self-hosted serving (T2), data-SQL (T3 STUDY-PILOT). The other 7 are T4 WATCH — repo-card entries in catalog, no install. This matches the W259 cardinal-rule-5 install-priority discipline.

---

## §1 — Voice / Audio / TTS / STT

### §1.1 Per-candidate table

| Repo | Stars | License | Last-push | Native-CC pathway | Op-fit |
|---|---|---|---|---|---|
| **livekit/agents** | 10.4K+ | Apache-2.0 | 2026-05-16 active | MCP plugin support documented | T4 WATCH — production framework |
| **m-bain/whisperX** | 21.4K | BSD-2 | active 2026 | Python lib; no native MCP | T4 WATCH |
| **SYSTRAN/faster-whisper** | (CTranslate2 backend) | MIT | active | wrapper-friendly | T4 WATCH — production STT default |
| **huggingface/distil-whisper** | (HF) | MIT | active | 6× faster, 49% smaller than Whisper | T4 WATCH |
| **hexgrad/kokoro** (82M params) | rising | Apache-2.0 | active | 28ms first-audio on RTX 5090 | T4 WATCH — TTS quality leader 2026 |
| **resemble-ai/chatterbox** | rising | MIT | active | voice cloning leader | T4 WATCH |
| **FunAudioLLM/CosyVoice** | (Alibaba) | Apache-2.0 | active | multilingual leader | T4 WATCH |
| **suno-ai/bark** | 38K+ | MIT (older) | stale 2024 | expressive but slow | T5 deprecate-track |
| **coqui-ai/TTS** | 38K+ | MPL-2.0 | archived 2024 | XTTS-v2 still used | T5 deprecate (project archived) |
| **myshell-ai/MeloTTS** | 5K+ | MIT | active | lightweight | T4 WATCH |
| **pyannote/pyannote-audio** | 7K+ | MIT | active 2026 | diarization standard | T4 WATCH |

### §1.2 Top-3
1. **livekit/agents** — production-grade voice-agent framework; MCP tool support; Apache-2.0; only candidate with claude-code-like MCP idiom.
2. **faster-whisper** + **distil-whisper** — STT default + 6× speedup variant; pairs with whisperX for diarization.
3. **kokoro (82M)** — fastest TTS at production quality 2026; supersedes Bark/Coqui for new builds.

### §1.3 Verdict
**T4 WATCH**. Operator has no voice product. If a voice arc fires: install LiveKit agents (MCP-compatible) + faster-whisper STT + kokoro TTS as the 2026 SOTA triplet. Voice cloning would add Chatterbox or CosyVoice.

---

## §2 — Image Generation / Vision

### §2.1 Per-candidate table

| Repo | Stars | License | Last-push | Native-CC pathway | Op-fit |
|---|---|---|---|---|---|
| **Comfy-Org/ComfyUI** | 112.4K | GPL-3.0 | 2026-05-11 active | API endpoints; no native MCP | T3 STUDY-PILOT if design arcs |
| **AUTOMATIC1111/stable-diffusion-webui** | 158K | AGPL-3.0 | 2026-03 (slowing) | extension API | T4 WATCH (lagging behind ComfyUI/Forge) |
| **lllyasviel/Fooocus** | 45K | GPL-3.0 | active | simple UI for beginners | T4 WATCH |
| **invoke-ai/InvokeAI** | 25K+ | Apache-2.0 | 2026-05-16 active | most permissive license; canvas | T4 WATCH |
| **huggingface/diffusers** | (HF) | Apache-2.0 | 2026-05-15 active | Python library — the substrate | T4 WATCH (foundation lib) |
| **NVlabs/Sana** | rising | Apache-2.0 | 2026-05-16 active | efficient DiT | T4 WATCH |
| **lllyasviel/stable-diffusion-webui-forge** | growing | AGPL | active 2026 | best VRAM efficiency 2026 | T4 WATCH — modern A1111 replacement |

### §2.2 Top-3
1. **ComfyUI** (Comfy-Org) — 112K stars, weekly releases, node-graph workflows are 2026 industry standard for image/video pipelines; supports Flux, Wan 2.1, HunyuanVideo first.
2. **InvokeAI** — Apache-2.0 (most permissive), canvas-based, professional UX.
3. **Forge** — best VRAM efficiency 2026 for newer SD/Flux models; AGPL.

### §2.3 Verdict
**T4 WATCH** for the operator's pure-text harness. **T3 STUDY-PILOT for ComfyUI** if any design-demo or visual-prompt arc fires — ComfyUI is the SOTA convergence point and integrates cleanly via REST API. Skip A1111 (slowing pace).

---

## §3 — Video Processing / Generation

### §3.1 Per-candidate table (Nov 2025+ consumer-tractable wave)

| Model/Repo | Params | Min VRAM | License | Quality | Op-fit |
|---|---|---|---|---|---|
| **HunyuanVideo 1.5** (Tencent) | 8.3B | ~14 GB (4090) | Tencent Community (geo-fenced EU/UK/KR) | SOTA open-source 2026; 720p in 75s distilled | T4 WATCH (license risk) |
| **Wan 2.2 TI2V-5B** | 5B | ~20-24 GB | Apache-2.0 | best 720p Apache 2.0 single checkpoint | T4 WATCH |
| **Wan 2.1 T2V-1.3B** | 1.3B | ~8 GB | Apache-2.0 | runs on 8GB cards | T4 WATCH |
| **genmo/mochi-1** | 10B | ~22 GB | Apache-2.0 | Apache fallback when Hunyuan license blocked | T4 WATCH |
| **AILab-CVC/VideoCrafter** | varies | (older) | non-commercial | research only | T5 REJECT |
| **NVlabs/Sana** | (image-focused but DiT) | Apache | rising | image core, video adjacent | T4 WATCH |
| **thu-ml/TurboDiffusion** | new Dec 2025 | varies | (rising) | 100-200× video diffusion acceleration | T4 WATCH (early) |

### §3.2 Top-3
1. **HunyuanVideo 1.5** — outright SOTA quality 2026; license geo-fence is the only catch.
2. **Wan 2.2 TI2V-5B** — best Apache-2.0 720p single checkpoint; Aliyun ecosystem.
3. **Mochi-1** — Apache-2.0 fallback when Hunyuan license blocked.

### §3.3 Verdict
**T4 WATCH**. Operator has no video product. If asked: ComfyUI is the unified entry point — supports all three video models as nodes. Mention HunyuanVideo 1.5 license geo-fence (excludes EU/UK/KR).

---

## §4 — Data Science / pandas-AI / Text-to-SQL

### §4.1 Per-candidate table

| Repo | Stars | License | Last-push | Native-CC pathway | Op-fit |
|---|---|---|---|---|---|
| **sinaptik-ai/pandas-ai** | 23.2K | MIT + EE | active 2026 | Python lib; MCP-friendly | T3 STUDY-PILOT |
| **vanna-ai/vanna** | 22.7K | MIT | active 2026 (v2.0) | RAG-based; web component | **T3 STUDY-PILOT (text-to-SQL leader)** |
| **eosphoros-ai/DB-GPT** | 16K | MIT | active | full platform; heavier | T4 WATCH |
| **Dataherald/dataherald** | 3.6K | Apache | active | agent-based | T4 WATCH |
| **defog-ai/sqlcoder** | 4K | (Defog) | active | model-only | T4 WATCH |
| **microsoft/lida** | (smaller) | MIT | slower | viz generator | T4 WATCH |
| **microsoft/data-formulator** | rising | MIT | active | viz | T4 WATCH |
| **dbt-labs/dbt-mcp** | new | Apache | active | MCP-native | T3 if data arcs |

### §4.2 Top-3
1. **vanna-ai/vanna** — 22.7K stars, v2.0 (2026) adds row-level security, user-aware agent, MIT license, RAG-based accuracy leader; pre-built `vanna-chat` web component; production-ready.
2. **pandas-ai (PandaAI)** — 23.2K stars, code-generation + SQL routing; smart pandas chat; MIT-licensed.
3. **DB-GPT** — full platform with schema-linking stage + 8 databases.

### §4.3 Verdict
**T3 STUDY-PILOT candidate for Vanna**. If operator does data analytics arcs (not currently confirmed), Vanna's MIT + Ollama + Postgres pathway is the lowest-friction install. PandasAI is library-tier complement. Skip DB-GPT (heavyweight platform).

---

## §5 — Web Scraping / Crawl Agents

### §5.1 Per-candidate table

| Repo | Stars | License | Last-push | Native-CC pathway | Op-fit |
|---|---|---|---|---|---|
| **unclecode/crawl4ai** | **65.5K** | Apache-2.0 | 2026-05-12 active | **MCP server INTEGRATED (Docker)** | **T1 INSTALL CANDIDATE** |
| **firecrawl/firecrawl** | 60K+ | AGPL-3.0 (self-host) / API | 2026-05-16 active | API + extract endpoint | T2 ADJACENT (paid API or self-host) |
| **ScrapeGraphAI/Scrapegraph-ai** | 16K | MIT | 2026-05-13 active | Python lib | T4 WATCH |
| **apify/crawlee** + **crawlee-python** | 18K combined | Apache | active | full Playwright stack | T4 WATCH |
| **Jina-AI Reader** (`r.jina.ai`) | — | hosted/Apache | active | URL-prefix idiom | T4 WATCH (single-page only) |
| **alirezamika/autoscraper** | 6K | MIT | stale | older | T5 deprecate |
| **scrapy/scrapy** | 53K | BSD-3 | active | classic Python scraper | T4 WATCH (non-AI) |

### §5.2 Top-3
1. **Crawl4AI (unclecode)** — 65.5K stars, **most-starred crawler on GitHub**; Apache-2.0; Docker setup with **MCP integration for Claude Code is in v0.8.5+**; LLM-ready markdown output; battle-tested.
2. **Firecrawl** — closest commercial-quality alternative; AGPL self-host fork; FIRE-1 navigation agent (autonomous captcha-solving); paid API otherwise.
3. **ScrapeGraphAI** — LLM-powered structured extraction (NL prompt → typed JSON); strong for one-off targeted tasks.

### §5.3 Verdict
**T1 INSTALL CANDIDATE: Crawl4AI MCP server**. This is the **only T1 install candidate in LAYER-G**. Rationale: 
- Native MCP integration (no glue code)
- Apache-2.0 (no AGPL friction)
- 65.5K stars = highest convergence
- LLM-friendly markdown output (ideal for RAG arcs)
- Operator already does heavy research-wave / cite-anchor crawling — directly load-bearing

This is the **operator-fit headline of LAYER-G**.

---

## §6 — Financial / Quant Agents

### §6.1 Per-candidate table

| Repo | Stars | License | Last-push | Native-CC pathway | Op-fit |
|---|---|---|---|---|---|
| **ai4finance-foundation/FinGPT** | 19.8K | MIT | 2026-04-24 active | Python lib; HF hub | T4 WATCH |
| **ai4finance-foundation/FinRL-Trading** (FinRL-X v1.0) | 3.1K | Apache-2.0 | 2026-05-02 active; v1.0 Mar 2026 | Pydantic + Alpaca | T4 WATCH |
| **TradingAgents-AI** (arxiv 2412.20138) | rising | — | active | multi-agent ReAct framework | T4 WATCH |
| **microsoft/qlib** | 18K | MIT | active | ML-focused, no DRL | T4 WATCH |
| **Quantopian/zipline** + **mementum/backtrader** | (legacy) | Apache | maintenance | backtesting | T4 WATCH |

### §6.2 Top-3
1. **FinGPT** — 19.8K stars, open-source financial LLM, MIT, broad NLP + sentiment + RAG variants.
2. **FinRL-X v1.0** (Mar 2026) — full-stack modular trading platform (ML + DRL + LLM-ready), Apache-2.0, Alpaca broker integration.
3. **TradingAgents** — multi-agent framework with Bull/Bear researchers + risk manager debate (interesting Anthropic-Claude-style design).

### §6.3 Verdict
**T4 WATCH**. Operator does not run trading arcs. If asked: FinRL-X is the SOTA convergence point as of Mar 2026 (combines FinRL DRL + FinGPT LLM under one Pydantic-based modular architecture).

---

## §7 — Healthcare / Scientific Agents

### §7.1 Per-candidate table

| Repo | Stars | License | Last-push | Op-fit |
|---|---|---|---|---|
| **microsoft/BioGPT** | 4.5K | MIT | stale 2024-07 | T4 WATCH |
| **allenai/scispacy** | 1.9K | Apache-2.0 | 2025-12 active | T4 WATCH (mature) |
| **msajitz/biomed-kg-agent** | 15 (small but Anthropic-Claude-native) | Apache-2.0 | 2026-03 | T4 WATCH — interesting ref-pattern |
| **stanford-crfm/BioMedLM** | (smaller) | various | varies | T4 WATCH |
| **anthropics/healthcare-skills** (mentioned in W259 catalog) | — | — | — | already in catalog |

### §7.2 Top-3
1. **scispaCy (AllenAI)** — production NER + entity linking for biomedical text; 78-84% F1 on standard corpora; pairs with UMLS.
2. **BioGPT (Microsoft)** — generative biomedical LLM; SOTA on PubMedQA (78.2% acc); stale since 2024 but still default.
3. **msajitz/biomed-kg-agent** — interesting reference pattern: PubMed → scispaCy → Neo4j → Claude agent with mandatory provenance (Anthropic-Claude-native).

### §7.3 Verdict
**T4 WATCH**. Operator does not run biomedical arcs. If asked: scispaCy + BioGPT + Claude-as-orchestrator is the proven pattern (msajitz/biomed-kg-agent is a small but architecturally-clean reference).

---

## §8 — Robotics + Embodied AI

### §8.1 Per-candidate table

| Repo | Stars | License | Last-push | Op-fit |
|---|---|---|---|---|
| **huggingface/lerobot** | (HF) growing | Apache-2.0 | active 2026 | T4 WATCH |
| **openvla/openvla** | rising | MIT | 2024 (stable but slowing) | T4 WATCH |
| **lerobot/xvla-base** (X-VLA Oct 2025 arxiv 2510.10274) | new | Apache-2.0 | 2025-12 | T4 WATCH — soft-prompted cross-embodiment |
| **commaai/openpilot** | (large) | MIT | active | self-driving; non-CC-relevant | T4 WATCH |
| **NVIDIA/Isaac-GR00T** | rising | NVIDIA license | active | humanoid VLA | T4 WATCH |

### §8.2 Top-3
1. **HuggingFace LeRobot** — the unifying SOTA-convergence platform for robotics in 2026; hosts X-VLA + Pi0 + π₀.5 models; Apache-2.0.
2. **OpenVLA-7B** — 970K Open-X trajectories pretraining; MIT; benchmark VLA baseline.
3. **X-VLA-base** (Oct 2025) — soft-prompted cross-embodiment Transformer; near-π₀ on LIBERO and Simpler-WidowX.

### §8.3 Verdict
**T4 WATCH**. Operator has no robot hardware. Catalog these as upstream cite-references for any future embodied-AI arc; no install rationale.

---

## §9 — Game / Simulation Agents

### §9.1 Per-candidate table

| Repo | Stars | License | Last-push | Op-fit |
|---|---|---|---|---|
| **MineDojo/Voyager** | 6.9K | MIT | **2024-04 stale** | T5 REJECT (unmaintained) |
| **MineDojo/MineDojo** | 2K+ | MIT | stale | T5 REJECT (unmaintained) |
| **OpenAI/Procgen** | (legacy) | MIT | archived | T5 REJECT |
| **NVIDIA/Eureka** | rising | various | active | T4 WATCH — LLM reward design |

### §9.2 Top-3
1. **Voyager** (MineDojo) — landmark 2023 paper (15.3× faster tech-tree progression vs prior SOTA); MIT; but **last push 2024-04 = unmaintained 13+ months**.
2. **Eureka** (NVIDIA) — LLM-based reward function design for RL; conceptually adjacent.
3. (nothing else mainline)

### §9.3 Verdict
**T5 REJECT-FOR-OPERATOR**. Voyager is academically influential but stale + Minecraft-specific. Operator runs no game arcs. Cite-reference only; do NOT install. **Surprise**: this was the only domain where the headline repo is *deprecated by neglect* despite being landmark research.

---

## §10 — Self-Hosted LLM Serving Frontiers

### §10.1 Per-candidate table

| Repo | Stars | License | Op-fit | Verdict |
|---|---|---|---|---|
| **vllm-project/vllm** | 35K+ | Apache-2.0 | **T2 ADJACENT INSTALL** | **production throughput king 2026** (V1 architecture, FP8 on H100, PagedAttention, dynamic multi-LoRA) |
| **huggingface/text-generation-inference (TGI)** | 9K+ | Apache-2.0 | T4 WATCH | maintenance-mode 2026 per benchmarks; single LoRA only |
| **mudler/LocalAI** | 35K+ | MIT | T3 STUDY-PILOT | universal OpenAI-compatible API hub; routes to vllm/llama.cpp/MLX; MCP-native endpoints |
| **ggerganov/llama.cpp** | 78K+ | MIT | T4 WATCH | substrate (GGUF backbone for Ollama et al) |
| **ollama/ollama** | 130K+ | MIT | (likely already used) | dev-friendly Ollama; not high-throughput |
| **ml-explore/mlx-lm** | (Apple) | MIT | T4 WATCH | Apple-Silicon only; not relevant on Z:-portable Windows |
| **Mozilla-Ocho/llamafile** | (rising) | Apache | T4 WATCH | single-executable portability; revived by Mozilla 2026 |
| **bentoml/openllm** | 10K+ | Apache | T4 WATCH | BentoML stack |
| **TabbyML/tabby** | 20K+ | Apache | T4 WATCH | code-assistant focused |
| **sgl-project/sglang** | 6K+ | Apache | T4 WATCH | structured-generation specialty |
| **vllm-project/vllm-omni** (new Sep 2025) | new | Apache | T4 WATCH | multimodal omni-inference |

### §10.2 Top-3
1. **vLLM** — production throughput king 2026, V1 architecture (Sep 2025+), FP8 on H100 = 2× capacity vs TGI, dynamic multi-LoRA, 300+ model architectures. Apache-2.0.
2. **LocalAI (mudler)** — universal OpenAI-compatible API hub; **native MCP endpoints** (`/mcp/v1/...`); routes to vllm/llama.cpp/MLX backends through one URL; ideal for orchestrator-mode runtimes.
3. **TGI** — Hugging Face stack, mature, Prometheus metrics, but maintenance-mode 2026 (slower feature churn than vLLM).

### §10.3 Verdict
**T2 ADJACENT INSTALL candidate (LocalAI)**. LocalAI's MCP-native endpoints + multi-backend routing fit the operator's Z:-portable + multi-MAX-Claude orchestrator-mode pattern. vLLM is overkill (no concurrent users) but is the throughput SOTA. MLX-LM rejected (Mac-only). 

**Surprise**: LocalAI's MCP integration (`/mcp/v1/...` endpoints since 2025) makes it the only self-hosted serving stack with native MCP — directly aligned with operator's plugin discipline (cardinal-rule-2).

---

## §11 — Convergence (Repos Spanning Multiple Verticals)

| Repo | Spans | Why convergent |
|---|---|---|
| **HuggingFace diffusers** | §2 image + §3 video + §1 audio (limited) | unified SOTA diffusion library; ComfyUI/InvokeAI all sit on top |
| **HuggingFace transformers** | §1 (Whisper/distil) + §4 (PandasAI LLM backend) + §7 (BioGPT/scispaCy adjacent) + §10 (TGI) | universal model substrate |
| **ComfyUI** | §2 image + §3 video + §1 audio (via custom nodes) | node-graph as universal media-generation orchestrator 2026; first to support Wan 2.1 / HunyuanVideo / Flux |
| **LocalAI (mudler)** | §1 audio + §2 image + §3 video + §10 LLM serving | "any model" universal OpenAI-compat hub with MCP endpoints |
| **livekit/agents** | §1 voice + adjacent §4/§5 (MCP tools) | voice + multimodal pipeline with MCP plug-in support |
| **vllm-project/vllm-omni** (Sep 2025+) | §1 audio + §2 image + §3 video + §10 serving | omni-modality serving — emerging convergence point for vllm ecosystem |
| **HuggingFace LeRobot** | §8 robotics + §1 audio (proprio) + §2 vision | unified embodied-AI platform 2026 |
| **fal-ai (mentioned in mandate)** | §1 + §2 + §3 (hosted API) | commercial multi-modal hub (not OSS, so out of scope here) |

**Key convergence insight**: **ComfyUI** and **LocalAI** are the two dominant cross-vertical convergence points in 2026. ComfyUI owns the *generation* pipeline (image/video/audio diffusion). LocalAI owns the *serving* pipeline (any model, any modality, OpenAI-compatible + MCP). vllm-omni is the emerging third convergence point.

---

## §12 — Operator-Fit Dispositions

### §12.1 By tier

**T1 INSTALL (1 candidate)**
- **Crawl4AI MCP** (§5) — load-bearing for operator's research arcs; native MCP; Apache-2.0; 65.5K stars

**T2 ADJACENT INSTALL (1 candidate)**
- **LocalAI** (§10) — MCP-native; multi-backend; multi-modal hub; ideal for Z:-portable + multi-MAX-Claude orchestrator pattern

**T3 STUDY-PILOT (2 candidates)**
- **Vanna 2.0** (§4) — text-to-SQL; install only if data-analytics arcs fire
- **ComfyUI** (§2) — image generation; install only if design-demo arcs fire

**T4 WATCH (everything else)**
- All voice (§1), most data-SQL alternatives, all video (§3), all finance (§6), all healthcare (§7), all robotics (§8), llama.cpp/TGI/vllm/sglang (§10 alternatives)

**T5 REJECT-FOR-OPERATOR**
- Voyager (§9) — landmark research but unmaintained since 2024-04; operator has no Minecraft arc
- MineDojo (§9) — stale 
- bark / coqui-TTS (§1) — superseded by Kokoro/Chatterbox/CosyVoice in 2026

### §12.2 Action items for next install wave

1. **Install Crawl4AI MCP server** — first item from LAYER-G to land. Docker setup; Apache-2.0; LLM-ready markdown; native MCP per cardinal-rule-2.
2. **Catalog (NOT install) LocalAI** — note MCP endpoints for future when local-LLM serving fires.
3. **Mark Voyager + Coqui-TTS + Bark as deprecate-track** — call out in W259 catalog `pace_phase: dying` rows.

### §12.3 Surprises

- **LAYER-G converged unexpectedly**: only 1 T1 INSTALL candidate (Crawl4AI) out of 10 verticals. The W259 hypothesis "most verticals = T4 WATCH" held with one strong exception: scraping. Operator already does heavy upstream-research crawling, and Crawl4AI shipped MCP integration in v0.8.x. This is the **single most operator-relevant repo not yet on the install manifest**.
- **LocalAI quietly became the universal MCP-native serving hub** in 2025 — most coverage focuses on vLLM throughput, but LocalAI's `/mcp/v1/...` endpoints + multi-modal multi-backend make it a stronger fit for orchestrator-mode runtimes than the dominant attention given to Ollama/vLLM suggests.
- **ComfyUI is the unsung convergence king of generative AI 2026** — owns image + video + (increasingly) audio diffusion pipelines; gets new model support weeks ahead of other UIs; 112K stars. Not operator-relevant today, but is the *only* tool the operator would need if a multi-modal demo arc fires.
- **Voyager (game agents) — landmark paper, dead repo** — published a 2024 TMLR paper, 6.9K stars, but unmaintained 13+ months. Reminds that academic-influential ≠ install-worthy. The W259 install-priority discipline correctly excludes this class.
- **HunyuanVideo 1.5 (Tencent, Nov 2025) collapsed video generation VRAM** — from 45 GB → 14 GB on a 4090, matching Sora-class quality. The vertical jumped from "research-only" to "consumer-tractable" within 6 months. Watch this domain closely; T4 → T3 status could shift mid-2026.

---

## §13 — Cross-References

- **LAYER-A** (memory/RAG) — Crawl4AI feeds RAG corpora; LocalAI hosts embedding models. Direct hand-off.
- **LAYER-B** (orchestration/multi-agent) — LiveKit-agents framework is voice-vertical orchestration; TradingAgents (§6) is multi-agent ReAct.
- **LAYER-C** (evals/obs/serving) — vLLM/TGI/LocalAI = §10 here; phoenix/langfuse cited in LAYER-C catalog rows.
- **LAYER-D** (browser/codeintel/sandbox) — Crawl4AI is the LLM-aware sibling to LAYER-D's browser stack.
- **LAYER-F** (knowledge/wiki/context) — scispaCy/BioGPT (§7) is biomedical specialization of LAYER-F's knowledge surface.

---

## §14 — Methodology

- **Repo metadata sources**: `mcp__plugin_everything-claude-code_github__search_repositories` for stars/license/last-push (rate-limited at ~7 calls; remainder via Exa).
- **Vendor-neutral 2026 comparisons**: `mcp__plugin_everything-claude-code_exa__web_search_exa` for cross-vertical SOTA articles.
- **Quality probes (limited)**: deferred deepwiki ask_question due to time budget; key repos already covered by 2026 comparison articles.
- **Date verification**: most stars/last-push captured 2026-05-16; mature repos cross-checked against multi-source 2026 articles.
- **Out-of-scope**: voicevox, ESPnet, SpeechBrain (§1); Goldman Sachs trading repos (§6 — no open-source presence found); RT-2-replicate, Tesla openpilot (§8 — non-CC-relevant); deeper Wan 2.6 / LTX-2 details (§3 — covered at summary level).

---

*End LAYER-G W259v3 — Wave-3 deliverable. Next wave: cross-LAYER convergence digest + install-manifest update with Crawl4AI MCP entry.*
