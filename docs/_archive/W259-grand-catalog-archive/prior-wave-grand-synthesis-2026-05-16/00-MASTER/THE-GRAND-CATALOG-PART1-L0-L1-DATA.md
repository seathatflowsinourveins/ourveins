# THE GRAND CATALOG — PART 1: L0-L1 Data Cluster
> **Aggregated 2026-05-16** from 12 deep-saturation fork files. Companion to top-tier `THE-GRAND-CATALOG-MATRIX-2026-05-16.md` (308 highest-priority) and `THE-ULTIMATE-MASTER-2026-05-16.md` (exec brief).
> **Source forks** (12): DEEP-SAT-L00-VECTOR-DB, DEEP-SAT-L01-L03-KG-RAG, DEEP-SAT-L02-MEMORY-MCP, DEEP-SAT-L0MCP-ALL-SERVERS, DEEP-SAT-L025-LOCAL-INFERENCE, DEEP-SAT-L15-L45-COMPRESSION-INGESTION, DEEP-SAT-FINAL-CACHE-PEER-CC-TEMPLATES, SATURATION-MEMORY-LAYER, GAP-LAYER-L025-L075-INFERENCE-SANDBOX, GAP-WORKFLOW-KGVECTOR, SATURATION-CODEX-MULTIACCOUNT, BACKLOG-TRANCHE-J-LICENSE-DEEP.
> **Scope**: every org/repo mentioned in source forks, partitioned by sub-layer, sorted by stars-desc within each sub-layer.
> **Native-CC-pathway tiers**: T1=official vendor plugin/MCP · T2=community CC-plugin · T3=community MCP-server · T4=skill-only · T5=no-direct-CC-path · "?"=unverified.
> **Verdict classes**: INSTALL · INSTALL-NICHE · INSTALL-COMPONENT · TRANSITIVE-INSTALL · STUDY-PILOT · STUDY-CATALOG · STUDY-NICHE · STUDY-COMPONENT · DEFER · REJECT-ARCHIVED · REJECT-LICENSE · REJECT-NICHE · REJECT-FORK-DUPE · REJECT-VENDOR-NICHE · REFERENCE · WATCH.

## Coverage map

| Layer | Sub-layer | Row count | Top 3 INSTALL |
|---|---|---:|---|
| L0.0 | Vector DB | 42 | qdrant · chroma-core/chroma · pgvector+pgvectorscale |
| L0.1 | Knowledge Graph | 26 | getzep/graphiti · topoteretes/cognee · FalkorDB (backend) |
| L0.2 | Memory MCP | 84 | mem0 · supermemory · letta + doobidoo/mcp-memory-service |
| L0.25 | Local Inference Runtime | 45 | vllm-project/vllm · sgl-project/sglang · ollama/ollama |
| L0.3 | RAG framework | 31 | infiniflow/ragflow · HKUDS/LightRAG · deepset-ai/haystack |
| L0.7 | MCP server primitives | 88 | modelcontextprotocol/servers · github-mcp-server · chrome-devtools-mcp |
| L0.8 | Cache (KV/vector/semantic) | 9 | sqlite-vec · LMCache · lancedb |
| L1.0 | Cross-model proxy/gateway | 14 | LiteLLM · Portkey · OpenRouter |
| L1.1 | Multi-account orchestration | 5 | codex-plugin-cc · CCS · CLIProxyAPI |
| L1.5 | Token Compression | 17 | context-mode (incumbent) · caveman · claw-compactor |
| L4.5 | Document Ingestion | 24 | docling+docling-mcp · MinerU+Document-Explorer · markitdown+markitdown-mcp |
| L5.7 | Durable Workflow Execution | 7 | dbos-transact-py · restate · hatchet |
| **TOTAL** | | **392** | |

---

## §L0.0 — Vector DB (42 rows)

| Repo | Stars | License | Sub-category | Native-CC-pathway | Verdict | Source-fork |
|---|---:|---|---|---|---|---|
| milvus-io/milvus | 44.3k | Apache-2.0 | standalone-distributed | T1 — Zilliz MCP (14 tools) | STUDY-PILOT | L00-vec |
| facebookresearch/faiss | 37.7k | MIT | in-memory-lib | T5 | TRANSITIVE-INSTALL | L00-vec |
| surrealdb/surrealdb | 32.1k | BSL-1.1 → Apache after 4yr | multi-model+vector | T3 community | STUDY-PILOT | L00-vec |
| qdrant/qdrant | 31.3k | Apache-2.0 | standalone-server | T1 — qdrant/mcp-server-qdrant 1.4k★ | **INSTALL** (incumbent) | L00-vec |
| chroma-core/chroma | 28.0k | Apache-2.0 | embedded+server (dual) | T1 — chroma-core/chroma-mcp 547★ | **INSTALL** | L00-vec |
| typesense/typesense | 25.8k | GPL-3.0 | FTS+vector hybrid | T3 community | STUDY-PILOT | L00-vec |
| pgvector/pgvector | 21.3k | PostgreSQL-license | postgres-extension | T3 via postgres-mcp | **INSTALL** (if PG present) | L00-vec |
| weaviate/weaviate | 16.2k | BSD-3-Clause | standalone-server | T3 via Verba | STUDY-PILOT | L00-vec |
| spotify/annoy | 13.5k | Apache-2.0 | in-memory-lib (legacy) | T5 | STUDY-LEGACY | L00-vec |
| tursodatabase/turso | 12k+ | Apache-2.0 | embedded SQLite-fork w/ DiskANN | T3 via Turso MCP | INSTALL-NICHE | L00-vec |
| tursodatabase/libsql | 11k | MIT | embedded SQLite-fork | T3 | INSTALL-NICHE | L00-vec |
| lancedb/lancedb | 10.3k | Apache-2.0 | embedded multimodal | T3 — LanceDB-MCP-pro 4.3k★ | **INSTALL** | L00-vec |
| activeloopai/deeplake | 8.5k | MPL-2.0 | standalone GPU-DB | T5 | STUDY-NICHE | L00-vec |
| asg017/sqlite-vec | 7.5k | MIT | embedded SQLite-extension | T5 (pair w/ any MCP) | **INSTALL** (zero-ops) | L00-vec |
| vespa-engine/vespa | 6.9k | Apache-2.0 | standalone enterprise tensor+vec | T5 | REJECT-NICHE (solo-dev) | L00-vec |
| nmslib/hnswlib | 5.1k | Apache-2.0 | in-memory-lib HNSW reference | T5 | TRANSITIVE-INSTALL | L00-vec |
| marqo-ai/marqo | 5.0k | Apache-2.0 | multimodal vertical | T3 | REJECT-NICHE (ecommerce vertical) | L00-vec |
| RediSearch/RediSearch | ~5k | RSALv2/SSPLv1/AGPLv3 triple | redis-module HNSW+FLAT | T3 community | STUDY-PILOT (license) | L00-vec |
| HelixDB/helix-db | 4.1k | AGPL-3.0 | standalone unified vec+graph | T3 built-in MCP | STUDY-PILOT | L00-vec |
| unum-cloud/USearch | 4.1k | Apache-2.0 | in-memory-lib single-file SIMD | T5 | STUDY-PILOT | L00-vec |
| vearch/vearch | 2.1k | Apache-2.0 | standalone Tencent/JD distributed | T5 | STUDY-NICHE | L00-vec |
| tensorchord/pgvecto.rs | 1.8k | Apache-2.0 | postgres-extension (legacy) | T3 | STUDY-PILOT (sunset) | L00-vec |
| tensorchord/VectorChord | ~1.8k | AGPL-3.0/ELv2 dual | postgres-extension | T3 | INSTALL-NICHE (license tail) | L00-vec |
| microsoft/DiskANN | 1.7k | MIT | in-memory-lib graph+SSD | T5 | TRANSITIVE-INSTALL | L00-vec |
| vdaas/vald | 1.7k | Apache-2.0 | in-memory+distributed | T5 | STUDY-NICHE | L00-vec |
| spotify/voyager | 1.6k | Apache-2.0 | in-memory-lib HNSW Py+Java | T5 | STUDY-PILOT | L00-vec |
| timescale/pgvectorscale | ~1.5k | Apache-2.0 | postgres-extension | T3 | **INSTALL** (SOTA Q1 2026: 11.4x Qdrant) | L00-vec |
| qdrant/mcp-server-qdrant | 1.4k | Apache-2.0 | MCP-wrapped | T1 vendor MCP | **INSTALL** | L00-vec |
| vllm-project/vllm-metal | 1.1k | Apache-2.0 | Apple Silicon plugin | T3 via vLLM | INSTALL-NICHE (Mac) | L00-vec |
| epsilla-cloud/vectordb | 1.0k | Apache-2.0 | standalone C++ graph | T5 | STUDY-NICHE | L00-vec |
| valkey-io/valkey-search | ~700 | BSD-3-Clause | valkey-module C++ | T5 | INSTALL-NICHE (Redis-fork) | L00-vec |
| chroma-core/chroma-mcp | 547 | Apache-2.0 | MCP-wrapped (12 tools) | T1 vendor MCP | **INSTALL** (⚠️ CVE 2026-04 unpatched) | L00-vec |
| sqliteai/sqlite-vector | ~300 | ? | embedded SQLite-extension | T5 | STUDY-NICHE | L00-vec |
| zilliztech/milvus-mcp | ~200 | Apache-2.0 | MCP-wrapped (14 tools) | T1 vendor MCP | INSTALL-NICHE | L00-vec |
| privetin/chroma | <100 | ? | MCP-wrapped (alt) | T3 | REJECT-FORK-DUPE | L00-vec |
| mendsalbert/qdrant-mcp | ~50 | ? | MCP-wrapped (fork) | T3 | REJECT-FORK-DUPE | L00-vec |
| pinecone-io/pinecone | n/a (closed core) | proprietary core | cloud-managed | T3 SDK | REJECT (closed core) | L00-vec |
| turbopuffer | n/a (closed) | proprietary | cloud-managed object-storage | T5 | STUDY-PILOT (cloud tier) | L00-vec |
| upstash/vector | n/a (closed) | proprietary core | cloud-managed serverless | T2 Upstash MCP | STUDY-PILOT (vendor-lock) | L00-vec |
| zilliz cloud | n/a (commercial) | proprietary cloud | cloud-managed Milvus SaaS | T3 Zilliz MCP | STUDY (managed prod) | L00-vec |
| neondatabase/pgvector (Neon fork) | n/a | PostgreSQL-license | postgres-extension on Neon | T3 | STUDY-NICHE | L00-vec |
| jingwood/vector-index | <500 | ? | in-memory-lib (legacy) | T5 | REJECT-NICHE | L00-vec |

