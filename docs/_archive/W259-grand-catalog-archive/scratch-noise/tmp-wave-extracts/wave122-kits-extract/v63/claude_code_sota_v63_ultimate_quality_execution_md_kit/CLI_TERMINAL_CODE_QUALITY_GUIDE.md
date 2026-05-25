# CLI, code, security, and grammar quality gates

## Default CLI tools

```text
rg
fd
jq
yq
gh
just
mise
uv
pre-commit
```

## Code quality

```text
ruff
biome
oxc
shellcheck
actionlint
hadolint
typos
golangci-lint
tflint
checkov
zizmor
megalinter
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
MCP Defender
agent-scan
Cisco MCP Scanner
skill-scanner
```

## Prose / grammar / docs

```text
vale
markdownlint
textlint
typos
```

## Command policy

Bad:

```bash
cat huge.log
npm test
git diff
tree .
find .
```

Better:

```bash
tail -n 120 huge.log
npm test -- --runInBand path/to/test 2>&1 | tail -n 160
git diff --stat
git diff --name-only
fd -e ts -e tsx src
rg "symbol|function|class" src -n
jq '.errors[] | {message,path,code}' result.json
```
