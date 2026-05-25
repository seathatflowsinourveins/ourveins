# OFFICIAL_SDKS_AND_PROVIDER_SURFACES.md

## Anthropic

```text
anthropics/claude-code
anthropics/skills
anthropics/claude-agent-sdk-python
anthropics/claude-agent-sdk-typescript
anthropics/anthropic-sdk-python
anthropics/anthropic-sdk-typescript
anthropics/claude-code-action
anthropics/claude-code-security-review
```

Use Claude Agent SDK for custom automation when Claude Code CLI is not enough. Keep CLI-first for normal local engineering.

## OpenAI

```text
openai/codex
openai/codex-plugin-cc
openai/skills
openai/openai-agents-python
openai/openai-python
openai/openai-node
openai/evals
```

Use Codex plugin for second-model review/rescue inside Claude Code.

Use OpenAI Agents SDK and evals as reference/selective layers for custom multi-agent harnesses and benchmark gates.

## MCP / GitHub

```text
modelcontextprotocol/modelcontextprotocol
modelcontextprotocol/servers
modelcontextprotocol/inspector
github/github-mcp-server
```

MCPs are selective. Prefer CLI tools when the CLI is enough.
