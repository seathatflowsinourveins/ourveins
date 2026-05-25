# accounts/ — Anthropic-Max 8x OAuth fleet + token-efficiency + reset utilization

Top-level consolidation per W190 design (Option B). Operator-facing scripts + SOTA cite anchors + state pointer.

## Layout

```
accounts/
├── README.md                ← this file
├── scripts/                 ← operator-invocable (git-tracked)
│   ├── poll_all.py          ← MAIN: per-account /api/oauth/usage poller (was scripts/cpa_oauth_quota_poller.py, 17.5KB)
│   ├── cache_rate.py        ← CPA cache-rate query (was tools/cpa-cache-rate.py)
│   ├── fleet_status.ps1     ← PowerShell operator launcher (was tools/fleet-status.ps1)
│   └── weekly_reset_guard.py ← NEW W190: 3 reset goals (status / routing-hint / pre-reset-burst)
├── docs/
│   ├── sota-cite-anchors.md ← TIER-1-DIRECT cite trail (CLIProxyAPI + Anthropic OAuth + Aperant + codex /wham + ccusage)
│   ├── reset-goals.md       ← 3 reset goal semantics (per W190 user-approved scope)
│   └── repos.md             ← SOTA-installed repo paths (CLIProxyAPI / cpa-usage-keeper / ccusage / Aperant cite-only)
└── state/
    └── README.md            ← state-outside-repo pointer (per CLAUDE.local.md ENV (f))
```

## Quick reference

| Surface | How to access | Endpoint / file:line |
|---|---|---|
| All 8 OAuth accounts (fleet view) | `GET http://127.0.0.1:18317/v0/management/auth-files` | CPA `internal/api/server.go:642 @ HEAD 785b00c3` |
| Per-account 5h + 7d utilization + resets_at | `python accounts/scripts/poll_all.py --tick` | Anthropic `/api/oauth/usage` |
| Cache hit rate | `python accounts/scripts/cache_rate.py` | CPA `/v0/management/api-key-usage` + `/usage-queue` |
| Routing strategy / status | `pwsh accounts/scripts/fleet_status.ps1` | CPA `/routing/strategy` + `/auth-files` |
| Weekly-reset utilization goal (status display) | `python accounts/scripts/weekly_reset_guard.py --status` | state-outside-repo JSONL tail |
| Routing-rebalance hint (which account to prefer) | `python accounts/scripts/weekly_reset_guard.py --hint` | Ranks by remaining 7d budget (Anthropic OAuth schema field — pure SOTA, no composite); `hrs_to_7d_reset` shown for operator judgment |
| Pre-reset burst-utilization warning | `python accounts/scripts/weekly_reset_guard.py --burst-check` | Alerts when resets_at <`BURST_RESET_WINDOW_H` (default 24h, env-overridable) AND utilization <`BURST_UTIL_THRESHOLD` (default 60%, env-overridable) |
| Local Claude Code token usage | `npx @ccusage/ccusage daily \| weekly \| session \| blocks` | `@ccusage/mcp@18.0.11` wired in .mcp.json |
| Management Center SPA | http://127.0.0.1:18317/management.html | CPA `internal/config/config.go:23` |

## Cite-class lattice

Per `.claude/rules/citation-discipline.md` rule #8:
`constituents=[TIER-1-DIRECT @ docs/sota-cite-anchors.md upstream cites, TIER-3-LOCAL-COMPOSITION @ accounts/ folder assembly]; effective_tier=TIER-3-LOCAL-COMPOSITION` per MIN_PRECEDENCE.

## Provenance

- W187 SOTA accounts-fetch-methods enumeration: `tmp/wave187-sota-accounts-fetch-methods-research-2026-05-13.md`
- W188 P0a poll_all.py architect design: `tmp/w188-C-design-2026-05-13.md`
- W185 OAuth fleet RESTORED 8/8: `tmp/wave185-accounts-report-2026-05-13.md`
- W190 META-audit of decision-framework: `tmp/wave190-meta-audit-decision-framework-2026-05-14.md`

CR-12 disposition: **GENUINELY-NEW** consolidation (no incumbent top-level accounts folder pre-W190).
