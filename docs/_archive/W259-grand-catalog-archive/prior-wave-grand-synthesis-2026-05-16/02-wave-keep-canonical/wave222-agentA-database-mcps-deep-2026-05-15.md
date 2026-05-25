---
title: Wave 222 Agent A — Database-Specific MCP Servers Deep-Dive
status: AUTHORITATIVE
date: 2026-05-15
agent: sota-researcher (Sonnet stand-in per CLAUDE_CODE_SUBAGENT_MODEL env-funneling)
cross-model-gate: NOT STRUCTURALLY SATISFIED — STAND-IN-NOTICE per `Z:/claude-sota/.claude/rules/cmc-env-funneled-disclosure.md §The mandate` Option 2. Orchestrator MUST file Path P codex T1 ratification before any ADOPT-NOW prescription lands.
---

# Wave 222 Agent A — Database-Specific MCP Servers Deep-Dive

## Executive Summary (TL;DR)

**Wave 222 verdict: REJECT-FOR-FIT-MAJORITY (Probe 7.a DEMAND-ABSENCE) with one conditional STUDY-PILOT-NARROW candidate.** All 10 candidate DB MCPs (Postgres / SQLite / MongoDB / Redis / multi-DB) FAIL Probe 7 demand-gate for claude-sota-installed because the runtime has ZERO application-database workflows. The closest demand-creating workflow is `bytebase/dbhub` for JSONL → SQLite/Postgres SQL analytics over `.claude/state/*.jsonl` audit warehouse — but ONLY if operator commits to building the ETL surface as part of the pilot. Existing graphiti+FalkorDB (temporal-KG memory layer) and mcp-memory+sqlite_vec (semantic memory) cover ALL current live use cases.

**Critical archive-status finding (Probe 6 STRUCTURAL blocker)**: `modelcontextprotocol/servers-archived` is **ARCHIVED** (archived:true, 259 stars, last update 2026-05-14) — the official MCP reference postgres/sqlite/redis servers are no longer maintained. Auto-REJECT any candidate from this org.

## Section 1 — PostgreSQL MCP catalog (Top-3)

### #1 — bytebase/dbhub (multi-DB; also covers Postgres)

| Field | Value |
|---|---|
| **Cite** | `mcp__github__get_file_contents bytebase/dbhub README.md @ HEAD 72adfdcf7bcfe46b25edbc776ce096006eba9b02` [VERIFIED 2026-05-15] |
| **License** | MIT (`bytebase/dbhub LICENSE @ 72adfdcf` SPDX-MIT) [VERIFIED 2026-05-15] |
| **Stars / forks** | 2767★ / 235 forks / 9 open issues |
| **Org** | Bytebase (open-source database DevSecOps platform; org-level T1 — named-org maintainership) |
| **Last update** | 2026-05-15 (active) |
| **Created** | 2025-03-09 (~14 months — STABLE-BURN-IN gate PASS per convergence-gate Axis 3) |
| **Coverage** | Postgres / MySQL / SQL Server / MariaDB / SQLite (single MCP, 5 DBs) |
| **Transports** | stdio / http / SSE |
| **Tools** | `execute_sql` / `search_objects` / custom-tool TOML configurability — only 2 default MCP tools (token-efficient) |
| **Guardrails** | Read-only mode + row limiting + query timeout + SSH tunneling + SSL/TLS |
| **Install** | `docker run bytebase/dbhub` OR `npx @bytebase/dbhub@latest` |
| **SRA D1-D10 score** | Use-class: 80 / License: 95 / Stars: 85 / Org-T1: 90 / Activity: 95 / Coverage: 100 / Tool-design: 90 / Transport: 90 / Token-eff: 95 (only 2 default tools) / Docs: 90 → **avg 91/100** |
| **CR-12 disposition** | **DUPLICATE-FUNCTIONALITY (with conditional PARTIAL-OVERLAP)** — duplicates graphiti+FalkorDB temporal-KG functionality if used as a memory backend; PARTIAL-OVERLAP if used as JSONL → SQL audit-warehouse analytics surface (different mechanism from graphiti) |
| **NATIVE-CC verdict** | ✅ NATIVE-CC stdio MCP — Anthropic CC native discovery via `.mcp.json` registration |
| **Wired-difficulty** | EASY (Docker pull OR npx; no extra wiring beyond `.mcp.json` entry + DSN) |
| **Probe 7 verdict** | **7.a DEMAND-ABSENCE** for application-DB query workflow (no Postgres/MySQL/SQLServer/MariaDB live in claude-sota-installed) // **7.b STUDY-PILOT-eligible** for JSONL→SQLite/Postgres SQL analytics IF ETL surface committed (Wave 27 caveat preserved per `Z:/claude-sota/.claude/rules/ahfv-probe-dag.md` Probe 7.b 5-clause check) |
| **Recommendation** | **DEFER unless ETL pilot committed** — conditional STUDY-PILOT-NARROW with 5-clause Probe 7.b check |

