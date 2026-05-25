# [WITHDRAWN — USER-ERROR-CONFIRMED W328-Correction Stream-2 2026-05-19]

> **STATUS**: WITHDRAWN. Do NOT file upstream.
>
> **Verdict**: USER-ERROR-CONFIRMED. The "5-wave silent fallback" pattern (W312-D / W313-D / W314-r1 / W315-B / W319 / W320-G / W321) is the documented behavior of GitHub Search API + correct behavior of github-mcp-server, encountered because operator queries used invalid qualifier syntax (`repo:owner/name` and `owner:<owner> <repo>` forms) against `/search/repositories`.
>
> **Root cause**: `repo:owner/name` is a valid qualifier for `/search/code` and `/search/issues` ONLY. For `/search/repositories` the supported owner qualifiers are `user:<owner>` and `org:<owner>`, and exact-slug lookup belongs on `GET /repos/{owner}/{repo}` — NOT on the search surface (cite: `github/docs` repository-search qualifiers page).
>
> **Source-level disconfirmation** of draft claims:
> - Draft claimed: "no error, no rate-limit signal, no quota indicator". DISPROVEN — `github/github-mcp-server` `pkg/github/search.go` `SearchRepositories` explicitly checks `resp.StatusCode != http.StatusOK` and returns `ghErrors.NewGitHubAPIErrorResponse` / `NewGitHubAPIStatusErrorResponse` with `IsError: true` for 403/422 (cite: deepwiki `github/github-mcp-server` source-grounded query, 2026-05-19).
> - Draft claimed: "MCP response schema is structurally identical for false-negative and true-negative cases". MISFRAMED — `MinimalSearchRepositoriesResult` includes an `IncompleteResults bool` field surfaced from `go-github` for the 1000-result cap; partial-results signal IS present.
> - Draft cited 4-of-5 "false-negative" cases. Re-analysis: those queries used `repo:owner/name` (only valid in code/issue search) and the 1-of-5 "true-negative" (`yeshuibo/agentflow`) was correctly 0-result because the repo is genuinely non-existent — exactly the contract.
>
> **Three-org-distinct cite anchors**:
> 1. `github/github-mcp-server` `pkg/github/search.go` `SearchRepositories` handler — passes `query` verbatim to `client.Search.Repositories`; surfaces 403/422 via `IsError: true` (deepwiki).
> 2. `github/docs` repository-search qualifiers — `in:`, `user:`, `org:`, NOT `repo:owner/name` for `/search/repositories` (Perplexity cite [2] = `github/docs/content/search-github/searching-on-github/searching-for-repositories.md`).
> 3. `google/go-github` `Search.Repositories(ctx, query, opts)` — passes query string verbatim through to the REST `q` parameter (deepwiki + Perplexity cite [4]).
>
> **Correct usage** documented at `docs/architecture/W328-GHMCP-USAGE-CORRECTION/CORRECT-USAGE.md`. Adopt that cheatsheet across SCA / research skills.
>
> Original draft preserved verbatim below for audit trail.

---

# Upstream Issue Draft — github-mcp-server: `search_repositories` silent 0-result on legitimate slugs

> **OPERATOR-READY** (W328 Stream-C finalization 2026-05-19): run `gh issue create --repo github/github-mcp-server --title "[search_repositories] 0-result fallback ambiguous with rate-limit/quota suppression" --body-file Z:/claude-sota-installed/docs/architecture/W321-OPEN-SOURCE-CUTOVER/upstream-issues/github-mcp-search-repositories-silent-fallback.md` to file. Confirm `github/github-mcp-server` is the canonical upstream MCP server repo first (check `https://github.com/github/github-mcp-server` for active issue tracker); if maintainers redirect, retarget. Secondary candidate: `anthropics/claude-code` only if Anthropic owns the MCP integration shim.
>
> Repository: `github/github-mcp-server` (primary upstream) OR `anthropics/claude-code` (fallback if Anthropic-owned integration)
> Filing path: `gh issue create --repo <owner/repo> --title "<title>" --body-file <this file>`
> Wave context: W321 P3 cleanup; closes 5-wave silent-fallback pattern (W312-D F1, W313-D, W314-r1, W315-B `yeshuibo/agentflow`, W319 cite-refresh, W320 Stream G).
> Cite-anchor classification: SILENT-FALLBACK class per W316-Δ33 codification + W319 cite-refresh chain + W321 cutover-decision.

## Title (≤80 chars, prefix-tagged)

`[search_repositories] 0-result fallback ambiguous with rate-limit/quota suppression`

(80 chars; prefix `[search_repositories]` tags the affected MCP tool for triage.)

## Summary

The GitHub-MCP `search_repositories` tool returns 0 results for queries that should return matches. The same queries via `gh api /search/repositories?q=<query>` AND direct `gh api /repos/<owner>/<name>` confirm the repos exist. This is a 5-wave-confirmed silent fallback that has been mitigated downstream via the Stage-0 existence-probe pattern (sca-v9 §1 Δ33) but the upstream cause remains unaddressed.

## Affected version + environment

