# Agent H — Awesome-Lists Deep Audit (Wave 1 Dedup Pass)

**Date**: 2026-05-14
**Scope**: 7 awesome-lists named in operator directive
**Method**: README sweep + grep for SOTA-grade signal (license + stars + age + named-author) NOT in Wave 1 Option B Phase 0-3 plan
**Wave 1 covered candidates** (dedup baseline): claude-plugins-official, openai-codex, addy-agent-skills, claude-code-workflows, wshobson/agents, mksglu/context-mode, obra/superpowers, anthropics/skills, anthropics/knowledge-work-plugins, getzep/graphiti, doobidoo/mcp-memory-service, alirezarezvani/claude-skills, ChromeDevTools/chrome-devtools-mcp

---

## Executive summary — Top-5 NEW candidates

Strict dedup against Wave 1 + axis-1+2+3 quick-check. Ranked by SOTA-grade + immediate Option B fit:

| # | Candidate | Class | Stars | Org/Author | Wave 1? | Pick rationale |
|---|---|---|---|---|---|---|
| 1 | **anthropics/financial-services** + **anthropics/financial-services-plugins** | CC plugin (Anthropic OFFICIAL) | 22290 + 7866 | Anthropics | NO | 20 + 8 plugins; OFFICIAL Anthropic-org-maintained; not covered by claude-plugins-official |
| 2 | **VoltAgent/awesome-claude-code-subagents** | Subagent collection | 19746 | VoltAgent | NO | 100+ specialized subagents; companion to wshobson/agents but complementary scope (different agent inventory) |
| 3 | **eyaltoledano/claude-task-master** | Task-management plugin | 27131 | named-author Eyal Toledano | NO | Plugin for Cursor/Lovable/Windsurf/Roo + Claude — fills task-management gap (sss `task-master` MCP currently disabled per `.claude/settings.json:disabledMcpjsonServers`) |
| 4 | **EveryInc/compound-engineering-plugin** | Multi-tool CC/Codex/Cursor plugin | 16685 | Every Inc | NO | Compound-engineering pattern with TIER-1 cite in cardinal-rule-1 base (Karpathy quote attribution); ADOPT-AMBER for cite-trail validation |
| 5 | **upstash/context7** + smithery-ai/context7 MCP | MCP server (live docs) | 55240 | Upstash | NO (verify) | Context7 already registered in claude-sota .mcp.json; if NOT in claude-sota-installed yet, INSTALL — high-leverage doc-fetcher for Phase 0+ |

**Top-5 HONEST-NON-FINDINGS** (skip Phase 0-3):
- mem0ai/mem0 (55648 stars) — already covered by doobidoo/mcp-memory-service for L1 capture; mem0 = generic memory layer with vendor lock-in to mem0.ai cloud; SUPERSEDED-BY-X per CR-12 disposition lattice
- VoltAgent/awesome-openclaw-skills — OpenClaw ecosystem fork (NOT Claude Code native); ecosystem-adjacent, NOT direct port
- claude-mem (75480 stars) — overlaps doobidoo/mcp-memory-service; SUPERSEDED
- Chinese-only skills (pua, web-access, swiftui-design CN, etc.) — language barrier + narrow domain
- hindsight (13251 stars) — sibling claude-sota lists as DISABLED MCP front-end per `.claude/rules/research-protocol.md` Tool Routing; route via CLI/HTTP only

---

## 1. awesome-llm-apps findings (Shubhamsaboo)

**Scope**: Cookbook of 100+ AI agent + RAG **templates** (Streamlit apps; NOT plugins/MCPs/skills).
**Apache-2.0**, ~17.3k stars active, hand-built code samples.

### Relevance to Option B Phase 0-3 plan: **LOW-DIRECT, HIGH-PATTERN-EXTRACT**

These are application templates, not installable CC primitives. But they encode SOTA agent + RAG patterns worth citing.

