# W317 Stream C — Env-Override Architecture (prevent phantom `Z:\z\` writes)

**Scope**: Catalog every env var per plugin that controls path/data-dir resolution → design 3-layer enforcement set.

## Root-cause recap

Git Bash on startup runs `/etc/profile` which executes `export HOME="$(cygpath -u "${USERPROFILE:-$HOME}")"` — converting `HOME=Z:\claude-sota-installed` → `HOME=/z/claude-sota-installed`. **`MSYS2_ENV_CONV_EXCL=*` does NOT suppress this** (it only suppresses MSYS's own env conversion, not bash startup script logic). Any plugin that reads `HOME` / `os.homedir()` / `os.path.expanduser("~")` gets the POSIX form; on Windows `path.resolve()` / `pathlib` then mangle `/z/foo` → `Z:\z\foo`. Closes Wave-50-Fire-42 carry-over + W317-A patch's secondary scope.

## Per-plugin env-var table

| Plugin | Var | Controls | Default (broken) | Proposed override |
|---|---|---|---|---|
| **ECC** | `process.env.HOME` (via `getHomeDir()` → `getClaudeDir()` → `getHomunculusDir()`) | `~/.claude/homunculus/{projects,instincts}` | `/z/claude-sota-installed/.claude/homunculus` | `HOME=Z:\claude-sota-installed` (settings.json env — CC propagates) |
| **ECC** | `GATEGUARD_STATE_DIR` (else `HOME ‖ USERPROFILE ‖ /tmp` + `/.gateguard`) | gateguard hook state | `/z/claude-sota-installed/.gateguard` | `GATEGUARD_STATE_DIR=Z:\claude-sota-installed\.claude\state\gateguard` |
| **ECC** | `ECC_SESSION_RECORDING_DIR` | session recordings (rare; default off) | unset → home-derived | `ECC_SESSION_RECORDING_DIR=Z:\claude-sota-installed\.claude\session-data\recordings` |
| **ECC** | `AUDIT_ROOT` | harness-audit.js | `HOME`-derived | `AUDIT_ROOT=Z:\claude-sota-installed` |
| **ECC** | `mcp-health-check.js: os.homedir()` (HARDCODED, no env override) | `~/.claude/mcp-health-cache.json` | `/z/.../mcp-health-cache.json` | **only fixed by `HOME` override** — needs upstream PR for explicit env |
| **codex** | `CLAUDE_PLUGIN_DATA` (note: NOT `…_DIR`, per `scripts/lib/state.mjs:9`) | `resolveStateDir()` → `<plugin_data>/state/<slug>-<hash>` | `os.tmpdir()/codex-companion` (FALLBACK only) | `CLAUDE_PLUGIN_DATA=Z:\claude-sota-installed\.claude\plugins\data` |
| **codex** | `CODEX_HOME` | codex auth + history | `~/.codex` | already set in `eee.ps1` to `Z:/claude-sota-installed-state/.codex` ✓ |
| **codex** | `CLAUDE_PROJECT_DIR` | workspace resolution | CC-set | already CC-managed ✓ |
| **hindsight** | `CLAUDE_PLUGIN_DATA` (`scripts/lib/state.py:_state_dir()`) | `<plugin_data>/state/` | `~/.claude/plugins/data/hindsight-memory` → `/z/.../data/hindsight-memory` | same as codex — `CLAUDE_PLUGIN_DATA=Z:\claude-sota-installed\.claude\plugins\data` (shared) |
| **hindsight** | `os.path.expanduser("~/.claude/settings.json")` (scripts/setup_hooks.py:16) | setup-time only | `/z/.../settings.json` | only setup; not runtime — `HOME` override covers it |
| **hindsight** | `HINDSIGHT_API_*` (LLM provider/model/keys) | runtime config (already set in `settings.json`) | — | non-path, no change |
| **claude-mem** | `CLAUDE_MEM_DATA_DIR` | explicit data dir | `~/.claude-mem/` | `CLAUDE_MEM_DATA_DIR=Z:\claude-sota-installed\.claude\plugins\data\claude-mem` (currently `enabled:false`, but pre-wire) |
| **claude-mem** | `CLAUDE_CONFIG_DIR` (already set) | fallback config dir | — | no change ✓ |
| **claude-mem** | `CLAUDE_PLUGIN_ROOT` | bootstrap (has `cygpath -w` fallback) | — | safe via W317-A patch + plugin's own defensive logic ✓ |
| **ralph-loop** | `RALPH_STATE_FILE` (hardcoded relative `.claude/ralph-loop.local.md`) | loop state | — | non-issue, project-relative ✓ |

**Net new env vars to add: 4 critical (`HOME`, `USERPROFILE`, `CLAUDE_PLUGIN_DATA`, `GATEGUARD_STATE_DIR`) + 3 belt-suspenders (`AUDIT_ROOT`, `CLAUDE_MEM_DATA_DIR`, `ECC_SESSION_RECORDING_DIR`).**

## CC's own canonical env vars (CC-set — already correct in settings.json/eee.ps1)

`CLAUDE_PLUGIN_ROOT`, `CLAUDE_PROJECT_DIR`, `CLAUDE_CONFIG_DIR`, `CLAUDE_CODE_PROJECT_DIR`, `CLAUDE_CODE_TMPDIR`, `CLAUDE_CODE_PLUGIN_CACHE_DIR`, `CLAUDE_CODE_DEBUG_LOGS_DIR`, `CODEX_HOME`. **No new CC-prefixed vars needed.**

## Layer 1 — `.claude/settings.json` env block additions (CC propagates to all hook subprocesses)

```json
{
  "env": {
    "HOME": "Z:\\claude-sota-installed",
    "USERPROFILE": "Z:\\claude-sota-installed",
    "CLAUDE_PLUGIN_DATA": "Z:\\claude-sota-installed\\.claude\\plugins\\data",
    "GATEGUARD_STATE_DIR": "Z:\\claude-sota-installed\\.claude\\state\\gateguard",
    "AUDIT_ROOT": "Z:\\claude-sota-installed",
    "CLAUDE_MEM_DATA_DIR": "Z:\\claude-sota-installed\\.claude\\plugins\\data\\claude-mem",
    "ECC_SESSION_RECORDING_DIR": "Z:\\claude-sota-installed\\.claude\\session-data\\recordings"
  }
}
```

**CAVEAT**: settings.json env DOES propagate to subprocesses, but `bash -c` resets `HOME` via `/etc/profile`. To suppress that bash-startup override, also add `BASH_ENV` pointing to a one-line override:

```json
"BASH_ENV": "Z:/claude-sota-installed/.claude/state/bash-home-pin.sh"
```

With `bash-home-pin.sh` content: `export HOME="$USERPROFILE"; export ECC_HOME="$USERPROFILE"` — re-pins HOME to Windows form post-`/etc/profile`. (≤ 60 bytes; cardinal-rule-2-compliant as ≤2 KB bug-patch shim.)

## Layer 2 — `tools/eee.ps1` PowerShell launcher additions (parent-process layer)

Append after section `(f) State-outside-repo redirects`, before `(g)`:

```powershell
# ============================================================================
# (f3) W317-Stream-C 2026-05-19 — plugin data-dir overrides preventing phantom
# Z:\z\ writes. Git Bash auto-converts HOME=Z:\... → HOME=/z/... on /etc/profile;
# plugin readers of HOME/os.homedir()/expanduser('~') then write to mangled paths
# via Node path.resolve('/z/foo') = 'Z:\z\foo' on win32. Setting explicit data-dir
# env vars bypasses HOME entirely. settings.json:env mirror is authoritative
# for CC-spawned subprocesses; eee.ps1 mirror is for parent-shell visibility.
# Cite: docs/architecture/W317-FULL-MSYS-FIX-WAVE/STREAM-C-ENV-OVERRIDE-ARCHITECTURE.md
# ============================================================================
$env:CLAUDE_PLUGIN_DATA       = 'Z:\claude-sota-installed\.claude\plugins\data'
$env:GATEGUARD_STATE_DIR      = 'Z:\claude-sota-installed\.claude\state\gateguard'
$env:AUDIT_ROOT               = 'Z:\claude-sota-installed'
$env:CLAUDE_MEM_DATA_DIR      = 'Z:\claude-sota-installed\.claude\plugins\data\claude-mem'
$env:ECC_SESSION_RECORDING_DIR = 'Z:\claude-sota-installed\.claude\session-data\recordings'

# Ensure dirs exist (CC won't auto-create them)
foreach ($dir in @($env:CLAUDE_PLUGIN_DATA, $env:GATEGUARD_STATE_DIR,
                   $env:CLAUDE_MEM_DATA_DIR, $env:ECC_SESSION_RECORDING_DIR)) {
    if (-not (Test-Path $dir)) {
        New-Item -ItemType Directory -Path $dir -Force | Out-Null
    }
}
```

## Layer 3 — `CLAUDE.local.md` ENV block addition (operator documentation)

Insert after `# (f2) W268 codex T3 P0-security: ...` block:

```powershell
# (f3) W317-Stream-C 2026-05-19 — plugin data-dir overrides preventing phantom Z:\z\.
# Git Bash converts HOME=Z:\foo → /z/foo on bash startup; plugins reading HOME write
# to mangled paths. Setting explicit data-dir env bypasses HOME entirely.
# Authoritative copy in .claude/settings.json:env (CC propagates to hook subprocesses).
$env:CLAUDE_PLUGIN_DATA       = 'Z:\claude-sota-installed\.claude\plugins\data'
$env:GATEGUARD_STATE_DIR      = 'Z:\claude-sota-installed\.claude\state\gateguard'
$env:AUDIT_ROOT               = 'Z:\claude-sota-installed'
$env:CLAUDE_MEM_DATA_DIR      = 'Z:\claude-sota-installed\.claude\plugins\data\claude-mem'
$env:ECC_SESSION_RECORDING_DIR = 'Z:\claude-sota-installed\.claude\session-data\recordings'

# (f4) BASH_ENV shim — re-pins HOME post /etc/profile to suppress Git Bash's
# /z/ POSIX conversion. ≤60 byte one-liner; cardinal-rule-2-compliant.
$env:BASH_ENV = 'Z:/claude-sota-installed/.claude/state/bash-home-pin.sh'
```

## Outstanding upstream PRs needed

1. **ECC** `affaan-m/everything-claude-code` — add `ECC_HOME` / `ECC_CLAUDE_DIR` env var to override `getHomeDir()` resolution; fix `mcp-health-check.js`, `post-bash-command-log.js`, `evaluate-session.js` which hardcode `os.homedir()`.
2. **hindsight** `vectorize-io/hindsight` — `setup_hooks.py` uses `os.path.expanduser("~")` at install-time (one-shot, low impact, but cosmetic fix).

## Verification probe (post-apply)

```bash
echo '{}' | "Z:/tools/nodejs/node.exe" -e "console.log('HOME=', process.env.HOME, ' homedir=', require('os').homedir())"
# Expected: HOME= Z:\claude-sota-installed  homedir= Z:\claude-sota-installed
```

```bash
ls "Z:/z/claude-sota-installed/.claude/homunculus/" 2>&1 | head -3  # before
# (Run a session)
ls "Z:/z/claude-sota-installed/.claude/homunculus/" 2>&1 | head -3  # after — should NOT have new mtime
```

---

**Report-back**: 7 net env vars added across 3 layers (settings.json env-block + eee.ps1 + CLAUDE.local.md), of which `HOME` + `USERPROFILE` are master-knobs and `CLAUDE_PLUGIN_DATA` covers codex + hindsight jointly; **most-fixable plugin = codex** (single env `CLAUDE_PLUGIN_DATA` defends fully — already has fallback logic), **least-fixable = ECC** which hardcodes `os.homedir()` in 3+ hook files and requires upstream PR for a clean fix.
