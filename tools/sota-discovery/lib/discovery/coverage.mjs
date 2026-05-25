/**
 * coverage.mjs — sca-v22 SOTA-repo discovery coverage-CHECK + gap-report.
 *
 * Design reference: docs/architecture/W384-RESEARCH-ARCH-V22/DESIGN.md §1
 * (coverage-CHECK — a check, not a guarantee; codex r1)
 *
 * HONESTY CONTRACT: Coverage is a CHECK, NOT a completeness GUARANTEE.
 *   - Partitioning only proves the executed facets weren't truncated;
 *     it does NOT prove every relevant repo exists in the result set.
 *   - Anchor Alternatives cross-reference flags HOLES to investigate,
 *     not proof of incompleteness.
 *   - Single-source candidates are KEPT as candidate_gems, never dropped.
 *   - Curated-list membership = positive signal, never a disqualifier.
 *
 * Pure + deterministic. No external deps, no project imports.
 */

/**
 * @typedef {Object} SliceRun
 * @property {string} qualifier
 * @property {number} count
 * @property {number} retrieved
 * @property {boolean} truncated
 */

/**
 * @typedef {Object} FacetRun
 * @property {string} facet
 * @property {boolean} ran
 * @property {boolean} truncated
 * @property {string|null} error
 * @property {SliceRun[]} [slices]
 */

/**
 * @typedef {Object} CandidateEntry
 * @property {string} repo  - "owner/name"
 * @property {string[]} sources
 */

/**
 * @typedef {Object} AnchorEntry
 * @property {string} repo
 * @property {string[]} alternatives  - repoKeys from README Alternatives/Compared-to sections
 */

/**
 * @typedef {Object} CoverageInput
 * @property {FacetRun[]} facetRuns
 * @property {CandidateEntry[]} candidates
 * @property {AnchorEntry[]} anchors
 */

/**
 * @typedef {Object} TruncatedSlice
 * @property {string} facet
 * @property {string} qualifier
 * @property {number} count
 * @property {number} retrieved
 */

/**
 * @typedef {Object} AnchorHole
 * @property {string} anchor
 * @property {string[]} missing
 */

/**
 * @typedef {Object} CoverageSummary
 * @property {number} facets_total
 * @property {number} facets_ran
 * @property {number} facets_truncated
 * @property {number} slices_truncated
 * @property {number} anchors_checked
 * @property {number} holes_found
 * @property {number} candidates_total
 */

/**
 * @typedef {Object} CoverageResult
 * @property {boolean} complete
 * @property {Array<{facet:string, ran:boolean, truncated:boolean, error:string|null}>} facet_status
 * @property {TruncatedSlice[]} truncated_slices
 * @property {AnchorHole[]} anchor_holes
 * @property {string[]} leader_set
 * @property {string[]} candidate_gems
 * @property {CoverageSummary} summary
 */

/**
 * Check coverage of a SOTA-repo discovery run.
 *
 * Asserts every facet ran and each GitHub slice was non-truncated, and
 * cross-references known anchors' README "Alternatives/Compared-to" repos
 * against the candidate set. A missing alternative is a FLAGGED HOLE to
 * investigate, not proof of incompleteness.
 *
 * @param {CoverageInput} input
 * @returns {CoverageResult}
 */
