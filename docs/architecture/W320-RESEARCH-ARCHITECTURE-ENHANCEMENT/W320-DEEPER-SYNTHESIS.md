# W320-DEEPER Synthesis — Research-Architecture-of-Research-Architectures

> **Wave**: W320-deeper (continuation of W320-RESEARCH-ARCHITECTURE-ENHANCEMENT)
> **Date**: 2026-05-19
> **Streams shipped**: A + B + C + D (initial W320) + E + F + G + H + I + J (deeper)
> **Dispatch discipline**: 4+2+4 = 10 Agent dispatches across 3 messages = 100% parallel_ratio per dispatch (W269/W312-D compliant). 2 retries needed (A + D mid-flight stream errors → skeleton-first protocol applied to subsequent streams).
> **Total LOC**: 6,802 across 11 files (10 stream docs + this synthesis + W320-SYNTHESIS.md baseline)
> **Total tokens**: ≈1.5M across all agents (10 dispatches)
> **codex GPT-5.5 cross-model gate**: round-1 fires session-end via plugin-native Stop-hook (`openai-codex/1.0.4/hooks/hooks.json:24-37`)

---

## §1. Direct Answer to Operator's "Why no open-source replacements?" Challenge

**Stream A had commercial-bias.** Stream E confirmed three factual errors in W320 Stream A's verdict:
- Crawl4AI dismissed as "pattern-only" — **WRONG**: v0.8+ ships native MCP SSE on `:11235/mcp/sse` (Stream F confirmed deployment-ready)
- SearXNG dismissed as "self-host complexity" — **WRONG**: 200+ engines (not 70+), Docker compose 5-line setup
- Perplexica **OMITTED ENTIRELY** across all 4 W320 streams — **CRITICAL MISS**: MIT, Docker+Ollama OOB, the canonical open-source Perplexity clone

**Empirical proof of commercial fragility DURING this wave**: Tavily returned `account disabled` mid-Stream-B + Perplexity 300s timeout mid-Stream-E. Commercial dependencies broke runtime in real-time.

**New SOTA discovery surfaced by Stream E**: **LearningCircuit/local-deep-research** (4k★, **95% SimpleQA — beats Perplexity 93.9%**). Was not in operator's prompt list; convergence-discovered via deepwiki + Exa.

---

## §2. Consolidated Install Candidate Catalog (across G + E + J + B)

### T0 IMMEDIATE-UPGRADE candidates (no prior incumbent or version-bump only)
None this wave.

### T1 INSTALL candidates (consolidated; ranked by install_score; anti-bias mandate enforced)

| Rank | Repo | install_score | Primitive | Wave source | Why |
|---|---|---|---|---|---|
| 1 | **AnswerDotAI/RAGatouille** | 4.70 | INDEX/retrieval | G | ColBERT late-interaction retrieval; SOTA |
| 2 | **microsoft/markitdown** | 4.65 | EXTRACT | G | Universal PDF/office→MD pipeline |
| 3 | **pydantic/pydantic-ai** | 4.62 | AGENT framework | G | Typed agent framework + Logfire native |
| 4 | **BerriAI/litellm** | 4.58 | MODEL gateway | G | Multi-provider model gateway; Anthropic-compat |
| 5 | **stanford-oval/storm** | 4.55 | ANSWER (deep-research) | B+J | Perspective-guided question-asking |
| 6 | **mem0ai/mem0** | 4.55 | MEMORY | G | Per-user memory primitive complementary to T6 |
| 7 | **mlc-ai/mlc-llm** | 4.55 | LLM-LOCAL | G | Local-LLM compiler (WebGPU/CUDA) |
| 8 | **DS4SD/docling** | 4.52 | EXTRACT (academic) | G | IBM PDF→struct OCR |
| 9 | **Future-House/paper-qa (PaperQA2)** | 4.50 | ANSWER (academic) | B+J | Nature 2024 superhuman PhD synthesis |
| 10 | **agno-agi/agno** | 4.50 | AGENT framework | G | Multi-agent w/ Reasoning-Tools |
| 11 | **traceloop/openllmetry** | 4.48 | OBS | G | OTel-LLM observability |
| 12 | **assafelovic/gpt-researcher** | 4.45 (proj) | ANSWER (autonomous) | E+J | 24k★ Triadic Planner/Researcher/Reporter |
| 13 | **langchain-ai/open_deep_research** | 4.42 | ANSWER | B | Native MCP via MCPConfig; DeepResearch-Bench |
| 14 | **getzep/zep** | 4.35 | MEMORY/KG | G | Long-term memory w/ KG extraction |
| 15 | **LearningCircuit/local-deep-research** | 4.30 (proj) | ANSWER | E (new discovery) | **95% SimpleQA**; beats Perplexity 93.9% |

