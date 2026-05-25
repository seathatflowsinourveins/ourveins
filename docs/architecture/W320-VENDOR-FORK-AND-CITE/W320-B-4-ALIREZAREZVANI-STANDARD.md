# W320-B-4 — alirezarezvani SKILL-AUTHORING-STANDARD Adopt Evaluation

**Stream**: W320 Stream B Task 4
**Author**: claude-opus-4-7 (W320 Stream B agent)
**Date**: 2026-05-19
**Status**: EVALUATION (no install; T2-STAGED-PILOT preserved per W319 Stream B verdict)
**Verdict**: **PATTERN-ONLY ADOPTION** (recommend cherry-picking 3-of-10 patterns into local `skill-creator` reference doc; reject as-canonical replacement of skill-creator + writing-skills)

## Context

W319 Stream B B5 audited `alirezarezvani/claude-skills v2.8.0` ⇒ T2-STAGED-PILOT install_score 4.21 (313 skills, 12 domains, MIT, single-org D21 floor, very high D34 cohort-overlap with installed sets). W319 forward-AI: evaluate the upstream `SKILL-AUTHORING-STANDARD.md` document specifically (separate from the 313 skills), because the standard codifies upstream's process and may be cherry-pickable independent of the full repo adoption.

## Source verification

| Field | Value |
|---|---|
| Upstream repo | `https://github.com/alirezarezvani/claude-skills` |
| Local clone path | `Z:/repos/deps/alirezarezvani-claude-skills/` |
| HEAD SHA (W320) | `8aa920812f05d5f8c97340775be39e1813885ee9` |
| HEAD commit | `Merge pull request #701 from alirezarezvani/dev` 2026-05-19 12:05:40 +0200 |
| Latest release | `v2.8.0` 2026-05-19T04:05:03Z (today, ~9h ago — high release cadence) |
| Standard doc path | `SKILL-AUTHORING-STANDARD.md` (459 LOC, ~16KB) |
| Standard doc version | `1.0.0 | Created: 2026-03-06` |
| License | MIT |

## Standard content — the 10 patterns (line-cited)

| # | Pattern | LOC range | One-line summary |
|---|---|---|---|
| 1 | Context-First | L122-L143 | Skill checks for `<domain>-context.md` before asking questions; uses existing context to avoid re-asking. |
| 2 | Practitioner Voice | L145-L170 | "You are an expert in X. Your goal is Y." opening; opinionated, direct, contractions OK. |
| 3 | Multi-Mode Workflows | L172-L202 | 2-3 entry points: Build-from-Scratch / Optimize-Existing / Situation-Specific. |
| 4 | Related Skills Navigation | L204-L221 | 3-7 related skills with explicit WHEN / WHEN NOT TO disambiguation; bidirectional cross-refs. |
| 5 | Reference Separation | L223-L249 | SKILL.md ≤10KB cap; deep content in `references/*.md`, loaded on demand. |
| 6 | Proactive Triggers | L251-L274 | 4-6 conditions per skill where skill surfaces issues unprompted. |
| 7 | Output Artifacts | L276-L289 | Map common requests → concrete deliverable format table (scorecard/matrix/plan/audit). |
| 8 | Quality Loop | L291-L307 | Self-verify + peer-verify; confidence tags (verified/medium/assumed). |
| 9 | Communication Standard | L309-L334 | "Bottom line first" output format: WHAT/WHY/HOW with owners + deadlines + decision options. |
| 10 | Python Tools | L336-L362 | Stdlib-only, CLI-first, JSON output, embedded sample data, 0-100 scoring scale. |

Plus a **Quality Checklist** (L392-L431) and **File Structure Standard** (L364-L390).

## Comparison to existing canonical authoring sources

### Source 1 — `anthropics/skills` skill-creator (CANONICAL — Anthropic-official, MIT)

**Path**: `Z:/repos/deps/anthropics-skills/skills/skill-creator/SKILL.md`
**Approach**: Empirical eval-driven workflow. Process is: draft → test-prompts → run eval-viewer → quantitative metrics → rewrite → re-test → expand test set. **No 10-pattern dogma.** Flexible: "if user says 'just vibe with me', do that".

**Key differences from alirezarezvani standard**:
- No mandatory frontmatter `metadata:` block (alirezarezvani requires `version: 1.0.0 / author / category / updated:`).
- No required Context-First domain-context.md pattern.
- No 10KB SKILL.md cap as hard rule.
- No required confidence-tag emoji scheme (🟢/🟡/🔴).
- Heavier emphasis on **quantitative eval harness** (`eval-viewer/generate_review.py`) — alirezarezvani standard mentions evals only obliquely.

### Source 2 — `obra/superpowers` writing-skills (CANONICAL — TDD-for-prompts)

