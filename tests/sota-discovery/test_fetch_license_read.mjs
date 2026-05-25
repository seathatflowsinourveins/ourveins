// tests/sota-discovery/test_fetch_license_read.mjs
// node --test — exercises the license-read fetcher (D07 LICENSE-file-text overlap source)
// against a MOCK ctx.fetchJson (no live network).
//
// Design: DESIGN.md §2 D07 LICENSE-read overlap source (sca-v22).
//
// Run: node --test tests/sota-discovery/test_fetch_license_read.mjs

import { test } from "node:test";
import assert from "node:assert/strict";

import {
  fetchLicenseRead,
  classifyLicenseText,
} from "../../tools/sota-discovery/lib/fetchers/license-read.mjs";
import { MISSINGNESS, SOURCE_CLASS } from "../../tools/sota-discovery/lib/contract.mjs";

const FIXED_NOW = Date.parse("2026-05-23T00:00:00Z");

// ---- 1. classifyLicenseText pure unit tests --------------------------------

test("classifyLicenseText: MIT -> permissive", () => {
  assert.equal(classifyLicenseText("MIT License\n\nPermission is hereby granted..."), "permissive");
});

test("classifyLicenseText: AGPL -> copyleft (AGPL before GPL substring)", () => {
  assert.equal(classifyLicenseText("GNU AFFERO GENERAL PUBLIC LICENSE\nVersion 3, November 2007"), "copyleft");
});

test("classifyLicenseText: LGPL -> copyleft (LGPL before GPL substring)", () => {
  assert.equal(classifyLicenseText("GNU LESSER GENERAL PUBLIC LICENSE\nVersion 2.1, February 1999"), "copyleft");
});

test("classifyLicenseText: Apache License 2.0 -> permissive", () => {
  assert.equal(classifyLicenseText("Apache License\nVersion 2.0"), "permissive");
});

test("classifyLicenseText: Business Source License -> source-available", () => {
  assert.equal(classifyLicenseText("Business Source License 1.1\n\nParameters"), "source-available");
});

test("classifyLicenseText: Server Side Public License -> source-available", () => {
  assert.equal(classifyLicenseText("Server Side Public License\n(SSPL)\nVersion 1"), "source-available");
});

test("classifyLicenseText: unrecognized text -> noassertion", () => {
  assert.equal(classifyLicenseText("random readme text\nno license here"), "noassertion");
});

test("classifyLicenseText: BSD 2-Clause -> permissive", () => {
  assert.equal(classifyLicenseText("BSD 2-Clause License\nRedistribution and use in source and binary forms..."), "permissive");
});

test("classifyLicenseText: BSD 3-Clause -> permissive", () => {
  assert.equal(classifyLicenseText("BSD 3-Clause License\nRedistribution and use..."), "permissive");
});

test("classifyLicenseText: ISC License -> permissive", () => {
  assert.equal(classifyLicenseText("ISC License\n\nCopyright (c)..."), "permissive");
});

test("classifyLicenseText: Unlicense -> permissive", () => {
  assert.equal(classifyLicenseText("This is free and unencumbered software released into the public domain.\nThis is the Unlicense."), "permissive");
});

test("classifyLicenseText: GPL-only (no AGPL/LGPL prefix) -> copyleft", () => {
  assert.equal(classifyLicenseText("GNU GENERAL PUBLIC LICENSE\nVersion 3, June 2007"), "copyleft");
});

test("classifyLicenseText: Mozilla Public License -> copyleft", () => {
  assert.equal(classifyLicenseText("Mozilla Public License\nVersion 2.0"), "copyleft");
});

test("classifyLicenseText: Elastic License -> source-available", () => {
  assert.equal(classifyLicenseText("Elastic License 2.0\n\nURL: https://www.elastic.co/licensing/elastic-license"), "source-available");
});

test("classifyLicenseText: Commons Clause -> source-available", () => {
  assert.equal(classifyLicenseText('Commons Clause\nLicense Condition v1.0\n\nThe Software is provided to you...'), "source-available");
});

test("classifyLicenseText: PolyForm -> source-available", () => {
  assert.equal(classifyLicenseText("PolyForm Noncommercial License 1.0.0"), "source-available");
});

test("classifyLicenseText: zlib -> permissive", () => {
  assert.equal(classifyLicenseText("This software is provided 'as-is', without any express or implied warranty.\nzlib License"), "permissive");
});

test("classifyLicenseText: EPL -> copyleft", () => {
  assert.equal(classifyLicenseText("Eclipse Public License - v 2.0"), "copyleft");
});

// ---- helper -----------------------------------------------------------------

function mockCtx(graphqlResponse, captured = {}) {
  return {
    now: FIXED_NOW,
    fetchJson: async (url, opts) => {
      captured.url = url;
      captured.opts = opts;
      return graphqlResponse;
    },
  };
}

