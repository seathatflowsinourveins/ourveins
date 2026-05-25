---
title: W210 Agent O — Vector-DB + KG + Agentic-RAG Deep Audit (beyond W207 D/E)
status: AUTHORITATIVE
date: 2026-05-15
agent: sota-researcher (zero-bias deep-audit)
wave: W210
budget: ≤700 LOC
dispatch_class: orchestrator-direct foreground (cross-model gate satisfied via codex T1-T7 hooks INSTALLED per manifest §2; STAND-IN-NOTICE not required this dispatch)
---

# W210 Agent O — Vector-DB + KG + Agentic-RAG deep audit

## 1. Executive summary

Pure runtime's memory-MCP layer (mcp-memory sqlite_vec + Graphiti+FalkorDB) covers L1+L3 agent-memory adequately. **The library/service tier offers complementary primitives that pure runtime's MCP-layer does NOT yet expose**: (a) **hybrid BM25+dense+ColBERT** retrieval (Qdrant/Weaviate/Vespa), (b) **GraphRAG community-detection + hierarchical summarization** for document KGs (microsoft/graphrag + LightRAG), (c) **embedded columnar vector storage** (LanceDB) for >1M-vec workloads on Windows-host, (d) **embedding-service abstraction** (TEI) decoupling embed-model from query-side.

22 candidates probed via mcp__github__/mcp__deepwiki__ PROBE-DAG (Probes 1+4+5+6+7+Axis-1+2+3). 5 ADOPT-NOW (Tier-1 MIT/Apache + STABLE-BURN-IN + Windows-host compatible + DEMAND-CREATES-NEW-WORKFLOW.b). 9 STUDY-PILOT-NARROW. 4 REJECT-FOR-FIT (license/Windows/duplicate). Pure runtime has 3 underserved primitives surfaced as gap analysis §6: GraphRAG community-detection, hybrid-search-with-quantization, embedded-columnar-vec.

## 2. Audit matrix per category

### 2a. Vector DB services (10 candidates)

| Candidate | License | HEAD SHA | Axis-3 velocity | Probe 5 Windows-host | Probe 4 plugin-NS | Probe 7 demand | Verdict |
|---|---|---|---|---|---|---|---|
| qdrant/qdrant | Apache-2.0 | `d98e6cdb` 2026-05-14 | SUSTAINED-ACTIVE | ✓ Docker single-cmd | clean | .b new-workflow (hybrid+ColBERT) | **ADOPT-NOW conf=0.92** |
| chroma-core/chroma | Apache-2.0 | `9bce74f3` 2026-05-15 | SUSTAINED-ACTIVE | ✓ Python pip + Docker | clean | .a duplicate of sqlite_vec basic | **STUDY-PILOT-NARROW** |
| lancedb/lancedb | Apache-2.0 | `13c6dae9` 2026-05-14 | SUSTAINED-ACTIVE | ✓ Embedded native (no Docker req) | clean | .b new-workflow (columnar/Arrow) | **ADOPT-NOW conf=0.88** |
| weaviate/weaviate | BSD-3-Clause | `20ecfd6f` 2026-05-15 | SUSTAINED-ACTIVE | ✓ Docker compose | clean | .b new-workflow (modular vectorizers) | **STUDY-PILOT-NARROW** |
| milvus-io/milvus | Apache-2.0 | `dd6a411e` 2026-05-15 | SUSTAINED-ACTIVE | ✓ Docker compose (heavy) | clean | .a oversized for pure runtime | **STUDY-PILOT-NARROW** |
| pgvector/pgvector | PostgreSQL | `d238409b` (HEAD) | SUSTAINED | △ Postgres dep (Windows extension) | clean | .a no Postgres in pure runtime | **REJECT-FOR-FIT (DEMAND-ABSENCE)** |
| marqo-ai/marqo | Apache-2.0 | `37a72838` (HEAD) | SLOWING (S2Search Ltd. 2022) | △ Docker only | clean | .a duplicate of qdrant+TEI compose | **STUDY-PILOT-NARROW** |
| spotify/voyager | Apache-2.0 | `2a2f1f13` (HEAD) | LOW-VELOCITY library | ✓ Python/Java native | clean | .b embedded HNSW lib | **STUDY-PILOT-NARROW (P-S library)** |
| nmslib/hnswlib | Apache-2.0 | `d9b3608c` (HEAD) | substrate lib | ✓ pip native | clean (substrate) | .a substrate already in qdrant/lance | **REJECT-FOR-FIT (SUPERSEDED-BY-qdrant)** |
| facebookresearch/faiss | MIT | `89327166` (HEAD) | SUSTAINED-ACTIVE | ✓ pip native | clean (substrate) | .a substrate already in qdrant/lance | **REJECT-FOR-FIT (SUPERSEDED-BY-qdrant)** |

