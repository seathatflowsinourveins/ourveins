#Requires -Version 7.0
# TODO W344: validate Set-StrictMode -Version Latest in runtime test before adding
# eee.ps1 — claude-sota-installed launcher (minimal install-only runtime entrypoint)
#
# Reference (TIER-1 SOTA):
# - https://code.claude.com/docs/en/setup [VERIFIED 2026-04-28] (Windows native install supports PowerShell entrypoints)
# - https://code.claude.com/docs/en/env-vars [VERIFIED 2026-04-28] (CLAUDE_CONFIG_DIR + CLAUDE_CODE_TMPDIR + CLAUDE_CODE_PLUGIN_CACHE_DIR + CLAUDE_CODE_DEBUG_LOGS_DIR canonical names)
# - CCBP Z:/repos/deps/claude-code-best-practice-shan/best-practice/claude-settings.md:877-921 @ HEAD 64fffd53a7c6f8e2e0b1575fdd200b65cda04737 [VERIFIED 2026-05-06] (TIER-1-DIRECT upstream env-block authority — direct cite, NOT sibling-derived per cardinal-rule-1)
#
# Adapted from (cite-only, NOT inherited code per cardinal-rule-5 install-priority):
# - Z:/claude-sota/tools/sss.ps1 @ HEAD (913 LOC reference; this launcher is intentionally minimal)
#
# Cardinal-rule-5 compliance: launcher is bootstrap scaffolding (one of 11 permitted hand-coded files per CLAUDE.md). Per-install env additions are NOT added here — they live in the install entry's settings/env directives in docs/sota-installed-manifest.md.

[CmdletBinding()]
param(
    [Parameter(ValueFromRemainingArguments=$true)]
    [string[]]$Args
)

# W325 P7 (F-PS1) — fail-fast on any non-terminating error, per Microsoft PowerShell docs:
# https://learn.microsoft.com/powershell/module/microsoft.powershell.core/about/about_preference_variables#erroractionpreference
# 'Stop' converts non-terminating errors to terminating so try/catch + script exit handle them correctly.
$ErrorActionPreference = 'Stop'

#=======================================================================================
# W363 — Named-param dispatcher + helper functions (insert: 2026-05-21)
# Spec: docs/superpowers/specs/2026-05-21-sota-parallel-workflow-design.md §5.1
# Plan: docs/superpowers/plans/2026-05-21-W363-foundation-gap-closure.md Task 2
#
# Splice contract (R1+R2+R3): insert AFTER L24 $ErrorActionPreference='Stop' and
# BEFORE the L25+ HOME-isolation bootstrap. Dispatcher fires early so bare subcommands
# (agents|attach|logs|stop|respawn|rm) skip the ~1s bootstrap, and --Wave / --Bg fork
# the control-flow before forwarding falls through to the default interactive launch.
#=======================================================================================

# --- Helper: Test-WorktreeCap (R1 §10 + W350 5-worktree cap) ------------------------
function Test-WorktreeCap {
    param([int]$Cap = 5)
    $list = & git worktree list --porcelain 2>$null
    if ($LASTEXITCODE -ne 0 -or -not $list) {
        return @{ Over = $false; Count = 0; Cap = $Cap }
    }
    $count = ($list | Select-String -Pattern '^worktree ').Count
    if ($count -ge $Cap) {
        return @{ Over = $true; Count = $count; Cap = $Cap }
    }
    return @{ Over = $false; Count = $count; Cap = $Cap }
}

# --- Helper: Get-WaveLockPath / Write-WaveLockAtomic --------------------------------
function Get-WaveLockPath {
    param([string]$Wave, [string]$Root)
    if (-not $Root) { $Root = (Resolve-Path "$PSScriptRoot/..").Path }
    return (Join-Path $Root ".claude/state/wave-lock-$Wave.json")
}

function Write-WaveLockAtomic {
    # Per R3: [System.IO.File]::Move + true -> MoveFileEx(MOVEFILE_REPLACE_EXISTING) is
    # the SOTA atomic-rename primitive on Windows. Move-Item -Force is NOT atomic.
    param([string]$WaveId, [hashtable]$Payload, [string]$Root)
    if (-not $Root) { $Root = (Resolve-Path "$PSScriptRoot/..").Path }
    $dir = Join-Path $Root ".claude/state"
    $final = Join-Path $dir "wave-lock-$WaveId.json"
    $tmp = "$final.$PID.$([guid]::NewGuid().ToString('N').Substring(0,8)).tmp"
    New-Item -ItemType Directory -Path $dir -Force | Out-Null
    $json = $Payload | ConvertTo-Json -Depth 10 -Compress:$false
    [System.IO.File]::WriteAllText($tmp, $json, [System.Text.UTF8Encoding]::new($false))
    [System.IO.File]::Move($tmp, $final, $true)
    return $final
}

# --- Helper: New-WaveWorktree -------------------------------------------------------
function New-WaveWorktree {
    param([string]$Wave, [string]$Slug, [string]$Base = 'origin/HEAD')
    # 1. Worktree-cap check (W350 GIT-TREE-SOTA §2)
    $cap = Test-WorktreeCap
    if ($cap.Over) {
        Write-Host "[eee] HARD FAIL: $($cap.Count)/$($cap.Cap) worktrees exceeds cap per W350 GIT-TREE-SOTA-ARCHITECTURE §2." -ForegroundColor Red
        Write-Host "[eee]            Close one with 'git worktree remove <path>' first." -ForegroundColor Red
        exit 2
    }
    # 2. Branch name + worktree path (defensive sanitization on slug)
    $slugClean = $Slug -replace '[^a-zA-Z0-9-]', '-'
    $branch = "goal/$Wave-$slugClean"
    $repoRoot = $null
    try { $repoRoot = (& git rev-parse --show-toplevel 2>$null).Trim() } catch { $repoRoot = $null }
    if (-not $repoRoot -or $LASTEXITCODE -ne 0) {
        # Fallback: PSScriptRoot/..
        $repoRoot = (Resolve-Path "$PSScriptRoot/..").Path
    }
    # W435 fix: git --show-toplevel returns POSIX path (/z/claude-sota-installed) even with
    # MSYS_NO_PATHCONV=1 (that suppresses argument conversion, not output format).
    # The bare /z/ prefix becomes drive-relative Z:\z\ on worktree-add → phantom dir.
    if ($repoRoot -match '^/([a-zA-Z])/(.*)') {
        $repoRoot = "$($Matches[1].ToUpper()):\$($Matches[2])" -replace '/', '\'
    }
    $workdir = "$repoRoot-$Wave"
    # 2a. Resolve Base ref (auto-fallback origin/HEAD -> HEAD for repos w/o remote)
    & git -C $repoRoot rev-parse --verify --quiet $Base 2>&1 | Out-Null
    if ($LASTEXITCODE -ne 0) {
        Write-Host "[eee] WARN: base ref '$Base' not resolvable; falling back to HEAD" -ForegroundColor Yellow
        $Base = 'HEAD'
    }
    # 3. Wave-lock atomic pre-claim (this is the W363 race-immune primitive)
    $sessionId = if ($env:CLAUDE_SESSION_ID) { $env:CLAUDE_SESSION_ID } else { [guid]::NewGuid().ToString() }
    $env:CLAUDE_SESSION_ID = $sessionId
    $startedAt = [DateTime]::UtcNow.ToString('yyyy-MM-ddTHH:mm:ssZ')
    $ttlAt = [DateTime]::UtcNow.AddDays(7).ToString('yyyy-MM-ddTHH:mm:ssZ')
    $lockPath = Get-WaveLockPath -Wave $Wave -Root $repoRoot
    # W363 codex r1 finding #3+#5 fix: BEFORE any write, delegate full acquire-semantics
    # to the Node guard (race-safe O_EXCL claim path). PowerShell does NOT do its own
    # acquire — that was the bypass codex flagged. PS only:
    #   (a) detects same-session active-lock idempotent re-entry -> skip worktree-add,
    #   (b) detects different-session COLLISION -> exit 2,
    #   (c) otherwise hands off to the Node guard which performs the atomic claim.
    $idempotentReEntry = $false
    if (Test-Path $lockPath) {
        try {
            $existing = Get-Content $lockPath -Raw | ConvertFrom-Json
            if ($existing.state -eq 'active' -and $existing.session_id -eq $sessionId) {
                # Same-session active lock = idempotent re-entry; skip writes + worktree-add.
                $idempotentReEntry = $true
                Write-Host "[eee] wave-lock idempotent re-entry: $Wave session=$sessionId (existing worktree assumed live)" -ForegroundColor Cyan
            } elseif ($existing.state -eq 'active' -and $existing.session_id -ne $sessionId) {
                Write-Host "[eee] HARD FAIL: wave $Wave already claimed by different session $($existing.session_id)@$($existing.host):$($existing.pid)" -ForegroundColor Red
                Write-Host "[eee]            Existing branch=$($existing.branch) started=$($existing.started_at)" -ForegroundColor Red
                Write-Host "[eee]            COLLISION -- pick a different wave id or release the existing lock." -ForegroundColor Red
                exit 2
            } elseif ($existing.state -eq 'poisoned') {
                Write-Host "[eee] HARD FAIL: wave $Wave lock state=poisoned; operator must clear before re-acquire." -ForegroundColor Red
                exit 2
            }
            # state in {released, expired} or stale -- fall through to Node-guard reclaim.
        } catch {
            Write-Host "[eee] WARN: existing wave-lock at $lockPath is unparseable; Node guard will reclaim." -ForegroundColor Yellow
        }
    }
    if ($idempotentReEntry) {
        # Re-entry path: refresh heartbeat via direct write but skip worktree-add.
        # Worktree presumed live; if missing, operator should remove the stale lock manually.
        if (-not (Test-Path $workdir)) {
            Write-Host "[eee] WARN: idempotent re-entry but worktree $workdir missing; remove lock + retry." -ForegroundColor Yellow
        }
        return @{ Worktree = $workdir; Branch = $branch; SessionId = $sessionId; LockPath = $lockPath; IdempotentReEntry = $true }
    }
    # W363 codex r1 finding #3 fix: delegate FULL acquire-semantics to Node guard.
    # PowerShell does NOT do its own atomic-write — the Node guard uses O_EXCL ('wx')
    # which is the race-safe primitive. PS only falls back to direct write if Node is
    # absent (operator-broken-state).
    $guard = Join-Path $PSScriptRoot 'preagent-wave-lock-guard.mjs'
    $stateDir = Join-Path $repoRoot ".claude/state"
    $written = $lockPath
    if ((Test-Path $guard) -and (Get-Command node -ErrorAction SilentlyContinue)) {
        $acquireOut = & node $guard --acquire --wave $Wave --session-id $sessionId --branch $branch --worktree-path $workdir --state-dir $stateDir 2>&1
        if ($LASTEXITCODE -ne 0) {
            Write-Host "[eee] HARD FAIL: wave-lock acquire collision for $Wave (node-guard)" -ForegroundColor Red
            Write-Host ($acquireOut -join "`n") -ForegroundColor Red
            exit 2
        }
    } else {
        # Fallback path (Node absent): direct PS write. Not race-safe; logged for operator.
        Write-Host "[eee] WARN: node guard absent; using non-race-safe PS atomic-write fallback." -ForegroundColor Yellow
        $payload = [ordered]@{
            schema_version             = 1
            wave                       = $Wave
            session_id                 = $sessionId
            parent_session_id          = $null
            owner                      = 'operator'
            branch                     = $branch
            worktree_path              = $workdir
            host                       = [Environment]::MachineName
            pid                        = $PID
            started_at                 = $startedAt
            last_heartbeat_at          = $startedAt
            heartbeat_interval_seconds = 60
            ttl_at                     = $ttlAt
            claim_attempts             = 1
            state                      = 'active'
            released_at                = $null
        }
        $written = Write-WaveLockAtomic -WaveId $Wave -Payload $payload -Root $repoRoot
    }
    Write-Host "[eee] wave-lock claimed: $Wave session=$sessionId path=$written" -ForegroundColor Green
    # 5. git worktree add (direct invocation; Start-Process spawns a separate console
    # whose stdin is not closed cleanly under PowerShell 7's child-process model and
    # can leave git blocked on credential / pager prompts).
    & git -C $repoRoot worktree add $workdir -b $branch $Base 2>&1 | ForEach-Object { Write-Host $_ }
    if ($LASTEXITCODE -ne 0) {
        Write-Host "[eee] git worktree add failed (exit $LASTEXITCODE)" -ForegroundColor Red
        exit 2
    }
    Write-Host "[eee] worktree created: $workdir branch=$branch" -ForegroundColor Green
    # 6. Copy gitignored files matching .worktreeinclude patterns
    $includeFile = Join-Path $repoRoot '.worktreeinclude'
    if (Test-Path $includeFile) {
        Get-Content $includeFile | ForEach-Object {
            $line = $_.Trim()
            if (-not $line -or $line.StartsWith('#')) { return }
            $src = Join-Path $repoRoot $line
            $dst = Join-Path $workdir $line
            if (Test-Path $src) {
                $dstDir = Split-Path $dst -Parent
                if ($dstDir) { New-Item -ItemType Directory -Path $dstDir -Force | Out-Null }
                Copy-Item $src $dst -Force
                Write-Host "[eee] .worktreeinclude: copied $line" -ForegroundColor DarkGray
            }
        }
    }
    return @{ Worktree = $workdir; Branch = $branch; SessionId = $sessionId; LockPath = $written }
}

