# CLI_TERMINAL_CODE_QUALITY_GUIDE.md

## Universal CLI foundation

```text
ripgrep / fd / jq / yq / gh
pre-commit / just / mise / uv
```

## Code gates

```text
Python: ruff, pyright, mypy, pytest
JS/TS: biome, oxc, eslint, prettier, tsc
Shell: shellcheck
GitHub Actions: actionlint
Docker: hadolint
Terraform/IaC: tflint, checkov
Go: golangci-lint
Docs/prose: vale, markdownlint, textlint, typos
Security: semgrep, CodeQL, gitleaks, trufflehog, trivy, osv-scanner
MCP/agent security: mcp-scan, MCP Defender, Snyk agent-scan, Cisco MCP Scanner
```

## Quality invariant

No PR without:

```text
git diff --stat
git diff --check
focused tests
lint/typecheck/security checks
Codex review for risky changes
```
