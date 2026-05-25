# W328 Stream-3 — HF Hub SOTA-Bypass Method Matrix

> **Verdict (2026-05-19, W328 Stream-3)**: For the "enumerate all repos matching filter X" use case, this runtime has **6 distinct enumeration methods** with very different rate-limit / completeness / latency tradeoffs. Stream-1 (`../W328-HF-USAGE-CORRECTION/CORRECT-USAGE.md`) confirmed `mcp__hf-mcp-server__hub_repo_search` is correctly-implemented + USER-ERROR-CONFIRMED — the "silent fallback" was a substring-search misunderstanding. This stream's scope is "what if a SOTA endpoint had a documented hard cap or rate limit — how do we bypass it?" The answer: **use the daily-refreshed `cfahlgren1/hub-stats` parquet snapshot via DuckDB for unbounded enumeration; reserve REST cursor for fresh-tail queries**.
>
> **Operator principle (2026-05-19)**: filing an issue against a documented limit is NOT SOTA — using GraphQL / cursor / dataset-snapshot / alternative-backend is. This doc operationalizes that principle for HF Hub specifically.

## TL;DR — Recommended bypass for "find all repos matching X" in this runtime

1. **For exhaustive enumeration (>1k results)** → **Method M5** (DuckDB SQL over `cfahlgren1/hub-stats`) — single SQL query reads pre-indexed snapshot of ~2.89M models / 1.01M datasets / 1.3M spaces, no rate limit on the API side, only the parquet fetch which goes via the **Resolvers** bucket (per the canonical Sept-2025 per-tier table at `https://huggingface.co/docs/hub/rate-limits#rate-limit-tiers`: anon 3,000 / 5-min, PRO 12,000 / 5-min, Enterprise Plus 100,000-500,000 / 5-min — see §"HF per-tier rate-limit table" below for the exact tabulated Hub-API vs. Resolvers ratios).
2. **For fresh-tail (last-24h) or write-aware queries** → **Method M1** (`HfApi.list_models` Python in-process with `huggingface_hub>=1.2.0` smart 429 retry).
3. **For ad-hoc one-shot calls from inside CC sessions** → **Method M3** (`mcp__hf-mcp-server__hub_repo_search`), only with Pattern B (tag-filter) per Stream-1 — single-token `query` or NO `query`.
4. **For real-time event subscription** → **Method M6** (Webhooks at `https://huggingface.co/settings/webhooks` — 1k triggers/24h cap, but covers "all events on HF" if upgraded to PRO+ and email-toggled per upstream FAQ).

---

## Method matrix

| # | Method | Endpoint / surface | Rate-limit class | Completeness | Latency | Best for |
|---|---|---|---|---|---|---|
| M1 | `HfApi.list_models()` Python | `/api/models` paginated (`Link` header) | **Hub APIs** (500-10k/5min, plan-dependent) | 100% (paginates to end) | ~50ms/page, ~10k repos/min anonymous | Programmatic enumeration with auto-retry |
| M2 | Raw REST `GET /api/models` | Direct HTTP, `Link: next` cursor | **Hub APIs** (same as M1) | 100% if you walk `Link` | Same as M1, but no built-in 429 backoff | Custom clients, JS/Go/Rust |
| M3 | `mcp__hf-mcp-server__hub_repo_search` | MCP surface wrapping `/api/models` | **Hub APIs** (shared, anonymous bucket from MCP proxy) | Limited to `limit` arg per call (no cursor exposed; max 100 typical) | Single-hop from CC session, ~200ms | One-shot lookups inside CC, NOT bulk |
| M4 | `/api/quicksearch?q=…&type=…` | Hub front-end full-text search backend | **Hub APIs** (same bucket) | UI-parity full-text; **caps results** at small limit (~10-100) | ~100ms | Mimicking what the huggingface.co UI search sees |
| M5 | `cfahlgren1/hub-stats` parquet (auto-converted) | Dataset Viewer `/datasets/cfahlgren1/hub-stats` → DuckDB SQL over Parquet via httpfs | **Resolvers** (3k-500k/5min — see canonical per-tier table below; ratio over Hub-API bucket varies **4.8x-10x** across plans, NOT a uniform 10x) | ~Daily snapshot of full Hub: 2.89M models, 1.01M datasets, 1.3M spaces, 85.4k arxiv_papers, 15k papers, 1.43k posts | ~1-5s SQL over remote parquet; cacheable | **Exhaustive enumeration**; complex filters with SQL JOINs |
| M6 | Webhooks (push, not pull) | `https://huggingface.co/settings/webhooks` POST handler | 1,000 triggers/24h hard cap (PRO+ raises) | Real-time, all events: `repo.*`, `discussion.*`, `discussion.comment` scopes | Sub-second push | Streaming new-models firehose; can email-toggle "all events" via website@huggingface.co |

