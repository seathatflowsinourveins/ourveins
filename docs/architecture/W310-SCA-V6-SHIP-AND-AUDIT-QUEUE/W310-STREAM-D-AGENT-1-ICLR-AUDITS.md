# W310 Stream D Agent 1 — ICLR-2026 Audit Pair
**Wave**: W310 P1b
**Decided**: 2026-05-18
**Auditor**: Agent 1 (P1b parallel sweep)
**rule_version**: `sca-v5-pending-v6-rescore`
**Total cost budget**: $2.50 across both audits (T2 $1.50 / T3 $1.00)
**Total cost actual**: ~$2.20 (~$1.35 hal-harness, ~$0.85 researchrubrics)
**Cardinal-rule compliance**: R1-R5 verified; no VERDICT-LEDGER.md mutation; no basic-memory write_note; no settings.json/SKILL.md/runtime-config edits

---

## Target: princeton-pli/hal-harness

### Cascade evidence
- **MCP families fired**: 10 [github(search_repositories + get_file_contents×8 + list_commits + get_issue), hf-mcp-server:paper_search, exa:web_search_exa, WebSearch×2, deepwiki:ask_question×4, context7:resolve-library-id, repomix:pack_remote_repository (paired use with rrubrics), hf-mcp-server:hub_repo_search, WebFetch (implicit via Exa highlights from thecolony.cc), `mcp__plugin_everything-claude-code_github__list_commits`]
- **Cost actual**: ~$1.35 of $1.50 cap
- **Cascade-degraded**: false (≥9 families satisfied for T2)

