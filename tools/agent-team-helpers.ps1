# tools/agent-team-helpers.ps1
# W436-AGENT-TEAM-SOTA — PowerShell helpers for the agent-teams plugin orchestration surface.
#
# Cite-anchors:
#   - agent-teams@1.0.2 (MIT, Seth Hobson) at:
#     Z:/claude-sota-installed/.claude/plugins/cache/claude-code-workflows/agent-teams/1.0.2/
#   - team-spawn.md presets verified 2026-05-24
#   - team-lead.md communication-protocols verified 2026-05-24
#   - Anthropic experimental-features doc: CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1
#
# Usage (from any CC PowerShell session in claude-sota-installed):
#
#   . Z:/claude-sota-installed/tools/agent-team-helpers.ps1
#   Get-AgentTeamPresets
#   Get-AgentTeamPresetSpec -Preset feature
#   Test-AgentTeamRuntime
#   Get-ActiveAgentTeams
#   Get-AgentTeamConfig -TeamName feature-team
#   Get-AgentTeamReport -TeamName feature-team
#   New-AgentTeamSpawnDirective -Preset research -Members 3 -Brief "audit module X"
#
# These are READ-ONLY helpers + directive-emitters. They do NOT call TeamCreate / Agent
# tools directly — those are first-class CC orchestrator tools and must be invoked from
# the orchestrator's assistant turn. The Start-AgentTeam helper emits a paste-ready
# slash-command directive instead, which preserves cardinal-rule-3 (subagents = upstream
# agents only).

Set-StrictMode -Version 3.0
$ErrorActionPreference = 'Stop'

# Module-local constants

$script:AgentTeamPlugin = @{
  Path        = 'Z:/claude-sota-installed/.claude/plugins/cache/claude-code-workflows/agent-teams/1.0.2'
  Version     = '1.0.2'
  License     = 'MIT'
  Author      = 'Seth Hobson <seth@major7apps.com>'
  Marketplace = 'claude-code-workflows'
}

$script:AgentTeamConfigRoot = Join-Path $env:USERPROFILE '.claude/teams'

# ----------------------------------------------------------------------------
# Get-AgentTeamPresets — list available presets and their canonical composition
# ----------------------------------------------------------------------------
function Get-AgentTeamPresets {
  <#
  .SYNOPSIS
    List the 7 canonical agent-teams presets per cache/.../commands/team-spawn.md.
  .DESCRIPTION
    Cite-anchored to agent-teams plugin v1.0.2 Phase 1 preset table. Returns
    a [PSCustomObject[]] array. Use Get-AgentTeamPresetSpec to drill into
    composition detail.
  .OUTPUTS
    PSCustomObject[] with Preset, DefaultSize, Composition, BestFor.
  #>
  [CmdletBinding()]
  param()

  $presets = @(
    [PSCustomObject]@{
      Preset       = 'review'
      DefaultSize  = 3
      Composition  = '3x agent-teams:team-reviewer (security, performance, architecture)'
      BestFor      = 'Multi-dimensional code review of a PR/change-set in parallel'
      NeedsLead    = $false
    }
    [PSCustomObject]@{
      Preset       = 'debug'
      DefaultSize  = 3
      Composition  = '3x agent-teams:team-debugger, one competing hypothesis each'
      BestFor      = 'Bug with 3+ plausible root causes (ACH-style)'
      NeedsLead    = $false
    }
    [PSCustomObject]@{
      Preset       = 'feature'
      DefaultSize  = 3
      Composition  = '1x agent-teams:team-lead + 2x agent-teams:team-implementer'
      BestFor      = 'Feature spanning multiple files with ownership boundaries'
      NeedsLead    = $true
    }
    [PSCustomObject]@{
      Preset       = 'fullstack'
      DefaultSize  = 4
      Composition  = '1x lead + 1x frontend + 1x backend + 1x tests (all team-implementer except lead)'
      BestFor      = 'Full-stack feature with frontend/backend/test split'
      NeedsLead    = $true
    }
    [PSCustomObject]@{
      Preset       = 'research'
      DefaultSize  = 3
      Composition  = '3x general-purpose agents on parallel research questions'
      BestFor      = 'Codebase+web+docs research, no SendMessage needed'
      NeedsLead    = $false
    }
    [PSCustomObject]@{
      Preset       = 'security'
      DefaultSize  = 4
      Composition  = '4x agent-teams:team-reviewer (OWASP, auth, deps, secrets)'
      BestFor      = 'Comprehensive security audit'
      NeedsLead    = $false
    }
    [PSCustomObject]@{
      Preset       = 'migration'
      DefaultSize  = 4
      Composition  = '1x lead + 2x team-implementer + 1x team-reviewer'
      BestFor      = 'Large refactor / framework migration with verification'
      NeedsLead    = $true
    }
  )

  return $presets
}

