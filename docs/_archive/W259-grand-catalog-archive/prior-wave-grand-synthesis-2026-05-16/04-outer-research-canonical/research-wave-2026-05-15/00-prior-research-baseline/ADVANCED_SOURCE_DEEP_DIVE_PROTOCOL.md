# Advanced Source Deep-Dive Protocol

This is the execution protocol for real source inspection.

## Clone and inventory

```bash
mkdir -p /tmp/agent-audit
cd /tmp/agent-audit
git clone --depth=1 <repo-url> repo
cd repo
printf "repo=%s\ncommit=%s\n" "$(git remote get-url origin)" "$(git rev-parse HEAD)"
find . -maxdepth 3 -type f | sort > FILE_INDEX.txt
```

## Classify source risk

```text
LOW: docs-only, examples-only, static reference list.
MEDIUM: CLI or scripts with local file access but no network/secrets.
HIGH: MCP server, hook, plugin, memory layer, dashboard, bridge, one-line installer.
CRITICAL: downloads binaries, modifies shell/profile, broad filesystem/network, hidden telemetry, credential access.
```

## Inspect dangerous surfaces

```bash
rg -n "curl|wget|bash|sh -c|sudo|chmod|chown|eval|exec|child_process|subprocess|spawn|postinstall|preinstall|install.sh" .
rg -n "MCP|mcp|tools|permissions|allowed-tools|deny|hook|PreToolUse|PostToolUse|Stop|Subagent" .
rg -n "token|secret|api_key|OPENAI|ANTHROPIC|GITHUB_TOKEN|DATABASE_URL|telemetry|analytics|sentry" .
rg -n "memory|sqlite|vector|embedding|qdrant|chromadb|weaviate|redis|postgres" .
```

## Keep/drop decision

Keep only if:

```text
purpose is clear
permission model is explicit
network/filesystem behavior is justified
telemetry is absent or opt-in
uninstall path exists
license is acceptable
maintainer activity is credible
candidate beats baseline benchmark
```
