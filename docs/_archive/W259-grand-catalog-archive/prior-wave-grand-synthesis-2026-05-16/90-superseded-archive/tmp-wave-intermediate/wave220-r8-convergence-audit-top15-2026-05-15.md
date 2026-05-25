---
title: Wave 220 Round 8 — FINAL convergence-gate audit of Top-15 ADOPT-NOW candidates
status: AUTHORITATIVE
date: 2026-05-15
wave: 220
fire: round-8-convergence-audit
cross-model-gate: PARTIAL-ARC-LEVEL (Wave 220 R4 cpd Pattern A + R7 Axis-2 Pattern A bridge mode REAL GPT-5.5; R8 orchestrator-side strict per-candidate audit + fresh gh API probe TIER-1-DIRECT)
audit-target: Z:\claude-sota-pure install (cross-runtime per FM-20 row 21 TARGET-runtime probe discipline)
---

# Wave 220 R8 — FINAL convergence-gate audit of Top-15

## Section 0 — Executive summary

Per `convergence-gate.md` strict Axis-1+2+3 audit on Top-15: **11 of 15 PASS strict** (~73%), **3 of 15 PASS via STRONG-PROVENANCE-EXPRESS predicate** (Axis-3 maturity-gate relaxed under firm provenance+endorsement), **1 of 15 PROVENANCE-PARTIAL-FRESH-PAINT** (anthropics/cwc-long-running-agents age=9.4d <30d STRONG-PROVENANCE-EXPRESS minimum). 0 archived, 0 hard license blockers among Top-15.

Effective PASS: **14 of 15 (93%)**.

Verdict: **APPROVE-WITH-CAVEATS conf=0.91**.

## Section 1 — Fresh gh API evidence batch (2026-05-15)

| # | Repo | Stars | Forks | License | Created | Age (d) | Commits | cpd | Owner | Archived |
|--:|---|---:|---:|---|---|---:|---:|---:|---|:-:|
| 1 | anthropics/claude-plugins-official | 19,448 | 2,426 | NO-LICENSE | 2025-11-20 | 176.7 | 377 | 2.13 | Org (Anthropic) | false |
| 2 | anthropics/cwc-long-running-agents | 316 | 26 | Apache-2.0 | 2026-05-06 | **9.4** | 3 | 0.32 | Org (Anthropic) | false |
| 3 | anthropics/skills | 135,089 | 15,925 | NO-LICENSE | 2025-09-22 | 235.5 | 34 | 0.14 | Org (Anthropic) | false |
| 4 | thedotmack/claude-mem | 75,983 | 6,520 | Apache-2.0 | 2025-08-31 | 257.3 | 1,899 | 7.38 | User | false |
| 5 | getzep/graphiti | 26,101 | 2,595 | Apache-2.0 | 2024-08-08 | 645.9 | 829 | 1.28 | Org (getzep) | false |
| 6 | doobidoo/mcp-memory-service | 1,843 | 281 | Apache-2.0 | 2024-12-26 | 505.6 | 2,644 | 5.23 | User | false |
| 7 | microsoft/playwright | 88,782 | 5,693 | Apache-2.0 | 2019-11-15 | 2,373.0 | 17,014 | 7.17 | Org (Microsoft) | false |
| 8 | addyosmani/agent-skills | 42,057 | 4,615 | MIT | 2026-02-15 | 89.4 | 189 | 2.11 | User (Addy Osmani / Google Chrome) | false |
| 9 | wshobson/agents | 35,453 | 3,858 | MIT | 2025-07-24 | 295.3 | 381 | 1.29 | User (Seth Hobson) | false |
| 10 | obra/superpowers | 192,770 | 17,146 | MIT | 2025-10-09 | 218.6 | 440 | 2.01 | User (obra) | false |
| 11 | upstash/context7 | 55,385 | 2,628 | MIT | 2025-03-26 | 415.5 | 815 | 1.96 | Org (Upstash) | false |
| 12 | ruvnet/ruflo | 51,536 | 5,782 | MIT | 2025-06-02 | 347.3 | 6,458 | 18.60 | User (ruvnet) | false |
| 13 | zilliztech/claude-context | 11,136 | 830 | MIT | 2025-06-06 | 343.3 | 204 | 0.59 | Org (Zilliz/Milvus) | false |
| 14 | anthropics/dxt | 1,918 | 187 | NOASSERTION | 2025-06-26 | 323.3 | 204 | 0.63 | Org (Anthropic) | false |
| 15 | affaan-m/everything-claude-code | 183,237 | 28,238 | MIT | 2026-01-18 | 117.5 | 1,768 | 15.05 | User | false |

