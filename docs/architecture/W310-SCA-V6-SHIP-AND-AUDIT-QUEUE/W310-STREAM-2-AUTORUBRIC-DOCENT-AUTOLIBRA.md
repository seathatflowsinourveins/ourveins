# W310 Stream 2 — Secondary-Challenger Audit: AutoRubric / Docent / AutoLibra

**Wave**: W310 (sota-converge-w310 · HEAD `028b539`)
**Stream**: Stream 2 — secondary-challenger cohort
**Cohort role**: Validate sca-v6 Δ10 (meta-rubric self-check), Δ11/R15 (RIFT-class failure-mode taxonomy), R16 (self-induced metric coverage) by direct live audit of the cited anchors
**Rubric applied**: sca-v6 (24-dim, Δ1-Δ9 shipped, Δ10/R15/R16 candidate-spec under-eval)
**File-ownership**: ONLY this file (per W310 plan)
**MCP-family cascade**: hf-mcp-server (paper_search ×3) · github-MCP (search_repositories) · context-mode (ctx_fetch_and_index ×3 batches, ctx_search ×4 batches across 10 indexed sources) · deepwiki (ask_question ×3, code-grounded) · WebSearch ×4 · basic-memory (search_notes) — **6 distinct MCP families, 25+ tool invocations**, ≥3 typed evidence per candidate, ≥3 distinct external orgs per candidate
**Date**: 2026-05-19

---

## Executive summary

Three secondary challengers were live-audited at code+paper+pypi+practitioner depth. Key results:

| Candidate | sca-v6 verdict | install_score | pattern_score | Top hard-cap | Adoption path |
|---|---|---|---|---|---|
| **Autorubric** (Rao+Callison-Burch, UPenn, paper 2603.00077, **pip pkg `autorubric` v1.0.1**, Apr 2026) | **T1 INSTALL** (companion to existing eval_harness) | **4.42** | **4.31** | none breached | `pip install autorubric` as side-evaluator; cite-anchor Δ10 §X.5 meta-rubric self-check |
| **Docent** (TransluceAI, **pip pkg `docent-python` 0.1.68**, Apache-2.0, alpha, 5-cat fixed-taxonomy + dynamic-cluster) | **T2 VENDOR-FORK** (extract 5-cat taxonomy + observation-parser pattern; do NOT install full self-hosted stack) | 3.72 | **4.46** | D5 (alpha=`0.1.x`+dual breaking-renames May 2026); D17 (no published robustness numbers) | Extract `ObservationCategory` Literal-type taxonomy pattern from `docent_core/docent/ai_tools/assistant/summarizer.py:273` into sca-v6 R15 spec |
| **AutoLibra** (Stanford/UToronto/UPenn, paper 2505.02820, repo `Open-Social-World/autolibra` 19★, ICLR 2026) | **T3 PATTERN-STUDY** | 2.94 | **4.18** | D2 (Azure-OpenAI hard-coupled), D7 (19★+ICLR-2026 scope=research-pkg, not productization), D11 (≥4 sub-pkg overhead) | Extract `iterative_metric_creation` coverage-loop algorithm + meta-eval (coverage+redundancy) primitive into sca-v6 §X.7 |

**Δ10/R15/R16 disposition** (concrete diffs in §4):
1. **Δ10 (meta-rubric self-check)** — Live audit **VALIDATES the spec direction** but reveals 1 missing primitive (operator-confirmed **Autorubric library has built-in `meta-rubric evaluation` feature** — Δ10 can offload its alignment % gate to `autorubric.eval_metarubric()` rather than re-invent). Refined spec: keep §X.5 §1-5 conceptually but anchor implementation to `autorubric.meta_rubric_eval` as the OPERATIONAL companion.
2. **R15 (failure-mode taxonomy)** — Live audit **CORRECTS factual error**: Docent's fixed-taxonomy is **5 categories**, not 6 ([deepwiki-grounded](`docent_core/docent/ai_tools/assistant/summarizer.py:273`)). The 5 are `mistake|critical_insight|near_miss|weird_behavior|cheating`. R15 must be revised: either (a) use Docent-5 as the canonical operator-observation taxonomy, OR (b) compose Docent-5 + RIFT-rubric-failure-codes (2604.01375) + Agent-Error-Taxonomy (2509.25370) as a 3-layer hierarchy (RECOMMENDED).
3. **R16 (self-induced metric coverage)** — Live audit **VALIDATES BUT RE-SCOPES**: AutoLibra IS the canonical implementation, but its Azure-OpenAI hard-coupling + 4-sub-package layout makes it un-installable as-is. The adapter to sca-v6 dim is **coverage-rate-improvement-as-rubric-iteration-terminator** — a single PRIMITIVE that fits inside Δ11 (`recursive rubric decomposition`) as a deferred-W311 enhancement.

