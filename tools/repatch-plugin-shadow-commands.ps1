#Requires -Version 7.0
# TODO W344: validate Set-StrictMode -Version Latest in runtime test before adding
<#
.SYNOPSIS
  Idempotently re-namespace plugin sub-skill SKILL.md `name:` fields so they don't
  shadow built-in CC slash commands (/resume, /run, /status, /init, /eval, /merge, etc.).

.DESCRIPTION
  Multiple installed plugins ship sub-skills with bare `name:` fields ("resume", "run",
  "status", etc.) which CC surfaces as bare slash commands, shadowing built-ins.
  Each plugin's own CLAUDE.md declares a namespace (/ar:, /hub:) as canonical, but the
  bare names leak through.

  This script:
   1. Renames each sub-skill's `name:` field from "<verb>" -> "<prefix>-<verb>"
   2. Fixes any `{skill_path}/scripts/` refs (broken — actual scripts are at
      sibling parent-skill dir) to `{skill_path}/../<parent>/scripts/`

  Plugin paths covered:
    - autoresearch-agent (/ar: namespace)        prefix = "ar"
    - agenthub          (/hub: namespace)        prefix = "hub"

  Each plugin is scanned at multiple install paths since some appear duplicated under
  engineering-advanced-skills bundle.

  Idempotent. Safe to re-run after every `/plugin update`.

  Wired into tools/eee.ps1 startup; can also be invoked manually.
#>
[CmdletBinding()]
param()

$ErrorActionPreference = 'Stop'

# Plugin spec: each entry = @{prefix, parentSkill, verbs, paths}
$pluginSpecs = @(
  @{
    prefix      = 'ar'
    parentSkill = 'autoresearch-agent'
    verbs       = @('resume', 'setup', 'run', 'loop', 'status')
    paths       = @(
      'Z:\claude-sota-installed\.claude\plugins\cache\claude-code-skills\autoresearch-agent\2.2.2\skills',
      'Z:\claude-sota-installed\.claude\plugins\cache\claude-code-skills\engineering-advanced-skills\2.4.4\autoresearch-agent\skills'
    )
    # Agent files have a different relative-path needs: agents/X.md needs `{skill_path}/../skills/<parent>/scripts/`
    # instead of sub-skill's `{skill_path}/../<parent>/scripts/`. Listed separately.
    agentFiles  = @(
      'Z:\claude-sota-installed\.claude\plugins\cache\claude-code-skills\autoresearch-agent\2.2.2\agents\experiment-runner.md',
      'Z:\claude-sota-installed\.claude\plugins\cache\claude-code-skills\engineering-advanced-skills\2.4.4\autoresearch-agent\agents\experiment-runner.md'
    )
  },
  @{
    prefix      = 'hub'
    parentSkill = 'agenthub'
    verbs       = @('agenthub', 'board', 'eval', 'init', 'merge', 'run', 'spawn', 'status')
    paths       = @(
      'Z:\claude-sota-installed\.claude\plugins\cache\claude-code-skills\agenthub\2.2.2\skills',
      'Z:\claude-sota-installed\.claude\plugins\cache\claude-code-skills\engineering-advanced-skills\2.4.4\agenthub\skills'
    )
  }
)

$totals = @{ name = 0; nameDone = 0; path = 0; pathDone = 0; missing = 0 }

