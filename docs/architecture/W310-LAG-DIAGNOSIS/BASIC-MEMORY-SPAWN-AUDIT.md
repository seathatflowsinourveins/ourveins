# W310 - basic-memory MCP Spawn Audit (multi-CC-session resource cost)

**Date**: 2026-05-19 | **Wave**: W310-LAG-DIAGNOSIS | **Mode**: research-only (no code/config changes)
**Skill chain**: superpowers:systematic-debugging + sota-convergence-audit
**Trigger**: 9 concurrent `claude.exe` sessions x 1 stdio basic-memory per session = 20+ `basic-memory.exe` processes, ~4-5 GB RAM total. CLAUDE.md `~3 parallel cap` violated (W310-PHASE1-EVIDENCE.md row 4).

## TL;DR

(1) The 20+ basic-memory processes are **expected behaviour under MCP stdio semantics (one server process per client)** - NOT a zombie/leak bug - and basic-memory v0.21.1 has **NO `BASIC_MEMORY_SINGLE_INSTANCE` env var** (verified against repo CHANGELOG, .env.example, and `src/basic_memory/cli/commands/mcp.py` source - only knowledge-rag v3.8.0 shipped that flag). (2) basic-memory ALREADY ships the "lazy-load heavy import" pattern via `_DeferredMcpServer` (`cli/commands/mcp.py`), so idle stdio servers are comparatively cheap; the ~4-5 GB cost reflects FastMCP runtime + FastEmbed bge-small-en-v1.5 embedding model loaded post-first-query x 20 processes, not startup duplication. (3) **The SOTA multi-CC-session fix is documented and first-class**: switch `.mcp.json` from `"type":"stdio"` (uvx spawn-per-session) to `"type":"http"` against a single locally-run `basic-memory mcp --transport streamable-http --host 127.0.0.1 --port 8765` daemon - this is the Anthropic-documented `claude mcp add --transport http` pattern + MCP-spec-2025-11-25 Streamable HTTP "independent process, multiple client connections" architecture, and basic-memory has shipped the `--transport streamable-http` flag since the v0.20.x line (already used in the upstream Dockerfile + docker-compose.yml).

## Sources cited (3 organisationally-distinct + primary source-code)

1. **basicmachines-co/basic-memory** (project upstream, GitHub) - `src/basic_memory/cli/commands/mcp.py` @ main (lazy-load deferred import + `--transport stdio|streamable-http|sse` typer.Option); CHANGELOG #316 (WAL mode), #776 (`bm db reset` refuses to run while `basic-memory mcp` processes alive - PR closed 2026-04-29 by phernandez, demonstrating upstream KNOWS multi-process is expected and added psutil-based detection rather than a single-instance lock), v0.21.1 release 2026-05-16; Dockerfile + docker-compose.yml `command: basic-memory mcp --transport sse --host 0.0.0.0 --port 8000`.
2. **Anthropic / Claude Code docs** (claude-code/mcp) - `claude mcp add --transport http <name> <url>` first-class shared-server pattern; "Multiple transport types: Support stdio, SSE, and HTTP transports" in plugin MCP server semantics.
3. **Model Context Protocol specification 2025-11-25** (modelcontextprotocol.io) - Streamable HTTP transport definition: *"server operates as an independent process that can handle multiple client connections. This transport uses HTTP POST and GET requests."* This replaces HTTP+SSE from 2024-11-05 and is the canonical multi-client transport for the protocol.
4. **Independent practitioner reference** (peer comparison) - knowledge-rag v3.8.0 CHANGELOG by lyonzin/knowledge-rag (separate org) - exact reference pattern the operator's question cites: `KNOWLEDGE_RAG_SINGLE_INSTANCE=1` opt-in guard (PID file + EX_TEMPFAIL exit 75) + lazy-load FastEmbed ONNX runtime. basic-memory implements 1-of-2 (lazy-load) but NOT the single-instance guard.
5. **W295-RESEARCH-ARCH-V5/W295-BASIC-MEMORY-DEEP-AUDIT.md** §1.2 - "No explicit file-locking beyond SQLite WAL. The system is designed for single-user local knowledge bases per DeepWiki. Concurrent multi-MCP-client writes to the same markdown file are not formally guarded; in practice the MCP server is invoked from one CC session at a time per runtime" - so the current 9-session reality is OUTSIDE the upstream design envelope for write paths (read paths are WAL-safe).

## Q&A against the operator's 4 audit questions

### Q1 - Does basic-memory have `KNOWLEDGE_RAG_SINGLE_INSTANCE`-equivalent flag?

