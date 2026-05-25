# W258r45 — Operator Usage Telemetry vs v6 Architecture (2026-05-16)

## §1 Usage signals available + signals missing

**ACCESSED via ccusage MCP (7-day window 2026-05-10 to 2026-05-16):**
- `ccusage daily` — per-day token + cost + model breakdown
- `ccusage codex-daily` — codex CLI Path P usage
- `subagent_metrics.jsonl` (4,680 rows) — subagent dispatch log

**NOT ACCESSED:** Phoenix OTel traces (endpoint `http://127.0.0.1:14317` not probed live — needed for tool-use distribution + compact-frequency); CC plugin telemetry caches.

## §2 Per-axis measurements (7-day actuals)

| Axis | Measurement | Note |
|---|---|---|
| **Claude Code total cost** | **$33,952.65** | ~$4,850/day average; ~$145K/month run-rate |
| **CC total tokens** | 30.02 BILLION | 90% cache-reads (27B/30B) |
| **CC output tokens/day avg** | **17.4M output/day** | Peak: 39M output May 12-13 |
| **Model mix** | Opus 4.7 ~96%, Sonnet ~3%, Haiku <1% | Heavy Opus reliance |
| **Cache hit ratio** | 90% (27B reads / 2.6B creates) | Prompt caching working well; 1h TTL effective |
| **Codex total cost** | **$424.95** / 7 days = $60/day | Active cross-model gate |
| **Codex tokens** | 266M (218M cached input) | 82% cached — Path P prompt-reuse heavy |
| **Reasoning tokens (codex)** | 803K / 7 days | GPT-5.5 reasoning effort `none` per session-info — minimal reasoning use |
| **Subagent dispatches** | 4,680 rows in `subagent_metrics.jsonl` | High dispatch volume; recent entries show "missing transcripts" markers |
| **Peak day** | **May 15: $10,063 CC + $125 codex = $10,188** | Wave-7 research day |

## §3 Architecture validation vs v6 assumptions

| v6 Assumption | Reality | Verdict |
|---|---|---|
| Operator solo / Anthropic Pro+Max subscription | **$145K/month run-rate** — way past Max $200/mo subscription crossover | **MISALIGNED** — operator is on API-billed at scale, not subscription |
| Self-host crossover at 20-50M output tokens/DAY (r25) | **17.4M output/day avg, 39M peak** — entering crossover zone | **CROSSOVER IMMINENT** (was: defer self-host) |
| DeepSeek V4 escape valve is 14× cheaper (r13) | At $4,850/day Opus-heavy spend, escape valve saves **~$4,200/day** | **HIGH-LEVERAGE — should pilot NOW** |
| Cross-model gate via codex Path P | $60/day codex use confirms gate active | **VALIDATED** |
| Cache utilization optimal | 90% cache-read ratio | **VALIDATED** (excellent) |
| Heavy Opus reliance is operator's actual workflow | 96% Opus 4.7 share | **VALIDATED** — cost driver |
| Agents-as-tools (P15) pattern in use | 4,680 subagent dispatches in metric log | **VALIDATED** — heavy use |

## §4 Anomalies / surprises

1. **Operator is NOT a "solo developer" on subscription** as v6 §2 profile assumes — actually a high-volume API user at **$145K/month run-rate**. v6 cost-optimization recommendations need to be RE-PRIORITIZED to T1.
2. **Self-host crossover hits within current usage band** — v6 said "defer below 20M output/day"; operator's 7-day average 17.4M with peaks at 39M means crossover may already be break-even.
3. **Cache-create cost on May 15 alone**: 1.1B cache-create tokens = $40+ in cache-create overhead in one day. **Cache strategy needs audit.**
4. **Subagent log "missing transcripts" markers** suggest dispatch is faster than transcript persistence — possible reliability gap.
5. **Recent subagent_metrics shows `BLOCKED` verdicts** with "5h reset at 00:00 EDT" wait pattern — operator hit rate limits, plan-management is load-bearing not theoretical.

## §5 Top-3 operator-actionable insights

1. **PILOT DeepSeek V4 Anthropic-format endpoint IMMEDIATELY** (v6 §1 L2). At $4,850/day Opus spend, even 30% offload to DeepSeek V4 saves **~$1,400/day = $510K/year**. v6 listed this as "consider"; reality says T1-NOW.

2. **Validate LiteLLM cascade routing per r30 config** (v6 §8). With operator's actual Sonnet share at <3%, the cascade is NOT effectively routing — Sonnet/Haiku tiers are underutilized while Opus carries 96% of work. Tune cascade thresholds: many tasks operator runs on Opus likely fit Sonnet 4.6 well.

3. **Audit cache-create strategy** — May 15's 1.1B cache-create suggests prompt churn. Combined with the operator's r22-flagged triple-encoded autocompact thresholds, **the prompt-shape pipeline is over-creating cache entries**. Stable CLAUDE.md + AGENTS.md + skill-headers should yield single-create-many-reads; if create-rate is high, cache invalidation is firing more than necessary.

**Confidence:** 0.88 (telemetry is direct primary-source via ccusage; OTel-derived per-tool distribution would need separate probe).

**Sources:** ccusage MCP `daily` + `codex-daily` queries 2026-05-10 → 2026-05-16; `Z:/claude-sota-installed/.claude/state/subagent_metrics.jsonl` (4,680 rows).
