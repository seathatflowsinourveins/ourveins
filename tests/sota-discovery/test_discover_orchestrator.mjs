// tests/sota-discovery/test_discover_orchestrator.mjs
// node --test — end-to-end discover() pipeline against ONE mock ctx.fetchJson that routes every
// source type: GitHub GraphQL (count / slice / README), PapersWithCode (GET), ecosyste.ms (GET).
// Proves fan-out -> merge+dedup -> dual-score -> coverage-CHECK -> ranking -> artifact, plus the
// honest no-token degrade. Run: node --test tests/sota-discovery/test_discover_orchestrator.mjs

import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, readFile, rm, stat } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

import { discover, writeDiscoveryArtifact, summarize } from "../../tools/sota-discovery/discover.mjs";

const NOW = Date.parse("2026-05-23T00:00:00Z");

function node(name, stars = 100) {
  return {
    nameWithOwner: name, stargazerCount: stars, createdAt: "2022-01-01T00:00:00Z",
    pushedAt: "2026-05-01T00:00:00Z", isArchived: false, isFork: false,
    licenseInfo: { spdxId: "MIT" }, description: name,
  };
}

// One mock fetchJson covering all 5 source shapes. GraphQL POST carries opts.body; the external
// facets do a bare GET (no body) — routed by URL.
function makeFetchJson() {
  return async (url, opts) => {
    if (!opts || !opts.body) {
      // external GET facets
      if (/paperswithcode\.com/.test(url)) {
        return { count: 1, results: [{ repository: { url: "https://github.com/openai/whisper", stars: 60000 } }] };
      }
      if (/ecosyste\.ms/.test(url)) {
        return [{
          full_name: "tiangolo/fastapi", stargazers_count: 70000, dependent_repos_count: 500,
          created_at: "2018-12-08T00:00:00Z", pushed_at: "2026-05-01T00:00:00Z", host: { name: "GitHub" },
        }];
      }
      return null;
    }
    // GraphQL POST
    const body = JSON.parse(opts.body);
    const q = body.query || "";
    const v = body.variables || {};
    if (/stargazers\(/.test(q)) {
      // recent stargazers for the velocity-enrichment pass — whisper is a hot repo
      const edges = v.n === "whisper"
        ? Array.from({ length: 80 }, (_, i) => ({ starredAt: new Date(NOW - i * 86400000).toISOString() }))
        : [];
      return { data: { repository: { stargazers: { edges } } } };
    }
    if (/HEAD:README/.test(q)) {
      let text = null;
      if (v.n === "awesome-ml") text = "# Awesome ML\n## Models\n- https://github.com/openai/whisper\n";
      else if (v.o === "anthropics") text = "# Claude Code\n## Alternatives\n- [Cline](https://github.com/cline/cline)\n";
      return { data: { repository: text == null ? { a: null, b: null, c: null, d: null } : { a: { text } } } };
    }
    if (/nameWithOwner/.test(q)) {
      let nodes = [];
      if (/awesome/.test(v.q)) nodes = [node("o/awesome-ml")];
      else if (/pushed:>/.test(v.q)) nodes = [node("fast/rising", 100), node("openai/whisper", 55000)];
      else nodes = [node("openai/whisper", 55000), node("vercel/next.js", 50000)];
      return { data: { search: { repositoryCount: nodes.length, pageInfo: { endCursor: null, hasNextPage: false }, nodes } } };
    }
    if (/repositoryCount/.test(q)) {
      return { data: { search: { repositoryCount: 250 } } }; // <= cap; no partition
    }
    throw new Error("unexpected query: " + q.slice(0, 50));
  };
}

function withToken(fn) {
  return async () => {
    const a = process.env.GITHUB_TOKEN, b = process.env.GH_TOKEN;
    process.env.GITHUB_TOKEN = "ghp_fake_for_tests"; delete process.env.GH_TOKEN;
    try { await fn(); } finally {
      if (a === undefined) delete process.env.GITHUB_TOKEN; else process.env.GITHUB_TOKEN = a;
      if (b === undefined) delete process.env.GH_TOKEN; else process.env.GH_TOKEN = b;
    }
  };
}

test("discover: full pipeline fans out 6 facets, merges, scores, checks coverage", withToken(async () => {
  const result = await discover({
    query: "ml framework", anchors: ["anthropics/claude-code"], now: NOW,
    fetchJson: makeFetchJson(), limit: 25,
  });

  assert.equal(result.schema, "sca-v22-discovery");
  assert.equal(result.facet_summary.length, 6);
  assert.ok(result.facet_summary.every((f) => f.ran === true), "all 6 facets reachable in the mock");
  assert.ok(result.candidate_count >= 5, `expected >=5 candidates, got ${result.candidate_count}`);

  // multi-source merge: whisper surfaced by keyword + trending + awesome + paper-linked
  const whisper = result.all_candidates.find((c) => c.repo === "openai/whisper");
  assert.ok(whisper, "whisper present");
  assert.ok(whisper.sources.length >= 3, `whisper multi-source, got ${whisper.sources.length}`);
  assert.equal(whisper.stars, 60000); // MAX across facets (paper-linked 60000 > slice 55000)
  assert.equal(whisper.velocity_enriched, true); // top-K shortlist got precise star-velocity (codex P1 #2)
  assert.ok(Array.isArray(whisper.recentStarredAt) && whisper.recentStarredAt.length > 0, "starredAt populated");

  // external facet data threaded through merge
  const fastapi = result.all_candidates.find((c) => c.repo === "tiangolo/fastapi");
  assert.ok(fastapi && fastapi.reverseDeps === 500, "reverse-dep facet data merged");

  // dual scores attached + in range
  for (const c of result.all_candidates) {
    assert.ok(c.leader_score >= 0 && c.leader_score <= 1, "leader_score in [0,1]");
    assert.ok(c.hidden_gem_score >= 0 && c.hidden_gem_score <= 1, "gem in [0,1]");
  }
  // ranked views sorted descending on their respective axes
  for (let i = 1; i < result.leaders.length; i++) {
    assert.ok(result.leaders[i - 1].leader_score >= result.leaders[i].leader_score, "leaders sorted");
  }
  for (let i = 1; i < result.hidden_gems.length; i++) {
    assert.ok(result.hidden_gems[i - 1].hidden_gem_score >= result.hidden_gems[i].hidden_gem_score, "gems sorted");
  }

  // coverage-CHECK: all facets ran, no truncation, anchor cline/cline is a candidate (no hole)
  assert.equal(result.coverage.complete, true);
  assert.equal(result.coverage.anchor_holes.length, 0);
  assert.ok(result.coverage.leader_set.includes("openai/whisper"), "whisper in leader_set (multi-source)");
  assert.match(result.gap_report.recommendation, /^OK/);

  // alternatives facet wired cline/cline into the candidate set
  assert.ok(result.all_candidates.some((c) => c.repo === "cline/cline"), "alternative cline/cline discovered");
}));

test("discover: curated anchor alternative NOT independently discovered -> coverage hole", withToken(async () => {
  // Operator-curated ground truth: claude-code's peers are [cline/cline, ghost/missing].
  // The broad facets surface cline/cline but NEVER ghost/missing -> ghost/missing is a real hole.
  const fetchJson = async (url, opts) => {
    if (!opts || !opts.body) return /paperswithcode/.test(url) ? { count: 0, results: [] } : [];
    const body = JSON.parse(opts.body); const q = body.query || ""; const v = body.variables || {};
    if (/HEAD:README/.test(q)) {
      const text = v.o === "anthropics" ? "## Alternatives\n- [Cline](https://github.com/cline/cline)\n" : null;
      return { data: { repository: text == null ? {} : { a: { text } } } };
    }
    if (/nameWithOwner/.test(q)) return { data: { search: { repositoryCount: 1, pageInfo: { endCursor: null, hasNextPage: false }, nodes: [node("cline/cline")] } } };
    if (/repositoryCount/.test(q)) return { data: { search: { repositoryCount: 10 } } };
    throw new Error("unexpected");
  };
  const result = await discover({
    query: "x", anchors: ["anthropics/claude-code"], now: NOW, fetchJson,
    curatedAnchors: [{ repo: "anthropics/claude-code", alternatives: ["cline/cline", "ghost/missing"] }],
  });
  assert.equal(result.coverage.complete, false);
  const hole = result.coverage.anchor_holes.find((h) => h.anchor === "anthropics/claude-code");
  assert.ok(hole && hole.missing.includes("ghost/missing"), "ghost/missing flagged as a coverage hole");
  assert.ok(!hole.missing.includes("cline/cline"), "cline/cline was corroborated -> not a hole");
  assert.match(result.gap_report.recommendation, /INVESTIGATE/);
}));

test("discover: no GITHUB_TOKEN -> GitHub facets degrade honestly, externals still run", async () => {
  const a = process.env.GITHUB_TOKEN, b = process.env.GH_TOKEN;
  delete process.env.GITHUB_TOKEN; delete process.env.GH_TOKEN;
  try {
    const result = await discover({ query: "ml framework", now: NOW, fetchJson: makeFetchJson() });
    const byFacet = Object.fromEntries(result.facet_summary.map((f) => [f.facet, f.ran]));
    assert.equal(byFacet["keyword-topic"], false);
    assert.equal(byFacet["trending-velocity"], false);
    assert.equal(byFacet["awesome-list"], false);
    assert.equal(byFacet["paper-linked"], true);     // external — no token needed
    assert.equal(byFacet["reverse-dependency"], true);
    assert.equal(result.coverage.complete, false);   // GitHub facets didn't run
    assert.ok(result.gap_report.gaps.facets_not_run.includes("keyword-topic"));
  } finally {
    if (a === undefined) delete process.env.GITHUB_TOKEN; else process.env.GITHUB_TOKEN = a;
    if (b === undefined) delete process.env.GH_TOKEN; else process.env.GH_TOKEN = b;
  }
});

test("discover requires a query", async () => {
  await assert.rejects(() => discover({}), /requires a query/);
});

test("writeDiscoveryArtifact persists the full result atomically", withToken(async () => {
  const dir = await mkdtemp(join(tmpdir(), "sca-disc-"));
  try {
    const result = await discover({ query: "ml framework", now: NOW, fetchJson: makeFetchJson() });
    const path = await writeDiscoveryArtifact(result, dir);
    const st = await stat(path);
    assert.ok(st.isFile());
    const round = JSON.parse(await readFile(path, "utf8"));
    assert.equal(round.schema, "sca-v22-discovery");
    assert.equal(round.candidate_count, result.candidate_count);
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
}));

test("summarize emits a compact view (no full candidate dump)", withToken(async () => {
  const result = await discover({ query: "ml framework", now: NOW, fetchJson: makeFetchJson() });
  const s = summarize(result);
  assert.equal(s.schema, "sca-v22-discovery");
  assert.ok(Array.isArray(s.top_leaders) && s.top_leaders.length <= 10);
  assert.ok(Array.isArray(s.top_gems) && s.top_gems.length <= 10);
  assert.equal(s.all_candidates, undefined, "summary must NOT carry the full candidate set");
}));
