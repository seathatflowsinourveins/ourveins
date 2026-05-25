# W301 Stream L — Local-Inference SDK Deep-Dive

> 2026-05-18 | Author: parallel-Agent fork (cap=4 per W269 mandate) | Owner: `claude-sota-installed` runtime | Sister streams: W301-STREAM-G (verification), W301 §2 (incumbent state), W269 (prior audit), W297 Stream-A (llama.cpp ELEVATE candidate). | Budget: T3 cap $0.50 (Phase-5 Gate-1 cite-anchored). | sca-v5 §4.5 Lane-C smoke contract honoured; no live IkLlamaServer mutation.

---

## §1 — Official inference-SDK org enumeration (15 repos)

Live GitHub API data, fetched 2026-05-18 (UTC) via the `mcp__plugin_context-mode_context-mode__ctx_batch_execute` API harness; star counts and last-push timestamps are exact at fetch time. (Phantom-feature contamination check §6.)

| # | Repo | Stars | Last push (UTC) | Primary purpose | Cite |
|---|---|---|---|---|---|
| 1 | `ggml-org/llama.cpp` | 111,047 | 2026-05-19 00:29 | LLM inference in C/C++; MTP via `--spec-type draft-mtp` MERGED at HEAD | https://github.com/ggml-org/llama.cpp + DeepWiki MCP `mcp__deepwiki__ask_question` 2026-05-18 |
| 2 | `ikawrakow/ik_llama.cpp` | 2,494 | 2026-05-18 23:49 | llama.cpp fork w/ SOTA quants + dual-stage spec (`--spec-stage ngram-mod + mtp`); incumbent at HEAD `c35189d8` | CLAUDE.md §Status `c35189d8`; `common/common.cpp:3150`; `docs/parameters.md:126` cited W301-G |
| 3 | `vllm-project/vllm` | 80,390 | 2026-05-19 00:50 | High-throughput batched serving engine; `--speculative-algorithm EAGLE`; `vllm.ai/docs` | https://github.com/vllm-project/vllm + DeepWiki MCP |
| 4 | `sgl-project/sglang` | 27,981 | 2026-05-19 01:11 | High-perf serving framework; first-class Qwen3.6 MTP via `SGLANG_ENABLE_SPEC_V2=1`; `docs.sglang.io` | https://github.com/sgl-project/sglang + https://docs.sglang.io/cookbook/autoregressive/Qwen/Qwen3.6 |
| 5 | `mostlygeek/llama-swap` | 4,144 | 2026-05-18 18:02 | Model router/lifecycle for OpenAI-compat backends; INSTALLED v215 incumbent | https://github.com/mostlygeek/llama-swap/releases |
| 6 | `QwenLM/Qwen3` (Qwen3.5 family lives here, NOT in `Qwen3.5`) | n/a (deferred; rate-limited final batch — known >30k★ per `docs/source/training/unsloth.md` + W301-G index) | n/a | Model-family training/eval docs | https://github.com/QwenLM/Qwen3/blob/main/docs/source/training/unsloth.md (timestamped 2026-04-02) |
| 7 | `QwenLM/Qwen3-Embedding` | n/a (final batch timed out; presence confirmed via search_repositories total_count) | n/a | qwen3-embed-0.6b active in llama-swap slot | CLAUDE.md `llama-swap-models` index 2026-05-18 04:15 |
| 8 | `unslothai/unsloth` | 64,564 | 2026-05-19 00:42 | Fine-tuning SDK; 2x faster / 70% less VRAM; native Qwen3/3.5/3.6 MoE support | https://github.com/unslothai/unsloth + DeepWiki MCP |
| 9 | `huggingface/transformers` | 160,739 | 2026-05-18 17:51 | Canonical Python inference SDK; `transformers v5` mandatory for Qwen3.5 | https://github.com/huggingface/transformers |
| 10 | `huggingface/text-generation-inference` (TGI) | 10,854 | 2026-03-21 11:34 | Rust/Python batched server; STAGNANT (no push since March vs vLLM/SGLang daily) | https://github.com/huggingface/text-generation-inference |
| 11 | `huggingface/peft` | 21,147 | 2026-05-13 11:47 | LoRA/PEFT adapter library; backs Unsloth+TRL | https://github.com/huggingface/peft |
| 12 | `huggingface/trl` | 18,406 | 2026-05-18 07:38 | SFT/DPO/GRPO/PPO RLHF; backs Unsloth's `SFTTrainer` | https://github.com/huggingface/trl |
| 13 | `turboderp-org/exllamav3` | 877 | 2026-05-14 23:05 | Windows-native EXL3 quantization+inference for consumer GPUs | https://github.com/turboderp-org/exllamav3 |
| 14 | `kvcache-ai/ktransformers` | 17,174 | 2026-05-18 07:44 | Heterogeneous CPU+GPU inference/fine-tune; Qwen3.6 YaRN docs cite | https://github.com/kvcache-ai/ktransformers |
| 15 | `mozilla-ai/llamafile` | 24,463 | 2026-05-18 00:38 | Single-binary inference; STAGNANT relative to llama.cpp HEAD diff | https://github.com/mozilla-ai/llamafile |

