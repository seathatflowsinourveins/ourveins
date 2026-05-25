---
name: review-before-ship
description: Perform final diff, test, security, and Codex review before PR/merge.
allowed-tools: Read Grep Glob Bash
---

# review-before-ship

Perform final diff, test, security, and Codex review before PR/merge.

## Procedure

1. Read `CLAUDE.md` and `AGENTS.md`.
2. Read the relevant V7 Markdown file for this workflow.
3. Produce a compact plan.
4. Use deterministic CLI tools before broad reads.
5. Keep output concise and structured.
6. Document decisions in git/docs/ADRs/tasks when they should persist.

## Output contract

```text
Goal:
Inputs:
Actions:
Files touched:
Commands run:
Risks:
Next steps:
```
