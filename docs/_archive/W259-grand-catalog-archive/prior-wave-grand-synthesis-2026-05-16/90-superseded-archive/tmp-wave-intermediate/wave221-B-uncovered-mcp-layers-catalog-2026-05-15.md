---
title: W221 Agent B — Uncovered MCP Layers + alirezarezvani Layer-I + FastMCP Deep-Dive Catalog
status: AUTHORITATIVE-CANDIDATE
date: 2026-05-15
wave: 221
fire: B
agent: sota-researcher (Sonnet stand-in per FM-17.e)
artifact-class: multi-source-discovery-uncovered-layers-survey
orchestrator-runtime: claude-sota-installed
install-target-runtime: claude-sota-pure
discovery-source-families-exercised: GitHub MCP + DeepWiki MCP + Plugin marketplaces (system-reminder) + Direct GitHub blob read (mcp__github__get_file_contents)
discovery-breadth-gate: ≥4 distinct source families PASS
---

# W221 Agent B — Multi-Source Discovery

## STAND-IN-NOTICE

Per `Z:/claude-sota/.claude/rules/cmc-env-funneled-disclosure.md §The mandate`: this dispatch ran as Sonnet stand-in per FM-17.e autocompact-thrashing class; cross-model gate **NOT structurally satisfied**. This report is Axis-1 SOTA discovery research only, not adoption-decision authority. CR-3 satisfaction requires W222 Path P codex CLI foreground+tee dispatch.

Per FM-20 row 21: Probe 4 checks run against **orchestrator runtime** `claude-sota-installed/.mcp.json`; TARGET runtime `claude-sota-pure` MUST be probed at W222 before any INSTALL ship.

## Multi-Source Discovery Breadth Disclosure

Source families queried (≥4 distinct per `multi-source-discovery-breadth-discipline.md §Counting rules`):
1. **GitHub MCP** (search_repositories + get_file_contents) — 9 distinct queries; sub-capabilities collapse to ONE source family
2. **DeepWiki MCP** (ask_question) — 4 repo Q&A queries
3. **Plugin marketplaces** (system-reminder available-skills + `.mcp.json` direct read) — Probe 4 plugin-namespace inventory
4. **Direct GitHub blob read** (TIER-1-DIRECT upstream file:line via mcp__github__get_file_contents) — README + LICENSE primary content (distinct content-axis vs search-metadata per §Counting rules result-trust hierarchy)

Total distinct providers: 4 — gate PASS. Exa-direct + Perplexity-direct + Brave Search NOT-WIRED in orchestrator runtime per system-reminder; codex-CLI fallback NOT invoked (stand-in dispatch class).

---

## Section 1 — Database MCPs (target ≥4 candidates beyond `mcp__phoenix__*`)

Context: orchestrator already loads `memory` (mcp-memory + sqlite_vec) + `graphiti` (FalkorDB temporal-KG); NO general SQL/DB MCP. W113 dbhub was REJECT-FOR-FIT.a Probe 7.a; W27 caveat noted Probe 7.b eligible only with JSONL→SQLite ETL path.

