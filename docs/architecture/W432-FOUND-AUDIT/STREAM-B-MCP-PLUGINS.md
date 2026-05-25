# W432-FOUNDATION-AUDIT Stream B — MCP servers + plugin load health

**Working dir**: `Z:/claude-sota-installed`
**Audit timestamp**: 2026-05-24 (session-local)
**Scope**: enumerate every MCP server in `.mcp.json` + every plugin in `installed_plugins.json`/`settings.json:enabledPlugins`; probe live state; identify root causes.

Cite floor (3+ distinct orgs): Anthropic (claude-code MCP/plugins/hooks docs + claude-cookbooks 39a350b6) · OpenAI (codex-plugin-cc 1.0.4 hooks.json) · Microsoft (autogen v1.0 GA termination semantics referenced by CLAUDE.md L20) · Cognee (1.26.0 serverInfo) · Langfuse (3.174.1 /api/public/health) · Pydantic (FastMCP 3.3.1 banner) · OWASP (A06:2021 in CLAUDE.md L23 verify-before-claim).

---

## Section 1 — MCP server inventory + live probe

`.mcp.json` declares **18 MCP server entries**; **17 active, 1 explicitly `disabled:true` (exa)**.

| # | server | type | command/url | pin discipline | live state | issues |
|---|---|---|---|---|---|---|
| 1 | `deepwiki` | http | `https://mcp.deepwiki.com/mcp` | (remote, no pin) | HTTP 405 on HEAD = endpoint live | none |
| 2 | `github` | stdio | `npx -y @modelcontextprotocol/server-github@2025.4.8` | CR-9 PIN OK | env `${GITHUB_TOKEN}` populated | none — secret correctly env-interpolated |
| 3 | `chrome-devtools` | stdio | `npx -y chrome-devtools-mcp@1.0.1 --no-usage-statistics` | CR-9 PIN OK | n/a (lazy spawn) | **VERSION-DRIFT** — `.mcp.json` line 37 cites `1.0.1` but `_comments.chrome_devtools` says pinned `0.25.0`; comment block is stale-fact per CR-6 |
| 4 | `repomix` | stdio | `npx -y repomix@1.14.0 --mcp` | CR-9 PIN OK | n/a (lazy spawn) | none |
| 5 | `serena` | stdio | `uvx --from git+...@981f560f serena start-mcp-server` | CR-9 SHA-PIN OK | n/a (lazy spawn) | none — SHA `981f560f` (not the `_comments.serena_pin` claimed `249f6b07`; comment block is stale) |
| 6 | `ccusage` | stdio | `npx -y @ccusage/mcp@18.0.11` | CR-9 PIN OK | n/a (lazy spawn) | none |
| 7 | `cognee` | http | `http://127.0.0.1:8000/mcp` | local (no pin needed) | **LIVE** — initialize → `Cognee 1.26.0`, `protocolVersion 2024-11-05` | none — NSSM `CogneeMCP` SERVICE_RUNNING, pid python:9748 LISTEN :8000 |
| 8 | `langfuse` | stdio | `npx -y langfuse-mcp-server@0.0.2-rc.0` | CR-9 PIN OK (RC channel) | n/a (lazy spawn) | env vars OK — `LANGFUSE_HOST/BASE_URL/PUBLIC_KEY/SECRET_KEY` all populated; **backing service 3.174.1 HEALTHY** (contradicts CLAUDE.md L37 "DOWN-CRASH-LOOP" claim) |
| 9 | `basic-memory` | stdio | `uvx --from basic-memory==0.21.4 basic-memory mcp` | CR-9 PIN OK | smoke-confirmed FastMCP 3.3.1 banner | **PIN-DRIFT** — `.mcp.json` line 93 says `==0.21.4`, but `Z:/claude-sota-installed/.local/bin/basic-memory.exe --version` reports `0.21.1` AND `_comments.w308_basic_memory_uvx_pin_2026_05_19` documents `==0.21.1`. The current pin uses `0.21.4` so uvx will spawn the newer version — but the documentation lineage and the locally-installed shim are stale |
| 10 | `hf-mcp-server` | http | `https://huggingface.co/mcp` | (remote, no pin) | HTTP 405 on HEAD = endpoint live | none — anonymous-rate-limit per mcp instructions |
| 11 | `perplexity` | stdio | `npx -y @perplexity-ai/mcp-server@0.9.0` | CR-9 PIN OK | env `${PERPLEXITY_API_KEY}` populated | none |
| 12 | `playwright` | stdio | `npx -y @playwright/mcp@0.0.75` | CR-9 PIN OK | n/a (lazy spawn) | none |
| 13 | `exa` | stdio | `npx -y exa-mcp-server@3.2.1` | CR-9 PIN OK | **DISABLED** (`disabled:true`) | EXA_API_KEY env IS populated (per env probe); intentional disable per `_comments.w259v9_u10` audit |
| 14 | `firecrawl` | stdio | `npx -y firecrawl-mcp@3.17.0` | CR-9 PIN OK | env `${FIRECRAWL_API_KEY}` populated | none |
| 15 | `codegraph` | stdio | `npx -y @colbymchenry/codegraph@0.9.3 serve --mcp` | CR-9 PIN OK | n/a (lazy spawn) | **VERSION-DRIFT** — `.mcp.json` line 153 cites `0.9.3` but `_comments.w343_a14_codegraph_2026_05_20` says pinned `0.7.10`; comment block is stale |
| 16 | `docling` | stdio | `uvx --from docling-mcp==1.3.4 docling-mcp-server` | CR-9 PIN OK | n/a (lazy spawn) | none |
| 17 | `openhands-dispatch` | stdio | `uv run --with fastmcp>=3.2 --with-editable . fastmcp run agents/mcp_server.py:mcp` | partial — `fastmcp>=3.2` is FLOOR-PIN not EXACT-PIN | n/a (lazy spawn) | **P0 CR-9 VIOLATION** — `fastmcp>=3.2` is a floor-pin (D6 auto-upgrade risk per CR-9); **P0 ENV-MISSING** — `OPENHANDS_DISPATCH_TOKEN` + `OPENHANDS_SUBSCRIPTION_MODEL` env vars UNSET (mcp-env-precheck warns at SessionStart); MCP will fail silent-auth |
| 18 | `gpt-researcher` | stdio | `uv run --isolated --directory Z:/repos/deps/gptr-mcp ...` | CR-9 EXACT-PIN OK (`gpt-researcher==0.14.8 fastmcp==3.3.1` via `--with` overrides) | clone exists (`Z:/repos/deps/gptr-mcp/.git`) | **Z:-portability liability** — bakes `Z:/repos/deps/gptr-mcp` into tracked `.mcp.json` (acknowledged in `_comments.w411`); env vars OK (`OPENAI_API_KEY`, `TAVILY_API_KEY` populated) |

