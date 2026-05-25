# Wave 87 — FINAL Fleet Status + Aperant SOTA Deep-Dive (2026-05-08)

## §1 FINAL ACCOUNT INFORMATION (all 10 OAuth identities)

Source: live SQLite probe of `Z:/claude-sota-installed/.local/cpa-usage-keeper/cpa-usage-keeper_v1.5.2_windows_amd64/data/app.db` at 2026-05-08T16:19 UTC + OAuth file inspection at `Z:/claude-sota-installed/.cli-proxy-api/`.

### 1.1 Active accounts (3 of 10 used today; 921M tokens / $790.16 / 94.4% cache aggregate)

| # | Account | Type | Model | Calls | OK / Fail | Input | Output | Cached | Cache% | Last call | Latency | capacity_score | Reset estimate |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | **aesthetic9c@gmail.com** | Claude | opus-4-7 | 8 | 8 / 0 | 13 | 32,300 | **5,648,047** | **100.0%** | 16:19 UTC | 95,366ms | N/A | ~20:13 (5h roll) |
| 2 | **739955940fc@gmail.com** | Claude | sonnet-4-5 | 6 | **2 / 4 ⚠** | 1,375 | 2,481 | 683,768 | 99.8% | 16:19 UTC | 300ms (failed) | 85 | ~21:19 (5h roll) |
| 3 | **zfan7@sva.edu** | **Codex Pro** | gpt-5.5 | 6 | 6 / 0 | 19,545 | 6,682 | 0 (codex no-cache) | — | 16:09 UTC | 9-21s | — | 2026-05-09 16:09 (24h) |

**Critical observation**: 739955940fc Claude account has 4-failed-of-6 calls (66% failure rate; last 0-token 300ms = 429 PRE-FIRE pattern); aesthetic9c is dominant load-bearing lane (5.6M cached tokens at 100% cache rate).

### 1.2 Idle accounts (7 of 10; 0 calls today; capacity_score from OAuth files)

| # | Account | Type | capacity_score | Status | OAuth file | Token expiry |
|---|---|---|---|---|---|---|
| 4 | dreamweaverhoudini@gmail.com | Claude | **100** | UNUSED-RESERVE | claude-dreamweaverhoudini@gmail.com.json (911 bytes) | 2026-05-08T18:56 |
| 5 | avantmanifest@gmail.com | Claude | **100** | RECOVERED-FROM-429 | claude-avantmanifest@gmail.com.json (740 bytes) | 2026-05-08T18:56 |
| 6 | mr.euphoriaincarnate@gmail.com | Claude | **0 EXHAUSTED** | DISABLE-CANDIDATE (Ship 1V) | claude-mr.euphoriaincarnate@gmail.com.json (610 bytes) | 2026-05-08T18:56 |
| 7 | nalawowac@gmail.com | Claude | N/A | UNUSED | claude-nalawowac@gmail.com.json (666 bytes) | 2026-05-08T18:56 |
| 8 | zfan7@sva.edu | Claude | 67 | UNUSED-RESERVE | claude-zfan7@sva.edu.json (889 bytes) | 2026-05-08T18:56 |
| 9 | 739955940fc@gmail.com | **Antigravity** | — | UNUSED | antigravity-739955940fc@gmail.com.json (594 bytes) | 2026-05-08T12:51 ⚠ EXPIRED-1H |
| 10 | 739955940fc@gmail.com | **Gemini** | — | UNUSED | gemini-739955940fc@gmail.com-gen-lang-client-0557279342.json (1015 bytes) | rolling-RPM |

**Antigravity OAuth expires every 1h** (issued 2026-05-08T11:51 UTC; expired 2026-05-08T12:51 — auto-refresh required).

### 1.3 Today's usage events (last 5; raw from SQLite usage_events)

| Timestamp | Provider | Model | Source | Latency | In | Out | Cached | Failed |
|---|---|---|---|---|---|---|---|---|
| 16:19:14 UTC | claude | sonnet-4-5 | 739955940fc | 300ms | 0 | 0 | 0 | **YES (429-class)** |
| 16:09:21 UTC | codex | gpt-5.5 | zfan7@sva.edu | 9,192ms | 1,919 | 620 | 0 | 0 |
| 15:45:59 UTC | codex | gpt-5.5 | zfan7@sva.edu | 21,482ms | 1,937 | 1,242 | 0 | 0 |
| 15:31:29 UTC | codex | gpt-5.5 | zfan7@sva.edu | 16,507ms | 2,025 | 973 | 0 | 0 |
| 15:13:14 UTC | claude | opus-4-7 | aesthetic9c | 95,366ms | 1 | 5,933 | **718,129** | 0 |

### 1.4 Errors from main.log (32 reselect events + 2× 429)

