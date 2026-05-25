# tests/test_otel_spans_wiring.py
"""Codex r1 D5 O1 BLOCKER FIX: business-level OTel spans per phase.

Only the Temporal TracingInterceptor was wired (transport-level). The activities
(openhands_run, L0, L1, L2, L3, cleanup) MUST create explicit business spans with
the six required attrs (conversation_id, workspace_mode, container_id, elapsed_sec,
jury_verdict, slo_class) + record_exception() + set_status(ERROR) on failures.

Cite: opentelemetry-api + codex r1 D5 O1 + spec §7.1.{1,2,3} + plan Task 18.

DEVIATION FROM PLAN (reported to orchestrator): openhands-sdk==1.22.1 is NOT installed
(agents.llm_factory imports it at module level). This module installs the same
sys.modules openhands stub used by tests/test_temporal_worker.py BEFORE importing
agents.temporal_worker.

DESIGN NOTE: the L0/L1/L2/L3 phase spans are emitted INSIDE TaskWorkflow.run(), which
needs the Temporal workflow runtime. Rather than stand up a Temporal server, this test
drives TaskWorkflow.run() directly with the temporalio.workflow.* free functions
monkeypatched (execute_activity / upsert_search_attributes / now / sleep / info) so the
real span-emitting code paths run. When execute_activity is asked to run
openhands_run_activity it invokes the REAL activity (emitting openhands_run_activity +
openhands.run + openhands.cleanup + the six attrs); for L0/L1/L2/L3/jury/quota it returns
canned dicts. Routing is steered to ESCALATE-JURY so the L3 span fires. All seven phase
spans + the six attrs are thereby exercised in one in-memory exporter.
"""

from __future__ import annotations

import sys
import types
import uuid
from datetime import datetime, timedelta, timezone
from unittest.mock import MagicMock

import pytest

from opentelemetry import trace
from opentelemetry.sdk.trace import TracerProvider
from opentelemetry.sdk.trace.export import SimpleSpanProcessor
from opentelemetry.sdk.trace.export.in_memory_span_exporter import InMemorySpanExporter
from opentelemetry.trace.status import StatusCode


# --------------------------------------------------------------------------- #
# openhands-sdk stub (mirrors tests/test_temporal_worker.py) — installed at IMPORT
# TIME so `import agents.temporal_worker` does not raise ModuleNotFoundError.
# --------------------------------------------------------------------------- #
def _install_openhands_stub() -> None:
    if "openhands.sdk" in sys.modules and getattr(
        sys.modules["openhands.sdk"], "_w376_stub", False
    ):
        return

    pkg = types.ModuleType("openhands")
    sdk = types.ModuleType("openhands.sdk")
    sdk._w376_stub = True

    class _LLM:
        def __init__(self, *a, **k):
            self.model = k.get("model", "stub-model")

    sdk.LLM = _LLM
    sdk.Agent = MagicMock(name="Agent")
    sdk.Conversation = MagicMock(name="Conversation")
    sdk.Workspace = MagicMock(name="Workspace")

    llm_mod = types.ModuleType("openhands.sdk.llm")
    auth_mod = types.ModuleType("openhands.sdk.llm.auth")
    openai_mod = types.ModuleType("openhands.sdk.llm.auth.openai")

    async def _subscription_login_async(*a, **k):
        return _LLM(model=k.get("model", "stub-model"))

    openai_mod.subscription_login_async = _subscription_login_async

    event_mod = types.ModuleType("openhands.sdk.event")
    conv_mod = types.ModuleType("openhands.sdk.event.llm_convertible")

    class AgentErrorEvent:
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


# --------------------------------------------------------------------------- #
# Exporter fixture
# --------------------------------------------------------------------------- #
@pytest.fixture
def span_exporter():
    """A fresh in-memory span exporter installed as the global tracer provider.

    agents.temporal_worker.tracer was created at import time against whatever
    provider existed then; we re-point both the global provider AND the module
    tracer so spans land in our exporter.
    """
    from agents import temporal_worker as m

    exporter = InMemorySpanExporter()
    provider = TracerProvider()
    provider.add_span_processor(SimpleSpanProcessor(exporter))
    trace.set_tracer_provider(provider)
    # Re-bind the module tracer to the new provider so its spans are exported.
    m.tracer = provider.get_tracer("w376.openhands")
    yield exporter
    exporter.clear()


# --------------------------------------------------------------------------- #
# Helpers — fake activity context + fake conversation + workflow.* monkeypatch
# --------------------------------------------------------------------------- #
class _FakeInfo:
    def __init__(self):
        self.heartbeat_timeout = timedelta(seconds=30)
        self.heartbeat_details = ()
        self.start_time = datetime(2026, 5, 23, tzinfo=timezone.utc)


