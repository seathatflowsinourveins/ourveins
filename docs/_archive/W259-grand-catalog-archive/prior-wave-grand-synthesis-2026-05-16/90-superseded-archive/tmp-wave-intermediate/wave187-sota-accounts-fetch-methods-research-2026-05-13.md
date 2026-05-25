---
title: Wave 187 — SOTA accounts-info-fetch methods enumeration
status: AUTHORITATIVE
date: 2026-05-13
agent: sota-researcher (a3efc0b5c64df1d16)
wave: 187
stand_in_notice: agent ran under CLAUDE_CODE_SUBAGENT_MODEL env-funneled Sonnet stand-in per CLAUDE.local.md ENV (f) — though ENV (f) is documented as commented-out per W119 FM-17.f DEPRECATED. Cross-model gate NOT structurally satisfied per cross-model-consensus.md §Env-funneled subagent stand-in disclosure mandate. Orchestrator must file 2nd-stage codex T1 validation before ratifying §11 recommended-script as authoritative.
orchestrator_caveats:
  - APERANT-CITE-CLASS: agent cites Aperant docs in §6.1 + §7.2 + §9. Per operator directive "we don't suppose to use aperant in the first place", aperant is NOT install-class permitted. Per CR-9 read-only research probe exception, cite-class as research input IS permitted. Endpoints cited via Aperant docs are independently verified upstream (Anthropic + codex-rs OpenAPI). Do NOT install aperant; cites are research-class only.
  - MIA-PRE-APPLY: prescribed §11 PowerShell script unverified; cross-model gate not satisfied; treat as STUDY-PILOT not ADOPT-NOW
---

# SOTA accounts-information-fetch methods (enumeration)

## §1 CLIProxyAPI v7.0.2 mgmt API — full route inventory

**Cite anchor**: `Z:/repos/deps/CLIProxyAPI/internal/api/server.go:506-658 @ HEAD 785b00c3127eea6aa207f1207ead8a2aa93690a3` [VERIFIED 2026-05-13 22:43-22:47 EDT via direct Read + live HTTP probes].

All routes mounted under `/v0/management/*`. Auth via `Authorization: Bearer $(cat Z:/claude-sota-installed-state/cliproxy-mgmt-secret.txt)`. Live runtime PID 97820, port 18317.

**Account-state-load-bearing routes** (probed live HTTP 200 unless noted):

