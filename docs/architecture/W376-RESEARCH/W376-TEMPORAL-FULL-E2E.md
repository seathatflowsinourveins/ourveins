# W376 Full Temporal+OpenHands+GPT-5.x Durable E2E — PROVEN (live, first boot)

**Date:** 2026-05-23 · **Branch:** `goal/W375-openhands-sota` (PR #33) · **Operator-authorized:** "full resolve all"

## Result

**The W376 durable agent harness runs OpenHands on GPT-5.x end-to-end through Temporal — proven live for the first time.** A real workflow dispatched through the full state machine ran to Temporal-status **COMPLETED in 190s**.

### Live dispatch (workflow `9a98c5be4ee776…`, local workspace mode)
```
submit "Reply with exactly OPENHANDS_TEMPORAL_E2E_OK..." --workspace-mode local --i-trust-this-task
  -> AdmissionCoordinator.submit_workflow (deterministic op_id + idempotency)
  -> TaskWorkflow [COMPLETED, 190s]
     L0 validate                         -> pass
     openhands_run_activity              -> OpenHands Agent ran on gpt-5.3-codex (subscription OAuth)
                                            Agent reply: "OPENHANDS_TEMPORAL_E2E_OK"  (↑3.42K ↓14 tok, $0.0088)
                                            events_processed=3
     L1 CoVe + L2 review-gate (parallel) -> ran
     L3 jury (codex gpt-5.5, ESCALATE)   -> verdict BLOCK
  -> TaskResult{status:FAILED, jury_verdict:"BLOCK", events_processed:3, elapsed_sec:190}
```

The `BLOCK` verdict is **correct gate behavior**, not a failure: a contentless "reply OK" task produces no artifacts/tests, so the L3 codex jury correctly judges it not-ACCEPT-able. The point proven is that the **full durable pipeline executes**: durable workflow + admission idempotency + OpenHands agent on GPT-5.x + the L1/L2/L3 verification ladder (jury on codex gpt-5.5) + a durable TaskResult.

## Components exercised live
- Temporal server (1.30.1) + worker (`TaskWorkflow` + 8 activities, pydantic data-converter, OTel TracingInterceptor) — booted clean, polled `openhands-dispatch`.
- `AdmissionCoordinator` (SQLite idempotency, deterministic op_id) via `_CoordinatorClientAdapter`.
- `openhands_run_activity`: routine LLM via `subscription_login_async` → `openai/gpt-5.3-codex` (cached OAuth, non-interactive); `Agent(llm, tools=[])` + `Conversation` + sync `conv.run()` in `asyncio.to_thread` + watchdog heartbeat.
- L1 `verify_cove_activity`, L2 `review_gate_activity`, L3 `jury_aggregate_activity` (codex gpt-5.5) + verdict routing.

## Bugs surfaced + fixed by this first live boot (mocked unit tests missed all)
| # | Defect | Fix | Class |
|---|--------|-----|-------|
| W1 | `from opentelemetry import trace` outside `imports_passed_through()` → beartype.claw circular import under the Temporal workflow sandbox → `Failed validating workflow TaskWorkflow` | wrap in `workflow.unsafe.imports_passed_through()` | code (`temporal_worker.py`) |
| W2 | `Agent(llm=_LangfuseRoutineLLM(...))` → pydantic `ValidationError` (Agent needs a real LLM); wrapper's `acomplete` hook never fires on sync `conv.run()` anyway | unwrap to real LLM: `getattr(routine_llm, "_llm", routine_llm)` | code (`temporal_worker.py`) |
| W3 | shared venv fastmcp 3.3.1 broken partial install (missing `mcp_config.py` + top-level modules) → `openhands.sdk` import fails | repaired by copying the complete 3.3.1 from the isolated venv | host env |
| W4 | `AdmissionCoordinator` SQLite dir `Z:/claude-sota-installed-state/w375/` absent → "unable to open database file" | `mkdir -p` the state dir | host env |

(Earlier, the same e2e effort fixed the cross-platform **B3 codex provider schema bug** — see `W376-LIVE-E2E-B123-FIX.md`.)

## Verification (verify-before-claim)
- Workflow Temporal-status **COMPLETED** (190s); `TaskResult` durably returned.
- Agent output `OPENHANDS_TEMPORAL_E2E_OK` captured in the worker activity log.
- **41/41 tests pass**: `test_temporal_worker.py` + `test_llm_factory.py` + `test_codex_cli_llm.py` + `test_otel_spans_wiring.py` (`Z:/venvs/claude` pytest 9.0.3).
- **Codex GPT-5.5 gate (W1+W2): APPROVE @ 0.92** — both SOUND, `FINDINGS: none`, `DETERMINISM_OK: YES`. Verdict: `tmp/openhands-brainstorm/worker-fix-codex-out.txt`.

## Scope notes
- Demonstrated in **local** workspace mode (in-process LocalWorkspace; no Docker). The **remote** mode (docker-py agent-server + egress Squid sidecar + OTLP collector + image SHA-pin) has additional unmet host preconditions (doctor: `otlp_endpoint`/`spool`/`image_digest`/`oauth_acl` RED) — that hardening is a separate bring-up; the durable agent-on-GPT-5.x core is proven.
- An ACCEPT verdict requires a substantive code-producing task (so L1/L2/L3 have real work to verify) — out of scope for proving the harness runs.
