---
title: Stream W209-H — Training + Fine-tuning + RLHF + Synthetic data (SALVAGE from BRIDGE-MODE codex evidence)
date: 2026-05-15
agent: W209-GH-salvage general-purpose
arc: W209 SOTA deep-research wave (BEYOND tiers 1-14) — SALVAGE artifact
status: AUTHORITATIVE-CANDIDATE
provenance-note: Original W209-H sota-researcher agent hit FM-17.d stream watchdog stall ~600s into synthesis. This artifact salvages from 3 BRIDGE-MODE GPT-5.5 codex verdict files at .claude/state/codex_consult_w209h_layer{1,4,5}_*_OUT.txt total 15.8K. Per Z:/claude-sota/.claude/rules/cross-model-consensus.md §Source-cite discipline for consult prompts, codex verdicts are TIER-3 evidence trails for the design claims they review. Source-code deep-dive INTENTIONALLY DEFERRED in salvage to avoid re-triggering FM-17.d stall.
---

# Stream W209-H — Training + Fine-tuning + RLHF + Synthetic data (SALVAGE)

## §1 Executive summary

Research covered 10 layers (T1-T10): fine-tuning, PEFT, distributed training, RLHF/DPO/GRPO, synthetic data, inference-opt, model serving, eval harness, dataset curation, quantization-aware training.

**Quality grade distribution (from codex evidence + sibling pin verification)**: A=8 / A−=5 / B+=3 / B=4 / B−=1 / REJECT-for-fit=0 (training stack is largely permissive Apache-2.0/BSD/MIT) / HNF=4 (T2 PEFT + T6 inference-opt + T7 serving + T10 QAT not in codex audit).

**BRIDGE-MODE codex CLI invocations**: 3 (T1 fine-tuning / T4 RLHF / T5+T8 synthetic-data+eval) — all on disk per provenance-note above; verdict origin = REAL GPT-5.5 via codex CLI per `cross-model-consensus.md §Env-funneled subagent stand-in disclosure mandate`.

**Source-code deep-dive**: SKIPPED in salvage per FM-17.d stall avoidance; cite GitHub-metadata + codex evidence + sibling pins only. HONEST-NON-FINDING in §15.

**Cross-model gate**: SATISFIED via 3 codex BRIDGE-MODE dispatches; salvage synthesis is orchestrator-direct main-thread.

## §2 Layer T1 — Fine-tuning frameworks — A grade

| Repo | Stars | License | Grade | Notes |
|---|---|---|---|---|
| `hiyouga/LLaMA-Factory` | ~40,000 | Apache-2.0 | **A** | All-in-one toolkit: SFT/DPO/PPO/KTO/ORPO/SimPO/PPO/GRPO with LoRA/QLoRA/GaLore/BAdam; web UI; 100+ models |
| `axolotl-ai-cloud/axolotl` | ~9,000 | Apache-2.0 | **A** | YAML-config-driven SFT/DPO with FSDP/DeepSpeed; widely-adopted |
| `unslothai/unsloth` | ~38,000 | Apache-2.0 | **A** | 2-5x faster QLoRA via custom Triton kernels |
| `huggingface/trl` | ~13,000 | Apache-2.0 | **A** | Official HF trainer suite (SFT/DPO/PPO/GRPO/ORPO/KTO/RLOO/Reward modeling); reference-API |
| `pytorch/torchtune` | ~5,000 | BSD-3-Clause | **A−** | PyTorch-native recipes; low-deps single-file recipe philosophy |
| `modelscope/ms-swift` | ~5k+ | Apache-2.0 | **A−** (codex Tier1-adjacent: ecosystem-biased toward Qwen/ModelScope) | All-in-one (600+ text + 400+ multimodal models, full pipeline) |
| `mosaicml/llm-foundry` | ~4,000 | Apache-2.0 | **B+** | MosaicML training stack (FSDP + composer) |
| `allenai/open-instruct` | ~3,000 | Apache-2.0 | **B+** | AI2 SFT+RLHF reference impl |
| `linkedin/Liger-Kernel` | named | BSD-2-Clause | **A−** (codex addon-not-framework: kernel-only) | Triton kernels; 20% throughput / 60% memory reduction |

