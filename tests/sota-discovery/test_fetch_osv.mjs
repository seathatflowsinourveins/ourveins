// tests/sota-discovery/test_fetch_osv.mjs
// node --test — OSV.dev D22_osv_cve fetcher with a MOCK ctx.fetchJson.
// sca-v22 P2d: cisa_kev_active is now a REAL CISA-KEV lookup (CVE in the live catalog), NOT a
// CVSS-critical proxy. CVSS-critical is demoted to the critical_count score-penalty signal.
// Catalog-unreachable -> cisa_kev_active null (UNKNOWN, never a fabricated veto).

import { test } from "node:test";
import assert from "node:assert/strict";
import { fetchOsv } from "../../tools/sota-discovery/lib/fetchers/osv.mjs";
import { MISSINGNESS, SOURCE_CLASS, routeTier } from "../../tools/sota-discovery/lib/contract.mjs";

// ── Canned OSV payloads (shapes copied from live api.osv.dev responses) ──────────────
const CLEAN = {}; // 200, no "vulns" key — clean package
const VULN_MODERATE = {
  id: "GHSA-29mw-wpgm-hmr9",
  aliases: ["CVE-2020-28500"],
  severity: [{ type: "CVSS_V3", score: "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:N/A:L" }],
  database_specific: { severity: "MODERATE", cwe_ids: ["CWE-1333"] },
};
const VULN_CRITICAL = {
  id: "GHSA-jfh8-c2jp-5v3q", // Log4Shell
  aliases: ["CVE-2021-44228"],
  severity: [{ type: "CVSS_V3", score: "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:C/C:H/I:H/A:H/E:H" }],
  database_specific: { severity: "CRITICAL", cwe_ids: ["CWE-502"] },
};
// CVSS-critical by VECTOR with a CVE that is NOT in the KEV catalog (the key real-KEV test case).
const VULN_CRIT_NOT_KEV = {
  id: "OSV-NO-DBSEV",
  aliases: ["CVE-2099-00001"],
  severity: [{ type: "CVSS_V4", score: "CVSS:4.0/AV:N/AC:L/AT:N/PR:N/UI:N/VC:H/VI:H/VA:H/C:H/I:H/A:H" }],
  database_specific: {},
};
const ERROR_BODY = { code: 3, message: "Invalid ecosystem." }; // 400-shape
// Live-shape CISA-KEV catalog (a couple of real KEV CVE ids).
const KEV_CATALOG = { title: "CISA KEV", vulnerabilities: [{ cveID: "CVE-2021-44228" }, { cveID: "CVE-2017-0144" }] };

// mockCtx: maps ecosystem -> response; serves the CISA-KEV catalog URL from `kevCatalog`
// (undefined -> {} -> catalog "unreachable/bad-shape"). KEV-URL fetches are NOT recorded in calls.
function mockCtx(byEcosystem, kevCatalog) {
  const calls = [];
  return {
    calls,
    async fetchJson(url, opts) {
      if (typeof url === "string" && url.includes("known_exploited_vulnerabilities")) {
        return kevCatalog === undefined ? {} : kevCatalog;
      }
      const eco = opts && opts.body && opts.body.package && opts.body.package.ecosystem;
      calls.push({ url, method: opts && opts.method, eco, body: opts && opts.body });
      const r = byEcosystem[eco];
      if (r === "THROW") throw new Error("network down");
      if (r === "NULL") return null;
      return r === undefined ? CLEAN : r;
    },
  };
}

test("clean package -> cve_count 0, no KEV, density 0, MEASURED, CLASS-A", async () => {
  const ctx = mockCtx({ npm: CLEAN, PyPI: CLEAN }, KEV_CATALOG);
  const { dims, evidence } = await fetchOsv("acme", "left-pad", ctx);
  const d = dims.D22_osv_cve;
  assert.equal(d.cve_count, 0);
  assert.equal(d.critical_count, 0);
  assert.equal(d.cisa_kev_active, false);
  assert.equal(d.kev_source, "no-vulns");
  assert.equal(d.density, 0);
  assert.equal(evidence.D22_osv_cve.missingness, MISSINGNESS.MEASURED);
  assert.equal(evidence.D22_osv_cve.source_class, SOURCE_CLASS.A);
  assert.deepEqual(ctx.calls.map((c) => c.eco).sort(), ["PyPI", "npm"]);
});

