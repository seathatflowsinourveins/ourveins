import { describe, it, expect, vi } from 'vitest';
import { discoverRepos } from '../discovery-engine.mjs';

describe('discovery-engine', () => {
  it('deduplicates and filters existing', async () => {
    const channels = {
      ch1: vi.fn().mockResolvedValue([{ identifier: 'org/a', source: 'ch1' }, { identifier: 'org/b', source: 'ch1' }]),
      ch2: vi.fn().mockResolvedValue([{ identifier: 'org/a', source: 'ch2' }, { identifier: 'org/c', source: 'ch2' }]),
    };
    const { candidates, errors } = await discoverRepos({ channels, existingRepos: new Set(['org/b']) });
    expect(candidates).toHaveLength(2);
    expect(candidates.find((x) => x.identifier === 'org/a').sources).toHaveLength(2);
    expect(errors).toHaveLength(0);
  });

  it('merges metadata from duplicate records', async () => {
    const channels = {
      ch1: vi.fn().mockResolvedValue([{ identifier: 'org/repo', source: 'ch1', stars: 100 }]),
      ch2: vi.fn().mockResolvedValue([{ identifier: 'org/repo', source: 'ch2', description: 'A great repo' }]),
    };
    const { candidates } = await discoverRepos({ channels });
    expect(candidates).toHaveLength(1);
    expect(candidates[0].stars).toBe(100);
    expect(candidates[0].description).toBe('A great repo');
    expect(candidates[0].sources).toHaveLength(2);
  });

  it('keeps identifier casing from first occurrence', async () => {
    const channels = {
      ch1: vi.fn().mockResolvedValue([{ identifier: 'Org/Repo', source: 'ch1' }]),
      ch2: vi.fn().mockResolvedValue([{ identifier: 'org/repo', source: 'ch2' }]),
    };
    const { candidates } = await discoverRepos({ channels });
    expect(candidates[0].identifier).toBe('Org/Repo');
  });

  it('collects errors from failed channels', async () => {
    const channels = {
      good: vi.fn().mockResolvedValue([{ identifier: 'org/a', source: 'good' }]),
      bad: vi.fn().mockRejectedValue(new Error('network timeout')),
    };
    const { candidates, errors } = await discoverRepos({ channels });
    expect(candidates).toHaveLength(1);
    expect(errors).toHaveLength(1);
    expect(errors[0].error).toBe('network timeout');
  });
});