### MCP credential hygiene

- **All credentials env-interpolated** — `${GITHUB_TOKEN}`, `${PERPLEXITY_API_KEY}`, `${FIRECRAWL_API_KEY}`, `${EXA_API_KEY}`, `${LANGFUSE_*}`, `${OPENAI_API_KEY}`, `${TAVILY_API_KEY}`, `${OPENHANDS_*}` — **zero plain-text secrets** in tracked `.mcp.json`. CR-9 compliance: PASS for credentials. Cite: W268 codex T3 P0-security pattern (`_comments.w265_langfuse_2026_05_17`).
- Env vars verified populated for: GITHUB_TOKEN, LANGFUSE_*, OPENAI_API_KEY, PERPLEXITY_API_KEY, FIRECRAWL_API_KEY, TAVILY_API_KEY, EXA_API_KEY.
- Env vars MISSING: `OPENHANDS_DISPATCH_TOKEN`, `OPENHANDS_SUBSCRIPTION_MODEL` (precheck WARN at SessionStart).

### MCP pin discipline summary

- 17/18 servers: CR-9 exact-pin compliant.
- 1/18 (openhands-dispatch): FLOOR-PIN violation (`fastmcp>=3.2`).
- 3 comment blocks contain stale version-strings (chrome-devtools, serena, codegraph) — non-functional but CR-6 verify-before-claim drift.

