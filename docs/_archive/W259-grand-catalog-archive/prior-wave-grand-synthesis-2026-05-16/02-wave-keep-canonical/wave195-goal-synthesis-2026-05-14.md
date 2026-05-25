<!--
title: W195 /goal synthesis — R1-R7 evidence trail
status: AUTHORITATIVE
date: 2026-05-14
agent: goal-prompt-synthesis skill (orchestrator + 1 R1-R3 grounding fork a71bbc4d)
parallel-arc: W194 (commit 2efabdd glob-narrowing) — cross-cited, not overwritten
-->

# W195 /goal synthesis — R1-R7 evidence trail

Deliverable: `tmp/wave195-goal-paste-ready-2026-05-14.md` (3468 bytes / ~3418 chars — under operator ≤3500 ceiling).
Pipeline: `goal-prompt-synthesis` skill R1-R7. One R1-R3 grounding fork (context-discipline: repo-read output kept out of orchestrator context).

## R1 — multi-source discover (16 repos)

`gh api` + `git ls-remote` returned no output this fire (sandbox auth/network). SHAs from local-clone state where available; predicate MANDATE (3) forces VERIFY-AT-EXEC for all.
Pinned-from-local: superpowers `e7a2d164`, CCBP `48f2ceb`, mattpocock `733d3128`, vercel-labs `b9c8ee06`, karpathy `2c606141`. Remaining 11 repos: [UNKNOWN-VERIFY-AT-PREDICATE-EXEC].

## R2 — 6-Probe-DAG (5 genuinely-new candidates)

- wshobson/agents → **ADOPT-NOW (partial-already)** — local has 2/185 agents (devops-troubleshooter, security-auditor). Unadopted high-value: `plugins/context-management` (context-save/restore), `plugins/agent-teams`. Probe4 NOT-duplicate, Probe5 clean plugin-install, Probe7.b DEMAND-CREATES-NEW-WORKFLOW.
- gsd-build/get-shit-done → **STUDY-PILOT** — `docs/context-monitor.md` bridge-file pattern cite-adaptable now; full system Probe5 HARD-GATE risk on interactive `/gsd-init`.
- quemsah/awesome-claude-plugins → **STUDY-PILOT (discovery-only)** — catalog, not install-class.
- Shubhamsaboo/awesome-llm-apps → **REJECT-FOR-FIT** — Probe5 mode-harness mismatch (standalone Streamlit apps, not CC primitives).
- shareAI-lab/learn-claude-code → **STUDY-PILOT (reference-only)** — cite-class harness philosophy, no install surface.

## R3 — convergence findings

### SOTA auto-compact (≥4-org convergence)
Pattern: **bridge-file + PostToolUse-injected `additionalContext` ADVISORY (NOT `decision:block`) + state-save/restore command**. Cites: GSD `docs/context-monitor.md` (WARN≤35% / CRIT≤25% remaining), ECC `scripts/hooks/pre-compact.js`, wshobson `plugins/context-management`, CCBP `claude-settings.md:826,967`.
**KEY FINDING**: the operator-perceived "hard limit" is NOT mechanical — local `userpromptsubmit_compact_threshold.py` WARN/HIGH/CRIT are all advisory (`additionalContext`+`systemMessage`, no `decision:block`). The blocking behavior is RULE-layer: `auto-compact-discipline.md` Rank#3 "wrap at clean boundary" trains a STOP. Fix = recalibrate rule STOP→save-compact-restore + install wshobson context-management for the automated loop.

### Decision-layer upstream-parity
- **Mia** → HAS-UPSTREAM-PARITY: superpowers `verification-before-completion` + `subagent-driven-development` 2-stage spec-reviewer ("DO NOT trust the report"). REPLACEABLE.
- **FM-17.e** → HAS-PARTIAL-PARITY: GSD `.changeset/quota-failure-classification` + wshobson `agent-teams` retry semantics. REPLACEABLE-with-re-anchor.
- **CADP** → HONEST-NON-FINDING (local-novel; partial parity via awesome-agentic-patterns already cited). KEEP.
- **Path-P** → HONEST-NON-FINDING (codex-CLI operational; local-novel). KEEP.
- **Pattern-A** → PARTIAL-PARITY: ≈ CCBP RPI Implement-phase + closed-loop. KEEP, re-anchor cite.

## R4 — compose
Predicate composed at 3468 bytes. Structure: header+PARALLEL token / WHY / P0-P4 / MANDATES / UNLEASH / SHIP / STOP. P0 (compact-automation) flagged SHIP-FIRST-standalone — highest leverage (unblocks self-/compact + /goal automation).

## R5 — agent-team standing-directive conformance
Predicate MANDATE (1) carries: AGENT TEAM per advanced-agent-team-standing-directive.md inv 1-8, CADP max-3 concurrent, BRIDGE-MODE ≥2 agents (real GPT-5.5 via codex w/ repo source access), ARTIFACT-INLINE FM-19, Mia pre-apply on returns. ✓

## R6 — SessionStart preload-discipline gate
Predicate STOP carries: 5-backend hash verify per sessionstart-preload-discipline.md §contract step4 (mcp-memory + graphiti + tmp-artifact + MEMORY.md + provenance), ≥4/5 PASS = STOP-eligible. ✓

## R7 — parallel-worktree predicate composition
Predicate header carries `PARALLEL: branch=w195-sota-equiv, eee --worktree`; STOP carries `git worktree add -b w195-sota-equiv` (FM-02 sub-c absorption defense); close-synthesis filename distinct (`wave195-*`); MEMORY.md L2 entry mandated distinct from W194; W194 commit 2efabdd cross-cited. ✓

## Cite class
`constituents=[TIER-1-DIRECT @ goal-prompt-synthesis SKILL.md R1-R7 pipeline, TIER-1-DIRECT @ superpowers e7a2d164 + CCBP 48f2ceb + GSD/ECC/wshobson (SHAs verify-at-exec), TIER-2 @ ahfv-probe-dag.md + convergence-gate.md + advanced-agent-team-standing-directive.md + sessionstart-preload-discipline.md + parallel-session-worktree-isolation.md, TIER-3-LOCAL-OPERATOR-DERIVED @ W195 fork a71bbc4d R1-R3 grounding 2026-05-14]; effective_tier=TIER-3-LOCAL-COMPOSITION`

## Honest limits
- 11/16 repo SHAs [UNKNOWN] this fire (sandbox auth) — predicate forces verify-at-exec.
- R2 Probe-DAG was LIGHT (predicate-grounding depth, not full line-by-line — that is P3's mandate).
- Decision-layer parity verdicts are fork-research-grade; predicate P2 mandates codex GPT-5.5 E2E verdict before any replace lands.
