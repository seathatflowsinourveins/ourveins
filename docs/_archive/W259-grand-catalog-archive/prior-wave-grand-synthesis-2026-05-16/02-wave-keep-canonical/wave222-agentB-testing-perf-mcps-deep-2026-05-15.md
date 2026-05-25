---
title: Wave 222 Agent B — Testing + Performance MCP Servers Deep-Dive
date: 2026-05-15
agent: sota-researcher (Sonnet stand-in)
status: AUTHORITATIVE-CANDIDATE
wave: 222
brief: Testing + Performance + Coverage MCPs for claude-sota-pure
---

# Wave 222 Agent B — Testing + Performance MCP Servers Deep-Dive

**STAND-IN-NOTICE**: agent ran under `CLAUDE_CODE_SUBAGENT_MODEL=claude-sonnet-4-6` stand-in per CLAUDE.local.md ENV block (f); cross-model gate NOT structurally satisfied for this dispatch. Orchestrator MUST file Path P codex T1 ratification before any ADOPT-NOW prescription lands. Cite-class: agent transcript is TIER-3 evidence trail per `Z:/claude-sota/.claude/rules/cmc-verdict-shapes.md §Source-cite discipline for consult prompts`.

## Hypothesis (R0)

"Specialized testing MCPs (jest / pytest / vitest / mocha / k6 / jmeter / coverage / playwright / cypress / selenium) provide >0 marginal value for claude-sota-pure (install-only canonical runtime, NO `tests/` directory) over (a) CLI-direct invocation from Claude Code Bash, or (b) Playwright-CLI+SKILLS pattern recommended by Microsoft itself."

**Rejection criterion**: if (i) claude-sota-pure has NO test workflow demanding MCP-protocol invocation, AND (ii) Microsoft's own playwright-mcp README recommends CLI+SKILLS over MCP for coding agents, AND (iii) >80% of candidates are <10★ aspirational/phantom, then REJECT-FOR-FIT per `Z:/claude-sota/.claude/rules/ahfv-probe-dag.md` Probe 7.a DEMAND-ABSENCE.

## Benchmark Landscape (R1)

No formal "Testing MCP" benchmark exists. **Top-3 across all 11 candidates by star count**:

| Rank | Repo | Stars | Org | License | Category |
|---|---|---|---|---|---|
| 1 | microsoft/playwright-mcp | 32,557 | Microsoft (T1) | Apache-2.0 | E2E (browser) |
| 2 | aws-solutions/distributed-load-testing-on-aws | 406 | AWS (T1) | Apache-2.0 | Load (NOT pure MCP — AWS solution stack) |
| 3 | VikashLoomba/MCP-Server-Playwright | 291 | Community | Unverified | E2E (3rd-party Playwright fork) |

**Cliff at rank 4**: every other candidate is <40★. The "testing MCP" space is **almost entirely aspirational** as of 2026-05-15.

## Section 1 — Unit/Integration Testing MCP Catalog

### Top candidates

| Repo | Stars | License | Created | Last commit | Verdict |
|---|---|---|---|---|---|
| ReallyArtificial/mcp-jest | 16 | MIT [VERIFIED 2026-05-15] | 2025-05-31 | 2026-04-03 | REJECT-FOR-FIT |
| BuildWithAbid/mcp-testkit | 1 | Unverified | 2026-04-17 | 2026-04-17 | REJECT (phantom-tier) |
| Swagatar-LLC/jest-mcp-server | 0 | MIT (README) | 2025-05-15 | 2025-05-15 | REJECT (single-commit aspirational) |
| anyrxo/mcp-test | 0 | Unverified | 2025-11-15 | 2025-11-15 | REJECT |
| tosin2013/pytest-mcp-server | 1 | Unverified | 2025-05-15 | 2026-02-12 | REJECT |
| aryanjp1/mcp-test-framework | 1 | Unverified | 2026-02-07 | 2026-02-12 | REJECT |
| vitest-community/mcp | 6 | Unverified | 2025-12-08 | 2026-01-19 | REJECT (low-star community) |
| madrus/vitest-mcp-server | 3 | Unverified | 2025-06-08 | 2025-10-07 | REJECT |
| blackwell-systems/mcp-assert | 7 | Unverified | 2026-04-23 | 2026-05-15 | REJECT (test-of-MCPs, not MCP-for-tests) |

**Critical categorical clarification**: most "jest-mcp / pytest-mcp / vitest-mcp" candidates are **MCPs FOR TESTING MCPs** (tools to test that your mcp-server works), NOT MCPs FOR RUNNING jest/pytest/vitest test suites. This is a CATEGORICAL CONFUSION caught at brief-receipt — the original prompt conflated two distinct categories.

### Convergence-gate analysis

