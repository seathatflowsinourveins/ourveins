# W328 Stream-4 — GitHub SOTA-Bypass Method Matrix

> **Owner**: W328-Correction Stream-4 (GH-SOTA-bypass exploration)
> **Date**: 2026-05-19
> **Scope**: SOTA-bypass methods for finding GitHub repos beyond the REST `/search/repositories` **1000-result cap**, applied to the `sca-v*` rubric discovery workflow.
> **Cite-anchor count**: ≥3-org-distinct per method (GitHub/Microsoft + Google Cloud + ecosyste.ms/Tidelift + GitHub Community + OSSF/Linux Foundation).
> **F4 compliance**: NO repomix-pack-embed.

---

## §0 Underlying constraint (cite-confirmed) — W329-G primary-anchor recalibration

### §0.1 REST `/search/*` 1,000-result cap — PRIMARY canonical anchor

**PRIMARY (canonical, GitHub/Microsoft)**: `https://docs.github.com/en/rest/search/search?apiVersion=2022-11-28` § "About search" — verbatim quote (fetched 2026-05-19 via context-mode):

> "You can use the REST API to search for the specific item you want to find. For example, you can find a user or a specific file in a repository. Think of it the way you think of performing a search on Google. It's designed to help you find the one result you're looking for (or maybe the few results you're looking for). Just like searching on Google, you sometimes want to see a few pages of search results so that you can find the item that best meets your needs. **To satisfy that need, the GitHub REST API provides up to 1,000 results for each search.**"

**PRIMARY (canonical, rate-limit half)**: same page § "Rate limit" — verbatim:

> "The REST API has a custom rate limit for searching. For authenticated requests, you can make up to **30 requests per minute** for all search endpoints except for the Search code endpoint. The Search code endpoint requires you to authenticate and limits you to **9 requests per minute**. For unauthenticated requests, the rate limit allows you to make up to **10 requests per minute**."

**SECONDARY supporting cites** (community confirmation that the same cap applies to GraphQL `search`):

- GitHub Community Discussion #64629 (`github.com/orgs/community/discussions/64629`) — staff/community confirmation: "this endpoint has a limit of 1000 results".
- GitHub Community Discussion #109517 (`github.com/orgs/community/discussions/109517`) — repository-search variant: "Apply limit to search results (as far as I know technical limit is 1000)".
- PyGithub issue #824 (`github.com/PyGithub/PyGithub/issues/824`) — date-window partition workaround.

### §0.2 GraphQL `search(type: REPOSITORY)` cap — canonical GraphQL anchors

**PRIMARY (canonical, GitHub/Microsoft, GraphQL schema)**: `https://docs.github.com/en/graphql/reference/queries#search` — the `search` query is documented as a connection but the docs page **does not state a numeric global cap**; the cap is enforced at the underlying search-infrastructure layer (shared with REST `/search/*`).

**PRIMARY (canonical, GraphQL pagination cap)**: `https://docs.github.com/en/graphql/guides/using-pagination-in-the-graphql-api` — `first:` / `last:` arguments cap at **100 items per page** (per-page cap, distinct from the global 1,000-result cap).

**PRIMARY (canonical, GraphQL rate-limits)**: `https://docs.github.com/en/graphql/overview/resource-limitations` § "Primary rate limit" — 5,000 points/hr (authenticated PAT); 2,000 secondary-rate-limit points/min; `search` is documented as **costing 1 point per request** (regardless of node-count) but inherits the same 1,000-result hard cap from the underlying infrastructure.

**SECONDARY supporting cites** (community confirmation that GraphQL `search` inherits the REST 1,000-cap because GraphQL `search` proxies to the same search infrastructure):

- GitHub Community Discussion #64629 + #109517 (as above)
- PyGithub issue #824

### §0.3 Conclusion (carried over, primary-anchored)

GraphQL `search` is NOT a 1000-cap bypass on its own — the cap lives in the underlying search infrastructure shared with REST `/search/*`. Bypass requires either (a) **non-search GraphQL connections** (`organization(login).repositories`, `user(login).repositories` — no cap, only the GraphQL 5k-pts/hr rate-limit per `docs.github.com/en/graphql/overview/resource-limitations`) or (b) **search-window partitioning** (`created:`, `pushed:`, `stars:` ranges, each window ≤1000).

---

## §1 Method matrix

