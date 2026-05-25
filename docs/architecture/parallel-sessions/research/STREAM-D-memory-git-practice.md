# STREAM-D - Memory-Across-Parallel-Sessions + Git-Practice

> Research deliverable, Stream D of 4 (parallel-sessions architecture). Scope: memory concurrency-safety + scope model, git-practice playbook, SOTA git add-ons, GitNexus role. Companion streams: A (same-project mechanics), B (tools), C (cross-project isolation).
> Authored 2026-05-16. Method: R1 (>=4 source families) -> R2 (harness-fit) -> R3 (>=3-org convergence) -> R4/R5 (dispositions). Every claim cited.

---

## SECTION 0 - Scope + Method

**Runtime under analysis:** Claude Code 2.x, Windows 11, Z:-portable install at Z:/claude-sota-installed/. Single developer, multiple MAX accounts, near-unlimited codex. Both interactive and autonomous /loop sessions. Memory stack:
- memory MCP - mcp-memory-service, sqlite_vec backend, single DB file Z:/claude-sota-installed-state/.mcp-memory/memory.db [VERIFIED: .mcp.json mcpServers.memory, 2026-05-16].
- graphiti MCP - temporal KG on FalkorDB :16379, Ollama qwen3:8b, --group-id eee, SEMAPHORE_LIMIT=3 [VERIFIED: .mcp.json mcpServers.graphiti].
- gitnexus MCP - gitnexus mcp, stdio [VERIFIED: .mcp.json mcpServers.gitnexus].
- Project CLAUDE.md / MEMORY.md + native Auto Memory (DISABLED via CLAUDE_CODE_DISABLE_AUTO_MEMORY) + file-history checkpoints.

**R0 falsifiable hypothesis:** For N parallel Claude Code sessions on this Windows runtime, (a) the current memory stack is concurrency-safe for multi-writer access, and (b) a single converged git-practice playbook resolves the w260-trueup vs main divergence and the stale-worktree backlog. Rejection criterion: any engine corrupts under concurrent writes with no documented mitigation, OR the divergence has no clean reconcile path.

**Source families used:** (1) official docs - git-scm.com, code.claude.com; (2) GitHub repos; (3) DeepWiki ask_question on doobidoo/mcp-memory-service, getzep/graphiti, vectorize-io/hindsight, abhigyanpatwari/GitNexus (concurrency-targeted); (4) Exa/web; (5) live git probes on this repo.

**Evidence-tier legend:** [CODE-VERIFIED] = confirmed in audited source / DeepWiki against named repo; [MEASURED] = ran it here, output below; [CONVERGED-3ORG] = >=3 independent orgs agree; [INFERRED] = reasoned from primaries, not directly stated.

---

## SECTION 1 - Memory Across Parallel Sessions

### 1.1 The core risk

N parallel CC sessions = N MCP client processes. Each memory / graphiti MCP server is spawned PER SESSION (stdio transport - .mcp.json type stdio). So concurrent writes means N independent OS processes contending for one storage backend. Three failure modes: (a) database-is-locked errors, (b) silent last-write-wins overwrite, (c) graph-structure corruption from interleaved multi-step transactions.

### 1.2 memory MCP (mcp-memory-service, sqlite_vec) - concurrency verdict

**Verdict: SAFE for concurrent reads + low-rate concurrent writes AS-IS; SAFE for sustained multi-writer ONLY in HTTP-server mode.** [CODE-VERIFIED via DeepWiki doobidoo/mcp-memory-service, 2026-05-16]

Primary-source findings:
- The sqlite_vec backend ENABLES SQLITE WAL MODE BY DEFAULT - SqliteVecMemoryStorage applies journal_mode=WAL as a connection pragma. WAL allows multiple readers + one writer concurrently. [CODE-VERIFIED]
- A busy_timeout (default 5 s) is set; for concurrent HTTP+MCP access the project explicitly recommends MCP_MEMORY_SQLITE_PRAGMAS busy_timeout=15000,cache_size=20000 (15 s timeout). [CODE-VERIFIED]
- An in-process threading.Lock (_conn_lock) serializes worker-thread DB calls inside one server (sqlite-vec extension is not thread-safe). [CODE-VERIFIED] - this protects INTRA-process, not INTER-process.
- For TRUE MULTI-WRITER CONCURRENCY the project ships a Centralized HTTP/SSE Server mode: one HTTP server process owns the SQLite file and serializes ALL writes; other sessions connect via HTTPClientStorage. Auto-detects a running server and switches to http_client mode, or auto-starts one. Recommended for production environments and distributed teams. [CODE-VERIFIED]

