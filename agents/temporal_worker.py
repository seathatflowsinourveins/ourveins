# agents/temporal_worker.py
"""W375 Temporal worker + workflow + activity declarations per spec §4 v6.

Async openhands_run_activity embedding openhands.sdk.Conversation via DockerWorkspace,
with codex r5/r6 cancellation discipline (task-await-then-reraise + asyncio.shield
cleanup + container-ID-scoped cleanup).

L0/L1/L2/L3 activities are STUBS here; materialized in P1.8 (L0) + P3.3-P3.5 (L1/L2/L3).
"""

from __future__ import annotations

import asyncio
import contextlib  # noqa: F401  (used in TaskWorkflow.run finally + activity cleanup)
import os
import subprocess
import sys
import time
from datetime import timedelta

from temporalio import activity, workflow
from temporalio.client import Client
from temporalio.common import RetryPolicy
from temporalio.contrib.pydantic import (  # noqa: F401  (Task 17: wired at Client.connect)
    pydantic_data_converter,
)
from temporalio.exceptions import CancelledError  # noqa: F401
from temporalio.worker import Worker

# Task 18 (codex r1 D5 O1): business-level OTel tracer for per-phase spans.
# MUST be sandbox-passthrough: opentelemetry's import chain triggers beartype.claw's
# global import hook, which raises a circular ImportError (`claw_state` partially
# initialized) when re-run under the Temporal workflow-sandbox importer during
# TaskWorkflow validation. Passthrough reuses the already-initialized module instead
# of re-importing it. Live worker-boot finding 2026-05-23 (Worker.__init__ ->
# prepare_workflow). Mirrors the imports_passed_through() blocks below.
with workflow.unsafe.imports_passed_through():
    from opentelemetry import trace

# Local imports — wrapped in imports_passed_through so the Temporal sandbox
# does not attempt to sandbox these non-deterministic modules when the workflow
# sandbox is active. workflow.unsafe.imports_passed_through() is the SDK-canonical
# way to declare "these are side-effect-free at import time" per temporalio 1.x.
#
# NOTE: every import here carries an F401 suppression because the names are consumed
# inside function bodies (activity / workflow) NOT at module top-level, and the
# repo autoflake hook strips imports it cannot see used at module scope. Removing
# any of these silently breaks the activity body (build_workspace_for, spawn_*,
# persist_field, AdmissionCoordinator) — they MUST be kept.
with workflow.unsafe.imports_passed_through():
    from agents.models import TaskSpec, TaskResult, TaskStatus  # noqa: F401
    from agents.llm_factory import (  # noqa: F401
        make_routine_llm,
        make_routine_llm_async,
    )
    from agents.network_helpers import _ensure_network  # noqa: F401
    from agents.event_store import persist_field, atomic_append_event  # noqa: F401
    from agents.workspace_factory import build_workspace_for  # noqa: F401  W376

    # codex r2 D1-R2-1 FIXED: import stop_agent_server (used in _async_cleanup_w376),
    # NOT kill_agent_server. Prior import mismatch caused silent NameError swallowed by
    # `except Exception: pass` inside cleanup, turning remote cleanup into a no-op leak.
    from agents.agent_server_spawn import (  # noqa: F401  W376
        spawn_agent_server,
        stop_agent_server,
    )

    # codex r4 D1-finding-1: egress sidecar production-path wiring for remote mode.
    from agents.egress_sidecar import (  # noqa: F401  W376
        spawn_egress_sidecar,
        stop_egress_sidecar,
    )

    # W376 admission coordinator — compute_op_id + admit_retry gate for workflow retry loop.
    from agents.admission_coordinator import AdmissionCoordinator  # noqa: F401  W376

    # codex r2 D5-O5 FIXED: also import SLOClassKey + ManualReviewPendingKey for §7.5 upsert path.
    from agents.search_attrs import (  # noqa: F401
        ConversationIdKey,
        ElapsedSecKey,
        P99BreachKey,
        SLOClassKey,
        ManualReviewPendingKey,
        register_search_attributes,
    )

TASK_QUEUE = "openhands-dispatch"
AGENT_SERVER_IMAGE = "ghcr.io/openhands/agent-server:latest-python"

# Task 18 (codex r1 D5 O1): module-level business tracer per spec §7.1.
tracer = trace.get_tracer("w376.openhands")

# Workflow-level p99 breach threshold (seconds). Mirrors W375 budget.p99_target_sec default.
P99_BREACH_THRESHOLD_SEC = 1800

# W376 admission coordinator SQLite path (state-outside-repo per CLAUDE.local.md).
ADMISSION_DB_PATH = os.environ.get(
    "W376_ADMISSION_DB",
    "Z:/claude-sota-installed-state/w375/admission.db",
)


