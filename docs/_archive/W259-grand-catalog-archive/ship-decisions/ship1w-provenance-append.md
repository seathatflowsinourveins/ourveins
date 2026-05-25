

## 2026-05-08 Wave 91 Ship 1W — Aperant-derived rate-limit poller for cpa-usage-keeper (CLOSES the 0/10 active-polling gap; NEEDS-REVISION conf=0.86 Pattern A FIX-FORWARD)

### Origin
User directive 2026-05-08: "ship with convergence insights and repos offical docs guide etc, launch advance dagent team... continue line by line audit and optimization... please always using gpt5.5 fully e2e before commit."

Ship 1W closes the gap surfaced by Wave 87+90: cpa-usage-keeper SQLite has rate-limit schema columns but 0/10 identities populated. CPA passively counted proxy traffic without polling upstream usage APIs. Wave 89 Ship 1Y unleash + Wave 90 schema discovery enabled the actual implementation.

### Cross-model T1 gate (real GPT-5.5 e2e via codex CLI foreground+tee; NEEDS-REVISION fix-forward)

- Pre-edit: T1 gate WARN (Wave 90 synthesis covered Ship 1W intent but not specific filename `tools/aperant_rate_limit_poller.py`)
- Smoke probe v1 (--dry-run): 8/8 polls succeeded
- Codex T1 e2e on actual code: NEEDS-REVISION conf=0.86 / FIX-FORWARD-AND-PROCEED / 4 findings (2 P2 + 2 P3)
- Verdict-on-file: `.claude/state/codex_consult_ship_1w_aperant_poller_OUT.txt`

### Pattern A fix-forward (4/4 findings closed in single atomic apply per `codex-t1-fix-forward-pattern.md` Pattern A)

| ID | Sev | Concern | Resolution |
|---|---|---|---|
| F-1 | P2 | Codex `reset_at` is Unix epoch but stored as string in datetime column (SQLite mismatch with Anthropic ISO-8601) | Added `unix_to_iso8601()` helper; Codex `primary_reset_at` + `secondary_reset_at` now normalized to UTC ISO-8601 before SQLite write |
| F-2 | P2 | `--stop` uses `os.kill(SIGTERM)` which is not graceful on Windows (skips finally cleanup; can interrupt SQLite write) | Replaced with cooperative shutdown via stop-sentinel file (`<pid_file>.stop`); `--start` loop checks sentinel between iterations + every 1s during sleep window for granular cooperative shutdown |
| F-3 | P3 | `update_cpa_sqlite` increments `updated` after every UPDATE without checking `cursor.rowcount` (would false-positive on name/provider mismatch) | Capture `cur = conn.execute(...)`; check `cur.rowcount >= 1`; track `no_match` counter separately + emit error record for unmatched rows |
| F-4 | P3 | `poll_codex` doesn't parse `credits` object (intentional since cpa-usage-keeper has no credits columns; should explicitly capture for JSONL telemetry) | Added `credits_balance` + `credits_unlimited` + `credits_has_credits` to `PollResult`; emitted to JSONL records (NOT SQLite — explicitly documented) |

### Live operational verification (post-fix-forward)

```
python3 tools/aperant_rate_limit_poller.py --once
{
  "ts": "2026-05-08T17:49:57.363390+00:00",
  "polled": 8,
  "ok": 8,
  "errors": [],
  "update_stats": {"updated": 8, "no_match": 0, "skipped": 0, "errors": []},
  "dry_run": false
}
```

**SQLite verification**: 8/10 identities now have rate-limit data populated (was 0/10):
- 7 Claude accounts: primary_window (5h util) + secondary_window (7d util) + reset timestamps
- 1 Codex Pro: primary + secondary + plan_type='pro' + limit_reached
- 2 idle accounts (antigravity + gemini): no public usage API per Aperant doc

### Code structure (270 LOC)

