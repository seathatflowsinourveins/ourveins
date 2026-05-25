# AGENTS.md — Cross-Agent Contract

This file is for Claude Code, Codex, OpenAI Agents SDK workers, and other coding agents.

## Project rules

- Use the smallest context required.
- Prefer semantic retrieval and targeted reads.
- Use worktrees for parallel work.
- Do not run destructive commands without explicit approval.
- Do not read secrets, `.env`, credentials, tokens, private keys, or production data unless explicitly authorized.
- Keep patches minimal.
- Run quality gates before declaring completion.
- Use source-audit flow before installing executable plugins, MCP servers, hooks, bridge tools, dashboards, or memory tools.

## Build / test / lint

Claude Code should discover actual project commands, then write them here:

```bash
# install
# lint
# typecheck
# test
# security
# format
```

## Review protocol

Use Codex as independent second-model witness for:

- auth/security changes
- payments/billing
- migrations
- concurrency
- data loss risk
- public API changes
- failing CI rescue
- large refactors

Commands:

```text
/codex:review --base main --background
/codex:adversarial-review --base main focus on auth, rollback, data loss, hidden coupling, race conditions --background
/codex:rescue --background investigate CI failure
```