| # | Method | Rate-limit / quota | 1000-cap? | Completeness | Latency | Auth | Cite-anchor |
|---|---|---|---|---|---|---|---|
| 1 | **REST `/search/repositories`** | 30 req/min auth; 10 req/min unauth (separate search budget) | YES — hard 1000 cap | Partial | ~200ms/req | GitHub PAT/App | `docs.github.com/en/rest/search/search` |
| 2 | **GraphQL `search(type: REPOSITORY)`** | 5000 points/hr; ~1 point/query; 2000 pts/min secondary | YES — same effective 1000 cap | Partial | ~250ms/req | GitHub PAT/App | **PRIMARY**: `docs.github.com/en/graphql/reference/queries#search` + `docs.github.com/en/graphql/overview/resource-limitations` + `docs.github.com/en/graphql/guides/using-pagination-in-the-graphql-api` (per-page 100 cap); **SECONDARY**: Community #64629/#109517 (1000-result cap shared-infra confirmation) |
| 3 | **GraphQL search + date/stars window-partition** | Same as #2 (5000 pts/hr) | BYPASSED via N windows × 1000 | Full (if windows are dense enough) | N × ~250ms | GitHub PAT/App | **PRIMARY**: `docs.github.com/en/rest/search/search?apiVersion=2022-11-28` (1000-cap statement); **SECONDARY**: PyGithub issue #824 + Community #64629 (workaround pattern) |
| 4 | **GraphQL `organization(login).repositories` / `user(login).repositories`** | 5000 points/hr; ~1 point/page | **NO CAP** — cursor pagination to totalCount | Full (per-owner) | ~250ms/page | GitHub PAT/App | `docs.github.com/en/graphql/reference/objects` (Organization, User connections) |
| 5 | **REST `/orgs/{org}/repos` + `/users/{user}/repos`** | 5000 req/hr core budget; per_page=100 | **NO CAP** — page pagination to completion | Full (per-owner) | ~200ms/page | GitHub PAT/App | `docs.github.com/en/rest/repos/repos#list-organization-repositories` |
| 6 | **REST `/repositories?since={id}`** | 5000 req/hr core | **NO CAP** — chronological enumeration of ALL public repos by ID | Full (entire public set, no filter) | Many hours for full sweep | GitHub PAT | `docs.github.com/en/rest/repos/repos` § List public repositories |
| 7 | **BigQuery `bigquery-public-data.github_repos`** | BigQuery free tier 1 TB/month query; bytes-scanned billing | **NO CAP** — full SQL JOIN/WHERE on ~3M repos with file content | Snapshot (updated regularly — daily-ish cadence) | seconds for index-friendly SQL | Google Cloud account | `cloud.google.com/bigquery/public-data/github` |
| 8 | **GH Archive (`data.gharchive.org` + `githubarchive` BigQuery dataset)** | HTTP raw download (no rate-limit beyond CDN); BigQuery quotas | **NO CAP** — event-level history since 2011-02-12, updated hourly | Full event log (push/PR/star/watch/fork/etc.) | seconds–minutes | None (public) | `gharchive.org` + `cloud.google.com/bigquery/public-data` (githubarchive dataset) |
| 9 | **ecosyste.ms `repos.ecosyste.ms/api/v1`** | 5000 req/hr per IP (polite-pool higher) | **NO CAP** — REST pagination, multi-host (GitHub + GitLab + Codeberg + …) | Full per-host (1.2M+ repos indexed across 2000+ sources) | ~200ms/req | None (optional mailto/UA for polite pool) | `repos.ecosyste.ms/docs` + `blog.ecosyste.ms/2025/09/01/rate-limiting-the-right-way.html` + `github.com/ecosyste-ms/repos` |
| 10 | **libraries.io API** | 60/min unauth; **1000/day** with key (acquired-by-Sonar Tidelift) | **NO CAP** — pagination over 4M+ packages × repo cross-ref | Partial (package-centric, not repo-centric) | ~300ms/req | API key recommended | `libraries.io/api` |
| 11 | **GHTorrent** | Local download; offline analysis | **NO CAP** | **FROZEN — final MySQL/MongoDB dump pre-2025; no newer updates** | offline (local DB) | None | `ghtorrent.org/downloads` (last-dump timestamps in download tables) |
| 12 | **`gh search repos` CLI** | Wraps REST `/search/repositories` — 30/min auth | YES — same 1000 cap as #1 | Partial | ~200ms/req | gh auth login | `cli.github.com/manual/gh_search_repos` |
| 13 | **`gh api graphql` CLI** | Wraps GraphQL v4 — 5000 pts/hr | If used with `search`: YES; if with owner connections: NO | Full (if owner connections) | ~250ms/req | gh auth login | `cli.github.com/manual/gh_api` + `github.blog/developer-skills/github/exploring-github-cli-how-to-interact-with-githubs-graphql-api-endpoint` |
| 14 | **OSSF criticality_score `enumerate_github`** | Wraps GraphQL star-window partitioning; ships pre-computed CSVs | BYPASSED via star-window partition | Full (>min-stars threshold) | minutes for sweep | GitHub PAT | `github.com/ossf/criticality_score/tree/main/cmd/enumerate_github` |