| Section | Purpose | Lines |
|---|---|---|
| TIER-1 cite chain in docstring | CR-1 cite anchor (Aperant + live URLs) | 1-30 |
| Constants | OAuth client IDs + endpoint URLs from Aperant doc §1.4 + §3.1 | 31-46 |
| `PollResult` dataclass | Schema-normalized poll output (post-F-1+F-4 expansion) | 49-71 |
| `unix_to_iso8601()` helper (NEW per F-1) | Normalize Codex Unix-seconds to UTC ISO-8601 | 73-83 |
| `http_get_json()` | Generic HTTP-GET-JSON with HTTPError handling | 86-103 |
| `poll_anthropic()` | `/api/oauth/usage` poller using LIVE `five_hour`/`seven_day`/`extra_usage` schema | 106-146 |
| `poll_codex()` | `/backend-api/wham/usage` poller; F-1 normalized reset_at; F-4 credits captured | 149-194 |
| `update_cpa_sqlite()` | SQL UPDATE with F-3 rowcount-tracking | 197-246 |
| `append_jsonl()` | JSONL record append with parents.mkdir | 249-253 |
| `poll_once()` | Single-poll orchestration | 256-289 |
| `main()` argparse + cron loop | --once / --start / --stop / --dry-run; F-2 cooperative shutdown via sentinel | 292-368 |

### TIER-1 SOTA cite chain (live-verified by Wave 90 + smoke probe)

- **TIER-1**: `Z:/repos/deps/Aperant/CODEX_RATE_LIMITS_RESEARCH.md @ HEAD cba7a027` — endpoint URLs + OAuth client IDs §1.4+§3.1; Codex schema §1.2 MATCHES live; Anthropic schema documented in Aperant is OUTDATED (live is `five_hour`/`seven_day`/`extra_usage`)
- **TIER-1**: `https://api.anthropic.com/api/oauth/usage` (live; verified Wave 90 Agent A + Wave 91 inline polling)
- **TIER-1**: `https://chatgpt.com/backend-api/wham/usage` (live; matches Aperant doc)
- **TIER-1**: `https://console.anthropic.com/v1/oauth/token` (token refresh endpoint per Aperant §3.1)
- **TIER-1**: `https://auth.openai.com/oauth/token` (Codex token refresh)
- **TIER-2**: cpa-usage-keeper v1.5.2 SQLite at `.local/cpa-usage-keeper/cpa-usage-keeper_v1.5.2_windows_amd64/data/app.db` (38-column `usage_identities` table; rate-limit columns now POPULATED 8/10)

### Operational use (next-fire candidates)

| Mode | Command | Use |
|---|---|---|
| Single poll + log | `python tools/aperant_rate_limit_poller.py --once` | Manual probe; populates SQLite + JSONL |
| Dry-run preview | `python tools/aperant_rate_limit_poller.py --once --dry-run` | Validate without SQLite UPDATE |
| Cron loop | `python tools/aperant_rate_limit_poller.py --start --interval-seconds 60` | Production 60s polling |
| Cooperative stop | `python tools/aperant_rate_limit_poller.py --stop` | Graceful shutdown via sentinel file (Windows-safe per F-2) |

**Recommended deployment** (separate fire — Wave 91 ships the script only):
- Schedule via Windows Task Scheduler OR cwc-long-running-agents track-read.sh OR pm2-windows-startup
- Monitor `Z:/claude-sota-installed/.claude/state/aperant_poller.jsonl` for fleet health drift
- CLIProxyAPI consumer (Ship 1X) reads `usage_identities` via cpa-usage-keeper API to inform proactive routing

### Mia pre-apply (4/4 PASS via smoke probe + SQLite verify)

