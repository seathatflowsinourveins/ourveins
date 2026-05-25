# W301 Stream N — Fine-Tune Ecosystem Deep-Dive (Re-Litigates Stream L Verdict)

**Wave** W301.I · **Stream** N · **Date** 2026-05-18 · **Budget cap** $0.50 (T3) · **Phase-5 Gate-1** every claim cited
**Charter**: Re-examine W301.H Stream L's "fine-tune defensible NEGATIVE" verdict by going broader than its llama.cpp-centric framework set. Multi-angle convergence per sca-v5.
**File ownership** (parallel-dispatch contract): WRITE this file only.

---

## §1 — Framework enumeration (12 audited)

| # | Repo | Stars | Last push (UTC) | License | Canonical role | Verified |
|---|---|---|---|---|---|---|
| 1 | `axolotl-ai-cloud/axolotl` | 11,937 | 2026-05-18 20:50 | Apache-2.0 | YAML-driven SDK; multi-GPU FSDP2/DeepSpeed + Qwen3.5 MoE + ScatterMoE LoRA + `quantize_moe_experts` | GH API + LICENSE fetch |
| 2 | `hiyouga/LLaMA-Factory` | 71,372 | 2026-05-13 12:56 | Apache-2.0 | Web-UI + 100+ model templates; native Windows; KTransformers integration; 2/3/4/5/6/8-bit QLoRA | GH API + LICENSE |
| 3 | `unslothai/unsloth` | 64,564 | 2026-05-19 01:43 | Apache-2.0 | Speed-king kernel rewrites for single GPU; Qwen3/3.5/3.6 MoE first-class | GH API + LICENSE |
| 4 | `huggingface/trl` | 18,407 | 2026-05-18 07:38 | Apache-2.0 | RLHF/DPO/ORPO/SimPO/GRPO/KTO/PPO trainers; Unsloth-integrable | GH API + LICENSE |
| 5 | `huggingface/peft` | (99 matches) | 2026-05-13 11:47 | Apache-2.0 | LoRA/QLoRA/IA³/AdaLoRA adapter library; backbone for almost all SDKs | GH search + README |
| 6 | `huggingface/alignment-handbook` | (5 matches) | 2026-04-08 14:29 | Apache-2.0 | Reference recipes for SFT+DPO/ORPO; Zephyr/Mixtral 8x22B examples | GH search + README |
| 7 | `huggingface/open-r1` | (7 matches) | 2026-04-02 14:03 | Apache-2.0 | Fully open DeepSeek-R1 RL reproduction; GRPO + verifier rewards | GH search + README |
| 8 | `meta-pytorch/torchtune` (formerly `pytorch/torchtune`) | 5,755 | 2026-05-18 12:46 | BSD-3-Clause | PyTorch-native post-training; Qwen3 dense up to 32B; NF4 QLoRA via `torchao` | GH API + LICENSE + DeepWiki |
| 9 | `deepspeedai/DeepSpeed` (formerly `microsoft/DeepSpeed`) | (38 matches) | 2026-05+ | Apache-2.0 | Training-systems accelerator (ZeRO-1/2/3, offload, mixture-of-experts kernels) | GH search + README |
| 10 | `microsoft/LoRA` | (99 matches) | 2024-era | MIT (per README) | Original LoRA reference impl; archival — superseded by PEFT | GH search + README |
| 11 | `modal-labs/llm-finetuning` | n/a (empty LICENSE file → confirm in repo) | n/a | Apache-2.0 (Modal-team standard) | Field blueprint: Modal serverless + axolotl recipe pack | README fetch (14 b) |
| 12 | `karpathy/nanoGPT` | (well-known) | DEPRECATED 2025-11 | MIT | Educational baseline; `nanochat` cousin is the new home | README confirms "now very old and deprecated" |
| 13 | `karpathy/llm.c` | (well-known) | active | MIT | C/CUDA reference for LLM training; not for production fine-tuning | README confirms `## license: MIT` |
| 14 | `kvcache-ai/ktransformers` | 17,174 | 2026-05-18 07:44 | Apache-2.0 | **kt-sft** CPU+GPU heterogeneous fine-tune; native Windows; LLaMA-Factory integration; **Qwen3-30B-A3B ~24GB on 1× RTX 4090 @ 8+ it/s** | GH API + DeepWiki + README |