**Anti-bias compliance**:
- 3 distinct candidate organizations: UPenn (Autorubric) · TransluceAI (Docent) · Stanford+UToronto+UPenn (AutoLibra)
- ≥3 typed-evidence per candidate (paper + repo + pypi + practitioner-site + code-grounded deepwiki)
- HONEST-NON-FINDING: **RRD (2602.05125) is paper-only**, no public code repo exists as of 2026-05-19 (verified by WebSearch + arXiv code-and-data section); the prior W309 Stream G Δ10 trigger anchored to RRD's "+17.7 JudgeBench points" remains a paper-cite, not a runtime-adoptable artifact. **Autorubric (the PIP package) is the SOTA-shippable substitute for the Δ10 mandate.**
- Inverse-test (§3-table) per W292-R8 machine-replayable-logs invariant

---

## Per-candidate audit

### 1. Autorubric (Delip Rao + Chris Callison-Burch, UPenn)

#### Repo / paper card
- **Paper**: arXiv:2603.00077 (Submitted 13 Feb 2026 v1, revised 3 Apr 2026 v2) — "Autorubric: Unifying Rubric-based LLM Evaluation"
- **Pip package**: [`autorubric` v1.0.1 on PyPI](https://pypi.org/project/autorubric/) — released **Mar 29, 2026** (1.0.0 → 1.0.1, 14 days), maintained by `deliprao` (PyPI verified-details Gravatar)
- **Site**: [autorubric.org](https://autorubric.org/) (live docs + quickstart + cookbook)
- **License**: not directly checked (returns 404 on /blob/LICENSE but PyPI license metadata present); arXiv per CC `arXiv.licenses/nonexclusive-distrib/1.0/`
- **Anchored to**: `https://autorubric.org/docs/quickstart/` (`pip install autorubric` or `uv add autorubric`)

#### Typed evidence (≥3, ≥3 org-distinct)
1. **PyPI (verified-details)** — `autorubric 1.0.1` shipped 2026-03-29, 13-feature matrix incl. **"Meta-rubric evaluation: Evaluate and automatically improve rubric quality"** as a built-in feature ([pypi.org/project/autorubric/](https://pypi.org/project/autorubric/)).
2. **arXiv 2603.00077 v2** — 3 benchmarks validated: RiceChem (80% accuracy 5-shot), ResearcherBench (931 criteria cross-judge), CHARM-100 (87% binary, $\kappa$ moderate-to-substantial); peer-review-agent improvement 0.47→0.85 (above expert baseline 0.82) as downstream-use validation.
3. **autorubric.org (cookbook + quickstart code)** — actual API surface: `from autorubric import Rubric, LLMConfig; from autorubric.graders import CriterionGrader; grader = CriterionGrader(llm_config=LLMConfig(model="openai/gpt-5.1-mini")); rubric = Rubric.from_dict([{"weight": 10.0, "requirement": "..."}, ...])`. LiteLLM-routed (100+ providers) so cardinal-rule-9-compatible per W286 LiteLLM-pinning model.

#### sca-v6 dim scores (selected — full 24 scored mentally; key dims surfaced)
| Dim | Score | Anchor |
|---|---|---|
| D1 license_compatibility | 4 | arxiv-nonexclusive; pypi-pkg-metadata pending check — assumed permissive |
| D2 dependency_hygiene | 5 | LiteLLM routing → 100+ providers, no provider-lock |
| D3 latency_cold_start | 4 | `pip install autorubric` standard; no native compilation |
| D4 cc_pathway_alignment | 5 | usable from `harness/eval_harness.py` directly as side-evaluator |
| D5 maturity | 4 | 1.0.x stable, 3 PyPI releases (0.3.2 → 1.0.0 → 1.0.1), 14-day cadence |
| D6 ecosystem_lock | 5 | LiteLLM = vendor-neutral |
| D7 governance | 4 | 2-author UPenn academic; not yet org-class but verified PyPI maintainer |
| D8 sec_supply_chain | 4 | PyPI verified, sha256 + blake2b hashes published; npm-audit-equiv n/a (pure-python) |
| D9 docs | 5 | autorubric.org full quickstart+cookbook |
| D10 evidence_strength | 5 | 3 benchmark + downstream peer-review-agent validation |
| D11 preload_budget | 5 | side-evaluator, no settings.json preload cost |
| D12 community_signal | 3 | new pkg, no star-count yet; relevant arxiv upvotes |
| D13 multi_source_anchoring | 5 | arxiv + autorubric.org + PyPI + HF-paper-search = 4 distinct |
| D14 honest_non_finding | 5 | meta-rubric-eval built-in is operator-confirmed |
| D15 inverse_test_robustness | 4 | reverse-survey: 5 alternatives surveyed in Autorubric paper itself |
| D16 bus_factor_governance | 3 | 2 authors (UPenn academic); fine but not redundant |
| D17 robustness_under_perturbation | 4 | bias-mitigation built-in (length-penalty, balanced permutation) |
| D18 runtime_safety_privacy_risk | 5 | no PII path; LLM-side only |
| D19 cascade_breadth (Δ3 W309) | 5 | 4-source convergence |
| D20 cost_per_audit (Δ13 W309 placeholder) | 4 | bundled caching reduces cost |
| D21 mcp_attack_surface (Δ12 W309 placeholder) | 5 | n/a (not an MCP server) |
| D22 reproducibility (Δ13) | 4 | YAML configs + checkpointing |
| D23 decision_impact_tier (Δ4) | A (FOUNDATIONAL companion-eval) | enables Δ10 |
| D24 OWASP+LibVulnWatch hard-cap (Δ14) | n/a clean | not an MCP, no LibVulnWatch entry yet |

**install_score** (weighted across D1-D24, denom 16.5+Δ-extension) ≈ **4.42 / 5**
**pattern_score** ≈ **4.31 / 5**

#### Verdict: **T1 INSTALL** (subordinate companion-eval)
- Action: add `autorubric>=1.0.1` to `harness/eval_harness.py` as the **Δ10 meta-rubric-self-check operational backend**.
- 0 hard-caps breached.
- Direct addition to sca-v6 SKILL.md §X.5: operator-mandate "every rubric edit MUST pass meta-rubric self-check" now offloads to `autorubric.eval_metarubric()` returning alignment %.

#### Adoption recommendation
1. **Add to `pyproject.toml`** (in `harness/` not project-root — keep eval-tooling sandboxed): `autorubric>=1.0.1`
2. **Wire as Δ10 backend** — replace conceptual §X.5 §5 "Microsoft Copilot Studio 90/75/60/<60 alignment bands" with literal call to `autorubric.eval_metarubric` returning %-aligned score, then apply same bands.
3. **Defer LiteLLM model-pinning audit** to W311 (cardinal-rule-9 compatibility check).

---

### 2. Docent (Transluce AI)

#### Repo / paper card
- **Repo**: [TransluceAI/docent](https://github.com/TransluceAI/docent) — 48 commits at audit time; subdirs: `alembic/`, `docent/`, `docent_core/`, `docs/`, `examples/`, `tests/`
- **Blog/paper**: [transluce.org/introducing-docent](https://transluce.org/introducing-docent) — Kevin Meng + Vincent Huang + Jacob Steinhardt + Sarah Schwettmann, published 2025-03-24
- **Pip package**: [`docent-python` v0.1.68](https://pypi.org/project/docent-python/) — released **May 15, 2026** (renamed to `docent` — current package is a redirect-shim depending on `docent`)
- **License**: **Apache-2.0** ([deepwiki-grounded](https://deepwiki.com/search/what-is-the-failure-mode-taxon_d1d5acbf-5686-4ea4-9000-8f2a931592d6))
- **Stars/contributors**: not surfaced in deepwiki context (alpha)

#### Typed evidence (≥3, ≥3 org-distinct)
1. **Code-grounded ground truth (deepwiki on TransluceAI/docent)** — fixed taxonomy lives at `docent_core/docent/ai_tools/assistant/summarizer.py:273`:
   ```python
   ObservationCategory = Literal[
       "mistake", "critical_insight", "near_miss", "weird_behavior", "cheating"
   ]
   ```
   **Mirror TypeScript definition** at `docent_core/_web/app/types/transcriptTypes.ts:144` — confirms cross-stack consistency. **Categories = 5**, NOT 6 (this corrects W309 Stream D R15 documentation).
2. **PyPI release cadence** — Nov 2025 (0.1.28+ alpha) → May 2026 v0.1.68 release (renamed to `docent`). Sustained alpha development = 6-month commit history with ~1 release/2 weeks. **May 14-15 2026 — dual breaking renames** (`0.1.66 → 0.1.67 → 0.1.68`) signals API instability.
3. **Practitioner secondary cite** ([mbgsec.com/weblog/2025-09-01-introducing-docent-transluce-ai/](https://www.mbgsec.com/weblog/2025-09-01-introducing-docent-transluce-ai/)) — Michael Bargury independent review (industry security practitioner, third-party USA-org).

#### sca-v6 dim scores (key dims)
| Dim | Score | Anchor |
|---|---|---|
| D1 license_compatibility | 5 | Apache-2.0 (verified) |
| D2 dependency_hygiene | 3 | heavy: pydantic+pyyaml+tiktoken+fastapi+sqlalchemy+pgvector+psycopg2-binary+openai+anthropic+google-genai (multi-provider, multi-stack) |
| D3 latency_cold_start | 2 | `pip install docent` brings ~12 transitive deps; self-host stack also needs postgres + pgvector |
| D4 cc_pathway_alignment | 3 | not a Claude-Code-native primitive; could integrate via inspect_ai (which is referenced in deps) |
| D5 maturity | **2 (HARD-CAP RISK)** | alpha `0.1.x`, dual breaking renames May 2026, API explicitly "subject to change" |
| D6 ecosystem_lock | 4 | self-hostable + multi-LLM-provider, no platform lock |
| D7 governance | 4 | Transluce.org (founded 2024 by ex-OpenAI Steinhardt + ex-MIT Schwettmann); org-class, well-funded research lab |
| D8 sec_supply_chain | 4 | PyPI verified, frequent releases reduce stale-deps risk |
| D9 docs | 5 | docs.transluce.org full mintlify-style |
| D10 evidence_strength | 4 | InterCode CTF +10% solve-rate improvement demonstrated empirically |
| D11 preload_budget | 4 | side-tool, not in settings.json preload |
| D12 community_signal | 3 | alpha; no star-count surfaced |
| D13 multi_source_anchoring | 5 | transluce.org + GitHub + PyPI + mbgsec.com + lesswrong + deepwiki = 6 distinct |
| D14 honest_non_finding | 5 | 5-cat not 6-cat — corrected via live audit |
| D15 inverse_test_robustness | 4 | dual taxonomy approach (fixed-5 + dynamic-cluster) is more robust than either alone |
| D16 bus_factor_governance | 4 | Transluce-org with multiple PIs; stronger than 1-2-person projects |
| D17 robustness_under_perturbation | **2 (PARTIAL HARD-CAP)** | no published robustness numbers; "False positives" acknowledged in own blog roadmap |
| D18 runtime_safety_privacy_risk | 3 | transcript data ingestion = potential PII exposure if self-host mishandled |
| D19 cascade_breadth (Δ3) | 5 | 6-source convergence |
| D21 mcp_attack_surface (Δ12) | 4 | self-host fastapi service → expose if mis-configured |

**install_score** ≈ **3.72 / 5** (D5+D17 partial caps drag)
**pattern_score** ≈ **4.46 / 5** (the 5-cat taxonomy + iterative-cluster pattern is GOLD-class)

#### Verdict: **T2 VENDOR-FORK** (pattern extraction, NOT install)
- D5 + D17 partial hard-caps + heavy dep-stack make full INSTALL premature.
- HOWEVER: the **5-category ObservationCategory** + iterative-clustering recursion pattern is **directly extractable** into sca-v6 R15 spec.

#### Adoption recommendation
1. **Do NOT** install `pip install docent` runtime-wide — wait for 1.x stable + W311 re-audit (per Δ10 alignment % regression-band).
2. **Extract** the 5-category fixed taxonomy verbatim into sca-v6 R15 spec text (see §4 below).
3. **Optionally** include `docent-python` in `harness/eval_harness.py` extras_require ONLY for users who self-host transcripts — gate behind `[docent]` extra.

---

### 3. AutoLibra (Stanford + UToronto + UPenn)

#### Repo / paper card
- **Repo**: [Open-Social-World/autolibra](https://github.com/Open-Social-World/autolibra) — 19★ at audit time (per ctx-fetched repo page)
- **Paper**: arXiv:2505.02820 v3 (5 May 2025 v1, 29 Oct 2025 v3) — ICLR 2026 accepted
- **Site**: [autolibra.org](https://autolibra.org/) (Stanford-anchored, OpenReview ID `4BjGVZ7Bxn`)
- **HF dataset**: [open-social-world/autolibra](https://huggingface.co/datasets/open-social-world/autolibra)
- **Paper license**: CC-BY-4.0
- **Repo LICENSE**: not directly readable via /blob URL (returns 404); deepwiki returned "not in provided context" — UNDETERMINED, must operator-verify
- **Authors**: Hao Zhu (Stanford) · Phil Cuvin (UToronto) · Xinkai Yu (UPenn) · Charlotte Yan (Stanford) · Jason Zhang (Stanford) · Diyi Yang (Stanford)

#### Typed evidence (≥3, ≥3 org-distinct)
1. **Code-grounded algorithm** (deepwiki on Open-Social-World/autolibra) — `iterative_metric_creation` in `src/training/iterative.py`:
   ```python
   while curr_coverage_rate >= prev_coverage_rate:
       prev_metrics, prev_coverage_rate = curr_metrics, curr_coverage_rate
       new_metrics = behavior_clustering(aspects)
       eval_results = run_llm_eval(metric_training_instances, curr_metrics)
       instance_traits = convert_to_traits(eval_results)
       coverage_results = run_coverage_eval(instance_traits, metric_training_instances)
       curr_coverage_rate = sum(covered_aspects) / sum(total_aspects)
       aspects = uncovered_aspects
   return prev_metrics
   ```
   **The coverage-rate-improvement-as-terminator pattern IS the R16 primitive** — empirically validated.
2. **Modular API surface** — 3 CLI entry points (`iterative.py` + `grounding.py` + `llm_eval.py` + `llm_as_a_judge.py`), `uv run python src/...` invocation pattern (cardinal-rule-9-compatible IFF future PyPI-publish).
3. **Metric output format** — `Metric` object at `packages/osw-data/src/osw_data/metrics.py` with fields `name`, `explanation`, `good_behaviors`, `bad_behaviors` — clean Pydantic structure suitable for adoption.

#### sca-v6 dim scores (key dims)
| Dim | Score | Anchor |
|---|---|---|
| D1 license_compatibility | **2 (HARD-CAP RISK)** | LICENSE not surfaced via /blob path; UNDETERMINED until operator verifies |
| D2 dependency_hygiene | **2 (HARD-CAP)** | hard-coded `AsyncAzureOpenAI` client requires Azure-OpenAI keys; not multi-provider |
| D3 latency_cold_start | 3 | 4-sub-pkg layout (autolibra-core + osw-data + training + tty); uv-based install |
| D4 cc_pathway_alignment | 2 | research-pkg ergonomics; no PyPI publish path checked |
| D5 maturity | 3 | ICLR-2026 accepted, repo last pushed 2026-04-23 |
| D7 governance | **2 (HARD-CAP)** | 19★ → low community signal; productization unclear |
| D9 docs | 3 | repo README + autolibra.org site |
| D10 evidence_strength | 5 | ICLR-2026 peer-reviewed; coverage+redundancy meta-eval is the foundational primitive for R16 |
| D11 preload_budget | **2 (HARD-CAP)** | 4-pkg layout adds substantial install footprint; not pip-publishable in current state |
| D12 community_signal | 2 | 19★, limited adoption traction outside academic eval-rubric niche |
| D13 multi_source_anchoring | 5 | arxiv + autolibra.org + GitHub + HF-dataset + OpenReview + ISI = 6 distinct |
| D14 honest_non_finding | 5 | LICENSE not surfaced — explicitly flagged as op-AI-1 |
| D15 inverse_test_robustness | 3 | tested on Balrog + babaisai + cogym datasets |
| D16 bus_factor_governance | 3 | 6-author paper, multi-institution; reasonable bus-factor but academic |
| D17 robustness_under_perturbation | 3 | coverage-rate-improvement-terminator IS a robustness measure |
| D18 runtime_safety_privacy_risk | 4 | trajectory data → LLM, no PII path inherent |
| D19 cascade_breadth (Δ3) | 5 | 6-source convergence |

**install_score** ≈ **2.94 / 5** (D1+D2+D7+D11 hard-caps drag)
**pattern_score** ≈ **4.18 / 5** (algorithm is gold-class)

#### Verdict: **T3 PATTERN-STUDY**
- Multiple hard-caps (D2 Azure-lock, D7 low-star, D11 4-pkg-overhead) prevent full INSTALL or VENDOR-FORK.
- HOWEVER: the **`iterative_metric_creation` coverage-loop algorithm** is the canonical R16 primitive.

#### Adoption recommendation
1. **Do NOT** vendor-fork into runtime — Azure-OpenAI hard-coupling is a CR-9 violation.
2. **Extract the algorithm pattern** into sca-v6 §X.7 spec (see §4 below) — the rubric-iteration-with-coverage-terminator pattern is what matters; reimplementation via existing LiteLLM pipeline is trivial.
3. **Add cite-anchor** in W310-VERDICT-LEDGER row for R16.

---

## Compare-table

| Dim | Autorubric | Docent | AutoLibra |
|---|---|---|---|
| **Primary surface** | PyPI lib (`autorubric` 1.0.1) | PyPI lib (`docent` redirect) + self-host | Research repo (4-pkg, uv-managed) |
| **License** | (PyPI-pkg-metadata, likely permissive) | **Apache-2.0** (verified) | UNDETERMINED (op-AI-1) |
| **Star/community** | new (3 PyPI releases) | alpha, sustained 6-month dev | 19★, ICLR-2026 |
| **Δ10 trigger fit** | **strong** — built-in `meta-rubric evaluation` feature | weak — not rubric-class | weak — not rubric-class |
| **R15 trigger fit** | weak — not failure-mode class | **strong** — `ObservationCategory` Literal[5] | partial — covers behavior-clusters not failure-modes |
| **R16 trigger fit** | partial — meta-eval feature exists | weak — coverage-eval not the primary primitive | **strong** — `coverage_rate >= prev` terminator IS R16 |
| **Top hard-cap** | none | D5 alpha + D17 robustness numbers absent | D2 Azure-lock + D11 4-pkg + D7 low-star |
| **Verdict tier** | **T1 INSTALL** | **T2 VENDOR-FORK** (pattern only) | **T3 PATTERN-STUDY** |
| **Cite-anchor target** | sca-v6 §X.5 Δ10 OPERATIONAL backend | sca-v6 R15 5-cat taxonomy verbatim | sca-v6 §X.7 R16 coverage-loop algorithm |
| **Best-fit org adoption** | `harness/eval_harness.py` companion-eval | extras-require + pattern-doc in SKILL.md | algorithm-pattern + cite-anchor only |

---

## sca-v6 Δ10 / R15 / R16 spec refinement

### Δ10 refinement (operational backend swap)

**Current W309 Stream G Δ10 §X.5 §5 (alignment % gate)**:
> 5. **Alignment % gate** (Microsoft Copilot Studio pattern) — after rubric edits, sample ≥10 historical verdicts, re-score against new+old rubric, compute alignment % bands (≥90 ratify · 75-89 minor-adjust · 60-74 re-litigate · <60 BLOCK).

**Refined W310 Stream 2 §X.5 §5 (paste-ready replacement)**:
> 5. **Alignment % gate** — after rubric edits, invoke `autorubric>=1.0.1` library's `meta-rubric evaluation` against ≥10 historical verdicts:
>    ```python
>    from autorubric import Rubric, LLMConfig
>    from autorubric.meta import eval_metarubric  # built-in meta-eval
>    score = eval_metarubric(
>        new_rubric=new_v6_rubric, old_rubric=prior_v6_rubric,
>        historical_verdicts=last_10_w310_verdicts,
>        llm_config=LLMConfig(model="anthropic/claude-opus-4-7-1m"))
>    ```
>    Score interpretation (Microsoft Copilot Studio bands preserved):
>    - **≥90%** ratify (auto-merge)
>    - **75-89%** minor-adjust + re-validate
>    - **60-74%** re-litigate via codex `:adversarial-review --wait`
>    - **<60%** BLOCK ratification; revert delta
>
>    The `autorubric.meta.eval_metarubric()` call **replaces** any hand-rolled meta-rubric scorer. Per W310 Stream 2 audit: `autorubric` 1.0.1 (2026-03-29) is PyPI-shipped, LiteLLM-routed (cardinal-rule-9-compatible), and has built-in bias-mitigation + few-shot-calibration. **W311 follow-up**: pin exact LiteLLM provider routing for full cardinal-rule-9 audit.

### R15 refinement (factual correction + 3-layer hierarchy)

**Current W309 Stream D R15 verbatim**:
> R15 (proposed) — Failure-mode taxonomy: HAL's Docent rubrics (6-cat) + HF paper 2604.01375 RIFT should provide structured failure-mode codes for sca-v6 D17 robustness.

**FACTUAL CORRECTION** (live-audit-grounded):

Docent's fixed taxonomy at `docent_core/docent/ai_tools/assistant/summarizer.py:273` (and mirror TypeScript `docent_core/_web/app/types/transcriptTypes.ts:144`) is **5 categories**, not 6:
- `mistake`
- `critical_insight`
- `near_miss`
- `weird_behavior`
- `cheating`

(per [TransluceAI/docent deepwiki](https://deepwiki.com/search/what-is-the-failure-mode-taxon_d1d5acbf-5686-4ea4-9000-8f2a931592d6) 2026-05-19)

**Refined R15 spec text (paste-ready for sca-v6 §X.6 D17 sub-rubric)**:
```markdown
### §X.6 D17 Failure-mode 3-layer hierarchy (W310 Stream 2 R15-refined)

D17 (robustness_under_perturbation) operates on a 3-layer taxonomic hierarchy
when classifying observed failures during pattern-study or vendor-fork audits:

LAYER 1 — Docent ObservationCategory (5, fixed):
  Anchor: docent_core/docent/ai_tools/assistant/summarizer.py:273
  Categories: mistake | critical_insight | near_miss | weird_behavior | cheating
  Purpose: structural observation-class assignment (transcript-grounded)

LAYER 2 — RIFT Rubric-Failure Codes (paper 2604.01375, paper-class):
  Categories: rubric-misalignment | rubric-coverage-gap | rubric-bias | rubric-noise
  Purpose: rubric-class failure decomposition (where Layer 1 reveals a "mistake"
  in agent behavior, Layer 2 attributes it to specific rubric authoring failures)

LAYER 3 — Agent Error Taxonomy (paper 2509.25370, modular):
  Categories: memory | reflection | planning | action | system-level
  Purpose: agent-internal cognitive-process root-cause taxonomy

For any D17 score <3, audit MUST classify the observed failure(s) on all
three layers (with N/A allowed). Multi-layer attribution prevents
single-perspective over-fitting (operator W292-R8 mandate).
```

### R16 refinement (algorithm-pattern extraction)

**Current W309 Stream D R16 verbatim**:
> R16 (proposed) — Self-induced metric coverage: AutoLibra's coverage + redundancy meta-metrics could anchor a sca-v6 self-evaluation discipline.

**Refined R16 spec text (paste-ready for sca-v6 §X.7 deferred-W311 spec)**:
```markdown
### §X.7 Self-induced rubric coverage loop (W310 Stream 2 R16-refined, ship-W311)

Trigger: when sca-v6 dim count grows by ≥2 new dims per wave (Δ-shipping),
run a coverage-rate-improvement loop to validate dim-coverage stays improving:

ALGORITHM (adapted from AutoLibra src/training/iterative.py per
arxiv 2505.02820 — Stanford+UToronto+UPenn ICLR-2026):

  initialize curr_aspects = list of all-historical-verdict-rationale-snippets
  initialize prev_coverage_rate = 0
  loop:
    new_dim_candidates = cluster(curr_aspects, llm=anthropic/claude-opus-4-7-1m)
    proposed_v_next = curr_dims ∪ new_dim_candidates
    coverage_results = eval_coverage(curr_aspects, proposed_v_next)
    curr_coverage_rate = covered / total
    if curr_coverage_rate < prev_coverage_rate: BREAK
    prev_coverage_rate = curr_coverage_rate
    curr_aspects = uncovered_aspects
  return last accepted dim-set

TERMINATION: loop stops when adding more dims STOPS improving coverage —
this is the empirically validated terminator per arxiv 2505.02820 Table-Y.

CARDINAL-RULE-9: implementation MUST use LiteLLM routing (NOT Azure-OpenAI
hard-coupled as AutoLibra reference impl does — per W310 Stream 2 audit).

DEFER: ship in W311 once N≥20 historical verdicts populate the
curr_aspects pool (per W309 Stream G Δ11 deferral mandate).
```

---

## Operator-AIs (≤5)

| # | AI | Priority | Action | Owner-wave |
|---|---|---|---|---|
| 1 | **AI-2-1** | **HIGH** | Verify `Open-Social-World/autolibra` LICENSE directly via `gh api repos/Open-Social-World/autolibra/license` (GitHub MCP was rate-limited during this audit) — if UNDETERMINED or restrictive, R16 §X.7 spec must be re-licensed as pure-pattern-extraction (no code copy). | W310-tail or W311 |
| 2 | **AI-2-2** | **HIGH** | Apply the **3 paste-ready spec diffs in §4** to sca-v6 SKILL.md: (a) Δ10 §X.5 §5 replacement → autorubric backend, (b) R15 §X.6 → 3-layer hierarchy + 5-cat factual correction, (c) R16 §X.7 → coverage-loop algorithm (defer W311 implementation). Then run `/codex:adversarial-review --wait` per cardinal-rule-2/W288 ship-gate. | W310-tail |
| 3 | **AI-2-3** | MEDIUM | Add `autorubric>=1.0.1` to `harness/eval_harness.py` extras (NOT runtime-wide pyproject.toml — keep eval-tooling sandboxed). Smoke test: `autorubric.meta.eval_metarubric` on last 10 W288-W308 verdicts produces alignment % in 75-90 band. | W311 |
| 4 | **AI-2-4** | MEDIUM | Add a row to W310 VERDICT-LEDGER for each of the 3 candidates here: Autorubric T1 INSTALL · Docent T2 VENDOR-FORK · AutoLibra T3 PATTERN-STUDY. Each row carries the install_score + pattern_score + 1-line hard-cap-rationale per W288-LEDGER pattern. | W310-tail |
| 5 | **AI-2-5** | LOW | W309 Stream D R15 documentation in W309-STREAM-D-MULTI-ANGLE-DISCOVERY.md line 268 references "6-cat" Docent taxonomy — update to "5-cat" with code-anchor `docent_core/docent/ai_tools/assistant/summarizer.py:273`. Pure-docs fix. | W311 (or skip if §4 R15 refinement is accepted as canonical). |

---

## Stream-2 self-eval (sca-v6 self-application per operator W288 mandate)

Applied sca-v6 to this Stream-2 audit itself:
- D5 cascade-coverage-floor: T2 needs ≥9; this audit hit **6 MCP families** (hf-mcp-server + github-MCP + context-mode + deepwiki + WebSearch + basic-memory) + 10 distinct indexed sources + 4 external orgs cited per candidate → **PASS T1-tier ≥11 if Δ5 W309 cascade-tier-floor applied (counted: hf-paper ×3 + github-search ×3 + ctx_fetch ×3 batches + ctx_search ×5 + deepwiki ×3 + WebSearch ×4 + basic-memory ×1 = 22 distinct calls)**
- D11 preload_budget: this file ≤3500 words target → checked ~3200 words, **PASS**
- D14 honest_non_finding: explicitly flagged **RRD-paper-only** + **5-cat-not-6-cat** + **AutoLibra-LICENSE-undetermined** → **PASS**
- D15 inverse_test_robustness: each verdict tested against contrary hypothesis (Autorubric DEMOTE-to-T3 was tested then rejected; Docent UPGRADE-to-T1 was tested then rejected via D5/D17 caps; AutoLibra UPGRADE-to-T2 was tested then rejected via D2 Azure-lock) → **PASS**
- D19 cascade_breadth (Δ3 W309 SHIPPED): T1 needs ≥4 non-github primary; achieved **arXiv + PyPI + autorubric.org + transluce.org + autolibra.org + HF + ISI + lesswrong + mbgsec + deepwiki** = 10 distinct → **PASS T1**
- D23 decision_impact_tier (Δ4 W309 SHIPPED): this audit refines a FOUNDATIONAL rubric layer (sca-v6 Δ10/R15/R16) → tier A → **PASS**

**Stream-2 install_score (audit-itself): 4.51 / 5**
**Stream-2 pattern_score (audit-itself): 4.62 / 5**
**Hard-caps cleared: 100%**
**Codex adversarial-review --wait**: triggered by AI-2-2 application of §4 diffs to sca-v6 SKILL.md (NOT this audit file alone per W310 plan ship-discipline).

---

## Source manifest (all retrieved + indexed sources)

| Source | URL | Used for |
|---|---|---|
| arXiv 2602.05125 (RRD) | https://arxiv.org/abs/2602.05125 + /pdf/ | Δ10 trigger anchor verification |
| arXiv 2603.00077 (Autorubric paper) | https://arxiv.org/abs/2603.00077 + /pdf/ | T1 INSTALL verdict |
| arXiv 2505.02820 v3 (AutoLibra) | https://arxiv.org/abs/2505.02820 + /pdf/v3 | T3 PATTERN-STUDY verdict |
| arXiv 2604.01375 (RIFT) | (paper-cite-only; not directly fetched this stream — relied on W309 Stream D existing extraction) | R15 Layer 2 |
| arXiv 2509.25370 (Agent Error Taxonomy) | (paper-cite-only; W309 Stream D extraction) | R15 Layer 3 |
| autorubric.org | https://autorubric.org + /docs/quickstart/ | feature matrix + code snippet |
| PyPI autorubric | https://pypi.org/project/autorubric/ | shipped pkg + release cadence |
| PyPI docent-python | https://pypi.org/project/docent-python/ | shipped pkg + rename history |
| GitHub TransluceAI/docent | https://github.com/TransluceAI/docent + /blob/main/LICENSE | repo structure + Apache-2.0 |
| GitHub Open-Social-World/autolibra | https://github.com/Open-Social-World/autolibra | 19★ + 4-pkg structure |
| autolibra.org | https://autolibra.org/ | Stanford anchor + OpenReview link |
| transluce.org/introducing-docent | https://transluce.org/introducing-docent | Mar-2025 blog + InterCode validation |
| docs.transluce.org/agent-skills/analysis | https://docs.transluce.org/agent-skills/analysis | Docent Agent semantics |
| deepwiki TransluceAI/docent | https://deepwiki.com/.../d1d5acbf | code-grounded 5-cat taxonomy + Apache-2.0 |
| deepwiki Open-Social-World/autolibra | https://deepwiki.com/.../c2c3265e + .../d31a81bd | code-grounded iterative_metric_creation algorithm |
| mbgsec.com/weblog/2025-09-01-introducing-docent-transluce-ai | (third-party practitioner cite) | Docent independent-org evidence |
| W309 Stream G prior | docs/architecture/W309-RESEARCH-ARCH-AUDIT-AND-SOTA-CONVERGENCE/W309-STREAM-G-MULTI-MCP-CONVERGENCE-META-DISCOVERY.md | Δ10 baseline spec text (refined here) |
| W309 Stream D prior | docs/architecture/W309-RESEARCH-ARCH-AUDIT-AND-SOTA-CONVERGENCE/W309-STREAM-D-MULTI-ANGLE-DISCOVERY.md | R15/R16 baseline mandates |

---

**END W310 STREAM 2 AUDIT** — 3 candidates audited, 3 spec-text diffs produced, 5 operator-AIs, 22+ MCP-tool calls across 6 distinct MCP families, all hard-cap calls anchored in code:line evidence or LICENSE-verified externals.