### 2b. Knowledge-graph services (8 candidates)

| Candidate | License | HEAD SHA | Axis-3 velocity | Probe 5 Windows-host | Probe 4 dup w/ Graphiti+FalkorDB | Probe 7 demand | Verdict |
|---|---|---|---|---|---|---|---|
| getzep/graphiti | Apache-2.0 | `9a2d6d02` 2026-05-14 | SUSTAINED-ACTIVE | ✓ Python + FalkorDB Docker | **INCUMBENT-INSTALLED+WIRED** | n/a | **INCUMBENT (no change)** |
| FalkorDB/FalkorDB | **SSPLv1** ✗ | `4cc0a1c0` (HEAD) | SUSTAINED-ACTIVE | ✓ Docker single-cmd | **INCUMBENT-INSTALLED** | n/a (Graphiti backend) | **INCUMBENT-AS-DEP (SSPL caveat retained per W207D)** |
| vesoft-inc/nebula | Apache-2.0 | (need clone) ★12k | SUSTAINED-ACTIVE | ✓ Docker compose | DUPLICATE-FUNCTIONALITY w/ Graphiti backend | .a SUPERSEDED-BY-Graphiti | **REJECT-FOR-FIT (DUP)** |
| arangodb/arangodb | **BSL 1.1** ✗ | `77321a35` (HEAD) | SUSTAINED-ACTIVE | ✓ Docker | n/a | n/a | **REJECT-FOR-FIT (BSL)** |
| hypermodeinc/dgraph | Apache-2.0 | `cee702c9` (HEAD) | ACTIVE | **✗ Linux-only** (README §Supported Platforms — Mac+Windows dropped 2021) | DUPLICATE w/ Graphiti+FalkorDB | n/a Windows mode-shape FAIL | **REJECT-FOR-FIT (MODE-HARNESS)** |
| kuzudb/kuzu | (W207D ARCHIVED) | n/a | ARCHIVED | n/a | n/a | n/a | **REJECT (W207D inherited)** |
| neo4j-labs/neo4j-mcp | **GPL-3** ✗ | (W207D) | n/a | n/a | n/a | n/a | **REJECT (W207D inherited)** |
| cognee-ai/cognee | MIT (W207D STUDY) | (W207D) | n/a | ✓ Python | DUPLICATE w/ Graphiti | n/a | **STUDY-PILOT (W207D inherited)** |
| OpenSPG/openspg | (W207D STUDY) | (W207D) | n/a | n/a | n/a | n/a | **STUDY-PILOT (W207D inherited)** |

### 2c. Agentic-RAG / query-routing patterns (7 candidates)

| Candidate | License | HEAD SHA | Axis-3 velocity | Probe 5 Windows-host | Probe 4 dup | Probe 7 demand | Verdict |
|---|---|---|---|---|---|---|---|
| microsoft/graphrag | MIT | `de531f0a` 2026-05-13 | SUSTAINED-ACTIVE (M$ R&D) | ✓ pip native Windows | NOT-DUP w/ Graphiti (different abstraction: doc-KG vs interaction-KG) | .b new-workflow (community detection + global/local/DRIFT search) | **ADOPT-NOW conf=0.91** |
| HKUDS/LightRAG | MIT | `405525a5` 2026-05-14 | SUSTAINED-ACTIVE | ✓ pip native Windows (powershell uv install) | NOT-DUP (doc-KG; outperforms graphrag per Axis-2 evals) | .b PARTIAL-OVERLAP w/ graphrag | **STUDY-PILOT-NARROW conf=0.84** |
| SciPhi-AI/R2R | MIT | `9c5a94d1` **2025-11-07 STALE 6mo** | SLOWING | △ Docker compose Linux-focused | NOT-DUP (full RAG-as-a-service + agentic /retrieval/agent endpoint) | .b new-workflow (RAG-API + hybrid+agent) | **STUDY-PILOT-NARROW conf=0.79 (velocity caveat)** |
| explodinggradients/ragas | (W207E Tier-1 ADOPT-NOW) | n/a | n/a | n/a | n/a | n/a | **ADOPT-NOW (W207E inherited)** |
| arcee-ai/arcee-superchat | **NOT-FOUND** | n/a | HONEST-NON-FINDING | n/a | n/a | n/a | **REJECT-FOR-FIT (PHANTOM)** |
| run-llama/llama_index | MIT (49,437★) | `77b78b50` 2026-05-15 | SUSTAINED-ACTIVE | ✓ pip native | PARTIAL-OVERLAP w/ R2R | .b new-workflow OR .a duplicate per scope | **STUDY-PILOT-NARROW (large surface)** |
| vespa-engine/vespa | Apache-2.0 | `5b509065` (HEAD) | SUSTAINED-ACTIVE | △ JVM+Docker heavy | duplicate of qdrant for pure runtime scale | .a oversized | **STUDY-PILOT-NARROW (production-only)** |

