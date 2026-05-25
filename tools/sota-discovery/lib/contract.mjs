// tools/sota-discovery/lib/contract.mjs
// sca-v21-MVP shared contract — the single source of truth for the executable SOTA-repo scorer.
//
// Codex GPT-5.5 W380-r1 convergence (REVISE@0.86 -> MVP) is encoded here:
//   * P0 — weights are FROZEN at the v20 defaults. We do NOT fit cluster-multipliers on the
//     n=12 historical set (it never used v20 -> overfit). Calibration is deferred to a 50-repo
//     stratified backtest; until then this module captures RAW evidence only.
//   * MISSED_HIGH_VALUE — every dimension carries an evidence-quality/missingness tag ALONGSIDE
//     its value, so "clean", "not-measurable", and "conflicting" never collapse to one neutral
//     number.
//   * MVP scope (Q5) — core-4 endpoints (GitHub GraphQL, deps.dev, osv.dev, OSSF Scorecard) feed
//     D20/D21/D22 + the D08 provenance reframe; D23/D24 + fitted calibration + discovery-protocol
//     are deferred to v21.1.
//
// Lineage: strict superset of sca-v20-multi-dim (docs/architecture/W380-RESEARCH-ARCH-V21/
// sca-v20-lineage-reference.schema.json). Per-decision-class scoring preserves the Pareto frontier
// (NO single scalar). Stars stay informational-only.

export const SCHEMA_VERSION = "sca-v21-mvp";
export const WEIGHTS_PROFILE = "v20-frozen-2026-05-23"; // codex W380-r1 P0: do NOT fit on n=12

// ---------------------------------------------------------------------------
// Evidence quality / missingness (codex W380-r1 MISSED_HIGH_VALUE)
// ---------------------------------------------------------------------------
export const MISSINGNESS = Object.freeze({
  MEASURED: "measured", // value obtained from a real source
  NOT_MEASURABLE: "not-measurable", // source absent or N/A for this repo
  CONFLICTING: "conflicting", // ≥2 sources disagree beyond tolerance
});

export const SOURCE_CLASS = Object.freeze({
  A: "CLASS-A", // raw deterministic (github-graphql, deps.dev, osv, scorecard, repomix)
  B: "CLASS-B", // LLM-judge (perplexity, exa, firecrawl)
  C: "CLASS-C", // AI-on-repo + academic (deepwiki, hf-papers)
});

// ---------------------------------------------------------------------------
// Dimension registry — v20 required subset + v21-MVP additions (D20/D21/D22)
// hardFilter: a fail downgrades OUT of that class. hardBlock: a fail -> BLOCK tier.
// ---------------------------------------------------------------------------
export const DIMS = Object.freeze({
  // Cluster II — Activity
  D04_last_commit_days: { cluster: "II", kind: "int", informational: false },
  D05_contributors_90d: { cluster: "II", kind: "int" },
  // Cluster III — Trust
  D07_license_class: { cluster: "III", kind: "enum", hardFilter: "INSTALL" },
  D08_provenance: { cluster: "III", kind: "enum" }, // v21 REFRAME (see PROVENANCE)
  D22_osv_cve: { cluster: "III", kind: "obj", hardBlock: "cisa_kev", source: "osv.dev" }, // NEW
  // Cluster IV — Quality
  D10_test_coverage_pct: { cluster: "IV", kind: "ratio" },
  D11_ci_green_streak_days: { cluster: "IV", kind: "int" },
  D12_doc_completeness: { cluster: "IV", kind: "ratio" },
  // Cluster V — Claude Code runtime fit
  D13_cc_install_path: { cluster: "V", kind: "enum", hardFilter: "INSTALL" },
  D14_cc_pattern_density: { cluster: "V", kind: "ratio" },
  D15_cc_cite_anchor_density: { cluster: "V", kind: "ratio" },
  // Cluster VI — Production-readiness
  D17_pinning_discipline: { cluster: "VI", kind: "enum", hardFilter: "INSTALL" },
  D20_transitive_dep_health: { cluster: "VI", kind: "ratio", source: "deps.dev/v3" }, // NEW
  // Cluster VII — Architectural relevance
  D18_arch_relevance: { cluster: "VII", kind: "ratio" },
  // Cluster VIII — Community
  D19_community_mentions: { cluster: "VIII", kind: "int" },
  D21_reverse_dependents: { cluster: "VIII", kind: "int", source: "deps.dev+ossf-criticality" }, // NEW
});

