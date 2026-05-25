# Stage-0 / Stage-0.5 Bypass Cascade Reference (sca-v12 W329)

> Loaded on-demand by `SKILL.md §1` + `§1.5`. Operator principle (2026-05-19): "mature repos = look at your own usage first; if rate-limited, use GraphQL / cursor / dataset-snapshot / BigQuery." Tempered by W329-S2-REAUDIT: source-deep-dive must include LIVE-API behavior verification, not just doc-reading; W328-S2 itself was a doc-reading-misread case.
>
> **Scope**: paste-ready bypass queries for Stage-0 EXISTENCE + Stage-0.5 ENUMERATION-BYPASS phases. Closes W328-S1 (HF) USER-ERROR-CONFIRMED. W328-S2 (GH-MCP) verdict was RETRACTED by W329-S2-REAUDIT — root cause UNDETERMINED; Stage-0 `get_repository` pattern RETAINED for rate-limit-budget reasons (core 5000/hr vs search 30/min), NOT qualifier-invalidity.

---

## §A. Stage-0 EXISTENCE — Correct usage per family

### A.1 GitHub-MCP family — `get_repository` for exact-slug; `search_repositories` only with VALID qualifiers

| Need | Tool | Args | Pass |
|---|---|---|---|
| Exact-slug existence | `mcp__plugin_everything-claude-code_github__get_repository` | `{owner, repo}` | non-404 = exists |
| Discovery by topic | `search_repositories` | `query="topic:mcp language:typescript stars:>100 pushed:>2025-01-01 fork:false"` | `total_count >= 1` AND `IncompleteResults` checked |
| Name+owner search | `search_repositories` | `query="<text> in:name user:<owner>"` | `total_count >= 1` |
| Readme text | `search_repositories` | `query="<phrase> in:readme language:python stars:>50"` | `total_count >= 1` |

**NOTE** (per W328-S2 + W329-S2-REAUDIT, root cause UNDETERMINED):
- `repo:owner/name` against `/search/repositories` — **VALID** per W329-S2-REAUDIT live probes (the prior W328-S2 "invalid for repo-search" claim was a doc-reading-misread, FULLY RETRACTED). Use `get_repository` PREFERRED for rate-limit-budget reasons (core 5000/hr vs search 30/min), NOT because `repo:` is invalid.
- `owner:<value>` — **VALID** per W329-S2-REAUDIT (functionally accepted synonym of `user:`/`org:`; not formally in github/docs). Prefer `user:` or `org:` for documented behaviour; do NOT reject `owner:` queries as invalid.
- For 0-result observations on `search_repositories`, investigate rate-limit / token-scope / MCP-transformation / stale-cache before classifying as USER-ERROR (W330 follow-up scope).

### A.2 HF-MCP family — single-token `query` OR tag-`filters[]` only

| Need | Tool | Args |
|---|---|---|
| Name-keyword | `hub_repo_search` | `{query: "dspy", repo_types: ["model","dataset","space"], limit: 20, sort: "trendingScore"}` |
| Tag-listing | `hub_repo_search` | `{filters: ["mcp-server"], repo_types: ["space"], sort: "trendingScore", limit: 20}` |
| Author-namespace | `hub_repo_search` | `{author: "huggingface", repo_types: ["model"], sort: "downloads"}` |

**ANTI-patterns** (USER-ERROR-CONFIRMED per W328-S1): multi-word free-text `query="claude code mcp agent harness"` returns 0 because `query` is **substring match on repo IDs only**, NOT tokenized AND. Use Pattern B (tag-filter) for SOTA-discovery class workloads.

---

## §B. Stage-0.5 ENUMERATION-BYPASS — >1000-result workloads

Mandatory when search-family is involved AND `repositoryCount > 1000` (GH) OR you need exhaustive HF Hub enumeration.

### B.1 HF — M5 DuckDB-snapshot (PRIMARY) + M1 cursor-walk (DELTA)

**M5 — `cfahlgren1/hub-stats` parquet snapshot via DuckDB** (preferred for bulk; Resolvers rate-bucket is ~6-10× higher than Hub APIs):

