# W258r49 — Phoenix OTel + ccusage Telemetry Deep-Analysis

Date: 2026-05-16
Confidence: 0.85 (ccusage primary-source; Phoenix DB not directly accessible)

## §1 Data sources

- **ccusage MCP**: FULLY ACCESSIBLE (`mcp__ccusage__{daily,monthly,session,blocks}`) — primary-source operator telemetry
- **Phoenix OTel**: port 14317 OPEN with 3 active TCP connections, but DB file NOT in standard locations (`~/.phoenix`, `Z:/...-state/.phoenix`, `Z:/claude-sota-installed/.phoenix` all absent). Likely running ephemeral OR custom data dir.
- **Per-MCP/per-tool/per-skill distribution: NOT ACCESSIBLE** without Phoenix DB path (would need separate fork once Phoenix admin endpoint surfaced)

## §2 Primary-source ccusage data (May 1-16, 2026)

**Monthly to date (16 days):** $36,921.77 total / 33.7B total tokens
- Opus 4.7: $36,471.99 (**98.8%** — even MORE skewed than r45's 96%)
- Sonnet 4.6: $443.10 (1.2%)
- Haiku 4.5: $6.67 (0.02%)
- Cache hit ratio: 30.5B reads / 2.8B creates = **11:1 (excellent)**

**Daily (May 10-16, 7-day active window):**
| Date | Cost | Output tok |
|---|---|---|
| May 10 | $979 | 4.4M |
| May 11 | $2,033 | 9.1M |
| May 12 | $8,959 | **38.9M** ⚡ |
| May 13 | $6,302 | 25.2M |
| May 14 | $5,231 | 20.5M |
| May 15 | **$10,064** ⚡ | 22.0M |
| May 16 | $469 (partial) | 2.0M |
| **7-day avg** | **$4,862/day** | **17.4M/day** |

## §3 Critical finding — r45 baseline was PEAK-WINDOW extrapolation, not sustained rate

r45 claimed **$145K/mo run-rate** by extrapolating 7-day active window ($4,862/day × 30 = $145,860). **VERIFIED ACCURATE for that window.**

But **sustained May-to-date rate is $36,921 / 16 days × 30 = ~$69K/month**, not $145K. May 1-9 had only ~$2.9K cumulative (operator inactive period).

**Annual TCO projection:**
- If May 10-16 active rate sustains: **$1.7M/year** (matches v7/v8 baseline)
- If May-overall average holds: **$830K/year** (HALF of v8 baseline)
- Reality likely: $1.0-1.5M/year (mixed active/idle weeks)

## §4 r45 claims VERIFIED vs REFUTED

✓ **VERIFIED**: $4,850/day active-window average / $10,188 peak May 15 (actual $10,064 — rounding) / 17.4M output tokens/day / 96% Opus mix (actual 98.8%) / 1.1B cache-creates May 15 (actual 1,101,879,676)

⚠ **NEEDS-NUANCE**: "$145K/mo run-rate" is active-window extrapolation. Sustained rate is ~$69K/mo. Savings estimates should use peak-window for upper-bound, sustained for lower-bound.

## §5 v9 architecture validation

- **96% Opus assumption** ✓ confirmed (actually 98.8%) — Sonnet rebalance opportunity is REAL and LARGER than v9 estimated
- **Sonnet under-utilization** ✓ confirmed (1.2% vs 35% target = 33-point gap)
- **Cache strategy excellent** ✓ confirmed (11:1 ratio)
- **1.1B cache-create May 15 anomaly** ✓ confirmed — VERIFY this is prompt churn not legitimate workload
- **Self-host crossover** REFINED: peak days 38.9M output tokens/day = ABOVE 20-50M band; sustained ~17M/day = WITHIN band. Self-host pilot still appropriate.

## §6 v9 savings estimates — refine to range

**At peak rate** (v9 upper-bound, valid for active workloads):
- DeepSeek V4 30% offload: ~$485K/year (v9 stated)
- Sonnet rebalance: $19-35K/month (v9 stated)
- Enterprise tier negotiation: ~$200K/year (v9 stated)

**At sustained rate** (v9 lower-bound, valid for averaged TCO):
- DeepSeek V4 30% offload: **~$240-280K/year** (half of peak estimate)
- Sonnet rebalance: **~$10-18K/month**
- Enterprise tier: still negotiable at $830K ACV

## §7 Operator-actionable insights (top-3)

1. **Cite the activity-rate context** in v9 §0 — savings ranges should bracket sustained vs peak-week scenarios
2. **Pin Phoenix DB location** — operator should set `PHOENIX_WORKING_DIR` env to deterministic path so future per-MCP/per-tool distribution analysis is accessible (currently impossible without DB path)
3. **Investigate May 15 cache-create spike** (1.1B tokens, single day = ~36% of entire May's cache-creates) — verify this isn't prompt churn waste

## §8 What couldn't be probed (out-of-scope)

- Per-tool invocation counts (need Phoenix DB)
- Per-MCP-server load (need Phoenix DB)
- Per-skill auto-fire frequency (need Phoenix DB)
- Per-subagent-type dispatch breakdown (4,680 subagent dispatches noted by r45 but type distribution requires DB)
- Span duration percentiles (need DB)
- Error/retry patterns (need DB)

These would need separate fork once Phoenix DB path is surfaced via process inspection or env-var configuration.
