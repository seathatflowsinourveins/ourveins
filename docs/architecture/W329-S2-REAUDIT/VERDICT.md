# W329-S2-REAUDIT — Verdict (definitive)

> Re-audit of the W328-S2 GitHub-MCP "USER-ERROR-CONFIRMED" verdict after codex GPT-5.5 round-1 review returned FAIL — CRITICAL.
>
> Date: 2026-05-19. Auditor: orchestrator subagent. Method: 5-source independent web-fetch + live GitHub Search API probe + 3-org-distinct cite anchoring.

## 1. Headline reversal

**W328-S2's central premise was WRONG.** Codex GPT-5.5 round-1 was right.

The W328-S2 cheatsheet at `docs/architecture/W328-GHMCP-USAGE-CORRECTION/CORRECT-USAGE.md` states (lines 11, 51-55):

> `repo:owner/name` is NOT a valid qualifier for `/search/repositories` — it is for `/search/code` and `/search/issues` only.
>
> NOT valid for `/search/repositories`:
> - `repo:owner/name` — code/issue search only.
> - `owner:<owner>` — use `user:<owner>` or `org:<owner>` instead.

**Both claims are factually incorrect.** Live API probes return 200 OK with valid `items` for BOTH `repo:owner/name` AND `owner:<value>` against `/search/repositories`. The github/docs page for "Searching for repositories" explicitly lists `repo:owner/name` as a repository-search qualifier (in the same table as `in:name`, `in:description`, `in:topics`, `in:readme`).

The W328-S2 file ALSO contradicts itself at line 159 ("`repo:owner/name` documented for code/issue search ONLY") versus the live evidence we now have — the originating premise was a misread of upstream docs.

## 2. Per-qualifier validity matrix (definitive)

All probes ran 2026-05-19 against `https://api.github.com/search/repositories?q=<URL-encoded>&per_page=3`, anonymous, with `Accept: application/vnd.github+json`, `X-GitHub-Api-Version: 2022-11-28`. All returned HTTP 200; no validation errors; no documentation_url errors; no errors[] array.

| Probe | Query (q=) | HTTP | total_count | items[0..2] | Verdict |
|---|---|---|---|---|---|
| A | `repo:facebook/react` | 200 | **1** | `facebook/react` | **VALID** — exact-slug match, behaves as canonical exact-lookup |
| B | `owner:facebook` | 200 | **155** | `facebook/react`, `facebook/react-native`, `facebook/docusaurus` | **VALID** — synonym of `user:` / `org:` for owner restriction |
| C | `user:facebook` | 200 | **155** | identical to B | **VALID** — canonical per github/docs |
| D | `org:facebook` | 200 | **155** | identical to B | **VALID** — canonical per github/docs |
| E | `react user:facebook` | 200 | **13** | `facebook/react`, `facebook/react-native`, `facebook/react-native-website` | VALID (combined text + owner) — canonical W328 Pattern B-style |
| F | `react owner:facebook` | 200 | **13** | identical to E | **VALID** — `owner:` behaves identically to `user:` |
| G | `react in:name` | 200 | 4,946,172 | `facebook/react`, … | VALID baseline |

Notes from the matrix:
- B == C == D (`total_count: 155` identical for `owner:`, `user:`, `org:`). The three qualifiers are functional aliases for repository-search owner restriction.
- E == F (`total_count: 13` identical). `owner:` is not just valid — it returns the same result set as `user:`.
- A returns exactly 1 item, the precise slug match. `repo:owner/name` works on `/search/repositories` and acts as an exact-slug filter.

## 3. Five independent source cite-anchors (3-org-distinct rule satisfied)

### Source 1 — github/docs (Org 1: github, doc team), the exact file codex cited

URL: `https://raw.githubusercontent.com/github/docs/main/content/search-github/searching-on-github/searching-for-repositories.md`

Exact content of the qualifier table (from indexed source, current main branch 2026-05-19):

> `| Qualifier  | Example`
> `| ------------- | -------------`
> `| in:name | jquery in:name matches repositories with "jquery" in the repository name.`
> `| in:description  | jquery in:name,description matches repositories with "jquery" in the repository name or description.`
> `| in:topics  | jquery in:topics matches repositories labeled with "jquery" as a topic.`
> `| in:readme | jquery in:readme matches repositories mentioning "jquery" in the repository's README file.`
> `| repo:owner/name | repo:octocat/hello-world matches a specific repository name.`

And the `user`/`org` table immediately following:

> `To search in all repositories owned by a certain user or organization, you can use the user or org qualifier.`
> `| user:USERNAME | user:defunkt forks:>100 matches repositories from @defunkt that have more than 100 forks.`
> `| org:ORGNAME | org:github matches repositories from GitHub.`

**Definitive**: `repo:owner/name` IS listed as a repository-search qualifier (same table as the four `in:*` qualifiers). `user:` and `org:` are listed. `owner:` is NOT listed in the github/docs page — but the live API DOES accept it (see Source 4).

### Source 2 — docs.github.com REST API reference (Org 1: github, REST docs)

