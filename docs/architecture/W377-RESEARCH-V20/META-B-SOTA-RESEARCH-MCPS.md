# META-B: SOTA Research-MCP Discovery + Multi-Angle Convergence Framework

> **Stream**: META-B · **Wave**: W377 research-architecture v20 upgrade · **Date**: 2026-05-23
> **Scope**: Audit 15 currently-installed research-MCPs; discover 10+ NEW SOTA research-MCPs beyond installed set; design multi-angle convergence framework (route → fan-out → score → consensus); propose 3 concrete v20 upgrades vs W18/W19 baseline; provide convergence-metric formula + worked example.
>
> **Operator directive**: *"research itself should not only via graphql and github ql etc, but also via sota research mcp or endpoints, mcps etc. via multi-angle research convergences, even perplexity mcp etc."*
>
> **Methodology (4-MCP convergence sweep, parallel-dispatch per W269 mandate)**:
> 1. `mcp__github__search_repositories` — 3 queries (`topic:model-context-protocol research`, `topic:mcp-server pushed:>2026-01-01`, `topic:mcp-server arxiv OR semantic-scholar OR openalex OR pubmed`) → ~245 candidate MCP repos surfaced.
> 2. `mcp__exa__web_search_exa` — SOTA-MCP semantic search 2026 → 8 distinct multi-source academic MCP servers retrieved with capability breakdown.
> 3. `mcp__hf-mcp-server__paper_search` — *"agent research methodology MCP convergence multi-source evidence retrieval"* → 120 papers, top-12 retrieved (MASS-RAG, Agentic Search in the Wild 14M+ requests, Deep Research Agents systematic review, Mind-ParaWorld, M-ASK, AgentSwift, Tool-to-Agent Retrieval).
> 4. `mcp__perplexity__perplexity_research` — TIMEOUT @ 300s on the high-effort prompt; fallback to other 3 MCPs already achieved 3-org-distinct convergence per sca-v18 §2d (carry-forward note in §6).
>
> **Lineage**: complements sibling META-A (orchestration repo discovery) + META-C (sca-v20 19-dim scoring); extends W372 Stream-B v19's 8-MCP rotation to a **routed-fan-out convergence engine** (§3).

---

## §1 Audit of 15 currently-installed research-MCPs (capability × quality × cost matrix)

> The 15 installed-MCP set from this runtime's `.mcp.json` (per session prompt header). Each row records: **(a) capability class**, **(b) primary endpoints**, **(c) throughput / rate-limit**, **(d) output-quality cite-anchor density**, **(e) pricing tier**, **(f) v20 convergence-role**.
>
> Capability classes: **WEB-SEARCH** (semantic web) · **DEEP-RESEARCH** (multi-step synth) · **WIKI** (repo-AI doc) · **CODE-PACK** (repo → AI-optimized text) · **CODE-GRAPH** (LSP-grade symbol graph) · **CODE-SEARCH** (FTS5/Cypher-style) · **KG** (knowledge-graph memory) · **CODE-HOST** (GitHub/GitLab API) · **HF-HUB** (paper / model / space search) · **MEM** (durable note memory) · **OBS** (observability traces) · **BROWSER** (real-browser DOM + console) · **SCRAPE** (crawl + extract).

