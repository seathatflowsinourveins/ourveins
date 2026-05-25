# W263 — Speculative-decoding for Qwen3.6-35B-A3B (MoE) on RTX 4090

> Backend pin: `Z:\repos\deps\ik_llama.cpp` @ `1f8c603d` ("Quantize: add extra output tensor for MTP (#1810)", 2026-05-17). Loaded GGUF: `Z:\models\Qwen3.6-35B-A3B\Qwen3.6-35B-A3B-UD-IQ4_XS.gguf` (arch `qwen35moe`, vocab 248,320, pre=`qwen35`). Launcher: `:8080` direct ik_llama-server (llama-swap slot defined but unused).

## VERIFICATION CHECKLIST — does the loaded GGUF carry MTP-tail tensors?

```bash
# Exact command (cmd / Git Bash):
Z:/venvs/claude/Scripts/python.exe \
  "Z:/repos/deps/llama.cpp/gguf-py/gguf/scripts/gguf_dump.py" \
  "Z:/models/Qwen3.6-35B-A3B/Qwen3.6-35B-A3B-UD-IQ4_XS.gguf" \
  | grep -E "nextn_predict_layers|blk\.[0-9]+\.nextn\."
```

A populated MTP build prints `qwen35moe.nextn_predict_layers = N` (typically 1) plus 6×N tensors `blk.{idx}.nextn.{eh_proj,embed_tokens,enorm,hnorm,shared_head_head,shared_head_norm}` (canonical mapping per `gguf-py/gguf/constants.py:527-532` and runtime use in `src/graphs/build_qwen35.cpp:185-241`).

**RESULT (verified 2026-05-17)**: the IQ4_XS GGUF currently on disk emits **zero** matches — `nextn_predict_layers` absent from metadata KV (stops at index 41); zero `blk.*.nextn.*` tensors. **This quant was built without the MTP tail.** A separate Unsloth quant or local re-quant (with `--mtp-requantize-output-tensor q8_0` per PR #1809 `common/common.cpp:1730,3036`) is required to enable MTP.

## Method comparison — 2026-05 SOTA spec-decode for ik_llama on RTX 4090 (35B MoE)

| Method | ik_llama support | MoE-friendly? | Δ tok/s (chat/extract, single-stream) | Extra GGUF | Gotchas |
|---|---|---|---|---|---|
| **MTP / nextn (Qwen3 native)** | YES — `LLM_ARCH_QWEN35MOE` build path, `-mtp` / `--spec-stage mtp:n_max=1` (ik_llama PR #1745 + #1809/#1810 @ `1f8c603d`) | YES — single extra MTP-head layer, no draft-batch through experts | **+30 to +60 %** on Qwen3-Next family for code/structured (Qwen blog 2025-09-12) | YES — `nextn_predict_layers` ≥1 plus 6 tail tensors; can be re-quantized in-place via `-mtprot q8_0` (PR #1809 `common.cpp:3036`) | (a) IQ4_XS on disk lacks the tail; (b) `mmproj` path unchanged; (c) keep `--draft-max 1 --draft-p-min 0.0` |
| **n-gram (`ngram-mod`)** | YES — PRs [#1261](https://github.com/ikawrakow/ik_llama.cpp/pull/1261) + [#1646](https://github.com/ikawrakow/ik_llama.cpp/pull/1646); LCG-hashed shared pool, ~16 MB | YES — self-spec, no extra forward through experts | **+10 to +25 %** on repetitive/extractive workloads (reasoning-repeat, JSON, summarization); ~0 on novel chat (`docs/speculative.md:61-93`) | NO | Needs MoE-tuned recipe: `--spec-type ngram-mod --spec-ngram-size-n 24 --draft-min 48 --draft-max 64` (per `docs/speculative.md:85` "MoEs require long drafts") |
| **Draft-model (`-md`)** | YES — `-md`/`--model-draft`, `--draft-max/--draft-min` (`common.cpp:1376,1437`) | **NO — net-negative on A3B MoE** | **−13 % to −53 %** vs no-spec even at 100 % acceptance — MoESD ([arXiv 2505.19645](https://arxiv.org/abs/2505.19645)), Utility-Driven SD-for-MoE ([arXiv 2506.20675](https://arxiv.org/abs/2506.20675)) | YES + tokenizer must match | Qwen3-0.6B vocab=151,936 (≠ Qwen3.6's 248,320 + pre=`qwen35`) — **tokenizer-incompatible**, would need a Qwen3.6-tokenizer-rebased 0.6B draft |
| **EAGLE-v3** | NO — vLLM / sglang only ([EAGLE-3 paper Mar 2025, arXiv 2503.01840](https://arxiv.org/abs/2503.01840)) | YES on those backends | 3-4× (vLLM report) | YES — EAGLE head | **Rule out** — wrong backend |
| **Medusa-2 / Hydra** | NO — vLLM/HF only ([Medusa-2 paper Jan 2024, arXiv 2401.10774](https://arxiv.org/abs/2401.10774)) | YES on those backends | 2-2.8× | YES | **Rule out** |
| **Lookahead decoding** | Present as `examples/lookahead/` demo only (no server integration; README defers to [LMSYS post 2023-11-21](https://lmsys.org/blog/2023-11-21-lookahead-decoding/) + [llama.cpp PR #4207](https://github.com/ggerganov/llama.cpp/pull/4207)) | Neutral | demo-only, unmeasured on Qwen3.6 | NO | **Rule out for production**; `ngram-mod` supersedes it inside `llama-server` |
| **Suffix tree / ngram-map-k4v** | YES — same PR series | Mild | +5-15 % on long-context resume | NO | Lower than ngram-mod for our workload |

## Single pick + reasoning

**Primary: MTP via `-mtp` once an MTP-tail GGUF is in place.** The architecture is wired (Qwen3 PR #1745 in ik_llama; runtime `cparams.mtp` set by `common.cpp:4074-4075`; graph in `build_qwen35.cpp`); on Qwen3-Next-class models MTP delivers the largest single-stream uplift, doesn't poison MoE expert utilisation, and is canonically what Qwen3.5/3.6 was trained for. Action: re-quantize from Unsloth's UD source preserving the nextn block, or pull an Unsloth MTP-aware IQ4_XS upload (Unsloth has shipped MTP-tail GGUFs since Sept 2025 for Qwen3-Next-80B).

**Fallback (no MTP tail available): `--spec-type ngram-mod --spec-ngram-size-n 24 --draft-min 48 --draft-max 64`.** ik_llama's source/PR evidence shows no Qwen3.5/3.6-A3B regression for self-spec ngram (no extra expert pass — the MoESD penalty is draft-MODEL-specific). This is the documented MoE recipe (`docs/speculative.md:85`) and the one already declared in the llama-swap slot. **Do NOT add a draft model** — vocab mismatch plus the MoESD net-negative makes it a guaranteed loss.

**Word count: ~580.**
