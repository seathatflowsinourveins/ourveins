#!/usr/bin/env node
// tools/sota-discovery/sca-evaluate.mjs
// W380 sca-v21-MVP executable scorer (R-IMPL — the gap all 4 research streams + codex converged
// on: "the architecture is a rubric + ledger with nothing between"). Composes the 4 core-4
// fetchers (deps.dev, osv.dev, OSSF Scorecard, GitHub GraphQL) → normalizes dims → per-class
// scores via FROZEN v20 weights → 5-tier soft-gate routing → verdict JSON → append to ledger.
//
// Codex W380-r1 convergence encoded:
//  - P0: weights FROZEN; capture RAW only; calibration deferred to 50-repo backtest.
//  - MISSED_HIGH_VALUE: every dim carries missingness; unknown ≠ clean (neutral 0.5 + recorded).
//  - P1: fetcher errors degrade explicitly (recorded in fetcher_versions), do NOT crash.
//  - Q5 MVP scope: core-4 endpoints + D20/D21/D22 + D08-reframe; D23/D24 and fitted calibration
//    deferred to v21.1.
//
// Usage: node sca-evaluate.mjs --repo owner/name [--no-ledger] [--no-cache]

import { parseArgs } from "node:util";
import { fileURLToPath } from "node:url";
import { resolve } from "node:path";
import {
  DIMS, MISSINGNESS, SCHEMA_VERSION, WEIGHTS_PROFILE,
  makeEvidence, scoreClass, routeTier, computeConfidence, normalizeDim,
} from "./lib/contract.mjs";
import { makeFetchJson } from "./lib/http.mjs";
import { appendVerdict } from "./lib/ledger.mjs";

const FETCHER_NAMES = ["github-graphql", "depsdev", "osv", "scorecard"];

function camel(name) {
  return name
    .split("-")
    .map((s) => s[0].toUpperCase() + s.slice(1))
    .join("");
}

async function loadFetcher(name) {
  try {
    const mod = await import(`./lib/fetchers/${name}.mjs`);
    const fnName = `fetch${camel(name)}`;
    const fn = mod[fnName] || mod.default;
    return typeof fn === "function" ? fn : null;
  } catch {
    return null; // honest absence — registered dims will be NOT_MEASURABLE
  }
}

export async function evaluateRepo(owner, name, opts = {}) {
  const fetchJson = opts.fetchJson || (await makeFetchJson({ noCache: opts.noCache }));
  const ctx = { fetchJson, cache: null };

  const settled = await Promise.allSettled(
    FETCHER_NAMES.map(async (n) => {
      const fn = await loadFetcher(n);
      if (!fn) return { _missing_fetcher: n, dims: {}, evidence: {} };
      return await fn(owner, name, ctx);
    }),
  );

  const dims = {};
  const evidence = {};
  const fetcher_versions = {};
  for (let i = 0; i < FETCHER_NAMES.length; i++) {
    const fname = FETCHER_NAMES[i];
    const r = settled[i];
    if (r.status === "fulfilled") {
      const v = r.value || {};
      Object.assign(dims, v.dims || {});
      Object.assign(evidence, v.evidence || {});
      fetcher_versions[fname] = v._missing_fetcher
        ? "absent"
        : v.version || "unstamped";
    } else {
      fetcher_versions[fname] = `error: ${String(r.reason).slice(0, 80)}`;
    }
  }

  // Every registered dim MUST have an EvidenceAnchor (honest missingness — codex MISSED_HIGH_VALUE).
  for (const dimKey of Object.keys(DIMS)) {
    if (!evidence[dimKey]) {
      evidence[dimKey] = makeEvidence(null, {
        source_class: "CLASS-A",
        source_uri: "n/a",
        missingness: MISSINGNESS.NOT_MEASURABLE,
      });
    }
  }

  // Normalize then score per class (FROZEN v20 cluster weights per codex P0).
  const normalized = {};
  for (const dimKey of Object.keys(DIMS)) {
    normalized[dimKey] = normalizeDim(dimKey, dims[dimKey]);
  }
  const per_class_scores = {
    install:       scoreClass("INSTALL", normalized, evidence),
    pattern_study: scoreClass("PATTERN-STUDY", normalized, evidence),
    cite_only:     scoreClass("CITE-ONLY", normalized, evidence),
    monitor:       scoreClass("MONITOR", normalized, evidence),
  };

  const routing = routeTier(dims, evidence, per_class_scores);

  const measuredCount = Object.keys(DIMS).filter(
    (k) => evidence[k]?.missingness === MISSINGNESS.MEASURED,
  ).length;
  const measured_ratio = measuredCount / Object.keys(DIMS).length;

  return {
    schema_version: SCHEMA_VERSION,
    weights_profile: WEIGHTS_PROFILE,
    repo: `${owner}/${name}`,
    evaluated_at: new Date().toISOString(),
    dims,
    evidence,
    per_class_scores,
    tier: routing.tier,
    hard_filter_violations: routing.hard_filter_violations || [],
    confidence: computeConfidence(evidence),
    measured_ratio,
    fetcher_versions,
    lineage: {
      supersedes: "sca-v20-multi-dim",
      design_doc: "docs/architecture/W380-RESEARCH-ARCH-V21/SYNTHESIS.md",
      codex_round: "W380-r1-converged-MVP",
    },
  };
}

// CLI entry — only when invoked directly. Compare resolved fs paths (robust on Windows where
// import.meta.url is file:///Z:/... triple-slash; naive string-concat mismatched and skipped main).
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
    console.error("usage: sca-evaluate.mjs --repo owner/name [--no-ledger] [--no-cache]");
    process.exit(2);
  }
  const [owner, name] = values.repo.split("/");
  const verdict = await evaluateRepo(owner, name, { noCache: values["no-cache"] });
  if (!values["no-ledger"]) await appendVerdict(verdict);
  process.stdout.write(JSON.stringify(verdict, null, 2) + "\n");
}
