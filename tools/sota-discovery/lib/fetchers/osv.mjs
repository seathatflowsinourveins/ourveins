// tools/sota-discovery/lib/fetchers/osv.mjs
// D22_osv_cve fetcher — vulnerability signal from OSV.dev (CLASS-A, deterministic).
//
// ── CR-6 EVIDENCE (endpoint + KEV-detection method, verified via live probe 2026-05-23) ──
// ENDPOINT: POST https://api.osv.dev/v1/query   (free, no-auth)
//   request body : {"package":{"name":"<pkg>","ecosystem":"npm"|"PyPI"}[,"version":"x"]}
//   response     : {"vulns":[ {id, aliases:[CVE..], severity:[{type:"CVSS_V3"|"CVSS_V4",
//                    score:"<CVSS-vector-string>"}], database_specific:{severity:"CRITICAL"|
//                    "HIGH"|"MODERATE"|"LOW", cwe_ids:[...]}, ...} ]}
//   clean pkg    : HTTP 200, body {} (NO "vulns" key) -> 0 vulns, MEASURED.
//   unknown pkg  : HTTP 200, body {} as well (OSV does not 404 unknown names).
//   bad input    : HTTP 400 {"code":3,"message":"Invalid ecosystem."} -> NOT_MEASURABLE.
//
// KEV-DETECTION (sca-v22 P2d — REAL CISA-KEV): OSV.dev does NOT expose a KEV flag, so we cross-
//   check each vuln's CVE aliases against the LIVE CISA Known-Exploited-Vulnerabilities catalog
//   (cisa.gov feed). KEV membership = the boolean veto (`cisa_kev_active`). CVSS-critical is
//   DEMOTED to a separate score-penalty signal (`critical_count`) — it no longer sets the KEV flag
//   (a critical CVSS score is NOT evidence of active exploitation). Honest degrade: if the catalog
//   is unreachable, `cisa_kev_active` is null (UNKNOWN — never a fabricated veto; unknown != active)
//   with `kev_source:"catalog-unreachable"`. Callers/tests may inject a prebuilt `ctx.kevSet`
//   (Set of CVE ids) to avoid re-fetching the ~1MB catalog per repo.
//
// D22_osv_cve = { cve_count, critical_count, cisa_kev_active, kev_cves, density, kev_source }
//   density = vulns-per-known-dependency proxy in [0,1], capped: min(1, cve_count / DENSITY_SATURATION).

import { makeEvidence, MISSINGNESS, SOURCE_CLASS } from "../contract.mjs";

const OSV_QUERY_URL = "https://api.osv.dev/v1/query";
// MVP ecosystems (Q5 core-4 scope). Repo name is queried as the package name in each.
const DEFAULT_ECOSYSTEMS = ["npm", "PyPI"];
// cve_count at/above this saturates density to 1.0 (proxy until a real dep count is wired in v21.1).
const DENSITY_SATURATION = 10;

// Live CISA Known-Exploited-Vulnerabilities catalog (real KEV membership, sca-v22 P2d).
const CISA_KEV_URL = "https://www.cisa.gov/sites/default/files/feeds/known_exploited_vulnerabilities.json";

// Fetch the CISA-KEV catalog -> Set of uppercased CVE ids (cached 24h by the injected fetchJson).
// Returns null when unreachable / bad-shape (=> KEV status reported UNKNOWN, never fabricated).
// A prebuilt Set may be injected via ctx.kevSet (tests / a shared cross-repo run).
async function fetchKevSet(ctx) {
  if (ctx && ctx.kevSet instanceof Set) return ctx.kevSet;
  if (!ctx || typeof ctx.fetchJson !== "function") return null;
  try {
    const json = await ctx.fetchJson(CISA_KEV_URL);
    const vulns = json && Array.isArray(json.vulnerabilities) ? json.vulnerabilities : null;
    if (!vulns) return null;
    const set = new Set();
    for (const v of vulns) if (v && typeof v.cveID === "string") set.add(v.cveID.toUpperCase());
    return set;
  } catch {
    return null;
  }
}

// All CVE ids referenced by an OSV vuln (its id if a CVE, plus CVE aliases), uppercased.
function vulnCves(v) {
  const out = [];
  if (v && typeof v.id === "string" && /^CVE-/i.test(v.id)) out.push(v.id.toUpperCase());
  for (const a of (v && v.aliases) || []) if (typeof a === "string" && /^CVE-/i.test(a)) out.push(a.toUpperCase());
  return out;
}

// CVSS v3/v4 vector -> critical when ALL of confidentiality/integrity/availability are High AND
// the attack vector is Network (matches NVD "critical" ~9.0+ shape without a numeric base score,
// which OSV does not provide). Conservative: any false-negative degrades to non-KEV, never invents one.
// True iff the `/`-delimited CVSS vector contains the EXACT metric token — so AV:N does not match
// the modified/environmental MAV:N, and C:H does not match VC:H (codex P2-beta r2). Metric tokens
// contain only `:` and alphanumerics (regex-safe), so no escaping is needed.
function hasMetric(vector, metric) {
  return new RegExp(`(?:^|/)${metric}(?:/|$)`).test(vector);
}
function isCriticalCvssVector(score) {
  if (typeof score !== "string") return false;
  const s = score.toUpperCase();
  if (!hasMetric(s, "AV:N")) return false; // BASE attack vector Network (not modified MAV:N)
  // CVSS v3 uses C:H/I:H/A:H; CVSS v4 uses VC:H/VI:H/VA:H (vulnerable-system metrics) — codex P2-beta #4.
  const v3 = hasMetric(s, "C:H") && hasMetric(s, "I:H") && hasMetric(s, "A:H");
  const v4 = hasMetric(s, "VC:H") && hasMetric(s, "VI:H") && hasMetric(s, "VA:H");
  return v3 || v4;
}

