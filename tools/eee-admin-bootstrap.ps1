#Requires -Version 7.0
# TODO W344: validate Set-StrictMode -Version Latest in runtime test before adding
# eee-admin-bootstrap.ps1 — one-shot SOTA-native install bootstrap for claude-sota-installed (eee)
#
# RUN AS: Administrator PowerShell (right-click → "Run as administrator")
# Elevation REQUIRED for sterile child-process env inheritance during Anthropic CC native install
# + plugin marketplace clone (avoids inheriting stale CLAUDE_PLUGIN_ROOT / ECC_PLUGIN_ROOT from
# user-level processes per FM-22 stale-gate-vs-current-tree class — Wave 52 closure).
#
# ============================================================================
# Reference (TIER-1 SOTA):
# - https://claude.ai/install.ps1 [VERIFIED 2026-05-07] — Anthropic-canonical PowerShell installer entry
# - https://code.claude.com/docs/en/setup [VERIFIED 2026-05-07] — Windows native install authority
# - https://code.claude.com/docs/en/plugins-reference#L666-L694 [VERIFIED 2026-05-07] — `claude plugin install` non-interactive form
# - https://code.claude.com/docs/en/plugin-marketplaces#L222-L223 [VERIFIED 2026-05-07] — cache mutation forbidden
#
# Reference (TIER-1 TIER-1 ALT-IMPL — multi-org convergence per convergence-gate.md ≥3-orgs):
# - https://github.com/anthropics/claude-plugins-official @ HEAD edb2c52c95ee6bec8a6cbc316f4e7d1c075a8f27 [VERIFIED 2026-05-07]
# - https://github.com/affaan-m/everything-claude-code @ HEAD 841beea45cb25ba51f29fa45b7e272938d19b80a [VERIFIED 2026-05-07 via Wave 59 Agent θ codex-rescue REAL GPT-5.5 BRIDGE-MODE APPROVE conf=0.92]
# - https://github.com/openai/codex-plugin-cc [VERIFIED 2026-05-07 via Z:/claude-sota-installed/.claude/settings.json:184-188 extraKnownMarketplaces]
#
# Reference (TIER-3 local provenance):
# - Wave 53 commit `dc1af7d` (Anthropic-official PowerShell installer + GPG/Authenticode/SHA256 + sterile pre-OAuth env-scrub)
# - Wave 55 Agent α-retry plan tmp/wave55-agent-alpha-retry-eee-tier0-install-best-practice-2026-05-07.md APPROVE-PLAN conf=0.89
# - Wave 59 Agent θ ARTIFACT-INLINE tmp/wave59-agent-theta-ecc-native-install-2026-05-07.md APPROVE conf=0.92

[CmdletBinding()]
param(
    [switch]$SkipInstall,        # skip Anthropic CC install (already installed) — verify only
    [switch]$DryRun,             # print what would run without executing
    [string]$ClaudeVersion = '2.1.132'  # follows Anthropic CHANGELOG latest; settings.json minimumVersion is the floor (Wave 62 SOTA-cadence convergence)
)

$ErrorActionPreference = 'Stop'
$rootDir = 'Z:\claude-sota-installed'

Write-Host "============================================================" -ForegroundColor Cyan
Write-Host "[eee-admin-bootstrap] SOTA-native install bootstrap" -ForegroundColor Cyan
Write-Host "[eee-admin-bootstrap] Target: $rootDir" -ForegroundColor Cyan
Write-Host "[eee-admin-bootstrap] Anthropic CC version: $ClaudeVersion" -ForegroundColor Cyan
Write-Host "============================================================" -ForegroundColor Cyan
Write-Host ""

# ============================================================================
# (a) Admin elevation check
# ============================================================================
$identity = [Security.Principal.WindowsIdentity]::GetCurrent()
$principal = [Security.Principal.WindowsPrincipal]::new($identity)
$isAdmin = $principal.IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)

