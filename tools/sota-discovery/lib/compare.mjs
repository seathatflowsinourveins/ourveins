// tools/sota-discovery/lib/compare.mjs
// sca-v22 COMPARISON plane (§5) — peer-relative "X beats Y because…". Pure analysis over a set of
// sca-v22 verdicts: peer-set validity safeguards -> Pareto-dominance frontier -> TOPSIS scalar
// tiebreak (cluster-weights as criteria weights) with ELECTRE-veto on NON-COMPENSABLE hard-filter
// dims (license / KEV / egress) -> dim-by-dim winner report. Stars stay informational-only.
// Emulates wshobson/agents `PluginEval compare`. Cite: Hwang&Yoon (TOPSIS) / Roy (ELECTRE) / Pareto.

import { DIMS, CLUSTER_WEIGHTS, MISSINGNESS, normalizeDim, clusterMeans } from "./contract.mjs";

const MIN_PEER_SET = 3;
const COVERAGE_FLOOR = 0.5; // a criterion must be MEASURED for >= half the peers to rank on it (§5)
// Strict-improvement dims for Pareto + the dim-by-dim report (the design's D20/D21/D13 + quality).
const KEY_DIMS = ["D13_cc_install_path", "D20_transitive_dep_health", "D21_reverse_dependents", "D10_test_coverage_pct", "D11_ci_green_streak_days", "D18_arch_relevance"];
// Non-compensable hard-filter dims (ELECTRE veto): a fail here can't be outweighed by other strengths.
const VETO_DIMS = ["D07_license_class", "D22_osv_cve", "D23_data_egress"];

const round = (n) => (Number.isFinite(n) ? Math.round(n * 1000) / 1000 : n);

// A dim is comparable ONLY when reconciled to MEASURED (codex P4 #1 — a NOT_MEASURABLE or
// CONFLICTING dim must not dominate a pairwise comparison or win a dim-by-dim report).
function isMeasured(verdict, dim) {
  const conv = verdict.convergence && verdict.convergence[dim];
  if (conv) return conv.missingness === MISSINGNESS.MEASURED;
  return !!(verdict.dims && verdict.dims[dim] != null); // fallback when no convergence block present
}
function measuredKeyNorm(verdict, dim) {
  if (!isMeasured(verdict, dim)) return null;
  return normalizeDim(dim, verdict.dims ? verdict.dims[dim] : null);
}

// Recompute the per-cluster means from a verdict (uses its dims + per-dim missingness from the
// convergence block — so an unmeasured/conflicting dim contributes the neutral 0.5, same as scoring).
export function verdictClusterMeans(verdict) {
  const normalized = {}, evidence = {};
  for (const dimKey of Object.keys(DIMS)) {
    const value = verdict.dims ? verdict.dims[dimKey] : null;
    normalized[dimKey] = normalizeDim(dimKey, value);
    const conv = verdict.convergence && verdict.convergence[dimKey];
    const miss = conv ? conv.missingness : (value == null ? MISSINGNESS.NOT_MEASURABLE : MISSINGNESS.MEASURED);
    evidence[dimKey] = { missingness: miss };
  }
  return clusterMeans(normalized, evidence);
}

function roleOf(verdict) {
  const p = verdict.dims && verdict.dims.D13_cc_install_path;
  if (["plugin", "mcp-server"].includes(p)) return "cc-primitive";
  if (["sdk-python", "sdk-typescript"].includes(p)) return "sdk";
  if (["cli-only", "library-only"].includes(p)) return "library";
  return p || "unknown";
}

