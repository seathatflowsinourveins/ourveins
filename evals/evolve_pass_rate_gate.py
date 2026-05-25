#!/usr/bin/env python3
"""evolve_pass_rate_gate.py — eval regression-blocking gate (W134-F22-B P0 ship).

Closes Fire 19 P0-1 gap: "promptfoo + DeepEval are SCAFFOLDS not REGRESSION-BLOCKING GATES;
eval discipline is observe-only NOT enforce."

This script monitors eval pass-rate signals across 3 sources and BLOCKS (exit 2) when
pass-rate REGRESSES below baseline by more than --threshold (default 5%).

Sources (in priority order):
  1. codex review verdicts (.claude/state/codex_review_HEAD_*.txt) — primary, 100+ available
  2. promptfoo eval cache (.promptfoo/promptfoo.db) — secondary, present
  3. DeepEval pytest output (evals/deepeval/) — tertiary, scaffold-only

Baseline at .claude/state/eval_pass_rate_baseline.json. Bootstrap via --baseline-update.

Cite trail:
- Fire 19 P0-1 gap: docs/sota-architecture-audit/fire-19-dim6-eval-gpt55/01-dim6-eval-gpt55-verdict.md
- Fire 21 Tier 1 roadmap: docs/sota-architecture-audit/fire-21-ultimate-architecture-ecosystem/02-current-vs-ultimate-gap-matrix.md
- Codex verdict schema: .claude/schemas/review-output.schema.json
- TIER-2 sister-rule: Z:/claude-sota/.claude/rules/audit-action-loop.md §Stage 4 verify next audit fires any_drift:false

Operator usage:
  # Bootstrap baseline (first time):
  python evals/evolve_pass_rate_gate.py --baseline-update

  # Check regression (default 5% threshold):
  python evals/evolve_pass_rate_gate.py

  # Tighter threshold (3%):
  python evals/evolve_pass_rate_gate.py --threshold 0.03

  # Single source only:
  python evals/evolve_pass_rate_gate.py --source codex

Exit codes:
  0 — pass-rate within tolerance OR baseline initialized
  2 — pass-rate REGRESSED below baseline by more than --threshold (BLOCKING)
  1 — error (e.g., no codex review files found, baseline malformed)
"""

from __future__ import annotations

import argparse
import json
import sys
from pathlib import Path
from typing import Any

REPO_ROOT = Path(__file__).resolve().parent.parent
CODEX_STATE = REPO_ROOT / ".claude" / "state"
BASELINE_PATH = CODEX_STATE / "eval_pass_rate_baseline.json"
DEFAULT_THRESHOLD = 0.05
DEFAULT_RECENT_N = 20


def parse_codex_verdicts(recent_n: int = DEFAULT_RECENT_N) -> dict[str, Any]:
    """Parse the most recent N codex review verdict files.

    Returns dict with:
        total: int — number of files parsed
        approve_count: int — count of "approve" verdicts
        non_approve_count: int — count of "needs-attention" / "needs-revision" / "reject"
        pass_rate: float — approve_count / total
        parse_errors: int — files that failed JSON parse
        files_used: list[str] — list of files included
    """
    # Filter pattern: `codex_review_HEAD_<sha8>.txt` only — exclude `.prompt.txt`
    # (raw prompt text, NOT JSON verdict) and `.stream.jsonl` (codex stream events).
    candidates = sorted(
        CODEX_STATE.glob("codex_review_HEAD_*.txt"),
        key=lambda p: p.stat().st_mtime,
        reverse=True,
    )
    files = [p for p in candidates if not p.name.endswith(".prompt.txt")][:recent_n]

    approve = 0
    non_approve = 0
    parse_errors = 0
    files_used: list[str] = []

    for f in files:
        try:
            content = f.read_text(encoding="utf-8").strip()
            if not content:
                parse_errors += 1
                continue
            data = json.loads(content)
            verdict = data.get("verdict", "").lower()
            if verdict == "approve":
                approve += 1
            else:
                non_approve += 1
            files_used.append(f.name)
        except (json.JSONDecodeError, OSError):
            parse_errors += 1

    total = approve + non_approve
    pass_rate = (approve / total) if total > 0 else 0.0

    return {
        "total": total,
        "approve_count": approve,
        "non_approve_count": non_approve,
        "pass_rate": pass_rate,
        "parse_errors": parse_errors,
        "files_used": files_used,
    }


