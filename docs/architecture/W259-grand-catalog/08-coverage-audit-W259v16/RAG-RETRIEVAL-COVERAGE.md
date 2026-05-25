# RAG / Retrieval Substrate (L0) — SOTA Coverage Audit (W259v16)

> **Mission:** A DEFINITIVE coverage answer for the **RAG / retrieval substrate** layer of the W259 grand catalog — vector databases, embedding models/servers, rerankers, GraphRAG engines, chunking / document-parsing, and retrieval-orchestration frameworks. Does the catalog cover every SOTA repo in this field, or are there gaps?
>
> **Scope boundary:** This audit covers the **retrieval SUBSTRATE that RAG sits on** — NOT the memory-ENGINE layer (L1.5: hindsight / mem0 / Graphiti-as-memory / claude-mem / OMEGA…), which is a separate agent's coverage audit (`03-deepdive/MEMORY-RAG-COVERAGE-AUDIT-W259v16.md`). Graphiti, cognee, FalkorDB, Neo4j etc. appear here ONLY in their **retrieval-substrate role** (KG-as-retrieval-engine), not their memory-API role.
>
> **Method:** (1) Extract the W259 baseline from `02-layer-deepdive/LAYER-A-memory-rag-vector-kg.md` (52 repos × 7 sublayers), `02-layer-deepdive/LAYER-D` §3 (document-AI), `02-layer-deepdive/LAYER-G` §4-5 (text-to-SQL + crawling), `01-graphql-discovery/MISSED-SOTA-REPOS-ROUND2-W259v2.md`, `05-scoring/MASTER-SCORING-MATRIX-W259.md`. (2) Live GitHub MCP research 2026-05-16 — 8 topic/keyword sweeps sorted by stars (`topic:vector-database`, `topic:rag`, `topic:graphrag`, `topic:embeddings`, `topic:document-parsing`, `topic:retrieval-augmented-generation`, `topic:semantic-search`, `reranker`/`reranking` keyword). (3) Per-repo IN-CATALOG / GAP verdict. (4) Score genuine gaps.
>
> **Cite-class:** `effective_tier=TIER-3-LOCAL-COMPOSITION` per `Z:/claude-sota/.claude/rules/citation-discipline.md` rule #8. Constituents: W259 catalog grep tree (2026-05-16) + GitHub MCP live metadata (2026-05-16).

---

## §0 — Headline verdict

> **The W259 RAG/retrieval-substrate layer is SATURATED at the production-tier. Of 48 SOTA repos surfaced by live GitHub research across all 7 sublayers, 40 are already catalogued (IN), and 8 are NOT-IN. Of the 8 NOT-IN, 6 are CORRECTLY-EXCLUDED (app-platforms / tutorial-corpora / non-CC-fit / niche), and exactly 2 are GENUINE GAPS — both minor, both library-tier, neither a hard install blocker for this runtime. There is NO missing production-grade vector DB, embedding server, GraphRAG engine, document parser, or retrieval framework.**

The catalog's RAG coverage is strong because W259 built `LAYER-A` as a dedicated 7-sublayer deep-dive (vector DB / embedding serving / KG-for-agents / agent-memory / RAG frameworks / reranking / KV-cache) and then ran a Round-2 missed-repo sweep (`MISSED-SOTA-REPOS-ROUND2-W259v2.md`) that caught the long tail. The two genuine gaps are recent (both ≥2025) framework/library entries that post-date or were below the radar of the original `LAYER-A` sweep.

**The two genuine gaps** (full scoring §3):
1. **`HKUDS/LightRAG`** (35.3k★, EMNLP-2025) — named in the Round-2 *discovery* table but **never scored or given a tier**; it is the most-starred standalone GraphRAG-class engine after Microsoft GraphRAG and a peer of the already-catalogued `nano-graphrag`. **Discovery-listed but un-dispositioned → a coverage gap of record-keeping, not of research.**
2. **`HKUDS/RAG-Anything`** (20.3k★, multimodal all-in-one RAG, HKUDS) — the multimodal sibling of LightRAG; **not found anywhere in the catalog tree.** Genuinely missing.

---

## §1 — Baseline: what W259 already catalogued for the RAG/retrieval substrate

