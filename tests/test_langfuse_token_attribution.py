# tests/test_langfuse_token_attribution.py
"""Langfuse generations per LLM call — token attribution + session correlation.

Routine LLM + jury codex calls MUST be bound to Langfuse generations + session IDs,
and token usage MUST be captured.

W376 ship-gate r2 P1-1: migrated from the deprecated detached
``langfuse.start_observation(...) + metadata={"session_id": ...}`` path to the
langfuse 4.2.0 native session-correlation API — the module-level
``propagate_attributes(session_id=...)`` context manager wrapping
``langfuse.start_as_current_observation(as_type="generation")`` (the ctx-mgr
``__exit__`` ends the generation, so there is no explicit ``gen.end()``). Token
attribution still flows via ``gen.update(usage_details={input,output,total})``.
This mirrors the production shape in agents/llm_factory.py + agents/jury_activity.py
and the proven mock pattern in tests/test_llm_factory.py.

DEVIATION FROM PLAN (reported to orchestrator): openhands-sdk==1.22.1 is NOT
installed in this venv (Z:\\venvs\\claude; importlib.util.find_spec('openhands')
-> None). agents/llm_factory.py imports ``from openhands.sdk import LLM`` and
``from openhands.sdk.llm.auth.openai import subscription_login_async`` at module
top-level, so a fake ``openhands.sdk`` package is injected into sys.modules BEFORE
agents.llm_factory is first imported. This mirrors the repo's existing pattern in
tests/test_workspace_factory.py. The production module keeps the real SDK imports
unchanged, so it works as-written once the SDK lands in the venv.
"""

import sys
import types
from contextlib import contextmanager
from unittest.mock import AsyncMock, MagicMock

import pytest


# --- inject fake openhands.sdk so agents.llm_factory imports without the SDK ----
def _install_openhands_stub() -> None:
    if "openhands.sdk.llm.auth.openai" in sys.modules:
        return

    pkg = types.ModuleType("openhands")
    sdk = types.ModuleType("openhands.sdk")
    llm_pkg = types.ModuleType("openhands.sdk.llm")
    auth_pkg = types.ModuleType("openhands.sdk.llm.auth")
    openai_mod = types.ModuleType("openhands.sdk.llm.auth.openai")

    sdk.LLM = MagicMock(name="LLM")  # type: ignore[attr-defined]

    async def _subscription_login_async(**kwargs):
        """Return a fake routine LLM whose acomplete yields a usage-bearing response."""
        llm = MagicMock(name="RoutineLLM")
        llm.acomplete = AsyncMock(
            return_value={
                "choices": [{"message": {"content": "ok"}}],
                "usage": {"prompt_tokens": 7, "completion_tokens": 3},
            }
        )
        return llm

    openai_mod.subscription_login_async = _subscription_login_async  # type: ignore[attr-defined]

    sys.modules["openhands"] = pkg
    sys.modules["openhands.sdk"] = sdk
    sys.modules["openhands.sdk.llm"] = llm_pkg
    sys.modules["openhands.sdk.llm.auth"] = auth_pkg
    sys.modules["openhands.sdk.llm.auth.openai"] = openai_mod


_install_openhands_stub()


def _make_langfuse_mocks():
    """Build the langfuse 4.2.0 context-manager mock surface shared by both tests.

    Returns (langfuse_client, gen, propagate_calls): start_as_current_observation
    returns a context manager whose __enter__ yields the generation `gen`;
    propagate_attributes is a fake ctx-mgr that records its kwargs into propagate_calls.
    """
    gen = MagicMock(name="LangfuseGeneration")
    saco_cm = MagicMock(name="start_as_current_observation_cm")
    saco_cm.__enter__ = MagicMock(return_value=gen)
    saco_cm.__exit__ = MagicMock(return_value=False)
    langfuse_client = MagicMock(name="LangfuseClient")
    langfuse_client.start_as_current_observation.return_value = saco_cm

    propagate_calls: dict = {}

    @contextmanager
    def _fake_propagate(**kwargs):
        propagate_calls.update(kwargs)
        yield None

    return langfuse_client, gen, propagate_calls, _fake_propagate


