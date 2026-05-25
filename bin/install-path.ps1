#!/usr/bin/env pwsh
# install-path.ps1 — self-diagnosing PATH installer for `eee` launcher
# Reference (TIER-1):
#   https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_environment_variables?view=powershell-7.6
#   §"Create persistent environment variables in Windows" §"Set environment variables with SetEnvironmentVariable()"
#   [VERIFIED 2026-05-06 via WebFetch]
# Reference (TIER-1): https://code.claude.com/docs/en/setup (Windows native install supports cmd entrypoints)
# Cite-only adapted from (TIER-2 sibling): Z:/claude-sota/bin/sss.cmd shim pattern
#
# Wave 50 Fire 40 — operator install procedure for PATH discoverability.
# Per cardinal-rule-12 META-process: install-class operations must be reproducible
# via scripts; per cardinal-rule-7 ERROR -> REPORT -> RESOLVE: this script reports
# state, applies fix if needed, and tells operator the next step (shell restart).
#
# Usage (run ONCE from any PowerShell):
#   pwsh -NoProfile -ExecutionPolicy Bypass -File Z:\claude-sota-installed\bin\install-path.ps1
#
# Or directly if already on PATH:
#   .\install-path.ps1

$ErrorActionPreference = 'Stop'

$installedBin = 'Z:\claude-sota-installed\bin'
$shimPath     = Join-Path $installedBin 'eee.cmd'

Write-Host ''
Write-Host '=== eee launcher PATH installer ===' -ForegroundColor Cyan
Write-Host ''

# Probe 1 — shim file presence
Write-Host '[1/4] Checking eee.cmd shim presence...'
if (-not (Test-Path $shimPath)) {
    Write-Host "  FAIL: $shimPath does NOT exist" -ForegroundColor Red
    Write-Host '  Cause: shim file missing from Z:/claude-sota-installed/bin/'
    Write-Host '  Action: pull the runtime via git or re-run install per docs/install-provenance.md'
    exit 1
}
$shim = Get-Item $shimPath
Write-Host "  OK: $($shim.FullName) ($($shim.Length) bytes, modified $($shim.LastWriteTime))" -ForegroundColor Green

# Probe 2 — User-scope Path state (registry-persistent)
Write-Host ''
Write-Host '[2/4] Checking User-scope Path (registry)...'
$userPath = [Environment]::GetEnvironmentVariable('Path', 'User')
$userPathEntries = $userPath -split ';' | Where-Object { $_ -ne '' }
if ($userPathEntries -contains $installedBin) {
    Write-Host "  OK: '$installedBin' is present in User-scope Path" -ForegroundColor Green
    $userPathNeedsAdd = $false
} else {
    Write-Host "  ABSENT: '$installedBin' NOT in User-scope Path" -ForegroundColor Yellow
    $userPathNeedsAdd = $true
}

# Probe 3 — Process-scope Path state (current session)
Write-Host ''
Write-Host '[3/4] Checking Process-scope Path (current session)...'
$processPathEntries = $env:Path -split ';' | Where-Object { $_ -ne '' }
if ($processPathEntries -contains $installedBin) {
    Write-Host "  OK: '$installedBin' is present in current session Path" -ForegroundColor Green
    $processSeesIt = $true
} else {
    Write-Host "  ABSENT: '$installedBin' NOT in current session Path" -ForegroundColor Yellow
    Write-Host '  (This is normal in older shells started before User Path was last updated)'
    $processSeesIt = $false
}

# Action — apply User-scope add if needed
Write-Host ''
Write-Host '[4/4] Applying install action...'
if ($userPathNeedsAdd) {
    $newUserPath = "$installedBin;$userPath"
    [Environment]::SetEnvironmentVariable('Path', $newUserPath, 'User')
    Write-Host "  APPLIED: prepended '$installedBin' to User-scope Path (registry-persistent)" -ForegroundColor Green
} else {
    Write-Host '  NO-OP: User-scope Path already has the entry' -ForegroundColor Green
}

# Pre-create state-outside-repo dirs to prevent first-run silent-hang.
# Without this, eee.ps1 block (h) state-dir bootstrap on first launch creates
# 4 dirs via New-Item -Force and CAN take minutes on slow Z: network drive
# (operational evidence Wave 50 Fire 41 — operator hit ~4min silent-hang at
# Z:/claude-sota-installed-state/.claude/projects mkdir 2026-05-06 23:33).
# Doing it here at install-time with progress output eliminates the silent surface.
Write-Host ''
Write-Host '[5/6] Pre-creating state-outside-repo dirs (eliminates first-eee silent-hang)...'
$stateDirs = @(
    'Z:/claude-sota-installed-state/.claude/projects',
    'Z:/claude-sota-installed-state/.codex',
    'Z:/claude-sota-installed/tmp',
    'Z:/claude-sota-installed/.claude/debug'
)
foreach ($dir in $stateDirs) {
    if (Test-Path $dir) {
        Write-Host "  EXISTS: $dir" -ForegroundColor Green
    } else {
        Write-Host "  CREATING: $dir ..." -ForegroundColor Yellow -NoNewline
        $start = Get-Date
        New-Item -ItemType Directory -Force -Path $dir | Out-Null
        $elapsed = [int]((Get-Date) - $start).TotalMilliseconds
        Write-Host " done (${elapsed}ms)" -ForegroundColor Green
    }
}

