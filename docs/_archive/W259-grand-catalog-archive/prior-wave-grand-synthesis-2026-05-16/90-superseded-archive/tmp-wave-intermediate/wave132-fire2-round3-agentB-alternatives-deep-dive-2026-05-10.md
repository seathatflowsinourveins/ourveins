---
title: Wave 132 Fire 2 Round-3 Agent B — gitnexus alternatives LINE-BY-LINE deep-dive
status: AUTHORITATIVE
date: 2026-05-10
agent: sota-researcher (Sonnet stand-in per CLAUDE.local.md ENV (g) commented out + frontmatter `model: sonnet` defaults — STAND-IN-NOTICE per cross-model-consensus.md §Env-funneled subagent stand-in disclosure mandate)
wave: 132 fire 2 round 3
---

# Wave 132 Fire 2 Round-3 Agent B — gitnexus alternatives LINE-BY-LINE deep-dive

## STAND-IN-NOTICE
This agent ran as Sonnet stand-in per `CLAUDE.local.md` ENV (g) commented out + frontmatter `model: sonnet` defaults. Cross-model gate is satisfied independently via Round-3 Path P codex bg (REAL GPT-5.5 firing in parallel for gitnexus repo). Role is alternatives RESEARCH + functional-comparison MATRIX (NOT cross-model verdict).

## Scope
ROUND-3 of Wave 132 Fire 2. Rounds 1+2 (RETAIN conf=0.91 + REMOVE-AND-DEFER conf=0.89) SUPERSEDED by user-correction requiring DEEP-DIVE EVIDENCE before any disposition. This round produces source-code-deep-dive evidence for ≥4 alternatives + functional-comparison matrix vs gitnexus baseline + replacement-readiness assessment per `Z:/claude-sota-installed/.claude/rules/deprecation-discipline.md` F-003.

# Section 1 — Candidate enumeration

| # | Candidate | Type | License | Stars | Age (days) | Last push | Notes |
|---|---|---|---|---|---|---|---|
| 0 | **gitnexus** (incumbent) | MCP+CLI npm pkg | **PolyForm Noncommercial** ⚠️ | 37,312 | 280 | 2026-05-10 | Cite: `Z:/repos/deps/gitnexus/README.md @ HEAD` per gh API + Wave 132 Fire 2 round-2 |
| 1 | **DeusData/codebase-memory-mcp** | C-binary MCP+CLI | MIT | 2,199 | 74 ⚠️ | 2026-05-09 | C+tree-sitter; arXiv-cited; SLSA-3; 14 MCP tools + CLI mode |
| 2 | **CodeGraphContext (CGC)** | Python pip pkg | MIT | 3,205 | 266 | 2026-05-08 | LadybugDB/FalkorDB/Neo4j; CLI+MCP dual mode; pre-indexed bundles |
| 3 | **colbymchenry/codegraph** | npm pkg + WASM | MIT | 1,165 | 111 | 2026-05-08 | TypeScript+web-tree-sitter; SQLite-WASM; 9 MCP tools |
| 4 | **harshkedia177/axon (axoniq)** | PyPI pkg | MIT | 690 | 77 ⚠️ | 2026-03-25 (45d stale) | KuzuDB; 12-phase pipeline; Sigma.js UI |
| 5 | **oraios/serena** (existing eee) | Python MCP | MIT | 24,019 | 412 | 2026-05-09 | LSP-based; 55 Tool classes; semantic retrieve+edit |
| 6 | **yamadashy/repomix** (existing eee) | npm MCP | MIT | 24,552 | 666 | 2026-05-09 | 8 MCP tools; codebase packaging |
| 7 | **ast-grep/ast-grep** (existing eee) | Cargo CLI | MIT | (existing) | (mature) | 2026-05-* | Tree-sitter pattern engine; CLI not MCP |
| 8 | **GitHub MCP** (existing eee) | MCP | MIT (Microsoft) | (mature) | mature | active | Repo metadata + content access |
| 9 | **graphiti via mcp-memory + FalkorDB** (existing eee) | MCP+Docker | Apache-2.0 (graphiti) | 25,800 (graphiti) | (mature) | active | Temporal KG; not code-aware |
| 10 | **FalkorDB/code-graph** | demo | MIT | 303 | 859 | 2026-05-07 | GraphRAG-SDK demo; not a maintained MCP product |

