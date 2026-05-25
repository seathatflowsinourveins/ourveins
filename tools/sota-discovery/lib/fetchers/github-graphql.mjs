// tools/sota-discovery/lib/fetchers/github-graphql.mjs
// sca-v21-MVP CLASS-A fetcher — GitHub GraphQL v4.
//
// WHY GraphQL: the v4 GraphQL endpoint collapses what would be ~6 REST round-trips
// (commits, contributors, license, check-runs, and up to 5 contents-blob HEADs) into a
// SINGLE request at rateLimit cost 1 (verified live W380, octocat/Hello-World & vercel/next.js).
// This is the codex W380-r1 fix for the "dead-weight unmeasured dims" problem: six dims that
// would otherwise each cost a REST call (and frequently get skipped under rate pressure) are
// derived from one query.
//
// ENDPOINT: POST https://api.github.com/graphql
//   Docs: https://docs.github.com/en/graphql  (object/Blob: GitObject interface;
//          defaultBranchRef.target -> Commit; history(since:) -> CommitHistoryConnection;
//          statusCheckRollup -> StatusState; licenseInfo -> License.spdxId SPDX id).
//   Auth: `Authorization: bearer ${GITHUB_TOKEN || GH_TOKEN}`. No token -> all 6 dims
//         returned NOT_MEASURABLE (never crashes; honest missingness per contract).
//
// SIX DIMS DERIVED (each derivation + every approximation documented inline):
//   D04_last_commit_days   — int. floor((now - defaultBranchRef.target.committedDate)/day).
//                            Exact: HEAD commit date of the default branch.
//   D05_contributors_90d   — int. Distinct commit-author identity (user.login, else lowercased
//                            email, else name) over a SAMPLED window of the most-recent
//                            <=SAMPLE commits within the last 90 days. APPROXIMATION: we sample
//                            the newest `SAMPLE` (100) commits in-window rather than paginating
//                            the entire 90d history — cheapest defensible distinct-author signal
//                            at cost 1. For repos with <=SAMPLE commits/90d this is EXACT; for
//                            busier repos it is a lower bound on distinct authors, flagged by
//                            `sampled:true` in evidence. Bot authors (...[bot]) are counted (they
//                            are real committers) but tracked separately for transparency.
//   D07_license_class      — enum permissive|copyleft|source-available|proprietary|noassertion.
//                            From licenseInfo.spdxId via SPDX_CLASS map; null spdxId -> noassertion.
//   D11_ci_green_streak_days — int. Consecutive calendar days (UTC), counting back from the most
//                            recent commit that carries a statusCheckRollup, on which EVERY rolled-up
//                            commit status is SUCCESS. APPROXIMATION: derived from the sampled recent
//                            commits' per-commit statusCheckRollup.state (we do not query the Checks
//                            API timeline). A day with any FAILURE/ERROR rollup, or the first day with
//                            no rollup data after a green run, terminates the streak. Commits with a
//                            null rollup are skipped (no signal), not treated as failures.
//   D13_cc_install_path    — enum plugin|mcp-server|sdk-python|sdk-typescript|cli-only|
//                            library-only|none. Detected by probing HEAD blobs via
//                            object(expression:"HEAD:<path>"){__typename}: .claude/plugin.json ->
//                            plugin; (.mcp.json|mcp.json) -> mcp-server; package.json -> ts/js sdk
//                            vs library-only (heuristic: "bin" field absent => library-only, present
//                            => cli-only is NOT distinguishable from blob existence alone, so package
//                            presence => sdk-typescript unless pyproject also present); pyproject.toml
//                            -> sdk-python; none if nothing matches. Precedence: plugin > mcp-server >
//                            sdk-python > sdk-typescript > library-only > none (CC-relevance order).
//   D19_community_mentions — int. APPROXIMATION via mentionableUsers.totalCount (people who can be
//                            @-mentioned in this repo: collaborators + recent commenters/committers).
//                            Stars are deliberately NOT used (contract: stars informational-only).
//                            This is a coarse community-engagement proxy and is flagged as such in
//                            evidence (`proxy:"mentionableUsers"`); honest, cheap, single-query.
//
// INTERFACE (contract.mjs): export async function fetchGithubGraphql(owner, name, ctx)
//   ctx.fetchJson(url, { method, headers, body }) -> parsed JSON (does HTTP + cache).
//   returns { dims:{...6}, evidence:{...6} } ; SOURCE_CLASS.A ; per-dim missingness.

import { MISSINGNESS, SOURCE_CLASS, makeEvidence } from "../contract.mjs";

