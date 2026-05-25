---
title: W172 Fire 1 Agent A — P5 chunk-1 5-repo deep-audit
status: AUTHORITATIVE
date: 2026-05-13
agent: sota-researcher (W172-F1-AgentA)
priority: P5
coverage: 5/14 = 35.7%
cite_class: |
  constituents=[
    TIER-1-DIRECT @ mcp__github__search_repositories + get_file_contents probes (5 repos),
    TIER-2 @ Z:/claude-sota-installed/.claude/rules/convergence-gate.md + ahfv-probe-dag.md,
    TIER-3-LOCAL-COMPOSITION @ W172 P5 chunk-1 verdict synthesis
  ]; effective_tier=TIER-3-LOCAL-COMPOSITION
---

## Per-repo audit table

| # | Repo | HEAD | License | Stars | Axis-1 | Axis-2 | Axis-3 | Probes 1-7 | CR-12 | Verdict |
|---|---|---|---|---|---|---|---|---|---|---|
| 1 | wshobson/agents | `34632bcb` (2026-05-11) | MIT | 35,313★ | STRONG-PROVENANCE-EXPRESS Seth Hobson named-T1 | n=2+ (Hobson + Pranay Yadav PR #505) | age=294d cpd 3-5/d STABLE-BURN-IN | P4 **FAIL-DUPLICATE-RISK** (162-plugin overlap vs claude-plugins-official + addy incumbents); P7.b STUDY-PILOT (W165 Top-3 cherry-pick) | **PARTIAL-OVERLAP** | **STUDY-PILOT-NARROW** (W165 Top-3 install-eligible) |
| 2 | abhigyanpatwari/GitNexus | `88d3df77` (2026-05-13) | PolyForm-NC-1.0.0 | 38,153★ | STRONG-PROVENANCE Patwari + akonlabs + LadybugDB | n=2+ (Patwari + PR #1543 co-authors) | age=284d cpd 10-15/d STABLE-BURN-IN | P4 **INCUMBENT** (manifest §7 INSTALLED W164 F38b); P6 PolyForm-NC OK for personal | **INCUMBENT-CITE-CLASS-CANONICAL** | **KEEP** no-op |
| 3 | quemsah/awesome-claude-plugins | `62e65931` (2026-05-12) | **NO LICENSE FILE** | 689★ | WEAK single-org | n=1 only — **Axis-2 FAIL** | age=195d cpd 5-10/d borderline | P6 **FAIL LICENSE-BLOCKER**; P7.a DEMAND-ABSENCE | **REJECT-FOR-FIT** | **REJECT** (no install, no cite) |
| 4 | Shubhamsaboo/awesome-llm-apps | `795212bf` (2026-05-09) | Apache-2.0 | 110,127★ | STRONG-PROVENANCE Saboo named-T1 + 796+ PR multi-org | n=2+ | age=380d cpd 5-8/d STABLE-BURN-IN | All PASS; P7.b RAG/agent reference patterns | **CITE-CLASS-CANONICAL** (W164 F20 already disposition'd) | **CITE-CLASS-CANONICAL** no install |
| 5 | multica-ai/andrej-karpathy-skills | `2c606141` (UNCHANGED) | MIT | 128,193★ | STRONG-PROVENANCE Karpathy TIER-1-NAMED-AUTHOR-QUOTE | n=3+ | age=472d STABLE-BURN-IN | P4 INCUMBENT (CLAUDE.md L142 pin matches) | **INCUMBENT-CITE-CLASS-CANONICAL** | **KEEP** SHA unchanged ✅ |

## Cross-repo convergence

- **CR-12 lattice**: GENUINELY-NEW=0 / PARTIAL-OVERLAP=1 (wshobson) / INCUMBENT-CITE=3 (GitNexus+Shubhamsaboo+karpathy) / REJECT=1 (quemsah)
- **License convergence**: 3 MIT + 1 Apache-2.0 + 1 PolyForm-NC + 1 NO-LICENSE = 60% permissive
- **Axis-3 stability**: 5/5 PASS STABLE-BURN-IN
- **Probe-4 plugin-namespace duplicates**: 2/5 INCUMBENT + 1 PARTIAL-OVERLAP
- **FM-20 catch**: wshobson HEAD 11-day drift from W166 F2 `38ff7365` → current `34632bcb` (n=9 candidate sub-class HEAD-SHA-staleness)
- **STRONG-PROVENANCE-EXPRESS**: 4/5 satisfy Axis-1 via named-author-maintainer; quemsah single-org WEAK

## Forward-queue chunk-2 + chunk-3 (9 remaining)

**Chunk-2 (5)**: mattpocock/skills + hesreallyhim/awesome-claude-code + alirezarezvani/claude-skills + gsd-build/get-shit-done + vercel-labs/agent-skills

**Chunk-3 (4)**: affaan-m/everything-claude-code + shanraisshan/claude-code-best-practice + vinta/awesome-python + obra/superpowers

## CR-3 Phase 1 bootstrap exception disclosure

This audit is Sonnet stand-in subagent per CLAUDE.local.md ENV (g) commented-out → Sonnet 4.6 fallback nominal. True GPT-5.5 cross-model gate satisfaction requires orchestrator-direct `codex exec --ephemeral -p deep-review-exec` foreground+tee on this artifact per cmc-t1-t7-lifecycle.md Phase 1 bootstrap exception.

## ARTIFACT-INLINE: tmp/wave172-fire1-agentA-p5-chunk1-audit-2026-05-13.md

verdict_one_line: DONE: 5/14 P5 audit complete; 1 REJECT (quemsah Probe-6+Probe-7.a) + 3 INCUMBENT-CITE + 1 PARTIAL-OVERLAP STUDY-PILOT-NARROW (wshobson W165 Top-3); FM-20 n=9 candidate HEAD-SHA-drift; chunk-2+3 queue 9 repos.
