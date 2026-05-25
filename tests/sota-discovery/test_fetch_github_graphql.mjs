// tests/sota-discovery/test_fetch_github_graphql.mjs
// node --test — exercises the GitHub GraphQL fetcher against a MOCK ctx.fetchJson
// (canned GraphQL response modeled on the live W380 probe of vercel/next.js + cli/cli),
// plus the pure derivation helpers and the no-token NOT_MEASURABLE branch.
//
// Run: node --test tests/sota-discovery/test_fetch_github_graphql.mjs

import { test } from "node:test";
import assert from "node:assert/strict";

import {
  fetchGithubGraphql,
  classifyLicense,
  deriveLastCommitDays,
  deriveContributors90d,
  deriveGreenStreakDays,
  deriveInstallPath,
} from "../../tools/sota-discovery/lib/fetchers/github-graphql.mjs";
import { MISSINGNESS, SOURCE_CLASS } from "../../tools/sota-discovery/lib/contract.mjs";

const SIX = [
  "D04_last_commit_days",
  "D05_contributors_90d",
  "D07_license_class",
  "D11_ci_green_streak_days",
  "D13_cc_install_path",
  "D19_community_mentions",
];

const FIXED_NOW = Date.parse("2026-05-23T00:00:00Z");
const day = (n) => new Date(FIXED_NOW - n * 86_400_000).toISOString();

// Build a canned GraphQL response. Commits newest-first; the two newest days are fully green,
// then a FAILURE breaks the streak. Authors: 3 distinct human logins + 1 bot.
function cannedResponse({ spdxId = "MIT", withDefaultBranch = true, blobs = {} } = {}) {
  const target = withDefaultBranch
    ? {
        committedDate: day(2), // HEAD is 2 days old
        win: {
          totalCount: 7,
          nodes: [
            // day(2): two SUCCESS commits, two distinct authors
            { committedDate: day(2), author: { user: { login: "alice" }, email: "a@x.io", name: "Alice" }, statusCheckRollup: { state: "SUCCESS" } },
            { committedDate: day(2), author: { user: { login: "bob" }, email: "b@x.io", name: "Bob" }, statusCheckRollup: { state: "SUCCESS" } },
            // day(3): SUCCESS + a bot
            { committedDate: day(3), author: { user: { login: "alice" }, email: "a@x.io", name: "Alice" }, statusCheckRollup: { state: "SUCCESS" } },
            { committedDate: day(3), author: { user: { login: "ci-bot[bot]" }, email: null, name: "ci-bot[bot]" }, statusCheckRollup: { state: "SUCCESS" } },
            // day(4): FAILURE -> breaks the green streak at 2 days
            { committedDate: day(4), author: { user: { login: "carol" }, email: "c@x.io", name: "Carol" }, statusCheckRollup: { state: "FAILURE" } },
            // commit with no rollup (no CI signal) + commit with null user (email fallback)
            { committedDate: day(5), author: { user: null, email: "Dave@X.IO", name: "Dave" }, statusCheckRollup: null },
            { committedDate: day(5), author: { user: { login: "alice" }, email: "a@x.io", name: "Alice" }, statusCheckRollup: { state: "PENDING" } },
          ],
        },
      }
    : null;

  return {
    data: {
      repository: {
        licenseInfo: spdxId == null ? null : { spdxId },
        mentionableUsers: { totalCount: 3832 },
        defaultBranchRef: withDefaultBranch ? { name: "trunk", target } : null,
        plugin: blobs.plugin ? { __typename: "Blob" } : null,
        mcpDot: blobs.mcpDot ? { __typename: "Blob" } : null,
        mcpRoot: blobs.mcpRoot ? { __typename: "Blob" } : null,
        pkg: blobs.pkg ? { __typename: "Blob" } : null,
        pyproject: blobs.pyproject ? { __typename: "Blob" } : null,
      },
      rateLimit: { remaining: 4999, cost: 1 },
    },
  };
}

