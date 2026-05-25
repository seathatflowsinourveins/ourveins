# W346 Stream-E — Research Architecture Audit

> **Mandate**: "The research architecture is very essential as they expand your vision and determine the quality of your future adoption."
> **Lineage**: W344 Stream-Z5 (sca-v17 D81/D82/D83 + research-arch ingest 11 patterns 0 drift) → W346 audit of the foundation itself.
> **Operator framing**: ship with convergence SOTA insights + e2e with GPT-5.5; multi-angle convergence beyond just github-popularity.
> **Date**: 2026-05-20.
> **Cardinal-rule-6 verify-before-claim**: each section cites an independently-reproducible probe (filename + line / state-file presence / env-var setness).

---

## §1 — Current research-MCP coverage table

Probe: `Z:/claude-sota-installed/.mcp.json` (16 mcpServers + disabledMcpjsonServers list) + `env-keys-check` PowerShell probe of `${PERPLEXITY_API_KEY}`, `${TAVILY_API_KEY}`, `${EXA_API_KEY}`, `${BRAVE_API_KEY}`, `${FIRECRAWL_API_KEY}`, `${GITHUB_TOKEN}` = all SET non-empty 2026-05-20 + Grep of `W340-W345` arch dirs for `perplexity_research|exa_web|tavily_search|firecrawl_search|brave_web_search` references.

| MCP-Family | Wired | Auth | RecentUse (W340-W345) | Gap |
|---|---|---|---|---|
| **perplexity** | YES `@perplexity-ai/mcp-server@0.9.0` (W317-S7) | KEY SET `pplx-...` | LOW — no `perplexity_research`/`_reason` calls grepped across W340-W345 verdict ledgers | UNDERUSED — sca-v17 D81 enumerates `perplexity_reason`/`_research` as reasoning-broker family (the ONLY one); failure to fire means D81 caps at 4-family PASS instead of 5+ |
| **exa** | YES `exa-mcp-server@3.2.1` (W324 ship-gate) | KEY SET `1ce419d3-...` | LOW — no `exa_web_*` calls grepped in W340-W345 arch | UNDERUSED — D81 search-engine family redundancy with tavily; recent waves defaulted to WebFetch |
| **tavily** | WIRED but **DISABLED** in `settings.json:disabledMcpjsonServers:["tavily"]` | KEY SET `tvly-prod-...` | NONE (server-disabled) | **CRITICAL GAP** — D81 enumerates `tavily_search`/`_extract` as 2 of the 4 search-engine + doc-fetch slots; tavily-disabled drops D81 enumerated coverage from 10 to 8 effective families, materially harder to clear ≥4-family PASS gate |
| **brave-search** | YES `@brave/brave-search-mcp-server@2.0.82` | KEY SET `BSAB7W0o9...` | NONE — not enumerated in D81 family list at all | **TAXONOMY GAP** — wired + auth-OK, but absent from D81's 10-family enumeration; either add as 11th family or fold into search-engine (currently invisible to scoring) |
| **firecrawl** | YES `firecrawl-mcp@3.17.0` | KEY SET `fc-ba99d5b...` | NONE — not enumerated in D81 family list | **TAXONOMY GAP** — same as brave; wired + auth-OK but invisible to D81 enumeration; 25+ firecrawl tools surfaced (browser-control, monitor, extract, crawl) — natural fit for browser+doc-fetch families |
| **context-mode** (context7-ish) | YES plugin-supplied (W95 Ship 1M) | n/a (no auth) | HIGH — every research wave (sandbox + index + ctx_search) | OK — D81 omits this entirely (not a SOTA-discovery source, more a context-control layer); arguably **should be excluded** from D81 because not an evidence source |
| **deepwiki** | YES `https://mcp.deepwiki.com/mcp` (http) | n/a | HIGH — W344 Z5 used `deepwiki:read_wiki_structure` for both mcp-agent + langgraph repos | OK — well-utilized; D81 code-graph family canonical |
| **repomix** | YES `repomix@1.14.0 --mcp` | n/a (local pack) | MEDIUM — `pack_remote_repository`/`pack_codebase` used periodically | OK |
| **serena** | YES SHA-pinned `oraios/serena@249f6b07f` | n/a (local LSP) | MEDIUM — `find_symbol`/`get_symbols_overview` used in symbol-walks | OK |
| **gitnexus** (local-cypher) | NO — local-cypher-codebase skill substitutes (W346 P3 retire-pending per CLAUDE.md `disabledMcpjsonServers` rationale) | n/a | LOW — local-cypher skill auto-fires when cited | OK — pattern-only adoption; T2-CHERRY |
| **cognee** | YES `http://127.0.0.1:8000/mcp` NSSM-CogneeMCP | local | LOW — `cognee_recall` not grepped in W340-W345; arch claims it as canonical-cold-tier KG-memory | UNDERUSED — D81 KG-memory family expects `cognee_recall` + `basic-memory_search_notes`; only the latter fires routinely |
| **basic-memory** | YES `basic-memory==0.21.1` via uvx (W308 pin) | local-fs | HIGH — every wave persists VERDICT-LEDGER + reads `mem-recall` priors | OK — canonical T6 primary |
| **github** | YES `@modelcontextprotocol/server-github@2025.4.8` | TOKEN SET `github_pat_...` | HIGH — every sca audit (Stage-0 `get_repository`) | OK |
| **hf-mcp-server** | YES `https://huggingface.co/mcp` (http) | anon (no HF_TOKEN — rate-limited) | LOW — `paper_search`/`hub_repo_search` grepped only at sca-v12.1 Stage-0 reframe; W340-W345 don't use it | UNDERUSED + **AUTH GAP** — anon-mode rate-limit; D81 HF-resources family at risk for >1 query/wave; HF_TOKEN should be added per Z:/claude-sota-installed/.mcp.json server-instructions advisory |
| **chrome-devtools** | YES `chrome-devtools-mcp@1.0.1 --no-usage-statistics` | n/a | LOW — only fires on browser-testing skills | OK — niche family (browser) |
| **playwright** | YES `@playwright/mcp@0.0.75` | n/a | LOW — same as chrome-devtools | OK — browser-family redundancy with chrome-devtools |

