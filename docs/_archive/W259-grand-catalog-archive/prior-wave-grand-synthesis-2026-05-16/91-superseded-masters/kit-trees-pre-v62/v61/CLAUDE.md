# Claude Code SOTA V61 Runtime Rules

Keep this file short. Load detailed playbooks from Skills and Markdown docs only when needed.

## Operating rules
- Prefer semantic retrieval before full-file reads.
- Prefer `rg`, `fd`, `jq`, `yq`, `gh`, `git diff --stat`, and focused test commands.
- Use RTK or equivalent for noisy Bash output.
- Use Serena before broad code exploration.
- Use Repomix only for deliberate context capsules.
- Use worktrees for parallel work; one task = one branch = one worktree.
- Use Codex through `openai/codex-plugin-cc` as second-model reviewer/rescue, not as a permission boundary.
- Run deterministic quality gates before final answers: format, lint, typecheck, tests, secrets, security scans.
- Treat MCP servers, plugins, hooks, dashboards, memory tools, and bridge plugins as executable software requiring source audit.
- Preserve durable memory in Git, GitHub issues/PRs, ADRs, `AGENTS.md`, Skills, and task state before using memory plugins.

## Default stack
Claude Code + Codex CLI + codex-plugin-cc + ccusage + RTK + Serena + Repomix + rg/fd/jq/yq/gh + pre-commit/just/mise/uv.
