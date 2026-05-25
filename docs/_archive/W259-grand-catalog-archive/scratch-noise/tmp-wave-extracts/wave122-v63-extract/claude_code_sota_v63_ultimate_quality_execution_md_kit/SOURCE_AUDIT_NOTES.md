# Source audit notes

This kit is a README/docs/source-surface convergence audit. It is not a line-by-line security audit.

Audit before installing:

```text
plugins
MCP servers
hooks
bridge tools
memory systems
dashboards
one-line installers
system prompt mutators
provider switchers
```

Audit checklist:

```text
license
install script
postinstall behavior
network access
filesystem access
secrets access
MCP tool descriptions
prompt injection surface
telemetry
data retention
uninstall path
dependency risk
CI status
maintainer activity
open security issues
```

Safe default:

```text
Prefer official docs/SDKs.
Prefer CLI tools over always-on MCP when equivalent.
Prefer project-local config over global install.
Prefer worktree sandbox before adoption.
Benchmark before production use.
```
