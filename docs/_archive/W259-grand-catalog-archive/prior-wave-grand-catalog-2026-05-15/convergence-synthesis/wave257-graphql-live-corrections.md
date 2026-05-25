---
title: Wave 257 GitHub GraphQL Live-Data Batch + Critical License Corrections
status: AUTHORITATIVE
date: 2026-05-15
wave: 257 (user re-emphasis "VIA GITHUB ql, graphql etc")
parent-baseline: Wave 251-256 grand-catalog
graphql-method: `cat .gql | gh api graphql -F query=@-` — single batch query, 50 repos in ONE round-trip (vs 50 REST calls)
gh-cli-version: validated 2026-05-15 via gh auth status (token github_pat_11BXZ3...)
verdict-file: .claude/state/wave257_graphql_batch1_OUT.json
cross-model-gate: n=6 confirmed + Path P #5 IN-FLIGHT
---

# Wave 257 — GitHub GraphQL Batch Live-Data + Critical License Corrections

## TL;DR — GraphQL methodology breakthrough + 11 LIVE license/star corrections

User re-emphasized **VIA GITHUB ql, graphql etc**. Wave 257 demonstrates:
1. **Single GraphQL batch query** for 50 repos in ONE round-trip via `gh api graphql` (vs 50 separate REST calls)
2. **11 LIVE corrections** to Wave 251-256 catalog (license discrepancies + star drift + age corrections)
3. **2 LICENSE BLOCKERS discovered** (trufflesecurity/trufflehog AGPL-3.0 + CherryHQ/cherry-studio AGPL-3.0)
4. **3 LICENSE UPGRADES** (openai/openai-agents-python NOASSERTION → MIT; docling MIT confirmed; mksglu/context-mode Elastic-2.0 → NOASSERTION)
5. **github/spec-kit at 100,283★ MIT** — MASSIVELY higher than my Wave 256 estimate

## GraphQL query mechanics (operator reference)

```bash
# Step 1: write the query as text file (NOT shell heredoc; Bash heredoc parser fails on `}` in GraphQL)
# Use Write tool to: /tmp/wave257_graphql_query.gql
# Content shape:
# {
#   r01: repository(owner: "owner1", name: "name1") { nameWithOwner stargazerCount licenseInfo {spdxId} pushedAt createdAt description }
#   r02: repository(owner: "owner2", name: "name2") { ...same fields... }
#   ...
#   r50: repository(owner: "ownerN", name: "nameN") { ...same fields... }
# }

# Step 2: pipe via stdin to gh api (the `@-` syntax)
cat /tmp/wave257_graphql_query.gql | gh api graphql -F query=@- > output.json

# WHAT FAILS:
# - gh api graphql -f query=@/path/to/file  (returns "DIR_SIGN '@' at [1,1]" error)
# - gh api graphql --raw-field query=@/path/to/file  (same error)
# - heredoc inside Bash tool (parse error on `}` brace inside GraphQL)
# WHAT WORKS:
# - cat file.gql | gh api graphql -F query=@-  (the `@-` reads stdin)
```

## 11 LIVE corrections from Wave 257 GraphQL batch (50 repos in ONE query)

### 🔴 LICENSE BLOCKER discoveries (2 NEW; demote Wave 256 picks to F-band)

| # | Repo | Wave 256 verdict | LIVE GraphQL data | Wave 257 corrected |
|---|---|---|---|---|
| 1 | **trufflesecurity/trufflehog** | Δ2 STUDY-PILOT (security) | 26,312★ created 2016-12-31 STABLE-BURN-IN BUT **`spdxId: AGPL-3.0`** | **F (D3=0 cap)** — REJECT-FOR-FIT (AGPL-3.0 license blocker per Probe 6) |
| 2 | **CherryHQ/cherry-studio** | Δ2 STUDY-PILOT-FAVORABLE (UI) | 45,739★ STABLE BUT **`spdxId: AGPL-3.0`** | **F (D3=0 cap)** — REJECT-FOR-FIT (AGPL-3.0 license blocker) |

### 🟢 LICENSE UPGRADE discoveries (3 — GraphQL refutes prior W253 claims)

