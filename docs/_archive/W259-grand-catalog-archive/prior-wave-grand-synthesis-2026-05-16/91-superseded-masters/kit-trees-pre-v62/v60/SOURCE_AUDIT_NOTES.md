# SOURCE_AUDIT_NOTES

This kit is not a line-by-line security audit of every repo.

Before installing any executable surface, inspect:

```text
install scripts
postinstall hooks
shell commands
network calls
telemetry
MCP server definitions
tool descriptions
tool permissions
hook triggers
bridge plugin behavior
memory retention
secret handling
license
uninstall path
background processes
```

## High-risk categories

```text
MCP servers
Claude Code plugins
hooks
bridge plugins
memory tools
operator dashboards
one-line installers
system-prompt mutation tools
provider/proxy switchers
```

## Audit commands

```bash
git clone <repo>
cd <repo>
git log --oneline -n 20
fd
rg "curl|wget|eval|exec|spawn|child_process|subprocess|rm -rf|chmod|sudo|token|api_key|telemetry|postinstall" .
rg "mcp|hook|PreToolUse|PostToolUse|SessionStart|Stop|permissions|allow|deny" .
```

## Decision

```text
default install / selective / reference only / discovery only / reject
```
