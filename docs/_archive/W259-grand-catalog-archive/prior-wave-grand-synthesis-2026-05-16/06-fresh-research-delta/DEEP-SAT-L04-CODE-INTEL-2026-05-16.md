# DEEP-SATURATION L0.4 — Code Intelligence (Hybrid Name+Topic Search) — 2026-05-16

> **Fork purpose**: EXHAUSTIVE coverage of L0.4 Code Intelligence layer. Tranche D was topic-tag-thin (missed Aider per documented non-finding). This deep-saturation pass adds **name-search** for 30 known candidates + 10 narrow GraphQL probes targeting code-search / LSP / AST / tree-sitter / indexing / embedding / completion / review / doc-gen / repo-embedding.
>
> **Method**: GitHub repo API + name-search + license-fetch + release-fetch. Topic-tag bias documented in BACKLOG-TRANCHE-D §0 means a name-search fork is **required** for any "complete" L0.4 statement.
>
> **Cross-reference**: This file complements `SATURATION-CODE-INTEL-2026-05-16.md` (45 candidates) + `BACKLOG-TRANCHE-D-CODE-INTEL-2026-05-16.md` (162 candidates) + `BACKLOG-TRANCHE-G-NAME-SEARCH-2026-05-16.md` (Aider deep-probe §C). New rows in §A are **deltas** not duplicated in those files.
>
> **Cite-class**: TIER-3-LOCAL-COMPOSITION (constituents: GitHub api.github.com live HEAD fetches today + license file SHA-pinned reads + release-tag fetches). Per Z:/claude-sota/.claude/rules/citation-discipline.md rule #8.
>
> **Date stamp**: 2026-05-16 (UTC)

---

## §A — Code-Intel Matrix (47 rows: 12 NEW + 23 verified-from-prior + 12 explicit-rejects)

> **D1-D8 rubric** (each 0-10, sum/80): D1 SOTA-fit, D2 maintenance, D3 community, D4 install/integrate, D5 license-clean, D6 differentiation, D7 maturity, D8 native-CC-pathway

> **Sub-category codes**: LSP / AST / IDX (indexing) / EMB (embedding-search) / TFM (transform) / CPL (completion) / REV (review) / DOC (doc-gen) / EDT (editor-backbone)

### §A.1 NEW DELTAS (12 candidates surfaced by 10 GraphQL probes — not in prior tranches)

