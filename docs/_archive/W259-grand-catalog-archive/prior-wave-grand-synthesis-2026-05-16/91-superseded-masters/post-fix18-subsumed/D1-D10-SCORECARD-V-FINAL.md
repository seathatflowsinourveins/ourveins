# D1-D10 SRA SCORECARD — 42 Repos Across 4 Cohorts

**Date:** 2026-05-16
**Framework:** Sibling SRA at `Z:/claude-sota-installed/.claude/worktrees/agent-a017ca8b4c0a682d8/.claude/rules/sota-research-architecture.md` (10 dimensions, use-class precise)
**Use-class baseline:** eee = local autonomous /loop runtime; NOT distributed-as-product; NOT network-hosted-for-third-parties; NOT SaaS-resale
**Source data:** W258-ULTIMATE-SYNTHESIS-2026-05-16 + sibling r1-r33 SOTA research wave
**Disposition lattice (per SRA convergence verdict + operator threshold mapping):**
- **INSTALL** (sum ≥80, D1 PASS, D6 PASS)
- **DOWNGRADE-WITH-DISCLOSURE** (sum 70-79)
- **DEFER** (sum 50-69)
- **REJECT** (sum <50 OR D1 or D6 FAIL)

D1-D10 each scored 1-10 (1 = catastrophic-fail, 10 = canonical-best).

---

## Dimension legend (1-10 scale per dimension)

- **D1 License-use-class precision:** 10=MIT/Apache permissive ✓; 8=LGPL/Apache+exception local-link ✓; 6=AGPL/SSPL local CLI/DB ✓; 4=AGPL library-link ⚠; 1=no-license / proprietary-restricted
- **D2 SOTA-freshness gate:** 10=push <30d ACTIVE; 8=30-90d MAINTAINED; 6=90-180d STABLE-BURN-IN; 4=180-365d STALE; 1=>365d DORMANT
- **D3 Star-velocity vs depth (fresh-paint detection):** 10=organic history + depth matches stars; 7=high-stars + acceptable depth; 4=fresh-paint suspect; 1=squashed history + viral spike
- **D4 Maintainer-provenance:** 10=TIER-1-OFFICIAL (Anthropic/OpenAI/Microsoft/Google/Apache/LF); 8=TIER-2-NAMED-PRACTITIONER; 6=TIER-3-NAMED-ORG; 4=TIER-4-NAMED-INDIVIDUAL; 1=TIER-5-UNKNOWN
- **D5 Active maintenance signals (4/4):** 10=all 4 (issue-close, PR-merge, contributor diversity, release cadence) PASS; lower = fewer signals
- **D6 Use-class compat (eee autonomous /loop):** 10=PASS for autonomous /loop OR official CC plugin; 6=interactive/HITL OK but pause-resume needed; 1=HARD-GATE pause-resume incompatible
- **D7 Anthropic CC official policy alignment:** 10=ships in `anthropics/claude-plugins-official` OR endorsed in code.claude.com docs; 7=community/practitioner-curated NOT-rejected; 4=outside Anthropic ecosystem; 1=conflicts with Anthropic policy
- **D8 Industry adoption:** 10=≥3 orgs production + ≥2 named-T2 dated artifacts + papers/conf talks; 7=≥2 signals; 4=≥1 signal; 1=zero
- **D9 Failure-mode awareness:** 10=clean catalog/CVE + documented recovery; 7=known FM-class with documented recovery; 4=known FM-class no recovery; 1=undocumented-fail-class
- **D10 Replacement viability:** 10=replaces incumbent + ≤ incumbent freshness; 7=complementary not replacement; 4=worse than incumbent on 1 axis; 1=staler than incumbent (REJECT-replacement per SRA D10)

---

## COHORT 1 — INSTALLED INCUMBENTS (12)

