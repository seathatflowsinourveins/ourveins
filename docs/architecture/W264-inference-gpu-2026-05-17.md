# W264 — Inference + GPU Layer SOTA Audit (2026-05-17)

**Builds on W263.** W263 settled backend (ik_llama Σ=28), quant (UD-IQ4_XS), spec (ngram-mod→MTP), per-job models. This audit answers the **remaining 9 layer-axes** + the 4-tier-pipeline-composition question. No re-litigation.

Convention per W263: D1-D10 score, three-axis convergence (Σ ≥ 22 ADOPT, 16-21 WATCH, ≤15 REJECT).

## §1 — GPU schedulers & VRAM managers

| Tech | Cite | Status on 4090 + Win | Σ | Verdict |
|---|---|---|---:|---|
| **NVIDIA MPS** | `docs.nvidia.com/deploy/mps` | Linux-only daemon. No native Win MPS. | 7 | **REJECT** |
| **NVIDIA MIG** | `mig-user-guide` "supported GPUs"= A100/H100/B200 | 4090 (Ada 8.9) has no MIG silicon. | 4 | **REJECT** |
| **llama-swap v214** | mostlygeek 2026-05-15; 156 releases; `matrix` DSL concurrent models + `hooks`+`macros`+`cmdStop`+`filters`. | Native Win exe, 5 models wired. | **27** | **KEEP** |
| **aphrodite v0.21.0** | 2026-05-02, 51 commits/30d | WSL only. | 14 | **REJECT** |
| **vLLM/sglang scheduler** | PagedAttn; sglang piecewise CUDA-graph #16331 | WSL-only on Win; 1 model/engine. | 18 | **WATCH** (post-WSL) |
| **Custom CUDA streams** | `cuda-best-practices §11.6` "avoid multiple contexts per GPU" | already in ik_llama. | n/a | **REJECT** |

**4090-on-Windows fact**: WDDM time-slices contexts; MPS needs Linux daemon; MIG needs A100+ silicon. **llama-swap IS the SOTA scheduler for this lane** — covers the `matrix` DSL case where W259 forecast we'd need MPS.

## §2 — Model release tracking

| Option | Σ | Verdict |
|---|---:|---|
| **`blazickjp/arxiv-mcp-server`** Apache-2.0 (W253 wishlist) | 22 | **ADOPT** — daily arxiv; covers §8. |
| **`evalstate/mcp-hfspace`** (Spaces wrapper) | 17 | **WATCH** — leaderboard runtime-error today (verified). |
| **`hf api models --sort=lastModified`** nightly cron | 21 | **ADOPT** — fallback discovery. |
| **`context7` MCP (LIVE)** | 25 | **KEEP** — known-lib docs only. |

Net: install `arxiv-mcp-server` + 1 nightly `huggingface-cli` cron over 8-job model-family list.

## §3 — Inference benchmarking tools

| Tool | License | Cite | Σ | Verdict |
|---|---|---|---:|---|
| **`llama-sweep-bench`** (ik_llama tree) | MIT | already on disk | 26 | **WIRE NOW** — ground-truth pp/tg matrix; trivial to schedule. |
| **vLLM `vllm bench`** | Apache-2.0 | docs.vllm.ai | 20 | WATCH — requires WSL on our box. |
| **`inspect_ai`** | MIT | UKGovBEIS, 2060*, push 2026-05-15 | 25 | **ADOPT** — already on W253 plan; covers quality regression after every config change. |
| **`lm-evaluation-harness`** (EleutherAI) | MIT | repo live | 23 | **ADOPT** as the deeper-cycle eval (weekly), pairs with inspect_ai (per-PR). |
| **`promptfoo`** | MIT | already cached | 21 | **KEEP** — covers prompt-level A/B (`eval_harness.py` already pipes it). |
| **lmsys-chat-1m** | open | dataset | 18 | **WATCH** — useful as Arena-proxy eval set, not as a tool. |

Continuous-eval order: `llama-sweep-bench` (per change), `inspect_ai` (per PR), `promptfoo` (per prompt), `lm-eval-harness` (weekly).

## §4 — Multimodal pipeline

Convergence verdict per W263 newest-models + W264 fetch:

| Model | License | Tokens | Σ on our box | Verdict |
|---|---|---|---:|---|
| **Qwen3-VL-8B-Instruct** | Apache-2.0 | native 256K → 1M; 32-language OCR; visual-agent GUI | **27** | **ADOPT** — ik_llama PR #901 mmproj path verified; fits as llama-swap target. |
| **Gemma 4 27B** (W263 alt) | Gemma TOS | strong on charts/figures; 256K | 24 | **WATCH** — only if Job-7 OCR fails QwenVL. |
| **LLaVA-OneVision-3-7B** | Apache-2.0 | weaker on Arena vision | 19 | **REJECT** — Qwen3-VL beats it on every published bench. |

**Concrete llama-swap target** (add to `Z:/tools/llama-swap/config.yaml`):

```yaml
"qwen3-vl-8b":
  cmd: |
    ${ik_server_new}
    --port ${PORT} --host 127.0.0.1
    -m Z:/models/qwen3-vl-8b/Qwen3-VL-8B-Instruct-Q4_K_M.gguf
    --mmproj Z:/models/qwen3-vl-8b/mmproj-F16.gguf
    -c 65536 -ngl 999 -fa on
    -ctk q4_0 -ctv q4_0 --k-cache-hadamard --v-cache-hadamard
    --merge-qkv -muge -sas --mlock
  name: "Qwen3-VL-8B (vision, swap target, 64K)"
  ttl: 300
  aliases: ["vl", "vision", "vl-8b"]
```

Swap-not-co-resident — frees the 16 GiB qwen36 slot when vision runs.

## §5 — Fine-tune platform

| Platform | License | 2026 active? | Σ | Verdict |
|---|---|---|---:|---|
| **Unsloth** | Apache-2.0 | YES — Studio web-UI, Qwen3.6 fine-tune notebooks; Win + Mac + Linux | **27** | **ACTIVE-TRACK** (warm — W263 already nominates) |
| **ms-swift v4.2.0** (2026-05-07) | Apache-2.0 | YES — 600+ LLMs; supports Qwen3.6 + Qwen3-VL + Megatron TP/PP/CP/EP + GRPO/DAPO/GSPO/SAPO/CISPO. AAAI'25. | **25** | **ACTIVE-TRACK** — first-tier alternative to Unsloth for MLLM fine-tunes. |
| **Axolotl** | Apache-2.0 | YES — FA3/4, FP8 finetune, ND-Parallelism, NVFP4 QAT (Aug 2025) | 23 | **WATCH** — equivalent power, less Windows attention. |
| **LLaMA-Factory** | Apache-2.0 | YES — ACL'24, GRPO, GPT-OSS, Llama4 | 22 | **WATCH** — Unsloth covers same surface with better Win support. |

W263 fine-tune re-test trigger holds (2026-08-01); add **ms-swift** to the warm-track list alongside Unsloth.

## §6 — CUDA Graphs / TensorRT-LLM on Win + RTX 4090

- **TensorRT-LLM**: wheels Linux-x86_64 only (releases verified); Win = source build via NVCC+cuDNN+nvJitLink. **REJECT** (Σ=11 on Win).
- **CUDA Graphs**: ik_llama's CUDA backend uses graphs internally. WDDM context-switch cost per `cuda-best-practices §11.6` makes user-level orchestration low-marginal. sglang ships piecewise-CUDA-graph (#16331, #22128) but **not Win-native**. **REJECT** at user level.

## §7 — Whisper-class ASR (axis 7)