def _patch_activity_ctx(monkeypatch, m):
    monkeypatch.setattr(m.activity, "info", lambda: _FakeInfo())
    monkeypatch.setattr(m.activity, "heartbeat", lambda *a, **k: None)
    monkeypatch.setattr(m.activity, "is_cancelled", lambda: False)


def _install_fake_conversation(monkeypatch, *, fail=False):
    sdk = sys.modules["openhands.sdk"]

    class _FakeConversation:
        def __init__(
            self, *, agent, workspace, conversation_id, callbacks, delete_on_close
        ):
            self._cbs = callbacks

        def send_message(self, msg):
            pass

        def run(self):
            if self._cbs:
                self._cbs[0](object())
            if fail:
                raise RuntimeError("injected conv.run failure")

        def pause(self):
            pass

        def close(self):
            pass

    monkeypatch.setattr(sdk, "Agent", MagicMock(name="Agent"))
    monkeypatch.setattr(sdk, "Conversation", _FakeConversation)


def _patch_activity_deps(monkeypatch, m):
    """Mock the activity's external deps so it runs locally without docker/LLM."""

    async def mock_build(spec_arg, container_ctx):
        return MagicMock(name="Workspace")

    async def mock_llm(*a, **k):
        return MagicMock(name="LLM")

    async def mock_cleanup(*a, **k):
        return None

    monkeypatch.setattr(m, "build_workspace_for", mock_build)
    monkeypatch.setattr(m, "make_routine_llm_async", mock_llm)
    monkeypatch.setattr(m, "_ensure_network", lambda *a, **k: None)
    monkeypatch.setattr(m, "_async_cleanup_w376", mock_cleanup)


# --------------------------------------------------------------------------- #
# Test 1 — activity emits its business span + the six required attrs (spec §7.1.2)
# --------------------------------------------------------------------------- #
@pytest.mark.asyncio
async def test_openhands_run_activity_emits_business_span_with_required_attrs(
    span_exporter, monkeypatch
):
    from agents import temporal_worker as m
    from agents.models import TaskSpec, Budget

    spec = TaskSpec(
        task="echo",
        budget=Budget(),
        workspace_mode="local",
        conversation_id=str(uuid.uuid4()),
    )
    _patch_activity_ctx(monkeypatch, m)
    _install_fake_conversation(monkeypatch, fail=False)
    _patch_activity_deps(monkeypatch, m)

    await m.openhands_run_activity(spec)

    spans = span_exporter.get_finished_spans()
    names = {s.name for s in spans}

    # Activity-level + inner-run + cleanup spans (the three this activity owns).
    assert "openhands_run_activity" in names
    assert "openhands.run" in names
    assert "openhands.cleanup" in names

    # codex r3 D5-O1: ALL six required attrs present on the activity span (spec §7.1.2).
    REQUIRED_ATTRS = {
        "conversation_id",
        "workspace_mode",
        "container_id",
        "elapsed_sec",
        "jury_verdict",
        "slo_class",
    }
    activity_span = next(s for s in spans if s.name == "openhands_run_activity")
    missing_attrs = REQUIRED_ATTRS - set(activity_span.attributes.keys())
    assert not missing_attrs, f"codex r3 D5-O1: missing required attrs {missing_attrs}"
    assert activity_span.attributes["conversation_id"] == spec.conversation_id
    assert activity_span.attributes["workspace_mode"] == "local"


