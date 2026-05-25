// tools/research-arch-v23/convergence-engine.mjs
// Convergence engine — orchestrates all 7 sca-v23 research angles + scores 12 dims + computes CVS + assigns tier + invokes codex (optional).
// Cite-anchor: docs/architecture/SOTA-RESEARCH-ARCH-V23/DESIGN.md §2.1-2.4 (on parallel branch PR #149).
// Per soul.md §6 fail-CLOSED: verdict requires ≥3 LIVE angles (per sca-v23 §2.1 convergence rule); throws if insufficient.

import {probeRegistry} from './angles/registry-angle.mjs';
import {probeDeepwiki} from './angles/deepwiki-angle.mjs';
import {probeRepomix} from './angles/repomix-angle.mjs';
import {runAngle as probePerplexity} from './angles/perplexity-angle.mjs';
import {runAngle as probeExa} from './angles/exa-angle.mjs';
import {runAngle as probeFirecrawl} from './angles/firecrawl-angle.mjs';
import {runAngle as probeTavily} from './angles/tavily-angle.mjs';
import {probeTrust} from './trust-probe.mjs';
import {computeCVS, decisionTier, TIERS} from './scoring-rubric.mjs';

const DEFAULT_MIN_LIVE_ANGLES = 3;

/**
 * Adapt W442 angle result shape ({angleId, score, evidence, skipped, error})
 * to convergence-engine expected shape ({name, normalized_score, weight, skipped, reason}).
 * @param {Promise<Object>} anglePromise
 * @param {string} angleName
 * @param {number} weight
 * @returns {Promise<Object>}
 */
async function adaptAngle(anglePromise, angleName, weight) {
  const result = await anglePromise;
  return {
    name: angleName,
    skipped: result.skipped,
    reason: result.error || undefined,
    normalized_score: result.score ?? 0,
    weight,
    ...(result.evidence ? {evidence: result.evidence} : {}),
  };
}

/**
 * Run full sca-v23 convergence audit for a target.
 * @param {Object} target {kind, identifier, version?}
 *   - target.version defaults to 'HEAD' if not provided (schema requires presence;
 *     'HEAD' is the canonical "unspecified" sentinel per W441.5 codex r1 REVISE).
 * @param {Object} options {mcpClient?, dryRun?, codexAdversary?, minLiveAngles?}
 *   - options.minLiveAngles: minimum live angles required for verdict (default 3 per sca-v23 §2.1).
 *     CLI mode passes 1 (registry-only triage) because Node-standalone has no MCP clients;
 *     orchestrator mode (Claude Code session w/ MCP) passes 3 for full convergence.
 *     W442 will add MCP-client-instantiation for standalone full-convergence CLI mode.
 * @returns {Promise<Object>} sca-v23 verdict object conforming to schema.
 * @throws {Error} If target.kind/identifier missing or if <minLiveAngles live angles return successfully
 *   (per sca-v23 §2.1 convergence rule, or caller-specified minLiveAngles override).
 */
