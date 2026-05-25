// tools/research-arch-v23/angles/__tests__/deepwiki-angle.test.mjs
import {describe, it, expect, vi} from 'vitest';
import {probeDeepwiki, isErrorShapedPayload} from '../deepwiki-angle.mjs';

describe('probeDeepwiki', () => {
  it('returns angle shape conforming to sca-v23 A5', async () => {
    const result = await probeDeepwiki({kind: 'github-repo', identifier: 'obra/superpowers'}, {dryRun: true});
    expect(result.name).toBe('A5_cognition_deepwiki');
    expect(result.weight).toBe(0.15);
  });

  it('fail-CLOSED skipped when target missing identifier', async () => {
    const result = await probeDeepwiki({kind: 'github-repo'}, {});
    expect(result.skipped).toBe(true);
    expect(result.normalized_score).toBe(0);
  });

  it('fail-CLOSED skipped when target is null', async () => {
    const result = await probeDeepwiki(null, {});
    expect(result.skipped).toBe(true);
  });

  it('fail-CLOSED skipped when no MCP client provided', async () => {
    const result = await probeDeepwiki({kind: 'github-repo', identifier: 'obra/superpowers'}, {});
    expect(result.skipped).toBe(true);
    expect(result.reason).toMatch(/no MCP session/);
  });

  it('fail-CLOSED skipped when identifier not owner/repo shape', async () => {
    const mockClient = {callTool: vi.fn()};
    const result = await probeDeepwiki({kind: 'npm-package', identifier: '@upstash/context7-mcp'}, {mcpClient: mockClient});
    expect(result.skipped).toBe(true);
    expect(result.reason).toMatch(/owner\/repo shape/);
  });

  // W441.3 codex r1 REVISE Fix 1: tightened owner/repo regex
  it('fail-CLOSED skipped when identifier has extra path segment (owner/repo/extra)', async () => {
    const mockClient = {callTool: vi.fn()};
    const result = await probeDeepwiki({kind: 'github-repo', identifier: 'obra/superpowers/extra'}, {mcpClient: mockClient});
    expect(result.skipped).toBe(true);
    expect(result.reason).toMatch(/owner\/repo shape/);
    expect(mockClient.callTool).not.toHaveBeenCalled();
  });

  it('fail-CLOSED skipped when owner starts with hyphen', async () => {
    const mockClient = {callTool: vi.fn()};
    const result = await probeDeepwiki({kind: 'github-repo', identifier: '-owner/repo'}, {mcpClient: mockClient});
    expect(result.skipped).toBe(true);
    expect(result.reason).toMatch(/owner\/repo shape/);
  });

  it('accepts owner with leading digit (valid GitHub username)', async () => {
    // GitHub usernames CAN start with digits (e.g. 1password-public-owner).
    // Anchor: GitHub docs — usernames may only contain alphanumeric characters or single hyphens
    // and may not begin or end with a hyphen.
    const mockClient = {
      callTool: vi.fn()
        .mockResolvedValueOnce('A'.repeat(2000))
        .mockResolvedValueOnce('Q answer text here that is substantive and longer than 500 chars. ' + 'X'.repeat(450))
    };
    const result = await probeDeepwiki({kind: 'github-repo', identifier: '1owner/repo'}, {mcpClient: mockClient});
    expect(result.skipped).toBeUndefined();
  });

  it('fail-CLOSED skipped when owner contains spaces', async () => {
    const mockClient = {callTool: vi.fn()};
    const result = await probeDeepwiki({kind: 'github-repo', identifier: 'my owner/repo'}, {mcpClient: mockClient});
    expect(result.skipped).toBe(true);
    expect(result.reason).toMatch(/owner\/repo shape/);
  });

  it('fail-CLOSED skipped when repo contains forbidden characters', async () => {
    const mockClient = {callTool: vi.fn()};
    const result = await probeDeepwiki({kind: 'github-repo', identifier: 'owner/repo$bad'}, {mcpClient: mockClient});
    expect(result.skipped).toBe(true);
    expect(result.reason).toMatch(/owner\/repo shape/);
  });

  it('fail-CLOSED skipped when owner exceeds GitHub username max length (>39)', async () => {
    const mockClient = {callTool: vi.fn()};
    const longOwner = 'a'.repeat(40);
    const result = await probeDeepwiki({kind: 'github-repo', identifier: `${longOwner}/repo`}, {mcpClient: mockClient});
    expect(result.skipped).toBe(true);
    expect(result.reason).toMatch(/owner\/repo shape/);
  });

  it('returns scored result when both probes succeed (mocked MCP)', async () => {
    const mockClient = {
      callTool: vi.fn()
        .mockResolvedValueOnce('A'.repeat(2000)) // wiki contents > 1000 chars
        .mockResolvedValueOnce('Q answer text here that is substantive and longer than 500 chars. ' + 'X'.repeat(450)) // QA > 500 chars
    };
    const result = await probeDeepwiki({kind: 'github-repo', identifier: 'obra/superpowers'}, {mcpClient: mockClient});
    expect(result.skipped).toBeUndefined();
    expect(result.normalized_score).toBe(1.0); // 0.5 + 0.5
    expect(result.wiki_contents_length).toBe(2000);
  });

  it('returns partial score when only one probe succeeds', async () => {
    const mockClient = {
      callTool: vi.fn()
        .mockResolvedValueOnce('A'.repeat(2000)) // wiki succeeds
        .mockRejectedValueOnce(new Error('Q&A failed')) // QA fails
    };
    const result = await probeDeepwiki({kind: 'github-repo', identifier: 'obra/superpowers'}, {mcpClient: mockClient});
    expect(result.normalized_score).toBe(0.5); // 0.5 wiki + 0 QA
    expect(result.probe_errors).toBeDefined();
  });

  // W441.3 codex r1 REVISE Fix 2: error-shaped MCP payload hardening
  it('detects {error: "..."} error-shaped payload from read_wiki_contents (not thrown)', async () => {
    const mockClient = {
      callTool: vi.fn()
        .mockResolvedValueOnce({error: 'Repo not found'}) // error-shaped, NOT thrown
        .mockResolvedValueOnce('Q answer text here that is substantive and longer than 500 chars. ' + 'X'.repeat(450))
    };
    const result = await probeDeepwiki({kind: 'github-repo', identifier: 'obra/superpowers'}, {mcpClient: mockClient});
    expect(result.probe_errors).toBeDefined();
    expect(result.probe_errors.some(e => /read_wiki_contents/.test(e))).toBe(true);
    expect(result.probe_errors.some(e => /error-shaped/.test(e))).toBe(true);
    // wiki probe scored 0 (no length count); QA probe scored 0.5
    expect(result.wiki_contents_length).toBe(0);
    expect(result.normalized_score).toBe(0.5);
  });

  it('detects string "Error: cannot access wiki" error-shaped payload', async () => {
    const mockClient = {
      callTool: vi.fn()
        .mockResolvedValueOnce('Error: cannot access wiki for this repository') // string error
        .mockResolvedValueOnce('Q answer text here that is substantive and longer than 500 chars. ' + 'X'.repeat(450))
    };
    const result = await probeDeepwiki({kind: 'github-repo', identifier: 'obra/superpowers'}, {mcpClient: mockClient});
    expect(result.probe_errors).toBeDefined();
    expect(result.probe_errors.some(e => /read_wiki_contents.*error-shaped/.test(e))).toBe(true);
    expect(result.wiki_contents_length).toBe(0);
    expect(result.normalized_score).toBe(0.5); // only QA scored
  });

  it('detects {isError: true} error-shaped payload from ask_question', async () => {
    const mockClient = {
      callTool: vi.fn()
        .mockResolvedValueOnce('A'.repeat(2000))
        .mockResolvedValueOnce({isError: true, text: 'something went wrong'})
    };
    const result = await probeDeepwiki({kind: 'github-repo', identifier: 'obra/superpowers'}, {mcpClient: mockClient});
    expect(result.probe_errors).toBeDefined();
    expect(result.probe_errors.some(e => /ask_question.*error-shaped/.test(e))).toBe(true);
    expect(result.normalized_score).toBe(0.5); // only wiki scored
  });

  it('detects {errorCode: "..."} error-shaped payload from ask_question', async () => {
    const mockClient = {
      callTool: vi.fn()
        .mockResolvedValueOnce('A'.repeat(2000))
        .mockResolvedValueOnce({errorCode: 'WIKI_ACCESS_DENIED', message: 'denied'})
    };
    const result = await probeDeepwiki({kind: 'github-repo', identifier: 'obra/superpowers'}, {mcpClient: mockClient});
    expect(result.probe_errors).toBeDefined();
    expect(result.probe_errors.some(e => /ask_question.*error-shaped/.test(e))).toBe(true);
    expect(result.normalized_score).toBe(0.5);
  });

  it('fail-CLOSED skipped when BOTH probes return error-shaped payloads', async () => {
    const mockClient = {
      callTool: vi.fn()
        .mockResolvedValueOnce({error: 'Repo not found'})
        .mockResolvedValueOnce('Error: cannot fetch')
    };
    const result = await probeDeepwiki({kind: 'github-repo', identifier: 'obra/superpowers'}, {mcpClient: mockClient});
    expect(result.skipped).toBe(true);
    expect(result.reason).toMatch(/all probes failed/);
    expect(result.normalized_score).toBe(0);
  });

  it('normal large MCP response still scores correctly (no false positive)', async () => {
    const mockClient = {
      callTool: vi.fn()
        .mockResolvedValueOnce('# Repository: obra/superpowers\n\n' + 'A'.repeat(2000))
        .mockResolvedValueOnce('The repository is a comprehensive set of skills... ' + 'B'.repeat(600))
    };
    const result = await probeDeepwiki({kind: 'github-repo', identifier: 'obra/superpowers'}, {mcpClient: mockClient});
    expect(result.skipped).toBeUndefined();
    expect(result.probe_errors).toBeUndefined();
    expect(result.normalized_score).toBe(1.0);
  });
});

