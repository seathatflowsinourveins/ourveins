// tools/research-arch-v23/scoring-rubric.mjs
// Pure functions for sca-v23 multi-angle convergence scoring.
// No I/O. No imports. Composable + testable.
// Cite-anchor: .claude/schemas/sca-v23-multi-angle-convergence.schema.json §2.2-2.3.
//
// ============================================================================
// INPUT SHAPES (JSDoc — Note 4)
// ============================================================================
//
// computeCVS(dims):
//   dims: { [dimKey: string]: { value: number, weight: number } } | null | undefined
//     - Empty/null/undefined → returns 0.
//     - Canonical shape carries 12 dim entries (D1..D12) summing weights to 1.0.
//     - Each entry's `value` ∈ [0,1] and `weight` ∈ [0,1].
//
// decisionTier(cvs, trustTuple):
//   cvs:        number — composite-value-score in [0,1] from computeCVS.
//   trustTuple: {
//     signed_releases:         boolean,  // SLSA-L3 / npm-provenance / Sigstore
//     license_safe:            boolean,  // MIT/Apache/BSD/ISC/MPL whitelist
//     malicious_update_review: boolean,  // ≥1 commit ≥30d old OR operator-pin
//     transitive_deps_clean:   boolean,  // npm-ls clean + no Socket/Snyk flag
//   } — null/undefined throws Error (callers MUST supply explicit trust state).
//
// All four trustTuple booleans MUST be true (R1(a) trust-tuple) for cvs to
// determine tier; any false short-circuits to HALT-REJECT per cardinal-rule-1
// extension (W331 axis-1 #3).
// ============================================================================

/**
 * Frozen tier-string constants for sca-v23 decision outcomes.
 *
 * Use TIERS.* in callers instead of bare string literals to enable
 * static-analysis cross-reference + IDE refactor + protect against typos.
 *
 * @readonly
 */
export const TIERS = Object.freeze({
  INSTALL_HIGH:        'INSTALL-HIGH',
  INSTALL_STANDARD:    'INSTALL-STANDARD',
  PATTERN_STUDY:       'PATTERN-STUDY',
  CITE_REFERENCE_ONLY: 'CITE-REFERENCE-ONLY',
  REJECT:              'REJECT',
  HALT_REJECT:         'HALT-REJECT',
});

/**
 * Compute composite-value-score (CVS) as weighted sum of dim values.
 *
 * @param {Object<string,{value:number,weight:number}>|null|undefined} dims
 *        Map of dim-id → {value, weight}. Null/undefined/empty → returns 0.
 * @returns {number} CVS in [0,1] when weights sum to 1 and values ∈ [0,1].
 */
export function computeCVS(dims) {
  // Note 1: defensive guard against null/undefined input.
  if (dims === null || dims === undefined) return 0;
  const entries = Object.values(dims);
  // W443 codex r1 finding #5 (P2): clamp non-finite dim values/weights before
  // the loop so NaN/Infinity in a single dim cannot poison the entire CVS.
  for (const dim of entries) {
    if (!Number.isFinite(dim.value)) dim.value = 0;
    if (!Number.isFinite(dim.weight)) dim.weight = 0;
  }
  const totalWeight = entries.reduce((s, d) => s + d.weight, 0);
  if (totalWeight === 0) return 0;
  const rawSum = entries.reduce((sum, d) => sum + (d.value * d.weight), 0);
  // W442: normalize by actual weight sum. When N/A dims have weight=0
  // (e.g. D10/D11 for github-repo targets), remaining weights < 1.0.
  // Without normalization, CVS is capped at ~0.80 for non-CC targets.
  const cvs = rawSum / totalWeight;
  // W443 codex r1 finding #5: clamp final CVS to [0,1] as belt-and-suspenders.
  return Math.max(0, Math.min(1, cvs));
}

