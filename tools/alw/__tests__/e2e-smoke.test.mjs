// tools/alw/__tests__/e2e-smoke.test.mjs
// W444 Task 8: End-to-end smoke test for ALW research tick lifecycle.
import { describe, it, expect } from 'vitest';
import { researchTick } from '../layers/research-tick.mjs';

describe('ALW e2e smoke test', () => {
  it('completes a dry-run tick with mock discovery + scoring', async () => {
    const mockDiscovery = async () => ({
      candidates: [{ identifier: 'anthropics/claude-code', source: 'test' }],
      errors: [],
    });
    const mockScorer = async (targets) =>
      targets.map((t) => ({
        target: t,
        verdict: { cvs: 0.85, decision_tier: 'INSTALL-STANDARD' },
      }));

    const result = await researchTick({
      dryRun: true,
      discoveryFn: mockDiscovery,
      scorerFn: mockScorer,
      modelRouteFn: async () => ({ primaryAgent: { type: 'researcher', confidence: 0.9 } }),
      rufloStoreFn: async () => true,
    });

    expect(result.status).toBe('completed');
    expect(result.layers_executed).toBe(8);
    expect(result.candidates_found).toBe(1);
    expect(result.install_queue).toContain('anthropics/claude-code');
    expect(result.model_route.primaryAgent.type).toBe('researcher');
    expect(result.ruflo_stored).toBe(false); // dryRun skips ruflo store
  }, 30_000);

  it('handles zero-candidate discovery gracefully', async () => {
    const result = await researchTick({
      dryRun: true,
      discoveryFn: async () => ({ candidates: [], errors: [] }),
    });

    expect(result.status).toBe('completed');
    expect(result.candidates_found).toBe(0);
    expect(result.verdicts).toEqual([]);
    expect(result.install_queue).toEqual([]);
  }, 10_000);

  it('handles discovery errors without crashing', async () => {
    const result = await researchTick({
      dryRun: true,
      discoveryFn: async () => ({
        candidates: [{ identifier: 'test/repo', source: 'test' }],
        errors: [{ channel: 'github', error: 'rate-limited' }],
      }),
      scorerFn: async (targets) =>
        targets.map((t) => ({
          target: t,
          verdict: { cvs: 0.50, decision_tier: 'CITE-REFERENCE-ONLY' },
        })),
      modelRouteFn: async () => ({ primaryAgent: { type: 'researcher', confidence: 0.5 } }),
      rufloStoreFn: async () => false,
    });

    expect(result.status).toBe('completed');
    expect(result.discovery_errors).toHaveLength(1);
    expect(result.discovery_errors[0].channel).toBe('github');
    expect(result.install_queue).toEqual([]); // CITE-REF doesn't qualify
  }, 10_000);

  it('filters only INSTALL-tier repos into install_queue', async () => {
    const result = await researchTick({
      dryRun: true,
      discoveryFn: async () => ({
        candidates: [
          { identifier: 'good/repo', source: 'test' },
          { identifier: 'bad/repo', source: 'test' },
          { identifier: 'great/repo', source: 'test' },
        ],
        errors: [],
      }),
      scorerFn: async (targets) =>
        targets.map((t) => ({
          target: t,
          verdict: {
            cvs: t.identifier.startsWith('good') ? 0.75 : t.identifier.startsWith('great') ? 0.90 : 0.30,
            decision_tier: t.identifier.startsWith('good')
              ? 'INSTALL-STANDARD'
              : t.identifier.startsWith('great')
                ? 'INSTALL-HIGH'
                : 'HALT-REJECT',
          },
        })),
      modelRouteFn: async () => ({ primaryAgent: { type: 'researcher', confidence: 0.8 } }),
      rufloStoreFn: async () => true,
    });

    expect(result.install_queue).toHaveLength(2);
    expect(result.install_queue).toContain('good/repo');
    expect(result.install_queue).toContain('great/repo');
    expect(result.install_queue).not.toContain('bad/repo');
  }, 10_000);
});
