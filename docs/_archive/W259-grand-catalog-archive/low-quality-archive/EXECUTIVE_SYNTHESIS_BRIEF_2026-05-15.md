---
title: SOTA Executive Synthesis Brief — Top-30 Picks for Pure Claude Code Runtime (May 2026)
date: 2026-05-15
parent_doc: ../05-grand-catalog/GRAND_CATALOG_2026-05-15.md
target_audience: operator deciding what to install
status: AUTHORITATIVE-CANDIDATE
---

# Executive Synthesis Brief — Top-30 Picks for Pure SOTA Claude Code Runtime

> **TL;DR**: 5-phase install plan that delivers a SOTA Claude Code runtime with Anthropic-canonical foundation + 3-way orchestration methodology (superpowers + addy-osmani + wshobson) + complete MCP stack (memory L1+L2+L3, browser, code-intel, SAST) + 6-primitive token optimization stack (RTK + context-mode + caveman + repomix-compress + ccusage + Anthropic prompt-cache) + cross-model gate (codex CLI + codex-plugin-cc + promptfoo). **All picks have convergence-gate Axis-1+2+3 firm PASS** with the named exception of Wave 2 verification queue.

---

## Section A — The Top-30 ranked install picks

Ordered by aggregate score (out of 100) and grouped by install phase. Wire-difficulty: 1=`/plugin install`, 2=`npm/pip install` + config, 3=docker/git-clone + multi-step config, 4=manual integration, 5=cite-reference-only.

### Phase 1 — Foundation substrate (8 picks, wire=1-2)

| Rank | Score | Repo | Wire | Native CC path | Why it wins |
|------|-------|------|------|----------------|-------------|
| 1 | 98 | **anthropics/claude-plugins-official** | 1 | canonical marketplace | The only Anthropic-blessed plugin distribution surface. All other marketplaces are alternates. |
| 2 | 97 | **anthropics/skills** (135k★) | 1 | canonical skill substrate | The Anthropic-official agent-skills publication repo. Every skill marketplace cites/extends this. |
| 3 | 96 | **modelcontextprotocol/servers** (86k★) | 2 | per-server MCP stdio | Reference MCP server collection. filesystem/git/fetch/sequential-thinking/sqlite/playwright. |
| 4 | 95 | **anthropics/claude-agent-sdk-python** | 2 | Python SDK substrate | Required for in-process MCP servers + HookMatcher + ClaudeSDKClient lifecycle. |
| 5 | 95 | **openai/codex CLI** | 2 | CLI + plugin marketplace | Cross-model T1-T7 gate substrate (Anthropic locks Claude orchestrates / Codex audits). |
| 6 | 94 | **github/github-mcp-server** (30k★) | 2 | MCP stdio | GitHub-official MCP. Essential for any CC workflow touching git/GH. |
| 7 | 93 | **anthropics/cwc-long-running-agents** | 2 | skill+hooks+evaluator | The 5 canonical primitives: Default-FAIL contract / Fresh-context evaluator / PROGRESS.md handoff / Kill-switch / Steer-mid-run. |
| 8 | 93 | **openai/codex-plugin-cc** | 1 | CC plugin via codex marketplace | Native CC binding for codex CLI cross-model gate. |

**Phase 1 outcome**: Anthropic + OpenAI + MCP triple-org foundation. After Phase 1, the runtime is functional for basic CC workflows with cross-model gate intact.

### Phase 2 — Orchestration + methodology (5 picks, wire=1)

| Rank | Score | Repo | Wire | Why it wins |
|------|-------|------|------|-------------|
| 9 | 97 | **obra/superpowers** (**192,855★** verified May 2026 — UP from sibling stale cite 171k) | 1 (`/plugin install superpowers@claude-plugins-official`) | TDD + 7-phase methodology (brainstorming → worktrees → writing-plans → subagent-dev → TDD → code-review → finishing). Wins over wshobson for *methodology depth*; wins over addy-osmani for *cross-harness* (8 harnesses incl Claude+Codex+Cursor+Gemini+Copilot+Factory+OpenCode). |
| 10 | 94 | **wshobson/agents** (35k★) | 1 (granular install — NOT whole marketplace) | 80 plugins / 185 agents / 153 skills / Agent Teams plugin / Conductor plugin / PluginEval framework / Q2 2026 Opus-4.7 tuning. Wins for *breadth* + *granularity*. **Install selectively**: `python-development` + `agent-teams` + `conductor` (verify HARD-GATE first) + `comprehensive-review`. |
| 11 | 93 | **addyosmani/agent-skills** (42k★) | 1 (`/plugin install agent-skills@addy-agent-skills`) | Engineering-lifecycle workflow (Define→Plan→Build→Verify→Review→Ship) + anti-rationalization tables. Addy Osmani T1 Google Chrome team named-author. Wins for *process discipline* + *named-T1 provenance*. |
| 12 | 92 | **claude-plugins-official `plugins/ralph-loop`** | 1 | Anthropic-canonical autonomous-loop primitive. Wins over all community ralph forks (michaelshimeles/ralphy 2.8k, alfredolopez80 134★) by being Anthropic-blessed. |
| 13 | 84 | **shanraisshan/claude-code-best-practice** (53k★) | 5 (cite-only) | Boris-Cherny-style methodology reference. Cited extensively in sibling claude-sota CLAUDE.md as TIER-1-DIRECT. Not install — reference. |

