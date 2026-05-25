# Wave 222 Agent C — Documentation Tooling MCPs Deep-Dive

**Date**: 2026-05-15
**Agent**: sota-researcher (Sonnet stand-in per `Z:/claude-sota/.claude/rules/cmc-env-funneled-disclosure.md §The mandate` Option 2)
**STAND-IN-NOTICE**: Cross-model gate NOT structurally satisfied at sub-agent layer; orchestrator MUST file Path P codex T1 ratification per CR-3 before ADOPT-NOW prescriptions land
**Target runtime**: `Z:/claude-sota-pure/` (verified `.mcp.json` 2026-05-15 — context7 + deepwiki HTTP installed; no other doc-class MCPs)
**Scope**: live docs lookup / OpenAPI / docs generation / markdown lint / link check
**OUTPUT_BUDGET**: 500 LOC max
**HANDOFF**: handoff_to: orchestrator | verdict_one_line: DONE_WITH_CONCERNS

## Section 1 — Live docs lookup MCPs (verify INSTALLED + alternatives)

| MCP | Repo | Stars | License | Last commit | Status in pure | Verdict |
|---|---|---|---|---|---|---|
| **context7** | `upstash/context7` (local clone HEAD `78b98266` 2026-05-06) | 30k+ (well-known) | MIT [VERIFIED `Z:/repos/deps/context7/LICENSE`] | 2026-05-06 | ✅ INSTALLED HTTP `https://mcp.context7.com/mcp` | **KEEP** — incumbent, fresh, official-org Upstash maintained |
| **deepwiki** | `asyncfuncai/deepwiki-open` (local clone HEAD `5b43df54` 2026-04-21) | community fork of devin.ai/deepwiki | MIT [VERIFIED `Z:/repos/deps/asyncfuncai__deepwiki-open/LICENSE`] | 2026-04-21 | ✅ INSTALLED HTTP `https://mcp.deepwiki.com/mcp` | **KEEP** — incumbent, github-repo-Q&A specialty |
| **DevDocs** | `cyberagiinc/DevDocs` | 2,070 | Apache-2.0 [VERIFIED via blob SHA `261eeb9e`] | 2026-05-15 (TODAY active) | NOT installed | **STUDY-PILOT** — covers 100+ tech docs offline (Python/JS/etc.); complementary to context7 (online) |
| **docmole** | `Vigtu/docmole` | 18 | MIT (inferred — TypeScript+Bun) | 2026-04-17 | NOT installed | **REJECT** — single-author, <100★, axis-1 single-org FAIL |
| **llms-txt-mcp** | `tenequm/llms-txt-mcp` | 3 | UNKNOWN | 2026-04-02 | NOT installed | **REJECT** — sub-10★, no convergence |

**KEY FINDING (Section 1)**: context7 + deepwiki incumbents are STABLE — both <30 days from HEAD; no upgrade urgency. DevDocs is the ONE STUDY-PILOT candidate worth real consideration: 2,070★, Apache-2.0, last commit TODAY 2026-05-15, covers offline-cached devdocs.io content (Python/JS/Rust/Go/etc.) which context7 fetches LIVE — offers offline+latency complementarity.

## Section 2 — OpenAPI / API spec MCPs

| MCP | Repo | Stars | License | Last commit | Verdict |
|---|---|---|---|---|---|
| **mcpo** | `open-webui/mcpo` | 4,196 | MIT [VERIFIED] | 2026-05-15 (TODAY) | **STUDY-PILOT** — most-starred in class; converts MCP↔OpenAPI bidirectionally; named-org Open WebUI |
| **mcp2cli** | `knowsuchagency/mcp2cli` | 2,127 | MIT [VERIFIED] | 2026-05-15 (TODAY) | **STUDY-PILOT** — turns OpenAPI/MCP/GraphQL into CLI at runtime; named-author S. Fitzpatrick |
| **openapi-servers** | `open-webui/openapi-servers` | 959 | (Open WebUI org assumed MIT) | 2026-05-15 | **STUDY-PILOT** — companion to mcpo; reference OpenAPI tool servers |
| **openapi-mcp-server** | `janwilmake/openapi-mcp-server` | 893 | MIT [VERIFIED] | 2026-05-15 | **STUDY-PILOT** — "wade through complex OpenAPIs"; specialty navigation |
| **openapi-mcp-generator** | `harsha-iiiv/openapi-mcp-generator` | 585 | MIT [VERIFIED] | 2026-05-15 | **STUDY-PILOT** — converts OpenAPI→MCP server (code-gen tool) |
| **swagger-mcp** | `dcolley/swagger-mcp` | 114 | Apache-2.0 [VERIFIED] | 2026-05-06 | **REJECT-FOR-FIT** — single-author, swagger-only (use mcpo instead) |
| **auto-mcp** | `brizzai/auto-mcp` | 190 | UNKNOWN | 2026-05-11 | **DEFER** — competing OpenAPI→MCP gen pattern |
| **mcp-openapi** | `ReAPI-com/mcp-openapi` | 86 | UNKNOWN | 2026-05-05 | **REJECT** — incumbent path mcpo dominates |