@pytest.mark.asyncio
async def test_routine_llm_emits_langfuse_generation_with_tokens(monkeypatch):
    # W376 ship-gate r2 P1-1: native session correlation + token attribution.
    langfuse_client, gen, propagate_calls, _fake_propagate = _make_langfuse_mocks()

    # Langfuse is a lazy in-function import — patch the symbols on the `langfuse`
    # package (the resolution target for a function-local `from langfuse import X`).
    monkeypatch.setattr("langfuse.Langfuse", MagicMock(return_value=langfuse_client))
    monkeypatch.setattr("langfuse.propagate_attributes", _fake_propagate)

    from agents.llm_factory import make_routine_llm_async

    llm = await make_routine_llm_async(conversation_id="conv-test-r3-d5-o2")
    # Invoke through the Langfuse-wrapped client surface.
    await llm.acomplete(messages=[{"role": "user", "content": "hello"}])

    # session correlation via the native ctx-mgr (NOT arbitrary metadata).
    assert propagate_calls.get("session_id") == "conv-test-r3-d5-o2"
    # v4 generation opened as the CURRENT span; deprecated detached path NOT used.
    langfuse_client.start_as_current_observation.assert_called_once()
    saco_kwargs = langfuse_client.start_as_current_observation.call_args.kwargs
    assert saco_kwargs.get("as_type") == "generation"
    langfuse_client.start_observation.assert_not_called()
    # token attribution flows via update(usage_details={input,output,total}).
    gen.update.assert_called_once()
    usage_details = gen.update.call_args.kwargs["usage_details"]
    assert "input" in usage_details
    assert "output" in usage_details
    assert "total" in usage_details


@pytest.mark.asyncio
async def test_jury_codex_emits_langfuse_generation(monkeypatch):
    """jury_activity emits a Langfuse generation per codex panel call using the
    langfuse 4.2.0 propagate_attributes + start_as_current_observation API."""
    langfuse_client, gen, propagate_calls, _fake_propagate = _make_langfuse_mocks()

    # _invoke_codex_panel is the off-thread codex call; stub it so no subprocess fires.
    def _fake_panel(panel_id, *, prompt, model):
        return {
            "panel_id": panel_id,
            "verdict": "APPROVE",
            "confidence": 0.91,
            "rationale": "looks good",
        }

    monkeypatch.setattr("langfuse.Langfuse", MagicMock(return_value=langfuse_client))
    monkeypatch.setattr("langfuse.propagate_attributes", _fake_propagate)
    monkeypatch.setattr("agents.jury_activity._invoke_codex_panel", _fake_panel)

    from agents.jury_activity import run_jury_panel

    await run_jury_panel(
        conversation_id="conv-test-r3-d5-o2-jury",
        task_artifact={"role": "assistant", "content": "draft answer"},
        panel_id="codex-panel-1",
    )

    # session correlation + v4 generation opened as the current span.
    assert propagate_calls.get("session_id") == "conv-test-r3-d5-o2-jury"
    langfuse_client.start_as_current_observation.assert_called()
    saco_kwargs = langfuse_client.start_as_current_observation.call_args.kwargs
    assert saco_kwargs.get("as_type") == "generation"
    langfuse_client.start_observation.assert_not_called()
    # token attribution: model + full usage_details (input/output/total) captured via
    # update — hard-pinned to match production (jury_activity.py usage.input/output/total)
    # and the routine-LLM test's contract (codex ship-gate r3 P1-3 closure).
    update_kwargs = gen.update.call_args.kwargs
    assert update_kwargs.get("model")
    usage_details = update_kwargs["usage_details"]
    assert "input" in usage_details
    assert "output" in usage_details
    assert "total" in usage_details
