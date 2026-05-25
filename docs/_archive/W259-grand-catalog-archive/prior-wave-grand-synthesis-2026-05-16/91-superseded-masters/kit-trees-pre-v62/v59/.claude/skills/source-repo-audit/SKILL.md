---
name: source-repo-audit
description: Audit a repo before installing plugins, MCP servers, hooks, memory tools, or bridges.
allowed-tools: Read Grep Glob Bash
---

# source-repo-audit

Audit a repo before installing plugins, MCP servers, hooks, memory tools, or bridges.

## Required behavior
- Keep scope narrow.
- Prefer deterministic evidence.
- Record findings in durable project files.
- Do not install executable code without source audit.
