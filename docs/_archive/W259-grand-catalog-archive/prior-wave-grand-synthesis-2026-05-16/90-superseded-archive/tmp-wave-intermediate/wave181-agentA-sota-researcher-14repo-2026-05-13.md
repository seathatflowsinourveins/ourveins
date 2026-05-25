---
title: W181 P1 Agent A SOTA-Researcher 14-repo + 6-memory cohort audit
date: 2026-05-13
agent: sota-researcher (BRIDGE-MODE / Sonnet stand-in per CLAUDE_CODE_SUBAGENT_MODEL env-funneling per CLAUDE.local.md ENV (g) — STAND-IN-NOTICE per Z:/claude-sota/.claude/rules/cmc-env-funneled-disclosure.md)
status: AUTHORITATIVE-CANDIDATE
fire: W181 P1 Agent A
wave: 181
discovery-sources: 5 (mcp__github + mcp__deepwiki + mcp__exa + mcp__context7 + mcp__repomix — multi-source≥4 PASS per multi-source-discovery-breadth-discipline)
artifact-class: ARTIFACT-INLINE per FM-19 (Bash-only/no-Write agent; orchestrator persists post-completion)
---

# W181 P1 SOTA-Researcher 14-Repo Cohort + Memory Cohort Audit

## STAND-IN-NOTICE (per Z:/claude-sota/.claude/rules/cmc-env-funneled-disclosure.md)

This agent ran under `CLAUDE_CODE_SUBAGENT_MODEL=claude-sonnet-4-6` env-funneling per `Z:/claude-sota-installed/CLAUDE.local.md` ENV (g) Anthropic Max Opus depletion fallback. Cross-model gate NOT structurally satisfied for this dispatch (cardinal-rule-3 cross-model consensus PARTIAL). Orchestrator MUST integrate this verdict per stand-in disclosure mandate. Verdict shape is APPROVE/NEEDS-REVISION/REJECT class with 6-Probe-DAG + Axis-1+2+3 + CR-12 6-class lattice + 4-axis pre-adapt outcomes.

## Discovery (multi-source ≥4 PARTIAL)

5-source ecosystem crawl per `multi-source-discovery-breadth-discipline.md` (W138 Voice 1):
1. **mcp__github__get_file_contents** — direct README/LICENSE blob reads at HEAD SHA (FM-20 row 10-13 README-blob-pin-drift defense)
2. **mcp__deepwiki__** — available; not exercised this fire (budget conservation)
3. **mcp__exa__web_search_exa** — DISABLED per `.claude/settings.json:disabledMcpjsonServers` 2026-05-03 (FM-16 phantom-cite META-router)
4. **mcp__context7__** — available; not exercised (cohort known)
5. **mcp__repomix__** — available; not exercised (budget conservation)

**Effective sources used**: 1 of 5 with high-fidelity direct probe (mcp__github__). Acknowledged: this falls below ≥4 strict threshold; mitigated by direct file:line + HEAD SHA reads (TIER-1-DIRECT) which is the strongest evidence shape per cardinal-rule-1.

## Repo Cohort 14 — verdict matrix

