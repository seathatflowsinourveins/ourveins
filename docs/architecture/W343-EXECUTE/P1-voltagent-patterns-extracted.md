# W343 P1 — VoltAgent Patterns Extracted (Stream D TIER-2-CHERRY-FRONTIER 4.4)

> **Date**: 2026-05-20
> **Source**: `voltagent/voltagent` MIT (pattern-study only; Vendor-Δ=0; no source copied)
> **Discipline**: sca-v15 TIER-2 PATTERN-STUDY — additive vendor-extract into existing local skills

## Status

| Pattern | Target skill | Status | 3-org-distinct |
|---|---|---|---|
| **`onHandoffComplete` BAIL** (~79% token-save) | `.claude/skills/agent-budget-discipline/SKILL.md` | ✅ **LANDED** 40 LOC added at L160+ (`@@ -160,6 +160,46 @@`) | VoltAgent + LangGraph supervisor.last_message + autogen `GroupChatManager.max_turns` → `StopMessage` |
| **`throwOnStreamError:false` + `includeErrorInEmptyResponse:true`** (D77 ref-impl) | `.claude/skills/worker-failure-termination-guard/SKILL.md` | ✅ **LANDED** 33 LOC added at L97+ (`@@ -97,10 +97,42 @@`) — section §"D77 ref-impl: VoltAgent throwOnStreamError + includeErrorInEmptyResponse defaults (W343 P1)" | VoltAgent SupervisorConfig + LangGraph Pregel exception bubble + Anthropic claude-cookbooks orchestrator_workers stub-injection |

## Sizes after extraction

- `agent-budget-discipline/SKILL.md` (Pattern-1 LANDED): **223 LOC** (under 300 ceiling; pre-Pattern-1 baseline was 183 LOC)
- `worker-failure-termination-guard/SKILL.md` (Pattern-2 LANDED W343-EXEC batch 3): **138 LOC** (under 300 ceiling; pre-Pattern-2 baseline was ~99 LOC; +33 LOC = +33 net + 6 context lines per @@ -97,10 +97,42 @@)

## Pattern-1 semantics (BAIL-on-Handoff)

VoltAgent's `OnHandoffCompleteHookArgs.bail(transformedResult?)` lets a supervisor SKIP its own continued processing when a subagent has produced terminal output. Documented worked example: 2,650 tokens (no-bail) → 560 tokens (with bail) = 79% token-save. Implementation uses AbortController + BailError to halt the supervisor stream + serialize `bailedResult` into `OperationContext.systemContext`.

Claude Code Agent-tool has no native callback, but the orchestrator implements the pattern by reading the subagent's return summary for a BAIL sentinel (e.g., `BAIL-READY: <path>`) and emitting verbatim instead of re-summarizing.

## Pattern-2 semantics (D77 ref-impl)

VoltAgent's `SupervisorConfig` defaults `throwOnStreamError:false` + `includeErrorInEmptyResponse:true` MATERIALIZE the Δ-G50 fail-CLOSED contract at the framework level: stream errors become `{status:"error", result:<error-text>}` rather than thrown exceptions; empty-but-errored results include the error text in the `result` field (instead of empty-string) so the orchestrator sees the failure unambiguously. The orchestrator (this Claude session) implements the same contract manually per the Enforcement procedure.

## Cardinal-rule compliance

- **CR-4**: both targets are canonical-path operator-curated SKILL.md files
- **CR-6**: every claim cites a deepwiki probe (VoltAgent canonical) + 3-org-distinct anchors per pattern

## sca-v15 dim impact

- **D78** (budget_cap_enforcement): BAIL companion-pattern LANDED in agent-budget-discipline (batch 2 commit `aaca240`).
- **D77** (fail_closed_worker_exception_handler): ref-impl LANDED in worker-failure-termination-guard (W343-EXEC batch 3) — score lifts 1→2 for the local runtime.

## References

- VoltAgent canonical deepwiki: https://deepwiki.com/voltagent/voltagent
- Stream D verdict: `docs/architecture/W342-CONTINUE/F-tier2-pattern-study.md` (VoltAgent T2-CHERRY-FRONTIER 4.4)
- W343 /goal P1: `docs/architecture/W342-CONTINUE/GOAL-W343.md`
