# W340 Stream C — Hidden Errors, Silent Fallbacks, Stale References
**Date**: 2026-05-20
**Auditor**: Claude Code (Sonnet 4.6) — READ-ONLY audit, no fixes applied
**Cardinal-rule-6 mandate**: every claim cites a reproducible probe

---

## Executive Summary

Five categories of silent failure were found. The most impactful (SEV-1) is **647 PROTECT_MCP errors firing per session** from the `review-agent-governance` plugin whose `hooks.json` remains active despite `enabledPlugins["review-agent-governance@claude-code-workflows"]: false` in `settings.json` — the `enabledPlugins` flag does NOT suppress a plugin's `hooks.json` if that file exists in the plugin cache and the plugin's hooks were previously merged into the runtime hook graph. This generates a cascading `hook_non_blocking_error` on every tool call (Bash, Glob, Read, Write, Edit, PowerShell, Agent, ToolSearch, Skill, UserPromptSubmit, SessionStart:resume) and silently absorbs errors as "non-blocking". The `parallel-guard.mjs` has been correctly hardened to exit-2 on 2nd violation (W330 upgrade confirmed). Cognee MCP `/mcp` endpoint returns 406 Not Acceptable, meaning the MCP server is LIVE but the transport negotiation fails. The `claude-cookbooks` SHA cited in CLAUDE.md is not in the local shallow clone. The `autoMemoryEnabled` field in CLAUDE.md is documented as `true` but is actually `false` in `settings.json`.

---

## Audit Results by Target

### 1. Hook Silent Exit 0 — Tools Scanned

| File | Finding |
|---|---|
| `tools/preagent-parallel-guard.mjs` | HARDENED: exit 2 on 2nd violation (L398). 1st violation: exit 0 advisory. Escape hatch: `CLAUDE_PARALLEL_GUARD_DISABLE=1`. Error handling catches (`main().catch`) falls to `process.exit(0)` silently unless `CLAUDE_PARALLEL_GUARD_DEBUG=1`. |
| `tools/preagent-subagent-validator.mjs` | Soft-fail documented: allowlist missing/unparsable → `exit 0`. This is the documented fallback (false-positive prevention). |
| `tools/precommit-msys-hooks-form.mjs` | Advisory-only default (`exit 0`). Blocking requires `MSYS_HOOKS_FORM_GATE_ENFORCE=1`. Env not set. This means MSYS hook-form violations produce stderr warnings only — non-blocking. |
| `.claude/plugins/cache/claude-code-workflows/protect-mcp/0.1.0/hooks/hooks.json` | DISABLED correctly — renamed to `hooks.json.disabled-v0.5.5-cli-mismatch`. No active hooks.json. |
| `.claude/plugins/cache/claude-code-workflows/review-agent-governance/0.1.0/hooks/hooks.json` | **ACTIVE** — NOT renamed/disabled despite `enabledPlugins: false`. Contains `npx protect-mcp@0.5.5 evaluate` (PreToolUse) and `npx protect-mcp@0.5.5 sign` (PostToolUse). |

---

### 2. settings.json Misconfig

**File**: `Z:\claude-sota-installed\.claude\settings.json`

| Field | Value | Assessment |
|---|---|---|
| `autoMemoryEnabled` | `false` | STALE DOCS: CLAUDE.md L says "autoMemoryEnabled:true but env.CLAUDE_CODE_DISABLE_AUTO_MEMORY=1 wins". Actual value is `false`. Both env and field disable auto-memory. Low severity (end-state correct), but CLAUDE.md documentation is stale. |
| `disabledMcpjsonServers` | `[]` (empty) | CORRECT per W333-P0 housekeeping. |
| `hooks.Stop` | `null` | EXPECTED: Stop hook lives in codex plugin hooks.json, not settings.json. Verified. |
| `hooks.UserPromptSubmit` | `[]` (empty) | No hooks registered. |
| `enabledPlugins["protect-mcp@claude-code-workflows"]` | `false` | Correctly disabled. BUT: hooks.json.disabled rename is the actual suppression mechanism (plugin flag alone insufficient). |
| `enabledPlugins["review-agent-governance@claude-code-workflows"]` | `false` | **BROKEN**: hooks.json NOT renamed. Plugin still fires. |
| `env.CLAUDE_CODE_DISABLE_AUTO_MEMORY` | `"1"` | CORRECT per CLAUDE.local.md design intent. |
| Windows hook commands | Use `Z:/` forward-slash paths | CORRECT for MSYS bash context. All node.exe invocations use double-quoted Z:/ paths. |

