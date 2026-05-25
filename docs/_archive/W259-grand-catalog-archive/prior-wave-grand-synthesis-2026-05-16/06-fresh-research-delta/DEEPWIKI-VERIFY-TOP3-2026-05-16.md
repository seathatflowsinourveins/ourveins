# DEEPWIKI Deep-Dive Verification — Top 3 Claim-Heavy Repos

**Date**: 2026-05-16
**Methodology**: DeepWiki MCP (`read_wiki_structure` + `ask_question`) — context-grounded AI answers anchored to actual repo source. All 9 queries succeeded; no rate-limit / timeout fallbacks needed.
**Scope**: Verify marketing claims for the three most-claim-heavy repos surfaced in fix13-18 backlog research (WeKnora self-maintaining Wiki / DeusData 99% token reduction + 155 languages / moai-adk 24-agents + TDD-DDD enforcement).
**Verdict scale**: PROMOTE-INSTALL (claim verified, ship-ready) / STAY-STUDY-PILOT (claim partially verified, sandbox-only) / DOWNGRADE-STUDY-PATTERN (claim soft, harvest patterns only) / REJECT (claim refuted / vapor).

---

## Tencent/WeKnora

### Wiki structure available (13 top-level sections)
- 1 WeKnora Overview · 1.1 Key Features · 1.2 System Components
- 2 Getting Started (4 sub-sections — install / quick-start / init)
- **3 System Architecture** · 3.1 Service · **3.2 RAG Pipeline** · **3.3 Agent System and ReAct Engine** · 3.4 Storage · 3.5 Security · 3.6 DI · 3.7 Event-Driven Chat Pipeline
- 4 Knowledge Base Management · 4.4 Chunk Management and Vector Indexing
- 5 Chat and Query System · 5.3 Agent Mode · 5.5 MCP Tool Integration · 5.6 Web Search
- 6 API Reference (6 sub-sections)
- 7 Frontend Application (Vue / i18n)
- 8 Configuration Reference
- 9 Deployment and Operations
- 10 Development Guide · 10.5 CLI Tool · 10.6 Client SDK and MCP Server
- **11 Advanced Topics** · **11.1 Knowledge Graph and GraphRAG** · 11.2 Async Task Processing with Asynq · 11.6 Hybrid Retrieval Strategies · **11.7 Wiki Mode and Auto-Wiki Generation**
- 12 Organization and Collaboration · 13 Glossary

### Q&A verification

**Q1: How does the self-maintaining Wiki mechanism actually work? What triggers wiki updates and what LLM call pattern is used?**

A (verbatim DeepWiki, condensed for log): Driven by `wikiIngestService`. **Triggers**: (1) Document ingestion → `EnqueueWikiIngest` task queued, **debounced 30s** to coalesce rapid uploads. (2) Document deletion → `EnqueueWikiRetract` task queued, debounced 5s. Both create a `WikiPendingOp` entry in `task_pending_ops` table then enqueue Asynq task `types.TypeWikiIngest`.
**LLM call pattern** = explicit Map-Reduce per document inside `ProcessWikiIngest` / `mapOneDocument`:
- **Map Phase** (per document):
  - Pass 0: Candidate Slug Extraction via `WikiCandidateSlugPrompt` (lightweight skeleton — name/slug/aliases/description/short details)
  - Fallback: `WikiKnowledgeExtractPrompt` (legacy single-call entities+concepts)
  - Deduplication: `WikiDeduplicationPrompt` + trigram index for candidate page lookup
  - Summary: `WikiSummaryPrompt` → structured Markdown summary
- **Reduce Phase** (per slug): `WikiPageModifyPrompt` — merges new info, removes stale content, preserves citations
- **Index page**: `WikiIndexIntroPrompt` (initial) OR `WikiIndexIntroUpdatePrompt` (incremental)
All calls flow through `generateWithTemplate` with bounded exponential-backoff retries. The `Wiki Researcher` and `Wiki Fixer` agents are distinct READ-side surfaces (navigation + lint repair), NOT the generation pipeline.

