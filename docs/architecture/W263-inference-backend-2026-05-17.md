# W263 — Inference Backend for Qwen3.6-35B-A3B + Embed-4B on RTX 4090

**2026-05-17** — Workload: Qwen3.6-35B-A3B MoE (3B active) IQ4_XS, 64 K ctx, **concurrent** with Qwen3-Embedding-4B on **one RTX 4090 (24 GiB)**, **native Windows 11**.

## Sources verified this session

- **ik_llama.cpp HEAD `1f8c603d`** (`Quantize: add extra output tensor for MTP (#1810)`, 2026-05-17). 30 d commits = **88** (GitHub Link-header). Merged + verified: **#1810, #1809, #1745** (Qwen3.5/3.6-MoE MTP tail), **#1698** (3B scratch buffers), **#1547/#1556** (Q4_0 V-KV scale-adjust), **#1501/#1504** (auto-fit MoE VRAM; merge `86f4f516` 2026-03-25), **#1184** `/v1/responses`, **#901** mmproj in `llama-server`.
- **llama.cpp HEAD `59778f019`** (2026-05-16), 30 d = **374**.
- **vLLM v0.17.1** (2026-03-11) — patch over v0.17.0; ships `[Mamba][Qwen3.5]` #35219, `[DSV3.2][MTP]` #36723. 30 d = **839**. Docs: "use WSL or community forks".
- **sglang `af26b71ae`** (2026-05-16), 30 d = **1,040**. Release notes confirm DeepSeek-V4 day-0, Kimi-K2.5 EAGLE-3 MLA, Gemma 4 + EAGLE-3 (#23976), AMD Qwen3.5 EAGLE FP8/MXFP4 (#23146).
- **Aphrodite v0.21.0** (2026-05-02), 30 d = **51**. **ExLlamaV3 0.0.34** (2026-05-09), 30 d = **118**. **TGI**: low 2026 cadence.

## D1–D10 score matrix (0=absent, 3=SOTA-fit). Composite = Σ row.

| Dim | ik_llama | llama.cpp | vLLM | sglang | Aphrodite | TGI | ExL3 |
|---|---|---|---|---|---|---|---|
| **D1** Windows native (hard) | **3** | 3 | **0** WSL only | **0** Linux/ROCm/XPU/NPU | 1 | 1 | **3** |
| **D2** GGUF Q4 35B-A3B (hard) | **3** model loaded | 3 | 1 "experimental" | 1 CUDA exp. | 2 | 0 | 0 EXL3 reqt re-quant |
| **D3** Concurrent embed same GPU (hard) | **3** llama-swap DSL #643 | 3 | 1 1-model/engine | 1 same | 1 | 1 | 2 |
| **D4** MTP (Qwen-MTP) | **3** #1745+#1809+#1810 merged 05-17 | 0 | **3** `Qwen3_5MTP` class + tests | **3** Spec-V2 + EAGLE-3 | 2 | 1 | 1 |
| **D5** Spec-decode breadth | **3** MTP+ngram #1261+suffix #1646 | 2 | 3 | **3** EAGLE-2/3 + Adaptive Spec V2 #23336 | 2 | 1 | 1 |
| **D6** VRAM fit (hard) | **3** IQ4_XS+Q4_0 V-KV #1547+auto-fit #1501; current cfg GPU-resident at 64 K | 2 | 2 FP8 ≈ 35 GB needs AWQ-Int4 | 2 wiki: 24 GB "challenging" for 35B-A3B FP8 | 2 | 1 | **3** turboderp: 70B 4 bpw <16 GB |
| **D7** Tok/s cited | 2 adjacent: Qwen3-30B-A3B IQ4_XS RTX 3090Ti improved w/ PR #370 (DW) | 1 ik fork "fused MoE" lead | 2 no 4090 35B-A3B # pub | 2 EAGLE-3 ref **158→373 tok/s 1×H100** LLaMA-3.1-8B (sglang notes) | 1 | 1 | 2 Marlin memory-bound 4 bpw 4090 |
| **D8** Multimodal mmproj | **3** #901; we wire `mmproj-F16.gguf` | 3 | 2 | 2 | 1 | 1 | 0 |
| **D9** OpenAI API (hard) | **3** chat+embed+responses #1184 | 3 | 3 | 3 | 3 | 3 | 2 |
| **D10** Maint (30 d) | 2 (88) | 3 (374) | **3 (839)** | **3 (1040)** | 1 (51) | 1 | 2 (118) |
| **Σ** | **28** | 23 | 20 | 20 | 16 | 13 | 17 |

## Verdict — **KEEP ik_llama.cpp** (Σ=28; lead = 5)

The three nearest contenders **all fail ≥1 hard requirement**: vLLM and sglang both score **0 on D1** (no native Windows, WSL-only) and treat GGUF as experimental (D2=1); Aphrodite/TGI/ExLlamaV3 score worse. ik_llama.cpp is the **only** backend scoring ≥2 on every hard requirement (D1/D2/D3/D6/D9) **and** the only fork with merged Qwen-MTP for this exact 35B-A3B lineage (#1745, #1810, merged 2026-05-17). The 30-day commit gap (88 vs 839) is real but the **relevant** features land: D4, D6, D8 all advanced in the last 30 days.

The architectural pattern — single-model `llama-server` processes composed by **llama-swap** (config in `Z:/tools/llama-swap/config.yaml`) — already gives us multi-model concurrency on one GPU (qwen36 + Gemma-4 26B + Gemma-4 31B all wired). This is the right swap-not-stack posture for a 24 GiB consumer GPU and is **the only D3=3 path** in the matrix.

## ik_llama PRs to track for Q3 2026

1. **#1810 / #1809 / #1745** — re-quantize `Qwen3.6-35B-A3B-UD-IQ4_XS.gguf` with `--mtp-requantize-output-tensor` to materialise the MTP tail; measure TG uplift on our exact workload before declaring done.
2. **#1547 / #1556** (Q4_0 V-KV scale-adjust) — verify no PPL regression vs current `-ctv q8_0`; if clean, drop KV q8→q4 and reclaim ~1.5 GiB for longer context or a co-resident embed model.
3. **#1501 / #1504** (auto-fit MoE) — replace hard-coded `-ngl 999 --cache-ram 4096` with auto-fit when VRAM heuristics stabilise.
4. **#1646** suffix self-spec + **#1261** ngram self-spec — cheap acceptance gains for code/JSON output (hindsight, graphiti workloads).
5. **#1527** Hadamard V-cache + **#1315/#1333/#1362/#1373** fused delta-net for Qwen3-Next / 3.5-MoE.

## Re-evaluation triggers

- ik_llama 30-day cadence < 30 commits for two consecutive months → re-score D10, recheck D4 lag.
- vLLM ships first-class native Windows wheels (community fork only today) → D1 jumps, rerun matrix.
- Any published `Qwen3.6-35B-A3B` benchmark on RTX 4090 at 64 K from any backend fills the D7 gap and may shift the verdict.

## Counter-factual: cost to MIGRATE TO vLLM (only if D1 changes)

Cost = **4/5**. Breaks: GGUF→AWQ-Int4 re-quant (~24 h GPU); rewrite llama-swap macros; lose mmproj/Qwen3-VL parity; rebuild `tools/eee.ps1` + monitoring; lose Q4_0 KV scale-adjust. Not justified now.

---
**File:** `Z:\claude-sota-installed\docs\architecture\W263-inference-backend-2026-05-17.md`
