// tools/sota-discovery/lib/discovery/shared.mjs
// sca-v22 DISCOVERY plane — shared Candidate vocabulary + dedup/merge.
// Design: docs/architecture/W384-RESEARCH-ARCH-V22/DESIGN.md §1 (STORM multi-facet fan-out;
// union+dedup by owner/name; track which source(s) surfaced each repo; curated-list
// membership = positive signal, NEVER a disqualifier).
//
// This is the ONE place that defines the Candidate record shape, so the facet retrievers
// (facets.mjs), the dual scorer (discovery/score.mjs) and the orchestrator (discover.mjs)
// all agree on field names. Pure + network-free (testable without a token).

export const DISCOVERY_SCHEMA = "sca-v22-discovery";

// The 6 independent facet retrievers (STORM multi-facet fan-out — §1).
export const FACET_IDS = Object.freeze({
  KEYWORD: "keyword-topic", // (1) keyword/topic search
  REVERSE_DEP: "reverse-dependency", // (2) reverse-dependency centrality (deps.dev/libraries.io)
  AWESOME_LIST: "awesome-list", // (3) awesome-list mining (curated quality pre-filter)
  PAPER_LINKED: "paper-linked", // (4) paper-linked (HF/PapersWithCode)
  TRENDING: "trending-velocity", // (5) trending / star-velocity
  ALTERNATIVES: "named-anchor-alternatives", // (6) "alternatives-of" expansion from anchor READMEs
});
export const ALL_FACETS = Object.freeze(Object.values(FACET_IDS));

/** @returns {string} canonical "owner/name" key (lowercased, trimmed). */
export function repoKey(owner, name) {
  return `${String(owner).trim().toLowerCase()}/${String(name).trim().toLowerCase()}`;
}

/** @returns {{owner:string|null, name:string|null}} */
export function parseRepoKey(key) {
  const i = String(key).indexOf("/");
  if (i < 0) return { owner: null, name: null };
  return { owner: String(key).slice(0, i), name: String(key).slice(i + 1) };
}

/**
 * Build a normalized Candidate with defaults. owner+name are required.
 * @returns {{
 *   owner:string, name:string, repo:string,
 *   stars:number|null, createdAt:string|null, pushedAt:string|null,
 *   licenseSpdxId:string|null, description:string|null,
 *   reverseDeps:number|null, starVelocity:number|null, recentStarredAt:string[]|null,
 *   sources:string[], curatedListMemberships:string[]
 * }}
 */
export function makeCandidate(fields = {}) {
  const { owner, name } = fields;
  if (!owner || !name) throw new Error("makeCandidate requires owner and name");
  return {
    owner: String(owner),
    name: String(name),
    repo: repoKey(owner, name),
    stars: numOrNull(fields.stars),
    createdAt: strOrNull(fields.createdAt),
    pushedAt: strOrNull(fields.pushedAt),
    licenseSpdxId: strOrNull(fields.licenseSpdxId),
    description: strOrNull(fields.description),
    reverseDeps: numOrNull(fields.reverseDeps),
    starVelocity: numOrNull(fields.starVelocity),
    recentStarredAt: Array.isArray(fields.recentStarredAt) ? fields.recentStarredAt.slice() : null,
    sources: dedupStrings(fields.sources),
    curatedListMemberships: dedupStrings(fields.curatedListMemberships),
  };
}

/**
 * Merge duplicate candidates (same repoKey) surfaced by multiple facets.
 *  - union sources + curatedListMemberships (track which source(s) surfaced each repo);
 *  - take the MAX of numeric SIGNALS (stars/reverseDeps/starVelocity) — a higher reading is
 *    the better-informed one (e.g. one facet had a GITHUB_TOKEN, another didn't);
 *  - keep the first non-null scalar metadata, but the LATER pushedAt.
 * Curated-list membership accumulates as a POSITIVE signal; it NEVER removes a candidate.
 * @param {object[]} list raw or normalized candidates
 * @returns {object[]} deduped, merged candidates
 */
export function mergeCandidates(list) {
  const byKey = new Map();
  for (const raw of list || []) {
    if (!raw || !raw.owner || !raw.name) continue;
    const c = raw.repo ? raw : makeCandidate(raw);
    const prev = byKey.get(c.repo);
    if (!prev) {
      byKey.set(c.repo, {
        ...c,
        sources: dedupStrings(c.sources),
        curatedListMemberships: dedupStrings(c.curatedListMemberships),
        recentStarredAt: c.recentStarredAt ? c.recentStarredAt.slice() : null,
      });
      continue;
    }
    prev.sources = dedupStrings([...prev.sources, ...c.sources]);
    prev.curatedListMemberships = dedupStrings([...prev.curatedListMemberships, ...c.curatedListMemberships]);
    prev.stars = maxOrNull(prev.stars, c.stars);
    prev.reverseDeps = maxOrNull(prev.reverseDeps, c.reverseDeps);
    prev.starVelocity = maxOrNull(prev.starVelocity, c.starVelocity);
    prev.createdAt ||= c.createdAt;
    prev.pushedAt = laterDate(prev.pushedAt, c.pushedAt);
    prev.licenseSpdxId ||= c.licenseSpdxId;
    prev.description ||= c.description;
    if (!prev.recentStarredAt && c.recentStarredAt) prev.recentStarredAt = c.recentStarredAt.slice();
  }
  return [...byKey.values()];
}

// ---- internal helpers -------------------------------------------------------
function numOrNull(v) {
  return typeof v === "number" && Number.isFinite(v) ? v : null;
}
function strOrNull(v) {
  return typeof v === "string" && v.length ? v : null;
}
function dedupStrings(a) {
  return Array.isArray(a) ? [...new Set(a.filter((x) => typeof x === "string" && x.length))] : [];
}
function maxOrNull(a, b) {
  if (a == null) return b;
  if (b == null) return a;
  return Math.max(a, b);
}
function laterDate(a, b) {
  if (!a) return b;
  if (!b) return a;
  return Date.parse(b) > Date.parse(a) ? b : a;
}
