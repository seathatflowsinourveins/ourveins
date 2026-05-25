---
title: Wave 222 Agent I - Test/Eval + Cost-Management + Cache + Skill Ecosystem Deep Audit (PARTIAL DELIVERY)
status: PARTIAL-DELIVERY-FINDINGS-ONLY
date: 2026-05-15
wave: 222
fire: 1
agent: sota-researcher (Sonnet stand-in DISCLOSED per CLAUDE.local.md ENV (g))
artifact-class: test-cost-cache-skill-scoring-PARTIAL
predecessors: W221-D + W221-E + W221-F
delivery_note: agent returned findings summary but did NOT inline full body; asked for graphiti authorization instead (brief non-conformance — Wave 223 may re-dispatch with tightened brief if synthesis needs full details)
---

# STAND-IN-NOTICE

This dispatch ran as Sonnet stand-in per CLAUDE.local.md ENV (g). Cross-model gate NOT structurally satisfied. Agent returned a non-conforming delivery (findings summary only, no ARTIFACT-INLINE body). Orchestrator captured the 6 verified findings below from the agent's final return.

# Verified findings summary (6 items + 2 phantoms + 1 HNF)

## ADOPT-class verdicts (verified via mcp__github__search_repositories + mcp__github__get_file_contents 2026-05-15)

### 1. ryoppippi/ccusage — CITE-CLASS-CANONICAL ADOPT-NOW
- **Stars**: 14,219
- **License**: MIT
- **HEAD**: @ `80470d1a`
- **Class**: cost-management
- **Verdict**: ADOPT-NOW — no incumbent in Z:\claude-sota-pure for cost tracking; 4/4 cross-kit converged per W222-G; named-T1 maintainer (ryoppippi); STABLE-BURN-IN axis-3 (created 2025-05-29 = ~12mo)
- **Install primitive**: `npx ccusage@latest` or `npm install -g ccusage`

### 2. cnighswonger/claude-code-cache-fix — GENUINELY-NEW STUDY-PILOT
- **Stars**: 205 (LOW-STAR — Probe 6 vendor validation)
- **License**: MIT
- **HEAD**: @ `f0ba8e82`
- **Class**: prompt-cache optimization / Opus 4.7 burn mitigation
- **Verdict**: STUDY-PILOT.b — claims 95.5% cache hit rate empirical evidence with Crunchloop DAP + VM Farms production validation; Opus 4.7 2.4× Q5h burn mitigation per upstream README; LAUNCH-SPIKE axis-3 band; needs Probe 7.b 5-clause check
- **Install primitive**: TBD per upstream README; check Wave 224 codex T1 validation

### 3. mattpocock/skills — CITE-CLASS-CANONICAL (named-T1 author)
- **Stars**: 84,817
- **License**: MIT
- **Class**: skill ecosystem
- **Verdict**: CITE-CLASS-CANONICAL — Matt Pocock named-T1 author + Pragmatic Programmer/DDD/XP cite chain in skill descriptions; 7-skill subset recommendation for engineering-phase skill domain; SUSTAINED-MATURE axis-3
- **Adoption mode**: selective skill-import per cardinal-rule-8 cite-class (NOT bulk install — pin specific skills with content-SHA per port-note-discipline §4)

### 4. Anthropic skill-creator + skills marketplace — CITE-CLASS-CANONICAL OFFICIAL
- **Stars**: 135,051 (skills) + 19,446 (claude-plugins-official)
- **License**: Apache-2.0 (official Anthropic)
- **Class**: skill-creator workflow + official skill marketplace
- **Verdict**: CITE-CLASS-CANONICAL OFFICIAL — install via `/plugin marketplace add anthropics/skills` then `/plugin install skill-creator@official`
- **Note**: already W219 ADOPT-NOW row #1 anthropics/claude-plugins-official; this verdict CONFIRMS at HEAD-CURRENT

## PHANTOM-FLAG (2 items)

### 5. intelligent-compact (CLAUDE.local.md ENV (i) Rank #3 cite)
- **Status**: **NO STANDALONE GitHub repo found** via `mcp__github__search_repositories`
- **Cite source**: `Z:/claude-sota-installed/CLAUDE.local.md` ENV (i) Rank #3 PreCompact hook stack
- **Action required**: orchestrator MUST verify install-path / cite-source — possibly internal name for a shipped Anthropic plugin, NOT a separate GitHub repo
- **Note**: Wave 224 Pattern D codex T1 should resolve PHANTOM-FLAG conflict; this is a CITE-PATH question more than a repo-existence question

### 6. anthropic-evals / anthropic-claude-evals — HONEST-NON-FINDING
- **Status**: Neither exists as standalone Anthropic-hosted repo
- **Truth**: canonical eval methodology lives in `anthropics/claude-cookbooks` engineering blog references (NOT a dedicated repo)
- **Action**: Z:\claude-sota-pure should adopt eval methodology from claude-cookbooks references; NO standalone eval-framework install primitive available from Anthropic at this layer
- **Cite anchor**: pending Wave 223 Agent J verification of claude-cookbooks eval methodology section paths

