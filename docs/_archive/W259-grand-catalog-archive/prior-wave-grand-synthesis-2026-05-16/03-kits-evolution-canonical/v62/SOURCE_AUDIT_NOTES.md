# Source Audit Notes — V62

This kit is a README/docs/source-surface convergence audit, not a line-by-line security audit of every repo.

## Audit before installing

```text
plugins
MCP servers
hooks
bridge plugins
memory tools
dashboards
one-line installers
system-prompt mutators
provider/proxy switchers
```

## Audit checklist

```text
README claims vs source behavior
install scripts and postinstall hooks
package manifests and lockfiles
network calls
filesystem writes
secret handling
telemetry
license
uninstall path
permissions requested
MCP tool definitions
hook events and commands
background daemons/process cleanup
```

## Reject if

```text
unclear install behavior
hidden telemetry
broad filesystem/network access without need
secret capture risk
no uninstall path
unclear license
requires --dangerously-skip-permissions without sandbox
```