# ============================================================
# Main execution activity (full impl)
# ============================================================


@activity.defn
async def openhands_run_activity(spec: TaskSpec) -> dict:
    """W376 v3: rewritten against actual openhands-sdk==1.22.1 API per codex r1 fixes.

    Codex r1 P0 BLOCKER FIXES:
    - A1: callbacks=[_emit_event] + sync send_message + blocking conv.run() in to_thread
          (NO stream_events — that method does not exist on BaseConversation/LocalConversation)
    - A4 + R3: separate watchdog asyncio.Task heartbeating at heartbeat_timeout/3 cadence
    - A6: spec.conversation_id used for correlation, NOT freshly-minted str(uuid4())
    - R4: label-based reconcile + per-task network cleanup in _async_cleanup_w376

    Task 18 (codex r1 D5 O1): wraps the whole activity in a business OTel span named
    "openhands_run_activity" carrying the six required attrs (conversation_id,
    workspace_mode, container_id, elapsed_sec, jury_verdict, slo_class) +
    record_exception()/set_status(ERROR) on the failure path. The inner conv.run()
    work is wrapped in its own "openhands.run" span per spec §7.1.

    Preserves W375 L0/L1/L2/L3 wrapper, HMAC gate, retry-budget.

    Cite: openhands-sdk@1.22.1 + W376 SYNTHESIS.md §4 + codex r1 D1 A1+A4+A6 + D3 R3+R4 fixes.
    """

    activity_start = time.monotonic()
    with tracer.start_as_current_span("openhands_run_activity") as activity_span:
        # Task 18: required attrs known up-front (container_id filled in once spawned;
        # jury_verdict is per-activity unknown → "n/a"; slo_class from budget).
        activity_span.set_attribute("conversation_id", spec.conversation_id)
        activity_span.set_attribute("workspace_mode", spec.workspace_mode)
        activity_span.set_attribute("container_id", "local")
        activity_span.set_attribute("elapsed_sec", 0)
        activity_span.set_attribute("jury_verdict", "n/a")
        activity_span.set_attribute(
            "slo_class", getattr(spec.budget, "slo_class", None) or "P3"
        )
        try:
            result = await _openhands_run_inner(spec, activity_span)
            activity_span.set_attribute(
                "elapsed_sec", int(time.monotonic() - activity_start)
            )
            activity_span.set_status(trace.Status(trace.StatusCode.OK))
            return result
        except BaseException as e:  # noqa: BLE001 — record+reraise per spec §7.1.3
            activity_span.set_attribute(
                "elapsed_sec", int(time.monotonic() - activity_start)
            )
            activity_span.record_exception(e)
            activity_span.set_status(trace.Status(trace.StatusCode.ERROR, str(e)))
            raise


