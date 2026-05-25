# W318 Stream 5 — MCP Deep Audit

**Date**: 2026-05-19
**Scope**: 10 MCP servers in `.mcp.json` (plus `plugin:everything-claude-code:memory` plugin-MCP, audited via CLAUDE.md ref since it isn't in `.mcp.json`).
**Method**: Read `.mcp.json` → HTTP `curl -m 5` probes (with MCP-format `Accept` header) → `npm view <pkg> version` for pinned-vs-latest → CR-9 compliance check per CLAUDE.md W286-arc-P0C ratification.

## Per-server cards

| # | Name | Command / URL | Live? | Pin / Latest | Fallback when down | CR-9? | Auth-clean? | Actions |
|---|---|---|---|---|---|---|---|---|
| 1 | **deepwiki** | `http https://mcp.deepwiki.com/mcp` | UP (external) | n/a (hosted) | silent — empty tool result on 5xx (W315-r2 Stream D LOW) | ✓ http url | ✓ public | none |
| 2 | **chrome-devtools** | `npx -y chrome-devtools-mcp@1.0.1 --no-usage-statistics` | UP (stdio) | **1.0.1 = LATEST** (pub 2026-05-18) | npx-spawn fail → CC tool absent | ✓ npx-pinned | ✓ public | none |
| 3 | **repomix** | `npx -y repomix@1.14.0 --mcp` | UP (stdio) | **1.14.0 = LATEST** | npx-spawn fail → tool absent | ✓ npx-pinned | ✓ public | none |
| 4 | **serena** | `uvx --from git+https://github.com/oraios/serena@249f6b07 serena start-mcp-server --context claude-code` | UP (stdio) | SHA-pinned 249f6b07 (per W124-F1 codex T1 P0 prescription) | uvx-spawn fail → tool absent | ✓ SHA-pinned via uvx | ✓ no creds | monitor for SHA drift |
| 5 | **gitnexus** | `gitnexus mcp` (PATH lookup) | UP locally (v1.6.5 installed) | comment says `1.6.4-rc.112` but bare `gitnexus` resolves PATH = 1.6.5 | bare-PATH fail → CC tool absent | ⚠️ **no `@version` in args** (relies on global install; W132 trade-off) | ✓ no creds | bump comment to 1.6.5 or pin via `npx -y gitnexus@1.6.5` |
| 6 | **ccusage** | `node Z:/claude-sota-installed/.local/npm/node_modules/@ccusage/mcp/dist/index.js` | UP locally (v18.0.11 installed; latest = 18.0.11) | **Z:-baked path** | node-spawn fail → tool absent | ✗ **NOT npx-pinned** — W316-E-* CR-9 migration AI (carry-over) | ✓ no creds | migrate to `npx -y @ccusage/mcp@18.0.11` |
| 7 | **cognee** | `http http://127.0.0.1:8000/mcp` | **UP** (initialize handshake returns `serverInfo: Cognee 1.26.0`) | 1.26.0 via NSSM `CogneeMCP` service | service-down → CC respawn-loop-safe (HTTP not stdio, fails clean) | ✓ http url + supervised service | env-via-NSSM (W298 P1: NSSM env file refactor pending) | none (service stable; W298 ongoing) |
| 8 | **langfuse** | `node Z:/claude-sota-installed-repos/langfuse/mcp-server-langfuse/build/index.js` | UP locally (v0.0.1, hand-built from monorepo) | **Z:-baked path** + **no upstream npm publish** | node-spawn fail → tool absent | ⚠️ NOT npx-pinned (no upstream pkg exists); Z:-baked path violates W286 portability | ✓ `${LANGFUSE_*}` env-interpolated (W268 P0-sec ratified) | document as monorepo-exception, OR vendor-publish to npm |
| 9 | **basic-memory** | `uvx --from basic-memory==0.21.1 basic-memory mcp` | **UP** (curl → HTTP 406 = MCP-server alive on :8765/mcp) | 0.21.1 (uvx-pinned, W308 ratified) | uvx-spawn fail → tool absent | ✓ uvx-pinned (W308) | ✓ no creds; `BASIC_MEMORY_HOME` redirected to state-outside-repo | none |
| 10 | **hf-mcp-server** | `http https://huggingface.co/mcp` | UP (external) | n/a (hosted) | **silent — `hub_repo_search` returns empty on some queries** (W315-r2 Stream D MED) | ✓ http url | ✓ anon (HF_TOKEN recommended for rate-limits) | document silent-fallback in goal-prompt-synthesis skill; set HF_TOKEN |
| — | **`plugin:everything-claude-code:memory`** | plugin-shipped (not in `.mcp.json`) | UP (per CLAUDE.md W295 audit T2 entry) | plugin-version-bound | per ECC plugin lifecycle | n/a (plugin-managed) | n/a | none |

## CR-9 compliance summary

| Tier | Servers | Count |
|---|---|---|
| ✅ Compliant (npx/uvx pinned OR http url) | chrome-devtools, repomix, serena, basic-memory, cognee, deepwiki, hf-mcp-server | 7 |
| ⚠️ Tolerable (PATH-resolved but version-stable) | gitnexus | 1 |
| ✗ Violation (Z:-baked path, no version pin) | **ccusage**, **langfuse** | 2 |

## Auth credential audit

`grep -r "sk-\|pk-\|ghp_\|AKIA" .mcp.json` → **0 raw secrets**. All credential-class refs use `${LANGFUSE_*}` env-interpolation per W268 P0 codex T3 ratification. **Clean**.

## Disabled-servers state

`disabledMcpjsonServers: []` (empty). Per CLAUDE.md W308 the dormant `memory.exe` block was deleted. **No re-enable candidates**; no enable candidates to disable.

## Silent-fallback inventory (4-wave-confirmed)

1. **GitHub MCP `search_repositories`** — returns 0 results silently on well-formed queries (W312-D F1 + W313-D + W314-B + W315-D = 4-wave-confirmed). Not in `.mcp.json` (only via `plugin:everything-claude-code:github`). **Fix queued**: W315-r2 AI-r2-7 = REST fallback via `gh api /search/repositories` in goal-prompt-synthesis skill.
2. **HF MCP `hub_repo_search`** — empty results MED per W315-r2 Stream D. Lowering rate-limit pressure with `HF_TOKEN` may help.
3. **deepwiki CHANGELOG agent-teams edge** — LOW per W315-r2 Stream D.

## Token-consumption flags

`MAX_MCP_OUTPUT_TOKENS=50000` per settings.json. **Most-likely exceeders**: repomix `pack_codebase` (~50k+ tokens on medium repos), serena `find_referencing_symbols` (large-codebase fan-out), cognee `recall` (cold-tier ingest fan-out). All three benefit from `context-mode:ctx_batch_execute` wrapping.

## Top-3 MCP fix priorities

1. **P0 — `ccusage` CR-9 migration** (W316-E-* AI carry-over). Replace `node Z:/.../@ccusage/mcp/dist/index.js` with `npx -y @ccusage/mcp@18.0.11`. Restores Z:-portability invariant. Cold-start delta ~0.5-1s acceptable (operator-approved trade-off per W286-cross). Reversibility HIGH — restore prior `command/args`. **One-edit change to `.mcp.json:42-44`.**
2. **P1 — `langfuse-mcp` Z:-bake exception** (W265 carry-over). No upstream npm publish for `mcp-server-langfuse` (only inside `langfuse/langfuse` monorepo as `mcp-server-langfuse/`). Two paths: (a) accept as documented exception in `.mcp.json _comments` block; (b) vendor-publish minimal fork to `@<runtime>/langfuse-mcp@0.0.1`. Recommend (a) — lower risk, single-machine local-build is intentional. **Action: add `_comments.w318_langfuse_zbake_exception` documenting the trade-off.**
3. **P2 — GitHub-MCP REST fallback codification** (4-wave-confirmed silent-fallback). Land W315-r2 AI-r2-7: add Stage-0 existence-probe via `gh api /search/repositories?q=...` in `goal-prompt-synthesis` skill BEFORE MCP `search_repositories`. Eliminates 4th-wave-confirmed false-zero results. **Action: skill body edit (~10-line addition).**

## Report-back

**7 of 10 MCP servers UP and CR-9 compliant; 2 violations (ccusage + langfuse Z:-baked paths) require migration; cognee :8000/mcp confirmed live with serverInfo Cognee v1.26.0 via NSSM `CogneeMCP`.** Most-stale version: none — all pinned packages at upstream-latest as of probe (chrome-devtools-mcp 1.0.1 pub TODAY 2026-05-18). Most-dangerous silent-fallback: **GitHub MCP `search_repositories` returning empty silently** — 4-wave-confirmed, blocks SOTA discovery workflows; REST-fallback fix already queued as W315-r2 AI-r2-7.