export async function convergeAudit(target, options = {}) {
  // Schema conformance (W441.5 codex r1 REVISE fix #1): enforce required target fields.
  // target.kind and target.identifier are MUST per schema; target.version defaults to 'HEAD'.
  if (!target?.kind || !target?.identifier) {
    throw new Error(
      `convergeAudit: target.kind and target.identifier are required ` +
      `(per .claude/schemas/sca-v23-multi-angle-convergence.schema.json#/properties/target/required)`
    );
  }
  // W441.6 codex r1 REVISE fix #1: caller-overridable minLiveAngles.
  // Default sca-v23 §2.1 = 3; CLI mode lowers to 1 (registry-only triage) because
  // Node-standalone CLI has no MCP clients (A1/A2/A3/A4/A5/A6 all unreachable).
  const minLiveAngles = (typeof options.minLiveAngles === 'number'
    && Number.isInteger(options.minLiveAngles)
    && options.minLiveAngles >= 1)
    ? options.minLiveAngles
    : DEFAULT_MIN_LIVE_ANGLES;

  const normalizedTarget = {
    kind: target.kind,
    identifier: target.identifier,
    version: target.version || 'HEAD',
    ...(target.homepage ? {homepage: target.homepage} : {}),
    ...(target.license ? {license: target.license} : {}),
  };

  // W442 wiring: if mcpClient not provided, fall back to bridge for standalone CLI mode.
  // Pass mcpClient: null explicitly to DISABLE bridge fallback (e.g. in tests).
  let mcpClient = options.mcpClient;
  let ownedClient = null;
  if (mcpClient === undefined && !options.dryRun) {
    try {
      const bridge = await import('./mcp-client-bridge.mjs');
      ownedClient = bridge.getMcpClient();
      mcpClient = ownedClient;
    } catch (err) {
      // Bridge unavailable (e.g. Python not installed); angles will skip cleanly
      if (!options.dryRun) {
        console.warn(`[v23] bridge unavailable: ${err.message}`);
      }
    }
  }
  const effectiveOptions = {...options, mcpClient};

  // Run 7 angles + trust probes in parallel (W442: 4 stubs replaced with live calls)
  const [settled, trustResult] = await Promise.all([
    Promise.allSettled([
      probeRegistry(normalizedTarget),                                    // A7 — always live (gh CLI + npm view)
      probeDeepwiki(normalizedTarget, effectiveOptions),                  // A5 — live if mcpClient available
      probeRepomix(normalizedTarget, effectiveOptions),                   // A6 — live if mcpClient available
      adaptAngle(probePerplexity(normalizedTarget, effectiveOptions), 'A1_perplexity_sonar', 0.18),
      adaptAngle(probeExa(normalizedTarget, effectiveOptions), 'A2_exa_neural_search', 0.15),
      adaptAngle(probeFirecrawl(normalizedTarget, effectiveOptions), 'A3_firecrawl_structured_crawl', 0.12),
      adaptAngle(probeTavily(normalizedTarget, effectiveOptions), 'A4_tavily_curated_search', 0.10),
    ]),
    probeTrust(normalizedTarget).catch(err => ({
      signed_releases: false, license_safe: false,
      malicious_update_review: false, transitive_deps_clean: false,
      evidence: {error: err.message},
    })),
  ]);

  const angles = settled.map((r, i) => {
    if (r.status === 'fulfilled') return r.value;
    return {name: `angle-rejection-${i}`, skipped: true, reason: `unexpected rejection: ${r.reason?.message || String(r.reason)}`, normalized_score: 0, weight: 0};
  });

  // Convergence-rule check per sca-v23 §2.1 (default ≥3) — overridable via options.minLiveAngles
  const liveAngles = angles.filter(a => !a.skipped);
  if (liveAngles.length < minLiveAngles) {
    // W442: close owned bridge before throwing
    if (ownedClient) try { await ownedClient.close(); } catch { /* ignore */ }
    const ruleSource = minLiveAngles === DEFAULT_MIN_LIVE_ANGLES
      ? 'sca-v23 §2.1 convergence rule'
      : `caller-specified minLiveAngles=${minLiveAngles}`;
    throw new Error(
      `convergeAudit: insufficient live angles (${liveAngles.length} < ${minLiveAngles}) per ${ruleSource}. ` +
      `Skipped: ${angles.filter(a => a.skipped).map(a => `${a.name}(${a.reason || '?'})`).join('; ')}`
    );
  }

  const dims = scoreDimsFromAngles(angles, normalizedTarget);
  const cvs = computeCVS(dims);
  // W442: merge trust-probe results with registry-derived trust signals (multi-source validation)
  const registryAngle = angles.find(a => a.name === 'A7_authoritative_registry') || {};
  const registryGh = registryAngle.github_graphql_data || {};
  const registryNpm = registryAngle.npm_or_pypi_data || {};
  const registryLicense = registryGh.license || registryNpm.license;
  const trustTuple = {
    signed_releases: trustResult.signed_releases || Boolean(registryAngle.signed_attestations),
    license_safe: trustResult.license_safe || ['MIT','Apache-2.0','BSD-3-Clause','BSD-2-Clause','ISC','MPL-2.0'].includes(registryLicense),
    malicious_update_review: trustResult.malicious_update_review,
    transitive_deps_clean: trustResult.transitive_deps_clean,
  };
  const tier = decisionTier(cvs, trustTuple);

  // Optional codex adversarial review.
  // Schema requires codex_verdict as an object (NOT null) per W441.5 codex r1 REVISE fix #2.
  // Opt-out path returns a structured SKIPPED sentinel; live path delegates to caller.
  const codexVerdict = options.codexAdversary
    ? await options.codexAdversary(normalizedTarget, dims, {includePaths: options.includePaths})
    : {
        model: null,
        round: 0,
        verdict: 'SKIPPED',
        log_path: null,
        rationale: 'codexAdversary opt-out: convergeAudit called without options.codexAdversary',
      };

  // W442: close owned bridge after all angle + trust probes complete
  if (ownedClient && typeof ownedClient.close === 'function') {
    try { await ownedClient.close(); } catch { /* ignore */ }
  }

  return {
    schema_version: 'sca-v23',
    target: normalizedTarget,
    research_angles: Object.fromEntries(angles.map(a => [a.name, a])),
    scoring_dims: dims,
    composite_verdict_score: Number(cvs.toFixed(3)),
    decision_tier: tier,
    trust_tuple_R1a: trustTuple,
    codex_verdict: codexVerdict,
    convergence_summary: {
      total_angles: angles.length,
      live_angles: liveAngles.length,
      skipped_angles: angles.length - liveAngles.length,
      min_live_angles_required: minLiveAngles,
      convergence_rule_met: liveAngles.length >= minLiveAngles,
    },
    provenance: {
      wave: process.env.ALW_WAVE || 'W442',
      branch: process.env.ALW_BRANCH || 'feat/research-arch-v23-operational',
      session_id: process.env.CLAUDE_SESSION_ID || 'cli-direct',
      scored_at: new Date().toISOString(),
    },
  };
}

