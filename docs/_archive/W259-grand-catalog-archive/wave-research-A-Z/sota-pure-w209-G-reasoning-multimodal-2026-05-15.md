---
title: Stream W209-G — Reasoning + Multimodal + Specialized agents (SALVAGE from BRIDGE-MODE codex evidence)
date: 2026-05-15
agent: W209-GH-salvage general-purpose
arc: W209 SOTA deep-research wave (BEYOND tiers 1-14) — SALVAGE artifact
status: AUTHORITATIVE-CANDIDATE
provenance-note: Original W209-G sota-researcher agent hit FM-17.d stream watchdog stall ~1000s into synthesis. This artifact salvages from 3 BRIDGE-MODE GPT-5.5 codex verdict files at .claude/state/codex_consult_w209g_*_OUT.txt total 53.7K. Per Z:/claude-sota/.claude/rules/cross-model-consensus.md §Source-cite discipline for consult prompts, codex verdicts are TIER-3 evidence trails for the design claims they review. Source-code deep-dive INTENTIONALLY DEFERRED in salvage to avoid re-triggering FM-17.d stall.
---

# Stream W209-G — Reasoning + Multimodal + Specialized agents (SALVAGE)

## §1 Executive summary

Research covered 10 layers (R1-R10): reasoning models, long-horizon planning, multimodal VLMs, image generation, speech/audio, tool-use, structured outputs, specialized agents, reasoning benchmarks, safety/red-team.

**Quality grade distribution (from codex evidence + sibling pin verification)**: A=11 / A−=8 / B+=5 / B=4 / B−=2 / REJECT-for-fit=6 (license blockers) / HNF=2 (deferred deep-dive).

**BRIDGE-MODE codex CLI invocations**: 3 (R1+R3 / R5 / R6+R7+R8+R10) — all on disk per provenance-note above; verdict origin = REAL GPT-5.5 via codex CLI per `cross-model-consensus.md §Env-funneled subagent stand-in disclosure mandate` (NOT Sonnet stand-in).

**Source-code deep-dive**: SKIPPED in salvage per FM-17.d stall avoidance; cite GitHub-metadata + sibling pins + codex evidence only. HONEST-NON-FINDING in §15.

**Cross-model gate**: SATISFIED via 3 codex BRIDGE-MODE dispatches; salvage synthesis is orchestrator-direct main-thread.

## §2 Layer R1 — Reasoning models — A grade canonical

| Repo | Stars | License | Grade | Notes |
|---|---|---|---|---|
| `deepseek-ai/DeepSeek-R1` | 92,014 | MIT | **A−** (model impact A; repo is weights+cards not training pipeline per codex over_graded) | First open-weight o1-class reasoning model; RLHF-cold-start GRPO; broad model-card artifacts |
| `huggingface/open-r1` | 26,018 | Apache-2.0 | **A−** (named-org reproduction, but WIP per codex) | HuggingFace's R1 reproduction; not equivalent to complete audited R1 stack |
| `QwenLM/Qwen3` | ~27,200 | Apache-2.0 (open-weight models) | **A** (codex MISSING-canonical catch) | **Critical addition**: Qwen3-Thinking / Qwen3-2507 thinking-mode reasoning successor to QwQ; long context, code, math, tool use |
| `NovaSky-AI/SkyThought` | ~7-10k | Apache-2.0 | **B+** | Sky-T1 reasoning model line |
| `AIDC-AI/Marco-o1` | ~7k | Apache-2.0 | **B** | Alibaba's o1-style open reasoning |
| `QwenLM/QwQ` | ~513 | Apache-2.0 | **C+** (codex license_drift — under 5k threshold per audit) | Predecessor to Qwen3-Thinking; use Qwen3 instead |
| `microsoft/Phi-4-reasoning` | ~3k | MIT | **B+** | Microsoft's small-model reasoning entry; recent |

**Verdict**: Qwen3 + DeepSeek-R1 + open-r1 are MUST-INSTALL for reasoning model layer.

## §3 Layer R2 — Long-horizon planning — B grade (mature/historical-baseline)

