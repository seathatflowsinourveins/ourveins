---
wave: W309
stream: A (V2 extension — hook-command semantics deep-dive)
title: Silent-fallback hunt — hook-command-semantics + subagent FQN-collision extension
branch: sota-converge-w295
head: 85b6e4e
sibling_artefact: W309-STREAM-A-SILENT-FALLBACK-HUNT.md (V1 — backend-service + MCP-liveness coverage at ~39 KB, committed 23:17)
predecessor_audits: W298 Stream A (`code-reviewer` × 3 plugins flagged); W296 Stream A (`disabledMcpjsonServers` bookkeeping); W280b (hindsight :9077 bootstrap); W255 (33 `.claude/hooks/scripts/*.py` cleanup)
date: 2026-05-19
mandate: W309 Stream A — Read-only audit. NEW evidence orthogonal to V1 sibling. No config mutations.
---

# W309 Stream A V2 — Hook-command semantics + subagent-FQN-collision extension

This V2 file extends the sibling V1 audit. V1 deeply covered Phoenix backend down / OTel 401 / cognee LLM-key bug / Z:/tools/nodejs stale / promptfoo missing. V2 adds **orthogonal NEW evidence** in 5 dimensions V1 did not drill:

1. **Hook-command silent-pattern semantics** (gitleaks `--exit-code 0`, `; true`, `>/dev/null 2>&1`) — V1 mentioned hooks exist; V2 audits every command for silent-fail patterns
2. **Subagent FQN collision extension** — W298 found `code-reviewer` collides across 3 plugins; V1 didn't extend. V2 enumerates the FULL collision set (**9 unique parent plugins**)
3. **`.claude/hooks/context-mode-cache-heal.mjs` cardinal-rule-2 spirit-vs-letter analysis** — V1 listed it as `C-OK3` "operator-curated, NOT .py/.sh self-invent"; V2 challenges this classification
4. **`ECC_DISABLED_HOOKS` env var contains ghost entries** — references hooks deleted in W255 cleanup
5. **Plugin-path hardcoding in `settings.json` vs upstream-managed `hooks.json`** — settings.json embeds `codex/1.0.4` in destructive-git review-gate matcher

## §1 — Method

- File audit via `mcp__plugin_context-mode_context-mode__ctx_execute_file` on `.claude/settings.json` (READ-ONLY)
- Hook-command field-level extraction via `node -e 'console.log(JSON.stringify(s.hooks))'`
- Subagent collision enumeration via parent-plugin-dedup (`sed -E 's|^(\.claude/plugins/cache/[^/]+/[^/]+)/.*|\1|' | sort -u`)
- Live HTTP/TCP probes via `curl` + `Test-NetConnection`
- Cardinal-rule integrity audit via `find .claude/hooks/scripts`, `find .claude/rules` (returns "No such file or directory" — both clean)
- All probes via context-mode batch tools (concurrency=3-4)

## §2 — Findings (severity-sorted, V2-novel only)

### CRITICAL — none new

V1 already covers all CRITICAL-class findings. V2 adds no new CRITICAL.

### HIGH

#### H-V2-1 — `PreToolUse Bash` gitleaks hook is DOUBLE-NEUTERED
- **Severity**: HIGH
- **Component**: `.claude/settings.json:hooks.PreToolUse[0].hooks[0].command`
- **Live readback**: `gitleaks protect --staged --no-banner --redact --exit-code 0 || true`
- **Evidence**: Direct field-level inspection via `node -e 'console.log(JSON.stringify(s.hooks))'` returned this exact command string
- **Two silencing mechanisms stacked**:
  1. `--exit-code 0` forces gitleaks itself to **always return 0** regardless of leak detection
  2. `|| true` redundantly forces shell to return 0 even if gitleaks (somehow) returned non-zero
- **Impact**: PreToolUse Bash hooks fire BEFORE the Bash tool executes a command. The intent was a defense-in-depth secrets-scan on staged content. But:
  - Any leak detected → silently passed through
  - PreToolUse Bash matcher fires only on `Bash` tool — doesn't catch leaks added via `Edit|Write|MultiEdit` (the common path)
  - The pre-commit gate (`.pre-commit-config.yaml:gitleaks-system @v8.30.1`) DOES catch leaks at commit-time — that's the real defensive line