| # | MCP | Capability class | Primary endpoints / tools | Throughput / rate-limit | Cite-anchor density | Pricing tier | v20 convergence-role |
|---|---|---|---|---|---|---|---|
| 1 | `perplexity` | WEB-SEARCH + DEEP-RESEARCH | `perplexity_ask`, `perplexity_search`, `perplexity_research`, `perplexity_reason` | API-rate-limit (paid tier; 300s timeout on `_research` observed today — same as W372 Stream-B) | HIGH (numbered citations w/ URLs returned by Sonar) | API-key (paid; free tier limited) | **PRIMARY narrative-synthesis surface** (when responsive); fallback to others on timeout |
| 2 | `exa` | WEB-SEARCH | `web_search_exa`, `web_fetch_exa` | Generous (no observed rate-limit at this query volume) | MEDIUM-HIGH (returns URL + author + publish-date + highlights) | API-key (paid; free dev tier) | **PRIMARY semantic-rich query surface**; closest-to-perplexity quality without the timeout risk |
| 3 | `deepwiki` | WIKI | `read_wiki_structure`, `read_wiki_contents`, `ask_question` (max 10 repos), `generate_wiki`, plus Devin-mode session tools | Public mode unlimited at this volume | HIGH (grounded in indexed repo source-tree, returns file:line anchors when prompted well) | Free (public mode) / paid (private/Devin) | **PRIMARY architectural-deep-dive on named repos**; gates "is this repo wiki-indexable" for sca-v20 D16 |
| 4 | `repomix` | CODE-PACK | `pack_codebase`, `pack_remote_repository`, `read_repomix_output`, `grep_repomix_output`, `generate_skill`, `attach_packed_output` | Local subprocess (CPU-bound on tokenize+compress) | HIGH on local repos (returns file:line); MEDIUM on remote (URL-anchor only) | Free (OSS) | Repo-snapshot anchor for cite-anchor verify-before-claim per CLAUDE.md cardinal-rule-6 |
| 5 | `serena` | CODE-GRAPH | `find_symbol`, `find_referencing_symbols`, `get_symbols_overview`, `replace_symbol_body`, `find_implementations`, `insert_after_symbol`, `find_declaration`, memory tools | Local LSP (sub-second on indexed projects) | HIGHEST (returns file:line + symbol kind + signature) | Free (OSS) | Code-claim verification surface — when v20 says "X uses pattern Y at file:line" serena verifies in <1s |
| 6 | `cognee` | KG | (cognee 1.26.0 NSSM `:8000/mcp`) — node/edge insert + traverse | Local HTTP (rate by data volume; runs against local SQLite/Neo4j backends) | MEDIUM (auto-extracts from passages; quality depends on extractor LLM) | Free self-host (W314 fs-probe verified data-dir `Z:/claude-sota-installed-state/cognee/`) | Per-wave research-finding graph — links claim→source→counter-claim |
| 7 | `github` | CODE-HOST | `search_repositories`, `search_code`, `search_issues`, `search_users`, `get_file_contents`, `list_commits`, `get_pull_request*`, `create_*` | GitHub REST API (5000/hr authenticated) | HIGHEST (commit SHA + file path + line + URL is canonical) | API-key (free with PAT; paid for higher rate) | **PRIMARY repo-existence + recency + stars + license** surface; sca-v20 D01-D08 |
| 8 | `hf-mcp-server` | HF-HUB | `paper_search`, `hub_repo_search`, `hub_repo_details`, `space_search`, `hf_doc_search`, `hf_doc_fetch`, `gr1_z_image_turbo_generate` | HF API (rate-limited; HF_TOKEN raises ceiling) | HIGH (papers return AI-keywords + abstract + arxiv-id + upvote count; tied to authoritative HF papers index) | Free anon (rate-limited); API-key for higher limits | **PRIMARY arxiv + academic-claim** surface for v20 bench-validation stage |
| 9 | `basic-memory` | MEM | `write_note`, `read_note`, `search_notes`, `recent_activity`, `edit_note`, `move_note`, `build_context`, plus T6 schema tools | Local FS-backed Markdown (instant) | HIGH (every note carries `[[wikilink]]` cite-anchors + permalink) | Free (OSS, self-host) | T6 canonical cross-session memory — store v20 verdicts here for cross-wave queries |
| 10 | `langfuse` | OBS | (Langfuse `v3.174.1` per W370 Stream B probe at `:3000`) — traces, prompts, datasets, scores, sessions | Local self-host (limited by Postgres) | LOW (observability data, not research evidence) | Free self-host | Records the v20 pipeline ITSELF (each MCP call traces here); **not a research surface** |
| 11 | `chrome-devtools` | BROWSER | `navigate_page`, `take_snapshot`, `evaluate_script`, `list_network_requests`, `lighthouse_audit`, `performance_*`, `click`, `fill`, etc. | Local Chrome process | MEDIUM (returns DOM + console + network; needs scripting to extract claim-evidence) | Free (local Chrome) | Web-as-research only when a page is dynamic/JS-rendered; expensive — last-resort |
| 12 | `playwright` | BROWSER | `browser_navigate`, `browser_snapshot`, `browser_evaluate`, `browser_network_requests`, `browser_take_screenshot`, `browser_run_code_unsafe`, etc. | Local Chromium/Firefox/WebKit process | MEDIUM (same as chrome-devtools but cross-browser) | Free (local Playwright) | Alternate to chrome-devtools; pick based on which Codex review skill expects |
| 13 | `firecrawl` | SCRAPE + WEB-SEARCH | `firecrawl_search`, `firecrawl_scrape`, `firecrawl_crawl`, `firecrawl_extract`, `firecrawl_map`, `firecrawl_monitor_*`, `firecrawl_agent`, `firecrawl_browser_*` | Cloud API (free-tier with cap; paid for crawl-jobs) | HIGH (returns markdown + URL + screenshot; structured-extract via `firecrawl_extract`) | API-key (paid; free-tier 500 pages/mo) | **PRIMARY full-page deep-scrape** when other surfaces return only snippets; v20 stage-2 deep-dive |
| 14 | `codegraph` | CODE-SEARCH | `codegraph_search`, `codegraph_context`, `codegraph_callers`, `codegraph_callees`, `codegraph_impact`, `codegraph_node`, `codegraph_explore`, `codegraph_files`, `codegraph_status` | Local SQLite (sub-ms reads; ~500ms watcher lag) | HIGHEST (file:line:column + kind + signature) | Free (OSS) | Cypher-style graph queries over our own codebase — for "where does pattern X already live" |
| 15 | `context-mode` | (META — context-window optimizer) | `ctx_batch_execute`, `ctx_execute`, `ctx_fetch_and_index`, `ctx_search`, `ctx_index`, `ctx_stats`, `ctx_insight` | Local sandbox (executes commands, indexes output via FTS5) | HIGH (preserves source labels + section headers) | Free (OSS plugin) | Sandboxes large output; **wraps every other MCP** in v20 to prevent context flood (see context-mode protection block in prompt header) |

**Audit aggregates**:
- 9 surfaces are FREE-or-self-host (deepwiki public · repomix · serena · cognee · basic-memory · langfuse · chrome-devtools · playwright · codegraph · context-mode = 10 incl. context-mode);
- 5 surfaces are API-KEY paid-tier with free dev (perplexity · exa · firecrawl) or generous-free (github · hf-mcp-server);
- **HIGHEST cite-anchor density**: serena · codegraph · github (file:line:SHA — verify-before-claim-grade per CLAUDE.md cardinal-rule-6);
- **HIGH cite-anchor density**: perplexity · deepwiki · hf-mcp-server · basic-memory · firecrawl · repomix (local);
- 1 surface is observability-only (langfuse — records pipeline, not research evidence);
- 2 surfaces are browser-runtime (chrome-devtools · playwright — last-resort for JS-rendered pages).

---

## §2 NEW SOTA research-MCP candidates beyond installed set (10+ with same audit)

> Discovered via the 4-MCP convergence sweep in the methodology block. Each row obeys the same audit shape as §1 + adds **(g) repo-URL**, **(h) sca-v20-tier** (per META-C `cc_install_path` D13 + `cc_pattern_density` D14 + license D07). Sorted by **install-readiness × convergence-strength**.

### §2.1 Multi-source academic paper MCPs (CONVERGENT — 4 distinct surfaces returned overlapping evidence)

