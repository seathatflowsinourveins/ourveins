// tools/research-arch-v23/angles/__tests__/repomix-angle.test.mjs
import {describe, it, expect, vi} from 'vitest';
import {probeRepomix} from '../repomix-angle.mjs';

describe('probeRepomix', () => {
  it('returns angle shape conforming to sca-v23 A6', async () => {
    const result = await probeRepomix({kind: 'github-repo', identifier: 'obra/superpowers'}, {dryRun: true});
    expect(result.name).toBe('A6_repomix_ingest');
    expect(result.weight).toBe(0.15);
  });

  it('fail-CLOSED skipped when target missing identifier', async () => {
    const result = await probeRepomix({kind: 'github-repo'}, {});
    expect(result.skipped).toBe(true);
    expect(result.normalized_score).toBe(0);
  });

  it('fail-CLOSED skipped when target is null', async () => {
    const result = await probeRepomix(null, {});
    expect(result.skipped).toBe(true);
  });

  it('fail-CLOSED skipped when no MCP client provided', async () => {
    const result = await probeRepomix({kind: 'github-repo', identifier: 'obra/superpowers'}, {});
    expect(result.skipped).toBe(true);
    expect(result.reason).toMatch(/no MCP session/);
  });

  it('fail-CLOSED skipped when identifier not owner/repo shape', async () => {
    const mockClient = {callTool: vi.fn()};
    const result = await probeRepomix({kind: 'npm-package', identifier: '@upstash/context7-mcp'}, {mcpClient: mockClient});
    expect(result.skipped).toBe(true);
    expect(result.reason).toMatch(/owner\/repo regex/);
  });

  it('returns scored result when both probes succeed (mocked MCP)', async () => {
    const mockClient = {
      callTool: vi.fn()
        .mockResolvedValueOnce({outputId: 'rpx-abc123', filesPackaged: 150}) // pack: 150 files
        .mockResolvedValueOnce({matches: [{line: 'export function foo()'}, {line: 'export class Bar {}'}]}) // grep: 2 hits
    };
    const result = await probeRepomix({kind: 'github-repo', identifier: 'obra/superpowers'}, {mcpClient: mockClient});
    expect(result.skipped).toBeUndefined();
    expect(result.normalized_score).toBe(1.0); // min(150/100, 1.0) * 1.0 (patterns present) = 1.0
    expect(result.files_packed).toBe(150);
    expect(result.patterns_extracted).toHaveLength(2);
    expect(result.packed_output_path).toBe('rpx-abc123');
  });

  it('returns partial score when pack succeeds but grep finds no patterns', async () => {
    const mockClient = {
      callTool: vi.fn()
        .mockResolvedValueOnce({outputId: 'rpx-xyz', filesPackaged: 100}) // pack: 100 files
        .mockResolvedValueOnce({matches: []}) // grep: empty
    };
    const result = await probeRepomix({kind: 'github-repo', identifier: 'sparse/repo'}, {mcpClient: mockClient});
    expect(result.normalized_score).toBe(0.5); // min(100/100, 1.0) * 0.5 (no patterns) = 0.5
    expect(result.files_packed).toBe(100);
    expect(result.patterns_extracted).toHaveLength(0);
  });

  // ─────────────────────────────────────────────────────────────────────────
  // W441.4 codex r1 REVISE #1 — fail-CLOSED on repomix totalFiles:0 silent-fail
  // Empirically confirmed bug: pack returns valid outputId but totalFiles=0 for
  // large repos. 3-of-3 W441 deep-dive convergence (obra/superpowers, gpt-researcher,
  // claude-cookbooks). Must skip, NOT score=0 (which masks the bug as "low quality").
  // ─────────────────────────────────────────────────────────────────────────

  it('fail-CLOSED skipped when pack returns outputId but totalFiles=0 (repomix silent-fail bug)', async () => {
    const mockClient = {
      callTool: vi.fn()
        .mockResolvedValueOnce({outputId: 'rpx-abc', totalFiles: 0}) // empirically-confirmed silent-fail shape
    };
    const result = await probeRepomix({kind: 'github-repo', identifier: 'obra/superpowers'}, {mcpClient: mockClient});
    expect(result.skipped).toBe(true);
    expect(result.normalized_score).toBe(0);
    expect(result.reason).toMatch(/totalFiles=0/);
    expect(result.reason).toMatch(/silent-fail/);
    // Grep must NOT be called when totalFiles=0 (outputId nullified)
    expect(mockClient.callTool).toHaveBeenCalledTimes(1);
  });

  it('fail-CLOSED skipped when pack returns outputId but filesPackaged=0 (legacy field name)', async () => {
    const mockClient = {
      callTool: vi.fn()
        .mockResolvedValueOnce({outputId: 'rpx-xyz', filesPackaged: 0})
    };
    const result = await probeRepomix({kind: 'github-repo', identifier: 'obra/superpowers'}, {mcpClient: mockClient});
    expect(result.skipped).toBe(true);
    expect(result.reason).toMatch(/totalFiles=0/);
  });

  it('still scores when pack returns outputId AND totalFiles>0 (sanity — fix does not break happy path)', async () => {
    const mockClient = {
      callTool: vi.fn()
        .mockResolvedValueOnce({outputId: 'rpx-good', totalFiles: 100})
        .mockResolvedValueOnce({matches: [{line: 'def foo():'}]})
    };
    const result = await probeRepomix({kind: 'github-repo', identifier: 'happy/path'}, {mcpClient: mockClient});
    expect(result.skipped).toBeUndefined();
    expect(result.normalized_score).toBe(1.0);
    expect(result.files_packed).toBe(100);
  });

  // ─────────────────────────────────────────────────────────────────────────
  // W441.4 codex r1 REVISE #2 — tighter owner/repo regex (matches W441.2/.3 sibling pattern)
  // ─────────────────────────────────────────────────────────────────────────

  it('tightened regex: rejects three-segment path owner/repo/extra', async () => {
    const mockClient = {callTool: vi.fn()};
    const result = await probeRepomix({kind: 'github-repo', identifier: 'foo/bar/baz'}, {mcpClient: mockClient});
    expect(result.skipped).toBe(true);
    expect(result.reason).toMatch(/owner\/repo regex/);
    expect(mockClient.callTool).not.toHaveBeenCalled();
  });

  it('tightened regex: rejects owner >39 chars', async () => {
    const mockClient = {callTool: vi.fn()};
    const longOwner = 'a'.repeat(40);
    const result = await probeRepomix({kind: 'github-repo', identifier: `${longOwner}/repo`}, {mcpClient: mockClient});
    expect(result.skipped).toBe(true);
    expect(result.reason).toMatch(/owner\/repo regex/);
  });

  it('tightened regex: rejects owner starting with hyphen', async () => {
    const mockClient = {callTool: vi.fn()};
    const result = await probeRepomix({kind: 'github-repo', identifier: '-foo/bar'}, {mcpClient: mockClient});
    expect(result.skipped).toBe(true);
    expect(result.reason).toMatch(/owner\/repo regex/);
  });

  it('tightened regex: rejects owner with invalid chars (underscore, dot)', async () => {
    const mockClient = {callTool: vi.fn()};
    const result1 = await probeRepomix({kind: 'github-repo', identifier: 'foo_bar/baz'}, {mcpClient: mockClient});
    expect(result1.skipped).toBe(true);
    const result2 = await probeRepomix({kind: 'github-repo', identifier: 'foo.bar/baz'}, {mcpClient: mockClient});
    expect(result2.skipped).toBe(true);
  });

  it('tightened regex: accepts canonical owner/repo with dots/hyphens/underscores in repo name', async () => {
    const mockClient = {
      callTool: vi.fn()
        .mockResolvedValueOnce({outputId: 'rpx-ok', totalFiles: 50})
        .mockResolvedValueOnce({matches: [{line: 'class Foo {}'}]})
    };
    const result = await probeRepomix({kind: 'github-repo', identifier: 'my-org/my.repo_name-v2'}, {mcpClient: mockClient});
    expect(result.skipped).toBeUndefined();
  });

  it('tightened regex: rejects repo name >100 chars', async () => {
    const mockClient = {callTool: vi.fn()};
    const longRepo = 'r'.repeat(101);
    const result = await probeRepomix({kind: 'github-repo', identifier: `foo/${longRepo}`}, {mcpClient: mockClient});
    expect(result.skipped).toBe(true);
    expect(result.reason).toMatch(/owner\/repo regex/);
  });

  // ─────────────────────────────────────────────────────────────────────────
  // W441.4 codex r1 REVISE #3 — language-neutral default pattern
  // Verify the default pattern catches code-signals across multiple languages
  // (NOT just JS/TS as the prior `'export (function|class|const|default)'` did).
  // ─────────────────────────────────────────────────────────────────────────

  it('default pattern matches Python def keyword', async () => {
    // Mock the matches array as if grep_repomix_output already ran against Python code.
    // The angle passes through whatever grep returns; this asserts the DEFAULT_PATTERN
    // would match the supplied Python snippet when evaluated against a real codebase.
    const mockClient = {
      callTool: vi.fn()
        .mockResolvedValueOnce({outputId: 'rpx-py', totalFiles: 50})
        .mockImplementationOnce((tool, args) => {
          // The default pattern is passed to grep; verify it matches a Python def line.
          const pythonLine = 'def my_function(arg):';
          // Re-derive the default by inspecting the call — angle passed it through.
          const passedPattern = args.pattern;
          const re = new RegExp(passedPattern);
          if (re.test(pythonLine)) {
            return Promise.resolve({matches: [{line: pythonLine}]});
          }
          return Promise.resolve({matches: []});
        })
    };
    const result = await probeRepomix({kind: 'github-repo', identifier: 'pyrepo/sample'}, {mcpClient: mockClient});
    expect(result.patterns_extracted).toContain('def my_function(arg):');
    expect(result.normalized_score).toBeGreaterThan(0);
  });

  it('default pattern matches Go func keyword', async () => {
    const mockClient = {
      callTool: vi.fn()
        .mockResolvedValueOnce({outputId: 'rpx-go', totalFiles: 50})
        .mockImplementationOnce((tool, args) => {
          const goLine = 'func MyHandler(w http.ResponseWriter) {';
          const re = new RegExp(args.pattern);
          return Promise.resolve({matches: re.test(goLine) ? [{line: goLine}] : []});
        })
    };
    const result = await probeRepomix({kind: 'github-repo', identifier: 'gorepo/sample'}, {mcpClient: mockClient});
    expect(result.patterns_extracted).toContain('func MyHandler(w http.ResponseWriter) {');
  });

  it('default pattern matches Rust fn keyword', async () => {
    const mockClient = {
      callTool: vi.fn()
        .mockResolvedValueOnce({outputId: 'rpx-rs', totalFiles: 50})
        .mockImplementationOnce((tool, args) => {
          const rustLine = 'fn parse_input(s: &str) -> Result<()> {';
          const re = new RegExp(args.pattern);
          return Promise.resolve({matches: re.test(rustLine) ? [{line: rustLine}] : []});
        })
    };
    const result = await probeRepomix({kind: 'github-repo', identifier: 'rustrepo/sample'}, {mcpClient: mockClient});
    expect(result.patterns_extracted.length).toBeGreaterThan(0);
  });

  it('default pattern matches Java public method', async () => {
    const mockClient = {
      callTool: vi.fn()
        .mockResolvedValueOnce({outputId: 'rpx-java', totalFiles: 50})
        .mockImplementationOnce((tool, args) => {
          const javaLine = 'public static void main(String[] args) {';
          const re = new RegExp(args.pattern);
          return Promise.resolve({matches: re.test(javaLine) ? [{line: javaLine}] : []});
        })
    };
    const result = await probeRepomix({kind: 'github-repo', identifier: 'javarepo/sample'}, {mcpClient: mockClient});
    expect(result.patterns_extracted.length).toBeGreaterThan(0);
  });

  it('default pattern still matches JavaScript/TypeScript (backward-compat)', async () => {
    const mockClient = {
      callTool: vi.fn()
        .mockResolvedValueOnce({outputId: 'rpx-js', totalFiles: 50})
        .mockImplementationOnce((tool, args) => {
          const jsLine = 'export function myFunc() {';
          const re = new RegExp(args.pattern);
          return Promise.resolve({matches: re.test(jsLine) ? [{line: jsLine}] : []});
        })
    };
    const result = await probeRepomix({kind: 'github-repo', identifier: 'jsrepo/sample'}, {mcpClient: mockClient});
    expect(result.patterns_extracted).toContain('export function myFunc() {');
  });

  it('caller can override pattern with language-specific regex', async () => {
    const mockClient = {
      callTool: vi.fn()
        .mockResolvedValueOnce({outputId: 'rpx-custom', totalFiles: 50})
        .mockImplementationOnce((tool, args) => {
          // Verify the custom pattern was used (not the default).
          expect(args.pattern).toBe('^TEST_ONLY_PATTERN$');
          return Promise.resolve({matches: []});
        })
    };
    await probeRepomix(
      {kind: 'github-repo', identifier: 'custom/repo'},
      {mcpClient: mockClient, pattern: '^TEST_ONLY_PATTERN$'}
    );
    expect(mockClient.callTool).toHaveBeenCalledTimes(2);
  });
});