if (-not $isAdmin) {
    Write-Host "[FAIL] This script REQUIRES administrator elevation." -ForegroundColor Red
    Write-Host "       Right-click PowerShell → 'Run as administrator', then re-run:" -ForegroundColor Red
    Write-Host "       $rootDir\tools\eee-admin-bootstrap.ps1" -ForegroundColor Yellow
    exit 1
}
Write-Host "[OK] Admin elevation verified" -ForegroundColor Green

# ============================================================================
# (b) Sterile env scrub — prevent FM-22 stale-gate-vs-current-tree contamination
# Per Z:/claude-sota/.claude/rules/fm22-stale-gate-vs-current-tree.md (Wave 52 closure)
# ============================================================================
Write-Host ""
Write-Host "[eee-admin-bootstrap] Scrubbing inherited plugin-root env vars..." -ForegroundColor Cyan
foreach ($var in @('CLAUDE_PLUGIN_ROOT', 'ECC_PLUGIN_ROOT', 'CLAUDE_CODE_PLUGIN_SEED_DIR')) {
    if (Test-Path "Env:\$var") {
        Write-Host "  Removing inherited Env:\$var = $((Get-Item Env:\$var).Value)" -ForegroundColor Yellow
        Remove-Item "Env:\$var" -ErrorAction SilentlyContinue
    }
}
Write-Host "[OK] Env scrub complete" -ForegroundColor Green

# ============================================================================
# (c) Set USERPROFILE redirect BEFORE installer runs
# Per CCBP claude-settings.md:880 @ 64fffd53 USERPROFILE drives CC's lookup
# ============================================================================
$env:USERPROFILE = $rootDir
$env:HOME        = $rootDir
$env:HOMEDRIVE   = 'Z:'
$env:HOMEPATH    = '\claude-sota-installed'
Write-Host "[OK] USERPROFILE redirected to $rootDir" -ForegroundColor Green

# ============================================================================
# (d) Native Anthropic CC install (if missing)
# Per https://claude.ai/install.ps1 (canonical Anthropic PowerShell installer)
# ============================================================================
$nativeBin = Join-Path $rootDir '.local\bin\claude.exe'

if ((Test-Path $nativeBin) -and -not $SkipInstall) {
    $ver = & $nativeBin --version 2>$null
    Write-Host ""
    Write-Host "[OK] Native Anthropic CC already installed at $nativeBin (version: $ver)" -ForegroundColor Green
} elseif ($SkipInstall) {
    Write-Host ""
    Write-Host "[SKIP] -SkipInstall set — bypassing Anthropic CC installer" -ForegroundColor Yellow
} else {
    Write-Host ""
    Write-Host "[eee-admin-bootstrap] Native CC not found at $nativeBin" -ForegroundColor Yellow
    Write-Host "[eee-admin-bootstrap] Running Anthropic-canonical PowerShell installer..." -ForegroundColor Cyan
    Write-Host "  Source: https://claude.ai/install.ps1" -ForegroundColor Cyan
    Write-Host "  Pinned version: $ClaudeVersion" -ForegroundColor Cyan
    Write-Host ""

    if ($DryRun) {
        Write-Host "[DRY-RUN] Would run: & ([scriptblock]::Create((irm https://claude.ai/install.ps1))) $ClaudeVersion" -ForegroundColor Yellow
    } else {
        # Anthropic-canonical install incantation per https://code.claude.com/docs/en/setup
        & ([scriptblock]::Create((Invoke-RestMethod 'https://claude.ai/install.ps1'))) $ClaudeVersion

        if (-not (Test-Path $nativeBin)) {
            Write-Host "[FAIL] Installer ran but $nativeBin still missing." -ForegroundColor Red
            Write-Host "       Check installer output above for errors. USERPROFILE was: $env:USERPROFILE" -ForegroundColor Red
            exit 2
        }
        Write-Host "[OK] Anthropic CC installed at $nativeBin" -ForegroundColor Green
    }
}