### Detail per method

#### M1 — `HfApi.list_models()` Python in-process [PRIMARY for fresh-tail]

- **Library**: `huggingface_hub>=1.2.0` (auto-parses `RateLimit` header + 429 retry — `https://huggingface.co/docs/hub/rate-limits` § "Smart rate limit handling")
- **Pagination**: Internal `paginate()` utility uses RFC-5988 `Link: <url>; rel="next"` header, mirrors GitHub pattern; iterates until no next link
- **Filters**: `filter`, `author`, `apps`, `gated`, `inference`, `inference_provider`, `search`, `sort=created_at|downloads|last_modified|likes|trending_score`, `direction=-1|1`, `num_parameters="min:6B,max:128B"`, `task`, `library`, `language`
- **Data flags**: `full=True` (last_modified + sha + files + tags), `cardData=True` (carbon emissions + metrics + trained datasets), `fetch_config=True`, `expand=["downloads","likes","tags",...]` — **mutually exclusive** with `full`/`cardData`/`fetch_config`
- **`limit` semantics**: client-side `islice`, not server cap — `limit=None` walks all pages
- **Per-page item count**: server-decided, not exposed; typically 100 default
- **Cite-anchor**: docstring `https://huggingface.co/docs/huggingface_hub/package_reference/hf_api` (huggingface.co) + `paginate()` source `src/huggingface_hub/hf_api.py` (huggingface_hub repo via deepwiki) + community SO/discussion `huggingface_hub.HfApi.list_models` examples (3rd-org SO/HF-forum, e.g. `https://discuss.huggingface.co`)
- **Caveat**: rate-limit is **per-IP for anonymous**; pass `HF_TOKEN` to use your plan's quota (Free 1k/5min, PRO 2.5k/5min)

#### M2 — Raw REST `GET /api/models` [direct HTTP, language-agnostic]

- **Endpoint**: `https://huggingface.co/api/models`
- **Query params** (per OpenAPI `.well-known/openapi.md` 2026-05-19 + `huggingface.js` `packages/hub/src/lib/list-models.ts`): `search`, `author`, `filter`, `library`, `language`, `task`, `apps`, `gated`, `inference`, `inference_provider`, `sort`, `direction`, `limit`, `full`, `cardData`, `config`, `expand[]`
- **Pagination contract**: `Link: <https://huggingface.co/api/models?cursor=Y2hpZj0&search=...>; rel="next"` — base64 opaque cursor
- **Rate-limit headers** (returned on every response per IETF `draft-ietf-httpapi-ratelimit-headers` v9): `RateLimit: "api|pages|resolvers";r=<remaining>;t=<seconds-to-reset>` and `RateLimit-Policy: "fixed window";"api|pages|resolvers";q=<quota>;w=<window-sec>`
- **JS equivalent**: `import { listModels } from "@huggingface/hub"` (async generator pattern, per `packages/hub/src/lib/list-models.ts:68`)
- **Cite-anchor**: huggingface.co OpenAPI spec at `https://huggingface.co/.well-known/openapi.json` (huggingface.co) + `huggingface.js/packages/hub` (huggingface.js GitHub org-distinct) + community awesome-hf-clients lists (Stack Overflow / GitHub awesome-lists 3rd-org)
- **Caveat**: no built-in 429 retry — you implement IETF header parsing yourself

#### M3 — `mcp__hf-mcp-server__hub_repo_search` [MCP wrapper, USER-ERROR per Stream-1]

- **Surface**: this runtime's installed MCP `hf-mcp-server` via `.mcp.json` `npx -y @huggingface/mcp-server@<pinned>` (cardinal-rule-2 compliant)
- **Underlying**: wraps `/api/models` + `/api/datasets` + `/api/spaces` (via `repo_types[]`)
- **Limit cap**: typically 50-100 per call (MCP surface; not the underlying REST limit). **No cursor exposed** in MCP surface — to walk full result-set you cannot via M3 alone
- **Correct usage** (per Stream-1 `CORRECT-USAGE.md`):
  - Pattern A: single-token `query="dspy"`
  - Pattern B: `filters=["mcp-server"]` + NO `query` (tag-based listing)
  - Pattern C: `author="huggingface"` + sort
