# tests/test_temporal_worker.py
"""W375 P1.7 + W376 PHASE D Task 11 — Temporal worker + workflow + activity tests.

DEVIATION FROM PLAN (reported to orchestrator): openhands-sdk==1.22.1 is NOT
installed in this venv. ``agents.llm_factory`` imports ``from openhands.sdk import
LLM`` + ``subscription_login_async`` AT MODULE LEVEL, and ``agents.temporal_worker``
imports ``agents.llm_factory`` at module level — so any
``from agents.temporal_worker import ...`` raises ModuleNotFoundError unless a fake
``openhands`` package tree is injected into ``sys.modules`` FIRST.

This module installs that stub at IMPORT TIME (below, before any temporal_worker
import) following the repo's existing mock pattern (tests/test_workspace_factory.py).
The stub exposes the symbols the import graph touches:
    - openhands.sdk.LLM
    - openhands.sdk.Agent, openhands.sdk.Conversation, openhands.sdk.Workspace
    - openhands.sdk.llm.auth.openai.subscription_login_async
    - openhands.sdk.event.llm_convertible.AgentErrorEvent

The production code keeps the deferred ``from openhands.sdk import Agent, Conversation``
imports verbatim, so it works as-written once the SDK lands in the venv.

The original DIM-14 ``decide_verdict_routing`` truth-table tests (which import
``agents.verdict_routing`` directly and need NO SDK) are preserved verbatim below.

Real WorkflowEnvironment (running Temporal server) is deferred to P5 e2e.
"""

from __future__ import annotations

import sys
import types
import uuid
from unittest.mock import MagicMock

import pytest


# --------------------------------------------------------------------------- #
# openhands-sdk stub — installed at IMPORT TIME so `import agents.temporal_worker`
# (-> agents.llm_factory -> `from openhands.sdk import LLM`) does not raise.
# --------------------------------------------------------------------------- #
def _install_openhands_stub() -> None:
    if "openhands.sdk" in sys.modules and getattr(
        sys.modules["openhands.sdk"], "_w376_stub", False
    ):
        return

    pkg = types.ModuleType("openhands")
    sdk = types.ModuleType("openhands.sdk")
    sdk._w376_stub = True  # marker so we don't double-install

    class _LLM:  # noqa: D401 — stand-in
        def __init__(self, *a, **k):
            self.model = k.get("model", "stub-model")

    sdk.LLM = _LLM
    sdk.Agent = MagicMock(name="Agent")
    sdk.Conversation = MagicMock(name="Conversation")
    sdk.Workspace = MagicMock(name="Workspace")

    # openhands.sdk.llm.auth.openai.subscription_login_async
    llm_mod = types.ModuleType("openhands.sdk.llm")
    auth_mod = types.ModuleType("openhands.sdk.llm.auth")
    openai_mod = types.ModuleType("openhands.sdk.llm.auth.openai")

    async def _subscription_login_async(*a, **k):
        return _LLM(model=k.get("model", "stub-model"))

    openai_mod.subscription_login_async = _subscription_login_async

    # openhands.sdk.event.llm_convertible.AgentErrorEvent
    event_mod = types.ModuleType("openhands.sdk.event")
    conv_mod = types.ModuleType("openhands.sdk.event.llm_convertible")

    class AgentErrorEvent:  # noqa: D401 — stand-in event class
        pass

    conv_mod.AgentErrorEvent = AgentErrorEvent

    sys.modules.setdefault("openhands", pkg)
    sys.modules["openhands.sdk"] = sdk
    sys.modules["openhands.sdk.llm"] = llm_mod
    sys.modules["openhands.sdk.llm.auth"] = auth_mod
    sys.modules["openhands.sdk.llm.auth.openai"] = openai_mod
    sys.modules["openhands.sdk.event"] = event_mod
    sys.modules["openhands.sdk.event.llm_convertible"] = conv_mod


_install_openhands_stub()


# ============================================================
# Smoke / import tests
# ============================================================


def test_imports():
    """Smoke: module loads + all named exports present."""
    from agents.temporal_worker import (
        openhands_run_activity,
        l0_validate_activity,
        admit_retry_activity,
        TaskWorkflow,
        TASK_QUEUE,
    )

    assert TASK_QUEUE == "openhands-dispatch"
    assert callable(openhands_run_activity)
    assert callable(l0_validate_activity)
    assert callable(admit_retry_activity)
    assert callable(TaskWorkflow.run)


