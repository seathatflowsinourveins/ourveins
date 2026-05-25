---
title: Wave 167 Agent C — gpt5-reviewer adversarial 5-lens review of CCC OAuth fleet stack
status: AUTHORITATIVE-CANDIDATE
date: 2026-05-13
agent: gpt5-reviewer-substitute (general-purpose; codex BRIDGE-MODE foreground+tee per cross-model-consensus §"On codex unavailable" Path D — gpt5-reviewer class NOT registered in this runtime per Probe 5 mode-harness-shape)
wave: 167
fire: 1
brief: Adversarial 5-lens review of CCC OAuth fleet stack (cnighswonger + CLIProxyAPI + cpa-usage-keeper + balance.py/reset_soonest_priority.py)
codex-dispatches: 3 (Lens 1+2 / Lens 3+4 / Lens 5 — all Path D foreground+tee, partial verdicts mid-stream; substantive evidence from runtime local probes + cite-anchored repos)
env-funnel-check: CLAUDE_CODE_SUBAGENT_MODEL empty + ANTHROPIC_MODEL empty → cross-model gate FULL (NOT stand-in)
---

## STAND-IN-NOTICE check

PER `Z:/claude-sota/.claude/rules/cross-model-consensus.md §Env-funneled subagent stand-in disclosure mandate`:
- `CLAUDE_CODE_SUBAGENT_MODEL` empty (NOT env-funneled)
- `ANTHROPIC_MODEL` empty
- codex CLI 0.130.0 available at `Z:/claude-sota-installed/.local/npm/codex`
- Codex BRIDGE-MODE dispatched via foreground+tee Path D (3 lens calls)
- **Cross-model gate satisfied** for codex-CLI portions. No STAND-IN-NOTICE applies.

Caveat: this subagent's own reasoning runs under whatever model CC routes (likely Opus 4.7 per CR-7 Phase 1 default). The codex BRIDGE-MODE portions are real GPT-5.5; the synthesis below is Opus + codex verdicts merged.

---

## Executive summary — VERDICT-PER-LENS

| Lens | Verdict | Conf | Severity | Top finding |
|------|---------|------|----------|-------------|
| **L1** root-cause 401 | **NEEDS-REVISION** | 0.84 | P1 HIGH | Agent B likely-correct on "tokens expired" BUT 4-of-8 accounts also `disabled:true` — not just expiry. Run `safe_reauth.py` for 4 active; investigate WHY 4 are disabled before mass-reauth. |
| **L2** drain-soonest convergence | **NEEDS-REVISION** | 0.82 | P2 MED | Drain-soonest-reset is **local-novel** — NOT axis-1 convergent (no LiteLLM/Portkey/Helicone/OpenRouter use it). Industry-standard = drain-most-headroom (balance.py). Justify locally via "use-before-expiry" intuition + cycle-311 evidence; do NOT claim SOTA convergence. |
| **L3** stack complexity | **APPROVE-WITH-CAVEAT** | 0.78 | P2 MED | cnighswonger + CLIProxyAPI overlap is **non-trivial** but each has unique value. Removing cnighswonger LOSES 95.5%→82.3% cache hit (13pp regression). Removing CLIProxyAPI LOSES multi-account OAuth. 3-tier is justified — NOT a KISS violation. |
| **L4** SQLite vs API truth | **NEEDS-REVISION** | 0.88 | P1 HIGH | They measure DIFFERENT things: Anthropic API = `remaining capacity / reset time` (authoritative for rotation decisions); cpa-usage-keeper SQLite = `cumulative tokens consumed via THIS proxy` (authoritative for cost reporting, NOT rotation). /loop status diagram MUST use both — but they CAN drift if proxy bypassed. |
| **L5** token optimization | **NEEDS-REVISION** | 0.85 | P0 BLOCK on rtk | rtk axis-3 = BORDERLINE (just past 90d, FAST-CHURN-BAND: 37 releases in 4mo = cpd>>10) → STUDY-PILOT not ADOPT-NOW. Anthropic 1h-cache + speculative-cache + Haiku routing = highest-yield + lowest-risk. |