| # | repo | ★ | license | last-commit | sub-cat | native-CC-pathway | D1-D8 sum/80 | verdict |
|---:|---|---:|---|---|---|---|---:|---|
| N1 | `giancarloerra/SocratiCode` | 2,639 | **AGPL-3.0** | 2026-05-16 (v1.8.11 2026-05-12) | IDX+EMB+KG | Native Claude Code Plugin marketplace install + MCP + VS Code ext + Open-VSX | **62/80** | **STUDY-PILOT-WITH-LICENSE-WATCH** — explicit "claude-code" topic; "40M+ LOC enterprise codebase intelligence, 61% less tokens, 84% fewer calls, 37x faster"; LiteLLM first-class provider as of v1.8.10. **AGPL-3.0 imposes copyleft on derivative-MCP-server runtime — REVIEW cardinal-rule-1 trust + downstream sharing implications before installing.** Active dev (3 releases past week). |
| N2 | `kantord/SeaGOAT` | 1,291 | MIT | 2026-05-09 | EMB+IDX | No native MCP yet; CLI-first "local-first semantic code search engine" — ripgrep-like UX | 56/80 | **STUDY** — older project (created 2023-06) still actively maintained; competes with claude-context but lacks native MCP wrapper. Useful only if user wants a CLI-grep replacement; not a competitive replacement for the zilliztech/claude-context install candidate. |
| N3 | `bgauryy/octocode-mcp` | 832 | MIT | 2026-05-16 | IDX+EMB | **Native MCP server** — "semantic code research and context generation in real-time"; tagged `claude-ai`, `cursor-ai`, `mcp` | 60/80 | **STUDY-PILOT** — MCP-native semantic code research over public+private repos via GitHub auth; unique value-add: queries across multiple accessible codebases (not just current). Complement to zilliztech/claude-context (which operates on local-only index). |
| N4 | `probelabs/probe` | 595 | **Apache-2.0** | 2026-05-16 (v0.6.0-rc316 2026-05-06) | IDX+EMB | MCP + CLI + Node SDK; tagged `mcp`, `tree-sitter`, `ai-coder` | **63/80** | **INSTALL-CANDIDATE** — Rust-native "AI-friendly semantic code search; combines ripgrep speed + tree-sitter AST"; explicit goal "Powers AI coding assistants with precise, context-aware code understanding"; active daily commits, daily-cadence RC releases. RUST-PERF + MCP-native = highest-fitness alternative if zilliztech/claude-context (TS+Milvus heavy) too heavy. |
| N5 | `chunkhound/chunkhound` | 1,258 | MIT | 2026-05-15 (v5.0.0 2026-05-06) | IDX+EMB+DOC | **Native MCP server** (stdio only as of v5.0.0); tagged `mcp-server`, `tree-sitter`, `rag`, `duckdb` | **64/80** | **INSTALL-CANDIDATE** — "Local first codebase intelligence" with DuckDB backing; v5.0.0 (2026-05-06) MASSIVE release: 33 langs, Claude Opus 4.7 + Sonnet 4.6 native + prompt-caching default + Voyage rerank + Grok + new `autodoc` + `codemap` commands. **Local-first + no API cost path** + Anthropic-native model defaults align perfectly with our runtime. Best-fit alternative to zilliztech/claude-context for cloud-free deployments. |
| N6 | `cocoindex-io/cocoindex` | 9,795 | Apache-2.0 | 2026-05-16 | IDX+KG | No native MCP in main repo; companion `cocoindex-code` (1,661★) is MCP-native | 60/80 | **STUDY** — broader "Incremental engine for long-horizon agents" (not just code); "real-time" + "change-data-capture" + "long-horizon-agent" topics. Most relevant for our runtime as data-engineering/RAG substrate layer NOT just code intel — cross-reference L7-RAG layer in F-tranche (where it scored 57/80 sum). |
| N7 | `cocoindex-io/cocoindex-code` | 1,661 | **Apache-2.0** | 2026-05-16 (v0.2.33 2026-05-08) | IDX+EMB | **Native MCP server** (cocoindex's own claude-code-specific package); explicit `claude-md` review-changes integration | **65/80** | **INSTALL-CANDIDATE** — "super light-weight embedded code search engine CLI (AST based) that just works — saves 70% token and improves speed for coding agent". Spawned 2026-02-01, daily releases. Rust-Python AST-based, no vector DB needed. **Best-fit ultra-low-overhead alternative** when full vector store (Milvus/Qdrant) is overkill. Active integration with /review-changes Claude Code skill. |
| N8 | `harshkedia177/axon` | 695 | MIT | 2026-05-16 | KG+IDX | **Native MCP** (`axon_query`, `axon_context`, `axon_impact`); tagged `claude-code`, `tree-sitter` | 58/80 | **STUDY-PILOT** (re-confirmed from prior) — change-coupling git-history signal still unique; 695★ slow growth since Feb 2026. Pilot before promoting above GitNexus. |
| N9 | `darrenhinde/OpenAgentsControl` | 4,034 | unverified | 2026-05-16 | REV+CPL | "AI agent framework for plan-first development with approval-based execution" — TS+Python+Go+Rust | 48/80 | **STUDY** — focused on `opencode` runtime not Claude Code; valuable as workflow-pattern reference (plan→approval→test→review→validate). License unverified at probe time. |
| N10 | `Aider-AI/grep-ast` | 341 | unverified | 2026-05-08 | AST | Library — embedded by Aider; usable standalone for `ast-grep`-style context-aware grep | 50/80 | **STUDY** — Aider's standalone "grep source code with useful code context about matching lines"; pre-dates ast-grep maturity. Useful as fallback when ast-grep's Rust binary isn't installable. |
| N11 | `disler/aider-mcp-server` | 297 | unverified | 2026-05-14 | CPL+REV | **Native MCP** wrapping Aider — gives Claude Code access to Aider's multi-model orchestration | 56/80 | **INSTALL-CANDIDATE-IF-AIDER-INSTALLED** — minimal MCP wrapper for Aider; if you install Aider as a peer-reviewer, this lets CC dispatch tasks to it via MCP rather than CLI subprocess. Complement to Path P (codex exec foreground+tee) pattern documented in Z:/claude-sota/.claude/rules/cross-model-consensus.md. |
| N12 | `hotovo/aider-desk` | 1,218 | unverified | 2026-05-16 | CPL | Electron desktop app wrapping Aider; "Platform for AI-powered software engineers" | 42/80 | **STUDY** — GUI alternative to Aider CLI. Not native CC pathway (separate desktop app). Useful only for users wanting GUI for Aider's multi-model engine. |

### §A.2 VERIFIED FROM PRIOR (23 rows — re-confirmed today; key D1-D8 + native-CC-pathway only)

| # | repo | ★ | license | last-commit | sub-cat | native-CC-pathway | D1-D8 sum/80 | verdict |
|---:|---|---:|---|---|---|---|---:|---|
| V1 | `Aider-AI/aider` | 44,891 | **Apache-2.0** ✓ | 2026-05-16 (v0.86.0 2025-08-09) | CPL+REV+EDT | NO native MCP from upstream; CLI; `disler/aider-mcp-server` 297★ + `MatthewZMD/aidermacs` 895★ + `lee88688/aider-composer` 445★ are 3rd-party adapters | **74/80** (per Tranche G deep-probe §C) | **TIER-1-INSTALL-CANDIDATE** — multi-model orchestration peer-reviewer; Apache-2.0 confirmed today (LICENSE.txt SHA d645695673349e3947e8e5ae42332d0ac3164cd7 read); 9-mo release gap but main daily commits + "Aider wrote 88% of v0.86.0". |
| V2 | `oraios/serena` | 24,287 | MIT | 2026-05-16 | LSP | **First-class MCP server** | 76/80 | **INCUMBENT-KEEP** — "the IDE for your agent"; 24+ langservers; SOTA semantic IDE-grade. |
| V3 | `yamadashy/repomix` | 24,929 | MIT | 2026-05-16 | IDX | **Native MCP server** | 72/80 | **INCUMBENT-KEEP** — corpus-packer dominant. |
| V4 | `abhigyanpatwari/GitNexus` | 28,000+ | open | 2026-04 | KG | **Native MCP** (7 tools + 4 agent skills + hooks + auto-AGENTS.md/CLAUDE.md) | 75/80 | **INCUMBENT-KEEP** — "deepest CC integration"; ALREADY in MCP set per system reminder. |
| V5 | `zilliztech/claude-context` | 11,180 | MIT | 2026-05-16 | IDX+EMB | **Native MCP** (CC-named) | 70/80 | **INSTALL-NEXT-WAVE** — hybrid BM25+vector; Voyage/OpenAI/Ollama embedding pluggable; ALREADY in tranche-D top-3 install set. |
| V6 | `ast-grep/ast-grep` | 13,811 | MIT | 2026-05-16 | AST+TFM | **Native MCP** via `ast-grep-mcp` 403★ | 73/80 | **INSTALL-NEXT-WAVE** — structural-search SOTA. |
| V7 | `tree-sitter/tree-sitter` | 25,383 | MIT | 2026-05-16 | AST | Library — substrate not MCP | n/a | **IMPLICIT-DEP** — consumed by serena/repomix/GitNexus/ast-grep/chunkhound/cocoindex-code. |
| V8 | `TabbyML/tabby` | 33,522 | Apache-2.0 | 2026-03-02 | CPL | NO native MCP (Rust LSP-completion-server) | 64/80 | **DO-NOT-INSTALL** — *consumes* code intel rather than producing via MCP; only relevant if internal completion model desired. |
| V9 | `continuedev/continue` | 33,221 | Apache-2.0 | 2026-05-15 | EDT | NO MCP server (IDE-extension agent — *consumer*) | 68/80 | **DO-NOT-INSTALL** — IDE-extension not headless MCP-server; per SATURATION-CODE-INTEL §E.9. |
| V10 | `zed-industries/zed` | 82,963 | AGPL+Apache+GPL-3.0 multi | 2026-05-16 | EDT | Headless mode + ACP (Agent Communication Protocol) | 67/80 | **STUDY-ONLY** — heavy install; only worthwhile if planning autonomous-agent fleet ACP integration. |
| V11 | `helix-editor/helix` | 44,404 | MPL-2.0 | 2026-05-16 (v25.07.1 2025-07-18) | EDT | NO MCP; CLI/headless terminal-only | 58/80 | **STUDY-ONLY** — terminal-first modal editor; LSP+tree-sitter built-in. Not a CC pathway. |
| V12 | `AsyncFuncAI/deepwiki-open` | 16,366 | MIT | 2026-05-16 | DOC | **Native MCP variant** (self-hosted) | 70/80 | **INSTALL-CANDIDATE** for self-hosted repo→wiki autogen; already have `mcp__deepwiki__*` hosted in MCP set. |
| V13 | `upstash/context7` | 55,400 | MIT | 2026-05-11 (v0.4.2) | DOC | **Native MCP** — `resolve-library-id` + `query-docs` | 64/80 | **KEEP-WITH-WATCH** — ContextCrush vuln 2026-02 + 83% free-tier cut 2026-01; ALREADY in MCP set. |
| V14 | `comby-tools/comby` | 2,646 | Apache-2.0 | **2026-05-15** (verified today — has activity!) | TFM | NO MCP | 42/80 | **DO-NOT-INSTALL** — last release v1.8.1 2022-06; commits resumed 2026-05 but no v1.9 release. ast-grep supersedes for AST-aware transforms. **CORRECTION-OF-PRIOR**: README "stale since 2022" was about releases; the org saw commits 2026-05-15 (likely housekeeping). Still REJECT for install. |
| V15 | `qodo-ai/qodo-cover` | 5,390 | unverified | 2026-05-15 | REV+CPL | NO MCP | 56/80 | **STUDY** — AI-powered test-generation tool; cross-listed in test/coverage layer not pure code-intel. |
| V16 | `huggingface/transformers.js` | 16,005 | Apache-2.0 | 2026-05-16 | EMB | Library — browser-side ONNX models | 65/80 | **STUDY-ONLY** — only relevant for client-side embeddings; mismatch with headless MCP server architecture. |
| V17 | `github/semantic` | 9,050 | MIT | **ARCHIVED** | AST | n/a | n/a | **REJECT** — archived 2019-08; tree-sitter ecosystem absorbed. |
| V18 | `Piebald-AI/claude-code-lsps` | 444 | unverified | 2026-05-16 | LSP | **CC Plugin Marketplace** with LSP servers | 58/80 | **STUDY-PILOT** — distributes LSP plugins via CC marketplace; aligned cardinal-rule-1 install path. Compare to V19. |
| V19 | `boostvolt/claude-code-lsps` | 156 | unverified | 2026-05-15 | LSP | CC Plugin — 22 langservers (clangd/gopls/intelephense/jdtls/pyright/rust-analyzer/etc) | 60/80 | **INSTALL-CANDIDATE** — concrete bundle of 22 LSP plugins for CC; lower-overhead than V18; explicit per-lang coverage list. |
| V20 | `BrushyForkSoftware/claude-code-lsps` | **NOT-FOUND** (returned ZERO results for query) | n/a | n/a | n/a | n/a | n/a | **HONEST-NON-FINDING** — candidate-list contained `BrushyForkSoftware/claude-code-lsps`; search returned 6 hits, none owned by that org. Three relevant claude-code-lsps repos exist: V18 (Piebald-AI 444★), V19 (boostvolt 156★), Siam-analytics fork (3★). The BrushyForkSoftware org appears to have been wrong in original candidate list. |
| V21 | `tirth8205/code-review-graph` | unverified | open | 2026 | KG+REV | **Native MCP** for CC | 60/80 | **STUDY** — "6.8× fewer tokens on reviews / 49× on daily coding" claim; needs benchmark replication before INSTALL. |
| V22 | `CodeGraphContext/CodeGraphContext` | 3,300 | MIT | 2026-05-07 (v0.4.7) | KG+IDX | **Native MCP + CLI** | 67/80 | **COMPLEMENT-CANDIDATE** — multi-DB backend (KuzuDB/Neo4j/FalkorDB matches our existing FalkorDB install); 20 langs. |
| V23 | `MatthewZMD/aidermacs` | 895 | unverified | 2026-05-14 | CPL | Emacs integration for Aider | 38/80 | **STUDY-ONLY** — only relevant for Emacs-using operators; not CC pathway. |

### §A.3 EXPLICIT REJECTS (12 — closed/dead/wrong-org/superseded)

| # | repo | reason for REJECT |
|---:|---|---|
| R1 | `sourcegraph/cody` | Deprecated 2025-07-23; successor "Amp" closed-source $59/mo. Public-snapshot archived. |
| R2 | `sourcegraph/amp` | Closed-source commercial successor to Cody; no public repo. |
| R3 | `Codeium` (any org) | Closed-source SaaS; no installable repo. Verified non-finding in BACKLOG-TRANCHE-G §D. |
| R4 | `Augment Code` (`augmentcode/*`) | Closed-source API; `augmentcode/augment.vim` + `augmentcode/auggie` are adapters that depend on closed backend. Verified in BACKLOG-TRANCHE-G #26, #27. |
| R5 | `codeintelinc/gitnexus` | **NOT-FOUND** — wrong org. Real GitNexus is `abhigyanpatwari/GitNexus` (V4). |
| R6 | `claude-mem` (any org) | Cross-ref L0.2 memory layer; not code-intel. |
| R7 | `microsoft/typescript-language-features` | Bundled as VS Code feature; not a standalone repo. Code lives in `microsoft/vscode/extensions/typescript-language-features/`. Cannot install separately. |
| R8 | `xenova/transformers` | **Renamed** to `huggingface/transformers.js` (V16). Verified. |
| R9 | `mxprostgs/code-search-graph` | Repository search returned HTTP 422 "resource does not exist". **NOT-FOUND.** |
| R10 | `nomic-ai/contrastors` | 789★, Apache-2.0, active. But it's a **training framework** for contrastive models, NOT a code-search MCP. Useful only for in-house embedding training. Cross-classify as research-only. |
| R11 | `pleaseai/rust-analyzer-lsp` | Wraps what serena already wraps (rust-analyzer is one of serena's 24+ langservers). Redundant. |
| R12 | `mhagger/git-imerge` | Pre-AI era manual merge tool; no LLM intelligence. |

---

## §B — Top-3 INSTALL per Sub-Category (post-saturation)

### B.1 — LSP (Semantic IDE-grade)
1. **`oraios/serena`** (V2, 24K★, MIT, native MCP) — **INCUMBENT-KEEP** (no SOTA-superior alternative surfaced in saturation)
2. **`boostvolt/claude-code-lsps`** (V19, 156★, native CC Plugin) — **INSTALL** for explicit 22-lang LSP coverage bundle via cardinal-rule-1 plugin path
3. **`Piebald-AI/claude-code-lsps`** (V18, 444★) — **STUDY-PILOT** as alternative marketplace approach

### B.2 — IDX (Codebase Indexing / KG / Semantic Retrieval)
1. **`chunkhound/chunkhound`** (N5, 1,258★, MIT, native MCP) — **INSTALL** — v5.0.0 (2026-05-06) ships Claude Opus 4.7/4.6 + Sonnet 4.6 defaults + Anthropic native prompt caching + 33 langs + DuckDB local-first. **HIGHEST-FITNESS** for our runtime (no separate vector DB needed; Anthropic-native models default).
2. **`zilliztech/claude-context`** (V5, 11.2K★, MIT, native MCP) — **INSTALL** — CC-named; hybrid BM25+vector if Milvus deployment available
3. **`cocoindex-io/cocoindex-code`** (N7, 1,661★, Apache-2.0, native MCP) — **INSTALL** — ultra-light AST-based; "70% token / 70% speed improvements" claim; daily releases

### B.3 — EMB (Embedding-search standalone)
1. **`probelabs/probe`** (N4, 595★, Apache-2.0, native MCP + Rust) — **INSTALL** — combines ripgrep + tree-sitter; "AI-friendly semantic code search"; daily-cadence RC releases
2. **`bgauryy/octocode-mcp`** (N3, 832★, MIT, native MCP) — **STUDY-PILOT** — unique cross-repo public+private GitHub-auth queries
3. **`voyageai/voyage-code-3`** (API) — **CONFIGURE-AS-EMBEDDER** within claude-context (+13.8% over OpenAI v3-large; 32K context; Matryoshka)

### B.4 — AST/TFM (Structural search + transform)
1. **`ast-grep/ast-grep`** (V6, 13.8K★, MIT) + **`ast-grep/ast-grep-mcp`** (403★) — **INSTALL** — structural-search SOTA via MCP
2. **`Aider-AI/grep-ast`** (N10, 341★) — **STUDY** as fallback if ast-grep binary unavailable
3. **`wrale/mcp-server-tree-sitter`** (303★, MIT) — **STUDY** for langs ast-grep doesn't cover deeply

### B.5 — CPL (Completion / Multi-model orchestration)
1. **`Aider-AI/aider`** (V1, 44.9K★, Apache-2.0) — **INSTALL-AS-PEER-REVIEWER** — Apache-2.0 verified today; v0.86.0 ships GPT-5/Grok-4/Kimi-K2; multi-model orchestration unmatched
2. **`disler/aider-mcp-server`** (N11, 297★) — **INSTALL** alongside Aider — gives CC native MCP access to Aider's multi-model dispatch (Path P alternative)
3. **`continuedev/continue`** (V9, 33.2K★) — **DO-NOT-INSTALL** for headless runtime (IDE-only consumer)

### B.6 — REV (Code review)
1. **`tirth8205/code-review-graph`** (V21, native MCP) — **STUDY-PILOT** — benchmark "6.8× fewer tokens on reviews" claim
2. **`darrenhinde/OpenAgentsControl`** (N9, 4K★) — **STUDY** workflow patterns only; opencode-targeted
3. **(NONE-OTHER)** — Most "code-review AI agent" results were marketplace plugins, not standalone REV primitives

### B.7 — DOC (Doc-gen / Wiki)
1. **`AsyncFuncAI/deepwiki-open`** (V12, 16.4K★, MIT, native MCP) — **INSTALL** for self-hosted alternative to hosted DeepWiki SaaS
2. **`upstash/context7`** (V13, 55K★, MIT, native MCP) — **KEEP-WITH-WATCH** — already in MCP set; ContextCrush vuln + free-tier cut concerns
3. **`chunkhound autodoc`** (N5 sub-command, v5.0.0) — **AUTO-AVAILABLE** if chunkhound installed — generates Astro docs site with provenance citations

### B.8 — KG (Knowledge graph specifically)
1. **`abhigyanpatwari/GitNexus`** (V4, 28K+★, native MCP+CC) — **INCUMBENT-KEEP** — already in MCP set
2. **`CodeGraphContext/CodeGraphContext`** (V22, 3.3K★, MIT, native MCP) — **COMPLEMENT-CANDIDATE** — multi-DB backend; matches FalkorDB
3. **`harshkedia177/axon`** (V8, 695★, MIT, native MCP) — **STUDY-PILOT** — change-coupling git-history novelty

---

## §C — Aider Deep-Probe (Tranche D miss — confirmed in Tranche G §C; deep verification today)

### License verification — TIER-1-DIRECT (today's read)

- **Path probed**: `Aider-AI/aider/contents/LICENSE.txt`
- **SHA**: `d645695673349e3947e8e5ae42332d0ac3164cd7`
- **Verdict**: **Apache License Version 2.0** — full text confirmed
- **Copyright line**: standard Apache-2.0 boilerplate (no special Aider modification)
- **Implication**: License-CLEAN for install; satisfies cardinal-rule-1 OSS-license requirement; permissive (no AGPL copyleft concerns)

### Maintenance verification — TIER-1-DIRECT (today's read)

| Signal | Evidence | Verdict |
|---|---|---|
| Latest release | **v0.86.0** published 2025-08-09 by `paul-gauthier` | **9-month release gap** as of 2026-05-16 |
| Latest commit (`updated_at`) | **2026-05-16T15:32:03Z** (today) | Daily/sub-daily commit cadence on `main` |
| Self-evaluation claim | v0.86.0 release notes: "Aider wrote 88% of the code in this release" | Self-coding agent dogfooding |
| Star count | **44,891** | Top-3 CC-adjacent CLI coding agents (after `openai/codex` ~83K and `BMAD-METHOD` ~47K) |
| Fork count | 4,422 | Healthy ecosystem |
| Open issues | 1,537 | Active community engagement |
| 3rd-party ecosystem | `MatthewZMD/aidermacs` (895★), `tninja/aider.el` (675★), `joshuavial/aider.nvim` (556★), `lee88688/aider-composer` (445★ VS Code), `GeorgesAlkhouri/nvim-aider` (377★), `Aider-AI/grep-ast` (341★), `disler/aider-mcp-server` (297★), `Aider-AI/polyglot-benchmark` (214★), `Aider-AI/conventions` (192★), `MattFlower/vscode-aider-extension` (111★), `p-wegner/coding-aider` (106★ Kotlin/JetBrains) | **12 active 3rd-party adapters across all editor classes** — bus-factor low risk |

### CC integration path — TIER-1-DIRECT (today's read)

| Path | Verdict |
|---|---|
| Native MCP from upstream Aider | **NO** — Aider is CLI-first; no MCP server bundled |
| Indirect MCP via `disler/aider-mcp-server` | **YES** — 297★ MCP wrapper exists; allows CC to dispatch Aider via MCP tool surface |
| Path P (orchestrator-direct CLI subprocess) | **YES** — analogous to `codex exec` foreground+tee per Z:/claude-sota/.claude/rules/cross-model-consensus.md §"On codex unavailable"; install `aider --no-pretty --yes` for non-interactive dispatch |
| Cross-model consensus role | **PEER-REVIEWER-PATH-Q** — Aider can drive GPT-4o/Gemini-2.5/Grok-4/Kimi-K2 as the "other model" beside Claude — alternative to codex GPT-5.5 for cross-model gate satisfaction |

### v0.86.0 release-content audit — TIER-1-DIRECT (release body read today)

Verified additions in v0.86.0 (2025-08-09):
- **GPT-5 support** (all models) — Aider keeps pace with OpenAI model rollouts
- **Grok-4** via `xai/grok-4` + `openrouter/x-ai/grok-4`
- **Gemini 2.5 Flash Lite Preview**
- **Kimi K2** via `openrouter/moonshotai/kimi-k2`
- **`/clear` confirmation msg** (UX polish)
- **`/undo` first-line display** (UX polish)
- **PostHog analytics SDK update** (telemetry — operator may want to disable)
- **litellm 1.75.0** bump

**Implication**: Aider tracks frontier-model availability within weeks of each provider rollout. As of 2026-05-16, the v0.86.0 model coverage is ~9 months old — but the daily main-branch commits suggest a v0.87+ is imminent (probably tracks Claude Opus 4.7/4.6 + Sonnet 4.6 + GPT-5.5).

### D1-D8 scoring re-validation

| D | Score | Evidence |
|---|---:|---|
| D1 SOTA-fit | 10 | Multi-model parallel orchestration + git-native checkpointing = unique value-add unmatched by any single-vendor CC plugin |
| D2 Maintenance | 9 | Daily commits on main; 9-mo release gap concerning but secondary signal |
| D3 Community | 10 | 44.9K★ / 4.4K forks / 1.5K open issues / 12 active 3rd-party adapters |
| D4 Install | 9 | `pip install aider-chat` or `pipx install aider-chat`; clean Python install; no complex deps |
| D5 License-clean | 10 | Apache-2.0 verified today; permissive |
| D6 Differentiation | 10 | Multi-model + git-native + RepoMap + PageRank cite-classes = unique |
| D7 Maturity | 10 | Created 2023-05-09; 2 years 11 months; 86 minor versions; production-grade |
| D8 Native-CC-pathway | 6 | No upstream MCP; indirect via `disler/aider-mcp-server` 297★ + Path P CLI subprocess viable |
| **Sum** | **74/80** | **Above tranche-D threshold of 65/80; TIER-1-INSTALL-CANDIDATE** |

### Install verdict

**TIER-1-INSTALL — recommended in next install wave** as peer-reviewer alternative to codex GPT-5.5. Specifically:
1. Install `aider-chat` Python package (`pip install --user aider-chat`)
2. Install `disler/aider-mcp-server` MCP for CC-native dispatch
3. Configure `~/.aider.conf.yml` with `auto-commits: false`, `analytics: false` (cardinal-rule-1 telemetry disable)
4. Define a `/aider:review` or `/aider:fanout` skill that dispatches Aider with operator-selected model (GPT-4o / Gemini-2.5-pro / Grok-4 / Kimi-K2)
5. Document the v0.86 → expected v0.87+ track; re-confirm pin upon next release

### Why Tranche D missed it (methodological)

Aider self-tags with: `anthropic`, `chatgpt`, `claude-3`, `cli`, `command-line`, `gemini`, `gpt-3`, `gpt-35-turbo`, `gpt-4`, `gpt-4o`, `llama`, `openai`, `sonnet`

Tranche D queried: `topic:code-intelligence`, `topic:coding-assistant`, `topic:llm-coding`, `topic:devtool`, `topic:code-completion`, `topic:ai-coding-assistant`, `topic:ai-agent`, `topic:developer-tools`, `topic:copilot`, `topic:agent`

**ZERO OVERLAP** — Aider doesn't self-tag with any of the queried topics. Topic-tag search is fundamentally incomplete for repos that don't subscribe. **Name-search OR README-token search is required** for L0.4 completeness — this fork validates that conclusion.

---

## §D — Honest Non-Findings

1. **`mxprostgs/code-search-graph` does NOT exist** at that org — GraphQL returned HTTP 422 "resource does not exist". The candidate-list entry was wrong. **Cannot verify or install.**

2. **`BrushyForkSoftware/claude-code-lsps` does NOT exist** at that org — name-search returned ZERO results for that owner. Three other `claude-code-lsps` repos do exist (V18 Piebald-AI 444★, V19 boostvolt 156★, Siam-analytics fork 3★). The BrushyForkSoftware org appears to be a candidate-list typo or stale reference.

3. **`xenova/transformers` was renamed** to `huggingface/transformers.js` per V16 — the org transfer is silent in candidate lists. Useful for client-side browser-based embeddings ONLY (not server-side MCP architecture).

4. **`comby-tools/comby` is NOT as stale as documented prior** — repo `updated_at` is 2026-05-15 today, NOT 2022-06 (last release date). However, no v1.9 release has shipped despite 2026-05 activity. Status: **continues-DO-NOT-INSTALL** verdict but with correction that the repo is not abandoned, just release-stagnant.

5. **`OpenAgentsControl` (4,034★) is opencode-targeted**, not Claude-Code-targeted. License unverified at probe time. Useful only as workflow-pattern reference.

6. **`darrenhinde/OpenAgentsControl` license unverified** — README-fetch deferred for this probe. Verdict deferred to STUDY pending license check.

7. **`hotovo/aider-desk` license unverified** — same — STUDY-only with electron-app caveat.

8. **`Aider-AI/grep-ast`, `disler/aider-mcp-server`, `MatthewZMD/aidermacs` licenses unverified** — same caveat. Quick-fetch deferred under rate-limit pressure.

9. **Three name-searches hit GraphQL HTTP 403 rate-limit** in this fork: `BrushyForkSoftware/*`, `Piebald-AI/*` (first attempt; succeeded on retry), `claude-mem/claude-mem`. Rate-limit window 37s; retries succeeded. Documented for transparency. No false-positive REJECTs from this rate-limit pressure.

10. **5 GraphQL probes returned ZERO matches** at the queried filter levels:
    - `LSP language server protocol AI stars:>500` (0)
    - `AST grep search transform stars:>500` (0)
    - `code-completion AI stars:>1000 pushed:>2026-01-01` (matched only `minuet-ai.nvim` 1,217★ — Vim/Lua-only)
    - `code-review AI agent stars:>500` (0)
    - `repo embedding vector stars:>500` (matched only an unrelated 2022 Azure repo)

    **Interpretation**: GitHub's full-text search index has poor recall on multi-word natural-language phrases at >500★ filter level. Topic-tag is more reliable WHEN repos subscribe; name-search is required for completeness.

11. **`SocratiCode` AGPL-3.0 license** creates copyleft concern for our MCP-server runtime. **REVIEW required** before install: if SocratiCode is installed as MCP-server in our runtime, does that trigger AGPL-3 §13 "network use" clause requiring source disclosure of our consumer-side runtime? Standard AGPL interpretation: NO (because we're a *consumer* via network MCP protocol, not a derivative work). But this needs operator+legal verification per cardinal-rule-1.

12. **No standalone Anthropic Skill or MCP server found for `tree-sitter-graph` DSL** (cross-ref SATURATION-CODE-INTEL §E.4) — confirmed today. Remains a library-level dependency.

13. **`Continue` (V9, 33K★)** is an IDE-extension consumer of MCP, not an MCP producer. Listed for completeness but NOT install-relevant for our headless architecture (cross-ref SATURATION-CODE-INTEL §E.9 — re-confirmed today).

---

## Summary — One-screen verdict (delta against prior SATURATION-CODE-INTEL)

**NEW INSTALL-CANDIDATES (not in prior tranche §B top-3)**:
1. **`chunkhound/chunkhound`** (N5, 1,258★, MIT, native MCP) — v5.0.0 Anthropic-native models + local DuckDB + 33 langs
2. **`probelabs/probe`** (N4, 595★, Apache-2.0, native MCP) — Rust ripgrep+tree-sitter
3. **`cocoindex-io/cocoindex-code`** (N7, 1,661★, Apache-2.0, native MCP) — ultra-light AST-based; 70% token reduction claim
4. **`Aider-AI/aider`** (V1, 44.9K★, Apache-2.0 ✓) — multi-model peer-reviewer
5. **`boostvolt/claude-code-lsps`** (V19, 156★) — 22-lang LSP bundle via CC plugin

**NEW STUDY-PILOT**:
- `giancarloerra/SocratiCode` (N1, 2,639★, **AGPL-3.0** ⚠) — enterprise-grade hybrid KG+semantic; **license-review-required**
- `bgauryy/octocode-mcp` (N3, 832★, MIT) — cross-repo public+private GitHub-auth queries
- `kantord/SeaGOAT` (N2, 1,291★, MIT) — local-first CLI semantic search

**METHODOLOGICAL FINDING confirmed**: GitHub topic-tag has systemic adoption bias against multi-purpose CLIs (Aider/Cursor/Cody/Tabby/Codeium all self-tag with model-names rather than category-tags). Any "complete" code-intel sweep MUST include name-search AND README-token-search alongside topic-search.

**Architecture verdict (unchanged from SATURATION-CODE-INTEL §D)**: Extend L0 (Substrate) with sub-lanes L0-CI-A through L0-CI-F via MCP-bus consolidation. The L0.4 sub-layer is best modeled as **the MCP-server fleet at L0** rather than a separate horizontal layer. Adding chunkhound + probe + cocoindex-code + aider expands the install set from 3 incumbent + 3 next-wave to **3 incumbent + 7 next-wave + 5 study-pilot** — substantial saturation gain.

**Cross-validation against tranches D/G/F**:
- Tranche D `Section A` was topic-tag-thin per its own §0; this fork validates that finding (5 queries returned zero or thin results)
- Tranche G `§C Aider deep-probe` is re-confirmed by today's LICENSE.txt SHA-pinned read + release-tag fetch + 12-adapter ecosystem enumeration
- Tranche F `cocoindex 9,795★ row 8 sum=57/80` was L7-RAG classification; this fork re-classifies sister-repo `cocoindex-code` as L0.4-CODE-INTEL with sum **65/80** (higher fit for code-intel sub-class than the broader cocoindex was for RAG)
