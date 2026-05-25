// tools/sota-discovery/lib/fetchers/ecosystems.mjs
// D21_reverse_dependents fetcher — second independent source via ecosyste.ms (CLASS-A).
//
// ── CR-6 EVIDENCE (endpoint + field-extraction, cited per DESIGN.md §2) ──
// Design: docs/architecture/W384-RESEARCH-ARCH-V22/DESIGN.md §2 (ecosystems fetcher)
//
// ENDPOINT: GET https://repos.ecosyste.ms/api/v1/hosts/GitHub/repositories/<owner>%2F<name>
//   (ecosyste.ms — free, no-auth, multi-host registry index; star-independent)
//   response (200): flat JSON object with registry metadata.  Key dependent-count fields
//     observed across repos (order of preference, any one is sufficient):
//       dependent_repos_count  — repos that declare a runtime dependency
//       dependents_count       — broader dependent signal (packages + repos)
//       dependent_packages_count — packages only
//     Some responses nest the payload under a top-level "repository" or "package" key;
//     we unwrap one level automatically.
//   response (404): ctx.fetchJson returns null per fetcher contract.
//   other non-2xx or transport error: ctx.fetchJson throws; we catch and degrade honestly.
//
// This file is the SECOND source for D21_reverse_dependents (first: tools/sota-discovery/
// lib/fetchers/depsdev.mjs).  Having two CLASS-A sources for the same dim gives the
// sca-v22 convergence engine a reconcilable conflict for the CONFLICTING missingness path.

import { makeEvidence, MISSINGNESS, SOURCE_CLASS } from "../contract.mjs";

/** ecosyste.ms host-repositories endpoint base. */
const ECOSYSTEMS_BASE = "https://repos.ecosyste.ms/api/v1/hosts/GitHub/repositories";

/**
 * Walk the parsed JSON response (or one level of nesting) looking for a finite
 * reverse-dependent count.  Returns the integer count or null if none found.
 *
 * Priority order: dependent_repos_count > dependents_count > dependent_packages_count.
 * Also handles a response wrapped inside a top-level "repository" or "package" object.
 *
 * @param {unknown} body — parsed JSON from ecosyste.ms
 * @returns {number|null}
 */
function extractCount(body) {
  if (body == null || typeof body !== "object") return null;

  // Try the top-level object first, then unwrap one nesting level if needed.
  for (const obj of [body, body.repository, body.package]) {
    if (obj == null || typeof obj !== "object") continue;
    for (const field of ["dependent_repos_count", "dependents_count", "dependent_packages_count"]) {
      const raw = obj[field];
      if (raw != null) {
        const n = Number(raw);
        if (Number.isFinite(n)) return Math.trunc(n); // coerce to integer
      }
    }
  }
  return null;
}

/**
 * Fetch ecosyste.ms reverse-dependent signal for a GitHub repo.
 *
 * @param {string} owner  GitHub owner (login).
 * @param {string} name   GitHub repo name.
 * @param {{ fetchJson: (url: string) => Promise<unknown> }} ctx
 *   ctx.fetchJson(url) must return parsed JSON on 200, null on 404, throw on other errors.
 * @returns {Promise<{
 *   dims:     { D21_reverse_dependents: number|null },
 *   evidence: { D21_reverse_dependents: import("../contract.mjs").EvidenceAnchor }
 * }>}
 */
export async function fetchEcosystems(owner, name, ctx) {
  const sourceUri = `${ECOSYSTEMS_BASE}/${encodeURIComponent(owner)}%2F${encodeURIComponent(name)}`;

  /** Build a NOT_MEASURABLE result (honest absence — never fabricate 0). */
  function notMeasurable() {
    return {
      dims: { D21_reverse_dependents: null },
      evidence: {
        D21_reverse_dependents: makeEvidence(null, {
          source_class: SOURCE_CLASS.A,
          source_uri: sourceUri,
          missingness: MISSINGNESS.NOT_MEASURABLE,
        }),
      },
    };
  }

  let body;
  try {
    body = await ctx.fetchJson(sourceUri);
  } catch {
    // Transport error or non-2xx non-404: degrade honestly.
    return notMeasurable();
  }

  // ctx.fetchJson returns null on 404.
  if (body == null) return notMeasurable();

  const count = extractCount(body);

  // Response resolved but carries no usable count field.
  if (count == null) return notMeasurable();

  return {
    dims: { D21_reverse_dependents: count },
    evidence: {
      D21_reverse_dependents: makeEvidence(count, {
        source_class: SOURCE_CLASS.A,
        source_uri: sourceUri,
        missingness: MISSINGNESS.MEASURED,
      }),
    },
  };
}

export default fetchEcosystems;