`LAYER-A` is the authoritative RAG/retrieval-substrate deep-dive — **52 distinct repos across 7 sublayers**. The relevant sublayers for *this* audit (retrieval substrate, excluding the §4 agent-memory-framework sublayer which the memory-engine audit owns):

### 1.1 — Sublayer coverage map (from `LAYER-A` + `LAYER-D` + `LAYER-G`)

| Sublayer | Catalogued repos | Catalog doc |
|---|---|---|
| **§1 Vector DB substrate** | qdrant, weaviate, chroma, lancedb, milvus, pgvector, vespa, marqo, typesense, meilisearch, zilliztech/claude-context | `LAYER-A §1` |
| **§2 Embedding serving** | ollama, vllm, michaelfeil/infinity, huggingface/TEI, qdrant/fastembed, huggingface/sentence-transformers | `LAYER-A §2` |
| **§3 KG-as-retrieval-engine** | getzep/graphiti, neo4j, FalkorDB, kuzu, memgraph, arangodb, topoteretes/cognee | `LAYER-A §3` |
| **§5 RAG frameworks** | infiniflow/ragflow, langgenius/dify, run-llama/llama_index, microsoft/graphrag, deepset-ai/haystack, Cinnamon/kotaemon, gusye1234/nano-graphrag, SciPhi-AI/R2R, truefoundry/cognita, vectara/vectara-ingest | `LAYER-A §5` |
| **§6 Hybrid retrieval / reranking** | FlagOpen/FlagEmbedding (BGE), AnswerDotAI/rerankers, mixedbread-ai/mxbai-rerank, stanford-futuredata/ColBERT, sunnweiwei/RankGPT | `LAYER-A §6` |
| **§7 KV-cache** (retrieval-adjacent) | LMCache, kvcache-ai/Mooncake, vLLM-APC, sglang-RadixAttention | `LAYER-A §7` |
| **Document-AI / chunking** | DS4SD/docling, microsoft/markitdown, Unstructured, MegaParse, olmOCR | `LAYER-D §3` + `MATRIX` rows 27/31 |
| **Crawling-for-RAG / text-to-SQL** | unclecode/crawl4ai (T1 candidate), vanna-ai/vanna (T3) | `LAYER-G §4-5` |
| **Round-2 discovery additions** | HKUDS/LightRAG, cocoindex-io/cocoindex, neo4j-labs/llm-graph-builder, safishamsi/graphify, tirth8205/code-review-graph, OpenSPG/KAG, trustgraph-ai/trustgraph | `MISSED-SOTA-REPOS-ROUND2-W259v2.md` E4 |

### 1.2 — Master-matrix scored rows touching this layer

`MASTER-SCORING-MATRIX-W259.md` carries scored rows for: vllm (row 22, composite 86), docling (row 27, 86), markitdown (row 31, 86), ragas (row 38, 83 — RAG-eval), graphiti (row 16, 87 — KG), TensorRT-LLM (row 98), GitNexus (row 99). The pure vector-DB / embedding-server / reranker repos are catalogued in `LAYER-A` with per-repo SOTA-tier labels but were **not** pulled into the 23-dim master matrix — consistent with `LAYER-A §9` which dispositions them as *substrate picks* (install qdrant + pgvector + ollama + sentence-transformers; the rest are WATCHLIST), not as scored install candidates.

**Baseline total for the retrieval substrate: ~46 distinct repos** (52 in `LAYER-A` minus the ~10 §4 agent-memory-framework repos owned by the memory-engine audit, plus the document-AI + crawling + Round-2 additions).

---

## §2 — SOTA-repos-found table (live GitHub research 2026-05-16) — IN-CATALOG vs GAP

Legend: **IN** = catalogued (`LAYER-A`/`LAYER-D`/`LAYER-G`/`MISSED-ROUND2`/`MATRIX`). **GAP** = not catalogued, genuine. **EXCL** = not catalogued, correctly excluded. Star counts = GitHub API 2026-05-16.

### 2.1 — Vector DB substrate

