// tools/sota-discovery/lib/decision.mjs
// sca-v22 DECISION plane (§4) — confidence-aware soft routing that SHARPENS the 5-tier gate.
// Closes v21 gap #3 (convergence_confidence now GATES routing — a 38%-measured INSTALL and an
// 85%-measured INSTALL no longer share thresholds). Adds geometric-mean soft-AND for INSTALL +
// explicit precedence (BLOCK-veto -> tier-ceilings -> Q + confidence-aware threshold -> route-DOWN)
// + path_to_higher_tier + Layer-3 escalation triggers + an operationalized MONITOR signal.
//
// F_fit (GE-McKinsey 2-axis APS/WCS/LGS/DBRS) is wired in P3-β once dims D24/D25/D26 land (P2-γ);
// the precedence + ceiling slots for it are present here. Design §4.

import {
  CLUSTER_WEIGHTS, blockViolation, installHardFilterViolations, clusterMeans, scoreClass,
} from "./contract.mjs";

const BASE_INSTALL_THRESHOLD = 0.6;
const CONFIDENCE_PENALTY = 0.25; // a 0-confidence repo needs score >= 0.85 to INSTALL
const PATTERN_THRESHOLD = 0.55;
const CITE_THRESHOLD = 0.5;
const BOUNDARY_BAND = 0.05;

const round = (n) => (Number.isFinite(n) ? Math.round(n * 1000) / 1000 : n);

// Tier ordering for ceilings (higher index = higher tier).
const TIER_ORDER = ["BLOCK", "MONITOR", "CITE-ONLY", "PATTERN-STUDY", "INSTALL"];
function capTier(tier, ceiling) {
  if (!ceiling) return tier;
  return TIER_ORDER.indexOf(tier) > TIER_ORDER.indexOf(ceiling) ? ceiling : tier;
}

/**
 * Weighted GEOMETRIC mean (soft-AND) of the INSTALL cluster means: exp(Σ w·ln(m) / Σ w).
 * One near-zero cluster drags INSTALL down hard — so it can't be earned by AVERAGING away a weak
 * trust/prod-readiness cluster (arithmetic (0.9,0.9,0.01) -> 0.60 masks the weak dim; geometric -> ~0.20).
 */
export function geometricInstallScore(means) {
  const w = CLUSTER_WEIGHTS.INSTALL;
  let logSum = 0, wSum = 0;
  for (const [c, weight] of Object.entries(w)) {
    if (!weight) continue;
    const raw = Number.isFinite(means[c]) ? means[c] : 0.5;
    const m = Math.max(1e-6, Math.min(1, raw)); // clamp [1e-6,1]: callers may pass NaN/>1 (codex P3 #3)
    logSum += weight * Math.log(m);
    wSum += weight;
  }
  return wSum ? Math.exp(logSum / wSum) : 0;
}

/** Confidence-aware INSTALL threshold: a low-confidence repo needs a HIGHER score to INSTALL. */
export function effectiveInstallThreshold(cc) {
  const c = Number.isFinite(cc) ? Math.max(0, Math.min(1, cc)) : 0;
  return BASE_INSTALL_THRESHOLD + (1 - c) * CONFIDENCE_PENALTY;
}

/** Shrink a raw score toward neutral 0.5 when confidence is low (operationalizes "unknown != clean"). */
export function confidenceDiscountedScore(raw, cc) {
  const c = Number.isFinite(cc) ? Math.max(0, Math.min(1, cc)) : 0;
  const r = Number.isFinite(raw) ? raw : 0;
  return r * c + 0.5 * (1 - c);
}

function escalationTriggers(escalations, route) {
  const triggers = [];
  for (const e of escalations || []) triggers.push({ type: "conflicting-dim", dim: e.dim, resolution: e.resolution });
  if (route && Number.isFinite(route.installScore) && Math.abs(route.installScore - route.installThreshold) <= BOUNDARY_BAND) {
    triggers.push({ type: "boundary-band", detail: `install score ${round(route.installScore)} within ±${BOUNDARY_BAND} of threshold ${round(route.installThreshold)}` });
  }
  return triggers;
}

// Describe how to reach the IMMEDIATE next tier up (codex P3 #1 — not always INSTALL-oriented).
function pathToHigherTier(tier, ctx) {
  if (tier === "INSTALL") return null; // already top
  const nextTier = TIER_ORDER[TIER_ORDER.indexOf(tier) + 1];
  // If a ceiling caps us AT this tier, the only way up is to lift the ceiling.
  if (ctx.ceiling_applied === tier && ctx.ceilings && ctx.ceilings.length) {
    return `reach ${nextTier} by lifting ceiling(s): ${ctx.ceilings.map((c) => `${c.dim} (${c.reason})`).join("; ")}`;
  }
  if (nextTier === "INSTALL") {
    const parts = [];
    for (const v of ctx.violations || []) parts.push(`fix ${v.dim} (${v.reason})`);
    if (Number.isFinite(ctx.installScore) && ctx.installScore < ctx.installThreshold) {
      parts.push(`raise INSTALL score to >= ${round(ctx.installThreshold)} (now ${round(ctx.installScore)} — lifting convergence_confidence ${round(ctx.cc)} lowers the threshold)`);
    }
    return `reach INSTALL by: ${parts.length ? parts.join("; ") : "meeting the INSTALL gate"}`;
  }
  if (nextTier === "PATTERN-STUDY") {
    return `reach PATTERN-STUDY by raising the pattern-study score to >= ${PATTERN_THRESHOLD} (now ${round(ctx.scores.pattern_study)})`;
  }
  if (nextTier === "CITE-ONLY") {
    return `reach CITE-ONLY by raising the cite-only score to >= ${CITE_THRESHOLD} (now ${round(ctx.scores.cite_only)})`;
  }
  return "raise per-class scores above the tier thresholds";
}

