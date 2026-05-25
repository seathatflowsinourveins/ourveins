# Repo Architecture Pattern Matrix

| Pattern | Primary repos | Use | Risk |
|---|---|---|---|
| Native Claude Code foundation | `anthropics/claude-code`, `anthropics/skills`, `claude-code-action` | Build on official commands/hooks/skills/worktrees | Config/permission mistakes |
| Codex bridge | `openai/codex-plugin-cc`, `xiaolai/codex-toolkit-for-claude`, `claudex` | Independent review/rescue | Permission boundary, auth, history isolation |
| Shell-output compression | `rtk-ai/rtk`, `squeez`, `chop`, `pith` | Reduce terminal noise before context | Over-compression can hide relevant facts |
| Large-output sandboxing | `mksglu/context-mode`, `headroom`, `wet` | Browser/API/log/JSON/CSV payloads | Proxy/security review needed |
| Semantic code retrieval | `serena`, `claude-context`, `repomix`, `aider` | Repo maps, symbols, RAG | Index freshness, MCP permissions |
| PM/lifecycle workflow | `BMAD`, `Task Master`, `CCPM`, `context-engineering-intro`, `KARIMO` | PRD → story → task → implementation | Ceremony or task-state drift |
| Operator UI | `agent-orchestrator`, `claude-squad`, `tutti`, `agtx`, `CCUI` | Many worktree agents | Coordination tax, shell access, merge conflicts |
| Skills and plugins | `anthropics/skills`, `wshobson/agents`, `superpowers`, skill marketplaces | Progressive disclosure | Bulk install creates context/security risk |
| CI/security gates | `semgrep`, `CodeQL`, `gitleaks`, `trivy`, `mcp-scan` | Objective gate before merge | False positives/negatives |
| CLI quality foundation | `rg`, `fd`, `jq`, `yq`, `just`, `mise`, `pre-commit`, `ruff`, `biome` | Deterministic, small-output loops | Version drift |
