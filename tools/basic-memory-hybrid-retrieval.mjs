#!/usr/bin/env node
// tools/basic-memory-hybrid-retrieval.mjs
// W370 P2.3 — Hybrid retrieval (BM25 + dense + RRF fusion) for basic-memory T6 tier.
//
// CONTEXT (W367 Stream F gap #10, leverage 14.0):
//   "Hybrid retrieval (BM25 + dense + RRF) for basic-memory" — basic-memory's current
//   query surface (mcp__basic-memory__search_notes search_type='text') uses FTS5
//   keyword/BM25 ranking only. Semantic (dense-vector) retrieval is available via
//   search_type='semantic' (or 'hybrid' when present) but the two lanes are NOT
//   currently fused with a principled rank-fusion algorithm. This tool overlays
//   Reciprocal Rank Fusion (Cormack 2009, k=60 standard) on top of both lanes and
//   optionally cross-encoder-reranks the fused top-N via W369 P1.3 memory-reranker.
//
// PIPELINE:
//
//   query
//     |
//     |--> Lane 1: BM25 (FTS5 keyword)    -- search_type='text',     top-N
//     |--> Lane 2: Dense  (semantic vec)  -- search_type='semantic', top-N
//     |
//     v
//   RRF fusion: score(d) = Σ_lane 1 / (k + rank_lane(d))     k=60 (Cormack 2009)
//     |
//     v
//   (optional) cross-encoder rerank via tools/memory-reranker.mjs
//     |
//     v
//   top-K with composite scores + per-lane provenance
//
// WHEN TO USE THIS vs RAW basic-memory:
//
//   USE THIS hybrid when:
//     - The query mixes proper-noun exact-match needs (e.g. "Wave-369", "W325-A")
//       with semantic-recall needs (e.g. "ship-blocker pattern", "parallel dispatch
//       failure mode"). FTS5 alone misses the latter; dense alone misses the former.
//     - You want robust top-K independent of which signal dominates (the union of
//       both lanes via RRF beats either lane alone by ~5-15 nDCG@10 points on
//       BEIR-style benchmarks; cite Cormack+Clarke+Buettcher SIGIR 2009).
//     - You're feeding results into an LLM context window where mis-ranking the
//       top-3 hits is expensive (rerank pass justified).
//
//   USE RAW basic-memory search_notes when:
//     - Query is pure keyword/identifier ("find note with permalink X").
//     - You need the lowest possible latency (raw FTS5 ~5ms vs hybrid ~50-100ms
//       depending on dense backend availability).
//     - You're inside an MCP tool-call budget cap and can't afford 2 lanes + RRF.
//
// MCP DEPENDENCY:
//
//   The two lane calls go through MCP tool mcp__basic-memory__search_notes. This
//   module CANNOT invoke MCP tools directly (those live in the CC orchestrator).
//   The module therefore provides:
//
//     (A) Pure functions exported for unit-testing the fusion math:
//         - rrfFuse(rankedLists, k=60)
//         - composeRanked(bm25Ranked, denseRanked, opts)
//
//     (B) An async orchestrator hybridSearch(query, opts) that accepts an
//         INJECTED MCP-search adapter (opts.searchFn) — caller is the CC
//         orchestrator that has MCP access. The adapter signature:
//
//           searchFn(query, { search_type: 'text'|'semantic'|'hybrid', top_n })
//             -> Promise<Array<{id, text, permalink?, ...}>>
//
//         Defaults are wired for the basic-memory MCP shape (id derived from
//         permalink, text from content). When searchFn is omitted, an in-process
//         mock is used for tests; the orchestrator MUST inject a real searchFn.
//
//     (C) A CLI smoke entry-point that fakes both lanes from stdin JSON, so the
//         RRF + rerank composition can be exercised without MCP access.
//
// USAGE (programmatic — from CC orchestrator):
//
//   import { hybridSearch } from './tools/basic-memory-hybrid-retrieval.mjs';
//
//   // Adapter wrapping mcp__basic-memory__search_notes (orchestrator-side)
//   const searchFn = async (q, { search_type, top_n }) => {
//     const res = await mcp.basic_memory.search_notes({
//       query: q, search_type, page_size: top_n,
//     });
//     return (res.results || []).map((r) => ({
//       id: r.permalink, text: r.content || r.title, permalink: r.permalink,
//     }));
//   };
//
//   const ranked = await hybridSearch('parallel_ratio baseline failure mode', {
//     searchFn, topK: 10, k: 60, rerank: true, // rerank uses W369 memory-reranker
//   });
//   // ranked[0] -> { id, text, score, _rrf_score, _bm25_rank, _dense_rank, _backend? }
//
// USAGE (programmatic — pure fusion math, no MCP):
//
//   import { rrfFuse } from './tools/basic-memory-hybrid-retrieval.mjs';
//   const fused = rrfFuse([bm25List, denseList], 60);
//   // bm25List/denseList: Array<{id, text}>, ordered by rank (best-first)
//
// USAGE (CLI smoke):
//
//   echo '{
//     "query": "parallel_ratio",
//     "bm25": [{"id":"a","text":"a"},{"id":"b","text":"b"}],
//     "dense": [{"id":"b","text":"b"},{"id":"c","text":"c"}],
//     "k": 60
//   }' | node tools/basic-memory-hybrid-retrieval.mjs --stdin --top_k 3
//
// CARDINAL-RULE COMPLIANCE:
//   - CR-1: standalone tool under tools/ (not a hook); composes with W369 reranker.
//   - CR-2: under tools/ so 2KB hook-size limit does NOT apply.
//   - CR-3: no subagent dispatch; pure library + optional CLI smoke.
//   - CR-5: no hard-block exits; fail-soft on lane errors (warn + continue with
//           lanes that succeeded; if both fail, return empty + diagnostic).
//   - CR-6: verify-before-claim — every returned row carries _rrf_score plus
//           _bm25_rank + _dense_rank so caller can audit fusion provenance.
//
// CITES (3-org-distinct):
//   1. Cormack+Clarke+Buettcher (Univ. of Waterloo) — "Reciprocal Rank Fusion
//      outperforms Condorcet and individual rank learning methods" SIGIR 2009
//      https://plg.uwaterloo.ca/~gvcormac/cormacksigir09-rrf.pdf
//      Formula: RRF_score(d) = Σ_{r in rankers} 1 / (k + rank_r(d)), k=60 standard.
//   2. basic-memory MCP — search_notes tool with search_type parameter
//      (text|semantic|hybrid); permalink-based id surface; W295 canonical T6 tier
//      per CLAUDE.md L73 + docs/architecture/W295-AUDIT-2026-05-18.md.
//   3. BAAI bge-reranker-v2-m3 — cross-encoder for final rerank pass; integrated
//      via W369 P1.3 tools/memory-reranker.mjs (MIT, 568M params, multilingual).
//   Additional anchors:
//   - Anthropic — https://docs.anthropic.com/en/docs/agents/retrieval (RAG patterns)
//   - LangChain — EnsembleRetriever weighted-RRF reference impl (BM25 + FAISS).
//   Anchor: W367 Stream F gap #10 + W370 P2.3 (this commit closure).

