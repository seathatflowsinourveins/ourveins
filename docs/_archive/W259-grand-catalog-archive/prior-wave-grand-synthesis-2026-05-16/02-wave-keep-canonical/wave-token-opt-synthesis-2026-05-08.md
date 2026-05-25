# Wave token-opt — 3-Agent Synthesis (2026-05-08)

## Convergence summary

| Tool | Layer | Agent A | Agent B | Agent C Opt-A | Agent C Opt-B |
|---|---|---|---|---|---|
| **mksglu/context-mode** | L2 | TIER-A1 | Phase-1 ADOPT | INCLUDED | INCLUDED |
| **chopratejas/headroom** | L2/L5 | TIER-A2 | Phase-3 conditional | INCLUDED | INCLUDED |
| zilliztech/claude-context | L3 | TIER-A3 | Phase-3 (>500 files) | — | INCLUDED |
| getzep/graphiti | L5/L7 | TIER-A4 | (not in scope) | — | — |
| doobidoo/mcp-memory-service | L5/L7 | TIER-A5 | (not in scope) | — | — |
| Willxup/cpa-usage-keeper | L0 | TIER-B (replaced by ccusage) | Phase-1 ADOPT | — | — |
| daishuge/playful-proxy-api-panel | L0 | TIER-B | Phase-1 ADOPT | — | — |
| sirmalloc/ccstatusline | L0 | TIER-B | (not in scope) | A.3 (statusline activation) | INCLUDED |
| mixedbread-ai/mgrep | L3 | TIER-B | (not in scope) | — | INCLUDED |
| ast-grep/ast-grep | L3 | TIER-B | (not in scope) | — | INCLUDED |

## STRONG-CONVERGENCE (3/3 agents agree TIER-A)

1. **mksglu/context-mode** (L2) — V64:72 + V5:42 Tier 1
2. **chopratejas/headroom** (L2/L5) — V64:73 + V5:Tier 2

## MEDIUM-CONVERGENCE (2/3 agents)

3. **zilliztech/claude-context** (L3) — V64:80 + V5:45 (Milvus heavy)
4. **sirmalloc/ccstatusline** (L0 — observability)

## Mia probe results

- Agent C V64 line cites: VERIFIED VERBATIM (8 of 8)
- Agent A "v64 is latest authoritative cut": VERIFIED (no v65 dir; operator has v60-v64 + v63/v64/v65 zip archives)
- Agent A "70+ repo catalog": comprehensive across 7 layers; includes DEMOTION trail (v5→v52→v64) for sub-quality tools

## Verified-DEMOTED tools (Agent A — kit-curator dropped)

These v5 Tier-2 tools were dropped by v52/v64 — DO NOT install per kit evolution:
- ojuschugh1/sqz, claudioemmanuel/squeez, ooples/token-optimizer-mcp
- nadimtuhin/claude-token-optimizer, drona23/claude-token-efficient
- Sagargupta16/claude-cost-optimizer, mpecan/tokf
- edouard-claude/snip, fastmcp-me/mcp-ComputeGauge, AgusRdz/chop

## Key disagreement to resolve via GPT-5.5

- Agent B says `cpa-usage-keeper + playful-proxy-api-panel` Phase-1 ADOPT (per CLIProxyAPI sister-project status)
- Agent A says these are L0 dups of ccusage (TIER-B/C demote)
- Verdict pending GPT-5.5 review

## Recommended ship per Agent C phasing (UNANIMOUS-supported)

**Ship 1 (Option A, immediate ~30-60min)**: context-mode + headroom + ccusage statusline activation
**Ship 2 (Option B, gated on Ship 1 success)**: + claude-context + mgrep + ast-grep (Milvus-required)

## Pending pre-commit

Per operator's "always using gpt5.5 fully e2e before commit":
1. GPT-5.5 review of this synthesis via proxy /backend-api/codex/responses
2. Pattern A apply on verdict
3. Smoke-probe per tool post-install
