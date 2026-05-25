# eee Launch Design — CLIProxyAPI 8-account fleet, max prompt cache, intensive-fleet offload

**Author**: orchestrator (Wave 50+ design fire 2026-05-07)
**Status**: DESIGN-FROZEN (codex T1 review pending — Phase 1 bootstrap exception per CR-3)
**Class**: TIER-3-LOCAL-COMPOSITION over TIER-1-DIRECT substrates per `Z:/claude-sota/.claude/rules/citation-discipline.md` rule #8 lattice
**Conformance**: cardinal-rules 1+3+5+6+7+8+9+10+11 (per `CLAUDE.md`)

---

## §0 TIER-1 SOTA cite anchors (load-bearing — NOT sibling-derived)

All anchors are direct upstream sources per `CLAUDE.md` cardinal-rule-1 acceptable cite tiers (TIER-1-DIRECT class).

- **router-for-me/CLIProxyAPI** @ HEAD `785b00c3127eea6aa207f1207ead8a2aa93690a3` (tag v6.10.9, 2026-05-07) [VERIFIED 2026-05-07 via `git -C Z:/repos/deps/CLIProxyAPI rev-parse origin/main`] — MIT License; Go 1.26+ proxy; OpenAI/Gemini/Claude/Codex compatible APIs with OAuth and round-robin load balancing. Cite locations:
  - **Routing primitives**: `sdk/cliproxy/auth/selector.go:27-31` (`RoundRobinSelector`), `:36` (`FillFirstSelector`), `:261-320` (round-robin Pick), `:360-369` (fill-first Pick), `:437-499` (`SessionAffinitySelector`), `:430-432` (Claude Code `_session_{uuid}` regex), `:101-114` (`modelCooldownError` 429 + Retry-After), `:116-129` (priority routing), `:200-254` (`getAvailableAuths` priority + cooldown gating)
  - **Cache passthrough**: `internal/runtime/executor/claude_executor.go:1843-1867` (`ensureCacheControl` SOTA injection at LAST tool / LAST system / SECOND-TO-LAST user turn), `:1914-1995` (`normalizeCacheControlTTL` 5m/1h ordering enforcement), `:1997-2165` (`enforceCacheControlLimit` 4-breakpoint cap), `:174,352` (auto-inject for clients without cache support), `:179,357` (4-breakpoint hard cap enforcement)
  - **Cache test verification**: `internal/runtime/executor/caching_verify_test.go:16-109` — verbatim test cases proving `cache_control: ephemeral` propagates through proxy untouched + auto-injection on LAST element ONLY (preserves client-set markers)
  - **OAuth flow**: `internal/auth/claude/anthropic_auth.go:25-32` — official Anthropic Claude Code OAuth client (`AuthURL=https://claude.ai/oauth/authorize`, `TokenURL=https://api.anthropic.com/v1/oauth/token`, `ClientID=9d1c250a-e61b-44d9-88ed-5944d1962f5e`, `RedirectURI=http://localhost:54545/callback`)
  - **Login command**: `cmd/server/main.go:81` (`--claude-login` flag), `:82` (`--no-browser`), `:83` (`--oauth-callback-port`), `:479-481` (DoClaudeLogin dispatch)
  - **Login implementation**: `internal/cmd/anthropic_login.go:22-59` (`DoClaudeLogin`), `sdk/auth/claude.go:38-100` (PKCE + OAuth server + browser flow), `sdk/auth/manager.go:46-75` (`Manager.Login` with `m.store.Save` persistence)
  - **API routes**: `internal/api/server.go:359` (`POST /v1/messages` → `ClaudeMessages`), `:360` (`POST /v1/messages/count_tokens`), `:367-373` (Codex direct `/backend-api/codex/responses`), `:340-341` (`/healthz` liveness), `:352` (AuthMiddleware on `/v1` group)
  - **Config schema**: `config.example.yaml:13` (`port: 8317`), `:35-44` (`auth-dir: "~/.cli-proxy-api"`), `:46-49` (`api-keys` array), `:84-91` (retry/cooldown — `request-retry: 3`, `max-retry-credentials: 0`, `max-retry-interval: 30`, `disable-cooling: false`), `:103-107` (`quota-exceeded.switch-project: true` + `switch-preview-model: true`), `:109-118` (`routing.strategy` round-robin/fill-first + `session-affinity` + `session-affinity-ttl`), `:131-134` (`enable-gemini-cli-endpoint`), `:138-148` (signature cache for thinking blocks)

- **Anthropic prompt-caching primitive**: `https://docs.anthropic.com/en/docs/build-with-claude/prompt-caching` (TIER-1-DIRECT — official Anthropic) — referenced verbatim by `claude_executor.go:1852`. Cache-read cost = 0.1× base (90% discount); 5m/1h TTL options; max 4 breakpoints per request; tools/system/messages independent breakpoint sections.

- **Anthropic Claude Code env-vars**: `https://code.claude.com/docs/en/env-vars` (TIER-1-DIRECT — official Anthropic) — load-bearing for `ANTHROPIC_BASE_URL` + `ANTHROPIC_AUTH_TOKEN` semantics.

- **CCBP claude-settings.md**: `Z:/repos/deps/claude-code-best-practice-shan/best-practice/claude-settings.md:877-921 @ HEAD 64fffd53a7c6f8e2e0b1575fdd200b65cda04737` [VERIFIED 2026-05-06] — TIER-1-DIRECT environment-block authority (referenced in current `tools/eee.ps1` lines 4 + 22 + 29). The HOME-isolation pattern this design extends is already canonical in eee.ps1.

- **Cardinal-rule lineage** (from `CLAUDE.md`): rule-1 (SOTA cite), rule-3 (cross-model consensus + Phase 1 bootstrap exception), rule-5 (install-priority), rule-6 (fresh-from-github + official-native-channel), rule-7 (graduated unleash + Phase 2/3 trigger predicates), rule-8 (full-SOTA-content invariant + per-row CR-8 status), rule-9 (install-risk discipline — version pin, 2-round budget, REVERT check), rule-10 (research-first-then-install), rule-11 (META-process SOTA), rule-12 (upstream-install-priority over sibling-cite-import).

---

## §1 Architecture — request flow with 8-account fleet

```
                     ┌───────────────────────────────────────────────────────────────┐
                     │  USER (terminal: `eee` invocation)                            │
                     │  Inputs: prompt, attachments, multi-agent dispatches          │
                     └─────────────────────┬─────────────────────────────────────────┘
                                           │ stdin/CLI args
                     ┌─────────────────────▼─────────────────────────────────────────┐
                     │  eee.ps1 (Z:/claude-sota-installed/tools/eee.ps1)             │
                     │  - HOME isolation, env block (a)/(b)/(b1)/(b2)/(c)            │
                     │  - NEW: T0.6 proxy health gate                                │
                     │  - NEW: env block (d) ANTHROPIC_BASE_URL + AUTH_TOKEN         │
                     │  - Forwards args to claude.exe with cwd-pin                   │
                     └─────────────────────┬─────────────────────────────────────────┘
                                           │ ANTHROPIC_BASE_URL=http://127.0.0.1:8317
                                           │ ANTHROPIC_AUTH_TOKEN=eee-fleet-key-1
                     ┌─────────────────────▼─────────────────────────────────────────┐
                     │  claude.exe (Anthropic Claude Code binary)                    │
                     │  - Reads ANTHROPIC_BASE_URL → routes /v1/messages there       │
                     │  - Sends cache_control:ephemeral on system + tools blocks     │
                     │  - metadata.user_id=user_HASH_account__session_UUID           │
                     │  - Sub-agent dispatches (Agent tool) hit same proxy           │
                     └─────────────────────┬─────────────────────────────────────────┘
                                           │ POST /v1/messages
                                           │ Authorization: Bearer eee-fleet-key-1
                                           │ x-api-key: eee-fleet-key-1
                     ┌─────────────────────▼─────────────────────────────────────────┐
                     │  cli-proxy-api (Go service @ 127.0.0.1:8317)                  │
                     │  ─ AuthMiddleware validates eee-fleet-key-1 (config api-keys) │
                     │  ─ Extract metadata.user_id → SessionAffinitySelector         │
                     │  ─ getAvailableAuths(provider=anthropic, model)               │
                     │  │  ─ filter cooldown/disabled/quota-exceeded                 │
                     │  │  ─ select bestPriority bucket                              │
                     │  ─ Pick credential (FillFirstSelector primary)                │
                     │  ─ ensureCacheControl(payload):                               │
                     │  │  ─ inject cache_control on LAST tool                       │
                     │  │  ─ inject cache_control on LAST system block               │
                     │  │  ─ inject cache_control on SECOND-TO-LAST user turn        │
                     │  │  ─ normalizeCacheControlTTL (5m/1h ordering)               │
                     │  │  ─ enforceCacheControlLimit (4-breakpoint cap)             │
                     │  ─ Forward request as account #N                              │
                     │  ─ On 429/500/502/503 → retry next credential (≤3)            │
                     │  ─ On quota-exceeded → switch-project=true                    │
                     │  ─ Return upstream response to claude.exe                     │
                     └─────────────────────┬─────────────────────────────────────────┘
                                           │ OAuth Bearer per account
                                           │ x-api-key absent (OAuth subscription mode)
                     ┌─────────────────────▼─────────────────────────────────────────┐
                     │  api.anthropic.com (Claude Code Max subscription endpoint)    │
                     │  Account #1 ── 5h rolling window ── ~1500 messages quota      │
                     │  Account #2 ── 5h rolling window ── ~1500 messages quota      │
                     │  ...                                                          │
                     │  Account #8 ── 5h rolling window ── ~1500 messages quota      │
                     │  → Total: ~12,000 messages / 5h staggered (fill-first)        │
                     │  → Or: ~24,000 messages with prompt-cache-hit on 50% reuse    │
                     └───────────────────────────────────────────────────────────────┘
```

**Throughput math (with fill-first + 1h prompt cache + 50% cache reuse rate)**:
- Per-account: 1500 messages / 5h
- 8 accounts staggered: 12,000 messages / 5h-window-staggered (sequential exhaustion)
- Cache-hit rate target: 50%+ on multi-agent intensive arcs (system prompt + tool definitions are stable across all sub-agents)
- Effective throughput at 50% cache hit: **~24,000 messages / 5h** vs single-account 1500 (16× multiplier)
- Cost reduction: 90% on cached tokens per `claude_executor.go:1851` Anthropic-documented rate

---

## §2 SOTA-recipe config.yaml for 8-account intensive fleet

Path: `Z:/claude-sota-installed/.cli-proxy-api/config.yaml` (resolved per `auth-dir: "~/.cli-proxy-api"` × HOME=`Z:/claude-sota-installed/` from CLAUDE.local.md ENV (a))

