import { describe, it, expect, vi } from 'vitest';
import { scoreBatch } from '../batch-scorer.mjs';

describe('batch-scorer', () => {
  it('scores multiple repos', async () => {
    const mock = vi.fn().mockResolvedValue({ composite_verdict_score: 0.75, decision_tier: 'INSTALL-STANDARD' });
    const r = await scoreBatch([{ kind: 'github-repo', identifier: 'a/b' }, { kind: 'github-repo', identifier: 'c/d' }], { convergeAuditFn: mock });
    expect(r).toHaveLength(2);
    expect(mock).toHaveBeenCalledTimes(2);
    r.forEach((x) => { expect(x.verdict).not.toBeNull(); expect(x.error).toBeNull(); });
  });

  it('captures errors per-repo', async () => {
    const mock = vi.fn().mockResolvedValueOnce({ composite_verdict_score: 0.8 }).mockRejectedValueOnce(new Error('timeout'));
    const r = await scoreBatch([{ kind: 'github-repo', identifier: 'ok/repo' }, { kind: 'github-repo', identifier: 'bad/repo' }], { convergeAuditFn: mock });
    expect(r[0].error).toBeNull();
    expect(r[1].error).toBe('timeout');
  });
});
