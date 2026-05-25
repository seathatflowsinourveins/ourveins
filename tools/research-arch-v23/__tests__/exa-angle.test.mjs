import { describe, it, expect, vi } from 'vitest';

describe('exa-angle (A2)', () => {
  it('exports runAngle', async () => {
    expect(typeof (await import('../angles/exa-angle.mjs')).runAngle).toBe('function');
  });

  it('calls mcpClient.callTool with server=exa', async () => {
    const callTool = vi.fn().mockResolvedValue({
      content: [{ type: 'text', text: JSON.stringify({ results: [
        { title: 'Repo', snippet: 'Popular package, 22k stars, actively maintained' },
      ]}) }],
    });
    const { runAngle } = await import('../angles/exa-angle.mjs');
    const result = await runAngle({ owner: 'chalk', repo: 'chalk', version: 'HEAD' }, { mcpClient: { callTool } });
    expect(callTool).toHaveBeenCalledWith(expect.objectContaining({ server: 'exa', name: 'web_search_exa' }));
    expect(result.angleId).toBe('A2');
    expect(result.skipped).toBe(false);
  });

  it('skipped:true when mcpClient missing', async () => {
    const { runAngle } = await import('../angles/exa-angle.mjs');
    expect((await runAngle({ owner: 'x', repo: 'y', version: 'HEAD' }, {})).skipped).toBe(true);
  });

  it('skipped:true when callTool throws', async () => {
    const callTool = vi.fn().mockRejectedValue(new Error('API_KEY missing'));
    const { runAngle } = await import('../angles/exa-angle.mjs');
    expect((await runAngle({ owner: 'x', repo: 'y', version: 'HEAD' }, { mcpClient: { callTool } })).skipped).toBe(true);
  });

  it('accepts target with identifier (convergeAudit shape)', async () => {
    const callTool = vi.fn().mockResolvedValue({
      content: [{ type: 'text', text: JSON.stringify({ results: [
        { title: 'Repo', snippet: 'Popular package, 22k stars, actively maintained' },
      ]}) }],
    });
    const { runAngle } = await import('../angles/exa-angle.mjs');
    const result = await runAngle({ kind: 'github-repo', identifier: 'chalk/chalk', version: 'HEAD' }, { mcpClient: { callTool } });
    expect(result.skipped).toBe(false);
    expect(result.score).toBeGreaterThan(0);
  });

  it('fail-CLOSED: skipped:true on empty results array', async () => {
    const callTool = vi.fn().mockResolvedValue({
      content: [{ type: 'text', text: JSON.stringify({ results: [] }) }],
    });
    const { runAngle } = await import('../angles/exa-angle.mjs');
    const result = await runAngle({ owner: 'x', repo: 'y', version: 'HEAD' }, { mcpClient: { callTool } });
    expect(result.skipped).toBe(true);
    expect(result.error).toBe('no-results');
  });
});