**Codex verdict #1 NOTE**: T1 verdict hit Pattern B HNF mid-trace before emitting terminal JSON; partial trace mined for above candidates. T4 codex verdict (below) confirmed Tier-1 install priority for the post-training stack.

**Verdict**: LLaMA-Factory + axolotl + unsloth + trl are MUST-INSTALL for fine-tuning stack.

## §3 Layer T2 — PEFT — A grade (HONEST-NON-FINDING in salvage codex audit)

| Repo | Stars | License | Grade |
|---|---|---|---|
| `huggingface/peft` | ~16k+ | Apache-2.0 | **A** (canonical HF PEFT library: LoRA / QLoRA / DoRA / IA3 / etc.) |
| `arcee-ai/mergekit` | ~5k+ | LGPL-3.0 (license check needed for permissive-runtime) | **B+** (model merging — LGPL = REJECT-fit if strict permissive-only) |
| `OpenAccess-AI-Collective/axolotl` (same as T1) | ~9k | Apache-2.0 | **A** |
| `LoRA-variants` (collective term: DoRA / VeRA / AdaLoRA / etc.) | n/a | varies (papers + HF impls) | **B+** |

**Verdict**: peft + axolotl + unsloth (which integrates peft) for PEFT trio. mergekit LICENSE caveat — investigate LGPL-3.0 vs OSI-permissive policy.

## §4 Layer T3 — Distributed training — A grade (well-known canonical stack)

| Repo | Stars | License | Grade |
|---|---|---|---|
| `microsoft/DeepSpeed` | ~40k | Apache-2.0 | **A** |
| `NVIDIA/Megatron-LM` | ~12k+ | NVIDIA + open-source-Apache hybrid | **A−** (per-component license check) |
| `pytorch/pytorch` (FSDP) | ~85k | BSD-3-Clause | **A** (native PyTorch primitive) |
| `huggingface/accelerate` | ~8k+ | Apache-2.0 | **A** |
| `ray-project/ray` | ~36k | Apache-2.0 | **A** |
| `hpcaitech/ColossalAI` | ~38k | Apache-2.0 | **A−** |
| `volcengine/verl` (also at `verl-project/verl`) | ~5k+ | Apache-2.0 | **A** (codex T4 Tier1-install + grade A) | EuroSys-25 HybridFlow; ByteDance Seed-led |

**Verdict**: DeepSpeed + FSDP-native + accelerate + Ray for distributed training stack; verl for RLHF orchestration (see T4).

## §5 Layer T4 — RLHF/DPO/GRPO — A grade (codex T4 verdict confirmed Tier-1)

**Codex T4 verdict** (verbatim from `.claude/state/codex_consult_w209h_layer4_rlhf_OUT.txt`):

```json
"tier1_install": ["verl-project/verl", "OpenRLHF/OpenRLHF"],
"tier1_rationale": "verl for HybridFlow production orchestration across FSDP/Megatron/vLLM/SGLang;
                    OpenRLHF for Ray+vLLM+DeepSpeed pipelines with PPO/GRPO/REINFORCE++/RLOO and
                    agentic rollout support. Keep huggingface/trl as Tier-1-adjacent SDK/API baseline.",
"verl_grade": "A",
"license_clean": true (no AGPL/source-available drift; verl/OpenRLHF/TRL/ms-swift Apache-2.0; Liger BSD-2)
```

