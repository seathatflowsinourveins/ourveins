# SATURATION: Code Intelligence Substrate — 2026-05-16

> **Layer**: L0 (Substrate) — Code Intelligence sub-lane
> **Incumbents**: oraios/serena (LSP), yamadashy/repomix (corpus packing), abhigyanpatwari/GitNexus (knowledge graph)
> **Scope**: 45 candidates probed across 7 sub-classes (LSP/AST/Indexing/Embedding/Transform/Doc-gen/Diff)
> **Method**: GitHub repo API + WebSearch (Exa) + WebFetch (raw HTML) + Anthropic Skill Marketplace probes
> **Date stamp**: 2026-05-16 (UTC)
>
> Cite-class: TIER-3-LOCAL-COMPOSITION per Z:/claude-sota/.claude/rules/citation-discipline.md rule #8. Star counts and dates from live HEAD fetch; constituent sources documented inline per row.

---

## §A — Full Code-Intel Matrix (45 candidates)

### Sub-class 1: LSP-based / Semantic IDE-grade

| repo | ★ | license | native-CC-pathway | community-consensus | last-update | use-case |
|---|---|---|---|---|---|---|
| **oraios/serena** | 24,285 | MIT | First-class MCP server | INCUMBENT — "the IDE for your agent" — explicit Claude/Codex/Cursor integration | 2026-05-16 | LSP-anchored symbol nav, refactor, find-references at semantic level (24+ langs) |
| **TabbyML/tabby** | 33,523 | Apache-2.0 (current) | No native CC; Rust LSP completion server | Enterprise self-host leader; on-prem completion + repo-index | 2026-05-16 | Air-gapped Copilot alternative; repo-aware FIM completion |
| **continuedev/continue** | 33,220 | Apache-2.0 | MCP-compatible client (consumer not server) | "Best IDE coverage"; sourceable AI checks in CI | 2026-05-16 | VS Code + JetBrains agent extension; CI-enforceable rules |
| **zed-industries/zed** | 83,000 | AGPL/Apache/GPL-3.0 multi | Headless mode + ACP (Agent Communication Protocol) — addressable by AI fleets | High — Atom/Tree-sitter creators; Helix.ml forked it for fleet orchestration | 2026-05-15 (v1.2.6) | Headless editor backbone for autonomous coding agents; LSP code lens |
| **helix-editor/helix** | 44,400 | MPL-2.0 | No MCP; CLI/headless terminal-only | Strong terminal-modal; Rust-native LSP+tree-sitter | 2025-07-18 (v25.07.1) | Terminal-first modal editor; LSP+tree-sitter built-in |
| **fallow-rs/fallow** | 2,300 | MIT | Native MCP + LSP + Agent Skill — installs all 4 layers | Emerging Rust-native TS/JS intelligence (W258 +95 plugins) | 2026-05-16 (v2.75.0) | TS/JS static intel: dead code, dup, complexity hotspots, framework-aware |
| **kuberstar/qartez-mcp** | <100 | unknown | Native MCP for CC | Niche — project maps, symbol search, impact analysis | 2026 | Semantic CC-targeted MCP |
| sourcegraph/cody | n/a | Open-source RIP | Cody deprecated 2025-07-23 → "Amp" successor (closed, $59/mo) | RETIRED for free/pro; enterprise-only | 2025 (terminal) | OBSOLETE for OSS pathway |
| pleaseai/rust-analyzer-lsp | n/a | n/a | Claude plugin wrapper | Niche skill plugin | 2026 | Rust LSP wrapper for CC |
| zircote/lsp-tools | n/a | n/a | CC plugin: auto-format + LSP diagnostics | 30+ language servers wrapped | 2025-12 | Diagnostics+navigation surface for CC |

### Sub-class 2: Tree-sitter / AST-based parsing primitives