### #2 — crystaldba/postgres-mcp ("Postgres MCP Pro")

| Field | Value |
|---|---|
| **Cite** | `mcp__github__get_file_contents crystaldba/postgres-mcp README.md @ HEAD 07eb329c8c48e49640e0d1b5b35465d4d024c3ee` [VERIFIED 2026-05-15] |
| **License** | MIT [VERIFIED 2026-05-15] |
| **Stars / forks** | 2749★ / 301 forks / 57 open issues |
| **Org** | Crystal Corp. / Crystal DBA (Postgres-specialist commercial org) |
| **Last update** | 2026-05-15 (active) |
| **Coverage** | PostgreSQL only (deep Postgres specialization) |
| **Tools** | 9 advanced tools: list_schemas / list_objects / get_object_details / execute_sql / explain_query (with hypothetical indexes via hypopg) / get_top_queries / analyze_workload_indexes / analyze_query_indexes / analyze_db_health |
| **Differentiator** | Index tuning (Anytime-algorithm-based), EXPLAIN plans, hypothetical indexes via hypopg, comprehensive DB-health checks (buffer cache + connection + vacuum + replication + constraint + sequence), pg_stat_statements workload analysis. Goes beyond query execution to active DBA assistant. |
| **Access modes** | unrestricted (dev) / restricted (read-only TX, time-limited, prod-safe) |
| **Install** | `docker pull crystaldba/postgres-mcp` OR `pipx install postgres-mcp` OR `uv pip install postgres-mcp` |
| **SRA score** | **avg 84/100** |
| **CR-12 disposition** | **DUPLICATE-FUNCTIONALITY** vs dbhub if Postgres-only goal; **GENUINELY-NEW** vs dbhub if DBA-grade index-tuning the differentiator |
| **Probe 7 verdict** | **7.a DEMAND-ABSENCE** — claude-sota-installed runs ZERO Postgres workloads |
| **Recommendation** | **REJECT-FOR-FIT** — no Postgres demand. If operator adds Postgres workload, re-audit |

### #3 — Reference Postgres MCP (modelcontextprotocol/servers-archived)

| Field | Value |
|---|---|
| **Status** | **ARCHIVED (archived:true)** — repo desc: "Reference MCP servers that are no longer maintained" |
| **Probe 6 verdict** | **STRUCTURAL BLOCKER — ARCHIVE-STATUS-FAIL** per `Z:/claude-sota/.claude/rules/ahfv-probe-dag.md` Probe 6 |
| **Recommendation** | **REJECT** — archive-status STRUCTURAL blocker; crystaldba/postgres-mcp + bytebase/dbhub are active maintained replacements |

## Section 2 — SQLite MCP catalog (Top-2)

### #1 — bytebase/dbhub (SQLite covered)

Same scoring as Section 1 #1. SQLite is one of 5 supported DBs.

### #2 — Reference SQLite MCP (modelcontextprotocol/servers-archived)

- **ARCHIVED** — STRUCTURAL BLOCKER per Probe 6
- **Probe 7 verdict**: 7.a DEMAND-ABSENCE — mcp-memory already accesses sqlite_vec backend at `Z:/claude-sota-installed-state/.mcp-memory/memory.db`
- **CR-12**: DUPLICATE-FUNCTIONALITY (mcp-memory already accesses sqlite_vec backend)
- **Recommendation**: **REJECT** — archive-status + duplicate of incumbent `memory` MCP

**SQLite-specialist gap**: After archive of the reference SQLite MCP, there is no clear single-purpose SQLite-only MCP with comparable adoption. Multi-DB dbhub is the canonical path forward.