---

## Section 2 — Plugin inventory + load health

`installed_plugins.json` records **55 plugin records / 54 distinct plugin IDs** (`typescript-lsp@claude-plugins-official` has 2 records: scope=project + scope=user, same install path).
`settings.json:enabledPlugins` records **55 entries** (47 true, 8 false).
`installed_plugins.json:enabledPlugins` records **1 entry** (`context-mode@context-mode:true` — installer-state field, NOT the authoritative enablement map per W370 Stream C F1 correction in CLAUDE.md L36).

### Enablement cross-check vs install state

| state | count | detail |
|---|---|---|
| `enabled:true` AND installed in cache | 47 | normal |
| `enabled:false` AND installed in cache | 6 | hookify, intelligent-compact, claude-mem, review-agent-governance, gitnexus, protect-mcp |
| `enabled:false` AND NOT in installed_plugins.json (**phantom-disabled**) | 2 | `clickhouse@claude-plugins-official`, `outputai@claude-plugins-official` — already flipped enabled=false per W342 X1 §3 (correct state) |
| installed in cache but NOT in `enabledPlugins` map (**orphan-installed**) | 1 | `hindsight-memory@hindsight` — consistent with T1 retirement; no `enabledPlugins` row needed |

### SHA-drift findings — 14 plugins claim install paths that do NOT exist

`installed_plugins.json` records `installPath` strings for 13 `claude-plugins-official` plugins that point to SHA-derived directory `3d355c0d8eec`, but the on-disk cache only has `a78debbb97b0`. Plus 1 marketplace-dir miss for gitnexus.

| plugin (FQN) | recorded SHA in installed_plugins.json | recorded `installPath` directory exists? | actual cache version on disk | risk |
|---|---|---|---|---|
| `agent-sdk-dev@claude-plugins-official` | `3d355c0d8eec...` | NO | `a78debbb97b0` | W270 silent SHA drift |
| `frontend-design@claude-plugins-official` | `3d355c0d8eec...` | NO | `a78debbb97b0` | same |
| `pr-review-toolkit@claude-plugins-official` | `3d355c0d8eec...` | NO | `a78debbb97b0` | same |
| `skill-creator@claude-plugins-official` | `3d355c0d8eec...` | NO | `a78debbb97b0` | same |
| `plugin-dev@claude-plugins-official` | `3d355c0d8eec...` | NO | `a78debbb97b0` | same |
| `code-review@claude-plugins-official` | `3d355c0d8eec...` | NO | `a78debbb97b0` | same |
| `feature-dev@claude-plugins-official` | `3d355c0d8eec...` | NO | `a78debbb97b0` | same |
| `commit-commands@claude-plugins-official` | `3d355c0d8eec...` | NO | `a78debbb97b0` | same |
| `session-report@claude-plugins-official` | `3d355c0d8eec...` | NO | `a78debbb97b0` | same |
| `playground@claude-plugins-official` | `3d355c0d8eec...` | NO | `a78debbb97b0` | same |
| `mcp-server-dev@claude-plugins-official` | `3d355c0d8eec...` | NO | `a78debbb97b0` | same |
| `code-modernization@claude-plugins-official` | `3d355c0d8eec...` | NO | `a78debbb97b0` | same |
| `hookify@claude-plugins-official` | `3d355c0d8eec...` | NO | `a78debbb97b0` | same — also `enabled:false` so low blast-radius |
| `gitnexus@gitnexus-marketplace` | (version 1.3.6) | NO — entire `gitnexus-marketplace/` cache dir MISSING | (none) | OK — plugin is `enabled:false`; safe to retire entry |

