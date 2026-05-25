#!/usr/bin/env python3
# Reference: W286d Section C.1 (eval-harness 8th rubric dimension) —
#   docs/architecture/W286d-RESEARCH-ARCH-EVOLUTION-2026-05-18.md:70-80
# Reference: goal-prompt-synthesis Phase-2 harness-fit axis —
#   .claude/skills/goal-prompt-synthesis/SKILL.md:27-36 (autonomous-loop +
#   Claude-Code-native + Windows-portable + cardinal-rule-2-compliant).
# Reference: TIER-1 OFFICIAL inspect_ai 0.3.205 Task / EvalLog API + harness/eval_harness.py
#   `run_inspect_lane()` (the lane this module mirrors for the SOTA-rubric dimension).
#
# W288-P2-C1 — sota_rubric_lane.py
# --------------------------------
# Implements the 8th rubric dimension `eval_pass` proposed in W286d Section C.1:
# given a candidate (slug + optional smoke-test path) the lane runs the smoke test
# in the runtime's eval harness and returns a 0-5 numeric score that plugs into
# `sota-convergence-audit/SKILL.md` Step 4's 7-dim rubric.
#
# Scoring contract (0-5 ints; the audit rubric is 1-5 with N/A handling):
#   0   the smoke test crashed (lane-init / unexpected exception); blocks ADOPT.
#   1   smoke test ran but every case failed.
#   2   1-25% of cases passed.
#   3   26-50% of cases passed.
#   4   51-89% of cases passed.
#   5   >=90% of cases passed (the "no regression" bar).
# "N/A" is returned (as the string sentinel "N/A") for non-executable candidates
# — skill SKILLs, doc-only repos, awesome-list patterns. Per W286d C.1: N/A
# candidates are EXCLUDED from score_min / score_mean computation (the audit
# already supports per-dim N/A in v2 via the typed-evidence carve-out shape).
#
# Module is OFFLINE-SAFE (deterministic, zero API spend) by default — the
# fake-mode smoke test is a pure-function pass that always returns the same
# rows. The real-mode smoke test path is opt-in (`smoke_test_path` points at a
# Python file that exposes `run() -> list[dict]`); if the file is absent or
# cannot be imported the lane returns N/A + a recorded reason.

from __future__ import annotations

import importlib.util
import json
import os
from dataclasses import dataclass
from pathlib import Path
from typing import Any

# Carve-out: candidate kinds that are inherently non-executable. The lane returns
# N/A for these — per W286d C.1 "non-executable candidates ... scored N/A and
# excluded from score_min/score_mean". The audit caller passes the kind string.
NON_EXECUTABLE_KINDS = frozenset(
    {
        "doc-only",  # awesome-list inclusion, blog post, README pattern
        "skill",  # SKILL.md is prose-as-code; compliance is skill-comply territory
        "pattern",  # design pattern w/o reference impl
        "cite",  # citation-only (CCBP line range)
    }
)


@dataclass(frozen=True)
class SOTARubricResult:
    """Numeric verdict for the 8th rubric dimension `eval_pass`.

    score: int 0-5, OR the string "N/A" for non-executable candidates.
    total / passed: per-case counts from the smoke run (0/0 when N/A).
    reason: human-readable explanation surfaced into the adoption-ledger episode.
    counts_toward_score_min_mean: False iff score == "N/A" (audit excludes).
    """

    candidate: str
    score: int | str
    total: int
    passed: int
    reason: str
    counts_toward_score_min_mean: bool


def _bucket_score(pass_rate: float, total: int) -> int:
    """Map a pass-rate to the 0-5 integer score band.

    `total == 0` collapses to 0 (lane ran but produced no rows -> treat as crash).
    """
    if total == 0:
        return 0
    if pass_rate >= 0.90:
        return 5
    if pass_rate >= 0.51:
        return 4
    if pass_rate >= 0.26:
        return 3
    if pass_rate >= 0.01:
        return 2
    return 1


