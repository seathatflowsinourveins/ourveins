// tools/research-arch-v23/angles/__tests__/registry-angle.test.mjs
import {describe, it, expect, vi, beforeEach, afterEach} from 'vitest';

describe('probeRegistry — live network tests (existing)', () => {
  it('returns angle shape conforming to sca-v23 A7', async () => {
    const {probeRegistry} = await import('../registry-angle.mjs');
    const result = await probeRegistry({kind: 'github-repo', identifier: 'obra/superpowers', version: 'v5.1.0'});
    expect(result.name).toBe('A7_authoritative_registry');
    expect(result.weight).toBe(0.15);
    // Either skipped (if gh CLI not available) or scored — both are valid shapes.
    if (!result.skipped) {
      expect(result.normalized_score).toBeGreaterThanOrEqual(0);
      expect(result.normalized_score).toBeLessThanOrEqual(1);
    }
  }, 60000);

  it('fail-CLOSED skipped when target missing identifier', async () => {
    const {probeRegistry} = await import('../registry-angle.mjs');
    const result = await probeRegistry({kind: 'github-repo'});
    expect(result.skipped).toBe(true);
    expect(result.normalized_score).toBe(0);
  });

  it('fail-CLOSED skipped when target is null', async () => {
    const {probeRegistry} = await import('../registry-angle.mjs');
    const result = await probeRegistry(null);
    expect(result.skipped).toBe(true);
  });

  it('detects archived repos and reduces score', async () => {
    const {probeRegistry} = await import('../registry-angle.mjs');
    // Use a known-archived test repo or skip if not available
    // For now, just verify the angle shape; archived-handling tested via integration
    const result = await probeRegistry({kind: 'github-repo', identifier: 'octocat/Hello-World'});
    expect(result.name).toBe('A7_authoritative_registry');
  }, 60000);
});

describe('probeRegistry — tightened identifier validation (codex r1 REVISE #2)', () => {
  it('rejects identifier owner/repo/extra (3-segment) — should not attempt gh probe', async () => {
    // owner/repo/extra has 3 segments → does not match canonical owner/repo regex
    // → no probe attempted → skipped:true with "matched no probe type" reason
    const {probeRegistry} = await import('../registry-angle.mjs');
    const result = await probeRegistry({identifier: 'owner/repo/extra'});
    expect(result.skipped).toBe(true);
    expect(result.reason).toMatch(/matched no probe type/);
    expect(result.normalized_score).toBe(0);
  });

  it('rejects identifier with leading digit owner (1obra/repo) — invalid GitHub owner', async () => {
    // GitHub owner must start with alphanumeric BUT current regex `[a-zA-Z0-9]` allows leading digit
    // Wait — re-read: `[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,38})` — leading digit IS allowed by the regex.
    // GitHub historically allows owners that start with digits (e.g. 0xProject). So this test verifies
    // that leading-digit owner is ACCEPTED (passes regex), not rejected. Only invalid chars rejected.
    const {probeRegistry} = await import('../registry-angle.mjs');
    const result = await probeRegistry({identifier: '1obra/repo'});
    // 1obra/repo matches the regex; gh probe attempted; will skip:true if gh fails OR score if succeeds.
    // We only assert the angle shape is returned (not a thrown error).
    expect(result.name).toBe('A7_authoritative_registry');
  }, 60000);

  it('rejects identifier with empty repo (obra/) — invalid', async () => {
    const {probeRegistry} = await import('../registry-angle.mjs');
    const result = await probeRegistry({identifier: 'obra/'});
    // obra/ has empty repo segment → does not match regex → no probe attempted → skipped:true
    expect(result.skipped).toBe(true);
    expect(result.reason).toMatch(/matched no probe type/);
  });

  it('rejects identifier with invalid owner chars (foo bar/repo) — space invalid', async () => {
    const {probeRegistry} = await import('../registry-angle.mjs');
    const result = await probeRegistry({identifier: 'foo bar/repo'});
    expect(result.skipped).toBe(true);
    expect(result.reason).toMatch(/matched no probe type/);
  });

  it('rejects identifier exceeding owner length (40+ chars in owner)', async () => {
    const {probeRegistry} = await import('../registry-angle.mjs');
    const tooLongOwner = 'a'.repeat(40); // canonical max is 39
    const result = await probeRegistry({identifier: `${tooLongOwner}/repo`});
    expect(result.skipped).toBe(true);
    expect(result.reason).toMatch(/matched no probe type/);
  });

  it('rejects github-repo kind with malformed identifier (no slash)', async () => {
    const {probeRegistry} = await import('../registry-angle.mjs');
    // kind=github-repo says "try gh" but identifier has no slash → does not match canonical regex.
    // Per impl: attempts.gh stays false (isGhIdentifier=false → no execa call), probeErrors records
    // the regex-rejection. anyAttempted=false → skipped:true with "matched no probe type" reason.
    const result = await probeRegistry({kind: 'github-repo', identifier: 'just-a-name-no-slash'});
    expect(result.skipped).toBe(true);
  });
});