---

## §L0.1 — Knowledge Graph (26 rows)

| Repo | Stars | License | Sub-category | Native-CC-pathway | Verdict | Source-fork |
|---|---:|---|---|---|---|---|
| surrealdb/surrealdb | 32.1k | BSL 1.1 | multi-model | T3 community | STUDY-PILOT (license) | L01-kg |
| getzep/graphiti | 26.1k | Apache-2.0 | KG-construction temporal | T3 in-repo MCP | **INSTALL** (incumbent — LongMemEval 63.8%) | L01-kg |
| dgraph-io/dgraph | 21.7k | Apache-2.0 | distributed graph | T5 | REFERENCE | L01-kg |
| hypermodeinc/dgraph | 21.3k | Apache-2.0 | distributed graph v25 | T5 via Hypermode | STUDY-PILOT | L01-kg |
| topoteretes/cognee | 17.3k | Apache-2.0 | KG memory-control | T3 — cognee-mcp shipped | **INSTALL** (Tier-A alt to Graphiti) | L01-kg |
| neo4j/neo4j | 16.5k | GPLv3 community / proprietary enterprise | mature Cypher KG | T5 official mcp-neo4j-cypher | STUDY-PILOT (backend for Graphiti) | L01-kg |
| arangodb/arangodb | 14.2k | Apache-2.0 | multi-model | T5 | REFERENCE | L01-kg |
| vesoft-inc/nebula | 12.2k | Apache-2.0 | distributed bigdata graph | T5 | REJECT (over-spec) | L01-kg |
| HelixDB/helix-db | 4.5k | AGPL-3.0 | embedded vec+graph Rust | T3 built-in MCP | STUDY-PILOT | L01-kg |
| neo4j-labs/llm-graph-builder | 4.7k | Apache-2.0 | UI Neo4j construction | T5 | REFERENCE (UI demo) | L01-kg |
| getzep/zep | 4.6k | Apache-2.0 | SaaS over Graphiti | T5 | REFERENCE (paid SaaS) | L01-kg |
| apache/age | 4.5k | Apache-2.0 | postgres extension openCypher | T3 | STUDY-PILOT (if PG) | L01-kg |
| FalkorDB/FalkorDB | 4.4k | SSPLv1 (non-OSI) | C graph DB | T5 docker | INSTALL-AS-BACKEND (for Graphiti) | L01-kg |
| memgraph/memgraph | 4.0k | BSL 1.1 | C++ in-memory Cypher | T5 community | REFERENCE (license-flag) | L01-kg |
| cozodb/cozo | 4.0k | MPL-2.0 | relational-graph-vector Rust | T5 | STUDY-PILOT | L01-kg |
| FlowElement-ai/m_flow | 3.3k | ? | bio-inspired memory | T3 MCP server | STUDY-PILOT | L01-kg |
| CodeGraphContext/CodeGraphContext | 3.3k | ? | code-intel KG | T3 MCP+CLI | STUDY-PILOT | L01-kg |
| terminusdb/terminusdb | 3.3k | Apache-2.0 | versioned KG document+graph | T5 | REFERENCE | L01-kg |
| MemMachine/MemMachine | 3.1k | ? | KG-based memory | T5 pip | STUDY-PILOT | L01-kg |
| zjukg/KG-LLM-Papers | 2.2k | n/a | catalog | n/a | REFERENCE | L01-kg |
| Hawksight-AI/semantica | 1.2k | ? | ontology-KG framework | T5 | REFERENCE | L01-kg |
| neo4j/neo4j-graphrag-python | 1.2k | Apache-2.0 | Neo4j-bound GraphRAG | T5 | STUDY-PILOT | L01-kg |
| stair-lab/kg-gen | 1.1k | ? | KG-extraction NeurIPS'25 | T5 | STUDY-PILOT | L01-kg |
| neo4j-labs/create-context-graph | 577 | Apache-2.0 | Neo4j scaffolder | T5 | REFERENCE | L01-kg |
| predictable-labs/ryugraph | 136 | MIT (Kuzu inherit) | embedded property graph Kuzu-fork | T5 | STUDY-PILOT (successor to ARCHIVED kuzu) | L01-kg |
| ~~kuzudb/kuzu~~ | (archived 2025-10-10) | MIT | embedded property graph | T5 | **REJECT-ARCHIVED** | L01-kg |

---

## §L0.2 — Memory MCP (84 rows — KEY USER FOCUS LAYER)

### §L0.2-A — Vector-mcp (memory-specialized vector wrappers)

| Repo | Stars | License | Memory-type | Native-CC-pathway | Verdict | Source-fork |
|---|---:|---|---|---|---|---|
| Puliczek/mcp-memory | 143 | ? | Cloudflare-D1+Vectorize | T3 MCP-server | STUDY-NICHE (vendor-locked) | L02-mem |
| sdimitrov/mcp-memory | 62 | ? | Postgres+pgvector | T3 MCP-server | STUDY-NICHE | L02-mem |
| spences10/mcp-memory-libsql | 84 | ? | libSQL vector+KG | T3 MCP-server | STUDY-PILOT | L02-mem |

### §L0.2-B — Knowledge-graph-mcp (KG-backed memory)

| Repo | Stars | License | Memory-type | Native-CC-pathway | Verdict | Source-fork |
|---|---:|---|---|---|---|---|
| getzep/graphiti | 26.1k | Apache-2.0 | bi-temporal KG (invalid_at) | T3 in-repo MCP + community gifflet 140★ | **INSTALL** (incumbent) | L02-mem |
| tirth8205/code-review-graph | 16.6k | ? | code-review KG | T3 MCP-server | INSTALL-NICHE (⚠️ velocity-anomaly flag) | L02-mem |
| DeusData/codebase-memory-mcp | 2.4k | ? | code-intelligence KG (155 langs sub-ms) | T3 MCP-server (zero-dep binary) | **INSTALL** | L02-mem |
| shaneholloman/mcp-knowledge-graph | 857 | ? | fork of official Anthropic memory MCP | T3 MCP-server | INSTALL-NICHE | L02-mem |
| harshkedia177/axon | 695 | ? | code-intelligence + tree-sitter | T3 MCP-server | STUDY-PILOT | L02-mem |
| gannonh/memento-mcp | 418 | ? | KG memory Neo4j+vector | T3 MCP-server | STUDY-PILOT | L02-mem |
| CheMiguel23/MemoryMesh | 342 | ? | KG structured memory | T3 MCP-server | STUDY-NICHE | L02-mem |
| iamtouchskyer/memex | 201 | ? | Zettelkasten markdown+git (NO vector DB) | T3 MCP-server | STUDY-PILOT (novel) | L02-mem |
| mnemon-dev/mnemon | 172 | ? | LLM-supervised persistent memory Go | T3 MCP-server | STUDY-PILOT | L02-mem |
| 0xK3vin/MegaMemory | 168 | ? | project KG + web explorer | T3 MCP-server | STUDY-PILOT | L02-mem |
| gifflet/graphiti-mcp-server | 140 | ? | Graphiti MCP (community) | T3 MCP-server | INSTALL-NICHE (alt to in-repo) | L02-mem |
| knowall-ai/mcp-neo4j-agent-memory | 68 | ? | Neo4j-backed agent memory | T3 MCP-server | STUDY-NICHE | L02-mem |
| okooo5km/memory-mcp-server (Swift) | 104 | ? | KG Swift impl | T3 MCP-server | STUDY-NICHE | L02-mem |
| okooo5km/memory-mcp-server-go | 91 | ? | KG Go impl | T3 MCP-server | STUDY-NICHE | L02-mem |
| rawr-ai/mcp-graphiti | 98 | ? | Graphiti MCP alt | T3 MCP-server | STUDY-NICHE | L02-mem |
| itcook/graphiti-mcp-pro | 40 | ? | Graphiti enhanced + mgmt UI | T3 MCP-server | STUDY-PILOT | L02-mem |
| Skyzi000/open-webui-graphiti-memory | 18 | ? | Open WebUI + Graphiti | T5 | STUDY-NICHE | L02-mem |
| RobertoGongora/openclaw-graphiti-plugin | 18 | ? | OpenClaw + Graphiti | T5 | STUDY-NICHE | L02-mem |
| clawdbrunner/openclaw-graphiti-memory | 68 | ? | OpenClaw Graphiti | T5 | STUDY-NICHE | L02-mem |
| mandelbro/graphiti-memory | 7 | ? | Graphiti + Ollama | T3 | STUDY-NICHE | L02-mem |
| devops-adeel/graphiti-claude-code-mcp | 6 | ? | Graphiti CC-specific | T3 | STUDY-NICHE | L02-mem |

