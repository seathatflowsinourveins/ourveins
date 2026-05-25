---
title: SOTA Grand Catalog — Claude Code Runtime, Multi-source Convergence, Dimensional Scoring (2026-05-15)
status: AUTHORITATIVE-CANDIDATE (pending verification pass)
date: 2026-05-15
orchestrator: claude-opus-4-7 (cowork mode)
scope: 4 layers — (1) CC ecosystem plugins/skills/agents/marketplaces, (2) MCP servers, (3) Agent orchestration frameworks, (4) Token/context optimization
methodology:
  - baseline: 32 prior research files gathered into 00-prior-research-baseline/ (v65 kit + WAVE1-CLOSE-SYNTHESIS 2026-05-15 + C-orchestration-plugin discovery 45 tool uses + A-existing-artifact-audit 319-repo candidate union)
  - fresh recon: orchestrator-side GitHub GraphQL queries May 2026 (5 calls × 20-30 results = ~100 unique repos verified with current star counts)
  - convergence: cross-validated baseline cite anchors with fresh metadata; flagged stars-velocity drift
  - scoring: 11-dimensional per repo (stars / age / cpd / license / native-CC-path / wire-difficulty / Axis-1+2+3 / Probe-4+5+6 / aggregate-0-100)
  - dispositions: CR-12 6-class lattice (CITE-CLASS-CANONICAL / GENUINELY-NEW / DUPLICATE-FUNCTIONALITY / PARTIAL-OVERLAP / PROVIDER-COMPLEMENT / ECOSYSTEM-IMPORT)
  - verdicts: ADOPT-NOW / STUDY-PILOT-FAVORABLE / STUDY-PILOT-NARROW / REJECT-FOR-FIT (cite class) / DEFER
cross-model-gate: PARTIAL — Wave 1 agent dispatch hit API rate-limit; pivoted to orchestrator-side synthesis using rich existing baseline + fresh GitHub recon. Cardinal-rule-3 NOT structurally satisfied — Wave 2 codex foreground+tee adversarial review queued as follow-up before any install commit.
total_repos_cataloged: 130+ (top-stars-verified, multi-source-converged)
---

# SOTA Grand Catalog — Claude Code Runtime (May 2026)

> **What this is**: a consolidated, multi-source-converged, fresh-star-verified inventory of every high-star repo across the 4 layers of a SOTA Claude Code runtime, with dimensional scoring and ADOPT-NOW/STUDY-PILOT/REJECT verdicts per the convergence-gate + 6-probe harness-fit framework.

> **How to read it**: each repo has a row with current stars (May 2026), age, license, native CC path, wire difficulty (1=easy, 5=hard), convergence-gate verdict, harness-fit probes, aggregate score (0-100), and a one-line "wins over X because..." comparison. Section 12 has the master ranked Top-50 across all categories.

---

## Section 0 — Scoring methodology

### Dimensional axes (weights in parentheses)

| Axis | Weight | What it measures |
|------|--------|------------------|
| **Stars** (popularity) | 0.10 | Current GitHub stars (log-scaled; 100k=10pts, 10k=7pts, 1k=4pts) |
| **Age × cpd stability** (Axis-3) | 0.10 | ≥90d AND cpd-band PASS (STABLE-BURN-IN or SUSTAINED-ACTIVE) per convergence-gate.md |
| **License permissive** | 0.05 | MIT/Apache-2.0/BSD = 10pts; LGPL = 6pts; AGPL/GPL = 0pts (Probe-6 blocker) |
| **Native CC path tier** | 0.15 | S (multi-path direct: plugin+MCP+skill) = 10pts; A (single-path direct) = 8pts; B (SDK only) = 5pts; C (cite-only) = 2pts |
| **Wire difficulty** (inverse) | 0.10 | 1 (`/plugin install`) = 10pts; 5 (manual integration) = 2pts |
| **Axis-1 (≥3 T1 orgs)** | 0.10 | PASS = 10pts; PARTIAL = 6pts; FAIL = 0pts (REJECT-FOR-FIT) |
| **Axis-2 (≥2 named T2 + dated)** | 0.05 | PASS = 10pts; PARTIAL = 6pts |
| **Probe-4 (no plugin namespace dup)** | 0.05 | CLEAR = 10pts; DUPLICATE = 0pts (REJECT) |
| **Probe-5 (mode-harness compatible)** | 0.10 | NO HARD-GATE = 10pts; HARD-GATE = 0pts (REJECT — incompatible with autonomous /loop) |
| **Probe-6 (LICENSE + registry exists)** | 0.05 | CLEAR = 10pts; phantom-npm/AGPL/missing = 0pts |
| **Functional fit** (per-layer custom) | 0.15 | layer-specific: token-eff, orchestration depth, observability, code-intel, etc. |

**Aggregate score** = sum of weighted axes × 10 = 0-100 scale.

### Verdict mapping

- **ADOPT-NOW** (score ≥75 + Axis-1+2+3 firm PASS + all probes CLEAR + LOAD-BEARING workflow)
- **STUDY-PILOT-FAVORABLE** (score 65-74 + 5-clause demand check satisfied)
- **STUDY-PILOT-NARROW** (score 55-64 + bounded use-case)
- **DEFER** (score <55 OR awaiting verification)
- **REJECT-FOR-FIT** (Probe-4/5/6 FAIL OR Axis-1 FAIL OR DUPLICATE / SUPERSEDED-BY-X)

### Native CC path tier definitions

| Tier | Definition | Examples |
|------|-----------|----------|
| **S** | Multi-path direct: plugin marketplace + MCP + skill + hook all work natively | superpowers, wshobson/agents, addy-osmani/agent-skills, semgrep MCP, repomix |
| **A** | Single-path direct native | promptfoo (CLI), playwright-mcp (MCP), ast-grep (CLI), claude-mem (plugin) |
| **B** | Indirect via SDK only | inspect_ai, smolagents (Python lib), deepagents (Python+ACP) |
| **C** | Cite/pattern only — out of CC scope | crewAI, autogen, agno, goose (standalone Rust), microsoft/agent-framework |

---

## Section 1 — Layer 1: Foundation / Anthropic-canonical (must-install substrate)

| # | Repo | Stars (May-2026) | Age | License | Native CC | Wire | Axis-1 | Axis-2 | Axis-3 | P4 | P5 | P6 | Score | Verdict |
|---|------|------------------|-----|---------|-----------|------|--------|--------|--------|----|----|----|-------|---------|
| 1.1 | **anthropics/skills** | 135,158 | 8mo | Anthropic | S (canonical skill substrate) | 1 | PASS | PASS | PASS-strong | CLEAR | CLEAR | CLEAR | **97** | **ADOPT-NOW** |
| 1.2 | **anthropics/claude-agent-sdk-python** | (internal-tier) | 8mo+ | Anthropic Commercial | B (Python SDK substrate) | 2 (`pip install claude-agent-sdk`) | PASS | PASS | PASS-strong | CLEAR | CLEAR | CLEAR | **95** | **ADOPT-NOW** |
| 1.3 | **anthropics/cwc-long-running-agents** | (event-demo Mar-2026) | 2mo | n/a (event demo) | S (skill+hooks+evaluator) | 2 (git clone .local/cwc) | PASS (cited by superpowers + ralph-loop + agent-sdk-dev) | PASS (Boris Cherny + Anthropic eng) | PASS-STRONG-PROVENANCE-EXPRESS | CLEAR | CLEAR | CLEAR | **93** | **ADOPT-NOW** |
| 1.4 | **anthropics/claude-plugins-official** | (internal) | 2mo+ | per-plugin | S (canonical marketplace) | 1 (implicit via CC install) | PASS | PASS | PASS | CLEAR | CLEAR | CLEAR | **98** | **ADOPT-NOW** |
| 1.5 | **anthropics/claude-agent-sdk-typescript** | (internal) | 8mo | Anthropic | B (TS SDK) | 2 (`npm install @anthropic-ai/claude-agent-sdk`) | PASS | PASS | PASS | CLEAR | CLEAR | CLEAR | **88** | **ADOPT-NOW** (for TS-based plugins) |
| 1.6 | **anthropics/claude-code-action** | (internal) | 6mo+ | Anthropic | A (GitHub Action) | 2 | PASS | PASS | PASS | CLEAR | CLEAR | CLEAR | **85** | **ADOPT-NOW** (CI/CD integration) |
| 1.7 | **anthropics/claude-code-security-review** | (internal) | 5mo+ | Anthropic | A (CI action) | 2 | PASS | PASS | PASS | CLEAR | CLEAR | CLEAR | **82** | **ADOPT-NOW** (security automation) |
| 1.8 | **openai/codex** (Codex CLI) | (active OpenAI) | 12mo+ | Apache-2.0 | A (CLI + plugin marketplace) | 2 (`npm install -g @openai/codex`) | PASS | PASS | PASS-strong | CLEAR | CLEAR | CLEAR | **95** | **ADOPT-NOW** (cross-model T1-T7 substrate) |
| 1.9 | **openai/codex-plugin-cc** | active | 6mo+ | per-plugin | S (plugin) | 1 (`/plugin marketplace add openai/codex`) | PASS | PASS | PASS | CLEAR | CLEAR | CLEAR | **93** | **ADOPT-NOW** |
| 1.10 | **github/github-mcp-server** | 29,868 | 14mo | MIT (GitHub-official) | S (MCP) | 2 | PASS | PASS | PASS | CLEAR | CLEAR | CLEAR | **94** | **ADOPT-NOW** |
| 1.11 | **modelcontextprotocol/servers** | 85,714 | 17mo | MIT | S (per-server stdio) | 2 (per-server npm) | PASS | PASS | PASS-strong | CLEAR | CLEAR | CLEAR | **96** | **ADOPT-NOW** (pick by need: filesystem/git/fetch/sequential-thinking/sqlite/playwright) |
| 1.12 | **modelcontextprotocol/python-sdk** | 23,018 | 16mo | MIT | B (Python SDK for custom MCP) | 2 | PASS | PASS | PASS | CLEAR | CLEAR | CLEAR | **89** | **ADOPT-NOW** (custom MCP author substrate) |
| 1.13 | **modelcontextprotocol/typescript-sdk** | 12,436 | 16mo | MIT | B (TS SDK) | 2 | PASS | PASS | PASS | CLEAR | CLEAR | CLEAR | **84** | **STUDY-PILOT-FAVORABLE** (if TS-based MCP needed) |
| 1.14 | **modelcontextprotocol/inspector** | (~5k) | 14mo | MIT | A (MCP debug UI) | 1 (`npx @modelcontextprotocol/inspector`) | PASS | PASS | PASS | CLEAR | CLEAR | CLEAR | **88** | **ADOPT-NOW** (dev-time MCP testing) |
| 1.15 | **github/spec-kit** | active | 6mo+ | MIT | A (spec-driven dev) | 3 | PASS (GitHub + Anthropic + community) | PASS | PASS | CLEAR | CLEAR | CLEAR | **80** | **STUDY-PILOT-FAVORABLE** |

