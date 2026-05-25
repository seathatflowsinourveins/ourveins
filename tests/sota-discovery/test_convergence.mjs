// tests/sota-discovery/test_convergence.mjs
// node --test — sca-v22 CONVERGENCE engine (Layer 1 per-dim-type κ + Layer 2 confidence).
// Run: node --test tests/sota-discovery/test_convergence.mjs

import { test } from "node:test";
import assert from "node:assert/strict";

import {
  dimType, reconcileDim, applyKappaShrink, convergenceConfidence, reconcileAll, DIM_TYPE,
} from "../../tools/sota-discovery/lib/convergence.mjs";
import { MISSINGNESS, SOURCE_CLASS } from "../../tools/sota-discovery/lib/contract.mjs";

const A = (value) => ({ value, source_class: SOURCE_CLASS.A, missingness: MISSINGNESS.MEASURED });
const B = (value) => ({ value, source_class: SOURCE_CLASS.B, missingness: MISSINGNESS.MEASURED });
const approx = (a, b, eps = 1e-6) => assert.ok(Math.abs(a - b) <= eps, `${a} ≈ ${b}`);

// ---- dimType classification ------------------------------------------------

test("dimType classifies by kind + special cases", () => {
  assert.equal(dimType("D22_osv_cve"), DIM_TYPE.SECURITY);
  assert.equal(dimType("D07_license_class"), DIM_TYPE.ENUM);
  assert.equal(dimType("D13_cc_install_path"), DIM_TYPE.ENUM);
  assert.equal(dimType("D21_reverse_dependents"), DIM_TYPE.COUNT);
  assert.equal(dimType("D05_contributors_90d"), DIM_TYPE.COUNT);
  assert.equal(dimType("D20_transitive_dep_health"), DIM_TYPE.RATIO);
  assert.equal(dimType("D14_cc_pattern_density"), DIM_TYPE.QUALITATIVE);
  assert.equal(dimType("D18_arch_relevance"), DIM_TYPE.QUALITATIVE);
});

// ---- reconcileDim: cardinality ---------------------------------------------

test("reconcileDim: no measured observations -> κ=0, value null, resolution none", () => {
  const r = reconcileDim("D21_reverse_dependents", [
    { value: null, source_class: SOURCE_CLASS.A, missingness: MISSINGNESS.NOT_MEASURABLE },
  ]);
  assert.equal(r.value, null);
  assert.equal(r.kappa, 0.0);
  assert.equal(r.measured_sources, 0);
  assert.equal(r.resolution, "none");
});

test("reconcileDim: single source -> κ=0.7", () => {
  const r = reconcileDim("D21_reverse_dependents", [A(500)]);
  assert.equal(r.value, 500);
  assert.equal(r.kappa, 0.7);
  assert.equal(r.resolution, "single-source");
  assert.equal(r.escalate, false);
});

// ---- ENUM ------------------------------------------------------------------

test("reconcileDim ENUM: agreement -> κ=1.0", () => {
  const r = reconcileDim("D07_license_class", [A("permissive"), B("permissive")]);
  assert.equal(r.value, "permissive");
  assert.equal(r.kappa, 1.0);
  assert.equal(r.resolution, "converged");
});

test("reconcileDim ENUM: disagreement -> weighted-majority + CONFLICTING + escalate", () => {
  const r = reconcileDim("D07_license_class", [A("permissive"), B("copyleft")]);
  assert.equal(r.value, "permissive"); // CLASS-A (1.0) outweighs CLASS-B (0.7)
  assert.equal(r.kappa, 0.5);
  assert.equal(r.resolution, "conflicting");
  assert.equal(r.escalate, true);
});

// ---- SECURITY --------------------------------------------------------------

test("reconcileDim SECURITY: agreement -> κ=1.0", () => {
  const r = reconcileDim("D22_osv_cve", [A({ cisa_kev_active: false, density: 0.1 }), B({ cisa_kev_active: false, density: 0.12 })]);
  assert.equal(r.kappa, 1.0);
  assert.equal(r.value.cisa_kev_active, false);
});

test("reconcileDim SECURITY: disagreement keeps the SAFER (KEV-active) value + escalates", () => {
  const r = reconcileDim("D22_osv_cve", [A({ cisa_kev_active: false, density: 0.1 }), B({ cisa_kev_active: true, density: 0.2 })]);
  assert.equal(r.kappa, 0.5);
  assert.equal(r.value.cisa_kev_active, true); // safer = more risk
  assert.equal(r.resolution, "conflicting");
  assert.equal(r.escalate, true);
});

// ---- COUNT -----------------------------------------------------------------

test("reconcileDim COUNT: within 50% relative tolerance -> agree (credibility-weighted mean)", () => {
  const r = reconcileDim("D21_reverse_dependents", [A(100), B(120)]); // 120 <= 1.5*100
  assert.equal(r.kappa, 1.0);
  approx(r.value, (1.0 * 100 + 0.7 * 120) / 1.7); // 108.235...
  assert.equal(r.escalate, false);
});

