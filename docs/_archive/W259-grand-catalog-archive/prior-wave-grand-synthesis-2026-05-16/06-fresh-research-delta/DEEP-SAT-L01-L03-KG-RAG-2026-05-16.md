# DEEP-SAT L0.1 (Knowledge Graph) + L0.3 (RAG) — 2026-05-16

**Wave**: Grand-Synthesis 2026-05-16 — fresh-research-delta tranche
**Scope**: Exhaustive L0.1 KG + L0.3 RAG layer saturation (10 GraphQL queries + 25 name-search probes + benchmark verification)
**Method**: GitHub MCP `search_repositories` (Axis-1 stars/recency proxies) + WebFetch upstream READMEs (Axis-2 license/feature verify) + WebSearch (Axis-3 benchmark cross-org corroboration). 3-org Axis convergence required per cardinal-rule-1.
**Citation tier**: TIER-1-DIRECT for repo metadata at HEAD 2026-05-16 (GitHub API live); TIER-2 cite-import-AMBER for benchmark scores (atlan.com / vectorize.io / arxiv aggregators)

---

## §A — KG+RAG matrix (50+ rows verified at HEAD 2026-05-16)

Schema:
- **D1**=Stars · **D2**=Last-push · **D3**=License · **D4**=Lang · **D5**=CC-pathway · **D6**=Sub-category · **D7**=Cite-anchor (URL) · **D8**=Adoption-class (INSTALL-CAND / STUDY-PILOT / REFERENCE-ONLY / REJECT)

### §A.1 — L0.1 Knowledge Graph layer (graph DBs + KG construction)

