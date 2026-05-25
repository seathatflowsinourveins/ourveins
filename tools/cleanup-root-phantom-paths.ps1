#Requires -Version 7.0
<#
.SYNOPSIS
  Archive truncated-prefix phantom files at Z:\ root (claude-sota-*, claude-sota-installed-*).
.DESCRIPTION
  MSYS / Git-Bash typo / partial-path-rewriting bug occasionally creates 25-byte files
  named like Z:\claude-sota-i, Z:\claude-sota-ins, Z:\claude-sota-installe, etc.
  Each contains the literal MSYS-form pwd "/z/claude-sota-installed\n".

  This script:
    - enumerates Z:\claude-sota-* AND Z:\claude-sota-installed-* entries that are FILES
      (legitimate workspaces are all directories);
    - validates content is the 25-byte phantom signature (skip otherwise);
    - moves them to Z:\claude-sota-installed-state\W317-z-phantom-archive\root-truncated-paths-<date>\;
    - reports counts.

  Idempotent. Safe to run multiple times. Read-only by default (-DryRun); pass -Execute to move.

  Companion to tools/w317-cleanup-z-phantom.ps1 which handles Z:\z\ tree (different bug).
.EXAMPLE
  .\cleanup-root-phantom-paths.ps1           # dry-run report
  .\cleanup-root-phantom-paths.ps1 -Execute  # archive
#>
[CmdletBinding()]
param(
  [switch]$Execute,
  [string]$ArchiveRoot = 'Z:\claude-sota-installed-state\W317-z-phantom-archive'
)

$ErrorActionPreference = 'Stop'
Set-StrictMode -Version Latest
# Accepted phantom signatures (MSYS path-conversion + CC cwd-tracker orphans):
$signatures = @{
  "/z/claude-sota-installed`n" = 'msys-truncated-pwd'  # 25B
  "/z`n"                       = 'cc-tmpclaude-cwd'    # 3B
}

$candidates = @()
# Patterns:
#   claud* / claude-sota-installed-*  -> MSYS truncated prefixes of "claude-sota-installed"
#   tmpclaude-*-cwd                   -> CC orphaned cwd-tracker files
foreach ($pattern in 'claud*', 'claude-sota-installed-*', 'tmpclaude-*-cwd') {
  Get-ChildItem -LiteralPath 'Z:\' -Filter $pattern -Force -ErrorAction SilentlyContinue |
    Where-Object { -not $_.PSIsContainer } |
    ForEach-Object { $candidates += $_ }
}

$archiveDir = Join-Path $ArchiveRoot ("root-truncated-paths-" + (Get-Date -Format 'yyyy-MM-dd'))
$mode = if ($Execute) { 'EXECUTE' } else { 'DRY-RUN' }
Write-Host "[cleanup-root-phantom] mode=$mode z-root-candidates=$($candidates.Count)" -ForegroundColor Cyan
if (-not $candidates) {
  Write-Host '[cleanup-root-phantom] z-root: no phantom files found.' -ForegroundColor DarkGray
}

$archived = 0; $skipped = 0
foreach ($f in $candidates) {
  $content = Get-Content -LiteralPath $f.FullName -Raw -ErrorAction SilentlyContinue
  $matchedKind = $null
  foreach ($sig in $signatures.Keys) {
    if ($content -eq $sig) { $matchedKind = $signatures[$sig]; break }
  }
  if (-not $matchedKind) {
    Write-Warning "[skip] $($f.Name): size=$($f.Length) — not a phantom signature"
    $skipped++
    continue
  }
  Write-Host "  phantom: $($f.Name) ($($f.Length)B, kind=$matchedKind, mtime=$($f.LastWriteTime.ToString('yyyy-MM-dd HH:mm')))"
  if ($Execute) {
    if (-not (Test-Path -LiteralPath $archiveDir)) {
      New-Item -ItemType Directory -Path $archiveDir -Force | Out-Null
    }
    Move-Item -LiteralPath $f.FullName -Destination (Join-Path $archiveDir $f.Name) -Force
    $archived++
  }
}

Write-Host ""
Write-Host "[cleanup-root-phantom] z-root: archived=$archived skipped=$skipped mode=$mode"

# Second pass: scan the REPO root Z:\claude-sota-installed\ for the OTHER bug class —
# colon-prefix file/dir names like `Z:claude-sota-installed*` (backslash-loss path-escape
# bug; PowerShell renders them as `Zclaude-sota-installed*` due to colon-in-name handling).
# These need POSIX-style enumeration since Get-ChildItem -Filter doesn't match colon.
$repoRoot = 'Z:\claude-sota-installed'
$colonPhantoms = @()
try {
  $bashOutput = & bash -c "cd '$repoRoot' && ls -1A | grep -E '^Z:claude-sota-installed' 2>/dev/null" 2>$null
  if ($bashOutput) {
    $colonPhantoms = @($bashOutput) | Where-Object { $_ -ne $null -and $_ -ne '' }
  }
} catch { }

$colonArchived = 0; $colonSkipped = 0
foreach ($name in $colonPhantoms) {
  $fullName = "$repoRoot\$name"
  # Validate it's a low-risk artifact: small file (<100KB) OR empty dir
  $info = $null
  try {
    # Bash since PS Get-Item rejects colon-named files cleanly
    $sizeStr = & bash -c "stat -c '%s|%F' '$fullName' 2>/dev/null" 2>$null
    if ($sizeStr) {
      $parts = $sizeStr -split '\|'
      $sizeBytes = [int64]$parts[0]
      $kind = $parts[1]
      $isPhantom = ($kind -eq 'directory' -and $sizeBytes -eq 0) -or `
                   ($kind -eq 'regular file' -and $sizeBytes -lt 102400) -or `
                   ($kind -eq 'regular empty file')
      Write-Host "  colon-phantom: $name (size=$sizeBytes, kind=$kind, candidate=$isPhantom)"
      if ($isPhantom -and $Execute) {
        $archiveDir2 = Join-Path $ArchiveRoot ("root-truncated-paths-" + (Get-Date -Format 'yyyy-MM-dd'))
        if (-not (Test-Path -LiteralPath $archiveDir2)) { New-Item -ItemType Directory -Path $archiveDir2 -Force | Out-Null }
        $safeName = "Z-colon-" + $name.Substring(2)  # 'Z:foo' -> 'Z-colon-foo'
        $destPath = Join-Path $archiveDir2 $safeName
        & bash -c "mv '$fullName' '$destPath' 2>&1"
        if ($LASTEXITCODE -eq 0) { $colonArchived++ } else { $colonSkipped++ }
      } elseif (-not $isPhantom) {
        $colonSkipped++
      }
    }
  } catch { $colonSkipped++ }
}

Write-Host "[cleanup-root-phantom] repo-root colon-phantoms: archived=$colonArchived skipped=$colonSkipped"

if (-not $Execute -and (($candidates.Count + $colonPhantoms.Count) -gt 0)) {
  Write-Host "Re-run with -Execute to apply."
}

# Force exit 0 — bash grep returns 1 on no-match which pollutes $LASTEXITCODE
exit 0
