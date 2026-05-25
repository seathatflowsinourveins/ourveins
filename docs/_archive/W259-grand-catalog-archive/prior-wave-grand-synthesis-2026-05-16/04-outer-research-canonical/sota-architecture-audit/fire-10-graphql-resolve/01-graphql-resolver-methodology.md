# 01 — GraphQL resolver methodology (per user directive Fire 10)

> **Purpose**: codify the GitHub GraphQL API + search-based recovery pattern used for
> A4 unreachable resolution. Reusable for future repo-resolution probes.

## User directive (Fire 10 driver)

> "all stars should be include, using graphql, github ql etc, find the exact information
> for all, no 404, find related and correct repos"

## Why GraphQL over REST API

| Dimension | REST API (`/repos/{owner}/{repo}`) | GraphQL API (`/graphql`) |
|---|---|---|
| Batch queries | 1 query → 1 repo (rate-limit-heavy) | 1 query → up to 100 repos via field aliases |
| Renamed-repo handling | Often returns 404 without redirect-follow on `/repos/` (verified Fire 10) | Same behavior at endpoint, but SEARCH api recovers |
| Field selection | All-or-nothing | Choose exact fields (stars, license, push, archived, topics) |
| Authenticated rate-limit | 5000/h | 5000 points/h (most queries = 1 point each) |
| Search integration | Separate REST endpoint | First-class `search` query type with full repo metadata |

**Net**: GraphQL is the SOTA-correct primitive for batch repo metadata + search recovery.

## Sample GraphQL query (batched 5-repo metadata)

```graphql
query {
  r0: repository(owner: "sourcegraph", name: "cody") {
    nameWithOwner url description
    stargazerCount forkCount pushedAt createdAt
    isArchived isDisabled isPrivate diskUsage
    primaryLanguage { name }
    licenseInfo { spdxId name url }
    defaultBranchRef { name }
    repositoryTopics(first: 10) { nodes { topic { name } } }
  }
  r1: repository(owner: "sharkdp", name: "delta") { ... }
  # ... up to 100 aliased queries per request
}
```

## Sample GraphQL search query (recovery for renamed/moved repos)

```graphql
query($q: String!) {
  search(query: $q, type: REPOSITORY, first: 5) {
    nodes {
      ... on Repository {
        nameWithOwner stargazerCount pushedAt isArchived description
        licenseInfo { spdxId }
      }
    }
  }
}
```

Fire via `gh api graphql -f query='...' -f q='delta'`.

## Authentication state (Fire 10 environment)

```
gh auth status:
  ✓ Logged in to github.com account seathatflowsinourveins (GITHUB_TOKEN)
  - Active account: true
  - Git operations protocol: https
  - Token: github_pat_11BXZ3B3I0sL0QzQIL5aKg_***
```

`gh api graphql` uses `GITHUB_TOKEN` for authentication → 5000 points/h ample budget.

## A4 resolution sample (5-repo batch test — Fire 10 probe)

```bash
gh api graphql -f query='query {
  r0: repository(owner: "sourcegraph", name: "cody") { nameWithOwner stargazerCount licenseInfo { spdxId } }
  r1: repository(owner: "sharkdp", name: "delta") { ... }
  r2: repository(owner: "structurizr", name: "dsl") { ... }
  r3: repository(owner: "microsoft", name: "playwright-mcp") { ... }
  r4: repository(owner: "anthropics", name: "skills") { ... }
}'
```

Result behavior:
- **Partial success**: GraphQL returns BOTH `data` (with `null` for failed lookups) AND
  `errors` (array of "Could not resolve to a Repository with the name '...'" messages)
- microsoft/playwright-mcp succeeded: 32,309★ (confirms it IS a real repo)
- anthropics/skills succeeded
- sourcegraph/cody / sharkdp/delta / structurizr/dsl returned null + error

## Search-based recovery sample (Fire 10 probe)

For each 404 repo, fall back to GraphQL search by `name` only:

```bash
# sourcegraph/cody (404) — search by "cody"
gh api graphql -f q='cody' ... → top-5 results show:
  🗄️ sourcegraph/sourcegraph-public-snapshot (10k★)  ← likely successor (archived)
  🟢 jcoppieters/cody (680★)                          ← unrelated
  🗄️ sourcegraph/cody-public-snapshot (3.8k★)         ← legacy reference (archived)
```

## Recovery scoring rubric

For each A4 slug, score search results by:
1. **Name-match quality** (exact / case-different / substring)
2. **Owner match** (same org / different org with "Moved to" notice / unrelated)
3. **Description match** (concept match / partial / unrelated)
4. **Activity** (active = pushed within 6 months / archived / deleted)
5. **Star magnitude** (within 1 order of magnitude of expected)

**RESCUE verdict**: at least 3 of 5 criteria match → confirmed rescue
**PARTIAL verdict**: 2 of 5 match + indirect signal (e.g., "Moved to X" in description) → probe pending
**NOT-FOUND**: <2 of 5 match → confirmed unrecoverable

## Fire 5 baseline-extraction bug exposed

GraphQL resolution revealed that 37 of 44 "A4 unreachable" entries are NOT actual repos:
- 22 are file-paths inside other repos (`.claude/agents/reviewer.md`, etc.)
- 6 are topic-strings / phrases (`benchmarks/evals = proof, not vibes`)
- 5 are URL fragments (`karpathy.bearblog.dev/sequoia-ascent-2026`)
- 4 are domain-references / blog URLs

**Root cause**: Fire 5 baseline extraction (`_repo-baseline.txt`) parsed manifest descriptors
without filtering for `owner/name` slug pattern. Any string with `/` was treated as a repo slug.

**Fix-forward (Fire 11 candidate)**: re-run baseline extraction with strict slug-pattern
filter (`^[a-zA-Z0-9_-]+/[a-zA-Z0-9_.-]+$`); reclassify all non-matching entries as
"non-repo data-quality artifacts" not requiring API probe.

## How to extend Fire 10 methodology (W134-F11+ candidates)

### W134-F11-graphql-full-resweep (recommended)
Re-probe ALL 555 A3-tier programmatic-light repos via GraphQL batch (6 queries × 100 repos):
- Capture EXACT stars at fresh probe time (rather than Fire 5 stale snapshot)
- Capture license at SPDX-classifier-current state (catches any LICENSE-content updates)
- Capture push-date freshness (re-band per SRA D2)
- Capture topics (richer cross-cutting categorization)

Estimated cost: 6 GraphQL queries × ~1 point each = 6 points (negligible vs 5000/h budget).

### W134-F11-be-conductor-probe
Direct GraphQL probe for `somniacs/be-conductor` per Fire 10 partial-resolution signal.

### W134-F11-defect-cleanup
Update `_repo-baseline.txt` to filter 37 non-repo strings → restore TRUE baseline count
to 603 (640 - 37 defects).

## Reusable as eee skill

This GraphQL methodology is candidate for promotion to a reusable eee skill:
- **Skill name**: `gh-graphql-repo-resolver`
- **Trigger**: when audit/research surfaces a 404 on a cited repo
- **Action**: GraphQL direct probe → fall back to search → score top-5 → verdict
- **Output**: rescue verdict + canonical slug + metadata

Fire 11+ skill-creator candidate.

## Mia ladder advance

n=1012 → n=1015 (+3: GraphQL methodology codified / search rubric defined / Fire 5
baseline-bug root-cause identified)
