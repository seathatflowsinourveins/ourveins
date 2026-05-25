# CLI / Code / Prose Quality Guide — V62

## Universal CLI foundation

```text
rg, fd, jq, yq, gh, git, pre-commit, just, mise, uv
```

## Security gates

```text
semgrep, CodeQL, gitleaks, trufflehog, trivy, osv-scanner, checkov, scorecard, harden-runner
```

## Language/code quality

```text
Python: ruff, mypy/pyright if present, pytest
JS/TS: biome, oxc, eslint/tsc if present, vitest/jest
Go: go test, golangci-lint
Shell: shellcheck
GitHub Actions: actionlint
Docker: hadolint
Terraform: tflint, checkov
```

## Prose / grammar / docs

```text
typos
vale
markdownlint
textlint
```

## Claude rule

Do not trust generated code until deterministic gates pass. LLM review is complementary, not a substitute.
