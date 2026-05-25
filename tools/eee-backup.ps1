#Requires -Version 7.0
# TODO W344: validate Set-StrictMode -Version Latest in runtime test before adding
# eee-backup.ps1 — claude-sota-installed SECONDARY launcher (direct Anthropic Max OAuth)
#
# Purpose: backup/fallback entry that bypasses the CLIProxyAPI fleet at 127.0.0.1:8317
# and authenticates claude.exe directly to api.anthropic.com via the user's Max OAuth
# credential file at Z:/claude-sota-installed/.claude/.credentials.json. Use when:
#   (a) CLIProxyAPI is down / restarting / re-authing accounts
#   (b) operator wants to verify behavior is identical without the proxy in the path
#   (c) emergency fallback if the fleet hits 529 backoff or circuit-breaker
#
# Reference (TIER-1 SOTA):
# - https://code.claude.com/docs/en/setup [VERIFIED 2026-05-08] (Windows native install + OAuth Max login flow)
# - https://code.claude.com/docs/en/env-vars [VERIFIED 2026-05-08] (ANTHROPIC_BASE_URL/AUTH_TOKEN canonical; absent ⇒ OAuth credential lookup)
# - CCBP Z:/repos/deps/claude-code-best-practice-shan/best-practice/claude-settings.md:877-921 @ HEAD 64fffd53 [VERIFIED 2026-05-06] (TIER-1-DIRECT env-block authority; mirrors eee.ps1)
#
# Adapted from (cite-only, NOT inherited code per cardinal-rule-5 install-priority):
# - Z:/claude-sota-installed/tools/eee.ps1 @ HEAD (sibling primary launcher)
#
# Divergence from eee.ps1 (intentional, audited):
#   D1. Section (e1) — does NOT set ANTHROPIC_BASE_URL / ANTHROPIC_AUTH_TOKEN; explicitly
#       Remove-Item Env:\ANTHROPIC_* so a contaminated parent shell cannot leak proxy
#       routing. claude.exe falls back to OAuth credential lookup as documented.
#   D2. Section T0.7/T0.8 — skips CLIProxyAPI binary + healthz + auth-count gates
#       (those are advisory in eee.ps1 already; here they are out-of-scope by design).
#   D3. Section T0.9 — skips cpa-usage-keeper sidecar startup (its sole job is to drain
#       the CLIProxyAPI RESP queue at :8317; with no proxy in path, there is nothing to drain).
#   D4. Adds OAuth credential ADVISORY: warns if .credentials.json is missing/empty so
#       operator knows to run `claude login` (or `eee-backup login`) before retrying.
#   D5. Banners say "[eee-backup]" so the chosen path is visually unambiguous.
# All other sections (HOME isolation, env block, hard-gates T0.1-T0.5, hook rewriters,
# workspace pin) are byte-equivalent with eee.ps1 — see git diff against tools/eee.ps1.

[CmdletBinding()]
param(
    [Parameter(ValueFromRemainingArguments=$true)]
    [string[]]$Args
)

# W325 P7 (F-PS1) — fail-fast on any non-terminating error, per Microsoft PowerShell docs:
# https://learn.microsoft.com/powershell/module/microsoft.powershell.core/about/about_preference_variables#erroractionpreference
# 'Stop' converts non-terminating errors to terminating so try/catch + script exit handle them correctly.
$ErrorActionPreference = 'Stop'

# ============================================================================
# (a) HOME isolation — set BEFORE forwarding to claude.exe
# Per CCBP claude-settings.md:880 @ 64fffd53 (USERPROFILE drives CC's lookup of .claude/ + auth + history)
# Shared with eee.ps1 — same .claude/ tree, same plugins, same OAuth credential file.
# ============================================================================
$env:USERPROFILE = 'Z:\claude-sota-installed'
$env:HOME        = 'Z:\claude-sota-installed'
$env:HOMEDRIVE   = 'Z:'
$env:HOMEPATH    = '\claude-sota-installed'