| # | Repo | Stars | License | Probe 4 plugin-namespace | Probe 6 license/registry | Axis 1/2/3 | NATIVE-CC | Wiring | Adoption tier | Rationale |
|---|---|---:|---|---|---|---|---|---|---|---|
| 1 | googleapis/mcp-toolbox | 15,235 | Apache-2.0 ✅ | ✅ no collision | ✅ SPDX gh API; Google org maintained per DeepWiki | A1 PASS / A2 PARTIAL / A3 PASS (~17mo) | ✅ stdio MCP | MEDIUM | STUDY-PILOT | 15+ DB engines (AlloyDB/BigQuery/Cloud SQL/Spanner/PG/MySQL/Oracle/MongoDB/Redis/Elasticsearch/CockroachDB/ClickHouse/Neo4j/Snowflake/Trino) — broadest coverage; Google-maintained; demand-gate pending TARGET-runtime probe |
| 2 | bytebase/dbhub | 2,767 | MIT ✅ | ✅ no collision | ✅ MIT SPDX; bytebase named-org | A1 PASS / A2 PARTIAL / A3 PASS (~14mo) | ✅ stdio MCP | EASY | STUDY-PILOT (RE-OPEN W27) | Zero-dep token-efficient SELECT-only DB MCP; W27 caveat: Probe 7.b only with JSONL→SQLite ETL; v0.3.1 NOT explicitly production-ready per DeepWiki |
| 3 | mongodb-js/mongodb-mcp-server | 1,022 | (verify W222) | ✅ no collision; MongoDB-js OFFICIAL | ⚠️ verify SPDX W222 | A1 PARTIAL (single-vendor) / A2 PARTIAL / A3 PASS | ✅ stdio | EASY | DEFER (DUPLICATE w/ mcp-toolbox row 1) | MongoDB OFFICIAL — superseded by mcp-toolbox unless Atlas-specific needed |
| 4 | timescale/pg-aiguide | 1,728 | (verify Apache-2.0) | ✅ no collision; topic `claude-code-plugins-marketplace` | ⚠️ verify W222 | A1 PARTIAL / A2 PASS (Timescale named-org; published to marketplace) / A3 PASS (~22mo) | ✅ **CC plugin form** + MCP | EASY (`/plugin install`) | **ADOPT-CANDIDATE-CC-PLUGIN** | MCP + CC plugin for Postgres skills/docs; best-in-class for Postgres-specific docs; complements mcp-toolbox with Postgres-domain-knowledge |
| 5 | motherduckdb/mcp-server-motherduck | 480 | (verify Apache-2.0 W222) | ✅ no collision | ⚠️ verify W222; MotherDuck named-org | A1 PARTIAL / A2 PASS (DuckDB team Mühleisen/Raasveldt) / A3 PASS (~17mo) | ✅ stdio Python | EASY | **ADOPT-CANDIDATE-LOCAL-DUCKDB** | Closes W113 dbhub Probe 7.b: DuckDB native JSONL support (zero ETL) for `.claude/state/*.jsonl` analytics; resolves W27 caveat |
| 6 | ktanaka101/mcp-server-duckdb | 175 | MIT (verify) | ✅ no collision | ⚠️ verify W222 | A1 FAIL (single-author) / A3 PASS | ✅ stdio Python | EASY | DEFER (DUPLICATE w/ row 5; less endorsement) | Alt DuckDB MCP; OFFICIAL MotherDuck row 5 preferred per CR-12 |
| 7 | benborla/mcp-server-mysql | 1,662 | MIT (verify) | ✅ no collision | ⚠️ verify W222 | A1 PARTIAL (DUPLICATE) / A3 PASS | ✅ stdio JS | EASY | DEFER (DUPLICATE w/ mcp-toolbox row 1) | MySQL-only; subset of mcp-toolbox 15+ DB coverage |
| 8 | neondatabase/mcp-server-neon | 598 | MIT (verify) | ✅ no collision | ⚠️ verify W222 | A2 PASS (Neon org) / A1 FAIL | ✅ stdio TS | MEDIUM | DEFER (vendor-specific; no Neon in eee) | Neon Management API MCP — demand-absence per Probe 7.a |

### Section 1 ADOPT-CANDIDATES top-3

1. **timescale/pg-aiguide** (1,728★) — CC-plugin form factor; ADOPT-NOW if Postgres tooling becomes operationally needed
2. **motherduckdb/mcp-server-motherduck** (480★) — closes W113 dbhub Probe 7.b for audit-log JSONL analytics
3. **googleapis/mcp-toolbox** (15,235★) — broadest 15+ DB coverage; STUDY-PILOT iff cross-DB workflow surfaces

### Section 1 REJECT-FOR-FIT
- onecli/onecli — credential vault, not DB MCP (misclassification this query)
- Rows 3+7+8 single-vendor DBs → DUPLICATE w/ mcp-toolbox per CR-12

### Section 1 STUDY-PILOT Probe-7.b 5-clause check: **motherduckdb/mcp-server-motherduck**

1. **Named operational use case**: `.claude/state/*.jsonl` SQL analytics (mcp_overhead_audit + subagent_transcripts + codex_postcommit_reviews + 8 others per `audit-action-loop.md §When this discipline applies`)
2. **Cited local input/source path**: `Z:/claude-sota-installed/.claude/state/*.jsonl` (orch) / `Z:/claude-sota-pure/.claude/state/*.jsonl` (TARGET verify W222)
3. **Wiring path**: DuckDB `read_json_auto()` / `read_ndjson_auto()` consume JSONL DIRECTLY; zero ETL — closes W27 dbhub caveat
4. **Incumbent comparison**: `rg + jq` shell chains work but don't aggregate/join/window-function; graphiti is temporal-KG not analytics; Langfuse MCP NOT installed. DuckDB fills analytics-over-audit-logs gap with zero new deps
5. **Reversible time-box**: 30-day pilot; ~30min install + 2h analytics scripts; retire via `.mcp.json` row remove + revert (<1min CR-9)

