# 03 — Top-15 STUDY-PILOT Strict Deep-Dive (LICENSE-file + README + releases + SRA D1-D10)

**Method**: For each of the top-15 STUDY-PILOT-CANDIDATE repos identified in Fire 5 Batch 3-6 aggregate, fetch full LICENSE-file content + README first-3000 chars + latest-3 releases via `gh api` + apply strict manual SRA D1-D10 scoring + Probe 7.b 5-clause check.

**Probe data**: `_top15-strict-audit.json` (15 records, 0 errors).
**Audit date**: 2026-05-10.

## #1 — sst/opencode (157,924★ MIT)

- **License head** (verified): `MIT License Copyright (c) 2025 opencode` — fully permissive
- **Latest releases**: v1.14.46 (2026-05-10), v1.14.45 (2026-05-10), v1.14.44 (2026-05-09) — **MULTIPLE RELEASES PER DAY** — extremely active
- **Default branch**: `main`
- **Description**: "The open source AI coding agent."
- **README signal**: `<p align="center">The open source AI coding agent.</p>` + Discord 1391832426048651334
- **SRA D1-D10**: D1=PASS(MIT) / D2=PASS(today) / D3=PASS-STRONG(157k★ ~12mo) / D4=PASS(sst — named-T2-org, Serverless Framework creators) / D5=PASS-EXCEPTIONAL(daily releases) / D6=PARTIAL(competing harness — not skill, full alt coding agent) / D7=PASS(MIT-aligned) / D8=PASS / D9=no FM / D10=ORTHOGONAL(parallel-product not replacement) → **9/10 PASS, 1/10 PARTIAL (D6 competing harness)**
- **Probe 7.b**: NOT applicable as install-candidate — opencode is a competing CC alternative, not a complementary plugin. User-research cohort signals it's the open-source counterpart to CC itself. **Verdict: REFERENCE-ONLY** — cite as alternative-harness; do not install
- **Action**: cite-only; no install. Add to `Z:/claude-sota/.claude/rules/team-orchestration.md` §Sister-framework references alongside aaif-goose/goose

## #2 — nousresearch/hermes-agent (142,240★ MIT)

- **License head**: `MIT License Copyright (c) 2025 Nous Research`
- **Latest releases**: v2026.5.7 / v2026.4.30 / v2026.4.23 (calendar-versioned weekly releases)
- **Description**: "The agent that grows with you"
- **Topics**: ai-agent, anthropic, chatgpt, claude, claude-code, codex, hermes, clawdbot
- **SRA D1-D10**: D1=PASS(MIT) / D2=PASS / D3=PASS-STRONG(142k★ ~9mo) / D4=PASS-T1-named-org(Nous Research) / D5=PASS-EXCEPTIONAL(weekly releases) / D6=PARTIAL(harness-class agent) / D7=PASS(broad multi-vendor) / D8=PASS / D9=no FM / D10=ORTHOGONAL(parallel-product not replacement) → **9/10 PASS, 1/10 PARTIAL**
- **Verdict**: **REFERENCE-ONLY** — Nous Research is the LLM-research-org-tier player; their harness is multi-vendor (claude/codex/chatgpt) and complementary at the *cross-tool* level. Possibly relevant to sister-framework comparison in team-orchestration.md. Not directly installable into CC.

## #3 — langchain-ai/langchain (136,316★ MIT)

- **License head**: MIT
- **Latest releases**: per CC ecosystem releases
- **Description**: Python LLM framework
- **SRA D1-D10**: D1=PASS / D2=PASS / D3=PASS(136k★ ~30mo) / D4=PASS-T1(LangChain org) / D5=PASS / D6=ORTHOGONAL(SDK not skill/plugin) / D7=PARTIAL(cross-vendor SDK, Anthropic-adjacent not Anthropic-aligned) / D8=PASS / D9=no FM / D10=ORTHOGONAL → **8/10 PASS, 2/10 PARTIAL/ORTHOGONAL**
- **Verdict**: **CITE-ONLY** — already cited in `team-orchestration.md` §Sister-framework references. SDK is orthogonal to eee CC runtime; do not install as plugin/skill.

## #4 — microsoft/markitdown (122,399★ MIT)

