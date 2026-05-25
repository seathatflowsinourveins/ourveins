# ARCHIVED W325 — C:-hardcoded Z:-portability cardinal-rule violation (L51 'C:\Users\42\.cognee'
# SourceDir + L79 nssm.exe WinGet C:-fallback path); see W325 Stream-D D-H2 for context.
# Original location: tools/migrate-cognee-state.ps1
# Archived via `git mv` 2026-05-19 to .claude/skills/_archived/W325-deprecated/
# Do NOT execute from this path; superseded by W286-A migration which has already landed
# (W317-r1 fs-probe confirmed dest at Z:/claude-sota-installed-state/cognee/).
# Re-use as cite-reference only; if a re-migration is ever required, replace C:-literals
# with $env:USERPROFILE / dynamic Get-Command nssm before re-running.
<#
.SYNOPSIS
  Migrate cognee data dir from C:/Users/42/.cognee to Z:/claude-sota-installed-state/cognee.

.DESCRIPTION
  Per W286-A audit (docs/architecture/W286a-STALE-C-AUDIT-2026-05-18.md), the cognee MCP
  defaults its data dir to ~/.cognee because the NSSM CogneeMCP service does not set
  SYSTEM_ROOT_DIRECTORY / DATA_ROOT_DIRECTORY env vars. This script:

    1. Pre-flight verify (service exists, source dir exists, dest dir absent).
    2. Stop NSSM CogneeMCP service.
    3. Backup C:/Users/42/.cognee → Z:/claude-sota-installed-state/backups/cognee-pre-migrate-<UTC>.zip
    4. Move C:/Users/42/.cognee → Z:/claude-sota-installed-state/cognee
    5. nssm set CogneeMCP AppEnvironmentExtra +SYSTEM_ROOT_DIRECTORY +DATA_ROOT_DIRECTORY
    6. Start NSSM CogneeMCP service; poll up to 30 s for Running.
    7. Verify HTTP endpoint http://127.0.0.1:8000/mcp returns (4xx or 2xx).
    8. Emit summary; on any step failure, fail loudly + leave inline-state for recovery.

.PARAMETER Execute
  Default: $false (dry-run / -WhatIf semantics). Pass -Execute to actually perform
  Stop-Service / Move-Item / nssm set / Start-Service.

.PARAMETER NssmExe
  Path to nssm.exe. Default: resolves from PATH; falls back to known WinGet symlink.

.EXAMPLE
  # Dry-run (default) — shows what would happen, exits 0 without changing anything:
  .\tools\migrate-cognee-state.ps1

.EXAMPLE
  # Commit:
  .\tools\migrate-cognee-state.ps1 -Execute

.NOTES
  Author: W286-A stream-implementer
  Cite: docs/architecture/W286a-STALE-C-AUDIT-2026-05-18.md Section C.3
  Rollback: see header of W286a audit doc Section C.3 (stop service → reverse Move-Item
  → remove env vars → restart). Backup zip is the safety net.

  Idempotent: re-running after a successful migration short-circuits with "ALREADY MIGRATED"
  because the source dir no longer exists.
#>
[CmdletBinding()]
param(
    [switch]$Execute,
    [string]$NssmExe = ''
)

$ErrorActionPreference = 'Stop'

$SourceDir = 'C:\Users\42\.cognee'
$DestDir   = 'Z:\claude-sota-installed-state\cognee'
# Cognee splits config/state under SYSTEM_ROOT_DIRECTORY and stores serialised
# memory/graph data under DATA_ROOT_DIRECTORY = $DestDir\data. Single derivation
# point per codex MEDIUM-2 — used by both the probe + the write/verify steps.
$ExpectedSystemRoot = $DestDir
$ExpectedDataRoot   = Join-Path $DestDir 'data'
$BackupDir = 'Z:\claude-sota-installed-state\backups'
$ServiceName = 'CogneeMCP'
$HealthUrl = 'http://127.0.0.1:8000/mcp'

function Write-Section($title) {
    Write-Output ""
    Write-Output "================================================================"
    Write-Output "  $title"
    Write-Output "================================================================"
}

function Write-Action($msg) {
    $prefix = if ($Execute) { '[EXECUTE]' } else { '[DRY-RUN]' }
    Write-Output "$prefix $msg"
}

