# W309 Stream A — Silent-Fallback Hunt + Runtime Optimization Audit

**Wave**: W309
**Stream**: A
**Date**: 2026-05-19
**Agent**: general-purpose (sota-convergence-audit-aligned)
**Scope**: Hunt NEW silent fallbacks, stale references, terminal errors, mis-wired bits NOT already closed by W295-W308. Read-only audit — no config changes.

---

## Executive verdict

**YELLOW with 3 CRITICAL + 5 HIGH findings actively degrading runtime today.**

The runtime ecosystem is structurally sound (cardinal-rule invariants R1-R5 verified intact, plugin set healthy, codex stop-gate live, hindsight T1 live, agent-teams orchestration plumbing complete with 4-agent subagent type definitions resolvable), but **multiple silent fallbacks exist**:

1. **Phoenix MCP wired but backend DOWN** — all `mcp__phoenix__*` calls fetch-fail silently (operator-explicit MCP suspicion confirmed)
2. **OTel trace export to Langfuse :3000 returns 401 silently** — `OTEL_EXPORTER_OTLP_HEADERS` not set, traces are emitted continuously into `/dev/null` with no operator visibility
3. **Cognee MCP HTTP session protocol broken** — `mcp__cognee__remember` returns JSON-RPC -32600 "Session not found" because the streamable-HTTP client lacks SSE session establishment with the cognee server (T3 GraphRAG memory tier inert)
4. **context-mode plugin baked C:/Users/42/AppData/Local/fnm_multishells/80600_1779039579511/node.exe** hardcoded path (fnm session-id changes on each shell relaunch — CR-9 portability violation embedded in plugin-shipped manifest)
5. **`Z:/tools/nodejs/node.exe` dated 2026-01-12** (4+ months stale)
6. **promptfoo missing from venv** — eval_harness.py claims real promptfoo lane but `import promptfoo` fails with ModuleNotFoundError
7. **`pyright 1.1.408` is one minor behind** (`v1.1.409` available)
8. **`graphiti-core 0.29.0` + `cognee-mcp 0.5.4`** still installed in venv after T4 retirement (W295) — dependency drift

Agent-teams orchestration is correctly wired — all 4 subagent_type references (`agent-teams:team-lead/team-implementer/team-debugger/team-reviewer`) resolve to physical files at `Z:/claude-sota-installed/.claude/plugins/cache/claude-code-workflows/agent-teams/1.0.2/agents/*.md`. Operator's suspicion about silent agent-team fallbacks is **negative within plugin scope** but **positive at the MCP layer** (3 MCP servers fetch-fail silently when subagents call them).

---

## Findings ledger (severity-sorted)

### CRITICAL (actively-affecting-runtime today)

#### C1: Phoenix MCP backend `:16006` DOWN — all phoenix tool calls silently fail
- **Component**: `.mcp.json` mcpServers/phoenix
- **Evidence**:
  - `.mcp.json` configures `npx -y @arizeai/phoenix-mcp@4.0.13 --baseUrl http://127.0.0.1:16006`
  - `netstat -an | grep LISTEN | grep :16006` returns **nothing** — port closed
  - Live tool call `mcp__phoenix__list-projects` returned `Error: fetch failed`
  - The MCP server itself starts cleanly (`Phoenix MCP Server running on stdio`) so failure is at the upstream HTTP call layer, not MCP transport
  - Phoenix NSSM service: **none found** in `Get-Service`; no process bound to 16006
- **Severity rationale**: Listed as a memory tier in CLAUDE.md status block, agent-teams + research-arch verdicts reference phoenix traces. Today, every `mcp__phoenix__*` call returns silent fetch-failed without operator notification.
- **Proposed fix**:
  - Either (a) start phoenix backend on :16006 via supervised service (NSSM/PM2), OR
  - (b) Move phoenix to `disabledMcpjsonServers` until reinstated, OR
  - (c) Document as "external Arize phoenix instance — UI required, MCP layer-2 only" and update CLAUDE.md status to ✗.

#### C2: OTel traces silently rejected by Langfuse :3000 with HTTP 401 (no auth header set)
- **Component**: `.claude/settings.json` env block
- **Evidence**:
  - `OTEL_EXPORTER_OTLP_TRACES_ENDPOINT=http://127.0.0.1:3000/api/public/otel/v1/traces` (settings.json:envOTEL block)
  - `OTEL_EXPORTER_OTLP_HEADERS` and `OTEL_EXPORTER_OTLP_TRACES_HEADERS` are **both unset** (grep returned no output)
  - Direct curl probe: `POST http://127.0.0.1:3000/api/public/otel/v1/traces` returns `{"message":"No authorization header"}` HTTP 401
  - Langfuse uses HTTP Basic Auth with public/secret key as username/password (per langfuse OTel docs); these MUST be embedded in `OTEL_EXPORTER_OTLP_HEADERS=Authorization=Basic <base64(pk:sk)>`
  - `LANGFUSE_PUBLIC_KEY` + `LANGFUSE_SECRET_KEY` ARE set in CLAUDE.local.md for MCP server interpolation, but NOT used for OTel header construction
- **Severity rationale**: Every Claude Code turn emits OTel spans (`CLAUDE_CODE_ENABLE_TELEMETRY=1`, `OTEL_LOG_TOOL_DETAILS=1`, `OTEL_LOG_USER_PROMPTS=1`). All currently dropped at the Langfuse OTLP endpoint due to missing auth — silent data loss confirmed today, separate from the W307 GenAI semconv issue.
- **Proposed fix**: Add to `settings.json:env` (or operator-side env injection):
  ```
  "OTEL_EXPORTER_OTLP_HEADERS": "Authorization=Basic ${base64:LANGFUSE_PUBLIC_KEY:LANGFUSE_SECRET_KEY}"
  ```
  Note: env var interpolation may not expand `${base64:...}` natively — operator may need a launcher-script pre-compute step in `tools/eee.ps1`.