**Root cause analysis (W270 corollary)**: when `claude-plugins-official` upstream commits land between local `/plugin update` cycles, the auto-update writes a new version-directory (`a78debbb97b0`) but does NOT rewrite the `installPath` field in `installed_plugins.json` (still cites the prior SHA-dir `3d355c0d8eec`). CC's plugin-loader uses the `installPath` field as authoritative; when the directory is missing it silently falls back to `latest` resolution OR fails-silent. Per CLAUDE.md L18 W270 corollary fix: "cache-delete + fresh-install" — but here the cache IS fresh, the **bookkeeping is stale**. The fix is: rewrite `installed_plugins.json` to point at the actual on-disk SHA-dir.

### Cache vs installed_plugins cross-check totals

- Plugin records: 55 (54 distinct + 1 duplicate scope=user typescript-lsp).
- `installPath` directories that exist: 41/55 (75%).
- `installPath` directories MISSING: 14/55 (25%) — **all 13 `claude-plugins-official` 3d355c0d8eec entries + gitnexus**.
- SHA-meta drift inside `.plugin-meta.json`: 0 (when meta files exist they agree with `gitCommitSha`; checked via node script).

### Plugin marketplaces cached

15 marketplaces in `.claude/plugins/cache/`: addy-agent-skills, anthropic-agent-skills, antigravity-awesome-skills, claude-code-workflows, claude-plugins-official, claude-settings, context-mode, everything-claude-code, hindsight, karpathy-skills, openai-codex, planning-with-files, pydantic-skills, superpowers-marketplace, thedotmack. The 21 `extraKnownMarketplaces` entries in settings.json represent metadata — not all materialize cache dirs (only those with installed plugins do). Confirmed: `gitnexus-marketplace` referenced in `extraKnownMarketplaces` but no cache dir exists (since the plugin is `enabled:false` and the install never landed cleanly). Matches CLAUDE.md L36 "cache_dirs=15".

### Codex plugin hook integrity (CLAUDE.md L10)

Verified `.claude/plugins/cache/openai-codex/codex/1.0.4/hooks/hooks.json` declares:
- SessionStart → `session-lifecycle-hook.mjs SessionStart` (timeout 5s)
- SessionEnd → `session-lifecycle-hook.mjs SessionEnd` (timeout 5s)
- Stop → `stop-review-gate-hook.mjs` (timeout 900s)

This merges separately from `settings.json:hooks.*` per CLAUDE.md L19 — empty `settings.json:hooks.Stop:[]` would NOT mean Stop-hook absent (the plugin-side declaration would still be wired). Verified by direct read.

---

## Section 3 — Memory tier T1-T6 health