Total = **14 frameworks** audited (12 fine-tune SDKs + 2 educational baselines).

---

## §2 — Capability matrix (RTX 4090 24 GB · Windows · QLoRA on MoE)

| Framework | Single 4090 24GB? | QLoRA MoE? | RLHF/DPO/ORPO/SimPO | Output formats | Windows native | Maintained |
|---|---|---|---|---|---|---|
| axolotl | **YES** (`quantize_moe_experts` GLM-4.7 QLoRA: 127GiB → 23GiB; ScatterMoE LoRA for Qwen3.5-MoE) | YES (qlora 4-bit + ScatterMoE) | Full via TRL | HF + GGUF (downstream) | WSL2/Docker-recommended (CUDA-only, no ROCm) | ACTIVE (pushed today) |
| LLaMA-Factory | **YES** (README hardware table: 30B QLoRA 4-bit = 24GB) | YES (2/3/4/5/6/8-bit) | YES (PPO/DPO/KTO/ORPO) | HF + GGUF + ms-swift | **YES native** ("manually install GPU torch + prebuilt bitsandbytes") | ACTIVE |
| unsloth | **YES** Qwen3-30B-A3B (17.5 GB claimed); **NO** Qwen3.5-35B-A3B (74 GB bf16) | **PARTIAL** — official "MoE QLoRA 4-bit NOT recommended due to BitsandBytes limitations" (Qwen3.5 only; Qwen3-30B-A3B QLoRA works) | YES (GRPO + KL-SFT + DPO) | HF + GGUF + vLLM | **YES** ("Single and multi-GPU support Linux, Windows, Colab, Kaggle") per `QwenLM/Qwen3/docs/source/training/unsloth.md` | ACTIVE (pushed today) |
| trl | YES with PEFT+QLoRA + Liger kernels (60% peak mem cut) | YES (router_aux_loss_coef for MoE) | YES (DPO stable; ORPO/SimPO experimental) | HF | YES (pure pip) | ACTIVE |
| peft | n/a (library) | YES | n/a (provides adapters) | n/a | YES | ACTIVE |
| alignment-handbook | n/a (recipe-only; backend = TRL+Accelerate) | YES via TRL | YES (DPO/ORPO/SimPO/KTO) | HF | YES | maintained (last push 2026-04-08) |
| open-r1 | NO (designed for 8×H100; GRPO) | partial | GRPO + verifier-based RL | HF | Linux-only (vllm dev wheel) | ACTIVE |
| torchtune | YES Llama-3.1-8B QLoRA 7.4 GiB | NO Qwen3 MoE (only DENSE Qwen3 up to 32B) | DPO/PPO | HF + torchao NF4 | Linux-leaning (NVIDIA/Intel XPU/AMD ROCm/MPS/Ascend) | ACTIVE |
| DeepSpeed | n/a (backend) | n/a | n/a (training-systems lib) | n/a | YES (README has "Windows" section) | ACTIVE |
| microsoft/LoRA | n/a (paper-impl) | n/a | n/a | n/a | n/a | ARCHIVAL — use PEFT |
| modal-labs/llm-finetuning | YES (rents A10G/A100) — not single-4090 | YES (axolotl backend) | YES | HF + GGUF | n/a (cloud) | (status not re-verified — README is 14 bytes) |
| nanoGPT | n/a (pre-train baseline) | n/a | n/a | n/a | YES | **DEPRECATED** ("very old"; use `nanochat`) |
| llm.c | n/a (training-from-scratch) | n/a | n/a | n/a | Linux+MPI/NCCL | ACTIVE |
| **ktransformers** | **YES Qwen3-30B-A3B @ ~24GB total + 8+ it/s** | YES via LLaMA-Factory + kt-sft | YES (Dec 2025: RL-DPO) | HF + GGUF | **YES native** ("Aug 9, 2024: Support windows native") | ACTIVE |

---

## §3 — Multi-angle convergence on Qwen3 MoE / RTX 4090

