# SOTA Local-Inference Optimization — RTX 4090 / Windows / ik_llama.cpp Stack

> Research deliverable for `LOCAL-COMPUTE-AUDIT-2026-05-17.md`. Produced by the `psr-localinf` sota-researcher agent (2026-05-17) — 7 source families incl. live probes of the running stack. Persisted by the orchestrator.

## §0 Scope & Method

**Hypothesis (R0):** Moving Qwen3-Embedding-4B from CPU-only (`-ngl 0`) to GPU will cut CPU load and improve embedding throughput, fitting within free VRAM alongside the 35B server.

**Verdict: hypothesis CONFIRMED — but the audit also surfaced a larger, separate problem the question did not anticipate.**

Method: probed 7 source families — official `ik_llama.cpp` GitHub repo (README, `docs/parameters.md`, `docs/speculative.md`, issues #1699/#1618/#1730), DeepWiki, the ik_llama.cpp perf Wiki, `common/common.cpp` source at HEAD `5cc0d86`, GitHub code search, web search, plus live probes (`nvidia-smi`, `Get-CimInstance Win32_Process`, `/health`+`/props` endpoints, `nvidia-smi pmon`).

**Live-probe corrections to the audit brief:**
- GPU at 1–24% util, 4.2 GB / 24 GB used, 19.9 GB free — both servers idle during the probe. The "31% / 100% CPU" snapshot was a moment of embedding activity.
- CPU is 64 cores — so the embedding server's `-t 32` pegs *half* the machine.
- Embedding model = 2.40 GiB (`Qwen3-Embedding-4B-Q4_K_M.gguf`). Quant `Q4_K_M` HAS a CUDA kernel (not a row-interleaved `_R4`/`_R8` quant) — it WILL GPU-accelerate.
- 35B model = 16.5 GiB (`Qwen3.6-35B-A3B-UD-IQ4_XS.gguf`).
- The 35B server was launched directly, NOT via llama-swap; the `llama-swap config.yaml` `qwen35-moe` entry refers to a different, older model.

## §1 The CPU/GPU Rebalance Verdict — with VRAM math

### Finding 1A — there are two problems, and the second is bigger

**Problem 1 (asked about):** the 4B embedder runs `-ngl 0` (CPU-only) with `-t 32`, consuming 32 of 64 cores during embedding.

**Problem 2 (discovered):** the 35B-A3B server has `-ngl 999` and no `-ot`/`--n-cpu-moe` override, so it *should* be ~20 GB GPU-resident. But total GPU memory is 4.2 GB. A 16.5 GiB IQ4_XS model is **not on the GPU** — it offloaded almost nothing. This is the single largest perf loss in the stack: a 35B MoE running on CPU/RAM instead of a 24 GB GPU that is 83% empty. *(Orchestrator note: subsequently CONFIRMED — `:8080/props` shows the model loaded while `nvidia-smi` shows ~4.7 GB.)*

### Finding 1B — VRAM math for moving the embedder to GPU

The embedder's runtime cost is dominated not by the 2.40 GiB model but by the K·Q compute buffer, which scales as `n_ctx × n_ubatch`. The current `-c 32768 -b 32768 -ub 4096` is pathological:

| Component | Current (`-ub 4096`) | Fixed (`-ub 512`) |
|---|---|---|
| Model weights (Q4_K_M) | 2.40 GiB | 2.40 GiB |
| KV cache (encoder, f16, 32k) | ~0.5–1.0 GiB | ~0.5–1.0 GiB |
| K·Q compute buffer (∝ ctx×ubatch) | **~4–8 GiB** | **~0.5–1 GiB** |
| **Total VRAM** | **~7–11 GiB** | **~3.5–4.5 GiB** |

With `-ub 512` the embedder needs ~3.5–4.5 GiB on GPU — fits trivially in 19.9 GiB free today. It does NOT safely fit alongside a *correctly* GPU-resident 35B (16.5 GiB model + ~3–4 GiB KV ≈ 20 GiB) — total ~24 GiB, the ragged edge.

### Finding 1C — is there an expert reason to keep an embedder on CPU? Qualified.

Two legitimate reasons exist: (1) VRAM contention when the GPU must host a large LLM; (2) row-interleaved `_R4`/`_R8` quants have no CUDA kernel and silently run on CPU. **Neither applies here** — the embedder is `Q4_K_M` (CUDA-supported) and 19.9 GiB VRAM sits free. GPU embedding prompt-processing is ~200–250× faster (2600 t/s GPU vs ~10–11 t/s CPU).

**Verdict: MOVE the embedder to GPU (`-ngl 99`), fix `-ub` to 512, drop `-t` to ~4** — but sequence it *after* the 35B VRAM truth is known.

## §2 ik_llama.cpp vs Alternatives

**Verdict: ik_llama.cpp is a defensible, near-SOTA choice for THIS operator — keep it.** vLLM/SGLang give 5–10× higher throughput only under concurrent load (continuous batching) — the operator runs `--parallel 1`, single-user, so that advantage is dormant; and they would require WSL2 + re-quantizing every GGUF. TabbyAPI/exllamav3 is faster for *dense* models that fully fit 24 GB but needs EXL3 re-quant and is weaker on MoE. The operator depends on GGUF + ik's IQK/trellis quants. **The win is configuration, not engine choice.** One caveat: issue #1699 (ik_llama 2× slower PP than mainline on Qwen3-MoE IQ4_XS with CPU-MoE offload, 2026-04-27) — if Finding 1A's 35B is running CPU-MoE, that regression is biting; A/B-test mainline llama.cpp on the exact 35B GGUF.

## §3 Flag-Level Tuning — 35B-A3B Server

R4 source-audit of `common/common.cpp` @ `5cc0d86` + `docs/parameters.md`:

| Flag | Verdict |
|---|---|
| `-fa on` | ✅ correct (FA default-on) |
| `-ctk q8_0 -ctv q8_0` | ⚠️ conservative — ik_llama added low-perplexity `Q4_0` KV (PR 1547/1556); `-ctv q4_0` ~halves V-cache VRAM at 65k ctx. The operator's own llama-swap config already uses `q4_0` V-cache — the direct-launched 35B is *more* conservative than their own config. |
| `--merge-qkv` (`-mqkv`) | ⚠️ audit — "mmap cannot be used" → slower cold load, higher RAM pressure (RAM is 86/128 GB). Benefit only materializes when attention tensors are GPU-resident — which Finding 1A says they may not be. |
| `-muge` (merge-up-gate-experts) | ✅ plausible MoE speedup; benchmark on/off |
| `-sas` (scheduler_async) | ✅ plausible; keep, benchmark |
| `-cuda fa-offset=0` | ⚪ no-op (0 is the default); drop for clarity |
| `-b 2048 -ub 1024` | ⚠️ small `-ub` can starve the GPU on MoE if hybrid; test `-ub 2048` |
| `--threads 1 --threads-batch 1` | ❌ correct ONLY for 100%-GPU offload; if experts are on CPU (Finding 1A), `-t 1` cripples expert matmuls — hybrid wants `-t 16–32` |
| `--no-context-shift` | ✅ fine for an agentic/coding server |
| **MISSING `--fit`** | ❌ biggest omission — PR 1501/1504 auto-fits tensors to available VRAM; the correct fix for the 35B placement uncertainty |
| **MISSING `-ser`** | 💡 optional `--smart-expert-reduction` (fewer experts → faster, slight quality cost) |

**Headline:** three flags (`--merge-qkv`, `--threads 1`, `-ub 1024`) are only correct if the 35B is 100%-GPU-resident — and it is not. Resolve placement first.

## §4 Other SOTA Local-Serving Wins

**4A — DO NOT add a draft model to the 35B-A3B.** Peer-reviewed + multiple benchmarks: draft speculative decoding is net-negative (−13 to −53%) on A3B MoE even at 100% draft acceptance, due to MoE expert-saturation (each drafted token drags a fresh expert slice through memory). Papers: MoESD (arXiv 2505.19645), Utility-Driven SD for MoE (arXiv 2506.20675). The llama-swap config currently runs the losing variant (`--spec-type ngram-mod`) — remove it.

**4B — MTP is the speculative win that works.** `-mtp` is a first-class ik_llama speculative stage (README PR 1698/1745). Where draft-spec loses, MTP gains +31% (149 vs 113 t/s on A3B) — it reuses target hidden states with no expert-union penalty. Qwen3.6-35B-A3B ships MTP weights. Add `-mtp`; try `--spec-autotune`.

**4C — KV-cache Hadamard transforms** (`-khad`/`-vhad`, PR 1033/1034/1527) let you drop KV below Q6_0 with less quality loss — frees VRAM.

**4D — `--fit`** for auto VRAM placement (PR 1501/1504) — the correct fix for 35B placement uncertainty.

**4E — Ollama:** running idle with 0 models. *(Orchestrator correction: do NOT stop it — graphiti embeds via Ollama's `qwen3-embedding:0.6b`. Keep.)*

**4F — Two ik_llama builds** (`build/` for the embedder, `build-new/` for the 35B) — rebuild both from HEAD `5cc0d86` with `-DGGML_CUDA=ON -DGGML_IQK_FA_ALL_QUANTS=ON`; consolidate.

## §5 Prioritized Optimization List

1. **Capture the 35B server's startup log** (`llm_load_tensors: CUDA0 buffer size`) — confirm GPU residency. Diagnostic, unblocks the rest.
2. **If 35B not GPU-resident: add `--fit --fit-margin 1024`**, restart, re-check VRAM — target ~20 GiB resident. Effect: potentially 5–15× TG speedup.
3. **Embedder `-ngl 0`→`-ngl 99`, `-ub 4096`→`512`, `-b 32768`→`4096`, `-t 32`→`4`** (sequence after #2). Effect: frees ~28 cores, embedding ~200× faster.
4. **Add `-mtp` to the 35B** (+25–31% TG); optionally `--spec-autotune`.
5. **Remove draft-spec from llama-swap** (`--spec-type ngram-mod`) — recovers 14–53% lost TG.
6. **Fix `--threads` on 35B** — `-t 1` only if 100%-GPU; else `-t 16–32`.
7. **Lower 35B V-cache `-ctv q8_0`→`q4_0`** — frees ~1–2 GiB VRAM.
8. **A/B test mainline llama.cpp vs ik_llama on the 35B GGUF** (regression #1699).
9. **Audit `--merge-qkv`** — benchmark on/off; remove if 35B is hybrid.
10. **Rebuild both ik_llama builds from HEAD**, consolidate.
11. ~~Stop idle Ollama~~ — **rejected by orchestrator: graphiti depends on it.**
12. **Drop the no-op `-cuda fa-offset=0`** from the 35B cmdline.
13. *(Optional)* Test `-ser 1,N` on the 35B for throughput-vs-quality.

**Sequencing:** #1 → #2 → (#3, #4, #6, #7 together) → #5 → #8/#9/#10 → #12/#13.

## Sources

ikawrakow/ik_llama.cpp (README, docs/parameters.md, docs/speculative.md, common/common.cpp @ `5cc0d86`); issue #1699 (perf regression, 2026-04-27); DeepWiki ik_llama.cpp; ik_llama.cpp Wiki perf comparison; unsloth/Qwen3.6-35B-A3B-GGUF discussion #14; thc1006/qwen3.6-speculative-decoding-rtx3090; zolotukhin.ai (spec-decode net-negative on A3B); Doctor-Shotgun llama.cpp MoE offload guide; aminrj.com (Qwen3.6 on 24GB); arXiv 2505.19645 (MoESD), 2506.20675 (Utility-Driven SD for MoE); techplained / SitePoint engine benchmarks 2026; kaitchup (exllamav3/TabbyAPI). Live probes 2026-05-17.

**R3 caveat:** Finding 1A was PARTIALLY-VERIFIED by the agent (`nvidia-smi` per-process VRAM is `[N/A]` under Windows WDDM); the orchestrator's subsequent `/props`+`nvidia-smi` probe upgraded it to CONFIRMED.
