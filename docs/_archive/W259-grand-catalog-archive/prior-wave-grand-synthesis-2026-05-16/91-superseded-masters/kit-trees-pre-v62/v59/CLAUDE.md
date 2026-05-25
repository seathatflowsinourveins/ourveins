# CLAUDE.md — Elite Claude Code Operating Contract

Use this project as a token-optimized, worktree-safe, multi-model engineering harness.

## Always-on rules
- Keep context small. Use semantic retrieval before broad file reads.
- Prefer `rg`, `fd`, `jq`, `yq`, `git diff --stat`, and focused tests over full dumps.
- Use RTK-style compression for noisy shell output.
- Use Serena-style semantic lookup and Repomix-style repo capsules before reading many files.
- Keep `CLAUDE.md` short; put long procedures in Skills.
- Use git worktrees for parallel tasks.
- Use Codex through `openai/codex-plugin-cc` as independent reviewer/rescue worker, not as permission boundary.
- Audit every plugin, MCP server, hook, bridge, memory tool, dashboard, or one-line installer before installing.
- Run deterministic quality gates before claiming done.

## Default done criteria
1. Minimal scoped diff.
2. Focused tests or reasoned explanation if tests unavailable.
3. `git diff --stat` and `git diff --check` reviewed.
4. Lint/type/security/prose gates where applicable.
5. Codex second-opinion for risky changes.
6. Handoff notes captured in durable project memory.