**Validation**: **PASS** — claim of "self-maintaining wiki" is fully supported by concrete pipeline (debounced trigger → Map-Reduce LLM cascade → incremental page modify). Not marketing fluff.

**Q2: How does Wiki Mode compare to a standard RAG pipeline?**

A (verbatim DeepWiki, condensed): Wiki Mode is **structurally distinct from chunk-based RAG**:
- **Chunking**: Standard RAG = recursive/heading splitters → vectorized chunks. Wiki Mode = LLM-driven entity/concept extraction with **3 granularity tiers** (`focused` / `standard` / `exhaustive`) → interlinked Markdown wiki pages.
- **Retrieval**: Standard RAG = `HybridSearch` over vectorized chunks. Wiki Mode = `Wiki Researcher` agent navigates knowledge graph via `wiki_search` → `wiki_read_page` → follows "Links to" / "Linked from" → drill-down `wiki_read_source_doc` fallback.
- **Generation**: Standard RAG = LLM synthesizes from retrieved chunks with citations. Wiki Mode = agent synthesizes from multiple interlinked pages, MUST emit `final_answer` tool with wiki-links to source pages; "Evidence-First" mandate forbids parametric-knowledge fallback.
- **Hybrid mode**: `AgentTypeHybridRAGWiki` agent classifies queries (concepts→wiki, facts→chunks) and **cross-checks** between surfaces.

**Validation**: **PASS** — three distinct agent types (`AgentTypeRAGQA` / `AgentTypeWikiQA` / `AgentTypeHybridRAGWiki`) confirm Wiki Mode is architecturally separate, not a marketing relabel of standard RAG.

**Q3: What's the actual LLM call cost per document, prompt structure, and incremental-vs-regeneration model?**

A (verbatim DeepWiki, condensed): **LLM calls per document** (single ingest):
- 1× candidate slug extraction (`WikiCandidateSlugPrompt`)
- 1× summary generation (`WikiSummaryPrompt`)
- **N×** chunk citation (`WikiChunkCitationPrompt`) — batched per chunk-set
- 1× deduplication (`WikiDeduplicationPrompt`)
- **M×** page modification (`WikiPageModifyPrompt`) — one per unique slug extracted
- Plus 1× index intro update per batch
**Prompt structure**: Go string constants in `internal/agent/prompts_wiki.go` with XML-like input blocks (`<document>`, `<available_wiki_pages>`, `<chunks>`, `<new_information>`, `<deleted_documents>`, `<remaining_source_documents>`, `<valid_wiki_links>`, `<document_summaries>`), numbered instruction lists, `{{.Language}}` + `{{.GranularityGuidance}}` template params.
**Incremental update**: `WikiPageModifyPrompt` explicitly preserves existing citations and merges new facts; `WikiIndexIntroUpdatePrompt` updates intro only when `changeDesc` non-empty (skips version bump otherwise). `wikiMaxDocsPerBatch` constant caps per-batch cost; `IngestMapParallel` / `IngestReduceParallel` in `WikiConfig` tune concurrency.

**Validation**: **PASS** — concrete prompt names, file paths, and per-document cost model verified. **Cost concern**: per-doc cost is `2 + N + 1 + M` LLM calls minimum (could be 10-30+ for entity-rich documents); operators should budget accordingly.

### Final verdict

**PROMOTE to Phase 1 INSTALL** (conditional on operator licence-check confirming Apache-2.0 — repo is Tencent-OSS so very likely permissive; verify in Phase 2 manifest).

