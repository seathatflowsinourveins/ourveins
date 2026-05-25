# AGENTS.md — Cross-Agent Contract

This repository may be used by Claude Code, Codex, Gemini CLI, OpenCode, or other coding agents.

## Shared contract
- Respect this repo's build/test/lint/security commands.
- Never edit secrets or production data.
- Never run destructive commands without explicit approval.
- Use worktrees for parallel sessions.
- Keep changes scoped to the task.
- Before finalizing, summarize files changed, tests run, risks, and next steps.

## Done criteria
- Relevant tests pass or failures are documented.
- Lint/typecheck/format pass for changed surfaces.
- Security/secret scans pass for changed surfaces.
- Diff is reviewed by primary agent and second-model reviewer when risk warrants.
- Durable docs/ADRs/tasks updated when behavior or architecture changes.