function mockCtx(response, captured = {}) {
  return {
    now: FIXED_NOW,
    fetchJson: async (url, opts) => {
      captured.url = url;
      captured.opts = opts;
      return response;
    },
  };
}

// ---- pure helpers ----------------------------------------------------------

test("classifyLicense maps SPDX ids to the four classes", () => {
  assert.equal(classifyLicense("MIT"), "permissive");
  assert.equal(classifyLicense("Apache-2.0"), "permissive");
  assert.equal(classifyLicense("BSD-3-Clause"), "permissive");
  assert.equal(classifyLicense("GPL-3.0"), "copyleft");
  assert.equal(classifyLicense("AGPL-3.0-or-later"), "copyleft");
  assert.equal(classifyLicense("MPL-2.0"), "copyleft");
  assert.equal(classifyLicense("BUSL-1.1"), "source-available");
  assert.equal(classifyLicense("SSPL-1.0"), "source-available");
  assert.equal(classifyLicense("NOASSERTION"), "noassertion");
  assert.equal(classifyLicense(null), "noassertion");
  assert.equal(classifyLicense("Some-Unknown-1.0"), "source-available"); // present-but-unrecognized
});

test("deriveLastCommitDays computes floor-days and handles bad input", () => {
  assert.equal(deriveLastCommitDays(day(2), FIXED_NOW), 2);
  assert.equal(deriveLastCommitDays(day(0), FIXED_NOW), 0);
  assert.equal(deriveLastCommitDays(null, FIXED_NOW), null);
  assert.equal(deriveLastCommitDays("not-a-date", FIXED_NOW), null);
});

test("deriveContributors90d dedups identities and tracks bots", () => {
  const nodes = cannedResponse().data.repository.defaultBranchRef.target.win.nodes;
  const r = deriveContributors90d(nodes, FIXED_NOW);
  // distinct: alice, bob, ci-bot[bot], carol, dave@x.io  => 5
  assert.equal(r.count, 5);
  assert.equal(r.bots, 1);
  assert.equal(r.sampledCount, 7);
});

test("deriveContributors90d enforces the 90d cutoff", () => {
  const nodes = [
    { committedDate: day(10), author: { user: { login: "fresh" } }, statusCheckRollup: null },
    { committedDate: day(200), author: { user: { login: "stale" } }, statusCheckRollup: null }, // out of window
  ];
  const r = deriveContributors90d(nodes, FIXED_NOW);
  assert.equal(r.count, 1);
  assert.equal(r.sampledCount, 1);
});

test("deriveGreenStreakDays counts consecutive green UTC days from HEAD", () => {
  const nodes = cannedResponse().data.repository.defaultBranchRef.target.win.nodes;
  // day(2) green, day(3) green, day(4) FAILURE -> streak = 2
  assert.equal(deriveGreenStreakDays(nodes), 2);
});

test("deriveGreenStreakDays returns null when no rollup data exists", () => {
  const nodes = [
    { committedDate: day(1), author: {}, statusCheckRollup: null },
    { committedDate: day(2), author: {}, statusCheckRollup: null },
  ];
  assert.equal(deriveGreenStreakDays(nodes), null);
  assert.equal(deriveGreenStreakDays([]), null);
});

test("deriveGreenStreakDays: a failure on the newest day yields 0", () => {
  const nodes = [
    { committedDate: day(1), author: {}, statusCheckRollup: { state: "FAILURE" } },
    { committedDate: day(2), author: {}, statusCheckRollup: { state: "SUCCESS" } },
  ];
  assert.equal(deriveGreenStreakDays(nodes), 0);
});

test("deriveInstallPath honors precedence plugin > mcp > pyproject > package > none", () => {
  assert.equal(deriveInstallPath({ plugin: 1, mcpDot: 1, pkg: 1 }), "plugin");
  assert.equal(deriveInstallPath({ mcpDot: 1, pkg: 1 }), "mcp-server");
  assert.equal(deriveInstallPath({ mcpRoot: 1 }), "mcp-server");
  assert.equal(deriveInstallPath({ pyproject: 1, pkg: 1 }), "sdk-python");
  assert.equal(deriveInstallPath({ pkg: 1 }), "sdk-typescript");
  assert.equal(deriveInstallPath({}), "none");
  assert.equal(deriveInstallPath(null), null);
});

