# Claude Code Operating Rules — V62

- Keep base context small. Use this file as a router, not a textbook.
- Use semantic retrieval before full-file reads: Serena, repo maps, rg/fd, AST tools.
- Use `git diff --stat`, `git diff --name-only`, and targeted hunks before dumping diffs.
- For noisy shell output, prefer RTK or tail/filter commands.
- For browser/docs/API/log payloads, consider Context Mode or a selective MCP only after audit.
- Use Skills for repeatable workflows; do not inflate `CLAUDE.md`.
- Use worktrees for parallel work. One task = one branch = one worktree.
- Use Codex through `openai/codex-plugin-cc` for independent review, adversarial review, and rescue.
- Memory plugins and MCP servers are audit-required. Prefer durable project memory first: Git, issues, PRs, ADRs, AGENTS.md, Skills, Task Master/CCPM state.
- Before installing any plugin/MCP/hook/dashboard/bridge/memory layer, run source-repo-audit.
- Before adopting any heavy tool, run benchmark-eval-gate against baseline Claude Code.
- Before final answer or PR: run focused tests, lint/typecheck/security gates, and summarize touched files and risks.
