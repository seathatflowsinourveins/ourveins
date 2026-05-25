# W282d — Memory Tier Reconciliation (6-Tier Truth-Up)

**Date**: 2026-05-18 · **Author**: Agent W282-D · **Supersedes**: pre-W282 "5-tier stack" framing in `CLAUDE.md` Status. **Related**: `docs/architecture/W259-grand-catalog/03-deepdive/MEMORY-ULTIMATE-ARCHITECTURE-W259v16.md`; `.mcp.json` `_comments.w281e_basic_memory_2026_05_18`; `_comments.ollama_w259v15` (W263d).

## A. 6-Tier Inventory (W282 state)

| Tier | Component | Status | Last-Write | Use-Class |
|---|---|---|---|---|
| T1 | hindsight (vector recall) | OK Connected (W280b bootstrap) | live | Long-horizon recall; FM-class playbook lookup |
| T2 | `memory` MCP (mcp-memory-service) | FAIL Failed (`ModuleNotFoundError: mcp_memory_service`) | DB 2026-05-16 (orphan, 3.9 MB) | RETIRED — see B |
| T3 | `cognee` (HTTP `:8000`, GraphRAG) | OK Connected (NSSM `CogneeMCP`) **but DORMANT** | MCP data-write 2026-04-18 | Cold-tier semantic graph; under-utilized |
| T4 | `graphiti` (FalkorDB `:16379` + Ollama `:16700`) | OK Active (11 graphs) | live; model arg W282d-corrected | Temporal-KG (episodes -> nodes/edges with valid_at/invalid_at) |
| T5 | `langfuse` MCP (self-hosted `:3000`) | Agent W282-A startup in progress | n/a (Agent A scope) | LLM trace + prompt observability |
| T6 | `basic-memory` (markdown bidirectional) | OK Connected after W282d JSON fix | new (W282d operational) | Filesystem-survivable; agent **reads AND writes** markdown |

Verified via `claude mcp list` post-W282d (basic-memory: `FAIL -> OK`).

## B. T2 `memory` MCP RETIREMENT

T2 is RETIRED. **Evidence**: W278 disabled the plugin variant; the standalone (`Z:/venvs/claude/Scripts/memory.exe server`) also fails with `ModuleNotFoundError: mcp_memory_service` — venv lacks the package. DB at `Z:/claude-sota-installed-state/.mcp-memory/memory.db` is orphan.

**Supersession**: T6 (`basic-memory`) replaces T2's "structured fact store" role with (a) filesystem persistence + human-readable inspection, (b) bidirectional agent read/write, (c) no Python-venv dependency (standalone `uvx`-installed `.exe`).

**Operator actions (NOT executed)**:
1. Leave the orphan DB in place (no harm) OR archive to `.mcp-memory.retired-W282d/`.
2. Optional: remove the `memory` stanza from `.mcp.json` to clean `claude mcp list` output (kept for now — non-functional stanza causes no respawn loop, only a failed-connect line).

## C. Cognee state-dir migration PLAN (DEFER)

**Violation**: cognee state at `C:/Users/42/.cognee/` (196 MB total — 4 MB data, 192 MB stale `session-end-hook.log`); should live under `Z:/claude-sota-installed-state/`.

**Why deferred**: Moves **user data**; NSSM `CogneeMCP` runs live; mid-migration failure orphans the MCP. Requires operator confirm.