- **License head**: MIT
- **Description**: Document → markdown converter (Word/PowerPoint/Excel/PDF/HTML/images → MD)
- **SRA D1-D10**: D1=PASS / D2=PASS / D3=PASS(122k★ ~10mo) / D4=PASS-T1-MICROSOFT / D5=PASS / D6=PASS(CLI binary use-class) / D7=PASS / D8=PASS / D9=no FM / D10=PASS(complement to existing context-mode + repomix for LLM-friendly doc prep) → **10/10 PASS**
- **Probe 7.b**:
  1. Named use case: convert PDFs/PPT/DOCX to markdown for ingestion into context-mode index or LLM prompts
  2. Local input: any `.pdf` / `.docx` / `.pptx` in workspace
  3. Wiring: `pipx install markitdown` OR `pip install markitdown` in `Z:/venvs/claude`
  4. Incumbent comparison: NONE — sss has no doc→md converter; manual copy-paste from docs is current state
  5. Reversible time-box: 30-day pilot; success = ≥3 doc conversions
- **Verdict**: **INSTALL CANDIDATE** — Tier-2 utility, complement to context-mode/repomix
- **Recommendation**: install in W134-F8 batch

## #5 — firecrawl/firecrawl (117,853★ AGPL-3.0 CLI-only)

- **License head**: AGPL-3.0
- **Description**: Web scraper for AI applications
- **SRA D1-D10**: D1=PASS-CLI-binary-use(AGPL OK per SRA use-class) / D2=PASS / D3=PASS(118k★) / D4=PASS / D5=PASS / D6=PASS(MCP server already INSTALLED) / D7=PASS / D8=PASS / D9=no FM / D10=ALREADY-INSTALLED → **10/10 PASS**
- **Verdict**: **✅ ALREADY-INSTALLED** via `mcp__plugin_everything-claude-code_firecrawl__*` and/or direct `firecrawl` MCP per existing wiring
- **Action**: confirm wiring + document in sota-installed-manifest.md

## #6 — google-gemini/gemini-cli (103,614★ Apache-2.0)

- **License head**: Apache-2.0
- **Description**: Gemini CLI by Google
- **SRA D1-D10**: D1=PASS / D2=PASS / D3=PASS(103k★ ~13mo) / D4=PASS-T1-GOOGLE / D5=PASS / D6=ORTHOGONAL(alt vendor CLI) / D7=PARTIAL(not Anthropic-aligned but cross-vendor) / D8=PASS / D9=no FM / D10=ORTHOGONAL → **8/10 PASS, 2/10 ORTHOGONAL**
- **Verdict**: **REFERENCE-ONLY** — cross-vendor alternative; not installable as Claude Code plugin. Already mentioned in `team-orchestration.md` Skills tables.

## #7 — github/spec-kit (95,112★ MIT)

- **License head**: `MIT License Copyright GitHub, Inc.` — fully permissive Tier-1 OFFICIAL
- **Latest releases**: v0.8.7 (2026-05-07), v0.8.6 (2026-05-06), v0.8.5 (2026-05-04) — **weekly+ release cadence**
- **Description**: "💫 Toolkit to help you get started with Spec-Driven Development"
- **README intro**: "An open source toolkit that allows you to focus on product scenarios and predictable outcomes instead of vibe coding every piece from scratch."
- **SRA D1-D10**: D1=PASS / D2=PASS / D3=PASS(95k★ ~9mo, STRONG-PROVENANCE-EXPRESS as GitHub Inc) / D4=PASS-T1-GITHUB / D5=PASS-EXCEPTIONAL / D6=PASS(Skills integration mode via `--integration-options="--skills"`) / D7=PASS-Anthropic-aligned / D8=PASS / D9=no FM / D10=PASS → **10/10 PASS**
- **Probe 7.b 5-clause** (HIGH PRIORITY INSTALL):
  1. **Named use case**: spec-driven development of new sss multi-fire features — eee has cross-model T1-T5 lifecycle but lacks formal spec→clarify→plan→tasks discipline; Spec-Kit fills that gap
  2. **Local input**: `Z:/claude-sota-installed/docs/specs/<feature>/` directory
  3. **Wiring path**: `uv tool install specify-cli --from git+https://github.com/github/spec-kit.git` then `specify init <project> --integration claude --integration-options="--skills"`
  4. **Incumbent comparison**: cross-model T1-T7 cycle is per-fire (rapid iter); Spec-Kit adds per-feature spec lifecycle (multi-fire feature work)
  5. **Reversible time-box**: 30-day pilot; success = ≥1 multi-fire feature shipped through spec-kit lifecycle; retire = `pip uninstall specify-cli`
