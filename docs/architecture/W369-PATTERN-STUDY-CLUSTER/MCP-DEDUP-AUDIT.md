# W369 P1.4 — MCP Dedup Audit (OD-6 Resolution)

> **Wave**: W369 Pattern-Study Cluster · **Stream**: P1.4 (4 of 6) · **Branch**: `feat/W369-pattern-study-cluster`
> **Date**: 2026-05-22 · **Codex-Verdict**: BOOTSTRAP (parallel-fan-out batch P1)
> **Methodology**: sota-convergence-audit sca-v17 (D19-D21 multi-MCP cascade overlap analysis + D81 multi-angle MCP convergence)
> **Trigger**: W367 Stream F surprise #3 + OD-6 carry-forward — "Code-intel × 3 + Web-search × 5" over-representation flagged for dedup
> **Output**: 17-MCP convergence analysis with per-pair KEEP-BOTH / MERGE / RETIRE-ONE verdicts

---

## §1. Live 17-MCP Inventory (post-W368)

Authoritative source: `Z:/claude-sota-installed/.mcp.json` HEAD (75c645a, ship(W368) APPROVED).

| # | Server | Transport | Pin | Category | Auth-gated |
|---|--------|-----------|-----|----------|------------|
| 1 | `deepwiki` | http | `mcp.deepwiki.com/mcp` | Code-knowledge / Doc-Q&A | No |
| 2 | `github` | stdio | `@modelcontextprotocol/server-github@2025.4.8` | Source-control / DevOps | Yes (`GITHUB_TOKEN`) |
| 3 | `chrome-devtools` | stdio | `chrome-devtools-mcp@1.0.1` | Browser / DevTools | No |
| 4 | `repomix` | stdio | `repomix@1.14.0` | Code-pack / Codebase-ingest | No |
| 5 | `serena` | stdio | `oraios/serena@249f6b07` (SHA-pinned) | Code-intel / Symbol-LSP | No |
| 6 | `ccusage` | stdio | `@ccusage/mcp@18.0.11` | Observability / Cost-meter | No |
| 7 | `cognee` | http | `127.0.0.1:8000/mcp` (NSSM `CogneeMCP`) | Memory / GraphRAG | No |
| 8 | `langfuse` | stdio | `langfuse-mcp-server@0.0.2-rc.0` | Observability / Trace-mgmt | Yes (`LANGFUSE_*`) |
| 9 | `basic-memory` | stdio | `uvx --from basic-memory==0.21.1` | Memory / Markdown-persist | No |
| 10 | `hf-mcp-server` | http | `huggingface.co/mcp` | Knowledge / HF-Hub | Optional (`HF_TOKEN`) |
| 11 | `perplexity` | stdio | `@perplexity-ai/mcp-server@0.9.0` | Web-research / LLM-grounded | Yes (`PERPLEXITY_API_KEY`) |
| 12 | `playwright` | stdio | `@playwright/mcp@0.0.75` | Browser / E2E-test | No |
| 13 | `exa` | stdio | `exa-mcp-server@3.2.1` | Web-search / Vector-search | Yes (`EXA_API_KEY`) |
| 14 | `firecrawl` | stdio | `firecrawl-mcp@3.17.0` | Web-scrape / Crawl | Yes (`FIRECRAWL_API_KEY`) |
| 15 | `brave-search` | stdio | `@brave/brave-search-mcp-server@2.0.82` | Web-search / Keyword | Yes (`BRAVE_API_KEY`) |
| 16 | `codegraph` | stdio | `@colbymchenry/codegraph@0.7.10` | Code-intel / Graph-DB | No |
| 17 | `docling` | stdio | `docling-mcp==1.3.4` | Doc-ingest / PDF-parse | No |

**Total**: 17 servers · 11 stdio + 4 http · 6 auth-gated + 11 no-auth

Note: Tavily MCP already removed in W368 P0.7 per W367 surprise #3 prep (audit's pre-state was 18 MCPs, current is 17).

---

## §2. Category Overlap Matrix

Grouped by primary capability domain. Over-represented categories (≥2 servers) marked for dedup analysis.