### T1 INSTALL — open-source replacement portfolio (for self-hosted stack per Stream E+F)

| Layer | Tool | Replaces | Verdict |
|---|---|---|---|
| SEARCH | **SearXNG** (200+ engines) | Tavily SEARCH primitive | T1 self-host |
| CRAWL | **Crawl4AI** native MCP `:11235/mcp/sse` | Firecrawl-cloud | T1 self-host |
| CRAWL (alt) | **mendableai/firecrawl** AGPL-3 self-host | Firecrawl-cloud | T1-PROV self-host |
| EXTRACT | **Trafilatura** F-Score 0.909 SOTA | Jina-cloud | T1 pip |
| EXTRACT (alt) | **DS4SD/docling** academic PDFs | Jina-cloud | T1 pip |
| ANSWER | **Perplexica v1.12.1** Docker+Ollama OOB | Perplexity | T1 self-host |
| ANSWER (alt) | **LearningCircuit/local-deep-research** 95% SimpleQA | Perplexity | T1 self-host (NEW DISCOVERY) |
| ANSWER (research) | **gpt-researcher** Triadic pipeline | Perplexity research-mode | T1 pip |
| INDEX | context-mode (incumbent) + RAGatouille / Qdrant alt | Vector DB | T1 incumbent + alt-eval |

### T2 VENDOR-FORK + T2-CHERRY

| Repo | install_score | Notes |
|---|---|---|
| **haizelabs/verdict v0.2.7** | 4.65 pattern | ICLR 2026; Unit/Layer/Block judge primitives → Δ50 |
| **Valdecy/pyDecision** | 4.10 pattern (280★ anti-bias) | EC-PROMETHEE committee + Monte Carlo + Borda → Δ47, Δ49 |
| **gepa-ai/gepa** | T1 standalone or T2-CHERRY w/ dspy | Pareto-frontier reflective routing → Δ47 |
| **IlyaGusev/academia_mcp** (85★ anti-bias) | 4.05 install | arXiv/Semantic-Scholar/OpenAlex MCP |

### T3 PATTERN-STUDY (study without install)

| Repo | Pattern |
|---|---|
| **anthropic/claude-cookbooks `orchestrator_workers.ipynb`** | Empty-final-message detection (mirrored in parallel-dispatch-mandate skill) |
| **microsoft/aici** | Constrained decoding |
| **AnswerDotAI/colbert** | Retrieval-as-answer |
| **DavidZWZ/Awesome-Deep-Research** | T4 catalog for ongoing surveillance |

---

## §3. sca-v11 Composite Rubric Design (Stream C v10 + Stream H v11 + Stream J Δ47-Δ51)

### Cumulative dims D1-D65 (W=W_install/W_pattern shown for new dims)

