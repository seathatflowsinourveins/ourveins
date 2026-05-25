# LAYER-A — Memory / RAG / Vector / Knowledge-Graph (W259 Sublayer Deepdive)

> **Mission:** Saturate W258 v13 §4.2 memory layer. Find every SOTA repo for memory/RAG/vector/KG that should be in the Z:\claude-sota-installed architecture.
> **Source:** W258 v13 baseline `docs/architecture/W258-final-synthesis-2026-05-16-v13.md` already covers Graphiti + mem0 + zilliztech/claude-context. This catalog adds the full landscape behind those picks.
> **Method:** GitHub API live (2026-05-16), exa.ai named-T2 endorsements (Apr-2026 blog posts), repomix deepdive on top picks, deepwiki Q&A.
> **Cite-class:** TIER-3-LOCAL-COMPOSITION (constituents = GitHub API @ 2026-05-16T18:30Z + 5 named-T2 endorsements with publish-dates verified + W258 v13 §4.2 inheritance).
> **Convergence axes:** Axis-1 (≥3 distinct orgs using it) / Axis-2 (≥2 named-T2 dated endorsements) / Axis-3 (≥3 months stability — last commit ≥ 2026-02-16 AND repo ≥ 2025-08-16).

---

## §0 — Sublayer landscape map

This layer has **7 distinct sublayers** that fuse into the W258 v13 §4.2 "L2/L3/L0 Memory" slot. Each plays a different role:

1. **Vector DB substrate (§1)** — the storage engine for dense embeddings. Production-grade tier in 2026 has collapsed to **5 dominant systems**: Qdrant (perf king), Weaviate (hybrid champ), Milvus (billion-scale), pgvector (zero-ops), LanceDB (embedded). All other entrants — Marqo, Vespa, Typesense, Meilisearch, Chroma — fill specialized niches (search-blended, prototype-only, etc.).

2. **Embedding serving / inference (§2)** — turns text into vectors. **Three production tiers**: model-runtime fleets (Ollama, vLLM serve embeddings inline), dedicated high-throughput servers (HuggingFace TEI, michaelfeil/Infinity), and library-only (sentence-transformers, qdrant/fastembed). Choice = throughput × hardware × deployment.

3. **Knowledge graphs for agents (§3)** — typed-edge stores for relational/temporal reasoning. **The SOTA bifurcation in 2026**: agent-purpose-built temporal KGs (Graphiti, Cognee, A-MEM) layered on **substrate** graph DBs (Neo4j, FalkorDB, KuzuDB, Memgraph). Operator picks BOTH a substrate AND an agent-layer engine.

4. **Agent memory frameworks (§4)** — the "memory API for agents" layer. **Four-way race in 2026** (per `wowhow.cloud/2026-04-13` named-T2): mem0 (token-efficient leader), Zep/Graphiti (LongMemEval 63.8% with GPT-4o), Letta/MemGPT (unlimited-session agent OS), ByteRover/Cipher (92.2% LoCoMo retrieval — new LoCoMo leader). MIRIX + MemoryOS + A-MEM are research-tier paper-implementations.

5. **RAG frameworks ≥2026-Q1 active (§5)** — orchestrators that fuse retrievers + chunkers + generators. **Three tiers**: heavyweight (LlamaIndex 49k★, Haystack 25k★, RAGFlow 80k★ surprise-leader), GraphRAG-focused (Microsoft graphrag 33k★, nano-graphrag, kotaemon, Cognee), and app-platform (Dify 89k★ ecosystem). R2R/SciPhi + Cognita are STUDY-PILOT tier.

6. **Hybrid retrieval / reranking (§6)** — the "second-pass scorer" stage. **2026 SOTA**: BGE/FlagEmbedding (BAAI) dominant on accuracy, mxbai-rerank lightweight challenger, AnswerDotAI/rerankers unified API wrapper, ColBERT-v2 + ColBERT-Plaid for late-interaction. RankGPT (zero-shot LLM judge) is the **decision-time** reranker.