- **Axis 1** (≥3 distinct T1 orgs): FAIL — no Anthropic/Microsoft/Meta/Google maintains a unit-test MCP
- **Axis 2** (≥2 named T2 practitioners with dated artifact): FAIL — no Karpathy/Cherny/Pocock endorsement found
- **Axis 3** (≥3 months stability): MARGINAL — most candidates created within 6 months, low commit cadence

**Verdict**: ALL 9 candidates REJECT-FOR-FIT.

## Section 2 — E2E Testing MCP Catalog

### microsoft/playwright-mcp (the only real candidate)

| Field | Value |
|---|---|
| Stars | 32,557 |
| Org | Microsoft (TIER-1-DIRECT) |
| License | Apache-2.0 [VERIFIED 2026-05-15 via LICENSE direct-read SHA cefe596afef12e19a8e5e923f1a04c7da3188760] |
| Created | 2025-03-21 |
| Last commit | 2026-05-15 (fresh) |
| Convergence-gate | Axis 1+2+3 ALL PASS |

**CR-12 6-class disposition**: **PARTIAL-OVERLAP** with W221-B browser/voice surface — `microsoft/playwright-mcp` was already evaluated in Wave 221-B coverage of browser/voice MCPs.

**Probe 7 demand-gate analysis** (the load-bearing question):

Per Microsoft's OWN README at `microsoft/playwright-mcp@ae27b86/README.md:1-30` [VERIFIED 2026-05-15 via mcp__github__get_file_contents]:
> "If you are using a **coding agent**, you might benefit from using the [CLI+SKILLS](https://github.com/microsoft/playwright-cli) instead."
> "**CLI**: Modern **coding agents** increasingly favor CLI–based workflows exposed as SKILLs over MCP because CLI invocations are more token-efficient: they avoid loading large tool schemas and verbose accessibility trees..."
> "**MCP**: MCP remains relevant for specialized agentic loops that benefit from persistent state, rich introspection, and iterative reasoning over page structure, such as exploratory automation, self-healing tests, or long-running autonomous workflows."

**Microsoft itself recommends `microsoft/playwright-cli` (10,373★, separate verified repo) for coding agents over `playwright-mcp`.** This is a primary-source self-deprecation of the MCP path for the Claude Code use case.

**Demand-gate question for claude-sota-pure**: does this runtime have any browser automation workflow today? Per `ls Z:/claude-sota-pure/` probe [VERIFIED 2026-05-15]: NO `tests/` directory, NO `e2e/` directory, NO browser test workflow. Runtime is install-only canonical baseline per CLAUDE.md cardinal-rule-5.

**Verdict**:
- For W222 testing-MCP scope specifically: **REJECT-FOR-FIT** per Probe 7.a DEMAND-ABSENCE (no current E2E test workflow)
- For W221-B browser/voice MCP scope: per Microsoft's own guidance, prefer **playwright-cli + SKILL pattern** when claude-sota-pure DOES need browser automation — STUDY-PILOT eligible IF a documented browser-automation workflow emerges

### Cypress / Selenium / Mocha catalogs

All <10★ single-author aspirational. NO mocha-mcp or junit-mcp servers exist.

**Verdict**: ALL REJECT-FOR-FIT.

## Section 3 — Performance/Load Testing MCP Catalog

### grafana/mcp-k6 — STRUCTURAL BLOCKER

| Field | Value |
|---|---|
| Stars | 39 |
| Org | Grafana (TIER-1) |
| **License** | **AGPL-3.0 [VERIFIED 2026-05-15 via LICENSE direct-read SHA 0ad25db4bd1d86c452db3f9602ccdbe172438f52]** |
| Created | 2025-09-10 |
| Last commit | 2026-05-15 (active) |

**STRUCTURAL ADOPTION BLOCKER**: AGPLv3 license violates `Z:/claude-sota/.claude/rules/ahfv-seven-sub-classes.md` Probe 6 direct-file/registry blockers. Network-server-copyleft cascade risk — REJECT-FOR-FIT regardless of all other axes.

**Cite trail**: this is the SECOND known AGPLv3 blocker in claude-sota's adoption history (first was openviking memory/RAG).

### QAInsights/locust-mcp-server (11★, MIT, 5-month stale) — REJECT
### AndreyVMarkelov/MCPLoadTester (6★, reverse-direction category-mismatch) — REJECT
### canyonlabz/mcp-perf-suite (4★ MIT, single-maintainer) — REJECT
### Artillery MCP — PHANTOM (total_count=0)

## Section 4 — Coverage MCP Catalog

### Coverage / Istanbul — PHANTOM

Direct GitHub search "coverage istanbul mcp" returned **ZERO results** [VERIFIED 2026-05-15 via mcp__github__search_repositories total_count=0]. Broader search returned 3 candidates, ALL 0★.