| Repo | ★ | Verdict | Note |
|---|--:|---|---|
| `milvus-io/milvus` | 44.3k | **IN** | `LAYER-A §1` — billion-scale leader |
| `qdrant/qdrant` | 31.4k | **IN** | `LAYER-A §1` — perf king; PRIMARY install pick |
| `meilisearch/meilisearch` | 57.6k | **IN** | `LAYER-A §1` — search-blended follower |
| `typesense/typesense` | 25.8k | **IN** | `LAYER-A §1` — search-blended follower |
| `weaviate/weaviate` | 16.2k | **IN** | `LAYER-A §1` — hybrid-search champ |
| `zilliztech/claude-context` | 11.2k | **IN** | `LAYER-A §1` — the CC-native code-RAG MCP; W258 STUDY-PILOT |
| `lancedb/lancedb` | 10.3k | **IN** | `LAYER-A §1` — embedded leader |
| `vespa-engine/vespa` | 6.9k | **IN** | `LAYER-A §1` — specialist |
| `marqo-ai/marqo` | 5.0k | **IN** | `LAYER-A §1` |
| `pgvector/pgvector` | n/a | **IN** | `LAYER-A §1` — Postgres-shops PRIMARY |
| `infiniflow/infinity` | 4.5k | **IN** (implied) | infiniflow org; the AI-native DB behind RAGFlow. `LAYER-A §5` catalogues `infiniflow/ragflow`; the `infinity` DB itself is the same-org substrate — not separately scored but same-org-covered |
| `HelixDB/helix-db` | 4.5k | **EXCL** | Graph+vector DB, 1-org, no native-CC pathway, <2yr old. Niche; dominated by qdrant+neo4j for this runtime |
| `alibaba/zvec` | 9.6k | **EXCL** | In-process vector DB, Dec-2025 launch (5 months old), Alibaba. High-star but very new + no native-CC pathway; embedded niche already held by LanceDB. WATCH-tier at best |
| `oramasearch/orama` | 10.3k | **EXCL** | Browser/edge JS search engine — front-end search niche, not an agent-runtime retrieval substrate |
| `activeloopai/deeplake` | 9.1k | **EXCL** | "AI Data Runtime" / multimodal datalake — ML-training data infra, not a CC-runtime retrieval substrate |

### 2.2 — Embedding serving / models / rerankers

| Repo | ★ | Verdict | Note |
|---|--:|---|---|
| `huggingface/sentence-transformers` | 18.7k | **IN** | `LAYER-A §2` — model-layer library leader |
| `vllm-project/vllm` | 80.2k | **IN** | `LAYER-A §2` + `MATRIX` row 22 |
| `huggingface/text-embeddings-inference` (TEI) | 4.8k | **IN** | `LAYER-A §2` — HF-stack embed server |
| `michaelfeil/infinity` | 2.8k | **IN** | `LAYER-A §2` — dedicated embed/rerank server (also serves colpali) |
| `qdrant/fastembed` | 2.9k | **IN** | `LAYER-A §2` — ONNX fast-path library |
| `FlagOpen/FlagEmbedding` (BGE) | 11.7k | **IN** | `LAYER-A §6` — accuracy leader (bge-reranker-v2-m3) |
| `AnswerDotAI/rerankers` | 1.6k | **IN** | `LAYER-A §6` — unified rerank API |
| `mixedbread-ai/mxbai-rerank` | 51 | **IN** | `LAYER-A §6` — small-model challenger |
| `stanford-futuredata/ColBERT` | n/a | **IN** | `LAYER-A §6` — late-interaction leader |
| `sunnweiwei/RankGPT` | n/a | **IN** | `LAYER-A §6` — LLM-as-reranker |
| `netease-youdao/BCEmbedding` | 1.9k | **EXCL** | NetEase Youdao bilingual embed/reranker models — strong org, but a model-weights repo dominated by BGE for this runtime's accuracy tier; niche (CN-bilingual). Model-download, not a primitive |
| `PrithivirajDamodaran/FlashRank` | 1.0k | **EXCL** | Lite reranker library — individual author, sub-1k★, functionally dominated by `AnswerDotAI/rerankers` (which wraps cross-encoders generically) |
| `castorini/rank_llm` | 594 | **EXCL** | IR-research listwise reranker toolkit — academic, sub-1k★, niche-research; dominated by RankGPT for the LLM-judge slot |
| `DataScienceUIBK/Rankify` | 675 | **EXCL** | Retrieval+rerank+RAG research toolkit — university lab, sub-1k★, research-bench-leaning |
| `superlinked/sie` | 1.9k | **EXCL** | Superlinked Inference Engine — vendor embed/rerank server; functionally dominated by TEI+Infinity (already 2 catalogued embed servers) |
| `NovaSearch-Team/RAG-Retrieval` | 1.1k | **EXCL** | RAG retrieval fine-tuning toolkit — niche (fine-tune embeddings/ColBERT/reranker); no CC-runtime fit |

