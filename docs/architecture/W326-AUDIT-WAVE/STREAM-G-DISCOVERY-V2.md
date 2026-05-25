# W326 Stream G — Discovery v2

**Wave**: W326-G | **Date**: 2026-05-19 | **Carry**: W325-G G-1..G-5

## W325-G carry-over status

| ID | Outcome |
|---|---|
| G-1 pyDecision Phase-2 | **OPERATIONALIZED** `tools/sca-mcda-rank.py` (179 LOC; SAW+TOPSIS+Borda+ELECTRE I via pyDecision 5.1.1; replayable JSON IO; codex-mediation flag at rank-spread>=2) |
| G-2 D44+D45 ratify | **VERIFIED LIVE** SKILL.md L335-L378 W325 P3 shipped; install denom 36.8 / pattern 16.0 |
| G-3 deer-flow vs ODR | **OPERATIONALIZED** see `G1-DEERFLOW-VS-ODR.md`; both T3 dual-adopt |
| G-4 exa/tavily install | NOT-IN-SCOPE (op-side keys unchanged; rebroadcast W326 ops) |
| G-5 METR/HCAST slug | **CORRECTED**: canonical `METR/hcast-public` (21*, 2026-05-15), NOT `METR/eval-suite-hcast` (404) |

## NEW investigations

### 1. pyDecision MCDA tool

- `Z:/claude-sota-installed/tools/sca-mcda-rank.py` 179 LOC
- API: `--cohort <json> --out <json> --top N`
- Methods: SAW + TOPSIS + Borda + ELECTRE I
- Consensus: mean-rank across 3 numeric methods; ELECTRE kernel = complementary-specialty signal
- Codex-mediation flag: `fires_codex_mediation=true` when `max_rank_spread >= 2` on top-N
- Smoke: deer-flow vs ODR executed cleanly; sca-v10 §5.7 prose now executable

### 2. NET-NEW research-arch SOTA (2026 freshness verified gh api 2026-05-19)

| Slug | Stars | Pushed | arXiv | Verdict |
|---|---|---|---|---|
| `scaleapi/researchrubrics` | 20 | 2026-02-10 | 2511.07685 | T3 rubric primitives |
| `OpenEnvision/AutoRubric-as-Reward` | 32 | 2026-05-12 | 2603.00077 | T3 ensemble judging |
| `tsinghua-fib-lab/AutoSOTA` | 400 | 2026-05-15 | 2604.05550 | **T2-CHERRY HOLD** (cited L572) |
| `Anikethh/ResearchGym` | 29 | 2026-05-16 | pending | T3 sandbox env |
| `MiroMindAI/MiroEval` | 39 | 2026-04-06 | 2603.28407 | **T2-CHERRY HOLD** (process+outcome dual) |
| `allenai/asta-bench` | 105 | 2026-05-11 | 2510.21652 | **T1 W327 fast-track** (AllenAI 39-author) |
| `CherYou/AutoResearchBench` | 36 | 2026-04-24 | 2604.25256 | T3 deep+wide axes |
| RubricEM (slug pending) | n/a | n/a | 2605.10899 | T4 carry-W327 |

**Anti-bias**: 6/8 < 500 stars; star-rank does NOT drive verdicts (6th validation).

### 3. Multi-MCP convergence (11-family proposal test)

- **deepwiki**: 2/2 high-confidence (full doc trees)
- **github-search**: 8/8 canonical slugs resolved
- **hf-paper-search**: 6/8 arXiv-anchored (deer-flow + ODR pure-repo)
- **gh-api**: 8/8 freshness verified
- **perplexity_research**: **TIMED OUT 300s** (silent-fallback this wave)
- **exa / context7 / WebSearch / WebFetch / repomix**: NOT FIRED (covered by minimum quorum)

**Minimum quorum**: deepwiki + hf-paper-search + gh-api resolves 100% candidates with org-distinct anchors. **D42 score for this cohort: 4/5** (perplexity timeout caps).

## W326 P-block recommendations

1. **P0**: codify pyDecision-script in SKILL.md §5.7 as Δ46 (replace prose routing with `python tools/sca-mcda-rank.py`)
2. **P0**: METR slug correction across SKILL.md + W315-A anchor → `METR/hcast-public`
3. **P1**: AstaBench T1 fast-track W327 (allenai/asta-bench, AllenAI org, arXiv 2510.21652)
4. **P1**: MiroEval + AutoSOTA T2-CHERRY (process+outcome dual + experiment-evaluation loop as Phase-5/6 ref)
5. **P2**: perplexity timeout — recheck `reasoning_effort: minimal`; W327 G-4
6. **P2**: standardize `docs/architecture/W*/cohort-*.json` + `*-mcda-output.json` pair convention (sca-v10 I8 replayability)
7. **P3**: RubricEM (arXiv 2605.10899) GitHub-slug resolution — W327 carry