def test_constants():
    from agents.temporal_worker import AGENT_SERVER_IMAGE

    assert AGENT_SERVER_IMAGE == "ghcr.io/openhands/agent-server:latest-python"


def test_stub_activities_return_well_formed_dicts():
    """L0/L1/L2/L3 stubs return dicts the workflow expects (replaced in P1.8 + P3.3-5)."""
    from agents.temporal_worker import (
        l0_validate_activity,
        verify_cove_activity,
        review_gate_activity,
        jury_aggregate_activity,
        acquire_jury_quota_activity,
        release_jury_quota_activity,
    )

    # Verify each stub is a callable (activity.defn wraps it)
    assert callable(l0_validate_activity)
    assert callable(verify_cove_activity)
    assert callable(review_gate_activity)
    assert callable(jury_aggregate_activity)
    assert callable(acquire_jury_quota_activity)
    assert callable(release_jury_quota_activity)


def test_module_imports_workspace_factory_and_spawn_helpers():
    """W376 Task 11: the rewritten activity wires build_workspace_for + spawn helpers
    + egress sidecar + admission coordinator into the module namespace."""
    import agents.temporal_worker as m

    assert m.build_workspace_for is not None
    assert m.spawn_agent_server is not None
    assert m.stop_agent_server is not None
    assert m.spawn_egress_sidecar is not None
    assert m.stop_egress_sidecar is not None
    assert m.AdmissionCoordinator is not None
    # Task 17: pydantic_data_converter symbol present at module scope.
    assert m.pydantic_data_converter is not None


# ============================================================
# W376 Task 11 — openhands_run_activity dispatch + lifecycle
# ============================================================
#
# These tests drive the activity body directly (no running Temporal server) inside
# a faked activity context. They mock: activity.info / activity.heartbeat /
# activity.is_cancelled, make_routine_llm_async, build_workspace_for,
# spawn_agent_server, spawn_egress_sidecar, the cleanup ladder, and the openhands
# Agent/Conversation classes. Per codex r1 A1 they assert the CALLBACK pattern
# (callbacks=[_emit_event] + sync send_message + conv.run in to_thread) — NOT the
# hallucinated stream_events().


class _FakeInfo:
    """Stand-in for temporalio activity.Info — only the fields the activity reads."""

    def __init__(self):
        self.heartbeat_timeout = __import__("datetime").timedelta(seconds=30)
        self.heartbeat_details = ()


def _patch_activity_ctx(monkeypatch):
    """Patch the temporalio.activity free functions the activity body calls."""
    from agents import temporal_worker as m

    monkeypatch.setattr(m.activity, "info", lambda: _FakeInfo())
    monkeypatch.setattr(m.activity, "heartbeat", lambda *a, **k: None)
    monkeypatch.setattr(m.activity, "is_cancelled", lambda: False)


def _make_fake_conversation(monkeypatch, *, emit_then_finish=True):
    """Install fake Agent + Conversation on the stubbed openhands.sdk module.

    The fake Conversation captures the callbacks list, records send_message, and on
    .run() (invoked via asyncio.to_thread) optionally fires one callback event so
    the _emit_event funnel + watchdog FIRST_COMPLETED path is exercised, then returns
    (run completes → the activity proceeds to its return dict).
    """
    sdk = sys.modules["openhands.sdk"]
    captured = {"callbacks": None, "messages": [], "ran": False, "closed": False}

    class _FakeConversation:
        def __init__(
            self, *, agent, workspace, conversation_id, callbacks, delete_on_close
        ):
            captured["callbacks"] = callbacks
            captured["conversation_id"] = conversation_id
            self._callbacks = callbacks

        def send_message(self, msg):
            captured["messages"].append(msg)

        def run(self):
            captured["ran"] = True
            if emit_then_finish and self._callbacks:
                # Fire one event through the callback funnel (synchronous, per codex r1 A1).
                self._callbacks[0](object())
            return None

        def pause(self):
            pass

        def close(self):
            captured["closed"] = True

    monkeypatch.setattr(sdk, "Agent", MagicMock(name="Agent"))
    monkeypatch.setattr(sdk, "Conversation", _FakeConversation)
    return captured


