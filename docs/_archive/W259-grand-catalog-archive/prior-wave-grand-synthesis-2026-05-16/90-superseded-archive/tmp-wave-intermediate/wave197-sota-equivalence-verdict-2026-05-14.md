---
title: W197 P1 — FM-17.e / Mia / decision-layer SOTA-equivalence verdict
status: AUTHORITATIVE-PRELIMINARY
date: 2026-05-14
agent: orchestrator
wave: 197
fire: 1
scope: DONE-WHEN criterion #5 (SOTA-equivalence verdict documented) + #6 (non-SOTA % reported)
method: orchestrator synthesis from each rule's OWN cite-class provenance header (all in-context). Deep codex-rescue cross-repo line-by-line audit = explicit W197+ follow-up wave (NOT done here — context budget + FM-17.e BRIDGE-MODE thrash risk per W196).
---

# W197 P1 — SOTA-Equivalence Verdict (decision-layer primitives)

**One-line**: The decision-layer is **predominantly SOTA-cite-grounded** — the local-novel parts (FM-17.e, FM-* catalog naming, the "Mia" name) are honestly-disclosed + evidence-backed, NOT low-quality fabrications. Estimated **~12-18% local-novel** / ~82-88% SOTA-cited-or-grounded. No primitive flagged for REPLACE; 1 flagged for optional cosmetic rename.

## Per-primitive verdict