// ---- full fetcher against mock ctx (token present) -------------------------

test("fetchGithubGraphql returns all 6 dims + CLASS-A evidence (mocked, token present)", async () => {
  const prevTok = process.env.GITHUB_TOKEN, prevGh = process.env.GH_TOKEN;
  process.env.GITHUB_TOKEN = "ghp_test_fake";
  delete process.env.GH_TOKEN;
  try {
    const captured = {};
    const resp = cannedResponse({ spdxId: "MIT", blobs: { pkg: true } });
    const { dims, evidence } = await fetchGithubGraphql("vercel", "next.js", mockCtx(resp, captured));

    // every dim key present in both maps
    for (const k of SIX) {
      assert.ok(k in dims, `dims missing ${k}`);
      assert.ok(k in evidence, `evidence missing ${k}`);
      assert.equal(evidence[k].source_class, SOURCE_CLASS.A, `${k} not CLASS-A`);
      assert.equal(evidence[k].source_uri, "https://github.com/vercel/next.js");
      assert.equal(typeof evidence[k].measured_at, "string");
    }

    // D04 — 2 days
    assert.equal(dims.D04_last_commit_days, 2);
    assert.equal(evidence.D04_last_commit_days.missingness, MISSINGNESS.MEASURED);

    // D05 — 5 distinct authors, 1 bot, not sampled (totalCount 7 <= SAMPLE 100)
    assert.equal(dims.D05_contributors_90d, 5);
    assert.equal(evidence.D05_contributors_90d.missingness, MISSINGNESS.MEASURED);
    assert.equal(evidence.D05_contributors_90d.sampled, false);
    assert.equal(evidence.D05_contributors_90d.bot_authors, 1);

    // D07 — permissive (MIT)
    assert.equal(dims.D07_license_class, "permissive");
    assert.equal(evidence.D07_license_class.spdx_id, "MIT");
    assert.equal(evidence.D07_license_class.missingness, MISSINGNESS.MEASURED);

    // D11 — green streak 2 days
    assert.equal(dims.D11_ci_green_streak_days, 2);
    assert.equal(evidence.D11_ci_green_streak_days.missingness, MISSINGNESS.MEASURED);

    // D13 — package.json only -> sdk-typescript
    assert.equal(dims.D13_cc_install_path, "sdk-typescript");
    assert.equal(evidence.D13_cc_install_path.probed.package_json, true);
    assert.equal(evidence.D13_cc_install_path.missingness, MISSINGNESS.MEASURED);

    // D19 — mentionableUsers proxy
    assert.equal(dims.D19_community_mentions, 3832);
    assert.equal(evidence.D19_community_mentions.proxy, "mentionableUsers");

    // the POST shape: correct URL + bearer auth + a GraphQL body carrying the variables
    assert.equal(captured.url, "https://api.github.com/graphql");
    assert.equal(captured.opts.method, "POST");
    assert.match(captured.opts.headers.Authorization, /^bearer ghp_test_fake$/);
    const body = JSON.parse(captured.opts.body);
    assert.ok(body.query.includes("repository(owner:$owner,name:$name)"));
    assert.equal(body.variables.owner, "vercel");
    assert.equal(body.variables.name, "next.js");
    assert.ok(typeof body.variables.since === "string"); // 90d GitTimestamp
  } finally {
    if (prevTok === undefined) delete process.env.GITHUB_TOKEN; else process.env.GITHUB_TOKEN = prevTok;
    if (prevGh === undefined) delete process.env.GH_TOKEN; else process.env.GH_TOKEN = prevGh;
  }
});