| repo | ★ | license | native-CC-pathway | community-consensus | last-update | use-case |
|---|---|---|---|---|---|---|
| **tree-sitter/tree-sitter** | 25,383 | MIT | Library — no MCP itself; the parsing substrate | UBIQUITOUS — GitHub-originated, used by Zed/Helix/Atom/Neovim | 2026-05-16 | Incremental AST parsing across 25+ langs (foundation) |
| **ast-grep/ast-grep** | 13,811 | MIT | Native MCP server via ast-grep-mcp | DOMINANT structural-search Rust-native; multi-core; outperforms comby for filtering | 2026-05-16 | Structural search + lint + rewrite across 20+ langs |
| **ast-grep/ast-grep-mcp** | 403 | MIT | Native MCP — `dump_syntax_tree`, `find_code`, `find_code_by_rule` | Anthropic-grade Skill ("Jelly AST-Grep") + Cursor/Claude Desktop ready | 2026 | MCP wrapper exposing ast-grep to AI agents |
| **wrale/mcp-server-tree-sitter** | 303 | MIT | Native MCP — Claude Desktop primary | Reference Python MCP tree-sitter server; 14+ langs | 2026-04-09 (v0.7.0) | Generic tree-sitter MCP wrapper |
| **tree-sitter/tree-sitter-graph** | n/a | MIT | n/a — library | DSL for constructing graphs FROM parsed AST | active | Knowledge-graph builder DSL on tree-sitter |
| nendotools/tree-sitter-mcp | n/a | unknown | Native MCP | Alt tree-sitter MCP variant | 2026 | Lightweight tree-sitter MCP |
| aimasteracc/tree-sitter-analyzer | n/a | unknown | Native MCP | Python alt with analyzer extras | 2026 | Alt tree-sitter MCP |
| INRIA/spoon | 1,928 | CECILL | No MCP | Java metaprogramming/transform library; mature | 2026-05-16 | Java AST analysis + transformation (academic) |

### Sub-class 3: Codebase indexing / Knowledge graphs / Code-as-context

| repo | ★ | license | native-CC-pathway | community-consensus | last-update | use-case |
|---|---|---|---|---|---|---|
| **yamadashy/repomix** | 24,928 | MIT | Native MCP server | INCUMBENT corpus packer; #2 ecosystem awareness after serena | 2026-05-16 | Pack entire repo into single AI-friendly file (XML/MD/JSON) |
| **abhigyanpatwari/GitNexus** | 28,000+ | open | Native MCP — 7 tools + 4 agent skills (Exploring/Debugging/Impact/Refactoring) + PreToolUse hooks | INCUMBENT KG; "deepest CC integration" per MarkTechPost; auto-gen AGENTS.md/CLAUDE.md | 2026-04 | Pre-computed call graph + blast-radius impact; Tree-sitter AST → KG |
| **zilliztech/claude-context** | 11,174 | open | Native MCP for CC | Strong; hybrid BM25 + dense vector; Voyage/OpenAI/Ollama embedding pluggable | 2026-05-16 | AST-split code → Milvus/Zilliz vector store; CC-named |
| **CodeGraphContext/CodeGraphContext** | 3,300 | MIT | Native MCP + CLI | Multi-DB backend (KuzuDB/Neo4j/FalkorDB); 20 langs; live file-watch | 2026-05-07 (v0.4.7) | KG with dead-code + caller/callee + complexity, real-time updates |
| **harshkedia177/axon** | 695 | MIT | Native MCP (`axon_query`, `axon_context`, `axon_impact`) | Strong rising; force-directed dashboard + community detection | 2026-03-09 (v1.0.1) | Hybrid BM25+vector+fuzzy on graph; change-coupling git-history |
| **tirth8205/code-review-graph** | n/a | open | Native MCP for CC | "6.8× fewer tokens on reviews / 49× on daily coding" — measured | 2026 | Persistent KG for CC reviews; incremental tracking |
| Codebase-Memory (arxiv:2603.27277) | ~900 | open | Native MCP — 14 structural query tools | 66 langs via tree-sitter; content-hash incremental | 2026-02-25 | Tree-sitter KG in SQLite; academic paper-backed |
| JudiniLabs/mcp-code-graph | n/a | open | Native MCP | By CodeGPT team; visualization + graph analysis | 2026 | Graph viz + structural query MCP |
| **sourcegraph/scip** | 626 | Apache-2.0 | No MCP — index format spec | LSIF SUCCESSOR; 8× smaller / 3× faster than LSIF at Meta scale | 2026-04-14 (v0.7.1) | Standard code-intel index format; consumed by Sourcegraph + GitLab native |
| sourcegraph/scip-typescript | n/a | Apache-2.0 | n/a — indexer | TS/JS SCIP indexer | active | Generate SCIP indexes for TS/JS |
| sourcegraph/scip-java | n/a | Apache-2.0 | n/a — indexer | Java/Scala/Kotlin SCIP indexer | active | Generate SCIP indexes for JVM |
| github/semantic | 9,100 | MIT | No — Haskell library | **ARCHIVED 2019-08-26** — no longer maintained by GitHub | 2019-08-26 | DEPRECATED — tree-sitter-backed semantic diff (Haskell) |
| facebookarchive/pfff | 2,441 | Apache-2.0 | No — OCaml | **ARCHIVED** Facebook code-analysis tools | 2026-05-15 | DEPRECATED — historical reference for code analysis |