# Probe 6 — codex Z-shadow C: orphan defense (W154 F2 2026-05-11)
# Per V2+V3 PARALLEL Path P REAL GPT-5.5 convergence consensus
# V2 NEEDS-REVISION conf=0.90 (designer; recommended Option C broad Z precedence)
# V3 ADVERSARIAL F2-SCOPED-DOWN conf=0.90 (SAVED-SHIP 3 V2 overclaims caught: targeted-NOT-broad / partial-NOT-non-blocking gate / rg-already-Z)
# Cite: .claude/state/codex_consult_w154_f2_path_fix_v{2,3}_OUT.txt
# CR-5/6 install-priority: F1 installed codex at Z:/claude-sota-installed/.local/npm but PATH precedence kept C: install winning
# Discipline: TARGETED insert (Z .local\npm BEFORE C Roaming npm) — NOT broad Z precedence (would shadow unrelated C: tools)
# Risk class MEDIUM per V3 a4_cr9_install_risk_class — User PATH mutation persistent
Write-Host ''
Write-Host '[6/6] Codex Z-shadow C: orphan defense (TARGETED insert before C Roaming npm)...'
$zNpmDir = 'Z:\claude-sota-installed\.local\npm'
$cNpmDir = Join-Path ([Environment]::GetFolderPath('UserProfile')) 'AppData\Roaming\npm'

if (Test-Path (Join-Path $zNpmDir 'codex.cmd')) {
    # Refresh User-scope PATH after Probe 4 mutation
    $userPath = [Environment]::GetEnvironmentVariable('Path', 'User')
    $entries = @($userPath -split ';' | Where-Object { $_ -ne '' })
    $zIdx = -1
    $cIdx = -1
    for ($i = 0; $i -lt $entries.Count; $i++) {
        if ($entries[$i] -ieq $zNpmDir) { $zIdx = $i }
        if ($entries[$i] -ieq $cNpmDir) { $cIdx = $i }
    }
    $needsFix = ($zIdx -lt 0) -or ($cIdx -ge 0 -and $zIdx -gt $cIdx)

    if (-not $needsFix) {
        Write-Host "  OK: '$zNpmDir' present and ordered before C Roaming npm" -ForegroundColor Green
    } else {
        if ($zIdx -lt 0) {
            Write-Host "  ABSENT: '$zNpmDir' NOT in User-scope Path" -ForegroundColor Yellow
        } else {
            Write-Host "  WRONG-ORDER: '$zNpmDir' present but AFTER '$cNpmDir' (C: wins precedence)" -ForegroundColor Yellow
        }
        # Save rollback BEFORE mutation (V3 underclaim #1 — rollback discipline)
        $rollbackPath = 'Z:\claude-sota-installed\tmp\install-path-rollback-userpath.txt'
        New-Item -ItemType Directory -Force -Path (Split-Path $rollbackPath) | Out-Null
        Set-Content -LiteralPath $rollbackPath -Value $userPath
        Write-Host "  ROLLBACK saved to $rollbackPath" -ForegroundColor Cyan
        Write-Host "    Restore via: [Environment]::SetEnvironmentVariable('Path', (Get-Content -Raw '$rollbackPath').TrimEnd(`"``r``n`"), 'User')" -ForegroundColor Cyan
        # De-duplicate Z entry (V3 underclaim #1), then TARGETED insert before C entry
        $cleaned = @($entries | Where-Object { $_ -ine $zNpmDir })
        $newEntries = New-Object System.Collections.ArrayList
        $inserted = $false
        foreach ($e in $cleaned) {
            if ((-not $inserted) -and ($e -ieq $cNpmDir)) {
                [void]$newEntries.Add($zNpmDir)
                $inserted = $true
            }
            [void]$newEntries.Add($e)
        }
        if (-not $inserted) {
            # No C: npm in PATH; prepend at head
            [void]$newEntries.Insert(0, $zNpmDir)
        }
        $newUserPath = ($newEntries -join ';')
        [Environment]::SetEnvironmentVariable('Path', $newUserPath, 'User')
        Write-Host "  APPLIED: TARGETED insert '$zNpmDir' before '$cNpmDir' in User-scope Path" -ForegroundColor Green
        # V3 underclaim #3 — fresh-shell/process-staleness explicit disclosure
        Write-Host "  DISCLOSE: current session 'where.exe codex' STILL resolves to C: (User PATH read at process start)" -ForegroundColor Yellow
        Write-Host "            Fresh-shell required to verify: where.exe codex => $zNpmDir\codex.cmd" -ForegroundColor Yellow
    }
} else {
    Write-Host "  SKIP: '$zNpmDir\codex.cmd' not present (Z codex install missing — see docs/sota-installed-manifest.md)" -ForegroundColor Yellow
}

# Verdict — tell operator what to do next
Write-Host ''
Write-Host '=== Next steps ===' -ForegroundColor Cyan
if ($processSeesIt) {
    Write-Host '  This session can already resolve eee. Try:' -ForegroundColor Green
    Write-Host '    eee'
    Write-Host ''
} else {
    Write-Host '  This session has STALE Path. Pick ONE of these to launch eee:' -ForegroundColor Yellow
    Write-Host ''
    Write-Host '  Option A (current session, immediate):'
    Write-Host '    $env:Path = "Z:\claude-sota-installed\bin;$env:Path"'
    Write-Host '    eee'
    Write-Host ''
    Write-Host '  Option B (clean fresh shell — recommended):'
    Write-Host '    1. Close ALL PowerShell + Windows Terminal windows'
    Write-Host '    2. Re-open from Start Menu / Explorer (not from a parent shell)'
    Write-Host '    3. Run: eee'
    Write-Host ''
    Write-Host '  (Windows reads User-scope Path at process start; existing shells inherit a snapshot.)'
}
Write-Host ''
exit 0
