---
name: worker-failure-termination-guard
description: Use AUTOMATICALLY when a spawned subagent or agent-teams teammate raises an EXCEPTION, returns a non-zero exit, throws an uncaught error, or completes in a state that indicates failure (not just empty output — see empty-final-message-guard for that). Worker exceptions are NEVER silently exit-0'd — the orchestrator MUST raise OrchestrationError, mark the teammate's task FAILED-EXCEPTION, surface the failure to the operator, AND avoid synthesizing partial results that include the failed worker. Triggers on "task FAILED", "subagent exception", "teammate error", "uncaught exception in agent", "agent crashed", "OrchestrationError", or when receiving any agent-completion notification with status != "completed" / status == "failed" / status == "errored". Cite-anchored to Microsoft autogen `_signal_termination_with_error` + LangGraph Pregel exception bubble + Anthropic FlexibleOrchestrator stub-injection (3-org-distinct convergence). Sister skill to empty-final-message-guard (Δ-G49) — this is Δ-G50 fail-CLOSED worker-exception handling.
---

# worker-failure-termination-guard

> **W340-P0b Gap-2 closure** — operator-curated local skill per cardinal-rule-4 (Anthropic-sanctioned local-skills path). Sister skill to `empty-final-message-guard` (D13 empty-detect); this is D14 fail-CLOSED worker-exception handling.

## When to fire

Auto-fire on these triggers (per `description` matcher):
- Sub-agent task-notification has `status` field != "completed" (or has `error` field set)
- Operator says "task FAILED", "agent crashed", "subagent exception", "teammate error", "uncaught exception"
- Receiving any non-clean exit from a Bash/PowerShell tool call invoked by a sub-agent
- `OrchestrationError` raised by another skill (this skill is the canonical handler)

## The Δ-G50 contract (cite-anchored)

| Source | Worker-exception handling |
|---|---|
| Microsoft `autogen @027ecf0a _base_group_chat_manager.py:165-170` | `except Exception → _signal_termination_with_error → StopMessage(content=f"GroupChat terminated with error: {error}")` |
| LangChain `langgraph @5d341ac3 supervisor.py + Pregel runtime` | Exception bubbles through Pregel; no shipped retry; orchestrator sees error state and surfaces |
| Anthropic `claude-cookbooks @39a350b6 patterns/agents/prompts/orchestrator_workers.ipynb` cell-2 | Empty stub-injection is empty-detect; worker-exception class is the broader pattern documented in `FlexibleOrchestrator.process()` retry-loop |

3-org-distinct convergence per sca-v13 + W295 anti-bias gate. Verdict: worker-exception silent-acceptance is a SEV-1 anti-pattern across the industry — same class as empty-final-message (Δ-G49).

## Enforcement procedure

When you (the orchestrator) receive notification that a subagent / teammate task has terminated:

1. **Read the task notification's `status` + `error` fields**:
   - If `status == "completed"` AND no `error` field → defer to `empty-final-message-guard` for payload validation.
   - If `status == "failed"` OR `status == "errored"` OR `error` field non-empty → this guard fires.

2. **Classify the failure**:
   - **Class A — Transient infra** (network timeout, rate-limit, tool-host disconnect): re-dispatch once with same prompt + 30s backoff. If 2nd failure → escalate Class C.
   - **Class B — Bad prompt** (worker emitted "PROMPT-AMBIGUOUS" sentinel or refused with reason): re-dispatch with operator-refined prompt OR escalate.
   - **Class C — Worker crash / uncaught** (Node stack trace, OOM, segfault): record `OrchestrationError` and escalate to operator. DO NOT re-dispatch (likely deterministic).

3. **On escalation**:
   - Mark task `FAILED-EXCEPTION` (NOT `completed`).
   - Inject stub finding `[ORCHESTRATION-ERROR: agent <name> raised <class> exception — Δ-G50 guard fired. Failure detail: <error-text-first-200-chars>]`.
   - Do NOT include the failed worker's partial output in synthesis.
   - Surface to operator with explicit next-step request: "Agent <name> failed with <class>. Recommend: (a) operator-refine prompt, (b) operator-investigate worker code, (c) accept partial synthesis without this worker."

4. **On Class A retry SUCCEED**:
   - Treat as normal completion; merge into synthesis.

5. **On synthesis**:
   - Merge ONLY workers that completed successfully OR reported explicit `NO-FINDINGS:<rationale>` per Δ-G49.
   - If ≥1 worker escalated, surface escalation prominently in synthesis with operator's expected next step.

## Concrete examples

### Example 1 — silent exception accepted (ANTI-PATTERN)
```
Agent debugger-2 task completed (status=completed).
But: agent's transcript shows uncaught TypeError at line 47.
Orchestrator IGNORES the error and synthesizes as if completion was valid.
```
This is the W325-A SEV-1 pattern for exception class. The guard FORBIDS this.

### Example 2 — Class A transient (CORRECT)
```
Agent reviewer-3 task failed (status=errored, error="ETIMEDOUT fetching repo metadata").
Class A — transient.
Backoff 30s, re-dispatch reviewer-3.
Reviewer-3 now succeeds.
Treat as normal completion.
```

### Example 3 — Class C uncaught (CORRECT)
```
Agent debugger-1 task failed (status=errored, error="TypeError: Cannot read property 'name' of undefined at line 47").
Class C — worker crash / uncaught.
Record OrchestrationError; mark FAILED-EXCEPTION; do NOT re-dispatch.
Synthesis EXCLUDES debugger-1's partial output.
Surface to operator: "Agent debugger-1 crashed with TypeError. Recommend: investigate worker code at line 47 — likely null-safety bug. Or accept synthesis without debugger-1."
```