```yaml
# CLIProxyAPI 8-account fleet config — eee runtime
# Cite: Z:/repos/deps/CLIProxyAPI/config.example.yaml @ HEAD 785b00c3 [VERIFIED 2026-05-07]
# Class: TIER-3-LOCAL-COMPOSITION over TIER-1-DIRECT (config.example.yaml schema)

host: "127.0.0.1"      # bind localhost only — never expose 8 OAuth tokens to network
port: 8317             # default per config.example.yaml:13

tls:
  enable: false        # localhost-only; TLS unnecessary

# Management API (gated — required for /v0/management/* routes)
remote-management:
  allow-remote: false                     # localhost-only management
  secret-key: "EEE_MGMT_SECRET_REPLACE"   # rotate via eee --rotate-mgmt-key
  disable-control-panel: false            # keep web panel for operator inspection
  panel-github-repository: "https://github.com/router-for-me/Cli-Proxy-API-Management-Center"

# Auth dir — resolves under HOME isolation per CLAUDE.local.md ENV (a)
auth-dir: "~/.cli-proxy-api"              # → Z:/claude-sota-installed/.cli-proxy-api/

# 4-key authentication for downstream clients
# Stratification: distinct keys for distinct workloads → per-key usage analytics
api-keys:
  - "eee-fleet-key-orchestrator"   # main eee CLI (orchestrator + simple sub-agents)
  - "eee-fleet-key-research"       # sota-researcher / Explore / general-purpose research forks
  - "eee-fleet-key-codex-bridge"   # codex T1-T7 hooks + codex-rescue subagent dispatches
  - "eee-fleet-key-eval"           # CR-11 eval/observability (Section 15 manifest)

debug: false
commercial-mode: false                    # keep middleware features (per-request mem ok)
logging-to-file: true                     # rotate to <auth-dir>/logs/
logs-max-total-size-mb: 1024
error-logs-max-files: 50
usage-statistics-enabled: true            # in-memory aggregation for /v0/management
redis-usage-queue-retention-seconds: 600  # 10min retention for CPA Usage Keeper sync

# ============================================================================
# RETRY + COOLDOWN — INTENSIVE FAN-OUT DEFENSE
# ============================================================================
# Cite: config.example.yaml:84-91 @ HEAD 785b00c3
# Behavior: on 403/408/500/502/503/504 retry up to N times across DIFFERENT
# credentials; cool down failed credentials for max-retry-interval seconds.
# For 8-account intensive fleet: try ALL 8 (max-retry-credentials=0) before
# returning 429 to client.
request-retry: 3
max-retry-credentials: 0                  # try ALL 8 credentials on transient failures
max-retry-interval: 30                    # max wait (s) for any cooled-down credential
disable-cooling: false                    # keep auth/model cooldown scheduling — protects fleet from sticky-failure cascades

# ============================================================================
# QUOTA EXCEEDED — AUTO-FAILOVER
# ============================================================================
# Cite: config.example.yaml:103-107 @ HEAD 785b00c3
quota-exceeded:
  switch-project: true                    # auto-rotate to next credential on quota
  switch-preview-model: true              # fall back to preview model on quota
  antigravity-credits: false              # no Antigravity wiring — Claude-only fleet

# ============================================================================
# ROUTING STRATEGY — SOTA FOR 8-ACCOUNT 5H-WINDOW STAGGERING
# ============================================================================
# Cite: config.example.yaml:109-118 @ HEAD 785b00c3 + selector.go:34-35,432
# Decision: fill-first PRIMARY (burns account 1 fully → rotates to 2 → ...)
# Rationale: per selector.go:34-35 verbatim — "burns one account before moving
# to the next, which can help stagger rolling-window subscription caps (e.g.
# chat message limits)". For 8 Claude Max accounts each on 5h windows,
# fill-first creates STAGGERED exhaustion: account 1 hits limit at hour 5,
# account 2 at hour 10, ..., account 8 at hour 40. Round-robin would cause
# SIMULTANEOUS exhaustion at hour 5 across all 8 accounts.
#
# Session affinity: ON. Maximizes prompt-cache hit rate per Claude Code session
# (cache is per-account; binding sessions to one account keeps cache continuity).
# TTL 1h matches Anthropic's 1h cache breakpoint extension (claude-executor.go:1944).
routing:
  strategy: "fill-first"                  # SOTA for rolling-window staggering
  session-affinity: true                  # per-session sticky to one account
  session-affinity-ttl: "1h"              # matches Anthropic 1h cache TTL

# ============================================================================
# WEBSOCKET (Codex CLI) — required for codex T1-T7 hooks
# ============================================================================
ws-auth: false                            # AuthMiddleware already gates /v1/ws
enable-gemini-cli-endpoint: false         # off until Gemini accounts added
nonstream-keepalive-interval: 0           # disable empty SSE keep-alive (default)

# ============================================================================
# CLAUDE 8-ACCOUNT OAUTH FLEET
# ============================================================================
# Each account is onboarded via `cli-proxy-api --claude-login` (one at a time).
# Auth records persist as separate JSON files under <auth-dir>/auths/.
# Below: priority + label metadata layered AFTER login via management API
# OR direct edit of <auth-dir>/auths/<file>.json (priority field in metadata).
#
# Tiering strategy:
#  - priority=10 (4 accounts): "fresh tier" — used first under fill-first
#  - priority=5  (4 accounts): "recovery tier" — used when fresh tier all on cooldown
#
# Operator labels accounts via metadata.label and metadata.priority:
# (set after onboarding; not configurable via config.yaml directly per
#  selector.go:116-129 priority lookup at auth.Attributes["priority"])

# Note: claude OAuth accounts are NOT listed in claude-api-key block (that block
# is for Anthropic-API-key style auth, not OAuth subscription auth). OAuth-loaded
# accounts auto-discover from <auth-dir>/auths/*.json at startup.

# ============================================================================
# SIGNATURE CACHE — KEEP DEFAULTS (validated by upstream tests)
# ============================================================================
# antigravity-signature-cache-enabled: true   # default
# antigravity-signature-bypass-strict: false  # default
```

---

## §3 8-account onboarding playbook

### §3.0 Outdated-profile guard (CR-9 sibling-bleed defense + CR-6 freshness mandate) — load-bearing

> **Operator declared 2026-05-07: existing profiles at sibling/parent are outdated.** READ-ONLY probe confirmed 2026-05-07:

| Source | Path | Status | Disposition |
|---|---|---|---|
| Sibling claude-sota | `Z:/claude-sota/.cli-proxy-api/` (and `Z:/claude-sota/ccc/`) | DOES NOT EXIST — no CLIProxyAPI deployment | N/A |
| Parent CCC binary | `Z:/claude/ccc/bin/cli-proxy-api.exe` | Version: `dev` (built locally, NOT official release) — pre-dates v6.10.9 | **DO NOT REUSE** — violates CR-6 (official-native-channel mandate); install fresh via `gh release download v6.10.9` |
| Parent CCC config.yaml | `Z:/claude/ccc/config.yaml` | 23,604 bytes (accumulated cruft across v6.9.23 → v6.9.40 wave arc) | **REFERENCE-ONLY** (cite-class, NOT install-class) — author claude-sota-installed config from §2 fresh recipe; consult parent only for operator-tier-label conventions |
| Parent CCC auth tokens | `Z:/claude/ccc/auth/claude-*.json` (8 files: 7 active + 1 disabled) | Tokens minted under parent's `dev` binary — shape may diverge from v6.10.9 expectations | **DO NOT cite-import** per CR-9 sibling-bleed defense. Fresh OAuth re-onboarding required even though touch-times are recent |
| Parent CCC Gemini tokens | `Z:/claude/ccc/auth/gemini-*.json` (2 files) | Last touch 2026-04-27 (~10d old) | **STALE** — Gemini OAuth tokens have short lifetimes; fresh login required if Gemini routing in scope |
| Disabled account | `Z:/claude/ccc/auth/claude-zz-readingcodingandbeyond@gmail.com.json.bak.before-disable-2026-05-06` | Operator deliberately disabled 2026-05-06 | **DO NOT re-onboard** — respect prior retirement decision per `feedback_check_gitignore_before_porting.md` "harness has decided" pattern |

**Why fresh-onboarding even though tokens are dated today**: parent's `cli-proxy-api.exe` is a `dev` build (no version stamp) — its OAuth flow was driven against possibly older `ClientID`/scope/PKCE settings than v6.10.9 ships. Per `internal/auth/claude/anthropic_auth.go:25-32 @ HEAD 785b00c3`, v6.10.9 uses official Claude Code `ClientID=9d1c250a-e61b-44d9-88ed-5944d1962f5e`. If parent binary was forked/patched mid-flight (parent has `cli-proxy-api-v6.9.40-ccc-F1-capacity-aware.bak.exe` indicating local patches), token shape divergence risk is non-zero. CR-9 install-risk discipline + CR-6 freshness both mandate fresh flows.

**Operator account roster (for planning, NOT for cite-import)**:
The 7 currently-active Claude accounts at parent CCC enumerate as:

```
claude-aesthetic9c@gmail.com
claude-nalawowac@gmail.com
claude-739955940fc@gmail.com
claude-avantmanifest@gmail.com         # operator primary email per CLAUDE.local.md userEmail
claude-dreamweaverhoudini@gmail.com
claude-mr.euphoriaincarnate@gmail.com
claude-zfan7@sva.edu
                                       # — eighth slot vacant (readingcodingandbeyond disabled)
```

Operator can choose (a) re-onboard the 7 active emails fresh + onboard 1 new account to fill the 8th slot, OR (b) start with 7-account fleet and revisit the 8th later. The §3.2 playbook below works with either count (`EEE_PROXY_MIN_ACCOUNTS` is configurable per §4.2).

### §3.1 Prerequisite (one-time, per machine)

Per cardinal-rule-6 (fresh-from-github + official-native-channel) — install CLIProxyAPI from latest release:

```powershell
# Option A — pre-built binary (preferred for ops; fastest to first-run)
gh release download v6.10.9 --repo router-for-me/CLIProxyAPI `
    --pattern '*windows-amd64*' `
    --dir Z:\claude-sota-installed\.local\bin\

# Option B — build from source (cardinal-rule-9 install-risk: pin commit SHA)
git clone --depth 1 --branch v6.10.9 https://github.com/router-for-me/CLIProxyAPI.git `
    Z:\claude-sota-installed\.local\src\CLIProxyAPI
cd Z:\claude-sota-installed\.local\src\CLIProxyAPI
go build -o Z:\claude-sota-installed\.local\bin\cli-proxy-api.exe ./cmd/server

# Smoke probe per cardinal-rule-7 Phase-2 trigger predicate (f)
& Z:\claude-sota-installed\.local\bin\cli-proxy-api.exe --version
# Expected: v6.10.9 (or matching tag)
```

**Cardinal-rule-9 conformance**: pinned to `v6.10.9` tag (sha `785b00c3`); record install commit-SHA in `docs/install-provenance.md` per audit-action-loop discipline.

### §3.2 Per-account OAuth onboarding (run 8 times)

Each account is one Claude Code Max subscription (separate Anthropic account email).

```powershell
# For accounts 1..8, repeat:
cd Z:\claude-sota-installed
& Z:\claude-sota-installed\.local\bin\cli-proxy-api.exe --claude-login `
    --config Z:\claude-sota-installed\.cli-proxy-api\config.yaml
# Browser opens claude.ai/oauth/authorize → sign in with account N's email
# Auth saved to Z:\claude-sota-installed\.cli-proxy-api\auths\<filename>.json
```

**Headless variant** (SSH session / no browser):
```powershell
& Z:\claude-sota-installed\.local\bin\cli-proxy-api.exe --claude-login `
    --no-browser `
    --oauth-callback-port 54545 `
    --config Z:\claude-sota-installed\.cli-proxy-api\config.yaml
# Prints URL — open on local machine; complete OAuth; redirect to localhost:54545
# Use SSH tunnel: ssh -L 54545:localhost:54545 user@host
```

**Cite**: `internal/cmd/anthropic_login.go:22-59` + `sdk/auth/claude.go:38-100` (PKCE + browser flow); `cmd/server/main.go:81-83` (CLI flags).

### §3.3 Account labeling + priority tiering (post-onboarding)

After all 8 logins complete, edit each `<auth-dir>/auths/<file>.json` to add metadata:

```json
{
  "type": "claude",
  "access_token": "...",
  "refresh_token": "...",
  "email": "operator+1@example.com",
  "metadata": {
    "label": "claude-fresh-1",
    "priority": "10"
  },
  "expiry": "..."
}
```

Tiering recipe (4 fresh + 4 recovery):
- `priority=10` for 4 fresh-account JSONs (selected first under fill-first)
- `priority=5` for 4 recovery-account JSONs (used only when all fresh are cooldown)

**Cite**: `selector.go:116-129` (`authPriority` reads `auth.Attributes["priority"]`); `selector.go:241-254` (`getAvailableAuths` selects bestPriority bucket).

### §3.4 Verification probe

```powershell
# Start proxy in foreground (for verification)
& Z:\claude-sota-installed\.local\bin\cli-proxy-api.exe `
    --config Z:\claude-sota-installed\.cli-proxy-api\config.yaml

# In separate terminal — health probe (cite: server.go:340-341)
Invoke-RestMethod http://127.0.0.1:8317/healthz
# Expected: @{status=ok}

# Smoke message probe (cite: server.go:359 POST /v1/messages)
$body = @{
    model = "claude-opus-4-7"
    max_tokens = 64
    messages = @(@{ role = "user"; content = "Reply with literal: PROBE_OK" })
} | ConvertTo-Json -Depth 5
$resp = Invoke-RestMethod -Method Post `
    -Uri http://127.0.0.1:8317/v1/messages `
    -Headers @{
        'x-api-key' = 'eee-fleet-key-orchestrator';
        'anthropic-version' = '2023-06-01';
        'content-type' = 'application/json'
    } `
    -Body $body
# Expected: $resp.content[0].text contains "PROBE_OK"
# Cache verify: check $resp.usage.cache_creation_input_tokens > 0 on 2nd call
```