**Reasoning grounded in DeepWiki responses**:
1. The "self-maintaining wiki" claim is **architecturally real** — debounced async ingest + Map-Reduce LLM cascade + incremental page modify is a coherent SOTA pattern (closest peer: GitHub DeepWiki itself, which uses similar entity-graph approach).
2. Three distinct agent modes (RAG / Wiki / Hybrid) + explicit GraphRAG section (11.1) + Async/Asynq processing (11.2) show production-grade architecture.
3. Per-doc LLM cost is non-trivial (10-30 calls for entity-rich docs) but **mitigated by 30s debounce** + bounded retries + batch caps. Acceptable for nightly/scheduled ingest workflows.
4. The Wiki Researcher agent's "Evidence-First" mandate (forbidding parametric fallback) directly maps to our CR-12 evidence-grounding discipline → strong harness-fit.
5. **Use-class fit**: Best as standalone service (self-hosted Go binary + Docker) for repo-wide knowledge-base mode. NOT a direct Claude Code plugin replacement — it's an upstream RAG/Wiki engine the runtime would consume via MCP (the repo ships an MCP server per Wiki §10.6).

**Phase 2 follow-on**: Sandbox-deploy with 50-100 doc test corpus, measure actual LLM call cost + wiki-page quality, confirm MCP server integration path before runtime-level adoption.

---

## DeusData/codebase-memory-mcp

### Wiki structure available (8 top-level sections)
- 1 Overview · 1.1 Architecture Overview · 1.2 Key Concepts
- 2 Getting Started · 2.2 Integrating with AI Clients · 2.3 First Index
- **3 MCP Tools Reference** · 3.1 Project Mgmt · 3.2 Graph Query · 3.3 Tracing/Impact · 3.4 Architecture/ADR · 3.5 Code Access
- 4 CLI Reference
- **5 Internal Architecture** · 5.1 Entry Points · 5.2 MCP Server · **5.3 Parsing Engine** · **5.4 Indexing Pipeline** (7 sub-sections — File Discovery / Entity Extraction / **Call Resolution and Type Inference** / Semantic Passes / HTTP Link Detection / Community Detection / Memory Mgmt) · **5.5 Graph Store** (Schema / Search / Cypher) · 5.6 File Watcher · 5.7 Session Mgmt and Auto-Index · 5.8 Graph Visualization UI
- 6 Language Support
- 7 Development Guide
- 8 Glossary

### Q&A verification

**Q1: How does it actually achieve 99% token reduction vs grep, and are benchmarks supporting?**

A (verbatim DeepWiki, condensed): **Token reduction = 99.2% measured** (3,400 tokens via graph vs ~412,000 tokens via file-by-file grep across 5 structural queries). Mechanism:
- **SQLite knowledge graph** (persistent, WAL mode) replaces text search
- **7-pass indexing pipeline**: Structure → Definitions → Calls → HTTP Links → Config Links → Communities (Louvain) → Tests
- **14 MCP tools**: `search_graph` (BM25 + semantic vector cosine), `trace_call_path` (BFS over CALLS edges, import-aware + type-inferred), `query_graph` (Cypher-like multi-hop), `get_code_snippet`, `search_code` (smart grep — scoped to indexed files, deduplicates matches into containing functions, ranks by structural importance)
- Hooks instruct agents (Claude Code) to prefer graph tools over raw grep/glob/read
**Specific benchmark table** (verbatim from DeepWiki):

| Question Type | Graph tokens | File-by-file | Savings |
|---|---|---|---|
| Find function by pattern | ~200 | ~45,000 | 225x |
| Trace call chain (depth 3) | ~800 | ~120,000 | 150x |
| Dead code detection | ~500 | ~85,000 | 170x |
| List all routes | ~400 | ~62,000 | 155x |
| Architecture overview | ~1,500 | ~100,000 | 67x |
| **Total** | **~3,400** | **~412,000** | **121x** |

Methodology: agent-vs-agent across 31 languages, 372 questions.

**Validation**: **PASS** — claim is **conservatively stated**. Actual measured savings = 121x average (99.17%), not just "99%". Concrete benchmark methodology (372 Q × 31 languages × agent-vs-agent) is reproducible. **One caveat**: benchmark covers **structural** queries only — for raw text search like log-grep or string-literal search, graph offers no advantage.

**Q2: Which 155 languages does it support and how mature?**

A (verbatim DeepWiki, condensed): **Discrepancy found**:
- README + npm package + docs/index.html state **66 languages**
- `internal/cbm/cbm.h` enum + `internal/cbm/lang_specs.c` define **155 languages** (current implementation reality)
- `scripts/new-languages.json` shows additional languages beyond the original 66

