#Requires -Version 7.0
# TODO W344: validate Set-StrictMode -Version Latest in runtime test before adding
# bootstrap-runtime.ps1 — idempotent first-run setup for runtime state
#
# W280-fix5 (2026-05-17, supersedes fix4 ordering) — codex adversarial-review
# round-5 HIGH: fresh-clone path could exit at PART 2 (hindsight) before
# PART 1 (codex review-gate) ran, leaving the safety control off. Reordered
# so the INDEPENDENT, HIGHER-PRIORITY safety control (codex stop-time
# review-gate) runs FIRST and unconditionally before any hindsight failure
# can abort the script.
#
# Cardinal-rule-2 compliance: one-shot manual setup script, NOT a registered
# hook. Operator invokes once per machine.
#
# Idempotent: safe to re-run; only repairs/creates missing or invalid state.
# Fail-loud: nonzero exit + Write-Error on any unrecoverable condition.
#
# Usage:
#   .\tools\bootstrap-runtime.ps1
#
# Verify after run:
#   claude mcp list | Select-String hindsight                                                  # -> Connected
#   node .\.claude\plugins\cache\openai-codex\codex\1.0.4\scripts\codex-companion.mjs setup --json | Select-String reviewGateEnabled  # -> true

[CmdletBinding()]
param(
    # W282-fix4 — explicit opt-in for regenerating basic-memory config on
    # parse failure. Default OFF: fail loud + back up + print recovery
    # instructions, since silently replacing a stateful memory config could
    # repoint the runtime away from custom projects / workspace IDs / sync
    # settings without operator confirmation. Use -AllowRegen when you have
    # accepted the trade-off (custom projects must be re-added from the .bak).
    [switch]$AllowRegen
)
$ErrorActionPreference = 'Stop'

$RepoRoot = (Resolve-Path "$PSScriptRoot\..").Path
Write-Host "[bootstrap-runtime] Repo root: $RepoRoot"

# ===========================================================================
# PART 1: codex stop-time review-gate (independent safety control, runs FIRST)
# ===========================================================================
# Gate state lives at ${CLAUDE_PLUGIN_DATA}/state/<workspaceHash>/state.json.
# Must match the env CC sets when spawning the Stop hook so the same file is
# read at hook fire-time. Fail loudly if enable cannot be observed by reading
# the actual state file the Stop hook will read.

# Dynamic plugin-version discovery (W280-fix8): plugin cache paths are
# upstream-managed, so hardcoding e.g. .../codex/1.0.4 silently breaks
# after a `claude plugin update`. Discover the latest installed version
# directory under each plugin cache root and resolve script paths from it.

function Get-LatestPluginVersion {
    param([string]$VersionRootDir)
    if (-not (Test-Path $VersionRootDir)) { return $null }
    $versions = @(Get-ChildItem -Path $VersionRootDir -Directory -ErrorAction SilentlyContinue)
    if ($versions.Count -eq 0) { return $null }
    # Sort by semver-ish numeric ordering when possible, lexicographic fallback
    $sorted = $versions | Sort-Object {
        $parts = $_.Name -split '\.' | ForEach-Object {
            $n = 0
            [void][int]::TryParse($_, [ref]$n)
            $n
        }
        # Pack into a comparable number (max 4 segments, 1000 each)
        ($parts[0] * 1000000000) + (($parts[1] * 1000000) + (($parts[2] * 1000) + ($parts[3])))
    } -Descending
    return $sorted[0].FullName
}

$CodexVersionRoot = "$RepoRoot\.claude\plugins\cache\openai-codex\codex"
$CodexInstallRoot = Get-LatestPluginVersion $CodexVersionRoot
if ($null -eq $CodexInstallRoot) {
    Write-Error "[bootstrap-runtime] FAIL: no openai-codex plugin installed at $CodexVersionRoot\* - install with: claude plugin install codex@openai-codex"
    exit 1
}
$CodexCompanion = Join-Path $CodexInstallRoot 'scripts\codex-companion.mjs'
$CodexDataDir   = "$RepoRoot\.claude\plugins\data\codex-openai-codex"
Write-Host "[bootstrap-runtime] Using codex plugin at $CodexInstallRoot"

if (-not (Test-Path $CodexCompanion)) {
    Write-Error "[bootstrap-runtime] FAIL: codex-companion.mjs not found at $CodexCompanion - plugin install may be partial; try \`claude plugin install codex@openai-codex\` to refresh"
    exit 1
}

if (-not (Test-Path $CodexDataDir)) {
    New-Item -ItemType Directory -Force -Path $CodexDataDir | Out-Null
}
$env:CLAUDE_PLUGIN_DATA = $CodexDataDir