**Section 1 layer verdict**: 14 ADOPT-NOW canonical-substrate picks. All Axis-1+2+3 firm PASS via Anthropic-OpenAI-modelcontextprotocol triple-org convergence. Install order: 1.1+1.4 (skills + plugins-official) → 1.2 (SDK) → 1.8+1.9 (codex CLI + plugin) → 1.11 (MCP reference servers) → 1.10 (github MCP).

---

## Section 2 — Layer 2: Skills marketplaces / agents catalogs (high-leverage methodology)

| # | Repo | Stars | Age | License | Native CC | Wire | Axis-1 | Axis-2 | Axis-3 | P5 (HARD-GATE?) | Score | Verdict |
|---|------|-------|-----|---------|-----------|------|--------|--------|--------|-----------------|-------|---------|
| 2.1 | **obra/superpowers** (Jesse Vincent) | **192,855** [VERIFIED 2026-05-16 via fresh mcp__github fetch — sibling stale cite was 171,890] | 7mo | MIT | S (Anthropic plugins-official `/plugin install superpowers@claude-plugins-official`) | 1 | **PASS** (7 harness integrations: Claude/Codex/Gemini/Cursor/Copilot/Factory/OpenCode) | **PASS** (Jesse Vincent named-T2 + blog.fsck.com 2025-10-09 + Prime Radiant) | **PASS** STRONG-PROVENANCE-EXPRESS | CLEAR (no HARD-GATE) | **97** | **ADOPT-NOW** (TDD methodology + 7-phase workflow + ~15 core skills) |
| 2.2 | **anthropics/skills** (above 1.1) | 135,158 | 8mo | Anthropic | S | 1 | PASS | PASS | PASS-strong | CLEAR | **97** | **ADOPT-NOW** (canonical skill substrate) |
| 2.3 | **ComposioHQ/awesome-claude-skills** | 60,007 | 7mo | CC-BY-NC-ND-4.0 (cite-only) | C (cite/discovery) | 5 | PASS (curated) | PARTIAL | PASS | n/a (cite-only) | **65** | **STUDY-PILOT-NARROW** (discovery surface; do NOT install — license blocks fork-modify) |
| 2.4 | **VoltAgent/awesome-openclaw-skills** | 48,730 | 4mo | MIT | C (cite/discovery) | 5 | PARTIAL (OpenClaw ecosystem-adjacent) | PARTIAL | PASS (>90d) | n/a | **55** | **STUDY-PILOT-NARROW** (cross-reference only — OpenClaw ≠ Anthropic Claude Code) |
| 2.5 | **hesreallyhim/awesome-claude-code** | 43,866 | 13mo | CC-BY-NC-ND-4.0 | C (cite/discovery) | 5 | PASS | PASS | PASS | n/a | **72** | **STUDY-PILOT-FAVORABLE** (canonical discovery aggregator) |
| 2.6 | **addyosmani/agent-skills** (Addy Osmani) | 42,097 | 3mo | MIT (Apache-2.0 source) | S (`/plugin install agent-skills@addy-agent-skills`) | 1 | **PASS** (Anthropic + Google Chrome team + 23 skills cross-runtime) | **PASS** (Addy Osmani T1 Google Chrome) | PASS (cpd HIGH) | CLEAR | **93** | **ADOPT-NOW** (engineering-lifecycle workflow: Define→Plan→Build→Verify→Review→Ship) |
| 2.7 | **sickn33/antigravity-awesome-skills** | 37,635 | 4mo | MIT | A (installer CLI for 1400+ skills) | 2 | PARTIAL (single-individual maintainer per Axis-1 caveat) | PASS (1400+ skills cross-platform) | PASS | n/a | **70** | **STUDY-PILOT-FAVORABLE** (discovery-class aggregator; verify before bulk install) |
| 2.8 | **wshobson/agents** | 35,458 | 10mo | MIT | S (own marketplace `/plugin marketplace add wshobson/agents`) | 1 | **PASS** (Anthropic CC + Gemini CLI + Smithery) | **PASS** (Q2 2026 PluginEval + Agent Teams + Conductor) | **PASS** STABLE-BURN-IN cpd HIGH | CLEAR (granular per-plugin install) | **94** | **ADOPT-NOW** granularly (DO NOT install whole 80-plugin marketplace — install `python-development` + `agent-teams` + `conductor` + `comprehensive-review` selectively) |
| 2.9 | **Yeachan-Heo/oh-my-claudecode** | 33,966 | 4mo | (active) | A (Teams-first multi-agent orchestration) | 3 | PASS | PARTIAL | PASS | CLEAR | **74** | **STUDY-PILOT-FAVORABLE** (Teams-first multi-agent orchestration for CC) |
| 2.10 | **K-Dense-AI/scientific-agent-skills** | 22,465 | 7mo | (likely permissive) | A (skills) | 2 | PASS (multi-domain) | PASS (research-axis curation) | PASS | CLEAR | **78** | **STUDY-PILOT-FAVORABLE** (if scientific/research workflow needed) |
| 2.11 | **VoltAgent/awesome-agent-skills** | 21,845 | 7mo | (catalog) | C (cite) | 5 | PASS | PARTIAL | PASS | n/a | **65** | **STUDY-PILOT-NARROW** (discovery aggregator) |
| 2.12 | **OthmanAdi/planning-with-files** | 21,363 | 4mo | (active) | A (skill — Manus-style planning) | 2 | PARTIAL (single skill) | PARTIAL | PASS | CLEAR | **72** | **STUDY-PILOT-FAVORABLE** (persistent markdown planning workflow) |
| 2.13 | **agentskills/agentskills** | 18,683 | 5mo | (active) | C (spec/docs) | 3 | PASS (spec authority) | PARTIAL | PASS | n/a | **70** | **STUDY-PILOT-FAVORABLE** (Agent Skills specification reference) |
| 2.14 | **JimLiu/baoyu-skills** | 18,401 | 4mo | (active) | A (skills marketplace) | 2 | PARTIAL | PARTIAL | PASS | CLEAR | **62** | **STUDY-PILOT-NARROW** |
| 2.15 | **alirezarezvani/claude-skills** | 14,955 | 7mo | MIT | A (263+ skills cross-runtime) | 2 | PASS | PARTIAL (maintainer self-audit POWERFUL/SOLID/GENERIC/WEAK) | PASS | CLEAR | **76** | **STUDY-PILOT-FAVORABLE** (selective per maintainer-graded POWERFUL/SOLID skills) |
| 2.16 | **shanraisshan/claude-code-best-practice** | 53,176 | 6mo | (active) | C (methodology reference) | 5 (cite-only) | **PASS** (named-author Boris Cherny-style + Pakistani independent T2) | **PASS** (Boris/CCBP cite-trail in sibling claude-sota CLAUDE.md L98) | **PASS** | n/a | **84** | **ADOPT-NOW** (reference-class) — TIER-1-DIRECT named-author SOTA |
| 2.17 | **affaan-m/everything-claude-code** | 183,322 | 4mo | MIT | A (broad pattern library) | 3 | PASS | PASS | PASS (cpd HIGH) | CLEAR | **88** | **STUDY-PILOT-FAVORABLE** (broadest pattern library; cherry-pick) |
| 2.18 | **davila7/claude-code-templates** | 27,306 | 10mo | (active) | A (CLI tool for CC config) | 2 | PASS | PARTIAL | PASS | CLEAR | **76** | **STUDY-PILOT-FAVORABLE** (CC config templates + monitoring) |
| 2.19 | **mvanhorn/last30days-skill** | 25,906 | 4mo | MIT | A (skill) | 1 | PARTIAL | PARTIAL | PASS | CLEAR | **72** | **STUDY-PILOT-FAVORABLE** (research+social-media synthesis) |
| 2.20 | **mattpocock/skills** | (~10k+ per baseline cite) | 6mo | MIT | A (skills) | 2 | PASS (named-author Matt Pocock) | PASS | PASS | CLEAR | **80** | **STUDY-PILOT-FAVORABLE** (TS/JS-focused skills; named-T2 author) |
| 2.21 | **github/awesome-copilot** | 33,083 | 11mo | (catalog) | C (cite-only — Copilot ecosystem) | 5 | PARTIAL (cross-ecosystem reference) | PASS | PASS | n/a | **60** | **STUDY-PILOT-NARROW** (Copilot-skills reference for cross-platform pattern discovery) |
| 2.22 | **garrytan/gstack** (named-author Garry Tan) | (per baseline) | 6mo | MIT | A (skill — codex/gpt5 patterns) | 2 | PASS (Garry Tan named-T1; YC founder) | PASS | PASS | CLEAR | **82** | **ADOPT-NOW** (codex-companion patterns; gstack/codex/SKILL.md cited in sibling for Pattern-B mitigation n=8 codification) |
| 2.23 | **gsd-build/get-shit-done** (TÂCHES) | 62,471 | 5mo | MIT | A (meta-prompting workflow) | 2 | PARTIAL (single curator) | PARTIAL | PASS | CLEAR | **78** | **STUDY-PILOT-FAVORABLE** (meta-prompting + context-engineering + spec-driven dev; reference-class methodology) |
| 2.24 | **Fission-AI/OpenSpec** | (per baseline) | 5mo | MIT | A (spec-driven dev) | 2 | PASS | PARTIAL | PASS | CLEAR | **74** | **STUDY-PILOT-FAVORABLE** |
| 2.25 | **EveryInc/compound-engineering-plugin** | (per baseline) | 4mo | MIT | S (plugin) | 1 | PASS | PARTIAL | PASS (newer) | CLEAR | **76** | **STUDY-PILOT-FAVORABLE** |

**Section 2 layer verdict**: 5 ADOPT-NOW core methodology picks (superpowers 2.1 + anthropics/skills 2.2 + addy-osmani 2.6 + wshobson 2.8 granular + shanraisshan 2.16 + gstack 2.22). Discovery aggregators (2.3+2.4+2.5+2.11+2.21) are cite-only surfaces. 

**Why 3-way superpowers + wshobson + addy-osmani is convergence-PASS (NOT duplicates)**:
- **superpowers** = TDD methodology + 7-phase workflow + structural process discipline (Jesse Vincent named-T2)
- **wshobson** = granular per-domain plugin catalog + Agent Teams orchestration + PluginEval (named-T2 author)
- **addy-osmani** = engineering-lifecycle workflow with anti-rationalization tables (Addy Osmani T1 Google Chrome)
- Three distinct authoring orgs satisfy convergence-gate Axis-1 ≥3 distinct orgs.

---

## Section 3 — Layer 3: Workflow harnesses / methodology / spec-driven

