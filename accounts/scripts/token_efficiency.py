#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""token_efficiency.py — Unified token-efficiency dashboard for 8x OAuth fleet.

Aggregates multi-source data into one operator-facing view:
- CPA /v0/management/auth-files recent_requests buckets (cache hit rate proxy via session-affinity)
- CPA /v0/management/api-key-usage (fleet-wide aggregate, when usage-statistics-enabled)
- poll_all.py JSONL (per-account 5h+7d quota utilization + reset times)
- ccusage CLI daily JSON (when npx + node available; local token accounting)

Cite anchors (TIER-1-DIRECT per CR-1 + CR-8):
- Z:/repos/deps/CLIProxyAPI/internal/api/server.go:506-658 @ HEAD 785b00c3127eea6aa207f1207ead8a2aa93690a3
  (mgmt API route inventory; primary endpoints used: /auth-files L642, /api-key-usage L553, /usage-queue L554)
- Z:/repos/deps/ccusage/apps/ccusage/src/_session-blocks.ts:8 @ HEAD 1a4bd69b9214ff55f3745d4d864108d662e4dea0
  (DEFAULT_SESSION_DURATION_HOURS = 5; 5h-billing-window source)
- accounts/scripts/poll_all.py:55-59 (STATE_DIR env-overridable canonical write target)
- accounts/docs/sota-cite-anchors.md (complete TIER-1 cite trail)

Cite-class lattice per .claude/rules/citation-discipline.md rule #8:
constituents=[TIER-1-DIRECT @ CPA server.go + ccusage @ HEAD SHAs,
              TIER-3-LOCAL-COMPOSITION @ multi-source aggregation algorithm]
effective_tier=TIER-3-LOCAL-COMPOSITION per MIN_PRECEDENCE.