**Path**: `Z:/repos/deps/superpowers/skills/writing-skills/SKILL.md`
**Approach**: TDD applied to skill authoring. RED-GREEN-REFACTOR: write pressure-scenario subagent tests → watch baseline-fail → write skill → watch tests pass → refactor.

**Key differences**:
- Mandates **subagent pressure-testing before skill ships** — alirezarezvani standard has zero corresponding rigor gate.
- Explicit anti-pattern callout: "Skills are NOT narratives about how you solved a problem once" — alirezarezvani implies similar via Pattern 2 but doesn't enforce.
- Cites Anthropic-best-practices doc for cross-reference; alirezarezvani is self-contained.

### Source 3 — installed `addyosmani-vendor-fork-5` skill-creator (operator-curated; W316 ship)

Already installed at `.claude/skills/addyosmani-*` (5 skills). The addyosmani pattern (per W316 Stream D) emphasises **doubt-driven verification** + **api-and-interface design** + **code-simplification** — these are skill-content patterns, not skill-authoring meta-patterns. addyosmani has **no equivalent standalone SKILL-AUTHORING-STANDARD doc**.

## Overlap analysis (alirezarezvani vs skill-creator + writing-skills)

| Pattern | alirezarezvani says | Already covered by | Net new value |
|---|---|---|---|
| 1 Context-First | Check `<domain>-context.md` | NOT in skill-creator; NOT in writing-skills | **NEW** — operator-specific to alirezarezvani's domain-tree |
| 2 Practitioner Voice | "You are expert in X. Goal: Y" | writing-skills "Skills are NOT narratives" implies similar | **PARTIAL OVERLAP** — alirezarezvani prescribes exact opening prose |
| 3 Multi-Mode Workflows | Build/Optimize/Situation modes | NOT explicit in skill-creator; NOT in writing-skills | **NEW** — but enforces template uniformity that may not fit every skill type |
| 4 Related Skills Navigation | 3-7 with WHEN/NOT disambiguation | writing-skills mentions cross-refs; skill-creator silent | **STRONG NEW** — disambiguation discipline is genuinely useful (review-vs-team-review-vs-code-review etc.) |
| 5 Reference Separation (≤10KB) | SKILL.md ≤10KB hard cap | writing-skills silent; skill-creator silent | **NEW** — but conflicts with longer pattern-skill bodies (sota-convergence-audit SKILL.md is 1587 LOC ~70KB) |
| 6 Proactive Triggers | 4-6 conditions per skill | writing-skills mentions trigger conditions in passing | **PARTIAL OVERLAP** — formalises an already-implicit pattern |
| 7 Output Artifacts | Table of request→deliverable | writing-skills silent; skill-creator emphasises eval-output | **NEW** — formalises deliverable shape contract |
| 8 Quality Loop | Confidence tags (🟢🟡🔴) | writing-skills emphasises TDD-eval gate; skill-creator emphasises empirical eval | **CONFLICT** — alirezarezvani's emoji tags are LESS rigorous than TDD subagent-tests; writing-skills' approach wins on falsifiability |
| 9 Communication Standard | BOTTOM LINE / WHAT / WHY / HOW format | Operator's CLAUDE.md guidance + writing-skills imply structured output | **PARTIAL OVERLAP** — useful prescription but operator-style mismatch (CLAUDE.md prefers dense markdown not bullet-form) |
| 10 Python Tools | Stdlib-only, CLI-first, JSON, 0-100 scale | skill-creator mentions eval scripts; writing-skills silent | **NEW** — codifies a useful constraint set for skill-bundled scripts |

**Tally**:
- 4 **NEW** patterns (1, 3, 5, 10) — net-new but not all universally applicable
- 3 **STRONG NEW** patterns (4, 7) — disambiguation + artifact contract are genuinely cherry-pickable
- 3 **PARTIAL OVERLAP / CONFLICT** patterns (2, 6, 8, 9) — already covered or in tension with operator preferences

## Adoption verdict

**PATTERN-ONLY ADOPTION** — cherry-pick 3 patterns, reject the standard as a canonical replacement.

### Cherry-pick recommendation (3 patterns)

| Pattern | Adopt as | Target location | Rationale |
|---|---|---|---|
| **4 Related Skills Navigation** | Local convention | New section in `Z:/claude-sota-installed/.claude/skills/skill-creator-conventions.md` reference doc (if/when authored) or as a 1-paragraph append to `goal-prompt-synthesis` SKILL.md disambiguation block | The runtime has explicit disambiguation pain (W317 noted `review` vs `team-review` vs `code-review` naming-collision check needed). alirezarezvani's WHEN/NOT-TO bullets solve this with minimal overhead. |
| **7 Output Artifacts** | Local convention | Optional section in all operator-curated skill SKILL.md files going forward | Codifies the implicit "this skill produces a markdown doc with these headings" contract. Useful for operator routing and downstream consumers. |
| **10 Python Tools** (stdlib-only / CLI-first / JSON / 0-100) | Coding standard | Cite-anchor in `tools/sca-v7-prelim.sh` style guide if W317 ports it; reference in `harness/eval_harness.py` if scoring tools added | Aligns with W315-r2 Stream C harness pattern conventions; stdlib-only constraint helps Z:-portable invariant. |

