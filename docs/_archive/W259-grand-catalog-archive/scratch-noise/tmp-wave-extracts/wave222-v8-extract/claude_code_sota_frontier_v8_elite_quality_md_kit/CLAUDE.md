# Claude Code Operating Rules — SOTA Elite

Use this repository as a Claude Code automation harness.

## Core behavior
- Keep the main context small. Use skills, subagents, and files for deep procedures.
- Search symbols before reading whole files. Prefer Serena / semantic tools / rg / ast-grep.
- Prefer `git diff --stat`, `git diff --name-only`, and focused hunks before full diffs.
- Do not dump full logs. Tail, filter, summarize, or use RTK / Context Mode.
- Use git worktrees for parallel tasks. One task = one branch = one worktree.
- Use Codex via `/codex:review`, `/codex:adversarial-review`, and `/codex:rescue` as an independent witness.
- Run deterministic quality gates before declaring work complete.
- Do not install plugins, MCP servers, hooks, or memory layers without source-audit steps.

## Token economics
- The best token is the one never admitted to context.
- Move long workflows from `CLAUDE.md` into `.claude/skills/*/SKILL.md`.
- Use `context: fork` for noisy skills where only the final summary matters.
- Use `/clear` between unrelated tasks and `/compact` only with explicit preservation instructions.

## Completion standard
Before completion, report:
- files changed
- tests/quality commands run
- risks remaining
- whether Codex second-opinion was run
- next action
