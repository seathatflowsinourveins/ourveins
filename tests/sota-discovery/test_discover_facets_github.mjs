// tests/sota-discovery/test_discover_facets_github.mjs
// node --test — the 4 GitHub-API facets against a query-routing mock ctx.fetchJson
// (distinguishes the search-count, search-slice, and README GraphQL queries by body).
// Run: node --test tests/sota-discovery/test_discover_facets_github.mjs

import { test } from "node:test";
import assert from "node:assert/strict";

import {
  facetKeyword, facetTrending, facetAlternatives, facetAwesomeList,
} from "../../tools/sota-discovery/lib/discovery/facets-github.mjs";
import { FACET_IDS } from "../../tools/sota-discovery/lib/discovery/shared.mjs";

const TOK = "ghp_fake_for_tests";
function withToken(fn) {
  return async () => {
    const a = process.env.GITHUB_TOKEN, b = process.env.GH_TOKEN;
    process.env.GITHUB_TOKEN = TOK; delete process.env.GH_TOKEN;
    try { await fn(); } finally {
      if (a === undefined) delete process.env.GITHUB_TOKEN; else process.env.GITHUB_TOKEN = a;
      if (b === undefined) delete process.env.GH_TOKEN; else process.env.GH_TOKEN = b;
    }
  };
}
function withoutToken(fn) {
  return async () => {
    const a = process.env.GITHUB_TOKEN, b = process.env.GH_TOKEN;
    delete process.env.GITHUB_TOKEN; delete process.env.GH_TOKEN;
    try { await fn(); } finally {
      if (a === undefined) delete process.env.GITHUB_TOKEN; else process.env.GITHUB_TOKEN = a;
      if (b === undefined) delete process.env.GH_TOKEN; else process.env.GH_TOKEN = b;
    }
  };
}

function node(name) {
  return {
    nameWithOwner: name, stargazerCount: 100, createdAt: "2022-01-01T00:00:00Z",
    pushedAt: "2026-05-01T00:00:00Z", isArchived: false, isFork: false,
    licenseInfo: { spdxId: "MIT" }, description: name,
  };
}

// Route a mock GraphQL endpoint by inspecting the query body: README > slice > count.
function makeCtx(handlers, captured = { qs: [] }) {
  return {
    fetchJson: async (_url, opts) => {
      const body = opts && opts.body ? JSON.parse(opts.body) : {};
      const q = body.query || "";
      const v = body.variables || {};
      if (/HEAD:README/.test(q)) {
        captured.qs.push(`readme:${v.o}/${v.n}`);
        const txt = handlers.readme ? handlers.readme(v.o, v.n) : null;
        return { data: { repository: txt == null ? { a: null, b: null, c: null, d: null } : { a: { text: txt } } } };
      }
      if (/nameWithOwner/.test(q)) {
        captured.qs.push(`slice:${v.q}`);
        const nodes = handlers.slice ? handlers.slice(v.q) : [];
        return { data: { search: { repositoryCount: nodes.length, pageInfo: { endCursor: null, hasNextPage: false }, nodes } } };
      }
      if (/repositoryCount/.test(q)) {
        captured.qs.push(`count:${v.q}`);
        const n = handlers.count ? handlers.count(v.q) : 0;
        return { data: { search: { repositoryCount: n } } };
      }
      throw new Error("unexpected query: " + q.slice(0, 50));
    },
  };
}

// ---- facetKeyword ----------------------------------------------------------

test("facetKeyword: no token -> ran:false", withoutToken(async () => {
  const r = await facetKeyword(makeCtx({}), { query: "claude code" });
  assert.equal(r.ran, false);
  assert.equal(r.candidates.length, 0);
  assert.equal(r.facet, FACET_IDS.KEYWORD);
}));

test("facetKeyword: small result set -> single slice retrieved", withToken(async () => {
  const ctx = makeCtx({
    count: () => 250, // <= cap -> not partitioned
    slice: () => [node("vercel/next.js"), node("remix-run/remix"), node("sveltejs/kit")],
  });
  const r = await facetKeyword(ctx, { query: "react framework" });
  assert.equal(r.ran, true);
  assert.equal(r.truncated, false);
  assert.equal(r.candidates.length, 3);
  assert.equal(r.slices.length, 1);
  assert.equal(r.slices[0].qualifier, "");
  assert.equal(r.candidates[0].sources[0], FACET_IDS.KEYWORD);
}));

test("facetKeyword: count>cap partitions across star buckets", withToken(async () => {
  const ctx = makeCtx({
    count: (q) => (/stars:/.test(q) ? 200 : 2000), // base query 2000>cap; each star bucket 200<=cap
    slice: (q) => [node(`o/${q.replace(/[^a-z0-9]/gi, "").slice(-8)}`)],
  });
  const r = await facetKeyword(ctx, { query: "agent" });
  assert.equal(r.ran, true);
  assert.equal(r.slices.length, 7); // 7 non-empty star buckets
  assert.equal(r.candidates.length, 7);
  assert.equal(r.truncated, false);
}));