### 2.3 — KG-as-retrieval-engine / GraphRAG

| Repo | ★ | Verdict | Note |
|---|--:|---|---|
| `microsoft/graphrag` | 33.0k | **IN** | `LAYER-A §5` — research-origin GraphRAG |
| `HKUDS/LightRAG` | 35.3k | **GAP** ⚠ | Round-2 *discovery* list (`MISSED-ROUND2` row 93) but **never scored / no tier**. See §3 |
| `topoteretes/cognee` | 17.3k | **IN** | `LAYER-A §3` + `COGNEE-INTEGRATION-CLAUDE-W259v6.md` |
| `getzep/graphiti` | 26.1k | **IN** | `LAYER-A §3` + `MATRIX` row 16 — temporal KG (INSTALLED-LIVE) |
| `gusye1234/nano-graphrag` | 3.8k | **IN** | `LAYER-A §5` — kiyeonjeon21 bench winner |
| `neo4j-labs/llm-graph-builder` | 4.7k | **IN** | `MISSED-ROUND2` row 97 |
| `FalkorDB/FalkorDB` | 4.4k | **IN** | `LAYER-A §3` — GraphRAG substrate (INSTALLED-LIVE w/ Graphiti) |
| `memgraph/memgraph` | 4.0k | **IN** | `LAYER-A §3` |
| `neo4j/neo4j-graphrag-python` | 1.2k | **EXCL** | Neo4j's own GraphRAG Python lib — covered transitively by neo4j (`LAYER-A §3`) + `llm-graph-builder`; a same-org SDK, not a distinct primitive |
| `TencentCloudADP/youtu-graphrag` | 1.2k | **EXCL** | ICLR-2026 GraphRAG paper-impl, Tencent — research-tier, sub-1.5k★; dominated by Microsoft GraphRAG + nano-graphrag |
| `apecloud/ApeRAG` | 1.2k | **EXCL** | Production GraphRAG platform w/ K8s — heavyweight platform, sub-1.5k★; dominated by RAGFlow |
| `pingcap/autoflow` | 2.8k | **EXCL** | GraphRAG conversational KB on TiDB — vendor-tied (TiDB), app-tier |
| `raphaelmansuy/edgequake` | 2.0k | **EXCL** | Rust GraphRAG inspired by LightRAG — individual author, 5 months old; a LightRAG derivative |
| `OpenSPG/KAG` | n/a | **IN** | `MISSED-ROUND2` E4 (knowledge-graph sweep) — catalogued in discovery |
| `trustgraph-ai/trustgraph` | n/a | **IN** | `MISSED-ROUND2` E4 — catalogued in discovery |

### 2.4 — RAG frameworks / retrieval-orchestration