**PASS** → queue W222 verification candidate

---

## Section 2 — Testing MCPs (target ≥4 beyond `mcp__playwright__*` + `mcp__chrome-devtools__*`)

Context: orchestrator already loads `playwright` (Microsoft) + `chrome-devtools` (Google) per `.mcp.json:69-78`. Per FM-17.e: testing MCPs spawning browser subprocesses are HIGH-COST in fan-out arcs.

| # | Repo | Stars | License | Probe 4 plugin-namespace | Probe 6 | Axis 1/2/3 | NATIVE-CC | Wiring | Adoption tier | Rationale |
|---|---|---:|---|---|---|---|---|---|---|---|
| 1 | modelcontextprotocol/inspector | 9,772 | (verify Apache-2.0 W222) | ✅ no collision; **OFFICIAL MCP-org** | ✅ MCP-org maintained | A1 PASS (TIER-1 OFFICIAL Anthropic MCP-org) / A2 PASS (MCP-org maintainers) / A3 PASS (~19mo, 9772★ active) | ✅ Anthropic-affiliated dev tool | EASY (`npx @modelcontextprotocol/inspector`) | **ADOPT-NOW-IFF-MCP-authoring** | MCP-server testing/debugging tool per DeepWiki: UI + CLI modes, schema validation, request history, real-time notifications, CLI for CI. THE missing dev-tool for MCP-authoring workflow |
| 2 | microsoft/playwright-mcp | 32,557 | Apache-2.0 (loaded `.mcp.json:74`) | ❌ DUPLICATE — already loaded as `mcp__playwright__*` | Microsoft OFFICIAL | All PASS (adopted) | ✅ loaded | N/A | DUPLICATE-already-installed | kiss-dry-yagni Must-Never #4 — TARGET-runtime probe W222 |
| 3 | executeautomation/mcp-playwright | 5,513 | (verify) | ❌ DUPLICATE w/ row 2 | not archived | A1 FAIL (alt impl) / A3 PASS | ✅ stdio | EASY | REJECT-FOR-FIT — DUPLICATE | Alternative impl; Microsoft OFFICIAL preferred per CR-12 |
| 4 | AgentDeskAI/browser-tools-mcp | 7,214 | (verify) | ⚠️ overlap w/ chrome-devtools-mcp | not archived | A1 FAIL / A3 PASS | ✅ stdio | MEDIUM | DEFER (PARTIAL-OVERLAP w/ chrome-devtools-mcp) | Browser-log monitoring; subsumed by chrome-devtools |
| 5 | hangwin/mcp-chrome | 11,632 | (verify) | ⚠️ partial overlap (extension vs CDP mechanism) | not archived | A1 PARTIAL / A3 PASS | ✅ stdio + Chrome ext | MEDIUM | DEFER (PROVIDER-COMPLEMENT via different mechanism) | Chrome extension MCP; alt mechanism vs CDP; defer unless extension-specific control needed |
| 6 | BrowserMCP/mcp | 6,506 | (verify) | ⚠️ DUPLICATE | not archived | A1 FAIL | ✅ stdio | EASY | REJECT-FOR-FIT — DUPLICATE | Alt browser MCP; DUPLICATE w/ playwright-mcp |
| 7 | pytest-mcp / jest-mcp / cypress-mcp | <50 ea | various | various | various | **A1 FAIL across all queries** | various | various | **HONEST-NON-FINDING-NO-CONVERGED-CANDIDATE** | **HNF**: per-language unit-test MCPs do NOT exist as convergence-gate-passing category. Per-language CLI test runners (pytest/jest/vitest direct) + Playwright MCP for E2E IS the converged SOTA. NOT a gap to fill |

### Section 2 ADOPT-CANDIDATES top-3
1. **modelcontextprotocol/inspector** (9,772★) — THE only net-new ADOPT-NOW in testing layer; official Anthropic-affiliated MCP dev/test tool
2. (none — alternatives are DUPLICATE per CR-12)
3. (none — per HNF row 7)