1. **Anthropic schema correctness**: `five_hour.utilization` and `seven_day.utilization` parsed correctly into `primary_used_percent` / `secondary_used_percent` — verified by 7/7 Claude accounts populated with realistic values (4%, 14%, 3%, 0%, 29%, 0%, 0% on 5h)
2. **Codex schema correctness**: `primary_window.used_percent` (8%), `secondary_window.used_percent` (25%), `plan_type='pro'` — all populated correctly
3. **F-1 ISO-8601 normalization**: Codex `2026-05-08T19:17:09+00:00` (was Unix `1778267829`) — `unix_to_iso8601()` working
4. **F-3 rowcount discipline**: `no_match=0` confirmed all 8 UPDATEs hit existing rows; would have caught typos in `name` or `provider` keys

### Ship 1X (NEXT-FIRE) — CLIProxyAPI cycle-aware-fill-first now UNBLOCKED

With Ship 1W populating `usage_identities.primary_window_used_percent` + `secondary_window_used_percent` continuously, Ship 1X (modify CLIProxyAPI selector to skip accounts where `secondary > 80%` threshold) becomes implementable. Ship 1X depends on Ship 1W landing first — that dependency now satisfied.

### Cite chain (TIER-1 → TIER-3)

- **TIER-1**: `Z:/repos/deps/Aperant/CODEX_RATE_LIMITS_RESEARCH.md @ HEAD cba7a027` (endpoints + OAuth client IDs)
- **TIER-1**: `https://api.anthropic.com/api/oauth/usage` (LIVE-verified 2026-05-08T17:44 + 17:49 UTC)
- **TIER-1**: `https://chatgpt.com/backend-api/wham/usage` (LIVE-verified)
- **TIER-1 carry-forward**: `Z:/repos/deps/codex/codex-rs/core/src/config/config_tests.rs:842,1438,1572 @ HEAD 993e3f40` (Wave 89 Ship 1Y unleash cite chain — enabled this Ship)
- **TIER-3-LOCAL**: `tools/aperant_rate_limit_poller.py` (270 LOC; smoke-probe-VERIFIED; 8/8 SQLite UPDATEs)
- **TIER-3-LOCAL**: `.claude/state/codex_consult_ship_1w_aperant_poller_OUT.txt` (codex T1 NEEDS-REVISION conf=0.86 / 4 findings / Pattern A fix-forward applied)
- **TIER-3-LOCAL**: `.claude/state/aperant_poller.jsonl` (live JSONL telemetry; appended each poll)
- **TIER-3-LOCAL**: `tmp/wave91-fleet-snapshot.json` (gitignored Wave 91 baseline snapshot)

### IMPACT on operational gap that motivated Wave 87+90+91

| Question | Pre-Wave-91 | Post-Wave-91 |
|---|---|---|
| How many accounts have rate-limit data populated? | 0/10 | 8/10 (2 idle without public API) |
| Can fleet routing know which accounts are MAXED before 429? | NO (reactive only) | YES (Ship 1W populates; Ship 1X consumes) |
| What's today's 4-failed-of-6 root cause? | UNKNOWN | KNOWN: 3 Claude accounts WEEKLY-MAXED |
| Does cpa-usage-keeper passive-vs-active-polling gap close? | NO | YES (Ship 1W is the active poller) |

Wave 91 Ship 1W satisfies cardinal-rule-1+3+7+9+10+11.
- CR-1: TIER-1 cite chain at file:line + HEAD SHA + LIVE API endpoints
- CR-3: cross-model gate via real GPT-5.5 codex T1 e2e BEFORE commit; NEEDS-REVISION conf=0.86 4-finding Pattern A fix-forward applied; smoke-probe-verified post-fix
- CR-7: Phase 3 graduated unleash ENABLED this ship (Wave 89 Ship 1Y unleash multiplier)
- CR-9: install-risk MEDIUM (read-only API + bounded SQLite UPDATE; reversible via stop-sentinel + git revert; no destructive ops)
- CR-10: research-first via Wave 87+90 + Aperant deep-dive + live polling discovery
- CR-11: META-process SOTA: Pattern A apply + Mia pre-apply (live polling = highest-fidelity probe) + provenance log + GPT-5.5 e2e BEFORE commit per user mandate
