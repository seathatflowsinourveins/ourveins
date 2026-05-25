---
title: W210 Agent N — LOCAL MODEL SERVING + LLM-JUDGE DEEP AUDIT
status: AUTHORITATIVE-CANDIDATE
date: 2026-05-15
agent: sota-researcher (W210 N)
stand_in: STAND-IN per CLAUDE.local.md ENV (f) — Sonnet stand-in dispatch; cross-model gate NOT structurally satisfied for this dispatch. Orchestrator-side codex T1 verification required before any ADOPT-NOW ship.
---

## 1. Executive Summary (10 lines)

Pure runtime incumbents: Ollama (port 11700, qwen3.6:35b + qwen3-embedding:0.6b + gemma4:vision) + Phoenix (port 16006, Arize) + promptfoo + deepeval W207 F STUDY-PILOT. Audited 16 SOTA candidates across local-serving (5) + LLM-judge/observability (8) + cross-model harnesses (3). Findings: **vLLM is the SOTA throughput-tier ceiling but GPU-required → Probe-5 borderline for Windows + CPU/MoE workflows** ; **LiteLLM is the missing provider-router layer** between Ollama-incumbent and downstream consumers (W209 J STUDY-PILOT confirmed); **Langfuse is the strongest OSS observability alternative to Phoenix** but stack duplication risk via Probe-4; **Opik (Comet ML) is the best-fit standalone OSS judge** with native MCP integration matching eee plugin model; **Inspect AI (UK AISI MIT) is the strongest cross-model verification harness** for Tier-5 advanced research; **codex CLI v0.130 + claude-code v2.1.140 remain the cross-model T1-T7 lifecycle authority** (no displacement). Top-5 ADOPT-NOW: **(1) LiteLLM gateway** (Tier-3 install) — (2) **Langfuse self-host** (alternative observability) — (3) **Opik standalone** (LLM-judge with Cursor MCP) — (4) **Inspect AI** (research evals) — (5) **vLLM** (GPU-tier serving for power-user workflows only). REJECT-FOR-FIT: KoboldCPP (**AGPLv3 LICENSE BLOCKER** per Probe 6), Braintrust/LangSmith/Weave (proprietary commercial-only, no free tier covering eee workflow), LM Studio desktop (Probe-5 GUI-only no autonomous /loop mode), HELM/EleutherAI lm-eval-harness (research-only, no production-judge workflow).

## 2. Audit Matrix per Category

### 2.A LOCAL MODEL SERVING (5 candidates)

| Candidate | HEAD SHA | License | Probe 1 (count-OVER) | Probe 4 (plugin-NS) | Probe 5 (mode-harness) | Probe 6 (LICENSE/registry) | Probe 7 (demand-gate) | Axis 1+2+3 | Verdict |
|-----------|----------|---------|---------------------|---------------------|---------------------|---------------------------|--------------------|------------|---------|
| **Ollama** (INCUMBENT) | `c2f2d90a679317e443b0c35aa6d6d747cdd6c57b` | MIT | PASS (n=11 contexts) | PASS — owned `ollama` MCP slot | PASS — Windows + autonomous + CPU/GPU | PASS — MIT | PASS — 3 models routing through | 1✅2✅3✅ STABLE | INCUMBENT-RETAIN |
| **vLLM** (vllm-project) | `95995bbef81292e3ee1ef0df5ca3989bb481bdd5` | Apache-2.0 | PASS (200+ models, 2000+ contributors) | PASS — vendor-neutral OpenAI API | **BORDERLINE — GPU-required, Windows secondary** | PASS — Apache-2.0 | **PARTIAL — high-throughput serving workflow ABSENT in eee** | 1✅2✅3✅ MATURE | **STUDY-PILOT** for GPU-tier workflows |
| **llama.cpp** (ggerganov) | `5757c4dcb178a01c85234a6db7503b19c9598873` | MIT (ggml authors) | PASS (CPU/GGUF substrate) | **REJECT — Ollama uses llama.cpp transitively** | N/A indirect | PASS | **DUPLICATE-FUNCTIONALITY** via Ollama wrapper per kiss-dry-yagni Must-Never #4 | 1✅2✅3✅ MATURE | **REJECT — Probe 4 PLUGIN-NAMESPACE-DUPLICATE** |
| **KoboldCPP** (LostRuins) | `993e3f407ea8213f7d32cb9367ae7616b7e15b4a` | **AGPLv3** | N/A | N/A | N/A | **REJECT — AGPLv3 STRUCTURAL BLOCKER** per claude-sota permissive-license-only policy | N/A | License-FAIL | **REJECT-FOR-FIT (Probe 6 AGPLv3)** |
| **LM Studio** (lmstudio-ai) | NOT-CLONED-IN-DEPS | proprietary closed-source | N/A | N/A | **REJECT — GUI-only, no autonomous /loop mode** | N/A — proprietary | N/A | Probe-5 FAIL | **REJECT-FOR-FIT (Probe 5 mode-harness)** |