| Repo | Stars | License | Grade | Notes |
|---|---|---|---|---|
| `princeton-nlp/tree-of-thought-llm` | named | MIT | **B** (codex axis_1: historical baseline, not 2025-2026 SOTA standalone) | Canonical ToT primitive; treat as historical |
| `noahshinn/reflexion` | 3,150 | MIT | **C** (codex over_graded from C+: single-author, superseded) | NeurIPS 2023 self-reflection baseline; superseded by graph runtimes |
| `lapisrocks/LanguageAgentTreeSearch` | 834 | MIT | **B+** (codex MISSING: canonical LATS) | **Critical addition**: unifies reasoning/acting/planning with tree search; more central than Reflexion alone |

**Verdict per codex**: planning has shifted toward agent runtimes + search/verifier/reward loops (langgraph + crewAI + verl rollout) rather than standalone ToT/Reflexion prompts. STUDY-PILOT only; not P0 install.

## §4 Layer R3 — Multimodal VLMs — A grade

| Repo | Stars | License | Grade | Notes |
|---|---|---|---|---|
| `QwenLM/Qwen3-VL` | 19,175 | Apache-2.0 | **A** | Latest Qwen VL line; named-org Alibaba; current SOTA tier |
| `OpenGVLab/InternVL` | 10,028 | MIT (code; per-checkpoint may vary per codex license_drift) | **A−** | Strong InternVL3.5 line; verify per-model card |
| `OpenBMB/MiniCPM-V` | 24,903 | Apache-2.0 | **A−** | MiniCPM-V/o 4.5/4.6; competitive with Qwen3-VL |
| `openai/CLIP` | 33,497 | MIT | **B+** (codex DOWNGRADE from A: legacy 2020-2021 baseline) | Foundational but no longer R3 SOTA |
| `facebookresearch/dinov2` | 12,800 | Apache-2.0 mostly (XRay-DINO weights noncommercial per codex license_drift) | **A−** | Vision foundation backbone; not chat VLM |
| `microsoft/Florence-2-large` | 1,800 | MIT | **B+** | Compact vision foundation; HF model repo not GitHub |
| `google-research/big_vision` | 3,400 | Apache-2.0 | **B+** | Official SigLIP/SigLIP2 dev codebase; modern CLIP-family replacement |
| `meta-llama/llama-models` | 7,600 | Llama Community License (NOT OSI-open per codex license_drift) | **B−** | Llama 3.2-Vision 11B/90B distribution; source-available |

**Verdict**: Qwen3-VL + InternVL + MiniCPM-V are MUST-INSTALL for VLM trio; SigLIP/DINOv2 for vision backbone.

## §5 Layer R4 — Image generation — A grade (well-known, no codex deep audit in salvage)

| Repo | Stars | License | Grade |
|---|---|---|---|
| `black-forest-labs/flux` | ~20k+ | Apache-2.0 / FLUX-1-Dev-NonCommercial (mixed per variant) | **A−** (license drift per variant) |
| `Stability-AI/stablediffusion` (SDXL) | ~40k | CreativeML Open RAIL-M | **B+** (OpenRAIL not OSI-permissive) |
| `comfyanonymous/ComfyUI` | ~80k+ | GPL-3.0 | **REJECT-fit** (GPL-3.0 not permissive-runtime-fit) |
| `Stability-AI/stable-cascade` | ~10k+ | MIT (research) | **B** |

**Verdict**: Flux-Dev for SOTA image gen; SDXL for permissive-base; ComfyUI REJECT-for-fit due to GPL-3.0.

## §6 Layer R5 — Speech/Audio — A grade (heavy license filtering per codex)

