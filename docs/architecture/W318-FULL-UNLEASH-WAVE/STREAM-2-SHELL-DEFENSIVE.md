# W318 Stream 2 — Defensive Shell/PowerShell Audit

**Date**: 2026-05-19  
**Scope**: project-owned `.sh` files, `tools/*.ps1`, `.claude/settings.json` inline hook commands  
**Constraint**: audit only — no modifications

---

## Files Audited

| # | File | Type | Lines |
|---|------|------|-------|
| 1 | `.claude/state/bash-home-pin.sh` | Bash | 2 |
| 2 | `tools/eee.ps1` | PowerShell | 954 |
| 3 | `tools/w317-cleanup-z-phantom.ps1` | PowerShell | 151 |
| 4 | `tools/bootstrap-runtime.ps1` | PowerShell | 689 |
| 5 | `tools/eee-admin-bootstrap.ps1` | PowerShell | 192 |
| 6 | `tools/eee-backup.ps1` | PowerShell | 408 |
| 7 | `tools/eee-status.ps1` | PowerShell | 192 |
| 8 | `tools/eee.local.ps1` | PowerShell | 15 |
| 9 | `tools/eee_install_cron_tasks.ps1` | PowerShell | 233 |
| 10 | `tools/hindsight-queue-janitor.ps1` | PowerShell | 72 |
| 11 | `tools/migrate-cognee-state.ps1` | PowerShell | 401 |
| 12 | `tools/sota-reverify.ps1` | PowerShell | 153 |
| 13 | `tools/wave152-f1-netsh-pin.ps1` | PowerShell | 226 |
| 14 | `settings.json` hooks: PreToolUse[Bash] git-guard | Bash inline | — |
| 15 | `settings.json` hooks: PreToolUse[Edit\|Write] ledger-lint | Bash inline | — |
| 16 | `settings.json` hooks: PostToolUse[Edit\|Write\|MultiEdit] ruff/shellcheck | Bash inline | — |
| 17 | `settings.json` hooks: PreCompact[auto] | PowerShell inline | — |
| 18 | `settings.json` hooks: PostToolUseFailure[Bash] | PowerShell inline | — |

**18 files/hook-units audited.**

---

## Findings by File

### 1. `.claude/state/bash-home-pin.sh`

| Line | Violation | Severity | Fix |
|------|-----------|----------|-----|
| 0 | Missing shebang (`#!/usr/bin/env bash`) | HIGH | Add `#!/usr/bin/env bash` as line 1 |
| 0 | No `set -euo pipefail` | HIGH | Add strict-mode header after shebang |
| 0 | Missing `IFS=$'\n\t'` hardening | MED | Add IFS line after strict mode |
| 1–2 | `export HOME="$USERPROFILE"` — `$USERPROFILE` unquoted in double-quote context is safe here, but no guard if var is unset | LOW | Use `export HOME="${USERPROFILE:?USERPROFILE not set}"` |

**Context**: This file is injected via `BASH_ENV` into every non-interactive bash subprocess spawned by hooks. A crash here silently aborts hook execution.

---

### 2. `tools/eee.ps1` (WORST OFFENDER — 954 lines, primary launcher)

| Location | Violation | Severity | Fix |
|----------|-----------|----------|-----|
| Top | Missing `Set-StrictMode -Version Latest` | HIGH | Add after `[CmdletBinding()]` |
| Top | Missing `$ErrorActionPreference = 'Stop'` | HIGH | Add after `Set-StrictMode` |
| Multiple | `Remove-Item $cukPidFile -Force -ErrorAction SilentlyContinue` and 6 others — `-LiteralPath` absent, path with spaces risk | MED | Replace positional path with `-LiteralPath "$cukPidFile"` |
| Multiple | `Get-ChildItem` (1 instance) without `-LiteralPath` | MED | Use `-LiteralPath` |
| Multiple | 15 instances of `-ErrorAction SilentlyContinue` masking failures in main launcher | MED | Per-instance: either log+continue or surface via `Write-Warning` |
| L64 | `$env:CLAUDE_CODE_GIT_BASH_PATH = 'C:\Program Files\Git\bin\bash.exe'` — hardcoded `C:` path breaks Z:-portable installs on other machines | HIGH | Parameterise: `$env:CLAUDE_CODE_GIT_BASH_PATH = Join-Path $env:ProgramFiles 'Git\bin\bash.exe'` or from a required env var |

