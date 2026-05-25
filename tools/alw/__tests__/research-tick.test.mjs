import { describe, it, expect, vi } from 'vitest';
import { researchTick } from '../layers/research-tick.mjs';

describe('research-tick', () => {
  it('runs L1-L8 and returns structured result', async () => {
    const result = await researchTick({
      discoveryFn: vi.fn().mockResolvedValue([{ identifier: 'new/repo', sources: ['gh'] }]),
      scorerFn: vi.fn().mockResolvedValue([{ target: { identifier: 'new/repo' }, verdict: { decision_tier: 'PATTERN-STUDY' }, error: null }]),
      dryRun: true,
    });
    expect(result.status).toBe('completed');
    expect(result.candidates_found).toBe(1);
    expect(result.verdicts).toHaveLength(1);
    expect(result.install_queue).toHaveLength(0);
  });

  it('returns empty when no candidates', async () => {
    const result = await researchTick({
      discoveryFn: vi.fn().mockResolvedValue([]),
      dryRun: true,
    });
    expect(result.candidates_found).toBe(0);
    expect(result.verdicts).toHaveLength(0);
  });

  it('queues INSTALL-tier repos', async () => {
    const result = await researchTick({
      discoveryFn: vi.fn().mockResolvedValue([{ identifier: 'good/repo', sources: ['gh'] }]),
      scorerFn: vi.fn().mockResolvedValue([{ target: { identifier: 'good/repo' }, verdict: { decision_tier: 'INSTALL-HIGH' }, error: null }]),
      dryRun: true,
    });
    expect(result.install_queue).toEqual(['good/repo']);
  });
});