// Peer-set validity safeguards (codex r1 on the design: bad grouping dominates TOPSIS/ELECTRE).
export function validatePeerSet(verdicts) {
  const warnings = [];
  if (verdicts.length < MIN_PEER_SET) warnings.push(`peer-set size ${verdicts.length} < ${MIN_PEER_SET} (rankings are low-confidence)`);
  const roles = [...new Set(verdicts.map(roleOf))];
  if (roles.length > 1) warnings.push(`peer set mixes roles {${roles.join(", ")}} — comparison may be apples-to-oranges`);
  // §5 measured-coverage floor per criterion: don't rank on mostly-NOT_MEASURABLE dims (codex P4 #2).
  const coverage = {};
  for (const d of KEY_DIMS) {
    const measured = verdicts.filter((v) => isMeasured(v, d)).length;
    coverage[d] = verdicts.length ? measured / verdicts.length : 0;
  }
  const rankable = KEY_DIMS.filter((d) => coverage[d] >= COVERAGE_FLOOR);
  if (rankable.length === 0) warnings.push(`no key criterion meets the measured-coverage floor ${COVERAGE_FLOOR} — ranking not meaningful`);
  const valid = verdicts.length >= MIN_PEER_SET && roles.length <= 1 && rankable.length > 0;
  return { valid, size: verdicts.length, roles, coverage, rankable, warnings };
}

function vetoFailures(verdict) {
  const out = [];
  const d = verdict.dims || {};
  if (d.D07_license_class && d.D07_license_class !== "permissive") out.push({ dim: "D07_license_class", value: d.D07_license_class });
  if (d.D22_osv_cve && d.D22_osv_cve.cisa_kev_active === true) out.push({ dim: "D22_osv_cve", value: "kev-active" });
  if (d.D23_data_egress === "cloud-mandatory") out.push({ dim: "D23_data_egress", value: "cloud-mandatory" });
  return out;
}

// X Pareto-dominates Y iff X >= Y on every key dim measured in BOTH, and X > Y on at least one.
function dominates(x, y) {
  let geAll = true, gtAny = false, comparable = 0;
  for (const d of KEY_DIMS) {
    const xv = x.keyNorms[d], yv = y.keyNorms[d];
    if (xv == null || yv == null) continue;
    comparable++;
    if (xv < yv) { geAll = false; break; }
    if (xv > yv) gtAny = true;
  }
  return comparable > 0 && geAll && gtAny;
}

// TOPSIS over the weighted cluster means (all benefit criteria). Returns peers ranked by the
// closeness coefficient Ci = dWorst / (dBest + dWorst), descending.
function topsisRank(peers, weights) {
  const crits = Object.keys(weights).filter((c) => weights[c] > 0);
  if (!peers.length || !crits.length) return peers.map((p, i) => ({ repo: p.repo, closeness: 0, rank: i + 1 }));
  const mat = peers.map((p) => crits.map((c) => (p.means[c] != null ? p.means[c] : 0.5)));
  const colNorm = crits.map((_, j) => Math.sqrt(mat.reduce((s, row) => s + row[j] * row[j], 0)) || 1);
  const weighted = mat.map((row) => row.map((v, j) => (v / colNorm[j]) * weights[crits[j]]));
  const best = crits.map((_, j) => Math.max(...weighted.map((r) => r[j])));
  const worst = crits.map((_, j) => Math.min(...weighted.map((r) => r[j])));
  const scored = peers.map((p, i) => {
    const dBest = Math.sqrt(weighted[i].reduce((s, v, j) => s + (v - best[j]) ** 2, 0));
    const dWorst = Math.sqrt(weighted[i].reduce((s, v, j) => s + (v - worst[j]) ** 2, 0));
    const closeness = dBest + dWorst === 0 ? 0 : dWorst / (dBest + dWorst);
    return { repo: p.repo, closeness };
  });
  scored.sort((a, b) => b.closeness - a.closeness);
  scored.forEach((s, i) => { s.rank = i + 1; });
  return scored;
}

function dimWinners(peers) {
  const out = {};
  for (const d of KEY_DIMS) {
    let winner = null, best = -Infinity;
    for (const p of peers) {
      const v = p.keyNorms[d];
      if (v != null && v > best) { best = v; winner = p.repo; }
    }
    if (winner != null) out[d] = { winner, normalized: round(best) };
  }
  return out;
}

