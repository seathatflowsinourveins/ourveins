// tests/sota-discovery/test_fetch_depsdev.mjs
// node --test  — NO live HTTP; ctx.fetchJson is a mock returning canned deps.dev JSON.
// JSON shapes mirror the LIVE 2026-05-23 probes documented at the top of depsdev.mjs.

import { test } from "node:test";
import assert from "node:assert/strict";

import { fetchDepsdev } from "../../tools/sota-discovery/lib/fetchers/depsdev.mjs";
import { MISSINGNESS, SOURCE_CLASS } from "../../tools/sota-discovery/lib/contract.mjs";

// ---------------------------------------------------------------------------
// Mock factory: route by URL substring. Unmatched URLs throw (mimics 404),
// which the fetcher must collapse to "not resolvable".
// ---------------------------------------------------------------------------
function makeCtx(routes) {
  const calls = [];
  // Match action-suffix routes (":dependencies" / ":dependents") FIRST regardless of
  // declaration order, since those URLs also contain the "/packages/<name>/" prefix
  // and would otherwise be shadowed by a package-listing route.
  const ordered = [...routes].sort((a, b) => {
    const aAction = a[0].startsWith(":");
    const bAction = b[0].startsWith(":");
    if (aAction !== bAction) return aAction ? -1 : 1;
    return b[0].length - a[0].length; // then longest-needle-first
  });
  const fetchJson = async (url) => {
    calls.push(url);
    for (const [needle, payload] of ordered) {
      if (url.includes(needle)) {
        if (payload instanceof Error) throw payload;
        return typeof payload === "function" ? payload(url) : payload;
      }
    }
    const err = new Error(`mock 404: ${url}`);
    err.status = 404;
    throw err;
  };
  return { ctx: { fetchJson }, calls };
}

const PKG = (system, nm, versions) => ({ packageKey: { system, name: nm }, versions });
const VER = (system, nm, version, extra = {}) => ({
  versionKey: { system, name: nm, version },
  publishedAt: "2024-01-01T00:00:00Z",
  isDefault: false,
  isDeprecated: false,
  deprecatedReason: "",
  advisoryKeys: [],
  ...extra,
});
const NODE = (system, nm, version, relation, errors = []) => ({
  versionKey: { system, name: nm, version },
  bundled: false,
  relation,
  errors,
});

// ---------------------------------------------------------------------------
test("happy path: clean deps -> D20=1.0, D21=count, both MEASURED + CLASS-A", async () => {
  const routes = [
    // npm package resolves; one default version. Same handler serves the package
    // listing AND the per-dep version-detail lookups (all clean).
    [
      "/v3/systems/npm/packages/",
      (url) => {
        if (url.endsWith("/packages/myrepo")) {
          return PKG("NPM", "myrepo", [VER("NPM", "myrepo", "1.0.0", { isDefault: true })]);
        }
        // version detail for sampled deps (all clean)
        return VER("NPM", "depA", "2.0.0");
      },
    ],
    // dependencies graph: SELF + 2 clean DIRECT deps
    [
      ":dependencies",
      {
        nodes: [
          NODE("NPM", "myrepo", "1.0.0", "SELF"),
          NODE("NPM", "depA", "2.0.0", "DIRECT"),
          NODE("NPM", "depB", "3.0.0", "DIRECT"),
        ],
        edges: [],
      },
    ],
    [":dependents", { dependentCount: 2191, directDependentCount: 860, indirectDependentCount: 1380 }],
    // pypi must NOT resolve (only npm)
    ["/v3/systems/pypi/packages/myrepo", new Error("404")],
  ];
  const { ctx } = makeCtx(routes);
  const out = await fetchDepsdev("octo", "myrepo", ctx);

  assert.equal(out.dims.D20_transitive_dep_health, 1.0);
  assert.equal(out.dims.D21_reverse_dependents, 2191);

  const e20 = out.evidence.D20_transitive_dep_health;
  const e21 = out.evidence.D21_reverse_dependents;
  // EvidenceAnchor shape
  for (const ev of [e20, e21]) {
    assert.equal(ev.source_class, SOURCE_CLASS.A);
    assert.ok(typeof ev.source_uri === "string" && ev.source_uri.length > 0);
    assert.ok(typeof ev.measured_at === "string");
    assert.equal(ev.missingness, MISSINGNESS.MEASURED);
  }
  assert.equal(e20.value, 1.0);
  assert.equal(e21.value, 2191);
});

// ---------------------------------------------------------------------------
test("unhealthy deps: deprecated + advisory-bearing deps drop D20 below 1", async () => {
  const versionDetail = (url) => {
    if (url.endsWith("/packages/repo2")) {
      return PKG("NPM", "repo2", [VER("NPM", "repo2", "1.0.0", { isDefault: true })]);
    }
    if (url.includes("/packages/depGood/")) return VER("NPM", "depGood", "1.0.0");
    if (url.includes("/packages/depDeprecated/"))
      return VER("NPM", "depDeprecated", "1.0.0", { isDeprecated: true });
    if (url.includes("/packages/depVuln/"))
      return VER("NPM", "depVuln", "1.0.0", { advisoryKeys: [{ id: "GHSA-x" }] });
    return VER("NPM", "x", "1.0.0");
  };
  const routes = [
    ["/v3/systems/npm/packages/", versionDetail],
    [
      ":dependencies",
      {
        nodes: [
          NODE("NPM", "repo2", "1.0.0", "SELF"),
          NODE("NPM", "depGood", "1.0.0", "DIRECT"),
          NODE("NPM", "depDeprecated", "1.0.0", "DIRECT"),
          NODE("NPM", "depVuln", "1.0.0", "INDIRECT"),
        ],
        edges: [],
      },
    ],
    [":dependents", { dependentCount: 5 }],
    ["/v3/systems/pypi/packages/repo2", new Error("404")],
  ];
  const { ctx } = makeCtx(routes);
  const out = await fetchDepsdev("octo", "repo2", ctx);

  // 3 deps assessed, 1 clean -> resolvableRatio(1.0) * cleanSampleRatio(1/3)
  assert.ok(out.dims.D20_transitive_dep_health > 0.32 && out.dims.D20_transitive_dep_health < 0.34);
  assert.equal(out.evidence.D20_transitive_dep_health.missingness, MISSINGNESS.MEASURED);
});

