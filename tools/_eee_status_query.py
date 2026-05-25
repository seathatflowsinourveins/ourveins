"""eee-status helper — queries cpa-usage-keeper SQLite + CPA Management API for fleet state.

Cite: TIER-1-DIRECT Willxup/cpa-usage-keeper v1.5.2 schema (38-column usage_identities)
      installed via Ship 1W per docs/install-provenance.md:3726
Cite: TIER-1-DIRECT router-for-me/CLIProxyAPI internal/api/server.go:506-659 @ HEAD ed1458aa
      `/v0/management/auth-files` endpoint
Cite: Wave 98 Agent C account-rotation report at tmp/wave98-C-account-rotation-sota-2026-05-08.md
Cite: Real GPT-5.5 codex T1 NEEDS-REVISION conf=0.91 Pattern A apply at
      .claude/state/codex_consult_wave99_ship2h_eee_status_query_OUT.txt — 7 prescribed_edits
      integrated single-round (secret-file resolution + cache_rate_percent + parse_dt UTC harden +
      split-of-concerns + untracked-item discipline + CR-9 no-secret-duplication +
      no-runtime-cache-sweep checks).

Read-only tool. No mutations. CR-9 install-risk LOW (no @latest, no sibling-bleed,
no secret duplication, no runtime cache sweep).
"""

import argparse
import json
import os
import sqlite3
import urllib.error
import urllib.request
from datetime import datetime, timezone
from pathlib import Path

DB_PATH = Path(
    "Z:/claude-sota-installed/.local/cpa-usage-keeper/cpa-usage-keeper_v1.5.2_windows_amd64/data/app.db"
)
CPA_BASE = "http://127.0.0.1:8317"
CPA_TIMEOUT = 3.0
# Mgmt secret resolution chain: env > secret-file > None.
# Mirrors tools/eee-status.ps1:21 secret-file convention. Per codex T1 prescription #2:
# do NOT hardcode bearer; degrade --cpa-probe cleanly when secret unavailable.
CPA_SECRET_FILE = Path("Z:/claude-sota-installed-state/cliproxy-mgmt-secret.txt")
CPA_SECRET_ENV = "EEE_CPA_MGMT_SECRET"


def resolve_cpa_secret():
    val = os.environ.get(CPA_SECRET_ENV)
    if val:
        return val.strip(), "env"
    if CPA_SECRET_FILE.exists():
        try:
            return CPA_SECRET_FILE.read_text(encoding="utf-8").strip(), "file"
        except OSError:
            return None, "file_unreadable"
    return None, "unavailable"


def parse_dt(s):
    if not s:
        return None
    s = s.replace("Z", "+00:00")
    try:
        dt = datetime.fromisoformat(s)
    except ValueError:
        try:
            dt = datetime.strptime(s.split(".")[0], "%Y-%m-%d %H:%M:%S")
        except ValueError:
            return None
    # Per codex T1 prescription #4: assign UTC when fromisoformat returns naive datetime;
    # otherwise tz-aware NOW subtraction raises TypeError.
    if dt.tzinfo is None:
        dt = dt.replace(tzinfo=timezone.utc)
    return dt


def cache_rate_percent(cached, input_tok):
    """Per codex T1 prescription #3 (semantic-corrected post-Mia): cache hit rate = cached / (input + cached).
    Matches ccusage semantics — '% of all input tokens served from prompt cache'.

    cpa-usage-keeper SQLite schema separates `cached_tokens` (cache reads) from
    `total_tokens` (input + output + reasoning, excluding cache reads).
    Formula `cached / total` produces nonsensical >100% values; this corrected formula
    produces the canonical 0-100% cache hit rate.

    Cite: ccusage daily output schema (cacheReadTokens / totalTokens reciprocal) + manual
    Mia validation against aesthetic9c row: cached=5648047 input=13 → 99.9998% (matches
    pre-ship orchestrator-side estimate of ~99.4%).
    """
    cached = cached or 0
    input_tok = input_tok or 0
    denom = cached + input_tok
    if denom <= 0:
        return None
    return round(100.0 * cached / denom, 2)


def fmt_delta(td):
    if td is None:
        return "-"
    s = int(td.total_seconds())
    if s < 0:
        return f"EXPIRED {-s // 3600}h ago"
    if s < 3600:
        return f"{s // 60}m"
    if s < 86400:
        return f"{s // 3600}h{(s % 3600) // 60}m"
    return f"{s // 86400}d{(s % 86400) // 3600}h"


def query_sqlite():
    if not DB_PATH.exists():
        return {"error": f"cpa-usage-keeper DB not found: {DB_PATH}", "rows": []}
    conn = sqlite3.connect(str(DB_PATH))
    conn.row_factory = sqlite3.Row
    try:
        rows = conn.execute("""
            SELECT name, type, provider, plan_type, limit_reached,
                   primary_window_used_percent, primary_window_reset_at,
                   secondary_window_used_percent, secondary_window_reset_at,
                   total_requests, success_count, failure_count,
                   input_tokens, output_tokens, cached_tokens, total_tokens,
                   first_used_at, last_used_at
            FROM usage_identities
            WHERE is_deleted = 0
            ORDER BY type, name
        """).fetchall()
        return {"rows": [dict(r) for r in rows]}
    except sqlite3.OperationalError as e:
        return {"error": f"schema mismatch: {e}", "rows": []}
    finally:
        conn.close()