**Plan (DO NOT execute without approval)**:
```powershell
# 1. Stop service
sc stop CogneeMCP

# 2. Move
Move-Item C:\Users\42\.cognee Z:\claude-sota-installed-state\cognee

# 3. Update NSSM env (current env lacks SYSTEM_ROOT_DIRECTORY + DATA_ROOT_DIRECTORY — they come from .env)
$nssm = "C:\Users\42\AppData\Local\Microsoft\WinGet\Packages\NSSM.NSSM_Microsoft.Winget.Source_8wekyb3d8bbwe\nssm-2.24-101-g897c7ad\win64\nssm.exe"
& $nssm set CogneeMCP AppEnvironmentExtra `
  OPENAI_API_KEY=local OPENAI_BASE_URL=http://127.0.0.1:8080/v1 LLM_MODEL=qwen36 `
  PYTHONUNBUFFERED=1 PYTHONIOENCODING=utf-8 `
  LANGFUSE_HOST=http://127.0.0.1:3000 LANGFUSE_BASE_URL=http://127.0.0.1:3000 `
  "LANGFUSE_PUBLIC_KEY=$env:LANGFUSE_PUBLIC_KEY" `
  "LANGFUSE_SECRET_KEY=$env:LANGFUSE_SECRET_KEY" `
  SYSTEM_ROOT_DIRECTORY=Z:/claude-sota-installed-state/cognee/data `
  DATA_ROOT_DIRECTORY=Z:/claude-sota-installed-state/cognee/data

# 4. Edit the moved .env to update both *_ROOT_DIRECTORY paths C:\Users\42\.cognee -> Z:\claude-sota-installed-state\cognee.

# 5. Restart + smoke
sc start CogneeMCP
claude mcp list | Select-String cognee  # expect: OK Connected
```

**Pre-flight cleanup**: Before moving, prune `C:/Users/42/.cognee/logs/session-end-hook.log` (192 MB, last write 2026-04-11 — runaway from a hook no longer wired).

**Verdict: DEFER**. Cognee dormant 30 days; violation cosmetic, not behavioral. Bundle with next cognee re-engagement.

## D. Graphiti model arg fix (executed)

`.mcp.json` graphiti `args[--model]` `qwen3-vl-8b` -> `qwen3-coder:30b-a3b-q4_K_M`.

**Rationale**: Per `.mcp.json` `_comments.ollama_w259v15` W263d swap (commit `0c61793`, 2026-05-17), the Ollama-resident extraction model is `qwen3-coder:30b-a3b-q4_K_M` (5x faster nested-array extract, 4x faster real openai-SDK `responses.parse`, CPU-resident — no GPU contention with the 35B chat model). The `--model` arg had drifted to `qwen3-vl-8b` (a vision-language model, not the resident coder model) — graphiti calls hit Ollama with an unknown model name. Fix aligns CLI arg with resident model.

**Verification**: `.mcp.json` parses valid; graphiti MCP adopts new arg on next CC restart (MCP server env is spawn-time per existing `ollama_w259v15` comment chain).

## E. basic-memory T6 verification

**Verdict: OK Connected** via `claude mcp list`.

**Pre-W282d**: `FAIL Failed to connect`. **Root causes (2 stacked bugs in `Z:/claude-sota-installed-state/basic-memory/config/config.json`)**:
1. `path` had Windows backslashes -> JSON-escape parse error at line 5 (`\c`, `\b`, `\m` invalid escapes).
2. `env: "prod"` failed Pydantic Literal validation (allowed: `'test' | 'dev' | 'user'`).

**Fixes (state-side, gitignored)**: `path` -> forward slashes; `env` -> `"user"`.

**Filesystem-survivable means**:
- Notes are plain `.md` under `Z:/claude-sota-installed-state/basic-memory/markdown/`; tiny sqlite_vec `memory.db` is the search index, not the source of truth.
- If the DB is lost/corrupted, `basic-memory reindex` rebuilds from markdown.
- Survives auto-compact (markdown is out-of-context) and session rollover (filesystem persists across CC restarts).
- Bidirectional: humans grep/edit notes directly — distinct from T1 (agent-only vector) and the retired T2 (agent-only sqlite_vec).

**Optional Commit 2 status**: SKIPPED. basic-memory is a standalone `uvx`-installed CLI (no CC plugin manifest, no hooks to discover). A self-invented SessionStart hook would violate cardinal-rule-2.

## Changelog (W282d)

| File | Change |
|---|---|
| `CLAUDE.md` | "Memory live" rewritten to 6-tier inventory with per-tier status |
| `.mcp.json` | graphiti `--model` `qwen3-vl-8b` -> `qwen3-coder:30b-a3b-q4_K_M` |
| `Z:/claude-sota-installed-state/basic-memory/config/config.json` | (state-only, gitignored) Fixed JSON-escape + env Literal — unblocks T6 connect |
| `docs/architecture/W282d-MEMORY-RECONCILIATION-2026-05-18.md` | NEW (this file) |
