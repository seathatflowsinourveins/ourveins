#!/usr/bin/env python3
"""cpa-cache-rate — aggregate session-affinity cache hit rate per claude account.

Wave 119 Ship 7. Closes operator's recurring "give me cache rate" question by
parsing CLIProxyAPI session-affinity log lines from main.log.

Cite: CLIProxyAPI `sdk/cliproxy/auth/selector.go:503,513,523,535 @ HEAD 785b00c3` —
4 emit sites: cache hit (:503) / cache hit but auth unavailable, reselected (:513) /
fallback cache hit (:523) / cache miss, new binding (:535).

Usage: python tools/cpa-cache-rate.py [--lines N] [--since-mins M]
  --lines N      tail last N log lines (default: 10000)
  --since-mins M only count requests from last M minutes (default: 1440 = 24h)

3-bucket classifier per codex T1 NEEDS-REVISION conf=0.9:
  hit       = :503 cache hit + :523 fallback cache hit
  reselect  = :513 cache hit but auth unavailable (cached binding invalidated)
  miss      = :535 cache miss, new binding

Output: per-account hit/reselect/miss + global rate where
  rate = hit / (hit + reselect + miss).
"""

from __future__ import annotations
import re
import sys
import argparse
from collections import defaultdict
from datetime import datetime, timedelta
from pathlib import Path

LOG = Path("Z:/claude-sota-installed/.cli-proxy-api/logs/main.log")
HIT_RE = re.compile(
    r"^\[(\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2})\].*?session-affinity: "
    r"(cache hit but auth unavailable, reselected|fallback cache hit|cache hit|cache miss[^|]*?)"
    r"\s*\|.*?auth=(claude-[\w.@-]+\.json)"
)


def classify(g2: str) -> str:
    if "reselected" in g2:
        return "reselect"
    if "miss" in g2:
        return "miss"
    return "hit"


def main() -> int:
    ap = argparse.ArgumentParser(
        description="cpa-cache-rate — aggregate session-affinity cache hit rate per claude account"
    )
    ap.add_argument("--lines", type=int, default=10000, help="tail last N lines")
    ap.add_argument(
        "--since-mins", type=int, default=1440, help="window in minutes (default 24h)"
    )
    args = ap.parse_args()

    if not LOG.exists():
        print(f"ERR: log not found at {LOG}", file=sys.stderr)
        return 1

    cutoff = datetime.now() - timedelta(minutes=args.since_mins)
    by_acct: dict[str, dict[str, int]] = defaultdict(
        lambda: {"hit": 0, "reselect": 0, "miss": 0}
    )

    with LOG.open("r", encoding="utf-8", errors="replace") as fh:
        tail = fh.readlines()[-args.lines :]

    for line in tail:
        m = HIT_RE.match(line)
        if not m:
            continue
        try:
            ts = datetime.strptime(m.group(1), "%Y-%m-%d %H:%M:%S")
        except ValueError:
            continue
        if ts < cutoff:
            continue
        by_acct[m.group(3)][classify(m.group(2))] += 1

    total_hit = sum(v["hit"] for v in by_acct.values())
    total_rsel = sum(v["reselect"] for v in by_acct.values())
    total_miss = sum(v["miss"] for v in by_acct.values())
    total = total_hit + total_rsel + total_miss

    print(
        f"=== CPA cache-rate (last {args.since_mins}min, {args.lines} log lines tailed) ==="
    )
    if total == 0:
        print("(no session-affinity events in window)")
        return 0

    print(f"{'auth':<55} {'hit':>5} {'rsel':>5} {'miss':>5} {'rate':>7}")
    print("-" * 84)
    for acct in sorted(by_acct):
        h = by_acct[acct]["hit"]
        r = by_acct[acct]["reselect"]
        ms = by_acct[acct]["miss"]
        n = h + r + ms
        rate = f"{h / n * 100:5.1f}%" if n else "  n/a"
        print(f"{acct:<55} {h:>5} {r:>5} {ms:>5} {rate:>7}")
    print("-" * 84)
    rate_pct = total_hit / total * 100 if total else 0
    print(
        f"{'TOTAL':<55} {total_hit:>5} {total_rsel:>5} {total_miss:>5} {rate_pct:5.1f}%"
    )
    return 0


if __name__ == "__main__":
    sys.exit(main())
