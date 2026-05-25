# W320 Stream A — Research/Crawl/Extract MCP Portfolio Shootout

> Wave: W320 Research-Architecture Enhancement
> Date: 2026-05-19
> Scope: SEARCH / CRAWL / EXTRACT / ANSWER / INDEX primitives
> Question: Can Tavily be replaced? Which is best? Overlap? Is WebFetch+context-mode sufficient?
> Audit-style: sca-v7.2 with W320 D-EMP empirical-viability hard-gate carry-forward

---

## §1 Executive Summary (TL;DR)

**Verdict**: Tavily CANNOT be 1:1 replaced by Exa, Firecrawl, or Jina — they target different primitives. WebFetch + context-mode is **insufficient as a sole research stack** but **excellent as the FREE backbone for known-URL retrieval**. The SOTA portfolio for an autonomous-research LLM agent on Windows Z:-portable is a **3-MCP minimum** + **2-MCP optional** stack:

### Keep (CR-9 compliant, already in `.mcp.json`)
- **`tavily-mcp@0.5.4`** — KEEP. Unique strength: integrated search+extract+crawl+map+research with strong RAG-optimized snippets; only one with a research-mode aggregator that fans-out (≤20 sub-queries) under one billable call.
- **`exa-mcp@2.0.13`** — KEEP. Unique strength: **neural/semantic similarity search** + **highlights** + **find similar pages** — Tavily cannot do similarity ranking by embedding.
- **`@perplexity-ai/mcp-server@0.9.0`** — KEEP. Unique strength: ANSWER primitive with Sonar-deep-research + reasoning-pro; no other tool produces a coherent multi-source answer with citations in one call.

### Add (NEW, W320 candidate installs)
- **`firecrawl-mcp@1.x`** — **ADD** *(decision: T2 pilot then T1 if stable)*. Unique strength: **best-in-class JS-rendered crawl + structured-data extract via LLM schema**; complements Tavily's lighter extract.
- **`jina-mcp-tools@latest`** *(or direct REST via WebFetch)* — **OPTIONAL ADD**. Unique strength: **r.jina.ai Reader** = free, no-auth markdown extraction of any URL + **embeddings + reranker**.

### Remove
- Nothing. None of the current research-class MCPs is dominated; each occupies a distinct primitive slot.

### Skip / Pattern-only / Reject
- **Brave Search, Kagi, Serper, You.com, Linkup** — SEARCH-only providers, dominated by Tavily+Exa portfolio.
- **SearXNG** — self-host complexity; pattern-only.
- **Crawl4AI** — Python library, pattern-vendor (use as Lane-D ingest backend, not MCP).
- **Bright Data, Apify, ScrapeGraphAI** — enterprise scraping infra, overkill for research-agent use case.
- **ChromeDevTools / Playwright MCPs** — already installed; serve dynamic-page automation, NOT research-text retrieval.

### Net `.mcp.json` change recommendation
```jsonc
// ADD (1 new server, CR-9 compliant)
"firecrawl": {
  "command": "npx",
  "args": ["-y", "firecrawl-mcp@1.16.4"],
  "env": { "FIRECRAWL_API_KEY": "${FIRECRAWL_API_KEY}" }
}
```
- Jina via WebFetch wrapper (no MCP needed for Reader); install jina-mcp-tools only if reranker is desired.

---

## §2 Primitive-Class Decomposition

Five orthogonal research primitives. A tool may cover multiple, but optimal portfolios pick the BEST per primitive without redundancy.

| Primitive | Definition | Decision-relevant capabilities |
|---|---|---|
| **SEARCH** | Given a natural-language query, return a ranked list of URLs + snippets. | Recency filter, domain filter, depth control, raw-content toggle, neural vs keyword, free-tier quota. |
| **CRAWL** | Given a seed URL, retrieve N linked pages with rules (depth, allow/deny, sitemap discovery). | JS rendering, robots.txt respect, concurrency limit, dedupe, markdown vs HTML output. |
| **EXTRACT** | Given a known URL, retrieve cleaned main-content text/markdown + optional structured fields. | Boilerplate removal, JS render fallback, schema-driven extract (LLM or selectors), PDF/image handling. |
| **ANSWER** | Given a question, return a synthesized multi-source answer with inline citations. | Reasoning depth, citation density, recency, deep-research multi-step. |
| **INDEX** | Persist retrieved content for future low-cost retrieval (vector + FTS). | Storage location, chunking strategy, retrieval API, reindex cost. |

### Tool → Primitive mapping

| Tool | SEARCH | CRAWL | EXTRACT | ANSWER | INDEX |
|---|---|---|---|---|---|
| Tavily | YES (primary) | YES (good) | YES (good) | partial (research-mode) | NO |
| Exa | YES (neural/semantic) | NO (`/contents` only) | YES (highlights) | partial (answer endpoint) | NO |
| Firecrawl | YES (search) | YES (best) | YES (best, LLM-schema) | NO | NO |
| Jina (r.jina.ai + s.jina.ai) | YES (basic) | NO | YES (free, no-auth) | NO | partial (embeddings+rerank) |
| Perplexity | partial (sonar) | NO | NO | YES (best) | NO |
| Brave / Kagi / Serper / Linkup / You.com | YES | NO | NO | NO | NO |
| SearXNG | YES (meta) | NO | NO | NO | NO |
| Crawl4AI (Python) | NO | YES | YES | NO | NO |
| WebFetch (built-in) | NO | NO | YES (basic, AI-cleaned) | NO | NO |
| context-mode `ctx_fetch_and_index` | NO | NO | YES (basic) | NO | YES (local SQLite FTS5) |
| repomix | NO | partial (GitHub-only) | YES (code-only) | NO | NO |
| ChromeDevTools / Playwright | NO | partial | YES (any DOM) | NO | NO |
| GitHub MCP (via everything-claude-code) | YES (code-search) | NO | YES (code-only) | NO | NO |
| HF MCP | YES (HF only) | NO | YES (HF only) | NO | NO |
| DeepWiki | NO | NO | YES (GitHub repo wiki) | YES (repo Q&A) | NO |