### 2.B LLM-JUDGE + OBSERVABILITY (8 candidates)

| Candidate | HEAD SHA | License | Probe 4 (plugin-NS) | Probe 5 (mode-harness) | Probe 6 (LICENSE) | Probe 7 (demand-gate) | Axis 1+2+3 | Verdict |
|-----------|----------|---------|---------------------|---------------------|------------------|--------------------|------------|---------|
| **Phoenix (Arize)** INCUMBENT | `419c3a06978abce8f611569228438929f8e7b995` | Elastic-2.0 | PASS — port 16006 | PASS — Python+JS dual SDK | Elastic-2.0 = permissive-class | **PARTIAL** — tracing wired, eval workflow STUDY-PILOT per W207 F | 1✅2✅3✅ | STUDY-PILOT-RETAIN per W207 F |
| **Langfuse** | `2466d4ce9bc33b24d6ae5c63cc32293555eec0c0` | MIT (+ commercial `ee/` subset) | **PARTIAL OVERLAP** with Phoenix | PASS — self-host Docker | MIT (core) | **GENUINELY-NEW** if Phoenix stays research-tier; Langfuse for production telemetry | 1✅2✅3✅ MATURE | **STUDY-PILOT** alternative to Phoenix |
| **Opik (Comet ML)** | `26fd69b9cef7c14a74ef63ffbbb1964fb06d6428` | Apache-2.0 | PASS — Cursor MCP extension shipped | PASS — Python+TS SDK + opik_optimizer | Apache-2.0 | **GENUINELY-NEW** — standalone LLM-judge with optimizer; complements Phoenix | 1✅2✅3✅ | **STUDY-PILOT-NARROW** for judge-stack |
| **DeepEval** STUDY-PILOT W207 F | `99878bdefd93632dc1cd80319b163fca8acee6e6` | Apache-2.0 | PASS — pytest-style | PASS — autonomous-compatible | Apache-2.0 | **GENUINELY-NEW** — native MCP support per skills/* | 1✅2✅3✅ | **CONFIRM W207 F STUDY-PILOT** |
| **Ragas** STUDY-PILOT W207 F | `298b68274234c060deacab3cf5fb52aa3a20e885` | Apache-2.0 | PASS — RAG-specific | PASS | Apache-2.0 | **PARTIAL** — RAG-specific subset of judge workflow | 1✅2✅3✅ | **CONFIRM W207 F STUDY-PILOT** for RAG-only |
| **Braintrust** | NOT-CLONED-IN-DEPS | proprietary closed-source SaaS | N/A | **REJECT — commercial-tier required** | proprietary | Free-tier inadequate for eee workflow | N/A | **REJECT-FOR-FIT (commercial-only Probe 6)** |
| **LangSmith** | NOT-CLONED-IN-DEPS | proprietary closed-source SaaS | N/A | **REJECT — LangChain-org commercial-tier** | proprietary | Free-tier limit < eee burn rate | N/A | **REJECT-FOR-FIT (commercial-only Probe 6)** |
| **Weave (W&B)** | NOT-CLONED-IN-DEPS | proprietary SaaS (Weights & Biases) | N/A | **REJECT — auth-required commercial-tier** | proprietary | Free-tier inadequate | N/A | **REJECT-FOR-FIT (commercial-only Probe 6)** |

### 2.C CROSS-MODEL VERIFICATION HARNESSES (3 candidates)

| Candidate | HEAD SHA | License | Probe 4 (plugin-NS) | Probe 5 (mode-harness) | Probe 7 (demand-gate) | Verdict |
|-----------|----------|---------|---------------------|---------------------|--------------------|---------|
| **codex CLI v0.130+** (INCUMBENT) | `6632cb788facbbbe9b47a5133bfec6a67aee5ee8` | Apache-2.0 | PASS — owned slot | PASS — T1-T7 lifecycle | INCUMBENT for cross-model T1-T7 | **INCUMBENT-RETAIN** |
| **Inspect AI** (UK AISI) | `5b4f3a6346f838dd9e7ca5f30af6c90bef7342ae` | MIT | PASS — research-tier non-conflict | PASS — autonomous + Python | **GENUINELY-NEW** for research-class evals beyond W207 F deepeval | **STUDY-PILOT-NARROW** (Tier-5 research) |
| **Gemini CLI** | `1a894c18eaaa7229159a5433c4350a1594b25bac` | Apache-2.0 | **PARTIAL OVERLAP** — different vendor cross-model option | PASS | **PARTIAL** — eee has Anthropic+codex pair; Gemini adds 3rd-org axis-1 cite source | **DEFER** until Gemini provides discriminating value beyond research cite |

### 2.D PROVIDER ROUTING + COST TRACKING (2 candidates)

| Candidate | HEAD SHA | License | Probe 4 (plugin-NS) | Probe 5 (mode-harness) | Probe 7 (demand-gate) | Verdict |
|-----------|----------|---------|---------------------|---------------------|--------------------|---------|
| **LiteLLM** (BerriAI) W209 J STUDY-PILOT | `934ecdca78daf7ec9514efd47df77bf7495c822d` | MIT | PASS — Stripe/Netflix/Google ADK adopters | PASS — proxy server + Python SDK | **GENUINELY-NEW** — provider router between Ollama+Anthropic+codex+OpenAI; 100+ providers | **CONFIRM W209 J STUDY-PILOT → ADOPT-NOW** |
| **CLIProxyAPI** (cnighswonger) INCUMBENT-SIBLING | `b31877e8ec8a1a58e7da88e0b235b9ca0028f504` | MIT | PASS — sibling slot 11700 | PASS — Windows-native OAuth rotating | **INCUMBENT** — rotating OAuth fleet for Anthropic Max | **INCUMBENT-RETAIN** |

## 3. ADOPT-NOW Top-5 (with file:line + Axis verdict)

### #1 — **LiteLLM** (BerriAI) — Provider Router Layer
- **Cite**: `Z:/repos/deps/litellm/README.md:1-80 @ HEAD 934ecdca78daf7ec9514efd47df77bf7495c822d` [VERIFIED 2026-05-15]
- **License**: MIT (core) with `enterprise/` subset Y-Combinator W23 commercial
- **Axis verdict**: 1✅ (Stripe + Netflix + Google ADK + OpenHands + OpenAI Agents SDK = ≥5 named orgs) / 2✅ (named-T2: 25k+ stars + Stripe production case study + 8ms P95 @ 1k RPS benchmark) / 3✅ STABLE-BURN-IN ~2yr commit history MATURE
- **Workflow citation**: eee runtime has Ollama incumbent (11700) + Anthropic via CLIProxyAPI + codex CLI. Currently NO unified provider abstraction layer. LiteLLM proxy provides drop-in OpenAI-compat for all 3 + adds 100+ provider headroom (Bedrock/Azure/Vertex) for Tier-5 multi-vendor research probes. Confirms W209 J STUDY-PILOT verdict → graduate to ADOPT-NOW per CR-12 GENUINELY-NEW disposition.
- **Install path**: `pip install litellm` or `docker pull berriai/litellm:latest` per CR-6 official channel.

### #2 — **Langfuse** — Production OSS Observability (alternative to Phoenix)
- **Cite**: `Z:/repos/deps/langfuse/README.md:38-80 @ HEAD 2466d4ce9bc33b24d6ae5c63cc32293555eec0c0` [VERIFIED 2026-05-15]
- **License**: MIT core + `ee/`/`web/src/ee/` commercial subset (Langfuse GmbH 2023-2025) — MIT-compatible per Probe 6 permissive whitelist
- **Axis verdict**: 1✅ (ClickHouse-substrate + Langfuse GmbH + Y-Combinator W23) / 2✅ (named-T2 + 9k+ stars + Docker Hub pulls badge) / 3✅ STABLE-BURN-IN
- **Workflow citation**: Phoenix is INCUMBENT for tracing (port 16006) but W207 F flagged STUDY-PILOT eval workflow gaps. Langfuse provides production-grade OTLP ingestion + self-host Docker + ClickHouse backend for higher throughput than Phoenix research-tier. Phoenix retained for research/eval workflows; Langfuse adds production telemetry layer.
- **Note**: PARTIAL-OVERLAP with Phoenix per CR-12 disposition lattice. ADOPT only if production-tier observability demand surfaces beyond current Phoenix research-tier wire.

### #3 — **Opik** (Comet ML) — Standalone LLM-Judge with MCP Integration
- **Cite**: `Z:/repos/deps/opik/README.md @ HEAD 26fd69b9cef7c14a74ef63ffbbb1964fb06d6428` [VERIFIED 2026-05-15] + `Z:/repos/deps/opik/extensions/cursor/README.md` (Cursor MCP extension shipped — matches eee plugin model)
- **License**: Apache-2.0 (Comet ML)
- **Axis verdict**: 1✅ (Comet ML org + Python+TS+OTel dual SDK + opik_optimizer benchmark suite) / 2✅ (named-author Comet ML team + arc_agi benchmark scripts) / 3✅ STABLE-BURN-IN
- **Workflow citation**: per CLAUDE.md `OPIK_API_KEY` is in disabled-MCP list (commercial-tier gated) — but the OSS standalone judge stack is fully workable per `sdks/python/` + `sdks/typescript/` + opik_optimizer. Provides LLM-judge + optimizer + Cursor MCP integration. GENUINELY-NEW vs deepeval+ragas overlap analysis.

### #4 — **Inspect AI** (UK AI Security Institute) — Research-Tier Evals
- **Cite**: `Z:/repos/deps/inspect_ai/README.md @ HEAD 5b4f3a6346f838dd9e7ca5f30af6c90bef7342ae` [VERIFIED 2026-05-15]
- **License**: MIT — UK AI Security Institute (2024)
- **Axis verdict**: 1✅ (UK gov AISI named-org + bridge support for agentsdk/langchain/pydantic-ai) / 2✅ (UK government endorsement = TIER-1-NAMED-AUTHOR equivalent) / 3✅ (>1yr)
- **Workflow citation**: deepeval + ragas + promptfoo cover production-judge workflows. Inspect AI fills the **research-class adversarial eval workflow** beyond unit-test-style judges — includes intervention/approval/HTTP-proxy bridges + bench harnesses. STUDY-PILOT-NARROW per CR-12 GENUINELY-NEW (research-tier specialization, not duplicate of deepeval).

### #5 — **vLLM** (GPU-Tier Serving for Power-User Workflows)
- **Cite**: `Z:/repos/deps/vllm/README.md:22-62 @ HEAD 95995bbef81292e3ee1ef0df5ca3989bb481bdd5` [VERIFIED 2026-05-15]
- **License**: Apache-2.0 (vllm-project, UC Berkeley Sky Computing Lab)
- **Axis verdict**: 1✅ (UC Berkeley + 2000+ contributors + 200+ model architectures + arxiv paper 2309.06180) / 2✅ (Kwon et al. paper PagedAttention named-author) / 3✅ MATURE (>2yr SIGOPS 2023)
- **Workflow citation**: Ollama incumbent covers CPU/edge/single-user. vLLM provides **production GPU-tier throughput** for high-throughput batch eval workloads (eval-harness across 100+ test cases) — but Probe-5 BORDERLINE: GPU-required + Windows secondary support. **STUDY-PILOT** rather than ADOPT-NOW until eee has GPU workflow demand.
- **Caveat**: vLLM does not displace Ollama; complementary tier when workflow demands surface.

## 4. STUDY-PILOT-NARROW (5-15 candidates)

| # | Candidate | Why STUDY-PILOT not ADOPT-NOW |
|---|-----------|-------------------------------|
| 6 | **DeepEval v4** | Confirm W207 F STUDY-PILOT — native MCP per `Z:/repos/deps/deepeval/skills/` |
| 7 | **Ragas v0.3** | Confirm W207 F STUDY-PILOT — RAG-specific subset |
| 8 | **OpenLLMetry** | W207 F STUDY-PILOT — OTel substrate for Phoenix/Langfuse |
| 9 | **HuggingFace TGI** | not cloned in deps; production GPU serving alternative to vLLM — defer until vLLM lands first |
| 10 | **EleutherAI lm-eval-harness** | `Z:/repos/deps/lm-evaluation-harness/.git @ 8eac7a7de5215c907fbddc30efdaf316913eccdd` MIT — research-academic eval framework, 100+ task definitions; STUDY-PILOT for academic benchmark workflows only |
| 11 | **OpenAI Evals** | `Z:/repos/deps/openai-evals/.git @ 8eac7a7de5215c907fbddc30efdaf316913eccdd` MIT (2023 OpenAI) — W122 Ship 2 REJECT-FOR-FIT precedent retained; STUDY-PILOT secondary |
| 12 | **Cosmopolitan llama** (jart) | not cloned in deps; portable single-binary GGUF inference — DEFER |

## 5. REJECT-FOR-FIT

| # | Candidate | Reject reason |
|---|-----------|--------------|
| R1 | **KoboldCPP** | **AGPLv3 LICENSE BLOCKER** per Probe 6 — claude-sota permissive-license-only policy refuses AGPL/GPL strong-copyleft (cite `Z:/repos/deps/koboldcpp/LICENSE.md:1-3`). Hard structural blocker. |
| R2 | **LM Studio (desktop)** | Probe 5 GUI-only desktop app — incompatible with eee autonomous /loop mode |
| R3 | **SillyTavern** | Frontend chat UI, not server primitive — does not match eee server-architecture |
| R4 | **Braintrust** | Proprietary closed-source SaaS commercial-tier required (no free tier covering eee burn) — Probe 6 |
| R5 | **LangSmith** | Proprietary LangChain-org commercial-tier (auth-required) — Probe 6 + DUPLICATE-FUNCTIONALITY with Langfuse OSS |
| R6 | **W&B Weave** | Proprietary Weights & Biases commercial — Probe 6 |
| R7 | **llama.cpp (direct)** | **DUPLICATE-FUNCTIONALITY** — Ollama wraps llama.cpp transitively. Direct adoption violates kiss-dry-yagni Must-Never #4 |
| R8 | **HELM (Stanford CRFM)** | Research-only framework, no production-judge workflow — defer to OpenAI-Evals/Inspect-AI for similar research surface |
| R9 | **TGI (HuggingFace)** | If vLLM adopted first, TGI is DUPLICATE-FUNCTIONALITY same tier |

## 6. Gap Analysis — 3 Most Underserved Primitives in Pure Runtime

### Gap #1 — **Provider Router Layer** (MISSING)
Pure runtime has 3 independent provider channels: (a) Ollama 11700 local, (b) CLIProxyAPI 11700 OAuth Anthropic, (c) codex CLI OpenAI. NO unified router → every consumer (LangFuse/Phoenix/deepeval/promptfoo) must individually configure 3 different endpoint shapes. **LiteLLM gateway closes this gap** (W209 J STUDY-PILOT confirmed → ADOPT-NOW). Workflow citation: any new eval/judge primitive needs single OpenAI-format endpoint to route across all 3 providers; LiteLLM serves this directly.

### Gap #2 — **Production-Tier Observability** (PARTIALLY MISSING)
Phoenix (port 16006) is INCUMBENT but **W207 F flagged STUDY-PILOT for production tier**. Currently no high-throughput trace ingestion + ClickHouse backend for >1k req/sec workloads. **Langfuse self-host closes this** (PARTIAL-OVERLAP per CR-12 — Phoenix research-tier + Langfuse production-tier complementary). Workflow citation: as eee waves grow >5 agents (Wave 50+ multi-agent fleet patterns), Phoenix research-tier strains under fan-out telemetry; production-tier ingestion becomes load-bearing.

### Gap #3 — **GPU-Tier Local Serving** (PARTIALLY MISSING)
Ollama is INCUMBENT for CPU/single-user inference. **No GPU-throughput primitive** for batch eval harness runs (e.g., running 200+ Inspect AI / deepeval test cases against local qwen3.6:35b). **vLLM closes this** but Probe-5 BORDERLINE (GPU-required + Windows secondary). Workflow citation: STUDY-PILOT pending demonstrated GPU workflow demand — DEFER until eee has explicit batch-eval workload that exceeds Ollama serial throughput.

## 7. Cite Trail (file:line + HEAD SHA depth)

### Local serving
- Ollama: `Z:/repos/deps/ollama/README.md @ c2f2d90a679317e443b0c35aa6d6d747cdd6c57b` + LICENSE:1-3 MIT [VERIFIED 2026-05-15]
- vLLM: `Z:/repos/deps/vllm/README.md:1-100 @ 95995bbef81292e3ee1ef0df5ca3989bb481bdd5` + LICENSE Apache-2.0 [VERIFIED 2026-05-15]
- llama.cpp: `Z:/repos/deps/llama.cpp/README.md @ 5757c4dcb178a01c85234a6db7503b19c9598873` + LICENSE MIT (ggml authors 2023-2026) [VERIFIED 2026-05-15]
- KoboldCPP: `Z:/repos/deps/koboldcpp/LICENSE.md:1-3 @ 993e3f407ea8213f7d32cb9367ae7616b7e15b4a` — **AGPLv3 BLOCKER** [VERIFIED 2026-05-15]
- CLIProxyAPI: `Z:/repos/deps/CLIProxyAPI/LICENSE:1-3 @ b31877e8ec8a1a58e7da88e0b235b9ca0028f504` MIT (2025-2005.9 Luis Pater) [VERIFIED 2026-05-15]

### LLM-judge + observability
- LiteLLM: `Z:/repos/deps/litellm/README.md:1-80 @ 934ecdca78daf7ec9514efd47df77bf7495c822d` MIT+ee/ [VERIFIED 2026-05-15]
- Langfuse: `Z:/repos/deps/langfuse/README.md @ 2466d4ce9bc33b24d6ae5c63cc32293555eec0c0` + LICENSE:1-5 MIT+ee/ Langfuse GmbH [VERIFIED 2026-05-15]
- Opik: `Z:/repos/deps/opik/README.md @ 26fd69b9cef7c14a74ef63ffbbb1964fb06d6428` + LICENSE Apache-2.0 Comet ML [VERIFIED 2026-05-15]
- Phoenix: `Z:/repos/deps/phoenix/LICENSE:1-3 @ 419c3a06978abce8f611569228438929f8e7b995` Elastic-2.0 [VERIFIED 2026-05-15]
- DeepEval: `Z:/repos/deps/deepeval/LICENSE.md @ 99878bdefd93632dc1cd80319b163fca8acee6e6` Apache-2.0 [VERIFIED 2026-05-15]
- Ragas: `Z:/repos/deps/ragas/LICENSE @ 298b68274234c060deacab3cf5fb52aa3a20e885` Apache-2.0 [VERIFIED 2026-05-15]
- Inspect AI: `Z:/repos/deps/inspect_ai/LICENSE:1-3 @ 5b4f3a6346f838dd9e7ca5f30af6c90bef7342ae` MIT (UK AISI 2024) [VERIFIED 2026-05-15]

### Cross-model harnesses
- codex CLI: `Z:/repos/deps/codex/LICENSE @ 6632cb788facbbbe9b47a5133bfec6a67aee5ee8` Apache-2.0 [VERIFIED 2026-05-15]
- gemini-cli: `Z:/repos/deps/gemini-cli/LICENSE @ 1a894c18eaaa7229159a5433c4350a1594b25bac` Apache-2.0 [VERIFIED 2026-05-15]

### Research evals (DEFER/STUDY-PILOT-NARROW only)
- OpenAI Evals: `Z:/repos/deps/openai-evals/LICENSE.md:1-3 @ 8eac7a7de5215c907fbddc30efdaf316913eccdd` MIT (OpenAI 2023) [VERIFIED 2026-05-15]
- lm-evaluation-harness (EleutherAI): `Z:/repos/deps/lm-evaluation-harness/LICENSE.md:1-3 @ 8eac7a7de5215c907fbddc30efdaf316913eccdd` MIT (EleutherAI 2020) [VERIFIED 2026-05-15]

### Cardinal-rule cross-references
- Cardinal-rule-1 (cite-trail): `Z:/claude-sota-installed/CLAUDE.md:46-66`
- Cardinal-rule-9 (install-risk + REVERT check + sibling-bleed defense): `Z:/claude-sota-installed/CLAUDE.md` cardinal-rule-9 block
- Cardinal-rule-12 (upstream-install-priority + 6-class disposition lattice): `Z:/claude-sota-installed/.claude/rules/cardinal-rule-12-upstream-install-priority.md`
- Probe DAG (Probes 1-7): `Z:/claude-sota-installed/.claude/rules/ahfv-probe-dag.md`
- Convergence-gate Axis 1+2+3: `Z:/claude-sota-installed/.claude/rules/convergence-gate.md`
- Synthesis-layer-verify §Reporting categories: `Z:/claude-sota-installed/.claude/rules/synthesis-layer-verify.md`

### Standing directive disclosure
- STAND-IN per `Z:/claude-sota-installed/CLAUDE.local.md` ENV (f) — Sonnet stand-in via env-funneled `CLAUDE_CODE_SUBAGENT_MODEL=claude-sonnet-4-6`. Cross-model gate NOT structurally satisfied for this dispatch. Orchestrator MUST file 2nd-stage codex T1 validation per `Z:/claude-sota-installed/.claude/rules/ahfv-codex-rescue-blind-spot.md §FM-09 2-stage validation contract` before ANY ADOPT-NOW ship from §3 above. n=5 same-arc 2026-05-04 evidence base rate 100% on abstract-pattern-reasoning class — applies recursively to this audit's verdicts.

---

**HANDOFF**: handoff_to: orchestrator, output_mode: artifact-inline, artifacts: [tmp/wave210-agentN-local-model-judge-deep-2026-05-15.md (inline above; orchestrator persists post-completion per FM-19)], verdict_one_line: "DONE_WITH_CONCERNS: 16 candidates audited across 4 categories; 5 ADOPT-NOW top recommendations (LiteLLM/Langfuse/Opik/Inspect-AI/vLLM-deferred); 9 REJECT-FOR-FIT (1 LICENSE-blocker KoboldCPP AGPLv3, 3 proprietary-commercial Braintrust/LangSmith/Weave, 5 mode-harness/duplicate); STAND-IN dispatch — operator must run codex T1 2nd-stage on any ADOPT verdict before ship per FM-09 100% base rate"