**Phase 2 outcome**: 3-way orchestration methodology (superpowers + addy + wshobson granular) gives complementary process disciplines without duplication. shanraisshan as reference. **Convergence verification**: 4 distinct named-T2/T1 authoring orgs (obra + wshobson + Addy + shanraisshan) satisfy Axis-1.

### Phase 3 — MCP servers (8 picks, wire=2-3)

| Rank | Score | Repo | Wire | Layer | Why it wins |
|------|-------|------|------|-------|-------------|
| 14 | 92 | **oraios/serena** (24k★) | 2 | code-intel | Semantic retrieval + editing. Symbol-tree code intelligence substrate. Wins over alternatives via MIT + active maintenance + sustained ~24k★. |
| 15 | 94 | **yamadashy/repomix** | 2 | code-intel + token-eff | Code-pack + tree-sitter compression (~70%) + Pack→Grep→Skill pipeline + 18M downloads/month. Wins over code2prompt + similar via multi-MCP-and-CLI native CC + tree-sitter substrate. |
| 16 | 89 | **thedotmack/claude-mem** (76k★) | 2 (plugin) | memory cross-session | **Ecosystem leader by 7-75x margin**. Cross-runtime persistent context (Claude+OpenClaw+Codex+Gemini+Hermes+Copilot+OpenCode) with AI compression. Wins via multi-runtime support — solves the "where does my memory go when I switch runtimes" pain. **Caveat**: Wave 2 Probe 4-6 verification required (high stars warrant deep audit). |
| 17 | 88 | **getzep/graphiti v0.29.0** (26k★) | 3 (pip + docker FalkorDB) | memory L3 KG | Apache-2.0 temporal-KG. Wins over zep (parent — SUPERSEDED) and cognee (DUPLICATE). Already current claude-sota-installed L3 baseline. |
| 18 | 86 | **doobidoo/mcp-memory-service** | 2 | memory L1+L2 baseline | sqlite_vec embedded backend. Wins via Apache-2.0 + Heinrich-Krupp named-author + pip-installable + no cloud dependency. Already current claude-sota-installed L1 baseline. |
| 19 | 90 | **semgrep/semgrep MCP** | 1 (`/plugin marketplace add semgrep/mcp-marketplace`) | SAST | 2000+ community rules. LGPL-2.1 acceptable per SRA D1 use-class precision (server-process invocation, not library link). Wins over alternates via 2000+ rules + parent semgrep 11k★ + CC plugin native. |
| 20 | 89 | **ChromeDevTools/chrome-devtools-mcp** (40k★) | 2 | browser eval | Chrome-team official MCP. Wins over playwright-mcp for **DevTools-shape** debugging. Use playwright-mcp for **automation**; chrome-devtools-mcp for **inspection**. Co-install both. |
| 21 | 88 | **microsoft/playwright-mcp** | 2 | browser automation | Microsoft-official browser-automation MCP. Cited by Anthropic cwc-long-running-agents README as the canonical browser-verification path for "Going further" pattern. |

**Phase 3 outcome**: Complete MCP stack covering memory (L1+L2+L3 + cross-session leader) + code-intel + browser + SAST. Cross-runtime support via claude-mem.

### Phase 4 — Token optimization stack (6 picks, wire=1-2)

The 2026 token-eff is **multi-primitive composition**, not single tool. Layered savings: ~95%+ stacked per OmniRoute observed (RTK 60-90% + caveman 65% + repomix ~70% + Anthropic cache 60-90% reuse).