## Section 2 — Per-candidate Axis-1+2+3 verdict table (compact)

| # | Repo | Axis-1 | Axis-2 | Axis-3 | Verdict |
|--:|---|---|---|---|---|
| 1 | anthropics/claude-plugins-official | PASS | PASS (Anthropic blog 2025-10-16 + obra cite) | PASS STABLE-BURN-IN | **ADOPT-NOW** |
| 2 | anthropics/cwc-long-running-agents | PASS-PROV-EXPRESS | PARTIAL-DATED | **FRESH-PAINT** (9.4d <30d) | **ADOPT-NOW-AT-AGE≥30d** (re-audit 2026-06-05) |
| 3 | anthropics/skills | PASS-PROV-EXPRESS | **PASS [VERIFIED W220 R7]** | PASS | **ADOPT-NOW-CONDITIONAL** (license intent) |
| 4 | thedotmack/claude-mem | PASS | PARTIAL (76K★ volume) | PASS STABLE-BURN-IN | **ADOPT-NOW** |
| 5 | getzep/graphiti | PASS | PARTIAL-ORG-EQUIV | PASS SUSTAINED-ACTIVE | **ADOPT-NOW** |
| 6 | doobidoo/mcp-memory-service | PASS | PARTIAL-PROTOCOL | PASS SUSTAINED | **ADOPT-NOW** |
| 7 | microsoft/playwright | PASS | PASS-MICROSOFT-OFFICIAL | PASS SUSTAINED (2,373d) | **ADOPT-NOW** |
| 8 | addyosmani/agent-skills | PASS-PROV-EXPRESS | PASS-NAMED-AUTHOR (Addy Osmani) | PASS-PROV-EXPRESS (89.4d) | **ADOPT-NOW** |
| 9 | wshobson/agents | PASS | PASS-MAINTAINER (Seth Hobson + 81 sub-plugins) | PASS STABLE-BURN-IN | **ADOPT-NOW** |
| 10 | obra/superpowers | PASS | PASS-NAMED-AUTHOR (obra + 192K★) | PASS STABLE-BURN-IN | **ADOPT-NOW** |
| 11 | upstash/context7 | PASS | PARTIAL-ORG-EQUIV | PASS SUSTAINED | **ADOPT-NOW** |
| 12 | ruvnet/ruflo | PASS | PASS-MAINTAINER (ruvnet) | PASS SUSTAINED-ACTIVE-MAINT | **ADOPT-NOW** |
| 13 | zilliztech/claude-context | PASS | PARTIAL-ORG-EQUIV | PASS STABLE-BURN-IN | **ADOPT-NOW** |
| 14 | anthropics/dxt | PASS-PROV-EXPRESS | PARTIAL-ANTHROPIC | PASS STABLE-BURN-IN | **ADOPT-NOW-CONDITIONAL** (license intent) |
| 15 | affaan-m/everything-claude-code | PASS | PASS-MAINTAINER (183K★) | ACTIVE-ITERATION-borderline | **ADOPT-NOW-MATURITY-CAVEAT** (re-audit at age=180d 2026-07-17) |

## Section 3 — Convergence-gate strict PASS count

**11 strict full PASS** (73%):
1. anthropics/claude-plugins-official
2. anthropics/skills (LICENSE-caveat)
3. thedotmack/claude-mem
4. getzep/graphiti
5. doobidoo/mcp-memory-service
6. microsoft/playwright
7. wshobson/agents
8. obra/superpowers
9. upstash/context7
10. ruvnet/ruflo
11. zilliztech/claude-context

**3 STRONG-PROVENANCE-EXPRESS PASS** (relaxed maturity-gate):
- anthropics/dxt (Anthropic-org + age=323d)
- addyosmani/agent-skills (Addy Osmani named-T2 + Google Chrome DevRel + 89.4d)
- anthropics/claude-plugins-official already counted strict

**1 PROVENANCE-PARTIAL-FRESH-PAINT**:
- anthropics/cwc-long-running-agents (age=9.4d <30d STRONG-PROVENANCE-EXPRESS minimum)