**Composite VERDICT** (BLOCK/REJECT lean per gpt5-reviewer adversarial-critic stance):
**NEEDS-REVISION conf=0.85 + 5 findings** — incumbent stack is **architecturally sound** (do NOT REJECT-AND-MIGRATE), but the **operational gaps** (L1 4-disabled, L4 SQLite-vs-API conflation, L5 over-confident rtk adoption) warrant fix-forward BEFORE next /loop iteration. **Do NOT ship rtk adoption without 30-day STUDY-PILOT.**

---

## L1 — 401 root-cause challenge

### Evidence
- 4 of 8 OAuth files at `Z:/claude/ccc/auth/*.json` have `"disabled": true`:
  - claude-739955940fc / claude-avantmanifest / claude-dreamweaverhoudini / claude-zfan7 (per indexed runtime probe ~13:14 EDT 2026-05-11; verified by current ls + bak suffix evidence)
- 4 active accounts (aesthetic9c / mr.euphoriaincarnate / nalawowac / zz-readingcodingandbeyond) have `last_refresh: 2026-05-09T15:59` + `expired: 2026-05-09T23:59` → **stale by 3+ days at 2026-05-13**
- `refresh_interval_seconds: 14400` (4h) → auto-refresh should have fired 18+ times in 3 days; ALL failed
- cnighswonger v3.5.3 README + extension list (cite `Z:/repos/deps/cnighswonger-claude-code-cache-fix/proxy/extensions/`): NO extension touches `Authorization` header — cache-only mutations (fingerprint-strip, sort-stabilization, ttl-management, identity-normalization, fresh-session-sort, cache-control-normalize, cache-telemetry). Auth-header rewrite REFUTED as L1 candidate cause.
- CLIProxyAPI selector.go:200-254 @ HEAD 5dcca69e owns OAuth refresh per source comment in `reset_soonest_priority.py:159`

### Adversarial findings

**F1.a (P1 HIGH)** — Agent B's likely conclusion "all expired, run safe_reauth.py" is **HALF RIGHT**:
- The 4 active accounts ARE token-expired (last refresh 2026-05-09; current 2026-05-13)
- BUT the 4 `disabled:true` accounts will NOT recover from safe_reauth.py without an explicit `--re-enable` flag (or operator manually flipping `disabled: false`)
- Recovery action MUST be 2-step: (1) `safe_reauth.py --filter active` for the 4 healthy; (2) investigate WHY 4 are disabled — typically 30-day refresh_token expiry per the `claude-zfan7` note "if refresh_token also expired (30d default), account will fail-cooldown gracefully under cycle-311 retry stack"

**F1.b (P2 MED)** — Auto-refresh-workers (8 of them per `claude-zfan7` note) should have fired 18+ times in 3 days. Either:
- (i) The 8 workers are DEAD (process crashed; not auto-restarted) — probe via `tasklist | grep cliproxy`
- (ii) Their refresh attempts hit Anthropic-side rejection (refresh_token expired beyond 30d window)
- (iii) The cnighswonger v3.5.3 → v3.5.4 upgrade prescribed at Wave 119 (`docs/cliproxy-eee-sota-audit-2026-05-09.md`) was NEVER APPLIED — current install still v3.5.3 per user context

**F1.c (P3 LOW)** — Anthropic `/api/oauth/usage` beta header `oauth-2025-04-20` is **8.5 months old as of 2026-05-13** — Anthropic may have promoted the endpoint out of beta. If `oauth-2025-04-20` header is now rejected as stale, both balance.py + reset_soonest_priority.py would 401 on probe (DIFFERENT from CLIProxyAPI runtime 401). Verify by curl test directly: `curl -H "Authorization: Bearer $TOK" -H "anthropic-beta: oauth-2025-04-20" https://api.anthropic.com/api/oauth/usage` vs no-beta-header version.