| Pattern | Count | Last Timestamp | Notes |
|---|---|---|---|
| auth_unavailable_reselect | 32 | 2026-05-08 12:19:14 | Selector reselected after affinity-bound credential unavailable |
| 429 (avantmanifest) | 2 | 2026-05-08 03:51:36 | 03:50:19 + 03:51:36 on `/v1/messages?beta=true` |
| rate_limit string match | 0 | — | proxy doesn't string-match; 429 HTTP only |
| cooldown / ECONNREFUSED | 0 / 0 | — | No connection failures |

## §2 APERANT v2.7.6 SOTA REFERENCE (HEAD `cba7a0270ec794a14ac71615bc6c48085807ede6`)

### 2.1 Repo structure (Z:/repos/deps/Aperant/)

| File | Size | Role |
|---|---|---|
| **CODEX_RATE_LIMITS_RESEARCH.md** | 16,709 bytes | **🔥 SOTA reference** — documented Codex/Anthropic usage API endpoints + token flow |
| Memory.md | 84,132 bytes | Graphiti knowledge graph design |
| CHANGELOG.md | 138,796 bytes | Release notes 2.0.0 → 2.8.0-beta.6 |
| CLAUDE.md | 20,299 bytes | Project orchestrator pattern + multi-agent rules |
| README.md | 8,869 bytes | Product overview |

### 2.2 Aperant 2.7.6 features (released 2026-04-12; cite `Z:/repos/deps/Aperant/CHANGELOG.md:11-72 @ HEAD cba7a027`)

**Feature class: Account/profile management** (DIRECTLY RELEVANT to eee):
- ✅ **Multi-profile account management** — Unified profile swapping with automatic token refresh + rate-limit recovery for both OAuth and API-compatible providers
- ✅ **Multi-Account Swapping** (CLAUDE.md L18) — When one Claude account hits a rate limit, automatically switches to an available account
- ✅ **Queue System v2** — Smart task prioritization with auto-promotion and intelligent rate-limit recovery
- ✅ **Subscription type preservation** during token refresh
- ✅ **OAuth token revocation loop** prevention
- ✅ **Linux credential file detection** + Windows credential normalization

### 2.3 Aperant Codex rate-limit research findings (verbatim from `CODEX_RATE_LIMITS_RESEARCH.md` @ HEAD cba7a027)

#### A. Codex Usage API endpoints (NOT in cpa-usage-keeper)

```
GET https://chatgpt.com/backend-api/wham/usage
Headers:
  Authorization: Bearer <access_token>
  ChatGPT-Account-Id: <account_id>
  Content-Type: application/json
```

**Response schema** (`codex-rs/codex-backend-openapi-models/src/models/rate_limit_status_payload.rs`):

```json
{
  "plan_type": "pro",
  "rate_limit": {
    "allowed": true,
    "limit_reached": false,
    "primary_window": {
      "used_percent": 96,
      "limit_window_seconds": 18000,    // 5h
      "reset_after_seconds": 673,
      "reset_at": 1730947200
    },
    "secondary_window": {
      "used_percent": 70,
      "limit_window_seconds": 604800,   // 7d
      "reset_after_seconds": 43200,
      "reset_at": 1730980800
    }
  }
}
```

#### B. Anthropic Usage API endpoint (NOT in cpa-usage-keeper)

```
GET https://api.anthropic.com/api/oauth/usage
Headers:
  Authorization: Bearer <oauth_token>
  anthropic-beta: <beta-flag>
```

#### C. Passive headers on every API call

```
x-codex-primary-used-percent
x-codex-primary-window-minutes
x-codex-primary-reset-at
x-codex-secondary-used-percent
x-codex-secondary-window-minutes
x-codex-secondary-reset-at
x-codex-credits-has-credits
x-codex-credits-balance
```

SSE event type `codex.rate_limits` carries inline data in streaming responses.

#### D. OAuth token endpoints

| Provider | Auth endpoint | Token endpoint | Client ID |
|---|---|---|---|
| Anthropic | (n/a) | console.anthropic.com/v1/oauth/token | `9d1c250a-e61b-44d9-88ed-5944d1962f5e` |
| OpenAI Codex | auth.openai.com/oauth/authorize | auth.openai.com/oauth/token | `app_EMoamEEZ73f0CkXaXp7hrann` |

## §3 CPA-USAGE-KEEPER GAP ANALYSIS (the SOTA find)

### 3.1 Schema vs. data coverage

CPA has 10 OAuth identities. SQLite `usage_identities` table has 38 columns including:
- `primary_window_used_percent` / `primary_window_limit_seconds` / `primary_window_reset_at`
- `secondary_window_used_percent` / `secondary_window_limit_seconds` / `secondary_window_reset_at`
- `plan_type` / `limit_reached`

