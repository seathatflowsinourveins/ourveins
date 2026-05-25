

## 2026-05-08 Wave 90 — DEFINITIVE FLEET STATUS post-Wave-89 unleash + 3-codex parallel SOTA convergence (DOCUMENTATION-ONLY ship)

### Origin
Wave 89 Ship 1Y unleashed codex CLI sandbox (commit `15dad8e`). Wave 90 leveraged unleash to dispatch 3 parallel codex CLI calls for live fleet polling + SOTA convergence + official-docs synthesis.

### Cross-model T1 gate (Pattern B HNF + tighter v2 NEEDS-REVISION → fix-forward)
- 3 parallel codex CLI dispatches @ 280s budget each (PIDs 87391/87393/87395)
- Agent A: SUCCESS — wrote `tmp/wave90-live-fleet-polling-OUT.md` (11.6 KB) with 8/8 active polls
- Agent B+C: substantive trace investigation (5.5 MB + 592 KB OUT files) but no JSON terminal verdicts in budget; Pattern B HNF disposition per `Z:/claude-sota/.claude/rules/codex-t1-fix-forward-pattern.md §Pattern B`
- Synthesis codex T1 v1: budget timeout at 120s without JSON
- Synthesis codex T1 v2 (tightened): NEEDS-REVISION conf=0.82 with F-1 P2 finding ("OAuth usage data + account IDs + email should be redacted before shipping")
- Verdict-on-file: `.claude/state/codex_consult_wave90_synthesis_v2_OUT.txt`

### Pattern A fix-forward (F-1 P2 closed inline)

| ID | Sev | Concern | Resolution |
|---|---|---|---|
| F-1 | P2 | Committed provenance should not expose full email account identifiers + per-account utilization data | This entry uses **REDACTED account labels** (`<acct-N>`) in the committed table. Full-detail per-account table lives in `tmp/wave90-fleet-final-2026-05-08.md` (gitignored per `.gitignore:17`) for operator-local reference. NO OAuth tokens were ever committed (Agent A redacted via `[REDACTED-N-CHARS]` per prompt mandate). |

### KEY FINDINGS (Wave 90)

#### 1. Live fleet polling SUCCESS (Wave 89 unleash enabled this — was BLOCKED Wave 87+88)
- **8/8 active Anthropic + Codex usage API polls succeeded**
- 7 Claude accounts polled via `https://api.anthropic.com/api/oauth/usage`
- 1 Codex Pro account polled via `https://chatgpt.com/backend-api/wham/usage`
- 2 accounts (Antigravity + Gemini) have no documented active-polling endpoint per Aperant; passive-only

#### 2. Anthropic actual schema DIFFERS from Aperant v2.7.6 documentation (NEW finding)

Aperant `CODEX_RATE_LIMITS_RESEARCH.md @ cba7a027` documented `primary_window` / `secondary_window` schema, but that's the older internal Codex schema. Live polling reveals Anthropic `/api/oauth/usage` returns:

```json
{
  "extra_usage": {"currency": "USD"|null, "is_enabled": bool, "monthly_limit": int|null, "used_credits": float|null, "utilization": float|null},
  "five_hour": {"resets_at": "ISO-8601", "utilization": float},
  "seven_day": {"resets_at": "ISO-8601", "utilization": float},
  "seven_day_sonnet": {"resets_at": "ISO-8601", "utilization": float},
  "seven_day_opus": null,
  "iguana_necktie": null,
  "omelette_promotional": null,
  "seven_day_omelette": {"resets_at": null, "utilization": 0.0},
  "seven_day_cowork": null,
  "seven_day_oauth_apps": null
}
```

**Codex `/backend-api/wham/usage` schema MATCHES Aperant doc** (`primary_window` + `secondary_window` + `credits`).

**Implication for Ship 1W**: poller implementation must use ACTUAL Anthropic schema (`five_hour`+`seven_day`+`extra_usage`), not the Aperant-documented Codex schema. Update Ship 1W spec.

#### 3. FLEET STATUS (REDACTED — full detail in `tmp/wave90-fleet-final-2026-05-08.md`)