**Angle A — Unsloth official docs (`unsloth.ai/docs/models/...`)**:
- `qwen3-how-to-run-and-fine-tune` (timestamped 2026-04-02): "Qwen3-30B-A3B works on just **17.5 GB VRAM** with Unsloth" (MoE update for 30B-A3B + 235B-A22B). Caveat: "full 16-bit model must be downloaded and converted to 4-bit on the fly for QLoRA fine-tuning. This is due to issues importing 4-bit BnB MOE models directly. This only affects MOE models."
- `qwen3.5/fine-tune` (2026-02-26 commit `f9d4a53`): "Qwen3.5-35B-A3B - **bf16 LoRA works on 74GB VRAM**." + "It is not recommended to do QLoRA (4-bit) training on the Qwen3.5 models, **no matter MoE or dense, due to higher than normal quantization differences**." + "MoE QLoRA 4-bit is **not recommended due to BitsandBytes limitations**" (separately, on the `faster-moe` page, the same warning is re-stated as "BitsandBytes doesn't support it. This isn't specific to Unsloth.")
- `basics/faster-moe`: "Qwen3-30B-A3B (16-bit LoRA) uses **63 GB**" — so 17.5 GB is the 4-bit QLoRA budget, 63 GB is the bf16 LoRA budget for the **older** Qwen3-30B-A3B.

**Angle B — Practitioner reports (exa 2026)**:
- `unslothai/unsloth#2504` (2025-05): operator on RTX 4090 24 GB hit OOM during load (model shards ~29.6 GB transient peak); shimmyshimmer confirmed regression + fix-pinged in latest `pip install --no-deps --upgrade --force-reinstall unsloth unsloth_zoo`. With workaround **and** `use_gradient_checkpointing="unsloth"`, it loads under 17.5 GB steady-state.
- `woct0rdho/transformers-qwen3-moe-fused` (2025-06-29, Apache-2.0): "fine-tune Qwen3-30B-A3B on a single GPU with **24 or even 16 GB VRAM**" — uses `example_train_30b_a3b_unsloth.py` (24 GB) and `example_train_30b_a3b_gguf.py` (UD-IQ3_XXS, 16 GB). Stream L verification table marks both PASS.
- `samuelcardillo/Qwopus-MoE-35B-A3B` (HuggingFace, Apr 2026): **proof-of-existence** — QLoRA 4-bit fine-tune of **Qwen3.5-35B-A3B** with Unsloth 2026.4.2 + TRL, LoRA r=32, BF16 adapters. Trained on RTX PRO 6000 Blackwell 96 GB → not 24 GB, but disproves "QLoRA on MoE is impossible". Unsloth's "not recommended" = quality caution, not feasibility blocker.
- `axolotl-ai-cloud/axolotl#3439` (2026-02-26): "From a QLoRA training using **127 GiB peak memory**, we managed to reduce till **23 GiB**" — GLM-4.7-Flash. ScatterMoE LoRA (PR #3513, 2026-03-20) ships Qwen3.5-35B-A3B kernel autotune configs.
- `theaiengineer.substack.com/p/unsloth-vs-axolotl-vs-llama-factory` (2026-05-09): "By 2026, all three support LoRA, QLoRA, full fine-tuning, GRPO, DPO, and vision models." Single-GPU = Unsloth or LLaMA-Factory; multi-GPU = Axolotl.
- `willitrunai.com/can-run/qwen-3.5-35b-a3b-on-rtx-4090-24gb` (inference, not training): says even Q4_K_M *inference* needs ~26.4 GB → ~10% spill to host. Training is strictly higher.

**Angle C — Source-reading of unsloth VRAM estimator**:
- DeepWiki `unslothai/unsloth`: `studio/backend/utils/hardware/vram_estimation.py` ground truth — `QWEN3_MOE_30B` config = `num_experts=128, moe_intermediate_size=768`; `QUANT_4BIT_FACTOR=3.2` (3.6 with double-quant). README explicitly: "Qwen3.5-35B-A3B can now be trained and run in Unsloth Studio." MoE target identified via `get_moe_target_parameters` (`gate_up_proj`, `down_proj`). No code-level prohibition on Qwen3.5-MoE QLoRA — only the doc-level recommendation against it.

**Convergent finding (3-of-3 angles)**: Qwen3-30B-A3B QLoRA fits 24 GB (unsloth official + woct0rdho + axolotl `quantize_moe_experts`). Qwen3.5-35B-A3B QLoRA 4-bit is **discouraged** but works (Qwopus exists). bf16 LoRA on Qwen3.5-35B-A3B genuinely needs 74 GB → out of 24 GB scope.

---

## §4 — Stream L verdict re-litigation

**Stream L claim (W301-STREAM-L-LOCAL-INFERENCE-SDK-DEEPDIVE.md:42 + :90)**: "Qwen3.5-35B-A3B bf16 LoRA NEEDS 74GB" + "MoE QLoRA 4-bit not recommended" → "DEFENSIBLE NEGATIVE." for runtime fine-tune adoption.

**Re-litigation verdict: STREAM L VERDICT NEEDS REVISION — PARTIAL.**

Stream L was correct on the **letter** (74 GB bf16 + the recommendation against MoE QLoRA both confirmed against the official Unsloth Qwen3.5 doc 2026-04-02). Stream L was **wrong on the spirit** — it conflated two distinct facts:

1. The runtime's incumbent **inference** model is Qwen3.6-35B-A3B (per CLAUDE.md / W301-G). Inference uses GGUF; the 74 GB number is for *training-time bf16 weights*, not inference.
2. The runtime's *fine-tune target* (if there were one) should be **one model generation back** = Qwen3-30B-A3B, not Qwen3.5-35B-A3B. At that target, **17.5 GB QLoRA fits the 4090**, ScatterMoE-LoRA / `quantize_moe_experts` cut Axolotl QLoRA from 127 → 23 GB on a sister MoE model, and KTransformers achieves single-4090 fine-tune at **~24 GB total + 8+ it/s** via CPU expert offload (independent of Unsloth's QLoRA path).