# ============================================================================
# (e) Pre-create state-outside-repo directories (avoid first-launch silent-hang)
# Per Wave 50 Fire 41 ~4min mkdir hang on Z: drive — eee.ps1 does this lazily
# ============================================================================
Write-Host ""
Write-Host "[eee-admin-bootstrap] Pre-creating state directories..." -ForegroundColor Cyan
$stateDirs = @(
    'Z:\claude-sota-installed-state\.claude\projects',
    'Z:\claude-sota-installed-state\.codex',
    'Z:\claude-sota-installed\tmp',
    'Z:\claude-sota-installed\.claude\debug'
)
foreach ($dir in $stateDirs) {
    if (-not (Test-Path $dir)) {
        if ($DryRun) {
            Write-Host "  [DRY-RUN] Would create: $dir" -ForegroundColor Yellow
        } else {
            New-Item -ItemType Directory -Force -Path $dir | Out-Null
            Write-Host "  Created: $dir" -ForegroundColor Green
        }
    } else {
        Write-Host "  Exists: $dir" -ForegroundColor Gray
    }
}

# ============================================================================
# (f) Verification — invoke eee.ps1 hard-gate preflight in EEE_BOOTSTRAP=1 mode
# This will report what's still missing (3 plugin caches expected on first launch)
# ============================================================================
Write-Host ""
Write-Host "[eee-admin-bootstrap] Running eee.ps1 hard-gate verification (BOOTSTRAP mode)..." -ForegroundColor Cyan
Write-Host ""
$env:EEE_BOOTSTRAP = '1'

if ($DryRun) {
    Write-Host "[DRY-RUN] Would run: $rootDir\tools\eee.ps1 --version" -ForegroundColor Yellow
} else {
    & "$rootDir\tools\eee.ps1" --version 2>&1 | Tee-Object -Variable eeeOutput
    if ($LASTEXITCODE -ne 0 -and $LASTEXITCODE -ne 1) {
        Write-Host ""
        Write-Host "[WARN] eee.ps1 returned exit code $LASTEXITCODE — check hard-gate output above" -ForegroundColor Yellow
    }
}

Remove-Item Env:\EEE_BOOTSTRAP -ErrorAction SilentlyContinue

# ============================================================================
# (g) Next-step playbook for the user
# ============================================================================
Write-Host ""
Write-Host "============================================================" -ForegroundColor Cyan
Write-Host "[eee-admin-bootstrap] BOOTSTRAP COMPLETE — next steps:" -ForegroundColor Cyan
Write-Host "============================================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "1. Launch eee for first OAuth handshake + plugin auto-install:" -ForegroundColor White
Write-Host "   cd $rootDir" -ForegroundColor Yellow
Write-Host "   .\tools\eee.ps1" -ForegroundColor Yellow
Write-Host ""
Write-Host "2. Inside CC session, verify plugins enabled (settings.json:172-176 lists 3):" -ForegroundColor White
Write-Host "   /plugin list" -ForegroundColor Yellow
Write-Host ""
Write-Host "3. If any plugin missing, install explicitly:" -ForegroundColor White
Write-Host "   /plugin install superpowers@claude-plugins-official" -ForegroundColor Yellow
Write-Host "   /plugin install codex@openai-codex" -ForegroundColor Yellow
Write-Host "   /plugin install everything-claude-code@everything-claude-code" -ForegroundColor Yellow
Write-Host ""
Write-Host "4. Authenticate codex CLI (cardinal-rule-3 cross-model T1-T7 substrate):" -ForegroundColor White
Write-Host "   codex login" -ForegroundColor Yellow
Write-Host ""
Write-Host "5. Re-run hard-gate verification (no EEE_BOOTSTRAP override):" -ForegroundColor White
Write-Host "   .\tools\eee.ps1 --version" -ForegroundColor Yellow
Write-Host "   # Expected: '[eee] HARD-GATE PASS' in green" -ForegroundColor Gray
Write-Host ""
Write-Host "============================================================" -ForegroundColor Cyan
Write-Host ""