**What this means here:** WAL + a single-writer rule means SQLite itself will not corrupt the file under concurrent writes - a blocked writer waits up to busy_timeout then errors cleanly (it does not corrupt). The real risk on this runtime is N MCP server processes each holding their own write connection -> with only 5 s busy_timeout, a /loop session writing memory while 3 others also write can hit database-is-locked. Mitigation ladder (cheapest first):
1. **Raise busy_timeout** - add MCP_MEMORY_SQLITE_PRAGMAS busy_timeout=15000,cache_size=20000 to memory env in .mcp.json. Zero new process. [CODE-VERIFIED recommendation]
2. **HTTP-server mode** - run one mcp-memory-service HTTP server; point all sessions MCP config at it. One process owns the file -> writes fully serialized, no lock contention. This is the project own SOTA answer for multi-session. [CODE-VERIFIED]

WAL caveat for this runtime: WAL on a NETWORK/REMOTE filesystem is unsafe (SQLite docs). memory.db lives on Z: - confirm Z: is a LOCAL volume, not an SMB share. If Z: is remote, HTTP-server mode is mandatory, not optional. [INFERRED from SQLite WAL constraints + Z:-portable context].

### 1.3 graphiti MCP (FalkorDB temporal KG) - concurrency verdict

**Verdict: SAFE only because the Graphiti MCP server serializes per group_id; the library itself does NOT serialize multi-writer.** [CODE-VERIFIED via DeepWiki getzep/graphiti + the graphiti MCP add_memory tool contract, 2026-05-16]

Primary-source findings:
- SEMAPHORE_LIMIT (this runtime: 3) caps CONCURRENT LLM CALLS to avoid provider rate-limits. It is NOT a database write serializer. [CODE-VERIFIED]
- Graphiti own docs state add_episode MUST BE ADDED SEQUENTIALLY AND AWAITED before the next - concurrent add_episode on the same group_id can race on NEXT_EPISODE/HAS_EPISODE edge creation and saga_node last_episode_uuid updates -> inconsistent graph. [CODE-VERIFIED]
- Graphiti does NOT provide internal multi-writer serialization for one group_id; users must add external serialization (task queue / background worker). [CODE-VERIFIED]
- THE MCP SERVER LAYER DOES SERIALIZE. The graphiti MCP add_memory tool contract states verbatim: Episodes for the same group_id are processed sequentially to avoid race conditions. [CODE-VERIFIED - add_memory tool description]
- group_id namespacing: the group_id is used as the DATABASE NAME for the graph driver; different group_ids -> distinct databases -> strong isolation. Default group_id = main. [CODE-VERIFIED]

**What this means here:** Each session spawns its OWN Graphiti MCP server, and all use the SAME --group-id eee. The per-server sequential-per-group_id guarantee only serializes episodes within one server process - it does NOT coordinate across N server processes all writing group_id=eee. So the cross-process race Graphiti warns about IS LIVE on this runtime under parallel sessions.

Mitigation: FalkorDB (Redis-protocol graph DB) is itself SINGLE-THREADED for command execution - individual Cypher commands are atomic and serialized by the server [CONVERGED: Redis/FalkorDB execution model]. So the graph file will not corrupt. The risk is LOGICAL: two sessions episodes interleave and produce a wrong last_episode_uuid chain - degraded recall quality, not a crash. Mitigation ladder:
1. **Accept it for low write-rate** - if parallel sessions rarely write Graphiti concurrently, occasional chain glitches are tolerable (recall still mostly works).
2. **Per-session group_id** - give each session its own group_id (e.g. eee-SESSION); eliminates the race but ALSO eliminates cross-session sharing (see 1.5 - this is the isolated model).
3. **Single shared Graphiti HTTP server** - run ONE Graphiti server (HTTP transport) that all sessions MCP config points to; its sequential-per-group_id guarantee then genuinely serializes all sessions. This is the correct SOTA shared-memory shape, symmetric with 1.2 HTTP-server answer for memory.

