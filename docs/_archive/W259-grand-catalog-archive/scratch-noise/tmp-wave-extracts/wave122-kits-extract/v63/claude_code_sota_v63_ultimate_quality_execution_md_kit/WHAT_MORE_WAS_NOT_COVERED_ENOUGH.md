# What more was not covered enough, and what V63 closes

## 1. Memory risk was underweighted

Persistent memory is not just a convenience feature. It changes retention, privacy, deletion, and prompt-injection risk. V63 makes memory audit-required.

## 2. MCP governance was underweighted

MCP servers expose tools, descriptions, prompts, network/filesystem access, and hidden context. V63 adds scanners and strict audit gates.

## 3. External agent frameworks were underweighted

LangGraph, AutoGen, ADK, PydanticAI, CrewAI, Agno, smolagents are reference architectures, not default installs. V63 mines them for state, eval, orchestration, and observability patterns.

## 4. Eval/observability was underweighted

Agentic automation should not be adopted based on vibes. V63 adds benchmark gates and eval/observability references.

## 5. Prose/grammar quality was underweighted

Agent-generated docs and instructions can rot. V63 adds Vale, markdownlint, textlint, and typos.

## 6. Model routing needed to be explicit

V63 separates deep Claude subagents from Codex/GPT-class second-model review and low-cost triage.

## 7. Official SDK surfaces were underweighted

V63 explicitly adds Anthropic Agent SDK, Anthropic SDKs, OpenAI Agents SDK, OpenAI SDKs, and OpenAI Skills.