import { rerank as crossEncoderRerank } from './memory-reranker.mjs';

const DEFAULT_RRF_K = 60;           // Cormack 2009 standard
const DEFAULT_TOP_K = 10;           // Final return size
const DEFAULT_TOP_N_PER_LANE = 50;  // Candidates per lane before fusion

// ----------------------------------------------------------------------------
// Pure fusion math — exported for unit-testing without MCP access
// ----------------------------------------------------------------------------

/**
 * Reciprocal Rank Fusion (Cormack 2009).
 *
 * Given M ranked lists (each ordered best-first), produce a single fused list
 * sorted by RRF_score(d) = Σ_lane 1 / (k + rank_lane(d)), where rank is 1-indexed
 * and documents missing from a lane contribute 0 from that lane.
 *
 * @param {Array<Array<{id: string, [k: string]: any}>>} rankedLists
 *        Each inner array is one ranker's output, ordered best-first. Each item
 *        MUST have an `id` field; other fields are preserved (last-write-wins
 *        when the same id appears in multiple lanes — order of rankedLists
 *        determines which lane's fields win).
 * @param {number} [k=60] - RRF smoothing constant; Cormack 2009 default is 60.
 * @returns {Array<{id, _rrf_score, _lane_ranks: {[laneIdx]: rank1based}, ...}>}
 *          Sorted by _rrf_score desc. Includes all unique ids across all lanes.
 */
