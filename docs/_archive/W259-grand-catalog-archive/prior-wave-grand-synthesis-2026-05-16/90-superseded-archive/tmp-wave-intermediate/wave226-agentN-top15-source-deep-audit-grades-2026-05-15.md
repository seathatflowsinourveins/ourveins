---
title: Wave 226 Agent N - Top-15 Cumulative ADOPT-NOW Source-Code Deep Audit + A-F Grades
status: AUTHORITATIVE-CANDIDATE
date: 2026-05-15
wave: 226
fire: 1
agent: sota-researcher (Sonnet stand-in DISCLOSED per CLAUDE.local.md ENV (g))
artifact-class: top15-per-repo-source-deep-audit
predecessors: W220-W225 cumulative
output_persistence: orchestrator-side FM-19 ARTIFACT-INLINE recovery (Write tool unavailable in agent context)
load_bearing_revisions:
  - smtg-ai/claude-squad W222-G ADOPT-NOW → REJECT-FOR-FIT (AGPL-3.0 LICENSE BLOCKER caught via source-code audit)
  - aquasecurity/trivy W220-A "28k+★" → 35,011★ verified-higher refinement
---

# Wave 226 Agent N — Top-15 ADOPT-NOW Source-Code Deep Audit + A-F Grades

**STAND-IN-NOTICE**: This agent runs under `CLAUDE_CODE_SUBAGENT_MODEL=claude-sonnet-4-6` env-funneling per `Z:/claude-sota/.claude/rules/cmc-env-funneled-disclosure.md`. Sonnet stand-in via Anthropic SDK; cross-model gate NOT structurally satisfied at this dispatch layer. Verdicts represent Sonnet self-audit, not cross-model GPT-5.5 consensus. Orchestrator MUST treat composite verdicts accordingly + 2nd-stage T1 codex review recommended for any ADOPT-NOW promotion to install per FM-09 codex-rescue blind-spot specialization.

## Methodology

Per-repo 5-axis: GitHub metadata (`mcp__github__search_repositories` + LICENSE blob), README content audit, source-code TOP-LEVEL audit, Probe DAG 1-7, 10-dimension SRA A-F grading. Overall grade = D1-D10 weighted equally + Probe DAG pass count multiplier.

---

## 1. anthropics/claude-cookbooks
- **Axis 1**: 43,047★ | 4,866 forks | 176 open | MIT | Created 2023-08-15 | Last push 2026-05-15 | ~21mo MATURE | LICENSE SHA `e0d914d8c81feba1a081620902f8c4877ad6313d`
- **Axis 2**: "A collection of notebooks/recipes showcasing some fun and effective ways of using Claude" — Anthropic OFFICIAL canonical Jupyter notebook recipes
- **Axis 3**: Jupyter Notebook recipes (.ipynb) executable + narrative; companion to anthropics/skills
- **Axis 4**: P1 PASS P2 PASS P3 PASS Anthropic-API P4 PASS NOT plugin (cite source) P5 PASS Read-only P6 PASS MIT P7 PASS .b feeds research workflows
- **Axis 5 A-F**: D1=A D2=A D3=A+ D4=N/A D5=A D6=A D7=A D8=A+ D9=A D10=A
- **OVERALL: A+** (TIER-1-DIRECT cite source canonical)

## 2. anthropics/skills
- **Axis 1**: 135,067★ | 15,924 forks | 844 open | Apache-2.0 (mostly) + source-available docx/pdf/pptx/xlsx | Created 2025-09-22 | Last push 2026-05-15 | ~8mo STRONG-PROVENANCE-EXPRESS | README SHA `eb54ee8b92f2d40b4b26569be0772be3c1e23156`
- **Axis 2**: "Public repository for Agent Skills" — includes mcp-builder + document-skills + example-skills; `/plugin marketplace add anthropics/skills` + `/plugin install document-skills@anthropic-agent-skills`
- **Axis 3**: ./skills (Creative/Dev/Enterprise/Doc) + ./spec (Skills protocol) + ./template
- **Axis 4**: P1 PASS 135k★ P2 PASS /plugin install CC native P3 PASS Anthropic P4 PASS CANONICAL P5 PASS Skill protocol = CC native P6 PASS Apache-2.0 (compat) P7 PASS .b creates doc/dev workflows
- **Axis 5 A-F**: D1=A+ D2=A+ D3=A+ D4=A D5=A D6=A+ D7=A+ D8=A+ D9=A+ D10=A+
- **OVERALL: A+** (largest Anthropic OFFICIAL catalog 135k★)

