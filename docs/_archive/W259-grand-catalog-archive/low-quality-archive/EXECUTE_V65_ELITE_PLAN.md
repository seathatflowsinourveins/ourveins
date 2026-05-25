# Execute V65 Elite Plan

## Stage 0 — Baseline

```bash
git status --short
git branch --show-current
npx ccusage@latest daily || true
npx ccusage@latest session || true
git diff --stat
```

Record baseline tokens, runtime, errors, and current quality gates.

## Stage 1 — Install only the default core

Default core is intentionally small:

```text
ccusage
RTK
Serena
Repomix
rg fd jq yq gh
pre-commit just mise uv
```

Do not install MCP/memory/dashboard/bridge/plugin extras yet.

## Stage 2 — Build context capsule

1. Use Serena or code-intelligence tool for symbols.
2. Use Repomix for a scoped repo capsule.
3. Use `rg`/`fd` for narrow discovery.
4. Avoid reading giant files/logs unless necessary.

## Stage 3 — Define task-state

Use one of:

```text
GitHub Issues / PRs
Task Master
CCPM
BMAD
Spec Kit
PRP/context-engineering docs
```

Every task needs acceptance criteria, verification command, risk class, branch/worktree name, and owner.

## Stage 4 — Parallel worktree execution

```bash
git fetch --all --prune
git remote set-head origin -a || true
git worktree add ../repo-task-123 -b cc/task-123 origin/main
cd ../repo-task-123
claude
```

Claude native:

```text
claude --worktree task-123
/batch <large independent migration>
```

## Stage 5 — Codex second-model review

```text
/codex:review --base main --background
/codex:adversarial-review --base main focus on correctness, security, data loss, race conditions, rollback, hidden coupling --background
/codex:status
/codex:result
```

Use Codex as reviewer/rescue, not as permission boundary.

## Stage 6 — Quality gates

```bash
git diff --check
just test || true
pre-commit run --all-files
```

Language gates:

```text
Python: ruff, mypy/pyright, pytest
TS/JS: biome/oxc/eslint/tsc/vitest
Shell: shellcheck
GitHub Actions: actionlint
Docker: hadolint
IaC: checkov/tflint
Docs: vale/markdownlint/textlint/cspell
```

## Stage 7 — Audit before installing extras

For every plugin/MCP/memory/dashboard/bridge:

```bash
git clone <repo> /tmp/audit/repo
cd /tmp/audit/repo
find . -maxdepth 3 -type f | sort | sed -n '1,200p'
rg -n "curl|wget|bash|sudo|chmod|eval|exec|child_process|subprocess|token|secret|telemetry|analytics|MCP|mcp|postinstall|install" .
```

Reject if there is no clear permission model, uninstall path, data-retention policy, or safe failure mode.

## Stage 8 — Benchmark-before-adoption

Compare baseline vs candidate on:

```text
tokens
wall time
correctness
tests passed
review quality
security findings
operator visibility
rollback complexity
```

Keep only tools that beat baseline for your actual repo.

## Stage 9 — Durable learning

Only save general lessons to:

```text
CLAUDE.md
AGENTS.md
.claude/skills
ADRs
repo-map docs
Task Master / CCPM state
GitHub issue templates
```

Do not add memory plugins until repeated context-reconstruction cost is proven.