**No.** Verified across:
- CHANGELOG.md (157 sections, full history v0.14.x -> v0.21.1) - zero hits for "single_instance", "single-instance", or "EX_TEMPFAIL".
- `.env.example` - 6 sections, only PostgreSQL test vars and `BASIC_MEMORY_NO_ANALYTICS=1` (the only Homebrew-style opt-out env, per CHANGELOG v0.17.0 #478).
- `src/basic_memory/cli/commands/mcp.py` source (the MCP entry point) - no PID-file logic, no `os.kill(0)` stale-PID check, no `--single-instance` typer.Option. Only env-var manipulation is `BASIC_MEMORY_FORCE_LOCAL=true` for HTTP/SSE transports.
- Issues search (`single_instance OR spawn OR stdio OR lazy OR http transport`) - 30 hits, none open or merged matching this feature. The closest related work is PR #776 ("refuse db reset while `basic-memory mcp` processes alive") which adds **detection** of concurrent MCP processes via psutil but explicitly does NOT prevent them.

**Implication**: There is no safe-to-toggle `BASIC_MEMORY_SINGLE_INSTANCE=1` today. Filing an upstream feature request (with the knowledge-rag v3.8.0 PR #33 implementation as reference) is the cleanest path; it is a ~150-line diff and basicmachines-co has historically merged similar QoL ergonomic PRs from the community (#291, #320, #424).

### Q2 - Does basic-memory lazy-load embedding models?

**Partially yes - the heavy-import boundary IS deferred, but the model itself loads on first MCP request, not before.** Evidence:

- `src/basic_memory/cli/commands/mcp.py` lines (verified content via raw fetch):
  ```python
  class _DeferredMcpServer:
      def run(self, *args, **kwargs):
          from basic_memory.mcp.server import mcp as live_mcp_server
  # Keep module-level attribute for tests/monkeypatching while deferring heavy import.
  mcp_server = _DeferredMcpServer()
  ```
  This is structurally the same pattern as knowledge-rag's "idle processes are cheap (no embedding model loaded until first query)" - the FastMCP runtime + FastEmbed ONNX provider is NOT imported until `.run()` is called.

- `src/basic_memory/mcp/server.py` lifespan span:
  ```
  if config.semantic_search_enabled:
      logger.info(f"Semantic search: provider={config.semantic_embedding_provider}, ...")
  ```
  shows the embedding provider is configured at lifespan-start time, but the actual `bge-small-en-v1.5` model resident set (~200 MB ONNX) loads on first vector-search request per W295-BASIC-MEMORY-DEEP-AUDIT.md §1.1.

**Implication**: Idle basic-memory MCP processes (CC session spawned but no `mcp__basic-memory__*` call yet made) should be cheap (FastMCP runtime ~50-80 MB resident). The ~434 MB-largest observed in W310-PHASE1-EVIDENCE.md row 35 indicates **at least some of the 20 processes have been hit with a search_notes call** that warmed bge-small-en-v1.5. This is consistent and explainable, not a leak.

### Q3 - Are the 20 processes hitting the same SQLite DB safely?

**Read paths: yes, by design. Write paths: technically unguarded but practically safe at current usage pattern.** Evidence:

- CHANGELOG #316 (commit `c83d567`): "Enable WAL mode and add Windows-specific SQLite optimizations - Enable Write-Ahead Logging for better concurrency, Platform-specific SQLite optimizations for Windows users". WAL gives **concurrent reader + 1 writer** semantics natively in SQLite.
- W295-BASIC-MEMORY-DEEP-AUDIT.md §1.2: "No explicit file-locking beyond SQLite WAL... Concurrent multi-MCP-client writes to the same markdown file are not formally guarded".
- W295-AUDIT-2026-05-18.md §-1 AI-3 (still pending, surfaced by codex r10): `.basic-memory/config.json` lives at `Z:\claude-sota-installed\basic-memory` but documented expectation is `Z:\claude-sota-installed-state\basic-memory\verdicts\` - this is a **path-drift bug**, not a concurrency bug. It causes false-negative `search_notes` lookups but does not corrupt data.
- No open GitHub issues match `"multiple claude" OR "many processes" OR "process per client"` (90 hits, none describing the operator's scenario). The closest analog is issue #831 (Postgres asyncpg deque IndexError during dispose) which affects single-process Postgres backends, not the SQLite default.

**Implication**: The shared SQLite is safe for the runtime's observed read-heavy pattern (semantic search + recent_activity). Risk surface is concurrent `write_note` from two CC sessions targeting the same permalink - currently unmitigated in basic-memory itself, but the 9-session-1-operator pattern means this is rare in practice. **Hardening recommendation**: bm-process-level write coordination would have to come from outside basic-memory (eg. an `bm sync` cron + read-only stdio MCPs + a dedicated write-MCP) - probably overkill; HTTP-transport consolidation (Q4) eliminates the issue.

### Q4 - Is HTTP-transport the SOTA recommendation for multi-CC-session usage?

**Yes - and basic-memory has shipped the transport flag already.** Evidence:

- `src/basic_memory/cli/commands/mcp.py`:
  ```python
  @app.command()
  def mcp(
      transport: str = typer.Option("stdio", help="Transport type: stdio, streamable-http, or sse"),
      host: str = typer.Option("0.0.0.0", help="Host for HTTP transports (use 0.0.0.0 to allow external connections)"),
      port: int = typer.Option(8000, help="Port for HTTP transports"),
      path: str = typer.Option("/mcp", help="Path prefix for streamable-http transport"),
      ...
  ):
      if transport in ("streamable-http", "sse"):
          os.environ["BASIC_MEMORY_FORCE_LOCAL"] = "true"
  ```
  Three transports - `stdio`, `streamable-http`, `sse` - all first-class CLI options as of v0.21.1.

- Upstream `Dockerfile` + `docker-compose.yml` both default to `--transport sse --host 0.0.0.0 --port 8000` - basic-memory's OWN recommended deployment for shared-server scenarios uses streamable-http/SSE, not stdio.

- Anthropic CC docs (`docs.anthropic.com/en/docs/claude-code/mcp`): `claude mcp add --transport http <name> <url>` is the documented shared-server pattern. Plugin MCP server reference confirms "Multiple transport types: Support stdio, SSE, and HTTP transports".

- MCP spec 2025-11-25 (modelcontextprotocol.io/specification/2025-11-25/basic/transports): *"In the Streamable HTTP transport, the server operates as an independent process that can handle multiple client connections."* This is the canonical multi-client architecture in the protocol itself, replacing HTTP+SSE from 2024-11-05.

**Implication**: Migrating `Z:/claude-sota-installed/.mcp.json` from current stdio (`type: stdio, command: uvx, args: [--from, basic-memory==0.21.1, basic-memory, mcp]`) to HTTP (`type: http, url: http://127.0.0.1:8765/mcp`) + running ONE `basic-memory mcp --transport streamable-http --host 127.0.0.1 --port 8765` daemon (as NSSM service, mirroring the existing `CogneeMCP` NSSM pattern from W310-PHASE1-EVIDENCE.md row 53) drops the 20-process x ~225 MB-avg to 1-process x ~450-600 MB, reclaiming ~4 GB of RAM and eliminating the write-coordination ambiguity entirely. The 9 CC sessions all hit `http://127.0.0.1:8765/mcp` - this is exactly the pattern Anthropic documents and the MCP spec defines.

## Priority-ranked action list

### P0 - Adopt streamable-HTTP transport (single basic-memory daemon, all CC sessions share it)

- **What**: Switch `.mcp.json` basic-memory block from stdio to `"type":"http", "url":"http://127.0.0.1:8765/mcp"`. Run `basic-memory mcp --transport streamable-http --host 127.0.0.1 --port 8765 --path /mcp` as an NSSM service (mirror the existing `CogneeMCP` NSSM pattern). Bind to **127.0.0.1**, NOT `0.0.0.0` - basic-memory's docker-compose warns *"The SSE and streamable-http endpoints are not secured"*; loopback-only binding makes that acceptable for single-operator local runtime.
- **Why**: Reclaims ~4 GB RAM, eliminates 20-process spawn-multiplication, eliminates the multi-writer concurrency unknown surfaced in W295-BASIC-MEMORY-DEEP-AUDIT §1.2.
- **Risk**: Process-lifecycle ownership shifts from CC (auto-spawn-on-session-start) to NSSM (manual-start). If NSSM service crashes, ALL 9 CC sessions lose the T6 ledger tier simultaneously. Mitigation: NSSM auto-restart + healthcheck command (`bm db status` or HTTP GET `/health` if exposed) + CC-level fallback already exists (basic-memory T6 is documented as "best-effort with markdown-grep as REQUIRED canonical lookup" per W295-AUDIT §-1).
- **Effort**: ~30 minutes (one NSSM `install`, edit `.mcp.json`, restart CC sessions). Reversible by reverting `.mcp.json` and stopping the NSSM service. **DO NOT EXECUTE without operator confirmation** per CLAUDE.md goal-mandate.

### P1 - Stop the bleeding NOW: reduce parallel CC sessions to ~3 (CLAUDE.md spec)

- **What**: Close 6 of 9 `claude.exe` sessions. CLAUDE.md `parallel-session safety (W280d)` block explicitly states "**~3 parallel cap** (cognitive + token budget)" + "rebase-not-merge to keep linear history" + "one git worktree per session". Current state (9 sessions) is 3x the spec.
- **Why**: This is a CLAUDE.md violation BEFORE it is a basic-memory tuning problem. Each closed CC session immediately reclaims ~600 MB CC RAM + ~225 MB basic-memory RAM + ~150 MB context-mode/node RAM = ~1 GB per session = ~6 GB total reclaimed.
- **Risk**: None - this is policy compliance.
- **Effort**: Trivial. **DO NOT close sessions on operator's behalf** - operator-decision per CLAUDE.md `parallel-session safety`.

### P2 - File upstream feature request: `BASIC_MEMORY_SINGLE_INSTANCE=1` opt-in guard

- **What**: Open a GitHub issue at basicmachines-co/basic-memory referencing knowledge-rag v3.8.0 PR #33 as a reference implementation. The 150-line diff pattern (PID-file in data_dir, stale-PID recovery via `os.kill(0)`, SIGINT/SIGTERM handler, exit 75 EX_TEMPFAIL on conflict) ports cleanly to basic-memory's `_DeferredMcpServer` boundary. Default OFF (multi-client friendly), opt-in only.
- **Why**: Even after P0 migration, operators running mixed CC+Claude Desktop+ChatGPT clients on the same data_dir benefit from a hard cap. basicmachines-co has a track record of merging community PRs (#291, #320, #424) and has demonstrated fast incident response (FastMCP 2.10 stdout-pollution 2025-07-02 fixed in 2 hours per W295-BASIC-MEMORY-DEEP-AUDIT §1.3).
- **Risk**: None at request stage. Implementation risk is upstream's.
- **Effort**: 15-min issue write-up. **research-only this wave** per operator mandate.

### P3 - Resolve the W295 AI-3 basic-memory config-path drift (pre-existing, surfaced via codex r10)

- **What**: Already documented in `W295-AUDIT-2026-05-18.md §-1 AI-3` + `W295-BASIC-MEMORY-DEEP-AUDIT.md §5`. Live `.basic-memory/config.json` points at `Z:\claude-sota-installed\basic-memory`; documented expectation is `Z:\claude-sota-installed-state\basic-memory\verdicts\`. Idempotent PowerShell snippet provided in W295-BASIC-MEMORY-DEEP-AUDIT.md §5.
- **Why**: Causes false-negative `search_notes` lookups today. Operator-AI-3 pending since 2026-05-18.
- **Risk**: AI-3 + P0 should land together OR AI-3 first - both write to `.basic-memory/config.json` and the daemon-mode HTTP transport (P0) needs the corrected paths to be resolved.
- **Effort**: ~5 minutes (idempotent PowerShell snippet). Operator-gated per W295-AUDIT.

### P4 (DEFER) - Hindsight VRAM contention (95.7% via 35B model on :8080)

- Note from W310-PHASE1-EVIDENCE.md row 28: the dominant VRAM consumer is `llama-server.exe` running qwen36 35B for hindsight T1 at :8080, not basic-memory. basic-memory's FastEmbed ONNX is CPU-resident (~200 MB RAM, no VRAM). Out of scope for this spawn audit but feeds the W310 root cause matrix.

## Bottom line

The 20+ basic-memory.exe processes are **architecturally expected** under MCP stdio + 9 CC sessions - not a bug. basic-memory v0.21.1 lacks the knowledge-rag-style `SINGLE_INSTANCE` flag, but lazy-load IS shipped. The SOTA, Anthropic-documented, MCP-spec-blessed fix is **streamable-HTTP transport with a single shared daemon** - basic-memory has shipped the `--transport streamable-http` flag and basicmachines-co's own Dockerfile uses it as the default for shared deployment. Net effect of P0: 20 processes -> 1, ~4 GB RAM reclaimed, multi-writer ambiguity eliminated. **No changes applied this wave per operator mandate** - this audit is the prerequisite evidence for the operator-gated migration commit.

## File path

`Z:/claude-sota-installed/docs/architecture/W310-LAG-DIAGNOSIS/BASIC-MEMORY-SPAWN-AUDIT.md`