# ----------------------------------------------------------------------------
# Get-AgentTeamPresetSpec — full spec for one preset
# ----------------------------------------------------------------------------
function Get-AgentTeamPresetSpec {
  [CmdletBinding()]
  param(
    [Parameter(Mandatory, Position = 0)]
    [ValidateSet('review', 'debug', 'feature', 'fullstack', 'research', 'security', 'migration')]
    [string]$Preset
  )

  $row = Get-AgentTeamPresets | Where-Object { $_.Preset -eq $Preset }
  if (-not $row) {
    throw "Unknown preset: $Preset"
  }

  $row | Add-Member -NotePropertyName 'SourceFile' -NotePropertyValue (Join-Path $script:AgentTeamPlugin.Path 'commands/team-spawn.md') -Force
  $row | Add-Member -NotePropertyName 'PluginVersion' -NotePropertyValue $script:AgentTeamPlugin.Version -Force
  return $row
}

# ----------------------------------------------------------------------------
# Test-AgentTeamRuntime — verify the env flag + plugin cache are present
# ----------------------------------------------------------------------------
function Test-AgentTeamRuntime {
  <#
  .SYNOPSIS
    Verify agent-teams runtime prerequisites.
  .DESCRIPTION
    Checks (a) CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS env var, (b) plugin cache
    presence, (c) ~/.claude/teams root.
  .OUTPUTS
    [PSCustomObject] with FlagSet, PluginCached, ConfigRootExists, AllOk.
  #>
  [CmdletBinding()]
  param()

  $flagSet         = $env:CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS -eq '1'
  $pluginCached    = Test-Path $script:AgentTeamPlugin.Path -PathType Container
  $configExists    = Test-Path $script:AgentTeamConfigRoot -PathType Container

  $result = [PSCustomObject]@{
    FlagSet           = $flagSet
    PluginCached      = $pluginCached
    ConfigRootExists  = $configExists
    PluginPath        = $script:AgentTeamPlugin.Path
    ConfigRoot        = $script:AgentTeamConfigRoot
    AllOk             = ($flagSet -and $pluginCached)
  }

  if (-not $flagSet) {
    Write-Warning 'CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS is NOT set to 1. /team-spawn will abort in pre-flight.'
  }
  if (-not $pluginCached) {
    Write-Warning "agent-teams plugin NOT found at $($script:AgentTeamPlugin.Path). Run /plugin install."
  }

  return $result
}

# ----------------------------------------------------------------------------
# Get-ActiveAgentTeams — list teams whose config exists under ~/.claude/teams
# ----------------------------------------------------------------------------
function Get-ActiveAgentTeams {
  [CmdletBinding()]
  param()

  if (-not (Test-Path $script:AgentTeamConfigRoot -PathType Container)) {
    Write-Verbose "Team config root does not exist: $script:AgentTeamConfigRoot"
    return @()
  }

  Get-ChildItem -Path $script:AgentTeamConfigRoot -Directory | ForEach-Object {
    $configPath = Join-Path $_.FullName 'config.json'
    $hasConfig = Test-Path $configPath -PathType Leaf
    [PSCustomObject]@{
      TeamName    = $_.Name
      ConfigPath  = $configPath
      HasConfig   = $hasConfig
      CreatedAt   = $_.CreationTime
      LastWrite   = $_.LastWriteTime
    }
  }
}

# ----------------------------------------------------------------------------
# Get-AgentTeamConfig — read a team's config.json
# ----------------------------------------------------------------------------
function Get-AgentTeamConfig {
  [CmdletBinding()]
  param(
    [Parameter(Mandatory, Position = 0)]
    [string]$TeamName
  )

  $configPath = Join-Path $script:AgentTeamConfigRoot $TeamName 'config.json'
  if (-not (Test-Path $configPath -PathType Leaf)) {
    throw "Team config not found: $configPath"
  }

  try {
    $config = Get-Content $configPath -Raw -Encoding UTF8 | ConvertFrom-Json
    return $config
  } catch {
    throw "Failed to parse team config at $configPath`: $_"
  }
}

