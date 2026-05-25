# W338 CPA-router SOTA-patch apply script.
#
# Strategy: clone upstream into a SEPARATE worktree (NOT Z:/repos/deps/),
# apply patches, build, smoke-test, swap NSSM service binary.
#
# Run from this directory: pwsh -File ./apply.ps1
# Prerequisite: Go 1.22+ in PATH, git, NSSM (for service swap), upstream commit pinned.

$ErrorActionPreference = 'Stop'

$ROOT      = 'Z:\claude-sota-installed-state\cpa-w338-fork'
$UPSTREAM  = 'https://github.com/router-for-me/CLIProxyAPI.git'
$PINNED    = 'HEAD'                          # set to a specific SHA before shipping
$PATCH_DIR = $PSScriptRoot

Write-Host '=== W338 CPA-router patch apply ==='
Write-Host "patch_dir = $PATCH_DIR"
Write-Host "fork_dir  = $ROOT"

# 1) Clone if missing.
if (-not (Test-Path $ROOT)) {
    Write-Host '[1/7] Cloning upstream...'
    git clone $UPSTREAM $ROOT
} else {
    Write-Host '[1/7] Fork dir exists. Fetching latest.'
    Push-Location $ROOT
    git fetch origin --tags
    git checkout main
    git reset --hard origin/main
    Pop-Location
}

# 2) Apply P0 patches.
Push-Location $ROOT
Write-Host '[2/7] Applying patch 1 (529 case)...'
git apply --check "$PATCH_DIR\patch-1-add-529-case.diff"
git apply        "$PATCH_DIR\patch-1-add-529-case.diff"

Write-Host '[3/7] Applying patch 2 (full-jitter)...'
git apply --check "$PATCH_DIR\patch-2-full-jitter.diff"
git apply        "$PATCH_DIR\patch-2-full-jitter.diff"

# 3) Copy P1 new files.
Write-Host '[4/7] Installing breaker.go + aimd_limiter.go...'
Copy-Item "$PATCH_DIR\breaker.go"      "$ROOT\sdk\cliproxy\auth\breaker.go"      -Force
Copy-Item "$PATCH_DIR\aimd_limiter.go" "$ROOT\sdk\cliproxy\auth\aimd_limiter.go" -Force

# 4) Apply selector-integration.diff. NOTE: this patch has placeholder hunks —
#    operator review required before this step is automated.
Write-Host '[5/7] selector-integration.diff requires MANUAL operator review.'
Write-Host '       Inspect:'
Write-Host "         $PATCH_DIR\selector-integration.diff"
Write-Host '       Apply manually with:  git apply selector-integration.diff'
Write-Host '       Skipping auto-apply for safety.'

# 5) Tests + build.
Write-Host '[6/7] Running go test ./...'
go test ./sdk/cliproxy/auth/...
if ($LASTEXITCODE -ne 0) {
    Write-Host '[FAIL] Unit tests failed. Aborting.'
    Pop-Location
    exit 1
}

Write-Host '[6b/7] Building binary...'
go build -o cpa-w338.exe ./cmd/server
if ($LASTEXITCODE -ne 0) {
    Write-Host '[FAIL] Build failed.'
    Pop-Location
    exit 1
}

# 6) Smoke (operator-driven — proxy needs a config file).
Write-Host '[7/7] Build successful. Binary at:'
Write-Host "       $ROOT\cpa-w338.exe"
Write-Host ''
Write-Host 'Next steps (manual):'
Write-Host '  a) Stop existing CPA NSSM service (nssm stop <service-name>)'
Write-Host '  b) Backup current binary'
Write-Host '  c) Replace with cpa-w338.exe'
Write-Host '  d) Start service'
Write-Host '  e) Tail logs; watch for "upstream overloaded" cooldown messages'
Write-Host '  f) Run 4-stream subagent stress test'
Write-Host '  g) Compare 60m ok/fail ratio against pre-patch baseline'

Pop-Location
Write-Host 'Done.'
