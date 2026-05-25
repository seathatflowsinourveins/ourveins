#!/usr/bin/env node
// tools/sota-discovery/evaluate-v22.mjs
// sca-v22 ASSESSMENT + CONVERGENCE evaluate path (the v21->v22 keystone). Unlike v21's
// evaluateRepo (disjoint dims; LAST writer wins on overlap), this COLLECTS every fetcher's
// observation per dim, reconciles them through the convergence engine (Layer 1 κ), shrinks each
// normalized dim value toward neutral by (1-κ), scores per FROZEN-weight class, and reports
// convergence_confidence (Layer 2 = coverage x agreement). Design §3. Adds the overlap sources
// (ecosystems -> D21; license-read -> D07) so convergence has real multi-source to reconcile.
//
// Usage: node evaluate-v22.mjs --repo owner/name [--no-ledger] [--no-cache]

import { parseArgs } from "node:util";
import { fileURLToPath } from "node:url";
import { resolve } from "node:path";
import {
  DIMS, MISSINGNESS, WEIGHTS_PROFILE, makeEvidence, scoreClass, normalizeDim,
} from "./lib/contract.mjs";
import { reconcileAll, applyKappaShrink, convergenceConfidence, SCHEMA_VERSION } from "./lib/convergence.mjs";
import { decide } from "./lib/decision.mjs";
import { makeFetchJson } from "./lib/http.mjs";
import { appendVerdict } from "./lib/ledger.mjs";

// Core-4 (v21) + the two new overlap sources (ecosystems: 2nd D21; license-read: 2nd D07).
export const V22_FETCHER_NAMES = ["github-graphql", "depsdev", "osv", "scorecard", "ecosystems", "license-read"];

function camel(name) {
  return name.split("-").map((s) => s[0].toUpperCase() + s.slice(1)).join("");
}
async function loadFetcher(name) {
  try {
    const mod = await import(`./lib/fetchers/${name}.mjs`);
    const fn = mod[`fetch${camel(name)}`] || mod.default;
    return typeof fn === "function" ? fn : null;
  } catch {
    return null; // honest absence — its dims become NOT_MEASURABLE
  }
}

/**
 * @param {string} owner
 * @param {string} name
 * @param {{fetchJson?:Function, noCache?:boolean, fetchers?:Object<string,Function>, ctxExtra?:object}} opts
 *   opts.fetchers — inject {name: fetcherFn} (tests); defaults to dynamic-loading V22_FETCHER_NAMES.
 * @returns {Promise<object>} sca-v22 verdict (with per-dim convergence + convergence_confidence)
 */
