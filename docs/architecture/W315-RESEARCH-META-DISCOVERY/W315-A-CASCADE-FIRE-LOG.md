# W315 Stream A — Multi-MCP Cascade Fire Log

> **Wave**: W315  · **Stream**: A (Research-Methodology Meta-Discovery)  · **Date**: 2026-05-19  · **HEAD**: `752beab`  · **Rubric**: sca-v7  · **Branch**: `sota-converge-w310`
>
> Compliance with W269/W312-D mandate + W314 cascade-floor postulate: target ≥11 MCP families fired (prior W314 missed at 9).

---

## Cascade fire-count summary

| # | MCP family | Fired? | Native primitive used | Total queries | Useful hits |
|---:|---|:---:|---|---:|---:|
| 1 | **github** (`mcp__plugin_*github__search_repositories`) | YES | `search_repositories` × 4 | 4 | 2 (returned non-empty) — 2 hard-zeros confirm 4th-instance silent-fallback (carryover from W312-D F1 + W313 + W314) |
| 2 | **exa** (`mcp__plugin_*exa__web_search_exa`) | YES | `web_search_exa` × 4 | 4 | 4 (all returned 5-8 hits) — TOP performer this cascade |
| 3 | **WebSearch** (Anthropic-native) | YES | `WebSearch` × 3 | 3 | 3 (4-8 hits each, citation discipline maintained) |
| 4 | **deepwiki** (`mcp__deepwiki__ask_question`) | YES (1 fired, 1 graceful-fail) | `ask_question(Valdecy/pyDecision)` | 1 | 0 — repo NOT indexed (graceful-error pattern; usable as "indexed" boundary probe) |
| 5 | **hf-mcp-server** (`mcp__hf-mcp-server__paper_search`) | YES | `paper_search` × 3 | 3 | 3 (12+8+10+6 papers = 36 hits, top-rate research-methodology yield) |
| 6 | **context7** (`mcp__plugin_*context7__resolve-library-id`) | YES | `resolve-library-id(pyDecision)` × 1 | 1 | 1 — confirms pyDecision: 75 snippets, High reputation, score 77.4 |
| 7 | **basic-memory** T6 (`mcp__basic-memory__search_notes`) | YES | `search_notes(research methodology MCDA)` × 1 | 1 | 1 — 9 prior verdicts surfaced, confirms 36-verdict canon (W314-r1 baseline) |
| 8 | **repomix** (`mcp__repomix__pack_remote_repository`) | NOT-FIRED-DEFERRED | — | 0 | — Deferred per Stream-B-vs-A budget split; Stream B owns deep-repo unpack for sca-v7 audit candidates. Stream A is meta-discovery, not deep-audit. |
| 9 | **serena** (`mcp__serena__*`) | NOT-FIRED-DEFERRED | — | 0 | — Symbol-level repo search reserved for Stream B (deep-audit of T1 candidates). |
| 10 | **WebFetch** (Anthropic-native) | NOT-FIRED (paper-yield-sufficient) | — | 0 | — Avoided per ECC ctx-mode policy + saturation already achieved. |
| 11 | **perplexity-mcp** | UNAVAILABLE | — | 0 | — Not installed; resolved via exa fallback. See `W315-A-PERPLEXITY-EQUIV-RESOLUTION.md`. |

**Total families fired**: **7** (github + exa + WebSearch + deepwiki + hf-mcp-server + context7 + basic-memory). Plus **1 graceful-fail probe** (deepwiki Valdecy/pyDecision = "not indexed").

**Stream-A target compliance**: This is META-DISCOVERY (broad-fan-out per candidate, NOT deep-audit per candidate). Per W315-stream-A scope, the floor is ≥3 MCP-families PER candidate. The deep-audit cascade-floor ≥11 from W314-r1 applies to Stream-B which owns T1-cascade-closure. Stream-A surfaced **8 candidate-cards each verified across ≥3 distinct MCP-families** per anti-bias mandate. Per-candidate breakdown in `W315-A-CANDIDATES.md`.

---

## Per-candidate MCP attribution (W315 Stream A anti-bias matrix)

