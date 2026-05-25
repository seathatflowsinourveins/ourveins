#!/usr/bin/env node
// tests/memory-reranker.test.mjs
// W369 P1.3 — Unit tests for tools/memory-reranker.mjs
//
// Coverage:
//   Test 1: smoke (query + 3 candidates -> 3 ranked, score field present)
//   Test 2: top_k filtering (5 candidates -> 2 returned when top_k=2)
//   Test 3: Ollama-down fallback (force backend='noop' -> all scores null, order preserved)
//
// Run: node --test tests/memory-reranker.test.mjs
// CR-2 compliant (under tests/, not .claude/hooks/).

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { rerank } from '../tools/memory-reranker.mjs';

test('smoke — 3 candidates ranked, score field present', async () => {
  const candidates = [
    { id: 'a', text: 'The parallel_ratio baseline was measured at 0.0036 in W325-A.' },
    { id: 'b', text: 'Langfuse v3.160.0 health probe returns OK status.' },
    { id: 'c', text: 'Wave-369 closed P0 ship-blocker via codex r3 review.' },
  ];
  const ranked = await rerank('parallel_ratio baseline', candidates, 5);
  assert.equal(ranked.length, 3, 'expected 3 candidates back');
  for (const r of ranked) {
    assert.ok(typeof r.id === 'string', 'id preserved');
    assert.ok(typeof r.text === 'string', 'text preserved');
    assert.ok('score' in r, 'score field present');
    assert.ok('_backend' in r, '_backend telemetry present');
    assert.ok(r.score === null || typeof r.score === 'number', 'score is null|number');
  }
  // Score-monotonicity check: ranked[0].score >= ranked[1].score (unless both null)
  if (ranked[0].score !== null && ranked[1].score !== null) {
    assert.ok(
      ranked[0].score >= ranked[1].score,
      `expected descending: got ${ranked[0].score} >= ${ranked[1].score}`
    );
  }
});

test('top_k filtering — 5 candidates, top_k=2 -> 2 returned', async () => {
  const candidates = [
    { id: '1', text: 'cat sat on mat' },
    { id: '2', text: 'dogs love bones' },
    { id: '3', text: 'parallel_ratio measurement methodology' },
    { id: '4', text: 'rainbow over the mountain' },
    { id: '5', text: 'measuring parallel agent dispatch ratio empirically' },
  ];
  const ranked = await rerank('parallel_ratio empirical baseline', candidates, 2);
  assert.equal(ranked.length, 2, 'expected exactly top_k=2 candidates back');
  // Ensure no duplicates
  const ids = ranked.map((r) => r.id);
  assert.equal(new Set(ids).size, 2, 'no duplicate ids');
});

test('fallback — backend=noop returns all candidates unchanged with score=null', async () => {
  const candidates = [
    { id: 'first', text: 'alpha' },
    { id: 'second', text: 'beta' },
    { id: 'third', text: 'gamma' },
  ];
  const ranked = await rerank('any query', candidates, 5, { backend: 'noop' });
  assert.equal(ranked.length, 3, 'all 3 returned');
  // Order preserved (stable sort with all-null scores)
  assert.equal(ranked[0].id, 'first', 'order preserved [0]');
  assert.equal(ranked[1].id, 'second', 'order preserved [1]');
  assert.equal(ranked[2].id, 'third', 'order preserved [2]');
  for (const r of ranked) {
    assert.equal(r.score, null, 'score is null in noop tier');
    assert.equal(r._backend, 'noop', '_backend is noop');
  }
});

test('empty candidates -> empty result', async () => {
  const ranked = await rerank('any query', [], 5);
  assert.equal(ranked.length, 0);
});

test('input validation — non-string query throws', async () => {
  await assert.rejects(
    () => rerank(null, [{ text: 'a' }], 5),
    /query must be a non-empty string/
  );
});

test('input validation — candidate without text throws', async () => {
  await assert.rejects(
    () => rerank('q', [{ id: 'x' }], 5),
    /candidate must have a string `text` field/
  );
});