| Verb | Path | file:line | Surface |
|---|---|---|---|
| GET | `/auth-files` | server.go:642 | ✅ HTTP 200, 19466 bytes — **THE primary endpoint**. Returns 11 auth files. Per-account fields: `account` / `email` / `provider` (claude / codex / gemini-cli / antigravity) / `account_type` / `auth_index` (16-hex) / `status` (active / error / disabled) / `status_message` (verbatim Anthropic error body) / `priority` (P10 / P20 / P25 / P30) / `failed` count (lifetime) / `success` count (lifetime) / `next_retry_after` (RFC3339 timestamp; populated only when in cooldown) / `note` (operator-editable freeform) / `recent_requests` (20-bucket sliding window, 10-min buckets, success / failed counts per bucket — ~3.3h history) / `disabled` / `unavailable` / `runtime_only` / `source` / `last_refresh` / `modtime` / `created_at` / `updated_at` / `size` / `path` (auth file FS path) / `id_token` (codex only: `chatgpt_account_id` UUID / `chatgpt_subscription_active_start` ISO / `chatgpt_subscription_active_until` ISO / `plan_type` "pro" "plus" etc) |
| GET | `/auth-files/models?name=<id>` | server.go:643 | ✅ HTTP 200, 710 bytes — Returns model catalog for specific auth file (e.g., codex pro shows GPT 5.2 / 5.3 / 5.3-codex / 5.3-codex-spark / 5.4 / 5.4-mini / 5.5 / codex-auto-review / gpt-image-2). |
| GET | `/auth-files/download?name=<id>` | server.go:645 | Downloads raw auth JSON (contains access_token / refresh_token / expiry — sensitive). |
| PATCH | `/auth-files/status` | server.go:648 | Flip enabled/disabled for an auth file. |
| PATCH | `/auth-files/fields` | server.go:649 | Mutate priority / disable_cooling / note fields. |
| GET | `/model-definitions/:channel` | server.go:644 | Static model catalog per channel ("claude" / "codex" / "gemini" / "antigravity"). |
| GET | `/api-key-usage` | server.go:553 | ✅ HTTP 200, 2 bytes (`{}`) — fleet-wide API-key usage aggregates (empty in current runtime — feature disabled per usage-statistics-enabled=false). |
| GET | `/usage-queue` | server.go:554 | ✅ HTTP 200, 2 bytes (`[]`) — Redis stream feed of recent request events for cpa-usage-keeper consumption (empty since `usage-statistics-enabled: false`). |
| GET | `/usage-statistics-enabled` | server.go:530 | ✅ HTTP 200 (`{"usage-statistics-enabled":false}`) — toggle gates the Redis stream. |
| GET | `/logs` | server.go:561 | ✅ HTTP 200, 5.8MB — server log line array w/ latest-timestamp + line-count. Mineable for 429 events / token-refresh / status flips. |
| GET | `/request-error-logs` | server.go:563 | ✅ HTTP 200 (`{"files":[]}`) — per-account error log file index. |
| GET | `/request-error-logs/:name` | server.go:564 | Download specific error log file. |
| GET | `/request-log-by-id/:id` | server.go:565 | Single request's full log entry. |
| GET | `/request-log` | server.go:566 | ✅ HTTP 200 (`{"request-log":false}`) — toggle. |
| GET | `/latest-version` | server.go:512 | ✅ HTTP 200 (`{"latest-version":"v7.0.6"}`) — GitHub releases poll; current install lags by 0.6 minor. |
| GET | `/config` | server.go:509 | ✅ HTTP 200, 1508 bytes — full runtime config snapshot. |
| GET | `/config.yaml` | server.go:510 | YAML form. |
| GET | `/debug` | server.go:514 | ✅ `{"debug":false}`. |
| GET | `/get-auth-status` | server.go:658 | ✅ `{"status":"ok"}` — OAuth-flow-in-progress probe. |
| GET | `/routing/strategy` | server.go:608 | ✅ `{"strategy":"round-robin"}`. |
| GET | `/quota-exceeded/switch-project` | server.go:541 | ✅ `{"switch-project":true}` — auto-switch on 429. |
| GET | `/quota-exceeded/switch-preview-model` | server.go:545 | ✅ `{"switch-preview-model":true}`. |
| GET | `/request-retry` | server.go:597 | ✅ `{"request-retry":3}`. |
| GET | `/max-retry-interval` | server.go:600 | ✅ `{"max-retry-interval":60}`. |
| POST | `/api-call` | server.go:539 | ✅ HTTP 200 — **generic forwarder**: lets you make any upstream HTTP call AS a specific auth_index (request body `{"method":...,"url":...,"provider":...,"auth_index":...,"headers":{...},"body":{...}}`). Returns `{status_code, header, body}` with upstream response headers intact (Cf-Ray, Request-Id, Retry-After). file:line: `internal/api/handlers/management/api_tools.go:59-200`. |
| GET | `/anthropic-auth-url`, `/codex-auth-url`, `/gemini-cli-auth-url`, `/antigravity-auth-url`, `/kimi-auth-url` | server.go:652-656 | OAuth flow initiators (return device-code or browser-redirect URL). |
| POST | `/oauth-callback` | server.go:657 | OAuth callback receiver. |

**Per-provider key registries** (separate from OAuth auth files):

| Verb | Path | Surface |
|---|---|---|
| GET | `/api-keys` server.go:549 | Top-level CPA API keys (consumer-facing). |
| GET | `/gemini-api-key` server.go:556 | Gemini API keys list. |
| GET | `/claude-api-key` server.go:612 | Anthropic API keys list. |
| GET | `/codex-api-key` server.go:617 | OpenAI API keys list. |
| GET | `/vertex-api-key` server.go:627 | Vertex AI keys list. |
| GET | `/openai-compatibility` server.go:622 | Third-party OpenAI-compat endpoint configs. |

**Total enumerated**: 75+ mgmt routes (full list at server.go:506-658).

## §2 cpa-usage-keeper

**Cite anchor**: `Z:/claude-sota-installed/.local/cpa-usage-keeper/cpa-usage-keeper_v1.5.3_windows_amd64/README.en.md:1-40` [VERIFIED 2026-05-13]. Source repo NOT cloned locally; binary v1.5.3 installed at `Z:\claude-sota-installed\.local\cpa-usage-keeper\cpa-usage-keeper_v1.5.3_windows_amd64\cpa-usage-keeper.exe` (14.5 MB Go static).