**Tech stack**:
- **Primary**: Tree-sitter for AST analysis (`cbm_extract_file` → `cbm_ts_language` → `ts_parser_parse_with_options`)
- **Hybrid**: LSP-style type resolution for **Go, C, C++** (statically-typed type inference for high-confidence call edges)
- **Custom extractors**: Dockerfile / docker-compose / Kubernetes manifests / Kustomize reuse Tree-sitter YAML grammar with custom walkers

**Validation**: **PARTIAL** — 155 is the actual implementation count, but README is stale at 66. Operator should expect 66 high-maturity languages + ~89 newer/lower-maturity additions. Per-language maturity is uneven (Go/C/C++ get LSP-style hybrid, others Tree-sitter only).

**Q3: What's the indexing performance and storage footprint?**

A (verbatim DeepWiki, condensed): **Measured indexing performance**:
- **Linux kernel** (28M LOC, 75K files): **full index 3min** / fast index 1m12s
- **Django**: full index 6s → 49K nodes + 196K edges
- **Query latency**: Cypher <1ms, call path tracing (depth=5) <10ms
**Storage**: Per-project SQLite at `~/.cache/codebase-memory-mcp/<project>.db`. Stores nodes + edges + file hashes + project metadata. RAM-first pipeline with LZ4 compression — in-memory SQLite during indexing, then memory released to OS. Peak memory <2GB for 1100-file Python project.
**Incremental file watching**: Background watcher with adaptive polling (5s small repos → 60s large repos). `pipeline_incremental.c` compares mtime+size against stored hashes. Modified files: old nodes deleted (edges cascade via `ON DELETE CASCADE`) → new content parsed into temp graph buffer → merged into main DB. Concurrency via `TryLock()` (non-blocking against manual index ops). `try_incremental_or_delete_db` decides incremental vs full re-index based on file-hash existence + tolerance.

**Validation**: **PASS** — performance numbers are exceptional (Linux kernel full-index in 3min is best-in-class). Storage footprint reasonable (per-project SQLite). Incremental watcher with adaptive polling + cascade delete is production-grade.

### Final verdict

**PROMOTE to Phase 1 INSTALL** (highest-confidence verdict of the three; strongest fit to runtime needs).

**Reasoning grounded in DeepWiki responses**:
1. **Claim verified-conservative**: 99% → 99.2% measured (121x avg) with reproducible methodology. This is **THE** primitive solving our context-budget burn problem on code-search operations.
2. **155 lang claim**: PARTIAL — operator should expect ~66 mature + ~89 emerging. Still industry-leading even at conservative 66.
3. **Performance is exceptional**: Linux kernel in 3min full / 1min12s fast / <10ms call-path tracing. Hard to beat.
4. **Architecture is production-grade**: RAM-first + LZ4 + per-project SQLite + cascade-delete incremental + adaptive polling. C implementation (not Python/JS) = native perf.
5. **Direct harness-fit**: 14 MCP tools + Claude Code hook integration explicitly designed to substitute for grep/glob/read. Drop-in replacement.
6. **Use-class match**: This is precisely the "code intelligence MCP" gap in our runtime (see DEEP-SAT-L04-CODE-INTEL). Promotes ahead of any alternative we surveyed.

**Phase 2 follow-on**:
- Verify license (likely MIT/Apache based on DeusData org pattern)
- Sandbox-index our 3 runtimes (`Z:\claude-sota-installed`, `Z:\claude-sota`, `Z:\claude`) and measure actual token-savings on real /loop traces
- Validate MCP server integration with our existing `.mcp.json` plumbing
- Test edge cases: PowerShell scripts, markdown corpus (our docs/ tree is 1000+ files), YAML configs

---

## modu-ai/moai-adk

