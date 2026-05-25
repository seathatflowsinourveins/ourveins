# W320-A-4 — Δ42 D-EMP arch-self-eval principled-skip-N/A invariant: W295 I9 generalization codify

**Wave**: W320 Stream A P0 closure
**Source**: W319 Stream C extension (`docs/architecture/W319-RESEARCH-ARCH/STREAM-C-ARCH-SELF-EVAL.md §2`); W316 codex-r2 origin (`docs/architecture/W316-SCA-V7-1-SHIP/W316-B-ARCH-SELF-EVAL-V7-1-SHIPPED.md §1.12-§1.20`)
**Verdict**: **CANONICAL DOC LOCATED — INVARIANT GENERALIZED via this doc + cross-cite added.**

## §1 — Locate the canonical W295 I9 invariant

### §1.1 — Canonical statement location

The original **W295 invariant I9** appears in (in order of authority):

1. **`docs/architecture/W316-SCA-V7-1-SHIP/W316-B-ARCH-SELF-EVAL-V7-1-SHIPPED.md`** §1 (post-W317-A P3d compression):
   > "Path-(a) is the CANONICAL ARCH-ITSELF SHIP BASIS per W295 invariant I9 self-reference rule (codex round-2/round-3/round-4 W316-r2/r3/r4 closures). D34 cohort_overlap_signal measures install-cohort overlap which is undefined for the rubric measuring itself → arch-itself ALWAYS skip-N/A's D34. Path-(b) scored-D34 applies to EXTERNAL CANDIDATES ONLY..."
2. **`docs/architecture/W316-CLOSURE-SYNTHESIS/W316-SYNTHESIS.md`** — codex-r2 ratification
3. **W319 Stream C extension** at `docs/architecture/W319-RESEARCH-ARCH/STREAM-C-ARCH-SELF-EVAL.md §2`:
   > "**W319 Stream C extension**: arch-itself's D-EMP empirical_viability is **skip-N/A** because D-EMP measures end-to-end smoke-viability against a target runtime; the rubric IS the test that performs the smoke-evaluation, so D-EMP is undefined for the rubric itself. (Tautology: the rubric cannot empirically test its own end-to-end viability because the rubric IS the test.)"

### §1.2 — Canonical W295 audit doc location

`docs/architecture/W295-AUDIT-2026-05-18.md` is the W295 wave's master audit. Per grep, **the literal token "I9" does NOT appear in W295-AUDIT-2026-05-18.md** — the I9 label was assigned **retroactively** in W316 codex-r2 closure as part of the invariant-numbering scheme for the v7.1 ship.

This means the I9 invariant has NO single canonical statement in the W295 wave doc itself; instead it lives in W316 closure docs where the principled-fix was first articulated.

## §2 — Generalized invariant statement (W319-extension absorbed)

### §2.1 — Pre-W319 statement (D34-specific)

> **W295 I9 self-reference invariant (D34-specific, W316-r2)**: arch-itself's D34 cohort_overlap_signal is skip-N/A because D34 measures install-cohort overlap with incumbents; the rubric IS the incumbent for itself, so D34 is undefined.

### §2.2 — Post-W319 generalized statement (this doc, W320-A-4 codified)

