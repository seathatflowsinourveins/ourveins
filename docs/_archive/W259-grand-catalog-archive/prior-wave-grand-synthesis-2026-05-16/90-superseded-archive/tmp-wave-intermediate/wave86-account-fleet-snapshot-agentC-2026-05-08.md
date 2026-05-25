# Wave 86 EEE Account Fleet Snapshot - Agent C - 2026-05-08

- Root: `Z:\claude-sota-installed`
- OAuth dir: `Z:\claude-sota-installed\.cli-proxy-api`
- Proxy log: `Z:\claude-sota-installed\.cli-proxy-api\logs\main.log` (312233 bytes, mtime 2026-05-08T12:32:36.726813)
- CPA DB: `Z:\claude-sota-installed\.local\cpa-usage-keeper\cpa-usage-keeper_v1.5.2_windows_amd64\data\app.db` (147456 bytes)
- Token redaction policy: every OAuth token value longer than 20 chars is rendered as `[REDACTED-TOKEN-N-CHARS]`.
- Note: `sqlite3` CLI was unavailable; CPA binary rejected `--status`, so SQLite was queried read-only through Python stdlib.

## Section 1 Per-Account OAuth Inventory

| File | Type | Email | Disabled | Issued | Checked | Last Refresh | Expired | Refresh/Expires | Scope | Tier/Signals | Redacted Token Fields |
|---|---:|---|---:|---|---|---|---|---:|---|---|---|
| claude-dreamweaverhoudini@gmail.com.json | claude | dreamweaverhoudini@gmail.com | False | - | - | 2026-05-08T10:56:39-04:00 | 2026-05-08T18:56:39-04:00 | 14400 | - | claude, Base Max 20x weekly 75% (25% remaining), capacity_score=100 | access_token=[REDACTED-TOKEN-108-CHARS]; refresh_token=[REDACTED-TOKEN-108-CHARS]; id_token=- |
| claude-aesthetic9c@gmail.com.json | claude | aesthetic9c@gmail.com | False | - | - | 2026-05-08T10:56:39-04:00 | 2026-05-08T18:56:39-04:00 | 14400 | - | claude | access_token=[REDACTED-TOKEN-108-CHARS]; refresh_token=[REDACTED-TOKEN-108-CHARS]; id_token=- |
| claude-avantmanifest@gmail.com.json | claude | avantmanifest@gmail.com | False | - | - | 2026-05-08T10:56:39-04:00 | 2026-05-08T18:56:39-04:00 | 14400 | - | claude, capacity_score=100 | access_token=[REDACTED-TOKEN-108-CHARS]; refresh_token=[REDACTED-TOKEN-108-CHARS]; id_token=- |
| claude-739955940fc@gmail.com.json | claude | 739955940fc@gmail.com | False | - | - | 2026-05-08T10:56:40-04:00 | 2026-05-08T18:56:40-04:00 | 14400 | - | claude, capacity_score=85 | access_token=[REDACTED-TOKEN-108-CHARS]; refresh_token=[REDACTED-TOKEN-108-CHARS]; id_token=- |
| claude-mr.euphoriaincarnate@gmail.com.json | claude | mr.euphoriaincarnate@gmail.com | False | - | - | 2026-05-08T10:56:39-04:00 | 2026-05-08T18:56:39-04:00 | 14400 | - | claude, capacity_score=0 | access_token=[REDACTED-TOKEN-108-CHARS]; refresh_token=[REDACTED-TOKEN-108-CHARS]; id_token=- |
| claude-nalawowac@gmail.com.json | claude | nalawowac@gmail.com | False | - | - | 2026-05-08T10:56:39-04:00 | 2026-05-08T18:56:39-04:00 | 14400 | - | claude | access_token=[REDACTED-TOKEN-108-CHARS]; refresh_token=[REDACTED-TOKEN-108-CHARS]; id_token=- |
| claude-zfan7@sva.edu.json | claude | zfan7@sva.edu | False | - | - | 2026-05-08T10:56:39-04:00 | 2026-05-08T18:56:39-04:00 | 14400 | - | claude, capacity_score=67 | access_token=[REDACTED-TOKEN-108-CHARS]; refresh_token=[REDACTED-TOKEN-108-CHARS]; id_token=- |
| codex-zfan7@sva.edu-pro.json | codex | zfan7@sva.edu | False | - | - | 2026-05-08T01:20:42-04:00 | 2026-05-18T01:20:42-04:00 | - | - | codex, pro | access_token=[REDACTED-TOKEN-1880-CHARS]; refresh_token=[REDACTED-TOKEN-90-CHARS]; id_token=[REDACTED-TOKEN-2076-CHARS] |
| antigravity-739955940fc@gmail.com.json | antigravity | 739955940fc@gmail.com | False | 2026-05-08T15:51:38.105000+00:00 | - | - | 2026-05-08T12:51:37-04:00 | 3599 | - | antigravity | access_token=[REDACTED-TOKEN-260-CHARS]; refresh_token=[REDACTED-TOKEN-103-CHARS] |
| gemini-739955940fc@gmail.com-gen-lang-client-0557279342.json | gemini | 739955940fc@gmail.com | False | - | checked=True | - | - | - | - | gemini | token=[REDACTED-TOKEN-891-CHARS] |