function Resolve-NssmExe {
    if ($NssmExe -and (Test-Path $NssmExe)) { return $NssmExe }
    $cmd = Get-Command nssm -ErrorAction SilentlyContinue
    if ($cmd) { return $cmd.Source }
    # WinGet symlink fallback
    $wingetPath = 'C:\Users\42\AppData\Local\Microsoft\WinGet\Packages\NSSM.NSSM_Microsoft.Winget.Source_8wekyb3d8bbwe\nssm-2.24-101-g897c7ad\win64\nssm.exe'
    if (Test-Path $wingetPath) { return $wingetPath }
    throw "nssm.exe not found in PATH or known WinGet location; pass -NssmExe <path>"
}

Write-Section "W286-A — cognee state migration: C: -> Z:"
Write-Output "Mode:        $(if ($Execute) { 'EXECUTE (will perform mutations)' } else { 'DRY-RUN (no changes)' })"
Write-Output "Source:      $SourceDir"
Write-Output "Destination: $DestDir"
Write-Output "Backup dir:  $BackupDir"
Write-Output "Service:     $ServiceName"

# -------------------------------------------------------------------
# Step 1 — Pre-flight
# -------------------------------------------------------------------
Write-Section "Step 1 — Pre-flight checks"

# Helpers for partial-migration repair (W286-cross-fix1 per codex round-1 HIGH).
# A 2nd run could find source-gone + dest-present yet NSSM env still points at
# old source. Naive shortcut would falsely declare 'already migrated' while the
# service is broken. New idempotency contract: ONLY exit 0 when (a) source gone,
# (b) dest present, (c) NSSM env points at dest, AND (d) endpoint healthy.
function Test-NssmEnvPointsAtDest {
    param([string]$ServiceName, [string]$ExpectedSystemRoot, [string]$ExpectedDataRoot, [string]$NssmExe)
    try {
        $envOut = & $NssmExe get $ServiceName AppEnvironmentExtra 2>&1 | Out-String
        # Use the SAME expected values that Step 5 write+verify uses (codex
        # round-2 MEDIUM-2 fix: previously the probe checked DATA_ROOT_DIRECTORY=
        # $DestDir but the write put DATA_ROOT_DIRECTORY=$DestDir\data, so a
        # successful migration always failed the idempotency check and
        # triggered an unnecessary service restart).
        $rootOk = $envOut -match "SYSTEM_ROOT_DIRECTORY=$([regex]::Escape($ExpectedSystemRoot))"
        $dataOk = $envOut -match "DATA_ROOT_DIRECTORY=$([regex]::Escape($ExpectedDataRoot))"
        return @{ Ok = ($rootOk -and $dataOk); EnvDump = $envOut; RootOk = $rootOk; DataOk = $dataOk }
    } catch {
        return @{ Ok = $false; EnvDump = "EXC: $($_.Exception.Message)"; RootOk = $false; DataOk = $false }
    }
}

function Test-CogneeMcpHealthy {
    param([string]$Url)
    try {
        $resp = Invoke-WebRequest -Uri $Url -UseBasicParsing -TimeoutSec 5 -ErrorAction Stop
        # /mcp is POST-only — bare GET returns 405 Method Not Allowed when service is healthy.
        # Treat 200 OR 405 as "cognee MCP correctly serving". Reject 404 (path missing),
        # 401/403 (auth wall — different service), 5xx (broken).
        if ($resp.StatusCode -eq 200 -or $resp.StatusCode -eq 405) { return $true }
        return $false
    } catch [System.Net.WebException] {
        # Windows PowerShell 5.1 throws this
        $r = $_.Exception.Response
        if ($r -and ([int]$r.StatusCode -eq 405)) { return $true }
        return $false
    } catch {
        # PowerShell 7+ throws Microsoft.PowerShell.Commands.HttpResponseException
        # for non-2xx by default — extract StatusCode from $_.Exception.Response
        # (per codex round-3 MEDIUM-1 fix).
        $r = $_.Exception.Response
        if ($r) {
            $sc = if ($r.StatusCode -is [int]) { $r.StatusCode } else { [int]$r.StatusCode }
            if ($sc -eq 200 -or $sc -eq 405) { return $true }
        }
        return $false
    }
}

