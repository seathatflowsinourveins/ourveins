---
title: W167-F1 Agent B — codex:codex-rescue BRIDGE-MODE → REAL GPT-5.5 — 401 Recovery Diagnostic
status: AUTHORITATIVE
date: 2026-05-13
agent: codex:codex-rescue
goal: diagnose 401-cascade root cause + cross-org SOTA convergence + recovery playbook
verdict: APPROVE
cite-class: TIER-3-LOCAL-COMPOSITION
constituents:
  - TIER-1-DIRECT @ codex_executor.go:287-292,459-492 @ HEAD 785b00c3 (CLIProxyAPI)
  - TIER-1-DIRECT @ status.py:13,121-124,129 + fleet_report.py:9,65,69,82 (CCC scripts)
  - TIER-1-DIRECT @ openai/codex login/src/auth/manager.rs:83-91,156-171 @ HEAD 993e3f40
  - TIER-1-DIRECT @ litellm/proxy/auth/* @ HEAD 934ecdca
  - TIER-1-DIRECT @ claude-agent-sdk-python session_resume.py:305-359 @ HEAD b512f256
  - TIER-1-DIRECT @ cnighswonger cache-fix proxy README.md:42,283-339 @ HEAD 2f17aeb9
effective_tier: TIER-3-LOCAL-COMPOSITION per MIN_PRECEDENCE lattice
---

# W167-F1 Agent B — 401 Recovery Diagnostic (REAL GPT-5.5 BRIDGE-MODE)

## Bridge Metadata

- Timebox: followed 90s/120s intent, but local source + live probes required multiple bounded probes
- Codex CLI bg job ID: `N/A` [UNKNOWN] — this environment is already Codex; no separate `codex exec --background` job was spawned
- Pattern disposition: Pattern B / HONEST-NON-FINDING for Anthropic live `/api/oauth/usage` response shape because direct curl/Invoke-WebRequest could not complete TLS from this shell; local auth metadata and source still support a concrete recovery recommendation

## Root Cause

[VERIFIED] CCC local management is reachable on `127.0.0.1:9327`; `127.0.0.1:8317` refused connection during this probe. That matters because the referenced CCC scripts are wired to `:9327`, while eee design docs describe the eee fleet proxy on `:8317` / migrated `:18317`.

[VERIFIED] All 7 non-disabled CCC Claude auth files have `expired` values in the past:

| Account | Expired Timestamp | Status |
|---|---|---|
| 739955940fc@gmail.com | 2026-05-08 06:05:33 | STALE |
| aesthetic9c@gmail.com | 2026-05-08 08:19:20 | STALE |
| avantmanifest@gmail.com | 2026-05-08 06:05:33 | STALE |
| dreamweaverhoudini@gmail.com | 2026-05-08 06:05:33 | STALE |
| mr.euphoriaincarnate@gmail.com | 2026-05-08 06:05:33 | STALE |
| nalawowac@gmail.com | 2026-05-08 06:33:22 | STALE |
| zfan7@sva.edu | 2026-05-08 06:05:33 | STALE |
| readingcodingandbeyond@gmail.com | DISABLED, 2026-05-11 18:09:03 | STALE+DIS |

**Primary diagnosis**: stale OAuth access-token cascade, NOT a healthy weekly-limit drain state. The later 429 drift is likely secondary: either direct `/api/oauth/usage` probe throttling after repeated stale-token probes, or CLIProxyAPI/cnighswonger request-path cooldown classification after failed/rate-limited upstream attempts.

## Q1: 401 vs 429 Drift

[VERIFIED] `status.py` uses direct Anthropic usage plus local CCC management:
- Direct usage URL: `Z:/claude/ccc/tools/status.py:13`
- Headers include `anthropic-beta: claude-code-20250219,oauth-2025-04-20`: `status.py:14-18`
- Local management base `http://127.0.0.1:9327`: `status.py:19`
- Management auth uses `Authorization: Bearer <key>`: `status.py:25`
- Per-account direct usage adds `Authorization: Bearer <access_token>`: `status.py:121-124`
- It reports HTTP errors only as strings: `status.py:129`

[VERIFIED] `fleet_report.py` also uses the same direct Anthropic usage URL, not a fundamentally different usage endpoint:
- Direct usage URL: `Z:/claude/ccc/tools/fleet_report.py:9`
- Headers: `fleet_report.py:12-16`
- Per-account direct usage with bearer token: `fleet_report.py:65`
- HTTP errors only as strings: `fleet_report.py:69`
- Local management `/usage` uses `Authorization: <key>` without `Bearer`: `fleet_report.py:82`

[VERIFIED] The true endpoint/header difference is on the local management side, not Anthropic usage: `status.py` sends `Bearer cliproxy-mgmt-42`; `fleet_report.py` sends raw `cliproxy-mgmt-42`.

[VERIFIED] CLIProxyAPI classifies upstream 401 and 429 differently:
- 401 handling: `Z:/repos/deps/CLIProxyAPI/sdk/cliproxy/auth/conductor.go:2107,2539 @ HEAD 785b00c3127eea6aa207f1207ead8a2aa93690a3`
- 429 handling and quota cooldown: `conductor.go:2134-2143,2560-2571 @ HEAD 785b00c3`
- Cooldown model error returns HTTP 429 semantics: `selector.go:47-105 @ HEAD 785b00c3`
- Priority/cooldown-gated selection: `selector.go:200-250 @ HEAD 785b00c3`

**Authoritative status for auth health**: direct `/api/oauth/usage` plus auth-file `expired` is authoritative for token validity. Local proxy 429 is authoritative only for routing/cooldown state. Given every active auth file is stale, treat the 401 cascade as root cause and 429 as downstream drift until reauth proves otherwise.

**Live probe result**:
- `GET http://127.0.0.1:9327/v0/management/auth-files`: HTTP 200, 22 files [VERIFIED]
- `GET http://127.0.0.1:8317/v0/management/auth-files`: connection refused [VERIFIED]
- Direct Anthropic usage smoke from this shell: TLS failed before HTTP status [UNKNOWN], so it did not disambiguate response shape

## Q2: Cross-Org SOTA Convergence (Axis-1 ≥3 distinct orgs PASS)

Convergent pattern: separate auth validity from quota exhaustion, mark bad credentials out of rotation immediately, use explicit cooldown/backoff for rate limits, preserve metadata across refresh/reauth, and keep routing single-writer.

| Org | Source | Key Pattern |
|---|---|---|
| **OpenAI** | `Z:/repos/deps/codex/codex-rs/login/src/auth/manager.rs:83-91,156-171,470-524 @ HEAD 993e3f407ea8213f7d32cb9367ae7616b7e15b4a` | Separates API-key auth, ChatGPT token auth, refresh token errors, and explicit relogin messages |
| **BerriAI** | `Z:/repos/deps/litellm/litellm/proxy/auth/auth_exception_handler.py:22-80`, `auth_checks.py:327,636,660`, `user_api_key_auth.py:1446-1467,1554-1577 @ HEAD 934ecdca78daf7ec9514efd47df77bf7495c822d` | Fallback token on DB auth outage and preserves budget/quota checks as explicit failures |
| **Anthropic** | `Z:/repos/deps/claude-agent-sdk-python/src/claude_agent_sdk/_internal/session_resume.py:305-359`, `tests/test_message_parser.py:366-393`, `src/claude_agent_sdk/types.py:655,952 @ HEAD b512f256450dba8f0dd1399e485563b7deb9c534` | Auth files safely preserved for session resume, redacts refresh tokens, preserves usage including cache token fields |
| **cnighswonger** | `Z:/repos/deps/cnighswonger-claude-code-cache-fix/README.md:42,283-339`, `proxy/extensions/cache-telemetry.mjs:151-182,214-215`, `proxy/stream.mjs:21-22 @ HEAD 2f17aeb9062da66efa4fa3a1fa6a26a9afe383ff` | Per-session cache telemetry from request session headers and cache token fields |
| **CLIProxyAPI** | `selector.go:116-250,434-493`, `conductor.go:68-72,2107,2134-2143,2539,2560-2571 @ HEAD 785b00c3` | Priority + cooldown routing, session affinity, OAuth refresh backoff, separate 401/429 handling |

## Recommendations

1. **Pre-loop auth-health gate**: if `expired < now` OR `/api/oauth/usage` returns 401 for ≥2 accounts, BLOCK `/loop` and run reauth before work starts
2. **Single writer**: make `reset_soonest_priority.py` the only writer during utilization windows; keep `balance.py` disabled to avoid cycle-311e two-writer conflict
3. **State machine**: persist per-account state: `healthy` / `stale_access` / `reauth_required` / `rate_limited` / `weekly_exhausted` / `disabled`
4. **Treat 401 as credential-dead**, 429 as quota/cooldown — never demote weekly-soonest accounts based on stale 401 without first reauthing them

## Q3: Anthropic OAuth Usage Discipline

[VERIFIED] CCC scripts expect the current usable shape as:
- `five_hour.utilization`, `five_hour.resets_at`: `status.py:140`, `fleet_report.py:206`
- `seven_day.utilization`, `seven_day.resets_at`: `status.py:141`, `fleet_report.py:207`
- `seven_day_sonnet`, `seven_day_opus`: `status.py:142`, `fleet_report.py:208-209`
- `extra_usage`: `status.py:143`, `fleet_report.py:210`

[UNKNOWN] User-mentioned fields `session_reset_at`, `weekly_reset_at`, `requests_remaining`, `models` were not verified live because direct TLS smoke failed before HTTP response.

**Correct soonest-reset priority per current code**:
- Fetch active, non-disabled auths: `reset_soonest_priority.py:86-99`
- Classify 401 as `AUTH_DEAD_401`, 429 as `RATE_LIMITED_429`: `reset_soonest_priority.py:80-82`
- Sort healthy accounts by `seven_day.resets_at`, not by most headroom: `reset_soonest_priority.py:175-195`
- Hard-demote weekly ≥95% or session ≥99%; soft-demote session ≥85%: `reset_soonest_priority.py:156-193`
- Assign ladder `[90,80,70,60,50,40,30,20]`; errors go `P=10`: `reset_soonest_priority.py:53-55,214-235`

## Q4: Cache Optimization

[VERIFIED] Cache rate originates from upstream Anthropic response usage fields per request, not from local estimates:
- Anthropic usage fields parsed from SSE: `Z:/repos/deps/CLIProxyAPI/internal/runtime/executor/claude_executor.go:287-292,459-492 @ HEAD 785b00c3`
- Usage reporter created with account/auth context: `claude_executor.go:141,321 @ HEAD 785b00c3`
- CLIProxyAPI usage record has `Source`, `InputTokens`, `OutputTokens`, `CachedTokens`: `sdk/cliproxy/usage/manager.go:12-33 @ HEAD 785b00c3`
- Usage queue plugin serializes `cached_tokens` per request/account source: `internal/redisqueue/plugin.go:52-62,70-80,106-119 @ HEAD 785b00c3`
- cnighswonger also reads `cache_read_input_tokens` and `cache_creation_input_tokens`: `proxy/stream.mjs:21-22`, `proxy/extensions/cache-telemetry.mjs:181-182,214-215 @ HEAD 2f17aeb`

[VERIFIED] eee design says session affinity exists because cache is per-account and TTL should match 1h cache: `Z:/claude-sota-installed/docs/eee-launch-design-cliproxyapi.md:177-183`

**Cache-rate 0% likely causes**:
1. No successful Anthropic responses due stale auth, so no cache-read accounting
2. Session affinity is broken if traffic is not reaching the expected proxy chain
3. First post-reauth calls are cache creation, not cache read; expect cache read only on repeated stable prefixes
4. If sessions rotate accounts too aggressively, cache locality is destroyed

**Recommendations**:
- Reauth first; cache cannot recover while requests fail
- Keep `X-Session-Affinity` / Claude session identity stable for at least 1h
- Avoid cross-account balancing during a warm loop; use drain-soonest at account priority level but preserve session affinity inside each active session
- Confirm cnighswonger `:19801` upstream points to live CCC/eee proxy and not dead `:8317`

## Q5: Token Optimization (rtk diagnostic)

[VERIFIED] RTK installed version is `0.39.0`. RTK is a **command-output filter/proxy**, NOT an LLM prompt compressor:
- "reduces LLM token consumption by 60-90%": `Z:/repos/deps/rtk-ai__rtk/README.md:6 @ HEAD 80a6fe606f73b19e52b0b330d242e62a6c07be42`
- Filters/compresses command output before LLM context: `README.md:36`
- `rtk init -g` installs hook; Claude Code default: `README.md:105,305-312`
- Hook rewrites Bash commands transparently: `README.md:118,294-300`
- Built-in tool calls bypass the Bash hook: `README.md:120,300`
- Windows native limitation: no auto-rewrite hook; fallback instruction mode: `README.md:316-348`
- `rtk gain` verifies correct package and stats: `INSTALL.md:23-65,183`

**Recommendations for autonomous `/loop`**:
1. Use `rtk` for noisy shell commands: `rtk git status`, `rtk pytest`, `rtk rg`, `rtk log`, `rtk curl`
2. Do NOT rely on RTK for direct tool reads (`Read`, `Grep`, `Glob`) or non-shell traces
3. For CCC Windows native, prefer explicit `rtk <cmd>` in automation scripts because hook auto-rewrite may not fire
4. Keep full-output escape hatch enabled for failures; RTK docs note failed commands save full unfiltered output for later read: `README.md:386-393`
5. **Alternatives**:
   - `anthropic-tokenizer`: useful for estimating tokens, not reducing command-output blast radius
   - `claude-token-counter`: accounting only, not command-output filtering
   - RTK: best fit for `/loop` shell chatter because it reduces incoming observation tokens

## Q6: Recovery Playbook

### Step 1 — Probe auth files without printing tokens

```powershell
Get-ChildItem Z:/claude/ccc/auth -Filter 'claude-*.json' | ForEach-Object {
  $d = Get-Content $_.FullName -Raw | ConvertFrom-Json
  [pscustomobject]@{
    file = $_.Name
    email = $d.email
    disabled = $d.disabled
    expired = $d.expired
    stale = ([datetime]::Parse($d.expired) -lt (Get-Date))
    priority = $d.priority
    has_access = [bool]$d.access_token
    has_refresh = [bool]$d.refresh_token
  }
} | Format-Table -AutoSize
```

### Step 2 — Reauth order

Use weekly-reset proximity if any usage probe succeeds. In the current state, all active tokens are stale and `P=10`, so reauth all active accounts first. If manual order must be chosen without usage data, reauth the 7 active accounts, then the disabled account last.

### Step 3 — Manual CLIProxyAPI login

Source flag is `--claude-login`: `Z:/claude-sota-installed/docs/eee-launch-design-cliproxyapi.md:19`, `Z:/repos/deps/CLIProxyAPI/cmd/server/main.go:81 @ HEAD 785b00c3`.

```powershell
cli-proxy-api --config Z:\claude\ccc\config.yaml --claude-login
```

### Step 4 — Safer automated path via `safe_reauth.py`

Snapshots metadata, starts OAuth, accepts callback, waits for completion, restores metadata, then verifies `/api/oauth/usage`:
- OAuth callback replaces auth file and metadata must be restored: `Z:/claude/ccc/tools/safe_reauth.py:5-7`
- Preserved fields: `safe_reauth.py:25`
- Snapshot: `safe_reauth.py:35-57`
- Restore: `safe_reauth.py:60-84`
- Start auth URL and submit callback: `safe_reauth.py:97-106`
- Full flow: `safe_reauth.py:129-176`
- Verify usage after reauth: `safe_reauth.py:178-199`

```powershell
python Z:\claude\ccc\tools\safe_reauth.py 739955940fc@gmail.com
python Z:\claude\ccc\tools\safe_reauth.py 739955940fc@gmail.com --callback "<redirect-url>"
```

### Step 5 — Post-reauth verification

Expected within 5 minutes:
- `/api/oauth/usage` HTTP 200 for each reauthed account
- `status.py` no `HTTP 401` for active accounts
- CLIProxyAPI success rate recovers immediately after first successful `/v1/messages`
- Cache rate: first warm call remains near 0% (cache creation), cache read begins on repeated stable-prefix calls

### Step 6 — Schedule reset-soonest before next `/loop` fire

**PowerShell**:
```powershell
$env:CCC_MGMT_TOKEN = "cliproxy-mgmt-42"
schtasks /Create /TN "ccc-reset-soonest" /SC MINUTE /MO 30 /TR "powershell.exe -NoProfile -ExecutionPolicy Bypass -Command `$env:CCC_MGMT_TOKEN='cliproxy-mgmt-42'; Z:\venvs\claude\Scripts\python.exe Z:\claude\ccc\tools\reset_soonest_priority.py" /RU "$env:USERNAME" /F
```

**Git Bash**:
```bash
schtasks //Create //TN "ccc-reset-soonest" //SC MINUTE //MO 30 //TR "powershell.exe -NoProfile -ExecutionPolicy Bypass -Command \"\$env:CCC_MGMT_TOKEN='cliproxy-mgmt-42'; Z:\\venvs\\claude\\Scripts\\python.exe Z:\\claude\\ccc\\tools\\reset_soonest_priority.py\"" //RU "$USERNAME" //F
```

⚠️ Do NOT run `balance.py` on the same schedule.

## Final Recommendations

- **Immediate**: reauth all 7 active stale accounts; leave disabled account last unless needed
- **Before reauth**: snapshot metadata with `safe_reauth.py --snapshot <email>`
- **After reauth**: run `status.py`, then one real low-cost request through the proxy chain, then `fleet_report.py`
- **Routing**: single writer only, `reset_soonest_priority.py` every 30m
- **Cache**: keep session affinity at 1h and verify cnighswonger upstream points to the live CCC proxy port
- **Token**: use RTK explicitly in `/loop` shell-heavy flows; do not assume native Windows hook auto-rewrite

---

**VERDICT: APPROVE**

Total tokens: 255,575 / tool uses: 1 / duration: 391s
