# tests/test_jury_activity_parallel.py
"""codex r2 D4-P1: L3 jury MUST dispatch panels in parallel via asyncio.gather.

Also covers W376 PHASE D P1-1 (codex ship-gate): the jury Langfuse generation MUST
correlate the session via the langfuse-native ``propagate_attributes(session_id=...)``
context manager, NOT ``metadata={"session_id": ...}`` (arbitrary metadata keys are not
indexed for session-level token/cost rollups in langfuse 4.2.0).
"""

import time
from contextlib import contextmanager
from unittest.mock import MagicMock

import pytest

from agents.jury_activity import run_l3_jury, run_jury_panel


@pytest.mark.asyncio
async def test_l3_jury_panels_dispatched_in_parallel(monkeypatch):
    """3 panels × 1s simulated work → MUST complete < 1.5s (proves parallelism)."""
    sleep_per_panel = 1.0

    def slow_panel(panel_id: str, **kwargs) -> dict:
        time.sleep(sleep_per_panel)
        return {"panel_id": panel_id, "verdict": "APPROVE", "confidence": 0.91}

    monkeypatch.setattr("agents.jury_activity._invoke_codex_panel", slow_panel)

    t0 = time.monotonic()
    verdicts = await run_l3_jury(panels=["P1", "P2", "P3"], prompt="x", model="x")
    elapsed = time.monotonic() - t0
    assert len(verdicts) == 3
    assert elapsed < 1.5, (
        f"3 panels at 1s each MUST finish in <1.5s if parallel; got {elapsed:.2f}s"
    )


@pytest.mark.asyncio
async def test_l3_jury_ambiguous_verdict_load(monkeypatch):
    """Ambiguous (split) verdicts MUST aggregate without serializing extra rounds."""
    verdicts_seq = iter(
        [
            {"verdict": "APPROVE", "confidence": 0.91},
            {"verdict": "BLOCK", "confidence": 0.88},
            {"verdict": "APPROVE", "confidence": 0.85},
        ]
    )
    monkeypatch.setattr(
        "agents.jury_activity._invoke_codex_panel",
        lambda panel_id, **kw: next(verdicts_seq),
    )
    t0 = time.monotonic()
    verdicts = await run_l3_jury(panels=["P1", "P2", "P3"], prompt="x", model="x")
    assert time.monotonic() - t0 < 0.5  # all 3 dispatched concurrently → fast
    approve = sum(1 for v in verdicts if v["verdict"] == "APPROVE")
    assert approve == 2  # 2/3 majority


# ============================================================
# W376 PHASE D P1-1 — jury Langfuse session correlation (codex ship-gate)
# ============================================================


@pytest.mark.asyncio
async def test_run_jury_panel_propagates_session_via_langfuse_native_api(monkeypatch):
    """P1-1: run_jury_panel MUST set the session via the langfuse-native
    ``propagate_attributes(session_id=conversation_id)`` context manager (and open the
    generation as the current span inside it), NOT ``metadata={"session_id": ...}``.

    The langfuse import is LAZY (``from langfuse import Langfuse`` inside run_jury_panel;
    ``from langfuse import propagate_attributes`` inside _emit_jury_generation), so we
    patch the symbols on the ``langfuse`` package — that is the resolution target for
    a function-local ``from langfuse import X``.
    """
    conversation_id = "conv-jury-p11"

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

    # --- panel returns a deterministic verdict ----------------------------------
    monkeypatch.setattr(
        "agents.jury_activity._invoke_codex_panel",
        lambda panel_id, **kw: {
            "panel_id": panel_id,
            "verdict": "APPROVE",
            "confidence": 0.91,
            "rationale": "ok",
        },
    )

    out = await run_jury_panel(
        conversation_id=conversation_id,
        task_artifact={"diff": "x"},
        panel_id="P1",
    )
    assert out["verdict"] == "APPROVE"

    # P1-1 CONTRACT: session propagated via the native context manager.
    assert propagate_calls.get("session_id") == conversation_id

    # The generation is opened as the CURRENT span (so the propagated session attr
    # attaches), NOT via the detached start_observation; and session_id is NOT
    # smuggled through metadata.
    langfuse_client.start_as_current_observation.assert_called_once()
    saco_kwargs = langfuse_client.start_as_current_observation.call_args.kwargs
    assert saco_kwargs.get("as_type") == "generation"
    assert "session_id" not in (saco_kwargs.get("metadata") or {})
    # The deprecated detached start_observation path must NOT be used.
    langfuse_client.start_observation.assert_not_called()


@pytest.mark.asyncio
async def test_run_jury_panel_rejects_empty_conversation_id():
    """codex r5 D5-O2 regression preserved: empty conversation_id is a hard error
    (an empty session id breaks Langfuse session correlation)."""
    with pytest.raises(ValueError, match="conversation_id required"):
        await run_jury_panel(
            conversation_id="",
            task_artifact={"diff": "x"},
            panel_id="P1",
        )