# ----------------------------------------------------------------------------
# Get-AgentTeamReport — structured JSON-safe summary of a team
# ----------------------------------------------------------------------------
function Get-AgentTeamReport {
  <#
  .SYNOPSIS
    Emit a structured report of a running team.
  .DESCRIPTION
    Reads team config.json + lists teammate names + reports timestamps.
    Use Wait-AgentTeamCompletion to block until tasks complete (orchestrator
    side) — this helper is READ-ONLY snapshot.
  .OUTPUTS
    PSCustomObject summary suitable for ConvertTo-Json -Depth 5.
  #>
  [CmdletBinding()]
  param(
    [Parameter(Mandatory, Position = 0)]
    [string]$TeamName
  )

  $config = Get-AgentTeamConfig -TeamName $TeamName
  $teamDir = Join-Path $script:AgentTeamConfigRoot $TeamName

  $members = @()
  if ($config.PSObject.Properties.Name -contains 'teammates') {
    $members = $config.teammates
  } elseif ($config.PSObject.Properties.Name -contains 'members') {
    $members = $config.members
  }

  $report = [PSCustomObject]@{
    TeamName       = $TeamName
    ConfigPath     = Join-Path $teamDir 'config.json'
    Description    = if ($config.PSObject.Properties.Name -contains 'description') { $config.description } else { '<unspecified>' }
    MemberCount    = ($members | Measure-Object).Count
    Members        = $members
    SnapshotAt     = (Get-Date).ToString('o')
    TeamDirExists  = Test-Path $teamDir -PathType Container
  }

  return $report
}

# ----------------------------------------------------------------------------
# New-AgentTeamSpawnDirective — emit a paste-ready /team-spawn directive
# ----------------------------------------------------------------------------
function New-AgentTeamSpawnDirective {
  <#
  .SYNOPSIS
    Emit a paste-ready /team-spawn slash command + initial task brief.
  .DESCRIPTION
    PowerShell cannot directly invoke TeamCreate / Agent tools — those are
    CC orchestrator-level tools. This helper formulates the canonical slash
    command + initial task brief, which the operator then pastes into CC.
  .PARAMETER Preset
    One of the 7 canonical presets.
  .PARAMETER Members
    Override the default member count.
  .PARAMETER Name
    Override the auto-generated team name.
  .PARAMETER Brief
    Free-text initial task brief; will be embedded in the directive.
  .PARAMETER Delegate
    If specified, appends --delegate to the directive.
  .OUTPUTS
    [string] paste-ready slash command + brief.
  #>
  [CmdletBinding()]
  param(
    [Parameter(Mandatory, Position = 0)]
    [ValidateSet('review', 'debug', 'feature', 'fullstack', 'research', 'security', 'migration', 'custom')]
    [string]$Preset,

    [ValidateRange(2, 5)]
    [int]$Members,

    [string]$Name,

    [string]$Brief,

    [switch]$Delegate
  )

  $cmd = "/team-spawn $Preset"
  if ($Name)     { $cmd += " --name $Name" }
  if ($Members)  { $cmd += " --members $Members" }
  if ($Delegate) { $cmd += " --delegate" }

  $directive = @"
$cmd

Brief: $Brief

Notes:
  - Pre-flight: verify CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1 (current: $($env:CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS))
  - Preset spec: $(($(Get-AgentTeamPresets) | Where-Object Preset -eq $Preset | Select-Object -ExpandProperty Composition))
  - Always use FQN subagent_type (e.g. agent-teams:team-lead) per CR-3 W333 Stream D #5
  - After collection, /team-shutdown $($Name -ne '' ? $Name : "$Preset-team")
"@

  return $directive
}