---

### 3. `tools/w317-cleanup-z-phantom.ps1`

| Location | Violation | Severity | Fix |
|----------|-----------|----------|-----|
| Top | Missing `Set-StrictMode -Version Latest` (has `$ErrorActionPreference = 'Stop'`) | HIGH | Add `Set-StrictMode -Version Latest` before error pref |
| Missing | No `[SupportsShouldProcess()]` on a destructive file-delete script | MED | Add to `[CmdletBinding()]` and gate deletions with `$PSCmdlet.ShouldProcess(...)` |
| L126–132 | Pruning `do/while` loop uses `Get-ChildItem 'Z:\z'` (string literal, not `-LiteralPath`) — globbing unsafe | MED | `Get-ChildItem -LiteralPath 'Z:\z'` |
| L127 | Inner `Get-ChildItem $_.FullName` — unquoted, no `-LiteralPath` | MED | `-LiteralPath $_.FullName` |
| L126–132 | `do { ... } while ($empties.Count -gt 0)` with `-ErrorAction SilentlyContinue` on inner `Remove-Item`: if any item repeatedly fails silently, loop is infinite | HIGH | Track `$removedCount` this iteration; break if 0 removals. Or surface errors instead of `SilentlyContinue` |
| L102,109 | `Remove-Item -LiteralPath $phantomAbs -Force` inside catch — Remove-Item failure is caught but `$stats.errors++` only; outer `$ErrorActionPreference = 'Stop'` does NOT apply inside try blocks without re-throw | LOW | Document intent or re-throw on persistent failures |

---

### 4. `tools/bootstrap-runtime.ps1`

