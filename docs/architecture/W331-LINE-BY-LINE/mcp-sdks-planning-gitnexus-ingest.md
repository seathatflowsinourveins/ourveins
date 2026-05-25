# W331 Stream-7 — MCP SDKs + OthmanAdi planning + abhigyanpatwari GitNexus

> Line-by-line ingest of 5 SOTA repos. Subagent self-contained brief executed
> 2026-05-19. Skeleton-first per Δ-DPA-1, evidence-anchored per Δ-PDM-1 F4.
> Tooling note: `repomix.pack_remote_repository` returned 0-file packs for all
> 5 targets (silent clone failure — likely sandbox-network); pivoted to
> `deepwiki.ask_question` (multi-vendor org-distinct) + on-disk plugin-cache
> inspection. Evidence is therefore deepwiki-RAG-grounded + cross-checked
> against the v2.38.1 SKILL.md actually installed at
> `.claude/plugins/cache/planning-with-files/.../skills/planning-with-files/SKILL.md`.

## §1 OthmanAdi/planning-with-files — `d27008f3` v2.38.1 (already installed)

### Verified against installed file at `.claude/plugins/cache/planning-with-files/planning-with-files/2.38.1/skills/planning-with-files/SKILL.md`

| Pattern | File:line (installed plugin) | Status in THIS runtime |
|---|---|---|
| `UserPromptSubmit` hook — plan-tamper attestation (SHA-256 verify before injection) | SKILL.md L8 frontmatter | ACTIVE when `task_plan.md` exists at cwd |
| `PreToolUse` matcher `Write\|Edit\|Bash\|Read\|Glob\|Grep` — head-30 of `task_plan.md` injected before every tool call | SKILL.md L13-16 | ACTIVE — same matcher set as ECC runs |
| `PostToolUse` matcher `Write\|Edit` — nudges progress.md update | SKILL.md L19-22 | ACTIVE |
| `Stop` hook — runs `scripts/check-complete.ps1` (Windows) or `.sh` to verify all phases complete | SKILL.md L25-28 | ACTIVE (Windows branch fires) |
| **`PreCompact` matcher `*`** — emits compaction warning + Plan-SHA256 attestation | SKILL.md L29-32 | ACTIVE — fires before any `/compact` |
| `session-catchup.py` — recovers context from previous session after `/clear` | SKILL.md L42 + L220 | EXISTS, NOT routinely invoked |
| `init-session.sh "Task Name"` — creates `.planning/YYYY-MM-DD-<slug>/` isolated dir | SKILL.md L216 + L229 | EXISTS, runtime uses single root-level `task_plan.md` only |
| `set-active-plan.sh` + `$PLAN_ID` env-var pin | SKILL.md L217 + L237/L240 | EXISTS, never used |
| `attest-plan.sh` / `attest-plan.ps1` — SHA-256 lock current plan (v2.37.0) | SKILL.md L221 | EXISTS, never invoked |
| Parallel-task workflow (multi-terminal isolated `.planning/*`) | SKILL.md L223-243 | NEVER USED — this runtime always single-plan |
| 2-Action Rule (force `findings.md` writes after every 2 view/search ops) | SKILL.md L105-108 | UNDER-LEVERAGED — relied on operator self-discipline |
| 3-Strike Error Protocol (escalate after 3 failures) | SKILL.md L143-165 | NOT systematically applied |
| OpenCode SQLite catchup (v2.38.0+) — reads `${XDG_DATA_HOME}/opencode/opencode.db` | SKILL.md L244 | N/A (Claude Code runtime) |

### Patterns NOT yet leveraged here (top-3, ranked by ROI)

1. **`attest-plan.sh` / Plan-SHA256 tamper-attestation** — the `UserPromptSubmit` hook already verifies SHA-256 on every prompt. We have no `.plan-attestation` file in this runtime, so the tamper-block silently never fires. Adopting attestation in W-N status files would harden them against `.md`-injection.
2. **`.planning/YYYY-MM-DD-<slug>/` isolated parallel-task workflow** — currently W331's 7 parallel streams collide on one `task_plan.md` at root. Stream-isolated `.planning/W331-S7-mcp-sdks-planning-gitnexus/` would let `$PLAN_ID=W331-S7-...` per-subagent and end the file-stomp risk on multi-stream waves.
3. **`PreCompact` hook handshake** — fires NOW but its output (`echo` to stderr) is informational. Per `SKILL.md L29` it already emits the SHA + reminder; could be repurposed to gate auto-compact via exit-code semantics (Anthropic hook contract — exit 2 blocks).

