#!/usr/bin/env python3
"""sca-mcda-rank.py — operationalizes sca-v10 §5.7 routing rule.

W326 Stream G — converts prose MCDA routing into an executable multi-method
aggregator using pyDecision 5.1.1. Runs SAW (Simple Additive Weighting, equiv
to WSM), TOPSIS, Borda, and ELECTRE I, then emits a consensus ranking with
rank-disagreement flags so codex GPT-5.5 mediation can fire when methods
diverge >=2 rank slots on the top-3.

Cite anchors:
- pyDecision 5.1.1 https://github.com/Valdecy/pyDecision @ HEAD
- sca-v10 SKILL.md §7 composite_denom_install=36.8, §5.7 prose routing rule
- W325-G discovery; W326-G operationalization

Author: claude-sota-installed W326 Stream G  License: MIT
"""

from __future__ import annotations

import argparse
import json
import sys
from pathlib import Path
from typing import Any

import numpy as np
from pyDecision.algorithm import borda_method, electre_i, saw_method, topsis_method


def load_cohort(
    path: Path,
) -> tuple[list[str], list[str], np.ndarray, list[float], list[str]]:
    """Load cohort JSON. Schema:
    {
      "candidates": ["repo-a", "repo-b", ...],
      "criteria":   ["D1", "D2", ...],
      "scores":     [[c1_d1, c1_d2, ...], [c2_d1, ...]],
      "weights":    [w1, w2, ...],
      "criterion_type": ["max","max","min", ...]
    }
    """
    data = json.loads(path.read_text(encoding="utf-8"))
    cands = list(data["candidates"])
    crits = list(data["criteria"])
    scores = np.asarray(data["scores"], dtype=float)
    weights = [float(w) for w in data["weights"]]
    ctypes = list(data["criterion_type"])
    if scores.shape != (len(cands), len(crits)):
        raise ValueError(f"scores shape {scores.shape} != ({len(cands)},{len(crits)})")
    if len(weights) != len(crits) or len(ctypes) != len(crits):
        raise ValueError("weights/criterion_type length mismatch with criteria")
    return cands, crits, scores, weights, ctypes


def rank_from_scores(scores_arr: np.ndarray, *, descending: bool = True) -> list[int]:
    """Return 1-indexed rank per candidate (1 = best)."""
    order = np.argsort(-scores_arr if descending else scores_arr)
    ranks = [0] * len(scores_arr)
    for r, idx in enumerate(order, start=1):
        ranks[int(idx)] = r
    return ranks


def run_saw(
    d: np.ndarray, w: list[float], ct: list[str]
) -> tuple[list[float], list[int]]:
    out = saw_method(d, ct, w, graph=False, verbose=False)
    scores = [float(row[1]) for row in out]
    return scores, rank_from_scores(np.asarray(scores))


def run_topsis(
    d: np.ndarray, w: list[float], ct: list[str]
) -> tuple[list[float], list[int]]:
    scores = topsis_method(d, w, ct, graph=False, verbose=False).tolist()
    return scores, rank_from_scores(np.asarray(scores))


def run_borda(d: np.ndarray, ct: list[str]) -> tuple[list[float], list[int]]:
    # pyDecision borda_method returns total points (lower = better) so flip to descending=False
    scores = borda_method(d, ct, graph=False, verbose=False).tolist()
    return scores, rank_from_scores(np.asarray(scores), descending=False)


def run_electre(d: np.ndarray, w: list[float]) -> dict[str, Any]:
    cd, dd, dominance, kernel, dominated = electre_i(d, w, graph=False)
    return {
        "concordance": cd.tolist() if hasattr(cd, "tolist") else cd,
        "discordance": dd.tolist() if hasattr(dd, "tolist") else dd,
        "kernel": kernel.tolist() if hasattr(kernel, "tolist") else list(kernel),
        "dominated": dominated.tolist()
        if hasattr(dominated, "tolist")
        else list(dominated),
    }


def consensus(
    saw_r: list[int], topsis_r: list[int], borda_r: list[int]
) -> tuple[list[float], list[int]]:
    """Average normalized rank across methods. Lower mean = better."""
    n = len(saw_r)
    means = [(saw_r[i] + topsis_r[i] + borda_r[i]) / 3.0 for i in range(n)]
    return means, rank_from_scores(np.asarray(means), descending=False)


def disagreement_flags(saw_r, topsis_r, borda_r, top_n: int = 3) -> dict[str, Any]:
    spreads = [max(s, t, b) - min(s, t, b) for s, t, b in zip(saw_r, topsis_r, borda_r)]
    top_idx_per = []
    for ranks in (saw_r, topsis_r, borda_r):
        order = sorted(range(len(ranks)), key=lambda i: ranks[i])[:top_n]
        top_idx_per.append(set(order))
    intersection = set.intersection(*top_idx_per) if top_idx_per else set()
    return {
        "rank_spread_per_candidate": spreads,
        "max_spread": max(spreads) if spreads else 0,
        "fires_codex_mediation": (max(spreads) if spreads else 0) >= 2,
        f"top{top_n}_intersection_size": len(intersection),
    }


def main(argv: list[str] | None = None) -> int:
    p = argparse.ArgumentParser(
        prog="sca-mcda-rank",
        description="sca-v10 §5.7 MCDA ranker (SAW + TOPSIS + Borda + ELECTRE I) using pyDecision",
    )
    p.add_argument("--cohort", required=True, type=Path, help="cohort JSON path")
    p.add_argument("--out", type=Path, default=None, help="optional JSON output path")
    p.add_argument(
        "--top", type=int, default=3, help="top-N for intersection check (default 3)"
    )
    args = p.parse_args(argv)

    cands, crits, d, w, ct = load_cohort(args.cohort)
    saw_s, saw_r = run_saw(d, w, ct)
    top_s, top_r = run_topsis(d, w, ct)
    bor_s, bor_r = run_borda(d, ct)
    elec = run_electre(d, w)
    cons_s, cons_r = consensus(saw_r, top_r, bor_r)
    disag = disagreement_flags(saw_r, top_r, bor_r, top_n=args.top)

    rows = []
    for i, name in enumerate(cands):
        rows.append(
            {
                "candidate": name,
                "saw_score": round(saw_s[i], 4),
                "saw_rank": saw_r[i],
                "topsis_score": round(top_s[i], 4),
                "topsis_rank": top_r[i],
                "borda_points": bor_s[i],
                "borda_rank": bor_r[i],
                "consensus_mean_rank": round(cons_s[i], 3),
                "consensus_rank": cons_r[i],
                "in_electre_kernel": (i + 1) in elec["kernel"],
            }
        )
    rows.sort(key=lambda r: r["consensus_rank"])

    result = {
        "tool": "sca-mcda-rank.py",
        "rule_version": "sca-v10",
        "methods": ["SAW", "TOPSIS", "Borda", "ELECTRE_I"],
        "criteria": crits,
        "weights": w,
        "criterion_type": ct,
        "ranking": rows,
        "electre": elec,
        "disagreement": disag,
    }

    out_text = json.dumps(result, indent=2, ensure_ascii=False)
    if args.out:
        args.out.write_text(out_text, encoding="utf-8")
    print(out_text)
    return 0


if __name__ == "__main__":
    sys.exit(main())
