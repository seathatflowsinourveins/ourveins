# SOTA Fine-Tuning Platform Research — Workload-First Assessment

> Research deliverable for `LOCAL-COMPUTE-AUDIT-2026-05-17.md`. Produced by the `psr-finetune` sota-researcher agent (2026-05-17) — 6+ source families, 5-phase protocol. Persisted by the orchestrator.

## §0 Scope

The operator asked for "a SOTA fine-tune platform from SOTA repos." The runtime's W259 catalog already DECLINED this at layer L0.7 (`W259-SHIP-DECISIONS.md:54` — *"DECLINED — defer-skeleton; no fine-tune workload at solo scale"*). The decisive question is therefore the **workload question** — does a genuine fine-tuning workload exist here at all?

**Runtime ground truth (verified directly):**

| Fact | Evidence |
|---|---|
| GPU = single RTX 4090, 24564 MiB VRAM | `nvidia-smi` |
| Local inference = `ik_llama.cpp`, `llama-server.exe` | filesystem |
| `Z:/models/` = 264 GB, all stock GGUF downloads (HuggingFace `.cache/download/*.metadata` present) | `find` + `du` |
| **Zero operator-fine-tuned artifacts** — no `*tuned*`, no LoRA adapters, no `datasets/` corpus | `find` sweep |
| **Zero fine-tuning commits** in 892-commit history | `git log --all --grep` |
| `hindsight` fact-extraction LLM = Claude (`HINDSIGHT_LLM_PROVIDER=claude-code`), not the local 35B | manifest |
| `graphiti` uses Ollama `qwen3-embedding:0.6b` for embeddings | manifest §4.5 |

**The operator has never fine-tuned anything.**

## §1 The Workload Assessment (decisive)

**R0 hypothesis:** *"This Claude Code harness on a single RTX 4090 has a genuine fine-tuning workload that justifies adopting a SOTA fine-tuning platform."*

### Per-candidate-workload verdict

**(a) Fine-tune the local embedder for the runtime's domain** — NOT-JUSTIFIED. Embedding fine-tuning yields +7–30% on domain retrieval, but needs a labeled (query, positive-passage) dataset of thousands of pairs; the operator has raw text but no retrieval-relevance labels, and Qwen3-Embedding-4B is already near MTEB SOTA. Becomes justified only if graphiti retrieval is *measurably* failing on domain queries (it is not).

**(b) Small specialized model for graphiti/hindsight fact-extraction** — NOT-JUSTIFIED for this runtime. Technically the strongest candidate (fine-tuned 3–8B models beat GPT-4-class on triple extraction by 15–20 F1, only 200–500 examples needed — peer-reviewed, PMC12237976). But fatal here: fact-extraction is **already done by Claude** (`HINDSIGHT_LLM_PROVIDER=claude-code`), not a local model. There is no local extraction model to improve. Revisit only if extraction deliberately moves off Claude onto local hardware.

**(c) Draft model for speculative decoding of the 35B MoE** — NOT-JUSTIFIED. You do not need to fine-tune for it — ik_llama.cpp speculative decoding works with off-the-shelf small models. And (per the inference-research stream) draft-spec is net-negative on A3B MoE anyway; MTP is the right lever and needs no training.

**(d) Routing/classifier model** — NOT-JUSTIFIED. This harness's routing is Claude Code's own model-precedence + the codex cross-model gate — declarative config, not an ML classifier.

**(e) LoRA-adapt the local LLM on the operator's codebase** — NOT-JUSTIFIED, partly counter-productive. A codebase is retrieval data, not instruction data — the wrong shape for LoRA. The runtime's 5-tier memory stack already does "make the model know this codebase" via retrieval; fine-tuning would duplicate it worse.

### §1 conclusion — hypothesis REJECTED

**No compelling fine-tuning workload exists in this runtime today.** Every candidate fails on the same two reasons: (1) no training data of the right shape exists (the operator has retrieval data, not labeled pairs / instruction examples); (2) the active pipelines don't route through a local model fine-tuning would improve (extraction = Claude, routing = config, codebase-knowledge = the memory stack). **The W259 DECLINE was correct and remains correct.**

