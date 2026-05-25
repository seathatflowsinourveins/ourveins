# GAP: Workflow Durable-Execution + KG/Vector Alternatives — 2026-05-16

> Sourced from sota-researcher fork (agentId a8bcb71cadc4c9126, 2026-05-16 14:42 PT)
> R0 verdict: **W258 R13 REJECT mis-classified at $830K/yr enterprise scale**; PARTIAL RE-PROMOTE warranted.
> R1 multi-source ≥4: GitHub MCP + Exa + Context7 + WebFetch (Kai Waehner, tiarebalbi, devstarsj, pkgpulse independent 2026 sources)

## §A — Workflow / Durable-Execution

| # | Name | ★ | License | Value | Verdict |
|---|------|---|---------|-------|---------|
| 1 | **temporalio/temporal** | 20.3k | MIT | Mature cluster; 9yr at Uber/Stripe scale | RE-PROMOTE enterprise |
| 2 | **restatedev/restate** | High-rep | BSL/MIT | Rust sidecar; native AI-examples repo | **PROMOTE** |
| 3 | **inngest/inngest** | 5.4k | AGPL | Serverless steps; durable tool-call resumes; HITL gates | **PROMOTE** |
| 4 | **hatchet-dev/hatchet** | 7.2k | MIT | Go+Postgres DAG; AI-purpose-built; priority lanes | **PROMOTE** |
| 5 | **dbos-inc/dbos-transact-py** | 1.4k | MIT | **10× less code than Temporal** (7 vs >100 lines) | **STRONG PROMOTE** |
| 6 | conductor-oss/conductor | 31.8k | Apache-2.0 | Event-driven agentic JVM engine | STUDY |
| 7 | dagucloud/dagu | 3.4k | GPL-3.0 | Single-binary local-first agentic | STUDY |

**Critical re-evaluation:** R13 REJECT correct at solo+5-task; **WRONG at $830K/yr enterprise.** Three independent Tier-2 sources (Kai Waehner 2025-06, tiarebalbi 2026, devstarsj 2026-04) converge: durable execution is a NEW category specifically born for production AI agents. Cost-aware retry primitive (Hatchet priority lanes, DBOS Postgres) directly addresses $830K/yr spend.

## §B — KG/Vector

| # | Name | ★ | License | Value | Verdict |
|---|------|---|---------|-------|---------|
| 1 | **surrealdb/surrealdb** | 32.1k | BSL→Apache | Multi-model in 1 engine; 22× graph + 8× vector (vendor) | **STRONG PROMOTE** |
| 2 | **kuzudb/kuzu → predictable-labs/ryugraph** | 3.9k→136 | MIT | **KUZU ARCHIVED 2025-10**; ryugraph fork live | **RETRACT Kuzu; STUDY ryugraph (fork-risk)** |
| 3 | chroma-core/chroma | ~30k | Apache-2.0 | 2025 Rust-core: 4× faster; "Postgres of vector DBs" | STUDY-PILOT |
| 4 | **lancedb/lancedb** | ~5k | Apache-2.0 | Embedded; disk-scale beyond Chroma | **PROMOTE embedded-lane** |
| 5 | milvus-io/milvus | 44.3k | Apache-2.0 | Billion-scale distributed; HNSW+DiskANN | STUDY |
| 6 | **HelixDB/helix-db** | 4.5k | AGPL | Rust graph+vector OLTP; HelixQL→Rust at deploy | STUDY-PILOT (vendor-bench only) |
| 7 | apache/age | 4.5k | Apache-2.0 | Postgres extension → one-DB pgvector+AGE stack | **PROMOTE Postgres-lane** |

## §C — Convergence (Axis-1 ≥3-org)

**Workflow:** 5/3 PASS — Temporal Inc + Restate GmbH + DBOS Inc + Inngest Inc + Hatchet Inc, with 5 independent Tier-2 commentary sources.

**KG/Vector:** 5/3 PASS — SurrealDB Ltd + HelixDB + LanceDB + ChromaDB + Milvus/Zilliz.

