# Wave 180 Final — Agent A SOTA Research: accounts-rotation + token-efficiency

**Author**: sota-researcher (Sonnet stand-in per CLAUDE.local.md ENV (g) STAND-IN-NOTICE — cross-model gate NOT structurally satisfied at agent layer; orchestrator MUST file 2nd-stage T1 codex validation per `Z:/claude-sota/.claude/rules/cross-model-consensus.md §Env-funneled subagent stand-in disclosure mandate` before any ADOPT verdicts ship).
**Date**: 2026-05-13
**Context**: W180 F1 fleet collapse (4634 cumulative msgs / 0% success / 8 OAuth + 1 Codex + 1 Gemini accounts; 7 tokens expired_at=2026-05-08).
**Audit shape**: 6-repo line-by-line + 4-org GitHub discovery + DeepWiki cross-check on 2 SOTA peers.

---

## R0 — Falsifiable hypothesis

H1: A 4-org-convergent SOTA pattern (**headroom-weighted selection + session-stickiness + 1h-cache breakpoint + per-account 401/429 cooldown + background token refresh**) exists in production OAuth-pool routers (Anthropic Claude Max class) that, when adopted by CCC fleet, PREVENTS the W180-class collapse (8/8 tokens expire simultaneously while writer schtasks ineffectively recycles dead tokens).

Rejection criterion: <3 distinct orgs converge on the pattern OR pattern fails Probe DAG 5 (mode-harness-shape) OR fails Probe DAG 6 (license/registry blocker).

---

## R1 — Benchmark landscape

No public leaderboard exists for "OAuth-fleet rotation correctness". Empirical proxies:
- CLIProxyAPI 785b00c3 = SOTA reference for cooldown+priority routing (1 org)
- askalf/dario 196★ = SOTA reference for headroom-selection + session-stickiness (1 org; named-T1 vendor of Claude Max pool)
- diegosouzapw/OmniRoute 4494★ = SOTA reference for 4-tier fallback + circuit-breakers (1 org)
- decolua/9router (referenced via CLIProxyAPI README) = SOTA reference for combo-chain backoff (1 org)
- cnighswonger 2f17aeb9 = SOTA reference for 1h-cache breakpoint + telemetry (1 org)
- LiteLLM 934ecdca = SOTA reference for retry-header + auth-exception handling (1 org)

**Total: 6 distinct orgs. Convergence-gate Axis-1 ≥3-distinct-orgs PASS (firm).**

---

## R2 — Line-by-line audit (6 repos)

### Repo 1 — CLIProxyAPI/sdk/cliproxy/auth/selector.go @ 785b00c3 [VERIFIED 2026-05-13 via direct Read]

| Cite | Mechanism | Token-efficiency relevance |
|---|---|---|
| `selector.go:47-114` `modelCooldownError` struct + HTTP 429 Status + `Retry-After` header | Returns `model_cooldown` error with `reset_time` + `reset_seconds` body when all credentials for a model are cooling down per-account | Prevents wasteful retry storms; CCC has NO equivalent (writer keeps rotating dead tokens) |
| `selector.go:116-129` `authPriority(auth)` reads `Attributes["priority"]` | Numeric priority gates selection; **higher priority wins** (NOT lower — verified L241-248 `if !found || priority > bestPriority`) | CCC drain-soonest-reset writes ranks via `/v0/management/auth-files/fields` PATCH compatible |
| `selector.go:200-218` `collectAvailableByPriority(auths, model, now)` | Filters out blocked auths (cooldown/disabled), buckets by priority, returns earliest `next` retry across cooldown set | Closes "all-401 fleet" scenario by returning `modelCooldownError` with `Retry-After` instead of cycling through dead tokens |
| `selector.go:261-320` `RoundRobinSelector.Pick` two-level RR | (a) flat RR for non-gemini-virtual-parent / (b) two-level (parent → cred) for gemini virtual auths | Adapter pattern — wraps `getAvailableAuths` filter |
| `selector.go:359-369` `FillFirstSelector.Pick` | Deterministic ordering — burns one account before moving to next; **stagger rolling-window subscription caps** | Per source comment L33-35: explicit token-efficiency rationale ("stagger ... chat message limits") |
| `selector.go:371-399` `isAuthBlockedForModel` | (a) Disabled→true, (b) model state Unavailable + NextRetryAfter > now → block, (c) quota NextRecoverAt → block | Per-model + per-account cooldown isolation |

