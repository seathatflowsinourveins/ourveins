#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""weekly_reset_guard.py — 3 weekly-reset utilization goals for 8x OAuth fleet.

Reads state-outside-repo telemetry written by poll_all.py and surfaces:
- --status: per-account 5h+7d utilization + resets_at display
- --hint: routing-rebalance recommendation (rank accounts by remaining 7d budget —
  the Anthropic /api/oauth/usage schema field directly; NO derived composite score)
- --burst-check: pre-reset burst-utilization warning (alert when resets_at within
  BURST_RESET_WINDOW_H AND utilization below BURST_UTIL_THRESHOLD; both env-overridable)

Cite anchors (TIER-1-DIRECT per CR-1 + CR-8):
- Z:/repos/deps/CLIProxyAPI/internal/api/server.go:649 @ HEAD 785b00c3127eea6aa207f1207ead8a2aa93690a3
  (PATCH /auth-files/fields — priority/disable_cooling/note mutation)
- Z:/repos/deps/CLIProxyAPI/internal/api/handlers/management/auth_files.go:336-453,1124 @ HEAD 785b00c3
  (priority is a static operator-set integer field; CPA does NOT auto-score by utilization —
  confirms `--hint` must rank by a SOTA-sourced field, not a self-invented composite)
- https://api.anthropic.com/api/oauth/usage response schema per W187 §6.1
  (`seven_day.utilization` is the direct ranking-key source for --hint)
- .claude/hooks/scripts/userpromptsubmit_compact_threshold.py:27-29 (W175 P6 codification —
  env-var-overridable-thresholds is the official sanctioned mechanism; --burst-check adopts it)
- Z:/claude-sota-installed-state/accounts/cpa_oauth_quota.jsonl (state-outside-repo per CLAUDE.local.md ENV (f))
- accounts/docs/reset-goals.md (W190 user-approved scope)

Cite-class lattice per .claude/rules/citation-discipline.md rule #8:
constituents=[TIER-1-DIRECT @ Anthropic /api/oauth/usage schema (--hint ranking key
              `remaining_7d` IS the schema field — no derived composite),
              TIER-1-DIRECT @ CPA auth_files.go:336-453,1124 (priority static-integer
              confirmation) + server.go:649 (PATCH endpoint),
              TIER-1-DIRECT @ W175 P6 env-var-overridable-thresholds pattern,
              TIER-3-LOCAL-COMPOSITION @ eee-local 3-mode CLI assembly,
              NOVEL-DOCUMENTED-EXCEPTION @ burst-check default values 24h/60% —
              operator-tuned tuning-knob defaults; env-override MECHANISM is cited SOTA,
              the specific DEFAULT is bootstrap-necessity per CR-8 conformance column]
effective_tier=TIER-3-LOCAL-COMPOSITION per MIN_PRECEDENCE.

W190-fixforward (2026-05-14): removed self-invented composite scoring formula
`remaining_7d × (1/log(hours+1))` per CR-8 strict reading + user directive "rather than
self invent". --hint now ranks by pure-SOTA `remaining_7d`; hours_to_reset is a display
column for operator judgment, not folded into a derived sort key.

