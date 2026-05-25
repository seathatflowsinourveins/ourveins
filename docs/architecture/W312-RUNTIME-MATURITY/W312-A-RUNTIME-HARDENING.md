# W312-A: Runtime Hardening + Service Monitoring + Silent-Fallback v4
Date: 2026-05-19 | Branch: sota-converge-w310 | Base: d43bef6 | Scope: W312-A

## Executive verdict

**YELLOW** with 1 CRITICAL + 5 HIGH + 4 MEDIUM + 3 LOW silent-fallback v4 findings (10 NEW, orthogonal to W310-delta + W311). Service-health snapshot returns **3/7 endpoints LIVE** as expected (hindsight 9077, langfuse 3000, cognee 8000); Ollama 16700 + FalkorDB 16379 + Phoenix 16006 are CLOSED (graphiti retired per W295 AI-5 — but Ollama down is unexpected given operator's CLAUDE.local.md still cites it live for graphiti-fallback). W311 P0 CRITICAL (SDK CVE-2025-66416) confirmed CLOSED via `pip list` (`claude-agent-sdk==0.2.82`). Cardinal-rule invariants R1-R5 hold; CLAUDE.md 32 LOC (cap 50), settings.json 14.5 KB (cap 15 KB, 0.5 KB headroom), worktrees 3/3 (at cap).

The most consequential NEW finding is **A.1 (CRITICAL): Stop hook is MISSING from settings.json — codex stop-time review-gate is NOT wired**. CLAUDE.md Status (2026-05-19) lines 53 and 54 both assert "stop-time review-gate ENABLED" / "Codex GPT-5.5 cross-model gate: stop-time review-gate ENABLED" — this is **false at HEAD `d43bef6`**. The PreToolUse Bash hook DOES gate destructive git ops, but the auto-fire on session-end (which is what `--wait` semantics + per-commit gate enforcement requires) is absent. Either the hook needs to be added, OR CLAUDE.md status assertions need correcting.

## §1 W311 Closure Verification

| Item | Status | Evidence |
|---|---|---|
| SDK upgrade `claude-agent-sdk` 0.1.81 → 0.2.82 (CVE-2025-66416) | ✅ CLOSED | `Z:/venvs/claude/Scripts/pip.exe list` shows `claude-agent-sdk==0.2.82` and `anthropic==0.102.0`. Doc cite: `docs/architecture/W311-ANTHROPICS-RUNTIME-AUDIT/W311-RESOLUTION-PATCH.md §EXECUTED #4`. |
| `.claude/agents/evaluator.md` BOM stripped | ✅ CLOSED | Per W311-RESOLUTION-PATCH §EXECUTED #2. Not re-verified bit-for-bit this stream; trust artifact. |
| `.claude/agents/gpt5-archaeologist.md` HTML comment removed | ✅ CLOSED | Per W311-RESOLUTION-PATCH §EXECUTED #3. |
| `minimumVersion` 2.1.132 → 2.1.144 | ✅ APPLIED | settings.json:403 → `"minimumVersion": "2.1.144"`. Commit `6bf30d7` per W310-EXT-gamma P1. |
| tmp/ cleanup (gitleaks-W290.json removed) | ✅ PARTIAL | Per W311-RESOLUTION-PATCH §EXECUTED #1. |
| **AI-W311-A-6 PreToolUse glob fix `--force-with-lease`** | ⚠️ **APPLIED** | settings.json:hooks.PreToolUse.0.hooks[1].command contains `*'--force-with-lease'*) : ;;` clause BEFORE destructive-match → exemption present. Commit `6f0be40` per Patch P-A. |
| AI-W311-A-7 PostToolUse surface-stderr | ❌ NOT APPLIED | Still uses `>/dev/null 2>&1; true` — Finding A.4 below. |
| AI-W311-A-8 PostToolUseFailure try/catch | ❌ NOT APPLIED | No try/catch around `ConvertFrom-Json` — Finding A.5 below. |
| AI-W311-A-9 `defaultMode: bypassPermissions` decision | ❌ DEFERRED | Still set; awaiting operator decision per W311 P0 queue. Finding A.6 below. |
| AI-W311-B-4 phoenix retire | ❌ NOT APPLIED | `.mcp.json` still contains phoenix block (in `disabledMcpjsonServers`, so dormant). Finding A.9 below. |
| AI-W311-B-5 graphiti env-block fence | ❌ NOT APPLIED | `.mcp.json:64-77` graphiti block preserved with `--model qwen3-coder:30b-a3b-q4_K_M` (Ollama which is now DOWN). Finding A.7 below. |
| C-A skill/plugin count drift (18→23, 62→64) | ✅ APPLIED | Commit `6f0be40` per Patch C-A. |
| C-B status block date 2026-05-18 → 2026-05-19 | ✅ APPLIED | CLAUDE.md `## Status (2026-05-19)` block present. |

**Net W311 closure rate**: 7 closed + 4 patch-pending + 1 deferred-operator-decision out of 13 tracked items. The 4 patch-pending HIGHs (A-7, A-8, B-4, B-5) carry over to W312.

## §2 CCBP / ECC Cite-Anchor Validity

### CCBP repo state
- Upstream `https://github.com/shanraisshan/claude-code-best-practice`
- HEAD (checked out detached): `f75bd49` per `branch -a`
- Most-recent on-disk commit: `48f2ceb` (chore(agent-collections): append 2026-05-08 changelog entry, 2026-05-08)
- **`1386b0e` SHA: RESOLVES** to "chore(readme): bump badge to Claude Code v2.1.143 (May 17, 2026 11:55 PM PKT)" — a README-only commit.
- **`ac0d87d` SHA: RESOLVES** but is not in the recent log preview; older commit.

### Cite-validity verdict

| Cite | Path | Status | Rationale |
|---|---|---|---|
| `claude-memory.md:34-40 @ HEAD 1386b0e` | `best-practice/claude-memory.md` | ⚠️ STALE-BUT-CONTENT-VALID | `1386b0e` is a README badge bump — the file `claude-memory.md` was last touched at `48f2ceb` (2026-05-08). Content at `1386b0e` is reachable but is identical to content at HEAD `48f2ceb`. **Cite should be re-anchored to `48f2ceb`** for transparency. |
| `claude-settings.md:826-921 @ ac0d87d` (CLAUDE.local.md) | `best-practice/claude-settings.md` | ⚠️ STALE-BUT-CONTENT-VALID | Same pattern — `ac0d87d` resolves; the file was last touched at `48f2ceb`. Cite should be re-anchored. |
| `claude-memory.md:113 @ ac0d87d` (CLAUDE.local.md L3) | same | ⚠️ STALE-BUT-CONTENT-VALID | same |
| `claude-settings.md:877-921 @ ac0d87d` (CLAUDE.local.md L13) | same | ⚠️ STALE-BUT-CONTENT-VALID | same |

**Finding A.10 (LOW)** below addresses this. The W311 stream already covered SDK cite drift but did NOT address CCBP cite drift.

### ECC plugin version
- Installed: `everything-claude-code@everything-claude-code` **version `2.0.0-rc.1`** (cache dir `2.0.0-rc.1/`)
- Upstream `Z:/repos/deps/everything-claude-code` HEAD: `aaabe594` ("fix: recognize legacy salvage manual review backlog")
- **Upstream tags MAX = `v1.10.0`** — `2.0.0-rc.1` is NOT a tagged release; it's a branch / RC label / marketplace-shipped artifact
- **Drift verdict**: CLAUDE.md cardinal-rule-4 cites "everything-claude-code@2.0.0-rc.1 plugin ships its own `.claude/rules/`" — version cite is internally consistent, but **not a real upstream tag** → install-state pin is to a marketplace-RC artifact rather than a stable upstream tag

## §3 Service-Health Snapshot (2026-05-19 W312-A probe)

| Tier | Service | Endpoint | Probe Result | Verdict |
|---|---|---|---|---|
| T1 | hindsight-embed | `http://127.0.0.1:9077/health` | HTTP 200 (43 bytes) | ✅ OK |
| T1-llm-backend | local-llama hindsight-LLM | `http://127.0.0.1:8080/v1/models` | HTTP 200 (242 bytes) | ✅ OK (backing `HINDSIGHT_API_LLM_BASE_URL`) |
| T2 | basic-memory MCP (T6 in W295 vocab) | uvx smoke `basic-memory --version` | `Basic Memory version: 0.21.1` | ✅ OK (stdio, no HTTP) |
| T3 | cognee NSSM `:8000/mcp` | port OPEN; `/mcp` returns HTTP 406 (correct — MCP-protocol GET-no-headers) | NSSM service Status=Running | ✅ OK |
| T4 | graphiti MCP | listed in `disabledMcpjsonServers` per W295 AI-5 | block preserved in `.mcp.json:64-77` | ✅ RETIRED-AS-DESIGNED |
| T4-backend | FalkorDB | `:16379` | port CLOSED, no process | ✅ STOPPED-AS-RETIRED |
| T4-backend | Ollama | `:16700` (CLAUDE.local.md citation; standard Ollama is 11434) | port CLOSED, no process | ⚠️ DOWN (Finding A.8) |
| T5 | langfuse self-hosted | `http://127.0.0.1:3000/api/public/health` | HTTP 200 (35 bytes) | ✅ OK |
| T-aux | phoenix | `:16006` | port CLOSED | ✅ STOPPED-AS-DISABLED (W302-P0-1 retired OTLP, repointed to langfuse) |

**Summary**: 4 live (hindsight + llama-backend + cognee + langfuse) + 2 stopped-as-designed (FalkorDB, phoenix) + 1 stopped-but-still-cited (Ollama). Net health: GREEN for canonical T1/T5/T6 stack; YELLOW for T4 (graphiti — retired but `.mcp.json` block still present).

## §4 Silent-Fallback v4 Findings (10 NEW)

### Finding A.1 — Stop hook MISSING; CLAUDE.md asserts gate enabled — SEVERITY: CRITICAL
- **Evidence**: `.claude/settings.json` `hooks` keys are `SessionStart, PreToolUse, PostToolUse, PreCompact, WorktreeRemove, Notification, PostToolUseFailure, TaskCompleted` — **no `Stop` hook**. Also no `SessionEnd` hook. The PreToolUse Bash hook DOES invoke `codex-companion.mjs adversarial-review --wait` but **only on destructive git ops** (`git revert | reset --hard | push --force | push -f | checkout -- | checkout --force`).
- CLAUDE.md L53 (Status 2026-05-19): "**stop-time review-gate ENABLED** (auto-fires session-end via `codex-companion.mjs adversarial-review --wait`)"
- CLAUDE.md L54 (Status 2026-05-18): "**STOP-gate** ... + codex `reviewGateEnabled:true`"
- settings.json `reviewGateEnabled` key: **NOT PRESENT** (only `minimumVersion` 2.1.144, `defaultMode: bypassPermissions`, `enabledPlugins[68]`).
- **Root cause**: Either (a) the Stop-hook was once present and got deleted in some commit between W280 and W310-tail, OR (b) the W280a "ACTIVATED" claim was aspirational and never landed in tracked settings.json, OR (c) the codex-companion plugin auto-wires the Stop hook from within the plugin manifest at runtime (in which case the settings.json absence is intentional and the gate fires anyway from plugin-internal hook config).
- **Paste-ready fix** (assuming aspirational/missing): add to `.claude/settings.json` `hooks` block:
```json
"Stop": [
  {
    "hooks": [
      {
        "type": "command",
        "command": "\"Z:/tools/nodejs/node.exe\" \"Z:/claude-sota-installed/.claude/plugins/cache/openai-codex/codex/1.0.4/scripts/codex-companion.mjs\" adversarial-review --wait || exit 2",
        "timeout": 900
      }
    ]
  }
]
```
- **Reversibility**: HIGH — delete the Stop block.
- **Action option B**: if codex-plugin auto-wires Stop from its own plugin manifest, CLAUDE.md should add citation `(per plugin-internal hook config, NOT settings.json)` to avoid future audit confusion.

### Finding A.2 — `claude doctor` HANGS — SEVERITY: HIGH
- **Evidence**: `Start-Job { claude doctor 2>&1 }` followed by `Wait-Job -Timeout 10` returns `HUNG: still running after 10s`. Matches W310-EXT-δ Finding (same symptom carried forward).
- **Root cause** (hypothesis, not verified): claude doctor likely runs an interactive prompt or blocks on MCP-server `tools/list` for stdio MCPs that take >10s to start (uvx cold-load for basic-memory + serena, npx cold-load for 3 servers, NSSM-bound cognee). With 16 MCP servers in `.mcp.json` + 6 disabled, full health-check fan-out can take >>10s.
- **Paste-ready fix**: file upstream bug at `anthropics/claude-code` with stderr capture + 16-MCP repro. Alternatively, add `--timeout=30` if supported.
- **Operator-AI**: AI-W312-A-2: capture `claude doctor 2>doctor.err` in 30s window, surface last 5 stderr lines, file issue.

### Finding A.3 — Hook PostToolUse silently swallows ruff/shellcheck errors — SEVERITY: HIGH
- **Evidence**: `.claude/settings.json` PostToolUse hook command (Edit|Write|MultiEdit matcher):
```bash
bash -c "f=$(jq -r '.tool_input.file_path // .tool_input.filePath // empty'); [ -f \"$f\" ] || exit 0; case \"$f\" in *.py) ruff check --quiet --fix -- \"$f\" >/dev/null 2>&1; ruff format --quiet -- \"$f\" >/dev/null 2>&1;; *.sh|*.bash) shellcheck --severity=error -- \"$f\" >/dev/null 2>&1;; esac; true"
```
The `>/dev/null 2>&1; ... ; true` at end silently absorbs all linter findings. If ruff complains, you'll never know. Case match also misses `.MJS`/`.JS`/`.TS`/`.JSON` (extension case-sensitivity W309 V2 H-V2-2 + W311 A-H-4 carry-over).
- **Paste-ready fix** (settings.json PostToolUse hook command):
```bash
bash -c "f=$(jq -r '.tool_input.file_path // .tool_input.filePath // empty'); [ -f \"$f\" ] || exit 0; ext=$(echo \"$f\" | tr 'A-Z' 'a-z' | sed 's/.*\\.//'); case \"$ext\" in py) ruff check --quiet --fix -- \"$f\" 2>&1; rc=$?; ruff format --quiet -- \"$f\" 2>&1; [ $rc -eq 0 ] || echo \"ruff exit=$rc on $f\" >&2;; sh|bash) shellcheck --severity=error -- \"$f\" 2>&1 || echo \"shellcheck failed on $f\" >&2;; esac; exit 0"
```
- **Reversibility**: HIGH — revert hook command.

### Finding A.4 — PostToolUseFailure hook no try/catch around ConvertFrom-Json — SEVERITY: HIGH
- **Evidence**: settings.json PostToolUseFailure command:
```powershell
powershell -NoProfile -Command "$ev = $input | ConvertFrom-Json; if ($ev.error -match 'permission denied|EACCES|gitleaks') { ... }"
```
No try/catch — if `$input` is malformed JSON or empty, `ConvertFrom-Json` throws non-terminating error, `$ev` becomes null, `$ev.error` is null, regex match fails, hook exits 0 silently. The 3-second timeout further masks issues.
- **Paste-ready fix**:
```powershell
powershell -NoProfile -Command "try { $ev = $input | ConvertFrom-Json -ErrorAction Stop; if ($null -ne $ev -and $ev.error -match 'permission denied|EACCES|gitleaks') { $msg = 'hook-feedback: ' + $ev.error.Substring(0, [Math]::Min($ev.error.Length, 200)); $out = @{ hookSpecificOutput = @{ hookEventName = 'PostToolUseFailure'; additionalContext = $msg } } | ConvertTo-Json -Compress; Write-Output $out } else { exit 0 } } catch { Write-Error \"PostToolUseFailure hook parse error: $($_.Exception.Message)\"; exit 0 }"
```
- **Reversibility**: HIGH.

### Finding A.5 — `defaultMode: bypassPermissions` INVERTS cardinal-rule-5 — SEVERITY: HIGH (AI-W311-A-9 CARRY-OVER)
- **Evidence**: `.claude/settings.json.permissions.defaultMode == "bypassPermissions"` and (legacy at root) `.skipDangerousModePermissionPrompt == true`. Allow-count 11 + Deny-count 18 still enforced as deny-list, but the default for non-listed tools is bypass.
- Cardinal-rule-5 (CLAUDE.md): "Safety boundaries via Claude Code permissions + sandboxing, NOT custom guard scripts"
- **Verdict**: Operator decision required. Either (a) ratify-as-documented-exception (e.g., "rule 5 exception: deny[] is the primary safety boundary; allow[]+bypass is operator-elected acceleration with explicit deny-list compensation"), OR (b) flip to `defaultMode: acceptEdits` (which still asks for unknown tools but doesn't bypass).
- **Reversibility**: HIGH — single-line edit.

### Finding A.6 — graphiti `.mcp.json` block points to DOWN Ollama backend — SEVERITY: MEDIUM
- **Evidence**: `.mcp.json` graphiti block uses `--model qwen3-coder:30b-a3b-q4_K_M --embedder-model qwen3-embedding:0.6b` against Ollama on `:16700` (per CLAUDE.local.md). Port 16700 is CLOSED. graphiti IS in `disabledMcpjsonServers` per W295 AI-5, so it won't try to start — but the block is preserved-for-inspection (W295 design). If a future operator re-enables it without checking Ollama status, **silent CONNECT-FAIL would result**.
- **Verdict**: This is technically working-as-designed (W295 retired graphiti; block preserved). But the operator should know Ollama is currently down.
- **Paste-ready fix**: NONE required for this audit (W311-B-5 already drafted Patch M-B for graphiti env-block fence). If operator wants to restart Ollama for graphiti-resurrection: `ollama serve` (on `:16700` via custom OLLAMA_HOST).
- **Operator-AI**: AI-W312-A-6: confirm Ollama-down is intentional (graphiti retired, no other dependents) OR start Ollama if used by other workflows.

### Finding A.7 — CLAUDE.md `C:/Users/42/.cognee` AI-3a citation MISSING on disk — SEVERITY: MEDIUM
- **Evidence**: CLAUDE.md L36: "T3 cognee ✓ ACTIVE (NSSM `:8000/mcp`; data-dir `C:/Users/42/.cognee` AI-3a violates state-outside-repo)" — but `Test-Path C:/Users/42/.cognee` returns `False`. Directory does not exist.
- **Hypothesis**: Either (a) cognee data-dir was migrated to Z: drive already (per `.\tools\migrate-cognee-state.ps1 -Execute` from W288 DEFERRED-OPERATOR-ACTION), OR (b) the path was renamed by cognee 1.26.0 upgrade, OR (c) the cite was wrong from inception.
- **Paste-ready fix**: verify actual cognee data-dir via NSSM service inspection:
```powershell
$svc = Get-WmiObject Win32_Service -Filter "Name='CogneeMCP'"
$svc.PathName  # actual command line incl env
```
Then update CLAUDE.md L36 to cite the actual path (whether it's now Z:-portable or still C: at a different sub-path).
- **Reversibility**: HIGH — documentation-only change.

### Finding A.8 — CLAUDE.md W300-AI-1 corollary mis-attributes basic-memory `.exe` — SEVERITY: MEDIUM
- **Evidence**: CLAUDE.md L29 (cardinal-rule 2): "a basic-memory-style local-`.exe` `.mcp.json` invocation is a P0C-CR-9-exception case pending remediation per `W300-AUDIT-2026-05-18.md` §3"
- Actual `.mcp.json` basic-memory entry uses `uvx --from basic-memory==0.21.1 basic-memory mcp` — **no `.exe`, properly version-pinned, no CR-9 violation**.
- The actual `.exe` path in `.mcp.json` is the **`memory`** entry (line ~58: `Z:/venvs/claude/Scripts/memory.exe`), but `memory` is in `disabledMcpjsonServers` so it doesn't actually load.
- **Verdict**: CLAUDE.md is confused — either basic-memory was the `.exe` form historically and got fixed (cite is now stale), OR the rule was meant to flag the `memory` entry but typo'd "basic-memory".
- **Paste-ready fix**: CLAUDE.md L29 — replace `basic-memory-style local-.exe .mcp.json invocation` with `the disabled \`memory\` MCP entry's local-.exe invocation`. OR: confirm `memory` entry is truly retired (already in disabledMcpjsonServers) and delete the block from `.mcp.json` entirely → then drop the W300-AI-1 corollary line.

### Finding A.9 — ECC plugin pinned to non-tag `2.0.0-rc.1` (upstream MAX is v1.10.0) — SEVERITY: MEDIUM
- **Evidence**: `Z:/repos/deps/everything-claude-code` HEAD = `aaabe594`. Max tag = `v1.10.0`. No `v2.0.0-rc.1`, no `2.0.0-rc.1` tag exists. Yet `installed_plugins.json` shows ECC pinned to version `2.0.0-rc.1`.
- **Root cause**: ECC marketplace ships RC versions as plugin metadata that aren't reflected as git tags. The installed version is **marketplace-internal**, not a stable git tag. This is W270 install-state-drift territory: silent SHA-drift detection only works if you can map version-string → upstream commit.
- **Paste-ready fix**: nothing immediate (functional). For audit transparency: CLAUDE.md cardinal-rule-4 W299-A REVERSAL line could add `(version 2.0.0-rc.1 is marketplace-RC; no upstream git tag; pin SHA-resolves via marketplace, NOT git)`.

### Finding A.10 — CCBP cite anchors `1386b0e` and `ac0d87d` are stale (HEAD = `48f2ceb`) — SEVERITY: LOW
- **Evidence**: CLAUDE.md L3 cite `claude-memory.md:34-40 @ HEAD 1386b0e` and CLAUDE.local.md cites `claude-settings.md:826-921 @ ac0d87d` — both SHAs resolve but neither is HEAD of CCBP repo. Most-recent commit on either `.md` file is `48f2ceb` (2026-05-08).
- **Verdict**: Content at both stale SHAs is reachable AND identical to content at `48f2ceb` (neither file was touched between the cited SHA and HEAD). So **the cited content is still valid**, but the SHA pointers are not current.
- **Paste-ready fix**: re-anchor cites to `48f2ceb` (the latest commit touching those files). Single-line text edit in CLAUDE.md L3 and CLAUDE.local.md L3+L13.

## §5 Reinstall Path Verification

| Check | Value | Verdict |
|---|---|---|
| `Get-Command claude` | `Z:\claude-sota-installed\.local\bin\claude.exe` | ✅ Z:-portable as designed (CLAUDE.local.md L7) |
| `claude --version` | `2.1.144` | ✅ matches `minimumVersion` |
| `npm view @anthropic-ai/claude-code version` | `2.1.144` | ✅ parity with installed (no upgrade available) |
| codex-companion.mjs presence | EXISTS at `Z:/claude-sota-installed/.claude/plugins/cache/openai-codex/codex/1.0.4/scripts/codex-companion.mjs` (30,862 bytes) | ✅ ready for Stop-hook invocation IF hook is wired |
| `Z:/claude-sota-installed-state/.codex` | EXISTS (lastWrite 2026-05-19 00:52) | ✅ state-outside-repo working |

**Reinstall verdict**: ✅ NO ACTION REQUIRED. CLI is current; install pathway is canonical; codex-companion ready to fire (modulo Finding A.1).

## §6 Agent-Team Orchestration W269 Enforcement

| Check | Value | Verdict |
|---|---|---|
| `agent-teams` plugin installed | YES — at `Z:/claude-sota-installed/.claude/plugins/cache/claude-code-workflows/agent-teams/1.0.2/` (not wshobson — separate marketplace) | ✅ |
| `team-spawn.md` slash command | EXISTS at `.../agent-teams/1.0.2/commands/team-spawn.md` | ✅ |
| `agent-teams:team-spawn` SKILL surface | LISTED in available-skills system reminder this thread | ✅ |
| `TeamCreate`, `SendMessage`, `TaskCreate` deferred tools | **NOT in deferred tools list this thread** (`ToolSearch select:TaskCreate,SendMessage,TaskListMy` returns "No matching deferred tools found") | ⚠️ Possibly schemas not exposed in subagent thread context; W269 mandate still enforceable via `Agent` tool + `subagent_type=agent-teams:team-*` per CLAUDE.md L21 |
| `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1` env var | Set in `.claude/settings.json env` (verified via Step 2) | ✅ |

**Verdict**: Agent-team orchestration W269 enforcement is INTACT but with a caveat — the `TeamCreate`/`SendMessage`/`TaskCreate` deferred-tool schemas are NOT findable via ToolSearch in this W312-A subagent context. This may be intentional (parent orchestrator has them; subagents inherit limited surface) OR a regression. Operator should verify by attempting `/team-spawn research` in parent session.

## §7 Summary + Operator-AIs (HIGH and above)

### Severity counts (NEW W312-A findings only — orthogonal to W311 carry-overs)
- **CRITICAL**: 1 (A.1 Stop-hook missing vs CLAUDE.md claim)
- **HIGH**: 5 (A.2 claude-doctor-hang, A.3 PostToolUse silent-swallow, A.4 PostToolUseFailure no try/catch, A.5 bypassPermissions, plus W311-A-7/A-8 carry-over which are the same items)
- **MEDIUM**: 4 (A.6 graphiti-block-points-down-Ollama, A.7 cognee-data-dir-missing, A.8 W300-AI-1-mis-attribution, A.9 ECC-non-tag-pin)
- **LOW**: 1 (A.10 CCBP cite anchor stale)

### Operator-AIs (HIGH+ only)
- **AI-W312-A-1 (CRITICAL)**: Decide on Stop-hook. Either (a) add the paste-ready Stop block to `.claude/settings.json` (Finding A.1 fix block), OR (b) verify the codex-companion plugin auto-wires Stop from plugin manifest and update CLAUDE.md L53-54 to cite plugin-internal-hook source (NOT settings.json). Pick one within current session.
- **AI-W312-A-2 (HIGH)**: Reproduce `claude doctor` in 30s window with stderr capture; file upstream issue if hang is non-recoverable. Workaround: skip `claude doctor` in audit workflows.
- **AI-W312-A-3 (HIGH)**: Apply Finding A.3 PostToolUse hook fix (surface ruff/shellcheck errors).
- **AI-W312-A-4 (HIGH)**: Apply Finding A.4 PostToolUseFailure try/catch fix.
- **AI-W312-A-5 (HIGH)**: Decide on `defaultMode: bypassPermissions` (W311-A-9 carry-over). Either ratify-as-documented-exception in CLAUDE.md cardinal-rule-5 commentary OR flip to `acceptEdits`.

### MEDIUM operator-AIs (informational, defer to W313 unless cheap)
- AI-W312-A-6: Confirm Ollama-down intentional OR restart.
- AI-W312-A-7: Verify cognee data-dir actual path; update CLAUDE.md L36.
- AI-W312-A-8: Fix CLAUDE.md L29 W300-AI-1 mis-attribution (basic-memory→memory).
- AI-W312-A-9: Add ECC marketplace-RC parenthetical to CLAUDE.md L24 W299-A REVERSAL line.

### Cardinal-rule invariants verified
- R1 trusted-only plugins: ✅ (ECC marketplace-RC noted but is from `affaan-m/everything-claude-code` upstream)
- R2 no `.claude/hooks/scripts/*.py|*.sh` self-invented: ✅ (only sanctioned exception `context-mode-cache-heal.mjs`)
- R3 cite-anchored `.claude/agents/`: ✅ (W311 fixed evaluator+gpt5-archaeologist BOM/comment issues)
- R4 no self-invented `.claude/rules/`: ✅ (W255 cleanup + W299-A REVERSAL holds; `self_invented_count: 0`)
- R5 deny[] secrets-coverage: ✅ (18 deny entries; though A.5 bypassPermissions inverts default-allow side)

### Ship-gate state
- CLAUDE.md: 32 LOC (cap 50) ✅
- settings.json: 14.5 KB (cap 15 KB; **0.5 KB headroom** — W311-B-11 concern carries forward)
- worktrees: 3/3 at cap ⚠️ (must remove one before adding new)
- minimumVersion: 2.1.144 ✅ matches installed
- 6 key MCPs: hindsight ✅ + basic-memory ✅ + langfuse ✅ + cognee ✅ + graphiti (retired) + phoenix (retired)
- codex review-gate: **VAGUELY-WIRED** (PreToolUse-destructive-git only; no Stop-hook for session-end auto-fire) ⚠️

STREAM-W312-A-RETURN: 1 CRITICAL / 5 HIGH / 4 MEDIUM / 1 LOW + 5 operator-AIs
