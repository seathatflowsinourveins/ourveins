# DEEP-SATURATION L0.0 — Vector Database Exhaustive Coverage (2026-05-16)

> **Fork**: DEEP-SATURATION pass on L0.0 (Vector Database layer) per operator feedback "vector DB never had its own deep-sat; only covered briefly in memory-saturation." Goal: ≥40 rows with per-row D1-D8 scoring, native-CC-pathway tier, and sub-category taxonomy (6 sub-types).
>
> **Method**: 10 GraphQL-equivalent probes + 25 explicit name-search candidates from operator brief + cross-reference with prior SATURATION-MEMORY-LAYER (10 L0.0 rows), DEEP-SAT-L02-MEMORY-MCP, GRAPHQL-NATIVE-CC-PATHWAY-AUDIT. Probes augmented with 10 WebSearch queries (Cardinal-rule-6 freshness: 2026-only sources where possible; benchmark verification at MarkTechPost 2026-05-10, CallSphere Blog 2026, Timescale/Tigerdata 11.4x claim).
>
> **Mid-run state**: GitHub MCP rate-limit hit during early discovery probes per parallel L0.2 audit; star counts cross-validated against multiple 2026 web sources (firecrawl.dev, datacamp, leanopstech, marktechpost, encore.dev). Where two sources diverge >20%, source-of-record noted in row.
>
> **Coverage delta vs prior wave**: prior SATURATION-MEMORY-LAYER covered 11 L0.0 rows (Qdrant/Chroma/Weaviate/Milvus/Pinecone/Vespa/Marqo/Typesense/LanceDB/pgvector-stack/Redis). This DEEP-SAT extends to **44 rows** with 6 sub-categories, MCP-wrapped tier added, plus 2026 new entrants (turbopuffer/Tencent-Vearch/VectorChord/Valkey-Search/Epsilla/Deeplake-GPU/Turso-DiskANN).
>
> **Scoring rubric** (D1-D8 ×10 each = max 80):
> - **D1 Stars/community** (size+velocity: ≥40k=10; 10-30k=8; 5-10k=6; 2-5k=4; <2k=2)
> - **D2 License-fit** (MIT/Apache-2.0/BSD=10; PostgreSQL-license=9; BSL/SSPL/AGPL-with-grant=5; AGPL=4; proprietary=1)
> - **D3 Native-CC-pathway** (T1-official-vendor-MCP=10; T2-community-CC-plugin=8; T3-community-MCP=6; T4-skill-only=4; T5-no-direct=2)
> - **D4 Maintenance freshness** (last commit ≤30d=10; ≤90d=7; ≤180d=4; ≥1y=1; archived=0)
> - **D5 Benchmark performance** (top-tier 99% recall @ 100M+ vec=10; top-quartile=8; mid-pack=5; unverified=2)
> - **D6 Operational cost** (single-binary/embedded=10; docker-self-host=7; multi-service=5; cloud-only=2)
> - **D7 Filtered+hybrid search** (in-graph filtering + BM25+vector RRF native=10; filter + vector=7; vector-only=4)
> - **D8 Sub-category fitness** (purpose-built for sub-class=10; adapted=7; general-purpose=5)
>
> **Sub-categories**: (1) in-memory-lib · (2) embedded-DB · (3) standalone-server · (4) postgres-extension · (5) cloud-managed · (6) MCP-wrapped
>
> **Verdict classes**: INSTALL · INSTALL-NICHE · STUDY-PILOT · DUAL-FIT · REJECT-LICENSE · REJECT-ARCHIVED · TRANSITIVE-INSTALL · REJECT-NICHE

---

## §A — EXHAUSTIVE Vector DB matrix (44 rows × 9 columns)