- **Anti-patterns**: multi-word free-text `query="claude code mcp agent harness"` (substring-search on repo IDs only, will return 0)
- **Cite-anchor**: Stream-1 `CORRECT-USAGE.md` (this runtime, internal-but-anchored) + HF official docstring (huggingface.co) + HF Open LLM Leaderboard FAQ (separate HF product, 3rd-org-distinct from base hub docs)
- **When NOT to use**: any enumeration >1 page; use M1/M5 instead

#### M4 — `/api/quicksearch` [front-end UI search backend, undocumented in main hub-docs]

- **Endpoint**: `GET https://huggingface.co/api/quicksearch?q=<term>&type=model&limit=20`
- **Confirmed parameters** (per `.well-known/openapi.md` 2026-05-19, "Repository Search" section, Lines 4033-4052):
  - `q` (query string — full-text, NOT substring like `/api/models?search=`)
  - `type` (filter to one of: models, datasets, spaces, orgs, users, papers, collections, buckets)
  - `lang`, `library`, `pipelines` (comma-separated pipeline types)
  - `orgsFilter`, `reposFilter` (scope by org/repo set)
  - `exclude[]` (array of qualified IDs to exclude: `spaces/repo`, `models/repo`, etc.)
  - `namespace`, `repoName`, `repoType`, `discussionId`, `includeInvitees`
  - `limit` (string, undocumented cap — empirically caps at ~10-100; **THIS is the documented-limit-class endpoint that justifies the bypass principle**)