export async function evaluateRepoV22(owner, name, opts = {}) {
  const fetchJson = opts.fetchJson || (await makeFetchJson({ noCache: opts.noCache }));
  const ctx = { fetchJson, ...(opts.ctxExtra || {}) };
  const injected = opts.fetchers || null;
  const names = injected ? Object.keys(injected) : V22_FETCHER_NAMES;

  const settled = await Promise.allSettled(names.map(async (n) => {
    const fn = injected ? injected[n] : await loadFetcher(n);
    if (typeof fn !== "function") return { _missing: n, dims: {}, evidence: {} };
    return await fn(owner, name, ctx);
  }));

  // Collect MULTI-SOURCE observations per dim (overlap allowed — the v22 difference vs v21 clobber).
  const observationsByDim = {};
  const fetcher_versions = {};
  for (let i = 0; i < names.length; i++) {
    const fname = names[i];
    const r = settled[i];
    if (r.status !== "fulfilled") { fetcher_versions[fname] = `error: ${String(r.reason).slice(0, 80)}`; continue; }
    const v = r.value || {};
    fetcher_versions[fname] = v._missing ? "absent" : (v.version || "unstamped");
    for (const [dimKey, ev] of Object.entries(v.evidence || {})) {
      if (!ev) continue;
      (observationsByDim[dimKey] ||= []).push({ value: ev.value, source_class: ev.source_class, missingness: ev.missingness });
    }
  }

  // Layer 1: reconcile each dim across its sources; fill unmeasured dims honestly.
  const reconciled = reconcileAll(observationsByDim);
  for (const dimKey of Object.keys(DIMS)) {
    if (!reconciled[dimKey]) {
      reconciled[dimKey] = { value: null, kappa: 0, dim_type: null, agreeing_sources: 0, measured_sources: 0, resolution: "none", missingness: MISSINGNESS.NOT_MEASURABLE, escalate: false };
    }
  }

  // Converged dims -> normalize -> shrink toward neutral by (1-κ) -> score per class.
  const dims = {};
  const evidence = {};
  const normalized = {};
  for (const dimKey of Object.keys(DIMS)) {
    const rec = reconciled[dimKey];
    dims[dimKey] = rec.value;
    normalized[dimKey] = applyKappaShrink(normalizeDim(dimKey, rec.value), rec.kappa);
    // A dim with >=1 measured source is "measured" for scoring (the κ-shrink already encodes its
    // confidence — including conflicts). Only a dim with zero sources scores neutral.
    evidence[dimKey] = makeEvidence(rec.value, {
      source_class: "CLASS-A",
      source_uri: "converged",
      missingness: rec.measured_sources > 0 ? MISSINGNESS.MEASURED : MISSINGNESS.NOT_MEASURABLE,
    });
  }

  const conf = convergenceConfidence(reconciled);

  // Per-dim convergence block + Layer-3 escalation flags (the actual gpt-5.5 firing fires off these).
  const convergence = {};
  const escalations = [];
  for (const dimKey of Object.keys(DIMS)) {
    const rec = reconciled[dimKey];
    convergence[dimKey] = {
      kappa: rec.kappa, resolution: rec.resolution, agreeing_sources: rec.agreeing_sources,
      measured_sources: rec.measured_sources, missingness: rec.missingness,
    };
    if (rec.escalate) escalations.push({ dim: dimKey, resolution: rec.resolution, dim_type: rec.dim_type });
  }

  // Reference arithmetic per-class scores (the geometric soft-AND INSTALL + confidence-aware
  // routing is in decide()). Kept for transparency / comparison with the v21 path.
  const per_class_scores = {
    install: scoreClass("INSTALL", normalized, evidence),
    pattern_study: scoreClass("PATTERN-STUDY", normalized, evidence),
    cite_only: scoreClass("CITE-ONLY", normalized, evidence),
    monitor: scoreClass("MONITOR", normalized, evidence),
  };

  // §4 DECISION plane — confidence-aware soft routing (BLOCK-veto -> ceilings -> geometric
  // soft-AND INSTALL + confidence-aware threshold -> route-DOWN -> path_to_higher_tier).
  const decision = decide({ dims, normalized, evidence, convergence_confidence: conf.convergence_confidence, escalations });

  return {
    schema_version: SCHEMA_VERSION,
    weights_profile: WEIGHTS_PROFILE,
    repo: `${owner}/${name}`,
    evaluated_at: new Date().toISOString(),
    dims,
    convergence,
    convergence_confidence: conf.convergence_confidence,
    confidence_band: conf.band,
    coverage: conf.coverage,
    agreement: conf.agreement,
    per_class_scores,
    tier: decision.tier,
    decision_scores: decision.scores,
    effective_install_threshold: decision.effective_install_threshold ?? null,
    hard_filter_violations: decision.hard_filter_violations || [],
    ceilings: decision.ceilings || [],
    ceiling_applied: decision.ceiling_applied ?? null,
    escalations,
    escalation_triggers: decision.escalation_triggers || [],
    path_to_higher_tier: decision.path_to_higher_tier ?? null,
    monitor: decision.monitor ?? null,
    fetcher_versions,
    lineage: { supersedes: "sca-v21-mvp", design_doc: "docs/architecture/W384-RESEARCH-ARCH-V22/DESIGN.md", phase: "P3" },
  };
}

// CLI entry — Windows-safe direct-invocation guard (matches sca-evaluate.mjs).
const _invokedDirectly =
  process.argv[1] && resolve(fileURLToPath(import.meta.url)) === resolve(process.argv[1]);
if (_invokedDirectly) {
  const { values } = parseArgs({
    options: {
      repo: { type: "string" },
      "no-ledger": { type: "boolean", default: false },
      "no-cache": { type: "boolean", default: false },
    },
  });
  if (!values.repo || !values.repo.includes("/")) {
    console.error("usage: evaluate-v22.mjs --repo owner/name [--no-ledger] [--no-cache]");
    process.exit(2);
  }
  const [owner, name] = values.repo.split("/");
  const verdict = await evaluateRepoV22(owner, name, { noCache: values["no-cache"] });
  if (!values["no-ledger"]) await appendVerdict(verdict);
  process.stdout.write(JSON.stringify(verdict, null, 2) + "\n");
}