async def _openhands_run_inner(spec: TaskSpec, activity_span) -> dict:
    """Activity body extracted so the outer span wrapper stays a thin try/except.

    `activity_span` is the live business span — container_id is set on it once the
    agent-server is spawned so the span carries the real container id (not "local").
    """
    import asyncio
    import contextlib

    info = activity.info()
    heartbeat_timeout_s = (
        info.heartbeat_timeout.total_seconds() if info.heartbeat_timeout else 30.0
    )
    # Codex r1 A4 + R3 fix: cadence ≤heartbeat_timeout/3 NOT no_progress_seconds/3
    watchdog_period_s = max(1.0, heartbeat_timeout_s / 3.0)

    hb = info.heartbeat_details[0] if info.heartbeat_details else {}
    events_processed = hb.get("events_processed", 0) if isinstance(hb, dict) else 0
    last_advance_time = time.monotonic()

    # Per-task network (always created; used by remote mode, cleanup-safe for local)
    net_name = f"w375-conv-{spec.conversation_id}"
    _ensure_network(net_name, spec.conversation_id)

    # codex r3 D2-S3 + codex r4 D1-finding-1 + D2-finding-1 fix: single coherent egress-sidecar
    # production/test/cleanup path. Spawn egress sidecar BEFORE the agent-server so the agent's
    # HTTP_PROXY/HTTPS_PROXY/dns route through the allowlist sidecar (remote mode only).
    egress_ctx = None
    container_ctx = None
    if spec.workspace_mode == "remote":
        egress_ctx = await spawn_egress_sidecar(spec, net_name)

    # Build LLM (DIM-16 fix preserved from W375 + codex r4 D1-finding-2 OAuth caller-driven refresh).
    # codex r5 D5-O2 fix: pass spec.conversation_id so Langfuse session_id correlates with the
    # workflow-level OTel span + jury panel (cross-tier correlation invariant).
    # codex r6 D3-r6-P0-2 fix: workspace initialized BEFORE acquisition try so the early-except
    # full cleanup ladder can pass it to _async_cleanup_w376 without UnboundLocalError.
    workspace = None
    try:
        routine_llm = await make_routine_llm_async(conversation_id=spec.conversation_id)
        # Live e2e finding 2026-05-23: make_routine_llm_async returns a _LangfuseRoutineLLM
        # wrapper (for the tested direct-acomplete Langfuse-emission path), but openhands
        # Agent's pydantic validation requires a real LLM instance, AND conv.run() is sync
        # (calls completion(), never the wrapper's async acomplete) so the wrapper's hook
        # never fires on the agent loop anyway. Unwrap to the real SDK LLM for Agent.
        llm = getattr(routine_llm, "_llm", routine_llm)

        # W376: workspace dispatch (codex r1 A6: use spec.conversation_id)
        if spec.workspace_mode == "remote":
            # codex r4 D1-finding-1 fix: spawn under try so failures here clean up egress sidecar.
            # codex r3 D2-S3 fix: pass egress_ctx so spawn_agent_server wires HTTP_PROXY,
            # HTTPS_PROXY, NO_PROXY, and dns= INTO the agent-server container.
            container_ctx = await spawn_agent_server(
                spec, net_name, egress_ctx=egress_ctx
            )
        workspace = await build_workspace_for(spec, container_ctx)
    except BaseException:
        # codex r6 D3-r6-P0-2 fix: full cleanup ladder — passes ALL acquired resources through
        # the same shielded `_async_cleanup_w376` used in the success/cancel paths.
        # conv=None because Agent/Conversation not yet constructed.
        with contextlib.suppress(Exception):
            await asyncio.shield(
                asyncio.create_task(
                    _async_cleanup_w376(
                        None, workspace, container_ctx, net_name, egress_ctx
                    )
                )
            )
        raise

    container_id = container_ctx.container_id if container_ctx else None
    if container_id:
        persist_field(spec.conversation_id, "container_id.txt", str(container_id))
        # Task 18: surface the real container id on the activity span.
        activity_span.set_attribute("container_id", str(container_id))

    # Conversation lifecycle (codex r1 A1 BLOCKER FIX: callbacks + blocking conv.run())
    from openhands.sdk import Agent, Conversation
    from openhands.sdk.event.llm_convertible import AgentErrorEvent
    from temporalio.exceptions import ApplicationError  # noqa: F401

    def _emit_event(event):
        """Codex r1 A1: synchronous callback per emitted event. NO await allowed.

        This is the canonical event funnel — replaces hallucinated stream_events().
        """
        nonlocal last_advance_time, events_processed
        last_advance_time = time.monotonic()
        events_processed += 1
        if isinstance(event, AgentErrorEvent):
            atomic_append_event(
                spec.conversation_id,
                "task.error.v1",
                {"event": type(event).__name__},
            )

    async def watchdog():
        """Codex r1 A4 + R3 BLOCKER FIX: heartbeat at heartbeat_timeout/3 while conv.run() runs.

        Long thinking pauses (45-90s) no longer cause server-side activity-crashed because
        heartbeat ticks independently of event emission.
        """
        while True:
            await asyncio.sleep(watchdog_period_s)
            activity.heartbeat(
                {
                    "events_processed": events_processed,
                    "container_id": container_id,
                    "watchdog_tick": True,
                }
            )
            # Flatline guard (separate from heartbeat cadence per codex r1 A4)
            if time.monotonic() - last_advance_time > spec.budget.no_progress_seconds:
                raise RuntimeError(
                    f"flatline: no event in {spec.budget.no_progress_seconds}s"
                )
            if activity.is_cancelled():
                raise CancelledError("operator/timeout cancel")

    conv = None
    run_task = None
    watchdog_task = None
    # codex r5 D1-R2-1 fix: init cleanup_task BEFORE any Agent ctor / Conversation ctor /
    # send_message so the outer `finally` can ALWAYS test `cleanup_task is None or not done()`
    # without raising UnboundLocalError when Agent(...), Conversation(...), or send_message(...)
    # raise pre-`asyncio.wait`.
    cleanup_task = None
    try:
        agent = Agent(llm=llm, tools=[])  # v1 minimal toolset (C5 carry-forward)
        conv = Conversation(
            agent=agent,
            workspace=workspace,
            conversation_id=spec.conversation_id,  # codex r1 A6: correlate via spec
            callbacks=[_emit_event],  # codex r1 A1: callback funnel
            delete_on_close=True,
        )

        # DIM-20 fix preserved: send_message is sync, no await
        conv.send_message(spec.task)

        # codex r7 D1-r7-P0-1 fix: extract the pause-and-wait handshake into a helper so BOTH
        # the pending-run_task branch AND the outer asyncio.CancelledError branch perform the
        # cooperative pause → bounded-wait → escalate-on-timeout sequence.
        async def _pause_and_wait_run_task(conv, run_task, timeout_s):
            """Cooperative-cancel handshake for the asyncio.to_thread(conv.run) wrapper.

            Cancelling the wrapper does NOT stop the underlying thread; conv.run only
            cooperatively observes conv.pause() between iterations (S1 §3). Correct order:
              1. signal cooperative pause to the SDK
              2. bounded-wait for the wrapped run_task to observe the pause
              3. only on timeout escalate to wrapper cancel + best-effort drain
            """
            try:
                conv.pause()
            except Exception:
                pass
            try:
                await asyncio.wait_for(asyncio.shield(run_task), timeout=timeout_s)
            except asyncio.TimeoutError:
                run_task.cancel()
                with contextlib.suppress(asyncio.CancelledError):
                    await run_task

        # Task 18: inner "openhands.run" span scopes the conv.run() execution (spec §7.1).
        with tracer.start_as_current_span("openhands.run") as run_span:
            run_span.set_attribute("conversation_id", spec.conversation_id)
            run_span.set_attribute("workspace_mode", spec.workspace_mode)
            run_span.set_attribute("container_id", container_id or "local")
            run_started = time.monotonic()
            # Codex r1 A1 BLOCKER FIX + codex r2 D1-R2-2 cooperative-cancel FIX:
            # conv.run() is BLOCKING — cancelling the asyncio.to_thread wrapper task does NOT
            # stop the SDK run loop. Signal cooperatively FIRST, then bounded-wait.
            run_task = asyncio.create_task(asyncio.to_thread(conv.run))
            watchdog_task = asyncio.create_task(watchdog())
            try:
                done, pending = await asyncio.wait(
                    {run_task, watchdog_task}, return_when=asyncio.FIRST_COMPLETED
                )
                for t in pending:
                    if t is run_task:
                        # codex r6 D1-r6-P0-1 + codex r7 D1-r7-P0-1: cooperative-cancel via helper.
                        await _pause_and_wait_run_task(
                            conv, run_task, heartbeat_timeout_s
                        )
                    else:
                        # watchdog_task — pure-Python coroutine, normal cancel + wait is correct.
                        t.cancel()
                        with contextlib.suppress(asyncio.CancelledError):
                            await asyncio.wait_for(t, timeout=heartbeat_timeout_s)
                for t in done:
                    t.result()  # re-raise from done set if any errored
                run_span.set_attribute(
                    "elapsed_sec", int(time.monotonic() - run_started)
                )
                run_span.set_status(trace.Status(trace.StatusCode.OK))
            except asyncio.CancelledError:
                # codex r2 D3-r2-P0-4 + W375 bar + codex r7 D1-r7-P0-1: shield cleanup, await,
                # then re-raise — BUT FIRST pause/await the run_task thread so cleanup doesn't
                # race against a live SDK loop.
                run_span.set_status(trace.Status(trace.StatusCode.ERROR, "cancelled"))
                if run_task is not None and not run_task.done():
                    await _pause_and_wait_run_task(conv, run_task, heartbeat_timeout_s)
                # codex r5 D1-R2-2 + D2-R2-P0-1 fix: pass egress_ctx so sidecar is cleaned on cancel too.
                cleanup_task = asyncio.create_task(
                    _async_cleanup_w376(
                        conv, workspace, container_ctx, net_name, egress_ctx
                    )
                )
                with contextlib.suppress(Exception):
                    await asyncio.shield(cleanup_task)
                raise
            except BaseException as e:  # noqa: BLE001 — record on inner span then reraise.
                run_span.record_exception(e)
                run_span.set_status(trace.Status(trace.StatusCode.ERROR, str(e)))
                raise

        return {
            "conversation_id": spec.conversation_id,
            "events_processed": events_processed,
            "container_id": container_id,
            "workspace_mode": spec.workspace_mode,
        }
    finally:
        # Cleanup: shielded against outer cancellation; branches on mode.
        # If cancelled path already ran cleanup_task, skip duplicate cleanup.
        # Task 18: cleanup span carries conversation_id + container_id.
        if cleanup_task is None or not cleanup_task.done():
            with tracer.start_as_current_span("openhands.cleanup") as cleanup_span:
                cleanup_span.set_attribute("conversation_id", spec.conversation_id)
                cleanup_span.set_attribute("container_id", container_id or "local")
                await asyncio.shield(
                    _async_cleanup_w376(
                        conv, workspace, container_ctx, net_name, egress_ctx
                    )
                )


