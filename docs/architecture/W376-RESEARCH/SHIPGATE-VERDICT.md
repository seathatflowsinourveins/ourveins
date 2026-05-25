# W376 PHASE D — Codex GPT-5.5 Ship-Gate Verdict + Remediation

> **VERDICT: BLOCK · CONFIDENCE: 0.91 · DIMENSION: W376-PHASE-D-shipgate**
> Reviewer: codex GPT-5.5 (v0.130.0, model_reasoning_effort=high), session `019e53a1`.
> Diff reviewed: `4ba97db..734caba` (13 commits, 39 files, +6515/-263). 125 passed/12 skipped (venv).
> Source: `tmp/openhands-brainstorm/codex-W376-shipgate-OUTPUT.txt:24387-24401`.
> Date: 2026-05-23.

## Why this matters (CR-6 verify-before-claim)

The design+plan were 6/6-dim codex-APPROVED, but design-phase review cannot catch
**implementation drift from spec** — that only surfaces when the actual landed code is
reviewed against the substrate APIs. The ship-gate caught three contract violations the
code introduced. This is the intended function of running real code through an adversarial
cross-model gate (CR-3). **The BLOCK is correct and the findings are well-evidenced.**

## P0 Findings (ship-blockers)

### P0-1 — Remote-mode egress is NOT fail-closed (SECURITY)
- **Evidence**: `agents/network_helpers.py:18-34` (`docker network create` with no `--internal`), `agents/egress_sidecar.py:8/14/36` (docstrings *claim* `internal=True`).
- **Root cause**: doc-vs-code mismatch. The per-task net is created as a plain bridge → agent has a default WAN route → bypasses Squid → RFC1918/metadata/WAN reachable. Defeats the entire egress allowlist.
- **Why the fix is safe**: temporal_worker.py:180-199 already spawns the egress sidecar *before* the agent-server and wires HTTP_PROXY; egress_sidecar.py:247-291 already dual-homes squid (internal agent net ↔ external `internal=False` net). Adding `--internal` to the per-task net makes agent→squid→WAN the *only* path — allowlisted egress still works, direct egress is denied.
- **FIX**: `_ensure_network` must pass `--internal` to `docker network create`; add a non-Docker unit assertion that `--internal` is in the create argv + a gated live invariant that direct (non-proxy) egress fails.
- **Owner**: Fix-A.

### P0-2 — CLI Temporal dispatch violates the pydantic converter contract
- **Evidence**: `tools/dispatch_temporal.py:258,283,303,341,362` (all 5 `Client.connect(_temporal_address())` sites omit `data_converter`), spec `:557`.
- **Root cause**: worker-side has `pydantic_data_converter` but the CLI client does not → `TaskSpec`/`TaskResult` payload round-trips can break across submit/result/status/cancel.
- **FIX**: add `data_converter=pydantic_data_converter` to every CLI `Client.connect` (DRY via a `_connect_temporal()` helper).
- **Owner**: Fix-B.

### P0-3 — First admission bypassed in real CLI path
- **Evidence**: `tools/dispatch_temporal.py:258-262` (`submit` calls `client.start_workflow(... id=spec.conversation_id)` directly, not `AdmissionCoordinator.submit_workflow`), `agents/admission_coordinator.py:152` (`compute_op_id` omits `workspace_mode` → local/remote collapse for same task/repo/base_commit).
- **FIX**: route CLI submit through `AdmissionCoordinator.submit_workflow(client, spec)`; include `workspace_mode` in the canonical op-id identity.
- **Owner**: Fix-B.

## P1 Findings (follow-up — fixed this pass for max quality)

### P1-1 — Langfuse v4 session correlation lost
- **Evidence**: `agents/llm_factory.py:222,226`, `agents/jury_activity.py:126,130`. session_id stored as `metadata={"session_id":...}` not v4 session attribute → session-level token/cost queries miss these observations.
- **FIX**: emit via Langfuse v4 `propagate_attributes(session_id=conversation_id, ...)` or the documented OTel session attribute.
- **Owner**: Fix-C.

### P1-2 — L0 invalid-spec handling is not non-retryable
- **Evidence**: `agents/temporal_worker.py:479,609`. `l0_validate_activity` re-raises `TaskSpecError` but the workflow `execute_activity(l0_validate_activity, ...)` has no `RetryPolicy(non_retryable_error_types=[...])` and the activity does not wrap in `ApplicationError(non_retryable=True)` → a malformed spec gets retried pointlessly.
- **FIX**: make L0 failures explicit non-retryable (ApplicationError(non_retryable=True) in the activity, and/or RetryPolicy(non_retryable_error_types=["TaskSpecError","ValueError"]) on the execute_activity call).
- **Owner**: Fix-C.

### P1-3 — Tests mask integration gaps
- **Evidence**: `tests/test_pydantic_converter_wiring.py:97` (skips dispatch_temporal.py when unwired), `tests/e2e/test_w376_egress_allowlist.py:45,219` (asserts Squid config but not internal-net/no-direct-route invariant).
- **FIX**: convert the converter-test skip→hard assertion (Fix-B); add internal-network + direct-egress-denial assertion (Fix-A).
- **Owner**: Fix-A + Fix-B.

## Remediation — 3 parallel fix agents (file-disjoint, write-and-test-no-commit)

| Agent | P-items | Owns (edit) | Verify |
|---|---|---|---|
| **Fix-A** | P0-1, P1-3a | `agents/network_helpers.py`, `tests/test_network_helpers.py`, `tests/e2e/test_w376_egress_allowlist.py` | pytest those + assert `--internal` in argv |
| **Fix-B** | P0-2, P0-3, P1-3b | `tools/dispatch_temporal.py`, `agents/admission_coordinator.py`, `tests/test_pydantic_converter_wiring.py`, `tests/test_admission_coordinator.py` | pytest those + converter on all 5 sites |
| **Fix-C** | P1-1, P1-2 | `agents/llm_factory.py`, `agents/jury_activity.py`, `agents/temporal_worker.py`, `tests/test_llm_factory*.py`, `tests/test_jury*.py`, `tests/test_temporal_worker.py` | pytest those |

Orchestrator commits each stream sequentially after green (zero `.git/index` race), then
re-fires a **tight** codex ship-gate (strict format, no repo-exploration) on the new diff.
Target: APPROVE ≥0.85.
