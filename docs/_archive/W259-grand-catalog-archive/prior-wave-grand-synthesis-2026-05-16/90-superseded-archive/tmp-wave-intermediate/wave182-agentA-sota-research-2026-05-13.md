---
title: W182 5-Repo Probe-DAG Audit
status: AUTHORITATIVE
date: 2026-05-13
agent: sota-researcher
wave: 182
---

# W182 5-Repo Probe-DAG Audit — sota-researcher report

## §1 Per-Repo Probe-DAG Results

### Repo #1: wshobson/agents
**HEAD**: `ece811f23310a37ceb43496dbac0e244fe6845b6` [VERIFIED 2026-05-13]
**Marketplace**: `claude-code-workflows` v1.6.0 by Seth Hobson — ALREADY INSTALLED (3/80 plugins: protect-mcp + shell-scripting + signed-audit-trails)
- P1-P3 PASS / P4 PARTIAL (77/80 plugins available unused; cardinal-rule-9 sibling-bleed applies) / P5 HARD-GATE on `conductor` only / P6 MIT PASS / P7 `.b` STUDY-PILOT eligible for non-conductor plugins
- A1+A2+A3 PASS via 4-org Axis-1 (Anthropic + shanraisshan + OpenAI + addyosmani + wshobson named-T2)

### Repo #2: alirezarezvani/claude-skills
**HEAD**: `7d493fed97e4d57553630e1a2432c1c02bf5b2b3` [VERIFIED 2026-05-13]
**Installed?** NO
- P1 PASS (542 SKILL.md) / P2-P6 PASS / P7 `.b` STUDY-PILOT-eligible
- A1+A2+A3 PARTIAL — alirezarezvani named-author + SkillCheck badge; no independent T2 dated artifact verified this fire

### Repo #3: mattpocock/skills
**HEAD**: `733d312884b3878a9a9cff693c5886943753a741` [VERIFIED 2026-05-13]
- P5 **HARD-GATE FAIL** — `setup-matt-pocock-skills/SKILL.md:4` "disable-model-invocation: true" + 3 sequential interactive prompts. Structurally identical to iter-84/85/92/93 HARD-GATE cohort (n=4 in `ahfv-seven-sub-classes.md` mode-harness-shape row)
- **REJECT-FOR-FIT** — Probe-5 blocker dominates per FM-09 2-stage validation contract

### Repo #4: vercel-labs/agent-skills
**HEAD**: `b9c8ee0643d87d3c5a953d1e22382ff2ead39229` [VERIFIED 2026-05-13]
- P6 PARTIAL — NO root LICENSE file; `packages/*/package.json:license = "MIT"` only → `[INFERRED MIT pending root LICENSE]`
- P4 PARTIAL — `react-best-practices` cataloged in `antigravity-awesome-skills/CATALOG.md` as DISCOVERABLE-only (FM-16 phantom-cite-to-disabled-MCP class)
- A1-A3 PASS via Vercel-org STRONG-PROVENANCE-EXPRESS

### Repo #5: gsd-build/get-shit-done
**HEAD**: `3aaed8f5d7c3492678b867e6687d42c88fe227e5` [VERIFIED 2026-05-13]
- All probes PASS; already TIER-2 cite in `research-protocol.md:88-89` per Wave research 2026-04-29
- A1+A2+A3 PASS — 7 named-T2 practitioner reviews; 58,543★; npm-published

## §2 Verdicts

| Repo | Verdict |
|---|---|
| wshobson/agents | STUDY-PILOT-NARROW (marketplace installed; `/plugin install agent-teams` + `comprehensive-review` recommended) |
| alirezarezvani/claude-skills | STUDY-PILOT-NARROW (5-clause check on 3-5 narrow skills, 1/fire) |
| mattpocock/skills | **REJECT-FOR-FIT** (cohort n=4 HARD-GATE; counted iter-92) |
| vercel-labs/agent-skills | STUDY-PILOT-NARROW (React-context only; defer pending demand + root LICENSE) |
| gsd-build/get-shit-done | STUDY-PILOT-NARROW (cite-extract `gsd-graphify` / `gsd-spike` / atomic-commit patterns) |

## §3 Close-Synthesis

5-repo audit: 1 REJECT-FOR-FIT + 4 STUDY-PILOT-NARROW. Key: wshobson marketplace ALREADY INSTALLED (77/80 plugins uninstalled = cite-import-AMBER opportunity at TIER-1-DIRECT). FM-16 phantom-cite catch in `antigravity-awesome-skills/CATALOG.md` aggregator. License gap on vercel-labs (`[INFERRED MIT pending verification]`).

## §4 Next-Action

**INSTALL PRIORITY 1**: `/plugin install agent-teams@claude-code-workflows` + `/plugin install comprehensive-review@claude-code-workflows` (already-trusted marketplace; CR-12 PRIMARY upstream-install-priority).

**DEFER**: mattpocock (REJECT cohort), alirezarezvani (5-clause check queue), vercel-labs (demand-pending + license), gsd-build (per-command `.b` 5-clause check).

**HONEST-NON-FINDING**: 0 ADOPT-NOW this fire — all STUDY-PILOT require 5-clause completion. Per `synthesis-layer-verify.md §Reporting categories` HNF is highest-value outcome.

## Worktree
Agent A worktree: `Z:\claude-sota-installed\.claude\worktrees\agent-a683d1ebe2f1b437e` branch `worktree-agent-a683d1ebe2f1b437e` — auto-cleanup if no changes.

## Cite class

`constituents=[TIER-1-DIRECT @ 5-repo HEAD SHAs via `git -C ... rev-parse HEAD`, TIER-1-DIRECT @ ahfv-probe-dag.md + convergence-gate.md + ahfv-seven-sub-classes.md sister-rule, TIER-3-LOCAL-OPERATOR-DERIVED @ sota-researcher Sonnet stand-in dispatch 2026-05-13]; effective_tier=TIER-3-LOCAL-COMPOSITION` per `Z:/claude-sota/.claude/rules/citation-discipline.md` rule #8 MIN_PRECEDENCE.
