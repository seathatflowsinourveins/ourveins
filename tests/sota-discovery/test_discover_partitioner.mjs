/**
 * test_discover_partitioner.mjs — TDD tests for partitioner.mjs
 *
 * Cite: DESIGN.md §1 "GitHub 1000-result-cap partitioner"
 * Uses node:test + node:assert/strict only — zero external deps.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { partitionSearch, defaultStarBuckets, halveDateWindow } from
  '../../tools/sota-discovery/lib/discovery/partitioner.mjs';

// ─── Test 1 — No partition: total ≤ cap ────────────────────────────────────
test('no partition: countFn("")=300 → partitioned:false, single slice', async () => {
  const calls = [];
  const countFn = async (q) => { calls.push(q); return 300; };

  const result = await partitionSearch('language:javascript', countFn, { cap: 1000 });

  assert.equal(result.partitioned, false);
  assert.equal(result.max_depth_hit, false);
  assert.deepEqual(result.truncated_slices, []);
  assert.equal(result.total_estimated, 300);
  assert.equal(result.slices.length, 1);
  assert.equal(result.slices[0].qualifier, '');
  assert.equal(result.slices[0].count, 300);
  // countFn should have been called exactly once (for the total probe)
  assert.equal(calls[0], '');
});

// ─── Test 2 — Star-bucket partition: each bucket ≤ cap ─────────────────────
test('star-bucket partition: each bucket ≤ cap, no date recursion needed', async () => {
  // countFn("") = 2204 (over cap); distribute among star buckets
  const bucketCounts = {
    'stars:>1000':   400,
    'stars:501..1000': 300,
    'stars:101..500': 350,
    'stars:51..100':  250,
    'stars:11..50':   400,
    'stars:1..10':    300,
    'stars:0':        200,
  };
  const countFn = async (q) => {
    if (q === '') return 2204;
    return bucketCounts[q] ?? 0;
  };

  const result = await partitionSearch('claude code', countFn, { cap: 1000 });

  assert.equal(result.partitioned, true);
  assert.equal(result.total_estimated, 2204);
  assert.equal(result.max_depth_hit, false);
  assert.deepEqual(result.truncated_slices, []);

  // Every slice must be ≤ cap
  for (const s of result.slices) {
    assert.ok(s.count <= 1000, `Slice "${s.qualifier}" has count ${s.count} > 1000`);
  }
  // Exactly one slice per non-zero bucket (all 7 have non-zero counts here)
  const nonZeroBuckets = Object.values(bucketCounts).filter(c => c > 0).length;
  assert.equal(result.slices.length, nonZeroBuckets);
  // Each slice qualifier should be one of the bucket strings
  const bucketKeys = new Set(Object.keys(bucketCounts));
  for (const s of result.slices) {
    assert.ok(bucketKeys.has(s.qualifier), `Unexpected qualifier: "${s.qualifier}"`);
  }
});

// ─── Test 3 — Date recursion: stars:0 bucket > cap, halved sub-slices ≤ cap ─
test('date recursion: stars:0 > cap triggers date splitting, all slices ≤ cap', async () => {
  const bucketCounts = {
    'stars:>1000':   400,
    'stars:501..1000': 300,
    'stars:101..500': 350,
    'stars:51..100':  250,
    'stars:11..50':   400,
    'stars:1..10':    300,
    'stars:0':       1600, // over cap → needs date split
  };

  // For date-qualified slices under stars:0:
  //  - The full-span probe (created:2008-01-01..2020-12-31) returns 1600 → forces a split
  //  - Halved sub-ranges (shorter span) return 800 → under cap
  const countFn = async (q) => {
    if (q === '') return 5000;
    // pure star buckets (no created: qualifier)
    if (bucketCounts[q] !== undefined) return bucketCounts[q];
    // Full-range stars:0 probe → still over cap (forces date split)
    if (q === 'stars:0 created:2008-01-01..2020-12-31') return 1600;
    // Any other created: qualified slice (halved sub-ranges) → under cap
    if (q.includes('created:')) return 800;
    return 0;
  };

  const result = await partitionSearch('claude code', countFn, {
    cap: 1000,
    dateLo: '2008-01-01',
    dateHi: '2020-12-31',
  });

  assert.equal(result.partitioned, true);
  assert.equal(result.total_estimated, 5000);

  // All slices must be ≤ cap
  for (const s of result.slices) {
    assert.ok(s.count <= 1000, `Slice "${s.qualifier}" has count ${s.count} > 1000`);
  }

  // The stars:0 bucket should have produced ≥2 date-qualified slices
  const dateSlices = result.slices.filter(s =>
    s.qualifier.includes('stars:0') && s.qualifier.includes('created:')
  );
  assert.ok(dateSlices.length >= 2,
    `Expected ≥2 date slices for stars:0, got ${dateSlices.length}`);

  assert.deepEqual(result.truncated_slices, []);
  assert.equal(result.max_depth_hit, false);
});

// ─── Test 4 — maxDepth truncation (pathological: always > cap) ──────────────
test('maxDepth truncation: pathological countFn, max_depth_hit:true, no hang', async () => {
  let callCount = 0;
  const countFn = async (q) => {
    callCount++;
    if (q === '') return 5000;
    // One bucket always returns over cap regardless of date window
    if (q.startsWith('stars:0')) return 2000;
    // Other buckets are fine
    return 100;
  };

  const result = await partitionSearch('claude code', countFn, {
    cap: 1000,
    maxDepth: 3,
    dateLo: '2020-01-01',
    dateHi: '2020-12-31',
  });

  // Must return (no hang/throw)
  assert.equal(result.partitioned, true);
  assert.equal(result.max_depth_hit, true);
  assert.ok(result.truncated_slices.length > 0, 'Expected at least one truncated slice');

  // truncated slices must also appear in slices
  for (const ts of result.truncated_slices) {
    const found = result.slices.find(s => s.qualifier === ts.qualifier);
    assert.ok(found, `Truncated slice "${ts.qualifier}" not found in slices[]`);
  }

  // Recursion must have been bounded: with maxDepth=3, date window 1 year,
  // we'd have at most 2^3=8 leaf nodes per bucket → total calls bounded.
  // With 7 buckets (6 fine + 1 pathological), call count is finite.
  assert.ok(callCount < 200, `Too many countFn calls: ${callCount} (suggests unbounded recursion)`);
});

// ─── Test 5 — halveDateWindow pure function ──────────────────────────────────
test('halveDateWindow pure: splits range, contiguous, covers input', () => {
  const result = halveDateWindow('2020-01-01', '2020-12-31');

  assert.equal(result.length, 2, 'Should return 2 sub-ranges for a multi-day span');
  const [[loA, hiA], [loB, hiB]] = result;

  // Outer bounds preserved
  assert.equal(loA, '2020-01-01');
  assert.equal(hiB, '2020-12-31');

  // hiA + 1 day === loB (contiguous, no overlap, no gap)
  const hiADate = new Date(`${hiA}T00:00:00Z`);
  const loBDate = new Date(`${loB}T00:00:00Z`);
  const oneDayMs = 86400 * 1000;
  assert.equal(
    loBDate.getTime() - hiADate.getTime(),
    oneDayMs,
    `hiA (${hiA}) + 1 day should equal loB (${loB})`
  );

  // loA ≤ hiA (first range is valid)
  assert.ok(new Date(`${loA}T00:00:00Z`) <= new Date(`${hiA}T00:00:00Z`));
  // loB ≤ hiB (second range is valid)
  assert.ok(new Date(`${loB}T00:00:00Z`) <= new Date(`${hiB}T00:00:00Z`));
});

test('halveDateWindow pure: single day returns length-1 array', () => {
  const result = halveDateWindow('2020-06-15', '2020-06-15');
  assert.equal(result.length, 1, 'Single day should return length-1 array');
  assert.equal(result[0][0], '2020-06-15');
  assert.equal(result[0][1], '2020-06-15');
});

// ─── Test 6 — Qualifier composition: stars:0 created: shape ─────────────────
test('qualifier composition: stars:0 date-recursion produces expected qualifier shape', async () => {
  const capturedQualifiers = [];
  const countFn = async (q) => {
    capturedQualifiers.push(q);
    if (q === '') return 5000;
    if (q === 'stars:0') return 1600; // triggers date recursion
    if (q.startsWith('stars:0 created:')) return 800; // under cap
    return 100; // all other buckets fine
  };

  await partitionSearch('claude code', countFn, {
    cap: 1000,
    dateLo: '2008-01-01',
    dateHi: '2020-12-31',
  });

  // Should have called countFn with a qualifier matching "stars:0 created:2008-01-01..<something>"
  const dateQuals = capturedQualifiers.filter(q =>
    q.startsWith('stars:0 created:2008-01-01..')
  );
  assert.ok(
    dateQuals.length >= 1,
    `Expected at least one "stars:0 created:2008-01-01..<X>" qualifier, got: ${JSON.stringify(capturedQualifiers)}`
  );

  // All such qualifiers should match the YYYY-MM-DD..YYYY-MM-DD pattern
  const dateRangePattern = /^stars:0 created:\d{4}-\d{2}-\d{2}\.\.\d{4}-\d{2}-\d{2}$/;
  for (const q of dateQuals) {
    assert.match(q, dateRangePattern, `Qualifier does not match expected pattern: "${q}"`);
  }
});

// ─── Test 7 — defaultStarBuckets shape ───────────────────────────────────────
test('defaultStarBuckets: returns expected 7 disjoint buckets', () => {
  const buckets = defaultStarBuckets();
  assert.ok(Array.isArray(buckets), 'Should return an array');
  assert.equal(buckets.length, 7);
  assert.equal(buckets[0], 'stars:>1000');
  assert.equal(buckets[buckets.length - 1], 'stars:0');
  // All entries are strings
  for (const b of buckets) {
    assert.equal(typeof b, 'string');
  }
});

// ─── Test 8 — Return shape completeness ──────────────────────────────────────
test('return shape: all required keys present on both partitioned and non-partitioned', async () => {
  // Non-partitioned
  const r1 = await partitionSearch('foo', async () => 50, { cap: 1000 });
  assert.ok('slices' in r1);
  assert.ok('total_estimated' in r1);
  assert.ok('partitioned' in r1);
  assert.ok('max_depth_hit' in r1);
  assert.ok('truncated_slices' in r1);
  assert.ok(Array.isArray(r1.slices));
  assert.ok(Array.isArray(r1.truncated_slices));

  // Partitioned
  const bucketCounts = { 'stars:>1000': 200, 'stars:501..1000': 100, 'stars:101..500': 150,
    'stars:51..100': 50, 'stars:11..50': 100, 'stars:1..10': 80, 'stars:0': 50 };
  const r2 = await partitionSearch('bar', async (q) => {
    if (q === '') return 2000;
    return bucketCounts[q] ?? 0;
  }, { cap: 1000 });
  assert.ok('slices' in r2);
  assert.ok('total_estimated' in r2);
  assert.ok('partitioned' in r2);
  assert.ok('max_depth_hit' in r2);
  assert.ok('truncated_slices' in r2);
  assert.ok(Array.isArray(r2.slices));
  assert.ok(Array.isArray(r2.truncated_slices));
});

// ─── Test 9 — Zero-count buckets are skipped ─────────────────────────────────
test('zero-count star buckets are skipped and not present in slices', async () => {
  // Only stars:>1000 and stars:0 have counts; the rest return 0
  const countFn = async (q) => {
    if (q === '') return 1500;
    if (q === 'stars:>1000') return 900;
    if (q === 'stars:0') return 600;
    return 0;
  };

  const result = await partitionSearch('foo', countFn, { cap: 1000 });
  assert.equal(result.partitioned, true);
  // Only 2 slices (the non-zero buckets)
  assert.equal(result.slices.length, 2);
  const qualifiers = result.slices.map(s => s.qualifier);
  assert.ok(qualifiers.includes('stars:>1000'));
  assert.ok(qualifiers.includes('stars:0'));
});
