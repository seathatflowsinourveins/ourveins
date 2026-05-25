// tools/sota-discovery/lib/fetchers/license-read.mjs
// sca-v22 CLASS-A fetcher — D07_license_class via LICENSE FILE TEXT.
//
// WHY this fetcher exists (DESIGN.md §2, D07 OVERLAP_DIMS):
//   github-graphql.mjs derives D07 from licenseInfo.spdxId (GitHub's SPDX autodetection).
//   That source returns "NOASSERTION" for legitimately-licensed repos using non-standard,
//   dual, or modified LICENSE files (e.g. dify's modified-Apache, many monorepos).
//   This fetcher is the SECOND independent source: it reads the actual LICENSE file text
//   via a single GraphQL blob query and classifies it directly via keyword/regex detection.
//   The sca-v22 convergence engine uses both dim values (same dim key D07_license_class,
//   different source) to reconcile — a CONFLICTING evidence signal surfaces real ambiguity
//   rather than silently collapsing to one value.
//
// ENDPOINT: POST https://api.github.com/graphql
//   One query reading 5 common LICENSE filenames as HEAD blobs via GraphQL aliases:
//   LICENSE (a), LICENSE.md (b), LICENSE.txt (c), COPYING (d), COPYING.md (e).
//   First non-empty text wins. No recognized text -> "noassertion" (MEASURED).
//   No blobs at all -> "noassertion" (MEASURED — we determined there is no license file).
//   No token -> null (NOT_MEASURABLE, no fetch).
//   Hard error / repo not found / transport throw -> null (NOT_MEASURABLE, never crashes).
//
// DIM: D07_license_class — enum permissive|copyleft|source-available|noassertion|null
// SOURCE_CLASS: A (raw deterministic; direct file-content read)
// source_uri: https://github.com/${owner}/${name}

import { MISSINGNESS, SOURCE_CLASS, makeEvidence } from "../contract.mjs";

const GRAPHQL_URL = "https://api.github.com/graphql";

// ---- classifyLicenseText ---------------------------------------------------
// Order-aware: check AGPL/LGPL before generic GPL substring to avoid misclassification.
// Prefer specificity: source-available before generic copyleft for SSPL (contains "GPL").

const PATTERNS = [
  // source-available first (check before copyleft — SSPL contains "General Public License")
  { cls: "source-available", re: /business\s+source\s+license/i },
  { cls: "source-available", re: /\bbusl\b/i },
  { cls: "source-available", re: /server\s+side\s+public\s+license/i },
  { cls: "source-available", re: /\bsspl\b/i },
  { cls: "source-available", re: /elastic\s+license/i },
  { cls: "source-available", re: /commons\s+clause/i },
  { cls: "source-available", re: /polyform/i },
  // permissive
  { cls: "permissive", re: /\bmit\s+license\b/i },
  { cls: "permissive", re: /\bmit\b.*permission\s+is\s+hereby\s+granted/i },
  { cls: "permissive", re: /apache\s+licen[sc]e/i },
  { cls: "permissive", re: /bsd\s+[23]-clause/i },
  { cls: "permissive", re: /\bisc\s+licen[sc]e\b/i },
  { cls: "permissive", re: /\bisc\b.*copyright/i },
  { cls: "permissive", re: /this\s+is\s+free\s+and\s+unencumbered\s+software/i }, // Unlicense opening line
  { cls: "permissive", re: /\bunlicense\b/i },
  { cls: "permissive", re: /\bzlib\b/i },
  { cls: "permissive", re: /\bbsl-1\.0\b/i },
  // copyleft — AGPL/LGPL MUST come before GPL to avoid matching AGPL/LGPL as plain GPL
  { cls: "copyleft", re: /gnu\s+affero\s+general\s+public\s+licen[sc]e/i },
  { cls: "copyleft", re: /\bagpl\b/i },
  { cls: "copyleft", re: /gnu\s+lesser\s+general\s+public\s+licen[sc]e/i },
  { cls: "copyleft", re: /\blgpl\b/i },
  { cls: "copyleft", re: /gnu\s+general\s+public\s+licen[sc]e/i },
  { cls: "copyleft", re: /\bgpl\b/i },
  { cls: "copyleft", re: /mozilla\s+public\s+licen[sc]e/i },
  { cls: "copyleft", re: /\bmpl\b.*version/i },
  { cls: "copyleft", re: /eclipse\s+public\s+licen[sc]e/i },
  { cls: "copyleft", re: /\bepl\b/i },
  { cls: "copyleft", re: /european\s+union\s+public\s+licen[sc]e/i },
  { cls: "copyleft", re: /\beupl\b/i },
];