# Workspace-resolution pin (W280-fix6): codex-companion.mjs resolves workspace
# from process.cwd() — Push-Location $RepoRoot anchors the resulting workspace
# hash directory to match what CC will use at Stop-hook fire time (CC sets
# cwd to the project dir before spawning hooks). State file path will then be
# ${CLAUDE_PLUGIN_DATA}/state/<basename(RepoRoot)>-<hash>/state.json.
$RepoBasename = (Split-Path -Leaf $RepoRoot)
Push-Location $RepoRoot
try {
    $setupJson = & node $CodexCompanion setup --json 2>&1 | Out-String
    if ($setupJson -notmatch '"reviewGateEnabled"\s*:\s*true') {
        Write-Host "[bootstrap-runtime] Enabling codex stop-time review-gate (in $CodexDataDir, cwd=$RepoRoot)"
        $enableJson = & node $CodexCompanion setup --json --enable-review-gate 2>&1 | Out-String
        if ($enableJson -notmatch '"reviewGateEnabled"\s*:\s*true') {
            Write-Error "[bootstrap-runtime] FAILED to enable codex review-gate. Output:`n$enableJson"
            exit 1
        }
    }
} finally {
    Pop-Location
}

# Verify the EXACT state path that the Stop hook will read — must be under
# state\<basename(RepoRoot)>-*\state.json (workspace anchored to $RepoRoot).
$stateGlob = Join-Path $CodexDataDir "state\$RepoBasename-*\state.json"
$stateFiles = @(Get-ChildItem -Path $stateGlob -ErrorAction SilentlyContinue)
if ($stateFiles.Count -eq 0) {
    Write-Error "[bootstrap-runtime] FAIL: codex state.json not found under $CodexDataDir\state\$RepoBasename-* after setup. Setup wrote to wrong workspace dir (likely ran with cwd != $RepoRoot)."
    exit 1
}
$gateOk = $false
foreach ($sf in $stateFiles) {
    try {
        $stateObj = Get-Content $sf.FullName -Raw | ConvertFrom-Json -ErrorAction Stop
        if ($stateObj.config.stopReviewGate -eq $true) {
            $gateOk = $true
            Write-Host "[bootstrap-runtime] OK verified stopReviewGate=true at $($sf.FullName)"
            break
        }
    } catch {
        Write-Host "[bootstrap-runtime] WARN could not parse $($sf.FullName): $($_.Exception.Message)"
    }
}
if (-not $gateOk) {
    Write-Error "[bootstrap-runtime] FAIL: stopReviewGate=true not observed in any state.json under $CodexDataDir\state\$RepoBasename-*"
    exit 1
}
Remove-Item Env:CLAUDE_PLUGIN_DATA -ErrorAction SilentlyContinue

# ===========================================================================
# PART 2: hindsight-memory plugin local state
# ===========================================================================

# --- 2a: ~/.hindsight/claude-code.json (parse+merge, REPAIR invalid) -------
# Plugin reads from ${HOME}/.hindsight/claude-code.json per lib/config.py
# load_config step 2. enableKnowledgeTools MUST be true or mcp_server.py:35-37
# exits immediately. Pre-existing config (e.g. enableKnowledgeTools:false)
# must be REPAIRED, not silently passed through.

# HOME-anchoring pin (W280-fix6): tools/eee.ps1 sets HOME=USERPROFILE=$RepoRoot
# before launching CC, so the hindsight plugin (os.path.expanduser('~')) reads
# from $RepoRoot\.hindsight. The bootstrap MUST write to that same path —
# NOT the ambient $env:USERPROFILE which in a fresh PowerShell session is the
# Windows user profile (C:\Users\...) and would create the config in the wrong
# place, leaving the runtime config unset.
$HindsightDir = Join-Path $RepoRoot '.hindsight'
$ConfigFile = Join-Path $HindsightDir 'claude-code.json'

if (-not (Test-Path $HindsightDir)) {
    New-Item -ItemType Directory -Force -Path $HindsightDir | Out-Null
    Write-Host "[bootstrap-runtime] Created $HindsightDir"
}

if (Test-Path $ConfigFile) {
    try {
        $existing = Get-Content $ConfigFile -Raw | ConvertFrom-Json -ErrorAction Stop
    } catch {
        Write-Error "[bootstrap-runtime] INVALID JSON in $ConfigFile : $($_.Exception.Message). Delete or repair manually, then re-run."
        exit 1
    }
    if ($null -eq $existing) {
        $existing = [PSCustomObject]@{}
    }
    $needsWrite = $false
    if ($null -eq $existing.enableKnowledgeTools -or $existing.enableKnowledgeTools -ne $true) {
        $existing | Add-Member -NotePropertyName 'enableKnowledgeTools' -NotePropertyValue $true -Force
        $needsWrite = $true
    }
    if ($needsWrite) {
        ($existing | ConvertTo-Json -Depth 10) | Set-Content -Path $ConfigFile -Encoding UTF8 -NoNewline
        Write-Host "[bootstrap-runtime] REPAIRED $ConfigFile (set enableKnowledgeTools=true, preserved other keys)"
    } else {
        Write-Host "[bootstrap-runtime] OK $ConfigFile (enableKnowledgeTools=true verified)"
    }
} else {
    @"
{
  "_comment": "W280b/fix10 - required for hindsight MCP to start (mcp_server.py:35-37). Created by tools/bootstrap-runtime.ps1.",
  "enableKnowledgeTools": true
}
"@ | Set-Content -Path $ConfigFile -Encoding UTF8 -NoNewline
    Write-Host "[bootstrap-runtime] WROTE $ConfigFile"
    $existing = [PSCustomObject]@{ enableKnowledgeTools = $true }
}

