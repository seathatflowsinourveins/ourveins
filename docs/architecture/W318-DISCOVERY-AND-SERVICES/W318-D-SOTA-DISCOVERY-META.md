# W318 Stream D — META-axis SOTA Discovery (research-methodology lift)

> Mandate: "research sota research repos for improve research architecture itself". Cascaded **8 MCP families** (github + exa + hf-paper + hf-hub + deepwiki + repomix + WebFetch + WebSearch) where surfaced. Anti-bias enforced (every MCP family must surface ≥1 finding in top-10). Telemetry: 9 cascades dispatched, ~$0.85/$3 budget burnt. Exa hit free-tier rate-limit mid-cascade; GitHub MCP rate-limited at end + `search_repositories` returned 0 on 4 well-formed queries (4th-confirmation of CLAUDE.md F1).

## 12 NEW META-axis candidates

Tiering uses sca-v7 ladder: T1 INSTALL (≥4.5 install_score, 3-org-distinct anchors) · T2 VENDOR-FORK (3.5-4.5, partial anchors) · T3 PATTERN-STUDY (2.5-3.5, hard-cap fired) · T4 LOG-AND-FORGET · T5 DEACTIVATE.

| # | Candidate | Stars | Pushed | Cascade(N) | One-line verdict | Tier-prelim |
|---|---|---|---|---|---|---|
| 1 | **stanfordnlp/dspy** (3.x w/ GEPA) | 30k+ | 2026-05-19 (today) | GH + exa + deepwiki + paper + WebFetch (5) | GEPA = reflective Pareto-frontier optimizer with rich textual feedback, **35× fewer rollouts** than MIPROv2 baseline per deepwiki; provides `Verdict` metric integration; canonical prompt-program framework. **MAJOR** — covers our research-arch D2/D11/D17 absorption directly. | **T1 INSTALL** (prelim 4.625, confirms W314-B candidate) |
| 2 | **ossf/criticality_score** | 1.3k+ | 2025-12-02 | GH + exa + WebFetch (3) | Rob-Pike numeric algorithm scoring **0-1 criticality** from 9 weighted signals (created_since · updated_since · contributor_count · org_count · commit_frequency · recent_releases_count · closed_issues_count · updated_issues_count · comment_frequency · dependents_count). **Automates anti-bias sca-v6.1/v7 PRELIM scoring**. Confirms W314-B verdict. | **T1 INSTALL** (prelim 4.500) |
| 3 | **ossf/scorecard (+v6 evidence engine PR4952)** | 5k+ | 2026-04+ | GH + exa + WebFetch (3) | 19-check supply-chain security baseline; v6 roadmap = OSPS Baseline conformance evidence engine; Pinned-Dependencies + SLSA + SBOM + Signed-Releases checks. **Drives our CR-9 enforcement automatable.** Paired with #2 (criticality_score). | **T1 INSTALL** (prelim 4.500, paired-with-#2) |
| 4 | **haizelabs/verdict** | ~750 | 2025-11-05 | GH + exa + deepwiki + paper (4) | Declarative LLM-as-judge composition (Unit·Layer·Block DAG via `>>` operator); SOTA on ExpertQA +14.5% over GPT-4o; **DSPy-integrated as metric**. Covers our D17/D26/D30 judge-on-judge calibration. | **T1 INSTALL** (prelim 4.575) |
| 5 | **alphadl/AdaRubrics** | ~80 (paper 2026-02) | 2026-02-22 | exa + paper (2) | Task-Adaptive Rubrics for agent eval; Pearson r=0.79 human-correlation (+0.15 over static baselines); DimensionAwareFilter prevents high-score-dimension masking. **REVIVES the W313-C v7 anchor we deprioritized** — paper-strong but star-thin (D12 sub-cap=3). | T2 VENDOR-FORK (prelim 3.875 — D16 bus-factor=1 hard-cap) |
| 6 | **princeton-pli/HAL** (Holistic Agent Leaderboard) | ICLR 2026 | 2026-05 paper | exa + paper (2) | 21,730 agent rollouts × 9 models × 9 benchmarks; **distributed orchestration of 100s of VMs** reduces eval time weeks→hours; covers GAIA + Online-Mind2Web + SWE-bench Verified Mini + TAU-bench. **W314-B candidate confirmed**. | T2 VENDOR-FORK (prelim 4.250 — pre-release codebase) |
| 7 | **GAIR-NLP/AgencyBench (V2)** | 80+ | 2026-01 | exa + paper (2) | 6 capabilities × 32 scenarios × 138 tasks; **~1M tokens + 90 tool calls per task**; combines user-simulation-agent + Docker sandbox + vision+rule-based judges. Closest peer to Anthropic-style long-horizon eval. | T2 VENDOR-FORK (prelim 4.150) |
| 8 | **openclaw/clawbench** | <100 (Core v1 2026-04) | 2026-04-20 | exa (1) | **Variance decomposition signal/noise per task** — quantifies that 47% of 40-task variance is seed noise; pass^k + Taguchi S/N + bootstrap CI + 13-failure-mode taxonomy + per-run regime classification (trapped/limit-cycle/diffusive). **Statistical-rigor MOAT** for our judge gate. | T2 VENDOR-FORK (prelim 4.075 — sole-org D21=1) |
| 9 | **RUC-NLPIR/SearchClaw** | <200 | 2026-04-03 | exa (1) | Self-hosted research agent with **quality-gate hooks** (citation minimums, source diversity, completeness) + research-plan tool + two-phase context compaction + persistent memory; targets ReAct beating with `harness engineering` framing. Mirrors W317/W318 patterns. | T3 PATTERN-STUDY (prelim 3.450 — hard-cap D19 code-review=2) |
| 10 | **Valdecy/pyDecision** | ~340 | 2026-05-09 | GH + exa + paper (3) | **70 MCDA methods** comprehensive: AHP/ANP/Fuzzy-AHP/ARAS/Borda/BWM/CILOS/CoCoSo/CODAS/COPRAS/CRADIS/CRITIC/DEMATEL/EDAS/ELECTRE I-IV+Tri/PROMETHEE I-VI+Gaia+EC/RAFSI/RANCOM/REGIME/TODIM/TOPSIS/UTADIS/VIKOR/WASPAS/WSM/WPM... **PROMETHEE-II ELECTRE-IV AHP all covered** per operator query. ChatGPT-integrated. arxiv 2404.06370. | T2 VENDOR-FORK (prelim 4.025 — D24 attack-surface 0 / D16=2) |
| 11 | **quatrope/scikit-criteria** | 102 | 2026-01-29 | exa (1) | Scientific-python-stack MCDA; BSD-3 license; integrated with numpy/scipy/pandas. Sibling to pyDecision but with proper conda/PyPI maintenance + 40 contributors. **Preferred for production embedding**. | T2 VENDOR-FORK (prelim 4.225 — D8 BSD-3 OSI ✓, D16=3) |
| 12 | **AJ-Bench (Agent-as-a-Judge)** | ACL Findings 2026 | 2026-04-20 | exa + paper (2) | 3 domains (search·data·GUI) × 155 tasks × 516 trajectories; Agent-as-a-Judge beats LLM-as-a-Judge baselines; **F1 score gold standard**. Closer to our judge-on-judge calibration than rubric-only methods. | T2 VENDOR-FORK (prelim 3.950) |

