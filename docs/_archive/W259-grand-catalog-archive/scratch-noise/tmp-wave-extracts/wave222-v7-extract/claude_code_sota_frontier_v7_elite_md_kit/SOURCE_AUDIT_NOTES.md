# Source Audit Notes

This kit is not a line-by-line security audit of every repo.

## Audit before installing any repo that includes

- `curl | bash`, install scripts, auto-updaters.
- Claude Code hooks.
- MCP servers.
- Bridge plugins for Codex/Gemini/OpenCode.
- Memory stores or telemetry.
- Dashboards that spawn shells.
- Permission bypass modes.
- Network access.

## Audit workflow

1. Inspect README and install command.
2. Inspect package metadata and lockfiles.
3. Search for shell execution:
   ```bash
   rg "child_process|exec\(|spawn\(|subprocess|os.system|curl|wget|eval|bash" .
   ```
4. Search for secrets/network use:
   ```bash
   rg "TOKEN|API_KEY|SECRET|process.env|fetch\(|requests\.|axios|http" .
   ```
5. Inspect hooks and MCP server entrypoints.
6. Run tests if available.
7. Install in a disposable repo/worktree first.
8. Pin versions.
9. Document approved commands in `.claude/settings.json`.