async def _async_cleanup_w376(
    conv, workspace, container_ctx, net_name, egress_ctx=None
):
    """W376: cleanup branches on workspace mode.

    Codex r1 R4 fix: label-based reconcile leaves orphans recoverable;
    + always: close conversation (idempotent per SDK contract);
    + remote-mode: stop(timeout=30) NOT kill (codex r1 A2 fix);
    + remote-mode: stop egress sidecar BEFORE network removal (codex r5 D1-R2-2 + D2-R2-P0-1 fix);
    + always: best-effort network cleanup.

    Ordering rationale (cleanup ladder, reverse of acquisition):
        conv.close → stop_agent_server(container) → stop_egress_sidecar(sidecar) → docker network rm
    Each step swallows exceptions so a failure mid-ladder still attempts the remaining cleanup.
    """
    if conv is not None:
        try:
            await asyncio.to_thread(conv.close)
        except Exception:
            pass

    if container_ctx is not None:
        try:
            await stop_agent_server(container_ctx)  # codex r1 A2: stop(30) not kill
        except Exception:
            pass

    # codex r5 D1-R2-2 + D2-R2-P0-1 fix: stop egress sidecar AFTER agent container, BEFORE network
    # removal (network owns the sidecar's iface; removing network first would race the sidecar stop).
    if egress_ctx is not None:
        try:
            await stop_egress_sidecar(egress_ctx)
        except Exception:
            pass

    # Network cleanup (best-effort; orphan-safe per W375 reconcile pattern)
    if net_name:
        try:
            await asyncio.to_thread(
                subprocess.run,
                ["docker", "network", "rm", net_name],
                capture_output=True,
                check=False,
                timeout=10,
            )
        except Exception:
            pass