# ============================================================================
# (b) Anthropic-canonical runtime ENV
# Per https://code.claude.com/docs/en/env-vars + CCBP claude-settings.md:885-921 @ 64fffd53
# ============================================================================
$env:CLAUDE_CONFIG_DIR             = 'Z:/claude-sota-installed/.claude'
$env:CLAUDE_CODE_TMPDIR            = 'Z:/claude-sota-installed/tmp'
$env:CLAUDE_CODE_PLUGIN_CACHE_DIR  = 'Z:/claude-sota-installed/.claude/plugins'
$env:CLAUDE_CODE_DEBUG_LOGS_DIR    = 'Z:/claude-sota-installed/.claude/debug/cc-debug.log'
$env:CLAUDE_CODE_GIT_BASH_PATH     = 'C:\Program Files\Git\bin\bash.exe'

# ============================================================================
# (b1) Token-efficiency + UX env (mirrors eee.ps1 (b1))
# ============================================================================
$env:ENABLE_TOOL_SEARCH               = 'auto:10'
$env:COLORTERM                        = 'truecolor'
$env:CLAUDE_CODE_USE_POWERSHELL_TOOL  = '1'

# ============================================================================
# (b2) Advanced unleashed-mode env block (mirrors eee.ps1 (b2))
# All TIER-1-DIRECT cites to Z:/repos/deps/claude-code-best-practice-shan/best-practice/claude-settings.md @ HEAD 64fffd53.
# ============================================================================
$env:ENABLE_PROMPT_CACHING_1H                       = '1'
$env:EEE_FLEET_MIN_READY_CLAUDE                     = '3'
$env:EEE_FLEET_MAX_PARALLEL_CLAUDE_AGENTS           = '5'
$env:EEE_FLEET_RESERVE_ORCHESTRATOR                 = '1'
$env:EEE_FLEET_CACHE_WARM_BARRIER                   = '1'
$env:EEE_FLEET_CIRCUIT_BREAKER_SECONDS              = '60'
$env:EEE_FLEET_529_BACKOFF                          = '30'
$env:CLAUDE_ENABLE_STREAM_WATCHDOG                  = '1'
$env:CLAUDE_CODE_ENABLE_FINE_GRAINED_TOOL_STREAMING = '1'
$env:BASH_MAX_TIMEOUT_MS                            = '600000'
$env:CLAUDE_CODE_TASK_LIST_ID                       = 'claude-sota-installed'

# ============================================================================
# (d) Git Bash / MSYS path-rewrite suppression — env-only, NOT argv (mirrors eee.ps1 (d))
# ============================================================================
Remove-Item Env:\MSYS_NO_PATHCONV     -ErrorAction SilentlyContinue
Remove-Item Env:\MSYS2_ARG_CONV_EXCL  -ErrorAction SilentlyContinue
Remove-Item Env:\CLAUDE_PLUGIN_ROOT   -ErrorAction SilentlyContinue
Remove-Item Env:\ECC_PLUGIN_ROOT      -ErrorAction SilentlyContinue
$env:MSYS2_ENV_CONV_EXCL = '*'

# ============================================================================
# (e) State-outside-repo redirects — credential-class artifacts (mirrors eee.ps1 (e))
# CLAUDE_CODE_PROJECT_DIR REMOVED 2026-05-20 — phantom env var, never honored by CC core.
# Sessions live at $CLAUDE_CONFIG_DIR/projects/ (in-repo default) regardless.
# ============================================================================
$env:CODEX_HOME              = 'Z:/claude-sota-installed-state/.codex'

# ============================================================================
# (e0) RTK token-killer on PATH (mirrors eee.ps1 (e0))
# ============================================================================
$rtkBinDir = 'Z:\claude-sota-installed\.local\cargo\bin'
if ((Test-Path $rtkBinDir) -and ($env:PATH -notlike "*$rtkBinDir*")) {
    $env:PATH = "$rtkBinDir;$env:PATH"
}