---

## §3 Capability Matrix (Detailed)

(filled below in §4 deep dives; condensed scoring 0-5)

| Tool | Search-quality | Crawl-depth | Extract-quality | Answer-coherence | JS-render | Schema-extract | Free-tier | MCP-available | CR-9 install |
|---|---|---|---|---|---|---|---|---|---|
| Tavily | 4.5 | 3.5 | 4.0 | 3.5 | YES | partial | 1000 credits/mo | YES (official) | YES |
| Exa | 4.5 (neural) | 1.0 | 4.0 (highlights) | 3.0 | partial | NO | 1000 searches/mo | YES (official) | YES |
| Firecrawl | 4.0 | 5.0 | 5.0 | 1.0 | YES | YES (LLM) | 500 credits/mo | YES (official) | YES |
| Jina (Reader+Search) | 3.5 | 1.0 | 4.5 | 0.5 | partial | NO | ~no-auth Reader free | community MCP | YES |
| Perplexity | 4.0 | 0 | 0 | 5.0 | n/a | n/a | trial | YES (official, W317) | YES |
| Brave | 4.0 | 0 | 0 | 0 | n/a | NO | 2000/mo free | YES (community) | YES |
| Kagi | 4.5 | 0 | 0 | 0 | n/a | NO | paid-only | YES (community) | partial |
| Serper | 4.0 (Google SERP) | 0 | 0 | 0 | n/a | NO | 2500 trial | YES (community) | YES |
| Linkup | 4.0 | 1.0 | 2.0 | 3.5 | n/a | NO | trial | YES (community) | YES |
| WebFetch | 0 | 0 | 3.0 | 0 | NO | NO | unlimited (free, built-in) | n/a | n/a |
| context-mode | 0 | 0 | 2.5 | 0 | NO | NO | unlimited (local) | YES (already installed) | n/a |

---

## §4 Tool-by-Tool Deep Dive

### 4.1 Tavily (`tavily-mcp@0.5.4`)

**Primitives**: SEARCH (primary), EXTRACT, CRAWL, MAP, RESEARCH (aggregator).
**Pricing**: $0.005/query baseline (180ms latency); 1000 free credits/month; pay-as-you-go.
**MCP**: Official `tavily-mcp` npm package (currently `@0.5.4`), already in `.mcp.json`.
**Strengths**: (a) Cleanest "AI-search API" story — LLM-optimized snippets with `include_raw_content` flag for inline RAG; (b) `tavily_search` agent does query rewriting and ranking; (c) `tavily_extract`, `tavily_crawl`, `tavily_map`, `tavily_research` give it the broadest *agent-API* surface area of any single provider; (d) only provider with `Pass` on error handling in sagentum.com live testing — structured error responses with HTTP status codes; (e) widely referenced in LangChain/LlamaIndex tutorials → highest community familiarity.
**Weaknesses**: (a) No semantic/neural search — pure keyword/agent-augmented; (b) Crawl is shallower than Firecrawl (no JS-render parity); (c) Nebius acquisition introduces product-direction uncertainty (firecrawl.dev blog 2026-03); (d) Extract is "Tavily Extract Basic" @ $1.60/1K — Jina Reader is ~94% cheaper.
**Verdict**: **KEEP** as the SEARCH primitive primary. **Distinct slot**: agent-API-mindshare + research-mode aggregator.
Citations: `https://docs.tavily.com/documentation/api-reference/search`, `https://github.com/tavily-ai/tavily-mcp`, `https://www.firecrawl.dev/blog/best-ai-search-engines-agents` (2026-03-24).

### 4.2 Exa (`exa-mcp@2.0.13`)

**Primitives**: SEARCH (neural/semantic), EXTRACT (highlights), partial ANSWER (`/answer`), find-similar (`/findSimilar`).
**Pricing**: $7/1K searches; $1/1K pages per content-type for `/contents`; $10 free credit; `/findSimilar` priced as a search; `/deep-search` premium.
**MCP**: Official `exa-mcp@2.0.13` (already in `.mcp.json`). Includes `web_search_exa`, `web_fetch_exa`.
**Strengths**: (a) Genuinely neural embedding-based — 62% accuracy on company search benchmarks vs 36-37% for keyword search (webcite.co Mar 2026); (b) **`/findSimilar` is unique** — "give me 10 pages similar to this one" eliminates needing to triangulate via multiple keyword queries; (c) **highlights** keep context window lean — returns only the most relevant excerpts per query; (d) `category:people`, `category:company`, `category:research` filters; (e) Suitable-tier 80.56 on sagentum.com — highest among the three.
**Weaknesses**: (a) No crawl, no JS-execute; (b) For high-freshness content (news, stock prices), Google-backed engines (Serper, Brave) beat Exa's embedding index; (c) Live testing showed `Fail` on error handling.
**Verdict**: **KEEP** as the semantic-search complement. **Distinct slot**: neural similarity + highlights, irreplaceable by Tavily.
Citations: `https://docs.exa.ai/reference/getting-started`, `https://exa.ai/pricing`, `https://github.com/exa-labs/exa-mcp-server`.

