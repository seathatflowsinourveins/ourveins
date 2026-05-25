#Requires -Version 7.0
<#
.SYNOPSIS
  Migrate Claude Desktop MCP config from plaintext secrets to env-var inheritance.
.DESCRIPTION
  1. Verifies claude_desktop_config.json has env-omitted shape (refuses if plaintext present)
  2. Prompts for new (rotated) GITHUB_PERSONAL_ACCESS_TOKEN + PERPLEXITY_API_KEY (SecureString)
  3. Stores in Windows User-scope env vars (persistent, no plaintext on disk)
  4. Prints relaunch instructions
.NOTES
  Cite: design at tmp/desktop-config-patch-design-2026-05-15.md
        primary source Z:/repos/deps/cc-switch/src-tauri/src/claude_desktop_config.rs @ HEAD
  Rollback: Copy-Item $env:APPDATA\Claude\claude_desktop_config.backup.2026-05-15.json `
            $env:APPDATA\Claude\claude_desktop_config.json -Force
#>
[CmdletBinding()]
param()

$ErrorActionPreference = 'Stop'
$cfgPath = Join-Path $env:APPDATA 'Claude\claude_desktop_config.json'
$bakPath = Join-Path $env:APPDATA 'Claude\claude_desktop_config.backup.2026-05-15.json'

if (-not (Test-Path $cfgPath)) { throw "Config not found at $cfgPath" }
if (-not (Test-Path $bakPath)) { throw "Backup not found at $bakPath - refusing to proceed without rollback path" }

# (1) Verify config has env-omitted shape - FAIL CLOSED if plaintext keys still present
$cfg = Get-Content $cfgPath -Raw | ConvertFrom-Json -Depth 32
$gh  = $cfg.mcpServers.github
$pp  = $cfg.mcpServers.perplexity
$hasGhEnv = ($gh.PSObject.Properties.Name -contains 'env') -and ($gh.env.PSObject.Properties.Name -contains 'GITHUB_PERSONAL_ACCESS_TOKEN') -and (-not [string]::IsNullOrWhiteSpace($gh.env.GITHUB_PERSONAL_ACCESS_TOKEN))
$hasPpEnv = ($pp.PSObject.Properties.Name -contains 'env') -and ($pp.env.PSObject.Properties.Name -contains 'PERPLEXITY_API_KEY')           -and (-not [string]::IsNullOrWhiteSpace($pp.env.PERPLEXITY_API_KEY))
if ($hasGhEnv -or $hasPpEnv) {
  Write-Error "REFUSING: claude_desktop_config.json still contains plaintext env values. Apply env-omitted patch FIRST (orchestrator step), then re-run this script. Plaintext detected: github=$hasGhEnv perplexity=$hasPpEnv"
  exit 2
}
Write-Host "[OK] Config shape verified: env blocks omitted from github + perplexity MCP entries." -ForegroundColor Green

# (2) Prompt for new (rotated) keys via SecureString - NEVER echoed
Write-Host ""
Write-Host "Paste the NEW (just-rotated) tokens below. Input is hidden." -ForegroundColor Cyan
$ghSecure = Read-Host "  New GITHUB_PERSONAL_ACCESS_TOKEN" -AsSecureString
$ppSecure = Read-Host "  New PERPLEXITY_API_KEY"           -AsSecureString
$ghPlain = ConvertFrom-SecureString -SecureString $ghSecure -AsPlainText
$ppPlain = ConvertFrom-SecureString -SecureString $ppSecure -AsPlainText
if ([string]::IsNullOrWhiteSpace($ghPlain) -or [string]::IsNullOrWhiteSpace($ppPlain)) {
  throw "Empty token entered - aborting (no env vars set)."
}

# (3) Store in Windows User-scope env vars (registry-persistent, no plaintext on disk)
[Environment]::SetEnvironmentVariable('GITHUB_PERSONAL_ACCESS_TOKEN', $ghPlain, 'User')
[Environment]::SetEnvironmentVariable('PERPLEXITY_API_KEY',           $ppPlain, 'User')
Write-Host "[OK] Stored in Windows User env vars (HKCU\Environment)." -ForegroundColor Green

# Clear plaintext from script memory
$ghPlain = $null; $ppPlain = $null; [GC]::Collect()

# (4) Reload instructions - Claude Desktop must be FULLY QUIT for new env to propagate
Write-Host ""
Write-Host "=== NEXT STEPS ===" -ForegroundColor Yellow
Write-Host "1. Right-click the Claude Desktop tray icon (system tray, bottom-right) -> Quit"
Write-Host "   (Just closing the window is NOT enough; the launcher process must exit.)"
Write-Host "2. Wait 5s for process to fully terminate."
Write-Host "3. Relaunch Claude Desktop from Start Menu."
Write-Host "4. MCP servers will spawn with the new env vars inherited from this user session."
Write-Host "5. Smoke-test: ask Claude to 'list my recent github repos' + 'search perplexity for X'."
Write-Host ""
Write-Host "=== ROLLBACK (if anything breaks) ===" -ForegroundColor Yellow
Write-Host "Copy-Item `"$bakPath`" `"$cfgPath`" -Force"
Write-Host "[Environment]::SetEnvironmentVariable('GITHUB_PERSONAL_ACCESS_TOKEN', `$null, 'User')"
Write-Host "[Environment]::SetEnvironmentVariable('PERPLEXITY_API_KEY',           `$null, 'User')"
