/**
 * score.mjs — Dual discovery score for sca-v22 SOTA-repo ranking
 *
 * Design source: DESIGN.md §1 ("Dual discovery score")
 *
 * Two orthogonal axes:
 *   - leaderScore:   surfaces established leaders (high stars + high reverse-deps + cross-source)
 *   - hiddenGemScore: surfaces fast-rising / high-quality-but-low-star repos
 *
 * EXACT hidden_gem formula:
 *   velocity = deriveStarVelocity(candidate, {now})   (null → 0)
 *   base     = 0.45·logNorm(reverseDeps, 3)
 *            + 0.35·logNorm(velocity·30, 2)
 *            + 0.20·recencyScore(pushedAt, now)
 *   discount = 1 - 0.5·logNorm(stars, 5)
 *   score    = base · discount
 *
 * All time flows through opts.now so callers (and tests) are deterministic.
 * No external dependencies; no project imports.
 */

// ── Pure math helpers ─────────────────────────────────────────────────────────

/**
 * logNorm — normalize a value on a log10 scale, clamped to [0,1].
 * @param {number|null|undefined} x
 * @param {number} k  — log10(1+x_max) where you want output ≈ 1
 * @returns {number}  — always in [0,1], never NaN
 */
function logNorm(x, k) {
  if (x == null || !Number.isFinite(x)) return 0;
  return Math.min(1, Math.log10(1 + Math.max(0, x)) / k);
}

/**
 * recencyScore — 1 when pushed today, 0 when pushed ≥365 days ago.
 * @param {string|null|undefined} pushedAt  — ISO date string
 * @param {number} now  — epoch ms
 * @returns {number}
 */
function recencyScore(pushedAt, now) {
  if (pushedAt == null) return 0;
  const ms = Date.parse(pushedAt);
  if (!Number.isFinite(ms)) return 0;
  const daysSincePush = (now - ms) / 86_400_000;
  return Math.max(0, 1 - daysSincePush / 365);
}

/**
 * crossSource — fraction of 3 sources present; 1.0 if ≥3 sources.
 * @param {object} candidate
 * @returns {number}
 */
function crossSource(candidate) {
  return Math.min(1, (candidate?.sources?.length || 0) / 3);
}

// ── Exported functions ────────────────────────────────────────────────────────

/**
 * Derive an estimated star velocity (stars per day) for a candidate.
 *
 * Priority order:
 *   1. recentStarredAt is a non-empty array → count timestamps within
 *      `windowDays` of `now`, divide by `windowDays`.
 *   2. starVelocity is a number → return it directly.
 *   3. stars + createdAt both present → lifetime average (stars / ageDays,
 *      ageDays ≥ 1).
 *   4. Otherwise → null.
 *
 * @param {object} candidate
 * @param {{ now?: number, windowDays?: number }} [opts]
 * @returns {number|null}
 */
export function deriveStarVelocity(candidate, opts = {}) {
  const now = opts.now ?? Date.now();
  const windowDays = opts.windowDays ?? 90;

  // 1. recentStarredAt array
  if (Array.isArray(candidate.recentStarredAt) && candidate.recentStarredAt.length > 0) {
    const windowMs = windowDays * 86_400_000;
    const cutoff = now - windowMs;
    let count = 0;
    for (const ts of candidate.recentStarredAt) {
      const t = typeof ts === "string" ? Date.parse(ts) : Number(ts);
      if (Number.isFinite(t) && t >= cutoff && t <= now) count++;
    }
    return count / windowDays;
  }

  // 2. starVelocity field
  if (typeof candidate.starVelocity === "number" && Number.isFinite(candidate.starVelocity)) {
    return candidate.starVelocity;
  }

  // 3. Lifetime average from stars + createdAt
  if (
    typeof candidate.stars === "number" &&
    Number.isFinite(candidate.stars) &&
    candidate.createdAt != null
  ) {
    const createdMs = Date.parse(candidate.createdAt);
    if (Number.isFinite(createdMs)) {
      const ageDays = Math.max(1, (now - createdMs) / 86_400_000);
      return candidate.stars / ageDays;
    }
  }

  return null;
}

/**
 * Compute the leader score for a candidate.
 *
 * Formula: 0.4·logNorm(stars,5) + 0.4·logNorm(reverseDeps,4) + 0.2·crossSource
 *
 * @param {object} candidate
 * @param {{ now?: number }} [opts]
 * @returns {{ score: number, components: object }}
 */
export function leaderScore(candidate, opts = {}) {
  const termStars       = 0.4 * logNorm(candidate.stars, 5);
  const termReverseDeps = 0.4 * logNorm(candidate.reverseDeps, 4);
  const termCrossSource = 0.2 * crossSource(candidate);

  const score = Math.min(1, Math.max(0, termStars + termReverseDeps + termCrossSource));

  return {
    score,
    components: {
      term_stars:        termStars,
      term_reverse_deps: termReverseDeps,
      term_cross_source: termCrossSource,
    },
  };
}

/**
 * Compute the hidden gem score for a candidate.
 *
 * Rewards real usage + fast rise + recency; DISCOUNTS raw popularity so
 * mega-star repos do not dominate this axis.
 *
 * Formula (see file header for canonical statement):
 *   velocity = deriveStarVelocity(candidate, {now})  (null → 0)
 *   base     = 0.45·logNorm(reverseDeps, 3)
 *            + 0.35·logNorm(velocity·30, 2)
 *            + 0.20·recencyScore(pushedAt, now)
 *   discount = 1 - 0.5·logNorm(stars, 5)
 *   score    = base · discount
 *
 * @param {object} candidate
 * @param {{ now?: number }} [opts]
 * @returns {{ score: number, components: object }}
 */
export function hiddenGemScore(candidate, opts = {}) {
  const now = opts.now ?? Date.now();

  const velocity = deriveStarVelocity(candidate, { now }) ?? 0;

  const termReverseDeps = 0.45 * logNorm(candidate.reverseDeps, 3);
  const termVelocity    = 0.35 * logNorm(velocity * 30, 2);
  const termRecency     = 0.20 * recencyScore(candidate.pushedAt, now);

  const base            = termReverseDeps + termVelocity + termRecency;
  const discountFactor  = 1 - 0.5 * logNorm(candidate.stars, 5);
  const raw             = base * discountFactor;

  const score = Math.min(1, Math.max(0, raw));

  return {
    score,
    components: {
      base,
      velocity,
      discount_factor:   discountFactor,
      term_reverse_deps: termReverseDeps,
      term_velocity:     termVelocity,
      term_recency:      termRecency,
    },
  };
}

/**
 * Score a candidate on both axes, combining results into a single object.
 *
 * @param {object} candidate
 * @param {{ now?: number }} [opts]
 * @returns {{ leader_score: number, hidden_gem_score: number, components: object }}
 */
export function scoreCandidate(candidate, opts = {}) {
  const now = opts.now ?? Date.now();
  const ls  = leaderScore(candidate, { now });
  const hgs = hiddenGemScore(candidate, { now });

  return {
    leader_score:     ls.score,
    hidden_gem_score: hgs.score,
    components: {
      leader:     ls.components,
      hidden_gem: hgs.components,
    },
  };
}