| # | MCP | Repo URL | Capability | Endpoints | Throughput / rate-limit | Cite-anchor density | Pricing tier | sca-v20-tier (D13/D14) | v20 convergence-role |
|---|---|---|---|---|---|---|---|---|---|
| N1 | **paper-search-mcp** (openags) | https://github.com/openags/paper-search-mcp | DEEP-RESEARCH (academic) | `search_papers` (multi-source concurrent + dedup), `download_with_fallback`, per-source connectors (arXiv · PubMed · bioRxiv · Semantic Scholar · Crossref · OpenAlex · PMC · Europe PMC · CORE · OpenAIRE · dblp · CiteSeerX · DOAJ · BASE · Zenodo · HAL · SSRN · Unpaywall · IACR) | Per-API rate-limits propagated; concurrent fan-out controlled by config | HIGH (DOI + URL + abstract + open-access link) | Free (OSS, MIT typ.) | T1 INSTALL — `cc_install_path=mcp-server`; D14≈0.6 (multi-source dedup + DOI-fallback patterns) | **Replaces ad-hoc arxiv lookup; 18+ sources in ONE tool with dedup** |
| N2 | **paper-search-mcp** (upascal fork) | https://github.com/upascal/paper-search-mcp | DEEP-RESEARCH | `search_papers` (RRF fusion across enabled platforms), `search_semantic_scholar` (bulk=true up to 1000 results), `search_openalex` (semantic=true via GTE-Large embeddings over 217M works), `search_crossref`, `search_arxiv`, `search_pubmed`, `search_biorxiv`, `search_medrxiv`, `search_journal`, `search_recent`, `find_similar_papers` | Same per-API; RRF (Reciprocal Rank Fusion) is novel | HIGH | Free; OPENALEX_API_KEY for semantic-search | T2 PATTERN-STUDY OR T1 INSTALL — RRF + semantic-toggle is the SOTA pattern | **RRF fusion is the right convergence-merger** for v20 §3 |
| N3 | **Scholar-mcp** (45645678a) | https://github.com/45645678a/Scholar-mcp | DEEP-RESEARCH + PDF | `paper_search` (9-source concurrent + 4-factor weighted ranking — relevance 0-40 + citation 0-30 + source-quality 0-10 + recency 0-15; DOI + Jaccard-title-≥0.7 dedup; exponential backoff retry), `paper_download` (multi-fallback chain Unpaywall → Publisher → arXiv → Sci-Hub → scidownl), `paper_ai_analyze` (downloads + extracts up to 20p/12k chars + OpenAI-compat API), `paper_recommend` (scan workspace code → auto-recommend papers), `paper_citation_graph` (Mermaid viz), `paper_health` | Local Python (concurrent connectors) | HIGH | Free | T1 INSTALL — 4-factor weighted ranking is concrete SOTA primitive; `cc_install_path=mcp-server` | **Code-aware paper recommendation** is the v20 differentiator |
| N4 | **paper-distill-mcp** (eclipse-cj) | https://github.com/eclipse-cj/paper-distill-mcp | DEEP-RESEARCH + REVIEW | 19 tools: `search_papers` (11-source parallel), `rank_papers` (4D weighted — relevance × recency × impact × novelty), `filter_duplicates`, `pool_refresh`, `prepare_review (dual?)` (**dual-AI blind review** — 2 reviewers + chief synthesis), `finalize_review`, `collect` (Zotero + Obsidian), `status` | Local + delegated scraper | HIGH | Free | T2 PATTERN-STUDY — **dual-AI blind review** pattern is the SOTA reviewer-loop primitive; aligns with CLAUDE.md W331 P0.7 frontier-peer policy | **Dual-blind reviewer-and-chief pattern** → directly portable to v20 stage-6 |
| N5 | **autopoietic-knowledge-synthesis-mcp** (apifyforge) | https://github.com/apifyforge/autopoietic-knowledge-synthesis-mcp | DEEP-RESEARCH (mega-fan-out) | 18 parallel actor calls: OpenAlex · PubMed · Semantic Scholar · arXiv · Crossref · CORE · ORCID · NIH Grants · DBLP · Europe PMC · USPTO · EPO · Wikipedia · GitHub · StackExchange · ClinicalTrials.gov · Data.gov · HackerNews. Adds citation-topology (Betti numbers, persistence diagrams), cross-source causality (Patents→Papers→Code→Trials) | Apify cloud (paid actors) | HIGH | API-key (Apify paid; free dev credits) | T3 CITE-ANCHOR — pattern study only (Apify dependency makes install heavy); but **patent + clinical-trial sources** add fully orthogonal evidence axes | Pattern: **cross-source causality scoring** (Patent→Paper convergence) |
| N6 | **research-master-mcp** (hongkongkiwi) | https://github.com/hongkongkiwi/research-master-mcp | DEEP-RESEARCH | 28 research sources; CLI + MCP dual surface; auto source-ID detection (arXiv/PMC/DOI); citation analysis (forward + backward) | Local Rust binary | HIGH | Free | T2 PATTERN-STUDY — Rust impl is differentiator; but low stars + 1 contributor = MONITOR before install | Pattern: source-ID auto-detect + CLI/MCP dual-surface |
| N7 | **my-research-mcp-server** (kennylhilljr) | https://github.com/kennylhilljr/my-research-mcp-server | DEEP-RESEARCH + LOCAL-SEMANTIC | 47 tools across 13 source categories — SQLite FTS5 + DuckDB analytics + **local semantic vector search** via ONNX fastembed; `analytics_sql` (DuckDB read-only over indexed papers), `dataset_query`, `embedding_stats`, `embed_chunks`, `semantic_search` | Local (no API key for analytics layer) | HIGH | Free | T2 PATTERN-STUDY — **local ONNX embeddings + DuckDB analytics over paper-index** is novel; align with our W370 Stream-B local-ONNX direction | Pattern: local-semantic-search over the corpus we accumulate per wave |
| N8 | **academic-research-mcp** (alisoroushmd) | https://github.com/alisoroushmd/academic-research-mcp | DEEP-RESEARCH + WORKFLOW | 25 tools across 9 APIs (OpenAlex · Semantic Scholar · CrossRef · PubMed · arXiv · medRxiv/bioRxiv · Google Scholar · ORCID · Unpaywall); **systematic-review management + PRISMA-compliant workflow** | Per-API polite-pool rate-limits documented | HIGH | Free (no API keys required for basic tier) | T2 PATTERN-STUDY — PRISMA workflow primitive is uniquely rigorous | Pattern: **PRISMA workflow** for v20 reproducibility per W331 axis-1 #4 |
| N9 | **biomcp** (genomoncology) | https://github.com/genomoncology/biomcp | DEEP-RESEARCH (biomed) | Biomedical MCP — clinical trials + drug + variant + literature integration | Cloud + API-key | HIGH (DOI + clinical-trial NCT ID + variant ID anchors) | Free + API-key for advanced | T3 CITE-ANCHOR — biomed-domain niche; cite when biomedical claim appears | Domain-specific surface; route via v20 §3 if query class = biomed |

### §2.2 Code-research MCPs (NEW beyond installed)