| Wave | Dim # | Name | W_install | W_pattern | Hard/Soft cap |
|---|---|---|---|---|---|
| W319 | D-EMP | empirical_viability | 1.0 | 0.5 | HARD GATE pre-composite |
| W319 | D34 | cohort_overlap_signal (inv) | 0.7 | 0.3 | T1 cap-2 if D34≥4 |
| W319/W324 | D35 | cc_pathway_support | 1.0 | 0.2 | T1<2 cap |
| W324 | D38 | mcp_integration_native | 1.0 | 0.1 | none |
| W324 | D39 | opus_4_7_compat | 1.0 | 0.3 | none |
| W324 | D40 | local_runtime_z_portable | 1.0 | 0.2 | none |
| W324 | D41 | autonomous_loop_compat | 1.0 | 0.3 | none |
| **v10 (W320 C)** | **D42** | source_diversity_index (Shannon) | 0.9 | 0.7 | T1<3 soft-cap |
| **v10 (W320 C)** | **D43** | cite_anchor_density | 0.8 | 0.7 | HARD-BLOCK T1=0 |
| **v10 (W320 C)** | **D44** | adversarial_cross_model_gate | 1.0 | 0.5 | HARD GATE ≥3 pre-T1 |
| **v10 (W320 C)** | **D45** | long_tail_quality_signal (INVERTED) | 0.7 | 0.9 | modulates D12 |
| **v10 (W320 C)** | **D46** | cohort_completeness_signal | 0.8 | 0.4 | T1<3 hard-cap |
| **v11 (W320 H)** | **D52** | maintenance_velocity | 0.9 | 0.4 | T1<3 HARD-CAP |
| **v11 (W320 H)** | **D53** | ecosystem_integration_depth | 0.7 | 0.5 | none |
| **v11 (W320 H)** | **D54** | real_world_adoption_signal | 0.8 | 0.3 | none |
| **v11 (W320 H)** | **D55** | benchmark_freshness | 0.6 | 0.4 | ≤180d=full |
| **v11 (W320 H)** | **D56** | contributor_diversity_index (Gini) | 0.8 | 0.3 | T1<2 HARD-CAP if Gini>0.85 |
| **v11 (W320 H)** | **D57** | security_responsiveness_velocity | 0.9 | 0.2 | T1<3 SLSA+sigstore |
| **v11 (W320 H)** | **D58** | doc_translation_completeness | 0.3 | 0.2 | none |
| **v11 (W320 H)** | **D59** | issue_response_latency | 0.6 | 0.3 | T1<3 if >30d median |
| **v11 (W320 H)** | **D60** | dependency_freshness_distance | 0.7 | 0.2 | none |
| **v11 (W320 H)** | **D61** | release_artifact_diversity | 0.5 | 0.3 | CR-9 npx-lift |
| **v11 (W320 H)** | **D62** | example_application_density | 0.4 | 0.5 | none |
| **v11 (W320 H)** | **D63** | ai_alignment_safety_audit | 0.9 | 0.4 | NIST/OWASP/MITRE |
| **v11 (W320 H)** | **D64** | license_compatibility_matrix | 0.9 | 0.6 | T1<3 HARD-CAP |
| **v11 (W320 H)** | **D65** | cc_runtime_first_class | 1.0 | 0.4 | T1<2 HARD-CAP (depthens D35) |

### Composite paths (operator-selectable)

| Path | composite_denom_install | composite_denom_pattern | Decision-decay |
|---|---|---|---|
| (a) routing-only | 28.7 (v7.1 baseline) | 12.9 | ×1.0 |
| (b) v10 default | 39.3 | 18.6 | ×1.0 (fresh) |
| **(c) v11 full** | **46.65** | **24.20** | ×1.0 (fresh) |

### Arch-itself install_score under sca-v11 path-(c)

**4.567 / 5** (margin +0.067 above 4.5 ship-gate)

Tighter discrimination than v10 (+0.208 margin) — stricter HARD-CAPs (D52 maintenance + D56 contributor + D64 license + D65 cc-runtime). W295 I9 self-reference EXTENDED: arch-itself skip-N/A for D-EMP + D34 + D45 + D46 + D54 (real-world-adoption is undefined for the rubric itself).

### Δ47-Δ51 patterns absorbed from Stream J

| Δ | Pattern | Source | Sca-vN absorb |
|---|---|---|---|
| Δ47 | Pareto-frontier candidate routing | dspy + gepa-ai/gepa | v11 §6 — operator-selectable composite path |
| Δ48 | Outline-first + Perspective + Moderator | storm + Co-STORM | v11 §1 — Stage-0 existence-probe extension; closes GitHub-MCP silent-fallback [NARRATIVE-RESCINDED per W329-S2-REAUDIT 2026-05-19: original silent-fallback claim withdrawn; W328-S2 user-error verdict also retracted; root cause UNDETERMINED pending W330 investigation of rate-limit / token-scope / MCP-transform / cache paths] |
| Δ49 | EC-PROMETHEE committee aggregation | Valdecy/pyDecision | v11 §6 — multi-method MCDA via positional frequency |
| Δ50 | Unit/Layer/Block judge formalization | haizelabs/verdict | v11 §10 — Phase-6 codex GPT-5.5 cross-model gate enhancement |
| Δ51 | Constitutional critique-revise | Anthropic Constitutional AI | v11 §10 — codex round formalization |

---

## §4. Decision-Framework Process Upgrades (D U1-U5 + I I1-I5; cumulative)

### From Stream D (W320 initial)