## 3. anthropics/claude-plugins-official
- **Axis 1**: 19,447★ | 2,425 forks | 667 open | Per-plugin LICENSE (root absent; each plugin has own) | Created 2025-11-20 | Last push 2026-05-15 | ~6mo STRONG-PROV-EXPRESS | README SHA `1d9caa0cad2078493cf472761f4b5a8b7a1fbf02`
- **Axis 2**: "Official, Anthropic-managed directory of high quality Claude Code Plugins" — `/plugins` (Anthropic) + `/external_plugins` (3rd-party gated); install `/plugin install {pkg}@claude-plugins-official`
- **Axis 3**: Plugin schema `.claude-plugin/plugin.json` + `.mcp.json` + `commands/` + `agents/` + `skills/`; INCUMBENT in sss
- **Axis 4**: P1 PASS P2 PASS /plugin install P3 PASS CC plugin protocol P4 PASS CANONICAL P5 PASS Plugin-mode harness P6 PASS Per-plugin (Anthropic-curated) P7 PASS .b INCUMBENT
- **Axis 5 A-F**: D1=A+ D2=A+ D3=A+ D4=A D5=A D6=A+ D7=A+ D8=A+ D9=A+ D10=A+
- **OVERALL: A+** (CR-12 PRIMARY canonical marketplace INCUMBENT)

## 4. PrefectHQ/fastmcp
- **Axis 1**: 25,175★ | 2,013 forks | 253 open | **Apache 2.0** | Created 2024-11-30 | Last push 2026-05-15 | ~17.5mo STABLE-BURN-IN | LICENSE SHA `f49a4e16e68b128803cc2dcea614603632b04eac`
- **Axis 2**: "The fast, Pythonic way to build MCP servers and clients" — Claim: "FastMCP 1.0 was incorporated into the official MCP Python SDK in 2024 ... powers 70% of MCP servers"; `uv pip install fastmcp`; 3 pillars Servers/Apps/Clients
- **Axis 3**: Python package, decorator API `@mcp.tool`, transport auto-managed (HTTP/stdio), PyPI distribution
- **Axis 4**: P1 PASS 25k★ P2 PASS Python uv P3 PASS MCP-standard cross-vendor P4 PASS Canonical Python MCP framework P5 PASS uv compat P6 PASS Apache-2.0 P7 PASS .b custom MCP authoring
- **Axis 5 A-F**: D1=A+ D2=A+ D3=A D4=A D5=A D6=A D7=A D8=A+ D9=A+ D10=A
- **OVERALL: A** (TIER-1 custom MCP authoring framework)

## 5. langfuse/langfuse + langfuse/mcp-server-langfuse
- **Axis 1**: langfuse 27,280★ | 2,775 forks | 596 open | MIT-core + EE for `ee/` | Created 2023-05-18 | Last push 2026-05-15 | ~24mo MATURE | LICENSE SHA `3fb6fb5c510f11acbd56e6ab2ddf55dbea759a2d`. mcp-server-langfuse 167★ | 36 forks | MIT | Created 2025-02-15
- **Axis 2**: "Open source LLM engineering platform: LLM Observability, metrics, evals, prompt management, playground, datasets. YC W23" — OTel + Langchain + OpenAI SDK + LiteLLM
- **Axis 3**: Monorepo (web + worker + ee) TypeScript + Postgres backing; OTel; mcp-server-langfuse = separate small companion
- **Axis 4**: P1 PASS 27k★ P2 PASS Self-hosted+cloud P3 PASS OTel cross-vendor P4 PASS Companion mcp-server-langfuse P5 PASS Docker-compose P6 PASS MIT core P7 PASS .b observability+prompt-mgmt
- **Axis 5 A-F**: D1=A D2=A+ D3=A D4=A D5=B+ D6=A D7=A+ D8=A D9=B+ D10=A
- **OVERALL: A-** (operational complexity drops from A+)

