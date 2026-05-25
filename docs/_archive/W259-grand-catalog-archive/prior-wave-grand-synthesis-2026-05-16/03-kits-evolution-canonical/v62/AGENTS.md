# AGENTS.md — Cross-Agent Contract

This repository may be used by Claude Code, Codex, GitHub agents, and other coding agents.

## Done criteria

- Change is minimal and scoped.
- Tests or verification commands are run and summarized.
- Diff is reviewable.
- Security and quality gates pass or failures are explicitly documented.
- Any generated code is checked by a second-model review for risky changes.

## Tool policy

- Prefer CLI tools for simple deterministic operations: rg, fd, jq, yq, gh, git, just, mise, uv.
- Prefer semantic tools for codebase navigation: Serena, AST tools, repo maps.
- MCPs are selective; disable unused MCP servers.
- Memory tools are audit-required and should not be installed by default.

## Model routing

- Use strongest Claude model available for deep architecture, security review, long-horizon debugging, and harness design.
- Use Sonnet-class/default model for implementation and routine refactors.
- Use Codex/GPT-class model as independent reviewer, adversarial challenger, and rescue worker.
- Do not run multiple live agents in the same working tree; use worktrees.