**Verdict**: PHANTOM-CITE class confirmed. The "coverage MCP" category does not meaningfully exist as of 2026-05-15.

## Section 5 — PHANTOM / HONEST-NON-FINDING

| Category | Status | Evidence |
|---|---|---|
| Artillery MCP | PHANTOM | total_count=0 [VERIFIED 2026-05-15] |
| Coverage MCP (istanbul) | PHANTOM | total_count=0 [VERIFIED 2026-05-15] |
| Mocha MCP | PHANTOM | Not in any search result |
| JUnit MCP | PHANTOM | Not in any search result |
| Vitest MCP "official" | NEAR-PHANTOM | vitest-community/mcp at only 6★, abandoned 2026-01-19 |
| **Anthropic-blessed unit-test MCP** | **PHANTOM** | No anthropics/* or microsoft/* unit-test MCP exists |

The "specialized testing MCP" landscape is **structurally underdeveloped** because the Claude Code Bash tool already handles `npm test` / `pytest` / `cargo test` / `go test` directly with FULL output. MCP wrapping adds no value for synchronous test-runner invocation.

## Section 6 — CLI-direct alternatives (the SOTA pattern)

For every testing/coverage workflow, the CLI-direct pattern from Claude Code Bash IS the workflow:

| Test framework | Direct Bash invocation | MCP-wrapper value-add |
|---|---|---|
| Jest | `npm test`, `npx jest --coverage` | **ZERO** — full output already captured |
| Pytest | `pytest -v --cov=src` | **ZERO** — exit code + stdout sufficient |
| Vitest | `npx vitest run --coverage` | **ZERO** |
| Mocha | `npx mocha test/**/*.spec.js` | **ZERO** |
| Cargo | `cargo test`, `cargo tarpaulin` | **ZERO** |
| Go | `go test ./... -cover` | **ZERO** |
| Cypress | `npx cypress run --headless` | **ZERO** |
| Playwright | `npx playwright test` | **ZERO** for test execution |
| k6 | `k6 run script.js` | **ZERO** for synchronous run |
| Locust | `locust -f locustfile.py --headless` | **ZERO** for synchronous run |

**Microsoft's own playwright-mcp README confirms this**: CLI+SKILLS pattern is the recommended path for coding agents because MCP "loads large tool schemas and verbose accessibility trees" wastefully.

## Section 7 — Final dispositions

### ADOPT-NOW: **NONE**

### STUDY-PILOT (eligible if future demand emerges)

1. **microsoft/playwright-mcp** — Axis 1+2+3 PASS, Apache-2.0, 32,557★. STUDY-PILOT-eligible ONLY when claude-sota-pure ships a documented browser-automation workflow. PREFER playwright-cli+SKILLS path per Microsoft's own README recommendation.

### REJECT

ALL other candidates:
- Unit-test MCPs (jest/pytest/vitest/mocha/junit): REJECT-FOR-FIT — no convergence + no demand + CLI-direct is SOTA
- **grafana/mcp-k6: REJECT-FOR-LICENSE** (AGPLv3 STRUCTURAL BLOCKER per Probe 6)
- Cypress/Selenium MCPs: REJECT
- JMeter/Locust/Artillery MCPs: REJECT
- Coverage MCPs: REJECT — phantom-cite cohort

## Honest Conclusion

**Hypothesis CONFIRMED**: claude-sota-pure has NO test workflow demanding testing-MCP invocation. Microsoft itself recommends CLI+SKILLS over MCP for coding agents. 80%+ of candidates are <10★ aspirational, phantom, or AGPLv3-blocked. The "specialized testing MCP" category is **structurally premature** for adoption.

**Recommendation for orchestrator**:
1. ACCEPT this REJECT-MAJORITY verdict for W222 testing-MCP scope
2. NO testing MCP gets added to `.mcp.json`
3. If future browser-automation demand emerges, route to playwright-cli + SKILL pattern (W221-B sister verdict)
4. Document the AGPLv3 grafana/mcp-k6 blocker in `Z:/claude-sota/docs/verified-avoid.md` Cohort 2 (Probe 6 direct-file/registry blockers)

VERDICT: REJECT-MAJORITY 11/11 candidates (10 REJECT-FOR-FIT + 1 REJECT-FOR-LICENSE grafana/mcp-k6 AGPLv3); HONEST-NON-FINDING dominates testing-MCP space (Artillery+Coverage+Mocha+JUnit all PHANTOM-CITE total_count=0); CLI-direct from Claude Code Bash IS the SOTA pattern per microsoft/playwright-mcp README primary-source self-deprecation; no testing MCP should ship to `.mcp.json` for claude-sota-pure as of 2026-05-15.
