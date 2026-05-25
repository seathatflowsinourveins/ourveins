# W329-S2-REAUDIT — Raw Evidence (audit trail)

> Source-deep-dive raw fetches preserved verbatim (truncated where appropriate) for cross-checking the VERDICT.md conclusions. Date: 2026-05-19.

## E1. Live GitHub Search API probes — full JSON output

Probe script (executed via `ctx_execute` JavaScript):
```js
const queries = [
  { label: 'A_repo_owner_name', q: 'repo:facebook/react' },
  { label: 'B_owner_facebook', q: 'owner:facebook' },
  { label: 'C_user_facebook', q: 'user:facebook' },
  { label: 'D_org_facebook', q: 'org:facebook' },
  { label: 'E_react_user_facebook', q: 'react user:facebook' },
  { label: 'F_react_owner_facebook', q: 'react owner:facebook' },
  { label: 'G_react_in_name', q: 'react in:name' },
];
// GET https://api.github.com/search/repositories?q=<q>&per_page=3
// Headers: Accept: application/vnd.github+json, X-GitHub-Api-Version: 2022-11-28, User-Agent: W329-S2-REAUDIT
```

Output (verbatim):
```json
{
  "A_repo_owner_name": {
    "query": "repo:facebook/react",
    "url": "https://api.github.com/search/repositories?q=repo%3Afacebook%2Freact&per_page=3",
    "http_status": 200,
    "total_count": 1,
    "items_returned": 1,
    "first_full_names": ["facebook/react"],
    "message": null,
    "documentation_url": null,
    "errors": null,
    "rate_limit_remaining": "9"
  },
  "B_owner_facebook": {
    "query": "owner:facebook",
    "url": "https://api.github.com/search/repositories?q=owner%3Afacebook&per_page=3",
    "http_status": 200,
    "total_count": 155,
    "items_returned": 3,
    "first_full_names": ["facebook/react", "facebook/react-native", "facebook/docusaurus"],
    "message": null, "documentation_url": null, "errors": null,
    "rate_limit_remaining": "8"
  },
  "C_user_facebook": {
    "query": "user:facebook",
    "url": "https://api.github.com/search/repositories?q=user%3Afacebook&per_page=3",
    "http_status": 200,
    "total_count": 155,
    "items_returned": 3,
    "first_full_names": ["facebook/react", "facebook/react-native", "facebook/docusaurus"],
    "message": null, "documentation_url": null, "errors": null,
    "rate_limit_remaining": "7"
  },
  "D_org_facebook": {
    "query": "org:facebook",
    "url": "https://api.github.com/search/repositories?q=org%3Afacebook&per_page=3",
    "http_status": 200,
    "total_count": 155,
    "items_returned": 3,
    "first_full_names": ["facebook/react", "facebook/react-native", "facebook/docusaurus"],
    "message": null, "documentation_url": null, "errors": null,
    "rate_limit_remaining": "6"
  },
  "E_react_user_facebook": {
    "query": "react user:facebook",
    "url": "https://api.github.com/search/repositories?q=react%20user%3Afacebook&per_page=3",
    "http_status": 200,
    "total_count": 13,
    "items_returned": 3,
    "first_full_names": ["facebook/react", "facebook/react-native", "facebook/react-native-website"],
    "message": null, "documentation_url": null, "errors": null,
    "rate_limit_remaining": "5"
  },
  "F_react_owner_facebook": {
    "query": "react owner:facebook",
    "url": "https://api.github.com/search/repositories?q=react%20owner%3Afacebook&per_page=3",
    "http_status": 200,
    "total_count": 13,
    "items_returned": 3,
    "first_full_names": ["facebook/react", "facebook/react-native", "facebook/react-native-website"],
    "message": null, "documentation_url": null, "errors": null,
    "rate_limit_remaining": "4"
  },
  "G_react_in_name": {
    "query": "react in:name",
    "url": "https://api.github.com/search/repositories?q=react%20in%3Aname&per_page=3",
    "http_status": 200,
    "total_count": 4946172,
    "items_returned": 3,
    "first_full_names": ["facebook/react", "typescript-cheatsheets/react", "duxianwei520/react"],
    "message": null, "documentation_url": null, "errors": null,
    "rate_limit_remaining": "3"
  }
}
```

Key observations:
- All seven probes returned HTTP 200; none returned 422 Validation Failed.
- `documentation_url: null` and `errors: null` across all probes (no rejection).
- `rate_limit_remaining` decremented 10→3 across 7 probes, confirming search rate-limit budget burns ~1 per probe (and would burn 30/min cap quickly under heavy use).
- `total_count` identical for `owner:facebook`, `user:facebook`, `org:facebook` (= 155) — confirms `owner:` is a functional synonym.
- `total_count` identical for `react user:facebook` and `react owner:facebook` (= 13) — confirms same result set.