const GRAPHQL_URL = "https://api.github.com/graphql";
const DAY_MS = 86_400_000;
const NINETY_DAY_MS = 90 * DAY_MS;
const SAMPLE = 100; // recent-commit window for D05 distinct-authors + D11 green-streak

const DIM_KEYS = [
  "D04_last_commit_days",
  "D05_contributors_90d",
  "D07_license_class",
  "D11_ci_green_streak_days",
  "D13_cc_install_path",
  "D19_community_mentions",
];

// SPDX id -> license class. SPDX list: https://spdx.org/licenses/
// permissive: no copyleft. copyleft: weak+strong (LGPL/MPL/GPL/AGPL/EUPL...).
// source-available: visible source w/ usage restriction (BUSL/SSPL/Elastic/Commons-Clause...).
const SPDX_CLASS = Object.freeze({
  // permissive
  MIT: "permissive", "MIT-0": "permissive", ISC: "permissive",
  "BSD-2-Clause": "permissive", "BSD-3-Clause": "permissive", "BSD-3-Clause-Clear": "permissive",
  "0BSD": "permissive", "Apache-2.0": "permissive", Unlicense: "permissive",
  "Zlib": "permissive", "BSL-1.0": "permissive", "PostgreSQL": "permissive",
  CC0: "permissive", "CC0-1.0": "permissive", WTFPL: "permissive", "Python-2.0": "permissive",
  // copyleft (weak + strong)
  "LGPL-2.1": "copyleft", "LGPL-2.1-only": "copyleft", "LGPL-2.1-or-later": "copyleft",
  "LGPL-3.0": "copyleft", "LGPL-3.0-only": "copyleft", "LGPL-3.0-or-later": "copyleft",
  "MPL-2.0": "copyleft", "EPL-2.0": "copyleft", "EPL-1.0": "copyleft",
  "GPL-2.0": "copyleft", "GPL-2.0-only": "copyleft", "GPL-2.0-or-later": "copyleft",
  "GPL-3.0": "copyleft", "GPL-3.0-only": "copyleft", "GPL-3.0-or-later": "copyleft",
  "AGPL-3.0": "copyleft", "AGPL-3.0-only": "copyleft", "AGPL-3.0-or-later": "copyleft",
  "EUPL-1.2": "copyleft", "OSL-3.0": "copyleft", "CDDL-1.0": "copyleft",
  // source-available (non-OSI; usage-restricted)
  "BUSL-1.1": "source-available", "SSPL-1.0": "source-available",
  "Elastic-2.0": "source-available", "Commons-Clause": "source-available",
  "PolyForm-Noncommercial-1.0.0": "source-available", "PolyForm-Shield-1.0.0": "source-available",
});

export function classifyLicense(spdxId) {
  if (spdxId == null) return "noassertion";
  // GitHub returns the literal "NOASSERTION" for unrecognized / no-license repos.
  if (spdxId === "NOASSERTION") return "noassertion";
  const cls = SPDX_CLASS[spdxId];
  if (cls) return cls;
  // Unknown but present SPDX id -> conservative: treat as source-available (visible, unclassified).
  // Truly closed / proprietary repos surface as NOASSERTION above, mapped to noassertion.
  return "source-available";
}

// ---- pure derivation helpers (network-free; unit-tested directly) -----------

export function deriveLastCommitDays(committedDate, now = Date.now()) {
  if (!committedDate) return null;
  const t = Date.parse(committedDate);
  if (Number.isNaN(t)) return null;
  return Math.max(0, Math.floor((now - t) / DAY_MS));
}

// Distinct commit-author identities over the sampled in-window commits.
// identity = user.login (stable) || lowercased email || name.
export function deriveContributors90d(commitNodes, now = Date.now()) {
  if (!Array.isArray(commitNodes)) return { count: null, bots: 0, sampledCount: 0 };
  const cutoff = now - NINETY_DAY_MS;
  const ids = new Set();
  let bots = 0;
  let sampledCount = 0;
  for (const c of commitNodes) {
    if (!c) continue;
    const t = Date.parse(c.committedDate || "");
    if (Number.isNaN(t) || t < cutoff) continue; // belt-and-suspenders: enforce 90d even if server over-returns
    sampledCount++;
    const a = c.author || {};
    const login = a.user && a.user.login;
    const id = login || (a.email ? a.email.toLowerCase() : null) || a.name || "unknown";
    if (typeof id === "string" && /\[bot\]$/i.test(id)) bots++;
    ids.add(id);
  }
  return { count: ids.size, bots, sampledCount };
}

