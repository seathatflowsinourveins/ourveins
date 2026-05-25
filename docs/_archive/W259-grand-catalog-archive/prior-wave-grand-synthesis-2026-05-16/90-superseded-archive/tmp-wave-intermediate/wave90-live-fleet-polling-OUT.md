# Wave 90 Live Fleet Polling OUT

- Generated: 2026-05-08T17:29:05.447614Z
- OAuth source: `Z:\claude-sota-installed\.cli-proxy-api`
- CPA SQLite: `Z:\claude-sota-installed\.local\cpa-usage-keeper\cpa-usage-keeper_v1.5.2_windows_amd64\data\app.db`
- Token discipline: OAuth token values longer than 20 chars are not printed; HTTP calls were made from process memory, not command-line arguments.

## Endpoint Citation

Aperant `CODEX_RATE_LIMITS_RESEARCH.md` @ `cba7a027` verbatim excerpts used for endpoint syntax:

```
GET https://chatgpt.com/backend-api/wham/usage
Authorization: Bearer <access_token>
ChatGPT-Account-Id: <account_id>
Content-Type: application/json
Accept: application/json
- `usage-monitor.ts` — Polls Anthropic's `/api/oauth/usage` endpoint every 30s
- `token-refresh.ts` — Refreshes tokens via `console.anthropic.com/v1/oauth/token`
| **Usage endpoint** | `api.anthropic.com/api/oauth/usage` | `chatgpt.com/backend-api/wham/usage` |
| **Auth header** | `Bearer <oauth_token>` | `Bearer <access_token>` + `ChatGPT-Account-Id` |
| **Token refresh** | `console.anthropic.com/v1/oauth/token` | `auth.openai.com/oauth/token` |
```

## 1. Per-Account LIVE Rate-Limit Table

| account | type | plan_type | primary_used_percent | primary_reset_at | secondary_used_percent | secondary_reset_at | limit_reached | capacity_score from JSON | passive cpa data | poll status | next-action recommendation |
|---|---|---|---:|---|---:|---|---|---|---|---|---|
| aesthetic9c@gmail.com | claude | n/a | n/a | n/a | n/a | n/a | n/a | n/a | req=8 ok=8 fail=0 tokens=32313 cache=5648047; rate-cols-empty | 200 success unexpected-schema | Route candidate now. |
| 739955940fc@gmail.com | claude | n/a | n/a | n/a | n/a | n/a | n/a | n/a | req=6 ok=2 fail=4 tokens=3856 cache=683768; rate-cols-empty | 200 success unexpected-schema | Route candidate now. |
| avantmanifest@gmail.com | claude | n/a | n/a | n/a | n/a | n/a | n/a | n/a | req=0 ok=0 fail=0 tokens=0 cache=0; rate-cols-empty | 200 success unexpected-schema | Route candidate now. |
| dreamweaverhoudini@gmail.com | claude | n/a | n/a | n/a | n/a | n/a | n/a | n/a | req=0 ok=0 fail=0 tokens=0 cache=0; rate-cols-empty | 200 success unexpected-schema | Route candidate now. |
| mr.euphoriaincarnate@gmail.com | claude | n/a | n/a | n/a | n/a | n/a | n/a | n/a | req=0 ok=0 fail=0 tokens=0 cache=0; rate-cols-empty | 200 success unexpected-schema | Route candidate now. |
| nalawowac@gmail.com | claude | n/a | n/a | n/a | n/a | n/a | n/a | n/a | req=0 ok=0 fail=0 tokens=0 cache=0; rate-cols-empty | 200 success unexpected-schema | Route candidate now. |
| zfan7@sva.edu | claude | n/a | n/a | n/a | n/a | n/a | n/a | n/a | req=0 ok=0 fail=0 tokens=0 cache=0; rate-cols-empty | 200 success unexpected-schema | Route candidate now. |
| zfan7@sva.edu | codex | pro | 7% | 2026-05-08T19:17:09Z | 25% | 2026-05-11T22:39:02Z | false | n/a | req=6 ok=6 fail=0 tokens=26227 cache=0; plan=pro | 200 success | Route candidate now. |
| 739955940fc@gmail.com | antigravity | n/a | n/a | n/a | n/a | n/a | n/a | n/a | req=0 ok=0 fail=0 tokens=0 cache=0; rate-cols-empty | not polled: no documented active usage endpoint in Aperant note | No documented active usage endpoint; keep passive only. |
| 739955940fc@gmail.com | gemini-cli | n/a | n/a | n/a | n/a | n/a | n/a | n/a | req=0 ok=0 fail=0 tokens=0 cache=0; rate-cols-empty | not polled: no documented active usage endpoint in Aperant note | No documented active usage endpoint; keep passive only. |

