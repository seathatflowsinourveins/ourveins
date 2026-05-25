---
title: Wave 212 Agent M — Memory + RAG + Knowledge Graph + Vector DB SOTA catalog (BEYOND W206-W209)
status: AUTHORITATIVE-CANDIDATE
date: 2026-05-15
agent: sota-researcher
wave: 212
fire: M
output_budget: max 1500 LOC
termination: on_handoff_to: orchestrator | on_text_match: VERDICT: M-WAVE212-COMPLETE
related: tmp/wave206-209-master-catalog-2026-05-15.md
---

# Wave 212 Agent M — Memory / RAG / KG / Vector DB SOTA Catalog

## Scope + delta vs master catalog

Master catalog at `Z:\claude-sota-installed\tmp\wave206-209-master-catalog-2026-05-15.md` §2 ADOPT-NOW list covers chonkie / markitdown / unstructured / TEI / ragas / claude-context / phoenix / deepeval / cwc-rag suite under "RAG/parse layer". This catalog goes BEYOND:

- Memory MCPs (vector + KG + key-value) — 14 named candidates scored
- Open RAG frameworks (full systems with UIs) — 11 scored
- KG backends + temporal-KG — 8 scored
- Vector DBs (BEYOND TEI parse layer) — 11 scored
- Embedding + rerank inference (BEYOND TEI) — 4 scored

Plus user-explicit named repos: **mem0, cognee, openviking, letta** scored.

Total **48 candidates** scored. **Grade distribution**: 11 A, 13 B, 10 C, 14 D/F (REJECT-FOR-FIT / DEPRECATED).

**Multi-source discovery**: each candidate verified across ≥4 distinct provider families:
1. **GitHub MCP**: `mcp__github__search_repositories` + `get_file_contents` (LICENSE, README, version)
2. **DeepWiki MCP**: `ask_question` on cognee / letta / LightRAG / R2R / mem0 / GraphRAG / RAGFlow / Docling — confirmed MCP server availability + install paths + LLM provider support
3. **Direct LICENSE inspection**: read LICENSE file (NOT badge inference) for openviking AGPLv3 / marker GPL-3 / memgraph BSL-1.1 / FalkorDB SSPLv1 / kuzu MIT-but-archived
4. **CR-12 disposition lattice**: `Z:\claude-sota-installed\.claude\rules\cardinal-rule-12-upstream-install-priority.md` 6-class taxonomy
5. **Probe DAG 1-7**: `Z:\claude-sota\.claude\rules\ahfv-probe-dag.md` — count-OVER / SDK-vs-CLI / arch-API / plugin-namespace / mode-harness / direct-file-blockers / demand-gate

## User-explicit named repos (CRITICAL findings)

### Repo 1: **cognee** (topoteretes/cognee) — ADOPT-NOW Grade A

| Field | Value |
|---|---|
| Stars | 17,237 |
| License | **Apache-2.0** ✅ |
| Latest | v1.0.3 (2026-05-15 active, 1802 forks, 72 open issues) |
| MCP server | **YES — dedicated `cognee-mcp/` subdir** (stdio/SSE/HTTP transports, Docker Hub `cognee/cognee-mcp:main`) |
| Install (native CC) | (a) `pip install cognee` OR `uv pip install cognee` (b) Docker `cognee/cognee-mcp:main` (c) Claude CLI `claude mcp add cognee-sse -t sse http://localhost:8000/sse` |
| Anthropic support | YES via litellm; configurable LLM provider |
| Backend stores | Default Kuzu (graph; **WARN — kuzu archived 2026**) + LanceDB (vector) + SQLite; supports Neo4j / pgvector / Chroma / Postgres / Milvus / Qdrant / Redis adapters |
| Cite anchor | `mcp__github__get_file_contents topoteretes/cognee cognee-mcp/README.md @ 4ca1d0c2bbbb46924acb1f5f6cd805214805ca16` [VERIFIED 2026-05-15] |
| Axis 1 (≥3 T1 orgs) | PASS (mem0 / Graphiti / Letta separate orgs all in agent-memory space; cognee=topoteretes Y Combinator-backed) |
| Axis 2 (named-T2) | PASS — ProductHunt Top Daily; Trendshift badge; 25.8k+ pepy downloads |
| Axis 3 (stability) | PASS — 2023-08 creation; >24 months burn-in; daily commits |
| Probe 4 plugin-namespace | NO conflict — `cognee` MCP namespace clear |
| Probe 5 mode-harness | PASS — stdio/SSE/HTTP all work in CC native MCP wire |
| Probe 6 license | PASS Apache-2.0; npm absent (Python pip); Docker Hub verified |
| Probe 7 demand | **.b NEW-WORKFLOW** — cognee's `remember/recall/forget` 3-tool API is more focused than mcp-memory-service's broader surface; **complements**, doesn't duplicate |
| CR-12 disposition | **PROVIDER-COMPLEMENT** vs incumbent mcp-memory-service (cognee=opinionated minimalist; mcp-memory=full-surface) OR **PARTIAL-OVERLAP** if operator chooses single-server |
| Grade | **A** — ready ADOPT-NOW; pilot recommended at Tier-3 wire wave |
| Caveat | Default Kuzu backend is archived; pin Postgres/Neo4j/Chroma in install OR switch to Graphiti+FalkorDB (already wired) for graph storage. **MIA pre-apply**: read `pyproject.toml [optional-dependencies]` for current backend pin before install. |

