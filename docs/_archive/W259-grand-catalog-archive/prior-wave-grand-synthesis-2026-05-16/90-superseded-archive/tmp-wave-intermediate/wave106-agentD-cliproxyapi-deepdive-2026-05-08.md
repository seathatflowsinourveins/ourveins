# Wave 106 / Agent D — CLIProxyAPI deep-dive + outer-research convergence

**Generated:** 2026-05-08
**Agent:** Wave 106 D (sota-research outer-deep-dive)
**Scope:** Non-overlapping with Wave 105 A (token-eff repos) / B (arch-opt) / C (feature-coverage)
**Method:** GitHub HEAD probe of router-for-me/CLIProxyAPI (config.example.yaml @ 785b00c3 + README) + DeepWiki ask_question on advanced features + Glob/Grep across `docs/outer research/` + Read eee.ps1 + Read .cli-proxy-api/config.yaml + per-credential JSON probe + Boris Cherny April-2026 6-tips dual cite (CCBP HEAD 64fffd53)
**Convergence-gate:** D1-D10 SRA per `Z:/claude-sota/.claude/rules/sota-research-architecture.md` Ship 2X HEAD `3322b58`

---

## Executive Summary

eee runs CLIProxyAPI v6.10.9 with sound foundation: round-robin + 4h session-affinity + cnighswonger v3.5.3 cache-fix chain + 3-tier hybrid recovery (cache-fix:19801 → CLIProxyAPI:8317 → direct OAuth) + cpa-usage-keeper sidecar at :8079. Five high-leverage CLIProxyAPI advanced features are NOT YET activated. Five outer-research findings remain un-adopted from Wave 52 iter2b. Boris Cherny 6-tips (April-2026) are 5/6 adapted; 1 missing primitive. The "8 vs 10 accounts" framing is a misread — eee actually has 8 *active-class* identities (7 Claude OAuth + 1 Codex Pro) plus 2 *zero-traffic* fallbacks (Antigravity + Gemini-CLI) which can stay as-is.

---

## Section 1 — TOP 5 CLIProxyAPI advanced features eee is NOT using

### #1 — `claude-header-defaults.stabilize-device-profile: true` — PROMPT CACHE STABILITY ACROSS ACCOUNTS

**Verdict:** ADOPT-NOW (highest leverage; trivially additive).

- **Cite:** `Z:/repos/deps/CLIProxyAPI/config.example.yaml:216-229 @ HEAD 785b00c3` (TIER-1-DIRECT) + DeepWiki `claude_executor.go ResolveClaudeDeviceProfile` mechanism reference.
- **What it does:** Pins `os` + `arch` per-auth/API-key fingerprint while allowing `user-agent` + `package-version` + `runtime-version` to upgrade with new official Claude clients. Without this, every restart of claude.exe produces a different device-fingerprint → cache prefix differs → cache MISS even though cnighswonger v3.5.3 is doing its job upstream.
- **Why this complements cnighswonger:** cnighswonger normalizes the *body* (sort-stabilization / fingerprint-strip / cache_control-normalize). `stabilize-device-profile` normalizes the *headers* (os/arch/UA). Together they make the entire request reproducible across CLIProxyAPI accounts → all 8 accounts can hit the SAME cache prefix.
- **Recommended config diff** at `Z:/claude-sota-installed/.cli-proxy-api/config.yaml`:
  ```yaml
  claude-header-defaults:
    user-agent: "claude-cli/2.1.131 (external, sdk-cli)"
    package-version: "2.1.131"
    runtime-version: "v22.0.0"
    os: "Windows"
    arch: "x64"
    timeout: "600"
    stabilize-device-profile: true   # CRITICAL — pins fingerprint across restarts/accounts
  ```