/**
 * Bucket "days since last commit" to the D6 enum {0.1, 0.4, 0.7, 1.0}.
 * Schema enforces D6.value ∈ enum; arbitrary registry scores would violate it
 * (W441.5 codex r1 REVISE fix #3).
 *
 * Bands per sca-v23 §2.2 D6 contract:
 *   ≤30d  → 1.0 (fresh)
 *   ≤90d  → 0.7 (recent)
 *   ≤180d → 0.4 (aging)
 *   >180d → 0.1 (stale)
 *   missing/invalid → 0.1 (worst-case fail-CLOSED)
 *
 * @param {number} daysAgo
 * @returns {0.1|0.4|0.7|1.0}
 */
export function bucketRecency(daysAgo) {
  if (typeof daysAgo !== 'number' || !Number.isFinite(daysAgo) || daysAgo < 0) return 0.1;
  if (daysAgo <= 30) return 1.0;
  if (daysAgo <= 90) return 0.7;
  if (daysAgo <= 180) return 0.4;
  return 0.1;
}

function scoreDimsFromAngles(angles, target) {
  const a = (name) => angles.find(x => x.name === name) || {};
  const registry = a('A7_authoritative_registry');
  const ghData = registry.github_graphql_data || {};
  const npmData = registry.npm_or_pypi_data || {};

  // D1 popularity: log-scaled stars (1k stars → ~0.4; 100k → 1.0)
  const stars = ghData.stars || 0;
  const d1 = Math.min(1, Math.max(0, Math.log10(stars + 1) / 5));

  // D2 license safety: binary
  const license = ghData.license || npmData.license;
  const licenseOk = ['MIT','Apache-2.0','BSD-3-Clause','BSD-2-Clause','ISC','MPL-2.0'].includes(license);
  const d2 = licenseOk ? 1.0 : 0.0;

  // D3 signed
  const d3 = registry.signed_attestations ? 1.0 : 0.0;

  // D4 maintainer reputation (default 0.5 pending live data)
  const d4 = 0.5;

  // D5 dependency cleanliness (default 0.7 pending live audit)
  const d5 = 0.7;

  // D6 last commit recency — bucketed to schema enum {0.1, 0.4, 0.7, 1.0}
  // per W441.5 codex r1 REVISE fix #3. Source: registry github_graphql_data.pushed_at.
  const pushedAt = ghData.pushed_at;
  const daysAgo = pushedAt
    ? (Date.now() - new Date(pushedAt).getTime()) / (24 * 60 * 60 * 1000)
    : Infinity;
  const d6 = bucketRecency(daysAgo);

  // D7 contributor count (default 0.5 pending live query)
  const d7 = 0.5;

  // D8 downloads 30d (default 0.5 pending npm stats)
  const d8 = 0.5;

  // D9 OpenSSF scorecard (default 0.5 pending live fetch)
  const d9 = 0.5;

  // D10 CC pathway support — N/A for non-CC targets (weight=0 → excluded from CVS)
  const d10applicable = target.kind === 'cc-plugin' || target.kind === 'mcp-server';
  const d10 = target.kind === 'cc-plugin' ? 1.0 : (target.kind === 'mcp-server' ? 0.5 : 0);

  // D11 MCP readiness — N/A for non-MCP targets (weight=0 → excluded from CVS)
  const d11applicable = target.kind === 'mcp-server';
  const d11 = target.kind === 'mcp-server' ? 1.0 : 0;

  // D12 composite arch quality (mean of live-angle scores)
  const liveAngles = angles.filter(x => !x.skipped);
  const d12 = liveAngles.length > 0
    ? liveAngles.reduce((s, x) => s + (x.normalized_score || 0), 0) / liveAngles.length
    : 0;

  return {
    D1_popularity: {value: Number(d1.toFixed(3)), weight: 0.05, rationale: `stars=${stars}`},
    D2_license_safety: {value: d2, weight: 0.08, rationale: `license=${license || 'unknown'}`},
    D3_supply_chain_signed: {value: d3, weight: 0.10, rationale: registry.signed_attestations ? 'signed' : 'unsigned'},
    D4_maintainer_reputation: {value: d4, weight: 0.06, rationale: 'default-pending-manual-or-live'},
    D5_dependency_cleanliness: {value: d5, weight: 0.08, rationale: 'default-pending-deps-audit'},
    D6_last_commit_recency: {value: d6, weight: 0.06, rationale: `bucketed-from-pushed_at=${pushedAt || 'missing'} (daysAgo=${Number.isFinite(daysAgo) ? daysAgo.toFixed(1) : 'Inf'})`},
    D7_contributor_count: {value: d7, weight: 0.04, rationale: 'default-pending-contributor-query'},
    D8_downloads_30d: {value: d8, weight: 0.05, rationale: 'default-pending-npm-stats'},
    D9_openssf_scorecard: {value: d9, weight: 0.08, rationale: 'default-pending-scorecard-fetch'},
    D10_cc_pathway_support: {value: d10, weight: d10applicable ? 0.10 : 0, rationale: `kind=${target.kind}${d10applicable ? '' : ' (N/A, weight=0)'}`},
    D11_mcp_readiness: {value: d11, weight: d11applicable ? 0.10 : 0, rationale: `kind=${target.kind}${d11applicable ? '' : ' (N/A, weight=0)'}`},
    D12_composite_arch_quality: {value: Number(d12.toFixed(3)), weight: 0.20, rationale: `mean-of-${liveAngles.length}-live-angles`},
  };
}

// extractTrustTuple REMOVED in W442 — replaced by probeTrust() from trust-probe.mjs
// which probes OSSF Scorecard + osv-scanner for real R1a values instead of hardcoded
// FALSE defaults. Multi-source: registry-angle signed_attestations + Scorecard Signed-Releases
// are OR-merged (either source can vouch). See §11 ERRATA + trust-probe.mjs cite-anchors.
