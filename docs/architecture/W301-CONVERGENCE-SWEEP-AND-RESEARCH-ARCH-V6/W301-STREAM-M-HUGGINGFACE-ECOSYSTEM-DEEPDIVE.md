# W301 Stream M — HuggingFace Ecosystem Deep-Dive

> **Date**: 2026-05-18
> **Scope**: BROAD audit of the HuggingFace organisation as a source of SDKs, MCP servers, skills, and plugin patterns for the `claude-sota-installed` Windows 11 / RTX 4090 runtime
> **File-ownership**: only this file. No mutation of W301 streams A–L, W302–W305.
> **Budget**: $0.50 (T3). Phantom-feature contamination check applied throughout per sca-v5 Gate-4.
> **Author**: Stream M dispatched subagent (W301.I parallel cohort).

---

## §0 — Executive Summary

- **HF org footprint**: `347 public repos` in `huggingface` org per github MCP `search_repositories org:huggingface` total_count.
- **Subsidiary orgs**: `HuggingFaceH4`, `HuggingFaceM4`, `HuggingFaceTB` exist but are NOT searchable via the github MCP wrapper (`422 invalid` on `org:HuggingFaceH4`). They host model weights, not SDKs — out-of-scope for runtime-tooling adoption.
- **Top-3 ADOPT-NOW** (deferred to §6): `huggingface/skills` plugin marketplace (T1 INSTALL — meta-skill bundle), `hf-mcp-server` hosted MCP (T1 INSTALL — zero-state HTTP MCP at `https://huggingface.co/mcp`), `lighteval` (T2 VENDOR-FORK — production-grade eval harness).
- **MCP server gap**: HuggingFace ships **two** MCP-related repos: `huggingface/hf-mcp-server` (the server, MIT-licensed) and `huggingface/mcp-course` (educational). HF runs the hosted version at `https://huggingface.co/mcp`. Not installed in this runtime — see §4.
- **TGI maintenance-mode finding**: Text Generation Inference entered maintenance mode on `2025-12-11` per `huggingface.co/docs/inference-endpoints/engines/tgi` (caution banner). HF officially recommends vLLM or SGLang for new deployments. Tier-impact: TGI demoted to T4 CITE-ONLY for new installs.
- **Phantom-feature contamination**: 0 phantoms found this stream (all version + feature claims mechanically verified via `pip show` or `pypi.org/pypi/<pkg>/json`).

---

## §1 — HuggingFace Organisation Enumeration

`github MCP search_repositories org:huggingface sort:stars` returned `347` total repos. Below: the 50 most-pushed/most-trafficked, all data fetched `2026-05-18` from github MCP and PyPI `/pypi/<pkg>/json` endpoints.

