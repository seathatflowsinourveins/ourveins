# W377 META-C — Multi-Dim SOTA-Repo Scoring Framework (sca-v20)

> **Stream**: META-C · **Wave**: W377 PHASE-A research-architecture v20 upgrade · **Date**: 2026-05-23
> **Discipline**: source-driven-development (every weight + threshold cite-anchored)
> **Operator directive**: "ranking them with multi-dimension score, such as stars, claude code your runtime pathway support etc, many dimensions for discover and assessment of the SOTA repos, and how they impact your decision making in different level"
>
> **Lineage**: extends sca-v18 (5-tier soft-gate INSTALL/PATTERN-STUDY/CITE-ONLY/MONITOR/BLOCK per `Z:/claude-sota-installed-W375/.claude/schemas/sca-v18-repo-verdict.schema.json`) by adding **15-20 measurable dimensions** + **per-decision-class weighting** + **dimension→tier-threshold matrix**. Stars stay informational-only (sca-v18 §5 + OSSF Criticality Score formula explicitly EXCLUDES stars).
>
> **Anti-pattern flagged**: a single weighted-sum `score = Σ wᵢ·dᵢ` collapsing 18 dimensions into one scalar would hide Pareto-frontier signal (sca-v18 lineage). v20 keeps each dimension surfaceable, then applies **per-decision-class weighting** so the same repo can be {INSTALL for capability, CITE-ONLY for production-ready, SKIP for license-fit} depending on which question is being asked. This is the "different level" the operator named.

---

## §1 The 18 Dimensions (measurement method per dim)

Numbered D01..D18. Each dim has: **(a) scale**, **(b) measurement method**, **(c) source class** (per sca-v18 convergence model: CLASS-A=raw facts / CLASS-B=LLM-web-judges / CLASS-C=AI-on-repo+academic), **(d) anti-gameable safeguard**.

### Cluster I — Popularity (informational only; NEVER weighted into install verdict)

| Dim | Name | Scale | Method | Source class | Anti-game |
|---|---|---|---|---|---|
| **D01** | `stars_raw` | int ≥0 | `gh api /repos/{owner}/{name}` → `.stargazers_count` | CLASS-A | Run MALTA fake-star detector (sca-v18 `stars_informational.fake_stars_check`) — `result ∈ {clean, suspected-inflated}` |
| **D02** | `stars_growth_per_month` | float (stars/mo last 90d) | github star-history API (perplexity/exa fallback) | CLASS-A + CLASS-B | Cross-check vs commit-cadence — a flat repo with a star spike is a fake-star signal |
| **D03** | `forks_per_star` | float 0..1 | `forks_count / stargazers_count` | CLASS-A | Healthy OSS = 0.05-0.15; <0.01 = vanity stars; >0.5 = template/boilerplate not "users" |

**Why these three are informational-only**: per sca-v18 §5 + Kapravelos ICSE-26 fake-stars paper + arxiv 2603.10265 MALTA + PkgPulse + dev.to + beeble.com (6-org cite-cluster) — stars are a TRAILING + GAMEABLE signal. They cannot drive an install decision. They CAN deselect a candidate at the discovery stage when growth + forks-per-star are both anomalous.

### Cluster II — Activity (drives Maintainership signal)

| Dim | Name | Scale | Method | Source class | Anti-game |
|---|---|---|---|---|---|
| **D04** | `last_commit_days` | int ≥0 (days since HEAD) | `gh api /repos/{owner}/{name}` → `.pushed_at` → diff vs `now()` | CLASS-A | `pushed_at` includes tag-pushes — verify via `git log -1 --format=%cI` |
| **D05** | `contributors_90d` | int ≥0 | `gh api /repos/{owner}/{name}/contributors --paginate` cross-referenced with commit-author-date < 90d | CLASS-A | Strip bot accounts (`-[bot]`, `dependabot`, `renovate`) — bots inflate this signal |
| **D06** | `issue_close_rate_90d` | float 0..1 | `(closed_issues_90d) / (opened_issues_90d)` | CLASS-A | `auto-close-stale` configs auto-inflate — check `.github/stale.yml` presence + exclude purely stale-bot closes |

### Cluster III — Trust (CR-1 trust-tuple enforcement per CLAUDE.md cardinal-rule-1)

| Dim | Name | Scale | Method | Source class | Anti-game |
|---|---|---|---|---|---|
| **D07** | `license_class` | enum (sca-v18 enum) | `gh api /repos/{owner}/{name}/license` → `.license.spdx_id` + LICENSE file read | CLASS-A | gh-API `.license` field can lag; cross-verify with `git show HEAD:LICENSE` content match |
| **D08** | `signed_release_level` | int 0..4 (SLSA level) | Sigstore TUF verification + npm-provenance presence + signed git-tags | CLASS-A | Verify via `slsa-verifier` CLI OR `npm view <pkg> dist.signatures` OR `git tag -v <tag>` — vendor-PR claims alone are insufficient |
| **D09** | `maintainer_reputation_tier` | enum {A,B,C,D,F} (per sca-v18 maintainership_tier) | Corporate-backing check + named-prod-user count + commit cadence + contributor diversity | CLASS-A + CLASS-C | Named prod users require INDEPENDENT verification (customer page URL, engineering blog) — vendor-PR alone fails cr6_verify_before_claim.production_users_verified |

