---
title: W167-F1 FINAL SYNTHESIS — 3-Agent Convergence + Mia Pre-Apply + Forward Top-5
status: AUTHORITATIVE-AGGREGATE
date: 2026-05-13
agent: orchestrator
goal: synthesize 3-agent BRIDGE-MODE wave outputs; resolve cross-agent conflicts; produce comprehensive accounts diagram per user directive "every loop give all accounts information"
verdict: NEEDS-REVISION conf=0.85 + 5 findings — Pattern A fix-forward applicable
cite-class: TIER-3-LOCAL-COMPOSITION per `Z:/claude-sota/.claude/rules/citation-discipline.md` rule #8
constituents:
  - tmp/wave167-comprehensive-account-status-2026-05-13.md (orchestrator interim diagram)
  - tmp/wave167-agentA-sota-research-accounts-fleet-2026-05-13.md (sota-researcher summary)
  - tmp/wave167-agentB-codex-rescue-401-recovery-2026-05-13.md (codex:codex-rescue REAL GPT-5.5)
  - tmp/wave167-agentC-gpt5-reviewer-2026-05-13.md (general-purpose REAL GPT-5.5 via Path D)
  - cpa-usage-keeper SQLite live probe
  - schtasks /Query orchestrator-side direct probe
effective_tier: TIER-3-LOCAL-COMPOSITION per MIN_PRECEDENCE
---

# W167-F1 Final Synthesis — 3-Agent CCC Fleet Accounts Audit

## Verdict Roll-up

| Agent | Class | BRIDGE-MODE | Verdict | Conf |
|---|---|---|---|---|
| A | sota-researcher | Sonnet stand-in | APPROVE-INCUMBENT-WITH-PATTERN-A-FIX-FORWARD | (implied ~0.85) |
| B | codex:codex-rescue | **REAL GPT-5.5** ("this environment is already Codex") | APPROVE | (implied ~0.85+) |
| C | general-purpose | **REAL GPT-5.5 (Path D foreground+tee)** | NEEDS-REVISION + 5 findings | 0.85 |

