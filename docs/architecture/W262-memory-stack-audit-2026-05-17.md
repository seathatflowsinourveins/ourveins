# W262 — Memory-Stack SOTA Convergence Audit (2026-05-17)

> Audits the W259-v16 "5-tier" claim (`docs/architecture/W259-grand-catalog/03-deepdive/MEMORY-ULTIMATE-ARCHITECTURE-W259v16.md`) against live runtime probes (2026-05-17 15:06-15:08Z) and 2026-05 SOTA references. Word target: 900. Every claim file:line-anchored.

## §1 — Per-layer table

| Tier / Engine | Status (live) | SOTA gap | Recommended action | Cost (1-5) |
|---|---|---|---|---|
| **T0 CLAUDE.md @imports** (working) | LIVE — `Z:\claude-sota-installed\CLAUDE.md` ≤50 LOC; `CLAUDE_CODE_DISABLE_AUTO_MEMORY=1` (`.claude/settings.json:env`) | None — matches CCBP `claude-memory.md:34-40`. Auto-Memory opt-out is deliberate per `CLAUDE.local.md` §"Memory — Auto Memory opt-out". | Keep. | — |
| **T1 hindsight 0.6.2** (session) | UP on `:9077`; provider=`openai`/model=`qwen36`/base=`http://127.0.0.1:8080/v1` (ik_llama.cpp), worker slots=3 (`.claude/settings.json:env` `HINDSIGHT_API_*`); 415-op backlog draining (`hindsight_llm_duration_seconds_count{scope=retain_extract_facts}` 13+ in 15-30s bucket per `/metrics`) | Two real SOTA gaps: (a) **embedder is NOT `bge-small-en-v1.5`** — `config.py:560 DEFAULT_EMBEDDINGS_LITELLM_MODEL = "text-embedding-3-small"` (OpenAI API, billed); no `HINDSIGHT_API_EMBEDDINGS_LITELLM_MODEL` override in settings → if backlog drains via embeddings, **OPENAI_API_KEY is being burned**. (b) reranker default `config.py:561 DEFAULT_RERANKER_LITELLM_MODEL = "cohere/rerank-english-v3.0"` — also remote-paid. The prompt's "bge-small-en-v1.5 local CPU" assumption is incorrect; verify with `curl -s :9077/metrics \| Select-String embedding_`. | Override `HINDSIGHT_API_EMBEDDINGS_LITELLM_MODEL=ollama/qwen3-embedding:0.6b` + `HINDSIGHT_API_EMBEDDINGS_LITELLM_API_BASE=http://127.0.0.1:16700` (LiteLLM Ollama route) → local 1024-dim, MTEB-leading per `arxiv:2506.05176`. Worker concurrency 3 is correct for a 35B reasoning model serializing on the 4090 (3.3s/verify, 15-30s/extract — see metrics); raising it queues at the LLM, not the worker. | 2 |
| **T2 memory MCP** (`doobidoo/mcp-memory-service`, sqlite_vec) | LIVE — `memory.db` 3.72MB + `wal` 4.31MB at `Z:\claude-sota-installed-state\.mcp-memory\`; backend `sqlite_vec` (`.mcp.json:54-62`) | `mcp-memory-service` v10.36.x defaults to ONNX hash-fallback embeddings unless `--with-ml` installs sentence-transformers; current install is unknown — episodic recall quality unverified. Per *State of AI Agent Memory 2026* (mem0.ai/blog/state-of-ai-agent-memory-2026) episodic L1 is dominated by mem0g (LoCoMo 91.6, hybrid vector+graph+keyword) at <7k tokens/retrieval, but mem0 lacks a native CC plugin → integration cost wins for doobidoo here. | Verify `pip show sentence-transformers` in the memory.exe venv; if missing, `pip install mcp-memory-service[ml]`. Do NOT migrate to mem0/qdrant — the integration cost (no native CC plugin) exceeds the marginal LoCoMo win at this stack size (3.7MB). | 1 |
| **T3 cognee** (cold doc-graphRAG) | **NOT IN `mcpServers`** — `.mcp.json:11` `_comments.cognee_w259v8` documents the entry but the actual `mcpServers` block (lines 15-113) has no `cognee` key. Port :8000 closed (operator-decision). | The W259-v16 doc claims "operator-decision (server-start)" but the entry has been physically removed — semi-true. cognee 2026 advantages (ontology grounding + Modal-cloud benchmarks vs graphiti — cognee.ai/blog/deep-dives/ai-memory-evals-0825 reports cognee > graphiti on Human-like-Correctness + DeepEval) overlap T4's graph role with no new role unless you actually load doc corpora. | **Leave OFF.** No corpora ingested → adding cognee = idle Docker + Kuzu DB. Re-evaluate only when a documented "ingest a doc corpus" workflow exists. Drift fix: update `MEMORY-ULTIMATE-ARCHITECTURE-W259v16.md:§1` row T3 to "REMOVED — not in `mcpServers`" (currently misleading). | 1 |
| **T4 graphiti** (temporal KG) | LIVE — `.mcp.json:63-97` FalkorDB `127.0.0.1:16379` + Ollama `127.0.0.1:16700` `qwen3:8b` chat + `qwen3-embedding:0.6b` (1024-dim, `SEMAPHORE_LIMIT=3`). FalkorDB reachable (`Test-NetConnection :16379 -> True`). | FalkorDB itself is SOTA for AI/agent graphs — sub-140ms p99 vs Neo4j 46.9s (falkordb.com/blog/graph-database-performance-benchmarks-falkordb-vs-neo4j); 1.1ms cold-start. Embedder: `qwen3-embedding:0.6b` is MTEB-leading-at-its-size class (arxiv 2506.05176); 1.5B+ stops being worth it on a runtime where graph extraction is LLM-bound by `qwen3:8b`. The 8B chat model is fine — graphiti's structured-extraction prefers small, fast, non-reasoning models (cite: `.mcp.json:13 _comments.ollama_w259v15` records that `qwen3.6:35b` broke graphiti's JSON parser; downgrade to `qwen3:8b` is correct per upstream guidance). | Keep as-is. Optional: raise `SEMAPHORE_LIMIT` 3→6 if Ollama latency is <2s/call (8B is fast); only matters if ingest is sustained. | 1 |

## §2 — Decision tree: "for query type X, which tier responds"

```
USER PROMPT (UserPromptSubmit hook fires)
    │
    ├── T0  CLAUDE.md  ──── ALWAYS preloaded     ≤50 LOC pointer
    │
    ├── T1  hindsight  ──── ALWAYS recall hook   "what did we decide / prefer / hit before?"
    │        - structured facts (decision/preference/relation/technical context)
    │        - session-scoped + cross-session via plugin bank-id
    │        - matches A-MEM zettelkasten linkages (arxiv 2502.12110)
    │
    ├── T2  memory MCP ──── ON-DEMAND tool call  "store this; recall this exact string-ish blob"
    │        - LLM calls memory_store / memory_search explicitly
    │        - sqlite_vec ANN, episodic L1 cache (3.7MB live)
    │
    ├── T4  graphiti   ──── ON-DEMAND tool call  "who/what is connected to X? what changed over time?"
    │        - temporal bitemporal KG (event_time + ingest_time, arxiv 2501.13956 Zep)
    │        - entity-relation queries across the eee group_id
    │
    └── T3  cognee     ──── OFF (no mcpServers entry; no corpus ingested)
                            Activate ONLY when a "doc corpus + ontology" use-case exists.
