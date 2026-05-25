#!/usr/bin/env node
// tests/basic-memory-hybrid-retrieval.test.mjs
// W370 P2.3 — Unit tests for tools/basic-memory-hybrid-retrieval.mjs
//
// Coverage:
//   Test 1: BM25-only smoke    — dense lane returns []; pipeline must still rank BM25 hits
//   Test 2: dense-only smoke   — BM25 lane returns []; pipeline must still rank dense hits
//   Test 3: RRF fusion math    — hand-calculated expected score for fixed inputs
//   Test 4: end-to-end hybrid  — both lanes populated, fused output ordered by RRF score
//   Test 5: top-K filtering    — 8 fused candidates, topK=3 -> exactly 3 returned
//
// Bonus tests:
//   - composeRanked _bm25_rank/_dense_rank null when missing from a lane
//   - rrfFuse input validation
//   - Lane-failure resilience (one lane throws)
//
// Run: node --test tests/basic-memory-hybrid-retrieval.test.mjs
// CR-2 compliant (under tests/, not .claude/hooks/).

import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  rrfFuse,
  composeRanked,
  hybridSearch,
} from '../tools/basic-memory-hybrid-retrieval.mjs';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function makeSearchFn({ bm25 = [], dense = [], failLane = null }) {
  return async (_query, { search_type }) => {
    if (search_type === failLane) {
      throw new Error(`forced lane failure: ${failLane}`);
    }
    if (search_type === 'text') return bm25;
    if (search_type === 'semantic') return dense;
    if (search_type === 'hybrid') return [...bm25, ...dense];
    return [];
  };
}

// ---------------------------------------------------------------------------
// Test 1: BM25-only smoke (dense lane returns empty)
// ---------------------------------------------------------------------------

test('Test 1: BM25-only smoke — dense empty -> BM25 hits still rank', async () => {
  const bm25 = [
    { id: 'note-A', text: 'parallel_ratio measurement Wave 325' },
    { id: 'note-B', text: 'parallel dispatch failure mode' },
    { id: 'note-C', text: 'codex review verdict ledger' },
  ];
  const searchFn = makeSearchFn({ bm25, dense: [] });
  const ranked = await hybridSearch('parallel_ratio', { searchFn, topK: 5 });

  assert.equal(ranked.length, 3, 'all 3 BM25 hits returned');
  // BM25 lane lone -> RRF score should be 1/(60+rank); rank-1 wins.
  assert.equal(ranked[0].id, 'note-A', 'rank-1 BM25 hit at position 0');
  assert.equal(ranked[1].id, 'note-B', 'rank-2 BM25 hit at position 1');
  assert.equal(ranked[2].id, 'note-C', 'rank-3 BM25 hit at position 2');
  // Provenance check: all rows carry _bm25_rank, _dense_rank=null
  for (let i = 0; i < ranked.length; i++) {
    assert.equal(ranked[i]._bm25_rank, i + 1, `_bm25_rank correct for [${i}]`);
    assert.equal(ranked[i]._dense_rank, null, `_dense_rank null for [${i}]`);
    assert.ok(ranked[i]._rrf_score > 0, '_rrf_score positive');
  }
  // Score monotonicity
  assert.ok(ranked[0]._rrf_score > ranked[1]._rrf_score, 'descending RRF score 0>1');
  assert.ok(ranked[1]._rrf_score > ranked[2]._rrf_score, 'descending RRF score 1>2');
});

// ---------------------------------------------------------------------------
// Test 2: dense-only smoke (BM25 lane returns empty)
// ---------------------------------------------------------------------------

test('Test 2: dense-only smoke — BM25 empty -> dense hits still rank', async () => {
  const dense = [
    { id: 'sem-X', text: 'failure mode catalog for parallel dispatch' },
    { id: 'sem-Y', text: 'Wave 369 cross-encoder reranker integration' },
  ];
  const searchFn = makeSearchFn({ bm25: [], dense });
  const ranked = await hybridSearch('parallel dispatch failure', { searchFn, topK: 5 });

  assert.equal(ranked.length, 2, 'both dense hits returned');
  assert.equal(ranked[0].id, 'sem-X', 'rank-1 dense hit first');
  assert.equal(ranked[1].id, 'sem-Y', 'rank-2 dense hit second');
  for (let i = 0; i < ranked.length; i++) {
    assert.equal(ranked[i]._bm25_rank, null, `_bm25_rank null for [${i}]`);
    assert.equal(ranked[i]._dense_rank, i + 1, `_dense_rank correct for [${i}]`);
  }
});

// ---------------------------------------------------------------------------
// Test 3: RRF fusion math — hand-calculated expected scores
// ---------------------------------------------------------------------------

