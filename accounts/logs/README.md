# accounts/logs/ — pointer to runtime log locations

Logs are gitignored runtime state (NOT committed). This doc maps logical name → on-disk path for operator visibility.

## CLIProxyAPI logs (PRIMARY)

`Z:/claude-sota-installed/.cli-proxy-api/logs/main.log` — request-by-request audit trail with session-affinity tracking, per-account 429 events, token-refresh events. Mineable for cache-hit rate (session-affinity hits = cache reuse signal). Per `Z:/repos/deps/CLIProxyAPI/internal/api/server.go:561 @ HEAD 785b00c3` `GET /v0/management/logs` exposes via mgmt API (~5.8MB returned per W187 probe).

## cpa-usage-keeper logs

`Z:/claude-sota-installed/.local/cpa-usage-keeper/cpa-usage-keeper_v1.5.3_windows_amd64/data/app.db` — SQLite (when daemon started). Per-account aggregates + pricing + 168h auth-session TTL. Not yet auto-started in eee runtime.

## poll_all.py telemetry

`Z:/claude-sota-installed-state/accounts/cpa_oauth_quota.jsonl` — per-account /api/oauth/usage poll records (state-outside-repo per CLAUDE.local.md ENV (f)). Tail format per `accounts/scripts/poll_all.py:7` docstring.

## aperant_poller.jsonl (RETIRED)

`Z:/claude-sota-installed/.claude/state/aperant_poller.jsonl` — 24.7MB legacy telemetry from W156 aperant daemon-mode before retirement at commit `a995498` (CR-5/CR-10/CR-12 violations). Read-only archaeology only; not actively appended.

## ccusage local logs

`~/.claude/projects/**/*.jsonl` (per CLAUDE_CONFIG_DIR=`Z:/claude-sota-installed/.claude/projects/`) — Claude Code session transcripts. ccusage CLI reads these for daily/weekly/session/blocks token accounting.

## codex logs

`Z:/claude-sota-installed-state/.codex/sessions/` (per CODEX_HOME ENV (f)) — codex CLI session JSONL transcripts.

## Operator access

```bash
# Tail CPA primary log (last 50 lines)
tail -n 50 Z:/claude-sota-installed/.cli-proxy-api/logs/main.log

# CPA logs via mgmt API
curl -s -H "Authorization: Bearer $(cat Z:/claude-sota-installed-state/cliproxy-mgmt-secret.txt)" \
  http://127.0.0.1:18317/v0/management/logs | head -200

# poll_all.py latest fleet status
python accounts/scripts/weekly_reset_guard.py --status

# Unified token-efficiency view (NEW W190 expansion)
python accounts/scripts/token_efficiency.py
```

## Cite anchors

- CPA `GET /v0/management/logs` + `/request-error-logs` per `internal/api/server.go:561-564 @ HEAD 785b00c3`
- cpa-usage-keeper SQLite + dashboard per `.local/cpa-usage-keeper/cpa-usage-keeper_v1.5.3_windows_amd64/README.en.md:1-40 @ v1.5.3`
- ccusage JSONL source per `Z:/repos/deps/ccusage/apps/ccusage/src/_session-blocks.ts:8 @ HEAD 1a4bd69b`