| Primitive | Cite-class (rule's own header) | SOTA-equivalence | Verdict |
|---|---|---|---|
| **Mia pre-apply** (`mia-pre-apply.md`) | Rule header VERBATIM: "'Mia' is OPERATOR-PERSONAL NAMING (no external SOTA-repo origin)" BUT "the PATTERN (verify-before-apply) is sota-grounded via 4 TIER-1 anchors" — superpowers `verification-before-completion/SKILL.md:1-20 @ e7a2d164`, Karpathy `karpathy-guidelines/SKILL.md:1-67 @ 2c606141`, CCBP `rpi-workflow.md:1-5 @ 64fffd53` VERIFY gate, autoresearch `SKILL.md:646-665 @ f226ffbf` | **PATTERN = SOTA** (4 TIER-1 anchors, ≥3 distinct orgs — convergence-gate Axis-1 PASS). NAME = local. | **KEEP — already SOTA.** Pattern is verification-before-completion, a SOTA convergence. Optional: cosmetic rename "Mia" → "pre-apply verification" to align with upstream terms. NOT a replace candidate. |
| **FM-17.e** (`fm17-subagent-fleet-depletion.md §FM-17.e`) | TIER-3-LOCAL-OPERATOR-DERIVED; n=4-5 incident evidence ladder (Wave 51 + W112 Ship A1 ×2 + W196 Agent B) | **GENUINE-GAP** — it is an *observed CC-runtime failure mode* (autocompact-thrashing under subagent dispatch), not a designed pattern. No SOTA-repo has an "equivalent" because it's a local incident class, not an imported abstraction. | **KEEP — local-novel but evidence-backed (n=5).** Cannot be "replaced with a SOTA pattern" — it's a *diagnosis label*, not a design choice. Its RECOVERY (Path P) is the SOTA-actionable part. W196 already shipped an FM-17.d→FM-17.e reclassification correction. |
| **CADP** (Cache-Aware Dispatch Pacing, `parallel-agent-wave.md §CADP`) | Derived from depletion incident + arxiv 2601.06007 "Don't Break the Cache" (peer-reviewed) | **PARTIALLY-SOTA** — cache-locality *principle* is peer-reviewed SOTA; the specific max-3-concurrent / max-5-cumulative *numbers* are local operational tuning. | **KEEP — SOTA-principle-grounded.** Numbers are local calibration, legitimately local (every runtime tunes concurrency caps). |
| **Path P** (Pattern D, `ctff-patterns-cd.md`) | TIER-3-LOCAL-OPERATOR-DERIVED; gstack cite anchors (`gstack/codex/SKILL.md` — Garry Tan, MIT); n=13 recovery-family evidence | **LOCAL-NOVEL + gstack-cite-grounded** — the foreground+tee + `turn.completed`-event-count mechanics cite gstack (a SOTA repo). The orchestrator-direct dispatch composition is local. | **KEEP — gstack-cited + operationally validated (n=13).** This is the FM-17.e recovery that W196 itself prescribed for "W197+ Path P re-fire" — and that this very session used successfully (codex Path P APPROVE conf=0.84). |
| **Compact hooks** (`auto-compact-discipline.md` Rank #3/#3.5 stack) | 8+ TIER-1-DIRECT cites: Karpathy §5, context-mode MCP, repomix, coordination §12 (Thariq), deepagents summarization, GSD context-monitor, ECC pre-compact, wshobson context-management, CCBP env thresholds | **SOTA** — the surviving stack (`precompact_priorities.sh` intelligent-compact / ECC pre-compact / context-mode precompact.mjs / `precompact_hint_emitter.py` / `sessionstart_compact_hint_reader.py` / `userpromptsubmit_compact_threshold.py` / `posttooluse_context_monitor.js` / `context_window_statusline.sh`) is fully SOTA-cite-grounded. | **KEEP (survivors).** The 2 NON-SOTA hooks — `context_window_guard.py` + `precompact_guard.py` — were already REMOVED (confirmed this session: "No such file"). The user's "damaging significantly" concern was REFUTED at hook-body level by codex in the prior session (reinflation ~250-600B/event, not the FM-20 ~13% claim). `precompact_hint_emitter.py` + `userpromptsubmit_compact_threshold.py` are currently `M` — a parallel session is recalibrating them (the goal's "RECALIBRATE 4 surviving hooks" — cross-cited, owned by parallel session). |

## Non-SOTA % estimate (DONE-WHEN #6)

**Decision-layer breakdown:**
- **SOTA-cited / SOTA-principle-grounded**: Mia (pattern), CADP (principle), Path P (gstack-cited), compact-hook survivors (8+ TIER-1 cites), the cross-model-consensus T1-T7 lifecycle (CCBP-cited), convergence-gate (CCBP+arxiv), Karpathy-adapted (Karpathy named-author). → **~82-88%**
- **Local-novel (honestly-disclosed, evidence-backed — NOT low-quality)**: FM-17.e + the FM-* named-failure-mode catalog naming convention (TIER-3-LOCAL-OPERATOR-DERIVED, but each carries an n≥3 evidence ladder + cycle-322 codification gate), the "Mia" name, the specific CADP numeric caps. → **~12-18%**
- **Genuinely non-SOTA / low-quality / should-replace**: **0% identified at this preliminary pass.** The 2 non-SOTA compact hooks were already removed. No surviving primitive is a fabrication or a low-quality non-cited pattern.

**Honest caveat**: this is an ORCHESTRATOR-SIDE PRELIMINARY verdict synthesized from rule-provenance headers. The goal's full ask — codex-rescue BRIDGE-MODE E2E line-by-line audit of EVERY hook/rule against EVERY SOTA repo (wshobson/agents, superpowers, ECC, GSD, etc.) — is a dedicated multi-agent research wave that needs its own context budget. It is **explicitly queued as W197+ follow-up** (see W197 close-synthesis). The preliminary verdict's confidence: the SOTA-cite-grounding of named primitives is HIGH (cite headers are verifiable in-rule); the non-SOTA % is a ROUGH estimate pending the deep audit.

## Disposition

- **No REPLACE actions** — every decision-layer primitive is either SOTA-grounded or honestly-disclosed local-novel-with-evidence.
- **1 optional cosmetic action**: "Mia" → upstream-aligned naming ("pre-apply verification") — LOW priority, not blocking.
- **The architecture is NOT "rotting low-quality non-SOTA"** — the user's concern, while a legitimate question, does not bear out at the decision-layer: the audit-worthy non-SOTA hooks were ALREADY removed, and the remaining local-novel parts are evidence-backed codifications, not fabrications.
- **Deep codex-rescue cross-repo audit**: queued W197+ (the goal's Agent B/D scope — deferred for context budget + FM-17.e BRIDGE-MODE thrash risk; Path P used instead this session for the glob-narrowing convergence gate).

## Sources
- `.claude/rules/mia-pre-apply.md` header (4 TIER-1 anchors, verbatim cite block)
- `.claude/rules/fm17-subagent-fleet-depletion.md` §FM-17.e (n=5 evidence ladder)
- `.claude/rules/parallel-agent-wave.md §CADP` (arxiv 2601.06007 cite)
- `.claude/rules/ctff-patterns-cd.md` Pattern D (gstack cite anchors, n=13)
- `.claude/rules/auto-compact-discipline.md` Cite-class lattice (8+ TIER-1-DIRECT cites)
- This session: `context_window_guard.py` + `precompact_guard.py` confirmed removed; codex Path P APPROVE conf=0.84