| tier | name | expected per CLAUDE.md L37 | observed | match |
|---|---|---|---|---|
| **T1** | hindsight | RETIRED (W316-S6) — no NSSM, no LISTEN :9077, no daemon | `nssm status Hindsight` → service not exists; `Get-NetTCPConnection :9077` → no listener; no `hindsight` process; **but** `Z:/claude-sota-installed/.hindsight/profiles/claude-code.env` profile file STILL PRESENT (zombie config artifact) | **MATCH** for runtime state; **PARTIAL** — env profile file should be cleaned |
| **T2** | `plugin:everything-claude-code:memory` | canonical KG fallback | ECC plugin installed at `.claude/plugins/cache/everything-claude-code/everything-claude-code/2.0.0-rc.1/` with valid `plugin.json` (name=`ecc`, version=`2.0.0-rc.1`); `enabled:true` per settings.json; ECC reinstated per W342 X1 §1.E | **MATCH** |
| **T3** | cognee | NSSM `CogneeMCP` :8000/mcp RUNNING; `Cognee 1.26.0` serverInfo | `nssm status CogneeMCP` → SERVICE_RUNNING; `:8000` LISTEN pid=9748 python; initialize handshake returns `serverInfo: {name:"Cognee",version:"1.26.0",protocolVersion:"2024-11-05"}` | **MATCH** — fully healthy |
| **T4** | graphiti | RETIRED (W272+W290+W295 AI-5); `.mcp.json:graphiti` excised; `disabledMcpjsonServers:[]`; FalkorDB :16379 STOPPED-by-design; Ollama :16700 LIVE | `.mcp.json` confirmed has NO `graphiti` key; `disabledMcpjsonServers: []` per settings.json line 139; `Get-NetTCPConnection :16379` → no listener; `:16700` LISTEN pid=7824 ollama | **MATCH** — retirement clean |
| **T5** | langfuse | **STALE CLAIM**: CLAUDE.md L37 says "DOWN-CRASH-LOOP v3.174.1; langfuse-postgres MISSING; curl :3000 → connection refused" | **CONTRADICTS** CLAUDE.md: `docker ps` shows **9/9 containers Up healthy**: `langfuse-web 3.174.1 (Up 44h healthy)`, `langfuse-worker 3.174.1 (Up 44h healthy)`, **`langfuse-postgres:17 (Up 44h healthy)`** [explicit contradiction], `langfuse-clickhouse 24.12 (Up 2d healthy)`, `langfuse-redis 7 (Up 2d healthy)`, `langfuse-minio (Up 44h healthy)`, `grafana 12.4.1 (Up 2d healthy)`, `prometheus v3.10.0 (Up 2d healthy)`, `phoenix 13.15.0 (Up 2d healthy)`. `curl http://127.0.0.1:3000/api/public/health` → `HTTP 200 {"status":"OK","version":"3.174.1"}` | **CLAUDE.md L37 IS STALE-FACT (CR-6 violation)** — T5 is FULLY LIVE; postgres is healthy; OTEL trace endpoint `:3000/api/public/otel/v1/traces` configured in settings.json env should now succeed |
| **T6** | basic-memory | canonical primary (W295) | `Z:/claude-sota-installed/.local/bin/basic-memory.exe --version` → `Basic Memory version: 0.21.1`; `Z:/claude-sota-installed-state/basic-memory/` populated with `architecture/`, `config/`, `discovery/`, `findings/`, `goal-prompts/`, `learnings/`, `main/`, `markdown/`, `patterns/`, `verdict-ledger/`, `verdicts/`, `w288-p4-smoke/`, `waves/` subdirs; stdio MCP handshake via `uvx --from basic-memory==0.21.4` returns FastMCP 3.3.1 banner | **MATCH** — service healthy, but PIN-DRIFT between `.mcp.json` (`==0.21.4`) and locally-installed shim (`0.21.1`) |

### Supporting services state

| service | port | NSSM | status | role |
|---|---|---|---|---|
| `CogneeMCP` | 8000 | SERVICE_RUNNING | python pid 9748 | T3 cognee |
| `LlamaSwap` | 8090 | SERVICE_RUNNING | llama-swap pid 7852 | local model proxy |
| `Ollama` (via winget — NOT nssm-managed) | 16700 | n/a | ollama pid 7824 | LLM backend (T3 cognee + sibling graphiti env) |
| `Phoenix` | n/a | (NSSM probe returned empty/error) | docker container Up 2d healthy | OTEL traces (Arize Phoenix 13.15.0 via Docker) |
| `Hindsight` | 9077 | service not exists | OK retired | T1 (retired) |
| `FalkorDB` | 16379 | service not exists | OK retired | T4 (retired) |

Note: Phoenix runs as Docker container, NOT NSSM — matches CLAUDE.md L37 fix-up about `com.docker.backend.exe` owning :16006 not Phoenix NSSM.

