import {describe, it, expect} from 'vitest';
import {computeCVS, decisionTier, TIERS} from '../scoring-rubric.mjs';

describe('computeCVS', () => {
  it('weights 12 dims correctly when all values are 1.0', () => {
    const dims = {
      D1_popularity: {value: 1.0, weight: 0.05},
      D2_license_safety: {value: 1.0, weight: 0.08},
      D3_supply_chain_signed: {value: 1.0, weight: 0.10},
      D4_maintainer_reputation: {value: 1.0, weight: 0.06},
      D5_dependency_cleanliness: {value: 1.0, weight: 0.08},
      D6_last_commit_recency: {value: 1.0, weight: 0.06},
      D7_contributor_count: {value: 1.0, weight: 0.04},
      D8_downloads_30d: {value: 1.0, weight: 0.05},
      D9_openssf_scorecard: {value: 1.0, weight: 0.08},
      D10_cc_pathway_support: {value: 1.0, weight: 0.10},
      D11_mcp_readiness: {value: 1.0, weight: 0.10},
      D12_composite_arch_quality: {value: 1.0, weight: 0.20},
    };
    expect(computeCVS(dims)).toBeCloseTo(1.0, 2);
  });

  it('returns 0 for empty dims', () => {
    expect(computeCVS({})).toBe(0);
  });

  // Note 1: defensive guards for null/undefined input.
  it('returns 0 for null dims', () => {
    expect(computeCVS(null)).toBe(0);
  });

  it('returns 0 for undefined dims', () => {
    expect(computeCVS(undefined)).toBe(0);
  });
});

describe('decisionTier', () => {
  const trustPass = {signed_releases: true, license_safe: true, malicious_update_review: true, transitive_deps_clean: true};

  it('returns INSTALL-HIGH for CVS >= 0.85', () => {
    expect(decisionTier(0.90, trustPass)).toBe('INSTALL-HIGH');
  });
  it('returns INSTALL-STANDARD for 0.70 <= CVS < 0.85', () => {
    expect(decisionTier(0.75, trustPass)).toBe('INSTALL-STANDARD');
  });
  it('returns PATTERN-STUDY for 0.55 <= CVS < 0.70', () => {
    expect(decisionTier(0.60, trustPass)).toBe('PATTERN-STUDY');
  });
  it('returns CITE-REFERENCE-ONLY for 0.40 <= CVS < 0.55', () => {
    expect(decisionTier(0.45, trustPass)).toBe('CITE-REFERENCE-ONLY');
  });
  it('returns REJECT for CVS < 0.40', () => {
    expect(decisionTier(0.30, trustPass)).toBe('REJECT');
  });
  it('returns PATTERN-STUDY (not INSTALL) on partial trust with license_safe + high CVS (W442 refinement)', () => {
    // W442: partial trust with license_safe → PATTERN-STUDY (not HALT-REJECT) because
    // PATTERN-STUDY = study patterns, not install code. INSTALL tiers still blocked.
    expect(decisionTier(0.95, {signed_releases: false, license_safe: true, malicious_update_review: true, transitive_deps_clean: true})).toBe('PATTERN-STUDY');
  });
  it('returns HALT-REJECT when license_safe is false regardless of CVS', () => {
    // License unsafe = HALT-REJECT always (even for PATTERN-STUDY)
    expect(decisionTier(0.95, {signed_releases: true, license_safe: false, malicious_update_review: true, transitive_deps_clean: true})).toBe('HALT-REJECT');
  });
  it('returns CITE-REFERENCE-ONLY on partial trust with license_safe + CVS 0.45', () => {
    expect(decisionTier(0.45, {signed_releases: false, license_safe: true, malicious_update_review: false, transitive_deps_clean: false})).toBe('CITE-REFERENCE-ONLY');
  });
  it('returns HALT-REJECT on partial trust with license_safe but CVS < 0.40', () => {
    expect(decisionTier(0.30, {signed_releases: false, license_safe: true, malicious_update_review: false, transitive_deps_clean: false})).toBe('HALT-REJECT');
  });

  // Note 2: exact-boundary tests (off-by-one risk on tier thresholds).
  describe('exact-boundary thresholds', () => {
    it('returns INSTALL-HIGH at exact 0.85', () => {
      expect(decisionTier(0.85, trustPass)).toBe('INSTALL-HIGH');
    });
    it('returns INSTALL-STANDARD at exact 0.70', () => {
      expect(decisionTier(0.70, trustPass)).toBe('INSTALL-STANDARD');
    });
    it('returns PATTERN-STUDY at exact 0.55', () => {
      expect(decisionTier(0.55, trustPass)).toBe('PATTERN-STUDY');
    });
    it('returns CITE-REFERENCE-ONLY at exact 0.40', () => {
      expect(decisionTier(0.40, trustPass)).toBe('CITE-REFERENCE-ONLY');
    });
  });

  // Note 1: defensive guard — missing trust state must throw, not silently install.
  describe('trustTuple input validation', () => {
    it('throws on null trustTuple', () => {
      expect(() => decisionTier(0.95, null)).toThrow(/trustTuple is required/);
    });
    it('throws on undefined trustTuple', () => {
      expect(() => decisionTier(0.95, undefined)).toThrow(/trustTuple is required/);
    });
  });
});

