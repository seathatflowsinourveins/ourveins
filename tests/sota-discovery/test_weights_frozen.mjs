// tests/sota-discovery/test_weights_frozen.mjs
// node --test — FROZEN v20 cluster-weight drift guard (codex P1-review finding #5).
// Pins the EXACT weight values (not just sum-to-1) so any future edit to contract.mjs that
// alters the frozen profile fails CI loudly — the calibration is deferred to a 50-repo backtest.
// Run: node --test tests/sota-discovery/test_weights_frozen.mjs

import { test } from "node:test";
import assert from "node:assert/strict";

import { CLUSTER_WEIGHTS, WEIGHTS_PROFILE } from "../../tools/sota-discovery/lib/contract.mjs";

test("WEIGHTS_PROFILE is the frozen v20 profile", () => {
  assert.equal(WEIGHTS_PROFILE, "v20-frozen-2026-05-23");
});

test("FROZEN v20 cluster weights are pinned exactly (drift regression guard)", () => {
  assert.deepEqual(CLUSTER_WEIGHTS.INSTALL, { I: 0.0, II: 0.18, III: 0.27, IV: 0.2, V: 0.15, VI: 0.15, VII: 0.05, VIII: 0.0 });
  assert.deepEqual(CLUSTER_WEIGHTS["PATTERN-STUDY"], { I: 0.0, II: 0.1, III: 0.1, IV: 0.15, V: 0.45, VI: 0.0, VII: 0.15, VIII: 0.05 });
  assert.deepEqual(CLUSTER_WEIGHTS["CITE-ONLY"], { I: 0.0, II: 0.05, III: 0.1, IV: 0.2, V: 0.45, VI: 0.0, VII: 0.1, VIII: 0.1 });
  assert.deepEqual(CLUSTER_WEIGHTS.MONITOR, { I: 0.0, II: 0.35, III: 0.15, IV: 0.05, V: 0.0, VI: 0.15, VII: 0.0, VIII: 0.3 });
});

test("each decision-class weight vector sums to 1", () => {
  for (const [cls, w] of Object.entries(CLUSTER_WEIGHTS)) {
    const sum = Object.values(w).reduce((a, b) => a + b, 0);
    assert.ok(Math.abs(sum - 1) < 1e-9, `${cls} weights must sum to 1, got ${sum}`);
  }
});
