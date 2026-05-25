// tests/sota-discovery/test_contract.mjs
// Unit tests for the sca-v21-MVP contract: per-class scoring (FROZEN v20 weights),
// 5-tier soft-gate routing (hard-BLOCK + hard-filter + route-down), evidence/missingness
// model, and confidence discounting. No HTTP — pure logic. Run: node --test.

import { test } from "node:test";
import assert from "node:assert/strict";
import {
  DIMS, MISSINGNESS, SOURCE_CLASS, CLUSTER_WEIGHTS,
  makeEvidence, scoreClass, routeTier, computeConfidence,
} from "../../tools/sota-discovery/lib/contract.mjs";

// Helper: build a fully-measured evidence map + normalized dims at a uniform value.
function uniform(normValue, missingness = MISSINGNESS.MEASURED) {
  const norm = {};
  const ev = {};
  for (const k of Object.keys(DIMS)) {
    norm[k] = normValue;
    ev[k] = makeEvidence(normValue, { source_class: SOURCE_CLASS.A, source_uri: "test://", missingness });
  }
  return { norm, ev };
}

test("cluster weights sum ~1 per decision class", () => {
  for (const [cls, w] of Object.entries(CLUSTER_WEIGHTS)) {
    const sum = Object.values(w).reduce((a, b) => a + b, 0);
    assert.ok(Math.abs(sum - 1) < 1e-9, `${cls} weights sum=${sum}`);
  }
});

test("scoreClass returns [0,1] and tracks input level", () => {
  const hi = uniform(1.0);
  const lo = uniform(0.0);
  for (const cls of ["INSTALL", "PATTERN-STUDY", "CITE-ONLY", "MONITOR"]) {
    const sHi = scoreClass(cls, hi.norm, hi.ev);
    const sLo = scoreClass(cls, lo.norm, lo.ev);
    assert.ok(sHi >= 0 && sHi <= 1, `${cls} hi in range`);
    assert.ok(sHi > sLo, `${cls} hi(${sHi}) > lo(${sLo})`);
  }
});

test("unmeasured dims contribute NEUTRAL 0.5 (unknown != clean, unknown != zero)", () => {
  const { norm, ev } = uniform(0.0, MISSINGNESS.NOT_MEASURABLE); // value 0 but NOT measured
  // Despite raw 0, missingness=not-measurable -> neutral 0.5 contribution -> score ~0.5-weighted.
  const s = scoreClass("PATTERN-STUDY", norm, ev);
  assert.ok(s > 0.4 && s < 0.6, `neutral score ~0.5, got ${s}`);
});

test("routeTier hard-BLOCK on active CISA-KEV", () => {
  const dims = { D22_osv_cve: { cisa_kev_active: true, density: 0.9 }, D07_license_class: "permissive", D13_cc_install_path: "plugin" };
  const r = routeTier(dims, {}, { install: 0.9, pattern_study: 0.9, cite_only: 0.9, monitor: 0.5 });
  assert.equal(r.tier, "BLOCK");
  assert.equal(r.hard_filter_violations[0].dim, "D22_osv_cve");
});

test("routeTier hard-BLOCK on proprietary license", () => {
  const dims = { D07_license_class: "proprietary", D13_cc_install_path: "plugin" };
  const r = routeTier(dims, {}, { install: 0.9, pattern_study: 0.9, cite_only: 0.9, monitor: 0.5 });
  assert.equal(r.tier, "BLOCK");
});

test("routeTier downgrades INSTALL->PATTERN-STUDY when install-path not a CC primitive", () => {
  const dims = { D07_license_class: "permissive", D13_cc_install_path: "cli-only", D22_osv_cve: { cisa_kev_active: false } };
  const r = routeTier(dims, {}, { install: 0.9, pattern_study: 0.8, cite_only: 0.7, monitor: 0.5 });
  assert.equal(r.tier, "PATTERN-STUDY");
  assert.ok(r.hard_filter_violations.some((v) => v.dim === "D13_cc_install_path"));
});

test("routeTier INSTALL when clean permissive CC primitive + exact pinning + high install score", () => {
  // codex W380-r2 P1: INSTALL now requires POSITIVE permissive license AND exact pinning evidence.
  const dims = { D07_license_class: "permissive", D13_cc_install_path: "mcp-server", D17_pinning_discipline: "git-commit-sha", D22_osv_cve: { cisa_kev_active: false } };
  const r = routeTier(dims, {}, { install: 0.75, pattern_study: 0.6, cite_only: 0.5, monitor: 0.5 });
  assert.equal(r.tier, "INSTALL");
  assert.equal(r.hard_filter_violations.length, 0);
});

test("routeTier denies INSTALL when license unmeasured (unknown != clean) — codex W380-r2 P1", () => {
  const dims = { D07_license_class: null, D13_cc_install_path: "mcp-server", D17_pinning_discipline: "git-commit-sha", D22_osv_cve: { cisa_kev_active: false } };
  const r = routeTier(dims, {}, { install: 0.9, pattern_study: 0.6, cite_only: 0.5, monitor: 0.5 });
  assert.notEqual(r.tier, "INSTALL");
  assert.ok(r.hard_filter_violations.some((v) => v.dim === "D07_license_class"));
});

test("routeTier denies INSTALL when pinning unmeasured/weak — codex W380-r2 P1", () => {
  const dims = { D07_license_class: "permissive", D13_cc_install_path: "mcp-server", D17_pinning_discipline: "version-range", D22_osv_cve: { cisa_kev_active: false } };
  const r = routeTier(dims, {}, { install: 0.9, pattern_study: 0.6, cite_only: 0.5, monitor: 0.5 });
  assert.notEqual(r.tier, "INSTALL");
  assert.ok(r.hard_filter_violations.some((v) => v.dim === "D17_pinning_discipline"));
});

test("routeTier falls to MONITOR when all class scores below thresholds", () => {
  const dims = { D07_license_class: "permissive", D13_cc_install_path: "library-only", D22_osv_cve: { cisa_kev_active: false } };
  const r = routeTier(dims, {}, { install: 0.2, pattern_study: 0.2, cite_only: 0.2, monitor: 0.3 });
  assert.equal(r.tier, "MONITOR");
});

test("computeConfidence discounts by measured-evidence ratio", () => {
  const all = uniform(1.0, MISSINGNESS.MEASURED);
  assert.equal(computeConfidence(all.ev), "HIGH");
  const none = uniform(1.0, MISSINGNESS.NOT_MEASURABLE);
  assert.equal(computeConfidence(none.ev), "LOW");
});

test("makeEvidence infers missingness from null value", () => {
  const ev = makeEvidence(null, { source_class: SOURCE_CLASS.A, source_uri: "x" });
  assert.equal(ev.missingness, MISSINGNESS.NOT_MEASURABLE);
  const ev2 = makeEvidence(42, { source_class: SOURCE_CLASS.A, source_uri: "x" });
  assert.equal(ev2.missingness, MISSINGNESS.MEASURED);
});