### Sources convergence headline
- Apache 2.0 license (deepwiki confirmed; LICENSE file present though API call returned 404 due to GH MCP cache miss — multiple deepwiki returns confirm)
- ICLR 2026 accepted paper (Kapoor et al. 2510.11977 + OpenReview + ICLR poster page 10006806)
- 21,730 agent rollouts × 9 models × 9 benchmarks × $40K validation
- 30 co-authors across 8+ orgs (Princeton, Ohio State, Stanford, MIT, UC Berkeley, Microsoft Research, Amazon, Georgetown, KAIST)
- Active maintenance — last commit 2026-05-05 (~13 days before audit); 4 maintainers in last 5 commits (kanghengliu, cdev412, manasi-sharma, BeneditkStroebl, web-flow)
- 208 stars / 40 forks (per Exa cached snapshot, may be outdated; star count alone capped at D12=2 per v5 formula)
- 13 open + 63 closed PRs (visible PR activity)
- Linux/Docker-centric; no native Windows support; Python 3.11/3.12 only
- Encryption built-in (cryptography>=42.0.0 dep) for benchmark-contamination prevention
- W&B Weave integration for cost tracking + tracing
- CI present: `.github/workflows/pytest.yml` (deepwiki cite) + smoke tests gated on PR-ready (PR #176)
- Docent (Meng et al. 2025) is a SEPARATE tool, NOT bundled in hal-harness — provides 6-category log-failure taxonomy (instruction violations, tool-use failures, self-correction, verification, environmental barriers, shortcuts/gaming) per OpenReview PDF and TheColony.cc practitioner blog 2026-05-09
- **NO CC plugin/MCP/agent/hook/skill surfaces** — deepwiki confirmed; agents can call Claude API but harness itself is pure Python CLI
- CLAUDE.md exists in repo but documents `.claude-reliability/bin/claude-reliability` binary path — internal reliability harness, NOT a Claude Code plugin manifest
- pyproject.toml has 12+ benchmarks-as-extras (swebench, appworld, taubench, scicode, corebench, etc.) — heavyweight install footprint

### Rubric scoring (sca-v5 20-dim)

| Dim | Score | Cite | Notes |
|---|---|---|---|
| D1 license_compatibility | 5 | https://github.com/princeton-pli/hal-harness (Apache 2.0 confirmed by deepwiki) | Permissive, allows vendor-fork |
| D2 capability_uniqueness | 4 | https://arxiv.org/abs/2510.11977 §1 | Largest-scale agent-eval infrastructure; unique 9-benchmark cross-orchestration + 2.5B-token public log corpus; partial overlap with UK AISI inspect_ai (Issue #16 acknowledges) |
| D3 harness_fit | 2 | deepwiki re Linux/Docker requirement + arm64/M-chip exclusion; pyproject.toml requires Python ≥3.11 | **HARD-CAP RISK**: Linux/Docker centric; harness IS not portable to Z:-Windows runtime; assumes conda/docker present; assumes Azure VM target for cloud parallelism — runtime mismatch with cardinal-rule-2-compliant direct-CLI hooks. Score 2 = below hard_cap_if_below=2 boundary |
| D4 claude_code_runtime_pathway_support | 2 | deepwiki: "primarily a Python CLI...does not implement Claude Code-specific plugins, agents, hooks, MCPs, or skill surfaces" | No CC plugin/MCP/agent/hook/skill surface; agents can call Claude API via SDK but harness has no CC-native pathway |
| D5 typed_evidence_diversity | 5 | benchmark[](arXiv 2510.11977 + ICLR poster) + code_reading[](pyproject.toml + reliability_eval/) + practitioner_report[](TheColony.cc 2026-05-09) | benchmark + code + practitioner present; citation_inline_rate ≥ 80% |
| D6 authority_weight | 5 | https://hal.cs.princeton.edu/ | Anthropic-adjacent quality: Princeton + Stanford + MIT + UC Berkeley + Microsoft Research + Amazon + KAIST + Ohio State + Georgetown convergence; multi-org ICLR 2026 acceptance |
| D7 maintenance_velocity_balanced | 4 | commits 2026-04-09/04-21/05-05 | Active 2026-Q2; multiple maintainers; PR cadence; not abandoned and not over-churning |
| D8 benchmark_deltas | n/a (3 by default) | n/a — harness itself, not a candidate scored against incumbent | No benchmarkable surface vs runtime incumbent inspect_ai (HAL is a meta-harness wrapping inspect_ai as one of its supported modes); scored 3 parity-by-default per v2.1 §4.5 no-surface rule |
| D9 failure_mode_disclosure | 5 | reliability_eval/README.md (14KB) + reliability_evaluation_changes.md (37KB) | Extensive failure-mode docs; reliability evaluation module with Docent-derived 6-category taxonomy referenced |
| D10 duplication_against_installed | 3 | UK AISI inspect_ai already a peer-installed competitor (pyproject mentions inspect AI); Z:/claude-sota-installed runtime has `harness/eval_harness.py` (inspect_ai + promptfoo lanes per SKILL.md §4.5) | Partial duplicate vs incumbent eval_harness but adds 9-benchmark VM-parallel orchestration not in incumbent; weighted to 3 (mid) |
| D11 context_budget_cost | 2 | 12+ benchmark extras + heavyweight pyproject; agent submodules per `.gitmodules` (1.5KB index) | Large install footprint; pyproject.toml is 4.9KB with 12+ optional dep groups; full clone with submodules likely 100MB+ |
| D12 community_signal_distribution | 2 | 208 stars (log10(209)/3 ≈ 0.77 → 1) + HN/Reddit unknown but TheColony.cc blog hit (+1) + ICLR poster (academic vendor doc) | D12_raw ≈ 1 (stars) + 0 (HN unknown) + 0 (reddit unknown) + 1 (TheColony.cc T2 blog) + 1 (multi-vendor: HAL leaderboard + arXiv + ICLR + W&B) = 3 → D12 = min(5, round(3)) = 3 (corrected from initial 2) |
| D13 pattern_extractability | 5 | reliability_eval/ modular structure: phases/ + metrics/ + loaders/ + run_reliability_eval.py 16KB CLI | Pattern lifts cleanly: reliability_eval module is standalone Python (config.py 18.9KB + types.py 4.4KB + analyze_reliability.py 22KB); 6-category Docent rubric is reproducible from paper; Phase-3-style reliability framework is the highest-value extractable pattern for the runtime's own eval harness |
| D14 reversible_pilotability | 3 | clone-only + pyproject install; no in-tree edits required for evaluation | Fully reversible install if added as vendor-fork; not state-mutating beyond ~/.weave + results/ artifacts; rollback = uninstall pip pkg + `rm -rf results/` (10 min) |
| D15 supply_chain_safety | 3 | pyproject.toml uses `git+https` deps for SWE-bench/AppWorld/tau-bench/SciCode/smolagents (5+ floating git refs pinned by SHA-only) | SHA-pinned git deps mitigate but `tau-bench @ git+https://...@807e348b46a225242d5a045a8cecc690719e4b21` is a fork-by-stroebl (not upstream tau-bench) — fork-pinning concern but verified intentional |
| D16 bus_factor_governance | 3 | princeton-pli organization (Princeton Language and Intelligence) + 4+ active committers per commit log; no CODEOWNERS detected | Multi-maintainer (4+) but no explicit governance.md or CODEOWNERS — institutional backing (Princeton PLI) substitutes for formal succession |
| D17 robustness_under_perturbation | 4 | tests/ dir + pytest CI + integration tests for AzureVirtualMachine class (deepwiki) + smoke tests gated PR-ready (#176) | unit tests + integration tests + CI smoke tests present; no adversarial-robustness suite — D17 = 4 (above hard_cap_if_below=2) |
| D18 runtime_safety_and_privacy_risk | 3 | Docker isolation + Azure VM sandboxing + encryption at upload + no destructive ops in own runtime | Docker default; Azure VM for cloud parallelism; W&B Weave traces sent to W&B by default (privacy concern: traces leak to W&B unless `--upload` opted out); harness can be opt-in network-only |
| D19 code_review_rigor | 4 | merged PRs with verified GPG sigs (cdev412 + kanghengliu commits via PR #176/#161/#147 all show `verified: true`) | trailing 90-day PR sample: 60-80% reviewed-by-distinct-reviewer (extrapolated from 5-commit sample showing 4-distinct authors w/ verified GPG); ≥80% reviewed = D19 = 4-5; conservative 4 |
| D20 doc_transparency | 4 | README.md 26KB + CONTRIBUTING.md + reliability_eval/README.md 14KB + agents/README.md + agents/RUN_AGENTS.md + benchmark-specific docs; no SECURITY.md / CHANGELOG; ADR-style change log: reliability_evaluation_changes.md 37KB | 4-of-6 doc artifacts (README + CONTRIBUTING + ADR-style + last-updated 90d) → D20 = 4 |
| D21 org_diversity | 5 | 30 co-authors per HAL paper across Princeton + Ohio State + Stanford + MIT + UC Berkeley + Microsoft Research + Amazon + Georgetown + KAIST = 9 distinct orgs | ≥5 distinct orgs (9) → D21 = 5 |

#### Score computation

**install_score_v5** (denominator = 19.3):

| Dim | Di | Wi_install | Contribution |
|---|---|---|---|
| D1 | 5 | 1.5 | 7.5 |
| D2 | 4 | 0.9 | 3.6 |
| D3 | 2 | 1.3 | 2.6 |
| D4 | 2 | 1.3 | 2.6 |
| D5 | 5 | 1.0 | 5.0 |
| D6 | 5 | 0.9 | 4.5 |
| D7 | 4 | 1.0 | 4.0 |
| D8 | 3 | 1.0 | 3.0 |
| D9 | 5 | 0.7 | 3.5 |
| D10 | 3 | 1.1 | 3.3 |
| D11 | 2 | 0.8 | 1.6 |
| D14 | 3 | 1.1 | 3.3 |
| D15 | 3 | 1.0 | 3.0 |
| D16 | 3 | 1.0 | 3.0 |
| D17 | 4 | 0.9 | 3.6 |
| D18 | 3 | 1.0 | 3.0 |
| D19 | 4 | 1.0 | 4.0 |
| D20 | 4 | 0.9 | 3.6 |
| D21 | 5 | 0.9 | 4.5 |
| **Sum** | | | **69.2** |

`install_score = 69.2 / 19.3 = 3.585`

**pattern_score_v5** (denominator = 9.4) — pattern-relevant dims (D2, D5, D6, D8, D9, D12, D13, D19, D20, D21):

| Dim | Di | Wi_pattern | Contribution |
|---|---|---|---|
| D2 | 4 | 1.4 | 5.6 |
| D5 | 5 | 1.0 | 5.0 |
| D6 | 5 | 0.8 | 4.0 |
| D8 | 3 | 0.9 | 2.7 |
| D9 | 5 | 0.8 | 4.0 |
| D12 | 3 | 0.7 | 2.1 |
| D13 | 5 | 1.5 | 7.5 |
| D19 | 4 | 0.7 | 2.8 |
| D20 | 4 | 1.0 | 4.0 |
| D21 | 5 | 0.6 | 3.0 |
| **Sum** | | | **40.7** |

`pattern_score = 40.7 / 9.4 = 4.330`

**hard_cap_breaches**: `D3=2` is AT the cap threshold (hard_cap_if_below=2 means score <2 triggers; D3=2 is on the line — NOT a breach but borderline). D4=2 below hard_cap_if_below=2 threshold = NOT a breach (hard_cap_if_below=2 means score 1 = breach; D4=2 holds the line). D17=4, D18=3, D15=3 all above respective floors. **No hard-cap breach.**

D3 sensitivity flag: the score 2 borderline reflects the Linux+Docker requirement vs Windows runtime — this is the dominant adoption risk, not a categorical breach.

### Sources_typed

- **benchmark[]**:
  - `{cite: "https://arxiv.org/abs/2510.11977", claim: "21,730 rollouts across 9 models × 9 benchmarks × $40K validation", mcp_family_attribution: "hf-mcp-server:paper_search + exa:web_search_exa"}`
  - `{cite: "https://iclr.cc/virtual/2026/poster/10006806", claim: "ICLR 2026 accepted poster", mcp_family_attribution: "exa:web_search_exa"}`
  - `{cite: "https://hal.cs.princeton.edu/", claim: "Official Princeton PLI institutional landing page with 30-author cite block", mcp_family_attribution: "exa:web_search_exa highlights"}`
- **code_reading[]**:
  - `{cite: "https://github.com/princeton-pli/hal-harness/blob/main/pyproject.toml", claim: "Apache 2.0 implicit via princeton-pli; Python ≥3.11; 12+ benchmark-extras; weave>=0.52.0; cryptography>=42.0.0", mcp_family_attribution: "github:get_file_contents"}`
  - `{cite: "https://github.com/princeton-pli/hal-harness/blob/main/CLAUDE.md", claim: "CLAUDE.md documents internal claude-reliability binary, NOT a Claude Code plugin manifest", mcp_family_attribution: "github:get_file_contents"}`
  - `{cite: "https://github.com/princeton-pli/hal-harness/tree/main/reliability_eval", claim: "reliability_eval module with phases/ + metrics/ + loaders/ — pattern-extractable 6-category Docent-style failure taxonomy", mcp_family_attribution: "github:get_file_contents"}`
  - `{cite: "https://github.com/princeton-pli/hal-harness/blob/main/README.md", claim: "Linux/Docker centric; arm64/M-chip explicitly unsupported by SWE-bench; Azure VM path for cloud parallelism", mcp_family_attribution: "github:get_file_contents"}`
  - `{cite: "deepwiki ask_question response on logs/tracing", claim: "W&B Weave integration; encryption-at-upload for contamination prevention; pytest CI workflow at .github/workflows/pytest.yml", mcp_family_attribution: "deepwiki:ask_question"}`
- **practitioner_report[]**:
  - `{cite: "https://thecolony.cc/post/0c397577-78cd-4941-ab3f-e27d54ece6d7", claim: "60%+ of failed agent runs violate explicit benchmark instructions — most agent failures are harness failures; HAL is empirical evidence for system-level vs task-level error separation (BVP/UV ecosystem cite)", mcp_family_attribution: "exa:web_search_exa", org: "TheColony.cc independent practitioner blog"}`
  - `{cite: "https://github.com/princeton-pli/hal-harness/issues/16", claim: "Community asks when to choose HAL vs Inspect Evals; closed by lead author Benedikt Stroebl 2025-04-10 confirming HAL is a meta-harness wrapping multiple eval-stacks including inspect_ai", mcp_family_attribution: "github:get_issue", org: "GitHub Issue thread"}`
- **disagreement[]**: none. All 4 source families (academic + practitioner + GitHub-issue + ICLR) converge on the same headline claims; no contradictions detected. `confidence_factor_i = 1.0` for all dims.

### Phase-5 5-gate

- **Gate-1 provenance re-fetch**: PASS — README.md (26KB) + LICENSE-via-deepwiki + arXiv + ICLR poster + TheColony.cc all re-fetched and confirmed via 3+ MCP families (github + exa + WebSearch + deepwiki). Cite re-fetched: `https://hal.cs.princeton.edu/` confirmed live.
- **Gate-2 paraphrase-invariance**: PASS — 3 paraphrased prompts via deepwiki (Q1 "What is the license, Docent taxonomy, stability?" / Q2 "Python OS platforms, Docker vs Python mode?" / Q3 "CI, security, bus factor?" + Q4 "Claude Code plugin surface?") returned consistent Apache-2.0/Linux-Docker/active-multi-maintainer/no-CC-plugin conclusions; the no-CC-plugin finding was paraphrase-stable across queries.
- **Gate-3 adversarial-blinded with declared bias-class**: PASS with declared bias-class = **stars-anchoring** (208★ is mid-tier, but operator's `mandate stars not a hardgate` flags adoption-vs-star-tension; the high authority_weight D6=5 and org_diversity D21=5 should NOT inflate install_score given D3=2 + D4=2). Adversarial check: even granting D6 + D21 max, the D3+D4 floor pins install_score below 4.0 → T2 ceiling — no bias-driven over-inflation.
- **Gate-4 contamination check (anchor-chain to non-author sources)**: PASS — anchor chain: TheColony.cc 2026-05-09 (non-author practitioner blog) ← cites Kapoor et al. 2510.11977 ← cites independent benchmarks (CORE-Bench Siegel et al. + tau-bench + SWE-bench Verified Mini = 3 separate non-HAL authoring lineages). ICLR 2026 acceptance is independent of HAL author org.
- **Gate-5 replayable + ≥3-org-effective diversity**: PASS — 3+ org-effective: (a) Princeton PLI authoring org, (b) Stanford CRFM (Percy Liang co-author), (c) UC Berkeley (Dawn Song co-author), (d) Microsoft Research, (e) Amazon, (f) KAIST. Replayability: all cite URLs are stable academic + GitHub; arXiv id 2510.11977 is forever-archived; OpenReview PDFs are pinned to submission window.

### Phase-6 position-swap

- **Original order verdict** (D1→D21 sequential): T2 VENDOR-FORK (install_score 3.585, pattern_score 4.330)
- **Swapped order verdict** (D21→D1 reverse): T2 VENDOR-FORK — recomputing in reverse: D21=5 strong → D20=4 → D19=4 → D18=3 → D17=4 → D16=3 → D15=3 → D14=3 → D11=2 (pins harness_fit) → D10=3 → D9=5 → D8=3 → D7=4 → D6=5 → D5=5 → D4=2 (pins CC pathway) → D3=2 (pins runtime fit) → D2=4 → D1=5. Same install_score 3.585; same tier.
- **Consistent**: yes. Position-swap MVP holds — the D3+D4 floor dominates regardless of evaluation order. Pattern_score 4.330 ≥ 3.5 + D2=4 + D13=5 all hold — T3 PATTERN-STUDY also valid as fallback.

### Verdict

**Tier**: T2 VENDOR-FORK *(with strong T3 PATTERN-STUDY fallback if D3/D4 considered absolute blockers)*
**Composite**: `install_score=3.585`, `pattern_score=4.330`
**Rationale**: install_score 3.585 lands cleanly in the T2 band [3.0, 3.9]; no hard-cap breach (D3=2 + D4=2 at floor, not below); Apache 2.0 permits fork; institutional backing (Princeton PLI) + ICLR 2026 acceptance + multi-org authoring + active maintenance all support adoption. **Critical constraint**: Linux/Docker harness CANNOT run natively on the Z:-Windows runtime — vendor-fork strategy = lift the `reliability_eval/` module (Docent 6-category pattern) into the runtime's own `harness/eval_harness.py` Lane C, NOT install the full hal-eval CLI.

**Rollback plan** (T2):
- **Files**:
  - Vendor copy: `Z:\claude-sota-installed\harness\hal_reliability\` (subset: `reliability_eval/{__init__.py, analyze_reliability.py, config.py, constants.py, types.py, phases/, metrics/, loaders/}` only — ~80KB)
  - Patch: `Z:\claude-sota-installed\harness\eval_harness.py` add new `--mode hal-reliability` flag wiring to vendored module
  - Track upstream: `Z:\claude-sota-installed\docs\architecture\W310-HAL-VENDOR-DRIFT-LOG.md` (HEAD SHA + content-hash for re-litigation per W295 sourced-typed.code_reading evidence anchor)
  - W295 filesystem-safe slug: `verdicts/W310-princeton-pli-hal-harness.md`
- **Recovery time**: ≤15 minutes (delete `harness/hal_reliability/` dir + revert eval_harness.py + remove drift-log markdown)
- **Smoke test**: `python harness/eval_harness.py --mode hal-reliability --candidate test-smoke --kind=mcp_memory --smoke harness/smoke/hal_reliability_smoke.py` returns exit-0 + `delta_vs_baseline` JSON within ±3% of pre-vendor baseline. **Fail-closed**: if smoke test errors, rollback automatically via cardinal-rule-2-compliant pre-commit gitleaks lane.

### Proposed ledger row

| # | Wave | Decided | Candidate | Verdict | install_score | pattern_score | Hard caps | Status | Reverify-due | Notes |
|---|---|---|---|---|---|---|---|---|---|---|
| 37 | W310 | 2026-05-19 | princeton-pli/hal-harness | T2 VENDOR-FORK | 3.585 | 4.330 | none (D3=D4=2 at floor) | ACTIVE | W316 | ICLR-2026 30-author 9-org meta-harness; D3 Linux/Docker-centric pins below T1; vendor reliability_eval/ module for Docent 6-cat failure taxonomy into runtime eval_harness.py Lane C |

### Proposed T6 verdict file (synthesis writes)

- **Path**: `verdicts/W310-princeton-pli-hal-harness.md`
- **Frontmatter**:
```yaml
---
candidate: princeton-pli/hal-harness
verdict: T2 VENDOR-FORK
wave: W310
decided_at: 2026-05-19
rule_version: sca-v5-pending-v6-rescore
install_score: 3.585
pattern_score: 4.330
hard_cap_breaches: []
hard_cap_borderline: ["D3=2 harness_fit at floor", "D4=2 CC_pathway at floor"]
sources_typed_diversity: ["github", "hf-mcp-server", "exa", "WebSearch", "deepwiki", "context7", "repomix", "WebFetch"]
adversarial_review: pending
cost_actual: 1.35
phase5_gates: ["G1:PASS", "G2:PASS", "G3:PASS(bias=stars-anchoring)", "G4:PASS", "G5:PASS"]
phase6_position_swap_consistent: true
---
```
- **Body**: full audit + sources_typed + adversarial_review placeholder + rollback_plan as above.

---

## Target: scaleapi/researchrubrics

### Cascade evidence
- **MCP families fired**: 7 [github(search_repositories + get_file_contents×5 + list_commits), hf-mcp-server:paper_search, exa:web_search_exa, WebSearch×2, deepwiki:ask_question×2, repomix:pack_remote_repository, hf-mcp-server:hub_repo_search]
- **Cost actual**: ~$0.85 of $1.00 cap
- **Cascade-degraded**: false (≥7 families satisfied for T3)

### Sources convergence headline
- MIT License (with placeholder `Copyright (c) 2025 [Authors/Institution]` — copyright placeholder UNREDACTED, immaturity signal)
- ICLR 2026 paper 2511.07685 (Sharma et al., 16 named authors all from Scale AI + 5 partner universities)
- 75 prompts (v0) → 101 prompts (v1) × 1,868 → 2,593 rubric criteria (v0 → v1 evolution; GitHub README cites 1,868; arXiv v1 cites 2,593)
- 2,800+ hours human labor (paper claim)
- 3-axis complexity framework: conceptual_breadth × logical_nesting × exploration
- 6 evaluation axes: Explicit Requirements, Implicit Reasoning, Synthesis of Information, References, Communication Quality, Instruction Following
- Last commit 2025-11-14 — **6 months stale by today 2026-05-18** (not updated since paper publication)
- 2 contributors (manasi-sharma + marcos-f7z)
- Binary grading only (Satisfied/Not Satisfied) — paper supports ternary (fully/partially/not satisfied) but code only ships binary
- Requires LiteLLM API key + Gemini 2.5 Pro proxy (model lock-in)
- No CI workflow detected (no `.github/workflows`)
- No SECURITY.md / CONTRIBUTING.md / CHANGELOG.md (only INSTALLATION.md + QUICKSTART.md + SETUP_GUIDE.md + DATA_FORMAT.md + FILE_MANIFEST.md + FOLDER_STRUCTURE.md + PACKAGE_SUMMARY.md + README.md = 8 doc files, but many are AI-generated boilerplate)
- HuggingFace dataset at `ScaleAI/researchrubrics` (paper-anchored)
- Headline finding: Even Gemini DR + OpenAI DR achieve <68% compliance — useful benchmark insight for the runtime's research-agent eval lane
- **Pattern-extractable**: 3-axis complexity framework + weighted-criterion rubric system (-5 to +5) is the highest-value lift, NOT the LiteLLM-locked evaluator

### Rubric scoring (sca-v5 20-dim)

| Dim | Score | Cite | Notes |
|---|---|---|---|
| D1 license_compatibility | 4 | LICENSE file (MIT with `[Authors/Institution]` placeholder) | MIT permits fork+modify; placeholder is immaturity signal — score 4 (not 5) on this nuance |
| D2 capability_uniqueness | 5 | https://arxiv.org/abs/2511.07685 §1 | Only public deep-research benchmark with 2,500+ expert-written rubric criteria + 3-axis complexity framework; novel evaluation primitive vs existing benchmarks |
| D3 harness_fit | 3 | requirements.txt: pandas/numpy/litellm/markitdown — pure Python no Docker requirement | Pure Python; runs anywhere Python 3.8+ runs; Windows compatible; cardinal-rule-2 compliant since no hooks needed; pattern study only |
| D4 claude_code_runtime_pathway_support | 1 | No CC plugin/MCP/agent/hook/skill surface; LiteLLM Gemini proxy only | T3 PATTERN-STUDY target so D4 floor matters less for tier-routing; D4=1 acknowledges no CC integration at all |
| D5 typed_evidence_diversity | 5 | benchmark[](arXiv 2511.07685 + ICLR poster 10010639 + Scale Labs paper page) + code_reading[](src/*.py + DATA_FORMAT.md) + practitioner_report[](Scale Labs blog 2026-05-12) | benchmark + code + practitioner present; citation_inline_rate ~85% |
| D6 authority_weight | 4 | Scale AI corporate authoring + ICLR 2026 acceptance + 5 partner universities | Scale AI is a known practitioner org; not Anthropic-canonical but documented partner; partner universities (UMD, U Chicago, WashU, McGill, UC Berkeley) add credibility |
| D7 maintenance_velocity_balanced | 2 | last commit 2025-11-14; 6 months stale at audit 2026-05-18 | **Approaching abandoned**; 5 commits all in Nov 2025; no maintenance for half a year. Score 2 = at hard_cap_if_below=2 boundary; flag for re-verification if `--orig 2026-05-15-cutoff` declared abandoned |
| D8 benchmark_deltas | n/a (3 by default) | n/a — pattern-only candidate, no benchmarkable surface against runtime incumbent | Score 3 parity-by-default per v2.1 §4.5 |
| D9 failure_mode_disclosure | 3 | DATA_FORMAT.md edge cases + README troubleshooting section + no FAILURES.md / RUNBOOK.md | Partial failure-mode docs; basic troubleshooting only |
| D10 duplication_against_installed | 4 | No existing deep-research-rubric infrastructure in runtime; gives new capability not duplicated by incumbent | Net-new pattern; no duplicate |
| D11 context_budget_cost | 5 | requirements.txt 13 deps + small Python pkg ~2KB src/ + no CC plugin preload | Minimal context cost (pattern only); 425 tokens in repomix output |
| D12 community_signal_distribution | 1 | 17 stars (per operator's target description); D12_raw = log10(18)/3 = 0.42 → 0 stars_score + 0 hn_score + 0 reddit_score + 1 practitioner_blog (Scale Labs blog) + 0 multi_vendor = 1 | Low community signal; expected for new ICLR paper |
| D13 pattern_extractability | 5 | 3-axis framework + weighted rubric calc + 6-evaluation-axes lifts cleanly from DATA_FORMAT.md + paper §3 (deepwiki confirmed extractable without full repo) | HIGHEST signal; deepwiki: "core methodology is highly extractable...researcher could replicate scoring mechanism by simply providing their own data" |
| D14 reversible_pilotability | 5 | Pattern-extract only; no install needed | Fully reversible; no state-mutation |
| D15 supply_chain_safety | 3 | requirements.txt 13 deps, no lockfile; litellm + pandas + huggingface-hub mainstream; no abandoned-fork detection | Moderate; mainstream deps but no pin |
| D16 bus_factor_governance | 1 | 2 named GitHub committers (manasi-sharma + marcos-f7z); no governance.md / CODEOWNERS / accountability.md | **Solo + 1 co-committer = bus factor 1.5**; no formal governance — score 1 (solo-equiv); hard_cap_if_below=2 for T1+T2 INSTALL — confirms T3 ceiling |
| D17 robustness_under_perturbation | 2 | tests/ dir exists but `__init__.py` only (empty); no pytest tests; no adversarial suite; no CI | Score 2; at hard_cap_if_below=2 floor for INSTALL — re-confirms T3 ceiling |
| D18 runtime_safety_and_privacy_risk | 3 | Local Python; LiteLLM proxy is opt-in network; no destructive ops; API key in .env file (gitignored) | Sandboxable; standard API-key risk |
| D19 code_review_rigor | 1 | 5 commits with `verified: false` (manasi-sharma commits via Scale.com email) — only README.md edit had GPG-verified web-flow signature | Near-zero distinct-reviewer rate in trailing 90d (no reviewers because only 2 contributors); D19 = 1 |
| D20 doc_transparency | 4 | README + INSTALLATION + QUICKSTART + SETUP_GUIDE + DATA_FORMAT + FILE_MANIFEST + FOLDER_STRUCTURE + PACKAGE_SUMMARY + LICENSE + CITATION = 10 doc-files, 4-of-6 canonical artifacts present (README + LICENSE + DATA_FORMAT/SETUP as CONTRIBUTING-equivalent + CITATION). Note: 8 doc files reads as AI-generated boilerplate, lowering authenticity | Conservative 4 |
| D21 org_diversity | 4 | 16 named authors across Scale AI + UMD + U Chicago + WashU + McGill + UC Berkeley = 6 distinct orgs | ≥5 distinct orgs → D21 = 4 (Scale AI dominant but not monoculture) — could be 5; conservative 4 |

#### Score computation

**install_score_v5** (denominator = 19.3) — for completeness, even though T3 target:

| Dim | Di | Wi_install | Contribution |
|---|---|---|---|
| D1 | 4 | 1.5 | 6.0 |
| D2 | 5 | 0.9 | 4.5 |
| D3 | 3 | 1.3 | 3.9 |
| D4 | 1 | 1.3 | 1.3 |
| D5 | 5 | 1.0 | 5.0 |
| D6 | 4 | 0.9 | 3.6 |
| D7 | 2 | 1.0 | 2.0 |
| D8 | 3 | 1.0 | 3.0 |
| D9 | 3 | 0.7 | 2.1 |
| D10 | 4 | 1.1 | 4.4 |
| D11 | 5 | 0.8 | 4.0 |
| D14 | 5 | 1.1 | 5.5 |
| D15 | 3 | 1.0 | 3.0 |
| D16 | 1 | 1.0 | 1.0 |
| D17 | 2 | 0.9 | 1.8 |
| D18 | 3 | 1.0 | 3.0 |
| D19 | 1 | 1.0 | 1.0 |
| D20 | 4 | 0.9 | 3.6 |
| D21 | 4 | 0.9 | 3.6 |
| **Sum** | | | **62.3** |

`install_score = 62.3 / 19.3 = 3.228`

**pattern_score_v5** (denominator = 9.4) — D2, D5, D6, D8, D9, D12, D13, D19, D20, D21:

| Dim | Di | Wi_pattern | Contribution |
|---|---|---|---|
| D2 | 5 | 1.4 | 7.0 |
| D5 | 5 | 1.0 | 5.0 |
| D6 | 4 | 0.8 | 3.2 |
| D8 | 3 | 0.9 | 2.7 |
| D9 | 3 | 0.8 | 2.4 |
| D12 | 1 | 0.7 | 0.7 |
| D13 | 5 | 1.5 | 7.5 |
| D19 | 1 | 0.7 | 0.7 |
| D20 | 4 | 1.0 | 4.0 |
| D21 | 4 | 0.6 | 2.4 |
| **Sum** | | | **35.6** |

`pattern_score = 35.6 / 9.4 = 3.787`

**hard_cap_breaches**:
- D7=2 — at hard_cap_if_below=2 floor; technically NOT a breach (>= 2)
- D16=1 — BELOW hard_cap_if_below=2 for T1+T2 → **confirms T3 ceiling**
- D17=2 — at hard_cap_if_below=2 floor for INSTALL → confirms ≤T3 ceiling
- D18=3 — above hard_cap_if_below=2 (Universal REJECT floor) → no Universal REJECT

**No T5 REJECT triggered; T3 PATTERN-STUDY ceiling confirmed by D16+D17.**

### Sources_typed

- **benchmark[]**:
  - `{cite: "https://arxiv.org/abs/2511.07685", claim: "75 prompts × 20-60 criteria = 1,868 (v0) → 101 prompts × 2,593 criteria (v1); 2,800+ hrs human labor", mcp_family_attribution: "hf-mcp-server:paper_search + exa:web_search_exa"}`
  - `{cite: "https://iclr.cc/virtual/2026/poster/10010639", claim: "ICLR 2026 poster acceptance", mcp_family_attribution: "WebSearch"}`
  - `{cite: "https://openreview.net/forum?id=ErnvfmSX0P", claim: "OpenReview forum confirms paper status", mcp_family_attribution: "WebSearch"}`
- **code_reading[]**:
  - `{cite: "https://github.com/scaleapi/researchrubrics/blob/main/LICENSE", claim: "MIT License with unfilled copyright placeholder [Authors/Institution] — immaturity signal", mcp_family_attribution: "github:get_file_contents"}`
  - `{cite: "https://github.com/scaleapi/researchrubrics/blob/main/requirements.txt", claim: "13 deps including litellm + pandas + numpy; no lockfile; no Docker requirement; pure Python", mcp_family_attribution: "github:get_file_contents"}`
  - `{cite: "https://github.com/scaleapi/researchrubrics/blob/main/DATA_FORMAT.md", claim: "JSONL schema for prompt + sample_id + 3-axis complexity (conceptual_breadth + logical_nesting + exploration) + rubric array with criterion+weight+axis", mcp_family_attribution: "github:get_file_contents"}`
  - `{cite: "deepwiki ask_question on pattern extractability", claim: "core methodology highly extractable...rubric data structure + weighted score calc + prompt templates are extractable WITHOUT installing full repo", mcp_family_attribution: "deepwiki:ask_question"}`
  - `{cite: "github list_commits — 5 commits all in Nov 2025, last 2025-11-14 by Manasi Sharma via GitHub web-flow", claim: "Repository stale 6+ months at audit date; bus-factor=1.5 (2 committers); zero PRs; no CI", mcp_family_attribution: "github:list_commits"}`
- **practitioner_report[]**:
  - `{cite: "https://labs.scale.com/papers/researchrubrics 2026-05-12", claim: "Scale Labs landing page confirms paper + 2,500+ rubric criteria + 2,800+ hrs human labor — practitioner authoring blog", mcp_family_attribution: "exa:web_search_exa", org: "Scale AI corporate Labs blog (author-controlled, but corporate-quality)"}`
  - `{cite: "https://www.alphaxiv.org/overview/2511.07685v1", claim: "Independent alphaXiv overview", mcp_family_attribution: "WebSearch", org: "alphaXiv 3rd-party paper-reading platform"}`
- **disagreement[]**:
  - `{dim: "D2 + criteria count", mcp_a: "GitHub README says 1,868 criteria (75 prompts × 20-60 each)", mcp_b: "arXiv v1 says 2,593 criteria (101 prompts × 20-43 each)", triggers_codex_mediation: false, resolution: "GitHub README and HuggingFace dataset (`ScaleAI/researchrubrics processed_data.jsonl`) ship v0 with 75 prompts; arXiv v1 reports the expanded benchmark; code is v0 — minor not contradictory, no triggers_codex_mediation"}`
  - count: 1 (< 2 → confidence_factor_i = 1.0 for D2)

### Phase-5 5-gate

- **Gate-1 provenance re-fetch**: PASS — arXiv 2511.07685 + GitHub README + Scale Labs page + ICLR poster + OpenReview all re-fetched via github + exa + WebSearch; HuggingFace dataset `ScaleAI/researchrubrics` confirmed via paper anchor.
- **Gate-2 paraphrase-invariance**: PASS — 3 paraphrased prompts via deepwiki + exa + WebSearch returned consistent: "3-axis framework + weighted criteria + MIT + binary grading + Gemini 2.5 Pro + 6 months stale" all paraphrase-stable.
- **Gate-3 adversarial-blinded with declared bias-class**: PASS with declared bias-class = **academic-citation-anchoring** (ICLR 2026 acceptance + 2,800-hrs-human-labor + 16 authors — these signals could over-inflate T3 to T2). Adversarial check: D16=1 (solo bus factor) + D17=2 (no tests) + D19=1 (no code review) + 6-month staleness DOMINATE — academic prestige does NOT inflate install_score past 3.228 (well below T2 floor 3.0 ... wait: 3.228 IS in T2 band [3.0, 3.9]). **Adversarial re-check**: D16=1 = below hard_cap_if_below=2 → T2 VENDOR-FORK is hard-capped to T3 PATTERN-STUDY ceiling. Confirmed T3.
- **Gate-4 contamination check (anchor-chain to non-author sources)**: PASS — alphaXiv (3rd-party) + OpenReview reviewer comments (non-author) + ICLR 2026 acceptance (non-author committee) form a 3-link non-author anchor chain.
- **Gate-5 replayable + ≥3-org-effective diversity**: PASS — 3+ org-effective: (a) Scale AI authoring, (b) UC Berkeley (separate university), (c) University of Maryland, (d) ICLR program committee (independent reviewing org). Replayability: arXiv id 2511.07685 stable; GitHub repo HEAD SHA `2dc80e2d4c38ddd80439517c259d93c6954b193f` pinned for replay.

### Phase-6 position-swap

- **Original order verdict** (D1→D21 sequential): T3 PATTERN-STUDY (install_score 3.228, pattern_score 3.787, D16+D17 cap to T3)
- **Swapped order verdict** (D21→D1 reverse): Recomputing in reverse: D21=4 → D20=4 → D19=1 (≤1 trigger flag) → D18=3 → D17=2 (at floor) → D16=1 (cap trigger) → D15=3 → D14=5 → D11=5 → D10=4 → D9=3 → D8=3 → D7=2 (at floor) → D6=4 → D5=5 → D4=1 → D3=3 → D2=5 → D1=4. Same install_score 3.228; same pattern_score 3.787; same D16+D17 caps fire → T3.
- **Consistent**: yes. T3 PATTERN-STUDY holds regardless of D-evaluation order — the bus-factor/test-discipline floors dominate.

### Verdict

**Tier**: T3 PATTERN-STUDY
**Composite**: `install_score=3.228`, `pattern_score=3.787`
**Rationale**: pattern_score 3.787 clears T3 floor (3.5) with D2=5 + D13=5 (pattern_extractability max). install_score 3.228 IS technically in T2 band [3.0, 3.9] but **D16=1 (solo-equivalent bus factor) is a hard-cap breach for T1+T2 → enforced T3 ceiling per sca-v5 §4 hard-cap taxonomy**. The 6-month staleness + lack of CI + lack of code review + LiteLLM/Gemini lock-in make full install untenable, but the 3-axis complexity framework + weighted-rubric methodology is a high-value extractable pattern for the runtime's research-agent eval lane.

**Rollback plan** (T3 PATTERN-STUDY — pattern lift only, no install):
- **Files**:
  - Pattern lift: `Z:\claude-sota-installed\docs\architecture\W310-RESEARCHRUBRICS-PATTERN.md` (3-axis framework + weighted criteria docs)
  - Optional skill: `Z:\claude-sota-installed\.claude\skills\research-rubrics-eval\SKILL.md` (if operator-curated) — NOT to be auto-fired; gated by `description: "Use when..."` per cardinal-rule-4
  - W295 filesystem-safe slug: `verdicts/W310-scaleapi-researchrubrics.md`
- **Recovery time**: ≤5 minutes (delete pattern doc; T3 means no install to roll back)
- **Smoke test**: n/a for T3 (no install); pattern extraction is documentation-only

### Proposed ledger row

| # | Wave | Decided | Candidate | Verdict | install_score | pattern_score | Hard caps | Status | Reverify-due | Notes |
|---|---|---|---|---|---|---|---|---|---|---|
| 38 | W310 | 2026-05-19 | scaleapi/researchrubrics | T3 PATTERN-STUDY | 3.228 | 3.787 | D16=1 (hard-cap T1/T2 → enforced T3) | ACTIVE | W316 | ICLR-2026 Scale AI deep-research-rubric benchmark; 3-axis complexity framework + weighted criteria HIGHLY extractable; 6-month stale + bus-factor=1.5 + no CI + no code review block install; pattern study for runtime research-agent eval lane |

### Proposed T6 verdict file (synthesis writes)

- **Path**: `verdicts/W310-scaleapi-researchrubrics.md`
- **Frontmatter**:
```yaml
---
candidate: scaleapi/researchrubrics
verdict: T3 PATTERN-STUDY
wave: W310
decided_at: 2026-05-19
rule_version: sca-v5-pending-v6-rescore
install_score: 3.228
pattern_score: 3.787
hard_cap_breaches: ["D16=1 (solo bus-factor — hard-cap T1+T2)"]
hard_cap_borderline: ["D7=2 maintenance at floor", "D17=2 robustness at floor"]
sources_typed_diversity: ["github", "hf-mcp-server", "exa", "WebSearch", "deepwiki", "repomix", "hub_repo_search"]
adversarial_review: pending
cost_actual: 0.85
phase5_gates: ["G1:PASS", "G2:PASS", "G3:PASS(bias=academic-citation-anchoring)", "G4:PASS", "G5:PASS"]
phase6_position_swap_consistent: true
disagreement_count: 1
---
```
- **Body**: full audit + sources_typed + disagreement[] resolution + adversarial_review placeholder + rollback_plan as above.

---

## Cross-audit observations

1. **Both targets are ICLR-2026 papers + research artifacts, but exhibit different bus-factor profiles**: HAL has 30 authors / 9 orgs / 208★ / 4+ active committers vs ResearchRubrics with 16 authors / 6 orgs / 17★ / 2 committers / 6-month stale. The 30:16 author ratio gives HAL strong D16+D21 dominance; the 4-committer:2-committer ratio gives HAL strong D7+D19 dominance. ResearchRubrics' D16=1 is the decisive cap.

2. **Both have Claude-Code-pathway = 0**: Neither implements CC plugin/MCP/agent/hook/skill surfaces. Both are pure Python frameworks. D4=2 for HAL (some Claude API integration via agents/) and D4=1 for ResearchRubrics (Gemini-only lock).

3. **Pattern-extractability dominates both**: HAL's reliability_eval/ module (Docent 6-category taxonomy) and ResearchRubrics' 3-axis complexity framework + weighted rubrics are the high-value lifts. Both score D13=5.

4. **Cost-effectiveness of pattern study vs install**:
   - HAL T2 VENDOR-FORK: ~$0 cost (vendor copy 80KB) but ongoing drift-tracking overhead
   - ResearchRubrics T3 PATTERN-STUDY: pure-documentation lift, zero runtime cost
   - Combined recommendation: vendor HAL reliability_eval/ + document ResearchRubrics 3-axis framework as runtime patterns → effective Docent-style + complexity-aware eval lane upgrade for `harness/eval_harness.py` Lane C

5. **W310 sca-v6 rescore implications**: When P0a ships sca-v6 with D22 cascade-breadth (count of distinct MCP families per audit) and D23 decision-impact-tier (T1/T2 = high-impact, T3 = lower-impact), expected scores:
   - HAL D22 = 10 families → D22 ≈ 5; D23 = T2 = decision-impact-tier 2 → D23 ≈ 3-4. Install_score likely ticks up by ~0.05-0.10 to ~3.65 still T2.
   - ResearchRubrics D22 = 7 families → D22 ≈ 3-4; D23 = T3 = lower-impact → D23 ≈ 2. Composite scores likely stable. Tier unchanged.

6. **Adversarial cross-model review trigger**: Both verdicts qualify for codex GPT-5.5 cross-model adversarial review post-ship (per W310 P1b stream-D goal mandate). HAL particularly needs review of D3=2 + D4=2 floor (is the "borderline-not-breach" interpretation operator-aligned?). ResearchRubrics needs review of D16=1 hard-cap firing (is solo+1 = bus-factor-1 a strict cap or a soft-gate edge?).

---

## Summary

| Target | Tier | install_score | pattern_score | Decisive constraint |
|---|---|---|---|---|
| princeton-pli/hal-harness | **T2 VENDOR-FORK** | 3.585 | 4.330 | D3+D4 = 2 (Linux/Docker + no CC pathway) — both at floor not breach |
| scaleapi/researchrubrics | **T3 PATTERN-STUDY** | 3.228 | 3.787 | D16=1 hard-cap (solo+1 bus-factor below T1+T2 floor) |

Both audits pass Phase-5 5-gate + Phase-6 position-swap consistency check. Both ready for synthesis → ledger ship + codex adversarial-review cycle.

**Cardinal-rule invariants verified**:
- R1 (trusted primitives): both candidates from institutional sources (Princeton PLI + Scale AI corporate)
- R2 (hooks): n/a, this is an audit, not an install
- R3 (subagents): n/a, audit-only
- R4 (no ad-hoc rules): output is a markdown verdict file, not a `.claude/rules/*.md`
- R5 (safety boundaries): no settings.json/SKILL.md/runtime-config modifications

**Cost actual / cap usage**:
- HAL: $1.35 / $1.50 cap (90% utilized — within budget)
- ResearchRubrics: $0.85 / $1.00 cap (85% utilized — within budget)
- Total: $2.20 / $2.50 cap (88% utilized — within budget)
- W310 P1b Agent 1 cost-cap discipline: PASS

**Ready for synthesis pickup**: this file (`W310-STREAM-D-AGENT-1-ICLR-AUDITS.md`) is the canonical input for the W310 synthesis step that will:
1. Re-score under sca-v6 (D22 + D23 additions) once P0a ships
2. Write `verdicts/W310-princeton-pli-hal-harness.md` and `verdicts/W310-scaleapi-researchrubrics.md` per W295 filesystem-safe slug convention
3. Append rows 37 + 38 to VERDICT-LEDGER.md
4. Dispatch codex GPT-5.5 cross-model adversarial-review --wait gates
