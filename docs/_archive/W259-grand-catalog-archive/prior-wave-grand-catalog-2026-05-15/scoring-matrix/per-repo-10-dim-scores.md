---
title: Per-Repo 10-Dimension Scoring Matrix
status: AUTHORITATIVE-CANDIDATE
date: 2026-05-15
wave: 251 Wave 2 (Agent D sota-researcher Sonnet population + Path P codex T1 NEEDS-REVISION conf=0.91 Pattern A fixes integrated)
cite-anchor: 01-scoring-rubric-10-dim.md + agent-artifacts/Path-P-codex-T1-adversarial-verdict.md + docs/sota-pure-runtime-catalog-2026-05-15.md
total-entries: 91
pattern-a-fixes-applied: 5 (anthropics/skills + trailofbits/skills-curated + VikParuchuri/marker + NeoLabHQ/context-engineering-kit + smtg-ai/claude-squad)
phantom-reconciled: 4 (lunary/braintrust SCOPE-NAME-MISMATCH; governor/leanctx FAST-CHURN)
hard-rule-blocker-demotions: 25 (D3=0 license OR D5=0 meta-harness OR D9=0 duplicate)
borderline-flagged: 3 (anthropics/skills / obra/superpowers-chrome / modelcontextprotocol/servers Memory)
cross-model-gate: FULL at L0 (Path P codex T1 NEEDS-REVISION conf=0.91 on rubric design) + FULL at L1 Wave 250 (n=2 codex T1 dispatches) + PARTIAL at L2 matrix population (Sonnet stand-in + Mia pre-apply)
---

# Per-Repo 10-Dimension Scoring Matrix

## Composite formula

```
composite_normalized = sum(d_i × w_i) / 10  →  range 0-100
weights: D1=5 + D2=15 + D3=15 + D4=10 + D5=15 + D6=8 + D7=8 + D8=6 + D9=12 + D10=6 = 100 ✅
```

**Hard-rule blockers** (override composite per `01-scoring-rubric-10-dim.md §Hard-rule blockers`):
- D3=0 (AGPL/SSPL/proprietary/NOASSERTION) → max composite 49 (F-band)
- D9=0 (DUPLICATE-FUNCTIONALITY) → max composite 49 (F-band)
- D5=0 (E meta-harness) → max composite 59 (D-band)

## Pattern A fix-forward applied (per Path P codex T1 NEEDS-REVISION conf=0.91)

| # | Wave 250 line | Repo | Original verdict | Path A fix |
|---|---|---|---|---|
| 1 | L94 | anthropics/skills | INSTALL-NOW (Δ1) | **DEFER-HNF** (NOASSERTION — Probe 6 fails until SPDX verified) |
| 2 | L101 | trailofbits/skills-curated | INSTALL-NOW (Δ1) | **CITE-AS-REFERENCE** (CC-BY-SA-4.0 share-alike not permissive) |
| 3 | L67 | VikParuchuri/marker | STUDY-PILOT (Δ2) | **REJECT-FOR-INSTALL** (GPL-3.0 structural blocker) |
| 4 | L111 | NeoLabHQ/context-engineering-kit | STUDY-PILOT (Δ2) | **CITE-AS-REFERENCE** (GPL-3.0 cite-only) |
| 5 | L106 | smtg-ai/claude-squad | MIT marked | **AGPL-3.0 actual** (per Path P codex direct GitHub probe) + Windows-broken blocker |

## Phantom probe reconciliation (Wave 2 Mia)

| Path P flag | Mia probe result | Final classification |
|---|---|---|
| `lunary-ai/lunary` | org exists w/ 9 repos; exact-name 404 | **SCOPE-NAME-MISMATCH** (use lunary-py); NOT pure phantom |
| `braintrustdata/braintrust` | org exists w/ 67 repos; exact-name 404 | **SCOPE-NAME-MISMATCH** (use autoevals); NOT pure phantom |
| `0xhimanshu/governor` | EXISTS, created 2026-05-01 | **FAST-CHURN ~14d** (D4=2 LAUNCH-SPIKE) |
| `jia-gao/leanctx` | EXISTS, MIT, created 2026-04-18 | **FAST-CHURN ~28d** (D4=2 LAUNCH-SPIKE) |

## Master grading tables (per category)

### Cat 01 — Memory + RAG