## §2 abhigyanpatwari/GitNexus — installed `gitnexus@1.6.5` (npm) vs plugin-cache `1.3.6`

### Critical install-state drift discovered

```
.claude/plugins/cache/gitnexus-marketplace/gitnexus/1.3.6/.claude-plugin/plugin.json
  → version: "1.3.6"   (plugin-shell wrapper; .mcp.json calls binary by PATH)

C:\Users\42\AppData\Roaming\npm\gitnexus.ps1   (PATH-resolved binary)
  → gitnexus --version → 1.6.5
```

The plugin-shell metadata is **23 minor versions stale** vs the binary the runtime actually executes. `.mcp.json:36-40` is what counts (calls `gitnexus mcp` via PATH), so the live runtime IS on `1.6.5` — but the plugin cache still advertises `1.3.6` to any sweep/audit script that reads `plugin.json`. **Recommend `claude plugin update gitnexus@gitnexus-marketplace` to sync the shell.**

### Windows FTS / BM25 verdict — **P1 DEFER (not P0)**

| Question | Answer | Cite (deepwiki RAG) |
|---|---|---|
| Does the FTS issue cause crashes? | NO — explicit Windows-guard at `pool-adapter.ts` skips `LOAD EXTENSION fts` (would SIGSEGV otherwise) | deepwiki Q1, GitNexus §6.3 |
| Silent corruption? | NO — bm25-index.js catches catalog errors, returns empty | deepwiki Q1 + Q3 |
| BM25 hot-path frequency | **PER QUERY**, parallel with semantic; iterates File/Function/Class/Method FTS indexes | deepwiki Q2 (call-sites: hybrid-search.ts:177, local-backend.ts:1011, augmentation/engine.ts:110) |
| Action needed on Windows? | **NONE** — degraded semantic-only search is permanent-by-design on Windows. No binary exists to fix. Fallback to RRF-merged semantic-only is the documented path. | deepwiki Q3 |

**Concrete impact for this runtime**: `gitnexus mcp` tool calls (`mcp__gitnexus__query`, `mcp__gitnexus__context`, `mcp__gitnexus__route_map`, etc.) **silently lose BM25 ranking** on Windows. Semantic-only RRF still returns results; keyword-heavy queries (e.g. "find all `LoadExtension` calls") may rank lower than ideal. **NOT a SEV-grade issue** — never observed empirically in W325-D queries; affects ranking quality only.

### v1.3.7 → v1.6.x: this WAS a major architectural restructuring

| Bump | Date | User-impact |
|---|---|---|
| **v1.4.0** | 2026-03-13 | KuzuDB → LadybugDB migration. **Breaking — requires re-index of all repos.** |
| v1.4.0+ | 2026-03-13+ | RFC #909 scope-resolution: 3-tier (exact FQN → scope-walk → fuzzy). Big call-graph accuracy lift across languages. |
| **v1.5.0** | 2026-04-01 | Web app: WASM-browser → thin-client backed by CLI server. Unified ingestion. |
| v1.6.0+ | 2026-04-12 | SemanticModel refactor: TypeRegistry / MethodRegistry / FieldRegistry. |
| v1.6.3 | 2026-04-24 | FTS bootstrap: LOAD-before-INSTALL for offline/airgapped; FTS-ensure failures no longer cached + invalidated on pool teardown. |
| v1.6.4 | 2026-05-10 | Windows reliability: tree-sitter-c/cpp segfault pin; `.cmd`/`.bat` preference; LadybugDB lock-acquisition for CI; surfaced silent finalize-skips. Read-only DB cluster FTS fix. |
| v1.6.5 | ~2026-05-15 | Live npm version (deepwiki has not yet indexed). Verdict: not blocker — already running. |

