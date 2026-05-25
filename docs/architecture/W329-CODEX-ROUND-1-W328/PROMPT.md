# W329-Codex-Round-1 — W328 Wave Ratification

You are codex GPT-5.5 performing cross-model consensus review on wave W328 (SOTA full-depth gap resolution) for the claude-sota-installed runtime. Provide a structured VERDICT.

## Output format (REQUIRED)

```
Axis 1 (W328 wave quality + completeness): PASS|FAIL — <one-line reason>
Axis 2 (S1 HF USER-ERROR verdict soundness): PASS|FAIL — <one-line reason>
Axis 3 (S2 GitHub-MCP USER-ERROR verdict soundness): PASS|FAIL — <one-line reason>
Axis 4 (HF M5 + GH 6-step SOTA-bypass technical correctness): PASS|FAIL — <one-line reason>
Axis 5 (Proposed R6 corollary well-formedness): PASS|FAIL — <one-line reason>
Axis 6 (Remaining UPSTREAM-BUG claims worth retaining): PASS|FAIL — <one-line reason>

Overall: APPROVE | REVISE | NEEDS-REVISION | BLOCK

Items flagged for revision (if any):
- <item 1>
- <item 2>
- ...

Key findings:
1. ...
2. ...
3. ...
```

## Wave W328 summary (verbatim from W328-SYNTHESIS.md)

W328 shipped 5 streams + 2 correction streams + 2 SOTA-bypass streams under operator mandate "all SOTA full-depth gaps resolution":

- W328-A SKILL-ABSORB-MEGA: applied sca-v10/v11/v12 + K-3/K-7 + Δ-G47-Δ-G51 + Δ-PDM-1-3 + vendor-fork Δ-DPA-1-5 to 4 SKILL.md + 1 new vendor-fork; 20 Δ-symbols absorbed; sota-convergence-audit refactored 731→413 LOC.
- W328-B INSIGHTS-WIRE-AUTO: 5 PowerShell wire-up scripts (Phoenix/OTEL/statusLine/privacy) + README; 0 tracked-config edits; wire-up 14%→86% achievable with 2 operator pastes.
- W328-C K-5 + K-8 + UPSTREAM-FINAL: K-5 minimal coord spec 14.6 KB (DOCKET.md pattern, 3-org-distinct cites) + K-8 provenance-lint tests 3/3 PASS + upstream-issue drafts OPERATOR-READY.
- W328-D CODEX-R14-POLL + COMPOSITE-RECALC: codex round-14 verdict b2zmoh8rg resolved NEEDS-REVISION@r14 → APPROVED@r16; composite-recalc PASS within ±20%; 3-org-distinct cite PASS for K-3+K-7.

Mid-wave operator pushback ("why keep suggesting PR? mature repos = look at your own usage first; don't assume upstream bug") invalidated 2 W321-vintage upstream-issue drafts. Two correction streams dispatched, both verdicting USER-ERROR-CONFIRMED. Drafts renamed `WITHDRAWN-USER-ERROR-*` (audit-trail preserved).

## S1 verdict — HF `hub_repo_search` USER-ERROR-CONFIRMED

Root cause: `query` param is **substring-match on repo IDs only** — not tokenized AND, not full-text on cards. Multi-word free-text like `"claude code mcp agent harness"` returns 0 because no single repo ID contains that 5-word substring.

Source-level evidence (3-org-distinct):
1. **huggingface.co official docstring** (`HfApi.list_models` `search` param): "A string that will be contained in the returned model ids." Example shown: `api.list_models(search="bert")` — single token.
2. **huggingface_hub Python lib source via deepwiki**: "The `search` parameter performs a single substring match... It does not perform a tokenized search or a logical AND operation on individual words." `test_list_models_search` asserts `"bert" in model.id.lower()`.
3. **HF Open LLM Leaderboard FAQ**: explicitly distinguishes its OWN richer search (`;` OR, `@architecture:` field prefix, regex) from base hub search — implicit confirmation base hub search has none of those features.

Live empirical proof (W328 Stream-1, 2026-05-19):
| Query | Result |
|---|---|
| `query="dspy"` (1 token) | 15 results |
| `query="deep research agent"` (3 tokens, exact-slug-match repos exist) | 9 results |
| `query="claude code mcp agent harness"` (5 tokens, no exact-slug-match) | 0 results — EXPECTED |
| `filters=["mcp-server"]` (tag-based, no query) | 5 trending MCP spaces — CORRECT SOTA pattern |

## S2 verdict — GitHub-MCP `search_repositories` USER-ERROR-CONFIRMED

Root cause: `repo:owner/name` + `owner:<owner> <repo>` qualifiers are for `/search/code` + `/search/issues`, NOT `/search/repositories`. For repository search use `<text> in:name user:<owner>` or `<text> in:description org:<org>` or qualifier-only queries (`language:`, `stars:>`, `topic:`, `pushed:>`, `fork:false`).

Source-level evidence (3-org-distinct):
1. **github/github-mcp-server** `pkg/github/search.go`: `client.Search.Repositories(ctx, query, opts)` passes query verbatim; 403/422 → `NewGitHubAPIErrorResponse` / `NewGitHubAPIStatusErrorResponse` with `IsError: true`. "Silent" claim disproven — errors surface via `IsError`.
2. **github/docs** `content/search-github/searching-on-github/searching-for-repositories.md`: valid qualifiers are `in:`, `user:`, `org:`, `language:`, `stars:`, `topic:`, `pushed:`, `created:`, `fork:`, `archived:`, `license:`, `is:`, `size:`. `repo:owner/name` documented for code/issue search ONLY.
3. **google/go-github** `Search.Repositories(ctx, query, opts)`: query string passed verbatim to REST `q` parameter; standard rate-limit-error types.