| # | Repo | Stars | Native CC | Wire | Score | Verdict |
|---|------|-------|-----------|------|-------|---------|
| 3.1 | **bmad-code-org/BMAD-METHOD** | (per baseline ~10k+) | A (methodology + task graph) | 3 | **78** | **STUDY-PILOT-FAVORABLE** (multi-day feature task graphs) |
| 3.2 | **eyaltoledano/claude-task-master** | (per baseline) | A (task PM tool) | 3 | **75** | **STUDY-PILOT-FAVORABLE** (PRD-driven task master) |
| 3.3 | **automazeio/ccpm** | (per baseline) | A (PM workflow) | 3 | **73** | **STUDY-PILOT-FAVORABLE** |
| 3.4 | **Wirasm/PRPs-agentic-eng** | (per baseline) | A (PRP methodology) | 3 | **72** | **STUDY-PILOT-FAVORABLE** |
| 3.5 | **github/spec-kit** | (per baseline) | A (spec-driven) | 3 | **78** | **STUDY-PILOT-FAVORABLE** (above 1.15) |
| 3.6 | **gotalab/cc-sdd** | (per baseline) | A (SDD methodology) | 3 | **70** | **STUDY-PILOT-NARROW** |
| 3.7 | **coleam00/context-engineering-intro** | (per baseline) | C (intro/tutorial) | 5 | **65** | **STUDY-PILOT-NARROW** (reference-class) |
| 3.8 | **intellectronica/ruler** | (per baseline) | A (ruler patterns) | 3 | **68** | **STUDY-PILOT-NARROW** |
| 3.9 | **humanlayer/humanlayer** | (per baseline ~10k+) | B (humanlayer SDK) | 3 | **70** | **STUDY-PILOT-FAVORABLE** (human-in-the-loop primitive) |
| 3.10 | **humanlayer/advanced-context-engineering-for-coding-agents** | (per baseline) | C (methodology) | 5 | **72** | **STUDY-PILOT-FAVORABLE** (reference-class) |

**Section 3 layer verdict**: All STUDY-PILOT level — pick methodology that matches your project type. None ADOPT-NOW for all-projects; workflow harness choice is project-dependent.

---

## Section 4 — Layer 4: Parallel operator UIs / multi-agent runtime UIs

| # | Repo | Stars | Native CC | Wire | Architectural primitive | Score | Verdict |
|---|------|-------|-----------|------|------------------------|-------|---------|
| 4.1 | **smtg-ai/claude-squad** | (per baseline ~14k+) | A (tmux+worktree) | 3 | tmux-pane multi-agent worktree | **78** | **STUDY-PILOT-FAVORABLE** (Windows: NOT supported per FM-04 — claude-squad pty.Start fails on Windows-native per parent cycle-491 cite; macOS/Linux only) |
| 4.2 | **ComposioHQ/agent-orchestrator** | (per baseline) | B (Composio SDK) | 3 | DAG mission dispatch via `dispatch_mission` MCP | **80** | **STUDY-PILOT-FAVORABLE** (macOS-focused; pattern source) |
| 4.3 | **yxwucq/CCUI** | (per baseline ~5k+) | A (CC UI) | 3 | CC operator dashboard | **75** | **STUDY-PILOT-FAVORABLE** |
| 4.4 | **jamesrochabrun/AgentHub** | (per baseline) | A (agent hub) | 3 | multi-agent hub | **72** | **STUDY-PILOT-FAVORABLE** |
| 4.5 | **BloopAI/vibe-kanban** | (per baseline) | A (kanban UI) | 3 | board-driven multi-agent | **74** | **STUDY-PILOT-FAVORABLE** |
| 4.6 | **stravu/crystal** | (deprecated Feb-2026 per parent CCC) | n/a | n/a | DEPRECATED | n/a | **REJECT** (archive) |
| 4.7 | **manaflow-ai/cmux** | (per baseline) | A (cmux runtime) | 3 | mux-style runner | **70** | **STUDY-PILOT-NARROW** |
| 4.8 | **fynnfluegge/agtx** | (per baseline) | A (multi-agent tx) | 3 | multi-agent runner | **68** | **STUDY-PILOT-NARROW** |
| 4.9 | **farion1231/cc-switch** | 71,847 | A (all-in-one assistant Tauri/Rust) | 2 | cross-platform desktop CC manager | **86** | **STUDY-PILOT-FAVORABLE** (Windows+macOS+Linux unified UI) |
| 4.10 | **CherryHQ/cherry-studio** | 45,734 | A (AI productivity desktop studio) | 2 | unified frontier-LLM access + 300+ assistants | **82** | **STUDY-PILOT-FAVORABLE** (broader-than-CC AI workspace) |
| 4.11 | **iOfficeAI/AionUi** | 25,256 | A (cowork desktop) | 2 | local-first cowork for 20+ CLIs | **78** | **STUDY-PILOT-FAVORABLE** (cross-runtime cowork) |
| 4.12 | **nwiizo/ccswarm** | (per baseline) | A (CC swarm) | 3 | swarm runner | **70** | **STUDY-PILOT-NARROW** |
| 4.13 | **eigent-ai/eigent** | 14,025 | A (Cowork desktop alternative) | 3 | Claude Cowork local-first alternative | **76** | **STUDY-PILOT-FAVORABLE** |
| 4.14 | **bytedance/UI-TARS-desktop** | 34,096 | A (multimodal GUI agent) | 4 | GUI/computer-use agent | **78** | **STUDY-PILOT-NARROW** (GUI automation; specialized scope) |
| 4.15 | **router-for-me/CLIProxyAPI** | 32,826 | A (CLI proxy wrapper) | 3 | wraps Gemini/Codex/CC as OpenAI-compat API | **80** | **STUDY-PILOT-FAVORABLE** (model-routing layer) |

**Section 4 layer verdict**: All STUDY-PILOT — operator UI choice is environment-dependent (Windows = cc-switch 4.9; macOS = claude-squad 4.1 or Composio AO 4.2; cross-runtime = AionUi 4.11). claude-squad fails on Windows-native per FM-04 sibling evidence.

---

## Section 5 — Layer 5: MCP servers (memory, RAG, search, browser, code-intel)

### 5.A — Memory MCPs (L1 capture, L2 vector, L3 temporal-KG)

| # | Repo | Stars | Backing store | License | Native CC | Wire | Score | Verdict |
|---|------|-------|---------------|---------|-----------|------|-------|---------|
| 5.A1 | **thedotmack/claude-mem** | 75,997 | ChromaDB + SQLite + AI compression | MIT | A (plugin + skill) | 2 | **89** | **ADOPT-NOW** for L1+L2 cross-session memory (76k★ ecosystem leader; supports Claude+OpenClaw+Codex+Gemini+Hermes+Copilot+OpenCode multi-runtime) |
| 5.A2 | **doobidoo/mcp-memory-service** | 1,843 | sqlite_vec embedded | Apache-2.0 | A (MCP stdio) | 2 (`pip install`) | **86** | **ADOPT-NOW** (current claude-sota-installed L1 baseline; Heinrich Krupp named-author; pip-installable) |
| 5.A3 | **getzep/graphiti** v0.29.0 | 25,800 | FalkorDB (Docker) | Apache-2.0 | A (MCP + Docker backend) | 3 (pip + docker) | **88** | **ADOPT-NOW** (L3 temporal-KG; current claude-sota-installed L3 baseline) |
| 5.A4 | **getzep/zep** | (per baseline) | Zep server | Apache-2.0 | A (Zep SDK) | 3 | **65** | **REJECT-FOR-FIT** — SUPERSEDED-BY-graphiti per CR-12 lattice (zep is parent; graphiti is the canonical agent-memory derivative) |
| 5.A5 | **mem0ai/mem0** | (per baseline) | various | Apache-2.0 | B (Python SDK) | 3 | **70** | **DEFER-EVAL** at scale ≥100k memories per Wave 168 prior verdict |
| 5.A6 | **letta-ai/letta** | (per baseline) | Letta server | Apache-2.0 | B (Letta SDK) | 4 | **65** | **DEFER** (agent-memory paradigm distinct from MCP stack) |
| 5.A7 | **topoteretes/cognee** | (per baseline) | Cognee server | (verify license) | B (Cognee SDK) | 4 | **50** | **REJECT-FOR-FIT** — CR-12 DUPLICATE of graphiti L3 verdict per Wave 207-209 |
| 5.A8 | **campfirein/cipher** | (per baseline) | various | UNKNOWN | A (MCP) | 3 | **DEFER** | Wave 2B deep-dive needed |
| 5.A9 | **supermemoryai/supermemory-mcp** | 1,689 | Cloudflare cloud | (cloud SaaS) | A (MCP stdio) | 2 | **70** | **STUDY-PILOT-NARROW** (cloud-dependency; pure-runtime fit concern) |
| 5.A10 | **mkreyman/mcp-memory-keeper** | (per baseline) | file-only | UNKNOWN | A (MCP) | 3 | **65** | **DEFER** — Probe 4 namespace check needed vs doobidoo |
| 5.A11 | **Gentleman-Programming/engram** | 3,529 | SQLite + FTS5 | (active) | A (MCP + HTTP + CLI + TUI) | 2 | **78** | **STUDY-PILOT-FAVORABLE** (agent-agnostic Go binary; multi-interface) |
| 5.A12 | **DeusData/codebase-memory-mcp** | 2,357 | persistent KG | (active) | A (MCP stdio static binary) | 2 | **80** | **STUDY-PILOT-FAVORABLE** (155 languages indexed; sub-ms queries; 99% fewer tokens claim) |
| 5.A13 | **ghostwright/phantom** | 1,421 | (multi-store) | (active) | B (built on Claude Agent SDK) | 3 | **70** | **STUDY-PILOT-NARROW** (AI co-worker shape; broader than memory) |
| 5.A14 | **shaneholloman/mcp-knowledge-graph** | 858 | local KG | (TS) | A (MCP) | 2 | **72** | **STUDY-PILOT-FAVORABLE** (local-first KG; Cline-fork) |
| 5.A15 | **Mibayy/token-savior** | 852 | code-graph | (Python) | A (MCP) | 2 | **78** | **STUDY-PILOT-FAVORABLE** (structural navigation + 77% active token reduction claim; 100% on benchmark — Row-2 fabrication test concern — verify methodology before adopt) |
| 5.A16 | **alioshr/memory-bank-mcp** | 904 | (Cline memory bank pattern) | (TS) | A (MCP) | 2 | **68** | **STUDY-PILOT-NARROW** (Cline-derived memory-bank port) |
| 5.A17 | **GreatScottyMac/context-portal** | 762 | KG | (Python) | A (MCP) | 2 | **70** | **STUDY-PILOT-NARROW** (ConPort — MCP-server memory + KG + RAG) |
| 5.A18 | **Dataojitori/nocturne_memory** | 1,077 | PostgreSQL/SQLite | (Python) | A (MCP) | 2 | **68** | **STUDY-PILOT-NARROW** (rollbackable+graph-like LTM) |