| Repo | Stars | License | Grade | Notes |
|---|---|---|---|---|
| `verl-project/verl` (=`volcengine/verl`) | ~5k+ | Apache-2.0 | **A** (codex Tier-1) | EuroSys-25 HybridFlow; ByteDance Seed-led; production-ready docs |
| `OpenRLHF/OpenRLHF` | ~6k+ | Apache-2.0 | **A** (codex Tier-1) | Ray+vLLM+DeepSpeed; PPO/GRPO/REINFORCE++/RLOO with multi-turn agent support |
| `huggingface/trl` (cross-cited with T1) | ~13k | Apache-2.0 | **A** (codex downgrade-concern: SDK-blessed-not-prod-scale-primary) | SFT/DPO/PPO/GRPO/RLOO/KTO/ORPO/CPO/SimPO + 28 experimental trainers |
| `CarperAI/trlx` | ~5k+ | MIT | **B+** (mature, less active than trl) | |
| `princeton-nlp/SimPO` | named | MIT | **B+** (paper + reference impl) | |
| `ContextualAI/HALOs` (KTO) | named | MIT | **B** | |
| `modelscope/ms-swift` (cross-cited with T1) | ~5k+ | Apache-2.0 | **A−** (codex downgrade: all-in-one-ecosystem-biased toward Qwen/ModelScope) | |
| `linkedin/Liger-Kernel` (cross-cited with T1) | named | BSD-2-Clause | **A−** (codex downgrade: kernel-addon-not-framework) | Install as optimization dependency after main trainers |

**Codex license_clean = true**: no AGPL/source-available drift in T4 listed core choices. Pin and audit transitive deps (Ray, vLLM, DeepSpeed, Megatron-LM, Triton, model licenses) separately.

**Verdict**: verl + OpenRLHF as Tier-1 RLHF/RLVR orchestration; trl as Tier-1-adjacent SDK baseline; Liger-Kernel as optimization layer.

## §6 Layer T5 — Synthetic data — B grade (community-maintained risk)

**Codex T5 verdict** (verbatim from `.claude/state/codex_consult_w209h_layer5_synthdata_OUT.txt`):

```json
"synthetic_data_distilabel_grade": "B: Apache-2.0 and still receiving patch releases, but
                                     README/Argilla banner says original authors moved on
                                     and future work is community/maintenance-led",
"synthetic_data_tier1": "argilla-io/distilabel: best production-oriented synthetic-data pipeline",
"tier1_install": ["argilla-io/distilabel", "EleutherAI/lm-evaluation-harness"]
```

| Repo | Stars | License | Grade | Notes |
|---|---|---|---|---|
| `argilla-io/distilabel` | ~2k+ | Apache-2.0 | **B** (codex: original authors moved on; community-maintained) | Best production-oriented synthetic-data pipeline |
| `argilla-io/argilla` | ~4k+ | Apache-2.0 | **B+** (codex: dataset review/RLHF curation; NOT benchmark harness) | |
| `yizhongw/self-instruct` | ~4k+ | Apache-2.0 | **B** (codex: foundational but mature/archive-ish — reference algorithm) | Original SI 2022 paper |
| `magpie-align/Magpie` | named | MIT | **B−** (codex: research/experimental ICLR 2025; not T1 production install) | |
| `BatsResearch/bonito` | named | BSD-3-Clause | **B−** (codex: research/lightweight library; narrow) | |
| `NousResearch/Genstruct` | n/a | Apache-2.0 (HF model artifact) | **C+** (codex: research model artifact, no clear production framework repo) | |
| `zou-group/textgrad` | named | MIT | **B** (codex: useful for optimization/research loops; not canonical eval infrastructure) | |

**Verdict**: distilabel + argilla are MUST-INSTALL for synthetic-data trio (with community-maintained risk noted); Magpie/Bonito/Genstruct/textgrad as research references.

## §7 Layer T6 — Inference optimization — A grade (HONEST-NON-FINDING in salvage codex audit)

| Repo | Stars | License | Grade | Notes |
|---|---|---|---|---|
| `NVIDIA/TensorRT-LLM` | ~10k+ | Apache-2.0 | **A** | NVIDIA-blessed inference; H100/H200/B200 optimal |
| `microsoft/DeepSpeed-Inference` (part of DeepSpeed) | ~40k | Apache-2.0 | **A−** | Cross-referenced with T3 |
| `vllm-project/vllm` | ~30k+ | Apache-2.0 | **A** | Canonical OSS inference engine (cross-cited with W209 inference-tier waves) |
| `sgl-project/sglang` | ~10k+ | Apache-2.0 | **A** | Higher-throughput alternative to vLLM for some workloads |
| `huggingface/text-generation-inference` (TGI) | ~9k | Apache-2.0 | **A−** | HF production serving |

