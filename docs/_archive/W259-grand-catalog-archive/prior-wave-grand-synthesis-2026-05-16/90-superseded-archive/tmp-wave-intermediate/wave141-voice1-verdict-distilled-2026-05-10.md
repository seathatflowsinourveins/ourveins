# Wave 141 Fire 1 — Voice 1 Path P codex T1 verdict (distilled)

**Source**: `Z:/claude-sota-installed/.claude/state/codex_consult_w141_graphiti_smoke_probe_OUT.txt` (13156 LOC)
**Origin**: REAL GPT-5.5 codex CLI v0.130.0 via Path P recipe (foreground+tee, DEFAULT profile, 300s timeout, 171,484 tokens)
**Cross-model gate**: ✅ FULLY SATISFIED

## VERDICT

`{"verdict":"NEEDS-REVISION","confidence":0.89, ...}` per JSON-at-EOF

## Critical correction caught

- **Tool name**: registered as `search_nodes` in `graphiti_mcp_server.py:407` @ HEAD c427615044678f4bde026745d8d28a16504868c5 — NOT `search_memory_nodes` as my Voice 2 brief suggested. **Voice 2 brief was WRONG**; Voice 2 should self-correct via upstream source read per its instructions.

## Refined 4-step probe spec (replaces 3-step)

1. **Boot**: Start exact `.mcp.json` graphiti stdio command/env; require process alive, no fatal stderr, no stdout before JSON-RPC framing
2. **MCP wire**: Send JSON-RPC `initialize` + assert protocol response/capabilities; then `tools/list` + assert exact current tool names plus `inputSchema` required fields
3. **DB wire health (NEW)**: Call `get_status` + require `status=ok` (executes simple graph query — proves Graphiti↔FalkorDB query path)
4. **L3 live pass**: Call `add_memory` with unique canary group_id/name/body/uuid; because `add_memory` is queued, **poll** `get_episodes` + `search_nodes` until canary retrievable OR timeout; fail on any ErrorResponse

## Expected tools/list schema (9 tools)

`add_memory` / `search_nodes` / `search_memory_facts` / `delete_entity_edge` / `delete_episode` / `get_entity_edge` / `get_episodes` / `clear_graph` / `get_status`

Per `graphiti_mcp_server.py:321,407` @ HEAD c427615... — `@mcp.tool()` registrations at add/search/delete/get/status blocks.

## Hidden failure modes (8) — Voice 2 must guard against

1. Wrong tool name (`search_nodes` vs `search_memory_nodes`)
2. `add_memory` returns queued before background ingestion completes — immediate search can false-fail OR queued-only success can false-pass
3. LLM endpoint `127.0.0.1:11700` may be down, wrong model, OR incompatible with OpenAI structured-output / `responses.parse`
4. Embedder endpoint/model may be down OR return wrong vector dimension
5. FalkorDB module presence on 16379 ≠ password/database/index/query compatibility through Graphiti
6. `FALKORDB_PASSWORD` empty + no username wired — auth-enabled FalkorDB would fail despite module probe passing
7. `uv --isolated` can fail or stall on dependency resolution / import before MCP initialize
8. Stdio stdout contamination before JSON-RPC would break MCP even if stderr logs look healthy

## Hidden architectural concern (HIGHEST RISK)

`factories.py:110` @ HEAD c427615... builds `OpenAIClient` with configured base URL, BUT upstream `README.md:521` @ HEAD c427615... says Ollama-style providers should use `OpenAIGenericClient` NOT `OpenAIClient` — **structured-output compatibility failure** Step 4 should catch.

This is the kind of failure that produces silent ingestion failures even when wire smoke passes — Graphiti will call `client.responses.parse()` against Ollama, which doesn't support OpenAI's structured-output `responses.parse` API surface.

## 5 prescribed_edits (Pattern A apply targets)

1. Replace `search_memory_nodes` → `search_nodes` in Step 2 expected schema
2. Add explicit `get_status` call after `tools/list`
3. Step 3 (now Step 4) polling for queue-backed ingestion
4. Forbid fake LLM/embedder for PASS classification (HARNESS-ONLY classification only)
5. Add timeout/error capture for uv-resolution / model-endpoint / embedder-endpoint / FalkorDB-auth/database / stdio-contamination

## Embedding provider concern (verbatim)

> Current MCP config uses provider openai with OPENAI_API_URL=http://127.0.0.1:11700/v1, OPENAI_API_KEY=ollama, embedder model qwen3-embedding:0.6b, and EMBEDDER__DIMENSIONS/EMBEDDING_DIM=1024. L3 must exercise this real embedder path; a fake embedder would downgrade the result to harness-only. Also verify returned vector dimensionality matches existing FalkorDB indexed data.

## Propagation to Voice 2 + Voice 3

- **Voice 2** must self-correct tool name from upstream source read; if Voice 2 returns with `search_memory_nodes` claim, orchestrator catches as Mia OVER + corrects per Voice 1 verdict
- **Voice 3** status-flip design must classify wire status using these 4 categories:
  - **PASS**: All 4 steps complete cleanly + L3 live pass with real LLM/embedder
  - **PARTIAL — wire-only**: Steps 1+2+3 PASS but Step 4 fails on LLM/embedder unreachable
  - **PARTIAL — harness-only**: Steps 1+2 PASS only (no get_status, no live ingest)
  - **FAIL**: Steps 1+2 fail (MCP wire broken)

## FM-20 path-drift cascade defense

- Voice 1 caught the `search_memory_nodes` framing OVER from my Voice 2 brief at orchestrator-side synthesis layer — propagation surface #6 added to Wave 140 Fire 1 ladder n=10+

## Sister-rule integration

- Voice 1's recommended `get_status` Step 3 addition aligns with `audit-action-loop.md` §Wire/Surface/Close/Re-fire — "Surface" stage requires `any_drift: false` confirmation; `get_status` IS the wire-side `any_drift: false` probe for Graphiti↔FalkorDB
- Voice 1's `OpenAIClient` vs `OpenAIGenericClient` concern is a CR-9 install-risk shaped finding — sibling-bleed defense recommendation: verify `factories.py:110` against upstream README before claiming PASS