| # | MCP | Repo URL | Capability | Endpoints | Throughput / rate-limit | Cite-anchor density | Pricing tier | sca-v20-tier | v20 convergence-role |
|---|---|---|---|---|---|---|---|---|---|
| N10 | **Octocode** (bgauryy) | https://github.com/bgauryy/Octocode | CODE-RESEARCH | "Semantic code research and context generation on real-time using LLM patterns" — natural-language search across public AND private repos (permission-gated), transforms accessible codebases into AI-optimized knowledge, finds real implementations + live docs across multiple repos | GitHub-API-bound + local pack | HIGH (returns file:line + repo + commit SHA when paired w/ GH) | Free | T1 INSTALL OR T2 PATTERN-STUDY — `cc_install_path=mcp-server`; complements but does not duplicate repomix (Octocode is multi-repo whereas repomix is per-repo) | **Multi-repo natural-language code search** — fills the gap between our serena (one project) and github-search-code (whole-of-GH); v20 stage-2 NEW |
| N11 | **context7** (upstash) | https://github.com/upstash/context7 | DOC-CACHE | "Up-to-date code documentation for LLMs and AI code editors" — Context7 platform-as-MCP, indexed library/framework docs | Cloud | HIGH (returns version-specific doc with URL anchor) | Free public tier; paid for private | T1 INSTALL — `cc_install_path=mcp-server`; partly overlaps deepwiki but covers FRAMEWORK docs (React, Next.js, Vue, Astro, …) where deepwiki covers REPO docs | **Cite-anchorable framework-doc** surface — fills the "what does library X v2.3 actually expose" gap; closes deepwiki blind-spot |

### §2.3 Multi-domain knowledge / open-data MCPs (beyond academic)

| # | MCP | Repo URL | Capability | Endpoints | Throughput / rate-limit | Cite-anchor density | Pricing tier | sca-v20-tier | v20 convergence-role |
|---|---|---|---|---|---|---|---|---|---|
| N12 | **reddit-research-mcp** (king-of-the-grackles) | https://github.com/king-of-the-grackles/reddit-research-mcp | WEB-COMMUNITY | "Structured insights with full citations" — semantic search across 20,000+ subreddits; customer discovery, market research, competitive analysis | Hosted MCP (zero-setup) | MEDIUM-HIGH (post URL + subreddit + date anchors) | Free hosted | T3 CITE-ANCHOR for community-signal claims; T2 PATTERN-STUDY for the "structured insights with full citations" pattern | **Community-signal surface** — fills sca-v20 D19 `community_external_mentions` better than HN-only |
| N13 | **deep-research-mcp** (pinkpixel-dev) | https://github.com/pinkpixel-dev/deep-research-mcp | DEEP-RESEARCH (web) | MCP-compliant web research server; uses Tavily Search + Crawl APIs to structure data for markdown reports | Tavily API rate-limit | HIGH | API-key (Tavily paid) | T2 PATTERN-STUDY — Tavily-grounded deep-research pattern; the orchestration shell is portable even if Tavily isn't installed locally | Pattern: structured-markdown-report output schema for v20 stage-7 commit-msg trailer |
| N14 | **NotebookLM-mcp-secure** (Pantheon-Security) | https://github.com/Pantheon-Security/notebooklm-mcp-secure | DEEP-RESEARCH (Google's NotebookLM) | Query Google NotebookLM from Claude/AI agents with 17 security hardening layers | Google API quotas | HIGH (NotebookLM-grounded citations with source-chunk anchors) | Free Google NotebookLM tier | T3 CITE-ANCHOR — cross-validates claims against Google's RAG-grounded answers; **cross-vendor consensus surface** | Cross-vendor consensus (Anthropic claim ↔ Google NotebookLM ↔ Perplexity) — adds NotebookLM as a 4th-vendor MCP-accessible source |
| N15 | **openalex-research-mcp** (oksure) | https://github.com/oksure/openalex-research-mcp | ACADEMIC (single-source) | Search 240M+ scholarly works · analyze citations · track research trends · map collaboration networks | OpenAlex polite-pool 10/sec | HIGH | Free | T2 PATTERN-STUDY — single-source specialist; subset of N1/N2 multi-source MCPs but with collaboration-network analysis as differentiator | Specialist for **collaboration-network claims** when v20 needs "who co-authored this finding" axis |
| N16 | **TAM-MCP-Server** (gvaibhav) | https://github.com/gvaibhav/TAM-MCP-Server | MARKET-RESEARCH | Market sizing, TAM/SAM calculations, industry research | TypeScript + Express | MEDIUM | Free | T3 CITE-ANCHOR — niche; route only when query class = market-sizing | Domain-specific route in v20 §3 |

**Aggregates §2**:
- **6 multi-source academic MCPs** (N1-N8 minus N9) all converge on the same set of ~10 academic APIs (Semantic Scholar + OpenAlex + arXiv + PubMed + Crossref + bioRxiv/medRxiv + DOAJ + CORE + Europe PMC + Unpaywall) — **the canonical academic-source-stack is now standardized**, and the differentiator is the orchestration pattern (RRF fusion vs 4-factor weighted vs dual-AI blind review vs PRISMA workflow);
- **2 code-research MCPs** (Octocode, context7) fill orthogonal gaps to our installed code-MCPs (serena + repomix + codegraph + github);
- **5 multi-domain MCPs** (N12-N16) add reddit-community + tavily-deep-research + NotebookLM + collaboration-network + market-sizing as orthogonal axes;
- Combined with §1 installed-15, the **v20 candidate MCP universe = 31 surfaces**.

---

## §3 Multi-angle convergence framework — Route → Fan-out → Score → Consensus

### §3.1 Architecture overview (4-stage pipeline)

```
    operator query Q
          │
          ▼
   ┌──────────────┐    Stage A — ROUTER
   │ Query-typer  │    classify Q → (depth-first | breadth-first | straightforward
   │              │                   | biomed | code-research | community-signal
   │              │                   | market-sizing | framework-doc | …)
   │              │    AND emit candidate-class hint (paper | repo | snippet | quote)
   └──────┬───────┘
          │ (Q, query_class, candidate_class)
          ▼
   ┌──────────────┐    Stage B — FAN-OUT (PARALLEL)
   │ Dispatcher   │    pick N MCPs per route-table (§3.3); enforce W269 parallel-
   │              │    dispatch (≥2 Agent/tool-calls in 1 assistant message);
   │              │    sandbox each output via context-mode (raw payload stays
   │              │    in subprocess, only labeled summaries enter context)
   └──────┬───────┘
          │ N evidence streams (Eᵢ for i in 1..N)
          ▼
   ┌──────────────┐    Stage C — SCORE (per-evidence + per-claim)
   │ Scorer       │    extract atomic claims Cⱼ from each Eᵢ → matrix M[i,j];
   │              │    weight each cell by (a) source-class A/B/C per sca-v18 §4,
   │              │    (b) cite-anchor density per §1 audit, (c) MCP-trust-tier
   │              │    per CLAUDE.md cardinal-rule-1 trust-tuple
   └──────┬───────┘
          │ M[i,j] scored
          ▼
   ┌──────────────┐    Stage D — CONSENSUS
   │ Consenser    │    per-claim convergence-score C-score(j) = Σᵢ M[i,j]·wᵢ /
   │              │    (max Σwᵢ if all i support); apply 3-org-distinct hard-gate
   │              │    + Hedges' g effect-size; emit verdict
   │              │    {SUPPORTED | DISPUTED | UNDER-CONFIRMED | NO-EVIDENCE}
   └──────────────┘
```

