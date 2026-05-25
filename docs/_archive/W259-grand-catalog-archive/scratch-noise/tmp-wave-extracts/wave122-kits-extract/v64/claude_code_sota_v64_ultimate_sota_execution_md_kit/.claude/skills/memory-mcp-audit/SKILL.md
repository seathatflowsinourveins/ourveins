---
name: memory-mcp-audit
description: Evaluate memory/MCP tools only after source audit, benchmark, retention/deletion/privacy/secret checks.
allowed-tools: Read Grep Glob Bash
---

# memory-mcp-audit

Evaluate memory/MCP tools only after source audit, benchmark, retention/deletion/privacy/secret checks.

## Steps

1. State goal and scope.
2. Use the smallest context required.
3. Prefer deterministic CLI checks.
4. Return findings in structured form.
5. Do not install executable tools without source audit.