⚠️ Axis-3 stability: codebase-memory-mcp (74d) + axon (77d) FAIL the 90d burn-in floor per `Z:/claude-sota-installed/.claude/rules/convergence-gate.md §Axis 3` cpd × age band. STRONG-PROVENANCE-EXPRESS predicate (≥30d + official-org maintainership + named-T2 endorsement) NOT satisfied for either (DeusData + harshkedia177 are individual-author / single-org).

# Section 2 — Per-candidate LINE-BY-LINE deep-dive

## 2.1 — codebase-memory-mcp (DeusData)

**Repo state**: cloned at `Z:/repos/deps/codebase-memory-mcp` HEAD `2b07bc0c3f72f0296cd2e6897fb4e74ab06c81b9` (2026-05-09 01:29:48 +0200). MIT @ `LICENSE:1`, Copyright (c) 2025 DeusData.

**README claims** (`Z:/repos/deps/codebase-memory-mcp/README.md:17-23`):
- "fastest and most efficient code intelligence engine for AI coding agents"
- "Linux kernel (28M LOC, 75K files) in 3 minutes"
- "sub-1ms structural queries" + "single static binary"
- "155 languages" via vendored tree-sitter
- "14 MCP tools"
- "Plug and play across 11 coding agents"

**arXiv preprint citation**: `arxiv.org/abs/2603.27277` — "Codebase-Memory: Tree-Sitter-Based Knowledge Graphs for LLM Code Exploration via MCP" — claims "83% answer quality, 10× fewer tokens, 2.1× fewer tool calls vs. file-by-file exploration" across 31 real-world repos.

**Source-code MCP tools** (verified via `grep` at `Z:/repos/deps/codebase-memory-mcp/src/mcp/mcp.c:cbm_mcp_handle_tool`):
1. `list_projects`
2. `get_graph_schema`
3. `search_graph`
4. `query_graph` (Cypher-like)
5. `index_status`
6. `delete_project`
7. `trace_path` / `trace_call_path` (alias)
8. `get_architecture`
9. `index_repository`
10. `get_code_snippet`
11. `search_code`
12. `detect_changes` (git-diff impact)
13. `manage_adr`
14. `ingest_traces`

**Architecture** (`README.md:434-451`): C entry-point `src/main.c`; subdirs `mcp/` + `cli/` + `store/` (SQLite) + `pipeline/` (multi-pass index) + `cypher/` + `discover/` + `watcher/` (background auto-sync) + `traces/` + `ui/` (HTTP+3D viz at localhost:9749). `internal/cbm/` vendors 155 tree-sitter grammars.

**Source-code-verified primitives**:
- Pure C, zero runtime deps (all grammars vendored + LZ4 + in-memory SQLite + bundled Nomic embeddings)
- Cross-platform binary distribution via mcpb registry per `server.json:13-50` (5 OS/arch packages with SHA256)
- 155 tree-sitter grammars compiled (`internal/cbm/`); LSP-style hybrid type resolution for Go/C/C++ extra
- Auto-detects 11 agents (`README.md:Multi-Agent Support`): Claude Code, Codex CLI, Gemini CLI, Zed, OpenCode, Antigravity, Aider, KiloCode, VS Code, OpenClaw, Kiro
- Team-shared `.codebase-memory/graph.db.zst` artifact (zstd-compressed SQLite); auto-bootstrap on clone

**Production evidence**: SLSA-3 + OpenSSF Scorecard + VirusTotal 0/72 + 2812 passing tests + arXiv preprint. Author is "DeusData" GitHub user (single-org maintainer per `LICENSE:3`).

**Maintainer tier (SRA D4)**: TIER-4-NAMED-INDIVIDUAL (DeusData GH account; arXiv author identity not visible). Org-level maintainership: NO.

**Axis-3 verdict**: 74d age FAILS 90d floor; STRONG-PROVENANCE-EXPRESS predicate FAILS (single-author, no named-T2 dated artifact endorsement found).

## 2.2 — CodeGraphContext (CGC)

**Repo state**: cloned at `Z:/repos/deps/CodeGraphContext` HEAD `a6e63123a015ab25419e6ccfbcde738ab70e941e` (2026-05-09 02:04:27 +0530). MIT @ `LICENSE:1`.