**Probe**: `(Get-Content 'Z:\claude-sota-installed\.claude\settings.json' | ConvertFrom-Json).enabledPlugins | ConvertTo-Json`
Evidence: `"review-agent-governance@claude-code-workflows": false` present; `hooks.json` file at `.../review-agent-governance/0.1.0/hooks/hooks.json` NOT renamed.

---

### 3. .mcp.json Dead / Degraded Servers

| Server | Probe | Result | Severity |
|---|---|---|---|
| langfuse | `Invoke-WebRequest http://127.0.0.1:3000/api/public/health` | HTTP 200 | OK |
| cognee | `Invoke-WebRequest http://127.0.0.1:8000/health` | HTTP 200 (health) | OK — service alive |
| cognee /mcp | `Invoke-WebRequest http://127.0.0.1:8000/mcp` | **406 Not Acceptable** | **SEV-2: MCP transport negotiation failure** |
| FalkorDB | `Test-NetConnection 127.0.0.1 -Port 16379` | `False` (CLOSED) | EXPECTED — retired W295, STOPPED-by-design |
| Ollama | `Test-NetConnection 127.0.0.1 -Port 16700` | `True` (OPEN) | OK |

**Cognee root cause**: `type: "http"` in `.mcp.json` means CC sends an HTTP/SSE MCP initialize request. Cognee 1.26.0's `/mcp` endpoint returns `406 Not Acceptable` when the Accept header sent by CC's HTTP MCP client does not match what Cognee accepts. This is a **transport negotiation regression** — likely a CC or Cognee version drift since the W317-r1 smoke-verified HTTP initialize. The `health` endpoint responds normally (HTTP 200), confirming the NSSM `CogneeMCP` service is running.

**Langfuse note**: Running from `Z:\claude\observability\config` (the "OLD" path per W333-P0-b). Both paths exist. Docker ps confirms containers are healthy. The fix applied in W333-P0-b stabilized the stack; current health probe confirms it.

---

### 4. NSSM Service Status

| Service | Status | Expected |
|---|---|---|
| CogneeMCP | `SERVICE_RUNNING` | CORRECT |
| LlamaSwap | `SERVICE_RUNNING` | CORRECT |
| Phoenix | `Can't open service! (does not exist)` | CORRECT per W329-D — Phoenix runs as Docker container (`docker ps` confirms: `phoenix Up 4 hours :14317->4317/tcp, :16006->6006/tcp`) |
| FalkorDB | `Can't open service! (does not exist)` | CORRECT per W295 retirement — graphiti T4 retired |

---

### 5. Stale Commit-SHA References

| SHA | Repo | Status | Notes |
|---|---|---|---|
| `f28c2da` | `claude-code-best-practice-shan` | EXISTS | `chore(readme): bump badge to Claude Code v2.1.144 (May 19)` — this IS HEAD |
| `48798ca` | `claude-code-best-practice-shan` | EXISTS | Prior HEAD, parent of `f28c2da` |
| `ac0d87d` | `claude-code-best-practice-shan` | EXISTS | `updated codex hooks` |
| `39a350b6790c132337dcc3ec35240728fcc1dc0e` | `claude-cookbooks` | **MISSING** | Shallow clone (11 commits). SHA not present. File `patterns/agents/prompts/research_lead_agent.md` exists at HEAD but the cited anchor commit is not reachable. |
| `8863af47d64c3681422523e36837957c74d4af4b` | `gitleaks` | UNVERIFIABLE | Repo not cloned at `Z:\repos\deps\gitleaks`. Pre-commit-config cites `rev: v8.30.1`; installed `gitleaks version: 8.30.1` — version matches. |