# ----------------------------------------------------------------------------
# Wait-AgentTeamCompletion — block-poll until team config indicates done
# ----------------------------------------------------------------------------
function Wait-AgentTeamCompletion {
  <#
  .SYNOPSIS
    Block until the agent team appears to have completed.
  .DESCRIPTION
    Polls the team's config.json and any task-state files under
    ~/.claude/teams/{TeamName}/ at the given interval. Returns when all
    teammates report completion OR timeout fires.

    This is a BEST-EFFORT helper — canonical task state lives in the CC
    orchestrator's TaskList tool, which is NOT directly readable from
    PowerShell. The helper exists for harness use (eee.ps1, CI runs) where
    a PowerShell loop needs a coarse-grained completion signal.
  .OUTPUTS
    PSCustomObject with TeamName, ElapsedSec, TimedOut, Completed.
  #>
  [CmdletBinding()]
  param(
    [Parameter(Mandatory, Position = 0)]
    [string]$TeamName,

    [int]$TimeoutSec = 600,

    [int]$PollIntervalSec = 5
  )

  $teamDir = Join-Path $script:AgentTeamConfigRoot $TeamName
  if (-not (Test-Path $teamDir -PathType Container)) {
    throw "Team directory not found: $teamDir"
  }

  $start = Get-Date
  $completed = $false
  $timedOut = $false

  while (-not $completed) {
    $elapsed = ((Get-Date) - $start).TotalSeconds
    if ($elapsed -ge $TimeoutSec) {
      $timedOut = $true
      break
    }

    # Coarse heuristic: look for a sentinel file `complete.flag` or check
    # config.json status field. Tunable by operator per project.
    $sentinel = Join-Path $teamDir 'complete.flag'
    if (Test-Path $sentinel -PathType Leaf) {
      $completed = $true
      break
    }

    try {
      $config = Get-AgentTeamConfig -TeamName $TeamName -ErrorAction Stop
      if ($config.PSObject.Properties.Name -contains 'status' -and $config.status -eq 'complete') {
        $completed = $true
        break
      }
    } catch {
      Write-Verbose "Config read transient error: $_"
    }

    Start-Sleep -Seconds $PollIntervalSec
  }

  return [PSCustomObject]@{
    TeamName     = $TeamName
    ElapsedSec   = ((Get-Date) - $start).TotalSeconds
    TimedOut     = $timedOut
    Completed    = $completed
  }
}

# ----------------------------------------------------------------------------
# Start-AgentTeam — emit directive + log to wave-log
# ----------------------------------------------------------------------------
function Start-AgentTeam {
  <#
  .SYNOPSIS
    Emit a /team-spawn directive and log invocation to wave-log.
  .DESCRIPTION
    Wraps New-AgentTeamSpawnDirective + emits the directive as Write-Output.
    The operator pastes the directive into CC. Logs the invocation to
    .claude/state/agent-team-invocations.jsonl for wave-level audit.
  #>
  [CmdletBinding()]
  param(
    [Parameter(Mandatory, Position = 0)]
    [ValidateSet('review', 'debug', 'feature', 'fullstack', 'research', 'security', 'migration', 'custom')]
    [string]$Preset,

    [string]$Brief,

    [string]$Name,

    [int]$Members,

    [switch]$Delegate,

    [string]$Wave
  )

  $directive = New-AgentTeamSpawnDirective -Preset $Preset -Members $Members -Name $Name -Brief $Brief -Delegate:$Delegate

  # Log to wave-audit JSONL (one line per invocation)
  $logDir = Join-Path 'Z:/claude-sota-installed/.claude/state' ''
  if (-not (Test-Path $logDir -PathType Container)) {
    New-Item -ItemType Directory -Path $logDir -Force | Out-Null
  }
  $logPath = Join-Path $logDir 'agent-team-invocations.jsonl'

  $logEntry = [PSCustomObject]@{
    timestamp  = (Get-Date).ToString('o')
    wave       = $Wave
    preset     = $Preset
    name       = $Name
    members    = $Members
    brief_head = if ($Brief) { $Brief.Substring(0, [Math]::Min(120, $Brief.Length)) } else { '' }
    delegate   = [bool]$Delegate
  }
  $logLine = $logEntry | ConvertTo-Json -Compress
  Add-Content -Path $logPath -Value $logLine -Encoding UTF8

  Write-Output $directive
}

# ----------------------------------------------------------------------------
# Export-ModuleMember — explicit exports (only when dot-sourced into a module)
# ----------------------------------------------------------------------------
# When dot-sourced (`. tools/agent-team-helpers.ps1`) all functions are
# implicitly available. The Export-ModuleMember call is a no-op outside a
# module context, so the if-block guards against errors.

if ($MyInvocation.MyCommand.ModuleName) {
  Export-ModuleMember -Function `
    Get-AgentTeamPresets,            `
    Get-AgentTeamPresetSpec,         `
    Test-AgentTeamRuntime,           `
    Get-ActiveAgentTeams,            `
    Get-AgentTeamConfig,             `
    Get-AgentTeamReport,             `
    New-AgentTeamSpawnDirective,     `
    Wait-AgentTeamCompletion,        `
    Start-AgentTeam
}