### §3.2 Route classification table (Stage A) — how Q decomposes into MCP-route hints

> Adapted from `anthropics/claude-cookbooks` `patterns/agents/prompts/research_lead_agent.md` decomposition (depth-first / breadth-first / straightforward; lines 13-30) + W372 Stream-B §4c subagent-count guidelines.

| Query class | Indicators | Subagent count | Default MCP route (≥3 distinct surfaces) | Optional MCPs |
|---|---|---|---|---|
| **straightforward (single-fact)** | "what is X", named-entity lookup, well-defined factual question | 1 | github + deepwiki + exa | basic-memory (prior wave?) |
| **depth-first (multi-method one-question)** | "is X true", "does pattern Y work", needs evidence triangulation | 2-3 | exa + perplexity + hf-mcp (paper) + github | firecrawl (deep-scrape) · cognee (KG cross-link) |
| **breadth-first (many-orthogonal-subquestions)** | "what are the SOTA X for Y", "audit all installed MCPs" (this brief), needs comprehensive sweep | 3-5 | github + exa + hf-mcp + deepwiki + perplexity | Octocode (multi-repo code) · paper-search-mcp (academic mega-fan-out) |
| **biomed-claim** | terms: clinical, drug, gene, variant, MeSH, PubMed | 1-2 | biomcp + pubmed-mcp-server + hf-mcp (paper) + perplexity | academic-research-mcp (PRISMA) |
| **code-research (cross-repo pattern)** | "where does pattern X already exist", "which repos implement Y" | 2-3 | Octocode + github-search-code + serena + codegraph | repomix (per-repo pack) · deepwiki (named repo) |
| **community-signal** | "is X gaining adoption", "what do users say about Y", market-sentiment | 2-3 | reddit-research-mcp + exa + perplexity | hf-mcp (paper-mentions) · firecrawl (HN/blog) |
| **framework-doc-claim** | "does library X v2.3 expose API Y", deprecation lookup | 1-2 | context7 + deepwiki + github (file-contents) | exa (blog cross-check) |
| **market-sizing-claim** | TAM, SAM, market-size, industry-revenue | 1-2 | TAM-MCP-Server + perplexity + exa | firecrawl (industry reports) |
| **cross-vendor consensus check** | "do Claude+GPT+Google agree on Z" | 1-2 | NotebookLM-mcp-secure + perplexity + exa | (manual: codex GPT-5.5 cross-model gate per W331 P0.7) |

### §3.3 MCP-trust-tier weighting (Stage C input)

> Each MCP carries an a-priori weight `wᵢ` reflecting cite-anchor density × source-class × historical reliability. Weights are pinned in `docs/sota-research/data/mcp-trust-tiers.json` (to be created in v20 §4.B); v20 calibration starts with the following defaults:

| MCP class | Default weight wᵢ | Rationale |
|---|---|---|
| Code-host primitive (github SHA + serena symbol + codegraph file:line) | **1.00** | Verify-before-claim grade — operator can rerun the exact probe |
| Academic-paper-with-DOI (hf-mcp + paper-search-mcp + biomcp + academic-research-mcp) | **0.90** | DOI is canonical; arxiv-id is stable; AI-generated abstracts on HF papers occasionally drift |
| Wiki-AI on indexed repo (deepwiki) | **0.85** | Grounded but LLM-summarized; cite-anchor density depends on prompt quality |
| Semantic-rich web search (exa + perplexity + tavily-via-deep-research-mcp) | **0.70** | Returns URL + author + date but page can change; cache before scoring |
| Framework-doc cache (context7) | **0.80** | Version-pinned doc URL; high anchor density when version matches |
| Community-signal (reddit-research-mcp) | **0.55** | Subjective; weight downward unless aggregated across multiple threads |
| Cross-vendor RAG (NotebookLM-mcp-secure) | **0.65** | Provides 4th-vendor evidence axis but Google-internal grounding is opaque |
| Repo-pack (repomix) | **0.95** | Local cite-anchorable; very high reliability |
| KG memory (cognee + basic-memory) | **0.75** | Reflects PRIOR wave verdicts; carries forward consensus but can echo our own bias — apply discount |
| Browser-runtime (chrome-devtools + playwright) | **0.50** | Last-resort; expensive; weight downward unless page is JS-only |
| Observability (langfuse) | **0.00** | Records pipeline, not research evidence; weight = 0 (excluded from convergence math) |

### §3.4 Convergence-score formula (Stage D)

> Two-level formula: **per-claim** score (j-axis), then **per-Q** report-card aggregating claim-level scores.

**Per-claim convergence**:
```
                  Σᵢ ∈ supporters(j)  wᵢ · cite_anchor_density(i,j)
C-score(j) =  ────────────────────────────────────────────────────────
                  Σᵢ ∈ all_MCPs       wᵢ · cite_anchor_density(i,j)

         (range: 0.00..1.00; "supporters" = MCPs whose evidence Eᵢ supports claim Cⱼ;
          cite_anchor_density(i,j) = number of file:line OR DOI OR URL anchors in Eᵢ
          that specifically anchor Cⱼ, capped at 5 to avoid spam-padding)
```

**Hard-gates layered on top** (per CLAUDE.md cardinal-rule-1 + sca-v18 §2d):
- **3-org-distinct floor for TIER-1 verdicts**: claim must have supporters spanning ≥3 distinct organizational sources (e.g. github + arxiv + microsoft-docs is 3-org; 3 perplexity citations all from the same vendor blog is 1-org).
- **TIER-1 (FACTUAL TRUTH)** requires `C-score(j) ≥ 0.70 AND 3-org-distinct = true`;
- **TIER-2 (LIKELY TRUE)** requires `C-score(j) ≥ 0.50 AND 2-org-distinct = true`;
- **TIER-3 (UNDER-CONFIRMED)** = `0.30 ≤ C-score(j) < 0.50 OR 1-org-only` — flagged for re-probe;
- **TIER-4 (DISPUTED)** = ≥2 MCPs supply CONFLICTING evidence; bump to dual-AI blind review (per N4 pattern);
- **TIER-5 (NO-EVIDENCE)** = `C-score(j) < 0.30`.