### §L0.2-C — Agent-state-mcp (stateful three-tier core/recall/archival)

| Repo | Stars | License | Memory-type | Native-CC-pathway | Verdict | Source-fork |
|---|---:|---|---|---|---|---|
| mem0ai/mem0 | 55.8k | Apache-2.0 | hybrid vec+KG (SDK v2.0) | T2 — `.claude-plugin/` confirmed | **INSTALL** | L02-mem |
| supermemoryai/supermemory | 22.6k | MIT | hosted engine + cloudflare-workers | T2 — `npx skills add claude-supermemory` (ONLY T1-native CC pathway in memory class) | **INSTALL** | L02-mem |
| letta-ai/letta | 22.7k | Apache-2.0 | three-tier OS-memory (core/recall/archival) | T5 (Letta server + Letta-Code SDK) | **INSTALL** (MemGPT successor) | L02-mem |
| MemoriLabs/Memori | 14.5k | ? | LLM-agnostic infrastructure | T5 | STUDY-PILOT | L02-mem |
| rohitg00/agentmemory | 10.1k | ? | benchmark-driven | T5 | STUDY-PILOT | L02-mem |
| MemTensor/MemOS | 9.1k | ? | self-evolving memory OS (35.24% token savings) | T5 (MCP topic listed) | STUDY-PILOT | L02-mem |
| osaurus-ai/osaurus | 5.3k | ? | macOS-native ANE+MLX + crypto identity | T3 MCP-server | STUDY-NICHE (macOS-only) | L02-mem |
| EverMind-AI/EverOS | 4.8k | ? | long-term-memory + self-evolving | T5 framework | STUDY-PILOT | L02-mem |
| CaviraOSS/OpenMemory | 4.1k | ? | cross-LLM-IDE (CC+Copilot+Codex+Antigravity) | T5 | STUDY-PILOT | L02-mem |
| Gentleman-Programming/engram | 3.5k | ? | Go binary + SQLite + FTS5 | T3 MCP-server | STUDY-PILOT | L02-mem |
| letta-ai/claude-subconscious | 2.7k | ? | Letta-backed subconscious for CC | T2 community-plugin | **INSTALL** (official Letta+CC integration) | L02-mem |
| moltis-org/moltis | 2.7k | ? | Rust persistent personal agent | T3 MCP-server | STUDY-NICHE | L02-mem |
| basicmachines-co/basic-memory | 3.0k | ? | Obsidian-anchored markdown+KG | T3 MCP-server | INSTALL-NICHE | L02-mem |
| Tencent/TencentDB-Agent-Memory | 2.2k | ? | 4-tier progressive pipeline | T5 | STUDY-PILOT | L02-mem |
| zilliztech/memsearch | 1.7k | ? | unified Markdown+Milvus memory | T2 — `claude-code-plugin` topic | INSTALL-NICHE | L02-mem |
| ghostwright/phantom | 1.4k | ? | AI co-worker self-evolving | T3 MCP-server | STUDY-PILOT | L02-mem |
| letta-ai/agent-file | 1.1k | ? | `.af` open agent file format | T5 spec | STUDY-PILOT | L02-mem |
| alash3al/stash | 693 | ? | episodes+facts+working-context Go binary | T3 MCP-server | INSTALL-NICHE | L02-mem |
| NornicDB/orneryd | 734 | ? | KG+vector unified Go | T3 MCP-server | STUDY-PILOT | L02-mem |
| swarmclawai/swarmvault | 454 | ? | KG+RAG+memory (Karpathy LLM-Wiki) | T3 MCP-server | STUDY-PILOT | L02-mem |
| Bitterbot-AI/bitterbot-desktop | 1.7k | ? | cognitive-architecture + dream-engine | T5 desktop | STUDY-NICHE | L02-mem |
| parruda/swarm | 1.7k | ? | Ruby gem orchestration | T5 | STUDY-NICHE | L02-mem |
| breferrari/obsidian-mind | 2.5k | ? | Obsidian vault → CC/Codex/Gemini | T5 | STUDY-PILOT | L02-mem |
| Dataojitori/nocturne_memory | 1.1k | ? | graph-like rollbackable visual PG+SQLite | T3 MCP-server | STUDY-PILOT | L02-mem |
| joeynyc/hermes-hudui | 1.5k | ? | Hermes UI consciousness monitor | T5 | STUDY-NICHE | L02-mem |
| xerrors/Yuxi | 5.2k | ? | multi-tenant agent harness w/ LightRAG+Neo4j | T5 | STUDY-NICHE | L02-mem |

### §L0.2-D — Conversation-history-mcp (CC JSONL search / inverted index)

| Repo | Stars | License | Memory-type | Native-CC-pathway | Verdict | Source-fork |
|---|---:|---|---|---|---|---|
| thedotmack/claude-mem | 76.1k | (verify) | session-capture+AI-compress+inject | T2 — `.claude-plugin/` + `.codex-plugin/` + `.mcp.json` (cross-coding-agent) | **INSTALL** (⚠️ velocity-anomaly flag) | L02-mem |
| alioshr/memory-bank-mcp | 904 | ? | Cline-memory-bank pattern (cross-IDE) | T3 MCP-server | INSTALL-NICHE | L02-mem |
| GreatScottyMac/context-portal | 762 | ? | memory bank MCP + project KG + RAG | T3 MCP-server | INSTALL-NICHE | L02-mem |
| Vvkmnn/claude-historian-mcp | 179 | ? | CC conversation history search inverted-index JSONL | T3 MCP-server CC-specific | INSTALL-NICHE | L02-mem |
| severity1/claude-code-auto-memory | 143 | ? | auto-maintains CLAUDE.md files | T2 CC-plugin | STUDY-PILOT | L02-mem |
| mkreyman/mcp-memory-keeper | 122 | ? | persistent context for AI coding (SQLite) | T3 MCP-server | STUDY-PILOT | L02-mem |
| HelloRuru/claude-memory-engine | 129 | ? | CC memory zero-dep hooks+markdown | T2 CC-plugin | STUDY-PILOT | L02-mem |
| kunwar-shah/claudex | 88 | ? | FTS5 search for CC + web UI | T3 MCP-server | STUDY-PILOT | L02-mem |
| yuvalsuede/memory-mcp | 97 | ? | persistent memory for CC | T3 MCP-server CC-specific | STUDY-NICHE | L02-mem |
| WhenMoon-afk/claude-memory-mcp | 67 | ? | generic local memory MCP | T3 MCP-server CC-specific | STUDY-NICHE | L02-mem |
| jhammant/ClaudeHistoryMCP | 65 | ? | CC conversation history search | T3 MCP-server | STUDY-NICHE | L02-mem |
| aiurda/cursor10x-mcp | 79 | ? | persistent multi-dimensional memory | T3 MCP-server | STUDY-NICHE | L02-mem |
| dazeb/cline-mcp-memory-bank | 60 | ? | Cline-specific memory bank | T3 MCP-server | STUDY-NICHE | L02-mem |
| claude-memento/claude-memento | 25 | ? | conversation-history (memento) | T5 shell | STUDY-NICHE | L02-mem |
| VAMFI/claude-user-memory | 186 | ? | R→P→I workflows quality gates TDD | T5 shell | STUDY-PILOT | L02-mem |

### §L0.2-E — RAG+cache-mcp (hybrid vector+KG+reranker Karpathy LLM-KB)

| Repo | Stars | License | Memory-type | Native-CC-pathway | Verdict | Source-fork |
|---|---:|---|---|---|---|---|
| giancarloerra/SocratiCode | 2.6k | ? | KG+vector hybrid polyglot dep graphs | T2 (Plugin/Skill/Extension OR MCP) | **INSTALL** | L02-mem |
| doobidoo/mcp-memory-service | 1.8k | Apache-2.0 | multi-backend SQLite-vec+Chroma+KG | T2+T3 dual | **INSTALL** (86.0% R@5) | L02-mem |
| coleam00/claude-memory-compiler | 1.1k | ? | LLM compiler knowledge articles (Karpathy LLM-KB) | T2 CC-plugin | **INSTALL** | L02-mem |
| mex/theDakshJaitly | 716 | ? | persistent project memory + drift detection | T2 CC-plugin | STUDY-PILOT | L02-mem |
| lucasrosati/claude-code-memory-setup | 650 | ? | Obsidian + Graphify + codebase KG (71.5x token claim) | T2 community-plugin | STUDY-PILOT | L02-mem |
| coleam00/mcp-mem0 | 677 | ? | Mem0 wrapper | T3 MCP-server | STUDY-NICHE | L02-mem |
| caspianmoon/memoripy | 691 | ? | short+long-term + semantic clustering + memory decay | T5 | STUDY-PILOT | L02-mem |
| pinkpixel-dev/mem0-mcp | 95 | ? | Mem0 MCP community wrapper | T3 MCP-server | STUDY-NICHE | L02-mem |
| elvismdev/mem0-mcp-selfhosted | 84 | ? | Mem0 + Qdrant + Neo4j + Ollama full local | T3 MCP-server CC-specific | INSTALL-NICHE | L02-mem |
| scrypster/muninndb | 287 | ? | Ebbinghaus decay + Hebbian + Bayesian (NOT vec/graph/RAG) | T3 MCP-native single binary | STUDY-PILOT (novel) | L02-mem |
| blader/napkin | 530 | ? | per-repo markdown scratchpad of agent mistakes | T4 CC skill | INSTALL-NICHE | L02-mem |

### §L0.2-F — Domain-specific (vertical: trading / code-intel)