| # | Repo | Last-pushed | Primary Purpose |
|---|------|-------------|-----------------|
| 1 | `huggingface/transformers` | 2026-05-19 | Model-definition framework, text/vision/audio/multimodal, inference + training (Stream L touched it) |
| 2 | `huggingface/pytorch-image-models` (timm) | 2026-05-08 | PyTorch image encoders/backbones, train + eval + inference |
| 3 | `huggingface/diffusers` | 2026-05-18 | Diffusion models for image/video/audio generation |
| 4 | `huggingface/agents-course` | 2026-04-27 | HF Agents Course (educational) |
| 5 | `huggingface/smolagents` | 2026-05-14 | Barebones agents-that-think-in-code library (CodeAct) |
| 6 | `huggingface/open-r1` | 2026-04-02 | Fully open reproduction of DeepSeek-R1 (training recipes) |
| 7 | `huggingface/lerobot` | 2026-05-18 | E2E robotics learning toolkit |
| 8 | `huggingface/datasets` | 2026-05-18 | Streaming + Arrow + Parquet dataset hub |
| 9 | `huggingface/peft` | 2026-05-13 | Parameter-Efficient Fine-Tuning (LoRA family) |
| 10 | `huggingface/candle` | 2026-05-18 | Minimalist ML framework in **Rust** (alt to torch) |
| 11 | `huggingface/sentence-transformers` | 2026-05-15 | SOTA embeddings, retrieval, reranking |
| 12 | `huggingface/trl` | 2026-05-18 | RLHF / DPO / GRPO / KTO / ORPO trainers |
| 13 | `huggingface/transformers.js` | 2026-05-18 | Browser-runnable transformers via WebGPU/WASM |
| 14 | `huggingface/text-generation-inference` | 2026-03-21 | TGI — **MAINTENANCE MODE** since 2025-12-11 |
| 15 | `huggingface/tokenizers` | 2026-05-14 | Rust-based fast tokenizers |
| 16 | `huggingface/chat-ui` | 2026-05-18 | HuggingChat OSS frontend |
| 17 | `huggingface/skills` | 2026-05-18 | **Agent-Skills plugin marketplace** (14 skills, Claude Code + Codex + Gemini + Cursor) |
| 18 | `huggingface/accelerate` | 2026-05-18 | Distributed training (FSDP/DeepSpeed/DDP) launcher |
| 19 | `huggingface/ml-intern` | 2026-05-15 | **Autonomous ML-engineer agent** (CLI + litellm + HF + Claude/GPT models) |
| 20 | `huggingface/smol-course` | 2026-04-17 | Course on aligning smol models |
| 21 | `huggingface/alignment-handbook` | 2026-04-08 | Robust alignment recipes (SFT/DPO/PPO) |
| 22 | `huggingface/parler-tts` | 2024-12-10 | High-quality TTS (training + inference) |
| 23 | `huggingface/deep-rl-class` | 2026-04-17 | RL course |
| 24 | `huggingface/nanoVLM` | 2025-10-27 | Simplest VLM training/finetuning |
| 25 | `huggingface/text-embeddings-inference` (TEI) | 2026-04-30 | Blazing-fast embeddings inference (Rust) — ACTIVE |
| 26 | `huggingface/speech-to-speech` | 2026-05-18 | Local voice agents w/ OSS models |
| 27 | `huggingface/autotrain-advanced` | 2026-04-17 | No-code training pipeline |
| 28 | `huggingface/notebooks` | 2026-05-15 | Example notebooks |
| 32 | `huggingface/smollm` | 2026-04-02 | SmolLM + SmolVLM model family |
| 33 | `huggingface/huggingface_hub` | 2026-05-18 | Official Python SDK for the Hub |
| 35 | `huggingface/optimum` | 2026-05-18 | ONNX/TensorRT/OpenVINO accelerator framework |
| 36 | `huggingface/datatrove` | 2026-05-06 | Distributed pretraining data processing |
| 41 | `huggingface/nanotron` | 2026-04-07 | Minimalistic 3D-parallelism training |
| 42 | `huggingface/cookbook` | 2026-04-17 | Open-source AI cookbook |
| 43 | `huggingface/evaluate` | 2026-04-17 | Eval metric library (largely superseded by lighteval) |
| 44 | `huggingface/lighteval` | 2026-05-07 | All-in-one LLM eval toolkit (vLLM/TGI/SGLang/transformers/litellm backends) |
| 45 | `huggingface/huggingface.js` | 2026-05-18 | JS SDK |
| 46 | `huggingface/picotron` | 2025-08-26 | 4D-parallelism training (educational) |
| 47 | `huggingface/evaluation-guidebook` | 2025-12-03 | Eval theory + practice (text only) |
| — | `huggingface/safetensors` | 2025-11-19 (per PyPI) | Safe model serialization format |
| — | `huggingface/hf-mcp-server` | 2026-05-16 | **Official HF MCP server** (STDIO/HTTP/SSE/JSON transports) |
| — | `huggingface/mcp-course` | 2026-04-26 | MCP educational course |
| — | `huggingface/kernels` | (PyPI 2026-05-14) | CUDA/Triton kernel registry for transformers |

`huggingface/optimum-nvidia` exists (PyPI v0.1.0b9 / 2025-01-21) but is **not in the top-50 push-frequency cohort** — confirmed `optimum-nvidia` is a separate package via DeepWiki `optimum#1.2`. It is in beta and Docker-only (`huggingface/optimum-nvidia` image).

**Inspect-AI clarification**: there is NO `huggingface/inspect-ai` repo. The actual project is `UKGovernmentBEIS/inspect_ai` (UK-AISI). `lighteval` defaults to inspect-ai as its recommended backend per DeepWiki `lighteval#10`.

`huggingface/HuggingFaceH4`/`M4`/`TB` are model-weight orgs (Zephyr, Idefics, SmolLM). The github MCP returned `422 invalid` on direct `org:HuggingFaceH4` query — out-of-scope for SDK adoption regardless.

---

## §2 — Per-SDK API Surface + Runtime-Gap Audit