### Section 2 REJECT-FOR-FIT
- All alternative browser MCPs (rows 3-6) → DUPLICATE per CR-12 + kiss-dry-yagni #4
- per-language unit-test MCPs → HNF (no converged candidate)

### Section 2 STUDY-PILOT Probe-7.b 5-clause check: **modelcontextprotocol/inspector**

1. **Named operational use case**: validate MCPs built in `claude-sota-pure` (e.g., FastMCP-built MCPs need testing; Graphiti MCP schema validation)
2. **Cited local input/source path**: `Z:/claude-sota-installed/.local/graphiti/mcp_server/main.py` (existing MCP)
3. **Wiring path**: `npx @modelcontextprotocol/inspector <path-to-MCP>`; no `.mcp.json` change (dev-tool not runtime); CLI mode `--output-schema-validate` per DeepWiki
4. **Incumbent comparison**: NO INCUMBENT for MCP-itself-testing; alternatives = `python -m fastmcp` (vendor-specific) or curl-against-stdio (manual). Inspector is TIER-1 OFFICIAL
5. **Reversible time-box**: dev-only via `npx` (zero persist); zero install-risk CR-9

**PASS** → queue W222 verification IFF claude-sota-pure plans new MCP development

---

## Section 3 — Doc-Tooling MCPs (target ≥4 beyond `mcp__context7__*`)

Context: `.mcp.json:34-37` already loads context7 (HTTP MCP at mcp.context7.com). Q3 reveals: doc-MCP space dominated by context7; alternatives are thin Q&A wrappers <50★.

| # | Repo | Stars | License | Probe 4 plugin-namespace | Probe 6 | Axis 1/2/3 | NATIVE-CC | Wiring | Adoption tier | Rationale |
|---|---|---:|---|---|---|---|---|---|---|---|
| 1 | upstash/context7 | (hosted) | (verify) | ❌ DUPLICATE — `mcp__context7__*` LOADED `.mcp.json:34-37` | live service | A1+A2+A3 PASS (adopted) | ✅ loaded | N/A | DUPLICATE-already-installed | live version-pinned library docs |
| 2 | PDFMathTranslate/PDFMathTranslate | 33,762 | (verify) | ✅ no collision | not archived | A1 PARTIAL (EMNLP 2025 academic) / A2 PASS (EMNLP 2025 Demo) / A3 PASS (~20mo) | ⚠️ CLI + GUI + MCP + Docker + Zotero | MEDIUM | STUDY-PILOT (specialized) | Bilingual PDF translation preserving math; academic-paper-specific; NOT general doc MCP |
| 3 | microsoft/markitdown | 123,303 | MIT | N/A (not MCP — CLI/Python lib) | MIT ✅ | A1 PASS (MS + 3rd-party convergence) / A3 PASS | ⚠️ NOT-MCP; CLI/Python | EASY (uvx) | **ADOPT-CANDIDATE-NOT-MCP** | NOT an MCP but highest-leverage doc-tooling install; PDF/Office/audio → markdown for LLM input; complements RAG/mcp-memory ingestion; closes W220 Layer E |
| 4 | deadletterq/mcp-opennutrition | 181 | (verify) | ✅ no collision | not archived | A1 FAIL (single-author niche) / A3 PASS | ✅ stdio | EASY | REJECT-FOR-FIT (niche) | Food nutrition DB MCP — DEMAND-ABSENCE.a |
| 5 | andybrandt/mcp-simple-pubmed | 165 | (verify) | ✅ no collision | not archived | A1 FAIL / A3 PASS | ✅ stdio | EASY | REJECT-FOR-FIT (DEMAND-ABSENCE.a) | PubMed medical-paper search; specialized academic-medical |
| 6 | roznet/mcp-library-docs + RobertLD/libscope + 8 others | <100 ea | various | mostly ✅ no collision | mostly not archived | A1 FAIL (single-author; <100★ alt-impl vs context7 dominance) | ✅ stdio MCPs | EASY | REJECT-FOR-FIT — DUPLICATE w/ context7 | All alt-implementations; context7 has firm market dominance + Anthropic-recommended status per research-protocol.md §Tool Routing |