# --- Subcommand dispatcher (early, before bootstrap) --------------------------------
# Bare subcommand passthrough (cheap path -- skip ~1s bootstrap to keep operator latency low).
if ($Args.Count -gt 0 -and $Args[0] -in @('agents', 'attach', 'logs', 'stop', 'respawn', 'rm')) {
    $claudeBin = if ($env:CLAUDE_BIN -and (Test-Path $env:CLAUDE_BIN)) {
        $env:CLAUDE_BIN
    } else {
        try { (Get-Command claude -ErrorAction Stop).Source } catch { $null }
    }
    if (-not $claudeBin) {
        Write-Host "[eee] ERROR: claude.exe not found on PATH and \$env:CLAUDE_BIN is unset." -ForegroundColor Red
        exit 2
    }
    & $claudeBin @Args
    exit $LASTEXITCODE
}

# --- Custom named-param parser ------------------------------------------------------
# PowerShell doesn't natively mix `--Wave value` with $Args[]; parse the leading
# tokens manually until we see something that isn't a known flag.
$WaveValue = $null
$SlugValue = $null
$BaseValue = 'origin/HEAD'
$NoLaunch = $false
$BgValue = $false
$PromptValue = $null
$NameValue = $null
$AgentValue = $null
$DangerouslySkipPermissions = $false
$ShowHelp = $false
$ForwardArgs = @()
$_argIdx = 0
while ($_argIdx -lt $Args.Count) {
    $_a = $Args[$_argIdx]
    switch ($_a) {
        '--Wave'                       { $WaveValue = $Args[$_argIdx + 1]; $_argIdx += 2; continue }
        '--Slug'                       { $SlugValue = $Args[$_argIdx + 1]; $_argIdx += 2; continue }
        '--Base'                       { $BaseValue = $Args[$_argIdx + 1]; $_argIdx += 2; continue }
        '--NoLaunch'                   { $NoLaunch = $true; $_argIdx += 1; continue }
        '--Bg'                         { $BgValue = $true; $_argIdx += 1; continue }
        '--Prompt'                     { $PromptValue = $Args[$_argIdx + 1]; $_argIdx += 2; continue }
        '--Name'                       { $NameValue = $Args[$_argIdx + 1]; $_argIdx += 2; continue }
        '--Agent'                      { $AgentValue = $Args[$_argIdx + 1]; $_argIdx += 2; continue }
        '--DangerouslySkipPermissions' { $DangerouslySkipPermissions = $true; $_argIdx += 1; continue }
        '--Help'                       { $ShowHelp = $true; $_argIdx += 1; continue }
        default                        { $ForwardArgs += $_a; $_argIdx += 1; continue }
    }
}

if ($ShowHelp) {
    Write-Host @"
[eee] PowerShell launcher for claude-sota-installed
Usage:
  eee.ps1 [--Wave Wn [--Slug s] [--Base ref] [--NoLaunch]]
  eee.ps1 [--Bg --Prompt "..." [--Name label] [--Agent name] [--DangerouslySkipPermissions]]
  eee.ps1 agents [--json]
  eee.ps1 attach <id>
  eee.ps1 logs <id>
  eee.ps1 stop <id>
  eee.ps1 respawn <id>
  eee.ps1 rm <id>
  eee.ps1 [forwarded args...]    # default: launch interactive claude

W363 -- Foundation Gap Closure. See docs/superpowers/plans/2026-05-21-W363-foundation-gap-closure.md
"@
    exit 0
}

# --- Wave dispatcher ----------------------------------------------------------------
if ($WaveValue) {
    if (-not $SlugValue) {
        Write-Host "[eee] --Wave requires --Slug <slug>" -ForegroundColor Red
        exit 2
    }
    $waveResult = New-WaveWorktree -Wave $WaveValue -Slug $SlugValue -Base $BaseValue
    if ($NoLaunch) {
        Write-Host "[eee] --NoLaunch: skipping claude launch. worktree=$($waveResult.Worktree) branch=$($waveResult.Branch)" -ForegroundColor Cyan
        exit 0
    }
    $env:EEE_WORKSPACE_OVERRIDE = $waveResult.Worktree
    Set-Location $waveResult.Worktree
    # Fall through to the existing bootstrap + claude launch below.
}

# --- Bg dispatcher ------------------------------------------------------------------
if ($BgValue) {
    if (-not $PromptValue -or $PromptValue.Length -lt 4) {
        Write-Host "[eee] --Bg --Prompt must be >= 4 chars (CC rejects 'Too short')" -ForegroundColor Red
        exit 2
    }
    $claudeBin = if ($env:CLAUDE_BIN -and (Test-Path $env:CLAUDE_BIN)) {
        $env:CLAUDE_BIN
    } else {
        try { (Get-Command claude -ErrorAction Stop).Source } catch { $null }
    }
    if (-not $claudeBin) {
        Write-Host "[eee] ERROR: claude.exe not found on PATH and \$env:CLAUDE_BIN is unset." -ForegroundColor Red
        exit 2
    }
    $bgArgs = @('--bg')
    if ($NameValue)                    { $bgArgs += @('--name', $NameValue) }
    if ($AgentValue)                   { $bgArgs += @('--agent', $AgentValue) }
    if ($DangerouslySkipPermissions)   { $bgArgs += '--dangerously-skip-permissions' }
    $bgArgs += $ForwardArgs
    $bgArgs += $PromptValue
    Write-Host "[eee] launching --bg session..." -ForegroundColor Cyan
    Start-Process -FilePath $claudeBin -ArgumentList $bgArgs -NoNewWindow -PassThru | Out-Null
    exit 0
}

# (default-launch path falls through to the existing HOME-isolation bootstrap below)
#=======================================================================================
# END W363 insertion block
#=======================================================================================

# ============================================================================
# (a) HOME isolation — set BEFORE forwarding to claude.exe
# Per CCBP claude-settings.md:880 @ 64fffd53 (USERPROFILE drives CC's lookup of .claude/ + auth + history)
# ============================================================================
$env:USERPROFILE = 'Z:\claude-sota-installed'
$env:HOME        = 'Z:\claude-sota-installed'
$env:HOMEDRIVE   = 'Z:'
$env:HOMEPATH    = '\claude-sota-installed'

# ============================================================================
# (a1) MSYS2 path-conversion suppression — parent-shell layer (2026-05-17)
# Authority: https://www.msys2.org/docs/filesystem-paths/ [VERIFIED 2026-05-17 via ctx_fetch_and_index]
# Problem: Git for Windows ships MSYS2 runtime (msys-2.0.dll). When bash spawns
#          native Win exes, `/`-prefixed args (e.g. `taskkill /F /PID`, `cmd /c`)
#          are auto-rewritten to MinGW paths (`C:/Program Files/Git/F`), breaking
#          flag parsing — `cmd /c "..."` drops to interactive cmd instead of running.
# Fix:  Set all three escape vars BEFORE any bash subprocess starts. These vars
#       were documented in CLAUDE.local.md ENV block but never exported (W273 RC).
# Also mirrored in .claude/settings.json:env for CC-internal subprocess inheritance.
# Deep dive: docs/architecture/MSYS-PATH-REWRITE-DEEPDIVE-2026-05-17.md
# ============================================================================
$env:MSYS_NO_PATHCONV    = '1'
$env:MSYS2_ARG_CONV_EXCL = '*'
$env:MSYS2_ENV_CONV_EXCL = '*'

# ============================================================================
# (a2) Per-machine secrets sourcing (W278 2026-05-17)
# Dot-source tools/eee.local.ps1 if present (gitignored sidecar carrying LANGFUSE_*
# self-hosted creds + any other per-machine env). Pattern mirrors CLAUDE.local.md
# (the gitignored doc-only peer) into machine-executable form. Without this block,
# .mcp.json `${LANGFUSE_*}` interpolations in graphiti + langfuse MCPs would resolve
# to literal `${LANGFUSE_HOST}` strings -> silent trace-export failure (P0-2 per
# agent-teams h2-spawn-failure audit 2026-05-17).
# ============================================================================
$eeeLocalSidecar = Join-Path $PSScriptRoot 'eee.local.ps1'
if (Test-Path $eeeLocalSidecar) { . $eeeLocalSidecar }

# ============================================================================
# (a3) W348 P0.2 — OTLP Basic-auth header for self-hosted Langfuse OTel ingest.
# settings.json sets OTEL traces+metrics endpoints + protocols but NOT headers
# (secrets must NOT live in tracked settings.json). Langfuse /api/public/otel
# requires `Authorization: Basic base64(pk:sk)` — without it, ingest returns 401
# and BOTH traces + metrics are silently dropped (W309-C2 traces + W346-E P6.b
# metrics). Compute from the gitignored sidecar's LANGFUSE_* env (loaded at a2);
# no secret enters the tracked file. Verify post-launch:
#   curl -sS -o /dev/null -w "%{http_code}" -H "Authorization: Basic <b64>" \
#     http://127.0.0.1:3000/api/public/otel/v1/traces   # expect 2xx, not 401
# Cite: opentelemetry.io/docs/specs/otlp + Langfuse OTel ingest auth + W346-E.
# ============================================================================
if ($env:LANGFUSE_PUBLIC_KEY -and $env:LANGFUSE_SECRET_KEY) {
    $lfB64 = [Convert]::ToBase64String([Text.Encoding]::UTF8.GetBytes("$($env:LANGFUSE_PUBLIC_KEY):$($env:LANGFUSE_SECRET_KEY)"))
    $env:OTEL_EXPORTER_OTLP_HEADERS = "Authorization=Basic $lfB64"
}

# ============================================================================
# (b) Anthropic-canonical runtime ENV
# Per https://code.claude.com/docs/en/env-vars + CCBP claude-settings.md:885-921 @ 64fffd53
# ============================================================================
$env:CLAUDE_CONFIG_DIR             = 'Z:/claude-sota-installed/.claude'
$env:CLAUDE_CODE_TMPDIR            = 'Z:/claude-sota-installed/tmp'
$env:CLAUDE_CODE_PLUGIN_CACHE_DIR  = 'Z:/claude-sota-installed/.claude/plugins'
$env:CLAUDE_CODE_DEBUG_LOGS_DIR    = 'Z:/claude-sota-installed/.claude/debug'
$env:CLAUDE_CODE_GIT_BASH_PATH     = 'C:\Program Files\Git\bin\bash.exe'
# CLAUDE_CODE_DISABLE_GIT_INSTRUCTIONS DEDUPED Wave 75 2026-05-08 — set in settings.json:env per CCBP claude-settings.md:6 @ HEAD 64fffd53 ("use env field in settings.json to avoid wrapper scripts"). Setting here was redundant with settings.json L6.

