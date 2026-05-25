// tools/sota-discovery/lib/discovery/github-search.mjs
// sca-v22 DISCOVERY plane — GitHub GraphQL repository-search client.
// Design: docs/architecture/W384-RESEARCH-ARCH-V22/DESIGN.md §1.
//
// Two responsibilities, both over ONE injected ctx.fetchJson (http.mjs makeFetchJson — cached):
//   * searchRepositoryCount(ctx, query)  -> repositoryCount (the TRUE total; feeds the partitioner's
//     countFn). GitHub reports the real total here even though it will only SERVE the first 1000.
//   * searchRepositorySlice(ctx, query)  -> up to `cap` (1000) repository nodes via cursor pagination,
//     plus a `truncated` flag when repositoryCount exceeds what we could retrieve.
// Honest-missingness discipline (mirrors github-graphql.mjs): no GITHUB_TOKEN / transport error ->
// count=null, empty slice, never throws. Stars are captured but stay informational-only per contract.

import { makeCandidate } from "./shared.mjs";

const GRAPHQL_URL = "https://api.github.com/graphql";
const DEFAULT_CAP = 1000; // GitHub search hard ceiling
const PAGE_SIZE = 100; // GraphQL search max first:
const MAX_PAGES = 10; // 10 * 100 = 1000 = cap

function token() {
  return process.env.GITHUB_TOKEN || process.env.GH_TOKEN || null;
}

function authHeaders(tok) {
  return {
    Authorization: `bearer ${tok}`,
    "Content-Type": "application/json",
    "User-Agent": "sca-v22-discovery",
  };
}

const COUNT_QUERY = `query($q:String!){ search(query:$q, type:REPOSITORY, first:1){ repositoryCount } }`;

const SLICE_QUERY = `query($q:String!,$after:String){
  search(query:$q, type:REPOSITORY, first:${PAGE_SIZE}, after:$after){
    repositoryCount
    pageInfo{ endCursor hasNextPage }
    nodes{ ... on Repository {
      nameWithOwner
      stargazerCount
      createdAt
      pushedAt
      isArchived
      isFork
      licenseInfo{ spdxId }
      description
    } }
  }
}`;

/**
 * The TRUE total repository count for a search query (used by the partitioner's countFn).
 * @returns {Promise<number|null>} null when not measurable (no token / transport error / bad shape).
 */
export async function searchRepositoryCount(ctx, query) {
  const tok = token();
  if (!tok || !ctx || typeof ctx.fetchJson !== "function") return null;
  try {
    const json = await ctx.fetchJson(GRAPHQL_URL, {
      method: "POST",
      headers: authHeaders(tok),
      body: JSON.stringify({ query: COUNT_QUERY, variables: { q: query } }),
    });
    const n = json && json.data && json.data.search && json.data.search.repositoryCount;
    return typeof n === "number" ? n : null;
  } catch {
    return null; // honest NOT_MEASURABLE
  }
}

/**
 * Convert a GraphQL Repository node to a normalized Candidate tagged with the surfacing facet.
 * @param {object} node search node (nameWithOwner, stargazerCount, ...)
 * @param {string} facetId the facet that surfaced it (-> sources:[facetId])
 * @param {object} [extra] extra Candidate fields (reverseDeps, curatedListMemberships, ...)
 * @returns {object|null} candidate, or null if the node lacks a parseable nameWithOwner
 */
export function nodeToCandidate(node, facetId, extra = {}) {
  if (!node || typeof node.nameWithOwner !== "string") return null;
  const slash = node.nameWithOwner.indexOf("/");
  if (slash <= 0) return null;
  const owner = node.nameWithOwner.slice(0, slash);
  const name = node.nameWithOwner.slice(slash + 1);
  return makeCandidate({
    owner,
    name,
    stars: typeof node.stargazerCount === "number" ? node.stargazerCount : null,
    createdAt: node.createdAt || null,
    pushedAt: node.pushedAt || null,
    licenseSpdxId: (node.licenseInfo && node.licenseInfo.spdxId) || null,
    description: node.description || null,
    sources: [facetId],
    ...extra,
  });
}

/**
 * Retrieve up to `cap` repository nodes for a search query via cursor pagination.
 * @param {object} ctx { fetchJson }
 * @param {string} query full GitHub search query (already includes any partition qualifier)
 * @param {{cap?:number, facetId?:string, includeForks?:boolean, includeArchived?:boolean}} [opts]
 * @returns {Promise<{candidates:object[], retrieved:number, total:number|null, truncated:boolean, ran:boolean, error:string|null}>}
 */