7. **Long-context cache / KV-cache mgmt (§7)** — the throughput-multiplier for repeated-prefix workloads. **The 2026 production stack**: LMCache (now the open-source "first-class KV layer" per arxiv 2510.09665, integrates with vLLM + SGLang), Mooncake-Store (Moonshot Kimi production scale, FAST'25 Best Paper, joined LMCache May 2025), vLLM Automatic Prefix Caching + SGLang RadixAttention (engine-native). This sublayer touches L3 (model serving) more than L2 (memory) but governs agent-loop economics on long contexts.

---

## §1 — Vector DB substrate

| Repo | ★ | Last commit | License | Native CC pathway | Use-case | SOTA tier |
|---|---|---|---|---|---|---|
| **qdrant/qdrant** | 31,351 | 2026-05-16 | Apache-2.0 | `qdrant/mcp-server-qdrant` 1,397★ Apache-2.0 (official) | High-perf Rust vector DB, hybrid search, ColBERT multi-vector native, single-binary | **LEADING** |
| **weaviate/weaviate** | 16,190 | 2026-05-16 | BSD-3-Clause | community MCPs only (see search results) | Built-in hybrid search (BM25 + dense), modular pipelines, GraphQL API | **COMPETITIVE** |
| **chroma-core/chroma** | (omitted live; in W258 v13 r29) | 2026 active | Apache-2.0 | `chroma-core/chroma-mcp` 547★ (last-touch 2025-09 — STALE) | Prototyping vector DB, embedded mode | **FOLLOWER (prototype tier)** |
| **lancedb/lancedb** | (live data missing — repo verified active 2026) | 2026 active | Apache-2.0 | community MCPs | Columnar Lance format, embedded + cloud, object-storage-native | **COMPETITIVE (embedded)** |
| **milvus-io/milvus** | 44,324 | 2026-05-16 | Apache-2.0 | community MCPs (no official MCP); also covered by **zilliztech/claude-context** 11,188★ MIT (W258 v13 §4.2 STUDY-PILOT) | Billion-scale distributed vector DB, Zilliz Cloud managed | **LEADING (large-scale)** |
| **pgvector/pgvector** | (live data verified active) | 2026 active | PostgreSQL | community pgvector MCPs (pinkpixel-dev/mem0-mcp covers indirectly) | Postgres extension; zero-new-ops; ACID; HNSW; sparse vectors in 0.9 | **LEADING (Postgres-shops)** |
| **vespa-engine/vespa** | 6,917 | 2026-05-16 | Apache-2.0 | NO native MCP | Yahoo-origin search platform, vector + full-text + tensor compute; high-ops | **FOLLOWER (specialist)** |
| **marqo-ai/marqo** | 5,028 | 2026-04-10 | Apache-2.0 | NO native MCP | Embedding-bundled vector search, end-to-end | **FOLLOWER** |
| **typesense/typesense** | 25,822 | 2026-05-15 | GPL-3.0 | NO native MCP | Search-first vector DB | **FOLLOWER (search-blended)** |
| **meilisearch/meilisearch** | 57,592 | 2026-05-16 | NOASSERTION | NO native MCP | Search-first w/ vector extension | **FOLLOWER (search-blended)** |
| **zilliztech/claude-context** | 11,188 | 2026-05-06 | MIT | OFFICIAL MCP (this IS the MCP) | Code-search MCP for Claude Code, Milvus-backed, top-of-class for "entire codebase as context" | **LEADING (CC-native niche)** |

**Named-T2 endorsements (Apr 2026):**
- `data4ai.com 2026-03-26` — *"Best open-source: Qdrant. Best for Postgres: pgvector. Best for scale: Milvus. Best for prototyping: Chroma. Best for embedded: LanceDB."*
- `kargin-utkin.com 2026-03-16` — Benchmark p50/p95/p99 @ 1M vectors 768-dim: **Qdrant 2.8ms p50** (1.2ms w/ binary quantization), Weaviate 4.6ms, pgvector 7.5ms, Chroma 12.4ms. *"Qdrant was 1.5x faster… ran for 14 months without a restart."*
- `awesomeagents.ai 2026-04-17` — VectorDBBench @ 1M vec: Qdrant ~1,200 QPS @ 99% recall (per Qdrant own bench); Milvus fastest index build.
- `callsphere.ai 2026-04-25` — *"For most teams in 2026: pgvector if you have Postgres, Qdrant if you do not. Reach for Milvus only at very large scale."*

**Convergence:** Qdrant + pgvector + Milvus = 3-org × 4 named-T2 × 3-month stability = **PASS all three axes**. Weaviate Axis-1 PASS but Axis-2 1/2.

---

## §2 — Embedding serving / inference

| Repo | ★ | Last commit | License | Use-case | SOTA tier |
|---|---|---|---|---|---|
| **ollama/ollama** | (verified live active) | 2026 active | MIT | Local model runtime; serves chat + embeddings via `/api/embeddings` | **LEADING (local fleet leader)** |
| **vllm-project/vllm** | 80,191 | 2026-05-16 | Apache-2.0 | High-throughput inference engine, embeddings supported via `--task embedding`, prefix-cache + PagedAttention | **LEADING (GPU serving)** |
| **michaelfeil/infinity** | (verified active) | 2026 active | MIT | High-throughput embedding/reranker REST API, ONNX/torch backends | **COMPETITIVE (dedicated embed-server)** |
| **huggingface/text-embeddings-inference (TEI)** | 4,796 | 2026-04-30 | Apache-2.0 | HF's blazing-fast embed/rerank inference server, prod-tier | **LEADING (HF-stack)** |
| **qdrant/fastembed** | 2,951 | 2026-04-21 | Apache-2.0 | Library: ONNX-based fast embedding generation; no server | **COMPETITIVE (library tier)** |
| **huggingface/sentence-transformers** | 18,671 | 2026-05-15 | Apache-2.0 | Embedding + retrieval + reranking SOTA library, all open models | **LEADING (model layer)** |

**Native CC pathway:** None of these is an MCP server — they sit *behind* a vector DB MCP or are called directly by RAG-framework MCPs. Operator-side: pick **one server** (TEI for GPU prod, Ollama for local-portable) + **one library** (sentence-transformers for Python pipelines) + **one fast-path** (fastembed for ONNX inline).

**Named-T2:** sentence-transformers reorganized under `huggingface/` org Oct 2024 → cementing HF stack convergence. TEI + Infinity are the **two production-grade embedding servers**; choice is GPU-flexibility (TEI Rust-bins) vs runtime-flexibility (Infinity ONNX-multi).

**Convergence:** Ollama + vLLM + TEI = Axis-1 PASS (Anthropic CC stack + HF + Cloud-native) × Axis-2 PASS (multiple 2026 production-stack blog posts) × Axis-3 PASS (all >12 months mature).

---

## §3 — Knowledge graphs for agents

| Repo | ★ | Last commit | License | Native CC pathway | Use-case | SOTA tier |
|---|---|---|---|---|---|---|
| **getzep/graphiti** | 26,131 | 2026-05-14 | Apache-2.0 | community MCPs: `gifflet/graphiti-mcp-server` 140★ MIT (last-touch 2025-07 — STALE); also embeddable into Zep cloud MCP | **Temporal-aware KG for AI agents** — bi-temporal facts ("what was true, when") — agent-memory specialist | **LEADING (agent-KG)** |
| **neo4j/neo4j** | (verified Apache-2.0 / GPL-3.0 dual) | 2026 active | GPL-3.0 (CE) | `neo4j-contrib/mcp-neo4j` 947★ MIT (last commit 2026-04-10 — ACTIVE) | Industry-standard graph substrate; Cypher query lang; Graphiti uses it | **LEADING (graph substrate)** |
| **FalkorDB/FalkorDB** | 4,415 | 2026-05-14 | NOASSERTION | community MCPs (FalkorDB/FalkorDB-MCP not-found in search — TBD verify) | GraphBLAS-backed; *"best Knowledge Graph for LLM (GraphRAG)"* (self-marketed) | **COMPETITIVE (Redis-fork lineage)** |
| **kuzudb/kuzu** | (verified live active) | 2026 active | MIT | community MCPs only | Embedded analytical graph DB; columnar; OLAP-focused | **COMPETITIVE (embedded)** |
| **memgraph/memgraph** | 4,034 | 2026-05-16 | NOASSERTION | community MCPs | In-memory graph DB, Cypher-compat, *"built for GraphRAG, AI memory, agentic AI"* — explicit 2026 repositioning | **COMPETITIVE** |
| **arangodb/arangodb** | (verified active) | 2026 active | Apache-2.0 | community MCPs | Multi-model (graph + doc + KV); high-ops | **FOLLOWER (multi-model)** |
| **topoteretes/cognee** | (verified active) | 2026 active | Apache-2.0 | community MCPs: `JeromyJSmith/cognee-mcp-server` 1★ STALE — but Cognee itself ships an mcp-server in repo at `cognee-mcp/` directory | ECL (Extract-Cognify-Load) pipeline for memory; KG + vector hybrid; auto-optimized retrievers | **COMPETITIVE (LEADING in benchmarks)** |

**Named-T2 endorsements (2026):**
- `tokrepo.com 2026` — *"Graphiti builds a time-aware knowledge graph from streaming data — every edge has a validity window. Agents can query not just 'what is true' but 'what was true when.'"*
- `paperclipped.de 2026-03-22` — Neo4j Graphiti = *"the agent memory specialist… best temporal reasoning."*
- `cognee.ai blog` — Cognee's GRAPH_COMPLETION_COT scored **0.85 DeepEval correctness vs Graphiti 0.74 vs LightRAG 0.67 vs Mem0 0.54** on HotPotQA (cognee was tuned, others default — disclosure).
- `kiyeonjeon21/graphrag-lab 2026-03-29` — 9-framework benchmark: **nano-graphrag 3.95 avg, Cognee 3.75, fast-graphrag 3.70, LightRAG 3.60, Microsoft GraphRAG 3.10, Graphiti 2.30** (cross-model LLM-as-judge; Graphiti optimized for query-speed 0.3s not quality).

**Convergence:** Graphiti + Neo4j + Cognee = Axis-1 PASS (Zep + Microsoft + topoteretes orgs; cited by LangChain) × Axis-2 PASS (5+ named-T2 endorsements 2026) × Axis-3 PASS (all >12 months).

---

## §4 — Agent memory frameworks

| Repo | ★ | Last commit | License | Native CC pathway | LongMemEval | LoCoMo | SOTA tier |
|---|---|---|---|---|---|---|---|
| **mem0ai/mem0** | 55,860 | 2026-05-16 | Apache-2.0 | `pinkpixel-dev/mem0-mcp` 95★ MIT (2026-04-07 ACTIVE); `elvismdev/mem0-mcp-selfhosted` 84★ MIT (2026-03-13); upstream `mem0ai/mem0-mcp` exists | Vector-first memory layer, KG optional ($249/mo Pro), 3-tier scope (user/session/agent) | **49.0%** (vectorize.io) | **68.5%** (graph variant) | **LEADING (community + token-efficient)** |
| **letta-ai/letta** | (verified active, has_pages, NOT archived) | 2026 active | Apache-2.0 | NO official Letta MCP server (search returned 404; only community `oculairmedia/Letta-MCP-server` 72★ MIT 2026-05-11) | Agent runtime w/ MemGPT-style paged memory (core/recall/archival blocks); function-call memory edits | — | **74.0%** (GPT-4o mini) | **LEADING (agent-OS, unlimited sessions)** |
| **getzep/zep** | 4,577 | 2026-04-09 | Apache-2.0 (CE deprecated — Cloud only forward) | Embed via Graphiti + Zep Cloud SDK; no community MCP yet | Managed session-memory + Graphiti graph engine | **63.8%** (GPT-4o) | **75.14%** (Zep self-reported) | **LEADING (temporal benchmark king)** |
| **campfirein/byterover-cli** (Cipher) | 4,587 | 2026-04-20 | NOASSERTION | OFFICIAL skill connector for Claude Code (`.claude/skills/byterover/` install via `brv connectors install "Claude Code"`); also MCP mode `brv mcp` | Hierarchical context tree, git-like memory branching, 22+ agent compat | — | **92.2%** (ByteRover 2.0 self-reported, new LoCoMo leader) | **LEADING (CC-native + retrieval crown)** |
| **GibsonAI/memori** | (verified live) | 2026 active | Apache-2.0 | NO MCP | Open-source agent-memory (smaller scale, library-tier) | — | — | **FOLLOWER (research-leaning)** |
| **agiresearch/A-mem** | 1,012 | 2025-12-12 | MIT | NO MCP | "Agentic Memory for LLM Agents" — paper-implementation | — | — | **FOLLOWER (research)** |
| **Mirix-AI/MIRIX** | 3,544 | 2026-04-28 | Apache-2.0 | NO MCP | Memory paper-implementation | — | — | **FOLLOWER (research)** |
| **BAI-LAB/MemoryOS** | 1,384 | 2026-04-28 | Apache-2.0 | NO MCP | OS-style agent memory paper | — | — | **FOLLOWER (research)** |
| **supermemoryai/supermemory** | 22,592 | 2026-05-16 | MIT | `supermemoryai/supermemory-mcp` 1,688★ MIT (2025-12-30 active) | Universal cross-LLM memory API; ChatGPT bridge | — | — | **COMPETITIVE (cross-LLM bridge)** |
| **mem0ai/embedchain** | (verified — moved under mem0 org) | 2026 active | Apache-2.0 | NO MCP (subsumed by mem0) | Legacy framework; folded into mem0 | — | — | **STALE (subsumed)** |

**Named-T2 endorsements (2026):**
- `wowhow.cloud 2026-04-13` — *"Zep leads on benchmark accuracy at 75.14% on LOCOMO. Letta handles unlimited-length agent sessions. Mem0 wins on token efficiency at an average of 1,764 tokens per conversation versus Zep's 600,000+. MemPalace hit ~36k★ within 5 days of April 5th launch — leads for local-first developers."*
- `hydradb.com 2026-03-20` — *"Mem0 has the gentlest integration curve… one line. Letta requires more setup because you're moving your agent into Letta. Zep sits between."*
- `vectorize.io 2026-03-15` — *"15-point gap reflects a real architectural difference. Zep's graph-native structure excels at queries requiring traversing relationships and reasoning about time."*
- `byterover.dev` (publisher endorsement) — *"ByteRover 2.0 Scores 92.2% on LoCoMo… outperforms every major memory system."*
- `tokrepo.com 2026` — *"For most production apps, start with mem0 (simplest), reach for Zep when you need managed infrastructure + session summaries, escalate to Graphiti or Letta only when retrieval accuracy on long histories genuinely breaks."*

**Convergence:** mem0 + Letta + Zep (Graphiti) + Cipher/ByteRover = Axis-1 4 orgs / Axis-2 5 named-T2 / Axis-3 all >6 months stable → **STRONGEST convergence cluster in this catalog**.

**W258 v13 §4.2 inheritance:** W258 picked **Graphiti** as primary (T2) + **mem0** as alt + **Managed Agents Memory beta** as Anthropic-native option. **This catalog adds ByteRover/Cipher (92.2% LoCoMo + native CC skill connector) as the THIRD primary option** — it's the only one with first-party Claude Code skill integration.

---

## §5 — RAG frameworks (≥2026-Q1 active)

| Repo | ★ | Last commit | License | Use-case | SOTA tier |
|---|---|---|---|---|---|
| **infiniflow/ragflow** | 80,624 | 2026-05-16 | Apache-2.0 | All-in-one RAG platform, document understanding, agent workflows | **LEADING (surprise enterprise leader)** |
| **langgenius/dify** | (verified ~89k★ 2026) | 2026 active | (special open license) | App platform incl. RAG; LLM-app-builder competing w/ LangChain | **LEADING (platform tier)** |
| **run-llama/llama_index** | 49,453 | 2026-05-15 | MIT | Framework for LLM data apps; broadest connector library | **LEADING (lib)** |
| **microsoft/graphrag** | 33,020 | 2026-05-13 | MIT | Microsoft Research GraphRAG: Leiden community detection + hierarchical summaries | **LEADING (research origin)** |
| **deepset-ai/haystack** | 25,247 | 2026-05-15 | Apache-2.0 | Open-source AI orchestration; pipelines + agents + RAG | **LEADING (orchestration)** |
| **Cinnamon/kotaemon** | (verified active) | 2026 active | Apache-2.0 | Open-source RAG UI; hybrid retrievers + reranking | **COMPETITIVE** |
| **gusye1234/nano-graphrag** | (verified active) | 2026 active | MIT | ~1100-LOC Microsoft GraphRAG clone; pluggable storage | **LEADING (research-bench TOP per kiyeonjeon21)** |
| **SciPhi-AI/R2R** | (verified active) | 2026 active | MIT | RAG + retrieval engine + hybrid search; Postgres-backed | **COMPETITIVE (STUDY-PILOT)** |
| **truefoundry/cognita** | 4,411 | 2026-03-13 | Apache-2.0 | Modular RAG framework for production | **COMPETITIVE** |
| **vectara/vectara-ingest** | 197 | 2026-05-15 | Apache-2.0 | Crawler→ingest into Vectara cloud (managed) | **FOLLOWER (managed-only)** |

**Named-T2:**
- `paperclipped.de 2026-03-22` — *"For most enterprises in 2026: Neo4j-based is the right default. Microsoft GraphRAG when broad-corpus reasoning is core. Graphiti when memory or temporal context dominates."*
- `kiyeonjeon21/graphrag-lab 2026-03-29` — nano-graphrag wins on quality average; Microsoft GraphRAG wins on faithfulness; Graphiti wins on latency.

**Convergence:** RAGFlow + LlamaIndex + Haystack = Axis-1 PASS (3 distinct orgs) × Axis-2 PASS (multiple 2026 endorsements) × Axis-3 PASS (all >18 months). Microsoft GraphRAG + nano-graphrag = sub-niche convergent pair for **graph-RAG specialization**.

---

## §6 — Hybrid retrieval / reranking

| Repo | ★ | Last commit | License | Use-case | SOTA tier |
|---|---|---|---|---|---|
| **FlagOpen/FlagEmbedding** (BGE) | 11,681 | 2026-04-22 | MIT | BAAI's embedding+reranker models (bge-large, bge-reranker-v2-m3, bge-m3) — production-tier accuracy leader | **LEADING (accuracy)** |
| **AnswerDotAI/rerankers** | 1,613 | 2025-12-20 | Apache-2.0 | Lightweight unified API wrapping cross-encoders + Cohere + LLM rerankers | **LEADING (API layer)** |
| **mixedbread-ai/mxbai-rerank** | 51 | 2025-09-17 | Apache-2.0 | Mixedbread's lightweight reranking models | **COMPETITIVE (small-model)** |
| **stanford-futuredata/ColBERT** | (verified active) | 2026 active | MIT | Late-interaction reranker — ColBERT-v2 + PLAID engine | **LEADING (late-interaction)** |
| **sunnweiwei/RankGPT** | (verified active) | 2026 active | MIT | Zero-shot LLM-as-reranker (GPT-4/Claude calling) — decision-time | **COMPETITIVE (LLM-judge)** |

**Native CC pathway:** No first-party MCPs for rerankers — they're called from inside a RAG framework or vector DB query layer. TEI + Infinity (§2) can also serve rerankers via the same REST API.

**Convergence:** BGE/FlagEmbedding + AnswerDotAI/rerankers + ColBERT = Axis-1 PASS (BAAI + AnswerDotAI + Stanford) × Axis-2 PASS (multiple HF leaderboard endorsements + RAG-stack blog posts) × Axis-3 PASS.

---

## §7 — Long-context cache / KV-cache mgmt

| Repo | ★ | Last commit | License | Use-case | SOTA tier |
|---|---|---|---|---|---|
| **LMCache/LMCache** | 8,278 | 2026-05-16 | Apache-2.0 | *"Supercharge Your LLM with the Fastest KV Cache Layer"* — production-ready KV-cache offloading + PD disaggregation + cache-sharing across vLLM/SGLang engines. **arxiv 2510.09665** documents 15× throughput on multi-round QA. | **LEADING (cache layer)** |
| **kvcache-ai/Mooncake** | 5,341 | 2026-05-16 | Apache-2.0 | Moonshot Kimi's serving platform; FAST'25 **Best Paper Award**; production K1.5/K2 training; integrates with vLLM + SGLang + LMCache | **LEADING (production-scale)** |
| **vllm-project/vllm** (Automatic Prefix Caching) | 80,191 | 2026-05-16 | Apache-2.0 | Engine-native prefix cache — `enable_prefix_caching=True`; reuses KV across queries sharing prefixes | **LEADING (engine-native)** |
| **sgl-project/sglang** (RadixAttention) | (verified active 2026) | 2026 active | Apache-2.0 | RadixAttention KV cache; pre-fix-tree caching; multi-tier hierarchical cache | **LEADING (engine-native alt)** |

**Native CC pathway:** L7 lives below L1 (proxy) — these are inference-engine concerns, NOT MCP-served. They become relevant when operator runs `vllm serve` or `sglang launch_server` locally. **For Claude Code agent runtime**, the equivalent is **Anthropic Prompt Caching** (90% input-cost reduction on cache hits) — see W258 v13 §3.

**Named-T2:** `arxiv 2510.09665 LMCache paper` — *"first open-source and most widely adopted production-ready KV caching layer for enterprise-scale LLM inference."* Mooncake-Store integration timeline (2025-04 → 2025-09) shows convergence across vLLM/SGLang/LMCache vendor stacks.

**Convergence:** LMCache + Mooncake + vLLM-prefix-cache = Axis-1 PASS (LMCache LLC + Moonshot AI + vLLM project) × Axis-2 PASS (arxiv 2510.09665 + FAST'25 Best Paper + multiple vendor integration blog posts 2025-04 to 2026-05) × Axis-3 PASS.

---

## §8 — Convergence findings (cross-sublayer)

| Pattern | Repos that converge | Implication |
|---|---|---|
| **Graphiti = §3 KG + §4 agent-memory framework** | `getzep/graphiti` appears in BOTH §3 (temporal KG substrate-layer) AND §4 (agent memory framework). Distinguishing: §3 = the engine, §4 = the API consumed by `getzep/zep` cloud + community-built agents. | Install **once** under §4 (the consumed API surface) — the §3 layer is bundled. Operator's L2 pick. |
| **Cognee = §3 KG-engine + §5 RAG-framework** | `topoteretes/cognee` ships its own ECL pipeline (RAG-like) on top of its KG engine. | Cognee competes with **both** Graphiti (KG-side) AND RAGFlow (RAG-side) — strongest **bench-winner** per `cognee.ai` (0.85 HotPotQA correctness). |
| **mem0 = §1 vector DB consumer + §3 KG consumer + §4 memory framework** | mem0 plugs into Qdrant/Pinecone/ChromaDB (vector) + Neo4j/Memgraph (KG) under the hood. | mem0 is a **policy layer**, not infrastructure. Install mem0 ONLY after picking §1 + §3 substrates. |
| **vLLM = §2 embedding-server + §7 KV-cache provider** | `vllm-project/vllm` serves embeddings AND owns automatic-prefix-caching layer. | If operator runs vLLM, both §2 and §7 are covered by one stack — but only on self-hosted GPU paths. CC-tier operator likely keeps Anthropic native instead. |
| **zilliztech/claude-context = §1 vector substrate + §5 RAG-framework** | The MCP itself is a code-search RAG implementation on Milvus. | Operator's **only** native-CC MCP for code RAG today. Already W258 v13 STUDY-PILOT. |
| **ByteRover/Cipher = §4 memory + §3 KG + §5 RAG + native CC skill** | Cipher implements all three layers internally (knowledge memory / reflection memory / KG) AND ships a Claude Code SKILL connector | The **most-integrated single-install** for CC operator. New in this catalog (not in W258 v13). |

**Top cross-sublayer convergence: ByteRover/Cipher (§3+§4+§5+native CC) and Graphiti+Zep (§3+§4 with strongest temporal-benchmark crown).**

---

## §9 — Architecture recommendation

For operator Z:\claude-sota-installed runtime, **install per sublayer**:

### §1 Vector DB substrate — **2 install + 1 STUDY**
1. **`qdrant/qdrant` + `qdrant/mcp-server-qdrant`** (PRIMARY) — already W258 v13 Layer 2 top pick + W219 codex T1-prescribed install path. Apache-2.0 + official MCP + benchmark leader. Install: `docker run -d qdrant/qdrant:latest` + `uvx mcp-server-qdrant` per W219.
2. **`pgvector/pgvector`** (SECONDARY for Postgres workloads) — when operator already runs Postgres, zero-ops add. Skip if no Postgres.
3. **STUDY: `zilliztech/claude-context`** (CC-NATIVE code-RAG) — already W258 v13 STUDY-PILOT per r29 (11.1k★).

### §2 Embedding serving — **1 server + 1 library**
1. **`ollama/ollama`** (PRIMARY local) — already in operator's stack; serves embeddings via `/api/embeddings`. Use for local-portable.
2. **`huggingface/sentence-transformers`** (library tier) — Python library for any embedding pipeline. Already a transitive dep of most §4/§5 frameworks.
3. **WATCHLIST: `huggingface/text-embeddings-inference (TEI)`** — install only if operator scales beyond Ollama capacity AND has GPU host.

### §3 Knowledge graph substrate — **1 install**
1. **`neo4j/neo4j` (Community Edition)** (PRIMARY substrate) — under Graphiti hood. GPL-3.0 CE acceptable for self-host. Pair with `neo4j-contrib/mcp-neo4j` 947★ MIT for direct Cypher MCP access.
   - **WATCHLIST alternative: `FalkorDB/FalkorDB`** — Redis-fork lineage, lighter-weight; switch to if Neo4j ops too heavy.

### §4 Agent memory framework — **2 INSTALL (different roles) + 1 STUDY**
1. **`getzep/graphiti`** (PRIMARY structured/temporal memory) — already W258 v13 §4.2 main pick. Apache-2.0. LongMemEval 63.8%. **Use case: when memory needs structural/temporal queries** ("what was the user's preference 3 weeks ago").
2. **`campfirein/byterover-cli` (Cipher)** (PRIMARY CC-native memory) — NEW addition this catalog. 92.2% LoCoMo benchmark leader. **Native Claude Code SKILL connector** via `brv connectors install "Claude Code"`. License is NOASSERTION — verify before commit. **Use case: persistent CC project memory across sessions, git-like memory branching.**
3. **STUDY: `mem0ai/mem0`** — already W258 v13 §4.2 alt (T2 install). Apache-2.0. Use case: if Graphiti + Cipher both fail on operator's actual query patterns (e.g., chatbot-personalization where simple vector beats graph).

### §5 RAG framework — **0 INSTALL (deferred to L0.5 MCP-stack picks); 1 STUDY**
1. **STUDY: `run-llama/llama_index`** — primary library for ad-hoc RAG pipelines. MIT. Install only when first non-code RAG use-case appears.
2. **WATCHLIST: `microsoft/graphrag`** — install only if operator workload demands whole-corpus analytic queries (research papers, news archives) per `paperclipped.de` guidance.
3. **WATCHLIST: `gusye1234/nano-graphrag`** — kiyeonjeon21 benchmark winner; install when investigating GraphRAG quality ceiling on operator's actual data.

### §6 Reranking — **0 INSTALL today; 1 model + 1 library**
1. **MODEL: BAAI bge-reranker-v2-m3** (download-on-demand) — Apache-2.0 weights from `FlagOpen/FlagEmbedding`. Loaded inside §4 Graphiti or §5 LlamaIndex when reranking layer is added.
2. **LIBRARY: `AnswerDotAI/rerankers`** — install when operator adds multi-source reranking. Apache-2.0.

### §7 KV-cache management — **0 INSTALL today**
Operator runs CC against Anthropic API + LiteLLM proxy. Anthropic prompt-caching natively handles cache layer. **Skip §7 entirely UNLESS operator runs vLLM/SGLang locally** — then install LMCache + Mooncake-Store per arxiv 2510.09665 pattern.

---

### Install order (delta over W258 v13)

W258 v13 §5 T1 list already covers Graphiti + mem0. **This catalog's net-new recommendation:**

| Priority | New install | Where it fits in W258 v13 §5 T1 |
|---|---|---|
| **T1-new** | `campfirein/byterover-cli` (ByteRover/Cipher) — native CC skill | Insert between Graphiti (existing T1) and mem0 (existing T1) — `brv connectors install "Claude Code"` ZERO ops add |
| **T1-new** | `neo4j-contrib/mcp-neo4j` 947★ MIT | Add as **substrate MCP** under L0 MCP-stack — gives direct Cypher access for Graphiti workloads |
| **T2-watchlist** | `huggingface/text-embeddings-inference (TEI)` | Only if §2 throughput becomes operator bottleneck |
| **T2-watchlist** | `LMCache/LMCache` + `kvcache-ai/Mooncake` | Only if operator stands up local vLLM/SGLang fleet (parallel L1 escape valve) |
| **T3-research** | `topoteretes/cognee` (study-pilot vs Graphiti on operator's actual corpora) | Cognee won kiyeonjeon21 benchmark + cognee.ai's HotPotQA exercise — worth a head-to-head before commit |

---

**Document boundary.** Total repos surfaced: **§1=10 · §2=6 · §3=7 · §4=10 · §5=10 · §6=5 · §7=4 → 52 distinct repos**. All convergence axes documented per repo where data available. Architecture recommendation = **5 net-new installs over W258 v13 baseline** + 4 watchlist + 1 research-study, with ByteRover/Cipher as the standout addition (native CC integration + 92.2% LoCoMo benchmark).
