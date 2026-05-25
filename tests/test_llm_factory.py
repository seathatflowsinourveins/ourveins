# tests/test_llm_factory.py
"""W375/W376 — routine + jury LLM factory tests.

DEVIATION FROM PLAN (same as tests/test_temporal_worker.py): openhands-sdk is NOT
installed in this venv, and ``agents.llm_factory`` does ``from openhands.sdk import
LLM`` + ``from openhands.sdk.llm.auth.openai import subscription_login_async`` AT
MODULE LEVEL. So ``import agents.llm_factory`` raises ModuleNotFoundError unless a
fake ``openhands`` package tree is injected into ``sys.modules`` FIRST. This module
installs that stub at IMPORT TIME (below), mirroring test_temporal_worker.py /
test_workspace_factory.py. The production code is unchanged and works as-written once
the SDK lands in the venv.
"""

import sys
import types
from contextlib import contextmanager
from unittest.mock import patch, MagicMock


# --------------------------------------------------------------------------- #
# openhands-sdk stub — installed at IMPORT TIME so `import agents.llm_factory`
# (-> `from openhands.sdk import LLM`) does not raise.
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

        # subscription_login is the sync entry the production make_routine_llm() uses.
        @staticmethod
        def subscription_login(*a, **k):
            return _LLM(model=k.get("model", "stub-model"))

    sdk.LLM = _LLM
    # Superset stub: define the symbols test_temporal_worker.py's stub also needs, so
    # whichever test file installs FIRST (shared sys.modules + same _w376_stub marker)
    # leaves a stub complete enough for BOTH (avoids a collection-order collision).
    sdk.Agent = MagicMock(name="Agent")
    sdk.Conversation = MagicMock(name="Conversation")
    sdk.Workspace = MagicMock(name="Workspace")

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


import pytest  # noqa: E402  (after stub install, before agents.llm_factory import)


def test_default_subscription_model():
    from agents.llm_factory import OPENHANDS_SUBSCRIPTION_MODEL_DEFAULT

    assert OPENHANDS_SUBSCRIPTION_MODEL_DEFAULT == "gpt-5.3-codex"


def test_env_hedge_overrides_default(monkeypatch):
    monkeypatch.setenv("OPENHANDS_SUBSCRIPTION_MODEL", "gpt-5.2-codex")
    from agents.llm_factory import get_subscription_model

    assert get_subscription_model() == "gpt-5.2-codex"


def test_no_env_returns_default(monkeypatch):
    monkeypatch.delenv("OPENHANDS_SUBSCRIPTION_MODEL", raising=False)
    from agents.llm_factory import get_subscription_model

    assert get_subscription_model() == "gpt-5.3-codex"


def test_make_routine_llm_invokes_subscription_login(monkeypatch):
    monkeypatch.setenv("OPENHANDS_SUBSCRIPTION_MODEL", "gpt-5.3-codex")
    with patch("agents.llm_factory.LLM") as mock_LLM:
        mock_LLM.subscription_login = MagicMock(return_value="fake-llm-instance")
        from agents.llm_factory import make_routine_llm

        result = make_routine_llm()
        assert result == "fake-llm-instance"
        mock_LLM.subscription_login.assert_called_once_with(
            vendor="openai",
            model="gpt-5.3-codex",
            force_login=False,
            open_browser=False,
        )


def test_make_jury_llm_uses_codex_provider_model():
    with patch("agents.llm_factory.LLM") as mock_LLM:
        mock_LLM.return_value = "fake-jury-llm"
        from agents.llm_factory import make_jury_llm

        make_jury_llm()
        mock_LLM.assert_called_once()
        kwargs = mock_LLM.call_args.kwargs
        assert kwargs.get("model") == "codex/deep-review-exec"
        assert kwargs.get("max_output_tokens") == 16384


# ============================================================
# W376 PHASE D P1-1 — routine-LLM Langfuse session correlation (codex ship-gate)
# ============================================================


@pytest.mark.asyncio
async def test_routine_llm_generation_propagates_session_via_native_api(monkeypatch):
    """P1-1: the routine-LLM generation hook MUST set session correlation via the
    langfuse-native ``propagate_attributes(session_id=conversation_id)`` context
    manager, opening the generation as the current span inside it — NOT via
    ``metadata={"session_id": ...}`` (arbitrary metadata keys are not indexed for
    session-level token/cost rollups in langfuse 4.2.0).

    The langfuse import is LAZY (``from langfuse import Langfuse, propagate_attributes``
    inside make_routine_llm_async), so we patch the symbols on the ``langfuse``
    package — the resolution target for a function-local ``from langfuse import X``.
    """
    conversation_id = "conv-routine-p11"

    # --- mock langfuse client ---------------------------------------------------
    gen = MagicMock(name="LangfuseGeneration")
    saco_cm = MagicMock(name="start_as_current_observation_cm")
    saco_cm.__enter__ = MagicMock(return_value=gen)
    saco_cm.__exit__ = MagicMock(return_value=False)

    langfuse_client = MagicMock(name="LangfuseClient")
    langfuse_client.start_as_current_observation.return_value = saco_cm

    monkeypatch.setattr("langfuse.Langfuse", MagicMock(return_value=langfuse_client))

    # --- mock the module-level propagate_attributes context manager -------------
    propagate_calls = {}

    @contextmanager
    def _fake_propagate(**kwargs):
        propagate_calls.update(kwargs)
        yield None

    monkeypatch.setattr("langfuse.propagate_attributes", _fake_propagate)

    # --- avoid the real OAuth login -> return a stub LLM (no acomplete) ----------
    async def _fake_login(*a, **k):
        return MagicMock(name="StubLLM", spec=[])  # no acomplete -> echo path

    monkeypatch.setattr("agents.llm_factory.subscription_login_async", _fake_login)

    from agents.llm_factory import make_routine_llm_async

    wrapped = await make_routine_llm_async(conversation_id)

    # Drive the redacted generation hook (this is what emits to Langfuse).
    await wrapped.acomplete(messages=[{"role": "user", "content": "hello world"}])

    # P1-1 CONTRACT: session propagated via the native context manager.
    assert propagate_calls.get("session_id") == conversation_id

    # Generation opened as the CURRENT span; session_id NOT smuggled via metadata;
    # the deprecated detached start_observation path NOT used.
    langfuse_client.start_as_current_observation.assert_called_once()
    saco_kwargs = langfuse_client.start_as_current_observation.call_args.kwargs
    assert saco_kwargs.get("as_type") == "generation"
    assert "session_id" not in (saco_kwargs.get("metadata") or {})
    langfuse_client.start_observation.assert_not_called()


@pytest.mark.asyncio
async def test_make_routine_llm_async_rejects_empty_conversation_id():
    """codex r5 D5-O2 regression: empty conversation_id is a hard error (an empty
    session id would silently break Langfuse session correlation)."""
    from agents.llm_factory import make_routine_llm_async

    with pytest.raises(ValueError, match="conversation_id required"):
        await make_routine_llm_async("")
