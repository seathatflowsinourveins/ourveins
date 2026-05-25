# accounts/state/ — pointer to state-outside-repo (NOT a credential store)

**This folder is INTENTIONALLY EMPTY in the git tree.** Account state (OAuth tokens, quota JSONLs, refresh tokens) lives at the canonical state-outside-repo location.

## Canonical state location

Per `CLAUDE.local.md` ENV (f) state-outside-repo redirects discipline + Mia caught FM-20 row 18 dual-source-drift sub-class (W188 P1 codification 2026-05-14):

```
Z:/claude-sota-installed-state/accounts/
├── cpa_oauth_quota.jsonl       ← per-account /api/oauth/usage poller telemetry
└── cpa_oauth_quota_state.json  ← last-poll-time tracker (atomic write)
```

Configured via `STATE_DIR` env override at `accounts/scripts/poll_all.py:57`:

```python
STATE_DIR = Path(os.environ.get("CLAUDE_SOTA_ACCOUNTS_DIR", "Z:/claude-sota-installed-state/accounts"))
```

## Why state-outside-repo for credentials

1. **Credential-class hygiene** — OAuth `access_token` / `refresh_token` / `id_token` MUST NOT enter git history. Per `Z:/claude-sota-installed/.claude/rules/named-failure-modes.md` FM-20 row 17 token-rotation-burned-by-probe (W185 evidence): direct probes to `/v1/oauth/token` rotate refresh tokens at upstream and consumer-side; durable storage outside git tree prevents accidental commit.
2. **`.claude/state/*.jsonl` is gitignored** but state-outside-repo provides additional defense + cross-session-arc continuity per `Z:/claude-sota-installed/.claude/rules/sessionstart-preload-discipline.md` 5-backend hash verify.
3. **Single-source preferred per FM-20 row 18 W188** — dual-declared paths cause silent drift; `STATE_DIR` env override is the SINGLE authoritative source.

## CPA auth files (NOT in this folder)

OAuth credential files (per-account auth JSON with access_token + refresh_token + id_token) are managed by CLIProxyAPI itself at:

```
Z:/claude-sota-installed-state/.cli-proxy-api/
└── claude-*.json   ← per-account OAuth state (CPA-managed)
```

These are written/rotated by CPA OAuth callback at `POST /v0/management/oauth-callback` per `Z:/repos/deps/CLIProxyAPI/internal/api/server.go:657 @ HEAD 785b00c3`. **NEVER manually edit.** Recovery for token-rotation-burn: operator browser SPA re-auth via `http://127.0.0.1:18317/management.html` (CPA Management Center, bundled v6.0.19+).

## CPA management secret (NOT in this folder)

Bearer token for `/v0/management/*` API:

```
Z:/claude-sota-installed-state/cliproxy-mgmt-secret.txt
```

Required by `Authorization: Bearer <secret>` header on every `accounts/scripts/poll_all.py` HTTP call to CPA mgmt API.

## Audit-trail telemetry visibility

For SessionStart-preload visibility (per `sessionstart-preload-discipline.md §The contract` step 4 5-backend hash verify): tail the canonical state location:

```bash
tail -1 Z:/claude-sota-installed-state/accounts/cpa_oauth_quota.jsonl | jq .
```

## Cite anchors

- `CLAUDE.local.md` ENV (f) — state-outside-repo redirect discipline
- `Z:/claude-sota-installed/.claude/rules/named-failure-modes.md` FM-20 row 17 + row 18
- `Z:/repos/deps/CLIProxyAPI/internal/api/server.go:657 @ HEAD 785b00c3` — OAuth callback endpoint