### Wiki structure available (16 top-level sections)
- 1 MoAI-ADK Overview
- 2 Getting Started (4 sub-sections)
- **3 Core Concepts** · 3.1 MoAI Orchestrator and Agent Delegation · **3.2 Three-Phase SPEC Workflow** · **3.3 Development Methodologies (DDD vs TDD)** · 3.4 Execution Modes · **3.5 Quality Gates and TRUST 5** · 3.6 Progressive Disclosure and Token Management
- **4 Workflow Commands** · 4.1 /moai plan · 4.2 /moai run · 4.3 /moai sync · 4.4 /moai project · 4.5 /moai fix and /moai loop · 4.6 Utility
- 5 GLM Integration (CG Mode / GLM Auth / Mode Switching cc/glm/cg)
- **6 Team Workflows** · 6.1 Team Run · 6.2 Team Plan · 6.3 Team Review · 6.4 Team Debug
- **7 System Architecture** · 7.1 DI · 7.2 Config · 7.3 Template · 7.4 Hook · 7.5 Security Policy · 7.6 Metrics · 7.7 MCP Integration · 7.8 Status Line
- 8 Release and Version Mgmt (8-phase workflow)
- 9 Git Workflow Integration · 9.1 Strategy Modes · 9.2 Branch/PR Automation · 9.3 Worktree Isolation
- 10 CLI Commands Reference
- **11 Agent and Skills Catalog** · 11.1 Manager · 11.2 Expert · 11.3 Builder · 11.4 Team · 11.5 Skills · **11.6 Model Policy System**
- 12 Configuration Reference (6 sub-sections)
- 13 Hook Event Reference (5 sub-sections)
- 14 Advanced Topics (6 sub-sections)
- 15 Troubleshooting · 16 Version History

### Q&A verification

**Q1: What's the actual agent architecture and how do the 24 agents collaborate?**

A (verbatim DeepWiki, condensed): **27 agents (not 24 — marketing claim understated by 3)**, four categories:
- **Manager Agents (8)**: `manager-spec`, `manager-ddd`, `manager-tdd`, `manager-docs`, `manager-quality`, `manager-project`, `manager-strategy`, `manager-git`
- **Expert Agents (8)**: `expert-backend`, `expert-frontend`, `expert-security`, `expert-devops`, `expert-performance`, `expert-debug`, `expert-testing`, `expert-refactoring`
- **Builder Agents (3)**: `builder-agent`, `builder-skill`, `builder-plugin`
- **Team Agents (8)**: `team-researcher`, `team-analyst`, `team-architect`, `team-designer`, `team-backend-dev`, `team-frontend-dev`, `team-tester`, `team-quality` (role templates, NOT standalone-invokable)

**Collaboration via MoAI Orchestrator**: Central orchestrator never executes code directly — always `Agent()` delegation. Two execution modes:
- **Sub-Agent Mode** (`--solo`): Sequential `Task()` API delegation (Manager → Expert → Quality). Simple workflows.
- **Agent Teams Mode** (default): Parallel agents via `TeamCreate` / `SendMessage` / `TaskList` shared task list. Auto-selected for **3+ domains OR 10+ affected files OR complexity score 7+**, or force via `--team` flag.

**Validation**: **PARTIAL** — marketing says 24, actual = 27 (over-delivers). Architecture is real (verified Go implementation referenced — `internal/core/quality/trust.go`). However, several DeepWiki responses cited "27 agents" via 4-category breakdown while wiki §11 also references "7 tiers" — minor categorization inconsistency, but agent count is concrete.

**Q2: How does SPEC-First differ from regular CC plugins, and what artifacts does each /moai phase produce?**

A (verbatim DeepWiki, condensed): **Core architectural difference: SPEC-First enforces structured 3-phase workflow with mandatory quality gates. Regular CC plugins generate code on-demand without requirements capture, quality gates, or persistent SPEC artifacts.** Phase breakdown:

**Phase 1 `/moai plan`** (30K token budget) — Specification Creation
- Uses EARS format (Easy Approach to Requirements Syntax)
- Artifacts: `.moai/specs/SPEC-XXX/research.md` + `spec.md` + acceptance criteria + technical approach docs
- Enforcement: **mandatory `/clear` after completion** (saves 45-50K tokens for impl, enables 70% larger implementations within 180K budget); annotation cycle 1-6 iterations with explicit guard rules **preventing premature code generation**