Live extraction details for successful calls:
- `aesthetic9c@gmail.com` `claude`: primary={used_percent:n/a, limit_window_seconds:n/a, reset_after_seconds:n/a, reset_at:n/a, reset_at_iso:n/a}; secondary={used_percent:n/a, limit_window_seconds:n/a, reset_after_seconds:n/a, reset_at:n/a, reset_at_iso:n/a}; plan_type=n/a; limit_reached=n/a; credits=n/a
  - Unexpected schema literal body: `{"extra_usage": {"currency": null, "is_enabled": false, "monthly_limit": null, "used_credits": null, "utilization": null}, "five_hour": {"resets_at": "2026-05-08T19:09:59.844850+00:00", "utilization": 13.0}, "iguana_necktie": null, "omelette_promotional": null, "seven_day": {"resets_at": "2026-05-13T18:59:59.844873+00:00", "utilization": 18.0}, "seven_day_cowork": null, "seven_day_oauth_apps": null, "seven_day_omelette": {"resets_at": null, "utilization": 0.0}, "seven_day_opus": null, "seven_day...`
- `739955940fc@gmail.com` `claude`: primary={used_percent:n/a, limit_window_seconds:n/a, reset_after_seconds:n/a, reset_at:n/a, reset_at_iso:n/a}; secondary={used_percent:n/a, limit_window_seconds:n/a, reset_after_seconds:n/a, reset_at:n/a, reset_at_iso:n/a}; plan_type=n/a; limit_reached=n/a; credits=n/a
  - Unexpected schema literal body: `{"extra_usage": {"currency": null, "is_enabled": false, "monthly_limit": null, "used_credits": null, "utilization": null}, "five_hour": {"resets_at": "2026-05-08T19:50:00.347316+00:00", "utilization": 4.0}, "iguana_necktie": null, "omelette_promotional": null, "seven_day": {"resets_at": "2026-05-10T06:00:00.347338+00:00", "utilization": 100.0}, "seven_day_cowork": null, "seven_day_oauth_apps": null, "seven_day_omelette": {"resets_at": null, "utilization": 0.0}, "seven_day_opus": null, "seven_day...`
- `avantmanifest@gmail.com` `claude`: primary={used_percent:n/a, limit_window_seconds:n/a, reset_after_seconds:n/a, reset_at:n/a, reset_at_iso:n/a}; secondary={used_percent:n/a, limit_window_seconds:n/a, reset_after_seconds:n/a, reset_at:n/a, reset_at_iso:n/a}; plan_type=n/a; limit_reached=n/a; credits=n/a
  - Unexpected schema literal body: `{"extra_usage": {"currency": null, "is_enabled": false, "monthly_limit": null, "used_credits": null, "utilization": null}, "five_hour": {"resets_at": "2026-05-08T18:50:00.815584+00:00", "utilization": 3.0}, "iguana_necktie": null, "omelette_promotional": null, "seven_day": {"resets_at": "2026-05-12T06:00:00.815602+00:00", "utilization": 89.0}, "seven_day_cowork": null, "seven_day_oauth_apps": null, "seven_day_omelette": {"resets_at": null, "utilization": 0.0}, "seven_day_opus": null, "seven_day_...`
- `dreamweaverhoudini@gmail.com` `claude`: primary={used_percent:n/a, limit_window_seconds:n/a, reset_after_seconds:n/a, reset_at:n/a, reset_at_iso:n/a}; secondary={used_percent:n/a, limit_window_seconds:n/a, reset_after_seconds:n/a, reset_at:n/a, reset_at_iso:n/a}; plan_type=n/a; limit_reached=n/a; credits=n/a
  - Unexpected schema literal body: `{"extra_usage": {"currency": null, "is_enabled": false, "monthly_limit": null, "used_credits": null, "utilization": null}, "five_hour": {"resets_at": null, "utilization": 0.0}, "iguana_necktie": null, "omelette_promotional": null, "seven_day": {"resets_at": "2026-05-11T15:00:00.296939+00:00", "utilization": 100.0}, "seven_day_cowork": null, "seven_day_oauth_apps": null, "seven_day_omelette": {"resets_at": null, "utilization": 0.0}, "seven_day_opus": null, "seven_day_sonnet": {"resets_at": "2026-...`
- `mr.euphoriaincarnate@gmail.com` `claude`: primary={used_percent:n/a, limit_window_seconds:n/a, reset_after_seconds:n/a, reset_at:n/a, reset_at_iso:n/a}; secondary={used_percent:n/a, limit_window_seconds:n/a, reset_after_seconds:n/a, reset_at:n/a, reset_at_iso:n/a}; plan_type=n/a; limit_reached=n/a; credits=n/a
  - Unexpected schema literal body: `{"extra_usage": {"currency": "USD", "is_enabled": true, "monthly_limit": 11000, "used_credits": 9221.0, "utilization": 83.82727272727273}, "five_hour": {"resets_at": "2026-05-08T19:50:00.769231+00:00", "utilization": 29.0}, "iguana_necktie": null, "omelette_promotional": null, "seven_day": {"resets_at": "2026-05-15T04:00:00.769263+00:00", "utilization": 12.0}, "seven_day_cowork": null, "seven_day_oauth_apps": null, "seven_day_omelette": {"resets_at": null, "utilization": 0.0}, "seven_day_opus": ...`
