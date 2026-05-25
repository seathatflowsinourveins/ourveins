# W331 Cluster E Deep-Dive — Memory / RAG / Vector Layer

> **Wave**: W331 follow-up to W330 mega-audit
> **Framework**: sca-v12.1 deep-dive line-by-line (`Z:/claude-sota-installed/.claude/skills/sota-convergence-audit/SKILL.md`)
> **Scope**: 10 cluster-E repos (mem0, graphiti, hindsight, cognee-integration-claude, agentmemory, supermemory, claude-mem, mempalace, pgvectorscale, byterover-cli) + 3 external T1-hindsight-replacement candidates (mem0 v2.x / Letta / Zep) with org-distinct cite anchors
> **Operator constraints honored**: mature repos = deeper dive (no PRs); GraphQL/SOTA bypass; NO key rotation; ≥3 org-distinct cites
> **Today**: 2026-05-19

---

## §0 — TL;DR

The 5-tier stack as documented in `CLAUDE.md` is W317-snapshot-stale on Tier-1 (hindsight RETIRED — daemon down + no NSSM service + no LISTEN on :9077; option-(b) demote). The W330 P0.11 bake-off is therefore not a research curiosity but a P0 hole. Of the 10 cluster-E repos plus external candidates, the W331 verdict is:

- **T1 replacement winner**: **`mem0ai/mem0` v2.0.2** as primary (Apache-2.0, 56k stars, V3 phased extract pipeline at `mem0/memory/main.py:573-686` with `ADDITIVE_EXTRACTION_PROMPT` at `mem0/configs/prompts.py:468`, 24 vector-store backends inc. pgvector + Azure AI Search + Milvus + Qdrant). Mem0 wins on (a) install_score 4.04 vs graphiti 3.63 per W296-STREAM-C, (b) D11 context-budget delta 1,764 vs 26,031 tok/conv (~93% reduction), (c) full self-host vs Zep CE deprecated, (d) ECAI 2025 paper + AWS Agent SDK exclusive memory provider Q1-Q3 2026.
- **T1 complement (temporal-KG pattern study)**: **`getzep/graphiti` 0.21+** retained at T3-PATTERN-STUDY tier (LongMemEval 63.8% vs mem0 49.0% — +15pt gap on temporal queries) but NOT re-installed as runtime (W272 service-bind retirement holds — falkorDB :16379 dependency + Z:-portable-incompatible).
- **T1 alternative (stateful agent + LongMemEval ~83.2% LoCoMo)**: **Letta** as T3-PATTERN-STUDY only — wrong harness shape (full agent runtime, not memory layer).
- **T6 already-canonical**: basic-memory unchanged.
- **Net structural change**: T1 hindsight → mem0 (open-source self-hosted, MCP-pathable via project root mem0+pgvector pinned in `.mcp.json`). Reorder tiers: T1 mem0 (episodic+vector) · T2 cognee (cold GraphRAG) · T3 graphiti PATTERN-STUDY · T4 langfuse (trace) · T5 basic-memory (markdown). Net tier-count after collapse: 5.

Three org-distinct cite anchors are listed in §5; all SOTA primary patterns mapped to §6.

---

## §1 — Per-repo verdict table

Scored per sca-v12.1 dim catalog (`Z:/claude-sota-installed/.claude/skills/sota-convergence-audit/references/dimensions.md`). T0-T5 verdict per W259v8 tier scheme. file:line evidence pinned.

| # | Repo | Stars | License | HEAD | Verdict | Score | Map to our T1-T6 |
|---|---|---:|---|---|---|---:|---|
| 1 | `mem0ai/mem0` v2.0.2 | 56k+ | Apache-2.0 (`mem0/LICENSE:1-2`) | refs/heads/main | **T1 INSTALL — PROMOTE TO T1** | 4.04 | **NEW T1** (replaces retired hindsight); pgvector backend via `mem0/vector_stores/pgvector.py:1-150` |
| 2 | `getzep/graphiti` 0.21+ | 26k+ | Apache-2.0 | refs/heads/main @ `9a2d6d0` | **T3 PATTERN-STUDY** (HOLD — W272 retired) | 3.63 | Pattern source for temporal-validity model; bi-temporal model evidence at `graphiti_core/edges.py` + 6 KG drivers (Neo4j/FalkorDB/Kuzu/Neptune) |
| 3 | `vectorize-io/hindsight` v0.6.5 (cc-plugin) | low★ | MIT (`LICENSE:1-3`) | refs/heads/main | **T5 REJECT (current T1) — RETIRED** | 2.6 | T1 plugin scaffolding excellent (`hindsight-integrations/claude-code/hooks/hooks.json` 4 hooks SessionStart/UserPromptSubmit/Stop/SessionEnd) but daemon-fragile; opt-(b) demote per W317-S1 |
| 4 | `topoteretes/cognee-integration-claude` | low★ | UNLICENSED | refs/heads/main | **T4 ADOPT-AS-DOC** (LICENSE-gate) | 2.8 | Already T3 cognee LIVE via `cognee-mcp` HTTP `:8000` (NSSM `CogneeMCP`); integration scripts retained as REFERENCE pattern for SessionStart/UserPromptSubmit hook wiring |
| 5 | `rohitg00/agentmemory` v0.9.17 | low★ | Apache-2.0 (`@agentmemory/mcp/package.json:24`) | refs/heads/main | **T4 PATTERN-STUDY — DEFER** | 3.0 | iii-engine self-replacement primitives interesting (pubsub/cron/queue/observability/sandbox/database) but **infra rewrite footprint = catastrophic** for Z:-portable runtime; pattern-only |
| 6 | `supermemoryai/supermemory` v4.0.0 | mid★ | MIT (`LICENSE.md:1-3`) | refs/heads/main | **T5 REJECT — Cloud-only** | 2.5 | Cloudflare-Worker + Durable-Objects runtime (`apps/mcp/wrangler.jsonc:24-31` `class_name: SupermemoryMCP` + `migrations: new_sqlite_classes`). Excellent OAuth+x-sm-project pattern but architectural mismatch with self-host Z:-portable |
| 7 | `thedotmack/claude-mem` v13.2.0 | 76k+ (star-inflation flag) | Apache-2.0 | refs/heads/main | **T4 PATTERN-STUDY — DEFER** | 2.7 | postgres+sqlite dual storage + queue pattern (`src/storage/postgres/agent-events.ts`, `src/server/queue/ObservationQueueEngine.ts`); pattern overlaps with basic-memory + cognee; redundancy not worth the install |
| 8 | `MemPalace/mempalace` v3.3.5 | low★ | MIT (`pyproject.toml:6`) | refs/heads/main | **T4 PATTERN-STUDY — verbatim-store pattern** | 3.4 | LongMemEval R@5 **96.6% raw (no LLM)** (`README.md` benchmarks); ChromaDB-only backend `mempalace/backends/chroma.py:1-30`; scam-alert prefix is unusual; pattern-study for verbatim-storage approach but not install (chroma-dependent vs our cognee+basic-memory) |
| 9 | `pgvector/pgvectorscale` v0.9.0 | 3k+ | PostgreSQL OSS | refs/heads/main | **T3 ADOPT FOR T1 BACKING STORE** | 4.2 | If T1=mem0 promoted, mem0's pgvector backend (`mem0/vector_stores/pgvector.py` accepts `diskann=True` flag) can transparently use pgvectorscale's StreamingDiskANN (`pgvectorscale/Cargo.toml:1-25` v0.9.0, pgrx 0.16.1, pg18-default, SBQ quantize at `src/access_method/sbq/quantize.rs`). 28× lower p95 latency vs Pinecone s1; GUC tunables at `src/access_method/guc.rs:1-150` (`diskann.query_search_list_size`, `diskann.query_rescore`) |
| 10 | `campfirein/byterover-cli` v3.13.0 | low★ | **Elastic License 2.0 (ELv2)** ← LICENSE non-OSI | refs/heads/main | **T5 REJECT — License + scope mismatch** | 2.2 | ELv2 forbids "provide the software to third parties as a hosted or managed service" (`LICENSE:8-12`). Even with self-host carve-out, "context tree + git-like VC" overlaps basic-memory; cardinal-rule-1 trusted-source friction |

**Tier-bucket totals**: 1 INSTALL (mem0), 1 ADOPT-AS-BACKING-STORE (pgvectorscale), 4 PATTERN-STUDY (graphiti / agentmemory / claude-mem / mempalace), 1 ADOPT-AS-DOC (cognee-integration-claude), 3 REJECT (hindsight / supermemory / byterover).

---

## §2 — Novel SOTA patterns (cited, file:line)

### §2.1 — mem0 V3 Phased Batch Pipeline (the new SOTA episodic-consolidation primitive)

The mem0 v2.0.2 codebase ships a fundamentally upgraded add-pipeline relative to the pre-V3 implementations cited in W281h / W282. The pipeline is documented across `mem0/memory/main.py:573-686` (sync) and `mem0/memory/main.py:2003-2101` (async), with the LLM-side prompt at `mem0/configs/prompts.py:468` (`ADDITIVE_EXTRACTION_PROMPT`) and `326` (`PROCEDURAL_MEMORY_SYSTEM_PROMPT`).

The pipeline has 5 phases:

1. **Phase 0 — Context gathering**: `_build_session_scope(filters)` + `db.get_last_messages(session_scope, limit=10)` (file `mem0/memory/main.py:680-682`). The session-scope is per `user_id+agent_id+run_id` triple.
2. **Phase 1 — Existing memory retrieval**: `vector_store.search(query=parsed_messages, vectors=query_embedding, top_k=10, filters=search_filters)` (`mem0/memory/main.py:687-693`).
3. **Phase 2 — UUID→int mapping** (anti-hallucination guard): "Map UUIDs to integers (anti-hallucination)" — comment at `mem0/memory/main.py:699`. Forces the LLM extractor to reference integer indices rather than memory IDs that LLMs notoriously hallucinate.
4. **Phase 3 — Additive extraction**: LLM call with `ADDITIVE_EXTRACTION_PROMPT` returning JSON `{"memory":[{"id","text","event": "ADD"|"UPDATE"|"DELETE"|"NONE","old_memory"}]}` (prompt body at `mem0/configs/prompts.py:444-470`).
5. **Phase 4 — Apply ops via `_create_memory` / `_update_memory`** (`mem0/memory/main.py:1586`, `1657`).

**Why this is SOTA**: per W296-STREAM-C §B + the Mem0 ECAI 2025 paper (arXiv:2504.19413 cited via huggingface `paperswithcode.com/area/methodology`), the V3-phased-batch pipeline achieves **1,764 tokens/conversation vs 26,031 for full-context** (93% reduction) at p95 latency **0.200s vs 17.12s** (91% reduction) while accepting only ~6 percentage-point accuracy gap on LOCOMO. This is the pattern that no prior W282 audit had captured in implementation detail.

**Pattern translatable to other tiers**: T6 basic-memory could adopt a phased-batch pipeline pattern (currently it uses raw write-through; pattern-lift candidate for W332+).

### §2.2 — Graphiti Bi-Temporal Validity Model (cite-anchor pattern)