def _import_smoke_module(smoke_test_path: Path) -> Any | None:
    """Import a smoke-test file by path; return its module or None on failure.

    SECURITY (W288-fix7, codex round-7 HIGH-2): smoke modules execute IN
    PROCESS with full repo/credential/env access. To mitigate the
    'adoption gate becomes execution sink' risk, this loader restricts
    smoke_test_path to the harness/fixtures/ tree by default. Loading
    smoke modules from elsewhere requires the explicit env-var
    SOTA_ALLOW_UNTRUSTED_SMOKE=1 (NOT a CLI flag — env-var bar prevents
    accidental opt-in via command-line auto-complete). Operator policy:
    only commit operator-curated smoke fixtures under harness/fixtures/.
    For untrusted candidate code, future hardening should subprocess-
    isolate with timeout + minimal-env per codex recommendation.
    """
    if not smoke_test_path.is_file():
        return None
    resolved = smoke_test_path.resolve()
    fixtures_root = (Path(__file__).resolve().parent / "fixtures").resolve()
    # W288-fix8 (codex round-8 HIGH): real containment check via relative_to
    # — the prior str.startswith() incorrectly accepted prefix-siblings like
    # `harness/fixtures_evil.py` (string starts with "harness/fixtures" but
    # is NOT inside harness/fixtures/). relative_to raises ValueError when
    # `resolved` is not under `fixtures_root`, which is the true containment
    # semantic we want.
    try:
        resolved.relative_to(fixtures_root)
        is_inside_fixtures = True
    except ValueError:
        is_inside_fixtures = False
    if not is_inside_fixtures:
        if os.environ.get("SOTA_ALLOW_UNTRUSTED_SMOKE") != "1":
            print(
                f"[sota-rubric] REFUSED to import smoke from outside "
                f"harness/fixtures/ ({resolved}). Set "
                f"SOTA_ALLOW_UNTRUSTED_SMOKE=1 to opt in to executing "
                f"non-curated smoke modules in-process (NOT recommended; "
                f"future W289 hardening will subprocess-isolate).",
            )
            return None
    spec = importlib.util.spec_from_file_location(
        "sota_rubric_smoke",
        smoke_test_path,
    )
    if spec is None or spec.loader is None:
        return None
    try:
        module = importlib.util.module_from_spec(spec)
        spec.loader.exec_module(module)  # type: ignore[union-attr]
        return module
    except Exception:  # noqa: BLE001 - never crash the lane
        return None


def _run_smoke_rows(module: Any) -> list[dict[str, Any]] | None:
    """Call the smoke module's `run()` -> list[dict] or `rows` attribute."""
    if hasattr(module, "run"):
        try:
            result = module.run()
            if isinstance(result, list):
                return [r for r in result if isinstance(r, dict)]
        except Exception:  # noqa: BLE001
            return None
    if hasattr(module, "rows"):
        rows = module.rows
        if isinstance(rows, list):
            return [r for r in rows if isinstance(r, dict)]
    return None