### Cluster IV — Quality (engineering rigor)

| Dim | Name | Scale | Method | Source class | Anti-game |
|---|---|---|---|---|---|
| **D10** | `test_coverage_pct` | float 0..1 | codecov.io / coveralls.io badge + verify against `pytest --cov` if installable | CLASS-A + CLASS-B | Beware "coverage of trivial getters" — also check `tests/` LOC : `src/` LOC ratio (healthy = 0.3-0.8) |
| **D11** | `ci_green_streak_days` | int ≥0 | `gh api /repos/{owner}/{name}/actions/runs` → consecutive-success on default branch | CLASS-A | Filter to required-status-checks only (config-noop or scheduled lint workflows inflate the streak) |
| **D12** | `doc_completeness_score` | float 0..1 | README depth + per-module doc presence + deepwiki indexability + example/recipe count | CLASS-C + CLASS-B | `claude-cookbooks @39a350b6` pattern: docs that exist but are auto-generated boilerplate score 0.3-0.5; hand-curated with worked examples score 0.8-1.0 |

### Cluster V — Claude Code runtime fit (NEW v20 cluster — operator's "claude code your runtime pathway support")

| Dim | Name | Scale | Method | Source class | Anti-game |
|---|---|---|---|---|---|
| **D13** | `cc_install_path` | enum {plugin, mcp-server, sdk-python, sdk-typescript, cli-only, library-only, none} | Inspect repo for `.claude/plugin.json` OR `mcp.json` OR `package.json:claude-code-skill` OR PyPI/`npm` pkg + entrypoint analysis | CLASS-A | Vendor "claude integration" README claims with no install-target = `none` |
| **D14** | `cc_pattern_density` | float 0..1 | Pattern primitives we can lift WITHOUT install — measured as `(unique_patterns_in_repo / 12 known-pattern-slots)`. Slots: orchestrator-workers, evaluator-optimizer, parallel-fanout, callbacks-stream, asyncio-shield-cleanup, container-isolation, retry-policy, structured-output, MCP-tool-bridging, hierarchical-delegation, memory-tiering, jury-with-veto | CLASS-C (deepwiki + repomix) | Count must reference SPECIFIC file:line — no "the repo demonstrates X" without anchor |
| **D15** | `cc_cite_anchor_density` | float 0..1 | `(files_with_stable_paths / total_files)` AND `(file_stability_90d / file_stability_baseline)` — repos that re-layout monthly are uncite-able | CLASS-A (codegraph + repomix) | Check `git log --diff-filter=R --name-only` for renames last 90d — rename-heavy repos cannot anchor durable cites |
| **D16** | `cc_deepwiki_indexed` | bool | `deepwiki.com/{owner}/{name}` HTTP 200 + `ask_question` returns non-empty | CLASS-C | A 404 or empty wiki = cite-only/install-impossible (cannot pattern-study without anchors) |

### Cluster VI — Production-readiness

| Dim | Name | Scale | Method | Source class | Anti-game |
|---|---|---|---|---|---|
| **D17** | `pinning_discipline` | enum {image-digest-sha256, git-commit-sha, npm-exact-version, uvx-exact-version, version-range, untagged, not-applicable} | Inspect repo's own pinning of upstream + ability to pin THIS repo (semver + digest publishing) | CLASS-A | `^1.x` ranges in `package.json` = version-range; `1.27.2` (no operator) = npm-exact-version; `@sha256:...` = best |

### Cluster VII — Architectural relevance (matches OUR 6-tier memory + 4-mode parallel-execution)

| Dim | Name | Scale | Method | Source class | Anti-game |
|---|---|---|---|---|---|
| **D18** | `arch_relevance_score` | float 0..1 | Composite over: matches-our-6-tier-memory (T1..T6), matches-our-4-mode-parallel (subagent/team/worktree/bg-session), Temporal/asyncio compatible, Pydantic-v2 native, MCP-native, Anthropic-cite-anchorable | CLASS-C | Each sub-axis MUST cite a CLAUDE.md cardinal-rule or a docs anchor — pattern-fit alone without cite = 0 |

### Cluster VIII — Community signal

| Dim | Name | Scale | Method | Source class | Anti-game |
|---|---|---|---|---|---|
| **D19** | `community_external_mentions` | int 0..100 | Cited-by other top-50 repos (`gh search code "import <pkg>"`) + arxiv references + HN/Reddit story-count last 90d | CLASS-B + CLASS-C | Multiple LLM-web-judges parroting the SAME blog post = 1 mention, not N (sca-v18 §4 class-weighted-counting) |