## E2. github/docs — searching-for-repositories.md (the exact file codex cited)

Source: `https://raw.githubusercontent.com/github/docs/main/content/search-github/searching-on-github/searching-for-repositories.md` (HEAD main, fetched 2026-05-19, 18.4KB indexed across 76 sections).

Key quoted sections (verbatim from ctx_search retrieval):

### Frontmatter
```yaml
---
title: Searching for repositories
intro: 'You can search for repositories on {% data variables.product.github %} and narrow the results using these repository search qualifiers in any combination.'
```

### Qualifier table (the central evidence)
```markdown
| Qualifier  | Example
| ------------- | -------------
| `in:name` | jquery in:name matches repositories with "jquery" in the repository name.
| `in:description`  | jquery in:name,description matches repositories with "jquery" in the repository name or description.
| `in:topics`  | jquery in:topics matches repositories labeled with "jquery" as a topic.
| `in:readme` | jquery in:readme matches repositories mentioning "jquery" in the repository's README file.
| `repo:owner/name` | repo:octocat/hello-world matches a specific repository name.
```

**Confirmed**: `repo:owner/name` is listed in the **same qualifier table** as `in:name`/`in:description`/`in:topics`/`in:readme` on the **"Searching for repositories"** page. This DIRECTLY contradicts W328-S2's claim that `repo:owner/name` is "code/issue search only".

### user:/org: section (verbatim)
```markdown
## Search within a user's or organization's repositories

To search in all repositories owned by a certain user or organization, you can use the user or org qualifier.

| Qualifier  | Example
| ------------- | -------------
| user:USERNAME | user:defunkt forks:>100 matches repositories from @defunkt that have more than 100 forks.
| org:ORGNAME | org:github matches repositories from GitHub.
```

**Confirmed**: `user:` and `org:` are listed as the documented owner-restriction qualifiers. The github/docs page does NOT list `owner:` — but the live API accepts it (E1 probes B, F).

## E3. docs.github.com REST API search docs

Source: `https://docs.github.com/en/rest/search/search?apiVersion=2022-11-28`, fetched 2026-05-19, 65.9KB.

### /search/repositories `q` parameter description (verbatim)
```text
q  string  Required

The query contains one or more search keywords and qualifiers. Qualifiers allow you to limit your search to specific areas of GitHub. The REST API supports the same qualifiers as the web interface for GitHub. To learn more about the format of the query, see Constructing a search query. See "Searching for repositories" for a detailed list of qualifiers.
```

### Constructing a search query — example (verbatim)
```text
For example, if you wanted to search for all repositories owned by `defunkt` that contained the word `GitHub` and `Octocat` in the README file, you would use the following query with the search repositories endpoint:

GitHub Octocat in:readme user:defunkt
```

**Confirmed**: REST docs explicitly point to "Searching for repositories" (= Source 1 / E2) as the qualifier reference for /search/repositories. They share the same qualifier set.

## E4. github/github-mcp-server pkg/github/search.go

Source: `https://raw.githubusercontent.com/github/github-mcp-server/main/pkg/github/search.go`, fetched 2026-05-19, 15.7KB.

### `SearchRepositories` tool definition (verbatim)
```go
// SearchRepositories creates a tool to search for GitHub repositories.
func SearchRepositories(t translations.TranslationHelperFunc) inventory.ServerTool {
	schema := &jsonschema.Schema{
		Type: "object",
		Properties: map[string]*jsonschema.Schema{
			"query": {
				Type:        "string",
				Description: "Repository search query. Examples: 'machine learning in:name stars:>1000 language:python', 'topic:react', 'user:facebook'. Supports advanced search syntax for precise filtering.",
			},
			"sort": {
				Type:        "string",
				Description: "Sort repositories by field, defaults to best match",
				Enum:        []any{"stars", "forks", "help-wanted-issues", "updated"},
			},
			"order": {
				Type:        "string",
				Description: "Sort order",
				Enum:        []any{"asc", "desc"},
			},
			"minimal_output": {
				Type:        "boolean",
				Description: "Return minimal repository information (default: true). When false, returns full GitHub API repository objects.",
				Default:     json.RawMessage(`true`),
			},
		},
		Required: []string{"query"},
	}
	WithPagination(schema)
```