async def _async_cleanup(conv, workspace, container_id, net_name):
    """W375 LEGACY cleanup helper — RETAINED for backward compatibility.

    Superseded by `_async_cleanup_w376` (which branches on workspace mode + takes a
    ContainerContext + egress_ctx and calls graceful stop_agent_server rather than
    `docker kill`). This thin legacy form is kept ONLY because tests/test_async_cleanup.py
    (a pre-existing W375 test file owned by another stream) imports and exercises it with
    the original signature `(conv, workspace, container_id: str, net_name)` + the
    `docker kill <container_id>` path. Removing it would break that suite; the W376
    activity body uses `_async_cleanup_w376` exclusively.

    Best-effort: close conv, kill container (by id), rm network.
    """
    if conv is not None:
        try:
            await asyncio.to_thread(conv.close)
        except Exception:
            pass
    if container_id:
        try:
            await asyncio.to_thread(
                subprocess.run,
                ["docker", "kill", container_id],
                capture_output=True,
                check=False,
                timeout=10,
            )
        except Exception:
            pass
    if net_name:
        try:
            await asyncio.to_thread(
                subprocess.run,
                ["docker", "network", "rm", net_name],
                capture_output=True,
                check=False,
                timeout=5,
            )
        except Exception:
            pass


# ============================================================
# L0/L1/L2/L3 + quota STUBS (materialized in P1.8 + P3.3-P3.5)
# ============================================================


@activity.defn
async def l0_validate_activity(spec: TaskSpec) -> dict:
    """L0 input-validate — calls agents.l0_validate.validate_task_spec.

    W376 PHASE D P1-2 (codex ship-gate): a malformed spec is a DETERMINISTIC
    failure — retrying it is pointless burn. ``validate_task_spec`` raises
    ``TaskSpecError`` (a ``ValueError`` subclass, defined in agents/models.py) on a
    bad spec; we re-raise it as a Temporal ``ApplicationError(non_retryable=True)``
    so the default activity retry policy does NOT loop on it. This is the robust
    leg of the defense-in-depth fix; the workflow ``execute_activity`` call also
    pins ``RetryPolicy(non_retryable_error_types=[...])`` (belt-and-suspenders).
    """
    from temporalio.exceptions import ApplicationError

    from agents.l0_validate import validate_task_spec

    try:
        return validate_task_spec(spec)
    except ValueError as e:  # TaskSpecError(ValueError) — deterministic bad-spec
        # type= preserves the original class name so non_retryable_error_types
        # matching on the workflow side stays meaningful for observability.
        raise ApplicationError(
            str(e),
            type=type(e).__name__,
            non_retryable=True,
        ) from e