# ============================================================================
# (e1-BACKUP) DIRECT-MAX-OAUTH ROUTE — proxy env block intentionally OMITTED
# Divergence D1: claude.exe must use OAuth credential file at .claude/.credentials.json,
# NOT route through CLIProxyAPI at :8317. We explicitly Remove-Item Env:\ANTHROPIC_BASE_URL
# and Env:\ANTHROPIC_AUTH_TOKEN in case the parent shell already had them set (e.g.,
# user ran `eee` first in the same session, or has them in $PROFILE).
# Reference: TIER-1-DIRECT https://code.claude.com/docs/en/env-vars [VERIFIED 2026-05-08]
#   "If ANTHROPIC_AUTH_TOKEN is unset, claude.exe falls back to OAuth credential lookup"
# ============================================================================
Remove-Item Env:\ANTHROPIC_BASE_URL       -ErrorAction SilentlyContinue
Remove-Item Env:\ANTHROPIC_AUTH_TOKEN     -ErrorAction SilentlyContinue
Remove-Item Env:\ANTHROPIC_API_KEY        -ErrorAction SilentlyContinue
Remove-Item Env:\EEE_PROXY_KEY_RESEARCH   -ErrorAction SilentlyContinue
Remove-Item Env:\EEE_PROXY_KEY_CODEX_BRIDGE -ErrorAction SilentlyContinue
Remove-Item Env:\EEE_PROXY_KEY_EVAL       -ErrorAction SilentlyContinue
Remove-Item Env:\EEE_OPENAI_BASE_URL_PROXY -ErrorAction SilentlyContinue

# ============================================================================
# (g) Claude Code binary discovery (mirrors eee.ps1 (g))
# ============================================================================
$claudeBin = $null
$nativeBin = 'Z:\claude-sota-installed\.local\bin\claude.exe'
$parentBin = 'Z:\claude\.local\bin\claude.exe'

if (Test-Path $nativeBin) {
    $claudeBin = $nativeBin
    Write-Host "[eee-backup] Using native claude.exe at: $claudeBin (DIRECT MAX OAUTH route)" -ForegroundColor Cyan
} elseif (Test-Path $parentBin) {
    $claudeBin = $parentBin
    Write-Host "[eee-backup] FALLBACK to parent claude.exe at: $claudeBin (install anthropics/claude-code natively per docs/install-from-github-discipline.md)" -ForegroundColor Yellow
} else {
    Write-Host "[eee-backup] ERROR: claude.exe not found at native ($nativeBin) or parent ($parentBin)." -ForegroundColor Red
    Write-Host "[eee-backup] Install Anthropic CC per https://code.claude.com/docs/en/setup or pull native binary from anthropics/claude-code GitHub releases." -ForegroundColor Red
    exit 1
}

# ============================================================================
# (h) State-dir bootstrap (mirrors eee.ps1 (h))
# ============================================================================
foreach ($dir in @($env:CODEX_HOME, $env:CLAUDE_CODE_TMPDIR, "$env:CLAUDE_CONFIG_DIR/debug")) {
    if (-not (Test-Path $dir)) {
        Write-Host "[eee-backup] Creating state dir: $dir (one-time; can be slow on Z: drive)..." -ForegroundColor Yellow
        New-Item -ItemType Directory -Force -Path $dir | Out-Null
    }
}

# ============================================================================
# (i) HARD-GATE preflight — same SOTA-native-install integrity verification as eee.ps1
# T0.7/T0.8/T0.9 (CLIProxyAPI checks + cpa-usage-keeper sidecar) intentionally OMITTED
# per divergences D2/D3 above. T0.0-T0.5 retained byte-equivalent.
# ============================================================================
$EEE_HARD_FAILURES = @()
$EEE_ADVISORY_WARNS = @()

# T0.0 — Tier 2A MCP credential passthrough validation
if (-not $env:GITHUB_TOKEN) {
    $EEE_ADVISORY_WARNS += "GITHUB_TOKEN is unset; github MCP Authorization header in .mcp.json will not expand/connect"
}
if (-not $env:CONTEXT7_API_KEY) {
    $EEE_ADVISORY_WARNS += "CONTEXT7_API_KEY is unset; context7 MCP header in .mcp.json will not expand/connect"
}

# T0.1 — claude.exe MUST be native
if ($claudeBin -ne $nativeBin) {
    $EEE_HARD_FAILURES += "claude.exe is NOT native (using parent fallback at $claudeBin); install anthropics/claude-code natively at $nativeBin per docs/sota-installed-manifest.md Section 0"
}

