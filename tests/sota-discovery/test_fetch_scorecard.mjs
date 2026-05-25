// tests/sota-discovery/test_fetch_scorecard.mjs
// node --test  — unit tests for the OSSF Scorecard fetcher.
// Uses a MOCK ctx.fetchJson returning canned Scorecard JSON (no network).

import { test } from "node:test";
import assert from "node:assert/strict";

import { fetchScorecard } from "../../tools/sota-discovery/lib/fetchers/scorecard.mjs";
import { PROVENANCE, MISSINGNESS, SOURCE_CLASS } from "../../tools/sota-discovery/lib/contract.mjs";

// --- canned report builders (mirror the live shape verified 2026-05-23) ---
function check(name, score, reason = "") {
  return { name, score, reason, details: null, documentation: { short: "", url: "" } };
}

function report(score, checks) {
  return {
    date: "2026-05-23T00:00:00Z",
    repo: { name: "github.com/x/y", commit: "deadbeef" },
    scorecard: { version: "v5", commit: "cafef00d" },
    score,
    checks,
  };
}

// Healthy repo: signed + clean token perms + clean workflow -> VERIFIED_CLEAN.
const HEALTHY = report(9, [
  check("Signed-Releases", 10, "5/5 releases signed"),
  check("Token-Permissions", 9, "no excessive perms"),
  check("Dangerous-Workflow", 10, "no dangerous patterns"),
  check("CI-Tests", 10, "30/30 PRs CI-checked"),
  check("Code-Review", 10, "all changesets reviewed"),
  check("Pinned-Dependencies", 9, "hash-pinned"),
]);

// Signed BUT risky workflow (mirrors real sigstore/cosign: Signed-Releases=8, Token-Permissions=0).
const SIGNED_RISKY = report(7.7, [
  check("Signed-Releases", 8, "5/5 releases signed"),
  check("Token-Permissions", 0, "detected excessive workflow token permissions"),
  check("Dangerous-Workflow", 10, "no dangerous patterns"),
  check("CI-Tests", 10, "ci ok"),
  check("Code-Review", 10, "reviewed"),
  check("Pinned-Dependencies", 6, "partially pinned"),
]);

// Helper to build a mock ctx whose fetchJson returns a fixed payload (or throws for 404).
function mockCtx(payloadOrThrow) {
  return {
    fetchJson: async (_url) => {
      if (payloadOrThrow instanceof Error) throw payloadOrThrow;
      return payloadOrThrow;
    },
  };
}

test("healthy repo -> D08 verified-and-preflight-clean", async () => {
  const r = await fetchScorecard("ossf", "scorecard", mockCtx(HEALTHY));
  assert.equal(r.dims.D08_provenance, PROVENANCE.VERIFIED_CLEAN);
  assert.equal(r.evidence.D08_provenance.missingness, MISSINGNESS.MEASURED);
  assert.equal(r.evidence.D08_provenance.source_class, SOURCE_CLASS.A);
  // D10 proxy = (10+10)/2 / 10 = 1.0
  assert.equal(r.dims.D10_test_coverage_pct, 1);
  assert.equal(r.evidence.D10_test_coverage_pct.missingness, MISSINGNESS.MEASURED);
  // D17: Pinned-Dependencies 9 -> git-commit-sha
  assert.equal(r.dims.D17_pinning_discipline, "git-commit-sha");
});

test("signed-but-risky-workflow -> D08 present-unverified (NOT verified-clean)", async () => {
  const r = await fetchScorecard("sigstore", "cosign", mockCtx(SIGNED_RISKY));
  // The core Stream A reframe assertion: signed != safe.
  assert.equal(r.dims.D08_provenance, PROVENANCE.PRESENT_UNVERIFIED);
  assert.notEqual(r.dims.D08_provenance, PROVENANCE.VERIFIED_CLEAN);
  assert.equal(r.evidence.D08_provenance.missingness, MISSINGNESS.MEASURED);
  // D17: Pinned-Dependencies 6 -> npm-exact-version
  assert.equal(r.dims.D17_pinning_discipline, "npm-exact-version");
});

