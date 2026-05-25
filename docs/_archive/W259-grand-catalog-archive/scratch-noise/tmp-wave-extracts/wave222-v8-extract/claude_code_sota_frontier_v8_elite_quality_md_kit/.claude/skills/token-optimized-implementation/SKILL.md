---
name: token-optimized-implementation
description: Implement a scoped code change using semantic retrieval, bounded command output, and focused verification.
allowed-tools: Read Grep Glob Bash Edit MultiEdit
---

Use semantic search first. Read only relevant files. Prefer rg/fd/jq/git diff --stat. Avoid raw logs. Use RTK if available. Summarize tests and risks.