## Cumulative phantom catches W221-W222

Wave 221+222 has now produced **5 PHANTOM-REFERENCE catches** demonstrating the discipline:
1. W221-E: `atlassian-labs/mcp-compressor` — PHANTOM (zero matches; W219 Agent C 88/100 score INVALID)
2. W221-E: `distill-mcp` — PHANTOM (zero matches; W219 Agent C 82/100 INVALID)
3. W221-E: `chopratejas/headroom` — PHANTOM per W221-E BUT W222-G found EXISTS at 1758★ → **CONFLICT — Wave 224 Pattern D resolution required**
4. W222-G: `fastmcp-me/mcp-ComputeGauge` — PHANTOM (cited in v5+v6+v7+v8 SOTA_REPOS_FINAL_LIST but zero matches)
5. W222-I: `intelligent-compact` — PHANTOM-FLAG (cited in CLAUDE.local.md ENV (i) Rank #3 but no standalone GitHub repo found)

# Domain-by-domain partial findings (extracted from Agent I summary)

## Domain A — Test/eval frameworks
- **anthropic-evals / claude-evals**: HONEST-NON-FINDING (neither exists as standalone repo)
- **Eval methodology**: lives in `anthropics/claude-cookbooks` (cite-class pattern; not install-class repo)
- **Gap**: claude-sota-pure has NO eval-framework installed; adoption mode = cite-class methodology only (not install)

## Domain B — Cost-management
- **ccusage** (14.2k★ MIT @ 80470d1a): ADOPT-NOW (no incumbent in sss; CR-12 GENUINELY-NEW for claude-sota-pure)

## Domain C — Cache layer
- **intelligent-compact**: PHANTOM-FLAG (CLAUDE.local.md cite has no standalone repo; needs orchestrator verification — possibly internal plugin name)
- **claude-code-cache-fix** (205★ MIT @ f0ba8e82): STUDY-PILOT.b — claims 95.5% cache hit rate + Opus 4.7 2.4× Q5h burn mitigation; LOW-STAR concern needs Probe 7.b
- **Anthropic prompt-caching primitive**: API-level (cache_control field) — not a separate install; operator-discipline pattern

## Domain D — Skill ecosystem deeper
- **mattpocock/skills** (84.8k★ MIT named-T1): CITE-CLASS-CANONICAL (selective 7-skill import)
- **Anthropic skill-creator** + **anthropics/skills marketplace** (135k+ + 19.4k): CITE-CLASS-CANONICAL OFFICIAL (already W219 ADOPT-NOW row #1)

# VERDICT (extracted from non-conforming return)

**STUDY-PILOT-CATALOG (PARTIAL)**: 6 verified findings + 2 PHANTOM-FLAGS + 1 HONEST-NON-FINDING (anthropic-evals). 

**Top-2 ADOPT-NOW from W222-I**:
1. **ryoppippi/ccusage** (14.2k★ MIT, cost-management CITE-CLASS-CANONICAL)
2. **Anthropic skill-creator marketplace** (already W219 confirmed)

**STUDY-PILOT.b**:
- cnighswonger/claude-code-cache-fix (205★ MIT, 95.5% cache hit rate empirical)
- mattpocock/skills 7-skill subset (84.8k★ MIT named-T1)

**PHANTOM-FLAGS for Wave 224 Pattern D resolution**:
- `intelligent-compact` (CLAUDE.local.md ENV (i) cite path question)
- `chopratejas/headroom` (W221-E vs W222-G CONFLICT)

**HONEST-NON-FINDING**:
- `anthropic-evals` / `anthropic-claude-evals` — eval methodology cite-class only (lives in claude-cookbooks); NO install-class eval-framework from Anthropic at this layer

# Orchestrator notes

**Agent I non-conformance**: Agent returned findings-summary-only instead of full ARTIFACT-INLINE body. Asked for graphiti authorization (violation of brief — agents should NOT ask for authorization, they should deliver per FM-19 fallback discipline). 

**Wave 223 consideration**: re-dispatch a tighter Agent I-redo if Wave 225 synthesis needs full domain-by-domain table (per-candidate SRA D1-D10 + 7-probe DAG + CR-12 disposition that was not delivered).

**Cross-model gate**: NOT structurally satisfied (Sonnet stand-in). Wave 224 Pattern D codex T1 BRIDGE-MODE re-fire MANDATORY on:
- All 4 ADOPT-NOW / STUDY-PILOT.b candidates
- 2 PHANTOM-FLAG resolutions (intelligent-compact + chopratejas/headroom W221-E vs W222-G conflict)
- 1 HONEST-NON-FINDING confirmation (anthropic-evals — verify methodology lives in claude-cookbooks)

**VERDICT (final)**: STUDY-PILOT-CATALOG-PARTIAL — 4 install-class candidates surfaced (1 ADOPT-NOW + 2 STUDY-PILOT.b + 1 CITE-CLASS-CANONICAL); 2 phantom-flags + 1 HNF queued for W224 Pattern D resolution. Agent delivery non-conformance noted — re-dispatch reserved for W223 if synthesis details needed.
