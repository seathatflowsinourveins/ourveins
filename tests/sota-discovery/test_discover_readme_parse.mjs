/**
 * Tests for tools/sota-discovery/lib/discovery/readme-parse.mjs
 * sca-v22 DESIGN.md §1 (awesome-list mining + named-anchor alternatives facets)
 */

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { extractRepoLinks, extractAlternatives } from '../../tools/sota-discovery/lib/discovery/readme-parse.mjs';

// ---------------------------------------------------------------------------
// Test 1: extractRepoLinks pulls repos from plain URLs AND markdown links
// ---------------------------------------------------------------------------
describe('extractRepoLinks', () => {
  it('pulls repos from plain URLs and markdown links including .git stripping', () => {
    const text = [
      'Check out https://github.com/vercel/next.js for SSR.',
      '[Remix](https://github.com/remix-run/remix) is a full-stack framework.',
      'Also see http://www.github.com/sveltejs/kit.git for SvelteKit.',
    ].join('\n');
    const result = extractRepoLinks(text);
    assert.ok(result.includes('vercel/next.js'), `missing vercel/next.js — got ${JSON.stringify(result)}`);
    assert.ok(result.includes('remix-run/remix'), `missing remix-run/remix — got ${JSON.stringify(result)}`);
    assert.ok(result.includes('sveltejs/kit'), `missing sveltejs/kit (.git not stripped?) — got ${JSON.stringify(result)}`);
  });

  // -------------------------------------------------------------------------
  // Test 2: Reserved-path rejection
  // -------------------------------------------------------------------------
  it('excludes GitHub reserved paths (sponsors, topics, marketplace)', () => {
    const text = [
      'https://github.com/sponsors/foo',
      'https://github.com/topics/cli',
      'https://github.com/marketplace/x',
    ].join('\n');
    const result = extractRepoLinks(text);
    assert.strictEqual(result.length, 0, `expected empty but got ${JSON.stringify(result)}`);
  });

  // -------------------------------------------------------------------------
  // Test 3: Anchor and trailing punctuation stripping
  // -------------------------------------------------------------------------
  it('strips anchors, trailing slash, and trailing punctuation', () => {
    const text = '(https://github.com/a/b#readme). See also https://github.com/c/d/';
    const result = extractRepoLinks(text);
    assert.ok(result.includes('a/b'), `missing a/b — got ${JSON.stringify(result)}`);
    assert.ok(result.includes('c/d'), `missing c/d — got ${JSON.stringify(result)}`);
    assert.ok(!result.some(r => r.includes('#')), 'anchor not stripped');
    assert.ok(!result.some(r => r.endsWith('/')), 'trailing slash not stripped');
  });

  // -------------------------------------------------------------------------
  // Test 4: Dedup and lowercase normalisation
  // -------------------------------------------------------------------------
  it('deduplicates and lowercases owner/repo', () => {
    const text = 'github.com/Owner/Repo\ngithub.com/owner/repo';
    const result = extractRepoLinks(text);
    assert.strictEqual(result.length, 1, `expected 1 entry, got ${JSON.stringify(result)}`);
    assert.strictEqual(result[0], 'owner/repo');
  });

  // -------------------------------------------------------------------------
  // Test 7 (partial): null / non-string input returns []
  // -------------------------------------------------------------------------
  it('returns [] for null input', () => {
    assert.deepEqual(extractRepoLinks(null), []);
  });

  it('returns [] for non-string input', () => {
    assert.deepEqual(extractRepoLinks(42), []);
    assert.deepEqual(extractRepoLinks(undefined), []);
    assert.deepEqual(extractRepoLinks({}), []);
  });
});

// ---------------------------------------------------------------------------
// Test 5: extractAlternatives scopes to matching heading sections only
// ---------------------------------------------------------------------------
describe('extractAlternatives', () => {
  it('returns only repos from Alternatives section, not from Features section', () => {
    const readme = [
      '# My Project',
      '',
      '## Features',
      '',
      'We use github.com/x/y internally.',
      '',
      '## Alternatives',
      '',
      'You may also consider [Z](https://github.com/z/w).',
    ].join('\n');
    const result = extractAlternatives(readme);
    assert.ok(result.includes('z/w'), `missing z/w — got ${JSON.stringify(result)}`);
    assert.ok(!result.includes('x/y'), `x/y should NOT appear — got ${JSON.stringify(result)}`);
  });

  // -------------------------------------------------------------------------
  // Test 6: Heading variants all trigger extraction
  // -------------------------------------------------------------------------
  it('triggers on "Compared to" heading', () => {
    const readme = '## Compared to\n\nhttps://github.com/a/b\n';
    assert.ok(extractAlternatives(readme).includes('a/b'));
  });

  it('triggers on "Similar Tools" heading', () => {
    const readme = '## Similar Tools\n\nhttps://github.com/a/c\n';
    assert.ok(extractAlternatives(readme).includes('a/c'));
  });

  it('triggers on "### See Also" heading', () => {
    const readme = '### See Also\n\nhttps://github.com/d/e\n';
    assert.ok(extractAlternatives(readme).includes('d/e'));
  });

  it('triggers on "## vs. Other Libraries" heading', () => {
    const readme = '## vs. Other Libraries\n\nhttps://github.com/f/g\n';
    assert.ok(extractAlternatives(readme).includes('f/g'));
  });

  it('triggers on "Related Projects" heading', () => {
    const readme = '## Related Projects\n\nhttps://github.com/h/i\n';
    assert.ok(extractAlternatives(readme).includes('h/i'));
  });

  // -------------------------------------------------------------------------
  // Test 7: No matching section → [], null → []
  // -------------------------------------------------------------------------
  it('returns [] when no alternatives section exists', () => {
    const readme = '# Project\n\n## Installation\n\nhttps://github.com/j/k\n';
    assert.deepEqual(extractAlternatives(readme), []);
  });

  it('returns [] for null input', () => {
    assert.deepEqual(extractAlternatives(null), []);
  });

  it('returns [] for non-string input', () => {
    assert.deepEqual(extractAlternatives(42), []);
    assert.deepEqual(extractAlternatives(undefined), []);
  });

  // -------------------------------------------------------------------------
  // Dedup across multiple matching sections
  // -------------------------------------------------------------------------
  it('deduplicates across multiple matching sections', () => {
    const readme = [
      '## Alternatives',
      'https://github.com/dup/repo',
      '',
      '## See Also',
      'https://github.com/dup/repo',
      'https://github.com/other/thing',
    ].join('\n');
    const result = extractAlternatives(readme);
    const dupEntries = result.filter(r => r === 'dup/repo');
    assert.strictEqual(dupEntries.length, 1, 'duplicate not deduped');
    assert.ok(result.includes('other/thing'));
  });
});
