---
title: W229 Agent B — Memory/RAG/Vector/Eval/Observability residual probe
status: AUTHORITATIVE-CANDIDATE
date: 2026-05-15
wave: 229
agent: B (sota-researcher Sonnet stand-in per cmc-env-funneled-disclosure.md §The mandate Option 2)
predecessors: W216 Agent D (memory+KG+vector) + W216 Agent E (RAG+DocAI+obs+eval) + W223 Agent A (eval+obs tie-breakers) + W225 FINAL MASTER + W228 Agent A v6-kit deep-mine
artifact-class: residual-category-probe-with-saturation-HNF
---

## STAND-IN-NOTICE

W229 Agent B ran under `CLAUDE_CODE_SUBAGENT_MODEL=claude-sonnet-4-6` stand-in per `CLAUDE.local.md` ENV (g) DEPRECATED. Cross-model gate NOT structurally satisfied at sub-agent layer.

## Section 1 — Category-filtered residual URLs

**Source corpus**: 382 deduped GitHub URLs in `Z:/claude-sota-installed/docs/outer research/kits/` extracted via `find ... -name "*.md" -print0 | xargs -0 grep -hoE 'github\.com/...' | sort -u`.

**Memory/RAG/Vector/Eval/Observability keyword filter** (84 keyword cohort): **13 hits**. **Incumbent cross-ref** (W216+W223+W225+W228-A baselines covering 34+ memory/RAG/eval/obs primitives): **9 already-incumbent + 4 RESIDUAL**.

