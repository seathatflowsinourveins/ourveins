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
// INSTALL tier trust requirements (W443 install-gate-relaxation):
//   INSTALL-HIGH:     all 4 R1(a) fields true + CVS >= 0.85   (gold standard)
//   INSTALL-STANDARD: all 4 R1(a) fields true + CVS >= 0.70   (gold standard)
//                  OR license_safe + ≥1 other R1(a) field true + CVS >= 0.70 (silver)
//   PATTERN-STUDY:    license_safe + any partial trust + CVS >= 0.55 (study only)
//   CITE-REFERENCE:   license_safe + any partial trust + CVS >= 0.40
//   HALT-REJECT:      license_safe=false (any CVS)
//
// Rationale: ecosystem reality — nearly no repo has all 4 fields simultaneously.
// INSTALL-HIGH gold standard preserved. INSTALL-STANDARD opened to silver path
// so MIT repos with solid trust signal can be installed. Fail-CLOSED preserved:
// license_safe is ALWAYS required for any INSTALL tier.
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
  MONITOR:             'MONITOR',
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
 * INSTALL tier split (W443 install-gate-relaxation — ecosystem reality fix):
 *   Gold path  (all 4 R1a true): INSTALL-HIGH ≥0.85, INSTALL-STANDARD ≥0.70.
 *   Silver path (license_safe + ≥1 other R1a field): INSTALL-STANDARD ≥0.70.
 *   Partial trust (license_safe only): PATTERN-STUDY ≥0.55, CITE-REFERENCE ≥0.40.
 *   No license_safe: HALT-REJECT (fail-CLOSED — unsafe license always blocks).
 *
 * Rationale: 0/32 repos reached INSTALL tiers under original all-4 requirement.
 * Ecosystem reality is that signed_releases + malicious_update_review are rare
 * simultaneously. Silver path preserves license_safe as the non-negotiable anchor
 * while allowing MIT repos with strong partial trust signal to install.
 * INSTALL-HIGH still requires all 4 (gold standard unchanged).
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

  // W443 install-gate-relaxation: split INSTALL tier into gold + silver paths.
  //
  // Gold path — all 4 R1(a) fields true:
  //   INSTALL-HIGH ≥0.85, INSTALL-STANDARD ≥0.70.
  //   W442 refinement: PATTERN-STUDY + CITE-REFERENCE do NOT require full trust
  //   because they don't install code — they study/cite patterns. Per operator:
  //   "not a hardgate because some time repos with low stars can be high quality
  //   in certain area with pattern study etc."
  const r1aAll = trustTuple.signed_releases
    && trustTuple.license_safe
    && trustTuple.malicious_update_review
    && trustTuple.transitive_deps_clean;
  if (r1aAll) {
    if (cvs >= 0.85) return TIERS.INSTALL_HIGH;
    if (cvs >= 0.70) return TIERS.INSTALL_STANDARD;
    if (cvs >= 0.55) return TIERS.PATTERN_STUDY;
    if (cvs >= 0.40) return TIERS.CITE_REFERENCE_ONLY;
    return TIERS.REJECT;
  }

  // Silver path — license_safe is the non-negotiable anchor; ≥1 other R1(a)
  // field must also be true. This enables INSTALL-STANDARD for MIT repos that
  // have e.g. transitive_deps_clean + malicious_update_review but no signed
  // releases (the most common real-world gap in the ecosystem).
  if (trustTuple.license_safe) {
    const r1aCount = [
      trustTuple.signed_releases,
      trustTuple.license_safe,
      trustTuple.malicious_update_review,
      trustTuple.transitive_deps_clean,
    ].filter(Boolean).length;
    // license_safe alone = r1aCount=1; ≥1 OTHER field means r1aCount ≥ 2.
    if (r1aCount >= 2) {
      // Silver: license_safe + at least 1 other trust field — INSTALL-STANDARD
      // available but NOT INSTALL-HIGH (gold standard still requires all 4).
      if (cvs >= 0.70) return TIERS.INSTALL_STANDARD;
    }
    // Partial trust (license_safe only, or silver but CVS below install bar):
    // PATTERN-STUDY + CITE-REFERENCE available; INSTALL tiers blocked.
    if (cvs >= 0.55) return TIERS.PATTERN_STUDY;
    if (cvs >= 0.40) return TIERS.CITE_REFERENCE_ONLY;
  }

  // license_safe=false or CVS below all thresholds → HALT-REJECT.
  return TIERS.HALT_REJECT;
}