**KEY FINDING (Section 2)**: **mcpo + openapi-mcp-server form a 2-MCP STUDY-PILOT cohort** — mcpo bridges MCP↔OpenAPI (when sss has an OpenAPI service to expose, e.g. mock APIs for testing); openapi-mcp-server is the dedicated OpenAPI navigation specialist. **Probe 7.a DEMAND-ABSENCE: sss currently has no OpenAPI/Swagger service to consume** — both retain STUDY-PILOT eligibility ONLY IF sss adds OpenAPI-spec workflows (FastAPI service test rigs / 3rd-party API integration audits). Without explicit demand, REJECT-FOR-FIT.a.

## Section 3 — Documentation generation MCPs

| MCP | Repo | Stars | Last commit | Verdict |
|---|---|---|---|---|
| **docusaurus-plugin-mcp-server** | `scalvert/docusaurus-plugin-mcp-server` | 23 | 2026-05-11 | **REJECT** — sub-100★, narrow Docusaurus-only scope |
| **mkdocs-ask-ai** | `mrkhachaturov/mkdocs-ask-ai` | 2 | 2026-05-14 | **REJECT** — <10★ |
| **doc-manager-mcp** | `arimxyer/doc-manager-mcp` | 6 | 2026-03-23 | **DEFER** — interesting (link validation + change detection + quality) BUT single-author <10★ |
| **docs-mcp-server** | `pankaj28843/docs-mcp-server` | 2 | 2026-05-14 | **REJECT** — <10★ |
| **lunr-mcp** | `ojacques/lunr-mcp` | 0 | 2025-11-21 | **REJECT** — 0★, stale |
| **sphinx mcp** | — | — | — | **PHANTOM** — no Sphinx MCP exists |

**KEY FINDING (Section 3)**: Documentation generation MCP class is **IMMATURE** — no mature candidate. Docusaurus/MkDocs/Sphinx generation workflows in sss should remain CLI-direct (native `docusaurus build` / `mkdocs build` / `sphinx-build` via Bash). Convergence-gate Axis-3 burn-in FAILED across the cohort.

## Section 4 — Markdown / link checking MCPs

| MCP | Repo | Stars | License | Verdict |
|---|---|---|---|---|
| **markdownlint-mcp-server** | `wilsonwangdev/markdownlint-mcp-server` | 0 | UNKNOWN | **REJECT** — 0★, single-commit 2025-04 |
| **mcp-markdownlint** | `tt4-GmbH/mcp-markdownlint` | 0 | UNKNOWN | **REJECT** — 0★ |
| **lychee mcp** | — | — | — | **PHANTOM** — no lychee MCP exists |
| **mcp-broken-link-checker** | `davinoishi/mcp-broken-link-checker` | 0 (**ARCHIVED**) | UNKNOWN | **REJECT** — archived |
| **deadlink-checker-mcp** | `yifanyifan897645/deadlink-checker-mcp` | 0 | UNKNOWN | **REJECT** — 0★ |

**KEY FINDING (Section 4)**: All markdown/link-checking MCPs are **PHANTOM-OR-TOY class** — convergence-gate Axis-1 + Axis-2 + Axis-3 FAIL across the board. Use **CLI-direct** alternatives instead:
- `markdownlint-cli2` (npm, official `DavidAnson/markdownlint-cli2` — 4k+★)
- `lychee` (Rust, official `lycheeverse/lychee` — 11k+★ — already in `Z:/repos/deps/`)
- These are well-served by Bash invocation; no MCP wrapper provides marginal value.

## Section 5 — PHANTOM / HONEST-NON-FINDING

| Claimed candidate | HNF reason |
|---|---|
| **Mintlify official MCP** | `org:mintlify mcp` returned 0 results. Mintlify offers commercial docs hosting but ships no MCP server. (`mintlify-search-cli` 0★ community alternative is non-viable.) |
| **readme.com MCP** | 0 results for `readme.com mcp server` query. ReadMe.com offers no MCP. |
| **Lychee MCP** | No MCP wrapper for the popular `lycheeverse/lychee` link-checker. CLI-direct only. |
| **Sphinx MCP** | No Sphinx-specific MCP. CLI-direct via `sphinx-build`. |
| **Doxygen / Javadoc MCP** | Not surveyed but PHANTOM-expected (no compiled-docs MCP class exists). |
| **OpenAPI-validator MCP** (spectral wrapper) | No mature MCP. Use `spectral lint` CLI-direct. |

## Section 6 — CLI-direct alternatives (no MCP needed)