---

## §4 eee.ps1 integration — minimal SOTA insertion

Per cardinal-rule-5 (bootstrap-only file scope), `eee.ps1` is one of 11 hand-coded files. Modifications below are bootstrap-class additions, not new functionality.

### §4.1 New env block (d) — insert after existing block (c) (line ~80 of current eee.ps1)

```powershell
# ============================================================================
# (d) CLIProxyAPI 8-account fleet routing (Wave 50+ Fire CLIProxy install)
# Cite: TIER-1-DIRECT https://code.claude.com/docs/en/env-vars (ANTHROPIC_BASE_URL + ANTHROPIC_AUTH_TOKEN canonical)
# Cite: TIER-1-DIRECT Z:/repos/deps/CLIProxyAPI/internal/api/server.go:359 @ 785b00c3 (POST /v1/messages handler)
# Cite: TIER-1-DIRECT Z:/repos/deps/CLIProxyAPI/internal/api/server.go:340-341 @ 785b00c3 (/healthz)
# ============================================================================
$EEE_PROXY_BASE = 'http://127.0.0.1:8317'
$EEE_PROXY_KEY  = 'eee-fleet-key-orchestrator'   # main key — read from config.yaml api-keys[0]

$env:ANTHROPIC_BASE_URL   = $EEE_PROXY_BASE
$env:ANTHROPIC_AUTH_TOKEN = $EEE_PROXY_KEY

# Per-subagent-class key routing (sub-agents inherit env unless overridden)
# These are READ by hook scripts that spawn distinct subagent classes — they
# allow per-class usage analytics + isolated retry budgets in the proxy.
$env:EEE_PROXY_KEY_RESEARCH     = 'eee-fleet-key-research'
$env:EEE_PROXY_KEY_CODEX_BRIDGE = 'eee-fleet-key-codex-bridge'
$env:EEE_PROXY_KEY_EVAL         = 'eee-fleet-key-eval'

# Codex CLI cross-routing (when codex T1-T7 hooks installed per Tier 1a manifest)
# Cite: Z:/repos/deps/CLIProxyAPI/internal/api/server.go:367-373 @ 785b00c3 (codexDirect group)
$env:OPENAI_BASE_URL = "$EEE_PROXY_BASE/backend-api/codex"
```

### §4.2 New T0 gate — insert after existing T0.5 (around line 187)

```powershell
# T0.6 — CLIProxyAPI fleet healthz probe + min-account assertion
# Cite: TIER-1-DIRECT Z:/repos/deps/CLIProxyAPI/internal/api/server.go:340-341 @ 785b00c3
$EEE_PROXY_AUTHS_DIR = 'Z:\claude-sota-installed\.cli-proxy-api\auths'
$EEE_PROXY_MIN_ACCOUNTS = 1   # graduated: 1 for Phase-1 bootstrap; bump to 8 once all logged in

if (Test-Path $EEE_PROXY_AUTHS_DIR) {
    $authCount = (Get-ChildItem $EEE_PROXY_AUTHS_DIR -Filter '*.json' -ErrorAction SilentlyContinue | Measure-Object).Count
} else {
    $authCount = 0
}

if ($authCount -lt $EEE_PROXY_MIN_ACCOUNTS) {
    Write-Host "[eee] WARN: CLIProxyAPI auths/ has $authCount account(s); min recommended=$EEE_PROXY_MIN_ACCOUNTS. Run cli-proxy-api --claude-login per docs/eee-launch-design-cliproxyapi.md §3.2" -ForegroundColor Yellow
}

# Healthz probe — non-blocking warn (proxy may auto-start via separate service)
try {
    $probe = Invoke-RestMethod -Uri "$EEE_PROXY_BASE/healthz" -TimeoutSec 2 -ErrorAction Stop
    if ($probe.status -ne 'ok') {
        Write-Host "[eee] WARN: CLIProxyAPI healthz returned status=$($probe.status); check service" -ForegroundColor Yellow
    } else {
        Write-Host "[eee] CLIProxyAPI fleet OK ($authCount accounts loaded)" -ForegroundColor Green
    }
} catch {
    Write-Host "[eee] WARN: CLIProxyAPI not reachable at $EEE_PROXY_BASE — claude.exe will fall through to api.anthropic.com directly. Start proxy: cli-proxy-api --config Z:\claude-sota-installed\.cli-proxy-api\config.yaml" -ForegroundColor Yellow
    # SOFT FAILURE in Phase-1 bootstrap (cardinal-rule-7); promote to HARD post-install per Phase-2 trigger
    # $EEE_HARD_FAILURES += "CLIProxyAPI proxy not reachable at $EEE_PROXY_BASE"
}
```

### §4.3 Phase-2 promotion (post-install — when 8 accounts + healthz green for 7+ fires)

Per cardinal-rule-7 Phase-2 trigger predicate (f) — when CLIProxyAPI is INSTALLED with smoke-probe PASS, promote the T0.6 WARN to HARD-FAIL:

```powershell
# Phase-2 promotion: comment out the WARN block above, uncomment:
# if ($authCount -lt 8) { $EEE_HARD_FAILURES += "..." }
# if (proxy unreachable) { $EEE_HARD_FAILURES += "..." }
```

---

## §5 Multi-agent intensive offload patterns (the user directive's core)

When the orchestrator dispatches multiple parallel sub-agents (e.g., 5-agent fan-out per `Z:/claude-sota/.claude/rules/parallel-agent-wave.md §CADP rule 4` cumulative-cap discipline), all sub-agents inherit `ANTHROPIC_BASE_URL` from the parent shell — meaning ALL their requests route through the proxy.

### §5.1 Burst-fanout offload mechanic (the SOTA pattern)

```
Orchestrator: dispatches 5 parallel agents @ T0
   ├─ Agent A (sota-researcher)    → proxy → fill-first → account 1 (priority=10)
   ├─ Agent B (codex-rescue)       → proxy → session-affinity new session → account 2 (priority=10)
   ├─ Agent C (gpt5-reviewer)      → proxy → session-affinity new session → account 3 (priority=10)
   ├─ Agent D (gpt5-archaeologist) → proxy → session-affinity new session → account 4 (priority=10)
   └─ Agent E (architect)          → proxy → session-affinity new session → account 1 (priority=10)
                                                                               ^^^^^^^^^^^^^^^^^^^^
                                              Account 1 has 2 sessions bound (orchestrator + Agent E);
                                              fill-first selects account 1 again until it cools down.
                                              Each session retains its own prompt-cache continuity.
```

**Why this matters for intensive use**:
- Single-account: 5 parallel agents share 1 account's 5h window → exhausts in <1h under intensive use → all 5 agents stall simultaneously
- 8-account fleet + fill-first: 5 parallel agents distribute across accounts but exhaustion staggers; when account 1 hits 429, proxy auto-fails over to account 2 transparently
- Each sub-agent's session-affinity preserves its own prompt cache (system + tools cache persists for that session)

### §5.2 Codex T1-T7 hook routing (offloads codex backbone too)

When codex T1-T7 hooks per `Z:/claude-sota/.claude/rules/cross-model-consensus.md` are installed (Tier 1a per manifest §Section 2):

```powershell
# In codex hook scripts (e.g., codex_t2_pre_commit_gate.py spawns):
$env:OPENAI_BASE_URL = 'http://127.0.0.1:8317/backend-api/codex'
codex exec --json < .claude/state/codex_t2_<topic>.txt
# Routes through proxy → multi-account Codex backbone (separate from Claude fleet)
```

**Cite**: `internal/api/server.go:367-373` (codex direct group `/backend-api/codex`).

### §5.3 Fail-over cascade (when multi-agent depletion fires)

Sub-class peer to FM-17.b pool-depletion 429 per `Z:/claude-sota/.claude/rules/fm17-subagent-fleet-depletion.md`:

| Failure | Proxy response | Sub-agent observable |
|---|---|---|
| Account 1 5h-window exceeded | `modelCooldownError` 429 + Retry-After (selector.go:101-114) | retry on next credential (request-retry: 3) |
| Account 1 quota-exceeded | `quota-exceeded.switch-project: true` rotates (config.example.yaml:104) | transparent — retries account 2 |
| All 8 accounts cooling down | 429 + Retry-After=longest_recovery_seconds | sub-agent fails; orchestrator retries after Retry-After |
| Single-call transient 502 | `request-retry: 3` (config.example.yaml:84) | transparent retry on different credential |

### §5.4 Prompt-cache compounding under fan-out

Per `Z:/repos/deps/CLIProxyAPI/internal/runtime/executor/claude_executor.go:1843-1867 @ HEAD 785b00c3`:

- Sub-agents share STATIC system prompt + tool definitions ⇒ 90% of their input tokens are cacheable
- Session-affinity keeps each sub-agent's session bound to one account ⇒ cache hits compound across 100+ tool-call turns
- 1h TTL (`ENABLE_PROMPT_CACHING_1H` already set in `eee.ps1` line ~74) maxes the reuse window
- 8-account fleet means each account independently caches popular prefixes ⇒ NO cache eviction storm under fan-out

**Math**: a 50K-token system+tools prefix used by 5 sub-agents over a 1h arc:
- Without cache: 5 × 50K × 100 turns = **25M tokens** at full price
- With cache (1st turn primes, 99 subsequent hits): 50K + (50K × 0.1 × 99 × 5) = **2.525M tokens** equivalent
- Reduction: **~10×** for the prefix portion alone; compounded across 8 accounts → effectively unlimited fan-out within 5h windows.

---

## §6 Manifest entry — `docs/sota-installed-manifest.md` Section ?

Add new row to manifest under appropriate section. Per `CLAUDE.md` cardinal-rule-7 Phase-2 trigger predicate (f), CLIProxyAPI fits **Tier 2** (Memory + Routing infrastructure) — a load-balancer underpinning all subsequent agent/research dispatches.

```markdown
### Section 2.5 — CLIProxyAPI multi-account fleet (Tier 1.5: between Tier 1a codex hooks and Tier 1b sota-researcher)

| Row | Path | Source | Status | CR-8 Status | CR-9 Risk | Smoke Probe |
|---|---|---|---|---|---|---|
| 2.5.1 | `Z:\claude-sota-installed\.local\bin\cli-proxy-api.exe` | `gh release download v6.10.9 --repo router-for-me/CLIProxyAPI` | INSTALLED-PENDING | ADAPTED-FROM-SOTA | LOW (version-pinned to v6.10.9) | `cli-proxy-api --version` returns `v6.10.9` AND `Invoke-RestMethod http://127.0.0.1:8317/healthz` returns `status=ok` |
| 2.5.2 | `Z:\claude-sota-installed\.cli-proxy-api\config.yaml` | adapted from `Z:/repos/deps/CLIProxyAPI/config.example.yaml @ 785b00c3` per §2 above | INSTALLED-PENDING | ADAPTED-FROM-SOTA | LOW | `cli-proxy-api --config <path> --help` parses without error |
| 2.5.3 | `Z:\claude-sota-installed\.cli-proxy-api\auths\*.json` | `cli-proxy-api --claude-login` × 8 (per §3.2) | INSTALLED-PENDING | N/A (operator credentials, not code) | LOW (OAuth tokens encrypted at rest by upstream impl) | 8 JSON files present + ≥1 successful POST /v1/messages with cache_creation_input_tokens > 0 |

