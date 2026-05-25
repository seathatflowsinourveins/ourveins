---
title: Ship 1F — Anthropic Message Batches API integration design (Wave 84 Agent A)
status: AUTHORITATIVE-CANDIDATE
date: 2026-05-08
agent: sota-researcher (Agent A)
fire: Wave 84 Ship 1F design
verdict: NOT-VIABLE-AS-PROPOSED → REJECT-FOR-FIT
---

# Ship 1F — Anthropic Message Batches API integration design

## §1 Anthropic Batch API auth requirement (TIER-1 cite verification)

Verbatim from platform.claude.com/docs/en/build-with-claude/batch-processing:
- `--header "x-api-key: $ANTHROPIC_API_KEY"` (every code example, 9 SDKs)
- Workspace-scoping: "Batches are scoped to a Workspace. You may view all batches that were created within the Workspace that your API key belongs to."
- NO example uses OAuth bearer tokens, subscription credentials, or CLAUDE_CODE_OAUTH_TOKEN

## §2 OAuth subscription support

Per code.claude.com/docs/en/authentication §Authentication precedence:
- Subscription OAuth credentials from /login (axis 6) are "scoped to inference only and cannot establish [Remote Control] sessions"
- Batch API endpoint /v1/messages/batches is Console workspace API surface, NOT inference-only OAuth scope
- CLIProxyAPI routes Anthropic-format requests to claude.ai-backed inference endpoints; does NOT proxy /v1/messages/batches

## §3 Architectural-fit verdict: NOT-VIABLE-AS-PROPOSED

Triple Probe failure per agent-harness-fit-verification.md:
| Probe | Result | Evidence |
|---|---|---|
| P3 architectural-API | FAIL | Batch API ANTHROPIC_API_KEY vs eee OAuth — separate billing/auth axes |
| P5 mode-harness-shape | FAIL | Batch API async 1-24h vs eee sync Agent({...}) in-process fork |
| P7.a demand-absence | PARTIAL FAIL | ALL 7 eee dispatch classes require sync return for Pattern A apply |
| P6 license/registry | PASS | Officially supported, not phantom |
| P4 plugin-namespace | PASS | No existing eee primitive duplicates |

## §4 Constrained-VIABLE alternative (only if operator opts into paid API axis)

Standalone Python tool at tools/batch_dispatch.py — operator-invoked OUTSIDE eee/claude.exe lifecycle. NOT a CLIProxyAPI plugin (proxy is OAuth-only). NOT an eee.ps1 dispatcher hook.

Eligible workload slices: provenance regen (~5M/mo), close-synthesis audits (~10M/mo), sibling memory ingestion (~2M/mo) — all NON-realtime.

## §5 Cost-benefit ceiling
- 50% reduction on ~17M/mo eligible = ~$8/mo savings
- &lt;2% of total eee usage (98% sync-required)
- cache_read 94.4% is dominant cost reducer already captured
- Net ROI: marginal-to-negative

## §6 STAND-IN-NOTICE
Agent A ran under CLAUDE_CODE_SUBAGENT_MODEL=claude-opus-4-7 per session env (no funneling). Verdict origin = Opus 4.7 sota-researcher reading TIER-1 docs directly. Cross-model gate still requires codex T1 before any commit acting on this verdict.

## VERDICT: REJECT Ship 1F (NOT-VIABLE-AS-PROPOSED)

Forward-ref re-evaluation if: (a) eee gains autonomous offline-audit >100M tokens/mo OR (b) Anthropic ships OAuth-subscription-compatible batch OR (c) operator adopts paid API axis.

## HANDOFF
verdict_one_line: REJECT Ship 1F — auth axis mismatch (paid API vs OAuth subscription) + sync/async architectural mismatch + ROI marginal-to-negative; forward-ref re-evaluation conditions documented.