# Smart idempotency: require ALL of (source gone, dest present, NSSM env points
# at dest, endpoint healthy). Otherwise, fall through to partial-repair mode
# which redoes NSSM env + service restart but skips the Move-Item step.
$script:PartialRepair = $false
if (-not (Test-Path $SourceDir) -and (Test-Path $DestDir)) {
    $nssmExeProbe = $null
    try { $nssmExeProbe = Resolve-NssmExe } catch { }
    if ($null -eq $nssmExeProbe) {
        Write-Warning "[WARN] nssm.exe not resolvable for idempotency env-probe; cannot verify NSSM AppEnvironmentExtra. Falling through to fail-loud Pre-flight (Source must exist for full migration)."
    } else {
        $envCheck = Test-NssmEnvPointsAtDest -ServiceName $ServiceName -ExpectedSystemRoot $ExpectedSystemRoot -ExpectedDataRoot $ExpectedDataRoot -NssmExe $nssmExeProbe
        $endpointOk = Test-CogneeMcpHealthy -Url $HealthUrl
        if ($envCheck.Ok -and $endpointOk) {
            Write-Output "[OK] ALREADY MIGRATED + VERIFIED — source absent, dest present, NSSM AppEnvironmentExtra has SYSTEM_ROOT_DIRECTORY=$ExpectedSystemRoot + DATA_ROOT_DIRECTORY=$ExpectedDataRoot, /mcp endpoint healthy."
            Write-Output "[OK] Nothing to do. Exiting cleanly."
            exit 0
        }
        Write-Warning "[WARN] PARTIAL-MIGRATION DETECTED — source moved to $DestDir but verification incomplete:"
        Write-Warning "       NSSM env SYSTEM_ROOT_DIRECTORY=$ExpectedSystemRoot? $($envCheck.RootOk)"
        Write-Warning "       NSSM env DATA_ROOT_DIRECTORY=$ExpectedDataRoot? $($envCheck.DataOk)"
        Write-Warning "       /mcp endpoint healthy? $endpointOk"
        if (-not $Execute) {
            Write-Output "[DRY-RUN] Would enter partial-repair mode (skip Move-Item, redo NSSM env + service restart). Re-run with -Execute to repair."
            exit 0
        }
        Write-Warning "[REPAIR] Entering partial-repair mode: skipping Move-Item (already done), continuing with NSSM env update + service restart + health re-probe."
        $script:PartialRepair = $true
    }
}

if (-not $script:PartialRepair) {
    if (-not (Test-Path $SourceDir)) {
        throw "Source dir '$SourceDir' does not exist (and dest '$DestDir' does not exist either). Nothing to migrate."
    }
    Write-Output "[OK] Source exists: $SourceDir"

    if (Test-Path $DestDir) {
        throw "Destination dir '$DestDir' ALREADY exists. Refusing to clobber. Rename or remove first, then re-run."
    }
    Write-Output "[OK] Destination absent: $DestDir"
} else {
    Write-Output "[REPAIR] Skipping Source/Destination presence checks — partial-repair mode (source already moved to dest)."
}

$svc = Get-Service -Name $ServiceName -ErrorAction SilentlyContinue
if (-not $svc) {
    throw "NSSM service '$ServiceName' not found. Was cognee uninstalled? Aborting."
}
Write-Output "[OK] Service exists: $ServiceName (Status=$($svc.Status))"

$nssm = Resolve-NssmExe
Write-Output "[OK] nssm.exe: $nssm"

# Source size for reporting + sanity
$srcItems = Get-ChildItem -Path $SourceDir -Recurse -Force -ErrorAction SilentlyContinue
$srcSizeMB = [math]::Round((($srcItems | Measure-Object -Property Length -Sum).Sum) / 1MB, 2)
$srcFileCount = ($srcItems | Where-Object { -not $_.PSIsContainer }).Count
Write-Output "[OK] Source: $srcSizeMB MB / $srcFileCount files"

if (-not (Test-Path $BackupDir)) {
    Write-Action "mkdir $BackupDir"
    if ($Execute) { New-Item -ItemType Directory -Path $BackupDir -Force | Out-Null }
}

# Snapshot current AppEnvironmentExtra for rollback documentation
$currentEnv = (Get-ItemProperty "HKLM:\SYSTEM\CurrentControlSet\Services\$ServiceName\Parameters" -ErrorAction Stop).AppEnvironmentExtra
Write-Output "[OK] Current NSSM AppEnvironmentExtra:"
$currentEnv | ForEach-Object { Write-Output "       $_" }
$hasSysRoot = $currentEnv -match '^SYSTEM_ROOT_DIRECTORY='
$hasDataRoot = $currentEnv -match '^DATA_ROOT_DIRECTORY='
if ($hasSysRoot -or $hasDataRoot) {
    Write-Output "[WARN] SYSTEM_ROOT_DIRECTORY / DATA_ROOT_DIRECTORY already set in NSSM env."
    Write-Output "[WARN] Will be REPLACED with new values. Pre-change values preserved in inline log below."
}