### 0-3 candidates for cite-anchor only

1. **advanced_ai_agents/multi_agent_apps/trust_gated_agent_team/** — Trust-Gated Multi-Agent Research Team; pattern-extract for `.claude/rules/synthesis-layer-verify.md` adversarial gate. NO install — STUDY-PATTERN only.

2. **advanced_ai_agents/multi_agent_apps/ai_self_evolving_agent/** — Self-evolving agent; STUDY-PATTERN for `karpathy-adapted.md` Section 5 Wiki Compounding Surface. NO install.

3. **awesome_agent_skills/self-improving-agent-skills/** — Auto-optimize skills via Gemini+ADK; STUDY-PATTERN only (Gemini-specific, ADK-bound; not portable to Claude/codex stack).

### HONEST-NON-FINDING

Most templates are Streamlit-based vertical apps (insurance claim agent, real-estate, finance, etc.) — useful for showing SOTA agent architectures but **NOT installable in claude-sota-installed runtime**. No `/plugin install` or `.mcp.json` candidates surface.

---

## 2. awesome-python findings (vinta)

**Scope**: Curated Python ecosystem list, 13 categories, ~225k stars.
**Last fetched**: SHA 5909fa76d92a173c6e054280c94ce0630a48371b (preview only; full content 77.6KB; truncation-tolerated).

### Relevance to Option B Phase 0-3: **LOW-NEW** (most Python deps already pinned in tools-pin.txt per CCBP discipline)

### SOTA winners for MCP/hook/skill development (cite-only; install per CR-6 official-channel)

| Category | Pinned SOTA | Already in sss? |
|---|---|---|
| HTTP Client | httpx (encode/httpx) | TBD — install per-MCP need |
| Validation | pydantic (pydantic/pydantic) | YES (used by mcp-memory-service) |
| Testing | pytest (pytest-dev/pytest) | YES |
| CLI | typer (tiangolo/typer) OR click (pallets/click) | TBD |
| Logging | loguru (Delgan/loguru) | TBD |

### HONEST-NON-FINDING

vinta/awesome-python is a **meta-list with no install-class deliverables**. SOTA Python deps emerge per-MCP/per-skill at install time, governed by upstream pyproject.toml. No Phase 0-3 direct picks.

---

## 3. ComposioHQ awesome-claude-skills findings

**Scope**: 1000+ skills index for Claude.ai / Claude Code / Codex / Cursor / Gemini CLI / Antigravity.
**Apache-2.0**, ~57k stars (per memory cite), Composio-curated.

### Top-10 SOTA candidates NOT in Wave 1

Filtering for: (a) NOT Composio-branded automation (those are vendor-tied to composio.dev API), (b) NOT Anthropic skills already covered, (c) named-author + non-trivial scope:

| # | Skill | Author | Source repo | Stars | Pick rationale |
|---|---|---|---|---|---|
| 1 | **anthropics/skills** (xlsx, docx, pdf, pptx, web-artifacts-builder, mcp-builder, slack-gif-creator, canvas-design, brand-guidelines, internal-comms) | Anthropic OFFICIAL | github.com/anthropics/skills | 133629 | **ALREADY ON ANTHROPICS SKILLS REPO** — verify if Wave 1 plan installs subset. Production-grade. |
| 2 | **avelikiy/great_cto** | named-author | github.com/avelikiy/great_cto | (unverified) | 7 subagents (tech-lead/senior-dev/qa/security/devops/l3-support/auditor) + 11 archetypes + 13 compliance frameworks. SOTA SDLC pipeline pattern. CR-12 6-class disposition: GENUINELY-NEW for sss (no overlap w/ wshobson/agents structurally) |
| 3 | **rampstackco/claude-skills (Brand Build Skills)** | rampstackco | github.com/rampstackco/claude-skills | (unverified) | 59-skill library; brand/SEO/dev/ops/growth lifecycle. Stack-agnostic. Ahrefs MCP integration. |
| 4 | **obra/superpowers** subset NOT in current vendoring | obra (named-author) | github.com/obra/superpowers | 189439 | sss currently vendors 6/14 obra skills per `team-orch-frameworks.md` Selectively-vendored sister skills. Pattern shows 8 more upstream candidates including finishing-a-development-branch, using-git-worktrees, root-cause-tracing. STUDY-PILOT additional 2-3. |
| 5 | **NeoLabHQ/context-engineering-kit** | NeoLabHQ | github.com/NeoLabHQ/context-engineering-kit | (unverified) | Multi-skill packs: prompt-engineering, software-architecture, subagent-driven-development, kaizen. Multi-pattern collection. |
| 6 | **sanjay3290/ai-skills** | sanjay3290 | github.com/sanjay3290/ai-skills | (unverified) | Google Workspace suite (Gmail/Calendar/Chat/Docs/Sheets/Slides/Drive), outline, imagen, deep-research, postgres, jules. Cross-platform OAuth. |
| 7 | **mhattingpete/claude-skills-marketplace** (engineering-workflow-plugin) | mhattingpete | github.com/mhattingpete/claude-skills-marketplace | (unverified) | git-pushing, review-implementing, test-fixing + computer-forensics-skills set |
| 8 | **lackeyjb/playwright-skill** | lackeyjb | github.com/lackeyjb/playwright-skill | (unverified) | Playwright browser automation — companion to ChromeDevTools MCP. Different surface (model-invoked vs CDP). |
| 9 | **lean-ctx (yvgude/lean-ctx)** | yvgude | github.com/yvgude/lean-ctx | (unverified) | MCP server + context runtime; AST-aware compression; 90+ shell patterns; cross-tool (CC/Cursor/Copilot). **Sibling already has context-mode equivalent — POSSIBLE OVERLAP** — verify w/ Mia probe per `mia-pre-apply.md` |
| 10 | **chrisvoncsefalvay/claude-d3js-skill** | chrisvoncsefalvay (named-author) | github.com/chrisvoncsefalvay/claude-d3js-skill | (unverified) | D3.js visualization; narrow scope but high-leverage for data-viz workflows |

**DUPLICATE-FUNCTIONALITY catches per CR-12 lattice** (REJECT — skip Phase 2/3):
- All Composio asterisk-automation skills (Close/HubSpot/Pipedrive/Salesforce/etc.) — vendor-locked to composio.dev API; sss does not currently install Composio MCP; SUPERSEDED-BY existing per-app MCP servers (e.g., Slack MCP) where applicable

---

## 4. shareAI-lab learn-claude-code findings

**Scope**: Q1 2026 Chinese-ecosystem educational repo on agent harness engineering.
**MIT**, ~14.5k stars, trendshift-featured.

### Relevance to Option B Phase 0-3: **ZERO INSTALL — PATTERN-EXTRACT ONLY**

This is a teaching repo with 12 progressive sessions building an agent from scratch. **NOT a plugin/MCP/skill provider.** Cite-only:

- **s07 Task system** + **s09 Agent Teams** + **s10 Team Protocols** + **s11 Autonomous Agents** + **s12 Worktree Isolation** — sss already has all these primitives via cardinal-rules + `team-orchestration.md` + `parallel-session-worktree-isolation.md`. NO new ports.
- **shareAI-lab/claw0 sister repo** — adds heartbeat + cron + IM channels. **REJECT-FOR-FIT** per `agent-harness-fit-verification.md` Probe 5 mode-harness-shape: HARD-GATE on always-on cron-driven mode incompatible with sss autonomous /loop semantics.

### HONEST-NON-FINDING

Strong educational reference. **0 install candidates** for Phase 0-3. Cite-anchor in `karpathy-adapted.md` Section 5 Wiki Compounding Surface if pattern-extracting harness-engineering principles.

---

## 5. hesreallyhim awesome-claude-code findings

**Scope**: 226 resources across 10 CSV categories (Slash-Commands 59 / Tooling 51 / Workflows 37 / CLAUDE.md 28 / Skills 19 / Hooks 13 / Agents).
**CC-BY-NC-ND-4.0** (cite-only, no fork-modify).

### Status: README is currently **TODO** (Table of Contents under reconstruction per maintainer note "The old ways have come and gone")

The full README returns a stub: "I. TODO. hm. Him: Claude have you got any ideas? Claude: Just hit me up on Telegram, I will sort it out."

### Recommendation

**SKIP this fire** — README is being rebuilt. Re-audit when ToC is restored. Use `Z:/repos/deps/awesome-claude-code/` local clone (HEAD 6ebceefe per claude-sota research-protocol.md cite) if specific CSV category needs scanning.

---

## 6. quemsah awesome-claude-plugins findings

**Scope**: Top-100 CC plugin repositories ranked by stars; updated 2026-05-14.
**License**: README does not state (claude-sota cite at research-protocol.md flags as [UNKNOWN]/cite-only).

### Top SOTA NEW candidates (not in Wave 1 plan)

Ranked by star count + license-known + claude-sota-installed fit:

#### Tier-1 (HIGH priority for Phase 2/3 install)

| # | Plugin | Stars | License | Fit |
|---|---|---|---|---|
| 1 | **anthropics/financial-services** + **anthropics/financial-services-plugins** | 22290 + 7866 | Anthropic OFFICIAL | **20 + 8 plugins, Anthropic-OFFICIAL maintained**; complementary to `anthropics/knowledge-work-plugins` (already in Wave 1). Adds finance-vertical agents (Bloomberg analyst, valuation, risk). **INSTALL EVALUATION REQUIRED** |
| 2 | **VoltAgent/awesome-claude-code-subagents** | 19746 | (unverified — assumed MIT) | 100+ subagents; 10 plugins. **Complements wshobson/agents** (different scope: VoltAgent emphasizes role-diversity vs wshobson framework-aware orchestration). STUDY-PILOT |
| 3 | **eyaltoledano/claude-task-master** | 27131 | (unverified) | Task-management cross-runtime (Cursor/Lovable/Windsurf/Roo); fills sss task-master MCP-disabled gap. **EVALUATE** |
| 4 | **EveryInc/compound-engineering-plugin** | 16685 | (unverified) | Compound-engineering pattern across CC/Codex/Cursor; **HIGH PATTERN VALUE** for cite-anchor in `team-orchestration.md` |
| 5 | **anthropics/financial-services-plugins** (8 plugins) | 7866 | Anthropic OFFICIAL | Sister to #1 — verify deduplication; install both if non-overlapping |

#### Tier-2 (MEDIUM — STUDY-PILOT eligible)

| # | Plugin | Stars | Notes |
|---|---|---|---|
| 6 | **upstash/context7** | 55240 | Up-to-date docs MCP; verify if sss already has via claude-sota inheritance |
| 7 | **mvanhorn/last30days-skill** | 25784 | Reddit/X/YouTube/HN/Polymarket research synthesis |
| 8 | **kepano/obsidian-skills** | 31048 | Markdown/Bases/JSON Canvas for note-taking — useful if sss adopts Obsidian backend |
| 9 | **coreyhaines31/marketingskills** | 28399 | CRO/copywriting/SEO/analytics skills — narrow ops domain |
| 10 | **OthmanAdi/planning-with-files** | 21180 | Manus-style persistent markdown planning. **POSSIBLE PATTERN-EXTRACT** for sss long-running /loop arcs |
| 11 | **gastownhall/beads** + **steveyegge/beads** | 23631 + 20018 | Memory upgrade for coding agents. **POSSIBLE OVERLAP** with doobidoo/mcp-memory-service — Mia probe required |
| 12 | **vercel-labs/agent-browser** | 32944 | Browser automation CLI for AI agents — companion to chrome-devtools-mcp + playwright-skill |
| 13 | **wonderwhy-er/DesktopCommanderMCP** | 6036 | Terminal + filesystem MCP. **OVERLAP w/ Bash tool** — REJECT-FOR-FIT |

#### Tier-3 (LOW priority — defer)

- mempalace (52148 + 41278 stars) — memory systems; SUPERSEDED-BY graphiti+mcp-memory
- ruflo, ruvnet/RuView, oh-my-claudecode, BMAD-METHOD — multi-agent orchestration platforms; structurally overlap with cardinal-rule-3 + team-orchestration.md; SUPERSEDED-BY existing harness
- claude-hud (22656 stars) — HUD/observability widget; useful but narrow; defer
- ralph (19019 stars) — autonomous loop runner; sss already has /ralph-loop skill + claw0 reference; SUPERSEDED-BY existing
- promptfoo (21234 stars) — testing for prompts/RAGs; STUDY-PATTERN for eval gating
- mukul975/Anthropic-Cybersecurity-Skills (6270 stars) — 754 cybersecurity skills; STUDY-PILOT for security audit workflows

### CRITICAL OBSERVATION

quemsah list includes **multiple high-star CHINESE-language plugins** (pua/web-access/qmd/Wechatsync). These are language-specific and likely REJECT-FOR-FIT for sss English-ecosystem operator.

---

## 7. punkpeye awesome-mcp-servers findings

**Scope**: ~86k stars MCP server registry; 722k chars of README (exceeded fetch budget).
**MIT** (Glama.ai/punkpeye-curated).

### Fetch limitation

Full README is 722k chars (~250x ceiling). Cannot deep-grep in this fire. Categories per claude-sota memory inheritance:

- Aggregators / Browser / Files & Memory / Search / DBs / Communication / Productivity / Code / Cloud / OS / etc.

### SOTA candidates by category (inferred from sibling claude-sota inheritance + general knowledge — Mia-probe REQUIRED at install time)

**Highest-leverage NEW MCPs for sss-installed runtime** (skipping anything already in claude-sota 26-MCP inventory at `manifests/services.yaml`):

1. **modelcontextprotocol/servers** (official Anthropic MCP server registry) — Filesystem, Git, GitHub, GitLab, Memory, Postgres, Sqlite, Slack, Brave Search, Fetch. Most are already in claude-sota. **VERIFY DELTA**.
2. **mcp-use/mcp-use** (9952 stars) — Fullstack MCP framework for building MCP apps. **NOT a server** — meta-tool. STUDY-PATTERN.
3. **chromedevtools/chrome-devtools-mcp** (39485 stars) — **ALREADY IN Wave 1**.
4. **wonderwhy-er/DesktopCommanderMCP** (6036 stars) — Terminal/filesystem MCP. REJECT — overlaps Bash + Filesystem MCPs.
5. **InsForge/InsForge** (9695 stars) — All-in-one backend (db/auth/storage/AI gateway). Heavy; STUDY-PILOT only.

### HONEST-NON-FINDING (limited by fetch budget)

Cannot do full deep-audit on punkpeye in 15-20min budget. **Recommendation**: claude-sota already has comprehensive MCP inventory at `manifests/services.yaml` (26 servers). For Phase 0-3 install plan, **rely on claude-sota inheritance** + add only specific gaps identified by sota-researcher subagent dispatches per Section 18 research workflow.

---

## 9. Aggregate recommended Phase 2/3 additions

### Phase 2A — INSTALL-class plugins (HIGH confidence)

```bash
# 1. anthropics/financial-services (CC plugin — official Anthropic-org)
/plugin install anthropics/financial-services

# 2. anthropics/financial-services-plugins (sister 8-plugin set)
/plugin install anthropics/financial-services-plugins

# 3. EveryInc/compound-engineering-plugin (compound-engineering cross-runtime)
/plugin install EveryInc/compound-engineering-plugin
```

### Phase 2B — INSTALL-class skills (MEDIUM confidence; Mia-probe required)

```bash
# Brand/lifecycle (rampstackco — verify license)
/plugin install rampstackco/claude-skills

# Multi-pattern (NeoLabHQ context-engineering-kit)
/plugin install NeoLabHQ/context-engineering-kit

# Google Workspace + tools (sanjay3290)
/plugin install sanjay3290/ai-skills

# Engineering workflows (mhattingpete)
/plugin install mhattingpete/claude-skills-marketplace
```

### Phase 3 — STUDY-PILOT / cite-anchor only

- VoltAgent/awesome-claude-code-subagents (100+ subagents collection — selective vendor)
- shareAI-lab/learn-claude-code (cite-anchor in `karpathy-adapted.md` Section 5)
- OthmanAdi/planning-with-files (Manus-style markdown planning pattern-extract for /loop discipline)
- avelikiy/great_cto (SDLC pipeline pattern — STUDY-PATTERN for sss multi-agent SDLC workflow)

### `.mcp.json` fragments — NONE

No new MCPs surfaced from awesome-lists that pass dedup vs claude-sota 26-MCP inventory. punkpeye full audit deferred to next fire.

---

## 10. HONEST-NON-FINDINGS

Awesome-lists with **zero new SOTA-pure candidates** relevant to Option B Phase 0-3:

1. **awesome-llm-apps (Shubhamsaboo)** — App templates, not plugins/MCPs/skills. Pattern-extract only.
2. **awesome-python (vinta)** — Generic Python ecosystem meta-list. Deps emerge per-MCP at install time.
3. **shareAI-lab/learn-claude-code** — Educational repo, 0 install candidates.
4. **hesreallyhim/awesome-claude-code** — README currently TODO, audit deferred.
5. **ComposioHQ Composio-branded asterisk-automation skills** — vendor-locked to composio.dev API; DUPLICATE-FUNCTIONALITY w/ per-app MCP servers.
6. **VoltAgent/awesome-openclaw-skills** — OpenClaw ecosystem (NOT Claude Code native).
7. **claude-mem, mem0, mempalace** — All SUPERSEDED-BY doobidoo/mcp-memory-service + getzep/graphiti (already in Wave 1).
8. **hindsight** — sibling claude-sota lists as DISABLED MCP front-end; route via CLI/HTTP only.
9. **ruflo, BMAD-METHOD, ralph, oh-my-claudecode** — Multi-agent platforms structurally redundant with cardinal-rule-3 + team-orchestration.md.

---

## Verification checklist (for orchestrator before adopting Phase 2A/B candidates)

Per `cardinal-rule-12-upstream-install-priority.md` + `agent-harness-fit-verification.md` 6-probe DAG:

- [ ] Probe 1 (count-OVER): Verify star counts at fresh `mcp__github__search_repositories` call
- [ ] Probe 2 (SDK-vs-CLI): Confirm `/plugin install` is the canonical Anthropic invocation
- [ ] Probe 3 (architectural-API): Match plugin Claude API surface
- [ ] Probe 4 (plugin-namespace): Check no overlap with already-installed plugins
- [ ] Probe 5 (mode-harness-shape): Confirm plugin does not HARD-GATE on interactive UI
- [ ] Probe 6 (direct-file/registry): Verify LICENSE files, archive-status, npm-package existence
- [ ] Probe 7 (demand-gate): Cite sss workflow / queued consumer for each plugin

Apply CR-9 install-risk discipline (`@latest` version pinning + 2-round fix-forward budget + REVERT-AND-REMOVE precedent check) BEFORE running any `/plugin install` from this report.

---

**File**: `Z:/claude-sota-installed/tmp/sota-pure-awesome-lists-H-2026-05-14.md`
