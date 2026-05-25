# MCP Security and Tooling

## Principle

MCP is powerful but not free. Every server adds tool surface, output surface, permission surface, and sometimes network/state access.

## Use MCP for

- Semantic code retrieval.
- Browser automation when UI verification is required.
- Databases with read-only defaults.
- Internal APIs with strict payload limits.
- Context-mode or tool-output sandboxing.

## Prefer CLI for

- GitHub issue/PR operations via `gh`.
- Cloud lookups via `aws`, `gcloud`, `az`.
- Logs via `tail`, `grep`, `jq`.
- One-shot deterministic commands.

## Required audits

- Inspect install scripts.
- Inspect config defaults.
- Check file and network permissions.
- Check telemetry.
- Check secrets handling.
- Run `mcp-scan` or equivalent when available.
- Disable unused MCP servers.