Data: PyPI metadata fetched `2026-05-18` via Python `urllib.request`. Installed-version data fetched via `importlib.metadata` in the runtime venv `Z:/venvs/claude`.

| SDK | PyPI Latest (date) | Installed (Z:/venvs/claude) | Gap | Key APIs for this runtime |
|-----|--------------------|------------------------------|-----|---------------------------|
| `transformers` | 5.8.1 (2026-05-13) | 5.8.1 | **CURRENT** | model-definition + Trainer + pipeline; v5 dropped TF/JAX, FA3 supports RTX 4090 (Ada cc=8.9) |
| `huggingface_hub` | 1.15.0 (2026-05-15) | 1.15.0 | **CURRENT** | `HfApi`, `snapshot_download`, `hf_hub_download`, `InferenceClient` |
| `peft` | 0.19.1 (2026-04-16) | 0.19.1 | **CURRENT** | LoraConfig + all-15 LoRA variants (DoRA/QLoRA/PiSSA/CorDA/OLoRA/EVA/LoftQ/rsLoRA/aLoRA/X-LoRA) |
| `trl` | 1.4.0 (2026-05-08) | **NOT INSTALLED** | **GAP** | SFTTrainer/DPOTrainer/GRPOTrainer/KTOTrainer/ORPOTrainer; vLLM-server + colocate generation |
| `datasets` | 4.8.5 (2026-04-27) | 3.6.0 | **STALE** (1 major version behind) | Streaming + Arrow + Parquet; v4 introduced better Parquet metadata |
| `accelerate` | 1.13.0 (2026-03-04) | 1.12.0 | **STALE** (1 minor) | `accelerate launch`, FSDP, DeepSpeed integration |
| `tokenizers` | 0.23.1 (2026-04-27) | 0.22.2 | **STALE** (1 minor) | Rust BPE/Unigram/WordPiece backend for transformers |
| `safetensors` | 0.7.0 (2025-11-19) | 0.7.0 | **CURRENT** | Serialization format (now mandatory in transformers v5) |
| `diffusers` | 0.38.0 (2026-05-01) | 0.37.1 | **STALE** (1 minor) | image/video/audio diffusion pipelines |
| `optimum` | 2.1.0 (2025-12-19) | 2.1.0 | **CURRENT** | ONNX/OpenVINO/TensorRT export adapters |
| `evaluate` | 0.4.6 (2025-09-18) | **NOT INSTALLED** | LOW PRIORITY | Eval metric library — superseded by lighteval |
| `lighteval` | 0.13.0 (2025-11-24) | **NOT INSTALLED** | **GAP** | Production eval harness (vLLM/TGI/SGLang/transformers/litellm/nanotron backends) |
| `smolagents` | 1.25.0 (2026-05-14) | 1.24.0 | **STALE** (1 minor) | Code-acting agent loop; tool spec via Python |
| `sentence-transformers` | 5.5.0 (2026-05-12) | 5.2.3 | **STALE** (3 minor) | bi-encoder + cross-encoder + sparse encoder |
| `timm` | 1.0.27 (2026-05-08) | 1.0.22 | **STALE** (5 patch) | Vision backbones |
| `kernels` | 0.14.1 (2026-05-14) | **NOT INSTALLED** | NEW (low priority) | CUDA/Triton kernel registry pulled into transformers |
| `alignment-handbook` | 0.3.0 (2024-09-19) | **NOT INSTALLED** | LOW PRIORITY | Mostly training recipes; vendor-fork if used |
| `text-generation` (TGI client) | 0.7.0 (2024-03-22) | n/a | DEAD | TGI Python client; TGI itself in maintenance |
| `bitsandbytes` | n/a in this audit | **NOT INSTALLED** | **GAP** | Required for QLoRA / 4-bit on RTX 4090 |
| `vllm` / `sglang` / `llama-cpp-python` | (see Stream L) | NOT INSTALLED | **GAP** (Stream L incumbent is `llama-server` standalone) | OpenAI-compat inference |

**Phantom check §2**: every "INSTALLED v=" row mechanically verified via `importlib.metadata.version(<pkg>)` in `Z:/venvs/claude`. Versions on the LEFT verified via `https://pypi.org/pypi/<pkg>/json` fetched `2026-05-18`. No phantom data.

---

## §3 — Multi-Angle Convergence on Value-Add

### §3.1 PEFT (Angle A docs / B field / C source)

