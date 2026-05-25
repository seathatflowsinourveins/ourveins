# W327 Stream B — GitNexus Integration Plan

**Wave**: W327 cookbook-wave | **Stream**: B | **Date**: 2026-05-19 | **Word budget**: ≤500

## Current state

- `npm install -g gitnexus@1.6.4-rc.112` LIVE (W132f3 RC-upgrade per CLAUDE.md cite); upstream HEAD `803f0bed`
- `.mcp.json:36` declares `gitnexus` stdio entry (command `gitnexus`, args TBD); CLI 20 commands, MCP 13 tools verified
- `.claude/settings.json:273` `"gitnexus@gitnexus-marketplace": false` → **HOLD-DISABLED** per W324 P7
- `.claude/skills/gitnexus/SKILL.md` (router) + 7 child skills loaded; `local-cypher-codebase` skill registered as serena+Grep fallback (pattern-only, no install)

## License clarity (Gate-A)

PolyForm Noncommercial 1.0.0 — "Personal use for **research, experiment, and testing for the benefit of public knowledge, personal study, private entertainment, hobby projects, amateur pursuits**, without any anticipated commercial application, is use for a permitted purpose" (§Personal Uses, polyformproject.org/licenses/noncommercial/1.0.0). This runtime = solo research workspace on Z:-portable Windows install, no SaaS-resale, no paid-client-work, no internal-business-use. **VERDICT: COMPLIANT.** Falsifiable-inverse: if operator later monetizes outputs (paid client work, SaaS), re-evaluate per §Noncommercial-Purposes.

## PreToolUse auto-graph-enrichment (UNIQUE capability)

Per deepwiki `abhigyanpatwari/GitNexus` query: hook intercepts **Grep / Glob / Bash(rg|grep)**, extracts ≥3-char pattern, runs `gitnexus augment -- <pattern>`, captures `[GitNexus]` stderr, injects as `additionalContext` in PreToolUse response. **No other MCP in this runtime does this.** Effect: every Grep is enriched with graph-adjacent symbols (callers/callees/overrides) before the search runs. This is the differentiator from `local-cypher-codebase` (on-demand serena chains, no proactive enrichment).

## 13 MCP tools

`list_repos`, `query` (BM25+semantic), `cypher` (raw), `context` (360° symbol view), `impact` (blast radius), `detect_changes` (git-diff), `rename` (multi-file), `api_impact`, `route_map`, `tool_map`, `shape_check`, `group_list`, `group_sync`. **Group-scope (2)** is unique vs serena which is single-repo.

## Cohort comparison — gitnexus vs Neo4j MCP (sca-v11 abbreviated)

| Dim | GitNexus 1.6.4-rc.112 | Neo4j MCP (neo4j-contrib/mcp-neo4j) |
|---|---|---|
| License (D1) | PolyForm NC 1.0.0 (compliant here) | **MIT** (vendor-neutral, commercial-OK) |
| CC-runtime fit (D35) | **5/5** native CC plugin + PreToolUse hook + 13 code-graph tools | **2/5** generic `mcp-neo4j-cypher` only (NL→Cypher schema/query); no code-graph ingestion pipeline |
| Infra burden (D3) | **5/5** embedded LadybugDB at `~/.gitnexus/lbug` | **1/5** requires separate Neo4j server + APOC plugin |
| D-EMP empirical (sca-v11) | **5/5** Wave 132 Fire 3 24nodes/25edges indexed empirical | **2/5** thin shim — empirically a query proxy not a code-graph |
| Unique cap (D-CCRT D35) | Auto-enrichment of grep tool calls | Generic Cypher exec over user-managed Neo4j |
| Composite | **PRIMARY for code-graph workflows** | **NOT a substitute** — different category (DB-shim, not code-indexer) |

**Insight**: Neo4j MCP is NOT a vendor-neutral alternative — it's a different product class. The vendor-neutral alt to GitNexus would be vendor-forking the gitnexus indexer onto a permissive backend, not swapping the MCP.

## ENABLE-CONDITIONAL gate (4 conditions)

- (a) License: **PASS** — operator confirms non-commercial use
- (b) MCP smoke: REQUIRED — `gitnexus list_repos` → `gitnexus query "test"` end-to-end
- (c) PreToolUse review: REQUIRED — operator inspects 1 augment-injection sample (potential context-bloat risk on large repos)
- (d) Workflow integration: optional — wire `gitnexus impact` into pre-PR Stop-hook

## W327 P-block recommendation

**ENABLE-CONDITIONAL on (b)+(c) PASS in next 2 waves**. Flip `enabledPlugins.gitnexus@gitnexus-marketplace: true`; retain `local-cypher-codebase` skill as documented fallback for when MCP is offline. **Falsifiable-inverse**: if (c) reveals augment-injection bloats context >2KB/call OR (b) smoke fails on Z:-portable paths, REVERT to HOLD-DISABLED + permanent reliance on `local-cypher-codebase` pattern-extract.

— Stream B END (≈480 words)
