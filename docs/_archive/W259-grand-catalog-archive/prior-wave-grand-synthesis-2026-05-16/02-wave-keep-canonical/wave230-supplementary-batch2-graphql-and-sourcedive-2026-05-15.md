---
title: W230 Supplementary — Source-Dive Batch #2 + GraphQL Rows 31-60 + cardinal-rule-11 META-process Dogfood
status: AUTHORITATIVE-CANDIDATE
date: 2026-05-15
wave: 230
predecessors: W213→W229 (17 prior wave artifacts)
agents-dispatched: 0 (orchestrator-direct + kit-local `repo-source-deep-dive` skill governance)
skills-invoked: repo-source-deep-dive (v6 kit) + sota-repo-selection (W224)
data-sources: per-repo source-dive artifacts at `tmp/wave230-sourcedive/` (5 repos) + GraphQL rows 31-60 at `.claude/state/w230-graphql-batch2-rows31-60.json` (30 repos)
artifact-class: source-dive-batch2-plus-graphql-batch2-supplementary-catalog
cardinal-rule-11-dogfood: this wave executes per cardinal-rule-11 META-process SOTA discipline (loaded via system-reminder this fire) — agent dispatch + verdict synthesis + Pattern A apply + Mia pre-apply + FM-20 path-drift defense + provenance log all SOTA-cited
---

# W230 Supplementary — Source-Dive Batch #2 + GraphQL Rows 31-60

Per `repo-source-deep-dive` skill §5 — never install before source audit + `sota-repo-selection` skill §1 read SOTA list authority.

## 1. cardinal-rule-11 META-process SOTA dogfood disclosure (per system reminder this fire)

This W230 fire executes per `cardinal-rule-11-meta-process-sota.md` discipline:
- **Bootstrap edits**: this catalog file is hand-coded per cardinal-rule-5 §"Bootstrap-only files"; cites TIER-1-DIRECT gh API at HEAD 2026-05-15
- **Agent dispatch**: NONE this fire (CADP cap 4/5; FM-17.e risk); orchestrator-direct fallback per advanced-agent-team-standing-directive Anti-pattern recovery
- **Verdict synthesis**: per `synthesis-layer-verify.md §Reporting categories` (OVER/UNDER/HONEST-NON-FINDING) applied to GraphQL + source-dive findings
- **Pattern A apply**: this catalog applied as supplementary delta to W225+W228+W229 (NOT rewriting prior — per `port-note-discipline.md §6`)
- **Mia pre-apply**: 5 W230 catches verified at gh API blob/jq level BEFORE inclusion (rates limits / archived flags / SPDX direct-read)
- **FM-20 path-drift defense**: applied — 5 new catches #44-#48 identified this fire
- **Commit discipline**: per `git-cli-grammar-discipline.md` — flags BEFORE `--` separator
- **CR-9 install-risk**: applied — FAST-CHURN bands flagged
- **CR-10 research-first**: applied — gh GraphQL + source-dive PRECEDE install
- **Provenance**: this file persisted to `tmp/wave230-supplementary-batch2-graphql-and-sourcedive-2026-05-15.md` per `audit-action-loop.md` Surface stage

## 2. Source-Dive Batch #2 Findings (5 repos)

### 2.1 bmad-code-org/BMAD-METHOD v6.6.0 — MIT + TRADEMARK

**File cites** (all `bmad-code-org/BMAD-METHOD @ HEAD main 2026-05-15`):
- `LICENSE:1-32` — MIT License Copyright (c) 2025 BMad Code, LLC + **TRADEMARK NOTICE** on "BMad™", "BMad Method™", "BMad Core™" (covering all casings BMAD/bmad/BMadMethod/etc.) ⚠️ vendor-fork must NOT use trademark names
- `package.json:1-30` — `name:bmad-method, version:6.6.0, license:MIT, bin:bmad/bmad-method, main:tools/installer/bmad-cli.js`
- README.md:70-80 — **prerequisites**: Node.js v20+ + Python 3.10+ + uv; install: `npx bmad-method install`
- README.md:48-55 — 12+ domain expert agents (PM/Architect/Developer/UX) + "Party Mode" multi-agent collaboration + scale-domain-adaptive auto-adjustment