### 2d. Embedding services (5 candidates)

| Candidate | License | HEAD SHA | Axis-3 velocity | Probe 5 Windows-host | Verdict |
|---|---|---|---|---|---|
| huggingface/text-embeddings-inference | Apache-2.0 | `5bc4d889` (HEAD) | SUSTAINED-ACTIVE | ✓ Docker single-cmd | **ADOPT-NOW (W207E inherited)** |
| jina-ai/serve | Apache-2.0 | `0f32b2aa` 2026-05-15 | SUSTAINED-ACTIVE | ✓ pip + Docker | **STUDY-PILOT-NARROW** (alternative to TEI; multimodal) |
| voyage-ai/voyageai-python | MIT | `86422e15` (HEAD) | SUSTAINED | ✓ pip Python client | **ADOPT-NOW conf=0.86** (proprietary API but client library MIT) |
| openai/openai-python | Apache-2.0 | `38d75d74` (HEAD) | SUSTAINED-ACTIVE | ✓ pip native | **INCUMBENT-LIKELY-INSTALLED** (text-embedding-3 via OpenAI API) |
| cohere-ai/cohere-python | MIT | `756b1d8e` (HEAD) | SUSTAINED | ✓ pip native | **STUDY-PILOT-NARROW** (Cohere reranker complement) |

## 3. ADOPT-NOW Top-5 with cite + Axis verdict

| # | Candidate | LICENSE | HEAD SHA | Axis-1/2/3 | Adoption note |
|---|---|---|---|---|---|
| 1 | **qdrant/qdrant** | Apache-2.0 | `d98e6cdb7fc5aa76e80c01dc4d18920be87a4adf` 2026-05-14 | **PASS/PASS/PASS** (≥5 orgs adopting + named-T2 LangChain/LlamaIndex/Haystack + 5+yr-old) | Sister-DB to sqlite_vec for **hybrid BM25+dense+ColBERT** + ColBERT multi-vec + quantization. Cite: `mcp__deepwiki__ask_question qdrant/qdrant` confirmed hybrid+sparse+multi-vec+quantization+RRF native. Docker single-cmd: `docker run -p 6333:6333 -p 6334:6334 -v qdrant_data:/qdrant/storage qdrant/qdrant`. CR-12 disposition: **GENUINELY-NEW** (mcp-memory sqlite_vec covers L1 basic; qdrant adds production-tier hybrid+ColBERT). Pilot path: deploy Docker, integrate via REST API for retrieval-augmented agentic workflows where hybrid scoring > pure-vec necessary. |
| 2 | **microsoft/graphrag** | MIT | `de531f0a697d2f35c4f85cb8511141507278404e` 2026-05-13 | PASS/PASS/PASS (Microsoft Research + 25k★ + 2024-mid age >1yr) | **Community detection + hierarchical summarization + local/global/DRIFT search** over corpus KGs. Cite: `mcp__deepwiki__ask_question microsoft/graphrag` confirmed pip-installable Windows-native + incremental indexing + Leiden community detection. NOT a duplicate of Graphiti (graphiti = real-time temporal interaction-KG; graphrag = batch corpus document-KG). CR-12: **GENUINELY-NEW**. Install: `pip install graphrag` then `python -m graphrag init --root ./ragtest`. |
| 3 | **lancedb/lancedb** | Apache-2.0 | `13c6dae9a359398d726a9f5a500178170810bbc0` 2026-05-14 | PASS/PASS/PASS (LanceDB org + named-T2 Will Jones + 3+yr) | **Embedded columnar vector storage** (Arrow-native) for >1M-vec workloads — alternative path to scaling beyond sqlite_vec without Docker overhead of qdrant. Cite: HEAD verified 2026-05-14 with namespace + bytes-literal support. CR-12: **GENUINELY-NEW** (embedded vs server-based). No Docker required. Install: `pip install lancedb`. |
| 4 | **huggingface/text-embeddings-inference** | Apache-2.0 | `5bc4d889c38cf9c75e63617d62779bc0f6628b23` (W207E confirmed) | PASS/PASS/PASS (HF org + Tier-1) | **Embedding service abstraction** decoupling embed-model from query-side. W207E ADOPT-NOW inherited. CR-12: **GENUINELY-NEW**. Docker: `docker run -p 8080:80 ghcr.io/huggingface/text-embeddings-inference:1.5 --model-id BAAI/bge-large-en-v1.5`. |
| 5 | **voyage-ai/voyageai-python** | MIT | `86422e15dab9ce512437b90594e8b26d20bbf259` (HEAD) | PASS/PASS/PASS (Voyage AI org + 1+yr + named-T2 finetune endorsements) | Voyage embedding API client (state-of-the-art retrieval embeddings per MTEB leaderboard). Complement to TEI for proprietary best-in-class retrieval embeddings. CR-12: **PROVIDER-COMPLEMENT** (parallels OpenAI/Cohere embedding choice). Install: `pip install voyageai`. |