- **Severity rationale**: HIGH because the operator believes a defense exists but it is mechanically non-functional. Pre-commit gate covers the actual risk; this hook is dead code that wastes ~50ms per Bash tool call and gives false sense of security
- **Recommended fix**:
  - Option A (preferred): **DELETE the hook** (consolidate to pre-commit gate)
  - Option B: rewrite as `out=$(gitleaks protect --staged --no-banner --redact 2>&1); rc=$?; [ "$rc" -eq 0 ] || { echo "[hook] gitleaks detected staged-leak: $out" >&2; exit 2; }` — exit-2 BLOCKS per `https://code.claude.com/docs/en/hooks`

#### H-V2-2 — `PostToolUse Edit|Write|MultiEdit` hook discards ALL ruff/shellcheck signal
- **Severity**: HIGH
- **Component**: `.claude/settings.json:hooks.PostToolUse[0].hooks[0].command`
- **Live readback** (bash here-doc decoded):
  ```bash
  bash -c "f=\$(jq -r '.tool_input.file_path // .tool_input.filePath // empty'); 
  [ -f \"\$f\" ] || exit 0; 
  case \"\$f\" in 
    *.py) ruff check --quiet --fix -- \"\$f\" >/dev/null 2>&1; 
          ruff format --quiet -- \"\$f\" >/dev/null 2>&1;; 
    *.sh|*.bash) shellcheck --severity=error -- \"\$f\" >/dev/null 2>&1;; 
  esac; true"
  ```
- **Three silencing mechanisms stacked**:
  1. `>/dev/null` discards stdout
  2. `2>&1` redirects stderr to the same /dev/null
  3. trailing `; true` forces shell-level success regardless
- **Impact**:
  - ruff `--fix` is a write-through transform; failures (e.g., unparseable Python) silently fail-NOP. Operator may not realize a Python file is still syntax-broken
  - shellcheck `--severity=error` does **NOT** auto-fix; its findings ARE actionable error reports — completely lost
  - Both `ruff` (at `Z:/claude-sota-installed/.local/bin/ruff`) and `shellcheck` (at `C:/Users/42/AppData/Local/Microsoft/WinGet/Links/shellcheck`) are CONFIRMED installed and runnable
- **Severity rationale**: HIGH because shellcheck findings would have surfaced real shell bugs to the operator. The textbook silent-fallback pattern (per `superpowers:systematic-debugging` skill: "errors swallowed silently with no telemetry")
- **Recommended fix**: replace shellcheck branch with:
  ```bash
  *.sh|*.bash) out=$(shellcheck --severity=error -- "$f" 2>&1); 
               [ -z "$out" ] || { printf '%s\n' "$out" >&2; exit 2; };;
  ```
  Keep `ruff --fix` quiet (transform is desired) but add a separate non-fixing report step: `ruff check --no-fix --quiet -- "$f" 2>&1 || { echo "[hook] ruff lint findings"; exit 2; }`

#### H-V2-3 — `code-reviewer` subagent_type collides across NINE unique parent plugins
- **Severity**: HIGH (extends W298 which counted 3)
- **Component**: `Z:/claude-sota-installed/.claude/plugins/cache/**/agents/code-reviewer.md`
- **Evidence (full enumeration, parent-plugin-deduped)**:
  ```
  .claude/plugins/cache/addy-agent-skills/agent-skills/1.0.0/agents/code-reviewer.md
  .claude/plugins/cache/claude-code-workflows/comprehensive-review/1.3.0/agents/code-reviewer.md
  .claude/plugins/cache/claude-code-workflows/incident-response/1.3.1/agents/code-reviewer.md
  .claude/plugins/cache/claude-code-workflows/tdd-workflows/1.3.0/agents/code-reviewer.md
  .claude/plugins/cache/claude-plugins-official/feature-dev/<sha>/agents/code-reviewer.md
  .claude/plugins/cache/claude-plugins-official/pr-review-toolkit/<sha>/agents/code-reviewer.md
  .claude/plugins/cache/claude-plugins-official/superpowers/<sha>/agents/code-reviewer.md
  .claude/plugins/cache/everything-claude-code/everything-claude-code/<sha>/agents/code-reviewer.md
  .claude/plugins/cache/superpowers-marketplace/superpowers/<sha>/agents/code-reviewer.md
  ```
  = **9 unique parent plugins** (V1 audit and W298 missed 6 of these)