- **Use case**: replicate what the huggingface.co search box at top of the page sees (cross-type result mix: 3 models + 2 datasets + 2 spaces + 1 paper for a single query)
- **Cite-anchor**: huggingface.co OpenAPI spec (huggingface.co) + dataset-viewer `/search` endpoint analog (3rd-org `huggingface/dataset-viewer` repo for the BM25/DuckDB analog) + DeepWiki Q&A `huggingface/huggingface_hub` (which confirmed there is no `/api/quicksearch` IN the Python lib — i.e. it's a separate surface only the front-end uses)
- **Why it's relevant**: closest thing to "real" full-text search; complements M1/M3 substring-only semantics

#### M5 — `cfahlgren1/hub-stats` parquet snapshot [PRIMARY SOTA-BYPASS for exhaustive enumeration]

- **Dataset**: `https://huggingface.co/datasets/cfahlgren1/hub-stats` — community-maintained daily snapshot of Hub metadata
- **Coverage (verified 2026-05-19)**: 6 subsets — `datasets` (1.01M rows) · `arxiv_papers` (85.4k) · `models` (2.89M) · `papers` (15k) · `posts` (1.43k) · `spaces` (1.3M); each row carries `_id, id, author, cardData, disabled, gated, lastModified, likes, trendingScore, private, sha, description, downloads, downloadsAllTime, ...storage..., tags[]`
- **Auto-converted to Parquet** at `https://huggingface.co/api/datasets/cfahlgren1/hub-stats/parquet/<subset>/train/<N>.parquet` — directly readable by DuckDB via `httpfs`
- **Query pattern (single SQL)**:
  ```sql
  -- All models with "mcp" tag, sorted by trending score
  INSTALL httpfs; LOAD httpfs;
  SELECT id, author, likes, downloads, trendingScore, tags
  FROM read_parquet('https://huggingface.co/api/datasets/cfahlgren1/hub-stats/parquet/models/train/*.parquet')
  WHERE list_contains(tags, 'mcp')
  ORDER BY trendingScore DESC NULLS LAST
  LIMIT 100;
  ```
- **`hf datasets sql` shortcut** (`huggingface_hub>=1.2.0` CLI):
  ```bash
  hf datasets sql "SELECT COUNT(*) FROM read_parquet('https://huggingface.co/api/datasets/cfahlgren1/hub-stats/parquet/models/train/0.parquet')"
  ```
- **Rate-limit class**: parquet files go via the **Resolvers** bucket. Per the canonical Sept-2025 table at `https://huggingface.co/docs/hub/rate-limits#rate-limit-tiers`, the exact per-tier Resolvers quotas (5-min fixed windows) are: Anon **3,000** · Free **5,000** · PRO **12,000** · Team **20,000** · Enterprise **50,000** · Enterprise Plus **100,000** · Enterprise Plus + Org IP Ranges **500,000** · Academia Hub **12,000**. Ratio over the Hub-API bucket is **4.8x-10x depending on plan** (Anon 6x · Free 5x · PRO 4.8x · Team 6.67x · Enterprise 8.33x · Enterprise Plus 10x · Enterprise Plus + IP Ranges 5x · Academia 4.8x) — **not a uniform 10x**. See §"HF per-tier rate-limit table" below.
- **Freshness**: daily refresh (community-maintained, not officially Hugging-Face-owned; verify per-use via `lastModified` of dataset itself)
- **Cite-anchor**: dataset page `https://huggingface.co/datasets/cfahlgren1/hub-stats` (HF Hub-hosted, community org 3rd-org-distinct from huggingface main org) + `huggingface_hub` CLI docs `hf datasets parquet`/`hf datasets sql` (huggingface_hub Python repo) + DeepWiki Q&A on huggingface_hub confirming `list_dataset_parquet_files` usage (DeepWiki search-grounded 3rd-org)
- **Tradeoff**: snapshot lag (up to 24h) — for "what shipped in the last 6 hours" use M1/M6 instead

#### M6 — Webhooks [push-based real-time stream]

- **Surface**: `https://huggingface.co/settings/webhooks` — register `https://your.handler/...` with `--watch model:<id>` or `--watch org:<name>`
- **Triggered events** (per `https://huggingface.co/docs/hub/webhooks`): `repo` (create/delete/update/move), `repo.content` (new commits/tags), `repo.config`, `discussion`, `discussion.comment`
- **Payload**: JSON with `event.action`, `event.scope`, `repo`, `discussion?`, `comment?`, `updatedRefs?`, `updatedConfig?`
- **Rate-limit**: 1,000 triggers per webhook per 24h (PRO+ contactable for higher)
- **"All events on HF"**: per FAQ — not exposed in UI, **but email-toggleable** via `website@huggingface.co`
- **Use case**: real-time firehose of new models/datasets/spaces matching `--watch user:<org>` patterns; combined with M5-daily-snapshot for backfill
- **Cite-anchor**: HF webhooks docs (huggingface.co) + `huggingface_hub` `webhook_endpoint` decorator (huggingface_hub Python lib) + dataset-viewer webhooks-guide-metadata-review (separate HF product 3rd-org-distinct)
- **CLI**: `hf webhooks create --url https://example.com/hook --watch org:HuggingFace --watch model:gpt2 --domain repo` (huggingface_hub>=1.x)

---

## Recommended composition pattern for this runtime

For SOTA-discovery-class queries ("find all MCP servers on HF Hub", "all 6B-128B param models in last 30 days"):

1. **Bulk discovery layer**: M5 (DuckDB SQL over `cfahlgren1/hub-stats` parquet) — single SQL pulls ALL matching repos, no rate-limit concern
2. **Fresh-tail delta layer**: M1 with `sort="last_modified"`, `direction=-1` and short-circuit when you hit a repo already in M5 snapshot
3. **In-session ad-hoc**: M3 ONLY with Pattern B (tag-filter, no `query` or single-token `query`) per Stream-1
4. **Real-time monitoring**: M6 webhook on `--watch user:<known-org>` patterns; M6 firehose for "any new MCP-server space" requires website@huggingface.co toggle

### Anti-pattern: filing an issue against documented limits

Per operator principle 2026-05-19: documented limits (per-page cap, plan-based 5-min rate window, MCP-surface `limit` cap) are NOT bugs. **Bypass via M5 dataset-snapshot or M1 cursor walk before considering an upstream issue.** Stream-1's withdrawn `hub_repo_search` issue (renamed `WITHDRAWN-USER-ERROR-*`) is the canonical example.

---

## HF per-tier rate-limit table (canonical, W329-G recalibration)

> **Source-of-truth**: `https://huggingface.co/docs/hub/rate-limits#rate-limit-tiers` (huggingface.co official docs page, fetched 2026-05-19). Quoted: "Here are the current rate limits (in September '25) based on your plan" + "All quotas are calculated over 5-minute fixed windows" + "For organizations, rate limits are applied individually to each member, not shared among members."

| Plan | API (req/5min) | Resolvers (req/5min) | Pages (req/5min) | Resolvers÷API ratio |
|---|---:|---:|---:|---:|
| Anonymous user (per IP) | 500 * | 3,000 * | 100 * | **6.0x** |
| Free user | 1,000 * | 5,000 * | 200 * | **5.0x** |
| PRO user | 2,500 | 12,000 | 400 | **4.8x** |
| Team organization | 3,000 | 20,000 | 400 | **6.67x** |
| Enterprise organization | 6,000 | 50,000 | 600 | **~8.33x** |
| Enterprise Plus organization | 10,000 | 100,000 | 1,000 | **10.0x** |
| Enterprise Plus (Org IP Ranges defined) | 100,000 | 500,000 | 10,000 | **5.0x** |
| Academia Hub organization | 2,500 | 12,000 | 400 | **4.8x** |

`*` Anonymous and Free are subject to change "depending on platform health" per the upstream doc.

**Calibration verdict (W329-G, supersedes prior "~10x" claim across this file)**: the Resolvers÷API ratio is **NOT a uniform 10x** — it spans **4.8x-10x** across documented tiers, with PRO + Academia Hub at the **bottom of the range (4.8x)** and Enterprise Plus (no Org-IP-Ranges) at the **top (10x)**. The previous M5 prose "Resolvers (3k-100k/5min, ~10x higher than Hub APIs)" was over-calibrated; the recalibrated values above are sourced directly from the per-tier table.

**HTTP-header self-verification protocol (per upstream HF docs §"HTTP Headers")**: every Hub response carries IETF `draft-ietf-httpapi-ratelimit-headers` v9 headers:

- `RateLimit: "api|pages|resolvers";r=<remaining>;t=<seconds-to-reset>`
- `RateLimit-Policy: "fixed window";"api|pages|resolvers";q=<quota>;w=<window-sec>`

Operator can **always verify the live per-account quota** by inspecting these headers on any 200 response (no need to trust the static table for an unfamiliar plan).

## Cite-anchor inventory (3-org-distinct per method)

| Method | huggingface.co official | huggingface_hub / huggingface.js lib | 3rd-org community/related |
|---|---|---|---|
| M1 | `docs/huggingface_hub/package_reference/hf_api` | `src/huggingface_hub/hf_api.py` deepwiki | HF forum `discuss.huggingface.co` examples |
| M2 | `.well-known/openapi.json` + `openapi.md` | `huggingface.js/packages/hub/src/lib/list-models.ts:68` | IETF `draft-ietf-httpapi-ratelimit-headers` v9 spec |
| M3 | HF `hf_doc_search` HfApi docstring | hub_repo_search MCP wrapper (this runtime install) | Open LLM Leaderboard FAQ (separate HF product) |
| M4 | OpenAPI § "Repository Search" Lines 4033-4052 | `dataset-viewer` `/search` BM25 DuckDB analog | DeepWiki search on `huggingface/huggingface_hub` confirming `/api/quicksearch` absence in lib |
| M5 | `huggingface.co/datasets/cfahlgren1/hub-stats` page + `huggingface.co/docs/hub/rate-limits#rate-limit-tiers` (canonical per-tier Resolvers quota table, W329-G primary) | `hf datasets sql` CLI doc | DuckDB `httpfs` ext docs (`duckdb.org`) |
| M6 | `docs/hub/webhooks` | `huggingface_hub.webhook_endpoint` decorator | FastAPI/Gradio integration guide (3rd-party frameworks) |

**Total 3-org-distinct cite count**: 19 (6 methods × 3 orgs + W329-G M5 canonical-rate-limits primary added) — meets W328 brief constraint + W329-G recalibration.

---

## Cross-link with Stream-1

- Stream-1 path (NOT owned by this stream): `../W328-HF-USAGE-CORRECTION/CORRECT-USAGE.md`
- Stream-1 verdict: `hub_repo_search` is correctly-implemented, USER-ERROR on multi-word queries
- This stream's verdict: even with correct M3 usage, M3 is **wrong tool for bulk enumeration** — use M5 (dataset snapshot) or M1 (Python cursor walk)
- The combined W328 conclusion: **no upstream issue should be filed against `hub_repo_search` substring semantics OR against documented rate limits**. The bypass methods (M5 esp.) make the documented limits operationally irrelevant for this runtime.

## Wave footprint

- Created: 2026-05-19 (W328 Stream-3)
- Pairs with: W328 Stream-1 `../W328-HF-USAGE-CORRECTION/CORRECT-USAGE.md`
- Operationalizes: operator-2026-05-19 "SOTA endpoints with documented limits → use bypass, NOT file-issue" principle
- Codifies: 6-method enumeration matrix as canonical reference for any future "enumerate HF Hub repos matching X" need
- **W329-G recalibration 2026-05-19**: replaced "~10x" Resolvers-vs-API ratio claim with canonical Sept-2025 per-tier table from `https://huggingface.co/docs/hub/rate-limits#rate-limit-tiers`; per-tier ratios actually span **4.8x-10x** (not uniform 10x). Codex round-1 P1 closed.