```sql
INSTALL httpfs; LOAD httpfs;
-- All models tagged 'mcp', sorted by trending
SELECT id, author, likes, downloads, trendingScore, tags
FROM read_parquet('https://huggingface.co/api/datasets/cfahlgren1/hub-stats/parquet/models/train/*.parquet')
WHERE list_contains(tags, 'mcp')
ORDER BY trendingScore DESC NULLS LAST
LIMIT 100;
```

Shortcut CLI (`huggingface_hub>=1.2.0`):

```bash
hf datasets sql "SELECT COUNT(*) FROM read_parquet('https://huggingface.co/api/datasets/cfahlgren1/hub-stats/parquet/models/train/0.parquet') WHERE list_contains(tags, 'mcp')"
```

Snapshot coverage (2026-05-19 verified): 2.89M models · 1.01M datasets · 1.3M spaces · 85.4k arxiv_papers · 15k papers · 1.43k posts. Refresh cadence: ~daily.

**M1 — `HfApi.list_models()` cursor walk** (delta layer for fresh-tail <24h):

```python
from huggingface_hub import HfApi
api = HfApi()
# Walk all pages; auto-retry on 429 via huggingface_hub>=1.2.0 smart-backoff
for m in api.list_models(filter="mcp-server", sort="last_modified", direction=-1, limit=None):
    print(m.id, m.last_modified)
```

### B.2 GitHub — 6-step bypass cascade

For SOTA discovery beyond REST/GraphQL 1000-cap (e.g., `topic:mcp-server stars:>500 created:>=2025-11-19`):

**Step 1 — Sizing probe** (single GraphQL `search`):

```graphql
query SizingProbe {
  rateLimit { cost remaining resetAt }
  search(query: "topic:mcp-server stars:>500 created:>=2025-11-19", type: REPOSITORY, first: 1) {
    repositoryCount
  }
}
```

If `repositoryCount <= 1000` → skip to Step 3. Else → Step 2.

**Step 2 — Binary-split window-partition** until each window ≤1000:
- Date-split: `created:2025-11-19..2026-02-19` + `created:2026-02-20..2026-05-19`
- Stars-split (when date is already narrow): `stars:500..1500` + `stars:1501..50000`

**Step 3 — Enumerate each window** with cursor pagination (100/page):

```graphql
query EnumerateMCPServers($q: String!, $after: String) {
  rateLimit { cost remaining resetAt }
  search(query: $q, type: REPOSITORY, first: 100, after: $after) {
    repositoryCount
    pageInfo { hasNextPage endCursor }
    nodes {
      ... on Repository {
        nameWithOwner url description
        stargazerCount forkCount
        createdAt pushedAt
        primaryLanguage { name }
        repositoryTopics(first: 20) { nodes { topic { name } } }
        licenseInfo { spdxId }
        isFork isArchived isMirror
      }
    }
  }
}
```

CLI: `gh api graphql -F query=@enumerate.graphql -F q='topic:mcp-server stars:>500 created:>=2025-11-19' --jq '.data.search'`

**Step 4 — Cross-validate with BigQuery snapshot** (anti-search-index-lag):

```sql
SELECT r.repo_name, l.language, c.commits_total
FROM `bigquery-public-data.github_repos.sample_repos` AS r
LEFT JOIN `bigquery-public-data.github_repos.languages` AS l ON l.repo_name = r.repo_name
LEFT JOIN (
  SELECT repo_name, COUNT(*) AS commits_total
  FROM `bigquery-public-data.github_repos.sample_commits`
  GROUP BY repo_name
) AS c ON c.repo_name = r.repo_name
WHERE r.watch_count > 500
  AND EXISTS (
    SELECT 1 FROM `bigquery-public-data.github_repos.sample_files` AS f
    WHERE f.repo_name = r.repo_name
      AND (f.path LIKE '%.mcp.json' OR f.path = 'mcp.json' OR f.path LIKE '%/SKILL.md')
  )
ORDER BY r.watch_count DESC LIMIT 5000;
```

**Step 5 — Anti-star-bias** via ecosyste.ms `repos.ecosyste.ms/api/v1/hosts/GitHub/repositories/{owner}/{name}` for fork-count + watcher-count + commit-count + dependent-repo-count (star-independent quality signals; feeds D33).

