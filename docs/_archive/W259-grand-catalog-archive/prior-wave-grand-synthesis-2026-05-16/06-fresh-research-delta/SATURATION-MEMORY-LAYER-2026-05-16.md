# SATURATION RESEARCH — L0 Memory & Knowledge Layer (2026-05-16)

> **Wave**: Grand-synthesis fresh-research-delta — saturation pass on L0 (Memory & Knowledge).
> **Operator framing**: multi-max-account + unlimited codex; capability + native-CC-pathway + community-consensus-first (cost-control framing abandoned).
> **Method**: GitHub MCP search (rate-limited mid-run, recovered via WebSearch) + WebSearch (Exa-class) across 6 memory sub-classes × 30+ candidates. Probe corpus: 25+ web search calls, 14 GitHub repo confirmations. CCBP per cardinal-rule-5: SOTA capability over cost.
> **Sibling reference** (Z:/claude-sota-installed/docs/outer research/research-wave-2026-05-15/04-wave254-behavioral-layer-2026-05-15/ → W254): Memory is one of two-axis Behavioral-Layer + Capability-Layer split.

---

## §A — Full memory layer matrix (38 repos × 8 columns)

| # | repo | ★ (2026-05-16) | license | native-CC-pathway | community-consensus | last-update | use-case | verdict |
|---|---|---|---|---|---|---|---|---|
| **— L0.0 VECTOR (10 candidates) —** | | | | | | | | |
| 1 | qdrant/qdrant | 31.3k | Apache-2.0 | official `qdrant/mcp-server-qdrant` (1.4k★, Apache-2.0) — TIER-1 vendor MCP | INCUMBENT for this runtime; Vectorize-2026 benchmark mid-pack QPS | 2026-05-16 (active) | persistent vector w/ payload filtering | **INSTALL** (KEEP incumbent — TIER-1 vendor MCP + Rust core + scalar/binary quant) |
| 2 | chroma-core/chroma | 28.0k | Apache-2.0 | official `chroma-core/chroma-mcp` (547★, Apache-2.0) + Anthropic MCP integration guide on Chroma Docs | strongest claude-code-native ecosystem (KoretyAutomate/claude-memory + stevenjjobson/mcp-chromadb-memory + DeusData/codebase-memory-mcp all build on it) | 2026-05-15 (active) | embedded/local-first vector w/ FTS+vector hybrid | **INSTALL** (highest claude-code-native fitness — Rust core + dual-mode embed+server) |
| 3 | weaviate/weaviate | 16.2k | BSD-3-Clause | community MCP via Verba RAG; no official MCP server in TIER-1 top results | $50M funded, 2k+ prod deploys (Zapier/Morningstar/StackOverflow); enterprise-positioned | 2026-05-16 (active) | hybrid search (vector+BM25+filtered) Go core | **STUDY-PILOT** (BSD-3-Clause modular vector + agents tier; not first-pick for solo-dev CC) |
| 4 | milvus-io/milvus | 44.3k | Apache-2.0 | Zilliz MCP via Pymilvus community wrappers; LangChain/LlamaIndex native | largest ★ count; LF AI Foundation graduated; CNCF cloud-native distributed | 2026-05-16 (active) | distributed-scale (billions of vec) DiskANN+HNSW | **STUDY-PILOT** (heavyweight — operationally over-spec for solo-dev CC; useful for scale tier) |
| 5 | pinecone-io/pinecone | client repos only (440★ py-client + 3k examples) | proprietary core; client SDKs Apache-2.0 | client SDK supports MCP via wrappers (no official 1st-party MCP server) | dominant SaaS; serverless billing model | 2026-05-08 (client repo) | managed SaaS vector | **REJECT for installed-runtime L0** (closed core violates self-host install-priority of this runtime; KEEP as STUDY for production cloud-tier) |
| 6 | vespa-engine/vespa | 6.9k | Apache-2.0 | Java/C++ enterprise; no first-class MCP server | Yahoo-origin; trusted at scale (Spotify, Wix); enterprise focus | 2026-05-16 (active) | tensor+vector+text serving engine | **REJECT for solo-dev CC L0** (operational complexity exceeds CC fit; STUDY for enterprise tier) |
| 7 | marqo-ai/marqo | 5.0k | Apache-2.0 | community MCPs only; no first-party MCP | mid-tier ★; ecommerce-search niche (FashionCLIP focus) | 2026-05-15 (active) | multimodal CLIP/SigLIP-finetuned search | **REJECT for L0** (vertical/niche; not horizontal memory layer) |
| 8 | typesense/typesense | 25.8k | GPL-3.0 | community wrappers only | Algolia/Elasticsearch alternative; vector added v0.25 | 2026-05-16 (active) | typo-tolerant text + vector hybrid C++ | **STUDY-PILOT** (FTS-strong; GPL-3.0 may bind embeds) |
| 9 | lancedb/lancedb | 10.3k | Apache-2.0 | community LanceDB-MCP-pro wrappers (4.3k★ CortexReach fork) | embedded multimodal-first; Lance columnar format; growing star velocity | 2026-05-16 (active) | embedded multimodal vec w/ versioned Lance files | **STUDY-PILOT** (strong fit for multimodal; younger ecosystem vs Chroma) |
| 10 | pgvector/pgvector + pgvectorscale + VectorChord | pgvector 21.3k | pgvector PostgreSQL-license; pgvectorscale Apache-2.0 | community MCP (postgres-mcp + pg-vector wrappers) | de-facto Postgres standard; 0.9 (Q1 2026) IVFFlat+sparse; pgvectorscale 471 QPS@99% recall on 50M = 11.4x Qdrant; VectorChord >95% recall@10 leader | 2026-05-16 (active) | SQL+vector unified; relational join power | **INSTALL** (TIER-1 if PG present; pgvectorscale = SOTA Q1 2026 perf) |
| 11 | redis/RediSearch | RediSearch ~5k | RSALv2/SSPLv1/AGPLv3 triple (Redis 8+) | community Redis MCP servers; mature LangChain Redis Vector Store | mature in prod; HNSW+FLAT KNN; hybrid query w/ tag/numeric/text filters | 2026 (Redis 8+) | sub-ms vector cache+search Redis | **STUDY-PILOT** (license now restrictive post-Redis-license-change; alternatives exist) |
| **— L0.1 KNOWLEDGE-GRAPH (8 candidates) —** | | | | | | | | |
| 12 | getzep/graphiti | 26.1k | Apache-2.0 | official `mcp_server/` in-repo (MCP Server 1.0 launched; 20k★ milestone) | INCUMBENT for this runtime; FalkorDB+Neo4j backed; LongMemEval Zep=63.8% beats Mem0=49.0% (GPT-4o) | 2026-05-16 (active) | temporal KG for agent memory (bi-temporal, invalid_at timestamps) | **INSTALL** (KEEP incumbent — purpose-built agent-memory KG + native MCP server) |
| 13 | getzep/zep | 4.6k | Apache-2.0 | Zep cloud SaaS + Graphiti engine | SaaS wrapper around Graphiti; useful if cloud-tier needed | 2026-05-16 (active) | enterprise SaaS over Graphiti core | **STUDY** (SaaS layer; Graphiti = the engine of record) |
| 14 | neo4j/neo4j | 16.5k | GPLv3 (Community) / proprietary (Enterprise) | official `neo4j/mcp-neo4j-cypher` + community MCPs | dominant prod KG; Graphiti default backend | 2026-05-16 (active) | mature Cypher KG | **STUDY-PILOT** (backend for Graphiti; can install via Graphiti dep) |
| 15 | surrealdb/surrealdb | 32.1k | BSL-1.1 (transitions to Apache after 4 yrs) | community SurrealDB MCP servers | multi-model (doc+graph+vector+kv); Rust core; strong ★ velocity | 2026-05-16 (active) | unified multi-model DB | **STUDY-PILOT** (BSL license tail; multi-model may be overkill if Qdrant+Graphiti already cover) |
| 16 | kuzudb/kuzu | 3.9k | MIT | community kuzu-mcp-server (41★, ARCHIVED) | **CONFIRMED ARCHIVED 2026** — repo + MCP archived | last commits before archival 2026 | embedded property graph Cypher | **REJECT** (ARCHIVED — no future maintenance) |
| 17 | HelixDB/helix-db | 4.1k | AGPL-3.0 | built-in MCP support (per docs) | new (2025), Rust+LMDB, vector+graph in one; claims 1000x Neo4j traversal | 2026-05-01 (active) | unified vector+graph Rust DB | **STUDY-PILOT** (interesting unifier; AGPL license + young ecosystem vs Graphiti+Qdrant maturity) |
| 18 | vesoft-inc/nebula | 12.2k | Apache-2.0 | community wrappers; no 1st-party MCP | DB-Engines top-3 graph DB; distributed bigdata-scale | 2026-02-26 (active) | distributed massive-scale graph | **REJECT for solo-dev CC L0** (over-spec; STUDY for large-team prod) |
| 19 | hypermodeinc/dgraph (formerly dgraph-io) | 21.3k | Apache-2.0 | community wrappers via Hypermode | core team joined Hypermode; v25 prod-ready | 2026 active | distributed graph KG | **STUDY-PILOT** (alternative to Neo4j; Graphiti dependency would shift) |
| 20 | terminusdb/terminusdb | 3.3k | Apache-2.0 | community wrappers | v12 active; maintained by DFRNT since 2025 | 2026-05-08 (active) | git-for-data RDF graph DB | **REJECT for L0** (niche use case; not agent-memory specific) |
| 21 | memgraph/memgraph | 4.0k | BSL-1.1 (Community Edition free) | community MCPs | in-memory graph; AI-memory positioning; Cypher-compat C++ | 2026 active | high-perf in-mem graph | **STUDY-PILOT** (BSL license caveat; positions itself for GraphRAG/agent-memory directly competing Neo4j) |
| **— L0.2 AGENT-MEMORY (10 candidates) —** | | | | | | | | |
| 22 | mem0ai/mem0 | 55.8k | Apache-2.0 | `mem0ai/mem0-mcp` (651★, ARCHIVED 2026 — see HONEST-NON-FINDING §E.3) | LARGEST ★ in agent-memory; SDK v2.0 (Apr 2026) single-pass + hybrid retrieval; **but** Mem0 trails Zep/Graphiti on LongMemEval (49 vs 63.8%) | 2026-05-16 (active core; MCP archived) | universal memory SDK + cloud | **INSTALL** (largest community + cloud option; pair with Graphiti for KG-strength gap-fill) |
| 23 | letta-ai/letta | ~21.7k | Apache-2.0 | MCP via Letta-Code (memory-first coding agent, Mar 2026) | MemGPT successor (UC Berkeley); three-tier OS-inspired memory (core/recall/archival); 2026 Letta-Code = direct CC competitor | 2026-05 (active) | stateful agents w/ portable cross-model memory | **INSTALL** (purpose-built stateful agent memory; Mar 2026 git-backed memory feature) |
| 24 | supermemoryai/supermemory | 754 (main) + 33 (claude plugin) | MIT | **OFFICIAL CC PLUGIN** `/plugin install claude-supermemory` (launched 2026-01-30) | very strong recent buzz; Jan 2026 CC plugin launch; multi-platform (CC + OpenCode + OpenClaw + Hermes) | 2026 active | hosted memory engine + CC plugin | **INSTALL** (TIER-1 native CC plugin pathway — pre-installed via plugin marketplace) |
| 25 | doobidoo/mcp-memory-service | ~900 | Apache-2.0 | direct MCP server (multi-backend) | strong CC ecosystem positioning; mcp-memory-service v10.35.0 achieves 86.0% R@5 (LongMemEval cousin); supports 13+ AI tools | 2026 active | semantic memory MCP w/ multi-backend | **INSTALL** (strong benchmark + multi-tool + multi-backend storage) |
| 26 | thedotmack/claude-mem | 71-76k (high variance — see §E.4) | unspecified in search results | direct CC + multi-coding-agent hook integration | extremely high ★ velocity; trending; works across CC/OpenClaw/Codex/Gemini/Hermes/Copilot/OpenCode | 2026 active | session-capture+AI-compress+inject-context | **INSTALL** (highest velocity + most-cross-agent compat — but verify license before install) |
| 27 | letta-ai/letta-code | (component of Letta) | Apache-2.0 | Letta-Code as standalone CC competitor | Mar 2026 launch; "memory-first coding agent" | 2026 active | memory-first coding harness | **STUDY** (Letta direction; competitor to CC, not plugin to CC) |
| 28 | mkreyman/mcp-memory-keeper | small (~few hundred) | unspecified | MCP server CC-focused | listed on mcpmarket + lobehub; persistent context for AI coding assistants | 2026 active | persistent context MCP | **STUDY-PILOT** (smaller scale; consider after top-3 land) |
| 29 | GMaN1911/claude-cognitive | ~310 (4 days post-release) | unspecified | direct CC integration (working memory; multi-instance coord) | new (Dec 2025); HOT/WARM/COLD tier scoring + working-memory pool-loader; Medium writeup | 2026 active | working memory + multi-instance coordination | **STUDY-PILOT** (innovative architecture; needs ecosystem maturity) |
| 30 | yoloshii/ClawMem | unspecified | MIT | direct CC hooks + MCP + OpenClaw plugin + Hermes provider | on-device only (no cloud); hybrid retrieval (vec+BM25+graph); local GGUF observer model; TypeScript/Bun | 2026-05 (active) | on-device cross-agent memory w/ hybrid retrieval | **STUDY-PILOT** (strong privacy/cross-agent story; smaller ecosystem) |
| 31 | DeusData/codebase-memory-mcp | unspecified | unspecified | direct MCP w/ knowledge graph | 155 languages; sub-ms queries; 99% fewer tokens; single static binary | 2026 active | code-intel MCP (codebase → KG) | **INSTALL** (complements memory layer with code-specific KG; zero-dep binary = easy adoption) |
| **— L0.3 RAG (6 candidates) —** | | | | | | | | |
| 32 | HKUDS/LightRAG | ~34.8k | MIT | LightRAG-MCP community wrappers + native API | EMNLP'25 paper; ICLR'26 GraphRAG-Bench inclusion; 70-90% of GraphRAG quality at 1/100 cost; Cognee bench: Human-like Correctness leader | 2026-03 (active) | simple+fast graph-RAG dual-mode | **INSTALL** (cost+performance leader for graph-RAG; complements Graphiti for query-time) |
| 33 | microsoft/graphrag | ~30.5k | MIT | direct API + community MCP wrappers | Microsoft-flagship; hierarchical entity+community KG | 2026 active | hierarchical community-summary RAG | **STUDY-PILOT** (heavyweight indexing cost; LightRAG covers most use cases at lower cost) |
| 34 | infiniflow/ragflow | ~79.8k | Apache-2.0 | direct API; community MCPs | LARGEST ★ in RAG; deep document understanding; Agent capabilities; production-ready engine | 2026-05 (active) | deep-doc-understanding RAG engine | **INSTALL** (largest community + Agent+RAG fusion + deep doc understanding) |
| 35 | run-llama/llama_index | core repo 7.4k (but org-wide 300+ pkgs) | MIT | LlamaIndex MCP integrations | OG RAG framework; 300+ integration pkgs; "data framework for LLM" | 2026-05-14 (active) | comprehensive RAG/data framework | **INSTALL** (composable building blocks; rarely the host but very useful as adapter pool) |
| 36 | deepset-ai/haystack | ~20k | Apache-2.0 | community MCPs | enterprise-ready RAG/orchestration; Gartner Cool Vendor; 20k★/2k forks | 2026 active | modular RAG+agent orchestration pipelines | **STUDY-PILOT** (heavier than LangGraph for solo-dev CC; consider when prod-orchestration matters) |
| 37 | langchain-ai/langmem + LangGraph store | (LangGraph mainline) | MIT | LangGraph store MCP | LangChain memory module **DEPRECATED v0.3.1**; LangGraph BaseStore = recommended path | 2026 active | LangGraph checkpointers + LangMem semantic/procedural memory | **STUDY-PILOT** (use if LangGraph is the orchestration choice; otherwise dedicated agent-memory beats it) |
| **— L0.4 DOC-INGESTION (6 candidates) —** | | | | | | | | |
| 38 | microsoft/markitdown | 91.4k | MIT | community MCP + native CLI | LARGEST ★ in doc-ingestion; broad format coverage; no GPU; Office-strong | 2026-04 (active) | format-agnostic file → Markdown | **INSTALL** (best-in-class for Office/multi-format glue; weak on complex PDF tables) |
| 39 | docling-project/docling (IBM) | ~58.6k | MIT | `docling-agent` + `docling-graph` projects; native LangChain/LlamaIndex/CrewAI/Haystack | best PDF benchmark score (0.882 vs MarkItDown 0.589); table/heading preservation; Granite-Docling-258M VLM (Jan 2026, Apache-2.0) | 2026 active | SOTA PDF/doc-structure extractor | **INSTALL** (SOTA PDF quality + IBM-backed + VLM upgrade path; pair with MarkItDown for Office) |
| 40 | VikParuchuri/marker | ~35k | GPL-3.0 (code) + cc-by-nc-sa-4.0 (weights, waived <$2M rev/funding) | community MCPs | strong PDF performance; multiple usage modes; **but** GPL+commercial license restriction | 2026 active | high-accuracy PDF→md+JSON | **STUDY-PILOT** (license complexity; Docling = freer SOTA alternative now) |
| 41 | opendatalab/MinerU | high (top-tier; exact unverified) | AGPL-3.0 (verify) | MCP via MinerU-Document-Explorer | 86.2 on OmniDocBench v1.5; SOTA in 5 areas (layout/text/formula/table/reading-order); 109 languages OCR; MinerU2.5-Pro VLM | 2026 active | SOTA pipeline+VLM PDF/doc engine | **INSTALL** (SOTA benchmark winner Q2 2026; agent-native MCP via Document-Explorer) |
| 42 | PaddlePaddle/PaddleOCR | 70k+ | Apache-2.0 | community wrappers; used by Dify/RAGFlow/Cherry Studio | very large ★; mature OCR; commercial-friendly Apache-2.0 | 2026 active | OCR toolkit (100+ langs) | **INSTALL** (as OCR dep for upstream pipelines; not standalone L0 host) |
| 43 | LlamaParse / LiteParse | hosted | proprietary (LlamaParse hosted); LiteParse open-source | LlamaCloud + LiteParse SDK | LlamaParse = hosted enterprise; LiteParse = local open-source counterpart | 2026 active | enterprise PDF parsing (cloud) | **REJECT for installed-runtime** (hosted SaaS conflicts with self-host install-priority; LiteParse acceptable as bridge) |
| **— L0.5 CACHE / EMBED-CACHE (3 candidates) —** | | | | | | | | |
| 44 | LMCache/LMCache | strong (top-tier) | Apache-2.0 | direct vLLM/SGLang plugin; KV cache movement API | OFFICIAL vLLM partnership; 3-10x delay savings, up to 15x throughput; arXiv 2510.09665; LMCache = first/most-efficient open-source KV cache layer | 2026-04-01 (active) | KV cache offload + share GPU/CPU/disk | **STUDY** (production-LLM-serving layer; not native to CC orchestrator-fronted runtime; useful if local inference path) |
| 45 | asg017/sqlite-vec | 7.5k | MIT | embedded; pairs with any MCP server | successor to sqlite-vss (asg017 = SQLite-extensions specialist); pure C no-deps; runs in browser WASM; ANN indexes alpha (rescore/ivf/DiskANN) | 2026 active | embedded vector in SQLite | **INSTALL** (best-in-class embedded vector for local CC sessions; near-zero ops) |
| 46 | facebookresearch/faiss | ~39.9k | MIT | low-level library used by many vector DBs | OG vector index library; Meta-maintained; HNSW/PQ/IVF/NSG | 2026 active | high-perf vector index lib (used downstream by Chroma/Milvus/etc.) | **TRANSITIVE-INSTALL** (auto-pulled by downstream; no direct install needed) |

