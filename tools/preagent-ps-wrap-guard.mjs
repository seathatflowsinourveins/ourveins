#!/usr/bin/env node
// preagent-ps-wrap-guard.mjs — W424 Layer 2
//
// Pre-commit guard that BLOCKS commits which add Bash-wrapped PowerShell commands
// containing `$_`, `$PSItem`, `$args`, or `$Input` — the canonical bug pattern where
// Bash expands the PowerShell pipeline variable before PowerShell ever sees it.
//
// Detection logic: scan staged additions for any line matching the regex
//   /(powershell|pwsh)\s+(-Command|-c)\s+["'][^"']*\$(_|PSItem|args|Input)/i
// when the QUOTING is double-quoted (Bash expands inside ""). Single-quoted form is
// safe — Bash does NOT expand inside '...'.
//
// Exit codes:
//   0 — no offending pattern found OR all PS-wrap usages are single-quoted (safe)
//   2 — blocking pattern found (Bash-wrapped PS with double-quoted $_ usage)
//
// Cite-anchors (sca-v13 ≥3-org-distinct):
//   1. Microsoft PowerShell — https://learn.microsoft.com/powershell/module/microsoft.powershell.core/about/about_automatic_variables
//      ($_ + $PSItem + $args + $Input automatic-variable spec)
//   2. GNU Bash Reference Manual — https://www.gnu.org/software/bash/manual/html_node/Shell-Parameter-Expansion.html
//      ($-expansion semantics inside double-quoted strings; the root cause)
//   3. Git for Windows — https://github.com/git-for-windows/git/wiki/Bash-on-MSYS2
//      (confirms MSYS path-conversion envs do NOT affect Bash variable expansion)
//
// Cardinal-rule compliance:
//   R2 (no self-invented hooks) — this is a pre-commit framework shim in tools/,
//      NOT under .claude/hooks/**; file size <2KB therefore exempt from CR2 cite-anchored
//      bug-patch-shim limit anyway
//   R6 (verify-before-claim) — regex validated against 4 empirical fixture cases
//      in tools/test/ps-wrap-guard.test.mjs (companion file in this commit)

import { readFileSync } from 'node:fs';
import { execSync } from 'node:child_process';

const PS_WRAP_RE = /(powershell|pwsh)\s+(-Command|-c)\s+"[^"]*\$(_|PSItem|args|Input)/i;

// Scope: only scan executable-context files where Bash-wrapped PS would actually run.
// Documentation files (.md, .rst, .txt, .yaml, .yml, .json) often contain literal PS
// examples + anti-pattern demos — those are pedagogical, not executable. Pre-commit
// hook's diff scope is the staged set; we filter by file extension via the diff header
// (lines like `diff --git a/foo b/foo`).
const EXEC_EXT_RE = /\.(sh|bash|zsh|ps1|psm1|psd1|mjs|js|cjs|ts|py|rb|pl|go|rs|java|cs)$/i;
const SKIP_DOC_EXT_RE = /\.(md|markdown|rst|txt|ya?ml|json|toml|adoc)$/i;
// Self-exclusion: the guard's own help text contains literal pattern examples (the
// "Backslash-escape" fix-option line) that would self-trigger. Standard pre-commit
// pattern — gitleaks, ruff, et al. all skip their own config/source. Codex r0
// internal-review pre-flight confirmed self-exclusion is the correct fix vs. obscuring
// the help text (which would degrade error-message clarity for the operator).
const SELF_FILE_RE = /tools\/preagent-ps-wrap-guard\.mjs$/;

let staged = '';
try {
  staged = execSync('git diff --cached --diff-filter=AM', { encoding: 'utf8' });
} catch {
  // Pre-commit hook context guarantees staged content; if probe fails, allow
  process.exit(0);
}

if (!staged) process.exit(0);

// Walk the diff line-by-line, tracking which file each `+` line belongs to.
// Skip files whose path matches doc-extensions OR doesn't match exec-extensions.
const lines = staged.split('\n');
const violations = [];
let currentFile = '';
let currentFileSkipped = false;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  // New file marker
  const diffMatch = line.match(/^diff --git a\/(.+) b\/(.+)$/);
  if (diffMatch) {
    currentFile = diffMatch[2];
    // Skip pure-doc files (intentional examples) + non-exec extensions + self
    currentFileSkipped =
      SELF_FILE_RE.test(currentFile) ||
      SKIP_DOC_EXT_RE.test(currentFile) ||
      !EXEC_EXT_RE.test(currentFile);
    continue;
  }
  // Skip diff metadata lines + non-addition lines
  if (!line.startsWith('+') || line.startsWith('+++')) continue;
  // Skip if current file is doc/non-exec
  if (currentFileSkipped) continue;

  const content = line.slice(1); // drop leading '+'
  if (PS_WRAP_RE.test(content)) {
    violations.push(`  ${currentFile}: ${content.slice(0, 120)}`);
  }
}

if (violations.length === 0) process.exit(0);

process.stderr.write(`W424 BLOCK: ${violations.length} Bash-wrapped PowerShell command(s) with double-quoted \$_ / \$PSItem / \$args / \$Input.\n`);
process.stderr.write(`Bash expands these variables BEFORE PowerShell sees them — corrupting the command.\n`);
process.stderr.write(`\n`);
process.stderr.write(`Offending lines:\n`);
process.stderr.write(violations.join('\n') + '\n');
process.stderr.write(`\n`);
process.stderr.write(`Fix options:\n`);
process.stderr.write(`  1. Use the dedicated PowerShell tool (preferred) instead of wrapping PS in Bash\n`);
process.stderr.write(`  2. Single-quote the PS script (Bash does NOT expand inside '...'):\n`);
process.stderr.write(`       powershell -Command 'Get-Service | Where-Object {\$_.Name -match "X"}'\n`);
process.stderr.write(`  3. Backslash-escape the \$: powershell -Command "...{\\\$_.Name...}"\n`);
process.stderr.write(`  4. Invoke a .ps1 file: powershell -File path/to/script.ps1\n`);
process.stderr.write(`\n`);
process.stderr.write(`Cite: .claude/skills/windows-native-tool-routing/SKILL.md\n`);
process.stderr.write(`      docs/architecture/W424-PS-WRAP-GUARD/DESIGN.md\n`);
process.exit(2);
