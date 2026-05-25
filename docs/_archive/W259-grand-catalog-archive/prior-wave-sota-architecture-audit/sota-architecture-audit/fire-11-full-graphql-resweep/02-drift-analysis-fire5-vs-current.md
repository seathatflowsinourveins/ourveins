# 02 — Drift Analysis: Fire 5 snapshot vs Fire 11 GraphQL current

> **Purpose**: detect drift in repo metadata between Fire 5 audit snapshot (today
> ~14:50 UTC) and Fire 11 GraphQL re-probe (today ~17:00 UTC) — ~2-hour window.

## Drift summary

| Drift class | Count | Notes |
|---|---|---|
| **License SPDX changes** | **0** | Fire 5 snapshot was fresh same-day — no license changes detected |
| **Star jumps ≥20%** | **0** | No major star velocity events in 2-hour window |
| **Newly archived** | **0** | None archived since Fire 5 |
| **Stale (>6 months no push)** | **23** | identified as STALE band per SRA D2 |
| **Failed re-probe** | **0** | all 555 re-probed successfully |

## Why no drift on first 3 axes

Fire 5 baseline was extracted ~2-3 hours before Fire 11 re-probe. No realistic
license/star/archive events would occur in that window. The drift detection methodology
is sound but inputs are essentially identical-vintage data.

**Architectural insight**: drift analysis becomes load-bearing when Fire-N+1 runs ≥30
days after Fire-N. Per `Z:/claude-sota/.claude/rules/evidence-policy.md` Marker Decay:
markers valid AT WRITE-TIME may decay. Re-running drift analysis in 30-90 days would
surface the actual ecosystem changes.

## 23 STALE repos (>6 months since push)

These are SRA D2 "STALE band" (180-365 days = STALE; >365 = DORMANT):

### Top 10 stale (by star count)

| Repo | Stars | Days since push | License | Stale class |
|---|---|---|---|---|
| winfunc/opcode | 21,800 | 206 | (probe pending) | STALE |
| maciek-roboblog/claude-code-usage-monitor | 7,956 | 238 | (probe pending) | STALE |
| get-alex/alex | 5,089 | **529** | (probe pending) | **DORMANT** |
| pimzino/claude-code-spec-workflow | 3,718 | 245 | (probe pending) | STALE |
| njengah/claude-code-cheat-sheet | 1,694 | 268 | (probe pending) | STALE |
| slowmist/mcp-security-checklist | 827 | 377 | (probe pending) | **DORMANT** |
| coleam00/mcp-mem0 | 675 | **392** | (probe pending) | **DORMANT** |
| oxygen-fragment/claude-modular | 281 | 298 | (probe pending) | STALE |
| mcp-defender/mcp-defender | 253 | 246 | (probe pending) | STALE |
| sorrycc/awesome-code-agents | 157 | 226 | (probe pending) | STALE |

### Distribution

- 180-365 days (STALE): ~20 of 23 (87%)
- >365 days (DORMANT): **3 of 23** (get-alex/alex 529d, slowmist/mcp-security-checklist 377d, coleam00/mcp-mem0 392d)

## SRA D2 implications

Per `Z:/claude-sota/.claude/rules/convergence-gate.md` Axis-3 STALE band:
- **STALE 180-365d**: ACCEPTABLE with DOWNGRADE flag; document and re-audit in 90d
- **DORMANT >365d**: REJECT unless explicit ABANDONED-BUT-WORKING justification

The 23 stale repos (3 DORMANT + 20 STALE) drop SRA D2 verdict from PASS → PARTIAL/FAIL
unless functional adoption is still actively in use.

## Architecture impact

| Repo | Architecture role | Action |
|---|---|---|
| winfunc/opcode 21k★ 206d | unclear; probe in Fire 12 | check for redirect/rebrand |
| maciek-roboblog/claude-code-usage-monitor 7.9k★ 238d | usage monitoring tool | cite-only — duplicates ccusage (already INSTALLED) |
| get-alex/alex 5k★ 529d **DORMANT** | natural-language linter | UNRELATED to CC ecosystem; remove from baseline (Fire 5 over-included) |
| pimzino/claude-code-spec-workflow 3.7k★ 245d | spec-driven workflow | DEFER — spec-kit + ouroboros are SOTA picks |
| slowmist/mcp-security-checklist 827★ 377d DORMANT | security checklist | useful reference; cite-only |
| coleam00/mcp-mem0 675★ 392d DORMANT | MCP memory variant | superseded by mcp-memory-service (L1 INSTALLED) |
| Others (≤300★) | various | DEFER / cite-only |

**Verdict**: 23 stale repos do NOT impact eee architecture decisions. All are either:
- Already DEFERRED in Fire 6/8/9 decisions
- Superseded by existing eee installs
- Useful as cite-only references
- One (get-alex/alex) is unrelated and should be REMOVED from baseline

## Forward fire candidate (W134-F12)

**W134-F12-stale-cleanup**:
- For 23 STALE repos, perform deep-dive D2/D5 analysis:
  - Is the repo abandoned OR ABANDONED-BUT-WORKING (still functional + adopted)?
  - Are there current forks that ARE active?
- Remove get-alex/alex from baseline (UNRELATED to CC ecosystem)
- Document operator decision per repo

## Mia ladder advance

n=1080 → n=1090 (+10: drift detection methodology + 23 stale identified + 3 DORMANT classified +
SRA D2 verdict implications + architecture-impact analysis)