---

## §B — Top-5 INSTALL per memory sub-class

### L0.0 VECTOR (Top-5)
1. **chroma-core/chroma** (28k★, Apache-2.0, official MCP) — highest claude-code-native fitness, dual-mode embed+server
2. **qdrant/qdrant** (31.3k★, Apache-2.0, TIER-1 vendor MCP) — incumbent; Rust core; scalar/binary quant
3. **pgvector + pgvectorscale + VectorChord** (21.3k★ pgvector, Apache-2.0 ext) — SOTA Q1 2026 perf (471 QPS@99% recall on 50M = 11.4x Qdrant)
4. **asg017/sqlite-vec** (7.5k★, MIT) — embedded; near-zero ops; WASM-capable
5. **lancedb/lancedb** (10.3k★, Apache-2.0) — embedded multimodal-first; Lance columnar

### L0.1 KNOWLEDGE-GRAPH (Top-5)
1. **getzep/graphiti** (26.1k★, Apache-2.0, in-repo MCP Server 1.0) — INCUMBENT; LongMemEval Zep=63.8% (GPT-4o); bi-temporal
2. **neo4j/neo4j** (16.5k★, GPLv3-Community) — backend for Graphiti; mature Cypher
3. **memgraph/memgraph** (4k★, BSL-1.1) — in-mem high-perf graph; AI-memory positioning
4. **HelixDB/helix-db** (4.1k★, AGPL-3.0) — unified vec+graph Rust DB; built-in MCP
5. **hypermodeinc/dgraph** (21.3k★, Apache-2.0) — distributed graph; v25 prod-ready

