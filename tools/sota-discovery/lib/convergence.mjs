// tools/sota-discovery/lib/convergence.mjs
// sca-v22 CONVERGENCE engine (Layer 1 + Layer 2) — the multi-source fusion v21 lacked (gap #2:
// disjoint dims => confidence was pure measured_ratio => "1 source guessing == 3 sources agreeing").
// Design: docs/architecture/W384-RESEARCH-ARCH-V22/DESIGN.md §3.
//
// Layer 1 — per-dim reconciliation by dim TYPE (one tolerance is too blunt — codex r1):
//   SECURITY (KEV/CVE)        KEV flag EXACT (never averaged) + density within tol; any mismatch
//                             keeps the SAFER (higher-risk) value + escalates
//   ENUM (license/install/...)exact class; disagreement -> credibility-weighted-majority + CONFLICTING
//   COUNT (dependents/...)    relative tolerance 0.5 (within 50%)
//   RATIO (coverage/density)  absolute tolerance 0.2
//   QUALITATIVE (deepwiki/...) semantic band 0.3
//   => credibility-weighted aggregate (v* = Σwᵢvᵢ/Σwᵢ numerics; weighted-majority enums) + a
//      convergence score κ (>=2 agree = 1.0 · single-source = 0.7 · disagree = 0.5 -> CONFLICTING
//      + escalate · none = 0.0). Non-finite numeric observations are NOT counted as measured.
//   κ does NOT touch the FROZEN cluster weights — applyKappaShrink shrinks the dim's VALUE toward
//   neutral 0.5 by (1-κ). The weight vector is untouched, so the freeze stays honest (codex r1).
//
// Layer 2 — convergence_confidence = coverage × agreement (agreement = mean κ over measured dims).
// Bands align with the v21 confidence cutoffs so the §3 example (0.9·0.7=0.63 -> MEDIUM) holds.
//
// Pure + deterministic. Operates over tiny observation structs (context-protection): raw packs /
// pages die in the sandbox; only {value, source_class, missingness} reach this engine.

import { MISSINGNESS, SOURCE_CLASS, DIMS } from "./contract.mjs";

export const SCHEMA_VERSION = "sca-v22";

export const DIM_TYPE = Object.freeze({
  SECURITY: "security",
  ENUM: "enum",
  COUNT: "count",
  RATIO: "ratio",
  QUALITATIVE: "qualitative",
});

// Per-type agreement tolerances (DESIGN §3 Layer 1).
const COUNT_REL_TOL = 0.5; // counts agree if max <= (1+0.5)*max(1,min)
const RATIO_ABS_TOL = 0.2;
const QUAL_ABS_TOL = 0.3;

// Credibility weight by source class (deterministic > LLM-judge > AI-on-repo). This is the
// per-observation aggregation weight — NOT the FROZEN cluster weights.
const SOURCE_CREDIBILITY = Object.freeze({
  [SOURCE_CLASS.A]: 1.0,
  [SOURCE_CLASS.B]: 0.7,
  [SOURCE_CLASS.C]: 0.6,
});

// Dims whose values are LLM/AI judgments (deepwiki/perplexity) -> looser semantic band.
const QUALITATIVE_DIMS = new Set(["D12_doc_completeness", "D14_cc_pattern_density", "D18_arch_relevance"]);

/** Classify a dim into a reconciliation TYPE (drives the agreement tolerance). */
export function dimType(dimKey) {
  if (dimKey === "D22_osv_cve") return DIM_TYPE.SECURITY;
  if (QUALITATIVE_DIMS.has(dimKey)) return DIM_TYPE.QUALITATIVE;
  const kind = DIMS[dimKey] && DIMS[dimKey].kind;
  if (kind === "enum") return DIM_TYPE.ENUM;
  if (kind === "int") return DIM_TYPE.COUNT;
  if (kind === "obj") return DIM_TYPE.SECURITY;
  return DIM_TYPE.RATIO; // ratio + unknown default
}

function isNumericType(type) {
  return type === DIM_TYPE.COUNT || type === DIM_TYPE.RATIO || type === DIM_TYPE.QUALITATIVE;
}

function credibility(obs) {
  return (obs && SOURCE_CREDIBILITY[obs.source_class]) || 0.5;
}