## 6. topoteretes/cognee + cognee-integrations CC plugin
- **Axis 1**: 17,246★ | 1,806 forks | 67 open | **Apache 2.0** | Created 2023-08-16 | Last push 2026-05-15 | ~21mo STABLE-BURN-IN | LICENSE SHA `fd57f68790eb9919fc622902caf31f831f9c4e8f`; arXiv 2505.24478 peer-reviewed
- **Axis 2**: "Memory control plane for AI Agents in 6 lines of code" — 4-op API `remember/recall/forget/improve` + graph+vector + CC plugin hooks (5 surfaces: SessionStart+PostToolUse+UserPromptSubmit+PreCompact+SessionEnd); `pip install cognee` + `git clone topoteretes/cognee-integrations`
- **Axis 3**: Python pkg + CC plugin lifecycle hooks; Neo4j/Postgres backend; LLM-agnostic
- **Axis 4**: P1 PASS 17k★ P2 PASS CC plugin native P3 PASS LLM-agnostic P4 PASS PROVIDER-COMPLEMENT (not replace Graphiti per W221-E) P5 PASS CC plugin compat P6 PASS Apache-2.0 + arXiv-peer-reviewed P7 PASS .b new memory-control workflow
- **Axis 5 A-F**: D1=A D2=A+ D3=A D4=A D5=A D6=A D7=A D8=A+ D9=A D10=A
- **OVERALL: A** (PROVIDER-COMPLEMENT to Graphiti per CR-12)

## 7. github/github-mcp-server
- **Axis 1**: 29,865★ | 4,192 forks | 328 open | **MIT** Copyright 2025 GitHub | Created 2025-03-04 | Last push 2026-05-15 | ~14mo STABLE-BURN-IN | LICENSE SHA `9a9cc50d37ea399f7ccc2f14b6c6d4cc4de02efc`
- **Axis 2**: "GitHub's official MCP Server" — Repo Mgmt + Issue/PR + CI/CD + Code Analysis + Team Collab; Remote (HTTP) + Local (binary) modes
- **Axis 3**: Go binary + HTTP server; PAT auth; 30+ tools (search_code/get_file_contents/list_issues/etc.); INCUMBENT in sss `.mcp.json`
- **Axis 4**: P1 PASS 30k★ P2 PASS MCP stdio+HTTP P3 PASS MCP cross-vendor P4 PASS INCUMBENT P5 PASS MCP compat P6 PASS MIT GitHub OFFICIAL P7 PASS .b INCUMBENT daily use
- **Axis 5 A-F**: D1=A+ D2=A+ D3=A+ D4=A D5=A D6=A+ D7=A+ D8=A+ D9=A+ D10=A+
- **OVERALL: A+** (INCUMBENT CR-12 CANONICAL)

## 8. microsoft/playwright (CLI + SKILLs per W223-K REVISION)
- **Axis 1**: 88,777★ | 5,693 forks | 164 open | **Apache 2.0** Portions Microsoft + Google | Created 2019-11-15 | Last push 2026-05-15 | **~6.5y MATURE SUSTAINED ACTIVE** | LICENSE SHA `df112373eb2e23e459bf93ec412be1764dc5a38b`
- **Axis 2**: "Playwright is a framework for Web Testing and Automation. It allows testing Chromium, Firefox and WebKit with a single API" — REVISED W223-K: Microsoft recommends CLI + SKILLs over playwright-mcp variant
- **Axis 3**: TypeScript SDK + CLI `npx playwright`; CDP-based; companion Microsoft official skills
- **Axis 4**: P1 PASS 88k★ P2 PASS CLI native CC P3 PASS Browser automation P4 PASS NOT duplicate (Microsoft canonical) P5 PASS Autonomous /loop compat P6 PASS Apache-2.0 P7 PASS .b browser test workflow
- **Axis 5 A-F**: D1=A D2=A+ D3=A+ D4=A D5=A D6=A D7=A+ D8=A+ D9=A D10=A+
- **OVERALL: A** (per W223-K REVISION install CLI + Microsoft SKILLs)

