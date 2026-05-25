import { describe, it, expect, vi } from 'vitest';

describe('firecrawl-angle (A3)', () => {
  it('exports runAngle', async () => {
    expect(typeof (await import('../angles/firecrawl-angle.mjs')).runAngle).toBe('function');
  });

  it('calls mcpClient.callTool with server=firecrawl', async () => {
    const callTool = vi.fn().mockResolvedValue({
      content: [{ type: 'text', text: JSON.stringify({
        data: [{ markdown: '# chalk — actively maintained CLI string styling, 22k stars' }],
      }) }],
    });
    const { runAngle } = await import('../angles/firecrawl-angle.mjs');
    const result = await runAngle({ owner: 'chalk', repo: 'chalk', version: 'HEAD' }, { mcpClient: { callTool } });
    expect(callTool).toHaveBeenCalledWith(expect.objectContaining({ server: 'firecrawl', name: 'firecrawl_search' }));
    expect(result.angleId).toBe('A3');
    expect(result.skipped).toBe(false);
  });

  it('skipped:true when mcpClient missing', async () => {
    const { runAngle } = await import('../angles/firecrawl-angle.mjs');
    expect((await runAngle({ owner: 'x', repo: 'y', version: 'HEAD' }, {})).skipped).toBe(true);
  });

  it('skipped:true when callTool throws', async () => {
    const callTool = vi.fn().mockRejectedValue(new Error('quota'));
    const { runAngle } = await import('../angles/firecrawl-angle.mjs');
    const r = await runAngle({ owner: 'x', repo: 'y', version: 'HEAD' }, { mcpClient: { callTool } });
    expect(r.skipped).toBe(true);
  });

  it('accepts target with identifier (convergeAudit shape)', async () => {
    const callTool = vi.fn().mockResolvedValue({
      content: [{ type: 'text', text: JSON.stringify({
        data: [{ markdown: '# chalk — actively maintained CLI string styling, 22k stars' }],
      }) }],
    });
    const { runAngle } = await import('../angles/firecrawl-angle.mjs');
    const result = await runAngle({ kind: 'github-repo', identifier: 'chalk/chalk', version: 'HEAD' }, { mcpClient: { callTool } });
    expect(result.skipped).toBe(false);
    expect(result.score).toBeGreaterThan(0);
  });

  it('fail-CLOSED: skipped:true on empty data array', async () => {
    const callTool = vi.fn().mockResolvedValue({
      content: [{ type: 'text', text: JSON.stringify({ data: [] }) }],
    });
    const { runAngle } = await import('../angles/firecrawl-angle.mjs');
    const r = await runAngle({ owner: 'x', repo: 'y', version: 'HEAD' }, { mcpClient: { callTool } });
    expect(r.skipped).toBe(true);
    expect(r.error).toBe('no-results');
  });
});