describe('decisionTier fail-CLOSED guard (codex r1 REVISE closure)', () => {
  const trustPass = {signed_releases: true, license_safe: true, malicious_update_review: true, transitive_deps_clean: true};

  it('returns REJECT for Infinity (no fail-open to INSTALL-HIGH)', () => {
    expect(decisionTier(Infinity, trustPass)).toBe(TIERS.REJECT);
  });
  it('returns REJECT for -Infinity', () => {
    expect(decisionTier(-Infinity, trustPass)).toBe(TIERS.REJECT);
  });
  it('returns REJECT for NaN', () => {
    expect(decisionTier(NaN, trustPass)).toBe(TIERS.REJECT);
  });
  it('returns REJECT for cvs > 1', () => {
    expect(decisionTier(1.5, trustPass)).toBe(TIERS.REJECT);
  });
  it('returns REJECT for cvs < 0', () => {
    expect(decisionTier(-0.1, trustPass)).toBe(TIERS.REJECT);
  });
  it('throws TypeError for string cvs', () => {
    expect(() => decisionTier('0.9', trustPass)).toThrow(TypeError);
  });
  it('throws TypeError for null cvs', () => {
    expect(() => decisionTier(null, trustPass)).toThrow(TypeError);
  });
  it('throws TypeError for undefined cvs', () => {
    expect(() => decisionTier(undefined, trustPass)).toThrow(TypeError);
  });
  it('throws TypeError for object cvs', () => {
    expect(() => decisionTier({value: 0.9}, trustPass)).toThrow(TypeError);
  });
});

// Note 3: TIERS frozen-object exported with all 6 canonical tier strings.
describe('TIERS constant', () => {
  it('exports all 6 canonical tier strings', () => {
    expect(Object.keys(TIERS).sort()).toEqual([
      'CITE_REFERENCE_ONLY',
      'HALT_REJECT',
      'INSTALL_HIGH',
      'INSTALL_STANDARD',
      'PATTERN_STUDY',
      'REJECT',
    ]);
    expect(TIERS.INSTALL_HIGH).toBe('INSTALL-HIGH');
    expect(TIERS.INSTALL_STANDARD).toBe('INSTALL-STANDARD');
    expect(TIERS.PATTERN_STUDY).toBe('PATTERN-STUDY');
    expect(TIERS.CITE_REFERENCE_ONLY).toBe('CITE-REFERENCE-ONLY');
    expect(TIERS.REJECT).toBe('REJECT');
    expect(TIERS.HALT_REJECT).toBe('HALT-REJECT');
  });

  it('is frozen (immutable)', () => {
    expect(Object.isFrozen(TIERS)).toBe(true);
  });

  it('decisionTier returns values that match TIERS.* exactly', () => {
    const trustPass = {signed_releases: true, license_safe: true, malicious_update_review: true, transitive_deps_clean: true};
    expect(decisionTier(0.90, trustPass)).toBe(TIERS.INSTALL_HIGH);
    expect(decisionTier(0.75, trustPass)).toBe(TIERS.INSTALL_STANDARD);
    expect(decisionTier(0.60, trustPass)).toBe(TIERS.PATTERN_STUDY);
    expect(decisionTier(0.45, trustPass)).toBe(TIERS.CITE_REFERENCE_ONLY);
    expect(decisionTier(0.30, trustPass)).toBe(TIERS.REJECT);
    // W442: partial trust + license_safe → PATTERN-STUDY (not HALT-REJECT)
    expect(decisionTier(0.95, {...trustPass, signed_releases: false})).toBe(TIERS.PATTERN_STUDY);
    // license_safe=false → still HALT-REJECT
    expect(decisionTier(0.95, {...trustPass, license_safe: false})).toBe(TIERS.HALT_REJECT);
  });
});
