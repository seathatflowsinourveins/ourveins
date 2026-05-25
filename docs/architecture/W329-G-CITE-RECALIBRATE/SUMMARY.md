# W329-G — HF + GH cite-recalibration SUMMARY

> **Status**: LANDED 2026-05-19. Closes codex round-1 W329-C Axis 4 P1 flags.
> **Stream**: parent-side reconstruction (harness blocked subagent file-write on output dir).
> **Inputs read**: W329-C/VERDICT.md round-1 Axis 4 findings; HF `huggingface.co/docs/hub/rate-limits#rate-limit-tiers` (live-fetched 2026-05-19); GH `docs.github.com/en/rest/search/search?apiVersion=2022-11-28` (live-fetched 2026-05-19).
> **Outputs**: 2 SOTA-bypass-method docs edited (HF + GH); this summary.

## Codex round-1 Axis 4 P1 flags addressed

| Flag | Round-1 critique | Round-1 file:line | W329-G remediation |
|---|---|---|---|
| **P1a (HF)** | M5 prose "Resolvers (3k-100k/5min, ~10x higher than Hub APIs)" was over-calibrated; codex requested tier-specific table OR `[UNDOCUMENTED]` annotation | W328-HF-SOTA-METHODS/SOTA-BYPASS.md M5 detail | Added new §"HF per-tier rate-limit table" with 8-row canonical table from huggingface.co/docs/hub/rate-limits#rate-limit-tiers (Sept '25 values); ratio shown to span **4.8x-10x**, NOT uniform 10x; M5 prose updated to reference table |
| **P1b (GH)** | 1,000-cap claim cited Community Discussions #64629 + #109517 as primary anchor; codex requested canonical GitHub-docs primary | W328-GH-SOTA-METHODS/SOTA-BYPASS.md §0 + §8 | §0 fully rewritten with PRIMARY (canonical GitHub/Microsoft docs) + SECONDARY (community) subsections; verbatim quote pulled from docs.github.com/en/rest/search/search; Community Discussions demoted to SECONDARY supporting cites |

## HF per-tier rate-limit table (W329-G canonical, ratio re-derived)

Source-of-truth: `https://huggingface.co/docs/hub/rate-limits#rate-limit-tiers` (huggingface.co official docs, fetched 2026-05-19). Quoted: "Here are the current rate limits (in September '25) based on your plan" + "All quotas are calculated over 5-minute fixed windows".

| Plan | API (req/5min) | Resolvers (req/5min) | Pages (req/5min) | Resolvers/API ratio |
|---|---:|---:|---:|---:|
| Anonymous user (per IP) | 500 * | 3,000 * | 100 * | **6.0x** |
| Free user | 1,000 * | 5,000 * | 200 * | **5.0x** |
| PRO user | 2,500 | 12,000 | 400 | **4.8x** |
| Team organization | 3,000 | 20,000 | 400 | **6.67x** |
| Enterprise organization | 6,000 | 50,000 | 600 | **~8.33x** |
| Enterprise Plus organization | 10,000 | 100,000 | 1,000 | **10.0x** |
| Enterprise Plus (Org IP Ranges defined) | 100,000 | 500,000 | 10,000 | **5.0x** |
| Academia Hub organization | 2,500 | 12,000 | 400 | **4.8x** |

`*` Anonymous and Free are subject to change "depending on platform health" per the upstream doc.

**Calibration verdict**: ratio is NOT uniform 10x — actual span is **4.8x-10x**. PRO + Academia Hub sit at the bottom (4.8x); Enterprise Plus without Org-IP-Ranges sits at the top (10x). The Enterprise-Plus + Org-IP-Ranges row drops back to 5x because API quota also gets a 10x boost (so the ratio normalizes).

## GH 1,000-result cap PRIMARY canonical anchor

Source-of-truth: `https://docs.github.com/en/rest/search/search?apiVersion=2022-11-28` § "About search" (docs.github.com official, fetched 2026-05-19). Verbatim:

> "You can use the REST API to search for the specific item you want to find. ... To satisfy that need, the GitHub REST API provides up to 1,000 results for each search."