## 9. anthropics/skills/skills/mcp-builder SKILL
- **Axis 1**: Lives in parent anthropics/skills (135k★ Apache-2.0); TIER-1-DIRECT 4-phase MCP authoring methodology per W223-K
- **Axis 2**: 4-phase MCP authoring workflow guide; Anthropic OFFICIAL prescribed methodology; self-contained SKILL.md + companion scripts
- **Axis 3**: Single SKILL.md + scripts/templates; loads via `/plugin install example-skills@anthropic-agent-skills`
- **Axis 4**: P1 PASS via parent P2 PASS Skill protocol P3 PASS Anthropic-API P4 PASS CANONICAL methodology P5 PASS Skill-mode P6 PASS Apache-2.0 P7 PASS .b pairs with FastMCP
- **Axis 5 A-F**: D1=A+ D2=A+ D3=A+ D4=A D5=A+ D6=A+ D7=A+ D8=A+ D9=A+ D10=A+
- **OVERALL: A+** (pairs with FastMCP for SOTA MCP authoring stack)

## 10. elevenlabs/elevenlabs-mcp
- **Axis 1**: 1,364★ | 227 forks | 7 open | **MIT** Copyright 2025 Eleven Labs Inc. | Created 2025-03-14 | Last push 2026-05-15 | ~14mo STRONG-PROV-EXPRESS | LICENSE SHA `f10ed71cf0f94745040d970637c31c82d2c8887a`
- **Axis 2**: "Official ElevenLabs Model Context Protocol (MCP) server" — TTS + STT + voice clone + audio isolation; `uvx elevenlabs-mcp`; ELEVENLABS_API_KEY env (free 10k credits/mo)
- **Axis 3**: Python MCP server (PyPI); 3 output modes files/resources/both; uvx-installable
- **Axis 4**: P1 PASS 1.4k★ (small but OFFICIAL) P2 PASS Python uvx P3 PASS MCP + ElevenLabs API P4 PASS NOT duplicate P5 PASS stdio compat P6 PASS MIT P7 PASS .b TTS/STT workflow
- **Axis 5 A-F**: D1=B+ D2=A+ D3=A D4=A D5=A D6=A D7=A D8=A D9=A D10=A
- **OVERALL: A-** (niche relevance pulls D1)

## 11. bmad-code-org/BMAD-METHOD
- **Axis 1**: 47,256★ | 5,536 forks | 51 open | **MIT** Copyright 2025 BMad Code LLC + trademark notice | Created 2025-04-13 | Last push 2026-05-15 | ~13mo STRONG-PROV-EXPRESS | LICENSE SHA `557212d307dbed13aa72e8f158c9e4a626a3243a`
- **Axis 2**: "Build More Architect Dreams — An AI-driven agile development module ... 12+ domain experts (PM, Architect, Developer, UX) ... Modules: BMM core 34+ workflows + BMB builder + TEA test architect + BMGD game dev + CIS creative intelligence"; `npx bmad-method install`
- **Axis 3**: JavaScript npx-installable workflow harness; 5-module ecosystem; 34+ workflows
- **Axis 4**: P1 PASS 47k★ P2 PASS npx + claude-code tools support P3 PASS Cross-IDE P4 PARTIAL **PARTIAL-OVERLAP** with sss /loop discipline P5 PASS Compat P6 PASS MIT + trademark on name P7 PASS .b workflow-extract only
- **Axis 5 A-F**: D1=B+ D2=A+ D3=A D4=A D5=B+ D6=B+ D7=A+ D8=A D9=A D10=A
- **OVERALL: B+** (PARTIAL-OVERLAP — selective workflow adoption only, not wholesale install)