### Tool registration (verbatim)
```go
return NewTool(
    ToolsetMetadataRepos,
    mcp.Tool{
        Name:        "search_repositories",
        Description: t("TOOL_SEARCH_REPOSITORIES_DESCRIPTION", "Find GitHub repositories by name, description, readme, topics, or other metadata. Perfect for discovering projects, finding examples, or locating specific repositories across GitHub."),
        Annotations: &mcp.ToolAnnotations{
            Title:        t("TOOL_SEARCH_REPOSITORIES_USER_TITLE", "Search repositories"),
            ReadOnlyHint: true,
        },
        InputSchema: schema,
    },
    []scopes.Scope{scopes.Repo},
    func(ctx context.Context, deps ToolDependencies, _ *mcp.CallToolRequest, args map[string]any) (*mcp.CallToolResult, any, error) {
        query, err := RequiredParam[string](args, "query")
```

### Query pass-through (verbatim from SearchUsers nearby — same `client.Search` pattern as SearchRepositories)
```go
searchQuery := query
if !hasTypeFilter(query) {
    searchQuery = "type:" + accountType + " " + query
}
result, resp, err := client.Search.Users(ctx, searchQuery, opts)
```

For `SearchRepositories`, the equivalent call is `client.Search.Repositories(ctx, query, opts)` — passing the operator's `query` verbatim to the GitHub REST API. The docstring listing examples uses `user:facebook` but does NOT explicitly forbid `repo:owner/name` or `owner:<value>` — these are implicitly supported by pass-through.

## E5. Perplexity Sonar Pro aggregated search

Query: "GitHub API /search/repositories supports owner: qualifier vs user: qualifier difference"
Returned 8 results 2026-05-19. Cross-org-distinct excerpts:

### Result 1 — github/docs/searching-for-repositories.md (re-confirms E2)
```text
|repo:owner/name|repo:octocat/hello-world matches a specific repository name.|
## Search within a user's or organization's repositories
To search in all repositories owned by a certain user or organization, you can use the user or org qualifier.
|user:*USERNAME*|user:defunkt forks:>100 matches repositories from @defunkt that have more than 100 forks.|
|org:*ORGNAME*|org:github matches repositories from GitHub.|
```

### Result 4 — github/docs/rest/search/search.md (the source of the REST API doc page)
```text
You need to successfully authenticate and have access to the repositories in your search queries, otherwise, you'll see a `422 Unprocessable Entry` error with a "Validation Failed" message. For example, your search will fail if your query includes `repo:`, `user:`, or `org:` qualifiers that request resources that you don't have access to when you sign in on GitHub.
```

**Most damning evidence**: github/docs itself explicitly groups `repo:`, `user:`, and `org:` together as the three supported owner/repo restriction qualifiers at the /search endpoints. This is a SINGLE SENTENCE that refutes the entire W328-S2 premise.

### Result 7 — docs.github.com Enterprise Server 3.6 (Enterprise distinct doc tree)
```text
For example, your search will fail if your query includes `repo:`, `user:`, or `org:` qualifiers that request resources that you don't have access to when you sign in on GitHub.
When your search query requests multiple resources, the response will only contain the resources that you have access to and will not provide an error message listing the resources that were not returned.
```

Enterprise Server doc independently confirms the same three-qualifier grouping. Mirror copy in distinct doc tree.

### Result 5 — docs2.lfe.io/v3/search/ (third-org mirror/derivative)
```text
search term can also contain any combination of the supported repository search qualifiers:
- in    Qualifies which fields are searched...
- user or repo    Limits searches to a specific user or repository.
- language    Searches repositories based on the language they're written in.
```

Third-party documentation snapshot agreeing that `user` and `repo` are valid repository-search qualifiers.

## E6. Rate-limit budget evidence (relevant to verdict δ root-cause hypothesis #1)

From E1, `x-ratelimit-remaining` decremented 9→3 across 7 anonymous probes. GitHub's documented anonymous search rate limit is 10/min, authenticated is 30/min. In W316/W319 sessions doing dozens of search calls in quick succession, the limit would have been exceeded — and some configurations of the search endpoint return 200 with empty/truncated items rather than 403 secondary-limit responses. This is the most plausible cause of the "false negatives" the operator attributed to "USER-ERROR".

This requires a dedicated re-probe under realistic session load to confirm. Out of scope for this audit (which only re-verifies the qualifier-validity claim). Recommend a W330-style follow-up.

## E7. File paths created by this audit

```
Z:/claude-sota-installed/docs/architecture/W329-S2-REAUDIT/VERDICT.md
Z:/claude-sota-installed/docs/architecture/W329-S2-REAUDIT/EVIDENCE.md
Z:/claude-sota-installed/docs/architecture/W329-S2-REAUDIT/CORRECTION-PATCH.md
```

No edits to `docs/architecture/W328-GHMCP-USAGE-CORRECTION/` (parent will apply patches per task constraints).
