# 03 — letta GPT-5.5 verdict (verbatim from codex T1 Path P consult)

> **Verdict origin**: REAL GPT-5.5 via codex CLI v0.130.0
> **Profile**: `deep-review` (read-only sandbox)
> **Reasoning effort**: xhigh
> **Tokens used**: 136,321 (Fire 15 was 22,803 — letta is 6× larger anatomy)
> **Cross-model gate state**: ✅ **SATISFIED for letta**

## Subject

Fire 13 anatomy file `03-letta-anatomy.md` at `docs/sota-architecture-audit/fire-13-tier-anatomy/03-letta-anatomy.md`

Subject claims:
- **Claim 1**: "MCP-native: NO (would need custom wrapper)" (L86) + "Wiring path: REQUIRES custom MCP wrapper (NOT off-the-shelf)" (L107)
- **Claim 2**: "PostgreSQL stateful agents" (L83) + "Setup complexity: MEDIUM-HIGH (PostgreSQL setup)" (L89) + "PostgreSQL backend = ADDS new infrastructure dependency" (L99)

## Repo audited

`Z:/repos/deps/letta @ HEAD bb52a8900a79cf1378e6e9cdecf244b673a13a72`
- License: Apache-2.0 (confirmed)
- Probe targets: pyproject.toml, letta/services/mcp/*, letta/schemas/*, letta/server/rest_api/*, letta/settings.py, letta/config.py, alembic/*

## GPT-5.5 verdict JSON (verbatim from EOF of OUT file)

```json
{
  "claim_1_mcp_native": {
    "status": "REFUTED",
    "evidence_file_line": "Z:/repos/deps/letta/letta/services/mcp/base_client.py:4",
    "evidence_summary": "Letta imports MCP ClientSession/Tool and implements MCP list_tools/execute_tool flows plus REST MCP server management.",
    "agree_with_fire13": false
  },
  "claim_2_postgres_required": {
    "status": "REFUTED",
    "evidence_file_line": "Z:/repos/deps/letta/letta/settings.py:493",
    "evidence_summary": "database_engine selects POSTGRES only when a non-default PG URI exists; otherwise it selects SQLITE, with SQLite defaults and Alembic support.",
    "agree_with_fire13": false
  },
  "overall_verdict": "NEEDS-REVISION",
  "confidence": 0.93
}
```

## GPT-5.5 line-cited evidence (verbatim from OUT file)

### Claim 1 — Native MCP support evidence chain

| File:line | Evidence |
|---|---|
| `pyproject.toml:57` | `mcp[cli]>=1.9.4` declared dependency |
| `pyproject.toml:76` | `fastmcp>=2.12.5` declared dependency |
| `letta/services/mcp/base_client.py:4` | Imports MCP `ClientSession` and `Tool` |
| `letta/services/mcp/base_client.py:83` | Lists tools via MCP session |
| `letta/services/mcp/base_client.py:104` | Executes MCP tools |
| `letta/services/mcp/stdio_client.py:3` | Imports MCP stdio primitives |
| `letta/services/mcp/stdio_client.py:22` | Builds `StdioServerParameters` |
| `letta/services/mcp/stdio_client.py:25` | Creates MCP `ClientSession` |
| `letta/schemas/mcp_server.py:22,31,47` | Defines Stdio + SSE + Streamable HTTP MCP server schemas |
| `letta/schemas/mcp_server.py:63` | Unions all three MCP server types |
| `letta/server/rest_api/routers/v1/mcp_servers.py:36` | Exposes `/v1/mcp-servers/` |
| `letta/server/rest_api/routers/v1/mcp_servers.py:47` | Adds MCP server to Letta config |
| `letta/server/rest_api/routers/v1/mcp_servers.py:133` | Lists MCP server tools |
| `letta/server/rest_api/routers/v1/mcp_servers.py:163` | Runs an MCP tool |
| `letta/server/rest_api/routers/v1/mcp_servers.py:194` | Refreshes MCP server tools |
| `letta/server/rest_api/routers/v1/mcp_servers.py:215` | Exposes connect endpoint |
| `letta/server/rest_api/routers/v1/mcp_servers.py:236` | Connects MCP server with OAuth over SSE |

**GPT-5.5 nuance** (verbatim): "I found production MCP **client/manager** support and REST API support for configuring and using external MCP servers. I did not find a production Letta-as-an-MCP-server implementation exposing Letta itself as MCP tools; the FastMCP server implementations I saw are test fixtures. But the Fire13 wording 'MCP-native: NO' and 'requires custom MCP wrapper' is too broad and is refuted by native MCP protocol support."

### Claim 2 — SQLite-default backend evidence chain

| File:line | Evidence |
|---|---|
| `letta/settings.py:258` | `pg_uri` defaults to none |
| `letta/settings.py:259` | `default_pg_uri = None` |
| `letta/settings.py:273` | Defines `DatabaseChoice` enum |
| `letta/settings.py:274` | `POSTGRES` choice |
| `letta/settings.py:275` | `SQLITE` choice |
| `letta/settings.py:306` | Makes `pg_uri` optional |
| `letta/settings.py:493` | **Selects POSTGRES only if `letta_pg_uri_no_default` exists, otherwise SQLite** |
| `letta/config.py:61` | Archival storage DEFAULTS to `sqlite` |
| `letta/config.py:66` | Recall storage DEFAULTS to `sqlite` |
| `letta/config.py:71` | Metadata storage DEFAULTS to `sqlite` |
| `alembic/env.py:21` | Uses PG URI when configured |
| `alembic/env.py:26` | Otherwise sets `sqlalchemy.url` to local SQLite DB |
| `alembic/versions/2c059cad97cc_create_sqlite_baseline_schema.py:24` | Migration only for SQLite |
| `alembic/versions/2c059cad97cc_create_sqlite_baseline_schema.py:25` | Skips when PG URI exists |
| `alembic/versions/2c059cad97cc_create_sqlite_baseline_schema.py:28` | Creates SQLite schema aligned with PostgreSQL state |
| `pyproject.toml:89` | PostgreSQL optional dependency group |
| `pyproject.toml:98` | SQLite optional dependency group |
| `letta/server/db.py:21` | Builds async URI from `settings.letta_pg_uri` (PG path exists) |
| `letta/server/db.py:58` | Creates async engine from PG URI (PG path exists) |

**GPT-5.5 nuance** (verbatim): "There is still a prominent PostgreSQL path: for example `Z:/repos/deps/letta/letta/server/db.py:21` builds an async URI from `settings.letta_pg_uri`, and `:58` creates an async engine from it. But the claim 'PostgreSQL required' is not supported because the repo has explicit SQLite defaults and SQLite migration support. I found no real MySQL backend support beyond comments mentioning sqlite/mysql-style fallback logic."

## Convergence vs Fire 14 Agent A pattern

Letta was NOT audited by Agent A in Fire 14 (Agent A audited only PageIndex). So this Fire 16 verdict is the FIRST cross-model audit of letta. No Sonnet-stand-in vs GPT-5.5 divergence to reconcile.

The CROSS-MODEL gate served its full intended function: GPT-5.5 single-pass adversarial review caught 2 distinct OVER claims with line-cited evidence that Fire 13 Sonnet-only authorship missed.

## Impact on Fire 13 anatomy file

Per `port-note-discipline.md §6` (forward-only correction; no historical rewrite):
- Fire 13 `03-letta-anatomy.md` stays as committed at `c57d807` (historical record)
- Corrections documented here forward-only
- Next W134-F17+ Letta install decision references Fire 16 (this folder) as authoritative

## Cite trail

- Codex consult prompt: `.claude/state/codex_consult_w134_f16_letta_focused.txt`
- Codex consult OUT (verdict): `.claude/state/codex_consult_w134_f16_letta_focused_OUT.txt`
- Repo HEAD pin: `Z:/repos/deps/letta @ bb52a8900a79cf1378e6e9cdecf244b673a13a72`
- Fire 13 subject: `docs/sota-architecture-audit/fire-13-tier-anatomy/03-letta-anatomy.md`
- Path P recipe: `docs/sota-architecture-audit/fire-15-gpt55-convergence/02-path-p-recovery-recipe.md`
- Cross-model T1 framework: `Z:/claude-sota/.claude/rules/cross-model-consensus.md`

## Mia ladder advance (within Fire 16)

n=1238 → n=1242 (+4: GPT-5.5 verbatim verdict captured / Claim 1 19-line cite chain / Claim 2 19-line cite chain / GPT-5.5 nuances quoted verbatim)