# --------------------------------------------------------------------------- #
# Test 2 — full phase-span set across activity + workflow (spec §7.1.1)
# --------------------------------------------------------------------------- #
@pytest.mark.asyncio
async def test_all_phase_spans_emitted_across_activity_and_workflow(
    span_exporter, monkeypatch
):
    """codex r3 D5-O1 (PARTIAL→FIXED): assert ALL 7 phase spans from spec §7.1.1.

    Drives TaskWorkflow.run() with temporalio.workflow.* monkeypatched so the L0/L1/L2/L3
    span code paths run; execute_activity dispatches the REAL openhands_run_activity for
    the main step (emitting openhands_run_activity + openhands.run + openhands.cleanup).
    Routing steered to ESCALATE-JURY (L1=AMBIGUOUS) so the L3 span fires.
    """
    from agents import temporal_worker as m
    from agents.models import TaskSpec, Budget

    spec = TaskSpec(
        task="echo",
        budget=Budget(),
        workspace_mode="local",
        conversation_id=str(uuid.uuid4()),
    )

    _patch_activity_ctx(monkeypatch, m)
    _install_fake_conversation(monkeypatch, fail=False)
    _patch_activity_deps(monkeypatch, m)

    # Patch temporalio.workflow.* free functions so run() executes outside a Temporal env.
    monkeypatch.setattr(m.workflow, "upsert_search_attributes", lambda *a, **k: None)
    fake_now = datetime(2026, 5, 23, tzinfo=timezone.utc)
    monkeypatch.setattr(m.workflow, "now", lambda: fake_now)
    monkeypatch.setattr(
        m.workflow, "info", lambda: types.SimpleNamespace(start_time=fake_now)
    )

    # IMPORTANT: the nested _periodic_search_attr_update loops on `await workflow.sleep(60)`.
    # In a real Temporal env that durably suspends; here we make it block on a long real
    # asyncio.sleep so it parks on its FIRST iteration and is cancelled by run()'s finally,
    # rather than busy-spinning (a no-op sleep would starve the loop and hang the test).
    async def fake_sleep(duration=None, **k):
        await __import__("asyncio").sleep(3600)

    monkeypatch.setattr(m.workflow, "sleep", fake_sleep)

    async def fake_execute_activity(activity_fn, arg=None, **kwargs):
        # The MAIN step runs the real activity so its three spans + attrs are emitted.
        if activity_fn is m.openhands_run_activity:
            return await m.openhands_run_activity(arg)
        if activity_fn is m.l0_validate_activity:
            return {"ok": True}
        if activity_fn is m.verify_cove_activity:
            return {"verdict": "AMBIGUOUS"}  # steer routing → ESCALATE-JURY
        if activity_fn is m.review_gate_activity:
            return {"verdict": "AMBIGUOUS"}
        if activity_fn is m.acquire_jury_quota_activity:
            return "quota-token"
        if activity_fn is m.jury_aggregate_activity:
            return {"verdict": "ACCEPT", "source": "jury"}
        if activity_fn is m.release_jury_quota_activity:
            return None
        if activity_fn is m.admit_retry_activity:
            return {"admitted": True, "wait_seconds": 0.0, "reason": None}
        return {}

    monkeypatch.setattr(m.workflow, "execute_activity", fake_execute_activity)

    result = await m.TaskWorkflow().run(spec)
    assert result.conversation_id == spec.conversation_id

    spans = span_exporter.get_finished_spans()
    names = {s.name for s in spans}

    # codex r3 D5-O1 fix (PARTIAL→FIXED): all 7 phase spans from spec §7.1.1.
    REQUIRED_SPANS = {
        "openhands_run_activity",  # outer activity span
        "openhands.run",  # conv.run() inner span
        "openhands.L0",  # routine validate
        "openhands.L1",  # tier-1 review
        "openhands.L2",  # tier-2 review
        "openhands.L3",  # L3 jury
        "openhands.cleanup",  # asyncio.shield cleanup
    }
    missing = REQUIRED_SPANS - names
    assert not missing, f"codex r3 D5-O1: missing phase spans {missing}"


# --------------------------------------------------------------------------- #
# Test 3 — ERROR status + recorded exception on the failure path (spec §7.1.3)
# --------------------------------------------------------------------------- #
@pytest.mark.asyncio
async def test_openhands_run_activity_span_records_exception_on_failure(
    span_exporter, monkeypatch
):
    """codex r3 D5-O1 (spec §7.1.3): on failure the activity span status is ERROR and the
    exception is recorded as a span event."""
    from agents import temporal_worker as m
    from agents.models import TaskSpec, Budget

    spec = TaskSpec(
        task="echo",
        budget=Budget(),
        workspace_mode="local",
        conversation_id=str(uuid.uuid4()),
    )
    _patch_activity_ctx(monkeypatch, m)
    _install_fake_conversation(monkeypatch, fail=True)  # conv.run() raises
    _patch_activity_deps(monkeypatch, m)

    with pytest.raises(RuntimeError, match="injected conv.run failure"):
        await m.openhands_run_activity(spec)

    spans = span_exporter.get_finished_spans()

    # At least one ERROR-status span exists (the activity span + the inner run span).
    err_spans = [
        s for s in spans if s.status and s.status.status_code == StatusCode.ERROR
    ]
    assert err_spans, "spec §7.1.3: expected at least one ERROR-status span on failure"

    activity_span = next(s for s in spans if s.name == "openhands_run_activity")
    assert activity_span.status.status_code == StatusCode.ERROR
    # record_exception() emits an event named "exception".
    event_names = {e.name for e in activity_span.events}
    assert "exception" in event_names, (
        f"spec §7.1.3: record_exception() must add an 'exception' event; "
        f"got events {event_names}"
    )
