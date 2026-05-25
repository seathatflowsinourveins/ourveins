# W288-P2-C1 — synthetic smoke-test fixture for sota_rubric_lane.
# Used by the lane's smoke-test path: `python -m harness.eval_harness
# --mode sota-rubric --candidate synthetic-ok --smoke harness/results/sota_rubric_smoke_fixture.py`.
# 4 of 5 cases pass -> 80% pass rate -> bucket 4 (51-89% band).


def run() -> list[dict]:
    """Return 5 synthetic eval rows; 4 pass, 1 fail -> 80% -> score 4/5."""
    return [
        {"case": "fixture-1", "pass": True, "cost_usd": 0.0},
        {"case": "fixture-2", "pass": True, "cost_usd": 0.0},
        {"case": "fixture-3", "pass": True, "cost_usd": 0.0},
        {"case": "fixture-4", "pass": True, "cost_usd": 0.0},
        {
            "case": "fixture-5",
            "pass": False,
            "cost_usd": 0.0,
            "reason": "synthetic regression — intentional 1-case fail",
        },
    ]