/** Build a GraphQL response where `blobs` is a map of alias -> text | null. */
function makeGQLResponse(blobs = {}) {
  // aliases: a=LICENSE, b=LICENSE.md, c=LICENSE.txt, d=COPYING, e=COPYING.md
  const aliasMap = { a: null, b: null, c: null, d: null, e: null };
  for (const [k, v] of Object.entries(blobs)) {
    aliasMap[k] = v != null ? { text: v } : null;
  }
  return {
    data: {
      repository: {
        a: aliasMap.a,
        b: aliasMap.b,
        c: aliasMap.c,
        d: aliasMap.d,
        e: aliasMap.e,
      },
    },
  };
}

// ---- 2. Full fetcher: token present, MIT blob returned -> permissive + MEASURED ------

test("fetchLicenseRead: token present + MIT LICENSE blob -> permissive MEASURED CLASS-A", async () => {
  const prevTok = process.env.GITHUB_TOKEN;
  const prevGh = process.env.GH_TOKEN;
  process.env.GITHUB_TOKEN = "ghp_test_fake";
  delete process.env.GH_TOKEN;
  try {
    const captured = {};
    const mitText = "MIT License\n\nCopyright (c) 2024 Acme Corp\n\nPermission is hereby granted, free of charge...";
    const resp = makeGQLResponse({ a: mitText }); // alias 'a' = LICENSE
    const { dims, evidence } = await fetchLicenseRead("acme", "myrepo", mockCtx(resp, captured));

    assert.equal(dims.D07_license_class, "permissive");
    assert.equal(evidence.D07_license_class.missingness, MISSINGNESS.MEASURED);
    assert.equal(evidence.D07_license_class.source_class, SOURCE_CLASS.A);
    assert.equal(evidence.D07_license_class.source_uri, "https://github.com/acme/myrepo");
    assert.equal(typeof evidence.D07_license_class.measured_at, "string");
    // network call was made
    assert.equal(captured.url, "https://api.github.com/graphql");
    assert.equal(captured.opts.method, "POST");
    assert.match(captured.opts.headers.Authorization, /^bearer ghp_test_fake$/);
    const body = JSON.parse(captured.opts.body);
    assert.ok(body.query.includes("repository(owner:$owner,name:$name)"), "query must target repo");
    assert.ok(body.query.includes("HEAD:LICENSE"), "query must probe LICENSE blob");
    assert.equal(body.variables.owner, "acme");
    assert.equal(body.variables.name, "myrepo");
  } finally {
    if (prevTok === undefined) delete process.env.GITHUB_TOKEN; else process.env.GITHUB_TOKEN = prevTok;
    if (prevGh === undefined) delete process.env.GH_TOKEN; else process.env.GH_TOKEN = prevGh;
  }
});

// ---- 3. Token present, all blobs null -> noassertion MEASURED ---------------

test("fetchLicenseRead: token present + all blobs null -> noassertion MEASURED", async () => {
  const prev = process.env.GITHUB_TOKEN;
  process.env.GITHUB_TOKEN = "ghp_test_fake";
  try {
    const resp = makeGQLResponse({}); // all aliases null
    const { dims, evidence } = await fetchLicenseRead("o", "n", mockCtx(resp));

    assert.equal(dims.D07_license_class, "noassertion");
    assert.equal(evidence.D07_license_class.missingness, MISSINGNESS.MEASURED,
      "no LICENSE file is a real measured outcome, not NOT_MEASURABLE");
    assert.equal(evidence.D07_license_class.source_class, SOURCE_CLASS.A);
  } finally {
    if (prev === undefined) delete process.env.GITHUB_TOKEN; else process.env.GITHUB_TOKEN = prev;
  }
});

// ---- 4. No token -> null NOT_MEASURABLE, no fetch ---------------------------

test("fetchLicenseRead: NO token -> null NOT_MEASURABLE, fetchJson never called", async () => {
  const prevTok = process.env.GITHUB_TOKEN;
  const prevGh = process.env.GH_TOKEN;
  delete process.env.GITHUB_TOKEN;
  delete process.env.GH_TOKEN;
  try {
    let fetchCalled = false;
    const ctx = { now: FIXED_NOW, fetchJson: async () => { fetchCalled = true; return {}; } };
    const { dims, evidence } = await fetchLicenseRead("o", "n", ctx);

    assert.equal(fetchCalled, false, "must not call fetchJson without a token");
    assert.equal(dims.D07_license_class, null);
    assert.equal(evidence.D07_license_class.missingness, MISSINGNESS.NOT_MEASURABLE);
    assert.equal(evidence.D07_license_class.source_class, SOURCE_CLASS.A);
    assert.equal(evidence.D07_license_class.source_uri, "https://github.com/o/n");
  } finally {
    if (prevTok === undefined) delete process.env.GITHUB_TOKEN; else process.env.GITHUB_TOKEN = prevTok;
    if (prevGh === undefined) delete process.env.GH_TOKEN; else process.env.GH_TOKEN = prevGh;
  }
});