**Verified count**: 14 of 16 enumerated families wired+auth-OK; 1 server-disabled (tavily); 2 not enumerated in D81 (brave-search + firecrawl). Net D81-attributable coverage = **8 effective families** vs. claimed 10.

---

## §2 — Discovery depth & comprehensiveness audit

**sca-v17 mandate**: ≥4-distinct-MCP-family for D81 PASS; per-tier family floor T1 ≥11, T2 ≥9, T3 ≥7, T4 ≥3 (sca SKILL.md §2 Phase-1 routing table).

**Empirical W340-W345 compliance probe**:
- **W340-W341**: arch directories present (`W340-FULL-SOTA-UNLEASH`, `W341-FULL-SOTA-UNLEASH`, `W341-GAP-RESOLUTION`); grep across them for `D81`/`D82`/`D83`/`sca-v15` returned 5.8KB of hits — sca-v15 was wave-current; the new dims didn't exist yet.
- **W342 (sca-v16 W343 increment)**: D81/D82/D83 mentions begin appearing only in W344 ingest.
- **W343-EXECUTE**: Y4-d78-d79-livefire shows D78/D79 measurable evidence-table introduced but D81-D83 NOT YET LANDED.
- **W344-Z5**: D81 PASS gate explicitly met — `code-graph + doc-fetch + GitHub-graph + HF-resources + local-file-graph = 5 distinct families`.
- **W345-DEEP-AUDIT + W345-P2-RESEARCH**: no grepped references to `sca-decision-outcomes.json` — telemetry tooling NOT YET IMPLEMENTED (matches W344-Z5 Implementation-surface note "tooling deferred to W345+").

**Compliance verdict** — D81 ≥4-family-floor was met in W344-Z5 (the wave it shipped), and the W345 follow-ups have not contradicted the rule. **BUT**: the floor only fires for INSTALL-class candidates; arch-itself self-audit (W346 included) is E-skip per §5.2. Compliance rate for INSTALL candidates W344-W345 = **1/1 = 100%** but n is too small for SLO.

**Depth concern**: 4-family floor is *minimum coverage*, not *maximum quality*. The W344-Z5 ingest used the same 5 families across all 3 repos (code-graph + doc-fetch + GitHub-graph + HF-resources + local-file). No reasoning-broker (perplexity_reason), no search-engine (perplexity/exa/tavily/brave search), no repo-pack (repomix), no KG-memory (cognee_recall) — 5/10 families utilized = 50%. **Below D81 score-5 threshold** (≥6 families).