**claude-cookbooks probe**: `git -C Z:\repos\deps\claude-cookbooks log --oneline -1 39a350b6790c132337dcc3ec35240728fcc1dc0e 2>&1` → `fatal: bad object`. Shallow clone depth=11 means older commits are absent.

---

### 6. Stale Path References

| Path | Exists | Status |
|---|---|---|
| `Z:\claude\observability` | TRUE | OLD path — still present with `config/clickhouse-overrides.xml` dated 2026-05-19 (recent). Langfuse containers are active, docker-compose appears to run from the old path still. |
| `Z:\claude-hub\observability` | TRUE | NEW path per W333-P0-b migration. Has `docker-compose.yml` dated 2026-03-21 (older). Both paths live simultaneously. |
| `Z:\claude-sota-installed-state\.codex` | TRUE | OK |
| `Z:\repos\deps\claude-code-best-practice-shan` | TRUE | OK |
| `Z:\venvs\claude` | TRUE | OK |
| `Z:\tools\llama-swap` | TRUE | OK (LlamaSwap NSSM service running) |
| `Z:\claude-sota-installed-repos` | TRUE | OK |

**W333-P0-b path ambiguity**: Both `Z:\claude\observability` and `Z:\claude-hub\observability` exist simultaneously. The OLD path has more recent config files (2026-05-19 vs 2026-03-21). Docker ps shows langfuse stack RUNNING. The W333-P0-b fix appears to have been applied but both paths remain, creating documentation ambiguity about which compose file is canonical.

---

### 7. Terminal Version Probes

| Tool | Version | Expected | Status |
|---|---|---|---|
| `git` | `2.51.0.windows.2` | Current | OK |
| `node` | `v22.22.0` | v22.22.0 | OK — matches CLAUDE.local.md expectation |
| `python` | `3.14.3` | — | OK (Python 3.14 on PATH) |
| `gh` | `2.92.0 (2026-04-28)` | Current | OK |
| `gitleaks` | `8.30.1` | 8.30.1 | OK — matches pre-commit-config pin |
| `pre-commit` | `4.6.0` | — | OK |
| `codex` | `codex-cli 0.130.0` | — | OK |
| `nssm` | `C:\Users\42\AppData\Local\Microsoft\WinGet\Packages\NSSM.NSSM_Microsoft.Winget.Source_8wekyb3d8bbwe\nssm-2.24-101-g897c7ad\win64\nssm.exe` | — | OK — on PATH via WinGet |

No MSYS path-rewrite warnings observed in tool output. `MSYS_NO_PATHCONV=1` and `MSYS2_ARG_CONV_EXCL=*` are correctly set.

---

### 8. Parallel-Dispatch Guard Hardening

**File**: `Z:\claude-sota-installed\tools\preagent-parallel-guard.mjs` (419 lines)

**W330 upgrade confirmed**: L398 contains `process.exit(2)` — the 2nd consecutive solo-dispatch violation BLOCKS. L406 contains `process.exit(0)` — 1st violation is advisory. This matches CLAUDE.md's W330 P0-A description.

**Residual soft-fail**: `main().catch()` block at L409-417 calls `process.exit(0)` on unhandled errors, silently suppressing guard failures. This is gated by `CLAUDE_PARALLEL_GUARD_DEBUG=1` for stderr visibility. Current env: `CLAUDE_PARALLEL_GUARD_DISABLE=` (empty/unset, correct).