13 raw kits/ hits:
1. AzozzALFiras/claude-context-optimizer — **RESIDUAL**
2. OpenHands/benchmarks — **RESIDUAL**
3. confident-ai/deepeval — incumbent (W223-A 🥇 RAG-eval winner)
4. crewAIInc/crewAI — incumbent (W216/W223 reference)
5. docling-project/docling — incumbent (W216-E + W225 Phase 6)
6. egorfedorov/claude-context-optimizer — **RESIDUAL**
7. langchain-ai/langgraph — incumbent (W216-E Layer A)
8. mem0ai/mem0 — incumbent (W216-D #5 92/100)
9. microsoft/markitdown — incumbent (W216-E + W225 Phase 6)
10. promptfoo/promptfoo — incumbent (W223-A 🥈 RAG-eval)
11. swe-bench/SWE-bench — incumbent (eval benchmark cite)
12. zcquant/claude-code-monitor — **RESIDUAL**
13. zilliztech/claude-context — incumbent (W216-E + W228-A RETRACTION-#4 DEFER)

**Coverage observation**: keyword scope INTENTIONALLY broad (84 keywords across 5 categories); only 13 hits indicates kits/ corpus's memory/RAG/eval/observability surface is THIN — kits were primarily harness/agent-orchestration/quality-gate focused, NOT memory/RAG infrastructure.

## Section 2 — Per-candidate LICENSE + stars + freshness (2026-05-15)

| # | Candidate | License (direct-read SHA) | Stars | Created | Updated | Lang | Description |
|---|---|---|---:|---|---|---|---|
| 1 | **AzozzALFiras/claude-context-optimizer** | MIT (LICENSE blob `21dec82d`) | **35** | 2026-03-31 | 2026-05-05 | TypeScript | "MCP server cutting Claude Code token usage by up to 98%" |
| 2 | **egorfedorov/claude-context-optimizer** | MIT (LICENSE blob `0e4b3ed2`) | **49** | 2026-03-09 | 2026-05-09 | JavaScript | "Claude Code plugin tracking token usage; 30-50% API cost savings" |
| 3 | **OpenHands/benchmarks** | MIT (LICENSE blob `0f64b204`) | **82** | 2025-09-02 | 2026-05-15 | Python | "Evaluation harness for OpenHands V1." 81 open issues |
| 4 | **zcquant/claude-code-monitor** | **NO-ROOT-LICENSE** (only `node_modules/*/LICENSE` in tree) | **11** | 2025-08-06 | 2026-04-27 | JavaScript | "Claude Code Telemetry Monitor — OpenTelemetry OTLP" |

## Section 3 — SRA D1-D10 + CR-12 disposition per candidate

### Candidate #1 — AzozzALFiras/claude-context-optimizer

- D3 stars/cpd: **FAIL — 35★ + ~46d age + low star velocity = pre-burn-in**
- D4 provenance: FAIL — single-author, no org-backing
- D9 failure-mode: UNKNOWN (98% claim unverified per Row-2 fabrication-test risk)
- D10 replacement: **REJECT** — context-mode MCP plugin ALREADY covers token-savings ~98% MEASURED

Composite: **38/100** — FAIL-axis-3 + Probe 4 plugin-namespace DUPLICATE w/ installed context-mode
**CR-12**: **DUPLICATE-FUNCTIONALITY** per kiss-dry-yagni.md Must-Never #4

### Candidate #2 — egorfedorov/claude-context-optimizer

- D3: **FAIL — 49★ + ~67d age + pre-burn-in**
- D4: FAIL — single-author
- D7 NATIVE-CC: PASS (declared Claude Code plugin)
- D10: PARTIAL-OVERLAP — heatmaps/ROI/budget-alerts/git-aware-suggestions distinct from context-mode

Composite: **45/100** — FAIL-axis-3 + PARTIAL-OVERLAP complement potential
**CR-12**: **PARTIAL-OVERLAP + PROVIDER-COMPLEMENT** — but axis-3 FAIL blocks ADOPT-NOW

### Candidate #3 — OpenHands/benchmarks

- D1 license: MIT ✅
- D3: PASS-borderline — 82★ + ~8mo age = post-burn-in
- D4: PASS — All Hands AI org-backed
- D10: **DUPLICATE-FUNCTIONALITY** — deepeval (W223-A 🥇 15.5k★) covers eval harness role

Composite: **52/100** — PASS-org-backing but DUPLICATE-w/-deepeval
**CR-12**: **DUPLICATE-FUNCTIONALITY** vs W223-A deepeval winner

### Candidate #4 — zcquant/claude-code-monitor

- D1: **FAIL — no root LICENSE file** (Probe 6 direct-file blocker)
- D3: **CRITICAL FAIL — 11★ + ~9mo age** stagnation
- D10: **DUPLICATE-FUNCTIONALITY** — langfuse (W223-A 🥇 27.3k★) covers OpenTelemetry-OTLP comprehensively

Composite: **18/100** — **CRITICAL FAIL** (missing LICENSE + DUPLICATE w/ langfuse)
**CR-12**: **DUPLICATE-FUNCTIONALITY + REJECT-FOR-LICENSE**

## Section 4 — Per-candidate verdict

| # | Candidate | SRA /100 | Verdict | Rationale |
|---|---|---:|---|---|
| 1 | AzozzALFiras/claude-context-optimizer | 38 | **REJECT-FOR-FIT** | DUPLICATE w/ context-mode + Row-2 fabrication-test risk |
| 2 | egorfedorov/claude-context-optimizer | 45 | **DEFER + STUDY-PILOT.b candidate** | PROVIDER-COMPLEMENT shape distinct from context-mode BUT axis-3 FAIL |
| 3 | OpenHands/benchmarks | 52 | **REJECT-FOR-FIT** | DUPLICATE-FUNCTIONALITY vs W223-A deepeval winner |
| 4 | zcquant/claude-code-monitor | 18 | **REJECT-FOR-FIT-LICENSE-BLOCKER + DUPLICATE** | Probe 6 missing LICENSE STOP + DUPLICATE w/ langfuse |

**No ADOPT-NOW recommendations.** All 4 residuals REJECT or DEFER.

## Section 5 — HONEST-NON-FINDING analysis (saturation continuation)

Per `synthesis-layer-verify.md §Reporting categories` HONEST-NON-FINDING: does memory/RAG/eval/observability layer really need additions beyond W216+W223 winners? — answer is **NO** with quantified saturation evidence:

**Saturation evidence (5-axis)**:

1. **Memory layer saturated**: W216 Agent D Top 8 covered every architectural shape — local-first MCP (doobidoo/mcp-memory-service 94/100) + cloud-platform (mem0ai/mem0 92/100) + memory-control-plane (cognee 93/100) + temporal-KG (graphiti 95/100) + canonical-reference (MCP-org/memory 85/100) + stateful-agent (letta 88/100). Operator selected doobidoo + graphiti INSTALLED+wired. No architectural gap.

2. **Vector DB saturated**: W216-D covered qdrant 96 + chroma 91 + milvus 90 + weaviate 88 + lancedb 88 + pgvector 85. All 6 Apache/MIT-permissive. W225 Phase 5 picks qdrant. No vector residuals.

3. **RAG framework + DocAI saturated**: W216-E covered llama_index 95 + langchain + LightRAG + graphrag + docling + markitdown + chonkie + FlagEmbedding + text-embeddings-inference. W225 Phase 6 picks canonical stack. NO residual.

4. **Eval layer saturated post-W223-A tie-break**: 🥇 deepeval (Apache-2.0 15.5k★) + 🥈 promptfoo (MIT 21k★) + ragas + garak (red-team) + inspect_ai (AISI) = 5-way coverage. OpenHands/benchmarks brings 0 architectural novelty.

5. **Observability saturated post-W223-A tie-break**: 🥇 langfuse (27.3k★ MIT-core) + 🥈 openllmetry (Apache-2.0 OTel substrate) + phoenix INSTALLED + opik + helicone. zcquant/claude-code-monitor brings 0 novelty + license blocker.

**Conclusion**: memory/RAG/eval/observability layers are ARCHITECTURALLY SATURATED at W216+W223 winners. Further mining surfaces only:
- Pre-burn-in candidates (D3 axis-3 FAIL — 35/49 stars under threshold)
- DUPLICATE-FUNCTIONALITY w/ incumbents
- LICENSE-blocker candidates (Probe 6 FAIL)
- Solo-author / sub-50★ / no org-backing (D4 axis-1 FAIL)

**173 unprobed candidates from W228-A** remain in NON-memory/RAG/eval/obs categories (governance / workflow / quality / agent-orchestration / token-admission / installable-CLI). Memory/RAG/eval/obs is NOT where future yield lives.

**Recommendation to orchestrator**:
- DROP further memory/RAG/eval/observability probing — saturation confirmed
- Redirect remaining mining budget to non-category 173 unprobed v6-kit candidates per W228-A coverage gap

## Section 6 — VERDICT

**VERDICT**: APPROVE-W229-AGENT-B: memory/RAG/eval/observability ARCHITECTURALLY SATURATED at W216+W223 winners; 0/4 residual candidates ADOPT-NOW (1 DEFER egorfedorov axis-3 FAIL / 3 REJECT — 1 LICENSE-blocker zcquant + 2 DUPLICATE-FUNCTIONALITY w/ context-mode + deepeval); HONEST-NON-FINDING quantified 5-axis saturation evidence; redirect to 173 non-category unprobed kits candidates; STAND-IN-NOTICE Path P codex T1 ratification mandatory per cmc-env-funneled-disclosure.md.