## Section 3 — MongoDB MCP catalog (Top-1, official)

### #1 — mongodb-js/mongodb-mcp-server (OFFICIAL MongoDB)

| Field | Value |
|---|---|
| **Cite** | `mcp__github__get_file_contents mongodb-js/mongodb-mcp-server README.md @ HEAD d4fc075304034ec466d21981d6a04e356d30729c` [VERIFIED 2026-05-15] |
| **License** | Apache 2.0 [VERIFIED 2026-05-15] |
| **Stars / forks** | 1022★ / 241 forks / 32 open issues |
| **Org** | **mongodb-js (OFFICIAL MongoDB org)** — TIER-1-DIRECT vendor maintenance |
| **Created** | 2025-04-04 (~13 months — STABLE-BURN-IN gate PASS) |
| **Coverage** | MongoDB databases + MongoDB Atlas Clusters |
| **Install** | `npx -y mongodb-mcp-server` (with `--readOnly` flag option) |
| **SRA score** | **avg 87/100** |
| **Probe 7 verdict** | **7.a DEMAND-ABSENCE** — no MongoDB deployment, no MongoDB DSN, no document-DB workflow in repo |
| **Recommendation** | **REJECT-FOR-FIT** — DEMAND-ABSENCE; re-audit if operator adopts MongoDB |

## Section 4 — Redis MCP catalog (Top-2)

### #1 — redis/mcp-redis (OFFICIAL Redis)

| Field | Value |
|---|---|
| **Cite** | `mcp__github__get_file_contents redis/mcp-redis README.md @ HEAD 5413a67a856c863ef04793a69080a5a1b4b467cf` [VERIFIED 2026-05-15] |
| **License** | MIT (per README badge) |
| **Stars / forks** | 510★ / 96 forks / 12 open issues |
| **Org** | **redis (OFFICIAL Redis Inc.)** — TIER-1-DIRECT vendor maintenance |
| **Created** | 2025-04-02 (~13 months — STABLE-BURN-IN gate PASS) |
| **Coverage** | Full Redis data structures: strings / hashes / lists / sets / sorted sets / streams / JSON / pub-sub / consumer groups; vector indexes + vector search; query engine; server management |
| **PyPI** | `pip install redis-mcp-server` OR `uvx --from redis-mcp-server@latest redis-mcp-server` |
| **SRA score** | **avg 82/100** |
| **CR-12 disposition** | **PARTIAL-OVERLAP** — graphiti uses FalkorDB on port 16379 (Redis-protocol-compatible graph DB); As a separate Redis cache/queue surface: **DUPLICATE-FUNCTIONALITY** (no separate Redis deployment) |
| **Probe 7 verdict** | **7.a DEMAND-ABSENCE** — FalkorDB-via-graphiti is the only Redis-protocol service |
| **Recommendation** | **REJECT-FOR-FIT** — DEMAND-ABSENCE; graphiti owns FalkorDB access |

### #2 — Reference Redis MCP (modelcontextprotocol/servers-archived)

- **ARCHIVED** — STRUCTURAL BLOCKER per Probe 6
- **Recommendation**: **REJECT** — superseded by official redis/mcp-redis

## Section 5 — Multi-DB MCP catalog (Top-2)

### #1 — bytebase/dbhub

See Section 1 #1. **Canonical multi-DB MCP**: 5 DBs in single zero-dependency, token-efficient MCP. Org-level T1.

### #2 — executeautomation/mcp-database-server

| Field | Value |
|---|---|
| **License** | MIT [VERIFIED] |
| **Stars / forks** | 351★ / 96 forks / 21 open issues |
| **Org** | ExecuteAutomation (test-automation org; individual maintainer not vendor-level) |
| **Coverage** | SQLite / SQL Server / Postgres (3 DBs) |
| **SRA score** | **avg 74/100** |
| **CR-12 disposition** | **DUPLICATE-FUNCTIONALITY** vs bytebase/dbhub (overlapping DBs, dbhub has wider coverage + better org-level T1) |
| **Recommendation** | **REJECT-FOR-FIT** — dbhub strictly dominates on coverage + org + maintainer scale |

## Section 6 — Probe 7 Demand-Gate Analysis (HONEST-NON-FINDING)