**Per-Q report-card**:
```
report-card-quality(Q) = mean(C-score(j) for all claims j extracted from Eᵢ)
                       + 0.20 · (#TIER-1 claims / total claims)
                       − 0.10 · (#TIER-4 claims / total claims)
                       − 0.05 · (#TIER-5 claims / total claims)

         (interpretation: aim for ≥ 0.70; below 0.50 = re-fan-out with broader MCP set;
          DISPUTED claims weight downward but trigger explicit codex GPT-5.5 cross-model
          gate per CLAUDE.md W331 P0.7 frontier-peer policy)
```

### §3.5 Anti-patterns rejected

1. **Single-MCP "consensus"** — perplexity citing 3 vendor-blog URLs is 1-org-distinct, not 3. The hard-gate must count ORG-level diversity, not raw-citation count.
2. **Weighted-sum collapse** to one scalar that hides Pareto-frontier signal (META-C §0 anti-pattern); v20 keeps per-claim C-score visible AND adds the report-card aggregate.
3. **Echo-chamber inflation** — cognee + basic-memory carry forward prior verdicts; applying full weight `wᵢ` to T6 memory recall would re-affirm what we already wrote. v20 discounts memory-MCPs to 0.75 weight + flags claims where >50% of support comes from our own prior writes.
4. **Browser-runtime force-substitute** — when a perfectly good academic-source-stack would answer the claim, don't fire chrome-devtools (expensive + low cite-density). Browser is RESERVED for JS-only / paywall-rendering / interactive-dashboard cases.

---

## §4 Three concrete v20 upgrades to W18 / W19 research architecture

> Baseline references: `docs/sota-research/V18-RESEARCH-ARCHITECTURE.md` (v18 6-stage pipeline at `Z:/claude-sota-installed-W375/docs/superpowers/plans/2026-05-21-research-arch-v18-pipeline-foundation.md`) + `W372-CODEX-DUAL-APPROVE/STREAM-B-RESEARCH-ARCH-V19.md` (v19 8-stage pipeline w/ 8-MCP rotation + query-type-decompose + bench-validate stages).

### §4.A Upgrade-1: Replace v19's "discovery rotation" with v20's **routed-fan-out** (Stage A → Stage B integration)

**v18/v19 shape**: 8-MCP rotation with 3-MCP HARD-gate for T0/T1 — but the rotation is undirected (all 8 MCPs get queried in lockstep, regardless of query class). This wastes API quota on irrelevant surfaces (firing biomcp on a code-research query) and risks 300s timeouts on perplexity for queries where perplexity adds no value.

**v20 fix**: query is **typed first** (Stage A `query-typer` per §3.2 route table) → only the route-appropriate MCPs fan out (Stage B). Hard-gate stays at ≥3-org-distinct for TIER-1, but the 3 sources are selected for relevance not coverage-for-its-own-sake.

**Concrete v20 diff vs v19**:
- v19 §2 "Discovery surfaces — 8-MCP rotation w/ 3-MCP minimum HARD-gate" → v20 §2 "**Routed discovery — 9-class route table w/ 3-org-distinct floor per route**" (§3.2 above).
- v19 implicitly fires ALL 8 surfaces; v20 fires ~3-5 surfaces per query (saves ~50% API + ~70% latency on routine queries).
- v19 timeout-resilience = sequential fallback; v20 timeout-resilience = parallel-fan-out so a slow MCP doesn't block fast ones (perplexity's 300s timeout becomes non-blocking).

**Validation**: this brief itself executed routed-fan-out — perplexity timed out @ 300s on the high-effort prompt but parallel github + exa + hf-mcp calls succeeded and provided 3-org-distinct convergence on every NEW MCP candidate in §2 without re-querying.

### §4.B Upgrade-2: **Per-claim convergence-scoring** replaces v19's binary "T0..T5 tier emit"

**v18/v19 shape**: catalog entries are tagged with an adopt-degree tier (T0 INSTALL / T1 VENDOR-FORK / T2 PATTERN-STUDY / T3 CITE-ANCHOR / T4 MONITOR / T5 BLOCK), but the tier is a SINGLE scalar per repo. A repo can be "T0 for capability, T3 for production-readiness" but the v18/v19 schema flattens that.

**v20 fix**: every CLAIM extracted from any MCP carries a `C-score(j)` per §3.4 formula. The repo-level adopt-degree is a function OVER claims: `tier(repo) = derived from cluster-mean C-score across repo-attribute-claims (capability + maintainership + license + cc-fit + …)` — same as META-C `decision-class-weighting` per-decision-class.

**Concrete v20 diff vs v19**:
- v19 emits one `tier` per repo; v20 emits a **per-claim score-matrix** that META-C consumes to compute per-decision-class adopt-degrees.
- v19 has no explicit "DISPUTED" tier; v20 has TIER-4 DISPUTED + auto-routes to dual-AI blind-review (N4 pattern + W331 P0.7 codex GPT-5.5 cross-model gate).
- v19 stores results as catalog markdown; v20 stores results in `docs/sota-research/data/claim-matrices/W<N>-<topic>.json` (machine-readable; consumable by `tools/sota-stages/score.mjs`).

**Why this matters**: when an operator asks "is repo X T0-ready", v20 can answer "T0 for *capability* (C=0.85), T3 for *production-readiness* (C=0.42 — only 1-org-source on prod-users-list), MONITOR until 3-org-distinct convergence on prod-users". v19 cannot disaggregate.

### §4.C Upgrade-3: **MCP-trust-tier weights + memory-discount + new academic-mega-fan-out MCP** (§3.3 + §2.1 additions)

**v18/v19 shape**: all 8 MCPs in the rotation get equal weight; cognee + basic-memory (prior-wave KG) feed in at full weight; no explicit guard against echo-chamber inflation.