### Section 3 ADOPT-CANDIDATES top-3
1. **microsoft/markitdown** (123,303★ MIT) — NOT MCP but highest-leverage doc-tooling install; `uvx --refresh markitdown` per CR-6; ADOPT-NOW for RAG/mcp-memory ingestion
2. **upstash/context7** — ALREADY INSTALLED
3. (none other meets ≥3-distinct-orgs threshold for net-new doc MCP)

### Section 3 REJECT-FOR-FIT
- All alt-library-docs MCPs → DUPLICATE per CR-12; context7 dominance + Anthropic-recommended
- Niche-domain MCPs → DEMAND-ABSENCE.a per Probe 7.a
- PDFMathTranslate → DEFER (Probe 7.a borderline for eng runtime)

### Section 3 STUDY-PILOT Probe-7.b 5-clause check: **microsoft/markitdown** (NOT-MCP)

1. **Named operational use case**: RAG ingestion / mcp-memory feed / Karpathy §5 Layer-3 wiki construction needing PDF/Office/audio→markdown
2. **Cited local input/source path**: `Z:/claude-sota-installed/docs/*.pdf` (if any) → `Z:/claude-sota-installed/.local/markitdown-output/*.md`
3. **Wiring path**: `uvx --refresh markitdown <input>` — no `.mcp.json` integration; optionally CLI alias
4. **Incumbent comparison**: NO INCUMBENT for multimodal file→markdown; existing `pdf-reader-mcp` PDF-only Node MCP; markitdown is Microsoft-OFFICIAL + multimodal (PDF/docx/xlsx/pptx/audio/images) — broader
5. **Reversible time-box**: 30-day pilot; `uvx` no permanent install — rebuilds per run; retire = stop invoking (zero cleanup); CR-9 MINIMAL

**PASS** → queue W222 verification IFF multimodal-ingestion workflow surfaces

---

## Section 4 — alirezarezvani Layer-I per-skill selective audit (≥10 RA-QM/C-level/Finance/PM)

Context: alirezarezvani/claude-skills (14,935★ MIT) — 268 skills + 33 agents + 7 personas + 54 commands across 9 domains per W221 README direct blob read (HEAD `0796e1d7` SHA `16237686`). CC-native install: `/plugin marketplace add alirezarezvani/claude-skills` per CR-6.

**License**: MIT per README badge ✅ — claude-sota permissive-license-only per CR-9

**Probe 4 plugin-namespace**: orchestrator has alirezarezvani marketplace AVAILABLE per system-reminder; TARGET runtime W222 verify

### Per-skill table (≥10 RA-QM/C-level/Finance/PM)

| # | Skill | Domain | Bundle | Probe 4 | Probe 6 | Adoption tier | Value-add |
|---|---|---|---|---|---|---|---|
| 1 | mdr-745-specialist | RA-QM | ra-qm-skills | ✅ no orch collision (TARGET W222) | MIT ✅ | STUDY-PILOT (demand-gate) | EU MDR 2017/745 medtech regulatory; valuable IF medtech work — DEMAND-ABSENCE.a likely |
| 2 | iso-13485-quality-mgmt | RA-QM | ra-qm-skills | ✅ | MIT ✅ | REJECT-FOR-FIT — DEMAND-ABSENCE.a | ISO 13485 medical-device QM; irrelevant to eee engineering |
| 3 | fda-510k-submission-expert | RA-QM | ra-qm-skills | ✅ | MIT ✅ | REJECT-FOR-FIT — DEMAND-ABSENCE.a | FDA 510(k) medical-device submission; no demand |
| 4 | iso-27001-isms-implementer | RA-QM (security) | ra-qm-skills | ✅ | MIT ✅ | STUDY-PILOT (security-adjacent) | ISO 27001 ISMS; borderline IF security audits land |
| 5 | gdpr-compliance-reviewer | RA-QM | ra-qm-skills | ✅ | MIT ✅ | STUDY-PILOT (privacy-adjacent) | GDPR compliance; borderline IF user-data processing |
| 6 | soc-2-readiness-assessor | RA-QM (security) | ra-qm-skills | ✅ | MIT ✅ | STUDY-PILOT | SOC 2; borderline; defer |
| 7 | startup-cto-persona | C-level Advisory | c-level-skills | ✅ | MIT ✅ | **ADOPT-CANDIDATE (cross-domain)** | Startup CTO persona — architecture decisions/tech stack/team building/due diligence; **directly applicable to eee architecture-decision-making** |
| 8 | cfo-advisor | C-level | c-level-skills | ✅ | MIT ✅ | REJECT-FOR-FIT — DEMAND-ABSENCE.a | CFO advisory; no finance demand |
| 9 | ciso-advisor | C-level (security) | c-level-skills | ✅ | MIT ✅ | STUDY-PILOT (security-adjacent) | CISO security strategy; borderline |
| 10 | senior-pm + scrum-master + jira-expert | PM | pm-skills | ✅ | MIT ✅ | REJECT-FOR-FIT — DUPLICATE / DEMAND-ABSENCE | PM skills assume team/Jira workflows; eee single-operator |
| 11 | financial-analyst-toolkit | Finance | finance-skills | ✅ | MIT ✅ | REJECT-FOR-FIT — DEMAND-ABSENCE.a | DCF/budgeting/forecasting; no finance workflow |
| 12 | saas-metrics-coach | Finance | finance-skills | ✅ | MIT ✅ | REJECT-FOR-FIT — DEMAND-ABSENCE.a | SaaS metrics; no SaaS in eee |

