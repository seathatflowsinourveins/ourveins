# Claude Code operating contract

- Keep base context small. Do not load every reference file by default.
- Prefer semantic retrieval and repo capsules before full-file reading.
- Use `rg`, `fd`, `jq`, `yq`, `gh`, `git diff --stat`, and focused tests.
- Use worktrees for parallel sessions.
- Use Codex through `openai/codex-plugin-cc` for independent review, adversarial review, and rescue.
- Never install plugins, MCP servers, bridge tools, hooks, memory layers, dashboards, or one-line installers without source audit.
- Benchmark heavy tools against baseline before keeping them.
- Store durable memory in git, issues, PRs, ADRs, AGENTS.md, CLAUDE.md, skills, and task-state files before adding memory MCPs.
- Before completion, run the narrowest relevant verification command and summarize evidence.