// ---------------------------------------------------------------------------
test("resolution errors reduce D20 via resolvableRatio", async () => {
  const detail = (url) => {
    if (url.endsWith("/packages/repo3")) {
      return PKG("NPM", "repo3", [VER("NPM", "repo3", "1.0.0", { isDefault: true })]);
    }
    return VER("NPM", "ok", "1.0.0"); // every resolvable dep detail is clean
  };
  const routes = [
    ["/v3/systems/npm/packages/", detail],
    [
      ":dependencies",
      {
        nodes: [
          NODE("NPM", "repo3", "1.0.0", "SELF"),
          NODE("NPM", "ok", "1.0.0", "DIRECT"),
          NODE("NPM", "broken", "9.9.9", "DIRECT", [{ code: "UNRESOLVED" }]),
        ],
        edges: [],
      },
    ],
    [":dependents", { dependentCount: 10 }],
    ["/v3/systems/pypi/packages/repo3", new Error("404")],
  ];
  const { ctx } = makeCtx(routes);
  const out = await fetchDepsdev("octo", "repo3", ctx);
  // 1 of 2 deps resolvable -> resolvableRatio 0.5; sampled clean -> 0.5 * 1.0
  assert.equal(out.dims.D20_transitive_dep_health, 0.5);
});

// ---------------------------------------------------------------------------
test("NOT_MEASURABLE: package maps to no registry system", async () => {
  // Every URL 404s.
  const { ctx, calls } = makeCtx([]);
  const out = await fetchDepsdev("nobody", "ghost-pkg-zzz", ctx);

  assert.equal(out.dims.D20_transitive_dep_health, null);
  assert.equal(out.dims.D21_reverse_dependents, null);
  assert.equal(out.evidence.D20_transitive_dep_health.missingness, MISSINGNESS.NOT_MEASURABLE);
  assert.equal(out.evidence.D21_reverse_dependents.missingness, MISSINGNESS.NOT_MEASURABLE);
  assert.equal(out.evidence.D20_transitive_dep_health.value, null);
  assert.equal(out.evidence.D20_transitive_dep_health.source_class, SOURCE_CLASS.A);
  // It must have attempted both systems before giving up.
  assert.ok(calls.some((u) => u.includes("/systems/npm/")));
  assert.ok(calls.some((u) => u.includes("/systems/pypi/")));
});

// ---------------------------------------------------------------------------
test("NOT_MEASURABLE for D20 when dependency graph is empty (but D21 still measured)", async () => {
  const routes = [
    [
      "/v3/systems/npm/packages/leaf",
      PKG("NPM", "leaf", [VER("NPM", "leaf", "1.0.0", { isDefault: true })]),
    ],
    [":dependencies", { nodes: [NODE("NPM", "leaf", "1.0.0", "SELF")], edges: [] }],
    [":dependents", { dependentCount: 42 }],
    ["/v3/systems/pypi/packages/leaf", new Error("404")],
  ];
  const { ctx } = makeCtx(routes);
  const out = await fetchDepsdev("octo", "leaf", ctx);
  assert.equal(out.dims.D20_transitive_dep_health, null);
  assert.equal(out.evidence.D20_transitive_dep_health.missingness, MISSINGNESS.NOT_MEASURABLE);
  assert.equal(out.dims.D21_reverse_dependents, 42);
  assert.equal(out.evidence.D21_reverse_dependents.missingness, MISSINGNESS.MEASURED);
});

// ---------------------------------------------------------------------------
test("CONFLICTING: npm vs pypi dependent counts diverge beyond tolerance", async () => {
  const npmDetail = (url) => {
    if (url.endsWith("/packages/dual")) {
      return PKG("NPM", "dual", [VER("NPM", "dual", "1.0.0", { isDefault: true })]);
    }
    return VER("NPM", "d", "1.0.0");
  };
  const pypiDetail = (url) => {
    if (url.endsWith("/packages/dual")) {
      return PKG("PYPI", "dual", [VER("PYPI", "dual", "9.0.0", { isDefault: true })]);
    }
    return VER("PYPI", "d", "1.0.0");
  };
  let dependentsHits = 0;
  const dependentsRouter = (url) => {
    dependentsHits += 1;
    // npm primary first (high), pypi second (low) -> ratio > 0.5 tolerance
    return url.includes("/systems/npm/")
      ? { dependentCount: 1000 }
      : { dependentCount: 10 };
  };
  const routes = [
    ["/v3/systems/npm/packages/dual", npmDetail],
    ["/v3/systems/pypi/packages/dual", pypiDetail],
    [":dependencies", { nodes: [NODE("NPM", "dual", "1.0.0", "SELF")], edges: [] }],
    [":dependents", dependentsRouter],
  ];
  const { ctx } = makeCtx(routes);
  const out = await fetchDepsdev("octo", "dual", ctx);

  assert.equal(out.dims.D21_reverse_dependents, 1000); // larger kept
  assert.equal(out.evidence.D21_reverse_dependents.missingness, MISSINGNESS.CONFLICTING);
  assert.ok(out.evidence.D21_reverse_dependents.source_uri.includes("|")); // both URIs recorded
  assert.equal(dependentsHits, 2); // both registries queried
});
