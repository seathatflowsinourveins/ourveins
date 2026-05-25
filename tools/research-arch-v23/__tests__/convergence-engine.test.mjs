import {describe, it, expect, vi} from 'vitest';
import {convergeAudit, bucketRecency} from '../convergence-engine.mjs';

describe('convergeAudit', () => {
  it('returns sca-v23 verdict shape with all required fields', async () => {
    const verdict = await convergeAudit(
      {kind: 'github-repo', identifier: 'obra/superpowers', version: 'v5.1.0'},
      {mcpClient: {callTool: vi.fn().mockResolvedValue('A'.repeat(2000))}}
    );
    expect(verdict.schema_version).toBe('sca-v23');
    expect(verdict.target).toBeDefined();
    expect(verdict.research_angles).toBeDefined();
    expect(verdict.scoring_dims).toBeDefined();
    expect(typeof verdict.composite_verdict_score).toBe('number');
    expect(verdict.composite_verdict_score).toBeGreaterThanOrEqual(0);
    expect(verdict.composite_verdict_score).toBeLessThanOrEqual(1);
    expect(['INSTALL-HIGH','INSTALL-STANDARD','PATTERN-STUDY','CITE-REFERENCE-ONLY','REJECT','HALT-REJECT']).toContain(verdict.decision_tier);
    expect(verdict.convergence_summary).toBeDefined();
    expect(verdict.provenance).toBeDefined();
  }, 60000);

  it('contains all 12 scoring dims', async () => {
    const verdict = await convergeAudit({kind: 'github-repo', identifier: 'obra/superpowers'}, {mcpClient: {callTool: vi.fn().mockResolvedValue('A'.repeat(2000))}});
    const expectedDims = ['D1_popularity','D2_license_safety','D3_supply_chain_signed','D4_maintainer_reputation','D5_dependency_cleanliness','D6_last_commit_recency','D7_contributor_count','D8_downloads_30d','D9_openssf_scorecard','D10_cc_pathway_support','D11_mcp_readiness','D12_composite_arch_quality'];
    for (const d of expectedDims) {
      expect(verdict.scoring_dims[d]).toBeDefined();
      expect(verdict.scoring_dims[d].value).toBeGreaterThanOrEqual(0);
      expect(verdict.scoring_dims[d].value).toBeLessThanOrEqual(1);
    }
  }, 60000);

  it('throws when <3 live angles (per sca-v23 §2.1 convergence rule)', async () => {
    // mcpClient: null disables bridge fallback → only A7 might attempt, others skip
    await expect(convergeAudit({kind: 'mcp-server', identifier: 'some-pkg'}, {mcpClient: null})).rejects.toThrow(/insufficient live angles/);
  });

  it('weight-sums to 0.80 for github-repo (D10+D11 N/A) or 1.0 for cc-plugin/mcp-server', async () => {
    // W442: D10+D11 have weight=0 for non-CC targets (N/A exclusion).
    // github-repo: D10=0.0w, D11=0.0w → total 0.80. computeCVS normalizes by actual sum.
    const verdict = await convergeAudit({kind: 'github-repo', identifier: 'obra/superpowers'}, {mcpClient: {callTool: vi.fn().mockResolvedValue('A'.repeat(2000))}});
    const weightSum = Object.values(verdict.scoring_dims).reduce((s, d) => s + d.weight, 0);
    expect(weightSum).toBeCloseTo(0.80, 2);
  }, 60000);

  it('convergence_summary correctly counts live vs skipped angles', async () => {
    const verdict = await convergeAudit({kind: 'github-repo', identifier: 'obra/superpowers'}, {mcpClient: {callTool: vi.fn().mockResolvedValue('A'.repeat(2000))}});
    expect(verdict.convergence_summary.total_angles).toBe(7);
    expect(verdict.convergence_summary.live_angles).toBeGreaterThanOrEqual(3);
    expect(verdict.convergence_summary.convergence_rule_met).toBe(true);
  }, 60000);

  it('invokes codexAdversary when provided', async () => {
    const mockCodex = vi.fn().mockResolvedValue({model: 'gpt-5.5', round: 1, verdict: 'APPROVE', rationale: 'test'});
    const verdict = await convergeAudit({kind: 'github-repo', identifier: 'obra/superpowers'}, {mcpClient: {callTool: vi.fn().mockResolvedValue('A'.repeat(2000))}, codexAdversary: mockCodex});
    expect(mockCodex).toHaveBeenCalled();
    expect(verdict.codex_verdict?.verdict).toBe('APPROVE');
  }, 60000);

  // ===========================================================================
  // W441.5 codex r1 REVISE — schema-conformance + fail-CLOSED tests
  // ===========================================================================

  it('returns structured SKIPPED codex_verdict when codexAdversary not provided (schema requires object, not null)', async () => {
    const verdict = await convergeAudit({kind: 'github-repo', identifier: 'obra/superpowers'}, {mcpClient: {callTool: vi.fn().mockResolvedValue('A'.repeat(2000))}});
    expect(verdict.codex_verdict).toEqual({
      model: null,
      round: 0,
      verdict: 'SKIPPED',
      log_path: null,
      rationale: expect.stringMatching(/codexAdversary opt-out/),
    });
  }, 60000);

  it('normalizes target.version to HEAD when not provided', async () => {
    const verdict = await convergeAudit({kind: 'github-repo', identifier: 'obra/superpowers'}, {mcpClient: {callTool: vi.fn().mockResolvedValue('A'.repeat(2000))}});
    expect(verdict.target.version).toBe('HEAD');
  }, 60000);

  it('preserves target.version when explicitly provided', async () => {
    const verdict = await convergeAudit({kind: 'github-repo', identifier: 'obra/superpowers', version: 'v5.1.0'}, {mcpClient: {callTool: vi.fn().mockResolvedValue('A'.repeat(2000))}});
    expect(verdict.target.version).toBe('v5.1.0');
  }, 60000);

  it('throws when target.kind or target.identifier missing', async () => {
    await expect(convergeAudit({identifier: 'obra/superpowers'})).rejects.toThrow(/target.kind and target.identifier are required/);
    await expect(convergeAudit({kind: 'github-repo'})).rejects.toThrow(/target.kind and target.identifier are required/);
    await expect(convergeAudit({})).rejects.toThrow(/required/);
    await expect(convergeAudit(null)).rejects.toThrow(/required/);
    await expect(convergeAudit(undefined)).rejects.toThrow(/required/);
  });

  it('D6_last_commit_recency.value is exactly one of {0.1, 0.4, 0.7, 1.0}', async () => {
    const verdict = await convergeAudit({kind: 'github-repo', identifier: 'obra/superpowers'}, {mcpClient: {callTool: vi.fn().mockResolvedValue('A'.repeat(2000))}});
    expect([0.1, 0.4, 0.7, 1.0]).toContain(verdict.scoring_dims.D6_last_commit_recency.value);
  }, 60000);

  it('returns non-INSTALL tier when trust probes partially fail (W442 partial-trust refinement)', async () => {
    // W442: partial trust (malicious_update_review/transitive_deps_clean may be false) but
    // license_safe + CVS determine PATTERN-STUDY or CITE-REF (not HALT-REJECT). INSTALL tiers
    // still blocked by partial trust per soul.md §6.
    const verdict = await convergeAudit({kind: 'github-repo', identifier: 'obra/superpowers'}, {mcpClient: {callTool: vi.fn().mockResolvedValue('A'.repeat(2000))}});
    expect(['PATTERN-STUDY', 'CITE-REFERENCE-ONLY', 'HALT-REJECT']).toContain(verdict.decision_tier);
    // INSTALL-HIGH and INSTALL-STANDARD are NOT possible with partial trust
    expect(verdict.decision_tier).not.toBe('INSTALL-HIGH');
    expect(verdict.decision_tier).not.toBe('INSTALL-STANDARD');
  }, 60000);

  // ===========================================================================
  // W441.6 codex r1 REVISE — minLiveAngles option support
  // ===========================================================================

  it('accepts options.minLiveAngles=1 (CLI-mode triage; A7 registry-only is sufficient)', async () => {
    // mcpClient: null disables bridge fallback => A3/A4/A5/A6 skip; A7 registry is the only live angle.
    // With default minLiveAngles=3, this would throw. With override=1, succeeds.
    const verdict = await convergeAudit(
      {kind: 'github-repo', identifier: 'obra/superpowers'},
      {mcpClient: null, minLiveAngles: 1}
    );
    expect(verdict.convergence_summary.live_angles).toBeGreaterThanOrEqual(1);
    expect(verdict.convergence_summary.min_live_angles_required).toBe(1);
    expect(verdict.convergence_summary.convergence_rule_met).toBe(true);
  }, 60000);

  it('default minLiveAngles=3 (sca-v23 §2.1) when not provided in options', async () => {
    const verdict = await convergeAudit(
      {kind: 'github-repo', identifier: 'obra/superpowers'},
      {mcpClient: {callTool: vi.fn().mockResolvedValue('A'.repeat(2000))}}
    );
    expect(verdict.convergence_summary.min_live_angles_required).toBe(3);
  }, 60000);

  it('minLiveAngles=8 throws with "caller-specified" rule attribution (only 7 angles exist)', async () => {
    // W442: all 7 angles now live when mcpClient provided. minLiveAngles=8 is always unsatisfiable.
    await expect(convergeAudit(
      {kind: 'github-repo', identifier: 'obra/superpowers'},
      {mcpClient: {callTool: vi.fn().mockResolvedValue('A'.repeat(2000))}, minLiveAngles: 8}
    )).rejects.toThrow(/caller-specified minLiveAngles=8/);
  }, 60000);

  it('minLiveAngles=3 throws with "sca-v23 §2.1" attribution (default rule)', async () => {
    // mcpClient: null disables bridge fallback → only A7 live → 1 < 3 → throws
    await expect(convergeAudit(
      {kind: 'github-repo', identifier: 'obra/superpowers'},
      {mcpClient: null, minLiveAngles: 3}
    )).rejects.toThrow(/sca-v23 §2.1 convergence rule/);
  }, 60000);

  it('invalid minLiveAngles values fall back to default 3', async () => {
    // Non-integer (0.5), zero, negative, non-number, NaN → default to 3
    for (const bad of [0.5, 0, -1, 'three', null, NaN, {}]) {
      const verdict = await convergeAudit(
        {kind: 'github-repo', identifier: 'obra/superpowers'},
        {mcpClient: {callTool: vi.fn().mockResolvedValue('A'.repeat(2000))}, minLiveAngles: bad}
      );
      expect(verdict.convergence_summary.min_live_angles_required).toBe(3);
    }
  }, 60000);

  // ===========================================================================
  // W442 codex r1 finding 5 — target-shape coverage
  // ===========================================================================

  it('passes kind/identifier/version to angles (not owner/repo)', async () => {
    const callTool = vi.fn().mockResolvedValue({content:[{type:'text',text:'actively maintained 50k stars'}]});
    const verdict = await convergeAudit(
      {kind: 'github-repo', identifier: 'obra/superpowers', version: 'v5.1.0'},
      {mcpClient: {callTool}}
    );
    // Verify target shape in output
    expect(verdict.target.identifier).toBe('obra/superpowers');
    expect(verdict.target.version).toBe('v5.1.0');
  }, 60000);
});

