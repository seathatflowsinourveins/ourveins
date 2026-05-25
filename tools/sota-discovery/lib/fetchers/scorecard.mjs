// tools/sota-discovery/lib/fetchers/scorecard.mjs
// sca-v21-MVP fetcher — OSSF Scorecard (CLASS-A, deterministic).
//
// ENDPOINT (free, no-auth, verified live 2026-05-23):
//   GET https://api.securityscorecards.dev/projects/github.com/{owner}/{name}
//   -> { date, repo:{name,commit}, scorecard:{version,commit}, score, checks:[ ... ] }
//   Each check: { name, score, reason, details, documentation }.
//   check.score is an integer 0..10, OR -1 ("inconclusive" sentinel — Scorecard could
//   not determine a result; we treat -1 as NOT_MEASURABLE for that dim, never as a low score).
//   A project with no precomputed Scorecard report -> HTTP 404 -> all dims NOT_MEASURABLE.
//   (Verified shape with live probes against github.com/ossf/scorecard [200, score 9] and
//    github.com/sigstore/cosign [200, score 7.7] on 2026-05-23.)
//
// CHECK -> DIM MAPPING (CR-6 cite of the operationalization):
//
//   D08_provenance (PROVENANCE enum) — Stream A reframe (TanStack 2026-05-11: 84 malicious
//     pkgs WITH valid SLSA-L3). Provenance is NECESSARY EVIDENCE, not SUFFICIENT TRUST.
//     Combine three Scorecard checks:
//       Signed-Releases     (is there cryptographic signing of release artifacts?)
//       Token-Permissions   (do CI workflows over-privilege the GITHUB_TOKEN? = injection surface)
//       Dangerous-Workflow  (untrusted-code-checkout / script-injection workflow patterns?)
//     Decision:
//       Signed-Releases high  AND  Token-Permissions clean AND Dangerous-Workflow clean
//                                                 -> VERIFIED_CLEAN  (signed AND pre-flight-clean)
//       Signed-Releases high  BUT  a workflow risk (low Token-Permissions or Dangerous-Workflow)
//                                                 -> PRESENT_UNVERIFIED  (signed != safe; NEUTRAL)
//       Signed-Releases low / no signing          -> ABSENT
//     NOTE: PROVENANCE.CLAIMED_NOT_VERIFIED ("worse than absent") is NOT emitted here — Scorecard
//     cannot observe a *claimed-but-unverifiable* attestation, so synthesizing it would be a
//     fabrication. It is reserved for a cross-source (osv/deps.dev) conflict resolver.
//
//   D10_test_coverage_pct (ratio 0..1) — PROXY ONLY, not real line coverage. Scorecard exposes no
//     coverage metric, so we proxy from CI-Tests (do merged PRs run CI?) + Code-Review (are changes
//     reviewed?), averaged and normalized /10. Documented as a proxy in evidence.source_uri note.
//
//   D17_pinning_discipline (enum) — derive from Pinned-Dependencies check score:
//     score >= 9 -> "git-commit-sha"   (hash-pinning; Scorecard's highest tier rewards by-hash pins)
//     score >= 6 -> "npm-exact-version"(mostly pinned, some by-tag/by-version)
//     score >= 3 -> "version-range"    (partial pinning)
//     score >= 0 -> "untagged"         (effectively unpinned)
//     Scorecard collapses ecosystem-specific pinning into one 0..10 score; it cannot distinguish
//     image-digest vs git-sha vs uvx, so we map to the closest single-axis enum and document it.
//     -1 (inconclusive) / 404 -> not-applicable + NOT_MEASURABLE.

import {
  PROVENANCE,
  MISSINGNESS,
  SOURCE_CLASS,
  makeEvidence,
} from "../contract.mjs";

// Scorecard's documented thresholds: a check "passes" at high (>=8); risk is signalled below that.
const HIGH = 8; // signed-releases / clean-workflow pass bar
const SENTINEL_INCONCLUSIVE = -1;

function endpointFor(owner, name) {
  return `https://api.securityscorecards.dev/projects/github.com/${owner}/${name}`;
}

// Index checks by name -> the integer score (or null when -1/inconclusive/absent).
function indexChecks(checks) {
  const byName = new Map();
  for (const c of checks || []) {
    if (!c || typeof c.name !== "string") continue;
    const s = typeof c.score === "number" ? c.score : null;
    byName.set(c.name, s === SENTINEL_INCONCLUSIVE ? null : s);
  }
  return byName;
}

