# SOURCE_AUDIT_NOTES.md

This kit is a README/docs/source-surface convergence audit, not a line-by-line security audit of every repository.

Before installing executable tooling, inspect:
```text
install scripts
package.json / pyproject / Dockerfiles
MCP server definitions
hooks
bridge plugins
network calls
filesystem access
secrets handling
telemetry
licenses
uninstall path
```

Audit-required surfaces:
```text
plugins
MCP servers
hooks
memory systems
operator dashboards
bridge plugins
one-line installers
system prompt mutation tools
provider/proxy switchers
```

Default-deny anything that requests broad filesystem/network/secret access without a narrow reason.