@activity.defn
async def admit_retry_activity(payload: dict) -> dict:
    """W376 (codex r9 D3-finding-1): thin Temporal activity wrapper around
    AdmissionCoordinator.admit_retry, invoked by the TaskWorkflow retry loop BEFORE
    each workflow-level retry attempt.

    Side-effecting (SQLite + RetryBudget + OscillationDetector) so it lives in an
    activity, not the deterministic workflow body.

    payload: {"op_id": str, "failure_class": str, "attempt": int}
    Returns: {"admitted": bool, "wait_seconds": float, "reason": str | None}.

    The coordinator raises ManualReviewRequired (oscillation) / BudgetExhausted
    (retry-budget) on denial; both are surfaced as a non-admitted dict so the
    workflow can raise an ApplicationError(type="ManualReviewRequired") cleanly
    rather than letting an arbitrary AdmissionError cross the activity boundary.
    """
    from agents.admission_coordinator import (
        AdmissionError,
        BudgetExhausted,
        ManualReviewRequired,
    )

    coordinator = AdmissionCoordinator(ADMISSION_DB_PATH)
    try:
        return await coordinator.admit_retry(
            payload["op_id"], payload["failure_class"], int(payload["attempt"])
        )
    except ManualReviewRequired as e:
        return {"admitted": False, "wait_seconds": 0.0, "reason": f"oscillation: {e}"}
    except BudgetExhausted as e:
        return {"admitted": False, "wait_seconds": 0.0, "reason": f"budget: {e}"}
    except AdmissionError as e:
        return {"admitted": False, "wait_seconds": 0.0, "reason": str(e)}


# L1/L2/L3 activity imports — wrapped in imports_passed_through so the
# Temporal workflow sandbox does not try to sandbox-load these non-deterministic
# modules (litellm + codex CLI subprocess + SQLite + opentelemetry). Without
# this wrap, sandbox import fails at Worker.__init__ → prepare_workflow.
# DIM-15 fix (post-r-final-3 e2e bring-up): codex r-final-3 reviewed code paths,
# not the worker boot — sandbox-import semantics surface only on `worker.run()`.
with workflow.unsafe.imports_passed_through():
    # P3.3: real L1 CoVe activity imported from agents/cove_activity.py
    from agents.cove_activity import verify_cove_activity  # noqa: F401

    # P3.4: real L2 review-gate activity imported from agents/review_gate_activity.py
    from agents.review_gate_activity import review_gate_activity  # noqa: F401

    # P3.5: real L3 jury activity + quota ledger imported from dedicated modules
    from agents.jury_activity import jury_aggregate_activity  # noqa: F401
    from agents.jury_quota import (  # noqa: F401
        acquire_jury_quota_activity,
        release_jury_quota_activity,
    )

    # DIM-14 fix (codex r-final-2 P0): verdict-routing extracted to a
    # zero-dependency sibling module so it is unit-testable in isolation.
    from agents.verdict_routing import decide_verdict_routing  # noqa: F401


# ============================================================
# TaskWorkflow
# ============================================================


