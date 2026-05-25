// tools/sota-discovery/lib/discovery/facets-external.mjs
// sca-v22 DISCOVERY plane — external (non-GitHub-search) facets.
// Design: docs/architecture/W384-RESEARCH-ARCH-V22/DESIGN.md §1 (paper-linked + reverse-dependency facets)
//
// Two facets pull candidates from non-GitHub-search sources so discovery
// isn't GitHub-search-only. Both degrade HONESTLY (ran:false) when the
// source is unreachable or query is absent, mirroring the existing fetchers.

import { FACET_IDS, makeCandidate } from "./shared.mjs";

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

/**
 * Parse a GitHub owner+name from any URL string that contains
 * "github.com/<owner>/<repo>". Strips trailing ".git" and "/".
 * Returns {owner, name} or null if not a GitHub URL.
 */
function parseGitHubUrl(url) {
  if (typeof url !== "string") return null;
  // Require "github.com" to be preceded by "://" or "." (subdomain) or start-of-string,
  // so "not-github.com" does NOT match.
  const m = url.match(/(?:^|[:/])github\.com\/([^/\s]+)\/([^/\s#?]+)/);
  if (!m) return null;
  const owner = m[1].trim();
  let name = m[2].trim().replace(/\.git$/, "").replace(/\/$/, "");
  if (!owner || !name) return null;
  return { owner, name };
}

/**
 * Build a FacetResult shell with defaults.
 * @param {string} facet
 * @returns {{facet:string, ran:boolean, truncated:boolean, candidates:object[], error:string|null}}
 */
function makeResult(facet, overrides = {}) {
  return {
    facet,
    ran: false,
    truncated: false,
    candidates: [],
    error: null,
    ...overrides,
  };
}

/** Stringify an error to ≤120 chars. */
function errStr(e) {
  return String(e?.message ?? e).slice(0, 120);
}

// ---------------------------------------------------------------------------
// facetPaperLinked — PapersWithCode API
// ---------------------------------------------------------------------------

/**
 * Facet 4: paper-linked.
 * Fetches repos from PapersWithCode search results for a query term.
 * Degrades honestly (ran:false) on network error or missing query.
 *
 * @param {object} ctx - must expose ctx.fetchJson(url): Promise<any|null>
 * @param {{query?:string, now?:number, limit?:number}} params
 * @returns {Promise<{facet:string, ran:boolean, truncated:boolean, candidates:object[], error:string|null}>}
 */
export async function facetPaperLinked(ctx, params = {}) {
  const { query } = params;

  if (!query) {
    return makeResult(FACET_IDS.PAPER_LINKED);
  }

  const url = `https://paperswithcode.com/api/v1/search/?q=${encodeURIComponent(query)}`;

  let raw;
  try {
    raw = await ctx.fetchJson(url);
  } catch (e) {
    return makeResult(FACET_IDS.PAPER_LINKED, { error: errStr(e) });
  }

  // ran:true regardless of empty/null response (reachable, just empty)
  if (!raw || !Array.isArray(raw.results)) {
    return makeResult(FACET_IDS.PAPER_LINKED, { ran: true });
  }

  const candidates = [];
  for (const result of raw.results) {
    try {
      // Try three URL locations in priority order
      const urlCandidates = [
        result?.repository?.url,
        result?.url,
        result?.repository_url,
      ];

      let parsed = null;
      for (const u of urlCandidates) {
        parsed = parseGitHubUrl(u);
        if (parsed) break;
      }

      if (!parsed) continue;

      const stars = typeof result?.repository?.stars === "number"
        ? result.repository.stars
        : undefined;

      candidates.push(
        makeCandidate({
          owner: parsed.owner,
          name: parsed.name,
          stars,
          sources: [FACET_IDS.PAPER_LINKED],
        })
      );
    } catch {
      // skip malformed entries (e.g. makeCandidate throws for missing owner/name)
    }
  }

  return makeResult(FACET_IDS.PAPER_LINKED, { ran: true, candidates });
}

// ---------------------------------------------------------------------------
// facetReverseDep — ecosyste.ms repositories lookup
// ---------------------------------------------------------------------------

/**
 * Facet 2: reverse-dependency.
 * Fetches repos from ecosyste.ms repositories/lookup for a query term.
 * Skips entries whose host.name is present and NOT "GitHub" (case-insensitive).
 * Degrades honestly (ran:false) on network error or missing query.
 *
 * @param {object} ctx - must expose ctx.fetchJson(url): Promise<any|null>
 * @param {{query?:string, now?:number, limit?:number}} params
 * @returns {Promise<{facet:string, ran:boolean, truncated:boolean, candidates:object[], error:string|null}>}
 */
export async function facetReverseDep(ctx, params = {}) {
  const { query } = params;

  if (!query) {
    return makeResult(FACET_IDS.REVERSE_DEP);
  }

  const url = `https://repos.ecosyste.ms/api/v1/repositories/lookup?q=${encodeURIComponent(query)}`;

  let raw;
  try {
    raw = await ctx.fetchJson(url);
  } catch (e) {
    return makeResult(FACET_IDS.REVERSE_DEP, { error: errStr(e) });
  }

  // null = 404 → reachable, empty
  if (!Array.isArray(raw)) {
    return makeResult(FACET_IDS.REVERSE_DEP, { ran: true });
  }

  const candidates = [];
  for (const entry of raw) {
    try {
      // Skip non-GitHub hosts when host.name is explicitly provided
      const hostName = entry?.host?.name;
      if (typeof hostName === "string" && hostName.toLowerCase() !== "github") {
        continue;
      }

      const fullName = entry?.full_name;
      if (typeof fullName !== "string" || !fullName.includes("/")) continue;

      const slashIdx = fullName.indexOf("/");
      const owner = fullName.slice(0, slashIdx);
      const name = fullName.slice(slashIdx + 1);
      if (!owner || !name) continue;

      const stars = entry?.stargazers_count ?? undefined;
      const reverseDeps =
        entry?.dependent_repos_count ?? entry?.dependents_count ?? undefined;
      const createdAt = entry?.created_at ?? undefined;
      const pushedAt = entry?.pushed_at ?? entry?.updated_at ?? undefined;

      candidates.push(
        makeCandidate({
          owner,
          name,
          stars,
          reverseDeps,
          createdAt,
          pushedAt,
          sources: [FACET_IDS.REVERSE_DEP],
        })
      );
    } catch {
      // skip malformed entries
    }
  }

  return makeResult(FACET_IDS.REVERSE_DEP, { ran: true, candidates });
}