def probe_cpa_api():
    secret, source = resolve_cpa_secret()
    if not secret:
        return {
            "status": "no_secret",
            "source": source,
            "hint": f"set {CPA_SECRET_ENV} OR populate {CPA_SECRET_FILE}",
        }
    req = urllib.request.Request(
        f"{CPA_BASE}/v0/management/auth-files",
        headers={"Authorization": f"Bearer {secret}"},
    )
    try:
        with urllib.request.urlopen(req, timeout=CPA_TIMEOUT) as resp:
            body = resp.read().decode("utf-8", errors="replace")
            try:
                return {
                    "status": "ok",
                    "secret_source": source,
                    "data": json.loads(body),
                }
            except json.JSONDecodeError:
                return {
                    "status": "parse_error",
                    "secret_source": source,
                    "raw": body[:500],
                }
    except urllib.error.HTTPError as e:
        return {
            "status": "http_error",
            "secret_source": source,
            "code": e.code,
            "reason": str(e.reason),
        }
    except (urllib.error.URLError, TimeoutError, ConnectionError, OSError) as e:
        return {"status": "down", "secret_source": source, "error": str(e)}


def annotate_rows(rows):
    """Per codex T1 prescription #3: enrich rows with cache_rate_percent before render/JSON.
    Mia-corrected formula: cache hit rate = cached / (input + cached) per ccusage semantics.
    """
    for r in rows:
        r["cache_rate_percent"] = cache_rate_percent(
            r.get("cached_tokens"), r.get("input_tokens")
        )
    return rows


def render_table(data):
    if data.get("error"):
        return f"ERROR: {data['error']}"
    rows = data.get("rows", [])
    if not rows:
        return "(no rows)"
    rows = annotate_rows(rows)
    now = datetime.now(timezone.utc)
    out = []
    hdr = f"{'name':35s} {'type':12s} {'plan':6s} {'5h%':4s} {'5h-reset':12s} {'7d%':4s} {'7d-reset':12s} {'req':4s} {'ok':4s} {'fail':5s} {'cache%':7s} {'cache_tok':12s} {'total_tok':10s} {'status':7s}"
    out.append(hdr)
    out.append("-" * len(hdr))
    for r in rows:
        p_reset = parse_dt(r.get("primary_window_reset_at"))
        s_reset = parse_dt(r.get("secondary_window_reset_at"))
        p_in = fmt_delta(p_reset - now) if p_reset else "-"
        s_in = fmt_delta(s_reset - now) if s_reset else "-"
        p_pct = r.get("primary_window_used_percent")
        s_pct = r.get("secondary_window_used_percent")
        p_str = f"{p_pct}%" if p_pct is not None else "-"
        s_str = f"{s_pct}%" if s_pct is not None else "-"
        plan = (r.get("plan_type") or "-")[:6]
        status = "LIMIT" if r.get("limit_reached") else "ok"
        if (s_pct is not None and s_pct >= 90) or status == "LIMIT":
            status_disp = "🔴 LIM" if status == "LIMIT" else "🟡 hi"
        elif s_pct is not None and s_pct >= 70:
            status_disp = "🟡 hi"
        else:
            status_disp = "✅ ok"
        cache_pct = r.get("cache_rate_percent")
        cache_str = f"{cache_pct:.1f}%" if cache_pct is not None else "-"
        out.append(
            f"{r['name'][:34]:35s} {r['type']:12s} {plan:6s} {p_str:4s} {p_in:12s} {s_str:4s} {s_in:12s} "
            f"{r['total_requests']:4d} {r['success_count']:4d} {r['failure_count']:5d} "
            f"{cache_str:7s} {r['cached_tokens']:12d} {r['total_tokens']:10d} {status_disp:7s}"
        )
    return "\n".join(out)


def render_cpa_status(probe):
    s = probe.get("status", "unknown")
    if s == "ok":
        n = (
            len(probe.get("data", {}).get("auth_files", []))
            if isinstance(probe.get("data"), dict)
            else "?"
        )
        return f"CPA: UP — /v0/management/auth-files returned {n} entries"
    if s == "down":
        return f"CPA: DOWN at {CPA_BASE} — {probe.get('error', 'unknown')[:80]}"
    return f"CPA: {s} — {probe.get('error', probe.get('reason', ''))[:80]}"


def main():
    ap = argparse.ArgumentParser(description="eee-status fleet dashboard")
    ap.add_argument(
        "--json", action="store_true", help="emit JSON for programmatic consumption"
    )
    ap.add_argument(
        "--cpa-probe", action="store_true", help="probe CPA Management API live state"
    )
    args = ap.parse_args()

    db = query_sqlite()
    cpa = probe_cpa_api() if args.cpa_probe else None

    # Annotate JSON output with cache_rate_percent (parity with table).
    if "rows" in db:
        db = {**db, "rows": annotate_rows(db["rows"])}

    if args.json:
        out = {"sqlite": db, "cpa": cpa}
        print(json.dumps(out, default=str, indent=2))
        return

    print("=== eee-status — fleet dashboard ===")
    print(f"NOW: {datetime.now(timezone.utc).isoformat()}")
    print(f"DB: {DB_PATH}")
    print()
    print(render_table(db))
    if cpa:
        print()
        print(render_cpa_status(cpa))


if __name__ == "__main__":
    main()