/**
 * Compare a peer set of sca-v22 verdicts.
 * @param {object[]} verdicts  sca-v22 verdicts (each has .repo, .dims, .convergence, .tier, .convergence_confidence)
 * @param {{weights?:object}} [opts]  TOPSIS criteria weights (default: INSTALL cluster weights)
 * @returns {object} { peer_set, pareto_frontier, topsis, ranking, dim_winners, recommendation }
 */
export function comparePeers(verdicts, opts = {}) {
  const weights = opts.weights || CLUSTER_WEIGHTS.INSTALL;
  const peers = (verdicts || []).map((v) => ({
    repo: v.repo,
    means: verdictClusterMeans(v),
    keyNorms: Object.fromEntries(KEY_DIMS.map((d) => [d, measuredKeyNorm(v, d)])), // MEASURED-only (codex P4 #1)
    veto: vetoFailures(v),
  }));

  const peer_set = validatePeerSet(verdicts || []);
  const pareto = peers.filter((a) => !peers.some((b) => b !== a && dominates(b, a)));
  const topsis = topsisRank(peers, weights);

  // ELECTRE veto: peers with a non-compensable hard-filter fail rank BELOW all clean peers.
  const vetoByRepo = Object.fromEntries(peers.map((p) => [p.repo, p.veto]));
  const withVeto = topsis.map((t) => ({ repo: t.repo, closeness: round(t.closeness), veto: vetoByRepo[t.repo] || [] }));
  const ranking = [
    ...withVeto.filter((x) => x.veto.length === 0),
    ...withVeto.filter((x) => x.veto.length > 0),
  ];

  return {
    peer_set,
    pareto_frontier: pareto.map((p) => p.repo),
    // topsis.rank is the PRE-veto TOPSIS order; `ranking[].rank` below is the FINAL post-veto order.
    topsis: topsis.map((t) => ({ repo: t.repo, closeness: round(t.closeness), topsis_rank: t.rank })),
    ranking: ranking.map((r, i) => ({ rank: i + 1, repo: r.repo, closeness: r.closeness, veto: r.veto.map((x) => x.dim) })),
    dim_winners: dimWinners(peers),
    recommendation: buildRecommendation(ranking, peer_set, pareto),
  };
}

function buildRecommendation(ranking, peer_set, pareto) {
  if (!ranking.length) return "no peers to compare";
  const top = ranking[0];
  const vetoNote = top.veto.length ? ` (NOTE: top peer has non-compensable fails on ${top.veto.map((x) => x.dim).join(", ")})` : "";
  const conf = peer_set.valid ? "" : ` [LOW CONFIDENCE: ${peer_set.warnings.join("; ")}]`;
  return `top peer ${top.repo}${vetoNote}; Pareto frontier {${pareto.map((p) => p.repo).join(", ")}}${conf}`;
}

// CLI — evaluate N repos via the v22 path, then compare. Windows-safe direct-invocation guard.
const _invokedDirectly =
  process.argv[1] && (await import("node:path")).resolve(process.argv[1]) === (await import("node:url")).fileURLToPath(import.meta.url);
if (_invokedDirectly) {
  const { parseArgs } = await import("node:util");
  const { values } = parseArgs({ options: { repos: { type: "string" }, "no-cache": { type: "boolean", default: false } } });
  if (!values.repos) { console.error("usage: compare.mjs --repos owner/a,owner/b,owner/c [--no-cache]"); process.exit(2); }
  const { evaluateRepoV22 } = await import("../evaluate-v22.mjs");
  const repos = values.repos.split(",").map((s) => s.trim()).filter(Boolean);
  const verdicts = [];
  for (const r of repos) {
    const [o, n] = r.split("/");
    if (o && n) verdicts.push(await evaluateRepoV22(o, n, { noCache: values["no-cache"] }));
  }
  process.stdout.write(JSON.stringify(comparePeers(verdicts), null, 2) + "\n");
}
