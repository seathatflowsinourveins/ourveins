# Execute V61 Elite Plan for Claude Code

## Phase 0 — Baseline
1. Run `git status --short`.
2. Run `npx ccusage@latest session` or equivalent usage baseline.
3. Record current `CLAUDE.md`, `AGENTS.md`, `.claude/settings.json`, `.mcp.json`, and Codex config.
4. Run `scripts/verify.sh` if present; otherwise run the smallest known lint/typecheck/test set.

## Phase 1 — Install only the default core
Install or verify:
- Claude Code
- Codex CLI
- `openai/codex-plugin-cc`
- `ccusage`
- RTK
- Serena
- Repomix
- `rg`, `fd`, `jq`, `yq`, `gh`
- `pre-commit`, `just`, `mise`, `uv`

Do not install memory tools, MCP servers, dashboards, bridge plugins, or marketplace packs yet.

## Phase 2 — Configure durable context
1. Keep `CLAUDE.md` under 200 lines.
2. Add `AGENTS.md` for cross-agent instructions.
3. Move repeated workflows into `.claude/skills/*/SKILL.md`.
4. Add architecture docs under `docs/architecture` and ADRs under `docs/decisions`.
5. Prefer GitHub issues/PRs and task files over conversation memory.

## Phase 3 — Token/context architecture
1. Use RTK for noisy Bash output.
2. Use Serena before full-file reads.
3. Use Repomix for deliberate repo capsules.
4. Use Context Mode only when large raw outputs dominate.
5. Use Headroom only when cross-agent compression/memory is needed.
6. Use memory MCPs only after a measured repeated-context-reconstruction problem.

## Phase 4 — Parallel worktree execution
1. Run `git fetch --all --prune`.
2. Run `git remote set-head origin -a`.
3. Add `.claude/worktrees/` to `.gitignore`.
4. Use `claude --worktree <task-id>` or `/batch` for independent units.
5. Use Claude Squad / Agent Orchestrator / CCUI only after audit and benchmark.

## Phase 5 — Codex second-model review
Use Codex as witness:
```text
/codex:review --base main --background
/codex:adversarial-review --base main look for hidden coupling, data loss, auth bugs, rollback gaps, concurrency risks, and test holes --background
/codex:rescue --background investigate CI failure and propose the smallest safe fix
```
Reconcile findings as true positive / false positive / uncertain / blocking / non-blocking.

## Phase 6 — Quality and security gates
Run relevant gates:
- format
- lint
- typecheck
- unit/integration tests
- secret scan
- dependency scan
- IaC scan
- action/shell/docker lint
- prose/grammar gates for docs

## Phase 7 — Benchmark-before-adoption
Before installing heavy tools, compare against baseline:
- tokens used
- wall time
- correctness
- test pass rate
- review quality
- security risk
- failure recovery
- uninstallability

## Phase 8 — Audit-required additions
Audit before installing:
- MCP servers
- memory plugins
- hooks
- dashboards
- bridge plugins
- one-line installers
- system-prompt/tool mutation packages
- provider/proxy switchers
