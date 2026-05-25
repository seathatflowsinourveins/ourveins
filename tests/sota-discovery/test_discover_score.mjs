/**
 * Tests for tools/sota-discovery/lib/discovery/score.mjs
 * TDD — written BEFORE the implementation.
 * Run: node --test tests/sota-discovery/test_discover_score.mjs
 */

import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  deriveStarVelocity,
  leaderScore,
  hiddenGemScore,
  scoreCandidate,
} from "../../tools/sota-discovery/lib/discovery/score.mjs";

const NOW = Date.parse("2026-05-23T00:00:00Z");
const day = (n) => new Date(NOW - n * 86400_000).toISOString();

// Helper: build an array of ISO timestamps spread across the last `spanDays` days
function spreadTimestamps(count, spanDays) {
  const out = [];
  for (let i = 0; i < count; i++) {
    // distribute evenly over spanDays, most recent first
    const daysAgo = (i / count) * spanDays;
    out.push(day(daysAgo));
  }
  return out;
}

// ── Fixture candidates ────────────────────────────────────────────────────────

const LEADER = {
  stars: 50_000,
  reverseDeps: 8_000,
  sources: ["keyword", "reverse-dependency", "trending"],
  createdAt: "2016-01-01",
  pushedAt: day(2),
  recentStarredAt: null,
  starVelocity: null,
};

// 70 timestamps over the last 30 days
const GEM = {
  stars: 140,
  reverseDeps: 60,
  sources: ["awesome-list"],
  createdAt: day(60),
  pushedAt: day(1),
  recentStarredAt: spreadTimestamps(70, 30),
  starVelocity: null,
};

// ── Test 1: THE crossover property ────────────────────────────────────────────

describe("crossover property", () => {
  it("LEADER has higher leaderScore than GEM", () => {
    const ls = leaderScore(LEADER, { now: NOW }).score;
    const gs = leaderScore(GEM, { now: NOW }).score;
    assert.ok(
      ls > gs,
      `Expected leaderScore(LEADER)=${ls.toFixed(4)} > leaderScore(GEM)=${gs.toFixed(4)}`
    );
  });

  it("GEM has higher hiddenGemScore than LEADER", () => {
    const gl = hiddenGemScore(GEM, { now: NOW }).score;
    const ll = hiddenGemScore(LEADER, { now: NOW }).score;
    assert.ok(
      gl > ll,
      `Expected hiddenGemScore(GEM)=${gl.toFixed(4)} > hiddenGemScore(LEADER)=${ll.toFixed(4)}`
    );
  });
});

// ── Test 2: deriveStarVelocity behaviour ──────────────────────────────────────

describe("deriveStarVelocity", () => {
  it("counts only in-window timestamps when recentStarredAt provided", () => {
    // 70 timestamps over the last 30 days, window = 90 days → all 70 are in-window
    const candidate = { ...GEM };
    const vel = deriveStarVelocity(candidate, { now: NOW, windowDays: 90 });
    // 70 / 90 ≈ 0.778
    assert.ok(vel !== null, "velocity should not be null");
    assert.ok(
      Math.abs(vel - 70 / 90) < 0.01,
      `Expected ~${(70 / 90).toFixed(4)}, got ${vel}`
    );
  });

  it("uses starVelocity field if no recentStarredAt", () => {
    const candidate = {
      stars: null,
      reverseDeps: null,
      sources: [],
      starVelocity: 5.5,
      recentStarredAt: null,
      createdAt: null,
      pushedAt: null,
    };
    const vel = deriveStarVelocity(candidate, { now: NOW });
    assert.strictEqual(vel, 5.5);
  });

  it("falls back to lifetime avg when stars + createdAt present", () => {
    const candidate = {
      stars: 365,
      reverseDeps: null,
      sources: [],
      starVelocity: null,
      recentStarredAt: null,
      createdAt: day(365), // exactly 365 days ago → vel ≈ 1 star/day
      pushedAt: null,
    };
    const vel = deriveStarVelocity(candidate, { now: NOW });
    assert.ok(vel !== null && vel > 0, "lifetime avg should be > 0");
    assert.ok(Math.abs(vel - 1.0) < 0.01, `Expected ~1.0, got ${vel}`);
  });

  it("returns null when all fields are null/absent", () => {
    const candidate = {
      stars: null,
      reverseDeps: null,
      sources: [],
      starVelocity: null,
      recentStarredAt: null,
      createdAt: null,
      pushedAt: null,
    };
    const vel = deriveStarVelocity(candidate, { now: NOW });
    assert.strictEqual(vel, null);
  });
});

// ── Test 3: Range / finite guarantee ─────────────────────────────────────────

describe("range and finite checks with all-null candidate", () => {
  const nullCandidate = {
    stars: null,
    reverseDeps: null,
    sources: [],
    starVelocity: null,
    recentStarredAt: null,
    createdAt: null,
    pushedAt: null,
  };

  it("leaderScore returns finite value in [0,1], no NaN, no throw", () => {
    const result = leaderScore(nullCandidate, { now: NOW });
    assert.ok(
      Number.isFinite(result.score),
      `score must be finite, got ${result.score}`
    );
    assert.ok(result.score >= 0 && result.score <= 1, "score out of [0,1]");
  });

  it("hiddenGemScore returns finite value in [0,1], no NaN, no throw", () => {
    const result = hiddenGemScore(nullCandidate, { now: NOW });
    assert.ok(
      Number.isFinite(result.score),
      `score must be finite, got ${result.score}`
    );
    assert.ok(result.score >= 0 && result.score <= 1, "score out of [0,1]");
  });

  it("scoreCandidate returns finite values in [0,1]", () => {
    const result = scoreCandidate(nullCandidate, { now: NOW });
    assert.ok(Number.isFinite(result.leader_score));
    assert.ok(Number.isFinite(result.hidden_gem_score));
    assert.ok(result.leader_score >= 0 && result.leader_score <= 1);
    assert.ok(result.hidden_gem_score >= 0 && result.hidden_gem_score <= 1);
  });
});

// ── Test 4: Determinism ───────────────────────────────────────────────────────

describe("determinism", () => {
  it("same input + same now → identical output (deep-equal)", () => {
    const candidate = {
      stars: 1200,
      reverseDeps: 450,
      sources: ["keyword", "trending"],
      starVelocity: 3.2,
      recentStarredAt: null,
      createdAt: day(400),
      pushedAt: day(10),
    };
    const r1 = scoreCandidate(candidate, { now: NOW });
    const r2 = scoreCandidate(candidate, { now: NOW });
    assert.deepEqual(r1, r2);
  });
});

// ── Test 5: Popularity discount ───────────────────────────────────────────────

describe("popularity discount", () => {
  it("high-star candidate has STRICTLY LOWER hiddenGemScore than low-star (all else equal)", () => {
    const base = {
      reverseDeps: 500,
      sources: ["keyword", "trending"],
      starVelocity: 2.0,
      recentStarredAt: null,
      createdAt: day(200),
      pushedAt: day(5),
    };
    const lowStar = { ...base, stars: 200 };
    const highStar = { ...base, stars: 200_000 };

    const gemLow = hiddenGemScore(lowStar, { now: NOW }).score;
    const gemHigh = hiddenGemScore(highStar, { now: NOW }).score;

    assert.ok(
      gemLow > gemHigh,
      `Expected hiddenGemScore(stars=200)=${gemLow.toFixed(4)} > hiddenGemScore(stars=200000)=${gemHigh.toFixed(4)}`
    );
  });
});