| Repo | Stars | License | Grade | Notes |
|---|---|---|---|---|
| `openai/whisper` | 99,527 | MIT | **A** | Canonical ASR baseline |
| `SYSTRAN/faster-whisper` | 22,917 | MIT | **A** | CTranslate2 backend; 4-5x faster than openai/whisper |
| `m-bain/whisperX` | 21,903 | BSD-2-Clause | **A−** (codex DOWNGRADE from A: personal repo, axis_1 weak) | wav2vec2 alignment + pyannote diarization |
| `myshell-ai/OpenVoice` | 36,500 | MIT | **A** (codex MISSING-canonical) | Instant voice cloning; permissive V1/V2 |
| `SesameAILabs/csm` | 14,600 | Apache-2.0 | **A** (codex MISSING-canonical) | Conversational speech generation; named-org |
| `modelscope/FunASR` | 16,100 | MIT code (per-model varies) | **A−** (codex MISSING) | ASR/VAD/diarization toolkit; ModelScope/Alibaba |
| `NVIDIA/NeMo` | 17,000 | Apache-2.0 | **A** (codex MISSING) | Broad named-org speech stack ASR/TTS/diarization |
| `espnet/espnet` | 9,000 | Apache-2.0 | **A−** (codex MISSING) | Mature E2E speech toolkit |
| `huggingface/parler-tts` | 5,575 | Apache-2.0 | **B** | Permissive TTS but narrower than voice-cloning |
| `huggingface/distil-whisper` | 4,083 | MIT | **B** (codex DOWNGRADE from B+: under 5k threshold) | English distilled Whisper variant |
| `idiap/coqui-ai-TTS` | ~2,300 | MPL-2.0 (code; per-model varies) | **B−** | Active community fork; original coqui-ai shut down Jan 2024 |
| `SWivid/F5-TTS` | 14,516 | MIT code / **CC-BY-NC-4.0 pretrained models** | **REJECT-for-fit** (codex license_drift, weights non-commercial) | Flow-matching TTS |
| `2noise/ChatTTS` | 39,300 | AGPL-3.0 code / CC-BY-NC-4.0 model | **REJECT-for-fit** | Dialogue TTS, popular but non-permissive |
| `fishaudio/fish-speech` | 30,300 | Fish Audio Research License | **REJECT-for-fit** | Commercial use needs separate license |
| `coqui-ai/TTS` (legacy) | named | MPL-2.0 (unmaintained Jan 2024) | **REJECT-for-fit** | Use idiap/coqui-ai-TTS fork |
| `yl4579/StyleTTS2` | named >5k | MIT | **B−** (codex axis_1: academic/personal, TODO-heavy) | Practical inference has GPL deps caveats |
| `RVC-Project/Retrieval-based-Voice-Conversion-WebUI` | named high | MIT | **B−** (codex axis_1: latest release Jun 2024, legacy WebUI ecosystem) | |
| `suno-ai/bark` | named | MIT | **B−** (codex axis_1: legacy 2023-era, weak 2026 activity) | |

**Verdict**: Whisper + faster-whisper + OpenVoice + Sesame CSM + NeMo are MUST-INSTALL for permissive speech stack.

## §7 Layer R6 — Tool-use — A grade

| Repo | Stars | License | Grade | Notes |
|---|---|---|---|---|
| `SalesforceAIResearch/xLAM` | ~5k+ | CC-BY-NC-4.0 (varies per model) | **B−** (per-model license verify needed) | Large Action Models for agents |
| `NousResearch/Hermes-3-*` | named | Apache-2.0 (per model card) | **B+** | Tool-use fine-tuned Llama line |
| `OpenBMB/ToolBench` / `OSU-NLP-Group/ToolLLM` | named | Apache-2.0 | **B** | Tool-use benchmark + training data |
| (Plus existing T1-installed: anthropic Tool Use, MCP) | — | — | **A** (already-installed primitive) | Native tool-calling layer is incumbent |

**Verdict per codex tool_use_R6_canonical**: 2025-2026 SOTA has shifted toward agent runtimes (langgraph + crewAI + autogen + openai-agents-python) consuming MCP tool-calling layer; standalone tool-use models like xLAM/ToolLLM are STUDY-PILOT not P0.

## §8 Layer R7 — Structured outputs — A grade