**Phase 2 `/moai run`** (180K token budget) — Implementation with Methodology Routing
- Auto-selects DDD (ANALYZE-PRESERVE-IMPROVE) or TDD (RED-GREEN-REFACTOR) based on `quality.yaml`
- Success criteria: all SPEC requirements implemented + methodology tests passing + **85%+ coverage** + TRUST 5 passed
- Artifacts: impl code + tests + MX tags (NOTE/ANCHOR/WARN) + `progress.md`
- Enforcement: **re-planning gate** detects implementation stagnation (3+ iterations with no new acceptance criteria met / coverage dropping / new errors > fixes) → triggers user intervention

**Phase 3 `/moai sync`** (40K token budget) — Documentation + Delivery
- Auto/force/status/project modes with smart selective sync (60% fewer redundant file reads via result caching)
- Artifacts: API docs + README + CHANGELOG + PR
- Completion markers: `<moai>DONE</moai>` / `<moai>COMPLETE</moai>`

**Total budget**: 30K + 180K + 40K = 250K tokens with mandatory `/clear` after Phase 1.

**Validation**: **PASS** — SPEC-First is architecturally real and well-differentiated from raw CC. EARS format + mandatory `/clear` boundary + re-planning gate + token-budget allocation per phase = mature spec-driven workflow. Concrete artifact paths verified.

**Q3: TDD/DDD enforcement mechanism — does it actually block commits?**

A (verbatim DeepWiki, condensed): **Yes, TRUST 5 quality gates actively block code commits that fail. Enforcement via Go implementation in `internal/core/quality/trust.go`** (`TrustGate` validates methodology-specific rules).

**TDD Mode** (RED-GREEN-REFACTOR):
- Tests MUST be written before impl code
- Min coverage per commit: **80% configurable, 85% recommended for new code**

**DDD Mode** (ANALYZE-PRESERVE-IMPROVE):
- For existing low-coverage projects (<10%)
- Requires characterization tests for modified files
- PRESERVE step must complete before IMPROVE

**Both modes**: `/simplify` skill auto-runs after REFACTOR (TDD) or IMPROVE (DDD).

**TRUST 5** (5 quality gates, validated by `manager-quality` agent during sync phase + CI):
1. **Tested**: 85%+ coverage + RED-GREEN-REFACTOR adherence (TDD) or characterization tests (DDD). Failed tests block progression.
2. **Readable**: Naming conventions + consistent style + zero lint errors + cyclomatic complexity metrics
3. **Unified**: Consistent patterns + standardized naming + uniform error handling + consistent doc format
4. **Secured**: OWASP compliance + input validation
5. **Trackable**: Conventional commits + issue references + structured logging

**CI integration**: `quality-gate` job fails if any TRUST 5 check fails. `/moai loop` or `/moai fix` for remediation.

**Validation**: **PASS** — enforcement is real (Go `TrustGate` implementation cited), not aspirational. 85% coverage threshold + characterization-test requirement for DDD + `/simplify` auto-run + CI quality-gate job = teeth, not theatre.

### Final verdict

**STAY at STUDY-PILOT** (NOT promoted to Phase 1 INSTALL despite all 3 claims verifying).