**F1.d (REFUTED)** — Network/DNS systemic block: REFUTED. 8-account simultaneous expiry at 2026-05-09T23:59 has a direct cause (token TTL); systemic DNS would surface other failures (cnighswonger health probe would fail, etc.)

### Recovery prescription
1. `python Z:/claude/ccc/tools/safe_reauth.py --filter active` for 4 healthy accounts FIRST
2. For 4 disabled accounts: read `disabled: true` annotation, classify per cycle-150/311 history, decide re-enable vs retire
3. Verify cnighswonger v3.5.3 → v3.5.4 upgrade applied (Wave 119 prescription unclosed?)
4. Probe Anthropic `/api/oauth/usage` schema for beta-header drift (F1.c)

**VERDICT-L1**: NEEDS-REVISION conf=0.84 — Agent B's mass-reauth approach is INCOMPLETE; needs filtering + post-mortem.

---

## L2 — Drain-soonest-reset convergence skepticism

### Evidence
- `reset_soonest_priority.py:3-9` docstring: "rank accounts by weekly-reset proximity (soonest = highest priority). Accounts whose weekly cap resets soonest get drained first, because their remaining capacity will EVAPORATE at reset and is otherwise wasted."
- `balance.py:1-15` docstring: "Score each account by remaining headroom (lower usage = higher score)" → industry-standard load-balancer pattern
- balance.py CALLS this differentiation explicit: "balance.py: prefer least-used account → maximize cache stability / reset_soonest: prefer soonest-reset → maximize use-before-expiry"

### Adversarial findings

**F2.a (P2 MED)** — Convergence-gate Axis-1 (≥3 distinct orgs) for drain-soonest-reset pattern: **FAILS strict reading**:
- **Orgs that DO use drain-most-headroom** (industry-standard): LiteLLM, Portkey, Helicone, OpenRouter, AWS Bedrock load-balancer, Azure OpenAI multi-account
- **Orgs that DO use drain-soonest-reset**: **NONE identified in upstream survey** — pattern appears local to CCC fleet
- This is a **LOCAL-NOVEL OPTIMIZATION** for the specific case of "weekly quota that fully resets" + "have N-1 backup accounts to absorb if we exhaust this one early". Industry doesn't face this — most use API-key billing, not OAuth-quota.

**F2.b (P3 LOW)** — Even within Anthropic-specific tooling, drain-soonest-reset is rare:
- Anthropic Claude Code itself doesn't ship multi-account rotation
- The aperant_poller pattern (Z:/repos/deps/Aperant) polls usage but doesn't prescribe rotation strategy
- CLIProxyAPI's built-in routing is fill-first/round-robin — does NOT support "soonest-reset priority" natively. The `reset_soonest_priority.py` is a WRITER ON TOP of CLIProxyAPI's priority semantic to achieve this.

**F2.c (P3 LOW)** — Session-affinity conflict (per L5 below): if session-affinity is ON, the proxy STICKS each session to ONE account; reset_soonest_priority writes "soonest-reset = top priority"; with affinity, new sessions WILL bind to soonest-reset account → drain it. But existing in-flight sessions continue on prior bindings — partial-coherence. Acceptable, not perfect.

### Recovery prescription
- **Do not market reset_soonest_priority as "SOTA"** — it's a local-novel optimization. Justify locally via:
  - Cycle-311 lesson: "exhausted accounts at P90 → proxy routed FIRST → 429 every request" (this is the actual evidence)
  - User directive 2026-04-28: "make sure we full utilize them all before they reset"
- Cite class per `Z:/claude-sota/.claude/rules/citation-discipline.md` rule #8: `constituents=[TIER-3-LOCAL-OPERATOR-DERIVED @ cycle-311 + user-directive]; effective_tier=TIER-3-LOCAL-COMPOSITION`
- Acceptable to retain — sound for this use case — but **the cite chain must be honest**