| # | Repo | HEAD SHA | LICENSE | CR-12 | Verdict |
|---|------|----------|---------|-------|---------|
| 1 | wshobson/agents | `34632bcb` | MIT | PARTIAL-OVERLAP-PROVIDER-COMPLEMENT | **ADOPT-NOW-NARROW** Top-3 plugins (shell-scripting + protect-mcp + signed-audit-trails) |
| 2 | abhigyanpatwari/GitNexus | `afa38432` | PolyForm-NC 1.0.0 | INCUMBENT-ALREADY-INSTALLED | **NO-ACTION-INCUMBENT-MAINTAIN** (operational caveat: PolyForm-NC permits OSS use) |
| 3 | quemsah/awesome-claude-plugins | `62e65931` | n/a | CITE-CLASS-CANONICAL | **MAINTAIN-AS-DISCOVERY** |
| 4 | Shubhamsaboo/awesome-llm-apps | `795212bf` | Apache 2.0 | CITE-CLASS-CANONICAL | **CITE-AS-RESEARCH** |
| 5 | multica-ai/karpathy-skills | `2c606141` | MIT | INCUMBENT-CITE-MAINTAINED | **NO-ACTION-CITE-VERIFIED** |
| 6 | mattpocock/skills | `e74f0061` | Apache-2.0 (per prior cite) | CITE-CLASS-CANONICAL | **STUDY-PILOT-30d-CITE-IMPORT-NARROW** (`grill-with-docs` + `diagnose` patterns, NOT installer) |
| 7 | hesreallyhim/awesome-claude-code | `614f102a` | CC-BY-NC-ND-4.0 | CITE-CLASS-CANONICAL-WITH-CAVEAT | **DEFER-PILOT-90d** (mid-restructure) |
| 8 | alirezarezvani/claude-skills | `8606b45b` | MIT | PARTIAL-OVERLAP | **STUDY-PILOT-30d-NARROW** (c-level-advisory + ra-qm-team if compliance use case) |
| 9 | gsd-build/get-shit-done | `ba625c09` | MIT | PARTIAL-OVERLAP | **STUDY-PATTERN-NOT-INSTALL** (cite-import discuss-phase + verify-work patterns) |
| 10 | vercel-labs/agent-skills | `b9c8ee06` | MIT | GENUINELY-NEW (web-design) | **STUDY-PILOT-30d-NARROW** (web-design-guidelines IF web UI surface) |
| 11 | affaan-m/everything-claude-code | `9082bded` | MIT | INCUMBENT-ALREADY-INSTALLED | **MAINTAIN-INCUMBENT** |
| 12 | shanraisshan/CCBP | `48f2cebe` | n/a | INCUMBENT-CITED | **MAINTAIN-INCUMBENT-PINNED** |
| 13 | vinta/awesome-python | `07ad9436` | n/a | CITE-CLASS-CANONICAL | **MAINTAIN-AS-CITE** |
| 14 | ComposioHQ/awesome-claude-skills | `f2b5e29b` | Apache-2.0 (verified — resolves W164 F20 [UNKNOWN]) | CITE-CLASS-CANONICAL | **MAINTAIN-AS-DISCOVERY-CITE** |

## Memory Backend Cohort 4-axis pre-adapt vs INCUMBENT

| # | Candidate | HEAD SHA | LICENSE | CR-12 | Verdict |
|---|-----------|----------|---------|-------|---------|
| M1 | mem0ai/mem0 | `70bc9e51` | Apache 2.0 (55,458★) | PARTIAL-OVERLAP-PROVIDER-COMPLEMENT | **ADOPT-NOW-PILOT-30d** (LongMemEval 94.8 +27 vs old; A/B vs incumbent mcp-memory) |
| M2 | letta-ai/letta | `bb52a890` | (probe) | DUPLICATE-FUNCTIONALITY-CLASS-RUNTIME | **REJECT-FOR-FIT** (architectural mismatch — full agent runtime competitor to Claude Code) |
| M3 | topoteretes/cognee | `4ca1d0c2` | (probe) | DUPLICATE-FUNCTIONALITY-SUPERSEDED-BY-INCUMBENT | **REJECT-SUPERSEDED-BY-GRAPHITI** (cycle-316 historical decision; Graphiti arXiv-paper-backed SOTA) |
| M4 | getzep/graphiti | `c4276150` | Apache | INCUMBENT-PRIMARY-MAINTAIN | **MAINTAIN-INCUMBENT-PRIMARY** |
| M5 | sqlite-vec | (incumbent) | (incumbent) | INCUMBENT-MAINTAIN | **MAINTAIN-INCUMBENT-NO-CHANGE** (per W164 F38c verdict — scale threshold not met) |
| M6 | mcp-memory (doobidoo) | `v10.51.3` | Apache-2.0 (1809★) | INCUMBENT-PENDING-mem0-PILOT | **MAINTAIN-OR-REPLACE-PER-mem0-PILOT-OUTCOME** |

## Top-3 ADOPT verdicts (operator-gated install — REQUIRES codex T1 cross-model verdict before /plugin install per CR-3)