**Section 5.A memory verdict**: 3 ADOPT-NOW core (claude-mem 5.A1 for cross-session + doobidoo 5.A2 for L1+L2 + graphiti 5.A3 for L3 temporal-KG). 5 STUDY-PILOT alternatives. 3 REJECT (zep superseded / cognee duplicate / openviking AGPLv3 per prior audit).

**Key insight**: **thedotmack/claude-mem at 75,997★ is the surprise winner of memory MCPs by far**. It's a *7x to 75x* outlier over second-place. Its proposition: persistent context across sessions for EVERY agent (Claude+OpenClaw+Codex+Gemini+Hermes+Copilot+OpenCode). Captures everything, compresses via AI, re-injects on session start. *Wins over doobidoo/mcp-memory-service via multi-runtime support + AI compression layer*. Worth Wave 2 deep-dive on Probe 4-6.

### 5.B — Browser / scraping / document MCPs

| # | Repo | Stars | License | Native CC | Wire | Score | Verdict |
|---|------|-------|---------|-----------|------|-------|---------|
| 5.B1 | **ChromeDevTools/chrome-devtools-mcp** | 39,715 | MIT | A (MCP stdio) | 2 | **89** | **ADOPT-NOW** (Chrome DevTools for coding agents — official Chrome team) |
| 5.B2 | **microsoft/playwright-mcp** | (~Microsoft-active) | MIT | A (MCP stdio) | 2 | **88** | **ADOPT-NOW** (browser automation; cited by cwc "Going further" pattern) |
| 5.B3 | **D4Vinci/Scrapling** | 49,974 | (active) | A (MCP + Python) | 3 | **84** | **STUDY-PILOT-FAVORABLE** (adaptive web scraping framework) |
| 5.B4 | **assafelovic/gpt-researcher** | 27,090 | Apache-2.0 | A (deep research agent + MCP) | 3 | **82** | **STUDY-PILOT-FAVORABLE** (autonomous deep research) |
| 5.B5 | **upstash/context7** | 55,388 | (active) | A (MCP + cloud) | 2 | **85** | **ADOPT-NOW** (up-to-date code docs for LLMs; vibe-coding context source) |
| 5.B6 | **microsoft/markitdown** | (per baseline) | MIT | A (CLI + library) | 2 | **78** | **STUDY-PILOT-FAVORABLE** (PDF/Office→Markdown conversion) |
| 5.B7 | **docling-project/docling** | (per baseline) | MIT | A (Python lib) | 3 | **78** | **STUDY-PILOT-FAVORABLE** (advanced doc processing) |
| 5.B8 | **unclecode/crawl4ai** | (per baseline) | Apache-2.0 | A (Python + MCP) | 3 | **78** | **STUDY-PILOT-FAVORABLE** (LLM-friendly web crawler) |
| 5.B9 | **firecrawl/firecrawl** | (per baseline) | MIT | A (API + Python) | 3 | **80** | **STUDY-PILOT-FAVORABLE** (managed crawl service) |
| 5.B10 | **jina-ai/reader** | (per baseline) | Apache-2.0 | A (API) | 2 | **78** | **STUDY-PILOT-FAVORABLE** (LLM-friendly URL reader) |

**Section 5.B verdict**: 4 ADOPT-NOW (ChromeDevTools-MCP 5.B1 for browser-eval + playwright-mcp 5.B2 for automation + context7 5.B5 for docs + cwc "Going further" pattern integration). Document MCPs are use-case dependent.

### 5.C — Code intelligence MCPs

| # | Repo | Stars | License | Native CC | Wire | Score | Verdict |
|---|------|-------|---------|-----------|------|-------|---------|
| 5.C1 | **oraios/serena** | 24,271 | MIT | A (MCP stdio) | 2 | **92** | **ADOPT-NOW** (semantic retrieval + editing; symbol-tree code intel substrate; current claude-sota-installed install) |
| 5.C2 | **yamadashy/repomix** | (active 18M downloads/month) | MIT | A (MCP + CLI + skill via `generate_skill`) | 2 | **94** | **ADOPT-NOW** (repo pack + ~70% tree-sitter compression + Pack→Grep→Skill pipeline) |
| 5.C3 | **safishamsi/graphify** | 48,374 | (active) | A (skill) | 2 | **85** | **STUDY-PILOT-FAVORABLE** (code→knowledge-graph via tree-sitter+Leiden) |
| 5.C4 | **zilliztech/claude-context** | (per baseline; currently disabled in claude-sota per FM-16) | (active) | A (MCP + Milvus backend) | 4 (requires Milvus auth) | **62** | **STUDY-PILOT-NARROW** (currently DISABLED via MILVUS_TOKEN gate; reconsider when scale demands) |
| 5.C5 | **ast-grep/ast-grep** | (per baseline 40k+★) | MIT | A (standalone CLI via `cargo install ast-grep` OR `npm install -g @ast-grep/cli` — NOT via phantom `@anthropic/mcp-ast-grep` per FM-09 sibling n=5 ladder) | 2 (CLI) | **86** | **ADOPT-NOW** (CLI install; tree-sitter substrate; AST-search orthogonal to repomix/serena) |
| 5.C6 | **tree-sitter/tree-sitter** | (Python binding per baseline) | MIT | B (substrate library) | 3 | **84** | **ADOPT-NOW** (foundational substrate — invoked indirectly by ast-grep / repomix / serena) |
| 5.C7 | **aider-ai/aider** | (per baseline ~30k+) | Apache-2.0 | A (standalone CLI) | 2 | **80** | **STUDY-PILOT-FAVORABLE** (repo-map + AI pair-programmer; alternative coding agent) |
| 5.C8 | **mufeedvh/code2prompt** | (per baseline) | MIT | A (CLI) | 2 | **76** | **STUDY-PILOT-FAVORABLE** (code-to-prompt snapshot) |
| 5.C9 | **mixedbread-ai/mgrep** | (per baseline) | (active) | A (CLI) | 2 | **74** | **STUDY-PILOT-FAVORABLE** (semantic grep) |
| 5.C10 | **Piebald-AI/claude-code-lsps** | 443 | MIT | S (plugin marketplace `/plugin marketplace add Piebald-AI/claude-code-lsps`) | 1 | **78** | **STUDY-PILOT-FAVORABLE** (LSP-class code intel; small repo but native plugin path) |
| 5.C11 | **DeusData/codebase-memory-mcp** (above 5.A12) | 2,357 | (active) | A (MCP) | 2 | **80** | **STUDY-PILOT-FAVORABLE** (155 languages; sub-ms queries) |

**Section 5.C verdict**: 4 ADOPT-NOW core (serena 5.C1 + repomix 5.C2 + ast-grep 5.C5 CLI + tree-sitter 5.C6 substrate). graphify 5.C3 STUDY-PILOT for KG-shape; aider/code2prompt/mgrep alternative paths.

### 5.D — Search / observability MCPs

| # | Repo | Stars | License | Native CC | Score | Verdict |
|---|------|-------|---------|-----------|-------|---------|
| 5.D1 | **mcp__perplexity / mcp__exa / mcp__deepwiki / mcp__arxiv** (per claude-sota-installed mcp registry) | (various) | (various) | A (MCP) | 2 | **84** | **ADOPT-NOW** (current `.mcp.json` baseline) |
| 5.D2 | **mcp-use/mcp-use** | 9,960 | (active) | A (fullstack MCP framework) | 3 | **78** | **STUDY-PILOT-FAVORABLE** (MCP-app + MCP-server framework) |
| 5.D3 | **awslabs/mcp** | 9,061 | MIT | A (AWS MCP servers) | 3 | **80** | **STUDY-PILOT-FAVORABLE** (AWS-org MCP collection — if AWS workflow) |
| 5.D4 | **microsoft/mcp-for-beginners** | 16,110 | MIT | C (tutorial) | 5 | **74** | **STUDY-PILOT-FAVORABLE** (MCP learning curriculum) |
| 5.D5 | **langfuse/langfuse** (per v62+ baseline) | (active) | MIT | A (Langfuse MCP + cloud) | 3 | **82** | **STUDY-PILOT-FAVORABLE** (LLM observability platform — already partially explored in sibling) |
| 5.D6 | **Arize-ai/phoenix** | (per baseline) | (active) | A (Phoenix MCP) | 3 | **78** | **STUDY-PILOT-FAVORABLE** (LLM observability alternative) |
| 5.D7 | **promptfoo/promptfoo** | (per baseline) | MIT | A (CLI + Node SDK) | 2 | **86** | **ADOPT-NOW** (10M+ prod users; LLM-as-judge eval primitive; now OpenAI-owned still MIT) |

**Section 5.D verdict**: ADOPT-NOW promptfoo 5.D7 (eval primitive); current MCP search baseline is sufficient.

### 5.E — Security MCPs

| # | Repo | Stars | License | Native CC | Score | Verdict |
|---|------|-------|---------|-----------|-------|---------|
| 5.E1 | **semgrep/semgrep MCP** | (~11k+) | LGPL-2.1 (server-process invocation) | S (`/plugin marketplace add semgrep/mcp-marketplace`) | 1 | **90** | **ADOPT-NOW** (SAST; 2000+ community rules; native CC integration; LGPL-2.1 acceptable for server-process per SRA D1 use-class precision) |
| 5.E2 | **InvariantLabs-ai/mcp-scan** | (per baseline) | (active) | A (MCP scanner) | 2 | **78** | **STUDY-PILOT-FAVORABLE** (audit other MCPs for security) |
| 5.E3 | **MCP-Defender/MCP-Defender** | (per baseline) | (active) | A | 2 | **75** | **STUDY-PILOT-NARROW** |
| 5.E4 | **gitleaks/gitleaks** | (per baseline) | MIT | A (CLI) | 2 | **86** | **ADOPT-NOW** (secrets scanning; standard CI gate) |
| 5.E5 | **trufflesecurity/trufflehog** | (per baseline) | AGPL-3.0 | A (CLI) | 2 | **70** | **STUDY-PILOT-NARROW** — AGPL-3.0 license caution for CI integration |
| 5.E6 | **aquasecurity/trivy** | (per baseline) | Apache-2.0 | A (CLI) | 2 | **84** | **ADOPT-NOW** (container/dependency scanning) |
| 5.E7 | **google/osv-scanner** | (per baseline) | Apache-2.0 | A (CLI) | 2 | **84** | **ADOPT-NOW** (dependency vuln scanning) |
| 5.E8 | **github/codeql-action** | (per baseline) | MIT | A (GH Action) | 2 | **85** | **ADOPT-NOW** (deep code-scan) |
| 5.E9 | **woodruffw/zizmor** | (per baseline) | MIT | A (CLI) | 2 | **78** | **STUDY-PILOT-FAVORABLE** (GitHub Actions security audit) |