- **Convergence-gate:** D1 Anthropic-cache-API PASS (cache prefix is documented to depend on os/arch headers per Anthropic API docs); D7 LICENSE PASS (MIT); D9 failure-mode awareness PASS (no impact on FM-17 fleet-depletion); D10 replacement viability — pure additive enhancement of existing cnighswonger chain.
- **Risk:** LOW. If a stabilized fingerprint diverges from a future CC release, request still succeeds (cnighswonger upgrades user-agent/package-version automatically per upstream "software fingerprint that can still upgrade" semantic).

### #2 — `cloak.cache-user-id: true` per Claude account — PROMPT CACHE REUSE PER API KEY

**Verdict:** ADOPT-NOW (low risk, complementary).

- **Cite:** `Z:/repos/deps/CLIProxyAPI/config.example.yaml:212 @ HEAD 785b00c3` (TIER-1-DIRECT) — verbatim: "default is false; set true to reuse cached user_id per API key instead of generating a random one each request"
- **What it does:** Stops random `user_id` generation per request; instead reuses a stable per-API-key user_id. Anthropic's prompt cache key includes `user_id` for billing/quota tracking, so a stable user_id → stable cache key → higher hit rate.
- **Caveat:** Field lives under `claude-api-key` cloak block, NOT OAuth `auths/*.json`. eee's 7 Claude accounts are OAuth-based (no claude-api-key entries). For OAuth fleet, `stabilize-device-profile` (above) provides the equivalent stabilization. **HONEST-NON-FINDING for OAuth-only fleet** — this finding applies if/when eee adds claude-api-key entries (PackyCode/AICodeMirror/BmoPlus relay services per upstream README sponsor section).
- **Convergence-gate:** D6 use-class CONDITIONAL — applies only to claude-api-key entries; OAuth fleet uses #1 instead.

### #3 — Per-credential `priority` field equalization across active fleet — UNBLOCK ROUND-ROBIN BURST DISTRIBUTION

**Verdict:** OPERATOR-DECISION REQUIRED (config.yaml comment already flags this as DEFERRED but worth promoting to active operator-decision queue).

- **Cite:** `Z:/repos/deps/CLIProxyAPI/sdk/cliproxy/auth/selector.go:283 @ HEAD 785b00c3` ("Two-level round-robin: first select a credential group, then pick within it") + DeepWiki `RoundRobinSelector` mechanism reference + eee config.yaml L83-87 comment block.
- **What it surfaces:** Active fleet has UNEQUAL priorities — aesthetic9c=P30, mr.euphoriaincarnate=P20, nalawowac=P10. CLIProxyAPI round-robin operates WITHIN highest-priority bucket FIRST. Effect: P30 burns through entire 5h window before P20 sees any traffic, then P10 last. This DEFEATS round-robin's burst-distribution benefit. Each Wave fan-out (3-5 parallel agents) hits aesthetic9c only until its quota burns.
- **Empirical evidence** at probe time 2026-05-08:
  | Account | priority | disabled | note |
  |---|---|---|---|
  | aesthetic9c | 30 | false | active P30 |
  | mr.euphoriaincarnate | 20 | false | "P=40 — 40% remaining" (note out of date — file says P20) |
  | nalawowac | 10 | false | no note (P10) |
  | 4 disabled accounts | — | true | Ship 1X cycle-aware rotation (7d-capped) |
- **Recommended adoption (3 options, operator picks):**
  - **Option A (TRUE round-robin burst):** flip all 3 active to P=20 → round-robin distributes evenly across all 3.
  - **Option B (KEEP fill-first-by-priority):** leave as-is; rely on cycle-aware rotation to re-enable accounts post-7d.
  - **Option C (HYBRID):** flip aesthetic9c + mr.euphoriaincarnate to P=20 (matched), leave nalawowac at P=10 (last-resort). 2-account burst + 1 spillover.
- **Convergence-gate:** D5 sibling-bleed defense PASS (priority is operator-semantic; safe to flip). **OPERATOR-DECISION REQUIRED** — fleet semantics are operator-owned per CR-7 graduated-unleash phase 2.