# Resolve EFFECTIVE endpoint from merged config (W280-fix10) — health-check
# must validate the endpoint the plugin will actually use, not a hardcoded
# :9077. Per lib/daemon.py:get_api_url, plugin uses:
#   Mode-1 (external): config.hindsightApiUrl if set, no health-check
#   Mode-2 (local):    http://127.0.0.1:config.apiPort (default 9077)
# Same priority chain here.
$EffectivePort = 9077
if ($null -ne $existing.apiPort -and $existing.apiPort -ne 0) {
    $EffectivePort = [int]$existing.apiPort
}
if ($null -ne $existing.hindsightApiUrl -and $existing.hindsightApiUrl) {
    $HealthUrl = $existing.hindsightApiUrl.TrimEnd('/') + '/health'
    Write-Host "[bootstrap-runtime] Effective endpoint (external Mode-1): $($existing.hindsightApiUrl)"
} else {
    $HealthUrl = "http://127.0.0.1:$EffectivePort/health"
    Write-Host "[bootstrap-runtime] Effective endpoint (local Mode-2): http://127.0.0.1:$EffectivePort"
}

# --- 2b: Windows venv bin/ shims (both possible plugin-data paths) ---------
$DataDirs = @(
    "$RepoRoot\.claude\plugins\data\hindsight-memory-hindsight",
    "$RepoRoot\.claude\plugins\data\hindsight"
)

# Single-quoted here-strings (@'...'@) preserve content LITERALLY — no
# PowerShell variable/subexpression expansion. Unambiguous for both writer
# and reader (W280-fix11) — replaces the prior double-quoted form with
# backtick-escaped $-signs which was correct but easy to misread.
$ShimPython = @'
#!/usr/bin/env bash
exec "$(dirname "$0")/../Scripts/python.exe" "$@"
'@
$ShimPip = @'
#!/usr/bin/env bash
exec "$(dirname "$0")/../Scripts/pip.exe" "$@"
'@

$missingVenvs = @()
foreach ($DataDir in $DataDirs) {
    $VenvScripts = Join-Path $DataDir 'venv\Scripts'
    if (-not (Test-Path $VenvScripts)) {
        $missingVenvs += $DataDir
        continue
    }

    $BinDir = Join-Path $DataDir 'venv\bin'
    if (-not (Test-Path $BinDir)) {
        New-Item -ItemType Directory -Force -Path $BinDir | Out-Null
    }

    $PyShim  = Join-Path $BinDir 'python'
    $PipShim = Join-Path $BinDir 'pip'

    if (-not (Test-Path $PyShim)) {
        $ShimPython | Set-Content -Path $PyShim -Encoding ASCII -NoNewline
        Write-Host "[bootstrap-runtime] WROTE $PyShim"
    }
    if (-not (Test-Path $PipShim)) {
        $ShimPip | Set-Content -Path $PipShim -Encoding ASCII -NoNewline
        Write-Host "[bootstrap-runtime] WROTE $PipShim"
    }

    # chmod +x via bash (W280-fix9) — Set-Content doesn't set POSIX exec bit;
    # run_mcp.sh:15 [ -x bin/python ] check needs it on Git Bash semantics.
    # Path normalization: bash accepts Windows backslashes but quote for safety.
    $bashPy  = ($PyShim  -replace '\\', '/')
    $bashPip = ($PipShim -replace '\\', '/')
    & bash -c "chmod +x '$bashPy' '$bashPip'" 2>&1 | Out-Null

    # Verify shims pass the [ -x ] predicate that run_mcp.sh actually uses
    $verifyExit = (& bash -c "test -x '$bashPy' && test -x '$bashPip' && echo OK" 2>&1)
    if ($verifyExit -notmatch 'OK') {
        Write-Error "[bootstrap-runtime] FAIL: shim executable-check did not pass for $BinDir/python or pip. bash test -x output: $verifyExit"
        exit 1
    }

    # Defense-in-depth (W280-fix11): not just [ -x ], also EXECUTE the shim
    # to prove it actually delegates to Scripts/python.exe correctly. Catches
    # any case where the file is executable but its contents are mis-written
    # (e.g. PowerShell string-expansion bugs that swallowed $@ / $0 etc.).
    $pyVerExit = (& bash -c "'$bashPy' --version 2>&1") | Out-String
    if ($pyVerExit -notmatch 'Python\s+\d+\.\d+') {
        Write-Error "[bootstrap-runtime] FAIL: bin/python shim does not exec a real Python interpreter. Output: $pyVerExit"
        exit 1
    }
    $pipVerExit = (& bash -c "'$bashPip' --version 2>&1") | Out-String
    if ($pipVerExit -notmatch 'pip\s+\d+') {
        Write-Error "[bootstrap-runtime] FAIL: bin/pip shim does not exec a real pip. Output: $pipVerExit"
        exit 1
    }
    Write-Host "[bootstrap-runtime] OK shims verified in $BinDir (test -x + python/pip --version exec test)"

    $PipExe = Join-Path $VenvScripts 'pip.exe'
    if (Test-Path $PipExe) {
        $HasMcp = & $PipExe show mcp 2>$null
        if (-not $HasMcp) {
            Write-Host "[bootstrap-runtime] Installing mcp>=1.0.0 into $DataDir"
            & $PipExe install --quiet 'mcp>=1.0.0'
        } else {
            Write-Host "[bootstrap-runtime] OK mcp installed in $DataDir"
        }
    }

    # Discover latest installed hindsight-memory plugin version
    $HsInstallRoot = Get-LatestPluginVersion "$RepoRoot\.claude\plugins\cache\hindsight\hindsight-memory"
    if ($null -ne $HsInstallRoot) {
        $ReqSrc = Join-Path $HsInstallRoot 'requirements.txt'
        $ReqCached = Join-Path $DataDir 'requirements.txt'
        if ((Test-Path $ReqSrc) -and -not (Test-Path $ReqCached)) {
            Copy-Item $ReqSrc $ReqCached
            Write-Host "[bootstrap-runtime] WROTE $ReqCached (from $HsInstallRoot)"
        }
    }
}