---

## Section 4 — Identified GAPS

### G1: T5 Langfuse status drift in CLAUDE.md (HIGH-severity CR-6 violation)
CLAUDE.md L37 declares Langfuse DOWN-CRASH-LOOP citing "langfuse-postgres MISSING from docker ps" + "curl :3000 → connection refused". Empirically `docker ps` shows postgres healthy 44h + `:3000` returns HTTP 200. The CLAUDE.md preload is misinforming every new CC session about an active observability backend. OTEL trace exporters configured in `.claude/settings.json` env (lines 19-22 OTEL_EXPORTER_OTLP_TRACES_ENDPOINT) point at `:3000/api/public/otel/v1/traces` and **should be receiving traces successfully**.

### G2: 13 claude-plugins-official entries point at phantom SHA `3d355c0d8eec` (W270 SHA-drift)
Same upstream-update race condition documented in CLAUDE.md L18 W270 corollary. `installed_plugins.json` `installPath` field NOT rewritten when cache transitioned `3d355c0d8eec → a78debbb97b0`. Plugins may still load via fallback resolution but the bookkeeping invariant `installPath EXISTS` is violated for 25% of records. Risk: confused diagnostics, broken `/plugin install` idempotency, codex-rescue + audit-action-loop cite-discipline impacted.

### G3: openhands-dispatch MCP P0 — missing env vars + floor-pin
- `OPENHANDS_DISPATCH_TOKEN` UNSET — auth will silent-fail on first tool call.
- `OPENHANDS_SUBSCRIPTION_MODEL` UNSET — model-routing will fall to default OR error.
- `fastmcp>=3.2` floor-pin is a CR-9 D6 violation; should be exact-pin.

### G4: basic-memory pin-drift between `.mcp.json` (0.21.4) and locally-installed shim (0.21.1)
W308 comment block hard-codes `0.21.1`. `.mcp.json` line 93 says `==0.21.4`. uvx will spawn `0.21.4` (newer wins) but the local shim at `.local/bin/basic-memory.exe` is `0.21.1`. Two interpretations: (a) operator bumped pin in `.mcp.json` without rebuilding the shim — minor; (b) doc lineage stale. Either way: CR-6 verify-before-claim violation in the inline comment text.

### G5: Stale version-strings in 3 `.mcp.json` comment blocks
- `_comments.chrome_devtools`: claims pin `0.25.0`, actual `1.0.1`.
- `_comments.serena_pin`: claims SHA `249f6b07f9ccac259b0ff95e06c9a40629748e17`, actual `981f560fa334ba52e9a2a45c702f23d971c9dcca`.
- `_comments.w343_a14_codegraph`: claims `0.7.10`, actual `0.9.3`.
Non-functional drift, but provenance trail unreliable.

### G6: Zombie `.hindsight/profiles/claude-code.env` profile
T1 was retired W316-S6 but the per-profile env file is still present in the worktree at `Z:/claude-sota-installed/.hindsight/profiles/claude-code.env`. Per CLAUDE.md L37 "no daemon + no NSSM service" the runtime is inert, but the artifact should be cleaned to match the retirement.

### G7: `_comments.context_mode_removed` content stale
This `.mcp.json` `_comments` block (line 10) discusses the W95 Ship 1M removal — informational only — but it describes the CURRENT state of the runtime, while there's also a live `context-mode` plugin (NOT MCP entry) wired via `enabledPlugins`. The comment lineage is correct but easy to misread as "context-mode is removed entirely" when in fact only the standalone MCP is removed.

### G8: Plugin SHA-pin contract inconsistency
Two SHA-style version representations exist in `installed_plugins.json`:
- Some plugins use semver (e.g. `1.0.0`, `1.0.4`, `2.0.0-rc.1`).
- Others use 12-char SHA-prefix (e.g. `3d355c0d8eec`, `690f15cac7f7`, `a78debbb97b0`).
Inconsistency is upstream-driven (some marketplaces version via tag, others via SHA). Not actionable here but worth flagging for cross-machine reproducibility (a fresh clone may resolve a different SHA-prefix-version).

