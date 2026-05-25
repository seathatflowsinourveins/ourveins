---
title: Wave 224 Agent C — Vector DB Alternatives + Specialized Scientific Computing
status: AUTHORITATIVE-CANDIDATE
date: 2026-05-15
agent: sota-researcher (Sonnet stand-in per cmc-env-funneled-disclosure.md §The mandate)
wave: 224
fire: agentC
---

# Wave 224 Agent C — Vector DB Alternatives + Specialized Scientific Computing

## Executive Summary

**Verdict mass distribution**: 0 ADOPT-NOW / 2 STUDY-PILOT (pgvector tied to Postgres adoption decision + duckdb-vss extension layer) / 13 REJECT-FOR-FIT.

**Bottom line**: claude-sota-installed's RAG/memory layer is **saturated** post-Wave 219 — qdrant (ADOPT-NOW, server-class) + chroma (STUDY-PILOT, embedded SQLite) + graphiti+FalkorDB (INSTALLED, temporal-KG) + mcp-memory+sqlite_vec (INSTALLED, capture) cover all 4 memory-stack layers. **Adding a 5th vector store violates kiss-dry-yagni Must-Never #4**.

Scientific computing layer **already saturated** at Python venv (polars 1.38.1 + pyarrow 22.0.0 + scikit-learn 1.8.0 + scikit-image 0.26.0 + scikit-network 0.33.5 + lancedb 0.24.3 ALL pre-installed) — no install actions required.

**Single load-bearing finding**: **pgvector is the canonical "embed in existing Postgres" path** if claude-sota-installed ever ships a Postgres backend; today no Postgres dependency exists, so STUDY-PILOT-DEFERRED.

## Section 1 — Vector DB Alternatives Catalog

### 1.1 weaviate/weaviate
- **License**: BSD-3-Clause ✅ | **Stars**: 16.2k | **Latest**: v1.37.4 (May 14, 2026)
- **CR-12 disposition**: **DUPLICATE-FUNCTIONALITY** with qdrant
- **Verdict**: REJECT-FOR-FIT (DUPLICATE-FUNCTIONALITY)

### 1.2 milvus-io/milvus
- **License**: Apache-2.0 ✅ | **Stars**: 44.3k (LARGEST OSS vector DB) | **Latest**: v2.6.16
- **Architecture**: Server-class distributed (etcd + minio + pulsar + worker nodes)
- **CR-12 disposition**: **DUPLICATE-FUNCTIONALITY** + significant operational overhead
- **Verdict**: REJECT-FOR-FIT (DUPLICATE-FUNCTIONALITY + Probe 5 MODE-HARNESS-SHAPE: enterprise-scale stack overkill)

### 1.3 pgvector/pgvector ⭐ candidate-of-note
- **License**: PostgreSQL License (BSD-style permissive ✅)
- **Stars**: 21.3k | **Latest**: 0.8.2 | **Language**: C 77% (Postgres extension)
- **Architecture**: PostgreSQL extension — runs INSIDE existing Postgres; NO separate server process
- **CR-12 disposition**: **PROVIDER-COMPLEMENT** if Postgres adopted; otherwise **DEMAND-ABSENCE**
- **Probe 5 mode-harness-shape**: FAIL — no Postgres backend exists; FalkorDB is Redis-protocol not Postgres; mcp-memory uses SQLite
- **STUDY-PILOT-CONDITIONAL**: if any future ship lands Postgres backend (Langfuse self-hosted Postgres? observability backend?), pgvector becomes canonical "no separate vector DB" pattern
- **Verdict**: REJECT-FOR-FIT-NOW + STUDY-PILOT-CONDITIONAL

### 1.4 lancedb/lancedb (ALREADY INSTALLED 0.24.3 in venv)
- **License**: Apache-2.0 ✅ | **Stars**: 10.3k | **Latest**: v0.32.0
- **ALREADY-INSTALLED**: `pip list` shows `lancedb 0.24.3` (transitive dep)
- **CR-12 disposition**: **PARTIAL-OVERLAP** with chroma (both embedded)
- **Verdict**: REJECT-FOR-FIT (DUPLICATE-FUNCTIONALITY with chroma); leave installed as transitive, no direct integration

### 1.5 typesense/typesense
- **License**: **GPL-3.0** ❌ (copyleft non-permissive — Probe 6 LICENSE BLOCKER)
- **Verdict**: REJECT-FOR-FIT (GPL-3.0 license incompatible)