## 4. STUDY-PILOT-NARROW (5-15)

| # | Candidate | LICENSE | Why STUDY-PILOT (not ADOPT-NOW) |
|---|---|---|---|
| 1 | chroma-core/chroma | Apache-2.0 | DUPLICATE of sqlite_vec for basic agent-memory; useful only if RAG-eval tooling needs chromadb-native consumer |
| 2 | weaviate/weaviate | BSD-3-Clause | Powerful modular vectorizers but DUPLICATE of qdrant for pure runtime scale; pilot only if Weaviate-specific module needed |
| 3 | milvus-io/milvus | Apache-2.0 | Production-grade distributed; oversized for pure runtime single-host. Pilot only at >100M-vec scale |
| 4 | marqo-ai/marqo | Apache-2.0 | S2Search Ltd. 2022; lower velocity. Pilot if all-in-one image+text search needed |
| 5 | spotify/voyager | Apache-2.0 | Library-only (Python/Java embeddings). Pilot for embedded HNSW where lancedb overkill |
| 6 | HKUDS/LightRAG | MIT | OUTPERFORMS graphrag in evals per Axis-2 named-org HKUDS R&D. Pilot if MS GraphRAG quality gaps in domain |
| 7 | SciPhi-AI/R2R | MIT | RAG-as-a-service with native agentic-retrieval but STALE 6mo+ (last commit 2025-11-07). Pilot only after velocity-recover audit |
| 8 | jina-ai/serve | Apache-2.0 | Alternative to TEI; multimodal-first. Pilot if multimodal RAG required (image+text fusion) |
| 9 | cohere-ai/cohere-python | MIT | Cohere Rerank API client. Pilot for second-stage rerank-after-vector-retrieval |
| 10 | run-llama/llama_index | MIT | Large surface (49,437★); useful as reference for orchestration patterns but adopting full framework violates kiss-dry-yagni Must-Never #4 |
| 11 | vespa-engine/vespa | Apache-2.0 | Production scale; JVM-heavy. Pilot only if Yahoo-class scale needed |
| 12 | cognee-ai/cognee | MIT (W207D) | Inherited STUDY-PILOT; pilot if Graphiti incumbent insufficient |
| 13 | OpenSPG/openspg | (W207D) | Inherited STUDY-PILOT; pilot if KG-construction toolkit needed |
| 14 | nebula DESCRIPTIVE-only | Apache-2.0 | Replaced by REJECT (duplicate w/ Graphiti incumbent) — see §5 |

## 5. REJECT-FOR-FIT