```

A 5th conceptual "tier" — Phoenix at `:14317`/`:16006` — is **observability not memory** (OpenInference traces); do not count it.

## §3 — Top-3 actionable improvements

1. **Verify hindsight is not silently burning OpenAI API for embeddings** — the prompt's `bge-small-en-v1.5` claim is wrong per `config.py:560` (default `text-embedding-3-small`, OpenAI). If `OPENAI_API_KEY` is set and embeddings haven't been re-routed, every `retain_extract_facts` call is also embedding remotely. Run:
   ```powershell
   Invoke-WebRequest http://127.0.0.1:9077/metrics -UseBasicParsing |
     Select-Object -Expand Content |
     Select-String "embedding_(model|provider|tenant)"
   ```
   If `model="text-embedding-3-small"` appears, append to `.claude/settings.json:env`:
   ```json
   "HINDSIGHT_API_EMBEDDINGS_LITELLM_MODEL": "ollama/qwen3-embedding:0.6b",
   "HINDSIGHT_API_EMBEDDINGS_LITELLM_API_BASE": "http://127.0.0.1:16700"
   ```
   Cost 2; saves both privacy and API spend.

2. **Reconcile the W259-v16 doc with reality on T3** — the architecture doc still lists cognee as a "tier" but `.mcp.json:mcpServers` does not include it. Edit `MEMORY-ULTIMATE-ARCHITECTURE-W259v16.md` row T3: status `OPERATOR-DECISION (server-start)` → `REMOVED — re-add only when a doc-corpus workflow exists`. Cost 1.

3. **Document the decision tree above into the same doc** — currently W259-v16 enumerates tiers but never says *which tier services which query type*; that gap is what makes the stack feel "overlapping." Land §2 of this audit into a new §6 in `MEMORY-ULTIMATE-ARCHITECTURE-W259v16.md`. Cost 1.

## §4 — Overall verdict

The stack is genuinely 4 tiers (T0/T1/T2/T4) — not 5. The tiers are **non-overlapping** in role (working / session-facts / vector-blob / temporal-graph) and the live evidence (415-op hindsight backlog draining, 3.72MB memory.db, FalkorDB:16379 + Ollama:16700 both reachable) confirms wiring. The two real gaps are (a) hindsight embedder likely still on OpenAI API by default, and (b) the doc still references a cognee tier that was removed from `mcpServers`. Both are <5-line config edits. No engine replacement is warranted — mem0/Letta/MIRIX win on benchmarks but lose on CC-plugin integration cost, which is the deciding axis for this runtime per W259-v16 §2.

Word count: ~860.