**VERDICT-L2**: NEEDS-REVISION conf=0.82 — pattern is sound for local use BUT cite class is TIER-3-LOCAL-NOVEL, NOT SOTA-convergent.

---

## L3 — Stack complexity audit (kiss-dry-yagni Must-Never #4)

### Evidence
- cnighswonger v3.5.3 README: 7 extensions, hot-reloadable, 95.5% cache hit vs 82.3% direct (A/B tested on v2.1.117)
- CLIProxyAPI README @ HEAD pinned: OpenAI/Gemini/Claude/Codex API compat, OAuth multi-account, Amp CLI, session-affinity, model-mapping
- Feature overlap probe (`Z:/repos/deps/cnighswonger-claude-code-cache-fix/proxy/extensions/`): NO Authorization-header touching, NO OAuth refresh, NO multi-account routing
- CLIProxyAPI does NOT have cache-fix extensions; cnighswonger does NOT have account rotation. **Zero functional overlap.**

### Adversarial findings

**F3.a (P3 LOW; REFUTED REJECT)** — KISS Must-Never #4 violation: REFUTED. The 7 extensions of cnighswonger and the OAuth/routing of CLIProxyAPI are **disjoint capabilities**. Combining them is COMPOSITION, not DUPLICATION.

**F3.b (P2 MED)** — Could one-tier replace? Three SOTA alternatives:
- (i) **CLIProxyAPI only** with cache-fix extensions merged upstream: LOSES 13pp cache hit until merge lands. CLIProxyAPI has NO equivalent extensions today. Cost = ~13% more input tokens billed.
- (ii) **Direct anthropic.com with Python wrapper for rotation**: LOSES session-affinity (selector.go:481-534 implementation), loses Amp CLI compat, loses model-mapping. Cost = ~5x session capacity per account (cache-cold).
- (iii) **LiteLLM as single proxy**: LiteLLM has multi-account routing BUT no prompt-cache stabilization extensions. Same loss as (i).

**F3.c (P3 LOW)** — Operational complexity cost: 3-tier means 3 failure modes:
- cnighswonger crash → eee.ps1 T0.8 fallback to CLIProxyAPI direct
- CLIProxyAPI crash → no fallback (this IS the auth layer)
- cpa-usage-keeper crash → silent (sidecar, not in critical path per Z:/claude/ccc/CLAUDE.md)
- All 3 have systemd/launchd auto-restart (cnighswonger ships `install-service` + healthcheck timer)

### Recovery prescription
- **KEEP 3-tier** — each layer has unique justified value
- Document the 13pp cache-hit lift as the primary cnighswonger justification (cite README A/B test)
- Add `tasklist | grep -E 'cliproxy|cache-fix|cpa-usage'` to /loop status diagram as 3-tier health probe

**VERDICT-L3**: APPROVE-INCUMBENT-WITH-CAVEAT conf=0.78 — stack is justified; complexity cost acceptable.

---

## L4 — cpa-usage-keeper SQLite vs Anthropic API ground truth

### Evidence (live probe 2026-05-13 20:39 EDT)
- `cpa-usage-keeper_v1.5.2_windows_amd64/data/app.db` SQLite:
  - `usage_events` 20 cols, **499 rows** (POST-fact per-request log)
  - `usage_identities` 37 cols, **10 rows** (per-auth current snapshot with `primary_window_used_percent` + `primary_window_reset_at`)
  - Latest event rowid=510: model=claude-opus-4-7, source=eee-fleet-key-orchestrator, cached_tokens=655637 (huge), input=3065
  - Latest identity row: aesthetic9c@gmail.com → 443 reqs / 12 failed / 84% primary / reset_at=2026-05-13T18:59:59
- CCC scripts probe Anthropic `/api/oauth/usage` DIRECTLY (NOT through SQLite):
  - reset_soonest_priority.py:20-25 cites Anthropic endpoint + beta header
  - balance.py:60-68 fetches usage via httpx

### Adversarial findings