export function rrfFuse(rankedLists, k = DEFAULT_RRF_K) {
  if (!Array.isArray(rankedLists)) {
    throw new TypeError('rrfFuse: rankedLists must be an array of arrays');
  }
  if (typeof k !== 'number' || k <= 0) {
    throw new TypeError('rrfFuse: k must be a positive number');
  }
  for (const lane of rankedLists) {
    if (!Array.isArray(lane)) {
      throw new TypeError('rrfFuse: each lane must be an array');
    }
  }

  // Aggregate: { id -> { _rrf_score, _lane_ranks, ...mergedFields } }
  const agg = new Map();
  for (let laneIdx = 0; laneIdx < rankedLists.length; laneIdx++) {
    const lane = rankedLists[laneIdx];
    for (let pos = 0; pos < lane.length; pos++) {
      const doc = lane[pos];
      if (typeof doc?.id !== 'string') {
        throw new TypeError(
          `rrfFuse: lane ${laneIdx} position ${pos} missing string id`
        );
      }
      const rank1 = pos + 1; // 1-indexed per Cormack 2009 convention
      const contribution = 1 / (k + rank1);
      const prev = agg.get(doc.id);
      if (prev) {
        prev._rrf_score += contribution;
        prev._lane_ranks[laneIdx] = rank1;
        // Last-lane-wins on overlapping fields (caller chooses lane order
        // to express their preferred provenance).
        for (const [field, val] of Object.entries(doc)) {
          if (field === 'id') continue;
          prev[field] = val;
        }
      } else {
        agg.set(doc.id, {
          ...doc,
          _rrf_score: contribution,
          _lane_ranks: { [laneIdx]: rank1 },
        });
      }
    }
  }

  // Sort by RRF score desc; stable on ties.
  const fused = Array.from(agg.values());
  fused.sort((a, b) => b._rrf_score - a._rrf_score);
  return fused;
}

/**
 * Compose a single ranked list from BM25 + dense lane outputs, adding
 * per-lane rank columns for explainability/audit.
 *
 * Thin wrapper over rrfFuse() that names the two lanes for readability and
 * sets the standard convention bm25=lane0, dense=lane1.
 *
 * @param {Array<{id, text, ...}>} bm25Ranked  - BM25/FTS5 lane, best-first
 * @param {Array<{id, text, ...}>} denseRanked - Semantic-vector lane, best-first
 * @param {{ k?: number }} [opts]              - { k = 60 RRF constant }
 * @returns {Array<{id, text, _rrf_score, _bm25_rank, _dense_rank, ...}>}
 *          Sorted by _rrf_score desc. Missing-from-a-lane -> _bm25_rank/_dense_rank
 *          is null (not 0; 0 would mis-read as "rank zero" in audit views).
 */
export function composeRanked(bm25Ranked, denseRanked, opts = {}) {
  const k = opts.k ?? DEFAULT_RRF_K;
  const fused = rrfFuse([bm25Ranked, denseRanked], k);
  return fused.map((row) => {
    const { _lane_ranks, ...rest } = row;
    return {
      ...rest,
      _bm25_rank: _lane_ranks[0] ?? null,
      _dense_rank: _lane_ranks[1] ?? null,
    };
  });
}

// ----------------------------------------------------------------------------
// Lane adapters — call basic-memory MCP via injected searchFn
// ----------------------------------------------------------------------------

