# CLI_TERMINAL_CODE_QUALITY_GUIDE

## Core CLI

```text
ripgrep
fd
jq
yq
gh
just
mise
uv
pre-commit
```

## Code gates

```text
ruff
biome
oxc
shellcheck
actionlint
hadolint
typos
tflint
golangci-lint
checkov
semgrep
CodeQL
gitleaks
trufflehog
trivy
osv-scanner
```

## Prose/grammar gates

```text
vale
markdownlint
textlint
typos
```

## Default command policy

Prefer:

```bash
git status --short
git diff --stat
git diff --name-only
git diff --check
rg "symbol|error|test" src tests -n
fd -e ts -e py -e go src
jq '.errors[] | {message,path,code}' result.json
```

Avoid:

```bash
cat huge.log
tree .
git diff
docker logs
npm test
```