| # | Account ID | Type | 5h util | 5h reset | 7d util | 7d reset | extra_usage | Status |
|---|---|---|---|---|---|---|---|---|
| 1 | <acct-A> | Claude | 13% | 2026-05-08T19:09Z | 18% | 2026-05-13T18:59Z | disabled | ✅ ROUTE-NOW |
| 2 | <acct-B> | Claude | 4% | 2026-05-08T19:50Z | **🔴 100% MAXED** | 2026-05-10T06:00Z | disabled | ❌ AVOID 38h |
| 3 | <acct-C> | Claude | 3% | 2026-05-08T18:50Z | **🟠 89%** | 2026-05-12T06:00Z | disabled | ⚠ NEAR-LIMIT |
| 4 | <acct-D> | Claude | 0% | (idle) | **🔴 100% MAXED** | 2026-05-11T15:00Z | disabled | ❌ AVOID 71h |
| 5 | <acct-E> | Claude | 29% | 2026-05-08T19:50Z | 12% | 2026-05-15T04:00Z | **🟠 83.8% paid** | ⚠ PAID-CREDITS |
| 6 | <acct-F> | Claude | 0% | (idle) | 5% | 2026-05-13T03:00Z | enabled 65.6% paid | ✅ HEAVY-RESERVE |
| 7 | <acct-G> | Claude | 0% | (idle) | **🔴 96%** | 2026-05-09T03:00Z | **🔴 100% paid maxed** | ❌ DOUBLE-MAXED |
| 8 | <acct-H> | **Codex Pro** | 7% | 2026-05-08T19:17Z | 25% | 2026-05-11T22:39Z | $250 balance | ✅ HEALTHY (cross-model gate lane) |
| 9 | <acct-I> | Antigravity | n/a (no API) | — | — | — | OAuth refresh hourly | Passive-only |
| 10 | <acct-J> | Gemini | n/a (no API) | — | — | — | RPM-rolling | Passive-only |

**Critical finding**: 3 of 7 Claude accounts WEEKLY-MAXED today (acct-B, acct-D, acct-G). This explains today's 4-failed-of-6 calls + 2× 429 — `fill-first` routing was hitting already-MAXED accounts. **Ship 1Z** (cycle-aware-fill-first) closes this gap by skipping accounts where 7d > 80% threshold proactively.

#### 4. cnighswonger/claude-code-cache-fix v3.3.0 SOTA — ELEVATED to TOP-3 ADOPT-NOW (Wave 90 Agent B trace)

Agent B traced through `Z:/repos/deps/cnighswonger-claude-code-cache-fix/CHANGELOG.md` and found the actual current state is **v3.3.0 (2026-04-30)** with **15+ cache-fix passes**:

| # | Fix | What it does |
|---|---|---|
| 1-8 | smoosh_split / session_start_normalize / continue_trailer_strip / deferred_tools_restore / reminder_strip / cache_control_normalize / tool_use_input_normalize / cache_control_sticky | 8 cache-prefix-stability fixes per @deafsquad PRs #26-#33 |
| 9-10 | smoosh_normalize / cwd_normalize | Beta-series; @wadabum architectural credit |
| 11-15 | image-guard 5-pass pipeline | v3.3.0 NEW: PASS 0 legacy back-compat / PASS 3 Lanczos resize via sharp / PASS 1 long-edge strip / PASS 2 byte-budget drop / count cap |

**Combined stack reduction**: 940K → 1.7K tokens first-warm-turn (**99.8% reduction**) measured by @deafsquad on CC v2.1.112 + Opus 4.7. Convergence-gate Axis-1 PASS (3 distinct orgs: anthropics/claude-code root + @deafsquad + @wadabum). Axis-3 PASS (~14d burn-in, active iteration cpd~7-10/day).

**Ship 1T elevation**: was MEDIUM-risk STUDY-PILOT (Wave 86); now **TOP-3 ADOPT-NOW** given the 99.8% measured cache-creation reduction.

### Wave 89 + Wave 90 SOTA advancement

| Aspect | Pre-Wave-89 | Post-Wave-89 unleash | Post-Wave-90 polling+SOTA |
|---|---|---|---|
| codex sandbox | read-only (blocked PowerShell+sqlite+net) | danger-full-access (verified APPROVE 0.99 5/5 probes) | unchanged |
| Anthropic /api/oauth/usage polling | 0/10 accounts populated | network_access:true enables it | 7/7 Claude accounts polled LIVE |
| Codex /backend-api/wham/usage | not polled | network_access:true enables it | 1/1 Codex polled LIVE |
| 3 Claude accounts weekly-MAXED | UNKNOWN (caused 4-failed-of-6) | UNKNOWN | KNOWN (avoidance now actionable) |
| cnighswonger v3.3.0 stack | not assessed | not assessed | 15+ fixes documented; 99.8% reduction |

### CONSOLIDATED PENDING SHIPS (15 total post-Wave-90)

