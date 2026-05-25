#requires -Version 7.0
<#
.SYNOPSIS
    Fresh-clone bootstrap installer for claude-sota-installed.

.DESCRIPTION
    Phased, idempotent installer that turns a bare git clone into a working
    runtime on a fresh host. Each phase writes a stamp file under
    $InstallRoot/.bootstrap/state/<phase>.done. Re-running with the same args
    skips completed phases unless -Force is set.

    Phases:
      1. PREFLIGHT      verify PS7+, git, network, drive free, admin (if NSSM)
      2. DEPS           winget install pinned deps (git, gh, nodejs, python, uv, docker, nssm)
      3. VENV           uv venv at $VenvRoot + requirements.txt install
      4. CLONE+PATCH    substitute Z: -> $TargetDrive in settings.json/.mcp.json;
                        generate CLAUDE.local.md from template
      5. PLUGINS        claude plugin install per manifest/plugins.json
      6. MCP-SERVICES   NSSM CogneeMCP + Langfuse docker compose
      7. CODEX-AUTH     interactive codex auth pause
      8. GH-AUTH        interactive gh auth login pause
      9. VERIFY         probe every layer; emit INSTALL-RECORD.json

.PARAMETER TargetDrive
    Drive letter (with colon) where runtime + state + tools + venv live.
    Default: Z: (operator invariant per CLAUDE.local.md).

.PARAMETER InstallRoot
    Override $TargetDrive\claude-sota-installed. Useful for sibling installs.

.PARAMETER StateRoot
    Override $TargetDrive\claude-sota-installed-state. Houses CODEX_HOME +
    session JSONL + Cognee data dirs.

.PARAMETER ToolsRoot
    Override $TargetDrive\tools. Hosts llama-swap, nodejs portable, nssm.

.PARAMETER VenvRoot
    Override $TargetDrive\venvs\claude. Python 3.13 venv.

.PARAMETER InstallProfile
    full    everything (default)
    minimal CC + 1 MCP, no services
    ci      stub services for CI pipelines

.PARAMETER DryRun
    Print planned actions, do not execute.

.PARAMETER SkipServices
    Skip NSSM + Docker phase (CC-only install).

.PARAMETER SkipPlugins
    Skip claude plugin install loop.

.PARAMETER Force
    Re-run every phase even if stamp file exists.

.EXAMPLE
    .\install.ps1
    Default Z: full install.

.EXAMPLE
    .\install.ps1 -TargetDrive D: -InstallProfile minimal -DryRun
    Plan a minimal D: install without executing.

.NOTES
    Wave: W338 Stream C (per W333.5 Stream 5 §2 design)
    Cardinal rules: R1 (CR-1 trust-tuple via manifest/deps.lock.json) ·
                    R2 (no project-owned hooks; this is a manual bootstrap, NOT a hook) ·
                    R5 (sandbox via permissions, not custom guards) ·
                    R6 (verify-before-claim; INSTALL-RECORD.json captures probe results)

    Cite anchors:
      PS7 $ErrorActionPreference: https://learn.microsoft.com/powershell/module/microsoft.powershell.core/about/about_preference_variables
      winget pinning:             https://learn.microsoft.com/windows/package-manager/winget/install
      NSSM 2.24:                  https://nssm.cc/release/nssm-2.24.zip
      uv:                         https://docs.astral.sh/uv/getting-started/installation/
      CC plugin install:          https://code.claude.com/docs/en/plugins
#>
[Diagnostics.CodeAnalysis.SuppressMessageAttribute('PSAvoidUsingWriteHost', '',
    Justification = 'Interactive installer — colored Write-Host is the user-facing contract.')]
[Diagnostics.CodeAnalysis.SuppressMessageAttribute('PSReviewUnusedParameter', '',
    Justification = 'Param contract is the documented public surface.')]
[CmdletBinding()]
param(
    [ValidatePattern('^[A-Za-z]:$')]
    [string]$TargetDrive = 'Z:',

    [string]$InstallRoot,
    [string]$StateRoot,
    [string]$ToolsRoot,
    [string]$VenvRoot,

    [ValidateSet('full', 'minimal', 'ci')]
    [string]$InstallProfile = 'full',

    [switch]$DryRun,
    [switch]$SkipServices,
    [switch]$SkipPlugins,
    [switch]$Force
)