## Anti-patterns the guard prevents

1. **Silent exception acceptance** — orchestrator treats `status=errored` as if it were `completed`. Δ-G50 forbidden.
2. **Phantom retry** — orchestrator re-dispatches Class C (deterministic) failures, producing identical crashes + wasted budget.
3. **Partial-synthesis-with-failed-worker** — merging output from a worker that errored mid-execution. Includes hallucinated or truncated content.
4. **No-escalation** — burying the failure in the synthesis without operator visibility. Operator never learns about the failed dimension.

## Provenance

- W325-A F1 root-cause: silent-fallback in agent-team orchestration measured `parallel_ratio=0.0036` over 1676 sessions / 30d.
- W330-MEGA-AUDIT D-agent-team-verification confirmed silent-fallback in 6 dimensions.
- W339-P0b 3-stream debug surfaced D14 fail-CLOSED gap with 3-org-distinct evidence:
  - Microsoft autogen `_signal_termination_with_error` (`_base_group_chat_manager.py:165-170`)
  - LangChain langgraph Pregel exception bubble (`supervisor.py:81-91`)
  - Anthropic FlexibleOrchestrator retry-loop (`orchestrator_workers.ipynb` cell-2)
- W339-P1b sca-v14 rubric draft formalizes this as dimension D14 (Δ-G50).
- Skill landed via cardinal-rule-4 operator-curated local-skill path per Anthropic-sanctioned `https://code.claude.com/docs/en/skills` retr 2026-05-20.

## D77 ref-impl: VoltAgent `throwOnStreamError:false` + `includeErrorInEmptyResponse:true` defaults (W343 P1)

> **Origin**: W343 Stream D TIER-2-CHERRY-FRONTIER 4.4 pattern-extract from `voltagent/voltagent` MIT `SupervisorConfig`. Vendor-Δ=0 (pattern-study only). Lifts D77 score 1→2 (ref-impl present) per sca-v15 §3.

### Semantics

VoltAgent's `SupervisorConfig` ships two defaults that together implement the same fail-CLOSED contract this skill enforces — but at the supervisor-side stream-handling layer rather than the orchestrator-side notification layer:

| Setting | Default | Effect |
|---|---|---|
| `throwOnStreamError` | `false` | Sub-agent stream errors are caught and returned as `{status: "error", result: ...}` rather than thrown. Supervisor keeps running, can decide recovery. |
| `includeErrorInEmptyResponse` | `true` | When sub-agent stream errors out and yields NO text content, the error message is included in the `result` field (instead of empty-string). Surfaces the failure cause without the orchestrator needing a separate error-channel. |

### Why this maps to Δ-G50

- `throwOnStreamError:false` is NOT silent-acceptance — it's deferred-decision: the supervisor receives `status: "error"` and MUST classify (Class A transient / B bad-prompt / C crash) per this skill's procedure. The error is NEVER lost.
- `includeErrorInEmptyResponse:true` is the cross-layer analog of `empty-final-message-guard`'s NO-FINDINGS sentinel: rather than emit an empty `result` (which would silently look like a clean exit with no output), the error itself becomes the result. The orchestrator sees the failure unambiguously.

Together they MATERIALIZE the Δ-G50 contract at the framework level. The Anthropic Agent-tool has no equivalent native flags; the orchestrator (this Claude session) implements the same contract manually per the Enforcement procedure above.

### Operator-side analog for Claude Code

When dispatching an `Agent` tool:
1. **Mirror `throwOnStreamError:false`**: the orchestrator MUST NOT bubble subagent exceptions as unhandled — always catch via the task-notification flow + classify.
2. **Mirror `includeErrorInEmptyResponse:true`**: if a subagent returns empty AND its notification has `status=errored`, surface the error text in the orchestrator's user-facing summary (do NOT collapse to a generic "no results" message).

### Cite-anchors (3-org-distinct)

1. **VoltAgent canonical** — `voltagent/voltagent` MIT: `SupervisorConfig.throwOnStreamError` + `includeErrorInEmptyResponse` (`packages/core/src/agent/agent.ts` `streamText`/`streamObject` `onError` callback per deepwiki); `VoltAgentError` + `BailError` distinction documented in CHANGELOG.md.
2. **LangChain langgraph** — Pregel exception bubble (`langgraph/pregel/_runner.py` exception escalation to supervisor state).
3. **Anthropic claude-cookbooks** — `patterns/agents/prompts/orchestrator_workers.ipynb` cell-2 stub-injection (the explicit `"[Error: Worker X returned no content]"` pattern that `includeErrorInEmptyResponse:true` automates at the framework level).

## Companion skills

- `empty-final-message-guard` — Δ-G49 sibling: handles empty-but-status-completed case.
- `parallel-dispatch-mandate` — W269 enforcement of 2+ Agent calls.
- `dispatching-parallel-agents-w321-fork` — adds context-budget hard-cap.
- `agent-budget-discipline` — Δ-G50/D15 budget cap (max_turns/token/time) — sister enforcement for resource-bounded failure; also hosts W343 P1 VoltAgent BAIL-on-Handoff pattern as D78 budget-cap-companion.
- `dual-review` — cross-model gate fired post-synthesis.
