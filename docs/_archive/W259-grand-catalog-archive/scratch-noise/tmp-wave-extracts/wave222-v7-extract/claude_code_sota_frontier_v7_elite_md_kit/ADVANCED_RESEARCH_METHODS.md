# Advanced Research Methods for Future Refreshes

Use these methods when refreshing the SOTA list.

## Discovery angles

- GitHub topics: `claude-code`, `claude-code-skills`, `token-optimization`, `agent-skills`, `coding-agents`.
- Official docs delta: Claude Code commands, hooks, skills, worktrees, costs; Codex AGENTS.md and Skills.
- Awesome-list triangulation: include a repo only if multiple lists or official docs converge on the pattern.
- Source-surface audit: README, CLAUDE.md, AGENTS.md, package metadata, hooks, MCP, installer, license, tests.
- Architecture clustering: token, retrieval, workflow, operator UI, bridge, quality/security, memory.
- Risk scoring: shell access, network access, memory, secrets, MCP, bridge plugins, autonomous loops.

## Quality scoring

- Official / standards repo: +3
- High-star and active: +2
- Clear architecture docs: +2
- Tests / CI / release discipline: +2
- Narrow composable scope: +2
- Works with worktrees/git safely: +2
- Reduces context admission: +2
- Adds broad MCP/shell/network surface: -3
- Unclear install path or license: -2
- Giant always-loaded prompt/config: -2

## Acceptance bar

Default-install candidates must be useful without forcing a giant always-loaded context, must have clear install/uninstall, and must survive a source audit.