// Weighted numeric aggregate v* = Σwᵢvᵢ/Σwᵢ (inputs already finite-filtered).
function weightedMean(measured) {
  let num = 0, den = 0;
  for (const o of measured) {
    const v = Number(o.value);
    if (!Number.isFinite(v)) continue;
    const w = credibility(o);
    num += w * v;
    den += w;
  }
  return den ? num / den : null;
}

// Credibility-weighted-majority enum value with a DETERMINISTIC tie-break (codex P2 #5):
// highest total weight -> highest single-observation credibility -> lexicographically smallest
// value (independent of upstream observation order).
function weightedMajority(measured) {
  const tally = new Map(); // value -> { weight, maxCred }
  for (const o of measured) {
    const w = credibility(o);
    const cur = tally.get(o.value) || { weight: 0, maxCred: 0 };
    cur.weight += w;
    cur.maxCred = Math.max(cur.maxCred, w);
    tally.set(o.value, cur);
  }
  let best = null, bestW = -Infinity, bestCred = -Infinity;
  for (const [v, { weight, maxCred }] of tally) {
    const better =
      weight > bestW ||
      (weight === bestW && maxCred > bestCred) ||
      (weight === bestW && maxCred === bestCred && (best === null || String(v) < String(best)));
    if (better) { best = v; bestW = weight; bestCred = maxCred; }
  }
  return best;
}

// How many observations share the single most-common value (for agreeing_sources on conflict).
function modalCount(measured) {
  const tally = new Map();
  for (const o of measured) { const k = JSON.stringify(o.value); tally.set(k, (tally.get(k) || 0) + 1); }
  return measured.length ? Math.max(...tally.values()) : 0;
}

// Tri-state KEV flag: true (KEV-active) / false (known-clean) / null (UNKNOWN). Anything else -> null.
function kevFlag(v) {
  if (v && typeof v === "object" && "cisa_kev_active" in v) return v.cisa_kev_active ?? null;
  return null;
}
// Risk rank for the safer-value pick: KEV-active(2) > UNKNOWN(1) > known-clean(0).
function kevRisk(v) {
  const k = kevFlag(v);
  return k === true ? 2 : k === false ? 0 : 1;
}
// On a security signal, the value indicating MORE risk: higher KEV-risk rank; tie -> higher density.
function saferSecurityValue(measured) {
  let safer = measured[0].value;
  for (const o of measured) {
    const v = o.value;
    if (!v || typeof v !== "object") continue;
    const rv = kevRisk(v), rs = kevRisk(safer);
    if (rv > rs) { safer = v; continue; }
    if (rv === rs && (v.density || 0) > ((safer && safer.density) || 0)) safer = v;
  }
  return safer;
}

function agree(type, measured) {
  if (type === DIM_TYPE.SECURITY) {
    // KEV flag is EXACT (a veto — never averaged) and TRI-STATE: true / false / null (UNKNOWN)
    // are all distinct (codex P2-beta #2 — !! wrongly collapsed null and false).
    const kev0 = kevFlag(measured[0].value);
    if (!measured.every((o) => kevFlag(o.value) === kev0)) return false;
    // Same KEV status: densities must also agree within the ratio tolerance (codex P1 #1).
    const dens = measured
      .map((o) => (o.value && typeof o.value.density === "number" ? o.value.density : null))
      .filter((d) => Number.isFinite(d)); // drop null/NaN/Infinity densities (codex r2 nit)
    if (dens.length >= 2 && (Math.max(...dens) - Math.min(...dens)) > RATIO_ABS_TOL) return false;
    return true;
  }
  if (type === DIM_TYPE.ENUM) {
    const v0 = measured[0].value;
    return measured.every((o) => o.value === v0);
  }
  const nums = measured.map((o) => Number(o.value)).filter((x) => Number.isFinite(x));
  if (nums.length < 2) return true;
  const min = Math.min(...nums), max = Math.max(...nums);
  if (type === DIM_TYPE.COUNT) return max <= (1 + COUNT_REL_TOL) * Math.max(1, min);
  const tol = type === DIM_TYPE.QUALITATIVE ? QUAL_ABS_TOL : RATIO_ABS_TOL;
  return (max - min) <= tol;
}

/**
 * Reconcile multiple source observations of ONE dim.
 * @param {string} dimKey
 * @param {Array<{value:any, source_class?:string, missingness?:string}>} observations
 * @returns {{value:any, kappa:number, dim_type:string, agreeing_sources:number, measured_sources:number, resolution:string, missingness:string, escalate:boolean}}
 */