# T0.2 — dynamically derive expected plugins from settings.json:enabledPlugins
$settingsPath = "$env:CLAUDE_CONFIG_DIR/settings.json"
$enabledPluginNames = @()
if (-not (Test-Path $settingsPath)) {
    $EEE_HARD_FAILURES += ".claude/settings.json missing at $settingsPath"
} else {
    try {
        $settings = Get-Content $settingsPath -Raw | ConvertFrom-Json
        $enabledPluginNames = @($settings.enabledPlugins.PSObject.Properties |
            Where-Object { $_.Value -eq $true } |
            ForEach-Object { $_.Name })
        if ($enabledPluginNames.Count -eq 0) {
            $EEE_HARD_FAILURES += "settings.json:enabledPlugins is empty (no plugins enabled)"
        }
        $cardinalPlugins = @(
            'superpowers@claude-plugins-official',
            'codex@openai-codex',
            'everything-claude-code@everything-claude-code'
        )
        foreach ($plugin in $cardinalPlugins) {
            if ($enabledPluginNames -notcontains $plugin) {
                $EEE_HARD_FAILURES += "cardinal plugin '$plugin' NOT enabled in settings.json:enabledPlugins"
            }
        }
    } catch {
        $EEE_HARD_FAILURES += "settings.json parse failure: $($_.Exception.Message)"
    }
}

# T0.3 — dynamically verify each enabled plugin's cache root exists
$pluginCacheRoot = "$env:CLAUDE_CONFIG_DIR/plugins/cache"
foreach ($pluginName in $enabledPluginNames) {
    if ($pluginName -notmatch '^([^@]+)@(.+)$') {
        $EEE_ADVISORY_WARNS += "plugin name '$pluginName' does not match '<plugin>@<marketplace>' shape; skipping cache check"
        continue
    }
    $plugin = $matches[1]
    $marketplace = $matches[2]
    $pluginCacheDir = Join-Path $pluginCacheRoot "$marketplace/$plugin"
    if (-not (Test-Path $pluginCacheDir)) {
        $EEE_HARD_FAILURES += "plugin cache root missing for '$pluginName' at $pluginCacheDir"
        continue
    }
    $versionDirs = @(Get-ChildItem -Path $pluginCacheDir -Directory -ErrorAction SilentlyContinue)
    if ($versionDirs.Count -eq 0) {
        $EEE_HARD_FAILURES += "plugin cache for '$pluginName' has no version subdirectory at $pluginCacheDir"
        continue
    }
    $hasContent = $false
    foreach ($vd in $versionDirs) {
        if ((Test-Path (Join-Path $vd.FullName "README.md")) -or
            (Test-Path (Join-Path $vd.FullName "commands")) -or
            (Test-Path (Join-Path $vd.FullName "scripts")) -or
            (Test-Path (Join-Path $vd.FullName "agents")) -or
            (Test-Path (Join-Path $vd.FullName "hooks")) -or
            (Test-Path (Join-Path $vd.FullName "skills")) -or
            (Test-Path (Join-Path $vd.FullName ".claude-plugin"))) {
            $hasContent = $true
            break
        }
    }
    if (-not $hasContent) {
        $EEE_HARD_FAILURES += "plugin cache for '$pluginName' at $pluginCacheDir has version dirs but no recognized artifacts (README.md / commands/ / scripts/ / agents/ / hooks/ / skills/ / .claude-plugin/)"
    }
}

# T0.4 — python venv MUST be present
$pythonExe = 'Z:/venvs/claude/Scripts/python.exe'
if (-not (Test-Path $pythonExe)) {
    $EEE_HARD_FAILURES += "python venv missing at $pythonExe (required by sibling-cite-imported hooks)"
}

# T0.5 — codex CLI MUST be on PATH
$codexCmd = Get-Command codex -ErrorAction SilentlyContinue
if (-not $codexCmd) {
    $EEE_HARD_FAILURES += "codex CLI not on PATH (cardinal-rule-3 cross-model T1-T7 lifecycle requires codex 0.129.0+); install per https://github.com/openai/codex"
}

# T0.6 ADVISORY — Tier 2A MCP registry present
$mcpConfigPath = Join-Path $env:USERPROFILE '.mcp.json'
if (-not (Test-Path $mcpConfigPath)) {
    $EEE_ADVISORY_WARNS += ".mcp.json missing at $mcpConfigPath (Tier 2A MCP registry target: github + context7 + deepwiki)"
} else {
    try {
        $mcpConfig = Get-Content $mcpConfigPath -Raw | ConvertFrom-Json
        $mcpCount = 0
        if ($mcpConfig.mcpServers) {
            $mcpCount = @($mcpConfig.mcpServers.PSObject.Properties).Count
        }
        if ($mcpCount -lt 3) {
            $EEE_ADVISORY_WARNS += ".mcp.json has $mcpCount MCP server(s); Tier 2A target is 3 (github + context7 + deepwiki)"
        }
    } catch {
        $EEE_ADVISORY_WARNS += ".mcp.json parse failure: $($_.Exception.Message)"
    }
}