# ============================================================================
# (b1) Token-efficiency + UX env (Wave 50 Fire 39 — Agent MM CCBP deep-dive bundle)
# Reference: TIER-1 CCBP `Z:/repos/deps/claude-code-best-practice-shan/reports/claude-advanced-tool-use.md:320 @ HEAD 64fffd53a7c6f8e2e0b1575fdd200b65cda04737 [VERIFIED 2026-05-06]`
#   verbatim: "Configure the threshold with `ENABLE_TOOL_SEARCH=auto:N` where N is the context percentage (0-100)"
#   ~85% tool-definition tokens reduction per Anthropic benchmark (claude-advanced-tool-use.md:320 cite chain)
# W278c 2026-05-17 — auto:10 → auto:5 to MATCH .claude/settings.json:env ENABLE_TOOL_SEARCH=auto:5
# (settings.json is the authority per CLAUDE.local.md: "if `tools/eee.ps1` independently
#  exports any of those vars, update it to match — `.claude/settings.json` is authoritative").
# The prior 'auto:10' here was a dead-letter (settings.json env wins on launch), but the
# divergence was confusing; sync removes the doc-drift. Behavior unchanged (more aggressive
# tool-deferral threshold = 5% of context vs CCBP default 10%).
$env:ENABLE_TOOL_SEARCH = 'auto:5'

# Reference: TIER-1 CCBP `Z:/repos/deps/claude-code-best-practice-shan/reports/claude-spinner-verbs-and-tips.md:74 @ HEAD 64fffd53 [VERIFIED 2026-05-06]`
#   verbatim: "Try setting environment variable COLORTERM=truecolor for richer colors"
#   PowerShell 7.6 + Windows Terminal honor truecolor for ANSI 24-bit per Microsoft docs
$env:COLORTERM = 'truecolor'

# Reference: TIER-1 CCBP `Z:/repos/deps/claude-code-best-practice-shan/reports/claude-spinner-verbs-and-tips.md:75 @ HEAD 64fffd53 [VERIFIED 2026-05-06]`
#   verbatim: "Set CLAUDE_CODE_USE_POWERSHELL_TOOL=1 to enable the PowerShell tool (preview)"
#   Windows-relevant: claude-sota-installed runs on Z: with PowerShell 7.6.1; preview tool enables
#   richer PS-native execution surface vs Bash-only (current Git Bash via CLAUDE_CODE_GIT_BASH_PATH)
$env:CLAUDE_CODE_USE_POWERSHELL_TOOL = '1'

# ============================================================================
# (c) Q2 2026 features (per docs/codex-plugin-cc-q2-2026-update.md §1)
# CLAUDE_CODE_FORK_SUBAGENT DEDUPED Wave 75 2026-05-08 — set in settings.json:env per CCBP claude-settings.md:6,838 @ HEAD 64fffd53. Setting here was redundant with settings.json L7.
# ============================================================================

# ============================================================================
# (b2) Advanced unleashed-mode env block (Wave 75 2026-05-08 — fleet-ccbp-plugins-latest-2026-05-08.md verdict)
# All TIER-1-DIRECT cites to Z:/repos/deps/claude-code-best-practice-shan/best-practice/claude-settings.md @ HEAD 64fffd53.
# ============================================================================

# 1-hour prompt cache TTL ≈ 12x reuse window vs 5-min default.
# Cite: claude-settings.md:831 (TIER-1-DIRECT) — long-arc workflow pattern.
$env:ENABLE_PROMPT_CACHING_1H = '1'
$env:EEE_FLEET_MIN_READY_CLAUDE = '3'
$env:EEE_FLEET_MAX_PARALLEL_CLAUDE_AGENTS = '5'
$env:EEE_FLEET_RESERVE_ORCHESTRATOR = '1'
$env:EEE_FLEET_CACHE_WARM_BARRIER = '1'
$env:EEE_FLEET_CIRCUIT_BREAKER_SECONDS = '60'
$env:EEE_FLEET_529_BACKOFF = '30'

# MAX_THINKING_TOKENS DROPPED Wave 77 2026-05-08 per fleet-arch-vs-official-2026-05-08.md TOP-OFFENDERS #1.
# Verified NOT in TIER-1-DIRECT https://code.claude.com/docs/en/env-vars roster (live WebFetch 2026-05-08).
# Original cite was CCBP claude-settings.md:566 (TIER-2 user-curated, NOT Anthropic-canonical).
# Adaptive thinking is now governed by `alwaysThinkingEnabled: true` + `effortLevel: "xhigh"` in settings.json (both TIER-1-DIRECT documented at claude-settings.md). No bounded-cap env equivalent in TIER-1.

# Aborts stalled streams instead of hanging end-of-turn.
# Cite: claude-settings.md:867 (TIER-1-DIRECT).
$env:CLAUDE_ENABLE_STREAM_WATCHDOG = '1'

# Faster tool-call streaming feedback.
# Cite: claude-settings.md:868 (TIER-1-DIRECT).
$env:CLAUDE_CODE_ENABLE_FINE_GRAINED_TOOL_STREAMING = '1'

# Long migrations / install commands no longer hit ~120s default timeout.
# Cite: claude-settings.md:824 (TIER-1-DIRECT).
# W278c 2026-05-17 — 600000 (10 min) → 1800000 (30 min) to MATCH .claude/settings.json:env
# BASH_MAX_TIMEOUT_MS=1800000 (settings.json is authoritative per CLAUDE.local.md).
# Prior 600000 was a dead-letter (settings.json wins); sync removes doc-drift. Behavior unchanged.
$env:BASH_MAX_TIMEOUT_MS = '1800000'

# Cross-session task continuity (Tasks v2.1.16+).
# Cite: claude-global-vs-project-settings.md:178 (TIER-1-DIRECT).
$env:CLAUDE_CODE_TASK_LIST_ID = 'claude-sota-installed'

# Wave 94 Phase 3 of Ship 1T: Opus 4.7 adaptive-thinking burn-rate mitigation.
# Per cnighswonger advisory: Opus 4.7 burns Q5h quota ~2.4x faster than 4.6 due
# to: (a) new tokenizer up to 35% more tokens, (b) adaptive-thinking ~105%
# overhead. CLAUDE_CODE_DISABLE_ADAPTIVE_THINKING=1 reduces burn ~3.3x but may
# reduce quality on complex tasks (operator can override per-shell).
# Cite TIER-1-DIRECT: Z:/repos/deps/cnighswonger-claude-code-cache-fix/README.md:11
#   @ HEAD 12cc30a1 (Opus 4.7 advisory + ArkNill independent confirmation +
#   Discussion #25/#42 controlled A/B data + Q7d analysis)
# Cite TIER-1-DIRECT: https://platform.claude.com/docs/en/about-claude/models/whats-new-claude-4-7
#   (35% tokenizer increase documented)
# Operator override: $env:CLAUDE_CODE_DISABLE_ADAPTIVE_THINKING=$null before eee
$env:CLAUDE_CODE_DISABLE_ADAPTIVE_THINKING = '1'

# ============================================================================
# (d) Git Bash / MSYS path-rewrite suppression — env-only, NOT argv
# Per Wave 50 Fire 42 codex T1 NEEDS-REVISION conf=0.86 verdict at
# Z:/claude-sota-installed/.claude/state/codex_consult_fire42_eee_silent_hang_OUT.txt:4144,4267.
# Empirical isolation: with MSYS2_ARG_CONV_EXCL='*', Claude plugin hooks pass POSIX
# /z/claude-sota-installed/... plugin roots through Git Bash to Windows node.exe,
# which path.resolve interprets as drive-relative → Z:\z\claude-sota-installed\...
# (verified via 3-way ablation probe; full trace at OUT.txt:4151-4159).
# Keep env-conversion suppressed (env vars stay Win32 form for child processes), but
# let MSYS convert argv (POSIX→Win32 before Windows node.exe receives it).
# ============================================================================
Remove-Item Env:\MSYS_NO_PATHCONV -ErrorAction SilentlyContinue
Remove-Item Env:\MSYS2_ARG_CONV_EXCL -ErrorAction SilentlyContinue
Remove-Item Env:\CLAUDE_PLUGIN_ROOT -ErrorAction SilentlyContinue
Remove-Item Env:\ECC_PLUGIN_ROOT -ErrorAction SilentlyContinue
$env:MSYS2_ENV_CONV_EXCL  = '*'

# ============================================================================
# (e) State-outside-repo redirects — credential-class artifacts
# Per Z:/claude-sota/.claude/projects/Z--claude-sota/memory/feedback_codex_home_redirect_no_auth_2026_05_01.md
# CODEX_HOME redirect requires auth.json migration — handled at codex install time per docs/sota-installed-manifest.md.
# CLAUDE_CODE_PROJECT_DIR REMOVED 2026-05-20 — phantom env var, zero refs in CC binary,
# never honored. CC writes sessions to $CLAUDE_CONFIG_DIR/projects/ (in-repo default)
# regardless. Verified via codex GPT-5.5 adversarial audit + strings grep on claude.exe.
# ============================================================================
$env:CODEX_HOME              = 'Z:/claude-sota-installed-state/.codex'

# W155 F14 2026-05-12 — TERMINAL-SPAWN-CHURN FIX: CODEX_PLUGIN_ROOT activation
# Hook scripts (codex_t1_consult_gate.py + codex_t2_pre_commit_gate.py + codex_postcommit_review.py
# + codex_prepush_review.py + codex_stop_review_gate.py) have BYPASS-SHIM logic that prefers
# `node <abs>/codex.js` over `cmd /c codex.CMD` IF this env is set. Was UNSET → hooks fell back
# to `cmd.exe /c codex.CMD exec` which spawns cmd.exe + conhost.exe per invocation (~2 window
# pops per git commit / Edit/Write). Setting this activates the existing native-node code path
# (same fix-class as W155 F12 ccstatusline + F13 4 MCP migrations). Empirical confirmation:
# probe at 13:56 EDT showed `cmd.exe /c Z:\claude-sota-installed\.local\npm\codex.CMD exec`
# spawned by python.exe (codex_t2_pre_commit_gate.py) as direct conhost window-pop source.
# codex.js verified exists at Z:/claude-sota-installed/.local/npm/node_modules/@openai/codex/bin/
# Cite: TIER-1-LOCAL codex_t2_pre_commit_gate.py:570-583 (BYPASS-SHIM env-driven activation logic)
$env:CODEX_PLUGIN_ROOT = 'Z:/claude-sota-installed/.local/npm/node_modules/@openai/codex/bin'

# ============================================================================
# (e0) RTK token-killer on PATH — V65 SOTA stack: ccusage + RTK + Serena + Repomix
# Cite: TIER-1 https://github.com/rtk-ai/rtk @ commit 2fbc7514 v0.39.0 (Apache-2.0/MIT)
# Cite: docs/outer research/kits/v65/.../TOKEN_CONTEXT_ARCHITECTURE.md (operator-curated layered architecture)
# Effect: when claude.exe spawns Bash, RTK can be invoked via `rtk git status` etc.
# To enable PreToolUse auto-rewriting, operator runs ONCE: rtk init -g (with this eee env active)
# ============================================================================
$rtkBinDir = 'Z:\claude-sota-installed\.local\cargo\bin'
if ((Test-Path $rtkBinDir) -and ($env:PATH -notlike "*$rtkBinDir*")) {
    $env:PATH = "$rtkBinDir;$env:PATH"
}