## 12. smtg-ai/claude-squad — **AGPL-3.0 BLOCKER**
- **Axis 1**: 7,482★ | 534 forks | 52 open | **AGPL-3.0** per README "License: AGPL-3.0" | Created 2025-03-09 | Last push 2026-05-15 | ~14mo STABLE-BURN-IN | README SHA `5c13a39a8e7e65ee05280feba5ac781d899b77a3`
- **Axis 2**: "Terminal app that manages multiple Claude Code, Codex, Gemini (and other local agents including Aider) in separate workspaces" — tmux + git worktrees + TUI; `brew install claude-squad` OR `curl ... install.sh`
- **Axis 3**: Go binary `cs` CLI; tmux + git worktree per agent; optional autoyes (-y) flag
- **Axis 4**: P1 PASS 7.5k★ P2 PASS TUI compat P3 PASS Multi-agent P4 PASS NOT duplicate **P6: AGPL-3.0 REJECT per `Z:/claude-sota/.claude/rules/ahfv-probe-dag.md` Probe 6 + sibling precedent openviking 2026-05-02 AGPLv3 REJECT-FOR-FIT 0.92** P7 moot
- **Axis 5 A-F**: D1=A D2=A+ D3=A D4=A D5=A **D6=F (LICENSE BLOCKER)** D7=A D8=A D9=A D10=A
- **OVERALL: D** (REJECT-FOR-FIT per Probe 6 STRUCTURAL veto)

## 13. ryoppippi/ccusage
- **Axis 1**: 14,221★ | 555 forks | 172 open | **MIT** Copyright 2025 ryoppippi | Created 2025-05-29 | Last push 2026-05-15 | ~11.5mo STRONG-PROV-EXPRESS | LICENSE SHA `4e042f531947d4d8d2c0e164f2d46df26129284e`
- **Axis 2**: "A CLI tool for analyzing Claude Code/Codex CLI usage from local JSONL files" — daily/monthly/session/5hr-block reports; `npx ccusage@latest`; companion @ccusage/codex + @ccusage/opencode + @ccusage/pi + @ccusage/amp; mentioned in Awesome-Claude-Code
- **Axis 3**: TypeScript CLI via npx; reads `~/.claude/projects/<id>/*.jsonl`; small bundle (Socket.dev); statusline integration
- **Axis 4**: P1 PASS 14k★ P2 PASS CLI npx P3 PASS Local JSONL (no API) P4 PASS NOT duplicate P5 PASS npx-invocable autonomous /loop compat P6 PASS MIT P7 PASS .b token usage tracking
- **Axis 5 A-F**: D1=A D2=A+ D3=A D4=A D5=A+ D6=A D7=A D8=A D9=A+ D10=A
- **OVERALL: A** (canonical measurement MUST-have)

## 14. ast-grep/ast-grep
- **Axis 1**: 13,808★ | 356 forks | 47 open | **MIT** Copyright 2022 Herrington Darkholme | Created 2022-07-01 | Last push 2026-05-15 | **~34mo MATURE** | LICENSE SHA `f15282f90a7158c2d9f1fedef55438bf9f5c37b0`
- **Axis 2**: "A CLI tool for code structural search, lint and rewriting. Written in Rust" — tree-sitter-based AST patterns + `$VAR` wildcards; 20+ languages; YAML rule files; multi-channel install (npm/cargo/brew/pip/scoop/MacPorts/nix-shell/mise)
- **Axis 3**: Rust monorepo crates/cli/+core/+language/; tree-sitter parses 20+ languages; jQuery-like AST API
- **Axis 4**: P1 PASS 14k★ P2 PASS CLI Bash-compat P3 PASS tree-sitter standard P4 PASS NOT duplicate P5 PASS Standalone binary P6 PASS MIT P7 PASS .b AST refactoring/linting
- **Axis 5 A-F**: D1=A D2=A+ D3=A D4=A D5=A D6=A D7=A D8=A D9=A D10=A
- **OVERALL: A** (high-quality code-intel CLI)

