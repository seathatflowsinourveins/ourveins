---
name: execute-v63-plan
description: Execute the V63 elite adoption plan
disable-model-invocation: true
---


# Execute V63 Elite Plan for Claude Code

This file is written as instructions for Claude Code CLI.

## Objective

Adopt only the best-of-best SOTA Claude Code ecosystem components, with measured token efficiency, correctness, safety, and workflow quality. Do not install broad packs blindly.

## Phase 0 — classify current repo

1. Read `CLAUDE.md`, `AGENTS.md`, package manifests, CI configs, and test commands.
2. Identify languages, package manager, test runner, lint/typecheck/security gates.
3. Produce `docs/agentic-harness/repo-baseline.md`:
   - language stack
   - build/test/lint/typecheck commands
   - CI workflow names
   - risky domains: auth, payments, data loss, infra, PII
   - current known flaky tests
   - branch strategy

## Phase 1 — baseline token/cost and context

Install / verify only the default core first:

```bash
# Use your preferred package manager; examples are intentionally conservative.
npx ccusage@latest daily || true
npx ccusage@latest session || true
rg --version
fd --version
jq --version
gh --version
```

Create a baseline report:

```text
docs/agentic-harness/baseline.md
```

Record:

```text
current Claude model
context usage
average session cost
tools loaded by MCP
largest context contributors
```

## Phase 2 — context admission stack

Default:

```text
RTK for Bash-output compression.
Serena for semantic retrieval/editing.
Repomix for deliberate repo capsules.
```

Rules:

```text
diff stat before full diff
search before read
symbols before file bodies
tail logs before full logs
focused tests before full suite
skills before giant CLAUDE.md
```

Do not install Context Mode, Headroom, Wet, Claude Context, or memory MCP until benchmarked.

## Phase 3 — project instruction architecture

Keep `CLAUDE.md` below 200 lines.

Use:

```text
CLAUDE.md = small always-loaded router
AGENTS.md = cross-agent contract for Claude/Codex/OpenAI/Gemini/OpenHands-style tools
.claude/skills = long repeatable procedures
.claude/agents = focused roles
docs/adr = durable decisions
docs/agentic-harness = logs and benchmark evidence
```

## Phase 4 — quality gates

Create or verify:

```bash
just test
just lint
just typecheck
just security
```

If absent, create a `justfile` that wraps existing commands.

Minimum gates:

```text
format
lint
typecheck
unit tests
focused integration tests
secret scan
dependency scan
action lint
markdown/prose lint if docs-heavy
```

## Phase 5 — Codex second-model witness

Install and configure only official bridge:

```text
openai/codex-plugin-cc
```

Use:

```text
/codex:review --base main --background
/codex:adversarial-review --base main focus on data loss, auth bypass, rollback gaps, hidden coupling, concurrency, and migration risk --background
/codex:rescue --background investigate failing CI and propose the smallest safe fix
```

Never treat Codex plugin as permission boundary. Treat it as reviewer, adversary, or rescue worker.

## Phase 6 — worktree parallelism

Use one task per branch/worktree.

```bash
git fetch --all --prune
git remote set-head origin -a
claude --worktree cc-123-feature
```

For large independent changes:

```text
/batch <task with acceptance criteria, split guidance, test requirements, and conflict constraints>
```

Merge only after:

```text
focused tests pass
diff reviewed
Codex review reconciled
CI passes
security gates pass
```

## Phase 7 — benchmark-before-adoption

For every selective/audit-required tool:

1. Run source audit.
2. Install in a disposable worktree.
3. Run the same benchmark task:
   - baseline Claude Code
   - Claude Code + tool
   - Claude Code + tool + Codex review
4. Compare:
   - token use
   - wall time
   - files touched
   - tests passed
   - defects found
   - false positives
   - security/privacy risk
   - cleanup/uninstall quality

Keep only if it wins clearly.

## Phase 8 — memory/MCP adoption

Default to durable artifacts first:

```text
git commits
GitHub issues / PRs
ADRs
AGENTS.md
CLAUDE.md
skills
Task Master / CCPM state
repo maps
```

Only evaluate memory MCPs if repeated context reconstruction is expensive and measurable.

For any MCP:

```text
audit tool descriptions
audit prompts
audit env vars
audit filesystem/network access
audit install scripts
audit telemetry
audit secrets handling
audit uninstall path
scan with MCP/security scanners
```

## Phase 9 — operating loop

For every meaningful task:

```text
issue/spec
plan
context capsule
worktree
implement
focused tests
diff review
Codex review
adversarial review if risky
CI
PR
ADR/update skills if reusable
```

## Phase 10 — continuous pruning

Every week:

```text
remove unused MCP servers
prune stale skills
delete dead worktrees
summarize active context
archive decisions into ADRs
review ccusage
review failed benchmark candidates
```

