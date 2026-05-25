// tests/sota-discovery/test_discover_github_search.mjs
// node --test — GitHub repository-search client against a MOCK ctx.fetchJson.
// Run: node --test tests/sota-discovery/test_discover_github_search.mjs

import { test } from "node:test";
import assert from "node:assert/strict";

import {
  searchRepositoryCount,
  searchRepositorySlice,
  nodeToCandidate,
  fetchRecentStargazers,
} from "../../tools/sota-discovery/lib/discovery/github-search.mjs";

const FAKE_TOK = "ghp_fake_for_tests";

function withToken(fn) {
  return async () => {
    const prevTok = process.env.GITHUB_TOKEN, prevGh = process.env.GH_TOKEN;
    process.env.GITHUB_TOKEN = FAKE_TOK;
    delete process.env.GH_TOKEN;
    try {
      await fn();
    } finally {
      if (prevTok === undefined) delete process.env.GITHUB_TOKEN; else process.env.GITHUB_TOKEN = prevTok;
      if (prevGh === undefined) delete process.env.GH_TOKEN; else process.env.GH_TOKEN = prevGh;
    }
  };
}

function withoutToken(fn) {
  return async () => {
    const prevTok = process.env.GITHUB_TOKEN, prevGh = process.env.GH_TOKEN;
    delete process.env.GITHUB_TOKEN;
    delete process.env.GH_TOKEN;
    try {
      await fn();
    } finally {
      if (prevTok === undefined) delete process.env.GITHUB_TOKEN; else process.env.GITHUB_TOKEN = prevTok;
      if (prevGh === undefined) delete process.env.GH_TOKEN; else process.env.GH_TOKEN = prevGh;
    }
  };
}

function fakeNode(i, over = {}) {
  return {
    nameWithOwner: `owner${i}/repo${i}`,
    stargazerCount: 100 + i,
    createdAt: "2022-01-01T00:00:00Z",
    pushedAt: "2026-05-01T00:00:00Z",
    isArchived: false,
    isFork: false,
    licenseInfo: { spdxId: "MIT" },
    description: `repo ${i}`,
    ...over,
  };
}

// ---- nodeToCandidate (pure) -------------------------------------------------

test("nodeToCandidate parses nameWithOwner + tags the surfacing facet", () => {
  const c = nodeToCandidate(fakeNode(1), "keyword-topic");
  assert.equal(c.owner, "owner1");
  assert.equal(c.name, "repo1");
  assert.equal(c.repo, "owner1/repo1");
  assert.equal(c.stars, 101);
  assert.equal(c.licenseSpdxId, "MIT");
  assert.deepEqual(c.sources, ["keyword-topic"]);
});

test("nodeToCandidate returns null for unparseable nodes", () => {
  assert.equal(nodeToCandidate(null, "f"), null);
  assert.equal(nodeToCandidate({}, "f"), null);
  assert.equal(nodeToCandidate({ nameWithOwner: "no-slash" }, "f"), null);
  assert.equal(nodeToCandidate({ nameWithOwner: "/leading" }, "f"), null);
});

test("nodeToCandidate threads extra fields (reverseDeps, curated membership)", () => {
  const c = nodeToCandidate(fakeNode(2), "awesome-list", {
    reverseDeps: 42,
    curatedListMemberships: ["sindresorhus/awesome"],
  });
  assert.equal(c.reverseDeps, 42);
  assert.deepEqual(c.curatedListMemberships, ["sindresorhus/awesome"]);
});

// ---- searchRepositoryCount --------------------------------------------------

test("searchRepositoryCount returns repositoryCount (token present)", withToken(async () => {
  const ctx = { fetchJson: async () => ({ data: { search: { repositoryCount: 2204 } } }) };
  assert.equal(await searchRepositoryCount(ctx, "claude code"), 2204);
}));

test("searchRepositoryCount returns null with NO token (no fetch)", withoutToken(async () => {
  let called = false;
  const ctx = { fetchJson: async () => { called = true; return {}; } };
  assert.equal(await searchRepositoryCount(ctx, "x"), null);
  assert.equal(called, false);
}));

test("searchRepositoryCount returns null on transport throw", withToken(async () => {
  const ctx = { fetchJson: async () => { throw new Error("ETIMEDOUT"); } };
  assert.equal(await searchRepositoryCount(ctx, "x"), null);
}));

// ---- searchRepositorySlice (cursor pagination) ------------------------------

