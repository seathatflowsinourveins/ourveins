# CLAUDE.md

Use this repo as a disciplined agentic-engineering workspace.

## Operating rules

- Keep context small.
- Use semantic retrieval before reading whole files.
- Use `rg`, `fd`, `jq`, `yq`, and `git diff --stat` before large outputs.
- Do not dump full logs; summarize and tail only relevant failure output.
- Use worktrees for parallel work.
- Use Skills for long repeatable workflows; do not bloat this file.
- For risky changes, run reviewer subagent plus Codex second-model review.
- For plugins, MCPs, memory tools, dashboards, bridges, or hooks: run source audit first.
- Before finish: run focused tests and relevant quality gates.