**HONEST FINDING**: claude-sota-installed has **ZERO application-database workflows**. Audit of `.mcp.json` confirms:

| Existing DB-related primitive | Owner | Demand-scope |
|---|---|---|
| `graphiti` MCP + FalkorDB at port 16379 | graphiti-core + FalkorDB Docker container | Temporal-KG memory (Layer L3) — owns FalkorDB scope entirely |
| `memory` MCP + sqlite_vec backend | doobidoo/mcp-memory-service | Vector-store semantic memory (Layer L1+L2 combined) — owns SQLite memory.db scope |
| `gitnexus` MCP + ladybugdb graph store | abhigyanpatwari/GitNexus | Code-graph/symbols/relationships |
| `repomix` MCP | yamadashy/repomix | File/repo content packing (no DB) |

**No live workflow** routes through Postgres / MySQL / SQL Server / MariaDB / standalone-SQLite / MongoDB / standalone-Redis-cache.

### 7.b DEMAND-CREATES-NEW-WORKFLOW (conditional)

**bytebase/dbhub for JSONL → SQLite/Postgres SQL audit-warehouse analytics**:
1. ✅ Named operational use case: ad-hoc SQL queries across `.claude/state/*.jsonl` files
2. ✅ Cited local input/source path: `Z:/claude-sota-installed/.claude/state/*.jsonl`
3. ❌ Wiring path: REQUIRES building JSONL → SQLite ETL adapter
4. ❌ Incumbent comparison: existing `rg`, `jq`, GitNexus, Python scripts adequately serve spot-query use case
5. ❌ Reversible time-box: no operator commitment to build ETL surface

**Verdict on dbhub pilot**: **3 of 5 clauses FAIL** → does NOT qualify as STUDY-PILOT-eligible. Remains **REJECT-FOR-FIT.a DEMAND-ABSENCE** unless ETL surface is committed.

## Section 7 — Recommendations

### ADOPT-NOW: **NONE**

### STUDY-PILOT-NARROW (conditional):

| Candidate | Conditional trigger |
|---|---|
| **bytebase/dbhub** | IF operator commits to build JSONL → SQLite/Postgres ETL adapter + ≥1 sustained SQL-analytics report consumer (~2-5 day pilot cost) AND `audit-trail-sql-analytics` use case becomes mature workflow per `audit-action-loop.md` Wire→Surface→Close→Re-fire pattern, THEN re-audit and reclassify as Probe 7.b STUDY-PILOT-NARROW |

### REJECT-FOR-FIT (Probe 7.a DEMAND-ABSENCE):

- **crystaldba/postgres-mcp** — no Postgres deployment
- **mongodb-js/mongodb-mcp-server** — no MongoDB deployment
- **redis/mcp-redis** — graphiti owns FalkorDB scope; no separate Redis cache
- **executeautomation/mcp-database-server** — strictly dominated by dbhub

### REJECT (Probe 6 STRUCTURAL):

- **modelcontextprotocol/servers-archived (postgres / sqlite / redis)** — archive-status banner; superseded

## Section 8 — VERDICT

VERDICT: **REJECT-FOR-FIT-MAJORITY** — 9 of 10 DB MCP candidates fail Probe 7.a DEMAND-ABSENCE (claude-sota-installed has zero application-DB workflows; incumbents graphiti+FalkorDB + mcp-memory+sqlite_vec + gitnexus cover all live memory/KG/code-graph use cases). One conditional candidate `bytebase/dbhub` (MIT, 2767★, Bytebase org-T1, multi-DB, token-efficient 2-tool design, MIT) FAILS Probe 7.b 5-clause check (3 of 5 clauses fail); STUDY-PILOT-NARROW reclassification possible IF operator commits to JSONL → SQLite ETL adapter + named audit-warehouse SQL analytics workflow. **No ADOPT-NOW.** **Critical Probe 6 finding**: `modelcontextprotocol/servers-archived` is ARCHIVED (archived:true, 2026-05-14) — official reference postgres/sqlite/redis MCPs unmaintained, auto-REJECT. Cross-model gate per CR-3: this dispatch ran as Sonnet stand-in; orchestrator MUST file Path P codex T1 ratification per `cross-model-consensus.md §The contract` before any ship-decision lands.