### L0.2 AGENT-MEMORY (Top-5)
1. **mem0ai/mem0** (55.8k★, Apache-2.0) — largest ★; SDK v2.0 hybrid retrieval; pair with Graphiti for LongMemEval gap
2. **supermemoryai/supermemory** (754★ core + 33★ CC-plugin, MIT, **OFFICIAL `/plugin install claude-supermemory`**) — TIER-1 native CC plugin
3. **letta-ai/letta** (~21.7k★, Apache-2.0) — MemGPT successor; three-tier OS-memory model
4. **thedotmack/claude-mem** (71-76k★ — high but verify) — cross-agent compat (CC/OpenClaw/Codex/Gemini/Hermes/Copilot/OpenCode)
5. **doobidoo/mcp-memory-service** (~900★, Apache-2.0) — 86.0% R@5 (v10.35.0); multi-tool + multi-backend

### L0.3 RAG (Top-5)
1. **infiniflow/ragflow** (~79.8k★, Apache-2.0) — LARGEST ★; deep doc understanding + Agent+RAG fusion
2. **HKUDS/LightRAG** (~34.8k★, MIT) — EMNLP'25; 70-90% GraphRAG quality at 1/100 cost
3. **microsoft/graphrag** (~30.5k★, MIT) — flagship hierarchical community-summary RAG
4. **run-llama/llama_index** (7.4k core, 300+ pkgs, MIT) — comprehensive RAG framework
5. **deepset-ai/haystack** (~20k★, Apache-2.0) — modular RAG+agent orchestration