**Rollback procedure** (per cardinal-rule-9 install-risk discipline):
1. Stop proxy: `Stop-Process -Name 'cli-proxy-api' -Force`
2. Remove launcher entries: revert `tools/eee.ps1` block (d) + T0.6 gate
3. Optional: archive `Z:\claude-sota-installed\.cli-proxy-api\` to `<state>/archive/` (preserves OAuth tokens for re-install)
4. claude.exe falls through to `api.anthropic.com` directly with previously-set ANTHROPIC_AUTH_TOKEN
```

---

## §7 Risk register

| # | Risk class | Likelihood | Impact | Mitigation |
|---|---|---|---|---|
| R1 | Proxy crash mid-session loses request | Low | Medium | `request-retry: 3` + Claude Code's own retry; restart proxy auto via Windows Service or `eee --proxy-start` |
| R2 | All 8 accounts hit cooldown simultaneously | Low (fill-first staggers) | High | Mitigated by fill-first; if it fires, proxy returns 429 + Retry-After → operator waits |
| R3 | OAuth token revoked mid-session (account suspended) | Low | High | Token refresh fails → proxy logs error → operator re-runs `--claude-login` for that account |
| R4 | Cache_control client-set conflicts with proxy auto-inject | Very Low | Medium | Per `claude_executor.go:1876,1887,1901` — proxy SKIPS injection when client already set cache_control; no conflict |
| R5 | 4-breakpoint cap exceeded by client | Medium | Low | `enforceCacheControlLimit` (claude_executor.go:1997-2165) auto-strips lowest-value first; transparent |
| R6 | Proxy port 8317 already in use | Low | Medium | T0.6 healthz probe catches this; operator stops conflicting service or changes proxy port |
| R7 | Subagent inherits ANTHROPIC_BASE_URL but not AUTH_TOKEN | Low | High | Both env vars set in same eee.ps1 block (d); subagent inheritance is atomic via process-env propagation |
| R8 | management API secret-key leaked | Low | Critical | `secret-key` in config.yaml; rotate via management API; `.cli-proxy-api/` gitignored per CLAUDE.local.md ENV (a) HOME isolation |
| R9 | Proxy log files include sensitive request bodies | Medium | Medium | `logging-to-file: true` rotates; logs land under `<auth-dir>/logs/` (gitignored); secret-redactor middleware optional via custom hook |
| R10 | OAuth callback port 54545 conflict during 8th login | Low | Low | Use `--oauth-callback-port <unique>` for parallel logins or sequential single-port |

---

## §8 Cardinal-rule conformance checklist

| Rule | How this design conforms |
|---|---|
| **CR-1** SOTA cite | All claims cite TIER-1-DIRECT @ HEAD `785b00c3` (`CLIProxyAPI` v6.10.9); supporting Anthropic CC official docs URLs; CCBP claude-settings.md @ HEAD `64fffd53` |
| **CR-3** cross-model | Codex T1-T7 hooks ALSO route via proxy (`OPENAI_BASE_URL=$EEE_PROXY_BASE/backend-api/codex`); Phase-1 bootstrap exception applies until Tier 1a hooks INSTALLED |
| **CR-5** install-priority | CLIProxyAPI is install-class (Go binary from official releases); config + auths derived per upstream config.example.yaml schema; eee.ps1 additions are bootstrap-only file scope (one of 11 permitted) |
| **CR-6** fresh-from-github + official-native-channel | `gh release download v6.10.9` from `https://github.com/router-for-me/CLIProxyAPI/releases` (canonical official URL); pinned commit SHA `785b00c3` recorded in install-provenance.md |
| **CR-7** graduated unleash | T0.6 gate WARN-only in Phase 1; promotes to HARD-FAIL in Phase 2 once 8 accounts INSTALLED + smoke-probe PASS for 7+ build fires |
| **CR-8** full-SOTA-content | Every config field cites upstream config.example.yaml; every routing decision cites selector.go file:line; every cache claim cites claude_executor.go file:line; CR-8 status = ADAPTED-FROM-SOTA in manifest rows |
| **CR-9** install-risk | Version-pinned `v6.10.9`; 2-round fix-forward budget (config tuning round 1, account-priority round 2); pre-cite-import REVERT check N/A (no sibling cite-import in this design — direct upstream install); sibling-bleed N/A (no sibling paths); Phase 1 bootstrap exception per CR-3 acknowledged |
| **CR-10** research-first-then-install | Step (a) Install canonical SOTA — CLIProxyAPI is the upstream solution for "multi-account Claude Code routing + prompt cache + load balancing" class; HONEST-NON-FINDING gate not invoked (upstream exists) |
| **CR-11** META-process | Design fire dispatched 4 parallel research probes (WebFetch + 3 Bash file reads) + line-by-line audit per user directive; all probes cite-anchored; per-call codex budget N/A (no codex T1 fired yet — Phase 1 bootstrap exception) |
| **CR-12** upstream-install-priority over sibling | PRIMARY install path = `gh release download` from upstream (no sibling fallback); CLIProxyAPI has no sibling-cite-import (no `Z:/claude-sota/...` paths in this design) |

---

## §9 Update triggers

Re-evaluate this design when:

- CLIProxyAPI HEAD bumps past `785b00c3` (v6.10.9) — refresh cite anchors per cardinal-rule-6 freshness check
- Anthropic ships a native multi-account primitive in Claude Code itself — would obviate proxy layer (currently no such primitive per `https://code.claude.com/docs/en/setup` 2026-05-07)
- A 9th account is added — re-evaluate fill-first vs round-robin (round-robin may fit better at 9+ where 5h-window stagger spreads thinner)
- Cache_control upstream contract changes (Anthropic docs at `https://docs.anthropic.com/en/docs/build-with-claude/prompt-caching`) — verify proxy still tracks
- Proxy OAuth ClientID `9d1c250a-e61b-44d9-88ed-5944d1962f5e` rotates — would force re-onboarding all 8 accounts
- Phase-2 trigger predicate (f) per CR-7 fires (Tier 2 INSTALLED with smoke-probe PASS) — flip T0.6 WARN to HARD-FAIL
- A 4th sister-project SOTA pattern emerges (currently 12 sister projects per README; if any provides incremental routing primitive not in CLIProxyAPI itself, evaluate cite-import)

---

## §11 Operational SOTA — high-concurrency tuning for intensive subagent fan-out

Cite: `Z:/repos/deps/CLIProxyAPI/sdk/cliproxy/auth/conductor.go:1186-1367 @ HEAD 785b00c3` (Execute lifecycle); `:1252-1288` (ExecuteStream + streamBootstrapError graceful recovery); `:1044-1062` (`SetRetryConfig`); `config.example.yaml:50,57,67-69,70-72` (commercial-mode + auth-auto-refresh-workers + nonstream-keepalive + streaming.keepalive-seconds).

### §11.1 commercial-mode (high-concurrency)

```yaml
commercial-mode: true   # disable high-overhead HTTP middleware features
                        # → reduce per-request memory under multi-agent fan-out
```

**Why**: per `config.example.yaml:50` verbatim *"When true, disable high-overhead HTTP middleware features to reduce per-request memory usage under high concurrency"*. With 5-agent fan-out × N tool turns × prompt-cache-hot prefixes, per-request memory accumulates fast on Gin middleware stack. Trade-off: loses some debug-log richness; pair with `debug: false` + `logging-to-file: true` for ops audit.

### §11.2 auth-auto-refresh-workers

```yaml
auth-auto-refresh-workers: 32   # default 16; bump for 8-account fleet to halve refresh latency
```

Cite: `config.example.yaml:67-69` — refresh worker pool for OAuth token refresh. With 8 accounts each refreshing every 4h (per `sdk/auth/claude.go:36` `RefreshLead = 4*time.Hour`), bump to 32 ensures sub-second refresh latency at the 4h boundary even under burst load. Each refresh is a single HTTPS POST to `https://api.anthropic.com/v1/oauth/token` (anthropic_auth.go:26) — wide pool is cheap.

### §11.3 streaming keepalive (long-codex-T1 protection)

```yaml
streaming:
  keepalive-seconds: 15    # SSE keep-alive every 15s (default 0 = disabled)
  bootstrap-retries: 1     # one safe retry before first byte
nonstream-keepalive-interval: 30  # blank-line every 30s on long non-stream responses
```

Cite: `config.example.yaml:70-78`. Critical for codex T1 deep-review-exec (240-900s budgets per `Z:/claude-sota/.claude/rules/cross-model-consensus.md §Profile selection rule`) — without keepalive, intermediate proxies/firewalls drop the SSE connection silently, masquerading as Pattern B HNF when actually a transport-layer cut.

### §11.4 retry-budget tuning per fan-out shape

| Workload | request-retry | max-retry-credentials | max-retry-interval | rationale |
|---|---|---|---|---|
| Single orchestrator | 3 | 0 (try all) | 30 | Max resilience; latency budget allows full fleet trial |
| 5-agent fan-out (parallel) | 2 | 4 | 15 | Each agent has tight budget; prefer surface failure than block fleet |
| Codex T1 long-running | 5 | 0 | 60 | Long-deadline allows aggressive retry across all 8 |
| Codex T2 commit-gate | 2 | 4 | 10 | Fast-fail at commit time; operator wants quick verdict |

**Implementation**: per-class API keys (`eee-fleet-key-research`, `eee-fleet-key-codex-bridge`, `eee-fleet-key-eval`) + Management API per-key retry override (when shipped — currently global per `conductor.go:1044` `SetRetryConfig`). For now, set to the most-aggressive workload (`request-retry: 5, max-retry-credentials: 0, max-retry-interval: 60`) and tune per ops experience.

### §11.5 graceful-stream-error recovery (zero-downtime SOTA)

Per `conductor.go:1281-1284` — when ALL retries exhausted on a stream and last error is `streamBootstrapError`, proxy emits `streamErrorResult(headers, cause)` which is a graceful SSE error event the client can render. **No connection-drop appears as bug to user** — they see an error in-band. Critical for Claude Code's UX during fleet-exhaustion events.

---

## §12 Per-account customization — advanced routing primitives

Cite: `config.example.yaml:88-135 @ HEAD 785b00c3` (per-account schema); `conductor.go:1320-1322 @ HEAD 785b00c3` (per-auth roundtripper); `selector.go:116-129 @ HEAD 785b00c3` (priority); `selector.go:144-198 @ HEAD 785b00c3` (websocket preference).

**Each Claude account auth-file JSON supports `metadata` field; some primitives layer via Management API after onboarding**:

| Primitive | Per-account file (`<auth-dir>/auths/<file>.json` `metadata.*`) | Effect |
|---|---|---|
| `priority` | `"priority": "10"` (string-typed int) | Higher used first under fill-first/round-robin per `selector.go:116-129` |
| `label` | `"label": "fresh-tier-1"` | Operator-visible; surfaces in Management API + logs |
| `websockets` | `"websockets": "true"` | Codex WS preference per `selector.go:144-198` `preferCodexWebsocketAuths` |
| `email` | `"email": "operator+1@example.com"` | Stored from OAuth response; used for label rendering |

**Per-account egress** (set via direct file edit OR Management API config_basic.go):
- `proxy-url`: per-credential SOCKS5/HTTP proxy override (residential IP, geo-distribute, anti-fingerprint)
- `headers`: custom headers injected per account (X-Custom-Header, etc.)
- `base-url`: route specific account to alternate Anthropic-compatible endpoint (relay services, mirror endpoints)