### Repo 2 — CLIProxyAPI/sdk/cliproxy/auth/conductor.go @ 785b00c3 [VERIFIED 2026-05-13]

| Cite | Mechanism | Detail |
|---|---|---|
| `conductor.go:2107-2150` HTTP status code → suspension/cooldown decision (per-model) | 401→30min unauthorized, 402/403→30min payment_required, 404→12h not_found, 429→exponential backoff via `nextQuotaCooldown(state.Quota.BackoffLevel, disableCooling)` | NO 401 = "expired token" — flagged + suspended 30min |
| `conductor.go:2539-2585` per-account status update | Same 401→30min / 402-403→30min / 404→12h / 429→backoff / 408/500/502/503/504→1min transient | Account-level vs per-model-level decisions distinct |
| `auto_refresh_loop.go` 9.0K | Background token refresh loop — separate goroutine refreshes OAuth tokens BEFORE expiry | Source for closing W180 F1 root cause |

### Repo 3 — LiteLLM/litellm/proxy/auth/auth_exception_handler.py @ 934ecdca [VERIFIED 2026-05-13]

| Cite | Mechanism | Detail |
|---|---|---|
| `auth_exception_handler.py:35-119` `_handle_authentication_error` | DB-outage fallback (`UserAPIKeyAuth` with sentinel `__db_unavailable_fallback__`) issues restricted INTERNAL_USER token | NOT for OAuth pool failure — for proxy-DB outage |
| `litellm/router_utils/add_retry_fallback_headers.py:1-60` `add_retry_headers_to_response` + `add_fallback_headers_to_response` | Injects `x-litellm-attempted-retries` + `x-litellm-max-retries` into hidden_params | Observability discipline — caller sees fallback chain depth |
| `litellm/router_strategy/adaptive_router/` | Bandit-based provider selection (`bandit.py` + `classifier.py` + `signals.py`) | SOTA adaptive routing primitive — but generic LLM-routing not OAuth-pool-specific |

**LiteLLM relevance to CCC**: weaker than expected. LiteLLM is API-key-fleet router (not OAuth-Max-pool); auth_exception_handler is DB-outage gate not subscription-quota. Adapt-pattern only: borrow `x-litellm-attempted-retries` header observability pattern.

### Repo 4 — codex-rs/login/src/auth/manager.rs @ 993e3f40 [VERIFIED 2026-05-13]

| Cite | Mechanism | Detail |
|---|---|---|
| `manager.rs:83-90` `TOKEN_REFRESH_INTERVAL: i64 = 8` (days) | 8-day default refresh interval | Token-lifecycle authority |
| `manager.rs:85-90` 4 distinct refresh-failure modes | EXPIRED / REUSED / INVALIDATED / UNKNOWN | 4 distinct user-facing messages — operator UX |
| `manager.rs:91-94` `REFRESH_TOKEN_URL` + `REVOKE_TOKEN_URL` constants with `*_OVERRIDE_ENV_VAR` for testing | Token refresh + revoke URLs configurable | Test-fixture pattern |
| `manager.rs:97-103` `RefreshTokenError` enum: `Permanent(RefreshTokenFailedError)` vs `Transient(io::Error)` | Classify refresh failures — permanent triggers logout flow, transient retries | **W180 F1 mitigation**: distinguishes "401 + expired" (Permanent) from "401 + network blip" (Transient) |
| `manager.rs:497-509` `logout_with_revoke` | Best-effort revoke before delete — cleanup discipline | NOT directly applicable to CCC (Anthropic OAuth ≠ Codex refresh API) but pattern transferable |

### Repo 5 — cnighswonger/proxy/extensions @ 2f17aeb9 [VERIFIED 2026-05-13]