- MCP server: `github` MCP via `everything-claude-code` plugin
- Node: v22.x
- Platform: Windows 11 Pro / Z:-portable
- gh CLI: 2.92.0

## Reproduction (5-wave-confirmed, numbered steps)

1. Configure the `github` MCP via the `everything-claude-code` plugin (or other GitHub-MCP host).
2. Issue the `search_repositories` MCP tool-call with a known-existing repo slug query (e.g. `owner:<known-owner> <known-repo>` form).
3. Observe the response: 0 matching repos returned, no error message, no rate-limit indicator, no quota indicator.
4. Cross-verify the same target via two independent surfaces:
   - `gh api /search/repositories?q=<query>` — returns matching repos.
   - `gh api /repos/<owner>/<name>` — confirms target repo exists (200 OK).
5. Confirm divergence: MCP tool returns 0 results while direct GitHub API returns ≥1 match for the same query.

**5-wave confirmed cases** (operator-internal evidence):
- W312-D F1: query returns 0 even though target exists (direct `gh api` confirms presence)
- W313-D: same pattern, different target slug
- W314-r1: same pattern, replicated under cite-refresh discipline
- W315-B `yeshuibo/agentflow`: 0-result + Stage-0 existence-probe REVEALED it was genuinely non-existent (CORRECT 0-result this case — included to show the lint can NOT distinguish absence from suppression without external verification)
- W320 Stream G: 0-result for known-existing slugs in a twin-stream parallel-dispatch context (excludes single-stream confounds)

Repro reliability: 4-of-5 cases are false-negative (MCP says 0, ground truth ≥1); 1-of-5 is true-negative (MCP says 0, ground truth = 0). The ambiguity itself is the bug — the operator cannot tell which case without a separate verification probe.

The hard-to-distinguish failure: `search_repositories` 0-result is AMBIGUOUS between:
(a) repo genuinely doesn't exist
(b) repo exists but query doesn't match the MCP's internal search semantics
(c) rate-limit or quota silently suppressed

Operator cannot tell which case without separate verification (e.g. direct `gh api /repos/<owner>/<name>`).

## Expected vs Actual

**Expected**: `search_repositories` should EITHER:
(a) return matching results when query matches existing repos, OR
(b) raise explicit rate-limit / quota-exhausted error, OR
(c) provide a "verification confidence" signal so downstream LLM-clients can disambiguate (a)/(b)/(c) ambiguity above.

**Actual**: returns 0-result responses indistinguishable from a legitimate 0-match. No error, no rate-limit signal, no quota signal, no confidence metadata. The MCP response schema is structurally identical for false-negative and true-negative cases.

**Impact severity**: 4-of-5 production-witnessed cases are false-negative. Downstream LLM-client trust in the search surface is undermined.

## Why this matters

5-wave convergent evidence across an autonomous-research runtime shows the failure mode is reproducible. Downstream mitigation (Stage-0 existence-probe via ≥2 distinct MCP families) was codified in sca-v9 §1 Δ33 as W316 response — but this is a workaround, not a fix.

## Suggested fix

1. Raise explicit rate-limit / quota error when applicable
2. Provide query-resolution-confidence metadata in MCP response
3. Document the behavior in MCP server README so LLM-clients can encode fallback policy

## Related context

- Stage-0 existence-probe codified at sca-v9 §1 (`Z:/claude-sota-installed/.claude/skills/sota-convergence-audit/SKILL.md`) — internal mitigation pattern (requires ≥2 distinct MCP families to cross-check existence).
- Operator runtime: 5-wave reproduction documented across `docs/architecture/W3{12,13,14,15,20}-*/`.
- Companion upstream issue (same silent-fallback class, different MCP server): `huggingface/huggingface_hub` `hub_repo_search` — 7-wave-confirmed; see sibling draft `hf-hub-repo-search-silent-fallback.md`.

## Cite-anchor: silent-fallback wave history

Reproduced + observed across these wave records (operator-internal, evidence-only):
- W312-D F1 (first observation in a parallel-dispatch context)
- W313-D (replication, distinct slug)
- W314-r1 (cite-refresh discipline replication)
- W315-B `yeshuibo/agentflow` (true-negative control case)
- W319 (cite-refresh chain catch under cross-model audit)
- W320 Stream G (twin-stream parallel reproduction)
- W321 (cutover decision — pattern stable enough to file upstream)

Silent-fallback class codified at `docs/architecture/W316-WAVE/Δ33-SILENT-FALLBACK-CODIFICATION.md` (operator-internal).

## Operator action

File via `gh issue create --repo github/github-mcp-server --title "[search_repositories] 0-result fallback ambiguous with rate-limit/quota suppression" --body-file Z:/claude-sota-installed/docs/architecture/W321-OPEN-SOURCE-CUTOVER/upstream-issues/github-mcp-search-repositories-silent-fallback.md`. If `github/github-mcp-server` does not exist or maintainers redirect, retarget to `anthropics/claude-code` (if Anthropic owns the integration shim) or the canonical community MCP server repo. Track for upstream response. Mitigation already in place via sca-v9 Stage-0 probe.
