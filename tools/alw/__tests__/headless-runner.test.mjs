import { describe, it, expect } from 'vitest';

describe('headless-runner module', () => {
  it('exports are importable', async () => {
    // Just verify the module loads without error
    const mod = await import('../headless-runner.mjs');
    expect(mod).toBeDefined();
  });
});
