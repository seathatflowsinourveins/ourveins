// tests/sota-discovery/test_discover_coverage_expected.mjs
// node --test — expectedFacets / missing_facets enforcement (codex P1-review finding #4):
// "complete" must mean ALL six required discovery facets ran, not merely "every facet that
// happened to be passed ran". Run: node --test tests/sota-discovery/test_discover_coverage_expected.mjs

import { test } from "node:test";
import assert from "node:assert/strict";

import { checkCoverage, buildGapReport } from "../../tools/sota-discovery/lib/discovery/coverage.mjs";
import { ALL_FACETS } from "../../tools/sota-discovery/lib/discovery/shared.mjs";

const ranFacet = (facet) => ({ facet, ran: true, truncated: false, error: null, slices: [] });

test("checkCoverage flags required facets that were never supplied (missing_facets)", () => {
  const facetRuns = ALL_FACETS.slice(0, 3).map(ranFacet); // only 3 of 6 required present
  const cov = checkCoverage({ facetRuns, candidates: [], anchors: [], expectedFacets: ALL_FACETS });
  assert.equal(cov.complete, false);
  assert.equal(cov.missing_facets.length, 3);
  assert.deepEqual([...cov.missing_facets].sort(), [...ALL_FACETS.slice(3)].sort());
  assert.equal(cov.summary.missing_facets, 3);
  assert.equal(cov.summary.expected_facets, 6);
  const gap = buildGapReport(cov, { query: "x", generatedAt: "t" });
  assert.deepEqual([...gap.gaps.missing_facets].sort(), [...ALL_FACETS.slice(3)].sort());
  assert.match(gap.recommendation, /required facet/);
});

test("checkCoverage complete when all expected facets ran", () => {
  const cov = checkCoverage({ facetRuns: ALL_FACETS.map(ranFacet), candidates: [], anchors: [], expectedFacets: ALL_FACETS });
  assert.equal(cov.complete, true);
  assert.equal(cov.missing_facets.length, 0);
});

test("checkCoverage without expectedFacets is unchanged (back-compat)", () => {
  const cov = checkCoverage({ facetRuns: ALL_FACETS.slice(0, 2).map(ranFacet), candidates: [], anchors: [] });
  assert.equal(cov.missing_facets.length, 0);
  assert.equal(cov.complete, true); // no expected-set enforcement when none supplied
  assert.equal(cov.summary.expected_facets, null);
});

test("a non-run required facet is missing even if it was passed", () => {
  const facetRuns = [
    ranFacet(ALL_FACETS[0]),
    { facet: ALL_FACETS[1], ran: false, truncated: false, error: "no token", slices: [] },
    ...ALL_FACETS.slice(2).map(ranFacet),
  ];
  const cov = checkCoverage({ facetRuns, candidates: [], anchors: [], expectedFacets: ALL_FACETS });
  assert.equal(cov.complete, false);
  assert.ok(cov.missing_facets.includes(ALL_FACETS[1]), "a passed-but-not-run facet counts as missing");
});
