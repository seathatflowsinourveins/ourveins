# agents/verdict_routing.py
"""W375 DIM-14 fix (codex r-final-2 P0) — pure verdict-routing function.

Decide control-flow for L1 (CoVe) + L2 (review-gate) verdicts.

The previous control-flow at temporal_worker.py:280-302 escalated to L3 jury
only on AMBIGUOUS; every other (l1, l2) combination — INCLUDING (FAIL, *) and
(*, FAIL) — fell through to a DETERMINISTIC-PASS branch that the
status-mapping at workflow tail mapped to TaskStatus.COMPLETE. Net effect:
an L1 or L2 FAIL was silently accepted as PASS.

Fix: extract the routing into a pure function so it is independently
unit-testable without pulling in temporal_worker's full dependency tree
(openhands-sdk, temporalio, etc.). Restrict DETERMINISTIC-PASS to BOTH-PASS,
short-circuit on FAIL with a dedicated DIRECT-FAIL outcome (no jury — FAIL
is concrete negative evidence, no point burning jury quota on it), and
default unknown/empty verdict shapes to UNKNOWN-FAIL (defensive BLOCK).

Cite: codex r-final-2 DIM-14 (BLOCK 0.89) in
      tmp/openhands-brainstorm/codex-r-final-2-W375.txt.
"""


def decide_verdict_routing(l1: dict, l2: dict) -> str:
    """Decide L1+L2 control-flow routing.

    Args:
        l1: L1 CoVe verdict dict (must contain "verdict" key with one of
            "PASS" | "FAIL" | "AMBIGUOUS"; other values treated as UNKNOWN).
        l2: L2 review-gate verdict dict (same shape as l1).

    Returns one of:
        "DIRECT-FAIL"        either gate returned FAIL → short-circuit BLOCK
        "ESCALATE-JURY"      either gate returned AMBIGUOUS (neither FAIL) → L3
        "DETERMINISTIC-PASS" BOTH gates returned PASS → accept without L3
        "UNKNOWN-FAIL"       unknown verdict shape → defensive BLOCK
    """
    v1 = l1.get("verdict", "UNKNOWN")
    v2 = l2.get("verdict", "UNKNOWN")
    # FAIL is dominant — concrete failure evidence trumps ambiguity.
    if v1 == "FAIL" or v2 == "FAIL":
        return "DIRECT-FAIL"
    # AMBIGUOUS routes to L3 jury (only when neither gate is FAIL).
    if v1 == "AMBIGUOUS" or v2 == "AMBIGUOUS":
        return "ESCALATE-JURY"
    # Both PASS → deterministic accept.
    if v1 == "PASS" and v2 == "PASS":
        return "DETERMINISTIC-PASS"
    # Anything else (empty dict, unknown enum value, garbled response) →
    # defensive BLOCK so we never silently accept a malformed verdict.
    return "UNKNOWN-FAIL"