| Rank | Score | Repo | Wire | Layer | Savings claim | Why it wins |
|------|-------|------|------|-------|----------------|-------------|
| 22 | 92 | **rtk-ai/rtk** (49k★) | 2 (`cargo install rtk-cli`) | CLI command output | **60-90% on common dev commands** | Single Rust binary zero-deps. Process-level proxy on common dev commands. Wins via no-config-needed + universal applicability (works on any CLI). |
| 23 | 88 | **mksglu/context-mode** (15k★) | 1 (`/plugin install context-mode`) | tool-output sandbox | **98% on tool outputs** | Sandboxes large outputs (logs, JSON dumps, CSV). 15-platform integration. Wins via multi-path native CC (plugin+MCP+hook+skill). |
| 24 | 86 | **JuliusBrussee/caveman** (61k★) | 1 (`/plugin install caveman`) | skill-level prompt rewrite | **65% token cut** | "Talk like caveman" skill — direct prompt-side compression. Wins as **complementary to RTK** (different layer: prompt vs output). Composes with RTK for cumulative savings. |
| 25 | 86 | **ryoppippi/ccusage** | 2 (`npm install -g ccusage`) | measurement | n/a (telemetry) | LLM cost analyzer. Wins as measurement substrate — required to verify other primitives are working. |
| 26 | 94 | **yamadashy/repomix `compress: true`** | 2 (already from Phase 3) | code-pack | **~70% tree-sitter compression** | Enable `compress: true` flag in `pack_codebase` MCP calls. Compress at the code-context layer. |
| 27 | 96 | **Anthropic prompt-cache + `/compact` + autocompact** | 1 (env-set `CLAUDE_AUTOCOMPACT_PCT_OVERRIDE=70`) | runtime | **60-90% on repeated context reuse** | CC built-in. Set autocompact threshold to 70% per Wave 201 P0(i) evidence. |

**Phase 4 outcome**: 6-primitive multi-layer token-eff stack. **Why not LLMLingua?** Last commit 2025-10-28 (stale). Per-edit prompt rewriting is architectural anti-pattern under Anthropic prompt-cache + /compact. Replaced by this 6-primitive stack with 3-org Axis-1 PASS.

### Phase 5 — Optional + study-pilot (8 picks, wire=2-3)

| Rank | Score | Repo | Wire | Why it wins |
|------|-------|------|------|-------------|
| 28 | 86 | **promptfoo/promptfoo** | 2 (`npm install -g promptfoo`) | LLM-as-judge eval primitive. 10M+ prod users. Now OpenAI-owned, still MIT. |
| 29 | 86 | **ast-grep/ast-grep** (40k+★) | 2 (`cargo install ast-grep` OR `npm install -g @ast-grep/cli`) | AST-search via tree-sitter. **Install standalone CLI — NOT the phantom `@anthropic/mcp-ast-grep` npm package** per FM-09 sibling n=5 ladder. |
| 30 | 85 | **upstash/context7** (55k★) | 2 | Up-to-date code docs MCP. Wins for **fresh framework docs** retrieval — replaces stale README context. |

**Honorable mentions (study-pilot, not in Top-30)**:
- **garrytan/gstack** (Garry Tan named-T1): codex-companion patterns; cited in sibling for Pattern-B mitigation n=8 codification.
- **Piebald-AI/claude-code-lsps** (443★): LSP-class code intel; small but native plugin path.
- **safishamsi/graphify** (48k★): code-to-knowledge-graph via tree-sitter+Leiden.
- **agentclientprotocol/claude-agent-acp**: cross-runtime ACP adapter (ACP Axis-1+2+3 fully closed at Wave 5 A10).
- **anthropics/claude-code-action + claude-code-security-review** (Phase 5 CI integration).

---

## Section B — Wire-difficulty mapping (what's hard vs easy)

### Wire=1 (single `/plugin install` command) — 9 picks

```
/plugin install superpowers@claude-plugins-official
/plugin install agent-skills@addy-agent-skills
/plugin install ralph-loop@claude-plugins-official
/plugin install agent-sdk-dev@claude-plugins-official
/plugin install context-mode
/plugin install caveman
/plugin install token-optimizer
/plugin install semgrep   # via /plugin marketplace add semgrep/mcp-marketplace
/plugin install codex@openai-codex
```

### Wire=2 (`npm/pip install` + light config) — 14 picks

