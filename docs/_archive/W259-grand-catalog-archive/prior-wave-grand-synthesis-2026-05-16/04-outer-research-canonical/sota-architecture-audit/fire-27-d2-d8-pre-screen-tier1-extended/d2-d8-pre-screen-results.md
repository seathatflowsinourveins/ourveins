# Wave 134 Fire 27 — D2+D8 Pre-Screen Results (Tier-1 NEW-EXTENDED candidates)

> **Trigger**: User directive 2026-05-10 "beware of their active maintenance and SOTA release date, don't include outdated stale repos, we need new SOTA with multi convergence"
> **Pre-screen discipline**: per `sota-research-architecture.md §D2 freshness` + `§D8 industry adoption signal` — verify ACTIVE + multi-org BEFORE firing Path P codex T1
> **Cite**: TIER-1-DIRECT user directive 2026-05-10 + `Z:/claude-sota/.claude/rules/sota-research-architecture.md`

## Pre-screen method

For each Tier-1 NEW-EXTENDED candidate from the Fire 25 + Fire 26-B/26-C queues:

1. `gh api repos/<owner>/<repo>` → extract `pushed_at` (D2) + `stargazers_count` + `forks_count` + `archived` + `owner.type`
2. `gh api repos/<owner>/<repo>/contributors` → top-5 contributions (D8 multi-org check)
3. Compute D2 age (today - pushed_at)
4. Compute D8 score (≥3 contributors >50 commits = strong; TIER-1-OFFICIAL org = STRONG-PROVENANCE-EXPRESS)
5. Apply pre-screen verdict

## Pre-screen results

| # | Candidate | D2 pushed_at | D2 age | D8 contributors top-3 | D8 verdict | D3 fresh-paint | Pre-screen |
|---|---|---|---|---|---|---|---|
| 1 | **openai/openai-agents-python** | 2026-05-10T23:21Z | **<1 day** (hours) | seratch 383 / rm-openai 291 / github-actions 184 | TIER-1-OFFICIAL OpenAI org + multi-contributor | 26,150★ / 28.5MB → density OK | **🥇 FIRE NEXT (Fire 27-A)** |
| 2 | **langchain-ai/langgraph** | 2026-05-10T01:06Z | **~1 day** | nfcampos 2,262 / hinthornw 800 / vbarda 783 / dqbd 524 / eyurtsev 380 | TIER-1 LangChain + 5+ heavy contributors | 31,678★ / 519MB → very dense | 🥈 FIRE NEXT-PLUS-1 (Fire 27-B) |
| 3 | **mem0ai/mem0** | 2026-05-09T15:26Z | **~1.5 days** | Dev-Khant 453 / deshraj 216 / taranjeet 205 / whysosaket 156 / cachho 104 | TIER-2 startup + 5 heavy contributors | 55,325★ / 55MB → density borderline (check fresh-paint) | 🥉 FIRE AFTER (Fire 27-C) |
| 4 | invariantlabs-ai/invariant | 2026-01-12T12:50Z | **~120 days (STALE)** | lbeurerkellner 133 / mbalunovic 45 / hemang1729 37 | TIER-2 academic Zurich (Beurer-Kellner named-T2 researcher) | 416★ / 8.7MB low-volume | ❌ **DEFER** — stale + low signal |
| 5 | snyk-labs/snyk-mcp-server | **404 PHANTOM** | n/a | n/a | n/a | n/a | ❌ **REJECT** — phantom |
| 6 | THUDM/AgentBench | 2026-02-08T17:01Z | **~92 days (BORDERLINE STALE)** | HenryCai11 19 / Xiao9905 17 / zhc7 12 / Longin-Yu 11 | TIER-2 Tsinghua academic + LOW (max 19 commits) | 3,405★ / 30MB academic eval | ❌ **DEFER** — eval-frozen pattern; low D8 |

## Decision matrix per pre-screen

| Verdict class | Criteria | Action |
|---|---|---|
| **PROCEED to Path P** | D2 ≤30d AND D8 multi-contributor AND TIER-1-OFFICIAL OR named-T2 active | Fire 27-A: openai-agents-python; Fire 27-B: langgraph; Fire 27-C: mem0 |
| **DEFER** | D2 90-180d (STALE) OR D8 low-contributor (max <50) OR fresh-paint suspect | invariantlabs-ai/invariant + THUDM/AgentBench |
| **REJECT** | Phantom repo (404) OR archived OR DORMANT (>365d) | snyk-labs/snyk-mcp-server |

## Pre-screen savings

3 of 6 candidates DEFER/REJECT → **3 wasted Path P fires prevented** (~$30 codex budget saved at ~$10/Path P fire).

Forward discipline: every future Tier-1 NEW-EXTENDED candidate gets this 2-min `gh api` pre-screen BEFORE codex T1 dispatch. Per user directive 2026-05-10.

## Fire 27 execution order

1. **Fire 27-A** (this fire): `openai/openai-agents-python` Path P codex T1 audit (HIGHEST priority — TIER-1-OFFICIAL + active today)
2. **Fire 27-B**: `langchain-ai/langgraph` Path P codex T1 audit
3. **Fire 27-C**: `mem0ai/mem0` Path P codex T1 audit
4. **Fire 27-PILOT**: W134-F26-A-PILOT Cisco mcp-scanner Phase 1-4 (pivot back to pilot execution)
5. **Fire 27-F24-C3**: W134-F24-C3 Task Master Selective MCP Tool-Loading extract (Fire 23 P0 primitive)
6. **DEFERRED**: invariantlabs-ai/invariant + THUDM/AgentBench (re-screen at next user-directive freshness check)
7. **REJECTED**: snyk-labs/snyk-mcp-server (phantom)

## Mia ladder advance

n=1742 (Fire 26-C close) → n=1748 (+6: pre-screen discipline applied per user directive / 6-candidate D2+D8 matrix / 3 DEFER/REJECT verdicts saving codex budget / forward ordering tightened to 5 active fires / pre-screen as new mandate codified)