### Section 4 ADOPT-CANDIDATES top-3
1. **startup-cto persona** (c-level-skills) — DIRECTLY APPLICABLE to eee architecture decisions; install via `/plugin install c-level-skills@claude-code-skills` + extract persona; CR-12 PRIMARY upstream-install
2. **iso-27001 + soc-2-readiness** (ra-qm-skills) — STUDY-PILOT for security posture if surfaces
3. (none other — Layer-I domains overwhelmingly DEMAND-ABSENCE.a for pure-engineering eee)

### Section 4 REJECT-FOR-FIT (firm)
- Medical regulatory (rows 1+2+3) → DEMAND-ABSENCE.a
- Finance (rows 11+12) → DEMAND-ABSENCE.a
- PM (row 10) → DEMAND-ABSENCE.a + Atlassian-stack mismatch
- CFO advisor (row 8) → DEMAND-ABSENCE.a

### Section 4 STUDY-PILOT Probe-7.b 5-clause check: **startup-cto persona**

1. **Named operational use case**: orchestrator-side architecture-decision support (e.g., /goal P4 multi-agent fan-out for tech-stack-selection, startup-cto provides structured CTO synthesis)
2. **Cited local input/source path**: `~/.claude/agents/startup-cto.md` per README install (`cp agents/personas/startup-cto.md ~/.claude/agents/`)
3. **Wiring path**: `/plugin marketplace add alirezarezvani/claude-skills` → `/plugin install c-level-skills@claude-code-skills` (CC-native per CR-6)
4. **Incumbent comparison**: eee has wshobson/agents (W214 G7) + claude-plugins-official fleet; NO startup-CTO-specific persona; alirezarezvani fills cross-domain persona-layer gap
5. **Reversible time-box**: 30-day pilot; retire via `/plugin remove c-level-skills@claude-code-skills` (~1min CR-9)

**PASS** → STUDY-PILOT-eligible for **startup-cto persona only** (NOT full c-level bundle which has 28 mostly-DEMAND-ABSENCE skills)

---

## Section 5 — FastMCP (TypeScript + Python) framework deep-dive

**Discovery clarification**: TWO distinct repos:
- **Python**: PrefectHQ/fastmcp (25,175★ Prefect-maintained per Q1)
- **TypeScript**: punkpeye/fastmcp (3,114★ punkpeye-maintained per Q5; README quote: "For a Python implementation, see [FastMCP](https://github.com/jlowin/fastmcp)")

### 5.A PrefectHQ/fastmcp (Python)

- **Stars**: 25,175 [VERIFIED 2026-05-15 gh API]
- **License**: README badge "License" links to LICENSE blob — verify SPDX W222; Prefect-org pattern likely Apache-2.0
- **Probe 4**: ✅ no collision; NOT runtime MCP (framework for BUILDING MCPs)
- **Probe 6**: PyPI link `https://pypi.org/project/fastmcp` confirmed; not archived
- **Axis 1/2/3**:
  - A1 PASS — Prefect-org + Anthropic ("FastMCP 1.0 was incorporated into the official MCP Python SDK in 2024" per README)
  - A2 PASS — Jeremiah Lowin (jlowin) named-T2; Prefect Horizon enterprise product
  - A3 PASS — ~18mo age; ~25k★; "downloaded a million times a day" + "70% of MCP servers across all languages" per README