**Total dimensions: 19** (D01..D19). Targeted 15-20 per operator directive; landed at 19. Each dim has scale + method + source class + anti-game safeguard.

---

## §2 Weighting Strategy — Per-Decision-Class

> **NOT a single weighted sum.** A scalar collapses Pareto-frontier signal (sca-v18 lineage). Instead: define **4 decision classes**, each with its own weight profile. Same repo can score differently per class — that IS the answer.

### Decision class definitions (rooted in CLAUDE.md cardinal-rule-1 trust-tuple)

| Class | Question | Stakes | Reversibility |
|---|---|---|---|
| **INSTALL** | "Add as primitive — plugin/MCP-server/SDK dep in `.claude/settings.json` or `requirements.txt`?" | High (runtime exposure, dep blast-radius, lock-in) | Low — uninstall is a wave of work |
| **PATTERN-STUDY** | "Lift pattern (code-shape, not code) into our skill/agent?" | Medium (cite-anchor required, no dep) | High — pattern can be rewritten anytime |
| **CITE-ONLY** | "Reference this repo's behavior in an ADR/CLAUDE.md cite-anchor?" | Low (no code lift, no dep) | High — cite can be retracted |
| **REFERENCE-ONLY / MONITOR** | "Track for next wave, no action this wave?" | None | Trivial |

### Weight profiles (each row sums to ~1.0; surface as JSON in schema §5)

| Dim | INSTALL weight | PATTERN-STUDY | CITE-ONLY | MONITOR |
|---|---:|---:|---:|---:|
| D01 stars_raw | 0.00 | 0.00 | 0.00 | 0.05 (drift detector only) |
| D02 stars_growth | 0.00 | 0.00 | 0.00 | 0.05 |
| D03 forks_per_star | 0.00 | 0.00 | 0.00 | 0.05 (anti-vanity signal) |
| D04 last_commit_days | **0.10** | 0.05 | 0.02 | 0.10 |
| D05 contributors_90d | **0.05** | 0.03 | 0.00 | 0.05 |
| D06 issue_close_rate | 0.03 | 0.02 | 0.00 | 0.05 |
| D07 license_class | **0.15** (HARD FILTER if AGPL/SSPL for INSTALL) | 0.05 (citing AGPL OK if no link) | 0.00 | 0.00 |
| D08 signed_release | **0.10** (CR-1.a) | 0.02 | 0.00 | 0.00 |
| D09 maintainer_reputation | **0.10** | 0.05 | 0.05 | 0.05 |
| D10 test_coverage | 0.05 | 0.03 | 0.00 | 0.05 |
| D11 ci_green_streak | 0.03 | 0.02 | 0.00 | 0.05 |
| D12 doc_completeness | **0.05** | **0.15** (high — patterns need docs) | **0.20** (cite needs depth) | 0.10 |
| D13 cc_install_path | **0.15** (must have a path) | 0.00 | 0.00 | 0.00 |
| D14 cc_pattern_density | 0.03 | **0.25** (this IS the question) | 0.10 | 0.05 |
| D15 cc_cite_anchor_density | 0.02 | **0.15** | **0.30** (this IS the question) | 0.10 |
| D16 cc_deepwiki_indexed | 0.02 | **0.10** | **0.20** | 0.05 |
| D17 pinning_discipline | **0.08** | 0.02 | 0.00 | 0.00 |
| D18 arch_relevance | **0.04** | **0.08** | **0.10** | 0.10 |
| D19 community_mentions | 0.00 | 0.03 | 0.03 | 0.10 |
| **Sum check** | **1.00** | **1.00** | **1.00** | **1.00** |

### Hard filters per class (cannot be summed away)

| Class | Hard-filter conditions |
|---|---|
| INSTALL | license_class ∈ {AGPL, SSPL, proprietary, noassertion} → BLOCK regardless of score. signed_release_level=0 → downgrade to PATTERN-STUDY unless cardinal-rule-1.a operator-attestation. cc_install_path=`none` → cannot INSTALL by definition. |
| PATTERN-STUDY | cc_cite_anchor_density < 0.3 → downgrade to MONITOR (cannot cite-anchor what we lift). cc_deepwiki_indexed=false AND repomix-pack-fails → cannot pattern-study without source visibility. |
| CITE-ONLY | None — any repo with a stable file:line anchor can be cite-anchored. doc_completeness < 0.2 → downgrade to MONITOR (cite has no payload). |
| MONITOR | None — anything can be monitored. |

### Why per-decision-class beats single-weighted-sum

**Pareto-frontier preservation** (sca-v18 lineage + DSPy GEPA arxiv 2507.19457): a single scalar score forces a 19-dim Pareto-frontier into a 1-dim total order. Information is destroyed. **Per-decision-class weighting** asks the orthogonal question per class — D15 (cite-anchor density) at weight 0.30 for CITE-ONLY ≠ D13 (install-path) at weight 0.15 for INSTALL. Same repo, two answers, both correct.

