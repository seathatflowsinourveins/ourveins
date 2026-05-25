# AGENTS.md — Cross-Agent Contract

This file is for Claude Code, Codex, Gemini CLI, OpenCode, Aider, and any agent harness reading the repo.

## Architecture contract
- Follow task scope. Do not widen scope without explicit reason.
- Prefer minimal diffs and reversible changes.
- Use repo-local scripts and quality gates before ad hoc commands.
- Do not edit secrets, credentials, or production config unless explicitly requested.
- Keep durable lessons in ADRs, rules, skills, or task files, not chat history.

## Multi-agent contract
- One agent owns one branch/worktree.
- Do not edit files owned by another active agent.
- Communicate through report files, PR comments, task ledgers, or explicit handoff docs.
- Reviewer agents are read-only unless explicitly promoted.
- Merge serially through PRs or an orchestrator.

## Review contract
Use a two-model witness for high-risk work:
1. Claude implementer creates patch.
2. Claude reviewer checks requirements and tests.
3. Codex reviews with `/codex:review`.
4. Codex challenges with `/codex:adversarial-review` for risky changes.
5. Claude reconciles true positives only.
6. CI/static analysis decides.