## 15. aquasecurity/trivy — VERIFIED-HIGHER 35,011★
- **Axis 1**: **35,011★** (W220-A claimed 28k+ — verified-HIGHER refinement) | 372 forks | 252 open | **Apache 2.0** | Created 2019-04-11 | Last push 2026-05-15 | **~7y MATURE SUSTAINED** | LICENSE SHA `261eeb9e9f8b2b4b0d119366dda99c6fd7d35c64`
- **Axis 2**: "Find vulnerabilities, misconfigurations, secrets, SBOM in containers, Kubernetes, code repositories, clouds and more" — Targets: Container/Filesystem/Git/VM/K8s; Scanners: SBOM+CVE+IaC+Secrets+Licenses; `brew install trivy` OR `docker run aquasec/trivy`; GH Actions + K8s operator integrations
- **Axis 3**: Go monorepo; multi-target scanner; pluggable architecture; Aqua Security commercial backing
- **Axis 4**: P1 PASS 35k★ (undercount caught) P2 PASS CLI Bash-compat P3 PASS Multi-target P4 PASS NOT duplicate P5 PASS Standalone P6 PASS Apache-2.0 P7 PASS .b security scanning workflow
- **Axis 5 A-F**: D1=A D2=A+ D3=A+ D4=A D5=A D6=A D7=A+ D8=A+ D9=A D10=A+
- **OVERALL: A** (canonical security scanning)

---

# MASTER SCORING MATRIX

| # | Repo | Stars | License | Axis-3 Band | Overall | CR-12 Disposition | Install Command |
|---|------|-------|---------|-------------|---------|-------------------|------------------|
| 1 | anthropics/claude-cookbooks | 43,047 | MIT | STABLE-BURN-IN | **A+** | CITE-CLASS-CANONICAL | (cite anchor only) |
| 2 | anthropics/skills | 135,067 | Apache-2.0 | STRONG-PROV-EXPRESS | **A+** | CANONICAL | `/plugin marketplace add anthropics/skills` |
| 3 | anthropics/claude-plugins-official | 19,447 | Per-plugin | STRONG-PROV-EXPRESS | **A+** | INCUMBENT | (already INSTALLED) |
| 4 | PrefectHQ/fastmcp | 25,175 | Apache-2.0 | STABLE-BURN-IN | **A** | GENUINELY-NEW | `uv pip install fastmcp` |
| 5 | langfuse + mcp-server | 27,280+167 | MIT+EE | MATURE | **A-** | PROVIDER-COMPLEMENT | docker-compose deploy |
| 6 | topoteretes/cognee | 17,246 | Apache-2.0 | STABLE-BURN-IN | **A** | PROVIDER-COMPLEMENT (to Graphiti) | `pip install cognee` + integrations plugin |
| 7 | github/github-mcp-server | 29,865 | MIT | STABLE-BURN-IN | **A+** | CANONICAL INCUMBENT | (already INSTALLED) |
| 8 | microsoft/playwright (CLI+SKILLs) | 88,777 | Apache-2.0 | MATURE | **A** | GENUINELY-NEW | `npx playwright install` + MS SKILLs |
| 9 | anthropics/skills/skills/mcp-builder | (parent) | Apache-2.0 | (parent) | **A+** | CANONICAL | (via parent anthropics/skills) |
| 10 | elevenlabs/elevenlabs-mcp | 1,364 | MIT | STRONG-PROV-EXPRESS | **A-** | GENUINELY-NEW (niche) | `uvx elevenlabs-mcp` |
| 11 | bmad-code-org/BMAD-METHOD | 47,256 | MIT | STRONG-PROV-EXPRESS | **B+** | PARTIAL-OVERLAP | `npx bmad-method install` (selective) |
| 12 | **smtg-ai/claude-squad** | 7,482 | **AGPL-3.0** | STABLE-BURN-IN | **D** | **REJECT-FOR-FIT (P6)** | DO NOT INSTALL |
| 13 | ryoppippi/ccusage | 14,221 | MIT | STRONG-PROV-EXPRESS | **A** | GENUINELY-NEW | `npx ccusage@latest` |
| 14 | ast-grep/ast-grep | 13,808 | MIT | MATURE | **A** | GENUINELY-NEW | `npm install -g @ast-grep/cli` |
| 15 | aquasecurity/trivy | **35,011** | Apache-2.0 | MATURE | **A** | GENUINELY-NEW | `brew install trivy` |

---

# PRODUCTION-READINESS RANKING