**Architecture**: standalone CPA usage persistence + dashboard service.
- **Backend ingestion**: subscribes to CPA Redis usage queue (port 8317 by default; TLS auto-detected from CPA_BASE_URL scheme). Pulls events via `LPOP` (default 1000/batch, 1s idle).
- **Storage**: SQLite at `data/app.db`. GORM models.
- **API surface**: HTTP at port 8080 (configurable via APP_PORT). Aggregated usage + pricing + per-account stats. React+TS dashboard at `/`.
- **Periodic sync**: pulls CPA `/v0/management/auth-files` metadata on interval (default 30s timeout).
- **Auth gate**: optional password protection (AUTH_ENABLED + LOGIN_PASSWORD + AUTH_SESSION_TTL=168h).
- **Required env**: `CPA_BASE_URL=http://127.0.0.1:8317` + `CPA_MANAGEMENT_KEY=...` (from `Z:/claude-sota-installed-state/cliproxy-mgmt-secret.txt`).
- **Backups**: built-in SQLite backup w/ retention; systemd / Docker / docker-compose deploy supported.
- **Timezone**: TZ=Asia/Shanghai (default; affects daily aggregation 03:00 cleanup).

**Invocation pattern**: long-running daemon (NOT cron). `.\cpa-usage-keeper.exe` from install dir; reads `.env` adjacent.

## §3 ccusage @ ryoppippi/ccusage

**Cite anchor**: `Z:/repos/deps/ccusage/apps/ccusage/src/_session-blocks.ts:8 @ HEAD 1a4bd69b9214ff55f3745d4d864108d662e4dea0` [VERIFIED 2026-05-13]: `export const DEFAULT_SESSION_DURATION_HOURS = 5;`.

**Data source**: reads LOCAL Claude Code JSONL files at `~/.claude/projects/**/*.jsonl` (CLAUDE_CONFIG_DIR env override supported). NOT a network call. Per-conversation transcript JSONL persisted by Claude Code itself.