export function reconcileDim(dimKey, observations = []) {
  const type = dimType(dimKey);
  const numeric = isNumericType(type);
  const measured = (observations || []).filter((o) => {
    if (!o || o.value == null) return false;
    if (o.missingness !== undefined && o.missingness !== MISSINGNESS.MEASURED) return false;
    if (numeric && !Number.isFinite(Number(o.value))) return false; // drop NaN/Infinity (codex P1 #3)
    return true;
  });
  const n = measured.length;

  if (n === 0) {
    return { value: null, kappa: 0.0, dim_type: type, agreeing_sources: 0, measured_sources: 0, resolution: "none", missingness: MISSINGNESS.NOT_MEASURABLE, escalate: false };
  }
  if (n === 1) {
    return { value: measured[0].value, kappa: 0.7, dim_type: type, agreeing_sources: 1, measured_sources: 1, resolution: "single-source", missingness: MISSINGNESS.MEASURED, escalate: false };
  }

  const converged = agree(type, measured);
  if (converged) {
    let value;
    if (type === DIM_TYPE.SECURITY) value = saferSecurityValue(measured); // safest among agreeing
    else if (type === DIM_TYPE.ENUM) value = measured[0].value; // all identical
    else value = weightedMean(measured);
    return { value, kappa: 1.0, dim_type: type, agreeing_sources: n, measured_sources: n, resolution: "converged", missingness: MISSINGNESS.MEASURED, escalate: false };
  }

  // Disagreement -> κ=0.5, CONFLICTING, escalate (Layer-3 trigger in P3 fires on any conflict).
  let value;
  if (type === DIM_TYPE.SECURITY) value = saferSecurityValue(measured);
  else if (type === DIM_TYPE.ENUM) value = weightedMajority(measured);
  else value = weightedMean(measured);
  return { value, kappa: 0.5, dim_type: type, agreeing_sources: modalCount(measured), measured_sources: n, resolution: "conflicting", missingness: MISSINGNESS.CONFLICTING, escalate: true };
}

/**
 * Shrink a normalized [0,1] dim value toward neutral 0.5 by (1-κ). κ=1 -> unchanged; κ=0 -> 0.5.
 * Pure confidence operation; the FROZEN cluster weights are never touched. Non-finite input -> null;
 * out-of-range normValue is clamped to [0,1] (codex P2 #6).
 */
export function applyKappaShrink(normValue, kappa) {
  if (!Number.isFinite(normValue)) return null;
  const v = Math.max(0, Math.min(1, normValue));
  const k = Math.max(0, Math.min(1, Number.isFinite(kappa) ? kappa : 0));
  return v * k + 0.5 * (1 - k);
}

// Confidence bands aligned with the v21 cutoffs (contract.computeConfidence) so the §3 example
// (0.9 coverage x 0.7 agreement = 0.63 -> MEDIUM) holds (codex P1 #2).
function confidenceBand(c) {
  if (c >= 0.85) return "HIGH";
  if (c >= 0.7) return "MEDIUM-HIGH";
  if (c >= 0.5) return "MEDIUM";
  if (c >= 0.3) return "MEDIUM-LOW";
  return "LOW";
}

/**
 * Layer 2: convergence_confidence = coverage × agreement.
 * @param {Object<string,{kappa:number, measured_sources:number}>} reconciledByDim
 * @param {number} [totalDims]  coverage denominator (defaults to |DIMS|)
 * @returns {{convergence_confidence:number, coverage:number, agreement:number, measured_dims:number, band:string}}
 */
export function convergenceConfidence(reconciledByDim, totalDims = Object.keys(DIMS).length) {
  const entries = Object.values(reconciledByDim || {});
  const measured = entries.filter((r) => r && r.measured_sources > 0);
  const coverage = totalDims ? measured.length / totalDims : 0;
  const agreement = measured.length ? measured.reduce((a, r) => a + (r.kappa || 0), 0) / measured.length : 0;
  const convergence_confidence = coverage * agreement;
  return { convergence_confidence, coverage, agreement, measured_dims: measured.length, band: confidenceBand(convergence_confidence) };
}

/** Convenience: reconcile a whole {dimKey: observations[]} map -> {dimKey: reconciliation}. */
export function reconcileAll(observationsByDim = {}) {
  const out = {};
  for (const [dimKey, obs] of Object.entries(observationsByDim)) out[dimKey] = reconcileDim(dimKey, obs);
  return out;
}