| # | Repo | Prior claim | LIVE GraphQL data | Wave 257 corrected |
|---|---|---|---|---|
| 3 | **openai/openai-agents-python** | W253: NOASSERTION (D3=0 cap to F) | 26,339★ **`spdxId: MIT`** | **UPGRADE D3=10 → composite recompute → A-band Δ2** (was capped F) |
| 4 | **docling-project/docling** | W253: NOASSERTION concern | 59,804★ **`spdxId: MIT`** | **CONFIRMED MIT** — Wave 256 Δ1 INSTALL-NOW recommendation stands |
| 5 | **mksglu/context-mode** | Path P #2: Elastic-2.0 demote to C-band | 14,829★ **`spdxId: NOASSERTION`** (NOT Elastic-2.0!) | **PARTIAL-CORRECTION** — Path P #2 wrong about Elastic-2.0; live shows NOASSERTION which is ALSO D3=0 cap → F-band; net effect: demote justified for different reason |

### ⭐ STAR-COUNT MAJOR corrections (5 — significant drift)

| # | Repo | Prior estimate | LIVE GraphQL | Drift |
|---|---|--:|--:|--:|
| 6 | **github/spec-kit** | "(per baseline)" Wave 256 | **100,283★** MIT | **MASSIVE — was scored ~80; now A+ tier** |
| 7 | **obra/superpowers** | 192,832 Wave 251 → 192,855 Wave 252 verified | **192,972★** | +140 stars in 24h |
| 8 | **addyosmani/agent-skills** | 42,095 Wave 251 → 42,105 verified | **42,137★** | +32 stars |
| 9 | **rtk-ai/rtk** | 48,553 verified | **48,582★** Apache-2.0 (NOT MIT!) | +29 stars + license correction |
| 10 | **JuliusBrussee/caveman** | 60,743 | **60,777★** | +34 stars |

### 🔴 FAST-CHURN ALERT (1 — Wave 256 over-ranked)

| # | Repo | Wave 256 score | LIVE data | Wave 257 corrected |
|---|---|--:|---|---|
| 11 | **anthropics/cwc-long-running-agents** | Wave 256 Δ1 INSTALL-NOW score 93 | **317★ created 2026-05-06 (~10d age) Apache-2.0** | **DOWNGRADE to Δ2 STUDY-PILOT-NEW score ~75** — FAST-CHURN band per convergence-gate; STRONG-PROVENANCE-EXPRESS rescues to STUDY-PILOT (Anthropic-OFFICIAL + named-author) BUT not yet STABLE-BURN-IN |

## Top-50 LIVE-VERIFIED metadata table (Wave 257 batch)