// D08 provenance reframe (Stream A — TanStack 2026-05-11: 84 malicious pkgs WITH valid SLSA-L3).
// Provenance is NECESSARY EVIDENCE, not SUFFICIENT TRUST. Bare "present" -> neutral, not pass.
export const PROVENANCE = Object.freeze({
  VERIFIED_CLEAN: "verified-and-preflight-clean", // signed AND OSV/Scorecard pre-flight clean -> pass
  PRESENT_UNVERIFIED: "present-unverified", // attestation exists but not pre-flight-clean -> NEUTRAL
  ABSENT: "absent",
  CLAIMED_NOT_VERIFIED: "claimed-not-verified", // worse than absent (Stream A) -> downgrade
});

// ---------------------------------------------------------------------------
// FROZEN per-decision-class cluster weights (v20 defaults; sum≈1 per class).
// Codex W380-r1 P0: these are NOT tuned on n=12. They mirror the v20 §2 profiles:
//   INSTALL: trust+prod-readiness+activity heavy, stars=0.
//   PATTERN-STUDY: cc-runtime-fit heavy (pattern density highest).
//   CITE-ONLY: cite-anchor + doc + deepwiki heavy.
//   MONITOR: drift signals; stars/community non-zero ONLY here.
// ---------------------------------------------------------------------------
export const CLUSTER_WEIGHTS = Object.freeze({
  INSTALL: { I: 0.0, II: 0.18, III: 0.27, IV: 0.2, V: 0.15, VI: 0.15, VII: 0.05, VIII: 0.0 },
  "PATTERN-STUDY": { I: 0.0, II: 0.1, III: 0.1, IV: 0.15, V: 0.45, VI: 0.0, VII: 0.15, VIII: 0.05 },
  "CITE-ONLY": { I: 0.0, II: 0.05, III: 0.1, IV: 0.2, V: 0.45, VI: 0.0, VII: 0.1, VIII: 0.1 },
  // codex W380-r2 P2: no Cluster-I dims exist in the MVP DIMS registry, so the prior I:0.25
  // injected a dead neutral 0.125. Zeroed + redistributed into the real drift clusters
  // (II activity, VI prod-readiness, VIII community). Sum preserved = 1.0.
  MONITOR: { I: 0.0, II: 0.35, III: 0.15, IV: 0.05, V: 0.0, VI: 0.15, VII: 0.0, VIII: 0.3 },
});

// ---------------------------------------------------------------------------
// Fetcher interface contract (what every lib/fetchers/*.mjs MUST return).
// A fetcher is: async (owner, name, ctx) => FetcherResult
//   ctx: { cache, fetchJson }  (injected; fetchJson does the HTTP + cache)
//   FetcherResult: {
//     dims:    { [dimKey]: value | null },        // null when not measurable
//     evidence:{ [dimKey]: EvidenceAnchor },        // REQUIRED for every dim it reports
//   }
//   EvidenceAnchor: { value, source_class, source_uri, measured_at, missingness }
// v21 (sca-evaluate.mjs): each fetcher owns a DISJOINT subset of DIMS (last-writer-wins on any
// accidental overlap). v22 (evaluate-v22.mjs): fetchers MAY intentionally OVERLAP a dim (e.g.
// D07 = github-graphql SPDX + license-read text; D21 = depsdev + ecosystems) — evaluate-v22
// collects every source's observation per dim and the convergence engine reconciles them (κ).
// ---------------------------------------------------------------------------
export function makeEvidence(value, { source_class, source_uri, missingness }) {
  return {
    value,
    source_class,
    source_uri,
    measured_at: new Date().toISOString(),
    missingness: missingness || (value == null ? MISSINGNESS.NOT_MEASURABLE : MISSINGNESS.MEASURED),
  };
}