export function checkCoverage(input) {
  const { facetRuns = [], candidates = [], anchors = [], expectedFacets = null } = input;

  // ── Facet status ──────────────────────────────────────────────────────────
  const facet_status = facetRuns.map((f) => ({
    facet: f.facet,
    ran: f.ran,
    truncated: f.truncated,
    error: f.error ?? null,
  }));

  const facets_total = facetRuns.length;
  const facets_ran = facetRuns.filter((f) => f.ran === true).length;
  const facets_truncated = facetRuns.filter((f) => f.truncated === true).length;

  // ── Truncated slices ──────────────────────────────────────────────────────
  // A facet is a truncation concern if facet.truncated===true OR any slice.truncated===true.
  // Collect each truncated slice entry tagged with {facet, qualifier, count, retrieved}.
  /** @type {TruncatedSlice[]} */
  const truncated_slices = [];
  for (const f of facetRuns) {
    if (!Array.isArray(f.slices)) continue;
    for (const slice of f.slices) {
      if (slice.truncated === true) {
        truncated_slices.push({
          facet: f.facet,
          qualifier: slice.qualifier,
          count: slice.count,
          retrieved: slice.retrieved,
        });
      }
    }
  }
  const slices_truncated = truncated_slices.length;

  // ── Anchor holes (case-insensitive) ────────────────────────────────────────
  // Build a lowercase set of candidate repo keys for O(1) lookup.
  const candidateSet = new Set(candidates.map((c) => c.repo.toLowerCase()));

  /** @type {AnchorHole[]} */
  const anchor_holes = [];
  let holes_found = 0;

  for (const anchor of anchors) {
    const anchorKeyLower = anchor.repo.toLowerCase();
    /** @type {string[]} */
    const missing = [];
    for (const alt of (anchor.alternatives ?? [])) {
      // Skip self-references
      if (alt.toLowerCase() === anchorKeyLower) continue;
      if (!candidateSet.has(alt.toLowerCase())) {
        missing.push(alt);
      }
    }
    if (missing.length > 0) {
      anchor_holes.push({ anchor: anchor.repo, missing });
      holes_found += missing.length;
    }
  }

  // ── Leader set / candidate gems ───────────────────────────────────────────
  // leader_set  = repos with sources.length >= 2  (multi-source confirmed)
  // candidate_gems = repos with sources.length === 1  (single-niche — KEPT, never dropped)
  const leader_set = candidates
    .filter((c) => c.sources.length >= 2)
    .map((c) => c.repo)
    .sort();

  const candidate_gems = candidates
    .filter((c) => c.sources.length === 1)
    .map((c) => c.repo)
    .sort();

  // ── expected-facet enforcement (codex P2 #4) ───────────────────────────────
  // When the caller supplies the full required facet set, "complete" must mean ALL of them
  // ran — not merely "every facet that happened to be passed ran". A required facet that was
  // never passed (or didn't run) is a coverage gap.
  const ranFacetIds = new Set(facetRuns.filter((f) => f.ran === true).map((f) => f.facet));
  const missing_facets = Array.isArray(expectedFacets)
    ? expectedFacets.filter((id) => !ranFacetIds.has(id))
    : [];

  // ── complete ──────────────────────────────────────────────────────────────
  // complete iff: every provided facet ran AND no truncation (top-level or slice-level) AND
  // no anchor holes AND (when an expected set is supplied) no required facet missing.
  const complete =
    facets_ran === facets_total &&
    facets_truncated === 0 &&
    slices_truncated === 0 &&
    holes_found === 0 &&
    missing_facets.length === 0;

  /** @type {CoverageSummary} */
  const summary = {
    facets_total,
    facets_ran,
    facets_truncated,
    slices_truncated,
    anchors_checked: anchors.length,
    holes_found,
    candidates_total: candidates.length,
    expected_facets: Array.isArray(expectedFacets) ? expectedFacets.length : null,
    missing_facets: missing_facets.length,
  };

  return {
    complete,
    facet_status,
    truncated_slices,
    anchor_holes,
    missing_facets,
    leader_set,
    candidate_gems,
    summary,
  };
}

/**
 * Build a serializable gap report from a coverage result.
 *
 * @param {CoverageResult} coverage - result of checkCoverage()
 * @param {{ query?: string, generatedAt?: string }} [meta]
 * @returns {Object} serializable gap report
 */
export function buildGapReport(coverage, meta = {}) {
  const { query = null, generatedAt = null } = meta;

  const facets_not_run = coverage.facet_status
    .filter((f) => f.ran === false)
    .map((f) => f.facet);
  const missing_facets = coverage.missing_facets || [];

  let recommendation;
  if (coverage.complete) {
    recommendation = "OK — all facets ran, no truncation, anchors covered";
  } else {
    const parts = [];
    const notRunCount = facets_not_run.length;
    const missingCount = missing_facets.length;
    const truncCount = coverage.summary.slices_truncated;
    const holeCount = coverage.summary.holes_found;
    if (notRunCount > 0) parts.push(`${notRunCount} facet${notRunCount !== 1 ? "s" : ""} not run`);
    if (missingCount > 0) parts.push(`${missingCount} required facet${missingCount !== 1 ? "s" : ""} missing`);
    if (truncCount > 0) parts.push(`${truncCount} truncated slice${truncCount !== 1 ? "s" : ""}`);
    if (holeCount > 0) parts.push(`${holeCount} anchor hole${holeCount !== 1 ? "s" : ""}`);
    recommendation = `INVESTIGATE: ${parts.join(", ")} (re-partition / add facet)`;
  }

  return {
    schema: "sca-v22-coverage-gap",
    query,
    generated_at: generatedAt,
    complete: coverage.complete,
    gaps: {
      facets_not_run,
      missing_facets,
      truncated_slices: coverage.truncated_slices,
      anchor_holes: coverage.anchor_holes,
    },
    leader_count: coverage.leader_set.length,
    gem_count: coverage.candidate_gems.length,
    recommendation,
  };
}