CR-12 disposition: PROVIDER-COMPLEMENT to ccusage (different scope: ccusage = local
Claude Code token accounting; this = fleet-wide OAuth quota + CPA cache-rate + ccusage merged).
CR-9 install-risk: LOW (read-only observer; reversible via `git rm`).
"""

from __future__ import annotations

import argparse
import json
import os
import subprocess
import sys
import urllib.error
import urllib.request
from datetime import datetime, timezone
from pathlib import Path
from typing import Any, Optional

STATE_DIR = Path(
    os.environ.get(
        "CLAUDE_SOTA_ACCOUNTS_DIR", "Z:/claude-sota-installed-state/accounts"
    )
)
JSONL_PATH = STATE_DIR / "cpa_oauth_quota.jsonl"
CPA_BASE = os.environ.get("CPA_BASE_URL", "http://127.0.0.1:18317")
CPA_SECRET_PATH = Path("Z:/claude-sota-installed-state/cliproxy-mgmt-secret.txt")
HTTP_TIMEOUT = 8


def _read_secret() -> Optional[str]:
    try:
        return CPA_SECRET_PATH.read_text(encoding="utf-8").strip() or None
    except OSError:
        return None


def _cpa_get(path: str) -> Optional[Any]:
    secret = _read_secret()
    if not secret:
        return None
    url = f"{CPA_BASE}/v0/management/{path.lstrip('/')}"
    req = urllib.request.Request(url, headers={"Authorization": f"Bearer {secret}"})
    try:
        with urllib.request.urlopen(req, timeout=HTTP_TIMEOUT) as resp:
            return json.load(resp)
    except (
        urllib.error.URLError,
        urllib.error.HTTPError,
        OSError,
        json.JSONDecodeError,
    ):
        return None


def _load_quota_records() -> dict[str, dict[str, Any]]:
    if not JSONL_PATH.exists():
        return {}
    latest: dict[str, dict[str, Any]] = {}
    try:
        for line in JSONL_PATH.read_text(encoding="utf-8").splitlines():
            line = line.strip()
            if not line:
                continue
            try:
                rec = json.loads(line)
            except json.JSONDecodeError:
                continue
            account = rec.get("account") or rec.get("email")
            if not account:
                continue
            existing = latest.get(account)
            if existing is None or rec.get("ts", "") > existing.get("ts", ""):
                latest[account] = rec
    except OSError:
        pass
    return latest


def _ccusage_daily() -> Optional[dict[str, Any]]:
    """Subprocess `npx @ccusage/ccusage daily --json`; graceful failure."""
    try:
        result = subprocess.run(
            ["npx", "--yes", "@ccusage/ccusage", "daily", "--json"],
            capture_output=True,
            text=True,
            timeout=30,
            shell=(os.name == "nt"),
        )
        if result.returncode == 0 and result.stdout.strip():
            return json.loads(result.stdout)
    except (
        subprocess.TimeoutExpired,
        FileNotFoundError,
        json.JSONDecodeError,
        OSError,
    ):
        pass
    return None


def _summarize_recent_requests(buckets: list[dict[str, Any]]) -> tuple[int, int, float]:
    """Sum success + failed across 20-bucket sliding window; emit cache-hit-rate proxy.
    Buckets = 10min each; 20 buckets = ~3.3h history per W187 §1.
    """
    total_success = sum(int(b.get("success", 0) or 0) for b in buckets)
    total_failed = sum(int(b.get("failed", 0) or 0) for b in buckets)
    total = total_success + total_failed
    success_rate = (total_success / total * 100) if total > 0 else 0.0
    return total_success, total_failed, success_rate


def _fmt_pct(v: Any) -> str:
    if v is None:
        return "?"
    try:
        return f"{int(v)}%"
    except (ValueError, TypeError):
        return "?"


def render_dashboard() -> int:
    now = datetime.now(timezone.utc)
    print(
        f"=== Token-efficiency dashboard (probed @ {now.isoformat(timespec='seconds')}) ===\n"
    )

    # === Section 1: per-account OAuth quota from poll_all.py JSONL ===
    quota = _load_quota_records()
    if quota:
        print("## Per-account OAuth quota (Anthropic /api/oauth/usage)\n")
        hdr = f"  {'email':<40} {'5h':>5} {'7d':>5} {'5h_resets':<20} {'7d_resets':<20}"
        print(hdr)
        print("  " + "-" * (len(hdr) - 2))
        for acct, rec in sorted(quota.items()):
            five_h = rec.get("five_hour") or {}
            seven_d = rec.get("seven_day") or {}
            r5 = (five_h.get("resets_at", "") or "")[:19]
            r7 = (seven_d.get("resets_at", "") or "")[:19]
            print(
                f"  {acct[:40]:<40} {_fmt_pct(five_h.get('utilization')):>5} "
                f"{_fmt_pct(seven_d.get('utilization')):>5} {r5:<20} {r7:<20}"
            )
        print()
    else:
        print(f"## Per-account OAuth quota: NO RECORDS at {JSONL_PATH}\n")
        print("  Hint: run `python accounts/scripts/poll_all.py --tick` to populate.\n")

    # === Section 2: CPA fleet-wide auth-files (cache-rate proxy via recent_requests) ===
    auth_files = _cpa_get("auth-files")
    if isinstance(auth_files, list):
        print(
            f"## CPA auth-files cache-rate proxy ({len(auth_files)} accounts, 20-bucket ~3.3h window)\n"
        )
        hdr = f"  {'account':<40} {'status':<10} {'priority':<10} {'success':>8} {'failed':>7} {'success_rate':>13}"
        print(hdr)
        print("  " + "-" * (len(hdr) - 2))
        for entry in auth_files:
            buckets = entry.get("recent_requests") or []
            success, failed, rate = _summarize_recent_requests(buckets)
            email = (entry.get("email") or entry.get("account") or "?")[:40]
            status = (entry.get("status") or "?")[:10]
            priority = str(entry.get("priority", "?"))[:10]
            print(
                f"  {email:<40} {status:<10} {priority:<10} {success:>8} {failed:>7} {rate:>12.1f}%"
            )
        print()
    else:
        print(
            "## CPA auth-files: UNAVAILABLE (mgmt API unreachable OR secret missing)\n"
        )

    # === Section 3: CPA fleet-wide /api-key-usage aggregate ===
    api_usage = _cpa_get("api-key-usage")
    if api_usage:
        print(
            f"## CPA /api-key-usage (aggregate; enabled={'usage-statistics-enabled' if api_usage else 'unknown'})\n"
        )
        # Only print if non-empty per W187 §1 ({} = feature disabled)
        if isinstance(api_usage, dict) and api_usage:
            print(f"  {json.dumps(api_usage, indent=2)[:500]}\n")
        else:
            print("  (empty — usage-statistics-enabled=false per CPA config)\n")

    # === Section 4: ccusage daily local token tracking ===
    ccu = _ccusage_daily()
    if ccu:
        print("## ccusage daily (local Claude Code token tracking)\n")
        # ccusage output shape: {totals: {...}, daily: [{date, inputTokens, outputTokens, cost, ...}]}
        totals = ccu.get("totals") or ccu.get("daily") or {}
        if isinstance(totals, dict) and totals:
            print(f"  totals: {json.dumps(totals, indent=2)[:400]}\n")
        elif isinstance(ccu.get("daily"), list) and ccu["daily"]:
            recent = ccu["daily"][-3:]
            for day in recent:
                print(
                    f"  {day.get('date', '?')}: "
                    f"in={day.get('inputTokens', 0)} out={day.get('outputTokens', 0)} "
                    f"cache_read={day.get('cacheReadInputTokens', 0)} "
                    f"cost=${day.get('totalCost', day.get('cost', 0)):.4f}"
                )
            print()
    else:
        print(
            "## ccusage daily: UNAVAILABLE (npx/node missing OR @ccusage not installed)\n"
        )

    return 0


def main() -> int:
    parser = argparse.ArgumentParser(
        description="W190 unified token-efficiency dashboard — fleet OAuth quota + CPA cache + ccusage local"
    )
    parser.add_argument(
        "--json",
        action="store_true",
        help="emit JSON instead of table (machine-readable)",
    )
    args = parser.parse_args()

    if args.json:
        # Aggregate everything as one JSON object for downstream consumption
        out = {
            "ts": datetime.now(timezone.utc).isoformat(),
            "quota_records": _load_quota_records(),
            "cpa_auth_files": _cpa_get("auth-files"),
            "cpa_api_key_usage": _cpa_get("api-key-usage"),
            "ccusage_daily": _ccusage_daily(),
        }
        print(json.dumps(out, indent=2, default=str))
        return 0

    return render_dashboard()


if __name__ == "__main__":
    sys.exit(main())