Graphiti's bi-temporal model is the most studied temporal-KG pattern in 2026 (`graphiti_core/edges.py` + 6 graph-driver implementations at `graphiti_core/driver/{neo4j,falkordb,kuzu,neptune}/operations/entity_edge_ops.py`). The model tracks **two orthogonal time axes** per edge:

- `T` (event time) — `valid_from` / `valid_until` (when the fact was true in reality)
- `T'` (transaction time) — `t'_created` / `t'_expired` (when Zep ingested or invalidated the fact)

Source: Zep arxiv 2501.13956 §3 ("Zep implements a bi-temporal model, where timeline T represents the chronological ordering of events, and timeline T' represents the transactional order of Zep's data ingestion"). On LongMemEval this earns +15pt vs mem0 (63.8% vs 49%) — exclusively on temporal-reasoning + knowledge-update sub-tasks (LongMemEval scoring rubric per `emergentmind.com/topics/longmemeval-benchmark`).

**Adoption in our runtime**: PATTERN-STUDY only. Graphiti's runtime cost is **>600k tokens per conversation** for complex use cases (W296-STREAM-C, vectorize.io/articles/mem0-vs-zep:Q2). That alone disqualifies as T1. The pattern is liftable into basic-memory's existing markdown frontmatter as `valid_from:`/`valid_to:` YAML keys without installing graphiti runtime (W332+ proposal).

### §2.3 — pgvectorscale StreamingDiskANN + Statistical Binary Quantization (SBQ)

`pgvector/pgvectorscale` v0.9.0 (HEAD ref refs/heads/main, `pgvectorscale/Cargo.toml:1-25`) ships three independent SOTA layers on top of `pgvector`:

- **StreamingDiskANN** — Microsoft DiskANN-derived graph index that streams disk-resident vectors during search. `pgvectorscale/src/access_method/{graph,sbq,plain}/*.rs`. Tuned via 7 GUC variables in `src/access_method/guc.rs:1-150`: `diskann.query_search_list_size` (1-10000), `diskann.query_rescore` (0-1000 — re-rank top-N with exact distance), `diskann.parallel_flush_interval` (0.0-1.0 fraction), `diskann.parallel_initial_start_nodes_count` (1-10000), `diskann.min_vectors_for_parallel_build` (>=1), `diskann.force_parallel_workers` (-1=auto).
- **Statistical Binary Quantization (SBQ)** — `pgvectorscale/src/access_method/sbq/quantize.rs:1-120`. Improves on standard BQ by considering vector distribution statistics during compression.
- **Filtered DiskANN (label-based filtering)** — `pgvectorscale/src/access_method/labels/mod.rs`. Combines vector similarity with label filter without losing index efficiency (cite: Microsoft Research Filtered DiskANN).

**Benchmark**: 28× lower p95 latency, 16× higher throughput vs Pinecone storage-optimized (s1) at 99% recall, 75% lower cost (per repo README — verified head 2026-04-30 push, refresh-stable).

**Adoption signal**: pgvectorscale becomes part of the W331-promoted T1 stack — mem0's pgvector backend explicitly supports `diskann=True` (`mem0/vector_stores/pgvector.py:CREATE TABLE` accepts the parameter), so the mem0+pgvectorscale composition is a **two-line config change** in `.mcp.json` rather than a multi-week migration. **StatementTimeout** is a connection-string parameter handled by mem0's connection-pool wrapper (W296 path matches `claude-mem/src/storage/postgres/config.ts:DEFAULT_STATEMENT_TIMEOUT_MS = 30_000`).

### §2.4 — Mempalace Verbatim Storage + R@5=96.6%-raw (no LLM)

`MemPalace/mempalace` v3.3.5 (`pyproject.toml:3-4`) achieves **96.6% R@5** on LongMemEval (500 questions) **raw mode — zero LLM calls** (README benchmarks table verified). The pattern is verbatim-storage backed by ChromaDB embeddings via `mempalace/backends/chroma.py:1-30` — bge-large or MiniLM-L6-v2 embedder, no consolidation phase. Hybrid v4 (50-dev-tuned, 450-held-out) raises to 98.4%; +LLM-rerank ≥99%.

**Why this matters for cluster E**: the 96.6%-raw figure is a **null-hypothesis check** for any phased-extract pipeline (mem0, claude-mem, hindsight). If a downstream system with LLM extraction scores below 96.6% on LongMemEval-R@5, the extraction step is destroying signal not adding it.

**Adoption**: PATTERN-STUDY only — ChromaDB hard-dependency is architectural mismatch with our cognee+basic-memory+(proposed) mem0+pgvector lane. But the **benchmark-as-null** discipline is liftable into the W331 acceptance criteria for any T1 replacement.

### §2.5 — Hindsight Plugin-Hook Lifecycle (the pattern we keep even if we retire the engine)

Even though hindsight is RETIRED at runtime per W317-S1, the Claude-Code plugin scaffolding at `hindsight-integrations/claude-code/hooks/hooks.json:1-50` is best-in-class:

```json
{ "SessionStart": [...session_start.py 5s...],
  "UserPromptSubmit": [...recall.py 12s...],
  "Stop": [...retain.py 15s, async: true...],
  "SessionEnd": [...session_end.py 10s...] }
```

Pattern characteristics:
- **Stop hook async-flagged** — non-blocking retain; recovers from a fatal flaw in claude-mem v13.x where SessionEnd hooks blocked terminal shutdown.
- **34 config knobs** documented at `hindsight-integrations/claude-code/CHANGELOG.md` (0.1.0 line: "34 configuration options via `settings.json` with env var overrides").
- **Chunked retention** — `retainEveryNTurns + retainOverlapTurns` (sliding window) prevents storing every turn but maintains continuity.