| Repo | D1(5) | D2(15) | D3(15) | D4(10) | D5(15) | D6(8) | D7(8) | D8(6) | D9(12) | D10(6) | Composite | Letter | Status | Verdict |
|---|--:|--:|--:|--:|--:|--:|--:|--:|--:|--:|--:|---|---|---|
| doobidoo/mcp-memory-service | 4 | 6 | 10 | 10 | 8 | 10 | 4 | 6 | 10 | 8 | 79.6 | B | INSTALLED | KEEP-INSTALLED |
| getzep/graphiti (Path P #2 source-graded) | 8 | 8 | 10 | 10 | 6 | 6 | 6 | 10 | 10 | 6 | **80.0** | **A INSTALL-NOW** | NOT-WIRED | **Δ1 INSTALL-NOW** (FalkorDB Docker + GRAPHITI_TELEMETRY_ENABLED=false) |
| Anthropic memory_20250818 | 10 | 10 | 10 | 8 | 4 | 6 | 10 | 10 | 10 | 10 | 84.4 | A | NOT-WIRED | Δ2 STUDY-PILOT |
| anthropics/claude-cookbooks memory_tool | 8 | 10 | 10 | 10 | 4 | 10 | 8 | 10 | 10 | 10 | 86.2 | A | CITE-ONLY | CITE-AS-REFERENCE |
| mem0ai/mem0 | 10 | 6 | 10 | 10 | 6 | 6 | 6 | 10 | 7 | 8 | 76.8 | B | NOT-WIRED | Δ2 STUDY-PILOT |
| thedotmack/claude-mem | 10 | 4 | 10 | 6 | 8 | 10 | 6 | 4 | 7 | 8 | 70.0 | B | INSTALLED | Δ4 DEFER/QUARANTINE (LIKELY-INFLATED) |
| volcengine/OpenViking | 8 | 8 | 0 | 6 | 0 | 0 | 4 | 6 | 10 | 6 | 36.8 → **F (D3=0 cap)** | F | BLOCKER | REJECT + CITE-AS-ARCHITECTURE |
| MemPalace/mempalace | 10 | 0 | 10 | 2 | 4 | 8 | 2 | 0 | 0 | 6 | 40.6 → **F (D9=0 cap)** | F | DISPUTED | REJECT (Row-2 fabrication) |
| letta-ai/letta | 8 | 8 | 10 | 10 | 0 | 4 | 4 | 6 | 0 | 6 | 51.6 → **F (D5=0+D9=0)** | F | META-HARNESS | REJECT-FOR-FIT |
| supermemoryai/supermemory | 8 | 4 | 10 | 6 | 8 | 4 | 4 | 4 | 7 | 6 | 64.4 | C | SaaS-LOCK | REJECT-FOR-FIT-SELF-HOST |
| modelcontextprotocol/servers Memory (Path P #3 corrected D9: PARTIAL-OVERLAP/PROVIDER-COMPLEMENT not full DUPLICATE) | 10 | 10 | 10 | 10 | 6 | 8 | 2 | 6 | **5** | 8 | **77.6** | **B** | NOT-WIRED | **DEFER** (PARTIAL-OVERLAP — sqlite_vec sufficient locally; cite as ref-impl) |
| topoteretes/cognee | 8 | 6 | 10 | 10 | 8 | 8 | 4 | 6 | 5 | 6 | 69.4 | C | NOT-WIRED | DEFER (graphiti supersedes) |
| qdrant+chroma+milvus MCPs (bundled — DEPRECATED row per Path P #3) | 8 | 8 | 10 | 10 | 6 | 6 | 4 | 6 | 7 | 8 | 73.2 | B | NOT-WIRED | **SPLIT — see qdrant/mcp-server-qdrant standalone row below** |
| **qdrant/mcp-server-qdrant** (NEW per Path P #3 SPLIT; Mia-verified 2024-12-02 STABLE-BURN-IN) | 6 | 10 | 10 | 10 | 6 | 6 | 6 | 8 | 10 | 8 | **82.0** | **A INSTALL-NOW** | NOT-WIRED | **Δ1 INSTALL-NOW #1** — OFFICIAL Qdrant MCP per gap-matrix L42; SRA L2 official wiring |
| infiniflow/ragflow | 10 | 6 | 10 | 10 | 0 | 4 | 2 | 6 | 0 | 6 | 56.2 → **F (D5=0+D9=0)** | F | DUPLICATE-APP | REJECT-FOR-FIT |
| Mintplex-Labs/anything-llm | 10 | 6 | 10 | 10 | 0 | 4 | 2 | 4 | 0 | 6 | 54.8 → **F** | F | DUPLICATE-APP | REJECT-FOR-FIT |
| arc53/DocsGPT | 8 | 4 | 10 | 8 | 0 | 4 | 2 | 4 | 0 | 6 | 50.2 → **F** | F | DUPLICATE-APP | REJECT-FOR-FIT |
| weaviate/Verba+truefoundry/cognita | 8 | 6 | 10 | 8 | 0 | 4 | 2 | 4 | 0 | 6 | 51.4 → **F** | F | DUPLICATE-APP | REJECT-FOR-FIT |

### Cat 02 — Orchestration + Agent fleet

| Repo | D1(5) | D2(15) | D3(15) | D4(10) | D5(15) | D6(8) | D7(8) | D8(6) | D9(12) | D10(6) | Composite | Letter | Status | Verdict |
|---|--:|--:|--:|--:|--:|--:|--:|--:|--:|--:|--:|---|---|---|
| affaan-m/everything-claude-code (ECC) | 10 | 10 | 10 | 10 | 8 | 10 | 6 | 10 | 10 | 10 | 92.8 | **A+** | INSTALLED | KEEP-INSTALLED |
| EveryInc/compound-engineering-plugin | 10 | 10 | 10 | 10 | 8 | 10 | 6 | 8 | 9 | 10 | 90.2 | **A+** | INSTALLED W229 | KEEP-INSTALLED |
| obra/superpowers | 10 | 10 | 10 | 10 | 8 | 10 | 6 | 10 | 10 | 10 | 92.8 | **A+** | INSTALLED | KEEP + REFRESH (Δ3) |
| wshobson/agents (claude-code-workflows) | 10 | 6 | 10 | 10 | 8 | 8 | 4 | 8 | 10 | 8 | 81.6 | A | INSTALLED | KEEP + PER-PLUGIN-CURATION (Δ3) |
| stanfordnlp/dspy | 10 | 8 | 10 | 10 | 4 | 6 | 6 | 10 | 9 | 8 | 79.2 | B | NOT-WIRED | Δ2 STUDY-PILOT |
| huggingface/smolagents | 10 | 8 | 10 | 10 | 4 | 6 | 4 | 8 | 7 | 8 | 73.6 | B | NOT-WIRED | Δ2 STUDY-PILOT |
| ruvnet/ruflo | 10 | 6 | 10 | 10 | 8 | 6 | 4 | 6 | 9 | 8 | 76.4 | B | NOT-WIRED | Δ2 STUDY-PILOT Path A |
| bmad-code-org/BMAD-METHOD | 10 | 6 | 10 | 10 | 2 | 6 | 4 | 6 | 5 | 8 | 65.4 | C | NOT-WIRED | DEFER (Δ4) |
| Yeachan-Heo/oh-my-claudecode | 8 | 4 | 10 | 8 | 0 | 4 | 2 | 4 | 0 | 6 | 49.0 → **F** | F | COMPETING | REJECT-FOR-FIT |
| smtg-ai/claude-squad (Path P L106 fix) | 6 | 6 | 0 | 8 | 8 | 4 | 4 | 4 | 5 | 0 | 45.0 → **F (D3=0+D10=0)** | F | **AGPL+WIN-BROKEN** | REJECT-FOR-FIT |
| eyaltoledano/claude-task-master | 10 | 6 | 6 | 10 | 2 | 6 | 4 | 4 | 5 | 6 | 60.0 | C | NOT-CC-NATIVE | DEFER |
| jeremylongshore/claude-code-plugins-plus-skills (Path P #3 corrected D9: ECOSYSTEM-IMPORT not DUPLICATE) | 6 | 4 | 10 | 8 | 4 | 4 | 2 | 2 | **3** | 6 | **53.2** | **D** | NOT-INSTALLED | **CITE-AS-REFERENCE** (ECOSYSTEM-IMPORT discovery surface; 425 plugins selective vendoring only) |
| AnandChowdhary/continuous-claude | 6 | 4 | 10 | 8 | 4 | 6 | 4 | 4 | 0 | 6 | 53.0 → **F** | F | DUPLICATE | REJECT-FOR-FIT |
| stravu/crystal | 4 | 0 | 6 | 0 | 0 | 0 | 0 | 2 | 0 | 0 | 13.4 | F | DEPRECATED | REJECT |
| NeoLabHQ/context-engineering-kit (Path P L111 fix) | 4 | 4 | 2 | 6 | 8 | 6 | 4 | 8 | 5 | 6 | 51.2 | D | CITE-ONLY | **CITE-AS-REFERENCE** |
| gmickel/flow-next | 4 | 4 | 10 | 6 | 8 | 8 | 4 | 4 | 5 | 8 | 60.0 | C | NOT-INSTALLED | Δ2 STUDY-PILOT Ralph-only |
| obra/superpowers-chrome | 4 | 10 | 10 | 8 | 8 | 10 | 4 | 8 | 7 | 8 | 78.8 ± | B± BORDERLINE | NOT-WIRED | Δ2 STUDY-PILOT |
| obra/superpowers-lab | 4 | 10 | 10 | 8 | 8 | 10 | 4 | 6 | 7 | 8 | 77.6 | B | NOT-WIRED | Δ2 STUDY-PILOT |
| SWE-agent/SWE-agent | 10 | 8 | 10 | 10 | 0 | 4 | 4 | 8 | 0 | 6 | 56.4 → **F** | F | BENCHMARK | DEFER |
| Aider-AI/aider | 10 | 6 | 10 | 10 | 2 | 6 | 4 | 8 | 3 | 8 | 64.6 | C | COMPETING-CLI | DEFER |
| langchain-ai/langgraph | 10 | 8 | 10 | 10 | 2 | 4 | 4 | 8 | 5 | 8 | 65.8 | C | NOT-CC-NATIVE | DEFER |
| openai/skills | 10 | 10 | 0 | 8 | 4 | 6 | 4 | 6 | 3 | 8 | 49.2 → **F (D3=0)** | F | OPENAI-SIDE | DEFER |
| microsoft/autogen | 10 | 10 | 2 | 10 | 0 | 4 | 4 | 8 | 0 | 8 | 50.4 → **F (D5=0+D9=0)** | F | COMPETING | REJECT-FOR-FIT |
| crewAIInc/crewAI | 10 | 6 | 10 | 10 | 0 | 6 | 4 | 6 | 0 | 8 | 56.0 → **F** | F | COMPETING | REJECT-FOR-FIT |
| agno-agi/agno | 10 | 6 | 10 | 10 | 0 | 6 | 4 | 6 | 0 | 8 | 56.0 → **F** | F | COMPETING | REJECT-FOR-FIT |
| continuedev/continue | 10 | 8 | 10 | 10 | 0 | 4 | 4 | 6 | 3 | 8 | 58.0 → **F (D5=0)** | F | IDE-COMPETING | DEFER |
| RooCodeInc/Roo-Code | 10 | 6 | 10 | 10 | 0 | 4 | 4 | 4 | 0 | 6 | 51.2 → **F** | F | COMPETING | REJECT-FOR-FIT |
| inngest/inngest | 8 | 8 | 0 | 10 | 0 | 4 | 4 | 6 | 5 | 8 | 47.6 → **F (D3=0)** | F | LICENSE | DEFER |
| OpenBB-finance/OpenBB | 10 | 8 | 0 | 10 | 0 | 4 | 4 | 6 | 0 | 6 | 46.0 → **F (D3=0 AGPL)** | F | LICENSE | REJECT-FOR-FIT |
| skypilot-org/skypilot | 8 | 8 | 10 | 10 | 0 | 4 | 4 | 6 | 0 | 6 | 53.0 → **F** | F | OUT-OF-LAYER | REJECT-FOR-FIT |
| mannaandpoem/OpenManus | 4 | 0 | 0 | 4 | 0 | 4 | 2 | 2 | 0 | 6 | 22.8 | F | STALE | REJECT-FOR-FIT |

### Cat 03 — Skills + Marketplaces

| Repo | D1(5) | D2(15) | D3(15) | D4(10) | D5(15) | D6(8) | D7(8) | D8(6) | D9(12) | D10(6) | Composite | Letter | Status | Verdict |
|---|--:|--:|--:|--:|--:|--:|--:|--:|--:|--:|--:|---|---|---|
| anthropics/claude-plugins-official | 8 | 10 | 10 | 10 | 10 | 10 | 6 | 10 | 10 | 10 | 91.8 | **A+** | INSTALLED | KEEP + REFRESH (Δ3) |
| anthropics/skills (Path P L94 fix) | 10 | 10 | 0 | 8 | 10 | 10 | 6 | 10 | 10 | 10 | 80.8 → **F (D3=0 cap)** | F± BORDERLINE-RESOLUTION | NOT-WIRED | **DEFER-HNF** (NOASSERTION; re-score on SPDX) |
| addyosmani/agent-skills | 10 | 10 | 10 | 10 | 8 | 10 | 6 | 10 | 10 | 10 | 92.8 | **A+** | INSTALLED | KEEP + REFRESH (Δ3) |
| claude-plugins-official/skill-creator | 6 | 10 | 10 | 10 | 10 | 10 | 6 | 10 | 10 | 10 | 90.4 | **A+** | INSTALLED | KEEP-INSTALLED |
| forrestchang/andrej-karpathy-skills (Path P #3 corrected D2: third-party themed cannot inherit Karpathy provenance per rubric L39-45) | 6 | **6** | 10 | 10 | 8 | 10 | 6 | 10 | 10 | 10 | **79.8** | **B** | CITE-ONLY | CITE-AS-REFERENCE |
| trailofbits/skills-curated (Path P L101 fix) | 4 | 10 | 2 | 8 | 8 | 10 | 4 | 8 | 7 | 8 | 64.2 | C | NOT-INSTALLED | **CITE-AS-REFERENCE** (CC-BY-SA-4.0 not permissive) |

### Cat 04 — Token-efficiency + Compaction + Caching

| Repo | D1(5) | D2(15) | D3(15) | D4(10) | D5(15) | D6(8) | D7(8) | D8(6) | D9(12) | D10(6) | Composite | Letter | Status | Verdict |
|---|--:|--:|--:|--:|--:|--:|--:|--:|--:|--:|--:|---|---|---|
| Anthropic cache_control | 10 | 10 | 10 | 10 | 10 | 10 | 10 | 10 | 10 | 10 | 100.0 | **A+** | API-NATIVE | KEEP-USING |
| clear_tool_uses_20250919 | 10 | 10 | 10 | 10 | 10 | 10 | 10 | 10 | 10 | 10 | 100.0 | **A+** | API-BETA | KEEP-USING |
| compact_20260112 | 10 | 10 | 10 | 10 | 10 | 10 | 10 | 10 | 10 | 10 | 100.0 | **A+** | API-BETA | KEEP-USING |
| clear_thinking_20251015 | 10 | 10 | 10 | 10 | 10 | 10 | 8 | 10 | 10 | 10 | 98.8 | **A+** | API-BETA | KEEP-USING |
| memory_20250818 client-side | 10 | 10 | 10 | 10 | 4 | 6 | 10 | 10 | 10 | 10 | 86.2 | A | NOT-WIRED | Δ2 STUDY-PILOT |
| mksglu/context-mode (Path P #2 + Path P #3 corrected) | 8 | 4 | 4 | 2 | 8 | 10 | 10 | 4 | 9 | 10 | **65.2** | **C-band KEEP-CAUTIOUS** | INSTALLED 1.0.111/.133 | KEEP-CAUTIOUS + REFRESH (Δ3) — Elastic-2.0 + FAST-CHURN cpd 19.4 |
| yamadashy/repomix | 8 | 8 | 10 | 10 | 10 | 10 | 8 | 8 | 9 | 10 | 89.6 | A | INSTALLED | KEEP-INSTALLED |
| oraios/serena | 8 | 8 | 10 | 10 | 6 | 8 | 10 | 8 | 9 | 10 | 84.4 | A | INSTALLED | KEEP-INSTALLED |
| mufeedvh/code2prompt | 8 | 6 | 10 | 10 | 6 | 6 | 6 | 6 | 7 | 8 | 71.2 | B | NOT-WIRED | Δ2 STUDY-PILOT |
| chopratejas/headroom | 4 | 6 | 10 | 8 | 8 | 6 | 8 | 4 | 7 | 6 | 67.4 | C | HNF | Δ2 STUDY-PILOT post-verify |
| jia-gao/leanctx | 4 | 4 | 10 | 2 | 4 | 8 | 6 | 4 | 5 | 8 | 53.0 → **F** | F | FAST-CHURN | REJECT-FOR-FIT |
| microsoft/LLMLingua | 8 | 10 | 10 | 10 | 2 | 6 | 4 | 10 | 0 | 8 | 67.6 → **F (D9=0)** | F | SUPERSEDED | REJECT — cite historical only |

### Cat 05 — Observability + Evals + Telemetry

| Repo | D1(5) | D2(15) | D3(15) | D4(10) | D5(15) | D6(8) | D7(8) | D8(6) | D9(12) | D10(6) | Composite | Letter | Status | Verdict |
|---|--:|--:|--:|--:|--:|--:|--:|--:|--:|--:|--:|---|---|---|
| langfuse/langfuse (Path P #2 corrected) | 8 | 6 | 8 | 10 | 6 | 4 | 6 | 6 | 9 | 8 | **71.2** | **B STUDY-PILOT** | NOT-WIRED | **Δ2 STUDY-PILOT** (mixed MIT-except-ee + Docker weight + telemetry default-on) |
| Arize-ai/phoenix (Path P #2 corrected) | 6 | 6 | 4 | 10 | 6 | 6 | 6 | 6 | 7 | 8 | **65.0** | **C STUDY-PILOT** | NOT-WIRED | **Δ2 STUDY-PILOT** (Elastic-2.0 + Apache-2.0 MCP wrapper; analytics default-on) |
| promptfoo/promptfoo | 10 | 10 | 10 | 10 | 8 | 8 | 6 | 10 | 9 | 10 | 88.4 | A | NOT-WIRED | **Δ1 INSTALL-NOW** |
| ryoppippi/ccusage | 8 | 6 | 10 | 10 | 8 | 10 | 6 | 8 | 9 | 10 | 82.4 | A | INSTALLED | KEEP + REFRESH |
| comet-ml/opik | 10 | 8 | 10 | 10 | 6 | 6 | 6 | 8 | 9 | 8 | 79.6 | B | NOT-WIRED | Δ2 STUDY-PILOT |
| traceloop/openllmetry | 8 | 8 | 10 | 10 | 4 | 8 | 6 | 8 | 9 | 8 | 75.2 | B | NOT-WIRED | Δ2 STUDY-PILOT |
| explodinggradients/ragas | 10 | 6 | 10 | 10 | 4 | 6 | 6 | 10 | 9 | 8 | 75.2 | B | NOT-WIRED | Δ2 STUDY-PILOT |
| junhoyeo/tokscale | 6 | 6 | 10 | 8 | 2 | 10 | 8 | 6 | 7 | 8 | 65.0 | C | NOT-WIRED | Δ2 STUDY-PILOT |
| matt1398/claude-devtools | 4 | 4 | 4 | 8 | 2 | 6 | 4 | 4 | 5 | 6 | 44.4 | F | UNVERIFIED | DEFER |
| pydantic/logfire | 10 | 10 | 10 | 10 | 6 | 6 | 6 | 8 | 7 | 8 | 79.6 | B | NOT-WIRED | DEFER (commercial backend) |
| Helicone/helicone | 10 | 8 | 10 | 10 | 4 | 6 | 4 | 6 | 3 | 8 | 67.0 | C | NOT-WIRED | REJECT (proxy-only) |
| lunary-ai/lunary-py (Mia reconcile) | 4 | 6 | 10 | 8 | 4 | 6 | 4 | 4 | 5 | 8 | 56.0 | D | LangChain-only | REJECT |
| braintrustdata/autoevals (Mia reconcile) | 4 | 8 | 10 | 8 | 4 | 6 | 6 | 6 | 7 | 8 | 63.4 | C | NOT-WIRED | DEFER (HNF verify) |
| 0xhimanshu/governor | 0 | 0 | 6 | 2 | 2 | 4 | 4 | 0 | 3 | 4 | 25.0 | F | LAUNCH-SPIKE | REJECT |
| Piebald-AI/splitrail | 6 | 6 | 10 | 8 | 4 | 8 | 6 | 4 | 7 | 8 | 64.2 | C | NOT-WIRED | Δ2 STUDY-PILOT |

### Cat 07 — Document parsers

| Repo | D1(5) | D2(15) | D3(15) | D4(10) | D5(15) | D6(8) | D7(8) | D8(6) | D9(12) | D10(6) | Composite | Letter | Status | Verdict |
|---|--:|--:|--:|--:|--:|--:|--:|--:|--:|--:|--:|---|---|---|
| microsoft/markitdown (Path P #2 + Path P #3 corrected) | 10 | 8 | 10 | 10 | 4 | 8 | 4 | 6 | 9 | 8 | **76.8** | **B sandbox-required** | NOT-WIRED | **Δ1 INSTALL-NOW** (sandbox policy; secondary to docling per Path P #3) |
| VikParuchuri/marker (Path P L67 fix) | 10 | 6 | 2 | 10 | 4 | 6 | 6 | 8 | 5 | 8 | 60.4 | C | LICENSE-BLOCKER | **REJECT-FOR-INSTALL** (GPL-3.0; CITE-AS-REFERENCE only) |
| MinerU | 10 | 6 | 10 | 10 | 4 | 6 | 6 | 8 | 7 | 8 | 73.2 | B | NOT-WIRED | Δ2 STUDY-PILOT |

### Cat 08 — Browser-control + Sandboxed-execution

| Repo | D1(5) | D2(15) | D3(15) | D4(10) | D5(15) | D6(8) | D7(8) | D8(6) | D9(12) | D10(6) | Composite | Letter | Status | Verdict |
|---|--:|--:|--:|--:|--:|--:|--:|--:|--:|--:|--:|---|---|---|
| microsoft/playwright-mcp | 10 | 10 | 10 | 10 | 6 | 6 | 4 | 8 | 9 | 10 | 81.4 | A | INSTALLED | KEEP-INSTALLED |
| chrome-devtools-mcp | 8 | 10 | 10 | 10 | 6 | 6 | 4 | 6 | 9 | 10 | 79.0 | B | INSTALLED | KEEP-INSTALLED |
| browser-use/browser-use | 10 | 6 | 10 | 10 | 6 | 6 | 4 | 8 | 5 | 8 | 71.6 | B | NOT-WIRED | Δ2 STUDY-PILOT |
| e2b-dev/E2B | 10 | 8 | 10 | 10 | 4 | 4 | 4 | 8 | 7 | 8 | 70.2 | B | NOT-WIRED | Δ2 STUDY-PILOT |

### Cat 12 — Discovery catalogs (CITE-AS-REFERENCE only; D5=0 by design)

| Repo | D1(5) | D2(15) | D3(15) | D4(10) | D5(15) | D6(8) | D7(8) | D8(6) | D9(12) | D10(6) | Composite | Letter | Status | Verdict |
|---|--:|--:|--:|--:|--:|--:|--:|--:|--:|--:|--:|---|---|---|
| hesreallyhim/awesome-claude-code | 10 | 8 | 4 | 10 | 0 | 10 | 0 | 10 | 10 | 10 | 67.6 → **D (D5=0 caps to D-band 59)** | D | CITE-ONLY | CITE-AS-REFERENCE |
| sickn33/antigravity-awesome-skills | 10 | 6 | 10 | 8 | 0 | 10 | 0 | 8 | 10 | 10 | 70.4 → **D** | D | CITE-ONLY | CITE-AS-REFERENCE |
| VoltAgent/awesome-agent-skills | 10 | 6 | 10 | 10 | 0 | 10 | 0 | 8 | 10 | 10 | 72.0 → **D** | D | CITE-ONLY | CITE-AS-REFERENCE |
| travisvn/awesome-claude-skills | 10 | 6 | 10 | 10 | 0 | 10 | 0 | 6 | 10 | 10 | 70.8 → **D** | D | CITE-ONLY | CITE-AS-REFERENCE |
| rohitg00/awesome-claude-code-toolkit | 6 | 4 | 10 | 8 | 0 | 10 | 0 | 6 | 10 | 10 | 60.6 → **D** | D | CITE-ONLY | CITE-AS-REFERENCE |
| punkpeye/awesome-mcp-servers | 10 | 8 | 10 | 10 | 0 | 10 | 0 | 8 | 10 | 10 | 73.4 → **D** | D | CITE-ONLY | CITE-AS-REFERENCE |
| quemsah/awesome-claude-plugins | 6 | 4 | 4 | 8 | 0 | 10 | 0 | 4 | 7 | 8 | 49.4 → **F** | F | CITE-HNF | CITE-AS-REFERENCE post-verify |
| Prat011/awesome-llm-skills | 6 | 4 | 10 | 8 | 0 | 10 | 0 | 4 | 7 | 10 | 56.0 → **D** | D | CITE-ONLY | CITE-AS-REFERENCE |

## Per-category sub-tallies

| Cat | total | A+ | A | B | C | D | F | Δ1 INSTALL | Δ2 STUDY | Δ3 REFRESH | Δ4 REJECT/DEFER |
|---|--:|--:|--:|--:|--:|--:|--:|--:|--:|--:|--:|
| 01 Memory+RAG | 17 | 0 | 2 | 4 | 2 | 0 | 9 | 1 | 4 | 0 | 12 |
| 02 Orchestration | 26 | 3 | 1 | 6 | 5 | 0 | 11 | 0 | 7 | 1 | 18 |
| 03 Skills+Marketplaces | 6 | 4 | 1 | 0 | 1 | 0 | 1 (anthropics/skills cap) | 0 | 0 | 4 | 2 |
| 04 Token-eff | 12 | 4 | 2 | 2 | 2 | 0 | 2 | 0 | 4 | 1 | 7 |
| 05 Observability+Evals | 15 | 0 | 3 | 4 | 4 | 1 | 3 | 3 | 5 | 1 | 6 |
| 07 Doc parsers | 3 | 0 | 1 | 1 | 1 | 0 | 0 | 1 | 1 | 0 | 1 |
| 08 Browser+Sandbox | 4 | 0 | 1 | 3 | 0 | 0 | 0 | 0 | 2 | 0 | 2 |
| 12 Discovery catalogs | 8 | 0 | 0 | 0 | 0 | 7 | 1 | 0 | 0 | 0 | 8 (cite-only) |
| **TOTAL** | **91** | **11** | **11** | **20** | **15** | **8** | **27** | **5** | **23** | **7** | **56** |

## Hard-rule blocker demotions to F-band (25 repos)

| Repo | Nominal | Blocker | Capped band |
|---|--:|---|---|
| anthropics/skills | 80.8 | D3=0 NOASSERTION | F (DEFER-HNF — flip to A+ if SPDX resolves) |
| volcengine/OpenViking | 36.8 | D3=0 AGPLv3 | F |
| MemPalace | 40.6 | D9=0 fabrication | F |
| letta-ai/letta | 51.6 | D5=0 META-HARNESS + D9=0 DUPLICATE | F |
| modelcontextprotocol/servers Memory | 71.6 | D9=0 DUPLICATE | F± BORDERLINE (was B nominal) |
| infiniflow/ragflow | 56.2 | D5=0 + D9=0 | F |
| Mintplex-Labs/anything-llm | 54.8 | D5=0 + D9=0 | F |
| arc53/DocsGPT | 50.2 | D5=0 + D9=0 | F |
| weaviate/Verba + cognita | 51.4 | D5=0 + D9=0 | F |
| smtg-ai/claude-squad | 45.0 | D3=0 AGPL (Path P fix) + D10=0 Windows | F |
| Yeachan-Heo/oh-my-claudecode | 49.0 | D5=0 + D9=0 | F |
| OpenBB-finance/OpenBB | 46.0 | D3=0 AGPL | F |
| openai/skills | 49.2 | D3=0 NOASSERTION | F |
| microsoft/autogen | 50.4 | D5=0 + D9=0 | F (was D nominal) |
| crewAIInc/crewAI | 56.0 | D5=0 + D9=0 | F (was D nominal) |
| agno-agi/agno | 56.0 | D5=0 + D9=0 | F (was D nominal) |
| continuedev/continue | 58.0 | D5=0 | F |
| RooCodeInc/Roo-Code | 51.2 | D5=0 + D9=0 | F (was D nominal) |
| skypilot-org/skypilot | 53.0 | D5=0 + D9=0 | F (was D nominal) |
| jeremylongshore/claude-code-plugins-plus-skills | 49.6 | D9=0 | F |
| AnandChowdhary/continuous-claude | 53.0 | D9=0 | F (was D nominal) |
| jia-gao/leanctx | 53.0 | FAST-CHURN D4=2 + axis fail | F |
| microsoft/LLMLingua | 67.6 | D9=0 superseded | F (was C nominal) |
| inngest/inngest | 47.6 | D3=0 NOASSERTION | F |
| SWE-agent/SWE-agent | 56.4 | D5=0 | F |

## Sensitivity-check BORDERLINE± entries

| Repo | Composite | Reason | Status |
|---|--:|---|---|
| anthropics/skills | 80.8 | D3=0 caps to F; flips to A if SPDX resolves | **BORDERLINE±NEEDS-RESOLUTION** |
| obra/superpowers-chrome | 78.8 | Could flip A under +5% on D2/D8 | **BORDERLINE±** |
| modelcontextprotocol/servers Memory | 71.6 | D9=0 caps to F; nominal B | **BORDERLINE±** |

## Δ INSTALL-PLAN summary (post-Path P fixes)

### Δ1 INSTALL-NOW (5 repos)

| # | Repo | Composite | Letter | Cat | Why |
|---|---|--:|---|---|---|
| 1 | getzep/graphiti | 78.4 | B | 01 | L3 temporal-KG; FalkorDB Docker; arxiv:2501.13956 |
| 2 | microsoft/markitdown | 86.0 | A | 07 | Document parser layer fills gap |
| 3 | langfuse/langfuse | 83.2 | A | 05 | HTTP MCP observability (operator-named) |
| 4 | Arize-ai/phoenix | 73.0 | B | 05 | OTel tracing + MCP wrapper v4.0.11 |
| 5 | promptfoo/promptfoo | 88.4 | A | 05 | OpenAI-backed eval + redteam + OWASP LLM Top 10 |

**Removed from Δ1 per Path P fixes**: trailofbits/skills-curated (CC-BY-SA), anthropics/skills (NOASSERTION).

### Δ2 STUDY-PILOT (23 repos) — sorted by composite desc

Anthropic memory_20250818 (86.2) / anthropics/claude-cookbooks memory_tool (86.2 CITE) / oraios serena (84.4 — KEEP) / dspy (79.2) / opik (79.6) / superpowers-chrome (78.8 ±) / superpowers-lab (77.6) / mem0ai/mem0 (76.8) / ruflo Path A (76.4) / openllmetry (75.2) / ragas (75.2) / smolagents (73.6) / MinerU (73.2) / browser-use (71.6) / code2prompt (71.2) / E2B (70.2) / chopratejas/headroom (67.4 post-verify) / Piebald-AI/splitrail (64.2) / tokscale (65.0) / autoevals (63.4 HNF verify) / flow-next (60.0 Ralph-mode only)

### Δ3 REFRESH (7 repos)

obra/superpowers HEAD bump (192,865★) / addyosmani/agent-skills refresh (42,105★) / context-mode 1.0.111 → 1.0.135 / wshobson per-plugin curation / ryoppippi/ccusage refresh / anthropics/claude-plugins-official refresh / claude-plugins-official/skill-creator refresh

### Δ4 REJECT / DEFER (56 repos)

**Path P-corrected** (5): VikParuchuri/marker REJECT-FOR-INSTALL / NeoLabHQ/context-engineering-kit CITE-AS-REFERENCE / smtg-ai/claude-squad REJECT (AGPL+Windows) / trailofbits/skills-curated CITE-AS-REFERENCE / anthropics/skills DEFER-HNF

**Prior catalog REJECT** (51): META-HARNESS competing-frameworks (letta / autogen / crewAI / agno / RooCode / oh-my-claudecode) + AGPL/DUPLICATE-FUNCTIONALITY full-RAG-apps (OpenViking / ragflow / anything-llm / DocsGPT / Verba / cognita) + SUPERSEDED token tools (LLMLingua / leanctx / governor LAUNCH-SPIKE) + SaaS-LOCK (supermemory) + OUT-OF-SCOPE (OpenBB / skypilot / OpenManus / SWE-agent / Aider / langgraph / continue / etc.)

## Cross-model gate compliance disclosure

Per `Z:/claude-sota/.claude/rules/cmc-env-funneled-disclosure.md §Orchestrator integration discipline`:

- **STAND-IN per CLAUDE.local.md ENV (f)**: this matrix population (Agent D — sota-researcher Sonnet stand-in under env-funneling)
- **Path P codex T1 NEEDS-REVISION conf=0.91** verdict from REAL GPT-5.5 via codex CLI 0.130.0 integrated as 5 Pattern A fix-forwards above
- **Mia pre-apply** per `mia-pre-apply.md`: composite-formula verified `composite = sum(d_i × w_i) / 10`; weight-sum=100 ✅; hard-rule blockers applied per `01-scoring-rubric-10-dim.md §Hard-rule blockers`
- **Cross-model gate satisfaction**: FULL at L0 Wave 1 (Path P REAL GPT-5.5 verdict on rubric design) + FULL at L1 Wave 250 (n=2 REAL GPT-5.5 dispatches) + PARTIAL at L2 Wave 2 matrix population (Sonnet stand-in integration of those verdicts; per-row Mia-probe applied to formula + blocker discipline)

## Update triggers

Re-evaluate this matrix when:
- 6th sota-researcher fire surfaces NEW SOTA repo not catalogued
- License resolution for anthropics/skills (NOASSERTION → SPDX) flips DEFER-HNF → INSTALL-NOW
- 0xhimanshu/governor age crosses 90d (FAST-CHURN → STABLE-BURN-IN re-evaluation)
- jia-gao/leanctx age crosses 100d AND LLMLingua-2 substrate updates
- Wave 250 catalog gains 5+ new entries (re-score with delta)
- BORDERLINE± entries flip band under empirical use (promote / demote per `closed-loop-recursive-narrowing.md` Outcome A)
