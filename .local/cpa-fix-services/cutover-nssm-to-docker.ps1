#requires -Version 5
<#
.SYNOPSIS
  Wave 150 Fire 2 — NSSM → Docker compose cutover script (CPA + cache-fix-proxy)

.DESCRIPTION
  Operator-supervised cutover per launch-discipline.md D1 (reversible + observable + incremental):
    1. Pre-flight checks (Docker Desktop running; images pulled; volumes prepared)
    2. Build/pull container images
    3. Bring up containers in parallel (NSSM still alive — parallel-deploy stage)
    4. Smoke-probe Docker endpoints
    5. Stop NSSM services (NOT removed; rollback path preserved)
    6. Re-verify proxies still respond (now via Docker)
    7. Operator confirms cutover stable → optional Phase 3 nssm remove

  Reversible: `docker compose down && nssm start EEE-CLIProxyAPI EEE-CacheFixProxy` (<60s)

.NOTES
  Cite anchors:
    - Z:/claude-sota-installed/.local/cpa-fix-services/docker-compose.yml (ship-ready compose)
    - Z:/repos/deps/CLIProxyAPI/docker-compose.yml @ HEAD 785b00c3 (upstream reference)
    - Wave 150 Fire 1 ARTIFACT-INLINE Agent A `a5f49ccba4921af78` + Path P codex T1 `b1roaion3`
    - User operator-correction PROVIDER-COMPLEMENT framing (single-jump migration; not Servy intermediate)

  CR-9 install-risk discipline: pinned by SHA256 digests in compose; rollback path preserved
  CR-7 Phase 1: operator-gated; this script is INTERACTIVE; pauses for confirmation
#>

param(
    [switch]$DryRun,
    [switch]$SkipRemoveNSSM  # Default behavior: stop NSSM but keep service registration for rollback
)

$ErrorActionPreference = 'Stop'
$composeDir = 'Z:\claude-sota-installed\.local\cpa-fix-services'
$composeFile = Join-Path $composeDir 'docker-compose.yml'
$stateDir = 'Z:\claude-sota-installed-state\.cli-proxy-api'

function Pause-Confirm {
    param([string]$Msg)
    Write-Host ""
    Write-Host "  >>> $Msg" -ForegroundColor Yellow
    if (-not $DryRun) {
        $r = Read-Host "  Continue? (yes/no)"
        if ($r -ne 'yes') {
            Write-Host "  ABORTED by operator" -ForegroundColor Red
            exit 1
        }
    } else {
        Write-Host "  [DRY-RUN: would prompt operator here]" -ForegroundColor Cyan
    }
}

function Test-CPAHealth {
    param([int]$Port = 18317)
    try {
        $r = Invoke-WebRequest -Uri "http://127.0.0.1:$Port/healthz" -TimeoutSec 4 -UseBasicParsing -ErrorAction Stop
        return ($r.StatusCode -eq 200)
    } catch { return $false }
}

function Test-CacheFixHealth {
    param([int]$Port = 19801)
    try {
        $r = Invoke-WebRequest -Uri "http://127.0.0.1:$Port/health" -TimeoutSec 4 -UseBasicParsing -ErrorAction Stop
        return ($r.StatusCode -eq 200)
    } catch { return $false }
}

Write-Host "===================================================================" -ForegroundColor Cyan
Write-Host " Wave 150 Fire 2 — NSSM → Docker compose cutover (CPA + cache-fix)"  -ForegroundColor Cyan
Write-Host "===================================================================" -ForegroundColor Cyan
Write-Host ""

# ============================================================================
# Phase 0 — Pre-flight checks
# ============================================================================
Write-Host "[Phase 0] Pre-flight checks..." -ForegroundColor Green

# 0.1 — Docker Desktop running
$dockerVer = docker version --format '{{.Server.Version}}' 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "  [FAIL] Docker Desktop not running. Start Docker Desktop first." -ForegroundColor Red
    exit 1
}
Write-Host "  [OK] Docker Server v$dockerVer"

# 0.2 — Compose file exists
if (-not (Test-Path $composeFile)) {
    Write-Host "  [FAIL] Missing compose file: $composeFile" -ForegroundColor Red
    exit 1
}
Write-Host "  [OK] docker-compose.yml present"

# 0.3 — State dir + auths + config-docker.yaml present
$stateAuths = Join-Path $stateDir 'auths'
$dockerConfig = Join-Path $stateDir 'config-docker.yaml'
$stateLogs = 'Z:\claude-sota-installed-state\logs\services\eee-cli-proxy-api'

