#requires -Version 5
<#
.SYNOPSIS
  Wave 150 Fire 2 — Operator-prep state-outside-repo directory for Docker mounts

.DESCRIPTION
  Per CLAUDE.local.md ENV (f) state-outside-repo discipline + Docker compose
  bind-mounts in docker-compose.yml. Creates:
    - Z:/claude-sota-installed-state/.cli-proxy-api/auths/  (OAuth tokens)
    - Z:/claude-sota-installed-state/.cli-proxy-api/config-docker.yaml (container-internal auth-dir)
    - Z:/claude-sota-installed-state/logs/services/eee-cli-proxy-api/ (container logs)

  Copies existing OAuth JSONs from current location (Z:/claude-sota-installed/.cli-proxy-api/)
  into the auths/ subdir. Adapts config.yaml to set auth-dir for container-internal path.

.NOTES
  IDEMPOTENT — safe to run multiple times; only creates if missing
  CR-9 install-risk: LOW — pure mkdir + file copy + sed-style replace; reversible
#>

param([switch]$DryRun)

$ErrorActionPreference = 'Stop'

$srcCpaDir = 'Z:\claude-sota-installed\.cli-proxy-api'
$stateDir = 'Z:\claude-sota-installed-state\.cli-proxy-api'
$stateAuths = Join-Path $stateDir 'auths'
$dockerConfig = Join-Path $stateDir 'config-docker.yaml'
$logsDir = 'Z:\claude-sota-installed-state\logs\services\eee-cli-proxy-api'

Write-Host "Wave 150 Fire 2 — State directory prep" -ForegroundColor Cyan
Write-Host ""

# Step 1 — Create state directories
foreach ($d in @($stateDir, $stateAuths, $logsDir)) {
    if (-not (Test-Path $d)) {
        Write-Host "[create] $d"
        if (-not $DryRun) {
            New-Item -ItemType Directory -Path $d -Force | Out-Null
        }
    } else {
        Write-Host "[exists] $d"
    }
}

# Step 2 — Copy OAuth + provider JSONs (claude-*.json + antigravity-*.json + gemini-*.json + codex-*.json)
Write-Host ""
Write-Host "Copying OAuth + provider JSONs to $stateAuths..."
$patterns = @('claude-*.json', 'antigravity-*.json', 'gemini-*.json', 'codex-*.json')
$copied = 0
foreach ($pat in $patterns) {
    $files = Get-ChildItem -Path $srcCpaDir -Filter $pat -ErrorAction SilentlyContinue
    foreach ($f in $files) {
        $dest = Join-Path $stateAuths $f.Name
        if ((Test-Path $dest) -and (Get-Item $dest).LastWriteTime -ge $f.LastWriteTime) {
            Write-Host "  [skip-newer] $($f.Name)"
        } else {
            if (-not $DryRun) {
                Copy-Item -Path $f.FullName -Destination $dest -Force
            }
            Write-Host "  [copy] $($f.Name)"
            $copied++
        }
    }
}
Write-Host "  Total copied: $copied"

# Step 3 — Generate config-docker.yaml with container-internal auth-dir
Write-Host ""
Write-Host "Generating $dockerConfig (container-internal auth-dir)..."
$srcConfig = Join-Path $srcCpaDir 'config.yaml'
if (-not (Test-Path $srcConfig)) {
    Write-Host "  [FAIL] Source config not found: $srcConfig" -ForegroundColor Red
    exit 1
}

$configBody = Get-Content -Path $srcConfig -Raw

# Replace auth-dir host path with container-internal path
# Match: auth-dir: "Z:/claude-sota-installed/.cli-proxy-api"
# Replace: auth-dir: "/root/.cli-proxy-api"
$configBody = $configBody -replace 'auth-dir:\s*"[^"]*"', 'auth-dir: "/root/.cli-proxy-api"'

# Also rewrite log path to container-internal /CLIProxyAPI/logs (if any cite to host path)
# (CPA logs are written to ./logs/main.log relative to cwd which is /CLIProxyAPI in container — should work)

# Prepend Docker-aware header
$dockerHeader = @"
# Wave 150 Fire 2 — Docker-aware config variant (auto-generated from config.yaml)
# Differences from host-runtime config.yaml:
#   - auth-dir rewritten to container-internal /root/.cli-proxy-api
# Source: Z:/claude-sota-installed/.cli-proxy-api/config.yaml
# Generated: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss zzz')
# Cite: Z:/claude-sota-installed/.local/cpa-fix-services/prep-state-dir.ps1
# DO NOT EDIT MANUALLY — regenerate via prep-state-dir.ps1

"@
$finalConfig = $dockerHeader + $configBody

if (-not $DryRun) {
    Set-Content -Path $dockerConfig -Value $finalConfig -Encoding UTF8
}
Write-Host "  [write] $dockerConfig"

# Step 4 — Verify result
Write-Host ""
Write-Host "Verification:"
Write-Host "  Auth JSONs at $stateAuths`:"
Get-ChildItem -Path $stateAuths -Filter '*.json' -ErrorAction SilentlyContinue | ForEach-Object {
    Write-Host "    $($_.Name) ($($_.Length) bytes)"
}
Write-Host ""
Write-Host "  config-docker.yaml auth-dir line:"
(Get-Content $dockerConfig -ErrorAction SilentlyContinue | Select-String 'auth-dir').Line | ForEach-Object {
    Write-Host "    $_"
}

Write-Host ""
Write-Host "[DONE] State-dir prep complete. Ready for cutover-nssm-to-docker.ps1" -ForegroundColor Green