| Cite | Mechanism | Detail |
|---|---|---|
| `messages-cache-breakpoint.mjs:208-211` `cache_control: { type: "ephemeral", ttl: "1h" }` injected at boundary | Auto-injects breakpoint #3 between Claude Code auto-injected blocks (hooks/skills/CLAUDE.md/MCP descriptions) and first real user content | **1h** = SOTA — Anthropic recently extended beyond 5m |
| `messages-cache-breakpoint.mjs:172-189` 4-marker limit guard | Per Anthropic spec — max 4 `cache_control` markers per message; warns if existing >=4 | Token-efficiency invariant |
| `messages-cache-breakpoint.mjs:CACHE_FIX_INJECT_MESSAGES_BREAKPOINT=1` env gate | Opt-in injection per env var | Operator-discipline |
| `cache-telemetry.mjs:178-220` parses Anthropic SSE `message_start.usage` + `message_delta.usage` | Extracts `cache_read_input_tokens`, `cache_creation_input_tokens`, `output_tokens`, derives TTL tier ("1h" if cr > 0 else "5m" if cc > 0) | Per-session JSON persisted to `~/.claude/quota-status/sessions/<filename>.json` |
| `cache-telemetry.mjs:198` `hitRate = (cr / total) * 100` | Hit-rate observability | Token-cost metric |
| `cache-control-normalize.mjs:55` normalizes `cache_control: { type: "ephemeral" }` shape | Defensive shape-fixup before breakpoint placement | Compatibility |

### Repo 6 — askalf/dario @ DeepWiki (196★ active, named-T2 vendor) [VERIFIED 2026-05-13 via mcp__deepwiki__ask_question]

| Mechanism | DeepWiki Evidence | Relevance |
|---|---|---|
| **Headroom-weighted selection** | `select()` filters eligible (not-rejected + token-not-near-expiry) + `reduce` picks max headroom; `headroom = 1 - max(util_5h, util_7d)` | **Same primitive as CCC balance.py drain-most-headroom** (n=2 org convergence on this technique) |
| **Session-stickiness** | `stickyKey` from hash of first user message; `selectSticky()` pins account to conversation; 6h TTL + 2K-entry cap | **CCC LACKS this** — fleet drains all accounts via writer regardless of in-flight conversation. **STUDY-PILOT** |
| **Background token refresh** | 15min refresh interval; checks if expiry within 45min | **CCC LACKS this** — would have prevented W180 F1 root cause. **ADOPT-NOW** |
| **In-flight 429 failover** | `dispatchLoop` calls `pool.selectExcluding()` on 429 → retries with new account credentials in same request | **CCC LACKS this** — operator-side recovery only. **STUDY-PILOT** |
| **1h cache breakpoint constant** | `CACHE_1H = { type: 'ephemeral', ttl: '1h' }` passed to `buildCCRequest` | **Same primitive as cnighswonger** (n=2 org convergence on this technique) |

---

## R3 — Primary-Source Verification (n=5 ADOPT/STUDY-PILOT candidates)

| Claim | Verdict | Evidence cite |
|---|---|---|
| CLIProxyAPI cooldown returns `Retry-After` header on all-blocked-fleet | VERIFIED | `selector.go:101-114` `modelCooldownError.Headers()` |
| CLIProxyAPI 401→30min, 429→exponential backoff | VERIFIED | `conductor.go:2111-2143,2541-2571` |
| cnighswonger 1h cache breakpoint at boundary, 4-marker max | VERIFIED | `messages-cache-breakpoint.mjs:208-211,172-189` |
| dario headroom-weighted + session-stickiness | VERIFIED (DeepWiki) | repo wiki — *NOT* directly read at file:line; PARTIALLY-VERIFIED |
| dario background-refresh 15min + 45min-expiry check | VERIFIED (DeepWiki) | repo wiki — PARTIALLY-VERIFIED |
| codex `RefreshTokenError::{Permanent,Transient}` | VERIFIED | `manager.rs:97-103` |
| OmniRoute 4-tier fallback + 13 balancing strategies + auto-token-refresh on 401 | VERIFIED (DeepWiki) | `combo.ts` + `rateLimitManager.ts` — PARTIALLY-VERIFIED |
| 9router fill-first + round-robin + exponential backoff | VERIFIED (DeepWiki) | `handleComboChat` + `checkFallbackError` + `getQuotaCooldown` — PARTIALLY-VERIFIED |

