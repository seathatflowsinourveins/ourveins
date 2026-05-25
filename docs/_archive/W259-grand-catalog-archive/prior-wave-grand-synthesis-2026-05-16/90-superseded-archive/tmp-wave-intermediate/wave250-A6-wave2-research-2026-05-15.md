---
title: Wave 250 Agent A6 — Wave 2 BRIDGE-MODE research
status: FINAL
date: 2026-05-15
agent: A6
input: tmp/wave250-A5-synthesis-2026-05-15.md Section 4
---

# Wave 250 A6 — Wave 2 SOTA gap catalog

## Local baseline check

- Checked `.mcp.json`: installed MCPs are `github`, `context7`, `deepwiki`, `playwright`, `chrome-devtools`, `repomix`, `serena`, `memory`, `graphiti`, `phoenix`, `gitnexus`, `ccusage`.
- Checked `.claude/plugins/cache/`: top-level cache entries are `addy-agent-skills`, `anthropic-agent-skills`, `antigravity-awesome-skills`, `claude-code-skills`, `claude-code-workflows`, `claude-plugins-official`, `claude-settings`, `context-mode`, `everything-claude-code`, `openai-codex`, `thedotmack`.
- `rg` over plugin `plugin.json` / `marketplace.json` found no direct cache hits for `continue`, `cline`, `roo`, `aider`, `swe-agent`, `langgraph`, `autogen`, `crewai`, `smolagents`, `browser-use`, `e2b`, or `inngest`.
- Selection rule: prioritize GENUINELY-NEW or high-value PROVIDER-COMPLEMENT rows relative to the installed Claude Code + MCP + plugin baseline; treat competing IDE/CLI agents as benchmarks unless they add a missing primitive.

## Top 5 scored catalog entries

| Rank | Candidate | GitHub org | Stars | License | CR-12 class | Install method | Priority | Rationale |
|---:|---|---|---:|---|---|---|---|---|
| 1 | `browser-use/browser-use` | `browser-use` | 92.7k [VERIFIED via GitHub page crawl] | MIT | GENUINELY-NEW | `pip install browser-use`; optional Docker/cloud for hosted browsers | P1 | Adds a high-level LLM browser-agent layer above installed Playwright/Chrome DevTools for task-level web automation research, but should not replace deterministic browser MCPs. |
| 2 | `e2b-dev/E2B` | `e2b-dev` | 12.1k [VERIFIED via GitHub page crawl] | Apache-2.0 | PROVIDER-COMPLEMENT | `npm i e2b` / `pip install e2b`; Docker/Terraform for self-hosting | P1 | Fills the remote isolated compute/sandbox gap for untrusted code execution and code-interpreter patterns, gated by credential, network, and security review. |
| 3 | `SWE-agent/SWE-agent` | `SWE-agent` | 18k [VERIFIED via GitHub page crawl] | MIT | PROVIDER-COMPLEMENT | `pip install swe-agent` or upstream Docker/CLI path | P1 | Strong candidate as a SWE-bench repair/eval harness and trajectory source, not a day-to-day replacement for Claude Code or Codex CLI. |
| 4 | `langchain-ai/langgraph` | `langchain-ai` | 31k [VERIFIED via GitHub org crawl] | MIT | PROVIDER-COMPLEMENT | `pip install langgraph` / `npm install @langchain/langgraph` | P2 | Best durable graph-orchestration architecture reference for long-running stateful agents, but overlaps runtime orchestration and should remain an experiment/reference layer. |
| 5 | `huggingface/smolagents` | `huggingface` | 27.1k [BEST CURRENT WEB KNOWLEDGE; BuilderWorld crawl] | Apache-2.0 | GENUINELY-NEW | `pip install smolagents` | P2 | Provides a small code-as-action agent loop and sandbox integration patterns useful for local/open-model experiments without importing a heavy multi-agent platform. |

## Near-miss / benchmark-only notes

- `Aider-AI/aider` — 44.5k stars, Apache-2.0; DUPLICATE-FUNCTIONALITY as a competing terminal coding CLI, useful only for external benchmark comparisons against Codex/Claude Code.
- `continuedev/continue` — ~31.4k stars, Apache-2.0; DUPLICATE-FUNCTIONALITY as IDE assistant surface, possibly cite-worthy for context/index design but not an eee runtime install.
- `cline/cline` — ~60k+ stars, Apache-2.0; DUPLICATE-FUNCTIONALITY as VS Code agent harness; installed baseline already has Claude Code, Codex plugin, browser MCPs, and permission hooks.
- `RooCodeInc/Roo-Code` — 23.9k stars, Apache-2.0; DUPLICATE-FUNCTIONALITY as Cline-family VS Code agent harness, benchmark/reference only.
- `microsoft/autogen` — 57.8k stars, code MIT/docs CC-BY-4.0, but upstream README now marks AutoGen maintenance mode and points new users to Microsoft Agent Framework; STUDY-PILOT only as historical multi-agent reference.
- `crewAIInc/crewAI` — 50.9k stars, MIT; PARTIAL-OVERLAP with LangGraph/AutoGen-style orchestration, lower priority than LangGraph for eee because role-agent workflow adds less to the installed operator runtime.

## Source notes

- GitHub crawls used for volatile repo metadata: `browser-use/browser-use`, `e2b-dev/E2B`, `SWE-agent/SWE-agent`, `langchain-ai` org repositories, `huggingface/smolagents`, `microsoft/autogen`, `crewAIInc/crewAI`, `Aider-AI/aider`, `continuedev/continue`, `cline/cline`, `RooCodeInc/Roo-Code`.
- Local duplicate checks: `.mcp.json` and `.claude/plugins/cache/` in `Z:/claude-sota-installed`.
- Star counts are inherently volatile; rows are marked `[VERIFIED]` where sourced from current GitHub crawl snippets and `[BEST CURRENT WEB KNOWLEDGE]` where sourced from a secondary crawler snapshot.

WAVE2 COMPLETE: A6
