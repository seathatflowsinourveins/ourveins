# Stage-0.5 ENUMERATION-BYPASS Cascade

> sca-v15 §1.5 codification — sanctioned bypass cascade for SOTA discovery when search-family workloads exceed 1000-result hard cap OR exhaustive enumeration required. Per operator W329 principle: "filing an issue against a documented limit is NOT SOTA — use GraphQL / cursor / dataset-snapshot / BigQuery."

## When to use

| Platform | Trigger | Primary | Delta |
|---|---|---|---|
| HF Hub | exhaustive model/dataset/space sweep | M5 DuckDB SQL over `cfahlgren1/hub-stats` parquet snapshot | M1 `HfApi.list_models()` cursor walk |
| GitHub | `repositoryCount > 1000` per `gh api search/repositories` sizing | 6-step cascade (this dir's `gh-cascade.sh`) | GraphQL `org/user.repositories` connection |

## Files

- `duckdb-hf-hub-stats.sql` — paste-ready DuckDB query template for HF Hub enumeration via `cfahlgren1/hub-stats` (parquet snapshot, daily refresh, Resolvers rate-bucket ~6-10× higher than Hub APIs). Reads 2.89M models + 1.01M datasets + 1.3M spaces locally.
- `gh-cascade.sh` — 6-step GitHub bypass cascade: (1) GraphQL sizing-probe → (2) binary-split date/stars window-partition until ≤1000/window → (3) GraphQL cursor pagination → (4) BigQuery `bigquery-public-data.github_repos` snapshot cross-check → (5) ecosyste.ms star-independent signals → (6) GH Archive `githubarchive.day.*` trending velocity.

## Anti-bias mandate

When Stage-0.5 fires, top-10 ranking MUST surface ≥1 candidate first-discovered by a non-MCP bypass method (BigQuery snapshot OR ecosyste.ms OR M5 DuckDB) — guards against MCP-surface popularity bias (only-what-the-MCP-returns sampling effect). Per sca-v15 §1.5.

## 3-org-distinct anchors

- `https://docs.github.com/en/graphql/guides/using-pagination-in-the-graphql-api` (GitHub/Microsoft) — cursor pagination contract
- `https://cloud.google.com/bigquery/public-data/github` (Google Cloud) — `bigquery-public-data.github_repos` snapshot + `githubarchive` event dataset
- `https://huggingface.co/datasets/cfahlgren1/hub-stats` (HF community-org, distinct from huggingface main-org) — daily parquet snapshot via DuckDB httpfs

Supplementary: `https://github.com/ossf/criticality_score/cmd/enumerate_github` (OSSF/Linux Foundation) — reference star-window partitioning bypass; `https://repos.ecosyste.ms/docs` (ecosyste.ms) — multi-host star-independent signals; GitHub Community `#64629` + `#109517` confirm 1000-cap on GraphQL `search`.
