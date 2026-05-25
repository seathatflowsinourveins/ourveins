#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""cpa_oauth_quota_poller.py — Per-account Anthropic OAuth /api/oauth/usage poller.

Polls each .cli-proxy-api/claude-*.json account on a staggered ~60min cycle
respecting Anthropic's 1-call/hour-per-credential rate limit. Outputs to
Z:/claude-sota-installed-state/accounts/cpa_oauth_quota.jsonl for SessionStart-preload visibility.

Cite anchors (TIER-1-DIRECT, CR-9 read-only research probe exemption):
- Z:/repos/deps/Aperant/apps/desktop/src/main/claude-profile/usage-monitor.ts:65-69
  (Anthropic provider usage path /api/oauth/usage)
- Z:/repos/deps/Aperant/apps/desktop/src/main/claude-profile/usage-monitor.ts:2369-2425
  (Response normalization: new nested + legacy flat schema)
- Z:/repos/deps/Aperant/apps/desktop/src/main/claude-profile/usage-monitor.ts:2200-2216
  (429 RATE_LIMIT_COOLDOWN_MS cross-sibling propagation)
- Z:/repos/deps/Aperant/apps/desktop/src/main/claude-profile/usage-monitor.ts:2218-2268
  (401/403 auth-failure detection)
- https://code.claude.com/docs/en/env-vars (CLAUDE_CONFIG_DIR resolution)
- W187 §6.1 tmp/wave187-sota-accounts-fetch-methods-research-2026-05-13.md
- W188 P0a-Agent-C design doc tmp/w188-C-design-2026-05-13.md

Cite-class lattice per .claude/rules/citation-discipline.md rule #8:
constituents=[TIER-1-DIRECT @ Aperant L65-69+L2369-2425,
              TIER-1-DIRECT @ Anthropic CC env-vars,
              TIER-3-LOCAL-COMPOSITION @ eee-local poller assembly]
effective_tier=TIER-3-LOCAL-COMPOSITION per MIN_PRECEDENCE.