Wave-by-wave re-analysis: 4-of-5 "false-negative" cases used `repo:braintrustdata/braintrust` or `owner:<x> <y>` — both invalid for `/search/repositories`, so the query effectively searched name+description+topics for the literal string `"repo:..."` (no matches). 1-of-5 "true-negative" (`yeshuibo/agentflow`) was a genuinely non-existent repo — correct behavior.

Mitigation pattern (Stage-0 existence-probe via `get_repository` from sca-v9 §1 Δ33) remains correct; framing changes from "silent-fallback workaround" to "right-tool-for-job: `get_repository` for exact-slug probe, `search_repositories` for actual search".

## HF M5 SOTA-bypass recommendation

**M5 = `cfahlgren1/hub-stats` parquet via DuckDB** = 5.3M+ rows snapshot (2.89M models / 1.01M datasets / 1.3M spaces / 85.4k arXiv / 15k papers), uses **Resolvers** rate-limit bucket (~10x higher than Hub APIs), supports `list_contains(tags, 'mcp')` + arbitrary WHERE/JOIN/ORDER BY.

Composition recommended: **M5 (snapshot) + M1 (`HfApi.list_models()>=1.2.0` fresh-tail delta walk with auto-429 + IETF RateLimit v9) + M6 (webhook firehose, email-toggleable per HF FAQ)**.

## GH 6-step SOTA-bypass cascade

Critical correction: GraphQL `search(type:REPOSITORY)` shares the SAME ~1000-cap as REST search (confirmed via GitHub Community Discussions #64629/#109517 + PyGithub issue #824). GraphQL alone is NOT a bypass. Actual bypass:
- (a) Non-search GraphQL connections: `Organization.repositories` / `User.repositories` — **NO CAP**
- (b) Search-window partitioning by `created:`/`pushed:`/`stars:` binary-split

6-step chain for sca-v* `"topic:mcp-server stars:>500 created:>=2025-11-19"`:
1. Sizing-probe (1 GraphQL `repositoryCount`)
2. If >1000: binary-split date/stars window until each ≤1000
3. Enumerate each window via cursor pagination (`first:100, after:endCursor`)
4. Cross-validate with BigQuery `bigquery-public-data.github_repos` snapshot
5. Star-independent signals via ecosyste.ms repos API (1.2M+ repos across 2000+ sources)
6. Trending velocity via `githubarchive.day.*` BigQuery (event-level history since 2011-02-12)

## Proposed R6 cardinal-rule corollary

> **R6 (proposed)**: When a SOTA endpoint returns unexpected results, the prior assumption is OPERATOR-MISUSE. Source-deep-dive required BEFORE upstream-issue framing. Mature repos (≥1000 user community) get hammered by users; novel-to-operator bugs are extremely rare. Upstream-issue-drafting is reserved for cases where source-level evidence proves the upstream contract is genuinely violated.

This codifies S1+S2 verdicts (both USER-ERROR-CONFIRMED) as systemic discipline, not special cases.

## Specific verification asks

1. **Axis 1 (wave quality)**: Are 5 streams + 4 correction streams sufficient deliverable for "all SOTA full-depth gaps resolution"? Is the parallel-ratio (4-in-1-message initial, 2-in-1-message bypass) reasonable per W269 mandate?
2. **Axis 2 (S1 verdict)**: Are the 3 cite anchors (huggingface.co docs + huggingface_hub repo via deepwiki + HF Open LLM Leaderboard FAQ) sufficient to ratify USER-ERROR-CONFIRMED? Could there be a real upstream bug (e.g., undocumented full-text fallback that mature repos have come to rely on)?
3. **Axis 3 (S2 verdict)**: Are 3 cite anchors (github/github-mcp-server pkg/github/search.go + github/docs searching-for-repositories.md + google/go-github Search.Repositories) sufficient? The 4-of-5 invalid-qualifier root-cause attribution — is that source-supported or speculative?
4. **Axis 4 (bypass technical correctness)**: Is HF M5 (`cfahlgren1/hub-stats` via DuckDB on Resolvers bucket) actually ~10x higher rate-limit than Hub APIs, or is that an overclaim? Is GH 6-step cascade's GraphQL-search-1000-cap-confirmation source-grounded (GH Community #64629/#109517 + PyGithub #824)?
5. **Axis 5 (R6 corollary)**: Is "mature repos (≥1000 user community) get hammered by users; novel-to-operator bugs are extremely rare" defensible? Or is it overcalibrated against false-positive (could push toward never filing valid upstream issues)?
6. **Axis 6 (retained UPSTREAM-BUG claims)**: In the W314-W327 silent-fallback corpus, are there any specific claims that should be RETAINED as genuine upstream bugs (not USER-ERROR)? Currently we've withdrawn only 2 (HF + GH-MCP) — should more be reviewed?

## Anti-sycophancy

Be ruthlessly skeptical. If the verdicts are over-claimed or under-evidenced, mark FAIL with concrete cite gaps. If the cite anchors are insufficient (e.g., 2-org-distinct dressed up as 3), call it. If R6 is overcalibrated, name the failure mode. Do NOT default to APPROVE.

Respond with only the structured VERDICT block above. No preamble.
