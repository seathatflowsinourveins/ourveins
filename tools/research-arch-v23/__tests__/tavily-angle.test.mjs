import { describe, it, expect, vi } from 'vitest';

describe('tavily-angle (A4)', () => {
  it('exports runAngle', async () => {
    expect(typeof (await import('../angles/tavily-angle.mjs')).runAngle).toBe('function');
  });

  it('calls mcpClient.callTool with server=tavily', async () => {
    const callTool = vi.fn().mockResolvedValue({
      content: [{ type: 'text', text: JSON.stringify({
        results: [{ title: 'chalk', content: 'Popular, actively maintained, 22k stars' }],
      }) }],
    });
    const { runAngle } = await import('../angles/tavily-angle.mjs');
    const result = await runAngle({ owner: 'chalk', repo: 'chalk', version: 'HEAD' }, { mcpClient: { callTool } });
    // W442: tavily rerouted to gpt-researcher.quick_search
    expect(callTool).toHaveBeenCalledWith(expect.objectContaining({ server: 'gpt-researcher', name: 'quick_search' }));
    expect(result.angleId).toBe('A4');
    expect(result.skipped).toBe(false);
  });

  it('skipped:true when mcpClient missing', async () => {
    const { runAngle } = await import('../angles/tavily-angle.mjs');
    expect((await runAngle({ owner: 'x', repo: 'y', version: 'HEAD' }, {})).skipped).toBe(true);
  });

  it('skipped:true when callTool throws', async () => {
    const callTool = vi.fn().mockRejectedValue(new Error('401'));
    const { runAngle } = await import('../angles/tavily-angle.mjs');
    expect((await runAngle({ owner: 'x', repo: 'y', version: 'HEAD' }, { mcpClient: { callTool } })).skipped).toBe(true);
  });

  it('accepts target with identifier (convergeAudit shape)', async () => {
    const callTool = vi.fn().mockResolvedValue({
      content: [{ type: 'text', text: JSON.stringify({
        results: [{ title: 'chalk', content: 'Popular, actively maintained, 22k stars' }],
      }) }],
    });
    const { runAngle } = await import('../angles/tavily-angle.mjs');
    const result = await runAngle({ kind: 'github-repo', identifier: 'chalk/chalk', version: 'HEAD' }, { mcpClient: { callTool } });
    expect(result.skipped).toBe(false);
    expect(result.score).toBeGreaterThan(0);
  });

  it('fail-CLOSED: skipped:true on empty results array', async () => {
    const callTool = vi.fn().mockResolvedValue({
      content: [{ type: 'text', text: JSON.stringify({ results: [] }) }],
    });
    const { runAngle } = await import('../angles/tavily-angle.mjs');
    const r = await runAngle({ owner: 'x', repo: 'y', version: 'HEAD' }, { mcpClient: { callTool } });
    expect(r.skipped).toBe(true);
    expect(r.error).toBe('no-results');
  });
});
