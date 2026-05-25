# SOURCE_AUDIT_NOTES.md

This kit is a README/docs/source-surface convergence audit, not a line-by-line security audit of every repository.

Before installing executable surfaces, run source audit.

## Audit targets

```text
plugins
MCP servers
hooks
bridge tools
dashboards
memory tools
one-line installers
system-prompt mutators
provider switchers
binary downloads
```

## Audit checklist

```bash
git clone --depth 1 <repo>
cd <repo>
fd .
rg -n "postinstall|curl|wget|eval|exec|spawn|child_process|subprocess|os.system|shell=True|token|secret|OPENAI|ANTHROPIC|MCP|telemetry|analytics|upload|http"
rg -n "hooks|mcp|server|stdio|sse|websocket|filesystem|readFile|writeFile|rm -rf"
```

Inspect:

```text
README
package.json / pyproject.toml / Cargo.toml
install scripts
bin entries
postinstall
network calls
filesystem permissions
MCP tool definitions
hook behavior
telemetry
license
uninstall path
```

Run:

```bash
gitleaks detect
trivy fs .
osv-scanner -r .
semgrep scan
```

Approve only when:

```text
install path is clear
permissions are bounded
secrets are excluded
telemetry is known/off
uninstall works
benchmark proves value
```