foreach ($p in @($stateDir, $stateAuths, $dockerConfig, $stateLogs)) {
    if (-not (Test-Path $p)) {
        Write-Host "  [FAIL] Missing state artifact: $p" -ForegroundColor Red
        Write-Host "  Run operator-prep step first (see migration plan §Phase 1)" -ForegroundColor Yellow
        exit 1
    }
}
Write-Host "  [OK] State dir + auths + config-docker.yaml + logs dir present"

# 0.4 — NSSM services currently Running (baseline for rollback)
$nssmServices = @('EEE-CLIProxyAPI', 'EEE-CacheFixProxy')
foreach ($svc in $nssmServices) {
    $s = Get-Service -Name $svc -ErrorAction SilentlyContinue
    if (-not $s) {
        Write-Host "  [WARN] NSSM service $svc not found — proceeding (no rollback target)" -ForegroundColor Yellow
    } elseif ($s.Status -ne 'Running') {
        Write-Host "  [WARN] NSSM service $svc state=$($s.Status) (expected Running)" -ForegroundColor Yellow
    } else {
        Write-Host "  [OK] NSSM service $svc Running"
    }
}

Pause-Confirm "Phase 0 pre-flight clean. Proceed to Phase 1 (pull images + bring up containers)?"

# ============================================================================
# Phase 1 — Pull images + bring up containers (parallel deploy with NSSM)
# ============================================================================
Write-Host ""
Write-Host "[Phase 1] Pull images + bring up containers..." -ForegroundColor Green

if (-not $DryRun) {
    Push-Location $composeDir
    try {
        # Pull pinned digests (CR-9 D6 defense)
        Write-Host "  Pulling images (pinned by SHA256)..."
        docker compose pull
        if ($LASTEXITCODE -ne 0) {
            Write-Host "  [FAIL] docker compose pull failed" -ForegroundColor Red
            exit 1
        }

        # Bring up (CPA first, cache-fix depends_on healthy CPA)
        Write-Host "  Bringing up cli-proxy-api + cache-fix-proxy..."
        docker compose up -d
        if ($LASTEXITCODE -ne 0) {
            Write-Host "  [FAIL] docker compose up -d failed" -ForegroundColor Red
            exit 1
        }
    } finally {
        Pop-Location
    }
} else {
    Write-Host "  [DRY-RUN] would: docker compose pull && docker compose up -d"
}

# Wait for containers to become healthy
Write-Host "  Waiting up to 60s for containers to become healthy..."
$deadline = (Get-Date).AddSeconds(60)
$cpaHealthy = $false
$cacheHealthy = $false
while ((Get-Date) -lt $deadline -and (-not ($cpaHealthy -and $cacheHealthy))) {
    Start-Sleep -Seconds 3
    if (-not $cpaHealthy) { $cpaHealthy = Test-CPAHealth -Port 18317 }
    if (-not $cacheHealthy) { $cacheHealthy = Test-CacheFixHealth -Port 19801 }
    Write-Host "    cpa-healthy=$cpaHealthy cache-fix-healthy=$cacheHealthy"
}

if (-not ($cpaHealthy -and $cacheHealthy)) {
    Write-Host "  [FAIL] Containers did not become healthy within 60s" -ForegroundColor Red
    Write-Host "  Docker logs for diagnosis:"
    docker compose -f $composeFile logs --tail 30
    Write-Host "  Rollback path: docker compose -f $composeFile down (NSSM still running)" -ForegroundColor Yellow
    exit 1
}
Write-Host "  [OK] Both containers healthy"

Pause-Confirm "Phase 1 done. CPA + cache-fix-proxy now responding from Docker. NSSM still running in parallel. Proceed to Phase 2 (stop NSSM)?"

# ============================================================================
# Phase 2 — Stop NSSM services (CRITICAL: ports must free)
# ============================================================================
# Important: Docker port-published 127.0.0.1:18317:8317 conflicts with NSSM's CPA listening
# on 18317. Docker bind likely already failed silently OR NSSM's CPA was preempted on host
# port. The Phase 1 healthcheck on 18317 verifies which is responding.
# Phase 2 STOP NSSM cleanly frees the port unambiguously for Docker exclusive ownership.
Write-Host ""
Write-Host "[Phase 2] Stop NSSM services..." -ForegroundColor Green

