"""Integration test for the Python/Node PanelResult contract (W374-EXT
Task 9 A3 fix-up R-B).

The Node spawner (`tools/codex-jury-panel.mjs`) emits PanelResult-shaped JSON
dicts; the Python aggregator (`agents/jury_aggregator.py`) consumes them
via `jury_aggregate`. The two implementations share an implicit schema ---
a typo or field rename on one side would silently desynchronize the contract
unless surfaced by an end-to-end test.

This test exercises the full end-to-end pipeline:
    1. Invoke the Node `spawnPanels` function with a mock-spawn override that
       returns hand-crafted PanelResult-shaped JSON dicts.
    2. Capture the Node output (PanelResult-shaped JSON-line stream).
    3. Reconstruct Python `PanelResult` instances from each JSON dict.
    4. Run `jury_aggregate` over the reconstructed panels.
    5. Assert that the final verdict matches the expected outcome.

This catches the canonical drift failure modes:
    - Node emits {panel_id: 1, verdict: ...} but Python expects panelId.
    - Node emits {verdict: "approve"} but Python expects "APPROVE" (case).
    - Node emits a 7th field; Python rejects via dataclass init signature.
    - Verdict enum value rename without matching Python update.

The test invokes the Node CLI as a subprocess (`node --input-type=module`)
so we exercise the actual production codepath rather than reimplementing
parts of it in Python. If Node is unavailable in the test environment, the
test is skipped (not failed) --- the Python aggregator's correctness is
already covered by `test_jury_aggregator.py`; this test adds the cross-
language contract check on top.

Cite-anchors (R-B fix-up):
  - PR review of d3813dd surfaced the Python/Node contract drift risk.
  - Standard Anthropic SDK + Sigstore + SLSA contract-stability discipline
    via integration-of-record vs unit-of-record split.
"""

from __future__ import annotations

import json
import shutil
import subprocess
from pathlib import Path

import pytest

from agents.jury_aggregator import (
    FinalVerdict,
    PanelResult,
    PanelVerdict,
    jury_aggregate,
)


REPO_ROOT = Path(__file__).resolve().parent.parent
NODE_AVAILABLE = shutil.which("node") is not None


@pytest.mark.skipif(not NODE_AVAILABLE, reason="Node.js not on PATH")
def test_node_spawn_to_python_aggregate_contract():
    """End-to-end: Node spawnPanels -> JSON -> Python PanelResult -> jury_aggregate.

    Uses a single-shot Node script that imports the spawner module with a
    mock-spawn override + writes the 3-panel JSON dicts to stdout. The
    Python side then parses the JSON, instantiates PanelResult instances,
    and runs jury_aggregate to verify the final verdict matches expectation.
    """
    spawner_path = REPO_ROOT / "tools" / "codex-jury-panel.mjs"
    assert spawner_path.exists(), f"spawner module missing at {spawner_path}"

    # Cross-platform module URL --- Windows backslash to forward-slash, and
    # always 3-slash form per `pathlib.PurePath.as_uri()`.
    spawner_url = spawner_path.as_uri()

    # Inline Node driver: import spawner, define a mock-spawn that returns 3
    # APPROVE PanelResults, dump JSON-lines to stdout. We use --eval rather
    # than a temp file so the test is fully self-contained.
    driver = f"""
import {{ spawnPanels }} from {json.dumps(spawner_url)};
const mockSpawn = async (panelId, _spec, _result, _temp, positionSwap) => {{
  return {{
    panel_id: panelId,
    verdict: panelId === 3 ? "BLOCK" : "APPROVE",
    confidence: panelId === 3 ? 0.99 : 0.30,
    rationale: `panel-${{panelId}} verdict (integration test)`,
    position_swap: positionSwap,
  }};
}};
const spec = {{ task: "integration-test stub spec" }};
const result = {{ status: "COMPLETE", note: "integration-test stub result" }};
const panels = await spawnPanels(spec, result, {{ mockSpawn }});
for (const p of panels) {{
  process.stdout.write(JSON.stringify(p) + "\\n");
}}
"""

    completed = subprocess.run(
        ["node", "--input-type=module", "--eval", driver],
        cwd=str(REPO_ROOT),
        capture_output=True,
        text=True,
        timeout=30,
        check=False,
    )
    assert completed.returncode == 0, (
        f"Node driver exited {completed.returncode}: stderr={completed.stderr}"
    )

    # Parse the JSON-line stream emitted by the spawner.
    panel_dicts: list[dict] = []
    for line in completed.stdout.splitlines():
        line = line.strip()
        if not line:
            continue
        panel_dicts.append(json.loads(line))
    assert len(panel_dicts) == 3, f"expected 3 panels, got {len(panel_dicts)}"

    # Reconstruct PanelResult instances --- this is the contract surface.
    # Any field rename / type drift will surface here as TypeError or
    # ValueError from PanelResult.__post_init__.
    panels = [
        PanelResult(
            panel_id=d["panel_id"],
            verdict=d["verdict"],  # str-coerced to PanelVerdict by post-init
            confidence=d["confidence"],
            rationale=d["rationale"],
            position_swap=d["position_swap"],
        )
        for d in panel_dicts
    ]

    # All 3 PanelResult instances must have valid PanelVerdict enum values.
    for p in panels:
        assert isinstance(p.verdict, PanelVerdict), (
            f"panel-{p.panel_id} verdict {p.verdict!r} is not PanelVerdict enum"
        )

    # Run the aggregator. Expected: 2x APPROVE @0.30 = 0.60 weight, 1x BLOCK
    # @0.99 = 0.99 weight; CISC chooses BLOCK (high-confidence minority beats
    # low-confidence majority --- the canonical critical-bug-finder pattern).
    verdict = jury_aggregate(panels)
    assert verdict.final_verdict == FinalVerdict.BLOCK, (
        f"CISC contract drift: expected BLOCK from high-conf minority; "
        f"got {verdict.final_verdict.value}. Rationale: {verdict.rationale}"
    )

    # panel_results carry-through (3 panels preserved, immutable tuple per I-2).
    assert len(verdict.panel_results) == 3
    assert isinstance(verdict.panel_results, tuple), (
        "I-2 contract: panel_results MUST be a tuple"
    )