describe('isErrorShapedPayload', () => {
  it('returns true for null', () => {
    expect(isErrorShapedPayload(null)).toBe(true);
  });

  it('returns true for undefined', () => {
    expect(isErrorShapedPayload(undefined)).toBe(true);
  });

  it('returns true for {error: "..."}', () => {
    expect(isErrorShapedPayload({error: 'something'})).toBe(true);
  });

  it('returns true for {errorCode: "..."}', () => {
    expect(isErrorShapedPayload({errorCode: 'X'})).toBe(true);
  });

  it('returns true for {isError: true}', () => {
    expect(isErrorShapedPayload({isError: true})).toBe(true);
  });

  it('returns true for {code: "...", message: "fail"} (code + error-keyword)', () => {
    expect(isErrorShapedPayload({code: 'X', message: 'failed to fetch'})).toBe(true);
  });

  it('returns true for string starting with "Error:"', () => {
    expect(isErrorShapedPayload('Error: bad')).toBe(true);
  });

  it('returns true for string starting with "FAILED"', () => {
    expect(isErrorShapedPayload('FAILED to load')).toBe(true);
  });

  it('returns true for string starting with "404"', () => {
    expect(isErrorShapedPayload('404 Not Found')).toBe(true);
  });

  it('returns false for normal markdown content', () => {
    expect(isErrorShapedPayload('# Repository docs\n\nNormal content here.')).toBe(false);
  });

  it('returns false for normal object with text content', () => {
    expect(isErrorShapedPayload({text: 'Normal answer to the question.'})).toBe(false);
  });

  it('returns false for plain text response', () => {
    expect(isErrorShapedPayload('The repository implements an evaluator-optimizer loop pattern.')).toBe(false);
  });

  // W441.3 codex r2 REVISE Fix 1: extended object error-keyword coverage
  it('detects {code: "NOT_FOUND", message: "Repo not found"} (extended keyword set)', () => {
    expect(isErrorShapedPayload({code: 'NOT_FOUND', message: 'Repo not found'})).toBe(true);
  });

  it('detects {statusCode: 404, message: "Not Found"}', () => {
    expect(isErrorShapedPayload({statusCode: 404, message: 'Not Found'})).toBe(true);
  });

  it('detects {code: "TIMEOUT", message: "Request timeout"}', () => {
    expect(isErrorShapedPayload({code: 'TIMEOUT', message: 'Request timeout'})).toBe(true);
  });

  it('detects {code: "CANNOT_ACCESS", detail: "cannot access wiki"}', () => {
    expect(isErrorShapedPayload({code: 'CANNOT_ACCESS', detail: 'cannot access wiki'})).toBe(true);
  });

  it('detects {status: "forbidden", message: "Access denied"}', () => {
    expect(isErrorShapedPayload({status: 'forbidden', message: 'Access denied'})).toBe(true);
  });

  it('detects {message: "Cannot access repository"} (message-prefix, no code field)', () => {
    expect(isErrorShapedPayload({message: 'Cannot access repository'})).toBe(true);
  });

  it('detects {message: "404 - Repository not found"} (message-prefix variant)', () => {
    expect(isErrorShapedPayload({message: '404 - Repository not found'})).toBe(true);
  });

  it('detects string "Not found: repository"', () => {
    expect(isErrorShapedPayload('Not found: repository')).toBe(true);
  });

  it('detects string "Forbidden access"', () => {
    expect(isErrorShapedPayload('Forbidden access')).toBe(true);
  });

  it('detects string "Timeout while fetching"', () => {
    expect(isErrorShapedPayload('Timeout while fetching')).toBe(true);
  });

  it('returns false for {code: 200, message: "OK"} (non-error code+message)', () => {
    expect(isErrorShapedPayload({code: 200, message: 'OK'})).toBe(false);
  });

  it('returns false for {message: "Some answer text"} (non-error message-prefix)', () => {
    expect(isErrorShapedPayload({message: 'Some answer text'})).toBe(false);
  });
});