### G9: `installed_plugins.json:enabledPlugins` carries 1 entry (context-mode), divergent from `settings.json:enabledPlugins` (55 entries)
W370 Stream C F1 correction confirmed `settings.json:enabledPlugins` is authoritative; `installed_plugins.json:enabledPlugins` is "installer-state". This split is intentional but a source of confusion — only 1 audit pass per 5+ documented missed it.

### G10 (NOT-INSTALLED, not a current defect): W432 install plan candidates
Per task brief — confirm absence of MemPalace + agentmemory. Verified NOT in `.mcp.json` (search returned 0 matches). No cache dirs for these candidates. State: clean / not yet installed.

---

## Section 5 — Ranked root-cause defect list

Ordered by blast-radius × verifiability:

1. **DEFECT-1 (P0, CR-6 violation)**: CLAUDE.md L37 T5 Langfuse status is **stale-fact**. Postgres is healthy, all 9 containers Up, `/api/public/health` → 200. Fix: edit CLAUDE.md L37 T5 row to `LIVE v3.174.1 — 9/9 containers healthy + HTTP 200 health check + OTEL trace endpoint accepting traces`. Cite W432 Stream B re-probe.
2. **DEFECT-2 (P0, W270 SHA-drift)**: 13 `claude-plugins-official` plugin records in `installed_plugins.json` have `installPath` pointing to SHA-dir `3d355c0d8eec` that does NOT exist; actual cache is `a78debbb97b0`. Fix: regenerate `installed_plugins.json` via `/plugin install --refresh` for each, OR write a one-shot node script that rewrites `installPath` + `version` + `gitCommitSha` fields to match on-disk reality. Until fixed, `/plugin update` is unreliable.
3. **DEFECT-3 (P0, CR-9 pin discipline)**: openhands-dispatch MCP uses floor-pin `fastmcp>=3.2` — change to exact pin `fastmcp==3.3.1` matching gpt-researcher's pin precedent.
4. **DEFECT-4 (P0, env)**: `OPENHANDS_DISPATCH_TOKEN` + `OPENHANDS_SUBSCRIPTION_MODEL` UNSET. Either populate via `CLAUDE.local.md` ENV block, OR set `disabled:true` on the openhands-dispatch entry until credentials available.
5. **DEFECT-5 (P1, CR-6 drift)**: 3 stale version-strings in `.mcp.json _comments` for chrome-devtools/serena/codegraph. Fix: rewrite each comment block to match current `command/args` line.
6. **DEFECT-6 (P1, pin-drift)**: basic-memory pin discrepancy `.mcp.json:0.21.4` vs `.local/bin shim:0.21.1`. Either rebuild shim `uv tool install basic-memory==0.21.4` OR rollback `.mcp.json` to `==0.21.1` matching W308 comment.
7. **DEFECT-7 (P2, cleanup)**: remove zombie `.hindsight/profiles/claude-code.env` to match T1 retirement state.
8. **DEFECT-8 (P2, doc)**: rewrite `.mcp.json _comments.context_mode_removed` to disambiguate "MCP entry removed" vs "plugin still active via enablement".
9. **DEFECT-9 (P3, hygiene)**: confirm `hindsight-memory@hindsight` orphan-installed record is intentional retention vs cruft — if intentional retention add explicit comment; if cruft, remove via `/plugin uninstall hindsight-memory@hindsight`.
10. **DEFECT-10 (P3, doc)**: `_comments.w411_gpt_researcher` documents Z:-portability liability already — no new fix; reaffirm acceptance.

---

## Section 6 — Recommended fix sequence