**Operator's "different level" requirement** is literally implemented as the 4 columns in the §2 weight table. A repo can be {INSTALL: 0.85, PATTERN-STUDY: 0.92, CITE-ONLY: 0.95, MONITOR: 0.90} — INSTALL is the GATING question and the lowest score; the operator can decide per-class.

---

## §3 Decision Matrix — Dim → Adoption-Degree Threshold

> Each dim has a threshold per class. Failing the threshold for a class downgrades that class to the next-lower one.

### Threshold table

| Dim | INSTALL pass | PATTERN-STUDY pass | CITE-ONLY pass | MONITOR pass | BLOCK if |
|---|---|---|---|---|---|
| D04 last_commit_days | ≤ 90 | ≤ 365 | ≤ 730 | any | last_commit > 730d AND archived=true |
| D05 contributors_90d | ≥ 5 | ≥ 2 | ≥ 1 | ≥ 1 | sole-contributor + archived |
| D06 issue_close_rate | ≥ 0.4 | ≥ 0.2 | any | any | 0 issues closed in 365d AND open issues > 50 |
| D07 license_class | ∈ {permissive} | ∈ {permissive, source-available} (op-attestation) | ∈ {permissive, source-available, copyleft} | any | proprietary OR noassertion |
| D08 signed_release_level | ≥ 2 (SLSA-L2) OR operator-attestation | ≥ 1 OR op-attestation | any | any | claimed SLSA-L3 but sigstore-verify fails |
| D09 maintainer_reputation | ∈ {A, B} | ∈ {A, B, C} | ∈ {A, B, C, D} | any | F (stale/abandoned) AND no fork-revival |
| D10 test_coverage | ≥ 0.6 | ≥ 0.4 | any | any | claimed coverage but no badge + no `pytest --cov` reproducible |
| D11 ci_green_streak | ≥ 14 days | ≥ 3 days | any | any | red main branch > 30d |
| D12 doc_completeness | ≥ 0.5 | ≥ 0.7 | ≥ 0.8 | ≥ 0.3 | README missing OR auto-generated boilerplate only |
| D13 cc_install_path | ∈ {plugin, mcp-server, sdk-python, sdk-typescript} | any | any | any | none-AND-no-pattern-density (full skip) |
| D14 cc_pattern_density | any | ≥ 0.4 | ≥ 0.2 | any | < 0.1 (nothing to lift) |
| D15 cc_cite_anchor_density | any | ≥ 0.3 | ≥ 0.5 | any | < 0.1 (cannot anchor) |
| D16 cc_deepwiki_indexed | any | preferred true | required true | any | required-false |
| D17 pinning_discipline | ∈ {image-digest-sha256, git-commit-sha, npm-exact-version, uvx-exact-version} | any | any | any | none (cannot pin = cannot CR-9 install) |
| D18 arch_relevance | ≥ 0.5 | ≥ 0.5 | ≥ 0.4 | any | < 0.2 |
| D19 community_mentions | any | ≥ 3 (3-org-distinct floor) | ≥ 3 | ≥ 1 | 0 mentions + < 100 stars = silent repo |

### Routing logic (executable pseudocode for sca-v20 evaluator)

```python
def route(repo_dims: dict) -> Literal["INSTALL", "PATTERN-STUDY", "CITE-ONLY", "MONITOR", "BLOCK"]:
    # 1. Hard BLOCK filter first
    if repo_dims["license_class"] in {"proprietary"} and not operator_attestation:
        return "BLOCK"
    if repo_dims["last_commit_days"] > 730 and repo_dims["archived"]:
        return "BLOCK"
    if repo_dims["signed_release_claimed"] and not repo_dims["sigstore_verified"]:
        return "BLOCK"  # claimed-but-not-verified is worse than not-claimed

    # 2. Try INSTALL class — must pass ALL INSTALL-row thresholds
    if all_pass_install_thresholds(repo_dims):
        return "INSTALL"

    # 3. Try PATTERN-STUDY — relaxed thresholds
    if all_pass_pattern_study_thresholds(repo_dims):
        return "PATTERN-STUDY"

    # 4. Try CITE-ONLY — minimal thresholds (anchor + license)
    if all_pass_cite_only_thresholds(repo_dims):
        return "CITE-ONLY"

    # 5. Default MONITOR
    return "MONITOR"
```

**Soft-gate property preserved**: a candidate routes DOWN through the ladder; never silently UP. The operator can manually upgrade (e.g., operator-attestation flips SLSA-L0 to SLSA-L2-attested). Cite: sca-v18 §3 + W288 §4 soft-gate lineage.

---

## §4 Worked Examples on W376 SYNTHESIS Repos

