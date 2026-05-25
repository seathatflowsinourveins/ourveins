# MCP / Plugin / Hook Security

## Audit before install
Any repo that installs hooks, MCP servers, shell wrappers, memory stores, dashboards, bridge plugins, or background daemons needs source review.

Inspect:
```text
install scripts
package manifests
postinstall hooks
MCP server command lines
network calls
credential handling
file read/write paths
auto-update behavior
telemetry
uninstall path
```

## Deny by default
- `.env`, `.env.*`
- `secrets/**`
- private keys
- credential files
- production kube/cloud configs

## Good gates
- InvariantLabs-ai/mcp-scan
- MCP-Defender/MCP-Defender
- gitleaks/gitleaks
- trufflesecurity/trufflehog
- semgrep/semgrep
- github/codeql-action
- ossf/scorecard
- step-security/harden-runner

## Rule
A tool that saves 20% tokens but opens credentials, spawns arbitrary shells, or bypasses permission boundaries is not an optimizer. It is a liability.