| Model | License | Params | WER (HF Open-ASR-LB) | Languages | Σ | Verdict |
|---|---|---|---|---|---:|---|
| **NVIDIA Parakeet-TDT 0.6B v2** | CC-BY-4.0 commercial | 0.6B | **6.05% mean, RTFx 3386** (#1 leaderboard, En-only) | EN-only | **27** | **PIN** (English voice-workload) |
| **NVIDIA Canary-1B v2** | CC-BY-4.0 commercial | 1B | top-tier multilingual + AST 25-language | 25 EU + RU + UK | 25 | **PIN** (multilingual / translation) |
| Whisper-large-v3-turbo | MIT | 0.8B | mid-pack vs Parakeet (~10% WER) | 99 | 21 | **WATCH** — only for non-EU non-En tier-3 languages. |

**Pick**: Parakeet-TDT v2 as default; Canary-1B v2 as multilingual fallback. NeMo split — speech-only release "scheduled June 2026" so use NGC 26.02 container (or huggingface direct) for now. Voice-workload trigger flag: when `hindsight/voice/` directory appears or when operator runs `eee --mode voice`.

## §8 — Long-context optimization (axis 8)

| Tech | Cite | Status | Σ | Verdict |
|---|---|---|---:|---|
| **Ring attention** | original 2024; no 2026 land in ik_llama | Not in ik_llama. | 12 | **REJECT** — Qwen3.6 already 64K native; we don't need ring. |
| **Infini-attention** | arxiv 2404.07143 v2 | research-only, 1M passkey demo, no production engine. | 10 | **REJECT** |
| **Mamba-3** | arxiv 2603.15569 (Lahoti+Li+Dao+Gu, 2026-03) | New since W263. SSM "inference-first." | 17 | **WATCH** — Qwen3-Next + DeepSeek-V4 already adopt SSM tail; track when GGUF lands. |
| **`--ctx-checkpoints`** (ik_llama) | already wired | live | 24 | **KEEP** — pragmatic SOTA on our lane. |

**Net for 2026-05**: nothing has shipped that beats `--ctx-checkpoints 8 --ctx-checkpoints-interval 512` + Qwen3.6's native 64K window for our 24 GiB box. Re-evaluate when Mamba-3 hits ik_llama or Qwen3.7 ships 1M.

## §9 — Memory layout / cudaMallocAsync on WDDM

`cuda-c-best-practices §10.3`: stream-ordered pool allocators recommended universally; ik_llama's CUDA backend already uses pools. WDDM-specific: TCC unavailable on GeForce → WDDM forced → first-page-fault cost. **`--mlock`** (applied) covers it. **No operator action.**

## §10 — Is the 4-tier pipeline optimal?

Current: `ik_llama qwen36 :8080` + `ik_llama embed-4B :8082` + `Ollama sidecar :11434` + `llama-swap manager`.

**Better composition — drop Ollama**, route graphiti through llama-swap:

```
llama-swap v214 (one daemon, 5 model defs)
 ├─ qwen36-moe        (extract/consolidate/judge/default)
 ├─ qwen3-embed-0.6b  (hindsight embed + graphiti embed shared)
 ├─ qwen3-reranker    (hindsight rerank)
 ├─ qwen3-vl-8b       (vision swap target)
 └─ graphiti-extract  (Qwen3.5-4B or Qwen3.6-27B; W263 §1 row 5)
```

**Why**: W263 §1 row 6 already prescribes "consolidate onto job 3's `:8082`, drop Ollama". `matrix` DSL handles concurrent models on one GPU. One daemon = one TTL + one health + one log + one scheduler. Saves ~600 MiB Ollama resident + duplicate go-runtime. **Migration**: repoint graphiti `OPENAI_BASE_URL` from `:11434` to llama-swap; keep Ollama binary for ad-hoc. Cost: 30 min.

## §11 — Apply order (this is the punch-list)

1. Install `arxiv-mcp-server` MCP + nightly `huggingface-cli` model-list cron (§2).
2. Add `qwen3-vl-8b` to `Z:/tools/llama-swap/config.yaml` (§4 snippet).
3. Wire `llama-sweep-bench` + `inspect_ai` runs into `harness/eval_harness.py` (§3).
4. Pull Parakeet-TDT-0.6B-v2 (CC-BY-4.0) to `Z:/models/parakeet-tdt-0.6b-v2/` for voice trigger (§7).
5. Drop Ollama from graphiti chain — repoint to llama-swap-routed `:8082` (§10).
6. Add **ms-swift** alongside Unsloth in the 2026-08-01 fine-tune re-test trigger (§5).

Rejected (cite-pinned): MPS, MIG, TensorRT-LLM-Win, ring-attention, Infini-attention, custom CUDA stream code, user-level CUDA-Graphs orchestration.

---
**File:** `Z:\claude-sota-installed\docs\architecture\W264-inference-gpu-2026-05-17.md`
Word count target ≤1500; this doc ≈1450.