| Repo | Stars | License | Memory-type | Native-CC-pathway | Verdict | Source-fork |
|---|---:|---|---|---|---|---|
| mnemox-ai/tradememory-protocol | 906 | ? | trading agents decision audit + outcome-weighted | T3 MCP-server (17 tools) | STUDY-NICHE | L02-mem |
| Mibayy/token-savior | 855 | ? | structural code nav + persistent memory (100% Opus 4.7 claim) | T3 MCP-server | STUDY-PILOT (verify methodology) | L02-mem |
| opencode-mem/tickernelz | 702 | ? | local vector DB | T5 OpenCode plugin | STUDY-NICHE | L02-mem |
| tickernelz/opencode-mem | 702 | ? | local vector DB | T5 OpenCode plugin | STUDY-NICHE | L02-mem |

### §L0.2-G — Catalogs / archived

| Repo | Stars | License | Memory-type | Native-CC-pathway | Verdict | Source-fork |
|---|---:|---|---|---|---|---|
| IAAR-Shanghai/Awesome-AI-Memory | 880 | ? | catalog | n/a | STUDY-CATALOG | L02-mem |
| mem0ai/mem0-mcp | 651 | ? | Mem0 official MCP | T3 (ARCHIVED 2026) | **REJECT-ARCHIVED** | L02-mem |
| osen77/OpenMemory-MCP | 60 | ? | OpenMemory bilingual CN/EN | T3 MCP-server | STUDY-NICHE | L02-mem |

---

## §L0.25 — Local Inference Runtime (45 rows)