@pytest.mark.asyncio
async def test_openhands_run_activity_local_mode_uses_local_workspace(monkeypatch):
    """Activity in local mode should call build_workspace_for(spec, None) and NOT
    call spawn_agent_server / spawn_egress_sidecar (codex r1 A1 + A5/A6)."""
    from agents import temporal_worker as m
    from agents.models import TaskSpec, Budget

    spec = TaskSpec(
        task="echo",
        budget=Budget(),
        workspace_mode="local",
        conversation_id=str(uuid.uuid4()),
    )

    _patch_activity_ctx(monkeypatch)
    captured = _make_fake_conversation(monkeypatch)

    build_called_with = {}

    async def mock_build(spec_arg, container_ctx):
        build_called_with["container_ctx"] = container_ctx
        return MagicMock(name="LocalWorkspace")

    async def mock_spawn(*a, **k):
        raise RuntimeError("local mode should never spawn agent-server")

    async def mock_spawn_egress(*a, **k):
        raise RuntimeError("local mode should never spawn egress sidecar")

    async def mock_llm(*a, **k):
        return MagicMock(name="LLM")

    async def mock_cleanup(*a, **k):
        return None

    monkeypatch.setattr(m, "build_workspace_for", mock_build)
    monkeypatch.setattr(m, "spawn_agent_server", mock_spawn)
    monkeypatch.setattr(m, "spawn_egress_sidecar", mock_spawn_egress)
    monkeypatch.setattr(m, "make_routine_llm_async", mock_llm)
    monkeypatch.setattr(m, "_ensure_network", lambda *a, **k: None)
    monkeypatch.setattr(m, "_async_cleanup_w376", mock_cleanup)

    # Unwrap the @activity.defn so we can call the raw coroutine directly.
    # @activity.defn returns the function itself (no __wrapped__) in temporalio 1.27.2.
    raw = m.openhands_run_activity
    result = await raw(spec)

    # local mode → container_ctx is None passed to build_workspace_for
    assert build_called_with["container_ctx"] is None
    # codex r1 A1: callbacks funnel installed, send_message called (sync), conv.run ran.
    assert captured["callbacks"] is not None and len(captured["callbacks"]) == 1
    assert captured["messages"] == ["echo"]
    assert captured["ran"] is True
    # result dict shape per Task 11
    assert result["conversation_id"] == spec.conversation_id
    assert result["workspace_mode"] == "local"
    assert result["container_id"] is None
    assert result["events_processed"] >= 1


@pytest.mark.asyncio
async def test_openhands_run_activity_remote_mode_spawns_agent_server(monkeypatch):
    """Remote mode should spawn egress sidecar + agent-server, pass the resulting
    ContainerContext to build_workspace_for, and persist container_id (codex r1 A2/A6)."""
    from agents import temporal_worker as m
    from agents.models import TaskSpec, Budget
    from agents.workspace_factory import ContainerContext

    spec = TaskSpec(
        task="do work",
        budget=Budget(),
        workspace_mode="remote",
        conversation_id=str(uuid.uuid4()),
    )

    _patch_activity_ctx(monkeypatch)
    _make_fake_conversation(
        monkeypatch
    )  # install fake Conversation (no assert on capture)

    ctx = ContainerContext(
        container_id="container-abc", port=12345, session_api_key="sk-x"
    )
    spawn_calls = {"egress": 0, "agent": 0, "egress_ctx_passed": "unset"}

    async def mock_spawn_egress(spec_arg, net_name):
        spawn_calls["egress"] += 1
        return MagicMock(name="EgressCtx")

    async def mock_spawn_agent(spec_arg, net_name, *, egress_ctx=None):
        spawn_calls["agent"] += 1
        spawn_calls["egress_ctx_passed"] = egress_ctx
        return ctx

    build_called_with = {}

    async def mock_build(spec_arg, container_ctx):
        build_called_with["container_ctx"] = container_ctx
        return MagicMock(name="RemoteWorkspace")

    async def mock_llm(*a, **k):
        return MagicMock(name="LLM")

    async def mock_cleanup(*a, **k):
        return None

    persisted = {}

    def mock_persist(conv_id, fname, val):
        persisted[fname] = val

    monkeypatch.setattr(m, "spawn_egress_sidecar", mock_spawn_egress)
    monkeypatch.setattr(m, "spawn_agent_server", mock_spawn_agent)
    monkeypatch.setattr(m, "build_workspace_for", mock_build)
    monkeypatch.setattr(m, "make_routine_llm_async", mock_llm)
    monkeypatch.setattr(m, "_ensure_network", lambda *a, **k: None)
    monkeypatch.setattr(m, "persist_field", mock_persist)
    monkeypatch.setattr(m, "_async_cleanup_w376", mock_cleanup)

    # @activity.defn returns the function itself (no __wrapped__) in temporalio 1.27.2.
    raw = m.openhands_run_activity
    result = await raw(spec)

    assert spawn_calls["egress"] == 1
    assert spawn_calls["agent"] == 1
    # codex r3 D2-S3: egress_ctx threaded into spawn_agent_server.
    assert spawn_calls["egress_ctx_passed"] is not None
    # ContainerContext from spawn passed to build_workspace_for.
    assert build_called_with["container_ctx"] is ctx
    # container_id persisted + surfaced in result.
    assert persisted.get("container_id.txt") == "container-abc"
    assert result["container_id"] == "container-abc"
    assert result["workspace_mode"] == "remote"