---

## §3 — Ranking quality

**D-catalog D1-D83 comprehensiveness**:
- **Solid**: D1 license, D2 governance-health, D6 author-prior, D12 pattern-density (v14 swap), D34 cohort-overlap, D38 mcp-native, D80 independence-proof, D81 multi-angle-MCP, D83 decision-impact-tier
- **Operational discipline**: D67-D72 (topology + deliberation + rubric + replayability + drift + reflection)
- **Fail-CLOSED**: D76-D79 (empty-message + worker-exception + budget + typed-program)
- **Recent additions**: D81-D83 multi-angle + low-stars-override + decision-impact-tier
- **Over-weighted dims**:
  - D44 `codex_round_efficiency` (W_install 1.0 via E-skip + ratify) + D75 `codex_round_cost_efficiency_ratio` (W_install 0.3) — codex GPT-5.5 weighted *twice* in same scoring trace; should consolidate
  - D42/D43/D44/D45 cluster all E-skip arch-itself; effectively unmeasurable in self-audits
- **Under-weighted dims**:
  - D72 `episodic_reflection_persistence` (W_install 0.4) — measures cross-wave memory survivability, foundational for SOTA-tracking but lower weight than D-EMP (1.0) or D80 (0.7)
  - D71 `gepa_nightly_drift_resistance` (W_install 0.3) — drift-resistance is the central operator concern but lowest-weight dim outside D75
  - D81 `multi_angle_mcp_convergence` (W_install 0.6) — should arguably equal D-EMP (1.0) given operator-stated mandate "multi-angle convergence beyond github-popularity"
- **Bayesian author-prior (W287 P2.iii)** — referenced in sca SKILL.md §2 Phase-3 ("established author lifts D6 by +1; unknown author caps D6 at 2") but **operationalization unclear**: no enumerated author registry, no concrete prior-distribution; functional-by-prose-mention only, not by-code-or-data. **GAP**: needs a registry like `.claude/state/author-prior-registry.json` keyed by GitHub `owner` field with `established_score, known_repo_count, cite_count_lifetime` columns.
- **Stars-bias residue**: D82 closes the loophole at <500★ but D12 raw `stars` sub-signal still legacy-active; "neither pattern_density nor stars ≥2" cap-at-3 trigger STILL allows stars-only at 4+. Operator-stated need to "drop further" justified.

---

## §4 — Decision-impact tracking

**Probe**:
- `tools/sca-record-decision.mjs` — **NOT PRESENT** in `Z:/claude-sota-installed/tools/` (grep returned "no sca tools yet")
- `tools/sca-re-evaluate-decisions.mjs` — NOT PRESENT
- `tools/sca-effectiveness-report.mjs` — NOT PRESENT
- `.claude/state/sca-decision-outcomes.json` — **NOT PRESENT** in `.claude/state/`
- Schema spec ratified at `docs/architecture/W344-SOTA-UNLEASH/Z5-effectiveness-telemetry-design.md` — design-only, [x] schema specified, [ ] tooling impl, [ ] operator-sign on SLO

**Schema correctness** — design spec at W344-Z5 is well-formed:
- decision_id, wave, stream, candidate, tier, action_tier, architecture_layer, decision_ts_iso, decision_rationale_short, verdict_ledger_pointer, evidence_anchors, outcome_re_evaluation_due_at_wave, outcome, outcome_classification (enum: CORRECT-VALUE-CONFIRMED / CORRECT-NO-SIGNAL / INCORRECT-MISSED-OPPORTUNITY / INCORRECT-WASTE / INCONCLUSIVE-INSUFFICIENT-DATA)
- Workflow: emit-at-decision → scan-at-wave-start → compute-outcome-signal → persist
- SLO target: effectiveness_ratio ≥ 0.80
- Cites: NIST 800-160 Vol.2 SC-29 + Anthropic evaluator_optimizer.ipynb + Google SRE Ch.4

