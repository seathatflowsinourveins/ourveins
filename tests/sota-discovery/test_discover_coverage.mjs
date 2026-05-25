/**
 * Tests for coverage.mjs — sca-v22 coverage-CHECK + gap-report.
 * Uses node:test + node:assert/strict (no external deps).
 * Written FIRST (TDD red → green).
 *
 * Design reference: docs/architecture/W384-RESEARCH-ARCH-V22/DESIGN.md §1
 * (coverage-CHECK — a check, not a guarantee; codex r1)
 */
import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { checkCoverage, buildGapReport } from "../../tools/sota-discovery/lib/discovery/coverage.mjs";

// ─── helpers ────────────────────────────────────────────────────────────────

/** Build a clean facet entry (ran, not truncated, no slices). */
function facet(name, overrides = {}) {
  return { facet: name, ran: true, truncated: false, error: null, ...overrides };
}

/** Build a candidate with given sources. */
function candidate(repo, ...sources) {
  return { repo, sources };
}

// ─── Test 1: All-clear ──────────────────────────────────────────────────────

describe("checkCoverage – all-clear", () => {
  it("returns complete:true when all 6 facets ran, no truncation, all anchor alternatives present", () => {
    const input = {
      facetRuns: [
        facet("keyword"),
        facet("trending"),
        facet("awesome-list"),
        facet("dependency-used-by"),
        facet("citation"),
        facet("ecosystem"),
      ],
      candidates: [
        candidate("org/repo-a", "keyword", "trending"),
        candidate("org/repo-b", "awesome-list"),
        candidate("x/y", "keyword"),
        candidate("z/w", "citation"),
      ],
      anchors: [
        { repo: "anchor/main", alternatives: ["x/y", "z/w"] },
      ],
    };

    const cov = checkCoverage(input);

    assert.equal(cov.complete, true);
    assert.deepEqual(cov.anchor_holes, []);
    assert.deepEqual(cov.truncated_slices, []);
    assert.equal(cov.summary.facets_total, 6);
    assert.equal(cov.summary.facets_ran, 6);
    assert.equal(cov.summary.holes_found, 0);
  });

  it("buildGapReport recommendation starts with 'OK' when complete", () => {
    const input = {
      facetRuns: [facet("keyword"), facet("trending")],
      candidates: [candidate("x/y", "keyword"), candidate("z/w", "trending")],
      anchors: [{ repo: "a/b", alternatives: ["x/y", "z/w"] }],
    };
    const cov = checkCoverage(input);
    const report = buildGapReport(cov, { query: "test", generatedAt: "2026-05-23" });
    assert.ok(report.recommendation.startsWith("OK"), `Expected 'OK' but got: ${report.recommendation}`);
  });
});

// ─── Test 2: Facet not run ───────────────────────────────────────────────────

describe("checkCoverage – facet not run", () => {
  it("complete:false when one facet ran:false; gap report lists it in facets_not_run", () => {
    const input = {
      facetRuns: [
        facet("keyword"),
        facet("trending", { ran: false }),
        facet("awesome-list"),
      ],
      candidates: [],
      anchors: [],
    };

    const cov = checkCoverage(input);
    assert.equal(cov.complete, false);
    assert.equal(cov.summary.facets_ran, 2);
    assert.equal(cov.summary.facets_total, 3);

    const report = buildGapReport(cov, { query: "q", generatedAt: "2026-05-23" });
    assert.ok(report.gaps.facets_not_run.includes("trending"),
      `Expected 'trending' in facets_not_run: ${JSON.stringify(report.gaps.facets_not_run)}`);
  });

  it("facet with non-null error is treated as not run (complete:false)", () => {
    const input = {
      facetRuns: [
        facet("keyword"),
        facet("citation", { ran: false, error: "timeout" }),
      ],
      candidates: [],
      anchors: [],
    };
    const cov = checkCoverage(input);
    assert.equal(cov.complete, false);
    assert.equal(cov.summary.facets_ran, 1);
  });
});

// ─── Test 3: Truncated slice ─────────────────────────────────────────────────