### Sub-class 4: Embedding-based code search models

| repo | ★ | license | native-CC-pathway | community-consensus | last-update | use-case |
|---|---|---|---|---|---|---|
| **voyageai/voyage-code-3** | n/a | API (hosted) | API consumable from any MCP RAG; integrated by zilliztech/claude-context | SOTA — +13.8% vs OpenAI v3-large; 32K context; Matryoshka multi-dim | 2024-12 (still SOTA in 2026 per benchmarks) | Best-in-class code embeddings for retrieval |
| **microsoft/CodeBERT** | 2,800 | MIT | Library only — no MCP | 6 langs; CodeSearchNet-trained; basis for many downstream tools | active | Bidirectional code-NL embeddings (foundation) |
| microsoft/CodeBERT — GraphCodeBERT | (same repo) | MIT | Library | +data-flow over CodeBERT; reflects program logic | active | Graph-aware code embeddings |
| microsoft/CodeBERT — UniXcoder | (same repo) | MIT | Library | Cross-modal: understanding + generation | active | Unified code+NL representation |
| nomic-ai/contrastors | n/a | Apache-2.0 | Library | nomic-embed-code variant supports code; competing with voyage | 2026 | Open-source code embedding training |
| codeintelinc/gitnexus | **NOT FOUND** | n/a | n/a | **HONEST NON-FINDING**: org name was wrong in candidate list — real owner is `abhigyanpatwari/GitNexus` (see Sub-class 3) | n/a | See abhigyanpatwari row |

### Sub-class 5: Code transformation / Codemod engines

| repo | ★ | license | native-CC-pathway | community-consensus | last-update | use-case |
|---|---|---|---|---|---|---|
| **ast-grep/ast-grep** | 13,811 | MIT | MCP via ast-grep-mcp (above) | Cross-listed — modern Rust transformer | 2026-05-16 | Structural rewrite across 20+ langs |
| **codemod/codemod** | 1,000 | Apache-2.0 | Native MCP — "AI tools for code analysis, AST manipulation, codemod creation" | Platform engine; supports jscodeshift + ts-morph + ast-grep ("JSSG" primary) | 2026-05-13 (v1.10.5) | End-to-end migration platform with YAML workflows + AI codemod gen |
| **facebook/jscodeshift** | 10,000 | MIT | No native MCP; called by codemod platform | Original JS codemod toolkit; still actively maintained | 2025-03-24 (v17.3.0) | JS/TS codemod runner; AST-rewrite library |
| **semgrep/semgrep** | 15,159 | LGPL-2.1 (OSS) | Native MCP — `stefanskiasan/semgrep-mcp` etc. | Security/SAST-focused; pattern looks like code | 2026-05-16 | Lightweight static analysis; bug-variant patterns |
| **comby-tools/comby** | 2,646 | Apache-2.0 | No MCP | Predecessor of ast-grep — language-agnostic | **2022-06-28** (v1.8.1) | DEPRECATED/STALE — supports many langs but not AST-aware |
| **uber-go/gopatch** | 1,030 | Apache-2.0 | No MCP | Go-specific structural rewrite | 2026-04-26 | Go-only codemod (semantic patches) |
| **INRIA/spoon** | 1,928 | CECILL | No MCP | Java-only metaprogramming | 2026-05-16 | Java AST transform (academic) |
| ts-morph (community) | ~5,000 | MIT | No MCP; integrated into codemod platform | TS-specific manipulation library | active | TS-specific AST transforms |