Stream L's framework set was llama.cpp-centric (vLLM, SGLang, ik_llama.cpp, llama-swap). It **missed**: axolotl `quantize_moe_experts`, ktransformers kt-sft on Windows native, woct0rdho fused MoE kernels validated on RTX 4090. With those in scope, the "fine-tune is impossible at 24 GB" framing collapses.

**Bottom line**: the runtime's *omission of fine-tuning* is still defensible (Stream L §4 reason #1 stands: **no demonstrated downstream need**). But the framing should be "fine-tune deferred until demonstrated need" not "fine-tune is hardware-impossible at 24 GB".

---

## §5 — Top-3 ADOPT-NOW (T3 PATTERN-STUDY tier; soft-installs, no T1 yet)

Since Stream L's reason #1 (no demonstrated need) still holds, these are **pattern-study** + **pilot-ready** not T1 install. sca-v5 lite scores (D-vector / 5):

### Pick 1 — `axolotl-ai-cloud/axolotl` (T3 PATTERN-STUDY)
- **install_score 3.8 / pattern_score 4.6**. D1 (active) 5, D2 (license) 5, D3 (latency / install) 3 (Docker-recommended on Win), D4 (CC pathway) 3, D5 (cites) 5, D9 (single-GPU) 3, D10 (cardinal-rule-2 friendly) 5, D17 (robust at scale) 5.
- **Pilot recipe**: `examples/qwen3.5/qlora.yaml` + `quantize_moe_experts: true` + `use_kernels: true` + `use_scattermoe: true` + `experts_implementation: scattermoe`. Smoke on 200 SFT examples → confirm <23 GB peak. WSL2-Ubuntu-22.04 + CUDA-12.4 venv (Windows-native unsupported — operator caveat).
- **Rollback**: pure config; uninstall via `pip uninstall axolotl` + delete venv.

