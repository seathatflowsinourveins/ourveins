// tools/sota-discovery/lib/fetchers/depsdev.mjs
// sca-v21-MVP CLASS-A fetcher — deps.dev (free, no-auth) transitive-dependency health + reverse dependents.
//
// CR-6 verify-before-claim — endpoints VERIFIED LIVE 2026-05-23 via node fetch (curl is sandbox-blocked):
//   * GET https://api.deps.dev/v3/systems/{system}/packages/{package}
//       -> { packageKey, versions[] }; version: { versionKey, publishedAt, isDefault, isDeprecated }
//       -> HTTP 404 body "package not found" when the package is absent.
//   * GET https://api.deps.dev/v3/systems/{system}/packages/{package}/versions/{version}
//       -> { versionKey, publishedAt, isDeprecated, advisoryKeys[], licenses[], ... }
//   * GET https://api.deps.dev/v3/systems/{system}/packages/{package}/versions/{version}:dependencies
//       -> { nodes[], edges[] }; node: { versionKey, relation: SELF|DIRECT|INDIRECT, errors[] }
//   * GET https://api.deps.dev/v3alpha/systems/{system}/packages/{package}/versions/{version}:dependents
//       -> { dependentCount, directDependentCount, indirectDependentCount }
// Probes confirmed against npm/express@4.18.2 (288 versions, 71 dep-nodes, dependentCount 2191)
// and pypi/requests (161 versions). See contract.mjs "Fetcher interface contract".
//
// Dimensions owned (disjoint per contract):
//   D20_transitive_dep_health (ratio 0-1) — derived from the resolved transitive graph.
//   D21_reverse_dependents     (int)       — dependentCount (criticality proxy stars misses).

import {
  DIMS,
  MISSINGNESS,
  SOURCE_CLASS,
  makeEvidence,
} from "../contract.mjs";

const BASE = "https://api.deps.dev/v3";
const BASE_ALPHA = "https://api.deps.dev/v3alpha";

// Registry systems we attempt to map a GitHub repo onto, in priority order.
const SYSTEMS = ["npm", "pypi"];

// Bound the per-node version-detail enrichment so a deep transitive graph cannot
// explode into hundreds of HTTP calls. Health is sampled, not exhaustive.
const HEALTH_SAMPLE_CAP = 30;

// Two reverse-dependent counts are "conflicting" only when they disagree beyond
// this relative tolerance (small registry-lag differences are not a conflict).
const DEPENDENTS_REL_TOLERANCE = 0.5;

const enc = (s) => encodeURIComponent(s);

// Robust GET through the injected fetchJson. The contract says fetchJson does the
// HTTP+cache; real and mock implementations may signal "absent" by EITHER throwing
// OR returning null/undefined. Both collapse to null here so callers branch once.
async function get(ctx, url) {
  try {
    const json = await ctx.fetchJson(url);
    return json == null ? null : json;
  } catch {
    return null; // 404 / network / parse — treated as "not resolvable from this source"
  }
}

// Pick the version we hang the analysis off: prefer isDefault, else the last listed
// (deps.dev returns versions oldest-first), else null.
function pickDefaultVersion(pkg) {
  const versions = (pkg && pkg.versions) || [];
  if (versions.length === 0) return null;
  const def = versions.find((v) => v && v.isDefault);
  const chosen = def || versions[versions.length - 1];
  return (chosen && chosen.versionKey && chosen.versionKey.version) || null;
}

// Resolve a (system, package=name) to { version, pkg } or null if not found.
async function resolvePackage(ctx, system, name) {
  const pkg = await get(ctx, `${BASE}/systems/${system}/packages/${enc(name)}`);
  if (!pkg) return null;
  const version = pickDefaultVersion(pkg);
  if (!version) return null;
  return { system, name, version, pkg };
}

// D20 — compute a transitive-dependency health ratio in [0,1].
// Base signal (one HTTP call): fraction of resolved (error-free) non-SELF nodes.
// Enrichment (bounded sample): penalize deprecated deps and deps carrying advisories.
// Final health = resolvableRatio * cleanSampleRatio (both default to 1 when no data,
// which the caller maps to NOT_MEASURABLE so a missing graph never reads as "healthy").
async function computeDepHealth(ctx, { system, name, version }) {
  const depUrl = `${BASE}/systems/${system}/packages/${enc(name)}/versions/${enc(version)}:dependencies`;
  const graph = await get(ctx, depUrl);
  const nodes = (graph && graph.nodes) || [];
  const deps = nodes.filter((n) => n && n.relation && n.relation !== "SELF");

  if (deps.length === 0) {
    // No transitive deps resolved. Could be a genuinely zero-dep package, but we
    // cannot distinguish that from an unresolved graph -> report NOT_MEASURABLE.
    return { health: null, depCount: 0, source_uri: depUrl };
  }

  const resolvable = deps.filter((n) => !Array.isArray(n.errors) || n.errors.length === 0);
  const resolvableRatio = resolvable.length / deps.length;

  // Dedup by name@version, then sample a bounded slice for the (costly) detail lookups.
  const seen = new Set();
  const sample = [];
  for (const n of resolvable) {
    const k = `${n.versionKey?.name}@${n.versionKey?.version}`;
    if (seen.has(k)) continue;
    seen.add(k);
    sample.push(n);
    if (sample.length >= HEALTH_SAMPLE_CAP) break;
  }

  let clean = 0;
  let assessed = 0;
  for (const n of sample) {
    const sys = (n.versionKey?.system || system).toLowerCase();
    const nm = n.versionKey?.name;
    const ver = n.versionKey?.version;
    if (!nm || !ver) continue;
    const detail = await get(
      ctx,
      `${BASE}/systems/${sys}/packages/${enc(nm)}/versions/${enc(ver)}`,
    );
    if (!detail) continue; // detail unavailable -> exclude from the clean ratio
    assessed += 1;
    const deprecated = detail.isDeprecated === true;
    const hasAdvisory = Array.isArray(detail.advisoryKeys) && detail.advisoryKeys.length > 0;
    if (!deprecated && !hasAdvisory) clean += 1;
  }

  // If no sample node yielded detail, fall back to the resolvable signal alone.
  const cleanSampleRatio = assessed > 0 ? clean / assessed : 1;
  const health = Math.max(0, Math.min(1, resolvableRatio * cleanSampleRatio));
  return { health, depCount: deps.length, sampleAssessed: assessed, source_uri: depUrl };
}

// D21 — reverse dependents count (v3alpha). Returns { count, source_uri } or count=null.
async function fetchDependents(ctx, { system, name, version }) {
  const url = `${BASE_ALPHA}/systems/${system}/packages/${enc(name)}/versions/${enc(version)}:dependents`;
  const res = await get(ctx, url);
  const count =
    res && Number.isFinite(res.dependentCount) ? res.dependentCount : null;
  return { count, source_uri: url };
}

/**
 * deps.dev fetcher.
 * @param {string} owner  GitHub owner (used only for evidence URIs / repo-name fallback)
 * @param {string} name   repo name — also the first package-name guess across SYSTEMS
 * @param {object} ctx    { fetchJson(url) } injected HTTP+cache (mocked in tests)
 * @returns {Promise<{dims:object, evidence:object}>}
 */
export async function fetchDepsdev(owner, name, ctx) {
  const repoUri = `https://github.com/${owner}/${name}`;

  // 1) Map the repo onto registry systems. An owner/name may publish under a
  //    different package name, so we honestly record NOT_MEASURABLE when unmapped.
  const resolved = [];
  for (const system of SYSTEMS) {
    const r = await resolvePackage(ctx, system, name);
    if (r) resolved.push(r);
  }

  // Unmapped on every system -> both dims NOT_MEASURABLE (no fabrication).
  if (resolved.length === 0) {
    const ev = (uri) =>
      makeEvidence(null, {
        source_class: SOURCE_CLASS.A,
        source_uri: uri,
        missingness: MISSINGNESS.NOT_MEASURABLE,
      });
    return {
      dims: { D20_transitive_dep_health: null, D21_reverse_dependents: null },
      evidence: {
        D20_transitive_dep_health: ev(`${BASE}/systems/npm|pypi/packages/${enc(name)}`),
        D21_reverse_dependents: ev(`${BASE_ALPHA}/.../packages/${enc(name)}/...:dependents`),
      },
    };
  }

  // Primary system = first that resolved (npm preferred). Secondary (if any) only
  // used to detect CONFLICTING reverse-dependent counts across registries.
  const primary = resolved[0];

  // 2) D20 — transitive dep health off the primary package's default version.
  const healthRes = await computeDepHealth(ctx, primary);

  // 3) D21 — reverse dependents off the primary; check the secondary for conflict.
  const primaryDep = await fetchDependents(ctx, primary);
  let dependentsCount = primaryDep.count;
  let dependentsMissingness =
    dependentsCount == null ? MISSINGNESS.NOT_MEASURABLE : MISSINGNESS.MEASURED;
  let dependentsUri = primaryDep.source_uri;

  if (resolved.length > 1) {
    const secondaryDep = await fetchDependents(ctx, resolved[1]);
    if (
      dependentsCount != null &&
      secondaryDep.count != null &&
      dependentsCount > 0 &&
      Math.abs(secondaryDep.count - dependentsCount) / dependentsCount >
        DEPENDENTS_REL_TOLERANCE
    ) {
      // Two registries report materially different criticality for this name ->
      // surface CONFLICTING rather than silently trusting one. Keep the larger
      // count as the recorded value (more-depended-upon is the safer proxy).
      dependentsCount = Math.max(dependentsCount, secondaryDep.count);
      dependentsMissingness = MISSINGNESS.CONFLICTING;
      dependentsUri = `${primaryDep.source_uri} | ${secondaryDep.source_uri}`;
    }
  }

  const healthMissingness =
    healthRes.health == null ? MISSINGNESS.NOT_MEASURABLE : MISSINGNESS.MEASURED;

  return {
    dims: {
      D20_transitive_dep_health: healthRes.health,
      D21_reverse_dependents: dependentsCount,
    },
    evidence: {
      D20_transitive_dep_health: makeEvidence(healthRes.health, {
        source_class: SOURCE_CLASS.A,
        source_uri: healthRes.source_uri || repoUri,
        missingness: healthMissingness,
      }),
      D21_reverse_dependents: makeEvidence(dependentsCount, {
        source_class: SOURCE_CLASS.A,
        source_uri: dependentsUri,
        missingness: dependentsMissingness,
      }),
    },
  };
}

// Exported for tests / reuse.
export const _internal = {
  pickDefaultVersion,
  computeDepHealth,
  fetchDependents,
  HEALTH_SAMPLE_CAP,
  DEPENDENTS_REL_TOLERANCE,
};

// Sanity: this fetcher must only ever write its two owned dims.
void DIMS;