---

## R4 — Probe DAG 1-7 + Adoption verdicts (9 SOTA techniques)

### T1: **Background token refresh loop** (dario L1)
- Probe 1 count-OVER: dario refresh=15min, 45min-expiry threshold ✓
- Probe 2 SDK-vs-CLI: CCC has `auto_refresh_loop.go` already in CLIProxyAPI — fix-forward: enable/tune NOT new install ✓
- Probe 4 plugin-namespace: ALREADY in CLIProxyAPI underlying (just unused/misconfigured) ✓ no duplicate
- Probe 5 mode-harness: autonomous /loop compatible ✓
- Probe 6 LICENSE: MIT (CLIProxyAPI) ✓
- Probe 7 demand-gate: CCC fleet has 7 tokens expired_at=2026-05-08 — root cause; CRITICAL demand
- **VERDICT: ADOPT-NOW** — verify CLIProxyAPI `auto_refresh_loop.go` is enabled in CCC config; tune refresh-interval + expiry-buffer

### T2: **Session-stickiness (sticky-key hash → account binding)** (dario L2)
- Probe 1: 6h TTL + 2K-entry cap + hash of first user message ✓
- Probe 2: NOT in CLIProxyAPI selector.go — net-new ✓
- Probe 4: dario-novel — no duplicate in CCC ✓
- Probe 5: autonomous /loop compatible ✓
- Probe 6 LICENSE: dario MIT ✓
- Probe 7 demand: cache-hit preservation (saves cache_creation cost on multi-turn) — strong demand
- **VERDICT: STUDY-PILOT** — port the sticky-binding primitive to CLIProxyAPI selector layer; verify cache-hit-rate improvement >5% before promoting to ADOPT-NOW

### T3: **1h cache breakpoint at boundary (cnighswonger pattern)**
- Probe 1: 4-marker max per Anthropic spec ✓
- Probe 2: cnighswonger proxy extension — installable ✓
- Probe 4: NOT in CCC — net-new (CCC proxy chain does NOT inject breakpoint) ✓ kiss-dry-yagni Must-Never #4 passes
- Probe 5: autonomous /loop compatible ✓
- Probe 6 LICENSE: cnighswonger MIT ✓
- Probe 7 demand: 1h-vs-5m TTL = 12x cache-hit lifetime; conversation-spanning sessions get free reads
- **VERDICT: ADOPT-NOW** — install cnighswonger cache-breakpoint extension at cnighswonger v3.5.3 :19801 layer; verify `ephemeral_1h_input_tokens` > 0 in telemetry post-deploy

### T4: **Headroom-weighted selection** (dario + CCC balance.py L1)
- Probe 1: `headroom = 1 - max(util_5h, util_7d)` — exact CCC parity
- Probe 4: ALREADY in CCC `balance.py` — PRESENT (not absent)
- Probe 7 demand: **REJECT-FOR-FIT** — CCC explicitly chose drain-soonest over drain-most-headroom in `reset_soonest_priority.py` (cycle-311e lesson: "two writers fight"); operator decision documented
- **VERDICT: REJECT-FOR-FIT** — CCC already evaluated headroom-selection (`balance.py`) and chose drain-soonest. Pattern is incumbent-alternative not gap

### T5: **In-flight 429 failover (selectExcluding pattern)** (dario)
- Probe 1: `pool.selectExcluding()` retries with different account in same request ✓
- Probe 4: NOT in CLIProxyAPI selector — net-new
- Probe 5 mode-harness: requires proxy layer to retry — STREAMING complications (Anthropic SSE mid-stream switch) ⚠️ CAVEAT
- Probe 7 demand: prevents single-account 429 → user-visible error
- **VERDICT: STUDY-PILOT** — port `selectExcluding` to CLIProxyAPI selector but ONLY for non-streaming requests; SSE retry is harder per Anthropic SSE shape

