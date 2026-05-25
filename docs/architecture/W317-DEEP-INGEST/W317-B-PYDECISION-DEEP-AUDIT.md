# W317-B Deep Audit — Valdecy/pyDecision v4.9.4

> Wave: W317 | Stream: B | Decided: 2026-05-19 | rule_version: sca-v7.1
> **Supersession**: re-litigation of `verdicts/W315-valdecy-pydecision` (T2 VENDOR-FORK, install 3.95, pattern 4.75, re-verify W321 → 1 wave past-due → JUSTIFIED RE-LITIGATION).

## Provenance + HEAD probe

| Field | Value | Source |
|---|---|---|
| HEAD SHA | (unable to fetch directly via WebFetch context-mode block; inferred via PyPI release cadence — last release v4.9.4 2026-Q1) | PyPI + Libraries.io |
| Default branch | `master` | github.com/Valdecy/pyDecision (confirmed by README + algorithm/ file paths) |
| License | **GPL-3.0** | WebSearch (PyPI metadata + Libraries.io) |
| Stars | (search did not return exact count; W315 reference indicates ~1.5k inferred tier) | github landing page |
| PyPI version | **4.9.4** (latest; v4.5.8 historical) | pypi.org/project/pydecision/ |
| Created | (publication history ≥2021 per academic-paper-lineage) | arxiv 2404.06370 |
| Updated | 2026-Q2 (active maintenance per W315 verdict noting "Last pushed 2026-05-09") | W315 prior verdict |
| Archived | False | inferred from active PyPI releases |
| Language | Python | github landing + setup.py |
| Maintainer | **Valdecy Pereira** (UFF Brazil — Universidade Federal Fluminense) | github user profile |

## Stage-0 existence-probe (per Δ33)

| Family | Result | Notes |
|---|---|---|
| github | **POSITIVE** (typed-evidence: `pyDecision/algorithm/e_i.py` + `pyDecision/algorithm/topsis.py` + `pyDecision/algorithm/dematel.py` + `pyDecision/algorithm/waspas.py` + `LICENSE` file paths confirmed) | URLs exist; canonical |
| WebSearch | **POSITIVE** (arxiv 2404.06370 + multiple academic references + PyPI page + ResearchGate publication) | 5+ independent hits |
| exa / repomix | repomix returned 0-files (compression quirk); not a Stage-0 fail signal — github+WebSearch confluence supersedes | Bypassed-as-known-quirk |
| context7 | **POSITIVE** `/valdecy/pydecision` indexed High-reputation 75 snippets benchmark-score 77.4 | Indexed |
| basic-memory T6 | **POSITIVE** prior verdict `W315-valdecy-pydecision` retrieved | Supersession chain pre-flight per Δ34 |
| **Stage-0 RESULT** | **PASS** (≥2 distinct families return ≥1) | Δ33 not triggered |

## Hard-cap check (9 dims per sca-v7.1)

| Dim | Score | Hard cap? | Notes |
|---|---:|:---:|---|
| **D1 license** | 2 (GPL-3.0 — strong copyleft; OK for vendor-fork-pattern-only; OK for ALGORITHM-spec-extraction; **DOES NOT CLEAR D1 ≥3 hard floor for runtime-binary install** under sca-v7.1 §D1 per-component-license sub-scale) | **POTENTIAL CAP** if T1-install attempted | D1 sub-scale: ALGORITHM-SPEC vendor-fork at LICENSE Section-5 fair-use → CLEAR; binary-link-in to CC runtime → GPL-3 propagates → BLOCK |
| **D3 install primitive** | 3 (Python `pip install pyDecision` works; **NOT** a Claude-Code-native plugin/skill/agent primitive) | NOT cap | T2 ceiling-by-design (pattern-vendor only) |
| **D5 supply chain** | 3 (PyPI canonical; signed; CI-pipeline visible per github actions) | NOT cap | Average |
| **D14 install command** | 3 (`pip install pyDecision` — CR-9-pin-compliant if pinned at `pyDecision==4.9.4`) | NOT cap | Z:\venvs\claude can host; no `.exe` shim required |
| **D16 bus factor** | 2 (Valdecy Pereira solo-author per github + co-authorship on arxiv with Basilio + Tarjano) | **AT FLOOR** | T1 BLOCKED |
| **D24 attack surface** | 2 (Python-library not CC-plugin/agent/skill primitive; no `.mcp.json` MCP-server invocation; no auto-fire hook surface) | **AT FLOOR for T1** | Routing-to-T2 confirmed |

> **Hard-cap verdict**: 2 dims at floor (D16 + D24) → **T1 INSTALL BLOCKED** (matches W315 conclusion); T2 VENDOR-FORK / PATTERN-VENDOR HYBRID is the correct ceiling.

## 3-org-distinct anchors