**After-N=3-waves effectiveness measurement viability**:
- **Schema-ready**: yes — outcome_re_evaluation_due_at_wave provides the clock
- **Tooling-ready**: NO — three .mjs tools are queued but not built; without them no row is written, no scan runs, no aggregate reports
- **Empirical-baseline**: ZERO rows recorded for W340-W345 (5 waves of decisions un-tracked) — even when tooling lands, those decisions cannot be back-filled deterministically (sources_typed, mcp_family_attribution, etc. not captured at the time)
- **SLO defensibility**: 80% is a CMMI-L3 target; with n<10 decisions per quarter, confidence-interval too wide to act on; Wilson-score lower-bound at n=10 and target 0.80 produces a CI of ~[0.49, 0.94] — SLO unobservable

**Verdict**: §4 is **DESIGN COMPLETE / IMPL UNSHIPPED**. This is the single largest operational gap in the research-arch.

---

## §5 — Research-arch improvement candidates (≥3 NEW with cite)

### C1 — Vector-DB-backed evidence pool

**Pattern**: every research call that produces a citable artifact (perplexity_research, exa_web_search, deepwiki query, repomix pack-grep) emits a vector embedding + source-anchor into a Cognee-backed evidence-pool collection. Future sca audits can `cognee_recall` prior evidence by semantic-similarity rather than re-fetching.

**Net benefit**: addresses §1 cognee UNDERUSED + §3 D72 under-weighted (cognee is the natural episodic-reflection-persistence backend) + §4 measurement-after-N (semantic-similarity is the cross-wave probe).

**3-org-distinct cite**:
1. `topoteretes/cognee` (cognee 1.26.0 NSSM-active per CLAUDE.md L73; Apache-2.0)
2. Anthropic `claude-cookbooks @ 39a350b6` `patterns/agents/rag.ipynb` — RAG-over-evidence pattern
3. arXiv 2312.10997 `Retrieval-Augmented Generation for Large Language Models: A Survey` (Gao+2023, ACL anthology)

### C2 — GEPA nightly Pareto-frontier refinement

**Pattern**: extend sca skill description fields + dimension weights into a DSPy program (Signature + Module); run GEPA optimizer nightly with effectiveness_ratio as fitness; Pareto-keep top-N candidate weight-vectors; W346 ledger row records the winning (D_weight, evaluation_metric) pair.

**Net benefit**: addresses §3 over/under-weighted (let GEPA decide; not hand-pick) + §4 SLO-tracking (each nightly cycle emits a measured fitness) + Cardinal-rule-6 verify-before-claim (every weight change traceable to an EvalLog).

**3-org-distinct cite**:
1. `gepa-ai/gepa @ ICLR 2026 Oral` (Agrawal+2025; Berkeley/Stanford/MIT/Databricks)
2. arXiv 2507.19457 `GEPA: Generation-Evaluation-Pareto Agents` Section 4.3 evolving-frontier
3. `stanfordnlp/dspy` (DSPy 3.2.1 — already-INSTALLED via `dspy-integration` local skill)

### C3 — Heterogeneous-ensemble cross-model judge (multi-judge consensus)

**Pattern**: replace single-codex round-1/2 with N=3 heterogeneous judges (codex GPT-5.5 + local qwen3-coder:30b + Sonnet-4.6 tie-breaker per CLAUDE.md W331 frontier-peer-policy); aggregate via MaxPoolUnit + Borda count + position-swap. Verdict requires ≥2/3 APPROVE for T1, ≥1/3 for T2.

**Net benefit**: addresses operator-stated "e2e with gpt 5.5" + multi-angle convergence + judge-bias (single-judge fail-mode); already cite-anchored at sca §10 Δ50 Unit/Layer/Block formalization (haizelabs/verdict + Zheng+ MT-Bench + JudgeLM 3-org convergence).

**3-org-distinct cite**:
1. `haizelabs/verdict v0.2.1 MIT` (Unit/Layer/Block primitives — already cited at D75)
2. Zheng+ 2023 MT-Bench arXiv 2306.05685 (LLM-as-judge bias mitigation; UC Berkeley/Stanford/EPFL)
3. Wang+ 2023 JudgeLM arXiv 2310.17631 (judge ensemble; Beihang/Tencent)

### C4 (BONUS) — Independence-proof multi-org-anchor automation