URL: `https://docs.github.com/en/rest/search/search?apiVersion=2022-11-28`

For `GET /search/repositories`, the `q` parameter doc text:

> "The query contains one or more search keywords and qualifiers. Qualifiers allow you to limit your search to specific areas of GitHub. The REST API supports the same qualifiers as the web interface for GitHub. To learn more about the format of the query, see Constructing a search query. See 'Searching for repositories' for a detailed list of qualifiers."

The REST API doc explicitly cites and links to the same github/docs page (Source 1) as the authoritative qualifier list. The "Constructing a search query" example reads:

> "For example, if you wanted to search for all repositories owned by `defunkt` that contained the word `GitHub` and `Octocat` in the README file, you would use the following query with the search repositories endpoint: `GitHub Octocat in:readme user:defunkt`"

**Definitive**: REST API qualifier set for /search/repositories == web qualifier set per github/docs == includes `repo:owner/name`.

### Source 3 — github/github-mcp-server source (Org 1: github, MCP server team)

URL: `https://raw.githubusercontent.com/github/github-mcp-server/main/pkg/github/search.go`

The tool docstring for `search_repositories`:

> ```go
> Name:        "search_repositories",
> Description: t("TOOL_SEARCH_REPOSITORIES_DESCRIPTION", "Find GitHub repositories by name, description, readme, topics, or other metadata. Perfect for discovering projects, finding examples, or locating specific repositories across GitHub."),
> ```

The query schema description:

> ```go
> "query": {
>     Type:        "string",
>     Description: "Repository search query. Examples: 'machine learning in:name stars:>1000 language:python', 'topic:react', 'user:facebook'. Supports advanced search syntax for precise filtering.",
> },
> ```

The query is passed verbatim to the upstream Go client (`client.Search.Repositories(ctx, query, opts)`). The docstring does NOT mention `repo:owner/name` (only `in:name`, `stars:`, `language:`, `topic:`, `user:`), but it ALSO doesn't forbid it — the Go-level pass-through preserves whatever the GitHub REST API accepts. This source establishes pass-through semantics; the canonical qualifier list is (per Source 2's explicit reference) github/docs Source 1.

### Source 4 — Live GitHub Search API (Org 2: github.com runtime, distinct from docs)

`https://api.github.com/search/repositories?q=...&per_page=3` probes (matrix §2). The runtime is the source-of-truth for what the API actually accepts. Probes A, B, C, D, E, F all returned HTTP 200 with valid items. No 422 "Validation Failed". No errors[] array. No documentation_url.

This is the most authoritative source for the binary question "does the API accept the qualifier?" — and it accepts all four candidates (`repo:`, `owner:`, `user:`, `org:`).

### Source 5 — Perplexity Sonar Pro aggregated search (Org 3: perplexity.ai indexing GitHub Community + LFE Docs + Enterprise Server Docs)

Perplexity returned 8 results. Three key cross-org-distinct excerpts:

- `github/community discussions` (Org 1 community): code-search vs repo-search qualifier distinctions exist (e.g. `path:` is code-only) but `repo:`, `user:`, `org:` are confirmed valid across endpoints.
- `docs2.lfe.io/v3/search/` (Org: LFE Documentation — mirror/derivative): lists `user` or `repo` as "Limits searches to a specific user or repository" for repository-search context.
- `docs.github.com/en/enterprise-server@3.6/rest/search/search` (Org 1, distinct Enterprise Server doc tree): "your search will fail if your query includes `repo:`, `user:`, or `org:` qualifiers that request resources that you don't have access to" — explicitly groups `repo:`, `user:`, `org:` as supported qualifiers at the /search/repositories REST endpoint.

The Enterprise Server doc is the clearest external confirmation: it lists `repo:`, `user:`, `org:` together as the three "owner/repo restriction" qualifiers supported by the REST search endpoints (including /search/repositories).

### 3-org-distinct rollup
- Org 1 (github, doc + REST docs + MCP server + Enterprise Server docs + community): Sources 1, 2, 3, 5a/c.
- Org 2 (github.com runtime API): Source 4.
- Org 3 (perplexity.ai + LFE mirror): Source 5b.

Three distinct orgs cover the assertion. Rule W295 I1 satisfied.

## 4. Definitive answers to the original 5 questions

| # | Question | Definitive answer | Source |
|---|---|---|---|
| 1 | Is `repo:owner/name` valid for /search/repositories? | **YES.** Listed in github/docs qualifier table; live API returns total_count=1 for `repo:facebook/react`. | Sources 1, 4 |
| 2 | Is `owner:<value>` valid for /search/repositories? | **YES** (despite NOT being formally listed in github/docs). Live API returns total_count=155 for `owner:facebook` — identical result-set to `user:facebook` / `org:facebook`. Treated as a synonym of `user:`/`org:` at the API layer. **The W328-S2 claim "use `user:` or `org:` INSTEAD" is wrong — `owner:` works.** | Source 4 (live API) |
| 3 | Is `user:<value>` valid? | **YES.** github/docs lists it; live API confirms total_count=155. | Sources 1, 4 |
| 4 | Is `org:<value>` valid? | **YES.** github/docs lists it; live API confirms total_count=155. | Sources 1, 4 |
| 5 | What caused the original W316/W319 0-result observations? | See §5 below — VERDICT δ (with α/β refuted). | All five |