## Section 2 Real-Time Usage

CPA usage keeper identity totals; cache rate = `cached_tokens / (cached_tokens + input_tokens)`. Literal `cache_read_input_tokens` and `cache_creation_input_tokens` fields were not present in `main.log`.

| Provider | Type | Account | Calls | OK | Failed | Input | Output | Reasoning | Cached | Total | Cache Rate | Last Call | Stats Updated |
|---|---|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---|---|
| antigravity | antigravity | 739955940fc@gmail.com | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | - | - | - |
| claude | claude | 739955940fc@gmail.com | 6 | 2 | 4 | 1375 | 2481 | 0 | 683768 | 3856 | 99.80% | 2026-05-08T16:19:14.698830+00:00 | 2026-05-08T16:19:27.668740+00:00 |
| claude | claude | aesthetic9c@gmail.com | 8 | 8 | 0 | 13 | 32300 | 0 | 5648047 | 32313 | 100.00% | 2026-05-08T15:13:14.128836+00:00 | 2026-05-08T15:14:52.807634+00:00 |
| claude | claude | avantmanifest@gmail.com | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | - | - | - |
| claude | claude | dreamweaverhoudini@gmail.com | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | - | - | - |
| claude | claude | mr.euphoriaincarnate@gmail.com | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | - | - | - |
| claude | claude | nalawowac@gmail.com | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | - | - | - |
| claude | claude | zfan7@sva.edu | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | - | - | - |
| codex | codex | zfan7@sva.edu | 6 | 6 | 0 | 19545 | 6682 | 2916 | 0 | 26227 | 0.00% | 2026-05-08T16:09:21.815381+00:00 | 2026-05-08T16:09:44.779751+00:00 |
| gemini-cli | gemini-cli | 739955940fc@gmail.com | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | - | - | - |

Log selector activity counts are broader than CPA persisted usage and include count-token/selection events:

| Auth File | Selector Mentions | Last Selector Activity |
|---|---:|---|
| claude-739955940fc@gmail.com.json | 182 | 2026-05-08 12:19:14 |
| claude-avantmanifest@gmail.com.json | 128 | 2026-05-08 03:51:35 |
| claude-aesthetic9c@gmail.com.json | 99 | 2026-05-08 12:19:14 |
| claude-mr.euphoriaincarnate@gmail.com.json | 40 | 2026-05-08 03:53:15 |
| codex-zfan7@sva.edu-pro.json | 19 | 2026-05-08 12:09:21 |
| claude-dreamweaverhoudini@gmail.com.json | 9 | 2026-05-08 03:51:36 |
| claude-nalawowac@gmail.com.json | 3 | 2026-05-08 03:16:25 |
| claude-zfan7@sva.edu.json | 2 | 2026-05-08 03:16:25 |
| antigravity-739955940fc@gmail.com.json | 1 | 2026-05-08 02:01:16 |

## Section 3 Reset-Time Estimates

Inferences: Claude uses 5h rolling estimate from last persisted call when available, otherwise last selector activity; Codex Pro uses a 24h daily estimate from last persisted call; Gemini is RPM-based, so no durable daily reset is inferred.

