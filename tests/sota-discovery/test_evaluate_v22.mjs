// tests/sota-discovery/test_evaluate_v22.mjs
// node --test — the sca-v22 evaluate wiring: collect multi-source observations -> reconcile
// (Layer 1 κ) -> shrink -> score -> convergence_confidence (Layer 2) -> verdict. Fetchers are
// injected (the engine + each fetcher are unit-tested elsewhere; this proves the WIRING).
// Run: node --test tests/sota-discovery/test_evaluate_v22.mjs

import { test } from "node:test";
import assert from "node:assert/strict";

import { evaluateRepoV22 } from "../../tools/sota-discovery/evaluate-v22.mjs";
import { makeEvidence, MISSINGNESS, SOURCE_CLASS } from "../../tools/sota-discovery/lib/contract.mjs";

const ev = (value, sc = SOURCE_CLASS.A) =>
  makeEvidence(value, { source_class: sc, source_uri: "test", missingness: value == null ? MISSINGNESS.NOT_MEASURABLE : MISSINGNESS.MEASURED });

// A stub fetcher returning a fixed {dims, evidence} for the given dim map.
function stub(dimsObj, sourceClass = SOURCE_CLASS.A) {
  return async () => {
    const dims = {}, evidence = {};
    for (const [k, v] of Object.entries(dimsObj)) { dims[k] = v; evidence[k] = ev(v, sourceClass); }
    return { dims, evidence };
  };
}

const noFetch = async () => ({});

test("evaluateRepoV22 collects multi-source observations and reconciles agreement -> κ=1.0", async () => {
  const fetchers = {
    "github-graphql": stub({ D07_license_class: "permissive", D13_cc_install_path: "plugin", D17_pinning_discipline: "git-commit-sha" }),
    "license-read": stub({ D07_license_class: "permissive" }),     // 2nd D07 source, agrees
    depsdev: stub({ D21_reverse_dependents: 1000, D20_transitive_dep_health: 0.9 }),
    ecosystems: stub({ D21_reverse_dependents: 1100 }),            // 2nd D21 source, within 50% -> agree
  };
  const v = await evaluateRepoV22("o", "r", { fetchers, fetchJson: noFetch });
  assert.equal(v.schema_version, "sca-v22");
  assert.equal(v.convergence.D07_license_class.kappa, 1.0);
  assert.equal(v.convergence.D07_license_class.agreeing_sources, 2);
  assert.equal(v.convergence.D21_reverse_dependents.kappa, 1.0);
  assert.equal(v.dims.D07_license_class, "permissive");
  assert.ok(v.convergence_confidence > 0);
  assert.ok(["HIGH", "MEDIUM-HIGH", "MEDIUM", "MEDIUM-LOW", "LOW"].includes(v.confidence_band));
  assert.equal(v.escalations.length, 0);
  // §4 decision fields wired into the verdict
  assert.equal(typeof v.effective_install_threshold, "number");
  assert.equal(typeof v.decision_scores.install_geom, "number");
  assert.ok("path_to_higher_tier" in v);
});

test("evaluateRepoV22 flags a conflicting dim + records an escalation", async () => {
  const fetchers = {
    "github-graphql": stub({ D07_license_class: "permissive" }),
    "license-read": stub({ D07_license_class: "copyleft" }), // disagree -> CONFLICTING
  };
  const v = await evaluateRepoV22("o", "r", { fetchers, fetchJson: noFetch });
  assert.equal(v.convergence.D07_license_class.kappa, 0.5);
  assert.equal(v.convergence.D07_license_class.resolution, "conflicting");
  assert.equal(v.convergence.D07_license_class.missingness, MISSINGNESS.CONFLICTING);
  assert.ok(v.escalations.some((e) => e.dim === "D07_license_class"));
});

test("evaluateRepoV22 single-source dim -> κ=0.7", async () => {
  const v = await evaluateRepoV22("o", "r", { fetchers: { depsdev: stub({ D21_reverse_dependents: 500 }) }, fetchJson: noFetch });
  assert.equal(v.convergence.D21_reverse_dependents.kappa, 0.7);
  assert.equal(v.convergence.D21_reverse_dependents.measured_sources, 1);
});

test("evaluateRepoV22 routes BLOCK on a real KEV-active D22", async () => {
  const fetchers = {
    osv: stub({ D22_osv_cve: { cisa_kev_active: true, cve_count: 1, critical_count: 1, density: 0.1, kev_cves: ["CVE-2021-44228"] } }),
  };
  const v = await evaluateRepoV22("o", "r", { fetchers, fetchJson: noFetch });
  assert.equal(v.tier, "BLOCK");
  assert.equal(v.hard_filter_violations[0].dim, "D22_osv_cve");
});

test("evaluateRepoV22 unmeasured dims are honest NOT_MEASURABLE (not fabricated)", async () => {
  const v = await evaluateRepoV22("o", "r", { fetchers: { depsdev: stub({ D21_reverse_dependents: 10 }) }, fetchJson: noFetch });
  assert.equal(v.convergence.D07_license_class.missingness, MISSINGNESS.NOT_MEASURABLE);
  assert.equal(v.convergence.D07_license_class.measured_sources, 0);
  assert.equal(v.dims.D07_license_class, null);
});