**Step 6 — Trending velocity** via GH Archive BigQuery:

```sql
SELECT repo.name, DATE(created_at) AS day, COUNT(*) AS stars_per_day
FROM `githubarchive.day.2*`
WHERE _TABLE_SUFFIX BETWEEN '0251119' AND '0260519'
  AND type = 'WatchEvent'
  AND repo.name IN ('modelcontextprotocol/python-sdk', 'anthropics/claude-code')
GROUP BY repo.name, day
ORDER BY repo.name, day;
```

---

## §C. Rate-limit bucket mapping

| Method bucket | Service | Quota (anonymous / auth) | Bypass-method-mapping |
|---|---|---|---|
| HF Hub APIs | `/api/models`, `/api/datasets`, `/api/spaces`, M3 MCP | 500-10k/5min IP / plan-based | M1 cursor walk (auth) |
| HF Resolvers | parquet files, `cfahlgren1/hub-stats` fetch | 5k-500k/5min | M5 DuckDB-snapshot (recommended) |
| HF Webhooks | push events | 1k triggers/24h hard cap (PRO+ raises) | M6 real-time stream |
| GH REST core | `/repos`, `/orgs/.../repos`, `/users/.../repos`, `/repositories?since=` | 60/hr unauth · 5000/hr auth | Method 4-6 (no cap; cursor pagination) |
| GH REST search | `/search/*` | 10/min unauth · 30/min auth | Method 3 (window-partition; ≤1000/window) |
| GH GraphQL | `query { search(...) }` + connections | 5000 pts/hr (~1 pt/call) + 2000 pts/min secondary | Method 3 (window-partition) OR Method 4 (no-cap owner connections) |
| BigQuery | `bigquery-public-data.github_repos` + `githubarchive.day.*` | 1 TB/mo free-tier scan | Method 7-8 (no cap; SQL JOIN/WHERE) |
| ecosyste.ms | `repos.ecosyste.ms/api/v1` | 5000/hr per IP (polite-pool higher) | Method 9 (multi-host: GH+GitLab+Codeberg) |

---

## §D. 3-org-distinct cite anchors

**Stage-0 EXISTENCE correct-usage**:
1. `docs.github.com/en/search-github/searching-on-github/searching-for-repositories` (GitHub/Microsoft) — repository search qualifier reference
2. `huggingface.co/docs/huggingface_hub/package_reference/hf_api` (Hugging Face Inc) — `HfApi.list_models` `search` substring-only docstring
3. `github.com/github/github-mcp-server` `pkg/github/search.go` (GitHub-MCP server maintainers) — `IsError` / `IncompleteResults` contract

**Stage-0.5 ENUMERATION-BYPASS**:
1. `docs.github.com/en/graphql/guides/using-pagination-in-the-graphql-api` (GitHub/Microsoft) — cursor pagination; `first:`/`after:` ≤100
2. `cloud.google.com/bigquery/public-data/github` (Google Cloud) — `bigquery-public-data.github_repos` snapshot + `githubarchive.day.*` event log
3. `huggingface.co/datasets/cfahlgren1/hub-stats` (HF Hub community-org) — daily parquet snapshot for DuckDB SQL
4. `github.com/ossf/criticality_score/tree/main/cmd/enumerate_github` (OSSF / Linux Foundation) — reference implementation of star-window partitioning bypass
5. `repos.ecosyste.ms/docs` + `blog.ecosyste.ms/2025/09/01/rate-limiting-the-right-way.html` (ecosyste.ms) — polite-pool + star-independent signals
6. GitHub Community Discussions `#64629` + `#109517` (GitHub Community, 3rd-org-distinct from docs) — community-confirmed 1000-cap on GraphQL `search`

**Total**: 9 organisations across the cascade (>3-org-distinct per W295 I1).

---

**END Stage-0 / Stage-0.5 bypass cascade reference** — pairs with `SKILL.md §1` + `§1.5`; full method matrices at `docs/architecture/W328-HF-SOTA-METHODS/SOTA-BYPASS.md` (HF M1-M6) and `docs/architecture/W328-GH-SOTA-METHODS/SOTA-BYPASS.md` (GH methods 1-14).