### 1.6 meilisearch/meilisearch
- **License**: MIT + Business Source License 1.1 + commercial license — **MULTI-LICENSE FLAG**
- **Verdict**: REJECT-FOR-FIT (DEMAND-ABSENCE + multi-license CR-9 risk)

### 1.7 vespa-engine/vespa
- **License**: Apache-2.0 ✅ | **Stars**: 6.9k | Java + C++
- **Verdict**: REJECT-FOR-FIT (Probe 5 MODE-HARNESS-SHAPE — JVM stack overhead)

### 1.8 RediSearch + RedisVL
- **License**: **TRIPLE-LICENSE post Redis 8** (RSALv2 / SSPLv1 / AGPLv3) — ALL non-permissive
- **Critical**: Redis 8 — RediSearch integrated, no longer standalone module
- **Verdict**: REJECT-FOR-FIT (license + lifecycle deprecation)

### 1.9 Catalog Summary

| # | Repo | Stars | License | Already-installed | CR-12 | Verdict |
|---|------|-------|---------|-------------------|-------|---------|
| 1 | weaviate | 16.2k | BSD-3 ✅ | NO | DUPLICATE-FUNCTIONALITY w/ qdrant | REJECT |
| 2 | milvus | 44.3k | Apache-2.0 ✅ | NO | DUPLICATE-FUNCTIONALITY + heavy stack | REJECT |
| 3 | pgvector | 21.3k | PostgreSQL (BSD-style) ✅ | NO | PROVIDER-COMPLEMENT (Postgres-gated) | **STUDY-PILOT-CONDITIONAL** |
| 4 | lancedb | 10.3k | Apache-2.0 ✅ | YES (0.24.3 transitive) | DUPLICATE-FUNCTIONALITY w/ chroma | REJECT (no action) |
| 5 | typesense | 25.8k | **GPL-3.0** ❌ | NO | License blocker | REJECT |
| 6 | meilisearch | 57.6k | MIT/BSL/commercial ⚠️ | NO | DEMAND-ABSENCE + multi-license | REJECT |
| 7 | vespa | 6.9k | Apache-2.0 ✅ | NO | Probe 5 fail (JVM stack) | REJECT |
| 8 | RediSearch | 6.1k | **RSALv2/SSPLv1/AGPLv3** ❌ | NO | License non-permissive | REJECT |

## Section 2 — pgvector Deep-Dive (Single Conditional STUDY-PILOT)

pgvector is **the most architecturally elegant alternative** because it **eliminates a server**: vector search runs inside existing Postgres process. **Today** REJECT (no Postgres anywhere in claude-sota-installed).

**Watchlist conditions for re-audit**:
1. Langfuse self-hosted observability install (Langfuse uses Postgres by default)
2. Phoenix Arize OpenTelemetry observability migration
3. Any agent-state / session-store ship that picks Postgres over SQLite
4. Operator explicitly requests "embed vector search in Postgres" workflow

When any condition holds → **flip from REJECT-FOR-FIT-NOW → STUDY-PILOT** with proper 5-clause pilot brief.

## Section 3 — Specialized Scientific Computing Catalog

### 3.1 ALREADY-INSTALLED inventory (`Z:/venvs/claude`)

| Package | Version | Latest | Status |
|---------|---------|--------|--------|
| **polars** | 1.38.1 | 1.40.1 | ✅ INSTALLED (minor lag) |
| **pyarrow** | 22.0.0 | Arrow 24.0.0 | ✅ INSTALLED (minor lag) |
| **scikit-learn** | 1.8.0 | 1.8.0 | ✅ INSTALLED CURRENT |
| **scikit-image** | 0.26.0 | — | ✅ INSTALLED |
| **scikit-network** | 0.33.5 | — | ✅ INSTALLED |
| **lancedb** | 0.24.3 | 0.32.0 | ⚠️ transitive dep, older minor |
| **chromadb** | 0.6.3 | — | ✅ INSTALLED (W219 STUDY-PILOT) |
| **qdrant-client** | 1.17.1 | — | ✅ INSTALLED (W219 ADOPT-NOW client) |
| **chroma-hnswlib** | 0.7.6 | — | ✅ INSTALLED (chroma backend) |