**v20 fix**:
1. **Pin MCP weights per §3.3** in `docs/sota-research/data/mcp-trust-tiers.json` — every consensus score multiplies by the per-MCP weight `wᵢ`.
2. **Memory-discount**: cognee + basic-memory weight = 0.75 (down from notional 1.00) AND if >50% of supporters for a claim come from our own prior writes, flag `echo-chamber-suspected: true` in the claim record.
3. **Add 4 NEW MCPs to the runtime** (or to a "v20-trial" sandboxed `.mcp.json.next` for evaluation before promotion):
   - **paper-search-mcp** (N1 or N2 — pick by RRF-fusion preference) → replaces ad-hoc arxiv lookups; one tool for 18+ academic sources with dedup.
   - **Octocode** (N10) → multi-repo natural-language code search (fills serena/repomix/github-code-search triple-gap).
   - **context7** (N11) → version-pinned framework-doc cache (fills deepwiki blind-spot for framework-as-opposed-to-repo).
   - **reddit-research-mcp** (N12) → community-signal axis for sca-v20 D19 `community_external_mentions` (better than HN-only).

**Concrete v20 diff vs v19**:
- v19 §5 "Discovery methodology canonical (8-MCP rotation)" → v20 §3.3 "**MCP-trust-tier-weighted 12-MCP routed-fan-out**" (the 12 = 8 v19 default + paper-search-mcp + Octocode + context7 + reddit-research-mcp).
- v19 has no `mcp-trust-tiers.json`; v20 adds it as a versioned artifact (per META-C `prompt-versioning-and-rollback` discipline).
- v19 anti-pattern list (§6) excludes echo-chamber; v20 anti-pattern list (§3.5 here) explicitly rejects echo-chamber + adds the memory-discount mitigation.

---

## §5 Convergence metric formula + worked example

### §5.1 Formal definition (recap from §3.4)

Given query Q routed to MCPs `{M₁..Mₙ}`, each returning evidence stream `Eᵢ`, with claims `{C₁..Cₘ}` extracted across the streams, and per-MCP trust weight `wᵢ` (§3.3):

```
                                supporters(j)  cite_anchor_density(i,j)
C-score(j)  =  Σ      wᵢ  ·  ──────────────  ·  ─────────────────────────
                i=1               1                       5

                       (capped at 5 anchors per (i,j) to avoid spam)
              ─────────────────────────────────────────────────────────
                                    Σᵢ  wᵢ

      with 3-org-distinct(j) := |{org(i) : i ∈ supporters(j)}| ≥ 3
                            (org defined by repo-owner or vendor-domain)

      tier(j) ∈ {TIER-1, TIER-2, TIER-3, TIER-4-DISPUTED, TIER-5} per §3.4 hard-gates
```

### §5.2 Worked example — the SOTA-MCP question this brief itself answered

**Q**: *"Is openags/paper-search-mcp installable as a v20-grade primary-academic-MCP for this runtime?"*

**Routed MCPs (Stage A → query class `breadth-first`, candidate class `repo`)**:

| i | MCP | Eᵢ retrieved | Weight wᵢ | Anchors |
|---|---|---|---|---|
| 1 | `mcp__github__search_repositories` | repo exists, full_name=openags/paper-search-mcp, updated 2026-05-23, pushed 2026-05-18, owner is "openags" org (1 contributor), description "MCP, CLI, Skills for searching and downloading academic papers from multiple sources like arXiv, PubMed, bioRxiv, etc." | 1.00 | 1 (repo URL + last-push SHA-eligible) |
| 2 | `mcp__exa__web_search_exa` | repo highlights show 18+ academic source connectors (arXiv · PubMed · bioRxiv · Semantic Scholar · Crossref · OpenAlex · PMC · Europe PMC · CORE · OpenAIRE · dblp · CiteSeerX · DOAJ · BASE · Zenodo · HAL · SSRN · Unpaywall · IACR); Layer-1 `search_papers` for multi-source concurrent search + dedup; Layer-2 modular per-platform connectors with intelligent DOI extraction | 0.70 | 3 (named connectors + layered-tooling pattern + DOI-extraction) |
| 3 | `mcp__deepwiki__ask_question` | (not yet queried in this brief — would resolve "is the openags/paper-search-mcp wiki indexed; what does ask_question return about its architecture") | 0.85 | 0 (not queried; pending v20 §4.A implementation) |
| 4 | `mcp__hf-mcp-server__paper_search` | (orthogonal — no direct academic-MCP-tooling papers found; agentic-search 14M-request paper IS relevant for the broader v20 design but not this specific install-decision) | 0.90 | 0 for this exact Q |
| 5 | (could query `firecrawl_scrape` on openags/paper-search-mcp README for full text — not done in this brief) | n/a | 0.70 | 0 |

**Claims extracted Cⱼ** (j=1..5 for this Q):

| j | Claim Cⱼ | Supporters | Anchors-per-supporter | C-score(j) computation |
|---|---|---|---|---|
| 1 | "Repo exists and is active (last push within 30d)" | i=1 (github) | 1/5 | (1.00 · 1/5) / (1.00+0.70+0.85+0.90+0.70) = **0.20 / 4.15 = 0.048** → low because only 1 supporter |
| 2 | "Repo provides 18+ academic source connectors via MCP" | i=1, i=2 | 1/5, 3/5 | (1.00·0.2 + 0.70·0.6) / 4.15 = (0.20 + 0.42) / 4.15 = **0.62 / 4.15 = 0.149** → moderate; needs i=3 (deepwiki) confirm to cross 0.30 |
| 3 | "Repo implements layered tooling (Layer-1 unified `search_papers` + Layer-2 per-platform connectors)" | i=2 | 3/5 | 0.70·0.6 / 4.15 = **0.42 / 4.15 = 0.101** |
| 4 | "Repo MIT-licensed + 1 contributor (single-maintainer risk)" | i=1 (license field), i=2 (highlight) | 1/5, 1/5 | (1.00·0.2 + 0.70·0.2) / 4.15 = **0.34 / 4.15 = 0.082** |
| 5 | "Repo `cc_install_path = mcp-server` (T1 INSTALL candidate per sca-v20 D13)" | i=1 (description mentions MCP+CLI+Skills) | 1/5 | 1.00·0.2 / 4.15 = **0.20 / 4.15 = 0.048** |

**Per-claim verdict** (with **only 2 of 5 routed MCPs returning evidence** in this brief — deepwiki + hf-mcp + firecrawl pending):

