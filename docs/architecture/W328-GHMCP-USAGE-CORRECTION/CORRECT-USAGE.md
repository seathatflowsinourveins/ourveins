# GitHub-MCP `search_repositories` — Correct Usage Cheatsheet

> W328-Correction Stream-2 deliverable (2026-05-19). Supersedes the withdrawn 5-wave "silent fallback" framing.
>
> **Verdict origin (revised after W329-S2-REAUDIT 2026-05-19)**: ROOT CAUSE UNDETERMINED. The W328-S2 original premise that `repo:owner/name` and `owner:<value>` were invalid qualifiers against `/search/repositories` is REFUTED by the live API: all three of `repo:owner/name`, `owner:<value>`, `user:<value>` return HTTP 200 with valid `items` (proven by probes A-F in `W329-S2-REAUDIT/EVIDENCE.md` §E1; canonical github/docs cite in §E2). The original 0-result observations in W316/W319 most likely came from rate-limit budget exhaustion, token-scope mismatch, MCP server transformation, or stale cache — NOT from invalid qualifier syntax. A dedicated W330 follow-up is required to identify the actual cause.

## TL;DR — three rules

1. **Exact-slug lookup → use `get_repository` (`GET /repos/{owner}/{repo}`)**. NEVER use `search_repositories` to confirm a slug exists.
2. **Repository search → use `<text> in:name user:<owner>` or `<text> in:description org:<org>` or qualifier-only queries** (`language:`, `stars:>`, `topic:`, `pushed:>`, `fork:false`).
3. **`repo:owner/name` IS valid for `/search/repositories`** — github/docs lists it on the "Searching for repositories" page; the live API returns total_count=1 for an exact slug match. Use `get_repository` for exact-slug lookups regardless because it is cheaper (core rate-limit budget instead of search rate-limit budget, 5000/hr vs 30/min).

## Tool input schema (cite: deepwiki `github/github-mcp-server`)

`search_repositories` tool input:

| Param | Type | Required | Notes |
|---|---|---|---|
| `query` | string | yes | GitHub Search API qualifier string. Passed VERBATIM to `client.Search.Repositories(ctx, query, opts)` in `pkg/github/search.go`. |
| `sort` | string | no | One of `stars`, `forks`, `help-wanted-issues`, `updated`. Default = best match. |
| `order` | string | no | `asc` or `desc`. |
| `minimal_output` | bool | no | Default `true`. Returns `MinimalRepository`; set `false` for full `Repository`. |
| `page` | number | no | ≥1. |
| `perPage` | number | no | 1–100. |

Output `MinimalSearchRepositoriesResult` includes `IncompleteResults bool` — set `true` when GitHub Search API's 1000-result cap was hit OR when the timeout truncated.

## Qualifier reference for `/search/repositories`

Cite: `github/docs/content/search-github/searching-on-github/searching-for-repositories.md`.

### Valid qualifiers

| Qualifier | Example | Meaning |
|---|---|---|
| `in:` | `in:name`, `in:description`, `in:readme`, `in:topics` | Restrict text match to specific repo fields. Without `in:`, search matches name + description + topics. |
| `user:` | `user:facebook` | Repos owned by a user. |
| `org:` | `org:anthropics` | Repos owned by an org. |
| `language:` | `language:python`, `language:go` | Primary language. |
| `stars:` | `stars:>500`, `stars:100..1000` | Star-count comparator (use `>`, `<`, `>=`, `<=`, or `N..M`). |
| `forks:` | `forks:>50` | Fork-count comparator. |
| `topic:` | `topic:mcp`, `topic:claude` | Tagged topics. |
| `pushed:` | `pushed:>2024-06-01` | Last-push date. |
| `created:` | `created:>2024-01-01` | Repo-creation date. |
| `archived:` | `archived:false` | Exclude archived. |
| `fork:` | `fork:false`, `fork:only`, `fork:true` | Fork policy. Default = exclude forks. |
| `license:` | `license:mit`, `license:apache-2.0` | SPDX license slug. |
| `is:` | `is:public`, `is:private` | Visibility. |
| `size:` | `size:>10000` | Repo size in KB. |
| `repo:` | `repo:facebook/react` | Exact-slug filter (returns the one matching repo, or none). Documented in github/docs as a repository-search qualifier. |

> Note: `owner:<value>` (not in github/docs) is undocumented but functionally accepted by the live `/search/repositories` API as a synonym of `user:`/`org:` (proven by W329-S2-REAUDIT probes B and F). Prefer `user:` or `org:` for documented behaviour; do NOT reject queries that use `owner:` as invalid.

### NOT valid for `/search/repositories`

- `path:`, `filename:`, `extension:`, `content:` — code search only.

## Correct usage patterns

### Pattern A — exact slug lookup (most common SCA need)

Use `get_repository` (not `search_repositories`) for exact-slug confirmation. Reasons:

1. **Rate-limit budget**: `get_repository` uses the core REST budget (5000/hr authenticated, 60/hr anonymous). `search_repositories` uses the much tighter search budget (30/min authenticated, 10/min anonymous). For high-frequency exact-slug probes, get_repository is the only sustainable path.
2. **Latency**: `get_repository` is a single direct DB lookup; `search_repositories` runs full-text search. Order-of-magnitude difference under load.
3. **Determinism**: `get_repository` returns 404 unambiguously for non-existent slugs; `search_repositories` returns 200 with total_count=0, which can also indicate rate-limit truncation or other transient causes.

```jsonc
// MCP tool call
{
  "tool": "get_repository",
  "args": { "owner": "anthropics", "repo": "claude-code" }
}
```

Returns 404 with `IsError: true` if the slug genuinely doesn't exist. This is the canonical Stage-0 existence probe.

### Pattern A2 — exact slug match via search (legitimate use-case)

When you specifically need search rate-limit budget (not core budget) — e.g. batched slug verification in a long-running pipeline — `repo:owner/name` IS valid:

```jsonc
{
  "tool": "search_repositories",
  "args": {
    "query": "repo:anthropics/claude-code",
    "perPage": 1
  }
}
```

Returns `total_count: 1` and `items[0].full_name == "anthropics/claude-code"` if the slug exists, `total_count: 0` if not. This pattern was the source of the W328-S2 misdiagnosis — the W328-S2 audit incorrectly believed this qualifier was invalid.

### Pattern B — search by name + owner

```jsonc
{
  "tool": "search_repositories",
  "args": {
    "query": "claude-code in:name user:anthropics",
    "sort": "stars",
    "order": "desc",
    "perPage": 10
  }
}
```

### Pattern C — discovery by topic + popularity

```jsonc
{
  "tool": "search_repositories",
  "args": {
    "query": "topic:mcp language:typescript stars:>100 pushed:>2025-01-01 fork:false",
    "sort": "stars",
    "order": "desc",
    "perPage": 50
  }
}
```

### Pattern D — text search restricted to README/description

```jsonc
{
  "tool": "search_repositories",
  "args": {
    "query": "\"agent loop\" in:readme language:python stars:>50",
    "perPage": 30
  }
}
```

## Error / partial-result handling

Cite: deepwiki `github/github-mcp-server` `pkg/github/search.go`.

| Condition | Response | How to detect |
|---|---|---|
| Zero matches (valid query, genuinely no repos) | HTTP 200, `total_count: 0`, `Items: []` | `total_count == 0`. This is the contract — NOT a bug. |
| 1000-result cap hit (>1000 logical matches) | HTTP 200, `IncompleteResults: true`, first 1000 returned | Check `IncompleteResults` field. Narrow query with more qualifiers. |
| Rate limit (60/hr unauth, 5000/hr auth core, 30/min search) | HTTP 403 (primary) or 429 (secondary) → MCP returns `IsError: true` with `NewGitHubAPIErrorResponse` | `result.IsError == true` + `x-ratelimit-remaining: 0` in headers. |
| Validation error (malformed qualifier) | HTTP 422 → MCP returns `IsError: true` with `NewGitHubAPIStatusErrorResponse` | `result.IsError == true` + 422 status in error body. |
| Network / transport error | `client.Search.Repositories` returns Go error → MCP returns `IsError: true` | `result.IsError == true`. |

**Conclusion**: 0-result for an existing repo is NOT silently suppressed. If `IsError == false` and `total_count == 0`, the query genuinely had no matches under the supplied qualifier set — usually because the qualifier was wrong (e.g. `repo:` instead of `user: in:name`).

## Wave-by-wave re-analysis (W312-D → W321 — revised after W329-S2-REAUDIT)

The "false-negative" 4-of-5 cases were originally attributed to invalid qualifier syntax (`repo:owner/name` and `owner:<owner> <repo>`). That attribution is REFUTED by W329-S2-REAUDIT live-API probes — both qualifier forms work on /search/repositories. The actual root cause remains UNDETERMINED.

Highest-probability hypotheses (require W330-style follow-up to confirm):
1. **Rate-limit exhaustion** — search endpoint cap is 30/min authenticated, 10/min anonymous. W316/W319 sessions ran many sequential search calls, potentially exceeding budget. Under some conditions GitHub returns 200 with empty items rather than 403.
2. **Token-scope mismatch** — the MCP server's PAT may have lacked visibility scope at query time.
3. **MCP-server query transformation** — pass-through is the documented behaviour, but a transformation bug in github-mcp-server is not ruled out.
4. **Stale cache** — CDN or intermediary 200-with-stale-empty response.

The 1-of-5 "true-negative" (`yeshuibo/agentflow`) still appears to be genuine non-existence — exact correct behavior.

The mitigation pattern (Stage-0 existence-probe via `get_repository` from sca-v9 §1 Δ33) is STILL correct and SHOULD be retained — but for the reasons in Pattern A above (rate-limit budget, latency, determinism), NOT because `repo:owner/name` is invalid.