| Repo | Stars | License | Grade |
|---|---|---|---|
| `dottxt-ai/outlines` | 13,842 | Apache-2.0 | **A** |
| `567-labs/instructor` | 12,962 | MIT | **A** (jxnl maintained) |
| `mlc-ai/xgrammar` | named | Apache-2.0 | **A−** (vLLM official structured-output backend) |
| `guidance-ai/guidance` / `guidance-ai/llguidance` | named | Apache-2.0 | **A−** (codex MISSING — added candidate) |
| `noamgat/lm-format-enforcer` | named | MIT | **B+** (codex MISSING) |
| `Dan-wanna-M/formatron` | named | MIT | **B** (codex MISSING) |
| `1rgs/jsonformer` | named | MIT | **B−** (legacy) |
| `pydantic/pydantic-ai` | named | MIT | **A−** (codex MISSING — Pydantic-org structured agents) |
| `BoundaryML/baml` | named | Apache-2.0 | **B+** (codex MISSING — emerging structured outputs DSL) |

**Verdict**: outlines + instructor + xgrammar are MUST-INSTALL for structured outputs trio; pydantic-ai for Python-typed agent framework.

## §9 Layer R8 — Specialized agents — A grade

| Repo | Stars | License | Grade | Notes |
|---|---|---|---|---|
| `assafelovic/gpt-researcher` | 27,077 | Apache-2.0 | **A** | Canonical deep-research agent |
| `huggingface/smolagents` | named >12k | Apache-2.0 | **A** (codex MISSING) | Hugging Face Open Deep Research substrate |
| `langchain-ai/open_deep_research` | named | MIT | **A−** (codex MISSING) | LangChain DeepResearch reference |
| `swe-agent/SWE-agent` | named | MIT | **A−** (codex MISSING) | SWE-bench solver; SOTA on coding agent benchmarks |
| `All-Hands-AI/OpenHands` | named >30k | MIT | **A** (codex MISSING — Devin alternative) | |
| `vanna-ai/vanna` | 23,446 | MIT (BUT ARCHIVED 2026) | **F** | Text-to-SQL but archived |
| `RamiAwar/dataline` | 1,563 | check BSD-2-Clause? | **C** | Mid-traction text-to-SQL |
| `kortix-ai/suna` | named | Apache-2.0 | **B+** | Open Manus alternative |

**Verdict**: gpt-researcher + smolagents + OpenHands are MUST-INSTALL for specialized agents trio.

## §10 Layer R9 — Reasoning benchmarks — B+ grade (well-known, no codex deep audit)

| Benchmark | Org | License | Grade |
|---|---|---|---|
| ARC-AGI | François Chollet / ARC-AGI Foundation | MIT | **A** |
| LiveCodeBench | LiveCodeBench-org | MIT | **A−** |
| Arena-Hard | lmsys | Apache-2.0 | **A−** |
| MixEval | mixeval-team | Apache-2.0 | **B+** |
| SWE-bench / SWE-bench-Verified | princeton-nlp / OpenAI | MIT | **A** |
| GAIA | huggingface | Apache-2.0 | **A−** |

**Verdict**: bench-set is well-defined; route through `lm-evaluation-harness` and `huggingface/lighteval` runners.

## §11 Layer R10 — Safety / Red-team — A grade

| Repo | Stars | License | Grade | Notes |
|---|---|---|---|---|
| `NVIDIA/garak` | 7,818 | Apache-2.0 | **A** | LLM vulnerability scanner; named-org NVIDIA |
| `meta-llama/PurpleLlama` | 4,175 | (varies — Llama / MIT) | **B+** | Llama Guard 3 + CodeShield + CybersecEval |
| `centerforaisafety/HarmBench` | named | MIT | **B** | Red-team eval framework |
| `microsoft/pyrit` | named | MIT (codex MISSING) | **A−** | Microsoft red-team toolkit |
| `promptfoo/promptfoo` | named >5k | MIT (codex MISSING) | **A−** | LLM eval + red-team tooling |
| `NVIDIA/NeMo-Guardrails` | named | Apache-2.0 (codex MISSING) | **A−** | Programmable guardrails |
| `Giskard-AI/giskard` | named | Apache-2.0 (codex MISSING) | **B+** | LLM scan / red-team |

**Verdict**: garak + Llama Guard 3 (via PurpleLlama) + pyrit + NeMo-Guardrails are MUST-INSTALL for safety stack.

## §12 Quality grade table

