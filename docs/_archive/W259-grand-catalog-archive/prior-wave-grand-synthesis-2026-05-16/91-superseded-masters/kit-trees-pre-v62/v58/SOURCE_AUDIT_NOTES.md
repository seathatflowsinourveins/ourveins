# SOURCE_AUDIT_NOTES.md

This kit is a README/docs/source-surface convergence audit, not a line-by-line security audit.

Before installing any executable repo, audit:

```text
install scripts
postinstall hooks
MCP server definitions
tool permissions
filesystem/network access
secret handling
telemetry
memory retention and deletion
license
uninstall path
update mechanism
bridge/plugin commands
worktree cleanup
```

## Red flags

```text
curl | sh
unbounded --dangerously-skip-permissions
secret reads
broad filesystem MCP
unreviewed memory plugins
remote dashboards without data policy
system prompt mutation
provider/proxy switchers
leaked/unofficial Claude Code internals
```

## Required output

```text
ALLOW / DENY / AUDIT-ONLY
risk summary
files reviewed
commands reviewed
permissions requested
rollback path
```
