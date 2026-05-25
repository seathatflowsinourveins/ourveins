# W328-D-3 — Anti-Bias Gate (W295 §6.2 inverse-test on Claude-side recompute + codex round-20)

**Date**: 2026-05-19 **Wave**: W328 Stream D **HEAD**: `2c48b1e`
**Methodology**: W295 §6.2 anti-bias inverse-test ("If the inverse of this claim were true, would my evidence still support it?") + W327-D-3 codex round-14 anti-bias precedent.
**Scope**: Apply inverse-test to (a) Claude-side composite recompute in W328-D-4 (anticipated 4.136); (b) codex round-20 output WHEN GRAFTED.

> **NOTE on codex round-20 deferred-graft**: Codex round-20 (job `task-mpd2gasc-uuric5`) was still in `Phase: investigating` at Stream D deadline. This anti-bias gate runs on Claude-side recompute NOW; codex retrospective anti-bias check will be added when codex completes (per W328-D-2 §3 Path A).

---

## §1 Inverse-test on Claude's L1 +0.100 lift (R5 PARTIAL-Path-2A unblock)

### §1.1 Claim being tested

> "R5 unblock at config level (`defaultMode: "default"` + `sandbox.failIfUnavailable: true` at HEAD `2c48b1e`) lifts L1 Cardinal-Rules from 4.485 to 4.585 (+0.100)."

### §1.2 Inverse-test framing

> **Inverse claim**: "R5 config-level changes do NOT lift L1; only Path 2A full completion (acceptance-record signed + audit-trail wired + R5 corollary in CLAUDE.md) lifts L1."

### §1.3 Evidence both ways

**Supports +0.100 credit**:
- `defaultMode: "default"` matches Anthropic-canonical default per `https://docs.anthropic.com/en/docs/claude-code/settings`
- `sandbox.failIfUnavailable: true` is Path 2B step 3 spec landed
- ops-rhythm 8-wave penalty NO LONGER FIRES (R5 transitioned away from 8-wave dwell)
- W327-r3 commit body explicitly: "Cardinal R1, R3, R4, R5: HOLD (R5 NOW FULL-HOLD post defaultMode='default')"

**Supports inverse (NO L1 credit until Path 2A complete)**:
- W327-D-1 §2 K-1 Path 2A lists 5 steps; only step 1-3 (settings.json edits) landed; steps 4-5 (CLAUDE.md corollary + Control 2 audit-hook) pending
- W325-C Option C 5-control layered-defense framework still classifies R5 as "EQUIVALENT-HOLD" pending acceptance-record sign
- sca-v11 §7 ship-gate floors don't include sandbox-config-only as a sufficient condition for L1 4.5+
- Codex round-14 R-4 explicitly: "K-1 lift CONDITIONAL on operator-sign acceptance-record (W327-D-5 §1)"

### §1.4 Verdict (Claude self-applied)

**PASS-WITH-CAP**: +0.100 credit is OK *only because* anti-bias cap was applied (not the full +0.150 baseline from W327-D-1 §2). Full +0.150 RESERVED for Path 2A complete.

**If codex round-20 awards <+0.07 OR >+0.13 to L1**: trigger per-layer inverse-test re-litigation. Likely codex range: +0.05 to +0.12 (R-5 anti-overclaim discipline).

---

## §2 Inverse-test on Claude's L7 +0.300 lift (R5 + K-7 + K-8 blended)

### §2.1 Claim being tested

> "L7 Safety/Governance lifts from 3.457 to 3.757 (+0.300) via blend of: R5 config (+0.100) + K-7 ops-rhythm skill SHIPPED (+0.100) + K-8 provenance-claim lint NARROWED (+0.100)."

### §2.2 Inverse-test framing

> **Inverse claim**: "The 3 L7 contributors should NOT be additive; +0.100 + +0.100 + +0.100 = +0.300 over-credits because (a) R5 already credited at L1; (b) K-8 narrowing closes a Claude-introduced over-claim, not adds positive value; (c) K-7 may not deserve full +0.100 if dwell-policy not yet enforced via lint or hook."

### §2.3 Evidence both ways