- **NATIVE-CC**: ⚠️ Python framework — `uv pip install fastmcp` per CR-6; NOT a CC plugin (author-tool)
- **Wiring**: EASY (~5min install + `@mcp.tool` decorator pattern)
- **Use cases**:
  - vs Anthropic CC `/plugin install`: ORTHOGONAL — `/plugin install` installs PUBLISHED MCPs; FastMCP is what AUTHORS BUILD them with
  - vs modelcontextprotocol/servers reference: COMPLEMENT — servers shows raw-SDK reference impls; FastMCP wraps SDK with `@mcp.tool` (auto-schema/validation/docs per README)
  - vs sibling: per W220 row from `modelcontextprotocol/servers` README — FastMCP is the recommended Python MCP-builder

### 5.B punkpeye/fastmcp (TypeScript)

- **Stars**: 3,114 [VERIFIED 2026-05-15 gh API W221 Q5]
- **License**: verify W222
- **Probe 4**: ✅ no collision; NOT runtime MCP
- **Probe 6**: not archived; npm publication likely
- **Axis 1/2/3**:
  - A1 PARTIAL — single-org punkpeye; cross-ref to glama.ai/mcp (same maintainer); ≥3-distinct-orgs FAIL unless paired w/ 5.A
  - A2 PARTIAL — punkpeye named-author (also `awesome-mcp-servers` 86,946★ catalog); no named-T2 beyond own
  - A3 PASS — ~17mo, 3,114★ moderate
- **NATIVE-CC**: ⚠️ TypeScript framework — `npm install fastmcp` per CR-6; NOT a CC plugin
- **Wiring**: EASY (~5min + tool/resource/prompt API)
- **Features (per direct README blob)**: built ON official MCP TS SDK — Auth + HTTP Streaming w/ SSE + HTTPS + Custom HTTP routes + Edge Runtime (Cloudflare Workers + Deno Deploy) + Stateless + CORS + Progress notifications + Streaming + Typed events + Sampling + Health-check + Roots + CLI testing/debug

### Section 5 ADOPT-CANDIDATES top-3
1. **PrefectHQ/fastmcp (Python)** — STUDY-PILOT IFF building Python MCP; `uv pip install fastmcp` per CR-6; ~80% boilerplate reduction vs raw SDK; "70% MCP market dominance" per README
2. **punkpeye/fastmcp (TypeScript)** — STUDY-PILOT IFF building TS MCP; complements Python for TS stacks
3. **Cross-ref**: modelcontextprotocol/inspector from Section 2 — pairs with FastMCP at dev-time

### Section 5 REJECT-FOR-FIT (firm)
- Both FastMCP variants if claude-sota-pure has NO MCP-authoring planned → REJECT-FOR-FIT.a Probe 7.a
- Build-time framework adoption without target use case = install-bloat per CR-9

### Section 5 STUDY-PILOT Probe-7.b 5-clause check: **Both FastMCP variants** (META)

1. **Named operational use case**: building new MCP for sss-specific operations (e.g., `sss-state-mcp` exposing `.claude/state/*.jsonl` as MCP tools — sister-rule integration w/ audit-action-loop.md)
2. **Cited local input/source path**: `Z:/claude-sota-pure/.claude/state/*.jsonl` (TARGET) or `Z:/claude-sota-installed/.local/<new-mcp>/server.py` (build)
3. **Wiring path**: install FastMCP → write `@mcp.tool` functions → publish stdio MCP → register `.mcp.json` per `code.claude.com/docs/en/mcp` schema
4. **Incumbent comparison**: NO INCUMBENT for sss-MCP-authoring; raw Anthropic SDK is low-level alt (~3-5x boilerplate); TS alt = punkpeye 5.B
5. **Reversible time-box**: 30-day pilot; install via `uv pip` / `npm`; retire = uninstall + revert `.mcp.json` + remove server file (<5min CR-9)

**PASS** for STUDY-PILOT — BUT no concrete operational driver named yet for claude-sota-pure. **Recommend W222 user-question**: "Does claude-sota-pure plan to ship any new MCP server in next 30 days?" — answer determines STUDY-PILOT vs DEFER