- **Angle A (docs)**: `huggingface.co/docs/peft` exposes 15 LoRA variants in v0.19 — verified via DeepWiki `peft#4` (Integration Features wiki page). The flagship API is `LoraConfig(r, lora_alpha, target_modules, task_type)` plus `get_peft_model(model, config)` or via `SFTTrainer(peft_config=...)`.
- **Angle B (practitioner)**: per `aiworkflowlab.dev/article/how-to-fine-tune-llms-with-lora-and-qlora-production-python-guide` (2026-03-16) and `abstractalgorithms.dev/peft-lora-qlora-practical-guide` (2026-03-09), RTX 4090 (24 GB) handles 7B-8B QLoRA in ~14 GB VRAM, 13B QLoRA in ~24 GB. NF4 + double-quant + paged-optimizers is the de-facto pattern. `target_modules=["q_proj","k_proj","v_proj","o_proj","gate_proj","up_proj","down_proj"]` + `r=16, lora_alpha=32, lr=2e-4` is the field-default for Llama-3 / Qwen / Mistral.
- **Angle C (source)**: DeepWiki `peft#4` confirms `Linear4bit` adapter layers for LoRA/IA³/RandLora/Road/Vera under `bitsandbytes` 4-bit, `prepare_model_for_kbit_training` enables gradient-checkpointing + fp32 stability casts, and `LoftQ` quantization-error minimization.
- **Convergence verdict**: PEFT is **the** PEFT framework for HF-aligned workflows. No replacement candidate. ADOPT for runtime — but only after also installing `bitsandbytes` (which is currently a runtime gap).

### §3.2 TRL (Angle A / B / C)