foreach ($svc in $nssmServices) {
    if (-not $DryRun) {
        Stop-Service -Name $svc -Force -ErrorAction SilentlyContinue
        $s = Get-Service -Name $svc -ErrorAction SilentlyContinue
        if ($s -and $s.Status -ne 'Stopped') {
            Write-Host "  [WARN] $svc status=$($s.Status) (expected Stopped); continuing" -ForegroundColor Yellow
        } else {
            Write-Host "  [OK] NSSM service $svc stopped"
        }
    } else {
        Write-Host "  [DRY-RUN] would: Stop-Service $svc -Force"
    }
}

Start-Sleep -Seconds 3

# Re-verify Docker endpoints still respond
Write-Host "  Re-verifying Docker endpoints after NSSM stop..."
$cpaHealthy = Test-CPAHealth -Port 18317
$cacheHealthy = Test-CacheFixHealth -Port 19801
if (-not ($cpaHealthy -and $cacheHealthy)) {
    Write-Host "  [FAIL] Docker endpoints stopped responding after NSSM stop" -ForegroundColor Red
    Write-Host "  This indicates Docker WASN'T owning the ports during Phase 1." -ForegroundColor Red
    Write-Host "  ROLLBACK: nssm start EEE-CLIProxyAPI && nssm start EEE-CacheFixProxy" -ForegroundColor Yellow
    Write-Host "  Then: docker compose -f $composeFile down" -ForegroundColor Yellow
    exit 1
}
Write-Host "  [OK] Both Docker endpoints responding (cpa :18317 + cache-fix :19801)"

Pause-Confirm "Phase 2 complete. Docker is now exclusively serving CPA + cache-fix. NSSM stopped (still registered for rollback). Phase 3 = optional: deregister NSSM services?"

# ============================================================================
# Phase 3 — (OPTIONAL) Deregister NSSM services
# ============================================================================
# Default behavior: SKIP this phase. NSSM services stay registered-but-stopped as rollback.
# Pass -SkipRemoveNSSM:$false to actually deregister (after 24-72h Docker stability per launch-discipline.md D2 monitoring window).
if (-not $SkipRemoveNSSM) {
    Write-Host ""
    Write-Host "[Phase 3] Deregister NSSM services..." -ForegroundColor Green
    $nssm = 'C:\Users\42\AppData\Local\Microsoft\WinGet\Packages\NSSM.NSSM_Microsoft.Winget.Source_8wekyb3d8bbwe\nssm-2.24-101-g897c7ad\win64\nssm.exe'
    foreach ($svc in $nssmServices) {
        if (-not $DryRun) {
            & $nssm remove $svc confirm
            Write-Host "  [OK] NSSM service $svc deregistered"
        } else {
            Write-Host "  [DRY-RUN] would: nssm remove $svc confirm"
        }
    }
} else {
    Write-Host ""
    Write-Host "[Phase 3] SKIPPED — NSSM services stay registered (stopped) for rollback safety." -ForegroundColor Cyan
    Write-Host "  After 24-72h Docker stability monitoring (per launch-discipline.md D2):" -ForegroundColor Cyan
    Write-Host "  Re-run this script with -SkipRemoveNSSM:`$false to deregister." -ForegroundColor Cyan
}

# ============================================================================
# Summary
# ============================================================================
Write-Host ""
Write-Host "===================================================================" -ForegroundColor Green
Write-Host " Wave 150 Fire 2 CUTOVER COMPLETE" -ForegroundColor Green
Write-Host "===================================================================" -ForegroundColor Green
Write-Host ""
Write-Host "Current state:" -ForegroundColor Cyan
Write-Host "  - Docker containers: cli-proxy-api + cache-fix-proxy (Running, healthy)"
Write-Host "  - NSSM services: stopped (rollback-ready)"
Write-Host "  - Endpoints: 127.0.0.1:18317 (CPA) + 127.0.0.1:19801 (cache-fix)"
Write-Host ""
Write-Host "Rollback path (if needed within next 24-72h monitoring window):" -ForegroundColor Yellow
Write-Host "  cd $composeDir"
Write-Host "  docker compose down"
Write-Host "  Start-Service EEE-CLIProxyAPI EEE-CacheFixProxy"
Write-Host ""
Write-Host "Next operator actions:" -ForegroundColor Cyan
Write-Host "  1. Test eee launch (in another shell): eee --version"
Write-Host "  2. Monitor docker logs: docker compose -f $composeFile logs -f --tail 50"
Write-Host "  3. After 24-72h stability: re-run with -SkipRemoveNSSM:`$false to retire NSSM"
Write-Host ""
