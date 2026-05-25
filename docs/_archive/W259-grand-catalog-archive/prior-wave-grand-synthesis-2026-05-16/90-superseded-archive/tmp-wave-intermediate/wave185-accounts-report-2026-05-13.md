---
title: W185 F1 — Comprehensive Accounts Information + OAuth Fleet Forensic
status: AUTHORITATIVE
date: 2026-05-13
wave: 185
fire: 1
verdict: 0/8 Anthropic Max OAuth recoverable — ALL require browser re-grant via CPA Management Center
trigger: user request "continue all with eee full sota setup, and give me all accounts information"
---

# W185 F1 — Accounts Report (live probe 2026-05-13T21:35 EDT)

## Executive verdict

**0/8 Anthropic Max OAuth recoverable programmatically.** All 7 active refresh_tokens returned `invalid_grant: Refresh token not found or invalid` from `https://api.anthropic.com/v1/oauth/token`. 1 was already disabled. Recovery path: operator browser OAuth re-grant via http://127.0.0.1:18317/management.html per account.

## Root-cause forensic — FM-20 candidate row 17 (token-rotation-without-persist)

| Phase | Time | Action | Token state |
|---|---|---|---|
| Pre-Wave-184 | 19:13 EDT | CPA last successful refresh — wrote RT_A to disk | RT_A valid |
| Wave 184 Fire 1 probe | 21:20 EDT | My direct POST to `/v1/oauth/token` with RT_A → 200 + new RT_B returned in response body | RT_A consumed (Anthropic rotated); RT_B is new valid token |
| Compact boundary | 21:32 EDT | Session compacted; in-memory RT_B values lost (never written to disk) | RT_B lost; disk still has RT_A |
| Wave 185 Fire 1 probe | 21:35 EDT | My probe with RT_A → 400 invalid_grant | RT_A revoked; RT_B unknown; chain broken |

**Anthropic OAuth refresh-token rotation policy** (TIER-1-DIRECT verified by behavior): each `/v1/oauth/token` call consumes the supplied RT and issues a fresh RT in the response. Caller MUST persist the new RT atomically or the chain breaks.

Sub-class: **token-rotation-burned-by-probe** — distinct from rows 1-16. Mechanism: agent-side probe consumed rotating RT without persistence; on session resume, disk RT now revoked. Codify as FM-20 row 17 in `Z:/claude-sota-installed/.claude/rules/fm20-path-drift-cascade.md`.

**Defense for future**: any direct `/v1/oauth/token` probe MUST write fresh tokens to disk atomically in the SAME tool call. Never separate "probe" and "save" across turns or sessions.

## All 10 identities — comprehensive table

### A. Anthropic Max OAuth fleet (8 accounts)

| # | Email | Priority | Provider | Mtime | Disk State | Recovery |
|---|---|---|---|---|---|---|
| 1 | 739955940fc@gmail.com | P0 | claude | 5/13 19:13 | RT REVOKED (HTTP 400 invalid_grant) | Browser OAuth re-grant via CPA mgmt |
| 2 | aesthetic9c@gmail.com | P10 | claude | 5/13 19:13 | RT REVOKED | Browser re-grant |
| 3 | avantmanifest@gmail.com | P0 | claude | 5/13 19:13 | RT REVOKED | Browser re-grant |
| 4 | dreamweaverhoudini@gmail.com | P10 | claude | 5/13 19:13 | RT REVOKED | Browser re-grant |
| 5 | mr.euphoriaincarnate@gmail.com | P10 | claude | 5/13 19:13 | RT REVOKED | Browser re-grant |
| 6 | nalawowac@gmail.com | P10 | claude | 5/13 19:13 | RT REVOKED | Browser re-grant |
| 7 | readingcodingandbeyond@gmail.com | P10 [DIS] | claude | (pre-disabled) | RT REVOKED + DISABLED | Browser re-grant (--force-fresh equivalent via SPA) |
| 8 | zfan7@sva.edu | P10 | claude | 5/13 19:13 | RT REVOKED | Browser re-grant |

Reset times (W180 F-final 18:14 EDT snapshot, 16h+ stale; aperant DEAD precludes fresh data):
- dreamweaverhoudini@: 7d-reset 2026-05-18T15:00 UTC (5 days out)
- mr.euphoriaincarnate@: 7d-reset 2026-05-15T04:00 UTC (~2 days out — soonest 7d)
- nalawowac@: 7d-reset 2026-05-13T03:00 UTC (passed)
- zfan7@sva.edu: 7d-reset 2026-05-16T03:00 UTC (~3 days; extra=100% billing-cap pinned)
- 4 others: unknown (no aperant data)

**Reset times are MOOT until RTs restored.** No traffic → no quota consumption → resets don't matter until OAuth chain is rebuilt.

### B. Adjacent identities (not in CCC fleet)

| # | Identity | Type | Mtime | State |
|---|---|---|---|---|
| 9 | 739955940fc@gmail.com (antigravity) | Google Antigravity | 5/13 20:58 | HEALTHY — refresh-worker fired at 20:58; Google OAuth unaffected by Anthropic-side rotation |
| 10 | zfan7@sva.edu (Codex Pro) | OpenAI Codex | 5/13 01:20 | HEALTHY — 5h reset 2026-05-13T06:31 UTC (passed); 7d reset 2026-05-18T22:43 UTC; 250 credits/day; separate codex CLI auth at Z:/claude-sota-installed-state/.codex/ |
| 11 | 739955940fc@gmail.com (Gemini) | Google Gemini gen-lang-client-0557279342 | 5/8 01:41 | HEALTHY per CCC status.py before crash; usage unknown (status.py KeyError post-aperant-death) |

## Service chain liveness (live probe 21:35 EDT)