**Supports +0.300 net (additive blend)**:
- L7 covers governance discipline; R5 contributes via deny-default permissions (Control 1 per sca-v11 §6); separate from L1 cardinal-rules accounting
- K-7 ops-rhythm SKILL.md ships with description-fire trigger, 3-org-distinct anchors, dwell-ledger schema → "shipped as policy" not "drafted as policy"
- K-8 provenance-claim lint narrowing closed a real over-claim pattern (W320+W326 historical race "would have been BLOCKED" framings); the lint hook fires + has 3/3 PASS test results per W328-C K-8 verify

**Supports inverse (over-credit risk)**:
- R5 contribution to L7 could be 0 if L1 already captures R5 unblock value (double-count risk per codex round-14 Axis 3 R-5)
- K-7 ops-rhythm skill is description-fire-only; dwell-counter NOT enforced via hook or lint yet → "policy on paper" not "policy enforced in runtime"
- K-8 narrowing is COURSE-CORRECTION of over-claim, not a positive lift — net contribution to L7 could be 0 (returning to status-quo-ante)

### §2.4 Verdict (Claude self-applied)

**PASS-WITH-OBSERVATION**: +0.300 may over-credit; conservative estimate is +0.20:
- R5 → L7: +0.075 (not +0.100; some R5 credit lives at L1 not L7)
- K-7 → L7: +0.075 (not +0.100; policy-on-paper not enforced)
- K-8 → L7: +0.050 (course-correction, partial credit)
- **Conservative total**: +0.20 (not +0.30)
- **Midpoint estimate**: +0.25
- **Generous estimate**: +0.30 (Claude's primary in W328-D-4)

**If codex round-20 awards <+0.15 OR >+0.30 to L7**: trigger blended-credit re-litigation per Axis 3 R-5.

---

## §3 Inverse-test on Claude's L4 +0.200 lift (sca-v11 K-3 codification)

### §3.1 Claim being tested

> "L4 Research/Decision lifts from 4.310 to 4.510 (+0.200) via sca-v11 K-3 skip-N/A taxonomy split (T-skip / M-skip / E-skip) + 3-org-distinct anchors + ledger field additions."

### §3.2 Inverse-test framing

> **Inverse claim**: "sca-v11 K-3 codification is METADATA-ONLY (composite_denom UNCHANGED 36.8/16.0 per W327 K-3 ratification footnote); metadata-only changes should not lift L4 by +0.200; only operational external-auditor scoring closes the asymmetric self-eval pattern, and that's W329-deferred."

### §3.3 Evidence both ways

**Supports +0.200 credit**:
- K-3 was HIGH severity per codex round-13; codification + 3-org-distinct anchors + per-dim classification + ledger field additions is concrete progress
- Codex round-14/r15/r16 PRE-APPROVE trail (3 cumulative rounds; 16 total) provides external-auditor validation
- L4 Research/Decision is the methodology layer; methodology codification IS the lift here
- Path 2A baseline lift was +0.250 per W327-D-1 §4 K-3; +0.200 is ~80% of baseline

**Supports inverse (over-credit risk)**:
- "composite_denom UNCHANGED 36.8/16.0" — sca-v11 K-3 is documented as metadata-only
- Operational D-EMP probe for arch-itself NOT YET implemented (requires K-2 telemetry first)
- External-auditor scoring path for D42-D45 NOT YET operationalized (W329 Stream A scope per W327-D-4 §4)
- The lift should be split: +0.10 for codification-shipped, +0.10 reserved for operationalization

### §3.4 Verdict (Claude self-applied)

**PASS-WITH-OBSERVATION**: +0.200 is at the GENEROUS end of the credit range. Conservative estimate +0.10 if D-EMP operational probe + external-auditor scoring path deferred to W329 are counted as future-not-realized.

**If codex round-20 awards <+0.10 OR >+0.25 to L4**: trigger codification-vs-operationalization re-litigation.

---

## §4 Top-3 over-claim risks (per W295 §6.2 anti-bias gate)

### Risk 1: Double-counting R5 across L1 and L7 (HIGH)

**Mitigation**: Conservative attribution — R5 config-unblock credited primarily at L1 (+0.100); only nominal +0.025 at L7 (deny-default permissions ratification). Recompute total: 4.061 (R5 L1) + 4.061 (R5 L7) → composite delta drops from +0.143 to +0.100 (this Anti-Bias V1.0 cap).

### Risk 2: Counting K-8 narrowing as positive lift (MEDIUM)

**Mitigation**: K-8 narrowing is COURSE-CORRECTION of an introduced over-claim, not new positive value. Apply LOW credit (+0.05 at L7) OR ZERO credit (return to status-quo-ante for L7 governance baseline). Codex round-14 Axis 4 R-3 verdict on K-8 was CODEX-FRESH → reasonable to award +0.05 (not +0.10).

### Risk 3: sca-v11 K-3 "metadata-only" + K-7 "policy-on-paper" over-credit (HIGH)

**Mitigation**: Cap L4 lift at +0.150 (not +0.200) per "metadata-only" footnote in sca-v11. Cap K-7 L2/L7 contribution at +0.075 each (not +0.100 each) since dwell-counter is NOT enforced via lint or hook yet — only description-fire trigger active.

---

## §5 Anti-bias-adjusted composite range (codex retrospective will refine)

Applying the 3 risk mitigations:

| Layer | Claude-side primary | Anti-bias capped |
|---|---|---|
| L1 | 4.585 (+0.100) | **4.585 (+0.100)** [no change] |
| L2 | 3.950 (+0.100) | **3.925 (+0.075)** [K-7 enforcement gap] |
| L3 | 4.300 (0) | **4.300 (0)** |
| L4 | 4.510 (+0.200) | **4.460 (+0.150)** [K-3 metadata-only] |
| L5 | 4.300 (0) | **4.300 (0)** |
| L6 | 3.750 (0) | **3.750 (0)** |
| L7 | 3.757 (+0.300) | **3.682 (+0.225)** [R5 double-count + K-8 course-correction + K-7 enforcement gap] |
| **Sum** | 29.152 | **29.002** |
| **Composite (÷7)** | **4.165** | **4.143** |
| **Δ from 4.036** | +0.129 | **+0.107** |

**Anti-bias-adjusted estimate**: **4.143** (range ~4.115 to ~4.166).
**This estimate** is the verdict Stream D ships pending codex round-20 retrospective ratify.

---

## §6 Carry-forward when codex round-20 completes

When codex round-20 raw output is available (per W328-D-2 §4), retrospectively check:

1. **Codex per-layer table vs anti-bias-adjusted table above**: |Δ| > 0.05 per-layer triggers per-layer inverse-test
2. **Codex composite estimate vs 4.143**: |Δ| > 0.05 triggers full anti-bias re-litigation
3. **Codex VERDICT code**:
   - **APPROVE** → Stream D synthesis HOLDS at 4.143 ± codex-delta
   - **REVISE** → operator absorbs codex findings inline; next-wave anti-bias gate fires
   - **NEEDS-REVISION** → blocks W328 ship until specific findings closed
   - **BLOCK** → reject Claude-side recompute; codex's number wins

---

## §7 3-org-distinct anchors (anti-bias methodology)

- **W295 §6.2 anti-bias inverse-test** (Claude internal; cite-anchored to NIST AI 600-1 MEASURE-2.6 + ISO 19011:2018 Clause 4 Principle 5 + Bayesian inverse-test methodology) — primary methodology source
- **Codex round-14 W327-D-3 anti-bias gate precedent** — 5/5 codex recommendations PASS Claude-side anti-bias gating per W327-D-3 §1
- **Codex round-13 W326-D-3 anti-bias gate precedent** — K-1 STRONG CONVERGENT after anti-bias; K-3 PASS-WITH-OBSERVATION → upgraded STRONG after W327-A-3 external cite-strengthening

---

## §8 Cite-anchor master

- W295 §6.2 anti-bias inverse-test methodology
- W327-D-1 §2 K-1 Path 2A 5 steps (companion-gap explicit)
- W327-D-1 §4 K-3 +0.250 baseline lift
- W327-D-3 §1 codex round-14 5/5 recommendations PASS anti-bias
- W327-D-4 §3 composite formula 7-layer mean (each layer weight 1/7)
- W327-r3 commit `2c48b1e` body (R5 unblock observation)
- sca-v11 §5c skip-N/A taxonomy + §7 ship-gate floors + "composite_denom UNCHANGED" footnote
- W328-C-K8-TEST-RESULTS.md (3/3 PASS K-8 provenance lint verify)
- ops-rhythm SKILL.md §1.1 three-tier policy
- codex round-13 W326-D-2 deep audit (7 K-N concerns + 4.036 composite baseline)