test("fetchGithubGraphql: plugin.json present -> install path plugin", async () => {
  const prev = process.env.GITHUB_TOKEN;
  process.env.GITHUB_TOKEN = "ghp_test_fake";
  try {
    const resp = cannedResponse({ blobs: { plugin: true, pkg: true } });
    const { dims } = await fetchGithubGraphql("anthropics", "some-plugin", mockCtx(resp));
    assert.equal(dims.D13_cc_install_path, "plugin");
  } finally {
    if (prev === undefined) delete process.env.GITHUB_TOKEN; else process.env.GITHUB_TOKEN = prev;
  }
});

test("fetchGithubGraphql: missing default branch -> activity/CI dims NOT_MEASURABLE", async () => {
  const prev = process.env.GITHUB_TOKEN;
  process.env.GITHUB_TOKEN = "ghp_test_fake";
  try {
    const resp = cannedResponse({ withDefaultBranch: false, spdxId: "Apache-2.0" });
    const { dims, evidence } = await fetchGithubGraphql("o", "empty", mockCtx(resp));
    assert.equal(dims.D04_last_commit_days, null);
    assert.equal(evidence.D04_last_commit_days.missingness, MISSINGNESS.NOT_MEASURABLE);
    assert.equal(dims.D05_contributors_90d, null);
    assert.equal(evidence.D05_contributors_90d.missingness, MISSINGNESS.NOT_MEASURABLE);
    assert.equal(dims.D11_ci_green_streak_days, null);
    assert.equal(evidence.D11_ci_green_streak_days.missingness, MISSINGNESS.NOT_MEASURABLE);
    // license + install-path + mentions still measurable
    assert.equal(dims.D07_license_class, "permissive");
    assert.equal(dims.D13_cc_install_path, "none");
    assert.equal(dims.D19_community_mentions, 3832);
  } finally {
    if (prev === undefined) delete process.env.GITHUB_TOKEN; else process.env.GITHUB_TOKEN = prev;
  }
});

// ---- no-token NOT_MEASURABLE path ------------------------------------------

test("fetchGithubGraphql with NO token -> all 6 dims NOT_MEASURABLE, no crash, no fetch", async () => {
  const prevTok = process.env.GITHUB_TOKEN, prevGh = process.env.GH_TOKEN;
  delete process.env.GITHUB_TOKEN;
  delete process.env.GH_TOKEN;
  try {
    let fetchCalled = false;
    const ctx = { now: FIXED_NOW, fetchJson: async () => { fetchCalled = true; return {}; } };
    const { dims, evidence } = await fetchGithubGraphql("vercel", "next.js", ctx);
    assert.equal(fetchCalled, false, "must not hit the network without a token");
    for (const k of SIX) {
      assert.equal(dims[k], null, `${k} should be null`);
      assert.equal(evidence[k].missingness, MISSINGNESS.NOT_MEASURABLE);
      assert.equal(evidence[k].source_class, SOURCE_CLASS.A);
    }
  } finally {
    if (prevTok === undefined) delete process.env.GITHUB_TOKEN; else process.env.GITHUB_TOKEN = prevTok;
    if (prevGh === undefined) delete process.env.GH_TOKEN; else process.env.GH_TOKEN = prevGh;
  }
});

test("fetchGithubGraphql: transport throw -> NOT_MEASURABLE (no crash)", async () => {
  const prev = process.env.GITHUB_TOKEN;
  process.env.GITHUB_TOKEN = "ghp_test_fake";
  try {
    const ctx = { now: FIXED_NOW, fetchJson: async () => { throw new Error("ETIMEDOUT"); } };
    const { dims, evidence } = await fetchGithubGraphql("o", "n", ctx);
    for (const k of SIX) {
      assert.equal(dims[k], null);
      assert.equal(evidence[k].missingness, MISSINGNESS.NOT_MEASURABLE);
    }
  } finally {
    if (prev === undefined) delete process.env.GITHUB_TOKEN; else process.env.GITHUB_TOKEN = prev;
  }
});