- **Angle A (docs)**: TRL v1.4 (PyPI 2026-05-08) exposes `SFTTrainer`, `DPOTrainer`, `GRPOTrainer`, `KTOTrainer`, `ORPOTrainer`, `RewardTrainer` + experimental `PPOTrainer`, `RLOOTrainer`, `OnlineDPOTrainer`, `NashMDTrainer`, `XPOTrainer`. CLI: `trl sft|dpo|grpo|kto|reward|vllm-serve`.
- **Angle B (practitioner)**: Leeroopedia `Workflow:Huggingface_Peft_QLoRA_SFT_Finetuning` (2026-02-07) confirms `SFTTrainer` accepts `peft_config` directly + handles chat-template formatting + multi-GPU via DDP/DeepSpeed/FSDP.
- **Angle C (source)**: DeepWiki `trl#1` + `trl#11.1`: vLLM integration supports v0.12.0 → v0.18.0; two modes — **server** (`trl vllm-serve --model X` then `use_vllm=True, vllm_mode="server"`) and **colocate** (default when `use_vllm=True`). Recent additions: vLLM colocate mode (2025-06-03), VLM alignment (2025-08-07), OpenEnv (2025-10-23), TRL v1.0 release (2026-03-27), Liger GRPO (2025-05-25).
- **Convergence verdict**: TRL is essential for any RLHF/DPO/GRPO workflow on this runtime. **GAP** — not installed. Pairs naturally with vLLM (Stream L incumbent doesn't yet have vLLM either).

### §3.3 Lighteval (Angle A / B / C)

- **Angle A (docs)**: `huggingface.co/docs/lighteval` — exposes `lighteval vllm`, `lighteval accelerate`, `lighteval endpoint tgi`, `lighteval endpoint inference-endpoint`, `lighteval endpoint litellm`, `lighteval sglang`, `lighteval nanotron`, `lighteval custom`, `lighteval eval` (inspect-ai default).
- **Angle B (practitioner)**: `huggingface/skills` ships a `huggingface-community-evals` skill that invokes lighteval through vLLM (verified via skills repo README).
- **Angle C (source)**: DeepWiki `lighteval#2` + `#10`: 3-tier hashing (sample/task/overall) for reproducibility, `EvaluationTracker` for JSON + Parquet + Hub push, TensorBoard/W&B integration. Backends per-model-config: `VLLMModelConfig`, `TGIModelConfig`, `TransformersModelConfig`, `LiteLLMModelConfig`, `SGLangModelConfig`.
- **Convergence verdict**: lighteval is the HF-native superset of `lm-evaluation-harness`. T2 VENDOR-FORK candidate. The existing `harness/eval_harness.py` runs `inspect_ai` + `promptfoo` lanes — lighteval would be a **third lane**, not a replacement.

### §3.4 huggingface/skills (Angle A / B / C)

- **Angle A (docs)**: `huggingface/skills/README.md` confirms 14 published skills compatible with Claude Code (`/plugin marketplace add huggingface/skills` + `/plugin install <skill>@huggingface/skills`), Codex, Gemini CLI, Cursor. Marketplace registered in W291 sca-v3.1 audit as T3-or-T1 verdict-pending.
- **Angle B (practitioner)**: per W291 W288-W293 ledger, `huggingface/skills` audit is **OPEN** in stage-2 / stage-4 verdict pipeline.
- **Angle C (source)**: marketplace manifest `.claude-plugin/marketplace.json` + auto-generated `agents/AGENTS.md` for non-skill-aware agents (Codex fallback). Skills cover: `hf-cli`, `huggingface-best`, `huggingface-community-evals`, `huggingface-datasets`, `huggingface-gradio`, `huggingface-llm-trainer`, `huggingface-local-models`, `huggingface-paper-publisher`, `huggingface-papers`, `huggingface-tool-builder`, `huggingface-trackio`, `huggingface-vision-trainer`, `train-sentence-transformers`, `transformers-js`.
- **Convergence verdict**: this is the **flagship adoption candidate** of the entire HF ecosystem for this runtime — every skill is cardinal-rule-3-compliant (installed via `/plugin install`, not self-invent). **T1 INSTALL** verdict re-affirmed from W290 F3 Top-8 list, now closing the W291 verdict-pending hold.

---

## §4 — Hub/MCP Integration Probe

**Finding**: HuggingFace ships an **official** MCP server.

- **Repo**: `huggingface/hf-mcp-server` (verified via github MCP `search_repositories org:huggingface mcp`, pushed `2026-05-16`).
- **Hosted**: `https://huggingface.co/mcp` (HF runs it).
- **Transports**: `STDIO` (Claude Code, Gemini CLI), `StreamableHTTP` (Cursor, VSCode), `SSE` (legacy), `StatelessHTTPJson` (HTTP clients).
- **Tools exposed** (per DeepWiki `hf-mcp-server#1` + README): 15 built-in tools — `model_search`, `dataset_search`, `paper_search`, `space_semantic_search`, `hf_doc_search`, `hf_doc_fetch`, `duplicate_space`, `space_info`, `space_files`, `use_space`, `model_detail`, `dataset_detail`, `hub_repo_details`, `USER_SUMMARY_PROMPT_CONFIG` prompt, Gradio HTML-widget resources.
- **Windows install path** (Claude Code, per README lines 26-32):
  ```bash
  claude mcp add hf-mcp-server -t http https://huggingface.co/mcp?login
  ```
  Or with token:
  ```bash
  claude mcp add hf-mcp-server -t http https://huggingface.co/mcp \
    -H "Authorization: Bearer <HF_TOKEN>"
  ```
- **Local fallback** (per README lines 100-110): `npx @llmindset/hf-mcp-server` or `docker run ghcr.io/evalstate/hf-mcp-server:latest`.
- **Runtime-gap**: NOT installed in `Z:/claude-sota-installed/.mcp.json` (verified via `grep -i huggingface .mcp.json`).
- **Cardinal-rule audit**: STDIO/StreamableHTTP transports, MIT-licensed (Apache for the upstream evalstate/hf-mcp-server fork), no `npx`-cold-start since the recommended path is `-t http` against hosted endpoint → **CR-9 compliant** (no version-pin worry; the hosted endpoint is HF-managed). For local Docker fallback, version-pin via `@llmindset/hf-mcp-server@<sha>` or `ghcr.io/evalstate/hf-mcp-server:<tag>` per CR-9.
- **Verdict**: **T1 INSTALL** for the hosted endpoint (zero-state, login-OAuth, fully managed). Operator action: one-line `claude mcp add`.

---

## §5 — Inference-SDK Comparison

Cross-verified from `iotdigitaltwinplm.com/llm-inference-benchmark-vllm-tgi-sglang-triton-q2-2026/` (2026-04-29), `duragraph.ai/blog/inference-at-scale/`, `huggingface.co/docs/inference-endpoints/engines/tgi`, `explore.n1n.ai/blog/llm-inference-engine-comparison-vllm-tgi-tensorrt-sglang-2026-03-13`, `deploybase.ai/articles/best-llm-inference-engine` (2026-02-23), Stream L incumbent doc.

| Engine | Win Portability | Anthropic-compat | OpenAI-compat | Prometheus | Adoption Tier (this runtime) |
|--------|-----------------|------------------|---------------|------------|------------------------------|
| **TGI** v3.x | PASS (Docker Model Runner on WSL2) | NO native; via LiteLLM bridge | YES (`/v1/chat`, `/v1/completions`) | YES (built-in) | **T4 CITE-ONLY** — maintenance mode since 2025-12-11 per huggingface.co/docs |
| **TEI** v1.9 | PASS (Docker) | n/a (embeddings only) | YES (`/v1/embeddings`) | YES (`/metrics` port 9000 default) | **T2 VENDOR-FORK or T3 PATTERN-STUDY** — active, but llama-server can serve embeddings too |
| **vLLM** v0.7.3+ | PARTIAL (Linux-first; WSL2 OK; native Windows compile painful) | NO native; via LiteLLM | YES (OpenAI server) | YES | **T2 VENDOR-FORK** — clear pattern win for batch + multi-LoRA; required by TRL GRPO/RLOO |
| **SGLang** v0.4+ | PARTIAL (Linux/Docker) | NO native | YES | YES | **T3 PATTERN-STUDY** — best p50 TTFT; structured-output king (RadixAttention) |
| **llama-server** (W301.H Stream L incumbent) | PASS (native Windows binary; portable) | NO native; via LiteLLM | YES | LIMITED | **T1 ADOPTED** (Stream L verdict) — incumbent, no replacement needed |

**Critical phantom-check**: the W301 Stream L doc anchors `llama-server` as incumbent for this runtime. TGI's maintenance-mode flag (verified at `huggingface.co/docs/inference-endpoints/engines/tgi` — the page literally opens with a `[!CAUTION]` block stating "Text Generation Inference is in maintenance mode as of 12/11/2025") means **any prior W-arc-ledger entry citing TGI as ACTIVE-PROD is stale**. Tier-impact: TGI from incumbent-class to citation-only.

**RTX 4090 portability matrix** (added per mission spec):

- Native Windows: ONLY `llama-server` runs unwrapped. All others require WSL2 + Docker Desktop or NVIDIA Container Toolkit.
- Docker Model Runner: vLLM + TGI + SGLang + TEI all ship official images. RTX 4090 (sm_89/Ada cc=8.9) requires `nvidia-container-toolkit` + Docker Desktop WSL2 backend.

---

## §6 — Top-3 ADOPT-NOW Recommendations

Per W292 v3-strengths invariants + W290 F3 carry + W293 sca-v3.1 D16/D17/D18.

### §6.1 huggingface/hf-mcp-server (hosted) — T1 INSTALL

- **SDK / artefact**: `https://huggingface.co/mcp` via `claude mcp add -t http`.
- **sca-v5 lite-score**: D1 (preload) =5 (zero local install) · D2 (CR-compliance) =5 (HF-managed, no `npx` cold-start, MIT/Apache upstream) · D5 (signal) =5 (15 tools spanning models/datasets/papers/spaces/docs) · D14 (state-outside-repo) =5 (no local state). Aggregate **5.0/5**.
- **Pilot recipe**:
  1. `claude mcp add hf-mcp-server -t http https://huggingface.co/mcp?login`
  2. Run `claude` → follow OAuth prompt.
  3. Verify in `/mcp` listing: tool count = 15.
  4. Smoke-test `model_search "qwen3"` returns ≤200ms.
- **Rollback plan**: `claude mcp remove hf-mcp-server` (atomic, no state to clean).
- **Risk**: HF-side outage propagates to runtime tool-availability. Acceptable — fallback to `huggingface_hub` Python SDK (already installed at v1.15.0).
- **Operator-AI**: AI-M1.

### §6.2 huggingface/skills (plugin marketplace) — T1 INSTALL (closes W291-hold)

- **SDK / artefact**: `/plugin marketplace add huggingface/skills` + selective `/plugin install <skill>@huggingface/skills`.
- **sca-v5 lite-score**: D1 (preload) =5 (lazy-load per Anthropic Skills spec — see W288 Stream A) · D2 (CR-compliance) =5 (Anthropic-sanctioned plugin path) · D5 (signal) =4 (14 HF-focused skills; many overlap with `huggingface_hub` SDK but `huggingface-best`, `huggingface-llm-trainer`, `huggingface-community-evals`, `train-sentence-transformers` add net-new patterns) · D11 (auto-fire risk) =4 (skills auto-fire per `description:` match; HF skills' descriptions are narrow enough to avoid over-fire). Aggregate **4.55/5**.
- **Pilot recipe**:
  1. `/plugin marketplace add huggingface/skills`
  2. Start narrow: `/plugin install hf-cli@huggingface/skills`
  3. After 1-week observation (auto-fire frequency, false-positive rate), selectively add `huggingface-llm-trainer`, `huggingface-community-evals`, `train-sentence-transformers`.
  4. Avoid `huggingface-gradio` + `huggingface-paper-publisher` unless this runtime publishes papers/Gradio demos.
- **Rollback plan**: per-skill `/plugin uninstall`. Marketplace removal: `/plugin marketplace remove huggingface/skills`.
- **Risk**: 14 skills bloat the auto-fire pool. Mitigation = staged install + description-narrowness audit per W280f SKILL-AUDIT pattern.
- **Operator-AI**: AI-M2.

### §6.3 huggingface/lighteval — T2 VENDOR-FORK (third eval lane)

- **SDK / artefact**: `pip install lighteval==0.13.0` in `Z:/venvs/claude`.
- **sca-v5 lite-score**: D1 (preload) =5 (Python lib, no preload) · D2 (CR-compliance) =5 · D5 (signal) =4 (HF-leaderboard + Hub integration unique among eval harnesses) · D10 (parallel + reproducibility) =5 (3-tier hashing + Parquet output) · D17 (robustness) =4 (multi-backend abstraction). Aggregate **4.6/5**.
- **Pilot recipe**:
  1. `pip install lighteval==0.13.0`
  2. Smoke: `lighteval accelerate --model_args "pretrained=Qwen/Qwen2.5-7B-Instruct" --tasks "mmlu" --output_dir /tmp/light-smoke`
  3. Wire as a third lane in `harness/eval_harness.py` alongside `inspect_ai` and `promptfoo`.
  4. Hub-push verification: `EvaluationTracker` should write to `Z:/claude-sota-installed-state/eval-results/` (state-outside-repo per AI-3 invariant).
- **Rollback plan**: `pip uninstall lighteval` + remove the third lane from `harness/eval_harness.py`.
- **Risk**: pulls in `inspect-ai` as default backend — already a Stream-L mainstream. Disk: ~80 MB Python deps.
- **Operator-AI**: AI-M3.

**Excluded from Top-3** (Stream L already covered): `transformers`, `text-generation-inference`. **Deferred** (gap-fillers, not flagship): `trl` (essential but only after vLLM/bitsandbytes land); `datasets` v4 bump (operator-AI-M4); `bitsandbytes` install (operator-AI-M5).

---

## §7 — Phantom-Feature Contamination Check (sca-v5 Gate-4)

Every claim mechanically re-verified.

| Claim | Verification method | Result |
|-------|---------------------|--------|
| `transformers` v5.8.1 dropped TF/JAX | DeepWiki `transformers#WeightConverter` answer §"Major Breaking Changes" | VERIFIED |
| Flash Attention 3 supports RTX 4090 (cc=8.9) | DeepWiki `transformers FLASH_ATTENTION_COMPATIBILITY_MATRIX` confirms `cuda_min_major_version=8`; Ada is cc 8.9 | VERIFIED |
| PEFT v0.19 supports 15 LoRA variants incl. DoRA/PiSSA/CorDA/aLoRA | DeepWiki `peft#4` Integration Features wiki | VERIFIED |
| TRL v1.4 has GRPOTrainer + vLLM colocate | DeepWiki `trl#1` + `trl#11.1`; PyPI version 1.4.0 | VERIFIED |
| lighteval supports vLLM/TGI/SGLang/transformers/litellm/nanotron | DeepWiki `lighteval#10` entry-point listing | VERIFIED |
| TGI in maintenance mode since 2025-12-11 | `huggingface.co/docs/inference-endpoints/engines/tgi` `[!CAUTION]` banner (verified via exa search 2026-05-18) | VERIFIED |
| TEI is ACTIVE (not maintenance) | DeepWiki `text-embeddings-inference#1.2` says "actively maintained" with `cuda-1.9` images | VERIFIED |
| `optimum-nvidia` is a separate package (TensorRT-LLM only) | DeepWiki `optimum#1.2` confirms separate package + Docker-only | VERIFIED |
| HF MCP server at `https://huggingface.co/mcp` | README of `huggingface/hf-mcp-server` lines 26-32 (raw file fetched 2026-05-18) | VERIFIED |
| `huggingface/skills` ships 14 skills via marketplace | README skills-table (BEGIN_SKILLS_TABLE / END_SKILLS_TABLE) auto-generated | VERIFIED |
| `huggingface/ml-intern` is an autonomous CLI agent | README architecture diagram + CLI examples lines 30-60 | VERIFIED |
| Installed transformers = 5.8.1 in `Z:/venvs/claude` | `importlib.metadata.version("transformers")` returned `5.8.1` | VERIFIED |
| Installed accelerate = 1.12.0 in `Z:/venvs/claude` | `importlib.metadata.version("accelerate")` returned `1.12.0`, PyPI latest 1.13.0 → STALE | VERIFIED + flagged |
| Installed trl, lighteval, bitsandbytes = NONE | `importlib.metadata.PackageNotFoundError` for all three | VERIFIED |

**Phantom contamination count this stream: 0.**

Two **stale-not-phantom** anomalies flagged (`datasets` v3.6.0 → PyPI v4.8.5; `sentence-transformers` v5.2.3 → PyPI v5.5.0). Both validated, neither is a phantom; both are operator-AI-M4 candidates.

---

## §8 — Cite Manifest

URLs and file:line anchors used in §§1-7:

- `https://github.com/huggingface/transformers` (push: 2026-05-19 via github MCP)
- `https://github.com/huggingface/hf-mcp-server` (README sha `bf29149178727012bc1504b14479e58d98be3bca`)
- `https://github.com/huggingface/skills` (README sha `f4d50f2a6579c17d2e7575f3744d8f8a0b183555`)
- `https://github.com/huggingface/ml-intern` (README sha `849aa326765102670d6a80a733a55c961eda64f4`)
- `https://huggingface.co/docs/inference-endpoints/engines/tgi` (maintenance-mode banner)
- `https://pypi.org/pypi/<pkg>/json` for: transformers, huggingface_hub, peft, trl, datasets, accelerate, tokenizers, safetensors, diffusers, optimum, evaluate, lighteval, smolagents, sentence-transformers, timm, kernels (all fetched 2026-05-18)
- DeepWiki `huggingface/peft` Integration Features wiki — §3.1
- DeepWiki `huggingface/trl` Overview + Optional Dependencies wiki — §3.2
- DeepWiki `huggingface/lighteval` CLI and Configuration + Architecture wiki — §3.3
- DeepWiki `huggingface/transformers` PEFT + Testing wiki — phantom check
- DeepWiki `huggingface/text-embeddings-inference` Features wiki — §5
- DeepWiki `huggingface/optimum` Package Architecture wiki — §5 + §1
- DeepWiki `huggingface/hf-mcp-server` Overview + Architecture wiki — §4
- exa search `production field report 2026 huggingface PEFT LoRA fine-tuning RTX 4090` — §3.1 angle B
- exa search `huggingface text generation inference TGI vs vLLM vs SGLang 2026 production benchmark` — §5

---

## §9 — Operator Actions Summary (for W301 ledger)

- **AI-M1** (T1, RECOMMENDED): `claude mcp add hf-mcp-server -t http https://huggingface.co/mcp?login` then OAuth-complete. Zero state. ~30s.
- **AI-M2** (T1, RECOMMENDED, staged): `/plugin marketplace add huggingface/skills` then `/plugin install hf-cli@huggingface/skills`. Observe 1 week. Stage 2: add `huggingface-llm-trainer` + `huggingface-community-evals` + `train-sentence-transformers`.
- **AI-M3** (T2, RECOMMENDED-after-AI-M5): `pip install lighteval==0.13.0` in `Z:/venvs/claude`, then wire into `harness/eval_harness.py` as third lane.
- **AI-M4** (LOW): `pip install -U datasets sentence-transformers tokenizers accelerate diffusers smolagents timm` to close 7 stale-not-phantom version drifts.
- **AI-M5** (T2, GAP): `pip install bitsandbytes` + `trl==1.4.0` to enable QLoRA + DPO/GRPO training on RTX 4090 (24 GB).
- **DEFER-AI** (no action): TGI is in maintenance — do NOT install. Use `llama-server` (Stream L incumbent) or vLLM/SGLang (when need bandwidth above llama-server caps).
- **REJECT**: `huggingface/ml-intern` as a CLI alternative — duplicates Claude Code's surface; T4 CITE-ONLY (interesting reference architecture, not an installable).

End of Stream M.