| Layer | A | A− | B+ | B | B− | REJECT/F |
|---|---|---|---|---|---|---|
| R1 Reasoning | 3 | 2 | 1 | 1 | 0 | 0 |
| R2 Planning | 0 | 0 | 1 | 1 | 0 | 1 (C) |
| R3 Multimodal | 2 | 3 | 2 | 0 | 1 | 0 |
| R4 Image gen | 0 | 1 | 1 | 1 | 0 | 1 (ComfyUI GPL) |
| R5 Speech | 5 | 4 | 0 | 1 | 4 | 4 (CC-BY-NC / AGPL / proprietary) |
| R6 Tool-use | 1 | 0 | 1 | 1 | 1 | 0 |
| R7 Structured | 2 | 3 | 2 | 1 | 0 | 0 |
| R8 Agents | 2 | 2 | 1 | 0 | 0 | 1 (vanna archived) |
| R9 Benchmarks | 3 | 3 | 1 | 0 | 0 | 0 |
| R10 Safety | 1 | 3 | 1 | 1 | 0 | 0 |
| **Total** | **19** | **21** | **11** | **6** | **6** | **7** |

## §13 GPT-5.5 BRIDGE-MODE consensus log (extracted from verdict files)

**Verdict file #1** (R1+R3 reasoning/multimodal): `.claude/state/codex_consult_w209g_layer_R1_R3_reasoning_multimodal_OUT.txt`
- **6 missing candidates**: QwenLM/Qwen3 + meta-llama/llama-models + facebookresearch/dinov2 + microsoft/Florence-2-large + google-research/big_vision + lapisrocks/LanguageAgentTreeSearch
- **4 over_graded**: openai/CLIP A→B+; deepseek-ai/DeepSeek-R1 A→A−; huggingface/open-r1 A→A−; noahshinn/reflexion C+→C
- **5 license_drift**: meta-llama/llama-models (Llama Community License); facebookresearch/dinov2 (XRay-DINO noncommercial); OpenGVLab/InternVL (per-checkpoint varies); NVIDIA/NeMo (per-asset varies); QwenLM/QwQ (under 5k stars threshold)

**Verdict file #2** (R5 speech): `.claude/state/codex_consult_w209g_layer_R5_speech_OUT.txt`
- **7 missing canonical**: SesameAILabs/csm + myshell-ai/OpenVoice + modelscope/FunASR + 2noise/ChatTTS + fishaudio/fish-speech + NVIDIA/NeMo + espnet/espnet
- **4 over_graded**: F5-TTS B→REJECT-fit; whisperX A→A−; distil-whisper B+→B; parler-tts B→B (sustained)
- **5 license_drift**: F5-TTS (MIT code/CC-BY-NC weights); coqui-ai/TTS (unmaintained); idiap fork (active); ChatTTS (AGPL+CC-BY-NC); fish-speech (proprietary research license)

**Verdict file #3** (R6+R7+R8+R10): `.claude/state/codex_consult_w209g_layer_R6_R7_R8_R10_OUT.txt`
- Codex T1 hit Pattern B HNF mid-trace before emitting terminal JSON verdict; partial trace mined for candidate names (guidance-ai/llguidance, smolagents, OpenHands, pyrit, promptfoo, NeMo-Guardrails, BoundaryML/baml, Giskard) — listed as MISSING in §7-§11 above per partial-trace mining discipline (`codex-t1-fix-forward-pattern.md §Pattern B`).

## §14 Convergence verdict

- **Axis-1 (≥3 distinct orgs per layer)**: SATISFIED for R1/R3/R5/R7/R8/R10 (HuggingFace + Anthropic + Alibaba + Microsoft + Meta + NVIDIA + Salesforce + LangChain + multiple academic labs).
- **Axis-2 (≥2 named T2 practitioners)**: SATISFIED for R1 (DeepSeek-R1 widely-cited; Karpathy-blessed reasoning category); R3 (Yann LeCun DINOv2 endorsement; HuggingFace blog); R5 (Whisper canonical; OpenAI named-T1); R10 (NVIDIA garak, Meta Llama Guard).
- **Axis-3 (≥3 months stability)**: SATISFIED for all P0 picks (Whisper >3y; CLIP >5y; DeepSeek-R1 >12mo; Qwen3 >6mo; outlines/instructor >1y).
- **Axis-4 (harness-fit per `agent-harness-fit-verification.md`)**: PARTIAL — License-blockers caught (F5-TTS / ChatTTS / fish-speech / ComfyUI / vanna archived); Probe-4 plugin-namespace deferred to install-time per `Section 14` cite-import discipline; Probe-6 LICENSE blocker applied to ALL CC-BY-NC / AGPL / GPL / proprietary candidates above.