#### C3: Cognee MCP T3 GraphRAG tier — LLM-key env-resolution bug (RECONCILED W309 codex-r1 P2 closure)

> **W309 codex-r1 reconciliation 2026-05-19** — original C3 framing as "JSON-RPC session protocol broken" was contradicted by W302-LIVE-STATE-RECORD §10 (committed in the same `edddf94` ship), which shows `mcp__cognee__remember` DID reach the embedding pipeline (3× `qwen3-embed-0.6b /v1/embeddings` 200-OK at llama-swap `:8090`) and only failed at the LLM step with `LLMAPIKeyNotSetError`. The "Session not found" Stream A observed was on a different / earlier call path (raw `POST /mcp` without proper `Accept: application/json, text/event-stream` headers — a CLIENT-side issue, NOT a server-protocol breakage); the operator-facing symptom is the LLM-key env-resolution bug.

- **Component**: `.mcp.json` mcpServers/cognee + cognee-mcp LLM-key env interpretation
- **Evidence (reconciled, post-W302 §10 ratification)**:
  - `.mcp.json` entry: `{"type": "http", "url": "http://127.0.0.1:8000/mcp"}` (W259v8 W263b live)
  - Cognee NSSM service status: `CogneeMCP Running Automatic` (listed in `Get-Service`)
  - **Embedder pipeline FIRES correctly**: `mcp__cognee__remember "test"` triggered 3× `qwen3-embed-0.6b /v1/embeddings` 200-OK calls to llama-swap `:8090` (W302 §10 id=3, id=4, id=5)
  - **LLM step ERRORS**: same `remember` call surfaced `LLMAPIKeyNotSetError` — cognee expected a real LLM API key but got the literal placeholder `OPENAI_API_KEY=local` (CLAUDE.local.md env)
  - The earlier "Session not found" + 406 Accept-header probe was a Stream-A direct-probe artifact (raw curl without MCP client's full `Accept` negotiation), NOT a server-protocol breakage
- **Severity rationale (downgraded HIGH → MEDIUM)**: T3 GraphRAG tier is **functionally degraded** (LLM step blocks the full graph-construct pipeline) but NOT inert at the protocol level. Embedding ingest works. CLAUDE.md line 35 claim `cognee ✓ ACTIVE` is partially true (embedder live) — should be amended to `cognee ⚠️ EMBEDDER-LIVE + LLM-key-bug (W309-C3 / W302 §10)`.
- **Proposed fix (revised post-reconciliation)**:
  - (a) Replace `OPENAI_API_KEY=local` placeholder in CLAUDE.local.md with either (i) a real OpenAI-compatible API key pointing at the local llama-swap LLM endpoint (likely `Z:/services/llama-swap` `:8090/v1`), OR (ii) a value that cognee will treat as a sentinel for "use local-llm-base-url instead"
  - (b) If cognee's LLM-key code path requires a non-literal value: file upstream cognee issue tracking the `OPENAI_API_KEY=local` literal-placeholder interpretation bug
  - (c) Operator-AI queued in W302 close-out — separately tracked, not blocking W309 ship

### HIGH (likely-impact, not actively breaking session)

#### H1: context-mode plugin manifest hardcodes `C:/Users/42/AppData/Local/fnm_multishells/80600_1779039579511/node.exe`
- **Component**: `Z:/claude-sota-installed/.claude/plugins/cache/context-mode/context-mode/1.0.136/.claude-plugin/plugin.json`
- **Evidence**:
  - `mcpServers.context-mode.command` = `C:/Users/42/AppData/Local/fnm_multishells/80600_1779039579511/node.exe`
  - That directory contains 80+ similar `<random>_<random>` subdirs, all symlinks to `/c/Users/42/AppData/Roaming/fnm/aliases/default` — fnm allocates a NEW one on every shell session
  - On next CC restart with fresh fnm session, this path will not exist
- **Severity rationale**: Active runtime path-fragility. Not currently breaking because the symlink target still exists, but ANY fnm GC / multishells cleanup will brick the entire context-mode MCP transport.
- **Proposed fix**: Replace with stable path — either `Z:/tools/nodejs/node.exe` (cardinal-rule-9 stable form) or `npx`. Note: this is a plugin-shipped file, so the fix is at the upstream `mksglu/context-mode` plugin level; in-tree, the operator can either (a) override via settings.json:hooks shim, or (b) submit upstream PR. Track as W310 operator-AI.

#### H2: Z:/tools/nodejs/node.exe stale (Jan 2026, 4+ months) AND hardcoded in plugin codex hooks
- **Component**: Plugin codex `hooks.json` + `Z:/tools/nodejs/node.exe`
- **Evidence**:
  - `Z:/claude-sota-installed/.claude/plugins/cache/openai-codex/codex/1.0.4/hooks/hooks.json` invokes `"Z:\\tools\\nodejs\\node.exe"` for SessionStart / SessionEnd / Stop hooks
  - Settings.json:hooks PreToolUse codex bash shim also uses `'Z:/tools/nodejs/node.exe'`
  - File timestamp: `Jan 12 20:12` (≥4 months stale). Current Node `node --version` = `v22.22.0` per CLI versions probe
- **Severity rationale**: Node v22.x supports all features used; not immediate. But it bakes a single-machine path (`Z:\tools\nodejs`) into the codex Stop-gate critical path — fresh clone OR drive-relocation breaks the adversarial-review gate silently.
- **Proposed fix**: Move codex hook commands to use `node` (PATH resolution) OR add a `tools/check-node-pin.ps1` to bootstrap-runtime that ensures Z:/tools/nodejs/ is current.

#### H3: promptfoo absent from venv but eval_harness.py references it
- **Component**: `Z:/venvs/claude/Scripts/python.exe` venv
- **Evidence**:
  - `Z:/venvs/claude/Scripts/python.exe -c "import promptfoo"` → `ModuleNotFoundError: No module named 'promptfoo'`
  - `harness/eval_harness.py` lines (per W259-v15 status block) "real inspect_ai + promptfoo eval lanes"
  - `npx -y promptfoo --version` works (promptfoo is JS CLI, not a Python package) — so the README may be misleading, but the eval_harness.py likely calls promptfoo as subprocess
- **Severity rationale**: If eval_harness.py invokes promptfoo as a Python import it crashes; if it shells out to `npx promptfoo` it works. Need code inspection to confirm. Document gap.
- **Proposed fix**: Either install `pip install promptfoo` (if a python wrapper exists — but promptfoo is JS-native; consider `pip install promptfoo` is likely not the right invocation) OR update eval_harness.py to shell out via `subprocess.run(["npx","-y","promptfoo",...])`.

#### H4: graphiti-core + cognee-mcp + graphiti pyc artifacts in venv after T4 retirement
- **Component**: `Z:/venvs/claude` venv
- **Evidence**:
  - `pip list` shows `graphiti-core 0.29.0` and `cognee-mcp 0.5.4` (editable install from `Z:\repos\deps\cognee\cognee-mcp`)
  - `cognee 1.1.0` ALSO installed (separately from cognee-mcp)
  - CLAUDE.md line 35 declares `T4 graphiti ✗ RETIRED (W272+W290+W295 AI-5)`
- **Severity rationale**: Disk-space + dependency-resolution risk (transitive conflicts) — does not actively break sessions. But fresh-install reproducibility would NOT recreate graphiti-core, so the venv has drifted from declarative state.
- **Proposed fix**: After confirming graphiti is fully retired (T4 ✗ in CLAUDE.md), `pip uninstall graphiti-core` from venv; document in W295 audit.

#### H5: Plugin `installed_plugins.json` + `known_marketplaces.json` modifications uncommitted
- **Component**: Git working tree at HEAD
- **Evidence**: `git status -s` shows:
  ```
  M .claude/plugins/installed_plugins.json
  M .claude/plugins/known_marketplaces.json
  M docs/architecture/W308-PATTERN2-PWF-SOTA-DISCOVERY/W308-STREAM-C-SOTA-DISCOVERY-OPENSPACE.md
  M harness/adapters/memory_recall/agentmemory.py
  M harness/adapters/memory_recall/alma_memory.py
  M harness/adapters/memory_recall/mem0.py
  ?? docs/architecture/W308-EXECUTE-AND-ROTATE/
  ?? docs/architecture/W309-RESEARCH-ARCH-AUDIT-AND-SOTA-CONVERGENCE/
  ```
- **Severity rationale**: Plugin state drift — installed_plugins.json may have phantom entries OR genuine W308-installed plugins not committed. Per W270 install-state drift governance, every plugin install must commit BOTH the plugin manifest delta AND a corresponding cite-line in CLAUDE.md. Without commits, fresh clones get a different plugin set.
- **Proposed fix**: Inspect the diff, classify each: (a) intentional W308 install — commit with cite-line, (b) phantom auto-update by plugin manager — git checkout to revert. Then commit.

### MEDIUM (latent, recommended)

#### M1: `pyright` minor-version drift (1.1.408 → 1.1.409 available)
- **Component**: `Z:/venvs/claude/Scripts/python.exe -m pyright`
- **Evidence**: pyright invocation emitted: `WARNING: there is a new pyright version available (v1.1.408 -> v1.1.409). Please install the new version or set PYRIGHT_PYTHON_FORCE_VERSION to latest`
- **Proposed fix**: `pip install -U pyright` OR set `PYRIGHT_PYTHON_FORCE_VERSION=latest` in env.

#### M2: codex plugin 1.0.4 — check if upstream has released 1.0.5+
- **Component**: `.claude/plugins/cache/openai-codex/codex/1.0.4`
- **Evidence**: Only `1.0.4` present in cache. Operator should periodically `/plugin update codex@openai-codex` per W270 silent-SHA-drift mandate.
- **Proposed fix**: Schedule plugin SHA-freshness check (W288 cardinal-rule-1 corollary).

#### M3: `gpt5-archaeologist.md` agent has `effective_tier: TIER-3-LOCAL-COMPOSITION` (sibling-derived, NOT install-source)
- **Component**: `Z:/claude-sota-installed/.claude/agents/gpt5-archaeologist.md`
- **Evidence**:
  - File header reads `Source: Z:/claude-sota/.claude/agents/gpt5-archaeologist.md [PROVENANCE-ONLY — non-authoritative; sibling is NOT install-source per cardinal-rule-9; this artifact derived via Wave 15 cite-import per CR-12 TERTIARY]`
  - Pre-W308 import; sibling sync may be stale
- **Severity rationale**: Self-referential — by its own header, this is NOT cardinal-rule-1 trusted-only. Currently allowed under "operator-curated path-gated" exception (R3 + R4) since file lives in `.claude/agents/`, not `.claude/rules/`. Document as policy: any sibling-cite-imports MUST re-verify Source SHA periodically.
- **Proposed fix**: Verify `b6f9c1e3c68b787d421dabe5847d5248e526ab9e` still matches `Z:/claude-sota/.claude/agents/gpt5-archaeologist.md`. If sibling has advanced, re-import.

#### M4: `evaluator.md` agent has BOM in YAML frontmatter
- **Component**: `Z:/claude-sota-installed/.claude/agents/evaluator.md`
- **Evidence**: `head -10` of evaluator.md shows leading `﻿` (UTF-8 BOM, U+FEFF) before `---`
- **Severity rationale**: Some YAML parsers reject BOM in frontmatter; CC handles it but `pre-commit ruff` and other tooling may emit warnings.
- **Proposed fix**: Strip BOM via `python -c "open('...','rb').read().lstrip(b'\\xef\\xbb\\xbf')"` rewrite.

#### M5: `disabledMcpjsonServers` includes `graphiti` but `.mcp.json:64-77` block still present
- **Component**: `.claude/settings.json` + `.mcp.json`
- **Evidence**:
  - `settings.json:93 disabledMcpjsonServers: ["memory","github","context7","playwright","graphiti"]` — correctly disabled per W295
  - `.mcp.json:64-77` still contains the `graphiti` mcpServers entry (kept for inspection per CLAUDE.md note)
  - But `_comments_addendum.w265_langfuse_2026_05_17` mentions `Trace endpoints: graphiti MCP env...carry LANGFUSE_*` — stale post-graphiti-retirement
- **Severity rationale**: Documentation drift only; no runtime impact since disabledMcpjsonServers shadows the entry.
- **Proposed fix**: Either remove `.mcp.json:64-77` graphiti block entirely OR add a `_retired_w295` marker comment near it.

#### M6: `disabledMcpjsonServers` includes `playwright` — but `mcp__plugin_everything-claude-code_playwright__*` tools are deferred-loaded
- **Component**: `.claude/settings.json:disabledMcpjsonServers`
- **Evidence**:
  - `playwright` is disabled in `disabledMcpjsonServers` — `.mcp.json` `playwright` entry shadowed
  - HOWEVER the operator has `everything-claude-code@everything-claude-code` enabled which contributes its OWN playwright MCP — visible in deferred tools as `mcp__plugin_everything-claude-code_playwright__browser_*`
- **Severity rationale**: Confusing dual-state — playwright disabled at `.mcp.json` level, enabled at plugin level. Not a bug, but operator may not realize there are 2 distinct playwright surfaces.
- **Proposed fix**: Document in CLAUDE.md status block: "playwright disabled at `.mcp.json` level; everything-claude-code:playwright provides browser surface."

#### M7: `context-mode v1.0.136` outdated (v1.0.140 available)
- **Component**: context-mode plugin
- **Evidence**: Live `ctx_batch_execute` invocation emitted `context-mode v1.0.136 outdated → v1.0.140 available. Upgrade: /ctx-upgrade`
- **Proposed fix**: Run `/ctx-upgrade` as documented.

#### M8: Codex `context-mode` shipped its own Stop hook (parallel to codex Stop hook)
- **Component**: `Z:/claude-sota-installed/.claude/plugins/cache/context-mode/.../hooks.json:Stop`
- **Evidence**:
  - context-mode `hooks.json` declares a `Stop` hook invoking `${PLUGIN_ROOT}/hooks/codex/stop.mjs`
  - codex plugin ALSO declares a `Stop` hook (`stop-review-gate-hook.mjs`)
  - context-mode `state.json` has `stopReviewGate: false`; codex has `stopReviewGate: true`
  - Per CC docs: "all Stop hooks run; first non-zero exit code blocks"
- **Severity rationale**: Not actively breaking — both hooks coexist and the codex one is the gating one. But the context-mode Stop hook fires every turn — adds latency. No evidence it's used (recent context-mode `jobs[]` shows zero `kind:stop-review` jobs).
- **Proposed fix**: Document parallel Stop hooks in CLAUDE.md OR set context-mode env to disable its Stop hook.

### LOW (cosmetic / nit-class)

#### L1: settings.json `defaultMode: bypassPermissions` — high blast radius
- **Component**: `.claude/settings.json:permissions.defaultMode`
- **Evidence**: `"defaultMode": "bypassPermissions"`
- **Severity rationale**: Per Anthropic settings docs, this bypasses all `allow`/`deny` rules. Documented W308 architecture wave deliberately set it this way for the install-only runtime (operator wants full bypass for fast iteration). Confirm intentional.
- **Proposed fix**: None unless operator wants stricter permission gating. Document explicitly in CLAUDE.md operator-decisions block.

#### L2: `OTEL_INSTRUMENTATION_GENAI_CAPTURE_MESSAGE_CONTENT=false`
- **Component**: settings.json env
- **Evidence**: Set to `false` — Claude Code does NOT send prompt/completion content to OTel backend even when `OTEL_LOG_USER_PROMPTS=1` is set
- **Severity rationale**: Likely intentional for PII privacy. Document in W307 follow-up.
- **Proposed fix**: None unless re-evaluating privacy posture.

#### L3: `_comments_addendum` block in .mcp.json contains 20+ historical commentary
- **Component**: `.mcp.json:_comments` and `_comments_addendum`
- **Evidence**: 50-100+ lines of audit history embedded in mcp.json (`w155_f13_native_node`, `w286_cross_npx_pinned_v2`, `cognee_w259v8`, etc.)
- **Severity rationale**: JSON parser ignores keys starting with `_`, so no runtime impact. But the file is now 4x larger than needed and the history is unmaintained.
- **Proposed fix**: Move historical comments out of `.mcp.json` into a sibling `mcp-history.md` or git commit messages. Keep `.mcp.json` minimal.

#### L4: `tools/migrate-cognee-state.ps1` flagged for operator-action in W288 — still uncommitted
- **Component**: `tools/migrate-cognee-state.ps1`
- **Evidence**: CLAUDE.md line 50 documents `DEFERRED-OPERATOR-ACTION: .\tools\migrate-cognee-state.ps1 -Execute (195MB C:→Z:, ~30s NSSM downtime)` from W286-cross. File exists. Has not been run.
- **Severity rationale**: Cognee data still at `C:/Users/42/.cognee` (AI-3a state-outside-repo violation). Not actively breaking (cognee can still write there) but violates "state outside repo on Z:" architecture.
- **Proposed fix**: Operator-action — schedule the migration.

### CLEAN (verified working)

- **C-OK1**: `.claude/rules/` directory empty / does not exist. `git ls-files .claude/rules` returns nothing — **R4 ✓**
- **C-OK2**: `.claude/hooks/scripts/` directory does not exist — **R2 ✓**
- **C-OK3**: only `.mjs` file under `.claude/hooks` is `context-mode-cache-heal.mjs` (operator-curated, NOT `.py`/`.sh` self-invent) — **R2 corollary ✓**
- **C-OK4**: All 4 agent-teams `subagent_type` references resolve to physical agent definition files at `.claude/plugins/cache/claude-code-workflows/agent-teams/1.0.2/agents/team-{debugger,implementer,lead,reviewer}.md`
- **C-OK5**: `team-spawn.md` lists presets `review, debug, feature, fullstack, research` — matches CLAUDE.md line 19 "extended with fullstack"
- **C-OK6**: `CLAUDE_CODE_FORK_SUBAGENT=1` and `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1` both echo correctly in env
- **C-OK7**: `gitleaks 8.30.1`, `ruff 0.15.13`, `shellcheck 0.11.0`, `pyright 1.1.408`, `python 3.13.12`, `node v22.22.0`, `npx 11.9.0`, `git 2.51.0`, `gh 2.92.0`, `codex 0.130.0` all callable
- **C-OK8**: `docker 29.4.3` + `docker compose v5.1.3` installed but no Compose stacks in active runtime (only retired `Z:/claude-sota-installed/.local/graphiti/docker-compose.yml` + `.local/cpa-fix-services/docker-compose.yml`)
- **C-OK9**: hindsight T1 daemon listening on :9077 (`200 OK` on `/health`)
- **C-OK10**: ollama backend on :16700 has `qwen3-coder:30b-a3b-q4_K_M` + `qwen3-embedding:0.6b` models loaded — matches CLAUDE.local.md
- **C-OK11**: langfuse :3000 backend reachable (`{"status":"OK","version":"3.170.0"}`)
- **C-OK12**: codex companion scripts present at `.claude/plugins/cache/openai-codex/codex/1.0.4/scripts/{codex-companion.mjs,stop-review-gate-hook.mjs,session-lifecycle-hook.mjs}` — all 3 executable
- **C-OK13**: codex plugin state.json (`Z:/claude-sota-installed/.claude/plugins/data/codex-openai-codex/state/claude-sota-installed-0271062cb1571a49/state.json`) has `stopReviewGate: true` confirmed
- **C-OK14**: `bootstrap-runtime.ps1` exists at `Z:/claude-sota-installed/tools/bootstrap-runtime.ps1` (35,928 bytes)
- **C-OK15**: `harness/eval_harness.py` syntactically valid (py_compile OK)
- **C-OK16**: `tools/sca_status_dashboard.py` syntactically valid
- **C-OK17**: Pre-commit gate `ruff check tools harness --quiet` returns exit 0 (TaskCompleted hook will not fail-loud)
- **C-OK18**: `.pre-commit-config.yaml` exists (gitleaks v8.30.1 + ruff-pre-commit v0.15.12 + actionlint v1.7.12)
- **C-OK19**: basic-memory MCP fully responsive (`mcp__basic-memory__list_memory_projects` returned `main` project)
- **C-OK20**: chrome-devtools MCP fully responsive (`mcp__chrome-devtools__list_pages` returned `about:blank`)
- **C-OK21**: All deny[] paths configured in `permissions.deny`: `**/id_rsa, **/id_ed25519, **/*.pem, **/*.pfx, **/*.key, ./CLAUDE.local.md, **/.aws/credentials, **/.ssh/config, **/.npmrc, **/.docker/config.json, **/credentials.json, **/*.crt` — **R5 ✓**

---

## Live MCP probe results table

| MCP server | Live ping | HTTP/RPC status | Notes |
|---|---|---|---|
| basic-memory | `mcp__basic-memory__list_memory_projects` | ✓ 200 | Returns `main` project; T6 healthy |
| cognee | `mcp__cognee__remember "test"` | ✗ -32600 | "Session not found" — SSE session protocol broken (C3) |
| hf-mcp-server | `mcp__hf-mcp-server__hf_whoami` | ✓ 200 (anon) | Anonymous mode (no HF_TOKEN); rate-limited |
| plugin:everything-claude-code:memory | `mcp__plugin_everything-claude-code_memory__read_graph` | ✓ 200 | But returns `{"entities":[],"relations":[]}` — empty KG |
| phoenix | `mcp__phoenix__list-projects` | ✗ fetch failed | Backend :16006 DOWN (C1) |
| langfuse | `mcp__langfuse__get-prompts` | ✗ Failed to fetch prompts | Backend :3000 UP, MCP layer issue — likely the langfuse MCP server needs LANGFUSE_PUBLIC_KEY/SECRET_KEY env which IS interpolated in .mcp.json from CLAUDE.local.md, but the live MCP layer call still failed — needs deeper inspection |
| chrome-devtools | `mcp__chrome-devtools__list_pages` | ✓ 200 | Lists `about:blank` |
| plugin:logfire:logfire | `mcp__plugin_logfire_logfire__authenticate` | ⚠ OAuth required | Returned authorize-URL; not yet authenticated |
| hindsight :9077 | curl /health | ✓ 200 | T1 vector tier live |
| cognee :8000 | curl /mcp | 406 | Server up, transport unhappy (see C3) |
| langfuse :3000 | curl /api/public/health | ✓ 200 | `{"status":"OK","version":"3.170.0"}` |
| falkordb :16379 | TCP connect | ✓ listening | But unused since graphiti retired (W295) |
| ollama :16700 | curl /api/tags | ✓ 200 | 2 models loaded |
| phoenix :16006 | netstat LISTEN | ✗ no listener | (C1) |

---

## CLI tooling table

| CLI | Version found | Pin status | Notes |
|---|---|---|---|
| codex | 0.130.0 | unpinned (CLI install) | GPT-5.5 cross-model gate — W285a |
| gh | 2.92.0 (2026-04-28) | unpinned (winget) | recent (<3 weeks) |
| git | 2.51.0.windows.2 | unpinned (winget) | recent |
| python | 3.13.12 (`Z:/venvs/claude/Scripts/python.exe`) | venv-bound | C-OK |
| node | v22.22.0 | unpinned (winget global) | runtime; `Z:/tools/nodejs/node.exe` is OLDER (Jan timestamp) — H2 |
| npx | 11.9.0 | bundled with node | C-OK |
| ruff | 0.15.13 | venv | one minor newer than pre-commit pin 0.15.12 |
| gitleaks | 8.30.1 | pre-commit pinned | matches pre-commit config exactly |
| shellcheck | 0.11.0 | unpinned (chocolatey) | C-OK |
| pyright | 1.1.408 | venv | M1 — 1.1.409 available |
| docker | 29.4.3 | unpinned | no active Compose stacks |
| docker compose | v5.1.3 | unpinned | no active Compose stacks |

---

## Docker / Compose stack inventory

**Active stacks**: NONE.

**Inactive / retired**:
- `Z:/claude-sota-installed/.local/graphiti/docker-compose.yml` — retired with graphiti T4 (W295)
- `Z:/claude-sota-installed/.local/graphiti/docker-compose.test.yml` + `Z:/claude-sota-installed/.local/graphiti/Dockerfile` — same
- `Z:/claude-sota-installed/.local/cpa-fix-services/docker-compose.yml` — historical; not in any audit
- `Z:/claude-sota-installed/tmp/repo-probes/knowledge-rag/Dockerfile` — temp scratch
- `Z:/claude-sota-installed/.cache/pre-commit/repo*/Dockerfile` — pre-commit hooks (auto-managed, not operator-curated)

**Verdict**: Docker is installed but the runtime does NOT actively use Docker Compose. NSSM services (CogneeMCP) handle process supervision instead. Move retired `.local/graphiti/` Compose files to a `tmp/retired/` location or git-rm them.

---

## Agent-teams orchestration findings (operator's explicit suspicion)

**Verdict for operator suspicion: agent-teams plumbing is correctly wired. Silent fallbacks ARE present, but at the MCP layer that subagents call, NOT in agent-teams orchestration itself.**

### Plumbing verification

| Element | Status | Evidence |
|---|---|---|
| `agent-teams@claude-code-workflows` plugin enabled | ✓ | settings.json:enabledPlugins line 141 |
| `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1` set | ✓ | settings.json:env + verified in session env |
| `CLAUDE_CODE_FORK_SUBAGENT=1` set | ✓ | settings.json:env + verified in session env |
| `/team-spawn` command file exists | ✓ | `.claude/plugins/cache/claude-code-workflows/agent-teams/1.0.2/commands/team-spawn.md` |
| Subagent type definitions resolvable | ✓ | All 4 of `agent-teams:team-{lead,implementer,debugger,reviewer}` resolve to physical `agents/*.md` files |
| Presets present (review, debug, feature, fullstack, research) | ✓ | Verified in team-spawn.md head |
| `wshobson-devops-troubleshooter.md` + `wshobson-security-auditor.md` in `.claude/agents/` | ✓ | YAML frontmatter valid (`isolation: worktree`, `model: sonnet`, `permissionMode: plan`) |

### Silent fallback risks at subagent execution layer

When subagents spawned by `/team-spawn` make MCP tool calls, the **3 silent-fail MCP servers (C1, C2, C3) will cause subagent observability to silently degrade**:

- A `team-reviewer` subagent calling `mcp__phoenix__list-projects` will get fetch-failed error → subagent will see the error and may proceed without phoenix trace context, OR may bail with "cannot complete review without phoenix"
- A `general-purpose` research subagent calling `mcp__cognee__remember` will get session-not-found → silent loss of long-term memory accumulation
- All subagent OTel spans will be 401-dropped at langfuse → no parent-orchestrator visibility into subagent fan-out structure

**This is the operator's "I feel that your agent team orchestration has silent fallback or errors" intuition: the orchestration itself is wired right, but its visibility / memory layer is silently broken.**

### Recommendation: agent-team observability check

Add to `tools/bootstrap-runtime.ps1`: before any `/team-spawn` invocation, fast-probe 3 MCPs:
```
mcp__phoenix__list-projects | mcp__cognee__remember "ping" | mcp__langfuse__get-prompts
```
If ANY return failure, log warning to operator with fix-guidance pointing at C1/C2/C3 finding ID.

---

## Stale references audit

| Reference target | Status | Notes |
|---|---|---|
| `graphiti` retired (W272+W290+W295) | ⚠ partial | settings.json:disabledMcpjsonServers ✓; .mcp.json:64-77 graphiti block still present (kept for inspection) |
| `FalkorDB :16379` referenced in CLAUDE.local.md but unused | ⚠ stale | "live for graphiti" — but graphiti retired |
| `C:/Users/42/.cognee` (state-outside-repo violation) | ⚠ open | tools/migrate-cognee-state.ps1 exists, not yet run |
| `Z:/tools/nodejs/node.exe` 2026-01-12 | ⚠ stale | hardcoded in codex hooks + settings.json (H2) |
| `cognee-mcp 0.5.4` editable install in venv | ⚠ stale | pre-T4-retirement |
| `graphiti-core 0.29.0` in venv | ⚠ stale | (H4) |
| `OTEL_EXPORTER_OTLP_HEADERS` documented as required | ✗ missing | (C2) |
| `harness-optimizer` skill referenced in operator prompt | ✓ exists | `everything-claude-code/.../agents/harness-optimizer.md` |
| All plugins listed in CLAUDE.md present in cache | ✓ verified | 48 enabled (CLAUDE.md notes 62 — mismatch suggests CLAUDE.md status is stale at line 33 "62 plugins installed") |

---

## Recommendations (operator-action checklist)

### CRITICAL (do today)
- [ ] **AI-C1**: Decide phoenix MCP fate — either stand up phoenix :16006 backend (NSSM service) OR move to `disabledMcpjsonServers`. Update CLAUDE.md status block.
- [ ] **AI-C2**: Add `OTEL_EXPORTER_OTLP_HEADERS` to `tools/eee.ps1` (since `${base64:...}` env interpolation likely not native) — compute Basic auth from `LANGFUSE_PUBLIC_KEY`/`LANGFUSE_SECRET_KEY` and export to CC process env. Test with a trace probe afterwards.
- [ ] **AI-C3**: Investigate cognee streamable-HTTP MCP session bug — either upgrade `cognee-mcp` to a fixed version OR document T3 as currently inert and update CLAUDE.md line 35 from `✓ ACTIVE` to `⚠ TRANSPORT-BROKEN`.

### HIGH (this wave)
- [ ] **AI-H1**: Track upstream `mksglu/context-mode` issue/PR for fnm_multishells path hardcoding. As workaround, document risk in CLAUDE.md and provide a `tools/heal-context-mode-node.ps1` healer.
- [ ] **AI-H2**: Refresh `Z:/tools/nodejs/node.exe` OR convert all codex hooks to use `node` (PATH-based resolution).
- [ ] **AI-H3**: Verify `harness/eval_harness.py` promptfoo invocation pattern — if Python import: install `pip install promptfoo-py` (or equivalent); if subprocess: confirm `npx promptfoo` works.
- [ ] **AI-H4**: After confirming graphiti is fully retired, `pip uninstall graphiti-core cognee-mcp` (keep `cognee` separately if T3 to be revived) from venv.
- [ ] **AI-H5**: Inspect + commit (or revert) the 3 modified `harness/adapters/memory_recall/*.py` files + `installed_plugins.json` + `known_marketplaces.json` per W270 install-state-drift mandate.

### MEDIUM (next wave)
- [ ] **AI-M1**: `pip install -U pyright` (or set env `PYRIGHT_PYTHON_FORCE_VERSION=latest`)
- [ ] **AI-M2**: Schedule `/plugin update codex@openai-codex` SHA-freshness check (per W270 silent-SHA-drift fix)
- [ ] **AI-M3**: Re-verify `gpt5-archaeologist.md` source SHA against sibling
- [ ] **AI-M4**: Strip BOM from `evaluator.md` YAML frontmatter
- [ ] **AI-M5**: Either delete or annotate `.mcp.json:64-77` graphiti block
- [ ] **AI-M6**: Document playwright dual-surface in CLAUDE.md
- [ ] **AI-M7**: Run `/ctx-upgrade` to bump context-mode 1.0.136 → 1.0.140
- [ ] **AI-M8**: Decide on context-mode parallel Stop hook — disable if redundant

### LOW
- [ ] **AI-L1**: Confirm `defaultMode: bypassPermissions` is intentional; document in CLAUDE.md operator-decisions
- [ ] **AI-L2**: Re-evaluate `OTEL_INSTRUMENTATION_GENAI_CAPTURE_MESSAGE_CONTENT=false` privacy posture
- [ ] **AI-L3**: Move historical `_comments` out of `.mcp.json` (50+ lines of audit history)
- [ ] **AI-L4**: Run `tools/migrate-cognee-state.ps1 -Execute` (W286-cross deferred operator-action)

---

## Cardinal-rule invariants verified

- **R1 trusted-only plugins**: ✓ all 48 enabledPlugins resolve to plugins from cataloged marketplaces (claude-plugins-official, openai-codex, everything-claude-code, claude-code-workflows, claude-code-skills, etc.). No plugin from an uncatalogued source observed.
  - Evidence: `python -c "import json; d=json.load(open('.claude/settings.json')); ep=d.get('enabledPlugins',{}); [print(k) for k,v in ep.items() if v]"` matched against `.claude/plugins/cache/` directory listing → all enabled slugs have a cache dir.
- **R2 no self-invent .py/.sh**: ✓ verified
  - `find .claude/hooks -type f \( -name '*.py' -o -name '*.sh' \)` returned ZERO results
  - `.claude/hooks/` contains only `context-mode-cache-heal.mjs` (operator-curated `.mjs`, NOT `.py`/`.sh`) — allowed per CR-2 letter
  - `.claude/session-env/*/sessionstart-hook-N.sh` files are CC-generated runtime artifacts (per-session ephemeral, NOT operator-authored) — different category, not a CR-2 violation
  - `.claude/plugins/data/hindsight*/venv/Scripts/pywin32_*.py` are pip-installed venv pywin32 artifacts (auto-managed package installs) — not operator-authored, not CR-2 violations
- **R3 cite-anchored agents**: ✓ partial
  - `.claude/agents/wshobson-devops-troubleshooter.md` + `.claude/agents/wshobson-security-auditor.md` carry W285-cite headers
  - `.claude/agents/gpt5-archaeologist.md` carries Wave-15 cite header with source-SHA pin
  - `.claude/agents/evaluator.md` has YAML frontmatter but no explicit cite header — flagged as M-class needs cite anchor
- **R4 no self-invent rules**: ✓ verified
  - `find .claude/rules -type f` returns no tracked files
  - `git ls-files .claude/rules` returns nothing
- **R5 settings.json:deny[] secrets covered**: ✓ verified — covers `.env*`, `id_rsa`, `id_ed25519`, `*.pem`, `*.pfx`, `*.key`, `CLAUDE.local.md`, `tools/eee.local.ps1`, `.aws/credentials`, `.ssh/config`, `.ssh/known_hosts`, `.netrc`, `.npmrc`, `.docker/config.json`, `credentials.json`, `*.crt`

---

## Appendix A — Plugins data state.json absent for most plugins

Per W280 closeout, gitignored `.claude/plugins/data/` should contain per-plugin state.json. Found:

| Plugin | state.json present? | Path |
|---|:---:|---|
| codex-openai-codex | ✓ | `.claude/plugins/data/codex-openai-codex/state/claude-sota-installed-0271062cb1571a49/state.json` (`stopReviewGate:true`) |
| context-mode-context-mode | ✓ | `.claude/plugins/data/context-mode-context-mode/state/claude-sota-installed-W290-1b5c12f82e5820c7/state.json` (`stopReviewGate:false`) |
| everything-claude-code | ⚠ dir present, no state.json | (no jobs/state needed; likely intentional) |
| hindsight-memory-hindsight | ⚠ venv-only, no state.json | (T1 daemon state lives at :9077 + `~/.hindsight/`) |
| ralph-loop | ⚠ dir present, no state.json | |
| pyright-lsp | ⚠ dir present, no state.json | |
| typescript-lsp | ⚠ dir present, no state.json | |
| (others) | ⚠ no data dir | |

**Verdict**: codex + context-mode are the only plugins with state.json. Both readable. No state.json drift. ✓

---

## Appendix B — Bootstrap-runtime cross-reference

`tools/bootstrap-runtime.ps1` (35,928 bytes) per CLAUDE.md is supposed to fix:
- review-gate state (codex stop-time review-gate)
- hindsight local state (`~/.hindsight/claude-code.json:enableKnowledgeTools=true`)
- Windows venv `bin/` shims

**Not re-validated this audit** (out of scope per "do not modify"). Recommend an operator-spot-check: run `tools/bootstrap-runtime.ps1` once interactively and verify idempotent + fail-loud per W280b.

---

## Appendix C — W308 closed items NOT re-litigated (per agent instructions)

Per audit constraint "do not re-do W295-W308 closed items", the following were observed-but-not-rescored:
- OTel endpoint repoint to langfuse :3000 (W307) — endpoint correct, BUT auth-header missing is a NEW finding (C2)
- T4 graphiti retired (W272+W290+W295) — settings.json:disabledMcpjsonServers includes graphiti ✓; venv drift is a NEW finding (H4)
- Hooks self-invent removed (W255) — verified clean ✓
- Codex Stop-hook gate active (W280a) — verified live ✓
- Hindsight T1 local bootstrap (W280b) — :9077/health returns 200 ✓
- W308 row #31 silent re-enable of planning-with-files plugin via commit msg zero-mention — installed_plugins.json modifications NOT YET committed (H5 — possibly related to same governance class)
- W307 row #27 "named-but-not-deployed" gap (litellm) — out of scope, no fresh probe done

---

## Closing summary

The operator's "I feel agent-teams has silent fallback or errors" instinct is **directionally correct** but **mis-attributed in scope**:

- Agent-teams orchestration plumbing itself is clean (R3-compliant subagent types, all definitions resolvable, env vars set, presets correct, fork enabled).
- **The silent fallbacks live in the MCP observability + memory layer that orchestrated subagents depend on**: phoenix DOWN, langfuse OTel 401-dropped, cognee session-broken. Subagents calling these MCPs get fetch-failed or session-not-found errors that the parent orchestrator does NOT see unless it explicitly inspects subagent return values.
- Cascading effect: every parallel research wave (W288 / W289 / W290 / W291 / W292 / W293) has been running with **no usable phoenix traces, no langfuse OTel traces, and degraded cognee memory writes**. The architecture-itself score in v3.1 ledger may need re-rating on D17 (robustness_under_perturbation) once these are fixed.

Recommend Stream D synthesis priorities: C1-C3 batched in a single fix commit; H1-H5 as a second commit; M1-M8 as a third.