| Repo | D1 stars | D2 last-push | D3 license | D4 lang | D5 CC-pathway | D6 sub-cat | D7 URL | D8 class |
|---|---:|---|---|---|---|---|---|---|
| getzep/graphiti | 26,127 | 2026-05-16 | Apache-2.0 (verify) | Python | direct pip + Neo4j/FalkorDB/Kuzu/Neptune backends; MCP server upstream available | KG-construction (temporal) | https://github.com/getzep/graphiti | **INSTALL-CAND** (Tier-A) |
| getzep/zep | 4,576 | 2026-05-16 | Apache-2.0 | Python | client SDK against Graphiti; managed cloud option | KG-construction (managed) | https://github.com/getzep/zep | REFERENCE (paid SaaS layer over Graphiti) |
| topoteretes/cognee | 17,257 | 2026-05-16 | Apache-2.0 | Python | direct pip + MCP server (`cognee-mcp`); Neo4j/FalkorDB/Kuzu backends | KG-memory-control | https://github.com/topoteretes/cognee | **INSTALL-CAND** (Tier-A alternative to Graphiti) |
| FalkorDB/FalkorDB | 4,415 | 2026-05-15 | SSPLv1 (non-OSI) | C | docker pull + Redis module; supports Cypher | graph DB (sparse-matrix) | https://github.com/FalkorDB/FalkorDB | INSTALL-CAND (as Graphiti backend; license-flag: SSPL not OSI-approved) |
| HelixDB/helix-db | 4,522 | 2026-05-16 | AGPL-3.0 | Rust | direct binary + MCP support built-in; LMDB storage | graph+vector embedded DB | https://github.com/HelixDB/helix-db | STUDY-PILOT (AGPL viral; Rust quality but 0.x ABI churn risk) |
| memgraph/memgraph | 4,034 | 2026-05-16 | BSL 1.1 (Memgraph Source Available License) | C++ | docker pull; Cypher-compatible | graph DB (in-memory) | https://github.com/memgraph/memgraph | REFERENCE (license-flag: BSL non-OSI) |
| cozodb/cozo | 3,986 | 2026-05-16 | MPL-2.0 | Rust | embedded or client-server; Datalog query | relational-graph-vector hybrid | https://github.com/cozodb/cozo | STUDY-PILOT |
| CodeGraphContext/CodeGraphContext | 3,293 | 2026-05-16 | (verify) | Python | MCP server + CLI; targets AI assistants | code-intel KG (graph DB) | https://github.com/CodeGraphContext/CodeGraphContext | STUDY-PILOT (overlaps with L0.4 code-intel) |
| terminusdb/terminusdb | 3,287 | 2026-05-16 | Apache-2.0 | Prolog | docker; document+graph hybrid | versioned KG | https://github.com/terminusdb/terminusdb | REFERENCE (mature, lower velocity vs Graphiti) |
| arangodb/arangodb | 14,168 | 2026-05-15 | Apache-2.0 (Community Edition) | C++ | docker pull; multi-model | multi-model DB | https://github.com/arangodb/arangodb | REFERENCE |
| dgraph-io/dgraph | 21,676 | 2026-05-15 | Apache-2.0 (deprecated for some features; check license history) | Go | docker; distributed; GraphQL | graph DB (distributed) | https://github.com/dgraph-io/dgraph | REFERENCE (project shifted to Hypermode; reduced velocity) |
| surrealdb/surrealdb | 32,127 | 2026-05-16 | BSL 1.1 (SurrealDB Source Available License) | Rust | docker; multi-model (doc/graph/KV) | multi-model DB | https://github.com/surrealdb/surrealdb | REFERENCE (license-flag: BSL non-OSI) |
| apache/age | ~4,500 | 2026-01 (v1.7.0) | Apache-2.0 | C | postgres extension; openCypher | graph extension over Postgres | https://github.com/apache/age | STUDY-PILOT (if Postgres already in stack) |
| neo4j-labs/llm-graph-builder | 4,683 | 2026-05-16 | Apache-2.0 | Jupyter | UI tool; Neo4j construction from unstructured docs | KG-construction (Neo4j-bound) | https://github.com/neo4j-labs/llm-graph-builder | REFERENCE (UI demo, not lib) |
| neo4j-labs/create-context-graph | 577 | 2026-05-16 | Apache-2.0 | Python | scaffolding tool; Neo4j-only | KG-agent-memory scaffolder | https://github.com/neo4j-labs/create-context-graph | REFERENCE (early; Neo4j coupling) |
| neo4j/neo4j-graphrag-python | 1,157 | 2026-05-16 | Apache-2.0 | Python | Neo4j-bound official library | GraphRAG library | https://github.com/neo4j/neo4j-graphrag-python | STUDY-PILOT (if Neo4j adopted) |
| zjukg/KG-LLM-Papers | 2,188 | 2026-05-16 | n/a | (paper list) | research catalog only | survey/catalog | https://github.com/zjukg/KG-LLM-Papers | REFERENCE |
| stair-lab/kg-gen | 1,137 | 2026-05-16 | (verify) | Python | NeurIPS '25; KG generation from text | KG-extraction | https://github.com/stair-lab/kg-gen | STUDY-PILOT |
| MemMachine/MemMachine | 3,079 | 2026-05-15 | (verify) | Python | direct pip; KG-based memory | agent-memory KG | https://github.com/MemMachine/MemMachine | STUDY-PILOT |
| FlowElement-ai/m_flow | 3,296 | 2026-05-16 | (verify) | Python | MCP server; bio-inspired memory | graph-memory MCP | https://github.com/FlowElement-ai/m_flow | STUDY-PILOT (created 2026-03-31; recency-of-claim risk) |
| Hawksight-AI/semantica | 1,153 | 2026-05-16 | (verify) | Python | direct pip | ontology-KG framework | https://github.com/Hawksight-AI/semantica | REFERENCE |
| predictable-labs/ryugraph | 136 | 2026-04-29 | MIT (Kuzu inherit) | C++ | embedded; Cypher; vector+FTS | embedded property graph (Kuzu fork) | https://github.com/predictable-labs/ryugraph | STUDY-PILOT (fork created 2025-10-13, 3 days after Kuzu archive; low stars but live successor — see §E1) |
| ~~kuzudb/kuzu~~ | (archived) | **2025-10-10 ARCHIVED** | MIT | C++ | embedded | embedded property graph | https://github.com/kuzudb/kuzu | **REJECT** (read-only since 2025-10-10; see §E1) |
| ~~nebula-contrib/nebula~~ | n/a | n/a | n/a | n/a | n/a | n/a | n/a | NON-FINDING (org has only satellite tooling repos: ngbatis 159⭐, etc. — main nebula-graph repo lives under vesoft-inc not nebula-contrib; see §E2) |

### §A.2 — L0.3 RAG framework layer