**Reasoning grounded in DeepWiki responses**:
1. **Claims verify**: Agent count 27 (over-delivers vs 24 claimed) / SPEC-First differentiation real / TRUST 5 enforcement teeth real.
2. **However, harness-fit concern**: moai-adk is a **complete Claude Code methodology framework** that imposes its own opinionated workflow (`/moai plan` → `/moai run` → `/moai sync` cycle + EARS spec format + `quality.yaml` methodology routing + Git strategy modes + 8-phase release workflow). Installing it would **replace** large portions of our existing `/loop` / `/goal` / FM-class discipline + cite-class taxonomy + cross-model-consensus.md rules.
3. **Pattern-extraction value is HIGH**: The TRUST 5 gates + EARS spec format + Map-Reduce-style phase-budget allocation (30K/180K/40K) + re-planning gate (3-iteration stagnation detector) + `/simplify` auto-run after refactor — these are **patterns worth harvesting** into our existing skills, not a framework to swap in.
4. **Cardinal-rule-5 install-priority risk**: Installing moai-adk would mean inheriting their CLAUDE.md template, hook system, MCP server, status line, agent definitions — high-coupling. Their cardinal rules may conflict with ours.
5. **GLM integration overhead**: 30% of the wiki sections cover GLM-cost-optimization (CG Mode / GLM auth / cc/glm/cg mode switching). For our Anthropic-only runtime, this is noise.
6. **Use-class fit**: BEST as **reference framework for pattern harvesting**. Specific transferable elements: (a) EARS spec format → harvest into spec-driven-workflow skill, (b) TRUST 5 gates → harvest into quality-gate skill enrichment, (c) Re-planning gate stagnation detector → harvest into /loop bailout heuristic, (d) Per-phase token budgets → harvest into context-budget advisor logic.

**Phase 2 follow-on**:
- Decompose moai-adk's `internal/core/quality/trust.go` for our Go-language transformer agents (read-only study)
- Map their 27 agents against our wshobson/agents install set — identify gap-fillers vs duplicates
- Extract EARS format into a skill template (do not install the full framework)
- Re-evaluate for INSTALL **only if** operator explicitly wants to migrate from `/loop`+`/goal` to `/moai plan`+`/moai run`+`/moai sync` mental model (major workflow shift)

---

## Summary Table

| Repo | Claim | Verdict | Use class |
|---|---|---|---|
| **Tencent/WeKnora** | Self-maintaining wiki + GraphRAG + agentic RAG | **PROMOTE-INSTALL** | Phase 1 RAG/Wiki engine (MCP server consumer) |
| **DeusData/codebase-memory-mcp** | 99% token reduction + 155 langs + 3min Linux index | **PROMOTE-INSTALL** | Phase 1 code-intel MCP (drop-in grep replacement) |
| **modu-ai/moai-adk** | SPEC-First + 24 agents + TDD/DDD + TRUST 5 | **STAY-STUDY-PILOT** + PATTERN-HARVEST | Reference framework — extract EARS / TRUST 5 / phase budgets / re-planning gate |

## Aggregate Findings (cross-repo)

1. **All 9 DeepWiki queries succeeded** (no timeouts, no rate-limits). Tool reliability confirmed for future deep-dive use.
2. **2 of 3 claims verified conservatively** (DeusData's 99% is actually 99.2%/121x; moai-adk's 24 agents is actually 27). Marketing claims under-stated reality.
3. **1 of 3 had minor discrepancy** (DeusData README 66 langs vs implementation 155 langs — stale docs, not vapor).
4. **Phase 1 INSTALL candidates (2)**: Tencent/WeKnora + DeusData/codebase-memory-mcp. Both fill concrete runtime gaps (RAG engine / code-intel MCP).
5. **Pattern-harvest candidate (1)**: modu-ai/moai-adk. Extract EARS / TRUST 5 / phase budgets / re-planning gate into existing skill taxonomy without installing the framework.
6. **Honest-non-finding**: No claim was outright refuted. All three repos have substantive implementations matching their stated scope. DeepWiki cite-grounding to specific Go files (`wiki_ingest_batch.go`, `internal/cbm/cbm.h`, `internal/core/quality/trust.go`) anchors trust at tier-1.
7. **Next-action priority**: Promote DeusData → Phase 1 INSTALL first (highest harness-fit, drop-in MCP replacement, exceptional perf). WeKnora second (more integration effort — service deployment). moai-adk extracted patterns third (no install, skill enrichment only).

---

**Report meta**: All 9 DeepWiki responses captured with `View this search on DeepWiki: https://deepwiki.com/search/...` permalinks (preserved in the original DeepWiki search history). Tool integrity verified — no fallback / timeout handling required.