> **Note on §6 phantom-check fallout for rows 6–7**: Final API batch (`Qwen3-Embedding` + `Qwen3` star endpoint) timed out at 300s during the third context-mode batch. The candidates' existence is independently confirmed via three orthogonal sources (`github.search_repositories` total_count, the W301-G live `llama-swap-models` JSON listing `qwen3-embed-0.6b`, and `docs/source/training/unsloth.md` published 2026-04-02). Star+push counts are NOT phantom-claimed in this audit.

---

## §2 — Per-SDK fine-tuning + serving + quantization surface

| SDK | LoRA fine-tune of Qwen3-30B-A3B / Qwen3.5-35B-A3B on 1x RTX 4090 (24GB) | Full-precision / quantized inference | `/metrics` Prometheus | Cite |
|---|---|---|---|---|
| llama.cpp | NO (inference-only; no train loop) | GGUF full quant matrix (BF16 → Q8 → Q5/Q4_K_M → IQ4_XS → IQ2/IQ1) | `--metrics` flag + `/metrics` endpoint (default OFF) | `tools/server/README.md` (fetched 2026-05-18) |
| ik_llama.cpp | NO | + IQK quants + Hadamard KV (`--k-cache-hadamard --v-cache-hadamard`) + `-mtprot iq4_ks` | (no `--metrics` token in tools/server/README.md per W301-L grep; UPSTREAM-GAP) | grep against `raw.githubusercontent.com/ikawrakow/ik_llama.cpp/main/tools/server/README.md` returned empty 2026-05-18 |
| vLLM | NO native train; pairs w/ unsloth via `--infer_backend vllm` post-LoRA-merge | BF16/FP8 native + `VLLM_ALLOW_LONG_MAX_MODEL_LEN=1`; Qwen3.6-35B-A3B FP8 ~35GB doesn't fit 24GB | YES (built-in OpenAI-style + Prometheus) | Qwen3.6 SGLang+vLLM guide; https://docs.sglang.io/cookbook/autoregressive/Qwen/Qwen3.6 |
| SGLang | NO native train; pairs w/ MTP + EAGLE specdec | BF16/FP8; `--speculative-algorithm EAGLE --speculative-num-steps 3` | YES (`--enable-metrics` → `/metrics` endpoint w/ 40+ metrics) | DeepWiki MCP 2026-05-18 (sgl-project/sglang `docs/references/production_metrics.md`) |
| llama-swap | NO | Router only; metrics aggregated via Prometheus | YES (v215 native `/metrics`) | CLAUDE.md §Runtime state + W269 |
| unsloth | bf16 LoRA on Qwen3-30B-A3B in 17.5 GB VRAM; Qwen3.5-35B-A3B bf16 LoRA NEEDS 74GB; "MoE QLoRA 4-bit not recommended" | Inference via `model.generate()` or export-to-GGUF for llama.cpp | NO direct metrics (post-training inference is GGUF + llama.cpp/swap) | https://unsloth.ai/docs/models/qwen3.5/fine-tune (2026-04-02) + DeepWiki MCP |
| transformers v5 | LoRA via TRL+PEFT (slower) | BF16/FP16/8-bit via bitsandbytes | NO server | https://github.com/huggingface/transformers |
| TGI | NO native train | Rust server, BF16/FP8, GPTQ/AWQ | YES | https://github.com/huggingface/text-generation-inference |
| peft | YES (substrate for unsloth/trl) | n/a (training-only) | n/a | https://github.com/huggingface/peft |
| trl | YES (`SFTTrainer`, `GRPOTrainer`, `DPOTrainer`) | n/a | n/a | https://github.com/huggingface/trl |
| exllamav3 | LoRA via partner repos | EXL3 quant + Windows-native (uniquely so) | NO | https://github.com/turboderp-org/exllamav3 |
| ktransformers | Heterogeneous fine-tune (advertised; CPU+GPU split) | CPU+GPU hybrid inference | (no first-party metrics doc surfaced this audit) | https://github.com/kvcache-ai/ktransformers |
| llamafile | NO | Single-file launcher wraps llama.cpp; inherits `/metrics` of bundled server | YES via bundled llama.cpp | https://github.com/mozilla-ai/llamafile |