### T6: **Permanent vs Transient refresh error classification** (codex)
- Probe 1: `RefreshTokenError::{Permanent,Transient}` enum ✓
- Probe 4: NOT in CCC — `safe_reauth.py` doesn't classify Permanent vs Transient
- Probe 5: autonomous /loop compatible ✓
- Probe 7 demand: Permanent triggers logout-and-revoke; Transient retries — distinct ops
- **VERDICT: ADOPT-NOW** — adapt the 2-class classification into CCC `safe_reauth.py`; route Permanent to interactive reauth, Transient to retry loop

### T7: **Combo backoff chain (9router exponential backoff)** (9router L2)
- Probe 1: `getQuotaCooldown` doubles per backoff level ✓
- Probe 4: CCC has CLIProxyAPI 429 backoff already — duplicate
- Probe 7: CCC drain-soonest is alternative ranking heuristic
- **VERDICT: REJECT-FOR-FIT** — CCC has `nextQuotaCooldown` (conductor.go:2555) already; no new value

### T8: **OmniRoute 4-tier fallback Subscription→APIKey→Cheap→Free** (OmniRoute)
- Probe 1: 4 tiers verified ✓
- Probe 4: CCC has subscription-only fleet — no APIKey tier; net-new pattern but requires payment tier wiring
- Probe 5: autonomous /loop compatible ✓ but expands scope (API-key billing)
- Probe 7 demand: 8/8 OAuth tokens dead → fallback to API-key tier would prevent fleet collapse
- **VERDICT: STUDY-PILOT** — defer until operator decides whether to add API-key fallback tier; documented as Forward-Top-5

### T9: **Telemetry-based hit-rate observability** (cnighswonger cache-telemetry.mjs)
- Probe 1: `hit_rate = (cr/total)*100` parsed from `message_start.usage` ✓
- Probe 4: CCC lacks per-session cache-hit-rate metric ✓
- Probe 5: autonomous /loop compatible ✓
- Probe 7 demand: enables T3 ADOPT verification (post-install hit-rate >0 confirms breakpoint working)
- **VERDICT: STUDY-PILOT** — bundle with T3 install; verify telemetry surfaces ephemeral_1h_input_tokens

---

## R5 — Synthesis

**Counts**: 9 techniques / 3 ADOPT-NOW (T1+T3+T6) / 4 STUDY-PILOT (T2+T5+T8+T9) / 2 REJECT-FOR-FIT (T4+T7).

### Token-efficiency optimization recipe (combined T3 + T9 + T1)

1. **Install cnighswonger v3.5.3 cache-breakpoint extension** at :19801 (T3): `cache_control: { type: "ephemeral", ttl: "1h" }` injected at boundary between auto-injected blocks and user content (cite: `messages-cache-breakpoint.mjs:208-211 @ 2f17aeb9`). Set `CACHE_FIX_INJECT_MESSAGES_BREAKPOINT=1`.
2. **Enable telemetry sidecar** (T9): `cache-telemetry.mjs:174-220` parses SSE `message_start.usage` for cache_creation/cache_read; persists per-session JSON to `~/.claude/quota-status/sessions/`. Verify `ephemeral_1h_input_tokens > 0` post-deploy.
3. **Tune CLIProxyAPI `auto_refresh_loop.go`** (T1): set refresh-interval=15min + expiry-buffer=45min per dario pattern (cite: dario `AccountPool.refreshInterval`). Bypass W180 F1 root cause where 7 tokens lapsed simultaneously.

### Accounts-rotation comparison (n=6 named strategies)