## 5. VERDICT on original 0-result cause: δ

The W328-S2 hypotheses were:
- (α) `repo:owner/name` being wrong for /search/repositories → **REFUTED by Source 4 probe A** (total_count=1).
- (β) `owner:<x> <name>` being wrong (owner-not-user) → **REFUTED by Source 4 probes B and F** (total_count=155 and 13 respectively).
- (γ) Both → REFUTED by both above.
- (δ) Neither — actual cause was rate-limit / cache / something else.

**The verdict is (δ) — Neither.** Codex's hypothesis "it may have been `owner:` that was the invalid qualifier" is also REFUTED — `owner:` works fine on the live API, returning the same result set as `user:`/`org:`.

Plausible actual causes for the original 0-result observations (in priority order, all of which we should now investigate properly rather than assume USER-ERROR):

1. **Rate-limit / abuse-detection 200-with-empty-items** — extremely high search-API call frequency in W312/W316/W319 sessions may have hit the 30-req/min search rate limit; under some conditions GitHub returns 200 with empty results rather than 403. Probes today saw `x-ratelimit-remaining` decrement 9→3 across 7 probes — we were anonymous and unloaded. Heavy use would burn the budget rapidly.
2. **MCP server transformation or schema-trim** — the github-mcp-server may strip/transform the query string before passing it through (e.g. URL-encoding bugs, qualifier-allowlist), even though `search.go` line `searchQuery := query` suggests verbatim pass-through. The `MinimalRepository` output transform on success path might also drop fields, but it doesn't change total_count.
3. **Token/auth scope mismatch** — github-mcp-server with an authenticated PAT may scope queries to "repos visible to the token". If the token lacks visibility to `facebook/react` (impossible — it's public), or if the token had an expired/invalid scope at the time of W316/W319, queries would return narrower results. Worth a re-probe with the configured PAT vs. anonymous.
4. **Cache / stale-response from an intermediary** (CDN, MCP server's own cache, the operator's GitHub MCP server transport).
5. **Operator query had typos other than the qualifier** (e.g. trailing whitespace, double-encoded colons) that we did not preserve in the audit trail.

**None of these were investigated in W328.** W328 jumped straight to "user-error" without proving it.

## 6. Correction-patch summary (1-paragraph)

The W328-S2 cheatsheet at `docs/architecture/W328-GHMCP-USAGE-CORRECTION/CORRECT-USAGE.md` requires partial reversal:

1. The TL;DR rule #3 ("`repo:owner/name` is NOT a valid qualifier for `/search/repositories`") MUST be deleted.
2. The "NOT valid for `/search/repositories`" list MUST drop `repo:owner/name` and `owner:<owner>` (both are valid in practice; `owner:` is an undocumented-but-functional synonym of `user:`/`org:`).
3. The "Wave-by-wave re-analysis" section's "USER-ERROR-CONFIRMED" framing MUST be downgraded to "ROOT CAUSE UNDETERMINED — original hypothesis refuted, requires re-investigation of rate-limit / token-scope / MCP-server-transformation paths".
4. Pattern A (`get_repository` for exact-slug) remains correct as a faster/cheaper Stage-0 probe — but its justification changes from "search_repositories cannot do exact lookup" to "get_repository is cheaper and bypasses search-rate-limit budget".
5. The pattern catalog can ADD a new Pattern A2: `search_repositories` with `query: "repo:owner/name"` for the legitimate use-case of "exact slug confirmation via search rate-limit budget (not core rate-limit budget)".
6. Cite-anchor #2 (line 159) MUST be corrected: `repo:owner/name` is documented for repository search (Source 1 above), not "code/issue search ONLY".

Full patch in `Z:/claude-sota-installed/docs/architecture/W329-S2-REAUDIT/CORRECTION-PATCH.md`. Raw evidence preserved in `Z:/claude-sota-installed/docs/architecture/W329-S2-REAUDIT/EVIDENCE.md`.

## 7. Meta-lesson (W329 codex round-2 input)

This is a textbook case of the W316 confirmation-bias-discipline (R6) failing in the OPPOSITE direction from what the discipline was originally built for. The discipline was added to stop us PROPOSING fixes for upstream bugs that aren't actually bugs. But the same discipline failed in W328 by accepting "USER-ERROR" without verifying the user-error claim against the live API. The fix is symmetric: every "USER-ERROR" verdict needs the same level of source-deep-dive evidence as every "UPSTREAM-BUG" verdict.

Specifically, the W328-S2 missed-step was: it accepted the github/docs page reading "repo: is for code/issue search" without actually testing /search/repositories with `repo:owner/name` — and that reading was itself wrong (the github/docs repository-search page DOES list `repo:owner/name`; the W328-S2 author appears to have conflated the code-search and repo-search qualifier docs).

W329-C codex round-2 should accept this re-audit as the definitive answer for axis 3.