# -------------------------------------------------------------------
# Step 2 — Stop service
# -------------------------------------------------------------------
Write-Section "Step 2 — Stop NSSM service"
Write-Action "Stop-Service -Name $ServiceName -Force"
if ($Execute) {
    Stop-Service -Name $ServiceName -Force
    # Poll for Stopped
    $deadline = (Get-Date).AddSeconds(30)
    do {
        Start-Sleep -Milliseconds 500
        $st = (Get-Service -Name $ServiceName).Status
    } while ($st -ne 'Stopped' -and (Get-Date) -lt $deadline)
    if ($st -ne 'Stopped') {
        throw "Service did not stop within 30 s (status=$st). Aborting."
    }
    Write-Output "[OK] Service stopped."
} else {
    Write-Output "[DRY-RUN] (skipped Stop-Service)"
}

# -------------------------------------------------------------------
# Step 3 — Backup
# -------------------------------------------------------------------
Write-Section "Step 3 — Backup source dir"
$ts = (Get-Date -Format 'yyyyMMdd-HHmmss-UTC')
$backupZip = Join-Path $BackupDir "cognee-pre-migrate-$ts.zip"
if ($script:PartialRepair) {
    Write-Output "[REPAIR] SKIP Step 3 (Backup) — source already moved in prior partial-run; backup from that run is at $BackupDir if needed."
    $backupZip = '(skipped — partial-repair)'
} else {
    Write-Action "Compress-Archive -Path $SourceDir\* -DestinationPath $backupZip"
    if ($Execute) {
        try {
            Compress-Archive -Path "$SourceDir\*" -DestinationPath $backupZip -CompressionLevel Optimal -Force
            $zipSize = [math]::Round((Get-Item $backupZip).Length / 1MB, 2)
            Write-Output "[OK] Backup created: $backupZip ($zipSize MB)"
        } catch {
            Write-Output "[FAIL] Backup failed: $_"
            Write-Output "[FAIL] Service is STOPPED; restart manually: Start-Service $ServiceName"
            throw
        }
    } else {
        Write-Output "[DRY-RUN] (skipped Compress-Archive)"
    }
}

# -------------------------------------------------------------------
# Step 4 — Move
# -------------------------------------------------------------------
Write-Section "Step 4 — Move data dir"
if ($script:PartialRepair) {
    Write-Output "[REPAIR] SKIP Step 4 (Move-Item) — source already moved to $DestDir in prior partial-run; continuing with NSSM env repair."
} else {
Write-Action "Move-Item -Path $SourceDir -Destination $DestDir"
if ($Execute) {
    try {
        Move-Item -Path $SourceDir -Destination $DestDir -Force
        Write-Output "[OK] Moved $SourceDir -> $DestDir"
    } catch {
        Write-Output "[FAIL] Move-Item failed: $_"
        Write-Output "[FAIL] Backup zip preserved at: $backupZip"
        Write-Output "[FAIL] Service still STOPPED. Restart manually: Start-Service $ServiceName (will recreate empty .cognee in C: if needed)"
        throw
    }
} else {
    Write-Output "[DRY-RUN] (skipped Move-Item)"
}
}

# -------------------------------------------------------------------
# Step 5 — NSSM env vars
# -------------------------------------------------------------------
Write-Section "Step 5 — Update NSSM AppEnvironmentExtra"

# Build new env array: keep existing minus any pre-existing SYSTEM_ROOT_/DATA_ROOT_, plus our new pair.
$keepEnv = $currentEnv | Where-Object { $_ -notmatch '^(SYSTEM_ROOT_DIRECTORY|DATA_ROOT_DIRECTORY)=' }
$newEnv = $keepEnv + @(
    "SYSTEM_ROOT_DIRECTORY=$ExpectedSystemRoot",
    "DATA_ROOT_DIRECTORY=$ExpectedDataRoot"
)

Write-Output "New AppEnvironmentExtra (to be set):"
$newEnv | ForEach-Object { Write-Output "       $_" }