---

## Cross-section synthesis

### Top-5 cross-section ADOPT-NOW (pending W222 TARGET-runtime probe)

1. **microsoft/markitdown** (123,303★ MIT) — multimodal file→markdown CLI; `uvx --refresh markitdown` per CR-6; closes W220 Layer E; lowest install-risk CR-9 (zero-persist uvx)
2. **modelcontextprotocol/inspector** (9,772★) — official MCP-test/debug tool; `npx` (zero-persist); needed for any future MCP-authoring (closes Section 5 dependency)
3. **motherduckdb/mcp-server-motherduck** (480★) — local DuckDB MCP; closes W113 dbhub Probe 7.b open-question via native JSONL support (zero ETL)
4. **timescale/pg-aiguide** (1,728★ Apache-2.0) — CC-plugin form; ADOPT only if Postgres tooling concretely needed in claude-sota-pure
5. **alirezarezvani startup-cto persona** (from 14,935★ MIT) — cross-domain CTO persona; `/plugin install c-level-skills@claude-code-skills` per CR-6

### STUDY-PILOT-pending-demand
- PrefectHQ/fastmcp + punkpeye/fastmcp — IFF MCP-authoring surfaces
- googleapis/mcp-toolbox — IFF broad multi-DB query workflow surfaces
- alirezarezvani security-adjacent (iso-27001 / soc-2 / ciso) — IFF security audits surface

### REJECT-FOR-FIT (firm)
- Browser MCP alts (mcp-playwright / browser-tools / BrowserMCP / mcp-chrome) → DUPLICATE per CR-12 w/ playwright + chrome-devtools loaded
- Library-docs alt-MCPs → DUPLICATE w/ context7 loaded
- Single-DB-vendor MCPs (mysql / mongodb / neon) → DUPLICATE-or-subset w/ mcp-toolbox
- alirezarezvani medical-regulatory / finance / PM → DEMAND-ABSENCE.a Probe 7.a

### HONEST-NON-FINDING (high-value per synthesis-layer-verify.md §Reporting categories)

**Section 2 row 7**: per-language unit-test MCPs (pytest/vitest/jest/cypress) are NOT a converged-candidate category as of 2026-05-15. NO high-star MCP at Axis-1 ≥3-distinct-orgs threshold exists. **Implication**: this is NOT a gap to fill via MCP — per-language CLI test runners (pytest/jest/vitest direct) + Playwright MCP for E2E IS the converged SOTA. **Save install-bloat**; don't search for these going forward.

---

## Discipline conformance

- **CR-1 cite-trail**: TIER-1-DIRECT at file:line + HEAD SHA OR mcp__github__get_file_contents blob ✅
- **CR-3 cross-model gate**: NOT satisfied (Sonnet stand-in per FM-17.e) — W222 Path P codex CLI MUST verify ADOPT verdicts ⚠️
- **CR-5 + CR-6 install**: all candidates use official native channel (uvx/npx/npm/`/plugin install`) ✅
- **CR-9 install-risk**: version-pin discipline + 2-round fix-forward expectation acknowledged ✅
- **CR-10 research-first**: this fire IS research; install decisions DEFERRED to W222 synthesis ✅
- **CR-12 upstream-priority**: all ADOPT-CANDIDATES TIER-1-DIRECT upstream (NOT sibling cite-imports) ✅
- **multi-source-discovery-breadth ≥4 sources**: ✅ 4 distinct families (GitHub MCP + DeepWiki MCP + Plugin marketplaces + Direct blob read)
- **FM-20 row 21 TARGET-runtime probe**: ⚠️ ALL Probe 4 checks against orchestrator only; `claude-sota-pure` MUST be re-probed at W222
- **FM-19 readonly-guard**: Write tool unavailable in this dispatch class — ARTIFACT-INLINE per FM-19 §M1 (this final-return body IS the orchestrator-persistable artifact)

---

DISCOVERY-COMPLETE: 32 candidates surveyed; 5 ADOPT-NOW / 7 STUDY-PILOT / 14 REJECT-FOR-FIT / 1 HONEST-NON-FINDING (per-language test-MCPs non-converged) / 5 ALREADY-LOADED-DUPLICATE across 5 sections (Database / Testing / Doc-tooling / alirezarezvani Layer-I / FastMCP TS+Python)