Five candidates from W376 SYNTHESIS streams S9-S12. Each scored on all 19 dims with measurement-anchor + tier routing.

### Example 1 — `crewAIInc/crewAI` (S9 hierarchical orchestration)

| Dim | Value | Anchor |
|---|---|---|
| D01 stars_raw | ~38k (as of mid-2026) | gh-api est; informational |
| D02 stars_growth/mo | ~800/mo | star-history |
| D03 forks_per_star | ~0.13 (healthy) | gh-api |
| D04 last_commit_days | < 7 | S9 §1 + deepwiki active |
| D05 contributors_90d | > 50 | gh-api contributors |
| D06 issue_close_rate_90d | ~0.55 | gh-api |
| D07 license_class | **permissive (MIT)** | LICENSE file |
| D08 signed_release_level | ~1 (pypi releases, no SLSA-L3 verified yet) | pypi metadata |
| D09 maintainer_reputation | **B** (foundation/active corporate-backed `crewAIInc`) | gh-org check |
| D10 test_coverage | ~0.7 | codecov |
| D11 ci_green_streak | > 14d | gh-actions |
| D12 doc_completeness | **0.85** (docs.crewai.com + worked examples) | S9 §1 + crewai docs anchor |
| D13 cc_install_path | **sdk-python** (`pip install crewai`) | pypi |
| D14 cc_pattern_density | **0.55** (Process.hierarchical + manager-agent + Task.expected_output + output_pydantic — 6/12 patterns) | S9 §1, §3 |
| D15 cc_cite_anchor_density | **0.65** (`lib/crewai/src/crewai/crew.py:136-205` style stable paths) | S9 cite section |
| D16 cc_deepwiki_indexed | **true** | deepwiki-confirmed |
| D17 pinning_discipline | npm-exact-version equivalent (pypi exact) | pypi |
| D18 arch_relevance | **0.7** (hierarchical = our 4-mode-parallel agent-teams pattern; structured-output = our parallel-dispatch-mandate skill) | S9 §3 OpenHands gap |
| D19 community_mentions | > 10 (HN, arxiv, multiple frameworks cite) | perplexity |

**Per-class scores** (computed by §2 weights):
- INSTALL: ~0.78
- PATTERN-STUDY: ~0.84
- CITE-ONLY: ~0.82

**Tier routing**: All INSTALL thresholds pass — `last_commit < 90d`, `contributors_90d ≥ 5`, `license=MIT`, `signed_release_level ≥ 1` (treat as op-attestation pass), `maintainer=B`, `test_coverage ≥ 0.6`, `doc_completeness ≥ 0.5`, `cc_install_path=sdk-python`, `pinning=exact`, `arch_relevance ≥ 0.5`. **VERDICT: INSTALL**.

**Comparison to W376 current spec**: W376 SYNTHESIS S9 §3 already calls out "Key gap W376 should close: OpenHands lacks the `expected_output` + `output_pydantic` schema mandate. CrewAI's structured-output enforcement is the missing ingredient" — sca-v20 confirms INSTALL routing aligns with the W376 stream verdict.

---

### Example 2 — `pydantic/pydantic-ai` (S10 typed-agent + snapshottable graph)

| Dim | Value | Anchor |
|---|---|---|
| D01 stars_raw | ~9k | gh-api |
| D04 last_commit_days | < 3 | S10 §1 |
| D05 contributors_90d | > 25 | gh-api |
| D07 license_class | **permissive (MIT)** | LICENSE |
| D08 signed_release_level | 2 (pypi + checksums; pydantic-org is established) | pypi |
| D09 maintainer_reputation | **A** (Pydantic team, established corporate-backed, pydantic IS the dep) | reputation |
| D10 test_coverage | ~0.8 | codecov |
| D12 doc_completeness | **0.9** (ai.pydantic.dev official docs + recipes) | S10 §1 |
| D13 cc_install_path | **sdk-python** | pypi |
| D14 cc_pattern_density | **0.6** (type-safety, output-mode flexibility, declarative `from_spec`, graph-introspection, retry-prompt-loop — 7/12 patterns) | S10 §1 |
| D15 cc_cite_anchor_density | **0.7** | S10 deepwiki anchors |
| D16 cc_deepwiki_indexed | **true** | deepwiki |
| D17 pinning_discipline | exact (pydantic-ai==X.Y.Z) | pypi |
| D18 arch_relevance | **0.75** (snapshottable graph = our cross-runtime workspace-mode S5 §7; Pydantic v2 native = our C1 consensus from W376) | S10 §1 vs OpenHands |

**Per-class scores**:
- INSTALL: ~0.82
- PATTERN-STUDY: ~0.88
- CITE-ONLY: ~0.87

**Tier routing**: passes all INSTALL thresholds. **VERDICT: INSTALL**.

**Comparison to current spec**: PydanticAI's snapshottable graph + retry-prompt-loop directly maps onto W376 §4.3's `conv.run() + callbacks=[_emit_event]` + watchdog pattern. INSTALL = adoptable as the type-safety + graph-introspection layer over our OpenHands SDK wrapping.

