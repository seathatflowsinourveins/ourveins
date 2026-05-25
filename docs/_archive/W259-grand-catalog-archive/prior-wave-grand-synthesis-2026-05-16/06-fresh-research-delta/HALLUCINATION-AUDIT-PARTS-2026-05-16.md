# Hallucination Audit — PART file random-sample 100 repos

> **Audit date**: 2026-05-16
> **Scope**: 4 PART catalog files (PART1-PART4) aggregating ~1,831 repos in the L0-L6 grand-synthesis taxonomy.
> **Output**: per-repo quarantine list + data-quality grade.

## Methodology

- Extracted all `org/repo` rows from each PART file (filtered to ≥1k★ — operator-facing tier).
- Universe sizes after dedupe: PART1=223, PART2=309, PART3=203, PART4=143 unique repos ≥1k★ (878 total).
- Random-sampled 25 per PART (seed=42, reproducible) = **100 total probes**.
- Verified each via `gh api repos/OWNER/REPO --jq '[.full_name, (.stargazers_count|tostring), (.archived|tostring), .pushed_at] | join("|")'`.
- Captured: EXISTS y/n, actual stars, archived t/f, drift % from PART claim.
- Drift threshold: >20% absolute difference between PART-claimed stars and live API stars.

## Confirmed HALLUCINATIONS (do not exist on GitHub)

| Repo | PART | Claim | Probable correction | Notes |
|---|---|---|---|---|
| `haotian-liu/LLaVA-NeXT` | PART3 | 24.8k★ | `haotian-liu/LLaVA` (24,790★) | NAME-MISMATCH — the "-NeXT" suffix is wrong; base repo exists at claimed star count. Quarantine the row OR rename to `haotian-liu/LLaVA` |
| `modal-labs/modal` | PART4 | ~3,000+ [EST] | `modal-labs/modal-client` (473★) | NAME-MISMATCH — `modal-labs/modal` returns 404; the actual SDK is `modal-client` but ONLY 473★ not 3k. Estimated star claim was also wrong. Quarantine row + downgrade tier if rescued |

**Both hallucinations were NAME-MISMATCHES, not pure fabrications.** The underlying entities exist but at slightly different paths.

## STALE (exists but archived)

| Repo | PART | Last-push |
|---|---|---|
| _(none in sample)_ | — | — |

Zero archived repos hit in this sample. Suggests catalog filtering during fork synthesis already excluded archived projects.

## STAR-DRIFT (>20% off PART claim)

| Repo | PART | PART-claim | Actual | Drift % | Direction |
|---|---|---:|---:|---:|---|
| `timescale/pgvectorscale` | PART1 | 1,500 | 3,010 | +100.7% | UNDER-counted (rapid growth) |
| `princeton-nlp/SWE-bench` | PART2 | 3,000 | 4,954 | +65.1% | UNDER-counted |
| `confident-ai/deepeval` | PART2 | 8,000 | 15,467 | +93.3% | UNDER-counted (big growth) |
| `CopilotKit/generative-ui` | PART3 | 1,300 | 710 | -45.4% | OVER-counted (or wrong sub-repo) |
| `THUDM/CogAgent` | PART3 | 7,300 | 1,179 | -83.8% | OVER-counted (likely confused with `THUDM/CogVLM`) |
| `langchain-ai/langchain` | PART4 | 90,000+ | 136,886 | +52.1% | UNDER-counted (stale) |
| `mistralai/client-python` | PART4 | 1,000+ | 738 | -26.2% | OVER-counted (below 1k threshold) |
| `griptape-ai/griptape` | PART4 | 2,000+ | 2,527 | +26.4% | UNDER-counted (mild) |
| `JetBrains/koog` | PART4 | <1K [EST] | 4,189 | +318.9% | UNDER-counted (estimate way off) |
| `langchain-ai/langgraph` | PART4 | 8,000+ | 32,177 | +302.2% | UNDER-counted (estimate way off) |
| `andrewyng/aisuite` | PART4 | 11,000+ | 13,763 | +25.1% | UNDER-counted (mild) |
| `lm-sys/RouteLLM` | PART4 | 3,000+ | 4,893 | +63.1% | UNDER-counted |
| `kvcache-ai/Mooncake` | PART4 | ~2K | 5,341 | +167.1% | UNDER-counted (estimate off) |