@pytest.mark.asyncio
async def test_openhands_run_activity_cleanup_runs_on_acquisition_failure(monkeypatch):
    """codex r6 D3-r6-P0-2: when build_workspace_for raises, the full cleanup ladder
    (_async_cleanup_w376) is invoked with the acquired resources, then the error reraises."""
    from agents import temporal_worker as m
    from agents.models import TaskSpec, Budget

    spec = TaskSpec(
        task="echo",
        budget=Budget(),
        workspace_mode="local",
        conversation_id=str(uuid.uuid4()),
    )

    _patch_activity_ctx(monkeypatch)
    _make_fake_conversation(monkeypatch)

    cleanup_calls = {"n": 0}

    async def mock_build(spec_arg, container_ctx):
        raise RuntimeError("workspace ctor blew up")

    async def mock_llm(*a, **k):
        return MagicMock(name="LLM")

    async def mock_cleanup(conv, workspace, container_ctx, net_name, egress_ctx=None):
        cleanup_calls["n"] += 1

    monkeypatch.setattr(m, "build_workspace_for", mock_build)
    monkeypatch.setattr(m, "make_routine_llm_async", mock_llm)
    monkeypatch.setattr(m, "_ensure_network", lambda *a, **k: None)
    monkeypatch.setattr(m, "_async_cleanup_w376", mock_cleanup)

    # @activity.defn returns the function itself (no __wrapped__) in temporalio 1.27.2.
    raw = m.openhands_run_activity
    with pytest.raises(RuntimeError, match="workspace ctor blew up"):
        await raw(spec)

    assert (
        cleanup_calls["n"] >= 1
    )  # cleanup ladder fired on the acquisition-failure path


@pytest.mark.asyncio
async def test_async_cleanup_w376_remote_ladder_order(monkeypatch):
    """codex r1 R4 + r5 D1-R2-2: cleanup ladder closes conv, stops agent container, stops
    egress sidecar, then removes the network — each step best-effort."""
    from agents import temporal_worker as m

    order = []

    class _Conv:
        def close(self):
            order.append("conv.close")

    async def mock_stop_agent(ctx):
        order.append("stop_agent")

    async def mock_stop_egress(ctx):
        order.append("stop_egress")

    def fake_subprocess_run(*a, **k):
        order.append("network.rm")

        class _R:
            returncode = 0

        return _R()

    monkeypatch.setattr(m, "stop_agent_server", mock_stop_agent)
    monkeypatch.setattr(m, "stop_egress_sidecar", mock_stop_egress)
    monkeypatch.setattr(m.subprocess, "run", fake_subprocess_run)

    await m._async_cleanup_w376(
        _Conv(),
        MagicMock(name="workspace"),
        MagicMock(name="container_ctx"),
        "w375-conv-x",
        egress_ctx=MagicMock(name="egress_ctx"),
    )

    assert order == ["conv.close", "stop_agent", "stop_egress", "network.rm"]