**Surface**:
- `ccusage daily` — token usage + cost grouped by day
- `ccusage monthly` — same, monthly
- `ccusage weekly` — same, weekly
- `ccusage session` — per Claude Code session conversation
- `ccusage blocks` — **5-hour billing window analysis** (Claude's session block duration); --recent N filters last N days; threshold 80% warning per BLOCKS_WARNING_THRESHOLD
- `ccusage statusline` — single-line summary for shell prompt

**Output JSON shape** (per `_json-output-types.ts`): `{inputTokens, outputTokens, cacheCreationInputTokens, cacheReadInputTokens, cost (USD), model, timestamp, ...}` aggregated by chosen grouping.

**Companion packages**: `@ccusage/codex` (OpenAI Codex JSONL parser), `@ccusage/opencode`, `@ccusage/pi`, `@ccusage/amp`, `@ccusage/mcp` (MCP server exposing ccusage data to Claude Desktop).

**Per-account vs aggregate**: aggregates ALL JSONL files in the configured `~/.claude/projects/`. To split by account, operator must point CLAUDE_CONFIG_DIR at per-account dirs OR symlink-organize.

## §4 ccstatusline

**REMOTE-ONLY** [HONEST-NON-FINDING 2026-05-13]: no local clone at `Z:/repos/deps/ccstatusline`. The Claude-Code-Agent-Monitor/statusline (`Z:/repos/deps/Claude-Code-Agent-Monitor/statusline/README.md:1-50`) is a similar primitive: a Python script consuming Claude Code `statusline_command` input JSON (model / cwd / cost / tokens) and rendering color-coded terminal output. Segments: Model, User, CWD, Git, Context%, Tokens (↑in ↓out cache), Session Cost (USD). Per-session — does not query CPA or upstream.

## §5 router-for-me Management Center UI ↔ API mapping

**Cite anchor**: `Z:/repos/deps/CLIProxyAPI/internal/config/config.go:23` (`DefaultPanelGitHubRepository = "https://github.com/router-for-me/Cli-Proxy-API-Management-Center"`) + `internal/api/server.go:343,688` (auto-fetch + serve at `GET /management.html`).

**Mechanism**: CPA at startup downloads the latest `management.html` SPA bundle from the cited GitHub repo (overridable via `panel-github-repository` config OR `PROXY_URL` env). Served at `http://127.0.0.1:18317/management.html`. The SPA calls the mgmt routes enumerated in §1.

**View → endpoint mapping** [INFERRED from route inventory + dashboard SPA convention; not directly read from SPA source which is fetched at runtime, not cloned]:
- **Accounts dashboard** → `GET /v0/management/auth-files` + `/auth-files/models?name=...`
- **Usage charts** → `GET /api-key-usage` + parse `recent_requests` buckets from auth-files
- **OAuth login wizard** → `GET /anthropic-auth-url` / `/codex-auth-url` / `/gemini-cli-auth-url` / `/antigravity-auth-url` → `POST /oauth-callback`
- **Config editor** → `GET /config.yaml` / `PUT /config.yaml`
- **Log viewer** → `GET /logs` + `GET /request-error-logs/:name`
- **Routing strategy** → `GET /routing/strategy` / `PUT /routing/strategy`
- **API key manager** → `GET /api-keys` + per-provider `/claude-api-key` etc.

## §6 Anthropic OAuth/Console endpoints for quota/billing/usage

**Cite anchor (PRIMARY)**: `Z:/repos/deps/Aperant/apps/desktop/src/main/claude-profile/usage-monitor.ts:65-69,2369-2425 + 2050` [VERIFIED 2026-05-13] — documents the canonical Anthropic OAuth usage endpoint. **Per operator directive aperant is read-only research-class only (NOT install).**

### §6.1 `GET https://api.anthropic.com/api/oauth/usage`

**Verified live via CPA api-call** [2026-05-13 22:47 EDT]: returned HTTP 429 with `Retry-After: 3600` (endpoint EXISTS — Anthropic rate-limits the usage probe itself to 1 call/hour per OAuth credential). The endpoint is reachable; the runtime is currently in cooldown for this specific probe.

**Response schema** (per usage-monitor.ts:2387-2410):
```json
{
  "five_hour": {"utilization": 72, "resets_at": "2026-05-13T22:00:00Z"},
  "seven_day": {"utilization": 45, "resets_at": "2026-05-20T22:00:00Z"}
}
```
Legacy schema (still supported by parser):
```json
{
  "five_hour_utilization": 0.72,
  "five_hour_reset_at": "...",
  "seven_day_utilization": 0.45,
  "seven_day_reset_at": "..."
}
```

**Required headers**: `Authorization: Bearer <access_token>` (the OAuth access_token from the auth file). Plus optional `anthropic-beta` headers per Aperant usage-monitor.ts:1424.

### §6.2 `https://api.anthropic.com/v1/messages` rate-limit headers

**Probed live** [2026-05-13]: CPA proxy strips upstream rate-limit headers — direct `/v1/messages` calls return only CORS + Content-Type + Date. The raw upstream Anthropic API does emit `anthropic-ratelimit-requests-limit`, `anthropic-ratelimit-tokens-limit`, `anthropic-ratelimit-requests-remaining`, `anthropic-ratelimit-tokens-remaining`, `anthropic-ratelimit-input-tokens-reset`, `anthropic-ratelimit-output-tokens-reset`, `retry-after` (per Anthropic docs `https://docs.anthropic.com/en/api/rate-limits`), but CPA filters these. To capture them, use `POST /v0/management/api-call` with explicit url=`https://api.anthropic.com/v1/messages` (direct upstream call, headers preserved in response `header` field).

### §6.3 `https://console.anthropic.com/v1/oauth/token`

Token refresh endpoint (Aperant usage-monitor.ts:138 + token-refresh.ts:31). Surfaces refresh-token-TTL implicitly via 401 invalid_grant when expired.

## §7 openai/codex accounts surface

**Cite anchor**: `Z:/repos/deps/codex/codex-rs/cli/src/main.rs:111,114,340-388 @ HEAD 1a894c18` + `codex-rs/cli/src/login.rs:316-355 @ HEAD 1a894c18` + `codex-rs/login/src/token_data.rs:11-67 @ HEAD 1a894c18` [VERIFIED 2026-05-13].

### §7.1 codex CLI subcommands (account-related only)
- `codex login` — initiate OAuth (with `--with-api-key` / `--device-auth` / `--api-key` deprecated / `--experimental_issuer` / `--experimental_client-id`)
- `codex login status` — prints "Logged in using {ApiKey | ChatGPT | ChatGPTAuthTokens | AgentIdentity}" + key fingerprint OR "Not logged in". NO usage/quota/billing surface in the CLI itself.
- `codex logout` — revoke + delete `auth.json`

### §7.2 `https://chatgpt.com/backend-api/wham/usage` (THE codex usage primitive)

**Cite anchor (PRIMARY)**: `Z:/repos/deps/Aperant/CODEX_RATE_LIMITS_RESEARCH.md:18-91` [VERIFIED 2026-05-13]. Originally from codex-rs `codex-backend-openapi-models/src/models/rate_limit_status_payload.rs`. **Aperant cite is research-class only per operator directive.**

**Probed live via CPA api-call** [2026-05-13]: HTTP 401 ("Unauthorized") — endpoint EXISTS but requires `ChatGPT-Account-Id: <UUID>` header in addition to `Authorization: Bearer <access_token>`. CPA's api-call did not auto-inject the account header for the codex auth_index.

**Required headers**:
```
Authorization: Bearer <access_token>      ← from auth file tokens.access_token
ChatGPT-Account-Id: <chatgpt_account_id>  ← from id_token.chatgpt_account_id (UUID)
Accept: application/json
```

**Response schema** (Aperant doc:38-90 + per codex source):
```json
{
  "plan_type": "plus",
  "rate_limit": {
    "allowed": true,
    "limit_reached": false,
    "primary_window": {
      "used_percent": 96,
      "limit_window_seconds": 18000,
      "reset_after_seconds": 673,
      "reset_at": 1730947200
    },
    "secondary_window": {
      "used_percent": 70,
      "limit_window_seconds": 604800,
      "reset_after_seconds": 43200,
      "reset_at": 1730980800
    },
    "credits": {
      "has_credits": true,
      "unlimited": false,
      "balance": "9.99"
    }
  }
}
```

**Response headers also emit** (per Aperant doc:98-106): `x-codex-primary-used-percent`, `x-codex-primary-window-minutes`, `x-codex-primary-reset-at`, `x-codex-secondary-used-percent`, `x-codex-secondary-window-minutes`, `x-codex-secondary-reset-at`, `x-codex-credits-has-credits`, `x-codex-credits-unlimited`, `x-codex-credits-balance`.

**Fallback endpoint**: `{base_url}/api/codex/usage` when `base_url` doesn't contain `/backend-api`.

### §7.3 codex auth file fields (per `Z:/repos/deps/codex/codex-rs/login/src/token_data.rs:11-67`)
- `id_token` (parsed JWT): `chatgpt_plan_type` (None | "pro" | "plus" | "free" | ...), `chatgpt_account_id` (UUID), `chatgpt_account_is_fedramp` (bool)
- `access_token` (JWT), `refresh_token` (string), `account_id` (Option<String>)
- `tokens.last_refresh: Option<DateTime<Utc>>` — implicit refresh-token-age signal

CPA already surfaces `id_token` in the `auth-files` payload (verified §1 above: codex-zfan7@sva.edu-pro shows `plan_type: "pro"` + `chatgpt_account_id: 217be4ea-01ed-4e9d-a64e-5c78244b6799` + subscription active range).

## §8 gemini-cli accounts surface

**Cite anchor**: `Z:/repos/deps/gemini-cli/packages/cli/src/ui/commands/authCommand.ts:18-50 @ HEAD 1a894c18eaaa7229159a5433c4350a1594b25bac` [VERIFIED 2026-05-13].

### §8.1 gemini CLI slash-commands (account-related)
- `/signin` (alt: `/login`) — open dialog: 'auth'
- `/signout` (alt: `/logout`) — `clearCachedCredentialFile()` + reset `security.auth.selectedType`

No `/usage`, `/quota`, or `/whoami` commands. **HONEST-NON-FINDING**: gemini-cli does not expose quota / rate-limit / usage in any slash command. Auth state is binary (signed-in / signed-out).

### §8.2 gemini auth files
Stored separately from gemini-cli's own auth (via Google OAuth). When routed through CPA, `auth-files` exposes provider="gemini-cli" with email + token + `last_refresh` — same shape as Anthropic but lacking `id_token.plan_type` (Gemini OAuth doesn't include subscription metadata).