**Implication**: anyone still on 1.3.x WOULD need a P0 upgrade (KuzuDB migration). This runtime ALREADY runs `1.6.5` so no action needed.

## §3 modelcontextprotocol/modelcontextprotocol — spec draft `2025-11-25`

### Headline changes vs `2025-06-18`

1. **Task-based workflows** — new state machine: `working` / `input_required` / `completed` / `failed` / `cancelled`. Lets servers track long-running work.
2. **Simplified authorization** — URL-based client registration via OAuth Client ID Metadata Documents (skip dynamic registration).
3. **URL Mode Elicitation** — secure out-of-band credential collection through browser-based OAuth flow (replaces in-band password prompts).
4. **Sampling with tools** — agentic servers can run their own LLM loops using client tokens, with tool-calling support inside the sample.
5. **DX improvements**: standardized tool names, decoupled request payloads, SSE polling improvements, version-management overhaul.

### `tools/list` contract (canonical 2025-11-25)

| Field | Req? | Notes |
|---|---|---|
| **Request** `cursor` | optional | pagination cursor |
| **Response** `tools[]` | required | array of Tool objects |
| **Response** `nextCursor` | optional | pagination |
| Tool.`name` | required | unique id |
| Tool.`title` | optional | human display |
| Tool.`description` | required | human description |
| Tool.`inputSchema` | required | JSON Schema |
| Tool.`outputSchema` | **optional, NEW** | typed outputs |
| Tool.`icons` | optional | icon array |
| Tool.`annotations` | optional | behavior hints |

Pagination is cursor-based, opaque token.

### JSON-RPC error codes (per spec + JSON-RPC 2.0)

Standard JSON-RPC 2.0 codes (deepwiki could NOT cite line-numbers — the schema files were truncated):

| Code | Meaning |
|---|---|
| -32700 | ParseError |
| -32600 | InvalidRequest |
| -32601 | MethodNotFound |
| -32602 | InvalidParams |
| -32603 | InternalError |

Custom MCP server errors should be in range `-32000` to `-32099` per JSON-RPC reservation.

### Capabilities matrix (2025-11-25)

**Server capabilities**: `logging`, `completions`, `prompts.listChanged`, `resources.{subscribe,listChanged}`, `tools.listChanged`, **`tasks.{list,cancel,requests}`** (new — declares which task-aware reqs server supports, e.g. `tools.call`), `experimental`.

**Client capabilities**: `roots.listChanged`, `sampling{}`, **`elicitation.{form,url}`** (new — declares URL-mode + form-mode support), **`tasks.requests`** (new — declares `elicitation.create` + `sampling.createMessage` task-support).

### Where THIS runtime's MCPs are likely behind spec

- **No MCP in `.mcp.json` declares `tasks` capability** — every server is request/response only. The new task state machine offers async-job support that would benefit `gitnexus` (long indexing), `cognee` (graph builds), `langfuse` (batch queries), but none implement it.
- **`elicitation.url`** — none of the runtime's MCPs use URL-mode elicitation; secrets still injected via env-var interpolation (e.g. `${TAVILY_API_KEY}` in `.mcp.json`).
- **Tool `outputSchema`** — none of the runtime's MCP tools (sampled via ToolSearch) declare `outputSchema`, so callers can't validate returns.

## §4 modelcontextprotocol/python-sdk

### Minimal FastMCP server (the `Hello World` shape)

```python
from mcp.server.fastmcp import FastMCP

mcp = FastMCP("Demo")

@mcp.tool()
def add(a: int, b: int) -> int:
    """Add two numbers"""
    return a + b

if __name__ == "__main__":
    mcp.run(transport="streamable-http")
```

Three parts: (a) `FastMCP("name")` app construction, (b) `@mcp.tool()` decorator (auto-wraps return into `CallToolResult`), (c) `mcp.run(transport=...)`.

### Streamable HTTP server transport

Class: `StreamableHTTPServerTransport`. Init args:

- `mcp_session_id` — optional session id
- `is_json_response_enabled` — JSON vs SSE
- `event_store` — optional resumability store (multi-node deploys)
- `security_settings` — DNS rebinding protection