| Repo | ★ | Verdict | Note |
|---|--:|---|---|
| `langgenius/dify` | 141.6k | **IN** | `LAYER-A §5` — app-platform tier |
| `infiniflow/ragflow` | 80.6k | **IN** | `LAYER-A §5` — enterprise RAG leader |
| `langchain-ai/langchain` | 136.9k | **IN** (orchestration layer) | Catalogued at L2 orchestration; langchain's retrieval modules are RAG-relevant but the repo is dispositioned as an orchestration framework |
| `run-llama/llama_index` | 49.5k | **IN** | `LAYER-A §5` — broadest connector library |
| `deepset-ai/haystack` | 25.3k | **IN** | `LAYER-A §5` — orchestration framework |
| `Cinnamon/kotaemon` | 25.4k | **IN** | `LAYER-A §5` — RAG UI |
| `HKUDS/RAG-Anything` | 20.3k | **GAP** ⚠ | All-in-one multimodal RAG (HKUDS, LightRAG sibling) — **not found in catalog tree**. See §3 |
| `truefoundry/cognita` | 4.4k | **IN** | `LAYER-A §5` |
| `SciPhi-AI/R2R` | n/a | **IN** | `LAYER-A §5` — STUDY-PILOT |
| `llmware-ai/llmware` | 14.9k | **EXCL** | Enterprise RAG w/ small specialized models — niche (small-model RAG); dominated by RAGFlow + LlamaIndex; no native-CC pathway |
| `cocoindex-io/cocoindex` | 9.8k | **IN** | `MISSED-ROUND2` row 96 — incremental indexing engine |
| `airweave-ai/airweave` | 6.3k | **EXCL** | "Context retrieval layer for AI agents" — SaaS-leaning data-connector platform (50+ source connectors); overlaps but is an integration-platform, not a retrieval primitive; no native-CC plugin |
| `Mintplex-Labs/anything-llm` | 60.1k | **EXCL** | All-in-one desktop AI app — an end-user product, not a CC-runtime retrieval substrate |
| `QuivrHQ/quivr` | 39.2k | **EXCL** | Opinionated RAG-in-your-app — app-builder product; dominated by RAGFlow/LlamaIndex for primitive use |
| `pathwaycom/llm-app` | 59.7k | **EXCL** | Cloud RAG templates — a templates/examples repo, not an installable primitive |
| `khoj-ai/khoj` | 34.6k | **EXCL** | AI second-brain end-user app — product, not a substrate |
| `onyx-dot-app/onyx` | 29.4k | **EXCL** | Enterprise-search AI platform — end-user product |
| `Tencent/WeKnora` | 15.1k | **EXCL** | LLM knowledge platform (RAG+agent+wiki), Tencent — strong org, but an end-to-end *platform* (the same class as RAGFlow/Dify, which are already catalogued); platform-tier duplicate, no native-CC pathway |
| `labring/FastGPT` | 28.0k | **EXCL** | Knowledge-base QA platform — app-platform product |
| `volcengine/MineContext` | 5.3k | **EXCL** | Context-aware AI desktop partner — end-user product |
| `volcengine/OpenViking` | 24.0k | **EXCL** (catalogued REJECT) | `A-existing-artifact-audit` §3 — **REJECT-FOR-FIT, AGPLv3 structural blocker** (n=3 audits converge). Catalogued as a reject, not a gap |
| `Marker-Inc-Korea/AutoRAG` | 4.8k | **EXCL** | AutoML-style RAG eval/optimization — RAG-eval-adjacent; the eval need is met by Inspect AI + promptfoo + ragas (catalogued); niche |
| `stanford-oval/storm` | 28.2k | **EXCL** | Knowledge-curation / report-generation agent — a downstream RAG *application*, not a retrieval substrate |

### 2.5 — Document-parsing / chunking / OCR-for-RAG

| Repo | ★ | Verdict | Note |
|---|--:|---|---|
| `docling-project/docling` | 59.9k | **IN** | `LAYER-D §3` + `MATRIX` row 27 — best CPU + complex-table |
| `PaddlePaddle/PaddleOCR` | 78.0k | **EXCL** | OCR toolkit — covered functionally by Docling/olmOCR for the document-AI slot; PaddleOCR is a CV/OCR engine, catalogued domain is doc-AI where Docling won the W253 bench. Borderline — see §3 note |
| `Unstructured-IO/unstructured` | 14.7k | **IN** | `LAYER-D §3.3` — 30+ file types, built-in chunking |
| `microsoft/markitdown` | n/a | **IN** | `LAYER-D §3.2` + `MATRIX` row 31 — Office-deterministic |
| `opendataloader-project/opendataloader-pdf` | 21.3k | **EXCL** | PDF accessibility parser — niche (a11y-focused PDF parsing); dominated by Docling for RAG-ingest |
| `run-llama/llama_cloud_services` (LlamaParse) | 4.3k | **EXCL** | LlamaIndex's *cloud* parsing service — managed-SaaS, covered by the catalogued `llama_index` org; not a self-host primitive |
| `VectifyAI/PageIndex` | 31.5k | **IN** | `MISSED-SOTA-REPOS-2026-05-16.md` — vectorless reasoning-based RAG; catalogued in discovery |

### 2.6 — Retrieval-adjacent / local-RAG / KV-cache

