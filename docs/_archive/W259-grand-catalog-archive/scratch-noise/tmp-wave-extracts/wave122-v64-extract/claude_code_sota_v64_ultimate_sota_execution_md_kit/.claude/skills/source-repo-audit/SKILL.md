---
name: source-repo-audit
description: Audit an external repo before installation. Inspect install scripts, MCP definitions, hooks, permissions, telemetry, license, and uninstall path.
allowed-tools: Read Grep Glob Bash
---

# source-repo-audit

Audit an external repo before installation. Inspect install scripts, MCP definitions, hooks, permissions, telemetry, license, and uninstall path.

## Steps

1. State goal and scope.
2. Use the smallest context required.
3. Prefer deterministic CLI checks.
4. Return findings in structured form.
5. Do not install executable tools without source audit.
