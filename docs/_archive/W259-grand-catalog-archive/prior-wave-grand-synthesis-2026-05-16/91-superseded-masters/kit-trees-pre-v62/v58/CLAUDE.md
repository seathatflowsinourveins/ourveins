# CLAUDE.md — project operating rules

- Keep this file short. Do not turn it into a handbook.
- Use semantic retrieval before reading large files.
- Prefer `rg`, `fd`, `jq`, `yq`, `git diff --stat`, and focused tests.
- Use RTK or equivalent command-output filtering for noisy shell output.
- Use Serena for symbol navigation and Repomix for deliberate repo capsules.
- Use worktrees for parallel tasks; never let two agents edit the same checkout for unrelated work.
- Use Skills for repeated workflows and long procedures.
- Use hooks for invariant enforcement, not reminders.
- Use Codex as second-model reviewer/rescue via `openai/codex-plugin-cc`.
- Audit every plugin, MCP server, hook, bridge, memory layer, and one-line installer before using it.
- Run quality gates before PR creation: lint, typecheck, tests, security scan, diff check.