test('Test 3: RRF fusion math — combined scores match Cormack 2009 formula', () => {
  // Hand-construct inputs:
  //   BM25 lane:  [X (rank 1), Y (rank 2)]
  //   dense lane: [X (rank 1), Z (rank 2)]
  //
  // Expected RRF (k=60):
  //   X: 1/(60+1) + 1/(60+1) = 2/61      ~= 0.03278689   (both lanes, both at rank 1)
  //   Y: 1/(60+2)             = 1/62     ~= 0.01612903   (BM25 only at rank 2)
  //   Z: 1/(60+2)             = 1/62     ~= 0.01612903   (dense only at rank 2)
  //
  // Final order: X >> {Y, Z} tied. Stable sort keeps insertion order (Y first
  // since BM25 lane processed before dense, so Y enters agg before Z).
  const bm25 = [
    { id: 'X', text: 'doc X' },
    { id: 'Y', text: 'doc Y' },
  ];
  const dense = [
    { id: 'X', text: 'doc X (dense)' },
    { id: 'Z', text: 'doc Z' },
  ];

  const fused = rrfFuse([bm25, dense], 60);
  assert.equal(fused.length, 3, '3 unique ids across both lanes');

  // Lookup by id for clarity
  const byId = Object.fromEntries(fused.map((r) => [r.id, r]));
  const EPSILON = 1e-9;

  assert.ok(
    Math.abs(byId.X._rrf_score - 2 / 61) < EPSILON,
    `X score ~= 2/61, got ${byId.X._rrf_score}`
  );
  assert.ok(
    Math.abs(byId.Y._rrf_score - 1 / 62) < EPSILON,
    `Y score ~= 1/62, got ${byId.Y._rrf_score}`
  );
  assert.ok(
    Math.abs(byId.Z._rrf_score - 1 / 62) < EPSILON,
    `Z score ~= 1/62, got ${byId.Z._rrf_score}`
  );

  // Order: X first (much larger score); Y, Z tied at 1/62.
  assert.equal(fused[0].id, 'X', 'X first (both lanes)');
  assert.ok(
    Math.abs(fused[1]._rrf_score - fused[2]._rrf_score) < EPSILON,
    'tied at positions 1-2 (Y and Z both 1/62)'
  );
  // Insertion order: BM25 lane processed first -> Y enters agg before Z.
  // Stable sort preserves that order on ties.
  assert.equal(fused[1].id, 'Y', 'Y second on tie (BM25-lane insertion order)');
  assert.equal(fused[2].id, 'Z', 'Z third on tie');

  // Lane-rank provenance
  assert.deepEqual(byId.X._lane_ranks, { 0: 1, 1: 1 }, 'X ranks in both lanes');
  assert.deepEqual(byId.Y._lane_ranks, { 0: 2 }, 'Y rank in BM25 only');
  assert.deepEqual(byId.Z._lane_ranks, { 1: 2 }, 'Z rank in dense only');

  // composeRanked surfaces the same with friendlier column names
  const composed = composeRanked(bm25, dense, { k: 60 });
  const c = Object.fromEntries(composed.map((r) => [r.id, r]));
  assert.equal(c.X._bm25_rank, 1);
  assert.equal(c.X._dense_rank, 1);
  assert.equal(c.Y._bm25_rank, 2);
  assert.equal(c.Y._dense_rank, null);
  assert.equal(c.Z._bm25_rank, null);
  assert.equal(c.Z._dense_rank, 2);

  // Additional asymmetric-rank case to lock in the formula:
  // Z at dense rank-1 SHOULD give 1/61 (the case my initial test got wrong).
  const denseAlt = [{ id: 'Z', text: 'doc Z' }];
  const fusedAlt = rrfFuse([[], denseAlt], 60);
  assert.equal(fusedAlt.length, 1);
  assert.ok(
    Math.abs(fusedAlt[0]._rrf_score - 1 / 61) < EPSILON,
    `Z at dense rank-1 should score 1/61, got ${fusedAlt[0]._rrf_score}`
  );
});

// ---------------------------------------------------------------------------
// Test 4: end-to-end hybrid query
// ---------------------------------------------------------------------------

test('Test 4: end-to-end hybrid — both lanes -> fused output ordered by RRF', async () => {
  // BM25 hits: alpha (rank 1), beta (rank 2), gamma (rank 3)
  // Dense hits: gamma (rank 1), delta (rank 2), alpha (rank 3)
  //
  // Expected RRF (k=60):
  //   alpha: 1/61 + 1/63 = 0.01639344 + 0.01587302 = 0.03226646
  //   beta:  1/62        = 0.01612903
  //   gamma: 1/63 + 1/61 = 0.01587302 + 0.01639344 = 0.03226646  (TIE with alpha!)
  //   delta: 1/62        = 0.01612903  (TIE with beta!)
  //
  // Tie handling: stable sort means insertion order determines tie order.
  // After fusion the agg-Map insertion order is: alpha (BM25-1), beta (BM25-2),
  // gamma (BM25-3 then dense-1 merge), delta (dense-2 new). So tie order should be
  // alpha before gamma, beta before delta.
  const bm25 = [
    { id: 'alpha', text: 'alpha text' },
    { id: 'beta',  text: 'beta text' },
    { id: 'gamma', text: 'gamma text' },
  ];
  const dense = [
    { id: 'gamma', text: 'gamma dense' },
    { id: 'delta', text: 'delta dense' },
    { id: 'alpha', text: 'alpha dense' },
  ];
  const searchFn = makeSearchFn({ bm25, dense });
  const ranked = await hybridSearch('test', { searchFn, topK: 10 });

  assert.equal(ranked.length, 4, '4 unique ids');
  // alpha + gamma tie at top; beta + delta tie at bottom.
  assert.ok(
    ranked[0].id === 'alpha' || ranked[0].id === 'gamma',
    `top hit is alpha or gamma, got ${ranked[0].id}`
  );
  assert.ok(
    ranked[1].id === 'alpha' || ranked[1].id === 'gamma',
    `second hit is alpha or gamma, got ${ranked[1].id}`
  );
  assert.notEqual(ranked[0].id, ranked[1].id, 'top two are distinct');
  assert.ok(
    Math.abs(ranked[0]._rrf_score - ranked[1]._rrf_score) < 1e-9,
    'top two have equal RRF score (alpha-gamma tie)'
  );
  assert.ok(
    ranked[1]._rrf_score > ranked[2]._rrf_score,
    'tie cluster outranks the next cluster'
  );

  // Provenance: alpha has both lanes
  const a = ranked.find((r) => r.id === 'alpha');
  assert.equal(a._bm25_rank, 1);
  assert.equal(a._dense_rank, 3);
  // gamma also has both lanes
  const g = ranked.find((r) => r.id === 'gamma');
  assert.equal(g._bm25_rank, 3);
  assert.equal(g._dense_rank, 1);
  // beta BM25 only
  const b = ranked.find((r) => r.id === 'beta');
  assert.equal(b._bm25_rank, 2);
  assert.equal(b._dense_rank, null);
  // delta dense only
  const d = ranked.find((r) => r.id === 'delta');
  assert.equal(d._bm25_rank, null);
  assert.equal(d._dense_rank, 2);
});

// ---------------------------------------------------------------------------
// Test 5: top-K filtering
// ---------------------------------------------------------------------------

test('Test 5: top-K filtering — 8 unique candidates, topK=3 -> exactly 3', async () => {
  const bm25 = [
    { id: 'a1', text: 'a1' }, { id: 'a2', text: 'a2' }, { id: 'a3', text: 'a3' },
    { id: 'a4', text: 'a4' }, { id: 'a5', text: 'a5' },
  ];
  const dense = [
    { id: 'b1', text: 'b1' }, { id: 'b2', text: 'b2' }, { id: 'b3', text: 'b3' },
  ];
  const searchFn = makeSearchFn({ bm25, dense });
  const ranked = await hybridSearch('q', { searchFn, topK: 3 });

  assert.equal(ranked.length, 3, 'exactly topK=3 returned');
  // No duplicate ids
  const ids = ranked.map((r) => r.id);
  assert.equal(new Set(ids).size, 3, 'distinct ids');
  // Descending RRF score
  for (let i = 1; i < ranked.length; i++) {
    assert.ok(
      ranked[i - 1]._rrf_score >= ranked[i]._rrf_score,
      `descending at boundary [${i - 1}]>=[${i}]`
    );
  }
});

// ---------------------------------------------------------------------------
// Bonus tests — input validation + lane-failure resilience
// ---------------------------------------------------------------------------

test('bonus — rrfFuse rejects non-array rankedLists', () => {
  assert.throws(() => rrfFuse('not an array'), /must be an array of arrays/);
  assert.throws(() => rrfFuse([['not-a-doc']]), /missing string id/);
  assert.throws(() => rrfFuse([], 0), /k must be a positive number/);
});

test('bonus — hybridSearch rejects empty query', async () => {
  await assert.rejects(
    () => hybridSearch('', { searchFn: makeSearchFn({}) }),
    /query must be a non-empty string/
  );
});

test('bonus — one lane fails -> survivor lane still returns results', async () => {
  const bm25 = [
    { id: 'survivor-1', text: 'still here' },
    { id: 'survivor-2', text: 'also still here' },
  ];
  // dense lane forced to throw
  const searchFn = makeSearchFn({ bm25, dense: [], failLane: 'semantic' });
  const ranked = await hybridSearch('q', { searchFn, topK: 5 });
  assert.equal(ranked.length, 2, 'BM25 survivors returned despite dense failure');
  assert.equal(ranked[0].id, 'survivor-1');
  assert.equal(ranked[0]._dense_rank, null, 'dense rank null (lane failed)');
  assert.equal(ranked[0]._bm25_rank, 1, 'BM25 rank preserved');
});

test('bonus — both lanes fail -> empty result + no throw', async () => {
  const searchFn = async (_q, _) => { throw new Error('total outage'); };
  const ranked = await hybridSearch('q', { searchFn });
  assert.equal(ranked.length, 0, 'empty result on total outage');
});

test('bonus — no searchFn -> mock returns empty (with warn)', async () => {
  // Suppress expected stderr warns for this test (default mock fires twice)
  const origErr = process.stderr.write.bind(process.stderr);
  process.stderr.write = () => true;
  try {
    const ranked = await hybridSearch('q');
    assert.equal(ranked.length, 0, 'default mock returns empty for both lanes');
  } finally {
    process.stderr.write = origErr;
  }
});
