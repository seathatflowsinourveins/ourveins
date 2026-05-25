# tests/test_eval_gate.py
import subprocess
import sys
import pathlib


def _run_gate(
    commit_msg: str,
    evidence_score: float | None = None,
    last_ship_score: float | None = None,
    tmp_path=None,
) -> tuple[int, str, str]:
    """Helper: invoke tools/eval_gate as subprocess with a temp commit-msg file."""
    import os

    msg_file = tmp_path / "msg.txt"
    msg_file.write_text(commit_msg, encoding="utf-8")

    env = os.environ.copy()
    if evidence_score is not None:
        env["W375_EVAL_TEST_SCORE"] = str(evidence_score)
    if last_ship_score is not None:
        env["W375_EVAL_TEST_LAST_SHIP"] = str(last_ship_score)

    cwd = pathlib.Path(__file__).resolve().parent.parent  # W375 worktree root
    r = subprocess.run(
        [sys.executable, "-m", "tools.eval_gate", "--commit-msg-file", str(msg_file)],
        capture_output=True,
        text=True,
        env=env,
        cwd=str(cwd),
        timeout=15,
    )
    return r.returncode, r.stdout, r.stderr


def test_override_trailer_allows_pass(tmp_path):
    """OVERRIDE-W375-EVAL trailer always passes regardless of score."""
    msg = """feat(W375): some change

bla bla

OVERRIDE-W375-EVAL: bootstrap commit, no eval data yet
Codex-Verdict: APPROVE
"""
    rc, out, err = _run_gate(msg, tmp_path=tmp_path)
    assert rc == 0, f"override should pass, got rc={rc}, err={err}"


def test_score_above_threshold_passes(tmp_path):
    """Score equals or above threshold passes."""
    msg = "feat(W375): regular commit\n\nCodex-Verdict: APPROVE"
    rc, out, err = _run_gate(
        msg, evidence_score=0.68, last_ship_score=0.68, tmp_path=tmp_path
    )
    assert rc == 0, f"score above threshold should pass: rc={rc}, err={err}"


def test_score_below_threshold_blocks(tmp_path):
    """Score >5pp below last_ship blocks the commit."""
    msg = "feat(W375): regression\n\nCodex-Verdict: APPROVE"
    # last_ship=0.68, score=0.50 → delta -18pp → block
    rc, out, err = _run_gate(
        msg, evidence_score=0.50, last_ship_score=0.68, tmp_path=tmp_path
    )
    assert rc != 0
    assert "BLOCK" in (out + err).upper() or "OVERRIDE" in (out + err).upper()


def test_no_evidence_no_last_ship_passes(tmp_path):
    """First commit / no history → gate passes (bootstrap mode)."""
    msg = "feat(W375): bootstrap\n\nCodex-Verdict: APPROVE"
    rc, out, err = _run_gate(msg, tmp_path=tmp_path)
    # In bootstrap (no evidence + no last_ship), default behavior is PASS
    # (the gate doesn't fire when there's nothing to compare to)
    assert rc == 0, f"bootstrap should pass: rc={rc}, err={err}"


def test_missing_msg_file_fails(tmp_path):
    """No --commit-msg-file arg → exit non-zero with usage error."""
    cwd = pathlib.Path(__file__).resolve().parent.parent
    r = subprocess.run(
        [sys.executable, "-m", "tools.eval_gate"],
        capture_output=True,
        text=True,
        cwd=str(cwd),
        timeout=10,
    )
    assert r.returncode != 0