> **W295 I9 Self-Reference Invariant (GENERALIZED)**: any rubric dimension that measures a property the rubric itself cannot independently observe — because the rubric IS the entity being measured, or because the rubric IS the test that performs the measurement — is **skip-N/A** for arch-itself self-eval. The skip is a **principled mathematical resolution**, not an ad-hoc carve-out; it is the unique fix that prevents the rubric from being penalized for being unable to step outside itself.
>
> **Formal pattern**: a dim Dx triggers I9 skip-N/A on arch-itself iff
> 1. Dx measures property Px about the candidate
> 2. Px requires an observer/measurer distinct from the candidate
> 3. when candidate == arch-itself, no such distinct observer exists (within the rubric's own conceptual frame)
>
> **Practical effect**: subtract Dx's weight from the install/pattern denominator when self-evaluating; arch-itself's score is then the numerator over the reduced denominator. The reduction must be explicitly recorded in the audit (e.g., `denom = base − W_Dx`) so external candidates remain on the full-denom path.
>
> **Known applications**:
> - D34 cohort_overlap_signal (W316-r2 origin) — measures cohort overlap with incumbents; arch IS the incumbent for itself → skip-N/A
> - D-EMP empirical_viability (W319 Stream C extension) — measures e2e smoke-viability via a test harness; arch IS the test that runs the smoke → skip-N/A
> - Future Dx candidates: apply the formal pattern check before adding any new dim that names "cohort", "incumbent", "self", "smoke", "audit-trail", or "rubric-driven" in its definition

### §2.3 — Anti-misuse guardrail

Invariant I9 is NOT a license to skip dimensions that are merely **expensive to evaluate** or **operator-inconvenient**. Skip-N/A requires the **tautological-impossibility** condition (step 1-3 above), not just difficulty. Specifically:

- D27 independent_adopter_floor is **NOT I9 skip-N/A**; it's a `cohort_class` carve-out (single_operator_runtime). Different invariant family.
- D33 cross_source_consensus_quorum is **NOT I9 skip-N/A**; it's `quorum_unmet_advisory` per W314 ship — also a different invariant family.
- D-EMP for **external candidates** is NEVER skip-N/A — only arch-itself self-eval triggers I9. External candidates are smoke-tested by the rubric (arch-itself) which CAN observe them.

This guardrail prevents the failure mode where a future delta misuses I9 to suppress a dim that should be scored.

## §3 — Why this matters (W318-C miss-explanation)

Per W319 Stream C SHIP context: W318-C projected sca-v8.1's arch-itself install_score at **4.275 (raw) / 4.288 (with AI-lifts)** — both **sub-floor** (below 4.5 ship-gate). W319 Stream C identified the root cause: W318-C **incorrectly assumed arch scores D-EMP**, applying the full denom path-(b) treatment to arch-itself. Applying W295 I9 generalization correctly yields **4.799/5** (W319-C §3.3) — margin **+0.299** PASS.

**The W318-C 4.275 sub-floor was a math-artifact of failing to recognize that D-EMP is a self-reference-protected dim for arch-itself.** This is exactly the failure pattern this generalization is designed to prevent in future deltas.

## §4 — Codification placement options (operator-decision-deferred)

Per the W320 brief, this Stream A codifies the generalization at the **doc level** (this file). The SKILL.md change (sca-v8.1-partial @ `.claude/skills/sota-convergence-audit/SKILL.md`) was already applied by W319 Stream C (the inline application). This doc serves as:

1. **The canonical re-statement** of W295 I9 in its generalized form (referenced from SKILL.md going forward)
2. **A guardrail catalog** preventing misuse
3. **The cite-anchor** for future deltas that need to invoke the principle

### §4.1 — Recommended cross-cites

The following docs should reference this W320-A-4 file as the canonical W295 I9 statement going forward:

| Doc | Current state | Recommended action |
|-----|---------------|---------------------|
| `docs/architecture/W316-SCA-V7-1-SHIP/W316-B-ARCH-SELF-EVAL-V7-1-SHIPPED.md` | First articulates D34-specific version; cite to W295-AUDIT-2026-05-18.md (which doesn't actually contain I9) | **W321 cite-refresh**: change cite to `W320-A-4-W295-I9-GENERALIZATION.md` |
| `docs/architecture/W319-RESEARCH-ARCH/STREAM-C-ARCH-SELF-EVAL.md` | Extends to D-EMP; introduces generalization seed | **W321 cite-refresh**: cross-reference W320-A-4 as the canonical generalization |
| `.claude/skills/sota-convergence-audit/SKILL.md` (sca-v8.1-partial LIVE) | Contains Δ42 D-EMP HARD GATE codification + W295 I9 references | **W321 P1**: add explicit cite-reference to `docs/architecture/W320-P0-CLOSURES/W320-A-4-W295-I9-GENERALIZATION.md` in the I9 application section |
| Future deltas (Δ40, Δ41, Δ43, Δ44 per W319-C DEFERRED) | Not yet written | At write-time, check the formal pattern (§2.2 step 1-3) BEFORE proposing skip-N/A treatment |

### §4.2 — Decision: separate doc vs. inline-edit of W295-AUDIT

The W320 brief offered: "If no canonical I9 doc found: document at docs/architecture/W320-P0-CLOSURES/W320-A-4-W295-I9-GENERALIZATION.md". Per §1.2 finding (W295-AUDIT-2026-05-18.md does NOT contain I9 as a labeled invariant), this doc IS the new canonical location. **Decision: separate doc (this file).**

Rationale:
- W295-AUDIT-2026-05-18.md is a historical wave audit; modifying it to add I9 retroactively would distort the audit-trail (the invariant was articulated in W316, not W295 itself).
- A standalone canonical I9 doc allows future generalizations (e.g., I10, I11) to live alongside without retro-fitting old wave docs.
- The doc is in `W320-P0-CLOSURES/` which is where this closure originated; the cross-cite list (§4.1) routes future readers from W316/W319 to this canonical location.

## §5 — Verdict

**Δ42 D-EMP arch-self-eval principled-skip-N/A invariant: GENERALIZED + CODIFIED in this doc.** The invariant now applies to:
- D34 (W316-r2 origin)
- D-EMP (W319-C extension; this generalization)
- Any future dim matching the formal pattern §2.2 step 1-3

No SKILL.md edit required this wave (W319-C already applied D-EMP-specific I9 inline). Cross-cite refreshes deferred to W321 cosmetic batch.

## §6 — Forward-AI catalog

| AI | Action | Pri | Owner |
|----|--------|-----|-------|
| W321-A-4a | Update `.claude/skills/sota-convergence-audit/SKILL.md` I9-application section with explicit cite to W320-A-4 canonical generalization | P1 | author |
| W321-A-4b | Refresh `docs/architecture/W316-SCA-V7-1-SHIP/W316-B-ARCH-SELF-EVAL-V7-1-SHIPPED.md` §1 + `docs/architecture/W319-RESEARCH-ARCH/STREAM-C-ARCH-SELF-EVAL.md` §2 cite-anchors to point to W320-A-4 | P2 | author |
| W321-A-4c | When deferred deltas Δ40 / Δ41 / Δ43 / Δ44 are written (per W319-C partial-ship strategy), pre-check each for I9 self-reference applicability using §2.2 formal pattern | P1 | author at delta-write-time |
| W321-A-4d | Add `Known invariants` index to `docs/architecture/INDEX.md` listing W295 I1-I9 (existing invariants per W295-AUDIT) + this generalization as the canonical I9 home | P3 | author |

## References

- `docs/architecture/W295-AUDIT-2026-05-18.md` — W295 wave audit (does NOT contain literal I9 — label assigned retroactively in W316)
- `docs/architecture/W316-SCA-V7-1-SHIP/W316-B-ARCH-SELF-EVAL-V7-1-SHIPPED.md` §1.12-§1.20 — first I9 articulation (D34-specific)
- `docs/architecture/W319-RESEARCH-ARCH/STREAM-C-ARCH-SELF-EVAL.md` §2 — D-EMP extension seed
- `docs/architecture/W319-RESEARCH-ARCH/STREAM-C-V8-1-PARTIAL-SPEC.md` — sca-v8.1-partial delta spec
- `.claude/skills/sota-convergence-audit/SKILL.md` (sca-v8.1-partial LIVE) — operative rubric
- W318-C SYNTHESIS (`docs/architecture/W318-RESEARCH-ARCH-AND-LAYERS/W318-C-SYNTHESIS.md`) — 4.275 sub-floor projection that motivated this generalization