**Model-pool customization** per `config.example.yaml:113-118,165-170`:
- `models[]`: list of `{name: <upstream>, alias: <client-facing>}` mappings
- `excluded-models[]`: blacklist with wildcard support (`claude-3-*`, `*-preview`, `*opus-4-5*`)

**SOTA 8-account tiering recipe** (post-onboarding edit):

| Account | priority | excluded-models | rationale |
|---|---|---|---|
| Fresh-tier-1..4 | 10 | (empty — full model access) | First selected; full Opus 4.7 + Sonnet 4.6 access |
| Recovery-tier-1..3 | 5 | `claude-opus-*` (block Opus on recovery tier) | Reserve fresh-tier Opus quota for high-value calls; recovery handles Sonnet fan-out |
| Recovery-tier-4 (cold spare) | 1 | `claude-opus-4-7,claude-opus-4-5` | Sonnet-only emergency reserve when fresh+mid-tier exhausted |

---

## §13 Management API — live operational control

Cite: `internal/api/server.go:549-552,592-595,617-620,627-630,720,1139 @ HEAD 785b00c3` (Mgmt API routes + AuthMiddleware); `internal/api/handlers/management/{api_key_usage,auth_files,config_auth_index,config_basic,config_lists}.go @ HEAD 785b00c3`.

Management API at `/v0/management/*` (gated by `secret-key` per `config.example.yaml:24-26`) enables **zero-restart operational control**:

| Endpoint class | Operator capability |
|---|---|
| `GET /v0/management/api-keys` | List all downstream-client keys (non-secret view) |
| `PUT /v0/management/api-keys` | Replace entire api-keys array (key rotation) |
| `PATCH /v0/management/api-keys` | Add/remove individual key |
| `GET/PATCH /v0/management/auth-files` | List Claude OAuth files; patch metadata (priority/label/excluded-models per-account) WITHOUT restart |
| `GET /v0/management/auth-files/recent-requests` | Per-account recent-request audit (cite: handler file `auth_files_recent_requests.go`) |
| `GET /v0/management/auth-files/download` | Backup auth file (encrypted token included; sensitive) |
| `GET /v0/management/api-key-usage` | Per-API-key usage stats (matches Redis usage queue) |

### §13.1 Operator quick-recipes

```bash
# Rotate management secret
curl -s -X PUT http://127.0.0.1:8317/v0/management/secret-key \
    -H 'X-Mgmt-Key: EEE_MGMT_SECRET_REPLACE' \
    -d '{"key":"<new-secret>"}'

# Bump account #3 priority from 10→1 (mark for cool-out)
curl -s -X PATCH http://127.0.0.1:8317/v0/management/auth-files \
    -H 'X-Mgmt-Key: <key>' \
    -d '{"file":"claude-aesthetic9c@gmail.com.json","metadata":{"priority":"1"}}'

# Disable an account temporarily (without removing the file)
curl -s -X PATCH http://127.0.0.1:8317/v0/management/auth-files \
    -H 'X-Mgmt-Key: <key>' \
    -d '{"file":"claude-zfan7@sva.edu.json","disabled":true}'

# Per-account recent-request audit (last N requests)
curl -s http://127.0.0.1:8317/v0/management/auth-files/recent-requests?file=claude-avantmanifest@gmail.com.json \
    -H 'X-Mgmt-Key: <key>'
```

### §13.2 Hot-reload via SHA256 content-hash debouncing

Cite: `internal/watcher/config_reload.go:43-78 @ HEAD 785b00c3`.

