import {describe, it, expect} from 'vitest';
import {execa} from 'execa';

const CLI = 'tools/research-arch-v23/cli.mjs';

describe('v23 CLI', () => {
  it('--help exits 0 with help text', async () => {
    const result = await execa('node', [CLI, '--help']);
    expect(result.exitCode).toBe(0);
    expect(result.stdout).toMatch(/v23 convergence-audit CLI/);
    expect(result.stdout).toMatch(/USAGE/);
  });

  it('missing --target exits 2 with help', async () => {
    const result = await execa('node', [CLI], {reject: false});
    expect(result.exitCode).toBe(2);
    expect(result.stderr).toMatch(/--target is required/);
  });

  it('invalid --format exits 2', async () => {
    const result = await execa('node', [CLI, '--target', 'github-repo:obra/superpowers', '--format', 'xml'], {reject: false});
    expect(result.exitCode).toBe(2);
    expect(result.stderr).toMatch(/--format must be one of/);
  });

  it('invalid --target spec (no colon) exits 2', async () => {
    const result = await execa('node', [CLI, '--target', 'no-colon-here'], {reject: false});
    expect(result.exitCode).toBe(2);
    expect(result.stderr).toMatch(/missing colon/);
  });

  it('invalid kind exits 2', async () => {
    const result = await execa('node', [CLI, '--target', 'fake-kind:obra/superpowers'], {reject: false});
    expect(result.exitCode).toBe(2);
    expect(result.stderr).toMatch(/Invalid kind/);
  });

  // ===========================================================================
  // W441.6 codex r1 REVISE — CLI-mode --min-angles support + tighter parsing
  // ===========================================================================

  it('mcp-server target with --dry-run + explicit --min-angles 1 exits 0 (triage mode)', async () => {
    // W442: CLI default is now --min-angles 3 (bridge available). Triage mode needs explicit --min-angles 1.
    // A7 registry probe runs via npm view; satisfies min-angles=1.
    const result = await execa('node', [CLI, '--target', 'mcp-server:@modelcontextprotocol/server-filesystem', '--min-angles', '1', '--dry-run'], {reject: false, timeout: 30000});
    expect(result.exitCode).toBe(0);
  }, 35000);

  it('default --min-angles 3 + --dry-run (no bridge) exits 1 if only A7 live', async () => {
    // W442: default is 3; --dry-run prevents bridge spawn → only A7 live → 1 < 3 → exit 1
    const result = await execa('node', [CLI, '--target', 'mcp-server:@modelcontextprotocol/server-filesystem', '--dry-run'], {reject: false, timeout: 30000});
    expect(result.exitCode).toBe(1);
    expect(result.stderr).toMatch(/insufficient live angles/);
  }, 35000);

  it('--min-angles invalid (0, 8, "x", "1.5") exits 2 with validator message', async () => {
    // These bypass parseArgs strict-check (no leading dash) and hit our custom validator
    for (const bad of ['0', '8', 'x', '1.5']) {
      const result = await execa('node', [CLI, '--target', 'github-repo:obra/superpowers', '--min-angles', bad], {reject: false});
      expect(result.exitCode).toBe(2);
      expect(result.stderr).toMatch(/--min-angles must be integer 1-7/);
    }
  });

  it('--min-angles negative (leading-dash) exits 2 via parseArgs ambiguity guard', async () => {
    // parseArgs strict:true rejects "-1" as ambiguous option (could be flag) BEFORE our validator runs.
    // Exit code is still 2 (correct fail-CLOSED), but stderr message comes from parseArgs.
    // Negative values are inherently invalid for --min-angles either way.
    const result = await execa('node', [CLI, '--target', 'github-repo:obra/superpowers', '--min-angles', '-1'], {reject: false});
    expect(result.exitCode).toBe(2);
    // Either path is acceptable: parseArgs "ambiguous" OR our validator "must be integer"
    expect(result.stderr).toMatch(/(--min-angles must be integer 1-7|argument is ambiguous)/);
  });

  it('--min-angles valid boundary values (1, 7) parse without arg-error', async () => {
    // 7 won't satisfy CLI mode (only A7 is live) so exit 1, but the validation passes (not exit 2)
    const result = await execa('node', [CLI, '--target', 'github-repo:obra/superpowers', '--min-angles', '7', '--dry-run'], {reject: false, timeout: 30000});
    expect(result.exitCode).toBe(1);  // insufficient live angles, not arg error
    expect(result.stderr).not.toMatch(/--min-angles must be integer/);
  }, 35000);

  it('trailing @ with empty version exits 2 (W441.6 codex r1 REVISE fix #2)', async () => {
    const result = await execa('node', [CLI, '--target', 'npm-package:@upstash/context7-mcp@'], {reject: false});
    expect(result.exitCode).toBe(2);
    expect(result.stderr).toMatch(/empty version/);
  });

  it('trailing @ on github-repo also rejected', async () => {
    const result = await execa('node', [CLI, '--target', 'github-repo:obra/superpowers@'], {reject: false});
    expect(result.exitCode).toBe(2);
    expect(result.stderr).toMatch(/empty version/);
  });
});
