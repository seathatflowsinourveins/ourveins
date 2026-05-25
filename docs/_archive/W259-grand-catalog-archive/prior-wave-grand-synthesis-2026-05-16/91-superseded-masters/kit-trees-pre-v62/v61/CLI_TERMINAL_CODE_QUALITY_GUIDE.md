# CLI, Code, Security, and Prose Quality Gates V61

## Default CLI foundation
- rg / ripgrep
- fd
- jq
- yq
- gh
- pre-commit
- just
- mise
- uv

## Code quality
- Python: ruff, pyright/mypy, pytest.
- TypeScript/JS: biome, oxc, tsc, vitest/jest.
- Go: gofmt, go test, golangci-lint.
- Rust: cargo fmt, clippy, cargo test.
- Shell: shellcheck.
- Docker: hadolint.
- GitHub Actions: actionlint.
- Terraform/IaC: tflint, checkov, trivy.

## Security
- semgrep
- CodeQL
- gitleaks
- trufflehog
- trivy
- osv-scanner
- scorecard
- harden-runner
- MCP/security scanners for MCP/plugin ecosystems

## Prose / grammar / docs
- vale
- markdownlint
- textlint
- typos
- alex/remark-lint when relevant

## Rule
Do not let LLM review replace deterministic gates. LLMs explain and investigate; gates decide.
