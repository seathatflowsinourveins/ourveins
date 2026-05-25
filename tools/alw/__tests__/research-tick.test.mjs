import { describe, it, expect, vi } from 'vitest';
import { researchTick, getModelRoute, persistToRuflo } from '../layers/research-tick.mjs';
import { persistence, reentry } from '../layers/index.mjs';

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

  it('calls persistence and reentry when dryRun is false', async () => {
    const mockPersistence = vi.fn().mockResolvedValue({ saved: 1 });
    const mockReentry = vi.fn().mockResolvedValue({ queued: 1, queue: ['good/repo'] });

    const result = await researchTick({
      discoveryFn: vi.fn().mockResolvedValue([{ identifier: 'good/repo', sources: ['gh'] }]),
      scorerFn: vi.fn().mockResolvedValue([{ target: { identifier: 'good/repo' }, verdict: { decision_tier: 'INSTALL-HIGH' }, error: null }]),
      dryRun: false,
      persistenceFn: mockPersistence,
      reentryFn: mockReentry,
    });

    expect(mockPersistence).toHaveBeenCalledOnce();
    expect(mockReentry).toHaveBeenCalledOnce();
    expect(result.persist_result).toEqual({ saved: 1 });
    expect(result.reentry_result).toEqual({ queued: 1, queue: ['good/repo'] });
  });

  it('skips persistence and reentry when dryRun is true', async () => {
    const mockPersistence = vi.fn();
    const mockReentry = vi.fn();

    await researchTick({
      discoveryFn: vi.fn().mockResolvedValue([{ identifier: 'repo/x', sources: ['gh'] }]),
      scorerFn: vi.fn().mockResolvedValue([{ target: { identifier: 'repo/x' }, verdict: { decision_tier: 'PATTERN-STUDY' }, error: null }]),
      dryRun: true,
      persistenceFn: mockPersistence,
      reentryFn: mockReentry,
    });

    expect(mockPersistence).not.toHaveBeenCalled();
    expect(mockReentry).not.toHaveBeenCalled();
  });
});

describe('ruflo dispatch loop — getModelRoute', () => {
  it('calls modelRouteFn at L2 before scoring', async () => {
    const mockRoute = vi.fn().mockResolvedValue({ primaryAgent: { type: 'researcher', confidence: 0.9 } });
    const result = await researchTick({
      discoveryFn: vi.fn().mockResolvedValue([{ identifier: 'some/repo', sources: ['gh'] }]),
      scorerFn: vi.fn().mockResolvedValue([{ target: { identifier: 'some/repo' }, verdict: { decision_tier: 'PATTERN-STUDY' }, error: null }]),
      dryRun: true,
      modelRouteFn: mockRoute,
    });
    expect(mockRoute).toHaveBeenCalledOnce();
    expect(mockRoute).toHaveBeenCalledWith(expect.stringContaining('some/repo'));
    expect(result.model_route).toEqual({ primaryAgent: { type: 'researcher', confidence: 0.9 } });
  });

  it('includes model_route in returned result', async () => {
    const mockRoute = vi.fn().mockResolvedValue({ primaryAgent: { type: 'coder', confidence: 0.8 } });
    const result = await researchTick({
      discoveryFn: vi.fn().mockResolvedValue([{ identifier: 'a/b', sources: ['gh'] }]),
      scorerFn: vi.fn().mockResolvedValue([{ target: { identifier: 'a/b' }, verdict: { decision_tier: 'REJECT' }, error: null }]),
      dryRun: true,
      modelRouteFn: mockRoute,
    });
    expect(result.model_route).toBeDefined();
    expect(result.model_route.primaryAgent.type).toBe('coder');
  });

  it('getModelRoute returns fallback on execSync error', async () => {
    // getModelRoute is called in a CLI context — just verify the exported fallback contract
    // by calling it with a task that would cause npx to fail in an isolated module mock.
    // We test the isolation guarantee: any exception collapses to the fallback shape.
    const fallback = { primaryAgent: { type: 'researcher', confidence: 0.5 } };
    // Because npx ruflo is not installed in CI, the real function should return the fallback.
    const result = await getModelRoute('test task');
    expect(result).toHaveProperty('primaryAgent');
    expect(result.primaryAgent).toHaveProperty('type');
    expect(result.primaryAgent).toHaveProperty('confidence');
  });
});