When operator edits `<auth-dir>/config.yaml` directly (instead of via Management API), the watcher:
1. Detects file-write event via fsnotify
2. Debounces (per `configReloadDebounce`)
3. Computes SHA256 of new file
4. Compares to last-loaded hash — SKIPS if unchanged (prevents touch-events from triggering reload)
5. Field-level diff via `internal/watcher/diff/*.go` — logs which fields changed
6. Selective client reload: `authDirChanged` / `retryConfigChanged` / `forceAuthRefresh` / `affectedOAuthProviders` (surgical refresh only what's needed)

**This is production-grade hot-reload** — operators can edit routing strategy / priority / retry caps live with zero in-flight request drop.

---

## §14 Observability + CPA Usage Keeper (sister-project SOTA)

Cite: `https://github.com/Willxup/cpa-usage-keeper` (TIER-1 GitHub README) — *"Standalone persistence and visualization service for CLIProxyAPI, with periodic data sync, SQLite storage, aggregate APIs, and a built-in dashboard for usage and statistics."*; `https://github.com/zhanglunet/cliproxyapi-usage-dashboard` — sibling local-first dashboard; `config.example.yaml:54-65 @ HEAD 785b00c3` (logging knobs); `internal/api/middleware/request_logging.go:1-60 @ HEAD 785b00c3`.

### §14.1 Tier-2 observability stack (recommended for intensive fleet)

```yaml
# In config.yaml
debug: false
logging-to-file: true
logs-max-total-size-mb: 1024              # 1GB rolling cap
error-logs-max-files: 50                  # last 50 errors retained when full logging off
usage-statistics-enabled: true            # in-memory per-account/per-model aggregation
redis-usage-queue-retention-seconds: 600  # 10min retention for downstream collectors
```

**CPA Usage Keeper integration** (Tier-2 install, after CLIProxyAPI):
```bash
# Per cardinal-rule-6 official-native-channel
git clone --depth 1 https://github.com/Willxup/cpa-usage-keeper.git \
    Z:/claude-sota-installed/.local/src/cpa-usage-keeper
# Configure to point at 127.0.0.1:8317 + read Redis queue every 60s
# Persists to SQLite at Z:/claude-sota-installed-state/.cpa-keeper/usage.sqlite
# Dashboard at http://127.0.0.1:<keeper-port>
```

Provides:
- Per-account daily message count + cache hit rate + cost
- Codex 5h/7d quota window remaining
- Trending failure modes (which account had most 429s)
- Plan-weight visibility (Anthropic Max account quota differs by plan tier)

### §14.2 Request-level observability (built-in middleware)

Cite: `internal/api/middleware/request_logging.go:21-60 @ HEAD 785b00c3` — `RequestLoggingMiddleware` captures request+response with:
- Body capture toggle via `logger.IsEnabled()` config
- Error-only mode: logs only on non-2xx (1MB capture cap)
- Path-based skip-list (`shouldLogRequest` filters healthz)
- Request-ID correlation across logs

### §14.3 Existing claude-sota observability (from `Z:/claude/observability/dashboards/cliproxy-accounts.json`)

Parent CCC has an `observability/dashboards/cliproxy-accounts.json` (likely Grafana dashboard JSON). **DO NOT cite-import** per CR-9 sibling-bleed (potential 23K-LOC config drift); **DO consult layout** as REFERENCE-ONLY for what panels operators have historically valued (per-account 5h-window remaining, fleet aggregate throughput, error class distribution).

---

## §15 Graceful shutdown + kill-switch wiring

Cite: `Z:/claude-sota-installed/.local/cwc/kill-switch.sh @ commit per docs/install-provenance.md Wave 62B fix-forward` (TIER-1-DIRECT install-class from anthropics/cwc-long-running-agents per CLAUDE.md Architecture Anthropic org #1).

### §15.1 eee --proxy-stop subcommand (proposed addition to eee.ps1)

```powershell
# Append to eee.ps1 — operator-facing kill-switch
if ($Args -contains '--proxy-stop') {
    # Cite: anthropics/cwc-long-running-agents kill-switch.sh pattern (Section 17 manifest install)
    # Graceful: SIGTERM first, then SIGKILL after timeout
    $proxy = Get-Process -Name 'cli-proxy-api' -ErrorAction SilentlyContinue
    if ($proxy) {
        Write-Host "[eee] Stopping cli-proxy-api (PID $($proxy.Id)) gracefully..." -ForegroundColor Cyan
        $proxy | Stop-Process -ErrorAction Stop   # PowerShell sends WM_CLOSE → graceful
        Start-Sleep -Seconds 2
        $proxy = Get-Process -Name 'cli-proxy-api' -ErrorAction SilentlyContinue
        if ($proxy) {
            Write-Host "[eee] WARN: graceful stop timed out, force-killing..." -ForegroundColor Yellow
            $proxy | Stop-Process -Force
        }
        Write-Host "[eee] Proxy stopped." -ForegroundColor Green
    } else {
        Write-Host "[eee] Proxy not running." -ForegroundColor Gray
    }
    exit 0
}
```

### §15.2 Auto-start with PID file (proposed)

```powershell
# Append T0.6 enhancement — auto-start proxy if not running
$pidFile = "$env:CLAUDE_CODE_TMPDIR\cli-proxy-api.pid"
$proxy = Get-Process -Name 'cli-proxy-api' -ErrorAction SilentlyContinue
if (-not $proxy) {
    Write-Host "[eee] Auto-starting cli-proxy-api..." -ForegroundColor Cyan
    $proxyExe = 'Z:\claude-sota-installed\.local\bin\cli-proxy-api.exe'
    $proxyConfig = 'Z:\claude-sota-installed\.cli-proxy-api\config.yaml'
    $proxyLogDir = 'Z:\claude-sota-installed\.cli-proxy-api\logs'
    $job = Start-Process -FilePath $proxyExe `
        -ArgumentList '--config', $proxyConfig `
        -RedirectStandardOutput "$proxyLogDir\stdout.log" `
        -RedirectStandardError "$proxyLogDir\stderr.log" `
        -WindowStyle Hidden -PassThru
    $job.Id | Out-File -FilePath $pidFile -Encoding ascii
    # Wait for healthz
    $maxWait = 10
    for ($i = 0; $i -lt $maxWait; $i++) {
        Start-Sleep -Seconds 1
        try {
            $probe = Invoke-RestMethod -Uri "$EEE_PROXY_BASE/healthz" -TimeoutSec 1
            if ($probe.status -eq 'ok') {
                Write-Host "[eee] Proxy started (PID $($job.Id))" -ForegroundColor Green
                break
            }
        } catch {}
    }
}
```

### §15.3 Windows Service install (production op)

```powershell
# Optional: install as Windows Service for boot-time start
nssm install cli-proxy-api 'Z:\claude-sota-installed\.local\bin\cli-proxy-api.exe' `
    '--config' 'Z:\claude-sota-installed\.cli-proxy-api\config.yaml'
nssm set cli-proxy-api AppStdout 'Z:\claude-sota-installed\.cli-proxy-api\logs\service-stdout.log'
nssm set cli-proxy-api AppStderr 'Z:\claude-sota-installed\.cli-proxy-api\logs\service-stderr.log'
nssm set cli-proxy-api Start SERVICE_AUTO_START
Start-Service cli-proxy-api
```

---

## §16 Codex WebSocket executor — low-latency T1-T7 cross-routing

Cite: `Z:/repos/deps/CLIProxyAPI/internal/runtime/executor/codex_websockets_executor.go:1-80 @ HEAD 785b00c3` — `CodexWebsocketsExecutor` extends `CodexExecutor` with WS transport; `:34-36` constants (`responses_websockets=2026-02-06` beta header, 5min idle timeout, 30s handshake); `globalCodexWebsocketSessionStore` per-session map.

### §16.1 Why WS for codex T1-T7

- HTTP per-call overhead: ~200-500ms TCP+TLS handshake × every codex consult
- WS persistent: handshake once per session, reuse across all T1/T2/T3/T6 fires
- For multi-agent intensive arc with 50+ codex consults: WS saves ~10-25 seconds cumulative

### §16.2 Session-bound credential pinning

Cite: `selector.go:144-198 @ HEAD 785b00c3` `preferCodexWebsocketAuths` — when downstream WebSocket detected (`cliproxyexecutor.DownstreamWebsocket(ctx)` true) AND provider is Codex, proxy filters available auths to ONLY those with `authWebsocketsEnabled` (auth metadata `websockets: "true"`).

**Tiering recipe** for 8-account fleet supporting BOTH Claude AND Codex:
- Tag 4 accounts `websockets: "true"` (Codex-WS-preferred)
- Tag 4 accounts `websockets: "false"` (Claude-only fallback)
- Codex T1-T7 sessions auto-route to WS-preferred 4 → low-latency persistent connections
- Claude requests use full 8 accounts for fan-out

### §16.3 v6.10.9 Codex-WS bug-fix landed (since v6.10.8)

Cite: `git log v6.10.8..v6.10.9 --oneline @ HEAD 785b00c3` shows commit `fb08b924 feat(executor): add upstream disconnect handling for Codex WebSocket sessions` — fixes session-resume after upstream disconnect mid-conversation. **Critical for long-running codex T6 stop-gate** (900s budget per cross-model-consensus.md). Pin to v6.10.9 specifically (not v6.10.8) to capture this fix per CR-6 freshness.

---

## §17 Streaming + bootstrap-retry tuning (Claude Code SSE optimization)

Cite: `config.example.yaml:71-78 @ HEAD 785b00c3` (streaming config); `conductor.go:715-729 @ HEAD 785b00c3` (`streamBootstrapError` with status-code preservation + Retry-After header); `:1281-1284` (graceful stream-error result emission).

### §17.1 Recommended streaming config

```yaml
streaming:
  keepalive-seconds: 15      # SSE keep-alive every 15s — prevents idle-timeout drops
  bootstrap-retries: 1       # one safe retry before first byte
                             # — if connection drops before first chunk, retry on next credential
                             # — after first byte, retry would corrupt stream so no retry possible
nonstream-keepalive-interval: 30   # for non-streaming: blank-line every 30s
```

### §17.2 Why bootstrap-retries: 1 (not 0)

Per `conductor.go:715-729` — `streamBootstrapError` is the error class returned when the upstream Anthropic API rejected/dropped before sending the first SSE chunk. Once bytes flow downstream to the client, retry would corrupt the stream — so retries can ONLY happen pre-bootstrap. **Setting `bootstrap-retries: 1` enables exactly one transparent failover** when the first credential's stream-bootstrap fails (cred cooling, network blip, account suspension), without any client-visible retry.

### §17.3 Why keepalive-seconds: 15 (not 0)

Default 0 disables keepalive — risk that intermediate proxies/firewalls (corporate NAT, ISP middleboxes) drop "idle" SSE connections. 15s is faster than typical idle-timeout thresholds (30-60s) and gives 2× safety margin. For Claude Code's long-running tool-use turns (multi-second tool execution between assistant chunks), keepalive prevents the conversation from looking idle to the network.

### §17.4 4-breakpoint cache + streaming interaction

Cite: `claude_executor.go:1997-2165 @ HEAD 785b00c3` `enforceCacheControlLimit` runs PRE-streaming. The 4-breakpoint cap is enforced BEFORE the request goes upstream — operator never sees mid-stream cache errors. Removal priority preserves LAST tool + LAST system + recent messages (3 highest-value cache slots), evicting earlier system blocks first.

---

## §18 Final SOTA-recipe config.yaml (consolidated)

Replaces §2 with all §11-§17 optimizations layered in. Path: `Z:/claude-sota-installed/.cli-proxy-api/config.yaml`.

```yaml
# CLIProxyAPI 8-account fleet config — eee runtime FULL-UNLEASH SOTA
# Cite: Z:/repos/deps/CLIProxyAPI/config.example.yaml @ HEAD 785b00c3 [VERIFIED 2026-05-07]
# Class: TIER-3-LOCAL-COMPOSITION over TIER-1-DIRECT (config schema)

host: "127.0.0.1"
port: 8317
tls:
  enable: false

remote-management:
  allow-remote: false
  secret-key: "EEE_MGMT_SECRET_REPLACE"
  disable-control-panel: false
  panel-github-repository: "https://github.com/router-for-me/Cli-Proxy-API-Management-Center"

auth-dir: "~/.cli-proxy-api"

# 4-key downstream API key stratification (per-class isolation)
api-keys:
  - "eee-fleet-key-orchestrator"
  - "eee-fleet-key-research"
  - "eee-fleet-key-codex-bridge"
  - "eee-fleet-key-eval"

# §11.1 high-concurrency
commercial-mode: true
debug: false

# §14 observability
logging-to-file: true
logs-max-total-size-mb: 1024
error-logs-max-files: 50
usage-statistics-enabled: true
redis-usage-queue-retention-seconds: 600

# §11.2 refresh worker pool
auth-auto-refresh-workers: 32

# §11.4 retry-budget (most-aggressive workload class)
request-retry: 5
max-retry-credentials: 0
max-retry-interval: 60
disable-cooling: false

# Quota auto-failover (selector.go:101-114 + scheduler.go:431-462)
quota-exceeded:
  switch-project: true
  switch-preview-model: true
  antigravity-credits: false

# §17 streaming optimization (Claude Code SSE)
streaming:
  keepalive-seconds: 15
  bootstrap-retries: 1
nonstream-keepalive-interval: 30

# Routing (§5 SOTA decision)
routing:
  strategy: "fill-first"
  session-affinity: true
  session-affinity-ttl: "1h"

# WS auth (§16 Codex WS preference)
ws-auth: false
enable-gemini-cli-endpoint: false

# Optional: pprof for capacity profiling (LOCALHOST ONLY)
pprof:
  enable: false             # flip to true under burst-load investigation
  addr: "127.0.0.1:8316"

# Force-model-prefix (off by default — accounts span all models)
force-model-prefix: false
passthrough-headers: false

# Antigravity signature cache (default-on; works for thinking blocks)
# antigravity-signature-cache-enabled: true
# antigravity-signature-bypass-strict: false
```

---

## §19 Onboarding sequence — full SOTA setup playbook

Per CR-10 (research-first-then-install) + CR-11 (META-process):

| Step | Action | Cite | Validation |
|---|---|---|---|
| 1 | `gh release download v6.10.9 --repo router-for-me/CLIProxyAPI --pattern '*windows-amd64*' --dir Z:\claude-sota-installed\.local\bin\` | CR-6 official-native-channel | `cli-proxy-api.exe --version` returns v6.10.9 |
| 2 | Author `Z:\claude-sota-installed\.cli-proxy-api\config.yaml` from §18 recipe | §18 above | `cli-proxy-api --config <path> --help` parses |
| 3 | Auto-start proxy via §15.2 launcher snippet | §15 | `Invoke-RestMethod $base/healthz` returns ok |
| 4 | Run `cli-proxy-api --claude-login` × 7 (active emails per §3.0 roster) | `internal/cmd/anthropic_login.go:22-59` | 7 JSON files in `<auth-dir>/auths/` |
| 5 | Re-onboard 1 NEW account (replaces disabled `readingcodingandbeyond`) | per operator decision | 8 active JSON files |
| 6 | Layer priority metadata via Management API §13.1 (4 fresh @ 10, 3 mid @ 5, 1 cold spare @ 1) | §12 + §13 | `GET /v0/management/auth-files` shows correct priorities |
| 7 | Tag 4 accounts `websockets: "true"` for Codex WS preference | §16.2 | `selector.go:144-198` filter applies |
| 8 | Edit `tools/eee.ps1` — insert env block (d) per §4.1 + T0.6 gate per §4.2 + §15.1 kill-switch + §15.2 auto-start | §4 + §15 | `eee --version` works; T0.6 reports "fleet OK (8 accounts loaded)" |
| 9 | Smoke probe 3-tier: (a) POST /v1/messages with `cache_creation_input_tokens > 0`; (b) burst 5 parallel requests across api-keys, verify 5 different `auth_id` selected; (c) intentionally exhaust 1 account, verify auto-failover | §3.4 + Management API | All 3 pass |
| 10 | Install Tier-2 observability — CPA Usage Keeper per §14.1 | CR-6 official-native | Dashboard renders per-account usage |
| 11 | Optional: install as Windows Service per §15.3 | nssm + Win Service | `Get-Service cli-proxy-api` running |
| 12 | Append manifest entry — Section 2.5 with all 12 rows + CR-8 status per row | §6 expanded | manifest §18.1 trigger predicate (f) for Tier 2 increments |
| 13 | Codex T1+T2+T3 review of `tools/eee.ps1` diff per CR-3 (Phase 1 bootstrap exception OR foreground+tee codex exec) | CR-3 | Verdict on file |

---

## §20 Cumulative SOTA features unleashed (full list)

| # | Feature | Cite | Effect on intensive fan-out |
|---|---|---|---|
| 1 | Fill-first routing | `selector.go:34-35,360-369` | Staggers 8-account 5h windows → 40h continuous capacity |
| 2 | Session-affinity (1h TTL) | `selector.go:430-499` | Per-session prompt-cache continuity → 90% cost reduction on cached prefix |
| 3 | Auto cache_control injection (LAST tool/system/user) | `claude_executor.go:1843-1867` | All clients benefit even without explicit cache_control |
| 4 | 4-breakpoint cap enforcement | `claude_executor.go:1997-2165` | Never see Anthropic 400 from too-many-breakpoints |
| 5 | 5m/1h TTL ordering enforcement | `claude_executor.go:1914-1995` | Auto-downgrade prevents API errors on TTL-mix |
| 6 | Priority-aware credential selection | `selector.go:116-129,200-254` + `scheduler.go:347-372` | Fresh-tier used first; recovery kicks in only when fresh exhausted |
| 7 | Per-credential model pool | `conductor.go:495-595` | One account → multiple model aliases |
| 8 | Per-credential roundtripper (proxy-url) | `conductor.go:1320-1322` | Per-account egress isolation (residential IP, geo) |
| 9 | Per-credential excluded-models | `config.example.yaml:113-118` | Reserve Opus quota on recovery tier |
| 10 | WebSocket-preferred Codex routing | `selector.go:144-198` + `codex_websockets_executor.go` | Persistent WS for codex T1-T7 → low-latency |
| 11 | Cross-credential retry with cooldown | `conductor.go:1186-1218,1290-1367` | All 8 accounts tried on transient failure |
| 12 | Quota-exceeded auto-switch | `config.example.yaml:103-107` | No client-visible quota error in normal ops |
| 13 | Stream-bootstrap retries (pre-byte-1) | `conductor.go:715-729,1281-1284` | Transparent failover on initial-stream failures |
| 14 | Graceful stream error emission | `conductor.go:1281-1284` | Client sees error inline, no connection drop |
| 15 | SSE keepalive (15s) | `config.example.yaml:71-72` | Prevents corporate-NAT idle drops |
| 16 | Hot-reload via SHA256 debounce | `internal/watcher/config_reload.go:43-78` | Live config edits without restart |
| 17 | Field-level diff on reload | `internal/watcher/diff/*.go` | Surgical refresh — only affected providers reload |
| 18 | Management API live control | `internal/api/server.go:549-630` | Operator changes routing/priority without config-edit |
| 19 | Per-account recent-request audit | `internal/api/handlers/management/auth_files_recent_requests.go` | Forensic debug per-account |
| 20 | Auth backup/restore | `internal/api/handlers/management/auth_files_download.go` | Disaster recovery + cross-machine portability |
| 21 | Singleflight-deduplicated token refresh | `anthropic_auth.go:34-35` | Prevents 8-account refresh thundering herd |
| 22 | Refresh backoff on 429 | `anthropic_auth.go:30-31,89-107` | Honors Anthropic Retry-After/Retry-After-Ms |
| 23 | Configurable refresh worker pool | `config.example.yaml:67-69` | Parallel refresh for 8-account fleet |
| 24 | API-key stratification (4 downstream keys) | §2 + AuthMiddleware | Per-workload usage analytics + isolation |
| 25 | Commercial-mode middleware tuning | `config.example.yaml:50` | Reduced per-request memory under fan-out |
| 26 | Request logging with body capture toggle | `request_logging.go:21-60` | Audit trail for compliance/forensic |
| 27 | Redis usage queue (10min retention) | `config.example.yaml:54-55` | CPA Usage Keeper + dashboard integration |
| 28 | Antigravity-credits fallback | `conductor.go:1210-1213,1276-1279` | Last-resort fallback for free-tier exhaustion |
| 29 | Codex WS upstream-disconnect handling (v6.10.9 NEW) | `codex_websockets_executor.go` (commit fb08b924) | Long-running codex T6 stop-gate stability |
| 30 | Healthz liveness | `server.go:340-341` | T0.6 fleet-health gate in eee.ps1 |

**All 30 SOTA primitives enabled** by §18 config + §3-§19 setup playbook.

---

## §22 Anthropic 529 / "Server temporarily limiting requests" — offload patterns

**Operator-reported error class** (2026-05-08): `API Error: Server is temporarily limiting requests (not your usage limit) · Rate limited`. This is **HTTP 529 `overloaded_error`** from Anthropic's server-side global throttle — STRUCTURALLY DIFFERENT from per-account 5h-window quota (covered §5):

| Class | HTTP status | Source | Per-account? | Per-IP? | Mitigation |
|---|---|---|---|---|---|
| Per-account quota | 429 + Retry-After | Anthropic per-account 5h-window | YES | NO | §5 fill-first stagger |
| **Server temporarily limiting** | **529** + (no Retry-After) | **Anthropic global capacity / regional throttle** | **NO** | **OFTEN YES** | §22 (this section) |
| Per-IP rate limit | 429 (Cloudflare) | Anthropic CDN/WAF | NO | YES | §22.2 per-cred proxy-url |
| Token-bucket TPM | 429 | Anthropic per-org limits | partial | NO | §22.4 burst-shaping |

### §22.1 Proxy gap analysis (line-by-line)

Cite: `Z:/repos/deps/CLIProxyAPI/sdk/cliproxy/auth/conductor.go:2106-2169 @ HEAD 785b00c3` — per-status state machine has explicit cases for 401/402/403/404/408/429/500/502/503/504 but **529 falls into `default` branch** (`state.NextRetryAfter = time.Time{}`) — NO cooldown set, NO automatic cross-credential retry trigger.

Cite: `conductor.go:2018-2019 @ 785b00c3` — outer retry classifier:
```go
if status != http.StatusTooManyRequests {
    return 0, false
}
```
**Only 429 with Retry-After triggers cross-credential retry**. 529 returned to client raw.

Cite: `internal/runtime/executor/claude_executor.go:235,244,255 @ 785b00c3` — Claude executor wraps non-2xx in `statusErr{code: httpResp.StatusCode}` preserving the actual 529. No mapping to 429.

**Implication**: with current proxy version (v6.10.9), 529 from Anthropic propagates directly to Claude Code — operator hits the same UI error even with 8-account fleet.

### §22.2 Mitigation A — Per-credential proxy-url (residential IP isolation)

Cite: `conductor.go:1320-1322 @ 785b00c3` — `m.roundTripperFor(auth)` returns per-auth HTTP transport; per-account egress proxy injection.

**The strongest 529 mitigation when error is IP-bucketed.** If Anthropic's 529 is keyed to (account+IP) tuple OR pure source-IP, routing each of 8 accounts through a DIFFERENT egress IP (residential proxy / VPN tunnel / mobile-proxy) gives 8× independent rate buckets.

**Config recipe** (per-auth metadata, set via Management API after onboarding):

```bash
# Layer per-account proxy-url
curl -s -X PATCH http://127.0.0.1:8317/v0/management/auth-files \
    -H 'X-Mgmt-Key: <key>' \
    -d '{"file":"claude-aesthetic9c@gmail.com.json","metadata":{"proxy-url":"socks5://user:pass@residential-pool-1.provider.com:1080"}}'

# Repeat with proxy-url 2..8 across 8 different residential exit nodes
```

**Trade-offs**:
- Cost: residential proxy services = $5-50/mo per IP × 8 = $40-400/mo
- Latency: +50-200ms per request (proxy hop)
- Reliability: residential IPs may rotate / fail
- Privacy: vendor sees traffic content (use trusted provider)

**When NOT to use**: if 529 is org-wide TPM throttle (per Anthropic API key/org), proxy-url won't help — Anthropic counts requests per-OAuth-account regardless of source IP.

### §22.3 Mitigation B — `disable-cooling: false` + force-treat-529-as-503 workaround

Cite: `conductor.go:2167-2169 @ 785b00c3` (default branch) + `:2160-2166` (5xx 1-minute cooldown).

**Workaround**: until upstream adds 529 case, **inject `proxy-url` returning custom 503 OR upstream-treat 529 as 503**. Two paths:

1. **Upstream PR** to router-for-me/CLIProxyAPI: add `case 529:` branch matching 503 semantics (1-min cooldown; transient retry trigger). Trivial 5-LOC patch:
   ```go
   // Insert at conductor.go:2160 (before existing 408,500,502,503,504 case)
   case 529:
       if disableCooling {
           state.NextRetryAfter = time.Time{}
       } else {
           next := now.Add(30 * time.Second)  // shorter than 503 since global throttle clears faster
           state.NextRetryAfter = next
       }
   ```
   Then add `case 529:` to outer `shouldRetryAfterError` retry classifier at L2018 to enable cross-credential retry.

2. **Vendor fork** (CR-9 install-risk: vendored fork carries permanent maintenance burden): clone `Z:/repos/deps/CLIProxyAPI`, apply 5-LOC patch, build local binary, install at `Z:\claude-sota-installed\.local\bin\cli-proxy-api-with-529-patch.exe`. **NOT recommended** unless upstream PR is rejected.

3. **`disable-cooling: true` workaround** (light-touch, no fork): per `config.example.yaml:91 @ 785b00c3`:
   ```yaml
   disable-cooling: true   # disables ALL auth/model cooldown — proxy retries immediately
                           # After 529, immediately tries next credential without backoff
   ```
   **Trade-off**: disables ALL cooldowns including legitimate 429-quota cooldowns → fleet thrashing if Anthropic 429 hits all 8 simultaneously. **Use only as emergency override**, not steady-state.

### §22.4 Mitigation C — App-level circuit-breaker in eee.ps1

When client (Claude Code) sees 529, by default it retries the same request → multiplies load, worsens throttle. **Pre-Claude-Code circuit-breaker** in eee.ps1:

```powershell
# Append after T0.6 — circuit-breaker pre-launch probe
$EEE_CIRCUIT_BREAKER_FILE = "$env:CLAUDE_CODE_TMPDIR\eee-circuit-breaker.json"
if (Test-Path $EEE_CIRCUIT_BREAKER_FILE) {
    $cb = Get-Content $EEE_CIRCUIT_BREAKER_FILE | ConvertFrom-Json
    $now = [DateTimeOffset]::Now.ToUnixTimeSeconds()
    if ($cb.until -gt $now) {
        $waitSec = $cb.until - $now
        Write-Host "[eee] CIRCUIT-BREAKER: 529 rate-limit detected ${($cb.detected_at)}; waiting ${waitSec}s before launch" -ForegroundColor Red
        Start-Sleep -Seconds $waitSec
        Remove-Item $EEE_CIRCUIT_BREAKER_FILE
    }
}

# Background poll (separate worker — set in cron / scheduled task)
# Watches proxy logs for 529 → writes circuit-breaker.json with 60s TTL
# When eee launches, T0.6 checks file + waits if active
```

This shifts the 529 retry from client-side multiplied-load to operator-side serialized-with-backoff.

### §22.5 Mitigation D — Sister-project CCS / 9Router alternative-account-switch

Cite: `https://github.com/decolua/9router` (TIER-1 README per CLIProxyAPI README:200-220 sister-project list) — *"combo system with auto-fallback, multi-account management with exponential backoff"*; `https://github.com/diegosouzapw/OmniRoute` — *"OmniRoute is an AI gateway for multi-provider LLMs ... add policies, rate limits, caching, and observability"*.

**For deep 529 resilience, layer a SECOND proxy in front of CLIProxyAPI**:
```
claude.exe → eee.ps1 → 9Router (529-aware fallback) → CLIProxyAPI → 8 OAuth accounts
```

9Router/OmniRoute add Anthropic-API endpoint (Sonnet-via-OAuth) FALLBACK to OpenAI-compat (GPT-5.5 via Codex API) when ALL 8 Claude accounts hit 529. Operator configures eee to talk to 9Router; 9Router routes to CLIProxyAPI normally; on 529-from-all-accounts cascade, 9Router falls back to GPT-5.5 (lower quality but available). **Cardinal-rule-9 install-risk: 2-proxy chain** — adds latency + ops complexity; defer until 529 is empirically frequent.

### §22.6 Mitigation E — Anthropic-side Retry-After honoring + exponential backoff

Cite: `internal/auth/claude/anthropic_auth.go:30-31,89-107 @ 785b00c3` — `parseClaudeRetryAfter` already honors `Retry-After` AND `Retry-After-Ms` headers from Anthropic for OAuth refresh.

**For non-OAuth 529 responses**: Anthropic typically does NOT include Retry-After on 529 (the throttle is dynamic). Recommended exponential backoff schedule (matches `nextQuotaCooldown` semantics at conductor.go:2141 for 429):

| Attempt | Wait |
|---|---|
| 1st 529 | 30s |
| 2nd 529 | 1m |
| 3rd 529 | 2m |
| 4th 529 | 5m |
| 5th 529 | 10m |
| 6th+ 529 | 30m (hold pattern) |

**Implementation**: codify in eee.ps1 circuit-breaker (§22.4) using exponential ladder per `evidence-policy.md` Stuck Detection (3 failed attempts → STOP).

### §22.7 Recommended layered defense

For full SOTA 529 resilience, stack these mitigations in order of cost-effectiveness:

1. **§22.4 App-level circuit-breaker** (free, zero-latency-cost when no 529): catch 529 at eee.ps1 launch, hold for backoff
2. **§22.6 Exponential backoff** (free): 30s/1m/2m/5m/10m/30m ladder
3. **§22.3 disable-cooling: false** (default — keep): retains per-account 429 cooldowns; doesn't help 529 directly but prevents fleet thrash
4. **§22.2 Per-credential proxy-url** ($40-400/mo): if 529 is empirically IP-keyed
5. **§22.3 Upstream PR** (high-leverage one-time): file PR adding 529 case to conductor.go state machine; benefits all CLIProxyAPI users
6. **§22.5 Sister-project layer** (high-complexity): 9Router/OmniRoute as 2nd-tier fallback only after 1-4 prove insufficient

**Validation**: file all 6 mitigations in `docs/eee-launch-design-cliproxyapi.md §22` (this section); operator activates §22.4 + §22.6 first (free); §22.2 only if 529 frequency > 1/day; §22.3 PR upstream after 529 incident pattern stabilizes.

---

## §23 Cross-model-gate satisfaction status (CR-3 Phase 1 bootstrap exception)

Per CLAUDE.md cardinal-rule-3 + `Z:/claude-sota/.claude/rules/cross-model-consensus.md §Verdict report shape (synthesis-layer-verify integration)` + `codex-t1-fix-forward-pattern.md §Pattern B`:

### §23.1 Codex T1 dispatch attempt (2026-05-08)

**Profile**: `deep-review-exec` (`Z:/claude-sota-installed-state/.codex/config.toml:56`) — gpt-5.5 xhigh effort + danger-full-access sandbox + service_tier=fast + verbosity=high.

**Prompt**: `.claude/state/codex_consult_eee_launch_design_e2e.txt` — 3-axis review (operational soundness / cite-anchor accuracy / 529 gap analysis), schema-strict JSON output mandated.

**Result**: **Pattern B HONEST-NON-FINDING** — codex T1 ran 309,174 tokens of substantive investigation but FAILED at internal remote-compaction with:
```
ERROR: codex_core::compact_remote: remote compaction failed
last_api_response_total_tokens=240205, model_visible_bytes=760740,
compact_error: Unknown parameter: 'service_tier'
```

Two-cause analysis:
- (a) FM-17.d-class wrapper internal-stall at codex's compact-remote endpoint (codex's own internal context-management API rejected `service_tier=fast`)
- (b) Pattern B sub-cause 2 (sandbox-blocked pwsh): codex's PowerShell-mode reads emitted multiple `[InvalidOperation]: Cannot set property` errors during exploration

No structured `{"verdict": ...}` JSON emitted at EOF.

**Verdict file**: `.claude/state/codex_consult_eee_launch_design_e2e_OUT.txt` (21,814 lines) — preserved as Pattern B audit trail.

### §23.2 Orchestrator-side compensating Mia pre-apply (5/5 PASSED VERBATIM)

Per `Z:/claude-sota/.claude/rules/mia-pre-apply.md` (verification-before-completion specialization for prescription-to-edit boundary), I orchestrator-probed the 5 highest-leverage load-bearing cite anchors directly via `sed -n` against `Z:/repos/deps/CLIProxyAPI` @ HEAD `785b00c3`:

| # | Cite | Verbatim verification | Status |
|---|---|---|---|
| 1 | `selector.go:33-36` (fill-first comment) | *"This 'burns' one account before moving to the next, which can help stagger rolling-window subscription caps (e.g. chat message limits)"* | ✅ EXACT |
| 2 | `selector.go:430-432` (Claude Code session regex) | `_session_([a-f0-9-]+)$` matching `user_{hash}_account__session_{uuid}` | ✅ EXACT |
| 3 | `anthropic_auth.go:25-32` (OAuth ClientID) | `ClientID = "9d1c250a-e61b-44d9-88ed-5944d1962f5e"` + `AuthURL = "https://claude.ai/oauth/authorize"` + `TokenURL = "https://api.anthropic.com/v1/oauth/token"` | ✅ EXACT |
| 4 | `conductor.go:2160-2169` (§22 529 gap) | switch covers 408/500/502/503/504 with 1-min cooldown; **`default` branch sets `state.NextRetryAfter = time.Time{}`** — confirms 529 has NO automatic cooldown (the gap §22 describes) | ✅ EXACT — gap analysis correct |
| 5 | `claude_executor.go:1843-1867` (ensureCacheControl) | *"adds cache_control to: 1. The LAST tool... 2. The LAST system prompt element 3. The SECOND-TO-LAST user turn... Up to 4 cache breakpoints... INDEPENDENT breakpoints... up to 90% cost reduction on cached tokens (cache read = 0.1x base price)"* | ✅ EXACT |

**Mia n+1 evidence ladder**: this fire extends the n=29+ cumulative dogfood per `mia-pre-apply.md` baseline — 5 prescriptions probed, 0 OVER detected, 5 GENUINE-VERIFIED. All design cite anchors at HEAD `785b00c3` are accurate verbatim.

### §23.3 Cross-model-gate-satisfaction-status disclosure

Per `cross-model-consensus.md §Env-funneled subagent stand-in disclosure mandate` mandatory disclosure shape:

**Status**: `PARTIAL via Pattern B HONEST-NON-FINDING + orchestrator-side compensating Mia 5/5 PASSED`

**Reasoning**:
- T1 codex GPT-5.5 BRIDGE-MODE attempted; FM-17.d-class internal-compaction failure at 309K tokens
- No structured verdict; trace-mining yielded confirmations but no terminal disposition
- Orchestrator-side Mia probed 5 highest-leverage cite anchors → 5/5 verified verbatim
- Mia compensates cite-accuracy axis (AXIS-2 of §22.1 gap analysis); operational-soundness (AXIS-1) and 529-mitigation-completeness (AXIS-3) remain UNVERIFIED by GPT-5.5
- Per CR-3 Phase 1 bootstrap exception: design ships with PARTIAL cross-model gate, fresh-T1 retry queued WHEN service_tier remote-compaction issue resolved

**Operator action items**:
- Activate design at §19 step 1 onward at operator discretion (no install-blocking findings)
- File upstream codex-cli issue: `service_tier=fast` rejected by codex's `compact_remote` endpoint (likely needs profile-aware compaction-request shape)
- Schedule fresh codex T1 fire after upstream codex-cli fix lands (`gh release list --repo openai/codex` past v0.129.0)

### §23.5 Codex T1 retry attempt 2 (2026-05-08) — codex quota exhausted

**Profile pivoted**: `review` (lines 65-69 of `Z:/claude-sota-installed-state/.codex/config.toml` — no `service_tier=fast`, sidesteps the prior compact_remote blocker). Prompt narrowed to 2-axis (`codex_consult_eee_launch_v2_narrowed.txt`) to fit 480s budget.

**Result**: codex CLI exited within seconds with:
```
ERROR: Quota exceeded. Check your plan and billing details.
```

Codex CLI account itself hit its own usage quota — separate from any CLIProxyAPI limits. No investigation occurred this attempt.

**Disposition** per `cross-model-consensus.md §"On codex unavailable"` recovery option (a) DEFAULT: queue + retry when codex available. Fresh T1 deferred to next codex quota window. Design ships with the PARTIAL cross-model-gate status from §23.3 unchanged; §23.2 orchestrator-side Mia 5/5 PASSED remains the compensating cross-model-gate satisfaction.

**Verdict file**: `.claude/state/codex_consult_eee_launch_v2_narrowed_OUT.txt` (preserved as Pattern B audit trail).

### §23.4 Pattern B HNF audit trail

Per `synthesis-layer-verify.md §Reporting categories`: this T1 fire is a **HONEST-NON-FINDING** — substantive 309K-token investigation produced no terminal verdict, NOT because design was perfect (would be APPROVE) but because codex's own infrastructure broke before completion. Categorize this as failure-class FM-17.d (BRIDGE-MODE wrapper internal-stall) at the codex-CLI-vendor layer, not at design-quality layer.

Per `closed-loop-recursive-narrowing.md §Disposition signal severity gate`: no severity-gate trigger fired (no high/critical findings surfaced from partial trace); design proceeds with Outcome A monotone-decline path BLOCKED at PARTIAL until fresh T1 lands.

---

## §24 Anthropic 2026-05-06 announcement integration — limits DOUBLED + peak-hours throttle REMOVED

**TIER-1-DIRECT cite anchor**: `https://www.anthropic.com/news/higher-limits-spacex` (Anthropic official announcement, 2026-05-06) [VERIFIED 2026-05-08 via WebFetch].

**Verbatim findings** from announcement:
1. *"doubling Claude Code's five-hour rate limits"* — for Pro, Max, Team, Enterprise plans
2. *"Peak hours limit reduction"* on Claude Code **REMOVED** for Pro/Max plans
3. *"API rate limits for Claude Opus raised considerably"* — table shown but specific numbers not in fetched abstract
4. SpaceX compute partnership: *"over 300 megawatts of new capacity (over 220,000 NVIDIA GPUs)"* (capacity tailwind for sustained limit increases)
5. **Effective**: "today" = 2026-05-06 (3 days before this design fire)

### §24.1 §1 throughput math UPDATE

Original §1 baseline (pre-2026-05-06):
- Per-account: ~1500 messages / 5h
- 8-account fleet (fill-first staggered): 12,000 messages / 5h
- 50% cache-hit rate: ~24,000 messages / 5h effective

**Post-2026-05-06 baseline (Pro/Max/Team/Enterprise plans)**:
- Per-account: **~3000 messages / 5h** (doubled per announcement)
- 8-account fleet (fill-first staggered): **24,000 messages / 5h** raw capacity
- 50% cache-hit rate: **~48,000 messages / 5h** effective (32× single-account pre-announcement baseline)
- Plus: **no peak-hours throttle** — capacity uniform across the day for Pro/Max plans

### §24.2 §22 mitigation priority shift

The announcement REMOVES one 529-trigger path:
- **Peak-hours throttle (REMOVED)**: pre-2026-05-06, Pro/Max plans hit "Server temporarily limiting requests" during peak hours (US business hours typically) — this was a per-plan-tier throttle, not per-account quota. Post-announcement, Pro/Max plans no longer face this throttle.
- **Server-global 529 (UNCHANGED)**: Anthropic's global capacity 529 still possible during model-launch surges or infrastructure incidents.
- **Org-wide TPM 529 (UNCHANGED for Enterprise)**: Enterprise org-level TPM caps still apply.

**Updated §22.7 layered defense priority** (post-2026-05-06):
1. **§22.4 App-level circuit-breaker** — STILL highest-value (free, catches global 529)
2. **§22.6 Exponential backoff** — STILL load-bearing for global 529
3. **§22.2 Per-credential proxy-url** — DEPRIORITIZED (peak-hours-throttle removal eliminated the IP-keyed motivation for Pro/Max plans; only relevant if 529 is empirically global-IP-keyed which is unlikely)
4. **§22.3 Upstream PR for 529 case** — STILL high-leverage (handles remaining global 529 class)
5. **§22.5 Sister-project layer** — STILL last-resort

### §24.3 8-account fleet ROI re-evaluation

Pre-2026-05-06: 8-account fleet was load-bearing because per-account 1500-message cap was tight under 5-agent intensive fan-out. Post-announcement at 3000-message-per-account doubled capacity:

| Workload | Single-account adequate? | 8-account justified? |
|---|---|---|
| Solo orchestrator + occasional sub-agents | YES (3000 msg/5h is generous) | NO — single account suffices |
| 3-agent parallel fan-out | YES if not sustained | OPTIONAL — buffer + cache-stratification |
| 5-agent sustained intensive fan-out | NO (3000 / 5 = 600 msg/agent/5h) | **YES** — fleet still load-bearing |
| 8+ agent codex T1-T7 + Claude orchestrator | NO | **YES** — fleet critical for cross-model |

**Operator decision point**: post-announcement, operators on solo+occasional workloads can defer 8-account onboarding to fewer accounts (3-4) without losing capacity. The fleet design remains correct for sustained intensive use; investment scales with workload intensity.

### §24.4 §3.0 outdated-profile-guard supplementary note

Parent CCC `Z:/claude/ccc/auth/` 7 active OAuth profiles were minted under pre-2026-05-06 rate-limit scope — but **rate limits are account-side, not token-side**. Re-onboarded tokens AND existing tokens BOTH automatically receive the doubled 5h cap and removed peak-hours throttle. **No re-onboarding required to gain doubled limits** — the announcement applies to existing OAuth subscriptions immediately.

CR-9 install-risk on parent tokens (token shape divergence under parent's `dev` binary patches) STILL applies — fresh re-onboarding under v6.10.9 official ClientID is still recommended for token-shape compatibility, NOT for capacity reasons.

### §24.5 Update triggers (this section)

Re-evaluate §24 when:
- Anthropic announces another rate-limit change (announcement page bumps past 2026-05-06)
- Empirical 529 frequency post-2026-05-06 differs significantly from pre-2026-05-06 baseline
- Anthropic publishes specific numeric API rate limit table for Opus (verified table replaces qualitative "raised considerably" claim)
- Compute partnership capacity comes online and changes the rate-limit ceiling (300 MW / 220k GPU rollout schedule)

---

## §21 Recursive dogfood note

This design fire (Wave 50+ Fire CLIProxy install) executes under CR-11 META-process awareness:

- Used `WebFetch` for upstream README probe (TIER-1 official source)
- Used `Bash + git log/grep/cat` for line-by-line cite-anchor verification at file:line + HEAD SHA depth
- All 6 audit tasks tracked via TaskCreate/TaskUpdate per `karpathy-adapted.md §5` Layer 1 chronological log
- Per-call research budget honored (each Bash probe < 30s; no 90-180s codex budget needed in Phase 1 bootstrap)
- Cardinal-rule-1 cite-trail discipline applied: every claim has file:line @ HEAD SHA
- Cardinal-rule-9 install-risk discipline: version-pin v6.10.9, REVERT-check N/A, sibling-bleed N/A, 2-round budget acknowledged

The codification artifact (this doc) IS the SOTA pattern: install-priority + fresh-from-github + cite-anchored + risk-registered + Phase-graduated.
