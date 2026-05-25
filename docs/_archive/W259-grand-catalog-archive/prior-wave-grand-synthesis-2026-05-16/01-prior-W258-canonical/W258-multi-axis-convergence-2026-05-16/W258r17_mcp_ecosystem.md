# W258r17 — MCP Server Ecosystem Deep-Dive (2026-05-16)

**Mission:** Map MCP server ecosystem; identify ≥3-axis convergence gaps in operator's 12-server stack.
**Method:** Parallel-fetched 12 sources (5 awesome-list curators + 7 candidate-server READMEs), indexed 1120 KB / 725 sections, FTS5-searched across 15 category queries.
**Operator baseline (12 MCPs in `.mcp.json`):** github · context7 · deepwiki · playwright · chrome-devtools · repomix · serena · ccusage · gitnexus · memory (mcp-memory-service) · phoenix · graphiti.

---

## §1 Top-3 OSS picks per MCP category (14 categories)

| # | Category | Top-3 picks (✓ = operator has it) | Notes |
|---|---|---|---|
| 1 | Code intel / LSP / parse | ✓ serena · ✓ repomix · ✓ gitnexus | **FULLY COVERED** (r3 confirmed) |
| 2 | Knowledge / memory / RAG | ✓ graphiti · ✓ mcp-memory-service · `mem0ai/mem0-mcp` ★41k | mem0 = NEW (r3+r11 convergence; $24M Series A) |
| 3 | Browser / web automation | ✓ playwright · ✓ chrome-devtools · `browser-use/browser-use` ★94k | browser-use = NEW (AUGMENT subprocess) |
| 4 | Filesystem / git | ✓ github MCP · `modelcontextprotocol/servers/src/filesystem` · `cyanheads/filesystem-mcp-server` | **GAP — no local-FS MCP** (Bash-only currently) |
| 5 | Database | `neondatabase/mcp-server-neon` · `neo4j-contrib/mcp-neo4j` · `montumodi/mongodb-atlas-mcp` | **modelcontextprotocol postgres/sqlite ARCHIVED** — use community |
| 6 | Search (web/docs/academic) | ✓ context7 (docs) · ✓ deepwiki (repo) · `tavily-ai/tavily-mcp` + `exa-labs/exa-mcp-server` + `firecrawl-mcp` | **GAP — no live-web search**; Tavily or Exa fills it |
| 7 | Time / calendar | `modelcontextprotocol/servers/src/time` (Anthropic-official) | Trivial, free, useful for date-aware reasoning |
| 8 | Communication | `modelcontextprotocol/servers/src/slack` · `GongRzhe/Gmail-MCP-Server` · `v-3/discordmcp` | Operator-discretion (Slack if team-comms) |
| 9 | Cloud (AWS/GCP/Azure) | `awslabs/mcp` (AWS-OFFICIAL) · `cloudflare/mcp-server-cloudflare` · `jdubois/azure-cli-mcp` | Install if cloud workloads |
| 10 | DevOps (Docker/k8s/Terraform) | `hashicorp/terraform-mcp-server` (OFFICIAL) · `Flux159/mcp-server-kubernetes` · `Docker MCP Gateway` | Install if IaC workloads |
| 11 | Observability / errors | ✓ phoenix · `modelcontextprotocol/servers/src/sentry` (OFFICIAL) · `avivsinai/langfuse-mcp` | **GAP — Sentry adds error-tracking** complement to phoenix tracing |
| 12 | Office / productivity | `makenotion/notion-mcp-server` (OFFICIAL) · `jerhadf/linear-mcp-server` · `sooperset/mcp-atlassian` | Operator-discretion |
| 13 | Security scanners | `semgrep/mcp` · `gitleaks/mcp` · `aquasecurity/trivy-mcp` (verify) | Adds CI-grade scan from agent surface |
| 14 | LLM / model gateway | `BerriAI/litellm` MCP-mode · `composio/composio-mcp` · `huggingface/hf-mcp-server` | Composio = ~5000-tool catalog single endpoint |
| 15 | Payment / business APIs | `stripe/agent-toolkit/modelcontextprotocol` (OFFICIAL) · `paypal/agent-toolkit` | Stripe = Stripe themselves run this in production (Minions r7) |
| 16 | Aggregator / gateway | `Docker MCP Gateway` (catalog+profiles+OAuth) · `composio/composio-mcp` | Manages many MCPs via one endpoint — production-grade |

---

## §2 GENUINELY-NEW MCP servers with ≥3-axis evidence