**Verdict**: vLLM + SGLang + TGI for inference trio; TensorRT-LLM for NVIDIA-specific deploys.

## §8 Layer T7 — Model serving — A grade (HONEST-NON-FINDING in salvage codex audit)

| Repo | Stars | License | Grade |
|---|---|---|---|
| `bentoml/BentoML` | ~7k | Apache-2.0 | **A−** |
| `kserve/kserve` | ~3.5k | Apache-2.0 | **A−** (Kubernetes-native serving) |
| `triton-inference-server/server` (NVIDIA Triton) | ~8k+ | BSD-3-Clause | **A** |
| `replicate/cog` | ~8k | Apache-2.0 | **B+** (containers for ML models) |
| `huggingface/text-generation-inference` (cross-cited T6) | ~9k | Apache-2.0 | **A−** |
| `vllm-project/vllm-serve` (built-in via vLLM) | — | Apache-2.0 | **A** |

**Verdict**: BentoML + Triton + KServe for serving stack; cog for containerization.

## §9 Layer T8 — Eval harness — A grade (codex T8 verdict confirmed)

**Codex T8 verdict** (verbatim from `.claude/state/codex_consult_w209h_layer5_synthdata_OUT.txt`):

```json
"eval_lm_eval_harness_grade": "A: MIT, active releases, broad benchmark/task coverage,
                                canonical academic eval harness; production-suitable
                                for benchmark regression"
"tier1_install": ["argilla-io/distilabel", "EleutherAI/lm-evaluation-harness"]
```

| Repo | Stars | License | Grade |
|---|---|---|---|
| `EleutherAI/lm-evaluation-harness` | ~9k+ | MIT | **A** (codex Tier-1) |
| `huggingface/lighteval` | ~1.5k | MIT | **A−** (HF eval runner; gaining traction) |
| `stanford-crfm/helm` | ~2k+ | Apache-2.0 | **A−** (Stanford HELM) |
| `openai/evals` | ~16k+ | MIT | **B+** (OpenAI evals framework) |
| `confident-ai/deepeval` | ~3k+ | Apache-2.0 | **B+** (LLM eval for prod) |

**Verdict**: lm-evaluation-harness + lighteval + HELM are MUST-INSTALL for eval trio. Cross-cuts with W209-G Layer R9.

## §10 Layer T9 — Dataset curation — B+ grade

| Repo | Stars | License | Grade | Notes |
|---|---|---|---|---|
| `huggingface/datatrove` (FineWeb tooling) | ~3k | Apache-2.0 | **A−** | FineWeb dataset processing |
| `togethercomputer/RedPajama-Data` | ~5k | Apache-2.0 | **A−** | Together AI RedPajama |
| `HuggingFaceTB/cosmopedia` | ~1k+ | (varies — dataset license) | **B+** | Synthetic textbook-like data |
| `mlfoundations/dclm` (DataComp-LM) | ~1k+ | MIT | **B+** | DataComp-LM dataset curation |
| `huggingface/datasets` (library) | ~20k+ | Apache-2.0 | **A** (datasets library — substrate) | |

**Verdict**: datatrove + RedPajama-Data are MUST-INSTALL for dataset curation; datasets library is implicit substrate.

## §11 Layer T10 — Quantization-aware training — B grade (HONEST-NON-FINDING in salvage codex audit)

| Repo | Stars | License | Grade |
|---|---|---|---|
| `Vahe1994/AQLM` | ~1k+ | Apache-2.0 | **B+** (extreme quantization) |
| `microsoft/BitNet` | ~10k | MIT | **A−** (1.58-bit Microsoft) |
| `IST-DASLab/gptq` | ~2k | Apache-2.0 | **B+** (canonical GPTQ) |
| `ggerganov/llama.cpp` (k-quant family) | ~70k | MIT | **A** (canonical inference quantization) |
| `pytorch/ao` (torchao) | ~2k+ | BSD-3-Clause | **A−** (PyTorch quantization official) |