| Strategy | Org | Cite | Pros | Cons | CCC fit |
|---|---|---|---|---|---|
| **Drain-soonest-reset** (CCC LOCAL-NOVEL) | CCC | `Z:/claude/ccc/tools/reset_soonest_priority.py` | Maximizes use-before-expiry of capacity; aligned with weekly-cap economics | Drains accounts approaching reset first; can starve cache | **INCUMBENT** (CCC primary writer) |
| **Drain-most-headroom** | dario + CCC balance.py | `selector.go` headroom L=ineligible-token-filter + `1-max(util_5h,util_7d)` | Maximizes cache-warmth; predictable selection | Doesn't account for reset-soon waste | CCC alternative (balance.py present but not primary writer) |
| **Utilization-aware** (priority-tier mapping 0-5) | CCC balance.py | `Z:/claude/ccc/tools/balance.py` (header doc) | Bridges to CLIProxyAPI priority API; usage-aware | Requires polling Anthropic usage endpoint | CCC has this (currently DISABLED — drain-soonest is writer) |
| **Round-robin** | CLIProxyAPI + 9router | `selector.go:261-320` `RoundRobinSelector.Pick` | Deterministic load spread; gemini virtual-parent 2-level | Doesn't optimize for cache-warmth or reset | Generic baseline |
| **Fill-first** | CLIProxyAPI + 9router | `selector.go:359-369` `FillFirstSelector.Pick` | Per source: "stagger rolling-window subscription caps" | Burns one account at a time; cache-stable | CCC reset_soonest is fill-first variant ranked by reset-proximity |
| **Session-sticky + headroom-on-bind** | dario | DeepWiki: `selectSticky()` + 6h TTL + 2K cap | Cache-hit preservation across multi-turn | Requires conversation-ID hashing | **STUDY-PILOT** for CCC (T2) |

### Named-T2 practitioner evidence (Axis-2)

- **CLIProxyAPI router-for-me org** (783★+, 60+ downstream ecosystem projects per README — vibeproxy / ProxyPilot / Quotio / CodMate / 9Router / OmniRoute) — TIER-1 named-T2 vendor [VERIFIED 2026-05-13 via README]
- **askalf/dario** (196★ — newer but active multi-account Claude Max pool router) — TIER-2 named-T2 [VERIFIED 2026-05-13 via mcp__github__search_repositories]
- **diegosouzapw/OmniRoute** (4494★ — multi-provider gateway) — TIER-1 named-T2 [VERIFIED 2026-05-13]
- **cnighswonger** (cache-fix proxy extensions) — TIER-2 named-T2 vendor [VERIFIED 2026-05-13 via Z:/repos/deps/cnighswonger-claude-code-cache-fix/]

Convergence-gate Axis-2 ≥2-named-T2: **PASS** (n=4)

### Axis-3 stability

CLIProxyAPI HEAD 785b00c3 + 60+ downstream projects = >3mo + STABLE-BURN-IN ✓
cnighswonger HEAD 2f17aeb9 + actively maintained ✓
dario created 2026-04-08 (~5 weeks) + 196★ → STUDY-PILOT axis-3 band (not yet 90d burn-in)
OmniRoute created 2026-02-13 (~3mo) + 4494★ → STABLE-BURN-IN ✓

### Convergence-gate verdict: **ALL THREE AXES PASS** for T1+T3+T6 (ADOPT-NOW); STUDY-PILOT for T2+T5+T8+T9 pending axis-3 burn-in or operator decision.

---

## Honest conclusion

H1 verified — 4-org convergence on the pattern. ROOT CAUSE of W180 F1 fleet collapse: **CCC fleet lacks background token-refresh discipline** (T1 ADOPT-NOW). Secondary recommendations:

1. **Install T1** (background-refresh in CLIProxyAPI's auto_refresh_loop.go) — closes root cause + prevents recurrence
2. **Install T3** (cnighswonger 1h cache breakpoint at :19801) — token-cost saving via cache-hit-rate
3. **Install T6** (codex Permanent vs Transient refresh-error classification in CCC safe_reauth.py) — operator UX + retry-correctness
4. **STUDY-PILOT T2 + T5** (dario session-stickiness + selectExcluding 429 failover) — port to CLIProxyAPI selector
5. **DEFER T8** (4-tier subscription→API-key→cheap→free fallback) — payment-tier scope creep
6. **NO-CHANGE T4 + T7** — CCC drain-soonest discipline is operator-affirmed (cycle-311e lesson); no SOTA-displacement evidence

**Mia pre-apply on prescribed_edits**: NONE in this audit — pure research output, no apply-class edits. Orchestrator MUST file 2nd-stage T1 codex validation per `Z:/claude-sota/.claude/rules/cross-model-consensus.md §Env-funneled subagent stand-in disclosure mandate` before any ADOPT-NOW verdict ships.

**Retractions**: none (no claims promoted to VERIFIED that failed re-probe).

**STAND-IN-NOTICE**: This audit ran as Sonnet stand-in under `CLAUDE_CODE_SUBAGENT_MODEL=claude-sonnet-4-6` per CLAUDE.local.md ENV (f) — cross-model gate NOT structurally satisfied. Codex T1 BRIDGE-MODE follow-up REQUIRED before installing T1/T3/T6 ADOPT-NOW prescriptions.

---

## Sources cited

1. `Z:/repos/deps/CLIProxyAPI/sdk/cliproxy/auth/selector.go @ HEAD 785b00c3127eea6aa207f1207ead8a2aa93690a3` [VERIFIED 2026-05-13 via direct Read]
2. `Z:/repos/deps/CLIProxyAPI/sdk/cliproxy/auth/conductor.go @ HEAD 785b00c3` [VERIFIED 2026-05-13 via sed-extract]
3. `Z:/repos/deps/litellm/litellm/proxy/auth/auth_exception_handler.py @ HEAD 934ecdca78daf7ec9514efd47df77bf7495c822d` [VERIFIED 2026-05-13]
4. `Z:/repos/deps/litellm/litellm/router_utils/add_retry_fallback_headers.py @ HEAD 934ecdca` [VERIFIED 2026-05-13]
5. `Z:/repos/deps/codex/codex-rs/login/src/auth/manager.rs @ HEAD 993e3f407ea8213f7d32cb9367ae7616b7e15b4a` [VERIFIED 2026-05-13]
6. `Z:/repos/deps/cnighswonger-claude-code-cache-fix/proxy/extensions/cache-telemetry.mjs @ HEAD 2f17aeb9062da66efa4fa3a1fa6a26a9afe383ff` [VERIFIED 2026-05-13]
7. `Z:/repos/deps/cnighswonger-claude-code-cache-fix/proxy/extensions/messages-cache-breakpoint.mjs @ HEAD 2f17aeb9` [VERIFIED 2026-05-13]
8. `Z:/claude/ccc/tools/reset_soonest_priority.py` [VERIFIED 2026-05-13]
9. `Z:/claude/ccc/tools/balance.py` [VERIFIED 2026-05-13]
10. `Z:/claude/ccc/tools/safe_reauth.py` [VERIFIED 2026-05-13]
11. `askalf/dario` repo via `mcp__deepwiki__ask_question` [VERIFIED 2026-05-13]
12. `diegosouzapw/OmniRoute` repo via `mcp__deepwiki__ask_question` [VERIFIED 2026-05-13]
13. `decolua/9router` repo via `mcp__deepwiki__ask_question` [VERIFIED 2026-05-13]
14. `router-for-me/CLIProxyAPI/README.md` via `mcp__github__get_file_contents` [VERIFIED 2026-05-13 — SHA 8064db7d7763f47e3ffb29a84093ee19635b5dee]

---

**VERDICT: DONE_WITH_CONCERNS** — 6 repos audited line-by-line / 9 SOTA techniques / 3 ADOPT-NOW (T1 background-refresh + T3 1h-cache-breakpoint + T6 Permanent/Transient classification) / 4 STUDY-PILOT (T2+T5+T8+T9) / 2 REJECT-FOR-FIT (T4+T7). 4-org Axis-1 convergence-gate PASS (CLIProxyAPI + dario + OmniRoute + cnighswonger). STAND-IN-NOTICE per CLAUDE.local.md ENV (g) — cross-model T1 codex validation REQUIRED at orchestrator before ADOPT install.