/**
 * Map CVS + trust-tuple to an sca-v23 decision tier.
 *
 * Trust-tuple R1(a) takes precedence: any false → HALT-REJECT regardless
 * of CVS. Otherwise tier is selected from CVS thresholds (>=0.85 / >=0.70 /
 * >=0.55 / >=0.40 / else REJECT).
 *
 * Fail-CLOSED contract (soul.md §6, codex r1 REVISE closure 2026-05-25):
 * - cvs MUST be a finite number in [0,1].
 * - Non-number cvs (string/null/undefined/object/boolean) → throws TypeError.
 * - Non-finite cvs (Infinity, -Infinity, NaN) → REJECT (NOT INSTALL-HIGH).
 * - Out-of-range cvs (<0 or >1) → REJECT (NOT INSTALL-HIGH).
 *
 * @param {number} cvs — composite-value-score in [0,1].
 * @param {{signed_releases:boolean, license_safe:boolean,
 *          malicious_update_review:boolean, transitive_deps_clean:boolean}}
 *        trustTuple — R1(a) trust booleans. Null/undefined throws.
 * @returns {string} One of TIERS.* values.
 * @throws {TypeError} If cvs is not a number.
 * @throws {Error} If trustTuple is null/undefined.
 */
export function decisionTier(cvs, trustTuple) {
  // Fail-CLOSED guard: invalid cvs MUST NOT advance to high-trust tiers
  // (codex r1 REVISE 2026-05-25). Per soul.md §6 fail-CLOSED contract:
  // unrecognized / malformed inputs route to REJECT or throw, never to
  // INSTALL-HIGH. Closes the Infinity/NaN fail-open regression noted on
  // commit b620c12.
  if (typeof cvs !== 'number') {
    throw new TypeError(
      `decisionTier: cvs must be a number, got ${typeof cvs}`
    );
  }
  if (!Number.isFinite(cvs)) {
    // Catches Infinity, -Infinity, NaN.
    return TIERS.REJECT;
  }
  if (cvs < 0 || cvs > 1) {
    return TIERS.REJECT;
  }

  // Note 1: defensive guard — trustTuple is REQUIRED. Silent default to
  // INSTALL-* on missing trust state would be a security regression.
  if (trustTuple === null || trustTuple === undefined) {
    throw new Error(
      'decisionTier: trustTuple is required (R1(a) trust-tuple). ' +
      'Pass {signed_releases, license_safe, malicious_update_review, transitive_deps_clean} ' +
      'with explicit boolean values.'
    );
  }

  // R1(a) full-trust gate: ALL four must pass for INSTALL tiers.
  // W442 refinement: PATTERN-STUDY + CITE-REFERENCE do NOT require full trust
  // because they don't install code — they study/cite patterns. Per operator:
  // "not a hardgate because some time repos with low stars can be high quality
  // in certain area with pattern study etc."
  // INSTALL tiers STILL require all 4 trust fields (fail-CLOSED for installs).
  const r1aPass = trustTuple.signed_releases
    && trustTuple.license_safe
    && trustTuple.malicious_update_review
    && trustTuple.transitive_deps_clean;
  if (r1aPass) {
    // Full trust → tier by CVS (including INSTALL tiers)
    if (cvs >= 0.85) return TIERS.INSTALL_HIGH;
    if (cvs >= 0.70) return TIERS.INSTALL_STANDARD;
    if (cvs >= 0.55) return TIERS.PATTERN_STUDY;
    if (cvs >= 0.40) return TIERS.CITE_REFERENCE_ONLY;
    return TIERS.REJECT;
  }
  // Partial trust: license must be safe for any non-HALT tier.
  // INSTALL blocked; PATTERN-STUDY + CITE-REFERENCE available by CVS.
  if (trustTuple.license_safe) {
    if (cvs >= 0.55) return TIERS.PATTERN_STUDY;
    if (cvs >= 0.40) return TIERS.CITE_REFERENCE_ONLY;
  }
  return TIERS.HALT_REJECT;
}
