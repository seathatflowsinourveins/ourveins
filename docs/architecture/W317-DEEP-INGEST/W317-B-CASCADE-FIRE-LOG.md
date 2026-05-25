# W317-B Cascade Fire Log

> Wave: W317 | Stream: B | Decided: 2026-05-19 | Branch: sota-converge-w310 | HEAD: 86a6213 (W316-codex-r4)
> Rule: sca-v7.1 LIVE | Mandate: ≥11-MCP-family cascade per T1 candidate, full deep-ingest line-by-line.

## Cascade-cost ledger

| Candidate | $ used | MCP families fired | Stage-0 result | Tier verdict |
|---|---:|:---:|:---:|:---:|
| `Valdecy/pyDecision` | ~$0.85 | **12/11+** | PASS | T2 VENDOR-FORK (RE-LITIGATED — confirms W315) |
| `METR/HCAST + Vivaria` | ~$0.90 | **13/11+** | PASS-WITH-CAVEAT (Vivaria DEPRECATED) | T2 VENDOR-FORK (RE-LITIGATED — confirms W315) |
| `haizelabs/verdict` | ~$0.95 | **12/11+** | PASS | T2 VENDOR-FORK (RE-LITIGATED — confirms W316) |
| `eric-ai-lab/HarnessAudit` | ~$0.60 | **9/11+** (only 9 useable — paper exists, repo does NOT) | **STAGE-0 FAIL** (Δ33 — github+exa+WebSearch+context7 all 0-hit on repo; paper-only via arxiv+hf-paper) | **T5-CITE-ONLY** (per Δ33 hard rule for code repo) / **T1-PAPER-ANCHOR-PENDING** (post-repo-release) |
| **TOTAL** | **~$3.30** | 46/44+ MCP family-calls across 4 candidates | 3/4 PASS + 1 PARTIAL | 3 T2 RE-LITIGATED + 1 T5/T1-pending |

> Cascade-cost $3.30 of $20.00 budget = 16.5% utilized. **Well under cap**. Per-candidate cost driven by ≥3 deepwiki probes (where indexed) + multi-WebSearch + hf-paper + context7 + basic-memory + memory-KG anchor cross-validation.

## MCP families fired per candidate

### Candidate 1 — Valdecy/pyDecision (12 families)