test("non-KEV vuln -> cisa_kev_active FALSE (CVE not in the catalog)", async () => {
  const ctx = mockCtx({ npm: { vulns: [VULN_MODERATE] }, PyPI: CLEAN }, KEV_CATALOG);
  const { dims } = await fetchOsv("acme", "lodash", ctx);
  const d = dims.D22_osv_cve;
  assert.equal(d.cve_count, 1);
  assert.equal(d.critical_count, 0);
  assert.equal(d.cisa_kev_active, false); // CVE-2020-28500 not in KEV
  assert.equal(d.kev_source, "cisa-kev-catalog");
  assert.equal(d.density, 0.1);
});

test("KEV-listed vuln (Log4Shell) -> cisa_kev_active TRUE + kev_cves + catalog source", async () => {
  const ctx = mockCtx({ npm: { vulns: [VULN_MODERATE, VULN_CRITICAL] }, PyPI: CLEAN }, KEV_CATALOG);
  const { dims, evidence } = await fetchOsv("apache", "log4j", ctx);
  const d = dims.D22_osv_cve;
  assert.equal(d.cve_count, 2);
  assert.equal(d.critical_count, 1);
  assert.equal(d.cisa_kev_active, true); // CVE-2021-44228 IS in the live KEV catalog
  assert.deepEqual(d.kev_cves, ["CVE-2021-44228"]);
  assert.equal(d.kev_source, "cisa-kev-catalog");
  assert.equal(evidence.D22_osv_cve.missingness, MISSINGNESS.MEASURED);
});

test("CVSS-critical alone does NOT trip KEV (real-KEV semantics, sca-v22 P2d)", async () => {
  const ctx = mockCtx({ npm: { vulns: [VULN_CRIT_NOT_KEV] }, PyPI: CLEAN }, KEV_CATALOG);
  const { dims } = await fetchOsv("x", "y", ctx);
  assert.equal(dims.D22_osv_cve.critical_count, 1); // still flagged critical (score penalty)
  assert.equal(dims.D22_osv_cve.cisa_kev_active, false); // but NOT KEV — the key behavioral change
  assert.deepEqual(dims.D22_osv_cve.kev_cves, []);
});

test("density caps at 1.0 for >= DENSITY_SATURATION vulns; no aliases -> no KEV", async () => {
  const many = Array.from({ length: 15 }, (_, i) => ({
    id: `V-${i}`,
    severity: [{ type: "CVSS_V3", score: "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:N/A:L" }],
    database_specific: { severity: "LOW" },
  }));
  const ctx = mockCtx({ npm: { vulns: many }, PyPI: CLEAN }, KEV_CATALOG);
  const { dims } = await fetchOsv("a", "b", ctx);
  assert.equal(dims.D22_osv_cve.cve_count, 15);
  assert.equal(dims.D22_osv_cve.density, 1);
  assert.equal(dims.D22_osv_cve.cisa_kev_active, false);
});

test("dedupes the same vuln id reported by both ecosystems", async () => {
  const ctx = mockCtx({ npm: { vulns: [VULN_CRITICAL] }, PyPI: { vulns: [VULN_CRITICAL] } }, KEV_CATALOG);
  const { dims } = await fetchOsv("a", "b", ctx);
  assert.equal(dims.D22_osv_cve.cve_count, 1);
  assert.equal(dims.D22_osv_cve.cisa_kev_active, true);
  assert.deepEqual(dims.D22_osv_cve.kev_cves, ["CVE-2021-44228"]);
});

test("package not resolvable (all queries error/throw) -> NOT_MEASURABLE, dim null", async () => {
  const ctx = mockCtx({ npm: ERROR_BODY, PyPI: "THROW" }, KEV_CATALOG);
  const { dims, evidence } = await fetchOsv("ghost", "nonexistent-zzz", ctx);
  assert.equal(dims.D22_osv_cve, null);
  assert.equal(evidence.D22_osv_cve.missingness, MISSINGNESS.NOT_MEASURABLE);
});

test("one ecosystem errors but the other resolves clean -> MEASURED cve_count 0", async () => {
  const ctx = mockCtx({ npm: ERROR_BODY, PyPI: CLEAN }, KEV_CATALOG);
  const { dims, evidence } = await fetchOsv("a", "b", ctx);
  assert.equal(dims.D22_osv_cve.cve_count, 0);
  assert.equal(dims.D22_osv_cve.cisa_kev_active, false);
  assert.equal(evidence.D22_osv_cve.missingness, MISSINGNESS.MEASURED);
});

