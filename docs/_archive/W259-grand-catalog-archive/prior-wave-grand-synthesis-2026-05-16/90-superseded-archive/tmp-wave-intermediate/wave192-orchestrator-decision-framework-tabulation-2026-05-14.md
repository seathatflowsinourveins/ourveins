# W192 P0 — Orchestrator-side Decision-Framework Tabulation (BASELINE)

**Fire**: W192 fire-1 P0. **Date**: 2026-05-14. **Role**: orchestrator-side baseline classification from loaded rule bodies — the Path-P-complementary synthesis layer. Path P codex (`bk905lmos`) + Agent A (sota-researcher SOTA-equivalent probe) + Agent B (codex-rescue BRIDGE-MODE adversarial) run in parallel; this baseline is INTEGRATED with their returns into the final `docs/w192-decision-framework-audit.md`.

## Classification key

- **SOTA-DERIVED** — directly traces to an upstream SOTA repo / paper / official docs at verifiable file:line + SHA
- **SOTA-ADAPTED** — composes upstream SOTA primitives + disclosed local glue (effective_tier=TIER-3-LOCAL-COMPOSITION)
- **TIER-3-LOCAL-NOVEL** — no upstream parity; local codification (note: "local" ≠ "wrong" — the failure modes are real; the *codification* is local)

## Per-pattern baseline classification (from loaded rule bodies)

