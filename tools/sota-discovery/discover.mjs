#!/usr/bin/env node
// tools/sota-discovery/discover.mjs
// sca-v22 DISCOVERY plane orchestrator (the layer sca-v21 lacked — gap #1).
// Design: docs/architecture/W384-RESEARCH-ARCH-V22/DESIGN.md §1.
//
// Pipeline: fan out the 6 STORM facets (independent retrievers) -> union+dedup by owner/name
// (multi-source-confirmed = leader; single-niche-source = candidate-gem, KEPT) -> dual-score
// (leader_score + hidden_gem_score, never one axis) -> coverage-CHECK (a CHECK, not a guarantee)
// -> emit a candidate-leader set + a coverage-gap report artifact. Reuses lib/http.mjs cache +
// the missingness discipline. Context-protection: the full candidate set is written to a sandbox
// artifact; stdout prints only a compact summary.

import { parseArgs } from "node:util";
import { fileURLToPath } from "node:url";
import { resolve, join } from "node:path";
import { mkdir, writeFile, rename, readFile } from "node:fs/promises";

import { makeFetchJson } from "./lib/http.mjs";
import { DISCOVERY_SCHEMA, mergeCandidates, FACET_IDS, ALL_FACETS } from "./lib/discovery/shared.mjs";
import {
  facetKeyword, facetTrending, facetAlternatives, facetAwesomeList,
} from "./lib/discovery/facets-github.mjs";
import { facetPaperLinked, facetReverseDep } from "./lib/discovery/facets-external.mjs";
import { fetchRecentStargazers } from "./lib/discovery/github-search.mjs";
import { scoreCandidate } from "./lib/discovery/score.mjs";
import { checkCoverage, buildGapReport } from "./lib/discovery/coverage.mjs";

// Facet dispatch order — used as the id fallback if a facet promise rejects outright.
const FACET_ORDER = [
  FACET_IDS.KEYWORD, FACET_IDS.TRENDING, FACET_IDS.AWESOME_LIST,
  FACET_IDS.PAPER_LINKED, FACET_IDS.REVERSE_DEP, FACET_IDS.ALTERNATIVES,
];

function round(n) {
  return Math.round(n * 1000) / 1000;
}

// Merge anchor->alternatives maps (live alternatives-facet output + operator-curated ground truth),
// unioning alternatives per anchor (case-insensitive anchor key).
function mergeAnchorMaps(...maps) {
  const byRepo = new Map();
  for (const list of maps) {
    for (const entry of list || []) {
      if (!entry || !entry.repo) continue;
      const key = entry.repo.toLowerCase();
      const prev = byRepo.get(key) || { repo: entry.repo, alternatives: [] };
      prev.alternatives = [...new Set([...prev.alternatives, ...(entry.alternatives || [])])];
      byRepo.set(key, prev);
    }
  }
  return [...byRepo.values()];
}

// Star-velocity enrichment (codex P1 #2; design §1 — hidden_gem velocity from stargazers{starredAt}).
// Fetching starred timestamps for EVERY candidate is too costly, so enrich only the ranking
// shortlist — the union of the top-K by each axis — then re-score those with precise recent
// velocity. Bounded (<= 2*topK repo queries); honest no-op without a token. Mutates in place.
async function enrichTopCandidatesVelocity(ctx, scored, { now, topK }) {
  if (!scored.length || topK <= 0) return 0;
  const top = (key) => [...scored].sort((a, b) => b[key] - a[key]).slice(0, topK);
  const shortlist = [...new Map([...top("leader_score"), ...top("hidden_gem_score")].map((c) => [c.repo, c])).values()];
  let enriched = 0;
  await Promise.allSettled(shortlist.map(async (c) => {
    const starred = await fetchRecentStargazers(ctx, c.owner, c.name, { first: 100 });
    if (starred && starred.length) {
      c.recentStarredAt = starred;
      const s = scoreCandidate(c, { now });
      c.leader_score = s.leader_score;
      c.hidden_gem_score = s.hidden_gem_score;
      c.velocity_enriched = true;
      enriched++;
    }
  }));
  return enriched;
}

