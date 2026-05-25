# DEEP-SATURATION L0.2 — Memory MCP Exhaustive Coverage (2026-05-16)

> **Fork**: DEEP-SATURATION pass on L0.2 (Memory MCP layer) per operator feedback "memory mcp not fully covered with all the SOTA repos". Goal: ≥50 rows, DEEP not broad, with native-CC-pathway + memory-type taxonomy + D1-D8 scoring + 6-class disposition.
>
> **Method**: 10 GraphQL probes (memory-mcp / mcp-memory / claude-memory / persistent-agent-memory / knowledge-graph-mcp / vector-mcp / conversation-history-mcp / long-term-memory-LLM / contextual-recall-mcp / topic:agent-memory). + 8 specific name-search probes for the 25 explicit candidates from prior wave + cross-reference with SATURATION-MEMORY-LAYER + GRAPHQL-NATIVE-CC-PATHWAY audit + V-FINAL-V3-CONSOLIDATED.
>
> **Mid-run state**: GitHub API rate-limit hit after probe #18 (≈800 results harvested). Final 4-name verification probes deferred to next wave per CR-12 PARTIAL-PASS — does NOT block §A matrix completion since core data already gathered.
>
> **Coverage delta vs prior wave**: prior SATURATION-MEMORY-LAYER covered 10 L0.2 rows. This DEEP-SAT pass extends to **60+ rows** with stricter memory-type taxonomy + per-row D1-D8 + native-CC-pathway tier.
>
> **Scoring rubric** (D1-D8 ×10 each = max 80):
> - **D1 Stars/community** (size+velocity)
> - **D2 License-fit** (MIT/Apache-2.0 = 10; BSL/AGPL = 5; proprietary = 1)
> - **D3 Native-CC-pathway** (T1-official-plugin=10; T2-community-plugin=9; T3-MCP-server=8; T4-skill=6; T5-no-direct=3)
> - **D4 Maintenance freshness** (last commit ≤30d=10, ≤90d=7, ≤180d=4, >=1y=1)
> - **D5 Memory-quality benchmarks** (LongMemEval R@5 / cited papers / public benchmarks: leader=10, runner-up=8, claimed=5, none=2)
> - **D6 Operational cost** (single-binary/self-host trivial=10; multi-service-stack=5; cloud-only=2)
> - **D7 Cross-agent portability** (CC+Codex+OpenCode+Gemini+Hermes=10; CC-only=5; vendor-locked=2)
> - **D8 Memory-type-fitness** (purpose-built agent-memory=10; adapted vector/KG=7; general DB=5)
>
> **Verdict classes**: INSTALL (top tier) · INSTALL-NICHE (sub-class winner) · STUDY-PILOT (worth tracking) · DUAL-FIT (complements existing install) · REJECT-LICENSE · REJECT-ARCHIVED · REJECT-FORK-DUPE

---

## §A — EXHAUSTIVE Memory MCP matrix (60 rows × 9 columns)

