# EXECUTE_V58_ELITE_PLAN.md

This is the concrete Claude Code CLI adoption plan.

## Phase 0 — baseline without new tools

```bash
git status --short
git diff --stat
scripts/verify.sh || true
npx ccusage@latest session || true
```

Record:

```text
tokens used
wall time
tests passed
files read
commands run
PR/diff quality
review findings
```

## Phase 1 — install the minimal default core

Install only:

```text
ccusage
RTK
Serena
Repomix
rg / fd / jq / yq / gh
pre-commit / just / mise / uv
```

Do not install memory tools, broad MCP packs, dashboards, or bridge plugins yet.

## Phase 2 — set repo instruction structure

Create:

```text
CLAUDE.md       small always-loaded rule file
AGENTS.md       cross-agent contract
.claude/skills  repeatable workflows
.claude/agents  focused subagents
docs/adr         durable architecture decisions
docs/repo-map    module map and invariants
```

## Phase 3 — define quality gates

Create `justfile` or `scripts/verify.sh` with:

```bash
just lint
just typecheck
just test
just security
just verify
```

Recommended gates:

```text
ruff / biome / oxc / eslint / prettier / pyright / mypy
shellcheck / actionlint / hadolint / typos
semgrep / CodeQL / gitleaks / trivy / osv-scanner
vale / markdownlint / textlint for docs
```

## Phase 4 — configure parallel worktree harness

```bash
git fetch --all --prune
git remote set-head origin -a
claude --worktree cc-001-feature
claude --worktree cc-002-tests
```

Rules:

```text
one task = one branch = one worktree
no same-file collisions unless intentionally competing
merge serially
review diff before PR
```

## Phase 5 — add Codex review

Inside Claude Code:

```text
/codex:review --base main --background
/codex:adversarial-review --base main focus on auth, data loss, rollback, race conditions, hidden coupling --background
/codex:status
/codex:result
```

Codex is a witness, not the permission boundary.

## Phase 6 — selective tool benchmark gate

Before installing Context Mode, Headroom, Claude Context, memory MCPs, dashboards, or orchestrators:

```text
run baseline task
run candidate-tool task
compare tokens, wall time, correctness, tests, diff quality, security risk
keep only if measurable benefit > operational risk
```

## Phase 7 — memory/MCP gate

Use durable memory first:

```text
GitHub issue/PR
ADR
repo-map docs
AGENTS.md
CLAUDE.md
skills
Task Master / CCPM
```

Only evaluate memory MCPs after repeated context-reconstruction cost is measured.

## Phase 8 — final shipping gate

```text
git diff --stat
git diff --check
just verify
/codex:review --base main --background
/codex:adversarial-review --base main --background
human or policy merge gate
```