| # | repo | ★ (2026-05-16) | license | last-commit | sub-category | native-CC-pathway | D1-D8 sum/80 | verdict |
|---|---|---|---|---|---|---|---|---|
| **— STANDALONE-SERVER (TIER-1 INCUMBENTS) —** | | | | | | | | |
| 1 | qdrant/qdrant | 31.3k | Apache-2.0 | 2026-05-16 | (3) standalone-server | T1 — official `qdrant/mcp-server-qdrant` (1.4k★, Apache-2.0) | 10+10+10+10+8+7+10+10=**75/80** | **INSTALL** — INCUMBENT; Rust core; scalar/binary quant; best-in-class filtered search 2-3x faster post-search; $50M Series-B March 2026 |
| 2 | chroma-core/chroma | 28.0k | Apache-2.0 | 2026-05-15 | (2) embedded-DB + (3) standalone | T1 — official `chroma-core/chroma-mcp` (547★, Apache-2.0; 12-tool DB-mgmt suite) | 8+10+10+10+7+8+8+10=**71/80** | **INSTALL** — highest CC-native fitness; Rust core; dual embed+server; ⚠️ CVE-class concerns (SQL-injection-2026-04 unpatched + 7mo dormancy on MCP side per ChatForest audit) |
| 3 | milvus-io/milvus | 44.3k | Apache-2.0 | 2026-05-16 | (3) standalone-server (distributed) | T1 — official Milvus-MCP via Apify + Zilliz Pymilvus wrappers (14 MCP tools — most-complete breadth) | 10+10+10+10+10+5+9+8=**72/80** | **STUDY-PILOT** — LARGEST ★; LF AI Foundation graduated; ⚠️ CVE-2026-26190 → update to 2.5.27+/2.6.10+; over-spec for solo-dev CC unless billions-of-vec scale planned |
| 4 | weaviate/weaviate | 16.2k | BSD-3-Clause | 2026-05-16 | (3) standalone-server | T3 — community MCP via Verba RAG; no first-party MCP-server-ready (per ChatForest "not ready for real use") | 8+10+6+10+7+5+10+8=**64/80** | **STUDY-PILOT** — $50M funded; 2k+ prod deploys; hybrid (vec+BM25+filter) Go core; free vectorizers save $50-200/mo embed costs |
| 5 | vespa-engine/vespa | 6.9k | Apache-2.0 | 2026-05-16 | (3) standalone-server | T5 — Java/C++ enterprise; no first-class MCP | 6+10+2+10+10+5+10+10=**63/80** | **REJECT-NICHE for solo-dev CC** — operational complexity exceeds CC fit; SOTA enterprise (Yahoo-origin, Spotify, Wix); tensors-not-just-vectors |
| 6 | marqo-ai/marqo | 5.0k | Apache-2.0 | 2026-05-15 | (3) standalone-server (multimodal-specialty) | T3 — community MCPs | 6+10+6+10+5+5+7+8=**57/80** | **REJECT-NICHE for L0** — vertical ecommerce-search (FashionCLIP/CLIP-finetuned); not horizontal memory layer |
| 7 | typesense/typesense | 25.8k | GPL-3.0 | 2026-05-16 | (3) standalone-server (text+vector hybrid) | T3 — community wrappers | 8+5+6+10+5+7+10+7=**58/80** | **STUDY-PILOT** — FTS-strong typo-tolerant C++; vector added v0.25; ⚠️ GPL-3.0 may bind embeds |
| 8 | vearch/vearch | 2.1k | Apache-2.0 | 2026-04 | (3) standalone-server (distributed Go) | T5 — no first-party MCP | 4+10+2+7+5+5+8+8=**49/80** | **STUDY-NICHE** — Tencent/JD-backed distributed Chinese-ecosystem; secondary to Milvus |
| 9 | epsilla-cloud/vectordb | 1.0k | (verify — likely Apache-2.0 per YC launch) | 2026 | (3) standalone-server (C++ graph) | T5 — no MCP | 2+10+2+7+8+7+8+8=**52/80** | **STUDY-NICHE** — YC-backed; 10x HNSW @ 99.9% recall claim; small community vs Qdrant |
| 10 | activeloopai/deeplake | 8.5k | MPL-2.0 | 2026 (active) | (3) standalone "GPU-database-for-agentic-era" | T5 — proprietary tooling | 6+8+2+10+5+5+8+8=**52/80** | **STUDY-NICHE** — GPU-native; ML-data-lake heritage; verify "agentic-era" claim per 2026 repositioning |
| **— STANDALONE (CLOUD-MANAGED) —** | | | | | | | | |
| 11 | pinecone-io/pinecone (client SDKs) | client repos 440 py + 3k examples | proprietary core; client SDKs Apache-2.0 | 2026-05-08 | (5) cloud-managed | T3 — client SDK supports MCP via wrappers (no first-party MCP server) | 6+1+6+10+8+2+10+5=**48/80** | **REJECT for installed-runtime L0** — closed core violates cardinal-rule-5 self-host install-priority; KEEP-NOTE for production cloud-tier |
| 12 | turbopuffer (proprietary, no public repo) | n/a | proprietary | active 2026 | (5) cloud-managed (object-storage-native) | T5 — no first-party MCP (Vectorize integration possible) | 2+1+2+10+9+10+8+7=**49/80** | **STUDY-PILOT for cloud tier** — Cursor/Notion/Linear prod usage; $10/mo @ 1.5k-dim 1M reads = 10-23x cheaper/TB; sub-10ms p50 warm; ⚠️ closed core same as Pinecone |
| 13 | upstash/vector | n/a (closed core; SDK open) | proprietary core | 2026 active | (5) cloud-managed (serverless KV+vector) | T2 — Upstash MCP server (simplified CLI install for Claude per Upstash blog 2026) | 4+5+6+10+5+2+7+5=**44/80** | **STUDY-PILOT** — serverless billing model; CC-MCP one-liner install attractive for prototyping; vendor-lock risk |
| 14 | zilliz cloud (Milvus SaaS) | n/a (commercial layer over Milvus) | proprietary cloud; Milvus open | 2026 active | (5) cloud-managed | T3 — Zilliz MCP via Milvus wrappers | 4+1+6+10+10+2+9+8=**50/80** | **STUDY** — SaaS layer; Milvus = engine of record; useful for managed-prod |
| **— POSTGRES-EXTENSION —** | | | | | | | | |
| 15 | pgvector/pgvector | 21.3k | PostgreSQL-license | 2026-05-16 | (4) postgres-extension | T3 — community postgres-mcp + pg-vector wrappers; community Postgres-MCP servers | 8+9+6+10+8+7+8+10=**66/80** | **INSTALL** — de-facto Postgres standard; v0.9 (Q1 2026) IVFFlat+sparse; tiny ops surface if PG present |
| 16 | timescale/pgvectorscale | ~1.5k | Apache-2.0 | 2026-05 | (4) postgres-extension | T3 — pairs with postgres-mcp | 4+10+6+10+10+7+8+10=**65/80** | **INSTALL** — SOTA Q1 2026 perf: 471 QPS@99% recall on 50M vec = **11.4x Qdrant throughput** (verified §C); StreamingDiskANN; SBQ (Statistical Binary Quant); 28ms P95 |
| 17 | tensorchord/VectorChord | ~1.8k | AGPL-3.0 / Elastic-License-v2 dual | 2026-05 | (4) postgres-extension | T3 — pairs with postgres-mcp | 4+5+6+10+10+7+8+10=**60/80** | **INSTALL-NICHE** — successor to pgvecto.rs; 100M-vec index in <20min vs pgvector 50+hrs; 3x query @ same recall; ⚠️ AGPL/ELv2 dual binds derivative work |
| 18 | tensorchord/pgvecto.rs | 1.8k (legacy) | Apache-2.0 | 2026 maintenance-mode (devs migrating to VectorChord) | (4) postgres-extension | T3 — pairs with postgres-mcp | 4+10+6+7+7+7+8+10=**59/80** | **STUDY-PILOT** — pre-VectorChord generation; 2.5x pgvector @ ~97% precision; SUNSET-NOTICE per VectorChord docs |
| 19 | neondatabase/pgvector | n/a (Neon-fork) | PostgreSQL-license | 2026 active | (4) postgres-extension on Neon SaaS | T3 — via postgres-mcp + Neon MCP | 2+9+6+10+8+5+8+8=**56/80** | **STUDY-NICHE** — Neon-fork with Neon-serverless features; useful if Neon is the Postgres host |
| **— EMBEDDED-DB —** | | | | | | | | |
| 20 | lancedb/lancedb | 10.3k | Apache-2.0 | 2026-05-16 | (2) embedded-DB (multimodal) | T3 — community LanceDB-MCP-pro wrappers (4.3k★ CortexReach fork) | 6+10+6+10+7+10+8+10=**67/80** | **INSTALL** — embedded multimodal-first; Lance columnar petabyte-scale; founded 2022; growing star velocity vs Chroma |
| 21 | asg017/sqlite-vec | 7.5k | MIT | 2026 active | (2) embedded-DB (SQLite-extension) | T3 — embedded; pairs with any MCP | 6+10+6+10+5+10+7+10=**64/80** | **INSTALL** — best-in-class embedded vector; pure C no-deps; WASM-browser-capable; Mozilla Builders + Fly.io/Turso/SQLite-Cloud/Shinkai sponsors; ANN alpha (rescore/ivf/DiskANN) |
| 22 | sqliteai/sqlite-vector | ~300 | (verify) | 2026 active | (2) embedded-DB (SQLite-extension competitor) | T5 | 2+5+2+7+5+10+5+8=**44/80** | **STUDY-NICHE** — competing sqlite-vec alternative; smaller community |
| 23 | tursodatabase/libsql + Turso | libsql 11k + turso 12k+ | MIT (libSQL) / Apache-2.0 (turso) | 2026-05 | (2) embedded-DB (SQLite-fork w/ DiskANN) | T3 — Turso MCP via libsql clients | 8+10+6+10+8+10+8+10=**70/80** | **INSTALL-NICHE** — native vector via DiskANN; concurrent writes (Turso Rust rewrite); embedded-replicas SOTA pattern per "SQLite Renaissance 2026" |
| 24 | chromadb-embedded mode | (part of chroma-core/chroma 28k) | Apache-2.0 | 2026-05-15 | (2) embedded-DB (Chroma local) | T1 — official chroma-mcp | (covered §1 row 2) | **INSTALL — same row 2** |
| **— IN-MEMORY-LIB (no DB layer) —** | | | | | | | | |
| 25 | facebookresearch/faiss | 37.7k-40.1k (varies) | MIT | 2026-05 (active) | (1) in-memory-lib (HNSW/PQ/IVF/NSG) | T5 — low-level lib | 10+10+2+10+10+10+5+10=**67/80** | **TRANSITIVE-INSTALL** — OG vector index lib; Meta-maintained; auto-pulled by Chroma/Milvus/etc.; rarely direct-install in CC runtime |
| 26 | nmslib/hnswlib | 5.1k | Apache-2.0 | 2026-01 (v0.8.0 Dec-2025) | (1) in-memory-lib (HNSW reference) | T5 — low-level lib | 6+10+2+7+10+10+5+10=**60/80** | **TRANSITIVE-INSTALL** — 700k+ monthly downloads; reference HNSW impl; multi-vector + epsilon search (v0.8.0) |
| 27 | spotify/annoy | ~13.5k | Apache-2.0 | low-activity (Spotify migrated to Voyager 2023) | (1) in-memory-lib (tree-based ANN) | T5 — low-level lib | 8+10+2+4+5+10+4+8=**51/80** | **STUDY (LEGACY)** — disk-resident-index strong feature; Spotify deprecated for Voyager; LangChain integration mature |
| 28 | spotify/voyager | 1.6k | Apache-2.0 | 2026 active | (1) in-memory-lib (HNSW Python+Java) | T5 — low-level lib | 4+10+2+10+8+10+5+10=**59/80** | **STUDY-PILOT** — Spotify's annoy-successor; 10x annoy @ same recall; 50% accuracy improvement; 4x less mem vs annoy 16x less vs hnswlib |
| 29 | unum-cloud/USearch | 4.1k | Apache-2.0 | 2026 active (v2.25.x) | (1) in-memory-lib (single-file SIMD) | T5 — low-level lib | 4+10+2+10+8+10+5+10=**59/80** | **STUDY-PILOT** — single-file + 1000+ SIMD kernels NumKong v7; broad lang bindings (C++/Py/JS/Rust/Java/Swift/C#/Go/Wolfram); WASM-capable |
| 30 | microsoft/DiskANN | 1.7k | MIT | 2026 active | (1) in-memory-lib (graph+SSD-residency) | T5 — low-level lib | 2+10+2+10+10+10+5+10=**59/80** | **TRANSITIVE-INSTALL** — graph+SSD residency: 5-10x more points per machine; powers pgvectorscale StreamingDiskANN + Turso ANN |
| 31 | vdaas/vald | 1.7k | Apache-2.0 | 2026 active | (1) in-memory-lib + distributed wrapper | T5 — low-level lib | 2+10+2+10+5+5+7+8=**49/80** | **STUDY-NICHE** — distributed scalable ANN engine; Japan/CyberAgent-backed; niche vs Milvus |
| 32 | jingwood/vector-index | <500 | (verify) | (verify) | (1) in-memory-lib (legacy) | T5 | 2+5+2+1+2+10+4+5=**31/80** | **REJECT-NICHE** — minimal traction; verify maintenance |
| **— REDIS / KV-EXTENSION VECTOR —** | | | | | | | | |
| 33 | RediSearch/RediSearch | ~5k | RSALv2/SSPLv1/AGPLv3 triple (Redis 8+) | 2026 active | (3) standalone-server (Redis-module HNSW+FLAT) | T3 — community Redis-MCP | 6+5+6+10+9+5+10+8=**59/80** | **STUDY-PILOT** — 18x faster vector search vs OpenSearch per Redis benchmark; ⚠️ post-2024 Redis-license-change makes Apache-equivalent alternatives preferred for self-host |
| 34 | valkey-io/valkey-search | ~700 (early) | BSD-3-Clause | 2026 active | (3) standalone-server (Valkey-module C++) | T5 — community Valkey MCP via Upstash-vector path | 2+10+2+10+10+5+10+8=**57/80** | **INSTALL-NICHE** — Redis-fork community-owned; SOTA single-digit-ms latency at 99% recall on billions; AWS-backed; BSD-3 vs Redis licensing |
| **— SEARCH ENGINES W/ VECTOR ADD-ON —** | | | | | | | | |
| 35 | elastic/elasticsearch | ~70k | AGPLv3 / SSPL / Elastic-License-v2 triple | 2026 active | (3) standalone-server (Lucene + dense_vector) | T3 — Elastic MCP via community wrappers | 10+5+6+10+10+5+10+5=**61/80** | **STUDY-PILOT** — best vector + RRF + ML-relevance tuning; ⚠️ AGPL/SSPL/ELv2 triple post-2024-relicense; community Elastic-MCP not first-party at scale |
| 36 | opensearch-project/OpenSearch | ~10k | Apache-2.0 | 2026 active | (3) standalone-server (FAISS+NMSLIB k-NN plugin) | T3 — community OpenSearch MCP | 6+10+6+10+8+5+10+5=**60/80** | **STUDY-PILOT** — AWS-fork of Elasticsearch; Apache-2.0; Neural-Search plugin; mid-tier vec perf vs Elastic |
| **— MCP-WRAPPED VECTOR SERVERS (NEW SUB-CATEGORY) —** | | | | | | | | |
| 37 | chroma-core/chroma-mcp | 547 | Apache-2.0 | 2026 (⚠️ 7mo dormancy per ChatForest 2026) | (6) MCP-wrapped (Chroma backend) | T1 — first-party Chroma MCP | 2+10+10+4+8+10+8+10=**62/80** | **INSTALL** — 12 MCP tools (most-complete DB-mgmt suite); 4 deployment modes; ⚠️ unpatched SQL-injection-2026-04 → CVE risk |
| 38 | qdrant/mcp-server-qdrant | 1.4k | Apache-2.0 | 2026 active (PRs awaiting review March 2026) | (6) MCP-wrapped (Qdrant backend) | T1 — first-party Qdrant MCP | 4+10+10+10+8+10+8+10=**70/80** | **INSTALL** — incumbent vendor MCP; 2 tools (qdrant-store + qdrant-find); semantic-memory pattern; **add delete/edit per pending PRs** |
| 39 | zilliztech/milvus-mcp (community) | ~200 | Apache-2.0 | 2026 active | (6) MCP-wrapped (Milvus backend) | T1 — first-party Zilliz/Milvus via Apify | 2+10+10+10+8+5+9+10=**64/80** | **INSTALL-NICHE if Milvus chosen** — 14 MCP tools (widest breadth); ensure Milvus 2.5.27+/2.6.10+ for CVE-2026-26190 |
| 40 | mendsalbert/qdrant-mcp (community fork) | ~50 | (verify) | 2026 | (6) MCP-wrapped (Qdrant fork) | T3 — community fork of qdrant/mcp-server-qdrant | 2+5+6+7+5+10+7+8=**50/80** | **REJECT-FORK-DUPE** — first-party qdrant/mcp-server-qdrant is canonical; fork adds no novel surface per discovery |
| 41 | upstash/vector (Upstash-MCP) | small (SDK + MCP-server combined) | proprietary core / open SDK | 2026 | (6) MCP-wrapped (Upstash-vector backend) | T2 — Upstash one-CLI install for Claude/Cursor/Copilot | 2+1+8+10+5+2+7+8=**43/80** | **STUDY-PILOT** — ease-of-install for serverless prototyping; vendor-lock risk; ⚠️ no self-host option |
| 42 | privetin/chroma (community ChromaDB-MCP) | <100 | (verify) | 2026 | (6) MCP-wrapped (Chroma alt) | T3 — alternative chroma MCP | 2+5+6+7+5+10+7+8=**50/80** | **REJECT-FORK-DUPE** — chroma-core/chroma-mcp is canonical |
| **— MULTI-MODEL DBs W/ VECTOR (BORDERLINE L0.0) —** | | | | | | | | |
| 43 | surrealdb/surrealdb | 32.1k | BSL-1.1 (transitions Apache-2.0 after 4 yrs) | 2026-05-16 | (3) standalone-server (multi-model: doc+graph+vector+kv) | T3 — community SurrealDB MCP | 10+5+6+10+8+7+10+7=**63/80** | **STUDY-PILOT** — Rust core; 3.0 = 8x faster vector vs 2.0; HNSW+MTREE+brute-force; ⚠️ BSL-1.1 license tail; may be overkill if Qdrant+Graphiti already cover |
| 44 | HelixDB/helix-db | 4.1k | AGPL-3.0 | 2026-05-01 | (3) standalone-server (unified vec+graph Rust) | T3 — built-in MCP per docs | 4+4+6+10+5+7+10+10=**56/80** | **STUDY-PILOT** — Rust + LMDB; vector+graph unified; "1000x Neo4j traversal" claim (verify); ⚠️ AGPL-3.0 + young ecosystem vs Graphiti+Qdrant maturity |

---

## §B — Top-3 INSTALL per sub-category (6 sub-types)

### (1) IN-MEMORY-LIB (Top-3 transitive)
1. **facebookresearch/faiss** (37.7k★, MIT, 67/80) — OG; auto-pulled by Chroma/Milvus
2. **microsoft/DiskANN** (1.7k★, MIT, 59/80) — graph+SSD; powers pgvectorscale + Turso
3. **nmslib/hnswlib** (5.1k★, Apache-2.0, 60/80) — HNSW reference; 700k+ monthly downloads

**Decision**: TRANSITIVE-INSTALL — no direct install needed; auto-pulled by higher-layer stores

### (2) EMBEDDED-DB (Top-3)
1. **asg017/sqlite-vec** (7.5k★, MIT, 64/80) — pure-C no-deps; WASM-capable; Mozilla Builders
2. **tursodatabase/turso + libsql** (12k+11k★, Apache-2.0/MIT, 70/80) — DiskANN-native; concurrent writes; SOTA SQLite-renaissance
3. **lancedb/lancedb** (10.3k★, Apache-2.0, 67/80) — multimodal-first; Lance columnar petabyte-scale

**Decision INSTALL set**: sqlite-vec (zero-ops local CC sessions) + lancedb (multimodal payload) + chroma embedded (covered §3)

### (3) STANDALONE-SERVER (Top-3)
1. **qdrant/qdrant** (31.3k★, Apache-2.0, 75/80) — INCUMBENT; T1 vendor MCP
2. **chroma-core/chroma** (28.0k★, Apache-2.0, 71/80) — T1 vendor MCP; dual embed+server
3. **milvus-io/milvus** (44.3k★, Apache-2.0, 72/80) — LARGEST ★; T1 vendor MCP; CVE caveat

**Decision INSTALL set**: Qdrant (incumbent) + Chroma (dual-fit embed/server); Milvus = STUDY-PILOT for billion-scale tier

### (4) POSTGRES-EXTENSION (Top-3)
1. **pgvector/pgvector** (21.3k★, PostgreSQL-license, 66/80) — de-facto standard
2. **timescale/pgvectorscale** (~1.5k★, Apache-2.0, 65/80) — **SOTA Q1 2026 perf**; 11.4x Qdrant @ 99% recall 50M
3. **tensorchord/VectorChord** (~1.8k★, AGPLv3/ELv2-dual, 60/80) — pgvecto.rs successor; 100M-vec index in <20min

**Decision INSTALL set if PG present**: pgvector + pgvectorscale (stack); VectorChord = STUDY-PILOT due license tail

### (5) CLOUD-MANAGED (Top-3)
1. **turbopuffer** (closed, 49/80) — Cursor/Notion/Linear prod; $10/mo @ 1.5k-dim 1M reads
2. **pinecone-io** (closed, 48/80) — dominant SaaS; serverless billing
3. **upstash/vector** (closed, 44/80) — one-CLI Claude install; serverless

**Decision**: REJECT for installed-runtime L0 per cardinal-rule-5 self-host install-priority. KEEP-NOTE for production-tier where managed-cloud is required (turbopuffer = top study target given cost+arch innovation)

### (6) MCP-WRAPPED (Top-3)
1. **qdrant/mcp-server-qdrant** (1.4k★, Apache-2.0, 70/80) — incumbent T1 vendor MCP
2. **chroma-core/chroma-mcp** (547★, Apache-2.0, 62/80) — 12-tool suite; ⚠️ CVE-class concerns
3. **zilliztech/milvus-mcp** (~200★, Apache-2.0, 64/80) — 14-tool widest breadth

**Decision INSTALL set**: qdrant-mcp (paired with Qdrant install §3.1) + chroma-mcp (paired with Chroma install §3.2). milvus-mcp = INSTALL-NICHE if §3.3 STUDY-PILOT promoted

---

## §C — pgvectorscale 11.4x Qdrant claim verification

**Claim**: pgvectorscale achieves **471.57 QPS at 99% recall** on 50M Cohere embeddings (768-dim) vs Qdrant's **41.47 QPS** = **11.4x throughput advantage**.

**Source-of-record**: Timescale/Tigerdata benchmark methodology at:
- `https://medium.com/timescale/pgvector-vs-qdrant-open-source-vector-database-comparison-f40e59825ae5` (TIER-2; vendor blog with full benchmark protocol)
- `https://www.tigerdata.com/blog/pgvector-vs-qdrant` (TIER-2; renamed Tigerdata post-2025 Timescale rebrand)
- Cross-validation: `https://callsphere.ai/blog/vector-database-benchmarks-2026-pgvector-qdrant-weaviate-milvus-lancedb` (TIER-3 independent reproducer 2026)

**Verification status**: **CONFIRMED 11.4x throughput** at 99% recall, with these critical caveats:
1. **Single-node only**: claim is single-node-throughput; distributed Qdrant deployment changes the equation
2. **Workload-specific**: throughput-optimized, NOT latency-optimized
3. **Qdrant wins latency**: Qdrant has **1% better p50 (30.75ms vs 31.07ms), 39% better p95 (36.73ms vs 60.42ms), 48% better p99 (38.71ms vs 74.60ms)** — pgvectorscale wins QPS, Qdrant wins single-query latency
4. **Qdrant wins index-build time**: ~3.3 hours (Qdrant) vs ~11.1 hours (pgvectorscale) on 50M vec — pgvectorscale is **3.4x slower to build**
5. **Recall-quality tradeoff**: Both achieve 99% recall in the benchmark setup; this is the operating point of the claim, NOT all workloads
6. **Hardware**: vendor-benchmark setup is single high-spec node; reproducibility on commodity hardware may differ

**Disposition**: pgvectorscale 11.4x claim is **TRUE at the specified operating point** (99% recall, 50M vec, single-node, throughput-optimized workload). For **filtered-search** workloads, **filter-heavy in-graph traversal**, or **billions-of-vec distributed scale**, Qdrant or Milvus are still preferred. For **OLTP+vector unified Postgres workload at <100M vec where Postgres already hosts relational state**, pgvectorscale is the SOTA Q1 2026 choice.

**Additional 2026 SOTA validation**: VectorChord (pgvector successor from tensorchord) extends this further at 100M+ scale per their own benchmark: 100M-vec index in <20min vs pgvector 50+ hours = **150x index-build advantage** at 100M tier. So **at the 100M+ band**, VectorChord may displace pgvectorscale as Postgres-extension SOTA (license-tail considered).

---

## §D — Architecture recommendation: should L0.0 split into sub-lanes?

**Operator question**: should L0.0 split into sub-lanes (in-memory / embedded / standalone / postgres / cloud)?

**Recommendation**: **YES — split L0.0 into 5 sub-lanes** to match installation/workload reality. Single-sub-lane "vector DB" hides at least 2 architectural distinctions (embedded-vs-server; self-host-vs-cloud) that drive different install decisions and different MCP-pairing decisions.

### Proposed L0.0 sub-lane structure

| Sub-lane | Primary install | Use-case-precise fit | Pair with |
|---|---|---|---|
| **L0.0.a — in-memory-lib** | TRANSITIVE only (Faiss/DiskANN/hnswlib auto-pulled) | low-level kernel inside higher-layer stores | n/a (transitive) |
| **L0.0.b — embedded-DB** | sqlite-vec + lancedb + chroma-embedded | local CC session vector + multimodal payload; zero-ops | direct MCP via chroma-mcp; sqlite-vec via custom MCP |
| **L0.0.c — standalone-server** | Qdrant (primary) + Chroma (secondary) | persistent server-tier; scale beyond embedded | qdrant-mcp (T1) + chroma-mcp (T1) |
| **L0.0.d — postgres-extension** | pgvector + pgvectorscale | when Postgres already hosts relational state; unified SQL+vector | postgres-mcp + future VectorChord at 100M+ tier |
| **L0.0.e — cloud-managed** | (REJECT for installed-runtime L0 per cardinal-rule-5) | KEEP-NOTE for production-tier where SaaS required (turbopuffer top study) | n/a in installed-runtime |

### Why split is load-bearing

1. **Different install ceremonies**: embedded = pip install; server = docker compose; postgres-extension = PG-CREATE-EXTENSION; cloud = API-key-only. The MCP-pairing differs per pattern.
2. **Different operational profiles**: embedded = single-process zero-ops; server = always-on daemon; postgres-extension = piggyback on PG ops; cloud = no-ops but billing.
3. **Different cardinal-rule-5 dispositions**: cloud sub-lane uniformly REJECT-for-installed-runtime; other sub-lanes have INSTALL candidates.
4. **Different MCP-server pairing**: each sub-lane has its own T1-MCP-server taxonomy (Qdrant=qdrant-mcp; Chroma=chroma-mcp; Milvus=milvus-mcp; Postgres=postgres-mcp; cloud-managed varies by vendor)
5. **Different benchmark axes**: in-memory-lib measured at QPS/latency only; postgres-extension measured at unified SQL+vector throughput; cloud-managed measured at $/QPS

### Concrete install set (per sub-lane, 2026-05-16 disposition)

```
L0.0.b (embedded):       sqlite-vec + lancedb + chroma-embedded  [INSTALL × 3]
L0.0.c (standalone):     qdrant + chroma-server                  [INSTALL × 2]
L0.0.d (postgres-ext):   pgvector + pgvectorscale                [CONDITIONAL-INSTALL — only if PG present in stack]
L0.0.a (in-memory-lib):  faiss + hnswlib + diskann               [TRANSITIVE — no direct]
L0.0.e (cloud-managed):  turbopuffer (top study target)          [STUDY-ONLY for installed-runtime]
```

**Final installed-runtime L0.0 selection** (5 direct installs + 3 transitive + 1 conditional + 1 study):
- **INSTALL** (5): qdrant · chroma-core/chroma (dual server+embed) · sqlite-vec · lancedb · qdrant-mcp + chroma-mcp paired
- **CONDITIONAL** (1): pgvector + pgvectorscale stack (only if PG hosts relational state already)
- **TRANSITIVE** (3): faiss · hnswlib · diskann (auto-pulled)
- **STUDY-PILOT** (3): turbopuffer (cost-arch innovation) · milvus (billion-scale tier) · VectorChord (post-100M Postgres tier)

---

## §E — Honest non-findings

1. **Exact star counts diverge across 2026 sources**: e.g., Milvus reported as 35k/40k/44.3k across MarkTechPost vs DataCamp vs prior-wave SATURATION-MEMORY-LAYER. Qdrant reported as 29k/31.3k. Faiss reported as 32k/37.7k/40.1k. **Source-of-record for this matrix**: prior-wave SATURATION-MEMORY-LAYER row values where available (gathered 2026-05-16 from same wave); cross-checked against 2026 web sources; divergence within ±20% accepted without re-probe (rate-limit constraint).

2. **`mendsalbert/qdrant-mcp` star count**: rate-limited probe; estimated ~50 stars per discovery context but **NOT directly GitHub-MCP-verified** this fire. Verdict (REJECT-FORK-DUPE) holds regardless of exact count since first-party `qdrant/mcp-server-qdrant` is the canonical vendor-MCP.

3. **`upstash/vector` separate star count**: Upstash's vector product is part of the broader Upstash org (combined Redis+Vector+QStash+Kafka SaaS). No clean per-product OSS star count; SDK + MCP are open; core is proprietary. Disposition (STUDY-PILOT due vendor-lock) holds.

4. **`zilliz/zilliz` repo specifically**: per operator brief — Zilliz is the commercial layer over Milvus; their OSS repo IS milvus-io/milvus (covered §3). There is no separate `zilliztech/zilliz` repo of note distinct from milvus-io org repos. Listed as §14 cloud-managed.

5. **`jingwood/vector-index`**: per operator brief — extremely low-traction (<500 stars estimated); included as REJECT-NICHE for completeness. Maintenance status not verified; not a recommended L0 candidate.

6. **`vespa-engine/vespa` exact star count**: web search showed 6.9k/6.914k; rounded to 6.9k in matrix. Verdict (REJECT-NICHE for solo-dev CC) holds — Vespa is a serious enterprise platform but operational profile mismatches solo-dev CC runtime.

7. **`PineconeDB` open-source repos**: Pinecone has client SDK repos (pinecone-io/pinecone-python-client ~440★ + pinecone-io/examples ~3k★) but the database engine itself is closed-source. Disposition unchanged — REJECT for installed-runtime L0 per cardinal-rule-5.

8. **`HelixDB` "1000x Neo4j traversal" claim**: per their docs; **NOT independently verified** in this saturation. Claim should be tested vs Graphiti+Neo4j baseline before any STUDY-PILOT → INSTALL promotion. Pre-emptive note: AGPL-3.0 license tail + young ecosystem (2025-launch) suggest holding at STUDY-PILOT regardless of perf-claim verification.

9. **Marqo's positioning**: per prior wave + this saturation — Marqo is genuinely strong at multimodal CLIP/SigLIP-finetuned search, but the operator memory-layer use-case is horizontal not vertical. If a future wave introduces explicit multimodal/CLIP-search L0 sub-lane, Marqo promotes to STUDY-PILOT for that vertical sub-lane. Until then, REJECT-NICHE stands.

10. **MCP-server CVE-class concerns (chroma-mcp + milvus-mcp)**: ChatForest 2026 audit flags **SQL-injection vulnerability in chroma-mcp (April 2026, unpatched)** and **CVE-2026-26190 in Milvus** (patched in 2.5.27+/2.6.10+). These are LOAD-BEARING for any INSTALL decision and must be re-verified at install-time per CCBP cardinal-rule-6 freshness.

11. **`Voyager` (Spotify) vs `Annoy` (Spotify)**: Annoy is deprecated for production-Spotify-internal use in favor of Voyager (Oct 2023 launch). LangChain integration is still on Annoy mainline; Voyager integration is newer/smaller community. For L0.0.a in-memory-lib sub-lane: hnswlib still wins as reference HNSW impl; Voyager is study-target.

12. **`Turbopuffer` no public repo**: per discovery, turbopuffer.com has no public GitHub repo for the core (closed-source SaaS). All star-count fields in §3.5 (cloud-managed) are n/a for closed-core projects. Disposition (STUDY-PILOT for cloud tier; REJECT for installed-runtime L0) holds.

13. **`Tencent/TencentDB-Agent-Memory` vs `vearch/vearch`**: per prior L0.2 wave, Tencent-backed memory project is distinct from vearch (which is JD-backed). Both are Tencent/Chinese-ecosystem; both STUDY-NICHE for non-Chinese-ecosystem runtime per cardinal-rule-5 (community-consensus-first prefers larger Western community where available).

14. **Index-build vs query trade**: throughout the matrix, throughput-only benchmarks (e.g. 11.4x pgvectorscale claim) hide the index-build-time cost. For runtime CC sessions where index is rebuilt often (live-coding scenarios), this matters more than for batch-indexed RAG. Operator should weight D5 benchmark score against actual workload pattern at install-time.

15. **Q2 2026 entrants pending**: Vectorize (Cloudflare), Convex Vector, MongoDB Atlas Vector, Astra DB Vector (DataStax), Couchbase Vector — all 2026 entrants that **could not be saturation-covered this fire** due to scope (multi-vendor cloud-tier; mostly closed-core or vendor-locked). Defer to future cloud-tier-specific saturation wave.

---

## §F — Output disposition & next-action

**This file**: `Z:\claude-sota-installed\docs\grand-synthesis-2026-05-16\06-fresh-research-delta\DEEP-SAT-L00-VECTOR-DB-2026-05-16.md` — 44 rows × 9 columns + §A-§F.

**Recommended downstream actions** (operator decisions, NOT this agent's scope):
1. Promote L0.0 from single-sub-lane to 5-sub-lane taxonomy per §D
2. Replace prior SATURATION-MEMORY-LAYER §A 11-row L0.0 section with reference to this DEEP-SAT-L00 file
3. Re-verify chroma-mcp SQL-injection + Milvus CVE-2026-26190 patch-status at install-time per cardinal-rule-6
4. Either confirm-or-reject the conditional pgvector+pgvectorscale install based on whether PG hosts relational state in target runtime
5. Add turbopuffer to STUDY-tracker for cost-architecture-innovation; re-evaluate at cloud-tier-introduction wave

**Cross-references**:
- Prior wave §A row 1-11: `Z:\claude-sota-installed\docs\grand-synthesis-2026-05-16\06-fresh-research-delta\SATURATION-MEMORY-LAYER-2026-05-16.md` lines 14-25
- L0.2 deep-sat sibling: `Z:\claude-sota-installed\docs\grand-synthesis-2026-05-16\06-fresh-research-delta\DEEP-SAT-L02-MEMORY-MCP-2026-05-16.md`
- MCP-pathway audit: `Z:\claude-sota-installed\docs\grand-synthesis-2026-05-16\06-fresh-research-delta\GRAPHQL-NATIVE-CC-PATHWAY-AUDIT-2026-05-16.md`
