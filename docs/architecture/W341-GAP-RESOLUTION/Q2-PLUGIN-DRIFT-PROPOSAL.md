# Q2 — Plugin Cache-Delete + Fresh-Install Proposal

**Status**: PROPOSE-ONLY (operator-sign required before execution)
**Risk**: MEDIUM — plugin reinstall can break active sessions
**Wave**: W341-GAP-RESOLUTION (Agent B)
**Source**: Agent-2 §B — 3 silent SHA drifts detected

---

## Detected SHA Drifts

| Plugin | Current cache SHA | Expected upstream SHA | Drift |
|---|---|---|---|
| `everything-claude-code@everything-claude-code` | `8148340a` | `1e8c7e79` | YES |
| `superpowers@superpowers-marketplace` | `f2cbfbef` | `647ca50f` | YES |
| `context-mode@context-mode` | `6bbcb443` | `4dcbd451` | YES |

Silent SHA drift = version-string unchanged but upstream content advanced. Standard `/plugin update` no-ops on this condition. Cache-delete + fresh-install is the SOTA fix per CLAUDE.md cardinal-rule-1 W270 corollary.

---

## Pre-Execution Safety Checks

Run these BEFORE any cache-delete to snapshot current state:

```powershell
# 1. Verify current session is NOT running with the affected plugins active
# (close all CC sessions before proceeding)

# 2. Git stash current worktree state (belt-and-suspenders)
git -C Z:\claude-sota-installed stash push -m "W341-Q2-pre-plugin-refresh-snapshot"

# 3. Record current plugin SHA fingerprints for rollback reference
$pluginCacheRoot = 'Z:\claude-sota-installed\.claude\plugins\cache'
Get-ChildItem $pluginCacheRoot -Directory | ForEach-Object {
    $name = $_.Name
    Get-ChildItem $_.FullName -Directory | ForEach-Object {
        $ver = $_.Name
        $sha = (git -C $_.FullName rev-parse HEAD 2>$null)
        "$name/$ver  SHA=$sha"
    }
} | Tee-Object -FilePath 'Z:\claude-sota-installed\tmp\W341-Q2-pre-refresh-sha-snapshot.txt'
Write-Host "Snapshot written to tmp/W341-Q2-pre-refresh-sha-snapshot.txt"

# 4. Verify Z:/tools/nodejs/node.exe exists (needed post-reinstall for hook patching)
Test-Path 'Z:\tools\nodejs\node.exe'
```

---

## Per-Plugin Cache-Delete + Install Commands

### Plugin 1: `everything-claude-code@everything-claude-code`

```powershell
# Move cache to timestamped backup (preserves rollback path)
$ts = Get-Date -Format 'yyyyMMdd-HHmmss'
Move-Item 'Z:\claude-sota-installed\.claude\plugins\cache\everything-claude-code' `
          "Z:\claude-sota-installed\tmp\W341-Q2-ecc-backup-$ts" -ErrorAction SilentlyContinue

# In CC session after restart:
# /plugin install everything-claude-code@everything-claude-code
# /reload-plugins
```

### Plugin 2: `superpowers@superpowers-marketplace`

```powershell
# Move cache to timestamped backup (preserves rollback path)
$ts = Get-Date -Format 'yyyyMMdd-HHmmss'
Move-Item 'Z:\claude-sota-installed\.claude\plugins\cache\superpowers' `
          "Z:\claude-sota-installed\tmp\W341-Q2-superpowers-backup-$ts" -ErrorAction SilentlyContinue

# In CC session after restart:
# /plugin install superpowers@superpowers-marketplace
# /reload-plugins
```

### Plugin 3: `context-mode@context-mode`

```powershell
# Move cache to timestamped backup (preserves rollback path)
$ts = Get-Date -Format 'yyyyMMdd-HHmmss'
Move-Item 'Z:\claude-sota-installed\.claude\plugins\cache\context-mode' `
          "Z:\claude-sota-installed\tmp\W341-Q2-context-mode-backup-$ts" -ErrorAction SilentlyContinue

# In CC session after restart:
# /plugin install context-mode@context-mode
# /reload-plugins

# CRITICAL: Re-run repatch script after context-mode reinstall (new version
# will regenerate hooks.json with fnm_multishells paths):
& 'Z:\claude-sota-installed\tools\repatch-context-mode-hooks-json.ps1'
```

---

## Full Batch Sequence (if doing all 3 together)

```powershell
# STEP 1: Pre-snapshot (see above)