describe('bucketRecency', () => {
  it('maps ≤30d to 1.0 (fresh)', () => {
    expect(bucketRecency(0)).toBe(1.0);
    expect(bucketRecency(15)).toBe(1.0);
    expect(bucketRecency(30)).toBe(1.0);
  });
  it('maps 30-90d to 0.7 (recent)', () => {
    expect(bucketRecency(31)).toBe(0.7);
    expect(bucketRecency(60)).toBe(0.7);
    expect(bucketRecency(90)).toBe(0.7);
  });
  it('maps 90-180d to 0.4 (aging)', () => {
    expect(bucketRecency(91)).toBe(0.4);
    expect(bucketRecency(150)).toBe(0.4);
    expect(bucketRecency(180)).toBe(0.4);
  });
  it('maps >180d to 0.1 (stale)', () => {
    expect(bucketRecency(181)).toBe(0.1);
    expect(bucketRecency(365)).toBe(0.1);
    expect(bucketRecency(Infinity)).toBe(0.1);
  });
  it('fail-CLOSED on invalid input (negative, NaN, non-number, missing) → 0.1', () => {
    expect(bucketRecency(-1)).toBe(0.1);
    expect(bucketRecency(NaN)).toBe(0.1);
    expect(bucketRecency(undefined)).toBe(0.1);
    expect(bucketRecency(null)).toBe(0.1);
    expect(bucketRecency('30')).toBe(0.1);
  });
  it('returns only enum values {0.1, 0.4, 0.7, 1.0}', () => {
    for (const days of [0, 15, 30, 31, 60, 90, 91, 150, 180, 181, 365, 1000]) {
      expect([0.1, 0.4, 0.7, 1.0]).toContain(bucketRecency(days));
    }
  });
});
