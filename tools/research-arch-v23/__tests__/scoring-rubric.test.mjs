import {describe, it, expect} from 'vitest';
import {computeCVS, decisionTier, TIERS} from '../scoring-rubric.mjs';

describe('computeCVS', () => {
  it('weights 12 dims correctly when all values are 1.0', () => {
    const dims = {
      D1_popularity: {value: 1.0, weight: 0.05},
      D2_license_safety: {value: 1.0, weight: 0.08},
      D3_supply_chain_signed: {value: 1.0, weight: 0.03},
      D4_maintainer_reputation: {value: 1.0, weight: 0.06},
      D5_dependency_cleanliness: {value: 1.0, weight: 0.08},
      D6_last_commit_recency: {value: 1.0, weight: 0.08},
      D7_contributor_count: {value: 1.0, weight: 0.04},
      D8_downloads_30d: {value: 1.0, weight: 0.05},
      D9_openssf_scorecard: {value: 1.0, weight: 0.08},
      D10_cc_pathway_support: {value: 1.0, weight: 0.10},
      D11_mcp_readiness: {value: 1.0, weight: 0.10},
      D12_composite_arch_quality: {value: 1.0, weight: 0.25},
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
  it('returns INSTALL-STANDARD (silver path) on license_safe + 2 other fields + CVS >= 0.70 (W443 install-gate-relaxation)', () => {
    // W443: silver path — license_safe + malicious_update_review + transitive_deps_clean
    // (r1aCount=3 >= 2) + CVS=0.95 → INSTALL-STANDARD (not PATTERN-STUDY as in W442).
    // INSTALL-HIGH still requires all 4 (gold standard unchanged).
    expect(decisionTier(0.95, {signed_releases: false, license_safe: true, malicious_update_review: true, transitive_deps_clean: true})).toBe('INSTALL-STANDARD');
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

  // W443 install-gate-relaxation: silver-path tests.
  describe('silver path (W443 install-gate-relaxation)', () => {
    it('returns INSTALL-STANDARD for license_safe + malicious_update_review only (r1aCount=2) + CVS >= 0.70', () => {
      // Minimal silver: exactly 2 R1a fields (license_safe + 1 other).
      expect(decisionTier(0.75, {signed_releases: false, license_safe: true, malicious_update_review: true, transitive_deps_clean: false})).toBe('INSTALL-STANDARD');
    });
    it('returns INSTALL-STANDARD for license_safe + transitive_deps_clean (r1aCount=2) + CVS >= 0.70', () => {
      expect(decisionTier(0.72, {signed_releases: false, license_safe: true, malicious_update_review: false, transitive_deps_clean: true})).toBe('INSTALL-STANDARD');
    });
    it('returns INSTALL-STANDARD for license_safe + signed_releases (r1aCount=2) + CVS = 0.70 (exact boundary)', () => {
      expect(decisionTier(0.70, {signed_releases: true, license_safe: true, malicious_update_review: false, transitive_deps_clean: false})).toBe('INSTALL-STANDARD');
    });
    it('returns INSTALL-STANDARD for silver-3 path (license_safe + malicious_update_review + transitive_deps_clean) + CVS >= 0.70', () => {
      // 3 of 4 fields true — also silver (signed_releases missing).
      expect(decisionTier(0.80, {signed_releases: false, license_safe: true, malicious_update_review: true, transitive_deps_clean: true})).toBe('INSTALL-STANDARD');
    });
    it('returns PATTERN-STUDY (not INSTALL-STANDARD) for silver path + CVS < 0.70', () => {
      // Silver trust but CVS below install bar → falls through to PATTERN-STUDY.
      expect(decisionTier(0.65, {signed_releases: false, license_safe: true, malicious_update_review: true, transitive_deps_clean: false})).toBe('PATTERN-STUDY');
    });
    it('returns PATTERN-STUDY (not INSTALL) for license_safe-only (r1aCount=1) + CVS >= 0.70', () => {
      // Only license_safe true → r1aCount=1 < 2 → silver gate not met → PATTERN-STUDY.
      expect(decisionTier(0.80, {signed_releases: false, license_safe: true, malicious_update_review: false, transitive_deps_clean: false})).toBe('PATTERN-STUDY');
    });
    it('does NOT return INSTALL-HIGH on silver path (gold standard preserved)', () => {
      // Silver path CVS=0.90 → INSTALL-STANDARD (not INSTALL-HIGH), gold still requires all 4.
      expect(decisionTier(0.90, {signed_releases: false, license_safe: true, malicious_update_review: true, transitive_deps_clean: true})).toBe('INSTALL-STANDARD');
    });
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
  it('exports all 7 canonical tier strings (W443: MONITOR added)', () => {
    expect(Object.keys(TIERS).sort()).toEqual([
      'CITE_REFERENCE_ONLY',
      'HALT_REJECT',
      'INSTALL_HIGH',
      'INSTALL_STANDARD',
      'MONITOR',
      'PATTERN_STUDY',
      'REJECT',
    ]);
    expect(TIERS.INSTALL_HIGH).toBe('INSTALL-HIGH');
    expect(TIERS.INSTALL_STANDARD).toBe('INSTALL-STANDARD');
    expect(TIERS.PATTERN_STUDY).toBe('PATTERN-STUDY');
    expect(TIERS.CITE_REFERENCE_ONLY).toBe('CITE-REFERENCE-ONLY');
    expect(TIERS.MONITOR).toBe('MONITOR');
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
    // W443: silver path — license_safe + ≥1 other field → INSTALL-STANDARD (not PATTERN-STUDY)
    expect(decisionTier(0.95, {...trustPass, signed_releases: false})).toBe(TIERS.INSTALL_STANDARD);
    // license_safe=false → still HALT-REJECT
    expect(decisionTier(0.95, {...trustPass, license_safe: false})).toBe(TIERS.HALT_REJECT);
  });
});
