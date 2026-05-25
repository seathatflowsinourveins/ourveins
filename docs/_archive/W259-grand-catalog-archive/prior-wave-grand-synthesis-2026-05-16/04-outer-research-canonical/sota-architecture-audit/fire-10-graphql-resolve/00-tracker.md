# Wave 134 Fire 10 — GraphQL-based comprehensive resolve (zero-404 push)

> **Folder**: `Z:/claude-sota-installed/docs/sota-architecture-audit/fire-10-graphql-resolve/`
> **Created**: 2026-05-10 post-Fire-9 (commit `e785fc5`)
> **Driver**: user directive "all stars should be include, using graphql, github ql etc,
> find the exact information for all, no 404, find related and correct repos"

## Arc state at Fire 10 open

**Fire 9 baseline** (commit `e785fc5`):
- 640-repo cumulative baseline
- 13.59% strict line-by-line A1+A2 (87/640)
- 98.75% attempted
- A4 unreachable: 41/640 = 6.41% (3 rescued in Fire 9)
- Mia ladder n=1000

## Fire 10 mission

**Use GitHub GraphQL API + search to resolve ALL 44 A4 unreachable entries:**
- Distinguish actual repo slugs from data-quality defects (Fire 5 extraction bug)
- For actual repos: GraphQL search-based recovery to find correct names / renamed locations
- For defects: classify as non-repo data-quality issues
- ZERO 404s remaining when possible

## Critical Fire 5 baseline-extraction bug discovered (Fire 10 finding)

The "44 A4 unreachable" count from Fire 5/6/8/9 was INFLATED by 37 data-quality defects.
True actual repo-format slugs that returned 404: **7 only**.

Breakdown:
- **37 data-quality defects** — non-repo strings misclassified as repo slugs:
  - Doc-paths inside other repos (e.g., `.claude/agents/reviewer.md`)
  - Phrases / topic-strings (e.g., `benchmarks/evals = proof, not vibes`)
  - URL fragments (e.g., `karpathy.bearblog.dev/sequoia-ascent-2026`)
- **7 actual repo-format slugs** that returned 404 — GraphQL-resolved:
  - 4 RESCUED via search (correct name found)
  - 1 ALREADY INSTALLED (different owner namespace)
  - 2 truly not-found

## Fire 10 deliverables

| # | File | Purpose | Status |
|---|---|---|---|
| 00 | `00-tracker.md` | This file | ✓ |
| 01 | `01-graphql-resolver-methodology.md` | GraphQL API methodology + sample probe results | PENDING |
| 02 | `02-a4-resolved.md` | Full A4 resolution: 7 actual repos with GraphQL recovery | PENDING |
| 03 | `03-data-quality-defects.md` | 37 non-repo strings classification + Fire 5 bug retrospective | PENDING |
| 04 | `04-final-coverage-tracker-v4.md` | Final coverage % after GraphQL resolve | PENDING |
| `_a4-unreachable-slugs.json` | Raw 44 slugs from Fire 5 metadata | ✓ |
| `_a4-actual-repos.json` | 7 filtered actual-repo-format slugs | ✓ |
| `_a4-data-quality-defects.json` | 37 non-repo strings | ✓ |

## GraphQL methodology

Per user directive, use `gh api graphql` (authenticated) for:
1. **Batch repo metadata fetch** — up to 100 repos per query with aliased field selection
2. **Search-based recovery** — for renamed/moved/deleted repos, fall back to name-search
3. **Exact stars/license/push** — eliminates SPDX false-negatives from REST API
4. **Topics + archived status** — richer metadata than REST exposes

## Cardinal-rule conformance

- CR-1: GraphQL query results cite verbatim API response data
- CR-5: AUDIT-only (no installs)
- CR-6: official Anthropic CC + GitHub OFFICIAL GraphQL endpoint
- CR-8: every claim cites GraphQL response field
- CR-11: META-process — audit-action-loop Wire/Surface/Close
- CR-12: upstream-install-priority (GraphQL = official GitHub API)

## Mia ladder

n=1000 (Fire 9 close) → target ~n=1050 (~50 GraphQL probe verifications)
