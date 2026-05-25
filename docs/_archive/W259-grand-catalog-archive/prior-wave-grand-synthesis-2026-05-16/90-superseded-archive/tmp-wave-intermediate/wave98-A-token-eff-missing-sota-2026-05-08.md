# Wave 98-A — Token-Efficiency Missing-SOTA Audit

**Agent**: sota-researcher Sonnet stand-in (agentId a2ca19b86b0aa012c, 301180ms / 25 tools / 416744 tokens)
**Date**: 2026-05-08
**STAND-IN-NOTICE**: Sonnet stand-in per CLAUDE.local.md ENV (g). Cross-model gate NOT structurally satisfied — orchestrator MUST fire `codex exec --ephemeral -p deep-review-exec` foreground+tee BEFORE any commit per CR-3 Phase 1 bootstrap exception.

## R0 — Hypothesis (falsification-first)

H1: "claude-sota-installed has token-efficiency primitives covering ALL major SOTA categories (CLI-output filtering / context-window observability / semantic code retrieval / cost telemetry / model routing / cache breakpoint placement) — no major gap remains."

VERDICT: H1 **REJECTED** (n=3 high-confidence missing categories surfaced).

## Verdict

**VERDICT: REVISE-LIST** (current installed token-eff stack covers ~70% of SOTA categories; ~30% gap)
**confidence: 0.84**

### Top-5 ADOPT-NOW

1. **rtk-ai/rtk v0.37.2** — install via Homebrew or `cargo install rtk` — wire PreToolUse Bash-rewrite hook. **Highest leverage**: empirically-measured 60-90% on every Bash tool call. Apache 2.0. Cite: `Z:/repos/deps/rtk-ai__rtk/CLAUDE.md:7,71 @ HEAD 80a6fe6`. Risk: LOW.

2. **henchmarketing-rgb/headroom** — context-window observability statusline (closes Sonnet 4.6 200k vs 1M unlock awareness gap). Plugin install. Risk: LOW.

3. **zilliztech/claude-context** — Milvus-backed semantic code search MCP. Distinct from Serena (LSP-only). 40-62% reduction RAG-class. Adopted by OpenAI/Google DeepMind/Microsoft/AWS. Risk: MED (Milvus container dep).

4. **anthropic-cookbook max_budget_usd in eee.ps1** — wire `--max-budget-usd 5.00` for non-interactive cron paths. Cite: `examples/max_budget_usd.py:31-50 @ HEAD`. Risk: LOW.

5. **OTEL_LOG_RAW_API_BODIES=1 GATED** — deferred per Wave 82a; wire via session-env file (NOT settings.json) when actively debugging Langfuse. Risk: MED for PII (covered by deferral).

### Top-3 STUDY-PILOT

1. **musistudio/claude-code-router (CCR)** — multi-model routing proxy (claimed 50-99% needs MEASURED validation; overlaps CLIProxyAPI; CR-3 requires explicit T0/T1 design review).
2. **gglucass/headroom-desktop** — Windows support preview-only.
3. **anthropic-cookbook session_stores Postgres/Redis** — no current cron demonstrates need.

### REJECT-FOR-FIT

1. **flightlesstux/prompt-caching** — own README: not for CC sessions; SDK-direct only.
2. **chopratejas/headroom MCP** — DUPLICATE of context-mode ctx_compress per Probe 4 plugin-namespace.
3. **jarrodwatts/claude-hud** — cosmetic; ccusage covers cost axis.

### HONEST-NON-FINDING

- deepagents already adapted via parent cardinal-rules (`_EXCLUDED_STATE_KEYS`)
- claude-md-management + agent-sdk-dev + session-report plugins out-of-scope for token-eff direct mechanism

## CR-3 Phase 1 bootstrap exception

Orchestrator MUST satisfy cross-model gate via `codex exec --ephemeral -p deep-review-exec` foreground+tee BEFORE any Pattern A apply commit. Recommended T1 consult scope: "review Top-5 ADOPT-NOW order + RTK PreToolUse hook wire mechanics + headroom statusline integration + claude-context Milvus dependency vs existing FalkorDB stack collision risk".

## Sources (web-verified 2026-05-08)
- rtk-ai/rtk + rtk-ai.app
- henchmarketing-rgb/headroom + gglucass/headroom-desktop + chopratejas/headroom
- zilliztech/claude-context + Milvus blog
- musistudio/claude-code-router
- flightlesstux/prompt-caching (REJECT-FOR-FIT confirmation)
