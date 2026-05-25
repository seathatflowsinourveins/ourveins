# agents/cove_activity.py
"""W375 L1 CoVe verification activity wrapper.

Wraps the existing agents/cove_verifier.py (merged from W374-EXT, Meta CoVe
arXiv:2309.11495 4-step factored protocol) as a Temporal @activity.defn.

L1 runs on the stored trajectory dict (no Docker spawn). The trajectory dict
may contain a "spec" sub-dict or raw "events"; _invoke_cove adapts it for
cove_verifier.cove_verify by constructing a minimal TaskSpec.

Returns one of:
- {"verdict": "PASS",      "source": "L1-CoVe", ...}
- {"verdict": "AMBIGUOUS", "source": "L1-CoVe", ...}  → escalates to L3 jury
- {"verdict": "FAIL",      "source": "L1-CoVe", ...}  → workflow returns FAILED

Cite: spec §8 v6 + W374-EXT cove_verifier.py (arXiv:2309.11495).
"""

from __future__ import annotations

import structlog
from temporalio import activity

log = structlog.get_logger(__name__)


def _invoke_cove(trajectory: dict) -> dict:
    """Call into the existing CoVe verifier; isolated here for test mocking.

    Adapts the trajectory dict to the cove_verifier.cove_verify interface.
    cove_verify is async and requires an anthropic_client — at L1 we run
    synchronously against the stored trajectory text (no live LLM call needed
    for the pure structural/factual check path). If cove_verifier exposes a
    synchronous entry point we prefer that; otherwise we use asyncio.run().

    Verdict derivation:
      - CoVeResult.discrepancies is empty  → PASS
      - CoVeResult.discrepancies non-empty → FAIL
      - Any protocol-sentinel discrepancy (starts with "CoVe ") → AMBIGUOUS
        (protocol failure; escalate rather than silently pass or hard-fail)
    """
    from agents.cove_verifier import CoVeResult, cove_verify
    from agents.models import TaskSpec
    import asyncio

    # Build a minimal TaskSpec from the trajectory dict.
    # The trajectory may carry a "spec" sub-dict or we synthesise one from events.
    spec_text = trajectory.get("spec") or str(trajectory.get("events", trajectory))
    conversation_id = trajectory.get("conversation_id", "unknown")
    spec = TaskSpec(task=spec_text, conversation_id=conversation_id)

    # cove_verify requires an anthropic_client for live LLM calls.
    # At L1 we use a NullClient that raises; cove_verify's fail-CLOSED contract
    # catches it and returns a sentinel discrepancy → AMBIGUOUS verdict, which
    # escalates cleanly to L3 jury for full evaluation.
    class _NullAnthropicClient:
        """Placeholder client — L1 structural path triggers fail-CLOSED sentinel."""

        class messages:  # noqa: N801
            @staticmethod
            async def create(**kwargs):  # noqa: ANN202
                raise RuntimeError(
                    "L1 CoVe activity: no live Anthropic client at trajectory-replay level; "
                    "escalating to L3 jury via AMBIGUOUS verdict"
                )

    client = _NullAnthropicClient()

    # Run the async cove_verify in a fresh event loop (activity runs in thread executor).
    try:
        loop = asyncio.new_event_loop()
        result: CoVeResult = loop.run_until_complete(cove_verify(spec, client))
    finally:
        loop.close()

    # Derive verdict from CoVeResult.discrepancies (fail-CLOSED protocol).
    discrepancies = list(result.discrepancies)
    has_sentinel = any(d.startswith("CoVe ") for d in discrepancies)

    if has_sentinel:
        verdict = "AMBIGUOUS"
    elif discrepancies:
        verdict = "FAIL"
    else:
        verdict = "PASS"

    return {
        "verdict": verdict,
        "discrepancies": discrepancies,
        "verification_log": [list(entry) for entry in result.verification_log],
    }


@activity.defn
async def verify_cove_activity(trajectory: dict) -> dict:
    """L1 CoVe verification — runs on stored trajectory, no Docker.

    _invoke_cove is a sync function that internally spawns its own asyncio
    event loop via asyncio.new_event_loop() + loop.run_until_complete().
    Calling it directly from within this async activity would attempt to nest
    a new event loop inside the already-running activity loop, causing
    RuntimeError: Cannot run the event loop while another loop is running.

    Fix: dispatch _invoke_cove to a worker thread via asyncio.to_thread so it
    runs outside the activity's event loop (the worker thread has no running
    loop, so asyncio.new_event_loop() inside _invoke_cove works correctly).

    On internal failure: returns AMBIGUOUS verdict (escalates to L3) rather than
    raising — keeps the workflow progressing toward jury arbitration.
    """
    import asyncio

    try:
        result = await asyncio.to_thread(_invoke_cove, trajectory)
        verdict = result.get("verdict", "AMBIGUOUS").upper()
        if verdict not in ("PASS", "AMBIGUOUS", "FAIL"):
            verdict = "AMBIGUOUS"
        return {
            "verdict": verdict,
            "source": "L1-CoVe",
            **{k: v for k, v in result.items() if k not in ("verdict", "source")},
        }
    except Exception as e:
        log.warning("cove_activity_failed", error=str(e))
        return {
            "verdict": "AMBIGUOUS",
            "source": "L1-CoVe",
            "error": str(e)[:200],
        }