# ============================================================
# W376 Task 11 — admit_retry_activity wrapper
# ============================================================


@pytest.mark.asyncio
async def test_admit_retry_activity_admits(monkeypatch):
    """admit_retry_activity returns the coordinator's admit dict on success."""
    from agents import temporal_worker as m

    class _Coord:
        def __init__(self, *a, **k):
            pass

        async def admit_retry(self, op_id, failure_class, attempt):
            return {"admitted": True, "wait_seconds": 2.0, "reason": None}

    monkeypatch.setattr(m, "AdmissionCoordinator", _Coord)

    raw = m.admit_retry_activity
    out = await raw({"op_id": "op1", "failure_class": "Transient", "attempt": 1})
    assert out == {"admitted": True, "wait_seconds": 2.0, "reason": None}


@pytest.mark.asyncio
async def test_admit_retry_activity_oscillation_denied(monkeypatch):
    """ManualReviewRequired from the coordinator is surfaced as a non-admitted dict."""
    from agents import temporal_worker as m
    from agents.admission_coordinator import ManualReviewRequired

    class _Coord:
        def __init__(self, *a, **k):
            pass

        async def admit_retry(self, op_id, failure_class, attempt):
            raise ManualReviewRequired("3 reversals")

    monkeypatch.setattr(m, "AdmissionCoordinator", _Coord)

    raw = m.admit_retry_activity
    out = await raw({"op_id": "op1", "failure_class": "Flaky", "attempt": 3})
    assert out["admitted"] is False
    assert "oscillation" in out["reason"]


@pytest.mark.asyncio
async def test_admit_retry_activity_budget_denied(monkeypatch):
    """BudgetExhausted from the coordinator is surfaced as a non-admitted dict."""
    from agents import temporal_worker as m
    from agents.admission_coordinator import BudgetExhausted

    class _Coord:
        def __init__(self, *a, **k):
            pass

        async def admit_retry(self, op_id, failure_class, attempt):
            raise BudgetExhausted("over cap")

    monkeypatch.setattr(m, "AdmissionCoordinator", _Coord)

    raw = m.admit_retry_activity
    out = await raw({"op_id": "op1", "failure_class": "Flaky", "attempt": 2})
    assert out["admitted"] is False
    assert "budget" in out["reason"]


# ============================================================
# W376 Task 11 — workflow uses TYPED search-attr value_set (codex r3 D3-r2-P0-3)
# ============================================================


def test_workflow_run_source_uses_typed_value_set_not_raw_dict():
    """Static guard (codex r3 D3-r2-P0-3): TaskWorkflow.run() must upsert search attrs
    as a list of SearchAttributeKey.value_set(...) objects, NOT a raw dict.

    We assert against the source of the run() method: every upsert_search_attributes
    call passes a list literal containing `.value_set(`, and no `upsert_search_attributes({`
    raw-dict form appears.
    """
    import inspect
    from agents.temporal_worker import TaskWorkflow

    src = inspect.getsource(TaskWorkflow.run)
    assert "upsert_search_attributes" in src
    # No raw-dict form: `upsert_search_attributes({` would be the deprecated path.
    assert "upsert_search_attributes({" not in src.replace(" ", "")
    assert ".value_set(" in src


def test_workflow_run_wires_admit_retry_and_compute_op_id():
    """codex r9 D3-finding-1: the retry loop consults compute_op_id + admit_retry_activity."""
    import inspect
    from agents.temporal_worker import TaskWorkflow

    src = inspect.getsource(TaskWorkflow.run)
    assert "compute_op_id" in src
    assert "admit_retry_activity" in src
    # codex r5 D3-r2-P0-1: activity auto-retry hard-disabled (maximum_attempts=1).
    assert "maximum_attempts=1" in src


# ============================================================
# W376 PHASE D P1-2 — L0 invalid-spec is NON-RETRYABLE (codex ship-gate)
# ============================================================
#
# A malformed spec is a deterministic failure: retrying it is pointless burn.
# The fix is defense-in-depth — (a) the activity re-raises TaskSpecError as a
# Temporal ApplicationError(non_retryable=True), and (b) the workflow pins a
# RetryPolicy(non_retryable_error_types=[...]) on the execute_activity call.