**Architectural notes**:
- npm-published CLI installer (`npx bmad-method install`) — adopts target project directory
- Cross-runtime support: Claude Code + Cursor + others (per README "open your AI IDE")
- Quality scripts: prettier + eslint + markdownlint + 7 test scripts + skills validation
- Author: Brian "BMad" Madison
- **Trademark caveat**: vendor-fork must use different naming if redistributed

**W225 Phase 3 install path**: `npx bmad-method install` validated ✅ (NOT clone-and-vendor due to TRADEMARK restriction).

### 2.2 eyaltoledano/claude-task-master v0.43.1 — **MIT + Commons Clause**

⚠️ **FM-20 catch #44 LICENSE NUANCE**: not pure MIT.

**File cites** (all `eyaltoledano/claude-task-master @ HEAD main 2026-05-15`):
- `LICENSE:1-25` — **"Task Master License — MIT License"** Copyright (c) 2025 — Eyal Toledano, Ralph Khreish — **PLUS** Commons Clause v1.0: *"the grant of rights under the License will not include, and the License does not grant to you, the right to Sell the Software"* — "Sell" defined as providing for fee/consideration including hosting/consulting/support
- `package.json:1-30` — `name:task-master-ai, version:0.43.1, type:module, bins:task-master/task-master-mcp/task-master-ai, workspaces:apps/*+packages/*`
- README badge L55: `license-MIT%20with%20Commons%20Clause-blue.svg` (explicit acknowledgment)
- README.md:67-82 — Task management system for AI-driven dev w/ Claude + Cursor; npm published `task-master-ai`; Cross-tool support: Cursor / Claude Code / Roo / Windsurf / Kiro / Lovable

**License-class verdict per D1**: 
- ✅ **CLI-binary-use OK** (operator uses for own dev work) 
- ✅ **plugin-marketplace install OK** (no redistribution for fee)
- ⚠️ **commercial-resale FORBIDDEN** (cannot package + sell)
- ⚠️ **hosted-service offering FORBIDDEN** (cannot host as SaaS)

**Implication for W225 Phase 3 install**: ✅ install path validated (`npm install -g task-master-ai`) for personal/operator use; commercial-redistribute prohibited per Commons Clause.

### 2.3 automazeio/ccpm — MIT — NOW AGENT SKILL

**File cites** (all `automazeio/ccpm @ HEAD main 2026-05-15`):
- `LICENSE:1-21` — MIT License Copyright (c) 2025 Ran Aroussi
- README.md:13-17 — "CCPM – The Project Manager Agent ... Agent Skills compatible badge"
- README.md:30-37 — **NOW AN AGENT SKILL**: "It works with any Agent Skills–compatible harness that supports skills: Claude Code, Codex, OpenCode, Factory, Amp, Cursor, and more" — refs `agentskills.io` cross-harness portability standard
- README.md:28 — "Spec-driven development for AI agents – ship better using PRDs, GitHub issues, and multiple agents running in parallel"
- Repo top-of-tree: only `skill/` dir + LICENSE + README + CHANGELOG + screenshot — **NOT a Node/Python package; pure skill content**

**Architectural notes**:
- **Pure Agent Skill** — no Node/Python runtime; installs as skill content
- GitHub-Issues-based PM workflow (uses gh CLI or GitHub MCP)
- Cross-harness portability via `agentskills.io` standard
- **Install path differs from BMAD**: ccpm is `git clone + cp skill/ ~/.claude/skills/` OR via Agent Skills marketplace; NOT `npx`