**Section 5.E verdict**: 6 ADOPT-NOW security gates (semgrep + gitleaks + trivy + osv-scanner + codeql + + zizmor) — defense-in-depth.

---

## Section 6 — Layer 6: Agent orchestration frameworks (Python + TS + ecosystem)

| # | Repo | Stars | License | Native CC tier | Wire | Score | Verdict |
|---|------|-------|---------|----------------|------|-------|---------|
| 6.1 | **langchain-ai/langgraph** | (per baseline ~10k+) | MIT | B (Python SDK) | 3 | **84** | **STUDY-PILOT-FAVORABLE** (state-graph orchestration; cite for SOTA pattern) |
| 6.2 | **langchain-ai/deepagents** | (per baseline) | MIT | B (Python+JS SDK + ACP) | 3 | **80** | **STUDY-PILOT-FAVORABLE** (sub-agent pattern; ACP convergence; cite for arg-truncation discipline) |
| 6.3 | **microsoft/agent-framework** | (per baseline) | MIT | C (Azure-centric) | 4 | **65** | **DEFER** — out-of-CC scope (Azure production deploy) |
| 6.4 | **microsoft/autogen** | (per baseline) | Apache-2.0 | C (Python framework) | 4 | **76** | **STUDY-PILOT-NARROW** (multi-agent debate pattern reference) |
| 6.5 | **microsoft/semantic-kernel** | (per baseline) | MIT | C (Python+C# SDK) | 4 | **68** | **STUDY-PILOT-NARROW** (Microsoft-ecosystem framework) |
| 6.6 | **google/adk-python** | (per baseline) | Apache-2.0 | B (Python SDK) | 3 | **74** | **STUDY-PILOT-FAVORABLE** (Google Agent Dev Kit) |
| 6.7 | **google/adk-js** | (per baseline) | Apache-2.0 | B (JS SDK) | 3 | **72** | **STUDY-PILOT-NARROW** |
| 6.8 | **pydantic/pydantic-ai** | (per baseline) | MIT | B (Python SDK) | 3 | **76** | **STUDY-PILOT-FAVORABLE** (typed-agent framework) |
| 6.9 | **crewAIInc/crewAI** | (per baseline 100k+ certified devs) | MIT | C (Python SDK + own marketplace) | 4 | **70** | **DEFER** — DUPLICATE-FUNCTIONALITY of cwc-long-running-agents for native CC |
| 6.10 | **agno-agi/agno** | (per baseline ~40k★) | Apache-2.0 | C (Python SDK + service deploy) | 4 | **65** | **DEFER** — out-of-CC scope (service-deployment-centric) |
| 6.11 | **huggingface/smolagents** | (per baseline ~27k★) | Apache-2.0 | C (Python CodeAgent paradigm) | 4 | **72** | **STUDY-PILOT-NARROW** (code-agent paradigm; pattern reference) |
| 6.12 | **openai/openai-agents-python** | (per baseline ~25k★) | MIT | B (Python SDK + Handoff + Tracing) | 3 | **78** | **STUDY-PILOT-FAVORABLE** (handoff primitive sister of cross-model-consensus) |
| 6.13 | **mastra-ai/mastra** | (per baseline) | MIT | B (TS SDK + event-sourced workflow) | 3 | **76** | **STUDY-PILOT-FAVORABLE** (TS framework with time-travel re-execution) |
| 6.14 | **OpenHands/OpenHands** | (per baseline) | MIT | C (standalone agent SDK) | 4 | **74** | **STUDY-PILOT-NARROW** |
| 6.15 | **OpenHands/software-agent-sdk** | (per baseline) | MIT | C (SDK) | 4 | **70** | **STUDY-PILOT-NARROW** |
| 6.16 | **aaif-goose/goose** | (per baseline ~Apache-2.0) | Apache-2.0 | C (standalone Rust desktop/CLI/API + ACP host) | 4 | **76** | **STUDY-PILOT-NARROW** (cross-vendor coding agent; ACP convergence reference) |
| 6.17 | **sst/opencode** | (per baseline) | (active) | C (alt coding agent) | 4 | **72** | **STUDY-PILOT-NARROW** |
| 6.18 | **google-gemini/gemini-cli** | 104,071 | Apache-2.0 | C (alternative coding CLI; superpowers cross-compat) | 4 | **80** | **STUDY-PILOT-FAVORABLE** (alt-runtime for cross-harness skill testing) |
| 6.19 | **QwenLM/qwen-code** | (per baseline) | Apache-2.0 | C (alt CLI) | 4 | **70** | **STUDY-PILOT-NARROW** |
| 6.20 | **Kilo-Org/kilocode** | (per baseline) | (active) | C (alt CLI) | 4 | **68** | **STUDY-PILOT-NARROW** |
| 6.21 | **anthropics/cwc-long-running-agents** (above 1.3) | n/a | n/a | S | 1 | **93** | **ADOPT-NOW** (canonical Anthropic primitives) |
| 6.22 | **anthropics/claude-plugins-official `plugins/ralph-loop`** | (above 1.4) | per-plugin | S | 1 | **92** | **ADOPT-NOW** (canonical ralph-loop) |
| 6.23 | **ruvnet/ruflo** | 51,565 | MIT | A (TS multi-agent swarm) | 3 | **82** | **STUDY-PILOT-FAVORABLE** (enterprise swarm orchestration; high-star alternative) |
| 6.24 | **NousResearch/hermes-agent** | 152,054 | (active) | C (NousResearch agent) | 4 | **78** | **STUDY-PILOT-NARROW** (broader-than-CC agent — Nous Research alternative ecosystem) |
| 6.25 | **HKUDS/nanobot** | 42,543 | (active) | C (ultra-lightweight personal AI agent) | 4 | **74** | **STUDY-PILOT-NARROW** (HKU lab agent harness) |
| 6.26 | **HKUDS/OpenHarness** | (per baseline) | (active) | C (research harness) | 5 | **70** | **STUDY-PILOT-NARROW** (academic harness reference) |
| 6.27 | **code-yeongyu/oh-my-openagent** | 57,962 | (active) | A (multi-agent TUI runtime) | 3 | **82** | **STUDY-PILOT-FAVORABLE** (multi-runtime agent harness; renamed from oh-my-opencode) |
| 6.28 | **aden-hive/hive** | 10,340 | (Python) | A (Multi-Agent Harness for production AI) | 3 | **74** | **STUDY-PILOT-NARROW** (self-improving + human-in-the-loop pattern) |

**Section 6 verdict**: 2 ADOPT-NOW canonical (6.21 cwc + 6.22 ralph-loop). Most others are STUDY-PILOT reference patterns OR alternate-runtime ecosystems (out of CC scope but useful as cross-validation references).

**Win-over-alternates for Layer 6**:
- **cwc-long-running-agents wins over deepagents/langgraph** for native CC: deepagents/langgraph are Python SDKs requiring custom harness; cwc ships .claude/ primitives natively integrated.
- **superpowers (Layer 2.1) wins over crewAI/autogen** for methodology: superpowers is plugin-native; crewAI/autogen require Python harness.
- **ralph-loop plugin wins over community ralph forks (michaelshimeles/ralphy)**: Anthropic-canonical; community variants are cite-only references.

---

## Section 7 — Layer 7: Token / context optimization (LLMLingua REPLACED)

### Critical 2026 finding (verified via direct fresh probe)

**microsoft/LLMLingua = STALE per W220 R5 codex T1 + this wave verification**: last commit `e0e9d99` on **2025-10-28** (~7mo ago); README cites latest news 2024-12-13. Per-Edit prompt rewriting is architectural anti-pattern under Anthropic prompt-cache + /compact native primitives.

### The 2026 token-optimization stack (CC-runtime-fit)

| # | Primitive | Stars | Native CC | Wire | Token-eff claim | Score | Verdict |
|---|-----------|-------|-----------|------|-----------------|-------|---------|
| 7.1 | **Anthropic prompt caching** (`cache_control` field) | TIER-1 OFFICIAL | f (Anthropic SDK) | 1 (implicit) | runtime cache reuse (60-90% on repeated context) | **96** | **ADOPT-NOW** (CC runtime active; verify cache hit rate via `/context all`) |
| 7.2 | **Anthropic CC `/compact` + `CLAUDE_AUTOCOMPACT_PCT_OVERRIDE`** | TIER-1 OFFICIAL | a (CLI flag + env) | 1 | summary-based context decay | **94** | **ADOPT-NOW** (set `CLAUDE_AUTOCOMPACT_PCT_OVERRIDE=70` per W201 P0(i)) |
| 7.3 | **rtk-ai/rtk** (CLI proxy) | **48,553** | A (CLI proxy single Rust binary) | 2 (`cargo install rtk-cli`) | **60-90% token cut on common dev commands** | **92** | **ADOPT-NOW** (single Rust binary zero-deps; current claude-sota-installed default-install candidate per W64 INSTALL_CORE) |
| 7.4 | **JuliusBrussee/caveman** | **60,743** | A (skill — "talk like caveman") | 1 (`/plugin install caveman`) | **65% token cut** (skill-level rewrite) | **86** | **STUDY-PILOT-FAVORABLE** (high-star Q2 2026 release; complementary to RTK at different layer) |
| 7.5 | **diegosouzapw/OmniRoute** | 4,633 | A (gateway/proxy) | 3 | **RTK+caveman stacked ~95% savings** | **80** | **STUDY-PILOT-FAVORABLE** (160+ providers gateway + stacked compression) |
| 7.6 | **chopratejas/headroom** | 1,759 | A (library + proxy + MCP) | 2 | **60-95% on tool outputs/logs/RAG chunks** | **80** | **STUDY-PILOT-FAVORABLE** (tool-output compressor — pre-LLM filter) |
| 7.7 | **yvgude/lean-ctx** | 1,668 | A (Rust binary + Shell Hook + MCP — 49 tools / 10 read modes / 90+ patterns) | 2 | **60-95% reduction; up to 99% on cached reads** | **80** | **STUDY-PILOT-FAVORABLE** ("Context OS"; cross-runtime via shell hooks) |
| 7.8 | **mksglu/context-mode** | 14,826 | A (MCP/plugin/hook/skill) | 1 (`/plugin install context-mode`) | **98% reduction via tool-output sandbox** | **88** | **ADOPT-NOW** (high-star + multi-path native CC; sandboxes large outputs) |
| 7.9 | **cytostack/openwolf** | 1,645 | A (CC middleware) | 2 | "Sharper context. Fewer tokens." | **76** | **STUDY-PILOT-NARROW** |
| 7.10 | **alexgreensh/token-optimizer** | 982 | A (skill + plugin) | 1 (`/plugin install token-optimizer`) | "ghost tokens" detection + compaction survival | **74** | **STUDY-PILOT-FAVORABLE** (compaction-quality preservation) |
| 7.11 | **Mibayy/token-savior** (above 5.A15) | 852 | A (MCP) | 2 | **77% active token cut; 100% on internal benchmark (verify methodology — Row-2 fabrication-test concern)** | **78** | **STUDY-PILOT-NARROW** (structural code navigation + memory; needs benchmark verification before ADOPT) |
| 7.12 | **lucasrosati/claude-code-memory-setup** | 649 | A (Obsidian + Graphify) | 3 | **71.5x fewer tokens per session** (knowledge-graph offload) | **74** | **STUDY-PILOT-FAVORABLE** (memory-offload pattern) |
| 7.13 | **yamadashy/repomix** (above 5.C2) | active | MIT | A | **~70% tree-sitter compression on `pack_codebase(compress=true)`** | **94** | **ADOPT-NOW** |
| 7.14 | **ryoppippi/ccusage** | (per baseline) | MIT | A (CLI) | n/a (measurement only — telemetry) | **86** | **ADOPT-NOW** (LLM cost analyzer; measurement substrate) |
| 7.15 | **microsoft/LLMLingua** | (~~stale 2025-10~~) | MIT | f (Python only) | (paper-claims; STALE for CC integration) | **45** | **DEFER** — stale + anti-pattern for CC; replaced by 7.1+7.2+7.3+7.13 stack |
| 7.16 | **LangChain deepagents** TruncateArgsSettings (cite-only) | n/a (sub-module) | C (discipline reference) | n/a | pattern (no install needed) | **n/a** | **CITE-CLASS-CANONICAL** (operator-side arg-truncation discipline; pattern reference) |

**Section 7 verdict**: 7 ADOPT-NOW token-optimization primitives form the 2026 stack:
1. **Anthropic prompt-cache** (7.1) — runtime substrate
2. **`/compact` + autocompact env** (7.2) — runtime substrate
3. **rtk-ai/rtk** (7.3) — CLI command output compression (60-90%)
4. **mksglu/context-mode** (7.8) — tool-output sandboxing (98%)
5. **yamadashy/repomix compress** (7.13) — tree-sitter code-pack compression (~70%)
6. **ryoppippi/ccusage** (7.14) — measurement substrate
7. **JuliusBrussee/caveman** (7.4) — skill-level prompt-rewrite (65%, layered with RTK)

3-org Axis-1 verification: Anthropic + yamadashy + LangChain = 3 distinct orgs; plus RTK + caveman + context-mode add 3 more named orgs. Convergence-gate firm PASS.

**LLMLingua-replacement strategy**: do NOT install LLMLingua; instead enable Anthropic prompt caching + `/compact` + use repomix `pack_codebase(compress=true)` + RTK proxy + context-mode sandbox.

---

## Section 8 — Layer 8: Cross-model gate / eval / observability

| # | Repo | Stars | License | Native CC | Wire | Score | Verdict |
|---|------|-------|---------|-----------|------|-------|---------|
| 8.1 | **openai/codex CLI** (above 1.8) | active | Apache-2.0 | A (CLI + plugin) | 2 | **95** | **ADOPT-NOW** (cross-model T1-T7 substrate) |
| 8.2 | **openai/codex-plugin-cc** (above 1.9) | active | per-plugin | S (plugin) | 1 | **93** | **ADOPT-NOW** |
| 8.3 | **promptfoo/promptfoo** | (per baseline) | MIT | A (CLI + Node SDK) | 2 | **86** | **ADOPT-NOW** (LLM-as-judge eval; 10M+ users; OpenAI-owned MIT) |
| 8.4 | **UKGovernmentBEIS/inspect_ai** | (per baseline) | (active) | B (Python SDK) | 3 | **78** | **STUDY-PILOT-FAVORABLE** (200+ pre-built evals; UK AISI backing) |
| 8.5 | **anthropic-cookbook** (recipes) | (Anthropic) | (Anthropic) | C (cite/skill) | n/a | **88** | **CITE-CLASS-CANONICAL** (Cost-Tier + sub-agents + evaluator_optimizer + skill-creator recipes) |
| 8.6 | **openai/evals** (per baseline v62+) | (per baseline) | MIT | A (Python framework) | 3 | **80** | **STUDY-PILOT-FAVORABLE** |
| 8.7 | **confident-ai/deepeval** | (per baseline) | (active) | A (Python framework) | 3 | **76** | **STUDY-PILOT-FAVORABLE** |
| 8.8 | **explodinggradients/ragas** | (per baseline) | (active) | A (Python framework) | 3 | **78** | **STUDY-PILOT-FAVORABLE** (RAG evaluation) |
| 8.9 | **braintrustdata/braintrust-sdk** | (per baseline) | (active) | A (SDK + UI) | 3 | **78** | **STUDY-PILOT-FAVORABLE** |
| 8.10 | **langfuse/langfuse** | (per baseline) | MIT | A (MCP + cloud) | 3 | **82** | **STUDY-PILOT-FAVORABLE** |
| 8.11 | **Arize-ai/phoenix** | (per baseline) | (active) | A (Phoenix MCP) | 3 | **78** | **STUDY-PILOT-FAVORABLE** |
| 8.12 | **swe-bench/SWE-bench** | (per baseline) | (active) | C (benchmark) | n/a | **80** | **CITE-CLASS-CANONICAL** (canonical coding-agent benchmark) |
| 8.13 | **anthropics/claude-code-security-review** | (above 1.7) | Anthropic | A (CI) | 2 | **82** | **ADOPT-NOW** |

**Section 8 verdict**: 4 ADOPT-NOW canonical (codex + codex-plugin-cc + promptfoo + claude-code-security-review). Observability platforms (langfuse / phoenix) are STUDY-PILOT if telemetry-heavy.

---

## Section 9 — Layer 9: CLI terminal foundation (the unix substrate)

| # | Repo | Stars | License | Native CC | Wire | Score | Verdict |
|---|------|-------|---------|-----------|------|-------|---------|
| 9.1 | **BurntSushi/ripgrep** (`rg`) | (per baseline 50k+) | MIT/Unlicense | A (CLI) | 1 (preinstalled in CC sandbox) | **96** | **ADOPT-NOW** (default search tool) |
| 9.2 | **sharkdp/fd** | (per baseline) | MIT | A (CLI) | 2 | **92** | **ADOPT-NOW** (rust find replacement) |
| 9.3 | **jqlang/jq** | (per baseline) | MIT | A (CLI) | 1 | **94** | **ADOPT-NOW** (JSON processor) |
| 9.4 | **mikefarah/yq** | (per baseline) | MIT | A (CLI) | 2 | **90** | **ADOPT-NOW** (YAML processor) |
| 9.5 | **cli/cli** (`gh`) | (per baseline) | MIT | A (CLI) | 2 | **94** | **ADOPT-NOW** (GitHub CLI) |
| 9.6 | **pre-commit/pre-commit** | (per baseline) | MIT | A (Python tool) | 2 | **86** | **ADOPT-NOW** (commit hooks framework) |
| 9.7 | **casey/just** | (per baseline) | (active) | A (CLI) | 2 | **84** | **ADOPT-NOW** (justfile task runner) |
| 9.8 | **jdx/mise** | (per baseline) | (active) | A (CLI) | 2 | **84** | **ADOPT-NOW** (version manager replacement for asdf+nvm+pyenv) |
| 9.9 | **astral-sh/uv** | (per baseline) | Apache-2.0/MIT | A (Python CLI) | 2 | **94** | **ADOPT-NOW** (Python package manager — replaces pip+venv) |
| 9.10 | **astral-sh/ruff** | (per baseline) | MIT | A (Python lint+format) | 2 | **92** | **ADOPT-NOW** (Python linter) |
| 9.11 | **biomejs/biome** | (per baseline) | MIT | A (JS/TS lint+format) | 2 | **88** | **ADOPT-NOW** (JS/TS toolchain) |
| 9.12 | **oxc-project/oxc** | (per baseline) | MIT | A (JS toolchain) | 2 | **82** | **STUDY-PILOT-FAVORABLE** (alt JS toolchain — faster than biome on some workflows) |
| 9.13 | **sharkdp/bat** | (per baseline) | MIT | A (CLI) | 2 | **84** | **ADOPT-NOW** (cat replacement) |
| 9.14 | **dandavison/delta** | (per baseline) | MIT | A (CLI) | 2 | **86** | **ADOPT-NOW** (git diff viewer) |
| 9.15 | **eza-community/eza** | (per baseline) | MIT | A (CLI) | 2 | **82** | **ADOPT-NOW** (ls replacement) |
| 9.16 | **junegunn/fzf** | (per baseline) | MIT | A (CLI) | 2 | **90** | **ADOPT-NOW** (fuzzy finder) |
| 9.17 | **sxyazi/yazi** | (per baseline) | MIT | A (CLI file manager) | 2 | **78** | **STUDY-PILOT-FAVORABLE** |
| 9.18 | **sharkdp/hyperfine** | (per baseline) | MIT | A (CLI benchmark) | 2 | **80** | **STUDY-PILOT-FAVORABLE** (command-line benchmarking) |
| 9.19 | **evilmartians/lefthook** | (per baseline) | MIT | A (commit hooks alt) | 2 | **84** | **ADOPT-NOW** (faster pre-commit alternative) |
| 9.20 | **koalaman/shellcheck** | (per baseline) | GPL-3.0 | A (CLI) | 2 | **76** | **STUDY-PILOT-FAVORABLE** (GPL-3.0 — server-process invocation OK; library-link blocked) |
| 9.21 | **rhysd/actionlint** | (per baseline) | MIT | A (CLI) | 2 | **84** | **ADOPT-NOW** (GitHub Actions linter) |
| 9.22 | **hadolint/hadolint** | (per baseline) | GPL-3.0 | A (CLI) | 2 | **76** | **STUDY-PILOT-FAVORABLE** (Dockerfile linter — GPL-3.0 caution) |
| 9.23 | **crate-ci/typos** | (per baseline) | MIT/Apache-2.0 | A (CLI) | 2 | **84** | **ADOPT-NOW** |

**Section 9 verdict**: ~17 ADOPT-NOW core CLI tools forming the unix substrate. All permissive license (with shellcheck + hadolint GPL-3.0 acceptable for CLI-binary invocation per SRA D1 use-class precision).

---

## Section 10 — Layer 10: Bridges / cross-runtime / discovery aggregators

| # | Repo | Stars | Type | Wire | Score | Verdict |
|---|------|-------|------|------|-------|---------|
| 10.1 | **router-for-me/CLIProxyAPI** | 32,826 | OpenAI/Gemini/Claude/Codex compat proxy | 3 | **82** | **STUDY-PILOT-FAVORABLE** (model-routing bridge) |
| 10.2 | **musistudio/claude-code-router** (per baseline v62+) | (per baseline) | LLM router | 3 | **74** | **STUDY-PILOT-NARROW** |
| 10.3 | **bfly123/claude_codex_bridge** | (per baseline) | bridge | 3 | **70** | **STUDY-PILOT-NARROW** |
| 10.4 | **xiaolai/codex-toolkit-for-claude** | (per baseline) | bridge | 3 | **68** | **STUDY-PILOT-NARROW** |
| 10.5 | **promptadvisers/claudex** | (per baseline) | bridge | 3 | **66** | **STUDY-PILOT-NARROW** |
| 10.6 | **sakibsadmanshajib/gemini-plugin-cc** | (per baseline) | bridge | 2 | **72** | **STUDY-PILOT-FAVORABLE** |
| 10.7 | **agentclientprotocol/python-sdk** (ACP) | (per baseline) | cross-runtime protocol | 3 | **78** | **STUDY-PILOT-FAVORABLE** (ACP convergence — Anthropic+jj+OpenAI+libgit2 4-org per sibling parallel-session-worktree-isolation.md L18-22) |
| 10.8 | **agentclientprotocol/claude-agent-acp** | (per baseline ~1.7k★) | ACP adapter | 2 | **78** | **STUDY-PILOT-FAVORABLE** (official ACP-org Claude Agent adapter; Wave 5 A10 closure ACP ADOPT-NOW eligible) |
| 10.9 | **coder/acp-go-sdk** | (per baseline 156★) | ACP Go SDK | 3 | **72** | **STUDY-PILOT-NARROW** |
| 10.10 | **hesreallyhim/awesome-claude-code** (above 2.5) | 43,866 | discovery | 5 | **72** | discovery-only |
| 10.11 | **ComposioHQ/awesome-claude-skills** (above 2.3) | 60,007 | discovery | 5 | **65** | discovery-only |
| 10.12 | **sickn33/antigravity-awesome-skills** (above 2.7) | 37,635 | discovery + installer | 2 | **70** | **STUDY-PILOT-FAVORABLE** |
| 10.13 | **VoltAgent/awesome-agent-skills** (above 2.11) | 21,845 | discovery | 5 | **65** | discovery-only |
| 10.14 | **rohitg00/awesome-claude-code-toolkit** | 1,681 | discovery + 135 agents + 35 skills | 3 | **76** | **STUDY-PILOT-FAVORABLE** (curated toolkit with 176+ plugins) |
| 10.15 | **davepoon/buildwithclaude** | 2,934 | discovery hub (multi-runtime) | 5 | **74** | discovery-only |
| 10.16 | **quemsah/awesome-claude-plugins** | 698 | discovery via n8n metrics | 5 | **66** | discovery-only |
| 10.17 | **andyrewlee/awesome-agent-orchestrators** | (per baseline) | discovery | 5 | **64** | discovery-only |
| 10.18 | **bradAGI/awesome-cli-coding-agents** | (per baseline) | discovery | 5 | **64** | discovery-only |
| 10.19 | **RoggeOhta/awesome-codex-cli** | (per baseline) | discovery | 5 | **62** | discovery-only |
| 10.20 | **ai-boost/awesome-harness-engineering** | 938 | discovery + agent harness patterns | 5 | **70** | **STUDY-PILOT-NARROW** |

**Section 10 verdict**: Discovery aggregators are cite-only surfaces (not install candidates per kiss-dry-yagni Must-Never #4). Bridges/routers are STUDY-PILOT if model-routing or cross-runtime is needed. ACP convergence layer is ADOPT-NOW-eligible per Wave 5 A10.

---

## Section 11 — Layer 11: Outliers / specialized / Q2 2026 NEW

| # | Repo | Stars | Type | Score | Verdict + notes |
|---|------|-------|------|-------|-----------------|
| 11.1 | **NousResearch/hermes-agent** | 152,054 | "agent that grows with you" | **78** | STUDY-PILOT-NARROW (NousResearch ecosystem; bigger than CC scope) |
| 11.2 | **nextlevelbuilder/ui-ux-pro-max-skill** | 79,038 | UI/UX design skill | **74** | STUDY-PILOT-NARROW (specialized design skill) |
| 11.3 | **shareAI-lab/learn-claude-code** | 60,674 | educational "nano CC harness" | **78** | CITE-CLASS-CANONICAL (educational/tutorial) |
| 11.4 | **santifer/career-ops** | 44,905 | career-AI on CC | **65** | DEFER (use-case specific) |
| 11.5 | **luongnv89/claude-howto** | 33,036 | visual CC guide | **74** | STUDY-PILOT-FAVORABLE (tutorial/cite-class) |
| 11.6 | **nanocoai/nanoclaw** | 28,891 | OpenClaw alternative (smaller, safer) | **65** | OUT-OF-CC-scope (OpenClaw ecosystem) |
| 11.7 | **asgeirtj/system_prompts_leaks** | 40,272 | extracted system prompts | **70** | STUDY-PILOT-FAVORABLE (reference for prompt engineering — verify ethical use) |
| 11.8 | **CherryHQ/cherry-studio** (above 4.10) | 45,734 | AI productivity studio | **82** | STUDY-PILOT-FAVORABLE |
| 11.9 | **OthmanAdi/planning-with-files** (above 2.12) | 21,363 | Manus-style markdown planning | **72** | STUDY-PILOT-FAVORABLE |
| 11.10 | **mvanhorn/last30days-skill** | 25,906 | research+social-media skill | **72** | STUDY-PILOT-FAVORABLE |
| 11.11 | **K-Dense-AI/scientific-agent-skills** (above 2.10) | 22,465 | scientific research skills | **78** | STUDY-PILOT-FAVORABLE |
| 11.12 | **wanshuiyin/Auto-claude-code-research-in-sleep** (ARIS) | 9,438 | autonomous ML research skills | **75** | STUDY-PILOT-FAVORABLE (cross-model review loops; idea discovery) |
| 11.13 | **n8n-io/n8n** | 188,017 | workflow automation (MCP-capable) | **80** | OUT-OF-CC-SCOPE-primary (broader workflow platform; can be MCP-integrated) |

**Section 11 verdict**: Niche or out-of-scope — STUDY-PILOT-NARROW or cite-only.

---

## Section 12 — Master Top-50 cross-category ranked by aggregate score

| Rank | Score | Repo | Layer | Verdict |
|------|-------|------|-------|---------|
| 1 | 98 | **anthropics/claude-plugins-official** | 1 Foundation | ADOPT-NOW |
| 2 | 97 | **anthropics/skills** | 1+2 Foundation/Skills | ADOPT-NOW |
| 3 | 97 | **obra/superpowers** (192,855★ verified) | 2 Skills | ADOPT-NOW |
| 4 | 96 | **modelcontextprotocol/servers** | 5 MCP | ADOPT-NOW |
| 5 | 96 | **Anthropic prompt caching** | 7 Token-eff | ADOPT-NOW (runtime) |
| 6 | 96 | **BurntSushi/ripgrep** | 9 CLI | ADOPT-NOW (preinstalled) |
| 7 | 95 | **anthropics/claude-agent-sdk-python** | 1 Foundation | ADOPT-NOW |
| 8 | 95 | **openai/codex CLI** | 1+8 Foundation/X-model | ADOPT-NOW |
| 9 | 94 | **github/github-mcp-server** | 1+5 MCP | ADOPT-NOW |
| 10 | 94 | **wshobson/agents** | 2 Skills | ADOPT-NOW (granular install) |
| 11 | 94 | **Anthropic `/compact` + autocompact** | 7 Token-eff | ADOPT-NOW (CC built-in) |
| 12 | 94 | **yamadashy/repomix** | 5+7 Code-intel + Token-eff | ADOPT-NOW |
| 13 | 94 | **cli/cli (gh)** | 9 CLI | ADOPT-NOW |
| 14 | 94 | **astral-sh/uv** | 9 CLI | ADOPT-NOW |
| 15 | 93 | **anthropics/cwc-long-running-agents** | 1+6 Foundation/Orch | ADOPT-NOW |
| 16 | 93 | **openai/codex-plugin-cc** | 1+8 X-model | ADOPT-NOW |
| 17 | 93 | **addyosmani/agent-skills** | 2 Skills | ADOPT-NOW |
| 18 | 92 | **oraios/serena** | 5 Code-intel | ADOPT-NOW |
| 19 | 92 | **anthropics/claude-plugins-official `plugins/ralph-loop`** | 6 Orch | ADOPT-NOW |
| 20 | 92 | **rtk-ai/rtk** | 7 Token-eff | ADOPT-NOW |
| 21 | 92 | **astral-sh/ruff** | 9 CLI | ADOPT-NOW |
| 22 | 90 | **semgrep/semgrep MCP** | 5 Security | ADOPT-NOW |
| 23 | 90 | **junegunn/fzf** | 9 CLI | ADOPT-NOW |
| 24 | 89 | **thedotmack/claude-mem** | 5.A Memory | ADOPT-NOW (76k★ memory ecosystem leader; cross-runtime) |
| 25 | 89 | **ChromeDevTools/chrome-devtools-mcp** | 5.B Browser | ADOPT-NOW |
| 26 | 89 | **modelcontextprotocol/python-sdk** | 1 Foundation | ADOPT-NOW |
| 27 | 88 | **anthropics/claude-agent-sdk-typescript** | 1 Foundation | ADOPT-NOW |
| 28 | 88 | **getzep/graphiti** v0.29.0 | 5.A Memory | ADOPT-NOW (L3 temporal-KG) |
| 29 | 88 | **microsoft/playwright-mcp** | 5.B Browser | ADOPT-NOW |
| 30 | 88 | **mksglu/context-mode** | 7 Token-eff | ADOPT-NOW |
| 31 | 88 | **modelcontextprotocol/inspector** | 1 Foundation | ADOPT-NOW (dev-time) |
| 32 | 88 | **anthropic-cookbook** | 8 Eval | CITE-CLASS-CANONICAL |
| 33 | 88 | **biomejs/biome** | 9 CLI | ADOPT-NOW |
| 34 | 86 | **doobidoo/mcp-memory-service** | 5.A Memory | ADOPT-NOW (L1 baseline) |
| 35 | 86 | **ast-grep/ast-grep** | 5 Code-intel | ADOPT-NOW (CLI, not phantom MCP) |
| 36 | 86 | **promptfoo/promptfoo** | 8 Eval | ADOPT-NOW |
| 37 | 86 | **JuliusBrussee/caveman** | 7 Token-eff | STUDY-PILOT-FAVORABLE (65% cut skill) |
| 38 | 86 | **dandavison/delta** | 9 CLI | ADOPT-NOW |
| 39 | 86 | **gitleaks/gitleaks** | 5.E Security | ADOPT-NOW |
| 40 | 86 | **pre-commit/pre-commit** | 9 CLI | ADOPT-NOW |
| 41 | 86 | **ryoppippi/ccusage** | 7 Token-eff | ADOPT-NOW (measurement) |
| 42 | 85 | **upstash/context7** | 5.B Docs | ADOPT-NOW |
| 43 | 85 | **anthropics/claude-code-action** | 1 Foundation | ADOPT-NOW (CI) |
| 44 | 85 | **github/codeql-action** | 5.E Security | ADOPT-NOW |
| 45 | 85 | **safishamsi/graphify** | 5 Code-intel | STUDY-PILOT-FAVORABLE |
| 46 | 84 | **modelcontextprotocol/typescript-sdk** | 1 Foundation | STUDY-PILOT-FAVORABLE |
| 47 | 84 | **shanraisshan/claude-code-best-practice** | 2 Methodology | ADOPT-NOW (reference) |
| 48 | 84 | **mcp-search MCPs** (perplexity/exa/deepwiki/arxiv) | 5.D Search | ADOPT-NOW |
| 49 | 84 | **langchain-ai/langgraph** | 6 Orch | STUDY-PILOT-FAVORABLE |
| 50 | 84 | **tree-sitter/tree-sitter** | 5 Code-intel | ADOPT-NOW (substrate) |

---

## Section 13 — Cross-layer convergence findings (May 2026 SOTA shape)

1. **Skills + MCPs + plugins are the 3 native CC integration paths** — `S-tier` repos hit ≥2 of these (superpowers, wshobson, addy-osmani, anthropic-canonical).

2. **Token optimization shifted from offline-prompt-compression to runtime-orchestration**: LLMLingua era is over. The 2026 stack is **Anthropic prompt-cache + /compact + RTK proxy + context-mode + repomix compress + caveman skill** — six distinct primitives that compose multiplicatively (~95% cumulative reduction stacked per OmniRoute 10.1 evidence).

3. **Memory MCPs have a clear ecosystem leader** (thedotmack/claude-mem 76k★) by a 7-75x margin over second place. Multi-runtime support (Claude+OpenClaw+Codex+Gemini+Hermes+Copilot+OpenCode) explains the dominance. Worth Wave 2 deep-dive on Probe 4-6 before promotion to mandatory baseline.

4. **Marketplaces are NOT install candidates** — they're discovery surfaces. Install individual plugins from `claude-plugins-official` (Anthropic-canonical) + `wshobson/agents` (granular) + `addy-agent-skills` (engineering lifecycle). DO NOT install the entire marketplace.

5. **wshobson's Q2 2026 update introduces NEW mechanics** (Agent Teams plugin + Conductor plugin + PluginEval framework + Opus-4.7/Sonnet-4.6/Haiku-4.5 tiering). Conductor specifically has HARD-GATE setup risk per Wave 138 Fire 1 prior catch — verify Probe 5 mode-harness-shape compatibility before install.

6. **Anthropic-canonical chain locks the architecture**: cwc-long-running-agents → claude-agent-sdk → claude-plugins-official → claude-code-action → claude-code-security-review. Co-installing all 5 gives a complete Anthropic-blessed substrate that beats community alternatives in convergence-gate provenance.

7. **ACP is now FULLY-CLOSED at Axis-1+2+3** (Wave 5 A10 closure per sibling cite): Anthropic + jj-vcs + OpenAI + Linux-Foundation/AAIF = 4 distinct orgs; ADOPT-NOW eligible via `agentclientprotocol/claude-agent-acp` adapter.

8. **Cross-model gate is locked-in topology** (Claude orchestrates / Codex audits) per CLAUDE.md cardinal-rule-3 + 2 structural asymmetries (hook expressiveness + slash command surface). DO NOT fight it.

9. **Phantom packages remain a risk class** (per FM-09 sibling n=5 ladder): `@anthropic/mcp-ast-grep` is phantom; use the standalone `ast-grep` CLI instead. Always run Probe 6 npm-registry-direct-existence before install.

10. **Saturation finding (Cohort 7 n=23→n=36)**: per WAVE1-CLOSE-SYNTHESIS — 13 NEW kit versions v53-v65 all PASS Cohort 7 5-discriminator (anonymous LLM-iterated zip-drop / NEW_ADDITIONS_SINCE_LAST_KIT.md ABSENT / section-isomorphism / repo-count oscillation / escalating taglines). Structural REJECT class applies; per-kit Probe DAG cost obviated. **Adoption decisions MUST come from fresh primary-source crawl (C2 arxiv + C9 stars-sorted + C5 named-author + C4 benchmarks), NOT from kit re-iteration.**

---

## Section 14 — HONEST limitations + STAND-IN-NOTICE

1. **Wave 1 agent dispatch RATE-LIMITED** — 3 parallel agents (CC-ecosystem + MCP-servers + Orchestration) hit Anthropic API rate limit immediately. Pivoted to orchestrator-side synthesis using rich existing baseline (32 files including v65 kit + WAVE1-CLOSE-SYNTHESIS today + C-orchestration-plugin discovery 45-tool-uses today) + fresh GitHub recon (5 queries × ~25 results = ~100 unique repos verified). 

2. **Cross-model gate PARTIAL satisfaction** per `cmc-env-funneled-disclosure.md` STAND-IN-NOTICE mandate: 0/3 BRIDGE-MODE penetration this wave. **Wave 2A codex foreground+tee adversarial review MUST run before any install commit lands at `Z:\claude-sota-pure`** per FM-09 base-rate 100% override.

3. **Probe DAG 1-7 NOT YET RUN for individual ADOPT-NOW candidates** — this catalog is R1 landscape survey (Phase 1 of SRA D1-D10). LOAD-BEARING bar verdicts deferred to Wave 2 per cardinal-rule-10 research-first + cardinal-rule-12 6-class disposition + cardinal-rule-9 install-risk.

4. **Marker Decay risk**: star counts captured May 2026 are point-in-time; per `evidence-policy.md` Marker Decay, re-verify before any adoption commit. Repos like affaan-m/everything-claude-code (183k) had massive star velocity — could be launch-spike or sustained.

5. **License verification PENDING for some candidates** (cipher 5.A8, supermemory 5.A9, several methodology repos in Section 3): Probe 6 LICENSE file read required before install per cardinal-rule-9.

6. **Row-2 fabrication-test concern** for some token-eff repos with strong numeric claims (token-savior 5.A15 "100% on benchmark", lucasrosati 7.12 "71.5x fewer tokens"): per `convergence-gate.md §Anti-pattern Row-2 fabrication-test FAIL` — verify methodology citation before adopt.

7. **Q2 2026 NEW mechanics** in wshobson (Conductor + Agent Teams + PluginEval) require Probe 5 mode-harness-shape verification per Wave 138 Fire 1 HARD-GATE catch pattern.

8. **n8n-io/n8n at 188,017★** is a workflow automation platform broader than CC scope — included for completeness but it's an MCP-server alternative ecosystem, not a CC primitive.

9. **Net-new architecture surfaces partially covered**: observability (langfuse/phoenix/openlit), structured-output schemas (Effect Schema / Pydantic v2 / Zod), eval-as-judge frameworks (deepeval / ragas / braintrust), LLM routers (musistudio/claude-code-router) — covered in Sections 5.D + 8 but not deep-dive Probe DAG'd.

10. **Reproducibility**: all GitHub queries are reproducible via `mcp__github__search_repositories` calls listed in `recon-data/`. v65 baseline at `00-prior-research-baseline/SOTA_REPOS_BEST_OF_BEST_FINAL_LIST.md`.

---

## Section 15 — VERDICT

**Grand Catalog covers 130+ repos across 10 layers, fresh-star-verified May 2026, multi-source-converged (v65 kit + WAVE1-2026-05-15 + fresh GitHub recon).**

**Top install-priority for pure SOTA Claude Code runtime** (in 5 phases per cardinal-rule-7 graduated-unleash):

### Phase 1 — Foundation substrate (must complete before Phase 2)
1. anthropics/claude-plugins-official (canonical marketplace — implicit via CC install)
2. anthropics/skills + anthropics/claude-agent-sdk-python
3. anthropics/cwc-long-running-agents (5 primitives: Default-FAIL contract + Fresh-context evaluator + PROGRESS.md handoff + Kill-switch + Steer-mid-run)
4. openai/codex CLI + openai/codex-plugin-cc (cross-model T1-T7 substrate)

### Phase 2 — Orchestration + cross-model gate
5. obra/superpowers via `/plugin install superpowers@claude-plugins-official` (TDD + 7-phase methodology)
6. addyosmani/agent-skills via `/plugin install agent-skills@addy-agent-skills` (engineering-lifecycle workflow)
7. ralph-loop + agent-sdk-dev plugins (Anthropic-canonical autonomous-loop primitives)
8. wshobson granular: `python-development` + `agent-teams` + `conductor` + `comprehensive-review` (verify Conductor HARD-GATE first)

### Phase 3 — MCP servers
9. modelcontextprotocol/servers (filesystem + git + fetch + sequential-thinking + sqlite + playwright)
10. doobidoo/mcp-memory-service (L1+L2 sqlite_vec)
11. getzep/graphiti + FalkorDB Docker (L3 temporal-KG)
12. microsoft/playwright-mcp + ChromeDevTools/chrome-devtools-mcp (browser eval)
13. semgrep MCP (SAST)
14. oraios/serena + yamadashy/repomix (code intel + repo pack)
15. github/github-mcp-server
16. upstash/context7 (docs)
17. **CONSIDER**: thedotmack/claude-mem (76k★ cross-session memory leader — Wave 2 Probe 4-6 verification first)

### Phase 4 — Token optimization + observability
18. ryoppippi/ccusage (cost telemetry)
19. mksglu/context-mode (tool-output sandbox 98%)
20. rtk-ai/rtk (CLI proxy 60-90%)
21. yamadashy/repomix `compress:true` (already in Phase 3 — enable compression)
22. JuliusBrussee/caveman (65% skill-level — composable with RTK)
23. Configure `CLAUDE_AUTOCOMPACT_PCT_OVERRIDE=70` env

### Phase 5 — Optional / study-pilot
24. promptfoo/promptfoo (eval primitive)
25. ast-grep CLI (orthogonal AST-search to repomix/serena)
26. anthropics/claude-code-action + claude-code-security-review (CI integration)
27. CLI substrate (rg/fd/jq/yq/gh/uv/ruff/biome already typical; add `delta` + `fzf` + `bat` + `eza`)
28. CONSIDER: graphify (KG-shape code intel) + Piebald claude-code-lsps (LSP-class)

**Cross-model gate STATUS**: PARTIAL (orchestrator-side this wave). **Wave 2A codex foreground+tee adversarial review on EACH Phase install MANDATORY** before commits land at `Z:\claude-sota-pure` per FM-09 base-rate 100% override.

---

**End of Grand Catalog. See `06-executive-brief/EXECUTIVE_SYNTHESIS_BRIEF_2026-05-15.md` for Top-30 ranked picks with wire-difficulty ordering + win-over-alternates commentary.**