**Coverage**:
| Field | Populated | %% |
|---|---|---|
| primary_window_used_percent | 0 / 10 | 0% |
| secondary_window_used_percent | 0 / 10 | 0% |
| plan_type | 1 / 10 | 10% |

**THE GAP**: cpa-usage-keeper **PASSIVELY counts** tokens from CLIProxyAPI traffic flow but **DOES NOT ACTIVELY POLL** the upstream usage APIs (Anthropic `/api/oauth/usage`, ChatGPT `/backend-api/wham/usage`). Aperant DOES poll these — cpa-usage-keeper has the schema, just not the poller.

### 3.2 What this means operationally

- We DON'T know precise reset_at timestamps per Claude account (Aperant would tell us)
- We DON'T know primary_window_used_percent until 429 (passive observation only)
- Account rotation is REACTIVE (after 429) not PROACTIVE (before threshold)
- The 4-failed-of-6 on 739955940fc could have been avoided with proactive polling

## §4 MISSING SOTA REPOS (token-eff + arch-optim)

### 4.1 Token efficiency NOT-YET-ADOPTED (carried forward from Wave 86)

| # | Repo | HEAD | Leverage | Ship | Risk |
|---|---|---|---|---|---|
| 1 | **rtk-ai/rtk** | `80a6fe60` | 60-90% shell-output token reduction | 1S WSL canary | MEDIUM (Windows partial) |
| 2 | **cnighswonger/claude-code-cache-fix** | `12cc30a1` | 95.5% vs 82.3% A/B cache hit | 1T after 1R validates | MEDIUM |
| 3 | **motiful/cc-cache-audit** | `6bd20812` | 99.98% hit ratio with header OFF | 1R first | LOW (read-only A/B) |
| 4 | **open-compress/claw-compactor** | `c1b936d4` | 15-82% reversible content compression | 1U sidecar | MEDIUM |
| 5 | **chonkie** | `5d856a18` | RAG chunking pipeline | DEFERRED | LOW |
| 6 | **ace** | `4f679bef` | Agentic context engineering playbook | DEFERRED | MEDIUM |

### 4.2 Architectural-optimization NOT-YET-ADOPTED

| # | Repo | HEAD | Pattern |
|---|---|---|---|
| 1 | **LiteLLM** | `934ecdca` | Gateway routing reference (NOT replacement) |
| 2 | **Portkey** | `351692fd` | Second gateway reference |
| 3 | **Restate** | `de5bcd3b` | Durable execution runtime |

### 4.3 Account-rotation NEW SOTA (from Wave 87 Aperant deep-dive)

| # | Repo | HEAD | What it adds |
|---|---|---|---|
| **NEW** | **AndyMik90/Aperant** | `cba7a027` | **Active rate-limit polling** for Anthropic + Codex; multi-profile auto-swap; subscription-type preservation; token refresh loop prevention. Direct fit for cpa-usage-keeper schema gap. |

## §5 SHIP CANDIDATES (ranked by leverage × eee-fit)

### 5.1 Ship 1W (NEW; HIGHEST leverage) — Aperant-derived rate-limit poller for cpa-usage-keeper

**Goal**: Populate the empty `primary_window_*` / `secondary_window_*` columns by adding an active poller that calls Anthropic `/api/oauth/usage` + ChatGPT `/backend-api/wham/usage` every 60s.