**Kuzu-archived:** 5 PASS — BigGo News + X "Year-of-the-Graph" + ryugraph fork + GitHub `"archived":true` flag + kuzudb.github.io. **Load-bearing retraction.**

## §D — Architecture Impact

**D.1 L5 — ADD "Durable execution" sub-lane:** Yes, required at enterprise. Structure: `L5/Durable Execution/{Postgres: dbos, Sidecar: restate, Cluster: temporal}`.

**D.2 L0 — Sub-layer split:** Yes. Structure:
- KG-canonical: Graphiti+FalkorDB (KEEP)
- KG-alternative-multimodel: SurrealDB
- Vector-canonical: Qdrant (KEEP)
- Vector-embedded: LanceDB
- Vector-dev-onramp: ChromaDB
- KG+Vector-hybrid: HelixDB (study)

**D.3 Top-3 INSTALL for V-FINAL-V2:**

*Durable Execution:* (1) **dbos-transact-py** (lowest friction, MIT), (2) **restate** (lightest sidecar, native ai-examples), (3) **hatchet** (DAG+priority lanes for cost-aware $830K/yr).

*KG/Vector:* (1) **surrealdb** (replaces 3-service stack with 1), (2) **lancedb** (embedded code/RAG), (3) **chroma** (dev-onramp).

## §E — Honest Non-Findings

1. GitHub API rate-limit at 13:39 UTC truncated DBOS/Windmill/n8n GraphQL fresh-push verification — compensated via Context7 + WebSearch.
2. **No primary file:line audit** of dbos-transact-py source this fire — PARTIALLY-VERIFIED.
3. HelixDB "1000× vs Neo4j" + SurrealDB "22× graph" are **vendor-self-reported** only. `[SELF-REPORTED]` not `[MEASURED]`. Independent third-party benchmarks NOT found.
4. Ryugraph fork (~7mo old, 136★) below ≥500★ filter — STUDY only, not install.
5. No measured **"Restate/DBOS at $830K scale" case study** surfaced — re-promotion rests on architectural convergence, NOT measured cost. **Recommend codex T1 pre-edit consult before V-FINAL-V2 commit.**
6. Sayiir (49★, 2026-01 Rust embedded Temporal-alt) below filter — watchlist.
7. **dgraph-io/dgraph** absent from search hits — re-probe needed next session window.

## Sources

- [Kai Waehner: Rise of Durable Execution (2025-06)](https://www.kai-waehner.de/blog/2025/06/05/the-rise-of-the-durable-execution-engine-temporal-restate-in-an-event-driven-architecture-apache-kafka/)
- [DBOS vs Temporal 2026 (tiarebalbi)](https://www.tiarebalbi.com/en/blog/dbos-vs-temporal-postgres-durable-execution)
- [Durable Execution: Temporal/Restate/DBOS 2026-04 (devstarsj)](https://devstarsj.github.io/2026/04/03/durable-execution-temporal-restate-dbos-distributed-workflows-2026/)
- [Hatchet vs Trigger.dev vs Inngest 2026 (pkgpulse)](https://www.pkgpulse.com/blog/hatchet-vs-trigger-dev-v3-vs-inngest-durable-workflows-2026)
- [Vector DB Benchmarks 2026 (CallSphere)](https://callsphere.ai/blog/vector-database-benchmarks-2026-pgvector-qdrant-weaviate-milvus-lancedb)
- [Vector DB Comparison 2026 (4xxi)](https://4xxi.com/articles/vector-database-comparison/)
- [SurrealDB vs Neo4j](https://surrealdb.com/comparison/neo4j)
- [HelixDB Review (FunBlocks)](https://www.funblocks.net/aitools/reviews/helixdb)
- [Kuzu Archived (BigGo News 2025-10)](https://biggo.com/news/202510130126_KuzuDB-embedded-graph-database-archived)
- [Ryugraph fork](https://github.com/predictable-labs/ryugraph)
- [DBOS Durable Execution Benchmark](https://github.com/dbos-inc/durable-execution-benchmark)