test("ctx.packageName + ctx.ecosystems overrides honored", async () => {
  const ctx = mockCtx({ npm: CLEAN }, KEV_CATALOG);
  ctx.packageName = "custom-pkg";
  ctx.ecosystems = ["npm"];
  await fetchOsv("owner", "repo-name", ctx);
  assert.equal(ctx.calls.length, 1); // KEV fetch not recorded; cve_count 0 -> no KEV fetch anyway
  assert.equal(ctx.calls[0].eco, "npm");
  assert.equal(ctx.calls[0].body.package.name, "custom-pkg");
});

// ── P2d honesty: catalog unreachable + vulns -> KEV UNKNOWN (null), never a fabricated BLOCK ──
test("KEV catalog unreachable + vulns -> cisa_kev_active null + no BLOCK", async () => {
  const ctx = mockCtx({ npm: { vulns: [VULN_CRITICAL] }, PyPI: CLEAN }); // kevCatalog undefined -> {}
  const { dims, evidence } = await fetchOsv("apache", "log4j", ctx);
  assert.equal(dims.D22_osv_cve.cisa_kev_active, null); // UNKNOWN, not fabricated true
  assert.equal(dims.D22_osv_cve.kev_source, "catalog-unreachable");
  const routed = routeTier(dims, evidence, { install: 0.9, pattern_study: 0.9, cite_only: 0.9 });
  assert.notEqual(routed.tier, "BLOCK"); // unknown KEV must NOT block (unknown != active)
});

test("ctx.kevSet injection bypasses the catalog fetch", async () => {
  // KEV-URL branch throws — if injection works, fetchKevSet uses the Set and never calls it.
  const ctx = {
    kevSet: new Set(["CVE-2021-44228"]),
    async fetchJson(url, opts) {
      if (typeof url === "string" && url.includes("known_exploited_vulnerabilities")) {
        throw new Error("must not fetch catalog when kevSet is injected");
      }
      const eco = opts.body.package.ecosystem;
      return eco === "npm" ? { vulns: [VULN_CRITICAL] } : CLEAN;
    },
  };
  const { dims } = await fetchOsv("apache", "log4j", ctx);
  assert.equal(dims.D22_osv_cve.cisa_kev_active, true);
  assert.deepEqual(dims.D22_osv_cve.kev_cves, ["CVE-2021-44228"]);
});

// Integration with the frozen contract: a KEV-active dim must route to BLOCK tier.
test("routeTier() returns BLOCK when fetcher reports a real KEV CVE", async () => {
  const ctx = mockCtx({ npm: { vulns: [VULN_CRITICAL] }, PyPI: CLEAN }, KEV_CATALOG);
  const { dims, evidence } = await fetchOsv("apache", "log4j", ctx);
  const routed = routeTier(dims, evidence, { install: 0.9, pattern_study: 0.9, cite_only: 0.9 });
  assert.equal(routed.tier, "BLOCK");
  assert.equal(routed.hard_filter_violations[0].dim, "D22_osv_cve");
});

test("CVSS v4-only vector (VC:H/VI:H/VA:H, no v3 metrics) -> critical (codex P2b #4)", async () => {
  const v4only = {
    id: "OSV-V4ONLY",
    aliases: ["CVE-2099-90001"],
    severity: [{ type: "CVSS_V4", score: "CVSS:4.0/AV:N/AC:L/AT:N/PR:N/UI:N/VC:H/VI:H/VA:H/SC:N/SI:N/SA:N" }],
    database_specific: {},
  };
  const ctx = mockCtx({ npm: { vulns: [v4only] }, PyPI: CLEAN }, KEV_CATALOG);
  const { dims } = await fetchOsv("x", "y", ctx);
  assert.equal(dims.D22_osv_cve.critical_count, 1); // v4 vulnerable-system metrics matched
  assert.equal(dims.D22_osv_cve.cisa_kev_active, false); // CVE-2099-90001 not in KEV
});

test("CVSS: modified-only MAV:N (no BASE AV:N) is NOT counted critical (codex P2b r2)", async () => {
  const modOnly = {
    id: "OSV-MAVONLY",
    aliases: ["CVE-2099-90002"],
    severity: [{ type: "CVSS_V4", score: "CVSS:4.0/MAV:N/VC:H/VI:H/VA:H/SC:N/SI:N/SA:N" }],
    database_specific: {},
  };
  const ctx = mockCtx({ npm: { vulns: [modOnly] }, PyPI: CLEAN }, KEV_CATALOG);
  const { dims } = await fetchOsv("x", "y", ctx);
  assert.equal(dims.D22_osv_cve.critical_count, 0); // MAV:N is not a BASE AV:N -> not critical
});