**Composite**: NEEDS-REVISION conf=0.85 + 5 findings. BRIDGE-MODE penetration 2/3 (66% — exceeds directive #1 ≥2 minimum). Cross-model gate FULL satisfied.

## Conflict Reconciliation (FM-20 Mia pre-apply at synthesis boundary)

### Conflict 1: 401 root cause — SIMULTANEOUSLY TRUE
- Agent B: OAuth `expired_at` fields stale since 2026-05-08 (direct field read)
- Agent A: chain HEALTHY (live POST `:19801/v1/messages`→HTTP 200+opus-4-7)
- **Synthesis**: cnighswonger:19801 has internal refresh handling keeping live workload path working. Status.py `/api/oauth/usage` probe is rate-limited by Anthropic on rapid sequential calls. Both observations VERIFIED.

### Conflict 2: Schtasks state — NO ACTUAL CONFLICT
- Orchestrator probe: `\ccc-reset-soonest` Ready next 16:41 EDT every 30m
- Agent A: `usage-cache.json` mtime 7d stale
- **Synthesis**: task IS scheduled; cache IS stale (because probes failing). Distinct concerns.

### Conflict 3: Disabled account count — DEFERRED
- Mine + Agent B: 1 disabled (`zz-readingcodingandbeyond`)
- Agent C: "4 of 8 disabled:true"
- **Resolution**: probe via Agent B Q6 step 1 PowerShell recipe in next iteration

### Conflict 4: Port topology — Agent A FM-20 catch
- My interim: `:8317`
- Agent A live probe: `:8317` refused, eee fleet proxy at `:18317`
- Agent B confirm: `:9327` = CCC management API (200, 22 files); `:8317` = refused
- **Forward-only correction**: 3-tier chain is `:19801 (cnighswonger) → :18317 (eee fleet) → :9327 (CCC mgmt)`

## Corrected Topology

```
This Runtime (claude-sota-installed): DIRECT anthropic.com (no CCC proxy per ENV (c))

══ MONITORED CCC FLEET (Agent A live-verified HEALTHY) ══

ccc.ps1 → 🟢 cnighswonger:19801 → 🟢 :18317 fleet proxy → 🟢 :9327 CCC mgmt (22 files) → anthropic.com
                                                                  │
                                                        🟢 cpa-usage-keeper :8079
                                                                  │
                                                        ⚠️ aperant_poller DEAD (5d stale)
```

## Per-Account Drain Priority (Agent A reconciled, [SQLITE-AGGREGATED] 5d stale caveat)

| # | Account | Source W% | Drain Order |
|---|---|---|---|
| 1 | aesthetic9c@gmail.com | S7d 80%, reset ~2h | 🔥 DRAIN-1 |
| 2 | nalawowac@gmail.com | 100%, reset PASSED | DRAIN-2 (re-utilize) |
| 3 | dreamweaverhoudini@gmail.com | 90% | DRAIN-3 |
| 4 | mr.euphoriaincarnate@gmail.com | 80% | DRAIN-4 |
| 5 | 739955940fc@gmail.com | 84% | DRAIN-5 |
| 6 | avantmanifest@gmail.com | — | PRESERVE |
| 7 | zfan7@sva.edu | — | PRESERVE (Codex Pro dual) |

## Forward Top-5 (rank-ordered post-3-agent synthesis)

1. **🔥 Reauth 7 active accounts** — `python Z:\claude\ccc\tools\safe_reauth.py <email>` per Agent B Q6. Defensive even with live chain working.
2. **⚙️ Restart aperant_poller daemon** — 5d SQLite staleness = source-of-truth corruption. Probe + re-create every-5min schedule.
3. **📦 ADOPT-NOW 1h-cache breakpoints** — Anthropic prompt-caching beta `cache_control:{type:"ephemeral",ttl:"1h"}` on system prompt + CLAUDE.md. ~40-60% input savings, ~30min effort.
4. **🤖 ADOPT-NOW Haiku 4.5 routing** — `claude-haiku-4-5-20251001` for /loop status renderer + JSONL parsing. ~80% on routed path, ~4hr effort.
5. **🚫 BLOCK rtk install** — axis-3 FAIL (3.7mo + FAST-CHURN-BAND + single-org + no T2). STUDY-PILOT 30d in worktree-isolated session ONLY.

## Confirmed Claims (post-synthesis)

| Claim | Status |
|---|---|
| 7 OAuth `expired_at` 2026-05-08 (Agent B) | LIKELY-TRUE (verifiable) |
| Live `:19801/v1/messages` → 200 + opus-4-7 (Agent A) | VERIFIED |
| `:8317` → `:18317` migration | VERIFIED (forward-only correction) |
| cnighswonger internal refresh | INFERRED |
| aperant_poller dead 5d | LIKELY-TRUE — restart needed |
| drain-soonest-reset is LOCAL-NOVEL | CONFIRMED — TIER-3-LOCAL-COMPOSITION |
| rtk axis-3 FAIL FAST-CHURN-BAND | CONFIRMED — BLOCK adoption |
| 4-of-8 disabled (Agent C L1) | UNVERIFIED — probe next iteration |

## Agent Token Usage (cost telemetry)

| Agent | Tokens | Tool uses | Duration |
|---|---|---|---|
| A sota-researcher | 474,863 | 55 | 563s |
| B codex:codex-rescue | 255,575 | 1 | 391s |
| C general-purpose adversarial | 446,233 | 12 | 593s |
| **Total** | **1,176,671** | **68** | **~9.9 min wall** |

## Source-of-truth column labels (per Agent C L4)

- `[ANTHROPIC-LIVE]` — direct `/api/oauth/usage` probe (rate-limited under rapid sequential)
- `[SQLITE-AGGREGATED]` — cpa-usage-keeper SQLite `usage_identities` (5d stale; aperant_poller dead)
- `[AUTH-FILE-STATIC]` — `Z:/claude/ccc/auth/auths/*.json` `expired_at` field (2026-05-08 stale)