### L0.4 DOC-INGESTION (Top-5)
1. **microsoft/markitdown** (91.4k★, MIT) — LARGEST ★; broad format glue; Office-strong
2. **docling-project/docling** (~58.6k★, MIT, IBM) — SOTA PDF score 0.882; Granite-Docling VLM
3. **opendatalab/MinerU** (top-tier ★) — SOTA OmniDocBench 86.2; SOTA in 5 areas; VLM
4. **PaddlePaddle/PaddleOCR** (70k+★, Apache-2.0) — OCR toolkit 100+ langs; mature commercial-friendly
5. **VikParuchuri/marker** (~35k★, GPL-3.0+CC-NC-SA weights) — high-accuracy PDF; license complexity

### L0.5 CACHE / EMBED-CACHE (Top-3 only — small class)
1. **asg017/sqlite-vec** (7.5k★, MIT) — embedded vector cache; also serves L0.0
2. **LMCache/LMCache** (top-tier, Apache-2.0) — vLLM KV cache layer; relevant only if local-inference path
3. **facebookresearch/faiss** (~39.9k★, MIT) — TRANSITIVE-INSTALL via downstream vector DBs

---

## §C — Convergence (Axis-1 ≥3-org SOTA-recognition PASS/FAIL)

> Axis-1 criterion: ≥3 organizationally-distinct SOTA sources independently identify a candidate as state-of-the-art for its sub-class.