// ---- facetTrending ---------------------------------------------------------

test("facetTrending: applies a recent pushed:> window + tags TRENDING", withToken(async () => {
  const captured = { qs: [] };
  const ctx = makeCtx({ count: () => 50, slice: () => [node("fast/rising")] }, captured);
  const r = await facetTrending(ctx, { query: "rag", now: Date.parse("2026-05-23T00:00:00Z") });
  assert.equal(r.ran, true);
  assert.equal(r.facet, FACET_IDS.TRENDING);
  assert.equal(r.candidates[0].sources[0], FACET_IDS.TRENDING);
  assert.ok(captured.qs.some((s) => /pushed:>/.test(s)), "query should carry a recent pushed:> window");
}));

// ---- facetAlternatives -----------------------------------------------------

test("facetAlternatives: mines anchor README Alternatives + feeds anchorAlternatives", withToken(async () => {
  const ctx = makeCtx({
    readme: (o) => (o === "anthropics"
      ? "# Claude Code\n## Alternatives\n- [Aider](https://github.com/paul-gauthier/aider)\n- [Cline](https://github.com/cline/cline)\n"
      : null),
  });
  const r = await facetAlternatives(ctx, { anchors: ["anthropics/claude-code"] });
  assert.equal(r.ran, true);
  assert.equal(r.facet, FACET_IDS.ALTERNATIVES);
  const repos = r.candidates.map((c) => c.repo).sort();
  assert.deepEqual(repos, ["cline/cline", "paul-gauthier/aider"]);
  assert.equal(r.anchorAlternatives.length, 1);
  assert.equal(r.anchorAlternatives[0].repo, "anthropics/claude-code");
  assert.deepEqual(r.anchorAlternatives[0].alternatives.sort(), ["cline/cline", "paul-gauthier/aider"]);
}));

test("facetAlternatives: no token -> ran:false, empty anchorAlternatives entries", withoutToken(async () => {
  const r = await facetAlternatives(makeCtx({}), { anchors: ["anthropics/claude-code"] });
  assert.equal(r.ran, false);
  assert.equal(r.candidates.length, 0);
}));

test("facetAlternatives: no anchors -> ran:false", withToken(async () => {
  const r = await facetAlternatives(makeCtx({}), { anchors: [] });
  assert.equal(r.ran, false);
  assert.equal(r.facet, FACET_IDS.ALTERNATIVES);
}));

// ---- facetAwesomeList ------------------------------------------------------

test("facetAwesomeList: harvests list READMEs + records curated membership", withToken(async () => {
  const ctx = makeCtx({
    slice: (q) => (/awesome/.test(q) ? [node("o/awesome-claude")] : []),
    readme: (o, n) => (n === "awesome-claude"
      ? "# Awesome Claude\n## Tools\n- https://github.com/p/q\n- [R](https://github.com/r/s)\n"
      : null),
  });
  const r = await facetAwesomeList(ctx, { query: "claude code" });
  assert.equal(r.ran, true);
  assert.equal(r.facet, FACET_IDS.AWESOME_LIST);
  const byRepo = Object.fromEntries(r.candidates.map((c) => [c.repo, c]));
  assert.ok(byRepo["p/q"], "p/q harvested");
  assert.ok(byRepo["r/s"], "r/s harvested");
  assert.deepEqual(byRepo["p/q"].curatedListMemberships, ["o/awesome-claude"]);
}));

test("facetAwesomeList: no token -> ran:false", withoutToken(async () => {
  const r = await facetAwesomeList(makeCtx({}), { query: "claude code" });
  assert.equal(r.ran, false);
  assert.equal(r.candidates.length, 0);
}));

// ---- coverage honesty: a mid-run slice error is a truncation concern (codex P1 #1) ----

test("facetKeyword: a slice transport error marks the slice truncated + sets facet error", withToken(async () => {
  const ctx = {
    fetchJson: async (_url, opts) => {
      const q = JSON.parse(opts.body).query || "";
      if (/nameWithOwner/.test(q)) throw new Error("ECONNRESET mid-pagination");
      if (/repositoryCount/.test(q)) return { data: { search: { repositoryCount: 50 } } };
      throw new Error("unexpected");
    },
  };
  const r = await facetKeyword(ctx, { query: "agent" });
  assert.equal(r.ran, true);        // count probe + slice attempt ran
  assert.equal(r.truncated, true);  // an errored slice is an incomplete-coverage concern
  assert.match(r.error, /slice errors/);
  assert.ok(r.slices.some((s) => s.truncated === true), "errored slice flagged truncated");
}));