**Design** (design-novel):
- Python script `tools/aperant_rate_limit_poller.py`
- Reads OAuth tokens from `.cli-proxy-api/{claude-*,codex-*}.json`
- Polls both endpoints (Anthropic for 7 Claude accounts; ChatGPT for codex zfan7)
- Parses `primary_window`, `secondary_window`, `plan_type` from response
- UPDATEs `usage_identities` table directly OR feeds via Redis-RESP queue (cpa-usage-keeper's intake)
- Cron interval 60s (Aperant runs 30s; conservative for 10 accounts)

**Per cardinal-rule-9 install-risk**: MEDIUM (write access to OAuth tokens for read-only API calls; SQLite UPDATE writes; no destructive ops). Reversible via stop-script.

**Expected eee benefit**:
- **PROACTIVE rotation** before 429 — fill-first router in CLIProxyAPI can use `primary_window_used_percent > 80%` threshold to skip account
- Precise per-account reset times (not 5h-from-last-call estimates)
- Automatic detection of capacity_score=0 accounts that need refresh/replacement

**Convergence-gate**: TIER-1 cite-anchor at `Z:/repos/deps/Aperant/CODEX_RATE_LIMITS_RESEARCH.md @ cba7a027`. Only 1 distinct org documented this pattern (AndyMik90/Aperant); Axis-1 ≥3-org NOT FIRM. Adopt as STUDY-PILOT-PATTERN-EXTRACT (cite-class) NOT install-class until convergence finalizes.

### 5.2 Ship 1X (NEW) — CLIProxyAPI cycle-aware-fill-first selector enhancement

**Goal**: Extend CLIProxyAPI selector logic to use rate-limit data populated by Ship 1W. Skip accounts where `primary_window_used_percent > threshold` (default 80%).

**Design**: requires Ship 1W first; modifies `Z:/repos/deps/CLIProxyAPI/sdk/cliproxy/auth/selector.go` OR adds eee-local CLIProxyAPI plugin.

**Forward-ref**: depends on Ship 1W landing first.

### 5.3 Ship candidates carry-forward from prior Waves

| Ship | Description | Risk | Status |
|---|---|---|---|
| 1K | UserPromptSubmit hook wire | LOW | DEFERRED-Wave-85 |
| 1L | PreCompact hook wire | LOW | DEFERRED-Wave-85 |
| 1M | context-mode full Claude Code plugin/hooks (98% savings claim) | MEDIUM | DEFERRED-Wave-85 |
| 1N | ECC continuous-learning selective re-enable | MEDIUM | DEFERRED-Wave-85 |
| 1O | cpa-usage-keeper AUTH_ENABLED hardening | LOW | DEFERRED-Wave-85 |
| 1P | SubagentStop structured-verdict-extraction upgrade | LOW | DEFERRED-Wave-85 |
| 1R | motiful/cc-cache-audit regression harness | LOW | DEFERRED-Wave-86 |
| 1S | rtk canary on WSL | MEDIUM | DEFERRED-Wave-86 |
| 1T | cnighswonger/claude-code-cache-fix prototype | MEDIUM | DEFERRED-Wave-86 |
| 1U | open-compress/claw-compactor sidecar | MEDIUM | DEFERRED-Wave-86 |
| 1V | mr.euphoria capacity_score=0 disable in CPA OR replace with fresh OAuth | LOW | DEFERRED-Wave-86 |
| **1W** | **Aperant-derived rate-limit poller** | **MEDIUM** | **NEW Wave 87** |
| **1X** | **CLIProxyAPI cycle-aware-fill-first** | **MEDIUM** | **NEW Wave 87 (depends 1W)** |

## §6 IS NOW EEE FULLY SOTA?

**NO.** 13 ships still pending across:
- 6 hook-class deferred from Wave 85 (1K-1P)
- 5 token-eff repos from Wave 86 (1R-1U) + 1V account refresh
- 2 NEW from Wave 87 (1W rate-limit poller + 1X cycle-aware selector)

**SOTA features in use** (52/76 wired primitives at Wave 85):
- ✅ CLIProxyAPI v6.10.9 + 8-account fleet (Wave 86 Ship 1Q tuned: session-affinity-ttl 4h, request-retry 3, max-retry-credentials 4)
- ✅ cpa-usage-keeper v1.5.2 (passive token counting, dashboard at 8079)
- ✅ ccusage v18.0.11 statusline (offline mode)
- ✅ context-mode v1.0.111 MCP
- ✅ SubagentStop telemetry hook (Ship 1G)
- ✅ Anthropic prompt-cache discipline (94.4% cache-read aggregate)
- ✅ 7 plugin marketplaces (superpowers + codex + ECC + pyright-lsp + agent-sdk-dev + ralph-loop + frontend-design)
- ✅ codex T1-T7 e2e via foreground+tee (CR-3 Phase 1 bootstrap exception)

**SOTA features MISSING**:
- ❌ Active rate-limit polling (Aperant pattern — 0/10 accounts have rate-limit data populated)
- ❌ Proactive account rotation (currently reactive after 429)
- ❌ Shell-output compaction (rtk-ai/rtk)
- ❌ Cache prefix stability normalizer (cnighswonger/claude-code-cache-fix)
- ❌ Cache regression harness (motiful/cc-cache-audit)
- ❌ Reversible content compression (open-compress/claw-compactor)
- ❌ context-mode full Claude Code plugin/hooks (98% savings claim — only MCP wired)
- ❌ UserPromptSubmit + PreCompact hooks (settings.json keys verified valid via context7 MCP)

## VERDICT

Ship 1W (Aperant-derived rate-limit poller) is the highest-leverage NEW gap. Ships 1K-1V remain queued.
Pre-restart fleet rotation strategy: avoid 739955940fc (66% failure today); aesthetic9c is dominant reserve;
mr.euphoria capacity_score=0 needs replacement (Ship 1V LOW risk).
Cache-rate aggregate 94.4% — Wave 86 Ship 1Q config tuning targets 96%+ on next 921M-token-class wave.