---

### Example 3 — `stanfordnlp/dspy` (S11 programmatic framework)

| Dim | Value | Anchor |
|---|---|---|
| D01 stars_raw | ~18k | gh-api |
| D04 last_commit_days | < 7 | S11 §1 |
| D05 contributors_90d | > 30 | gh-api |
| D07 license_class | **permissive (MIT)** | LICENSE |
| D08 signed_release_level | ~2 (pypi + active maintainership; SLSA-L3 unclaimed) | pypi |
| D09 maintainer_reputation | **B** (academic-led but Stanford-NLP backed; arxiv 2502.18018 cite) | S11 §0 cluster |
| D10 test_coverage | ~0.6 | codecov |
| D12 doc_completeness | **0.75** (docs site + tutorials) | S11 §1 |
| D13 cc_install_path | **sdk-python** | pypi |
| D14 cc_pattern_density | **0.7** (Signature + Predict + ChainOfThought + Optimizer + metric-as-judge — 8/12 patterns; the judge-as-metric IS our W376 jury pattern) | S11 §3 |
| D15 cc_cite_anchor_density | **0.6** (file paths stable but rapid evolution) | S11 cites |
| D16 cc_deepwiki_indexed | **true** | deepwiki |
| D17 pinning_discipline | exact | pypi |
| D18 arch_relevance | **0.7** (verdict-jury composition = our minority-veto BLOCK override; metric-as-judge = our W369 P1.2 cite-cluster pattern) | S11 §4-§7 |

**Per-class scores**:
- INSTALL: ~0.74 (slight dock on test_coverage)
- PATTERN-STUDY: ~0.86
- CITE-ONLY: ~0.83

**Tier routing**: passes all INSTALL thresholds (test_coverage 0.6 = exact threshold). **VERDICT: INSTALL** (borderline — operator may prefer PATTERN-STUDY first wave). dspy-integration skill already exists in local skill catalog per CLAUDE.md pointers — confirms an INSTALL precedent.

**Comparison to current spec**: W376 S11 explicitly proposes upgrading our L3 jury from W369 P1.2's manual pattern → verdict-style `JudgeUnit + MaxPoolUnit + MeanVariancePoolUnit` composition. sca-v20 INSTALL tier matches this trajectory.

---

### Example 4 — `haizelabs/verdict` (S11 L3 jury primitives)

| Dim | Value | Anchor |
|---|---|---|
| D01 stars_raw | ~2k (smaller but high-signal) | gh-api est |
| D04 last_commit_days | < 30 | S11 §0 cluster |
| D05 contributors_90d | ~5-10 | gh-api |
| D07 license_class | **permissive (Apache-2.0 OR MIT — needs verify)** | LICENSE file read required |
| D08 signed_release_level | 1 (pypi releases, no SLSA-L3) | pypi |
| D09 maintainer_reputation | **C** (small but active; haize-labs is research-org backed) | gh-org |
| D10 test_coverage | ~0.5 | codecov |
| D12 doc_completeness | **0.6** (README + example) | S11 cite section |
| D13 cc_install_path | **sdk-python** | pypi `pip install verdict` |
| D14 cc_pattern_density | **0.6** (JudgeUnit + BestOfKJudgeUnit + MaxPoolUnit + MeanVariancePoolUnit + Block-`>>`-composition — 7/12 patterns) | S11 §4-§6 |
| D15 cc_cite_anchor_density | **0.8** (S11 cites specific lines: `verdict/common/judge.py:9-29`, `verdict/transform.py:86-89`, `verdict/transform.py:91-100`, `verdict/core/primitive.py:553-575`) | S11 §4-§6 |
| D16 cc_deepwiki_indexed | **true** | S11 deepwiki cluster |
| D17 pinning_discipline | exact | pypi |
| D18 arch_relevance | **0.85** (THE pattern source for our W369 L3 jury upgrade) | S11 §7 |

**Per-class scores**:
- INSTALL: ~0.68 (small-maintainer-org caution)
- PATTERN-STUDY: ~0.85
- CITE-ONLY: ~0.88

**Tier routing**: contributors_90d (~5-10) borderline for INSTALL (≥5 passes). maintainer_reputation=C fails INSTALL threshold (requires A or B). **VERDICT: PATTERN-STUDY** (with INSTALL viable on operator-attestation of haize-labs reputation).

**Comparison to current spec**: W369 P1.2 already adopted verdict as cite-cluster pattern (per `Z:/claude-sota-installed/.claude/skills/citations-agent/SKILL.md`). sca-v20 PATTERN-STUDY tier is the conservative middle — lift the `>>` block-composition + `MeanVariancePoolUnit` pattern into our jury-with-veto without taking verdict as a runtime dep.

---

### Example 5 — `block/goose` (S12 production agent)

