# Operator PATH discoverability for `eee` launcher

> Extracted from `CLAUDE.md` per /doctor 40k-char gate. Cite-anchors and content
> preserved verbatim. Cardinal-rule-1 + cardinal-rule-8 conformance: TIER-1
> Microsoft Learn anchors retained inline; this file is bootstrap-class
> scaffolding (same class as the section it replaces) per cardinal-rule-5
> §"Bootstrap-only files".

The `bin/eee.cmd` shim ships with this runtime but is NOT auto-discoverable from a fresh PowerShell session until the operator adds `Z:\claude-sota-installed\bin` to PATH.

**Canonical install (run ONCE)**:
```powershell
pwsh -NoProfile -ExecutionPolicy Bypass -File Z:\claude-sota-installed\bin\install-path.ps1
```

This script (`bin/install-path.ps1`, Wave 50 Fire 40 ship) self-diagnoses 4 probes (shim presence / User-scope Path state / Process-scope Path state / install action), applies User-scope `SetEnvironmentVariable` if absent (no-op if present), and reports the exact next step depending on state. Cite-anchored to Microsoft Learn TIER-1 PowerShell 7.6 docs `https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_environment_variables?view=powershell-7.6` §"Create persistent environment variables in Windows" §"Set environment variables with SetEnvironmentVariable()" [VERIFIED 2026-05-06 via WebFetch].

**After running install-path.ps1, pick ONE path to launch**:

```powershell
# Option A — current session, immediate (Process-scope override):
$env:Path = "Z:\claude-sota-installed\bin;$env:Path"
eee
```

```powershell
# Option B — clean fresh shell (recommended; picks up persistent User Path):
# 1. Close ALL PowerShell + Windows Terminal windows
# 2. Re-open from Start Menu / Explorer (NOT from a parent shell)
# 3. eee
```

**Why the shell-restart caveat exists**: Windows reads User-scope Path **at process start**, not on registry change. Existing PowerShell sessions inherit a snapshot from their parent process and don't refresh. This is a Windows-platform quirk, not a bug in the install. The `install-path.ps1` script's [3/4] probe surfaces this state explicitly so operators don't get confused when `eee` resolves in some shells but not others.

**Scope discipline** (per Microsoft Learn §"On Windows, environment variables can be defined in three scopes"):
- **User** scope (used by `install-path.ps1`): persists across PowerShell sessions for the operator only; no admin rights needed
- **Machine** scope: persists across sessions for ALL users; requires admin rights; reserved for system-wide installs (Tier 0 binaries like `claude.exe`, `codex.exe`); do NOT use for `eee` launcher
- **Process** scope: current PowerShell session only; Option A above

**Anti-pattern**: do NOT modify `Z:\claude-sota\bin` (sibling) PATH entry to point at installed runtime — that breaks sibling launcher (`sss`) discoverability. `install-path.ps1` appends `Z:\claude-sota-installed\bin` as a SEPARATE PATH entry. Both can coexist; `sss` and `eee` are distinct shim names.

**Pre-condition for `eee` to actually launch successfully** (after PATH is correct): hard-gate per `tools/eee.ps1:T0.1-T0.5` — claude.exe native install + 3 plugins enabled + 3 plugin caches present + python venv at `Z:/venvs/claude` + codex CLI on PATH. If any FAIL, `eee` exits 1 with error list. Use `EEE_BOOTSTRAP=1` env to bypass during initial install per cardinal-rule-7 graduated-unleash phase 1.