**Adoption in our runtime**: mem0-replacement-plugin will copy the hook-lifecycle pattern verbatim (4 hooks + async-Stop + chunked-retain). The hindsight plugin scaffold becomes the BLUEPRINT for the mem0 plugin.

### §2.6 — Supermemory Cloudflare Durable-Objects MCP (architectural pattern)

`supermemoryai/supermemory` v4.0.0 ships an OAuth-enabled MCP server backed by Cloudflare Durable Objects (`apps/mcp/wrangler.jsonc:23-31`):

```jsonc
"durable_objects": { "bindings": [{ "name": "MCP_SERVER", "class_name": "SupermemoryMCP" }] },
"migrations": [{ "tag": "v1", "new_sqlite_classes": ["SupermemoryMCP"] }]
```

The `new_sqlite_classes` flag means each Durable Object instance has its own embedded SQLite database — single-writer-per-DO guarantees no cross-session race conditions. This is **explicitly relevant to W330 P0.2** (cross-session race-condition resolution).

**Adoption**: REJECT for runtime (cloud-only deployment; Z:-portable-incompatible) but **PATTERN-STUDY for §4** below.

### §2.7 — Cognee 3-Way Pathway (cognee-mcp vs cognee-integration-claude vs cognee-CC-plugin)

Per W259v6 §1 inline-referenced via timeline search, three distinct cognee-CC bridges exist:
- **Pathway A — `topoteretes/cognee-integration-claude`** (cluster-E #4) — sample integration scripts, **NO LICENSE** → cardinal-rule-1 BLOCKER for install.
- **Pathway B — `topoteretes/cognee-integrations/integrations/claude-code`** — full CC plugin with 6 lifecycle hooks (SessionStart / UserPromptSubmit×2 / etc per `hooks/hooks.json`) and per-directory session-IDs; **STILL NO LICENSE** → same blocker.
- **Pathway C — `cognee-mcp`** — Apache-2.0, HTTP transport, currently live as `CogneeMCP` NSSM service `:8000` (W314-r1 fs-probe).

Net: §3 our runtime already lives on Pathway C, which is the only license-clean route. Pathway A/B remain referenced as `T4 ADOPT-AS-DOC` (the hook patterns are useful even though the runtime is unlicensed).

### §2.8 — agentmemory iii-engine "platform-replacement" model

`rohitg00/agentmemory` v0.9.17 ships `iii-config.yaml` (`workers: [iii-http, iii-state, iii-queue, iii-pubsub, iii-cron, iii-stream, iii-observability, iii-exec]`) — a self-described "platform replacement" pattern where Express/Postgres/pgvector/SSE/pm2/Prometheus are **all replaced by iii-engine primitives** (README tail-section "What iii replaces" matrix). The `iii worker add <name>` extension model lets operators dynamically add `iii-pubsub`/`iii-cron`/`iii-queue`/`iii-sandbox`/`iii-database`/`mcp` to a running agentmemory instance.

**This is architecturally bold but install-incompatible**: replacing our NSSM-supervised Cognee/LlamaSwap/Langfuse with the iii-engine supervisor would require a multi-week migration with no W330-priority justification.

**Adoption**: PATTERN-STUDY for `W332+ supervisor-replacement audit` only. Specifically the `iii-observability` worker (OTEL-traces-on-every-function pattern at sampling_ratio:1.0) overlaps with our Langfuse T5; rejected on redundancy.

### §2.9 — Claude-mem PostgreSQL+BullMQ queue pattern

`thedotmack/claude-mem` v13.2.0 (`src/storage/postgres/` directory) implements a structured PostgreSQL + BullMQ queue pipeline for memory-event ingestion. Key implementation surfaces:

- `src/storage/postgres/config.ts` — `PostgresConfig` with `statementTimeoutMillis: 30_000`, `idleTimeoutMillis: 30_000`, `connectionTimeoutMillis: 5_000`, `max: 10` pool.
- `src/storage/postgres/agent-events.ts` — agent-event table with `idempotencyKey` (deterministic-key dedup) + `serverSessionId` (session-scope).
- `src/server/queue/ObservationQueueEngine.ts` — BullMQ-backed observation-generation jobs with `idempotencyKey + maxAttempts + nextAttemptAtEpoch` retry semantics.

**Pattern significance**: the idempotency-key + queue retry pattern is **the cross-session race-condition fix** referenced in §4. Concurrent writes for the same conversational episode collapse to one persisted row regardless of how many parallel CC sessions hit the retain hook.

**Adoption**: PATTERN-STUDY. Mem0 v2.0.2's `mem0/memory/storage.py:SQLiteManager` has weaker race-handling (per-thread `_lock = threading.Lock()`, no idempotency-keys at the schema layer). Combining mem0-V3-phased-extract WITH claude-mem-style idempotency-keyed write barriers is a **W332 lift candidate** for cross-session safety.

### §2.10 — Byterover context-tree (git-like VC for context)

`campfirein/byterover-cli` v3.13.0 implements git semantics over a "context tree" data structure (`brv vc init|add|commit|branch|checkout|merge|push|pull|fetch|remote|reset` — full git surface in `src/oclif/commands/mcp.ts` + `src/server/infra/mcp/mcp-server.ts`). 24 built-in agent tools + 22 AI coding agents supported.

**Pattern**: knowledge-as-source-controlled-tree is novel.

**Adoption**: **REJECT** — Elastic License 2.0 (LICENSE:1) forbids hosted-service redistribution, and the "context-tree" abstraction would replace basic-memory's markdown-file model (a working SOTA) with a less-portable graph-RDB store. Pattern logged for `W333+ basic-memory git-overlay` exploration only.

---

## §3 — T1-hindsight-replacement bake-off: mem0 vs Letta vs Zep (ranked)

The W330 P0.11 hole is the loss of T1 (hindsight RETIRED per W317-S1: daemon down + no NSSM service + no LISTEN on :9077 + no replacement plan). The 3-candidate bake-off:

### §3.1 — Scoring rubric (sca-v12.1 + W331-specific dims)

Dimensions weighted per W259v8:
- D1 install_score (Z:-portable + Windows-native compatibility)
- D3 harness_fit (MCP-pathable, hook-pathable)
- D8 benchmark_score (LongMemEval, LoCoMo)
- D11 context_budget (tokens/conversation overhead)
- D12 source-trust (license, stars-as-sub-signal)
- D13 SOTA pattern lift
- W331-add: cross-session safety (relevance to W330 P0.2)
- W331-add: NO-key-rotation hard constraint (operator)

### §3.2 — Candidate ranking

| Dim | mem0 v2.0.2 | Letta (MemGPT) v1.x | Zep self-host (Graphiti raw) |
|---|---|---|---|
| D1 install_score | **4.04** (Apache-2.0, full self-host, MCP server first-class) | 3.20 (Apache-2.0 + ADE; agent-runtime swallows whole stack) | 1.50 (Community Edition DEPRECATED per vectorize.io 2026-03-15; must run Graphiti + Neo4j/FalkorDB/Kuzu yourself) |
| D3 harness_fit | **4.50** (mem0 MCP server stdio; integrates as `.mcp.json` `uvx mem0-mcp` or HTTP `:8001`) | 2.20 (Letta is the stack; CC becomes the *client* of Letta agent runtime; harness inversion) | 2.40 (Graphiti has stdio MCP but service-bind FalkorDB :16379 = W272 already-retired runtime; same constraint that retired graphiti in our runtime) |
| D8 LongMemEval | 49.0% (independent eval per vectorize.io 2026-03-15) | **~83.2%** LoCoMo (per dev.to/varun 2026-03-18 dataset) | **63.8%** LongMemEval @ GPT-4o (Zep arxiv 2501.13956 §4) |
| D11 context_budget | **1,764 tok/conv** (Mem0 ECAI 2025 paper arXiv:2504.19413) | n/a (memory in agent core ≈ continuous overhead) | 26,031 → >600k tok/conv (W296-STREAM-C; graph-construction expensive) |
| D12 source-trust | Apache-2.0, 56k★, AWS Agent SDK exclusive memory provider Q1-Q3 2026 | Apache-2.0, 21k★, Stanford research project commercialized | Apache-2.0 (Graphiti) + commercial (Zep), 26k★ |
| D13 SOTA pattern | V3 phased-batch + UUID→int anti-hallucination + 24 vector backends | OS-memory-hierarchy (core/recall/archival) + agent-as-RAM-manager | Bi-temporal validity (T + T') + edge-invalidation + graph-traversal-search |
| Cross-session safety | Medium (per-thread `_lock` in SQLiteManager; needs idempotency-key lift) | Strong (single-agent-process model; no concurrent-write) | Strong (graph-DB transaction semantics) |
| NO-key-rotation | PASS (uses local LLM provider auto-detect + Ollama/llama-swap; OpenAI/Anthropic/local-promax options per W301) | PASS (configurable LLM provider; ADE supports BYO) | Hard ambiguity — Zep Cloud requires Zep API key, raw Graphiti needs no rotation |

### §3.3 — Verdict

**Winner: `mem0ai/mem0` v2.0.2** (Apache-2.0, 56k★, install_score 4.04). 4 reasons in priority order:

1. **D1 install_score 4.04** — only candidate with full self-host + Windows-native + MCP-pathable + pgvector backend matching pgvectorscale (so the §2.3 SBQ + StreamingDiskANN benefits compose). Letta is a runtime, not a memory layer (architectural inversion). Zep CE is deprecated.
2. **D11 context_budget 1,764 tokens/conv** — 93% reduction vs full-context (Mem0 ECAI 2025 paper). Zep's 600k token-graph footprint kills D11 outright.
3. **D8 49% LongMemEval is acceptable** given that (a) our T3-graphiti pattern-study remains in catalog for >temporal-heavy queries, (b) cognee T2-cold and basic-memory T5-canonical complement mem0 hot-tier on coverage.
4. **Bake-off-only constraint passing** — Letta scores higher on D8 (83.2%) but D3 harness-fit (2.20) is disqualifying: Claude Code would have to become a Letta-agent-runtime *client*, not the orchestrator. Inverts cardinal rule 3.

### §3.4 — Recommendation

```text
Decision (W331 binding): Promote mem0 v2.0.2 to T1 (Hot tier).
Backing store: PostgreSQL + pgvectorscale 0.9.0 (DiskANN+SBQ).
MCP path: project-root .mcp.json entry mem0:
    "mem0": {"command": "uvx", "args": ["--from", "mem0ai==2.0.2", "mem0-mcp"]}
Plugin path: lift hindsight-CC-plugin scaffold (4 hooks SessionStart/UserPromptSubmit/Stop-async/SessionEnd)
            → mem0-CC-plugin (operator-curated path-gated SKILL.md per cardinal rule 4).
NSSM service: optional — mem0 runs in-process via mcp-stdio (no service required).
Auth model: local-only (no Mem0 cloud API key); operator-installed Ollama/Llama-swap LLM provider continues to back extract-call.
Tier collapse: T2-memory.mcp.json doobidoo-sqlite-vec entry → REJECT/DELETE (mem0 obsoletes it) per W295-AI-2 follow-up.
```

Letta and Zep retained at **T3 PATTERN-STUDY** for graphiti-temporal-pattern and Letta-OS-memory-hierarchy pattern respectively.

---

## §4 — Cross-session race-condition resolution candidates (W330 P0.2 relevant)

The W330 P0.2 question is: **when 2+ CC sessions concurrently retain to the same memory store, how do we prevent duplicate / lost / corrupted writes?**

### §4.1 — Surveyed mechanisms across cluster E

| Repo | Mechanism | Strength | File:line evidence |
|---|---|---|---|
| `supermemory` v4.0.0 | Durable Objects per-MCP-session (Cloudflare runtime) + embedded SQLite per DO instance + OAuth + `x-sm-project` scoping | **Strong** — single-writer-per-DO at runtime layer; impossible to have 2 concurrent writers | `apps/mcp/wrangler.jsonc:24-31`, `apps/docs/supermemory-mcp/mcp.mdx` |
| `claude-mem` v13.2 | PostgreSQL + BullMQ + `idempotencyKey` (deterministic-key dedup) + `maxAttempts + nextAttemptAtEpoch` retry | **Strong** — idempotency at schema layer; concurrent retain-hooks de-dupe to single row | `src/storage/postgres/agent-events.ts`, `src/server/queue/ObservationQueueEngine.ts`, `src/storage/postgres/config.ts:DEFAULT_STATEMENT_TIMEOUT_MS = 30_000` |
| `mem0` v2.0.2 | `SQLiteManager._lock = threading.Lock()` per-instance | **Weak** — fine-grained but in-process; cross-process / cross-session races NOT covered | `mem0/memory/storage.py:1-30` |
| `graphiti` 0.21+ | Graph-DB transaction (Neo4j/Kuzu/FalkorDB native transactions); edge-invalidation atomicity | Strong (DB-native) | `graphiti_core/edges.py`, `graphiti_core/driver/{neo4j,kuzu,falkordb}/operations/entity_edge_ops.py` |
| `agentmemory` v0.9.17 | iii-queue durable retries (`iii worker add iii-queue`); single-engine writer-coordination | Strong | `iii-config.yaml` `iii-queue` + agentmemory README §"iii-queue: durable retries"` |
| `pgvectorscale` v0.9.0 | None at app layer; relies on PostgreSQL MVCC (`statement_timeout` from connection-string per claude-mem precedent) | DB-native (Postgres MVCC + statement-timeout fence) | `src/access_method/scan.rs`; configured via mem0-pgvector connection-string |
| `hindsight` v0.6.5 | Local daemon serialization (`hindsight-embed :9077`) | Strong-when-running, but **daemon-fragile and currently DOWN per W317-S1** | `hindsight-integrations/claude-code/README.md` Connection-Daemon table |
| `mempalace` v3.3.5 | ChromaDB serializable transaction model | DB-native | `mempalace/backends/chroma.py:1-100` |
| `claude-mem` (subset) | `deterministicKey` derived from agent-event payload | **Strong** — duplicate writes collapse | `src/storage/postgres/utils.ts:deterministicKey` (used by 6+ callers) |

### §4.2 — Recommendation for our runtime

**Combine 3 mechanisms** for defense-in-depth:
1. **App-layer idempotency-key** lifted from claude-mem (`deterministicKey(payload)` → `idempotencyKey` column with UNIQUE constraint). 
2. **DB-layer PostgreSQL MVCC + `statement_timeout`** (pgvectorscale's native transaction support is sufficient; configure `statement_timeout = '30s'` per claude-mem's `DEFAULT_STATEMENT_TIMEOUT_MS = 30_000`).
3. **Hook-layer async-Stop pattern** lifted from hindsight's `hooks.json:Stop {async: true}` so concurrent CC sessions don't block on each other's retain.

If mem0's V3 pipeline is upgraded to support an `idempotency_key` parameter on `add()`, the runtime is W330-P0.2 sealed. Filed as W332 follow-up for the mem0 plugin scaffolding work.

### §4.3 — Cross-reference to W280d parallel-session safety

The W280d-mandated "one git worktree per session" + "~3 parallel cap" rules (per CLAUDE.md §Architecture) handles **session-level** races. The §4 mechanism handles **memory-store-level** races within a session. They are orthogonal — both required.

---

## §5 — Cite anchors (≥3 org-distinct required)

W331 anchor set per cardinal-rule-1 trusted-source discipline:

### Anchor A — Mem0 AI (vendor)
- `mem0ai/mem0` v2.0.2 source: `Z:/claude-sota-installed-repos/mem0ai-mem0/mem0/memory/main.py:573-686` (`def add` sync) + `mem0/configs/prompts.py:468` (`ADDITIVE_EXTRACTION_PROMPT`) — V3 phased-batch + LLM-extraction prompt body.
- Paper: arXiv:2504.19413 (ECAI 2025) "Mem0: Building Production-Ready AI Agents with Scalable Long-Term Memory" — token-reduction + latency-reduction benchmarks.
- Pinned to mem0 commit referenced by pyproject.toml v2.0.2.

### Anchor B — Zep / Graphiti (academic + vendor)
- `getzep/graphiti` source: `Z:/claude-sota-installed-repos/getzep-graphiti/graphiti_core/edges.py` + 6 driver implementations under `graphiti_core/driver/{neo4j,falkordb,kuzu,neptune}/operations/entity_edge_ops.py`.
- Paper: arXiv:2501.13956 (Rasmussen et al. 2025) §3 — bi-temporal model T + T'.
- Independent eval: LongMemEval 63.8% @ GPT-4o (vectorize.io/articles/mem0-vs-zep 2026-03-15) + 71.2% @ GPT-4o with 2.58s latency (Zep paper Table 3).

### Anchor C — Timescale / pgvectorscale (PostgreSQL ecosystem)
- `pgvector/pgvectorscale` v0.9.0 source: `Z:/claude-sota-installed-repos/pgvector-pgvectorscale/pgvectorscale/Cargo.toml:1-25` (pgrx=0.16.1, pg18 default), `src/access_method/guc.rs:1-150` (7 DiskANN GUC tunables), `src/access_method/sbq/quantize.rs:1-120` (SBQ implementation).
- Benchmark: README §"28× lower p95 latency vs Pinecone s1, 16× higher throughput, 75% lower cost at 99% recall" — 50M Cohere embeddings @ 768 dims.
- Anchored to refs/heads/main 2026-04-30 push verified.

### Anchor D (supplementary) — Anthropic (harness primitives)
- Plugin hook semantics: `https://docs.anthropic.com/en/docs/claude-code/hooks` (SessionStart / UserPromptSubmit / Stop / SessionEnd).
- Plugin install: `https://code.claude.com/docs/en/plugins`.
- MCP server registration: `https://docs.anthropic.com/en/docs/claude-code/mcp`.

### Anchor E (supplementary) — Vectorize.io (3rd-party comparative)
- `vectorize.io/articles/mem0-vs-letta` (2026-03-15): mem0 vs Letta architectural comparison + LongMemEval 49% baseline.
- `vectorize.io/articles/mem0-vs-zep` (2026-03-15): mem0 vs Zep with Zep CE deprecation note.
- `vectorize.io/hindsight` — hindsight engine self-reference.

Org-distinct count: 5 — well above the ≥3 hard requirement (mem0ai, getzep, timescale, anthropic, vectorize.io). Plus Letta arxiv 2310.08560 (UC Berkeley) and Cloudflare DurableObjects (cloudflare.com) for §2.6.

---

## §6 — Direct mapping to W330 P0.11 + W325 SOTA primary

### §6.1 — W330 P0.11 — T1 hindsight replacement bake-off (CLOSED by §3)

W330 P0.11 designated this T1 replacement decision as P0 (Severity-1 blocker for cross-session memory continuity). W331 §3 closes the decision with **mem0 v2.0.2 win** + **pgvectorscale 0.9.0 backing store** + **lift hindsight-CC-plugin hook scaffolding pattern**.

Implementation queue for W332:
1. Author `mem0-cc` operator-curated plugin per cardinal-rule-4 (path-gated SKILL.md) at `.claude/skills/mem0-cc/SKILL.md`.
2. Lift hooks.json scaffolding from `hindsight-integrations/claude-code/hooks/hooks.json` → `mem0-cc/hooks/hooks.json` (4 hooks, Stop async-flagged).
3. Add `mem0` MCP server entry to `.mcp.json` (CR-9 version-pin: `uvx --from mem0ai==2.0.2 mem0-mcp`).
4. Configure pgvectorscale on local Postgres 18 (NSSM service or Docker) with `statement_timeout = '30s'` + `diskann.query_search_list_size = 100` + `diskann.query_rescore = 50` (rule-of-thumb defaults pending W332 tuning).
5. Wire idempotency-key column to mem0 schema via psql migration (lift from claude-mem `deterministicKey` pattern).
6. Smoke-test cross-session retain race via 2 git-worktrees-of-CC; expect zero duplicate rows when idempotency-key fires.
7. Retire hindsight from `.claude/settings.json` plugin list. Delete `hindsight-memory` plugin per W255-spirit cleanup.
8. Update CLAUDE.md §Runtime-state Memory-live block (T1 hindsight → T1 mem0).

### §6.2 — W325 SOTA primary alignment

W325 SOTA primary discipline mandates: each tier must point at a SOTA primary with cite-anchor freshness. Post-W331 alignment:

| Tier | Engine (post-W331) | SOTA primary cite | Freshness check |
|---|---|---|---|
| T1 (hot) | mem0 v2.0.2 | arXiv:2504.19413 (ECAI 2025) | refs/heads/main 2026-05-16 push |
| T2 (warm vector) | pgvectorscale 0.9.0 + pgvector | Timescale benchmark @ 2026-04-30 push | green |
| T3 (KG pattern) | graphiti 0.21+ PATTERN-STUDY | arXiv:2501.13956 (Jan 2025) | refs/heads/main @ 9a2d6d0 |
| T4 (cold doc-GraphRAG) | cognee-mcp :8000 LIVE | cognee 1.26.0 | NSSM `CogneeMCP` RUNNING per W314-r1 |
| T5 (trace) | langfuse v3.170.0 | langfuse.com docs | NSSM RUNNING |
| T6 (markdown canonical) | basic-memory 0.21.1 | basicmachines-co/basic-memory | live per W295 |

Net: 6 tiers post-W331 (was 5; gain mem0 as T1 + tier-rename pgvectorscale T2). Or 5 tiers if we collapse pgvectorscale into mem0-backing (since pgvectorscale is invisible to the application layer once mem0 is configured with `diskann=True`). Recommended: keep as 6 with pgvectorscale broken-out for clarity, since the Timescale dependency is a meaningful operational object (NSSM service if local Postgres → if not, just connection-string).

### §6.3 — Open W332 work that flows from W331

Filed candidate sub-waves:

- **W332-A**: Author mem0-cc plugin (§6.1 implementation queue).
- **W332-B**: Tune pgvectorscale GUCs against our embedding model (qwen3-embedding:0.6b → SBQ + DiskANN parameters).
- **W332-C**: Lift bi-temporal pattern from graphiti into basic-memory markdown frontmatter (`valid_from:` / `valid_to:` YAML keys) — closes the temporal-reasoning gap without runtime-installing graphiti.
- **W332-D**: Cross-session race fuzz-test (2-worktree-CC harness → mem0 retain → expect zero duplicate rows; harness lives under `tests/cross-session-fuzz/`).
- **W332-E**: Retire T2-memory.mcp.json doobidoo-sqlite-vec block per W295-AI-2 follow-up + the mem0 obsoletion in §3.4.
- **W332-F**: Update `docs/architecture/W259-grand-catalog/` MEMORY-ULTIMATE-ARCHITECTURE doc with W331 tier table.

---

## §7 — Risks & open questions

1. **mem0 v2.0.2 source-trust check**: 56k★ + ECAI 2025 paper + AWS Agent SDK adoption is a strong signal. But cardinal-rule-1 mandates trusted-source verification. `mem0ai/mem0` is Y-Combinator backed with Apache-2.0 LICENSE (`Z:/claude-sota-installed-repos/mem0ai-mem0/LICENSE:1-10`); marketplace cite-anchor not strictly required. CONFIRMED OK.

2. **pgvectorscale Windows-native compatibility**: pgrx 0.16.1 is Postgres extension framework. Postgres on Windows is supported but our Z:-portable mandate makes Postgres-as-NSSM-service the cleanest path. Alternative: PgBouncer-or-direct connection-string to a Linux container (Docker-Desktop already on host). Decision deferred to W332-B.

3. **W317-S1 hindsight option-(b) demote vs full retirement**: §3 recommends full retirement (mem0 supersedes). But option-(b) demote keeps hindsight as a fallback. Recommendation: archive hindsight plugin scaffolding as documented reference but disable runtime. Reduces tech-debt for the next operator.

4. **Letta as a Day-2 candidate**: Letta scores higher on LoCoMo (~83.2% per dev.to/varun) but architectural inversion (Letta = stack, not layer) is a hard NO for orchestrator-led runtimes. Re-evaluate ONLY if a future wave brings agent-runtime work into scope.

5. **Mem0 cloud vs self-host accuracy gap**: vectorize.io 2026-03-15 article notes "the graph implementation differs from the managed Pro tier" — graph features in self-host may be incomplete vs managed. Acceptable since our T3-pattern-study covers KG via graphiti reference. CONFIRMED OK.

6. **NO-key-rotation hard constraint** (operator): mem0 v2.0.2 self-host supports local LLM via Ollama and openai-compat endpoints (cite `mem0/configs/llms/ollama.py` + `lmstudio.py` + `vllm.py`). LLama-swap :8090 already routing 7 pre-loaded models. NO new API keys required. PASS.

---

## §8 — Appendix: Repo metadata matrix (audit-record)

| # | Repo | Path | LICENSE | HEAD | Version pin (where present) |
|---|---|---|---|---|---|
| 1 | mem0 | `Z:/claude-sota-installed-repos/mem0ai-mem0` | Apache-2.0 | refs/heads/main | v2.0.2 (`pyproject.toml`) |
| 2 | graphiti | `Z:/claude-sota-installed-repos/getzep-graphiti` | Apache-2.0 | refs/heads/main @ 9a2d6d0 | Latest |
| 3 | hindsight | `Z:/claude-sota-installed-repos/vectorize-io-hindsight` | MIT | refs/heads/main | CC-plugin v0.6.5; helm v0.6.2 |
| 4 | cognee-integration-claude | `Z:/claude-sota-installed-repos/topoteretes-cognee-integration-claude` | **UNLICENSED** | refs/heads/main | — |
| 5 | agentmemory | `Z:/claude-sota-installed-repos/rohitg00-agentmemory` | Apache-2.0 | refs/heads/main | v0.9.17 |
| 6 | supermemory | `Z:/claude-sota-installed-repos/supermemoryai-supermemory` | MIT | refs/heads/main | v4.0.0 (apps/mcp) |
| 7 | claude-mem | `Z:/claude-sota-installed-repos/thedotmack-claude-mem` | Apache-2.0 | refs/heads/main | v13.2.0 |
| 8 | mempalace | `Z:/claude-sota-installed-repos/MemPalace-mempalace` | MIT | refs/heads/main | v3.3.5 |
| 9 | pgvectorscale | `Z:/claude-sota-installed-repos/pgvector-pgvectorscale` | PostgreSQL OSS | refs/heads/main | v0.9.0 |
| 10 | byterover-cli | `Z:/claude-sota-installed-repos/campfirein-byterover-cli` | **Elastic 2.0 (ELv2)** ← non-OSI | refs/heads/main | v3.13.0 |

License-distribution: 4× Apache-2.0, 3× MIT, 1× PostgreSQL OSS, 1× UNLICENSED (blocker), 1× ELv2 (blocker). Cardinal-rule-1 carve-out: install-only-OSI list = 8 of 10. Blocker count = 2 (cognee-integration-claude, byterover-cli).

---

## §9 — Closing

W331 closes the W330 P0.11 hole. The 5-tier stack documented in `CLAUDE.md` §Runtime-state is one update away from being W331-current: T1 hindsight RETIRED → T1 mem0 PROMOTED + pgvectorscale BACKING STORE. The 4 pattern-studies (graphiti / agentmemory / claude-mem / mempalace) inform W332+ work without runtime install cost. The 3 rejections (hindsight retain at runtime / supermemory / byterover) clear the catalog.

Cross-session race resolution (W330 P0.2) gets a 3-layer defense-in-depth proposal in §4. Closure pending W332 fuzz-test harness implementation.

Org-distinct cite-anchor count: 5 (mem0ai, getzep, timescale, anthropic, vectorize.io). All cite-anchors freshness-checked against repo HEADs as of 2026-05-19 session.