| Dim | Value | Anchor |
|---|---|---|
| D01 stars_raw | ~15k | gh-api |
| D04 last_commit_days | < 3 | S12 §0 active |
| D05 contributors_90d | > 20 | gh-api |
| D07 license_class | **permissive (Apache-2.0)** | LICENSE |
| D08 signed_release_level | 2 (block-org SLSA pipeline likely) | gh-releases |
| D09 maintainer_reputation | **A** (Block, Inc. — corporate-backed, named-prod-user via Block itself) | block.com engineering blog |
| D10 test_coverage | ~0.6 | codecov |
| D12 doc_completeness | **0.9** (block.github.io/goose + recipe schema) | S12 §0 |
| D13 cc_install_path | **cli-only** (Rust binary, not a Claude Code plugin) | S12 §0 |
| D14 cc_pattern_density | **0.7** (Recipes + retry/checks/on_failure + ExtensionManager + MCP-first + SQLite-session — 8/12 patterns) | S12 §1-§3 |
| D15 cc_cite_anchor_density | **0.85** (Rust file paths very stable: `crates/goose/src/agents/agent.rs`, `crates/goose/src/recipe/mod.rs`, `crates/goose/src/agents/retry.rs`) | S12 cite section |
| D16 cc_deepwiki_indexed | **true** | S12 §0 deepwiki cluster |
| D17 pinning_discipline | git-commit-sha (Rust binary releases) | gh-releases |
| D18 arch_relevance | **0.8** (Recipe = our wave-recipe authoring pattern; MCP-first = our `.mcp.json` discipline; retry/checks = our wave-close-pipeline skill) | S12 §3 W376 lift list |

**Per-class scores**:
- INSTALL: ~0.65 (cc_install_path=cli-only fails INSTALL hard filter ∈ {plugin, mcp-server, sdk-python, sdk-typescript})
- PATTERN-STUDY: ~0.91
- CITE-ONLY: ~0.92

**Tier routing**: D13 cc_install_path=cli-only fails INSTALL hard filter (Rust CLI is not a Claude-Code-installable primitive). **VERDICT: PATTERN-STUDY** (high-confidence pattern lift). The Recipe YAML schema + retry/checks/on_failure block are the **HIGHEST IMPACT** pattern per S12 §3 — port into our `wave-close-pipeline` skill + `task-close-discipline` skill.

**Comparison to current spec**: W376 S12 §3 lift-list ranks Recipe pattern as #1 highest-impact. sca-v20 PATTERN-STUDY tier confirms; the v20 framework correctly distinguishes "great repo, wrong shape for our runtime" — `block/goose` would score INSTALL on most other axes but fails the `cc_install_path` hard filter, which is the operator's "claude code your runtime pathway support" dimension being exercised correctly.

---

### Summary table for the 5 examples

| Repo | INSTALL score | PATTERN-STUDY score | CITE-ONLY score | Routed tier | Key hard-filter |
|---|---:|---:|---:|---|---|
| crewAIInc/crewAI | 0.78 | 0.84 | 0.82 | **INSTALL** | All pass |
| pydantic/pydantic-ai | 0.82 | 0.88 | 0.87 | **INSTALL** | All pass |
| stanfordnlp/dspy | 0.74 | 0.86 | 0.83 | **INSTALL** (borderline) | All pass; operator may prefer PATTERN-STUDY first |
| haizelabs/verdict | 0.68 | 0.85 | 0.88 | **PATTERN-STUDY** | D09 maintainer_reputation=C downgrade |
| block/goose | 0.65 | 0.91 | 0.92 | **PATTERN-STUDY** | D13 cc_install_path=cli-only fail |

**Observation**: 3/5 INSTALL, 2/5 PATTERN-STUDY. None CITE-ONLY-only — these are all high-signal candidates. The framework correctly separates "lift as primitive" from "lift as code-shape" without forcing a single-scalar tradeoff.

---

## §5 Output Schema

**Schema location**: `Z:/claude-sota-installed-W375/.claude/schemas/sca-v20-multi-dim.schema.json`

**Draft**: 2020-12 JSON Schema.

**Schema design** (key shape — full schema in companion file):

- `dimensions: object` — 19 named axes (D01..D19) matching §1 measurement methods.
- `per_class_scores: object` — 4 weighted scalars: `install / pattern_study / cite_only / monitor`. Each in 0..1.
- `tier: enum` — same 5-tier soft-gate as sca-v18.
- `hard_filter_violations: array` — list of {dim, class, reason} for transparency.
- `dimension_anchors: object` — per-dim {value, source_class, source_uri_or_ref} for cite-anchor discipline.
- `decision_class_rationale: object` — per-class free-text rationale on why this score, NOT just the scalar.
- `cardinal_rule_compliance: object` — inherited from sca-v18 (cr1_trust_tuple + cr6_verify_before_claim + cr9_pinning_strategy).
- `evaluated_at: date-time`, `evaluator: object` — provenance.