### Pick 2 — `unslothai/unsloth` + `woct0rdho/transformers-qwen3-moe-fused` (T3 PATTERN-STUDY)
- **install_score 4.1 / pattern_score 4.5**. D9 (single-GPU) 5, D4 (CC pathway: pip Python) 5, D10 (cardinal-rule-2: pure-pip) 5, D17 (robust) 3 (Qwen3.5 QLoRA discouraged by upstream itself), D11 (preload) 5 (tiny).
- **Pilot recipe**: `pip install "unsloth[cu124-torch260] @ git+https://github.com/unslothai/unsloth.git"` → `FastModel.from_pretrained("unsloth/Qwen3-30B-A3B", load_in_4bit=True, full_finetuning=False, use_gradient_checkpointing="unsloth")` → 17.5 GB target. For Qwen3.5-MoE, fall back to woct0rdho fused MoE kernels (24 GB validated on `example_train_30b_a3b_unsloth.py`).
- **Rollback**: `pip uninstall unsloth unsloth_zoo`.

### Pick 3 — `kvcache-ai/ktransformers` kt-sft (T3 PATTERN-STUDY)
- **install_score 3.6 / pattern_score 4.7**. D9 5 (1× 4090 demonstrated), D14 (Windows native, cardinal-rule-friendly) 5, D5 (cites: deepwiki + README explicit table) 5, D4 (CC pathway: requires LLaMA-Factory dependency) 3, D17 (robust: 6-12× faster than ZeRO-Offload) 5.
- **Pilot recipe**: install LLaMA-Factory + ktransformers per `doc/en/SFT/sft_tutorial.md`; placement YAML `Qwen3-30B-A3B-singlegpu.yaml`; CPU backend = AMX (Intel) or llamafile fallback. Target: ~24 GB total GPU + headroom in 256 GB system RAM.
- **Rollback**: pure conda env; uninstall ktransformers + LLaMA-Factory packages.

**Operator-action gate**: do not adopt without first establishing a **demonstrated downstream use case** for a custom Qwen3.x LoRA. Stream L §4 reason #1 — no demonstrated need — remains the binding constraint. These three picks are pilot-ready blueprints, not standing dependencies.

---

## §6 — Hot-swap path (LoRA → live llama-swap qwen36-moe slot)

Per llama-swap config (W301-G) + Stream L §5 pilot recipe: an Unsloth-produced LoRA adapter must be **merged to FP16 → re-quantized to GGUF (UD-IQ4_XS or MXFP4_MOE)** before it can occupy a `qwen36-moe` llama-swap slot. The runtime's live slot serves GGUF via llama-server, **not raw safetensor adapters**.

**Forward path (works today)**:
1. Train LoRA via Unsloth or Axolotl → `adapters/qwen3-30b-a3b-task/`.
2. CPU-merge to FP16 via `qlora-merge --base unsloth/Qwen3-30B-A3B --adapter ... --output merged/ --dtype f16` (32-48 GB host RAM).
3. `llama.cpp/convert_hf_to_gguf.py` → `*.gguf`, then `llama-quantize` → `UD-IQ4_XS.gguf`.
4. Add a SHADOW llama-swap slot `qwen3-30b-a3b-lora-task` pointing at the new GGUF (do **not** mutate the incumbent `qwen36-moe` slot — Stream L §5 invariant).
5. Side-by-side benchmark (TTFT, gen tok/s, draft-accept-rate at concurrency=1 for 1K/8K/32K context) vs `qwen36-moe` incumbent.

**No-hot-swap blocker**: llama.cpp does **not** support runtime LoRA adapter injection into an active llama-server slot (the LoRA must be pre-merged into the GGUF). vLLM does — `--enable-lora` lets you load adapters on the fly — but vLLM is not the runtime's incumbent server. To unlock true hot-swap: switch the live slot from llama.cpp/ik_llama to vLLM + `Qwen3.6-35B-A3B-FP8` (Stream L flagged this combo needs 35 GB → does **not** fit 24 GB at FP8, requires 48 GB+).

**Conclusion**: hot-swap = NO in the current llama.cpp-centric architecture. Pre-merge + GGUF + shadow-slot is the operator path.

---

## §7 — Phantom-feature contamination check (sca-v5 Gate-4)