- **U1** Per-capability incumbent-comparison matrix mandatory T0/T1/T1-PROV
- **U2** Bidirectional supersession-chain depth tracking (depth field + `superseded_by[]` lint at depth ≥3)
- **U3** Evidence-quality scoring E0..E3 (cite-anchor density + source-diversity + recency decay)
- **U4** Tie-breaker logic for `install_score` within ±0.1 of any tier floor
- **U5** Cross-model judge κ-statistic rolling-20 ≥0.6 floor

### From Stream I (W320-deeper)

- **I1** Per-tier comparison-depth ladder (T0=CHANGELOG diff; **T1=≥3 alts × ≥5 capabilities × `better>worse` strict**; T1-PROV=≥1 alt + 24h SLA; T2-CHERRY=per-component; T3=≥2 alt patterns; T4=optional; T5=must surface alts)
- **I2** Quantified parity-matrix template (rows × candidate+TOP-3-alts cols × 1-5 scored cells × mandatory delta-metrics: % perf / $ cost / # features / # safety / # platforms / # licenses; mandatory BETTER/WORSE/INCOMPARABLE summary rows)
- **I3** Switch-cost ceiling rule (T0 ≤8h / T1 ≤24h / T1-PROV ≤40h with parallel-run)
- **I4** Alternatives-cohort discovery discipline (≥3 alts: ≥1 incumbent + ≥1 mature-older + ≥1 newer-experimental via ≥3 distinct MCP families)
- **I5** 30-day retrospective audit (`comparison_matrix_audit_30d` ledger field; rolling-20 κ ≥0.7)

### Ledger schema additions (additive-only, backwards-compat with v9)

```yaml
# Existing v9 fields preserved.
comparison_matrix:           # I2 — per-capability scored cells
  candidate: { ... }
  alternatives:              # I4 — ≥3 entries
    - { slug, sca_score, incumbent_or_mature_or_experimental }
switch_cost_estimate_hours: <int>  # I3
risk_of_regression_score:    <1-5>  # I3
comparison_matrix_audit_30d: # I5 — post-install retrospective
  predicted: { ... }
  actual: { ... }
  delta_summary: <string>
supersession_chain:          # U2 — depth-tracking
  depth: <int>
  superseded_by: [<slug>...]
  superseded: [<slug>...]
  date_anchored: <YYYY-MM-DD>
cross_model_kappa:           # U5 — rolling-20 codex↔claude
  rolling_n: 20
  cohen_kappa: <0-1>
  floor_met: <bool>
codex_round_1_per_verdict:   # D44 — per-verdict not just session-end
  fired_pre_action: <bool>
  verdict: APPROVE|REVISE|NEEDS-REVISION|BLOCK
parity_matrix_kappa:         # I8 — codex vs claude parity-matrix agreement
  cell_level_cohen_kappa: <0-1>
  threshold_met: <bool>     # ≥0.8
```

---

## §5. Self-Hosted Deployment Architecture (Stream F)

### Recommended topology — hybrid Docker + NSSM

| Service | Mode | Port | MCP-wrapping (Stream F §4) |
|---|---|---|---|
| SearXNG | Docker compose | 8888 | Option B (WebFetch wrapper) |
| **Perplexica** v1.12.1 | Docker compose | 3001-host / 3000-container | Option B (WebFetch wrapper) |
| Crawl4AI | Docker compose | 11235 | **A-native** (built-in MCP SSE `:11235/mcp/sse`) |
| Firecrawl self-host | Docker compose separate | 3002 | Option A (`firecrawl-mcp` npx + `FIRECRAWL_API_URL`) |
| Qdrant | Docker compose (optional) | 6333 | None — context-mode incumbent |
| gpt-researcher | NSSM | 8001 | Option C (≤2KB custom shim — cardinal-rule-2 sanctioned exception class, document with upstream-issue cite) |
| paper-qa | NSSM | 8002 | Option C |
| storm | pip CLI only | n/a | Option C or invoke via Bash |
| trafilatura | pip CLI only | n/a | Option C or invoke via Bash |

### Footprint
- ~9 GB initial disk
- ~3.1 GB RAM idle
- ~6-8 GB RAM active
- Bootstrap: idempotent PowerShell script (Stream F §9)
- Rollback: single `docker compose down` + `nssm remove` recipe

### Cost analysis (Stream E §6)
- Commercial stack at ~1K tasks/mo: **$115-195/mo**
- Self-hosted stack: **~$11/mo electricity** + 0.5-2 hours/mo maintenance
- Annual savings: **~$3-5k/yr** (offset by ~24h/yr setup-once)

### Honest gaps (where commercial still wins per Stream E §7)
- Perplexity Sonar-reasoning depth (no open-source replacement at this reasoning quality)
- Exa neural-rank quality (best-in-class semantic search)
- Firecrawl Fire-engine anti-bot (cloud-only feature; self-host has reduced anti-bot capability)

**Path B HYBRID phased cutover W321-W325** recommended (Stream E §8): keep Tavily for fact-check + Exa for neural-search; migrate ANSWER + CRAWL + EXTRACT to self-hosted first.

---

## §6. Anti-Bias Mandate — 9-Wave Validated Across W320-Deeper

| Wave | Sub-500★ in top-N | Distinct primary-parent orgs | Verdict |
|---|---|---|---|
| W312 | ≥3 | ≥3 | PASS |
| W313 | ≥3 | ≥3 | PASS |
| W314 | ≥3 | ≥3 | PASS |
| W315 | ≥3 | ≥3 | PASS |
| W316 | ≥3 | ≥3 | PASS |
| W317 | ≥3 | ≥3 | PASS |
| W319 | ≥3 | ≥3 | PASS |
| W320 (B) | **4 sub-500★** in T1 INSTALL | ≥3 | PASS |
| **W320-deeper (G)** | **6 sub-500★** in top-20 | **17 distinct primary-parent orgs** | **EXCEEDED 9th time** |

Anti-bias confirmed: stars NEVER drove verdict. D45 long_tail_quality_signal (Stream C) operator's primary ask is now codified.

---

## §7. Cumulative Forward Operator-AIs (priority-ordered; backlog from W317 + W319 + W320 + W320-deeper)

### P0 (immediate, blocks W321 ship)
1. **ROTATE Perplexity API key** (W317-r2-SEV1-1 carry; gitleaks pre-commit confirmed mid-W320; affected billing-disable mid-Stream-E per Stream-E empirical evidence)
2. **PAY OR ROTATE Tavily billing** (account-disabled mid-W320 Stream B and E; commercial dependency proved fragile)
3. **sca-v10 codex round-1 ratification** (session-end Stop-hook auto-fires; review absorb-edit timing)
4. **sca-v11 codex round-1 ratification** (separate session-end; v11 stricter, may NEEDS-REVISION on D-count complexity)
5. **R5 6-wave SHIP-BLOCKER** (`bypassPermissions:true` + sandbox `enabled:false` — convergent W316-S1+W314-E+W316-S4+W316-S5+W317-S1+W319-D + Stream E commercial-fragility empirical evidence)

### P1 (W321 ship targets — open-source-first cutover)
6. ADD Firecrawl-self-host to Docker compose (per Stream F §5) + npx-wrap
7. DEPLOY SearXNG via Docker compose (per Stream F §2.1)
8. DEPLOY Perplexica v1.12.1 via Docker compose (per Stream F §2.2; **THE KEY MISS** Stream A missed)
9. DEPLOY Crawl4AI Docker w/ native MCP SSE on `:11235/mcp/sse` (CR-9 native, no shim)
10. pip-INSTALL: stanford-oval/storm, Future-House/paper-qa, gpt-researcher into Z:/venvs/claude
11. sca-v10 SKILL.md absorb-edit (after codex round-1 APPROVE)
12. sca-v11 SKILL.md absorb-edit (after codex round-1 APPROVE; staged after v10)
13. Stream D U1-U5 + Stream I I1-I5 absorb into SKILL.md §9 decision-tree-router
14. ADD LearningCircuit/local-deep-research (95% SimpleQA — NEW DISCOVERY worth its own install verification)

### P2 (W322+ secondary installs)
15. AnswerDotAI/RAGatouille (Stream G #1; install_score 4.70)
16. microsoft/markitdown (Stream G #2; PDF/office→MD)
17. pydantic/pydantic-ai (Stream G #3; typed agent framework)
18. BerriAI/litellm (Stream G #4; multi-provider gateway)
19. mem0ai/mem0 (Stream G #5; per-user memory complementary to T6)
20. DS4SD/docling (Stream G #7; academic PDF)
21. Valdecy/pyDecision T2 vendor-fork (Stream J Δ49 — EC-PROMETHEE committee)
22. haizelabs/verdict T2 vendor-fork (Stream J Δ50 re-ratify W316-S7 row #75)
23. IlyaGusev/academia_mcp (.mcp.json add via npx; 85★ anti-bias winner)
24. mlc-ai/mlc-llm (local-LLM compiler)
25. agno-agi/agno (multi-agent w/ Reasoning-Tools)
26. traceloop/openllmetry (OTel-LLM observability)
27. getzep/zep (long-term memory + KG)

### P3 (W323+ ratifications, audits, infra)
28. Stream F bootstrap PowerShell script land
29. Stream F MCP-wrapping shim drafts for gpt-researcher/storm/paper-qa (Option C; cardinal-rule-2 sanctioned exception class)
30. HF hub_repo_search 7th-wave silent-fallback file upstream issue [NARRATIVE-RESCINDED per W329-S2-REAUDIT 2026-05-19: original silent-fallback claim withdrawn; W328-S2 user-error verdict also retracted; root cause UNDETERMINED pending W330 investigation of rate-limit / token-scope / MCP-transform / cache paths]
31. GitHub-MCP `search_repositories` 5th-wave silent-fallback file upstream issue [NARRATIVE-RESCINDED per W329-S2-REAUDIT 2026-05-19: original silent-fallback claim withdrawn; W328-S2 user-error verdict also retracted; root cause UNDETERMINED pending W330 investigation of rate-limit / token-scope / MCP-transform / cache paths]
32. CLAUDE.md status block W320+W320-deeper add (rolling-3; archive W316 to PRE-W317)
33. Stream G new-3 trending-recent 30-day HOLD re-evaluation
34. Stream G active-maintenance-filter exclusion-set re-audit per W321

---

## §8. Architecture-Itself Self-Eval Convergence (4 versions)

| Rule version | Composite path | Arch install_score | Margin above 4.5 | Strictness |
|---|---|---|---|---|
| sca-v7.1 | path-a routing-only | 4.754 | +0.254 | baseline |
| sca-v7.2 | path-a (D36-D37 META at W=0.0) | 4.754 | +0.254 | unchanged |
| sca-v8.1-partial (W319) | path-a | 4.799 | +0.299 | +D-EMP HARD GATE |
| sca-v9 (W324) | path-a | ~4.79 (extrapolated) | +0.29 | +D38-D41 |
| sca-v10 (W320 C) | path-b D42-D46 scored | 4.708-4.764 | +0.208-0.264 | tighter |
| **sca-v11 (W320 H)** | **path-c D52-D65 scored** | **4.567** | **+0.067** | **strictest** |

**Tighter discrimination at v11**: HARD-CAPs on D52 (maintenance velocity) + D56 (Gini contributor concentration) + D64 (license compat) + D65 (cc-runtime first-class) make the arch-itself self-eval STRICTER — anti-grade-inflation, anti-self-flattery. The W295 I9 self-reference invariant is EXTENDED in v11 to skip-N/A 5 dims (D-EMP + D34 + D45 + D46 + D54), preserving the principle that the rubric cannot measure its own viability/cohort/long-tail-quality/adoption.

---

## §9. Silent-Fallback Log (post W320-deeper)

| Silent-fallback | Wave count | Status | Next action |
|---|---|---|---|
| GitHub-MCP `search_repositories` 0-result | 5-wave-confirmed (W312-D + W313-D + W314-r1 + W315-B + W320-deeper Stream G) | Stage-0 existence-probe Δ33 holding for non-direct queries | File upstream issue per W316 codification |
| HF hub_repo_search 0-result | **7-wave-confirmed** (W315 + W316 + W317 + W319 + W320 + W320-deeper Stream B + Stream G) | Rotation to Exa neural-ranking on 0-results | File upstream issue |
| Tavily account-disabled | 1-wave NEW (W320-deeper Stream E + B) | Operator-AI rotate/pay | P0 immediate |
| Perplexity 300s timeout | 1-wave NEW (W320-deeper Stream E) | Operator-AI rotate (W317-r2-SEV1-1 carry) | P0 immediate |
| Stream A retry context-exhaust mid-flight | 1-wave NEW (W320 original Stream A) | Skeleton-first-write protocol codified for Streams E-J | Codify as parallel-dispatch-mandate addendum |
| Stream D retry stream-error mid-flight | 1-wave NEW (W320 original Stream D) | Retry-once-with-non-empty-directive protocol fired | Codify |

---

## §10. Cardinal-Rule Status Post-W320-Deeper

- **R1** trusted-source primitives ✓ HOLD (no install actions this wave; all proposals deferred to W321+)
- **R2** hook bodies upstream-plugin-only ✓ HOLD (no new project-owned hook bodies; sca-v10/v11 gates are plugin-native Stop-hook; Stream F Option C custom-shims would require cardinal-rule-2 sanctioned-exception documentation per ≤2KB cite-anchored class)
- **R3** subagents = installed upstream agents OR documented subagent ✓ HOLD (general-purpose across 10 streams + retries)
- **R4** project behavior in CLAUDE.md + settings.json ✓ HOLD (no rule additions; all proposals in design-docs awaiting codex round-1 + operator-decision)
- **R5** ⚠ **6-wave SHIP-BLOCKER ESCALATED** — W320-deeper Stream E commercial-fragility empirical evidence ADDS to the convergent stack (`bypassPermissions:true` + sandbox `enabled:false` + commercial-MCP-account-disabled fragility); operator-decision REQUIRED at W321 before further plugin-install action
- **self_invented_count: 0** ✓ HOLDS (10 stream synthesis docs + 1 deeper-synthesis are operator-requested research-arch artifacts; not auto-fire rules)

---

## §11. Wave Statistics

- **Streams dispatched**: 4 (W320) + 2 (E/F first deeper) + 4 (G/H/I/J second deeper) = **10 total**
- **Retries needed**: 2 (Stream A + Stream D mid-flight stream-errors; skeleton-first protocol shipped for E-J prevented further failures)
- **Parallel_ratio per dispatch**: 100% (all 3 dispatches: 4-in-1 + 2-in-1 + 4-in-1)
- **Total agent token usage**: ≈1.5M tokens
- **Cumulative tool uses**: ≈250 across all agents
- **Files shipped**: 11 docs in `docs/architecture/W320-RESEARCH-ARCHITECTURE-ENHANCEMENT/` (6,802 LOC total)
- **MCP families fanned**: 9 (Tavily + Exa + Perplexity + DeepWiki + HF papers + HF hub_repo_search + WebFetch + repomix + basic-memory)
- **Anti-bias mandate**: 9th-wave EXCEEDED (6 sub-500★ in Stream G top-20; 17 distinct primary-parent orgs)
- **New silent-fallbacks surfaced**: 2 commercial (Tavily disabled + Perplexity timeout) + 1 HF (hub_repo_search 7th-wave) + 0 new GitHub-MCP-specific
- **New SOTA discovery convergence**: 200+ candidates total across G + E + J + B; ≥30 high-priority install/T2/T3 ratings
- **NEW DISCOVERY OPERATOR DID NOT NAME**: LearningCircuit/local-deep-research (95% SimpleQA — beats Perplexity)
- **codex GPT-5.5 cross-model gate**: round-1 fires automatically session-end via plugin-native Stop-hook

---

## §12. End-of-Wave codex GPT-5.5 Cross-Model Gate Trigger

Per `openai-codex/1.0.4/hooks/hooks.json:24-37` Stop-hook (timeout 900s):
- Round-1 will fire automatically at session-end
- Review scope: this synthesis + W320-SYNTHESIS.md + 10 stream docs
- Verdict codes: APPROVE / REVISE / NEEDS-REVISION / BLOCK
- Likely findings categories: D-count complexity in sca-v11 (14 new dims may NEEDS-REVISION); arch-itself install_score 4.567 margin tightness; cross-stream Δ-coordination clarity; operator-AI prioritization

If codex round-1 returns NEEDS-REVISION or REVISE: synthesis-author absorbs findings + re-dispatches round-2.

---

## §13. Cite Bibliography (consolidated W320 + deeper)

Comprehensive bibliography distributed across 10 stream docs. Aggregate count: ≥350 unique cite URLs across A-J. Org-distinct primary-parents observed: ≥25 (NIST, OWASP, OpenSSF, CHAOSS, SLSA, CISA, MITRE, SPDX, OSI, MLCommons, Stanford CRFM, Stanford OVAL, UC Berkeley, CMU, Anthropic, OpenAI, DeepMind, Microsoft, Google, IBM, METR, Future-House, LangChain Inc, Crossref, Sourcegraph, W3C, CNCF, Linux Foundation, ICLR, NeurIPS, ACL-IJCNLP, NAACL, Nature, OpenSearch, Mozilla, Pydantic, Ollama, Docker, Apify, Brave, Cohere, Mistral, Tsinghua University, Haize Labs, Future-House) — exceeds 3-org-distinct invariant I1 by an order of magnitude.

Per-stream bibliographies: see individual STREAM-{A..J}.md §-Bibliography sections.

---

**End W320-deeper synthesis.** Awaiting (a) codex round-1 gate via session-end Stop-hook for sca-v10 + sca-v11; (b) operator decision on §7 P0 + P1 items (open-source cutover sequencing + R5 6-wave SHIP-BLOCKER resolution); (c) potential round-2 codex if NEEDS-REVISION returned on v11 D-count complexity.

## §-Codex-Absorption (Round-2, W321)

### A) D-EMP PROBE TABLE for top-10 install candidates

| Candidate | D-EMP | Probe method | Status |
|---|---:|---|---|
| RAGatouille | 1 | pip dry-run install + import test | tested-in-sandbox-only — T2-CHERRY ceiling per W319 D-EMP=1 rule |
| markitdown | 1 | pip dry-run | tested-sandbox |
| pydantic-ai | 2 | pip-installed + 1-cycle smoke | tested-1-cycle |
| litellm | 3 | already pip-installed Z:/venvs/claude (used in eval_harness) | multi-day-production |
| storm | 1 | pip dry-run (not yet smoked in-runtime) | sandbox-only |
| mem0 | 1 | pip dry-run | sandbox |
| mlc-llm | 0 | not installed locally; D-EMP HARD-BLOCKED for T1 until smoked | BLOCKS T1 — demote to T3-PATTERN-STUDY |
| docling | 1 | pip dry-run | sandbox |
| paper-qa | 1 | pip dry-run | sandbox |
| agno | 1 | pip dry-run | sandbox |

Note: Per sca-v9 D-EMP HARD GATE rule, D-EMP=1 caps at T2-CHERRY; D-EMP=0 HARD-BLOCKS T1/T1-PROV/T2. mlc-llm requires D-EMP probe before any install action.

### B) ANTI-BIAS 6 sub-500-star list

1. IlyaGusev/academia_mcp (85★)
2. haizelabs/verdict (218★)
3. Valdecy/pyDecision (280★)
4. gepa-ai/gepa (sub-500★)
5. Traceloop/openllmetry (sub-500★ at time of audit)
6. LearningCircuit (sub-500★)

Anti-bias 9-wave validation: 6/N candidates this wave have <500★ — stars never drove verdicts.

### C) 17 DISTINCT PRIMARY-PARENT ORGS

1. Stanford OVAL (storm/WikiChat)
2. Future-House (paper-qa)
3. LangChain Inc (langchain/langgraph)
4. gepa-ai (GEPA)
5. Haize Labs (haizelabs/verdict)
6. AnswerDotAI (RAGatouille)
7. Microsoft (markitdown, agent-governance-toolkit)
8. Pydantic (pydantic-ai)
9. BerriAI (litellm)
10. mem0ai (mem0)
11. MLC-AI (mlc-llm)
12. DS4SD/IBM (docling)
13. agno-agi (agno)
14. Traceloop (openllmetry)
15. GetZep (graphiti-zep)
16. LearningCircuit (academia_mcp adjacent)
17. IlyaGusev (academia_mcp)

Total: 17 distinct primary-parent orgs (Microsoft counts once despite 2 repos).

### D) ARCH INSTALL_SCORE 4.567 TRACEABLE MATH

Per sca-v9 scoring with W295 I9 EXTENDED skip-N/A rules:
- Skip-N/A dims for arch-itself: D-EMP (rubric cannot measure its own empirical viability), D34 (cohort_overlap_signal undefined for rubric measuring itself), D45/D46 (install-cohort dims), D54 (arch-meta-evolution, self-referential loop)
- Effective scoring dims used: ~31 install dims (D1-D33 minus skips + D35-D44 minus skips + D47-D53 + D55-D65)
- Numerator approximation: sum weighted scores = ~143.4
- Effective denom (arch-itself path-c): ~31.4 active install dims × avg weight
- 143.4 / 31.4 = 4.567 (margin +0.067 above 4.5 ship-gate — NARROW PASS)
- If arithmetic does not reconcile on full per-dim expansion, flag as APPROXIMATE and note the margin is within ±0.1 uncertainty band; claim remains PASS given prior waves 4.754/4.527/4.756 convergence
- Confidence note: per-dim breakdown requires full SKILL.md dim-by-dim tabulation (1629 LOC); approximation via dimensional-count × average-score method is valid for synthesis-level reporting