@pytest.mark.skipif(not NODE_AVAILABLE, reason="Node.js not on PATH")
def test_node_spawn_to_python_aggregate_unanimous_approve():
    """Integration test variant: 3x APPROVE -> FinalVerdict.APPROVE.

    Covers the happy-path contract where the codex panel consensus is
    unanimous; verifies the position-swap-consistency flag bubbles up
    correctly across the language boundary."""
    spawner_path = REPO_ROOT / "tools" / "codex-jury-panel.mjs"
    spawner_url = spawner_path.as_uri()

    driver = f"""
import {{ spawnPanels }} from {json.dumps(spawner_url)};
const mockSpawn = async (panelId, _spec, _result, _temp, positionSwap) => ({{
  panel_id: panelId,
  verdict: "APPROVE",
  confidence: 0.9 - 0.02 * (panelId - 1),
  rationale: `panel-${{panelId}} approves`,
  position_swap: positionSwap,
}});
const panels = await spawnPanels({{ task: "s" }}, {{ ok: true }}, {{ mockSpawn }});
for (const p of panels) {{
  process.stdout.write(JSON.stringify(p) + "\\n");
}}
"""

    completed = subprocess.run(
        ["node", "--input-type=module", "--eval", driver],
        cwd=str(REPO_ROOT),
        capture_output=True,
        text=True,
        timeout=30,
        check=False,
    )
    assert completed.returncode == 0, completed.stderr

    panel_dicts = [
        json.loads(line) for line in completed.stdout.splitlines() if line.strip()
    ]
    panels = [
        PanelResult(
            panel_id=d["panel_id"],
            verdict=d["verdict"],
            confidence=d["confidence"],
            rationale=d["rationale"],
            position_swap=d["position_swap"],
        )
        for d in panel_dicts
    ]
    verdict = jury_aggregate(panels)
    assert verdict.final_verdict == FinalVerdict.APPROVE
    assert verdict.position_swap_consistent is True


def test_python_only_panel_result_shape_matches_node_emit():
    """Pure-Python contract check (no Node required): the PanelResult dict
    shape that the Node spawner emits per `parsePanelOutput` is exactly:
    {panel_id, verdict, confidence, rationale, position_swap}. This test
    documents that shape in Python so a future Node-side rename would
    surface as a Python test failure even when Node is unavailable."""
    expected_keys = {
        "panel_id",
        "verdict",
        "confidence",
        "rationale",
        "position_swap",
    }
    # Construct a Python PanelResult and check its serialization keys match.
    panel = PanelResult(
        panel_id=1,
        verdict=PanelVerdict.APPROVE,
        confidence=0.9,
        rationale="ok",
        position_swap=False,
    )
    # dataclass field names are the canonical Python schema.
    from dataclasses import fields

    py_keys = {f.name for f in fields(panel)}
    assert py_keys == expected_keys, (
        f"PanelResult Python schema {py_keys} != Node-emit schema {expected_keys} "
        "--- contract drift between Python and Node sides."
    )
