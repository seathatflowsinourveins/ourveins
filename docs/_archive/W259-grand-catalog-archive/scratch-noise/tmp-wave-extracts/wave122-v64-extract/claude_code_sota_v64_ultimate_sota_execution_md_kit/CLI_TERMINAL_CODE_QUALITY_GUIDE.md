# CLI_TERMINAL_CODE_QUALITY_GUIDE.md

## Default CLI foundation

```text
rg
fd
jq
yq
gh
pre-commit
just
mise
uv
```

## Efficient command style

Bad:

```bash
cat huge.log
tree .
git diff
npm test
docker logs app
```

Better:

```bash
tail -n 120 huge.log
fd -e ts -e tsx src
git diff --stat
git diff --name-only
git diff --check
npm test -- --runInBand path/to/test
docker logs --tail=120 app
jq '.errors[] | {message,path,code}' result.json
```

## Code quality gates

```text
Python:
  ruff
  pyright/mypy if present
  uv

JS/TS:
  biome
  oxc
  tsc
  eslint if present

Shell:
  shellcheck

GitHub Actions:
  actionlint

Docker:
  hadolint

Terraform:
  tflint
  checkov

Go:
  golangci-lint

Secrets / security:
  gitleaks
  trufflehog
  trivy
  osv-scanner
  semgrep
  CodeQL
```

## Prose/grammar gates

```text
typos
vale
markdownlint-cli2
textlint
cspell
```

## Required final check

```bash
git status --short
git diff --stat
git diff --check
just lint || true
just test || true
pre-commit run --all-files || true
```