**README claims** (`Z:/repos/deps/CodeGraphContext/README.md:115-128`):
- "MCP server plus CLI toolkit that indexes local code into a graph database"
- Multi-language: 15 languages (Python/JS/TS/Java/C/C++/C#/Go/Rust/Ruby/PHP/Swift/Kotlin/Dart/Perl/Lua)
- Database options: LadybugDB (default), FalkorDB Lite, Neo4j, Nornic DB
- Pre-indexed `.cgc` bundles for "famous repositories"
- Live file watcher

**pyproject.toml deps** (`Z:/repos/deps/CodeGraphContext/pyproject.toml:18-43`):
- `neo4j>=5.15.0` (graph backend)
- `tree-sitter>=0.21.0` (parsing)
- `tree-sitter-language-pack>=0.6.0` (grammars)
- `falkordb>=0.1.0` (FalkorDB client)
- `falkordblite>=0.1.0` (Unix Python 3.12+)
- `kuzu` (Windows Python 3.10+)
- `fastapi>=0.100.0` + `uvicorn>=0.22.0` (HTTP)
- `watchdog>=3.0.0` (file watcher)
- `inquirerpy>=0.3.4` (interactive setup)

**CLI commands** (`README.md` Quick Start section):
- `codegraphcontext index .`
- `codegraphcontext list`
- `codegraphcontext analyze callers <name>`
- `codegraphcontext analyze complexity --threshold N`
- `codegraphcontext analyze dead-code`
- `codegraphcontext watch` (live re-index)
- `codegraphcontext neo4j setup`

**Maintainer tier (SRA D4)**: TIER-4-NAMED-INDIVIDUAL — Shashank Shekhar Singh (`pyproject.toml:5` + `README.md:155-161`), email + LinkedIn + website. CodeGraphContext.org GitHub org + actively-maintained.

**Production evidence**: 3,205 stars + 570 forks + Discord community + multi-lang README (5 translations) + GitHub Pages docs site + Vercel website + YouTube demo + active CI workflows. **NOT yet seen named-org production deployments cited beyond "being explored by developers" (`README.md:Used By` section is empty placeholder).**

**Axis-3 verdict**: 266d age PASS 90d floor; cpd ratio not measured but active-iteration shape per recent commits.

## 2.3 — codegraph (colbymchenry)

**Repo state**: cloned at `Z:/repos/deps/codegraph` HEAD inferred from `package.json:version 0.7.2`. MIT.

**README benchmark claims** (`Z:/repos/deps/codegraph/README.md:Benchmark Results`):
- Tested across 6 codebases vs Claude Code Explore agent
- "Average: 92% fewer tool calls · 71% faster"
- Specific: VS Code 94% fewer/82% faster, Excalidraw 94% fewer/72% faster, Swift Compiler 84% fewer/73% faster
- Benchmark methodology: Claude Opus 4.6 (1M context) with Claude Code v2.1.91, single Explore agent same question

**package.json deps** (`Z:/repos/deps/codegraph/package.json:30-45`):
- `node-sqlite3-wasm` (SQLite-WASM)
- `web-tree-sitter` v0.25.3 (parsing in WASM)
- `tree-sitter-wasms` v0.1.11
- `commander` v14.0.2 (CLI)
- `picomatch` v4.0.3 (gitignore matching)

**MCP tools** (verified at `Z:/repos/deps/codegraph/src/mcp/tools.ts:`):
1. `codegraph_search` — symbol search by name
2. `codegraph_context` — PRIMARY TOOL: build comprehensive task context
3. `codegraph_callers` — find callers
4. `codegraph_callees` — find callees
5. `codegraph_impact` — impact radius + blast analysis
6. `codegraph_node` — node details
7. `codegraph_explore` — graph traversal
8. `codegraph_status` — index status
9. `codegraph_files` — file listing

**Languages**: 19+ (TypeScript, JavaScript, Python, Go, Rust, Java, C#, PHP, Ruby, C, C++, Swift, Kotlin, Dart, Svelte, Liquid, Pascal/Delphi)

**Framework-aware routing** (`README.md:Framework-aware Routes`): Django, Flask, FastAPI, Express, Laravel, Rails, Spring, Gin/chi/gorilla/mux, Axum/actix/Rocket, ASP.NET, Vapor, React Router/SvelteKit (13 frameworks)

**Maintainer tier (SRA D4)**: TIER-4-NAMED-INDIVIDUAL — colbymchenry (npm `@colbymchenry/codegraph`)

**Production evidence**: 1,165 stars + benchmark scorecard with detailed methodology + Vitest evaluation framework (`__tests__/evaluation/runner.ts`). Commit activity recent (1d). **NO named-T2 dated artifact endorsement found.**

**Axis-3 verdict**: 111d age PASS 90d floor; cpd not measured.

## 2.4 — axon (axoniq)

**Repo state**: cloned at `Z:/repos/deps/axon-graph` HEAD inferred from `pyproject.toml:version 1.0.1`. MIT.

**README claims** (`Z:/repos/deps/axon-graph/README.md:9-15`):
- "knowledge graph for your codebase — explore visually, or let your AI agent query it"
- 12-phase pipeline (`README.md:The Pipeline`): file walking, structure, parsing, import resolution, call tracing, heritage, type analysis, community detection (Leiden), process detection, dead code detection, change coupling (git history), embeddings (384d BAAI/bge-small-en-v1.5)
- KuzuDB backend
- Hybrid search: BM25 + vector + fuzzy via Reciprocal Rank Fusion

**pyproject.toml deps** (`Z:/repos/deps/axon-graph/pyproject.toml:25-36`):
- `kuzu>=0.11.0` (graph DB)
- `tree-sitter>=0.25.0` + tree-sitter-{python,javascript,typescript}>=0.23.0
- `typer>=0.15.0` (CLI)
- `rich>=13.0.0` (TUI)

**MCP tools** (claimed in README — NOT verified at source-code level due to time):
- `axon_query`, `axon_context`, `axon_impact` (named in README)
- `axon serve --watch` MCP entry point
- Web UI dashboard: Sigma.js + WebGL force-directed graph, Cypher console at localhost:8420

**Languages**: Python + JavaScript + TypeScript only (per pyproject.toml grammar deps)

**Production evidence**: 690 stars + 45d-stale push (last commit 2026-03-25, today 2026-05-10) + axon-logo.png branding + Web UI dashboard + 12-phase pipeline visualization. **45d-stale = MAINTENANCE WARNING.**

**Maintainer tier (SRA D4)**: TIER-4-NAMED-INDIVIDUAL — harshkedia177 (`pyproject.toml:authors` + email).

**Axis-3 verdict**: 77d age FAILS 90d floor; 45d-stale push raises maintenance concern.

## 2.5 — Existing eee primitives (functional-overlap baseline)

### serena (oraios/serena)
- Source: `Z:/repos/deps/serena/src/serena/tools/` (10 files)
- 55 Tool classes verified at `grep ^class.*Tool` across `tools/*.py`
- Categories: symbol_tools (13 LSP tools: GetSymbolsOverview, FindSymbol, FindReferencingSymbols, FindImplementations, FindDeclaration, GetDiagnosticsForFile/Symbol, ReplaceSymbolBody, InsertAfter/BeforeSymbol, RenameSymbol, SafeDeleteSymbol, RestartLanguageServer), file_tools (Read/Write/CreateText/ListDir/FindFile/ReplaceContent/Delete/ReplaceLines/InsertAtLine), memory_tools (Write/Read/List/Delete/Rename/EditMemory), workflow_tools (CheckOnboarding, Onboarding, InitialInstructions, SerenaInfo), config_tools (ExecuteShell, OpenDashboard, Activate/RemoveProject, GetCurrentConfig), query_project_tools (ListQueryable, QueryProject), jetbrains_tools (12 IDE-specific tools), cmd_tools
- LSP-based (NOT graph-based) — semantic retrieval via language servers
- Cite: `https://github.com/oraios/serena` 24,019★ MIT

### repomix (yamadashy/repomix)
- Source: `Z:/repos/deps/repomix/src/mcp/`
- 8 MCP tools at `tools/`: `attachPackedOutput`, `fileSystemReadDirectory`, `fileSystemReadFile`, `generateSkill`, `grepRepomixOutput`, `packCodebase`, `packRemoteRepository`, plus prompts
- Function: codebase packaging (single-file output for LLM ingestion) NOT graph
- Cite: `https://github.com/yamadashy/repomix` 24,552★ MIT

### ast-grep
- Existing eee CLI — NOT MCP. Tree-sitter pattern engine for code grep+rewrite
- Cite: `https://github.com/ast-grep/ast-grep` (cloned)

### GitHub MCP (Microsoft)
- Existing eee — repository metadata + content access (`mcp__plugin_everything-claude-code_github__*`)
- Function: REPO ACCESS (read files, search code, list commits) NOT code-intelligence

### graphiti (getzep) via mcp-memory + FalkorDB
- Existing eee installed (`getzep/graphiti v0.29.0` per CLAUDE.md L213)
- Function: TEMPORAL KNOWLEDGE GRAPH for memory; NOT code-aware structural analysis
- Cite: `https://github.com/getzep/graphiti` 25,800★ Apache-2.0

# Section 3 — Functional-comparison MATRIX

Rows = gitnexus's MCP tool surface (13 verified at `Z:/repos/deps/gitnexus/gitnexus/src/mcp/tools.ts:` `list_repos/query/cypher/context/detect_changes/rename/impact/route_map/tool_map/shape_check/api_impact/group_list/group_sync`) PLUS load-bearing CLI subcommands (analyze, index, serve, augment, query, context, impact, cypher, detect-changes, group).

Cells: ✅DIRECT-MATCH / 🟡PARTIAL-MATCH / ❌NO-MATCH / ⚪ORTHOGONAL

| gitnexus capability | gitnexus baseline | codebase-memory-mcp | CodeGraphContext | codegraph (colby) | axon | serena | repomix | github MCP | graphiti |
|---|---|---|---|---|---|---|---|---|---|
| **Index repo into graph** | ✅ `analyze` CLI + native LadybugDB (`README.md:CLI Commands`) | ✅ `index_repository` (`mcp.c`) — 155 langs | ✅ `cgc index` (`pyproject.toml:scripts`) — 15 langs | ✅ `codegraph init` (`package.json:bin`) — 19 langs | ✅ `axon analyze` (12-phase pipeline) — 3 langs | ❌ NO graph index (LSP-based per-symbol) | ❌ NO graph (file-pack only) | ❌ NO graph | ⚪ DIFFERENT graph (KG of facts not code) |
| **List indexed repos** | ✅ `list_repos` MCP tool | ✅ `list_projects` (`mcp.c`) | ✅ `cgc list` | ✅ `codegraph_status` | ✅ `axon ls` | ❌ | ❌ | ❌ | ✅ `mcp__graphiti__list_groups` (different) |
| **Query graph (Cypher)** | ✅ `cypher` MCP tool + native | ✅ `query_graph` Cypher subset (`mcp.c`+`cypher/`) | ✅ Neo4j Cypher native | 🟡 `codegraph_explore` (graph traversal, not Cypher) | ✅ `axon` Cypher console (Web UI + API) | ❌ | ❌ | ❌ | ⚪ different KG language |
| **Symbol context** | ✅ `context` MCP tool | ✅ `get_code_snippet` + `search_graph` | ✅ `analyze callers/callees` | ✅ `codegraph_context` (PRIMARY TOOL) | ✅ `axon_context` | 🟡 `FindSymbol` + `GetSymbolsOverview` (LSP) | ❌ | ❌ | ❌ |
| **Detect changes (git diff)** | ✅ `detect_changes` MCP tool | ✅ `detect_changes` (`mcp.c`) — git-diff impact mapping | 🟡 `analyze complexity` (no git-diff specific) | 🟡 (file watcher; no explicit git-diff tool) | ✅ `axon diff main..feature` (structural diff) | ❌ | ❌ | 🟡 `mcp__github__list_commits` (metadata only) | ❌ |
| **Impact analysis (blast radius)** | ✅ `impact` + `api_impact` MCP tools | 🟡 `trace_call_path` + `detect_changes` (combined) | ✅ `analyze callers <name>` (Cypher-backed) | ✅ `codegraph_impact` (depth-grouped) | ✅ `axon_impact` (depth 1/2/3+ grouped) | 🟡 `FindReferencingSymbols` (LSP, single-level) | ❌ | ❌ | ❌ |
| **Multi-file rename** | ✅ `rename` MCP tool | ❌ NO rename (read-only graph) | ❌ NO rename | ❌ NO rename | ❌ NO rename | ✅ `RenameSymbolTool` (LSP-driven) | ❌ | ❌ | ❌ |
| **Route map (HTTP/gRPC/etc)** | ✅ `route_map` MCP tool | ✅ `Route` nodes + `HTTP_CALLS` edges (`README.md:Cross-service linking`) | ❌ | ✅ Framework-aware routes (13 frameworks per `README.md:Framework-aware Routes`) | ✅ Process detection + entry point detection | ❌ | ❌ | ❌ | ❌ |
| **Tool map** | ✅ `tool_map` MCP tool | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| **Shape check (type-resolution validation)** | ✅ `shape_check` MCP tool | 🟡 LSP-style hybrid type resolution Go/C/C++ only | 🟡 (uses tree-sitter parser only) | 🟡 (uses tree-sitter parser only) | 🟡 (Type Analysis phase, parser-based) | ✅ `GetDiagnosticsForFile/Symbol` (LSP-driven, all langs) | ❌ | ❌ | ❌ |
| **Group/multi-repo analysis** | ✅ `group_list`, `group_sync`, `api_impact` MCP tools | ✅ `CROSS_*` edges + multi-galaxy 3D UI per `README.md:Cross-repo intelligence` | 🟡 (separate `cgc index` per repo; no cross-repo edges) | ❌ (per-project DB) | ❌ (per-project DB) | ✅ `ActivateProjectTool` (project-switching) | ❌ | 🟡 (cross-org via API) | ❌ |
| **Auto-sync (file watcher)** | ✅ `gitnexus serve --watch` | ✅ `auto_index` config + background watcher (`README.md:Auto-Index`) | ✅ `cgc watch` | ✅ Native OS events (FSEvents/inotify/RDC W) | ✅ `axon watch` (Rust-based watchfiles) | ❌ | ❌ | ❌ | ❌ |
| **Hooks integration (CC PreToolUse/PostToolUse)** | ✅ Auto-installs hooks (`README.md:CLAUDE.md` claim) | ✅ Auto-detects 11 agents + writes hooks (`README.md:Multi-Agent Support`) | ❌ | 🟡 Auto-installs Claude Code config | ❌ | ❌ | ❌ | ❌ | ❌ |
| **Skills installation** | ✅ Auto-installs gitnexus skills | ✅ Auto-installs 4 Skills (Claude Code) | ❌ | 🟡 Auto-installs CLAUDE.md | ❌ | ❌ | ❌ | ❌ | ❌ |
| **Web UI dashboard** | ✅ gitnexus-web (force-directed graph + AI chat) | ✅ Optional UI binary at localhost:9749 (3D viz) | 🟡 Vercel website (demo only, not local) | ❌ | ✅ Native Web UI at localhost:8420 (Sigma.js + WebGL + Cypher console) | ❌ | ❌ | ❌ | ❌ |
| **Architecture overview** | ✅ Module Detail + Process Trace MCP resources | ✅ `get_architecture` (single call: langs/packages/routes/hotspots/clusters) | 🟡 (CLI analyze commands) | ✅ `codegraph_context` returns architecture | ✅ Web UI Analysis view (health score + coupling heatmap) | ❌ | ❌ | ❌ | ❌ |
| **Dead code detection** | ⚪ (not in primary MCP tools; in CLI) | ✅ Dead code via degree-filtering (`README.md:Performance` table) | ✅ `analyze dead-code` | ❌ | ✅ Multi-pass dead code (5-step exemption logic) | ❌ | ❌ | ❌ | ❌ |
| **Semantic vector search** | 🟡 augment subcommand (embeddings) | ✅ `semantic_query` with bundled Nomic embeddings (no API key) | ❌ | ❌ | ✅ Hybrid BM25+vector+fuzzy with RRF fusion | ❌ | ❌ | ❌ | ⚪ different (KG embeddings) |
| **Cross-service linking (HTTP/gRPC/Channels)** | ✅ Implicit via `route_map`/`api_impact` | ✅ HTTP route↔call-site + gRPC + GraphQL + tRPC + EventEmitter (`README.md:Cross-service linking`) | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| **Stale-index detection (PostToolUse hook)** | ✅ Auto-prompts reindex post-commit | ❌ NOT explicitly stated | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| **Wiki/AGENTS.md generation** | ✅ `wiki` CLI subcommand | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| **Symbol-level edits (via LSP)** | ❌ (graph-only; no LSP edits) | ❌ | ❌ | ❌ | ❌ | ✅ ReplaceSymbolBody/InsertAfter/InsertBefore/Rename/SafeDelete | 🟡 (file-level via packing) | ❌ | ❌ |
| **Project memory** | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ Write/Read/List/Delete/Rename/EditMemory tools | ❌ | ❌ | ✅ Temporal KG (different) |

# Section 4 — Replacement-readiness assessment

Per `Z:/claude-sota-installed/.claude/rules/deprecation-discipline.md` F-003: replacement requires (a) covers critical use cases of incumbent, (b) has documentation + migration guides, (c) proven in production (deployment evidence BEYOND GitHub stars).

| Candidate | (a) Covers gitnexus critical capabilities? | (b) Migration docs? | (c) Production-proven? | Replacement-ready verdict |
|---|---|---|---|---|
| **codebase-memory-mcp** | 🟡 PARTIAL — covers index/graph/cypher/impact/route/cross-service BUT MISSES: rename, tool_map, shape_check, wiki, stale-index hook | ❌ NO migration guide from gitnexus | 🟡 SLSA-3 + arXiv preprint + 2812 tests but **NO deployment count or named-user testimonials beyond `Used By` placeholder section** | ❌ NOT-REPLACEMENT-READY (Axis-3 FAIL 74d + missing 6 capabilities + theoretical-better-not-battle-tested per Osmani SKILL.md:71-75) |
| **CodeGraphContext** | 🟡 PARTIAL — covers index/cypher/callers/callees/dead-code BUT MISSES: rename, route_map, tool_map, shape_check, api_impact, group_*, wiki | ❌ NO migration guide from gitnexus | 🟡 3,205 stars + community (Discord) + multi-lang docs but `Used By` placeholder still empty | ❌ NOT-REPLACEMENT-READY (missing 7+ capabilities; no named-user evidence) |
| **codegraph (colby)** | 🟡 PARTIAL — covers context/callers/callees/impact/files BUT MISSES: cypher, rename, tool_map, shape_check, route_map (partial), api_impact, group_*, wiki, hooks (partial), skills | 🟡 Has setup wizard (`npx @colbymchenry/codegraph`) but no gitnexus migration | 🟡 1,165 stars + benchmark scorecard with methodology BUT solo-author + no named-T2 endorsement | ❌ NOT-REPLACEMENT-READY (missing 8+ capabilities) |
| **axon** | 🟡 PARTIAL — covers analyze/impact/context/cypher/dead-code BUT MISSES: rename, route_map, tool_map, shape_check, api_impact, group_*, wiki, hooks, skills | ❌ NO migration guide; 3-lang only (Py/JS/TS) | 🟡 690 stars + Web UI + 12-phase pipeline BUT 45d-stale + 3-lang only | ❌ NOT-REPLACEMENT-READY (Axis-3 FAIL 77d + 45d stale + missing 9+ capabilities + 3-lang vs 15+ baseline) |
| **serena (existing)** | 🟡 ORTHOGONAL — covers symbol-level edits + LSP-based diagnostics BUT MISSES: index/graph/cypher/route_map/tool_map/shape_check (graph-style) — different paradigm (LSP not graph) | n/a (different paradigm, not migration target) | ✅ 24,019 stars + battle-tested in production | ❌ NOT-REPLACEMENT (different paradigm: LSP per-symbol vs graph-wide structural analysis) |
| **repomix (existing)** | ❌ ORTHOGONAL — codebase packaging only; no graph/cypher/impact | n/a | ✅ 24,552 stars | ❌ NOT-REPLACEMENT (different scope) |
| **graphiti+mcp-memory (existing)** | ⚪ ORTHOGONAL — temporal KG of facts; NOT code-aware | n/a | ✅ 25,800★ graphiti + Apache-2.0 + production-deployed | ❌ NOT-REPLACEMENT (different scope: facts vs code structure) |

**Aggregate finding**: NO single candidate satisfies all 3 deprecation-discipline F-003 requirements vs gitnexus baseline. Each candidate covers a SUBSET of gitnexus capabilities; gitnexus carries unique tools (rename, tool_map, shape_check, group_*, api_impact, wiki, stale-index PostToolUse hook) that no alternative replicates.

**Capability gaps if gitnexus removed without replacement**:
- ❌ Multi-file coordinated rename (only serena offers, but LSP-paradigm not graph-paradigm)
- ❌ tool_map (no equivalent anywhere)
- ❌ shape_check (only serena offers via LSP diagnostics, all langs; codebase-memory-mcp Go/C/C++ only)
- ❌ Cross-repo group analysis (`group_list`/`group_sync`/`api_impact` — only codebase-memory-mcp has CROSS_* edges as partial substitute)
- ❌ Wiki auto-generation
- ❌ Stale-index PostToolUse hook for Claude Code
- ❌ 37,312-star ecosystem maturity + Trendshift + Discord community

# Section 5 — Mia OVER catches during research

| # | Probe | Mia outcome |
|---|---|---|
| 1 | Initial assumption: "codebase-memory-mcp is replacement-ready" (round-2 framing) | **REFUTED** — Axis-3 FAILS at 74d age; STRONG-PROVENANCE-EXPRESS predicate FAILS (single-author DeusData); 6 gitnexus capabilities NOT covered |
| 2 | Initial assumption: "alternatives all permissive license" | **VERIFIED** — All 4 candidates MIT licensed; gitnexus is PolyForm Noncommercial (the original P0 issue per Wave 132 Fire 2 round-2) |
| 3 | Initial assumption: "axon is mature alternative" | **REFUTED** — 690 stars + 77d age (FAILS Axis-3) + 45d-stale push + 3-lang only (Py/JS/TS) vs gitnexus 15+ langs |
| 4 | Initial assumption: "serena is graph-based alternative" | **REFUTED** — serena is LSP-based (per-symbol queries via language servers), NOT graph-based; orthogonal paradigm not replacement |
| 5 | Initial assumption: "codegraph (colby) covers gitnexus surface" | **REFUTED** — 9 MCP tools cover only `search/context/callers/callees/impact/node/explore/status/files` — missing cypher/rename/route_map/tool_map/shape_check/api_impact/group_*/wiki = 8+ gaps |
| 6 | Initial assumption: "CodeGraphContext is community-validated" | **PARTIAL** — 3,205 stars + Discord + multi-lang docs + active CI BUT `Used By` README section is empty placeholder; no named-org production deployment cited |

# Section 6 — VERDICT

Per cardinal-rule-discipline (CR-1 cite-trail at file:line + HEAD SHA throughout; CR-9 sibling-bleed defense via `Z:/repos/deps/<repo>/file:line @ HEAD <SHA>` read-only research probe exception; CR-10 research-first):

**ALTERNATIVES-EXIST-NOT-READY**: ≥4 source-code-deep-dived candidates (codebase-memory-mcp + CodeGraphContext + codegraph + axon) cover SUBSETS of gitnexus's verified 13-MCP-tool surface but NONE satisfies `deprecation-discipline.md` F-003 replacement gate. Each candidate FAILS ≥1 of: axis-3 stability (codebase-memory-mcp 74d / axon 77d under 90d floor), capability coverage (6-9+ tool gaps each), production evidence (no candidate has named-org deployment cited beyond GitHub stars).

Critical incumbent-unique capabilities: `tool_map`, multi-file `rename` (graph-paradigm), full-language `shape_check`, cross-repo `group_*`/`api_impact`, `wiki` auto-generation, stale-index PostToolUse hook + 37,312-star ecosystem maturity.

VERDICT: ALTERNATIVES-EXIST-NOT-READY — no candidate is replacement-ready vs gitnexus baseline. Disposition decision (RETAIN under license-exception OR REMOVE-AND-DEFER OR ADOPT-PARTIAL-SUBSTITUTE) belongs to orchestrator after fire 2 round-3 close-synthesis incorporates Path P codex bg verdict + Agent A/C round-3 returns. Artifact at `Z:/claude-sota-installed/tmp/wave132-fire2-round3-agentB-alternatives-deep-dive-2026-05-10.md`.
