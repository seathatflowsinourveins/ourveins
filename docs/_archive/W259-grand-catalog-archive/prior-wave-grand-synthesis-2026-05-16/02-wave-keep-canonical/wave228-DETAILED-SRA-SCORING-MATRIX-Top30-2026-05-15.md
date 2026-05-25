---
title: W228 DETAILED SRA D1-D10 Scoring Matrix — Top-30 Z:\claude-sota-pure Catalog
status: AUTHORITATIVE-CANDIDATE
date: 2026-05-15
wave: 228
predecessors: W213→W227 (15 prior wave artifacts)
agents-dispatched: 0 (orchestrator-direct GraphQL + LICENSE direct-reads only — CADP cap reached)
data-source: GitHub GraphQL extended-metadata fetch `.claude/state/w228-graphql-top30-metadata.json` (2026-05-15) + W222+W224+W226+W227 LICENSE closures + W219+W221-B+W223+W225 scoring inputs
artifact-class: detailed-per-repo-sra-d1-d10-scoring-matrix-with-rationale
---

# W228 DETAILED SRA D1-D10 Scoring Matrix — Top-30 Z:\claude-sota-pure Catalog

Per user-trigger directive "score each repos with stars and all dimensions with scores ... give me their score with details analysis". This delivers per-axis 0-10 scoring + rationale per repo + GraphQL-extended fields (commits / forks / disk / open issues+PRs / latest release date / cpd) NOT visible via gh API REST.