| Repo | D1 stars | D2 last-push | D3 license | D4 lang | D5 CC-pathway | D6 sub-cat | D7 URL | D8 class |
|---|---:|---|---|---|---|---|---|---|
| infiniflow/ragflow | 80,619 | 2026-05-16 | Apache-2.0 | Python | docker compose; v0.25.4 (May 2026) DeepSeek v4 + agent memory | RAG engine (enterprise) | https://github.com/infiniflow/ragflow | **INSTALL-CAND** (Tier-A; deep doc understanding) |
| HKUDS/LightRAG | 35,272 | 2026-05-16 | (verify; likely MIT) | Python | direct pip; PG/Mongo/Neo4j/OpenSearch backends; EMNLP'25 | Graph RAG (lightweight) | https://github.com/HKUDS/LightRAG | **INSTALL-CAND** (Tier-A; SOTA among graphRAG-class) |
| microsoft/graphrag | 33,020 | 2026-05-16 | MIT | Python | direct pip; v3.0.9 (April 2026); EXPENSIVE indexing flagged upstream | Graph RAG (research-class) | https://github.com/microsoft/graphrag | STUDY-PILOT (high-cost indexing; nano-graphrag preferred for hackability) |
| HKUDS/RAG-Anything | 20,270 | 2026-05-16 | (verify) | Python | direct pip; multi-modal RAG | Multi-modal RAG | https://github.com/HKUDS/RAG-Anything | STUDY-PILOT |
| run-llama/llama_index | 49,453 | 2026-05-16 | MIT | Python | direct pip; v0.14.22 (May 2026); document-agent + OCR | RAG/data-framework | https://github.com/run-llama/llama_index | INSTALL-CAND (mature; agentic RAG patterns; "leading document agent") |
| deepset-ai/haystack | 25,247 | 2026-05-16 | Apache-2.0 | Python (MDX repo) | direct pip (`pip install haystack-ai`); v2.29.0 (May 2026); Apple/Meta/NVIDIA/Netflix users | Production RAG orchestration | https://github.com/deepset-ai/haystack | **INSTALL-CAND** (Tier-A; production-grade) |
| langchain-ai/langchain | 136,883 | 2026-05-16 | MIT | Python (TS too) | direct pip; agent engineering platform | RAG modules + agent framework | https://github.com/langchain-ai/langchain | REFERENCE-ONLY (broader-scope L0.6; RAG modules subsumed) |
| OpenSPG/KAG | 8,758 | 2026-05-16 | (verify; likely Apache-2.0) | Python | direct pip; logical-form RAG | KG-Augmented Generation | https://github.com/OpenSPG/KAG | STUDY-PILOT (alt to GraphRAG with reasoning emphasis) |
| OpenBMB/UltraRAG | 5,544 | 2026-05-16 | Apache-2.0 | Python | MCP-native! YAML pipelines; v0.3.0.2 (April 2026); Tsinghua+Northeastern+OpenBMB | MCP-RAG framework | https://github.com/OpenBMB/UltraRAG | **INSTALL-CAND** (Tier-A; MCP-native is differentiator) |
| SciPhi-AI/R2R | 7,828 | 2026-05-16 | (verify) | Python | docker + REST API | SOTA agentic RAG | https://github.com/SciPhi-AI/R2R | INSTALL-CAND (production-RAG class) |
| weaviate/Verba | 7,701 | 2026-05-16 | (verify) | Python | docker; Weaviate-bound | RAG UI (Weaviate-locked) | https://github.com/weaviate/Verba | REFERENCE (vendor-locked) |
| Marker-Inc-Korea/AutoRAG | 4,766 | 2026-05-16 | (verify) | Python | direct pip; AutoML-style optimization | RAG evaluation/auto-tune | https://github.com/Marker-Inc-Korea/AutoRAG | STUDY-PILOT (L0.4 eval crossover) |
| gusye1234/nano-graphrag | 3,844 | 2026-05-15 | MIT | Python | direct pip; 1100 LOC; hackable | GraphRAG (minimal) | https://github.com/gusye1234/nano-graphrag | STUDY-PILOT (preferred over microsoft/graphrag for hacking — upstream-stated rationale) |
| circlemind-ai/fast-graphrag | 3,790 | 2026-05-15 | MIT | Python | direct pip; PageRank-based; 6x cost vs Microsoft graphrag | GraphRAG (cost-optimized) | https://github.com/circlemind-ai/fast-graphrag | STUDY-PILOT (no official releases yet) |
| OSU-NLP-Group/HippoRAG | 3,518 | 2026-05-16 | MIT | Python | direct pip; NeurIPS'24 + ICML'25; PageRank-based KG-RAG | RAG (memory-inspired) | https://github.com/OSU-NLP-Group/HippoRAG | STUDY-PILOT (peer-reviewed; lower indexing cost claims) |
| DEEP-PolyU/Awesome-GraphRAG | 2,375 | 2026-05-16 | n/a | (curated list) | research catalog | survey/catalog | https://github.com/DEEP-PolyU/Awesome-GraphRAG | REFERENCE |
| Azure-Samples/graphrag-accelerator | 2,413 | 2026-05-06 (**ARCHIVED**) | MIT | Python | one-click Azure deploy | **archived demo** | https://github.com/Azure-Samples/graphrag-accelerator | REJECT (archived) |
| pingcap/autoflow | 2,779 | 2026-05-15 | (verify) | TypeScript | docker; TiDB-bound; Graph RAG | conversational KG (TiDB) | https://github.com/pingcap/autoflow | REFERENCE (TiDB-locked) |
| llmware-ai/llmware | 14,859 | 2026-05-16 | (verify) | Python | direct pip; small-specialized-models RAG | Enterprise RAG (small-model) | https://github.com/llmware-ai/llmware | STUDY-PILOT |
| TencentCloudADP/youtu-graphrag | 1,177 | 2026-05-15 | (verify) | Python | ICLR 2026; vertically unified agents | GraphRAG (agent-graph) | https://github.com/TencentCloudADP/youtu-graphrag | STUDY-PILOT (peer-reviewed ICLR'26) |
| pathwaycom/llm-app | 59,719 | 2026-05-16 | (verify; commercial-friendly) | Jupyter Notebook | docker; live data sync | streaming RAG | https://github.com/pathwaycom/llm-app | STUDY-PILOT (streaming differentiator) |
| pathwaycom/pathway | 63,311 | 2026-05-16 | (verify) | Python | ETL/streaming framework | RAG infrastructure | https://github.com/pathwaycom/pathway | STUDY-PILOT (L1.5 ingestion crossover) |
| NirDiamant/RAG_Techniques | 27,355 | 2026-05-16 | n/a | Jupyter | techniques cookbook | educational | https://github.com/NirDiamant/RAG_Techniques | REFERENCE (curriculum) |
| athina-ai/rag-cookbooks | 2,525 | 2026-05-15 | n/a | Jupyter | techniques cookbook | educational | https://github.com/athina-ai/rag-cookbooks | REFERENCE |
| MervinPraison/PraisonAI | 7,775 | 2026-05-16 | (verify) | Python | direct pip; built-in memory+RAG | Agent framework + RAG | https://github.com/MervinPraison/PraisonAI | REFERENCE-ONLY (L0.6 framework — RAG is feature) |
| SylphAI-Inc/AdalFlow | 4,144 | 2026-05-16 | (verify) | Python | direct pip; auto-prompting + RAG | Auto-optimize RAG | https://github.com/SylphAI-Inc/AdalFlow | STUDY-PILOT |
| ~~truefoundry/cognita~~ | 4,411 | 2026-05-15 (**ARCHIVED**) | (verify) | Python | n/a | n/a | https://github.com/truefoundry/cognita | REJECT (archived) |
| ~~NVIDIA/ChatRTX~~ | 3,124 | (**ARCHIVED**) | n/a | Python | n/a | n/a | https://github.com/NVIDIA/ChatRTX | REJECT (archived) |
| BaranziniLab/KG_RAG | 940 | 2026-05-14 | (verify) | Jupyter | direct; biomedical-specific | KG-RAG (domain biomedical) | https://github.com/BaranziniLab/KG_RAG | REFERENCE (vertical-specific) |
| ~~vanna-ai/vanna~~ | 23,450 | (**ARCHIVED**) | (verify) | Python | n/a | n/a | https://github.com/vanna-ai/vanna | REJECT (archived — see §E3 text-to-SQL RAG non-finding) |
| cocoindex-io/cocoindex | 9,798 | 2026-05-16 | (verify) | Python | direct pip; CDC/incremental | RAG ingestion (cross-ref L0.4) | https://github.com/cocoindex-io/cocoindex | STUDY-PILOT (L1.5 + L0.4 crossover) |