| Server | Repo | Axes hit | Install command | Role-in-stack |
|---|---|---|---|---|
| **Filesystem MCP** | `modelcontextprotocol/servers/src/filesystem` | r3 + r10 + r14 (Anthropic-OFFICIAL reference impl) | `npx -y @modelcontextprotocol/server-filesystem <dirs>` | Local-FS read/write WITHOUT Bash escapes (auditable; permission-scoped) |
| **mem0 MCP** | `mem0ai/mem0-mcp` ★41k+ Apache-2.0 | r3 (stack-layer winner) + r11 ($24M Series A Oct'25 + YC/Peak XV/Basis) + r10 (MCP convergence) | `npm i -g @mem0/mcp-server` (verify) | Persistent personalized memory across sessions (complements graphiti's temporal-KG) |
| **Sentry MCP** | `modelcontextprotocol/servers/src/sentry` | r3 obs-layer + r10 OFFICIAL + r14 protocol | `npx -y @modelcontextprotocol/server-sentry` | Error-tracking complement to phoenix's trace-layer |
| **Tavily MCP** | `tavily-ai/tavily-mcp` | r1 dimension-D + r10 production search + community | `npx -y tavily-mcp` (NPM) | Live-web search (operator has docs+repo search, NO live-web) |
| **Firecrawl MCP** | `mendableai/firecrawl-mcp-server` | r1 + r10 + production scrapers | `npx -y firecrawl-mcp` | Headless scrape complement to playwright (static pages cheap) |
| **Stripe agent-toolkit MCP** | `stripe/agent-toolkit/modelcontextprotocol` | r7 (Stripe Minions) + r10 OFFICIAL + r11 (production) | `npx -y @stripe/mcp` | If operator does any payments/billing code |
| **Composio MCP** | `ComposioHQ/composio` | r3 + r7 (3 production refs) + r11 (Series A) | `npx -y @composio/mcp` | Aggregator: 5000+ tool catalog through one MCP endpoint |
| **Terraform MCP** | `hashicorp/terraform-mcp-server` 🎖️ | r10 OFFICIAL + DevOps category top | Per HashiCorp docs | If IaC workflows |

---

## §3 Redundancy audit — operator's current stack

- **github MCP vs serena vs gitnexus** — NOT redundant. github = remote API (PRs/issues/file-contents-via-API); serena = local LSP (symbols/refs/declarations); gitnexus = local graph DB over git history. Three distinct layers.
- **graphiti vs mcp-memory-service** — *potential* overlap. graphiti = temporal knowledge graph (entities/edges/time-aware); mcp-memory-service = semantic vector recall (sqlite_vec). Distinct shapes but role-overlap on "what did we decide." Acceptable — different recall queries hit different stores.
- **deepwiki vs context7** — NOT redundant. deepwiki = repo-as-wiki (cross-file structured docs); context7 = version-pinned library docs. Distinct sources.
- **playwright vs chrome-devtools** — partial overlap (both Chrome control) but distinct toolsets (playwright = headless automation; chrome-devtools = inspection/profiling/lighthouse). Operator-validated keep-both per `.mcp.json` notes.
- **NO DRY violations requiring removal** — stack is well-factored.

---

## §4 SOTA-grade MCP server quality criteria (cite r14 protocol axis)

A SOTA MCP server (2026-May) satisfies: (1) **stdio + streamable-HTTP** transport (per MCP v1.0); (2) **OAuth 2.1 PKCE** for HTTP servers (auth + token rotation per r14); (3) **Capabilities discovery** at session-init (tools/resources/prompts/roots advertised); (4) **Streaming responses** for large payloads; (5) **Sessions / state** across calls; (6) **Pinned version + SBOM** (CR-9 — no `@latest` in production); (7) **Anthropic-OFFICIAL or named-T2 or AAIF-foundation** maintainer tier; (8) **TIER-1 license** (MIT / Apache-2.0 / BSD-3) — NO AGPL / NOASSERTION / CC-BY without inspection.

---

## §5 Verdict — top-5 NEW MCP servers to add (ranked by convergence × operator-fit)

1. **Filesystem MCP** (Anthropic-OFFICIAL) — closes the local-FS gap; auditable; permission-scoped. **Install first** — lowest-risk, highest-utility, zero-cost.
2. **mem0 MCP** — $24M-funded + 41k★ + 14M downloads; complements graphiti. 2-axis convergence (r3+r11). Install for cross-session personalized memory.
3. **Tavily OR Firecrawl MCP** (pick one — Tavily for queries, Firecrawl for full-page scrape) — closes the live-web gap (deepwiki + context7 cover docs only).
4. **Sentry MCP** (Anthropic-OFFICIAL) — error-tracking complement to phoenix; production-grade triple already proven (phoenix-traces + langfuse-observability + sentry-errors).
5. **Composio MCP** — 5000+ tool catalog via one endpoint; production-validated (r7); use as *gateway* rather than installing 20+ individual MCPs. Replaces piecemeal installs.

**AVOID:**
- `e2b-dev/mcp-server` — **DEPRECATED** ("no longer actively maintained" per repo banner; use E2B SDK directly if sandboxing needed)
- `modelcontextprotocol/server-postgres` / `server-sqlite` — **ARCHIVED** (moved to `servers-archived`); use community alternatives (Neon / Neo4j-MCP) if needed
- Any AGPL-licensed server (Skyvern-MCP, Daytona-MCP) per r3 license-blocker discipline

**Confidence: 0.85.** 12 sources fetched (100% success); FTS5 cross-search consistent; awesome-list lag caveat (r4 noted 12-18mo recency lag) applies to community lists but not to OFFICIAL Anthropic registry which is current.