### Phase A (immediate, single-session)
1. Edit CLAUDE.md L37 T5 row → mark Langfuse LIVE w/ re-probe evidence (DEFECT-1). [≤5 min, no risk.]
2. Edit `.mcp.json _comments` for chrome-devtools/serena/codegraph → align version-strings with current args (DEFECT-5). [≤5 min.]
3. Edit `.mcp.json` line 178 → `fastmcp>=3.2` → `fastmcp==3.3.1` (DEFECT-3); add `disabled:true` to openhands-dispatch until env vars populated (DEFECT-4 mitigation). [≤5 min.]
4. Edit `.mcp.json` line 93 → align basic-memory pin to `==0.21.1` matching W308 comment + actual local shim (DEFECT-6 option A), OR rebuild local shim to `0.21.4` (option B). [≤2 min for option A.]

### Phase B (worktree-isolated, 1 cycle)
5. Write `tools/rewrite-installed-plugins-paths.mjs` — for each plugin record where `installPath` directory doesn't exist, probe the parent directory for the actual SHA-dir, rewrite the record (`installPath` + `version` + `gitCommitSha` IF available from `.plugin-meta.json`). Commit + push (DEFECT-2). [≈30 min including codex r1 review.]
6. Run `node tools/rewrite-installed-plugins-paths.mjs --apply` to land the corrected paths.
7. Verify by re-running the SHA-drift cross-check node script and confirming 0 MISSING_CACHE entries.

### Phase C (operator-side, async)
8. Populate `OPENHANDS_DISPATCH_TOKEN` + `OPENHANDS_SUBSCRIPTION_MODEL` in `CLAUDE.local.md` ENV block, OR retire openhands-dispatch MCP entry if not currently used (operator decision) (DEFECT-4 final).
9. Decide on `hindsight-memory@hindsight` orphan retention policy (DEFECT-9).
10. Optional: clean zombie `.hindsight/profiles/claude-code.env` (DEFECT-7).

### Phase D (W432 install plan — out-of-scope per brief)
- MemPalace + agentmemory NOT installed. Per brief, do NOT install in this audit. Note for future wave: both T6 candidates would need to be considered against existing basic-memory canonical-primary, with explicit niche-distinctness justification per W281 P2(e) discipline applied to basic-memory itself.

---

## Section 7 — Confidence + evidence index

| claim | evidence | confidence |
|---|---|---|
| Langfuse LIVE | `docker ps` + `Invoke-WebRequest /api/public/health → HTTP 200 {status:"OK",version:"3.174.1"}` | HIGH |
| Cognee LIVE | `nssm status CogneeMCP → SERVICE_RUNNING` + `:8000 LISTEN pid=9748 python` + initialize handshake returns serverInfo Cognee 1.26.0 | HIGH |
| 13 SHA-drifted plugins | direct filesystem probe `ls .claude/plugins/cache/claude-plugins-official/<plugin>/` returns `a78debbb97b0` not `3d355c0d8eec` (recorded in installed_plugins.json) | HIGH |
| openhands-dispatch env-missing | `mcp-env-precheck.mjs` stdout: `WARN: 2 env var(s) referenced in .mcp.json are unset: OPENHANDS_DISPATCH_TOKEN, OPENHANDS_SUBSCRIPTION_MODEL` | HIGH |
| basic-memory pin-drift | `.local/bin/basic-memory.exe --version → 0.21.1` vs `.mcp.json` text `basic-memory==0.21.4` | HIGH |
| T1 hindsight retired | `nssm status Hindsight → service not exists` + `:9077 NO_LISTENER` + 0 `hindsight` processes | HIGH |
| T4 graphiti retired | `.mcp.json` has 0 `graphiti` keys + `:16379 NO_LISTENER` (FalkorDB stopped) | HIGH |
| 47 enabled / 8 disabled | direct count of `settings.json:enabledPlugins` boolean values | HIGH |

---

**End of W432 Stream B foundation audit.**
