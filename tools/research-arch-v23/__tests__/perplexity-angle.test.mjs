import { describe, it, expect, vi } from 'vitest';

describe('perplexity-angle (A1)', () => {
  it('exports runAngle as named function', async () => {
    const mod = await import('../angles/perplexity-angle.mjs');
    expect(typeof mod.runAngle).toBe('function');
  });

  it('handles standard MCP content array response', async () => {
    const callTool = vi.fn().mockResolvedValue({
      content: [{ type: 'text', text: 'A solid library with 50k+ stars and actively maintained.' }],
    });
    const { runAngle } = await import('../angles/perplexity-angle.mjs');
    const result = await runAngle({ owner: 'chalk', repo: 'chalk', version: 'HEAD' }, { mcpClient: { callTool } });
    expect(callTool).toHaveBeenCalledWith(expect.objectContaining({ server: 'perplexity', name: 'perplexity_search' }));
    expect(result.angleId).toBe('A1');
    expect(result.skipped).toBe(false);
    expect(result.score).toBeGreaterThanOrEqual(0);
    expect(result.score).toBeLessThanOrEqual(1);
  });

  it('handles plain string response', async () => {
    const callTool = vi.fn().mockResolvedValue(
      'obra/superpowers is a widely-used Claude Code plugin with 2k+ stars, actively maintained and well-documented.'
    );
    const { runAngle } = await import('../angles/perplexity-angle.mjs');
    const result = await runAngle({ owner: 'obra', repo: 'superpowers', version: 'HEAD' }, { mcpClient: { callTool } });
    expect(result.skipped).toBe(false);
    expect(result.score).toBeGreaterThan(0);
    expect(result.evidence.source).toBe('perplexity_search');
  });

  it('handles { content: string } response shape', async () => {
    const callTool = vi.fn().mockResolvedValue({
      content: 'This repository is production-ready and stable with comprehensive docs and regular updates.',
    });
    const { runAngle } = await import('../angles/perplexity-angle.mjs');
    const result = await runAngle({ owner: 'test', repo: 'repo', version: 'HEAD' }, { mcpClient: { callTool } });
    expect(result.skipped).toBe(false);
    expect(result.score).toBeGreaterThan(0);
  });

  it('handles { text: string } response shape', async () => {
    const callTool = vi.fn().mockResolvedValue({
      text: 'A battle-tested library with security audit and signed releases. Widely used in production.',
    });
    const { runAngle } = await import('../angles/perplexity-angle.mjs');
    const result = await runAngle({ owner: 'test', repo: 'repo', version: 'HEAD' }, { mcpClient: { callTool } });
    expect(result.skipped).toBe(false);
    expect(result.score).toBeGreaterThan(0);
  });

  it('handles JSON-stringified results inside text block', async () => {
    const jsonResults = JSON.stringify({
      results: [
        { title: 'obra/superpowers', snippet: 'Actively maintained plugin with 50k+ stars' },
        { title: 'Review', snippet: 'Well-documented and production-ready' },
      ],
    });
    const callTool = vi.fn().mockResolvedValue({
      content: [{ type: 'text', text: jsonResults }],
    });
    const { runAngle } = await import('../angles/perplexity-angle.mjs');
    const result = await runAngle({ owner: 'obra', repo: 'superpowers', version: 'HEAD' }, { mcpClient: { callTool } });
    expect(result.skipped).toBe(false);
    expect(result.score).toBeGreaterThan(0);
  });

  it('handles top-level array of content blocks', async () => {
    const callTool = vi.fn().mockResolvedValue([
      { type: 'text', text: 'This is a widely-used library that is actively maintained with regular updates.' },
    ]);
    const { runAngle } = await import('../angles/perplexity-angle.mjs');
    const result = await runAngle({ owner: 'test', repo: 'repo', version: 'HEAD' }, { mcpClient: { callTool } });
    expect(result.skipped).toBe(false);
    expect(result.score).toBeGreaterThan(0);
  });

  it('returns skipped:true when mcpClient missing', async () => {
    const { runAngle } = await import('../angles/perplexity-angle.mjs');
    const result = await runAngle({ owner: 'chalk', repo: 'chalk', version: 'HEAD' }, {});
    expect(result.skipped).toBe(true);
    expect(result.error).toMatch(/mcpClient/);
  });

  it('returns skipped:true when callTool throws', async () => {
    const callTool = vi.fn().mockRejectedValue(new Error('rate-limit'));
    const { runAngle } = await import('../angles/perplexity-angle.mjs');
    const result = await runAngle({ owner: 'chalk', repo: 'chalk', version: 'HEAD' }, { mcpClient: { callTool } });
    expect(result.skipped).toBe(true);
    expect(result.error).toMatch(/rate-limit/);
  });

  it('returns skipped:true on null response', async () => {
    const callTool = vi.fn().mockResolvedValue(null);
    const { runAngle } = await import('../angles/perplexity-angle.mjs');
    const result = await runAngle({ owner: 'test', repo: 'repo', version: 'HEAD' }, { mcpClient: { callTool } });
    expect(result.skipped).toBe(true);
    expect(result.error).toBe('empty-response');
  });

  it('returns skipped:true on empty content array', async () => {
    const callTool = vi.fn().mockResolvedValue({ content: [] });
    const { runAngle } = await import('../angles/perplexity-angle.mjs');
    const result = await runAngle({ owner: 'test', repo: 'repo', version: 'HEAD' }, { mcpClient: { callTool } });
    expect(result.skipped).toBe(true);
    expect(result.error).toBe('empty-response');
  });

  it('returns skipped:true on very short string response', async () => {
    const callTool = vi.fn().mockResolvedValue('No data');
    const { runAngle } = await import('../angles/perplexity-angle.mjs');
    const result = await runAngle({ owner: 'test', repo: 'repo', version: 'HEAD' }, { mcpClient: { callTool } });
    expect(result.skipped).toBe(true);
    expect(result.error).toBe('empty-response');
  });

  it('accepts target with identifier (convergeAudit shape)', async () => {
    const callTool = vi.fn().mockResolvedValue({
      content: [{ type: 'text', text: 'A solid library with 50k+ stars and actively maintained.' }],
    });
    const { runAngle } = await import('../angles/perplexity-angle.mjs');
    const result = await runAngle({ kind: 'github-repo', identifier: 'chalk/chalk', version: 'HEAD' }, { mcpClient: { callTool } });
    expect(result.angleId).toBe('A1');
    expect(result.skipped).toBe(false);
    expect(result.score).toBeGreaterThan(0);
  });
});