describe("checkCoverage – truncated slice", () => {
  it("complete:false when a slice is truncated; truncated_slices length 1 tagged with facet name", () => {
    const input = {
      facetRuns: [
        facet("keyword", {
          slices: [
            { qualifier: "stars:0", count: 1500, retrieved: 1000, truncated: true },
          ],
        }),
        facet("trending"),
      ],
      candidates: [],
      anchors: [],
    };

    const cov = checkCoverage(input);
    assert.equal(cov.complete, false);
    assert.equal(cov.truncated_slices.length, 1);
    assert.equal(cov.truncated_slices[0].facet, "keyword");
    assert.equal(cov.truncated_slices[0].qualifier, "stars:0");
    assert.equal(cov.truncated_slices[0].count, 1500);
    assert.equal(cov.truncated_slices[0].retrieved, 1000);
    assert.equal(cov.summary.slices_truncated, 1);
  });

  it("facets_truncated counts facets whose truncated===true (top-level flag)", () => {
    const input = {
      facetRuns: [
        facet("keyword", { truncated: true }),
        facet("trending"),
      ],
      candidates: [],
      anchors: [],
    };
    const cov = checkCoverage(input);
    assert.equal(cov.summary.facets_truncated, 1);
    assert.equal(cov.complete, false);
  });
});

// ─── Test 4: Anchor hole ─────────────────────────────────────────────────────

describe("checkCoverage – anchor hole", () => {
  it("anchor_holes shows missing alternative; complete:false", () => {
    const input = {
      facetRuns: [facet("keyword")],
      candidates: [
        candidate("z/w", "keyword"),
      ],
      anchors: [
        { repo: "a/b", alternatives: ["x/y", "z/w"] },
      ],
    };

    const cov = checkCoverage(input);
    assert.equal(cov.complete, false);
    assert.equal(cov.anchor_holes.length, 1);
    assert.equal(cov.anchor_holes[0].anchor, "a/b");
    assert.deepEqual(cov.anchor_holes[0].missing, ["x/y"]);
    assert.equal(cov.summary.holes_found, 1);
  });

  it("anchor with no missing alternatives is omitted from anchor_holes", () => {
    const input = {
      facetRuns: [facet("keyword")],
      candidates: [candidate("x/y", "keyword"), candidate("z/w", "keyword")],
      anchors: [{ repo: "a/b", alternatives: ["x/y", "z/w"] }],
    };
    const cov = checkCoverage(input);
    assert.deepEqual(cov.anchor_holes, []);
    assert.equal(cov.summary.holes_found, 0);
  });

  it("self-reference alternative is skipped (not treated as a hole)", () => {
    const input = {
      facetRuns: [facet("keyword")],
      candidates: [],
      anchors: [{ repo: "a/b", alternatives: ["a/b"] }],
    };
    const cov = checkCoverage(input);
    // "a/b" is skipped as self-ref, so no holes
    assert.deepEqual(cov.anchor_holes, []);
    assert.equal(cov.summary.holes_found, 0);
  });
});

// ─── Test 5: Gem kept / leader set ──────────────────────────────────────────

describe("checkCoverage – leader_set and candidate_gems", () => {
  it("single-source candidate appears in candidate_gems only", () => {
    const input = {
      facetRuns: [facet("keyword"), facet("trending")],
      candidates: [
        candidate("o/gem", "awesome-list"),
        candidate("o/leader", "keyword", "trending"),
      ],
      anchors: [],
    };

    const cov = checkCoverage(input);
    assert.ok(cov.candidate_gems.includes("o/gem"), "gem should be in candidate_gems");
    assert.ok(!cov.leader_set.includes("o/gem"), "gem should NOT be in leader_set");
    assert.ok(cov.leader_set.includes("o/leader"), "leader should be in leader_set");
    assert.ok(!cov.candidate_gems.includes("o/leader"), "leader should NOT be in candidate_gems");
  });

  it("leader_set and candidate_gems are sorted ascending", () => {
    const input = {
      facetRuns: [facet("keyword")],
      candidates: [
        candidate("z/repo", "keyword", "trending"),
        candidate("a/repo", "keyword", "trending"),
        candidate("m/gem", "keyword"),
        candidate("b/gem", "keyword"),
      ],
      anchors: [],
    };
    const cov = checkCoverage(input);
    assert.deepEqual(cov.leader_set, ["a/repo", "z/repo"]);
    assert.deepEqual(cov.candidate_gems, ["b/gem", "m/gem"]);
  });

  it("candidates_total counts all candidates", () => {
    const input = {
      facetRuns: [facet("keyword")],
      candidates: [candidate("a/1", "keyword"), candidate("b/2", "keyword", "trending")],
      anchors: [],
    };
    const cov = checkCoverage(input);
    assert.equal(cov.summary.candidates_total, 2);
  });
});