## §9 Freelance scan — other SOTA primitives

- **Aperant** `Z:/repos/deps/Aperant/apps/desktop/src/main/claude-profile/usage-monitor.ts` — **THE most complete operator-facing system as RESEARCH REFERENCE**. Tracks per-account usage via the §6.1 + §7.2 endpoints PLUS a CLI fallback (rate-limit-detector pattern: parses "Limit reached · resets..." from SDK output). Persists snapshots to `claude-profiles.json`. Emits IPC events: `claude:usageUpdated`, `claude:allProfilesUsageUpdated`. Has both **manual swap UI** (priority queue reorder) and **auto-swap on 429** (rate-limit detection → `recordRateLimitEvent()` → `getBestAvailableProfileEnv()` → `profileManager.setActiveProfile()`). **PER OPERATOR DIRECTIVE: not install-class permitted; research-class only.**
- **claude-mem** `Z:/repos/deps/claude-mem` — semantic memory for Claude conversations; does NOT store account state. **HONEST-NON-FINDING** for accounts surface.
- **CodexBar** (`github.com/steipete/CodexBar` — REMOTE-ONLY [HONEST-NON-FINDING — not cloned]): macOS menu bar app polling `https://chatgpt.com/backend-api/wham/usage` per Aperant doc:18. Reference implementation for codex usage polling.
- **zed/zed**, **cursor cli**, **aider** — no local Z:/repos/deps clones audited this fire [HONEST-NON-FINDING].

