# CLI / Terminal / Code / Prose Quality Gates

## CLI foundation

```text
rg fd jq yq gh git pre-commit just mise uv
```

## Code gates

```text
Python: ruff, mypy/pyright, pytest
TS/JS: biome, oxc, eslint, tsc, vitest
Shell: shellcheck
Actions: actionlint
Docker: hadolint
IaC: checkov, tflint
Secrets: gitleaks, trufflehog
Vulns: trivy, osv-scanner, CodeQL, Semgrep
```

## Prose / grammar / docs gates

```text
typos
cspell
vale
markdownlint
textlint
```

## Final pre-PR checks

```bash
git diff --check
git diff --stat
pre-commit run --all-files
just test || true
```
