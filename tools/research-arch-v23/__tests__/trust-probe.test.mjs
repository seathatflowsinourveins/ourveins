import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock execa at module level
vi.mock('execa', () => ({
  execa: vi.fn(),
}));

import { execa } from 'execa';

describe('trust-probe.mjs', () => {
  beforeEach(() => {
    vi.mocked(execa).mockReset();
  });

  it('exports probeTrust as named function', async () => {
    const mod = await import('../trust-probe.mjs');
    expect(typeof mod.probeTrust).toBe('function');
  });

  it('returns all-FALSE when scorecard+osv binaries fail (fail-CLOSED)', async () => {
    vi.mocked(execa).mockRejectedValue(Object.assign(new Error('ENOENT'), { code: 'ENOENT' }));
    const { probeTrust } = await import('../trust-probe.mjs');
    const result = await probeTrust({ owner: 'x', repo: 'y', version: 'HEAD' });
    expect(result.signed_releases).toBe(false);
    expect(result.malicious_update_review).toBe(false);
    expect(result.transitive_deps_clean).toBe(false);
    expect(result.license_safe).toBe(false);
  });

  it('sets signed_releases=true when Scorecard Signed-Releases >= 8', async () => {
    const scorecardJson = JSON.stringify({
      score: 8.5,
      checks: [
        { name: 'Signed-Releases', score: 9 },
        { name: 'Maintained', score: 10 },
        { name: 'Code-Review', score: 8 },
        { name: 'Vulnerabilities', score: 10 },
      ],
    });
    const osvJson = JSON.stringify({ results: [] });
    vi.mocked(execa).mockImplementation(async (bin) => {
      if (String(bin).includes('scorecard') || bin === 'scorecard') {
        return { exitCode: 0, stdout: scorecardJson, stderr: '' };
      }
      return { exitCode: 0, stdout: osvJson, stderr: '' };
    });
    const { probeTrust } = await import('../trust-probe.mjs');
    // W442 codex r2: localPath required for osv-scanner; without it, transitive_deps_clean defaults false
    const result = await probeTrust({ owner: 'chalk', repo: 'chalk', version: 'HEAD', license: 'MIT', localPath: '/tmp/chalk' });
    expect(result.signed_releases).toBe(true);
    expect(result.malicious_update_review).toBe(true);
    expect(result.transitive_deps_clean).toBe(true);
    expect(result.license_safe).toBe(true);
  });

  it('sets transitive_deps_clean=false when osv finds HIGH severity', async () => {
    const scorecardJson = JSON.stringify({
      score: 8,
      checks: [
        { name: 'Signed-Releases', score: 9 },
        { name: 'Maintained', score: 10 },
        { name: 'Code-Review', score: 8 },
        { name: 'Vulnerabilities', score: 10 },
      ],
    });
    const osvJson = JSON.stringify({
      results: [{
        packages: [{
          vulnerabilities: [{ id: 'GHSA-xxx', database_specific: { severity: 'HIGH' } }],
        }],
      }],
    });
    vi.mocked(execa).mockImplementation(async (bin) => {
      if (String(bin).includes('scorecard') || bin === 'scorecard') {
        return { exitCode: 0, stdout: scorecardJson, stderr: '' };
      }
      return { exitCode: 1, stdout: osvJson, stderr: '' };
    });
    const { probeTrust } = await import('../trust-probe.mjs');
    const result = await probeTrust({ owner: 'x', repo: 'y', version: 'HEAD' });
    expect(result.transitive_deps_clean).toBe(false);
  });

  it('license_safe=true for MIT', async () => {
    vi.mocked(execa).mockResolvedValue({ exitCode: 0, stdout: '{"checks":[]}', stderr: '' });
    const { probeTrust } = await import('../trust-probe.mjs');
    const result = await probeTrust({ owner: 'x', repo: 'y', version: 'HEAD', license: 'MIT' });
    expect(result.license_safe).toBe(true);
  });

  it('license_safe=false for AGPL-3.0', async () => {
    vi.mocked(execa).mockResolvedValue({ exitCode: 0, stdout: '{"checks":[]}', stderr: '' });
    const { probeTrust } = await import('../trust-probe.mjs');
    const result = await probeTrust({ owner: 'x', repo: 'y', version: 'HEAD', license: 'AGPL-3.0' });
    expect(result.license_safe).toBe(false);
  });

  // ===========================================================================
  // W442 codex r1 finding 5 — fail-CLOSED for remote repos without local lockfile
  // ===========================================================================

  it('sets transitive_deps_clean=false for remote repos without local lockfile (fail-CLOSED)', async () => {
    // osv-scanner can't scan remote repos — must default to false
    vi.mocked(execa).mockImplementation(async (bin) => {
      if (String(bin).includes('scorecard') || bin === 'scorecard') {
        return { exitCode: 0, stdout: '{"checks":[]}', stderr: '' };
      }
      // osv-scanner returns error for remote repo
      return { exitCode: 1, stdout: '', stderr: 'no lockfile found' };
    });
    const { probeTrust } = await import('../trust-probe.mjs');
    const result = await probeTrust({ owner: 'remote', repo: 'repo', version: 'HEAD' });
    expect(result.transitive_deps_clean).toBe(false);
  });
});