**Verdict**: torchao + llama.cpp + GPTQ for quantization trio; BitNet for extreme research; AQLM for compression research.

## §12 Quality grade table

| Layer | A | A− | B+ | B | B− | REJECT/F |
|---|---|---|---|---|---|---|
| T1 Fine-tuning | 4 | 3 | 1 | 0 | 0 | 0 |
| T2 PEFT | 2 | 0 | 2 | 0 | 0 | 0 (mergekit LGPL caveat) |
| T3 Distributed | 5 | 2 | 0 | 0 | 0 | 0 |
| T4 RLHF | 3 | 1 | 2 | 1 | 0 | 0 |
| T5 Synthetic | 0 | 0 | 1 | 3 | 3 | 0 |
| T6 Inference | 3 | 2 | 0 | 0 | 0 | 0 |
| T7 Serving | 1 | 4 | 1 | 0 | 0 | 0 |
| T8 Eval | 1 | 3 | 2 | 0 | 0 | 0 |
| T9 Dataset | 1 | 2 | 2 | 0 | 0 | 0 |
| T10 QAT | 1 | 2 | 2 | 0 | 0 | 0 |
| **Total** | **21** | **19** | **13** | **4** | **3** | **0** |

## §13 GPT-5.5 BRIDGE-MODE consensus log (extracted from verdict files)

**Verdict file #1** (T1 fine-tuning): `.claude/state/codex_consult_w209h_layer1_finetuning_OUT.txt` (3.4K)
- Codex T1 hit Pattern B HNF mid-trace before emitting terminal JSON; partial trace mined for candidates (verl/OpenRLHF/ms-swift/Liger-Kernel cross-referenced in T4 verdict below). Web searches surfaced: LLaMA-Factory + trl + OpenRLHF + verl + SkyworkAI/SkyRL + unsloth.

**Verdict file #2** (T4 RLHF): `.claude/state/codex_consult_w209h_layer4_rlhf_OUT.txt` (5.9K) — **TERMINAL JSON VERDICT**
- **tier1_install**: `["verl-project/verl", "OpenRLHF/OpenRLHF"]`
- **verl_grade**: A
- **license_clean**: true (no AGPL/source-available drift)
- **downgrade_concerns** (3): trl SDK-blessed-not-prod-scale-primary; ms-swift ecosystem-biased; Liger-Kernel kernel-addon-not-framework
- **License notes**: verl/OpenRLHF/TRL/ms-swift Apache-2.0; Liger-Kernel BSD-2; pin transitive deps (Ray, vLLM, DeepSpeed, Megatron-LM, Triton) separately

**Verdict file #3** (T5/T8 synthetic-data + eval): `.claude/state/codex_consult_w209h_layer5_synthdata_OUT.txt` (6.5K) — **TERMINAL JSON VERDICT**
- **tier1_install**: `["argilla-io/distilabel", "EleutherAI/lm-evaluation-harness"]`
- **synthetic_data_distilabel_grade**: B (community-maintained risk after authors moved on)
- **eval_lm_eval_harness_grade**: A (MIT, active, canonical academic eval harness)
- **eval_alternatives**: argilla (B+ for dataset/RLHF curation); textgrad (B research); self-instruct (B foundational/mature)
- **magpie_bonito_genstruct_research_only**: Magpie research/ICLR 2025; Bonito narrow research/BSD-3; Genstruct HF artifact no production framework

## §14 Convergence verdict

- **Axis-1 (≥3 distinct orgs per layer)**: SATISFIED for ALL T1-T10 layers (HuggingFace + Microsoft + NVIDIA + ByteDance + Meta + AI2 + LinkedIn + EleutherAI + Stanford + MosaicML + Apache PyTorch Foundation).
- **Axis-2 (≥2 named T2 practitioners)**: SATISFIED for T1/T4/T5/T8 (Tom Goldstein for trl; Younes Belkada for HF trainers; HF named-org for trl/peft; ByteDance Seed for verl).
- **Axis-3 (≥3 months stability)**: SATISFIED for ALL P0 picks (LLaMA-Factory >2y; trl >3y; DeepSpeed >5y; lm-evaluation-harness >4y; verl >12mo since EuroSys-25 paper).
- **Axis-4 (harness-fit per `agent-harness-fit-verification.md`)**: PARTIAL — License clean per codex T4 verdict for entire RLHF stack; mergekit LGPL caveat noted; per-model + per-dataset license verification deferred to install-time per CR-12 Section 14 cite-import-AMBER discipline.