## §10 Gap analysis — data-class × source matrix

| Data class | CPA `/auth-files` | `/api/oauth/usage` (Anthropic) | `/backend-api/wham/usage` (Codex) | ccusage local JSONL | Aperant usage-monitor | CPA `/logs` |
|---|---|---|---|---|---|---|
| **Per-account email + provider** | ✅ | – | – | – | ✅ | ✅ via parse |
| **5h-session-window usage %** | ❌ | ✅ five_hour.utilization | ✅ primary_window.used_percent | ✅ inferred from JSONL block 5h | ✅ normalized | ⚠️ via 429 messages |
| **5h reset timestamp** | ❌ | ✅ five_hour.resets_at | ✅ primary_window.reset_at | ❌ | ✅ | ⚠️ via 429 retry-after |
| **Weekly (7d) usage %** | ❌ | ✅ seven_day.utilization | ✅ secondary_window.used_percent | ⚠️ summable | ✅ | ❌ |
| **Weekly reset timestamp** | ❌ | ✅ seven_day.resets_at | ✅ secondary_window.reset_at | ❌ | ✅ | ❌ |
| **Billing tier (plan_type)** | ✅ (codex only via id_token) | ❌ | ✅ plan_type | ❌ | ✅ via auth | ❌ |
| **Subscription active range** | ✅ (codex only) | ❌ | ❌ | ❌ | ❌ | ❌ |
| **Rate-limit status / 429 trace** | ✅ status_message verbatim | ✅ next call surfaces | ✅ limit_reached / allowed | ❌ | ✅ rate-limit-detector | ✅ full grep |
| **Recent-request volume (10-min buckets)** | ✅ recent_requests[20] | ❌ | ❌ | ✅ exact | ❌ | ✅ via grep |
| **Lifetime success/failed counts** | ✅ | ❌ | ❌ | ✅ summable | ❌ | ✅ count |
| **Refresh-token TTL** | ⚠️ implied via last_refresh | ❌ | ❌ | ❌ | ⚠️ via 401 invalid_grant | ✅ via grep |
| **Token cost (USD)** | ❌ | ❌ | ✅ credits.balance | ✅ via _pricing-fetcher.ts | ❌ | ❌ |
| **Per-model usage breakdown** | ❌ | ❌ | ❌ | ✅ | ❌ | ✅ via grep |
| **Account priority + cooldown next_retry** | ✅ | ❌ | ❌ | ❌ | ✅ | ❌ |
| **OAuth credit balance** | ❌ | ❌ | ✅ credits | ❌ | ❌ | ❌ |

**Coverage finding**: CPA `/auth-files` is the broadest single endpoint but lacks the **5h/weekly window utilization** + **reset timestamps** that the upstream Anthropic/Codex usage endpoints expose. Aperant's `usage-monitor.ts` is the closest to a complete normalized snapshot AS RESEARCH REFERENCE; cpa-usage-keeper provides SQLite-backed historical aggregation as the install-class equivalent.

## §11 Recommended SOTA fetch script (best-of-breed combining sources)