### Reject (or defer pending operator decision) — 7 patterns

| Pattern | Reject reason |
|---|---|
| **1 Context-First** | Requires authoring `<domain>-context.md` files this runtime does not have; CLAUDE.md head matter already serves this role. Re-implementing alirezarezvani's tree would duplicate. |
| **2 Practitioner Voice** | Operator skill-prose style is already dense+factual; "You are an expert in X" framing is fine but not mandatory. Existing skills (`sota-convergence-audit`, `goal-prompt-synthesis`) use direct operator-voice; rewriting all would be no-value churn. |
| **3 Multi-Mode Workflows** | Many existing skills (`mem-recall`, `langfuse`, `goal-prompt-synthesis`) are intentionally single-mode. Forcing Build/Optimize/Situation modes adds template-fit-tax without skill-quality gain. |
| **5 Reference Separation ≤10KB** | **HARD CONFLICT** — `sota-convergence-audit` SKILL.md is intentionally 1587 LOC because the rubric IS the skill body. Splitting into references defeats the discoverability invariant. Conditional adopt: applies only to skills <10KB; longer skills retain inline structure. |
| **6 Proactive Triggers** | Already implicit in operator-curated skill descriptions; codifying would be cosmetic. |
| **8 Quality Loop with emoji confidence tags** | **CONFLICT** — operator CLAUDE.md style prefers `[✓/✗/⚠]` plaintext over emoji. writing-skills' TDD-subagent-test approach is strictly stronger as a quality gate. |
| **9 BOTTOM LINE / WHAT / WHY / HOW communication format** | **STYLE CONFLICT** — operator dense-markdown style with file:line cites is the local norm; the alirezarezvani bullet-form would be noisier in CLAUDE.md-scale dense docs. |

## T2-STAGED-PILOT decision (preserved)

W319 Stream B's T2-STAGED-PILOT install_score 4.21 verdict for the full repo **stands**. Pattern-only cherry-pick (3 of 10 patterns) does NOT require installing the repo as a marketplace and does NOT trigger T2→T1 upgrade. The 313-skill catalog itself remains DEFERRED pending operator decision per W319 Stream B forward-AI.

## Cardinal-rule compliance

| Rule | Status |
|---|---|
| R1-R5 | ✓ HOLD — pattern-only, no install, no rules, no hooks |
| `self_invented_count: 0` | ✓ HOLD — pattern cherry-pick recommendations cite upstream MIT source |
| CLAUDE.md ≤50 LOC body | ✓ HOLD — no edits to head matter |
| Sca-v7.1 / v8-DRAFT considerations | NEUTRAL — adoption of patterns 4/7/10 is below the install-vs-pattern threshold; no rubric-score change |

## W320 forward-AIs

| ID | Priority | Action | Owner |
|---|---|---|---|
| W320-B-4.1 | P2 | If/when operator authors a local `skill-creator-conventions.md` or extends `skill-creator:skill-creator` skill, codify Pattern 4 (Related Skills Navigation WHEN/NOT-TO) as a section. | operator |
| W320-B-4.2 | P3 | Apply Pattern 7 (Output Artifacts) retroactively to existing operator-curated skills with multi-output behavior (`goal-prompt-synthesis`, `sota-convergence-audit`) — optional cosmetic. | author / next-wave |
| W320-B-4.3 | P3 | Apply Pattern 10 (Python Tools stdlib-only constraints) to `harness/eval_harness.py` style guide if future eval-script additions land. | author / next-wave |
| W320-B-4.4 | P1 | Operator-decision: confirm or reject the W319 Stream B T2-STAGED-PILOT verdict for `alirezarezvani/claude-skills` full marketplace install. Pattern-only adoption (this doc) does NOT decide the marketplace question. | operator |

## References

- Upstream standard doc: `Z:/repos/deps/alirezarezvani-claude-skills/SKILL-AUTHORING-STANDARD.md:1-459`
- Comparison source 1: `Z:/repos/deps/anthropics-skills/skills/skill-creator/SKILL.md:1-30`
- Comparison source 2: `Z:/repos/deps/superpowers/skills/writing-skills/SKILL.md:1-30`
- W319 Stream B verdict: `Z:/claude-sota-installed/docs/architecture/W319-MULTI-REPO-INGEST/STREAM-B-alirezarezvani-claude-skills.md`
- W316 Stream D addyosmani-vendor-fork-5 pattern precedent: `Z:/claude-sota-installed/.claude/skills/addyosmani-doubt-driven-development/SKILL.md:6-10`
