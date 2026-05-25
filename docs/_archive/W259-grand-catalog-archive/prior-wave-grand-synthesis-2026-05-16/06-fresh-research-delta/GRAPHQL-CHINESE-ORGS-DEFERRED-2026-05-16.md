# GRAPHQL-CHINESE-ORGS-DEFERRED — 8-Org Deep Probe — 2026-05-16

> Sweeps the 5 orgs explicitly DEFERRED in fix16 HONEST-NON-FINDING (paddlepaddle, deepseek-ai, internlm, modelscope, mindspore-ai) plus 2 academic (THUDM continued + SJTU-IPADS) and 1 frontier (QwenLM). All probes via `gh search repos --owner=ORG --sort=stars --limit=20` 2026-05-16. Cross-checked against THE-GRAND-CATALOG-PART1/PART2/PART3, GRAPHQL-CHINESE-MULTILANG, GRAPHQL-HARDWARE-RUNTIME, DEEP-SAT-L025/L4. Status legend: KNOWN=already-cataloged; NEW=net-new; PARTIAL=mentioned-in-wave-archive-only.

---

## Section 1 — PaddlePaddle (Baidu's AI org)
> Probe returned 20 repos · 4 NEW (≥1k) · 16 KNOWN (saturated since pre-W253).

| Repo | Stars | License | Archived | Push | Layer | Verdict | STATUS |
|---|---:|---|---|---|---|---|---|
| PaddleOCR | 77,948 | Apache-2.0 | no | 2026-05-14 | L25-OCR | INSTALL-candidate (PDF→data for LLMs) | KNOWN |
| Paddle (framework) | 23,889 | Apache-2.0 | no | 2026-05-16 | L05-framework | REJECT (non-CC orthogonal; PyTorch saturates) | KNOWN |
| PaddleDetection | 14,205 | Apache-2.0 | no | 2026-03-19 | L25 vision | REJECT | KNOWN |
| PaddleFormers | 12,988 | Apache-2.0 | no | 2026-05-16 | L05 LLM zoo | REJECT (HF Transformers saturates) | **NEW** |
| PaddleNLP | 12,941 | Apache-2.0 | no | 2025-12-17 | L05 NLP | REJECT | KNOWN |
| PaddleSpeech | 12,599 | Apache-2.0 | no | 2026-05-07 | L25 speech | STUDY-NICHE | KNOWN |
| PaddleSeg | 9,327 | Apache-2.0 | no | 2026-02-05 | L25 seg | REJECT | KNOWN |
| ERNIE | 7,717 | Apache-2.0 | no | 2026-01-04 | L05 LLM | REJECT | KNOWN |
| Paddle-Lite | 7,256 | Apache-2.0 | no | 2026-04-27 | L025 edge inf | REJECT (TFLite/MNN saturate) | KNOWN |
| PaddleX | 6,140 | Apache-2.0 | no | 2026-05-13 | L05 ML pipeline | REJECT | KNOWN |
| PaddleClas | 5,805 | Apache-2.0 | no | 2026-04-01 | L25 cls | REJECT | KNOWN |
| FastDeploy | 3,684 | Apache-2.0 | no | 2026-05-15 | L025 LLM/VLM serving | **STUDY-PILOT** (Baidu high-perf inference toolkit) | **NEW** |

**Saturation note**: PaddleOCR is the only S-tier candidate; everything else is framework-vendor-lock to Paddle (non-portable). FastDeploy ★3,684 is the one new layer-L025 entrant worth probing vs vLLM/SGLang/TGI; PaddleFormers ★12,988 is HF-Transformers-equivalent for Paddle (non-portable).

---

## Section 2 — deepseek-ai
> Probe returned 20 repos · **7 NEW (≥1k) infra primitives** · 8 KNOWN (model weights repos) · 5 PARTIAL.