@workflow.defn
class TaskWorkflow:
    @workflow.run
    async def run(self, spec: TaskSpec) -> TaskResult:
        # codex r3 D5-O5 fix: typed value_set() upsert at workflow start (was missing).
        # codex r3 D3-r2-P0-3 fix: typed form, NOT raw dict.
        workflow.upsert_search_attributes(
            [
                ConversationIdKey.value_set(spec.conversation_id),
                SLOClassKey.value_set(getattr(spec.budget, "slo_class", None) or "P3"),
                ManualReviewPendingKey.value_set(False),
                P99BreachKey.value_set(False),
                ElapsedSecKey.value_set(0),
            ]
        )
        t0 = workflow.now()

        # codex r4 D5-finding-3 + codex r7 D3-r7-P0-1 + codex r8 D3-r8-P0-1: NESTED periodic
        # search-attr updater. Defined inside run() body; scheduled BEFORE the activity work
        # so it observes the live execution; cancelled/awaited in finally.
        async def _periodic_search_attr_update(start_time):
            """heartbeat search-attrs every 60s with workflow-safe sleep primitive.
            CancelledError exits cleanly — terminal upsert is emitted by the outer finally."""
            try:
                while True:
                    await workflow.sleep(
                        timedelta(seconds=60)
                    )  # replay-safe per S4 §9.
                    elapsed_so_far = (workflow.now() - start_time).total_seconds()
                    workflow.upsert_search_attributes(
                        [
                            ElapsedSecKey.value_set(int(elapsed_so_far)),
                            P99BreachKey.value_set(
                                elapsed_so_far > P99_BREACH_THRESHOLD_SEC
                            ),
                        ]
                    )
            except asyncio.CancelledError:
                return

        updater_task = asyncio.create_task(_periodic_search_attr_update(t0))

        try:
            from temporalio.exceptions import (
                ApplicationError,
                ActivityError,
                CancelledError as WfCancelledError,  # noqa: F401
                is_cancelled_exception,
            )

            # L0 input validate (stub for now; P1.8 replaces).
            # Task 18: L0 span.
            with tracer.start_as_current_span("openhands.L0") as l0_span:
                l0_span.set_attribute("conversation_id", spec.conversation_id)
                # W376 PHASE D P1-2 (codex ship-gate): a malformed spec is a
                # deterministic failure — pin the activity retry policy so Temporal
                # does NOT loop on TaskSpecError/ValueError. Belt-and-suspenders with
                # the activity-side ApplicationError(non_retryable=True).
                await workflow.execute_activity(
                    l0_validate_activity,
                    spec,
                    start_to_close_timeout=timedelta(seconds=30),
                    retry_policy=RetryPolicy(
                        non_retryable_error_types=["TaskSpecError", "ValueError"],
                    ),
                )

            # Main execution — codex r5 D3-r2-P0-1: workflow loop OWNS the retry decision;
            # activity auto-retry is hard-disabled (maximum_attempts=1) and every retry
            # passes through the admission coordinator gate.
            max_attempts = spec.budget.max_attempts  # bounded (default 3 per W375)
            trajectory = None
            last_error = None
            for attempt in range(max_attempts):
                try:
                    trajectory = await workflow.execute_activity(
                        openhands_run_activity,
                        spec,
                        start_to_close_timeout=timedelta(
                            seconds=spec.budget.timeout_seconds
                        ),
                        heartbeat_timeout=timedelta(seconds=60),
                        retry_policy=RetryPolicy(
                            maximum_attempts=1,
                            non_retryable_error_types=[
                                "BudgetExhausted",
                                "ManualReviewRequired",
                            ],
                        ),
                    )
                    break  # success — exit retry loop
                except ActivityError as outer:
                    # codex r6 D3-r6-P0-1: cancellation MUST propagate cleanly.
                    if is_cancelled_exception(outer):
                        raise
                    cause = outer.cause
                    if not isinstance(cause, ApplicationError):
                        raise
                    last_error = cause
                    if cause.non_retryable or cause.type in (
                        "BudgetExhausted",
                        "ManualReviewRequired",
                    ):
                        raise
                    # codex r9 D3-finding-1: consult admission coordinator BEFORE the next
                    # attempt with the OP_ID key (independent of conversation_id per §6.11).
                    op_id = AdmissionCoordinator.compute_op_id(spec)
                    admit_result = await workflow.execute_activity(
                        admit_retry_activity,
                        {
                            "op_id": op_id,
                            "failure_class": cause.type or "Unknown",
                            "attempt": attempt + 1,
                        },
                        start_to_close_timeout=timedelta(seconds=10),
                        retry_policy=RetryPolicy(maximum_attempts=2),
                    )
                    if not admit_result["admitted"]:
                        workflow.upsert_search_attributes(
                            [ManualReviewPendingKey.value_set(True)]
                        )
                        raise ApplicationError(
                            f"admission denied: {admit_result.get('reason', 'budget/oscillation')}",
                            type="ManualReviewRequired",
                            non_retryable=True,
                        )
                    if attempt + 1 < max_attempts:
                        # codex r5 D3-r2-P0-5: workflow.sleep — REPLAY-SAFE.
                        await workflow.sleep(
                            timedelta(seconds=admit_result["wait_seconds"])
                        )
            else:
                # for-else: loop exhausted without break — surface last error as non-retryable.
                raise ApplicationError(
                    f"max_attempts={max_attempts} exhausted; last_error={last_error}",
                    type="ManualReviewRequired",
                    non_retryable=True,
                )

            # L1 + L2 parallel — Task 18: L1 + L2 spans.
            # review_gate_activity takes a plain trajectory dict (not a tuple).
            async def _run_l1():
                with tracer.start_as_current_span("openhands.L1") as l1_span:
                    l1_span.set_attribute("conversation_id", spec.conversation_id)
                    return await workflow.execute_activity(
                        verify_cove_activity,
                        trajectory,
                        start_to_close_timeout=timedelta(minutes=10),
                    )

            async def _run_l2():
                with tracer.start_as_current_span("openhands.L2") as l2_span:
                    l2_span.set_attribute("conversation_id", spec.conversation_id)
                    return await workflow.execute_activity(
                        review_gate_activity,
                        trajectory,
                        start_to_close_timeout=timedelta(minutes=10),
                    )

            l1, l2 = await asyncio.gather(_run_l1(), _run_l2())

            # L3 conditional — DIM-14 fix (codex r-final-2 P0): FAIL is non-accepting.
            #   - DIRECT-FAIL        → either gate returned FAIL; short-circuit BLOCK
            #   - ESCALATE-JURY      → either gate returned AMBIGUOUS (neither FAIL); → L3
            #   - DETERMINISTIC-PASS → BOTH gates returned PASS (and only this case)
            #   - UNKNOWN-FAIL       → unknown verdict shape; defensive BLOCK
            routing = decide_verdict_routing(l1, l2)
            if routing == "ESCALATE-JURY":
                # Task 18: L3 jury span wraps the quota+jury activities.
                with tracer.start_as_current_span("openhands.L3") as l3_span:
                    l3_span.set_attribute("conversation_id", spec.conversation_id)
                    quota_token = await workflow.execute_activity(
                        acquire_jury_quota_activity,
                        spec.conversation_id,
                        start_to_close_timeout=timedelta(seconds=10),
                    )
                    try:
                        jury_dict = await workflow.execute_activity(
                            jury_aggregate_activity,
                            (trajectory, l1, l2),
                            start_to_close_timeout=timedelta(minutes=30),
                        )
                    finally:
                        await workflow.execute_activity(
                            release_jury_quota_activity,
                            quota_token,
                            start_to_close_timeout=timedelta(seconds=10),
                        )
                    l3_span.set_attribute(
                        "jury_verdict", jury_dict.get("verdict", "UNKNOWN")
                    )
            elif routing == "DETERMINISTIC-PASS":
                jury_dict = {
                    "verdict": "DETERMINISTIC-PASS",
                    "source": "L1=PASS,L2=PASS",
                }
            elif routing == "DIRECT-FAIL":
                jury_dict = {
                    "verdict": "L1L2-FAIL",
                    "source": f"L1={l1.get('verdict')},L2={l2.get('verdict')}",
                    "policy": "DIM-14 FAIL-non-accepting",
                }
            else:  # UNKNOWN-FAIL
                jury_dict = {
                    "verdict": "UNKNOWN-FAIL",
                    "source": f"L1={l1.get('verdict')},L2={l2.get('verdict')}",
                    "policy": "DIM-14 defensive-BLOCK",
                }

            # Final SLO record (typed value_set()).
            elapsed = (workflow.now() - t0).total_seconds()

            # codex r3 D5-O5: periodic upsert when p99 breach detected.
            if elapsed > spec.budget.p99_target_sec:
                workflow.upsert_search_attributes(
                    [
                        P99BreachKey.value_set(True),
                        ManualReviewPendingKey.value_set(True),  # operator-sign queued
                    ]
                )

            # codex r3 D5-O5 + codex r7 D3-r7-P0-1: terminal ElapsedSec upsert.
            workflow.upsert_search_attributes(
                [
                    ElapsedSecKey.value_set(int(elapsed)),
                    P99BreachKey.value_set(elapsed > spec.budget.p99_target_sec),
                ]
            )

            # Build TaskResult
            verdict = jury_dict.get("verdict", "UNKNOWN")
            status = (
                TaskStatus.COMPLETE
                if verdict in ("ACCEPT", "DETERMINISTIC-PASS")
                else TaskStatus.FAILED
            )
            return TaskResult(
                conversation_id=spec.conversation_id,
                status=status,
                events_processed=trajectory.get("events_processed", 0),
                jury_verdict=verdict,
                elapsed_sec=int(elapsed),
            )
        finally:
            # codex r8 D3-r8-P0-1: always cancel the periodic updater so it does not outlive
            # the workflow — runs on success, failure, AND cancellation paths.
            updater_task.cancel()
            with contextlib.suppress(asyncio.CancelledError):
                await updater_task