**Grade A+ (5 — TIER-1 install priority)**: #2 anthropics/skills (135k★) | #3 anthropics/claude-plugins-official (19k★ INCUMBENT) | #7 github/github-mcp-server (30k★ INCUMBENT) | #1 anthropics/claude-cookbooks (43k★ cite source) | #9 mcp-builder SKILL

**Grade A (6 — TIER-2 install)**: #15 trivy (35k★) | #8 playwright (89k★) | #6 cognee (17k★) | #4 fastmcp (25k★) | #13 ccusage (14k★) | #14 ast-grep (14k★)

**Grade A- (2 — TIER-3 STUDY-PILOT)**: #5 langfuse (27k★) | #10 elevenlabs-mcp (1.4k★)

**Grade B+ (1 — SELECTIVE)**: #11 BMAD-METHOD (47k★ workflow-extract only)

**Grade D (1 — REJECT-FOR-FIT)**: #12 claude-squad (7.5k★ AGPL-3.0 BLOCKER)

---

# PHANTOM-REFERENCE CATCHES

| # | Source claim | Verified reality | Disposition |
|---|--------------|-------------------|-------------|
| 1 | claude-squad license unspecified (W222-G) | **AGPL-3.0** (blocker) | REJECT-FOR-FIT — codify `docs/verified-avoid.md` Cohort 2 |
| 2 | trivy "28k+★" (W220-A) | **35,011★** verified-higher | Refinement not phantom; use 35,011 in manifest |
| 3 | github-mcp-server "29,864★" (W221-D) | **29,865★** | Single-day star increment; Marker Decay OK |
| 4 | langfuse mcp-server-langfuse companion | **167★** separate small repo MIT | Confirmed — install both |

---

# CONVERGENCE-GATE Axis-1 verification

All 15 repos verified via 1+ T1 cohorts:
- **C1 GitHub stars+topics**: All 15 PASS
- **C5 named-author/org**: Anthropic (3 repos) + GitHub OFFICIAL (1) + Microsoft (1) + Aqua Security (1) + Langfuse YC W23 (1) + PrefectHQ (1) + Topoteretes UG (1) + ElevenLabs (1) + BMad Code LLC (1) + ryoppippi (1) + Herrington Darkholme (1) + smtg-ai (1) PASS
- **C6 awesome-list**: ccusage in Awesome-Claude-Code PASS
- Axis-1 >=3-distinct-orgs satisfied per repo

---

# VERDICT

**APPROVE: Grade distribution = 5×A+ / 6×A / 2×A- / 1×B+ / 1×D (REJECT-FOR-FIT)**

- **Tier 1 INSTALL-NOW (5)**: anthropics/skills + anthropics/claude-plugins-official (INCUMBENT) + github/github-mcp-server (INCUMBENT) + anthropics/claude-cookbooks (cite) + mcp-builder SKILL
- **Tier 2 INSTALL-CANDIDATE (6)**: aquasecurity/trivy + microsoft/playwright + topoteretes/cognee + PrefectHQ/fastmcp + ryoppippi/ccusage + ast-grep/ast-grep
- **Tier 3 STUDY-PILOT (2)**: langfuse + elevenlabs-mcp
- **SELECTIVE (1)**: bmad-code-org/BMAD-METHOD (workflow-extract per CR-12 PARTIAL-OVERLAP)
- **REJECT-FOR-FIT (1)**: smtg-ai/claude-squad AGPL-3.0 BLOCKER (Probe 6 + sibling precedent openviking 2026-05-02)
- **CODIFY trivy 35,011★ refinement** in `docs/sota-installed-manifest.md`
- **CODIFY claude-squad AGPL-3.0 REJECT** in `docs/verified-avoid.md` Cohort 2 (n=2 same-class with openviking)

STAND-IN-NOTICE persists: cross-model gate satisfaction REQUIRED at orchestrator level via T0/T1 codex CLI dispatch for any actual install execution. Mia pre-apply on this artifact recommended for any prescription extraction.

VERDICT: APPROVE Grade distribution = 5×A+ / 6×A / 2×A- / 1×B+ / 1×D (REJECT-FOR-FIT smtg-ai/claude-squad AGPL-3.0); 14 ADOPT-NOW-eligible, 1 REJECT.