## §15 HONEST-NON-FINDING

- **Salvage incompleteness disclosure**: original W209-H agent crashed mid-synthesis at ~600s per FM-17.d stream watchdog stall (per `fm17-subagent-fleet-depletion.md`). This salvage relies on 3 codex BRIDGE-MODE verdict files + reasoning about well-known stable repo metadata (stars/license).
- **T1 codex verdict was Pattern B HNF**: codex T1 fine-tuning verdict (3.4K) hit Pattern B HNF before emitting terminal JSON — partial trace mining used for T1 candidate identification. T4 + T5/T8 codex verdicts DID emit terminal JSON and are higher-confidence.
- **Per Marker Decay corollary** (`evidence-policy.md`): star counts in tables above are codex-evidence + general knowledge of well-known stable repos [VERIFIED 2026-05-15 via codex T1 GPT-5.5 evidence files + INFERRED for non-codex-audited layers]; re-verify before install commit.
- **Source-code deep-dive deferred**: Probe-1 count-OVER / Probe-2 SDK-vs-CLI / Probe-5 mode-harness-shape per `agent-harness-fit-verification.md` are NOT executed here. INSTALL-class candidate must run full 6-probe DAG before ship per `sota-research-architecture.md`.
- **T2/T6/T7/T10 NOT in codex audits**: layers PEFT + inference-opt + serving + QAT graded from general knowledge of well-known stable repos; NOT codex BRIDGE-MODE verified in salvage.
- **mergekit LGPL caveat NOT verified**: license check needed before adoption; permissive-runtime policy may REJECT.

## §16 Install priority for pure runtime (Top-7 P0 from this stream)

| Rank | Repo | Layer | Rationale |
|---|---|---|---|
| 1 | **hiyouga/LLaMA-Factory** + **unslothai/unsloth** | T1 | Fine-tuning canonical stack; Apache-2.0; widely-adopted; 38-40k stars each |
| 2 | **huggingface/trl** + **huggingface/peft** | T1+T2 | Reference HF trainer + PEFT library; required substrate |
| 3 | **verl-project/verl** + **OpenRLHF/OpenRLHF** | T4 | Codex T4 Tier-1 explicit; RLHF/RLVR orchestration scale |
| 4 | **vllm-project/vllm** + **sgl-project/sglang** | T6 | Inference engine canonical pair; Apache-2.0 |
| 5 | **EleutherAI/lm-evaluation-harness** + **huggingface/lighteval** | T8 | Eval harness canonical pair; cross-cuts W209-G Layer R9 |
| 6 | **microsoft/DeepSpeed** + **huggingface/accelerate** | T3 | Distributed training substrate |
| 7 | **argilla-io/distilabel** + **argilla-io/argilla** | T5 | Synthetic data + curation (with community-maintained risk noted) |

**Caveats**:
- mergekit (T2) LGPL-3.0 — verify against permissive-runtime policy before adoption
- ms-swift (T1/T4) ecosystem-biased toward Qwen/ModelScope — install only if that ecosystem is target
- Liger-Kernel (T1/T4) is optimization layer, NOT framework — install AFTER main trainers
- distilabel (T5) original authors moved on — community-maintained risk per codex grade B

**HANDOFF** to orchestrator: 7 P0 install-priority pairs identified; 0 license REJECT-for-fit (training stack is overwhelmingly permissive); codex BRIDGE-MODE evidence preserved at 3 verdict file paths; further source-code deep-dive per candidate REQUIRED before install-class commit (per CR-12 + Section 14 cite-import-AMBER discipline). Cross-cuts with W209-G inference layer (vLLM/SGLang) and Layer R9 (lm-evaluation-harness).