### 4.3 Firecrawl (`firecrawl-mcp@1.16.4` — proposed ADD)

**Primitives**: CRAWL (best), EXTRACT (best, LLM-schema), SEARCH (with scrape), MAP.
**Pricing**: 500 free credits/month; Hobby $16/mo = 3K credits; Standard $83/mo = 100K credits; flat-rate predictability. Extraction-heavy tiers $89-$719 token bundles. **1 page = 1 credit**.
**MCP**: Official `firecrawl-mcp` (currently `@1.16.4` as of W320 audit). AGPL-3.0 core; commercial-friendly. Self-hostable.
**Strengths**: (a) **Best-in-class JS-rendered crawl** — Chromium fallback w/ FIRE-1 agent for dynamic sites; (b) **Schema-based extract** with Pydantic/Zod — `extract({url, schema})` returns typed structured data, no scraper-code; (c) Single-call **search-and-scrape** returns full page content alongside SERP results, eliminating dual-pipeline; (d) `Agent` endpoint for autonomous research (similar to Tavily research); (e) Self-host option for air-gapped or data-residency.
**Weaknesses**: (a) Live testing showed `Caution` tier 50.00 on sagentum.com — docs-only assessment; (b) Search is OK but not specialized; (c) JS-render adds latency vs Tavily; (d) Credit math gets expensive for high-volume crawl.
**Verdict**: **ADD** as the CRAWL+EXTRACT primary. **Distinct slot**: structured extract + JS crawl, neither Tavily nor Exa cover this.
Citations: `https://docs.firecrawl.dev/`, `https://www.firecrawl.dev/pricing`, `https://github.com/mendableai/firecrawl-mcp-server`, `https://blog.apify.com/jina-ai-vs-firecrawl/` (2026-01-16).

### 4.4 Jina AI (`r.jina.ai` Reader + `s.jina.ai` Search + Embeddings + Reranker)