$ErrorActionPreference = 'Stop'
Set-StrictMode -Version Latest

# ---------------------------------------------------------------------------
# Path resolution — single source of truth for substitution
# ---------------------------------------------------------------------------
if (-not $InstallRoot) { $InstallRoot = "${TargetDrive}\claude-sota-installed" }
if (-not $StateRoot)   { $StateRoot   = "${TargetDrive}\claude-sota-installed-state" }
if (-not $ToolsRoot)   { $ToolsRoot   = "${TargetDrive}\tools" }
if (-not $VenvRoot)    { $VenvRoot    = "${TargetDrive}\venvs\claude" }

$BootstrapDir = Join-Path $InstallRoot '.bootstrap'
$StampDir     = Join-Path $BootstrapDir 'state'
$RecordFile   = Join-Path $BootstrapDir 'INSTALL-RECORD.json'
$LogFile      = Join-Path $BootstrapDir "install-$(Get-Date -Format 'yyyyMMdd-HHmmss').log"

# ---------------------------------------------------------------------------
# Logging helpers — colored prefixes, tee to log file when available
# ---------------------------------------------------------------------------
function Write-Phase {
    param([string]$Phase, [string]$Msg)
    $line = "[$(Get-Date -Format 'HH:mm:ss')] [$Phase] $Msg"
    Write-Host $line -ForegroundColor Cyan
    if (Test-Path (Split-Path $LogFile -Parent)) { Add-Content -Path $LogFile -Value $line }
}

function Write-Info {
    param([string]$Msg)
    Write-Host "  $Msg" -ForegroundColor Gray
    if (Test-Path (Split-Path $LogFile -Parent)) { Add-Content -Path $LogFile -Value "  $Msg" }
}

function Write-Ok {
    param([string]$Msg)
    Write-Host "  OK  $Msg" -ForegroundColor Green
    if (Test-Path (Split-Path $LogFile -Parent)) { Add-Content -Path $LogFile -Value "  OK  $Msg" }
}

function Write-Warn2 {
    param([string]$Msg)
    Write-Host "  WARN $Msg" -ForegroundColor Yellow
    if (Test-Path (Split-Path $LogFile -Parent)) { Add-Content -Path $LogFile -Value "  WARN $Msg" }
}

function Invoke-Action {
    param([string]$Description, [scriptblock]$Action)
    Write-Info $Description
    if ($DryRun) {
        Write-Warn2 "DRY-RUN — skipped"
        return
    }
    & $Action
}

function Test-StampValid {
    param([string]$PhaseName)
    if ($Force) { return $false }
    $stamp = Join-Path $StampDir "$PhaseName.done"
    return (Test-Path $stamp)
}

function Write-Stamp {
    param([string]$PhaseName, [hashtable]$Payload)
    if ($DryRun) { return }
    if (-not (Test-Path $StampDir)) { New-Item -ItemType Directory -Path $StampDir -Force | Out-Null }
    $stamp = Join-Path $StampDir "$PhaseName.done"
    $body = @{
        phase     = $PhaseName
        timestamp = (Get-Date -Format 'o')
        payload   = $Payload
    } | ConvertTo-Json -Depth 6
    Set-Content -Path $stamp -Value $body -Encoding UTF8
}