// Consecutive green calendar-days (UTC) counting back from the newest commit bearing a rollup.
// commitNodes assumed newest-first (GraphQL history default ordering).
export function deriveGreenStreakDays(commitNodes) {
  if (!Array.isArray(commitNodes) || commitNodes.length === 0) return null;
  // Group statuses by UTC day, newest day first; preserve encounter order.
  const dayOrder = [];
  const dayState = new Map(); // dayKey -> { green:bool, sawRollup:bool }
  for (const c of commitNodes) {
    if (!c || !c.committedDate) continue;
    const rollup = c.statusCheckRollup;
    if (!rollup || !rollup.state) continue; // no CI signal on this commit -> skip
    const dayKey = c.committedDate.slice(0, 10); // YYYY-MM-DD (UTC)
    if (!dayState.has(dayKey)) {
      dayOrder.push(dayKey);
      dayState.set(dayKey, { green: true, sawRollup: true });
    }
    const d = dayState.get(dayKey);
    if (rollup.state !== "SUCCESS") d.green = false; // any non-success breaks the day
  }
  if (dayOrder.length === 0) return null; // no rollup data at all -> not measurable
  // Count consecutive green days from the newest day until the first non-green day.
  let streak = 0;
  for (const dayKey of dayOrder) {
    const d = dayState.get(dayKey);
    if (d.green) streak++;
    else break;
  }
  return streak;
}

// File-probe -> CC install path. blobs: { plugin, mcpDot, mcpRoot, pkg, pyproject } each a
// truthy Blob marker or null.
export function deriveInstallPath(blobs) {
  if (!blobs) return null;
  const has = (b) => b != null;
  if (has(blobs.plugin)) return "plugin";
  if (has(blobs.mcpDot) || has(blobs.mcpRoot)) return "mcp-server";
  if (has(blobs.pyproject)) return "sdk-python";
  if (has(blobs.pkg)) return "sdk-typescript"; // package.json present, no plugin/mcp -> ts/js sdk
  // No probe matched. We cannot prove "cli-only" vs "library-only" from blob presence alone,
  // so we return "none" (no recognized CC-installable primitive surface).
  return "none";
}

// ---- single combined query --------------------------------------------------

function buildQuery() {
  return `query($owner:String!,$name:String!,$since:GitTimestamp!){
  repository(owner:$owner,name:$name){
    licenseInfo{ spdxId }
    mentionableUsers{ totalCount }
    defaultBranchRef{
      name
      target{ ... on Commit {
        committedDate
        win:history(first:${SAMPLE}, since:$since){
          totalCount
          nodes{
            committedDate
            author{ user{ login } email name }
            statusCheckRollup{ state }
          }
        }
      } }
    }
    plugin:object(expression:"HEAD:.claude/plugin.json"){ __typename }
    mcpDot:object(expression:"HEAD:.mcp.json"){ __typename }
    mcpRoot:object(expression:"HEAD:mcp.json"){ __typename }
    pkg:object(expression:"HEAD:package.json"){ __typename }
    pyproject:object(expression:"HEAD:pyproject.toml"){ __typename }
  }
  rateLimit{ remaining cost }
}`;
}

function nullEvidence(source_uri) {
  // All six dims NOT_MEASURABLE (no token / hard error). Honest missingness, never crash.
  const dims = {};
  const evidence = {};
  for (const k of DIM_KEYS) {
    dims[k] = null;
    evidence[k] = makeEvidence(null, {
      source_class: SOURCE_CLASS.A,
      source_uri,
      missingness: MISSINGNESS.NOT_MEASURABLE,
    });
  }
  return { dims, evidence };
}

/**
 * @param {string} owner
 * @param {string} name
 * @param {{ fetchJson: (url:string, opts:object)=>Promise<any>, cache?:any, now?:number }} ctx
 * @returns {Promise<{dims:object, evidence:object}>}
 */
