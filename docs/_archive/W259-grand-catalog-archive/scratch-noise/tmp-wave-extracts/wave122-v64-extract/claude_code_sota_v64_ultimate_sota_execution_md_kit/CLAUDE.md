# CLAUDE.md — SOTA Claude Code Operating Contract

Keep this file short. Load deep playbooks only when needed.

## Core rules

- Use semantic code retrieval before reading many files.
- Prefer `rg`, `fd`, `jq`, `yq`, `git diff --stat`, `git diff --name-only`, focused tests, and small logs.
- Never dump full logs or whole repositories into context.
- Use worktrees for parallel sessions and large tasks.
- Use subagents for noisy exploration, research, verification, and review.
- Use Skills for repeat workflows instead of expanding this file.
- Run focused tests before broad tests.
- For risky changes, run Claude review plus Codex review/adversarial review.
- Treat plugins, MCP servers, hooks, memory tools, dashboards, and bridge tools as executable software requiring source audit.
- Prefer durable memory: GitHub issues, PRs, ADRs, AGENTS.md, CLAUDE.md, skills, repo maps, and task files.

## Default tool policy

Default core:

```text
ccusage
RTK
Serena
Repomix
rg / fd / jq / yq / gh
pre-commit / just / mise / uv
```

Selective / audit-required:

```text
Context Mode
Headroom
Claude Context
Context7
Playwright MCP
memory plugins
MCP servers
operator dashboards
bridge plugins
system-prompt mutators
```

## Done means

- The implementation is minimal and scoped.
- Tests or verification commands were run.
- Diff was inspected.
- Security and quality gates passed or failures are documented.
- Codex was used for independent review on high-risk work.
- Durable state was updated if a reusable lesson emerged.