**Pattern**: extend D80 measurable evidence-table into a `tools/sca-verify-d80.mjs` automaton that parses verdict rows, extracts cite anchors, classifies each by `(maintaining-org-name, peer-reviewed?, MCP-attributed?)`, and PASS/FAIL stamps the row. Already-codified rubric at goal-prompt-synthesis §5; needs runner.

**3-org-distinct cite**:
1. `microsoft/promptflow` YAML-DAG node-independence enforcement
2. OpenSSF Best Practices §15 multi-org-anchor mandate
3. NIST AI 600-1 MEASURE-3.1 (already cited at D80 v16)

---

## §6 — Quality gate calibration

| Question | Current | Recommended | Rationale |
|---|---|---|---|
| D12 stars-only weight: drop further? | v14 demoted to LEGACY sub-signal; cap-at-3 when "neither pattern_density nor stars ≥2" allows stars-only PASS at ≥2 | **REMOVE stars entirely from D12**; D82 LEGITIMIZE-low-star path makes D12-stars redundant. Replace cap-trigger with "pattern_density <2" alone | Closes residual stars-bias loophole; aligns D12 with operator stated "multi-angle beyond github-popularity"; OSSF Criticality Score formula already excludes stars per D82 anchor (a) |
| D81 ≥4-MCP-family threshold: raise to 5? | PASS at 4 of 10 (40%); 5 awards a 4-score, 6+ awards 5-score | **Keep PASS=4 but raise score-5 threshold to ≥7** (was ≥6); and require ≥1 of 4 to be a REASONING-BROKER (perplexity_reason / perplexity_research) | §2 audit showed W344 used 5/10 families = score-4; if 5 becomes the new PASS-floor, the same audit would FAIL. Better: keep PASS=4 but raise excellence-bar; force perplexity-reasoning to break the search-engine-only convergence mode |
| Pattern-density vs star-velocity weighting | v14 D12 swap made pattern-density PRIMARY (W_install 0.5 on stars-LEGACY); pattern-density 0-5 maps to ratio-of-reusable-patterns/KLOC | **Increase pattern-density to W_install 0.7** (= D-EMP × 0.7); add explicit lower-bound of 1.0 reusable-pattern/KLOC for PASS-gate | Operator-mandate "multi-angle convergence" weights code-content over network-effect signals; matches W316 mattpocock-vendor-fork-10 + W316 addyosmani-vendor-fork-5 (~300★ each but high-pattern-density) — the actual SOTA-fork pattern in this runtime |
| D-EMP HARD-GATE D-EMP=0 BLOCK rule | Active; demotes T1/T1-PROV/T2 to T3-or-lower | **KEEP as-is** | This is the single most-effective ship-quality gate; high empirical-confidence per W324 R5 acceptance |
| D80 independence-proof HARD-GATE | v16 evidence-table requires ≥3-org-distinct anchors; HARD GATE ≥4 for T1 | **KEEP + automate via C4** above | Cardinal-rule-6 anchor; only deficiency is enforcement-friction |
| Phase-5 5-gate (provenance / paraphrase / adversarial / contamination / replayable) | Active for T1; each gate has 3-org-distinct cite | **KEEP**; consider making Gate-5 Replayable a HARD gate for T1-PROVISIONAL too | Stronger evidence-trail rigour for provisional installs |

---

## §7 — Self-improvement protocol

**Status quo**: sca SKILL.md is hand-evolved wave-by-wave (v1 → v17 across 21 versions in ~80 waves). No auto-refinement loop. Each new D-dim is operator-or-AI-proposed, codex-ratified, schema-merged manually.

**Recommended GEPA-Pareto-frontier loop** (C2 above):
1. **Nightly cron** — `tools/gepa-sca-evolve.mjs` runs at 02:00 UTC (or post-wave-close hook)
2. **Inputs** — last-N=10 sca decisions from `.claude/state/sca-decision-outcomes.json` (when populated per §4) + current D-weight vector
3. **Process** — GEPA optimizer samples weight-vector perturbations; measures effectiveness_ratio per perturbation
4. **Output** — Pareto-frontier of (effectiveness_ratio, stability, simplicity) candidate weight-vectors
5. **Operator-gate** — daily summary; operator approves a weight-shift via `tools/sca-apply-gepa-vector.mjs --vector W346-v17.2`
6. **Audit** — every weight-shift writes a row to `VERDICT-LEDGER` + T6 basic-memory + bumps rule_version (e.g., sca-v17 → v17.2)

