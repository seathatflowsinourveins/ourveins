# accounts/ — 3 weekly-reset utilization goals (W190 user-approved scope)

Per user W190 AskUserQuestion selection: `Surface remaining utilization budget per account (status display)` + `Routing-rebalance hint (which account to prefer next)` + `Pre-reset burst-utilization warning (use-it-or-lose-it alert)`. The `Auto-cooldown disabled accounts at 90%+ utilization` option was NOT selected (per CR-9 install-risk — active intervention deferred to future fire).

## Goal 1 — Status display

**Purpose**: surface remaining utilization budget per account for operator visibility.

**Invocation**: `python accounts/scripts/weekly_reset_guard.py --status`

**Output shape** (per Anthropic OAuth `/api/oauth/usage` response schema):

```
=== Account fleet utilization (probed N hours ago) ===
acct  email                              5h_util  7d_util  5h_resets_at         7d_resets_at         status
1     claude-739955940fc@gmail.com       56%      45%      2026-05-14T04:00Z    2026-05-17T06:00Z    OK
2     claude-XXXXXX@gmail.com            ...
```

**Data source**: tail-N rows of `Z:/claude-sota-installed-state/accounts/cpa_oauth_quota.jsonl` (canonical state-outside-repo location per CLAUDE.local.md ENV (f); script writes there via `STATE_DIR` env override default at `accounts/scripts/poll_all.py:57`).

## Goal 2 — Routing-rebalance hint

**Purpose**: rank accounts by remaining 7d budget — the **Anthropic `/api/oauth/usage` schema field directly**, NOT a derived composite — to recommend priority order for CPA round-robin routing strategy.

**Invocation**: `python accounts/scripts/weekly_reset_guard.py --hint`

**Ranking key (pure SOTA — no self-invented formula per CR-8 strict reading)**:
- `remaining_7d = (100 - seven_day.utilization) / 100` (Anthropic OAuth schema field)
- Sort descending by `remaining_7d`
- `hours_to_7d_reset` shown as **display column for operator judgment** — NOT folded into the sort key

**Why no composite score**: W190-fixforward removed the prior `remaining_7d × (1/log(hours_until_reset + 1))` composite scoring per CR-8 ("No novel content of any class") + user directive "rather than self invent". CR-10 research confirmed CLIProxyAPI's `priority` field is a static operator-set integer per `auth_files.go:336-453,1124 @ HEAD 785b00c3` — no upstream SOTA repo provides utilization-aware composite scoring. Operator judgment (looking at `hrs_to_7d_reset` column) replaces baked-in time-discount weighting.

**Operator action**: PATCH `/v0/management/auth-files/fields` with `priority` field per CPA `internal/api/server.go:649 @ HEAD 785b00c3`. Manual decision — script outputs hint only, does NOT auto-PATCH.

**Output shape**:

```
=== Routing-rebalance hint (8 accounts ranked by remaining 7d budget) ===
rank  email                              rem_7d   hrs_to_7d_reset
1     claude-XXX                         62%      58.0h
2     claude-YYY                         55%      42.0h
...
```

## Goal 3 — Pre-reset burst-utilization warning

**Purpose**: detect "use-it-or-lose-it" opportunities — when an account has substantial remaining budget but reset is imminent.

**Invocation**: `python accounts/scripts/weekly_reset_guard.py --burst-check`

**Trigger condition**: `(seven_day.resets_at - now) < BURST_RESET_WINDOW_H` AND `seven_day.utilization < BURST_UTIL_THRESHOLD`

**Thresholds (env-overridable per W175 P6 cited SOTA-sanctioned pattern)**:
- `BURST_RESET_WINDOW_H` — default 24 (hours)
- `BURST_UTIL_THRESHOLD` — default 60 (utilization %)

**Cite-class for thresholds**: env-override MECHANISM is TIER-1-DIRECT cited (`.claude/hooks/scripts/userpromptsubmit_compact_threshold.py:27-29` — "official sanctioned mechanism"). Default values are TIER-3-LOCAL-OPERATOR-DERIVED tuning knobs marked NOVEL-DOCUMENTED-EXCEPTION per CR-8 conformance column — every threshold-based alert needs a bootstrap default; operator tunes via env without code edit.

**Output shape**:

```
=== Pre-reset burst-utilization warnings ===
[ALERT] claude-XXX@gmail.com: 40% budget unused, 7d resets in 18h (use-it-or-lose-it)
[INFO]  claude-YYY@gmail.com: 78% utilized, 7d resets in 22h (no action)
[OK]    6 other accounts: outside 24h reset window
```

**Operator action**: route LARGE/EXPLORATORY work to flagged account before its reset window. Script informational only.

## Exit codes

| Mode | Exit 0 | Exit 1 | Exit 2 |
|---|---|---|---|
| `--status` | success | state-outside-repo unreadable | stale state (>24h old) |
| `--hint` | <8 accounts ranked | state corrupt | n/a |
| `--burst-check` | 0 alerts | ≥1 alert (for cron-mode alerting) | state unreadable |

## Cite anchors

- Anthropic OAuth usage response schema: per W187 §6.1 + Aperant `usage-monitor.ts:2387-2410 @ HEAD <aperant-sha>` (cite-class only)
- CPA priority PATCH endpoint: `Z:/repos/deps/CLIProxyAPI/internal/api/server.go:649 @ HEAD 785b00c3`
- CR-9 install-risk: passive observation only (Auto-cooldown explicitly REJECTED per W190 user-question — higher reversibility risk, queued for n=2 fix-forward future ship)

## CR-12 disposition

**GENUINELY-NEW** for claude-sota-installed runtime — no incumbent weekly-reset utilization-rebalance script exists. Adapted from Aperant usage-monitor.ts cooldown semantics (cite-class only, NOT install-class).
