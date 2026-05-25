# W317-D — PreToolUse Grep-Augment Hook Pattern (Paste-Ready DRAFT)

**Wave**: W317
**Stream**: D (GitNexus pattern-extract — pattern #2 of 2)
**Date**: 2026-05-19
**Status**: DRAFT-PASTE-READY — DO NOT auto-apply (CR-2 + CR-5: operator decision before settings.json mutation)

## What this extracts

GitNexus ships a `PreToolUse` hook (`Z:/repos/deps/gitnexus/gitnexus/hooks/claude/gitnexus-hook.cjs` + `pre-tool-use.sh`) that intercepts every `Grep`/`Glob`/`Bash(grep|rg)` invocation, extracts the search pattern, and injects 5-line context-snippets from the GitNexus graph index. The *useful pattern* (license-free, mechanism-only) is the **PreToolUse-Grep-injection contract**: pattern-extract → optional context augmentation → `additionalContext` field in the hook response.

The GitNexus implementation calls `npx -y gitnexus augment <pattern>` (license-blocked binary). Below is a license-free reimplementation that uses *native ripgrep* to provide the 5-line context snippets — no GitNexus binary, no graph index, just a smarter pre-search.

## Mechanism (from GitNexus source — pattern, not code)

1. Hook receives JSON on stdin: `{tool_name, tool_input, cwd}`.
2. If `tool_name in {Grep, Glob, Bash}`:
   - Grep → use `tool_input.pattern` directly
   - Glob → strip glob syntax to extract meaningful name (e.g. `auth*.ts` → `auth`)
   - Bash → only intercept `rg`/`grep` invocations, regex-extract the pattern
3. Skip if pattern is empty or `len < 3`.
4. Run a lightweight side-grep with `-C 2` (2 lines before + after) and return the top 5 lines as `additionalContext`.
5. Return `{hookSpecificOutput: {hookEventName: "PreToolUse", additionalContext: "..."}}`.

## Paste-ready PowerShell hook (license-free reimplementation)

Save as `.claude/hooks/grep-augment-context.ps1` ONLY if operator approves the cardinal-rule-2 exception (project-owned hook). Otherwise, this is a pattern-only document.

```powershell
#!/usr/bin/env pwsh
# W317-D Grep-augment context hook — pattern-extracted from GitNexus
# License-free: uses native rg + no external service.
# Wired in .claude/settings.json as a PreToolUse hook on Grep|Glob|Bash.

$ErrorActionPreference = 'SilentlyContinue'
$input_json = [Console]::In.ReadToEnd()
try {
  $payload = $input_json | ConvertFrom-Json
} catch {
  exit 0
}

$tool = $payload.tool_name
$ti = $payload.tool_input
$cwd = if ($payload.cwd) { $payload.cwd } else { $PWD.Path }
$pattern = $null

switch ($tool) {
  'Grep' { $pattern = $ti.pattern }
  'Glob' {
    $raw = $ti.pattern
    if ($raw -match '[\*\/]([a-zA-Z][a-zA-Z0-9_\-]{2,})') { $pattern = $matches[1] }
  }
  'Bash' {
    $cmd = $ti.command
    if ($cmd -match '\b(rg|grep)\s+(?:-\S+\s+)*[''\"]?([^''\"\s;|>]+)') { $pattern = $matches[2] }
  }
  default { exit 0 }
}

if (-not $pattern -or $pattern.Length -lt 3) { exit 0 }

# Run a 2-context ripgrep, cap at 5 matches
$rg = Get-Command rg -ErrorAction SilentlyContinue
if (-not $rg) { exit 0 }
$snippets = & rg --max-count 1 --max-filesize 200K -C 2 -n --color=never $pattern $cwd 2>$null | Select-Object -First 25

if ($snippets) {
  $ctx = ($snippets -join "`n").Trim()
  $out = @{
    hookSpecificOutput = @{
      hookEventName = 'PreToolUse'
      additionalContext = "Grep-augment context for '$pattern':`n$ctx"
    }
  } | ConvertTo-Json -Depth 5 -Compress
  Write-Output $out
}
exit 0
```

## `.claude/settings.json` wiring (paste-ready — operator decision)

```jsonc
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Grep|Glob|Bash",
        "hooks": [
          {
            "type": "command",
            "command": "pwsh -NoProfile -File .claude/hooks/grep-augment-context.ps1",
            "timeout": 1500,
            "continueOnBlock": true
          }
        ]
      }
    ]
  }
}
```

## Why this is NOT auto-applied

Three cardinal-rule constraints in play:

1. **CR-2** (hooks may only be upstream-plugin hooks OR direct upstream-CLI invocations). A project-owned PowerShell hook is the exact pattern CR-2 forbids unless it qualifies for the documented bug-patch shim exception cite-anchored to an `anthropics/claude-code` issue. **This hook is NOT a bug-patch shim** — it is a user-experience enhancement. Therefore it does NOT qualify for the exception.

2. **CR-5** (safety boundaries via permissions). Adding a PreToolUse hook with `continueOnBlock: true` silently injects context into every Grep — operator should consciously accept the prompt-injection blast radius before wiring.

3. **W255 spirit** (project-owned `.claude/hooks/scripts/*.py` cleanup landed 2026-05-15). This document explicitly does NOT re-introduce the deleted pattern; it documents the *recipe* so the operator can choose whether to add a CR-2 exception with an issue cite.

## Recommendation

**Operator option A** (stay CR-2-compliant): use the `local-cypher-codebase` SKILL.md instead (W317-D pattern #1). It triggers on the same shapes ("find callers of X", "all writers of property Y") without a hook.

**Operator option B** (CR-2 exception with issue cite): if you genuinely want Grep auto-augmentation, file an `anthropics/claude-code` issue requesting "first-class PreToolUse context augmentation primitive" + cite that issue in the hook header, then paste the snippet above. The exception then qualifies under the documented bug-patch-shim carve-out.

**This file remains a draft** until the operator makes the option-A/option-B choice in a separate session.

## References

- GitNexus hook source: `Z:/repos/deps/gitnexus/gitnexus/hooks/claude/gitnexus-hook.cjs:1-200`
- GitNexus pre-tool-use bash variant: `Z:/repos/deps/gitnexus/gitnexus/hooks/claude/pre-tool-use.sh:1-79`
- CCBP hooks doc: `https://docs.anthropic.com/en/docs/claude-code/hooks`
- W255 self-invent cleanup: pre-cleanup commit tagged `pre-W255-cleanup-*`