**Pattern**: 11/13 drift cases are UNDER-counts (stale numbers — catalog snapshot pre-dates latest growth). Only 2/13 are OVER-counts (1 confused entity `THUDM/CogAgent`, 1 below-1k miscategorization `mistralai/client-python`). PART4 dominates drift cases (9/13) because it uses imprecise "[EST]" markers.

## Quarantine list (do not link operators to these without verification)

1. `haotian-liu/LLaVA-NeXT` → rename row to `haotian-liu/LLaVA` OR remove
2. `modal-labs/modal` → rename row to `modal-labs/modal-client` AND fix star count to 473★ (now below 1k tier)
3. `THUDM/CogAgent` row probably conflates with `THUDM/CogVLM` (which has ~6k★) — operator should verify intent before action
4. `CopilotKit/generative-ui` (only 710★, claim said 1.3k — below tier; may be wrong sub-repo)
5. `mistralai/client-python` (only 738★, below 1k threshold)

## Hallucination rate estimate

- **Hallucination (pure non-existence)**: 0/100 = **0%**
- **Hallucination (name-mismatch / repo-misnaming)**: 2/100 = **2%**
- **Stale (archived)**: 0/100 = **0%**
- **Star-drift >20%**: 13/100 = **13%** (mostly stale UNDER-counts, not fabrication)
- **Star-drift causing tier-misclassification** (would drop below 1k★): 2/100 = **2%** (`modal-labs/modal` rescue, `mistralai/client-python`)
- **Overall data-quality grade**: **B+** — names are accurate (98%), but star counts lag live state by ~13% and 2% of rows have entity-naming errors.

## Per-PART quality breakdown

| PART | Sampled | Hallucination | Stale | Star-drift | Net quality |
|---|---:|---:|---:|---:|---|
| PART1 (L0-L1 Data) | 25 | 0 | 0 | 1 | A (96%) |
| PART2 (L2-L3 Agents) | 25 | 0 | 0 | 2 | A (92%) |
| PART3 (L4-L5 Eval-Sec) | 25 | 1 | 0 | 2 | B (88%) |
| PART4 (L6 Misc) | 25 | 1 | 0 | 8 | C (64% — drift-heavy due to "[EST]" markers) |

## Recommendation

Catalog is **MEDIUM-QUALITY** overall (hallucination rate 2%, star-drift 13%, grade B+).

- **PART1-PART3 are HIGH-QUALITY** — operators can trust repo paths and use star counts as a rough indicator.
- **PART4 needs systematic re-verification** — 8/25 star-drift cases (32%) confirm the `[EST]` markers in PART4 are unreliable. Specifically:
  - Recompute live stars for all `[EST]` and `~2K`/`3,000+` style entries
  - Verify `THUDM/CogAgent` vs `THUDM/CogVLM` naming
  - Drop `modal-labs/modal` (404) and `CopilotKit/generative-ui` (below tier) from ≥1k tier
- **No systematic fabrication** found — both "hallucinations" were name-mismatches (operator could find correct repo with a 30-second search), not pure invention.

## Cross-check sample reproducibility

- Sample seed: `random.seed(42)` over deduplicated per-PART universes
- Probe artifacts: `Z:/claude-sota-installed/tmp/hallucination-audit/results_fixed.tsv`, `analysis.json`
- Re-run command: extract via `tmp/hallucination-audit/all_repos.json`, probe via `gh api`, analyze via `analysis.json`