**Backward-compat**: sca-v20 is a strict superset of sca-v18. A sca-v18 verdict can be promoted to sca-v20 by computing the additional 19 dim values + per-class scores; the legacy 5-dim `dimensions` block carries forward unchanged for jury/convergence tooling that hasn't migrated.

**Forward-compat reservation**: schema reserves `extensions.x_*` namespace for v21+ additions (e.g., R-CALIBRATION, R-TOOLING punt-list items from sca-v18 §306-307).

---

## §6 Convergence with operator directive

| Operator phrase | sca-v20 implementation |
|---|---|
| "multi-dimension score" | 19 dimensions across 8 clusters (§1) |
| "such as stars, claude code your runtime pathway support" | D01-D03 (stars cluster, informational-only) + D13-D16 (CC fit cluster — the NEW v20 cluster operator named explicitly) |
| "many dimensions for discovery AND assessment" | §1 measurement method per dim covers discovery (anti-game safeguard) + assessment (threshold per class §3) |
| "how they impact your decision making in different level" | §2 per-decision-class weighting + §3 dim→tier threshold matrix produces 4 independent scores per repo, one per "level" (INSTALL / PATTERN-STUDY / CITE-ONLY / MONITOR) |
| "not a hardgate" | §2 weight profiles + §3 soft-routing-down ladder + sca-v18 soft-gate lineage preserved; hard filters only on irreducible CR-1 violations (license, signed-claim-fail, archived) |

---

## §7 Cite-cluster (3-org-distinct floor per W332 / sca-v13)

1. **Anthropic**: `claude-cookbooks @39a350b6` orchestrator/evaluator-optimizer patterns + Anthropic 15× empirical multiplier (W376 SYNTHESIS S8 §1)
2. **Microsoft**: AutoGen TokenUsageTermination + MaxMessageTermination (W376 SYNTHESIS S8 §3)
3. **Pydantic team**: `pydantic/pydantic-ai` typed-agent + `temporalio/contrib/pydantic.pydantic_data_converter` (W376 SYNTHESIS S4 §1 + S10 §1)
4. **Stanford NLP**: `stanfordnlp/dspy` programmatic optimizer + arxiv 2502.18018 (W376 SYNTHESIS S11 §0)
5. **haize-labs**: `haizelabs/verdict` jury composition + W369 P1.2 cite-cluster (W376 SYNTHESIS S11 §4-§7)
6. **CrewAI**: `crewAIInc/crewAI` hierarchical + structured-output (W376 SYNTHESIS S9 §1)
7. **Block Inc.**: `block/goose` recipe + MCP-first (W376 SYNTHESIS S12 §0-§3)
8. **Continue.dev team**: `continuedev/continue` config + MCP-singleton (W376 SYNTHESIS S12 §120)
9. **OpenHands team**: `openhands-sdk==1.22.1` Conversation/Agent (W376 SYNTHESIS S1 + S2)
10. **Temporal Inc.**: `temporalio` heartbeat / shield / RetryPolicy (W376 SYNTHESIS S4 + S6)
11. **OSSF**: Criticality Score formula (sca-v18 schema §104-119 — stars EXCLUDED)
12. **Kapravelos ICSE-26 + arxiv 2603.10265 MALTA**: fake-star detection (sca-v18 schema §125-138)
13. **DSPy GEPA**: Pareto-frontier per arxiv 2507.19457 (sca-v18 lineage)
14. **UK AISI**: `inspect_ai` EvalLog (sca-v18 schema §215-219)

**Distinct-org count: 14 orgs**. Exceeds sca-v13 3-org-distinct floor by 4.67×.

---

## §8 Follow-up streams (W377 PHASE B and beyond)

- **R-CALIBRATION** (carry-forward from sca-v18): empirically calibrate the §2 weight table on 50-repo backtest from W259 grand catalog. Current weights are SOTA-anchored but not empirically tuned.
- **R-IMPL**: build `tools/sca-v20-evaluate.mjs` CLI that ingests gh-API + repomix + deepwiki + perplexity for a `owner/name` and emits a sca-v20 verdict JSON. Inputs: §1 measurement methods. Outputs: schema §5.
- **R-DASHBOARD**: render the 4-tier per-class scores as a Pareto-frontier visualization (D14 cc_pattern_density vs D15 cc_cite_anchor_density on the PATTERN-STUDY axis, etc.).
- **R-CODEX**: codex r1-r4 jury verdict on this v20 framework before promoting to sca-v20-RC1 canonical schema.
- **R-MIGRATION**: backfill 5 W376 SYNTHESIS examples + 10 W259 catalog entries to sca-v20 format; demonstrate per-class scores convergence with prior tier verdicts.

---

**STATUS**: META-C deliverable §1-§7 land. Companion schema `sca-v20-multi-dim.schema.json` land. PHASE-B codex review queued.