# T1 ADVISORY — Tier-1 hooks present at .claude/hooks/scripts/
$hooksDir = "$env:CLAUDE_CONFIG_DIR/hooks/scripts"
$expectedHooks = @(
    'codex_t1_consult_gate.py',
    'codex_gate.py'
)
foreach ($hook in $expectedHooks) {
    $hookPath = Join-Path $hooksDir $hook
    if (-not (Test-Path $hookPath)) {
        $EEE_ADVISORY_WARNS += "Tier-1 hook '$hook' missing at $hookPath (FORWARD-REF cite-import per Agent W H1 design)"
    }
}

# T2 ADVISORY — settings.json:hooks{} non-empty
if ($settings -and ($settings.hooks.PSObject.Properties.Count -eq 0)) {
    $EEE_ADVISORY_WARNS += "settings.json:hooks is empty {} (cardinal-rule-3 cross-model gate substrate not wired)"
}

# T0.B (BACKUP-SPECIFIC) — Anthropic Max OAuth credential file presence
# Reference: TIER-1-DIRECT https://code.claude.com/docs/en/setup [VERIFIED 2026-05-08]
#   "claude login persists OAuth tokens to <CLAUDE_CONFIG_DIR>/.credentials.json"
# When ANTHROPIC_AUTH_TOKEN is unset (eee-backup intent), claude.exe reads .credentials.json
# to obtain Max-plan bearer token. If file is missing or empty, the operator must run
# `claude login` (or `eee-backup login`) before any prompts can be sent.
$credPath = Join-Path $env:CLAUDE_CONFIG_DIR '.credentials.json'
if (-not (Test-Path $credPath)) {
    $EEE_ADVISORY_WARNS += "Anthropic OAuth credential file missing at $credPath (run: eee-backup login — completes Max-plan device-flow OAuth and writes the file)"
} else {
    $credSize = (Get-Item $credPath -ErrorAction SilentlyContinue).Length
    if (-not $credSize -or $credSize -lt 50) {
        $EEE_ADVISORY_WARNS += "Anthropic OAuth credential file at $credPath is empty or truncated ($credSize bytes); re-run: eee-backup login"
    } else {
        Write-Host "[eee-backup] OAuth Max credential present at $credPath (${credSize} bytes)" -ForegroundColor Green
    }
}

# Render verdict
if ($EEE_HARD_FAILURES.Count -gt 0) {
    Write-Host ""
    Write-Host "[eee-backup] HARD-GATE FAIL-CLOSED -- SOTA-native-install integrity check failed:" -ForegroundColor Red
    foreach ($f in $EEE_HARD_FAILURES) {
        Write-Host "  [HARD] $f" -ForegroundColor Red
    }
    Write-Host ""
    Write-Host "[eee-backup] Bootstrap-only override: set EEE_BOOTSTRAP=1 (NOT for normal use):" -ForegroundColor Yellow
    Write-Host "    `$env:EEE_BOOTSTRAP='1'; eee-backup" -ForegroundColor Yellow
    Write-Host ""
    if ($env:EEE_BOOTSTRAP -ne '1') {
        exit 1
    }
    Write-Host "[eee-backup] EEE_BOOTSTRAP=1 set -- proceeding despite hard-gate failures (BOOTSTRAP MODE)" -ForegroundColor Yellow
    Write-Host ""
}

if ($EEE_ADVISORY_WARNS.Count -gt 0) {
    Write-Host "[eee-backup] ADVISORY warns (operational; will not block launch):" -ForegroundColor Yellow
    foreach ($w in $EEE_ADVISORY_WARNS) {
        Write-Host "  [WARN] $w" -ForegroundColor Yellow
    }
    Write-Host ""
}

if ($EEE_HARD_FAILURES.Count -eq 0 -and $EEE_ADVISORY_WARNS.Count -eq 0) {
    Write-Host "[eee-backup] HARD-GATE PASS -- SOTA-native-install integrity verified (DIRECT MAX OAUTH route)" -ForegroundColor Green
}