test("searchRepositorySlice paginates across cursors and accumulates candidates", withToken(async () => {
  const page1 = {
    data: { search: {
      repositoryCount: 150,
      pageInfo: { endCursor: "C1", hasNextPage: true },
      nodes: Array.from({ length: 100 }, (_, i) => fakeNode(i)),
    } },
  };
  const page2 = {
    data: { search: {
      repositoryCount: 150,
      pageInfo: { endCursor: "C2", hasNextPage: false },
      nodes: Array.from({ length: 50 }, (_, i) => fakeNode(100 + i)),
    } },
  };
  const ctx = {
    fetchJson: async (_url, opts) => {
      const after = JSON.parse(opts.body).variables.after;
      return after == null ? page1 : page2;
    },
  };
  const r = await searchRepositorySlice(ctx, "claude code stars:0", { facetId: "keyword-topic" });
  assert.equal(r.ran, true);
  assert.equal(r.retrieved, 150);
  assert.equal(r.candidates.length, 150);
  assert.equal(r.total, 150);
  assert.equal(r.truncated, false);
  assert.equal(r.candidates[0].sources[0], "keyword-topic");
}));

test("searchRepositorySlice excludes forks + archived by default", withToken(async () => {
  const ctx = {
    fetchJson: async () => ({ data: { search: {
      repositoryCount: 3,
      pageInfo: { endCursor: null, hasNextPage: false },
      nodes: [fakeNode(1), fakeNode(2, { isFork: true }), fakeNode(3, { isArchived: true })],
    } } }),
  };
  const r = await searchRepositorySlice(ctx, "q", {});
  assert.equal(r.candidates.length, 1);
  assert.equal(r.candidates[0].repo, "owner1/repo1");
}));

test("searchRepositorySlice flags truncated when total exceeds the cap", withToken(async () => {
  const ctx = {
    fetchJson: async () => ({ data: { search: {
      repositoryCount: 5000,
      pageInfo: { endCursor: "C", hasNextPage: true },
      nodes: [fakeNode(1), fakeNode(2), fakeNode(3)],
    } } }),
  };
  const r = await searchRepositorySlice(ctx, "q", { cap: 2 });
  assert.equal(r.candidates.length, 2); // capped
  assert.equal(r.total, 5000);
  assert.equal(r.truncated, true);
}));

test("searchRepositorySlice returns ran:false with NO token", withoutToken(async () => {
  let called = false;
  const ctx = { fetchJson: async () => { called = true; return {}; } };
  const r = await searchRepositorySlice(ctx, "q", {});
  assert.equal(r.ran, false);
  assert.equal(r.candidates.length, 0);
  assert.match(r.error, /token/i);
  assert.equal(called, false);
}));

// ---- fetchRecentStargazers (codex P1 #2 — precise star-velocity) ------------

test("fetchRecentStargazers returns recent starredAt timestamps (token present)", withToken(async () => {
  const ctx = {
    fetchJson: async (_u, opts) => {
      assert.match(JSON.parse(opts.body).query, /stargazers\(/);
      return { data: { repository: { stargazers: { edges: [{ starredAt: "2026-05-20T00:00:00Z" }, { starredAt: "2026-05-19T00:00:00Z" }] } } } };
    },
  };
  const r = await fetchRecentStargazers(ctx, "openai", "whisper", { first: 50 });
  assert.deepEqual(r, ["2026-05-20T00:00:00Z", "2026-05-19T00:00:00Z"]);
}));

test("fetchRecentStargazers: no token -> null (no fetch)", withoutToken(async () => {
  let called = false;
  const ctx = { fetchJson: async () => { called = true; return {}; } };
  assert.equal(await fetchRecentStargazers(ctx, "o", "n"), null);
  assert.equal(called, false);
}));

test("fetchRecentStargazers: bad shape -> null", withToken(async () => {
  const ctx = { fetchJson: async () => ({ data: { repository: null } }) };
  assert.equal(await fetchRecentStargazers(ctx, "o", "n"), null);
}));

test("fetchRecentStargazers: transport throw -> null", withToken(async () => {
  const ctx = { fetchJson: async () => { throw new Error("ETIMEDOUT"); } };
  assert.equal(await fetchRecentStargazers(ctx, "o", "n"), null);
}));

// ---- bad-shape GraphQL responses are failures, not empty slices (codex r2 #1) ----

test("searchRepositorySlice: GraphQL 200 with errors -> ran:true + error", withToken(async () => {
  const ctx = { fetchJson: async () => ({ errors: [{ message: "API rate limit exceeded" }], data: { search: null } }) };
  const r = await searchRepositorySlice(ctx, "q", {});
  assert.equal(r.ran, true);
  assert.match(r.error, /graphql errors|rate limit/i);
  assert.equal(r.candidates.length, 0);
}));

test("searchRepositorySlice: missing data.search -> ran:true + error", withToken(async () => {
  const ctx = { fetchJson: async () => ({ data: {} }) };
  const r = await searchRepositorySlice(ctx, "q", {});
  assert.equal(r.ran, true);
  assert.match(r.error, /missing data\.search/);
}));