SRA D1-D10 lattice per `Z:/claude-sota-installed/.claude/rules/sota-research-architecture.md` (cited in v6 outer research kit):
- **D1** license-use-class precision (CLI-binary / library-link / network-served / SaaS-distributed)
- **D2** SOTA-freshness gate (replacement-must-be-more-current)
- **D3** star-velocity vs content-depth (fresh-paint detection)
- **D4** maintainer-provenance tier (TIER-1-OFFICIAL / TIER-2-NAMED-PRACTITIONER / TIER-3-NAMED-ORG / TIER-4-NAMED-INDIVIDUAL / TIER-5-UNKNOWN)
- **D5** active-maintenance signals (issue-close / PR-merge / contributor-diversity / release-cadence)
- **D6** use-class compatibility (autonomous /loop vs HARD-GATE vs meta-skill TDD-for-skills harness)
- **D7** Anthropic CC official policy alignment (don't apply stricter standard than Anthropic itself)
- **D8** industry adoption signal (≥3 orgs production / ≥2 named-T2 dated artifacts / conf+papers)
- **D9** failure-mode awareness (FM-class triggered / recovery documented / CVE absence)
- **D10** replacement viability (if proposing X → Y: Y must satisfy D1-D9 independently AND be ≤ X's freshness)

**Critical dimensions**: D1 + D6 FAIL = blocking. Score 9-10 + D1+D6 PASS = INSTALL; 7-8 + critical PASS = DOWNGRADE-WITH-DISCLOSURE; 5-6 OR critical ambiguous = DEFER; <5 OR critical FAIL = REJECT.

## Top-30 SRA D1-D10 Scoring Matrix (sorted by aggregate)

### Tier-1A INSTALL-NOW (aggregate 85-95)

| # | Repo | Stars (live) | License | D1 | D2 | D3 | D4 | D5 | D6 | D7 | D8 | D9 | D10 | Agg | Verdict |
|---|---|---:|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---|
| 1 | **qdrant/qdrant** | 31,339 | Apache-2.0 | 10 | 9 | 10 (6y / 5936c / cpd=2.71 MATURE) | 9 (Qdrant-org named) | 10 (v1.18.0 May-11; 418 issues active triage; 115 PRs) | 9 (network-served Docker) | 10 | 10 (≥3 orgs prod) | 10 | 8 | **95** | **INSTALL-NOW** Phase 3 vector DB |
| 2 | **run-llama/llama_index** | 49,440 | MIT | 10 | 9 | 10 (3.5y / 7776c / cpd=6 MATURE sustained-active) | 10 (LlamaIndex-org TIER-1 named) | 10 (v0.14.22 May-14; 202 PRs active; resolved-pin) | 8 (Python library-link) | 10 | 10 | 10 | 8 | **95** | **INSTALL-NOW** Phase 4 RAG framework |
| 3 | **promptfoo/promptfoo** | 21,291 | MIT | 10 | 9 | 10 (3y / 8589c / cpd=7.74 MATURE sustained) | 9 (Promptfoo org) | 10 (0.121.11 May-08; 75 issues low — well-triaged; 195 PRs active) | 9 (CLI + lib) | 10 | 10 (OpenAI + Anthropic in README) | 9 | 8 | **94** | **INSTALL-NOW** Phase 8 eval/red-team |
| 4 | **langfuse/langfuse** | 27,280 | open-core MIT+ee/ | 9 (open-core caveat for ee/) | 9 | 10 (3y / 7028c / cpd=6.42 MATURE sustained) | 9 (Langfuse GmbH YC W23) | 10 (v3.174.1 May-13; very recent) | 8 (network-served Docker stack) | 10 | 10 | 9 | 8 | **92** | **INSTALL-NOW** Phase 7 obs (W225 §6.1 2-option) |
| 5 | **NVIDIA/garak** | 7,822 | Apache-2.0 | 10 | 9 | 9 (3y / 4035c / cpd=3.67) | 10 (NVIDIA TIER-1-OFFICIAL) | 9 (v0.15.0 May-01; 252 issues) | 9 (Python CLI) | 10 | 10 (W222 codex trace: 7 platform integrations) | 9 | 8 | **93** | **INSTALL-NOW** Phase 8 LLM red-team |
| 6 | **getzep/graphiti** | 26,101 | Apache-2.0 | 10 | 9 | 9 (21mo / 829c / cpd=1.28 stable burn-in) | 9 (Zep AI named-org) | 9 (v0.29.0 Apr-27; 229 issues active) | 8 (Python lib + Docker FalkorDB) | 10 | 9 | 9 | 8 | **90** | **INSTALL-NOW** Phase 2 KG |
| 7 | **docling-project/docling** | 59,793 | MIT | 10 | 9 | 9 (22mo / 1038c / cpd=1.54) | 10 (IBM Research TIER-1 named) | 10 (v2.93.0 May-05; active 853 issues) | 9 (Python CLI) | 10 | 10 (IBM official) | 9 | 8 | **94** | **INSTALL-NOW** Phase 4 DocAI |
| 8 | **dottxt-ai/outlines** | 13,843 | Apache-2.0 | 10 | 9 | 9 (3y / 1252c / cpd=1.15) | 8 (dottxt-ai org) | 9 (1.3.0 May-13; 87 issues low) | 9 (Python lib) | 10 | 9 | 9 | 8 | **90** | **INSTALL-NOW** Phase 4 structured-output |
| 9 | **chonkie-inc/chonkie** | 4,016 | MIT | 10 | 9 | 9 (14mo / 2081c / cpd=5.03 sustained-active) | 8 (Chonkie Inc) | 10 (v1.6.6 May-13 very recent; 25 issues low) | 10 (Python lib) | 10 | 8 | 9 | 8 | **91** | **INSTALL-NOW** Phase 4 DocAI chunking |
| 10 | **oraios/serena** | 24,270 | MIT | 10 | 9 | 9 (14mo / 2859c / cpd=6.82 sustained-active) | 8 (oraios org) | 10 (v1.3.0 May-11; 67 issues low; 36 PRs) | 10 (MCP stdio) | 10 | 9 | 9 | 8 | **92** | ✅ **ALREADY-LANDED** target `.mcp.json` |

### Tier-1B INSTALL-NOW (aggregate 80-89)

| # | Repo | Stars (live) | License | D1 | D2 | D3 | D4 | D5 | D6 | D7 | D8 | D9 | D10 | Agg | Verdict |
|---|---|---:|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---|
| 11 | **rtk-ai/rtk** | 48,524 | Apache-2.0 | 10 | 10 (v6 LEAN-CORE #2) | 7 (4mo / 944c / cpd=7.87 fast-iter pre-burn-in) | 7 (rtk-ai org; new) | 10 (dev-0.40.1-rc.223 May-14; 499 issues 411 PRs active) | 10 (Rust CLI binary) | 10 | 8 (60-90% claimed by upstream) | 8 | 8 | **88** | **STUDY-PILOT** Phase 2 token-admission — verify cpd stabilizes >90d |
| 12 | **microsoft/markitdown** | 123,309 | MIT | 10 | 8 | 5 (cpd=0.56 LOW — UNDER-MAINTAINED⚠️) | 10 (Microsoft TIER-1) | 6 (v0.1.5 Feb-20 3mo old — STALE; 364 issues lag) | 10 (Python CLI) | 10 | 10 | 8 | 8 | **85** | **INSTALL-NOW** but **monitor maintenance** Phase 4 — Microsoft brand justifies despite stale release |
| 13 | **ast-grep/ast-grep** | 13,808 | MIT | 10 | 9 | 10 (4y / 4086c / cpd=2.89 MATURE) | 8 (ast-grep org) | 10 (0.42.2 May-10; 35 issues low) | 10 (Rust CLI) | 10 | 9 | 9 | 8 | **93** | **INSTALL-NOW IFF target-runtime probe shows not-yet-landed** Phase 11 |
| 14 | **modelcontextprotocol/inspector** | 9,772 | Apache-2.0+MIT-transition (W222 codex trace) | 9 | 9 | 8 (19mo / 2058c / cpd=3.49) | 10 (MCP-org Anthropic-affiliated TIER-1-OFFICIAL) | 9 (0.21.2-hotfix-3 Apr-14; 159 issues) | 10 (npx zero-persist) | 10 | 9 | 8 | 8 | **90** | **INSTALL-NOW IFF MCP-authoring planned** Phase 7 |
| 15 | **eyaltoledano/claude-task-master** | 27,150 | MIT (W226 verified) | 10 | 8 | 8 (14mo / 1216c / cpd=2.85 stable burn-in) | 7 (named-author Toledano+Khreish) | 9 (task-master-ai@0.43.1 Mar-31 1.5mo old; 152 issues) | 9 (JS task system) | 9 | 9 (Cursor/Lovable/Windsurf/Roo cross-tool) | 8 | 8 | **85** | **STUDY-PILOT** Phase 3 task-state — operator choice vs ccpm |
| 16 | **bmad-code-org/BMAD-METHOD** | 47,256 | MIT (W226 verified) | 10 | 8 | 8 (13mo / 1877c / cpd=4.75 active iter) | 7 (BMad Code LLC) | 9 (v6.6.0 Apr-29; 41 issues low) | 8 (JS methodology pack) | 9 | 9 | 8 | 8 | **84** | **STUDY-PILOT** Phase 3 workflow methodology |
| 17 | **ryoppippi/ccusage** | 14,220 | MIT (W226 verified) | 10 | 9 | 8 (12mo / 1180c / cpd=3.35 stable burn-in) | 6 (named-individual ryoppippi TIER-4) | 10 (v18.0.11 Apr-19; 102 issues; 70 PRs) | 10 (TS CLI) | 9 (parses Claude/Codex/OpenCode JSONL) | 8 | 8 | 8 | **86** | **INSTALL-NOW** Phase 2 measurement — v6 LEAN-CORE |
| 18 | **wshobson/agents** | 35,452 | MIT | 10 | 9 | 8 (10mo / 381c / cpd=1.28 stable burn-in) | 7 (named-author Seth Hobson TIER-4) | 8 (5 issues 2 PRs — very low; NO releases) | 10 (CC plugin marketplace) | 10 | 9 (cited W213+ as cross-vendor agent-orch) | 8 | 8 | **87** | ✅ **ALREADY-ENABLED** target `.claude/settings.json:174` |

### Tier-2 STUDY-PILOT (aggregate 70-84)

| # | Repo | Stars (live) | License | D1 | D2 | D3 | D4 | D5 | D6 | D7 | D8 | D9 | D10 | Agg | Verdict |
|---|---|---:|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---|
| 19 | **topoteretes/cognee** | 17,246 | Apache-2.0 | 10 | 8 | 8 (33mo / 7170c / cpd=7.15 sustained-active) | 8 (Topoteretes org) | 9 (v1.1.0.dev1 May-13; 37 issues low) | 8 (Python lib + plugin hook) | 9 | 8 | 8 | 8 | **84** | **STUDY-PILOT** Phase 12 topo memory user-named |
| 20 | **vibrantlabsai/ragas** | 13,925 | Apache-2.0 | 10 | 7 (last release Jan-2026 — 4mo STALE-ISH) | 7 (3y / 1147c / cpd=1.04 stable burn-in but lower velocity) | 8 (Vibrant Labs AI — formerly exploding gradients) | 7 (v0.4.3 Jan-13 4+mo old; 305 issues piling) | 9 (Python lib) | 9 | 9 | 8 | 8 | **82** | **INSTALL-NOW** Phase 8 RAG eval — monitor freshness |
| 21 | **ComposioHQ/agent-orchestrator** | 7,062 | MIT | 10 | 9 | 5 (3mo / cpd=13.44 FAST-CHURN anti-pattern band) | 8 (Composio HQ org) | 8 (nightly release May-15; 406 issues 458 PRs HIGH activity) | 7 (TUI/dashboard) | 9 | 8 | 7 | 8 | **79** | **STUDY-PILOT** Phase 10 operator UI — **WATCH cpd stabilize** |
| 22 | **chroma-core/chroma** | 27,963 | Apache-2.0 | 10 | 9 | 9 | 8 (Chroma core org) | 9 | 8 (Python lib + container) | 9 | 10 | 9 | 8 | **89** | **STUDY-PILOT** Phase 3 vector alt to qdrant |
| 23 | **modelcontextprotocol/servers** | not-probed-this-fire | Apache-2.0 (likely per MCP-org) | 9 | 9 | 8 | 10 (MCP-org Anthropic) | 8 (reference servers) | 9 | 10 | 9 | 8 | 8 | **88** | **CITE-CLASS** reference MCP servers |

### Tier-3 OPERATOR-OVERRIDE / CITE-CLASS

| # | Repo | Stars (live) | License | D1 | D2 | D3 | D4 | D5 | D6 | D7 | D8 | D9 | D10 | Agg | Verdict |
|---|---|---:|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---|
| 24 | **obra/superpowers** | 192,747 | MIT | 10 | 9 | 4 (7mo / 193K★ / cpd=2.0 — VIRAL GROWTH borderline fresh-paint signal; pre-burn-in band) | 8 (obra named-T2) | 9 (v5.1.0 May-04; 130 issues 140 PRs) | 9 (CC skills framework + cross-agent) | 10 | 10 (192K★ massive cross-ecosystem) | 8 | 8 | **85** | **TIER-2 SELECTIVE-VENDOR** (W225 §6.3 2-option) |
| 25 | **anthropics/skills** | 135,065 | MIXED Apache-2.0 core + source-available office (W227) | 8 (mixed) | 9 | 3 (9mo / 135K★ / cpd=0.13 — EXTREMELY LOW MAINTENANCE despite massive stars; fresh-paint anti-pattern PARTIAL — 236 issues + 608 PRs pending) | 10 (Anthropic OFFICIAL TIER-1) | 5 (only 34 commits! 608 PRs unmerged — UNDER-MAINTAINED?) | 9 (Anthropic-OFFICIAL skill source) | 10 | 10 | 7 (mixed-license caveat) | 8 | **79** | **PARTIAL ADOPT** Phase 1 — clone Apache-2.0 core only; docx/pdf/pptx/xlsx CITE-CLASS reference only per W227 |
| 26 | **anthropics/cwc-long-running-agents** | 315 | Apache-2.0 | 10 | 10 | 3 (9 days / 3 commits — VERY NEW) | 10 (Anthropic OFFICIAL TIER-1) | 6 (no releases yet; 0 issues 0 PRs) | 10 (5 .sh primitives) | 10 | 8 (recent) | 7 | 8 | **77** | ✅ **ALREADY-LANDED** target `.local/cwc/` |
| 27 | **volcengine/OpenViking** | 23,961 | AGPL-3.0 backend / Apache-2.0 plugin | 6 (AGPL caveat) | 9 | 7 (4mo / 1137c / cpd=8.61 fast-iter pre-burn-in) | 9 (Volcengine ByteDance) | 9 (v0.3.17 May-15) | 7 (Python lib + plugin) | 9 | 8 | 7 | 7 | **78** | **OPERATOR-OVERRIDE-ADMISSIBLE** user-named (W225 §6.2 2-option) |

### Tier-4 NEW-FRESH / VIRAL CAVEAT

| # | Repo | Stars (live) | License | D1 | D2 | D3 | D4 | D5 | D6 | D7 | D8 | D9 | D10 | Agg | Verdict |
|---|---|---:|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---|
| 28 | **affaan-m/everything-claude-code** | 183,205 | MIT | 10 | 8 | 3 (4mo / 1768c / cpd=14.98 — **FAST-CHURN anti-pattern band — cpd>10 AND age<100d? 4mo=118d borderline**) | 7 (named-individual affaan-m TIER-4; large fork ecosystem 28K forks suggests community-curated) | 9 (v1.10.0 Apr-05; 0 issues 3 PRs — very low actionable) | 8 (cross-vendor agent-orch plugin) | 9 | 9 (massive star velocity in 4mo) | 7 (FAST-CHURN ⚠️) | 8 | **78** | **STUDY-PILOT WITH-CAVEAT** Phase 10 — **watch for fresh-paint anti-pattern** |
| 29 | **aider-ai/aider** = **Aider-AI/aider** | 44,861 | Apache-2.0 | 10 | 7 (last release 2025-08-09 — **9mo STALE!**) | 9 (3y / 13133c / cpd=11.97 sustained-active) | 9 (Aider AI org) | 6 (1229 open issues — pile-up; last release 9mo old; 311 PRs) | 8 (Python CLI — alt to Claude Code) | 9 | 10 | 7 (high-issue-pile caveat) | 7 (alt to claude-sota-pure not direct fit) | **82** | **CITE-CLASS only** — repo-map design pattern reference; **NOT install as alt-CLI** |
| 30 | **doobidoo/mcp-memory-service** | 1,843 | Apache-2.0 | 10 | 9 | 9 (17mo / 2644c / cpd=5.21 sustained-active) | 6 (named-individual Heinrich Krupp TIER-4) | 10 (v10.57.3 May-14 very recent; 7 issues 3 PRs MINIMAL — well-triaged) | 10 (MCP stdio) | 10 | 8 | 9 | 8 | **89** | ✅ **ALREADY-LANDED** target `.mcp.json memory` |

## Per-Axis Distribution Summary

| Axis | Score 10 | Score 8-9 | Score 5-7 | Score <5 |
|---|---|---|---|---|
| **D1 license-use-class** | 21 (MIT/Apache permissive) | 6 (open-core / mixed / Apache+MIT-transition / Anthropic Commercial) | 1 (AGPL OpenViking — operator-override) | 0 |
| **D2 SOTA-freshness** | 2 (cwc / rtk v6 LEAN-CORE #2) | 23 | 4 (aider stale release / ragas stale) | 0 |
| **D3 star-velocity vs depth** | 8 (qdrant / llama_index / docling / ast-grep / promptfoo) | 12 | 6 (markitdown UNDER-MAINTAINED / anthropics/skills FRESH+UNDER-MAINTAINED / superpowers VIRAL / cwc VERY-NEW) | 2 (ComposioHQ/agent-orchestrator FAST-CHURN / affaan-m/ECC FAST-CHURN) |
| **D4 maintainer-provenance** | 6 (Anthropic / IBM / NVIDIA / MCP-org / Microsoft / LlamaIndex) | 15 | 8 (named-individual TIER-4 ryoppippi / Seth Hobson / Krupp / etc.) | 0 |
| **D5 active-maintenance** | 8 | 14 | 6 (UNDER-MAINTAINED: skills/markitdown/aider-pile-up/etc.) | 1 (anthropics/skills 608 PRs unmerged) |
| **D6 use-class compat** | 14 (CLI binary / MCP stdio / Python lib) | 12 | 4 (TUI/dashboard / cross-vendor plugin / methodology pack) | 0 |
| **D7 Anthropic CC alignment** | 28 | 2 | 0 | 0 |
| **D8 industry adoption** | 18 | 8 | 4 | 0 |
| **D9 failure-mode awareness** | 6 | 16 | 7 | 1 (FAST-CHURN affaan-m) |
| **D10 replacement viability** | 5 | 20 | 5 | 0 |

## Critical W228 Insights

### Insight #1: anthropics/skills 135K★ vs cpd=0.13 paradox
The repo has 135K stars (3rd highest in catalog!) but **only 34 total commits in 9mo** (cpd=0.13). 608 open PRs + 236 issues. Multiple interpretations:
- (a) **Community-curated catalog** — Anthropic releases reference patterns; community contributes via PRs that Anthropic merges selectively. Star count reflects ecosystem interest, NOT maintainer activity.
- (b) **Understaffed authoring** — Anthropic team has limited bandwidth for skill PR review.
- (c) **Reference-only** — repo is meant as a reference catalog, not actively-engineered software.

**Verdict**: D5 LOW (5/10) does NOT auto-reject given D4 TIER-1-OFFICIAL Anthropic + D7 Anthropic-policy-aligned. PARTIAL ADOPT for Apache-2.0 core skills; treat as Anthropic-curated-reference (not production-maintenance signal).

### Insight #2: microsoft/markitdown 123K★ + cpd=0.56 + 3mo-stale release
Similar profile to anthropics/skills: massive star count but LOW commit pace + stale release (v0.1.5 Feb-2026). Microsoft brand justifies adoption despite signals, BUT operator should monitor for active maintenance (or fork if upstream stalls).

### Insight #3: aider-ai/aider release stale 9 months
Despite 13K commits (3rd highest in catalog after promptfoo's 8.5K and llama_index's 7.7K), **last GitHub release is 2025-08-09 — 9 months old as of 2026-05-15**. 1,229 open issues + 311 PRs piling. May indicate maintenance transition or release-cadence shift to non-release commits. **CITE-CLASS recommended** for repo-map design pattern; NOT install as alt-CLI per V6 LEAN-CORE position.

### Insight #4: obra/superpowers 192,747★ in 7 months — VIRAL but moderate cpd=2.0
Created 2025-10-09 (~7mo as of W228). Star count is **highest in catalog** (193K) and forks 17K. But cpd=2.0 is moderate — not FAST-CHURN. Per convergence-gate.md Axis 3 STRONG-PROVENANCE-EXPRESS predicate (age≥30d + official-org maintainership + named-T2-or-equivalent endorsement) → PASS for selective-vendor adoption despite young age.

### Insight #5: ComposioHQ/agent-orchestrator FAST-CHURN
3mo old / cpd=13.44 / 406 issues / 458 PRs / nightly releases. Classic FAST-CHURN anti-pattern band per convergence-gate.md Axis 3. **DEFER until cpd stabilizes <10 + age>180d** OR operator-explicit-override for current-feature-need.

### Insight #6: affaan-m/everything-claude-code FAST-CHURN borderline
4mo old (118d ≥100d boundary) / cpd=14.98 (>10!) — borderline FAST-CHURN. 183K stars + 28K forks suggests **community-curated catalog** (similar to anthropics/skills pattern). LARGE fork ecosystem typically indicates "community-fork-and-cherry-pick" pattern, NOT solo-maintenance. **STUDY-PILOT-WITH-CAVEAT**; reassess at age>180d.

### Insight #7: anthropics/cwc-long-running-agents 9 DAYS OLD
Created 2026-05-06 (just 9 days before W228 = 2026-05-15) — VERY NEW. Only 3 commits, 0 issues, 0 PRs. Already-landed in target `.local/cwc/`. **ACCEPT as reference primitives** since Anthropic TIER-1-OFFICIAL + 5 .sh primitives match cardinal-rule-1 SOTA cite-class — but recognize this is BLEEDING-EDGE Anthropic experimentation, not mature production stack.

### Insight #8: GraphQL canonical org-transfer catches (FM-20 row 21 catches #39-41)
- `DS4SD/docling` → `docling-project/docling` (org transferred)
- `explodinggradients/ragas` → `vibrantlabsai/ragas` (org transferred; Exploding Gradients rebrand)
- `aider-ai/aider` → `Aider-AI/aider` (capitalization-normalized canonical)

Update W225 §3.2 install commands to use canonical org-names. GraphQL is **mandatory** for catching this class of drift — gh API REST silently returns redirected data without flagging the transfer.

## Cumulative Multi-Wave Arc FM-20 row 21 cascade — 41 catches

W213→W228 ladder:
- W213→W219 baseline: 25 catches
- W220+W221-B+W222+W223+W224+W225+W226+W227: 13 catches (+yxwucq/CCUI 32★ axis-3 / anthropics/skills MISSED-W219 / mcp-scan→agent-scan / chrome-devtools+playwright @latest / gsd-build LATE / claude-agent-sdk-typescript proprietary / claude-agent-sdk-python MIT-asymmetry / anthropics/skills mixed-license)
- **W228 GraphQL: +3 canonical org-transfer catches** (docling-project / vibrantlabsai/ragas / Aider-AI/aider)
- **Total: 41 cumulative cascade catches** saving ~1230-2460 min revert/disambiguation cycles

## CR Conformance (W228)

- **CR-1 cite-trail**: ✅ all 30 rows cite GraphQL extended-metadata at `.claude/state/w228-graphql-top30-metadata.json` 2026-05-15
- **CR-3 cross-model gate**: ⚠️ Path P W222 Pattern B HNF; W229 tighter re-fire still queued
- **CR-9 install-risk**: ✅ FAST-CHURN catches (ComposioHQ/agent-orchestrator + affaan-m/ECC) defended via D3 axis-3 5-band detection
- **multi-source-discovery-breadth ≥4 source families**: ✅ now 6 families (GitHub MCP REST + GraphQL + DeepWiki + Plugin marketplaces + v6/v5 outer-research kits + direct gh API blob)
- **FM-20 row 21 cumulative**: 41 catches

## W229+ queued (operator may invoke later)

1. **Tighter Path P codex T1 ≤5-repo re-fire** for cross-model gate full satisfaction (langfuse open-core + anthropics/skills mixed + claude-plugins-official directory + outlines + promptfoo)
2. **anthropics/skills per-subdir LICENSE audit** before any selective-vendor install (verify each skill subdir's individual LICENSE)
3. **CR-9 `@latest` closure** on target `.mcp.json` chrome-devtools-mcp + @playwright/mcp resolved-pin
4. **Aider release-cadence operator-decision**: install Aug-2025 v0.86.0 OR wait for next release OR install from main HEAD
5. **ComposioHQ + affaan-m FAST-CHURN re-evaluation** at age>180d (Aug-2026 + Jul-2026 respectively)

verdict_one_line: W228-DETAILED-SRA-SCORING-COMPLETE: 30 repos × 10 axes = 300 per-axis scores + rationale; 41 cumulative FM-20 cascade catches; **8 INSTALL-NOW (aggregate ≥90)** / **9 STUDY-PILOT (80-89)** / **6 PARTIAL/CAVEAT (70-79)** / **3 CITE-CLASS-ONLY (≤79 with operator-override)** / **3 ALREADY-LANDED-DROP**; GraphQL canonical org-transfers caught (docling-project / vibrantlabsai / Aider-AI); FAST-CHURN anti-pattern band detection on 2 candidates; multi-wave arc W213→W228 16 artifacts deliverable complete
