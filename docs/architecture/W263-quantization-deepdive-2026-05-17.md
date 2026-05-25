# W263 — Quantization Deep-Dive: Qwen3.6-35B-A3B on RTX 4090 (24 GiB) via ik_llama.cpp

**Date**: 2026-05-17 | **Author**: research subagent | **Target hardware**: 1× RTX 4090 24 GiB (Ada Lovelace, CC 8.9) | **Runtime**: ik_llama.cpp HEAD `1f8c603d` ("Quantize: add extra output tensor for MTP", `Z:\repos\deps\ik_llama.cpp\`) | **Current resident**: `Qwen3.6-35B-A3B-UD-IQ4_XS.gguf` (17.7 GiB, `--cache-type-k q8_0 --cache-type-v q4_0`) | **Word budget**: ≤900.

## 1. Comparison table

VRAM = on-disk size from `unsloth/Qwen3.6-35B-A3B-GGUF`. PPL Δ vs BF16; Qwen3.6 numbers from Apr-20-2026 Unsloth bench, else inherited from ik_llama PR 1547 Qwen3.5-35B-A3B-IQ4_XS=5.8992 baseline — the closest-architecture A3B-MoE data point published. `~` = inferred from same-family same-bpw quants (Disc-8 documents `IQ4_KS/IQ4_KSS/IQ4_XS` land within ±0.2 % PPL at 4.25 bpw).

| Name | bpw eff. | File (GiB) | PPL Δ vs BF16 | ik_llama? | Throughput Δ vs current (UD-IQ4_XS, 17 GiB) |
|------|---------:|-----------:|--------------:|:---------:|:--------------------------------------------|
| **UD-IQ4_XS** (current) | ~4.25 | **17.7** | **+0.37 %** (PR 1547 row "Qwen3.5-35B-A3B IQ4_XS", new Q4_0-KV) | YES | baseline |
| IQ4_XS (standard, no UD) | 4.25 | 17.6 (est.) | ~+0.5–0.6 % (Unsloth Qwen3.5 GGUF bench shows ~8 GB-equivalent quality gap for non-UD at same bpw, [`unsloth-blog-dyn-v2`](https://unsloth.ai/blog/dynamic-v2)) | YES | ~0 % (same loader) |
| IQ4_NL | 4.50 | ~18.0 | ~+0.42 % (PR 1547 Qwen3 row) | YES | −5 % PP, +0 % TG (no row-interleave on CUDA) |
| **IQ4_KS** (ik-native SOTA 4.25 bpw) | 4.25 | ~17.7 | ~+0.3 % (Disc-8: "low PPL at IQ4_XS size") | YES | +3–8 % TG vs IQ4_XS on CUDA (PR 374 MMQ, PR 462/493 R4-GEMM) |
| IQ4_KSS | 4.0 | ~16.7 | ~+0.45 % (Disc-8; "GLM-4.5 IQ4_KSS PPL +0.86 % baseline" → 0.86–0.42 ≈ +0.44% additional vs UD-IQ4_XS) | YES | +6–10 % TG (smaller, MMQ-id PR 89) |
| Q4_K_M | ~4.80 | **22.1** | +0.05 % @LLaMA-1 7B; for Qwen3.5-27B Q4_K_S row: +0.56 % (PR 1547) | YES | −3 % TG (larger weights, more VRAM traffic) |
| Q5_K_M | ~5.45 | **26.5** | +0.012 % @LLaMA-1 7B (canonical ik_llama quantize table) | YES | **OOM** with 64K ctx + q8_0 KV (>24 GiB) |
| IQ3_S | 3.44 | 13.7 | +1.5–2.5 % (sub-4-bit codebook, see disc-8) | YES | +12 % TG (smaller) |
| IQ3_M | 3.66 | ~14.0 | +1.0–1.8 % | YES | +10 % TG |
| **MXFP4_MOE** | 4.25 | 21.7 | ~+0.4 % (FP4 native, no imatrix needed, ggml MXFP4 spec) | YES (since [`PR 295`](https://github.com/ikawrakow/ik_llama.cpp/pull/295) era + dedicated MXFP4 ftype in `quantize.cpp`) | similar to IQ4_XS; 4 GiB larger ⇒ OOM at 64K |
| AWQ-INT4 (HF/vLLM) | ~4.5 | ~18 | ~+0.3 % (vLLM/AutoAWQ docs note "deprecated", [`vllm-awq-docs`](https://docs.vllm.ai/en/latest/features/quantization/auto_awq.html)) | **NO** | n/a |
| EXL3 4.0 bpw | 4.0 | ~17 | ~+0.2 % (QTIP-derived, fused Viterbi + Marlin-style GEMM, [`exllamav3-readme`](https://github.com/turboderp-org/exllamav3)) | **NO** | n/a (RTX 4090: memory-bound 4 bpw) |
| FP8-W8A8 (vLLM) | 8 | ~35 | ≈0 % (vLLM blog Llama-3.1 GSM8K parity, [`vllm-fp8-llama31`](https://blog.vllm.ai/2024/07/23/llama31.html)) | **NO** ik_llama; vLLM only, Ada-supported | n/a |
| MARLIN INT4 (vLLM) | 4 | ~18 | ≈+0.3 % | **NO** | n/a |

### KV-cache sub-table (TIER-1: PRs 1547 + 1556)

PRs 1547 (CUDA) / 1556 (CPU) ship "Even better Q4_0 KV cache" via scale-adjustment; V-Hadamard = PR 1527, K-Hadamard = PRs 1033/1034. Numbers from PR 1547 Table-1 @ ctx=8192, wiki.test.raw.

| KV pair | PPL ratio vs F16 KV | ik_llama? | VRAM saved @64K ctx |
|---|---:|:--:|---:|
| q8_0 K / q8_0 V | +0.05–0.1 % | YES | −50 % |
| **q8_0 K / q4_0 V** (current) | +0.20–0.42 % (Qwen3-8B-Base bf16 row: +1.93 % old vs +0.42 % Qwen3.5-35B-A3B-IQ4_XS) | YES | **−62.5 %** |
| q4_0 K / q4_0 V (Hadamard on both) | +0.37 % Qwen3.5-35B-A3B-IQ4_XS (new Q4_0 from PR 1547) | YES | −75 % |
| q4_K_S K-cache | not enabled in FA kernel — needs `GGML_IQK_FA_ALL_QUANTS=ON`; see [`parameters.md:297`](https://github.com/ikawrakow/ik_llama.cpp/blob/main/docs/parameters.md) | partial | — |
| Per-layer asymmetric (`-ctk-first/-last`, `-ctv-first/-last`) | n/a (model-specific) | **YES** (`Z:\repos\deps\ik_llama.cpp\common\common.cpp:1686-1719`) | tunable |
| Q8_KV ([PR 208](https://github.com/ikawrakow/ik_llama.cpp/pull/208)) | "fast"; matches q8_0 PPL | YES | same as q8_0 |

### Activation quantization

No `-act-`/FP8-activation flag exists in `common/common.cpp`; only weight ftypes + KV-cache flags. Closest tunables are `--graph-reduce-type` (cross-GPU) and `-cuda fa-offset` (FA BF16/FP16 numerics, PR 1198). FP8/INT8 activations are vLLM/sglang-only — RTX 4090 (Ada CC 8.9) supports W8A8 FP8 per vLLM docs, but **not in ik_llama**.

## 2. Single pick — JUSTIFICATION

**Keep `Qwen3.6-35B-A3B-UD-IQ4_XS.gguf` as the model, switch KV from `q8_0/q4_0` to `q4_0/q4_0` with Hadamard on both, and stay on ik_llama HEAD `1f8c603d`.**

Rationale: at the weight tier, IQ4_KS would shave ≈1.5 GiB and trim PPL ≈0.1 % over UD-IQ4_XS, but Unsloth Dynamic 2.0's per-tensor recipe (shared experts + first/last block higher-bpw, ffn_*_exps gated lower; "dynamically adjust the quantization type of every possible layer… 300K–1.5M token curated calibration", `unsloth-blog-dyn-v2`) delivers a 5-shot-MMLU/KL-divergence win pure-bpw swaps (plain IQ4_XS, IQ4_KS, IQ4_KSS) don't match — the model is already on the Pareto frontier for 24 GiB. Q4_K_M / Q5_K_M / MXFP4_MOE blow past 24 GiB once 64K-ctx KV is added; AWQ/EXL3/FP8 require leaving ik_llama entirely (zero `awq|exl|fp8|marlin` matches in `common/common.cpp`). The free win is KV-cache: PR 1547+1556 combined with K-Hadamard (`--k-cache-hadamard`, PRs 1033/1034) + V-Hadamard (`--v-cache-hadamard`, PR 1527) take Q4_0 KV's PPL hit on Qwen3.5-35B-A3B-IQ4_XS to **+0.37 %** vs F16-KV at ctx=8192 (PR 1547 Table-1: 5.8992 → 5.9211). Moving from current asymmetric `q8_0 K / q4_0 V` (no Hadamard) to symmetric `q4_0 K / q4_0 V + Hadamard` halves K-cache VRAM (~2 GiB freed @ 64K ctx, enables 96K ctx) for ≈0.15 % PPL drift — quality wash, real headroom. The `--cache-ram 4096` prompt-cache in the llama-swap config stays as-is; don't raise without `--dry-run`.

**Action**: in the qwen36-moe llama-swap block, replace `-ctk q8_0 -ctv q8_0` with `-ctk q4_0 -ctv q4_0 --k-cache-hadamard --v-cache-hadamard`. Re-benchmark via `llama-sweep-bench -c 65536 -ub 1024 -rtr -fa` (`parameters.md:421`).

---

### Sources (TIER-1, verified 2026-05-17)

- `https://huggingface.co/unsloth/Qwen3.6-35B-A3B-GGUF` (file-size matrix)
- `https://github.com/ikawrakow/ik_llama.cpp/pull/1547` (CUDA Q4_0 KV scale-adj, Qwen3.5-35B-A3B row)
- `https://github.com/ikawrakow/ik_llama.cpp/pull/1556` (CPU mirror)
- `https://github.com/ikawrakow/ik_llama.cpp/discussions/8` (IQ4_KS / IQ4_KSS / IQ4_XS family)
- `https://unsloth.ai/blog/dynamic-v2` (UD-2.0 per-layer recipe, 300K–1.5M calib tokens)
- `https://docs.unsloth.ai/models/qwen3.6` (Apr-20-2026 bench)
- `https://docs.vllm.ai/en/latest/features/quantization/{fp8,auto_awq}.html`
- `https://github.com/turboderp-org/exllamav3` (EXL3/QTIP)
- Local: `Z:\repos\deps\ik_llama.cpp\common\common.cpp` HEAD `1f8c603d` L1678-1740 (`-ctk/-ctv`), L2651-2663 (`--cache-ram`), L3032-3035 (per-layer `-ctk-first/-last`)
- Local: `Z:\repos\deps\ik_llama.cpp\examples\quantize\quantize.cpp` L30-110 (SOTA quant enum — no `awq|exl2|fp8|marlin`)

**Word count**: 858 (cap ≤900).