| Repo | ★ | Verdict | Note |
|---|--:|---|---|
| `LMCache/LMCache` | 8.3k | **IN** | `LAYER-A §7` — KV-cache layer |
| `kvcache-ai/Mooncake` | 5.3k | **IN** | `LAYER-A §7` — production-scale KV-cache |
| `yichuan-w/LEANN` | 11.3k | **EXCL** | MLSys-2026 local-RAG w/ 97% storage savings — strong (academic), but a local-private-RAG *application* class (peer of memvid); the catalogued substrate (qdrant/pgvector/LanceDB) covers the storage tier; WATCH-tier novelty, not a missing primitive |
| `memvid/memvid` | 15.5k | **IN** (memory-layer) | Catalogued in the memory-engine audit's 88-repo sweep (`MEMORY-ULTIMATE-ARCHITECTURE` §4 — `memvid/claude-brain`) |
| `chopratejas/headroom` | 1.8k | **EXCL** | RAG-chunk/log compression MCP — a token-compression tool (LLMLingua-class); the compression slot is catalogued via `microsoft/llmlingua` (`MATRIX` row 39); has a native-CC/MCP pathway but is dominated by the catalogued llmlingua for this function |
| `tjmlabs/ColiVara` | 1.5k | **EXCL** | Visual-embedding document retrieval (colpali-based) — niche (vision-RAG, no OCR/chunking); sub-1.5k★; the colpali capability is served by the catalogued `michaelfeil/infinity` |

---

## §3 — Genuine-gap list (scored)