**Primitives**: EXTRACT (best free), SEARCH (basic), INDEX (embeddings + reranker).
**Pricing**: **No-auth Reader free at 20 RPM** — prefix any URL with `https://r.jina.ai/`. With API key: 10M free tokens, then ~$0.02/M tokens token-metered (community-reported). Reader bills by output tokens, not request — small pages ~$0.10/1K calls (94% cheaper than Tavily Extract).
**MCP**: Community MCP `jina-mcp-tools` exists (not officially Jina-maintained); for Reader, **direct WebFetch wrapper is simpler** than installing an MCP — `r.jina.ai/<url>` is unauthenticated GET.
**Strengths**: (a) **Embarrassingly cheap extract** — best price/token in the market; (b) `s.jina.ai/?q=` is free SERP+extract layer (returns full Reader-cleaned content per result); (c) ReaderLM-v2 (1.5B) does boilerplate-strip + link-dedupe + image-caption; (d) Apache 2.0 core (vs Firecrawl's AGPL-3.0) — corporate-friendly; (e) Throughput 20-5000 RPM by tier.
**Weaknesses**: (a) No structured-extract via schema — pure markdown out; (b) Search is weaker than Tavily/Exa; (c) No formal answer/synthesis; (d) Embeddings and reranker are separate pricing dimensions; (e) Community MCP quality varies.
**Verdict**: **OPTIONAL ADD** as the EXTRACT cost-floor backstop. Recommend WebFetch wrapper over MCP install initially. **Distinct slot**: cheapest extract + no-auth fallback.
Citations: `https://jina.ai/reader/`, `https://jina.ai/search/`, `https://blog.apify.com/jina-ai-vs-firecrawl/`, `https://codenote.net/en/posts/tavily-alternatives-cost-comparison-search-extract-api/`.

### 4.5 Perplexity (`@perplexity-ai/mcp-server@0.9.0`)

**Primitives**: ANSWER (best, Sonar variants).
**Pricing**: Per-request + tokens; Sonar baseline ~$1/1K + $1/M input tokens; Sonar Pro ~$5/1K; Sonar Reasoning Pro; **Sonar Deep Research ~$10-50/query** (multi-hop, slow 30s+, takes 20 sub-queries fan-out).
**MCP**: Official `@perplexity-ai/mcp-server@0.9.0` (W317-r2 install — MIT, 3 Perplexity employee maintainers, 2202★ GitHub). Tools: `perplexity_ask`, `perplexity_search`, `perplexity_research`, `perplexity_reason`.
**Strengths**: (a) **Best ANSWER primitive** — coherent multi-source synthesis with inline numbered citations in one call; (b) `sonar-deep-research` does Tavily-research-equivalent multi-hop in a single API call; (c) `recency` filter, domain filter, search-context-size control; (d) Independent of own search infra — uses Google/Bing under the hood.
**Weaknesses**: (a) Costs balloon on deep-research mode (4 W320 queries can cost $50); (b) No raw URL+snippet primitive (must use other tools for citation-driven RAG); (c) Latency 500ms-30s depending on tier; (d) Output is markdown-prose — not structured data.
**Verdict**: **KEEP** as the ANSWER primitive primary. **Distinct slot**: irreplaceable for synthesis-with-citations.
Citations: `https://docs.perplexity.ai/`, `https://github.com/ppl-ai/modelcontextprotocol`, `https://www.perplexity.ai/hub/blog/introducing-the-sonar-pro-api`.

### 4.6 Brave, Kagi, Serper, Linkup, You.com (SEARCH-only providers)

| Tool | Pricing | Free tier | Strength | Weakness | Verdict |
|---|---|---|---|---|---|
| **Brave** | $3-5/1K | 2000 free/mo (1 QPS) | Independent privacy-focused index; Goggles (custom rerank); fastest 80ms | No extract, no JS, weaker on niche queries | SKIP — Tavily+Exa already cover |
| **Kagi** | $25/mo flat | Trial only | Quality-first SERP, ad-free, no SEO spam; Universal Summarizer endpoint | Paid-only; no MCP officially; SDK only | SKIP — paid wall, no MCP |
| **Serper** | $0.5/1K | 2500 trial | Direct Google SERP at lowest cost; freshness wins for news/stocks | Just SERP — no extract, no answer | SKIP — pattern-only (use for news fallback later) |
| **Linkup** | $5/1K | Trial | Hybrid search+answer; French startup; AI-native | Small index; less coverage | SKIP — Perplexity already covers ANSWER |
| **You.com** | $20/1K (Pro) | Limited | YouChat conversational; Smart mode synthesis | Expensive; ranking inconsistent; weak MCP | SKIP — dominated |

**Verdict**: All five are **dominated** by the Tavily+Exa+Perplexity portfolio. No add unless a specific gap emerges (e.g., add Serper for news-freshness if Tavily/Exa fall short on time-sensitive queries — W321 candidate).

### 4.7 SearXNG (self-hosted meta-search)

**Primitives**: SEARCH (meta-aggregator).
**Pricing**: Free OSS. Self-host cost only.
**MCP**: Community MCPs exist.
**Strengths**: Aggregates Google+Bing+Brave+DuckDuckGo with deduplication; no API keys; full data-residency control; great for air-gapped/SOC2 use cases.
**Weaknesses**: Self-host complexity (Docker + reverse proxy); no LLM-optimized snippets; no extract; no answer.
**Verdict**: **PATTERN-ONLY** — useful self-host reference but not a Windows Z:-portable fit. **Skip install**.
Citations: `https://github.com/searxng/searxng`.

### 4.8 Crawl4AI / Mercury / Trafilatura / Readability.js (Python/JS OSS libraries)

| Lib | Type | Use case |
|---|---|---|
| **Crawl4AI** | Python OSS (BSD-3) | Async crawl + LLM-friendly chunking; alternative to Firecrawl self-host; use as Lane-D ingest backend, not MCP |
| **Mercury Parser** | Postlight (archived) | Older boilerplate-stripper; superseded by Readability.js + Trafilatura |
| **Trafilatura** | Python OSS | Best-in-class text extraction for academic/news corpora; CLI + library |
| **Readability.js** | Mozilla JS OSS | Used in Firefox Reader Mode; embed in Playwright/CDP scripts for custom extract |

**Verdict**: All four are **pattern-vendor candidates**, not MCP installs. Use Crawl4AI as the Tavily-/Firecrawl-alternative for in-house pipelines; otherwise stick with hosted MCPs.
Citations: `https://github.com/unclecode/crawl4ai`, `https://github.com/adbar/trafilatura`, `https://github.com/mozilla/readability`.

### 4.9 Bright Data / Apify / ScrapeGraphAI (enterprise scraping infra)

**Pricing**: Bright Data $500+/mo enterprise; Apify usage-billed credits; ScrapeGraphAI per-query LLM-driven scrape.
**Verdict**: **OVERKILL** for autonomous-research agent use case. These are infrastructure for production scrape farms (proxy rotation, residential IPs, CAPTCHA solving). For an LLM agent doing ad-hoc research, Firecrawl + Jina cover 95% at 5% cost. **Skip**.
Citations: `https://brightdata.com/`, `https://apify.com/store`, `https://scrapegraphai.com/`.

### 4.10 WebFetch (built-in) + context-mode `ctx_fetch_and_index` (already installed)

**Primitives**: EXTRACT (WebFetch), EXTRACT+INDEX (context-mode).
**Pricing**: FREE — built into Claude Code; no external API.
**Strengths**: (a) WebFetch is the universal fallback — any URL, HTML→markdown via small model, 15-min cache; (b) context-mode `ctx_fetch_and_index` adds local SQLite FTS5 persistence — fetched pages become queryable forever via `ctx_search`; (c) No quota; (d) No CR-9 to worry about; (e) Combined with `ctx_execute` for code-driven fetch (raw HTTP via Node fetch in sandbox), this is a complete **basic** research stack.
**Weaknesses**: (a) **No JS rendering** — WebFetch returns server-rendered HTML only; SPAs fail; (b) **No search primitive** at all — must already know the URL; (c) **No structured extract** — pure markdown out; (d) Quality of cleanup varies; (e) No multi-source synthesis.
**Verdict**: **EXCELLENT FREE BACKBONE for KNOWN-URL retrieval and local indexing.** Cannot replace SEARCH or ANSWER primitives. Use for: (1) cite-anchor fetching of GitHub READMEs / arXiv abstracts; (2) any URL surfaced by Tavily/Exa/Perplexity that needs full-content ingest; (3) local persistent corpus building via `ctx_fetch_and_index`.
Citations: `https://docs.anthropic.com/en/docs/build-with-claude/tool-use/web-fetch-tool`, project context-mode MCP.

### 4.11 repomix / GitHub MCP (via everything-claude-code) / DeepWiki

**Primitives**: code-specific EXTRACT + ANSWER (DeepWiki).
- **repomix**: Pack any repo (local or remote) into single XML; security scan; ideal for "give my LLM a whole repo as context" workflows.
- **GitHub MCP**: SEARCH (code-only, but per W316 `search_repositories` has 4-wave silent-fallback issue [NARRATIVE-RESCINDED per W329-S2-REAUDIT 2026-05-19: original silent-fallback claim withdrawn; W328-S2 user-error verdict also retracted; root cause UNDETERMINED pending W330 investigation of rate-limit / token-scope / MCP-transform / cache paths]), file-read, PR/issue API.
- **DeepWiki** (`https://deepwiki.com/`): AI-generated wiki for any GitHub repo + `ask_question` Q&A. Best for "what does this repo do?" without cloning.

**Verdict**: All three serve **code-context primitive** (separate from general research). Keep all three — they don't overlap with Tavily/Exa/Firecrawl which focus on the open web. **DeepWiki is the irreducible ANSWER primitive for code repos** (Perplexity cannot read private GitHub).
Citations: `https://github.com/yamadashy/repomix`, `https://deepwiki.com/`, `https://github.com/github/github-mcp-server`.

### 4.12 ChromeDevTools MCP / Playwright MCP

**Primitives**: DOM-driven EXTRACT (any rendered page), browser-automation.
- **ChromeDevTools** (`chrome-devtools-mcp@1.0.1` per W317): debugging, performance traces, lighthouse audits, network inspection.
- **Playwright** (`@playwright/mcp@latest`): full browser scripting — click, fill, screenshot, evaluate.

**Verdict**: **Different primitive class** — these are *browser-automation* tools, not *research* tools. Use when Firecrawl/Tavily/Jina fail on hostile sites or need login flows. **Keep both as installed** but recognize they are not research-portfolio members.
Citations: `https://github.com/ChromeDevTools/chrome-devtools-mcp`, `https://github.com/microsoft/playwright-mcp`.

---

## §5 Overlap & Complementarity Analysis

### 5.1 Redundancy map

```
SEARCH primitive:
  Tavily     ████████ keyword+agent (180ms, $0.005/q)
  Exa        ████████ neural+similarity ($7/1K)
  Perplexity ██████   sonar (slower, but pairs with answer)
  Brave      █████    independent index (overlaps Tavily)
  Serper     █████    Google SERP (overlaps Brave)
  Kagi       █████    quality SERP (overlaps Brave)
  Jina       ███      s.jina.ai (overlaps Brave/Serper)
  SearXNG    ██       self-host meta
```
**Reading**: Tavily and Exa are **non-overlapping** (keyword/agent vs neural/semantic). Brave+Serper+Kagi+Linkup+You.com all overlap with Tavily. Perplexity overlaps partially but is primarily ANSWER-class.

```
CRAWL primitive:
  Firecrawl  ████████ JS+schema+self-host
  Tavily     █████    decent depth
  Crawl4AI   █████    OSS Python (self-host)
  Apify      ██████   enterprise
  Playwright ████     scripted only
```
**Reading**: Only Firecrawl + Tavily are turn-key MCP CRAWL providers. They overlap; Firecrawl strictly dominates on JS+schema+self-host. Tavily crawl is a "nice-to-have" companion to its search.

```
EXTRACT primitive:
  Firecrawl  ████████ best, schema-aware
  Jina       ████████ cheapest, no-auth Reader
  Tavily     ██████   "Extract Basic" $1.60/1K
  Exa        ██████   highlights (selective)
  WebFetch   ████     free, no JS
  ctx_fetch  ████     free, indexed
  Crawl4AI   ███████  OSS lib
```
**Reading**: Firecrawl, Jina, and WebFetch+ctx_fetch are **complementary** — schema-extract vs cheap-markdown vs free-local. Tavily Extract is the most expensive option for what it delivers.

```
ANSWER primitive:
  Perplexity ████████ sonar-deep-research (multi-hop)
  Tavily     █████    research-mode aggregator
  Exa        ████     /answer (basic)
  Linkup     █████    hybrid
  DeepWiki   ██████   code-repo Q&A only
```
**Reading**: Perplexity is the **irreplaceable** ANSWER primitive for general web. DeepWiki is the irreplaceable code-repo ANSWER primitive. Tavily/Exa have answer endpoints but they are not deep-research.

```
INDEX primitive:
  ctx_fetch_and_index ████████ local SQLite FTS5 (FREE)
  Jina embeddings     ██████   hosted embeddings
  cognee (installed)  ████████ graph+vector knowledge mgmt
  basic-memory        ████████ markdown+SQLite
```
**Reading**: INDEX is **already covered** by the existing runtime stack (context-mode + cognee + basic-memory). No new INDEX tool needed.

### 5.2 Irreducible portfolio

After dominance analysis, the **minimum non-redundant portfolio** for a research-agent on Windows Z:-portable is:

| Primitive | Primary | Secondary | Backstop (free) |
|---|---|---|---|
| SEARCH | **Tavily** (agent-API + research) | **Exa** (neural+similarity) | Brave (W321 only if Tavily/Exa miss) |
| CRAWL | **Firecrawl** (JS+schema) | Tavily (lightweight) | Playwright MCP (manual) |
| EXTRACT | **Firecrawl** (schema) | **Jina Reader** (cheap) | WebFetch + ctx_fetch_and_index |
| ANSWER | **Perplexity** (sonar-deep) | Tavily research | DeepWiki (repos only) |
| INDEX | **ctx_fetch_and_index** (local FTS5) | cognee | basic-memory |

**Conclusion**: 4 MCP servers + 1 built-in tool = irreducible. Currently installed: Tavily ✓, Exa ✓, Perplexity ✓, context-mode ✓. **Missing: Firecrawl** (the W320 add).

---

## §6 WebFetch + context-mode Coverage Verdict

**Question**: "Is WebFetch via context-mode a replacement for external research MCPs?"

**Verdict: NO — but it is an essential FREE backbone that complements the paid stack.**

### 6.1 What WebFetch + ctx_fetch_and_index *can* do
- Fetch any known URL → markdown.
- Index fetched content into local SQLite FTS5 → searchable forever.
- Cache 15-min on WebFetch reduces redundant calls.
- Zero quota, zero cost, fully air-gapped after fetch.
- Sufficient for: GitHub README ingest, arXiv abstract pull, documentation reference, follow-up-on-cited-URL workflows.

### 6.2 What it *cannot* do
1. **No SEARCH**: Cannot answer "find me pages about X" — only "fetch me this specific URL".
2. **No JS-rendering**: SPAs, infinite-scroll, click-through-walls all fail.
3. **No semantic similarity**: Cannot find "pages like this one".
4. **No deep-research synthesis**: Cannot produce a coherent multi-source answer with citations in one call.
5. **No structured extract**: HTML→markdown is best-effort; no schema-driven typed output.
6. **Quality variable**: Boilerplate strip is weaker than Trafilatura/Readability for academic/news content.

### 6.3 Empirical replacement test

If you tried to do this W320 audit using **only** WebFetch+ctx_fetch_and_index:
- ✗ Could not have discovered the 8 comparison articles surfaced by Exa neural search.
- ✗ Could not have asked Perplexity Sonar-deep "what is the SOTA portfolio" and got a synthesized answer.
- ✗ Could not have done find-similar from one good article to surface the cluster.
- ✓ Could have fetched any of the 8 article URLs once known.
- ✓ Could have indexed all fetched articles for `ctx_search` later.

**Conclusion**: WebFetch + ctx_fetch_and_index is the **discovery-output persistence layer**, not the **discovery layer**. Keep it as the universal FREE backbone; do NOT remove paid MCPs.

---

## §7 SOTA Portfolio Recommendation

### 7.1 Final `.mcp.json` changes (CR-9 compliant)

```jsonc
{
  "mcpServers": {
    // KEEP — already installed
    "tavily": {
      "command": "npx",
      "args": ["-y", "tavily-mcp@0.5.4"],
      "env": { "TAVILY_API_KEY": "${TAVILY_API_KEY}" }
    },
    "exa": {
      "command": "npx",
      "args": ["-y", "exa-mcp@2.0.13"],
      "env": { "EXA_API_KEY": "${EXA_API_KEY}" }
    },
    "perplexity": {
      "command": "npx",
      "args": ["-y", "@perplexity-ai/mcp-server@0.9.0"],
      "env": { "PERPLEXITY_API_KEY": "${PERPLEXITY_API_KEY}" }
    },

    // ADD (W320 — replaces nothing; covers CRAWL+EXTRACT)
    "firecrawl": {
      "command": "npx",
      "args": ["-y", "firecrawl-mcp@1.16.4"],
      "env": { "FIRECRAWL_API_KEY": "${FIRECRAWL_API_KEY}" }
    }

    // ... other existing entries unchanged: repomix, github-via-ecc, deepwiki,
    //     context-mode, hf-mcp, chrome-devtools, basic-memory, cognee, gitnexus,
    //     langfuse, playwright, serena
  }
}
```

### 7.2 NO REMOVE list
- No removals recommended. Each currently-installed research-class MCP serves a distinct primitive slot or capability axis (see §5.1).

### 7.3 Operational policy

| When to reach for which tool | Tool |
|---|---|
| "Find me pages about X" (current events / freshness) | `mcp__tavily__tavily_search` |
| "Find me pages similar to this URL / semantic concept" | `mcp__exa__web_search_exa` + `findSimilar` |
| "Synthesize an answer with citations from multiple sources" | `mcp__perplexity__perplexity_ask` (quick) or `_research` (deep) |
| "Crawl this website and extract structured data" | `firecrawl-mcp` (after W320 install) |
| "Just give me the clean markdown for this URL" (cheapest) | `r.jina.ai/<url>` via WebFetch wrapper |
| "Read this URL I already have" (free, basic) | WebFetch |
| "Read + persist this URL for later search" | `ctx_fetch_and_index` |
| "Ask AI about a GitHub repo" | DeepWiki `ask_question` |
| "Pack a whole repo for context" | `repomix` |
| "Click through a JS-heavy site / form" | Playwright MCP |

### 7.4 Pre-install checks for `firecrawl-mcp`
1. Get API key at `https://www.firecrawl.dev/app/api-keys`. Add to `CLAUDE.local.md` env block as `FIRECRAWL_API_KEY=fc-...`.
2. Smoke-test: `npx -y firecrawl-mcp@1.16.4 --version` (should print without error).
3. Add to `.mcp.json` mcpServers block per §7.1.
4. Validate via `mcp__firecrawl__scrape({url:"https://example.com"})` after restart.
5. Empirical-viability gate (W320 D-EMP): if scrape returns 200+chars markdown of example.com → T1 INSTALL ratified.

---

## §8 Cost Analysis (free-tier + paid-tier breakeven)

### 8.1 Free-tier monthly capacity

| Tool | Free-tier credits/quota | Equivalent in "research-tasks" (~30 calls each) |
|---|---|---|
| Tavily | 1000 credits/mo | ~33 research tasks |
| Exa | $10 free credit | ~1400 searches OR 10K page-contents |
| Perplexity | trial credits | ~10-20 deep-research queries |
| Firecrawl | 500 credits/mo (1 page = 1 credit) | ~16 crawl tasks (~30 pages each) |
| Jina (no auth) | 20 RPM unlimited | unlimited Reader, key-tier 10M tokens free |
| Brave | 2000/mo (1 QPS) | ~66 research tasks |
| Serper | 2500 trial | one-time burn |
| WebFetch | unlimited | unlimited (built-in) |
| ctx_fetch_and_index | unlimited | unlimited (local) |

### 8.2 Paid-tier $/1K calls

| Tool | $/1K | Notes |
|---|---|---|
| Tavily search | $5 | $0.005/q baseline |
| Tavily extract | $1.60 | "Extract Basic" |
| Exa search | $7 | neural |
| Exa /contents | $1 per content-type | per 1K pages |
| Firecrawl Standard | $0.83 | 100K credits = $83, $0.00083/page |
| Firecrawl Hobby | $5.33 | 3K credits = $16 |
| Jina Reader | ~$0.10 | output-token-billed, 94% cheaper than Tavily |
| Perplexity Sonar | ~$1 | + $1/M input tokens |
| Perplexity Sonar Pro | ~$5 | |
| Perplexity Deep Research | ~$10-50/query | multi-hop |
| Brave | $3-5 | |
| Serper | $0.50 | Google SERP cheapest |
| Kagi | $25/mo flat | unlimited within plan |

### 8.3 Breakeven thresholds

- **Casual research** (<100 tasks/mo): All providers fit free-tier — no cost.
- **Daily research** (1000 tasks/mo): Tavily $5 + Exa ~$2 + Perplexity ~$20 + Firecrawl Hobby $16 ≈ **$43/mo total**.
- **Heavy research** (10K tasks/mo): Tavily ~$50 + Exa ~$20 + Perplexity ~$200 + Firecrawl Standard $83 ≈ **$353/mo total**.
- **Extreme research** (100K+ tasks/mo): switch Tavily search → Brave or Serper; switch extract → Jina Reader; keep Perplexity for answer-only; total ~$500/mo budget achievable.

### 8.4 Cost-of-replacement (Tavily → alternatives)

If you removed Tavily and tried to replicate its functionality:
- Search: Exa $7/1K (40% more expensive) OR Brave $3/1K (cheaper, but no agent-API) OR Serper $0.50/1K (cheapest, but no extract integration).
- Extract: Firecrawl $0.83/1K (47% cheaper) OR Jina $0.10/1K (94% cheaper).
- Crawl: Firecrawl (better quality).
- Map: Firecrawl `/map`.
- Research: Perplexity Deep Research (different UX but better synthesis).

**Net**: You CAN cost-replace Tavily for ~$1/1K (Serper+Jina), but you LOSE: (a) the integrated agent-API, (b) LangChain mindshare, (c) error-handling quality (sagentum testing). Cost savings ~$4/1K is small vs. the integration tax. **Verdict: KEEP Tavily**.

---

## §9 Cite Bibliography

Primary 2026 comparison articles (high-signal):
1. `https://codenote.net/en/posts/tavily-alternatives-cost-comparison-search-extract-api/` — Tavily Alternatives Compared (Tadashi Shigeoka) — comprehensive cost+capability matrix.
2. `https://fastcrw.com/blog/exa-vs-tavily-vs-firecrawl-search-api` (2026-04-21) — Exa vs Tavily vs Firecrawl: Which Search API Is Best for AI Agents.
3. `https://sagentum.com/blog/exa-vs-tavily-vs-firecrawl` — Live MCP behavior testing (sagentum.com tier scores).
4. `https://www.firecrawl.dev/blog/best-deep-research-apis` (2026-02-02) — 5 Best Deep Research APIs (Hiba Fathima).
5. `https://blog.apify.com/jina-ai-vs-firecrawl/` (2026-01-16) — Jina AI vs. Firecrawl (Theo Vasilis) — definitive extract-extraction comparison.
6. `https://www.firecrawl.dev/blog/best-ai-search-engines-agents` (2026-03-24) — Best AI Search Engines for Agents (Hiba Fathima).
7. `https://gardenresearch.eu/agentic_web_search_2026` — Neural Search for AI Agents (Exa, Tavily, Parallel, Firecrawl).
8. `https://webcite.co/blog/citation-api-comparison-guide/` (2026-03-01) — Fact-Checking & Citation APIs Compared.

Official documentation:
9. `https://docs.tavily.com/documentation/api-reference/search` — Tavily Search API.
10. `https://docs.tavily.com/documentation/api-reference/extract` — Tavily Extract API.
11. `https://docs.tavily.com/documentation/api-reference/crawl` — Tavily Crawl API.
12. `https://docs.exa.ai/reference/getting-started` — Exa quickstart.
13. `https://docs.exa.ai/reference/find-similar-links` — Exa /findSimilar.
14. `https://docs.exa.ai/reference/answer` — Exa /answer.
15. `https://docs.firecrawl.dev/` — Firecrawl docs root.
16. `https://docs.firecrawl.dev/api-reference/endpoint/extract` — Firecrawl LLM-schema extract.
17. `https://www.firecrawl.dev/pricing` — Firecrawl pricing tiers.
18. `https://jina.ai/reader/` — Jina Reader product page.
19. `https://r.jina.ai/` — Jina Reader endpoint (no-auth).
20. `https://jina.ai/search/` — Jina Search (s.jina.ai).
21. `https://jina.ai/embeddings/` — Jina Embeddings.
22. `https://jina.ai/reranker/` — Jina Reranker.
23. `https://docs.perplexity.ai/` — Perplexity Sonar API.
24. `https://docs.perplexity.ai/guides/sonar-deep-research` — Sonar Deep Research.
25. `https://api.search.brave.com/app/dashboard` — Brave Search API.
26. `https://serper.dev/` — Serper Google SERP API.
27. `https://www.kagi.com/api` — Kagi API.
28. `https://www.linkup.so/docs` — Linkup API.

MCP server repos:
29. `https://github.com/tavily-ai/tavily-mcp` — Tavily official MCP.
30. `https://github.com/exa-labs/exa-mcp-server` — Exa official MCP.
31. `https://github.com/mendableai/firecrawl-mcp-server` — Firecrawl official MCP.
32. `https://github.com/ppl-ai/modelcontextprotocol` — Perplexity official MCP.
33. `https://github.com/PsychArch/jina-mcp-tools` — Jina community MCP.
34. `https://github.com/ChromeDevTools/chrome-devtools-mcp` — ChromeDevTools MCP.
35. `https://github.com/microsoft/playwright-mcp` — Playwright official MCP.
36. `https://github.com/yamadashy/repomix` — repomix.
37. `https://deepwiki.com/` — DeepWiki.

OSS extract libraries:
38. `https://github.com/unclecode/crawl4ai` — Crawl4AI Python.
39. `https://github.com/adbar/trafilatura` — Trafilatura.
40. `https://github.com/mozilla/readability` — Readability.js.
41. `https://github.com/searxng/searxng` — SearXNG.

Anthropic / Claude Code:
42. `https://docs.anthropic.com/en/docs/build-with-claude/tool-use/web-fetch-tool` — WebFetch built-in.
43. `https://docs.anthropic.com/en/docs/claude-code/mcp` — Claude Code MCP integration.

---

## Appendix A — sca-v7.2 D-EMP empirical-viability gate (W320 carry-forward)

Per W317-Stream-A `W317-A-SCA-V8-D-EMP-DRAFT.md`, each ADD candidate must pass an empirical-viability check before T1 INSTALL:

| Candidate | D-EMP probe | Pass? | Verdict |
|---|---|---|---|
| firecrawl-mcp@1.16.4 | `npx -y firecrawl-mcp@1.16.4 --version` + smoke `scrape({url:"https://example.com"})` returning ≥200char markdown | PENDING (W320 operator) | T2-PILOT pending probe; T1 on PASS |
| jina-mcp-tools | community MCP, low maintenance score | likely PASS but inferior to WebFetch wrapper of `r.jina.ai` | T3 PATTERN-ONLY |
| brave-search community MCP | varies | not needed (Tavily covers) | SKIP |
| serper community MCP | varies | not needed | SKIP |

## Appendix B — Anti-bias compliance

This audit explicitly avoided stars-as-hardgate. Verdicts:
- Firecrawl (high stars ~20K): T2-PILOT → T1 conditional. Not auto-T1.
- Tavily-mcp (low stars relative to install volume): KEEP — verdict based on integration utility + research-mode aggregator.
- Exa-mcp (medium stars): KEEP — verdict based on neural+similarity uniqueness.
- Perplexity (~2.2K stars + maintainer pedigree): KEEP — verdict based on ANSWER primitive irreplacability, NOT stars.
- Brave/Kagi/Serper/Linkup/You.com (all 5K+ stars): SKIP — dominated by Tavily+Exa portfolio, stars irrelevant.

**Anti-bias mandate satisfied**: high-star tools rejected (Brave, Linkup) and lower-star tools kept (Perplexity, Tavily) on capability merit.

---

*W320 Stream A — STREAM-A-MCP-PORTFOLIO-SHOOTOUT.md — COMPLETE.*