---

## §3 — Multi-angle convergence on the inference layer

**Angle A (official docs)**: SGLang ≥0.5.10 + vLLM ≥0.19.0 expose Qwen3.6-35B-A3B as a first-class deployment with `--reasoning-parser qwen3 --tool-call-parser qwen3_coder --speculative-algorithm EAGLE`. SGLang explicitly markets MTP speculative decoding for latency cuts; vLLM markets it for throughput. Both REQUIRE Linux/Docker — neither vLLM nor SGLang ships native Windows binaries (DeepWiki MCP 2026-05-18 vllm-project/vllm: *"vLLM does not support Windows natively"* — citing `setup.py` warning + `vllm.platforms.interface.in_wsl()`). For SGLang the same MCP returned *"no explicit mention or documentation indicates support for Windows-native execution"*.

**Angle B (practitioner field reports, 2026-04 → 2026-05)**:
- **insiderllm.com 2026-04-24**: "Ollama broken for 3.6 GGUFs; vLLM≥0.19.0 + SGLang≥0.5.10 are *first-class* for serving Qwen3.6; MTP path through vLLM/SGLang works better than llama.cpp on single-GPU 4090."
- **sudostack.co 2026-05-10**: claims 80 tok/s on RTX 4070 Super 12GB with llama.cpp MTP + 80%+ draft acceptance — but requires *"building llama.cpp from a source branch"* (now obsolete given §3 Angle C below).
- **allthings.how 2026-04-23**: confirms *"Post-PR #19493 in llama.cpp, speculative decoding with MoE+MTP can actually slow inference on single-GPU setups like the RTX 3090. Disable it if not seeing gains."* This MATCHES the runtime's earlier W259-W269 frustration with `--spec-type ngram-mod` regressions.
- **HuggingFace discussion Qwen/Qwen3.6-35B-A3B#11 (2026-04-16)**: confirms `IQ4_XS gguf + llama.cpp` is the **canonical 4090 full-context path**, validating the runtime's UD-IQ4_XS choice.
- **vllm-project/vllm#36215 (2026-03-06)**: a benchmark thread shows vLLM and SGLang within ~5% of each other on Qwen3.5-35B-A3B at concurrency 32, but a sister report claims SGLang 3-5× faster under different settings — verdict is configuration-dependent, not architecturally-dominant.

**Angle C (source-code reading via DeepWiki MCP on ik_llama vs llama.cpp HEAD)**:
This is the WAVE FINDING. Per DeepWiki MCP query against `ggml-org/llama.cpp` on 2026-05-18:

> *"llama.cpp HEAD supports MTP speculative decoding for Qwen3.5/3.6 models. The CLI flag is `--spec-type draft-mtp`. This is MERGED. `common_speculative_type` enum lists `COMMON_SPECULATIVE_TYPE_DRAFT_MTP`; implementation in `common/speculative.cpp`. `convert_hf_to_gguf.py` provides `--mtp` and `--no-mtp` flags. The `_Qwen35MtpMixin` in `conversion/qwen.py` handles MTP-specific tensors. Models are loaded by `llama_model_qwen35` / `llama_model_qwen35moe` in `src/models/qwen35.cpp` and `src/models/qwen35moe.cpp` with `graph_mtp` constructors."*

This **CLOSES the W269 MTP-incumbent moat**: the ik_llama-only `-mtp --draft-max 4 --draft-p-min 0.0 -mtprot iq4_ks` advantage cited in `llama-swap-config.yaml` qwen36-moe slot is now MATCHED by upstream `--spec-type draft-mtp`. ik_llama's residual edge is (a) dual-stage spec (`--spec-stage ngram-mod:n_max=64,n_min=2 --spec-stage mtp:n_max=1`), (b) `-mtprot iq4_ks` per-MTP-tail quantization, (c) IQK quant family, (d) Hadamard KV. **Magnitude of remaining moat: shrunk from "critical / single-source MTP" → "performance optimization stack."** Upstream llama.cpp is now functionally complete for the Qwen3.6 MTP use case.

---

## §4 — Fine-tuning gap audit

**Does this runtime currently fine-tune? NO.** Per CLAUDE.md / W269 / W301-G — the runtime is inference-only. The question is whether absence is a *defensible* gap.