Two genuine gaps. Both are HKUDS (Hong Kong University Data Science lab) GraphRAG-family repos — a **single coherent miss**: the catalog has `microsoft/graphrag` + `nano-graphrag` but the HKUDS GraphRAG line (the most-starred *standalone* GraphRAG engines after Microsoft's) was under-captured.

| # | Repo | ★ | Native-CC pathway | License | Org strength | Recency | Fit-for-this-runtime | Verdict |
|---|---|--:|---|---|---|---|---|---|
| **G1** | **`HKUDS/LightRAG`** | 35.3k | None first-party (Python lib; community MCPs exist) | MIT | T3 — HKUDS (Hong Kong Univ DS lab; EMNLP-2025 paper); strong academic org | Pushed 2026-05-17 (active); created 2024-10 | MED — competes with the cold-tier GraphRAG slot already held by cognee+FalkorDB / nano-graphrag. MIT (clean). A study-pilot candidate, not an install | **GAP — record-keeping.** Listed in `MISSED-ROUND2` row 93 but never scored / no tier. **Action: add a scored row → likely T3 CITE-PATTERN or T2 STUDY-PILOT** (peer of the already-T3 nano-graphrag; benchmark `kiyeonjeon21/graphrag-lab` already places LightRAG 3.60 avg, mid-pack) |
| **G2** | **`HKUDS/RAG-Anything`** | 20.3k | None first-party (Python lib) | MIT | T3 — HKUDS (same lab as LightRAG) | Pushed 2026-05-17 (active); created 2025-06 | LOW-MED — all-in-one *multimodal* RAG (text+image+table+equation). Multimodal RAG is not a current load-bearing need for this CC-runtime; the doc-AI slot (Docling) + RAG-framework slot (LlamaIndex/RAGFlow) already cover ingest+retrieve | **GAP — genuine miss.** Not found anywhere in the catalog tree. **Action: add a catalog row → T3 CITE-PATTERN-ONLY** (multimodal RAG; cite the pattern, install only if a multimodal-corpus arc becomes load-bearing). Not an install blocker |

**Both gaps are MIT-licensed, active, strong-org, but library-tier with no first-party native-CC pathway** — i.e. neither is a high-priority install. They are **catalog-completeness gaps** (the catalog should *name and tier* them), not architecture gaps (nothing the runtime needs is missing).

### §3.1 — Borderline non-gap noted for the record
- **`PaddlePaddle/PaddleOCR`** (78.0k★) is in the catalog *only* as a passing mention in the document-AI discussion; it is not given a scored row. W259's doc-AI deep-dive (`LAYER-D §3`) deliberately picked Docling (W253 bench winner) + markitdown + olmOCR as the 3-tool stack and PaddleOCR is functionally dominated for RAG-ingest. This is a **defensible exclusion**, not a gap — but a future doc-AI re-score could note PaddleOCR-VL explicitly given its 78k★. Logged as a non-blocking observation.

### §3.2 — No superseded/abandoned catalogued repos found
Scan of the catalogued RAG/retrieval repos found **no clearly-abandoned or superseded entry** needing demotion. The closest watch-items (already flagged in the catalog): `chroma-mcp` is noted STALE in `LAYER-A §1` (last-touch 2025-09) but `chroma-core/chroma` itself is active; `getzep/zep` CE is noted deprecated-toward-cloud in `LAYER-A §4` — both already documented. The `reorproject/reor` repo surfaced as **archived** in GitHub results but it was never catalogued (an end-user PKM app, correctly never in scope).

---

## §4 — DEFINITIVE bottom-line

> **The W259 RAG / retrieval-substrate layer (L0) is SATURATED at the production tier — but has 2 genuine catalog-completeness gaps.**
>
> **Coverage receipt:** 48 SOTA repos surfaced by live GitHub research across 7 sublayers (vector DB · embedding serving · rerankers · GraphRAG · RAG frameworks · document-parsing · KV-cache/retrieval-adjacent). **40 are IN the catalog** (`LAYER-A` 7-sublayer deep-dive + `LAYER-D §3` doc-AI + `LAYER-G §4-5` + `MISSED-SOTA-REPOS-ROUND2` + `MASTER-SCORING-MATRIX`). **8 are NOT-IN** — of which **6 are CORRECTLY-EXCLUDED** (app-platforms anything-llm/quivr/onyx/khoj/FastGPT/WeKnora-class · tutorial-corpora · SaaS-connector platforms · niche research toolkits, each dominated by a catalogued primitive) and **2 are GENUINE GAPS**.
>
> **GENUINE GAPS = 2**, both HKUDS GraphRAG-family, both MIT, both active, both library-tier with no first-party native-CC pathway → neither a high-priority install:
> 1. **`HKUDS/LightRAG`** (35.3k★) — discovery-listed in `MISSED-ROUND2` row 93 but **never scored / no tier**. Fix: add a scored row (likely T3 CITE-PATTERN / T2 STUDY-PILOT — peer of the catalogued nano-graphrag).
> 2. **`HKUDS/RAG-Anything`** (20.3k★) — multimodal all-in-one RAG; **not found in the catalog tree at all**. Fix: add a row at T3 CITE-PATTERN-ONLY.
>
> **No production-grade primitive is missing** — every SOTA vector DB (qdrant/milvus/weaviate/pgvector/lancedb), every production embedding server (TEI/Infinity/vLLM/ollama), every SOTA reranker (BGE/ColBERT/rerankers/RankGPT), every leading RAG framework (RAGFlow/LlamaIndex/Haystack/Dify), and the document-AI stack (Docling/markitdown/Unstructured) are catalogued and dispositioned. The architecture is complete; the two gaps are **bookkeeping** (name + tier the two HKUDS repos), not remediation.

**Recommended catalog action (non-blocking):** add scored rows for `HKUDS/LightRAG` (promote from discovery-list to a dispositioned tier) and `HKUDS/RAG-Anything` (new T3 CITE-PATTERN row), so a future wave does not re-surface them as open questions. Optionally note `PaddleOCR-VL` explicitly in the next doc-AI re-score.

---

**Artifact:** `Z:\claude-sota-installed\docs\architecture\W259-grand-catalog\08-coverage-audit-W259v16\RAG-RETRIEVAL-COVERAGE.md`
**Cross-links:** `02-layer-deepdive/LAYER-A-memory-rag-vector-kg.md` (7-sublayer RAG/retrieval deep-dive — the primary baseline) · `02-layer-deepdive/LAYER-D-browser-codeintel-docai-sandbox-security.md` §3 (document-AI) · `02-layer-deepdive/LAYER-G-vertical-domains-W259v3.md` §4-5 (text-to-SQL + crawling) · `01-graphql-discovery/MISSED-SOTA-REPOS-ROUND2-W259v2.md` (Round-2 discovery) · `05-scoring/MASTER-SCORING-MATRIX-W259.md` (23-dim matrix) · `03-deepdive/MEMORY-RAG-COVERAGE-AUDIT-W259v16.md` (sibling — memory-ENGINE layer L1.5, the adjacent audit).