# ============================================================================
# (j) Forward to claude.exe with all args — Fire 46 + Wave 52 hook rewriters
# ============================================================================

# === Wave 50 Fire 46 — codex plugin hooks rewriter (mirrors eee.ps1) ===
$rewriterScript = "Z:\claude-sota-installed\scripts\codex-plugin-hooks-rewrite.py"
$rewriterPython = "Z:\venvs\claude\Scripts\python.exe"
$codexPluginCache = "Z:\claude-sota-installed\.claude\plugins\cache\openai-codex"
if ((Test-Path $codexPluginCache) -and -not (Test-Path $rewriterScript)) {
    Write-Error @"
[eee-backup] HARD-FAIL: codex plugin cache exists at $codexPluginCache but Fire 46 rewriter missing at $rewriterScript.
  Recovery options:
    (a) Restore $rewriterScript from git or backup (RECOMMENDED).
    (b) Disable the codex plugin: remove `codex@openai-codex` from settings.json:enabledPlugins
        AND remove `openai-codex` from settings.json:extraKnownMarketplaces
        AND delete or move $codexPluginCache.
    (c) Edit `tools/eee.ps1` AND `tools/eee-backup.ps1` T0.2 + T0.3 hard-gates to drop codex.
"@
    exit 2
}
if ((Test-Path $rewriterScript) -and (Test-Path $rewriterPython)) {
    & $rewriterPython $rewriterScript --quiet
    if ($LASTEXITCODE -ne 0) {
        Write-Error "Fire 46 rewriter exited $LASTEXITCODE; aborting launcher (fail-closed)."
        exit 2
    }
    & $rewriterPython $rewriterScript --check
    if ($LASTEXITCODE -ne 0) {
        Write-Error "Fire 46 --check exited $LASTEXITCODE; hook drift detected. Aborting launcher (fail-closed)."
        exit 2
    }
}
# === End Fire 46 wire ===

# === Wave 52 — ECC loader:1386 hook rewriter (mirrors eee.ps1) ===
$eccRewriterScript = "Z:\claude-sota-installed\scripts\ecc-plugin-hooks-rewrite.py"
$eccPluginCache = "Z:\claude-sota-installed\.claude\plugins\cache\everything-claude-code"
if ((Test-Path $eccPluginCache) -and -not (Test-Path $eccRewriterScript)) {
    Write-Error @"
[eee-backup] HARD-FAIL: ECC plugin cache exists at $eccPluginCache but Wave 52 rewriter missing at $eccRewriterScript.
  Recovery options:
    (a) Restore $eccRewriterScript from git or backup (RECOMMENDED).
    (b) Disable ECC plugin and delete its cache.
    (c) Edit `tools/eee.ps1` AND `tools/eee-backup.ps1` T0.2 + T0.3 to drop ECC.
"@
    exit 2
}
if ((Test-Path $eccRewriterScript) -and (Test-Path $rewriterPython)) {
    & $rewriterPython $eccRewriterScript --quiet
    if ($LASTEXITCODE -ne 0) {
        Write-Error "Wave 52 ECC rewriter exited $LASTEXITCODE; aborting launcher (fail-closed)."
        exit 2
    }
    & $rewriterPython $eccRewriterScript --check
    if ($LASTEXITCODE -ne 0) {
        Write-Error "Wave 52 ECC --check exited $LASTEXITCODE; ECC hook drift detected. Aborting launcher (fail-closed)."
        exit 2
    }
}
# === End Wave 52 ECC wire ===

# ============================================================================
# (k) Workspace cwd-pin before claude.exe forward (mirrors eee.ps1 (k))
# ============================================================================
$EEE_WORKSPACE = 'Z:\claude-sota-installed'
if (Test-Path $EEE_WORKSPACE) {
    Set-Location -LiteralPath $EEE_WORKSPACE -ErrorAction Stop
    Write-Host "[eee-backup] Workspace pinned: $EEE_WORKSPACE" -ForegroundColor Green
} else {
    Write-Host "[eee-backup] WARN: workspace $EEE_WORKSPACE missing; cwd not pinned (claude.exe will inherit caller cwd)" -ForegroundColor Yellow
}

& $claudeBin @Args
exit $LASTEXITCODE
