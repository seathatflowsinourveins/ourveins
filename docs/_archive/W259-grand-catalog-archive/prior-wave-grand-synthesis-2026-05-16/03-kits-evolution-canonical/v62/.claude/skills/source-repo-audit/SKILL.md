---
name: source-repo-audit
description: Audit a candidate repo before installation. Use for plugins, MCP servers, hooks, dashboards, memory tools, and bridges.
allowed-tools: Read Grep Glob Bash
---

1. Read README, install docs, package manifests, lockfiles, scripts, hooks, MCP definitions, and license.
2. Identify network, filesystem, secret, telemetry, and permission behavior.
3. Find uninstall path and background daemons.
4. Mark DEFAULT / SELECTIVE / REFERENCE / AUDIT-REQUIRED / REJECT.
5. Do not install unless explicitly approved.
