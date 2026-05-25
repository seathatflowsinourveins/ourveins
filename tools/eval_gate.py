# tools/eval_gate.py
"""W375 commit-msg eval-regression gate per spec §15 v6 + §17 + V11.

Invoked by pre-commit's commit-msg hook (cr6-w375-eval-regression). Reads the
commit message file, checks for OVERRIDE-W375-EVAL trailer (bypass), else
compares the SWE-Bench-Verified-50 score in the evidence file against the
threshold (5pp band; ramps to p10(last_5) after >=5 ships per V11+codex r5 P2-2).

Exit codes:
- 0 = pass (score >= threshold OR override-bypass OR no-evidence bootstrap)
- 2 = BLOCK (score below threshold + no override)
- 3 = usage error (bad args, missing file)

Test-mode env knobs (for unit tests; do NOT use in real commits):
- W375_EVAL_TEST_SCORE      -- override the score that would normally come from the evidence file
- W375_EVAL_TEST_LAST_SHIP  -- override the last-ship-score that would normally come from history
"""

from __future__ import annotations

import argparse
import json
import os
import sys
from pathlib import Path

EVIDENCE_PATH = Path("docs/architecture/W375-EVAL-RESULTS/last-ship-evidence.md")
SHIP_HISTORY_PATH = Path("docs/architecture/W375-EVAL-RESULTS/ship-history.jsonl")
DELTA_PP_THRESHOLD = 0.05  # 5pp band per spec §17


def _has_override_trailer(msg: str) -> tuple[bool, str]:
    for line in msg.splitlines():
        line = line.strip()
        if line.startswith("OVERRIDE-W375-EVAL:"):
            rationale = line.split(":", 1)[1].strip()
            return True, rationale
    return False, ""


def _read_current_score() -> float | None:
    """Read current ship-gate score from environment override OR evidence file."""
    env_override = os.environ.get("W375_EVAL_TEST_SCORE")
    if env_override is not None:
        return float(env_override)
    if not EVIDENCE_PATH.exists():
        return None
    txt = EVIDENCE_PATH.read_text(encoding="utf-8")
    # Look for a line like "resolved_pct: 0.68"
    for line in txt.splitlines():
        line = line.strip()
        if line.startswith("resolved_pct:") or line.startswith("score:"):
            try:
                return float(line.split(":", 1)[1].strip().rstrip("%"))
            except ValueError:
                continue
    return None


def _read_last_ship_score() -> float | None:
    """Read the most recent ship-gate score from history JSONL OR env override."""
    env_override = os.environ.get("W375_EVAL_TEST_LAST_SHIP")
    if env_override is not None:
        return float(env_override)
    if not SHIP_HISTORY_PATH.exists():
        return None
    rows = []
    for line in SHIP_HISTORY_PATH.read_text(encoding="utf-8").splitlines():
        line = line.strip()
        if not line:
            continue
        try:
            row = json.loads(line)
            if "score" in row:
                rows.append(row)
        except json.JSONDecodeError:
            continue
    if not rows:
        return None
    # Most recent by file order (assume chronological append)
    return float(rows[-1].get("score", 0))


def _compute_threshold(last_ship: float | None) -> float:
    """Compute pass threshold: 5pp band (V11 simple path).

    p10(last_5) ramp (post-5-ships) deferred to follow-up — requires
    full ship-history walker.
    """
    if last_ship is None:
        return 0.0  # No history -> bootstrap; any score passes
    return last_ship - DELTA_PP_THRESHOLD


def main() -> int:
    parser = argparse.ArgumentParser(
        description="W375 commit-msg eval-regression gate (cr6-w375-eval-regression hook)."
    )
    parser.add_argument(
        "--commit-msg-file",
        required=True,
        help="Path to the commit message file passed by pre-commit commit-msg hook.",
    )
    args = parser.parse_args()

    msg_path = Path(args.commit_msg_file)
    if not msg_path.exists():
        print(f"ERROR: commit-msg file not found: {msg_path}", file=sys.stderr)
        return 3

    msg = msg_path.read_text(encoding="utf-8")

    # 1. Check override trailer
    has_override, rationale = _has_override_trailer(msg)
    if has_override:
        print(
            f"PASS (OVERRIDE-W375-EVAL trailer present: {rationale[:80]})",
            file=sys.stderr,
        )
        return 0

    # 2. Read scores
    current = _read_current_score()
    last_ship = _read_last_ship_score()

    # 3. Bootstrap path: no evidence + no history -> PASS
    if current is None and last_ship is None:
        print(
            "PASS (bootstrap: no ship-history yet, no evidence file)", file=sys.stderr
        )
        return 0

    # 4. Have current evidence but no history -> PASS (records the first score)
    if last_ship is None:
        print(f"PASS (first ship: current={current})", file=sys.stderr)
        return 0

    # 5. Have history but no current evidence -> BLOCK
    #    (operator must run `w375 ship` to produce evidence)
    if current is None:
        print(
            f"BLOCK: No current ship-evidence at {EVIDENCE_PATH}. "
            "Run `w375 ship` first, or add "
            "`OVERRIDE-W375-EVAL: <rationale>` trailer to bypass.",
            file=sys.stderr,
        )
        return 2

    # 6. Score-regression check
    threshold = _compute_threshold(last_ship)
    if current < threshold:
        print(
            f"BLOCK: W375 ship-gate score regression. current={current:.4f} "
            f"< threshold={threshold:.4f} (last_ship={last_ship:.4f}, "
            f"delta_pp={DELTA_PP_THRESHOLD * 100:.0f}pp). Bypass with "
            "`OVERRIDE-W375-EVAL: <rationale>` trailer.",
            file=sys.stderr,
        )
        return 2

    print(
        f"PASS (current={current:.4f} >= threshold={threshold:.4f}, "
        f"last_ship={last_ship:.4f})",
        file=sys.stderr,
    )
    return 0


if __name__ == "__main__":
    sys.exit(main())
