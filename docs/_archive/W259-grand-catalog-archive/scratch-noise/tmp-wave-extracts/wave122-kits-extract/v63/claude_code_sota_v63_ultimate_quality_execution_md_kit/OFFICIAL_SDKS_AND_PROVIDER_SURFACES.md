# Official SDKs and provider surfaces

## Anthropic

```text
anthropics/claude-code
anthropics/skills
anthropics/claude-agent-sdk-python
anthropics/claude-agent-sdk-typescript
anthropics/anthropic-sdk-python
anthropics/anthropic-sdk-typescript
```

Use the Claude Agent SDK when you need a custom programmatic harness with Claude Code-like tool use, command execution, file editing, and context management.

## OpenAI

```text
openai/codex
openai/codex-plugin-cc
openai/skills
openai/openai-agents-python
openai/openai-python
openai/openai-node
```

Use Codex for local agentic coding, `codex-plugin-cc` for second-model review inside Claude Code, and OpenAI Agents SDK for custom multi-agent workflows.

## Design rule

Prefer official SDKs when building provider-level harnesses. Community repos are pattern sources or selective operators unless audited.