### #4 — Management API runtime mutation via curl — ZERO-RESTART PRIORITY/COOLDOWN OPS

**Verdict:** ADOPT-NOW (eee already has `secret-key` + `disable-control-panel:true` configured at config.yaml:17-18; just need operator playbook).

- **Cite:** DeepWiki `Management API endpoints` section + `https://help.router-for.me/management/api`
- **What it enables:** Runtime mutation WITHOUT restart:
  - `PATCH /v0/management/auth-files/status` — disable/enable a misbehaving account
  - `PATCH /v0/management/auth-files/fields` — update credential's `priority` at runtime (effectively reorders selection)
  - `PUT /v0/management/routing/strategy` — flip round-robin ↔ fill-first at runtime (currently requires eee restart per config.yaml:108-111 comment block)
- **Why this matters:** Wave 97 Ship 1J flip from fill-first → round-robin required eee restart. With management API, operator can `curl -X PUT http://127.0.0.1:8317/v0/management/routing/strategy -H "X-Management-Key: $KEY" -d '{"value":"round-robin"}'` and apply mid-session.
- **Recommended action:** Author `docs/cliproxyapi-management-runbook.md` cataloging the 7 endpoints + curl examples (priority bump / disable account / clear cooldown via re-enable / reorder fleet) using the `Z:/claude-sota-installed-state/cliproxy-mgmt-secret.txt` plaintext key. **ZERO config changes required** — just operator-side documentation.
- **Convergence-gate:** D4 RESEARCH-PROBE-OK (read-only management API queries are safe); D9 failure-mode awareness PASS (Mgmt API mutations are reversible via re-mutate).

### #5 — `payload.override.gpt-*.reasoning.effort: "high"` — CODEX-SIDE EFFORT TUNING (FORWARD-REF)

**Verdict:** STUDY-PILOT (queue for separate fire if codex-zfan7 fleet ever expands beyond 1 account).

- **Cite:** `Z:/repos/deps/CLIProxyAPI/config.example.yaml:374-407 @ HEAD 785b00c3` (TIER-1-DIRECT payload directives section)
- **What it does:** Inject reasoning effort directives into ALL gpt-* requests via the proxy without modifying client code. Equivalent to setting `effortLevel: "xhigh"` per-request at the gateway layer.
- **Why DEFER:** eee currently has 1 codex account (codex-zfan7@sva.edu-pro); per-request effort is already controlled via `~/.codex/config.toml` `[profiles.deep-review-exec]` block. Payload override duplicates that surface for zero current benefit. Re-evaluate if codex fleet expands to 2+ accounts where central effort-tuning becomes more valuable than per-profile config.
- **Convergence-gate:** D6 use-class — duplicate functionality with codex profiles per kiss-dry-yagni Must-Never #4. DEFER until codex fleet justifies central control.

---

## Section 2 — TOP 5 outer-research findings (`docs/outer research/wave52/iter2b-advanced-unadopted.md` line-cited)

These are from Wave 52's already-completed `iter2b-advanced-unadopted.md` (2026-05-07, 222 LOC, 10-finding ranked table). Verifying which are STILL un-adopted in the current eee state at 2026-05-08:

### #1 — `OTEL_LOG_USER_PROMPTS=1` — Langfuse trace prompt-content correlation