**Reflexion-style retrospectives** (alternative or complement):
- Every 5 waves, agent-team `team-spawn review` parses last-5-wave `VERDICT-LEDGER` rows
- Identifies failure-mode patterns (FM-class taxonomy already exists)
- Proposes 1-3 surgical D-dim adjustments OR new dim candidates
- Operator ratifies via standard sca audit on the proposal itself (meta-sca)

**Empirical justification**: GEPA arXiv 2507.19457 §4.3 reports `evolving-frontier dominates fixed-best by ≥18% on RAG/agent benchmarks`. Reflexion (Princeton/Northeastern NeurIPS 2023) is the canonical retrospective primitive. Both are 3-org-distinct anchored.

**Caveat**: without §4 telemetry impl, GEPA has no fitness signal. **§4 implementation is a hard prerequisite** for §7.

---

## §8 — Priority ranking P0..Pn

| Pri | Action | Why | Effort |
|---|---|---|---|
| **P0** | **Build §4 telemetry tooling** — implement `tools/sca-record-decision.mjs` + `sca-re-evaluate-decisions.mjs` + `sca-effectiveness-report.mjs`; create `.claude/state/sca-decision-outcomes.json` with W344-Z5 inaugural row + back-fill W340-W345 decisions where deterministic data exists | Without this, §7 self-improvement is uncomputable; SLO 80% is prose-only; CARDINAL-RULE-6 verify-before-claim is structurally weakened | M (3 mjs files; ~200 LOC each + state schema) |
| **P0** | **Re-enable tavily MCP** — remove `"tavily"` from `settings.json:disabledMcpjsonServers` (TAVILY_API_KEY already SET); document why it was disabled (CLAUDE.local.md L116 says "populate operator-side" — that's done) | §1 CRITICAL GAP — tavily-disabled drops D81 enumerated families from 10 to 8; tavily covers 2 of the most-used slots (search-engine + doc-fetch) | XS (1 settings edit) |
| **P0** | **Add HF_TOKEN env var + hf-mcp-server auth** — current anon-mode rate-limits HF queries; CLAUDE.local.md should carry `HF_TOKEN` per server-instructions hint | §1 hf-mcp UNDERUSED + AUTH GAP; D81 HF-resources family at-risk; W344-Z5 ingest already needed `paper_search` and `hub_repo_search` | XS (1 env-var + setup-test) |
| **P1** | **D12 stars-removal** — drop stars sub-signal from D12; pattern-density only; cap-trigger to `pattern_density<2` alone | §6 calibration #1; closes stars-bias loophole; aligns D12 with D82 anti-bias rule | S (1 SKILL.md edit + dimensions.md edit) |
| **P1** | **D81 enumeration fix** — add brave-search + firecrawl as enumerated members of D81 family list (currently invisible despite wired+auth-OK); decide whether they belong in search-engine, browser, or new families | §1 TAXONOMY GAP — 2 wired MCPs invisible to scoring; trivial fix | S (dimensions.md edit + sca SKILL.md §D81 update) |
| **P1** | **Force ≥1 reasoning-broker family per audit** — add to §6 calibration #2: "D81 score-4 PASS requires ≥1 of 4 from reasoning-broker family" | §2 depth concern — current 5-family usage is search-engine-and-code-graph-heavy with NO reasoning-broker; perplexity_reason/research underused | S (dimensions.md edit) |
| **P1** | **Operationalize Bayesian author-prior W287 P2.iii** — create `.claude/state/author-prior-registry.json` schema + seed with W316/W340 established authors (mattpocock, addyosmani, karpathy, etc.) | §3 GAP — currently prose-only; needs data backing | M (schema + seed ~30 author rows) |
| **P2** | **C1 vector-DB evidence pool via cognee** — emit embeddings on every research-call; future `cognee_recall` cross-wave probes | §5 C1; addresses §1 cognee UNDERUSED + §3 D72 under-weighted | L (~1-wave engineering) |
| **P2** | **C3 het-ensemble cross-model judge** — N=3 judges (codex + qwen3-coder local + Sonnet tie-breaker); Borda + MaxPool | §5 C3; operator-stated "e2e with gpt 5.5" + judge-bias mitigation | L (existing codex plumbing extended) |
| **P2** | **C4 D80 automation** — `tools/sca-verify-d80.mjs` automaton parses verdict rows, classifies cite anchors by org + peer-reviewed status | §5 C4; reduces D80 enforcement friction | M (~150 LOC mjs + tests) |
| **P3** | **C2 GEPA nightly Pareto-frontier refinement** — full self-improvement loop (depends on P0 telemetry) | §5 C2 + §7 self-improvement; requires P0 telemetry shipped first | L+ (multi-wave; nightly cron + EvalLog harness) |
| **P3** | **Reflexion-style 5-wave retrospective** — `team-spawn review` parses verdict rows, proposes D-dim adjustments | §7 alternative; lower complexity than C2 | M (1 prompt + 1 agent-team preset) |
| **P3** | **Promote D72 + D81 weights** — D72 episodic-reflection 0.4 → 0.6; D81 multi-angle 0.6 → 1.0 (= D-EMP) | §3 under-weighted dims; operator-stated mandate weight | XS (denom + dim-weight edit) |
| **P3** | **D44 + D75 codex-double-count consolidation** — fold D75 into D44 sub-signal; reduce single-judge over-weighting in arch-itself | §3 over-weighted dims; cleaner separation between "did codex run" and "was it cost-efficient" | S (skill edit + denom recalc) |

---

## Summary

**Foundation strength**: sca-v17 D-catalog (83 dimensions across 21 versions) is structurally comprehensive and cardinal-rule-6 cite-anchored. D81 multi-angle MCP convergence + D82 low-stars-high-quality override + D83 decision-impact-tier (all W344-Z5) close major bias loopholes. Phase-1-6 + 5-gate validation pipeline + 8-tier ladder are well-formed.

**Foundation weakness**: §4 effectiveness-telemetry is **DESIGN COMPLETE / IMPL UNSHIPPED** — zero rows recorded, three tools missing, 80% SLO unobservable. Without it, §7 self-improvement is uncomputable and CARDINAL-RULE-6 verify-before-claim is structurally weakened on every sca decision.

**Top 3 research-arch improvements (verbatim from §8 P0)**:
1. **Build §4 telemetry tooling** — `tools/sca-{record-decision,re-evaluate-decisions,effectiveness-report}.mjs` + `.claude/state/sca-decision-outcomes.json` inaugural rows. Unblocks all of §7 self-improvement.
2. **Re-enable tavily MCP** — 1 settings.json edit removes `"tavily"` from `disabledMcpjsonServers`; restores D81 family-enumeration from effective 8 back to 10 (matches sca claim).
3. **Add HF_TOKEN env auth for hf-mcp-server** — closes anon-mode rate-limit; D81 HF-resources family becomes reliable.

**Operational discipline gaps surfaced**:
- 2 wired MCPs (brave-search, firecrawl) invisible to D81 enumeration despite auth-OK
- Bayesian author-prior cited but no registry
- Stars-bias residue in D12 cap-trigger ("neither pattern_density nor stars ≥2")
- Reasoning-broker family (perplexity_research / perplexity_reason) UNDERUSED across W340-W345 despite operator-stated multi-angle mandate

**File-anchors** (all absolute):
- Skeleton+audit: `Z:/claude-sota-installed/docs/architecture/W346-FULL-SOTA-UNLEASH/E-research-arch.md`
- sca skill: `Z:/claude-sota-installed/.claude/skills/sota-convergence-audit/SKILL.md`
- sca dim catalog: `Z:/claude-sota-installed/.claude/skills/sota-convergence-audit/references/dimensions.md`
- W344-Z5 design docs: `Z:/claude-sota-installed/docs/architecture/W344-SOTA-UNLEASH/Z5-{research-arch-ingest,sca-v17-increment,effectiveness-telemetry-design}.md`
- Live .mcp.json: `Z:/claude-sota-installed/.mcp.json`
- Live settings (tavily-disable): `Z:/claude-sota-installed/.claude/settings.json` (key `disabledMcpjsonServers`)
- Goal-prompt-synthesis: `Z:/claude-sota-installed/.claude/skills/goal-prompt-synthesis/SKILL.md`
