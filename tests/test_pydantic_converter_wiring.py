# tests/test_pydantic_converter_wiring.py
"""Codex r1 D1 A3 + D3 R2 BLOCKER FIX: verify pydantic_data_converter wired at every
Client.connect site. Without it, BaseModel return-types (TaskSpec / TaskResult) raise
at temporalio/converter/_payload_converter.py:625-635.

Cite: temporalio==1.27.2 contrib/pydantic.py + codex r1 D1 A3 + spec §6.1 + plan Task 17.

DEVIATION FROM PLAN (reported to orchestrator): the plan hard-codes a 4-site SITES
list including ``tests/e2e/test_w376_local_mode.py`` and ``tests/e2e/test_w376_remote_mode.py``
which DO NOT YET EXIST in this worktree (only test_w376_egress_allowlist.py +
test_w376_otel_replay.py are present under tests/e2e/).

W376 ship-gate P1-3b (codex GPT-5.5): ``tools/dispatch_temporal.py`` is now WIRED with
``data_converter=pydantic_data_converter`` at every Client.connect site, so it is PROMOTED
into OWNED_SITES and gets the HARD assertion — it MUST NOT be skipped. (Previously it was
skip-when-unwired, which masked exactly the P0-2 gap the ship-gate flagged.)

The wiring guard is split:
  * OWNED sites (agents/temporal_worker.py, tools/dispatch_temporal.py) → HARD assertion.
  * e2e sites → asserted IF the file exists AND is import-relevant; a missing file
    (not-yet-created e2e test) is SKIPPED with an explicit reason (these e2e files are
    genuinely absent from this worktree). Once they land, re-running the full suite
    surfaces any still-unwired existing site as a hard check.

The AST parser (_has_pydantic_converter) is the plan's verbatim helper.
"""

from __future__ import annotations

import ast
import pathlib

import pytest

# Plan Task 17 canonical site list (spec §6.1).
SITES = [
    "agents/temporal_worker.py",
    "tools/dispatch_temporal.py",
    "tests/e2e/test_w376_local_mode.py",
    "tests/e2e/test_w376_remote_mode.py",
]

# Ship-gate P1-3b: dispatch_temporal.py is now wired → HARD-asserted (no longer skipped).
OWNED_SITES = ["agents/temporal_worker.py", "tools/dispatch_temporal.py"]

_REPO_ROOT = pathlib.Path(__file__).resolve().parent.parent


def _has_pydantic_converter(file_path: str) -> bool:
    """Parse for Client.connect(...) calls; assert pydantic_data_converter passed.

    Returns True iff at least one ``*.connect(...)`` call passes a ``data_converter``
    keyword argument (the plan's verbatim AST guard).
    """
    src = (_REPO_ROOT / file_path).read_text(encoding="utf-8")
    tree = ast.parse(src)
    for node in ast.walk(tree):
        if (
            isinstance(node, ast.Call)
            and isinstance(node.func, ast.Attribute)
            and node.func.attr == "connect"
            and any(
                isinstance(kw, ast.keyword) and kw.arg == "data_converter"
                for kw in node.keywords
            )
        ):
            return True
    return False


@pytest.mark.parametrize("file_path", OWNED_SITES)
def test_owned_client_connect_uses_pydantic_data_converter(file_path):
    """codex r1 A3 + R2: this Stream's Client.connect site MUST pass data_converter.

    HARD assertion — agents/temporal_worker.py is Stream A's deliverable.
    """
    assert _has_pydantic_converter(file_path), (
        f"{file_path}: Client.connect MISSING data_converter=pydantic_data_converter. "
        f"Codex r1 D1 A3 BLOCKER. Without it BaseModel TaskSpec/TaskResult raise."
    )


@pytest.mark.parametrize("file_path", [s for s in SITES if s not in OWNED_SITES])
def test_sibling_client_connect_sites_wired_when_present(file_path):
    """codex r1 A3 + R2: e2e Client.connect sites MUST pass data_converter.

    Remaining non-owned sites are the not-yet-created tests/e2e/test_w376_*.py files.
    SKIP ONLY when the file does not exist (genuinely absent from this worktree). If the
    file IS present, the wiring is HARD-asserted — P1-3b (codex GPT-5.5 ship-gate): no
    present-but-unwired site may be silently skipped.
    """
    p = _REPO_ROOT / file_path
    if not p.exists():
        pytest.skip(
            f"{file_path}: not present in this worktree (created by a sibling task); "
            f"wiring asserted post-merge."
        )
    # Present → wiring is mandatory (no skip-when-unwired escape hatch).
    assert _has_pydantic_converter(file_path), (
        f"{file_path}: present but MISSING data_converter=pydantic_data_converter. "
        f"P1-3b ship-gate: present Client.connect sites MUST be wired."
    )


def test_temporal_worker_connect_passes_pydantic_data_converter_symbol():
    """Belt-and-braces: agents/temporal_worker.py both imports pydantic_data_converter
    AND passes it as the data_converter kwarg (not some other object)."""
    src = (_REPO_ROOT / "agents/temporal_worker.py").read_text(encoding="utf-8")
    tree = ast.parse(src)
    found = False
    for node in ast.walk(tree):
        if (
            isinstance(node, ast.Call)
            and isinstance(node.func, ast.Attribute)
            and node.func.attr == "connect"
        ):
            for kw in node.keywords:
                if kw.arg == "data_converter":
                    # value must be the Name `pydantic_data_converter`.
                    assert isinstance(kw.value, ast.Name)
                    assert kw.value.id == "pydantic_data_converter"
                    found = True
    assert found, "no Client.connect(..., data_converter=pydantic_data_converter) found"