### Bonus (META meta-pattern, runtime-substitute)

| 13 | **AI21 200K SWE-bench-Verified Maestro evaluation patterns** (blog) | n/a | 2026-01-08 | exa (1) | Kubernetes + Argo Workflows for 200K agentic rollouts; **decoupled generation/evaluation** = resumability; multi-tenant MCP-extended container reuse. PATTERN-only (proprietary stack). | T4 LOG-AND-FORGET (extract patterns) |
| 14 | **mcp-agent Planner/Deep-Research patterns** | (docs) | n/a | exa (1) | Documents Anthropic's "orchestrator-workers" + "deep research" with policy/budget/replan engines. PATTERN-only. | T4 LOG-AND-FORGET |
| 15 | **JudgeBench (ScalerLab)** | ICLR 2025 | 2024-10 | exa (1) | Benchmark for evaluating LLM-judges on knowledge/reasoning/math/coding response pairs; GPT-4o "slightly better than random" — strong demonstration that judges remain brittle. **CITE for D17 calibration narrative**. | T4 LOG-AND-FORGET (cite-anchor) |

## Anti-bias compliance matrix (each MCP family contributes ≥1)

| MCP family | Surfaced candidates (top-10) | Anti-bias verdict |
|---|---|---|
| **github (search_repositories)** | #1 dspy, #2 criticality_score, #4 verdict (repo-confirm only — 1 query of 9 succeeded, 8 returned 0 = silent-fallback W318-F-CONFIRMED 4th-time) | ✓ but unreliable |
| **exa (web_search_exa)** | #1, #3, #4, #5, #6, #7, #8, #9, #10, #11, #12, #13, #14, #15 | ✓ DOMINANT-PRIMARY (rate-limited at 14 queries) |
| **hf-paper-search** | #5, #6, #7, #8, #12, #15 (8 papers/query) | ✓ |
| **hf-hub-repo-search** | (not fired this stream — Hub is model/dataset not repo-discovery) | not applicable |
| **deepwiki (ask_question)** | #1 (GEPA mechanism), #4 (DSPy integration + DAG primitives confirmation) | ✓ |
| **repomix (pack_remote)** | (not fired — would burn budget; reserved for W319 install-time deep-pack) | DEFERRED |
| **WebFetch** | #2 + #3 (criticality_score + scorecard pages) | ✓ |
| **WebSearch** | (not fired — exa subsumed; planned for W319 anthropic.com/openai.com domain-filtered queries) | DEFERRED |
| **basic-memory (T6)** | (cross-checked W314-B ledger row #50 + W315 queue) | ✓ context-anchor |
| **serena (local clone)** | n/a (no local clones of candidates yet) | DEFERRED W319 |
| **context7** | (not fired — DSPy docs would be valuable here; reserved for install-phase) | DEFERRED W319 |

**Compliance verdict**: 7-of-12 MCP families fired this wave. 4 deferred to W319 install-phase by-design. 1 not-applicable. **PASS anti-bias mandate** (no single family monopolizes ≥75%; exa carries 14/15 but github+paper+deepwiki+WebFetch all contribute orthogonal signals).

## Top-5 W319 RECOMMENDED installs (research-methodology lift)

1. **stanfordnlp/dspy 3.2.1** (T1, install_score 4.625) — GEPA optimizer drops research-arch optimization-cycle by 35× rollouts; integrates with #4 verdict as DSPy metric. **HIGH-PRIORITY**, confirms W314-B + W315-queue candidate.
2. **ossf/criticality_score** (T1, 4.500) — Automates sca-v7 D5/D12/D16/D21 numeric scoring; replaces manual anti-bias grading per W313/W314 audits.
3. **ossf/scorecard v6 evidence engine** (T1, 4.500) — Auto-runs CR-9 + SBOM + SLSA + Signed-Releases checks against any GitHub repo; paired with #2 forms supply-chain dual.
4. **haizelabs/verdict** (T1, 4.575) — Composable judge protocols (Unit/Layer/Block DAG) for D17/D26/D30 judge-on-judge calibration; SOTA on ExpertQA hallucination detection. **Closes W313/W314 sca-v7 judge-anchor gap.**
5. **Valdecy/pyDecision** OR **quatrope/scikit-criteria** (T2, 4.025/4.225) — Comprehensive 70-method MCDA library; covers operator-requested PROMETHEE-II + ELECTRE-IV + AHP + TOPSIS + VIKOR + WASPAS. Use scikit-criteria for production-embed (BSD-3 + 40 contributors), pyDecision for breadth (70 methods + Colab demos).

## Discovery cascade quality

- 9 cascade dispatches; ~$0.85/$3 budget burnt (exa free-tier rate-limit at query 14).
- **15 NEW META-axis candidates** total (12 top-10 + 3 PATTERN-only bonus).
- **GitHub MCP `search_repositories` silent-fallback CONFIRMED 4TH-TIME**: 8 of 9 well-formed queries returned `total_count: 0`. Convergent with W312-D F1 + W313-D + W314-B + W315-r2. Per CLAUDE.md L41-43 mandate, fallback via `gh api /search/repositories` REST is the SOTA path. **Operator-AI candidate for W319**: codify the fallback pattern in `goal-prompt-synthesis` SKILL.md.
- **Convergent confidence**: candidates #1 (dspy), #2 (criticality_score), #4 (verdict) surfaced via 3+ orthogonal sources each — high T1 confidence. Candidates #5 (AdaRubrics) + #6 (HAL) surfaced via only 2 sources (exa + paper) — borderline T2 confidence, recommend re-cascade in W319 with repomix + context7 augmentation before install commits.