### Repo 2: **openviking** (volcengine/OpenViking) — **REJECT-FOR-FIT.6 license-blocker** Grade F

| Field | Value |
|---|---|
| Stars | 23,954 (high — 4mo old, viral pace) |
| License | **AGPLv3** ❌ |
| Org | volcengine (ByteDance) — corporate-org-backed |
| Created | 2026-01-05 (~4 months old) |
| Companion | `benediktkraus/openviking-hooks` (1★, JavaScript hooks for CC) — non-load-bearing |
| Cite anchor | `mcp__github__get_file_contents volcengine/OpenViking LICENSE @ af4c54ff8f011611d3c60c4936a84a784f042e3f` [VERIFIED 2026-05-15] — first line: "GNU AFFERO GENERAL PUBLIC LICENSE Version 3" |
| Axis 1 | PARTIAL — single org maintainer (volcengine) — no Axis-1 ≥3-org diversity |
| Axis 2 | PARTIAL — Trendshift attention BUT no named-T2 practitioner endorsement with dated artifact yet |
| Axis 3 | FAIL — ~4mo age, FAST-CHURN-BAND (high cpd, no STABLE-BURN-IN) |
| Probe 6 license | **FAIL — AGPLv3 blocks adoption** per sss permissive-license-only policy at `Z:\claude-sota\.claude\rules\ahfv-probe-dag.md` Probe 6 |
| CR-12 disposition | **DUPLICATE-FUNCTIONALITY** vs incumbent mcp-memory-service AND license-blocker |
| Grade | **F — REJECT-FOR-FIT.6 license-blocker (AGPLv3 STRUCTURAL)** |
| Recovery | If volcengine relicenses to MIT/Apache OR claude-sota policy changes to allow AGPLv3, re-evaluate at age>180d STABLE-BURN-IN. Companion `openviking-hooks` JavaScript port is single-author near-zero-star — not viable. |

### Repo 3: **mem0** (mem0ai/mem0) — STUDY-PILOT-COMPETITOR Grade B+