test("404 (no precomputed report) -> all dims NOT_MEASURABLE, no fabricated scores", async () => {
  const notFound = new Error("HTTP 404");
  const r = await fetchScorecard("nobody", "nothing", mockCtx(notFound));
  assert.equal(r.dims.D08_provenance, null);
  assert.equal(r.dims.D10_test_coverage_pct, null);
  assert.equal(r.dims.D17_pinning_discipline, null);
  for (const k of ["D08_provenance", "D10_test_coverage_pct", "D17_pinning_discipline"]) {
    assert.equal(r.evidence[k].missingness, MISSINGNESS.NOT_MEASURABLE);
    assert.equal(r.evidence[k].source_class, SOURCE_CLASS.A);
    assert.ok(typeof r.evidence[k].source_uri === "string" && r.evidence[k].source_uri.length > 0);
  }
});

test("no signing -> D08 absent", async () => {
  const unsigned = report(5, [
    check("Signed-Releases", 0, "0 signed releases"),
    check("Token-Permissions", 10, "clean"),
    check("Dangerous-Workflow", 10, "clean"),
    check("CI-Tests", 8, "ci ok"),
    check("Code-Review", 6, "some reviewed"),
    check("Pinned-Dependencies", 2, "mostly unpinned"),
  ]);
  const r = await fetchScorecard("x", "y", mockCtx(unsigned));
  assert.equal(r.dims.D08_provenance, PROVENANCE.ABSENT);
  // D10 proxy = (8+6)/2 / 10 = 0.7
  assert.equal(r.dims.D10_test_coverage_pct, 0.7);
  // D17: Pinned-Dependencies 2 -> untagged
  assert.equal(r.dims.D17_pinning_discipline, "untagged");
});

test("inconclusive (-1) sentinels handled distinctly from low scores", async () => {
  // Signed high but Token-Permissions inconclusive (-1): cannot positively confirm clean ->
  // conservative downgrade to PRESENT_UNVERIFIED (signed != safe unless clean is CONFIRMED).
  const inconclusive = report(6, [
    check("Signed-Releases", 9, "signed"),
    check("Token-Permissions", -1, "inconclusive"),
    check("Dangerous-Workflow", 10, "clean"),
    // CI-Tests inconclusive, Code-Review present -> proxy uses only the measured one.
    check("CI-Tests", -1, "inconclusive"),
    check("Code-Review", 8, "reviewed"),
    // Pinned-Dependencies inconclusive -> not-applicable + NOT_MEASURABLE.
    check("Pinned-Dependencies", -1, "inconclusive"),
  ]);
  const r = await fetchScorecard("x", "y", mockCtx(inconclusive));
  assert.equal(r.dims.D08_provenance, PROVENANCE.PRESENT_UNVERIFIED);
  // D10 proxy from Code-Review only: 8/10 = 0.8
  assert.equal(r.dims.D10_test_coverage_pct, 0.8);
  // D17 inconclusive -> not-applicable, NOT_MEASURABLE
  assert.equal(r.dims.D17_pinning_discipline, "not-applicable");
  assert.equal(r.evidence.D17_pinning_discipline.missingness, MISSINGNESS.NOT_MEASURABLE);
});

test("missing Signed-Releases check entirely -> D08 NOT_MEASURABLE", async () => {
  const noSigned = report(7, [
    check("Token-Permissions", 9, "clean"),
    check("Dangerous-Workflow", 10, "clean"),
    check("CI-Tests", 10, "ci ok"),
    check("Code-Review", 10, "reviewed"),
  ]);
  const r = await fetchScorecard("x", "y", mockCtx(noSigned));
  assert.equal(r.dims.D08_provenance, null);
  assert.equal(r.evidence.D08_provenance.missingness, MISSINGNESS.NOT_MEASURABLE);
});