Rate-limit half (same page § "Rate limit"): authenticated 30 req/min; unauthenticated 10 req/min; Search code 9 req/min (authenticated).

GraphQL inheritance: `https://docs.github.com/en/graphql/reference/queries#search` documents `search` as a connection but does NOT state a numeric global cap; the cap is enforced at the underlying search-infrastructure layer (shared with REST `/search/*`). `https://docs.github.com/en/graphql/guides/using-pagination-in-the-graphql-api` documents the per-page 100-item cap (distinct from the global 1,000-result cap). `https://docs.github.com/en/graphql/overview/resource-limitations` § "Primary rate limit" — 5,000 points/hr (authenticated PAT); 2,000 secondary-rate-limit points/min; `search` costs 1 point per request.

**SECONDARY community confirmation** (demoted from former primary status):
- `github.com/orgs/community/discussions/64629` — Community confirms GraphQL `search` inherits the REST 1,000-result cap.
- `github.com/orgs/community/discussions/109517` — Repository-search variant reaffirmation.
- PyGithub issue #824 — workaround-pattern documentation.

## Files touched (parent-tracked)

| Path | LOC before | LOC after | Δ |
|---|---:|---:|---:|
| `docs/architecture/W328-HF-SOTA-METHODS/SOTA-BYPASS.md` | 158 | 184 | +26 |
| `docs/architecture/W328-GH-SOTA-METHODS/SOTA-BYPASS.md` | 316 | 354 | +38 |
| `docs/architecture/W329-G-CITE-RECALIBRATE/SUMMARY.md` | 0 | this file | +new |

## 3-org-distinct cite preservation

| Method | huggingface.co (or github.com) official | Lib repo (huggingface_hub / Octokit / PyGithub) | 3rd-org community/related |
|---|---|---|---|
| HF M5 | `docs/hub/rate-limits#rate-limit-tiers` (canonical, W329-G primary) | `hf datasets sql` CLI doc | DuckDB `httpfs` ext docs (`duckdb.org`) |
| GH #1 REST search | `docs.github.com/en/rest/search/search?apiVersion=2022-11-28` (canonical, W329-G primary) | Octokit `@octokit/rest` docs | PyGithub `Github.search_repositories` |
| GH #2-3 GraphQL search | `docs.github.com/en/graphql/reference/queries#search` + `docs.github.com/en/graphql/overview/resource-limitations` + `docs.github.com/en/graphql/guides/using-pagination-in-the-graphql-api` (canonical, W329-G primary) | Octokit `@octokit/graphql` schema | Community Discussions #64629 / #109517 (SECONDARY) |

**Total 3-org-distinct cite count**: 19+ across HF (6 methods × 3 orgs + W329-G primary) + GH (14 methods × 3 orgs + W329-G primaries). Meets W328 brief constraint with W329-G upgrades.

## Codex round-2 readiness

- [x] Axis 4 P1a (HF tier table) — table present at `W328-HF-SOTA-METHODS/SOTA-BYPASS.md:130-147`
- [x] Axis 4 P1b (GH primary cite) — canonical `docs.github.com/en/rest/search/search` anchor present at `W328-GH-SOTA-METHODS/SOTA-BYPASS.md:13-29` with verbatim quote
- [x] 3-org-distinct preserved across all method rows
- [x] No PR/issue suggestions added (R6 compliance)
- [x] No key-rotation mentions (operator constraint)

**Verdict**: YES — both round-1 P1 flags closed with canonical-doc PRIMARY anchors.

## Wave footprint

- Created: 2026-05-19 (W329-G HF + GH cite-recalibrate stream)
- Pairs with: W329-C/VERDICT.md Axis 4 round-1 findings; W329-S2-REAUDIT/VERDICT.md (Axis 3 sibling)
- Operationalizes: codex GPT-5.5 round-1 P1 closure prerequisite for round-2 dispatch
- Next: W329-K (codex round-2 dispatch per `../W329-CODEX-ROUND-1-W328/R2-DISPATCH-DRAFT.md`) fires after W329-S2-REAUDIT + W329-G + W329-H + W329-I + W329-J all land
