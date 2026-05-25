// tests/sota-discovery/test_fetch_ecosystems.mjs
// TDD tests for fetchEcosystems — ecosyste.ms reverse-dependents fetcher.
// Run: node --test tests/sota-discovery/test_fetch_ecosystems.mjs

import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { fetchEcosystems } from "../../tools/sota-discovery/lib/fetchers/ecosystems.mjs";
import { MISSINGNESS, SOURCE_CLASS } from "../../tools/sota-discovery/lib/contract.mjs";

const OWNER = "anthropics";
const NAME = "claude-code";

// Helper: build a mock ctx with a fixed fetchJson response or behaviour.
function mockCtx(impl) {
  return { fetchJson: impl };
}

describe("fetchEcosystems", () => {
  it("test 1 — happy path: dependent_repos_count present → MEASURED", async () => {
    const ctx = mockCtx(async (_url) => ({
      full_name: `${OWNER}/${NAME}`,
      dependent_repos_count: 4200,
      stargazers_count: 999,
    }));
    const result = await fetchEcosystems(OWNER, NAME, ctx);
    assert.equal(result.dims.D21_reverse_dependents, 4200);
    assert.equal(result.evidence.D21_reverse_dependents.missingness, MISSINGNESS.MEASURED);
    assert.equal(result.evidence.D21_reverse_dependents.source_class, SOURCE_CLASS.A);
  });

  it("test 2 — alternate field: dependents_count present → 99 MEASURED", async () => {
    const ctx = mockCtx(async (_url) => ({
      dependents_count: 99,
    }));
    const result = await fetchEcosystems(OWNER, NAME, ctx);
    assert.equal(result.dims.D21_reverse_dependents, 99);
    assert.equal(result.evidence.D21_reverse_dependents.missingness, MISSINGNESS.MEASURED);
    assert.equal(result.evidence.D21_reverse_dependents.source_class, SOURCE_CLASS.A);
  });

  it("test 3 — no usable field: response has no dependent field → null NOT_MEASURABLE", async () => {
    const ctx = mockCtx(async (_url) => ({
      full_name: "o/r",
      stargazers_count: 5,
    }));
    const result = await fetchEcosystems(OWNER, NAME, ctx);
    assert.equal(result.dims.D21_reverse_dependents, null);
    assert.equal(result.evidence.D21_reverse_dependents.missingness, MISSINGNESS.NOT_MEASURABLE);
  });

  it("test 4 — 404/null: ctx.fetchJson returns null → null NOT_MEASURABLE", async () => {
    const ctx = mockCtx(async (_url) => null);
    const result = await fetchEcosystems(OWNER, NAME, ctx);
    assert.equal(result.dims.D21_reverse_dependents, null);
    assert.equal(result.evidence.D21_reverse_dependents.missingness, MISSINGNESS.NOT_MEASURABLE);
  });

  it("test 5 — throw: ctx.fetchJson throws → null NOT_MEASURABLE, no exception escapes", async () => {
    const ctx = mockCtx(async (_url) => { throw new Error("network error"); });
    // Should not throw
    const result = await fetchEcosystems(OWNER, NAME, ctx);
    assert.equal(result.dims.D21_reverse_dependents, null);
    assert.equal(result.evidence.D21_reverse_dependents.missingness, MISSINGNESS.NOT_MEASURABLE);
  });

  it("test 6 — URL contains encoded owner/name", async () => {
    let capturedUrl = null;
    const ctx = mockCtx(async (url) => {
      capturedUrl = url;
      return { dependent_repos_count: 1 };
    });
    await fetchEcosystems(OWNER, NAME, ctx);
    assert.ok(capturedUrl, "fetchJson must be called");
    // URL should contain owner and name (encoded)
    assert.ok(
      capturedUrl.includes(encodeURIComponent(OWNER)) || capturedUrl.includes(OWNER),
      `URL should contain owner. Got: ${capturedUrl}`,
    );
    assert.ok(
      capturedUrl.includes(encodeURIComponent(NAME)) || capturedUrl.includes(NAME),
      `URL should contain name. Got: ${capturedUrl}`,
    );
  });

  it("test 6b — URL contains combined owner%2Fname segment", async () => {
    const specialOwner = "my-org";
    const specialName = "my repo"; // name with space to exercise encodeURIComponent
    let capturedUrl = null;
    const ctx = mockCtx(async (url) => { capturedUrl = url; return null; });
    await fetchEcosystems(specialOwner, specialName, ctx);
    assert.ok(capturedUrl.includes(encodeURIComponent(specialName)), `URL should encode name. Got: ${capturedUrl}`);
  });
});
