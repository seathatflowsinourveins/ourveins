// tests/sota-discovery/test_decision.mjs
// node --test — sca-v22 DECISION plane (§4): geometric soft-AND INSTALL, confidence-aware
// threshold (gap #3), BLOCK->ceiling->route-down precedence, path_to_higher_tier, escalation
// triggers, MONITOR signal. Run: node --test tests/sota-discovery/test_decision.mjs

import { test } from "node:test";
import assert from "node:assert/strict";

import {
  decide, geometricInstallScore, effectiveInstallThreshold, confidenceDiscountedScore,
} from "../../tools/sota-discovery/lib/decision.mjs";
import { DIMS, MISSINGNESS } from "../../tools/sota-discovery/lib/contract.mjs";

const approx = (a, b, eps = 1e-3) => assert.ok(Math.abs(a - b) <= eps, `${a} ≈ ${b}`);

// Build a full normalized+evidence map where every dim has the same value, MEASURED.
function fullMaps(normValue) {
  const normalized = {}, evidence = {};
  for (const k of Object.keys(DIMS)) {
    normalized[k] = normValue;
    evidence[k] = { value: normValue, missingness: MISSINGNESS.MEASURED };
  }
  return { normalized, evidence };
}
const INSTALLABLE = { D07_license_class: "permissive", D13_cc_install_path: "plugin", D17_pinning_discipline: "git-commit-sha" };

// ---- pure scorers ----------------------------------------------------------

test("geometricInstallScore: soft-AND — one near-zero cluster drags the score far below arithmetic", () => {
  const allHigh = geometricInstallScore({ II: 0.9, III: 0.9, IV: 0.9, V: 0.9, VI: 0.9, VII: 0.9 });
  approx(allHigh, 0.9, 0.01); // weighted geometric of all-0.9 ≈ 0.9
  const weakTrust = geometricInstallScore({ II: 0.9, III: 0.01, IV: 0.9, V: 0.9, VI: 0.9, VII: 0.9 });
  assert.ok(weakTrust < 0.4, `weak trust cluster must drag INSTALL down hard, got ${weakTrust}`);
  // arithmetic of the same would be ~0.66 (0.27*0.01 + 0.73*0.9) — soft-AND is far stricter.
  assert.ok(weakTrust < 0.66 - 0.2);
});

test("effectiveInstallThreshold rises as confidence falls (gap #3)", () => {
  approx(effectiveInstallThreshold(1), 0.6);
  approx(effectiveInstallThreshold(0), 0.85);
  approx(effectiveInstallThreshold(0.5), 0.725);
});

test("confidenceDiscountedScore shrinks toward neutral when confidence is low", () => {
  approx(confidenceDiscountedScore(0.8, 1), 0.8);
  approx(confidenceDiscountedScore(0.8, 0), 0.5);
  approx(confidenceDiscountedScore(0.8, 0.5), 0.65);
});

// ---- decide pipeline -------------------------------------------------------

test("decide: BLOCK veto on active KEV", () => {
  const { normalized, evidence } = fullMaps(1);
  const dims = { ...INSTALLABLE, D22_osv_cve: { cisa_kev_active: true } };
  const d = decide({ dims, normalized, evidence, convergence_confidence: 1 });
  assert.equal(d.tier, "BLOCK");
  assert.equal(d.hard_filter_violations[0].dim, "D22_osv_cve");
});

test("decide: INSTALL when clean + permissive + exact-pins + high score + high confidence", () => {
  const { normalized, evidence } = fullMaps(1);
  const d = decide({ dims: { ...INSTALLABLE }, normalized, evidence, convergence_confidence: 1 });
  assert.equal(d.tier, "INSTALL");
  assert.equal(d.path_to_higher_tier, null);
  approx(d.effective_install_threshold, 0.6);
});

test("decide: LOW confidence blocks INSTALL despite perfect dims (gap #3 closure)", () => {
  const { normalized, evidence } = fullMaps(1);
  const d = decide({ dims: { ...INSTALLABLE }, normalized, evidence, convergence_confidence: 0.3 });
  assert.notEqual(d.tier, "INSTALL"); // threshold 0.775 vs effective 0.65 -> fails
  assert.equal(d.tier, "PATTERN-STUDY"); // routes down (no ceiling; pattern score high)
  assert.match(d.path_to_higher_tier, /convergence_confidence/);
});

test("decide: non-permissive license caps tier at PATTERN-STUDY (ceiling), even with high scores", () => {
  const { normalized, evidence } = fullMaps(1);
  const dims = { D07_license_class: "copyleft", D13_cc_install_path: "plugin", D17_pinning_discipline: "git-commit-sha" };
  const d = decide({ dims, normalized, evidence, convergence_confidence: 1 });
  assert.equal(d.tier, "PATTERN-STUDY");
  assert.equal(d.ceiling_applied, "PATTERN-STUDY");
  assert.ok(d.ceilings.some((c) => c.dim === "D07_license_class"));
});

test("decide: escalation triggers include conflicting dims", () => {
  const { normalized, evidence } = fullMaps(1);
  const d = decide({
    dims: { ...INSTALLABLE }, normalized, evidence, convergence_confidence: 1,
    escalations: [{ dim: "D07_license_class", resolution: "conflicting" }],
  });
  assert.ok(d.escalation_triggers.some((t) => t.type === "conflicting-dim" && t.dim === "D07_license_class"));
});

test("decide: MONITOR tier emits a temporal cessation signal", () => {
  const { normalized, evidence } = fullMaps(0); // all-zero -> every class score below threshold
  const dims = { D04_last_commit_days: 400, D05_contributors_90d: 0 }; // stale
  const d = decide({ dims, normalized, evidence, convergence_confidence: 1 });
  assert.equal(d.tier, "MONITOR");
  assert.ok(d.monitor, "MONITOR carries a signal");
  assert.ok(d.monitor.cessation_risk > 0.5, "stale repo -> high cessation risk");
  assert.ok(d.monitor.reeval_in_days >= 30 && d.monitor.reeval_in_days <= 180);
});

test("decide: D23 cloud-mandatory egress caps a clean repo at PATTERN-STUDY (composio case)", () => {
  const { normalized, evidence } = fullMaps(1);
  const dims = { ...INSTALLABLE, D23_data_egress: "cloud-mandatory" };
  const d = decide({ dims, normalized, evidence, convergence_confidence: 1 });
  assert.equal(d.tier, "PATTERN-STUDY"); // INSTALL-worthy dims, but egress ceiling caps it
  assert.equal(d.ceiling_applied, "PATTERN-STUDY");
  assert.ok(d.ceilings.some((c) => c.dim === "D23_data_egress"));
  assert.match(d.path_to_higher_tier, /lift/i);
});

test("decide: boundary-band escalation when install score is within ±0.05 of the threshold", () => {
  const { normalized, evidence } = fullMaps(0.6); // means 0.6 -> installGeom 0.6; cc=1 -> threshold 0.6
  const d = decide({ dims: { ...INSTALLABLE }, normalized, evidence, convergence_confidence: 1 });
  assert.ok(d.escalation_triggers.some((t) => t.type === "boundary-band"));
});

test("decide: path_to_higher_tier targets the IMMEDIATE next tier, not always INSTALL (codex P3 #1)", () => {
  const { normalized, evidence } = fullMaps(0); // all-zero scores -> MONITOR
  const d = decide({ dims: { ...INSTALLABLE }, normalized, evidence, convergence_confidence: 1 });
  assert.equal(d.tier, "MONITOR");
  assert.match(d.path_to_higher_tier, /CITE-ONLY/); // next tier up from MONITOR (not INSTALL)
});