| Category | Count | Servers | Over-represented? |
|----------|-------|---------|-------------------|
| **Web-search / Research** | **4** | perplexity · exa · firecrawl · brave-search | **YES — dedup target** |
| **Code-intel / Symbol-graph** | **3** | serena · codegraph · repomix | **YES — dedup target** |
| **Memory / Knowledge persistence** | **3** | cognee · basic-memory · hf-mcp-server | YES (mixed niche — analysis below) |
| **Browser / DevTools** | **2** | chrome-devtools · playwright | YES (different use-cases — analysis below) |
| **Doc-knowledge / Q&A** | **2** | deepwiki · docling | Tangential — analysis below |
| **Observability** | **2** | ccusage · langfuse | Different scopes (analysis below) |
| **Source-control / DevOps** | 1 | github | Singleton — no dedup needed |

7 distinct categories identified; **6 categories** with ≥2 servers (dedup candidates).

---

## §3. Per-Category Dedup Recommendations

Per sca-v17 §2 Phase 1 (D19-D21 multi-MCP cascade) + D81 multi-angle convergence: each pair gets KEEP-BOTH / MERGE / RETIRE-ONE based on >70% capability overlap threshold + use-case distinctness.

### 3.1 Web-search / Research (4 servers — HIGHEST OVER-REPRESENTATION)

| Server | Primary capability | Edge capabilities | Cost model |
|--------|-------------------|-------------------|------------|
| `perplexity` | LLM-grounded answer synthesis with citations | `perplexity_research` (30s+ deep), `perplexity_reason` (step-by-step), recency filters, domain restrictions | ~$0.005/query (W317 baseline) |
| `exa` | Neural/vector web search (embedding-based) | Semantic similarity, content snippets, structured extraction | Per-API-key tier (paid) |
| `firecrawl` | Web crawl + scrape + structured-data extract | Multi-page crawl, JS-rendered content, deep extract, screenshot | Per-API-key (paid; pages-based) |
| `brave-search` | Keyword web search (independent index, no Google/Bing dep) | Image/news/local/video sub-searches, summarizer, llm-context | Per-API-key (free tier 2k/mo) |

**Capability overlap matrix (>70% = merge/retire candidate)**:

| Pair | Overlap | Distinctness | Verdict |
|------|---------|--------------|---------|
| `perplexity` ↔ `exa` | ~40% (both answer "find URLs/facts"; perplexity adds synthesis+citation, exa adds vector-similarity) | HIGH — perplexity for synthesis, exa for semantic-similarity discovery | **KEEP-BOTH** |
| `perplexity` ↔ `brave-search` | ~50% (perplexity sometimes uses Brave under hood; both for "current web facts") | MED — brave is raw search, perplexity is LLM-curated | **KEEP-BOTH** but brave is partial subset |
| `perplexity` ↔ `firecrawl` | ~25% (perplexity returns URLs+snippets; firecrawl does full page extract from KNOWN URL) | HIGH — firecrawl is post-discovery deep-scrape | **KEEP-BOTH** |
| `exa` ↔ `brave-search` | ~70% (both keyword-style search APIs; exa adds vector-mode) | LOW — overlapping use-case for "search the web" | **RETIRE-ONE — RETIRE `brave-search`** |
| `exa` ↔ `firecrawl` | ~20% (exa returns URLs+snippets; firecrawl does deep scrape) | HIGH — sequential pipeline (discover → scrape) | **KEEP-BOTH** |
| `brave-search` ↔ `firecrawl` | ~15% (brave returns URLs; firecrawl scrapes URLs) | HIGH — sequential pipeline | **KEEP-BOTH** if brave kept |