| Need | Use CLI |
|---|---|
| Markdown lint | `markdownlint-cli2` |
| Broken link check | `lychee` (Rust, 11k★ at `Z:/repos/deps/lychee/`) |
| OpenAPI lint | `spectral` (Stoplight, 5k★) |
| Docs build | Native `docusaurus build` / `mkdocs build` / `sphinx-build` |
| API spec → MCP | `harsha-iiiv/openapi-mcp-generator` (one-shot codegen, then run the generated MCP) |
| Devdocs CLI | `freeCodeCamp/devdocs` web app (no CLI MCP needed for ad-hoc lookup) |

## Section 7 — Recommended dispositions

### ADOPT-NOW
**NONE** — context7 + deepwiki incumbents satisfy current sss live-docs-lookup demand. No additional MCP clears axis-1+2+3 convergence-gate firmly AND has named consumer workflow.

### STUDY-PILOT (5-clause demand-creates-new-workflow gate per Probe 7.b)

1. **`cyberagiinc/DevDocs`** (2,070★ Apache-2.0)
   - **Use case**: offline tech-docs lookup for 100+ technologies (Python/JS/Rust/Go) when context7 has rate-limit or latency
   - **Source**: existing devdocs.io content (well-known offline docs aggregator from `freeCodeCamp/devdocs`)
   - **Wiring**: docker-compose self-host or npm install; HTTP MCP endpoint
   - **Incumbent comparison**: context7 fetches LIVE (latency + rate-limit); DevDocs caches offline (instant + bandwidth-free)
   - **Time-box**: 1 fire pilot; success = 100ms p95 lookup latency; retire if context7 alone meets latency budget
   - **Risk**: docker-compose dependency; cardinal-rule-9 install-risk MEDIUM (well-isolated service)

### REJECT-FOR-FIT (per Probe 7.a DEMAND-ABSENCE + Probe 6 LICENSE/registry)

- **mcpo / openapi-mcp-server / openapi-mcp-generator** — REJECT-FOR-FIT.a until sss has explicit OpenAPI workflow (no current sss API spec to consume)
- **docusaurus/mkdocs/sphinx MCPs** — REJECT (convergence-gate Axis-1+3 FAIL; CLI-direct sufficient)
- **markdownlint/lychee/link-check MCPs** — REJECT (PHANTOM/TOY class; CLI-direct mandatory)
- **mintlify/readme.com MCPs** — PHANTOM (don't exist)

## Section 8 — Cross-references for orchestrator integration

- Cite-class lattice per `Z:/claude-sota/.claude/rules/citation-discipline.md` rule #8
- LICENSE direct-read per CR-9 install-risk discipline
- Probe 7.a/7.b demand-gate split per `Z:/claude-sota/.claude/rules/ahfv-probe-dag.md`
- 5-clause STUDY-PILOT gate (DevDocs row) per Probe 7.b
- HNF reporting per `synthesis-layer-verify.md §Reporting categories`
- Path P codex T1 ratification REQUIRED before any STUDY-PILOT lands (cross-model gate NOT satisfied at this Sonnet stand-in dispatch)

## Section 9 — Risk + caveats

- **Stand-in disclosure**: this report origin = Sonnet via `CLAUDE_CODE_SUBAGENT_MODEL` env-funneling per CLAUDE.local.md ENV (f). True GPT-5.5 penetration = 0% at this dispatch.
- **GitHub rate-limit**: first 3 probes failed; recovered after 30s. Marker Decay applies — star counts captured 2026-05-15 21:27 UTC.
- **No LICENSE on docusaurus-plugin-mcp-server / doc-manager-mcp / others** — these need direct file probe before adoption (mitigated by NONE being ADOPT-NOW).
- **DevDocs Apache-2.0** — permissive per cardinal-rule-9; safe.
- **No deep-wiki currency check completed for the HTTP endpoints** — `https://mcp.context7.com/mcp` + `https://mcp.deepwiki.com/mcp` rely on upstream maintenance.

## Honest Conclusion

**Outcome**: PARTIALLY-CONFIRMED.
- ADOPT-NOW: **rejected** (no candidate clears the bar)
- STUDY-PILOT eligible: **1 candidate** (DevDocs) — needs Probe 7.b 5-clause gate verification
- HONEST-NON-FINDING dominates: Mintlify/lychee/sphinx/readme.com MCPs do NOT exist; markdown-lint MCP class is toy-tier; doc-generation MCP class is immature
- Major finding: **OpenAPI MCP cohort (mcpo + mcp2cli + openapi-mcp-server, 7k★ combined) is the strongest discovery** — but blocked by Probe 7.a demand-absence in current sss

VERDICT: STUDY-PILOT-NARROW — DevDocs (cyberagiinc/DevDocs) only; all other classes REJECT-FOR-FIT.a or HONEST-NON-FINDING. Path P codex T1 ratification REQUIRED before STUDY-PILOT lands per CR-3.