### Sub-class 6: Documentation / Wiki generation

| repo | ★ | license | native-CC-pathway | community-consensus | last-update | use-case |
|---|---|---|---|---|---|---|
| **upstash/context7** | 55,400 | MIT | Native MCP — `resolve-library-id` + `query-docs` | #1 MCP server in 2026 per MCP.Directory; 33,000+ libraries; **WARNING**: ContextCrush vuln (2026-02) + free-tier cut 83% (2026-01) | 2026-05-11 (ctx7@0.4.2) | Up-to-date library docs in LLM context |
| **AsyncFuncAI/deepwiki-open** | 16,400 | MIT | Self-hosted MCP variant; official DeepWiki MCP also exists | Mermaid diagrams + DeepResearch + multi-model; private-repo support | 2026 | OSS DeepWiki — repo→wiki autogen; Docker-deployable |
| Cognition Labs DeepWiki (hosted) | n/a (SaaS) | proprietary | Native MCP (official) | "Deep Research for GitHub"; 3-15min indexing per repo | 2026 | Hosted SaaS — indexes any public repo for query |
| **squidfunk/mkdocs-material** | 26,700 | MIT | No MCP; static-site backbone with llms.txt plugin | Mature plugin ecosystem; 50K+ users (AWS/Google/MS/Netflix/OpenAI) | 2026-03-19 (v9.7.6) | Material-theme MD docs site; LLM-ready via llms.txt plugins |
| Mintlify | n/a (SaaS) | proprietary | Generates MCP servers from docs; llms.txt + skill.md auto-gen | LLM-first docs platform; Anthropic/Cursor/Coinbase/Pinecone/Windsurf customers | 2026 | Hosted docs platform with auto LLM-friendly output |
| Apidog | n/a (SaaS) | proprietary | LLMs.txt support | API-first docs with LLM discovery | 2026 | API docs with LLM accessibility |
| docusaurus-plugin-llms (rachfop) | <500 | MIT | n/a — plugin | Most complete Docusaurus LLM plugin; llms.txt + per-page .md | 2026 | Docusaurus → LLM-friendly output |
| OpenAPI Generator | 22K+ | Apache-2.0 | No MCP | Multi-lang SDK gen from OpenAPI 3.x | 2026 | API SDK + docs autogen from OpenAPI spec |

### Sub-class 7: Diff / Merge intelligence

| repo | ★ | license | native-CC-pathway | community-consensus | last-update | use-case |
|---|---|---|---|---|---|---|
| GitKraken (AI merge) | n/a (SaaS) | proprietary | n/a | AI auto-resolve + explanation | 2026 | GUI merge tool with AI assist |
| JetBrains AI Assistant | n/a | proprietary | IDE-only | Integrated semantic merge in IntelliJ family | 2026 | IDE-bundled AI merge |
| Resolve.AI (VS Code) | n/a | proprietary | VS Code only | Editor-bundled assisted merge | 2026 | VS Code AI merge |
| Beyond Compare | n/a | proprietary | No AI | Industry-standard manual 3-way visual merge | 2026 | Pro-grade manual visual diff/merge — NO AI |
| GitHub Copilot merge-resolve | n/a | proprietary | n/a | Native Copilot conflict-fix | 2026 | Copilot-bundled conflict resolution |
| graphite.dev | n/a (SaaS) | proprietary | n/a | AI in code-review/merge workflow | 2026 | Stacked-PR + AI review platform |
| mhagger/git-imerge | <2K | GPL-2.0 | No AI | Manual incremental merge tool — pre-AI era | stale | Historical reference — no LLM intelligence |

---

## §B — Top-5 INSTALL Recommendations per Sub-class

### B.1 LSP / Semantic IDE-grade