// --- D08: provenance reframe ---
function computeProvenance(checks) {
  const signed = checks.get("Signed-Releases");
  const tokenPerms = checks.get("Token-Permissions");
  const dangerous = checks.get("Dangerous-Workflow");

  // No Signed-Releases data at all -> cannot determine signing -> NOT_MEASURABLE.
  if (signed == null) {
    return { value: null, missingness: MISSINGNESS.NOT_MEASURABLE };
  }

  const isSigned = signed >= HIGH;
  if (!isSigned) {
    return { value: PROVENANCE.ABSENT, missingness: MISSINGNESS.MEASURED };
  }

  // Signed. Now require pre-flight-clean workflow posture for VERIFIED_CLEAN.
  // If a workflow signal is inconclusive (null), we cannot certify clean -> downgrade to
  // PRESENT_UNVERIFIED (conservative: signed != safe unless we positively confirm clean).
  const tokenClean = tokenPerms != null && tokenPerms >= HIGH;
  const dangerousClean = dangerous != null && dangerous >= HIGH;

  if (tokenClean && dangerousClean) {
    return { value: PROVENANCE.VERIFIED_CLEAN, missingness: MISSINGNESS.MEASURED };
  }
  return { value: PROVENANCE.PRESENT_UNVERIFIED, missingness: MISSINGNESS.MEASURED };
}

// --- D10: test-coverage proxy (CI-Tests + Code-Review)/2, normalized /10 ---
function computeCoverageProxy(checks) {
  const ci = checks.get("CI-Tests");
  const review = checks.get("Code-Review");
  const present = [ci, review].filter((s) => s != null);
  if (present.length === 0) {
    return { value: null, missingness: MISSINGNESS.NOT_MEASURABLE };
  }
  const mean = present.reduce((a, b) => a + b, 0) / present.length;
  return { value: Math.max(0, Math.min(1, mean / 10)), missingness: MISSINGNESS.MEASURED };
}

// --- D17: pinning discipline from Pinned-Dependencies score ---
function computePinning(checks) {
  const pinned = checks.get("Pinned-Dependencies");
  if (pinned == null) {
    return { value: "not-applicable", missingness: MISSINGNESS.NOT_MEASURABLE };
  }
  let value;
  if (pinned >= 9) value = "git-commit-sha";
  else if (pinned >= 6) value = "npm-exact-version";
  else if (pinned >= 3) value = "version-range";
  else value = "untagged";
  return { value, missingness: MISSINGNESS.MEASURED };
}

/**
 * Fetch OSSF Scorecard and derive D08/D10/D17.
 * @param {string} owner  GitHub owner/org
 * @param {string} name   GitHub repo name
 * @param {{ fetchJson: (url:string)=>Promise<any> }} ctx
 * @returns {Promise<{dims:object, evidence:object}>}
 */
export async function fetchScorecard(owner, name, ctx) {
  const source_uri = endpointFor(owner, name);
  const source_class = SOURCE_CLASS.A;

  let report;
  try {
    report = await ctx.fetchJson(source_uri);
  } catch (err) {
    // 404 (no precomputed Scorecard) or any transport error -> honest NOT_MEASURABLE.
    // We do NOT fabricate scores when the source is absent.
    report = null;
  }

  // 404 / empty / shape-invalid -> all three dims NOT_MEASURABLE.
  if (!report || !Array.isArray(report.checks)) {
    const notMeasurable = (value) =>
      makeEvidence(value, { source_class, source_uri, missingness: MISSINGNESS.NOT_MEASURABLE });
    return {
      dims: {
        D08_provenance: null,
        D10_test_coverage_pct: null,
        D17_pinning_discipline: null,
      },
      evidence: {
        D08_provenance: notMeasurable(null),
        D10_test_coverage_pct: notMeasurable(null),
        D17_pinning_discipline: notMeasurable(null),
      },
    };
  }

  const checks = indexChecks(report.checks);

  const prov = computeProvenance(checks);
  const cov = computeCoverageProxy(checks);
  const pin = computePinning(checks);

  return {
    dims: {
      D08_provenance: prov.value,
      D10_test_coverage_pct: cov.value,
      D17_pinning_discipline: pin.value,
    },
    evidence: {
      D08_provenance: makeEvidence(prov.value, {
        source_class,
        source_uri,
        missingness: prov.missingness,
      }),
      D10_test_coverage_pct: makeEvidence(cov.value, {
        // Honest: this is a CI-Tests+Code-Review proxy, not measured line coverage.
        source_class,
        source_uri: `${source_uri}#proxy=CI-Tests+Code-Review`,
        missingness: cov.missingness,
      }),
      D17_pinning_discipline: makeEvidence(pin.value, {
        source_class,
        source_uri: `${source_uri}#check=Pinned-Dependencies`,
        missingness: pin.missingness,
      }),
    },
  };
}