# STEP 2: Safety gate — abort if OPERATOR_SIGN not set
if ($env:OPERATOR_SIGN -ne 'W341-Q2') {
    Write-Error "ABORT: Set `$env:OPERATOR_SIGN = 'W341-Q2' to authorize plugin cache deletion."
    exit 1
}

# STEP 3: Move (not delete) all 3 caches to timestamped backup dir
$ts = Get-Date -Format 'yyyyMMdd-HHmmss'
$backupRoot = "Z:\claude-sota-installed\tmp\W341-Q2-cache-backup-$ts"
New-Item -ItemType Directory -Force -Path $backupRoot | Out-Null

$toMove = @(
    'Z:\claude-sota-installed\.claude\plugins\cache\everything-claude-code',
    'Z:\claude-sota-installed\.claude\plugins\cache\superpowers',
    'Z:\claude-sota-installed\.claude\plugins\cache\context-mode'
)
foreach ($d in $toMove) {
    if (Test-Path $d) {
        $dest = Join-Path $backupRoot (Split-Path $d -Leaf)
        Move-Item -LiteralPath $d -Destination $dest
        Write-Host "MOVED to backup: $d -> $dest"
    } else {
        Write-Host "NOT FOUND (skip): $d"
    }
}
Write-Host "Backup dir: $backupRoot (restore with Move-Item if rollback needed)"

# STEP 3: Launch new CC session, then run in CC:
# /plugin install everything-claude-code@everything-claude-code
# /plugin install superpowers@superpowers-marketplace
# /plugin install context-mode@context-mode
# /reload-plugins

# STEP 4: Post-reinstall hook repatch (run in PowerShell outside CC):
& 'Z:\claude-sota-installed\tools\repatch-context-mode-hooks-json.ps1'
```

---

## Post-Verification SHA Probes

After reinstall, verify SHA drift is resolved:

```powershell
# Check each plugin's git SHA matches upstream expectation
$plugins = @{
    'everything-claude-code' = '1e8c7e79'
    'superpowers'            = '647ca50f'
    'context-mode'           = '4dcbd451'
}
$cacheRoot = 'Z:\claude-sota-installed\.claude\plugins\cache'
foreach ($name in $plugins.Keys) {
    $expected = $plugins[$name]
    $dir = Get-ChildItem "$cacheRoot\$name" -Directory -ErrorAction SilentlyContinue | Select-Object -First 1
    if (-not $dir) { Write-Host "MISSING: $name"; continue }
    $sha = (git -C $dir.FullName rev-parse HEAD 2>$null)
    $short = if ($sha) { $sha.Substring(0,8) } else { 'N/A' }
    $status = if ($short -eq $expected) { 'OK' } else { "MISMATCH (got=$short expected=$expected)" }
    Write-Host "${name}: $status"
}

# Also verify context-mode hooks.json has no fnm_multishells after repatch:
$hooksFile = Get-ChildItem 'Z:\claude-sota-installed\.claude\plugins\cache\context-mode\context-mode' -Directory |
    Sort-Object Name -Descending | Select-Object -First 1 |
    ForEach-Object { Join-Path $_.FullName 'hooks\hooks.json' }
if (Test-Path $hooksFile) {
    $c = Get-Content $hooksFile -Raw
    $fnm = ([regex]::Matches($c, 'fnm_multishells')).Count
    Write-Host "context-mode hooks.json fnm_multishells count: $fnm (expect 0)"
}
```

---

## Rollback Procedure

If any plugin reinstall introduces a regression:

```powershell
# 1. Restore git stash (recovers any file-level changes)
git -C Z:\claude-sota-installed stash pop

# 2. The prior cache dirs are DELETED — to restore, either:
#    (a) Re-install with pinned version from pre-snapshot tag, OR
#    (b) git clone the plugin repo at the pre-drift SHA and manually place
#        under .claude/plugins/cache/<plugin>/<version>/

# 3. Load failures from missing cache: restart CC session with
#    CLAUDE_CODE_PLUGIN_KEEP_MARKETPLACE_ON_FAILURE=1 (already set in settings.json)
#    to prevent marketplace record removal on plugin load failure.
```

---

## Operator Sign-Off Required

This operation deletes plugin cache directories. Risks:
- Active CC sessions lose plugin functionality mid-task
- reinstall may pull a different (newer) upstream SHA than expected
- context-mode reinstall requires immediate repatch-context-mode-hooks-json.ps1 re-run

**Do NOT execute without closing all active CC sessions first.**
**Authorize by setting OPERATOR_SIGN=W341-Q2 and running the batch sequence.**