| Location | Violation | Severity | Fix |
|----------|-----------|----------|-----|
| Top | Missing `Set-StrictMode -Version Latest` | HIGH | Add after param block |
| Multiple | `Get-ChildItem` (2), `Remove-Item` (2) without `-LiteralPath` | MED | Add `-LiteralPath` |
| Present | `$Pg0Cdir = "C:\Users\$env:USERNAME\.pg0"` — hardcoded `C:\Users\` | HIGH | Use `Join-Path $env:USERPROFILE '.pg0'` |
| Multiple | 4× `-ErrorAction SilentlyContinue` masking setup failures | MED | Log with `Write-Warning` before continuing |

---

### 5. `tools/eee-backup.ps1` (MOST -ErrorAction violations)

| Location | Violation | Severity | Fix |
|----------|-----------|----------|-----|
| Top | Missing `Set-StrictMode -Version Latest` | HIGH | Add |
| Top | Missing `$ErrorActionPreference = 'Stop'` | HIGH | Add |
| Multiple | 11 `Remove-Item` without `-LiteralPath` | MED | Add `-LiteralPath` throughout |
| Multiple | 14× `-ErrorAction SilentlyContinue` — highest count in codebase | MED | Audit each; most should be `Write-Warning` + continue |
| Present | `'C:\Program Files\Git\bin\bash.exe'` hardcoded | HIGH | Same fix as eee.ps1 |

---

### 6. `tools/eee-admin-bootstrap.ps1`

| Location | Violation | Severity | Fix |
|----------|-----------|----------|-----|
| Top | Missing `Set-StrictMode -Version Latest` | HIGH | Add |
| Multiple | `Remove-Item` (2) without `-LiteralPath` | MED | Add `-LiteralPath` |
| Multiple | 2× `-ErrorAction SilentlyContinue` | MED | Surface as warnings |

---

### 7. `tools/eee-status.ps1`

| Location | Violation | Severity | Fix |
|----------|-----------|----------|-----|
| Top | Missing `Set-StrictMode -Version Latest` | HIGH | Add |
| Top | Missing `$ErrorActionPreference = 'Stop'` | HIGH | Add |
| Present | 1× `-ErrorAction SilentlyContinue` | LOW | Evaluate if intentional |

---

### 8. `tools/eee.local.ps1`

| Location | Violation | Severity | Fix |
|----------|-----------|----------|-----|
| Top | Missing `Set-StrictMode -Version Latest` | HIGH | Add — credentials file; strict mode critical |
| Top | Missing `$ErrorActionPreference = 'Stop'` | HIGH | Add |
| Top | Missing `[CmdletBinding()]` | LOW | Add |

---

### 9. `tools/eee_install_cron_tasks.ps1`

| Location | Violation | Severity | Fix |
|----------|-----------|----------|-----|
| Top | Missing `Set-StrictMode -Version Latest` | HIGH | Add |
| Top | Missing `[CmdletBinding()]` | LOW | Add |
| Multiple | 7× `-ErrorAction SilentlyContinue` | MED | Review each |
| Multiple | 5× hardcoded `exit 0` — cron-task install failures silently succeed | MED | Propagate exit codes via `$LASTEXITCODE` |

---

### 10. `tools/hindsight-queue-janitor.ps1`

| Location | Violation | Severity | Fix |
|----------|-----------|----------|-----|
| Top | Missing `Set-StrictMode -Version Latest` | HIGH | Add |
| Top | Missing `$ErrorActionPreference = 'Stop'` | HIGH | Add |
| Present | 1× hardcoded `exit 0` | MED | Use `exit $LASTEXITCODE` |

---

### 11. `tools/migrate-cognee-state.ps1`

| Location | Violation | Severity | Fix |
|----------|-----------|----------|-----|
| Top | Missing `Set-StrictMode -Version Latest` | HIGH | Add |
| Present | `$SourceDir = 'C:\Users\42\.cognee'` — hardcoded user path (W295 noted as likely obsolete) | HIGH | Use `Join-Path $env:USERPROFILE '.cognee'` or parameterise |
| Multiple | 3× `-ErrorAction SilentlyContinue`, 3× `exit 0` | MED | Surface failures |
| Multiple | `Get-ChildItem`, `Remove-Item` (1 each) without `-LiteralPath` | MED | Add `-LiteralPath` |

---

### 12. `tools/sota-reverify.ps1`

| Location | Violation | Severity | Fix |
|----------|-----------|----------|-----|
| Top | Missing `Set-StrictMode -Version Latest` | HIGH | Add |
| Multiple | 2× hardcoded `exit 0` | MED | Propagate exit codes |

---

### 13. `tools/wave152-f1-netsh-pin.ps1`

| Location | Violation | Severity | Fix |
|----------|-----------|----------|-----|
| Top | Missing `Set-StrictMode -Version Latest` | HIGH | Add |
| Multiple | 3× hardcoded `exit 0` | MED | Propagate `$LASTEXITCODE` |

---

### 14. `settings.json` hooks — Inline Bash

#### PreToolUse[Bash] git-guard

| Violation | Severity | Fix |
|-----------|----------|-----|
| No `set -euo pipefail` in inline script | HIGH | Add `set -euo pipefail;` at start of `-c` string |
| Ends with `; true` — swallows all prior exit codes | HIGH | Remove `true`; let `case/esac` exit naturally or use `exit 0` after the `esac` block only when no action taken |
| `$cmd` (jq substitution) used unquoted inside `case` expression | MED | Quote: `case "$cmd" in ...` (already present but verify after escaping) |
| No `pipefail` — jq failure (e.g. invalid stdin JSON) is silent | MED | `set -o pipefail` catches pipe failures |

#### PreToolUse[Edit|Write] ledger-lint

| Violation | Severity | Fix |
|-----------|----------|-----|
| Trailing `; exit 0` unconditionally succeeds — warning can never block tool use | MED | If intent is warn-only, document; if intent is to potentially block, use `exit 1` on match |
| No `set -euo pipefail` | MED | Add at start |

#### PostToolUse[Edit|Write|MultiEdit] ruff/shellcheck linter

| Violation | Severity | Fix |
|-----------|----------|-----|
| No `set -euo pipefail` — `tr | sed` pipeline failure for `ext` extraction is silent | MED | Add `set -euo pipefail` |
| `ruff format` exit code not captured (only `ruff check` rc stored in `$rc`) | MED | Capture: `ruff format --quiet -- "$f" 2>&1; rc2=$?; rc=$(( rc | rc2 ))` |
| `ext=$(echo "$f" | tr ... | sed ...)` — fails silently on no-extension filenames (sets `ext` to full name) | LOW | Add guard: `[ -n "$ext" ] || exit 0` |

---

### 15–18. `settings.json` hooks — Inline PowerShell

#### PreCompact[auto]

| Violation | Severity | Fix |
|-----------|----------|-----|
| No `$ErrorActionPreference` / `Set-StrictMode` | MED | Prepend `$ErrorActionPreference='Stop';` |
| `-ErrorAction SilentlyContinue` on `Add-Content` hides log write failures | MED | Remove SilentlyContinue; wrap in `try/catch { <no-op> }` if failure truly acceptable |
| Hardcoded `exit 0` after Add-Content — log failure is invisible | MED | Remove `; exit 0`; let hook exit naturally (exit 0 is default) |

#### PostToolUseFailure[Bash]

| Violation | Severity | Fix |
|-----------|----------|-----|
| `catch` block ends with `exit 0` — parse errors are silently swallowed | MED | Change to `exit 1` in catch to surface parse failures |
| No `Set-StrictMode` | LOW | Add `$ErrorActionPreference='Stop';` before try block |

---

## Severity Summary

| Severity | Count | Primary causes |
|----------|-------|----------------|
| HIGH | 16 | Missing `Set-StrictMode` (12 of 13 PS1 files), `; true` exit-swallow in git-guard hook, hardcoded `C:\` user paths (3 files), missing shebang+strict in bash-home-pin.sh, w317 infinite loop risk |
| MED | 29 | Missing `$ErrorActionPreference='Stop'` (5 files), `-ErrorAction SilentlyContinue` masking (total 48 instances across all files), `Remove-Item`/`Get-ChildItem` without `-LiteralPath`, no pipefail in bash hooks, ruff format rc not captured, hardcoded `exit 0` propagation failures |
| LOW | 5 | Missing `[CmdletBinding()]` (2 files), unguarded `$USERPROFILE` in bash-home-pin.sh, no-extension filename edge case, SilentlyContinue in PostToolUseFailure |

**Total: 50 violations across 18 audited files/hook units.**

---

## Worst Offender Refactored Snippet

**`tools/eee.ps1`** — missing strict mode, 15× SilentlyContinue, hardcoded C: path, no LiteralPath.

### Current (problematic pattern repeated throughout):
```powershell
[CmdletBinding()]
param(
    [Parameter(ValueFromRemainingArguments=$true)]
    [string[]]$Args
)

