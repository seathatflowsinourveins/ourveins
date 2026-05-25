# Official SDKs and Provider Surfaces — V62

## Anthropic official surfaces

```text
anthropics/claude-code
anthropics/skills
anthropics/claude-agent-sdk-python
anthropics/claude-agent-sdk-typescript
anthropics/anthropic-sdk-python
anthropics/anthropic-sdk-typescript
```

Use these when building custom Claude Code-like harnesses, private automation, internal tools, or controlled agent applications.

## OpenAI official surfaces

```text
openai/codex
openai/codex-plugin-cc
openai/skills
openai/openai-agents-python
openai/openai-python
openai/openai-node
openai/evals
```

Use Codex as a second-model witness from Claude Code. Use OpenAI Agents SDK or Evals as reference/selective layers for custom multi-agent workflows and benchmark gates.

## Cross-provider rule

Provider SDKs are foundation/reference. Do not build production wrappers around leaked or unofficial Claude Code internals.