/**
 * Run the full discovery pipeline for a query.
 * @param {{
 *   query:string, topic?:string, anchors?:string[], now?:number, cap?:number, limit?:number,
 *   fetchJson?:Function, noCache?:boolean
 * }} opts
 * @returns {Promise<object>} discovery result (schema sca-v22-discovery)
 */
export async function discover(opts = {}) {
  const { query, topic, anchors = [], curatedAnchors = [], now = Date.now(), cap = 1000, limit = 25 } = opts;
  if (!query) throw new Error("discover requires a query");
  const ctx = { fetchJson: opts.fetchJson || (await makeFetchJson({ noCache: opts.noCache })) };

  // Fan out the 6 independent facets concurrently. allSettled so one failing source never
  // sinks the run (honest per-facet ran/error is recorded for the coverage-CHECK).
  const settled = await Promise.allSettled([
    facetKeyword(ctx, { query, topic, cap }),
    facetTrending(ctx, { query, now, cap }),
    facetAwesomeList(ctx, { query, cap }),
    facetPaperLinked(ctx, { query, now }),
    facetReverseDep(ctx, { query, now }),
    facetAlternatives(ctx, { anchors, now }),
  ]);
  const facetResults = settled.map((s, i) =>
    s.status === "fulfilled"
      ? s.value
      : { facet: FACET_ORDER[i], ran: false, truncated: false, candidates: [], error: String(s.reason).slice(0, 120) });

  // Union + dedup (shared.mergeCandidates: union sources + curated memberships, max numeric signals).
  const merged = mergeCandidates(facetResults.flatMap((f) => f.candidates || []));

  // Dual-score every candidate on BOTH axes (never collapse to one ranking).
  const scored = merged.map((c) => {
    const s = scoreCandidate(c, { now });
    return { ...c, leader_score: s.leader_score, hidden_gem_score: s.hidden_gem_score };
  });

  // Enrich the ranking shortlist with precise recent star-velocity, then re-score (codex P1 #2).
  await enrichTopCandidatesVelocity(ctx, scored, { now, topK: opts.enrichTopK ?? 25 });

  // Coverage-CHECK (every facet ran + no truncation + anchor cross-reference holes).
  const facetRuns = facetResults.map((f) => ({
    facet: f.facet, ran: f.ran, truncated: f.truncated, error: f.error ?? null, slices: f.slices,
  }));
  // Coverage anchors = live alternatives-facet discoveries UNION operator-curated ground truth.
  // Curated alternatives are NOT auto-added as candidates, so an alternative the broad facets
  // never independently surfaced shows up as a genuine hole — this is what gives the check teeth
  // (live-facet alternatives are always present-by-construction; curated ones probe corroboration).
  const anchors_checked = mergeAnchorMaps(facetResults.flatMap((f) => f.anchorAlternatives || []), curatedAnchors);
  const coverage = checkCoverage({
    facetRuns,
    candidates: scored.map((c) => ({ repo: c.repo, sources: c.sources })),
    anchors: anchors_checked,
    expectedFacets: ALL_FACETS,
  });
  const generated_at = new Date(now).toISOString();
  const gap_report = buildGapReport(coverage, { query, generatedAt: generated_at });

  // Two ranked views (never one axis) — leaders by leader_score, gems by hidden_gem_score.
  const leaders = [...scored].sort((a, b) => b.leader_score - a.leader_score);
  const hidden_gems = [...scored].sort((a, b) => b.hidden_gem_score - a.hidden_gem_score);

  return {
    schema: DISCOVERY_SCHEMA,
    query,
    topic: topic || null,
    anchors,
    generated_at,
    facet_summary: facetResults.map((f) => ({
      facet: f.facet, ran: f.ran, truncated: f.truncated, candidates: (f.candidates || []).length, error: f.error ?? null,
    })),
    candidate_count: scored.length,
    leaders: leaders.slice(0, limit),
    hidden_gems: hidden_gems.slice(0, limit),
    coverage,
    gap_report,
    all_candidates: scored,
  };
}