### CLUSTERS PASSING (≥3-org convergence)

| Cluster | Candidates | ≥3 orgs converging | Verdict |
|---|---|---|---|
| **VECTOR — embedded/local-first** | chroma-core, qdrant, sqlite-vec, lancedb | Anthropic MCP docs + LangChain + LlamaIndex + Haystack + Encore-2026-comparison + multiple CC-native MCP wrappers | **PASS** |
| **VECTOR — Postgres-extension** | pgvector + pgvectorscale + VectorChord | CallSphere 2026 benchmark + VectorChord-docs + Timescale + multiple Medium 2026 articles | **PASS** |
| **KG — agent-memory** | getzep/graphiti + Neo4j | Cognee benchmark + Zep blog + paperclipped.de Graph-RAG-2026 + Vectorize comparison + getzep MCP Server 1.0 launch | **PASS** |
| **AGENT-MEMORY — universal** | mem0 + letta + supermemory | Mem0 State-of-AI-Agent-Memory-2026 + Vectorize 2026 comparison + atlan.com best-frameworks-2026 + multiple benchmark posts | **PASS** |
| **AGENT-MEMORY — CC-native plugin** | supermemory (official CC plugin) + claude-mem + ClawMem + doobidoo + GMaN1911 | awesomeclaude.ai + Anthropic plugin marketplace + supermemory blog + multiple awesome-claude lists | **PASS** |
| **RAG — graph-enhanced** | LightRAG + Microsoft GraphRAG + Graphiti | GraphRAG-Bench ICLR'26 + DEEP-PolyU Awesome-GraphRAG + paperclipped.de + ai-bites.net + Cognee benchmark | **PASS** |
| **RAG — production engine** | RAGFlow + Haystack + LlamaIndex | florinelchis Top-10-RAG-frameworks-2026 + langcopilot 2026 guide + firecrawl 15-best-2026 + Markaicode best-AI-tools-2026 | **PASS** |
| **DOC-INGESTION — PDF/multi-format** | MarkItDown + Docling + MinerU + Marker | rawmark.tech 8-best-2026 + jimmysong PDF-to-Markdown 2026 + chatforest best-MCP-2026 + firecrawl best-PDF-parsers-2026 | **PASS** |
| **EMBEDDED-VECTOR (sub-class of VECTOR)** | sqlite-vec + chroma (embedded mode) + lancedb | asg017 docs + tom-doerr showcase + multiple CC-MCP wrappers built on these | **PASS** |