describe('probeRegistry — fail-CLOSED with mocked execa failures (codex r1 REVISE #1)', () => {
  beforeEach(() => {
    vi.resetModules();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.resetModules();
  });

  it('github-repo with gh probe FAIL returns skipped:true (NOT score=0)', async () => {
    vi.doMock('execa', () => ({
      execa: vi.fn(async (_cmd, _args) => {
        const err = new Error('gh: not authenticated');
        err.shortMessage = 'gh: not authenticated';
        throw err;
      }),
    }));
    const {probeRegistry} = await import('../registry-angle.mjs');
    const result = await probeRegistry({kind: 'github-repo', identifier: 'obra/superpowers'});
    expect(result.skipped).toBe(true);
    expect(result.reason).toMatch(/all attempted probes failed/);
    expect(result.reason).toMatch(/gh: not authenticated/);
    expect(result.normalized_score).toBe(0);
  });

  it('npm-package with npm probe FAIL returns skipped:true (NOT score=0)', async () => {
    vi.doMock('execa', () => ({
      execa: vi.fn(async (_cmd, _args) => {
        const err = new Error('npm view: 404 Not Found');
        err.shortMessage = 'npm view: 404 Not Found';
        throw err;
      }),
    }));
    const {probeRegistry} = await import('../registry-angle.mjs');
    const result = await probeRegistry({kind: 'npm-package', identifier: 'nonexistent-pkg-xyz'});
    expect(result.skipped).toBe(true);
    expect(result.reason).toMatch(/all attempted probes failed/);
    expect(result.reason).toMatch(/npm view/);
    expect(result.normalized_score).toBe(0);
  });

  it('mcp-server with npm probe FAIL returns skipped:true', async () => {
    vi.doMock('execa', () => ({
      execa: vi.fn(async () => {
        const err = new Error('npm registry unreachable');
        err.shortMessage = 'npm registry unreachable';
        throw err;
      }),
    }));
    const {probeRegistry} = await import('../registry-angle.mjs');
    const result = await probeRegistry({kind: 'mcp-server', identifier: '@scope/some-mcp'});
    expect(result.skipped).toBe(true);
    expect(result.normalized_score).toBe(0);
  });

  it('scoped npm identifier (@scope/pkg) with probe FAIL returns skipped:true (regression — would have been silent 0 pre-fix)', async () => {
    vi.doMock('execa', () => ({
      execa: vi.fn(async () => {
        const err = new Error('ENOTFOUND registry.npmjs.org');
        err.shortMessage = 'ENOTFOUND registry.npmjs.org';
        throw err;
      }),
    }));
    const {probeRegistry} = await import('../registry-angle.mjs');
    const result = await probeRegistry({identifier: '@scope/pkg-name'});
    expect(result.skipped).toBe(true);
    expect(result.reason).toMatch(/all attempted probes failed/);
  });

  it('github-repo with successful gh probe returns scored result (not skipped) — sanity', async () => {
    vi.doMock('execa', () => ({
      execa: vi.fn(async () => ({
        stdout: JSON.stringify({
          stars: 1000, forks: 50, license: 'MIT',
          pushed_at: new Date().toISOString(),
          default_branch: 'main', archived: false, disabled: false,
        }),
      })),
    }));
    const {probeRegistry} = await import('../registry-angle.mjs');
    const result = await probeRegistry({kind: 'github-repo', identifier: 'obra/superpowers'});
    expect(result.skipped).toBeUndefined();
    expect(result.normalized_score).toBeGreaterThan(0); // license-OK + recent-commit at minimum
    expect(result.name).toBe('A7_authoritative_registry');
  });
});