| Repo | Stars | License | Archived | Push | Layer | Verdict | STATUS |
|---|---:|---|---|---|---|---|---|
| DeepSeek-V3 (model) | 103,545 | MIT | no | 2025-08-28 | L05 model | KNOWN (model weights only) | KNOWN |
| DeepSeek-R1 (model) | 92,012 | MIT | no | 2025-06-27 | L05 reasoning model | KNOWN | KNOWN |
| awesome-deepseek-integration | 37,405 | NULL | no | 2026-02-23 | L0-meta list | REJECT (link aggregator) | **NEW** |
| DeepSeek-Coder | 23,371 | MIT | no | 2025-11-11 | L05 code model | KNOWN | KNOWN |
| **DeepSeek-OCR** | **23,131** | MIT | no | 2026-01-27 | **L25 OCR / context compression** | **INSTALL** (Contexts Optical Compression — claim: 10× context shrink via visual encoding; SOTA-candidate, BEATS PaddleOCR on context-compression axis) | **NEW-P0** |
| Janus (multimodal) | 17,730 | MIT | no | 2025-02-01 | L25 VLM | KNOWN | KNOWN |
| **FlashMLA** | **12,652** | MIT | no | 2026-04-30 | L025 attention kernel | **STUDY-PILOT** (Hopper FP16/BF16 MLA — embedded in vLLM/SGLang already; primitive-level) | **NEW** |
| **3FS** | **9,896** | MIT | no | 2026-05-07 | L065 distributed FS | **STUDY-NICHE** (DFS for AI training/inference; ops-tier, not CC-orchestration) | **NEW** |
| **DeepEP** | **9,629** | MIT | no | 2026-05-13 | L025 expert-parallel comm | **STUDY-PILOT** (MoE all-to-all kernel; primitive for SGLang/vLLM MoE serving) | **NEW** |
| open-infra-index | 7,994 | NULL | no | 2025-05-15 | L0-meta | REJECT (org's open-infra index page) | KNOWN |
| **DeepGEMM** | **7,261** | MIT | no | 2026-05-13 | L025 FP8 GEMM | **STUDY-PILOT** (FP8 fine-grained scaling — embedded in CUTLASS-derivatives) | **NEW** |
| DeepSeek-LLM | 6,909 | MIT | no | 2024-02-04 | L05 v1 model | KNOWN | KNOWN |
| DeepSeek-Coder-V2 | 6,753 | MIT | no | 2025-11-11 | L05 code model | KNOWN | KNOWN |
| DeepSeek-VL2 | 5,284 | MIT | no | 2025-02-26 | L25 VLM | KNOWN | KNOWN |
| DeepSeek-V2 | 5,009 | MIT | no | 2024-09-25 | L05 v2 model | KNOWN | KNOWN |
| **smallpond** | **4,952** | MIT | no | 2025-03-05 | L1-data | **STUDY-NICHE** (DuckDB+3FS lightweight data framework — niche vs DuckDB direct) | **NEW** |
| **Engram** | **4,404** | Apache-2.0 | no | 2026-01-14 | L02 memory primitive | **STUDY-PILOT** (Conditional Memory via Scalable Lookup — new sparsity axis for LLMs; potentially layer-L02-novel memory primitive) | **NEW-P0** |
| DeepSeek-VL | 4,105 | MIT | no | 2024-04-24 | L25 VLM v1 | KNOWN | KNOWN |
| DeepSeek-Math | 3,280 | MIT | no | 2024-04-15 | L05 math model | KNOWN | KNOWN |
| DreamCraft3D | 3,005 | MIT | no | 2025-04-22 | L25 3D-gen | REJECT (off-domain) | KNOWN |
| DeepSeek-OCR-2 ("Visual Causal Flow") | 2,849 | NULL | no | 2026-02-03 | L25 follow-up | STUDY-PILOT (newer OCR variant) | **NEW** |
| DualPipe | 2,954 | NULL | no | 2026-01-14 | L025 pipeline-parallel | STUDY-NICHE (training-only primitive) | **NEW** |

**Saturation note**: DeepSeek is the **highest-density NEW-primitive org of the 8 probed** — 7 net-new ≥1k★ infrastructure primitives (DeepSeek-OCR, Engram, 3FS, DeepEP, DeepGEMM, FlashMLA, smallpond) all MIT/Apache-2.0, all push-fresh (≤6 months). Most are PRIMITIVE-LEVEL (FlashMLA / DeepGEMM / DeepEP get embedded in vLLM/SGLang upstream — orchestration-layer doesn't install them directly). **DeepSeek-OCR + Engram are the two true layer-NEW additions for THE-GRAND-CATALOG.**

---

## Section 3 — InternLM (Shanghai AI Lab)
> Probe returned 20 repos · 0 NEW above-threshold not-yet-cataloged · 4 KNOWN-S-tier · 16 PARTIAL/sub-1k.

| Repo | Stars | License | Archived | Push | Layer | Verdict | STATUS |
|---|---:|---|---|---|---|---|---|
| lmdeploy | 7,855 | Apache-2.0 | no | 2026-05-14 | L025 serving | **STUDY-PILOT** (already DEEP-SAT-L025 row 31: 60/80; TurboMind backend, INT4 AWQ SOTA on InternLM/Qwen) | KNOWN |
| InternLM (model) | 7,209 | Apache-2.0 | no | 2025-10-30 | L05 model | KNOWN (model weights) | KNOWN |
| MindSearch | 6,856 | Apache-2.0 | no | 2025-07-04 | L3 search-agent | STUDY-PILOT (Perplexity-clone multi-agent search) | **NEW** |
| xtuner | 5,129 | Apache-2.0 | no | 2026-05-15 | L05 training | KNOWN (BACKLOG-TRANCHE-D 25/80; MoE post-train, non-CC) | KNOWN |
| InternLM-XComposer | 2,923 | NULL | no | 2025-05-26 | L25 multimodal | REJECT (vision-streaming) | KNOWN |
| HuixiangDou | 2,489 | NULL | no | 2025-11-24 | L3 chat-RAG | STUDY-NICHE (group-chat tech assistant) | **NEW** |
| lagent | 2,247 | Apache-2.0 | no | 2026-05-13 | L3 agent-fw | KNOWN (BACKLOG-TRANCHE-F 41/80 REJECT — default catchall) | KNOWN |
| Tutorial | 1,956 | NULL | no | 2026-04-22 | L0-edu | REJECT (course material) | KNOWN |

**Saturation note**: lmdeploy is the primary keep (already in DEEP-SAT-L025 STUDY-PILOT). MindSearch ★6,856 is a Perplexity-clone but multi-agent layer-L3 — niche vs LangGraph/Smolagents. Nothing here is L02/L04 layer-NEW.

---

## Section 4 — modelscope (Alibaba HF-equivalent)
> Probe returned 20 repos · 3 NEW (≥1k) · 17 KNOWN.

| Repo | Stars | License | Archived | Push | Layer | Verdict | STATUS |
|---|---:|---|---|---|---|---|---|
| FunASR | 16,087 | MIT | no | 2026-03-17 | L25 ASR | STUDY-NICHE (Chinese-strong ASR; whisper saturates EN) | KNOWN |
| ms-swift | 14,142 | Apache-2.0 | no | 2026-05-16 | L05 train | STUDY-NICHE (PEFT/SFT/DPO/GRPO across 600+ LLMs) | KNOWN |
| DiffSynth-Studio | 12,412 | Apache-2.0 | no | 2026-05-15 | L25 diffusion | REJECT (image-gen, non-CC) | KNOWN |
| facechain | 9,492 | Apache-2.0 | no | 2025-06-06 | L25 digital-twin | REJECT | KNOWN |
| modelscope (hub) | 8,937 | Apache-2.0 | no | 2026-05-15 | L0-hub | REJECT (HuggingFace saturates EN ecosystem) | KNOWN |
| ms-agent | 4,258 | Apache-2.0 | no | 2026-04-15 | L3 agent-fw | KNOWN (BACKLOG-TRANCHE-H 62/80 INSTALL) | KNOWN |
| evalscope | 2,798 | Apache-2.0 | no | 2026-05-15 | L4 eval | KNOWN (DEEP-SAT-L4 STUDY) | KNOWN |
| **AgentEvolver** | **1,435** | Apache-2.0 | no | 2026-04-01 | L3 self-evolving | **STUDY-PILOT** (Alibaba self-evolving agent system — fresh, push-active) | **NEW** |
| **sirchmunk** | **1,106** | Apache-2.0 | no | 2026-05-15 | L02 streaming-intelligence | **STUDY-PILOT** (raw data → self-evolving intelligence real-time — novel L02-adjacent primitive) | **NEW** |
| modelscope-classroom | 1,399 | NULL | no | 2026-04-27 | L0-edu | REJECT (course material) | **NEW** |

**Saturation note**: Two genuinely-novel layer-NEW candidates: AgentEvolver (self-evolving agents) + sirchmunk (real-time streaming intelligence). Both Apache-2.0, both push-2026-fresh. Worth probing for cross-overlap with Letta/Mem0 self-evolution patterns.

---

## Section 5 — mindspore-ai (Huawei DL framework)
> Probe returned 20 repos · **0 NEW above-threshold** · 1 KNOWN-mid · 19 sub-1k stagnant.

| Repo | Stars | License | Archived | Push | Layer | Verdict | STATUS |
|---|---:|---|---|---|---|---|---|
| mindspore | 4,688 | Apache-2.0 | no | 2024-07-29 | L05 framework | REJECT (Huawei-Ascend-bound; non-portable; **last-push 2024-07 = ABANDONED on this hub**) | KNOWN |
| models | 365 | NULL | no | 2023-07-17 | L05 zoo | REJECT (stale) | KNOWN |
| akg | 252 | NULL | no | 2026-05-09 | L025 kernel-gen | REJECT (Ascend-only) | KNOWN |
| docs | 167 | NULL | no | 2026-05-09 | L0-docs | REJECT | KNOWN |
| mindinsight | 102 | NULL | no | 2026-05-05 | L4 obs | REJECT (Huawei-only) | KNOWN |

**Saturation note**: **HONEST-NON-FINDING**: mindspore-ai org is essentially defunct on GitHub for SOTA purposes — main framework repo last-pushed **2024-07-29** with sub-1k recent activity in subsidiary repos. All Huawei-Ascend-locked (cardinal-rule-1 install-priority violations on portability). Active mirror likely lives on Gitee (per Huawei convention). **No layer-NEW additions warranted.**

---

## Section 6 — THUDM (Tsinghua DM Lab)
> Probe returned 20 repos · 2 NEW (≥1k) above-threshold not-yet-cataloged · 18 KNOWN or stagnant.

| Repo | Stars | License | Archived | Push | Layer | Verdict | STATUS |
|---|---:|---|---|---|---|---|---|
| **slime** | **5,704** | Apache-2.0 | no | 2026-05-14 | L05 RL post-train | **STUDY-PILOT** (LLM post-training for RL Scaling — fresh, push-active) | **NEW** |
| GLM (v1) | 3,497 | NULL | no | 2023-11-03 | L05 model | REJECT (stale) | KNOWN |
| AgentBench | 3,427 | Apache-2.0 | no | 2026-02-08 | L4 agent-eval | STUDY-NICHE (ICLR'24 LLM-agent benchmark) | KNOWN |
| P-tuning-v2 | 2,077 | NULL | no | 2023-11-16 | L05 PEFT | REJECT (stale; PEFT lib saturates) | KNOWN |
| LongWriter | 1,861 | NULL | no | 2025-06-24 | L05 long-output | REJECT (model artifact, non-CC) | KNOWN |
| CogDL | 1,821 | NULL | no | 2024-02-01 | L05 graph-DL | REJECT (off-domain) | KNOWN |
| WebGLM | 1,603 | NULL | no | 2025-03-25 | L3 web-QA | REJECT (KDD'23 demo) | KNOWN |
| AgentTuning | 1,488 | NULL | no | 2023-10-31 | L05 agent-tune | REJECT (stale) | KNOWN |
| LongBench | 1,169 | NULL | no | 2025-01-15 | L4 long-context-eval | STUDY-NICHE (ACL'24/'25 long-context eval) | KNOWN |
| SwissArmyTransformer | 1,117 | NULL | no | 2024-12-26 | L05 transformer-lib | REJECT | KNOWN |
| AgentRL | 286 | NULL | no | 2026-01-17 | L3 multi-task RL | sub-1k | **NEW (sub-1k)** |
| IndexCache | 100 | NULL | no | 2026-03-14 | L025 attn-cache | sub-1k | **NEW (sub-1k)** |

**Saturation note**: **slime ★5,704 is the one true layer-L05 NEW** (RL post-training framework — pushed 2026-05-14). AgentBench/LongBench are eval benchmarks already-cataloged. AgentRL ★286 and IndexCache ★100 are sub-threshold but push-fresh — worth tracking.

---

## Section 7 — SJTU-IPADS (Shanghai Jiao Tong University)
> Probe returned 20 repos · **2 NEW high-signal sub-1k** · 0 above-1k novel · 18 systems-research-non-CC.

| Repo | Stars | License | Archived | Push | Layer | Verdict | STATUS |
|---|---:|---|---|---|---|---|---|
| OS-Course-Lab | 527 | NULL | no | 2026-05-12 | L0-edu | REJECT (course material) | **NEW (sub-1k)** |
| **SkVM** | **467** | MIT | no | 2026-05-14 | L4-CC-NATIVE | **STUDY-P0** ("The Language Virtual Machine for Agent Skills" — name is on-domain for Claude Code skill execution; push-2026-05-14 fresh; sub-1k but novel-class) | **NEW-P0** |
| PhoenixOS | 282 | Apache-2.0 | no | 2025-09-28 | L065 GPU-checkpoint | STUDY-NICHE (OS-level GPU checkpoint/restore — ops-tier) | **NEW (sub-1k)** |
| ServerlessBench | 232 | NULL | no | 2025-02-24 | L4 bench | REJECT | KNOWN |
| wukong (graph store) | 192 | NULL | no | 2026-01-04 | L1 graph-store | REJECT (RDMA-only) | KNOWN |
| SmallThinker | 50 | Apache-2.0 | no | 2025-07-30 | L05 model | sub-1k (stale, no description) | **NEW (sub-1k)** |

**Saturation note**: **SJTU-IPADS/SkVM ★467 is the standout** — sub-1k but name + description directly target Claude-Code-skill execution VM. Worth deep-probe vs Claude's native skill-loading mechanism (cardinal-rule-1 risk: if it duplicates the SDK's skill runtime, REJECT; if it adds a sandboxed-skill-VM layer, STUDY-PILOT). Most other repos are systems-research (RDMA / GPU-checkpoint / serverless) — orthogonal to CC orchestration.

---

## Section 8 — QwenLM (Alibaba Qwen team)
> Probe returned 20 repos · **2 NEW L4-CC-adjacent** · 4 KNOWN (model repos) · 14 model-weight variants.

| Repo | Stars | License | Archived | Push | Layer | Verdict | STATUS |
|---|---:|---|---|---|---|---|---|
| Qwen3 (model) | 27,232 | NULL | no | 2026-01-09 | L05 model | KNOWN (model weights) | KNOWN |
| **qwen-code** | **24,416** | Apache-2.0 | no | 2026-05-16 | **L4-CC-COMPETITOR** | **STUDY-PILOT** (Alibaba's open-source AI agent that lives in terminal — directly competes with Claude Code / OpenCode / Aider; push-TODAY; Apache-2.0; **MUST audit overlap vs anthropic/claude-code**) | **NEW-P0** |
| Qwen (v1) | 21,158 | NULL | no | 2026-03-05 | L05 v1 model | KNOWN | KNOWN |
| Qwen3-VL | 19,184 | Apache-2.0 | no | 2026-01-30 | L25 VLM | KNOWN (model weights) | KNOWN |
| Qwen3-Coder | 16,525 | NULL | no | 2026-03-24 | L05 code model | KNOWN | KNOWN |
| **Qwen-Agent** | **16,337** | Apache-2.0 | no | 2026-03-04 | **L3 agent-fw** | **STUDY-PILOT** ("Function Calling, MCP, Code Interpreter, RAG, Chrome extension" — directly MCP-native; competes with Smolagents/Letta/LangGraph; **L3 layer-NEW**) | **NEW-P0** |
| Qwen3-TTS | 11,382 | NULL | no | 2026-03-17 | L25 TTS | REJECT (model weights) | **NEW** |
| Qwen-Image | 7,896 | NULL | no | 2026-02-10 | L25 image-gen | REJECT | **NEW** |
| Qwen-VL (v1) | 6,648 | NULL | no | 2024-08-07 | L25 VLM v1 | KNOWN | KNOWN |
| Qwen2.5-Omni | 4,001 | NULL | no | 2025-06-12 | L25 omni | KNOWN | KNOWN |
| Qwen3-Omni | 3,754 | NULL | no | 2026-04-23 | L25 omni | REJECT (model weights) | **NEW** |
| Qwen3.6 (latest) | 3,388 | Apache-2.0 | no | 2026-05-11 | L05 latest model | REJECT (model weights) | **NEW** |
| Qwen3-ASR | 2,669 | NULL | no | 2026-01-30 | L25 ASR | REJECT | **NEW** |
| Qwen2-Audio | 2,069 | NULL | no | 2025-04-21 | L25 audio | KNOWN | KNOWN |
| Qwen3-Embedding | 1,928 | NULL | no | 2025-09-30 | L0-embed | STUDY-NICHE (Qwen3-derived embedding model — competes with BGE/E5/mxbai) | **NEW** |
| Qwen-Image-Layered | 1,865 | NULL | no | 2025-12-31 | L25 image-edit | REJECT | **NEW** |
| Qwen3-VL-Embedding | 1,235 | NULL | no | 2026-04-08 | L0-embed VL | STUDY-NICHE | **NEW** |
| Qwen2.5-Math | 1,079 | NULL | no | 2025-01-11 | L05 math | KNOWN | KNOWN |
| Qwen3-ASR-Toolkit | 960 | NULL | no | 2026-02-05 | L25 ASR-toolkit | sub-1k | **NEW (sub-1k)** |

**Saturation note**: Three layer-NEW C-tier candidates: **qwen-code ★24,416** (DIRECT Claude-Code competitor — cardinal-rule audit needed), **Qwen-Agent ★16,337** (MCP-native L3 agent framework), **Qwen3-Embedding ★1,928** (Qwen-derived embedder vs BGE/E5). Everything else is model-weight artifacts that the catalog deliberately excludes (per layer-L05 model-weight non-policy).

---

## Totals + Top NEW-P0 Promotions

**Total NEW (≥1k★, novel-class) across 8 orgs**: **16 repos**
- PaddlePaddle: 2 (PaddleFormers, FastDeploy)
- deepseek-ai: 7 (DeepSeek-OCR, Engram, FlashMLA, 3FS, DeepEP, DeepGEMM, smallpond)
- InternLM: 2 (MindSearch, HuixiangDou)
- modelscope: 2 (AgentEvolver, sirchmunk)
- mindspore-ai: 0
- THUDM: 1 (slime)
- SJTU-IPADS: 0 above-1k (SkVM ★467 sub-1k high-signal)
- QwenLM: 2 (qwen-code, Qwen-Agent) plus 1 niche-embedder (Qwen3-Embedding)

### Top 5 NEW-P0 STUDY-PILOT Promotions with Native-CC-Pathway Assessment

| Rank | Repo | Star | License | Layer | Native-CC pathway | Risk |
|---|---|---:|---|---|---|---|
| 1 | **QwenLM/qwen-code** | 24,416 | Apache-2.0 | L4-CC-competitor | **NONE direct** — IS an alternative agent CLI; audit for reusable primitives (terminal-UX patterns, MCP client impl, prompt scaffolding) | HIGH (cardinal-rule-1: don't install competitor as orchestrator; harvest patterns only) |
| 2 | **deepseek-ai/DeepSeek-OCR** | 23,131 | MIT | L25-OCR | **Indirect via PDF-ingestion subagent** — bind to Read tool's PDF-mode for context-compression workflows | LOW-MEDIUM (PaddleOCR remains S-tier for general OCR; DeepSeek-OCR specializes context-compression — orthogonal use) |
| 3 | **QwenLM/Qwen-Agent** | 16,337 | Apache-2.0 | L3-agent-fw | **MCP-client-pattern reference** — already-documented MCP + Function Calling + Code Interpreter integration in one framework | LOW (study-pilot; harvest MCP-client impl patterns; not install as primary L3) |
| 4 | **deepseek-ai/Engram** | 4,404 | Apache-2.0 | L02-memory | **Novel sparsity axis** — Conditional Memory via Scalable Lookup; potentially layer-L02-novel vs Letta/Mem0/Graphiti retrieval models | MEDIUM (research-tier; sparsity claims need adversarial-eval before adoption) |
| 5 | **THUDM/slime** | 5,704 | Apache-2.0 | L05-RL-train | **NONE direct** — post-training framework for RL Scaling; relevant only if running RL-tuning on local Qwen/InternLM weights | LOW (orthogonal to CC orchestrator; STUDY-NICHE for L05 training stack only) |

### 3 Saturation Observations

1. **DeepSeek dominates infrastructure-primitive output** (7 NEW ≥1k★ primitives in single org sweep) — but most (FlashMLA, DeepGEMM, DeepEP, 3FS) are PRIMITIVE-LEVEL that get upstream-embedded in vLLM/SGLang/CUTLASS rather than orchestrator-installed. Layer-NEW additions warranted only for DeepSeek-OCR (L25) and Engram (L02).
2. **mindspore-ai is effectively dead on GitHub** — main repo last-pushed 2024-07-29, no above-1k novel activity. Active development almost certainly mirrored to Gitee (Huawei convention) — GitHub mirror does not reflect SOTA. Documented as HONEST-NON-FINDING; no installs warranted.
3. **QwenLM's qwen-code ★24,416 is a Claude-Code competitor in same problem-space** — Apache-2.0, push-2026-05-16 (today!). Per cardinal-rule-1 install-priority, this is NOT an orchestrator-install candidate (would compete with the host orchestrator), but its terminal-UX patterns, MCP-client impl, and prompt scaffolding are valuable harvest targets. Same disposition applies to Cognition/devin, BloopAI/bloop, opencode-ai/opencode — pattern-mine, don't install.

---

## HONEST-NON-FINDING — Deferred Sub-Areas

1. **mindspore-ai sub-1k novel**: 5 of the 10 sub-1k mindspore-ai repos (vllm-mindspore, hyper-parallel, mindformers, mindspore-lite, ms_custom_ops) are push-active 2026-04 to 2026-05 but star-stagnant. Likely high-quality Huawei-internal mirrors; not pursued further per Huawei-Ascend portability lockout.
2. **Open-DataFlow org**: gh search returned "Invalid search query — does not exist or no permission". Org name likely deprecated or renamed; not pursued.
3. **THUDM sub-200 novel (AgentRL ★286, IndexCache ★100, ReST-RL ★16, CaRR ★64, DataSciBench ★57, MobileRL ★84, ComputerRL ★32)**: 7 fresh-push 2026 research artifacts but sub-200★. STUDY-IF-SCORE-UPLIFTS only.
4. **SJTU-IPADS systems-research repos** (drtmh, wukong-graph, xstore, reef, HEDB, SQLSolver): 6 repos in RDMA-distributed-systems / encrypted-DB / SQL-solver space — all 50-300★ academic-research; orthogonal to CC orchestration; not pursued.
5. **Qwen model-weight variants** (Qwen3-TTS, Qwen-Image, Qwen3-Omni, Qwen3.6, Qwen3-ASR, Qwen-Image-Layered, Qwen3-VL-Embedding) — 7 NEW model-weight repos ≥1k★ but excluded per catalog's deliberate L05-model-weight non-policy (these are weights+code-glue, not orchestrator-installables; HuggingFace hub is the install surface).

---

## Conclusion

8-org probe confirms **16 NEW ≥1k★ net additions**, of which **5 are STUDY-PILOT-P0 candidates** for grand-catalog integration:
- L25-OCR: DeepSeek-OCR (visual context compression — potential PaddleOCR-complementary)
- L02-memory: Engram (novel sparsity axis vs Letta/Mem0/Graphiti)
- L3-agent-fw harvest: Qwen-Agent (MCP-client impl reference patterns)
- L4-CC-pattern harvest: qwen-code (terminal-UX + MCP-client patterns — DO NOT install)
- L05-RL-train: slime (post-training framework — orthogonal STUDY-NICHE)

Sub-1k high-signal: SJTU-IPADS/SkVM ★467 ("Language VM for Agent Skills") — name+description signal CC-skill-runtime-adjacent novelty; worth deep-probe.

mindspore-ai is HONEST-NON-FINDING (effectively dead on GitHub; Huawei-Ascend lockout). All other orgs deliver expected mix of model-weight repos (excluded per L05 non-policy) and orchestration-relevant primitives.