# ============================================================================
# (e0.1) W154 F5 — .local/bin de-dup-then-prepend (Machine PATH precedence defense)
# Per W154 F4 V3 ADVERSARIAL a2 finding: User PATH ordering CANNOT shadow Machine PATH
# in fresh shells (C:/Program Files/GitHub CLI/ at Machine idx=31 wins over User PATH .local/bin).
# F5 fix: process-scope de-dup-then-prepend ensures Z .local/bin first regardless of inherited
# Process PATH ordering. Reversible <30s via git revert; affects only eee child processes.
# Cite TIER-1-DIRECT: V2 verdict .claude/state/codex_consult_w154_f5_path_fix_v2_OUT.txt APPROVE conf=0.94
# Cite TIER-1-DIRECT: V3 ADVERSARIAL .claude/state/codex_consult_w154_f5_path_fix_v3_adversarial_OUT.txt F5-NEEDED-LIGHT conf=0.93
# V3 RECURSIVE catch: trailing-slash normalization (V2 -ine alone misses 'Z:\...\bin\' variant
# per W154 F4 lesson — Machine PATH had 'C:\Program Files\GitHub CLI\' with trailing backslash).
# ============================================================================
$zLocalBin = 'Z:\claude-sota-installed\.local\bin'
if (Test-Path $zLocalBin) {
    $entries = $env:PATH -split ';' | Where-Object { $_ -and (($_.TrimEnd('\','/')) -ine $zLocalBin) }
    $env:PATH = "$zLocalBin;$($entries -join ';')"
}

# ============================================================================
# (e1) CHAINED PROXY ROUTING — claude.exe → cnighswonger:19801 → CLIProxyAPI:18317 → Anthropic
# Wave 92 Ship 1T 2026-05-08: cnighswonger v3.5.3 cache-fix proxy chained in front of
# CLIProxyAPI 8-account fleet. Combined: 7 cache-fix extensions (fingerprint-strip /
# sort-stabilization / ttl-management / identity-normalization / fresh-session-sort /
# cache-control-normalize / cache-telemetry) + 8-account fill-first routing + 4h
# cache-affinity TTL. Measured 99.8% first-warm-turn cache-creation reduction
# (940K → 1.7K tokens) on CC v2.1.112 + Opus 4.7 per @deafsquad in cnighswonger
# CHANGELOG.md @ HEAD 12cc30a1 v2.0.0+v3.3.0+v3.5.3.
#
# Per launch-discipline.md D1 invariants:
# - REVERSIBLE: stop cache-fix-proxy + git revert eee.ps1 (no data changes)
# - OBSERVABLE: cache-fix-proxy logs to .claude/state/cache-fix-proxy.log;
#   cpa-usage-keeper SQLite tracks per-account; CLIProxyAPI main.log
# - INCREMENTAL: phase 1 internal-operator only (this commit)
#
# Cite TIER-1-DIRECT: https://code.claude.com/docs/en/env-vars (ANTHROPIC_BASE_URL canonical)
# Cite TIER-1-DIRECT: Z:/repos/deps/CLIProxyAPI/internal/api/server.go:359 @ HEAD 785b00c3 [Mia VERIFIED 2026-05-08] (POST /v1/messages handler)
# Cite TIER-1-DIRECT: Z:/repos/deps/CLIProxyAPI/internal/api/server.go:340-341 @ HEAD 785b00c3 (/healthz liveness)
# Cite TIER-1-DIRECT: Z:/repos/deps/cnighswonger-claude-code-cache-fix/README.md:13-44 @ HEAD 12cc30a1 (proxy mode + 7 extensions + chain via CACHE_FIX_PROXY_UPSTREAM)
# Cite TIER-1-DIRECT: Z:/repos/deps/cnighswonger-claude-code-cache-fix/README.md:11 @ HEAD 12cc30a1 (Opus 4.7 advisory: CLAUDE_CODE_DISABLE_ADAPTIVE_THINKING=1 reduces 5h burn ~3.3x)
# ============================================================================
$EEE_PROXY_BASE     = 'http://127.0.0.1:18317'  # CLIProxyAPI 8-account fleet (port migrated Wave 149: Windows excluded range 8255-8354 captured 8317)
$EEE_CACHEFIX_BASE  = 'http://127.0.0.1:19801'  # cnighswonger v3.5.3 cache-fix (Windows excludes default 9801; chosen 19801 per Wave 92 verified live)
$EEE_PROXY_KEY      = 'eee-fleet-key-orchestrator'

# Default-active CHAINED routing: claude.exe → cnighswonger:19801 → CLIProxyAPI:18317 → Anthropic
# (cnighswonger upstream env CACHE_FIX_PROXY_UPSTREAM=http://127.0.0.1:8317 set when
# starting cache-fix-proxy server; not set here — set by service startup).
# When cache-fix-proxy unreachable, falls back to direct CLIProxyAPI; if both
# unreachable, T0.8 hybrid unsets ANTHROPIC_BASE_URL+AUTH_TOKEN so claude.exe
# routes via subscription OAuth at .claude/.credentials.json per
# https://code.claude.com/docs/en/authentication §Authentication precedence.
$env:ANTHROPIC_BASE_URL   = $EEE_CACHEFIX_BASE
$env:ANTHROPIC_AUTH_TOKEN = $EEE_PROXY_KEY

# Per-class API keys for sub-agents (orchestrator inherits; sub-agents may override per dispatch class).
# Cite: docs/eee-launch-design-cliproxyapi.md §2 (4-key API stratification)
$env:EEE_PROXY_KEY_RESEARCH     = 'eee-fleet-key-research'
$env:EEE_PROXY_KEY_CODEX_BRIDGE = 'eee-fleet-key-codex-bridge'
$env:EEE_PROXY_KEY_EVAL         = 'eee-fleet-key-eval'

# Codex CLI cross-routing (Tier 1a hooks consume; Phase 1 bootstrap exception per CR-3 + design §16)
# Cite: Z:/repos/deps/CLIProxyAPI/internal/api/server.go:367-373 @ HEAD 785b00c3 (codex direct group)
$env:EEE_OPENAI_BASE_URL_PROXY = "$EEE_PROXY_BASE/backend-api/codex"

# ============================================================================
# (f) [DROPPED Wave 50 Agent B P2] CLAUDE_SOTA_INSTALLED_RUNTIME setter removed
# Was a setter with zero readers (hidden self-invention per cardinal-rule-5).
# Re-introduce ONLY when a hook/script consumer lands that needs runtime-context
# detection (then add cite anchor + consumer reference).
# ============================================================================

# ============================================================================
# (f3) W317 Stream-C 2026-05-19 — plugin data-dir overrides preventing phantom Z:\z\
# Git Bash converts HOME=Z:\... -> HOME=/z/... at /etc/profile (msys-2.0.dll v3.6.4
# inbound conversion; CANNOT be disabled via MSYS_NO_PATHCONV / MSYS2_ENV_CONV_EXCL
# per W317 Stream-B root-cause analysis). Plugins reading HOME / os.homedir() /
# expanduser('~') then write to mangled paths via Node's path.resolve('/z/foo') =
# 'Z:\z\foo' on win32. Setting explicit data-dir env vars bypasses HOME entirely.
# settings.json:env mirror is authoritative for CC-spawned subprocesses;
# eee.ps1 mirror is for parent-shell + child-shell visibility.
# Cite: docs/architecture/W317-FULL-MSYS-FIX-WAVE/STREAM-C-ENV-OVERRIDE-ARCHITECTURE.md
# ============================================================================
$env:CLAUDE_PLUGIN_DATA        = 'Z:\claude-sota-installed\.claude\plugins\data'
$env:GATEGUARD_STATE_DIR       = 'Z:\claude-sota-installed\.claude\state\gateguard'
$env:AUDIT_ROOT                = 'Z:\claude-sota-installed'
$env:CLAUDE_MEM_DATA_DIR       = 'Z:\claude-sota-installed\.claude\plugins\data\claude-mem'
$env:ECC_SESSION_RECORDING_DIR = 'Z:\claude-sota-installed\.claude\session-data\recordings'

# BASH_ENV shim re-pins HOME post /etc/profile so subprocess bash respects Windows form.
$env:BASH_ENV = 'Z:/claude-sota-installed/.claude/state/bash-home-pin.sh'

# Ensure dirs exist (CC won't auto-create them)
foreach ($dir in @($env:CLAUDE_PLUGIN_DATA, $env:GATEGUARD_STATE_DIR,
                   $env:CLAUDE_MEM_DATA_DIR, $env:ECC_SESSION_RECORDING_DIR)) {
    if (-not (Test-Path $dir)) {
        New-Item -ItemType Directory -Path $dir -Force | Out-Null
    }
}

# Idempotent residual-defense: archive any root-level truncated-prefix phantoms
# (claud, claude-sot, claude-sota-*) created by MSYS path-conversion regressions.
# No-op when nothing to clean. ~5 LOC. See tools/cleanup-root-phantom-paths.ps1.
$phantomCleanup = 'Z:\claude-sota-installed\tools\cleanup-root-phantom-paths.ps1'
if (Test-Path $phantomCleanup) {
    try { & $phantomCleanup -Execute 2>&1 | Out-Null } catch { }
}

# Re-namespace plugin sub-skill bare names (autoresearch-agent, agenthub, and their
# engineering-advanced-skills duplicates) so they don't shadow built-in CC commands
# like /resume, /run, /status, /init, /eval, /merge. Also fixes broken
# {skill_path}/scripts/ refs to point at the actual sibling-parent scripts dir.
# Idempotent — survives plugin updates.
$shadowRepatch = 'Z:\claude-sota-installed\tools\repatch-plugin-shadow-commands.ps1'
if (Test-Path $shadowRepatch) {
    try { & $shadowRepatch 2>&1 | Out-Null } catch { }
}

# W339-P0a: rewrite context-mode hooks.json hardcoded version-paths to ${CLAUDE_PLUGIN_ROOT}
# so they survive auto-update version bumps. Otherwise every PreToolUse hook fires
# MODULE_NOT_FOUND when the referenced prior-version cache dir is removed.
# Cite: code.claude.com/docs/en/plugins (retr 2026-05-20).
$ctxModeRepatch = 'Z:\claude-sota-installed\tools\repatch-context-mode-hooks-json.ps1'
if (Test-Path $ctxModeRepatch) {
    try { & $ctxModeRepatch 2>&1 | Out-Null } catch { }
}

# ============================================================================
# (g) Claude Code binary discovery
# Per cardinal-rule-5 install-priority: Anthropic CC itself is an install (anthropics/claude-code on GitHub).
# Until native install lands at Z:/claude-sota-installed/.local/bin/claude.exe, fall back to parent claude harness binary.
# ============================================================================
$claudeBin = $null
$nativeBin = 'Z:\claude-sota-installed\.local\bin\claude.exe'
$parentBin = 'Z:\claude\.local\bin\claude.exe'

if (Test-Path $nativeBin) {
    $claudeBin = $nativeBin
    Write-Host "[eee] Using native claude.exe at: $claudeBin" -ForegroundColor Green
} elseif (Test-Path $parentBin) {
    $claudeBin = $parentBin
    Write-Host "[eee] FALLBACK to parent claude.exe at: $claudeBin (install anthropics/claude-code natively per docs/install-from-github-discipline.md to remove this fallback)" -ForegroundColor Yellow
} else {
    Write-Host "[eee] ERROR: claude.exe not found at native ($nativeBin) or parent ($parentBin)." -ForegroundColor Red
    Write-Host "[eee] Install Anthropic CC per https://code.claude.com/docs/en/setup or pull native binary from anthropics/claude-code GitHub releases." -ForegroundColor Red
    exit 1
}

# ============================================================================
# (h) State-dir bootstrap (CODEX_HOME + projects)
# Create directories if absent — non-destructive
# ============================================================================
foreach ($dir in @($env:CODEX_HOME, $env:CLAUDE_CODE_TMPDIR, "$env:CLAUDE_CONFIG_DIR/debug")) {
    if (-not (Test-Path $dir)) {
        # Progress-write to prevent silent-hang on first launch (Wave 50 Fire 41 —
        # operator hit ~4min silent-hang Z:/claude-sota-installed-state/.claude/projects
        # mkdir 2026-05-06 23:33). Recommend running bin/install-path.ps1 first to
        # pre-create these dirs at install-time instead of first-launch.
        Write-Host "[eee] Creating state dir: $dir (one-time; can be slow on Z: drive)..." -ForegroundColor Yellow
        New-Item -ItemType Directory -Force -Path $dir | Out-Null
    }
}

# ============================================================================
# (i) HARD-GATE preflight — SOTA-native-install integrity verification
# Per Wave 50 fire 23 user directive ("please hard gate eee for all the sota native install of most advanced repos") + cardinal-rule-12 install-priority + cardinal-rule-9 install-risk + cardinal-rule-7 REPORT errors before routing around them.
# Reference: TIER-2 sibling discipline Z:/claude-sota/CLAUDE.md "Hard Rules" + "REPORT errors before routing around them" [VERIFIED 2026-05-06 via Read sibling CLAUDE.md L114,119]
# Reference: TIER-2 sibling discipline Z:/claude-sota/.claude/rules/named-failure-modes.md FM-09 META-router (harness-fit verification at process-launch boundary) [VERIFIED 2026-05-06]
# Discipline: HARD checks fail-closed (exit 1); ADVISORY warns surface but allow launch. Bootstrap exception via EEE_BOOTSTRAP=1 env per cardinal-rule-7 graduated-unleash 3-phase model.
# ============================================================================
$EEE_HARD_FAILURES = @()
$EEE_ADVISORY_WARNS = @()

# T0.0 — Tier 2A MCP credential passthrough validation (no setters; state stays outside repo)
# Reference: TIER-1 Z:/repos/deps/github-mcp-server/docs/installation-guides/install-claude.md:31-46 @ HEAD 62266f80 (HTTP add-json + Authorization Bearer)
# Reference: TIER-1 Z:/repos/deps/context7/README.md:59 @ HEAD 795d5da7 (CONTEXT7_API_KEY header)
# Reference: TIER-1 https://docs.devin.ai/work-with-devin/deepwiki-mcp [VERIFIED 2026-05-06] (deepwiki public no-auth)
# Per CLAUDE.local.md ENV (e) state-outside-repo: credentials are operator-ambient; eee.ps1 only validates presence
# Wave 50 Fire 37 prescribed_edit #2 per codex T1 NEEDS-REVISION conf=0.89 verdict
if (-not $env:GITHUB_TOKEN) {
    $EEE_ADVISORY_WARNS += "GITHUB_TOKEN is unset; github MCP Authorization header in .mcp.json will not expand/connect"
}
if (-not $env:CONTEXT7_API_KEY) {
    $EEE_ADVISORY_WARNS += "CONTEXT7_API_KEY is unset; context7 MCP header in .mcp.json will not expand/connect"
}

# T0.1 — claude.exe MUST be native (parent-fallback was warn-allow; promoted to HARD per "all the sota native install" directive)
if ($claudeBin -ne $nativeBin) {
    $EEE_HARD_FAILURES += "claude.exe is NOT native (using parent fallback at $claudeBin); install anthropics/claude-code natively at $nativeBin per docs/sota-installed-manifest.md Section 0"
}

# T0.2 — Wave 80 P#8 / Wave 83 apply: dynamically derive expected plugins from settings.json:enabledPlugins
# Per CR-7 graduated-unleash + Wave 50 fire 23 + real-GPT-5.5 codex T1 verdict NEEDS-REVISION conf=0.91-0.96.
# Hardcoded list was 3; actual enabled is now 7 (superpowers, codex, everything-claude-code,
# pyright-lsp, agent-sdk-dev, ralph-loop, frontend-design). Dynamic read keeps gate in sync with settings.json.
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
        # Floor check: at least the 3 cardinal-rule-3 + cardinal-rule-12 mandated plugins MUST be enabled.
        # superpowers (cardinal-rule-12 Top-3 #1), codex (cardinal-rule-3 T1-T7 backbone), everything-claude-code (Top-3 #3).
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

# T0.3 — Wave 80 P#8 / Wave 83 apply: dynamically verify each enabled plugin's cache root exists with at least one version dir.
# Plugin name format: '<plugin>@<marketplace>'. Cache layout: .claude/plugins/cache/<marketplace>/<plugin>/<version>/
# where <version> may be semver (5.1.0) OR content-hash (70d57685d411). Dynamic discovery removes hardcoded version-string drift hazard (CR-9 D6 today-release-auto-upgrade defense).
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

# T0.4 — python venv MUST be present (required by all sibling-cite-imported hooks)
$pythonExe = 'Z:/venvs/claude/Scripts/python.exe'
if (-not (Test-Path $pythonExe)) {
    $EEE_HARD_FAILURES += "python venv missing at $pythonExe (required by sibling-cite-imported hooks)"
}

# T0.5 — codex CLI MUST be on PATH (cardinal-rule-3 cross-model T1-T7 lifecycle substrate)
$codexCmd = Get-Command codex -ErrorAction SilentlyContinue
if (-not $codexCmd) {
    $EEE_HARD_FAILURES += "codex CLI not on PATH (cardinal-rule-3 cross-model T1-T7 lifecycle requires codex 0.129.0+ per Wave 75 2026-05-08 fleet-ccbp-plugins-latest verdict — TUI Vim, resume/fork picker, workspace-aware /diff per openai/codex rust-v0.129.0 release 2026-05-07); install per https://github.com/openai/codex"
}

# T0.6 ADVISORY — Tier 2A MCP registry present (github + context7 + deepwiki)
# Reference: TIER-1 https://code.claude.com/docs/en/mcp [VERIFIED 2026-05-06] (.mcp.json schema authority)
# Wave 50 Fire 37 prescribed_edit #3 per codex T1 NEEDS-REVISION conf=0.89 verdict
$mcpConfigPath = Join-Path $env:USERPROFILE '.mcp.json'
if (-not (Test-Path $mcpConfigPath)) {
    $EEE_ADVISORY_WARNS += ".mcp.json missing at $mcpConfigPath (Tier 2A MCP registry target: github + context7 + deepwiki)"
} else {
    try {
        $mcpConfig = Get-Content $mcpConfigPath -Raw | ConvertFrom-Json
        $mcpCount = 0
        if ($mcpConfig.mcpServers) {
            # Wrap in @(...) to force array context.
            # PowerShell member-access enumeration: PSMemberInfoCollection has no native .Count member,
            # so .Count auto-projects onto each PSPropertyInfo (each returns Count=1) → @(1,1,1...).
            # Reference: TIER-1 https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_member-access_enumeration?view=powershell-7.6
            # Repro: BAD `$cfg.mcpServers.PSObject.Properties.Count` → Object[] "1 1 1" for 3 servers.
            # FIX:  `@($cfg.mcpServers.PSObject.Properties).Count` → Int32 3 (correct).
            $mcpCount = @($mcpConfig.mcpServers.PSObject.Properties).Count
        }
        if ($mcpCount -lt 3) {
            $EEE_ADVISORY_WARNS += ".mcp.json has $mcpCount MCP server(s); Tier 2A target is 3 (github + context7 + deepwiki)"
        }
    } catch {
        $EEE_ADVISORY_WARNS += ".mcp.json parse failure: $($_.Exception.Message)"
    }
}

# W279 2026-05-17 — removed pre-W255 T1 + T2 ADVISORY blocks (W50-fire23 Agent W H1 design).
#   - T1 checked for codex_t1_consult_gate.py + codex_gate.py at .claude/hooks/scripts/ which is
#     forbidden by CLAUDE.md cardinal-rule-2 (".claude/hooks/scripts/*.py self-invent forbidden").
#     The W259-v8 U1 hooks block in settings.json (gitleaks/ruff/shellcheck/jq direct-CLI) is the
#     SOTA wire; checking for self-invent scripts inverts the cardinal rule.
#   - T2 checked settings.json:hooks non-empty — already non-empty (4 direct-CLI hooks per W259-v8 U1).
#     Both blocks added dead ADVISORY_WARNS on every launch. Revert: restore from git history.

# T0.7 ADVISORY — CLIProxyAPI binary + config presence
# Cite: docs/eee-launch-design-cliproxyapi.md §4.2 + §6 manifest §Section 2.5
$cliProxyBin    = 'Z:\claude-sota-installed\.local\bin\cli-proxy-api.exe'
$cliProxyConfig = 'Z:\claude-sota-installed\.cli-proxy-api\config.yaml'
# Wave 120 Ship CL-4-FIX 2026-05-09 (codex T1 W120 NEEDS-REVISION conf=0.90 Pattern A apply): derive auth-dir from config.yaml `auth-dir:` setting per codex T1 W119 F-4 prescribed_edit (was hardcoded `auths/` subdir; FALSE POSITIVE catch — actual config sets auth-dir to base `.cli-proxy-api/` dir per Z:/claude-sota-installed/.cli-proxy-api/config.yaml:20).
# TIER-1-DIRECT cite chain (Pattern A prescription #1 — codex W120 caught selector.go OVER-claim):
#   - Z:/repos/deps/CLIProxyAPI/internal/config/config.go:43 @ HEAD 785b00c3 (auth-dir config field)
#   - Z:/repos/deps/CLIProxyAPI/internal/util/util.go:76 @ HEAD 785b00c3 (auth-dir resolution)
#   - Z:/repos/deps/CLIProxyAPI/internal/watcher/clients.go:302-328 @ HEAD 785b00c3 (auth-dir file enumeration)
#   - Z:/repos/deps/CLIProxyAPI/internal/watcher/synthesizer/file.go:31-53 @ HEAD 785b00c3 (auth JSON file synthesis)
#   - Z:/repos/deps/CLIProxyAPI/sdk/cliproxy/auth/selector.go:371-375 @ HEAD 785b00c3 (disabled/status filter at selection time, NOT enumeration)
$cliProxyAuthDir = Split-Path -Parent $cliProxyConfig
if ((Test-Path $cliProxyConfig) -and ($yamlContent = Get-Content $cliProxyConfig -Raw -ErrorAction SilentlyContinue)) {
    if ($yamlContent -match '(?m)^\s*auth-dir:\s*["'']?([^"''\r\n]+)["'']?\s*$') {
        $cliProxyAuthDir = $matches[1].Trim()
    }
}
if (-not (Test-Path $cliProxyBin)) {
    $EEE_ADVISORY_WARNS += "cli-proxy-api.exe missing at $cliProxyBin (CR-6 install: `gh release download v6.10.9 --repo router-for-me/CLIProxyAPI --pattern '*windows_amd64.zip'`)"
} elseif (-not (Test-Path $cliProxyConfig)) {
    $EEE_ADVISORY_WARNS += "cli-proxy-api config missing at $cliProxyConfig (author from docs/eee-launch-design-cliproxyapi.md §18 SOTA recipe)"
}

# T0.8 ADVISORY — CLIProxyAPI fleet runtime status (ENABLED Claude account count + healthz liveness)
# Cite: TIER-1-DIRECT Z:/repos/deps/CLIProxyAPI/internal/api/server.go:340-341 @ HEAD 785b00c3 (/healthz)
# Cite: TIER-1-DIRECT Z:/repos/deps/CLIProxyAPI/sdk/cliproxy/auth/selector.go:371-375 @ HEAD 785b00c3 (disabled/status filter at selection — auth excluded from selection if disabled=true OR status="disabled")
# Phase 1 bootstrap: WARN-only (eee falls through to api.anthropic.com if proxy unreachable)
# Phase 2 promotion (CR-7): flip to HARD-FAIL when proxy install + ≥1 account onboarded
# Wave 120 Ship CL-4-FIX 2026-05-09 (codex T1 W120 Pattern A prescription #2 + #3): count ENABLED Claude OAuth accounts (NOT just claude-shaped files) — parse each auth JSON and gate on type=="claude" AND disabled!=true AND status!="disabled". Schema verified Wave 120 fire-2 via auth JSON probe: keys=[_note,access_token,disabled,email,expired,id_token,last_refresh,priority,refresh_interval_seconds,refresh_token,type] (status field optional — selector treats missing as enabled).
$EEE_PROXY_MIN_ACCOUNTS = 1
$authCount = 0
if (Test-Path -LiteralPath $cliProxyAuthDir) {
    $authCount = @(
        Get-ChildItem -LiteralPath $cliProxyAuthDir -Filter 'claude-*.json' -File -ErrorAction SilentlyContinue |
        Where-Object {
            try {
                $auth = Get-Content -LiteralPath $_.FullName -Raw -ErrorAction Stop | ConvertFrom-Json -ErrorAction Stop
                ([string]$auth.type).ToLowerInvariant() -eq 'claude' -and
                -not [bool]$auth.disabled -and
                ([string]$auth.status).ToLowerInvariant() -ne 'disabled'
            } catch {
                $false
            }
        }
    ).Count
}
if ($authCount -lt $EEE_PROXY_MIN_ACCOUNTS) {
    $EEE_ADVISORY_WARNS += "cli-proxy-api ENABLED Claude fleet at ${cliProxyAuthDir}/ has $authCount account(s); min recommended=$EEE_PROXY_MIN_ACCOUNTS. Run --claude-login per docs/eee-launch-design-cliproxyapi.md §3.2"
}

# Healthz probe + Wave 92 Ship 1T 3-tier hybrid recovery (chained proxy fallback chain)
# Closes 2026-05-08 11:00 ConnectionRefused incident (operator hit 127.0.0.1:8317 unreachable
# because L153 set ANTHROPIC_BASE_URL unconditionally + advisory text falsely claimed fall-through).
# Wave 92 Ship 1T extension per codex T1 NEEDS-REVISION conf=0.87 fix-forward:
#   3-tier probe order — cnighswonger:19801 → CLIProxyAPI:18317 → direct OAuth
#   - Tier 1: cnighswonger /health alive → use cnighswonger (full 7-fix chain)
#   - Tier 2: cnighswonger DOWN but CLIProxyAPI /healthz alive → set ANTHROPIC_BASE_URL
#     to CLIProxyAPI 8317 directly (skip cache-fix layer; preserve 8-account routing)
#   - Tier 3: BOTH down → unset BASE_URL+AUTH_TOKEN; route via subscription OAuth
# Reference: TIER-1 https://code.claude.com/docs/en/env-vars (ANTHROPIC_BASE_URL semantics)
# Reference: TIER-1 https://code.claude.com/docs/en/authentication §Authentication precedence
# Reference: TIER-1 Z:/repos/deps/CLIProxyAPI/internal/api/server.go:340-341 @ HEAD 785b00c3 (/healthz)
# Reference: TIER-1 Z:/repos/deps/cnighswonger-claude-code-cache-fix/README.md:127-131 @ HEAD 12cc30a1 (/health endpoint)
# Reference: T0.9 cpa-usage-keeper precedent at eee.ps1:431-461 (Wave 81 Ship 1C; mirror pattern)
# Reference: launch-discipline.md §3 invariants (REVERSIBLE/OBSERVABLE/INCREMENTAL)
# Verdict files:
#   Wave 82: .claude/state/codex_consult_wave82_synthesis_verdict_OUT.txt (APPROVE conf=0.9)
#   Wave 92: .claude/state/codex_consult_ship_1t_v2_OUT.txt (NEEDS-REV conf=0.87 → this fix-forward)
$EEE_PROXY_REACHABLE = $false
$EEE_CACHEFIX_REACHABLE = $false

# TIER 1: Probe cnighswonger cache-fix proxy (default-routed via $env:ANTHROPIC_BASE_URL)
# Wave 108 Ship 2R-launcher-fix-2 2026-05-08: cnighswonger /health returns "ok" based on its
# OWN health, NOT upstream CPA. Without an upstream :8317 probe, claude.exe routes via
# cnighswonger:19801 → forwards to dead :8317 → INFINITE HALT (operator session 22:42→22:49
# stuck-state). Fix: probe BOTH cnighswonger /health AND CPA :8317 /healthz; only declare
# reachable when CHAIN-END (CPA) is actually alive. Cite: cnighswonger /health upstream
# semantic at Z:/repos/deps/cnighswonger-claude-code-cache-fix/README.md:127-131 @ HEAD 12cc30a1
# (does not document upstream-validation). CR-9 LOW (bootstrap launcher edit; reversible).
try {
    $cfProbe = Invoke-RestMethod -Uri "$EEE_CACHEFIX_BASE/health" -TimeoutSec 2 -ErrorAction Stop
    if ($cfProbe.status -eq 'ok') {
        # cnighswonger alive — but verify upstream :8317 chain end before declaring reachable
        try {
            $upstreamProbe = Invoke-RestMethod -Uri "$EEE_PROXY_BASE/healthz" -TimeoutSec 2 -ErrorAction Stop
            if ($upstreamProbe.status -eq 'ok') {
                Write-Host "[eee] cnighswonger cache-fix-proxy OK ($EEE_CACHEFIX_BASE; chained → CLIProxyAPI verified live)" -ForegroundColor Green
                $EEE_CACHEFIX_REACHABLE = $true
                $EEE_PROXY_REACHABLE = $true
            } else {
                Write-Host "[eee] cnighswonger /health OK but upstream CLIProxyAPI ($EEE_PROXY_BASE) healthz returned status='$($upstreamProbe.status)' — falling through to Tier 2 auto-start" -ForegroundColor Yellow
                $EEE_ADVISORY_WARNS += "cnighswonger /health was OK but upstream CLIProxyAPI returned non-ok status — chain INCOMPLETE; will auto-start CPA"
            }
        } catch {
            Write-Host "[eee] cnighswonger /health OK but upstream CLIProxyAPI ($EEE_PROXY_BASE) unreachable — falling through to Tier 2 auto-start (Wave 108 Ship 2R-launcher-fix-2: chain-end validation prevents 22:42 infinite-halt class)" -ForegroundColor Yellow
            $EEE_ADVISORY_WARNS += "cnighswonger /health was OK but upstream CLIProxyAPI ($EEE_PROXY_BASE) unreachable — chain INCOMPLETE; will auto-start CPA via Tier 2"
        }
    }
} catch { }

# TIER 2: cnighswonger DOWN OR upstream :8317 dead — probe CLIProxyAPI directly + auto-start
if (-not $EEE_PROXY_REACHABLE) {
    try {
        # W338-followup 2026-05-22 (operator directive "priority: no api error"): retry 3x@5s.
        # CPA is a persistent NSSM service that is essentially always up; a one-shot 2s probe can
        # transiently fail under load (or while CPA serves a slow/Overloaded request), causing a
        # WRONG fall-through to Tier-3 direct-OAuth - the session then loses the 8-account fallback
        # and eats raw 429/529 with no rotation. Retry makes a healthy-but-busy CPA reliably detected.
        $probe = $null
        for ($t = 0; $t -lt 3; $t++) {
            try { $probe = Invoke-RestMethod -Uri "$EEE_PROXY_BASE/healthz" -TimeoutSec 5 -ErrorAction Stop; if ($probe.status -eq 'ok') { break } } catch { Start-Sleep -Milliseconds 400 }
        }
        if (-not $probe) { throw "CPA healthz unreachable after 3 retries (5s each)" }
        if ($probe.status -eq 'ok') {
            # cnighswonger down BUT CLIProxyAPI alive — fall back to direct CLIProxyAPI
            $env:ANTHROPIC_BASE_URL = $EEE_PROXY_BASE
            Write-Host "[eee] CLIProxyAPI fleet OK direct ($EEE_PROXY_BASE; cache-fix layer SKIPPED — cnighswonger:19801 unreachable)" -ForegroundColor Yellow
            $EEE_ADVISORY_WARNS += "cnighswonger cache-fix-proxy unreachable at $EEE_CACHEFIX_BASE — routing direct to CLIProxyAPI; cache-prefix-stability fixes DISABLED. Restart manually: cache-fix-proxy server (env CACHE_FIX_PROXY_PORT=19801, CACHE_FIX_PROXY_UPSTREAM=$EEE_PROXY_BASE)"
            $EEE_PROXY_REACHABLE = $true
        } else {
            $EEE_ADVISORY_WARNS += "CLIProxyAPI healthz returned status='$($probe.status)' (expected 'ok')"
        }
    } catch {
        # Auto-start cli-proxy-api (mirrors T0.9 cpa-usage-keeper Start-Process pattern)
        if ((Test-Path $cliProxyBin) -and (Test-Path $cliProxyConfig)) {
            try {
                $proxyArgs = @('-config', $cliProxyConfig)
                $proxyProc = Start-Process -FilePath $cliProxyBin -ArgumentList $proxyArgs -WindowStyle Hidden -PassThru -ErrorAction Stop
                # Bounded readiness loop — 200ms × up to 15 = 3000ms cap
                $proxyReady = $false
                for ($i = 0; $i -lt 15; $i++) {
                    Start-Sleep -Milliseconds 200
                    try {
                        $reprobe = Invoke-RestMethod -Uri "$EEE_PROXY_BASE/healthz" -TimeoutSec 1 -ErrorAction Stop
                        if ($reprobe.status -eq 'ok') { $proxyReady = $true; break }
                    } catch { }
                }
                if ($proxyReady) {
                    $env:ANTHROPIC_BASE_URL = $EEE_PROXY_BASE
                    Write-Host "[eee] CLIProxyAPI auto-started direct (PID $($proxyProc.Id); cache-fix layer SKIPPED)" -ForegroundColor Yellow
                    $EEE_ADVISORY_WARNS += "cnighswonger cache-fix-proxy unreachable; CLIProxyAPI auto-started but cache-fix layer is DISABLED"
                    $EEE_PROXY_REACHABLE = $true
                } else {
                    $EEE_ADVISORY_WARNS += "CLIProxyAPI auto-start launched PID $($proxyProc.Id) but did not respond to /healthz within 3000ms — falling through to direct OAuth"
                }
            } catch {
                $EEE_ADVISORY_WARNS += "CLIProxyAPI auto-start failed: $_ — falling through to direct OAuth"
            }
        }
    }
}

# TIER 3 fall-through: BOTH proxies dead — unset BASE_URL+AUTH_TOKEN so claude.exe
# routes via subscription OAuth at .claude/.credentials.json (claudeAiOauth)
if (-not $EEE_PROXY_REACHABLE) {
    Remove-Item Env:ANTHROPIC_BASE_URL -ErrorAction SilentlyContinue
    Remove-Item Env:ANTHROPIC_AUTH_TOKEN -ErrorAction SilentlyContinue
    $EEE_ADVISORY_WARNS += "Both cnighswonger:19801 + CLIProxyAPI:18317 unreachable; ANTHROPIC_BASE_URL+AUTH_TOKEN unset — claude.exe routes to api.anthropic.com via subscription OAuth (proxy benefits disabled: no 8-account fleet, no cache-fix, no cpa-usage-keeper telemetry; restart manually: Start-Process $cliProxyBin -ArgumentList '--config',$cliProxyConfig -WindowStyle Hidden)"
}

# ============================================================================
# T0.9 ADVISORY — cpa-usage-keeper sidecar startup (Wave 81 Ship 1C 2026-05-08; Wave 119 Ship CL-NEW-FIX-1 v1.5.3 upgrade 2026-05-09)
# Reference: TIER-1 https://github.com/Willxup/cpa-usage-keeper/releases/tag/v1.5.3 (MIT, Willxup; published 2026-05-08T10:48:31Z; SHA-256 69b1ea3e902b9ec4482ab9c8b6892539100f887052e82e5c5e5c7d680a8f3695 verified vs official checksums.txt)
# Reference: TIER-1 https://github.com/router-for-me/CLIProxyAPI README HEAD ecosystem section
# Reference: launch-discipline.md 3-invariants (reversible/observable/incremental) + 6-axis pre-launch + D1+D2 deploy-phase namespace
# Reference: codex T1 NEEDS-REVISION conf=0.86 verdict at .claude/state/codex_consult_ship1c_cpa_usage_keeper_wire_OUT.txt; 7 findings closed in single Pattern A apply (Wave 81 Ship 1C)
# Reference: codex T1 NEEDS-REVISION conf=0.92 verdict at .claude/state/codex_consult_w119_cliproxy_eee_full_audit_OUT.txt; 4 findings closed in Pattern A split (Wave 119 Ship CL-NEW-FIX-1)
# Drains usage events from CLIProxyAPI port 8317 RESP queue → SQLite → Web Dashboard at APP_PORT=8079
# WORK_DIR migrated to Z:/claude-sota-installed-state/cpa-usage-keeper/data per CLAUDE.local.md ENV (f) state-outside-repo precedent — preserves telemetry continuity across all future binary upgrades
# Phase 1 bootstrap: WARN-only (matches T0.7/T0.8 advisory tier — no HARD-FAIL)
# ============================================================================
$cukDir = 'Z:/claude-sota-installed/.local/cpa-usage-keeper/cpa-usage-keeper_v1.5.3_windows_amd64'
$cukBin = "$cukDir/cpa-usage-keeper.exe"
$cukEnv = "$cukDir/.env"
$cukAppPort = 8079
$cukPidFile = "$env:CLAUDE_CODE_TMPDIR/cpa-usage-keeper.pid"

if ((Test-Path $cukBin) -and (Test-Path $cukEnv)) {
    # F-4 fix: stale PID cleanup
    if (Test-Path $cukPidFile) {
        $stalePid = (Get-Content $cukPidFile -ErrorAction SilentlyContinue | Select-Object -First 1).Trim()
        if ($stalePid -and -not (Get-Process -Id $stalePid -ErrorAction SilentlyContinue)) {
            Remove-Item $cukPidFile -Force -ErrorAction SilentlyContinue
        }
    }

    # F-1 + F-2 fix: port-listener-first check (any address); separate loopback-vs-non-loopback verdict
    $existingListeners = Get-NetTCPConnection -LocalPort $cukAppPort -State Listen -ErrorAction SilentlyContinue
    $loopbackListener = $existingListeners | Where-Object { $_.LocalAddress -in @('127.0.0.1','::1','0.0.0.0','::') } | Select-Object -First 1
    $cukAlreadyRunning = $null -ne $loopbackListener

    if (-not $cukAlreadyRunning) {
        try {
            # F-3 fix: explicit @() array + -WorkingDirectory for deterministic data/log paths
            $cukArgs = @('-env', $cukEnv)
            $proc = Start-Process -FilePath $cukBin -ArgumentList $cukArgs -WorkingDirectory $cukDir -PassThru -WindowStyle Hidden -ErrorAction Stop
            $proc.Id | Out-File -FilePath $cukPidFile -Encoding ASCII -Force

            # F-6 fix: bounded readiness loop (100ms × up to 20 = 2000ms cap) instead of fixed sleep
            $cukReady = $false
            $cukElapsedMs = 0
            for ($i = 0; $i -lt 20; $i++) {
                Start-Sleep -Milliseconds 100
                $cukElapsedMs += 100
                $listener = Get-NetTCPConnection -LocalPort $cukAppPort -State Listen -ErrorAction SilentlyContinue | Select-Object -First 1
                if ($listener) { $cukReady = $true; break }
            }

            if ($cukReady) {
                # F-2 fix: enforce loopback-only bind verdict
                $bindAddr = $listener.LocalAddress
                if ($bindAddr -in @('127.0.0.1','::1')) {
                    Write-Host "[eee] cpa-usage-keeper sidecar started (PID $($proc.Id), Web Dashboard http://127.0.0.1:$cukAppPort, bound ${bindAddr}, ${cukElapsedMs}ms)" -ForegroundColor Green
                } else {
                    $EEE_ADVISORY_WARNS += "cpa-usage-keeper PID $($proc.Id) bound to NON-LOOPBACK address ${bindAddr}:${cukAppPort} — per-account usage stats may be exposed on non-loopback interfaces. Verify .env or upstream binary default; expected loopback-only."
                }
            } else {
                $EEE_ADVISORY_WARNS += "cpa-usage-keeper sidecar started (PID $($proc.Id)) but did not bind port $cukAppPort within ${cukElapsedMs}ms — may take additional time OR config rejected"
            }
        } catch {
            $EEE_ADVISORY_WARNS += "cpa-usage-keeper sidecar startup failed: $_"
        }
    } else {
        Write-Host "[eee] cpa-usage-keeper Web Dashboard already listening on http://127.0.0.1:$cukAppPort (LocalAddress=$($loopbackListener.LocalAddress))" -ForegroundColor DarkGray
    }
} else {
    if (-not (Test-Path $cukBin)) { $EEE_ADVISORY_WARNS += "cpa-usage-keeper binary missing at $cukBin (run: gh release download v1.5.3 --repo Willxup/cpa-usage-keeper --pattern '*windows_amd64.zip*' --dir .local/cpa-usage-keeper/ && unzip cpa-usage-keeper_v1.5.3_windows_amd64.zip -d .local/cpa-usage-keeper/)" }
    if (-not (Test-Path $cukEnv)) { $EEE_ADVISORY_WARNS += "cpa-usage-keeper .env missing at $cukEnv (must contain CPA_BASE_URL + CPA_MANAGEMENT_KEY + APP_PORT=8079; gitignored per .gitignore L29 + L60 double-cover)" }
}

# Render verdict
if ($EEE_HARD_FAILURES.Count -gt 0) {
    Write-Host ""
    Write-Host "[eee] HARD-GATE FAIL-CLOSED -- SOTA-native-install integrity check failed:" -ForegroundColor Red
    foreach ($f in $EEE_HARD_FAILURES) {
        Write-Host "  [HARD] $f" -ForegroundColor Red
    }
    Write-Host ""
    Write-Host "[eee] Bootstrap-only override: set EEE_BOOTSTRAP=1 (NOT for normal use; cardinal-rule-7 graduated-unleash phase 1 exception):" -ForegroundColor Yellow
    Write-Host "    `$env:EEE_BOOTSTRAP='1'; eee" -ForegroundColor Yellow
    Write-Host ""
    if ($env:EEE_BOOTSTRAP -ne '1') {
        exit 1
    }
    Write-Host "[eee] EEE_BOOTSTRAP=1 set -- proceeding despite hard-gate failures (BOOTSTRAP MODE)" -ForegroundColor Yellow
    Write-Host ""
}

if ($EEE_ADVISORY_WARNS.Count -gt 0) {
    Write-Host "[eee] ADVISORY warns (operational; will not block launch):" -ForegroundColor Yellow
    foreach ($w in $EEE_ADVISORY_WARNS) {
        Write-Host "  [WARN] $w" -ForegroundColor Yellow
    }
    Write-Host ""
}

if ($EEE_HARD_FAILURES.Count -eq 0 -and $EEE_ADVISORY_WARNS.Count -eq 0) {
    Write-Host "[eee] HARD-GATE PASS -- SOTA-native-install integrity verified" -ForegroundColor Green
}

# ============================================================================
# (j) Forward to claude.exe with all args
# Per https://code.claude.com/docs/en/cli-reference (cli args passthrough)
# ============================================================================

# === Wave 50 Fire 46 — Fire46-codex-plugin-hooks-rewrite (Z:\claude-sota-installed\scripts\codex-plugin-hooks-rewrite.py) ===
# Pre-claude.exe rewriter run + --check assertion per bog92qxq7 codex T1 BRIDGE-MODE
# real GPT-5.5 NEEDS-REVISION conf=0.91 verdict at
# .claude/state/codex_consult_fire45_path_mangling_full_rescue_OUT.txt EOF.
# Fail-closed: if rewriter or --check exits nonzero, abort launcher with exit 2
# rather than starting Claude in a known-bad state.
$rewriterScript = "Z:\claude-sota-installed\scripts\codex-plugin-hooks-rewrite.py"
$rewriterPython = "Z:\venvs\claude\Scripts\python.exe"
$codexPluginCache = "Z:\claude-sota-installed\.claude\plugins\cache\openai-codex"
# Wave 80 fail-closed per real-GPT-5.5 codex T1 verdict NEEDS-REVISION conf=0.91 prescribed_edit #6:
# If codex plugin cache exists but rewriter script is missing, FAIL CLOSED — silent skip would leave
# the cross-drive POSIX-path-mangling bug (codex-plugin-cc #285) unmitigated.
if ((Test-Path $codexPluginCache) -and -not (Test-Path $rewriterScript)) {
    Write-Error @"
[eee] HARD-FAIL: codex plugin cache exists at $codexPluginCache but Fire 46 rewriter missing at $rewriterScript.
  Wave 50 path-mangling mitigation would silently skip. Recovery options (Wave 81 per real-GPT-5.5 codex T1 verdict APPROVE+CONCERN Q4):
    (a) Restore $rewriterScript from git or backup (RECOMMENDED).
    (b) Disable the codex plugin: remove `codex@openai-codex` from settings.json:enabledPlugins
        AND remove `openai-codex` from settings.json:extraKnownMarketplaces
        AND delete or move $codexPluginCache (cache presence alone triggers this hard-fail; settings-only removal is INSUFFICIENT).
    (c) Edit `tools/eee.ps1` T0.2 + T0.3 hard-gates (lines 200-226) to drop codex from `expectedPlugins` + `expectedCaches`.
"@
    exit 2
}
if ((Test-Path $rewriterScript) -and (Test-Path $rewriterPython)) {
    & $rewriterPython $rewriterScript --quiet
    if ($LASTEXITCODE -ne 0) {
        Write-Error "Fire 46 rewriter exited $LASTEXITCODE; aborting launcher (fail-closed) per bog92qxq7 verdict."
        exit 2
    }
    & $rewriterPython $rewriterScript --check
    if ($LASTEXITCODE -ne 0) {
        Write-Error "Fire 46 --check exited $LASTEXITCODE; hook drift detected. Aborting launcher (fail-closed)."
        exit 2
    }
}
# === End Fire 46 wire ===

# === Wave 52 — ECC loader:1386 hook rewrite (Z:\claude-sota-installed\scripts\ecc-plugin-hooks-rewrite.py) ===
# Pre-claude.exe rewriter run + --check assertion per 019e02f2-3e89-7d60-ad2a-153215e6535b
# codex GPT-5.5 deep-review-exec NEEDS-REVISION conf=0.94. This is the
# everything-claude-code companion to Fire 46's openai-codex rewriter.
# Fail-closed if active ECC hooks can still reconstruct node loader:1386 via
# inline require(s), POSIX /z/ paths, or stale bootstrap fallback behavior.
$eccRewriterScript = "Z:\claude-sota-installed\scripts\ecc-plugin-hooks-rewrite.py"
$eccPluginCache = "Z:\claude-sota-installed\.claude\plugins\cache\everything-claude-code"
# Wave 80 fail-closed per real-GPT-5.5 codex T1 verdict prescribed_edit #6 (mirror of Fire 46 fix above):
# If ECC plugin cache exists but rewriter script is missing, FAIL CLOSED — silent skip would leave
# the loader:1386 POSIX-path-mangling unmitigated.
if ((Test-Path $eccPluginCache) -and -not (Test-Path $eccRewriterScript)) {
    Write-Error @"
[eee] HARD-FAIL: ECC plugin cache exists at $eccPluginCache but Wave 52 rewriter missing at $eccRewriterScript.
  Recovery options (Wave 81 per codex T1 APPROVE+CONCERN Q4 mirror of Fire 46 above):
    (a) Restore $eccRewriterScript from git or backup (RECOMMENDED).
    (b) Disable ECC plugin: remove `everything-claude-code@everything-claude-code` from settings.json:enabledPlugins
        AND remove `everything-claude-code` from settings.json:extraKnownMarketplaces
        AND delete or move $eccPluginCache (cache presence alone triggers this hard-fail).
    (c) Edit `tools/eee.ps1` T0.2 + T0.3 (lines 200-226) to drop ECC from `expectedPlugins` + `expectedCaches`.
"@
    exit 2
}
if ((Test-Path $eccRewriterScript) -and (Test-Path $rewriterPython)) {
    & $rewriterPython $eccRewriterScript --quiet
    if ($LASTEXITCODE -ne 0) {
        Write-Error "Wave 52 ECC rewriter exited $LASTEXITCODE; aborting launcher (fail-closed) per runtime loader:1386 rescue verdict."
        exit 2
    }
    & $rewriterPython $eccRewriterScript --check
    if ($LASTEXITCODE -ne 0) {
        Write-Error "Wave 52 ECC --check exited $LASTEXITCODE; ECC hook drift detected. Aborting launcher (fail-closed)."
        exit 2
    }
}
# === End Wave 52 ECC wire ===

# === W274 — hindsight-plugin-hooks-rewrite (Z:\claude-sota-installed\scripts\hindsight-plugin-hooks-rewrite.py) ===
# Pre-claude.exe rewriter run + --check assertion. Mirrors Fire 46 + Wave 52
# pattern: re-applies absolute Win32 path patches across hindsight's cached and
# marketplace hooks.json on every launcher pre-claude.exe invocation, ensuring
# durability across plugin re-fetches and version bumps.
# Root cause: CC injects `${CLAUDE_PLUGIN_ROOT}` in POSIX form `/z/claude-sota-installed/...`
# on Windows; with MSYS2_ARG_CONV_EXCL='*' active (see settings.json:48), Python's
# open() on Windows resolves the leading `/` as drive-root → ENOENT.
# Authority: https://www.msys2.org/docs/filesystem-paths/ (MSYS path-conv);
#            https://code.claude.com/docs/en/plugins (CLAUDE_PLUGIN_ROOT injection)
# Substrate: vectorize-io/hindsight setup_hooks.py:33-80 build_hooks() pattern.
$hindsightRewriterScript = "Z:\claude-sota-installed\scripts\hindsight-plugin-hooks-rewrite.py"
$hindsightPluginCache = "Z:\claude-sota-installed\.claude\plugins\cache\hindsight"
if ((Test-Path $hindsightPluginCache) -and -not (Test-Path $hindsightRewriterScript)) {
    Write-Error @"
[eee] HARD-FAIL: hindsight plugin cache exists at $hindsightPluginCache but W274 rewriter missing at $hindsightRewriterScript.
  Mirror of Fire 46 + Wave 52 pattern. Recovery options:
    (a) Restore `$hindsightRewriterScript from git or backup (RECOMMENDED).
    (b) Disable hindsight plugin: remove ``hindsight-memory@hindsight`` from settings.json:enabledPlugins
        AND remove ``hindsight`` from settings.json:extraKnownMarketplaces
        AND delete or move `$hindsightPluginCache (cache presence alone triggers this hard-fail).
"@
    exit 2
}
if ((Test-Path $hindsightRewriterScript) -and (Test-Path $rewriterPython)) {
    & $rewriterPython $hindsightRewriterScript --quiet
    if ($LASTEXITCODE -ne 0) {
        Write-Error "W274 hindsight rewriter exited $LASTEXITCODE; aborting launcher (fail-closed)."
        exit 2
    }
    & $rewriterPython $hindsightRewriterScript --check
    if ($LASTEXITCODE -ne 0) {
        Write-Error "W274 hindsight --check exited $LASTEXITCODE; hook drift detected. Aborting launcher (fail-closed)."
        exit 2
    }
}
# === End W274 hindsight wire ===

# === W275 — consolidated plugin-hooks rewriter (Z:\claude-sota-installed\scripts\w275-hooks-rewrite.py) ===
# Pre-claude.exe rewriter run + --check assertion. Consolidated extension of
# Fire 46 + Wave 52 + W274 pattern for plugins NOT yet covered by their own
# per-plugin rewriters. Currently covers: mcp-memory-service + gitnexus.
# Extensible via FIXTURES dict in the script (codex GPT-5.5 NEEDS-REVISION
# conf 0.88 recommendation: prefer consolidated over per-plugin to reduce
# drift + maintenance burden).
# Root cause: identical to W274 — CC injects `${CLAUDE_PLUGIN_ROOT}` in POSIX
# form `/z/claude-sota-installed/...` on Windows; Node treats `/z/...` as
# drive-rooted → `Z:\z\...` double-drive-prefix → MODULE_NOT_FOUND →
# `node:internal/modules/cjs/loader:1386`.
# Symptoms fixed:
#   - mcp-memory-service: 2x SessionStart + 1x UserPromptSubmit + 1x SessionEnd +
#     N x PostToolUse loader:1386 errors
#   - gitnexus: per-tool surge (~2x per Bash + 1x per Grep/Glob) loader:1386
# Authority: https://code.claude.com/docs/en/hooks (placeholder substitution);
#            https://code.claude.com/docs/en/plugins (CLAUDE_PLUGIN_ROOT);
#            https://nodejs.org/api/path.html + modules.html (CJS resolution).
$w275RewriterScript = "Z:\claude-sota-installed\scripts\w275-hooks-rewrite.py"
$w275MmsCache       = "Z:\claude-sota-installed\.claude\plugins\cache\mcp-memory-service"
$w275GitnexusCache  = "Z:\claude-sota-installed\.claude\plugins\cache\gitnexus-marketplace"
if (((Test-Path $w275MmsCache) -or (Test-Path $w275GitnexusCache)) -and -not (Test-Path $w275RewriterScript)) {
    Write-Error @"
[eee] HARD-FAIL: W275-covered plugin cache exists (mcp-memory-service or gitnexus)
  but W275 rewriter missing at $w275RewriterScript.
  Mirror of Fire 46 + Wave 52 + W274 pattern. Recovery options:
    (a) Restore `$w275RewriterScript from git or backup (RECOMMENDED).
    (b) Disable the affected plugin(s) in settings.json:enabledPlugins AND remove
        their cache dirs (cache presence alone triggers this hard-fail).
"@
    exit 2
}
if ((Test-Path $w275RewriterScript) -and (Test-Path $rewriterPython)) {
    & $rewriterPython $w275RewriterScript --quiet
    if ($LASTEXITCODE -ne 0) {
        Write-Error "W275 consolidated rewriter exited $LASTEXITCODE; aborting launcher (fail-closed)."
        exit 2
    }
    & $rewriterPython $w275RewriterScript --check
    if ($LASTEXITCODE -ne 0) {
        Write-Error "W275 consolidated --check exited $LASTEXITCODE; hook drift detected. Aborting launcher (fail-closed)."
        exit 2
    }
}
# === End W275 consolidated wire ===

# ============================================================================
# (k) Workspace cwd-pin before claude.exe forward
# Per Wave 73 user-trigger 2026-05-07 ("launch into wrong folder and not all
# offical sota"): claude.exe inherits parent process cwd, NOT $env:USERPROFILE.
# When user types `eee` from a pwsh session whose cwd is the OS-level user home
# (e.g., C:\Users\42), claude.exe's "Accessing workspace" prompt shows that
# inherited cwd instead of the eee redirect target. Pin cwd to eee root before
# forwarding, matching sss.ps1:763 Set-Location -LiteralPath $WORKSPACE pattern.
# Reference: TIER-2 sibling pattern Z:/claude-sota/tools/sss.ps1:763 [VERIFIED 2026-05-07]
# ============================================================================
# W335 enhancement: worktree-aware launch.
# Resolution order: (1) $env:EEE_WORKSPACE_OVERRIDE if set + exists; (2) caller's cwd
# if it's a claude-sota-installed* worktree; (3) main-worktree default.
# Per CLAUDE.md L14 "one git worktree per session" + git-scm.com/docs/git-worktree
# (worktrees share .git config + plugins cache via HOME; cwd determines git ops scope).
$EEE_WORKSPACE = if ($env:EEE_WORKSPACE_OVERRIDE -and (Test-Path -LiteralPath $env:EEE_WORKSPACE_OVERRIDE)) {
    $env:EEE_WORKSPACE_OVERRIDE
} elseif ((Get-Location).Path -match '\\claude-sota-installed(-[A-Z]?[0-9]+[A-Za-z0-9-]*)?$' -and (Test-Path -LiteralPath (Get-Location).Path)) {
    (Get-Location).Path
} else {
    'Z:\claude-sota-installed'
}
if (Test-Path -LiteralPath $EEE_WORKSPACE) {
    Set-Location -LiteralPath $EEE_WORKSPACE -ErrorAction Stop
    Write-Host "[eee] Workspace pinned: $EEE_WORKSPACE" -ForegroundColor Green
} else {
    Write-Host "[eee] WARN: workspace $EEE_WORKSPACE missing; cwd not pinned (claude.exe will inherit caller cwd)" -ForegroundColor Yellow
}

# ============================================================================
# (l) W259-v8 U2 (D7+D26 unleash) — opt-in --permission-mode launcher flag
# Per https://code.claude.com/docs/en/cli-reference (--permission-mode arg) +
# W259 audit CC-DIMENSIONS-UNLEASHED-W259v7.md §4 U2 / D26: a `defaultMode:"auto"`
# value in *shared* .claude/settings.json is IGNORED by CC — the working mechanism
# for auto permission mode is the `--permission-mode auto` launcher flag (or a
# user/project-LOCAL settings scope). settings.json keeps `defaultMode:"bypassPermissions"`
# (operator's deliberate trusted-Z:-single-dev posture — UNCHANGED here; flipping it
# is a safety-posture decision left to the operator). This block adds the *mechanism*:
# set $env:EEE_PERMISSION_MODE before launching to inject the flag, e.g.
#   $env:EEE_PERMISSION_MODE='auto'; eee     → near-zero prompts on routine ops,
#                                              destructive ops still gated
#   $env:EEE_PERMISSION_MODE='plan'; eee     → plan mode
# Unset (default) → no flag injected → settings.json bypassPermissions applies as before.
# Reversibility: HIGH — delete this block to revert to plain `& $claudeBin @Args`.
$EEE_FORWARD_ARGS = @($Args)
# W271 2026-05-17 — DEFAULT to bypassPermissions injection (operator preference per line 782
# comment + explicit "full automation beyond auto mode" directive). Suppresses CC's auto-mode
# startup pitch ("Enable auto mode?") because passing --permission-mode explicitly tells CC
# the operator has already chosen. EEE_PERMISSION_MODE env override still works for ad-hoc plan/auto.
# Per `claude --permission-mode --help`: valid choices are case-sensitive: acceptEdits, auto,
# bypassPermissions, default, dontAsk, plan. Case-insensitive resolution via lookup table.
$_pmRaw = if ($env:EEE_PERMISSION_MODE) { $env:EEE_PERMISSION_MODE.Trim() } else { 'bypassPermissions' }
$_pmMap = @{
    'default'='default'; 'acceptedits'='acceptEdits'; 'plan'='plan'; 'auto'='auto';
    'bypasspermissions'='bypassPermissions'; 'dontask'='dontAsk'
}
$_pm = $_pmMap[$_pmRaw.ToLower()]
if ($_pm) {
    # only inject if caller did not already pass --permission-mode explicitly
    if (-not ($EEE_FORWARD_ARGS -contains '--permission-mode')) {
        $EEE_FORWARD_ARGS = @('--permission-mode', $_pm) + $EEE_FORWARD_ARGS
        $_src = if ($env:EEE_PERMISSION_MODE) { 'EEE_PERMISSION_MODE env' } else { 'W271 default' }
        Write-Host "[eee] injected --permission-mode $_pm (from $_src)" -ForegroundColor Cyan
    }
} else {
    Write-Host "[eee] WARN: `$env:EEE_PERMISSION_MODE='$_pmRaw' is not a valid CC permission mode (allowed: default, acceptEdits, plan, auto, bypassPermissions, dontAsk); ignored." -ForegroundColor Yellow
}

# ============================================================================
# (m) W393 launch contract — eee-precheck invocation before claude.exe launch
# Per docs/superpowers/specs/2026-05-25-W393-eee-contract-design.md §5 +
#     docs/superpowers/plans/2026-05-25-W393-phase-0a-implementation-plan.md Task 1.
# Mode tiering: default `eee` = launch-fast (<=5s, no network); `--deep` = network+all tiers;
# `--repair` = lifecycle mutations (auto-heal beyond safe-local-idempotent).
# Soft-skip when tools/eee-precheck.mjs absent (back-compat for sessions started before
# the precheck lands).
# ============================================================================
$precheckMode = if ($EEE_FORWARD_ARGS -contains '--deep') { 'deep' } elseif ($EEE_FORWARD_ARGS -contains '--repair') { 'repair' } else { 'launch-fast' }
$EEE_FORWARD_ARGS = @($EEE_FORWARD_ARGS | Where-Object { $_ -notin '--deep','--repair' })
$precheckPath = Join-Path $PSScriptRoot 'eee-precheck.mjs'
if (Test-Path $precheckPath) {
    # Codex r1 P1 finding #1: do NOT silently swallow precheck failures. Inspect
    # $LASTEXITCODE + JSON-parse outcome; exit 3 on internal failure (precheck exit 3
    # OR unparseable stdout); exit 2 on real BLOCKED. Soft-skip stays reserved for the
    # absent-precheck back-compat path (Test-Path above).
    $precheckJson = & node $precheckPath --mode $precheckMode --json
    $precheckExit = $LASTEXITCODE
    try { $precheck = $precheckJson | ConvertFrom-Json -ErrorAction Stop } catch { $precheck = $null }
    if ($null -eq $precheck) {
        Write-Host "[eee] precheck INTERNAL FAILURE (exit=$precheckExit, unparseable JSON)" -ForegroundColor Red
        Write-Host $precheckJson
        exit 3
    }
    # Codex r2 P1 (round-2 finding #1): check exit==3 BEFORE BLOCKED, so internal failures
    # (e.g. config-missing emits parseable JSON with status=BLOCKED but process exit=3) map
    # to launcher exit 3 (not exit 2). BLOCKED + exit 2 is the real-precheck-violation path.
    # Exit 0/2/3 are the only valid precheck exit codes; anything else is defense-in-depth.
    if ($precheckExit -eq 3) {
        Write-Host "[eee] precheck INTERNAL FAILURE (exit=3, status=$($precheck.status))" -ForegroundColor Red
        if ($precheck.remediation) { Write-Host $precheck.remediation }
        exit 3
    }
    if ($precheck.status -eq 'BLOCKED') {
        Write-Host "[eee] precheck BLOCKED ($($precheck.mode), $($precheck.elapsedMs)ms)" -ForegroundColor Red
        Write-Host $precheck.remediation
        exit 2
    }
    if ($precheckExit -ne 0) {
        Write-Host "[eee] precheck unexpected non-zero exit=$precheckExit but status=$($precheck.status); aborting (defense-in-depth)" -ForegroundColor Red
        exit 3
    }
    if ($precheck.status -eq 'HEALED') {
        Write-Host "[eee] precheck HEALED ($($precheck.elapsedMs)ms)" -ForegroundColor Yellow
    }
}
# end W393 launch contract

& $claudeBin @EEE_FORWARD_ARGS
exit $LASTEXITCODE