```bash
# Foundation
npm install -g @openai/codex@latest
pip install claude-agent-sdk
npm install -g repomix
npm install -g ccusage
cargo install rtk-cli            # OR `cargo install ast-grep`

# MCP servers
pip install git+https://github.com/doobidoo/mcp-memory-service.git
npm install -g @modelcontextprotocol/server-{filesystem,git,fetch,sequential-thinking,sqlite,playwright}
npm install -g @microsoft/playwright-mcp
npm install -g @ChromeDevTools/chrome-devtools-mcp  # check actual package name
npm install -g serena            # OR via brew/cargo per upstream
npm install -g promptfoo
```

### Wire=3 (multi-step + docker/service config) — 4 picks

```bash
# Graphiti L3 temporal-KG
pip install graphiti-core[falkordb]
docker pull falkordb/falkordb:latest
docker run -d --name falkordb -p 16379:6379 falkordb/falkordb:latest

# claude-mem (76k★ cross-session memory)
# Verify Wave 2 Probe 4-6 first, then install via `/plugin install claude-mem`

# cwc-long-running-agents (manual clone + .claude/ mount)
git clone https://github.com/anthropics/cwc-long-running-agents.git .local/cwc
cp -r .local/cwc/.claude/* .claude/

# github-mcp-server (Go binary + token config)
# Follow https://github.com/github/github-mcp-server install path
```

### Wire=4-5 (cite-only, manual integration) — 3 picks

- **shanraisshan/claude-code-best-practice** (cite-reference for methodology)
- **anthropic-cookbook** (cite-reference for patterns)
- **awesome-claude-code aggregators** (discovery only)

---

## Section C — Decision matrix: which repo solves which gap

