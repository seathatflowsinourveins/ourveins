#Requires -Version 7.0
# TODO W344: validate Set-StrictMode -Version Latest in runtime test before adding
<#
.SYNOPSIS
  Idempotently rewrite hardcoded context-mode plugin-cache version-paths in hooks.json
  to use ${CLAUDE_PLUGIN_ROOT} so they survive auto-update version bumps.

.DESCRIPTION
  W339-P0a — context-mode auto-generates `1.0.146/hooks/hooks.json` with HARDCODED
  paths referencing prior `1.0.141/hooks/*.mjs`. When the prior version dir is removed
  (W338-P0b dedupe), every PreToolUse hook fires `MODULE_NOT_FOUND`.

  Per code.claude.com/docs/en/plugins (retr 2026-05-20), plugin scripts MUST reference
  themselves via `${CLAUDE_PLUGIN_ROOT}` so the runtime resolves to the active version
  regardless of cache layout.

  This script enforces that convention: scan `*/context-mode/*/hooks/hooks.json` and
  rewrite any `Z:/claude-sota-installed/.claude/plugins/cache/context-mode/context-mode/<v>/`
  prefix to `${CLAUDE_PLUGIN_ROOT}/`. Idempotent — re-run after every plugin update.

  Wired into `tools/eee.ps1` + `tools/eee-backup.ps1` startup probes.
#>
[CmdletBinding()]
param()

$ErrorActionPreference = 'Stop'

$cacheRoot = 'Z:\claude-sota-installed\.claude\plugins\cache\context-mode\context-mode'
if (-not (Test-Path -LiteralPath $cacheRoot)) {
    Write-Host '[repatch-context-mode] cache root absent — skip.' -ForegroundColor DarkGray
    return
}

$totalPatched = 0
$totalAlready = 0
Get-ChildItem -LiteralPath $cacheRoot -Directory | ForEach-Object {
    $hooksFile = Join-Path $_.FullName 'hooks\hooks.json'
    if (-not (Test-Path -LiteralPath $hooksFile)) { return }

    $content = Get-Content -LiteralPath $hooksFile -Raw
    $patchCount = 0

    # (1) Match any hardcoded version-prefix and rewrite to ${CLAUDE_PLUGIN_ROOT}
    # Cite: code.claude.com/docs/en/plugins (CLAUDE_PLUGIN_ROOT injection)
    $verPattern = 'Z:/claude-sota-installed/\.claude/plugins/cache/context-mode/context-mode/\d+\.\d+\.\d+/'
    $verCount = ([regex]::Matches($content, $verPattern)).Count
    if ($verCount -gt 0) {
        $content = $content -replace $verPattern, '${CLAUDE_PLUGIN_ROOT}/'
        $patchCount += $verCount
    }

    # (2) Replace ephemeral fnm_multishells node.exe paths with stable Z:/tools/nodejs/node.exe
    # W341-Q6: fnm_multishells paths are ephemeral (AppData\Local\fnm_multishells\<pid>_<ts>)
    # and break after node version switches. Cite: W340 S2-RUNTIME-HEALTH-SWEEP.md §D.2 gap.
    $fnmPattern = 'C:/Users/[^"]+/fnm_multishells/[^"]+/node\.exe'
    $fnmCount = ([regex]::Matches($content, $fnmPattern)).Count
    if ($fnmCount -gt 0) {
        $content = $content -replace $fnmPattern, 'Z:/tools/nodejs/node.exe'
        $patchCount += $fnmCount
    }

    if ($patchCount -eq 0) {
        $totalAlready++
        return
    }
    Set-Content -LiteralPath $hooksFile -Value $content -NoNewline
    $totalPatched += $patchCount
    Write-Host "  patched $patchCount refs (ver=$verCount fnm=$fnmCount) in $hooksFile" -ForegroundColor Green
}

Write-Host "[repatch-context-mode] patched=$totalPatched already=$totalAlready"
