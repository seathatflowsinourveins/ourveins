---
title: Wave110 AgentC Install Evaluation
status: complete
date: 2026-05-09
agent: wave110-agentC-install-eval
---

# Top-5 Install Candidate Evaluation

## Candidate 1: langchain-ai/langgraph
- Mia-probe: Checked `.mcp.json`, `.claude/settings.json`, `.claude/plugins/cache/`, `Z:/venvs/claude/Lib/site-packages/`, and `Z:/venvs/claude/Scripts/`.
- Verdict: ALREADY-INSTALLED
- Evidence: `Z:/venvs/claude/Lib/site-packages/langgraph` exists; `pip show langgraph` reports version `1.1.8` at `Z:\venvs\claude\Lib\site-packages`.
- Install command (if GENUINE-GAP): n/a

## Candidate 2: openai/openai-agents-python
- Mia-probe: Checked `.mcp.json`, `.claude/settings.json`, `.claude/plugins/cache/`, `Z:/venvs/claude/Lib/site-packages/`, and `Z:/venvs/claude/Scripts/`; also checked KISS Must-Never #4 coverage for agent/reviewer orchestration.
- Verdict: DUPLICATE-COVERAGE
- Evidence: `pip show openai-agents` returned no installed package, but `.claude/settings.json` has `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1` and enabled plugins including `agent-sdk-dev@claude-plugins-official`, `code-review@claude-plugins-official`, `pr-review-toolkit@claude-plugins-official`, `feature-dev@claude-plugins-official`, and `openai-codex@openai-codex`; plugin cache contains `claude-plugins-official/agent-sdk-dev/.../README.md` with Agent SDK verifier agents and SDK app scaffolding. The candidate's stated use-case, structured multi-agent coordination/reviewer roles, is therefore already covered operationally in this Claude runtime.
- Install command (if GENUINE-GAP): n/a

## Candidate 3: confident-ai/deepeval
- Mia-probe: Checked `.mcp.json`, `.claude/settings.json`, `.claude/plugins/cache/`, `Z:/venvs/claude/Lib/site-packages/`, and `Z:/venvs/claude/Scripts/`.
- Verdict: ALREADY-INSTALLED
- Evidence: `Z:/venvs/claude/Lib/site-packages/deepeval` and `Z:/venvs/claude/Scripts/deepeval.exe` exist; `pip show deepeval` reports version `3.9.7` at `Z:\venvs\claude\Lib\site-packages`.
- Install command (if GENUINE-GAP): n/a

## Candidate 4: openai/evals
- Mia-probe: Checked `.mcp.json`, `.claude/settings.json`, `.claude/plugins/cache/`, `Z:/venvs/claude/Lib/site-packages/`, and `Z:/venvs/claude/Scripts/`; also checked KISS Must-Never #4 coverage for evaluation harnesses.
- Verdict: DUPLICATE-COVERAGE
- Evidence: `pip show evals` returned no installed package, but `deepeval` is already installed for executable LLM assertions and `inspect_ai` plus `inspect_evals` are installed in `Z:/venvs/claude/Lib/site-packages/` (`inspect_ai-0.3.205.dist-info`, `inspect_evals-0.8.0.dist-info`). Because the candidate's stated use-case is repeatable model/capability evaluation, the current runtime already has two evaluation surfaces covering that territory.
- Install command (if GENUINE-GAP): n/a

## Candidate 5: Arize Phoenix MCP
- Mia-probe: Checked `.mcp.json`, `.claude/settings.json`, `.claude/plugins/cache/`, `Z:/venvs/claude/Lib/site-packages/`, `Z:/venvs/claude/Scripts/`, and global npm packages for `@arizeai/phoenix-mcp`; also checked KISS Must-Never #4 coverage for trace-backed validation.
- Verdict: GENUINE-GAP
- Evidence: `.mcp.json` has no Phoenix MCP server entry; global `npm list -g --depth=0` returned no `@arizeai/phoenix-mcp`, `phoenix`, or `arize` package; Python site-packages did not show an Arize/Phoenix MCP package. `.claude/settings.json` does show the runtime is already wired to an existing Phoenix service at `127.0.0.1:14317` OTLP gRPC and `127.0.0.1:16006` UI, so trace collection is covered, but no installed MCP query surface was found. Existing `context7`, `mcp-memory`, `graphiti`, and ECC safety-guard do not provide Phoenix trace-query access.
- Install command (if GENUINE-GAP): `npx -y @arizeai/phoenix-mcp@latest --baseUrl http://127.0.0.1:16006`

# Summary
GENUINE-GAP count: 1
Install queue (priority order): [Arize Phoenix MCP]

VERDICT: INSTALL-EVAL-COMPLETE
