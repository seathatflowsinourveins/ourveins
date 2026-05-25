// tools/research-arch-v23/angles/registry-angle.mjs
// A7 — Authoritative registry probe. Implementation: gh REST API via `gh` CLI subprocess + `npm view` subprocess via execa.
//
// Schema vs impl naming (W441.2 codex r2 REVISE):
//   Field names are sca-v23 schema-canonical (`github_graphql_data`, `npm_or_pypi_data` — see
//   .claude/schemas/sca-v23-multi-angle-convergence.schema.json:98-99). Historical: the schema authors chose the generic
//   "graphql" / "or_pypi" names before deciding on the actual probe surface. Implementation reality:
//     - github_graphql_data: populated via `gh api repos/{owner}/{repo}` (REST endpoint via gh CLI subprocess).
//       The gh CLI may use GraphQL internally for some routes; this angle does NOT author GraphQL queries directly.
//     - npm_or_pypi_data: populated via `npm view <pkg> --json` subprocess; PyPI deferred to W441.2+ (NOT implemented).
//   Field names retained for schema-stability; the JSDoc on each field documents the historical-vs-actual gap.
//   No MCP dependency.
//
// Cite-anchor: docs/architecture/SOTA-RESEARCH-ARCH-V23/DESIGN.md §2.1 A7 + .claude/schemas/sca-v23-multi-angle-convergence.schema.json.
// Per soul.md §6 fail-CLOSED: any attempted-probe failure with no successful peer probe → angle marked `skipped: true`
// with reason; NEVER silent default of normalized_score=0 without skipped flag.
import {execa} from 'execa';

const LICENSE_OK = new Set(['MIT', 'Apache-2.0', 'BSD-3-Clause', 'BSD-2-Clause', 'ISC', 'MPL-2.0']);

// GitHub canonical owner/repo regex per https://docs.github.com/en/get-started/learning-about-github/types-of-github-accounts
//   owner: starts with alphanumeric, may contain hyphens, max 39 chars
//   repo:  alphanumeric + `.`, `_`, `-`, length 1-100
// Tightened from prior `/^[^@\s]+\/[^@\s]+$/` which accepted `owner/repo/extra` (codex r1 REVISE #2).
const GH_OWNER_REPO_RE = /^[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,38})\/[a-zA-Z0-9._-]{1,100}$/;

/**
 * Probe authoritative registries for a target.
 *
 * Implementation surface (per W441.2 codex r2 REVISE — JSDoc-impl-honesty + schema-canonical names):
 *   - GitHub: `gh api repos/{owner}/{repo}` (REST via gh CLI subprocess);
 *             populated into the schema-canonical `github_graphql_data` field
 *             (historical name; this angle does NOT author GraphQL queries directly).
 *   - npm:    `npm view <pkg> --json` (subprocess);
 *             populated into the schema-canonical `npm_or_pypi_data` field
 *             (historical name; PyPI deferred to W441.2+ — NOT implemented).
 *
 * Fail-CLOSED contract (per soul.md §6):
 *   - If NO probe was attempted (identifier shape unrecognized) → skipped:true with reason
 *   - If a probe was attempted AND no probe succeeded → skipped:true with reason (NEVER normalized_score=0 silent default)
 *   - If at least one probe succeeded → composite score from successful probe(s)
 *
 * @param {Object} target {kind, identifier, version}
 * @returns {Promise<Object>} Angle result conforming to sca-v23 A7 shape (see .claude/schemas/sca-v23-multi-angle-convergence.schema.json).
 */
