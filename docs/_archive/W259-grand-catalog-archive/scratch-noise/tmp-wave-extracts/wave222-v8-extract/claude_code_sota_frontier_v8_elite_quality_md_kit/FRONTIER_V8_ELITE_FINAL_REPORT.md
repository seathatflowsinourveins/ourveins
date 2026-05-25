# Frontier V8 Elite Final Report

## Mission
Create a Claude Code CLI-readable operating guide for a high-quality, fully automated, token-optimized coding harness using only the best convergent repos and patterns.

## V8 decision
Previous passes maximized breadth. V8 optimizes for quality:
- official first
- proven primitives second
- broad marketplaces as discovery only
- hooks/MCP/operator dashboards behind source-audit gates
- worktree orchestration as the parallelism standard
- Codex as a second-model witness rather than primary permission boundary

## Final operating architecture

```text
Issue / PRD / task
  -> plan/spec/task graph
  -> context capsule: symbols + repo map + relevant docs
  -> isolated worktree worker
  -> filtered shell/tool output
  -> local quality gates
  -> Claude reviewer
  -> Codex review/adversarial review/rescue
  -> PR / CI / static analysis
  -> durable memory update: ADRs, skills, rules, AGENTS.md
```

## Best-of-best default install

```text
anthropics/claude-code
openai/codex
openai/codex-plugin-cc
ryoppippi/ccusage
rtk-ai/rtk
oraios/serena
yamadashy/repomix
BurntSushi/ripgrep
sharkdp/fd
jqlang/jq
mikefarah/yq
cli/cli
pre-commit/pre-commit
casey/just
jdx/mise
astral-sh/uv
```

## Best advanced stack by dimension

```text
Measurement: ccusage + claude-devtools + ccstatusline
Context: RTK + Context Mode + Headroom + Wet
Code intelligence: Serena + Repomix + Claude Context + Aider repo-map + ast-grep/tree-sitter
Workflow: BMAD + Task Master or CCPM + PRPs + Ruler + wshobson/agents
Parallel: native worktrees + /batch + Claude Squad / Agent Orchestrator / Tutti / CCUI
Second model: codex-plugin-cc + direct Codex CLI + optional bridge plugins
Quality: pre-commit + ruff/biome/oxc + semgrep + CodeQL + gitleaks + trivy
```

## Convergence findings

1. **Context admission beats prompt engineering.** RTK, Context Mode, Headroom, Wet, hooks, and CLI filtering all prevent low-value bytes from entering context.
2. **Semantic retrieval beats file dumping.** Serena, Claude Context, Aider, Repomix, ast-grep, tree-sitter, and mgrep converge on structural retrieval.
3. **Skills/rules beat giant CLAUDE.md.** Claude and Codex both converge on durable global guidance plus on-demand skills.
4. **Worktrees are the filesystem isolation primitive.** Native Claude worktrees, `/batch`, Composio AO, Tutti, Claude Squad, CCUI, AgentHub, agtx, and Vibe Kanban all converge here.
5. **Codex is the second-model witness.** Codex plugin review/adversarial review/rescue is strongest as challenge/review, not as the main permission boundary.
6. **Operator dashboards are becoming the control plane.** The editor becomes one instrument; dashboards manage branches, diffs, terminals, PRs, costs, and agent state.
7. **Quality gates beat vibes.** Static analysis, tests, pre-commit, CodeQL, Semgrep, Gitleaks, Trivy, actionlint, and typos form the objective gate layer.
8. **GitHub issues/PRs/ADRs are durable memory.** Chat is not the project database.

## High-quality repo interpretation

- `shanraisshan/claude-code-best-practice`: reference implementation for Claude Code skills, subagents, commands, and hooks.
- `affaan-m/everything-claude-code`: broad pattern library for agent harness performance, skills, memory, security, and research-first development.
- `openai/codex-plugin-cc`: official bridge for Codex review/adversarial review/rescue inside Claude Code.
- `wshobson/agents`: high-quality modular plugin ecosystem with progressive disclosure and plugin evaluation concepts.
- `ComposioHQ/agent-orchestrator` and `nutthouse/tutti`: strongest architecture signals for local multi-agent worktree operations.
- `rtk-ai/rtk`, `mksglu/context-mode`, `oraios/serena`, `yamadashy/repomix`: highest leverage token/context architecture stack.

## Install policy

```text
Install by default:
  ccusage, RTK, Serena, Repomix, CLI quality tools.

Install selectively:
  Context Mode, Headroom, workflow frameworks, plugin packs, operator dashboards.

Audit before install:
  hooks, MCP servers, bridge plugins, memory layers, dashboards, one-line installers.

Use as reference only:
  broad awesome lists, mega marketplaces, experimental harnesses.
```