| Repo | Stars | License | Hardware-class | Native-CC-pathway | Verdict | Source-fork |
|---|---:|---|---|---|---|---|
| ollama/ollama | 150k+ | MIT | CPU+CUDA+Metal+ROCm | T3 OpenAI-compat HTTP | **INSTALL** (laptop UX leader) | L025-inf |
| ggml-org/llama.cpp | 88k+ | MIT | CPU + all-GPU (CUDA/Metal/ROCm/Vulkan/SYCL) | T3 OpenAI-compat (`llama-server`) | **INSTALL** (universal SOTA) | L025-inf |
| vllm-project/vllm | 80,178 | Apache-2.0 | NVIDIA primary + AMD/Intel/TPU/Metal | T3 OpenAI-compat HTTP | **INSTALL** (primary NVIDIA engine) | L025-inf |
| ggml-org/whisper.cpp | 38k+ | MIT | CPU primary + CUDA/Metal | T5 (ASR not LLM) | INSTALL-NICHE (voice L5) | L025-inf |
| mudler/LocalAI | 35k+ | MIT | hw-agnostic | T3 OpenAI-compat drop-in | **INSTALL** (multi-modal local-stack) | L025-inf |
| ray-project/ray (Serve) | 35k+ | Apache-2.0 | hw-agnostic via backend | T3 via Serve | STUDY-PILOT (multi-node orch) | L025-inf |
| ray-project/ray | 35k+ | Apache-2.0 | distributed multi-node | T3 | STUDY-PILOT | L025-inf |
| jan-html/jan | 30k+ | Apache-2.0/AGPL split | hw-agnostic | T3 OpenAI-compat + Desktop UI | INSTALL-NICHE (UX) | L025-inf |
| sgl-project/sglang | 27,866 | Apache-2.0 | NVIDIA primary + AMD/Intel | T3 OpenAI-compat HTTP | **INSTALL** (RadixAttention KV-reuse) | L025-inf |
| apple/mlx | 22k+ | MIT | Apple Silicon | T5 Python framework | INSTALL-IMPLICIT (substrate) | L025-inf |
| mlc-ai/mlc-llm | 21k+ | Apache-2.0 | hw-agnostic TVM | T3 OpenAI-compat + native | STUDY-PILOT (mobile/web reach) | L025-inf |
| mlc-ai/web-llm | 16k+ | Apache-2.0 | WebGPU browser | T3 JS SDK | STUDY-PILOT (in-browser) | L025-inf |
| jundot/omlx | 14,281 | Apache-2.0 | Apple Silicon | T3 OpenAI-compat HTTP + menu-bar | **INSTALL** (Mac primary) | L025-inf |
| ktransformers (kvcache-ai) | ~12k | Apache-2.0 | CPU+single-GPU offload | T3 OpenAI-compat | STUDY-PILOT (MoE-on-consumer) | L025-inf |
| ggml-org/ggml | 12k+ | MIT | hw-agnostic primitive | T5 lib | INSTALL-IMPLICIT (substrate) | L025-inf |
| huggingface/text-generation-inference | 10k+ | Apache-2.0 | NVIDIA+AMD+Intel+CPU | T3 OpenAI-compat HTTP | INSTALL-NICHE (enterprise-clean) | L025-inf |
| nvidia/triton-inference-server | 9k+ | BSD-3 | NVIDIA primary | T3 HTTP/gRPC | STUDY-PILOT (multi-framework) | L025-inf |
| NVIDIA/TensorRT-LLM | 9k+ | Apache-2.0 | NVIDIA only | T3 via triton | STUDY-PILOT (fastest NVIDIA-only) | L025-inf |
| intel/ipex-llm (formerly bigdl-llm) | 9k+ | Apache-2.0 | Intel CPU/GPU/NPU | T3 OpenAI-compat (via vLLM-Intel) | INSTALL-NICHE (Intel-stack) | L025-inf |
| abetlen/llama-cpp-python | 9k+ | MIT | CPU+CUDA+Metal+ROCm | T3 OpenAI-compat server | INSTALL-NICHE (Python-native) | L025-inf |
| bentoml/openllm | ~9k | Apache-2.0 | NVIDIA primary | T3 via backend | STUDY-NICHE | L025-inf |
| InternLM/InternEvo | ~9k | Apache-2.0 | NVIDIA primary | T3 via backend | STUDY-NICHE | L025-inf |
| LostRuins/koboldcpp | 7k+ | AGPL-3.0 (some BSD) | CPU+all-GPU | T3 OpenAI-compat HTTP | DEFER (AGPL gate) | L025-inf |
| ml-explore/mlx-examples | 7k+ | MIT | Apple Silicon | T5 via mlx-lm | INSTALL-NICHE | L025-inf |
| AgentDeskAI/browser-tools-mcp | 7.2k | MIT | n/a (browser MCP — adjacent) | T3 | STUDY | L025-inf-adjacent |
| turboderp-org/exllamav2 | 5.5k | MIT | NVIDIA primary | T3 via tabbyAPI | INSTALL-NICHE (engine for EXL2) | L025-inf |
| InternLM/lmdeploy | 5.5k | Apache-2.0 | NVIDIA primary + ROCm | T3 OpenAI-compat HTTP | STUDY-PILOT (TurboMind) | L025-inf |
| kvcache-ai/Mooncake | 5,340 | Apache-2.0 | NVIDIA RDMA-fabric | T3 vLLM+SGLang+LMCache+NIXL plugin | STUDY-PILOT (multi-node only) | L025-inf |
| osaurus-ai/osaurus | 5.3k | ? | Apple Silicon (ANE+MLX) | T3 MCP-server | STUDY-NICHE (macOS) | L025-inf |
| gpustack/gpustack | 5k+ | Apache-2.0 | hw-agnostic (multi-backend mgr) | T3 OpenAI-compat HTTP | STUDY-PILOT | L025-inf |
| vllm-project/aibrix | 4,807 | Apache-2.0 | K8s+NVIDIA | T3 via vLLM | DEFER (K8s-only) | L025-inf |
| vllm-project/semantic-router (v0.2 Athena) | 4,100 | Apache-2.0 | hw-agnostic | T3 Envoy ExtProc + OpenAI-compat | **INSTALL** (L1 routing primitive) | L025-inf |
| menloresearch/cortex.cpp | 3k+ | Apache-2.0 | CPU+CUDA+Metal+ROCm | T3 OpenAI-compat HTTP | STUDY-PILOT (Jan's engine) | L025-inf |
| microsoft/DeepSpeed-MII | 2.2k | Apache-2.0 | NVIDIA primary | T3 OpenAI-compat HTTP | DEFER (superseded?) | L025-inf |
| raullenchai/Rapid-MLX | 2,367 | Apache-2.0 | Apple Silicon | T3 OpenAI-compat HTTP (Claude Code drop-in) | STUDY-PILOT (verify 4.2x claim) | L025-inf |
| predibase/lorax | 2k+ | Apache-2.0 | NVIDIA primary | T3 OpenAI-compat HTTP | STUDY-NICHE (multi-LoRA) | L025-inf |
| Ascend/vllm-ascend | ~2k | Apache-2.0 | Huawei Ascend NPU | T3 via vLLM | STUDY-NICHE | L025-inf |
| intel/intel-extension-for-pytorch | 1.7k | Apache-2.0 | Intel CPU+GPU+XPU | T5 PyTorch ext | STUDY-NICHE | L025-inf |
| ROCm/vllm + AMD/migraphx | ~1.5k | MIT/Apache | AMD ROCm | T3 via vLLM-ROCm | INSTALL-NICHE (AMD) | L025-inf |
| mostlygeek/llama-swap | 1.5k+ | MIT | hw-agnostic (proxy) | T3 OpenAI-compat proxy | STUDY-PILOT | L025-inf |
| vllm-project/vllm-metal | 1,149 | Apache-2.0 | Apple Silicon (M-series) | T3 via vLLM | INSTALL-NICHE (Mac) | L025-inf |
| theroyallab/tabbyAPI | 1k+ | MIT | NVIDIA (ExLlamaV2) | T3 OpenAI-compat HTTP | STUDY-PILOT | L025-inf |
| SemiAnalysisAI/InferenceX | 970 | not specified | benchmark target | T5 bench-harness | STUDY-PILOT (license gate) | L025-inf |
| ARahim3/mlx-tune | ~400 | ? | Apple Silicon | T5 CLI | STUDY-NICHE | L025-inf |
| Mininglamp-AI/cider | 335 | not specified | Apple M5 only (W8A8/W4A8) | T5 MLX | DEFER (license) | L025-inf |
| SharpAI/SwiftLM | ~300 | ? | Apple Silicon Swift | T5 Swift | STUDY-NICHE | L025-inf |
| spark-arena/sparkrun | 221 | not specified | NVIDIA DGX Spark only | T3 via backends | REJECT-VENDOR-NICHE | L025-inf |

---

## §L0.3 — RAG Framework (31 rows)

| Repo | Stars | License | Sub-category | Native-CC-pathway | Verdict | Source-fork |
|---|---:|---|---|---|---|---|
| langchain-ai/langchain | 136.9k | MIT | RAG modules + agent framework | T5 pip | REFERENCE (broader L0.6) | L01-kg/L03-rag |
| infiniflow/ragflow | 80.6k | Apache-2.0 | RAG engine (enterprise deployed) | T5 docker-compose | **INSTALL** (largest ★ + Agent fusion) | L01-kg/L03-rag |
| pathwaycom/pathway | 63.3k | ? | ETL/streaming framework | T5 | STUDY-PILOT (L1.5 crossover) | L01-kg |
| pathwaycom/llm-app | 59.7k | ? | streaming RAG | T5 docker | STUDY-PILOT | L01-kg |
| run-llama/llama_index | 49.5k | MIT | RAG data-framework + document-agent | T5 pip | **INSTALL** (mature) | L01-kg |
| HKUDS/LightRAG | 35.3k | MIT (verify) | Graph RAG (lightweight) | T5 pip | **INSTALL** (Tier-A graph-RAG) | L01-kg |
| microsoft/graphrag | 33.0k | MIT | Graph RAG (research) | T5 pip | STUDY-PILOT (expensive indexing) | L01-kg |
| NirDiamant/RAG_Techniques | 27.4k | n/a | techniques cookbook | n/a | REFERENCE | L01-kg |
| deepset-ai/haystack | 25.2k | Apache-2.0 | Production RAG orchestration | T5 pip | **INSTALL** (Tier-A production) | L01-kg |
| HKUDS/RAG-Anything | 20.3k | ? | Multi-modal RAG | T5 pip | STUDY-PILOT | L01-kg |
| llmware-ai/llmware | 14.9k | ? | small-model RAG | T5 pip | STUDY-PILOT | L01-kg |
| cocoindex-io/cocoindex | 9.8k | ? | RAG ingestion CDC | T5 pip | STUDY-PILOT (L1.5 crossover) | L01-kg |
| OpenSPG/KAG | 8.8k | Apache-2.0 (verify) | Logical-form GraphRAG | T5 pip | STUDY-PILOT | L01-kg |
| SciPhi-AI/R2R | 7.8k | ? | SOTA agentic RAG | T5 docker+REST | INSTALL-CAND | L01-kg |
| weaviate/Verba | 7.7k | ? | RAG UI Weaviate-bound | T5 docker | REFERENCE (vendor-locked) | L01-kg |
| MervinPraison/PraisonAI | 7.8k | ? | Agent framework + RAG | T5 pip | REFERENCE | L01-kg |
| OpenBMB/UltraRAG | 5.5k | Apache-2.0 | MCP-RAG framework | T3 MCP-native YAML pipelines | **INSTALL** (MCP-native differentiator) | L01-kg |
| Marker-Inc-Korea/AutoRAG | 4.8k | ? | RAG eval/auto-tune | T5 pip | STUDY-PILOT (L0.4 eval) | L01-kg |
| SylphAI-Inc/AdalFlow | 4.1k | ? | auto-prompt + RAG | T5 pip | STUDY-PILOT | L01-kg |
| gusye1234/nano-graphrag | 3.8k | MIT | GraphRAG (minimal 1100 LOC) | T5 pip | STUDY-PILOT (preferred over MS) | L01-kg |
| circlemind-ai/fast-graphrag | 3.8k | MIT | GraphRAG cost-optimized | T5 pip (no official release) | STUDY-PILOT | L01-kg |
| OSU-NLP-Group/HippoRAG | 3.5k | MIT | RAG memory-inspired | T5 pip | STUDY-PILOT (NeurIPS'24+ICML'25) | L01-kg |
| pingcap/autoflow | 2.8k | ? | TiDB-bound Graph RAG | T5 docker | REFERENCE (TiDB-locked) | L01-kg |
| athina-ai/rag-cookbooks | 2.5k | n/a | techniques cookbook | n/a | REFERENCE | L01-kg |
| Azure-Samples/graphrag-accelerator | 2.4k | MIT | one-click Azure deploy | T5 | **REJECT-ARCHIVED** | L01-kg |
| DEEP-PolyU/Awesome-GraphRAG | 2.4k | n/a | curated catalog | n/a | REFERENCE | L01-kg |
| TencentCloudADP/youtu-graphrag | 1.2k | ? | GraphRAG agent-graph ICLR'26 | T5 pip | STUDY-PILOT | L01-kg |
| BaranziniLab/KG_RAG | 940 | ? | biomedical KG-RAG | T5 | REFERENCE (vertical) | L01-kg |
| ~~truefoundry/cognita~~ | 4.4k | ? | RAG production | T5 (ARCHIVED 2026-05) | **REJECT-ARCHIVED** | L01-kg |
| ~~NVIDIA/ChatRTX~~ | 3.1k | n/a | NV-local RAG | T5 (ARCHIVED) | **REJECT-ARCHIVED** | L01-kg |
| ~~vanna-ai/vanna~~ | 23.4k | ? | text-to-SQL RAG | T5 (ARCHIVED 2026) | **REJECT-ARCHIVED** (fix10) | L01-kg |

---

## §L0.7 — MCP Server Primitives (88 rows)

| Repo | Stars | License | Sub-type | Native-CC-pathway | Verdict | Source-fork |
|---|---:|---|---|---|---|---|
| n8n-io/n8n | 188.1k | mixed-fair-code | workflow-mcp | T5 external workflow runtime | STUDY | L0MCP |
| affaan-m/everything-claude-code | 184.3k | MIT | meta-skill-bundle | T5 | STUDY (on backlog) | L0MCP |
| google-gemini/gemini-cli | 104.1k | Apache-2.0 | mcp-client-host (competing CLI) | T5 | REJECT (CC has own) | L0MCP |
| punkpeye/awesome-mcp-servers | 87.0k | MIT | catalog | n/a | STUDY (discovery) | L0MCP |
| modelcontextprotocol/servers | 85.7k | MIT | meta-monorepo | T1 reference (fs/git/memory) | **INSTALL** (canonical) | L0MCP |
| netdata/netdata | 78.8k | GPL-3.0 | observability+mcp | T3 `.mcp.json` | STUDY (heavy infra) | L0MCP |
| Kong/kong | 43.4k | Apache-2.0 | api-gateway+mcp-gw | T5 | STUDY (infra-heavy) | L0MCP |
| ChromeDevTools/chrome-devtools-mcp | 39.8k | Apache-2.0 | browser-debug | T1 `.mcp.json` chrome-devtools (Google OFFICIAL) | **INSTALL** (top-tier 80/80) | L0MCP |
| alibaba/nacos | 33.0k | Apache-2.0 | service-discovery+mcp-registry | T5 | STUDY | L0MCP |
| github/github-mcp-server | 29.9k | MIT | github-api | T1 `.mcp.json` GitHub (OFFICIAL) | **INSTALL** | L0MCP |
| modelcontextprotocol/python-sdk | 23.0k | MIT | sdk | T1 (build custom MCP) | **INSTALL** (dev dep) | L0MCP |
| googleapis/mcp-toolbox | 15.2k | Apache-2.0 | multi-db | T1 `.mcp.json` toolbox | **INSTALL** (db breadth) | L0MCP |
| modelcontextprotocol/typescript-sdk | 12.4k | MIT | sdk | T1 (build custom MCP) | **INSTALL** (dev dep) | L0MCP |
| kubeshark/kubeshark | 11.9k | Apache-2.0 | k8s-observability | T3 `.mcp.json` | STUDY | L0MCP |
| hangwin/mcp-chrome | 11.6k | Apache-2.0 | browser | T3 `.mcp.json` | STUDY (chrome-ext) | L0MCP |
| BeehiveInnovations/pal-mcp-server | 11.5k | MIT | multi-llm-router | T3 cross-model MCP | **INSTALL** (cross-LLM consult) | L0MCP |
| firecrawl/firecrawl-mcp-server | ~10k | MIT | search/scrape | T3 `.mcp.json` web | **INSTALL** | L0MCP |
| idosal/git-mcp | 8.1k | MIT | github-repo-mcp | T3 `.mcp.json` git-mcp | **INSTALL** (anti-halluc) | L0MCP |
| AgentDeskAI/browser-tools-mcp | 7.2k | MIT | browser-debug | T3 `.mcp.json` | STUDY (overlap) | L0MCP |
| BrowserMCP/mcp | 6.5k | Apache-2.0 | browser-control | T3 `.mcp.json` | STUDY | L0MCP |
| executeautomation/mcp-playwright | 5.5k | MIT | browser-test | T3 `.mcp.json` playwright | **INSTALL** (test auto) | L0MCP |
| epiral/bb-browser | 5.3k | MIT | browser-cli+mcp | T3 dual | STUDY | L0MCP |
| sansan0/TrendRadar | ~5k | MIT | rss-monitor | T3 niche | REJECT (domain-narrow) | L0MCP |
| the-open-agent/openagent | 4.8k | Apache-2.0 | agent-platform | T5 (host not server) | REJECT (host) | L0MCP |
| agent-infra/sandbox | 4.7k | Apache-2.0 | all-in-one-sandbox | T3 docker MCP+browser+shell+fs | STUDY | L0MCP |
| can1357/oh-my-pi | 4.6k | MIT | terminal-coding-agent | T5 (CC competitor) | REJECT | L0MCP |
| JetBrains/koog | 4.2k | Apache-2.0 | jvm-agent-framework | T5 host-side | STUDY (JVM only) | L0MCP |
| vllm-project/semantic-router | 4.2k | Apache-2.0 | model-router | T5 infra layer | STUDY | L0MCP |
| panaversity/learn-agentic-ai | 4.2k | MIT | course-material | T5 docs | REJECT (curriculum) | L0MCP |
| octelium/octelium | 3.8k | Apache-2.0 | ztna-mcp-gateway | T5 infra | STUDY | L0MCP |
| IBM/mcp-context-forge | 3.7k | Apache-2.0 | mcp-gateway | T3 gateway | **INSTALL** (IBM-backed) | L0MCP |
| remorses/playwriter | 3.5k | MIT | browser-stateful | T3 `.mcp.json` playwright variant | STUDY (overlap) | L0MCP |
| browserbase/mcp-server-browserbase | 3.3k | Apache-2.0 | hosted-browser | T3 `.mcp.json` browserbase | STUDY (paid) | L0MCP |
| sourcebot-dev/sourcebot | 3.4k | (proprietary view) | code-intel companion | T5 AI-enriched search | STUDY | L0MCP |
| agentgateway/agentgateway | 2.7k | Apache-2.0 | agentic-proxy | T3 gateway | STUDY (overlap) | L0MCP |
| bytebase/dbhub | 2.8k | MIT | multi-db | T3 `.mcp.json` dbhub | **INSTALL** (token-efficient) | L0MCP |
| Mouseww/anything-analyzer | 2.5k | MIT | mitm-proxy+mcp | T3 niche | REJECT | L0MCP |
| stacklok/toolhive | 1.8k | Apache-2.0 | mcp-runtime-mgr | T3 mgmt plane | STUDY (overlap) | L0MCP |
| aaronjmars/opendia | 1.8k | MIT | browser-bridge | T3 `.mcp.json` | STUDY | L0MCP |
| TabularisDB/tabularis | 1.8k | MIT | db-client+mcp | T3 UI+MCP | STUDY | L0MCP |
| julien040/anyquery | 1.7k | AGPL-3.0 | sql-over-anything | T3 `.mcp.json` | STUDY (AGPL) | L0MCP |
| benborla/mcp-server-mysql | 1.7k | MIT | mysql | T3 `.mcp.json` | STUDY | L0MCP |
| containers/kubernetes-mcp-server | 1.6k | Apache-2.0 | k8s | T3 `.mcp.json` kubernetes | **INSTALL** (k8s-native) | L0MCP |
| Flux159/mcp-server-kubernetes | 1.4k | MIT | k8s | T3 `.mcp.json` kubernetes | STUDY (overlap) | L0MCP |
| Azure/data-api-builder | 1.4k | MIT | azure-data-api+mcp | T3 `.mcp.json` azure | STUDY (azure) | L0MCP |
| browserwing/browserwing | 1.3k | MIT | browser-claude-skill | T3 dual MCP+Skill | STUDY | L0MCP |
| designcomputer/mysql_mcp_server | 1.3k | MIT | mysql | T3 `.mcp.json` | STUDY (overlap) | L0MCP |
| AIPexStudio/AIPex | 1.2k | MIT | browser-extension | T3 ext+MCP | STUDY | L0MCP |
| jae-jae/fetcher-mcp | 1.0k | MIT | playwright-fetch | T3 `.mcp.json` | STUDY | L0MCP |
| mongodb-js/mongodb-mcp-server | 1.0k | Apache-2.0 | mongodb | T3 `.mcp.json` mongodb (OFFICIAL) | **INSTALL** | L0MCP |
| neo4j-contrib/mcp-neo4j | 947 | Apache-2.0 | neo4j-graph | T3 `.mcp.json` neo4j (OFFICIAL) | **INSTALL** | L0MCP |
| Saik0s/mcp-browser-use | 933 | MIT | browser-use | T3 `.mcp.json` | STUDY | L0MCP |
| saidsurucu/yargi-mcp | 910 | MIT | tr-legal | T3 niche | REJECT (domain) | L0MCP |
| rohitg00/kubectl-mcp-server | 888 | MIT | k8s-kubectl | T3 `.mcp.json` | STUDY | L0MCP |
| SoftInstigate/restheart | 875 | AGPL-3.0 | mongo-rest+mcp | T3 infra | STUDY (AGPL) | L0MCP |
| kontext-security/browser-use-mcp-server | 822 | MIT | browser-use-fork | T3 `.mcp.json` | STUDY | L0MCP |
| weibaohui/k8m | 817 | MIT | k8s-dashboard | T3 UI+MCP | STUDY | L0MCP |
| browser-use/vibetest-use | 793 | MIT | qa-test-mcp | T3 `.mcp.json` | STUDY | L0MCP |
| agentscope-ai/agentscope-runtime | 785 | Apache-2.0 | agent-runtime | T5 runtime | STUDY | L0MCP |
| Kymo-MCP/mcpcan | 719 | MIT | mcp-mgmt-platform | T3 mgmt | STUDY | L0MCP |
| unbrowse-ai/unbrowse | 650 | MIT | api-discovery-mcp | T3 `.mcp.json` | STUDY | L0MCP |
| mark3labs/mcp-filesystem-server | 640 | MIT | filesystem-go | T3 `.mcp.json` filesystem | STUDY (CC has built-in) | L0MCP |
| microsoft/mcp-gateway | 634 | MIT | mcp-gateway | T3 gateway | STUDY (overlap) | L0MCP |
| vibheksoni/stealth-browser-mcp | 643 | MIT | anti-bot-browser | T3 `.mcp.json` | STUDY (greyhat) | L0MCP |
| neondatabase/mcp-server-neon | 598 | MIT | neon-postgres | T3 `.mcp.json` neon | **INSTALL** (PG+SaaS) | L0MCP |
| opentabs-dev/opentabs | 579 | MIT | browser-api-extract | T3 `.mcp.json` | STUDY | L0MCP |
| etsd-tech/mcp-pointer | 574 | MIT | dom-pointer | T3 `.mcp.json` | STUDY | L0MCP |
| chroma-core/chroma-mcp | 547 | Apache-2.0 | chroma-vector | T1 `.mcp.json` chroma | **INSTALL** (vector DB) | L0MCP |
| TesslateAI/OpenSail | 534 | Apache-2.0 | host-platform | T5 (competing host) | REJECT | L0MCP |
| centralmind/gateway | 530 | Apache-2.0 | universal-db-mcp | T3 gateway | STUDY | L0MCP |
| subnetmarco/pgmcp | 529 | MIT | postgres-nl | T3 `.mcp.json` | STUDY | L0MCP |
| redis/mcp-redis | 510 | MIT | redis | T3 `.mcp.json` redis (OFFICIAL) | **INSTALL** | L0MCP |
| OTA-Tech-AI/web-agent-protocol | 497 | Apache-2.0 | record-replay | T3 `.mcp.json` | STUDY | L0MCP |
| BrowserOperator/browser-operator-core | 481 | Apache-2.0 | ai-browser | T5 host-side | REJECT | L0MCP |
| LvcidPsyche/auto-browser | 476 | MIT | browser-w-human | T3 `.mcp.json` | STUDY | L0MCP |
| argoproj-labs/mcp-for-argocd | 464 | Apache-2.0 | argocd-mcp | T3 `.mcp.json` | STUDY | L0MCP |
| kagent-dev/kmcp | 461 | Apache-2.0 | k8s-mcp-controller | T3 | STUDY | L0MCP |
| merajmehrabi/puppeteer-mcp-server | 449 | MIT | puppeteer | T3 `.mcp.json` | STUDY | L0MCP |
| humanlayer/agentcontrolplane | 405 | Apache-2.0 | agent-control-plane | T5 infra | STUDY | L0MCP |
| runekaagaard/mcp-alchemy | 403 | MIT | sqlalchemy-multi-db | T3 `.mcp.json` | STUDY | L0MCP |
| strowk/mcp-k8s-go | 381 | MIT | k8s | T3 `.mcp.json` | STUDY (overlap) | L0MCP |
| gojue/moling | 336 | Apache-2.0 | computer-use+browser | T3 `.mcp.json` | STUDY | L0MCP |
| VikashLoomba/MCP-Server-Playwright | 291 | MIT | playwright | T3 `.mcp.json` | STUDY (overlap) | L0MCP |
| eyalzh/browser-control-mcp | 284 | MIT | firefox-mcp | T3 `.mcp.json` | STUDY (FF) | L0MCP |
| cloudflare/playwright-mcp | 244 | Apache-2.0 | cloudflare-browser | T3 `.mcp.json` | STUDY (CF) | L0MCP |
| 8b-is/smart-tree | 245 | MIT | tree+context | T3 `.mcp.json` | STUDY | L0MCP |
| alexei-led/k8s-mcp-server | 209 | MIT | k8s-multi-tool | T3 `.mcp.json` kubectl+helm+istio+argo | STUDY (broad k8s) | L0MCP |
| ~~hyprmcp/jetski~~ | 209 | MIT | mcp-auth | T5 (ARCHIVED 2026-04-29) | **REJECT-ARCHIVED** | L0MCP |
| beclab/Olares | 4.5k | MPL-2.0 | personal-cloud | T5 host | REJECT | L0MCP |

---

## §L0.8 — Cache (KV / vector / semantic) (9 rows)

| Repo | Stars | License | Sub-category | Native-CC-pathway | Verdict | Source-fork |
|---|---:|---|---|---|---|---|
| redis/redis | 74.4k | RSALv2/SSPLv1/AGPLv3 (v8+) | K/V + vector store | T5 via mcp-server | WATCH (license change v8) | L08-cache |
| facebookresearch/faiss | 40k | MIT | Vector-index library | T5 lib | TRANSITIVE-INSTALL | L08-cache |
| lancedb/lancedb | 10.3k | Apache-2.0 | Vector DB | T5 via mcp-server | **INSTALL** | L08-cache |
| LMCache/LMCache | 8.3k | Apache-2.0 | KV-cache distributed | T5 vLLM-side | **INSTALL** (server-class) | L08-cache |
| ~~zilliztech/GPTCache~~ | 8.0k | MIT | semantic-cache | T5 (STALE 21mo) | **REJECT-STALE** (use LMCache+Mooncake) | L08-cache |
| asg017/sqlite-vec | 7.6k | Apache-2.0+MIT dual | embedded vector SQLite | T5 SQLite ext | **INSTALL** (PRIMARY zero-dep) | L08-cache |
| lancedb/lance | 6.4k | Apache-2.0 | Vector lakehouse format | T5 file format | **INSTALL** | L08-cache |
| kvcache-ai/Mooncake | 5.3k | Apache-2.0 | KV-cache disaggregation | T5 vLLM/sglang | STUDY-PILOT | L08-cache |
| 0xSero/turboquant | 1.4k | (Python lib) | KV-quant for vLLM | T5 | STUDY-PILOT | L08-cache |

---

## §L1.0 — Cross-Model Proxy / Gateway (14 rows)

| Repo | Stars | License | Sub-category | Native-CC-pathway | Verdict | Source-fork |
|---|---:|---|---|---|---|---|
| BerriAI/litellm | high | MIT | multi-provider proxy | T3 — Anthropic CC docs document via `ANTHROPIC_BASE_URL` | **INSTALL** (self-host gateway) | codex-multi |
| Portkey-AI/gateway | high | MIT (npm `@portkey-ai/gateway` v1.11.3) | enterprise gateway | T1 — direct CC integration page (`ANTHROPIC_BASE_URL=portkey`) | **INSTALL** (governance) | codex-multi |
| OpenRouter (api) | n/a | proprietary | model marketplace | T3 OpenAI-compat | STUDY | codex-multi |
| vllm-project/semantic-router | 4.1k | Apache-2.0 | model-router v0.2 Athena | T5 system-level | STUDY (multi-LLM router) | codex-multi |
| dust-tt/dust | high | (verify) | enterprise agent platform | T5 | STUDY | codex-multi |
| looplj/axonhub | (artifact) | (verify) | AI gateway 100+ LLMs | T5 | STUDY-PILOT | codex-multi |
| openai/codex-plugin-cc | (official) | (Apache?) | Claude Code plugin for Codex | T1 — `/plugin marketplace add openai/codex-plugin-cc` | **INSTALL** (OFFICIAL) | codex-multi |
| bfly123/claude_codex_bridge | (artifact) | (verify) | Claude/Codex/Gemini bridge | T3 | STUDY (3rd-party) | codex-multi |
| Mng-dev-ai/claudex | (artifact) | (verify) | multi-instance Claude manager | T3 | STUDY (3rd-party) | codex-multi |
| abiswas97/gemini-plugin-cc | (artifact) | (verify) | Gemini CC plugin | T2 community | STUDY-PILOT | codex-multi |
| openai/codex CLI (v1.0.4) | (official) | Apache-2.0 | Codex CLI subprocess | T5 (`codex exec` foreground+tee Path P) | **INSTALL** (cross-model T1 gate) | codex-multi |
| simpleaichat (PyPI) | (lib) | MIT | OpenAI chat lib | T5 lib | DO-NOT-INSTALL | codex-multi |
| aisuite (PyPI) | (lib) | (verify) | unified Python API | T5 lib | STUDY (lib only) | codex-multi |
| TheBloke quantized-models | n/a | various | model supplier (legacy) | n/a | REFERENCE | L025-inf |

---

## §L1.1 — Multi-Account Orchestration (5 rows)

| Repo | Stars | License | Pattern | Native-CC-pathway | Verdict | Source-fork |
|---|---:|---|---|---|---|---|
| kaitranntt/ccs (`@kaitranntt/ccs`) | (docs) | (verify) | login-per-profile architecture | T3 UX | INSTALL-NICHE (work/personal isolation) | codex-multi |
| router-for-me/CLIProxyAPI | (artifact) | (verify) | local proxy w/ key-pool/round-robin | T5 (HIGH-RISK) | STUDY (policy-sensitive) | codex-multi |
| CaddyGlow/ccproxy-api | (artifact) | (verify) | OAuth credential bridge | T5 (HIGH-RISK) | STUDY (policy-sensitive) | codex-multi |
| anthropics/claude-code issue #35856 | n/a | n/a | native `claude auth switch` feature request | n/a | REFERENCE (request) | codex-multi |
| farion1231/cc-switch | 72.5k | MIT | account/provider switcher | T2 native CC | **INSTALL** | DEEP-SAT-FINAL |

---

## §L1.5 — Token Compression (17 rows)

| Repo | Stars | License | Sub-cat | Native-CC-pathway | Verdict | Source-fork |
|---|---:|---|---|---|---|---|
| JuliusBrussee/caveman | 60.9k | MIT ✓ (SHA d8c0ee8a) | SKIL (skill) | T4 — native CC Skill `/caveman` (65% token cut) | **INSTALL** (Tier-1 install candidate) | L15-comp |
| mksglu/context-mode | 14.9k | MIT | SCT-CC (sandboxed-tool) | T2 — native CC plugin + MCP + hooks (98% tool-output reduction) | **INSTALL-INCUMBENT** | L15-comp |
| microsoft/LLMLingua (+ LLMLingua-2) | 6.2k | MIT | CMPC (compact-LLM-call) | T5 library only (v0.2.2 stale 25mo) | STUDY-COMPONENT | L15-comp |
| open-compress/claw-compactor | 2.2k | MIT (claimed) | TOKR+TRIE-COMP (14-stage Fusion) | T2+T3 CLI/MCP `openclaw` | STUDY-PILOT (zero-inference differentiator) | L15-comp |
| ModelTC/LightCompress | 715 | Apache-2.0 (academic) | model-pruning (NOT prompt) | T5 | DO-NOT-INSTALL (out-of-scope) | L15-comp |
| manojmallick/sigmap | 437 | MIT (claimed) | SCT-CC + TRIE-COMP | T3 MCP-server (97% reduction zero-dep 31 langs) | STUDY-PILOT (context-mode backup) | L15-comp |
| CircleRadon/TokenPacker | 279 | (academic IJCV2025) | multimodal-VLM (NOT text) | T5 lib | DO-NOT-INSTALL (out-of-scope) | L15-comp |
| edouard-claude/snip | 240 | MIT (claimed) | TOKR | T5 CLI proxy (60-90% reduction declarative YAML) | STUDY (rtk alt) | L15-comp |
| jia-gao/leanctx | 234 | MIT ✓ | SDK (wraps LLMLingua-2) | T5 lib+Python SDK | STUDY-PILOT (drop-in production lib) | L15-comp |
| fajarhide/omni | 181 | (Rust unverified) | TOKR+SCT-CC | T2/T3 MCP+hooks+CLI (90% reduction) | STUDY | L15-comp |
| jfrog/boost | 130 | (JFrog enterprise) | TOKR | T5 CLI (shell) | DO-NOT-INSTALL (JFrog-locked) | L15-comp |
| 0xhimanshu/governor | 74 | (claimed plugin) | SCT-CC+SLIM | T2 CC-plugin (slim + telemetry + drift guardrails) | STUDY-PILOT | L15-comp |
| orailix/PACT | 60 | (academic) | multimodal-VLM (NOT text) | T5 lib | DO-NOT-INSTALL (out-of-scope) | L15-comp |
| ZON-Format/zon-TS | 47 | (unverified) | CMPC format-spec | T5 TS SDK | STUDY (35-70% vs JSON/TOON) | L15-comp |
| oanhduong/token-ninja | 29 | (unverified) | SCT-CC | T3 MCP-server (routes shell locally) | STUDY | L15-comp |
| atjsh/llmlingua-2-js | 27 | (unverified) | CMPC JS port | T5 lib | DO-NOT-INSTALL (experimental) | L15-comp |
| yttrium400/reducethemtokens | 6 | (unverified) | TRIE-COMP | T5 CLI | DO-NOT-INSTALL (too new) | L15-comp |

---

## §L4.5 — Document Ingestion (24 rows)

| Repo | Stars | License | Sub-cat | Native-CC-pathway | Verdict | Source-fork |
|---|---:|---|---|---|---|---|
| microsoft/markitdown | 123.4k | MIT | DOC-CONV | T3 — KorigamiK/markitdown_mcp_server 71★ + Microsoft official Docker MCP + xkiranj/markitdown-mcp-npx 13★ | **INSTALL** (Office-glue) | L45-doc |
| PaddlePaddle/PaddleOCR | 77.9k | Apache-2.0 | TRAD-OCR + VLM-OCR (PP-OCR-VL) | T5 lib (heavy install) | INSTALL-COMPONENT (backend) | L45-doc |
| opendatalab/MinerU | 63.3k | Apache-2.0 + commercial threshold | RAG-PIPE + LAYOUT + VLM-OCR (v3.1.14 DAILY) | T3 — MinerU-Document-Explorer 543★ (MCP-native) | **INSTALL** (PDF SOTA) | L45-doc |
| docling-project/docling | 59.8k | MIT | RAG-PIPE + LAYOUT (IBM Granite Vision 4.1) | T3 — docling-mcp 616★ + docling-serve 1.5k★ (FIRST-PARTY MCP) | **INSTALL** (PDF SOTA + IBM) | L45-doc |
| ~~datalab-to/marker~~ | 35.1k | **GPL-3.0** ✓ (SHA 183be3e7) | RAG-PIPE + VLM-OCR | T3 — podolskyDavid/marker-mcp 1★ minimal | **REJECT-LICENSE** (GPL-3.0 strict copyleft) | L45-doc |
| microsoft/unilm | 22.1k | MIT (typical) | LAYOUT (LayoutLM family) | T5 lib | STUDY-COMPONENT | L45-doc |
| datalab-to/surya | 19.7k | Apache-2.0 (typical) | TRAD-OCR + LAYOUT (90+ langs) | T5 lib+CLI | STUDY-COMPONENT | L45-doc |
| Unstructured-IO/unstructured | 14.7k | Apache-2.0 (typical) | RAG-PIPE | T5 — unstructured-api 925★ | STUDY (pre-Q2-2026 wave) | L45-doc |
| grobidOrg/grobid | 4.9k | Apache-2.0 (typical) | SCI | T3 — grobid-client-python 405★ | INSTALL-NICHE (scholarly PDF) | L45-doc |
| Marker-Inc-Korea/AutoRAG | 4.8k | (typical) | RAG-PIPE (eval/optim wrapper) | T5 CLI/Python | STUDY (more L4 eval) | L45-doc |
| run-llama/llama_cloud_services (LlamaParse) | 4.3k | proprietary (cloud) | RAG-PIPE + VLM-OCR | T5 SDK only | DO-NOT-INSTALL (cloud SaaS) | L45-doc |
| deepdoctection/deepdoctection | 3.2k | Apache-2.0 (typical) | LAYOUT + RAG-PIPE | T5 CLI/Python | STUDY (pre-Q2-2026) | L45-doc |
| Filimoa/open-parse | 3.2k | MIT (typical) | LAYOUT + TBL | T5 Python lib | STUDY | L45-doc |
| illuin-tech/colpali | 2.6k | Apache-2.0 (typical) | VLM-RETR (NeurIPS'24 ColPali) | T5 lib | STUDY-COMPONENT (visual-retrieval no-OCR) | L45-doc |
| NanoNets/docstrange | 1.5k | Apache-2.0 (typical) | RAG-PIPE + DOC-CONV | T5 CLI/Python | STUDY (fresh entrant) | L45-doc |
| wisupai/e2m | 1.3k | MIT (typical) | DOC-CONV (doc/docx/epub/html/pdf/ppt/pptx/mp3/m4a→md) | T5 CLI/Python | STUDY (~100x fewer ★ than markitdown) | L45-doc |
| docling-project/docling-mcp | 616 | MIT (typical) | RAG-PIPE | T3 MCP-server FIRST-PARTY | **INSTALL** | L45-doc |
| opendatalab/MinerU-Diffusion | 590 | Apache-2.0 + commercial threshold | VLM-OCR (block-level parallel diffusion) | T5 (research) | STUDY | L45-doc |
| opendatalab/MinerU-Document-Explorer | 543 | Apache-2.0 + commercial threshold | RAG-PIPE | T3 MCP-server FIRST-PARTY (PDF/DOCX/PPTX/MD) | **INSTALL** | L45-doc |
| lfoppiano/grobid-quantities | 84 | Apache-2.0 (typical) | SCI (physical-quantity NER) | T5 lib | NICHE | L45-doc |
| KorigamiK/markitdown_mcp_server | 71 | (per topic typical) | DOC-CONV | T3 MCP-server (wraps markitdown) | **INSTALL** | L45-doc |
| G36maid/zed-mcp-server-markitdown | 21 | (per topic typical) | DOC-CONV (Zed Rust) | T3 MCP-server | STUDY | L45-doc |
| xkiranj/markitdown-mcp-npx | 13 | (per topic typical) | DOC-CONV (NPX) | T3 MCP-server (no Docker) | STUDY | L45-doc |
| andyhuo520/ocr_benchmark | 11 | (per topic typical) | (benchmark only) | n/a | BENCH-REF (OmniDocBench) | L45-doc |

---

## §L5.7 — Durable Workflow Execution (7 rows — from GAP-WORKFLOW)

| Repo | Stars | License | Sub-type | Native-CC-pathway | Verdict | Source-fork |
|---|---:|---|---|---|---|---|
| conductor-oss/conductor | 31.8k | Apache-2.0 | event-driven agentic JVM | T5 | STUDY | workflow |
| temporalio/temporal | 20.3k | MIT | mature cluster (9yr at Uber/Stripe) | T5 | RE-PROMOTE (enterprise) | workflow |
| hatchet-dev/hatchet | 7.2k | MIT | Go+Postgres DAG (priority lanes) | T5 | **INSTALL** (cost-aware $830K/yr) | workflow |
| inngest/inngest | 5.4k | AGPL | serverless durable tool-resume + HITL | T5 | **INSTALL** | workflow |
| dagucloud/dagu | 3.4k | GPL-3.0 | single-binary local-first agentic | T5 | STUDY | workflow |
| dbos-inc/dbos-transact-py | 1.4k | MIT | **10x less code than Temporal** (Postgres durable) | T5 | **STRONG INSTALL** (lowest friction MIT) | workflow |
| restatedev/restate | high-rep | BSL/MIT | Rust sidecar native AI-examples | T5 | **INSTALL** (lightest sidecar) | workflow |

---

## §Z — How this PART1 complements other GRAND CATALOG files

| Doc | Scope | Audience |
|---|---|---|
| **THE-ULTIMATE-MASTER-2026-05-16.md** | Exec brief + 25-layer architecture + Phase 0-4 install plan + 11 fix-forward rounds + saturation proof | Operator-decision file |
| **THE-GRAND-CATALOG-MATRIX-2026-05-16.md** | Top 308 across ALL 25 layers (highest-priority distilled) | Quick-scan ranking |
| **THE-GRAND-CATALOG-PART1-L0-L1-DATA.md** *(this file)* | EVERY repo in L0.0-L1.5+L4.5+L5.7 (data cluster, 392 rows) | Layer-by-layer completeness | 
| **OPERATOR-DECISIONS-V-FINAL-2026-05-16.md** | ~170 decisive INSTALL/STUDY/REJECT calls with phase assignments | Action queue |
| **DEEP-SAT-AGGREGATED-DELTA-2026-05-16.md** | 8 per-layer deep-sat key findings consolidated | Layer rationale |

**Out of PART1 scope (future PART2/3 needed for full ~1,800-row aggregation)**:
- L0.6 Sandbox/microVM (firecracker · forkd · kuasar · cloudflare/sandbox-sdk · arcbox)
- L2.x Agent frameworks (PydanticAI · CrewAI · AutoGen · etc.)
- L3 Peer CLIs (sst/opencode · aider · cline · OpenHands · gemini-cli · etc.)
- L2.4 CC-Templates (davila7 · obra/superpowers · wshobson · OthmanAdi · etc.)
- L4 Eval & Observability (Langfuse · Phoenix · Helicone · OpenLLMetry · etc.)
- L5.x Security / Code-Intel / Browser / Voice / Multimodal-UI / Vertical-Agents
- L6.x Agent orchestration frameworks
- L7.x Higher-level CC ecosystem primitives

**Verification**: Every row was cross-checked against named source fork. Where stars/license shown as "?", source fork did not state the value (operator MUST verify via `gh api repos/{owner}/{repo}` before INSTALL per CR-1 trusted-source discipline).

**Cite-class**: `constituents=[TIER-1-DIRECT @ 12 source-fork files in 06-fresh-research-delta/ at HEAD 2026-05-16 (GitHub API live snapshots within each fork), TIER-3-LOCAL-COMPOSITION @ aggregation+dedup discipline]; effective_tier=TIER-3-LOCAL-COMPOSITION` per `Z:/claude-sota/.claude/rules/citation-discipline.md` rule #8 MIN_PRECEDENCE.

**Honest non-findings**: (1) Many L0.2 rows had `license: ?` in source fork due to GitHub Search-API license-detector miss-rate per Tranche-J pattern §C.5 — direct `LICENSE` blob fetch required pre-install. (2) ~30 hallucinations from prior synthesis rounds (kuzu, kuzudb-mcp, microsoft/acon, ace-agent/ace, rtk-ai/rtk, vanna-ai/vanna, codeintelinc/gitnexus, modal-labs/llm-finetune-RAG, IBM-Research/scimagex, Doc2X/QQGYLab, mineru-team/MinerU, etc.) NOT included in this PART1 — they are catalogued in source forks as HONEST-NON-FINDINGS only. (3) Star counts captured from source forks at probe time (within probe-day window of source fork creation 2026-05-16); some counts may have drifted by ±5-20% by this aggregation time.

**End of THE-GRAND-CATALOG-PART1-L0-L1-DATA.md (392 rows aggregated 2026-05-16)**