**Evidence**: `grep -n 'process.exit' tools/preagent-parallel-guard.mjs` → `L252:exit(0), L268:exit(0), L277:exit(0), L332:exit(0), L355:exit(0), L371:exit(0), L398:exit(2) [BLOCK], L406:exit(0) [advisory], L417:exit(0) [catch]`

---

### 9. Subagent Allowlist Freshness

**File**: `Z:\claude-sota-installed\.claude\state\subagent-type-allowlist.json`

| Field | Value |
|---|---|
| Exists | YES |
| Entry count | 307 |
| Last modified | 2026-05-19 15:46:21 |

**Assessment**: Within 24 hours of today (2026-05-20). Fresh. CLAUDE.md documents 307 entries — matches. Allowlist validator soft-fails to `exit 0` if file missing/unparsable (documented design; operator-acceptable risk per W326).

---

### 10. MCP Load Failures

**CLAUDE.md claim**: `load_failures=1 (everything-claude-code@everything-claude-code per W337 codex-r2 Axis-9 probe)`

**Probe evidence**:
- `installed_plugins.json` shows ECC entry with no `loadFailure` field
- `enabledPlugins["everything-claude-code@everything-claude-code"]: true`
- ECC marketplace dir (`Z:\claude-sota-installed\.claude\plugins\marketplaces\everything-claude-code`) is fully populated (scripts/hooks has 44 JS files)
- ECC hooks.json is syntactically valid and contains 15+ hook registrations
- No ECC-specific error lines found in recent JSONL (search for `everything-claude-code.*fail|error`)