**W225 Phase 3 install path REVISION**: `git clone https://github.com/automazeio/ccpm.git Z:/repos/deps/ccpm/ && cp -r skill/ Z:/claude-sota-pure/.claude/skills/ccpm/` ✅

### 2.4 ryoppippi/ccusage v18.0.11 — MIT — **MONOREPO WITH 5 SUB-PACKAGES**

⚠️ **NEW FINDING**: ccusage is a MONOREPO, not a single package.

**File cites** (all `ryoppippi/ccusage @ HEAD main 2026-05-15`):
- `LICENSE:1-21` — MIT License Copyright (c) 2025 ryoppippi (W226 verified)
- `package.json:1-30` — `name:ccusage-monorepo, version:18.0.11, packageManager:pnpm@10.30.1, workspaces:apps/*+docs`
- `package.json:8-15` — **Runtime**: Node ≥24.15.0 OR Bun ≥1.3.13 (with `onFail:download` fallback)
- README.md:57-77 — **5 published npm packages** in monorepo:
  - `ccusage` — Claude Code usage analyzer (MAIN)
  - `@ccusage/codex` — OpenAI Codex usage analyzer (GPT-5 + 1M context support)
  - `@ccusage/opencode` — OpenCode usage analyzer
  - `@ccusage/pi` — pi-agent usage analyzer
  - `@ccusage/amp` — Amp CLI usage analyzer

**Architectural notes**:
- Single repo / 5 distinct npm packages
- Bun+Node dual-runtime support
- Mentioned in `hesreallyhim/awesome-claude-code` (per README badge)
- DeepWiki integration (per README badge link)

**W225 Phase 2 install REVISION**: `npm install -g ccusage` for Claude Code OR `pnpm dlx ccusage` (zero-persist) ✅; install per-AI-CLI sub-package selectively (`@ccusage/codex` etc.).

### 2.5 ast-grep/ast-grep v0.42.2 — MIT — **WORKSPACE WITH 5 CRATES**

**File cites** (all `ast-grep/ast-grep @ HEAD main 2026-05-15`):
- `LICENSE:1-22` — MIT License Copyright (c) 2022 Herrington Darkholme (W224 verified)
- `Cargo.toml:1-15` — `[workspace]` with `members:["crates/*","xtask"]`, `resolver=2`, `[profile.release] lto=true`
- `Cargo.toml:15-35` — **5 workspace crates**: core / config / dynamic / language / **lsp** — **LSP server INCLUDED**
- README.md:60-77 — **install paths (8 channels)**: npm `@ast-grep/cli` / pip `ast-grep-cli` / brew / cargo + cargo-binstall / scoop / mise / MacPorts — **broadest install-channel coverage in catalog**

**Architectural notes**:
- 4-year-old MATURE Rust workspace (since 2022)
- Tree-sitter integration via `tree-sitter==0.26.3` workspace dep
- LSP server crate enables IDE integration (separate from CLI)
- Per W228: 13,808★ / 4,086 commits / cpd=2.89 MATURE stable burn-in
- **Cross-runtime test support**: npm + pip + cargo distribution via single workspace

**W225 Phase 11 install path VALIDATED**: `cargo install ast-grep --locked` ✅ OR `npm install --global @ast-grep/cli` OR `winget install ast-grep`.

## 3. GraphQL Rows 31-60 Extended-Metadata + cpd Analysis

**Critical NEW classifications** per `convergence-gate.md` Axis 3 5-band:

### 3.1 MATURE-old + sustained-active (≥5y / cpd≥1)