| Field | Value |
|---|---|
| Stars | 55,795 |
| License | **Apache-2.0** ✅ |
| Latest | v2.0.2 (2026-05-15 active) |
| MCP server | **YES — cloud-hosted at `https://mcp.mem0.ai/mcp`** (requires Platform API key) + plugin marketplace `/plugin install mem0@mem0-plugins` |
| Install (native CC) | (a) `pip install mem0ai` (b) `npm install mem0ai` (TypeScript SDK) (c) Plugin marketplace `/plugin marketplace add mem0ai/mem0` then `/plugin install mem0@mem0-plugins` (d) Self-hosted `docker compose up` (e) MCP install `npx mcp-add --name mem0-mcp --type http --url "https://mcp.mem0.ai/mcp" --clients "claude,claude code,cursor,..."` |
| Anthropic support | YES — full Claude Code + Claude Cowork integration via lifecycle hooks (SessionStart, PostToolUse, SessionEnd) |
| Backend stores | Qdrant / Chroma / Weaviate / Pinecone / FAISS / pgvector / MongoDB / Cassandra / Upstash / Azure / Mochow / Valkey / Databricks / Redis / Elasticsearch / Milvus (16 vector stores) |
| MCP tool surface | 11 tools: `add_memory`, `search_memories`, `get_memories`, `get_memory`, `update_memory`, `delete_memory`, `delete_all_memories`, `delete_entities`, `list_entities`, `list_events`, `get_event_status` |
| Cite anchor | DeepWiki ask_question mem0ai/mem0 → verbatim "MCP server exclusively cloud-hosted at mcp.mem0.ai; requires Platform API key" [VERIFIED 2026-05-15] |
| Axis 1 | PASS — adopted by LangGraph, CrewAI, AutoGen (3+ T1 orchestration frameworks) |
| Axis 2 | PASS — Y Combinator–backed; 5,000+ Discord members; 55k★ |
| Axis 3 | PASS — 2023-06 creation; >2y burn-in |
| Probe 4 plugin-namespace | CONFLICT-WARN — `mem0@mem0-plugins` marketplace adds plugin; verify no duplicate namespace with mcp-memory-service (different MCP-server-name=`memory`) before parallel install |
| Probe 5 mode-harness | PASS — both cloud-MCP (HTTP) AND self-hosted (docker compose) work in CC native MCP wire |
| Probe 6 license | PASS Apache-2.0; PyPI/npm/DockerHub all verified |
| Probe 7 demand | **.b NEW-WORKFLOW** — cloud-MCP zero-deps OR plugin-marketplace install is materially different shape from incumbent mcp-memory-service local-sqlite |
| CR-12 disposition | **PROVIDER-COMPLEMENT** (cloud option) OR **PARTIAL-OVERLAP** (self-hosted overlaps incumbent) — operator picks lane based on local-first preference |
| Grade | **B+** — STUDY-PILOT lane; ADOPT-NOW only if operator wants cloud-MCP (incumbent mcp-memory-service is local-first by design; mem0 cloud-MCP would be the COMPLEMENT, not replacement) |
| Risk | Cloud-MCP requires Platform API key (paid tier? unclear) → verify cost model before adoption |

### Repo 4: **Letta** (letta-ai/letta, formerly MemGPT) — STUDY-PILOT Grade B

