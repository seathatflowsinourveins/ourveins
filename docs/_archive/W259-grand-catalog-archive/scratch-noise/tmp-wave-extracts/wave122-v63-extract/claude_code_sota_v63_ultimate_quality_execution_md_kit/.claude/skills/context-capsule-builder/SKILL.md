---
name: context-capsule-builder
description: Build a minimal context capsule using semantic retrieval and repo maps
disable-model-invocation: true
---


# Token and context architecture

## Core principle

Token optimization is architectural, not just prompt shortening.

## Layers

```text
Measurement:
  ccusage
  claude-devtools
  ccstatusline
  cross-code-organizer

Shell-output compression:
  RTK

Read-path compression:
  Serena
  Repomix
  Claude Context
  AST-grep
  Tree-sitter
  mgrep
  code-review-graph

Large-output sandboxing:
  Context Mode
  Headroom
  Wet
  Distill

Docs/browser:
  Context7
  Playwright MCP

Memory:
  audit-required only
```

## Admission rule

```text
Search before read.
Symbols before file bodies.
Diff stat before diff.
Tail logs before full logs.
Focused tests before full suite.
Skills before CLAUDE.md bloat.
Worktrees before parallel edits.
```