CR-12 disposition: GENUINELY-NEW (no incumbent per-account poller exists).
CR-9 install-risk: LOW (stdlib only; observer-only no decision:block; reversible).
"""

from __future__ import annotations

import argparse
import json
import os
import sys
import time
import urllib.error
import urllib.request
from datetime import datetime, timezone, timedelta
from email.utils import parsedate_to_datetime
from pathlib import Path
from typing import Any, Optional

ANTHROPIC_USAGE_URL = "https://api.anthropic.com/api/oauth/usage"
ANTHROPIC_BETA_HEADER = "oauth-2025-04-20"
REQUEST_TIMEOUT_SEC = 30
TICK_BUDGET_SEC = 60
ACCOUNT_COOLDOWN_SEC = 3600
SIBLING_COOLDOWN_SEC = 600
API_FAILURE_COOLDOWN_SEC = 60
STAGGER_INTERVAL_SEC = 450

WORKSPACE_ROOT = Path("Z:/claude-sota-installed")
AUTH_DIR = WORKSPACE_ROOT / ".cli-proxy-api"
STATE_DIR = Path(
    os.environ.get(
        "CLAUDE_SOTA_ACCOUNTS_DIR", "Z:/claude-sota-installed-state/accounts"
    )
)
STATE_FILE = STATE_DIR / "cpa_oauth_quota_state.json"
JSONL_FILE = STATE_DIR / "cpa_oauth_quota.jsonl"

CLAUDE_ACCOUNT_PREFIX = "claude-"


def _iso_now() -> str:
    return datetime.now(timezone.utc).isoformat(timespec="seconds")


def _parse_iso(ts: Optional[str]) -> Optional[datetime]:
    if not ts:
        return None
    try:
        if ts.endswith("Z"):
            ts = ts[:-1] + "+00:00"
        return datetime.fromisoformat(ts)
    except (ValueError, TypeError):
        return None


def _log_stderr(msg: str) -> None:
    print(f"[cpa_oauth_quota_poller] {msg}", file=sys.stderr, flush=True)


def _atomic_write_json(path: Path, data: Any) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    tmp = path.with_suffix(path.suffix + ".tmp")
    try:
        with tmp.open("w", encoding="utf-8") as f:
            json.dump(data, f, indent=2, ensure_ascii=False)
            f.flush()
            os.fsync(f.fileno())
        os.replace(tmp, path)
    finally:
        if tmp.exists():
            try:
                tmp.unlink()
            except OSError:
                pass


def _append_jsonl(path: Path, record: dict) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    line = json.dumps(record, ensure_ascii=False) + "\n"
    with path.open("a", encoding="utf-8") as f:
        f.write(line)
        f.flush()


def _load_state() -> dict:
    if not STATE_FILE.exists():
        return {"schema_version": 1, "last_updated": _iso_now(), "accounts": {}}
    try:
        with STATE_FILE.open("r", encoding="utf-8") as f:
            data = json.load(f)
        if not isinstance(data, dict) or "accounts" not in data:
            _log_stderr(f"State file malformed; resetting: {STATE_FILE}")
            return {"schema_version": 1, "last_updated": _iso_now(), "accounts": {}}
        return data
    except (json.JSONDecodeError, OSError) as e:
        _log_stderr(f"State load failed ({type(e).__name__}); resetting: {e}")
        return {"schema_version": 1, "last_updated": _iso_now(), "accounts": {}}


def _save_state(state: dict) -> None:
    state["last_updated"] = _iso_now()
    _atomic_write_json(STATE_FILE, state)


def _list_anthropic_accounts() -> list[Path]:
    if not AUTH_DIR.exists():
        return []
    return sorted(
        p
        for p in AUTH_DIR.glob(f"{CLAUDE_ACCOUNT_PREFIX}*.json")
        if p.is_file()
        and not p.name.startswith(
            ("claude-antigravity", "claude-codex", "claude-gemini")
        )
    )


def _account_key(auth_path: Path) -> str:
    return auth_path.stem


def _read_access_token(auth_path: Path) -> Optional[str]:
    try:
        with auth_path.open("r", encoding="utf-8") as f:
            data = json.load(f)
        token = data.get("access_token")
        if not isinstance(token, str) or not token.startswith("sk-ant-oat"):
            _log_stderr(f"Auth file invalid access_token: {auth_path.name}")
            return None
        return token
    except (json.JSONDecodeError, OSError) as e:
        _log_stderr(
            f"Auth file read failed ({type(e).__name__}): {auth_path.name}: {e}"
        )
        return None


def _select_account_for_tick(
    state: dict, accounts: list[Path], now: datetime
) -> Optional[Path]:
    eligible: list[tuple[float, Path]] = []
    for auth_path in accounts:
        key = _account_key(auth_path)
        rec = state["accounts"].get(key, {})
        unblock_ts = _parse_iso(rec.get("retry_after_unblock_ts"))
        if unblock_ts is not None and now < unblock_ts:
            continue
        last_probe = _parse_iso(rec.get("last_probe_ts"))
        sort_key = last_probe.timestamp() if last_probe else 0.0
        eligible.append((sort_key, auth_path))
    if not eligible:
        return None
    eligible.sort(key=lambda x: x[0])
    return eligible[0][1]


def _probe_anthropic_usage(
    access_token: str, probe_only: bool = False
) -> tuple[int, dict, dict]:
    if probe_only:
        payload = {
            "method": "GET",
            "url": ANTHROPIC_USAGE_URL,
            "headers": {
                "Authorization": "Bearer sk-ant-oat...<redacted>",
                "anthropic-beta": ANTHROPIC_BETA_HEADER,
                "User-Agent": "cpa-oauth-quota-poller/1.0",
            },
            "timeout_sec": REQUEST_TIMEOUT_SEC,
        }
        print(json.dumps({"probe_only": True, "request": payload}, indent=2))
        return 0, {}, {}

    req = urllib.request.Request(
        ANTHROPIC_USAGE_URL,
        method="GET",
        headers={
            "Authorization": f"Bearer {access_token}",
            "anthropic-beta": ANTHROPIC_BETA_HEADER,
            "User-Agent": "cpa-oauth-quota-poller/1.0",
            "Accept": "application/json",
        },
    )
    try:
        with urllib.request.urlopen(req, timeout=REQUEST_TIMEOUT_SEC) as resp:
            status = resp.status
            headers = dict(resp.headers)
            body_bytes = resp.read()
            try:
                body = json.loads(body_bytes.decode("utf-8")) if body_bytes else {}
            except (json.JSONDecodeError, UnicodeDecodeError):
                body = {"_raw": body_bytes.decode("utf-8", errors="replace")[:500]}
            return status, body, headers
    except urllib.error.HTTPError as e:
        status = e.code
        headers = dict(e.headers) if e.headers else {}
        try:
            body = json.loads(e.read().decode("utf-8"))
        except (json.JSONDecodeError, UnicodeDecodeError, AttributeError):
            body = {}
        return status, body, headers
    except urllib.error.URLError as e:
        _log_stderr(f"URLError: {e.reason}")
        return -1, {}, {}
    except (TimeoutError, OSError) as e:
        _log_stderr(f"Network error: {type(e).__name__}: {e}")
        return -1, {}, {}


def _normalize_anthropic_response(
    body: dict,
) -> tuple[Optional[dict], Optional[dict], Optional[str]]:
    """Normalize per Aperant usage-monitor.ts:2396-2411."""
    if "five_hour" in body or "seven_day" in body:
        fh = body.get("five_hour") or {}
        sd = body.get("seven_day") or {}
        five_hour = {
            "utilization": int(fh.get("utilization", 0)),
            "resets_at": fh.get("resets_at"),
        }
        seven_day = {
            "utilization": int(sd.get("utilization", 0)),
            "resets_at": sd.get("resets_at"),
        }
    elif "five_hour_utilization" in body or "seven_day_utilization" in body:
        five_hour = {
            "utilization": round(float(body.get("five_hour_utilization", 0)) * 100),
            "resets_at": body.get("five_hour_reset_at"),
        }
        seven_day = {
            "utilization": round(float(body.get("seven_day_utilization", 0)) * 100),
            "resets_at": body.get("seven_day_reset_at"),
        }
    else:
        return None, None, None

    limit_type = (
        "weekly" if seven_day["utilization"] > five_hour["utilization"] else "session"
    )
    return five_hour, seven_day, limit_type


def _parse_retry_after(headers: dict, default_sec: int = ACCOUNT_COOLDOWN_SEC) -> int:
    retry_after = headers.get("Retry-After") or headers.get("retry-after")
    if not retry_after:
        return default_sec
    try:
        return int(retry_after)
    except ValueError:
        try:
            target = parsedate_to_datetime(retry_after)
            delta = (target - datetime.now(timezone.utc)).total_seconds()
            return max(int(delta), 60)
        except (ValueError, TypeError):
            return default_sec


def _propagate_sibling_cooldown(state: dict, sibling_unblock_ts: datetime) -> None:
    """Per Aperant L2200-2216: 429 propagates 10min cooldown to siblings."""
    iso_unblock = sibling_unblock_ts.isoformat(timespec="seconds")
    for rec in state["accounts"].values():
        existing = _parse_iso(rec.get("retry_after_unblock_ts"))
        if existing is None or existing < sibling_unblock_ts:
            rec["retry_after_unblock_ts"] = iso_unblock


def _run_tick(probe_only: bool = False) -> int:
    start_ts = time.monotonic()
    state = _load_state()
    accounts = _list_anthropic_accounts()
    if not accounts:
        _log_stderr(f"No Anthropic accounts found in {AUTH_DIR}")
        return 0

    now = datetime.now(timezone.utc)
    selected = _select_account_for_tick(state, accounts, now)

    if selected is None:
        return 0

    key = _account_key(selected)
    access_token = _read_access_token(selected)
    if access_token is None:
        state["accounts"].setdefault(key, {})
        state["accounts"][key]["last_probe_ts"] = now.isoformat(timespec="seconds")
        state["accounts"][key]["retry_after_unblock_ts"] = (
            now + timedelta(seconds=API_FAILURE_COOLDOWN_SEC)
        ).isoformat(timespec="seconds")
        state["accounts"][key]["consecutive_failures"] = (
            state["accounts"][key].get("consecutive_failures", 0) + 1
        )
        _save_state(state)
        return 1

    if time.monotonic() - start_ts > TICK_BUDGET_SEC:
        _log_stderr("Tick budget exhausted before HTTP probe")
        return 2

    status_code, body, headers = _probe_anthropic_usage(
        access_token, probe_only=probe_only
    )

    if probe_only:
        return 0

    record_ts = _iso_now()
    state["accounts"].setdefault(key, {})
    rec = state["accounts"][key]
    rec["last_probe_ts"] = record_ts
    rec["last_status_code"] = status_code

    if status_code == 200:
        five_hour, seven_day, limit_type = _normalize_anthropic_response(body)
        if five_hour is None or seven_day is None:
            _log_stderr(f"Parse failed for {key}; body keys: {list(body.keys())[:5]}")
            jsonl_record = {
                "ts": record_ts,
                "account": key,
                "status_code": 200,
                "error_class": "parse_failure",
                "five_hour": None,
                "seven_day": None,
                "limit_type": None,
                "retry_after": None,
            }
            rec["consecutive_failures"] = rec.get("consecutive_failures", 0) + 1
            rec["retry_after_unblock_ts"] = (
                now + timedelta(seconds=API_FAILURE_COOLDOWN_SEC)
            ).isoformat(timespec="seconds")
        else:
            jsonl_record = {
                "ts": record_ts,
                "account": key,
                "status_code": 200,
                "five_hour": five_hour,
                "seven_day": seven_day,
                "limit_type": limit_type,
                "error_class": None,
                "retry_after": None,
            }
            rec["consecutive_failures"] = 0
            rec["last_five_hour_pct"] = five_hour["utilization"]
            rec["last_seven_day_pct"] = seven_day["utilization"]
            rec["retry_after_unblock_ts"] = (
                now + timedelta(seconds=ACCOUNT_COOLDOWN_SEC)
            ).isoformat(timespec="seconds")
        _append_jsonl(JSONL_FILE, jsonl_record)
        print(
            json.dumps(
                {
                    "ok": jsonl_record["error_class"] is None,
                    "account": key,
                    "ts": record_ts,
                    "status_code": 200,
                    "five_hour_pct": (five_hour or {}).get("utilization")
                    if five_hour
                    else None,
                    "seven_day_pct": (seven_day or {}).get("utilization")
                    if seven_day
                    else None,
                    "limit_type": limit_type,
                }
            )
        )

    elif status_code == 429:
        retry_after = _parse_retry_after(headers, default_sec=ACCOUNT_COOLDOWN_SEC)
        unblock = now + timedelta(seconds=retry_after)
        rec["retry_after_unblock_ts"] = unblock.isoformat(timespec="seconds")
        rec["consecutive_failures"] = 0
        sibling_unblock = now + timedelta(seconds=SIBLING_COOLDOWN_SEC)
        _propagate_sibling_cooldown(state, sibling_unblock)
        jsonl_record = {
            "ts": record_ts,
            "account": key,
            "status_code": 429,
            "five_hour": None,
            "seven_day": None,
            "limit_type": None,
            "error_class": "rate_limit_error",
            "retry_after": retry_after,
        }
        _append_jsonl(JSONL_FILE, jsonl_record)
        _log_stderr(
            f"429 for {key}; retry-after={retry_after}s; sibling-cooldown={SIBLING_COOLDOWN_SEC}s"
        )
        print(
            json.dumps(
                {
                    "ok": False,
                    "account": key,
                    "ts": record_ts,
                    "status_code": 429,
                    "retry_after": retry_after,
                }
            )
        )

    elif status_code in (401, 403):
        rec["last_auth_fail_ts"] = record_ts
        rec["consecutive_failures"] = rec.get("consecutive_failures", 0) + 1
        rec["retry_after_unblock_ts"] = (
            now + timedelta(seconds=ACCOUNT_COOLDOWN_SEC * 6)
        ).isoformat(timespec="seconds")
        jsonl_record = {
            "ts": record_ts,
            "account": key,
            "status_code": status_code,
            "five_hour": None,
            "seven_day": None,
            "limit_type": None,
            "error_class": "auth_failure",
            "retry_after": None,
        }
        _append_jsonl(JSONL_FILE, jsonl_record)
        _log_stderr(f"AUTH FAIL {status_code} for {key}; cooling down 6h")
        print(
            json.dumps(
                {
                    "ok": False,
                    "account": key,
                    "ts": record_ts,
                    "status_code": status_code,
                    "error_class": "auth_failure",
                }
            )
        )
        _save_state(state)
        return 3

    else:
        rec["consecutive_failures"] = rec.get("consecutive_failures", 0) + 1
        rec["retry_after_unblock_ts"] = (
            now + timedelta(seconds=API_FAILURE_COOLDOWN_SEC)
        ).isoformat(timespec="seconds")
        jsonl_record = {
            "ts": record_ts,
            "account": key,
            "status_code": status_code,
            "five_hour": None,
            "seven_day": None,
            "limit_type": None,
            "error_class": "other" if status_code > 0 else "network_error",
            "retry_after": None,
        }
        _append_jsonl(JSONL_FILE, jsonl_record)
        _log_stderr(f"Probe failed for {key}: status={status_code}")
        print(
            json.dumps(
                {
                    "ok": False,
                    "account": key,
                    "ts": record_ts,
                    "status_code": status_code,
                    "error_class": jsonl_record["error_class"],
                }
            )
        )

    _save_state(state)
    return 0


def _run_daemon() -> int:
    _log_stderr(f"Daemon mode start; stagger={STAGGER_INTERVAL_SEC}s")
    try:
        while True:
            try:
                _run_tick(probe_only=False)
            except Exception as e:  # noqa: BLE001 — daemon must survive any tick failure
                _log_stderr(f"Tick exception (continuing): {type(e).__name__}: {e}")
            time.sleep(STAGGER_INTERVAL_SEC)
    except KeyboardInterrupt:
        _log_stderr("Daemon interrupted")
        return 0


def main(argv: Optional[list[str]] = None) -> int:
    parser = argparse.ArgumentParser(
        prog="cpa_oauth_quota_poller",
        description=(
            "Per-account Anthropic OAuth /api/oauth/usage poller. "
            "Respects 1-call/hour Anthropic rate limit via staggered round-robin."
        ),
    )
    mode = parser.add_mutually_exclusive_group(required=True)
    mode.add_argument(
        "--tick",
        action="store_true",
        help="Single tick (probe ONE eligible account then exit).",
    )
    mode.add_argument(
        "--daemon", action="store_true", help="Daemon mode (loop with 7.5min stagger)."
    )
    mode.add_argument(
        "--probe-only",
        action="store_true",
        help="Dry-run: emit request payload structure without firing HTTP.",
    )
    args = parser.parse_args(argv)

    STATE_DIR.mkdir(parents=True, exist_ok=True)

    if args.probe_only:
        return _run_tick(probe_only=True)
    if args.tick:
        return _run_tick(probe_only=False)
    if args.daemon:
        return _run_daemon()
    return 0


if __name__ == "__main__":
    sys.exit(main())