/**
 * Classify license text by keyword/regex.
 * Order-aware: source-available checked before copyleft; AGPL/LGPL before GPL.
 * Returns: "permissive" | "copyleft" | "source-available" | "noassertion"
 *
 * @param {string} text
 * @returns {"permissive"|"copyleft"|"source-available"|"noassertion"}
 */
export function classifyLicenseText(text) {
  if (!text || typeof text !== "string") return "noassertion";
  for (const { cls, re } of PATTERNS) {
    if (re.test(text)) return cls;
  }
  return "noassertion";
}

// ---- GraphQL query ---------------------------------------------------------
// 5 aliases cover the most common LICENSE filenames in order of prevalence:
//   a = LICENSE, b = LICENSE.md, c = LICENSE.txt, d = COPYING, e = COPYING.md
function buildQuery() {
  return `query($owner:String!,$name:String!){
  repository(owner:$owner,name:$name){
    a:object(expression:"HEAD:LICENSE"){ ... on Blob{ text } }
    b:object(expression:"HEAD:LICENSE.md"){ ... on Blob{ text } }
    c:object(expression:"HEAD:LICENSE.txt"){ ... on Blob{ text } }
    d:object(expression:"HEAD:COPYING"){ ... on Blob{ text } }
    e:object(expression:"HEAD:COPYING.md"){ ... on Blob{ text } }
  }
}`;
}

function nullResult(source_uri) {
  return {
    dims: { D07_license_class: null },
    evidence: {
      D07_license_class: makeEvidence(null, {
        source_class: SOURCE_CLASS.A,
        source_uri,
        missingness: MISSINGNESS.NOT_MEASURABLE,
      }),
    },
  };
}

/**
 * Fetch D07_license_class by reading the actual LICENSE file text from GitHub.
 * Second independent D07 source for sca-v22 convergence (complements github-graphql.mjs SPDX).
 *
 * @param {string} owner  — GitHub org or user
 * @param {string} name   — repository name
 * @param {{ fetchJson: (url:string, opts:object)=>Promise<any>, now?:number }} ctx
 * @returns {Promise<{ dims: { D07_license_class: string|null }, evidence: { D07_license_class: object } }>}
 */
export async function fetchLicenseRead(owner, name, ctx) {
  const token = process.env.GITHUB_TOKEN || process.env.GH_TOKEN;
  const repoUri = `https://github.com/${owner}/${name}`;

  if (!token) {
    // No token: return honest NOT_MEASURABLE — do NOT attempt any network call.
    return nullResult(repoUri);
  }

  const body = JSON.stringify({
    query: buildQuery(),
    variables: { owner, name },
  });

  let json;
  try {
    json = await ctx.fetchJson(GRAPHQL_URL, {
      method: "POST",
      headers: {
        Authorization: `bearer ${token}`,
        "Content-Type": "application/json",
        "User-Agent": "sca-v22-license-read",
      },
      body,
    });
  } catch {
    // Transport failure (network down, timeout, etc.) -> honest NOT_MEASURABLE, no crash.
    return nullResult(repoUri);
  }

  // GraphQL hard error or repo not found (data.repository is null).
  const repo = json && json.data && json.data.repository;
  if (!repo || (json.errors && !repo)) {
    return nullResult(repoUri);
  }

  // Walk aliases in order of prevalence; take first non-empty text.
  const licenseText =
    (repo.a && repo.a.text) ||
    (repo.b && repo.b.text) ||
    (repo.c && repo.c.text) ||
    (repo.d && repo.d.text) ||
    (repo.e && repo.e.text) ||
    null;

  // No LICENSE file found (all null) OR found but unrecognizable text -> "noassertion".
  // BOTH are MEASURED outcomes: we successfully queried the repo and determined there is
  // no readable license file, or the file text doesn't match any known license pattern.
  // This mirrors how github-graphql.mjs treats GitHub's own NOASSERTION return.
  const licenseClass = licenseText ? classifyLicenseText(licenseText) : "noassertion";

  return {
    dims: { D07_license_class: licenseClass },
    evidence: {
      D07_license_class: makeEvidence(licenseClass, {
        source_class: SOURCE_CLASS.A,
        source_uri: repoUri,
        missingness: MISSINGNESS.MEASURED,
      }),
    },
  };
}

export default fetchLicenseRead;