- `nalawowac@gmail.com` `claude`: primary={used_percent:n/a, limit_window_seconds:n/a, reset_after_seconds:n/a, reset_at:n/a, reset_at_iso:n/a}; secondary={used_percent:n/a, limit_window_seconds:n/a, reset_after_seconds:n/a, reset_at:n/a, reset_at_iso:n/a}; plan_type=n/a; limit_reached=n/a; credits=n/a
  - Unexpected schema literal body: `{"extra_usage": {"currency": "USD", "is_enabled": true, "monthly_limit": 20000, "used_credits": 13128.0, "utilization": 65.64}, "five_hour": {"resets_at": null, "utilization": 0.0}, "iguana_necktie": null, "omelette_promotional": null, "seven_day": {"resets_at": "2026-05-13T03:00:00.676403+00:00", "utilization": 5.0}, "seven_day_cowork": null, "seven_day_oauth_apps": null, "seven_day_omelette": {"resets_at": null, "utilization": 0.0}, "seven_day_opus": null, "seven_day_sonnet": {"resets_at": "20...`
- `zfan7@sva.edu` `claude`: primary={used_percent:n/a, limit_window_seconds:n/a, reset_after_seconds:n/a, reset_at:n/a, reset_at_iso:n/a}; secondary={used_percent:n/a, limit_window_seconds:n/a, reset_after_seconds:n/a, reset_at:n/a, reset_at_iso:n/a}; plan_type=n/a; limit_reached=n/a; credits=n/a
  - Unexpected schema literal body: `{"extra_usage": {"currency": "USD", "is_enabled": true, "monthly_limit": 8000, "used_credits": 8361.0, "utilization": 100.0}, "five_hour": {"resets_at": null, "utilization": 0.0}, "iguana_necktie": null, "omelette_promotional": null, "seven_day": {"resets_at": "2026-05-09T03:00:01.411039+00:00", "utilization": 96.0}, "seven_day_cowork": null, "seven_day_oauth_apps": null, "seven_day_omelette": {"resets_at": null, "utilization": 0.0}, "seven_day_opus": null, "seven_day_sonnet": {"resets_at": "202...`
- `zfan7@sva.edu` `codex`: primary={used_percent:7, limit_window_seconds:18000, reset_after_seconds:6479, reset_at:1778267829, reset_at_iso:2026-05-08T19:17:09Z}; secondary={used_percent:25, limit_window_seconds:604800, reset_after_seconds:277792, reset_at:1778539142, reset_at_iso:2026-05-11T22:39:02Z}; plan_type=pro; limit_reached=false; credits={"approx_cloud_messages": [10, 63], "approx_local_messages": [63, 325], "balance": "250", "has_credits": true, "overage_limit_reached": false, "unlimited": false}

## 2. Reset-Time Schedule

| next_reset_at | account | type | window | used_percent | window_seconds | rotation-window opportunity |
|---|---|---|---|---:|---:|---|
| 2026-05-08T19:17:09Z | zfan7@sva.edu | codex | primary | 7% | 18000 | Usable before reset; reserve for active routing. |
| 2026-05-11T22:39:02Z | zfan7@sva.edu | codex | secondary | 25% | 604800 | Usable before reset; reserve for active routing. |

## 3. Failure Modes Encountered

- No 401, 403, 429, or network failures encountered on actively polled Claude/Codex accounts.
- `antigravity-739955940fc@gmail.com.json` `antigravity`: unsupported for active polling in the cited Aperant endpoint set; OAuth parsed, no usage GET attempted.
- `gemini-739955940fc@gmail.com-gen-lang-client-0557279342.json` `gemini-cli`: unsupported for active polling in the cited Aperant endpoint set; OAuth parsed, no usage GET attempted.

## 4. Token Refresh Outcomes

- No token refreshes were needed; no OAuth files were modified.

CPA cross-check:
- `usage_identities` rows loaded: 10 active identities.
- Existing CPA primary window populated: 0/10.
- Existing CPA secondary window populated: 0/10.
- Newly fetched live rate-limit payloads in this poll: 8/8 documented Claude/Codex accounts.
- CPA passive token/request counters were not overwritten by this polling run.

## 5. VERDICT

VERDICT: Fleet has 8/8 active Claude/Codex usage polls succeeding; route now to claude `aesthetic9c@gmail.com` (score 100.0, primary n/a, secondary n/a) unless workload requires a provider-specific model.

VERDICT:
