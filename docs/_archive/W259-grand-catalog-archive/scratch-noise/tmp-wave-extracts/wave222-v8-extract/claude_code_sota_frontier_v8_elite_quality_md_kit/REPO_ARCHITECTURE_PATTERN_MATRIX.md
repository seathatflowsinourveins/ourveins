# Repo Architecture Pattern Matrix

| Pattern | Primary repos | Use when | Risk |
|---|---|---|---|
| Native Claude automation | anthropics/claude-code | Always | Low |
| Cross-model review | openai/codex-plugin-cc | High-risk PRs, CI failures, design challenge | Medium; separate Codex permissions |
| Usage ledger | ccusage, claude-devtools, ccstatusline | Any serious automation | Low |
| Shell output compression | RTK, sqz, squeez | Bash/git/test/log output is noisy | Medium; hooks rewrite commands |
| Large-output sandboxing | Context Mode, Headroom, Wet | Browser/API/log/CSV/JSON dumps | Medium; MCP/hook boundaries |
| Semantic retrieval | Serena, Claude Context, Aider, ast-grep, tree-sitter | Large repos | Medium; index accuracy |
| Repo snapshots | Repomix, code2prompt | Architecture review, onboarding, PR capsule | Low/Medium; avoid dumping secrets |
| Task graph / PM | Task Master, CCPM, BMAD, PRPs, Ruler | Multi-day features | Medium; context/tool overhead |
| Operator UI | Claude Squad, AO, Tutti, CCUI, AgentHub, Vibe Kanban | 3+ agents/worktrees | High; shell + git + credentials |
| Skills marketplace | anthropics/skills, wshobson, daymade, alirezarezvani | Repeat workflows | Medium; review instructions/scripts |
| Security gates | Semgrep, CodeQL, Gitleaks, Trivy, MCP Scan | Always for production | Low |
| Awesome discovery | awesome-claude-code, awesome-cli-coding-agents | Research only | Low |