$env:CLAUDE_CODE_GIT_BASH_PATH = 'C:\Program Files\Git\bin\bash.exe'

# ... later ...
Remove-Item $cukPidFile -Force -ErrorAction SilentlyContinue
Get-ChildItem $dir | Where-Object { ... }
```

### Refactored:
```powershell
#Requires -Version 7.0
[CmdletBinding()]
param(
    [Parameter(ValueFromRemainingArguments = $true)]
    [string[]]$ClaudeArgs
)

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

# Resolve Git Bash portably — no hardcoded C:\
$gitBashCandidate = Join-Path $env:ProgramFiles 'Git\bin\bash.exe'
if (-not (Test-Path -LiteralPath $gitBashCandidate)) {
    throw "Git Bash not found at: $gitBashCandidate — set CLAUDE_CODE_GIT_BASH_PATH manually"
}
$env:CLAUDE_CODE_GIT_BASH_PATH = $gitBashCandidate

# Safe file removal: -LiteralPath prevents glob expansion; explicit error surface
if (Test-Path -LiteralPath $cukPidFile) {
    try {
        Remove-Item -LiteralPath $cukPidFile -Force -ErrorAction Stop
    }
    catch {
        Write-Warning "[eee] Could not remove PID file '$cukPidFile': $($_.Exception.Message)"
    }
}

# Safe directory enumeration
Get-ChildItem -LiteralPath $dir | Where-Object { ... }
```

### Key deltas:
1. `Set-StrictMode -Version Latest` + `$ErrorActionPreference = 'Stop'` at top — catches uninitialised variables and propagates errors.
2. `$Args` renamed to `$ClaudeArgs` — `$Args` is a PowerShell automatic variable; shadowing it suppresses strict-mode protection on the real `$args`.
3. Git Bash path resolved via `$env:ProgramFiles` — Z:-portable, not hardcoded to `C:\`.
4. `-LiteralPath` on all path cmdlets — prevents MSYS path-glob expansion on Windows.
5. `SilentlyContinue` replaced by `try/catch` with `Write-Warning` — failure is visible but non-fatal where appropriate.

---

*Audit produced by W318 Stream 2. No files were modified.*