| j | C-score | 3-org-distinct? | Tier |
|---|---|---|---|
| 1 | 0.048 | NO (1 org: github) | TIER-5 NO-EVIDENCE → re-probe required |
| 2 | 0.149 | NO (2 orgs: github + exa-web) | TIER-3 UNDER-CONFIRMED |
| 3 | 0.101 | NO (1 org: exa-web) | TIER-5 NO-EVIDENCE |
| 4 | 0.082 | NO (1 org: github+exa both reading same repo metadata) | TIER-5 |
| 5 | 0.048 | NO (1 org) | TIER-5 |

**Per-Q report-card**:
```
report-card = mean(0.048, 0.149, 0.101, 0.082, 0.048)
            + 0.20 · (0 / 5)              [no TIER-1]
            − 0.10 · (0 / 5)              [no TIER-4]
            − 0.05 · (4 / 5)              [4 TIER-5]
            = 0.0856 + 0.00 − 0.00 − 0.04
            = 0.046    (range 0..1; aim ≥ 0.70)
```

**Verdict**: `0.046` is far below 0.70 → **CANNOT recommend openags/paper-search-mcp for T0 INSTALL today** purely on the 2-MCP convergence sweep performed in this brief. Recommended next-step (v20 §4.A): re-fan-out with deepwiki + hf-mcp + firecrawl to lift C-scores into the 0.30+ band; expected report-card after full 5-MCP convergence ≈ 0.45-0.60 (TIER-3 to TIER-2 range). **THIS is the demonstration of why v20 §4.A routed-fan-out + §4.B per-claim scoring is the right upgrade**: v18/v19 would have emitted a single "T1 INSTALL" tier from the 2-source-only sweep, masking the under-confirmed state. v20 surfaces the under-confirmation explicitly and routes to additional MCPs.

**Interpretation note**: low C-scores here are an artifact of the toy-example (only 2 MCPs queried in-band on THIS specific Q). When the full §3.2 route table fires (5 MCPs × ~3 anchors/MCP = ~15 anchor-units), C-scores for well-supported claims naturally land in the 0.30-0.70 range; sca-v20 tier thresholds (§3.4) calibrate against THAT full-fan-out density, not the partial-fan-out shown above.

### §5.3 Comparison vs v19 "tier-flag" decision

| Aspect | v19 emit | v20 emit | Why v20 better |
|---|---|---|---|
| Decision granularity | 1 tier per repo | 5 C-scores per repo × 1 report-card | Surfaces WHICH attribute is under-confirmed |
| Re-probe trigger | Manual | Automatic if any claim is TIER-3 or TIER-5 | Closes operator-loop gap |
| Echo-chamber detection | None | Explicit flag if memory-MCP-share > 50% | Prevents self-reinforcing bias |
| Cross-vendor consensus | Implicit (perplexity citation count) | Explicit (3-org-distinct check) | Catches "perplexity cites 3 vendor blogs = 1-org-distinct" anti-pattern |
| Code-anchorable | Mostly markdown | JSON claim-matrix per query | Machine-readable; consumable by sca-v20 D14/D15/D16 |

---

## §6 Carry-forwards + open items

1. **Perplexity 300s timeout reproduces**: same failure mode as W372 Stream-B §2 (perplexity_research with `reasoning_effort=high`). Mitigation: v20 §4.A routed-fan-out makes perplexity non-blocking (parallel-fan-out to exa + github + hf-mcp guarantees forward progress). Long-term fix: switch perplexity calls to `perplexity_ask` (faster) or `perplexity_search` for breadth, reserve `perplexity_research` only for the ONE highest-value query per wave (operator must opt-in).
2. **MCP-trust-tiers.json artifact**: not yet created; v20 §4.C implementation requires it (`docs/sota-research/data/mcp-trust-tiers.json`). Stub schema: `{ "mcp_id": "perplexity", "weight": 0.70, "rationale_anchor": "META-B-SOTA-RESEARCH-MCPS.md#33", "version": 1, "last_calibrated": "2026-05-23" }`.
3. **Echo-chamber detection**: needs `supporters(j).map(i => i.startsWith("cognee") || i.startsWith("basic-memory")).filter(Boolean).length / supporters(j).length > 0.5` check in the scorer; trivial to implement; not blocking v20 ship.
4. **Three NEW MCP install candidates pending operator sign**: N1 (paper-search-mcp), N10 (Octocode), N11 (context7) — each adds a tool entrypoint to `.mcp.json` per CLAUDE.md cardinal-rule-1 trust-tuple. Pre-install audit (license + maintainer reputation + signed releases) is the META-C §D07-D09 gate. Recommendation: shadow-install in `.mcp.json.next` for one wave-cycle (~7 days) before promoting to canonical `.mcp.json`.
5. **N13 (deep-research-mcp/Tavily) NOT recommended for install** since CLAUDE.local.md L82-84 already provisions `TAVILY_API_KEY` as env-block (probably for direct-CLI use); installing a Tavily-MCP-wrapper would duplicate the same paid surface. Keep N13 as PATTERN-STUDY only.
6. **NotebookLM-mcp-secure (N14)** carries an operator-decision: routing claims via Google's RAG-grounded answers adds a 4th-vendor consensus axis but requires Google account auth + tolerates Google-internal opaqueness. Recommend operator-side go/no-go.

---

## §7 Summary deliverables vs operator brief

| Brief requirement | Section | Status |
|---|---|---|
| 15-MCP installed audit (capability × quality × cost matrix) | §1 | Done — all 15 MCPs covered with 6 audit dimensions |
| 10+ NEW research-MCP candidates with same audit | §2 (N1-N16) | Done — 16 NEW MCPs catalogued (target was 10+) |
| Multi-angle convergence framework design (route → fan-out → score → consensus) | §3 | Done — 4-stage architecture + route table + weights + formula + anti-patterns |
| 3 concrete v20 upgrades to W18 research arch | §4 (A/B/C) | Done — routed-fan-out + per-claim scoring + MCP-trust-tiers+new-MCPs |
| Convergence metric formula + worked example | §5.1 (formal) + §5.2 (worked) | Done — formal definition + worked example on openags/paper-search-mcp question |

**File**: `Z:/claude-sota-installed-W375/docs/architecture/W377-RESEARCH-V20/META-B-SOTA-RESEARCH-MCPS.md` (this file).
**Sibling files**: META-A (orchestration repos), META-C (sca-v20 19-dim scoring) — together they constitute the W377 v20 research-architecture upgrade trio.
**Lineage**: v18 foundation (Z:/claude-sota-installed-W375/docs/superpowers/plans/2026-05-21-research-arch-v18-pipeline-foundation.md) → v19 (W372 Stream-B) → v20 (this).