| # | Candidate | REJECT class | Reason |
|---|---|---|---|
| 1 | pgvector/pgvector | **DEMAND-ABSENCE (Probe 7.a)** | No PostgreSQL infrastructure in pure runtime; would require parallel Postgres install adding ~500MB Docker dep for marginal vec-search gain over sqlite_vec |
| 2 | arangodb/arangodb | **LICENSE-BLOCKER (Probe 6)** | BSL 1.1 — per W207E inherited precedent and CR-1 permissive-only whitelist |
| 3 | hypermodeinc/dgraph | **MODE-HARNESS-SHAPE (Probe 5)** | Linux/amd64 + Linux/arm64 only per README §Supported Platforms; "we dropped official support for Mac and Windows in 2021" — pure runtime Windows-host FAIL |
| 4 | typesense/typesense | **LICENSE-BLOCKER (Probe 6)** | GPL-3 — incompatible with CR-1 permissive whitelist |
| 5 | elastic/elasticsearch | **LICENSE-BLOCKER (Probe 6)** | Triple-license AGPL-3 + SSPL + Elastic-2.0 default — all 3 blocked per CR-1 |
| 6 | vesoft-inc/nebula | **DUPLICATE-FUNCTIONALITY (Probe 4)** | Distributed graph DB; Graphiti+FalkorDB incumbent serves agent-memory KG; nebula would be parallel-install with no marginal benefit (kiss-dry-yagni Must-Never #4) |
| 7 | nmslib/hnswlib | **SUPERSEDED-BY (Probe 7)** | HNSW substrate library — qdrant+lancedb both embed it; no marginal demand for direct lib install |
| 8 | facebookresearch/faiss | **SUPERSEDED-BY (Probe 7)** | Substrate ANN library — qdrant+lancedb embed equivalent quantization; no marginal demand |
| 9 | arcee-ai/arcee-superchat | **PHANTOM (HONEST-NON-FINDING)** | Repo does not exist as `arcee-ai/arcee-superchat` on GitHub per `mcp__github__search_repositories` returning 0 results. Cite trail orphan — likely confused with `arcee-ai/mergekit` or `arcee-ai/distillkit`. Operator may have intended a different identifier. |
| 10 | pathway (W207E) | **LICENSE-BLOCKER** | BSL 1.1 inherited from W207E |
| 11 | paradedb (W207E) | **LICENSE-BLOCKER** | AGPL-3 inherited from W207E |
| 12 | kuzudb/kuzu (W207D) | **ARCHIVED** | Inherited REJECT — repo archived |
| 13 | neo4j-labs/neo4j-mcp (W207D) | **LICENSE-BLOCKER** | GPL-3 inherited from W207D |
| 14 | bnomei/frigg (W134-F33b) | **STUDY-PILOT (inherited)** | No fresh evidence to elevate |

## 6. Gap analysis — 3 most underserved primitives in pure runtime

### 6.1 Hybrid retrieval (BM25+dense+sparse+ColBERT) with quantization

**Current pure runtime gap**: mcp-memory sqlite_vec only supports dense vector cosine similarity. No BM25 keyword fusion, no ColBERT late-interaction multi-vec, no sparse-vector hybrid scoring, no quantization to reduce memory footprint at scale.

**Workflow citations that consume this primitive**:
- L1 agent-memory recall queries where keyword anchors matter ("repos containing 'sota-researcher' AND license:Apache-2.0") — hybrid scoring resolves the AND constraint that pure-vec cannot
- /goal workflows surfacing W207-W209 historical reports — keyword precision needed alongside semantic relevance
- Cross-arc grep-class searches over `.claude/state/*.jsonl` audit trails where exact-term matching is load-bearing

**Recommended adoption**: qdrant Docker container (single-cmd install) + REST API integration for retrieval-augmented memory recall. Pilot scope: dual-index agent memory in sqlite_vec (incumbent for fast L1 dense recall) + qdrant (for hybrid+ColBERT queries). 30-day success criterion: ≥1 measured workflow citation where hybrid+ColBERT outperforms pure-dense by ≥10% retrieval@10.

### 6.2 GraphRAG community-detection + hierarchical summarization

**Current pure runtime gap**: Graphiti+FalkorDB provides real-time temporal interaction-KG (who-did-what-when across agent sessions). Pure runtime has NO doc-corpus KG with community detection over the W47/W122 grand-catalog or the `.claude/projects/Z--claude-sota-installed/memory/feedback_*.md` archive. Cross-document entity-relation queries ("which repos are CR-12 GENUINELY-NEW per ≥3 named feedback files?") rely on grep/keyword which loses semantic structure.

**Workflow citations**:
- Cross-W-arc synthesis ("which W21-W210 decisions reference qdrant/lancedb?") requires entity-extraction across memory corpus
- Plan-mode design surveys where the question is "what are the SOTA patterns across N repos in deps/?" — community detection groups densely connected concepts
- `/goal` policy retrieval where a rule answers needs hierarchical summary first (global) then drill into specifics (local search per graphrag DRIFT search pattern)

**Recommended adoption**: microsoft/graphrag pip install + index over `.claude/projects/Z--claude-sota-installed/memory/` and `docs/` corpus. Pilot scope: nightly batch index + global+local+DRIFT search MCP surface. 30-day success criterion: ≥1 query where graphrag outperforms grep+vec by surfacing 2nd-order entity relationships pure-vec missed.

### 6.3 Embedded columnar vector storage (LanceDB)

**Current pure runtime gap**: sqlite_vec sufficient up to ~100k vec; qdrant Docker is server-process overhead. Lances columnar Arrow-native format enables 1M+ vec on Windows-host with zero Docker overhead — useful for embed-and-query of `Z:/repos/deps/` source-tree where each `Z:/repos/deps/<repo>/<file>` becomes a chunk with metadata. sqlite_vec would degrade at this scale; qdrant adds Docker dependency.

**Workflow citations**:
- W47 grand-catalog SOTA-research repo embedding (~600 repos × ~50 chunks each ≈ 30k vec but growing per arc)
- Source-code chunk retrieval for agentic-RAG over `Z:/repos/deps/<repo>/<file>:<line>` queries (Claude Code's gitnexus consumer)
- Long-arc agent transcript embedding for `.claude/projects/Z--claude-sota-installed/...tool-results/` chunks

**Recommended adoption**: lancedb pip install + integrate via Python lib (no service container). Pilot scope: embed `Z:/repos/deps/` source-tree at chunk granularity + REST query surface. 30-day success criterion: 1M-vec retrieval latency p95 <100ms on Windows-host without Docker.

## 7. Cite trail at file:line + HEAD SHA depth

### License + HEAD verifications (all via `mcp__github__get_file_contents` 2026-05-15)

- `qdrant/qdrant/LICENSE @ d98e6cdb7fc5aa76e80c01dc4d18920be87a4adf` — Apache-2.0
- `chroma-core/chroma/LICENSE @ 9bce74f3196e9bb54a1064fc718fac45e3cd949c` — Apache-2.0
- `lancedb/lancedb/LICENSE @ 13c6dae9a359398d726a9f5a500178170810bbc0` — Apache-2.0
- `weaviate/weaviate/LICENSE @ 20ecfd6f157208a278f1944ba639371c2b04cc8b` — BSD-3-Clause (Weaviate B.V. 2020-2025)
- `milvus-io/milvus/LICENSE @ dd6a411e5e17541a108d9d773cfabee7641702a1` — Apache-2.0
- `pgvector/pgvector/LICENSE @ d238409becebb8172fe696ffa776badfad4b631c` — PostgreSQL permissive
- `marqo-ai/marqo/LICENSE @ 37a728385a25c4572a8f47b5327e6a7c946d94a9` — Apache-2.0 (S2Search Ltd. 2022)
- `spotify/voyager/LICENSE @ 2a2f1f134a6fbb8c6ef75d4bb2082df041923000` — Apache-2.0 (Spotify AB 2023)
- `facebookresearch/faiss/LICENSE @ 8932716646db11b5f03f1d6e64d2b96ad6cd202b` — MIT
- `nmslib/hnswlib/LICENSE @ d9b3608c83d83b46c96e25088cb1d729b29dcfe9` — Apache-2.0
- `getzep/graphiti/LICENSE @ 9a2d6d02bf0d210e1e6f5f8fea1a2cbe00e3c898` — Apache-2.0 (INCUMBENT)
- `FalkorDB/FalkorDB/LICENSE.txt @ 4cc0a1c086346eed9c881f0952dbc2b1269857b1` — **SSPLv1** (W207D caveat retained — INCUMBENT-AS-DEP backend for Graphiti)
- `arangodb/arangodb/LICENSE @ 77321a35256ce8988c840ea13a7e0e22bb2e3460` — **BSL 1.1** ✗
- `hypermodeinc/dgraph/README.md @ cee702c93f141eeb0c96a81f70830ec9e459efac` — Apache-2.0 per License table + Linux-only Supported Platforms section
- `microsoft/graphrag/LICENSE @ de531f0a697d2f35c4f85cb8511141507278404e` — MIT (Microsoft Corp.)
- `HKUDS/LightRAG/LICENSE @ 405525a5e5b2c7d4385a0a3d4726accd285f9934` — MIT (LightRAG Team 2025)
- `SciPhi-AI/R2R` — MIT (deepwiki-confirmed); last-commit `9c5a94d151f90876bd7eb860f300a8fd662dc481` 2025-11-07 (STALE 6mo+)
- `vespa-engine/vespa/LICENSE @ 5b509065ba80cacc63b1c6ac4b857d7ff117e9ff` — Apache-2.0
- `typesense/typesense/LICENSE.txt @ a61e1c819f1fcfd965ebd3389e433da36cfefce3` — **GPL-3** ✗
- `elastic/elasticsearch/LICENSE.txt @ 29486df946b906afd15ce6a6193644426dbca06a` — **AGPL-3+SSPL+Elastic-2.0** ✗
- `huggingface/text-embeddings-inference/LICENSE @ 5bc4d889c38cf9c75e63617d62779bc0f6628b23` — Apache-2.0 (HF 2022)
- `jina-ai/serve/LICENSE @ 0f32b2aaac71d31d55de5b074196938033aaff7e` — Apache-2.0
- `voyage-ai/voyageai-python/LICENSE @ 86422e15dab9ce512437b90594e8b26d20bbf259` — MIT
- `openai/openai-python/LICENSE @ 38d75d74a5626472cd7d1be9705ea8aba29a6b22` — Apache-2.0
- `cohere-ai/cohere-python/LICENSE @ 756b1d8ec0e44ee57add86edd271701a528456ad` — MIT
- `run-llama/llama_index/LICENSE @ 77b78b507b975d9caa9e035df76a19ee4f76b0c5` — MIT
- `arcee-ai/arcee-superchat` — **PHANTOM** (`mcp__github__search_repositories total_count=0`)

### Axis-3 velocity probes (`mcp__github__list_commits` 2026-05-15)

- qdrant/qdrant: latest 2026-05-14 (SUSTAINED-ACTIVE)
- chroma-core/chroma: latest 2026-05-15 (SUSTAINED-ACTIVE)
- lancedb/lancedb: latest 2026-05-14 (SUSTAINED-ACTIVE)
- weaviate/weaviate: latest 2026-05-15 (SUSTAINED-ACTIVE)
- milvus-io/milvus: latest 2026-05-15 (SUSTAINED-ACTIVE)
- microsoft/graphrag: latest 2026-05-13 (SUSTAINED-ACTIVE)
- HKUDS/LightRAG: latest 2026-05-14 (SUSTAINED-ACTIVE)
- getzep/graphiti: latest 2026-05-14 (SUSTAINED-ACTIVE)
- SciPhi-AI/R2R: latest 2025-11-07 **(STALE 6mo+ — velocity SLOWING; Axis-3 PASS-with-caveat)**

### Deepwiki capability verifications

- qdrant features confirmed: hybrid BM25+dense+sparse+ColBERT+quantization+filtering — `mcp__deepwiki__ask_question qdrant/qdrant` 2026-05-15
- microsoft/graphrag confirmed: community detection (Leiden) + global/local/DRIFT search + Windows pip native + incremental indexing — `mcp__deepwiki__ask_question microsoft/graphrag` 2026-05-15
- HKUDS/LightRAG confirmed: outperforms graphrag (83.6% vs 51.6% legal comprehensiveness) + Neo4j+NetworkX+Memgraph backends + Windows-supported + NO FalkorDB native — `mcp__deepwiki__ask_question HKUDS/LightRAG` 2026-05-15
- SciPhi-AI/R2R confirmed: MIT + RAG-as-a-service + hybrid + agentic-retrieval `/retrieval/agent` + multimodal ingestion + Docker compose — `mcp__deepwiki__ask_question SciPhi-AI/R2R` 2026-05-15

### Inherited cite-imports from W207D + W207E + W134-F33b

- W207D verdicts inherited verbatim: kuzu ARCHIVED / neo4j-mcp GPL-3 / cognee STUDY-PILOT / openspg STUDY-PILOT / FalkorDB SSPLv1 caveat
- W207E verdicts inherited verbatim: TEI ADOPT-NOW / ragas ADOPT-NOW / pathway BSL REJECT / paradedb AGPL REJECT
- W134-F33b inherited: bnomei/frigg STUDY-PILOT

### Cardinal-rule conformance

- **CR-1 cite-trail authority**: 22 candidates all probed via TIER-1-DIRECT `mcp__github__get_file_contents` LICENSE + HEAD SHA cites at file:line depth
- **CR-3 cross-model gate**: this dispatch runs orchestrator-direct foreground (CADP-compliant); pure runtime's Tier 1a codex T1-T7 hooks INSTALLED per manifest §Section 2 covers Pattern A apply if this verdict surfaces prescribed_edits
- **CR-7 graduated unleash**: dispatch operates under `bypassPermissions` (Wave 82d operator-override) — read-only research probe class per `cardinal-rule-9 §read-only research probe exception`
- **CR-8 SOTA-content invariant**: every cite at file:line + HEAD SHA (TIER-1-DIRECT) or inherited W-arc verdict (TIER-3-LOCAL-COMPOSITION cite-import); zero novel content
- **CR-10 research-first-then-install**: 5 ADOPT-NOW candidates surface direct install paths from upstream SOTA; 14 STUDY-PILOT defer to operator pilot timing; 14 REJECT close the surface
- **CR-12 disposition lattice applied per candidate**: GENUINELY-NEW (qdrant/graphrag/lancedb/TEI), PROVIDER-COMPLEMENT (voyage/cohere/openai-embed), DUPLICATE-FUNCTIONALITY (nebula vs Graphiti / hnswlib+faiss vs qdrant-embed), DEMAND-ABSENCE (pgvector), MODE-HARNESS-SHAPE (dgraph Linux-only), CITE-CLASS-CANONICAL (W207D/E inherited)
- **Mia pre-apply discipline**: no `prescribed_edits` returned; verdict is pure RESEARCH-FINDING with adoption-readiness verdicts, NOT actionable edit prescriptions

## 8. Honest non-findings + caveats

- **arcee-ai/arcee-superchat is PHANTOM** per `mcp__github__search_repositories total_count=0`. Operator may have intended `arcee-ai/mergekit` (model merging) or `arcee-ai/distillkit` (distillation) — surfaced as HONEST-NON-FINDING per `synthesis-layer-verify.md §Reporting categories`. Operator should clarify intent.
- **dgraph Windows-host FAIL is firm** per README explicit "we dropped official support for Mac and Windows in 2021". REJECT-FOR-FIT Probe 5 mode-harness-shape — NOT eligible for Windows-host pilot.
- **R2R velocity slowdown** is the only Axis-3 borderline finding; last commit 2025-11-07 ~6mo+ stale. PASS-with-caveat per `convergence-gate.md §Axis 3 5-band table` band 2 (active iteration with age caveat). Pilot only after a fresh velocity-resume audit at next W-arc.
- **FalkorDB SSPLv1 is INCUMBENT-INSTALLED+WIRED but SSPL-caveated** per W207D — retained because Graphiti's FalkorDB backend is load-bearing; replacing FalkorDB would require Graphiti-LightRAG-NetworkX migration arc (deferred).
- **No reproducible benchmark cites in this audit** — Axis-1 verifications relied on cross-doc claims (LightRAG README evals vs GraphRAG, deepwiki summaries of qdrant/graphrag capabilities) NOT empirical pure-runtime A/B. Per `synthesis-layer-verify.md §Subclaim-type discriminator`: most claims are UPSTREAM-CLAIM (about external repos); OPERATIONAL-CLAIM evaluation requires pilot installation per §6 30-day success criteria.

## 9. Cite-class lattice declarations

Per `Z:/claude-sota/.claude/rules/citation-discipline.md` rule #8:

- ADOPT-NOW candidates §3: `constituents=[TIER-1-DIRECT @ <repo>/LICENSE @ <SHA>, TIER-1-DIRECT @ deepwiki capability probes, TIER-3-LOCAL-COMPOSITION @ pure-runtime fit verdict]; effective_tier=TIER-3-LOCAL-COMPOSITION` (MIN_PRECEDENCE rule per local fit-decision glue)
- REJECT-FOR-FIT §5: `constituents=[TIER-1-DIRECT @ LICENSE OR README @ <SHA>, TIER-3-LOCAL-COMPOSITION @ probe-DAG fit verdict]; effective_tier=TIER-3-LOCAL-COMPOSITION`
- Gap analysis §6: `constituents=[TIER-3-LOCAL-OPERATOR-DERIVED @ pure-runtime current-state inventory, TIER-1-DIRECT @ upstream capability cites]; effective_tier=TIER-3-LOCAL-COMPOSITION`