| # | Pattern | Class | honest_cite? | Rationale (self-declared cite class) | SOTA-replacement signal |
|---|---|---|---|---|---|
| 1 | FM-17 fleet-depletion recovery (6 sub-classes a-g) | TIER-3-LOCAL-NOVEL | YES | `named-failure-modes.md` FM-17 row + `fm17-subagent-fleet-depletion.md`: self-declares TIER-3-LOCAL-OPERATOR-DERIVED, n=15+ incident ladder. Failure mode (429 pool-depletion / 1M-context billing / autocompact-thrash) is a REAL environmental phenomenon, not invented. Recovery ("artifact before final return" + "Path P orchestrator-direct codex") is SOTA-adjacent (checkpoint-before-risky-op). | PARTIAL — deepagents has "large-output-to-file"; autogen/crewai have retry primitives — but for a DIFFERENT failure shape. Agent A probing canonical fleet-recovery equivalents. |
| 2 | FM-20 path-drift-cascade (n=18 rows) | TIER-3-LOCAL-NOVEL | YES | `fm20-path-drift-cascade.md`: TIER-3-LOCAL-OPERATOR-DERIVED. Phenomenon (cascading error in multi-agent pipelines) IS documented in multi-agent literature; the n=18 row ladder + Mia-probe-each-sub-claim recovery is local. | PARTIAL — multi-agent coordination papers (arXiv 2603.28990, CONSENSAGENT) address error-propagation awareness, not the specific recovery codification. |
| 3 | FM-21 queue-time-prompt-freeze | **SOTA-ADAPTED** | YES (exemplary) | `fm21-queue-time-prompt-freeze.md`: explicit lattice `constituents=[TIER-1-DIRECT @ Anthropic CC scheduled-tasks docs, TIER-3-LOCAL-OPERATOR-DERIVED @ W152 incidents]; effective_tier=TIER-3-LOCAL-COMPOSITION`. Mechanism IS Anthropic-docs-grounded; recovery is thin operator glue. | NONE needed — mechanism correctly grounded in Anthropic docs. One of the best-cited FM entries. |
| 4 | FM-02 parallel-session race (sub-classes a/b/c) | **SOTA-ADAPTED** | YES (strong) | OWNED by `parallel-session-worktree-isolation.md`: recovery (worktree isolation) has **4-org Axis-1 PASS** — Boris Cherny CCBP + jj-vcs + OpenAI codex worktree-aware runtime + libgit2. Strongest cite trail in the FM-catalog. Sub-class catalog (a/b/c) is local glue. | NONE — worktree isolation IS the SOTA pattern (Boris Cherny's recommendation). |
| 5 | Mia pre-apply (verify-before-Edit) | **SOTA-ADAPTED** | YES (exemplary self-disclosure) | `mia-pre-apply.md`: PATTERN grounded in **4 TIER-1 anchors** (superpowers verification-before-completion, Karpathy Think-Before-Coding, CCBP RPI VERIFY gate, autoresearch The Loop). Rule EXPLICITLY self-discloses "Mia is OPERATOR-PERSONAL NAMING ... operator-side OUTLIER" — exemplary cite honesty. | NONE functional — pattern is well-grounded. NAMING is a documented cosmetic outlier (could rename to superpowers-aligned "verification-before-apply" — cosmetic only). |
| 6 | cardinal-rules 1-12 | **MIXED** | YES | CLAUDE.md: CR-1/2/3/4 cite CCBP + Karpathy + OpenAI codex = SOTA-DERIVED. CR-7 cites Anthropic CC settings docs = SOTA-ADAPTED. CR-5/6/8/10 = "cite anchor: user directive 2026-05-06" = TIER-3-LOCAL-NOVEL (operator design-axioms). CR-9 = Wave 50 archaeology = TIER-3-LOCAL-OPERATOR-DERIVED. CR-11/12 = TIER-3-LOCAL-COMPOSITION. **KEY: 7 of 12 cardinal rules are operator-axioms, not SOTA-repo-derived.** | NO-SOTA-EQUIVALENT — CR-5/6/8/10 are the runtime's DESIGN THESIS ("install-only, everything from SOTA repos"), not patterns to replace. Honest finding for the headline %. |
| 7 | cross-model T1-T7 lifecycle | **SOTA-ADAPTED** | YES (exemplary) | `cross-model-consensus.md` Normative Authority Map: TIER-1-HOOK-SUBSTRATE (Anthropic CC hooks docs) + TIER-2 (CCBP cross-model-workflow STEPS 1-4) + TIER-3-LOCAL-COMPOSITION (T0+T7+profile-selection sss-novel). | NONE — concept has SOTA backing (CCBP cross-model-workflow). Possible architecture-critic note: 7-touchpoint expansion vs CCBP's 4 STEPS may be over-elaborated (not a "not-SOTA" finding). |
| 8 | convergence-gate Axis-1/2/3 | TIER-3-LOCAL-NOVEL | PARTIAL | `convergence-gate.md` is a TIER-3 port from parent CCC; cites tools for HOW-to-apply but **does NOT cite a SOTA repo for the 3-axis structure itself**. The 5-band stability table + STRONG-PROVENANCE-EXPRESS predicate are local. Underlying "multi-source convergence" epistemic is general knowledge. | **FLAG** — OpenSSF Scorecard / deps.dev / Snyk Advisor (named in multi-source-discovery rule's own "Why" section) are SOTA repo-quality-scoring frameworks. convergence-gate's local thresholds could be REINFORCED/REPLACED by Scorecard-style scoring. Agent A probing. |
| 9 | codex-t1 Pattern A-D fix-forward | TIER-3-LOCAL-NOVEL | YES | `codex-t1-fix-forward-pattern.md` + `ctff-*.md`: self-declares "TIER-3 local codification provenance ... promoted from feedback memories." A/B/C/D taxonomy + conf 0.88-0.93 sweet-spot is local. | PARTIAL — "integrate review feedback atomically" is a general code-review discipline; A/B/C/D taxonomy is local. |
| 10 | SRA D1-D10 | TIER-3-LOCAL-NOVEL | **PARTIAL — cite-class error** | `sota-research-architecture.md`: self-declares `effective_tier=TIER-3-LOCAL-COMPOSITION`, "sss-novel composition." **CITE-CLASS BUG**: header labels "TIER-1-DIRECT user directive 2026-05-08" — a user directive is TIER-1-USER-DIRECTIVE, NOT TIER-1-DIRECT (which means upstream SOTA repo). Flag for fix-forward. | **FLAG** — OpenSSF Scorecard publishes a documented multi-dimension repo-scoring lattice. SRA's 10-dimension D1-D10 is a local invention where Scorecard could be the SOTA anchor. Agent A probing. |
| 11 | goal-prompt-synthesis R1-R7 | **SOTA-ADAPTED** | YES | `goal-prompt-synthesis/SKILL.md`: `effective_tier=TIER-3-LOCAL-COMPOSITION`; constituents cite 4 TIER-1-DIRECT sources (CCBP RPI 3-phase + superpowers writing-skills + mattpocock + vercel-labs). R1-R7 pipeline structure is local glue. | NO-SOTA-EQUIVALENT for the specific pipeline; constituent disciplines ARE SOTA. No replacement needed. |

## Baseline headline (orchestrator-side — codex PRIMARY verdict will refine)

Counting cardinal-rules 1-12 individually → ~22 sub-patterns:
- **SOTA-DERIVED**: CR-1, CR-2, CR-3, CR-4 = **4** (~18%)
- **SOTA-ADAPTED**: FM-21, FM-02, Mia, cross-model-T1-T7, goal-prompt-synthesis-R1-R7, CR-7 = **6** (~27%)
- **TIER-3-LOCAL-NOVEL**: FM-17, FM-20, convergence-gate, codex-t1-Pattern-A-D, SRA-D1-D10, CR-5/6/8/9/10/11/12 = **12** (~55%)

**Headline (baseline)**: "% NOT directly SOTA-cited" depends on definition:
- If "directly SOTA-cited" = SOTA-DERIVED + SOTA-ADAPTED (both carry verifiable cite trails) → **NOT-SOTA ≈ 55%** (the TIER-3-LOCAL-NOVEL bucket)
- If "directly SOTA-cited" = SOTA-DERIVED only → **NOT-directly ≈ 82%**

The honest read: **~45% of decision patterns have a real SOTA cite trail (DERIVED+ADAPTED); ~55% are local codifications.** Critically — local codifications are NOT failures: the FM-catalog documents REAL environmental failure modes; the issue is whether the *recovery patterns* have stronger SOTA equivalents (Agent A + codex resolving).

## Answer to operator's loudest question — "are FM-17.e / Mia / FM-catalog really SOTA?"

- **Mia pre-apply** → **SOTA-ADAPTED, KEEP.** 4 TIER-1 anchors; exemplary honest self-disclosure. NOT replaceable — it IS SOTA-grounded. Naming is a documented cosmetic outlier. The operator's worry here is unfounded — Mia is one of the *best*-cited patterns.
- **FM-17 (incl. FM-17.e autocompact-thrash)** → **TIER-3-LOCAL-NOVEL catalog, recovery SOTA-adjacent.** The failure mode is real and observed (W190 double-loss is direct evidence). The recovery ("artifact before return", "Path P orchestrator-direct") is the SOTA-adjacent part. Agent A is probing whether deepagents/autogen have canonical fleet-recovery equivalents — if yes, that's a reinforce-cite opportunity, not a "rip it out."
- **FM-catalog as a whole** → **MIXED, the catalog STRUCTURE is SOTA-cited.** The "named failure mode catalog" pattern itself cites mattpocock "Skills For Real Engineers" named-failure-mode framing. Individual entries vary: FM-02 + FM-21 are well-cited SOTA-ADAPTED; FM-17 + FM-20 are TIER-3-LOCAL-NOVEL. The catalog is not a monolith to accept-or-reject.

## Highest-value fix-forward signals (verdict-only — no auto-replace per /goal)

1. **SRA D1-D10 cite-class bug** — header mislabels "user directive" as "TIER-1-DIRECT"; should be TIER-1-USER-DIRECTIVE. Concrete fix-forward.
2. **convergence-gate + SRA** — both could be REINFORCED by OpenSSF Scorecard (a SOTA repo-quality-scoring framework with documented dimensions). Currently the 3-axis / 10-dimension thresholds are local-invention. Not "rip out" — "anchor to Scorecard."
3. **cardinal-rules CR-5/6/8/10** — operator design-axioms, correctly disclosed. NO replacement (they're the runtime's thesis) but the headline % must count them honestly as not-SOTA-repo-derived.

## Integration pending

This baseline is INTEGRATED (not replaced) with:
- **Path P codex `bk905lmos`** (PRIMARY cross-model verdict — JSON classification at EOF of `.claude/state/codex_consult_w192_p0_decision_framework_OUT.txt`)
- **Agent A `a19f9b7f...`** (sota-researcher — SOTA-equivalent-EXISTS / NO-SOTA-EQUIVALENT / PARTIAL per pattern, with repo file:line+SHA cites)
- **Agent B `af5ef25845...`** (codex-rescue BRIDGE-MODE — adversarial classification, dispatch-mode disclosed)

Final synthesis → `docs/w192-decision-framework-audit.md` with the codex-refined headline %.
