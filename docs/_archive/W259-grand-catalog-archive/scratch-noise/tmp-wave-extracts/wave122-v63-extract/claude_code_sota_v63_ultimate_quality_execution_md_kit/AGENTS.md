# AGENTS.md

This file is for Claude Code, Codex, and other coding agents.

## Done criteria

A task is done only when:

```text
implementation is minimal and scoped
focused tests pass
lint/typecheck pass where relevant
security/secret gates pass where relevant
diff is reviewed
Codex second opinion is reconciled for risky changes
documentation or ADR updated if behavior/architecture changed
```

## Cross-agent roles

```text
Claude Code:
  primary orchestrator, editing, git, local tests, worktrees

Codex:
  independent reviewer, adversarial review, rescue worker

Opus-class Claude:
  architecture, security, deep reasoning, long-horizon plan/review

Sonnet-class Claude:
  normal implementation and refactor

Mini/cheap model:
  summarization, triage, classification
```

## Forbidden defaults

```text
no blind global MCP installs
no one-line installer without audit
no huge CLAUDE.md
no full log dumps
no parallel sessions in same working tree
no merge without tests or diff review
```
