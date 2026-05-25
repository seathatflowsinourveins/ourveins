# Claude Code SOTA V58 — Definitive Elite Consensus Kit

This kit is for Claude Code CLI to read and execute. It intentionally separates default runtime, selective tools, reference-only repos, audit-required tools, and discovery-only lists.

Core rule:

```text
high-star discovery → convergence filtering → source audit → benchmark-before-adoption → only best-of-best runtime
```


## Read order

1. `CLAUDE.md`
2. `AGENTS.md`
3. `EXECUTE_V58_ELITE_PLAN.md`
4. `SOTA_REPOS_BEST_OF_BEST_FINAL_LIST.md`
5. `TOKEN_CONTEXT_ARCHITECTURE.md`
6. `MEMORY_MCP_AGENT_ORCHESTRATION.md`
7. `MODEL_ROUTING_AND_SUBAGENTS.md`
8. `OFFICIAL_SDKS_AND_PROVIDER_SURFACES.md`
9. `CODEX_PLUGIN_CC_WORKFLOW.md`
10. `PARALLEL_WORKTREE_AUTOMATION.md`
11. `CLI_TERMINAL_CODE_QUALITY_GUIDE.md`
12. `EVAL_BENCHMARK_OBSERVABILITY.md`
13. `SOURCE_AUDIT_NOTES.md`

## Default runtime stack

```text
CORE: Claude Code + Codex CLI + openai/codex-plugin-cc
MEASUREMENT: ccusage + claude-devtools + ccstatusline + cross-code-organizer
TOKEN/CONTEXT: RTK + Serena + Repomix
CLI: rg + fd + jq + yq + gh + pre-commit + just + mise + uv
QUALITY: semgrep + CodeQL + gitleaks + trufflehog + trivy + osv-scanner + ruff + biome + oxc + shellcheck + actionlint + typos + vale + markdownlint + textlint
```

## Final convergence

```text
Context admission > prompt engineering
Semantic retrieval > file dumping
Read-path compression > shell-output-only compression
Skills/rules > giant CLAUDE.md
Slash commands > repeated prompting
Hooks > hoping the model remembers
Subagents = context isolation
Worktrees = file isolation
Codex/GPT-class model = second-model witness
Opus-class model = deep architect/security/research subagent
Memory plugins = audit-required, not default
MCPs = selective, not global
Benchmarks/evals = proof, not vibes
Operator dashboards = multi-agent control plane
CLI quality gates > vibes
GitHub issues/PRs/ADRs = durable memory
```
