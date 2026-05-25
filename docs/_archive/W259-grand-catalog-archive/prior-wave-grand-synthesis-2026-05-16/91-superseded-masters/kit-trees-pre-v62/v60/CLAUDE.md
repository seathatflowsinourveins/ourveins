# Claude Code operating rules

- Keep this file short. Put long procedures into `.claude/skills`.
- Use semantic code tools before reading whole files.
- Prefer `rg`, `fd`, `jq`, `yq`, `git diff --stat`, and focused tests.
- Use RTK-style filtering for noisy command output.
- Use Serena/semantic retrieval and Repomix-style context capsules before broad file dumping.
- Use one branch/worktree per nontrivial task.
- Use subagents for noisy exploration and return summaries only.
- Run deterministic quality gates before final response.
- Use Codex plugin as independent reviewer/adversarial reviewer/rescue worker, not as the permission boundary.
- Audit every plugin, MCP server, hook, memory layer, bridge, dashboard, and one-line installer before adoption.
