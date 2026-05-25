# CLI / Terminal / Code Quality Guide

## Foundation CLI
```bash
brew install ripgrep fd jq yq gh git-delta eza fzf bat hyperfine just mise pre-commit
# language dependent
uv tool install ruff
npm i -g @biomejs/biome oxc
```

## Search and code intelligence
- `rg`: text search
- `fd`: file discovery
- `ast-grep`: structural search/rewrite
- `tree-sitter`: parser foundation
- `mgrep`: semantic/search augmentation
- Serena: live symbol retrieval
- Repomix: deliberate repo capsule

## JavaScript/TypeScript quality
```bash
npm run typecheck
npx biome check .
npx oxc --help
```

## Python quality
```bash
uv run ruff check .
uv run ruff format .
uv run pytest -q
```

## Shell/YAML/GitHub quality
```bash
shellcheck scripts/*.sh
actionlint .github/workflows/*.yml
yq '.name' .github/workflows/ci.yml
```

## Security gates
```bash
gitleaks detect --source .
trufflehog filesystem .
trivy fs .
semgrep scan --config auto
gh codeql database create codeql-db --language=javascript-typescript
```

## Speed benchmarking
```bash
hyperfine 'npm test' 'npm test -- --runInBand'
```

## Agent-safe command pattern
- deterministic
- bounded output
- no raw secrets
- no full logs unless explicitly needed
- small verification first, full suite later