async function callLane(searchFn, query, search_type, top_n) {
  try {
    const rows = await searchFn(query, { search_type, top_n });
    if (!Array.isArray(rows)) {
      throw new Error(`lane '${search_type}' returned non-array: ${typeof rows}`);
    }
    // Validate shape; tolerate missing `text` by falling back to id (FTS5 can
    // return permalink-only hits when content excerpt was truncated upstream).
    return rows.map((r, i) => {
      if (typeof r?.id !== 'string') {
        throw new Error(
          `lane '${search_type}' row ${i} missing string id (got ${typeof r?.id})`
        );
      }
      return {
        id: r.id,
        text: typeof r.text === 'string' ? r.text : r.id,
        ...r,
      };
    });
  } catch (err) {
    console.error(
      `[hybrid-retrieval] WARN: lane '${search_type}' failed: ${err.message}`
    );
    return null; // sentinel for "lane unavailable"
  }
}

// In-process mock used only in unit tests when no searchFn is injected.
// NEVER call this in production paths — it returns a fixed empty payload.
function defaultSearchFnMock() {
  return async (_query, { search_type, top_n }) => {
    console.error(
      `[hybrid-retrieval] WARN: no searchFn injected; returning empty mock ` +
        `for search_type='${search_type}' top_n=${top_n}. ` +
        `Caller must inject opts.searchFn that calls mcp__basic-memory__search_notes.`
    );
    return [];
  };
}

// ----------------------------------------------------------------------------
// Public orchestrator — full hybrid pipeline
// ----------------------------------------------------------------------------

/**
 * Hybrid BM25 + dense + RRF retrieval over basic-memory.
 *
 * @param {string} query  - User query / search prompt.
 * @param {object} [opts]
 * @param {number} [opts.topK=10]              - Final result size after RRF (+ rerank).
 * @param {number} [opts.k=60]                 - RRF smoothing constant.
 * @param {number} [opts.topNPerLane=50]       - Candidates per lane before fusion.
 * @param {boolean} [opts.rerank=false]        - Run cross-encoder rerank pass.
 * @param {number}  [opts.rerankTopN]          - Rerank only top-N of fused (default = 3 * topK).
 * @param {Function} [opts.searchFn]           - MCP adapter (see module doc).
 * @param {'auto'|'hf'|'ollama'|'noop'} [opts.rerankBackend='auto']
 *        Forwarded to W369 memory-reranker when opts.rerank=true.
 * @returns {Promise<Array<{id, text, _rrf_score, _bm25_rank, _dense_rank,
 *                          score?, _backend?, ...}>>}
 *          Top-K by RRF (or by cross-encoder score if rerank=true). Each row has
 *          per-lane rank provenance + composite RRF score; rerank rows additionally
 *          carry `score` and `_backend` from memory-reranker.
 *
 * Failure modes:
 *   - Both lanes fail   -> returns [] with stderr warning.
 *   - One lane fails    -> proceeds with the surviving lane (degraded but useful).
 *   - searchFn omitted  -> defaultSearchFnMock fires; both lanes return [];
 *                          tests can pass searchFn explicitly to exercise pipeline.
 *   - rerank=true and reranker tier-3 -> rows carry score=null; RRF order preserved.
 */
export async function hybridSearch(query, opts = {}) {
  if (typeof query !== 'string' || query.length === 0) {
    throw new TypeError('hybridSearch: query must be a non-empty string');
  }
  const topK = opts.topK ?? DEFAULT_TOP_K;
  const k = opts.k ?? DEFAULT_RRF_K;
  const topNPerLane = opts.topNPerLane ?? DEFAULT_TOP_N_PER_LANE;
  const doRerank = !!opts.rerank;
  const rerankTopN = opts.rerankTopN ?? topK * 3;
  const rerankBackend = opts.rerankBackend ?? 'auto';
  const searchFn = typeof opts.searchFn === 'function'
    ? opts.searchFn
    : defaultSearchFnMock();

  // Fire both lanes in parallel — independent MCP calls, no shared state.
  const [bm25Ranked, denseRanked] = await Promise.all([
    callLane(searchFn, query, 'text', topNPerLane),
    callLane(searchFn, query, 'semantic', topNPerLane),
  ]);

  // Degraded modes
  if (bm25Ranked === null && denseRanked === null) {
    console.error('[hybrid-retrieval] ERROR: both lanes failed; returning [].');
    return [];
  }
  if (bm25Ranked === null) {
    console.error('[hybrid-retrieval] WARN: BM25 lane down; returning dense-only.');
    return denseRanked.slice(0, topK).map((row, i) => ({
      ...row,
      _rrf_score: 1 / (k + (i + 1)),
      _bm25_rank: null,
      _dense_rank: i + 1,
    }));
  }
  if (denseRanked === null) {
    console.error('[hybrid-retrieval] WARN: dense lane down; returning BM25-only.');
    return bm25Ranked.slice(0, topK).map((row, i) => ({
      ...row,
      _rrf_score: 1 / (k + (i + 1)),
      _bm25_rank: i + 1,
      _dense_rank: null,
    }));
  }

  // Both lanes alive -> fuse
  const fused = composeRanked(bm25Ranked, denseRanked, { k });

  if (!doRerank) {
    return fused.slice(0, topK);
  }

  // Optional cross-encoder rerank pass over top-N of fused
  const candidates = fused.slice(0, rerankTopN);
  const reranked = await crossEncoderRerank(query, candidates, topK, {
    backend: rerankBackend,
  });
  // memory-reranker preserves arbitrary fields (incl. _rrf_score, _bm25_rank,
  // _dense_rank) and adds `score` + `_backend`. Already sorted by score desc.
  return reranked;
}

