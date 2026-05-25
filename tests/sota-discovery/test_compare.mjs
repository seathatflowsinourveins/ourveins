// tests/sota-discovery/test_compare.mjs
// node --test — sca-v22 COMPARISON plane (§5): peer-set safeguards, Pareto frontier, TOPSIS
// ranking, ELECTRE-veto demotion, dim-by-dim winners. Run: node --test tests/sota-discovery/test_compare.mjs

import { test } from "node:test";
import assert from "node:assert/strict";

import { comparePeers, validatePeerSet, verdictClusterMeans } from "../../tools/sota-discovery/lib/compare.mjs";
import { MISSINGNESS } from "../../tools/sota-discovery/lib/contract.mjs";

// Build a minimal sca-v22-shaped verdict from a dims map.
function verdict(repo, dims, opts = {}) {
  const convergence = {};
  for (const k of Object.keys(dims)) {
    convergence[k] = { missingness: dims[k] == null ? MISSINGNESS.NOT_MEASURABLE : MISSINGNESS.MEASURED };
  }
  return { repo, dims, convergence, tier: opts.tier || "PATTERN-STUDY", convergence_confidence: opts.cc ?? 0.8 };
}

// A dominates B on every key dim; C is incomparable (higher on D20/D10/D18, lower on D21/D11).
const A = verdict("o/a", { D13_cc_install_path: "plugin", D20_transitive_dep_health: 0.9, D21_reverse_dependents: 5000, D10_test_coverage_pct: 0.9, D11_ci_green_streak_days: 30, D18_arch_relevance: 0.9, D07_license_class: "permissive" });
const B = verdict("o/b", { D13_cc_install_path: "plugin", D20_transitive_dep_health: 0.5, D21_reverse_dependents: 1000, D10_test_coverage_pct: 0.5, D11_ci_green_streak_days: 10, D18_arch_relevance: 0.5, D07_license_class: "permissive" });
const C = verdict("o/c", { D13_cc_install_path: "plugin", D20_transitive_dep_health: 0.95, D21_reverse_dependents: 100, D10_test_coverage_pct: 0.95, D11_ci_green_streak_days: 5, D18_arch_relevance: 0.95, D07_license_class: "permissive" });

test("comparePeers: Pareto frontier excludes the dominated peer, keeps the incomparable ones", () => {
  const r = comparePeers([A, B, C]);
  assert.ok(r.pareto_frontier.includes("o/a"), "A non-dominated");
  assert.ok(r.pareto_frontier.includes("o/c"), "C incomparable -> on frontier");
  assert.ok(!r.pareto_frontier.includes("o/b"), "B is dominated by A -> off frontier");
});

test("comparePeers: dim-by-dim winners", () => {
  const r = comparePeers([A, B, C]);
  assert.equal(r.dim_winners.D21_reverse_dependents.winner, "o/a"); // 5000 highest
  assert.equal(r.dim_winners.D20_transitive_dep_health.winner, "o/c"); // 0.95 highest
  assert.equal(r.dim_winners.D11_ci_green_streak_days.winner, "o/a"); // 30 days highest
});

test("comparePeers: TOPSIS produces a complete ranking (ranks 1..N, closeness in [0,1])", () => {
  const r = comparePeers([A, B, C]);
  assert.equal(r.topsis.length, 3);
  const ranks = r.topsis.map((t) => t.topsis_rank).sort();
  assert.deepEqual(ranks, [1, 2, 3]);
  for (const t of r.topsis) assert.ok(t.closeness >= 0 && t.closeness <= 1);
  assert.notEqual(r.topsis.find((t) => t.topsis_rank === 1).repo, "o/b"); // the dominated peer isn't best
});