1. **oraios/serena** — **KEEP INCUMBENT** (24K★, native MCP, multi-langserver). No SOTA-superior replacement found.
2. **fallow-rs/fallow** — **COMPLEMENT** for TS/JS-heavy projects (95 framework plugins, Rust-native, dead-code+circular-dep detection). Installs CLI+LSP+MCP+Skill in one shot.
3. **zircote/lsp-tools** — **COMPLEMENT** if want generic 30+ language-server wrapper for diagnostics-on-edit (auto-format on save).
4. zed-industries/zed (headless) — STUDY ONLY (heavy install; only worthwhile if planning autonomous-agent fleet ACP integration).
5. continuedev/continue — STUDY ONLY (IDE extension, not headless MCP-server).

### B.2 AST / Tree-sitter primitives

1. **ast-grep/ast-grep + ast-grep/ast-grep-mcp** — **INSTALL** (13.8K★ + 403★). The structural-search SOTA + native MCP wrapper. Anthropic Skill ("Jelly AST-Grep") already exists in marketplace.
2. **wrale/mcp-server-tree-sitter** — **INSTALL** (303★, MIT, 2026-04 release). Generic tree-sitter MCP wrapper for langs ast-grep doesn't cover deeply.
3. tree-sitter/tree-sitter — IMPLICIT DEPENDENCY (used by serena, repomix, GitNexus, ast-grep already).
4. nendotools/tree-sitter-mcp — STUDY only (alt to wrale; lighter).
5. tree-sitter/tree-sitter-graph — STUDY only (KG-building DSL — useful for custom analyzers).

### B.3 Indexing / Knowledge graph / Code-as-context