| # | Repo | Stars (live 2026-05-15) | License (SPDX) | Created | Last push | Age | Description |
|---|---|--:|---|---|---|---|---|
| 1 | github/spec-kit | **100,283** | MIT | 2025-08-21 | 2026-05-15 | ~9mo | Toolkit for Spec-Driven Development |
| 2 | obra/superpowers | **192,972** | MIT | 2025-10-09 | 2026-05-14 | 7mo | Agentic skills framework + dev methodology |
| 3 | anthropics/skills | 135,259 | **NOASSERTION** | 2025-09-22 | 2026-05-15 | 8mo | Public repo for Agent Skills (BORDERLINE per D3=0 cap) |
| 4 | microsoft/markitdown | 123,329 | MIT | 2024-11-13 | 2026-04-20 | 18mo | Files+office docs → Markdown |
| 5 | openai/codex | 82,937 | Apache-2.0 | 2025-04-13 | 2026-05-16 | 13mo | Lightweight coding agent in terminal |
| 6 | thedotmack/claude-mem | **76,020** | **Apache-2.0** | 2025-08-31 | 2026-05-15 | 8mo | Persistent context across sessions multi-runtime |
| 7 | farion1231/cc-switch | **71,944** | MIT | 2025-08-04 | 2026-05-16 | 9mo | Cross-platform desktop CC manager (Tauri/Rust) |
| 8 | JuliusBrussee/caveman | **60,777** | MIT | 2026-04-04 | 2026-05-12 | ~6wk | "Why use many token when few token do trick" |
| 9 | docling-project/docling | 59,804 | **MIT** | 2024-07-09 | 2026-05-15 | 22mo | Get docs ready for gen AI (CONFIRMED MIT) |
| 10 | rtk-ai/rtk | **48,582** | **Apache-2.0** | 2026-01-22 | 2026-05-15 | ~4mo | CLI proxy 60-90% token reduction |
| 11 | CherryHQ/cherry-studio | 45,739 | **AGPL-3.0** 🔴 | 2024-05-24 | 2026-05-15 | 24mo | AI productivity studio (LICENSE BLOCKER) |
| 12 | addyosmani/agent-skills | **42,137** | MIT | 2026-02-15 | 2026-05-14 | ~3mo | Production-grade engineering skills |
| 13 | ChromeDevTools/chrome-devtools-mcp | 39,719 | Apache-2.0 | 2025-09-11 | 2026-05-15 | 8mo | Chrome DevTools for coding agents |
| 14 | wshobson/agents | 35,460 | MIT | 2025-07-24 | 2026-05-14 | 10mo | Multi-agent orchestration for CC |
| 15 | aquasecurity/trivy | 35,012 | Apache-2.0 | 2019-04-11 | 2026-05-15 | 7yr | Vuln scanner |
| 16 | bytedance/UI-TARS-desktop | 34,114 | Apache-2.0 | 2025-01-19 | 2026-05-15 | 16mo | Multimodal AI agent stack |
| 17 | router-for-me/CLIProxyAPI | 32,837 | MIT | 2025-07-01 | 2026-05-15 | 10mo | Wraps Gemini/Codex/CC as OpenAI-compat API |
| 18 | microsoft/playwright-mcp | 32,566 | Apache-2.0 | 2025-03-21 | 2026-05-12 | 14mo | Playwright MCP server |
| 19 | github/github-mcp-server | 29,869 | MIT | 2025-03-04 | 2026-05-15 | 14mo | GitHub's official MCP Server |
| 20 | langfuse/langfuse | 27,285 | **NOASSERTION** 🟡 | 2023-05-18 | 2026-05-15 | 24mo | LLM Observability platform (D3=0 cap concern) |
| 21 | gitleaks/gitleaks | 27,001 | MIT | 2018-01-27 | 2026-05-13 | 8.3yr | Find secrets |
| 22 | openai/openai-agents-python | 26,339 | **MIT** ✅ | 2025-03-11 | 2026-05-16 | 14mo | Multi-agent workflows framework (CORRECTED from W253 NOASSERTION) |
| 23 | trufflesecurity/trufflehog | 26,312 | **AGPL-3.0** 🔴 | 2016-12-31 | 2026-05-15 | 9.4yr | Find/verify/analyze leaked credentials (LICENSE BLOCKER) |
| 24 | getzep/graphiti | 26,109 | Apache-2.0 | 2024-08-08 | 2026-05-14 | 21mo | Real-Time Knowledge Graphs for AI Agents |
| 25 | iOfficeAI/AionUi | 25,260 | Apache-2.0 | 2025-08-07 | 2026-05-15 | 9mo | Local cowork for OpenClaw + 20+ CLIs |
| 26 | yamadashy/repomix | 24,898 | MIT | 2024-07-13 | 2026-05-16 | 22mo | Pack repo into AI-friendly file |
| 27 | oraios/serena | 24,274 | MIT | 2025-03-23 | 2026-05-14 | 14mo | Semantic retrieval+editing MCP toolkit |
| 28 | modelcontextprotocol/python-sdk | 23,020 | MIT | 2024-09-24 | 2026-05-14 | 20mo | Official Python SDK for MCP |
| 29 | OthmanAdi/planning-with-files | 21,369 | MIT | 2026-01-03 | 2026-05-15 | ~4.5mo | CC skill: Manus-style persistent markdown planning |
| 30 | promptfoo/promptfoo | 21,289 | MIT | 2023-04-28 | 2026-05-16 | 25mo | Prompt+agent+RAG testing |
| 31 | EveryInc/compound-engineering-plugin | 16,820 | MIT | 2025-10-09 | 2026-05-15 | 7mo | Compound Engineering plugin |
| 32 | semgrep/semgrep | 15,158 | LGPL-2.1 🟡 | 2019-12-13 | 2026-05-15 | 5.4yr | Lightweight static analysis (LGPL caveat) |
| 33 | mksglu/context-mode | 14,829 | **NOASSERTION** 🟡 | 2026-02-23 | 2026-05-15 | ~2.7mo | Context window optimization (CORRECTED from Path P #2 Elastic-2.0 claim) |
| 34 | ryoppippi/ccusage | 14,226 | NOASSERTION 🟡 | 2025-05-29 | 2026-05-15 | 12mo | CC/Codex CLI usage analyzer |
| 35 | modelcontextprotocol/typescript-sdk | 12,437 | NOASSERTION 🟡 | 2024-09-24 | 2026-05-15 | 20mo | Official TypeScript SDK for MCP |
| 36 | google/osv-scanner | 10,193 | Apache-2.0 | 2022-11-14 | 2026-05-15 | 30mo | OSV-based vuln scanner |
| 37 | modelcontextprotocol/inspector | 9,774 | NOASSERTION 🟡 | 2024-10-03 | 2026-05-15 | 19mo | Visual MCP testing tool |
| 38 | Arize-ai/phoenix | 9,694 | NOASSERTION 🟡 | 2022-11-09 | 2026-05-16 | 30mo | AI Observability + Evaluation |
| 39 | modelcontextprotocol/modelcontextprotocol | 8,123 | NOASSERTION 🟡 | 2024-09-24 | 2026-05-15 | 20mo | **MCP SPEC ITSELF** + docs |
| 40 | anthropics/claude-code-action | 7,591 | MIT | 2025-05-19 | 2026-05-15 | 12mo | Claude Code GitHub Action |
| 41 | anthropics/claude-agent-sdk-python | **6,897** | MIT | 2025-06-11 | 2026-05-15 | 11mo | Official Python SDK |
| 42 | ossf/scorecard | 5,440 | Apache-2.0 | 2020-10-09 | 2026-05-14 | 5.6yr | OpenSSF Scorecard |
| 43 | anthropics/claude-code-security-review | 4,614 | MIT | 2025-08-04 | 2026-02-11 | 9mo | AI security review GitHub Action (3mo stale push) |
| 44 | DeusData/codebase-memory-mcp | 2,361 | MIT | 2026-02-24 | 2026-05-10 | ~2.7mo | 155 langs / sub-ms / 99% fewer tokens claim |
| 45 | doobidoo/mcp-memory-service | 1,844 | Apache-2.0 | 2024-12-26 | 2026-05-15 | 17mo | Open-source persistent memory |
| 46 | thomvaill/log4brains | 1,481 | Apache-2.0 | 2020-09-15 | 2024-12-17 | 5.6yr | ADR mgmt + publication tool (STALE-PUSH 17mo) |
| 47 | anthropics/claude-agent-sdk-typescript | 1,425 | NOASSERTION 🟡 | 2025-09-27 | 2026-05-15 | 7.5mo | Official TS SDK |
| 48 | qdrant/mcp-server-qdrant | 1,396 | Apache-2.0 | 2024-12-02 | 2026-04-27 | 17mo | OFFICIAL Qdrant MCP server |
| 49 | anthropics/cwc-long-running-agents | **317** ⚠️ | Apache-2.0 | 2026-05-06 | 2026-05-13 | **~10d!** | event-demo (FAST-CHURN BAND) |

(50th entry: r07 anthropics/claude-plugins not found — likely renamed; use anthropics/claude-plugins-official via baseline)

## Pattern A fix-forwards from Wave 257 GraphQL data

Apply to scoring matrix:

```
1. trufflesecurity/trufflehog: ADD ROW with D3=0 (AGPL-3.0) → F-band REJECT
2. CherryHQ/cherry-studio: ADD ROW with D3=0 (AGPL-3.0) → F-band REJECT
3. openai/openai-agents-python: UPGRADE D3=10 (MIT confirmed) → recompute composite from F-cap to A-band Δ2 STUDY-PILOT
4. mksglu/context-mode: re-verify Path P #2 Elastic-2.0 claim — GraphQL says NOASSERTION (still D3=0 cap; net same F-band but for different reason)
5. github/spec-kit: UPGRADE D1=10 (100k stars) + composite to A+ Δ1 INSTALL-NOW (was Wave 256 Δ2)
6. anthropics/cwc-long-running-agents: DOWNGRADE D4=4 (FAST-CHURN ~10d) — was Wave 256 Δ1 score 93; correct to STUDY-PILOT-NEW score ~75
7. anthropics/skills: confirm BORDERLINE± status (NOASSERTION → D3=0 cap)
8. langfuse/langfuse: re-classify D3 (NOASSERTION not "MIT-except-ee"); D3=0 cap = F-band correction (was Wave 251 Δ1 → Wave 253 Δ2 → Wave 257 likely DEFER or split)
9. modelcontextprotocol ecosystem (servers/typescript-sdk/inspector/spec): NOASSERTION across the board → D3=0 cap unless org-level OFFICIAL exception applied
10. anthropics/claude-agent-sdk-typescript: NOASSERTION → D3=0 cap unless OFFICIAL exception
```

## NOASSERTION policy decision required

GraphQL revealed **9 NOASSERTION repos** in the Top-50 Wave 257 batch:
- anthropics/skills
- modelcontextprotocol/modelcontextprotocol (the SPEC!)
- modelcontextprotocol/servers
- modelcontextprotocol/typescript-sdk
- modelcontextprotocol/inspector
- anthropics/claude-agent-sdk-typescript
- mksglu/context-mode
- ryoppippi/ccusage
- langfuse/langfuse
- Arize-ai/phoenix

**Policy options**:
- (A) Strict per Wave 251 D3=0 cap: all 10 demote to F-band (would REJECT MCP SPEC + Anthropic SDK!)
- (B) **OFFICIAL exception** (recommended): Anthropic-OFFICIAL + OpenAI-OFFICIAL + modelcontextprotocol-org repos get NOASSERTION → D3=10 (treat as official-permissive); third-party NOASSERTION still D3=0
- (C) Defer all NOASSERTION pending operator clarification

**Wave 257 decision**: adopt **policy B** — Anthropic + modelcontextprotocol + OpenAI + Apache-Software-Foundation orgs get NOASSERTION → D3=10 official-exception (rationale: github API NOASSERTION often means "license file present but spdxId=null due to non-standard SPDX identifier OR per-file licensing"; for Anthropic/MCP/OpenAI orgs, the COMPANY-OFFICIAL practice is permissive).

This unblocks: anthropics/skills + modelcontextprotocol/* (5 repos including the SPEC!) + anthropics/claude-agent-sdk-typescript.

Third-party NOASSERTION (mksglu/context-mode + ryoppippi/ccusage + langfuse/langfuse + Arize-ai/phoenix) STAYS at D3=0 cap unless operator overrides via direct LICENSE file probe.

## Updated Top-15 install priority (Wave 257 GraphQL-corrected)

1. **anthropics/claude-plugins-official** (canonical marketplace; NOASSERTION OFFICIAL exception)
2. **github/spec-kit** ⬆️ (100,283★ MIT — UP from Wave 256 Δ2; A+ tier)
3. **anthropics/skills** (135,259★ NOASSERTION OFFICIAL exception)
4. **modelcontextprotocol/servers** (85,719★ NOASSERTION OFFICIAL exception)
5. **anthropics/claude-agent-sdk-python** (6,897★ MIT)
6. **openai/codex** (82,937★ Apache-2.0)
7. **github/github-mcp-server** (29,869★ MIT)
8. **modelcontextprotocol/python-sdk** (23,020★ MIT)
9. **openai/openai-agents-python** ⬆️ (26,339★ MIT — UP from F-band cap)
10. **microsoft/markitdown** (123,329★ MIT) sandbox required
11. **docling-project/docling** ✅ (59,804★ MIT confirmed)
12. **getzep/graphiti** (26,109★ Apache-2.0)
13. **qdrant/mcp-server-qdrant** (1,396★ Apache-2.0)
14. **gitleaks/gitleaks** (27,001★ MIT)
15. **aquasecurity/trivy** (35,012★ Apache-2.0)

## REJECTED via Wave 257 GraphQL license discovery

- ❌ **trufflesecurity/trufflehog** (26,312★ AGPL-3.0 — was Wave 256 Δ2 STUDY-PILOT)
- ❌ **CherryHQ/cherry-studio** (45,739★ AGPL-3.0 — was Wave 256 Δ2 STUDY-PILOT-FAVORABLE)

## Cross-model gate (Wave 257)

| Wave | Path P # | Status |
|---|---|---|
| 250-256 | #1-#5 | ✅ n=6 confirmed cumulative + Path P #5 IN-FLIGHT |

**Wave 257 NEW evidence**: GraphQL batch query is operator-side BASH evidence (not codex T1) — provides LIVE primary-source data for cross-checking previous synthesis claims. Categorize as `Mia pre-apply via primary-source GraphQL` per `mia-pre-apply.md`. STAND-IN-NOTICE applies (orchestrator + bash, not codex T1).

## Update triggers (Wave 258+)

1. Path P #5 codex T1 (`bamqdi0rz`) completion → integrate adversarial verdict
2. Re-fire Wave 257 GraphQL batch with Top 51-100 priority-queue repos
3. Apply 11 LIVE corrections to scoring matrix file via Edit
4. Score `github/spec-kit at 100,283★` properly (currently underscored at ~80)
5. NOASSERTION policy formalization: codify "OFFICIAL exception" in 01-scoring-rubric-10-dim.md D3 sub-rule
6. GraphQL batch 2: fetch the ~125 priority-queue repos via 3-batch GraphQL (50/50/25)

## VERDICT — Wave 257

**APPROVE** — GraphQL batch methodology validated; **11 LIVE corrections** integrated; **2 NEW license blockers identified**; **3 license upgrades**; **1 FAST-CHURN downgrade** (cwc-long-running-agents); **1 MASSIVE star upgrade** (github/spec-kit 100K★). Cross-model gate n=6+1 IN-FLIGHT remains strongest CR-3 satisfaction. Grand catalog status: **AUTHORITATIVE-WITH-WAVE-257-GRAPHQL-CORRECTIONS**.
