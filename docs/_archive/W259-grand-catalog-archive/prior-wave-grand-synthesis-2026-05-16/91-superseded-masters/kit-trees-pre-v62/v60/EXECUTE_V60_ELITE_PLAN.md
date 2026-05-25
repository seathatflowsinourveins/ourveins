# EXECUTE_V60_ELITE_PLAN

## Objective

Turn a repo into a token-optimized, worktree-parallel, Codex-reviewed Claude Code harness without bulk-installing untrusted packages.

## Phase 0 — baseline

```bash
git status --short
git remote set-head origin -a || true
npx ccusage@latest daily || true
npx ccusage@latest session || true
```

Capture baseline:

```text
tokens
wall time
test status
lint/typecheck status
CI status
open security findings
current MCP servers
current hooks
current Claude/Codex config
```

## Phase 1 — install only the default core

```bash
# examples; adjust package manager
brew install ripgrep fd jq yq gh just mise
python -m pip install uv
npx ccusage@latest --help
```

Install only after review:

```text
RTK
Serena
Repomix
```

Do not install memory tools, dashboards, bridge plugins, MCP servers, or hook packs until source-audited.

## Phase 2 — create repo instruction skeleton

Create:

```text
CLAUDE.md
AGENTS.md
.claude/skills/source-repo-audit/SKILL.md
.claude/skills/codex-second-opinion/SKILL.md
.claude/skills/token-optimized-implementation/SKILL.md
.claude/skills/parallel-worktree-harness/SKILL.md
```

## Phase 3 — token/context discipline

Use this order:

```text
1. search symbols
2. read focused files
3. inspect diff stats
4. run focused tests
5. only then read broader context
```

Bad defaults:

```bash
cat huge.log
tree .
git diff
docker compose logs
npm test
```

Better defaults:

```bash
rg "symbol|error|test name" src tests -n
git diff --stat
git diff --name-only
git diff --check
npm test -- --runInBand 2>&1 | tail -n 120
docker compose logs --tail=120 api
```

## Phase 4 — worktree parallelism

```bash
git fetch --all --prune
git remote set-head origin -a
claude --worktree cc-123-feature
claude --worktree cc-124-fix
claude --worktree cc-125-review
```

Add:

```gitignore
.claude/worktrees/
```

## Phase 5 — Codex second-model witness

```text
/codex:review --base main --background
/codex:adversarial-review --base main look for data loss, rollback gaps, race conditions, auth bugs, hidden coupling, and missing tests --background
/codex:status
/codex:result
```

## Phase 6 — deterministic gates

Use a repo-specific `just verify` or `scripts/verify.sh`.

Example:

```bash
just fmt
just lint
just typecheck
just test
git diff --check
```

Security/prose gates as applicable:

```bash
semgrep scan
gitleaks detect
trivy fs .
osv-scanner -r .
typos
vale docs || true
markdownlint "**/*.md" || true
```

## Phase 7 — selective heavy-tool benchmark

Before adopting a selective tool, compare against baseline:

```text
tokens used
wall time
tests passed
review findings
files touched
false positives
operator burden
security risk
uninstall complexity
```

Keep only if it beats baseline materially.

## Phase 8 — memory policy

Use durable artifacts first:

```text
Git commits
GitHub issues/PRs
ADRs
AGENTS.md
CLAUDE.md
Skills
Task Master/CCPM state
repo-map docs
```

Adopt memory MCPs only after source audit and benchmark.

## Phase 9 — continuous improvement

After each completed task:

```text
update ADR if architecture changed
update AGENTS.md if a durable rule emerged
update a Skill if a repeat workflow emerged
remove stale instructions
record tool benchmark result
```