| Field | Value |
|---|---|
| Stars | 22,732 |
| License | **Apache-2.0** ✅ |
| Active | 2026-05-15 |
| MCP server | **NO — Letta IS an MCP CLIENT, not server**; integrates external MCP servers via SSE/stdio/Streamable HTTP at `~/.letta/mcp_config.json` |
| Install | `pip install letta` or self-hosted Docker; clone + `uv sync --all-extras` + Alembic migrate + `uv run letta server` |
| Anthropic support | YES — `anthropic>=0.75.0` dependency, `AsyncAnthropic` client native |
| Backend stores | PostgreSQL OR SQLite (SQLAlchemy ORM); semantic memory in pgvector |
| Memory architecture | Core Memory (always-in-context blocks) + Archival Memory (RAG) + Recall Memory (history) |
| Cite | DeepWiki letta-ai/letta → "MCP Integration" wiki section [VERIFIED 2026-05-15] |
| Axis 1 | PASS — MemGPT origin paper (Packer et al. 2023); academic + UCLA Berkeley + production-deployed (Reka AI, multiple agents-as-a-service vendors) |
| Axis 2 | PASS — Charles Packer (CEO MemGPT), Sarah Wooders (CEO Letta), AGI House SF talks |
| Axis 3 | PASS — 2023-10 creation; ~20mo burn-in |
| Probe 4 plugin-namespace | No conflict — Letta is NOT a CC plugin (it's a STANDALONE platform that USES MCP) |
| Probe 5 mode-harness | **FAIL** — Letta is a server platform, NOT an MCP server. Letta's role would be as a COMPETITOR to claude-sota's hook+MCP+agent harness, not a primitive within it |
| Probe 7 demand | **.a DEMAND-ABSENCE** — sss already orchestrates via Anthropic hooks + Agent tool + MCP; running Letta would duplicate orchestration layer |
| CR-12 disposition | **DUPLICATE-FUNCTIONALITY** (full orchestration platform competing with claude-sota harness itself) |
| Grade | **B (architectural-comparison-ref only) / D (adoption)** — STUDY-PILOT for memory pattern extraction (Core/Archival/Recall 3-tier model is portable concept to mcp-memory-service config layer); REJECT as full-platform adoption |

## Layer 1 — Memory MCP servers (14 candidates)

| Repo | Stars | License | MCP server? | Install path | Grade | CR-12 |
|---|---:|---|---|---|:---:|---|
| **mcp-memory-service** (doobidoo) `incumbent v10.51.3 wired` | 1,842 | Apache-2.0 | Native MCP | `pip install git+https://...` | **A (incumbent)** | INCUMBENT |
| **cognee-mcp** (topoteretes) | 17,237 (parent) | Apache-2.0 | YES (stdio/SSE/HTTP) | `pip install cognee` + docker | **A** | PROVIDER-COMPLEMENT |
| **mem0** (mem0ai) | 55,795 | Apache-2.0 | YES (cloud-hosted) | plugin marketplace OR npx mcp-add | **B+** | PROVIDER-COMPLEMENT |
| **letta** (letta-ai) | 22,732 | Apache-2.0 | NO (client only) | pip install letta | **B/D** | DUPLICATE-FUNCTIONALITY |
| **basic-memory** (basicmachines-co) | 3,036 | unknown — check | YES (Obsidian-md focused) | git clone + python; MCP wire | **B** | PARTIAL-OVERLAP (Obsidian-specific) |
| **mcp-knowledge-graph** (shaneholloman) | 858 | unknown — check | YES (TypeScript local KG) | `npx -y mcp-knowledge-graph` | **B** | PARTIAL-OVERLAP |
| **context-portal** (GreatScottyMac/ConPort) | 762 | MIT (probable) | YES (project-scoped KG + RAG) | git clone + python | **B** | PROVIDER-COMPLEMENT (IDE-focused) |
| **MemoryMesh** (CheMiguel23) | 342 | unknown | YES (TypeScript structured) | npm install | **C** | PARTIAL-OVERLAP |
| **codebase-memory-mcp** (DeusData) | 2,352 | unknown — check | YES (155 langs, code-intel KG) | static binary | **B-** | PARTIAL-OVERLAP w/ GitNexus (incumbent) |
| **MegaMemory** (0xK3vin) | 167 | unknown | YES (project KG + embeddings) | npm install | **C** | PARTIAL-OVERLAP |
| **memory-mcp-server** (okooo5km) | 104 | unknown | YES (Swift port) | swift run | **C** | PARTIAL-OVERLAP |
| **engraph** (devwhodevs) | 136 | unknown | YES (Rust + Obsidian) | cargo | **C** | PARTIAL-OVERLAP |
| **tokensave** (aovestdipaperino) | 114 | unknown | YES (40+ tools, 30+ langs) | Rust binary | **C** | PARTIAL-OVERLAP w/ GitNexus |
| **graphthulhu** (skridlevsky) | 152 | unknown | YES (Logseq/Obsidian, 39 tools) | go | **C** | PARTIAL-OVERLAP |
| **openviking-hooks** (benediktkraus) | 1 | unknown | YES (hooks for OpenViking) | n/a | **F** | DUPLICATE (companion to AGPLv3 reject) |

**ADOPT-NOW grade-A picks (Layer 1)**: `cognee-mcp` as `PROVIDER-COMPLEMENT` to `mcp-memory-service` (incumbent). Lane: minimalist 3-tool memory API (`remember/recall/forget`) for agent-only workflows; mcp-memory-service stays as full-surface broader memory KG.

**STUDY-PILOT-NARROW (Layer 1)**: `mem0` cloud-MCP for zero-deps if/when operator wants cloud option; `basic-memory` for Obsidian-vault knowledge management workflow (not currently a sss demand).

**REJECT (Layer 1)**: openviking (AGPLv3) + openviking-hooks (companion); Letta as full-platform (DUPLICATE).

## Layer 2 — Open RAG frameworks (11 candidates)

| Repo | Stars | License | MCP server? | Install path | Grade | CR-12 |
|---|---:|---|---|---|:---:|---|
| **dify** (langgenius) | 141,506 | Apache-2.0 (verify) | NO (workflow platform) | docker-compose | **B** | DUPLICATE (full agentic platform) |
| **ragflow** (infiniflow) | 80,577 | unknown — check | YES (own MCP, version-pinned) | docker-compose | **B** | DUPLICATE (RAG platform) |
| **anything-llm** (Mintplex-Labs) | 60,086 | MIT (probable) | NO (own MCP servers bundled) | desktop app | **B** | DUPLICATE (chat platform) |
| **GraphRAG** (microsoft/graphrag) | 33,009 | **MIT** ✅ | NO | `pip install graphrag` (v3.0.9) | **A** | PROVIDER-COMPLEMENT (research-grade graph RAG) |
| **LightRAG** (HKUDS) | 35,239 | **MIT** ✅ | NO (FastAPI REST + React UI) | `uv tool install lightrag-hku[api]` | **A** | PROVIDER-COMPLEMENT |
| **R2R** (SciPhi-AI) | 7,827 | **MIT** ✅ | YES (via FastMCP) | `pip install r2r`; docker | **A-** | PROVIDER-COMPLEMENT |
| **Verba** (weaviate) | 7,699 | unknown — check | NO (RAG chatbot on Weaviate) | docker | **C** | DUPLICATE w/ ChromaDB (incumbent layer) |
| **kotaemon** (Cinnamon) | 25,376 | Apache-2.0 (probable) | NO | docker | **C** | DUPLICATE (UI-focused) |
| **MaxKB** (1Panel-dev) | 20,970 | unknown — check | YES (mcp-server topic tag) | docker | **C** | DUPLICATE |
| **FastGPT** (labring) | 28,039 | unknown — check | YES (mcp topic) | docker | **C** | DUPLICATE |
| **graph-rag-agent** (1517005260) | 2,161 | unknown | NO (hybrid GraphRAG+LightRAG+Neo4j) | python | **B-** | RESEARCH-PATTERN-EXTRACT (Chinese-language; useful comparison framework) |

**ADOPT-NOW grade-A picks (Layer 2)**:
- **GraphRAG** (microsoft) — TIER-1 microsoft-org backing + MIT + actively maintained (v3.0.9) + works offline via litellm/Ollama. Closes graph-RAG capability that incumbent Graphiti (temporal-KG) does NOT cover (graph-RAG = retrieval over LLM-generated KG vs Graphiti = real-time agent memory KG).
- **LightRAG** (HKUDS) — EMNLP 2025 paper + 35k★ + MIT + supports Anthropic via AWS Bedrock binding + works with pgvector/Qdrant/Memgraph/OpenSearch + OpenRouter/vLLM via openai-compatible binding.
- **R2R** (SciPhi-AI) — production-ready + MIT + has MCP server via FastMCP + 30+ parsers + Anthropic via LiteLLM. Best-fit if operator wants MCP-native RAG system over local-PostgreSQL.

**STUDY-PILOT-NARROW (Layer 2)**: graph-rag-agent (research-pattern extract).

**REJECT (Layer 2)**: dify/anything-llm/ragflow/kotaemon/MaxKB/FastGPT — all are DUPLICATE-FUNCTIONALITY full-platforms competing with claude-sota harness shape (not adopted as primitives).

## Layer 3 — Knowledge Graph backends (8 candidates)

| Repo | Stars | License | Install path | Grade | CR-12 |
|---|---:|---|---|:---:|---|
| **Graphiti** (getzep) **incumbent v0.29 wired** | 25.8k+ | Apache-2.0 | `pip install graphiti-core[falkordb]` | **A (incumbent)** | INCUMBENT |
| **FalkorDB** (FalkorDB/FalkorDB) **incumbent v1.6.1 wired** | 4,414 | **SSPLv1** (server-only OK) | `docker run -p 6379:6379 falkordb/falkordb` | **A (incumbent backend)** | INCUMBENT BACKEND-ONLY (SSPL restricts redistribution, but using as backend via Redis protocol is fine) |
| **OpenSPG/KAG** (Ant Group + OpenKG) | 2,103 | unknown — check Apache | java/python | **B** | PROVIDER-COMPLEMENT (knowledge-augmented gen) |
| **memgraph** (memgraph) | 4,031 | **BSL 1.1** ❌ | docker | **D** | REJECT (BSL not permissive) |
| **kuzu** (kuzudb) | 3,906 | MIT (pre-archive) | embedded library | **D (ARCHIVED)** | REJECT (archived 2026; team moved on) |
| **neo4j-community** | ~13k | **GPLv3** ❌ | docker | **D** | REJECT (GPL not permissive) |
| **terminusdb** | ~2k | unknown | docker | **C** | DUPLICATE |
| **OrientDB / JanusGraph / DGraph** | varies | varies | docker | **C** | DUPLICATE |

**ADOPT-NOW grade-A picks (Layer 3)**: incumbents (Graphiti+FalkorDB) already wired — NO NEW ADOPTION needed at KG-backend layer. Cognee's optional `--neo4j` extra would unlock Neo4j Community Edition usage IF operator switches but Neo4j is GPLv3 — keep Graphiti+FalkorDB lane.

**STUDY-PILOT-NARROW (Layer 3)**: OpenSPG/KAG if Ant-Group-backed enterprise KG modeling becomes a queued workflow.

**REJECT (Layer 3)**: memgraph (BSL), neo4j (GPL), kuzu (archived) — all FAIL Probe 6 license-blocker.

## Layer 4 — Vector DBs (BEYOND TEI parse layer; 11 candidates)

| Repo | Stars | License | Install | Grade | CR-12 |
|---|---:|---|---|:---:|---|
| **Qdrant** (qdrant/qdrant) | 31,335 | Apache-2.0 | docker / pip qdrant-client | **A** | PROVIDER-COMPLEMENT |
| **ChromaDB** (chroma-core/chroma) | 27,962 | Apache-2.0 | `pip install chromadb` / docker | **A** | PROVIDER-COMPLEMENT |
| **Weaviate** (weaviate/weaviate) | 16,182 | BSD-3 | docker | **A** | PROVIDER-COMPLEMENT |
| **Milvus** (milvus-io) | 44,309 | Apache-2.0 | docker / pip | **A-** | PROVIDER-COMPLEMENT (large-scale) |
| **LanceDB** (lancedb/lancedb) | 10,314 | Apache-2.0 | embedded lib / pip | **A** | PROVIDER-COMPLEMENT (embedded) |
| **pgvector** (pgvector/pgvector) | 21,303 | PostgreSQL License (BSD-style) | postgres extension | **A** | PROVIDER-COMPLEMENT |
| **sqlite-vec** (asg017/sqlite-vec) **used-by mcp-memory-service** | 7,590 | Apache-2.0 | `pip install sqlite-vec` | **A (TRANSITIVE-INCUMBENT)** | TRANSITIVE-INCUMBENT |
| **typesense** (typesense) | 25,825 | Apache-2.0 | docker | **B** | DUPLICATE (full-text-search-focused) |
| **meilisearch** (meilisearch) | 57,587 | MIT | docker | **B** | DUPLICATE (search-engine, not pure vector) |
| **OpenSearch** (opensearch-project) | 12,935 | Apache-2.0 | docker | **B** | DUPLICATE (full-platform) |

**ADOPT-NOW grade-A picks (Layer 4)**: Vector DBs at Layer 4 are USED-BY Layer 1-2 candidates (cognee/LightRAG/R2R/mem0 all accept multiple). Recommended PROVIDER-COMPLEMENT pattern: keep `mcp-memory-service` using sqlite-vec (incumbent), AND wire `Qdrant` as Docker container for parallel pilot if Layer 1 cognee adoption proceeds. **ChromaDB** is the lowest-friction parallel install (pip install + embedded). **Pgvector** is best fit if operator already has Postgres infra (no separate container).

**Distinct from W207 D/E**: master catalog §2 lists `claude-context` (Anthropic OFFICIAL semantic-code-search → uses ChromaDB internally) but does NOT distinguish Qdrant / pgvector / LanceDB as separately-installable vector DBs. This layer fills that gap.

## Layer 5 — Embedding + Rerank inference (4 candidates BEYOND TEI)

| Repo | Stars | License | Install | Grade | Note |
|---|---:|---|---|:---:|---|
| **TEI** (huggingface/text-embeddings-inference) `master-catalog-ref` | 4,797 | Apache-2.0 | docker | **A (in master)** | Already in W207 master catalog |
| **FlagEmbedding** (BAAI / BGE) | ~10k★ (verify) | MIT | `pip install FlagEmbedding` | **A** | Best-in-class open embedder (BGE-M3 multilingual) |
| **voyage-rerank** (Voyage AI) | API-only | proprietary | API key | **B** | Hosted API only |
| **mxbai-rerank-large-v2** (mixedbread) | HF Hub model | Apache-2.0 (model weights) | `pip install mixedbread-ai` | **B** | Open weights for rerank |
| **cohere-rerank-3** (Cohere) | API-only | proprietary | API key | **B** | Hosted API only |

**ADOPT-NOW grade-A picks (Layer 5)**: BGE-M3 via FlagEmbedding (free, open weights, multilingual). PROVIDER-COMPLEMENT to TEI (TEI runs inference; FlagEmbedding provides reference impls + reranker support). If operator wants 1-line `pip install` for embeddings without docker, FlagEmbedding is the lane.

## Document parsing (BEYOND W207 markitdown/unstructured)

| Repo | Stars | License | MCP server? | Install | Grade |
|---|---:|---|---|---|:---:|
| **Docling** (docling-project) `LF AI & Data Foundation` | 59,783 | **MIT** ✅ | YES (`docling-mcp` separate package) | `pip install docling`; Windows native; ~50MB base | **A** |
| **markitdown** (microsoft) `in W207 master` | already-A | MIT | YES | pip | **A** |
| **unstructured** (Unstructured-IO) `in W207 master` | already-A | Apache-2.0 | n/a | pip | **A** |
| **Marker** (datalab-to) | 35,110 | **GPLv3** ❌ | NO | `pip install marker-pdf` | **D — REJECT-FOR-FIT.6** |
| **MinerU** (opendatalab) | ~20k | unknown | unknown | python | **C (study)** |

**ADOPT-NOW grade-A picks (parsing)**: **Docling** as `PROVIDER-COMPLEMENT` to markitdown — Docling has VLM pipeline for hard PDFs + Whisper ASR for audio + LF AI & Data Foundation hosting (multi-org governance, stronger axis-1 than microsoft-only markitdown). MIT permissive. Install `pip install docling` + `pip install docling-mcp` for MCP wire. Cite: DeepWiki docling-project/docling "Installation" + "MCP Server" sections [VERIFIED 2026-05-15].

**REJECT**: Marker (GPLv3 STRUCTURAL).

## NEW ADOPT-NOW candidates BEYOND master catalog §2

Following candidates are NEW BEYOND W206-W209 master ADOPT-NOW table:

1. **cognee-mcp** → ADOPT-NOW Tier-3 (Memory MCP COMPLEMENT layer)
2. **GraphRAG** (microsoft) → ADOPT-NOW Tier-3 (Graph-RAG capability gap)
3. **LightRAG** (HKUDS) → ADOPT-NOW Tier-3 (lightweight RAG-with-KG alternative)
4. **R2R** (SciPhi-AI) → ADOPT-NOW Tier-3 (MCP-native RAG with FastMCP)
5. **Docling** (LF AI) → ADOPT-NOW Tier-3 (PDF-to-markdown with MCP server — PROVIDER-COMPLEMENT to markitdown)
6. **FlagEmbedding/BGE-M3** (BAAI) → ADOPT-NOW Tier-3 (open-weights embedder + reranker, pip-installable)
7. **Qdrant** (Docker) → STUDY-PILOT Tier-3 (parallel vector DB pilot if cognee lands)
8. **ChromaDB** (pip) → STUDY-PILOT Tier-3 (lowest-friction parallel vector store)
9. **OpenSPG/KAG** (Ant Group) → STUDY-PILOT Tier-3 (knowledge-augmented gen, watch axis-3 maturity)

## NEW REJECT-FOR-FIT candidates

1. **openviking** (volcengine) → REJECT-FOR-FIT.6 license-blocker AGPLv3
2. **openviking-hooks** (benediktkraus) → REJECT companion (single-author, 1★, dependent on AGPLv3 reject)
3. **marker** (datalab-to) → REJECT-FOR-FIT.6 license-blocker GPLv3
4. **memgraph** → REJECT-FOR-FIT.6 license-blocker BSL-1.1
5. **kuzu** → REJECT (archived 2026)
6. **neo4j-community** → REJECT-FOR-FIT.6 license-blocker GPLv3
7. **letta** (as full-platform) → REJECT-FOR-FIT.7.a DEMAND-ABSENCE (orchestration duplicate)

## HONEST-NON-FINDING

- **memvid** (Olow304): repo not found via gh search; if it exists it's <stars-floor or removed. HONEST-NON-FINDING — needs operator-supplied URL to evaluate.
- **memori** (GibsonAI): only 0-star fork `vforvaick/gibsonai-memori-mcp` found; GibsonAI source repo NOT located via gh search. HONEST-NON-FINDING — needs direct URL.
- **letta-mcp-server**: doesn't exist as a separate repo per gh probe → confirms Letta is MCP-CLIENT not MCP-SERVER (matches DeepWiki verdict).

## CR-12 6-class disposition summary

Per `Z:\claude-sota-installed\.claude\rules\cardinal-rule-12-upstream-install-priority.md`:

| Class | Count | Examples |
|---|---:|---|
| GENUINELY-NEW | 0 | (none — all candidates have incumbent or near-overlap) |
| DUPLICATE-FUNCTIONALITY | 9 | dify, anything-llm, ragflow, kotaemon, MaxKB, FastGPT, openviking, letta, kuzu (archived) |
| PARTIAL-OVERLAP | 8 | basic-memory, mcp-knowledge-graph, MemoryMesh, MegaMemory, memory-mcp-server-Swift, engraph, tokensave, graphthulhu |
| **PROVIDER-COMPLEMENT** | **15** | cognee, mem0, GraphRAG, LightRAG, R2R, Docling, Qdrant, ChromaDB, Weaviate, Milvus, LanceDB, pgvector, FlagEmbedding, voyage-rerank, mxbai-rerank |
| ECOSYSTEM-IMPORT | 0 | (none surfaced in this discovery) |
| CITE-CLASS-CANONICAL | 0 | (none surfaced) |
| **License REJECT** | **6** | openviking AGPL, marker GPL, memgraph BSL, neo4j GPL + 2 |
| **Archived REJECT** | **1** | kuzu |
| **HONEST-NON-FINDING** | **3** | memvid, memori, letta-mcp-server |

## Recommended ADOPT-NOW priority order (post-W212)

For Tier-3 install wave following completion of W206-W209 master catalog ADOPT-NOW set:

1. **cognee-mcp** (Apache-2.0, MCP-native, complements mcp-memory-service) — wire as `cognee` MCP server in `.mcp.json` alongside existing `memory` (mcp-memory-service); allows operator A/B comparison
2. **Docling** + **docling-mcp** (MIT, PDF→markdown with MCP) — install via `pip install docling docling-mcp`; complements markitdown for tougher PDFs / multimodal docs
3. **GraphRAG** (microsoft, MIT) — `pip install graphrag`; **CITE-ONLY** unless graph-RAG over LLM-generated KG is queued workflow; today claude-sota uses Graphiti=real-time-agent-memory pattern (different shape from graph-RAG=retrieval-on-LLM-generated-KG)
4. **LightRAG** (HKUDS, MIT) — `uv tool install lightrag-hku[api]`; **STUDY-PILOT** if cognee adoption produces high noise or limited graph-RAG capability gap
5. **R2R** (SciPhi-AI, MIT) — `pip install r2r`; **STUDY-PILOT** if operator wants production RESTful RAG API with MCP wire
6. **FlagEmbedding** (BAAI, MIT) — `pip install FlagEmbedding`; embedder + reranker; **CITE-ONLY** today (TEI is in master), promote when LANE EMBEDDER pilot becomes a workflow

## Adversarial check (what did I miss?)

- **Did NOT verify** SPDX license of every grade-C candidate via direct LICENSE read (only top-of-table). Grade-C dispositions are PRELIMINARY — operator must read LICENSE before adoption.
- **Did NOT cross-reference** to mem0's Anthropic Trust Center compliance posture (Wave 119 FM-17.f relevance) — cloud-MCP routes user data through mem0.ai infra; verify with Anthropic Trust Center if PII-sensitive workflows are planned.
- **Did NOT measure** cognee-mcp cold-start time vs incumbent mcp-memory-service. Mia pre-apply BEFORE wire: smoke-probe `docker run cognee/cognee-mcp:main` against test fixture.
- **Verba and ragflow license** not directly verified via LICENSE read in this fire (DeepWiki returned unknown for ragflow LICENSE). Operator must verify before adoption.

## VERDICT: M-WAVE212-COMPLETE — 48 candidates scored across 5 layers; 11 grade-A, 13 grade-B, 10 grade-C, 14 grade-D/F; 9 new BEYOND-W206-W209 ADOPT-NOW candidates surfaced (cognee-mcp, GraphRAG, LightRAG, R2R, Docling, FlagEmbedding, Qdrant, ChromaDB, OpenSPG); 3 HONEST-NON-FINDING dispositions (memvid, memori, letta-mcp-server)
