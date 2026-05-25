# AGENTS.md

## Purpose

This repository uses Claude Code as primary orchestrator and Codex as second-model reviewer/rescue worker.

## Done criteria

- The change is scoped to the task.
- Tests/lint/typecheck/security gates relevant to the change pass.
- `git diff --stat` and `git diff --check` are clean.
- Risky changes receive independent review via `/codex:review` or `/codex:adversarial-review`.
- No secrets, `.env`, private keys, credentials, or generated artifacts are exposed.
- Any tool/plugin/MCP/memory/dashboard installation was source-audited first.

## Tool policy

- Prefer CLI tools for simple operations.
- Use MCP only when it adds real structured context or capability.
- Keep `CLAUDE.md` concise; use Skills for long repeatable workflows.
- Use worktrees for parallel sessions.
- Use GitHub issues/PRs/ADRs as durable memory.
