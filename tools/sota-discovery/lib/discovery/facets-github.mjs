// tools/sota-discovery/lib/discovery/facets-github.mjs
// sca-v22 DISCOVERY plane — the 4 GitHub-API-backed facets (STORM multi-facet fan-out, §1):
//   facetKeyword       — (1) keyword/topic search (partitioned past the 1000 cap)
//   facetTrending      — (5) trending / star-velocity (recent-push window)
//   facetAlternatives  — (6) named-anchor "alternatives-of" expansion (anchor README mining)
//   facetAwesomeList   — (3) awesome-list mining (curated quality pre-filter)
// Each retriever NEVER throws: on no-token / transport error it returns a FacetResult with
// ran:false (honest absence), exactly like the existing fetchers. All four share the
// FacetResult contract consumed by discover.mjs:
//   { facet, ran, truncated, candidates, error, slices?, anchorAlternatives? }
// Design: docs/architecture/W384-RESEARCH-ARCH-V22/DESIGN.md §1.

import { partitionSearch } from "./partitioner.mjs";
import { searchRepositoryCount, searchRepositorySlice } from "./github-search.mjs";
import { extractRepoLinks, extractAlternatives } from "./readme-parse.mjs";
import { FACET_IDS, makeCandidate, repoKey, parseRepoKey } from "./shared.mjs";

const GRAPHQL_URL = "https://api.github.com/graphql";
const DAY_MS = 86_400_000;

function ghToken() {
  return process.env.GITHUB_TOKEN || process.env.GH_TOKEN || null;
}

// Retrieve every partition slice of a GitHub search and fold into one FacetResult.
async function retrieveSlices(ctx, fullQuery, part, facet, cap) {
  const candidates = [];
  const slices = [];
  const errors = [];
  let anyRan = false;
  let anyTruncated = false;
  // Partitioner-known truncated leaves (hit maxDepth / single-day while still over cap) are
  // authoritative — don't rely on re-detecting them from the live retrieval (codex P2 #3).
  const knownTruncated = new Set((part.truncated_slices || []).map((s) => s.qualifier));
  for (const slice of part.slices) {
    const q = slice.qualifier ? `${fullQuery} ${slice.qualifier}` : fullQuery;
    const r = await searchRepositorySlice(ctx, q, { facetId: facet, cap });
    if (r.ran) anyRan = true;
    // A slice is an incomplete-coverage concern if the partitioner already knew it exceeds cap,
    // the live retrieval truncated, OR a RUNNING retrieval errored (codex P1 #1 — a mid-run
    // transport/GraphQL error must NOT silently pass the coverage-CHECK). A no-token slice
    // (ran:false) is NOT truncation — the facet's ran:false already blocks coverage (codex r2 #2).
    const sliceTruncated = r.truncated || knownTruncated.has(slice.qualifier) || (r.ran && !!r.error);
    if (sliceTruncated) anyTruncated = true;
    if (r.ran && r.error) errors.push(`${slice.qualifier || "<base>"}: ${r.error}`);
    for (const c of r.candidates) candidates.push(c);
    slices.push({ qualifier: slice.qualifier, count: slice.count, retrieved: r.retrieved, truncated: sliceTruncated });
  }
  // Honest error propagation: surface a mid-run slice failure even when other slices succeeded.
  const error = !anyRan
    ? "no GITHUB_TOKEN or unreachable"
    : (errors.length ? `slice errors: ${errors.join("; ").slice(0, 200)}` : null);
  return { facet, ran: anyRan, truncated: anyTruncated, candidates, error, slices };
}

// Partition a full query past the 1000 cap, then retrieve all slices.
async function searchPartitioned(ctx, fullQuery, facet, cap) {
  const countFn = (qual) =>
    searchRepositoryCount(ctx, qual ? `${fullQuery} ${qual}` : fullQuery);
  const part = await partitionSearch(fullQuery, countFn, { cap });
  return retrieveSlices(ctx, fullQuery, part, facet, cap);
}

/**
 * Facet 1 — keyword/topic search.
 * @param {object} ctx { fetchJson }
 * @param {{query:string, topic?:string, cap?:number}} params
 * @returns {Promise<object>} FacetResult
 */
export async function facetKeyword(ctx, params = {}) {
  const facet = FACET_IDS.KEYWORD;
  const { query, topic, cap = 1000 } = params;
  if (!query) return { facet, ran: false, truncated: false, candidates: [], error: "no query" };
  const fullQuery = topic ? `${query} topic:${topic}` : query;
  try {
    return await searchPartitioned(ctx, fullQuery, facet, cap);
  } catch (e) {
    return { facet, ran: false, truncated: false, candidates: [], error: String(e).slice(0, 120) };
  }
}

/**
 * Facet 5 — trending / star-velocity (repos pushed within the recent window).
 * Velocity itself is computed later by discovery/score.mjs; this facet just surfaces
 * the recently-active candidate set.
 * @param {{query:string, now?:number, windowDays?:number, cap?:number}} params
 * @returns {Promise<object>} FacetResult
 */
