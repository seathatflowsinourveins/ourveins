# AGENTS.md — cross-agent contract

This repository may be read by Claude Code, Codex, Gemini CLI, OpenCode, or other coding agents.

## Universal rules

- Treat Git as durable memory.
- Treat `CLAUDE.md`, `AGENTS.md`, `.claude/skills`, ADRs, and issue/PR history as durable instruction/state.
- Do not rely on conversation history for project truth.
- Do not exfiltrate secrets or read `.env` unless explicitly authorized.
- Do not use broad MCPs globally. Enable only the MCPs required for the current task.
- Do not install plugins, hooks, MCP servers, or memory tools without running `source-repo-audit`.

## Model roles

- Claude Opus-class: architecture, hard debugging, deep research, security review, harness design.
- Sonnet-class: implementation, refactor, tests, normal code review.
- Codex/GPT-class: second-model review, adversarial review, CI rescue, independent bug hypothesis.
- Mini/cheap class: summarization, classification, log triage, simple issue drafting.
