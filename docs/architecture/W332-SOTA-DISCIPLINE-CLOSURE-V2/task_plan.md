# W332-SOTA-DISCIPLINE-CLOSURE-V2 — Task Plan

> Durable-planning per `.claude/skills/durable-planning-files/SKILL.md`. Active goal: `/goal W332-SOTA-DISCIPLINE-CLOSURE-V2 @ goal/W331-sota-convergence`.

## Problem

W330-H §3 + W331 Pareto-frontier carries 6 P-blocks fit for model-execution this wave. Six gates close (rubric v12→v13 codify · addyosmani 5-skill vendor-fork · citations-agent skill · plan-attest enablement · Stream-5 absorbs · agent-teams 1.0.2 HEAD reconcile). 8 deferred items carry-forward to W333+ per explicit task-close-discipline carve-out semantics.

## Tasks (skeleton-first, parallel-dispatched)

| ID | Status | Owner | Deliverable | Depends |
|---|---|---|---|---|
| P0-A | TODO | parallel-worker-A | sca-v13 codify (D67-D72 absorb, denom 39.8→42.5 install / 17.3→18.9 pattern, §Lineage) | — |
| P0-B | TODO | parallel-worker-B | addyosmani 5-skill vendor-fork @ f17c6e88 MIT (source-driven-development · incremental-implementation · spec-driven-development · security-and-hardening · performance-optimization) | — |
| P0-C | TODO | parallel-worker-C | citations-agent skill from claude-cookbooks @ 39a350b6 patterns/agents/prompts/citations_agent.md | — |
| P0-D | TODO | parallel-worker-D | /plan-attest enablement audit + doc (planning-with-files v2.38.1 SHA-256 tamper-detect) | — |
| P1-A | TODO | parallel-worker-E | Stream-5 absorbs (LiteLLM typed-fallback · Cline path-based auto-approve · Codex ReviewOutputEvent JSON schema) | P0-A·B·C·D |
| P1-D | TODO | parallel-worker-F | agent-teams 1.0.2 HEAD reconcile (probe vs wshobson HEAD 08ded5e7; PR #535 coord-guardrails verify) | P0-A·B·C·D |
| H | TODO | orchestrator | W332-H-SYNTHESIS.md cross-stream synthesis | P0-A·B·C·D + P1-A·D |
| SHIP | TODO | orchestrator | task-close-discipline pre-ship sweep · codex round-1 · CR1-R5 documented · inspect_ai EvalLog | H |

## Decision points

- D1 (2026-05-19): W269 parallel fan-out P0-A·B·C·D in ONE message (per Δ-PDM-2 + Δ-G49 mandate)
- D2 (2026-05-19): skeleton-first writes per Δ-PDM-1 (deliverable files materialized BEFORE worker dispatch)
- D3 (2026-05-19): P1-A + P1-D dispatched AFTER P0-* complete (true dependency: Stream-5 absorbs need P0-A sca-v13 rubric; agent-teams reconcile may interact with addyosmani plugin scope)
- D4 (2026-05-19): codex round-1 via Stop-hook auto-fire (openai-codex/1.0.4/hooks/hooks.json:24-37); round-N escalation only on NEEDS-REVISION
- D5 (2026-05-19): 8 deferred items explicitly carry-forward — NOT silent-orphan per task-close-discipline §4 matrix

## Carry-forward (W333+, explicitly annotated per task-close-discipline)

Operator-only:
1. R5 sandbox SHIP-BLOCKER (9-wave dwell; macOS/Linux/WSL2-only per Anthropic; documented-exception path active)
2. `/plugin install gitnexus` (operator must run; W330-B carries)
3. `/plugin install context-mode` ECC restore variant (W330-C alt)
4. CLAUDE.local.md f5 env block (operator-only secret rotation)
5. Phoenix MCP recreate (W329-D §3 — service does not exist; operator decides recreate vs DEACTIVATE)
6. Langfuse rotation (operator UI-driven)
7. 8 OTEL keys propagation (operator env-side)

Multi-day research-track:
8. T1 memory bakeoff mem0 / Letta / Zep
9. prompt-optimizer DSPy / MIPRO / GEPA
10. frontier-peer qwen3 / codex / Sonnet round-trip
11. CR-1 trust-tuple SLSA / Sigstore audit completion (partial-shipped W331)