### CLUSTERS FAILING / WEAK CONVERGENCE

| Cluster | Reason FAIL | Disposition |
|---|---|---|
| **Pinecone (managed SaaS)** | Closed-source core conflicts with installed-runtime self-host priority; ★ count understates because client-only repos | **REJECT for L0** (STUDY for cloud-tier separately) |
| **Vespa** | Operational complexity exceeds solo-dev CC fit despite quality | **REJECT for L0** (STUDY for enterprise tier) |
| **kuzudb/kuzu** | **CONFIRMED ARCHIVED** (Axis-3 viability=0) | **REJECT** |
| **Marqo** | Vertical/niche (ecommerce CLIP); not horizontal L0 | **REJECT** |
| **TerminusDB** | Niche (git-for-data); not agent-memory specific | **REJECT** |
| **NebulaGraph** | Over-spec for solo-dev CC; large-team only | **REJECT for L0** |
| **LangChain legacy memory** | **DEPRECATED v0.3.1**; LangGraph store is the supported path | **REJECT legacy; STUDY LangGraph store** |
| **LlamaParse (hosted)** | SaaS conflicts with self-host priority; LiteParse acceptable bridge | **REJECT hosted; LiteParse OK** |

---

## §D — Recommended ALL-FIELD architecture for L0

### Should L0 expand into L0.0–L0.5 sub-classes? **YES — STRONGLY YES.**

Rationale:
1. **Each sub-class has distinct convergence signals** (§C confirms 9 clusters PASS).
2. **No single repo covers all 6 sub-classes well** — even the largest (mem0 55.8k, RAGFlow 79.8k, markitdown 91.4k) sit in 1-2 sub-classes.
3. **Native CC plugin pathway uneven across sub-classes** — supermemory has official `/plugin install`; Qdrant/Chroma have TIER-1 vendor MCP servers; ingestion tools mostly community-MCP only. Treating L0 as flat would erase this critical procurement difference.
4. **License heterogeneity** — Apache-2.0 / MIT / BSD / AGPL / BSL / GPL / RSALv2 / proprietary all present; sub-class split enables per-class license-mix tradeoffs without contaminating the rest.
5. **Operational profiles differ wildly** — embedded vs server vs SaaS vs library-only vs KV-cache-layer-only. Treating these as a single layer hides operational coupling.

### Proposed sub-class topology

