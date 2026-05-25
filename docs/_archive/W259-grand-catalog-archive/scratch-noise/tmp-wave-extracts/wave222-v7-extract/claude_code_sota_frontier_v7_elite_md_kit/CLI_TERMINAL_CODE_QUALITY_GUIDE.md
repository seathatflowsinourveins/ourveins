# CLI, Terminal, and Code Quality Guide

## Required local tools

```bash
# search / slice / git
rg --version
fd --version
jq --version
yq --version
gh --version

# quality gates
pre-commit --version
semgrep --version
gitleaks version
trivy --version
shellcheck --version
actionlint --version
```

## Recommended `justfile`

```makefile
verify:
    just lint
    just typecheck
    just test

lint:
    pre-commit run --all-files

test:
    npm test -- --runInBand

typecheck:
    npm run typecheck

security:
    gitleaks detect --source .
    trivy fs .
    semgrep scan --config auto
```

## Language quality map

| Stack | Preferred deterministic gates |
|---|---|
| JS/TS | `biome`, `oxc`, `tsc`, `vitest/jest`, `eslint` if already present |
| Python | `ruff`, `pyright/mypy`, `pytest`, `uv` |
| Go | `gofmt`, `go test`, `golangci-lint` |
| Rust | `cargo fmt`, `cargo clippy`, `cargo test` |
| Shell | `shellcheck`, `shfmt` |
| Docker | `hadolint`, `trivy` |
| Terraform | `terraform fmt`, `tflint`, `checkov` |
| GitHub Actions | `actionlint`, `zizmor`, `harden-runner` |

## Agent policy

Agents may not claim success until deterministic gates pass or failures are documented with exact next steps.