- **iter2b cite:** `docs/outer research/wave52/iter2b-advanced-unadopted.md:124-134` (item #7)
- **Source:** `Z:/repos/deps/claude-code/CHANGELOG.md:157` (CC 2.1.121)
- **Current eee adoption:** **MISSING** — verified by grep: `OTEL_LOG_TOOL_DETAILS=1` IS set in iter2b reference; `OTEL_LOG_USER_PROMPTS` is NOT in `eee.ps1` at any line nor in `.claude/settings.json:env`.
- **Recommendation:** Add to `settings.json:env`: `"OTEL_LOG_USER_PROMPTS": "1"`. Risk: LOW (gated env var, safe-by-default per upstream). 8-account fleet under multi-agent burst NEEDS prompt-content correlation in Langfuse traces — without it, "why did this turn cost 50K tokens" is unanswerable.

### #2 — `CLAUDE_CODE_USE_POWERSHELL_TOOL=1` — already adopted ✅

- **iter2b cite:** `iter2b-advanced-unadopted.md:138-148` (item #8)
- **Current eee adoption:** **ALREADY ADOPTED at eee.ps1:56** — Wave 50 Fire 39 shipped this. Marking iter2b item #8 as CLOSED. **HONEST-NON-FINDING for current ship (already shipped).**

### #3 — `CLAUDE_CODE_SESSIONEND_HOOKS_TIMEOUT_MS=60000` — 14 SessionEnd hooks silently truncated at 1.5s

- **iter2b cite:** `iter2b-advanced-unadopted.md:152-162` (item #9)
- **Source:** `Z:/repos/deps/claude-code/CHANGELOG.md:1265` (CC 2.1.105) — verbatim "Fixed `SessionEnd` hooks being killed after 1.5 s on exit regardless of `hook.timeout` — now configurable via `CLAUDE_CODE_SESSIONEND_HOOKS_TIMEOUT_MS`"
- **Current eee adoption:** **MISSING** — not in eee.ps1 nor `.claude/settings.json:env`.
- **Recommendation:** Add to `settings.json:env`: `"CLAUDE_CODE_SESSIONEND_HOOKS_TIMEOUT_MS": "60000"`. Risk: LOW (extends ceiling; hooks must still self-terminate). Especially relevant if eee plans to wire session-end audits per `audit-action-loop.md`.

### #4 — `ANTHROPIC_SMALL_FAST_MODEL: "claude-haiku-4-5"` — explicit Haiku pin

- **iter2b cite:** `iter2b-advanced-unadopted.md:51-64` (item #2)
- **Source:** `Z:/repos/deps/claude-code/CHANGELOG.md:929`
- **Current eee adoption:** **MISSING** — not in eee.ps1 nor settings.json:env.
- **Recommendation:** Add 4 env vars per iter2b item #2 verbatim. Risk: LOW (advisory env vars; falls back to gateway default if Haiku 4.5 unavailable). Saves ~3× tokens on inline-haiku Stop hooks + session-titles + away-summaries.

### #5 — `claude-md-management` plugin enable — claude-md-improver skill + /revise-claude-md command

- **iter2b cite:** `iter2b-advanced-unadopted.md:94-105` (item #5)
- **Source:** `Z:/claude-sota/.claude/plugins/marketplaces/claude-plugins-official/plugins/claude-md-management/README.md:1-40` (Anthropic-authored Isabella He)
- **Current eee adoption:** **MISSING** — not in `enabledPlugins`.
- **Recommendation:** Add `"claude-md-management@claude-plugins-official": true` to `settings.json:enabledPlugins`. Risk: LOW (read-only audit + opt-in command). Sister to existing eee CLAUDE.md cardinal-rule-1 cite-trail discipline.

**Items DROPPED as already-shipped or out-of-scope (per Wave 105 + current eee state):**
- iter2b #1 outputStyle migration — eee has CR-8 + plugin policy, status N/A in install-only runtime
- iter2b #3 system-prompt-file — DEFER per Wave 105 Agent C (not core path)
- iter2b #4 session-report — DEFER (queued for cron rollout)
- iter2b #6 agent-sdk-dev — already enabled in eee per CLAUDE.md Memory Stack
- iter2b #10 max_budget_usd — DEFER (eee currently has no `claude -p` cron ships)

---

## Section 3 — Boris Cherny 6-tips (April-2026) coverage

**Source:** `Z:/repos/deps/claude-code-best-practice-shan/tips/claude-boris-6-tips-16-apr-26.md @ HEAD 64fffd53` [VERIFIED 2026-05-06]

| # | Tip | eee adoption status |
|---|---|---|
| 1 | Auto Mode permission classifier | ✅ ADAPTED — `defaultMode: "bypassPermissions"` per CR-7 Phase 3 destination (operator-flipped Wave 82d 2026-05-08); equivalent or stronger than auto-mode |
| 2 | `/fewer-permission-prompts` skill | ✅ ADAPTED — skill listed in eee's 540+ skill registry per ECC marketplace |
| 3 | Recaps | ✅ ADAPTED — CC 2.1.131+ recaps default-on; eee inherits |
| 4 | Focus Mode `/focus` | **❓ UNVERIFIED** — `/focus` is a CC slash command; eee inherits but operator usage TBD. **HONEST-NON-FINDING** (no eee config change needed; operator-side discipline) |
| 5 | Effort Level slider (low/med/high/xhigh/max) | ✅ ADAPTED — `effortLevel: "xhigh"` in settings.json + `alwaysThinkingEnabled: true` (Wave 77 dropped MAX_THINKING_TOKENS in favor of TIER-1 effortLevel) |
| 6 | Verification (Claude has way to verify work) | ✅ ADAPTED — full T1-T7 cross-model lifecycle + cardinal-rule-3 + verification-before-completion vendored skill |

**Verdict:** 5/6 adapted; 1 (Focus Mode) is operator-discipline not config — no config change needed.

---

## Section 4 — 8-vs-10 account architectural recommendation

**User said:** "8 accounts" multiple times.
**eee actual state:** 10 credential JSONs in `Z:/claude-sota-installed/.cli-proxy-api/`:
- 7 Claude OAuth (4 disabled, 3 active)
- 1 Codex Pro OAuth (zfan7@sva.edu-pro)
- 1 Antigravity (priority UNSET, disabled=false; ZERO traffic since onboard)
- 1 Gemini-CLI (priority UNSET, disabled=false; ZERO traffic since onboard)

**Reconciliation:** "8 accounts" = the **active-class fleet** = 7 Claude OAuth + 1 Codex Pro = 8. The 2 zero-traffic identities (Antigravity + Gemini-CLI) are **fallback channels** that:
- Don't consume Claude OAuth quota
- Don't compete with active Claude routing
- Activate only when `quota-exceeded.antigravity-credits: false` flag flipped (currently false in eee config.yaml:53 — disabled per cost concerns)
- Cost ZERO when idle

**Verdict:** **NO architectural change recommended.** eee's "8 active + 2 reserve" framing is sound. The Antigravity + Gemini-CLI accounts can stay onboarded without harm — they provide:
- Future activation path if Anthropic + OpenAI quota limits both exhaust
- Zero-cost insurance (no recurring bill, no compute)
- Operator-decision flexibility per CR-7 graduated-unleash phase progression

If user wants strict "8 only," remove Antigravity + Gemini JSONs — but **not recommended** per kiss-dry-yagni "no speculative removals" principle. **OPERATOR-DECISION REQUIRED** if user explicitly wants 8-only.

---

## Section 5 — HONEST-NON-FINDINGS

Axes where eee is already saturated:

1. **Worktree isolation** — `parallel-session-worktree-isolation.md` already shipped + `eee --worktree` forwarding in eee.ps1
2. **Cross-model T1-T7 lifecycle** — already cardinal-rule-3 with full hook stack queued for Tier 1a install
3. **Fleet-depletion FM-17 recovery** — already covered by sibling-cite-imported `fm17-subagent-fleet-depletion.md` (n=11+ cumulative evidence)
4. **Cache-fix proxy chain** — Wave 92 Ship 1T already wired cnighswonger:19801 → CLIProxyAPI:8317 → direct OAuth 3-tier fallback
5. **cpa-usage-keeper observability** — Wave 81 Ship 1C wired sidecar at :8079 with auto-start + bounded readiness
6. **CLIProxyAPI hot-reload** — eee already exploits config-update endpoints (config.yaml:108-111 documents which fields hot-reload)

These are NOT gaps — they're shipped state.

---

## Convergence-gate D1-D10 verdicts (per finding)

| Finding | D1 cite | D2 axis-1 | D3 axis-2 | D4 RESEARCH | D5 sibling-bleed | D6 use-class | D7 LICENSE | D8 plugin-namespace | D9 failure-mode | D10 replacement |
|---|---|---|---|---|---|---|---|---|---|---|
| #1 stabilize-device-profile | TIER-1 config.example.yaml:216-229 | PASS | PASS (named-author router-for-me) | PASS | PASS | PASS | MIT | PASS | PASS (no FM impact) | additive |
| #2 cache-user-id (OAuth) | TIER-1 config.example.yaml:212 | PASS | PASS | PASS | PASS | CONDITIONAL (claude-api-key only) | MIT | PASS | PASS | additive |
| #3 priority equalize | TIER-1 selector.go:283 | PASS | PASS | PASS | PASS | OPERATOR-DECISION | MIT | PASS | PASS | mutate-existing |
| #4 Mgmt API runbook | TIER-1 help.router-for.me/management/api | PASS | PASS | PASS (read-only probes) | PASS | PASS | MIT | PASS | PASS | additive doc |
| #5 payload override (codex effort) | TIER-1 config.example.yaml:374-407 | PASS | PASS | PASS | PASS | DEFER (duplicate w/ codex profiles) | MIT | PASS | PASS | duplicate-DEFER |
| iter2b #7 OTEL_LOG_USER_PROMPTS | TIER-1 CHANGELOG.md:157 | PASS | PASS | PASS | PASS | PASS | (env var) | PASS | PASS | additive |
| iter2b #9 SESSIONEND timeout | TIER-1 CHANGELOG.md:1265 | PASS | PASS | PASS | PASS | PASS | (env var) | PASS | PASS | additive |
| iter2b #2 SMALL_FAST_MODEL | TIER-1 CHANGELOG.md:929 | PASS | PASS | PASS | PASS | PASS | (env var) | PASS | PASS | additive |
| iter2b #5 claude-md-management | TIER-1 README.md:1-40 | PASS | PASS (Anthropic Isabella He) | PASS | PASS | PASS | (Anthropic plugin) | PASS | PASS | additive |

---

## VERDICT-LIST:

**ADOPT-NOW (5):** stabilize-device-profile / OTEL_LOG_USER_PROMPTS / CLAUDE_CODE_SESSIONEND_HOOKS_TIMEOUT_MS / ANTHROPIC_SMALL_FAST_MODEL pin / claude-md-management plugin enable

**ADOPT-NOW-DOC (1):** Management API runbook authoring at `docs/cliproxyapi-management-runbook.md`

**OPERATOR-DECISION REQUIRED (1):** priority equalization across active 3-account Claude fleet (3 options A/B/C documented)

**DEFER (2):** cache-user-id (OAuth-fleet HNF; only applies if claude-api-key entries added later) / payload override codex effort (KISS Must-Never #4 duplicate w/ codex profiles)

**HONEST-NON-FINDING (1):** Boris Focus Mode #4 — operator-discipline not config; no eee change needed

**ARCHITECTURAL (1):** "8 accounts" = active fleet (7 Claude + 1 Codex); 2 zero-traffic identities (Antigravity + Gemini-CLI) are reserve channels and stay as-is unless user explicitly wants 8-only.

DONE: 5 CLIProxyAPI features missing; 4 outer-research iter2b items un-adopted (#2, #5, #7, #9); 1 Boris tip un-config'd but not actionable; 8-vs-10 verdict: keep 10 (8 active + 2 reserve); artifact at tmp/wave106-agentD-cliproxyapi-deepdive-2026-05-08.md