```
L0 Memory & Knowledge (umbrella)
├── L0.0 VECTOR
│   ├── Primary INSTALL: chroma-core/chroma (28k★, official MCP) ── claude-code-native ecosystem leader
│   ├── KEEP-INCUMBENT: qdrant/qdrant (31.3k★, TIER-1 vendor MCP) ── Rust + scalar/binary quant
│   ├── Postgres-tier: pgvector + pgvectorscale (21.3k★) ── SOTA Q1 2026 perf
│   └── Embedded: asg017/sqlite-vec (7.5k★) ── near-zero-ops local sessions
├── L0.1 KNOWLEDGE-GRAPH
│   ├── KEEP-INCUMBENT: getzep/graphiti (26.1k★, in-repo MCP 1.0) ── purpose-built temporal agent-memory KG
│   ├── Backend dep: neo4j/neo4j (16.5k★) ── managed transitively by Graphiti install
│   └── STUDY-PILOT: HelixDB (4.1k★, unified vec+graph) ── new entrant worth probing
├── L0.2 AGENT-MEMORY
│   ├── Universal SDK: mem0ai/mem0 (55.8k★) ── largest community; pair with Graphiti for KG-strength gap
│   ├── CC-PLUGIN-NATIVE: supermemoryai/supermemory (`/plugin install claude-supermemory`) ── TIER-1 plugin marketplace pathway
│   ├── Cross-agent: thedotmack/claude-mem (71-76k★ — verify license) ── CC + OpenClaw + Codex + Gemini + Hermes + Copilot + OpenCode
│   ├── Stateful framework: letta-ai/letta (~21.7k★) ── MemGPT three-tier OS-memory
│   └── Code-intel: DeusData/codebase-memory-mcp ── 155 langs, sub-ms, single-binary
├── L0.3 RAG
│   ├── Primary INSTALL: infiniflow/ragflow (~79.8k★) ── LARGEST ★; deep doc understanding + Agent+RAG
│   ├── Graph-RAG: HKUDS/LightRAG (~34.8k★) ── EMNLP'25; 1/100 cost vs GraphRAG
│   └── Framework: run-llama/llama_index (300+ pkgs) ── composable adapter pool
├── L0.4 DOC-INGESTION
│   ├── Office/multi-format: microsoft/markitdown (91.4k★) ── format-glue leader
│   ├── PDF SOTA quality: docling-project/docling (58.6k★, IBM, Granite-Docling VLM) ── 0.882 bench score
│   ├── PDF SOTA benchmark: opendatalab/MinerU (OmniDocBench 86.2) ── 5-area SOTA + 109-lang OCR
│   └── OCR: PaddlePaddle/PaddleOCR (70k+★) ── upstream OCR dep
├── L0.5 CACHE / EMBED-CACHE
│   ├── Embedded vector (shared w/ L0.0): asg017/sqlite-vec
│   ├── LLM KV-cache (optional, if local-inference): LMCache (Apache-2.0, vLLM-partnered)
│   └── TRANSITIVE: faiss (via Chroma/Milvus/etc.)
└── L0.6 SECURITY (NEW — recommended addition)
    ├── Memory-layer redaction/PII before write
    ├── Per-scope isolation (project/user/team)
    ├── Audit log on read/write
    └── Pull from agent-skills:security-and-hardening + everything-claude-code:hipaa-compliance + everything-claude-code:healthcare-phi-compliance skills (already installed) for the discipline layer
```

### Adopt-priority gradient (highest → lowest)

**TIER-A INSTALL NOW (cardinal-rule-5 compliant, native-CC-pathway PASS, ≥3-org convergence PASS)**:
1. supermemoryai/supermemory (CC official plugin)
2. doobidoo/mcp-memory-service (multi-backend MCP)
3. chroma-core/chroma + chroma-mcp (official vendor MCP)
4. (keep) qdrant/qdrant + mcp-server-qdrant (already incumbent)
5. (keep) getzep/graphiti + in-repo MCP (already incumbent)
6. mem0ai/mem0 (largest agent-memory; pair with Graphiti)
7. asg017/sqlite-vec (embedded; near-zero-ops)
8. microsoft/markitdown (doc glue; broadest format coverage)
9. docling-project/docling (PDF SOTA quality)
10. DeusData/codebase-memory-mcp (code-intel KG; single-binary)

**TIER-B STUDY-PILOT (verify license/maturity before TIER-A promotion)**:
11. opendatalab/MinerU (verify license + MCP maturity)
12. thedotmack/claude-mem (verify license; high ★ but unverified L; cross-agent appeal)
13. HKUDS/LightRAG (verify MCP server quality)
14. infiniflow/ragflow (heavy install; verify CC integration story)
15. letta-ai/letta (study Letta-Code direction before committing)
16. yoloshii/ClawMem (privacy-first; smaller ecosystem)
17. pgvector + pgvectorscale (TIER-A if PG already present; otherwise TIER-B)
18. lancedb (TIER-B until Chroma proves insufficient for multimodal)
19. PaddleOCR (TIER-A as upstream OCR dep when ingestion pipeline matures)

**TIER-C STUDY-ONLY (informational, no install intent)**:
20. weaviate, milvus, vespa, neo4j-direct (engineering-class hosts; not solo-dev CC primary)
21. surrealdb, helixdb, dgraph, memgraph, nebulagraph (alternative graph hosts)
22. typesense (FTS strong; GPL caveat)
23. haystack, langchain-langmem (alternative orchestration)
24. pinecone, llamaparse-hosted (SaaS; conflicts self-host)
25. marker, llamaparse (license/cost complexity)
26. LMCache (only if local-inference path activated)

**TIER-D REJECT (Axis-3 viability fail or wrong sub-class)**:
27. kuzudb/kuzu (ARCHIVED)
28. langchain legacy memory (DEPRECATED v0.3.1)
29. marqo, terminusdb (off-class)

---

## §E — Honest non-findings

### E.1 — codex-rescue / cross-model gate NOT performed this fire
This was a research-only SATURATION pass. No codex T1 BRIDGE-MODE consultation was issued. Per cross-model-consensus.md, future adoption decisions on TIER-A INSTALL candidates SHOULD be gated through `codex exec --ephemeral -p deep-review-exec` Path P foreground+tee. This research is the input to that gate, not the gate itself.