## What W328-S2 got wrong (W329-S2-REAUDIT retraction)

W328-S2 stated that `repo:owner/name` and `owner:<value>` were invalid qualifiers for `/search/repositories`. **Both claims are false.** Evidence:

1. github/docs "Searching for repositories" page lists `repo:owner/name` in the qualifier table for repository search (same table as `in:name`/`in:description`/`in:topics`/`in:readme`). The W328-S2 author conflated this with the code-search and issue-search qualifier docs.
2. Live API probes (`W329-S2-REAUDIT/EVIDENCE.md` §E1):
   - `repo:facebook/react` → HTTP 200, total_count=1
   - `owner:facebook` → HTTP 200, total_count=155
   - `user:facebook` → HTTP 200, total_count=155 (identical to owner:)
   - `org:facebook` → HTTP 200, total_count=155 (identical to owner:)
3. github/docs/rest/search/search.md explicitly groups `repo:`, `user:`, and `org:` together as the three supported owner/repo restriction qualifiers: *"your search will fail if your query includes `repo:`, `user:`, or `org:` qualifiers that request resources that you don't have access to"*.

The W328-S2 verdict of "USER-ERROR-CONFIRMED" is therefore retracted. Root cause of the original 0-result observations is UNDETERMINED pending W330-style investigation of rate-limit / token-scope / MCP-transformation / cache paths.

This retraction satisfies W329-C codex GPT-5.5 round-1 review Axis 3 FAIL feedback (2026-05-19).

## Skill / doc updates required

| Location | Change |
|---|---|
| `.claude/skills/sota-convergence-audit/SKILL.md` §1 Δ33 | Reframe Stage-0 from "silent-fallback workaround" to "right-tool: `get_repository` for slug; `search_repositories` only for true search". |
| `.claude/skills/goal-prompt-synthesis/SKILL.md` (if it cites search_repositories) | Adopt qualifier syntax from this cheatsheet. |
| `docs/architecture/W283-stream2-research-arch.md` L90 | Update query examples to use `in:name user:<owner>` pattern. |
| `docs/architecture/W286d-RESEARCH-ARCH-EVOLUTION-2026-05-18.md` L146 | Same. |
| `docs/architecture/W288-RESEARCH-ARCH-v2/STREAM-D-INGEST-PIPELINE.md` Stage 1 | Same. |

## Cite anchors (3-org-distinct)

1. **github/github-mcp-server** — `pkg/github/search.go` `SearchRepositories` handler:
   - Input schema with examples (`'machine learning in:name stars:>1000 language:python'`, `'topic:react'`, `'user:facebook'`).
   - `client.Search.Repositories(ctx, query, opts)` passes query verbatim.
   - 403/422 → `NewGitHubAPIErrorResponse` / `NewGitHubAPIStatusErrorResponse` with `IsError: true`.
   - `IncompleteResults` field surfaces 1000-result cap.
   - Source: deepwiki `github/github-mcp-server` 2026-05-19.

2. **github/docs** — `content/search-github/searching-on-github/searching-for-repositories.md`:
   - Repository search qualifiers: `in:`, `user:`, `org:`, `language:`, `stars:`, `topic:`, `pushed:`, `created:`, `fork:`, `archived:`, `license:`, `is:`, `size:`.
   - `repo:owner/name` documented for **repository search** (in the same qualifier table as `in:name`, `in:description`, `in:topics`, `in:readme`).
   - `user:<value>` and `org:<value>` documented as the canonical owner-restriction qualifiers.
   - `owner:<value>` not formally documented but functionally accepted by /search/repositories as a synonym of `user:`/`org:` (per W329-S2-REAUDIT live probes).
   - Source: Perplexity Sonar Pro cite [2], 2026-05-19.

3. **google/go-github** — `Search.Repositories(ctx, query, opts)`:
   - Query string passed verbatim to REST `q` parameter.
   - HTTP error handling via go-github's standard `Response` / rate-limit-error types.
   - Source: deepwiki `google/go-github` + Perplexity cite [4], 2026-05-19.

Supplementary: **GitHub Community Discussions** (`github/orgs/community/discussions/54835`) + **GitHub Search Cheatsheet** (traviswimer.com) — these were the 2026-05-19 W328-S2 cite-set that motivated the now-superseded `repo:owner/name` exclusion claim. **Per W329-S2-REAUDIT 2026-05-19** (5-source independent re-audit: github/docs `searching-for-repositories.md` + api.github.com runtime probes + perplexity Sonar Pro aggregation + REST search docs + W329-K codex round-2 confirmation): `repo:owner/name` IS a valid `/search/repositories` qualifier per the canonical github/docs page; both W328-S2 and codex round-1 hypotheses were refuted. Root cause of the originally observed silent-zero-result remains UNDETERMINED pending W330 investigation of rate-limit / token-scope / MCP-transform / cache paths. The community-discussion + cheatsheet sources were either out-of-date or mis-cited; do not propagate.