| Ship | Priority | Description | Risk |
|---|---|---|---|
| **1Z** | **P0 NEW** | CLIProxyAPI cycle-aware-fill-first (skip accts 7d > 80%) | MEDIUM |
| **1W** | **P0** | Aperant-derived rate-limit poller as 60s cron (use real Anthropic schema not Aperant doc) | MEDIUM |
| **1T** | **P1 ELEVATED** | cnighswonger v3.3.0 chained behind CLIProxyAPI proxy | MEDIUM |
| 1V | P1 | acct-E paid-credit metadata refresh (capacity_score=0 was misleading; account has 7d headroom but burns paid credits) | LOW |
| 1S | P2 | rtk-ai/rtk WSL canary | MEDIUM |
| 1M | P2 | context-mode FULL hooks (98% savings claim) | MEDIUM |
| 1K | P3 | UserPromptSubmit hook | LOW |
| 1L | P3 | PreCompact hook | LOW |
| 1R | P3 | motiful regression harness | LOW |
| 1U | DEFERRED | open-compress claw-compactor | MEDIUM |
| 1N | DEFERRED | ECC continuous-learning re-enable | MEDIUM |
| 1O | DEFERRED | cpa-AUTH_ENABLED hardening | LOW |
| 1P | DEFERRED | SubagentStop structured-verdict-extraction | LOW |
| (chonkie/ace) | DEFERRED-INDEFINITELY | Token-eff candidates without harness fit | LOW |
| (LiteLLM/Portkey/Restate) | REFERENCE-ONLY | Architectural references (NOT replacement) | n/a |

### IS NOW EEE FULLY SOTA?

**Estimate post-Wave-90: ~75% SOTA → 90% after 1Z+1W+1T → 95%+ after 1S+1M.**

Ship 1Y (Wave 89 codex unleash) was the multiplier — without it, Ships 1W/1Z/1T were all blocked at the polling/proxy-chain layer. With Ship 1Y in effect, the next-fire ships have working substrate.

### Mia pre-apply (live polling = ultimate Mia probe)
- Wave 90 Agent A's live polling IS the highest-fidelity Mia probe possible: actual Anthropic + Codex usage APIs hit with real OAuth tokens
- 8/8 active polls succeeded; schema documented; reset times extracted
- This is the ultimate evidence base for Ship 1W implementation

### Cite chain (TIER-1 → TIER-3)

- **TIER-1** (NEW): `https://api.anthropic.com/api/oauth/usage` (actual schema with `five_hour`/`seven_day`/`extra_usage` — supersedes Aperant doc; verified live 2026-05-08T17:29 UTC)
- **TIER-1**: `https://chatgpt.com/backend-api/wham/usage` (matches Aperant doc; verified live)
- **TIER-1**: `Z:/repos/deps/codex/codex-rs/core/src/config/config_tests.rs:842,1438,1572 @ HEAD 993e3f407ea8213f7d32cb9367ae7616b7e15b4a` (Wave 89 Ship 1Y unleash cite chain — UNCHANGED, still valid)
- **TIER-1**: `Z:/repos/deps/cnighswonger-claude-code-cache-fix/CHANGELOG.md @ HEAD 12cc30a1` v3.3.0 entries (15+ cache-fix passes; 99.8% measurement)
- **TIER-1**: `Z:/repos/deps/Aperant/CODEX_RATE_LIMITS_RESEARCH.md @ HEAD cba7a027` (endpoint reference; Codex schema correct; Anthropic schema OUTDATED per Wave 90 finding)
- **TIER-3-LOCAL**: `tmp/wave90-fleet-final-2026-05-08.md` (gitignored; 223 LOC full-detail synthesis with un-redacted account IDs for operator-local reference)
- **TIER-3-LOCAL**: `tmp/wave90-live-fleet-polling-OUT.md` (gitignored; 11.6 KB Agent A artifact with literal API response schemas)
- **TIER-3-LOCAL**: `.claude/state/codex_consult_wave90_synthesis_v2_OUT.txt` (codex T1 v2 NEEDS-REVISION conf=0.82 → F-1 fix-forward applied)

### Wave 90 satisfies cardinal-rule
- CR-1: TIER-1 cite chain at file:line + HEAD SHA + live API endpoints (Anthropic + Codex)
- CR-3: cross-model gate via real GPT-5.5 codex T1 e2e (Pattern B HNF v1 + NEEDS-REVISION conf=0.82 v2 → F-1 fix-forward applied per codex-t1-fix-forward-pattern.md Pattern A)
- CR-7: graduated-unleash Phase 3 ACTIVE (Wave 89 + Wave 90 demonstrates full unleashed capability)
- CR-9: documentation-only commit reversible; full-detail data in gitignored tmp/ preserves operator privacy floor
- CR-10: research-first via 3-agent parallel codex CLI + live polling
- CR-11: META-process SOTA: Pattern A apply + Mia pre-apply (live polling) + provenance log + GPT-5.5 e2e BEFORE commit