// MONITOR operationalized (§4): a crude survival/cessation proxy from activity dims, plus a
// re-eval cadence — NOT a fallthrough bucket. (A full cessation-survival model is future work.)
function monitorSignal(dims) {
  const lastCommitDays = dims.D04_last_commit_days;
  const contributors = dims.D05_contributors_90d;
  let cessation_risk = null;
  if (Number.isFinite(lastCommitDays)) {
    const stale = Math.min(1, lastCommitDays / 365);
    const activity = Number.isFinite(contributors) ? Math.min(1, contributors / 10) : 0;
    cessation_risk = Math.max(0, Math.min(1, stale * (1 - 0.5 * activity)));
  }
  const reeval_in_days = cessation_risk == null ? 90 : Math.round(30 + (1 - cessation_risk) * 150); // 30–180d
  return { cessation_risk, reeval_in_days, basis: { last_commit_days: lastCommitDays ?? null, contributors_90d: contributors ?? null } };
}

/**
 * The §4 decision pipeline.
 * @param {{dims:object, normalized:object, evidence:object, convergence_confidence?:number, escalations?:Array}} input
 * @returns {object} decision (tier + scores + threshold + ceilings + triggers + path_to_higher_tier [+ monitor])
 */
export function decide(input, _opts = {}) {
  const { dims, normalized, evidence, convergence_confidence: cc = 0, escalations = [] } = input;

  // (1) BLOCK veto — the only true hard-gates.
  const block = blockViolation(dims);
  if (block) {
    return {
      tier: "BLOCK", reason: block.reason, hard_filter_violations: [block], ceilings: [], ceiling_applied: null,
      escalation_triggers: escalationTriggers(escalations, null),
      path_to_higher_tier: "resolve the BLOCK veto (KEV-active vuln / proprietary license)",
    };
  }

  // (2) Tier-ceilings — cap the MAX tier, route DOWN (NOT block).
  const ceilings = [];
  if (dims.D07_license_class !== "permissive") {
    ceilings.push({ dim: "D07_license_class", ceiling: "PATTERN-STUDY", reason: `license ${dims.D07_license_class ?? "unmeasured"} not verified-permissive` });
  }
  if (dims.D23_data_egress === "cloud-mandatory") { // present only once D23 lands (P2-γ)
    ceilings.push({ dim: "D23_data_egress", ceiling: "PATTERN-STUDY", reason: "unbounded cloud-mandatory token custody" });
  }
  const ceiling = ceilings.reduce(
    (lo, c) => (lo == null || TIER_ORDER.indexOf(c.ceiling) < TIER_ORDER.indexOf(lo) ? c.ceiling : lo),
    null,
  );

  // (3) Compute Q — geometric soft-AND for INSTALL; arithmetic for the others.
  const means = clusterMeans(normalized, evidence);
  const installGeom = geometricInstallScore(means);
  const installThreshold = effectiveInstallThreshold(cc);
  const installEffective = confidenceDiscountedScore(installGeom, cc);
  const scores = {
    install_geom: installGeom,
    install_effective: installEffective,
    pattern_study: scoreClass("PATTERN-STUDY", normalized, evidence),
    cite_only: scoreClass("CITE-ONLY", normalized, evidence),
    monitor: scoreClass("MONITOR", normalized, evidence),
  };

  // (4) Confidence-aware INSTALL gate + (5) route DOWN, capped by ceilings.
  const violations = installHardFilterViolations(dims);
  const installPass = violations.length === 0 && installEffective >= installThreshold;
  let tier;
  if (installPass) tier = "INSTALL";
  else if (scores.pattern_study >= PATTERN_THRESHOLD) tier = "PATTERN-STUDY";
  else if (scores.cite_only >= CITE_THRESHOLD) tier = "CITE-ONLY";
  else tier = "MONITOR";
  tier = capTier(tier, ceiling);

  const result = {
    tier,
    scores,
    effective_install_threshold: installThreshold,
    convergence_confidence: cc,
    hard_filter_violations: violations,
    ceilings,
    ceiling_applied: ceiling,
    escalation_triggers: escalationTriggers(escalations, { installScore: installEffective, installThreshold }),
    path_to_higher_tier: pathToHigherTier(tier, { scores, violations, ceilings, ceiling_applied: ceiling, cc, installThreshold, installScore: installEffective }),
  };
  if (tier === "MONITOR") result.monitor = monitorSignal(dims);
  return result;
}