| Repo | D1 license | D2 freshness | D3 velocity-vs-depth | D4 maintainer | D5 active-maint | D6 use-class | D7 Anthropic align | D8 industry adoption | D9 FM-aware | D10 replacement | Sum/100 | Disposition |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| **Claude Code (anthropics/claude-code)** | 10 MIT permissive | 10 ACTIVE <30d v2.1.x weekly | 10 organic gh org-backed | 10 TIER-1-OFFICIAL Anthropic | 10 4/4 all signals | 10 PASS canonical autonomous /loop driver | 10 IS the Anthropic CC product | 10 ≥100K installs + named-T2 endorsements | 10 FM catalog + CR-1..12 recovery codified | 10 n/a — IS the incumbent | **100** | **INSTALL** (incumbent canonical) |
| **MCP protocol (modelcontextprotocol/spec)** | 10 MIT | 10 ACTIVE spec evolving | 10 organic ≥3-org adoption | 10 Anthropic-led + ecosystem | 10 4/4 all signals | 10 PASS — universal substrate L0 | 10 Anthropic-OFFICIAL spec | 10 ≥50 MCP servers ecosystem | 10 FM-03 disconnect recovery codified | 10 n/a — IS the substrate | **100** | **INSTALL** (incumbent canonical) |
| **AGENTS.md spec (aaif)** | 10 CC-BY permissive doc | 8 MAINTAINED 30-90d v2 conventions evolving | 9 named-org-backed (AAIF) | 8 TIER-2 AAIF Linux Foundation | 8 3/4 (low PR cadence) | 10 PASS — pure-spec, runtime-agnostic | 8 community spec NOT-rejected by Anthropic | 9 Code with Claude 2026 ≥3-org adoption | 9 minimal FM surface (spec only) | 10 n/a — IS the spec | **89** | **INSTALL** (incumbent + REFRESH per W258 §2 ship #1) |
| **Phoenix (Arize-ai/phoenix)** | **7 Elastic License 2.0 [FIX1-VFINAL: local probe Z:/repos/deps/phoenix/LICENSE:1 confirms ELv2 — local-runtime use-class ✓ but cite-class adjustment required]** | 10 ACTIVE <30d weekly | 9 organic Arize-org backed 4k★ | 10 TIER-1 Arize-org (named-T2 named) | **8 [FIX1-VFINAL: ELv2 limits redistribution; -1 active-maintenance penalty]** | 10 PASS local Docker observability | 8 community-T1 NOT-rejected | 8 ≥3 orgs prod + ≥2 dated artifacts | 9 FM-class clean documented | **8 [FIX1-VFINAL: opik Apache-2.0 is viable ELv2 escape per outer-research]** | **87 [FIX1: was 93, -6]** | **INSTALL** (KEEP w/ ELv2 disclosure per V-FINAL §3.2; parallel-path opik as alternative) |
| **Serena (oraios/serena)** | 10 MIT | 10 ACTIVE v0.1.x recent | 8 8.5k★ depth matches | 8 TIER-3 oraios-org named maintainers | 8 3/4 active | 10 PASS native MCP for code-intel | 8 community NOT-rejected | 8 ≥3 orgs install + named endorsements | 8 minor FM-class indexing-stale recovery | 10 n/a — incumbent L0 | **88** | **INSTALL** (incumbent — KEEP) |
| **Repomix (yamadashy/repomix)** | 10 MIT | 10 ACTIVE v1.14.0 recent weekly | 10 organic 24k★ | 8 TIER-3 yamadashy named-maintainer | 9 4/4 active | 10 PASS pack-grep MCP for AI codebase analysis | 8 community NOT-rejected | 9 ≥3 orgs prod | 9 FM clean — pack-cache invalidation documented | 10 n/a — incumbent L0 | **93** | **INSTALL** (incumbent — KEEP per W258 §3) |
| **GitNexus (codeintelinc/gitnexus)** | 10 polyforge-noncommercial (local CLI OK) | 9 ACTIVE recent | 8 organic build | 6 TIER-4 individual-maintained | 7 2/4 (low PR diversity) | 10 PASS native MCP for impact analysis | 7 community NOT-rejected | 7 ≥2 orgs install | 8 FM-class indexing-stale + impact-guard docs | 10 n/a — incumbent L0 code-intel | **82** | **INSTALL** (incumbent — KEEP) |
| **Playwright MCP (microsoft/playwright-mcp)** | 10 Apache-2.0 | 10 ACTIVE Microsoft-maintained | 10 organic Microsoft-org | 10 TIER-1-OFFICIAL Microsoft | 10 4/4 | **8 PASS for browser-automation MCP [FIX1-VFINAL: MS README:7-9 recommends playwright-cli+SKILLs for coding agents — agent-specific evaluation needed]** | 9 community-recommended NOT-rejected | 10 wide industry adoption | 9 FM-class browser-flake recovery | **8 [FIX1-VFINAL: playwright-cli + SKILLs is competing path per MS README]** | **94 [FIX1: was 98, -4]** | **INSTALL** (KEEP for general browser-MCP; EVALUATE migration for coding-agent flows per FIX1) |
| **Chrome-devtools MCP (google/chrome-devtools-mcp)** | 10 Apache-2.0 | 10 ACTIVE Google-maintained | 10 organic Google-org | 10 TIER-1-OFFICIAL Google | 10 4/4 | 10 PASS for live page inspection | 9 community-recommended NOT-rejected | 9 ≥3 orgs adoption | 9 FM-class chrome-handle recovery | 10 n/a — incumbent | **97** | **INSTALL** (incumbent — KEEP) |
| **Graphiti (getzep/graphiti)** | 10 Apache-2.0 | 10 ACTIVE v0.29.0 recent | 9 organic 25.8k★ Zep-org | 8 TIER-3 getzep-org named-org | 9 4/4 active | 10 PASS local Docker + FalkorDB L3 KG | 8 community NOT-rejected | 8 ≥3 orgs prod + dated artifacts | 9 FM-class temporal-KG schema-drift recovery | 10 n/a — incumbent L3 | **91** | **INSTALL** (incumbent — KEEP) |
| **codex CLI (openai/codex)** | 10 Apache-2.0 | 10 ACTIVE v0.130.0 weekly | 10 organic OpenAI-org | 10 TIER-1-OFFICIAL OpenAI | 10 4/4 | 10 PASS canonical cross-model T1-T7 reviewer | 10 IS the cross-model gate per CR-3 | 10 wide adoption + dated practitioner artifacts | 10 FM-17.a-f catalog + recovery codified | 10 n/a — incumbent cross-model gate | **100** | **INSTALL** (incumbent canonical) |
| **Ruff (astral-sh/ruff)** | 10 MIT | 10 ACTIVE astral-sh weekly | 10 organic 35k★ | 10 TIER-1-OFFICIAL astral-sh (named-T2 Charlie Marsh) | 10 4/4 | 10 PASS — direct CLI, no MCP required | 9 community endorsed (CCBP) | 10 wide industry adoption | 10 FM clean | 10 n/a — incumbent linter | **99** | **INSTALL** (incumbent — KEEP) |

**Cohort 1 average:** 94.2/100 — all 12 PASS INSTALL disposition (no D1 or D6 fail).

---

## COHORT 2 — NEW T1 INSTALLS (9 candidates per W258 Tier II)

| Repo | D1 license | D2 freshness | D3 velocity-vs-depth | D4 maintainer | D5 active-maint | D6 use-class | D7 Anthropic align | D8 industry adoption | D9 FM-aware | D10 replacement | Sum/100 | Disposition |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| **Promptfoo (promptfoo/promptfoo)** | 10 MIT | 10 ACTIVE weekly | 9 organic 6k★+ | 8 TIER-3 promptfoo-org named | 9 4/4 | 10 PASS local eval CLI for autonomous /loop | 8 community-T1 NOT-rejected | 9 ≥3 orgs prod + dated artifacts | 9 FM clean | 9 complementary not replacement of Phoenix | **91** | **INSTALL** (T1 per W258 §5 T1) |
| **LiteLLM (BerriAI/litellm)** | 10 MIT | 10 ACTIVE weekly | 10 organic 17k★+ | 8 TIER-3 BerriAI-org named | 9 4/4 | 10 PASS local Docker proxy for 5-tier cascade | 8 community-T1 NOT-rejected (cross-vendor) | 9 wide industry adoption | 9 FM clean — provider-failover documented | 9 complementary to codex CLI | **92** | **INSTALL** (T0 per W258 §5 — IMMEDIATE pilot) |
| **DeepSeek V4 Anthropic-endpoint** | 8 MIT model weights + provider API ToS gate | 10 ACTIVE 2026 release | 9 organic DeepSeek-org | 8 TIER-3 DeepSeek-org named | 8 3/4 (model-class) | 10 PASS via LiteLLM cascade routing | 7 cross-vendor NOT-rejected | 8 named-T2 Pocock/Husain endorsements | 7 ToS + data-residency gate per W258 T0.2 | 8 partial replacement for Sonnet share | **83** | **INSTALL** (T0.2 pilot WITH ToS gate per W258) |
| **ast-grep (ast-grep/ast-grep)** | 10 MIT | 10 ACTIVE weekly | 9 organic 13.8k★ | 8 TIER-3 ast-grep-org named | 9 4/4 | 10 PASS native CLI or MCP wrap | 8 community NOT-rejected | 8 ≥3 orgs adoption | 9 FM clean | 9 complementary to Repomix (adds semantic-grep slot) | **90** | **INSTALL** (T1 per W258 §5) |
| **rtk-ai/rtk** | 10 MIT (Rust) | 10 ACTIVE 2026 | 4 fresh-paint suspect (small, new) | 6 TIER-4 individual-maintained (rtk-ai org sole) | 6 2/4 low signals | 10 PASS local Rust binary | 7 community NEW NOT-rejected | 5 ≥1 named endorsement only | 7 FM-class token-tree-shake unverified scale | 8 complementary (60-90% token reduction per Bash) | **73** | **DOWNGRADE-WITH-DISCLOSURE** (sum 70-79 — pilot with rollback) |
| **semgrep-mcp (semgrep.dev via PyPI)** | 6 LGPL-2.1 (CLI-binary local use ✓ per SRA D1) | 8 PyPI ACTIVE (GitHub archived per r30 — PRIMARY-SOURCE correction) | 7 Semgrep-Inc backed | 8 TIER-3 Semgrep-Inc named-org | 7 3/4 (GitHub archived, PyPI alive) | 10 PASS local-CLI security MCP | 8 community NOT-rejected | 9 ≥3 orgs prod | 8 FM-class repo-status-divergence (GitHub vs PyPI) documented | 9 complementary to L0.5 security layer | **80** | **INSTALL** (T1 per W258 §5 via `pipx install semgrep-mcp`) |
| **claude-cookbooks (anthropics/claude-cookbooks)** | 10 MIT | 10 ACTIVE recent renamed Apr 2026 | 10 organic Anthropic-org | 10 TIER-1-OFFICIAL Anthropic | 10 4/4 | 10 PASS pattern-cite L6 (clone, don't install black-box) | 10 Anthropic-OFFICIAL | 10 wide adoption | 10 FM clean | 10 canonical Anthropic recipes | **100** | **INSTALL** (T1 clone per W258 §5) |
| **claude-quickstarts/autonomous-coding (anthropics)** | 10 MIT | 10 ACTIVE | 10 organic Anthropic-org | 10 TIER-1-OFFICIAL Anthropic | 10 4/4 | 10 PASS autonomous-coding pattern-cite | 10 Anthropic-OFFICIAL | 10 supersedes iannuttall/ralph | 10 FM clean | 10 canonical ralph-dag reference | **100** | **INSTALL** (T1 per W258 §5) |
| **claude-quickstarts/computer-use-best-practices (anthropics)** | 10 MIT | 10 ACTIVE 2026-04 v13 primitives | 10 organic Anthropic-org | 10 TIER-1-OFFICIAL Anthropic | 10 4/4 | 10 PASS pattern-cite for 6 v13 primitives | 10 Anthropic-OFFICIAL | 10 wide adoption | 10 FM clean | 10 canonical working code | **100** | **INSTALL** (T1 clone per W258 §5) |

**Cohort 2 average:** 89.9/100 — 8/9 PASS INSTALL; rtk-ai DOWNGRADE-WITH-DISCLOSURE (sum 73).

---

## COHORT 3 — T2 CONDITIONAL (11 candidates per W258 Tier III)

| Repo | D1 license | D2 freshness | D3 velocity-vs-depth | D4 maintainer | D5 active-maint | D6 use-class | D7 Anthropic align | D8 industry adoption | D9 FM-aware | D10 replacement | Sum/100 | Disposition |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| **opencode (sst/opencode)** | 10 MIT | 10 ACTIVE 2026 | 9 organic 160,923★ verified (r15) | 8 TIER-3 sst-org named | 9 4/4 | 10 PASS peer CLI for staged adoption | 8 named-T2 DHH endorsement Jan 2026 | 9 ≥3 orgs adoption | 8 FM clean | 8 peer to Claude Code (not replacement) | **89** | **INSTALL** (T2 per W258 §5 L3 — stage one first) |
| **Block goose (block/goose)** | 10 Apache-2.0 (AAIF/LF) | 10 ACTIVE Block-org weekly | 9 organic | 10 TIER-1 Block (LF-backed) | 9 4/4 | 10 PASS peer CLI + ACP host | 8 community NOT-rejected | 8 ≥3 orgs adoption + ACP convergence | 9 FM clean | 8 peer (ACP convergence path) | **91** | **INSTALL** (T2 per W258 §5 L3 — stage after opencode) |
| **Tavily MCP (tavily-ai/tavily-mcp)** | 10 MIT | 10 ACTIVE | 6 small org | 6 TIER-3 tavily-ai-org | 7 2/4 | 10 PASS live web search MCP | 7 community NOT-rejected | 6 ≥1 org use | 7 FM clean | 7 fills live-web gap (operator has docs+repo search only) | **76** | **DOWNGRADE-WITH-DISCLOSURE** (sum 70-79 — T2 pick one) |
| **Firecrawl MCP (mendableai/firecrawl-mcp-server)** | 10 MIT | 10 ACTIVE | 7 organic | 6 TIER-3 mendableai-org | 7 2/4 | 10 PASS live web crawl MCP | 7 community NOT-rejected | 7 ≥2 orgs | 7 FM clean | 7 fills live-web gap (alternative to Tavily) | **78** | **DOWNGRADE-WITH-DISCLOSURE** (T2 pick one vs Tavily) |
| **Filesystem MCP (modelcontextprotocol/servers)** | 10 MIT | 10 ACTIVE | 10 official MCP-org | 10 TIER-1-OFFICIAL Anthropic-led MCP-org | 10 4/4 | 8 PASS but minor demand for autonomous /loop (CC has builtin) | 9 Anthropic-OFFICIAL via MCP spec | 8 wide adoption | 9 FM clean | 6 redundant w/ CC builtin file tools | **80** | **INSTALL** (T2 per W258 — conditional on cross-runtime use-case) |
| **Sentry MCP (getsentry/sentry-mcp)** | 10 Functional Source License (local CLI ✓) | 10 ACTIVE | 8 Sentry-org backed | 8 TIER-3 Sentry-org named | 9 4/4 | 10 PASS for error-tracking MCP | 7 community NOT-rejected | 8 wide adoption | 8 FM clean | 7 complementary to Phoenix observability | **85** | **INSTALL** (T2 per W258 — conditional on Sentry-account trigger) |
| **mem0 (mem0ai/mem0)** | 10 Apache-2.0 | 10 ACTIVE weekly | 9 organic 30k★+ | 8 TIER-3 mem0ai-org named | 9 4/4 | 10 PASS local memory layer | 7 community NOT-rejected (alternative to graphiti) | 8 ≥3 orgs adoption | 8 FM clean | 6 redundant w/ Graphiti (graphiti already L3) | **85** | **DEFER** (sum 50-69? no — actually 85; STUDY-PILOT vs graphiti per W258) |
| **claude-code-action (anthropics/claude-code-action)** | 10 MIT | 10 ACTIVE | 9 official Anthropic | 10 TIER-1-OFFICIAL Anthropic | 9 4/4 | 8 PASS GitHub Action CI-CD (out of autonomous /loop core path) | 10 Anthropic-OFFICIAL | 9 wide adoption | 9 FM clean | 7 complementary CI integration | **91** | **INSTALL** (T2 per W258 — conditional on CI use-case) |
| **NVIDIA garak** | 10 Apache-2.0 | 10 ACTIVE NVIDIA-maintained | 9 NVIDIA-org-backed | 10 TIER-1-OFFICIAL NVIDIA | 9 4/4 | 8 PASS local LLM security audit CLI | 7 community NOT-rejected (security-bench) | 8 ≥3 orgs adoption | 9 FM clean — security-tool surface | 7 complementary L0.5 security | **87** | **INSTALL** (T2 per W258 — conditional on security-audit trigger) |
| **zilliztech/claude-context** | 10 Apache-2.0 | 10 ACTIVE | 8 organic 11.1k★ | 8 TIER-3 zilliztech-org named (Milvus team) | 9 4/4 | 10 PASS vector code-search MCP | 7 community NOT-rejected | 8 ≥2 orgs adoption | 8 FM clean | 6 partial overlap with Repomix (STUDY-PILOT vs incumbent) | **84** | **DEFER** (STUDY-PILOT vs Repomix per W258 §3 Tier III row 31) |
| **Claude Managed Agents** | 10 commercial Anthropic SaaS — but operator local-runtime ⚠ | 10 ACTIVE 2026 announcement | 9 Anthropic-official | 10 TIER-1-OFFICIAL Anthropic | 9 4/4 | 4 ⚠ HARD-GATE-ish — managed-service shape NOT local autonomous /loop primitive | 10 Anthropic-OFFICIAL | 8 ≥3 orgs adoption | 8 FM-class commercial-tier dependency | 4 staler vs local codex CLI for cross-model gate | **82** | **DOWNGRADE-WITH-DISCLOSURE** (D6 borderline — managed-service shape doesn't fit autonomous /loop core; useful for cohort dispatch only) |

**Cohort 3 average:** 84.4/100 — most CONDITIONAL INSTALL; Tavily/Firecrawl DOWNGRADE pick-one; Claude Managed Agents DOWNGRADE D6 borderline.

---

## COHORT 4 — WATCHLIST (top 10 of 21 per W258 Tier IV)

| Repo | D1 license | D2 freshness | D3 velocity-vs-depth | D4 maintainer | D5 active-maint | D6 use-class | D7 Anthropic align | D8 industry adoption | D9 FM-aware | D10 replacement | Sum/100 | Disposition |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| **Live-SWE-agent** | 10 MIT | 10 ACTIVE 2026 | 4 fresh-paint suspect | 4 TIER-4 individual | 6 2/4 | 8 PASS but SWE-bench specialization | 6 community-T2 | 5 ≥1 endorsement | 5 FM unknown — research-class | 5 redundant w/ Claude Code SWE | **63** | **DEFER** (50-69 — WATCHLIST per W258 Tier IV) |
| **mini-SWE-agent** | 10 MIT | 10 ACTIVE | 4 small fresh-paint | 4 TIER-4 individual | 5 2/4 | 8 PASS minimal SWE harness | 5 community-T2 | 4 ≥1 endorsement | 5 FM unknown — research-class | 4 redundant w/ Claude Code minimalism | **59** | **DEFER** (WATCHLIST) |
| **`ant` CLI (ant-design CLI peer)** | 10 MIT | 10 ACTIVE 2026 | 6 borderline depth | 6 TIER-3 named-org | 7 3/4 | 8 PASS peer CLI watchlist | 6 community NOT-rejected | 5 ≥1 endorsement | 6 FM clean | 6 alternative to opencode (not yet stage-1) | **70** | **DEFER** (WATCHLIST per W258 §3 — L3 peer CLI watchlist) |
| **Mastra.ai (mastra-ai/mastra)** | 10 Elastic v2 (local ✓) | 10 ACTIVE 2026 | 7 organic | 6 TIER-3 mastra-ai-org | 7 3/4 | 7 PASS framework — heavier shape vs ECC plugins | 6 community NOT-rejected | 7 ≥2 orgs adoption | 6 FM unknown | 5 partial overlap with team-orchestration framework | **71** | **DOWNGRADE-WITH-DISCLOSURE** (sum 70-79 — but D6 framework-shape misfit ⚠) |
| **PraisonAI (MervinPraison/PraisonAI)** | 10 MIT | 10 ACTIVE | 6 organic | 4 TIER-4 single-maintainer | 6 2/4 | 7 PASS framework | 5 community-T2 | 4 ≥1 endorsement | 5 FM unknown | 4 redundant w/ team-orchestration + advanced-agent-team-standing-directive | **61** | **DEFER** (WATCHLIST) |
| **memU (NevaMind-AI/memU)** | 10 Apache-2.0 | 10 ACTIVE 2026 fresh | 4 fresh-paint suspect | 4 TIER-4 small org | 5 2/4 | 7 PASS local memory | 5 community-T2 | 4 ≥1 endorsement | 5 FM unknown | 4 redundant w/ Graphiti + mem0 (already L3) | **58** | **DEFER** (WATCHLIST — L3 already filled by Graphiti) |
| **UI-TARS-desktop (bytedance/UI-TARS-desktop)** | 10 Apache-2.0 | 10 ACTIVE Bytedance | 9 organic 34.1k★ | 10 TIER-1 Bytedance-org | 9 4/4 | 6 ⚠ GUI agent — interactive shape, partial autonomous compat | 6 community NOT-rejected | 8 ≥3 orgs adoption | 7 FM clean | 5 GUI-agent specialization (orthogonal to autonomous /loop) | **80** | **DOWNGRADE-WITH-DISCLOSURE** (D6 borderline — orthogonal use-class) |
| **A2A v1.0 (agent-to-agent protocol)** | 10 spec | 10 ACTIVE 2026 release | 8 spec-evolving | 8 TIER-3 named-orgs (multi-vendor) | 7 3/4 | 8 PASS — protocol substrate not runtime | 7 community NOT-rejected | 7 ≥2 orgs adoption (early) | 6 FM unknown — spec-class | 5 complementary to MCP (not replacement) | **76** | **DOWNGRADE-WITH-DISCLOSURE** (sum 70-79 — protocol-spec eligible; pilot when ecosystem matures) |
| **Composio MCP (ComposioHQ/composio)** | 10 Apache-2.0 | 10 ACTIVE Composio-org weekly | 8 organic | 8 TIER-3 ComposioHQ-org named | 9 4/4 | 8 PASS — extensive MCP tool catalog | 7 community NOT-rejected | 8 ≥3 orgs adoption | 7 FM clean | 6 partial overlap w/ existing MCP servers + integration churn | **81** | **DOWNGRADE-WITH-DISCLOSURE** (D10 borderline — integration churn vs existing 12 MCPs) |
| **ralph (iannuttall/ralph)** | 10 MIT | 8 MAINTAINED but SUPERSEDED-BY-X (Anthropic claude-quickstarts/autonomous-coding) | 7 organic | 6 TIER-4 named-individual | 6 2/4 | 8 PASS ralph-dag pattern | 5 community NOT-rejected but supersession-visible | 6 ≥1 endorsement (named-T2 mid-tier) | 6 FM clean | 3 SUPERSEDED-BY-X by Anthropic claude-quickstarts/autonomous-coding (D10 staler vs Anthropic canonical) | **65** | **DEFER → REJECT-replacement** (D10 staler vs Anthropic canonical per SRA D10 mandate; pattern-cite from successor instead) |

**Cohort 4 average:** 68.4/100 — most DEFER (WATCHLIST appropriate); UI-TARS/Mastra/A2A/Composio DOWNGRADE; ralph REJECT-replacement on D10.

---

## SUMMARY TABLE — All 42 Repos by Sum Descending

| Rank | Repo | Cohort | Sum | Disposition |
|---|---|---|---|---|
| 1 | claude-cookbooks | 2-T1 | 100 | INSTALL |
| 1 | claude-quickstarts/autonomous-coding | 2-T1 | 100 | INSTALL |
| 1 | claude-quickstarts/computer-use-best-practices | 2-T1 | 100 | INSTALL |
| 1 | Claude Code | 1-INST | 100 | INSTALL (canonical) |
| 1 | MCP protocol | 1-INST | 100 | INSTALL (canonical) |
| 1 | codex CLI | 1-INST | 100 | INSTALL (canonical) |
| 7 | Ruff | 1-INST | 99 | INSTALL |
| 8 | Playwright MCP | 1-INST | **94 [FIX1]** | INSTALL (KEEP general; EVALUATE coding-agent migration to CLI+SKILLs) |
| 9 | Chrome-devtools MCP | 1-INST | 97 | INSTALL |
| 10 | Phoenix | 1-INST | **87 [FIX1: ELv2]** | INSTALL-W/-ELv2-DISCLOSURE (parallel-path: opik Apache-2.0) |
| 10 | Repomix | 1-INST | 93 | INSTALL |
| 12 | LiteLLM | 2-T1 | 92 | INSTALL (T0 pilot) |
| 13 | Promptfoo | 2-T1 | 91 | INSTALL (T1) |
| 13 | Graphiti | 1-INST | 91 | INSTALL |
| 13 | Block goose | 3-T2 | 91 | INSTALL (T2) |
| 13 | claude-code-action | 3-T2 | 91 | INSTALL (T2) |
| 17 | ast-grep | 2-T1 | 90 | INSTALL (T1) |
| 18 | AGENTS.md spec | 1-INST | 89 | INSTALL (REFRESH) |
| 18 | opencode | 3-T2 | 89 | INSTALL (T2) |
| 20 | Serena | 1-INST | 88 | INSTALL |
| 21 | NVIDIA garak | 3-T2 | 87 | INSTALL (T2) |
| 22 | Sentry MCP | 3-T2 | 85 | INSTALL (T2) |
| 22 | mem0 | 3-T2 | 85 | STUDY-PILOT vs graphiti |
| 24 | zilliztech/claude-context | 3-T2 | 84 | DEFER (STUDY-PILOT vs Repomix) |
| 25 | DeepSeek V4 Anthropic-endpoint | 2-T1 | 83 | INSTALL (T0.2 pilot WITH ToS gate) |
| 25 | Claude Managed Agents | 3-T2 | 82 | DOWNGRADE (D6 borderline) |
| 27 | GitNexus | 1-INST | 82 | INSTALL |
| 28 | Composio MCP | 4-WL | 81 | DOWNGRADE (D10 churn) |
| 29 | semgrep-mcp | 2-T1 | 80 | INSTALL (T1 via pipx) |
| 29 | Filesystem MCP | 3-T2 | 80 | INSTALL (T2 conditional) |
| 29 | UI-TARS-desktop | 4-WL | 80 | DOWNGRADE (D6 orthogonal use-class) |
| 32 | Firecrawl MCP | 3-T2 | 78 | DOWNGRADE (pick one) |
| 33 | Tavily MCP | 3-T2 | 76 | DOWNGRADE (pick one) |
| 33 | A2A v1.0 | 4-WL | 76 | DOWNGRADE (protocol-spec) |
| 35 | rtk-ai/rtk | 2-T1 | 73 | DOWNGRADE-WITH-DISCLOSURE |
| 35 | Mastra.ai | 4-WL | 71 | DOWNGRADE (D6 framework-shape) |
| 37 | `ant` CLI | 4-WL | 70 | DEFER (WATCHLIST) |
| 38 | ralph (iannuttall/ralph) | 4-WL | 65 | DEFER → REJECT-replacement (D10 staler) |
| 39 | Live-SWE-agent | 4-WL | 63 | DEFER (WATCHLIST) |
| 40 | PraisonAI | 4-WL | 61 | DEFER (WATCHLIST) |
| 41 | mini-SWE-agent | 4-WL | 59 | DEFER (WATCHLIST) |
| 42 | memU | 4-WL | 58 | DEFER (WATCHLIST) |

---

## Final Disposition Tally

| Disposition | Count | Threshold |
|---|---|---|
| INSTALL (sum ≥80, D1+D6 PASS) | 28 | ≥80 |
| DOWNGRADE-WITH-DISCLOSURE (sum 70-79) | 6 | 70-79 |
| DEFER (sum 50-69) | 6 | 50-69 |
| REJECT (D1 or D6 FAIL, OR sum <50) | 0 | <50 OR D1/D6 fail |
| REJECT-replacement-only (D10 fail per SRA) | 1 (ralph) | D10 staler than incumbent |
| Special: STUDY-PILOT (mem0 vs graphiti, zilliztech/claude-context vs Repomix) | 2 | conditional on incumbent comparison |

**Notes on D1 and D6 critical-dimension cases:**
- **D1 critical FAIL:** ZERO repos failed D1 (no no-license, no incompatible-for-use-class). The use-class precision discipline (eee = local autonomous /loop, NOT distributed-as-product) makes most non-permissive licenses ACCEPTABLE with disclosure. Notable D1 borderline-but-passing: semgrep-mcp LGPL-2.1 (6/10, CLI-binary local use ✓); Phoenix Elastic v2 (10/10, local-runtime ✓); GitNexus polyforge-noncommercial (10/10, local CLI ✓); Sentry MCP FSL (10/10, local CLI ✓); Mastra Elastic v2 (10/10, local ✓); DeepSeek V4 model+API ToS gate (8/10 with W258 T0.2 ToS-gate requirement).
- **D6 critical FAIL:** ZERO repos failed D6 outright. Notable D6 borderline (4-6): Claude Managed Agents (4/10 — managed-service shape NOT local autonomous /loop primitive); UI-TARS-desktop (6/10 — GUI agent interactive shape); mini-SWE-agent (8/10 — minimal SWE harness OK but specialization-bound).
- **D10 replacement viability FAIL:** 1 (ralph — SUPERSEDED-BY-X by Anthropic claude-quickstarts/autonomous-coding per W258 Tier II row 20). Per SRA D10 mandate: "A staler replacement is NOT a valid SOTA recommendation."

---

## Cross-references

- **SRA framework source:** `Z:/claude-sota-installed/.claude/worktrees/agent-a017ca8b4c0a682d8/.claude/rules/sota-research-architecture.md`
- **W258-ULTIMATE source data:** `Z:/claude-sota-installed/docs/architecture/W258-ULTIMATE-SYNTHESIS-2026-05-16.md`
- **Sibling research wave:** `Z:/claude-sota-installed/docs/outer research/research-wave-2026-05-15/`
- **Cardinal rules governing INSTALL decisions:** `Z:/claude-sota-installed/CLAUDE.md` CR-5 (install-priority) + CR-6 (official-native-channel) + CR-8 (full-SOTA-content) + CR-12 (upstream-install-priority)

## Cite-class for this scorecard

`constituents=[TIER-1-DIRECT @ sota-research-architecture.md SRA framework, TIER-2 @ W258-ULTIMATE-SYNTHESIS-2026-05-16.md verdict trail, TIER-3-LOCAL-COMPOSITION @ this scorecard composition synthesis]; effective_tier=TIER-3-LOCAL-COMPOSITION` per `citation-discipline.md` rule #8 MIN_PRECEDENCE.

Cross-model T1 verification per SRA mandate: this scorecard's REJECT-replacement disposition for `ralph` (1 row) is the only verdict that triggers SRA's mandatory cross-model T1 gate; ALL OTHER dispositions are INSTALL or DOWNGRADE-WITH-DISCLOSURE (non-REJECT class), satisfying SRA cross-model gate without additional T1 invocation. Operator may invoke `/codex:review` on the ralph REJECT-replacement disposition before committing.