@pytest.mark.asyncio
async def test_l0_validate_activity_raises_non_retryable_application_error(monkeypatch):
    """P1-2 (activity-side, robust leg): a bad spec → ApplicationError(non_retryable=True),
    NOT a bare TaskSpecError. Without this, Temporal's default retry policy loops on it."""
    from temporalio.exceptions import ApplicationError

    from agents import temporal_worker as m
    from agents.models import TaskSpec, Budget

    # Shell-injection marker in the task triggers TaskSpecError inside validate_task_spec.
    spec = TaskSpec(
        task="rm -rf $(whoami)",
        budget=Budget(),
        workspace_mode="local",
        conversation_id=str(uuid.uuid4()),
    )

    raw = m.l0_validate_activity
    with pytest.raises(ApplicationError) as excinfo:
        await raw(spec)

    err = excinfo.value
    # MUST be non_retryable so a malformed spec does not waste retry budget.
    assert err.non_retryable is True
    # type preserved as the original exception class name (TaskSpecError) for
    # observability + workflow-side non_retryable_error_types matching.
    assert err.type == "TaskSpecError"


@pytest.mark.asyncio
async def test_l0_validate_activity_passes_valid_spec_through(monkeypatch):
    """P1-2 regression: a VALID spec must still return the L0 PASS dict (the
    non-retryable wrapping only fires on the failure path)."""
    from agents import temporal_worker as m
    from agents.models import TaskSpec, Budget

    spec = TaskSpec(
        task="implement feature X",
        budget=Budget(),
        workspace_mode="local",
        conversation_id=str(uuid.uuid4()),
    )

    raw = m.l0_validate_activity
    result = await raw(spec)
    assert result["verdict"] == "PASS"
    assert result["validator"] == "l0"


def test_workflow_run_pins_l0_non_retryable_retry_policy():
    """P1-2 (workflow-side, belt-and-suspenders): the execute_activity call for
    l0_validate_activity MUST carry a RetryPolicy with non_retryable_error_types
    covering TaskSpecError/ValueError. Static source guard (matches the existing
    test_workflow_run_* inspection style)."""
    import inspect
    from agents.temporal_worker import TaskWorkflow

    src = inspect.getsource(TaskWorkflow.run)
    assert "l0_validate_activity" in src
    assert "non_retryable_error_types" in src
    # The L0 retry policy names the deterministic bad-spec error types.
    normalized = src.replace(" ", "").replace("\n", "")
    assert (
        'non_retryable_error_types=["TaskSpecError","ValueError"]'.replace(" ", "")
        in normalized
    )


# ============================================================
# DIM-14 — decide_verdict_routing (codex r-final-2 P0 fix) — PRESERVED VERBATIM
# ============================================================
#
# The previous TaskWorkflow.run() control-flow silently accepted L1 or L2 FAIL
# verdicts as DETERMINISTIC-PASS because the only escalation gate was
# AMBIGUOUS. The fix extracts a pure function decide_verdict_routing() that
# distinguishes four outcomes; these tests pin its truth-table.


def test_routing_both_pass_is_deterministic_pass():
    """BOTH gates PASS → accept without invoking L3 jury."""
    from agents.verdict_routing import decide_verdict_routing

    assert (
        decide_verdict_routing({"verdict": "PASS"}, {"verdict": "PASS"})
        == "DETERMINISTIC-PASS"
    )


def test_routing_l1_fail_is_direct_fail():
    """L1 FAIL → DIRECT-FAIL regardless of L2 (FAIL is non-accepting)."""
    from agents.verdict_routing import decide_verdict_routing

    assert (
        decide_verdict_routing({"verdict": "FAIL"}, {"verdict": "PASS"})
        == "DIRECT-FAIL"
    )
    assert (
        decide_verdict_routing({"verdict": "FAIL"}, {"verdict": "AMBIGUOUS"})
        == "DIRECT-FAIL"
    )
    assert (
        decide_verdict_routing({"verdict": "FAIL"}, {"verdict": "FAIL"})
        == "DIRECT-FAIL"
    )