export async function probeRegistry(target) {
  if (!target || !target.identifier) {
    return {
      name: 'A7_authoritative_registry',
      skipped: true,
      reason: 'invalid target (missing identifier)',
      normalized_score: 0,
      weight: 0.15,
    };
  }

  let ghData = {};
  let npmData = {};
  let signedAttestations = false;
  const probeErrors = [];

  // Track which probes were ATTEMPTED and which SUCCEEDED (codex r1 REVISE #1 — fail-CLOSED gap fix).
  const attempts = {gh: false, npm: false};
  const successes = {gh: false, npm: false};

  // GitHub probe — fire when target is github-repo kind OR identifier matches tightened canonical owner/repo shape.
  const isGhIdentifier = GH_OWNER_REPO_RE.test(target.identifier);
  if (target.kind === 'github-repo' || isGhIdentifier) {
    // If kind says github-repo but identifier shape is wrong → reject early (don't attempt malformed probe).
    if (!isGhIdentifier) {
      probeErrors.push(`gh: identifier ${target.identifier} does not match canonical owner/repo regex ${GH_OWNER_REPO_RE}`);
    } else {
      attempts.gh = true;
      const [owner, repo] = target.identifier.split('/');
      try {
        const {stdout} = await execa('gh', ['api', `repos/${owner}/${repo}`,
          '--jq', '{stars: .stargazers_count, forks: .forks_count, license: .license.spdx_id, pushed_at: .pushed_at, default_branch: .default_branch, archived: .archived, disabled: .disabled, owner_type: .owner.type}'],
          {timeout: 30000});
        ghData = JSON.parse(stdout);
        successes.gh = true;

        // W446: fetch contributor count for D7 via pagination header
        try {
          const contribResult = await execa('gh', ['api', `repos/${owner}/${repo}/contributors?per_page=1`, '-i'],
            {timeout: 15000});
          const linkMatch = contribResult.stdout.match(/page=(\d+)>;\s*rel="last"/);
          ghData.contributor_count = linkMatch ? parseInt(linkMatch[1], 10) : 1;
        } catch { ghData.contributor_count = 0; }
      } catch (err) {
        probeErrors.push(`gh api repos/${owner}/${repo}: ${err.shortMessage || err.message}`);
      }
    }
  }

  // npm probe — fire for npm-package kind OR identifiers starting with @ OR mcp-server kind.
  if (target.kind === 'npm-package' || target.identifier.startsWith('@') || target.kind === 'mcp-server') {
    attempts.npm = true;
    try {
      const npmTarget = target.version && target.version !== 'HEAD' && target.version !== 'latest'
        ? `${target.identifier}@${target.version}`
        : target.identifier;
      const {stdout} = await execa('npm', ['view', npmTarget, '--json'], {timeout: 30000});
      npmData = JSON.parse(stdout);
      signedAttestations = Boolean(npmData?.dist?.signatures?.length || npmData?.dist?.attestations);
      successes.npm = true;

      // W446: fetch weekly downloads for D8 via npm registry API
      try {
        const pkgName = npmData.name || target.identifier;
        const dlUrl = `https://api.npmjs.org/downloads/point/last-week/${encodeURIComponent(pkgName)}`;
        const dlResp = await fetch(dlUrl, {signal: AbortSignal.timeout(10000)});
        if (dlResp.ok) {
          const dlJson = await dlResp.json();
          npmData.weekly_downloads = dlJson.downloads || 0;
        }
      } catch { /* download fetch failed — leave weekly_downloads unset */ }
    } catch (err) {
      probeErrors.push(`npm view ${target.identifier}: ${err.shortMessage || err.message}`);
    }
  }

  // Fail-CLOSED check (codex r1 REVISE #1):
  //   (a) no probe was attempted at all → skipped:true (identifier unrecognized for any registry)
  //   (b) at least one probe attempted AND none succeeded → skipped:true (NOT silent normalized_score=0)
  const anyAttempted = attempts.gh || attempts.npm;
  const anySuccess = successes.gh || successes.npm;

  if (!anyAttempted) {
    return {
      name: 'A7_authoritative_registry',
      skipped: true,
      reason: `identifier ${target.identifier} matched no probe type (kind=${target.kind || 'unset'}); attempts: ${JSON.stringify(attempts)}`,
      normalized_score: 0,
      weight: 0.15,
    };
  }

  if (anyAttempted && !anySuccess) {
    return {
      name: 'A7_authoritative_registry',
      skipped: true,
      reason: `all attempted probes failed: ${probeErrors.join('; ')}`,
      normalized_score: 0,
      weight: 0.15,
    };
  }

  // Score: license-OK + recent-commit + signed-attestations
  const license = ghData.license || npmData.license;
  const licenseOk = license && LICENSE_OK.has(license);
  const pushedAt = ghData.pushed_at;
  const recentCommit = pushedAt && (Date.now() - new Date(pushedAt).getTime()) < 90 * 24 * 60 * 60 * 1000;
  const archived = Boolean(ghData.archived);

  // Composite score: 0.4 license-OK + 0.3 recent-commit + 0.3 signed; deduct 0.5 if archived
  let score = (licenseOk ? 0.4 : 0) + (recentCommit ? 0.3 : 0) + (signedAttestations ? 0.3 : 0);
  if (archived) score = Math.max(0, score - 0.5);

  return {
    name: 'A7_authoritative_registry',
    github_graphql_data: ghData,       // schema-canonical name; impl uses gh REST via CLI (gh api repos/{owner}/{repo})
    npm_or_pypi_data: npmData,         // schema-canonical name; impl uses npm view subprocess; PyPI deferred to W441.2+
    signed_attestations: signedAttestations,
    archived,
    probe_errors: probeErrors.length > 0 ? probeErrors : undefined,
    normalized_score: Number(score.toFixed(3)),
    weight: 0.15,
  };
}