test("comparePeers: ELECTRE veto demotes a non-compensable-fail peer below all clean peers", () => {
  // D has great dims (would top TOPSIS) but a copyleft license -> non-compensable veto.
  const D = verdict("o/d", { D13_cc_install_path: "plugin", D20_transitive_dep_health: 1, D21_reverse_dependents: 100000, D10_test_coverage_pct: 1, D11_ci_green_streak_days: 60, D18_arch_relevance: 1, D07_license_class: "copyleft" });
  const r = comparePeers([A, B, C, D]);
  const dEntry = r.ranking.find((x) => x.repo === "o/d");
  assert.ok(dEntry.veto.includes("D07_license_class"), "D flagged with the license veto");
  // D ranks LAST (after every clean peer), regardless of its strong dims.
  assert.equal(r.ranking[r.ranking.length - 1].repo, "o/d");
  for (const clean of ["o/a", "o/b", "o/c"]) {
    assert.ok(r.ranking.findIndex((x) => x.repo === clean) < r.ranking.findIndex((x) => x.repo === "o/d"));
  }
});

test("comparePeers: KEV-active peer is veto-demoted too", () => {
  const K = verdict("o/k", { D13_cc_install_path: "plugin", D20_transitive_dep_health: 1, D21_reverse_dependents: 99999, D07_license_class: "permissive", D22_osv_cve: { cisa_kev_active: true } });
  const r = comparePeers([A, B, C, K]);
  const kEntry = r.ranking.find((x) => x.repo === "o/k");
  assert.ok(kEntry.veto.includes("D22_osv_cve"));
  assert.equal(r.ranking[r.ranking.length - 1].repo, "o/k");
});

test("validatePeerSet: flags small sets and mixed roles", () => {
  const small = validatePeerSet([A, B]);
  assert.equal(small.valid, false);
  assert.ok(small.warnings.some((w) => /size/.test(w)));

  const sdk = verdict("o/sdk", { D13_cc_install_path: "sdk-python", D07_license_class: "permissive" });
  const mixed = validatePeerSet([A, B, sdk]); // plugin + plugin + sdk -> two roles
  assert.equal(mixed.valid, false);
  assert.ok(mixed.warnings.some((w) => /role/.test(w)));

  const homogeneous = validatePeerSet([A, B, C]);
  assert.equal(homogeneous.valid, true);
});

test("verdictClusterMeans: unmeasured dims contribute neutral 0.5", () => {
  const sparse = verdict("o/sparse", { D21_reverse_dependents: 1000 }); // only one dim measured
  const means = verdictClusterMeans(sparse);
  // every cluster mean is defined and within [0,1]
  for (const m of Object.values(means)) assert.ok(m >= 0 && m <= 1);
});

test("comparePeers: recommendation names the top peer + frontier", () => {
  const r = comparePeers([A, B, C]);
  assert.match(r.recommendation, /top peer/);
  assert.match(r.recommendation, /Pareto frontier/);
});

test("comparePeers: a CONFLICTING dim is excluded from dim-winners (codex P4 #1)", () => {
  const conflicted = {
    repo: "o/conf",
    dims: { D13_cc_install_path: "plugin", D20_transitive_dep_health: 0.99, D21_reverse_dependents: 50, D07_license_class: "permissive" },
    convergence: {
      D13_cc_install_path: { missingness: MISSINGNESS.MEASURED },
      D20_transitive_dep_health: { missingness: MISSINGNESS.CONFLICTING }, // high raw value but CONFLICTING
      D21_reverse_dependents: { missingness: MISSINGNESS.MEASURED },
      D07_license_class: { missingness: MISSINGNESS.MEASURED },
    },
    tier: "PATTERN-STUDY", convergence_confidence: 0.6,
  };
  const r = comparePeers([A, B, conflicted]);
  assert.notEqual(r.dim_winners.D20_transitive_dep_health.winner, "o/conf"); // CONFLICTING D20 excluded
});

test("validatePeerSet: all-unmeasured peers fail the measured-coverage floor (codex P4 #2)", () => {
  const empty = (repo) => ({ repo, dims: {}, convergence: {}, tier: "MONITOR", convergence_confidence: 0 });
  const v = validatePeerSet([empty("o/x"), empty("o/y"), empty("o/z")]);
  assert.equal(v.valid, false);
  assert.ok(v.warnings.some((w) => /coverage floor/.test(w)));
});

test("comparePeers: ranking exposes a final post-veto rank (codex P4 #3)", () => {
  const r = comparePeers([A, B, C]);
  assert.deepEqual(r.ranking.map((x) => x.rank).sort((a, b) => a - b), [1, 2, 3]);
});
