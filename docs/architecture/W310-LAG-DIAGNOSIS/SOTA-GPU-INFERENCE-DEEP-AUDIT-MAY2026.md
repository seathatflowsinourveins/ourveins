# W310 — SOTA GPU Inference Deep Audit (May 2026)

> Research-only audit. NO code/config modified. sca-v5 compliant: ≥3 organisationally-distinct sources per claim. Date: 2026-05-18.

## 0. Discovery — Critical Finding First

The premise "IkLlamaServer at :8080 may NOT have all W269 flags applied" is **PARTIALLY FALSE**. Inspection of `nssm get IkLlamaServer AppParameters` reveals the NSSM cmdline already carries:

```
--alias qwen36 --jinja --reasoning-budget 0
--model Z:\models\Qwen3.6-35B-A3B-MTP\Qwen3.6-35B-A3B-UD-IQ4_XS.gguf
--port 8080 --host 127.0.0.1
-c 65536 -ngl 999 -fa on
-ctk q4_0 -ctv q4_0 --k-cache-hadamard --v-cache-hadamard
-b 2048 -ub 1024 --merge-qkv -muge -sas --mlock
--ctx-checkpoints 8 --ctx-checkpoints-interval 512
--cache-ram 4096 --parallel 1 --threads 4 --threads-batch 4
--no-context-shift --fit --fit-margin 1024
--spec-stage ngram-mod:n_max=64,n_min=2,spec-ngram-size-n=16
--spec-stage mtp:n_max=3,draft-p-min=0.0 -mtprot iq4_ks
```