// ---------------------------------------------------------------------------
// Per-class scoring. Each dim normalized to [0,1] by normalizeDim(); a dim with
// missingness != MEASURED contributes its cluster weight at a NEUTRAL 0.5 but is
// recorded so confidence can be discounted (codex: never silently treat unknown as clean/zero).
// ---------------------------------------------------------------------------
// Per-cluster neutral-aware mean of dim contributions. CLASS-INDEPENDENT — only the WEIGHTS
// differ per class — so it is computed once and reused by the arithmetic scoreClass (all classes)
// and by the v22 geometric soft-AND INSTALL combiner. A dim with missingness != MEASURED (or null
// norm) contributes a NEUTRAL 0.5 (unknown != clean; recorded, not assumed).
export function clusterMeans(normalizedDims, evidence) {
  const acc = {}; // cluster -> {sum, n}
  for (const [dimKey, meta] of Object.entries(DIMS)) {
    const ev = evidence[dimKey];
    const norm = normalizedDims[dimKey];
    const contribution = (!ev || ev.missingness !== MISSINGNESS.MEASURED || norm == null)
      ? 0.5
      : Math.max(0, Math.min(1, norm));
    const c = meta.cluster;
    (acc[c] ||= { sum: 0, n: 0 });
    acc[c].sum += contribution;
    acc[c].n += 1;
  }
  const means = {};
  for (const [c, a] of Object.entries(acc)) means[c] = a.n ? a.sum / a.n : 0.5;
  return means;
}

export function scoreClass(decisionClass, normalizedDims, evidence) {
  const w = CLUSTER_WEIGHTS[decisionClass];
  if (!w) throw new Error(`unknown decision class: ${decisionClass}`);
  const means = clusterMeans(normalizedDims, evidence);
  let score = 0;
  for (const [cluster, weight] of Object.entries(w)) {
    if (!weight) continue;
    score += weight * (means[cluster] != null ? means[cluster] : 0.5);
  }
  return Math.max(0, Math.min(1, score));
}

// ---------------------------------------------------------------------------
// 5-tier soft-gate routing (inherits v20: hard-BLOCK first, then route DOWN only).
// dims: raw values; evidence: anchors; scores: per-class scores from scoreClass().
// ---------------------------------------------------------------------------
// The ONLY two hard BLOCK vetoes (sca-v22 §4 precedence step 1): a real active CISA-KEV vuln,
// or a verified-proprietary license. Returns the violation object, or null. Extracted so the
// v22 decision pipeline (lib/decision.mjs) reuses the exact same veto.
export function blockViolation(dims) {
  const osv = dims.D22_osv_cve;
  if (osv && osv.cisa_kev_active === true) {
    return { dim: "D22_osv_cve", blocked_class: "INSTALL", reason: "active CISA-KEV vuln" };
  }
  if (dims.D07_license_class === "proprietary") {
    return { dim: "D07_license_class", blocked_class: "INSTALL", reason: "proprietary license" };
  }
  return null;
}

// INSTALL hard-filters: a fail downgrades OUT of INSTALL (the repo can still PATTERN-STUDY /
// CITE-ONLY). POSITIVE evidence required — unknown != clean (codex W380-r2 P1). Note (W380 live-e2e):
// GitHub licenseInfo returns NOASSERTION for many legitimately-licensed repos; noassertion is NOT a
// hard-BLOCK — it fails this INSTALL filter but the repo can still study/cite. (The v22 license-read
// fetcher adds a 2nd D07 source to disambiguate NOASSERTION.)
export function installHardFilterViolations(dims) {
  const violations = [];
  const installable = ["plugin", "mcp-server", "sdk-python", "sdk-typescript"];
  if (!installable.includes(dims.D13_cc_install_path)) {
    violations.push({ dim: "D13_cc_install_path", blocked_class: "INSTALL", reason: `${dims.D13_cc_install_path} not a CC-installable primitive` });
  }
  if (dims.D07_license_class !== "permissive") {
    violations.push({ dim: "D07_license_class", blocked_class: "INSTALL", reason: `license ${dims.D07_license_class ?? "unmeasured"} not verified-permissive` });
  }
  const exactPins = ["image-digest-sha256", "git-commit-sha", "npm-exact-version", "uvx-exact-version"];
  if (!exactPins.includes(dims.D17_pinning_discipline)) {
    violations.push({ dim: "D17_pinning_discipline", blocked_class: "INSTALL", reason: `pinning ${dims.D17_pinning_discipline ?? "unmeasured"} not exact` });
  }
  return violations;
}

