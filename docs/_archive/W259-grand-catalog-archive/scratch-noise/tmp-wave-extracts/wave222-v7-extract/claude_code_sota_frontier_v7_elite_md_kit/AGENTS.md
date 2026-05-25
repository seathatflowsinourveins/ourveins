# Cross-Agent Contract for Claude Code, Codex, Gemini CLI, OpenCode, and Peer Agents

## Goal

Build high-quality software through a token-efficient, git-isolated, review-gated, multi-agent workflow.

## Required operating principles

1. Use durable task state: GitHub issues, PRs, ADRs, specs, and task files.
2. Use worktrees for parallel edits. Never run two live agents on the same files in one working tree.
3. Use semantic retrieval and context capsules before implementation.
4. Use Codex for independent review and rescue, not as the primary permission boundary.
5. Use deterministic quality gates: tests, linters, typecheckers, security scanners.
6. Keep skills portable: short `name` and `description`, small `SKILL.md`, deeper references in `references/`.
7. Keep `CLAUDE.md` / `AGENTS.md` concise. Move deep workflows into Skills.

## Recommended phase split

```text
Claude Code = orchestrator and implementer
Codex = reviewer / adversarial reviewer / rescue worker
Gemini/OpenCode/Aider = optional research/docs/test specialists
CI = objective gate
Git = durable memory
```
