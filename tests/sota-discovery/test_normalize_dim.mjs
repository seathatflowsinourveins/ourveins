// tests/sota-discovery/test_normalize_dim.mjs
// node --test — normalizeDim (relocated to contract.mjs in P2-beta), focusing on the D22 KEV/
// critical-penalty semantics (codex P2-beta #1: CVSS-critical is a score penalty, not a veto).
// Run: node --test tests/sota-discovery/test_normalize_dim.mjs

import { test } from "node:test";
import assert from "node:assert/strict";
import { normalizeDim } from "../../tools/sota-discovery/lib/contract.mjs";

const approx = (a, b, eps = 1e-9) => assert.ok(Math.abs(a - b) <= eps, `${a} ≈ ${b}`);

test("normalizeDim D22: real KEV -> 0 (veto)", () => {
  approx(normalizeDim("D22_osv_cve", { cisa_kev_active: true, density: 0.1, critical_count: 1 }), 0);
});

test("normalizeDim D22: CVSS-critical non-KEV lowers score (penalty, not veto)", () => {
  const nonCritical = normalizeDim("D22_osv_cve", { cisa_kev_active: false, density: 0.1, critical_count: 0 });
  const critical = normalizeDim("D22_osv_cve", { cisa_kev_active: false, density: 0.1, critical_count: 1 });
  approx(nonCritical, 0.9); // 1 - 0.1
  assert.ok(critical < nonCritical, "a critical non-KEV vuln scores LOWER than a non-critical one");
  assert.ok(critical > 0, "but it is NOT a veto (stays > 0)");
  approx(critical, 0.9 * (1 - 0.2 * (1 / 3))); // 0.84
  // more criticals -> lower (penalty saturates at /3)
  const crit3 = normalizeDim("D22_osv_cve", { cisa_kev_active: false, density: 0.1, critical_count: 3 });
  assert.ok(crit3 < critical);
});

test("normalizeDim D22: UNKNOWN KEV (null) is not forced to 0", () => {
  const v = normalizeDim("D22_osv_cve", { cisa_kev_active: null, density: 0.1, critical_count: 1 });
  assert.ok(v > 0, "unknown KEV must not be a fabricated veto");
});

test("normalizeDim D22: bad input -> null", () => {
  assert.equal(normalizeDim("D22_osv_cve", null), null);
  assert.equal(normalizeDim("D22_osv_cve", "x"), null);
});

test("normalizeDim sanity for representative dims (relocation behavior-preserving)", () => {
  assert.equal(normalizeDim("D07_license_class", "permissive"), 1);
  assert.equal(normalizeDim("D07_license_class", "copyleft"), 0.5);
  assert.equal(normalizeDim("D07_license_class", "noassertion"), 0);
  assert.equal(normalizeDim("D13_cc_install_path", "plugin"), 1);
  assert.equal(normalizeDim("D17_pinning_discipline", "git-commit-sha"), 1);
  assert.equal(normalizeDim("D04_last_commit_days", null), null);
  approx(normalizeDim("D21_reverse_dependents", 10000), 1); // log10(10000)/4 = 1
});
