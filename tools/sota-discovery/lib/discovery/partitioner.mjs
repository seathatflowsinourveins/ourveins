/**
 * partitioner.mjs — GitHub 1000-result-cap partitioner for sca-v22 discovery
 *
 * Cite: DESIGN.md §1 "GitHub 1000-result-cap partitioner"
 * Prior art: tools/sota-discovery/gh-cascade.sh (left date-recursion as exercise;
 *            this module implements it fully with bounded maxDepth + single-day base case).
 *
 * Design: GitHub search caps results at 1000 per query. Dense queries (e.g. "claude code" ≈ 2204)
 * silently truncate. This module recursively partitions one search into slices each with
 * total_count ≤ cap by (a) disjoint star-buckets, then (b) halving created: date windows
 * within any bucket still over cap. Fully standalone — zero network I/O, zero external imports.
 * The injected countFn is the only side-effecting dependency, making this purely unit-testable.
 *
 * @module partitioner
 */

/**
 * Returns the canonical disjoint star-bucket qualifiers covering all star counts.
 * Ordered high→low; "stars:0" covers repos with zero stars.
 *
 * @returns {string[]} Array of 7 disjoint GitHub qualifier strings.
 */
export function defaultStarBuckets() {
  return [
    'stars:>1000',
    'stars:501..1000',
    'stars:101..500',
    'stars:51..100',
    'stars:11..50',
    'stars:1..10',
    'stars:0',
  ];
}

/**
 * Halves an inclusive ISO date range [lo, hi] (YYYY-MM-DD) at its midpoint.
 * Returns [[lo, mid], [mid+1, hi]] for multi-day spans.
 * Returns [[lo, hi]] (length-1) for single-day spans (cannot split further).
 *
 * UTC-safe: parses as T00:00:00Z, adds days in ms, formats back to YYYY-MM-DD.
 *
 * @param {string} lo - Start date, YYYY-MM-DD (inclusive).
 * @param {string} hi - End date, YYYY-MM-DD (inclusive).
 * @returns {[string, string][]} Length-1 array (single day) or length-2 array (split ranges).
 */
export function halveDateWindow(lo, hi) {
  const loMs = Date.parse(`${lo}T00:00:00Z`);
  const hiMs = Date.parse(`${hi}T00:00:00Z`);
  const ONE_DAY = 86400 * 1000;

  if (loMs >= hiMs) {
    // Single day or inverted: cannot split
    return [[lo, hi]];
  }

  // Midpoint: floor of the average day index
  const midMs = loMs + Math.floor((hiMs - loMs) / ONE_DAY / 2) * ONE_DAY;
  const midPlus1Ms = midMs + ONE_DAY;

  return [
    [lo, msToISODate(midMs)],
    [msToISODate(midPlus1Ms), hi],
  ];
}

/**
 * Converts a UTC ms timestamp to a YYYY-MM-DD string.
 *
 * @param {number} ms - UTC milliseconds.
 * @returns {string} Date in YYYY-MM-DD format.
 */
function msToISODate(ms) {
  return new Date(ms).toISOString().slice(0, 10);
}

/**
 * Partitions a GitHub repository search query into slices each with total_count ≤ cap,
 * by star-buckets then recursive date-window halving.
 *
 * @param {string} baseQuery
 *   Base GitHub search query (e.g. "claude code topic:agent").
 * @param {function(string): Promise<number>} countFn
 *   Injected: receives a qualifier string (e.g. "stars:>1000" or
 *   "stars:0 created:2008-01-01..2016-06-30"), returns the GitHub repositoryCount for
 *   `${baseQuery} ${qualifier}`. Called with "" for the total count probe.
 *   MUST be pure w.r.t. the base query — this module does zero network I/O itself.
 * @param {object} [opts]
 * @param {number}   [opts.cap=1000]         - Max results per slice before truncation.
 * @param {number}   [opts.maxDepth=8]        - Max date-recursion depth.
 * @param {string}   [opts.dateLo="2008-01-01"] - Start of date search space (ISO).
 * @param {string}   [opts.dateHi]            - End of date search space (defaults to today).
 * @param {string[]} [opts.starBuckets]       - Override star buckets (default: defaultStarBuckets()).
 *
 * @returns {Promise<{
 *   slices: Array<{qualifier: string, count: number}>,
 *   total_estimated: number,
 *   partitioned: boolean,
 *   max_depth_hit: boolean,
 *   truncated_slices: Array<{qualifier: string, count: number}>
 * }>}
 */
export async function partitionSearch(baseQuery, countFn, opts = {}) {
  const {
    cap = 1000,
    maxDepth = 8,
    dateLo = '2008-01-01',
    dateHi = msToISODate(Date.now()),
    starBuckets = defaultStarBuckets(),
  } = opts;

  /** @type {Array<{qualifier: string, count: number}>} */
  const slices = [];
  /** @type {Array<{qualifier: string, count: number}>} */
  const truncated_slices = [];
  let max_depth_hit = false;

  // Step 1: total count probe
  const total = await countFn('');

  if (total <= cap) {
    return {
      slices: [{ qualifier: '', count: total }],
      total_estimated: total,
      partitioned: false,
      max_depth_hit: false,
      truncated_slices: [],
    };
  }

  /**
   * Recursively splits a date window for a given star qualifier.
   *
   * @param {string} starQual   - e.g. "stars:0"
   * @param {string} lo         - Date lower bound (YYYY-MM-DD)
   * @param {string} hi         - Date upper bound (YYYY-MM-DD)
   * @param {number} depth      - Current recursion depth (1-indexed)
   */
  async function dateSplit(starQual, lo, hi, depth) {
    const qual = `${starQual} created:${lo}..${hi}`;
    const c = await countFn(qual);

    if (c === 0) return;

    if (c <= cap) {
      slices.push({ qualifier: qual, count: c });
      return;
    }

    // Over cap: check termination conditions
    const halves = halveDateWindow(lo, hi);
    const isSingleDay = lo === hi || halves.length === 1;

    if (depth >= maxDepth || isSingleDay) {
      // Cannot recurse further — record as truncated
      slices.push({ qualifier: qual, count: c });
      truncated_slices.push({ qualifier: qual, count: c });
      max_depth_hit = true;
      return;
    }

    // Recurse into both halves
    const [[loA, hiA], [loB, hiB]] = halves;
    await dateSplit(starQual, loA, hiA, depth + 1);
    await dateSplit(starQual, loB, hiB, depth + 1);
  }

  // Step 2: iterate over star buckets
  for (const sb of starBuckets) {
    const c = await countFn(sb);
    if (c === 0) continue;

    if (c <= cap) {
      slices.push({ qualifier: sb, count: c });
    } else {
      // Needs date recursion
      await dateSplit(sb, dateLo, dateHi, 1);
    }
  }

  return {
    slices,
    total_estimated: total,
    partitioned: true,
    max_depth_hit,
    truncated_slices,
  };
}