export function routeTier(dims, evidence, scores, { installThreshold = 0.6, patternThreshold = 0.55, citeThreshold = 0.5 } = {}) {
  const block = blockViolation(dims);
  if (block) return { tier: "BLOCK", hard_filter_violations: [block] };
  const violations = installHardFilterViolations(dims);
  const installOk = violations.length === 0 && scores.install >= installThreshold;
  if (installOk) return { tier: "INSTALL", hard_filter_violations: violations };
  if (scores.pattern_study >= patternThreshold) return { tier: "PATTERN-STUDY", hard_filter_violations: violations };
  if (scores.cite_only >= citeThreshold) return { tier: "CITE-ONLY", hard_filter_violations: violations };
  return { tier: "MONITOR", hard_filter_violations: violations };
}

// Confidence = discounted by measured-evidence ratio (codex: unknown != clean).
export function computeConfidence(evidence) {
  const keys = Object.keys(DIMS);
  const measured = keys.filter((k) => evidence[k] && evidence[k].missingness === MISSINGNESS.MEASURED).length;
  const ratio = measured / keys.length;
  if (ratio >= 0.85) return "HIGH";
  if (ratio >= 0.7) return "MEDIUM-HIGH";
  if (ratio >= 0.5) return "MEDIUM";
  if (ratio >= 0.3) return "MEDIUM-LOW";
  return "LOW";
}

// ---------------------------------------------------------------------------
// Normalize a raw dim value to [0,1] for cluster scoring. Thresholds mirror v20 §2.
// (Relocated from sca-evaluate.mjs in sca-v22 P2-beta so both the v21 and v22 evaluate paths
// share one normalizer. Behavior-identical to the v21 definition.)
// ---------------------------------------------------------------------------
export function normalizeDim(dimKey, raw) {
  if (raw == null) return null;
  switch (dimKey) {
    case "D04_last_commit_days": return Math.max(0, 1 - raw / 365);
    case "D05_contributors_90d": return Math.min(1, raw / 10);
    case "D07_license_class":
      return raw === "permissive" ? 1 : raw === "copyleft" ? 0.5 : 0;
    case "D08_provenance":
      return raw === "verified-and-preflight-clean" ? 1
        : raw === "present-unverified" ? 0.5
        : raw === "absent" ? 0.3
        : 0; // claimed-not-verified WORSE than absent (Stream A)
    case "D10_test_coverage_pct": return raw;
    case "D11_ci_green_streak_days": return Math.min(1, raw / 30);
    case "D12_doc_completeness": return raw;
    case "D13_cc_install_path":
      return ["plugin", "mcp-server", "sdk-python", "sdk-typescript"].includes(raw) ? 1
        : ["cli-only", "library-only"].includes(raw) ? 0.5
        : 0;
    case "D14_cc_pattern_density": return raw;
    case "D15_cc_cite_anchor_density": return raw;
    case "D17_pinning_discipline":
      return ["image-digest-sha256", "git-commit-sha", "npm-exact-version", "uvx-exact-version"].includes(raw) ? 1
        : raw === "version-range" ? 0.5
        : 0;
    case "D18_arch_relevance": return raw;
    case "D19_community_mentions": return Math.min(1, raw / 10);
    case "D20_transitive_dep_health": return raw;
    case "D21_reverse_dependents": return Math.min(1, Math.log10(Math.max(1, raw)) / 4); // ~10k=1.0
    case "D22_osv_cve": {
      if (!raw || typeof raw !== "object") return null;
      if (raw.cisa_kev_active === true) return 0; // real KEV veto -> hard 0 (also BLOCKs in routeTier)
      // Non-KEV: density base with a CVSS-critical SCORE PENALTY (codex P2-beta #1 — CVSS-critical
      // is a penalty, not a veto). cisa_kev_active null (UNKNOWN) does NOT force 0 — honest.
      const base = 1 - Math.min(1, raw.density || 0);
      const critPenalty = 1 - 0.2 * Math.min(1, (raw.critical_count || 0) / 3);
      return base * critPenalty;
    }
    default: return 0.5;
  }
}