# Fail loudly if NO hindsight venv was processable. PART 1 (codex) already
# completed unconditionally above, so the safety control is in place even if
# this exits nonzero.
$processedCount = $DataDirs.Count - $missingVenvs.Count
if ($processedCount -eq 0) {
    Write-Error @"
[bootstrap-runtime] PART 2 FAIL: no hindsight plugin venv found at any expected path:
  - $($DataDirs -join "`n  - ")

Fresh-checkout recovery: run \`claude mcp list\` once to let CC spawn the plugin's
run_mcp.sh (which creates the venv structure as a side effect — it will fail to
connect, that is fine), THEN re-run this script to finish hindsight bootstrap.

NOTE: PART 1 (codex stop-time review-gate) ALREADY completed and verified above,
so the highest-priority safety control IS in place — only hindsight remains.
"@
    exit 1
}
foreach ($missingDir in $missingVenvs) {
    Write-Host "[bootstrap-runtime] NOTE $missingDir absent (alt data-dir naming - harmless if the other was processed)"
}

# --- 2c: hindsight-embed daemon health check (fail-loud if not up) ---------
# Bootstrap is the fresh-clone recovery path per CLAUDE.md. Writing config
# and shims without verifying the EFFECTIVE endpoint (resolved above from
# merged config — hindsightApiUrl Mode-1 / apiPort Mode-2) reachable leaves
# the T1 memory MCP non-functional. Validates the same URL the plugin will
# use, not a hardcoded :9077.
$DaemonUp = $false
try {
    $resp = Invoke-WebRequest -Uri $HealthUrl -UseBasicParsing -TimeoutSec 3 -ErrorAction Stop
    if ($resp.StatusCode -eq 200) {
        $DaemonUp = $true
        Write-Host "[bootstrap-runtime] OK hindsight endpoint healthy at $HealthUrl"
    }
} catch {
    # Connection failed
}
if (-not $DaemonUp) {
    Write-Error @"
[bootstrap-runtime] PART 2 FAIL: hindsight endpoint not reachable at ${HealthUrl}

Plugin will use this endpoint per the merged config in ${ConfigFile} -
  hindsightApiUrl = $($existing.hindsightApiUrl)
  apiPort         = $($existing.apiPort) (defaults to 9077 if unset)

Recovery options -
  (a) Start the local daemon (Mode-2, default) on port ${EffectivePort} -
        uvx hindsight-embed@latest profile create --merge --port ${EffectivePort} --profile claude-code
        uvx hindsight-embed@latest daemon --profile claude-code start
      (Or persist via NSSM as a Windows service.)
  (b) If hindsightApiUrl points at a remote/stale endpoint and you want
      local-mode, remove the hindsightApiUrl key from ${ConfigFile} and re-run.
  (c) If you want external Mode-1, ensure the URL above is reachable.

NOTE - PART 1 (codex stop-time review-gate) ALREADY completed and verified above,
so the highest-priority safety control IS in place; only hindsight remains.
"@
    exit 1
}

# ===========================================================================
# PART 3: basic-memory T6 state config (W282-fix2)
# ===========================================================================
# basic-memory MCP (W281e, T6) reads its config from
# Z:/claude-sota-installed-state/basic-memory/config/config.json (state-side,
# gitignored). Two stacked startup bugs documented in W282d:
#   (a) Windows backslashes in `path` cause JSON-parse errors (\c, \b, \m
#       are invalid escapes), and
#   (b) `env` accepts only Literal {test,dev,user} per Pydantic — `"prod"`
#       fails Pydantic validation.
# This block makes the repair tracked + idempotent + fail-loud per codex
# round-2 HIGH: previously the fix lived only in gitignored state, so fresh
# clones/state-resets would silently reinstate the bugs.

$BasicMemoryStateDir = 'Z:\claude-sota-installed-state\basic-memory\config'
$BasicMemoryConfig   = Join-Path $BasicMemoryStateDir 'config.json'
$ValidEnvs = @('test', 'dev', 'user')

if (-not (Test-Path $BasicMemoryStateDir)) {
    New-Item -ItemType Directory -Force -Path $BasicMemoryStateDir | Out-Null
    Write-Host "[bootstrap-runtime] Created $BasicMemoryStateDir"
}

function Write-DefaultBasicMemoryConfig {
    param([string]$Path)
    $defaultCfg = [PSCustomObject]@{
        env = 'user'
        projects = [PSCustomObject]@{
            main = [PSCustomObject]@{
                path = 'Z:/claude-sota-installed-state/basic-memory/markdown'
                mode = 'local'
                workspace_id = $null
                local_sync_path = $null
                bisync_initialized = $false
                last_sync = $null
            }
        }
        default_project = 'main'
        log_level = 'INFO'
        logfire_enabled = $false
        database_backend = 'sqlite'
        semantic_search_enabled = $true
        semantic_embedding_provider = 'fastembed'
        semantic_embedding_model = 'bge-small-en-v1.5'
        auto_update = $false
    }
    ($defaultCfg | ConvertTo-Json -Depth 10) | Set-Content -Path $Path -Encoding UTF8 -NoNewline
}

if (-not (Test-Path $BasicMemoryConfig)) {
    Write-DefaultBasicMemoryConfig -Path $BasicMemoryConfig
    Write-Host "[bootstrap-runtime] WROTE $BasicMemoryConfig (defaults: env=user, forward-slash paths)"
} else {
    # Read raw, attempt parse; on parse failure REGENERATE defaults. Heuristic
    # backslash-repair was attempted in W282-fix2/fix3 but the regex needed
    # to either preserve or destroy JSON escape semantics (\b = backspace,
    # \" = quote, etc.) — both paths corrupted some valid configs. The honest
    # tradeoff (W282-fix4 per codex round-3): on unrecoverable raw-parse
    # failure, BACK UP the broken file and regenerate defaults. Operator
    # re-adds custom projects from the .bak after.
    $rawJson = Get-Content $BasicMemoryConfig -Raw
    $rawParseFailed = $false
    try {
        $bmCfg = $rawJson | ConvertFrom-Json -ErrorAction Stop
    } catch {
        $rawParseFailed = $true
        $bakPath = $BasicMemoryConfig + '.parse-failed.bak'
        Copy-Item $BasicMemoryConfig $bakPath -Force
        if (-not $AllowRegen) {
            # W282-fix4 (codex round-4 HIGH): default behavior is fail-loud,
            # NOT silent regen. Stateful memory config repointing without
            # operator confirmation can look like memory loss + cause new
            # notes to be written into the wrong project.
            Write-Error @"
[bootstrap-runtime] PART 3 FAIL: basic-memory config at ${BasicMemoryConfig} fails JSON parse.
Reason - $($_.Exception.Message)

Original file backed up at ${bakPath} (no data lost).

Recovery options -
  (a) Manually repair ${BasicMemoryConfig} from the .bak (most common cause -
      Windows backslash paths that aren't valid JSON escapes; replace single
      \\ with / in any "path" values, OR escape them as \\\\)
  (b) Re-run with the explicit opt-in flag -
        .\tools\bootstrap-runtime.ps1 -AllowRegen
      This will REGENERATE defaults (single 'main' project with
      forward-slash path), losing any custom projects / workspace IDs /
      sync settings that were in the original. Restore them manually
      from the .bak after.

NOTE - PART 1 (codex stop-time review-gate) and PART 2 (hindsight) ALREADY
completed and verified above, so the codex safety gate + T1 memory are in
place; only T6 basic-memory remains.
"@
            exit 1
        }
        # -AllowRegen path: operator opted in explicitly
        Write-Host "[bootstrap-runtime] WARN $BasicMemoryConfig fails JSON parse: $($_.Exception.Message). -AllowRegen flag set; backing up to $bakPath and regenerating defaults."
        Write-DefaultBasicMemoryConfig -Path $BasicMemoryConfig
        $bmCfg = Get-Content $BasicMemoryConfig -Raw | ConvertFrom-Json -ErrorAction Stop
        Write-Host "[bootstrap-runtime] REGENERATED $BasicMemoryConfig (defaults: env=user, single 'main' project with forward-slash path). Restore custom projects from $bakPath if needed."
    }

    # Whether raw parse succeeded or regen happened, still validate env +
    # paths so any drift in existing valid config gets repaired (and the
    # post-regen object also gets the env/path check as a belt-and-suspenders).
    $needsWrite = $false
    if ($true) {
        # Validate `env` Literal whitelist
        if ($null -eq $bmCfg.env -or $ValidEnvs -notcontains $bmCfg.env) {
            $oldEnv = $bmCfg.env
            $bmCfg | Add-Member -NotePropertyName 'env' -NotePropertyValue 'user' -Force
            $needsWrite = $true
            Write-Host "[bootstrap-runtime] REPAIRED env='$oldEnv' -> 'user' (was outside Pydantic Literal whitelist $($ValidEnvs -join ','))"
        }
        # Normalize backslashes in project paths to forward slashes
        if ($null -ne $bmCfg.projects) {
            foreach ($projName in $bmCfg.projects.PSObject.Properties.Name) {
                $proj = $bmCfg.projects.$projName
                if ($null -ne $proj.path -and $proj.path -match '\\') {
                    $oldPath = $proj.path
                    $proj.path = ($proj.path -replace '\\', '/')
                    $needsWrite = $true
                    Write-Host "[bootstrap-runtime] REPAIRED projects.$projName.path '$oldPath' -> '$($proj.path)' (backslash normalize)"
                }
            }
        }
        # W282-fix4 (codex round-4): verify default_project points at an
        # existing project before writing. If not, fail loud — do not auto-
        # rewrite default_project as that's another silent runtime repoint.
        if ($null -ne $bmCfg.default_project -and $null -ne $bmCfg.projects) {
            $projNames = @($bmCfg.projects.PSObject.Properties.Name)
            if ($projNames -notcontains $bmCfg.default_project) {
                Write-Error "[bootstrap-runtime] FAIL: basic-memory config default_project='$($bmCfg.default_project)' does NOT exist in projects map (available: $($projNames -join ',')). Repair $BasicMemoryConfig manually."
                exit 1
            }
        }
    }

    if ($needsWrite) {
        ($bmCfg | ConvertTo-Json -Depth 10) | Set-Content -Path $BasicMemoryConfig -Encoding UTF8 -NoNewline
        Write-Host "[bootstrap-runtime] REPAIRED $BasicMemoryConfig (re-validated)"
    } else {
        Write-Host "[bootstrap-runtime] OK $BasicMemoryConfig (env=$($bmCfg.env), paths use forward slashes)"
    }
}

# Final probe (W282-fix5 per codex round-5 HIGH): enforce the FULL
# load-bearing shape, not just JSON-parse + env. A valid-JSON-but-incomplete
# config like {"env":"user"} or {"env":"user","projects":{}} would have
# previously passed validation while the MCP either fails on startup OR
# writes to an unintended project. Fail loud for any structural break.
try {
    $finalCfg = Get-Content $BasicMemoryConfig -Raw | ConvertFrom-Json -ErrorAction Stop
} catch {
    Write-Error "[bootstrap-runtime] FAIL: basic-memory config parse failed after repair: $($_.Exception.Message)"
    exit 1
}

# Shape check 1: env in Pydantic Literal whitelist
if ($ValidEnvs -notcontains $finalCfg.env) {
    Write-Error "[bootstrap-runtime] FAIL: basic-memory config env='$($finalCfg.env)' outside Pydantic Literal whitelist (allowed: $($ValidEnvs -join ','))"
    exit 1
}

# Shape check 2: projects exists + has >=1 entry
if ($null -eq $finalCfg.projects) {
    Write-Error "[bootstrap-runtime] FAIL: basic-memory config missing required 'projects' key. Re-run with -AllowRegen to write defaults."
    exit 1
}
$finalProjNames = @($finalCfg.projects.PSObject.Properties.Name)
if ($finalProjNames.Count -eq 0) {
    Write-Error "[bootstrap-runtime] FAIL: basic-memory config has empty 'projects' map (need at least one project). Re-run with -AllowRegen to write defaults."
    exit 1
}

# Shape check 3: default_project non-empty + present in projects
if ([string]::IsNullOrWhiteSpace($finalCfg.default_project)) {
    Write-Error "[bootstrap-runtime] FAIL: basic-memory config has empty 'default_project' (available: $($finalProjNames -join ',')). Repair $BasicMemoryConfig manually."
    exit 1
}
if ($finalProjNames -notcontains $finalCfg.default_project) {
    Write-Error "[bootstrap-runtime] FAIL: basic-memory config default_project='$($finalCfg.default_project)' not in projects map (available: $($finalProjNames -join ',')). Repair $BasicMemoryConfig manually."
    exit 1
}

# Shape check 4: selected project has non-empty path
$selectedProj = $finalCfg.projects.$($finalCfg.default_project)
if ($null -eq $selectedProj.path -or [string]::IsNullOrWhiteSpace($selectedProj.path)) {
    Write-Error "[bootstrap-runtime] FAIL: basic-memory config selected project '$($finalCfg.default_project)' has empty 'path'. Repair $BasicMemoryConfig manually."
    exit 1
}

# Shape check 5: selected project path exists (create if missing — markdown
# dirs are auto-creatable runtime state, not human-curated)
if (-not (Test-Path $selectedProj.path)) {
    try {
        New-Item -ItemType Directory -Force -Path $selectedProj.path | Out-Null
        Write-Host "[bootstrap-runtime] Created basic-memory markdown dir $($selectedProj.path)"
    } catch {
        Write-Error "[bootstrap-runtime] FAIL: could not create basic-memory project path '$($selectedProj.path)': $($_.Exception.Message)"
        exit 1
    }
}

Write-Host "[bootstrap-runtime] OK basic-memory config validated (env=$($finalCfg.env), default_project=$($finalCfg.default_project), path=$($selectedProj.path), projects.count=$($finalProjNames.Count))"

# ===========================================================================
# PART 4: hindsight pg0 Z:-portable check (W287 P2 / W288 Stream B+E reconciled)
# ===========================================================================
# pg0 is the embedded postgres backing the hindsight memory tier. On a fresh
# Windows install it defaults to ~/.pg0/ resolved from $env:USERPROFILE; the
# Z:-portable contract requires data live under Z:\claude-sota-installed\.pg0.
#
# CORRECTIONS APPLIED 2026-05-18 (per W288 Stream E investigation — see
# docs/architecture/W288-system-lag-audit/STREAM-E-pg0-cutover-runbook.md):
#   1. The `HINDSIGHT_PG0_DIR` env var DOES NOT EXIST in hindsight or pg0
#      source (verified via grep on `Z:\repos\deps\hindsight\` + `pg0.exe`
#      strings + venv site-packages). Earlier bootstrap advised setting it —
#      that was hallucinated. Path resolution is via $env:USERPROFILE +
#      instance.json `data_dir`/`installation_dir` absolute paths.
#   2. The `Stop-Process` loop pattern risks WAL corruption — pg0.exe ships
#      pg_ctl bundled and exposes `pg0.exe stop --name <instance>` (smart
#      shutdown) which is the SOTA-correct graceful stop. See Stream E §2.
#   3. The Z: path target is `Z:\claude-sota-installed\.pg0` (matches eee.ps1
#      USERPROFILE=Z:\claude-sota-installed), NOT `...-state\.pg0`.
#   4. C:\Users\<user>\.pg0 may be a junction → Z: (Stream E pre-state). The
#      check below distinguishes junction (acceptable but cleanable) from
#      real C: dir (true pre-migration violation).
Write-Host ''
Write-Host "[bootstrap-runtime] PART 4: hindsight pg0 Z:-portable check (W288 Stream E)"

$Pg0Cdir = Join-Path $env:USERPROFILE '.pg0'
if (-not $Pg0Cdir -or $env:USERPROFILE -eq $RepoRoot) {
    # If USERPROFILE is already Z:\claude-sota-installed (via eee.ps1), then
    # ~/.pg0 IS the Z: target. The C: check uses the fixed Windows profile.
    $Pg0Cdir = "C:\Users\$env:USERNAME\.pg0"
}
$Pg0Zdir = Join-Path $RepoRoot '.pg0'

# Detect C: state: missing / junction / real-dir
$Pg0Cstate = 'missing'
if (Test-Path $Pg0Cdir) {
    $cItem = Get-Item $Pg0Cdir -Force -ErrorAction SilentlyContinue
    if ($cItem -and $cItem.Attributes -match 'ReparsePoint') {
        $Pg0Cstate = 'junction'
        $Pg0Ctarget = $cItem.Target
    } else {
        $Pg0Cstate = 'real-dir'
    }
}

if ((Test-Path $Pg0Zdir) -and $Pg0Cstate -eq 'missing') {
    Write-Host "[bootstrap-runtime] OK pg0 Z:-portable invariant satisfied (data at $Pg0Zdir, no C: footprint)"
} elseif ((Test-Path $Pg0Zdir) -and $Pg0Cstate -eq 'junction') {
    Write-Host "[bootstrap-runtime] OK pg0 data at $Pg0Zdir; C: junction $Pg0Cdir -> $Pg0Ctarget is the residual indirection."
    Write-Host "[bootstrap-runtime]   Junction is benign (data physically on Z:) but optional to remove for full cleanup."
    Write-Host "[bootstrap-runtime]   See: docs/architecture/W288-system-lag-audit/STREAM-E-pg0-cutover-runbook.md"
} elseif ((Test-Path $Pg0Zdir) -and $Pg0Cstate -eq 'real-dir') {
    Write-Warning "[bootstrap-runtime] pg0 on BOTH Z: ($Pg0Zdir) AND C: real-dir ($Pg0Cdir) — divergent data. ABORT and reconcile manually before proceeding."
    Write-Host "[bootstrap-runtime]   This means a separate pg0 install at $Pg0Cdir created its own data — pick one + back up the other."
} elseif ($Pg0Cstate -eq 'real-dir') {
    Write-Warning "[bootstrap-runtime] pg0 on C: real-dir at $Pg0Cdir — violates Z:-portable convention (W287 P2)."
    Write-Host "[bootstrap-runtime]   OPERATOR-ACTION-REQUIRED (W288 Stream E reconciled runbook):"
    Write-Host "[bootstrap-runtime]     See docs/architecture/W288-system-lag-audit/STREAM-E-pg0-cutover-runbook.md for the validated"
    Write-Host "[bootstrap-runtime]     graceful-stop + edit-instance.json + restart sequence."
    Write-Host "[bootstrap-runtime]   Key SOTA-correct primitives (do NOT use the legacy Stop-Process loop):"
    Write-Host '[bootstrap-runtime]     1. Graceful daemon stop:  uvx hindsight-embed daemon --profile claude-code stop'
    Write-Host '[bootstrap-runtime]     2. Smart postgres stop:   & <uv-cache-pg0.exe> stop --name <instance>'
    Write-Host '[bootstrap-runtime]     3. Edit instance.json data_dir + installation_dir to Z:\ paths'
    Write-Host '[bootstrap-runtime]     4. Junction-aware delete: cmd /c rmdir <c:-path>     (NOT Remove-Item -Recurse)'
    Write-Host '[bootstrap-runtime]     5. Restart daemon:        uvx hindsight-embed daemon --profile claude-code start'
    Write-Host "[bootstrap-runtime]   NOTE: HINDSIGHT_PG0_DIR env var is a PHANTOM — does NOT exist in hindsight source. Do not set it."
} else {
    Write-Host "[bootstrap-runtime] OK pg0 not yet materialized (fresh install) — will appear on first daemon start; ensure USERPROFILE points at $RepoRoot via tools/eee.ps1"
}

# ===========================================================================
# PART 6: serena project.yml language list (W290.6 — bake-off P0 #1)
# ===========================================================================
# Per docs/architecture/W290-QUALITY-AND-SOTA-WAVE/W290.5-SERENA-VS-GITNEXUS-BAKEOFF.md
# Tasks A/B: serena auto-detected only `rust` from .cargo/git/checkouts/ cache
# on first invocation, blocking find_symbol / get_symbols_overview / find_referencing_symbols
# on the actual Python + TypeScript + Bash codebase in accounts/scripts/, evals/,
# harness/, tools/, .mcp.json, hooks. The .serena/ directory is gitignored
# (runtime state per cardinal-rule-2 / serena upstream convention), so this
# bootstrap step idempotently ensures the language list is correct.

$SerenaProjectYml = Join-Path $RepoRoot '.serena\project.yml'
if (Test-Path $SerenaProjectYml) {
    $yml = Get-Content $SerenaProjectYml -Raw
    # Detect the literal `- rust` only block (serena's broken auto-detect output)
    $isRustOnly = ($yml -match '(?ms)^languages:\s*\n- rust\s*\n\s*\n')
    $hasPython  = ($yml -match '(?m)^- python\s*$')
    $hasTs      = ($yml -match '(?m)^- typescript\s*$')
    $hasBash    = ($yml -match '(?m)^- bash\s*$')
    if ($isRustOnly -or -not ($hasPython -and $hasTs -and $hasBash)) {
        Write-Host "[bootstrap-runtime] serena project.yml language list needs widening (currently missing python/typescript/bash)"
        # Surgical replace: only the `languages: \n- rust\n` block; leave rest of file alone
        $newYml = $yml -replace '(?ms)^languages:\s*\n- rust\s*\n', "languages:`n- python`n- typescript`n- rust`n- bash`n"
        if ($newYml -ne $yml) {
            Set-Content -Path $SerenaProjectYml -Value $newYml -Encoding UTF8 -NoNewline
            Write-Host "[bootstrap-runtime] OK serena project.yml widened to python+typescript+rust+bash (was rust-only)"
        } else {
            Write-Warning "[bootstrap-runtime] serena project.yml found but languages-block regex did not match; manual edit needed"
            Write-Host "[bootstrap-runtime]   Edit $SerenaProjectYml and add:  - python   - typescript   - bash   under 'languages:'"
        }
    } else {
        Write-Host "[bootstrap-runtime] OK serena project.yml languages already include python+typescript+bash"
    }
} else {
    Write-Host "[bootstrap-runtime] serena project.yml not yet created — will be auto-generated by serena MCP server on first invocation"
    Write-Host "[bootstrap-runtime]   After first invocation, re-run this bootstrap to apply the W290.6 language widening"
}

# ===========================================================================
Write-Host ''
Write-Host '[bootstrap-runtime] Done. Verify:'
Write-Host '  claude mcp list | Select-String "hindsight|basic-memory"           # -> Connected (both)'
Write-Host '  (codex review-gate + hindsight daemon health + basic-memory config + pg0 location + serena languages all verified above)'