foreach ($spec in $pluginSpecs) {
  foreach ($skillsDir in $spec.paths) {
    if (-not (Test-Path -LiteralPath $skillsDir)) { continue }
    foreach ($verb in $spec.verbs) {
      $skillMd = Join-Path $skillsDir $verb | Join-Path -ChildPath 'SKILL.md'
      if (-not (Test-Path -LiteralPath $skillMd)) {
        $totals.missing++
        continue
      }
      # Skip the parent skill itself (e.g. agenthub/skills/agenthub/SKILL.md is the canonical auto-fire skill)
      if ($verb -eq $spec.parentSkill) { continue }

      $content = Get-Content -LiteralPath $skillMd -Raw
      $orig = $content
      $namespacedName = "$($spec.prefix)-$verb"

      # Patch 1: name: "<verb>"  ->  name: "<prefix>-<verb>"
      $barePat = "name:\s*[`"']$([regex]::Escape($verb))[`"']"
      $nsPat   = "name:\s*[`"']$([regex]::Escape($namespacedName))[`"']"
      if ($content -match $nsPat) {
        $totals.nameDone++
      } elseif ($content -match $barePat) {
        $content = $content -replace $barePat, "name: `"$namespacedName`""
        $totals.name++
        Write-Host "  name: $($spec.prefix)/$verb -> $namespacedName ($skillMd)" -ForegroundColor Green
      }

      # Patch 2: {skill_path}/scripts/ -> {skill_path}/../<parentSkill>/scripts/
      $bareScript = '{skill_path}/scripts/'
      $fixedScript = "{skill_path}/../$($spec.parentSkill)/scripts/"
      $bareCount = ([regex]::Matches($content, [regex]::Escape($bareScript))).Count
      $fixedCount = ([regex]::Matches($content, [regex]::Escape($fixedScript))).Count
      if ($bareCount -gt $fixedCount) {
        # Protect already-fixed, replace bare, restore
        $sentinel = '___SCRIPTPATH_OK___'
        $tmp = $content -replace [regex]::Escape($fixedScript), $sentinel
        $tmp = $tmp -replace [regex]::Escape($bareScript), $fixedScript
        $content = $tmp -replace [regex]::Escape($sentinel), $fixedScript
        $delta = $bareCount - $fixedCount
        $totals.path += $delta
        Write-Host "  path: $($spec.prefix)/$verb fixed $delta refs ($skillMd)" -ForegroundColor Green
      } elseif ($fixedCount -gt 0) {
        $totals.pathDone += $fixedCount
      }

      if ($content -ne $orig) {
        Set-Content -LiteralPath $skillMd -Value $content -NoNewline
      }
    }
  }
}

# Patch agent markdown files (different relative-path form: `{skill_path}/../skills/<parent>/scripts/`)
$agentP = 0; $agentDone = 0
foreach ($spec in $pluginSpecs) {
  if (-not $spec.ContainsKey('agentFiles')) { continue }
  foreach ($agentMd in $spec.agentFiles) {
    if (-not (Test-Path -LiteralPath $agentMd)) { continue }
    $content = Get-Content -LiteralPath $agentMd -Raw
    $orig = $content
    $bareScript = '{skill_path}/scripts/'
    $fixedScript = "{skill_path}/../skills/$($spec.parentSkill)/scripts/"
    $bareCount = ([regex]::Matches($content, [regex]::Escape($bareScript))).Count
    $fixedCount = ([regex]::Matches($content, [regex]::Escape($fixedScript))).Count
    if ($bareCount -gt $fixedCount) {
      $sentinel = '___AGENTPATH_OK___'
      $tmp = $content -replace [regex]::Escape($fixedScript), $sentinel
      $tmp = $tmp -replace [regex]::Escape($bareScript), $fixedScript
      $content = $tmp -replace [regex]::Escape($sentinel), $fixedScript
      $agentP += ($bareCount - $fixedCount)
      Write-Host "  agent path: fixed $($bareCount - $fixedCount) refs ($agentMd)" -ForegroundColor Green
      Set-Content -LiteralPath $agentMd -Value $content -NoNewline
    } elseif ($fixedCount -gt 0) {
      $agentDone += $fixedCount
    }
  }
}

Write-Host "[repatch-shadows] names patched=$($totals.name) already=$($totals.nameDone) | sub-skill scripts patched=$($totals.path) already=$($totals.pathDone) | agent scripts patched=$agentP already=$agentDone | missing=$($totals.missing)"