Production recommendation: `stateless_http=True` + `json_response=True` for optimal scalability. To mount on existing ASGI: `mcp.streamable_http_app()` + manage `session_manager.run()` async context.

vs **stdio**: stdio is stateless, single-connection, JSON-RPC only. Streamable HTTP is stateful, multi-node-capable via event store, supports both JSON and SSE responses.

### Lifecycle hooks

Only ONE mechanism: the `lifespan` parameter (async context manager):

```python
@asynccontextmanager
async def app_lifespan(server: FastMCP) -> AsyncIterator[AppContext]:
    db = await Database.connect()    # startup (pre-yield)
    try:
        yield AppContext(db=db)
    finally:
        await db.disconnect()         # shutdown (post-yield)

mcp = FastMCP("My App", lifespan=app_lifespan)
```

Tool handlers reach lifespan context via `ctx.request_context.lifespan_context`. **There is NO separate `startup` / `shutdown` decorator** — just lifespan.

## §5 modelcontextprotocol/typescript-sdk

### Server lifecycle (canonical 3-step)

1. `new McpServer({ name, version }, { capabilities })`
2. `new <SomeTransport>(...)` — pick based on deployment
3. `await server.connect(transport)` — performs initialize-handshake + capability exchange

### Tool registration (simplest, README example)

```typescript
server.registerTool(
  'greet',
  {
    description: 'Greet someone by name',
    inputSchema: z.object({ name: z.string() }),
  },
  async ({ name }) => ({
    content: [{ type: 'text', text: `Hello, ${name}!` }],
  }),
);
```

`registerTool(name, metadata, asyncCallback)` — explicit register, not decorator.

### Shipped transports

| Transport | Class | Use case |
|---|---|---|
| **stdio** | `StdioServerTransport` | Local process-spawned MCPs (what `.mcp.json` uses today) |
| **Streamable HTTP** | `NodeStreamableHTTPServerTransport` | Remote servers, SSE streaming, recommended |
| **SSE (legacy)** | `SSEClientTransport` (client only — server side removed) | Backwards compat only |

### Python vs TypeScript SDK — API ergonomics

| Axis | Python (FastMCP) | TypeScript (McpServer) |
|---|---|---|
| Tool registration | Decorator `@mcp.tool()` — schema inferred from type hints | Explicit `server.registerTool(name, meta, cb)` — schema passed explicitly via Zod |
| Lifecycle | `lifespan` async context manager (only mechanism) | `connect()` + capability declared at constructor; cleanup via transport.close() |
| Schema lang | Python type hints → JSON Schema (auto) | Zod schemas (runtime-validated) |
| Default style | Implicit, ergonomic, "Flask-like" | Explicit, declarative, "Express-like" |

Choose Python for prototyping speed; choose TypeScript for runtime-validated boundary + better ecosystem for browser/edge deploys.

## §6 Adoption candidates (top 5 across stream, ranked by impact-for-effort)

| # | Candidate | Why | Effort | Tier |
|---|---|---|---|---|
| 1 | **`planning-with-files` attest-plan SHA-256 mechanism for W-N status files** | Hardens W-N status files against `.md`-injection; reuses already-installed hook. Plug-and-play: run `attest-plan.sh` after authoring each `Wave-N-STATUS.md`. | <1h | **P0** |
| 2 | **GitNexus plugin-cache shell update to `1.6.5`** | Closes audit-trail drift (cache shell `1.3.6` vs binary `1.6.5`). Single `claude plugin update`. Zero behavioral change (binary unchanged). | <5min | **P0** |
| 3 | **`planning-with-files` `.planning/$PLAN_ID/` isolated parallel-task dirs** | Ends the `task_plan.md` file-stomp risk during multi-stream waves (W331 is currently fragile here). Adopt `init-session.sh "W332-StreamA"` per stream. | 1-2h | **P1** |
| 4 | **MCP-2025-11-25 `tasks` capability for gitnexus + cognee** | Long-running indexing currently blocks the call. Task-async would let us fire-and-poll. Requires upstream PR or fork; not free. | weeks | **P2** |
| 5 | **MCP tool `outputSchema` declaration for runtime-authored MCPs** (if/when we author one) | Validatable typed outputs. Cheap to retrofit at MCP-author-time. | per-tool ~30min | **P2** |

Explicitly NOT recommended:

- **GitNexus version upgrade past 1.6.5** — already on latest; FTS-Windows-skip is permanent-by-design, not a fixable issue. **P1 DEFER**, no action.
- **MCP capability-matrix retrofit on third-party MCPs we don't own** — out of runtime scope.

## §7 Cites

**3-org-distinct already met** (W325-A baseline): OthmanAdi + abhigyanpatwari + modelcontextprotocol + anthropics (4-org).

| Finding | File:line | SHA / version |
|---|---|---|
| planning-with-files installed SKILL.md content (L8-32 hook block, L42 session-catchup path, L105-108 2-Action Rule, L223-243 parallel-task workflow, L216-221 scripts inventory) | `Z:/claude-sota-installed/.claude/plugins/cache/planning-with-files/planning-with-files/2.38.1/skills/planning-with-files/SKILL.md` L8-244 (direct on-disk Read verified) | OthmanAdi/planning-with-files v2.38.1 (deepwiki claim: HEAD `d27008f3`; runtime version-tag confirms 2.38.1) |
| GitNexus FTS Windows-skip + bm25-index.js graceful-degradation + hybrid-search RRF fallback | `gitnexus/src/core/db/pool-adapter.ts` (Windows guard), `gitnexus/src/core/search/hybrid-search.ts:177`, `gitnexus/src/mcp/local/local-backend.ts:1011`, `gitnexus/src/core/augmentation/engine.ts:110`, `gitnexus/test/unit/bm25-search.test.ts:134,178` | deepwiki RAG over abhigyanpatwari/GitNexus changelogs up to v1.6.4 (2026-05-10) + npm gitnexus@1.6.5 confirmed via `gitnexus --version` |
| v1.3.7→v1.6.x: KuzuDB→LadybugDB breaking migration (v1.4.0 2026-03-13), thin-client web migration (v1.5.0 2026-04-01), SemanticModel refactor (v1.6.0 2026-04-12) | abhigyanpatwari/GitNexus CHANGELOG.md (deepwiki-cited; not directly on-disk readable) | per deepwiki Q3 follow-up |
| MCP spec 2025-11-25 tools/list contract + capabilities matrix + new tasks state machine | `schema/2025-11-25/schema.{json,ts}` (deepwiki-RAG; specific line-numbers not in deepwiki window) | modelcontextprotocol/modelcontextprotocol spec dir `docs/specification/2025-11-25/` |
| FastMCP minimal server pattern + StreamableHTTPServerTransport + lifespan | python-sdk `src/mcp/server/fastmcp/__init__.py` + `src/mcp/server/lowlevel/server.py` + `src/mcp/server/streamable_http.py` | modelcontextprotocol/python-sdk HEAD (pushed 2026-05-18 per brief) |
| TS SDK McpServer + registerTool + NodeStreamableHTTPServerTransport + SSE legacy | typescript-sdk `README.md` + `src/server/mcp.ts` + `src/server/streamableHttp.ts` + `scripts/cli.ts` | modelcontextprotocol/typescript-sdk HEAD (pushed 2026-05-19 per brief) |
| Runtime evidence: `.mcp.json:36-40` declares gitnexus stdio + PATH-resolved binary | `Z:/claude-sota-installed/.mcp.json:36-40` | local file (Grep) |
| Runtime evidence: installed gitnexus plugin-cache shell version | `Z:/claude-sota-installed/.claude/plugins/cache/gitnexus-marketplace/gitnexus/1.3.6/.claude-plugin/plugin.json` | local file |
| Runtime evidence: installed npm binary version | `C:/Users/42/AppData/Roaming/npm/gitnexus.ps1` → `gitnexus@1.6.5` | `npm list -g --depth=0` confirmed |

**Tool budget**: 14 tool calls used / 20 budget (70%); est. ~90k tokens / 140k budget. Status: **WITHIN BUDGET**, no partial-exhaust flag.

**Non-goals enforced**: (a) no plugin install/update executed, (b) no `.mcp.json` modification, (c) no sub-agent dispatch.