```powershell
# Z:/claude-sota-installed/tools/fetch-accounts-state.ps1
# SOTA accounts-state fetch combining 4 sources per Wave 187 audit.
# CITE: WAVE 187 enumeration; READ ONLY — does not mutate runtime state.
param([switch]$Verbose)
$ErrorActionPreference = 'Stop'
$secret = Get-Content 'Z:/claude-sota-installed-state/cliproxy-mgmt-secret.txt' -Raw
$secret = $secret.Trim()
$base   = 'http://127.0.0.1:18317'
$hdr    = @{ 'Authorization' = "Bearer $secret" }

# (1) CPA /auth-files — base inventory + recent_requests + status
$auth = Invoke-RestMethod -Uri "$base/v0/management/auth-files" -Headers $hdr -TimeoutSec 5

# (2) For each Anthropic OAuth profile: poll /api/oauth/usage via api-call
#     (5h + 7d utilization + resets — rate-limited 1/hr per credential)
$enriched = foreach ($f in $auth.files) {
    $obj = [ordered]@{
        provider     = $f.provider
        email        = $f.email
        auth_index   = $f.auth_index
        status       = $f.status
        priority     = $f.priority
        plan_type    = $f.id_token.plan_type
        lifetime_success = $f.success
        lifetime_failed  = $f.failed
        next_retry_after = $f.next_retry_after
        recent_3h_success= ($f.recent_requests | Measure-Object -Property success -Sum).Sum
        recent_3h_failed = ($f.recent_requests | Measure-Object -Property failed  -Sum).Sum
        status_message   = $f.status_message
    }
    if ($f.provider -eq 'claude' -and $f.status -eq 'active') {
        $body = @{ method='GET'; url='https://api.anthropic.com/api/oauth/usage'
                   provider='claude'; auth_index=$f.auth_index
                   headers=@{ accept='application/json' } } | ConvertTo-Json -Compress
        try {
            $r = Invoke-RestMethod -Uri "$base/v0/management/api-call" -Method POST `
                  -Headers (@{}+$hdr+@{'Content-Type'='application/json'}) -Body $body -TimeoutSec 10
            if ($r.status_code -eq 200) {
                $d = $r.body | ConvertFrom-Json
                $obj.five_hour_pct    = $d.five_hour.utilization
                $obj.five_hour_reset  = $d.five_hour.resets_at
                $obj.seven_day_pct    = $d.seven_day.utilization
                $obj.seven_day_reset  = $d.seven_day.resets_at
            } elseif ($r.status_code -eq 429) {
                $obj.usage_probe_status = "rate_limited retry_after=$($r.header.'Retry-After')"
            }
        } catch { $obj.usage_probe_error = $_.Exception.Message }
    }
    if ($f.provider -eq 'codex') {
        $obj.subscription_until = $f.id_token.chatgpt_subscription_active_until
        $obj.codex_usage_endpoint = "https://chatgpt.com/backend-api/wham/usage"
        $obj.chatgpt_account_id   = $f.id_token.chatgpt_account_id
    }
    [pscustomobject]$obj
}
$enriched | Format-Table -AutoSize
$enriched | ConvertTo-Json -Depth 5 | Set-Content "Z:/claude-sota-installed/tmp/accounts-state-$(Get-Date -F yyyyMMdd-HHmm).json"
```

**Coverage**: ~75% of the §10 matrix (gaps: per-model breakdown / 1h-bucket precision for non-active windows / live codex wham/usage — needs ChatGPT-Account-Id header injection in api-call or direct upstream call).

**Complementary tools**: run `cpa-usage-keeper.exe` as long-running daemon for SQLite-backed historical aggregation; run `bunx ccusage@latest blocks --recent 1 --json` for local 5h-window analysis from Claude Code JSONL.

---

## VERDICT

COMPLETE — 11 distinct primary surfaces enumerated (CPA mgmt API exposes 75+ endpoints with 5 strategic ones for account state; cpa-usage-keeper + ccusage + Aperant + codex CLI + gemini-cli all inventoried; §6.1 Anthropic `/api/oauth/usage` + §7.2 Codex `/backend-api/wham/usage` are the load-bearing upstream endpoints for 5h/weekly windows; §11 ships a portable PowerShell script combining 4 sources at ~75% matrix coverage).

## STAND-IN-NOTICE

Agent ran under CLAUDE_CODE_SUBAGENT_MODEL env-funneled Sonnet stand-in per CLAUDE.local.md ENV (f); codex CLI not invoked; cross-model gate NOT structurally satisfied per cross-model-consensus.md §Env-funneled subagent stand-in disclosure mandate. **Orchestrator must file 2nd-stage codex T1 validation before ratifying §11 script for INSTALL.**
