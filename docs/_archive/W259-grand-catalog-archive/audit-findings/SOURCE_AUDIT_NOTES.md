# Source Audit Notes

This kit is a README/docs/source-surface convergence audit, not blanket approval to install every repository.

Audit every:

```text
plugin
MCP server
hook
bridge plugin
memory layer
dashboard
one-line installer
system-prompt mutator
provider/proxy switcher
```

Audit checklist:

```text
install path
uninstall path
permissions
network access
filesystem access
secret handling
telemetry/analytics
memory retention/deletion
dependency health
license
maintainer activity
supply-chain risk
```

Recommended scanners:

```text
snyk/agent-scan
cisco-ai-defense/mcp-scanner
cisco-ai-defense/skill-scanner
InvariantLabs-ai/mcp-scan
MCP-Defender/MCP-Defender
mintmcp/agent-security
semgrep
CodeQL
gitleaks
trufflehog
trivy
osv-scanner
```