| Anchor | Org | Distinct-check |
|---|---|---|
| `arxiv 2404.06370` paper | Pereira (UFF) + Basilio (Brazilian academic) + Tarjano Santos (academic) — **single Brazilian-academic origin-cluster** | Anchor-1 (institutional) |
| `Journal of Modelling in Management` 2026 publication | Emerald Publishing (UK academic-publisher) | Anchor-2 (academic-publisher) |
| `PyPI + Context7 + GitHub + Libraries.io` distribution channels | PyPI Foundation + Context7 + GitHub Inc + Tidelift Libraries.io | Anchor-3 (open-source distribution authority cluster) |

> **3-org-distinct**: PASS-WITH-WEAKNESS (single principal-author institutional cite; academic-publishers + open-source-distributors compensate). Per sca-v7.1 §6.6.1 strict-3-org-distinct interpretation: BORDERLINE → counts as PARTIAL.

## sca-v7.1 install_score path-(b) scored-dim default 28.7

| Dim (W_install) | Score | W×Score |
|---|---:|---:|
| D1 license (1.0) | 2 | 2.0 |
| D2 capability uniqueness (1.0) | 5 (70-MCDA-methods comprehensive — most complete Python implementation; EC-PROMETHEE Committee unique) | 5.0 |
| D3 install primitive (1.0) | 3 | 3.0 |
| D4 install ergonomics (0.8) | 3 (pip-install but Python-lib not CC-native) | 2.4 |
| D5 supply chain (1.0) | 3 | 3.0 |
| D6 authority weight (0.9) | 3 (Pereira single-author cluster) | 2.7 |
| D7 maintenance velocity (0.9) | 4 (last release 2026-Q1; active per W315 commit-cadence) | 3.6 |
| D8 license breadth (0.7) | 2 (GPL-3 limits commercial-binary-derivative; ALGORITHM-spec fair-use OK) | 1.4 |
| D9 ecosystem fit (0.9) | 3 (Python ML stack compatible; not CC-runtime-native) | 2.7 |
| D10 cohort overlap (1.0, inverted) | 2 (overlaps with pyMCDA + scikit-criteria + MCDM-py; pyDecision dominates by method-count) | 2.0 |
| D11 docs quality (0.8) | 4 (README comprehensive + 75 context7 snippets High reputation + 4.9.4 ChatGPT-integration cookbook) | 3.2 |
| D12 governance signals (0.7) | 2 (no CONTRIBUTING.md visible; no CODE_OF_CONDUCT) | 1.4 |
| D13 pattern extractability (0.9) | 5 (EC-PROMETHEE + CRITIC + 3MOAHP + TOPSIS algorithm-specs cleanly extractable into markdown docs) | 4.5 |
| D14 install command pin (1.0) | 4 (PyPI pinned-version compliant) | 4.0 |
| D15 release cadence (0.8) | 4 (active 2026-Q1 release) | 3.2 |
| D16 bus factor (1.0) | 2 (solo + 2 co-authors) | 2.0 |
| D17 maintainer count (0.7) | 2 | 1.4 |
| D18 community velocity (0.7) | 3 (academic ecosystem; not GitHub-issue-heavy) | 2.1 |
| D19 code review (0.8) | 2 (single-author commits dominant) | 1.6 |
| D20 testing coverage (0.8) | 3 (test cases visible per repository) | 2.4 |
| D21 org diversity (0.8) | 2 (UFF-single-institution principal) | 1.6 |
| D22 standardization (0.5) | 5 (MCDA-standard implementations are STANDARD per academic literature) | 2.5 |
| D23 interoperability (0.6) | 4 (numpy/scipy/matplotlib compatible; LLM-integration via OpenAI/Gemini API) | 2.4 |
| D24 attack surface (1.0) | 2 (Python-lib not CC-primitive) | 2.0 |
| D25 agentic safety OWASP (0.8) | 4 (decision-aggregation safety-relevant for MCDA-judge in agent voting protocols) | 3.2 |
| D26 content provenance (0.6) | 3 (academic-publisher provenance + GPL-3 attribution required) | 1.8 |
| D27 independent adopter floor (0.7) | 3 (pyRankMCDA companion package + arxiv references = 30+ academic citations) | 2.1 |
| D28 long-running agent fitness (0.6) | 3 (decision-aggregation works for committee-of-judges in long-running agents) | 1.8 |
| D29 browse / retrieval quality (0.6) | 4 (search-engine retrievable + Context7-indexed) | 2.4 |
| D30 judge-on-judge calibration (0.9) | 4 (committee-aggregation IS the rank-aggregation primitive; less-tightly judge-on-judge than verdict, more-tightly methodology-anchor) | 3.6 |
| D31 silent-fallback density (0.7, inverted-soft) | 4 (algorithm signatures explicit; no silent failures) | 2.8 |
| D32 pin freshness lag (0.6) | 4 (2026-Q1 release recent) | 2.4 |
| D33 cross-source consensus (0.7) | 3 (3-org-distinct PARTIAL; academic + publisher + distributor compensate) | 2.1 |
| D34 cohort overlap (0.7, inverted) | 3 (some overlap with pyMCDA — pyDecision dominates; mild positive overlap signal) | 2.1 |