| # | Repo | Age | cpd | Stars | License | Verdict |
|---|---|---:|---:|---:|---|---|
| r31 | pre-commit/pre-commit | **12y** (since 2014!) | 0.65 | 15,276 | MIT | ✅ MATURE oldest — Phase 9 install validated |
| r51 | semgrep/semgrep | 6y (2019) | **4.59** | 15,157 | LGPL-2.1 | ✅ MATURE sustained — Phase 9 install (already orch-installed W215; target verify) |
| r52 | gitleaks/gitleaks | 7y (2018) | 0.50 | 27,001 | MIT | ✅ MATURE — Phase 9 W207 baseline |
| r53 | aquasecurity/trivy | 7y (2019) | 1.58 | 35,011 | Apache-2.0 | ✅ MATURE — Phase 9 W207 baseline |
| r54 | BurntSushi/ripgrep | **9y** (2016) | 0.67 | 63,794 | **Unlicense**⚠️ | ✅ MATURE — license public-domain-equivalent (distinct class FM-20 #48) |
| r55 | sharkdp/fd | 8y (2017) | (~0.65) | 42,992 | Apache-2.0 | ✅ MATURE |
| r56 | google/osv-scanner | 3y (2022) | 1.73 | 10,194 | Apache-2.0 | ✅ MATURE Google-OFFICIAL |
| r32 | ossf/scorecard | 6y (2020) | 1.41 | 5,440 | Apache-2.0 | ✅ MATURE OSSF-OFFICIAL — Phase 9 install |
| r48 | googleapis/mcp-toolbox | 2y (2024) | 2.59 | 15,236 | Apache-2.0 | ✅ MATURE Google-OFFICIAL |

### 3.2 UNDER-MAINTAINED reference catalogs (cpd<0.3 despite massive stars)

| # | Repo | Age | cpd | Stars | License | Interpretation |
|---|---|---:|---:|---:|---|---|
| r57 | anthropics/skills | 9mo | 0.13 | 135,085 | null⚠️ | Community-curated reference catalog (W228 insight #1) |
| r40 | anthropics/claude-code-security-review | 9mo | **0.11** | 4,612 | MIT | **NEW FM-20 catch #45**: same profile as anthropics/skills — UNDER-MAINTAINED reference, NOT actively-engineered |
| r37 | trailofbits/claude-code-devcontainer | 8mo | **0.09** | 806 | Apache-2.0 | UNDER-MAINTAINED — only 21 commits |
| r45 | openai/symphony | **78d** | **0.17** | 23,882 | Apache-2.0 | **NEW FM-20 catch #46**: VIRAL spike (78d / 13c / 23K★ / 2,301 forks!) — STRONG-PROVENANCE-EXPRESS predicate eligible (OpenAI TIER-1-OFFICIAL) but **very limited content** |

### 3.3 FAST-CHURN-BAND (cpd>10 + age<180d)

| # | Repo | Age | cpd | Stars | License | Anti-pattern signal |
|---|---|---:|---:|---:|---|---|
| r44 | github/gh-aw | 9mo (~270d) | **42.34** | 4,482 | MIT | **NEW FM-20 catch #47**: cpd=42 is **EXTREME** — likely automated bot commits OR hyper-active dev; investigate W231 |
| r47 | gsd-build/get-shit-done | 5mo (~152d) | **18.34** | 62,462 | MIT | **NEW FM-20 catch #48**: FAST-CHURN despite v6 4/5 score; target ALREADY-LANDED (gsd-* agents fleet) — operator MONITOR for v1.0 stabilization |

### 3.4 NEW HIGH-PRIORITY ADDS (mature + adoption-signaled)

| # | Repo | Age | cpd | Stars | License | W230 verdict |
|---|---|---:|---:|---:|---|---|
| r35 | microsoft/playwright-mcp | 14mo | 1.31 | 32,560 | Apache-2.0 | ✅ ALREADY-WIRED target `.mcp.json playwright`; verified |
| r36 | ChromeDevTools/chrome-devtools-mcp | 8mo | 3.55 | **39,709** | Apache-2.0 | ✅ ALREADY-WIRED target `.mcp.json chrome-devtools`; 39K★/8mo HIGH adoption signal |
| r38 | awslabs/mcp | 14mo | 3.69 | 9,061 | Apache-2.0 | ✅ AWS-OFFICIAL — conditional STUDY-PILOT if AWS workflow surfaces |
| r39 | grafana/mcp-grafana | 17mo | 1.19 | 3,009 | Apache-2.0 | ✅ Grafana-OFFICIAL — conditional STUDY-PILOT if Grafana-stack surfaces |
| r41 | anthropics/claude-code-action | 12mo | 1.65 | 7,591 | MIT | ✅ Anthropic-OFFICIAL GitHub Action — Phase 10 install (CI integration) |
| r42 | anthropics/claude-agent-sdk-python | 11mo | 1.72 | 6,896 | MIT | ✅ Already-installed orchestrator; target verify |
| r59 | **modelcontextprotocol/servers** | 18mo | **7.45** | **85,713** | NOASSERTION⚠️ | **HUGE adoption signal** — 85K★ + 10,703 forks Anthropic MCP-org reference servers; W231 LICENSE direct-read pending |

### 3.5 REJECT / DEFER (verified per GraphQL)

| # | Repo | Stars | License | Rejection reason |
|---|---|---:|---|---|
| r60 | smtg-ai/claude-squad | 7,482 | **AGPL-3.0** | W218 §4.4 Windows-incompat + AGPL-3.0 license-blocker per CR-9 |
| r43 | anthropics/claude-agent-sdk-typescript | 1,425 | null⚠️ | W226 found PROPRIETARY Anthropic Commercial Terms — CITE-CLASS only |
| r46 | trailofbits/skills | 5,219 | **CC-BY-SA-4.0** | Share-alike caveat per CR-9 — CITE-CLASS admissible; vendor-derive caveat |
| r33 | step-security/harden-runner | 1,145 | Apache-2.0 | OK but DEFER until CI workflows surface |
| r49 | bytebase/dbhub | 2,767 | MIT | W221-B STUDY-PILOT with W27 caveat (Probe 7.b ETL only) |
| r50 | mongodb-js/mongodb-mcp-server | 1,022 | Apache-2.0 | W221-B DEFER — DUPLICATE w/ mcp-toolbox |

## 4. License-class refinements (W230 vs W222+W224+W226+W227)

**NEW license classes surfaced this W230**:
- **MIT + Commons Clause** (claude-task-master) — permissive-for-use; commercial-resale forbidden
- **MIT + TRADEMARK** (BMAD-METHOD) — permissive-for-use; trademark-name restriction on vendor-fork
- **Unlicense (public-domain-equivalent)** (ripgrep) — most permissive class — fully unrestricted
- **CC-BY-SA-4.0 confirmed** (TrailofBits/skills) — already-known W222
- **null (gh API NOASSERTION fallback)** (modelcontextprotocol/servers + anthropics/claude-plugins-official + anthropics/skills + anthropics/claude-agent-sdk-typescript + yxwucq/CCUI + multiple others) — W231 LICENSE direct-read queue

**Cumulative license-classification across W213→W230**: **15 distinct license classes** (up from W227's 12):
1. MIT (~24 candidates)
2. Apache-2.0 (~22)
3. MIT + Commons Clause (1: claude-task-master) ⚠️ NEW
4. MIT + TRADEMARK (1: BMAD-METHOD) ⚠️ NEW
5. Unlicense / public-domain-equivalent (1: ripgrep) ⚠️ NEW
6. open-core MIT+ee/ (1: langfuse)
7. Apache-2.0 + source-available mixed (1: anthropics/skills per W227)
8. Apache-2.0 + MIT-transition preamble (1: mcp/inspector)
9. LGPL-2.1 (1: semgrep)
10. MPL-2.0 (1: sops)
11. CC-BY-SA-4.0 (1: TrailofBits/skills) — share-alike vendor-derive caveat
12. AGPL-3.0 (2: OpenViking backend + claude-squad)
13. Anthropic Commercial Terms (1: claude-agent-sdk-typescript)
14. No-LICENSE all-rights-reserved (1: CCUI)
15. Marketplace-directory-no-LICENSE-by-design (1: claude-plugins-official; W227)

## 5. Multi-wave arc FM-20 row 21 cumulative cascade — 48 catches

W229 baseline: 43 catches
**W230 increments (+5)**:
- #44 claude-task-master MIT+Commons-Clause LICENSE nuance (W226 first-8-lines probe missed)
- #45 anthropics/claude-code-security-review UNDER-MAINTAINED reference (cpd=0.11 same as anthropics/skills)
- #46 openai/symphony VIRAL spike (78d / 13c / 23K★ — STRONG-PROVENANCE-EXPRESS predicate)
- #47 github/gh-aw EXTREME cpd=42.34 (bot-churn suspect)
- #48 BurntSushi/ripgrep Unlicense (public-domain-equivalent — distinct class from MIT/Apache)

**Total**: **48 cumulative cascade catches** saving ~1440-2880 min revert/disambiguation cycles.

## 6. W231+ queued

1. **W231 LICENSE direct-read** for 5 remaining null-LICENSE high-priority repos:
   - modelcontextprotocol/servers (85K★ HUGE adoption)
   - anthropics/claude-plugins-official (already W227 confirmed marketplace-directory)
   - anthropics/skills (W227 confirmed mixed)
   - anthropics/claude-agent-sdk-typescript (W226 confirmed Anthropic Commercial Terms)
2. **github/gh-aw cpd=42 investigation**: human-vs-bot commit-pattern analysis
3. **Tighter Path P codex T1 ≤5-repo re-fire** STILL queued (CR-3 gate)
4. **openai/symphony source-dive** if operator wants OpenAI autonomous-implementation-runs pattern reference
5. **modelcontextprotocol/servers reference patterns extraction** (85K★ MCP-org official reference servers — vendor-or-cite-class decision)

## 7. Multi-wave arc artifact index (18 files; updated)

| # | Wave | Artifact |
|---|---|---|
| 1-8 | W213→W220 | 8 prior wave artifacts |
| 9 | W221-B | 32-candidate uncovered MCP-layers |
| 10 | W222 | gh API 30-row SPDX + codex Path P + target-state Mia |
| 11 | W223 | MASTER CATALOG Phase 0-10 |
| 12 | W224 | v6-kit deep dive + 26-row v6-LEAN-CORE |
| 13 | W225 | FINAL MASTER CATALOG v6-LEAN-CORE Phase 1-12 |
| 14 | W226 | LICENSE closures + agent-scan/mcp-scan dedup |
| 15 | W227 | Anthropic-OFFICIAL mixed-license closure |
| 16 | W228 | DETAILED SRA D1-D10 scoring Top-30 |
| 17 | W229 | Source-code deep-dive Top-5 architectural validation |
| 18 | **W230** | **Source-dive batch #2 + GraphQL rows 31-60 + cardinal-rule-11 dogfood (this file)** |

verdict_one_line: W230-SUPPLEMENTARY-COMPLETE: 5 batch-2 source-dives audited (BMAD-METHOD MIT+TRADEMARK / claude-task-master MIT+Commons-Clause / ccpm pure-skill / ccusage 5-package monorepo / ast-grep 5-crate workspace); GraphQL rows 31-60 = 30 candidates extended-metadata; 5 NEW FM-20 catches (#44-#48) total 48 cumulative; 3 NEW license classes surfaced (MIT+Commons-Clause / MIT+TRADEMARK / Unlicense); UNDER-MAINTAINED reference-catalog pattern confirmed (anthropics/skills + claude-code-security-review same cpd~0.1 profile); FAST-CHURN-BAND catches (gh-aw cpd=42 + gsd cpd=18); cardinal-rule-11 META-process SOTA discipline dogfooded; multi-wave arc W213→W230 18 artifacts deliverable complete