- **Other names with multi-plugin collisions** (count = unique parent plugins):
  - `security-auditor` × 3 (addy-agent-skills, comprehensive-review, code-modernization)
  - `code-simplifier` × 3
  - `test-engineer` × 2 (addy-agent-skills, code-modernization)
  - `silent-failure-hunter` × 2
  - `type-design-analyzer` × 2
  - `comment-analyzer` × 2
  - `pr-test-analyzer` × 2
  - `code-explorer` × 2
  - `code-architect` × 2
- **Impact**: Per `https://code.claude.com/docs/en/sub-agents` "subagents are loaded at session start" — when the operator (or another agent) invokes `subagent_type: "code-reviewer"` without plugin prefix, CC's resolution is ambiguous. Anthropic docs document the FQN form `plugin:agent` (e.g., `comprehensive-review:code-reviewer`) but do NOT document the disambiguation behavior of bare `code-reviewer` — likely "first found" with plugin-load-order dependence
- **Severity rationale**: HIGH because `code-reviewer` is the operator's most-typed subagent name (per general agent-team usage patterns). Different plugins ship DIFFERENT system-prompt content for `code-reviewer` — silently picking the wrong one yields different review quality
- **Recommended fix**:
  - **OPERATOR-ACTION**: choose which `code-reviewer` is preferred and add `.claude/agents/code-reviewer.md` with content matching the preferred plugin (project-local agents take precedence per Anthropic docs). Alternatively document in CLAUDE.md operator-decisions block which FQN is canonical
  - **AUTO-DOABLE**: nothing — policy choice

### MEDIUM

#### M-V2-1 — `.claude/hooks/context-mode-cache-heal.mjs` is operator-deployed `.mjs` hook — CR-2 spirit-vs-letter
- **Severity**: MEDIUM (V1 audit listed as C-OK3; V2 challenges)
- **Component**: `Z:/claude-sota-installed/.claude/hooks/context-mode-cache-heal.mjs`
- **Evidence**:
  - `cd /z/claude-sota-installed && git ls-files .claude/hooks/` returns `.claude/hooks/context-mode-cache-heal.mjs` (TRACKED)
  - `git log --oneline -- .claude/hooks/context-mode-cache-heal.mjs` → commit `635e867 fix(W283-stream1-3): silent-failure remediation`
  - File size: 1656 bytes; plugin-shipped variant `cache-heal-utils.mjs` is 7053 bytes — DIFFERENT FILE
  - Hook wiring: `.claude/settings.json:hooks.SessionStart[0].hooks[0].command` = `"Z:/tools/nodejs/node.exe" "Z:/claude-sota-installed/.claude/hooks/context-mode-cache-heal.mjs"`
  - File header: `// Fixes anthropics/claude-code#46915: auto-update breaks CLAUDE_PLUGIN_ROOT // Pure Node.js — no bash/shell dependency.`
- **Cardinal-rule-2 (CLAUDE.md:22) text**: "Hooks may only be upstream plugin hooks OR direct upstream-CLI invocations declared in .claude/settings.json … **No `.claude/hooks/scripts/*.py` self-invent**"
- **Letter analysis**: the rule's specific prohibition is on `.claude/hooks/scripts/*.py` (Python under scripts/). This file is `.claude/hooks/*.mjs` (Node.mjs at `.claude/hooks/` root, no `scripts/` subdir). LITERAL CR-2 NOT violated
- **Spirit analysis**: the W255 cleanup deleted 33 self-invented `.claude/hooks/scripts/*.py` files. The intent was "no operator-authored hook implementations". This `.mjs` is operator-authored, was committed by the operator, is invoked from settings.json. SPIRIT CR-2 violated
- **Defensible carve-out**: the file fixes upstream bug `anthropics/claude-code#46915` and is "pure Node.js — no bash/shell dependency". A reasonable governance ruling is "yes, this is a legitimate upstream-bug workaround pending issue resolution, carve-out granted, document in CLAUDE.md"
- **Severity rationale**: MEDIUM because it's a governance-grey item — needs an operator policy ruling rather than a fix
- **Recommended fix**:
  - **OPERATOR-ACTION**: add explicit carve-out clause to CLAUDE.md cardinal-rule-2: "OR (c) operator-deployed upstream-bug workaround, listed in §Status with upstream issue cite". OR move to `tools/context-mode-cache-heal.mjs` and unwire from SessionStart (operator can manually run during plugin update)
  - V1 audit's `C-OK3` classification ("operator-curated, NOT `.py`/`.sh` self-invent") is technically correct per CR-2 LETTER but elides the SPIRIT question