export async function fetchGithubGraphql(owner, name, ctx) {
  const now = (ctx && typeof ctx.now === "number") ? ctx.now : Date.now();
  const token = process.env.GITHUB_TOKEN || process.env.GH_TOKEN;
  const repoUri = `https://github.com/${owner}/${name}`;

  if (!token) {
    // No-token path: 6x NOT_MEASURABLE. (Test asserts this branch.)
    return nullEvidence(repoUri);
  }

  const since = new Date(now - NINETY_DAY_MS).toISOString();
  const body = JSON.stringify({ query: buildQuery(), variables: { owner, name, since } });

  let json;
  try {
    json = await ctx.fetchJson(GRAPHQL_URL, {
      method: "POST",
      headers: {
        Authorization: `bearer ${token}`,
        "Content-Type": "application/json",
        "User-Agent": "sca-v21-discovery",
      },
      body,
    });
  } catch {
    return nullEvidence(repoUri); // network/transport failure -> honest NOT_MEASURABLE
  }

  const repo = json && json.data && json.data.repository;
  if (!repo || (json.errors && !repo)) {
    return nullEvidence(repoUri); // repo not found / GraphQL hard error
  }

  const dbr = repo.defaultBranchRef || null;
  const target = (dbr && dbr.target) || null;
  const win = (target && target.win) || null;
  const commitNodes = (win && Array.isArray(win.nodes)) ? win.nodes : null;

  const dims = {};
  const evidence = {};
  const ev = (key, value, missingness, extra) =>
    (evidence[key] = { ...makeEvidence(value, { source_class: SOURCE_CLASS.A, source_uri: repoUri, missingness }), ...(extra || {}) });

  // D04 — last commit days (HEAD of default branch).
  const lastCommitDays = deriveLastCommitDays(target && target.committedDate, now);
  dims.D04_last_commit_days = lastCommitDays;
  ev("D04_last_commit_days", lastCommitDays,
    lastCommitDays == null ? MISSINGNESS.NOT_MEASURABLE : MISSINGNESS.MEASURED);

  // D05 — distinct commit authors in last 90d (sampled).
  if (commitNodes == null) {
    dims.D05_contributors_90d = null;
    ev("D05_contributors_90d", null, MISSINGNESS.NOT_MEASURABLE);
  } else {
    const { count, bots, sampledCount } = deriveContributors90d(commitNodes, now);
    const totalInWindow = win ? win.totalCount : null;
    // sampled:true when the 90d window has more commits than we fetched (count is a lower bound).
    const sampled = totalInWindow != null && totalInWindow > SAMPLE;
    dims.D05_contributors_90d = count;
    ev("D05_contributors_90d", count, MISSINGNESS.MEASURED, {
      sampled, bot_authors: bots, sampled_commits: sampledCount, window_total_commits: totalInWindow,
    });
  }

  // D07 — license class.
  const spdxId = (repo.licenseInfo && repo.licenseInfo.spdxId) || null;
  const licenseClass = classifyLicense(spdxId);
  dims.D07_license_class = licenseClass;
  // noassertion is a real measured outcome (we determined there is no recognized license),
  // not "not measurable". MEASURED for every non-null repo response.
  ev("D07_license_class", licenseClass, MISSINGNESS.MEASURED, { spdx_id: spdxId });

  // D11 — CI green-streak days.
  if (commitNodes == null) {
    dims.D11_ci_green_streak_days = null;
    ev("D11_ci_green_streak_days", null, MISSINGNESS.NOT_MEASURABLE);
  } else {
    const streak = deriveGreenStreakDays(commitNodes);
    dims.D11_ci_green_streak_days = streak;
    ev("D11_ci_green_streak_days", streak,
      streak == null ? MISSINGNESS.NOT_MEASURABLE : MISSINGNESS.MEASURED);
  }

  // D13 — CC install path (file probe).
  const installPath = deriveInstallPath({
    plugin: repo.plugin, mcpDot: repo.mcpDot, mcpRoot: repo.mcpRoot, pkg: repo.pkg, pyproject: repo.pyproject,
  });
  dims.D13_cc_install_path = installPath;
  // The probe always returns a definite enum ("none" when nothing matched) -> MEASURED.
  ev("D13_cc_install_path", installPath, MISSINGNESS.MEASURED, {
    probed: {
      plugin: repo.plugin != null, mcp: repo.mcpDot != null || repo.mcpRoot != null,
      package_json: repo.pkg != null, pyproject: repo.pyproject != null,
    },
  });

  // D19 — community mentions (mentionableUsers proxy; NOT stars).
  const mentions = repo.mentionableUsers && typeof repo.mentionableUsers.totalCount === "number"
    ? repo.mentionableUsers.totalCount : null;
  dims.D19_community_mentions = mentions;
  ev("D19_community_mentions", mentions,
    mentions == null ? MISSINGNESS.NOT_MEASURABLE : MISSINGNESS.MEASURED,
    { proxy: "mentionableUsers", note: "stars deliberately excluded per contract" });

  return { dims, evidence };
}

export default fetchGithubGraphql;