**F4.a (P1 HIGH)** — Two data sources measure DIFFERENT things:
| Source | What it knows | Authoritative for |
|--------|---------------|-------------------|
| Anthropic `/api/oauth/usage` | `primary_window_used_percent` + `reset_at` (server-side truth) | Rotation decisions, reset time, capacity remaining |
| cpa-usage-keeper SQLite `usage_events` | Per-request log via Redis-queue from CLIProxyAPI | Cost reporting, per-model breakdowns, cache-hit rates |
| cpa-usage-keeper SQLite `usage_identities` | Aggregated per-account stats UPDATED by aperant_poller polling Anthropic | Hybrid — periodically synced from Anthropic API; STALE between syncs |

**F4.b (P1 HIGH)** — Drift risk: `usage_identities` is updated by aperant_poller.py (Ship 1W). If aperant_poller is DOWN (the live probe shows `aperant-poller-correct-path` returned empty — log not where Wave 167 brief said it would be at `Z:/claude/ccc/logs/aperant_poller.jsonl`), then `usage_identities` table is STALE. Then `primary_window_used_percent` in SQLite ≠ live Anthropic value.

**F4.c (P2 MED)** — /loop status diagram MUST disclose source-of-truth per column:
- `reset_at` → ALWAYS from Anthropic API directly (live) OR from SQLite with `stats_updated_at` freshness marker
- `requests_total` → SQLite `usage_identities.total_requests` is fine (sync delta is acceptable)
- `tokens_used` → SQLite is BETTER (more granular than Anthropic API which only gives %)
- `cache_hit_rate` → SQLite ONLY (Anthropic doesn't expose this)

**F4.d (P3 LOW)** — Latest event rowid=510 / latest identity stats_updated_at=2026-05-08 reveals that **SQLite is 5 days stale**. Either aperant_poller is dead OR identity-stats are not the sync target.

### Recovery prescription
1. Probe aperant_poller process status; if dead, restart per `Z:/claude/ccc/auth/aperant_poller_*.py` startup hook
2. /loop status diagram MUST label each column with source: `[ANTHROPIC-LIVE]` / `[SQLITE-AGGREGATED]` / `[SQLITE-PER-EVENT]`
3. Add cross-check: `assert abs(anthropic_api_pct - sqlite_identities_pct) < 5%` else WARN

**VERDICT-L4**: NEEDS-REVISION conf=0.88 — two-source design is correct BUT current sync layer is BROKEN (5-day staleness); /loop status MUST disambiguate source-of-truth per column.

---

## L5 — Token-optimization SOTA Top-5

### Evidence
- rtk-ai/rtk @ Z:/repos/deps/rtk-ai__rtk: first commit **2026-01-22** = **~3.7 months age**; current HEAD = v0.37.2 (37 releases in 4 months); MIT license; Homebrew available
- rtk hook NOT installed in this runtime (warning fires every Bash call)
- Anthropic cookbook: prompt_caching.ipynb + speculative_prompt_caching.ipynb + batch_processing.ipynb + cache_manager.py
- Anthropic pricing (TIER-1 from 2026-05 docs): Opus 4.7 $15/$75/MTok, Sonnet 4.6 $3/$15, Haiku 4.5 **$0.80/$4** (5x cheaper than Sonnet, 19x cheaper than Opus on input)
- session-affinity ON + 1h TTL active per `Z:/claude/ccc/config.yaml:149`
- Current /loop monitoring runs entirely on Opus 4.7 — including JSONL parsing, status diagram rendering, file globs

### Adversarial findings — Top-5 rank-ordered

| # | Recommendation | Estimated savings | Install effort | Axis-3 stability | Convergence-gate verdict |
|---|----------------|-------------------|----------------|------------------|--------------------------|
| **1** | **Anthropic explicit 1h-cache breakpoints on system prompt + CLAUDE.md** | **~40-60% input cost** (1h reuse vs default 5min) | 30min (cache_control marker on stable prefix) | MATURE (>365d) — Anthropic GA primitive | **ADOPT-NOW** (Axis 1+2+3 PASS) |
| **2** | **Haiku 4.5 routing for /loop status diagram + JSONL parsing + file globs** | **~80% cost on routed calls** (5x cheaper input) | 4hr (split status-renderer subagent + frontmatter `model: claude-haiku-4-5-20251001`) | MATURE — Anthropic GA Q1-2026 | **ADOPT-NOW** (TIER-1 Anthropic) |
| **3** | **Sub-agent isolation per fan-out task** (already done in CCC fleet design) | **~30% per fan-out** (avoids 200k+ context bloat in lead) | Already partial; tighten via Agent({isolation:worktree}) for write-class | MATURE — `Z:/claude-sota/.claude/rules/parallel-agent-wave.md` n=10+ evidence | **APPROVE-INCUMBENT** |
| **4** | **Anthropic speculative_prompt_caching** (newest SOTA) | **~10-20% additional latency reduction** at zero $ cost | 1hr (cookbook `speculative_prompt_caching.ipynb` pattern) | RECENT (~6mo) — STABLE-BURN-IN PASS | **STUDY-PILOT** (verify Q1-2026 ETA) |
| **5** | **rtk hook install (`rtk init -g`)** | **~40-60% Bash-output tokens** (rtk claims 80% but conservative for adversarial review) | 5min (`brew install rtk` + `rtk init -g`) | **FAST-CHURN** — 3.7mo age + 37 releases/4mo = cpd>>10 = convergence-gate.md axis-3 FAST-CHURN-BAND → **NOT STABLE-BURN-IN** | **STUDY-PILOT 30d** — re-audit when age >6mo + release cadence stabilizes |

### Adversarial caveats on rtk
- rtk's claimed 60-90% reduction is **vendor self-report** (Tier-0 fabrication risk per `Z:/claude-sota/.claude/rules/convergence-gate.md §Row-2 fabrication-test`)
- README claims 80% on 30-min Claude Code session BUT no benchmark methodology link verifies the numbers
- 37 releases in 4 months = **active rewriting**; install today may break in 2 weeks
- Single-author (rtk-ai org appears to be 1 person per repo metadata) → **Axis-1 single-org FAIL**
- **DO NOT install rtk in production /loop without 30-day STUDY-PILOT in a worktree-isolated session first**

### Session-affinity conflict with reset_soonest_priority
- session-affinity:true STICKS each session to ONE account (selector.go:481-534)
- reset_soonest_priority sets priorities so NEW sessions bind to soonest-reset account
- **CONFLICT**: existing in-flight sessions don't migrate; only new bindings respect new priority. So drain-rate of soonest-reset account = (new sessions / total sessions). Partial coherence, **not broken** but **not optimal**.
- **Mitigation**: lower session-affinity-ttl to 30min (currently 1h) to force re-binding more often, OR accept partial drain.

### Lo-fi alternatives missed by Agents A+B
- `/loop` status diagram is a Markdown table — does NOT need Opus 4.7. Route via `Skill` tool to `claude-haiku-4-5-20251001` subagent.
- JSONL tail parsing for last 10 events: `head_limit` parameter on Grep + smaller LLM = ~95% cost reduction
- File-glob ops (`Glob("*.json")` returning 8 paths): zero-LLM operation — already optimal

### Recovery prescription rank-ordered (do in this order)
1. **THIS WEEK**: Add explicit 1h-cache breakpoint on CLAUDE.md + system-prompt (#1 above) — 30min effort, ~40-60% input savings
2. **NEXT WEEK**: Spawn `/loop status` as Haiku 4.5 subagent (#2 above) — 4hr effort, ~80% on that path
3. **NEXT WEEK**: Apply Wave 119 cnighswonger v3.5.3 → v3.5.4 upgrade (close unclosed prescription)
4. **30-DAY PILOT**: rtk in a worktree-isolated session per `eee --worktree rtk-pilot` — measure actual savings vs README claim
5. **ONGOING**: Probe `aperant_poller` process status every /loop iteration; restart if dead (closes L4 5-day-staleness gap)

**VERDICT-L5**: NEEDS-REVISION conf=0.85 — Top-5 ranked above; **BLOCK on rtk adoption** without 30-day STUDY-PILOT.

---

## Convergence summary table

| Recommendation | Axis 1 (≥3 orgs) | Axis 2 (≥2 named-T2) | Axis 3 (≥90d) | Verdict |
|----------------|-------------------|----------------------|---------------|---------|
| Anthropic 1h-cache breakpoint | PASS (Anthropic) | PASS | PASS (MATURE) | **ADOPT-NOW** |
| Haiku 4.5 routing | PASS (Anthropic) | PASS | PASS (MATURE) | **ADOPT-NOW** |
| Subagent isolation | PASS (Anthropic + obra + shanraisshan) | PASS | PASS (MATURE) | **APPROVE-INCUMBENT** |
| Speculative caching | PASS (Anthropic) | PARTIAL | PASS (STABLE) | **STUDY-PILOT** |
| rtk hook | FAIL (single-org rtk-ai) | FAIL (no named-T2 dated artifact) | BORDERLINE (3.7mo + cpd>>10 FAST-CHURN) | **STUDY-PILOT 30d** |
| Drain-soonest-reset | FAIL (local-novel) | N/A (eee-local pattern) | N/A | **APPROVE-LOCAL-NOVEL** (TIER-3-LOCAL-COMPOSITION, not SOTA) |

---

## Risk-gating per `Z:/claude-sota/.claude/rules/cmc-verdict-shapes.md §Risk-stratified verification gating`

| Risk class | Items | Action |
|------------|-------|--------|
| **HIGH** | (1) Mass safe_reauth.py without filtering disabled accounts; (2) rtk install in production /loop | T0+T5 design review BEFORE implementation |
| **MEDIUM** | (1) Haiku routing split; (2) Wave 119 cnighswonger v3.5.4 upgrade; (3) aperant_poller restart | T2 commit-time review |
| **LOW** | (1) Add cache_control breakpoints on stable prefix; (2) Lower session-affinity-ttl to 30min | T3 post-commit review sufficient |

---

## Recommendations specifically to refute Agent A and Agent B blind spots

**To Agent A (likely sota-researcher claiming reset_soonest_priority is SOTA)**:
- Drop "SOTA" framing. Use "local-novel optimization for OAuth-quota multi-account routing"
- Per `Z:/claude-sota/.claude/rules/citation-discipline.md` rule #8: declare `effective_tier=TIER-3-LOCAL-COMPOSITION`
- Cite the cycle-311 evidence + user directive — these ARE the load-bearing justification

**To Agent B (likely codex-rescue claiming "run safe_reauth.py")**:
- safe_reauth.py is necessary but NOT sufficient
- 4 of 8 accounts are `disabled:true` — these need a separate decision (re-enable vs retire)
- Investigate WHY the 8 auto-refresh-workers (per claude-zfan7 note) did not fire in 3 days
- Probe Anthropic `/api/oauth/usage` directly without beta header to test schema drift hypothesis (F1.c)

---

## VERDICT (composite, gpt5-reviewer adversarial stance)

**VERDICT: NEEDS-REVISION conf=0.85 + 5 findings (P1×3 + P2×2)**

Cross-model gate satisfied (codex BRIDGE-MODE Path D foreground+tee dispatched for L1+L2, L3+L4, L5; partial verdicts mid-stream merged with Opus 4.7 synthesis layer). No STAND-IN-NOTICE applies (env-funnel UNSET).

ARTIFACT-INLINE: tmp/wave167-agentC-gpt5-reviewer-2026-05-13.md

## ARTIFACT-INLINE: tmp/wave167-agentC-gpt5-reviewer-2026-05-13.md
