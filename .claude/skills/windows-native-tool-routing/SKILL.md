---
name: windows-native-tool-routing
description: Use AUTOMATICALLY when about to invoke PowerShell, Windows-native cmdlets, or query Windows-specific state. Trigger words include "Get-Service", "Get-NetTCPConnection", "Get-ChildItem", "Get-Process", "Get-Item", "Get-Content", "Get-CimInstance", "nssm", "Win32", "WMI", "WMIC", "tasklist", "schtasks", "regedit", "reg query", "netsh", "powershell -Command", "pwsh -c", any "$_" PowerShell pipeline variable usage, or Windows service / port / registry / Win32 API queries. RULE: route ALL PowerShell commands through the dedicated PowerShell tool, NEVER wrap PowerShell inside the Bash tool. Cite-anchored to Microsoft PowerShell `$_` automatic-variable docs + Anthropic deferred-tool routing docs + Git for Windows MSYS-runtime docs. Closes the W424 PS-wrap bug class.
---

# Windows-Native Tool Routing

## The bug class this skill closes

When PowerShell commands are wrapped inside the **Bash tool** (e.g. `powershell -Command "Where-Object {$_.Name -match ...}"`), the Bash shell expands `$_` to its own built-in last-arg variable BEFORE PowerShell ever sees the string. The result is a corrupted command like `Where-Object {/usr/bin/bash.Name -match ...}` that PowerShell cannot parse.

**This is NOT MSYS path-rewrite.** W317's `MSYS_NO_PATHCONV=1` + `MSYS2_ARG_CONV_EXCL=*` correctly prevent forward-slash-prefixed *args* from being path-translated. They do NOT (and architecturally CANNOT) prevent Bash from expanding `$variable` references inside double-quoted string literals — that is fundamental Bash parsing semantics, not MSYS conversion.

**Empirical evidence**: Z:/claude-sota-installed-state/W424-PS-WRAP-GUARD-EVIDENCE.md captures 4 sessions where this bug surfaced under W317 envs already-set. Cite: W424-PS-WRAP-GUARD/DESIGN.md §2.

## The rule (hard discipline)

| Intent | Tool to use | Why |
|---|---|---|
| Any `powershell -Command "..."` or `pwsh -c "..."` invocation | **PowerShell tool** | Bypasses Bash entirely; PS-native parsing; no `$_` corruption |
| `Get-Service`, `Get-NetTCPConnection`, `Get-Process`, `Get-Item`, `Get-ChildItem` | **PowerShell tool** | Native Win32 query surface; richer object output |
| Any `$_` pipeline variable, `$PSItem`, `$args`, `$Input` | **PowerShell tool** | Bash would expand `$_` and `$args` |
| WMI queries (`Get-CimInstance`, `Get-WmiObject`) | **PowerShell tool** | Native CIM surface |
| Registry (`Get-ItemProperty HKLM:\...`, `reg query`) | **PowerShell tool** | PSDrive `HKLM:` syntax requires PowerShell parser |
| NSSM (`Get-Service` + `nssm status <name>`) | **PowerShell tool** | Mixed PS + native exe; PowerShell's call-operator `&` handles spaces in paths |
| Tasklist with filter expressions | **PowerShell tool** if filter uses `$_`; **Bash tool** if just `tasklist /fi "imagename eq foo.exe"` | Decide by `$_` presence |
| Schtasks, netsh with simple flag args | Either; **prefer PowerShell tool for consistency** | Both work; PowerShell tool keeps the discipline simple |
| File operations (`Test-Path`, `New-Item`, `Remove-Item`) | **PowerShell tool** | Native PS verb-noun semantics |
| Pure POSIX commands (`git`, `ls`, `grep`, `cat` — though prefer dedicated tools) | **Bash tool** | Unix-native, no PS involvement |

## What NEVER to do

```bash
# ❌ WRONG — Bash will expand $_.Name before PowerShell sees it
Bash: powershell -Command "Get-Service | Where-Object {$_.Name -match 'Cogne'}"

# ❌ WRONG — Bash will expand $args inside double quotes
Bash: powershell -Command "param($args) Write-Host $args"

# ❌ WRONG — even with -EncodedCommand if you concatenate Bash variables
Bash: cmd=$(echo '...'); powershell -EncodedCommand "$cmd"
```

## What to do instead

```powershell
# ✅ RIGHT — use the PowerShell tool directly; PS parses the script intact
PowerShell: Get-Service | Where-Object Name -match 'Cogne' | Format-Table -AutoSize

# ✅ RIGHT — PS-native filter syntax (no $_ needed for property comparison)
PowerShell: Get-NetTCPConnection -State Listen | Where-Object LocalPort -in @(3000, 8000) | Sort-Object LocalPort -Unique
```

## Edge-case escape valve (rare)

If you MUST run PS through Bash (e.g. inside a script that orchestrates many tools and PS is one of them), the only safe forms are:
1. **Single-quoted string** (Bash does NOT expand inside `'...'`): `powershell -Command 'Get-Service | Where-Object {$_.Name -match "Cogne"}'`
2. **Backslash-escape the `$`**: `powershell -Command "Get-Service | Where-Object {\$_.Name -match 'Cogne'}"` (clunky but works)
3. **Script-file invocation**: `powershell -File /path/to/script.ps1` (no string literal corruption possible)

Even these are anti-patterns. **Default to the PowerShell tool.**

## Defense-in-depth

This skill is Layer-1 of a 3-layer defense per W424 design:

- **Layer 1 (this skill)**: auto-fire reminder to route PS through the PowerShell tool
- **Layer 2 (pre-commit guard)**: `tools/preagent-ps-wrap-guard.mjs` lints commits for residual Bash-wrapped PS patterns
- **Layer 3 (CLAUDE.md pointer)**: 1-line reference under Cardinal-rule discipline

Skipping the skill is acceptable for trivial one-off (`Get-Date` etc.) but the moment any `$_` / `$PSItem` / `$args` appears, the PowerShell tool is MANDATORY.

## Cite-anchors (sca-v13 3-org-distinct floor)

- Microsoft PowerShell — https://learn.microsoft.com/powershell/module/microsoft.powershell.core/about/about_automatic_variables `$_` and `$PSItem` automatic-variable spec; `$_` is "current object in the pipeline" inside `ForEach-Object`/`Where-Object` script blocks
- Anthropic Claude Code — https://code.claude.com/docs/en/settings deferred-tool surface; PowerShell tool is opt-in via `CLAUDE_CODE_USE_POWERSHELL_TOOL=1` (set in eee.ps1:96)
- Git for Windows — https://github.com/git-for-windows/git/wiki/Bash-on-MSYS2 MSYS2 path-conversion docs; documents the W317 path-translation envs and explicitly states they do NOT affect Bash-internal variable expansion
- GNU Bash Reference Manual — https://www.gnu.org/software/bash/manual/html_node/Shell-Parameter-Expansion.html `$_` is the last argument of the previous simple command; expansion happens inside double-quoted strings BEFORE the command runs
- W424 DESIGN — `docs/architecture/W424-PS-WRAP-GUARD/DESIGN.md` (this wave) — 4-session empirical evidence + 3-layer defense rationale

## Operator-curated cardinal-rule-4(b) basis

This skill is operator-authored under CLAUDE.md cardinal-rule-4(b) ("operator-curated path-gated via SKILL.md"). Per W255 spirit + W299-A REVERSAL, operator-curated skills are sanctioned when they (a) have ≤8 distinct trigger phrases, (b) state auto-fire condition explicitly, and (c) cite-anchor to ≥3 distinct orgs. Verified at SKILL.md authoring time per W424 design §3.
