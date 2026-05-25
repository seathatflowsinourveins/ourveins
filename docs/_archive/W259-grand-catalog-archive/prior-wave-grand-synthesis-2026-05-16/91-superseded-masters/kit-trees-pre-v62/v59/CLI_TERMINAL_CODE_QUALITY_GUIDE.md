# CLI_TERMINAL_CODE_QUALITY_GUIDE.md

## Default CLI foundation
```text
rg fd jq yq gh
pre-commit just mise uv
```

## Code quality
```text
Python: ruff, mypy, pytest, uv
TypeScript/JS: biome, oxc, tsc, vitest
Shell: shellcheck
GitHub Actions: actionlint
Docker: hadolint
Terraform: tflint, checkov
Go: golangci-lint
```

## Security
```text
semgrep
CodeQL
gitleaks
trufflehog
trivy
osv-scanner
scorecard
harden-runner
mcp-scan
MCP-Defender
agent-scan
```

## Grammar / prose
```text
typos
vale
markdownlint
textlint
```

## Rule
No “done” without deterministic evidence.