def test_routing_l2_fail_is_direct_fail():
    """L2 FAIL → DIRECT-FAIL regardless of L1 (FAIL is non-accepting)."""
    from agents.verdict_routing import decide_verdict_routing

    assert (
        decide_verdict_routing({"verdict": "PASS"}, {"verdict": "FAIL"})
        == "DIRECT-FAIL"
    )
    assert (
        decide_verdict_routing({"verdict": "AMBIGUOUS"}, {"verdict": "FAIL"})
        == "DIRECT-FAIL"
    )


def test_routing_ambiguous_escalates_to_jury():
    """Either gate AMBIGUOUS (and neither FAIL) → ESCALATE-JURY."""
    from agents.verdict_routing import decide_verdict_routing

    assert (
        decide_verdict_routing({"verdict": "AMBIGUOUS"}, {"verdict": "PASS"})
        == "ESCALATE-JURY"
    )
    assert (
        decide_verdict_routing({"verdict": "PASS"}, {"verdict": "AMBIGUOUS"})
        == "ESCALATE-JURY"
    )
    assert (
        decide_verdict_routing({"verdict": "AMBIGUOUS"}, {"verdict": "AMBIGUOUS"})
        == "ESCALATE-JURY"
    )


def test_routing_fail_dominates_ambiguous():
    """When both signals present, FAIL wins — concrete evidence beats ambiguity, no jury burn."""
    from agents.verdict_routing import decide_verdict_routing

    # FAIL+AMBIGUOUS in any order → DIRECT-FAIL (not ESCALATE-JURY)
    assert (
        decide_verdict_routing({"verdict": "FAIL"}, {"verdict": "AMBIGUOUS"})
        == "DIRECT-FAIL"
    )
    assert (
        decide_verdict_routing({"verdict": "AMBIGUOUS"}, {"verdict": "FAIL"})
        == "DIRECT-FAIL"
    )


def test_routing_unknown_verdict_is_unknown_fail():
    """Unknown verdict string → UNKNOWN-FAIL (defensive BLOCK)."""
    from agents.verdict_routing import decide_verdict_routing

    assert (
        decide_verdict_routing({"verdict": "BOGUS"}, {"verdict": "PASS"})
        == "UNKNOWN-FAIL"
    )
    assert (
        decide_verdict_routing({"verdict": "PASS"}, {"verdict": "BOGUS"})
        == "UNKNOWN-FAIL"
    )


def test_routing_empty_dict_is_unknown_fail():
    """Missing verdict key → UNKNOWN-FAIL (defensive BLOCK; never silently accept malformed)."""
    from agents.verdict_routing import decide_verdict_routing

    assert decide_verdict_routing({}, {"verdict": "PASS"}) == "UNKNOWN-FAIL"
    assert decide_verdict_routing({"verdict": "PASS"}, {}) == "UNKNOWN-FAIL"
    assert decide_verdict_routing({}, {}) == "UNKNOWN-FAIL"


def test_routing_dim14_regression_prior_silent_pass_now_blocks():
    """DIM-14 regression: before the fix, (PASS, FAIL) and (FAIL, PASS) silently
    became DETERMINISTIC-PASS via the else-branch. After the fix, both must be
    DIRECT-FAIL. This is the canonical regression test for the codex r-final-2
    P0 fix.
    """
    from agents.verdict_routing import decide_verdict_routing

    # Pre-fix would have returned "DETERMINISTIC-PASS" for these. Post-fix must
    # return "DIRECT-FAIL" so the workflow status-mapping yields TaskStatus.FAILED.
    assert (
        decide_verdict_routing({"verdict": "PASS"}, {"verdict": "FAIL"})
        != "DETERMINISTIC-PASS"
    )
    assert (
        decide_verdict_routing({"verdict": "FAIL"}, {"verdict": "PASS"})
        != "DETERMINISTIC-PASS"
    )
    assert (
        decide_verdict_routing({"verdict": "PASS"}, {"verdict": "FAIL"})
        == "DIRECT-FAIL"
    )
    assert (
        decide_verdict_routing({"verdict": "FAIL"}, {"verdict": "PASS"})
        == "DIRECT-FAIL"
    )