export async function searchRepositorySlice(ctx, query, opts = {}) {
  const cap = opts.cap ?? DEFAULT_CAP;
  const facetId = opts.facetId || "github-search";
  const tok = token();
  if (!tok || !ctx || typeof ctx.fetchJson !== "function") {
    return { candidates: [], retrieved: 0, total: null, truncated: false, ran: false, error: "no GITHUB_TOKEN" };
  }
  const candidates = [];
  let after = null;
  let total = null;
  let pages = 0;
  let errorMsg = null;
  try {
    while (pages < MAX_PAGES) {
      pages++;
      const json = await ctx.fetchJson(GRAPHQL_URL, {
        method: "POST",
        headers: authHeaders(tok),
        body: JSON.stringify({ query: SLICE_QUERY, variables: { q: query, after } }),
      });
      // A GraphQL 200 carrying an `errors` array (rate-limit on a field, NOT_FOUND, ...) or a
      // missing search shape is a FAILED retrieval, NOT an empty one — surface it so the
      // coverage-CHECK never treats a bad-shape response as a complete slice (codex r2 #1).
      if (json && Array.isArray(json.errors) && json.errors.length) {
        errorMsg = `graphql errors: ${json.errors.map((e) => (e && (e.message || e.type)) || "error").join("; ").slice(0, 120)}`;
        break;
      }
      const search = json && json.data && json.data.search;
      if (!search) {
        errorMsg = "missing data.search in GraphQL response";
        break;
      }
      if (total == null && typeof search.repositoryCount === "number") total = search.repositoryCount;
      for (const node of search.nodes || []) {
        if (!opts.includeForks && node && node.isFork) continue;
        if (!opts.includeArchived && node && node.isArchived) continue;
        const c = nodeToCandidate(node, facetId);
        if (c) candidates.push(c);
        if (candidates.length >= cap) break;
      }
      const pageInfo = search.pageInfo || {};
      if (candidates.length >= cap || !pageInfo.hasNextPage || !pageInfo.endCursor) break;
      after = pageInfo.endCursor;
    }
  } catch (e) {
    return { candidates, retrieved: candidates.length, total, truncated: false, ran: true, error: String(e).slice(0, 120) };
  }
  // truncated: the query had more results than we could retrieve under the cap.
  const truncated = total != null && total > candidates.length && candidates.length >= cap;
  return { candidates, retrieved: candidates.length, total, truncated, ran: true, error: errorMsg };
}

/**
 * Fetch the most-recent stargazer timestamps for ONE repo, for precise star-velocity
 * (design §1: hidden_gem velocity from GraphQL stargazers{starredAt}). Newest-first.
 * Bounded to `first` (<=100) — the orchestrator only enriches its ranking shortlist, never
 * every candidate. Honest absence: null on no-token / transport error / bad shape.
 * @param {object} ctx { fetchJson }
 * @param {string} owner
 * @param {string} name
 * @param {{first?:number}} [opts]
 * @returns {Promise<string[]|null>} ISO starredAt strings (newest first), [] if none, null if N/A
 */
export async function fetchRecentStargazers(ctx, owner, name, opts = {}) {
  const first = Math.min(100, Math.max(1, opts.first ?? 100));
  const tok = token();
  if (!tok || !ctx || typeof ctx.fetchJson !== "function") return null;
  const query = `query($o:String!,$n:String!,$first:Int!){
    repository(owner:$o,name:$n){
      stargazers(first:$first, orderBy:{field:STARRED_AT, direction:DESC}){ edges{ starredAt } }
    }
  }`;
  try {
    const json = await ctx.fetchJson(GRAPHQL_URL, {
      method: "POST",
      headers: authHeaders(tok),
      body: JSON.stringify({ query, variables: { o: owner, n: name, first } }),
    });
    const sg = json && json.data && json.data.repository && json.data.repository.stargazers;
    const edges = sg && sg.edges;
    if (!Array.isArray(edges)) return null;
    return edges.map((e) => e && e.starredAt).filter((s) => typeof s === "string");
  } catch {
    return null;
  }
}

export const _internal = { GRAPHQL_URL, DEFAULT_CAP, PAGE_SIZE, MAX_PAGES };