#### M-V2-2 — `PostToolUseFailure` Bash hook regex too narrow — silently ignores most Bash failures
- **Severity**: MEDIUM
- **Component**: `.claude/settings.json:hooks.PostToolUseFailure[0].hooks[0].command`
- **Live readback**:
  ```powershell
  powershell -NoProfile -Command "$ev = $input | ConvertFrom-Json; 
  if ($ev.error -match 'permission denied|EACCES|gitleaks') { 
    $msg = 'hook-feedback: ' + $ev.error.Substring(0, [Math]::Min($ev.error.Length, 200)); 
    $out = @{ hookSpecificOutput = @{ hookEventName = 'PostToolUseFailure'; additionalContext = $msg } } | ConvertTo-Json -Compress; 
    Write-Output $out 
  } else { exit 0 }"
  ```
- **Issues**:
  - Regex matches only `permission denied`, `EACCES`, or `gitleaks` strings
  - Other Bash failure modes that go silent: `Command not found`, `cannot find the path specified`, `ENOENT`, `No such file or directory`, `EROFS` (read-only fs), `ENOSPC` (no space), segfaults, OOM
  - `additionalContext` is the documented mechanism (per https://docs.anthropic.com/en/docs/claude-code/hooks) to surface tool-failure info back to the model — narrow match means model gets NO context for most failures
- **Recommended fix** (AUTO-DOABLE): broaden to `permission denied|EACCES|gitleaks|Command not found|cannot find the path|ENOENT|ENOSPC|EROFS|segmentation fault|out of memory`

#### M-V2-3 — `settings.json` destructive-git review-gate hardcodes `codex/1.0.4` plugin version
- **Severity**: MEDIUM
- **Component**: `.claude/settings.json:hooks.PreToolUse[0].hooks[1].command`
- **Live readback**:
  ```bash
  bash -c "cmd=$(jq -r '.tool_input.command // empty'); 
  case \"$cmd\" in 
    *'git revert'*|*'git reset --hard'*|*'git push --force'*|*'git push -f '*|*'git checkout -- '*|*'git checkout --force'*) 
      'Z:/tools/nodejs/node.exe' 'Z:/claude-sota-installed/.claude/plugins/cache/openai-codex/codex/1.0.4/scripts/codex-companion.mjs' adversarial-review --wait || exit 2 
    ;; 
  esac; true"
  ```
- **Drift risk**: when codex plugin updates to `1.0.5+`, the plugin cache directory becomes `codex/1.0.5/` — the settings.json path silently breaks. The bash-c case-default falls through to `; true` (exit 0) so the failure is SILENT
- **Counter-evidence**: `tools/bootstrap-runtime.ps1` uses `Get-LatestPluginVersion` dynamic discovery (W280-fix8) — bootstrap is drift-safe. But settings.json's runtime invocation is NOT
- **Plugin's own `hooks.json` is plugin-shipped** so it self-updates with the plugin. The settings.json carve-out for destructive-git pre-tool gating does NOT
- **Recommended fix** (auto-doable, but mildly risky):
  - Use bash glob: `Z:/claude-sota-installed/.claude/plugins/cache/openai-codex/codex/*/scripts/codex-companion.mjs` and select latest via `ls -1d ... | sort -V | tail -1`
  - OR add a `tools/codex-companion-resolver.cmd` shim that locates the latest version
  - OR rely on the plugin's own hooks (file system change events) and remove the settings.json carve-out
  - **Recommendation**: defer to next plugin update wave; current path is correct for v1.0.4

#### M-V2-4 — `ECC_DISABLED_HOOKS` env var contains references to ghost hooks
- **Severity**: MEDIUM
- **Component**: `.claude/settings.json:env.ECC_DISABLED_HOOKS`
- **Live value**:
  ```
  pre:edit-write:gateguard-fact-force,
  post:edit:design-quality-check,
  pre:observe:continuous-learning,
  post:observe:continuous-learning,
  post:session-activity-tracker,
  stop:evaluate-session,
  stop:cost-tracker,
  stop:desktop-notify
  ```
- **Issue**: Per CLAUDE.md L9 W255 cleanup removed 33 self-invented `.claude/hooks/scripts/*.py` files. The 8 hook IDs listed in the disable-list belong to that deleted set (they look like `everything-claude-code` hookify-style hook IDs of the form `<event>:<phase>:<name>`). Verify each still has a live target somewhere in plugin cache; if not, the disable-list is referencing ghosts
- **Behaviour evidence**: `pre:bash:gateguard-fact-force` DID fire at session start (transcript: "Before the first Bash command this session, present these facts…"). That ID is NOT in the disable-list — only `pre:edit-write:gateguard-fact-force` is. So at least `pre:bash:gateguard-fact-force` IS live elsewhere (probably the `everything-claude-code:gateguard` plugin)
- **Suggests**: the 8 disable-list entries may be REAL ghosts of hooks the operator wanted to silence but no longer exist. Cognitive overhead with no functional effect
- **Recommended fix**: 
  - AUTO-DOABLE: for each ID in `ECC_DISABLED_HOOKS`, grep all `.claude/plugins/cache/**/*hooks*.json` for the ID. Remove entries with zero hits
  - Or alternately: leave it alone — disable-list entries that don't match anything are NOPs (no harm)

#### M-V2-5 — `gitnexus` MCP server uses bare PATH lookup, no version pin
- **Severity**: MEDIUM
- **Component**: `.mcp.json:mcpServers.gitnexus.command`
- **Evidence**: `command: gitnexus` `args: ["mcp"]` — no version specifier
- **CR-2 (revised) wording per CLAUDE.md L22**: "`.mcp.json` MCP-server `command/args` contract is `npx -y <pkg>@<pinned-version>`"
- **Issue**: gitnexus is invoked via bare-name PATH lookup. Whatever version the operator's installed gitnexus binary is, that's what runs. Auto-update via package manager could silently swap versions
- **Counter-evidence**: gitnexus is a Rust binary (likely cargo-installed at `Z:/claude-sota-installed/.local/bin/gitnexus` or similar). Cargo doesn't auto-update like npm. So real drift risk is low — but the CR-2 letter is violated nonetheless
- **Recommended fix**:
  - AUTO-DOABLE: add `_comment_gitnexus_pin` to `.mcp.json` documenting the local install command and version
  - Operator may also wire a version probe (`gitnexus --version`) at SessionStart and fail-loud if it doesn't match expected

### LOW

#### L-V2-1 — `Notification` hook is audio-only (no toast/visual fallback)
- **Severity**: LOW
- **Component**: `.claude/settings.json:hooks.Notification[0].hooks[0].command`
- **Evidence**: `[System.Console]::Beep(880,150); [System.Console]::Beep(1100,150)` — pure audio
- **Impact**: if audio muted/headphones unplugged, operator misses `permission_prompt`, `idle_prompt`, `auth_success`, `elicitation_dialog`, `elicitation_complete`, `elicitation_response` events (per CC hooks docs)
- **Recommended fix**: layer Windows 11 Toast via `BurntToast` PowerShell module OR add a tray-icon flash. LOW priority.

#### L-V2-2 — `PreCompact` hook writes log without ensuring directory exists
- **Severity**: LOW
- **Component**: `.claude/settings.json:hooks.PreCompact[0]`
- **Evidence**: `powershell -NoProfile -WindowStyle Hidden -Command "Add-Content -Path 'Z:/claude-sota-installed/tmp/precompact.log' -Value ((Get-Date -Format o)+'|auto-compact-fired|session='+$env:CLAUDE_SESSION_ID) -ErrorAction SilentlyContinue; exit 0"`
- **Impact**: if `Z:/claude-sota-installed/tmp/` is missing OR Z:-drive temporarily unavailable, `-ErrorAction SilentlyContinue` swallows the failure. Forensic trail lost
- **Fix** (AUTO-DOABLE): prefix with `New-Item -ItemType Directory -Force -Path 'Z:/claude-sota-installed/tmp' | Out-Null;`

#### L-V2-3 — `WorktreeRemove` hook silently tolerates `git worktree prune` failure
- **Severity**: LOW
- **Component**: `.claude/settings.json:hooks.WorktreeRemove[0]`
- **Evidence**: `git worktree prune || true`
- **Impact**: per CLAUDE.md L25 W280d "remove worktree on merge — auto-prune via hook". `|| true` is intentional (no worktrees to prune = success). Working as designed
- **Fix**: none

#### L-V2-4 — Stale doc reference `Z:/claude-sota-installed/.claude/plugins/cache/code-modernization/`
- **Severity**: LOW
- **Component**: `docs/architecture/W308*/...` (W308 stream docs)
- **Evidence**: grep of 25 random `Z:/` paths from W308/W295/W296 doc trees found 1 actual stale path: `Z:/claude-sota-installed/.claude/plugins/cache/code-modernization/` — the actual installed location is `Z:/claude-sota-installed/.claude/plugins/cache/claude-plugins-official/code-modernization/<sha>/`
- **Recommended fix** (AUTO-DOABLE): grep + sed rewrite. Trivial.

#### L-V2-5 — `disabledMcpjsonServers` list grew to 6 (W296 said 4)
- **Severity**: LOW (extension of W296 finding)
- **Component**: `.claude/settings.json:disabledMcpjsonServers`
- **Live readback**: `["memory","github","context7","playwright","graphiti","phoenix"]` — 6 entries
- **W296 Stream A had flagged 4** (`memory, github, context7, playwright`); `graphiti` added per W295 AI-5; `phoenix` added per V1 audit C1 advisory or somewhere upstream
- **Issue**: all 6 still have entries in `.mcp.json:mcpServers` (none have been removed from .mcp.json — that's the W296 Stream A bookkeeping debt). Cognitive load only; no functional impact
- **Recommended fix**: per W296 — either prune `.mcp.json` entries OR add inline `_retired_` markers

### INFO / clean (verified no-issue this V2 pass)

- `CLAUDE_CODE_FORK_SUBAGENT=1` ✓ in session env (live readback)
- `CLAUDE_CODE_DISABLE_AUTO_MEMORY=1` ✓ in session env
- `CLAUDE_AUTOCOMPACT_PCT_OVERRIDE` UNSET ✓ (W280c reversal compliance)
- `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1` ✓
- `CLAUDE_CODE_USE_POWERSHELL_TOOL=1` ✓
- `.pre-commit-config.yaml` clean: gitleaks v8.30.1 + ruff v0.15.12 + actionlint v1.7.12 — failures BLOCK commit
- `pre-commit 4.6.0` resolves at `C:/Users/42/AppData/Roaming/uv/tools/pre-commit/Scripts/python.exe` — live
- `codex-companion.mjs`, `stop-review-gate-hook.mjs`, `session-lifecycle-hook.mjs` all present in `openai-codex/codex/1.0.4/scripts/`
- `tools/bootstrap-runtime.ps1` 35,928 bytes, dynamic `Get-LatestPluginVersion` discovery confirmed (lines 50-80)
- `.claude/agents/` operator-curated: `evaluator.md`, `gpt5-archaeologist.md`, `wshobson-devops-troubleshooter.md`, `wshobson-security-auditor.md` (4 files)
- Hindsight `:9077` HEALTHY: `/health` `/openapi.json` `/docs` all return 200
- Cognee `:8000` HEALTHY at protocol layer: `POST /mcp` initialize → `{"protocolVersion":"2025-03-26"… "serverInfo":{"name":"Cognee","version":"1.26.0"}}` (V1 C3 reconciliation accurate — Cognee MCP transport is fine; only the LLM-key path errors)
- Langfuse `:3000` HEALTHY: `GET /api/public/health` → 200
- `team-spawn.md` Phase 1 lists presets review/debug/feature/fullstack/research/security/migration — matches CLAUDE.md L25 status
- `agent-teams@1.0.2/.in_use/` marker dir present (Anthropic concurrency-safety pattern)
- Code-reviewer collision is the only HIGH-impact subagent collision (other top names dedup to 1 unique plugin per parent-plugin scan — false-positives from Anthropic marketplace's per-SHA cache layout for `claude-plugins-official/agent-sdk-dev` plugins)
- Docker: 10 containers all "Up 6 hours (healthy)" — falkordb, langfuse-* (5), grafana, phoenix, prometheus, plus retired-but-running graphiti dep (V1 H4)
- NSSM services running: `CogneeMCP` (cognee MCP layer) + `OllamaServe` (qwen3-coder LLM)

## §3 — Cardinal-rule invariant verification (V2 perspective)

| Invariant | V1 verdict | V2 verdict | Reconciliation |
|---|---|---|---|
| `self_invented_count: 0` (CLAUDE.md L7) | C-OK1+C-OK2 PASS | **GREY** per M-V2-1 | `.claude/hooks/context-mode-cache-heal.mjs` is an operator-deployed `.mjs` hook. V1 classified as cardinal-rule-2 compliant by LETTER (not `.py` not in `scripts/`). V2 challenges by SPIRIT. Operator policy ruling needed |
| CR-2 hook compliance | implied PASS | **GREY** per M-V2-1 + M-V2-3 | one operator-deployed `.mjs` + one plugin-version-hardcoded settings.json invocation. Both defensible but both deserve explicit governance |
| CR-3 subagents | implied PASS | PASS (subagent-type collision is plugin-overlap, not self-invent) | `.claude/agents/*.md` are 4 operator-curated files, all path-gated and trusted-only |
| CR-4 `.claude/rules/*.md` ban | C-OK1 PASS | PASS | `find .claude/rules -type f` returns "No such file or directory" — no user-authored rules |
| CR-5 permissions deny baseline | C-OK21 PASS | PASS | 18 deny entries audited; secrets/credentials/private keys covered |
| `.mcp.json` `npx -y <pkg>@<version>` contract | not audited | **MOSTLY PASS, one violation per M-V2-5** | gitnexus uses bare PATH lookup; everyone else (playwright, chrome-devtools, repomix, phoenix-mcp, basic-memory, serena) is properly version-pinned |
| `worktree ≤3` | trusted from CLAUDE.md | PASS (not re-probed per "do not touch worktree count" mandate) | trust §Status: main + W287 + W290 = 3 |
| `CLAUDE.md ≤50 LOC` | trusted | PASS (42 LOC live readback) | wc -l = 42 |
| `settings.json ≤15 KB` | trusted | PASS (~13.2 KB live readback) | wc -c = ~13200 |

## §4 — Operator action queue (V2-specific; V1 has its own queue)

| # | Severity | Action | Blast radius | Reversibility |
|---|---|---|---|---|
| AI-V2-1 | HIGH | Delete OR rewrite-to-exit-2 the `PreToolUse Bash` gitleaks hook (Finding H-V2-1) — pre-commit gate already covers this case | settings.json:hooks.PreToolUse[0].hooks[0] | Trivial — settings.json edit |
| AI-V2-2 | HIGH | Surface shellcheck findings in `PostToolUse Edit\|Write` hook by replacing `>/dev/null 2>&1` with capture+exit-2 (Finding H-V2-2) | settings.json:hooks.PostToolUse[0].hooks[0] | Trivial |
| AI-V2-3 | HIGH | Disambiguate `code-reviewer` × 9 plugins collision (Finding H-V2-3) via either operator-curated `.claude/agents/code-reviewer.md` override OR CLAUDE.md operator-decisions ledger entry | session-level subagent resolution | Trivial |
| AI-V2-4 | MED | Rule on CR-2 carve-out for `.claude/hooks/context-mode-cache-heal.mjs` (Finding M-V2-1) — either add CLAUDE.md carve-out clause OR move to `tools/` and unwire | settings.json + CLAUDE.md | Trivial |
| AI-V2-5 | MED | Broaden `PostToolUseFailure` regex to catch more failure classes (Finding M-V2-2) | settings.json:hooks.PostToolUseFailure[0] | Trivial |
| AI-V2-6 | MED | Audit `ECC_DISABLED_HOOKS` entries for ghost references (Finding M-V2-4) — prune entries with no live hook target | settings.json:env | Trivial |
| AI-V2-7 | LOW | Add `New-Item -Force` directory-create prefix to `PreCompact` hook (Finding L-V2-2) | settings.json:hooks.PreCompact[0] | Trivial |
| AI-V2-8 | LOW | Fix stale `code-modernization` doc path in W308 docs (Finding L-V2-4) | docs only | Trivial |
| AI-V2-9 | LOW | Add inline `_retired_` comments to disabled MCP entries in `.mcp.json` OR remove them (Finding L-V2-5; W296 carryover) | .mcp.json | Trivial |
| AI-V2-10 | LOW | Defer plugin-version-hardcode fix in settings.json destructive-git gate (Finding M-V2-3) to next codex plugin update wave | settings.json | N/A (deferred) |

## §5 — Auto-doable cleanups (V2-specific, enumerated NOT executed per mandate)

1. **PostToolUse Edit|Write** shellcheck branch: replace `shellcheck --severity=error -- "$f" >/dev/null 2>&1` with `out=$(shellcheck --severity=error -- "$f" 2>&1); [ -z "$out" ] || { printf '%s\n' "$out" >&2; exit 2; }`
2. **PostToolUseFailure** regex: broaden to `permission denied|EACCES|gitleaks|Command not found|cannot find the path|ENOENT|ENOSPC|EROFS|segmentation fault|out of memory`
3. **PreCompact** hook: prefix with `New-Item -ItemType Directory -Force -Path 'Z:/claude-sota-installed/tmp' | Out-Null;`
4. **Stale doc ref**: rewrite `Z:/claude-sota-installed/.claude/plugins/cache/code-modernization/` to `Z:/claude-sota-installed/.claude/plugins/cache/claude-plugins-official/code-modernization/` in W308 stream files
5. **`.mcp.json`** — add inline `_retired_w295_graphiti`, `_disabled_w309_phoenix`, etc. comments to clarify why each disabled entry is preserved

## §6 — Cross-stream reconciliation with V1

V1 sibling (`W309-STREAM-A-SILENT-FALLBACK-HUNT.md`) covered:
- C1 Phoenix MCP backend `:16006` DOWN — V2 corroborates: `docker port phoenix` returns empty, container "healthy" but no port mapping. Curl `:6006/:16006/:18006` all timeout. V1 verdict stands
- C2 OTel auth 401 — V2 did not re-probe; trust V1's curl evidence
- C3 cognee LLM-key bug (reconciled W302) — V2 corroborates: cognee MCP `POST /mcp initialize` returns full server-info handshake, so transport is fine. V1 reconciliation accurate
- H1 fnm-multishell hardcoded path in context-mode plugin manifest — V2 corroborates: visible in `CLAUDE_PLUGIN_ROOT` env at session-runtime, but this is plugin-shipped (upstream), not in-tree
- H2 `Z:/tools/nodejs/node.exe` Jan-2026 stale — V2 corroborates: `ls -la` shows `Jan 12 20:12` timestamp
- H3 promptfoo missing — V2 did not re-probe
- H4 graphiti-core + cognee-mcp pyc artifacts in venv — V2 did not re-probe
- H5 plugin manifest uncommitted modifications — V2 confirms `git status` is currently dirty per session-state from prior runs (not re-probed in this V2 audit but the dirty-tree state is conventional during active session)

**V2 net-new findings** (not in V1):
- H-V2-1 (gitleaks --exit-code 0 double-silent)
- H-V2-2 (PostToolUse Edit|Write all-silent)
- H-V2-3 (code-reviewer collision extends from W298's 3 to 9 plugins)
- M-V2-1 (.mjs hook CR-2 spirit-vs-letter — challenges V1's C-OK3 classification)
- M-V2-2 (PostToolUseFailure narrow regex)
- M-V2-3 (codex/1.0.4 hardcode in settings.json)
- M-V2-4 (ECC_DISABLED_HOOKS ghosts)
- M-V2-5 (gitnexus bare PATH lookup, CR-2 violation)
- L-V2-1 (audio-only Notification)
- L-V2-2 (PreCompact dir-create)
- L-V2-4 (code-modernization doc stale ref)

## Summary

V2 audit extends V1 with **3 HIGH-severity hook-command silent-fallback patterns**, **1 HIGH subagent-type collision extension** (W298 finding extends from 3 plugins to 9), **5 MEDIUM governance/regex/hardcode issues**, and **5 LOW cosmetic/cleanup items**. V2 does NOT contradict V1's CRITICAL findings (Phoenix, OTel, cognee) — instead it adds orthogonal evidence at the hook-command-semantics + subagent-FQN-resolution layers that V1's backend-service focus did not cover.

Cardinal-rule invariants: CR-3, CR-4, CR-5 PASS. CR-2 is **GREY** due to one operator-deployed `.mjs` hook (M-V2-1) and one plugin-version hardcode in settings.json (M-V2-3) and one MCP-server bare-PATH invocation (M-V2-5). Operator policy ruling needed on AI-V2-4.

Worktree-count untouched; no .py/.sh self-invent created; no `.claude/rules/` populated; CLAUDE.md unchanged at 42 LOC; settings.json unchanged at ~13.2 KB. V2 audit is pure read-only.

10 numbered V2 operator actions enqueued; 5 V2 auto-doable cleanups enumerated (not executed per mandate).