test("reconcileDim COUNT: beyond 50% -> CONFLICTING (still weighted mean)", () => {
  const r = reconcileDim("D21_reverse_dependents", [A(100), B(300)]); // 300 > 1.5*100
  assert.equal(r.kappa, 0.5);
  assert.equal(r.resolution, "conflicting");
  approx(r.value, (1.0 * 100 + 0.7 * 300) / 1.7); // 182.35...
});

// ---- RATIO -----------------------------------------------------------------

test("reconcileDim RATIO: within 0.2 abs tolerance -> agree", () => {
  const r = reconcileDim("D20_transitive_dep_health", [A(0.8), B(0.9)]);
  assert.equal(r.kappa, 1.0);
});

test("reconcileDim RATIO: beyond 0.2 -> CONFLICTING", () => {
  const r = reconcileDim("D20_transitive_dep_health", [A(0.3), B(0.9)]);
  assert.equal(r.kappa, 0.5);
  assert.equal(r.resolution, "conflicting");
});

// ---- QUALITATIVE -----------------------------------------------------------

test("reconcileDim QUALITATIVE: 0.3 semantic band tolerates wider spread", () => {
  const agreeR = reconcileDim("D14_cc_pattern_density", [A(0.5), B(0.75)]); // within 0.3
  assert.equal(agreeR.kappa, 1.0);
  const conflictR = reconcileDim("D14_cc_pattern_density", [A(0.2), B(0.8)]); // beyond 0.3
  assert.equal(conflictR.kappa, 0.5);
});

// ---- missingness filtering -------------------------------------------------

test("reconcileDim ignores NOT_MEASURABLE observations", () => {
  const r = reconcileDim("D21_reverse_dependents", [
    A(42),
    { value: null, source_class: SOURCE_CLASS.B, missingness: MISSINGNESS.NOT_MEASURABLE },
  ]);
  assert.equal(r.measured_sources, 1);
  assert.equal(r.kappa, 0.7);
  assert.equal(r.value, 42);
});

// ---- applyKappaShrink ------------------------------------------------------

test("applyKappaShrink shrinks toward neutral 0.5 as κ -> 0", () => {
  approx(applyKappaShrink(0.9, 1.0), 0.9);
  approx(applyKappaShrink(0.9, 0.0), 0.5);
  approx(applyKappaShrink(0.9, 0.7), 0.9 * 0.7 + 0.5 * 0.3); // 0.78
  assert.equal(applyKappaShrink(null, 1.0), null);
});

// ---- Layer 2: convergenceConfidence ---------------------------------------

test("convergenceConfidence = coverage × agreement", () => {
  const reconciled = {
    a: { kappa: 1.0, measured_sources: 2 },
    b: { kappa: 0.7, measured_sources: 1 },
    c: { kappa: 0.0, measured_sources: 0 }, // unmeasured — excluded
  };
  const r = convergenceConfidence(reconciled, 4); // totalDims = 4
  approx(r.coverage, 2 / 4); // 2 measured dims of 4
  approx(r.agreement, (1.0 + 0.7) / 2); // 0.85
  approx(r.convergence_confidence, 0.5 * 0.85); // 0.425
  assert.equal(r.measured_dims, 2);
  assert.equal(r.band, "MEDIUM-LOW"); // 0.425 -> v21 cutoffs -> MEDIUM-LOW (>=0.3)
});

test("convergenceConfidence band: 0.9 coverage x 0.7 agreement = 0.63 -> MEDIUM (§3 example)", () => {
  const reconciled = {};
  for (let i = 0; i < 9; i++) reconciled["d" + i] = { kappa: 0.7, measured_sources: 1 };
  const r = convergenceConfidence(reconciled, 10); // 9 single-source dims of 10
  approx(r.convergence_confidence, 0.63);
  assert.equal(r.band, "MEDIUM"); // codex P1 #2: must be MEDIUM, not MEDIUM-HIGH
});

test("convergenceConfidence: all single-source drops the band vs all-converged", () => {
  const single = { a: { kappa: 0.7, measured_sources: 1 }, b: { kappa: 0.7, measured_sources: 1 } };
  const converged = { a: { kappa: 1.0, measured_sources: 2 }, b: { kappa: 1.0, measured_sources: 2 } };
  const rs = convergenceConfidence(single, 2);
  const rc = convergenceConfidence(converged, 2);
  assert.ok(rc.convergence_confidence > rs.convergence_confidence, "agreeing sources beat single-source guessing");
});

// ---- reconcileAll ----------------------------------------------------------

test("reconcileAll maps a {dim: observations[]} dict", () => {
  const out = reconcileAll({
    D07_license_class: [A("permissive"), B("permissive")],
    D21_reverse_dependents: [A(500)],
  });
  assert.equal(out.D07_license_class.kappa, 1.0);
  assert.equal(out.D21_reverse_dependents.kappa, 0.7);
});

// ---- codex r1 fixes: SECURITY density, non-finite, missingness, tie-break, shrink clamp ----