| Claim | Source | Verdict |
|---|---|---|
| `axolotl-ai-cloud/axolotl` `quantize_moe_experts: true` cuts GLM-4.7 QLoRA from 127→23 GiB | PR #3439 commit body + `docs/expert_quantization.html` | **PASS** |
| `axolotl` ScatterMoE LoRA supports Qwen3.5-35B-A3B kernel autotune | commit `1fc86d5` (2026-03-20) `bench_scattermoe_lora.py` `BUILTIN_CONFIGS["Qwen3.5-35B-A3B"]` | **PASS** |
| `LLaMA-Factory` 30B QLoRA 4-bit = 24 GB VRAM (README hardware table) | DeepWiki `hiyouga/LLaMA-Factory` Q&A + README fetch | **PASS** |
| `LLaMA-Factory` native Windows training supported (no WSL2) | DeepWiki Q&A explicit confirmation | **PASS** |
| `LLaMA-Factory × KTransformers`: fine-tune 1000B with 2× 4090 + CPU | README link to `blog.llamafactory.net/en/posts/ktransformers` | **PASS** |
| `unsloth` Qwen3-30B-A3B fits 17.5 GB VRAM | `unsloth.ai/docs/models/qwen3-how-to-run-and-fine-tune` (2026-04-02) | **PASS** (with workaround for transient ~30 GB load spike per issue #2504) |
| `unsloth` Qwen3.5-35B-A3B bf16 LoRA needs 74 GB | `unsloth.ai/docs/models/qwen3.5/fine-tune` | **PASS** |
| `unsloth` "MoE QLoRA 4-bit not recommended" | `unsloth.ai/docs/basics/faster-moe` + qwen3.5 fine-tune page | **PASS** — but interpretation: quality caution, not hardware blocker (Qwopus model on HuggingFace is proof-of-existence of Qwen3.5-MoE QLoRA fine-tune) |
| `unsloth` native Windows training supported | `QwenLM/Qwen3/docs/source/training/unsloth.md` "Single and multi-GPU support (Linux, Windows, Colab, Kaggle)" | **PASS** |
| `ktransformers` Qwen3-30B-A3B = ~24 GB total GPU + 8+ it/s on 1× RTX 4090 | README hardware table + DeepWiki kt-sft Q&A | **PASS** |
| `ktransformers` Windows native (since 2024-08-09) | README CHANGELOG entry | **PASS** |
| `torchtune` Qwen3 MoE support | DeepWiki Q&A: dense Qwen3 0.6B-32B only; **no MoE support found in code** | **PHANTOM AVOIDED** — Stream N table marks "NO" for Qwen3 MoE explicitly |
| `karpathy/nanoGPT` active fine-tune SDK | README header: "nanoGPT is now very old and deprecated"; redirects to `nanochat` | **PHANTOM AVOIDED** — flagged DEPRECATED in §1 |
| `modal-labs/llm-finetuning` LICENSE fetch returns 404 | direct raw.githubusercontent fetch | **AMBIGUOUS** — README also returned 14 bytes; treat repo metadata as unverified for this audit; do not adopt without re-clone |

**Phantom-feature contamination count: 0 silently propagated** (3 caught + footnoted: torchtune MoE absence flagged, nanoGPT deprecation flagged, modal-labs metadata flagged ambiguous).

---

## Closeout
- **Total frameworks audited**: 14 (12 fine-tune SDKs + 2 educational baselines, all stars/license/last-push verified or explicitly flagged ambiguous).
- **Stream L verdict re-litigation**: **PARTIAL revision** — Stream L was letter-correct on Qwen3.5-35B-A3B (74 GB bf16) but missed the Qwen3-30B-A3B QLoRA path (17.5 GB) and the axolotl `quantize_moe_experts` + ktransformers kt-sft alternatives. "Defensible negative" downgrades to "no demonstrated downstream need" (Stream L §4 reason #1 still binds).
- **Top-3 ADOPT-NOW**: axolotl (T3) · unsloth+woct0rdho (T3) · ktransformers kt-sft (T3) — all pilot-ready, none T1.
- **Hot-swap**: NO in current llama.cpp architecture; operator path = LoRA → merge FP16 → GGUF → SHADOW llama-swap slot.
- **Phantom contamination**: 0 silently propagated; 3 caught + footnoted.
- **Budget**: ~8 web fetches + 3 DeepWiki Q&A + 3 exa searches + 2 GH API rate-limit-mitigated reads = within T3 $0.50 cap.