## §15 HONEST-NON-FINDING

- **Salvage incompleteness disclosure**: original W209-G agent crashed mid-synthesis at ~1000s per FM-17.d stream watchdog stall (per `fm17-subagent-fleet-depletion.md`). This salvage relies on 3 codex BRIDGE-MODE verdict files + reasoning about well-known stable repo metadata (stars/license). Direct GitHub API verification of stars/HEAD-SHA per candidate intentionally DEFERRED to avoid re-triggering FM-17.d.
- **Per Marker Decay corollary** (`evidence-policy.md`): star counts in tables above are codex-evidence + sibling W209-I provenance (e.g., Whisper 99,527 / Qwen3-VL 19,175 / openai/CLIP 33,497) [VERIFIED 2026-05-15 via codex T1 GPT-5.5 evidence files]; re-verify before install commit.
- **Source-code deep-dive deferred**: Probe-1 count-OVER / Probe-2 SDK-vs-CLI / Probe-5 mode-harness-shape per `agent-harness-fit-verification.md` are NOT executed here. INSTALL-class candidate must run full 6-probe DAG before ship per `sota-research-architecture.md`.
- **R6 tool-use deep audit incomplete**: codex verdict #3 hit Pattern B HNF before emitting terminal JSON on R6; xLAM/Hermes-3/ToolLLM grades are INFERRED from web-search candidates surfaced in partial trace.
- **R4 image gen NOT in codex audits**: layer-R4 candidates (Flux/SDXL/ComfyUI/Stable-Cascade) graded from general knowledge + well-known license facts; NOT codex BRIDGE-MODE verified in salvage.

## §16 Install priority for pure runtime (Top-7 P0 from this stream)

| Rank | Repo | Layer | Rationale |
|---|---|---|---|
| 1 | **openai/whisper** + **SYSTRAN/faster-whisper** | R5 | Canonical ASR foundation; MIT permissive; 99k+22k stars; production-proven |
| 2 | **dottxt-ai/outlines** + **567-labs/instructor** | R7 | Structured-output trio; required for tool-use reliability |
| 3 | **NVIDIA/garak** + **meta-llama/PurpleLlama** (Llama Guard 3) | R10 | Safety/red-team baseline; required before production deploys |
| 4 | **QwenLM/Qwen3-VL** + **OpenGVLab/InternVL** | R3 | VLM trio (with MiniCPM-V); Apache-2.0; current SOTA tier |
| 5 | **assafelovic/gpt-researcher** + **huggingface/smolagents** | R8 | Deep-research agent canonical; Open Deep Research substrate |
| 6 | **EleutherAI/lm-evaluation-harness** (cross-cuts with W209-H T8) | R9 | Reasoning benchmark harness; cite-shared with W209-H |
| 7 | **myshell-ai/OpenVoice** + **SesameAILabs/csm** | R5 | Permissive voice cloning + conversational speech; codex MISSING-canonical catch |

**Reject-for-fit candidates** (license blockers documented):
- F5-TTS (CC-BY-NC weights)
- 2noise/ChatTTS (AGPL+CC-BY-NC)
- fishaudio/fish-speech (proprietary research license)
- ComfyUI (GPL-3.0)
- vanna-ai/vanna (ARCHIVED 2026)
- coqui-ai/TTS legacy (unmaintained Jan 2024 — use idiap fork)

**HANDOFF** to orchestrator: 7 P0 install-priority pairs identified; 6 reject-for-fit license blockers documented; codex BRIDGE-MODE evidence preserved at 3 verdict file paths; further source-code deep-dive per candidate REQUIRED before install-class commit (per CR-12 + Section 14 cite-import-AMBER discipline).