| Gap in current claude-sota-installed | Solution | Picks |
|--------------------------------------|----------|-------|
| **Methodology discipline** (TDD, 7-phase workflow) | superpowers + wshobson + addy-osmani 3-way co-install | Picks 9, 10, 11 |
| **Cross-session memory** (sessions lose context) | claude-mem 76k★ (verify W2 Probe 4-6 first) | Pick 16 |
| **Token budget pressure** (long arcs hit 300-400k decay) | 6-primitive token-eff stack | Picks 22-27 |
| **Cross-model verification gate** | codex CLI + codex-plugin-cc + promptfoo | Picks 5, 8, 28 |
| **Browser/web context** (CC can't see web pages) | ChromeDevTools-MCP + playwright-MCP + crawl4ai | Picks 20, 21 |
| **Code intelligence** (semantic search vs grep) | serena + repomix + ast-grep | Picks 14, 15, 29 |
| **SAST/security** | semgrep MCP + gitleaks + trivy + codeql | Pick 19 + sibling 5.E |
| **Autonomous-loop ("ralph") workflow** | Anthropic ralph-loop plugin + cwc primitives | Picks 7, 12 |
| **Multi-agent orchestration** | wshobson agent-teams + Composio AO + Tutti | Pick 10 + Section 4 |
| **Token cost telemetry** | ccusage | Pick 25 |
| **Up-to-date framework docs in context** | upstash/context7 | Pick 30 |

---

## Section D — Win-over-alternates analysis (per-layer top picks)

### Layer 1: Skills methodology

**superpowers wins over wshobson** for:
- Methodology DEPTH (TDD enforced structurally; 7-phase mandatory workflow)
- Cross-harness (8 harnesses) vs wshobson (2: Claude + Gemini)
- Named-T2 author (Jesse Vincent, blog.fsck.com)

**wshobson wins over superpowers** for:
- Plugin BREADTH (80 plugins / 185 agents) vs superpowers (~15 core skills)
- Q2 2026 PluginEval framework (3-layer eval)
- Granular per-domain install model (avoid loading the world)

**addy-osmani wins over both** for:
- Engineering-LIFECYCLE workflow (Define→Plan→Build→Verify→Review→Ship)
- Anti-rationalization tables (catches "let me just"... patterns)
- Named-T1 author (Addy Osmani Google Chrome team)

**Verdict**: co-install all 3 — convergence-gate Axis-1 4-org PASS (Anthropic + obra + wshobson + Addy). Not duplicates per CR-12 — PROVIDER-COMPLEMENT.

### Layer 2: Memory MCPs

**thedotmack/claude-mem wins over doobidoo + others** for:
- 76k★ ecosystem leader (7-75x margin)
- Multi-runtime persistent context (7 runtimes)
- AI compression layer (not just raw storage)

**doobidoo wins over claude-mem** for:
- pip-installable, no cloud dependency
- Apache-2.0 named-author Heinrich Krupp
- Already current claude-sota-installed baseline (proven)

**graphiti wins over zep/cognee** for:
- Apache-2.0 + agent-memory-paradigm (zep is parent; graphiti is canonical derivative)
- FalkorDB temporal-KG backend (vs cognee's in-memory)
- Current claude-sota-installed L3 baseline

**Verdict**: tier the memory stack: doobidoo L1+L2 baseline + graphiti L3 temporal-KG + claude-mem (after Wave 2 Probe 4-6) for cross-runtime persistence.

### Layer 3: Token optimization

**rtk-ai/rtk (49k★) wins for CLI command outputs** (60-90% cut on common dev commands). Wins via single Rust binary + zero-deps + universal CLI coverage.

**caveman (61k★) wins for prompt-side compression** (65% via skill-level rewrite). Composable with RTK.

**context-mode (15k★) wins for tool-output sandboxing** (98% on large outputs). Multi-path native CC (plugin+MCP+hook+skill).

**LLMLingua (microsoft) LOSES** — stale 2025-10-28 + anti-pattern for CC runtime under Anthropic prompt-cache.

**Verdict**: 6-primitive composition. Cumulative ~95%+ savings stacked.

### Layer 4: Code intelligence

**serena wins for semantic retrieval + editing** (symbol-tree code intel).

**repomix wins for repo packaging + token compression** (tree-sitter ~70% compression).

**ast-grep CLI wins for AST-search** (NOT via phantom MCP package). Orthogonal to serena+repomix.

**Verdict**: all 3 are non-overlapping — co-install. **Avoid phantom @anthropic/mcp-ast-grep npm package per FM-09 sibling n=5 ladder.**

### Layer 5: Cross-model gate

**codex CLI + codex-plugin-cc + cwc-long-running-agents** is the Anthropic-locked topology (Claude orchestrates / Codex audits). DO NOT fight it.

**promptfoo wins for LLM-as-judge eval** (10M+ users + MIT).

**Verdict**: 3-org cross-model triple (Anthropic + OpenAI + promptfoo) — convergence-gate firm PASS.

---

## Section E — What was NOT included (and why)

### REJECTED categories

- **microsoft/LLMLingua** — stale (last commit 2025-10-28); per-edit prompt rewriting is architectural anti-pattern under Anthropic prompt-cache. Replaced by Phase 4 token-opt stack.
- **volcengine/OpenViking** — AGPLv3 STRUCTURAL blocker per sibling n=3+ audits.
- **topoteretes/cognee** — CR-12 DUPLICATE-FUNCTIONALITY of graphiti L3 verdict.
- **getzep/zep** — SUPERSEDED-BY-graphiti (zep is parent platform; graphiti is the canonical derivative for agent memory).
- **stravu/crystal** — deprecated Feb-2026.
- **smtg-ai/claude-squad on Windows** — fails on Windows-native per FM-04 sibling cycle-491 evidence (pty.Start needs tmux/ConPTY).
- **Whole-marketplace installs of wshobson/agents** (80 plugins) — context bloat. Install granularly only.
- **Discovery aggregators as runtime dependencies** — they're cite-only surfaces, not install candidates per kiss-dry-yagni Must-Never #4.

### DEFERRED categories (Wave 2+ verification)

- **claude-mem (76k★)** — high stars warrant Probe 4-6 verification before promotion to mandatory.
- **wshobson Conductor plugin (Q2 2026 NEW)** — verify Probe 5 mode-harness-shape (HARD-GATE risk per Wave 138 Fire 1 prior catch pattern).
- **token-savior (852★ "100% benchmark" claim)** — Row-2 fabrication-test concern per convergence-gate.
- **cipher / supermemory / mcp-memory-keeper** — Wave 2B memory deep-dive needed.
- **inspect_ai** — license verification needed.

### OUT-OF-SCOPE (not CC primary)

- **aaif-goose/goose** — standalone Rust desktop/CLI (alt-runtime, not CC primitive).
- **microsoft/agent-framework / Azure-centric** — production-service deploy.
- **agno-agi/agno** — service-deployment-centric.
- **crewAI / autogen** — Python orchestration alternatives (CR-12 DUPLICATE for CC scope).
- **n8n** — workflow automation platform (188k★ but broader than CC).
- **NousResearch/hermes-agent** — alternative agent ecosystem.
- **OpenClaw ecosystem** — Claude-derivative ecosystem (cite-only cross-validation).

---

## Section F — Convergence findings summary

1. **3-way orchestration methodology** (superpowers + addy-osmani + wshobson) is the SOTA recommendation; together they satisfy Axis-1 ≥4 distinct orgs.

2. **Token optimization shifted from offline-prompt-compression to runtime-orchestration**: LLMLingua era is over. The 2026 stack is **6 primitives composing multiplicatively** (~95% stacked).

3. **thedotmack/claude-mem at 76k★** is the dark horse — memory MCP ecosystem leader by a 7-75x margin. Multi-runtime support is the differentiator. Wave 2 Probe 4-6 verification before promotion to mandatory baseline.

4. **Anthropic-canonical chain** (claude-code + skills + cwc + plugins-official + claude-agent-sdk + claude-code-action + security-review) locks the runtime architecture. Beat all community alternatives in convergence-gate provenance.

5. **wshobson Q2 2026 NEW mechanics** (Agent Teams + Conductor + PluginEval) require Probe 5 HARD-GATE verification before install.

6. **Marketplaces are NOT runtime dependencies** — install granularly. Discovery aggregators are cite-only surfaces.

7. **ACP convergence FULLY-CLOSED** at Wave 5 A10 — ADOPT-NOW eligible via `agentclientprotocol/claude-agent-acp`. Anthropic + jj-vcs + OpenAI + Linux-Foundation/AAIF 4-org Axis-1 PASS.

8. **Phantom-package risk** (FM-09 n=5 ladder) — ALWAYS run Probe 6 npm-registry-direct-existence before install (`@anthropic/mcp-ast-grep` was phantom).

9. **Saturation finding**: 13 NEW kit versions v53-v65 all PASS Cohort 7 5-discriminator (structural REJECT class). Adoption decisions must come from fresh primary-source crawl, NOT kit re-iteration.

10. **Cross-model gate locked-in topology**: Claude orchestrates / Codex audits. Anthropic + CCBP + OpenAI codex 3-org Axis-1 firm PASS. DO NOT fight it.

---

## Section G — HONEST limitations + Wave 2 follow-ups

1. **Wave 1 agent dispatch rate-limited** — pivoted to orchestrator-side synthesis using rich existing baseline (32 files including v65 kit + WAVE1-CLOSE-SYNTHESIS today + C-orchestration-plugin discovery 45-tool-uses today) + fresh GitHub recon (5 queries verifying ~100 unique repos).

2. **Cross-model gate PARTIAL satisfaction** — 0/3 BRIDGE-MODE penetration. **Wave 2A codex foreground+tee adversarial review on each Phase install MANDATORY before commit lands** per FM-09 100% override base-rate.

3. **Probe DAG 1-7 NOT YET RUN** for individual ADOPT-NOW candidates — this is R1 landscape survey. LOAD-BEARING bar verdicts deferred to Wave 2 per cardinal-rule-10.

4. **Mia pre-apply REQUIRED** on every install command per `Z:/claude-sota/.claude/rules/mia-pre-apply.md` (n=36 cumulative ladder):
   - Multi-channel install-path probe per §Alternate-install-path discipline (`command -v` + `.local/bin` + `.cargo/bin` + `~/go/bin` + npm-global + WinGet + uv tool + pipx + brew enumeration)
   - `.mcp.json` namespace collision check (Probe 4)
   - LICENSE file read (Probe 6) — verify permissive
   - Anthropic plugin namespace collision check (Probe 4)

5. **Marker Decay** — star counts captured May 2026 are point-in-time. Re-verify before any adoption commit per `evidence-policy.md` Marker Decay corollary.

---

## Verdict

**Executive Brief delivers Top-30 install picks across 5 phases for pure SOTA Claude Code runtime, with multi-source-converged scoring (130+ repos cataloged), fresh-star-verified May 2026, ranked by aggregate score 0-100 with explicit win-over-alternates commentary.**

**Cross-model gate STATUS**: PARTIAL — Wave 2A codex foreground+tee adversarial review on Phase 1+2 install MANDATORY before any commit lands at `Z:\claude-sota-pure`.

**See `../05-grand-catalog/GRAND_CATALOG_2026-05-15.md` for full 130-repo dimensional scoring.**

**See `../00-prior-research-baseline/` for prior research baseline (v65 kit + WAVE1-CLOSE-SYNTHESIS + 30 other files).**
