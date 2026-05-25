---
name: review-before-ship
description: Final local review workflow before PR or merge.
disable-model-invocation: true
allowed-tools: Read Grep Glob Bash
---

1. `git status --short`
2. `git diff --stat`
3. `git diff --check`
4. Run focused tests / quality gates.
5. Run Claude read-only review.
6. Run Codex second opinion for risky changes.
7. Return merge decision.
