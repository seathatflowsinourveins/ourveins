# Wave 255 — Systemic FM-17 Subagent Failure + Recovery Path

**Date**: 2026-05-15
**Disposition**: 3/3 subagent failure; recovery via orchestrator-direct codex exec

---

## Failure mode summary

Wave 255 launched 3 `sota-researcher` agents per operator directive ("many research waves ... deep dive ... wshobson + superpowers"). **All 3 returned the identical error**:

```
API Error: API returned an empty or malformed response (HTTP 200) —
check for a proxy or gateway intercepting the request
```

| Agent | ID | Scope | Tool uses | Duration | Status |
|---|---|---|---|---|---|
| E | `aeca5109a0566ecea` | Memory + RAG source dive (OpenViking / cognee / langfuse / mem0 / graphiti) | 17 | 223s | FM-17 gateway error |
| F | `a0ce469eb6aa55d4d` | Orchestration source dive (wshobson + superpowers + claude-plugins-official) | 26 | 209s | FM-17 gateway error |
| G | `a2b742cb3b82829f9` | 4 missing categories + token-opt source (model-routing / multi-account / prompt-cache / agent-eval + LLMLingua replacement) | 16 | 191s | FM-17 gateway error |

**Tool-use counts of 16-26 indicate the agents got partway through their work** (made gh-API / Read tool calls successfully) before the response stream broke. Partial work likely happened (cache state) but **no verdict landed in the JSONL transcript** — orchestrator cannot mine partial results without violating "Don't peek" discipline + the JSONL is full agent-transcript-format unsafe-to-tail.

## Causal analysis

This is **NOT** the same failure mode as Wave 252 Agent B (which was FM-17.b autocompact-thrash — that error reads "Autocompact is thrashing"). Wave 255's pattern is **upstream gateway / API-proxy failure**:

- Identical HTTP 200 empty-malformed pattern across 3 independent agents
- Identical ~200s duration profile suggests stream timeout at the gateway, not subagent runtime
- Operator-side: CADP cumulative was 7 at Wave 255 dispatch (exceeding the documented cap of 5 without verified `status.py`)

**Likely contributors** (per `fm17-subagent-fleet-depletion.md` family):
- **FM-17.f-class** (1M-context entitlement / billing-class blocker per W119 deep-dive) — possible if Claude API rate-limits flowed through as empty-200
- **CADP-5 cap exceeded** — Sonnet fallback was de-facto active (agents self-declared Sonnet stand-in in prior waves) BUT 6th-7th+ dispatch on top of an already-funneled pool may have triggered the failure
- **Transient Anthropic upstream gateway issue** — load-balancer/proxy failure unrelated to this session's dispatch count

## Recovery (executed)

Per `fm17-subagent-fleet-depletion.md §FM-17.d` recovery: orchestrator-direct `codex exec` foreground+tee (OpenAI API, not Anthropic gateway). Fired as background job `bzn3cnxi2` with focused prompt at `.claude/state/codex_consult_w255_recovery_deep_dive.txt` covering 5 axes:
1. User-named repos deep grade (OpenViking memory-plugin / cognee / langfuse)
2. wshobson + superpowers source grade
3. LLMLingua replacement source-confirm (buildoak/wet + yvgude/lean-ctx)
4. 4 missing categories top-picks (FR-1 model-routing / FR-2 multi-account fleet / FR-3 prompt-cache / FR-4 agent-eval)
5. Honest verdict on saturation

Codex output writes to `.claude/state/codex_consult_w255_recovery_deep_dive_OUT.txt` — orchestrator will synthesize on completion notification into `GRAND-SYNTHESIS-pure-runtime-2026-05-15.md` v2.

## Forward discipline

- **Do NOT re-dispatch the 3 failed agents** — same failure pattern likely. Wait for explicit cache-rate recovery OR shift to orchestrator-direct codex for further deep research.
- **CADP rule 4 honored going forward**: future waves stay ≤5 cumulative without verified `status.py` (this runtime's `status.py` is CCC-specific and errors — defacto unverifiable; conservative cap is what it is).
- **Wave 255 audit trail**: this file IS the audit trail per `audit-action-loop.md` Wire/Surface/Close/Re-fire. Surface: 3/3 FM-17 failed. Close: codex orchestrator-direct recovery. Re-fire: not applicable (no JSONL drift to re-verify).

## Disposition for grand synthesis

Wave 255 was **DEPTH-EXTENSION** (deeper source-code dives) on top of Wave 254's comprehensive coverage. Wave 254's grand synthesis stands as the authoritative deliverable (146-repo catalog + 18 fresh discovery + TARGET-runtime probe + codex T1 NEEDS-REVISION conf=0.92 Pattern A integrated). Wave 255's intended depth-extension is covered partial-via codex recovery; the genuinely unfilled gap is the per-repo source-code A-F grading the user wanted on the 30+ candidates.

**Recommended operator decision**: accept Wave 254 grand synthesis as comprehensive deliverable + add the codex recovery findings as v2 amendment + defer source-code A-F grading on the 30+ candidates to a later wave when subagent fleet recovers.