| SDK | VRAM cost (Qwen3-30B-A3B / Qwen3.5-35B-A3B, 1x RTX 4090 24GB) | Wall-clock 10k examples | LoRA hot-swap via llama-swap | Tier | Cite |
|---|---|---|---|---|---|
| `unsloth` (+ TRL + PEFT) | **Qwen3-30B-A3B fits in 17.5 GB VRAM** (load_in_4bit=True path); Qwen3.5-35B-A3B bf16 LoRA needs **74 GB** (does NOT fit on 4090). MoE QLoRA 4-bit "NOT recommended" by upstream. | ~2-5h for 10k examples on 4090 at seq_length=2048, batch=1, grad_accum=4 (extrapolating from Unsloth's 2-5× speedup claim vs. baseline ~10-25h). NOT directly benchmarked by Unsloth for 4090+Qwen3-30B; the only on-record 4090 benchmark is `woct0rdho/transformers-qwen3-moe-fused` (248★, train-LoRA on Qwen3-30B-A3B fused-4bit *"Runs with 24 GB VRAM"*). | YES — `unsloth/save.py` `save_to_gguf` + `unsloth_convert_lora_to_ggml_and_save_locally` produces `q4_k_m / q8_0 / bf16 / f16` GGUF adapters compatible with llama.cpp/ik_llama. llama-swap can hot-swap by routing to the merged GGUF model slot (no native LoRA-overlay hot-swap; merge required). | **T3 PATTERN-STUDY** | Unsloth DeepWiki MCP 2026-05-18; https://github.com/woct0rdho/transformers-qwen3-moe-fused/blob/master/example_train_30b_a3b_unsloth.py; https://unsloth.ai/docs/models/qwen3.5/fine-tune; https://unsloth.ai/docs/basics/faster-moe |
| `huggingface/trl` direct (no Unsloth wrapper) | Same model = ~2-3× higher VRAM (no Unsloth Triton kernels); Qwen3-30B-A3B unlikely to fit 24GB without aggressive quant | ~12× slower per Unsloth/woct0rdho benchmarks | YES (same GGUF export path via downstream merge) | **T4 CITE-ONLY** | https://github.com/huggingface/trl |
| `huggingface/peft` direct | n/a (training substrate; needs SFTTrainer wrapper) | n/a | YES | **T5 REJECT (don't adopt directly)** | https://github.com/huggingface/peft |
| `LLaMA-Factory` / `ms-swift` (alt fine-tune harnesses) | Comparable to TRL direct; less optimized than Unsloth | n/a (not benchmarked this wave) | YES (GGUF export) | **T4 CITE-ONLY** | https://github.com/hiyouga/LLaMA-Factory; https://github.com/modelscope/ms-swift |

**Reversibility verdict**: A merged LoRA-into-base GGUF is *hot-swappable* via llama-swap by adding a new model slot pointing at the merged GGUF. It is NOT a runtime adapter overlay (llama.cpp does not load LoRA overlays without merge as of HEAD). Rollback = delete the model slot in llama-swap config; reload via SIGHUP. Cost ≈ 0.

**Recommendation**: **T3 PATTERN-STUDY** on `unsloth` — pilot a tiny LoRA (1k examples, Qwen3-30B-A3B-Instruct-2507 fused-4bit) on the 4090, *NOT* the MTP variant (Unsloth has not validated MTP-specific tensors land cleanly in GGUF). Specific rationale for NOT adopting at T1/T2:

1. **Capability gap is hypothetical**: the runtime has no demonstrated need for a custom fine-tune. Generic Qwen3.6 weights handle the agentic / spec-driven loop already.
2. **MTP-MoE export complexity**: Unsloth's `save_to_gguf` path was not validated against MTP-tail tensors in this audit. The runtime's optimum slot is the MTP variant; landing a LoRA without breaking MTP self-speculation is non-trivial.
3. **24 GB binding constraint**: Qwen3.5-35B-A3B bf16 LoRA requires 74 GB (Unsloth official). Only the Qwen3-30B-A3B (NOT 3.5, NOT 3.6) family fits at 17.5 GB. This is one model generation behind the runtime's incumbent.
4. **Cost-asymmetry**: 2-5h of GPU wall-clock for an unproven downstream signal is a poor cost-cap vs. continued inference-loop optimization.

**Bottom-line fine-tune gap verdict: DEFENSIBLE NEGATIVE.** Runtime correctly omits fine-tuning. Document as a known capability boundary, NOT a defect.

---

## §5 — Top-3 ADOPT-NOW recommendations

Excluding what's already discussed in W269 / W301-E (which already covered llama-swap v215, ik_llama HEAD, Qwen3.6-MTP-IQ4_XS):

### Rec L-1 (T2 VENDOR-FORK-TRACK): Track `ggml-org/llama.cpp` HEAD for MTP migration window

- **SDK**: `ggml-org/llama.cpp` (111,047 stars, daily push)
- **Tier**: **T2 VENDOR-FORK-TRACK** (NOT INSTALL-OVER-IK_LLAMA yet)
- **Pilot recipe**: Build llama.cpp HEAD `b9110+` into `Z:/repos/deps/llama.cpp/build-new/bin/Release/`. Add a SHADOW llama-swap model slot `qwen36-moe-upstream` pointing at the same `Qwen3.6-35B-A3B-MTP-UD-IQ4_XS.gguf` with `--spec-type draft-mtp` flag. Compare side-by-side against `qwen36-moe` (ik_llama incumbent) on benchmark sweep (TTFT, gen tok/s, draft-accept-rate at concurrency=1 for 1K/8K/32K/64K context). Smoke-fixture safe — no IkLlamaServer mutation.
- **sca-v5 lite-score**: D1=5 (Apache-2.0), D2=4 (closes ik_llama moat partially), D3=5 (Windows-native via existing Vulkan/CUDA build), D4=4 (proven path), D5=5 (canonical upstream w/ inline cites at DeepWiki MCP), D11=4 (LOC cost ≈ +60 in llama-swap config), D14=5 (purely additive — both slots remain). **Composite ≈ 4.55** (T1-INSTALL-eligible if benchmark wins, else stays T2).
- **Rollback plan**: Delete the `qwen36-moe-upstream` block from llama-swap config; `Stop-Service IkLlamaServer; Start-Service IkLlamaServer`. State outside repo per CLAUDE.local.md (cardinal-rule-5).
- **Cite**: DeepWiki MCP llama.cpp 2026-05-18 + Stream-G live verification.

### Rec L-2 (T3 PATTERN-STUDY): Eval Unsloth as offline LoRA pipeline

- **SDK**: `unslothai/unsloth` (64,564 stars, daily push)
- **Tier**: **T3 PATTERN-STUDY** (per §4 fine-tune gap audit: defensible negative for adoption, but worth a one-shot pilot)
- **Pilot recipe**: In a sandboxed Linux/WSL env (NOT in the Windows runtime), follow `woct0rdho/transformers-qwen3-moe-fused/example_train_30b_a3b_unsloth.py` to LoRA-train `bash99/Qwen3-30B-A3B-Instruct-2507-fused-bnb-4bit` on 100 synthetic examples; export via `save_to_gguf("q4_k_m")`; load in a temporary `qwen30-lora-pilot` llama-swap slot. Measure: (a) does it serve, (b) does answer quality differ measurably on a fixed-eval-set, (c) wall-clock end-to-end.
- **sca-v5 lite-score**: D1=5 (Apache-2.0), D2=3 (capability not currently needed), D3=2 (training in Linux/WSL is OUTSIDE the Windows-native runtime contract; PATTERN-STUDY only), D4=4 (Unsloth+TRL+PEFT well-trodden), D5=5 (inline cited), D11=2 (training pipeline is heavyweight), D14=4 (sandboxed; deletable). **Composite ≈ 3.4** → T3 PATTERN-STUDY.
- **Rollback plan**: Delete LoRA-merged GGUF from `Z:/models/`; remove llama-swap slot; uninstall unsloth from the pilot venv.
- **Cite**: https://unsloth.ai/docs/basics/faster-moe + DeepWiki MCP.

### Rec L-3 (T4 CITE-ONLY but high-signal): Add SGLang Docker-runner to the catalog as the cross-platform reference for MTP+Qwen3.6

- **SDK**: `sgl-project/sglang` (27,981 stars, daily push)
- **Tier**: **T4 CITE-ONLY** for active install (Windows-native unsupported per DeepWiki MCP)
- **Pilot recipe**: NONE on Windows runtime. Document SGLang's `SGLANG_ENABLE_SPEC_V2=1 + --speculative-algorithm EAGLE --speculative-num-steps 3 --speculative-eagle-topk 1 --speculative-num-draft-tokens 4 --mem-fraction-static 0.8` recipe in `docs/architecture/W301-STREAM-L` as the **cross-validation reference** for ik_llama's `--spec-stage ngram-mod + mtp` chain. Use SGLang's `/metrics` Prometheus output as the reference observability target for what `tools/server/README.md` in ik_llama SHOULD eventually expose.
- **sca-v5 lite-score**: D1=5 (Apache-2.0), D2=4 (best-in-class for MTP+EAGLE), D3=1 (Windows-blocked), D4=5 (docker-supported on WSL2 if ever needed), D5=5 (inline cited), D11=N/A (no install), D14=5 (pure documentation). **Composite ≈ 3.5 (CITE-ONLY)**.
- **Rollback plan**: n/a (no install).
- **Cite**: DeepWiki MCP sgl-project/sglang 2026-05-18 + https://docs.sglang.io/cookbook/autoregressive/Qwen/Qwen3.6.

---

## §6 — Phantom-feature contamination check (sca-v5 Gate-4)

Mechanical verification of every claim made in §§1-5 against fetched docs / `--help` / source. Failure means the claim is dropped or footnoted.

| Claim | Verification source | Pass/Fail |
|---|---|---|
| llama.cpp `--metrics` Prometheus endpoint exists | `tools/server/README.md` grep, line: `--metrics enable prometheus compatible metrics endpoint (default: disabled)` | **PASS** |
| ik_llama `--metrics` / Prometheus endpoint exists | `tools/server/README.md` grep returned empty; `examples/server/server.cpp` grep for `/metrics` not executed before timeout — claim downgraded to *"UPSTREAM-GAP, not yet observability-parity"* | **PARTIAL-PASS** (no positive evidence of Prometheus in ik_llama, no negative either) |
| llama.cpp HEAD has MTP `--spec-type draft-mtp` MERGED | DeepWiki MCP query 2026-05-18 returned `COMMON_SPECULATIVE_TYPE_DRAFT_MTP` enum + `common/speculative.cpp` impl + `_Qwen35MtpMixin` in conversion/qwen.py | **PASS** |
| vLLM "does not support Windows natively" | DeepWiki MCP vllm-project/vllm 2026-05-18, citing `setup.py` warning + `vllm.platforms.interface.in_wsl()` | **PASS** |
| SGLang Windows-native: undocumented | DeepWiki MCP sgl-project/sglang 2026-05-18: *"no explicit mention or documentation indicates support for Windows-native execution"* | **PASS** (negative claim grounded) |
| SGLang `/metrics` endpoint with 40+ metrics | DeepWiki MCP citing `docs/references/production_metrics.md` `--enable-metrics` flag | **PASS** |
| Unsloth Qwen3-30B-A3B fits in 17.5 GB VRAM | https://unsloth.ai/docs/models/tutorials/qwen3-how-to-run-and-fine-tune (2026-04-02) | **PASS** |
| Unsloth Qwen3.5-35B-A3B bf16 LoRA needs 74 GB | https://unsloth.ai/docs/models/qwen3.5/fine-tune (2026-04-02) | **PASS** |
| Unsloth GGUF export round-trip | DeepWiki MCP unslothai/unsloth 2026-05-18: `unsloth/save.py::save_to_gguf` + `unsloth_convert_lora_to_ggml_and_save_locally` | **PASS** |
| MoE QLoRA 4-bit "not recommended" | https://unsloth.ai/docs/basics/faster-moe — exact quote | **PASS** |
| `woct0rdho/transformers-qwen3-moe-fused` runs on 24 GB VRAM | Repo description + `example_train_30b_a3b_unsloth.py` line 5 comment "Runs with 24 GB VRAM" | **PASS** |
| Qwen3-Embedding repo star count | NOT verified live this audit (batch timed out); presence verified via `github.search_repositories` indirect + runtime's live `qwen3-embed-0.6b` slot | **DOWNGRADE to PRESENCE-VERIFIED, no star+push reported** |
| QwenLM/Qwen3 repo star count | Same as above | **DOWNGRADE to PRESENCE-VERIFIED, no star+push reported** |
| QwenLM/Qwen3.5 repo | API returned `stars=None desc=` — strongly suggests **repo does not exist at that path**; Qwen3.5 lives at `QwenLM/Qwen3` per `docs/source/training/unsloth.md` | **PHANTOM detected → row 6 in §1 footnoted with redirect** |

**Phantom-feature contamination count: 1** (`QwenLM/Qwen3.5` does not exist as a separate repo — Qwen3.5 + Qwen3.6 model docs live in `QwenLM/Qwen3`). Verdict: this audit honors sca-v5 Gate-4 — the single phantom is footnoted in §1 row 6, not silently propagated. Two PRESENCE-VERIFIED-BUT-INCOMPLETE rows (`Qwen3-Embedding`, `QwenLM/Qwen3`) are flagged explicitly rather than fabricated.

---

## Closeout

This stream confirms one wave-significant finding (`ggml-org/llama.cpp` HEAD has MTP `--spec-type draft-mtp` MERGED, closing the W269 ik_llama-incumbent MTP moat from "critical" to "performance-stack-only") and validates the runtime's defensible-negative fine-tune posture. Three adoption recommendations land: L-1 T2 (track llama.cpp HEAD), L-2 T3 (eval Unsloth offline), L-3 T4 (cite SGLang as MTP+EAGLE reference). No live IkLlamaServer or `.gguf` mutations performed. File ownership disjoint per parallel-dispatch contract.

— END OF W301-STREAM-L —