1. **yamadashy/repomix** — **KEEP INCUMBENT** (24.9K★, native MCP, corpus-packer dominant).
2. **abhigyanpatwari/GitNexus** — **KEEP INCUMBENT** (28K+★, 7 MCP tools + 4 CC skills + hooks + auto-AGENTS.md/CLAUDE.md — deepest CC integration).
3. **zilliztech/claude-context** — **INSTALL** (11K★, CC-named; hybrid BM25+vector with Voyage/OpenAI/Ollama embedding; complements GitNexus's structural with semantic).
4. **CodeGraphContext/CodeGraphContext** — **COMPLEMENT-CANDIDATE** (3.3K★, multi-DB backend KuzuDB/Neo4j/FalkorDB matches our existing FalkorDB install; 20 langs).
5. **harshkedia177/axon** — **STUDY-PILOT** (695★ rising; change-coupling via git-history is novel signal not present in incumbents).

### B.4 Embedding-based code search

1. **voyage-code-3 (API)** — **INSTALL** as the embedding-model choice within zilliztech/claude-context (+13.8% vs OpenAI v3-large; 32K context; Matryoshka). NOT a standalone install.
2. **microsoft/CodeBERT/GraphCodeBERT/UniXcoder** — STUDY only (research foundation; no MCP; outclassed by voyage-code-3 on retrieval).
3. **nomic-ai/contrastors** — STUDY only (OSS training framework; useful if want to fine-tune own embedder).
4. (no fourth) — Class is fundamentally consumed by §B.3 indexing tools.
5. (no fifth) — Class is fundamentally consumed by §B.3 indexing tools.

### B.5 Code transformation / Codemod

1. **ast-grep/ast-grep + ast-grep-mcp** — **INSTALL** (cross-listed from §B.2 — same tool covers both search + transform).
2. **semgrep/semgrep** + semgrep-mcp — **INSTALL** (15.1K★, security-focused; complements ast-grep with security-rule corpus). Native MCP exists.
3. **codemod/codemod (platform)** — **STUDY-PILOT** (1K★, Apache-2.0; YAML migration workflows + AI codemod-gen; integrates jscodeshift+ts-morph+ast-grep). Useful for large-scale framework migrations only.
4. **facebook/jscodeshift** — IMPLICIT (consumed by codemod platform; standalone install unnecessary unless JS-codemod-heavy).
5. **comby-tools/comby** — **DO NOT INSTALL** (stale since 2022-06; ast-grep supersedes).

### B.6 Documentation / Wiki generation

1. **AsyncFuncAI/deepwiki-open** — **INSTALL** if want self-hosted repo→wiki autogen (16.4K★, MIT, Docker-deployable, MCP-ready). Already have `mcp__deepwiki__*` tools available via hosted SaaS.
2. **upstash/context7** — **KEEP if installed; OTHERWISE-CAUTIOUS** (55K★ but **ContextCrush vuln 2026-02 + free-tier cut 83% 2026-01**). Already in MCP server set per system reminder.
3. **squidfunk/mkdocs-material** + llms.txt plugin — **INSTALL** for project documentation site (de-facto standard; LLM-friendly via plugin).
4. **docusaurus-plugin-llms** — STUDY only (alt to mkdocs-material if Docusaurus-aligned).
5. **OpenAPI Generator** — INSTALL CONDITIONALLY (only if exposing public API surface).

### B.7 Diff / Merge intelligence

1. **(NONE — no open-source, MCP-native AI-merge tool found)** — Use Claude Code/Codex inline merge resolution + Beyond Compare for visual review when needed.
2. graphite.dev — STUDY only (SaaS only).
3. GitKraken AI merge — STUDY only (GUI tool, not CC-pathway).
4. Beyond Compare — INSTALL CONDITIONALLY for manual review of complex merges (no AI integration).
5. mhagger/git-imerge — DO NOT INSTALL (stale pre-AI).

**Honest non-finding**: There is no MCP-native AI-merge primitive. AI merge is consumed inline by Claude Code itself + IDE-bundled assistants. **Recommend not adding a separate L0 merge sub-lane.**

---

## §C — Convergence Axis-1 (Cross-org patterns)

**Pattern 1 — Tree-sitter as universal substrate** (≥5 distinct orgs)
- tree-sitter/tree-sitter, ast-grep, GitNexus, CodeGraphContext, axon, fallow, zed-industries, Codebase-Memory all built on tree-sitter
- **Implication**: tree-sitter is the SOTA AST-substrate consensus. Any new indexing/transform tool should consume it, not re-implement.

**Pattern 2 — MCP as the universal-bus for code intelligence** (≥10 distinct orgs)
- serena, repomix, GitNexus, claude-context, axon, codemod, semgrep, ast-grep-mcp, wrale/mcp-server-tree-sitter, CodeGraphContext, fallow, context7, deepwiki, OpenHands SDK all expose code intel via MCP
- **Implication**: Anthropic-defined MCP is the *de facto integration protocol* for code intelligence. Self-invent of any tool-bridge layer is anti-pattern.

**Pattern 3 — Multi-modal KG = AST structural + dense vector + BM25 hybrid retrieval** (≥4 distinct orgs)
- zilliztech/claude-context, axon, GitNexus, CodeGraphContext converge on hybrid BM25 + dense-vector + AST-structural query patterns
- **Implication**: Pure vector-RAG is obsolete for code; hybrid is consensus.

**Pattern 4 — SCIP supersedes LSIF as cross-tool index format** (≥3 distinct orgs)
- Sourcegraph (originator), GitLab (native consumer), Meta (8× smaller / 3× faster benchmark per blog) all adopted SCIP
- **Implication**: If we ever need cross-tool index exchange, SCIP is the format. (Not urgent for our runtime — internal-only stays MCP-native.)

**Pattern 5 — Embeddings consolidation: voyage-code-3 as default code embedder** (≥3 distinct orgs)
- zilliztech/claude-context recommends it; Voyage AI publishes +13.8% vs OpenAI v3-large benchmark on 32-dataset suite; multiple knowledge-graph tools (axon, CodeGraphContext) support it as embedding option
- **Implication**: For our embedding lane (currently OpenAI-class via litellm in installed manifest), should consider voyage-code-3 specifically for code-retrieval traffic.

**Pattern 6 — Headless editors as agent backbones** (≥2 distinct orgs)
- zed-industries/zed adds headless ACP mode; Helix.ml builds fleet-orchestration on it
- **Implication**: An *emergent* L0 pattern — agent fleets driving headless editor instances via ACP. NOT YET MATURE for our runtime (single-agent loops).

**Pattern 7 — Anthropic Skills as code-intel distribution mechanism** (≥3 distinct orgs)
- Jelly AST-Grep (Anthropic-curated skill), fallow's bundled agent-skill, GitNexus's 4 agent-skills, context7's skill.md auto-gen
- **Implication**: Cardinal-rule-1-aligned distribution path — install via plugin/skill rather than raw MCP config.

---

## §D — Architecture Recommendation

**RECOMMENDATION: Extend L0 (Substrate) with code-intel sub-lanes — do NOT create a new L0.4 layer.**

### Rationale
1. **Conceptual cohesion**: Code intel IS substrate (provides context to L1+ reasoning layers). Splitting it into its own layer would fragment the dependency graph unnecessarily.
2. **MCP-bus consolidation**: All viable code-intel tools expose via MCP. The "layer" is logically the *MCP-server fleet at L0*, not a separate horizontal layer.
3. **Avoid layer-proliferation**: Per W255 cleanup discipline (cardinal-rule-4: project behavior in CLAUDE.md+settings.json, not invented structures), adding layer L0.4 would re-introduce structural self-invent.

### Proposed L0 Code-Intel Sub-lane Structure

```
L0 (Substrate) — Code Intelligence
├── L0-CI-A: Semantic IDE-grade (LSP-anchored)
│     INCUMBENT: oraios/serena
│     COMPLEMENT-INSTALL: fallow-rs/fallow (for TS/JS dead-code + framework intel)
│
├── L0-CI-B: Corpus packing
│     INCUMBENT: yamadashy/repomix
│     STATUS: no SOTA superior found; keep as-is
│
├── L0-CI-C: Structural search + AST transform
│     INSTALL: ast-grep/ast-grep + ast-grep/ast-grep-mcp
│     INSTALL: semgrep/semgrep + semgrep-mcp (security overlap)
│     STUDY: wrale/mcp-server-tree-sitter (langs not covered by ast-grep)
│
├── L0-CI-D: Knowledge graph (structural)
│     INCUMBENT: abhigyanpatwari/GitNexus
│     STATUS: deepest CC integration found; keep as-is
│     COMPLEMENT-CANDIDATE: CodeGraphContext (multi-DB backend match our FalkorDB)
│
├── L0-CI-E: Semantic retrieval (vector + hybrid)
│     INSTALL: zilliztech/claude-context (CC-named, hybrid BM25+vector)
│     EMBEDDING: voyage-code-3 via API (SOTA code embedder)
│     STORE: existing FalkorDB OR Milvus (claude-context's default)
│
└── L0-CI-F: Documentation lookup
      INCUMBENT: mcp__context7 + mcp__deepwiki (both already in MCP set)
      WATCH: context7 ContextCrush + free-tier issues (2026-Q1)
      ALT: AsyncFuncAI/deepwiki-open for self-hosted alternative
```

### Install-Priority Decision Tree

**PRIO 1 (INSTALL NEXT WAVE)**:
- `ast-grep` + `ast-grep-mcp` — fills structural search + transform gap (no current incumbent for AST-rewrite)
- `zilliztech/claude-context` — fills semantic/vector retrieval gap (only structural KG present today)

**PRIO 2 (STUDY-PILOT before install)**:
- `fallow-rs/fallow` — if TS/JS workload becomes significant
- `semgrep` + `semgrep-mcp` — if security review surfaces become workload
- `CodeGraphContext` — if GitNexus limitations surface

**PRIO 3 (KEEP-WATCH)**:
- `voyage-code-3` — already accessible via API; switch the embedding lane on demand
- `harshkedia177/axon` — change-coupling signal is unique; watch maturity
- `codemod/codemod` platform — only if framework-migration becomes load-bearing

**DO NOT INSTALL**:
- `comby-tools/comby` — stale 2022; ast-grep supersedes
- `github/semantic` — archived 2019; tree-sitter ecosystem absorbed
- `sourcegraph/cody` — deprecated 2025-07; "Amp" closed-source
- `mhagger/git-imerge` — pre-AI era
- `Beyond Compare` — manual-only (no AI integration possible)
- `pleaseai/rust-analyzer-lsp` — wraps what serena already wraps

---

## §E — Honest Non-Findings

1. **`codeintelinc/gitnexus` does NOT exist** at that org-name. The real GitNexus repo is `abhigyanpatwari/GitNexus` (28K+ stars, single-maintainer Indian CS student per MarkTechPost). Original candidate-list path was wrong; corrected throughout.

2. **`sourcegraph/cody` (open-source variant) is effectively dead** — Cody deprecated 2025-07-23; successor "Amp" is enterprise-only at $59/user/month. The repo `github.com/sourcegraph/cody` returned 404 on direct WebFetch (likely archived/renamed). Per W258 cardinal-rule-5 install-priority, **REMOVE from any future install consideration**.

3. **No open-source MCP-native AI-merge primitive exists.** All candidates (GitKraken/JetBrains/Resolve.AI/Copilot) are SaaS- or IDE-bundled. **Recommend NOT adding L0 merge sub-lane** — Claude Code itself handles merge resolution adequately; Beyond Compare is only for visual review fallback.

4. **No standalone Anthropic Skill or MCP server found for tree-sitter-graph DSL.** It remains a library-level dependency consumed by other tools (e.g., GitNexus). Cannot be installed as a discrete MCP-tier primitive in our runtime.

5. **Star counts unverifiable for several niche items** via GitHub Search API (rate-limited at probe time). For: `kuberstar/qartez-mcp`, `nendotools/tree-sitter-mcp`, `tirth8205/code-review-graph`, `JudiniLabs/mcp-code-graph`, `pleaseai/rust-analyzer-lsp`, `zircote/lsp-tools`, `Codebase-Memory` (academic), `docusaurus-plugin-llms`. Listed as `<100`, `n/a`, or order-of-magnitude estimate from secondary sources (lobehub/skywork/MCP Marketplace). **Operator should manually verify if any rise to install-priority status.**

6. **`context7` security posture is contested.** "ContextCrush" vuln (2026-02, library publishers can inject AI instructions via Custom Rules with no sanitization) + 83% free-tier cut (2026-01, ~6,000 → 1,000 req/mo) introduce supply-chain risk and cost-volatility. **WATCH carefully**; current MCP-set inclusion is grandfathered but should be re-justified per cardinal-rule-1 trust audit.

7. **`facebookarchive/pfff` (2,441★) and `INRIA/spoon` (1,928★)** were included in candidate list but are academic/historical — pfff is archived; spoon is Java-only metaprogramming with no MCP path. Neither is install-relevant.

8. **`google/kythe` was probed** (not in candidate list but discovered during research) — Google's pre-SCIP code-intel system. **No active MCP integration**; SCIP-format adoption industry-wide has effectively displaced Kythe's protobuf-graph approach. **Do not pursue.**

9. **`continuedev/continue` (33.2K★)** is a *consumer* of MCP, not a *producer*. It's an IDE-extension agent, not a code-intel MCP server. Listed for completeness but **not install-relevant for our headless-MCP-fleet architecture.**

10. **`TabbyML/tabby` (33.5K★)** is a self-hosted Copilot replacement — *consumes* code intel rather than providing it via MCP. Not relevant for our orchestrator's tool surface; would be relevant only if we wanted to add an *internal completion model* sub-lane (not currently planned).

---

## Summary — One-screen verdict

**Top 3 priorities to INSTALL this wave**:
1. `ast-grep/ast-grep` + `ast-grep/ast-grep-mcp` → Fills structural search+transform gap
2. `zilliztech/claude-context` → Fills semantic/vector retrieval gap (config voyage-code-3 as embedder)
3. `AsyncFuncAI/deepwiki-open` (self-hosted) OR keep hosted `mcp__deepwiki__*` → Fills docs autogen gap

**Top 3 to KEEP unchanged**:
- `oraios/serena` (LSP/semantic)
- `yamadashy/repomix` (corpus pack)
- `abhigyanpatwari/GitNexus` (knowledge graph)

**Top 3 to STUDY-PILOT**:
- `fallow-rs/fallow` (TS/JS deep intel)
- `semgrep/semgrep` + `semgrep-mcp` (security overlap)
- `harshkedia177/axon` (change-coupling novelty)

**Top 3 to DO NOT INSTALL**:
- `comby` (stale 2022)
- `cody/Amp` (commercialized + dead-OSS)
- `github/semantic` (archived 2019)

**Architecture verdict**: Extend L0 with sub-lanes L0-CI-A through L0-CI-F (NOT a separate L0.4 layer). Consolidation via MCP-bus per Pattern-2 convergence keeps cardinal-rule-2 + cardinal-rule-4 invariants satisfied.