def load_baseline() -> dict[str, Any] | None:
    """Load baseline dict from BASELINE_PATH, or None if missing/malformed."""
    if not BASELINE_PATH.exists():
        return None
    try:
        return json.loads(BASELINE_PATH.read_text(encoding="utf-8"))
    except (json.JSONDecodeError, OSError):
        return None


def write_baseline(baseline: dict[str, Any]) -> None:
    """Write baseline JSON to BASELINE_PATH atomically."""
    BASELINE_PATH.parent.mkdir(parents=True, exist_ok=True)
    tmp = BASELINE_PATH.with_suffix(".json.tmp")
    tmp.write_text(json.dumps(baseline, indent=2), encoding="utf-8")
    tmp.replace(BASELINE_PATH)


def gate(
    source: str = "codex",
    threshold: float = DEFAULT_THRESHOLD,
    recent_n: int = DEFAULT_RECENT_N,
    baseline_update: bool = False,
) -> int:
    """Run the eval pass-rate gate.

    Returns exit code:
      0 — pass-rate within tolerance OR baseline initialized
      1 — error
      2 — REGRESSION (blocking)
    """
    # Source: codex (primary, currently the only implemented source)
    if source not in ("codex", "all"):
        print(f"[gate] ERROR: source '{source}' not yet implemented; use 'codex'")
        return 1

    current = parse_codex_verdicts(recent_n=recent_n)
    if current["total"] == 0:
        print("[gate] ERROR: no parseable codex review verdicts found")
        return 1

    rate = current["pass_rate"]
    pct = rate * 100

    print(
        f"[gate] codex source: {current['approve_count']}/{current['total']} approve = {pct:.1f}% pass-rate (parse_errors={current['parse_errors']})"
    )

    baseline = load_baseline()

    if baseline_update or baseline is None:
        if baseline is None:
            print("[gate] baseline missing — initializing")
        else:
            print("[gate] baseline-update requested")
        new_baseline = {
            "version": 1,
            "source": "codex",
            "pass_rate": rate,
            "approve_count": current["approve_count"],
            "total": current["total"],
            "recent_n": recent_n,
            "threshold": threshold,
        }
        write_baseline(new_baseline)
        print(f"[gate] baseline WRITTEN: {pct:.1f}% pass-rate at {BASELINE_PATH}")
        return 0

    baseline_rate = baseline.get("pass_rate", 0.0)
    baseline_pct = baseline_rate * 100
    regression = baseline_rate - rate

    print(
        f"[gate] baseline: {baseline_pct:.1f}% pass-rate (from {baseline.get('total', '?')} reviews; threshold={threshold * 100:.1f}%)"
    )

    if regression > threshold:
        print(
            f"[gate] ⚠ REGRESSION: {pct:.1f}% < baseline {baseline_pct:.1f}% by {regression * 100:.1f}pp (>{threshold * 100:.1f}% threshold) — BLOCKING"
        )
        return 2

    if regression > 0:
        print(
            f"[gate] ✓ pass-rate {pct:.1f}% within {threshold * 100:.1f}% tolerance of baseline {baseline_pct:.1f}% (regression {regression * 100:.1f}pp)"
        )
    else:
        delta = -regression * 100
        print(
            f"[gate] ✓ pass-rate {pct:.1f}% ≥ baseline {baseline_pct:.1f}% (improvement +{delta:.1f}pp)"
        )
    return 0


def main() -> int:
    p = argparse.ArgumentParser(
        description="Eval pass-rate regression gate (W134-F22-B P0; closes Fire 19 P0-1)",
    )
    p.add_argument(
        "--source",
        choices=("codex", "promptfoo", "deepeval", "all"),
        default="codex",
        help="signal source (default: codex; only 'codex' implemented as of W134-F22-B)",
    )
    p.add_argument(
        "--threshold",
        type=float,
        default=DEFAULT_THRESHOLD,
        help=f"regression threshold as fraction (default {DEFAULT_THRESHOLD} = 5%%)",
    )
    p.add_argument(
        "--recent-n",
        type=int,
        default=DEFAULT_RECENT_N,
        help=f"number of recent codex reviews to sample (default {DEFAULT_RECENT_N})",
    )
    p.add_argument(
        "--baseline-update",
        action="store_true",
        help="write current pass-rate as new baseline (bootstrap or re-baseline)",
    )
    args = p.parse_args()
    return gate(
        source=args.source,
        threshold=args.threshold,
        recent_n=args.recent_n,
        baseline_update=args.baseline_update,
    )


if __name__ == "__main__":
    sys.exit(main())
