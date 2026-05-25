# TOKEN_CONTEXT_ARCHITECTURE

## Layered design

```text
Measurement:
  ccusage
  claude-devtools
  statusline
  cross-code-organizer

Shell-output compression:
  RTK

Read-path optimization:
  Serena
  Claude Context
  Aider repo-map pattern
  AST-grep
  Tree-sitter
  mgrep

Repo capsule:
  Repomix
  code2prompt

Large-output sandbox:
  Context Mode
  Wet
  Distill
  Skinny Jeans

Cross-agent memory/compression:
  Headroom
```

## Key distinction

RTK compresses Bash output. It does not solve Claude Code built-in `Read`, `Grep`, and `Glob` exploration. That requires semantic retrieval, repo maps, and deliberate context capsules.

## Admission policy

```text
Before context:
  filter
  summarize
  slice
  index
  measure

After context:
  compact only with a handoff summary
  clear when switching tasks
  save durable facts to docs/issues/ADRs
```