CR-12 disposition: GENUINELY-NEW (no incumbent reset-guard).
CR-9 install-risk: LOW (read-only observer; no PATCH; reversible via `git rm`).
"""

from __future__ import annotations

import argparse
import json
import os
import sys
from datetime import datetime, timezone
from pathlib import Path
from typing import Any, Optional

# Read state-outside-repo per single-source-preferred per FM-20 row 18
STATE_DIR = Path(
    os.environ.get(
        "CLAUDE_SOTA_ACCOUNTS_DIR", "Z:/claude-sota-installed-state/accounts"
    )
)
JSONL_PATH = STATE_DIR / "cpa_oauth_quota.jsonl"

# Burst-check thresholds — env-overridable per W175 P6 env-var-overridable-thresholds
# pattern (.claude/hooks/scripts/userpromptsubmit_compact_threshold.py:27-29 — "official
# sanctioned mechanism"). The env-override MECHANISM is the cited SOTA pattern; the
# specific DEFAULT values are TIER-3-LOCAL-OPERATOR-DERIVED tuning knobs marked
# NOVEL-DOCUMENTED-EXCEPTION per CR-8 conformance column (every threshold-based alert
# needs a bootstrap default — operator tunes via env without code edit).
BURST_RESET_WINDOW_H = float(os.environ.get("BURST_RESET_WINDOW_H", "24"))
BURST_UTIL_THRESHOLD = float(os.environ.get("BURST_UTIL_THRESHOLD", "60"))


def _parse_iso(s: str) -> Optional[datetime]:
    """Parse ISO8601 timestamp tolerating Z suffix + microseconds."""
    if not s:
        return None
    try:
        # Accept "2026-05-14T04:00:00.497407+00:00" or "2026-05-14T04:00:00Z"
        return datetime.fromisoformat(s.replace("Z", "+00:00"))
    except (ValueError, TypeError):
        return None


def _load_latest_per_account() -> dict[str, dict[str, Any]]:
    """Tail JSONL + return latest record per account (deduplicated by `account` field)."""
    if not JSONL_PATH.exists():
        print(f"ERROR: state-outside-repo missing at {JSONL_PATH}", file=sys.stderr)
        print(
            "  Hint: run `python accounts/scripts/poll_all.py --tick` first.",
            file=sys.stderr,
        )
        sys.exit(2)
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
    except OSError as e:
        print(f"ERROR: unreadable state file: {e}", file=sys.stderr)
        sys.exit(1)
    return latest


def _hours_until(ts: Optional[datetime], now: datetime) -> Optional[float]:
    if ts is None:
        return None
    delta = ts - now
    return delta.total_seconds() / 3600.0


def _fmt_pct(v: Any) -> str:
    if v is None:
        return "?"
    try:
        return f"{int(v)}%"
    except (ValueError, TypeError):
        return str(v)


def _fmt_resets(s: str) -> str:
    if not s:
        return "?"
    parsed = _parse_iso(s)
    if parsed is None:
        return s
    return parsed.strftime("%Y-%m-%dT%H:%MZ")


def cmd_status(records: dict[str, dict[str, Any]], now: datetime) -> int:
    """Goal 1 — surface per-account 5h+7d utilization + resets_at."""
    if not records:
        print("(no records — run poll_all.py --tick first)")
        return 2
    # Detect staleness (any record >24h old → exit 2)
    stale = False
    print(
        f"=== Account fleet utilization (probed against state @ {JSONL_PATH.name}) ===\n"
    )
    hdr = f"{'#':>3}  {'email':<40} {'5h_util':>8} {'7d_util':>8} {'5h_resets_at':<22} {'7d_resets_at':<22} {'age_h':>6}"
    print(hdr)
    print("-" * len(hdr))
    for i, (acct, rec) in enumerate(sorted(records.items()), 1):
        five_h = rec.get("five_hour") or {}
        seven_d = rec.get("seven_day") or {}
        ts = _parse_iso(rec.get("ts", ""))
        age_h = _hours_until(ts, now) if ts else None
        age_str = f"{-age_h:.1f}" if age_h is not None else "?"
        if age_h is not None and -age_h > 24:
            stale = True
        print(
            f"{i:>3}  {acct[:40]:<40} {_fmt_pct(five_h.get('utilization')):>8} "
            f"{_fmt_pct(seven_d.get('utilization')):>8} "
            f"{_fmt_resets(five_h.get('resets_at', '')):<22} "
            f"{_fmt_resets(seven_d.get('resets_at', '')):<22} "
            f"{age_str:>6}"
        )
    if stale:
        print(
            "\nWARNING: ≥1 record >24h old. Re-run `poll_all.py --tick` to refresh.",
            file=sys.stderr,
        )
        return 2
    return 0


def cmd_hint(records: dict[str, dict[str, Any]], now: datetime) -> int:
    """Goal 2 — rank accounts by remaining 7d budget (Anthropic /api/oauth/usage field).

    Ranking key is `remaining_7d = (100 - seven_day.utilization) / 100` — a direct
    SOTA-sourced field from the Anthropic OAuth usage response schema, NOT a derived
    composite. `hours_to_reset` is shown as an operator-judgment display column, not
    folded into the sort key — the operator decides whether imminent-reset urgency
    overrides raw-budget ranking. Avoids self-invented scoring per CR-8 strict reading
    (W190-fixforward removed the prior `remaining_7d × (1/log(hours+1))` composite).
    """
    if not records:
        print("(no records)")
        return 1
    ranked = []
    for acct, rec in records.items():
        seven_d = rec.get("seven_day") or {}
        util = seven_d.get("utilization")
        if util is None:
            continue
        try:
            util_pct = int(util)
        except (ValueError, TypeError):
            continue
        remaining_7d = max(0.0, (100 - util_pct) / 100.0)
        resets_at = _parse_iso(seven_d.get("resets_at", ""))
        hours_to_reset = _hours_until(resets_at, now)
        ranked.append((acct, util_pct, remaining_7d, hours_to_reset))
    # Sort by remaining 7d budget descending — pure SOTA field, no derived score
    ranked.sort(key=lambda r: r[2], reverse=True)
    if not ranked:
        print("(no rankable records — utilization fields missing)", file=sys.stderr)
        return 1
    print(
        f"=== Routing-rebalance hint ({len(ranked)} accounts ranked by remaining 7d budget) ===\n"
    )
    hdr = f"{'rank':>4}  {'email':<40} {'rem_7d':>8} {'hrs_to_7d_reset':>16}"
    print(hdr)
    print("-" * len(hdr))
    for rank, (acct, _util_pct, rem_7d, hours) in enumerate(ranked, 1):
        hrs_str = f"{hours:.1f}h" if hours is not None else "?"
        print(f"{rank:>4}  {acct[:40]:<40} {rem_7d * 100:>7.0f}% {hrs_str:>16}")
    print(
        "\nHint: prefer top-ranked accounts (most remaining 7d budget) for new large/exploratory work."
    )
    print(
        "      hrs_to_7d_reset shown for operator judgment — imminent reset may override raw-budget rank."
    )
    print(
        "Operator action (manual): PATCH /v0/management/auth-files/fields with new priority per CPA server.go:649"
    )
    return 0


def cmd_burst_check(records: dict[str, dict[str, Any]], now: datetime) -> int:
    """Goal 3 — alert when resets_at within BURST_RESET_WINDOW_H AND utilization below BURST_UTIL_THRESHOLD.

    Thresholds are env-overridable per W175 P6 cited pattern (env-var-overridable-thresholds is
    the SOTA-sanctioned mechanism); default values 24h / 60% are TIER-3-LOCAL-OPERATOR-DERIVED
    tuning knobs marked NOVEL-DOCUMENTED-EXCEPTION per CR-8 conformance column.
    """
    if not records:
        print("(no records)")
        return 2
    alerts = []
    infos = []
    ok_count = 0
    for acct, rec in records.items():
        seven_d = rec.get("seven_day") or {}
        util = seven_d.get("utilization")
        resets_at = _parse_iso(seven_d.get("resets_at", ""))
        if util is None or resets_at is None:
            continue
        try:
            util_pct = int(util)
        except (ValueError, TypeError):
            continue
        hours = _hours_until(resets_at, now)
        if hours is None:
            continue
        if hours < BURST_RESET_WINDOW_H:
            if util_pct < BURST_UTIL_THRESHOLD:
                alerts.append((acct, util_pct, hours))
            else:
                infos.append((acct, util_pct, hours))
        else:
            ok_count += 1
    print(
        f"=== Pre-reset burst-utilization warnings "
        f"(window={BURST_RESET_WINDOW_H:.0f}h, threshold={BURST_UTIL_THRESHOLD:.0f}%; "
        f"env-override via BURST_RESET_WINDOW_H + BURST_UTIL_THRESHOLD) ===\n"
    )
    for acct, util_pct, hours in alerts:
        unused = 100 - util_pct
        print(
            f"[ALERT] {acct}: {unused}% budget unused, 7d resets in {hours:.1f}h (use-it-or-lose-it)"
        )
    for acct, util_pct, hours in infos:
        print(
            f"[INFO]  {acct}: {util_pct}% utilized, 7d resets in {hours:.1f}h (no action)"
        )
    if ok_count:
        print(
            f"[OK]    {ok_count} other account(s): outside {BURST_RESET_WINDOW_H:.0f}h reset window"
        )
    return 1 if alerts else 0


def main() -> int:
    parser = argparse.ArgumentParser(
        description="W190 weekly-reset utilization guard — 3 goals per accounts/docs/reset-goals.md"
    )
    group = parser.add_mutually_exclusive_group(required=True)
    group.add_argument(
        "--status", action="store_true", help="Goal 1: per-account utilization display"
    )
    group.add_argument(
        "--hint", action="store_true", help="Goal 2: routing-rebalance hint"
    )
    group.add_argument(
        "--burst-check", action="store_true", help="Goal 3: pre-reset burst warning"
    )
    args = parser.parse_args()

    now = datetime.now(timezone.utc)
    records = _load_latest_per_account()

    if args.status:
        return cmd_status(records, now)
    if args.hint:
        return cmd_hint(records, now)
    if args.burst_check:
        return cmd_burst_check(records, now)
    parser.print_help()
    return 1


if __name__ == "__main__":
    sys.exit(main())