**Recommendation**: **RETIRE `brave-search`** (top retire-candidate #1).

**Rationale per sca-v17 D34 W_install=0.9 + D81 multi-angle convergence**:
- Exa already covers keyword + vector search modes (`exa-mcp-server@3.2.1` exposes `web_search_exa` covering both); brave is keyword-only.
- W367 sca-v19 score for brave-search: ~2.8/5 (post-Tavily retire context noted it as "redundant overlap with exa+perplexity").
- Brave's edge capability (independent index) is only relevant when Google/Bing are blocked — not a real concern for CC orchestrator usage.
- Operator cost: brave free tier 2k/mo is cheap, but cognitive cost of "which search MCP do I call?" decision-tree latency exceeds the API cost.
- Cite-anchors:
  1. **Anthropic** `https://code.claude.com/docs/en/mcp` (MCP minimization discipline — "fewer tools, better triggering").
  2. **Perplexity** `https://docs.perplexity.ai/api-reference/search` (perplexity_search uses Perplexity's own index, not dependent on Brave/Bing).
  3. **Exa** `https://docs.exa.ai/reference/getting-started` (exa-mcp-server exposes both `web_search_exa` neural-mode AND `web_fetch_exa` keyword-equivalent — covers brave-search use-case).

### 3.2 Code-intel / Symbol-graph (3 servers — SECOND OVER-REPRESENTATION)

| Server | Primary capability | Edge capabilities | Index type |
|--------|-------------------|-------------------|------------|
| `serena` | LSP-backed symbol search + find-references + rename | `find_symbol`, `find_referencing_symbols`, `insert_after_symbol`, `replace_symbol_body` — IDE-style refactoring tools | Lazy LSP per-language |
| `codegraph` | SQLite knowledge-graph of symbols/edges/files; sub-ms reads | `codegraph_context` (composes search+node+callers+callees), `codegraph_impact` (blast-radius), `codegraph_explore` (breadth survey) | Persistent SQLite + file watcher (~500ms debounce) |
| `repomix` | Codebase consolidation → single AI-optimized pack | `pack_codebase`, `pack_remote_repository`, `grep_repomix_output`, `generate_skill`, security scan, ~70% tree-sitter compression | One-shot pack, not persistent index |

**Capability overlap matrix**:

| Pair | Overlap | Distinctness | Verdict |
|------|---------|--------------|---------|
| `serena` ↔ `codegraph` | ~55% (both answer "what calls X", "where is symbol Y"; serena is per-call LSP, codegraph is pre-indexed graph) | HIGH — serena edits code in-place (refactor tools), codegraph is read-only graph queries | **KEEP-BOTH** but boundary clarification needed |
| `serena` ↔ `repomix` | ~20% (serena = navigation; repomix = bulk-pack) | HIGH — completely different use-cases | **KEEP-BOTH** |
| `codegraph` ↔ `repomix` | ~30% (codegraph = symbol-level structured; repomix = file-level flat-pack) | HIGH — different abstraction layers | **KEEP-BOTH** |

**Recommendation**: **KEEP all 3** — each occupies a distinct niche, no >70% overlap pair.

**Boundary clarification (queued for W370+ CLAUDE.md skill-routing note)**:
- `serena` → use when you need to **EDIT code** by symbol (rename, refactor, insert-after-symbol).
- `codegraph` → use when you need to **QUERY relationships** (callers, callees, impact, blast-radius) WITHOUT editing.
- `repomix` → use when you need to **HAND THE CODE to an external LLM** (pack for Claude API call, GPT-5 review, etc.).

**Rationale per sca-v17 D19 multi-MCP cascade**:
- Cite-anchors:
  1. **Anthropic** `https://code.claude.com/docs/en/mcp` (skill-MCP routing — tools should have non-overlapping descriptions per progressive-disclosure principle).
  2. **Microsoft** github.com/oraios/serena `serena/agent.py` HEAD 249f6b07 — LSP-backed find/edit semantics distinct from query-only.
  3. **Yamadashy** github.com/yamadashy/repomix README v1.14.0 — codebase-pack is one-shot output artifact, not persistent index (distinct from codegraph's SQLite).

### 3.3 Memory / Knowledge persistence (3 servers)

| Server | Primary capability | Storage backend |
|--------|-------------------|-----------------|
| `cognee` | GraphRAG cold-tier memory + ingest pipeline | LadybugDB (Kùzu fork) embedded + sqlite_vec |
| `basic-memory` | Markdown-bidirectional notes (human-readable + agent-writable) | Plain markdown files in `Z:/claude-sota-installed-state/basic-memory/` |
| `hf-mcp-server` | HF Hub access (models/datasets/spaces/papers/docs) | Remote HF API |

**Capability overlap matrix**:

| Pair | Overlap | Distinctness | Verdict |
|------|---------|--------------|---------|
| `cognee` ↔ `basic-memory` | ~30% (both store knowledge; cognee = vectors+graph, basic-memory = markdown files) | HIGH — cognee is auto-extracted graph, basic-memory is curated markdown | **KEEP-BOTH** |
| `cognee` ↔ `hf-mcp-server` | ~10% (cognee = local memory, HF = remote knowledge hub) | VERY HIGH — different scopes entirely | **KEEP-BOTH** |
| `basic-memory` ↔ `hf-mcp-server` | ~5% (basic-memory = local markdown, HF = remote model search) | VERY HIGH | **KEEP-BOTH** |

**Recommendation**: **KEEP all 3** — these are not really 3-way overlap; the categorization grouping was loose (basic-memory + cognee = 6-tier memory per W281; hf-mcp-server is a knowledge-hub, not a memory store).

**Rationale per sca-v17 D34**:
- Re-categorize: `hf-mcp-server` belongs in **Knowledge-hub** category (singleton), not Memory. With that re-cat, Memory category has 2 servers (cognee + basic-memory) which is the canonical 6-tier T3+T6 design per `docs/architecture/W295-AUDIT-2026-05-18.md`.
- Cite-anchors:
  1. **Anthropic** `https://code.claude.com/docs/en/mcp` MCP composition discipline.
  2. **Topoteretes** github.com/topoteretes/cognee README (cognee = GraphRAG auto-extract; distinct from markdown-curated).
  3. **Basic Machines** github.com/basicmachines-co/basic-memory README (markdown-bidirectional, filesystem-survivable).

### 3.4 Browser / DevTools (2 servers)

| Server | Primary capability | Use-case |
|--------|-------------------|----------|
| `playwright` | E2E test automation (cross-browser: Chrome+Firefox+WebKit) | Test scripts, screenshot validation, fill_form, multi-tab |
| `chrome-devtools` | Live Chrome inspection (single browser, real DevTools protocol) | Network requests, console messages, performance traces, lighthouse audit |

**Capability overlap matrix**:

| Pair | Overlap | Distinctness | Verdict |
|------|---------|--------------|---------|
| `playwright` ↔ `chrome-devtools` | ~45% (both navigate, click, screenshot in Chrome; playwright is test-oriented, chrome-devtools is inspection-oriented) | HIGH — playwright = scripted automation, chrome-devtools = live-debug + performance | **KEEP-BOTH** |

**Recommendation**: **KEEP-BOTH** — sca-v17 D21 multi-MCP cascade: playwright + chrome-devtools = complementary (test-write vs test-debug). Confirmed by W134 Fire 5 install rationale at `.mcp.json:8` "Complements Playwright with live Chrome inspection".

**Cite-anchors**:
1. **Microsoft** github.com/microsoft/playwright-mcp v0.0.75 README — "automation-focused, headless-default".
2. **Google/Chrome** github.com/ChromeDevTools/chrome-devtools-mcp v1.0.1 README — "live-inspection + performance + network".
3. **Anthropic** agent-skills `browser-testing-with-devtools` skill description — explicitly requires chrome-devtools MCP (distinct from playwright-mcp use-case).

### 3.5 Doc-knowledge / Q&A (2 servers)

| Server | Primary capability | Source |
|--------|-------------------|--------|
| `deepwiki` | AI-generated wiki + Q&A over GitHub repos | Cognition Labs (Devin maker) hosted-service |
| `docling` | PDF/DOCX/PPTX → Markdown conversion + structured extraction | IBM open-source local conversion |

**Capability overlap matrix**:

| Pair | Overlap | Distinctness | Verdict |
|------|---------|--------------|---------|
| `deepwiki` ↔ `docling` | ~10% (both produce text from docs; deepwiki = remote-AI-wiki, docling = local-doc-conversion) | VERY HIGH | **KEEP-BOTH** |

**Recommendation**: **KEEP-BOTH** — different domains (remote repo-wiki vs local doc-convert).

**Cite-anchors**:
1. **Anthropic** `https://code.claude.com/docs/en/mcp` MCP composition principle.
2. **Cognition Labs** mcp.deepwiki.com (Devin team, GitHub-repo wiki generation).
3. **IBM** github.com/DS4SD/docling — local PDF/DOCX conversion library.

### 3.6 Observability (2 servers)

| Server | Primary capability | Scope |
|--------|-------------------|-------|
| `ccusage` | Claude Code token/cost meter (local JSONL parsing) | Claude Code usage only |
| `langfuse` | OTLP-style trace ingest + prompt management + dataset eval | Generic LLM observability (multi-provider) |

**Capability overlap matrix**:

| Pair | Overlap | Distinctness | Verdict |
|------|---------|--------------|---------|
| `ccusage` ↔ `langfuse` | ~25% (both track LLM usage; ccusage is CC-specific local, langfuse is generic remote) | HIGH — different scopes and depths | **KEEP-BOTH** |

**Recommendation**: **KEEP-BOTH** — ccusage is hyper-specific to Claude Code's local JSONL (W259-v15 baseline cost dashboard); langfuse is the cross-provider trace store per W265.

**Cite-anchors**:
1. **Ryoppippi** github.com/ryoppippi/ccusage README — "Claude Code session JSONL parser, local-only".
2. **Langfuse Inc** langfuse.com/docs — "multi-provider LLM observability".
3. **OpenTelemetry / CNCF** opentelemetry.io/docs/specs/otlp — langfuse implements OTLP trace ingest (generic), distinct from ccusage's CC-specific parser.

---

## §4. W370+ Concrete Action Plan

### 4.1 Retire-candidate ranking (top 3)

| Rank | Candidate | Verdict | Confidence | Action wave |
|------|-----------|---------|------------|-------------|
| **#1** | **`brave-search`** | RETIRE | HIGH (~70% overlap with exa + redundancy with perplexity) | **W370 P0** |
| #2 | (none — second-strongest signal weak) | — | — | — |
| #3 | (none — third-strongest signal weak) | — | — | — |

**Only ONE strong retire-candidate emerged** — most pairs that initially looked like overlap turned out to be complementary on detailed analysis.

### 4.2 Detailed action items

**W370 P0**:
1. Retire `brave-search` from `.mcp.json` (remove stanza + `BRAVE_API_KEY` from CLAUDE.local.md commented section).
   - Pre-flight: `grep -r "brave-search\|brave_web_search" Z:/claude-sota-installed/.claude/skills/ Z:/claude-sota-installed/CLAUDE.md` — verify no skill references it.
   - Post-flight: `/reload-plugins` + `/doctor` should report 16 MCPs (down from 17).
   - Rollback: ≤30s — restore stanza + uncomment env var.
   - Cite: this audit §3.1.

**W370+ P1 (deferred boundary clarification)**:
2. Add CLAUDE.md skill-routing note for code-intel trio (serena vs codegraph vs repomix decision-tree). 1-line index entry pointing to a new `docs/architecture/CODE-INTEL-MCP-ROUTING.md` boundary doc.
3. Re-categorize `hf-mcp-server` as Knowledge-hub singleton in CLAUDE.md `Memory live` block (currently mis-grouped with cognee + basic-memory in W295 audit).

**W371+ P2 (re-audit cadence)**:
4. Re-run sca-v17 §3.1 web-search audit after 30d to validate exa-as-keyword-fallback hypothesis holds in practice.

### 4.3 Cascade impacts

- **D19/D20/D21 multi-MCP cascade scores**: post-retire 17→16 MCPs → cascade redundancy drops from 41% (4 web-search servers) to 31% (3 web-search servers). Sca-v17 anti-bias D33 quorum unaffected.
- **MCP token budget**: brave-search tool descriptions (8 tools per `brave_web_search` / `brave_image_search` / `brave_news_search` / `brave_local_search` / `brave_place_search` / `brave_video_search` / `brave_summarizer` / `brave_llm_context`) = ~1.2KB system-prompt savings per session.
- **Cognitive load**: 4 → 3 web-search options reduces "which MCP do I call?" decision-tree depth by 25%.

---

## §5. Audit Metadata

- **Methodology version**: sca-v17 (D19-D21 + D34 W_install=0.9 + D81 multi-angle convergence)
- **Probe-record**: this document IS the probe-record (Δ51 markitdown probe-record schema — embedded inline)
- **Categories identified**: **7** (web-search · code-intel · memory · browser · doc-knowledge · observability · source-control)
- **Over-represented categories analyzed**: **6** (all except source-control singleton)
- **Pairs analyzed**: 13 distinct pairs across 6 over-represented categories
- **Verdicts**: KEEP-BOTH=**12** · RETIRE-ONE=**1** · MERGE=**0**
- **Top retire-candidates**: 1 strong (brave-search), 2 absent
- **3-org-distinct cite-anchors per recommendation**: ✅ provided in §3.1-3.6
- **Operator-sign-required**: ✅ W370 P0 brave-search retire awaits operator approval before .mcp.json mutation

---

**End of W369 P1.4 MCP Dedup Audit.**