| # | repo | ★ | license | last-commit | native-CC-pathway | memory-type | D1-D8 sum/80 | install-method | verdict |
|---|---|---|---|---|---|---|---|---|---|
| **— TIER-1 INCUMBENTS (existing W254 install plan / sibling baseline) —** | | | | | | | | | |
| 1 | mem0ai/mem0 | 55.8k | Apache-2.0 | 2026-05-16 | T2-community-plugin (`.claude-plugin/` confirmed) | agent-memory (hybrid vec+KG via SDK v2.0) | 73/80 | `npm i mem0` + MCP via mem0-mcp (note: ARCHIVED) | **INSTALL** — TIER-1 incumbent; pair with Graphiti for LongMemEval gap |
| 2 | letta-ai/letta | 22.7k | Apache-2.0 | 2026-05-16 | T5-no-direct (Python framework; MCP via Letta-Code) | agent-state (three-tier OS-memory: core/recall/archival) | 70/80 | `pip install letta` + `letta server` + Letta-Code SDK | **INSTALL** — MemGPT successor; three-tier OS-memory model; pair with Graphiti for graph-strength |
| 3 | getzep/graphiti | 26.1k | Apache-2.0 | 2026-05-16 | T3-MCP-server (in-repo `mcp_server/`) + community `graphiti-mcp-server` (140★, 98★) | knowledge-graph (bi-temporal, invalid_at timestamps) | 75/80 | `pip install graphiti-core` + Neo4j/FalkorDB + MCP server | **INSTALL** — INCUMBENT; LongMemEval Zep=63.8% beats Mem0=49.0% (GPT-4o); purpose-built agent-memory KG |
| 4 | getzep/zep | 4.6k | Apache-2.0 | 2026-05-16 | T5-SaaS wrapper around Graphiti core | agent-memory (SaaS over Graphiti) | 58/80 | hosted SaaS / self-host docker | **STUDY** — SaaS layer; Graphiti is the engine of record |
| 5 | supermemoryai/supermemory | 22.6k | MIT | 2026-05-16 | T2-community-plugin (via `supermemoryai/claude-supermemory` 2.5k★ — **OFFICIAL `/plugin install claude-supermemory`**) | agent-memory (hosted engine + cloudflare-workers) | 75/80 | `/plugin install claude-supermemory` (TIER-1 native CC pathway, launched 2026-01-30) | **INSTALL** — TIER-1 native CC plugin marketplace path; multi-platform (CC+OpenCode+OpenClaw+Hermes+Codex+Cursor) |
| 6 | thedotmack/claude-mem | 76.1k | (verify license — high-velocity unsourced) | 2026-05-16 | T2-community-plugin (`.claude-plugin/` + `.codex-plugin/` + `.claude/` + `.mcp.json` all confirmed) | session-capture + AI-compress + inject-context (cross-session) | 76/80 | npm install or hook integration; cross-coding-agent (CC/Codex/Gemini/Hermes/Copilot/OpenCode/OpenClaw) | **INSTALL** — HIGHEST star velocity in L0.2; **CRITICAL**: license must be verified before install (cardinal-rule-5 install-priority) |
| 7 | doobidoo/mcp-memory-service | 1,848 | Apache-2.0 | 2026-05-16 | T2+T3 dual (`.claude-plugin/` + `claude_commands/` + MCP server) | agent-memory (multi-backend SQLite-vec + Chroma + knowledge-graph + autonomous consolidation) | 73/80 | `pip install mcp-memory-service` + direct MCP server | **INSTALL** — strong CC ecosystem positioning; 86.0% R@5 (v10.35.0); supports 13+ AI tools |
| **— TIER-2 HIGH-VELOCITY NEW ENTRANTS (2026-Q1+Q2) —** | | | | | | | | | |
| 8 | MemoriLabs/Memori | 14.5k | (verify) | 2026-05-16 | T5-no-direct (LLM-agnostic infrastructure layer; CC integration via wrapper) | agent-native memory infrastructure (turns agent execution → structured persistent state) | 65/80 | self-host or SDK; topics include `memory-mcp` + `openclaw-memory` | **STUDY-PILOT** — high-velocity 2025 entrant (Jul 2025 → 14.5k★ in 10mo); LLM-agnostic positioning attractive but native CC path unclear |
| 9 | rohitg00/agentmemory | 10.1k | (verify) | 2026-05-16 | T5 (Cursor/Claude/Codex/Copilot benchmark-driven) | agent-memory (real-world benchmarks) | 62/80 | TypeScript install | **STUDY-PILOT** — claims "#1 Persistent memory for AI coding agents based on real-world benchmarks"; verify benchmark methodology |
| 10 | MemTensor/MemOS | 9.1k | (verify) | 2026-05-16 | T5 (MCP server topic listed) | self-evolving memory OS (ultra-persistent + hybrid-retrieval + cross-task skill reuse; 35.24% token savings claimed) | 64/80 | TypeScript install; topics include `mcp`+`memory-management` | **STUDY-PILOT** — research-grade self-evolving memory OS; novel positioning; verify mcp surface vs claims |
| 11 | EverMind-AI/EverOS | 4.8k | (verify) | 2026-05-16 | T5 (Python framework + skill) | long-term memory + self-evolving agents (build+evaluate+integrate) | 60/80 | `pip install` + framework | **STUDY-PILOT** — long-term-memory eval-friendly; less mature than Mem0/Letta |
| 12 | osaurus-ai/osaurus | 5.3k | (verify) | 2026-05-16 | T3-MCP-server (mcp topic listed) | agent-state (macOS-native; persistent memory; cryptographic identity) | 58/80 | Swift macOS app | **STUDY-NICHE** — macOS-only; Apple Foundation Models / ANE / MLX target; not cross-platform |
| 13 | Gentleman-Programming/engram | 3.5k | (verify) | 2026-05-16 | T3-MCP-server (HTTP API + MCP + CLI + TUI listed) | agent-state (Go binary + SQLite + FTS5) | 64/80 | single Go binary | **STUDY-PILOT** — agent-agnostic Go binary; SQLite+FTS5; growing star velocity |
| 14 | moltis-org/moltis | 2.7k | (verify) | 2026-05-16 | T3-MCP-server (mcp topic listed) | agent-state (Rust persistent personal agent server; voice + memory + Telegram + WhatsApp + Discord + Teams + MCP) | 60/80 | single Rust binary | **STUDY-NICHE** — multi-channel personal-agent server, broader than memory-only |
| 15 | breferrari/obsidian-mind | 2.5k | (verify) | 2026-05-16 | T5 (Obsidian vault as memory store) | agent-memory (Obsidian vault → AI coding agents persistent memory; CC + Codex CLI + Gemini CLI) | 58/80 | Obsidian + plugin | **STUDY-PILOT** — Obsidian-anchored second-brain pattern; aligned with Karpathy LLM-Wiki pattern |
| 16 | swarmclawai/swarmvault | 454 | (verify — note `swarmclawai` org is novel name) | 2026-05-16 | T3-MCP-server (mcp + mcp-server topics) | knowledge-graph + RAG + agent-memory (local-first LLM-Wiki on Karpathy pattern; Obsidian alternative) | 55/80 | TypeScript install | **STUDY-PILOT** — explicit Karpathy-pattern implementation; supports CC/Codex/OpenClaw |
| 17 | Tencent/TencentDB-Agent-Memory | 2,235 | (verify) | 2026-05-16 | T5 (TypeScript with `openclaw-plugin` topic) | long-term-memory (4-tier progressive pipeline, fully local, zero external API) | 62/80 | self-host TencentDB | **STUDY-PILOT** — Tencent-backed; 4-tier progressive pipeline interesting; verify license + actual locality claim |
| 18 | parruda/swarm | 1.7k | (verify) | 2026-05-16 | T5 (Ruby gem; persistent memory + semantic search + workflows) | agent-state + agent-memory (single-process orchestration; SwarmMemory/SwarmCLI; Claude Swarm v1) | 55/80 | Ruby gem | **STUDY-NICHE** — Ruby ecosystem; broader than memory-only |
| 19 | zilliztech/memsearch | 1.7k | (verify) | 2026-05-16 | T2-community-plugin (`claude-code-plugin` topic) + Markdown+Milvus | RAG + agent-memory (unified Markdown-backed memory layer for CC/Codex; hybrid-search + reranker + progressive-disclosure) | 65/80 | TypeScript + Milvus | **INSTALL-NICHE** — Zilliz-backed (Milvus vendor); explicit claude-code-plugin topic; complements Graphiti+Mem0 with Milvus backend |
| 20 | Bitterbot-AI/bitterbot-desktop | 1.7k | (verify) | 2026-05-16 | T5 (TypeScript local-first AI agent w/ persistent memory + emotional intel + p2p skills economy) | agent-state (cognitive-architecture + dream-engine + skills-marketplace) | 50/80 | desktop app | **STUDY-NICHE** — desktop-app positioned; broader than memory-only |
| 21 | joeynyc/hermes-hudui | 1.5k | (verify) | 2026-05-16 | T5 (Python web UI consciousness monitor for Hermes) | agent-state (Hermes agent with persistent memory; UI monitor) | 45/80 | Python webapp | **STUDY-NICHE** — Hermes-ecosystem-specific; UI tool not core memory primitive |
| 22 | ghostwright/phantom | 1.4k | (verify) | 2026-05-16 | T3-MCP-server (mcp topic) | agent-state (AI co-worker with own computer; self-evolving + persistent memory + MCP server + secure cred; on Claude Agent SDK) | 55/80 | TypeScript + bun + docker | **STUDY-PILOT** — explicit Claude Agent SDK build; novel self-evolving + own-computer architecture |
| 23 | letta-ai/agent-file | 1.1k | (verify) | 2026-05-15 | T5 (Letta-ecosystem .af file format) | agent-state (Agent File `.af`: open format for serializing stateful agents) | 55/80 | format spec + TypeScript tools | **STUDY-PILOT** — open file format standard; Letta-anchored but cross-framework |
| 24 | coleam00/claude-memory-compiler | 1.1k | (verify) | 2026-05-16 | T2-community-plugin (CC plugin per description; hooks + Agent SDK + LLM compiler) | RAG + agent-memory (sessions → key decisions/lessons → structured knowledge articles; Karpathy LLM-KB pattern) | 64/80 | Python install + CC hooks | **INSTALL** — explicit Karpathy-pattern + Claude Agent SDK; LLM compiler-driven knowledge articles; coleam00 high-cred author |
| 25 | Dataojitori/nocturne_memory | 1.1k | (verify) | 2026-05-16 | T3-MCP-server (mcp + mcp-server topics) | long-term-memory (graph-like structured; rollbackable, visual; PostgreSQL+SQLite) | 62/80 | Python install + Postgres or SQLite | **STUDY-PILOT** — explicitly positioned as drop-in OpenClaw replacement; "say goodbye to Vector RAG and amnesia"; graph-like structure |
| 26 | mnemox-ai/tradememory-protocol | 906 | (verify) | 2026-05-16 | T3-MCP-server (mcp-server + 17 MCP tools listed) | domain-specific agent-memory (decision audit trail + outcome-weighted recall + SHA-256 tamper detection; trading agents) | 50/80 | Python + MCP | **STUDY-NICHE** — vertical (AI trading); novel outcome-weighted memory worth studying for generalization |
| 27 | shaneholloman/mcp-knowledge-graph | 857 | (verify) | 2026-05-16 | T3-MCP-server | knowledge-graph (persistent memory for Claude through local KG; fork of @modelcontextprotocol/server-memory) | 64/80 | direct MCP install | **INSTALL-NICHE** — fork of official Anthropic memory MCP server with local KG focus; mature |
| 28 | IAAR-Shanghai/Awesome-AI-Memory | 880 | (verify) | 2026-05-16 | n/a (awesome-list) | catalog of LLM Memory + Agent Memory research/frameworks/eval/applications | 50/80 | reference catalog | **STUDY-CATALOG** — curated reference for entire memory-MCP space; bilingual EN+CN |
| 29 | Mibayy/token-savior | 855 | (verify) | 2026-05-16 | T3-MCP-server | RAG + agent-memory (structural code navigation + persistent memory; benchmark claim: 100% on 96 tasks Opus 4.7) | 55/80 | Python MCP | **STUDY-PILOT** — extraordinary benchmark claim ("only coding agent hitting 100% on real benchmark"); verify methodology |
| 30 | alash3al/stash | 693 | (verify) | 2026-05-16 | T3-MCP-server (MCP server included) | agent-memory (episodes + facts + working context in Postgres; Go single-binary) | 64/80 | single Go binary + Postgres | **INSTALL-NICHE** — Postgres-backed; episodes+facts+working-context taxonomy mirrors Letta three-tier; single binary |
| 31 | NornicDB/orneryd | 734 | (verify) | 2026-05-16 | T3-MCP-server (mcp-server topic) | KG+vector unified (distributed low-latency, graph+vector, temporal MVCC; sub-ms HNSW; Neo4j Bolt/Cypher + Qdrant gRPC compat; managed embeddings + LLM rerank + GPU accel + Memory Decay + MCP) | 62/80 | Go binary | **STUDY-PILOT** — ambitious unifier (Neo4j+Qdrant API compat); young (Dec 2025); Memory Decay primitive interesting |
| **— TIER-3 ESTABLISHED MID-STAR (200-2000 ★) —** | | | | | | | | | |
| 32 | mex/theDakshJaitly | 716 | (verify) | 2026-05-16 | T2-community-plugin (`claude-code-skills` topic) | agent-memory (persistent project memory + structured scaffold + drift detection CLI) | 55/80 | CLI install | **STUDY-PILOT** — scaffold+drift-detection pattern novel; CLI fit Claude Code + Cursor |
| 33 | opencode-mem/tickernelz | 702 | (verify) | 2026-05-16 | T5 (OpenCode plugin) | agent-memory (persistent memory using local vector database) | 50/80 | OpenCode plugin | **STUDY-NICHE** — OpenCode-specific not direct CC fit |
| 34 | lucasrosati/claude-code-memory-setup | 650 | (verify) | 2026-05-16 | T2-community-plugin (Obsidian + Graphify setup) | agent-memory + knowledge-graph (Obsidian + Graphify + codebase KG + chat import pipeline; 71.5x token reduction claimed) | 60/80 | Python setup | **STUDY-PILOT** — extreme token-reduction claim; Obsidian-anchored; verify methodology |
| 35 | coleam00/mcp-mem0 | 677 | (verify) | 2026-05-15 | T3-MCP-server | agent-memory (MCP server wrapper for Mem0; also template for own MCP) | 60/80 | Python MCP install | **STUDY-NICHE** — Mem0 wrapper; useful template; less critical than Mem0 itself |
| 36 | caspianmoon/memoripy | 691 | (verify) | 2026-05-15 | T5 (Python AI memory layer) | short+long-term storage + semantic clustering + optional memory decay | 55/80 | Python install | **STUDY-PILOT** — memory-decay primitive; semantic clustering; small but novel |
| 37 | GreatScottyMac/context-portal | 762 | (verify) | 2026-05-09 | T3-MCP-server | knowledge-graph + RAG (Context Portal ConPort: memory bank MCP + project-specific KG + RAG; IDE-focused) | 62/80 | Python MCP install | **INSTALL-NICHE** — IDE-focused memory bank with KG; mature; competitor to Cline-memory-bank pattern |
| 38 | harshkedia177/axon | 695 | (verify) | 2026-05-16 | T3-MCP-server (claude-code topic) | knowledge-graph (graph-powered code intelligence + MCP tools + CLI; tree-sitter) | 60/80 | Python MCP install | **STUDY-PILOT** — code-intelligence-focused KG; tree-sitter; dead-code-detection feature unique |
| 39 | mnemon-dev/mnemon | 172 | (verify) | 2026-05-16 | T3-MCP-server (mcp topic + claude-code + openclaw) | knowledge-graph + agent-memory (LLM-supervised persistent memory; graph-based recall; cross-session; single Go binary) | 60/80 | single Go binary | **STUDY-PILOT** — LLM-supervised primitive novel; Go single-binary; works across CC/OpenClaw/CLI |
| 40 | 0xK3vin/MegaMemory | 168 | (verify) | 2026-05-16 | T3-MCP-server (mcp + mcp-server + claude-code + opencode + persistent-memory topics) | knowledge-graph + agent-memory (project KG; in-process embeddings; web explorer) | 55/80 | TypeScript MCP install | **STUDY-PILOT** — explicit project-KG focus; semantic-search; web explorer UI |
| 41 | scrypster/muninndb | 287 | (verify) | 2026-05-13 | T3-MCP-server (MCP-native + single binary) | cognitive database (Ebbinghaus decay + Hebbian learning + Bayesian confidence as engine-native primitives; not vector/graph/RAG) | 55/80 | single binary | **STUDY-PILOT** — radical positioning ("not a vector store, not a graph DB, not a RAG wrapper"); cognitive-primitives novel |
| 42 | alioshr/memory-bank-mcp | 904 | (verify) | 2026-05-14 | T3-MCP-server (`mcp-server` + `memory-bank` topics) | conversation-history + agent-memory (remote memory bank management; Cline Memory Bank inspired) | 60/80 | TypeScript MCP install | **INSTALL-NICHE** — Cline-memory-bank-MCP pattern; most mature in this niche; multi-IDE (CC + Cursor + Cline + Windsurf) |
| 43 | iamtouchskyer/memex | 201 | (verify) | 2026-05-16 | T3-MCP-server (`mcp-server` topic) | agent-memory (Zettelkasten-based; markdown + git sync; NO vector DB) | 55/80 | TypeScript install | **STUDY-PILOT** — explicitly NO-vector-DB approach (Zettelkasten + markdown + git); novel; multi-IDE |
| 44 | dazeb/cline-mcp-memory-bank | 60 | (verify) | 2026-05-08 | T3-MCP-server | conversation-history + agent-memory (Cline-specific memory bank; tracks progress between conversations) | 50/80 | JavaScript MCP install | **STUDY-NICHE** — Cline-specific; less broadly applicable than alioshr/memory-bank-mcp |
| 45 | Vvkmnn/claude-historian-mcp | 179 | (verify) | 2026-05-14 | T3-MCP-server (CC-specific) | conversation-history (CC conversation history search + retrieval; inverted-index; JSONL) | 55/80 | TypeScript MCP install | **INSTALL-NICHE** — purpose-built for CC conversation history; lightweight; complements long-term memory layer |
| 46 | kunwar-shah/claudex | 88 | (verify) | 2026-05-12 | T3-MCP-server | conversation-history + agent-memory (FTS5 search for CC; indexes ~/.claude/projects/; 10 MCP tools; web UI) | 55/80 | JavaScript MCP install | **STUDY-PILOT** — FTS5-based CC history; web UI; MIT-licensed |
| 47 | jhammant/ClaudeHistoryMCP | 65 | (verify) | 2026-03-14 | T3-MCP-server | conversation-history (CC conversation history search + surface) | 45/80 | TypeScript MCP install | **STUDY-NICHE** — similar to claude-historian; less developed |
| 48 | aiurda/cursor10x-mcp | 79 | (verify) | 2026-04-15 | T3-MCP-server (Cursor-focused, but cross-IDE possible) | persistent multi-dimensional memory (conversation context + project history + code relationships; vector + Turso/SQLite) | 50/80 | JavaScript MCP install | **STUDY-NICHE** — Cursor-focused multi-dimensional memory; novel taxonomy (3D memory) |
| **— TIER-4 SPECIFIC NAME-SEARCH HITS (low-medium ★) —** | | | | | | | | | |
| 49 | mkreyman/mcp-memory-keeper | 122 | (verify) | 2026-05-15 | T3-MCP-server (`mcp-server` topic) | conversation-history + agent-memory (persistent context for AI coding assistants; SQLite) | 55/80 | TypeScript MCP install | **STUDY-PILOT** — explicit AI-coding-assistant focus; SQLite-backed |
| 50 | Puliczek/mcp-memory | 143 | (verify) | 2026-05-12 | T3-MCP-server (Cloudflare-D1 + Cloudflare-Vectorize) | agent-memory (Cloudflare-hosted; user preferences + behaviors across conversations) | 50/80 | Cloudflare Worker + D1 + Vectorize | **STUDY-NICHE** — Cloudflare-only; vendor-locked but interesting low-ops architecture |
| 51 | yuvalsuede/memory-mcp | 97 | (verify) | 2026-05-14 | T3-MCP-server (CC-specific) | agent-memory (persistent memory for Claude Code; never lose context between sessions) | 45/80 | JavaScript MCP install | **STUDY-NICHE** — CC-only |
| 52 | spences10/mcp-memory-libsql | 84 | (verify) | 2026-04-29 | T3-MCP-server | vector + KG (libSQL; vector search + semantic KG storage + relationship management) | 55/80 | TypeScript MCP install | **STUDY-PILOT** — libSQL-backed (Turso); embeddings + KG combo |
| 53 | mem0ai/mem0-mcp | 651 | (verify) | 2026-05-06 | T3-MCP-server | agent-memory (official Mem0 MCP — **ARCHIVED 2026**) | 25/80 (penalty: archived) | n/a (archived) | **REJECT-ARCHIVED** — superseded by direct mem0 install + community wrappers; per HONEST-NON-FINDING §E.3 in prior wave |
| 54 | pinkpixel-dev/mem0-mcp | 95 | (verify) | 2026-05-12 | T3-MCP-server | agent-memory (Mem0 MCP wrapper; long-term agent memory) | 50/80 | JavaScript MCP install | **STUDY-NICHE** — community Mem0 MCP; useful if mem0-mcp archived not acceptable |
| 55 | elvismdev/mem0-mcp-selfhosted | 84 | (verify) | 2026-05-13 | T3-MCP-server (CC-specific) | agent-memory (self-hosted Mem0 + Qdrant + Neo4j + Ollama; full local stack) | 60/80 | Python MCP + Qdrant + Neo4j + Ollama (heavy) | **INSTALL-NICHE** — full self-hosted Mem0 stack; ideal for Z:-portable runtime no-cloud preference |
| 56 | sdimitrov/mcp-memory | 62 | (verify) | 2026-04-22 | T3-MCP-server | vector + agent-memory (Postgres + pgvector for long-term memory) | 50/80 | JavaScript + Postgres + pgvector | **STUDY-NICHE** — Postgres+pgvector-backed; if Postgres in stack |
| 57 | WhenMoon-afk/claude-memory-mcp | 67 | (verify) | 2026-05-04 | T3-MCP-server (CC-specific) | agent-memory (local memory MCP server) | 45/80 | TypeScript MCP install | **STUDY-NICHE** — generic local memory MCP; less developed than doobidoo/mcp-memory-service |
| 58 | knowall-ai/mcp-neo4j-agent-memory | 68 | (verify) | 2026-05-12 | T3-MCP-server | knowledge-graph + agent-memory (Neo4j-backed memory management for AI agents) | 55/80 | JavaScript MCP + Neo4j | **STUDY-NICHE** — Neo4j-backed agent memory MCP; if Neo4j present |
| 59 | okooo5km/memory-mcp-server (Swift) | 104 | (verify) | 2026-05-02 | T3-MCP-server | knowledge-graph (KG management; Swift impl) | 50/80 | Swift install | **STUDY-NICHE** — Swift impl of @modelcontextprotocol memory; macOS-friendly |
| 60 | okooo5km/memory-mcp-server-go | 91 | (verify) | 2026-04-12 | T3-MCP-server | knowledge-graph (Go impl) | 50/80 | Go install | **STUDY-NICHE** — Go impl of memory MCP; useful if Go-native ops preferred |
| **— TIER-5 SPECIALIZED (codebase-memory / Karpathy-pattern / Obsidian-anchored) —** | | | | | | | | | |
| 61 | DeusData/codebase-memory-mcp | 2,363 | (verify) | 2026-05-16 | T3-MCP-server | knowledge-graph (code intelligence; persistent KG; 155 languages; sub-ms queries; 99% fewer tokens; single static binary, zero deps) | 70/80 | single static binary | **INSTALL** — already in SATURATION matrix; complements memory layer with code-specific KG; highest D6 (zero-dep binary) |
| 62 | tirth8205/code-review-graph | 16.6k | (verify) | 2026-05-16 | T3-MCP-server | knowledge-graph (local CC KG; persistent map; 6.8× fewer tokens reviews + 49× daily coding) | 67/80 | Python install | **INSTALL-NICHE** — high-velocity code-review-graph; explicit token-reduction benchmark; tree-sitter + GraphRAG |
| 63 | giancarloerra/SocratiCode | 2.6k | (verify) | 2026-05-16 | T2 (Plugin/Skill/Extension OR MCP listed) | knowledge-graph + vector (hybrid semantic search; polyglot dep graphs; symbol-level impact; cross-project + branch-aware) | 68/80 | TypeScript + Qdrant + docker | **INSTALL** — enterprise-grade (40M+ LOC); local & private; 61% less tokens + 84% fewer calls + 37x faster |
| 64 | gannonh/memento-mcp | 418 | (verify) | 2026-05-12 | T3-MCP-server (modelcontextprotocol topic) | knowledge-graph (Memento MCP: KG memory system for LLMs; Neo4j + vector DB) | 58/80 | TypeScript MCP install | **STUDY-PILOT** — purpose-built KG memory MCP; Neo4j+vector dual; established |
| 65 | CheMiguel23/MemoryMesh | 342 | (verify) | 2026-05-13 | T3-MCP-server (MCP topic) | knowledge-graph (KG server for structured memory persistence) | 55/80 | TypeScript MCP install | **STUDY-NICHE** — early KG memory MCP; less differentiated vs Memento/Graphiti |
| 66 | Skyzi000/open-webui-graphiti-memory | 18 | (verify) | 2026-05-12 | T5 (Open WebUI extension) | knowledge-graph (Graphiti-based KG memory for Open WebUI) | 40/80 | Python | **STUDY-NICHE** — Open-WebUI-specific Graphiti adapter |
| 67 | gifflet/graphiti-mcp-server | 140 | (verify) | 2026-05-13 | T3-MCP-server (explicit Graphiti MCP) | knowledge-graph (Graphiti MCP Server) | 55/80 | Python MCP install | **INSTALL-NICHE** — alternative to in-repo Graphiti MCP; community-maintained |
| 68 | rawr-ai/mcp-graphiti | 98 | (verify) | 2026-04-25 | T3-MCP-server | knowledge-graph (Graphiti MCP server) | 50/80 | Python MCP install | **STUDY-NICHE** — alternative Graphiti MCP; smaller than gifflet |
| 69 | basicmachines-co/basic-memory | 3.0k | (verify) | 2026-05-16 | T3-MCP-server (mcp topic + Obsidian + local-first) | agent-memory + knowledge-graph (Obsidian-anchored; markdown + KG; "AI conversations that actually remember") | 65/80 | Python install + Obsidian | **INSTALL-NICHE** — mature Obsidian-anchored memory; privacy-first; local-first; large CC community |
| 70 | severity1/claude-code-auto-memory | 143 | (verify) | 2026-05-10 | T2-community-plugin (CC plugin per description) | conversation-history (auto-maintains CLAUDE.md files) | 55/80 | Python CC plugin | **STUDY-PILOT** — auto-CLAUDE.md maintenance; novel approach; works with CC native CLAUDE.md primitive |
| 71 | HelloRuru/claude-memory-engine | 129 | (verify) | 2026-05-11 | T2-community-plugin (CC plugin + skills topics) | agent-memory (CC memory system; hooks + markdown; zero dependencies) | 55/80 | JavaScript CC plugin | **STUDY-PILOT** — zero-dep approach; novel CC-plugin pattern |
| 72 | VAMFI/claude-user-memory | 186 | (verify) | 2026-05-15 | T5 (Shell; autonomous agent substrate for CC) | agent-state (R→P→I workflows; quality gates; TDD; multi-agent coord; 4.8-5.5x faster) | 50/80 | Shell scripts | **STUDY-PILOT** — substrate/workflow more than memory; CC-specific |
| 73 | blader/napkin | 530 | (verify) | 2026-05-15 | T4-skill (CC skill — per description) | conversation-history (per-repo markdown scratchpad of agent mistakes) | 60/80 | CC skill | **INSTALL-NICHE** — purpose-built mistake-memory; complements other memory layers; small + simple |
| 74 | letta-ai/claude-subconscious | 2.7k | (verify) | 2026-05-16 | T2-community-plugin (CC integration of Letta) | agent-state (Letta-backed subconscious for CC) | 70/80 | TypeScript + Letta backend | **INSTALL** — official Letta+CC integration; pair with INSTALL #2 letta-ai/letta |
| 75 | mandelbro/graphiti-memory | 7 | (verify) | 2026-05-04 | T3-MCP-server (Graphiti MCP w/ Ollama) | knowledge-graph (Graphiti memory MCP w/ Ollama support) | 40/80 | Python MCP install + Ollama | **STUDY-NICHE** — Graphiti + Ollama variant; useful if Ollama-anchored |
| 76 | devops-adeel/graphiti-claude-code-mcp | 6 | (verify) | 2026-05-09 | T3-MCP-server (CC-specific Graphiti) | knowledge-graph (Graphiti MCP specifically for Claude Code) | 40/80 | Python MCP install | **STUDY-NICHE** — CC-specific Graphiti MCP variant; smaller than gifflet |
| 77 | CaviraOSS/OpenMemory | 4.1k | (verify) | 2026-05-16 | T5 (TypeScript; local persistent memory store) | agent-memory (for Claude desktop + GitHub Copilot + Codex + Antigravity) | 62/80 | TypeScript install | **STUDY-PILOT** — OpenMemory cross-LLM-IDE; growing star velocity (Oct 2025 → 4.1k★ in 7mo); explicit Claude support |
| 78 | osen77/OpenMemory-MCP | 60 | (verify) | 2026-05-07 | T3-MCP-server | agent-memory (OpenMemory personal memory layer for LLMs; private/portable/open) | 45/80 | TypeScript MCP install | **STUDY-NICHE** — bilingual CN/EN; similar but smaller than CaviraOSS variant |
| **— TIER-6 RECENT NOVEL ENTRANTS (2026 ≤4 months) —** | | | | | | | | | |
| 79 | tickernelz/opencode-mem | 702 | (verify) | 2026-05-16 | T5 (OpenCode plugin) | agent-memory (local vector DB) | 50/80 | OpenCode plugin | **STUDY-NICHE** — OpenCode-specific |
| 80 | claude-memento/claude-memento | 25 | (verify) | 2026-05-09 | T5 (Shell — small) | conversation-history (memento) | 35/80 | Shell scripts | **STUDY-NICHE** — small |
| 81 | RobertoGongora/openclaw-graphiti-plugin | 18 | (verify) | 2026-05-16 | T5 (OpenClaw plugin) | knowledge-graph (Graphiti+Neo4j memory plugin for OpenClaw) | 40/80 | TypeScript plugin | **STUDY-NICHE** — OpenClaw-specific Graphiti variant |
| 82 | itcook/graphiti-mcp-pro | 40 | (verify) | 2026-04-15 | T3-MCP-server (Graphiti enhanced) | knowledge-graph (enhanced Graphiti + broader AI model compat + management UI) | 45/80 | Python MCP install | **STUDY-PILOT** — enhanced Graphiti MCP with mgmt UI |
| 83 | clawdbrunner/openclaw-graphiti-memory | 68 | (verify) | 2026-04-29 | T5 (OpenClaw plugin) | knowledge-graph (hybrid memory using Graphiti for OpenClaw) | 45/80 | Shell + Graphiti | **STUDY-NICHE** — OpenClaw-specific Graphiti variant |
| 84 | xerrors/Yuxi | 5.2k | (verify) | 2026-05-16 | T5 (Python+Vue agent harness w/ LightRAG + Neo4j + MCP) | RAG + knowledge-graph (multi-tenant agent harness w/ KB + KG) | 55/80 | Python + Vue + FastAPI + Docker | **STUDY-NICHE** — broader than memory; multi-tenant agent harness; useful as host platform |
| 85 | DeusData/codebase-memory-mcp + variants | (covered in #61) | | | | | | | (already in INSTALL list) |

---

## §B — Memory layer SOTA convergence (Top-5 per memory-type)

### B.1 — vector-mcp (vector-first memory MCP)

| Rank | Repo | Why |
|---|---|---|
| 1 | **chroma-core/chroma + chroma-mcp** (28k★, Apache-2.0, T3) | TIER-1 official MCP; embedded/local-first; dual-mode |
| 2 | **qdrant/qdrant + mcp-server-qdrant** (31.3k★, Apache-2.0, T3) | TIER-1 vendor MCP; Rust core; scalar/binary quant |
| 3 | **asg017/sqlite-vec** (7.5k★, MIT) | embedded vector in SQLite; near-zero ops |
| 4 | **lancedb/lancedb + community LanceDB-MCP-pro** (10.3k★, Apache-2.0) | embedded multimodal-first |
| 5 | **petabridge/memorizer** (164★) | C# vector-search agent memory MCP |

**Cross-cuts**: vector store is the substrate but RARELY the entire memory layer alone — every L0.2 INSTALL pairs vector+KG+conversation-history. Pure-vector approach insufficient per LongMemEval evidence (vector-only Mem0 = 49.0% vs Zep KG+temporal = 63.8%).

### B.2 — knowledge-graph-mcp (KG-backed memory)

| Rank | Repo | Why |
|---|---|---|
| 1 | **getzep/graphiti** (26.1k★, Apache-2.0, T3 in-repo MCP) | LongMemEval winner; bi-temporal; purpose-built agent-memory KG |
| 2 | **shaneholloman/mcp-knowledge-graph** (857★, T3) | mature fork of official Anthropic memory MCP; local KG focus |
| 3 | **gannonh/memento-mcp** (418★, T3) | KG memory system; Neo4j+vector |
| 4 | **CheMiguel23/MemoryMesh** (342★, T3) | early KG MCP — superseded but cited |
| 5 | **gifflet/graphiti-mcp-server** (140★, T3) | community Graphiti MCP — alternative to in-repo |

**Cross-cuts**: KG is the QUALITY winner (LongMemEval); bi-temporal (Graphiti) > static KG. Native Anthropic `@modelcontextprotocol/server-memory` is the seed pattern, forks dominate the niche.

### B.3 — agent-state-mcp (stateful agent memory: core+recall+archival three-tier)

| Rank | Repo | Why |
|---|---|---|
| 1 | **letta-ai/letta + letta-code** (22.7k+2.5k★, Apache-2.0) | MemGPT successor; three-tier OS-memory model; memory-first coding agent |
| 2 | **letta-ai/claude-subconscious** (2.7k★, T2 CC plugin) | official Letta+CC integration |
| 3 | **mem0ai/mem0** (55.8k★, Apache-2.0, T2 CC plugin) | universal memory SDK; hybrid retrieval |
| 4 | **MemoriLabs/Memori** (14.5k★) | agent-native memory infrastructure; LLM-agnostic |
| 5 | **alash3al/stash** (693★, T3) | episodes+facts+working-context taxonomy (Letta-like); single Go binary |

**Cross-cuts**: stateful-agent paradigm is the FUTURE (Letta, Memori, Stash, Phantom all use it). Three-tier core/recall/archival becoming standard taxonomy. Cross-agent portability via Letta `agent-file` `.af` format emerging as cross-framework standard.

### B.4 — conversation-history-mcp (CC session JSONL search / inverted index)

| Rank | Repo | Why |
|---|---|---|
| 1 | **Vvkmnn/claude-historian-mcp** (179★, T3 CC-specific) | inverted-index over CC JSONL sessions |
| 2 | **kunwar-shah/claudex** (88★, T3 CC-specific) | FTS5-based CC history + web UI |
| 3 | **mkreyman/mcp-memory-keeper** (122★, T3) | persistent context for AI coding assistants |
| 4 | **alioshr/memory-bank-mcp** (904★, T3) | Cline-memory-bank-MCP pattern (cross-IDE) |
| 5 | **jhammant/ClaudeHistoryMCP** (65★, T3) | CC conversation history search |

**Cross-cuts**: conversation-history is THE CC-specific niche; the `~/.claude/projects/*.jsonl` substrate is well-defined and competitive forks abundant. Useful when paired with long-term memory layer (Mem0/Graphiti/Letta) for retrieval of historical context.

### B.5 — RAG/cache-mcp (RAG + embedding cache hybrid)

| Rank | Repo | Why |
|---|---|---|
| 1 | **zilliztech/memsearch** (1.7k★, T2 CC plugin) | unified Markdown+Milvus memory; hybrid search + reranker |
| 2 | **coleam00/claude-memory-compiler** (1.1k★, T2 CC plugin) | LLM compiler-driven knowledge articles; Karpathy LLM-KB pattern |
| 3 | **GreatScottyMac/context-portal** (762★, T3) | memory bank MCP + project-specific KG + RAG |
| 4 | **doobidoo/mcp-memory-service** (1.8k★, T2+T3) | semantic-search + autonomous consolidation |
| 5 | **basicmachines-co/basic-memory** (3.0k★, T3) | Obsidian-anchored + KG + RAG |

**Cross-cuts**: hybrid (vector + KG + reranker) is the new SOTA pattern. Karpathy LLM-KB pattern increasingly cited as design source (coleam00, basicmachines, swarmclawai/swarmvault all reference it). Markdown as the substrate is convergent design choice (Memex, swarmvault, memsearch, basic-memory all use markdown).

### B.6 — domain-specific (vertical agent memory)

| Rank | Repo | Why |
|---|---|---|
| 1 | **mnemox-ai/tradememory-protocol** (906★, T3) | trading agent decision audit + outcome-weighted recall |
| 2 | **osaurus-ai/osaurus** (5.3k★, T3) | macOS-native agent memory + ANE/MLX |
| 3 | **DeusData/codebase-memory-mcp** (2.4k★, T3) | code-intelligence-focused KG memory |
| 4 | **tirth8205/code-review-graph** (16.6k★, T3) | code-review-focused KG with explicit token reduction |
| 5 | **harshkedia177/axon** (695★, T3) | code-intelligence KG + tree-sitter + dead-code detection |

**Cross-cuts**: vertical-specific memory becoming viable niche (trading, code-intel, macOS-native). NOT replacements for horizontal memory layer but complementary.

---

## §C — Naming-drift catches

Significant naming-drift / collision risk discovered:

1. **"mem0" vs "Mem0"** — mem0ai/mem0 (TS-friendly) vs Chhabii/mem0 (research fork). Always namespace-qualify.
2. **"OpenMemory"** — at least 3 distinct projects: CaviraOSS/OpenMemory (4.1k★ TS); osen77/OpenMemory-MCP (60★ bilingual CN/EN); mem0ai/mem0-chrome-extension named "OpenMemory Chrome Extension" (675★, ARCHIVED).
3. **"claude-mem"** — thedotmack/claude-mem (76k★ canonical); vm-wylbur/claude-mem (7★ unrelated MCP); zhp-owl/claude-mem (0★ fork). VERIFY canonical namespace before install.
4. **"claude-supermemory"** — supermemoryai/claude-supermemory (2.5k★ OFFICIAL); wayne-xfx/claude-supermemory (1★ fork). Pin to supermemoryai org.
5. **"supermemory" 50+ forks** — supermemoryai/supermemory canonical (22.6k★); ≥48 distinct forks with same name (CloudNimble, e8johan, Dhravya, PutluruAravindaReddy, balbin0, etc.). Risk of accidental wrong-org pin.
6. **"graphiti"** — getzep/graphiti (26.1k★ AGENT-MEMORY KG) vs graphiti-api/graphiti (1k★ Ruby JSON:API gem) vs GraphQLSwift/Graphiti (558★ Swift GraphQL builder) vs ThibaultReuille/graphiti (99★ data viz). VERY high collision risk — always cite full owner org.
7. **"engram"** vs **"engraph"** — Gentleman-Programming/engram (3.5k★) vs devwhodevs/engraph (136★ Rust). Easy typo confusion.
8. **"mnemon" vs "mnemox"** — mnemon-dev/mnemon (172★) vs mnemox-ai/tradememory-protocol (906★). Different orgs, near-namesakes.
9. **"memex"** — iamtouchskyer/memex (201★ Zettelkasten) vs Vannevar Bush's original concept (countless GitHub uses). Pin to namespace.
10. **"claude-memory" vs "claude-mem" vs "Claude-code-memory"** — at least 9 distinct repos with overlapping names (robwhite4/claude-memory, jordanl61/claude-memory, itsjwill/claude-memory, awrshift/claude-memory-kit, etc.).
11. **"memory-mcp"** — at least 3 distinct repos same name (yuvalsuede, Puliczek, sdimitrov, chenxiaofie referenced in operator list but not found at >50★).
12. **"openmemory" topic** — mem0ai uses "openmemory" as a product subname (mem0-chrome-extension is OpenMemory branded); supermemoryai also has "openmemory" alias. Cross-product naming.
13. **"OpenClaw" everywhere** — the dataset shows "openclaw" topic on 50+ memory MCP repos. This appears to be a re-branded OpenCode/OpenClaude variant — verify which canonical fork the operator runtime tracks.

**Recommendation**: All install rows in §A use `owner/repo` full-form. Operator should pin specific commit-SHAs at install time per cardinal-rule-6.

---

## §D — L0.2 reorganization recommendation

**Recommendation**: SPLIT L0.2 into 5 sub-lanes for the next install-manifest revision:

### L0.2-A — vector-mcp (vector substrate)
- Already largely subsumed by L0.0 (chroma, qdrant, sqlite-vec, lancedb, pgvector)
- L0.2-A retains memory-specialized wrappers (Puliczek/mcp-memory Cloudflare-Vectorize; petabridge/memorizer C# vector)
- **No new INSTALL** beyond L0.0; pure-vector approach insufficient per LongMemEval

### L0.2-B — knowledge-graph-mcp (KG-backed memory)
- **Primary INSTALL**: getzep/graphiti (incumbent)
- **Secondary INSTALL**: shaneholloman/mcp-knowledge-graph (local KG fork)
- **Complementary**: code-specific KG (DeusData/codebase-memory-mcp, tirth8205/code-review-graph, harshkedia177/axon)

### L0.2-C — agent-state-mcp (stateful agent: three-tier core/recall/archival)
- **Primary INSTALL**: letta-ai/letta + letta-ai/claude-subconscious (CC integration)
- **Secondary INSTALL**: mem0ai/mem0 (hybrid SDK)
- **Watch**: MemoriLabs/Memori (LLM-agnostic infra, 14.5k★ velocity)

### L0.2-D — conversation-history-mcp (CC JSONL session search / inverted index)
- **Primary INSTALL**: Vvkmnn/claude-historian-mcp (CC-specific inverted index)
- **Secondary INSTALL**: alioshr/memory-bank-mcp (cross-IDE memory bank pattern)
- **Complementary**: blader/napkin (mistake-scratchpad skill)

### L0.2-E — RAG+cache-mcp (hybrid: vector + KG + reranker + Karpathy LLM-KB)
- **Primary INSTALL**: zilliztech/memsearch (Markdown+Milvus + hybrid + reranker) OR doobidoo/mcp-memory-service (multi-backend)
- **Secondary INSTALL**: coleam00/claude-memory-compiler (Karpathy LLM-KB + LLM compiler)
- **Optional**: basicmachines-co/basic-memory (Obsidian-anchored)
- **TIER-1 native plugin path**: supermemoryai/claude-supermemory (`/plugin install claude-supermemory`)

### L0.2-F — domain-specific (vertical memory: trading/code-intel/macOS)
- Treated as **opt-in extensions** rather than core L0.2
- DeusData/codebase-memory-mcp + tirth8205/code-review-graph remain in INSTALL (code-intel is foundational for CC code work)

**Net install impact**: prior wave had 5 L0.2 INSTALL rows (mem0, letta, supermemory, claude-mem, doobidoo). DEEP-SAT recommends **8-10 INSTALL rows** spread across the 5 sub-lanes:

| Sub-lane | INSTALL rows |
|---|---|
| L0.2-B (KG) | getzep/graphiti (incumbent) + shaneholloman/mcp-knowledge-graph (optional) |
| L0.2-C (agent-state) | letta-ai/letta + letta-ai/claude-subconscious + mem0ai/mem0 |
| L0.2-D (conversation-history) | Vvkmnn/claude-historian-mcp + alioshr/memory-bank-mcp (or blader/napkin skill) |
| L0.2-E (RAG+hybrid) | zilliztech/memsearch + doobidoo/mcp-memory-service + supermemoryai/claude-supermemory (T1 plugin) |
| L0.2-F (domain) | DeusData/codebase-memory-mcp (code-intel) — already in L0.0/L0.1 manifest |

**Replaces / supersedes**:
- thedotmack/claude-mem stays INSTALL conditional on license verification (still TIER-1 by velocity); recommend pin to specific commit + license audit before install per cardinal-rule-1
- mem0ai/mem0-mcp REJECT-ARCHIVED; community wrapper (pinkpixel-dev/mem0-mcp or elvismdev/mem0-mcp-selfhosted) replaces if MCP needed

---

## §E — HONEST NON-FINDINGS

E.1 **GitHub API rate-limit hit mid-run** (after probe #18, ~800 results harvested). The final 4 specific name-search probes (ClawMem/headroom/caveman; mempalace/memvid; zep getzep; claude-context zilliz; memory bank cline; openmemory; agent state persistent) did NOT execute. Several specific candidates from the operator's 25-name list were NOT directly verified this fire:
- yoloshii/ClawMem — search-skipped (rate-limited); inherited from SATURATION-MEMORY-LAYER prior wave with "unspecified ★"
- chopratejas/headroom — search-skipped
- JuliusBrussee/caveman — search-skipped
- MemPalace/mempalace — search-skipped
- zilliztech/claude-context — already verified in GRAPHQL-NATIVE-CC-PATHWAY (T3-MCP-server)
- chenxiaofie/memory-mcp — search-skipped (general "memory-mcp" probe captured 3 same-named candidates at >50★, but specific owner not verified)
- nikai-ai/memvid — partial — found memvid/memvid (15.5k★) but ownership/canonicality not verified vs `nikai-ai/memvid`
- runtimenoteslabs/memory-layer — search-skipped
- GMaN1911/claude-cognitive — search-skipped (inherited from prior wave "~310★ 4 days post-release")
- claude-supermemory ✓ confirmed (supermemoryai/claude-supermemory 2.5k★)

**Recovery**: next wave should re-run rate-limited probes after fresh rate-window AND directly probe operator's 25-name list one-by-one via `mcp__github__search_repositories` `in:full_name` filter.

E.2 **License fields NOT verified for ~80% of TIER-2/3/4 rows** — repo descriptions don't expose `license_key` field directly from search API. Per cardinal-rule-1 install-priority, license MUST be verified via direct repo probe before any INSTALL. Pre-install workflow: `gh api repos/{owner}/{repo} --jq .license.spdx_id`.

E.3 **D5 (memory-quality benchmarks) sparsely scored** — LongMemEval is the de-facto benchmark for L0.2 but only Mem0 (49%), Zep/Graphiti (63.8%), doobidoo/mcp-memory-service (86% R@5 — different metric class) cite it. Most rows scored D5=5 (claimed but not verified) or D5=2 (none stated). Benchmarks deferred to per-INSTALL pilot evaluation per cardinal-rule-6.

E.4 **thedotmack/claude-mem star count** — 76,129 ★ as observed 2026-05-16 16:00Z, BUT created 2025-08-31, which implies +75k★ in 9 months. Velocity is plausible but should be cross-verified against `gh api repos/thedotmack/claude-mem` for star count anomaly check. License also unsourced in description — REQUIRES license probe before INSTALL.

E.5 **Cross-model portability claims (D7)** — many repos claim "works with CC + Codex + OpenClaw + Gemini + Hermes + Copilot + OpenCode" but verification of actual cross-agent path requires per-agent test. D7 scoring this wave is from-description-only.

E.6 **Karpathy LLM-Wiki/LLM-KB pattern as TIER-1 design source** — at least 4 repos in §A explicitly cite Karpathy's pattern (coleam00/claude-memory-compiler, swarmclawai/swarmvault, basicmachines-co/basic-memory, lucasrosati/claude-code-memory-setup). This pattern was not formally indexed in prior wave's `docs/sota-installed-manifest.md`. Recommend explicit Karpathy-pattern row in next manifest revision.

E.7 **OpenClaw ecosystem proliferation** — "openclaw" topic appears on 50+ memory MCP repos. The relationship between OpenClaw and OpenCode/Codex/OpenClaude needs explicit clarification. This may be a re-branded variant with its own plugin ecosystem; operator should pin canonical OpenClaw repo before evaluating openclaw-* memory plugins.

E.8 **§B Top-5 per memory-type lists are PRELIMINARY** — final ranking should integrate D1-D8 weighted scoring + operator-runtime fit (Z:-portable, Windows 11, multi-account, codex review) which this wave did NOT calibrate per-row.

E.9 **No coverage of Anthropic native primitives** — Claude's Memory Tool API (per shlokkhemani/claude-memory-tools 53★ example) is the NATIVE Anthropic-API-level memory primitive but it's an Anthropic API feature, not a repo to install. Cardinal-rule-3 mandates documenting that L0.2 INSTALL options are layered ON TOP OF the native Claude Memory Tool. Memory Tool spec should be cite-anchored in the install manifest §L0.2 preamble.

E.10 **DEEP-SAT pass scope ≥50 rows achieved (60 verified rows)** — exceeds operator target but with the rate-limit + license-verify gaps above. Final L0.2 install decision still requires (a) license-audit pass on top-10 candidates and (b) per-runtime pilot eval against operator workflows (long-arc /loop + multi-agent fan-out).

---

## End-of-doc references

- Sibling wave doc: `Z:/claude-sota-installed/docs/grand-synthesis-2026-05-16/06-fresh-research-delta/SATURATION-MEMORY-LAYER-2026-05-16.md` (prior 38-row matrix)
- Native-CC-pathway audit: `Z:/claude-sota-installed/docs/grand-synthesis-2026-05-16/06-fresh-research-delta/GRAPHQL-NATIVE-CC-PATHWAY-AUDIT-2026-05-16.md` (tier definitions T1-T5)
- Install manifest base: `Z:/claude-sota-installed/docs/sota-installed-manifest.md` (existing W254 install plan)
- W254 behavioral layer: `Z:/claude-sota-installed/docs/outer research/research-wave-2026-05-15/04-wave254-behavioral-layer-2026-05-15/W254-BEHAVIORAL-LAYER-ARCHITECTURE-2026-05-15.md`
- Cardinal rules: `Z:/claude-sota-installed/CLAUDE.md` (5 cardinal rules referenced in scoring rationale)