# ============================================================
# Worker bootstrap
# ============================================================


async def main():
    """Worker entry point."""
    from temporalio.contrib.opentelemetry import TracingInterceptor

    # Task 17 (codex r1 A3 + R2): pydantic_data_converter wired at the Client.connect
    # site so BaseModel TaskSpec/TaskResult return-types round-trip (else they raise at
    # temporalio/converter/_payload_converter.py:625-635).
    client = await Client.connect(
        os.environ.get("TEMPORAL_ADDRESS", "localhost:7233"),
        data_converter=pydantic_data_converter,
    )
    try:
        await register_search_attributes(client)
    except Exception as e:
        # Non-fatal — observability-only
        print(f"WARN: register_search_attributes failed: {e}", file=sys.stderr)

    worker = Worker(
        client,
        task_queue=TASK_QUEUE,
        workflows=[TaskWorkflow],
        activities=[
            openhands_run_activity,
            l0_validate_activity,
            # codex r9 D3-finding-1 (spec §6.5): register admit_retry_activity so the
            # workflow retry loop can invoke it via workflow.execute_activity(...).
            admit_retry_activity,
            verify_cove_activity,
            review_gate_activity,
            jury_aggregate_activity,
            acquire_jury_quota_activity,
            release_jury_quota_activity,
        ],
        interceptors=[TracingInterceptor()],
        graceful_shutdown_timeout=timedelta(seconds=300),  # codex r1 R9 fix
        max_concurrent_activities=8,
    )
    await worker.run()


if __name__ == "__main__":
    asyncio.run(main())
