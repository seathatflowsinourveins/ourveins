# Execute V62 Elite Plan

This file is an executable adoption plan for Claude Code CLI.

## Phase 0 — Freeze baseline

```bash
git status --short
git branch --show-current
git log -1 --oneline
npx ccusage@latest daily || true
npx ccusage@latest session || true
```

Record current token usage, wall-clock time, common failure modes, and baseline verification commands.

## Phase 1 — Install default small stack only

Default install candidates:

```text
ccusage
RTK
Serena
Repomix
rg / fd / jq / yq / gh
pre-commit / just / mise / uv
```

Do not install memory plugins, dashboards, bridge plugins, MCP servers, or broad skill packs yet.

## Phase 2 — Create concise durable instructions

- Keep `CLAUDE.md` short.
- Keep `AGENTS.md` practical: repo layout, build/test/lint commands, conventions, done criteria.
- Move workflows into `.claude/skills`.
- Use path-specific rules only when stable.

## Phase 3 — Establish verification gates

```bash
just test
just lint
just typecheck
just security
pre-commit run --all-files
```

Language-specific gates should be deterministic. LLM review does not replace tests.

## Phase 4 — Add Codex as second-model witness

```text
/codex:review --base main --background
/codex:adversarial-review --base main look for hidden coupling, race conditions, rollback gaps, data loss, auth bugs, and brittle tests --background
/codex:rescue --background investigate the failing CI job and propose the smallest safe fix
```

Use Codex for review/rescue, not as Claude Code's permission boundary.

## Phase 5 — Parallel worktree operation

```bash
git fetch --all --prune
git remote set-head origin -a
claude --worktree feature-a
claude --worktree bugfix-b
```

One task = one branch = one worktree. Never run independent agents in the same checkout.

## Phase 6 — Audit selective tools

For each selective tool:

```text
1. Read README, install scripts, package manifests, lockfiles.
2. Inspect hooks, MCP definitions, postinstall scripts, telemetry, network calls.
3. Identify permissions and uninstall path.
4. Run in sandbox/devcontainer first.
5. Benchmark against baseline.
```

## Phase 7 — Benchmark-before-adoption

A tool survives only if it improves at least one metric without unacceptable risk:

```text
tokens
wall time
correctness
tests passed
review quality
security posture
cleanup reliability
operator visibility
```

## Phase 8 — Continuous convergence loop

After each project:

- Update AGENTS.md only for durable cross-agent facts.
- Add/adjust Skills for repeatable workflows.
- Add ADRs for architectural decisions.
- Remove unused MCPs, hooks, plugins, and memory layers.
- Re-run benchmark-eval-gate on heavy tools.
