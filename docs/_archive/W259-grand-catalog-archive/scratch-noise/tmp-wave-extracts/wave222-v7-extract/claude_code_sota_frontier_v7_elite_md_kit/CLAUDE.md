# Claude Code SOTA Harness Rules

Use this repository as a Claude Code operating guide, not as a bulk-install script.

## Core behavior

- Prefer semantic code retrieval before full-file reads.
- Use `rg`, `fd`, `jq`, `yq`, and `git diff --stat` before broad commands.
- Do not dump full logs. Summarize failures and include the smallest relevant tail.
- Use worktrees for parallel work: one task = one branch = one worktree.
- Use Skills for repeat workflows; keep always-loaded guidance short.
- Use hooks for deterministic enforcement, not reminders.
- Use Codex as a second-model reviewer/rescue worker through `openai/codex-plugin-cc`.
- Before installing any plugin, MCP, hook, or memory layer, run the source-audit workflow.
- Before finalizing work, run focused tests, lint/typecheck, and a second-model review for risky changes.

## Load deeper docs only when needed

- Repo selection: `SOTA_REPOS_FINAL_LIST.md`
- Architecture: `CONVERGENCE_INSIGHTS_AND_ARCHITECTURE.md`
- Token optimization: `TOKEN_OPTIMIZATION_ARCHITECTURE.md`
- Parallel worktrees: `PARALLEL_GIT_WORKTREE_PLAYBOOK.md`
- Codex plugin: `CODEX_PLUGIN_CC_WORKFLOW.md`
- CLI/code quality: `CLI_TERMINAL_CODE_QUALITY_GUIDE.md`
- Source audit: `SOURCE_AUDIT_NOTES.md`