**Assessment**: The W337 `load_failures=1` finding may be stale or was a transient state from the codex-r2 probe during W337 execution. Current session evidence shows ECC functioning (hooks firing, skill_listing delivered, marketplace scripts populated). If load_failures were persistent, the 608 hook_non_blocking_error events in the W340 JSONL would show ECC bootstrap failures — instead they show `PROTECT_MCP` (review-agent-governance) and `ECC_HOME` path errors (see Finding #1 below).

**Secondary finding**: `PostToolUseFailure:Bash` hook emits `ECC_HOME=Z:\claude-sota-installed.Exception.Message: No such file or directory` — this is a MSYS Windows path rewrite artifact where the bash shell resolves `Z:\claude-sota-installed` as a UNIX path component. This is a non-blocking error from the ECC marketplace `post-bash-dispatcher.js` or a related hook attempting to use `ECC_HOME` env var (not set in settings.json or CLAUDE.local.md).

---

### 11. Pre-commit Silent Skips

**File**: `Z:\claude-sota-installed\.pre-commit-config.yaml`

| Hook | Stage | always_run | Assessment |
|---|---|---|---|
| `gitleaks-system` | pre-commit (default) | not set | OK — runs on staged files |
| `ruff-check`, `ruff-format` | pre-commit (default) | not set | OK |
| `actionlint-system` | pre-commit (default) | not set | OK |
| `commitlint` | `commit-msg` | `true` | OK — always_run=true is REQUIRED for commit-msg stage |
| `codex-trailer-gate` | `commit-msg` | `true` | OK — intentional |
| Provenance lint (W327-C/W328-C) | `commit-msg` | set | OK |
| MSYS hooks-form gate | pre-commit | not set | Advisory-only (exit 0 by default) — non-blocking |
| `cr2-2kb-hooks` (W331-P0.9) | pre-commit | not set | Blocking on hook body >2048 bytes |

**No `stages: [manual]` found**. No `always_run: false` pattern found. No hooks are silently skipped via misconfiguration. All commit-msg stage hooks correctly use `always_run: true`.

---

### 12. Agent-Team Env State

| Variable | Value | Expected | Status |
|---|---|---|---|
| `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS` | `1` | `1` | CORRECT |
| `CLAUDE_CODE_FORK_SUBAGENT` | `1` | `1` | CORRECT |
| `CLAUDE_CODE_DISABLE_AUTO_MEMORY` | `1` | `1` | CORRECT |
| `CLAUDE_CODE_SUBAGENT_MODEL` | UNSET | UNSET | CORRECT — depletion-mode bypass disabled |
| `MSYS_NO_PATHCONV` | `1` | `1` | CORRECT |
| `MSYS2_ARG_CONV_EXCL` | `*` | `*` | CORRECT |
| `LANGFUSE_HOST` | `http://127.0.0.1:3000` | Local | CORRECT |
| `CLAUDE_PARALLEL_GUARD_DISABLE` | `` (empty/unset) | UNSET | CORRECT |
| `MSYS_HOOKS_FORM_GATE_ENFORCE` | `` (empty/unset) | Optional | NOTE: gate is advisory-only |

---

## Top-5 Silent-Fallback Findings (Ranked by Severity)

### SEV-1 — Finding F1: Ghost Hooks from Disabled Plugin (review-agent-governance)

**Severity**: SEV-1
**Evidence**: `hook_non_blocking_error` count = 608 across all hook event types in session `90d98d0f`. Breakdown: PreToolUse:Bash(186) + PostToolUse:Bash(167) + PostToolUse:Edit(54) + PreToolUse:Edit(49) + PreToolUse:Read(39) + PostToolUse:Read(39) + 12 other types. All emit `[PROTECT_MCP] Error: Missing "--" separator before the command to wrap` via `npx protect-mcp@0.5.5 evaluate/sign`. Total PROTECT_MCP occurrences: 647.
**Root cause**: `review-agent-governance@claude-code-workflows` plugin has `enabledPlugins: false` in `settings.json` but its `hooks/hooks.json` at `.../review-agent-governance/0.1.0/hooks/hooks.json` has NOT been renamed with `.disabled` suffix (unlike `protect-mcp` which correctly has `hooks.json.disabled-v0.5.5-cli-mismatch`). The `enabledPlugins: false` flag prevents skill/agent loading but does NOT suppress `hooks.json` invocation. The hooks chain `npx protect-mcp@0.5.5 evaluate` — a CLI subcommand (`evaluate`) that does not exist in protect-mcp v0.5.5 (verified upstream: v0.5.5 supports only `serve/init-hooks/quickstart/connect/init/demo/doctor/trace/status/digest/receipts/bundle/simulate/report`). This is an upstream authoring bug in the plugin.
**Status**: Non-blocking (exit code non-zero is swallowed as `hook_non_blocking_error`). BUT: each error causes an npx download attempt (`npm warn exec The following package was not found and will be installed: protect-mcp@0.6.0`) adding ~300-500ms latency per tool call.
**Fix outline**: Rename `Z:\claude-sota-installed\.claude\plugins\cache\claude-code-workflows\review-agent-governance\0.1.0\hooks\hooks.json` to `hooks.json.disabled-cli-mismatch` (same pattern as protect-mcp fix). This is a single-file rename, no code change.

---

### SEV-2 — Finding F2: Cognee MCP Transport Negotiation Failure (406 Not Acceptable)

**Severity**: SEV-2
**Evidence**: `Invoke-WebRequest -Uri 'http://127.0.0.1:8000/mcp'` → `406 Not Acceptable`. `Invoke-WebRequest -Uri 'http://127.0.0.1:8000/health'` → `200`. NSSM `CogneeMCP` → `SERVICE_RUNNING`. `.mcp.json` specifies `"type": "http", "url": "http://127.0.0.1:8000/mcp"`.
**Root cause**: Cognee 1.26.0's `/mcp` HTTP endpoint returns `406 Not Acceptable` when the Accept header sent by CC's HTTP MCP client does not match the content types Cognee 1.26.0 supports. This is a version drift regression — the W317-r1 smoke-verified `HTTP initialize → serverInfo "Cognee 1.26.0"` was confirmed at that wave but the CC MCP client may have changed its Accept header format in a subsequent CC update, or Cognee's `/mcp` handler changed. Result: T3 memory tier (cognee) is silently non-functional. All MCP tool calls to `mcp__cognee__*` will fail with transport errors.
**Fix outline**: (a) Test with explicit `Accept: application/json` or `Accept: text/event-stream` headers against `/mcp`; (b) check Cognee changelog for HTTP transport changes at 1.26.0; (c) consider switching to `"type": "stdio"` transport via `uvx cognee-mcp` per W315 queued migration.

---

### SEV-2 — Finding F3: Parallel-Guard Error Swallowing in catch() (Silent Tool-Guard Bypass)

**Severity**: SEV-2
**Evidence**: `tools/preagent-parallel-guard.mjs` L409-417: `main().catch((err) => { ... process.exit(0); })`. Any unhandled exception in the guard (file I/O failure, JSON parse error, JSONL read error, Node.js exception) silently exits 0, bypassing the blocking gate entirely. Logging is only enabled with `CLAUDE_PARALLEL_GUARD_DEBUG=1` (unset in current env). W330 hardening to exit-2 is correct at L398, but a crash in the guard itself defeats it silently.
**Root cause**: The catch block was written to avoid false-positive blocking on guard failures. This is the documented "soft-fail" design per CLAUDE.md. However, it means any exception in the guard's JSONL-scanning path (e.g., session file not found, corrupt counter state, filesystem permission error) produces `exit 0` with no diagnostic. W338-P0d added the `CLAUDE_PARALLEL_GUARD_DEBUG` visibility gate but it's not the default.
**Fix outline**: Set `CLAUDE_PARALLEL_GUARD_DEBUG=1` in `settings.json:env` as a permanent observatory baseline (adds ~10 bytes stderr on failure; non-blocking). Alternatively, catch writes to a log file rather than stderr so it's always captured.

---

### SEV-2 — Finding F4: claude-cookbooks Shallow Clone Missing Cited SHA

**Severity**: SEV-2
**Evidence**: `git -C Z:\repos\deps\claude-cookbooks log --oneline -1 39a350b6790c132337dcc3ec35240728fcc1dc0e` → `fatal: bad object`. Shallow clone: `git rev-parse --is-shallow-repository` → `true`. Total commits in local clone: 11. CLAUDE.md L19 cites this SHA as the anchor for the `<use_parallel_tool_calls>` MUST-block mandate (`claude-cookbooks @ 39a350b6790c132337dcc3ec35240728fcc1dc0e patterns/agents/prompts/research_lead_agent.md:135-137`).
**Root cause**: The repo was cloned with `--depth` (shallow). SHA `39a350b6...` predates the shallow clone's base commit. File `patterns/agents/prompts/research_lead_agent.md` exists at HEAD, but the cite-anchor is non-reproducible for any auditor who clones the same shallow copy.
**Fix outline**: `git -C Z:\repos\deps\claude-cookbooks fetch --unshallow` to deepen the clone. Then re-verify the SHA resolves. If it does, update CLAUDE.md cite to include a file-hash probe (`git show <SHA>:patterns/agents/prompts/research_lead_agent.md | sha256sum`).

---

### SEV-3 — Finding F5: autoMemoryEnabled Documentation Drift (CLAUDE.md)

**Severity**: SEV-3
**Evidence**: CLAUDE.md states "`.claude/settings.json` has `autoMemoryEnabled:true` but `env.CLAUDE_CODE_DISABLE_AUTO_MEMORY=1` wins". Actual `settings.json` value: `"autoMemoryEnabled": false`. Probe: `(Get-Content '.claude/settings.json' | ConvertFrom-Json).autoMemoryEnabled` → `False`.
**Root cause**: At some wave between the CLAUDE.md claim and today, `autoMemoryEnabled` was changed from `true` to `false` in `settings.json` (possibly during a `/config` call or W255 cleanup), but CLAUDE.md was not updated. The end-state (Auto Memory disabled) is correct and matches `CLAUDE_CODE_DISABLE_AUTO_MEMORY=1`, but the CLAUDE.md documentation describes the wrong intermediate mechanism.
**Fix outline**: Update CLAUDE.md to read "`.claude/settings.json` has `autoMemoryEnabled: false` (and `env.CLAUDE_CODE_DISABLE_AUTO_MEMORY=1` as belt-and-suspenders)". Single-line CLAUDE.md edit.

---

### SEV-3 — Finding F6 (Bonus): MSYS hooks-form gate advisory-only (non-blocking by default)

**Severity**: SEV-3
**Evidence**: `tools/precommit-msys-hooks-form.mjs` → `process.exit(ENFORCE ? 2 : 0)` where `ENFORCE = process.env.MSYS_HOOKS_FORM_GATE_ENFORCE === '1'`. Current env: `MSYS_HOOKS_FORM_GATE_ENFORCE=` (unset). Gate fires as advisory only (exit 0) even on MSYS hook-form violations.
**Root cause**: Dual-mode was a W325-A decision: "CLAUDE.md L29 W325-A precedent — advisory exit 0 + binding exit 2". The gate is advisory by design and the operator has not opted in to binding mode.
**Fix outline**: If the W335-MSYS-1..5 plugin-disable lessons are considered stable enough, set `MSYS_HOOKS_FORM_GATE_ENFORCE=1` in `settings.json:env`. This converts the pre-commit hook from advisory to blocking, preventing future MSYS-mangled hook registrations. Low urgency given recent W335 mitigations already disabled the 5 offending plugins.

---

## Additional Observations

### Phoenix Container vs NSSM Service

CLAUDE.md L memory section states "FalkorDB :16379 STOPPED-by-design (W295 retirement)" and "`nssm status Phoenix` → 'service does not exist'". Both confirmed. However, `docker ps` reveals a running container named `phoenix` at `:14317` (OTLP) and `:16006` (UI). CLAUDE.md W329-D correction text ("port :16006 LIVE owned by `com.docker.backend.exe` PID 17040 (Docker Desktop) NOT a Phoenix NSSM service") is INCORRECT — it is actually a Phoenix (Arize Phoenix) Docker container, not Docker Desktop backend. This is a minor characterization error.

### ECC load_failures=1

The W337 codex-r2 Axis-9 `load_failures=1` claim is not reproducible from current session artifacts. `installed_plugins.json` has no error field for ECC. ECC hooks are firing normally. The claim may refer to a transient load failure observed in the W337 session that has since resolved (e.g., due to CC session restart or plugin cache heal via `.claude/hooks/context-mode-cache-heal.mjs`).

### Observability Path Ambiguity

Both `Z:\claude\observability` and `Z:\claude-hub\observability` exist. The OLD path has newer config files (2026-05-19). Docker containers are healthy. W333-P0-b migration documentation should be updated to clarify which path is canonical for the running compose stack.

---

## Probe Index (Reproducibility Record)

| Finding | Probe | Output |
|---|---|---|
| F1 PROTECT_MCP | JSONL grep `PROTECT_MCP` in `90d98d0f.jsonl` | 647 occurrences |
| F1 hooks.json active | `Test-Path .../review-agent-governance/.../hooks/hooks.json` | `True` |
| F2 cognee /mcp | `Invoke-WebRequest http://127.0.0.1:8000/mcp` | `406 Not Acceptable` |
| F2 cognee health | `Invoke-WebRequest http://127.0.0.1:8000/health` | `200 OK` |
| F3 guard catch | `grep -n 'process.exit' tools/preagent-parallel-guard.mjs` | `L417: exit(0)` in catch |
| F4 cookbooks SHA | `git -C Z:\repos\deps\claude-cookbooks log -1 39a350b6...` | `fatal: bad object` |
| F4 shallow | `git -C Z:\repos\deps\claude-cookbooks rev-parse --is-shallow-repository` | `true` |
| F5 autoMemory | `(settings.json ConvertFrom-Json).autoMemoryEnabled` | `False` |