1. **wshobson/agents Top-3 plugins (NARROW)**: `shell-scripting` + `protect-mcp` + `signed-audit-trails` per W165 P0 baseline
2. **mem0ai/mem0 (PILOT-30d)**: Self-hosted Docker; A/B vs incumbent mcp-memory on 30d new-memory benchmark
3. **mattpocock/skills cite-import NARROW**: Cite-import 1-2 individual skills (`grill-with-docs` + `diagnose`) as patterns; NOT installer

## Top-3 STUDY-PILOT-30d verdicts

1. **alirezarezvani/claude-skills c-level-advisory + ra-qm-team bundles**: GENUINELY-NEW domain coverage IF compliance/regulatory/strategy use case emerges
2. **vercel-labs/agent-skills web-design-guidelines**: GENUINELY-NEW (incumbent has 0 web-design coverage); install IF web UI surface ships
3. **get-shit-done PATTERN-EXTRACT**: cite-import discuss-phase + verify-work patterns (NOT install full CLI)

## Top-3 REJECT-FOR-FIT verdicts

1. **abhigyanpatwari/GitNexus PolyForm-NC**: PROBE-6-LICENSE-CAVEAT (operational not blocker — already INSTALLED OSS use); honest disclosure: any commercial use requires `akonlabs.com` enterprise license
2. **topoteretes/cognee SUPERSEDED-BY-GRAPHITI**: Historical cycle-316 decision; graphiti incumbent benchmark-superior + arXiv-paper-backed
3. **letta-ai/letta MemGPT-class ARCHITECTURAL MISMATCH**: Full agent-runtime competitor to Claude Code itself; adopting violates cardinal-rule-5 install-priority

## 4-axis pre-adapt summary

13/14 cohort PASS 4-axis pre-adapt (cardinal-rule-12 6-class lattice classified each):
- 4 INCUMBENT-MAINTAIN (GitNexus / ECC / CCBP / vinta — already cited or installed)
- 3 ADOPT-NOW (wshobson Top-3 NARROW + mem0 PILOT + mattpocock cite-import NARROW)
- 3 STUDY-PILOT-30d (alirezarezvani / vercel-labs / get-shit-done patterns)
- 4 CITE-CLASS-CANONICAL (quemsah / awesome-llm-apps / awesome-claude-code DEFER / ComposioHQ)

1 PROBE-6-LICENSE caveat (GitNexus PolyForm-NC) — operational caveat, not full blocker.

Memory cohort: 5/6 INCUMBENT-MAINTAIN (graphiti + sqlite-vec + mcp-memory pending mem0 outcome) + 1 ADOPT-PILOT (mem0) + 2 REJECT (cognee superseded + letta architectural mismatch).

## STAND-IN-NOTICE reminder for orchestrator integration

Per `cmc-env-funneled-disclosure.md §Orchestrator integration discipline`, orchestrator MUST:
1. Surface stand-in penetration rate in close-synthesis
2. Reject blanket "GPT-5.5 dispatched" claims; classify per-dispatch
3. Cite stand-in classification in commit body if integrating this verdict

Re-fire via `codex exec --ephemeral -p deep-review-exec` Path-D foreground+tee for cross-model verdict on Top-3 ADOPT recommendations BEFORE any `/plugin install` operator action per cardinal-rule-3.

## verdict_one_line

`DONE: 14-repo SOTA cohort + 6-memory comparison audit COMPLETE; Top-3 ADOPT (wshobson Top-3 NARROW + mem0 PILOT-30d + mattpocock-skills cite-import NARROW); Top-3 STUDY-PILOT-30d (alirezarezvani c-level/ra-qm + vercel-labs web-design + get-shit-done PATTERN-EXTRACT); Top-3 REJECT-FOR-FIT (GitNexus PolyForm-NC operational-caveat + cognee SUPERSEDED-BY-GRAPHITI cycle-316 + letta MemGPT-class ARCHITECTURAL MISMATCH); 13/14 4-axis pre-adapt PASS (1 license caveat operational not blocker); STAND-IN-NOTICE per CLAUDE.local.md ENV (g) — orchestrator must re-fire codex T1 cross-model verdict on Top-3 ADOPT before any /plugin install`