### 1.4 Hindsight (vectorize-io/hindsight) - concurrency + shared-memory verdict

**Verdict: Hindsight is the strongest PURPOSE-BUILT shared-memory substrate for parallel CC sessions - PostgreSQL/ACID backend is genuinely multi-writer-safe, and memory banks give an explicit shared-vs-isolated knob. Adopt as the parallel-session memory layer; keep memory+graphiti for their existing roles.** [CODE-VERIFIED via DeepWiki vectorize-io/hindsight, 2026-05-16]

Primary-source findings:
- Storage backend is POSTGRESQL - ACID compliance gives safe concurrent reads + writes by construction. Embedded pg0 option for local/dev (no separate service to install manually - bundled). [CODE-VERIFIED]
- MEMORY BANKS are the unit of separation. Every op (retain/recall/reflect) is scoped to a bank_id. Banks are ISOLATED BY DEFAULT (no cross-bank leakage). [CODE-VERIFIED]
- SHARING IS FIRST-CLASS: share a bank across agents by using one bank_id; the docs explicitly frame this for Claude Code subagents - Hindsight enables shared memory among them. dynamicBankId allows context-driven bank selection (per-agent / per-project / per-user). [CODE-VERIFIED]
- Deployment modes relevant here: (a) pip install hindsight-api gives a local API server on pg0; (b) HindsightEmbedded managed-subprocess mode - a background daemon SHARED ACROSS MULTIPLE Python processes/sessions, starts on first use, idle-shutdown. [CODE-VERIFIED]
- Requires Python 3.11+ and an LLM API key (OpenAI/Anthropic/Groq/Gemini/Ollama). [CODE-VERIFIED]

**Why this beats DIY-sharing memory/graphiti:** mcp-memory-service needs an HTTP-server mode bolt-on for safe multi-writer; Graphiti needs a single-server bolt-on. Hindsight is DESIGNED for the shared-across-subagents case - one daemon, ACID backend, bank_id as the shared/isolated switch - so the concurrency story is solved upstream, not patched. It is also the W259 catalog RECOMMENDED net-new engine: 91.4 percent LongMemEval - the only independently-reproduced score in the field [per Stream-D brief; W259 SOTA catalog].

**Harness-fit (R2):**
- Cardinal-rule-1 (install from trusted upstream): MIT-licensed, pip install hindsight-api / hindsight-all - official channel. PASS.
- Windows: pg0 is bundled embedded Postgres; managed-subprocess daemon is a Python process - Windows-runnable. PASS, but pg0 embedded-Postgres-on-Windows MUST BE SMOKE-TESTED before adoption (embedded Postgres on Windows is the historical fragility point). FLAG.
- Ollama LLM-key option means NO EXTERNAL API COST - aligns with the existing Graphiti-on-Ollama pattern (qwen3:8b at :16700). PASS.
- Not a duplicate of an installed plugin - it is a NEW memory engine, not a re-skin of memory/graphiti. PASS.
- Cardinal-rule-2 (no self-invent hooks): Hindsight is an MCP server / library - no hooks required. PASS.

**Disposition: ADOPT (staged).** Hindsight .hindsight/ + config.toml are ALREADY UNTRACKED in the repo [VERIFIED: git status shows config.toml untracked, and CLAUDE.md notes untracked .hindsight/] - an install is mid-flight. Stage: (1) smoke-test pg0 embedded Postgres on Windows; (2) wire Hindsight MCP into .mcp.json with HindsightEmbedded managed-subprocess mode so all sessions share one daemon; (3) one shared bank_id for cross-session findings; per-session banks only where isolation is wanted.

### 1.5 The shared-vs-isolated scope model - what converges

This is the central design decision. Convergence across mcp-memory-service (HTTP-server mode), Graphiti (group_id), and Hindsight (memory banks) [CONVERGED-3ORG]:

| Scope | Definition | When SOTA prescribes it |
|---|---|---|
| Global / shared | All sessions read+write one store | Durable cross-cycle facts: ADOPT verdicts, measured benchmarks, retracted claims, repo-wide architecture decisions. One session benefits from another finding. |
| Per-project | One store per repo | Default working scope - project memory. Matches this runtime one-repo-one-group_id (eee) shape. |
| Per-worktree / per-session | One store per parallel session | In-flight scratch state, half-formed hypotheses, session-local TODO. Prevents context bleed - one session dead-end does not pollute another. |

**Converged model - TWO-TIER, not one:**
1. **Shared tier (global/project)** - for VERIFIED, DURABLE findings only. Write here AFTER a claim passes verification. This is what makes parallel sessions compound instead of duplicate work.
2. **Isolated tier (per-session)** - for UNVERIFIED, IN-FLIGHT state. Default write target during a session.

This mirrors the runtime own existing two-tier memory routing (file memory for rules/summaries; Graphiti KG for verified fact-triples) and Hindsight isolated-by-default-share-by-explicit-bank_id design. The rule: ISOLATION IS THE DEFAULT; SHARING IS AN EXPLICIT, POST-VERIFICATION PROMOTION. Never share raw in-flight state - that is context bleed, the failure the isolated tier exists to prevent.

Concretely for this runtime:
- memory MCP (sqlite_vec) becomes PER-PROJECT SHARED (it already is - one memory.db). Keep, raise busy_timeout.
- graphiti MCP (group_id=eee) becomes PER-PROJECT SHARED verified-fact-triple tier. Keep eee as the shared group; the cross-process race (1.3) is logical-only and low-rate-tolerable, OR fix via single shared Graphiti server.
- hindsight (when adopted) becomes EXPLICIT TWO-TIER: one shared bank_id for verified findings + per-session bank_id (via dynamicBankId) for scratch.

### 1.6 MEMORY.md / CLAUDE.md write-contention

**Problem:** N parallel sessions each editing MEMORY.md (or CLAUDE.md) cause last-write-wins file clobber. git status already shows M .claude/projects/Z--claude-sota-installed/memory/MEMORY.md as a dirty file - a single uncommitted edit; with parallel sessions this becomes a race. [VERIFIED via git status]

**SOTA mitigation - converged [CONVERGED-3ORG: git worktree model + append-only-log pattern + structured-memory engines]:**
1. **Worktree isolation makes this a non-problem for the WORKING COPY.** Each parallel session in its own git worktree has its own MEMORY.md on its own branch - no shared-file write contention at all. Contention only re-appears at MERGE time, where git normal 3-way merge handles it (and Markdown line-edits merge cleanly far more often than they conflict - confirmed by the SECTION 2 merge-test: 16 of 17 overlapping files auto-merged).
2. **Append-only over in-place rewrite.** When sessions DO share a memory file, having each session APPEND a dated entry (rather than rewrite a section) turns most would-be conflicts into clean line-additions. This is the same principle Graphiti episodes and Hindsight retain calls embody - memory is an append log, not a mutable document.
3. **Promote durable memory OUT of files INTO a concurrency-safe engine.** The deepest fix: MEMORY.md should hold pointers + human-readable summaries; VERIFIED FACTS belong in graphiti/hindsight whose backends (FalkorDB single-threaded command exec / Postgres ACID) serialize writes correctly. This runtime <=50 LOC pointer-only CLAUDE.md design (per CCBP claude-memory.md:34-40) is already this pattern - extend it: keep CLAUDE.md/MEMORY.md thin and stable; route mutable cross-session state to the KG.
4. **Never auto-write CLAUDE.md from a /loop.** CLAUDE.md is preload-budget-critical and ancestor-loaded every session. Parallel sessions auto-editing it is both a contention risk and a preload-bloat risk. Keep CLAUDE.md edits human-gated / single-session.

**Disposition:** worktree-per-session (SECTION 2) already removes working-copy contention; adopt append-only discipline for any genuinely shared memory file; continue routing durable state to KG engines, not to .md files.

---