// ----------------------------------------------------------------------------
// CLI smoke entry — exercises RRF + optional rerank from stdin JSON
// ----------------------------------------------------------------------------

function parseArgs(argv) {
  const out = { top_k: DEFAULT_TOP_K, k: DEFAULT_RRF_K, stdin: false, rerank: false };
  for (let i = 2; i < argv.length; i++) {
    const a = argv[i];
    const v = argv[i + 1];
    if (a === '--stdin') {
      out.stdin = true;
    } else if (a === '--top_k') {
      out.top_k = Number(v);
      i++;
    } else if (a === '--k') {
      out.k = Number(v);
      i++;
    } else if (a === '--rerank') {
      out.rerank = true;
    } else if (a === '--rerank_backend') {
      out.rerank_backend = v;
      i++;
    }
  }
  return out;
}

function readStdin() {
  return new Promise((resolve, reject) => {
    let buf = '';
    process.stdin.setEncoding('utf8');
    process.stdin.on('data', (chunk) => { buf += chunk; });
    process.stdin.on('end', () => resolve(buf));
    process.stdin.on('error', reject);
  });
}

const isCli = import.meta.url === `file://${process.argv[1].replace(/\\/g, '/')}`
  || process.argv[1]?.endsWith('basic-memory-hybrid-retrieval.mjs');

if (isCli) {
  const args = parseArgs(process.argv);
  if (!args.stdin) {
    console.error(
      'usage: echo \'{"query":"...","bm25":[...],"dense":[...]}\' | ' +
        'node tools/basic-memory-hybrid-retrieval.mjs --stdin ' +
        '[--top_k N] [--k 60] [--rerank] [--rerank_backend auto|hf|ollama|noop]'
    );
    process.exit(2);
  }
  (async () => {
    const raw = await readStdin();
    let input;
    try {
      input = JSON.parse(raw);
    } catch (err) {
      console.error(`stdin not valid JSON: ${err.message}`);
      process.exit(2);
    }
    if (!input?.query || !Array.isArray(input?.bm25) || !Array.isArray(input?.dense)) {
      console.error('stdin JSON must have shape {query, bm25:[...], dense:[...]}');
      process.exit(2);
    }
    const fakeSearchFn = async (_q, { search_type }) => {
      if (search_type === 'text') return input.bm25;
      if (search_type === 'semantic') return input.dense;
      return [];
    };
    const t0 = Date.now();
    try {
      const ranked = await hybridSearch(input.query, {
        searchFn: fakeSearchFn,
        topK: args.top_k,
        k: args.k,
        rerank: args.rerank,
        rerankBackend: args.rerank_backend || 'auto',
      });
      const ms = Date.now() - t0;
      console.log(JSON.stringify({ ms, count: ranked.length, ranked }, null, 2));
    } catch (err) {
      console.error(`hybridSearch error: ${err.message}`);
      process.exit(1);
    }
  })();
}