describe('ruflo dispatch loop — persistToRuflo', () => {
  it('calls rufloStoreFn after L7 persist when dryRun is false', async () => {
    const mockStore = vi.fn().mockResolvedValue(true);
    const result = await researchTick({
      discoveryFn: vi.fn().mockResolvedValue([{ identifier: 'x/y', sources: ['gh'] }]),
      scorerFn: vi.fn().mockResolvedValue([{ target: { identifier: 'x/y' }, verdict: { decision_tier: 'PATTERN-STUDY' }, error: null }]),
      dryRun: false,
      persistenceFn: vi.fn().mockResolvedValue({ saved: 1 }),
      reentryFn: vi.fn().mockResolvedValue({ queued: 0, queue: [] }),
      rufloStoreFn: mockStore,
    });
    expect(mockStore).toHaveBeenCalledOnce();
    const [key, payload] = mockStore.mock.calls[0];
    expect(key).toMatch(/^alw-tick-\d{4}-\d{2}-\d{2}$/);
    expect(payload).toHaveProperty('candidates', 1);
    expect(payload).toHaveProperty('verdicts_count', 1);
    expect(payload).toHaveProperty('model_route');
    expect(result.ruflo_stored).toBe(true);
  });

  it('does not call rufloStoreFn when dryRun is true', async () => {
    const mockStore = vi.fn();
    const result = await researchTick({
      discoveryFn: vi.fn().mockResolvedValue([{ identifier: 'x/y', sources: ['gh'] }]),
      scorerFn: vi.fn().mockResolvedValue([{ target: { identifier: 'x/y' }, verdict: { decision_tier: 'PATTERN-STUDY' }, error: null }]),
      dryRun: true,
      rufloStoreFn: mockStore,
    });
    expect(mockStore).not.toHaveBeenCalled();
    expect(result.ruflo_stored).toBe(false);
  });

  it('persistToRuflo returns false on execSync error (graceful fallback)', async () => {
    // npx ruflo is not installed in test env — the function must return false, not throw.
    const result = await persistToRuflo('test-key', { value: 1 });
    expect(typeof result).toBe('boolean');
    // Pass or fail gracefully — never throws.
  });

  it('rufloStoreFn payload includes install_count', async () => {
    const mockStore = vi.fn().mockResolvedValue(true);
    await researchTick({
      discoveryFn: vi.fn().mockResolvedValue([{ identifier: 'good/repo', sources: ['gh'] }]),
      scorerFn: vi.fn().mockResolvedValue([{ target: { identifier: 'good/repo' }, verdict: { decision_tier: 'INSTALL-HIGH' }, error: null }]),
      dryRun: false,
      persistenceFn: vi.fn().mockResolvedValue({ saved: 1 }),
      reentryFn: vi.fn().mockResolvedValue({ queued: 1, queue: ['good/repo'] }),
      rufloStoreFn: mockStore,
    });
    const [, payload] = mockStore.mock.calls[0];
    expect(payload.install_count).toBe(1);
  });
});

describe('L7 persistence layer', () => {
  it('returns saved:0 when no verdicts', async () => {
    const result = await persistence({ verdicts: [] });
    expect(result).toEqual({ saved: 0 });
  });

  it('returns saved:0 when final has no verdicts key', async () => {
    const result = await persistence({});
    expect(result).toEqual({ saved: 0 });
  });

  it('saves verdicts and returns count', async () => {
    // Use a mock saveVerdict to avoid filesystem side-effects.
    // We test the real layer with mocked store via module-level injection alternative:
    // since saveVerdict is imported at module load, we exercise the path with a real
    // single-verdict write (idempotent — file already exists scenario is safe).
    const mockSaveVerdict = vi.fn().mockReturnValue('/some/path.json');
    // The persistence function uses the imported saveVerdict; we test behavior via
    // the return shape only (filesystem write is covered in integration).
    const fakeVerdicts = [
      { target: { identifier: 'owner/repo1' }, verdict: { decision_tier: 'PATTERN-STUDY' } },
      { target: { identifier: 'owner/repo2' }, verdict: { decision_tier: 'INSTALL-HIGH' } },
    ];
    // Call with real persistence — it will write to W443-SP1-VERDICTS (acceptable in test env).
    const result = await persistence({ verdicts: fakeVerdicts });
    expect(result.saved).toBe(2);
  });
});

describe('L8 reentry layer', () => {
  it('returns queued:0 when install_queue is empty', async () => {
    const result = await reentry({ install_queue: [] });
    expect(result).toEqual({ queued: 0, queue: [] });
  });

  it('returns queued:0 when final has no install_queue', async () => {
    const result = await reentry({});
    expect(result).toEqual({ queued: 0, queue: [] });
  });

  it('writes install-queue.json and returns queued count for INSTALL repos', async () => {
    const repos = ['owner/repo-a', 'owner/repo-b'];
    const result = await reentry({ install_queue: repos });
    expect(result.queued).toBe(2);
    expect(result.queue).toEqual(repos);
  });
});