// ─── Test 6: Case-insensitive anchor match ────────────────────────────────────

describe("checkCoverage – case-insensitive anchor matching", () => {
  it("OpenAI/Whisper alternative matches candidate openai/whisper (no hole)", () => {
    const input = {
      facetRuns: [facet("keyword")],
      candidates: [candidate("openai/whisper", "keyword")],
      anchors: [{ repo: "speech/engine", alternatives: ["OpenAI/Whisper"] }],
    };

    const cov = checkCoverage(input);
    assert.deepEqual(cov.anchor_holes, [], "case-insensitive match should produce no holes");
    assert.equal(cov.summary.holes_found, 0);
  });

  it("mixed-case candidate and anchor: UPPER/LOWER vs lower/upper — no hole", () => {
    const input = {
      facetRuns: [facet("keyword")],
      candidates: [candidate("OWNER/REPO", "keyword")],
      anchors: [{ repo: "a/b", alternatives: ["owner/repo"] }],
    };
    const cov = checkCoverage(input);
    assert.deepEqual(cov.anchor_holes, []);
  });
});

// ─── Test 7: buildGapReport shape ─────────────────────────────────────────

describe("buildGapReport – documented shape", () => {
  it("has required top-level keys including schema, query, generated_at", () => {
    const input = {
      facetRuns: [facet("keyword")],
      candidates: [],
      anchors: [],
    };
    const cov = checkCoverage(input);
    const report = buildGapReport(cov, { query: "agent frameworks", generatedAt: "2026-05-23T00:00:00Z" });

    assert.equal(report.schema, "sca-v22-coverage-gap");
    assert.equal(report.query, "agent frameworks");
    assert.equal(report.generated_at, "2026-05-23T00:00:00Z");
    assert.equal(typeof report.complete, "boolean");
    assert.ok("gaps" in report);
    assert.ok("facets_not_run" in report.gaps);
    assert.ok("truncated_slices" in report.gaps);
    assert.ok("anchor_holes" in report.gaps);
    assert.equal(typeof report.leader_count, "number");
    assert.equal(typeof report.gem_count, "number");
    assert.ok(report.recommendation.length > 0, "recommendation must be non-empty");
  });

  it("non-complete report has 'INVESTIGATE' in recommendation", () => {
    const input = {
      facetRuns: [facet("keyword", { ran: false })],
      candidates: [],
      anchors: [],
    };
    const cov = checkCoverage(input);
    const report = buildGapReport(cov, { query: "q", generatedAt: "2026-05-23" });
    assert.ok(
      report.recommendation.includes("INVESTIGATE"),
      `Expected 'INVESTIGATE' but got: ${report.recommendation}`
    );
  });

  it("gaps.anchor_holes mirrors checkCoverage anchor_holes", () => {
    const input = {
      facetRuns: [facet("keyword")],
      candidates: [],
      anchors: [{ repo: "a/b", alternatives: ["x/y"] }],
    };
    const cov = checkCoverage(input);
    const report = buildGapReport(cov, { query: "q", generatedAt: "2026-05-23" });
    assert.deepEqual(report.gaps.anchor_holes, cov.anchor_holes);
  });

  it("leader_count and gem_count match actual set lengths", () => {
    const input = {
      facetRuns: [facet("keyword"), facet("trending")],
      candidates: [
        candidate("a/lead", "keyword", "trending"),
        candidate("b/gem", "keyword"),
        candidate("c/gem", "trending"),
      ],
      anchors: [],
    };
    const cov = checkCoverage(input);
    const report = buildGapReport(cov, { query: "q", generatedAt: "2026-05-23" });
    assert.equal(report.leader_count, cov.leader_set.length);
    assert.equal(report.gem_count, cov.candidate_gems.length);
  });
});
