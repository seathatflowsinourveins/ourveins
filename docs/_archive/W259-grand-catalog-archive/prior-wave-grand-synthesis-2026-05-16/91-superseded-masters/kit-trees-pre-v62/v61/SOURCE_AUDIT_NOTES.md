# Source Audit Notes V61

This kit is a README/docs/source-surface convergence audit, not a line-by-line security audit.

## Audit before installing
- MCP servers
- memory plugins
- hooks
- dashboards/operator UIs
- Claude↔Codex/Gemini/OpenCode bridges
- one-line installers
- provider/proxy switchers
- system-prompt/tool mutators

## Audit checklist
1. Inspect install script.
2. Inspect package manifest and dependencies.
3. Inspect executable entrypoints.
4. Inspect network access.
5. Inspect filesystem access.
6. Inspect prompts/tool descriptions for injection risk.
7. Inspect secrets/telemetry handling.
8. Inspect memory retention/deletion policy.
9. Inspect license.
10. Verify uninstall path.
11. Run in isolated worktree/container first.
12. Benchmark against baseline.

## Never default-install
- leaked/unofficial Claude Code source
- hidden prompt mutators
- global MCP servers with broad filesystem/network access
- memory plugins without deletion/export controls
- bridge plugins that ignore separate permissions