def run_sota_rubric_lane(
    candidate: str,
    smoke_test_path: str | os.PathLike[str] | None = None,
    kind: str = "executable",
) -> SOTARubricResult:
    """Run the SOTA rubric lane on a candidate; return a 0-5 score or N/A.

    Parameters
    ----------
    candidate : str
        Candidate slug — e.g. ``"langfuse-mcp"``, ``"hindsight-memory"``.
    smoke_test_path : path or None
        Optional path to a Python module exposing ``run() -> list[dict]`` where
        each dict has at least a ``"pass"`` key (bool). The harness reuses the
        same row shape as `eval_harness.py` lanes for consistency.
    kind : str
        One of NON_EXECUTABLE_KINDS or ``"executable"``. Non-executable kinds
        short-circuit to N/A per the W286d C.1 carve-out.
    """
    if kind in NON_EXECUTABLE_KINDS:
        return SOTARubricResult(
            candidate=candidate,
            score="N/A",
            total=0,
            passed=0,
            reason=(
                f"non-executable kind={kind!r} — excluded from score_min/mean "
                "per W286d C.1 carve-out (doc-only/skill/pattern/cite candidates "
                "have no harness-runnable surface)"
            ),
            counts_toward_score_min_mean=False,
        )

    if smoke_test_path is None:
        # W288-fix1 (codex round-1 HIGH): executable candidates without a
        # smoke test FAIL CLOSED (score=0, counts toward min/mean) so the
        # benchmark-not-vibes gate cannot be bypassed by omission. N/A is
        # reserved exclusively for NON_EXECUTABLE_KINDS (handled above).
        return SOTARubricResult(
            candidate=candidate,
            score=0,
            total=0,
            passed=0,
            reason=(
                "no smoke_test_path provided; executable candidate must supply "
                "a Python smoke module exposing run()->list[dict]. Failing "
                "closed (score=0) per W288-fix1 — gate cannot be bypassed by "
                "omission for kind='executable'."
            ),
            counts_toward_score_min_mean=True,
        )

    smoke_path = Path(smoke_test_path)
    module = _import_smoke_module(smoke_path)
    if module is None:
        return SOTARubricResult(
            candidate=candidate,
            score=0,
            total=0,
            passed=0,
            reason=(
                f"smoke import failed for {smoke_path} — treated as lane crash "
                "(score 0 blocks ADOPT per rubric `score_min >= 4`)"
            ),
            counts_toward_score_min_mean=True,
        )

    rows = _run_smoke_rows(module)
    if rows is None:
        return SOTARubricResult(
            candidate=candidate,
            score=0,
            total=0,
            passed=0,
            reason=(
                f"smoke module {smoke_path.name} exposed neither run() nor rows; "
                "treated as crash"
            ),
            counts_toward_score_min_mean=True,
        )

    total = len(rows)
    passed = sum(1 for r in rows if r.get("pass") is True)
    pass_rate = (passed / total) if total else 0.0
    score = _bucket_score(pass_rate, total)
    return SOTARubricResult(
        candidate=candidate,
        score=score,
        total=total,
        passed=passed,
        reason=(
            f"smoke ran: {passed}/{total} cases passed "
            f"({pass_rate:.0%}) -> score {score}/5"
        ),
        counts_toward_score_min_mean=True,
    )


def to_audit_dict(result: SOTARubricResult) -> dict[str, Any]:
    """Render a result for the adoption-ledger `rubric_scores.eval_pass` slot."""
    return {
        "candidate": result.candidate,
        "eval_pass": result.score,
        "total": result.total,
        "passed": result.passed,
        "reason": result.reason,
        "counts_toward_score_min_mean": result.counts_toward_score_min_mean,
    }


# ----------------------------------------------------------------------------
# CLI smoke-test entry — `python -m harness.sota_rubric_lane --candidate FOO`
# Offline-safe; uses the bundled synthetic fixture under harness/results/.
# ----------------------------------------------------------------------------
def _main() -> int:
    import argparse

    ap = argparse.ArgumentParser(description="W288-P2-C1 sota-rubric eval lane")
    ap.add_argument("--candidate", required=True, help="candidate slug")
    ap.add_argument(
        "--smoke",
        default=None,
        help="path to smoke-test Python module exposing run()->list[dict]",
    )
    ap.add_argument(
        "--kind",
        default="executable",
        choices=sorted(NON_EXECUTABLE_KINDS | {"executable"}),
        help="candidate kind; non-executable kinds short-circuit to N/A",
    )
    args = ap.parse_args()
    result = run_sota_rubric_lane(
        candidate=args.candidate,
        smoke_test_path=args.smoke,
        kind=args.kind,
    )
    print(json.dumps(to_audit_dict(result), indent=2))
    # Exit 0 if N/A or score >= 4 (ADOPT-qualifying); 1 otherwise so CI gates.
    if result.score == "N/A":
        return 0
    return 0 if isinstance(result.score, int) and result.score >= 4 else 1


if __name__ == "__main__":
    raise SystemExit(_main())