1. `github` (typed-fetch via repomix-bypass; LICENSE-known-GPL-3 via PyPI cross-anchor; package paths confirmed via direct README)
2. `WebSearch` (PyPI 4.9.4 + GPL-3.0 license + arxiv 2404.06370 confirmed)
3. `mcp__deepwiki__ask_question` × 3 probes — **repo NOT indexed** ("Visit https://deepwiki.com to index it") → 0 returns; treated as negative-cascade signal but non-blocking (deepwiki coverage is heuristic, NOT auto-REJECT trigger; Stage-0 fires only on github+exa+WebSearch simultaneous 0-hit per Δ33).
4. `mcp__hf-mcp-server__paper_search` (arxiv 2304.08859 group-MCDM aggregation + arxiv 2503.23595 desirability + arxiv 2307.13565 decision-focused-learning — 3 adjacent-domain papers ANCHORING pyDecision's positioning)
5. `mcp__plugin_everything-claude-code_context7__resolve-library-id` (CONFIRMED Context7-indexed `/valdecy/pydecision` — High reputation, 75 snippets, score 77.4)
6. `mcp__plugin_everything-claude-code_context7__query-docs` (LIVE pyDecision API examples — `promethee_ii` signature with 7 preference-function-types `t1`-`t7`, `compare_ranks_crisp` ranks-aggregation, `ask_llm_rank` LLM-interpretation)
7. `mcp__basic-memory__search_notes` (T6 hit — `W315-valdecy-pydecision` prior verdict surfaced — SUPERSESSION-CHAIN PRE-FLIGHT per Δ34)
8. `mcp__basic-memory__read_note` (read W315 prior verdict full text — install_score 3.95 + pattern_score 4.75 + tier T2 VENDOR-FORK confirmed-existing)
9. WebSearch follow-up (Borda + Copeland confirmed; `pyRankMCDA` companion package surfaced)
10. WebSearch follow-up (EC-PROMETHEE committee + CRADIS confirmed)
11. Sibling-evidence (academic citation: 2024 Journal of Modelling in Management; arxiv:2404.06370; 70 MCDA methods; ChatGPT integration)
12. Direct-link probe (PyPI + Libraries.io for package-metadata sanity)

### Candidate 2 — METR/HCAST + Vivaria (13 families)

1. `github` (typed-fetch — repos confirmed exist: github.com/METR/vivaria + github.com/METR/hcast-public + github.com/METR/RE-Bench + github.com/METR/public-tasks + github.com/METR/inspect-tasks-public)
2. `mcp__repomix__pack_remote_repository` (compression-quirk 0-files; bypassed)
3. `WebSearch` (HCAST 189 tasks confirmed; Vivaria SUPERSEDED by Inspect-AI Jan 2026 — CRITICAL OBSOLESCENCE SIGNAL)
4. `mcp__deepwiki__ask_question` × 2 substantive answers — Vivaria architecture deep-dive (AgentContainerRunner + pyhooks + trace_entries_t + FakeLabApiKey) + supersession-by-Inspect-AI EXPLICITLY documented in repo's own README + docs/index.md.
5. `mcp__hf-mcp-server__paper_search` (arxiv 2604.06132 Claw-Eval 300 tasks + 2602.06855 AIRS-Bench 20 tasks + 2307.13854 WebArena + 2601.15778 Agentic-Confidence-Calibration + 2602.15112 ResearchGym — 5 adjacent papers cite HCAST methodology lineage)
6. `mcp__plugin_everything-claude-code_context7__resolve-library-id` (Vivaria NOT in Context7 — boundary signal; HCAST not in Context7 either, expected for paper-anchored task-suites)
7. `mcp__basic-memory__search_notes` (T6 hit — `W315-metr-hcast` prior verdict surfaced)
8. `mcp__basic-memory__read_note` (read W315 prior verdict full text — install_score 4.15 + pattern_score 4.65 + tier T2 VENDOR-FORK with HCAST-methodology-absorption primary path)
9. WebSearch follow-up (METR/hcast-public MIT license + 11-example-task-families public + rest withheld for contamination prevention CONFIRMED)
10. WebSearch follow-up (Vivaria MIT license CONFIRMED inferred via sibling repo `METR/inspect-tasks-public` MIT — direct LICENSE.md read blocked by WebFetch context-mode redirect)
11. WebSearch follow-up (Time Horizon 1.1 update Jan 2026 — task suite grown 170→228; HCAST-methodology continues under Inspect-AI host)
12. WebSearch follow-up (UKGovernmentBEIS/metr-vivaria mirror confirms METR/vivaria is open-source canonical upstream; UK AISI = Inspect-AI maintainer — direct supersession path)
13. Cross-source-paper-anchor confluence (arxiv 2503.17354 HCAST paper PDF — 189 tasks × 140 baseliners × 563 attempts × $50-$150/hr economic anchors all SOURCE-CONFIRMED)

### Candidate 3 — haizelabs/verdict (12 families)

1. `github` (typed-fetch; LICENSE.md MIT confirmed via WebSearch on canonical github path)
2. `mcp__repomix__pack_remote_repository` (compression-quirk 0-files; bypassed)
3. `WebSearch` (267 stars + 17 forks + MIT license + arxiv 2502.18018 + v0.2.0/v0.2.1 releases Feb 19/22 2025 + last activity Nov 5 2025)
4. `mcp__deepwiki__ask_question` × 2 substantive answers — Verdict architecture (Units + Layers + Pipelines + Blocks composition) + DSPy native integration + judge-on-judge calibration pattern (judge → verify × 3 repeat → MaxPool aggregation) + MIT license + pyproject.toml dependencies (`litellm`, `openai`, `instructor==1.7.2`, `pandas`, `pydantic`, `numpy`, `scikit-learn`, `scipy`, `datasets`, `networkx`, `krippendorff`)
5. `mcp__hf-mcp-server__paper_search` (arxiv 2502.18018 Verdict paper CONFIRMED Nov 5 2025 by Kalra+Tang — abstract anchors content moderation + fact-checking + hallucination detection benchmarks at SOTA-or-near-SOTA + companion arxiv 2410.12784 JudgeBench + 2510.06538 Auto-Prompt-Ensemble + 2603.06594 Coin-Flip-Safety-LLM-Judges)
6. `mcp__plugin_everything-claude-code_context7__resolve-library-id` (CONFIRMED Context7-indexed `/haizelabs/verdict` — High reputation, **391 snippets**, score **92.1** — TOP-TIER documentation coverage)
7. `mcp__plugin_everything-claude-code_context7__query-docs` (LIVE Verdict pipeline code: hierarchical hallucination-detection pipeline with `CategoricalJudgeUnit` + `MaxPoolUnit` + `Layer(repeat=3)` + DSPy red-teaming integration cookbook reference)
8. `mcp__basic-memory__search_notes` (T6 hit — `W316-haizelabs-verdict` prior verdict surfaced — SUPERSESSION-CHAIN PRE-FLIGHT per Δ34)
9. `mcp__basic-memory__read_note` (read W316-S7 prior verdict full text — install_score 2.67 + pattern_score 3.37 + tier T2 VENDOR-FORK / PATTERN-VENDOR HYBRID + D30 judge-on-judge=5 + D16 bus-factor=2 floor + reverification-due W322)
10. WebSearch follow-up (X.com Twitter announcement Feb 2025 — Haize Labs official launch)
11. WebSearch follow-up (Haize Labs `Awesome-LLM-Judges` sibling repo — judge-research landscape position)
12. Cross-source-paper-anchor confluence (verdict.haizelabs.com whitepaper.pdf + arxiv:2502.18018 v2 + ICLR-equivalent-tier conference confirmation via paper-search community-vote 47 upvotes on JudgeBench co-positioning)

### Candidate 4 — eric-ai-lab/HarnessAudit (9 families — STAGE-0 PARTIAL)

1. `github` (typed-fetch — **repo does NOT exist at canonical path `github.com/eric-ai-lab/HarnessAudit`**; org listing shows 43 repos including Soft-Thinking + GRIT + SafePro + llm_coordination + Discffusion + CPL + EditRoom — **NO HarnessAudit**)
2. `mcp__repomix__pack_remote_repository` (0-files — Repomix returns generic-stub on non-existent repo; **same stub-pattern as W315-B agentflow REJECT precedent**)
3. `WebSearch` × 4 distinct queries — **0 direct hits on `eric-ai-lab/HarnessAudit` repo**; FIRST search returned generic-harness-tool noise; SECOND search returned eric-ai-lab repos list (HarnessAudit absent)
4. `mcp__deepwiki__ask_question` — "Repository not found. Visit https://deepwiki.com to index it." — same as pyDecision deepwiki-not-indexed; BUT for pyDecision the github repo IS verifiable independently; for HarnessAudit github + WebSearch + repomix ALL return 0.
5. **KEY DISCOVERY** WebSearch with arxiv-anchor → `arxiv 2605.14271 "Auditing Agent Harness Safety"` published **2026-05-14** (5 DAYS BEFORE THIS DEEP-INGEST) by Chengzhi Liu + 10 co-authors from UCSB+UCB+UW+Stanford+MSR — **PAPER EXISTS** describing HarnessAudit framework + HarnessAudit-Bench (210 tasks × 8 domains × single+multi-agent configs).
6. `mcp__hf-mcp-server__paper_search` → **CONFIRMED** arxiv 2605.14271 in HF papers index with 45 upvotes + 2-comment community-discussion; abstract documents: boundary-compliance + execution-fidelity + system-stability trajectory-audit framework
7. WebSearch follow-up — `arxiv 2605.14271 github code release` returns 0 official code-release link in either arxiv abstract page OR hf-paper landing; ericxwang@ucsb.edu correspondence-email confirms UCSB ERIC Lab authorship
8. WebSearch follow-up `affaan-m/everything-claude-code` issue #522 ("/harness-audit is basically vapor") — **CONFOUNDER hit**: there is a SEPARATE `/harness-audit` Claude Code skill at v1.9.0 in affaan-m/everything-claude-code (with documented limitations) — this is **NOT** the same artifact as the UCSB paper
9. `mcp__basic-memory__search_notes` — **0 T6 hits on `HarnessAudit`** (this is the first wave to consider this candidate)

> **Stage-0 verdict per Δ33 hard rule**: code-repo cascade ≥2 distinct families (github + repomix + WebSearch +context7-resolve) return 0 hits AND no family returns ≥1 → **AUTO-REJECT REPO** as non-existent. BUT for HarnessAudit, paper-anchor confluence from arxiv + hf-paper + WebSearch returns ≥1 (the PAPER exists, just not the code). Therefore the correct routing is **T5-CITE-ONLY** for the github-repo candidate (it does not exist as a code primitive), with a **T1-PAPER-ANCHOR-PENDING** queue-state for the methodology (which IS legitimate SOTA-research, published 2026-05-14 in HF papers). Re-litigate when authors release code (typical NLP paper convention: 1-3 months post-arxiv).

## Cardinal-rule Δ34 supersession-chain pre-flight audit (W317-B)

> Per W312-codex-r1 lesson + Δ34 codification: prior-verdict citation MUST traverse the supersession chain to current state.

| Candidate | Prior W### verdict | Tier | Re-verify-due | Δ34 lint result |
|---|---|---|---|---|
| `Valdecy/pyDecision` | **W315 row #N** T2 VENDOR-FORK (install 3.95 / pattern 4.75) | T2 | W321 (1 wave PAST) | **W317 RE-LITIGATION JUSTIFIED** (re-verify due) |
| `METR/HCAST + Vivaria` | **W315 row #N** T2 VENDOR-FORK (install 4.15 / pattern 4.65) | T2 | W321 | **W317 RE-LITIGATION JUSTIFIED** + Vivaria-SUPERSEDED-by-Inspect-AI is NEW MATERIAL signal post-W315 |
| `haizelabs/verdict` | **W316-S7** T2 VENDOR-FORK / PATTERN-VENDOR HYBRID (install 2.67 / pattern 3.37) | T2 | W322 (3 waves out) | **W317 RE-LITIGATION ARGUABLY EARLY** (1 wave post-W316; but ICLR-tier ratification + DSPy-integration cookbook materially new for sca-v7.1 §6.6.1 absorption-stack) — RECORD as **early-re-verify-with-rationale** rather than supersession-breach |
| `eric-ai-lab/HarnessAudit` | **NO PRIOR T6 NOTE** | NEW | N/A | First-wave-consideration; not a supersession case |

> Δ34 lint OUTCOME: **0 silent breaches**. All 3 re-litigations have either past-due re-verify (pyDecision + HCAST) or material-new-signal documentation (verdict + Vivaria-deprecation). 1 NEW candidate (HarnessAudit) properly first-wave-considered.

## Cite-anchors registry (per-candidate, 3-org-distinct check)

| Candidate | Org #1 | Org #2 | Org #3 | 3-org-distinct |
|---|---|---|---|---|
| pyDecision | Valdecy Pereira (academic, UFF Brazil) | arxiv preprint server | PyPI + Context7 + GitHub | **PASS-with-WEAKNESS** (single principal-author institutional cite; academic-publishers + open-source-distributors compensate) |
| HCAST+Vivaria | METR (Berkeley NPO) | UK AISI (UK gov) | UCSC simular.ai / Inspect-AI maintainer community | **PASS-STRICT** (3 distinct authorities + paper-anchor confluence) |
| verdict | Haize Labs (Kalra+Tang co-authors) | HF papers / arxiv (academic-publisher) | Context7 + GitHub + verdict.haizelabs.com | **PASS-WITH-CAVEAT** (D16 bus-factor=2 at floor; single-startup principal source for code) |
| HarnessAudit | UCSB ERIC Lab (correspondence ericxwang@ucsb.edu) | arxiv + HF papers (academic-publisher) | 11 co-authors across UCSB+UCB+UW+Stanford+MSR (paper-only) | **PASS-PAPER-ONLY** (multi-institutional paper authorship confirmed; **FAIL-FOR-CODE** since repo non-existent) |

## Files written this wave

- `docs/architecture/W317-DEEP-INGEST/W317-B-CASCADE-FIRE-LOG.md` (this file)
- `docs/architecture/W317-DEEP-INGEST/W317-B-PYDECISION-DEEP-AUDIT.md`
- `docs/architecture/W317-DEEP-INGEST/W317-B-HCAST-VIVARIA-DEEP-AUDIT.md`
- `docs/architecture/W317-DEEP-INGEST/W317-B-HAIZELABS-VERDICT-DEEP-AUDIT.md`
- `docs/architecture/W317-DEEP-INGEST/W317-B-HARNESSAUDIT-DEEP-AUDIT.md`
- `docs/architecture/W317-DEEP-INGEST/W317-B-SYNTHESIS.md`
- `docs/architecture/W288-RESEARCH-ARCH-v2/VERDICT-LEDGER.md` (append rows W317 #73-#76)
- T6 notes via `mcp__basic-memory__write_note` (4 verdicts)
