// tools/research-arch-v23/__tests__/angles-integration.test.mjs
// Integration tests for all 7 v23 research angles.
// Wave: W443
//
// A7 (registry-angle)  — always-live, uses gh CLI + npm (no MCP)
// A5 (deepwiki-angle)  — MCP-gated; skips gracefully when mcpClient=null
// A6 (repomix-angle)   — MCP-gated; skips gracefully when mcpClient=null
// A1 (perplexity-angle)— MCP-gated; skips gracefully when no mcpClient
// A2 (exa-angle)       — MCP-gated; skips gracefully when no mcpClient
// A3 (firecrawl-angle) — MCP-gated; skips gracefully when no mcpClient
// A4 (tavily-angle)    — MCP-gated; skips gracefully when no mcpClient

import { describe, it, expect } from 'vitest';
import { probeRegistry }  from '../angles/registry-angle.mjs';
import { probeDeepwiki }  from '../angles/deepwiki-angle.mjs';
import { probeRepomix }   from '../angles/repomix-angle.mjs';
import { runAngle as runPerplexity } from '../angles/perplexity-angle.mjs';
import { runAngle as runExa }        from '../angles/exa-angle.mjs';
import { runAngle as runFirecrawl }  from '../angles/firecrawl-angle.mjs';
import { runAngle as runTavily }     from '../angles/tavily-angle.mjs';

const POPULAR_REPO = { kind: 'github-repo', identifier: 'anthropics/claude-code' };
const NONEXISTENT_REPO = { kind: 'github-repo', identifier: 'anthropics/xyzzy-nonexistent-repo-w443' };

// ─── A7: registry-angle (live, no MCP) ────────────────────────────────────────

describe('A7 registry-angle', () => {
  it('scores anthropics/claude-code > 0.3 and is not skipped', async () => {
    const result = await probeRegistry(POPULAR_REPO);
    expect(result).toMatchObject({
      name: 'A7_authoritative_registry',
      weight: 0.15,
    });
    expect(result.skipped).toBeFalsy();
    expect(result.normalized_score).toBeGreaterThanOrEqual(0.3);
  }, 30_000);

  it('marks a nonexistent repo as skipped or low-score', async () => {
    const result = await probeRegistry(NONEXISTENT_REPO);
    expect(result).toMatchObject({
      name: 'A7_authoritative_registry',
      weight: 0.15,
    });
    // Either skipped (all probes failed) or very low score (archived/no data)
    const isSkippedOrLow = result.skipped === true || result.normalized_score <= 0.3;
    expect(isSkippedOrLow).toBe(true);
  }, 30_000);
});

// ─── A5: deepwiki-angle (MCP-gated) ───────────────────────────────────────────

describe('A5 deepwiki-angle', () => {
  it('skips gracefully when mcpClient is null', async () => {
    const result = await probeDeepwiki(POPULAR_REPO, { mcpClient: null });
    expect(result).toMatchObject({
      name: 'A5_cognition_deepwiki',
      skipped: true,
      weight: 0.15,
    });
    expect(result.reason).toBeTruthy();
  }, 30_000);

  it('skips gracefully when mcpClient is omitted entirely', async () => {
    const result = await probeDeepwiki(POPULAR_REPO);
    expect(result).toMatchObject({
      name: 'A5_cognition_deepwiki',
      skipped: true,
      weight: 0.15,
    });
  }, 30_000);
});

// ─── A6: repomix-angle (MCP-gated) ────────────────────────────────────────────

describe('A6 repomix-angle', () => {
  it('skips gracefully when mcpClient is null', async () => {
    const result = await probeRepomix(POPULAR_REPO, { mcpClient: null });
    expect(result).toMatchObject({
      name: 'A6_repomix_ingest',
      skipped: true,
      weight: 0.15,
    });
    expect(result.reason).toBeTruthy();
  }, 30_000);

  it('skips gracefully when mcpClient is omitted entirely', async () => {
    const result = await probeRepomix(POPULAR_REPO);
    expect(result).toMatchObject({
      name: 'A6_repomix_ingest',
      skipped: true,
      weight: 0.15,
    });
  }, 30_000);
});

// ─── A1: perplexity-angle (MCP-gated) ─────────────────────────────────────────

describe('A1 perplexity-angle', () => {
  it('skips gracefully when no mcpClient provided', async () => {
    const result = await runPerplexity(POPULAR_REPO, {});
    expect(result).toMatchObject({
      angleId: 'A1',
      skipped: true,
    });
    expect(result.error).toBeTruthy();
  }, 30_000);

  it('skips gracefully when mcpClient is null', async () => {
    const result = await runPerplexity(POPULAR_REPO, { mcpClient: null });
    expect(result).toMatchObject({
      angleId: 'A1',
      skipped: true,
    });
  }, 30_000);
});

// ─── A2: exa-angle (MCP-gated) ────────────────────────────────────────────────

describe('A2 exa-angle', () => {
  it('skips gracefully when no mcpClient provided', async () => {
    const result = await runExa(POPULAR_REPO, {});
    expect(result).toMatchObject({
      angleId: 'A2',
      skipped: true,
    });
    expect(result.error).toBeTruthy();
  }, 30_000);

  it('skips gracefully when mcpClient is null', async () => {
    const result = await runExa(POPULAR_REPO, { mcpClient: null });
    expect(result).toMatchObject({
      angleId: 'A2',
      skipped: true,
    });
  }, 30_000);
});

// ─── A3: firecrawl-angle (MCP-gated) ──────────────────────────────────────────

describe('A3 firecrawl-angle', () => {
  it('skips gracefully when no mcpClient provided', async () => {
    const result = await runFirecrawl(POPULAR_REPO, {});
    expect(result).toMatchObject({
      angleId: 'A3',
      skipped: true,
    });
    expect(result.error).toBeTruthy();
  }, 30_000);

  it('skips gracefully when mcpClient is null', async () => {
    const result = await runFirecrawl(POPULAR_REPO, { mcpClient: null });
    expect(result).toMatchObject({
      angleId: 'A3',
      skipped: true,
    });
  }, 30_000);
});

// ─── A4: tavily-angle (MCP-gated) ─────────────────────────────────────────────

describe('A4 tavily-angle', () => {
  it('skips gracefully when no mcpClient provided', async () => {
    const result = await runTavily(POPULAR_REPO, {});
    expect(result).toMatchObject({
      angleId: 'A4',
      skipped: true,
    });
    expect(result.error).toBeTruthy();
  }, 30_000);

  it('skips gracefully when mcpClient is null', async () => {
    const result = await runTavily(POPULAR_REPO, { mcpClient: null });
    expect(result).toMatchObject({
      angleId: 'A4',
      skipped: true,
    });
  }, 30_000);
});