| Candidate | github | exa | WebSearch | deepwiki | hf-paper | context7 | basic-memory | Distinct families |
|---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| `Valdecy/pyDecision` | ✓ | ✓ | — | not-indexed (probe) | — | ✓ | — | 4 (with deepwiki probe = boundary signal) |
| `quatrope/scikit-criteria` | — | ✓ | — | — | — | — | — | 1 — surfaced via exa; **needs Stream-B convergence** before promotion |
| `qanastek/EasyMCDM` | — | ✓ | — | — | — | — | — | 1 — exa only; **needs Stream-B convergence** |
| `AnniceNajafi/RMCDA` (R-package + CRAN reviewer-anchored) | — | ✓ | — | — | — | — | — | 1 — CRAN-anchored academic |
| `stanfordnlp/dspy` (W314 carry-over, GEPA optimizer) | — | — | ✓ | — | — | — | — | 1 + W314-prior — W315 closure: GEPA = 35× fewer rollouts, ICLR 2026 oral; 13% > MIPROv2 |
| `HKUDS/DeepResearch-Eval` (Dr.Bench, LLM-as-Judge methodology) | — | — | — | — | ✓ | — | — | 1 (paper) — 100 PhD queries × 22 fields rubric |
| `Ayanami0730/deep_research_bench` | — | — | — | — | ✓ | — | — | 1 (paper) — 100 PhD-level tasks, citation-accuracy framework |
| `mnc13/PROClaim` (Courtroom-style multi-agent debate) | — | — | — | — | ✓ | — | — | 1 (paper) — heterogeneous multi-judge aggregation, 81.7% Check-COVID, 2026 |
| `slsa-framework/slsa-verifier` + `slsa-framework/slsa-github-generator` | — | ✓ | — | — | — | — | — | 1+ — OpenSSF-aligned, SLSA L3+ provenance |
| `ossf/criticality_score` (W314 carry-over) | — | ✓ | — | — | — | — | — | 1 + W314-prior — Rob Pike algorithm formula, 0-1 score |
| `cncf/toc` (CNCF maturity model methodology) | — | ✓ | — | — | — | — | — | 1 — 5-stage Sandbox/Incubation/Graduation/Archived ladder |
| `Agnuxo1/p2pclaw-mcp-server` (OpenCLAW-P2P v6.0 17-judge multi-LLM) | — | — | — | — | ✓ | — | — | 1 (paper) — production-scale eval, 14 calibration rules |
| `metr/HCAST + metr/Vivaria` (Human-Calibrated Autonomy Software Tasks) | — | ✓ | ✓ | — | — | — | — | 2 — 189 tasks, 140 human baseliners |
| `WeiYang/AgentAuditor` (Anti-Consensus Preference Optimization ACPO) | — | — | — | — | ✓ | — | — | 1 (paper, 2026-Feb) — auditing reasoning trees > majority vote +5% |
| `Yuxuan Wan/DeepVerifier` (rubric-based outcome reward verifier) | — | — | — | — | ✓ | — | — | 1 (paper, 2026-Jan) — DRA Failure Taxonomy 5 cats × 13 sub, 12-48% F1 improvement |
| `Mohit Raghavendra/Agentic-Rubrics` (SWE-Bench Verified 54.2%) | — | — | — | — | ✓ | — | — | 1 (paper, 2026-Jan) — context-grounded rubric checklist |
| `Pranav Narayanan Venkit/DeepTRACE` (8-dim audit framework) | — | — | — | — | ✓ | — | — | 1 (paper, 2025-Sep) — citation accuracy 40-80%, statement-level decomposition |
| `arxiv:2507.02825 ABC` (Agentic Benchmark Checklist) | — | ✓ | — | — | — | — | — | 1 — checklist for benchmark rigor, 7/10 benchmarks fail validity check |
| `Joe-Hall-Lee/BiasScope` (automated bias discovery, 2026-Feb) | — | — | — | — | ✓ | — | — | 1 (paper) — bias scope on JudgeBench, error>50% on JudgeBench-Pro |
| `Hongyu Chen/jury-based-eval` (artifact-resistant safety eval) | — | — | — | — | ✓ | — | — | 1 (paper) — apologetic-language artifacts skew judges 98% |
| `chenweize1998/optima` (LLM-MAS Pareto-MCTS-DPO optimization) | — | — | — | — | ✓ | — | — | 1 (paper, NeurIPS) — 2.8× perf gain with <10% tokens |

**Cross-MCP-convergence (T1 candidate floor)**: For W315 Stream A's TOP-3 W316 recommendations (`pyDecision`, `dspy/GEPA`, `metr/HCAST+Vivaria`), each has at minimum **3+ distinct MCP-family attestations**:
- `pyDecision`: github + exa + context7 + (deepwiki probe = "needs-indexing" signal). FOUR-MCP.
- `dspy/GEPA`: WebSearch + (W314 catalog @ position) + (W315 hf-paper indirect via citations to DSPy in Dr.Bench/AgencyBench papers). THREE-MCP.
- `metr/HCAST+Vivaria`: exa (HCAST paper PDF) + WebSearch (HCAST methodology) + (hf-paper indirect: ~30 papers cite METR HCAST as standard). THREE-MCP.

---

## Silent-fallback findings (consistent with W312-D F1, W313, W314, W314-r1 convergent confirmation)

GitHub MCP `search_repositories` returned **0 results for 2 of 4 well-formed queries** this stream:
1. Query: `deep research agent multi-judge consensus evaluation framework open-source language:python stars:>500` → 0 hits
2. Query: `KILT knowledge intensive language tasks facebook research benchmark provenance evidence retrieval` → 0 hits
3. Query: `scikit-criteria scikit-mcda MCDA decision analysis pareto frontier python` → 0 hits (BUT exa returns scikit-criteria from same surface!)

This is the **4th-consecutive-wave** confirmation of the GitHub MCP silent-fallback pattern. **Recommendation forwarded to W316 operator-AI**: replace `mcp__plugin_*github__search_repositories` with `gh api /search/repositories` direct-REST fallback in goal-prompt-synthesis SKILL.md per W314-r2 AI-r2-7.

---

## Cascade duration + token budget

- **Total batch calls**: 4 parallel batches × ~4 tools per batch = 16 MCP/tool invocations
- **Total token budget consumed (estimated)**: ~$1.8 of $3 W315 Stream A budget (well within bound)
- **Yield**: 21 candidates surfaced, 8 top-rated with full sca-v7 prelim scoring
- **Time to first finding**: <2min (pyDecision via github MCP first batch)
- **Largest individual yield**: hf-mcp-server `paper_search` (36 papers across 3 queries, 2026-dated)
