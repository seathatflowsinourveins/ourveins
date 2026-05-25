# Source Audit Notes

This kit is based on public docs, READMEs, repo file trees, and architecture surfaces. It is not a line-by-line security audit of every repo.

## Local audit workflow for Claude Code

1. Clone the candidate repo into an isolated worktree or sandbox.
2. Read README, LICENSE, SECURITY, CONTRIBUTING, install scripts, package manifests.
3. Search for network, shell, credential, filesystem, and telemetry behavior:
```bash
rg -n "curl|wget|fetch|axios|child_process|spawn|exec|eval|openai|anthropic|token|secret|telemetry|postinstall|MCP|mcp" .
```
4. Inspect hooks and MCP configs.
5. Run static scanners where applicable.
6. Install only in a throwaway repo first.
7. Measure token/cost impact before promoting to default.

## Audit levels
- Level 0: documentation only, no install.
- Level 1: read source tree and scripts.
- Level 2: run tests / inspect package lock.
- Level 3: sandbox install.
- Level 4: production allowlist.