// ---- 5. Transport throw -> null NOT_MEASURABLE, no crash --------------------

test("fetchLicenseRead: transport throw -> null NOT_MEASURABLE (no crash)", async () => {
  const prev = process.env.GITHUB_TOKEN;
  process.env.GITHUB_TOKEN = "ghp_test_fake";
  try {
    const ctx = {
      now: FIXED_NOW,
      fetchJson: async () => { throw new Error("ECONNREFUSED"); },
    };
    const { dims, evidence } = await fetchLicenseRead("o", "n", ctx);

    assert.equal(dims.D07_license_class, null);
    assert.equal(evidence.D07_license_class.missingness, MISSINGNESS.NOT_MEASURABLE);
    assert.equal(evidence.D07_license_class.source_class, SOURCE_CLASS.A);
  } finally {
    if (prev === undefined) delete process.env.GITHUB_TOKEN; else process.env.GITHUB_TOKEN = prev;
  }
});

// ---- 6. GH_TOKEN fallback (when GITHUB_TOKEN absent) -----------------------

test("fetchLicenseRead: GH_TOKEN fallback used when GITHUB_TOKEN absent", async () => {
  const prevTok = process.env.GITHUB_TOKEN;
  const prevGh = process.env.GH_TOKEN;
  delete process.env.GITHUB_TOKEN;
  process.env.GH_TOKEN = "gh_fallback_token";
  try {
    const captured = {};
    const resp = makeGQLResponse({ b: "Apache License\nVersion 2.0\n\nTerms and Conditions" }); // alias b = LICENSE.md
    const { dims, evidence } = await fetchLicenseRead("foo", "bar", mockCtx(resp, captured));

    assert.equal(dims.D07_license_class, "permissive");
    assert.match(captured.opts.headers.Authorization, /^bearer gh_fallback_token$/);
    assert.equal(evidence.D07_license_class.missingness, MISSINGNESS.MEASURED);
  } finally {
    if (prevTok === undefined) delete process.env.GITHUB_TOKEN; else process.env.GITHUB_TOKEN = prevTok;
    if (prevGh === undefined) delete process.env.GH_TOKEN; else process.env.GH_TOKEN = prevGh;
  }
});

// ---- 7. COPYING alias (alias d) used when LICENSE aliases are null ----------

test("fetchLicenseRead: falls through to COPYING alias when LICENSE blobs null", async () => {
  const prev = process.env.GITHUB_TOKEN;
  process.env.GITHUB_TOKEN = "ghp_test_fake";
  try {
    const gplText = "GNU GENERAL PUBLIC LICENSE\nVersion 2, June 1991\n\nCopyright (C)...";
    const resp = makeGQLResponse({ d: gplText }); // alias d = COPYING
    const { dims } = await fetchLicenseRead("gnu", "somelib", mockCtx(resp));
    assert.equal(dims.D07_license_class, "copyleft");
  } finally {
    if (prev === undefined) delete process.env.GITHUB_TOKEN; else process.env.GITHUB_TOKEN = prev;
  }
});

// ---- 8. GraphQL hard error (errors array) -> null NOT_MEASURABLE ------------

test("fetchLicenseRead: GraphQL hard error response -> null NOT_MEASURABLE", async () => {
  const prev = process.env.GITHUB_TOKEN;
  process.env.GITHUB_TOKEN = "ghp_test_fake";
  try {
    const errResp = { errors: [{ message: "Could not resolve to a Repository" }], data: null };
    const { dims, evidence } = await fetchLicenseRead("o", "nonexistent", mockCtx(errResp));
    assert.equal(dims.D07_license_class, null);
    assert.equal(evidence.D07_license_class.missingness, MISSINGNESS.NOT_MEASURABLE);
  } finally {
    if (prev === undefined) delete process.env.GITHUB_TOKEN; else process.env.GITHUB_TOKEN = prev;
  }
});

// ---- 9. source-available: BUSL via text ------------------------------------

test("fetchLicenseRead: BUSL text in LICENSE.txt -> source-available MEASURED", async () => {
  const prev = process.env.GITHUB_TOKEN;
  process.env.GITHUB_TOKEN = "ghp_test_fake";
  try {
    const buslText = "Business Source License 1.1\nLicensor: Acme Corp\nLicensed Work: ...";
    const resp = makeGQLResponse({ c: buslText }); // alias c = LICENSE.txt
    const { dims, evidence } = await fetchLicenseRead("acme", "private-saas", mockCtx(resp));
    assert.equal(dims.D07_license_class, "source-available");
    assert.equal(evidence.D07_license_class.missingness, MISSINGNESS.MEASURED);
  } finally {
    if (prev === undefined) delete process.env.GITHUB_TOKEN; else process.env.GITHUB_TOKEN = prev;
  }
});