# ---------------------------------------------------------------------------
# PHASE 1 — PREFLIGHT
# ---------------------------------------------------------------------------
function Invoke-Preflight {
    Write-Phase 'PREFLIGHT' "Verifying host prerequisites"

    if ($PSVersionTable.PSVersion.Major -lt 7) {
        throw "PowerShell 7+ required; got $($PSVersionTable.PSVersion)"
    }
    Write-Ok "PowerShell $($PSVersionTable.PSVersion)"

    $driveLetter = $TargetDrive.TrimEnd(':')
    $drive = Get-PSDrive -Name $driveLetter -ErrorAction SilentlyContinue
    if (-not $drive) {
        throw "Target drive $TargetDrive not mapped. Mount it before bootstrap."
    }
    $freeGb = [math]::Round($drive.Free / 1GB, 2)
    if ($freeGb -lt 10) {
        throw "Target drive $TargetDrive has $freeGb GB free; need >=10 GB."
    }
    Write-Ok "Drive $TargetDrive free=${freeGb}GB"

    $gitVer = (& git --version 2>$null)
    if (-not $gitVer) { throw "git not on PATH; install git first." }
    Write-Ok "git: $gitVer"

    try {
        $netProbe = 'github.com'
        $null = Test-Connection -ComputerName $netProbe -Count 1 -Quiet -TimeoutSeconds 5
        Write-Ok "Network: $netProbe reachable"
    }
    catch {
        Write-Warn2 "Network probe failed; will retry per-phase"
    }

    if (-not $SkipServices) {
        $isAdmin = ([Security.Principal.WindowsPrincipal][Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole(
            [Security.Principal.WindowsBuiltInRole]::Administrator)
        if (-not $isAdmin) {
            Write-Warn2 "NOT running as Administrator — NSSM service install will require -SkipServices or elevation"
        }
        else {
            Write-Ok "Administrator: yes"
        }
    }

    Write-Stamp 'preflight' @{
        ps_version  = "$($PSVersionTable.PSVersion)"
        target_drive = $TargetDrive
        free_gb     = $freeGb
        git_version = $gitVer
    }
}

# ---------------------------------------------------------------------------
# PHASE 2 — DEPS (winget pinned)
# ---------------------------------------------------------------------------
function Invoke-DepsPhase {
    Write-Phase 'DEPS' "Installing pinned dependencies via winget"

    if (-not (Get-Command winget -ErrorAction SilentlyContinue)) {
        throw "winget not found. Install App Installer from Microsoft Store first."
    }

    # CR-1 trust-tuple pinned set; sourced from manifest/deps.lock.json (TBD)
    $deps = @(
        @{ id = 'Git.Git';                version = '2.49.0'  },
        @{ id = 'GitHub.cli';             version = '2.62.0'  },
        @{ id = 'OpenJS.NodeJS.LTS';      version = '22.22.0' },
        @{ id = 'Python.Python.3.13';     version = '3.13.0'  },
        @{ id = 'astral-sh.uv';           version = '0.5.16'  }
    )

    if (-not $SkipServices) {
        $deps += @{ id = 'Docker.DockerDesktop'; version = $null }
        # NSSM via direct download (not in winget); see Install-Nssm
    }

    foreach ($dep in $deps) {
        $id = $dep.id
        $ver = $dep.version
        $action = if ($ver) {
            "winget install $id (pinned $ver)"
        } else {
            "winget install $id (latest acceptable)"
        }
        Invoke-Action $action {
            $wingetArgs = @('install', '--id', $id, '--silent', '--accept-package-agreements', '--accept-source-agreements')
            if ($ver) { $wingetArgs += @('--version', $ver) }
            $proc = Start-Process -FilePath 'winget' -ArgumentList $wingetArgs -Wait -PassThru -NoNewWindow
            if ($proc.ExitCode -ne 0 -and $proc.ExitCode -ne -1978335189) {
                # -1978335189 = APPINSTALLER_CLI_ERROR_INSTALL_PACKAGE_ALREADY_INSTALLED
                Write-Warn2 "winget exit code $($proc.ExitCode) for $id (may be already installed; continuing)"
            }
        }
    }

    if (-not $SkipServices) {
        Install-Nssm
    }

    Write-Stamp 'deps' @{ count = $deps.Count; profile = $InstallProfile }
}

function Install-Nssm {
    $nssmTarget = Join-Path $ToolsRoot 'nssm\nssm.exe'
    if (Test-Path $nssmTarget) {
        Write-Ok "NSSM already at $nssmTarget"
        return
    }
    Invoke-Action "Download NSSM 2.24 to $nssmTarget" {
        $dir = Split-Path $nssmTarget -Parent
        if (-not (Test-Path $dir)) { New-Item -ItemType Directory -Path $dir -Force | Out-Null }
        $zip = Join-Path $env:TEMP 'nssm-2.24.zip'
        Invoke-WebRequest -Uri 'https://nssm.cc/release/nssm-2.24.zip' -OutFile $zip
        Expand-Archive -Path $zip -DestinationPath (Join-Path $env:TEMP 'nssm-2.24-x') -Force
        $candidate = Get-ChildItem -Path (Join-Path $env:TEMP 'nssm-2.24-x') -Recurse -Filter 'nssm.exe' |
            Where-Object { $_.FullName -like '*win64*' } | Select-Object -First 1
        if (-not $candidate) { throw "NSSM extract: nssm.exe not found in archive" }
        Copy-Item -Path $candidate.FullName -Destination $nssmTarget -Force
    }
}

# ---------------------------------------------------------------------------
# PHASE 3 — VENV
# ---------------------------------------------------------------------------
function Invoke-Venv {
    Write-Phase 'VENV' "Creating Python 3.13 venv at $VenvRoot"

    if (-not (Get-Command uv -ErrorAction SilentlyContinue)) {
        throw "uv not on PATH after DEPS phase; check winget install astral-sh.uv"
    }

    Invoke-Action "uv venv $VenvRoot --python 3.13" {
        $parent = Split-Path $VenvRoot -Parent
        if (-not (Test-Path $parent)) { New-Item -ItemType Directory -Path $parent -Force | Out-Null }
        if (-not (Test-Path $VenvRoot)) {
            & uv venv $VenvRoot --python 3.13
        }
        else {
            Write-Ok "venv already exists at $VenvRoot"
        }
    }

    $req = Join-Path $InstallRoot 'requirements.txt'
    if (Test-Path $req) {
        Invoke-Action "uv pip install -r requirements.txt" {
            $python = Join-Path $VenvRoot 'Scripts\python.exe'
            & uv pip install --python $python -r $req
        }
    }
    else {
        Write-Warn2 "requirements.txt not found at $req (skipping pip install)"
    }

    Write-Stamp 'venv' @{ root = $VenvRoot; python = '3.13' }
}

# ---------------------------------------------------------------------------
# PHASE 4 — CLONE + PATCH (substitute Z: -> $TargetDrive)
# ---------------------------------------------------------------------------
function Invoke-ClonePatch {
    Write-Phase 'CLONE+PATCH' "Substituting Z: -> $TargetDrive in tracked configs"

    if (-not (Test-Path $InstallRoot)) {
        throw "InstallRoot $InstallRoot does not exist. Did you forget to `git clone` first?"
    }

    $patchTargets = @(
        Join-Path $InstallRoot '.claude\settings.json'
        Join-Path $InstallRoot '.mcp.json'
    )

    foreach ($target in $patchTargets) {
        if (-not (Test-Path $target)) {
            Write-Warn2 "Patch target $target missing — skipping"
            continue
        }
        if ($TargetDrive -eq 'Z:') {
            Write-Ok "TargetDrive=Z: — no substitution needed for $target"
            continue
        }
        Invoke-Action "Substitute Z: -> $TargetDrive in $target" {
            $content = Get-Content -Path $target -Raw -Encoding UTF8
            $patched = $content -replace '(?i)Z:/', "$TargetDrive/" `
                                -replace '(?i)Z:\\', ("$TargetDrive" + '\')
            if ($content -ne $patched) {
                Copy-Item -Path $target -Destination "$target.bak.$(Get-Date -Format 'yyyyMMddHHmmss')" -Force
                Set-Content -Path $target -Value $patched -Encoding UTF8 -NoNewline
            }
        }
    }

    # CLAUDE.local.md from template
    $localMd = Join-Path $InstallRoot 'CLAUDE.local.md'
    $template = Join-Path $InstallRoot 'bootstrap\template\CLAUDE.local.md.template'
    if ((-not (Test-Path $localMd)) -and (Test-Path $template)) {
        Invoke-Action "Generate CLAUDE.local.md from template" {
            $tpl = Get-Content -Path $template -Raw -Encoding UTF8
            $rendered = $tpl `
                -replace '\$\{TARGET_DRIVE\}', $TargetDrive `
                -replace '\$\{INSTALL_ROOT\}', $InstallRoot `
                -replace '\$\{STATE_ROOT\}',   $StateRoot `
                -replace '\$\{TOOLS_ROOT\}',   $ToolsRoot `
                -replace '\$\{VENV_ROOT\}',    $VenvRoot
            Set-Content -Path $localMd -Value $rendered -Encoding UTF8
        }
    }
    elseif (Test-Path $localMd) {
        Write-Ok "CLAUDE.local.md already present — operator-curated; leaving alone"
    }
    else {
        Write-Warn2 "No template at $template; manual CLAUDE.local.md required (see ONBOARDING.md)"
    }

    # State dirs
    foreach ($dir in @($StateRoot, "$StateRoot\.codex", "$StateRoot\.claude\projects", "$StateRoot\cognee")) {
        if (-not (Test-Path $dir)) {
            Invoke-Action "Create state dir $dir" {
                New-Item -ItemType Directory -Path $dir -Force | Out-Null
            }
        }
    }

    Write-Stamp 'clone-patch' @{ patched = $patchTargets.Count }
}

# ---------------------------------------------------------------------------
# PHASE 5 — PLUGINS (claude plugin install loop)
# ---------------------------------------------------------------------------
function Invoke-PluginsPhase {
    if ($SkipPlugins) {
        Write-Phase 'PLUGINS' "Skipped (-SkipPlugins)"
        return
    }
    Write-Phase 'PLUGINS' "Installing Claude Code plugins per manifest"

    $manifest = Join-Path $InstallRoot 'bootstrap\manifest\plugins.json'
    if (-not (Test-Path $manifest)) {
        Write-Warn2 "No manifest at $manifest — skipping plugins phase (run /plugin install manually)"
        return
    }

    if (-not (Get-Command claude -ErrorAction SilentlyContinue)) {
        Write-Warn2 "claude CLI not on PATH — install via npm i -g @anthropic-ai/claude-code"
        return
    }

    $plugins = Get-Content -Path $manifest -Raw -Encoding UTF8 | ConvertFrom-Json
    $count = 0
    foreach ($p in $plugins) {
        $spec = "$($p.marketplace):$($p.plugin)"
        Invoke-Action "claude plugin install $spec" {
            $proc = Start-Process -FilePath 'claude' -ArgumentList @('plugin', 'install', $spec) `
                -Wait -PassThru -NoNewWindow
            if ($proc.ExitCode -ne 0) {
                Write-Warn2 "claude plugin install $spec exit=$($proc.ExitCode) (continuing)"
            }
            else {
                $count++
            }
        }
    }

    Write-Stamp 'plugins' @{ requested = $plugins.Count; installed = $count }
}

# ---------------------------------------------------------------------------
# PHASE 6 — MCP SERVICES (NSSM CogneeMCP + Langfuse docker)
# ---------------------------------------------------------------------------
function Invoke-McpServicesPhase {
    if ($SkipServices) {
        Write-Phase 'MCP-SERVICES' "Skipped (-SkipServices)"
        return
    }
    Write-Phase 'MCP-SERVICES' "Wiring NSSM CogneeMCP + Langfuse docker stack"

    $nssm = Join-Path $ToolsRoot 'nssm\nssm.exe'
    if (-not (Test-Path $nssm)) {
        Write-Warn2 "NSSM not found at $nssm — skipping service install"
    }
    else {
        Invoke-Action "NSSM install CogneeMCP" {
            $existing = & $nssm status CogneeMCP 2>$null
            if ($existing) {
                Write-Ok "CogneeMCP NSSM service already registered (status=$existing)"
            }
            else {
                $python = Join-Path $VenvRoot 'Scripts\python.exe'
                $entry  = Join-Path $InstallRoot 'tools\insights-wireup\cognee-mcp-server.py'
                if (-not (Test-Path $entry)) {
                    Write-Warn2 "Cognee MCP entrypoint missing at $entry — skipping NSSM register"
                }
                else {
                    & $nssm install CogneeMCP $python $entry
                    & $nssm set CogneeMCP AppDirectory $StateRoot
                    & $nssm set CogneeMCP Start SERVICE_AUTO_START
                    & $nssm start CogneeMCP
                }
            }
        }
    }

    # Langfuse docker stack
    $composeFile = Join-Path $InstallRoot 'observability\docker-compose.yml'
    if ((-not (Test-Path $composeFile)) -or ($InstallProfile -eq 'ci')) {
        Write-Warn2 "docker-compose.yml absent or profile=ci — Langfuse skipped"
    }
    else {
        if (-not (Get-Command docker -ErrorAction SilentlyContinue)) {
            Write-Warn2 "docker not on PATH — start Docker Desktop and re-run -Force phase"
        }
        else {
            Invoke-Action "docker compose up -d (Langfuse stack)" {
                Push-Location (Split-Path $composeFile -Parent)
                try {
                    & docker compose -f $composeFile up -d
                }
                finally {
                    Pop-Location
                }
            }
        }
    }

    Write-Stamp 'mcp-services' @{ profile = $InstallProfile; skip = $false }
}

# ---------------------------------------------------------------------------
# PHASE 7 — CODEX AUTH (interactive)
# ---------------------------------------------------------------------------
function Invoke-CodexAuth {
    Write-Phase 'CODEX-AUTH' "Interactive codex CLI auth (browser flow)"

    if (-not (Get-Command codex -ErrorAction SilentlyContinue)) {
        Write-Warn2 "codex CLI not on PATH (npm i -g @openai/codex or claude plugin install codex@openai-codex)"
        return
    }

    if ($DryRun) {
        Write-Warn2 "DRY-RUN — would prompt operator: codex auth"
        return
    }

    Write-Info "Press ENTER to launch `codex auth` (or Ctrl-C to skip)."
    $null = Read-Host
    & codex auth

    Write-Stamp 'codex-auth' @{ prompted = $true }
}

# ---------------------------------------------------------------------------
# PHASE 8 — GH AUTH (interactive)
# ---------------------------------------------------------------------------
function Invoke-GhAuth {
    Write-Phase 'GH-AUTH' "Interactive gh CLI auth"

    if (-not (Get-Command gh -ErrorAction SilentlyContinue)) {
        Write-Warn2 "gh CLI not on PATH — winget install GitHub.cli first"
        return
    }

    $null = & gh auth status 2>&1
    if ($LASTEXITCODE -eq 0) {
        Write-Ok "gh already authenticated"
        Write-Stamp 'gh-auth' @{ skipped = $true; reason = 'already authed' }
        return
    }

    if ($DryRun) {
        Write-Warn2 "DRY-RUN — would prompt operator: gh auth login"
        return
    }

    Write-Info "Press ENTER to launch `gh auth login` (or Ctrl-C to skip)."
    $null = Read-Host
    & gh auth login

    Write-Stamp 'gh-auth' @{ prompted = $true }
}

# ---------------------------------------------------------------------------
# PHASE 9 — VERIFY (probe each layer; write INSTALL-RECORD.json)
# ---------------------------------------------------------------------------
function Invoke-Verify {
    Write-Phase 'VERIFY' "Probing each layer; writing INSTALL-RECORD.json"

    $record = [ordered]@{
        timestamp     = (Get-Date -Format 'o')
        target_drive  = $TargetDrive
        install_root  = $InstallRoot
        state_root    = $StateRoot
        tools_root    = $ToolsRoot
        venv_root     = $VenvRoot
        profile       = $InstallProfile
        os            = "$([System.Environment]::OSVersion)"
        ps_version    = "$($PSVersionTable.PSVersion)"
        probes        = [ordered]@{}
    }

    # Drive probe
    $drive = Get-PSDrive -Name ($TargetDrive.TrimEnd(':')) -ErrorAction SilentlyContinue
    $record.probes['drive']        = if ($drive) { 'OK' } else { 'FAIL: not mapped' }

    # Venv probe
    $python = Join-Path $VenvRoot 'Scripts\python.exe'
    $record.probes['venv_python']  = if (Test-Path $python) { (& $python --version 2>&1) -as [string] } else { 'FAIL: missing' }

    # claude CLI probe
    if (Get-Command claude -ErrorAction SilentlyContinue) {
        $record.probes['claude_cli'] = (& claude --version 2>&1) -as [string]
    }
    else {
        $record.probes['claude_cli'] = 'FAIL: not on PATH'
    }

    # codex CLI probe
    if (Get-Command codex -ErrorAction SilentlyContinue) {
        $record.probes['codex_cli'] = (& codex --version 2>&1) -as [string]
    }
    else {
        $record.probes['codex_cli'] = 'WARN: not on PATH (optional)'
    }

    # gh CLI probe
    if (Get-Command gh -ErrorAction SilentlyContinue) {
        $null = & gh auth status 2>&1
        $record.probes['gh_auth'] = if ($LASTEXITCODE -eq 0) { 'OK' } else { 'WARN: not authed' }
    }
    else {
        $record.probes['gh_auth'] = 'FAIL: gh not installed'
    }

    # NSSM CogneeMCP probe
    if (-not $SkipServices) {
        $nssm = Join-Path $ToolsRoot 'nssm\nssm.exe'
        if (Test-Path $nssm) {
            $svcStatus = & $nssm status CogneeMCP 2>&1
            $record.probes['nssm_cognee'] = "$svcStatus".Trim()
        }
        else {
            $record.probes['nssm_cognee'] = 'WARN: nssm.exe missing'
        }
    }
    else {
        $record.probes['nssm_cognee'] = 'SKIP'
    }

    # Langfuse health probe
    if (-not $SkipServices -and ($InstallProfile -ne 'ci')) {
        try {
            $resp = Invoke-WebRequest -Uri 'http://127.0.0.1:3000/api/public/health' -TimeoutSec 5 -UseBasicParsing
            $record.probes['langfuse'] = "HTTP $($resp.StatusCode)"
        }
        catch {
            $record.probes['langfuse'] = "WARN: $($_.Exception.Message)"
        }
    }
    else {
        $record.probes['langfuse'] = 'SKIP'
    }

    # Honest-state record
    if (-not $DryRun) {
        if (-not (Test-Path (Split-Path $RecordFile -Parent))) {
            New-Item -ItemType Directory -Path (Split-Path $RecordFile -Parent) -Force | Out-Null
        }
        $record | ConvertTo-Json -Depth 6 | Set-Content -Path $RecordFile -Encoding UTF8
        Write-Ok "INSTALL-RECORD.json written to $RecordFile"
    }

    # Tee a human summary
    Write-Host ""
    Write-Host "==== VERIFY SUMMARY ====" -ForegroundColor Cyan
    foreach ($k in $record.probes.Keys) {
        $v = $record.probes[$k]
        $color = if ($v -match '^FAIL') { 'Red' } elseif ($v -match '^WARN|^SKIP') { 'Yellow' } else { 'Green' }
        Write-Host ("  {0,-16} {1}" -f $k, $v) -ForegroundColor $color
    }
    Write-Host ""

    Write-Stamp 'verify' @{ probe_count = $record.probes.Count }
}

# ===========================================================================
# Main dispatch
# ===========================================================================
function Invoke-Main {
    if (-not (Test-Path $BootstrapDir)) {
        New-Item -ItemType Directory -Path $BootstrapDir -Force | Out-Null
    }
    if (-not (Test-Path $StampDir)) {
        New-Item -ItemType Directory -Path $StampDir -Force | Out-Null
    }

    Write-Host ""
    Write-Host "==== claude-sota-installed bootstrap ====" -ForegroundColor Cyan
    Write-Host "  TargetDrive : $TargetDrive"
    Write-Host "  InstallRoot : $InstallRoot"
    Write-Host "  StateRoot   : $StateRoot"
    Write-Host "  ToolsRoot   : $ToolsRoot"
    Write-Host "  VenvRoot    : $VenvRoot"
    Write-Host "  Profile     : $InstallProfile"
    Write-Host "  DryRun      : $DryRun"
    Write-Host "  Force       : $Force"
    Write-Host ""

    $phases = @(
        @{ name = 'preflight';    fn = ${function:Invoke-Preflight} },
        @{ name = 'deps';         fn = ${function:Invoke-DepsPhase} },
        @{ name = 'venv';         fn = ${function:Invoke-Venv} },
        @{ name = 'clone-patch';  fn = ${function:Invoke-ClonePatch} },
        @{ name = 'plugins';      fn = ${function:Invoke-PluginsPhase} },
        @{ name = 'mcp-services'; fn = ${function:Invoke-McpServicesPhase} },
        @{ name = 'codex-auth';   fn = ${function:Invoke-CodexAuth} },
        @{ name = 'gh-auth';      fn = ${function:Invoke-GhAuth} },
        @{ name = 'verify';       fn = ${function:Invoke-Verify} }
    )

    foreach ($phase in $phases) {
        if (Test-StampValid $phase.name) {
            Write-Phase $phase.name.ToUpper() "SKIP — stamp present (use -Force to re-run)"
            continue
        }
        try {
            & $phase.fn
        }
        catch {
            Write-Host ""
            Write-Host "==== BOOTSTRAP FAILED in phase '$($phase.name)' ====" -ForegroundColor Red
            Write-Host "  Error: $($_.Exception.Message)"
            Write-Host "  Stamps preserved at $StampDir for partial re-entry."
            throw
        }
    }

    Write-Host ""
    Write-Host "==== BOOTSTRAP COMPLETE ====" -ForegroundColor Green
    Write-Host "  Honest-state record: $RecordFile"
    Write-Host "  Log:                 $LogFile"
    Write-Host "  Next: see $InstallRoot\ONBOARDING.md §4 (First-PR walkthrough)"
}

Invoke-Main