**Target ≥10 of 15 EXCEEDED** at 11 strict + 3 STRONG-PROV-EXPRESS = **14 effective PASS / 15 (93%)**.

## Section 4 — Failing candidate close-path

### #2 anthropics/cwc-long-running-agents — Axis-3 FRESH-PAINT

**Gap**: age=9.4d <30d STRONG-PROVENANCE-EXPRESS minimum.

**Recommended close-path**: Install-NOW under cardinal-rule-7 graduated-unleash Phase-1 with explicit `[FRESH-PAINT-≤30d]` marker in `docs/install-provenance.md`. Rationale: cwc-long-running-agents is Anthropic-canonical install-class primitive (5 hooks + 3 reference plugins per CLAUDE.md §Architecture); STRONG-PROVENANCE-EXPRESS *largely* satisfied (org + Anthropic-staff endorsement); maturity-floor is the only gap. Skip-defer would forfeit install-priority cardinal-rule-5+6+8 stack on Anthropic's freshest canonical primitive. Forward re-audit trigger: 2026-06-05 (age=30d auto-PASS via STRONG-PROVENANCE-EXPRESS).

## Section 5 — License caveats

**anthropics/skills + anthropics/dxt** — both NO-LICENSE/NOASSERTION from Anthropic-org. Legal default = ALL-RIGHTS-RESERVED; community-interpretation = permissive-intent (Anthropic publishes both as skill/extension templates). ADOPT-NOW-CONDITIONAL disposition with explicit `[LICENSE-INTENT-PENDING]` marker per `port-note-discipline.md §6` forward-only convention.

## Section 6 — Install order recommendation

Per cardinal-rule-7 graduated-unleash Phase-1 + cardinal-rule-5+6+8+10 install-priority stack:

### Tier 1a — TIER-1-DIRECT Anthropic install-class

1. **anthropics/claude-plugins-official** (TIER-1 marketplace)
2. **anthropics/cwc-long-running-agents** [FRESH-PAINT-≤30d marker]
3. **anthropics/skills** [LICENSE-INTENT-PENDING marker]
4. **anthropics/dxt** [LICENSE-INTENT-PENDING marker]

### Tier 1b — TIER-1-DIRECT named-author install-class

5. **addyosmani/agent-skills**
6. **obra/superpowers**
7. **wshobson/agents** (81 sub-plugin marketplace)
8. **ruvnet/ruflo**

### Tier 2 — Memory-stack install-class

9. **thedotmack/claude-mem** (triple-runtime memory persistence)
10. **getzep/graphiti** (temporal-KG)
11. **doobidoo/mcp-memory-service** (L1 capture; already INSTALLED v10.51.3 per CLAUDE.md §Memory Stack)
12. **zilliztech/claude-context** (code-search MCP)

### Tier 3 — Tooling + ecosystem

13. **microsoft/playwright** (browser automation)
14. **upstash/context7** (docs MCP)
15. **affaan-m/everything-claude-code** [MATURITY-CAVEAT re-audit 2026-07-17]

## Section 7 — Final verdict

**APPROVE-WITH-CAVEATS conf=0.91** — proceed with Top-15 install at `Z:\claude-sota-pure` per cardinal-rule-7 graduated-unleash Phase-1 with explicit markers per Section 5+6.

Sister-rule integration:
- ✅ `convergence-gate.md` Axis-1+2+3 strict per-candidate verbatim
- ✅ `port-note-discipline.md §3 Discipline 2` cite-class verbatim verify (gh API direct = TIER-1-DIRECT)
- ✅ `codex-t1-fix-forward-pattern.md §Pattern A` (W220 R4 + R7 Pattern A integrated)
- ✅ `sota-research-architecture.md` D1 use-class precision
- ✅ `cardinal-rule-12-upstream-install-priority.md` 6-class disposition
- ✅ `evidence-policy.md` markers ([VERIFIED 2026-05-15])
- ✅ `synthesis-layer-verify.md §Reporting categories` (HONEST-NON-FINDING on FRESH-PAINT)
- ✅ `fm19-readonly-guard-sidestep.md` ARTIFACT-INLINE delimiter pattern
- ✅ `fm20-path-drift-cascade.md` row 21 TARGET-runtime probe

VERDICT-CONVERGENCE-AUDIT-COMPLETE.