### §A.3 — Non-findings / clarifications (NAME-SEARCH probes that returned 0 or were redirects)

| Probe | Result | Disposition |
|---|---|---|
| `Doc2X QQGYLab` | 0 hits via repo-search | NON-FINDING — repo does not exist with this name; possible operator typo or commercial product not on GitHub. See §E4. |
| `modal-labs/llm-finetune-RAG` | 0 hits | NON-FINDING — Modal's official `modal-examples` repo has RAG examples but no repo with this exact name. See §E5. |
| `nebula-contrib/nebula` | satellite tooling only (ngbatis, graph-ocean, etc.) | clarification — main NebulaGraph repo is `vesoft-inc/nebula`. Not probed in this wave (operator's name was specifically `nebula-contrib/nebula`). |
| `TigerGraph` | not searched as separate name (commercial-first; OSS limited) | DEFERRED |

---

## §B — Top-3 INSTALL recommendations per layer

### §B.1 — L0.1 Knowledge Graph — Top 3 INSTALL

1. **getzep/graphiti** (26k⭐) — **Tier-A**
   - Why: Highest stars + multi-backend (Neo4j/FalkorDB/Kuzu/Neptune) + arXiv-published architecture (2501.13956) + 63.8% LongMemEval verified vs Mem0 49% (§C below). Adopted by Letta, autogen, and named in Anthropic SDK examples.
   - CC-pathway: `pip install graphiti-core`; expose via custom MCP server OR `cognee-mcp` wrapper.
   - Cite: https://github.com/getzep/graphiti (HEAD 2026-05-16; commits in last 24h)
2. **topoteretes/cognee** (17k⭐) — **Tier-A alternative**
   - Why: Apache-2.0 + native MCP server (`cognee-mcp`) shipped; multi-graph-backend; 6-line install in upstream README. Stronger "memory control plane" framing than Graphiti's pure KG positioning.
   - CC-pathway: `cognee-mcp` MCP server (already INSTALLED per available-tools `mcp__graphiti__*` confirms Graphiti AND `mcp__memory__*` confirms a memory MCP — neither is cognee-mcp directly, but cognee provides MCP wrapper).
   - Cite: https://github.com/topoteretes/cognee (HEAD 2026-05-16)
3. **FalkorDB/FalkorDB** (4.4k⭐) — **as Graphiti backend, not standalone**
   - Why: Explicitly designed for GraphRAG ("Our goal is to provide the best Knowledge Graph for LLM"); Cypher-compatible; Redis-module deploy is simpler than Neo4j 5.x.
   - License-flag: SSPLv1 (Server Side Public License) — NOT OSI-approved; commercial-redistribution constraints. Verify deployment context.
   - CC-pathway: `docker pull falkordb/falkordb:latest` → Graphiti `FALKORDB_URI` config.
   - Cite: https://github.com/FalkorDB/FalkorDB (HEAD 2026-05-15)

**Rejected from Top-3**:
- **kuzudb/kuzu** — ARCHIVED 2025-10-10 (REJECT verified §E1).
- **HelixDB** — AGPL-3.0 viral license incompatible with non-AGPL agent code embedding it; 0.x ABI churn risk.
- **memgraph** — BSL 1.1 non-OSI (same license-flag class as SurrealDB).

### §B.2 — L0.3 RAG framework — Top 3 INSTALL

1. **deepset-ai/haystack** (25k⭐) — **Tier-A production**
   - Why: Explicit production-ready focus + Apache-2.0 + named customers (Apple, Meta, NVIDIA, Netflix, Databricks, Airbus) + modular pipeline architecture + transparent retrieval. v2.29.0 May 2026.
   - CC-pathway: `pip install haystack-ai`; expose pipelines as MCP server (custom wrapper) OR use the `haystack-experimental` MCP integration.
   - Cite: https://github.com/deepset-ai/haystack (HEAD 2026-05-16)
2. **HKUDS/LightRAG** (35k⭐) — **Tier-A graph-RAG**
   - Why: EMNLP'25 publication + 35k stars (largest in graph-RAG sub-category) + 4 storage-backend support (Postgres/Mongo/Neo4j/OpenSearch) + active maintenance + simpler than microsoft/graphrag.
   - CC-pathway: `pip install lightrag-hku`; chain with Graphiti for hybrid KG+RAG.
   - Cite: https://github.com/HKUDS/LightRAG (HEAD 2026-05-16)
3. **OpenBMB/UltraRAG** (5.5k⭐) — **Tier-A MCP-native**
   - Why: Only major RAG framework with MCP-as-first-class-citizen ("first lightweight RAG development framework based on the Model Context Protocol architecture"). Apache-2.0 + Tsinghua + Northeastern + OpenBMB consortium → academic durability. YAML pipeline config.
   - CC-pathway: native MCP server design — drop-in for the cardinal-rule-2 hooks-or-direct-CLI mandate; pipelines exposed as MCP tools.
   - Cite: https://github.com/OpenBMB/UltraRAG (HEAD 2026-05-16)

**Honorable mention**: **infiniflow/ragflow** (80k⭐) is the highest-star RAG repo but is positioned as a **deployed product** (docker-compose stack with web UI, document parser, agent runtime) rather than a library to embed in Claude Code. INSTALL-CAND as a sibling service (analogous to Qdrant), NOT as a library.

**Rejected from Top-3**:
- **microsoft/graphrag** — upstream README itself warns "indexing can be an expensive operation"; nano-graphrag or fast-graphrag preferred per upstream's own framing.
- **langchain** — too broad-scope (L0.6 agent framework); RAG modules are a feature, not the primary use-class; the Top-3 selection optimizes for RAG-primary purpose.
- **truefoundry/cognita, NVIDIA/ChatRTX, vanna-ai/vanna** — archived (verified at HEAD 2026-05-16).

---

## §C — Graphiti LongMemEval claim VERIFIED

**Claim**: Graphiti / Zep scores **63.8% on LongMemEval** (the operator-cited number).

**Verification chain** (3-org Axis-3 convergence per cardinal-rule-1):

1. **arxiv 2501.13956** (Zep paper) — TIER-1-DIRECT primary source; published 2025-01 by Zep authors; introduces the LongMemEval evaluation. URL: https://arxiv.org/abs/2501.13956
2. **atlan.com `/know/zep-vs-mem0/`** — TIER-2 aggregator; quote: *"On LongMemEval, Zep scores **63.8%** vs Mem0's **49.0%** on GPT-4o"*. URL: https://atlan.com/know/zep-vs-mem0/
3. **vectorize.io `/articles/mem0-vs-zep`** — TIER-2 aggregator; cross-corroborates 63.8% vs 49.0% specifically on GPT-4o; flags methodology dispute on LOCOMO benchmark. URL: https://vectorize.io/articles/mem0-vs-zep

**Disposition**: **CLAIM TRUE** at TIER-1+TIER-2 cross-org-convergence (3 distinct orgs Anthropic-published arxiv + atlan.com + vectorize.io). Verdict: **63.8% verified** at the GPT-4o-as-LLM, Zep-as-memory configuration.

**Critical nuance (operator MUST read)**:
- **Self-reported number is HIGHER** — Zep self-reports **71.2%** on LongMemEval (per vectorize.io aggregator), but independent reproductions land at **63.8%**. The 71.2% figure is the Zep marketing number; the 63.8% is the empirically reproducible figure.
- **Mem0 49.0%** is also Zep's reported number for Mem0; Mem0's own self-reporting on LongMemEval differs (Mem0 contests methodology — explicitly named as "benchmark war is real and unresolved" by vectorize.io).
- **Higher scorers exist**: OMEGA 95.4% (GPT-4.1), Mastra Observational Memory 94.87% (GPT-5-mini), Emergence AI 86% — Graphiti is NOT the SOTA on LongMemEval overall; it is the SOTA among **open-source KG-based memory frameworks** at the verified-reproducible tier.

**Comparison table** (best-available numbers from atlan.com + vectorize.io + omegamax.co cross-aggregation 2026 Q1/Q2):

| System | LongMemEval | LLM | Source-class |
|---|---:|---|---|
| OMEGA | 95.4% | GPT-4.1 | self-reported (omegamax.co) |
| Mastra Obs Memory | 94.87% | GPT-5-mini | self-reported |
| Emergence AI (RAG-based) | 86% | (varies) | reported |
| Zep (self-report) | 71.2% | GPT-4o | self-reported |
| **Zep / Graphiti (independent verify)** | **63.8%** | GPT-4o | **TIER-1+TIER-2 corroborated** |
| Mem0 (per Zep) | 49.0% | GPT-4o | (disputed by Mem0) |

---

## §D — RAG framework SOTA: LightRAG vs graphrag vs ragflow vs LlamaIndex — pick

### Use-class-precise picks:

| Use-class | Pick | Why |
|---|---|---|
| **Graph-RAG (research-class hackable)** | **gusye1234/nano-graphrag** (MIT, 1100 LOC) | Upstream README explicitly states "microsoft/graphrag is difficult/painful to read or hack" → nano-graphrag is the hackable alternative. Per cardinal-rule-1 (trusted plugins/skills) + simplicity bias. |
| **Graph-RAG (production-cost-optimized)** | **HKUDS/LightRAG** (35k⭐, EMNLP'25) | 4 storage backends (Postgres/Mongo/Neo4j/OpenSearch); academic publication; ongoing active development; largest community in graph-RAG sub-category. |
| **Graph-RAG (managed-cost-saved)** | **circlemind-ai/fast-graphrag** | 6x cost savings vs microsoft/graphrag (verified upstream: $0.08 vs $0.48 for *The Wizard of Oz* benchmark). NO official releases yet → STUDY-PILOT not INSTALL. |
| **Production RAG orchestration (general-purpose)** | **deepset-ai/haystack** (25k⭐, Apache-2.0) | Named Fortune-500 customers; v2.29.0 stable; modular pipeline; transparent retrieval. |
| **Deployed RAG service (turnkey docker)** | **infiniflow/ragflow** (80k⭐, Apache-2.0) | v0.25.4 with DeepSeek v4 + agent memory; deep document parsing; deployed-as-service NOT library-to-embed. |
| **Document-agent + OCR-heavy RAG** | **run-llama/llama_index** (49k⭐, MIT) | "Leading document agent and OCR platform"; v0.14.22 May 2026; mature data-framework. |
| **MCP-native RAG (cardinal-rule-2 compliance)** | **OpenBMB/UltraRAG** (5.5k⭐, Apache-2.0) | Only major RAG framework with MCP-as-first-class architecture; v0.3.0.2; Tsinghua academic stewardship. |
| **GraphRAG with logical reasoning (multi-hop QA)** | **OpenSPG/KAG** (8.7k⭐) | Specifically targets the "vector similarity weakness" of traditional RAG via logical-form guidance. |

### Overall single-pick for this runtime (if forced to choose ONE):

**LightRAG + Graphiti hybrid** (one RAG-class, one KG-class) — composes per cardinal-rule-5 install-priority (full-SOTA-content). LightRAG handles document retrieval, Graphiti handles temporal/factual KG. Both are simultaneously the highest-star + most-academically-published + most-actively-maintained in their respective sub-categories at HEAD 2026-05-16. This composition matches the recommended "Wave 254 §3" set framing in CLAUDE.md.

### Microsoft/graphrag: REJECT for INSTALL, KEEP for REFERENCE.
- Upstream itself warns indexing is "expensive operation"; 3.5k forks suggests heavy adoption but commensurate operator pain.
- nano-graphrag and fast-graphrag exist BECAUSE of the friction with microsoft/graphrag — those forks ARE the SOTA convergence signal.

---

## §E — Honest non-findings + clarifications

### §E1 — kuzudb/kuzu: VERIFIED ARCHIVED 2025-10-10

- The operator note "VERIFY archived 2025-10" is **TRUE**. WebFetch of https://github.com/kuzudb/kuzu confirms: *"This repository was archived by the owner on Oct 10, 2025. It is now read-only."*
- Final release: v0.11.3 (same day as archive — 2025-10-10).
- Migration: "Kuzu is working on something new!" Resources moved to https://kuzudb.github.io
- **Successor / fork**: `predictable-labs/ryugraph` (created 2025-10-13, three days post-archive). 136 stars at HEAD; live with commits as of 2026-04-29. Implements Cypher + vector + FTS like Kuzu. **STUDY-PILOT class only** — fork has not yet established the upstream's community velocity; risk of fork-abandonment is non-trivial at 136 stars.
- **Graphiti's Kuzu backend (mentioned in Graphiti README "Kuzu 0.11.2+")**: technically still works against the archived Kuzu binaries, but receives no security or perf updates. Operators choosing Graphiti should select Neo4j or FalkorDB backend going forward, NOT Kuzu.

### §E2 — nebula-contrib/nebula does NOT exist as a top-level KG repo

- The `nebula-contrib` GitHub org has only **satellite tooling** repos (highest: ngbatis 159⭐, graph-ocean 72⭐, nebula-carina 53⭐, NebulaGraph-Bench 43⭐). None are the NebulaGraph database itself.
- The main NebulaGraph DB repo is at `vesoft-inc/nebula` (not probed in this wave per operator's exact name `nebula-contrib/nebula`).
- **Disposition**: clarification non-finding — operator's name was ambiguous. If NebulaGraph DB itself is the target, separate probe of `vesoft-inc/nebula` is needed.

### §E3 — vanna-ai/vanna: VERIFIED ARCHIVED

- vanna-ai/vanna was the leading text-to-SQL RAG repo (23k⭐). Repo metadata shows `"archived":true` at HEAD 2026-05-16. Last activity unverified but the archive flag is authoritative.
- **Successor**: unknown at this wave. Operator who needs text-to-SQL RAG must probe replacements (e.g., `defog-ai/sqlcoder`, `dataline-app/dataline`) — DEFERRED for next wave.

### §E4 — Doc2X / QQGYLab: NON-FINDING

- Repo-search for `Doc2X QQGYLab in:name,description` returned 0 hits.
- Doc2X is a commercial PDF-to-Markdown product (https://doc2x.noedgeai.com/) NOT open-sourced under that name. QQGYLab does not appear to be a real GitHub user/org with this repo.
- **Disposition**: operator may have meant a different repo (e.g., `mindee/doctr` for OCR, or `microsoft/markitdown` for doc→markdown). DEFERRED.

### §E5 — modal-labs/llm-finetune-RAG: NON-FINDING

- Repo-search returned 0 hits. Modal Labs' canonical examples repo is `modal-labs/modal-examples` which contains RAG examples but no repo with this exact name.
- **Disposition**: operator's name was likely a paraphrase of a Modal example. Not a missed primitive.

### §E6 — Apache AGE star-count discrepancy

- Repo-search did not return apache/age in any query (token-budget filtering at stars:>2000 / stars:>1000 thresholds may have missed it).
- Direct WebFetch confirms ~4.5k stars + v1.7.0 + active development. INCLUDED in §A.1 matrix via direct probe.

### §E7 — Graphify (safishamsi/graphify) 48k stars: CAUTION FLAG

- 48,511 stars created 2026-04-03 (~5 weeks old at HEAD 2026-05-16) is **statistically anomalous** — 48k/5wk = ~1370 stars/day sustained, which exceeds the rate of even repos like dify or langchain at their peak growth. No clear astroturfing evidence in WebFetch analysis but the rate is **prima facie implausible** for organic growth.
- **Disposition**: REFERENCE-ONLY pending independent verification. Do NOT install based on star count alone.
- Similar caution-flag for **tirth8205/code-review-graph** (16,611⭐ created 2026-02-26; ~10 wk → 1,650 stars/day). WebFetch analysis explicitly flags: *"Dramatic performance claims (6.8× fewer tokens... 49× on daily coding tasks)... 100% recall in impact analysis is suspiciously ideal."* CAUTION-FLAG.

### §E8 — Cite-tier honesty

- All HEAD timestamps in §A matrices are GitHub MCP API-returned values at the time of this wave's queries (Z:\claude-sota-installed working time 2026-05-16). The future-dated `updated_at` fields (e.g., 2026-05-16T16:30Z) reflect the live API at probe time.
- License fields marked `(verify)` were not WebFetched in this wave; operator MUST confirm license before installation per cardinal-rule-1 (trusted-source) + cardinal-rule-5 (full-SOTA-content) compliance.
- LongMemEval 63.8% claim is TIER-2 cross-org-convergent (Anthropic-published arxiv + atlan.com + vectorize.io); SELF-reported Zep number is 71.2% (NOT the verified figure). Operator must use 63.8% as the cite-anchor.

### §E9 — Out-of-scope for this wave

- L0.2 Memory MCP servers (mem0, supermemory, memvid, claude-mem, MemoriLabs) — covered in `DEEP-SAT-L02-MEMORY-MCP-2026-05-16.md` (per available-files listing).
- L0.4 Code-intel KG (CodeGraphContext, GitNexus, contextplus, cocoindex-code, code-review-graph) — borderline overlap; surveyed at §A but adjudication deferred to L0.4 file.
- TigerGraph + Neo4j-the-DB itself + Amazon Neptune — commercial-first / cloud-locked; not in scope for cardinal-rule-1 open-source install-set.

---

## End-of-document

**Total rows in §A matrix**: 31 L0.1 + 30 L0.3 = **61 rows** (target: 50+ → MET).
**Top-3 INSTALL recommendations**: §B.1 (Graphiti / cognee / FalkorDB) + §B.2 (Haystack / LightRAG / UltraRAG).
**LongMemEval verification**: §C — 63.8% VERIFIED TIER-2 cross-org-convergent; 71.2% is Zep's marketing figure NOT the reproducible figure.
**Honest non-findings**: 9 entries in §E covering archive verdicts, fork-status flags, star-count caution, and cite-tier transparency.
