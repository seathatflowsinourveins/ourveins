# W318 — Full System / Ecosystem Unleash Wave

**Date launched**: 2026-05-19
**Trigger**: Operator directive — "hunt all the silent errors, fallback, shell command, CLI tools, with SOTA repos, awesome list repos, full gap resolute and expanding to entire system, ecosystem".
**Predecessor**: W317-FULL-MSYS-FIX-WAVE (MSYS POSIX-form path leak, SHIPPED 2026-05-19).

## Wave structure (6 parallel streams; 6 Agent calls in 1 message — 100% parallel_ratio)

| Stream | Agent type | File | Scope |
|---|---|---|---|
| 1 | `pr-review-toolkit:silent-failure-hunter` (SOTA specialist) | `STREAM-1-SILENT-FAILURES.md` | Comprehensive silent-failure + inadequate-error-handling audit across `.claude/settings.json` hooks, `tools/eee.ps1`, all bug-patch shims, MCP configs |
| 2 | `shell-scripting:bash-pro` (SOTA specialist) | `STREAM-2-SHELL-DEFENSIVE.md` | Shell + PowerShell defensive-scripting audit — shellcheck, `set -euo pipefail`, StrictMode, exit-code propagation |
| 3 | Fork (context-inheriting) | `STREAM-3-CLI-AWESOME-GAP.md` | CLI inventory + cross-reference against `awesome-claude-code`, `awesome-cli-apps`, `awesome-shell`, `awesome-nodejs`, `awesome-python`, `awesome-windows-cli` — gap recommendations |
| 4 | Fork | `STREAM-4-PATH-ENV-CONSISTENCY.md` | Env-var matrix across `settings.json` + `eee.ps1` + `.mcp.json` + `CLAUDE.local.md`; conflict + path-existence + permission audit |
| 5 | Fork | `STREAM-5-MCP-DEEP-AUDIT.md` | Per-MCP-server liveness + version-freshness + fallback-behavior + CR-9 compliance + auth handling |
| 6 | `claude-code-guide` (SOTA specialist) | `STREAM-6-CC-ECOSYSTEM.md` | Claude Code + Anthropic SDK + codex ecosystem feature-enablement matrix, upstream issue tracking |

## Why this wave?

W317 fixed the visible MSYS Stop-hook error and shipped 3-layer env overrides + BASH_ENV shim. That stops the leak at one specific symptom. The operator's W318 directive demands:

1. **Silent-error hunting** — beyond W314-r2-β's 4-finding fix, find every remaining `|| true` / `exit 0 # after error` / `-ErrorAction SilentlyContinue` / empty `catch` across the runtime
2. **Shell defensive practices** — every bash/PS script gets shellcheck + StrictMode discipline
3. **CLI tool SOTA upgrade** — cross-reference against community awesome-lists to find tools we should have but don't (or have but deprecated)
4. **Path/env consistency** — drift between settings.json, eee.ps1, CLAUDE.local.md, .mcp.json
5. **MCP audit** — per-server live-state + version-vs-latest + fallback-behavior; close W315-r2's known `github.search_repositories` silent-fallback (4th-time confirmed)
6. **CC ecosystem** — feature-enablement gap, upstream-issue tracking, codex gate health

Together: this wave hardens the runtime so future sessions launch into a SOTA-disciplined environment with no silent failures, no path drift, no missing SOTA tooling, no stale MCP, no overlooked CC features.

## Constraints (forks honor these)

- **Read-only audit** — no modifications by streams; parent orchestrator applies fixes post-synthesis
- **Cite file:line** for every finding
- **Word limits** per stream prompt to keep synthesis tractable
- **SOTA agent invocation** where domain expertise applies (`silent-failure-hunter`, `bash-pro`, `claude-code-guide`)

## Post-fork synthesis

When all 6 return:
1. Verify each fork's written artifact exists at expected path
2. Cross-check Stream 4's env-conflict findings against Stream 5's MCP-auth (overlap surface)
3. Stage Stream 1 + 2 fixes via Edit (low-risk additive changes)
4. Stage Stream 3 CLI installs as commitable patch (per allow-list in settings.json)
5. Stage Stream 5 MCP fixes (version bumps + CR-9 compliance)
6. Stage Stream 6 feature-enablement settings.json deltas
7. Write `CLOSURE-SYNTHESIS.md`

## Cardinal-rule compliance

- **R1**: All recommended installs go through trusted sources (per allow-list patterns)
- **R2**: No new project-owned hook bodies — bug-patch shims only with cite-anchor + ≤2 KB
- **R3**: Agent dispatches use installed SOTA agents OR documented forks
- **R4**: `self_invented_count: 0` preserved — no `.claude/rules/*.md` introduced
- **R5**: Safety via CC permissions + sandboxing only