/**
 * Persist the full discovery result atomically (tmp+rename, mirroring ledger.mjs).
 * @returns {Promise<string>} the written artifact path
 */
export async function writeDiscoveryArtifact(result, dir) {
  const outDir = dir || process.env.SCA_DISCOVERY_DIR || ".claude/state/discovery";
  await mkdir(outDir, { recursive: true });
  const slug = (result.query || "discovery").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 40) || "discovery";
  const ts = result.generated_at.replace(/[:.]/g, "-");
  const path = join(outDir, `${slug}-${ts}.json`);
  const tmp = `${path}.tmp`;
  await writeFile(tmp, JSON.stringify(result, null, 2));
  await rename(tmp, path);
  return path;
}

// Compact stdout view (full set lives in the artifact — context-protection).
export function summarize(result) {
  return {
    schema: result.schema,
    query: result.query,
    candidate_count: result.candidate_count,
    facet_summary: result.facet_summary,
    coverage_complete: result.coverage.complete,
    gap_report: result.gap_report,
    top_leaders: result.leaders.slice(0, 10).map((c) => ({
      repo: c.repo, stars: c.stars, leader_score: round(c.leader_score), sources: c.sources,
    })),
    top_gems: result.hidden_gems.slice(0, 10).map((c) => ({
      repo: c.repo, stars: c.stars, hidden_gem_score: round(c.hidden_gem_score), sources: c.sources,
    })),
  };
}

// CLI entry — Windows-safe direct-invocation guard (resolve fileURLToPath; matches sca-evaluate.mjs).
const _invokedDirectly =
  process.argv[1] && resolve(fileURLToPath(import.meta.url)) === resolve(process.argv[1]);
if (_invokedDirectly) {
  const { values } = parseArgs({
    options: {
      query: { type: "string" },
      topic: { type: "string" },
      anchors: { type: "string" }, // comma-separated owner/name list to mine for alternatives
      "curated-file": { type: "string" }, // JSON file: [{repo, alternatives:[...]}] ground-truth for coverage
      limit: { type: "string", default: "25" },
      out: { type: "string" },
      "no-cache": { type: "boolean", default: false },
      "no-artifact": { type: "boolean", default: false },
      "enrich-top-k": { type: "string", default: "25" },
    },
  });
  if (!values.query) {
    console.error("usage: discover.mjs --query <q> [--topic t] [--anchors o/n,o/n] [--curated-file f.json] [--limit N] [--enrich-top-k N] [--out dir] [--no-cache] [--no-artifact]");
    process.exit(2);
  }
  const anchors = values.anchors ? values.anchors.split(",").map((s) => s.trim()).filter(Boolean) : [];
  let curatedAnchors = [];
  if (values["curated-file"]) {
    try {
      const parsed = JSON.parse(await readFile(values["curated-file"], "utf8"));
      if (Array.isArray(parsed)) curatedAnchors = parsed;
    } catch (e) {
      console.error(`[discover] could not read --curated-file: ${String(e).slice(0, 120)}`);
    }
  }
  const result = await discover({
    query: values.query, topic: values.topic, anchors, curatedAnchors,
    limit: Number(values.limit) || 25, noCache: values["no-cache"],
    enrichTopK: Number(values["enrich-top-k"]) || 25,
  });
  if (!values["no-artifact"]) {
    const p = await writeDiscoveryArtifact(result, values.out);
    process.stderr.write(`[discover] artifact: ${p}\n`);
  }
  process.stdout.write(JSON.stringify(summarize(result), null, 2) + "\n");
}