## §2 Platform Benchmark (conditional — reference-grade, not a call to install)

| Platform | Stars | License | Native Windows? | GGUF export? | Maintained? |
|---|---|---|---|---|---|
| **unslothai/unsloth** | 64,414 | Apache-2.0 (core) | official path exists but fragile (issue #2395 "3-day struggle"); WSL2 more reliable | **Yes** (`save_to_gguf`, LoRA→GGUF) | Yes (daily) |
| **hiyouga/LLaMA-Factory** | 71,327 | Apache-2.0 | Yes (documented) | Yes (via ktransformers) | Yes (daily; has a `qwen3_6` template) |
| **axolotl-ai-cloud/axolotl** | 11,923 | Apache-2.0 | No — WSL2/Docker only | No documented GGUF export | Yes |
| **pytorch/torchtune** | 5,755 | BSD-3 | n/a | partial | **NO — officially wound down** |

**Verified verdicts:** `torchtune` is dead (README banner verbatim: *"Torchtune is no longer actively maintained"*, commit #2961, 2026-04-23) — **this RETRACTS the W259 LAYER-E §4.8 recommendation** which still lists torchtune in its operator top-3. Unsloth GGUF export for Qwen3/MoE verified (`save.py` + `mapper.py` includes `35-A3B`). Unsloth "native Windows" is real but high-friction — WSL2 is the de-facto path. 24 GB feasibility: all sources agree a 4090 comfortably QLoRA-fine-tunes ≤14B; a 30–34B model needs 24–32 GB (at/over the single-4090 ceiling).

**Converged pick (if a workload ever materializes): Unsloth, run under WSL2** — 64k stars, daily commits, Apache-2.0, first-class `save_to_gguf` + LoRA→GGUF (the runtime's `ik_llama.cpp` toolchain demands this). LLaMA-Factory is the legitimate runner-up (broadest coverage, better native-Windows, explicit Qwen3.6 support). Axolotl REJECTED (no GGUF export = fails the harness-fit hard requirement). torchtune REJECTED (wound down).

## §3 The Honest Defer + Trigger Conditions

**The W259 L0.7 DECLINE stands. Recommendation: keep deferred.** Fine-tuning is a solution without a problem in this runtime.

**Triggers — any ONE flips the verdict to ADOPT:**
1. Fact-extraction moves off Claude onto local hardware (most likely trigger) → a fine-tuned 4–8B extractor becomes the strongest workload.
2. A measured retrieval failure with a labeled (query,passage) eval set → embedder fine-tuning justified.
3. ≥500 curated examples of a repeated structured task appear → data-of-the-right-shape is the gate every candidate currently fails.
4. ik_llama.cpp lands EAGLE-3 GGUF support AND off-the-shelf draft acceptance measures <0.5.

## §4 Disposition

| Item | Disposition |
|---|---|
| Fine-tuning *workload* for this runtime | **DEFER** (unchanged — R0 REJECTED) |
| Unsloth (platform) | **STUDY** — the verified converged pick if/when a trigger fires; run under WSL2 |
| LLaMA-Factory | **STUDY** — co-equal runner-up |
| Axolotl | **REJECT** — no GGUF export |
| torchtune | **REJECT** — officially wound down |
| Catalog correction | **ACTION** — W259 `LAYER-E` fine-tune doc still lists torchtune in its top-3; stale, recommend the W259-v16 arc amend it |

## Sources

torchtune wind-down (README + issue #2883); Unsloth Windows install docs + issue #2395; LanceDB + Modal embedding-fine-tune guides; PMC12237976 (peer-reviewed KG-construction fine-tuning study); Particula data-requirements guide; llama.cpp Discussion #15902 (EAGLE-3); BentoML + vLLM speculative-decoding writeups. Platform stars/licenses verified via `gh` CLI 2026-05-17.
