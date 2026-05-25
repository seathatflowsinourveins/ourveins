# EXECUTE_V64_ELITE_PLAN.md

## Goal

Turn a repo into a token-optimized, worktree-parallel, Codex-reviewed Claude Code automation harness.

## Phase 0 — baseline

```bash
git status --short
git remote -v
git branch --show-current
git rev-parse --show-toplevel
npx ccusage@latest daily || true
```

Capture:

```text
current branch
test commands
lint commands
typecheck commands
CI provider
security gates
repo size
languages
package managers
```

## Phase 1 — install default core only

```bash
# CLI foundation
# choose package manager for your OS
# install: rg, fd, jq, yq, gh, pre-commit, just, mise, uv

# Claude usage
npx ccusage@latest daily
npx ccusage@latest session
```

Adopt only:

```text
RTK
Serena
Repomix
ccusage
```

Do not install memory plugins, dashboards, MCP servers, or bridge plugins yet.

## Phase 2 — create project harness files

```text
CLAUDE.md
AGENTS.md
.claude/skills/
.claude/agents/
docs/architecture/
docs/decisions/
scripts/verify.sh
```

`CLAUDE.md` stays short. Put long workflows in Skills.

## Phase 3 — semantic context before edits

Use this order:

```text
repo map
symbol search
references
targeted file reads
targeted tests
full diff
```

Avoid:

```text
cat huge.log
tree .
git diff with no scope
reading entire repository
```

## Phase 4 — worktree execution

```bash
git fetch --all --prune
git remote set-head origin -a
echo ".claude/worktrees/" >> .gitignore

claude --worktree feature-x
```

Manual fallback:

```bash
git worktree add ../repo-feature-x -b cc/feature-x origin/main
cd ../repo-feature-x
claude
```

## Phase 5 — Codex second-model review

Inside Claude Code:

```text
/codex:review --base main --background
/codex:adversarial-review --base main focus on auth, data loss, rollback, concurrency, hidden coupling, test gaps --background
/codex:result
```

## Phase 6 — quality gates

Run only relevant gates first:

```bash
git diff --check
just lint
just typecheck
just test
pre-commit run --all-files
```

Security gates:

```bash
semgrep scan
gitleaks detect
trivy fs .
osv-scanner -r .
```

Prose/docs:

```bash
typos
vale .
markdownlint-cli2 "**/*.md"
textlint "**/*.md"
```

## Phase 7 — benchmark before adopting heavy tools

A candidate tool must improve one or more:

```text
tokens
wall time
correctness
tests passed
review quality
security
rollback complexity
operator visibility
```

If not measured, do not adopt.

## Phase 8 — memory/MCP gate

Before memory/MCP install:

```text
source audit
license check
network/file permissions review
secret/PII retention review
uninstall path
process cleanup test
benchmark vs durable memory
```

Default memory remains:

```text
Git
GitHub issues / PRs
ADRs
AGENTS.md
CLAUDE.md
Skills
Task Master / CCPM
repo-map docs
```