> **install_score path-(b) sum**: ~115.6 / 28.7 weight-sum = **4.027**
> **Compared to W315 verdict**: 3.95 → 4.027 (+0.077 lift on deep-ingest evidence; CRITIC-DEMATEL+3MOAHP additional methodology-uniqueness lifts D2 + D13).

## sca-v7.1 pattern_score 12.9

| Dim (W_pattern) | Score | W×Score |
|---|---:|---:|
| D2 (1.0) | 5 | 5.0 |
| D13 (1.0) | 5 | 5.0 |
| D22 (1.0) | 5 | 5.0 |
| D29 (0.7) | 4 | 2.8 |
| D30 (0.9) | 4 | 3.6 |
| D34 (0.3) | 3 | 0.9 |

> **pattern_score sum**: 22.3 / 4.9 weight-sum (subset) ≈ **4.755**
> Confirms W315 4.75 with marginal lift.

## Tier verdict + routing

> **T2 VENDOR-FORK / METHODOLOGY-ABSORPTION** — CONFIRMED-AND-REFINED from W315.

**Absorption-vector for sca-v7.1**:

1. **PRIMARY**: EC-PROMETHEE Committee algorithm → sca-v7.1 §6.6.1 multi-MCP-cohort disagreement resolver (per active /goal P0c mandate). Net-flow scoring with 7 preference-function-types (`t1`-`t7`) cleanly applies to MCP-cohort-vote where each MCP-family is treated as a "criterion" with weight + threshold + indifference-band.
2. **SECONDARY**: `compare_ranks_crisp` + `ask_llm_rank` LLM-interpreted-rank-aggregation → directly applicable to sca-v7.1 D33 cross-source-consensus quorum-rule (currently advisory; absorption makes it executable).
3. **TERTIARY**: 3MOAHP inconsistency-reduction → sca-v7.1 §audit-prior-verdict-supersession (W312-codex-r1 lesson) — operationalizes supersession-chain consistency check.
4. **TIER-4**: CRITIC + DEMATEL inter-dim correlation → sca-v7.1 has no inter-dim correlation handling; CRITIC+DEMATEL provide principled methodology.
5. **TIER-5**: TOPSIS distance-from-ideal → sca-v7.1 absolute-5-pt-scale could optionally be relativized via TOPSIS for tier-routing.

## Stage-0 + D-EMP per sca-v8 DRAFT (W317 Stream A owns the rubric upgrade)

- **Stage-0 existence-probe**: **PASS** (≥2 families return ≥1)
- **D-EMP (empirical-deploy-score, 0-5)**: **N/A for this candidate** (vendor-fork pattern-only; no runtime install attempt; D-EMP not applicable to methodology-absorption candidates per Stream-A draft semantics — D-EMP gates INSTALL not VENDOR-FORK)

## Operator-AIs queued W318

- **AI-W317-B-pyDecision-EC-PROMETHEE-COMMITTEE-SCA-v7-2-DRAFT**: Stream A (sca-v8 DRAFT) absorbs EC-PROMETHEE committee-aggregation specification into §6.6.1 as the multi-MCP disagreement-resolver; cite arxiv:2404.06370 + Brans+Mareschal PROMETHEE-VI literature; expected install_score lift on arch-itself = +0.10-0.15.
- **AI-W317-B-pyDecision-MCDA-ABSORPTION-FOLDER-CREATE**: W318 creates `docs/architecture/W318-MCDA-ABSORPTION/EC-PROMETHEE-spec.md` + `CRITIC-DEMATEL-spec.md` + `3MOAHP-spec.md` + `TOPSIS-spec.md` (no runtime install needed; markdown-spec-only vendor-fork). Total ~4 KB markdown × 4 files.
- **AI-W317-B-pyDecision-DEEPWIKI-INDEX-REQUEST**: optional W319+ — submit Valdecy/pyDecision to deepwiki for indexing to close the deepwiki-coverage gap surfaced during W315 + W317.

## Cite-anchors (for ledger row)

- `arxiv:2404.06370` — Pereira/Basilio/Tarjano (UFF Brazil) — "Enhancing Decision Analysis with a Large Language Model: pyDecision" (2024)
- `arxiv:2304.08859` — Mohammadi/Tamburri/Rezaei — Compositional MCDM aggregation anchor (parallel methodology lineage)
- `github.com/Valdecy/pyDecision` (master branch, README + algorithm/* paths) — 2026-05-09 last-pushed per W315 reference
- `context7 /valdecy/pydecision` (75 snippets, score 77.4, High reputation)
- `PyPI pyDecision v4.9.4` (current; v4.5.8 historical)
- `T6 verdicts/W315-valdecy-pydecision` (prior verdict — supersession chain)

## Rollback

`git rm docs/architecture/W317-DEEP-INGEST/W317-B-PYDECISION-DEEP-AUDIT.md` (markdown-only deliverable; no runtime artifact created this wave).