// A single OSV vuln record -> is it "critical" (our KEV proxy)?
function vulnIsCritical(v) {
  const dbSev = v && v.database_specific && v.database_specific.severity;
  if (typeof dbSev === "string" && dbSev.toUpperCase() === "CRITICAL") return true;
  for (const sev of (v && v.severity) || []) {
    if (isCriticalCvssVector(sev && sev.score)) return true;
  }
  return false;
}

// Run one OSV query through the injected fetchJson. Returns
//   { ok: true, vulns: [...] }            on a 200 (vulns may be [])
//   { ok: false }                          when the query could not be resolved (4xx / throw).
async function queryEcosystem(ctx, name, ecosystem) {
  try {
    const res = await ctx.fetchJson(OSV_QUERY_URL, {
      method: "POST",
      body: { package: { name, ecosystem } },
    });
    // fetchJson is expected to resolve to the parsed JSON body. A resolved object (even {}) = 200.
    // A null/undefined or an object with an error `code`/`message` is treated as not-resolved.
    if (res == null) return { ok: false };
    if (typeof res === "object" && res.code != null && res.message != null && !("vulns" in res)) {
      return { ok: false }; // {"code":3,"message":"Invalid ecosystem."}
    }
    return { ok: true, vulns: Array.isArray(res.vulns) ? res.vulns : [] };
  } catch {
    return { ok: false };
  }
}

/**
 * Fetch OSV.dev vulnerability signal for a repo.
 * @param {string} owner  GitHub owner (unused by OSV directly; OSV indexes by package name).
 * @param {string} name   Repo / package name queried against each MVP ecosystem.
 * @param {object} ctx    { fetchJson(url, {method, body}) -> Promise<parsedJson>, packageName?, ecosystems? }
 * @returns {Promise<{dims:{D22_osv_cve:object|null}, evidence:{D22_osv_cve:object}}>}
 */
export async function fetchOsv(owner, name, ctx) {
  const pkg = (ctx && ctx.packageName) || name;
  const ecosystems =
    (ctx && Array.isArray(ctx.ecosystems) && ctx.ecosystems.length ? ctx.ecosystems : DEFAULT_ECOSYSTEMS);
  const sourceUri = `${OSV_QUERY_URL}?package=${encodeURIComponent(pkg)}`;

  const vulnsById = new Map(); // dedupe across ecosystems by OSV id
  let anyResolved = false;

  for (const ecosystem of ecosystems) {
    const r = await queryEcosystem(ctx, pkg, ecosystem);
    if (!r.ok) continue;
    anyResolved = true; // a 200 (even with zero vulns) means OSV could answer for this name
    for (const v of r.vulns) {
      const id = v && v.id;
      if (id && !vulnsById.has(id)) vulnsById.set(id, v);
    }
  }

  // No ecosystem could resolve the package -> NOT_MEASURABLE (do not assume clean).
  if (!anyResolved) {
    return {
      dims: { D22_osv_cve: null },
      evidence: {
        D22_osv_cve: makeEvidence(null, {
          source_class: SOURCE_CLASS.A,
          source_uri: sourceUri,
          missingness: MISSINGNESS.NOT_MEASURABLE,
        }),
      },
    };
  }

  const vulns = [...vulnsById.values()];
  const cve_count = vulns.length;
  const critical_count = vulns.filter(vulnIsCritical).length; // CVSS-critical -> score-penalty signal
  const density = Math.min(1, cve_count / DENSITY_SATURATION);

  // REAL CISA-KEV (P2d): a vuln CVE present in the live KEV catalog = active-exploitation veto.
  let cisa_kev_active = false;
  let kev_cves = [];
  let kev_source = "no-vulns";
  if (cve_count > 0) {
    const kevSet = await fetchKevSet(ctx);
    if (kevSet) {
      kev_source = "cisa-kev-catalog";
      for (const v of vulns) for (const cve of vulnCves(v)) if (kevSet.has(cve)) kev_cves.push(cve);
      kev_cves = [...new Set(kev_cves)];
      cisa_kev_active = kev_cves.length > 0;
    } else {
      cisa_kev_active = null; // have vulns but catalog unreachable -> KEV UNKNOWN (no fabricated veto)
      kev_source = "catalog-unreachable";
    }
  }

  const value = { cve_count, critical_count, cisa_kev_active, kev_cves, density, kev_source };

  return {
    dims: { D22_osv_cve: value },
    evidence: {
      D22_osv_cve: makeEvidence(value, {
        source_class: SOURCE_CLASS.A,
        source_uri: sourceUri,
        missingness: MISSINGNESS.MEASURED,
      }),
    },
  };
}

export default fetchOsv;