Write-Action "& $nssm set $ServiceName AppEnvironmentExtra <new-env-list>"
if ($Execute) {
    # nssm `set <svc> AppEnvironmentExtra <multi-line>` expects each NAME=VALUE on its own line via stdin OR
    # repeated arguments. The reliable form is space-separated quoted args.
    $args = @($ServiceName, 'AppEnvironmentExtra') + $newEnv
    & $nssm set @args
    if ($LASTEXITCODE -ne 0) {
        throw "nssm set AppEnvironmentExtra failed (exit=$LASTEXITCODE)"
    }
    # Verify it took
    $verify = (Get-ItemProperty "HKLM:\SYSTEM\CurrentControlSet\Services\$ServiceName\Parameters").AppEnvironmentExtra
    $hasNew = ($verify -match "SYSTEM_ROOT_DIRECTORY=$([regex]::Escape($ExpectedSystemRoot))") -and `
              ($verify -match "DATA_ROOT_DIRECTORY=$([regex]::Escape($ExpectedDataRoot))")
    if (-not $hasNew) {
        throw "Post-set verify failed; AppEnvironmentExtra does not contain expected SYSTEM_ROOT_DIRECTORY/DATA_ROOT_DIRECTORY"
    }
    Write-Output "[OK] NSSM env updated and verified."
} else {
    Write-Output "[DRY-RUN] (skipped nssm set)"
}

# -------------------------------------------------------------------
# Step 6 — Start service
# -------------------------------------------------------------------
Write-Section "Step 6 — Start NSSM service"
Write-Action "Start-Service -Name $ServiceName"
if ($Execute) {
    Start-Service -Name $ServiceName
    $deadline = (Get-Date).AddSeconds(30)
    do {
        Start-Sleep -Milliseconds 500
        $st = (Get-Service -Name $ServiceName).Status
    } while ($st -ne 'Running' -and (Get-Date) -lt $deadline)
    if ($st -ne 'Running') {
        throw "Service did not start within 30 s (status=$st). Check $($BackupDir)\..\..\..\claude-hub\logs\cognee-mcp-stderr.log"
    }
    Write-Output "[OK] Service started."
} else {
    Write-Output "[DRY-RUN] (skipped Start-Service)"
}

# -------------------------------------------------------------------
# Step 7 — HTTP probe
# -------------------------------------------------------------------
Write-Section "Step 7 — HTTP health probe"
Write-Action "Invoke-WebRequest $HealthUrl -UseBasicParsing -TimeoutSec 5"
if ($Execute) {
    # W286-cross-fix1 (codex MEDIUM-1): cognee /mcp is POST-only — bare GET returns
    # 405 Method Not Allowed when service is correctly serving. Accept ONLY
    # 200 OR 405 (via Test-CogneeMcpHealthy helper defined in Step 1).
    # Previously accepted any 4xx — 401/403/404 would falsely mark another service
    # at :8000 as cognee-healthy.
    $deadline = (Get-Date).AddSeconds(30)
    $ok = $false
    while ((Get-Date) -lt $deadline) {
        if (Test-CogneeMcpHealthy -Url $HealthUrl) {
            $ok = $true
            Write-Output "[OK] /mcp endpoint healthy (200 or 405 — cognee MCP correctly POST-only)."
            break
        }
        Start-Sleep -Seconds 1
    }
    if (-not $ok) {
        throw "HTTP probe to $HealthUrl did not respond within 30 s. Service is Running but endpoint unreachable."
    }
} else {
    Write-Output "[DRY-RUN] (skipped HTTP probe)"
}

# -------------------------------------------------------------------
# Step 8 — Close-out
# -------------------------------------------------------------------
Write-Section "Step 8 — Close-out"
if ($Execute) {
    Write-Output "[OK] Migration complete."
    Write-Output ""
    Write-Output "Post-migration recommendations:"
    Write-Output "  1. Update CLAUDE.md line ~34 to drop the 'violates state-outside-repo' caveat for cognee"
    Write-Output "     (sibling-stream commit; not auto-edited)."
    Write-Output "  2. Verify cognee writes are landing under $DestDir\data\ after next MCP call."
    Write-Output "  3. After 7+ days of stable operation, the backup zip can be deleted:"
    Write-Output "       Remove-Item '$backupZip'"
    Write-Output ""
    Write-Output "Rollback (if needed):"
    Write-Output "  Stop-Service $ServiceName"
    Write-Output "  Move-Item '$DestDir' '$SourceDir'"
    Write-Output "  & '$nssm' set $ServiceName AppEnvironmentExtra <pre-migration values, see logs>"
    Write-Output "  Start-Service $ServiceName"
} else {
    Write-Output "[DRY-RUN COMPLETE] No changes were made."
    Write-Output ""
    Write-Output "To commit this migration, re-run with -Execute:"
    Write-Output "  .\tools\migrate-cognee-state.ps1 -Execute"
}

exit 0