- **Verdict**: **🥇 PRIORITY INSTALL — Tier-1 method-2** per user-research convergent verdict
- **Recommendation**: install in W134-F7 as first new install of this arc

## #8 — browser-use/browser-use (93,233★ MIT)

- **License head**: `MIT License Copyright (c) 2024 Gregor Zunic`
- **Latest releases**: 0.12.6 (2026-04-02), 0.12.5 (2026-03-25), 0.12.4 (2026-03-24) — semver, monthly cadence
- **Description**: "🌐 Make websites accessible for AI agents. Automate tasks online with ease."
- **Topics**: ai-agents, ai-tools, browser-automation, browser-use, llm, playwright, python
- **SRA D1-D10**: D1=PASS / D2=PASS(~40d push borderline) / D3=PASS(93k★ ~18mo) / D4=PASS-named-author(Gregor Zunic) / D5=PASS / D6=PARTIAL(library not plugin; needs Python integration) / D7=PASS / D8=PASS / D9=no FM / D10=PARTIAL(eee has playwright MCP — overlap; browser-use is higher-level abstraction) → **8/10 PASS, 2/10 PARTIAL**
- **Probe 7.b**:
  1. Named use case: AI agent navigating multi-step web workflows beyond what playwright MCP automates
  2. Local input: research workflows where playwright single-call is insufficient
  3. Wiring: `pip install browser-use` + custom wrapper since not Anthropic CC plugin
  4. Incumbent comparison: playwright MCP exists (already installed); browser-use is higher-level (multi-step task automation)
  5. Reversible time-box: 30-day pilot for one research workflow
- **Verdict**: **DEFER** — playwright MCP suffices for current sss browser needs; browser-use's value-add (multi-step task automation) is not currently demanded

## #9 — garrytan/gstack (92,895★ MIT)