| Provider | Account | Basis | Last Activity | Estimated Next Reset | Confidence |
|---|---|---|---|---|---|
| claude | dreamweaverhoudini@gmail.com | main.log selector activity | 2026-05-08T03:51:36 | 2026-05-08T08:51:36 | medium |
| claude | aesthetic9c@gmail.com | CPA last_used_at | 2026-05-08T15:13:14.128836+00:00 | 2026-05-08T20:13:14.128836+00:00 | medium |
| claude | avantmanifest@gmail.com | main.log selector activity | 2026-05-08T03:51:35 | 2026-05-08T08:51:35 | medium |
| claude | 739955940fc@gmail.com | CPA last_used_at | 2026-05-08T16:19:14.698830+00:00 | 2026-05-08T21:19:14.698830+00:00 | medium |
| claude | mr.euphoriaincarnate@gmail.com | main.log selector activity | 2026-05-08T03:53:15 | 2026-05-08T08:53:15 | medium |
| claude | nalawowac@gmail.com | main.log selector activity | 2026-05-08T03:16:25 | 2026-05-08T08:16:25 | medium |
| claude | zfan7@sva.edu | main.log selector activity | 2026-05-08T03:16:25 | 2026-05-08T08:16:25 | medium |
| codex | zfan7@sva.edu | CPA last_used_at | 2026-05-08T16:09:21.815381+00:00 | 2026-05-09T16:09:21.815381+00:00 | medium |
| antigravity | 739955940fc@gmail.com | main.log selector activity | 2026-05-08T02:01:16 | provider-specific / not inferred | low |
| gemini | 739955940fc@gmail.com | no persisted usage | - | RPM rolling; no durable reset in OAuth/CPA data | medium |

## Section 4 Top Error Patterns

| Pattern | Count | Last Timestamp | Notes |
|---|---:|---|---|
| auth_unavailable_reselect | 32 | 2026-05-08 12:19:14 | Selector reselected after an affinity-bound credential was unavailable. |
| 429 | 2 | 2026-05-08 03:51:36 | HTTP 429 status responses from `/v1/messages?beta=true`. |
| rate_limit | 0 | - | No matches in `main.log`. |
| cooldown | 0 | - | No matches in `main.log`. |
| ECONNREFUSED | 0 | - | No matches in `main.log`. |

| Account/Auth File | Pattern | Count | Last Timestamp |
|---|---|---:|---|
| claude-aesthetic9c@gmail.com.json | auth_unavailable_reselect | 10 | 2026-05-08 12:19:14 |
| claude-739955940fc@gmail.com.json | auth_unavailable_reselect | 7 | 2026-05-08 03:51:35 |
| claude-avantmanifest@gmail.com.json | auth_unavailable_reselect | 7 | 2026-05-08 03:51:35 |
| claude-dreamweaverhoudini@gmail.com.json | auth_unavailable_reselect | 5 | 2026-05-08 03:51:36 |
| claude-mr.euphoriaincarnate@gmail.com.json | auth_unavailable_reselect | 3 | 2026-05-08 03:51:37 |
| claude-avantmanifest@gmail.com.json | 429 | 2 | 2026-05-08 03:51:36 |

## Section 5 CPA Dashboard Discovery

| Endpoint | Result | Body/Reason |
|---|---:|---|
| http://localhost:3000/api/v1/accounts | 404 | <!DOCTYPE html><html lang="en"><head><meta charSet="utf-8"/><meta name="viewport" content="width=device-width, initial-scale=1"/><link rel="preload" as="script" fetchPriority="low" href="/_next/static/chunks/17wxn6e2a0pue.js"/><script src="/_next/static/chunks/0p-fa5smxixkv.js" async=""></script><script src="/_next/static/chunks/15bifx92wpyvl.js" async=""></script><script src="/_next/static/chunks/turbopack-0t9xsb4n6ceci.js" async=""></script><script src="/_next/static/chunks/08m4pp.r4oka0.js" a |
| http://localhost:3000/api/stats | 404 | <!DOCTYPE html><html lang="en"><head><meta charSet="utf-8"/><meta name="viewport" content="width=device-width, initial-scale=1"/><link rel="preload" as="script" fetchPriority="low" href="/_next/static/chunks/17wxn6e2a0pue.js"/><script src="/_next/static/chunks/0p-fa5smxixkv.js" async=""></script><script src="/_next/static/chunks/15bifx92wpyvl.js" async=""></script><script src="/_next/static/chunks/turbopack-0t9xsb4n6ceci.js" async=""></script><script src="/_next/static/chunks/08m4pp.r4oka0.js" a |

Additional discovery from `config.yaml`: proxy runtime is configured on `127.0.0.1:8317`; management center polling is visible in `main.log` under `/v0/management/*`. The requested port `3000` endpoints returned 404, so no CPA dashboard payload was available there during this snapshot.

VERDICT: Fleet OAuth inventory is readable and token-redacted; CPA DB shows 3 active identities with persisted usage, 4 persisted failures, high Claude cache reuse where used, and 2 HTTP 429 events plus selector unavailability churn in the proxy log. Dashboard discovery at `localhost:3000` failed with 404 for both requested endpoints.