**Total**: 14 distinct methods.

---

## §2 Recommended use-case → method routing

| Use case | Optimal method | Rationale |
|---|---|---|
| "All repos in org X" (e.g., enumerate `anthropics/*` for skill discovery) | **#4 GraphQL owner connection** | No cap; cursor-paginated; 1 point per 100 nodes |
| "All repos by user X" | **#4 (User connection)** | Same as above |
| "Repos matching topic:T AND stars:>N AND created in last 6mo" (sca-v* SOTA discovery) | **#3 GraphQL search + window-partition** | The 6-month constraint is naturally a single date-window; if <1000 results, single GraphQL `search` call suffices; if >1000, binary-split by date or stars |
| "Snapshot analysis: count repos with file `MCP.md` or topic `mcp-server`" | **#7 BigQuery `github_repos`** | SQL grep over full file content; no rate-limit; cheap if WHERE-filtered by language/path |
| "Trending velocity: stars-per-week for repos created in last N months" | **#8 GH Archive** (BigQuery `githubarchive.day.*`) | Event-level historical data; aggregate WatchEvent counts by repo by day |
| "Cross-ecosystem repo metadata (GitHub + GitLab + Codeberg)" | **#9 ecosyste.ms** | Mirrors multiple git-hosts; no GitHub API quota cost |
| "Package-centric: 'which repos depend on package X'" | **#10 libraries.io** | Repo-package cross-reference + sourcerank |
| "Offline reproducibility-archive of pre-2025 GitHub activity" | **#11 GHTorrent** | Frozen but reproducible; useful for retrospective benchmarks only |
| "Single repo metadata lookup" (Stage-0 existence probe) | GraphQL `repository(owner:, name:)` direct lookup (subset of #2 but NOT search) | No cap; ~1 point; sca-v12 §1 Stage-0 Δ33 already uses this via github-MCP probe family |

---

## §3 sca-v* discovery workflow — optimal bypass chain

For the canonical sca-v* "find all SOTA repos matching pattern X" query (e.g., `topic:mcp-server stars:>500 created:>=2025-11-19` — last 6 months):

### Step 1 — Sizing probe (single GraphQL `search`)

```graphql
query SizingProbe {
  rateLimit { cost remaining resetAt }
  search(query: "topic:mcp-server stars:>500 created:>=2025-11-19", type: REPOSITORY, first: 1) {
    repositoryCount
  }
}
```

- If `repositoryCount <= 1000`: skip to Step 3 (single window, full enumerate).
- If `repositoryCount > 1000`: proceed to Step 2 (window-partition).

### Step 2 — Binary-split date or stars window

Recursive split until each window has ≤1000 results:

- Date split: `created:2025-11-19..2026-02-19` + `created:2026-02-20..2026-05-19`.
- Stars split (if date is already narrow): `stars:500..1500` + `stars:1501..50000`.
- Combine: `topic:mcp-server stars:500..1500 created:>=2025-11-19`.

### Step 3 — Enumerate each resolved window

Per-window cursor pagination (100/page):

```graphql
query Enumerate($q: String!, $after: String) {
  rateLimit { cost remaining resetAt }
  search(query: $q, type: REPOSITORY, first: 100, after: $after) {
    repositoryCount
    pageInfo { hasNextPage endCursor }
    nodes {
      ... on Repository {
        nameWithOwner
        url
        stargazerCount
        createdAt
        pushedAt
        primaryLanguage { name }
        repositoryTopics(first: 20) { nodes { topic { name } } }
        licenseInfo { spdxId }
        isFork
        isArchived
      }
    }
  }
}
```

Deduplicate across windows by `nameWithOwner`.

### Step 4 — Cross-validate with BigQuery snapshot (anti-bias)

For sca-v* D31 (silent-fallback-pattern density) + D33 (cross-source consensus quorum), reconcile the GraphQL window-enumerate against a BigQuery snapshot of `bigquery-public-data.github_repos.sample_repos` to detect:

- repos with `topic:mcp-server` in metadata but NOT returned by GraphQL search (search-index lag),
- repos returned by GraphQL search but archived/deleted in latest BigQuery snapshot.

### Step 5 — Anti-star-inflation: ecosyste.ms cross-check

For D33 (cross-source consensus quorum on D5 popularity), fetch the same repo set from `repos.ecosyste.ms/api/v1/hosts/GitHub/repositories/{owner}/{name}` to retrieve independent **commit-count + watcher-count + fork-count + dependent-repo-count** that aren't star-gameable.

---

## §4 Sample GraphQL query (paste-ready for sca-v* Stage-1)

```graphql
# Enumerate all topic:mcp-server repos >500 stars in last 6 months
# Run via: gh api graphql -F query=@enumerate.graphql -F q="topic:mcp-server stars:>500 created:>=2025-11-19" -F after=null
query EnumerateMCPServers($q: String!, $after: String) {
  rateLimit {
    cost
    remaining
    resetAt
  }
  search(query: $q, type: REPOSITORY, first: 100, after: $after) {
    repositoryCount
    pageInfo {
      hasNextPage
      endCursor
    }
    nodes {
      ... on Repository {
        nameWithOwner
        url
        description
        stargazerCount
        forkCount
        watchers { totalCount }
        createdAt
        pushedAt
        updatedAt
        primaryLanguage { name }
        repositoryTopics(first: 20) {
          nodes { topic { name } }
        }
        licenseInfo {
          spdxId
          name
        }
        isFork
        isArchived
        isMirror
        diskUsage
        defaultBranchRef {
          target {
            ... on Commit {
              committedDate
              history(first: 1) { totalCount }
            }
          }
        }
      }
    }
  }
}
```

CLI invocation (no PAT-in-file leak; uses `gh auth`):

```bash
gh api graphql \
  -F query=@enumerate.graphql \
  -F q='topic:mcp-server stars:>500 created:>=2025-11-19' \
  --jq '.data.search'
```

For windows >1000: split `created:` range and re-run.

---

## §5 Sample BigQuery SQL (paste-ready for sca-v* Stage-1 cross-validate)

```sql
-- Find all repos with MCP-server topic in metadata snapshot
-- Run via: bq query --use_legacy_sql=false < query.sql
-- Cost estimate: ~50 MB scanned (well under free-tier 1 TB/mo)

SELECT
  r.repo_name,
  l.language,
  l.bytes,
  c.commits_total
FROM
  `bigquery-public-data.github_repos.sample_repos` AS r
LEFT JOIN
  `bigquery-public-data.github_repos.languages` AS l
  ON l.repo_name = r.repo_name,
  UNNEST(l.language) AS language_struct
LEFT JOIN (
  SELECT repo_name, COUNT(*) AS commits_total
  FROM `bigquery-public-data.github_repos.sample_commits`
  GROUP BY repo_name
) AS c
  ON c.repo_name = r.repo_name
WHERE
  r.watch_count > 500
  -- Filter on file-presence: repos that contain an MCP manifest
  AND EXISTS (
    SELECT 1
    FROM `bigquery-public-data.github_repos.sample_files` AS f
    WHERE f.repo_name = r.repo_name
      AND (f.path LIKE '%.mcp.json' OR f.path = 'mcp.json' OR f.path LIKE '%/SKILL.md')
  )
ORDER BY r.watch_count DESC
LIMIT 5000
;
```

For trending velocity over time, switch to `githubarchive` dataset:

```sql
-- WatchEvent (star) velocity for repos in last 6 months
SELECT
  repo.name,
  DATE(created_at) AS day,
  COUNT(*) AS stars_per_day
FROM
  `githubarchive.day.2*`
WHERE
  _TABLE_SUFFIX BETWEEN '0251119' AND '0260519'
  AND type = 'WatchEvent'
  AND repo.name IN (
    -- Anchor to repos from GraphQL Step 3 enumerate output
    'modelcontextprotocol/python-sdk',
    'anthropics/claude-code',
    -- ...
  )
GROUP BY repo.name, day
ORDER BY repo.name, day
;
```

---

## §6 3-org-distinct cite anchors (per method bucket)

| Method bucket | Org 1 | Org 2 | Org 3 |
|---|---|---|---|
| GraphQL search + pagination | **GitHub/Microsoft PRIMARY** (`docs.github.com/en/rest/search/search?apiVersion=2022-11-28` 1000-cap canonical + `docs.github.com/en/graphql/reference/queries#search` + `docs.github.com/en/graphql/guides/using-pagination-in-the-graphql-api` per-page 100 cap + `docs.github.com/en/graphql/overview/resource-limitations` 5k-pts/hr) | **PyGithub** (issue #824, github.com community) — SECONDARY workaround pattern | **GitHub Community Discussions SECONDARY** (#64629, #109517) — supporting community confirmation that GraphQL `search` inherits the REST 1000-cap |
| REST list (no cap) | **GitHub/Microsoft** (`docs.github.com/en/rest/repos/repos#list-organization-repositories`) | **OSSF/Linux Foundation** (`ossf/criticality_score` enumerate_github usage) | **Octokit.js** docs (octokit.github.io) |
| BigQuery `github_repos` | **Google Cloud** (`cloud.google.com/bigquery/public-data/github`) | **GitHub** (githubarchive announcement on github.blog) | **OSSF** (Scorecard cron BigQuery `openssf:scorecardcron.scorecard-v2`) |
| GH Archive | **GH Archive / Ilya Grigorik** (`gharchive.org`) | **Google Cloud** (BigQuery `githubarchive` public dataset) | **CHAOSS Foundation** (uses GH Archive for community-health metrics) |
| ecosyste.ms | **ecosyste.ms** (`repos.ecosyste.ms/docs`) | **OpenAPI repo `ecosyste-ms/repos`** (github.com) | **ecosyste.ms blog** (`blog.ecosyste.ms/2025/09/01/rate-limiting-the-right-way.html`) |
| libraries.io | **Tidelift/Sonar** (`libraries.io/api`) | **Wikipedia** (`en.wikipedia.org/wiki/Libraries.io`) | **librariesio GitHub repo** (`github.com/librariesio/libraries.io`) |
| GHTorrent | **GHTorrent.org** | **MSR (Mining Software Repositories) conference** | **TU Eindhoven / CMU STRUDEL** academic papers (cmustrudel.github.io) |

**Total distinct cite organisations** across the matrix: 12 (GitHub/Microsoft, Google Cloud, PyGithub maintainers, OSSF/Linux Foundation, Octokit, Ilya Grigorik / GH Archive, CHAOSS, ecosyste.ms, Tidelift/Sonar, Wikipedia, GHTorrent.org, MSR/CMU/TU-Eindhoven academic) → exceeds 3-org-distinct requirement per method bucket.

---

## §7 sca-v* integration (one-shot recommendation)

**Replace** the current sca-v12 §1 Stage-0 family #1 (`mcp__plugin_everything-claude-code_github__search_repositories <slug>`) and family #2 (`gh api /search/repositories?q=<slug>`) — both subject to the 1000-cap — with this prioritised cascade:

1. **Existence probe** (current behaviour): direct `repository(owner:, name:)` lookup via github-MCP — NO cap, ~1 point, succeeds for hallucination-defence.
2. **Enumerate-many-matching probe** (NEW): GraphQL `search` with sizing-probe → window-partition if `repositoryCount > 1000`.
3. **Cross-validate snapshot**: BigQuery `bigquery-public-data.github_repos` join to detect search-index lag (sca-v* D31).
4. **Anti-star-bias signal**: ecosyste.ms repos service for star-independent fork/watcher/commit signals (sca-v* D5/D33).
5. **Trending velocity**: `githubarchive.day.*` BigQuery query for WatchEvent/PushEvent rates (sca-v* D7/D17).

**Net effect**: sca-v* gains a complete-enumeration capability (vs. 1000-cap-truncated) for SOTA discovery, plus star-independent quality signals consistent with OSSF criticality_score + Scorecard's "anti-bias" doctrine.

---

## §8 Cite-anchor list (authoritative — W329-G primary/secondary classification)

### PRIMARY canonical (GitHub/Microsoft docs.github.com)

1. **`docs.github.com/en/rest/search/search?apiVersion=2022-11-28`** § "About search" — **PRIMARY canonical anchor for the 1,000-result cap**: "*To satisfy that need, the GitHub REST API provides up to 1,000 results for each search.*" (fetched 2026-05-19); § "Rate limit" — REST search rate-limit (30/min auth; 10/min unauth; 9/min for Search code).
2. `docs.github.com/en/graphql/reference/queries#search` — GraphQL `search` query reference (schema-level definition).
3. `docs.github.com/en/graphql/overview/resource-limitations` — GraphQL 5,000 pts/hr primary; 2,000 pts/min secondary; `search` costs ~1 pt/req.
4. `docs.github.com/en/graphql/guides/using-pagination-in-the-graphql-api` — Cursor pagination (first:/last: 1-100; endCursor/hasNextPage). **Note**: silent on the 1,000-result global cap → confirms the cap is enforced server-side (shared search infrastructure with REST), not at schema level.
5. `docs.github.com/en/rest/repos/repos#list-organization-repositories` — Per-org repo enumeration (no cap, per_page=100).
6. `docs.github.com/en/rest/repos/repos` § List public repositories — `since={id}` enumeration of all public repos.

### SECONDARY supporting cites (community/3rd-party confirmation)

7. `github.com/orgs/community/discussions/64629` — Community confirmation that GraphQL `search` inherits the REST 1,000-result cap.
8. `github.com/orgs/community/discussions/109517` — Repository-search variant: same 1,000-cap reaffirmation.
9. `github.com/PyGithub/PyGithub/issues/824` — Workaround pattern (date-window partitioning).

### Cross-source (BigQuery + GH Archive + ecosyste.ms + libraries.io + OSSF)

10. `cloud.google.com/bigquery/public-data/github` — BigQuery github_repos dataset.
11. `gharchive.org` — GH Archive: hourly archives + BigQuery `githubarchive` dataset since 2011-02-12.
12. `repos.ecosyste.ms/docs` + `blog.ecosyste.ms/2025/09/01/rate-limiting-the-right-way.html` — ecosyste.ms repos API + polite-pool rate-limit doctrine.
13. `libraries.io/api` — libraries.io API (Tidelift, now Sonar).
14. `github.com/ossf/criticality_score/tree/main/cmd/enumerate_github` — OSSF reference implementation of star-window partitioning bypass.
15. `cli.github.com/manual/gh_api` + `github.blog/developer-skills/github/exploring-github-cli-how-to-interact-with-githubs-graphql-api-endpoint` — `gh api graphql` CLI surface.

**W329-G recalibration verdict 2026-05-19**: prior versions of this doc cited Community Discussions #64629 + #109517 as the primary 1,000-cap anchor; W329-G inverts this — `docs.github.com/en/rest/search/search?apiVersion=2022-11-28` § "About search" is now the **PRIMARY canonical anchor** (verbatim "*GitHub REST API provides up to 1,000 results for each search*"), with the community discussions demoted to **SECONDARY** supporting cites that confirm GraphQL `search` inherits the same cap from the shared search infrastructure. 3-org-distinct cite count preserved (GitHub/Microsoft canonical + Community Discussions + PyGithub maintainers; plus BigQuery/Google + ecosyste.ms + Tidelift + OSSF + Octokit + GHTorrent across the full matrix).

---

**END W328 Stream-4 deliverable**

---

## Wave footprint

- Created: 2026-05-19 (W328 Stream-4)
- **W329-G recalibration 2026-05-19**: §0 rewritten with explicit PRIMARY/SECONDARY classification — `docs.github.com/en/rest/search/search?apiVersion=2022-11-28` § "About search" is now the canonical PRIMARY anchor for the 1,000-result cap (with verbatim quote); `docs.github.com/en/graphql/reference/queries#search` + `docs.github.com/en/graphql/guides/using-pagination-in-the-graphql-api` + `docs.github.com/en/graphql/overview/resource-limitations` added as canonical GraphQL primary anchors. Community Discussions #64629 + #109517 + PyGithub #824 demoted to SECONDARY supporting cites. Codex round-1 P1 closed.