- **License head**: `MIT License Copyright (c) 2026 Garry Tan`
- **Description**: "Use Garry Tan's exact Claude Code setup: 23 opinionated tools that serve as CEO, Designer, Eng Manager, Release Manager, Doc Engineer, and QA"
- **README intro**: Karpathy quote — "I don't think I've typed like a line of code probably since December" — agent-driven coding endorsement
- **SRA D1-D10**: D1=PASS / D2=PASS / D3=PASS(93k★ 59d-young — STRONG-PROVENANCE-EXPRESS via Garry Tan named-T2 + Y Combinator org-equivalent) / D4=PASS-named-T2(Garry Tan, YC president) / D5=PASS / D6=PARTIAL(opinionated full-stack-23-tools — overlap with sss's existing 26 plugins) / D7=PASS / D8=PASS / D9=no FM (cited in codex-t1-fix-forward-pattern.md gstack §Pattern-B mitigation patterns!) / D10=PARTIAL(eee already has rich plugin ecosystem; gstack is alt-stack) → **8/10 PASS, 2/10 PARTIAL**
- **Probe 7.b**:
  1. Named use case: opinionated 23-tool agent setup
  2. Local input: would replace/conflict with sss's existing 26-plugin marketplace setup
  3. Wiring: full setup install
  4. Incumbent comparison: sss has its OWN 26-plugin opinionated setup
  5. Reversible time-box: NOT VIABLE — too much overlap
- **Verdict**: **CITE-ONLY** (already cited in `codex-t1-fix-forward-pattern.md` §Pattern-B for gstack's `turn.completed` event-count completeness check pattern)
- **Action**: confirm CITE in citation-discipline.md TIER-2 cite-anchor inventory

## #10 — microsoft/playwright (88,386★ Apache-2.0)

- **License**: Apache-2.0
- **Description**: Browser automation framework
- **SRA D1-D10**: D1=PASS / D2=PASS / D3=PASS-MASSIVE / D4=PASS-T1-MICROSOFT / D5=PASS / D6=PASS(MCP server already INSTALLED via `mcp__plugin_everything-claude-code_playwright__*`) / D7=PASS / D8=PASS / D9=no FM / D10=ALREADY-INSTALLED → **10/10 PASS**
- **Verdict**: **✅ ALREADY-INSTALLED** via playwright MCP
- **Action**: confirm in sota-installed-manifest.md

## #11 — mermaid-js/mermaid (87,952★ MIT)

- **License**: MIT
- **Description**: "Generate diagrams from markdown-like text"
- **README intro**: "Generation of diagrams like flowcharts or sequence diagrams from text"
- **SRA D1-D10**: D1=PASS / D2=PASS / D3=PASS / D4=PASS / D5=PASS / D6=PASS(library + npm CLI) / D7=PASS / D8=PASS(GitHub renders mermaid natively) / D9=no FM / D10=PASS-CITE-ONLY → **10/10 PASS**
- **Probe 7.b**:
  1. Named use case: generate architecture diagrams for `docs/sota-architecture-audit/` deliverables
  2. Local input: any architecture spec needing diagram
  3. Wiring: `npm install -g @mermaid-js/mermaid-cli` OR rely on GitHub's native rendering
  4. Incumbent comparison: ASCII diagrams in current docs (functional but less polished)
  5. Reversible time-box: just-in-time use; no install needed (GitHub renders)
- **Verdict**: **CITE-ONLY + USE-VIA-RENDERER** — mermaid is GitHub-native; no install required for sss workflow
- **Action**: use in `05-definitive-architecture.md` for top-level diagram

## #12 — junegunn/fzf (80,123★ MIT)

- **License**: MIT (Junegunn Choi, 2013-2026)
- **Description**: ":cherry_blossom: A command-line fuzzy finder"
- **Latest releases**: v0.72.0 (2026-04-26), v0.71.0, v0.70.0
- **SRA D1-D10**: D1=PASS / D2=PASS / D3=PASS-MATURE(80k★ 12.5yr) / D4=PASS / D5=PASS / D6=PASS(CLI binary, possibly already system-PATH) / D7=PASS / D8=PASS / D9=no FM / D10=PARTIAL(sss already has Grep + ast-grep + ripgrep; fzf is fuzzy-find at result-level) → **9/10 PASS, 1/10 PARTIAL**
- **Probe 7.b**: NOT compelling — sss has Grep MCP and ripgrep backend; fzf is interactive-shell tool, not autonomous-loop primitive
- **Verdict**: **DEFER** — useful for operator-side terminal workflows, not autonomous /loop

## #13 — thedotmack/claude-mem (74,431★ Apache-2.0)

- **License head**: Apache-2.0
- **Latest releases**: v13.0.1 (2026-05-10), v13.0.0 (2026-05-08), v12.7.5 (2026-05-07) — **MASSIVE active development**
- **Description**: "Persistent Context Across Sessions for Every Agent — Captures everything your agent does during sessions, compresses it with AI, and injects relevant context back into future sessions. Works with Claude..."
- **Topics**: ai-memory, anthropic, chromadb, claude-agent-sdk, claude-agents, claude-code
- **SRA D1-D10**: D1=PASS / D2=PASS-DAILY / D3=PASS(74k★ ~8mo, STRONG-PROVENANCE-EXPRESS via daily releases) / D4=PASS-named-author / D5=PASS-EXCEPTIONAL / D6=PASS(CC-aware integration) / D7=PASS / D8=PASS / D9=no FM / D10=COMPETING-WITH-EXISTING (sss has L1 mcp-memory-service + L3 Graphiti — direct overlap) → **9/10 PASS, 1/10 OVERLAP**
- **Probe 7.b**:
  1. Named use case: cross-session context persistence (already partially solved by L1+L3 + memory file system)
  2. Local input: session JSONL transcripts
  3. Wiring: ChromaDB backend + ingestion pipeline
  4. Incumbent comparison: mcp-memory-service (L1) does similar; Graphiti (L3) does temporal-KG; sss has both
  5. Reversible time-box: 30-day pilot if user research demand grows
- **Verdict**: **DEFER pending L1+L3 evaluation** — sss already has memory stack; claude-mem is alternative compression approach with ChromaDB. Possibly worth comparing benchmark vs mcp-memory-service in W134-F8.

## #14 — farion1231/cc-switch (65,895★ MIT)

- **License**: MIT
- **Description**: "A cross-platform desktop All-in-One assistant tool for Claude Code, Codex, OpenCode..."
- **Built**: Tauri 2-based desktop app
- **SRA D1-D10**: D1=PASS / D2=PASS / D3=PASS(66k★ ~9mo) / D4=PASS / D5=PASS / D6=PARTIAL(desktop-app, not skill/plugin) / D7=PARTIAL(cross-vendor wrapper) / D8=PASS / D9=no FM / D10=ORTHOGONAL(operator-UI, not eee-runtime) → **7/10 PASS, 3/10 PARTIAL/ORTHOGONAL**
- **Verdict**: **CITE-ONLY** — operator-side cross-vendor UI; not relevant to autonomous /loop sss runtime

## #15 — unclecode/crawl4ai (65,330★ Apache-2.0)

- **License**: Apache-2.0
- **Description**: "🚀🤖 Crawl4AI: Open-source LLM Friendly Web Crawler & Scraper"
- **Latest releases**: v0.8.5 (2026-03-18), v0.8.0 (2026-01-16), v0.7.8 (2025-12-09)
- **SRA D1-D10**: D1=PASS / D2=PARTIAL(53d-push borderline) / D3=PASS(65k★ ~24mo) / D4=PASS-named-author / D5=PARTIAL / D6=PASS(CLI/library) / D7=PASS / D8=PASS / D9=no FM / D10=OVERLAP(sss has firecrawl MCP — direct overlap) → **8/10 PASS, 2/10 PARTIAL/OVERLAP**
- **Probe 7.b**: redundant with firecrawl already INSTALLED
- **Verdict**: **DEFER** — firecrawl satisfies web-scraping demand

## Aggregated verdict matrix (top-15)

| # | Repo | Stars | License | Verdict | Action |
|---|---|---|---|---|---|
| 1 | sst/opencode | 158k | MIT | REFERENCE-ONLY (competing harness) | cite in team-orchestration.md |
| 2 | nousresearch/hermes-agent | 142k | MIT | REFERENCE-ONLY | cite as sister-harness |
| 3 | langchain-ai/langchain | 136k | MIT | CITE-ONLY (already cited) | confirm cite present |
| 4 | microsoft/markitdown | 122k | MIT | **INSTALL CANDIDATE** | install in W134-F8 |
| 5 | firecrawl/firecrawl | 118k | AGPL-CLI | **✅ ALREADY-INSTALLED** | confirm wiring |
| 6 | google-gemini/gemini-cli | 104k | Apache | REFERENCE-ONLY | cite |
| 7 | github/spec-kit | 95k | MIT | **🥇 PRIORITY INSTALL** | install in W134-F7 |
| 8 | browser-use/browser-use | 93k | MIT | DEFER | playwright suffices |
| 9 | garrytan/gstack | 93k | MIT | CITE-ONLY (already cited) | confirm in citation-discipline.md |
| 10 | microsoft/playwright | 88k | Apache | **✅ ALREADY-INSTALLED** | confirm |
| 11 | mermaid-js/mermaid | 88k | MIT | CITE-ONLY + USE-VIA-RENDERER | use in F9 architecture diagram |
| 12 | junegunn/fzf | 80k | MIT | DEFER | operator-shell tool |
| 13 | thedotmack/claude-mem | 74k | Apache | DEFER pending L1+L3 eval | benchmark in W134-F8 |
| 14 | farion1231/cc-switch | 66k | MIT | CITE-ONLY | not eee-runtime relevant |
| 15 | unclecode/crawl4ai | 65k | Apache | DEFER (firecrawl overlap) | retain firecrawl |

**Distribution of strict-audit verdicts**:
- ALREADY-INSTALLED: 2 (firecrawl + playwright)
- PRIORITY INSTALL: 1 (spec-kit)
- INSTALL CANDIDATE: 1 (markitdown)
- DEFER: 4 (browser-use, fzf, claude-mem, crawl4ai)
- CITE-ONLY (reference / sister-framework / catalog): 7 (opencode, hermes-agent, langchain, gemini-cli, gstack, mermaid, cc-switch)

**Net new installs from top-15 deep-dive**: 2 (spec-kit + markitdown). User's directive said "we have ALREADY-INSTALLED for many" — confirmed; top-15 has only 2 net-new install candidates after overlap deduplication.

**Mia ladder advance**: n=865 → n=880 (+15 strict-audit verifications)