| Component | State | Notes |
|---|---|---|
| CPA daemon :18317 | ALIVE PID 97820 | Z:\claude-sota-installed\.local\bin\cli-proxy-api.exe -config Z:\claude-sota-installed\.cli-proxy-api\config.yaml |
| CPA Management Center | ALIVE | http://127.0.0.1:18317/management.html (2,077,313 B / 0.016s) |
| Mgmt key | Z:/claude-sota-installed-state/cliproxy-mgmt-secret.txt | (read-only outside repo) |
| ccc-reset-soonest schtask | ACTIVE | Next 21:41 EDT; firing every 30min but no-op on 0/8 fleet |
| aperant_poller | DEAD + DISABLED | schtask explicitly disabled since 5/12 09:35 (status_fatal_app_exit -1073741510) |
| CCC status.py | CRASHED | KeyError 'claude-max-local-42' (aperant lookup cascade) |
| CC subscription path (this session) | ALIVE | Bypasses CCC fleet; uses Claude Code OAuth subscription directly |
| Antigravity refresh-worker | FIRING | 20:58 EDT last successful refresh — Google OAuth healthy |

## Backend OAuth chain — exact protocol

Per `Z:/repos/deps/CLIProxyAPI/internal/auth/claude/anthropic_auth.go:26-27,365-367 @ HEAD CPA v7.0.2`:

```
POST https://api.anthropic.com/v1/oauth/token
Content-Type: application/json
anthropic-beta: oauth-2025-04-20

{
  "client_id": "9d1c250a-e61b-44d9-88ed-5944d1962f5e",
  "grant_type": "refresh_token",
  "refresh_token": "<108-char-RT>"
}
```

Healthy response: `{"access_token": "<108>", "refresh_token": "<108-NEW>", "expires_in": 28800}` — **caller MUST atomically persist new refresh_token**.

Current response (W185 F1): `HTTP 400 {"error": "invalid_grant", "error_description": "Refresh token not found or invalid"}`

## Recovery — only viable path

**CR-6 official-native-channel**: CPA Management Center SPA at http://127.0.0.1:18317/management.html

Per-account workflow (operator-keystroke required; ~5-10min for all 8):

1. Open Management Center in browser
2. Read mgmt key: `cat Z:/claude-sota-installed-state/cliproxy-mgmt-secret.txt`
3. Paste mgmt key when prompted
4. For each of 8 accounts → click "Re-auth" / "Login" → Anthropic OAuth tab opens → log in with that Google account → consent → redirect captures `code` → POST to `/v0/management/oauth-callback` writes fresh auth file
5. CPA refresh-worker resumes normal rotation on the new RT chain

Programmatic paths exhausted:
- Direct `/v1/oauth/token` with RT_A → 400 invalid_grant (RT rotated and burned)
- PATCH `/auth-files/status` toggle → no effect (refresh-token state is separate from disabled flag)
- DELETE + re-upload auth files → can't synthesize valid OAuth tokens from nothing
- CPA daemon restart → re-loads same revoked RTs from disk → no change
- Headless OAuth flow with stored creds → not viable: 2FA, Anthropic UI fragility, security risk

## FM-20 row 17 codification (queued for next fire)

Sub-class: **token-rotation-burned-by-probe** — agent-side `/v1/oauth/token` probe consumes rotating RT without persisting the new RT to disk; on session resume, disk RT now revoked; OAuth chain broken irreversibly.

Defense: any direct OAuth refresh probe MUST atomically write the new tokens to disk in the same tool call. No separation of "probe" and "save" across turns or sessions.

Cite to be added to row 17:
- This fire (W185 F1) at `tmp/wave185-accounts-report-2026-05-13.md`
- W184 F1 prior session ctx_execute output (lost to compaction — evidence trail in session-events FTS5)
- Probe at 21:35 returning HTTP 400 invalid_grant for 7/7 RTs

## Forward queue

| # | Action | Effort | Type |
|---|---|---|---|
| 1 | **Operator browser re-auth all 8 via CPA Management Center** | 5-10min | OPERATOR-KEYSTROKE |
| 2 | Codify FM-20 row 17 token-rotation-burned-by-probe sub-class | 5min | RULE EDIT |
| 3 | Document this incident in `docs/install-provenance.md` Wave 185 row | 2min | DOC |
| 4 | (LATER) Restart aperant_poller if "we don't suppose to use aperant" constraint relaxes | — | DEFER |
| 5 | Verify CC subscription auth path (this session) is independent of CCC fleet | already verified | DONE |

## Files

- Created: `tmp/wave185-refresh-fleet.py` (probe + atomic save; ran with 0/7 OK due to revoked RTs)
- Created: `tmp/wave185-accounts-report-2026-05-13.md` (this file)
- Read: `Z:/claude-sota-installed/.cli-proxy-api/claude-*.json` (no modifications — atomic write only on success)
- Probed: Anthropic OAuth `/v1/oauth/token` × 7 (all 400 invalid_grant)

## CR-1 cite anchors

- TIER-1-DIRECT: `Z:/repos/deps/CLIProxyAPI/internal/auth/claude/anthropic_auth.go:26-27,365-367 @ HEAD CPA v7.0.2` (Token URL + Client ID + grant_type semantics)
- TIER-1-DIRECT: `https://api.anthropic.com/v1/oauth/token` (Anthropic OAuth endpoint — verified live)
- TIER-2-CITE-IMPORT-AMBER: `Z:/claude-sota/.claude/rules/fm20-path-drift-cascade.md` row 1-16 (sibling discipline; this fire proposes row 17 sub-class)
- TIER-3-LOCAL-OPERATOR-DERIVED: W184 F1 probe output (live behavioral evidence Anthropic OAuth rotates RTs)
