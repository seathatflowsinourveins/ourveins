---
name: parallel-worktree-harness
description: Spawn or supervise parallel worktree-based Claude/Codex tasks.
disable-model-invocation: true
allowed-tools: Read Grep Glob Bash
---

Use one worktree per task. Prevent file ownership overlap. Use task reports and PRs as merge boundaries. Keep secrets out of .worktreeinclude.