test("reconcileDim SECURITY: same KEV but density beyond tolerance -> CONFLICTING + safer", () => {
  const r = reconcileDim("D22_osv_cve", [A({ cisa_kev_active: false, density: 0.1 }), B({ cisa_kev_active: false, density: 0.9 })]);
  assert.equal(r.kappa, 0.5);
  assert.equal(r.resolution, "conflicting");
  assert.equal(r.value.density, 0.9); // keeps the higher-risk reading (codex P1 #1)
  assert.equal(r.missingness, MISSINGNESS.CONFLICTING);
  assert.equal(r.escalate, true);
});

test("reconcileDim SECURITY: same KEV + close density -> converged, safest value", () => {
  const r = reconcileDim("D22_osv_cve", [A({ cisa_kev_active: false, density: 0.1 }), B({ cisa_kev_active: false, density: 0.12 })]);
  assert.equal(r.kappa, 1.0);
  assert.equal(r.value.density, 0.12); // safest among agreeing
});

test("reconcileDim SECURITY: a non-finite density is ignored, KEV governs (codex r2 nit)", () => {
  const r = reconcileDim("D22_osv_cve", [A({ cisa_kev_active: false, density: 0.1 }), B({ cisa_kev_active: false, density: Number.NaN })]);
  assert.equal(r.kappa, 1.0); // NaN density filtered -> only KEV compared -> converged
  assert.equal(r.resolution, "converged");
});

test("reconcileDim SECURITY tri-state: null (UNKNOWN) vs false (clean) -> CONFLICTING (codex P2b #2)", () => {
  const r = reconcileDim("D22_osv_cve", [A({ cisa_kev_active: false, density: 0.1 }), B({ cisa_kev_active: null, density: 0.1 })]);
  assert.equal(r.resolution, "conflicting"); // null !== false now (no !! collapse)
  assert.equal(r.kappa, 0.5);
  assert.equal(r.value.cisa_kev_active, null); // UNKNOWN is safer than known-clean -> kept
});

test("reconcileDim SECURITY tri-state: two UNKNOWN agree", () => {
  const r = reconcileDim("D22_osv_cve", [A({ cisa_kev_active: null, density: 0.1 }), B({ cisa_kev_active: null, density: 0.1 })]);
  assert.equal(r.kappa, 1.0);
  assert.equal(r.resolution, "converged");
});

test("reconcileDim SECURITY: KEV-active(2) safer than UNKNOWN(1) safer than clean(0)", () => {
  const r = reconcileDim("D22_osv_cve", [A({ cisa_kev_active: null, density: 0.5 }), B({ cisa_kev_active: true, density: 0.1 })]);
  assert.equal(r.value.cisa_kev_active, true); // KEV-active beats UNKNOWN on the safer-value pick
});

test("reconcileDim: non-finite numeric observations are not counted as measured (codex P1 #3)", () => {
  const r0 = reconcileDim("D21_reverse_dependents", [A(Number.NaN), B(Number.NaN)]);
  assert.equal(r0.measured_sources, 0);
  assert.equal(r0.kappa, 0.0);
  assert.equal(r0.resolution, "none");
  const r1 = reconcileDim("D21_reverse_dependents", [A(Number.NaN), B(120)]);
  assert.equal(r1.measured_sources, 1);
  assert.equal(r1.value, 120);
  assert.equal(r1.kappa, 0.7);
  const rInf = reconcileDim("D20_transitive_dep_health", [A(Infinity), B(0.5)]);
  assert.equal(rInf.measured_sources, 1);
  assert.equal(rInf.value, 0.5);
});

test("reconcileDim exposes MISSINGNESS state (codex P2 #4 — machine-compatible)", () => {
  assert.equal(reconcileDim("D21_reverse_dependents", []).missingness, MISSINGNESS.NOT_MEASURABLE);
  assert.equal(reconcileDim("D21_reverse_dependents", [A(5)]).missingness, MISSINGNESS.MEASURED);
  assert.equal(reconcileDim("D07_license_class", [A("permissive"), B("permissive")]).missingness, MISSINGNESS.MEASURED);
  assert.equal(reconcileDim("D07_license_class", [A("permissive"), B("copyleft")]).missingness, MISSINGNESS.CONFLICTING);
});

test("reconcileDim ENUM tie breaks deterministically (lexicographic), order-independent (codex P2 #5)", () => {
  const r1 = reconcileDim("D07_license_class", [A("permissive"), A("copyleft")]); // equal weight -> tie
  const r2 = reconcileDim("D07_license_class", [A("copyleft"), A("permissive")]);
  assert.equal(r1.value, r2.value, "order-independent");
  assert.equal(r1.value, "copyleft"); // lexicographically smallest
  assert.equal(r1.kappa, 0.5);
});

test("applyKappaShrink: non-finite -> null; out-of-range clamped (codex P2 #6)", () => {
  assert.equal(applyKappaShrink(Number.NaN, 1.0), null);
  assert.equal(applyKappaShrink(undefined, 1.0), null);
  approx(applyKappaShrink(1.5, 1.0), 1.0); // clamped to 1
  approx(applyKappaShrink(-0.5, 1.0), 0.0); // clamped to 0
  approx(applyKappaShrink(0.8, Number.NaN), 0.5); // bad κ -> 0 -> neutral
});