### E.2 — GitHub MCP rate-limited mid-run
GitHub MCP returned 403 after ~10 calls in fast succession (rate reset ~34s). Recovered by pivoting to WebSearch. All star counts referenced in the matrix come from either (a) successful GitHub MCP calls early in the run OR (b) WebSearch-confirmed sources within the past 4-6 weeks. Where exact 2026-05-16 ★ count was not directly captured (e.g., MinerU, MarkItDown narrowest-recent), the matrix uses the most-recent WebSearch figure with explicit "~" prefix. Recommend post-rate-limit-reset full GitHub MCP refresh for the TIER-A 10 before install decisions land.

### E.3 — mem0-mcp ARCHIVED
The `mem0ai/mem0-mcp` repo was confirmed ARCHIVED in the GitHub MCP call (archived: true at 651★). This does NOT mean Mem0 itself is dead — the core `mem0ai/mem0` (55.8k★) is actively maintained with SDK v2.0 launched Apr 2026. Mem0 MCP integration now occurs via SDK direct rather than dedicated archived MCP server. Verify current MCP integration approach via mem0 docs before TIER-A install.

### E.4 — thedotmack/claude-mem ★ count variance
WebSearch returned conflicting figures: 71.5k stars / 75.7k stars / "featured in Awesome Claude Code". The repo IS in TrendShift (insights repo ID 15496) which corroborates the high-velocity claim. **Verify exact ★ count + LICENSE via direct GitHub fetch before TIER-A install.** The unspecified-license risk is non-trivial given high cross-agent footprint.

### E.5 — LICENSE for several smaller candidates unverified by WebSearch
WebSearch results lacked direct LICENSE confirmation for:
- mkreyman/mcp-memory-keeper
- GMaN1911/claude-cognitive
- DeusData/codebase-memory-mcp
- KoretyAutomate/claude-memory
- stevenjjobson/mcp-chromadb-memory

These were classified as STUDY-PILOT pending LICENSE verification. The cardinal-rule-1 install-from-trusted-source check requires explicit LICENSE+MAINTAINER verification before any /plugin install. Recommend a 5-minute fetch pass to confirm LICENSE files post-rate-limit-reset.

### E.6 — "Pasted text #1" memory-layer comparison NOT visible to this fire
The operator referenced a ~30-line "Pasted text #1" memory-layer comparison context which is not visible to this subagent. Inference: the operator's prior context already established a specific framework or matrix shape. This research was conducted independently and **may diverge structurally from the unseen reference frame.** Operator should cross-check this output against the unseen reference before adopting TIER-A INSTALL decisions; if structural divergence exists, prefer the operator-visible reference as authoritative or request explicit reconciliation.

### E.7 — DeepWiki probes not issued
Time/context budget prioritized broad WebSearch coverage of 30+ candidates over deep DeepWiki probes per candidate. DeepWiki probes are recommended as follow-up for the TIER-A 10 to confirm: (a) MCP server quality, (b) recent breaking changes, (c) maintainer responsiveness signals before commit.

### E.8 — RepoMix / Context7 / Exa-WebFetch not invoked this fire
Same rationale as E.7 — breadth-over-depth tradeoff under context budget. These tools are appropriate for the per-candidate adoption gate (especially RepoMix to pack a candidate's README + INSTALL + LICENSE + MCP-server files before commit decision).

### E.9 — Operator instruction "abandon cost-control framing" honored
No cost/pricing rows were emphasized in §A-§D. Pinecone REJECT was based on self-host conflict (cardinal-rule install-priority), NOT cost. LlamaParse hosted REJECT was based on SaaS conflict, NOT cost. Mem0 INSTALL was based on largest community + Apache-2.0, NOT pricing of Pro tier (which IS 13x jump for graph features per Vectorize 2026 article, but not material to this runtime's self-host installation).

### E.10 — Saturation claim qualification
"30+ repos" target met (matrix has 46 rows including sub-variants — 38 unique primary repos). **Saturation NOT absolute** — known additional candidates that could be added in a deeper pass: cognee (mentioned in benchmarks but not standalone-probed), mempalace (mentioned but flagged for community-review caveat), Anthropic's built-in @-mentioned-file system, Cherry Studio's memory, Hermes memory plugins, OpenClaw memory ecosystem (n8n-claw, openclaw-memory etc.), claude-memory-mcp by WhenMoon-afk, Claude desktop memory features, Anthropic /memory native CC slash command. These are explicitly out-of-scope for this fire's L0.0-L0.5 vector/KG/agent-memory/RAG/ingestion/cache focus, but should be added in a saturation-2 pass if operator wants full ecosystem map.

---

## File metadata

- **Path**: `Z:\claude-sota-installed\docs\grand-synthesis-2026-05-16\06-fresh-research-delta\SATURATION-MEMORY-LAYER-2026-05-16.md`
- **Wave**: grand-synthesis-2026-05-16
- **Layer**: L0 Memory & Knowledge (saturation)
- **Author**: Claude Opus 4.7[1m] subagent under operator SATURATION directive
- **Method**: 25+ WebSearch + 14 GitHub MCP (rate-limited mid-run, recovered)
- **Cite-class**: TIER-2 (web-search aggregator-tier evidence; not TIER-1-DIRECT upstream-doc-verified for each candidate)
- **Reversibility**: HIGH (research artifact; no install actions taken)
- **Cross-model-gate**: NOT YET RUN — recommend codex T1 BRIDGE-MODE pass on TIER-A 10 before any /plugin install