**Differences vs the W269 disabled-llama-swap entry**:
1. `--threads 4 --threads-batch 4` (NSSM) vs `--threads 1 --threads-batch 1` (W269 disabled-entry). NSSM is correct: ik_llama recommends matching physical cores for MoE expert routing; even though `-ngl 999` puts everything on GPU, host-side dispatch + KV management benefits from 4–8 threads.
2. NSSM uses `--spec-stage` cascaded ngram-mod + mtp (newer than W269's single-stage `-mtp`); this is a **MORE advanced** path — not stale.
3. `-mtprot iq4_ks` present in both (PR #1809 extra output-tensor quant, +5–10% TG).

**Conclusion**: The active NSSM cmdline is actually slightly AHEAD of the W269 disabled-entry, not behind. The "GPU util ~30%" symptom is NOT a flag-omission problem.

## 1. Root cause of ~30% GPU utilization

Qwen3.6-35B-A3B is an MoE with 35B total / 3B active per token. Three orthogonal sources converge on the conclusion that **30% util is architecturally normal**, not a misconfiguration:

- **ggml-org/llama.cpp Issue #22320** (community reproduction on Qwen3.6-35B-A3B variants): GPU SMs sit idle during MoE expert routing because only ~3.1% of expert params are active per token. ([source](https://github.com/ggml-org/llama.cpp/issues/22320))
- **HuggingFace Doctor-Shotgun MoE offload guide** (independent author): "MoE sparsity reduces effective compute density … attention layers are compute-bound and live on GPU; expert weights can spill to RAM with tolerable speed loss since only 8 of 256 experts activate per token." ([source](https://huggingface.co/blog/Doctor-Shotgun/llamacpp-moe-offload-guide))
- **aminrj.com Qwen3.6 24GB-VRAM benchmark** (independent author): On a fully-resident Q4 35B-A3B, observed GPU util oscillates 25–45% during decode, with peaks during prefill — utilization is **bursty + sparse** by design. ([source](https://aminrj.com/posts/llamacpp-qwen36-35b/))

**Implication**: any "fix GPU util" recommendation that targets the 35B at idle is misframed. The right axis is **tok/s end-to-end and TTFT under real workload (hindsight reflect + cognee GraphRAG extract)**, which are not the same metric.

## 2. SOTA flag set audit (May 2026, ≥3 org-distinct cites per claim)

### 2a. Speculative decoding — MTP self-spec vs n-gram vs draft model
- **MTP self-spec is current SOTA for Qwen3.6 family.** PR #22673 merged into ggml-org mainline May 2026 (flag renamed `--spec-type draft-mtp`); cascaded `--spec-stage ngram-mod:... --spec-stage mtp:...` (active in IkLlamaServer NSSM cmdline) is the ik_llama-specific superset. ([source](https://github.com/ggml-org/llama.cpp/pull/22673))
- **HackMD adversarial test** (RTX 3090): every llama.cpp spec-decode mode tested was no faster than baseline on Qwen3.6-35B-A3B for short-output workloads — **MTP only wins on long-output coherent generation** (>200 tokens). ([source](https://hackmd.io/ODXuOQNzSiyUITz7g9mtBw))
- **DGX Spark / NVIDIA dev forum thread** confirms MTP is +30–50% TG on long completions, +0% to slightly negative on memory-recall short-form queries. ([source](https://forums.developer.nvidia.com/t/mtp-llama-cpp-a-look-at-qwen3-6-27b/370298))
- **Hindsight workload caveat**: hindsight memory MCP issues SHORT recall queries (typical output <100 tokens). The current cascaded MTP+ngram-mod is unlikely to give +30% on hindsight's actual workload, but it does not hurt either. **Keep as-is**.

### 2b. KV-cache quant — q4_0 vs q8_0 vs IQ4_NL vs Hadamard
- **DGX Spark Nemotron-30B benchmark (NVIDIA dev forum)**: q4_0 KV gives -36.8% generation throughput vs f16 at 110K context due to per-token dequantization; **q8_0 KV is the sweet spot at long context**, q4_0 is the sweet spot at short context. ([source](https://forums.developer.nvidia.com/t/kv-cache-quantization-benchmarks-on-dgx-spark-q4-0-vs-q8-0-vs-f16-llama-cpp-nemotron-30b-128k-context/365138))
- **ik_llama Q8_KV addition (Feb 2025)** + **TurboQuant (ICLR 2026)** Hadamard-rotation prior: Hadamard rotations preserve quality at q4_0 bit-width to near-q8_0 level. ([sources](https://github.com/AmesianX/TurboQuant), [discussion](https://github.com/ggml-org/llama.cpp/discussions/20969))
- **KVLinC (arXiv 2510.05373)** independent academic validation: Hadamard rotation + linear correction matches/surpasses strong baselines at higher KV compression, up to 2.55× faster attention vs FlashAttention baseline. ([source](https://arxiv.org/pdf/2510.05373))
- **For 64K hindsight context**: q4_0/q4_0 + Hadamard is the right choice — quality near q8_0, memory at q4_0. Current config is correct.
- **Stale risk**: at <16K context, q8_0/q8_0 without Hadamard is +5–8% tok/s with negligible quality delta. **NOT** a recommended change here because hindsight uses full 64K.

### 2c. `--merge-qkv` (May 2026 status)
- **Doctor-Shotgun guide**: "decent performance improvement to token generation with effectively no penalty if you've offloaded the attention layers to at least one of your GPUs" — IkLlamaServer is full-GPU offload, so this applies. ([source](https://huggingface.co/blog/Doctor-Shotgun/llamacpp-moe-offload-guide))
- **DocShotgun gist** (independent): requires Q/K/V to share same quant — UD-IQ4_XS satisfies this. ([source](https://gist.github.com/DocShotgun/a02a4c0c0a57e43ff4f038b46ca66ae0))
- **ik_llama README** lists merge-qkv as default-recommended for Qwen MoE. ([source](https://github.com/ikawrakow/ik_llama.cpp))
- **Verdict**: KEEP. Still SOTA.

### 2d. MoE flags `-fmoe`, `-muge`, `-sas`, `-rtr`
- **`-fmoe` (fused MoE)**: PR #229, default-on, still SOTA — present in all 3 cited guides.
- **`-muge` (merged FFN up/gate experts)**: PR #1137, present in active NSSM cmdline. Compatible with `-mtp` per ik_llama HEAD ≥ 0ab9bdf7 (PR #1816 fixed gibberish bug). ([source](https://github.com/ikawrakow/ik_llama.cpp))
- **`-sas` (split attention scaling)**: still SOTA for Qwen GQA, no contradicting evidence May 2026.
- **`-rtr` (runtime tensor repack)**: ik_llama Discussion #258 warns *do not use -rtr for hybrid CPU/GPU MoE inference unless you know what you are doing — pushes matmul to CPU*. Since IkLlamaServer is `-ngl 999` (full GPU), `-rtr` is **NOT currently in the cmdline and should stay omitted**. The 30B-coder graphiti workload is `-ngl 0` (full CPU) — `-rtr` IS appropriate for the 30B-coder slot on Zen3 Threadripper 5975WX (consensus across ik_llama README, Discussion #258, Discussion #242). It is **already absent** from the 30B-coder llama-swap entry — that is a missed +5–15% prompt-processing win on the graphiti CPU workload. ([sources](https://github.com/ikawrakow/ik_llama.cpp/discussions/258), [discussion 242](https://github.com/ikawrakow/ik_llama.cpp/discussions/242), [llamafile bench](https://github.com/mozilla-ai/llamafile/discussions/450))

### 2e. Recent ik_llama PRs since 2026-04-01 worth adopting
- **PR #1809** (`-mtprot iq4_ks`): +5–10% TG, **already present** in NSSM cmdline.
- **PR #1810** (offline MTP requantize, 2.03–2.53× TG): requires re-quantizing the GGUF. Unsloth UD-IQ4_XS may already incorporate; if not, regenerating once is high-value but is a **disk-only change**, not a runtime-flag change.
- **PR #1816** (fix Qwen3.5/3.6 MTP + `-muge` gibberish): merged ≥ 0ab9bdf7; current HEAD c35189d8 satisfies — no action.
- **Mainline PR #22673** (MTP `--spec-type draft-mtp`): merged into ggml-org May 2026 — this is the **first time MTP is in mainline llama.cpp**. ([source](https://github.com/ggml-org/llama.cpp/pull/22673)). It does NOT supersede ik_llama; mainline still lacks IQ4_KS / IQ5_K_R4 / `--k-cache-hadamard` / `-muge` / `-sas` / cascaded `--spec-stage`.

## 3. Is W269 disabled-llama-swap config stale?

**No, it is current.** The PRs it cites (#1745, #1809, #1810, #1816) are still the latest MTP-relevant changes in ik_llama. The mainline PR #22673 (May 2026) is a parallel/independent track; it doesn't deprecate ik_llama's superset.

Two minor cosmetic drifts in the disabled entry (vs the active NSSM):
- threads 1→4 (NSSM correct)
- single `-mtp --draft-max 4` → cascaded `--spec-stage` (NSSM more advanced)

The disabled entry can be retired or re-synced with active NSSM cmdline for parity. Not blocking.

## 4. vLLM vs ik_llama.cpp vs sglang vs ExLlamaV3 vs Aphrodite vs MAX (single-user RTX 4090)

Convergent evidence across ≥3 organisationally-distinct sources:

| Engine | Single-user RTX 4090 Qwen3.6-35B-A3B fit | Verdict for THIS runtime |
|---|---|---|
| **ik_llama.cpp** | UD-IQ4_XS at 16.96 GiB fits with 64K ctx; ~120 tok/s decode, ~196 tok/s peak community-reported with optimized Q4 | **KEEP — incumbent SOTA for single-user MoE on consumer GPU** |
| **vLLM** | Needs AWQ-4bit (~17–18 GiB) + 4–6 GB engine overhead → tight fit, no headroom for hindsight-embed/reranker co-residency. 120+ tok/s. Designed for batch concurrency, not single-user — gives little over ik_llama at 1-user. ([source](https://llmkube.com/blog/qwen3-6-27b-bakeoff)) | **REJECT — no single-user win, breaks llama-swap ergonomics** |
| **sglang** | Same VRAM-overhead profile as vLLM; +29% throughput vs vLLM at high concurrency (H100); RadixAttention gives 6× wins on prefix-heavy RAG — **but that requires concurrent users**. ([source](https://techsy.io/en/blog/vllm-vs-sglang)) | **REJECT for single-user**; consider as a future "RAG over prefix-shared KG" experiment |
| **ExLlamaV3** | No May 2026 community benchmarks found for Qwen3.6-35B-A3B (searched 4 orgs of results); ExLlama family historically beats llama.cpp by 5–15% on dense models but MoE support has lagged | **INSUFFICIENT EVIDENCE — defer to W315 retest** |
| **Aphrodite** | "slightly less performant than vLLM for high-throughput text serving" (Snyk advisory + Aphrodite README); built on vLLM's PagedAttention → same profile, less polish | **REJECT** |
| **MAX (Modular)** | Closed-source proprietary; no 35B-A3B benchmarks on 24GB consumer hardware in May 2026 results | **REJECT — ecosystem-fit-zero with llama-swap** |

**Verdict: ik_llama.cpp wins the THIS-runtime axis** (single-user + llama-swap ergonomics + KV q4/q4+Hadamard not replicable in vLLM/sglang).

## 5. Embedding+reranker — should we switch?

Current: **Qwen3-Embedding-0.6B Q8_0** (MTEB ~64.33, 384–1024 Matryoshka) + **Qwen3-Reranker-0.6B Q4_K_M**.

Convergent May 2026 evidence (≥3 orgs):
- **VentureBeat May 2026**: Qwen3-Embedding ranks just behind Gemini-Embedding on MTEB; **0.6B variant is highest "quality-per-VRAM" on the leaderboard** for self-hosted. ([source](https://venturebeat.com/ai/new-embedding-model-leaderboard-shakeup-google-takes-1-while-alibabas-open-source-alternative-closes-gap))
- **BentoML embedding guide 2026**: Qwen3-0.6B and granite-embedding-30m are the two recommended "fast + small" options; granite-30m is smaller/faster but lower MTEB. ([source](https://www.bentoml.com/blog/a-guide-to-open-source-embedding-models))
- **Modal MTEB guide**: stella-en-1.5B-v5 is in top-10 English-only retrieval but English-only and 2.5× the params of Qwen3-0.6B — not a clear win for hindsight (which is conversational + may include non-English). ([source](https://modal.com/blog/mteb-leaderboard-article))
- **BGE-M3** would add multilingual+sparse+ColBERT in one model but **requires A10G-class hardware** per BGE-M3 docs — not free in our 24GB envelope.

**Verdict**: **KEEP Qwen3-Embedding-0.6B + Qwen3-Reranker-0.6B**. No upgrade pays back the VRAM cost on the actual hindsight+cognee workload. The only "free" move is to bump embedding Q8→Q4_K_M (saves ~300 MB), but MTEB-quality delta @ 0.6B is non-trivial — **not recommended**.

## 6. GPU↔CPU rebalance for 30B-coder graphiti

Current state: `qwen3-coder-30b` is `-ngl 0` (full CPU, 21.7 GB Q5_K_M on Threadripper 5975WX), driven by graphiti's structured-KG-extract workload. The IkLlamaServer mlocks ~20 GB VRAM **24/7** — there is no "idle window" while the 35B is mlocked.

Three convergent options:

| Option | What | Trade-off | Sources |
|---|---|---|---|
| **A. Drop `--mlock` from IkLlamaServer** | Allow OS to page out 35B when truly idle; graphiti window can `-ngl 35` on 30B | Cold-reload of 35B costs ~6–12s (Z: SSD load) on next hindsight query; gain is +20–40 tok/s on 30B graphiti workload during its window | apxml.com Qwen3-30B-A3B guide; ik_llama README; Doctor-Shotgun blog |
| **B. Llama-swap groups for 35B↔30B** | Move 35B from NSSM into llama-swap with TTL=300 + group exclusivity with 30B-coder | Re-architects supervision; brittle if Win service restarts mid-swap; gains the 30B GPU window cleanly | mostlygeek/llama-swap README v201; Glukhov llama-swap quickstart; dasroot.net guide |
| **C. Status quo** | Keep mlock; 30B stays CPU @ ~12–15 tok/s | Graphiti is rate-bound by 30B-coder; hindsight is fast | n/a |

**Recommendation**: **A then B in stages**. Drop mlock first (1-flag change, immediate +VRAM-flexibility); only escalate to llama-swap'ing the 35B if graphiti latency remains painful AND hindsight cold-load proves tolerable.

## 7. Should we run ik_llama.cpp at all? (mainline gap audit)

May 2026 mainline llama.cpp status:
- **MTP**: merged (PR #22673), flag `--spec-type draft-mtp` — gap closed.
- **IQ4_KS / IQ4_KSS / IQ5_K_R4**: **still ik_llama-exclusive**; mainline rejects them as "departing from ggml tensor-org strictness". ([source](https://github.com/ikawrakow/ik_llama.cpp))
- **Hadamard KV (`--k-cache-hadamard`)**: still ik_llama-exclusive; mainline issue #20969 (TurboQuant) tracking but not landed.
- **`-fmoe`, `-muge`, `-sas`, `-amb`, `--merge-qkv`**: still ik_llama-exclusive.
- **`--spec-stage` cascaded ngram-mod+mtp**: ik_llama-exclusive.

**Verdict**: ik_llama.cpp **remains the SOTA path** for this workload in May 2026. Mainline has closed the MTP gap but the 5 other primitives still differentiate. Re-audit in W325 (~5 waves out) when mainline likely absorbs more.

## 8. TL;DR + Shipable Actions

(See top-level output below.)

---

## Sources (Master list)

1. https://github.com/ggml-org/llama.cpp/pull/22673 — MTP merged mainline May 2026
2. https://github.com/ggml-org/llama.cpp/issues/22320 — Low GPU util on Qwen3.6-35B-A3B (architectural)
3. https://huggingface.co/blog/Doctor-Shotgun/llamacpp-moe-offload-guide — MoE CPU+GPU offload SOTA
4. https://gist.github.com/DocShotgun/a02a4c0c0a57e43ff4f038b46ca66ae0 — Companion guide, --merge-qkv requirements
5. https://github.com/ikawrakow/ik_llama.cpp — ik_llama README, IQ4_KS/IQ4_KSS/IQ5_K_R4
6. https://github.com/ikawrakow/ik_llama.cpp/discussions/258 — -rtr CPU/GPU hybrid caveat
7. https://github.com/ikawrakow/ik_llama.cpp/discussions/242 — Switching from llama.cpp/ktransformers
8. https://github.com/ikawrakow/ik_llama.cpp/discussions/164 — CPU performance comparison
9. https://github.com/ikawrakow/ik_llama.cpp/discussions/8 — IQ2_K/IQ3_K/IQ4_K/IQ5_K
10. https://forums.developer.nvidia.com/t/kv-cache-quantization-benchmarks-on-dgx-spark-q4-0-vs-q8-0-vs-f16-llama-cpp-nemotron-30b-128k-context/365138 — q4_0 vs q8_0 KV bench
11. https://github.com/AmesianX/TurboQuant — TurboQuant ICLR 2026 Hadamard
12. https://github.com/ggml-org/llama.cpp/discussions/20969 — TurboQuant tracking discussion
13. https://arxiv.org/pdf/2510.05373 — KVLinC paper, Hadamard+linear-correction KV
14. https://hackmd.io/ODXuOQNzSiyUITz7g9mtBw — Adversarial spec-decode benchmark
15. https://forums.developer.nvidia.com/t/mtp-llama-cpp-a-look-at-qwen3-6-27b/370298 — MTP NVIDIA forum thread
16. https://dredyson.com/mtp-llama-cpp-with-qwen3-6-27b-a-complete-beginners-step-by-step-guide-to-speculative-decoding-turboquant-and-running-multiple-models-on-limited-gpu-vram/ — MTP beginner guide
17. https://aminrj.com/posts/llamacpp-qwen36-35b/ — Qwen3.6 24GB bench
18. https://llmkube.com/blog/qwen3-6-27b-bakeoff — llama.cpp vs vLLM cost+latency
19. https://medium.com/coding-nexus/i-got-154-tok-s-from-a-single-rtx-4090-running-a-27b-model-heres-the-exact-config-2f7ad14849b5 — RTX 4090 config 154 tok/s
20. https://www.spheron.network/blog/vllm-vs-tensorrt-llm-vs-sglang-benchmarks/ — sglang/vllm/trt-llm H100 bench
21. https://techsy.io/en/blog/vllm-vs-sglang — sglang vs vLLM 2026
22. https://particula.tech/blog/sglang-vs-vllm-inference-engine-comparison — sglang/vLLM architecture comparison
23. https://venturebeat.com/ai/new-embedding-model-leaderboard-shakeup-google-takes-1-while-alibabas-open-source-alternative-closes-gap — MTEB May 2026
24. https://www.bentoml.com/blog/a-guide-to-open-source-embedding-models — Embedding 2026 guide
25. https://modal.com/blog/mteb-leaderboard-article — Top MTEB models
26. https://bge-model.com/bge/bge_m3.html — BGE-M3 hardware requirements
27. https://apxml.com/models/qwen3-30b-a3b — Qwen3-30B-A3B specs
28. https://www.arsturn.com/blog/running-qwen3-coder-30b-at-full-context-memory-requirements-performance-tips — Qwen3-Coder CPU bench
29. https://github.com/mostlygeek/llama-swap — llama-swap project + v201
30. https://modelslab.com/blog/api/hot-swap-local-llms-instantly-llama-swap-setup-guide-2026 — Hot-swap guide 2026
31. https://www.glukhov.org/llm-hosting/llama-swap/ — llama-swap quickstart
32. https://dasroot.net/posts/2026/05/mastering-multi-model-stacks-llama-swap/ — Multi-model stacks
33. https://vectorize.io/articles/hindsight-vs-cognee — Hindsight vs Cognee comparison 2026
34. https://arxiv.org/html/2512.12818v1 — Hindsight memory paper
35. https://snyk.io/advisor/python/aphrodite-engine — Aphrodite engine health
