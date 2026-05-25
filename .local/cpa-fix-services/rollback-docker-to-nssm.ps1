#requires -Version 5
<#
.SYNOPSIS
  Wave 150 Fire 2 — Rollback Docker → NSSM (emergency or planned)

.DESCRIPTION
  Reverses cutover-nssm-to-docker.ps1. Used when Docker cutover regresses OR
  during scheduled rollback test. Per launch-discipline.md §1 Reversible:
  <60s rollback path.

  Sequence:
    1. docker compose down (stop + remove containers; volumes preserved)
    2. Start-Service EEE-CLIProxyAPI EEE-CacheFixProxy (restore NSSM)
    3. Smoke-probe both endpoints back on NSSM path

.NOTES
  Cite: Z:/claude-sota-installed/.local/cpa-fix-services/docker-compose.yml
  Risk class: LOW — pure rollback to known-good state
#>

param([switch]$DryRun)

$ErrorActionPreference = 'Stop'
$composeDir = 'Z:\claude-sota-installed\.local\cpa-fix-services'
$composeFile = Join-Path $composeDir 'docker-compose.yml'

Write-Host "===================================================================" -ForegroundColor Yellow
Write-Host " Wave 150 Fire 2 ROLLBACK — Docker → NSSM"  -ForegroundColor Yellow
Write-Host "===================================================================" -ForegroundColor Yellow
Write-Host ""

# Verify NSSM services still registered (rollback target exists)
foreach ($svc in @('EEE-CLIProxyAPI', 'EEE-CacheFixProxy')) {
    $s = Get-Service -Name $svc -ErrorAction SilentlyContinue
    if (-not $s) {
        Write-Host "[FAIL] NSSM service $svc not registered. Cannot rollback automatically." -ForegroundColor Red
        Write-Host "  If Phase 3 deregistration was completed, re-register via nssm install (see migration plan §Rollback-after-Phase-3)" -ForegroundColor Yellow
        exit 1
    }
    Write-Host "[OK] NSSM service $svc registered (state=$($s.Status))"
}

Write-Host ""
Write-Host "[Step 1] docker compose down (stop + remove containers)..."
if (-not $DryRun) {
    Push-Location $composeDir
    try {
        docker compose down
        if ($LASTEXITCODE -ne 0) {
            Write-Host "  [WARN] docker compose down exit=$LASTEXITCODE — containers may be partial-stopped" -ForegroundColor Yellow
        } else {
            Write-Host "  [OK] Docker containers stopped + removed"
        }
    } finally {
        Pop-Location
    }
} else {
    Write-Host "  [DRY-RUN] would: docker compose down"
}

Start-Sleep -Seconds 2

Write-Host ""
Write-Host "[Step 2] Start NSSM services..."
foreach ($svc in @('EEE-CLIProxyAPI', 'EEE-CacheFixProxy')) {
    if (-not $DryRun) {
        Start-Service -Name $svc -ErrorAction Continue
        $s = Get-Service -Name $svc
        Write-Host "  $svc -> $($s.Status)"
    } else {
        Write-Host "  [DRY-RUN] would: Start-Service $svc"
    }
}

Start-Sleep -Seconds 5

Write-Host ""
Write-Host "[Step 3] Smoke-probe NSSM-served endpoints..."
function Test-EndpointHealth {
    param([string]$Name, [string]$Url)
    try {
        $r = Invoke-WebRequest -Uri $Url -TimeoutSec 4 -UseBasicParsing -ErrorAction Stop
        return ($r.StatusCode -eq 200)
    } catch { return $false }
}

$cpaOK = Test-EndpointHealth -Name 'CPA' -Url 'http://127.0.0.1:18317/healthz'
$cacheOK = Test-EndpointHealth -Name 'cache-fix' -Url 'http://127.0.0.1:19801/health'
Write-Host "  CPA :18317/healthz -> $cpaOK"
Write-Host "  cache-fix :19801/health -> $cacheOK"

if ($cpaOK -and $cacheOK) {
    Write-Host ""
    Write-Host "===================================================================" -ForegroundColor Green
    Write-Host " ROLLBACK COMPLETE — both endpoints responding via NSSM" -ForegroundColor Green
    Write-Host "===================================================================" -ForegroundColor Green
} else {
    Write-Host ""
    Write-Host "[WARN] One or both endpoints not responding after rollback" -ForegroundColor Red
    Write-Host "  Diagnose: Get-Service EEE-* | Format-List Name,Status,StartType,DisplayName" -ForegroundColor Yellow
    Write-Host "  Logs: tail -30 Z:/claude-sota-installed-state/logs/services/eee-cliproxyapi.stdout.log" -ForegroundColor Yellow
    exit 1
}