**Finding**: Scientific computing + vector DB client libraries **saturated** at Python venv layer. No NEW pip-install actions needed.

### 3.2 Top candidates evaluated

- **polars** (MIT ✅, 38.5k★): ALREADY-INSTALLED — ECOSYSTEM-IMPORT; KEEP-INSTALLED
- **duckdb** (MIT ✅, 38.2k★): NOT YET INSTALLED — W219 STUDY-PILOT pending
- **duckdb-vss extension**: EXPERIMENTAL HNSW vector index inside duckdb — DUPLICATE-FUNCTIONALITY w/ qdrant; REJECT
- **apache/arrow** (Apache-2.0): KEEP-INSTALLED as substrate
- **scikit-learn** (BSD-3-Clause ✅, 66.1k★): ALREADY-INSTALLED 1.8.0 CURRENT
- **cudf** (Apache-2.0, NVIDIA-GPU-only): REJECT-FOR-FIT Probe 5 hardware mismatch
- **modin** (Apache-2.0): REJECT (DUPLICATE-FUNCTIONALITY w/ polars)
- **vaex** (MIT, STALE): REJECT (DUPLICATE-FUNCTIONALITY + axis-3 STABILITY-FAIL)
- **dask** (BSD-3): REJECT (Probe 7.a — no distributed compute workflow)
- **jax** (Apache-2.0, Google research): REJECT (DEMAND-ABSENCE)
- **pytorch/tensorflow**: REJECT (no neural-net training workflow in sss runtime; Ollama covers local model runtime)

## Section 4 — Recommendations Summary

### 4.1 ADOPT-NOW
**ZERO new candidates.** RAG/memory saturated post-W219; scientific computing saturated at venv.

### 4.2 STUDY-PILOT
1. **pgvector/pgvector** — STUDY-PILOT-CONDITIONAL — pinned to "trigger upon Postgres backend adoption"

### 4.3 REJECT-FOR-FIT (15 candidates)
- 8 vector DB alternatives (weaviate / milvus / lancedb-direct / typesense / meilisearch / vespa / RediSearch) — all duplicate-functionality OR license-blocked
- 7 scientific computing (cudf / modin / vaex / dask / jax / pytorch / tensorflow) — all demand-absence OR duplicate
- 1 duckdb-vss extension — experimental + duplicate

### 4.4 KEEP-INSTALLED (no action)
polars / pyarrow / scikit-learn / scikit-image / scikit-network / lancedb (transitive) / chromadb / qdrant-client / chroma-hnswlib

### 4.5 Operator action items
1. Path P codex T1 ratification on this report (cardinal-rule-3 Phase 1 bootstrap exception)
2. Mia pre-apply verification: `pip list | grep <pkg>` to confirm ALREADY-INSTALLED claims
3. Add pgvector to `docs/install-provenance.md` watchlist (STUDY-PILOT-CONDITIONAL pinned to Postgres-trigger)
4. Optional: minor patch upgrade `pip install -U polars` (1.38.1 → 1.40.1) — non-blocking

## Section 5 — Probe 7 Demand-Gate Analysis (cumulative)

- **Probe 7.a DEMAND-ABSENCE hits (10/15)**: weaviate / milvus / lancedb-direct / vespa / RediSearch / modin / vaex / dask / jax / pytorch+tensorflow
- **Probe 7.b DEMAND-CREATES-NEW-WORKFLOW.b (1/15)**: pgvector → STUDY-PILOT-CONDITIONAL
- **License-blocker (Probe 6) hits (2/15)**: typesense (GPL-3.0), RediSearch (RSALv2/SSPLv1/AGPLv3)
- **Probe 5 mode-harness-shape (1/15)**: cudf (NVIDIA-GPU-only)
- **Multi-license CR-9 (1/15)**: meilisearch

**Saturation diagnostic**: zero candidates survive — confirms `advanced-agent-team-standing-directive.md §Saturation diagnostic` **n=9-consecutive-0%-ADOPT-NOW** saturation pattern triggered at RAG/scientific-computing layer.

VERDICT: 0 ADOPT-NOW / 1 STUDY-PILOT-CONDITIONAL (pgvector pinned to Postgres adoption trigger) / 15 REJECT-FOR-FIT; vector DB + sci-computing layer SATURATED; orchestrator must apply Path P codex T1 ratification per cardinal-rule-3 Phase 1 bootstrap exception before any prescription lands.