export async function facetTrending(ctx, params = {}) {
  const facet = FACET_IDS.TRENDING;
  const { query, now = Date.now(), windowDays = 90, cap = 1000 } = params;
  if (!query) return { facet, ran: false, truncated: false, candidates: [], error: "no query" };
  const since = new Date(now - windowDays * DAY_MS).toISOString().slice(0, 10);
  const fullQuery = `${query} pushed:>${since}`;
  try {
    return await searchPartitioned(ctx, fullQuery, facet, cap);
  } catch (e) {
    return { facet, ran: false, truncated: false, candidates: [], error: String(e).slice(0, 120) };
  }
}

// Fetch a repo's README text via GraphQL HEAD blobs (tries common filenames). null when
// no token / unreachable / absent — honest absence, never throws.
async function fetchReadme(ctx, owner, name) {
  const tok = ghToken();
  if (!tok || !ctx || typeof ctx.fetchJson !== "function") return null;
  const query = `query($o:String!,$n:String!){repository(owner:$o,name:$n){
    a:object(expression:"HEAD:README.md"){...on Blob{text}}
    b:object(expression:"HEAD:readme.md"){...on Blob{text}}
    c:object(expression:"HEAD:README.rst"){...on Blob{text}}
    d:object(expression:"HEAD:README"){...on Blob{text}}
  }}`;
  try {
    const json = await ctx.fetchJson(GRAPHQL_URL, {
      method: "POST",
      headers: { Authorization: `bearer ${tok}`, "Content-Type": "application/json", "User-Agent": "sca-v22-discovery" },
      body: JSON.stringify({ query, variables: { o: owner, n: name } }),
    });
    const r = json && json.data && json.data.repository;
    if (!r) return null;
    return (r.a && r.a.text) || (r.b && r.b.text) || (r.c && r.c.text) || (r.d && r.d.text) || null;
  } catch {
    return null;
  }
}

/**
 * Facet 6 — named-anchor "alternatives-of" expansion. For each anchor repo, mine its README's
 * Alternatives/Compared-to section for sibling repos. ALSO returns `anchorAlternatives`
 * (anchor -> its README alternatives) which feeds the coverage-CHECK anchor cross-reference.
 * @param {{anchors:string[], now?:number}} params  anchors = ["owner/name", ...]
 * @returns {Promise<object>} FacetResult (+ anchorAlternatives)
 */
export async function facetAlternatives(ctx, params = {}) {
  const facet = FACET_IDS.ALTERNATIVES;
  const { anchors = [] } = params;
  if (!Array.isArray(anchors) || anchors.length === 0) {
    return { facet, ran: false, truncated: false, candidates: [], error: "no anchors", anchorAlternatives: [] };
  }
  const candidates = [];
  const anchorAlternatives = [];
  let anyRan = false;
  for (const anchor of anchors) {
    const { owner, name } = parseRepoKey(anchor);
    if (!owner || !name) continue;
    const selfKey = repoKey(owner, name);
    const text = await fetchReadme(ctx, owner, name);
    if (text == null) {
      anchorAlternatives.push({ repo: selfKey, alternatives: [] });
      continue;
    }
    anyRan = true;
    const alts = extractAlternatives(text).filter((a) => a !== selfKey);
    anchorAlternatives.push({ repo: selfKey, alternatives: alts });
    for (const alt of alts) {
      const { owner: ao, name: an } = parseRepoKey(alt);
      if (ao && an) {
        try {
          candidates.push(makeCandidate({ owner: ao, name: an, sources: [facet] }));
        } catch { /* skip malformed */ }
      }
    }
  }
  return {
    facet,
    ran: anyRan,
    truncated: false,
    candidates,
    error: anyRan ? null : "no anchor READMEs reachable",
    anchorAlternatives,
  };
}

/**
 * Facet 3 — awesome-list mining. Find curated "awesome <topic>" list repos, then harvest the
 * repos each list links to. Curated-list membership is recorded as a POSITIVE signal
 * (curatedListMemberships) — never a disqualifier.
 * @param {{query:string, maxLists?:number, cap?:number}} params
 * @returns {Promise<object>} FacetResult
 */
export async function facetAwesomeList(ctx, params = {}) {
  const facet = FACET_IDS.AWESOME_LIST;
  const { query, maxLists = 5, cap = 1000 } = params;
  if (!query) return { facet, ran: false, truncated: false, candidates: [], error: "no query" };
  const listQuery = `awesome ${query} in:name,description`;
  try {
    const r = await searchRepositorySlice(ctx, listQuery, { facetId: facet, cap: Math.max(1, Math.min(cap, maxLists)) });
    if (!r.ran) return { facet, ran: false, truncated: false, candidates: [], error: "no GITHUB_TOKEN or unreachable" };
    const lists = r.candidates.slice(0, maxLists);
    const candidates = [];
    for (const list of lists) {
      const text = await fetchReadme(ctx, list.owner, list.name);
      if (text == null) continue;
      const listKey = list.repo;
      for (const link of extractRepoLinks(text)) {
        const { owner: o, name: n } = parseRepoKey(link);
        if (o && n && `${o}/${n}`.toLowerCase() !== listKey) {
          try {
            candidates.push(makeCandidate({ owner: o, name: n, sources: [facet], curatedListMemberships: [listKey] }));
          } catch { /* skip malformed */ }
        }
      }
    }
    return { facet, ran: true, truncated: false, candidates, error: null };
  } catch (e) {
    return { facet, ran: false, truncated: false, candidates: [], error: String(e).slice(0, 120) };
  }
}