// W441.3 codex r2 REVISE Fix 2: tightened owner regex (no trailing hyphen, no consecutive hyphens)
describe('probeDeepwiki — GitHub-canonical owner validation (W441.3 r2)', () => {
  it('fail-CLOSED skipped when owner ends with hyphen', async () => {
    const mockClient = {callTool: vi.fn()};
    const result = await probeDeepwiki({kind: 'github-repo', identifier: 'obra-/superpowers'}, {mcpClient: mockClient});
    expect(result.skipped).toBe(true);
    expect(result.reason).toMatch(/owner\/repo shape/);
    expect(mockClient.callTool).not.toHaveBeenCalled();
  });

  it('fail-CLOSED skipped when owner has consecutive hyphens', async () => {
    const mockClient = {callTool: vi.fn()};
    const result = await probeDeepwiki({kind: 'github-repo', identifier: 'obra--rocks/superpowers'}, {mcpClient: mockClient});
    expect(result.skipped).toBe(true);
    expect(result.reason).toMatch(/owner\/repo shape/);
    expect(mockClient.callTool).not.toHaveBeenCalled();
  });

  it('accepts owner with single hyphen between alphanumerics (canonical case)', async () => {
    const mockClient = {
      callTool: vi.fn()
        .mockResolvedValueOnce('A'.repeat(2000))
        .mockResolvedValueOnce('Q answer text here that is substantive and longer than 500 chars. ' + 'X'.repeat(450))
    };
    const result = await probeDeepwiki({kind: 'github-repo', identifier: 'my-owner/my-repo'}, {mcpClient: mockClient});
    expect(result.skipped).toBeUndefined();
  });

  // W441.3 r2: codex r2 REVISE error-shape probe-error path (object {code, message} not thrown)
  it('detects {code, message} error-shape payload from read_wiki_contents (extended keywords)', async () => {
    const mockClient = {
      callTool: vi.fn()
        .mockResolvedValueOnce({code: 'NOT_FOUND', message: 'Repo not found'})
        .mockResolvedValueOnce('Q answer text here that is substantive and longer than 500 chars. ' + 'X'.repeat(450))
    };
    const result = await probeDeepwiki({kind: 'github-repo', identifier: 'obra/superpowers'}, {mcpClient: mockClient});
    expect(result.probe_errors).toBeDefined();
    expect(result.probe_errors.some(e => /read_wiki_contents.*error-shaped/.test(e))).toBe(true);
    expect(result.wiki_contents_length).toBe(0);
    expect(result.normalized_score).toBe(0.5);
  });
});
