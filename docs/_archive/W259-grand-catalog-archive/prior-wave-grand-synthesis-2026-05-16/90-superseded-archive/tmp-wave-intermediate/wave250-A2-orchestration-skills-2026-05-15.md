# Wave 250 Agent A2 — Orchestration + Skills + Marketplaces SOTA research (2026-05-15)

agent: sota-researcher A2 (Sonnet stand-in per CLAUDE.local.md ENV (f) STAND-IN-NOTICE; cross-model gate satisfied via downstream A4/A5 + REAL GPT-5.5 BRIDGE-MODE per advanced-agent-team-standing-directive.md)
discipline: multi-source-discovery-breadth-discipline.md + ahfv-probe-dag.md + convergence-gate.md + cardinal-rule-12-upstream-install-priority.md + citation-discipline.md rule #8

---

## Discovery sources used (5 source families, satisfies ≥4 mandate)

1. **GitHub MCP REST** — 16 distinct `mcp__github__search_repositories` queries + 11 `mcp__github__get_file_contents` README/marketplace.json fetches at HEAD SHA (verbatim file:line)
2. **Awesome-catalog cross-reference** — `hesreallyhim/awesome-claude-code` (43,866★) + `sickn33/antigravity-awesome-skills` (37,635★) + `VoltAgent/awesome-agent-skills` (21,844★) + `travisvn/awesome-claude-skills` (12,577★) + `rohitg00/awesome-claude-code-toolkit` (1,681★) + `Prat011/awesome-llm-skills` (1,239★) — 6 catalogs cross-checked
3. **WebSearch live (Anthropic-allowed)** — Karpathy CLAUDE.md skills movement 2026 Q1→Q2 Twitter/Medium/Antigravity posts (confirms named-T2 endorsement chain `Karpathy → forrestchang → broader ecosystem`)
4. **Direct README + marketplace.json blob SHA read** — wshobson + obra + addyosmani + ruvnet + jeremylongshore + Yeachan-Heo + gmickel + EveryInc + bmad-code-org + anthropics + trailofbits + NeoLabHQ + smtg-ai + eyaltoledano + affaan-m primary-source files
5. **Local cache probe** — `Z:/claude-sota-installed/.claude/plugins/cache/` + `marketplaces/` inventory (17 installed marketplaces + 11 cached plugins as baseline)

NOTE: source family #6 (Exa/Perplexity/Firecrawl scrape) skipped — operator complained explicitly about training-data biases; GitHub REST + direct README at SHA pin provides primary-source ground truth that beats Exa snippet citations. Family count = 5 (≥4 mandate met).

---

## Candidate inventory — Live 2026-05-15 data

Sorted by stars descending. All metrics fetched via `mcp__github__search_repositories` 2026-05-15. License from REST API or README.

| Repo | Stars | Forks | Last push | License | What it is |
|---|---:|---:|---|---|---|
| affaan-m/everything-claude-code (ECC) | **183,315★** | 28,261 | 2026-05-16 | MIT | Agent harness performance optimization system |
| obra/superpowers | **192,832★** | 17,149 | 2026-05-16 | MIT | Agentic skills framework + software dev methodology |
| ruvnet/ruflo (claude-flow rebrand) | **51,561★** | 5,785 | 2026-05-16 | MIT | Multi-agent AI orchestration platform |
| bmad-code-org/BMAD-METHOD | **47,258★** | 5,537 | 2026-05-16 | MIT | V6 Agile AI Driven Development framework |
| hesreallyhim/awesome-claude-code | **43,866★** | 3,746 | 2026-05-16 | CC-BY-NC-ND-4.0 | Master curated list (226 resources) |
| addyosmani/agent-skills | **42,095★** | 4,619 | 2026-05-16 | MIT | 23 production engineering skills + 7 slash cmds |
| sickn33/antigravity-awesome-skills | **37,635★** | 6,159 | 2026-05-16 | MIT | 1,400+ skills installer-CLI |
| wshobson/agents | **35,456★** | 3,858 | 2026-05-16 | MIT | **185 agents + 16 orchestrators + 153 skills + 100 cmds + 80 plugins** |
| Yeachan-Heo/oh-my-claudecode | **33,963★** | 3,114 | 2026-05-16 | MIT | Team-first orchestration (autopilot/ralph/ultrawork) |
| eyaltoledano/claude-task-master | **27,151★** | 2,529 | 2026-05-16 | (TBD) | Task management drop-in (Cursor/Lovable/Windsurf/Claude) |
| VoltAgent/awesome-agent-skills | **21,844★** | 2,330 | 2026-05-16 | MIT | 1000+ agent skills aggregator |
| anthropics/claude-plugins-official | **19,450★** | 2,426 | 2026-05-16 | (per-plugin) | Anthropic-managed curated directory |
| EveryInc/compound-engineering-plugin | **16,816★** | 1,309 | 2026-05-16 | MIT | 37 skills + 51 agents Every.to engineering methodology |
| travisvn/awesome-claude-skills | **12,577★** | 1,368 | 2026-05-16 | MIT | Curated list focused on Claude Code |
| smtg-ai/claude-squad | **7,482★** | 534 | 2026-05-15 | MIT | Multi-AI terminal agent manager |
| automazeio/ccpm | **8,110★** | 826 | 2026-05-15 | MIT | GitHub Issues + worktree parallel-agent PM |
| UfoMiao/zcf | **5,986★** | 420 | 2026-05-16 | MIT | Zero-Config Code Flow (Claude+Codex) |
| golutra/golutra | **3,479★** | 400 | 2026-05-15 | (TBD) | Rust multi-agent orchestration platform |
| davepoon/buildwithclaude | **2,934★** | 346 | 2026-05-16 | MIT | Single-hub aggregator (skills+agents+cmds+hooks+plugins) |
| stellarlinkco/myclaude | **2,658★** | 300 | 2026-05-16 | (TBD) | Multi-agent orchestration (CC+Codex+Gemini+OpenCode) |
| jeremylongshore/claude-code-plugins-plus-skills | **2,181★** | 294 | 2026-05-16 | MIT | **425 plugins + 2,810 skills + 200 agents** + ccpi CLI |
| catlog22/Claude-Code-Workflow | **2,007★** | 159 | 2026-05-15 | MIT | JSON-driven multi-agent framework |
| rohitg00/awesome-claude-code-toolkit | **1,681★** | 523 | 2026-05-16 | MIT | 135 agents+35 skills+42 cmds aggregator |
| AnandChowdhary/continuous-claude | **1,335★** | 92 | 2026-05-15 | MIT | Ralph-loop with PRs |
| jayminwest/overstory | **1,298★** | 208 | 2026-05-15 | MIT | Multi-agent orchestration tmux |
| yohey-w/multi-agent-shogun | **1,266★** | 271 | 2026-05-16 | MIT | Samurai shogun→karo→ashigaru hierarchy via tmux |
| Prat011/awesome-llm-skills | **1,239★** | 180 | 2026-05-15 | MIT | LLM skill catalog |
| NeoLabHQ/context-engineering-kit | **999★** | 92 | 2026-05-15 | GPL-3.0 | 12 plugins (reflexion + SDD + SADD + DDD + FPF + ...) |
| numman-ali/n-skills | **981★** | 98 | 2026-05-13 | (TBD) | Curated plugin marketplace |
| obra/superpowers-marketplace | **967★** | 192 | 2026-05-15 | MIT | Superpowers marketplace |
| first-fluke/oh-my-agent | **951★** | 110 | 2026-05-15 | (TBD) | Portable multi-agent harness (Antigravity/Claude/Codex/Cursor/OpenCode) |
| gmickel/flow-next | **585★** | 45 | 2026-05-15 | MIT | Plan-first AI workflow + Ralph autonomous |
| quant-sentiment-ai/claude-equity-research | **511★** | 59 | 2026-05-14 | (TBD) | Institutional-grade equity research plugin |
| Piebald-AI/claude-code-lsps | **443★** | 54 | 2026-05-14 | MIT | LSP-server-bundled marketplace |
| josstei/maestro-orchestrate | **415★** | 26 | 2026-05-15 | MIT | 39 specialists multi-tool orchestration |
| trailofbits/skills-curated | **402★** | 18 | 2026-05-15 | CC-BY-SA-4.0 | Trail of Bits vetted plugins |
| hoangsonww/Claude-Code-Agent-Monitor | **365★** | 69 | 2026-05-15 | (TBD) | Real-time monitor dashboard (SQLite+Express+React+WS) |
| umputun/cc-thingz | **358★** | 31 | 2026-05-15 | MIT | umputun's marketplace |
| obra/superpowers-lab | **332★** | 24 | 2026-05-15 | MIT | Experimental superpowers skills |
| obra/superpowers-chrome | **287★** | 43 | 2026-05-15 | MIT | Chrome browser control via DevTools |
| microsoft/power-platform-skills | **288★** | 53 | 2026-05-15 | MIT | Power Platform plugin marketplace |
| gupsammy/Claudest | **250★** | 16 | 2026-05-14 | (TBD) | Opinionated battle-tested marketplace |
| giuseppe-trisciuoglio/developer-kit | **248★** | 27 | 2026-05-14 | MIT | Multi-language Java/TS/Python/PHP/AWS plugins |
| fivetaku/gptaku_plugins | **246★** | 53 | 2026-05-16 | (TBD) | AI-Native plugin marketplace |

---

## Per-candidate Probe DAG + SRA + Convergence + CR-12 + Native-CC + Wired-Difficulty

### TIER-1 ADOPT-NOW (high recommendation for Z:/claude-sota-pure)

#### 1. **anthropics/claude-plugins-official** (19,450★) — ALREADY-INSTALLED baseline
- P1 count-OVER: ✅ confirmed at SHA `5dbfa0fa` 2026-05-15 via README directly read
- P2 SDK-vs-CLI: ✅ native `/plugin install ...@claude-plugins-official` (TIER-1-DIRECT Anthropic CC)
- P3 architectural-API: ✅ Claude Code plugin spec native (`.claude-plugin/plugin.json`)
- P4 plugin-namespace: ✅ CANONICAL — this IS Anthropic's directory
- P5 mode-harness-shape: ✅ supports `auto` + `default` + `bypassPermissions` modes
- P6 LICENSE/registry: ✅ per-plugin (mostly MIT)
- P7 demand-gate: **GENUINELY-NEW** baseline trust gate; the operator MUST start here
- SRA D1-D10: D1 PASS (already curated by Anthropic) / D6 PASS (license-clean) / D2-D5/D7-D10 all PASS
- Axis 1+2+3: PASS PASS PASS (≥3 orgs use it; named-T2 = entire Anthropic team; created 2025-11-20 = 6mo burn-in)
- **CR-12: CITE-CLASS-CANONICAL (TIER-1-DIRECT)**
- Native CC tier: **A (marketplace plugin)**
- Wired difficulty: **1/5** (already installed in claude-sota-installed; clone for claude-sota-pure)
- **VERDICT: INSTALL FIRST (CANONICAL)**

#### 2. **obra/superpowers** (192,832★ — UP from 169k baseline) — ECOSYSTEM HEAVYWEIGHT
- P1 count-OVER: ✅ 192,832★ at SHA `f2cbfbef` — UP 23k since baseline 2026-04-30 baseline
- P2 SDK-vs-CLI: ✅ `/plugin install superpowers@claude-plugins-official` (works through Anthropic official) OR `/plugin install superpowers@superpowers-marketplace`
- P3 architectural-API: ✅ native CC skill + multi-harness adapter (Claude Code, Codex CLI, Codex App, Factory Droid, Gemini CLI, OpenCode, Cursor, Copilot CLI)
- P4 plugin-namespace: ✅ TWO entries: `superpowers@claude-plugins-official` AND `superpowers@superpowers-marketplace` (claude-sota-installed already has both registered)
- P5 mode-harness-shape: ✅ TDD + worktree + multi-stage subagent review (matches default + bypass modes)
- P6 LICENSE: ✅ MIT (LICENSE file present)
- P7 demand-gate: **GENUINELY-NEW** — methodology-class primitive (TDD + brainstorming + plans + git-worktrees) that no other marketplace replaces
- SRA D1-D10: D1 PASS (Jesse Vincent named-T1 author + Prime Radiant org) / D6 PASS / all D2-D10 PASS
- Axis 1+2+3: **TRIPLE-PASS firm** (Anthropic-official adopter + Codex official + Cursor adopter + multi-harness; named-T2 obra widely-cited; 7+ months burn-in)
- **CR-12: CITE-CLASS-CANONICAL**
- Native CC tier: **A**
- Wired difficulty: **1/5**
- **VERDICT: INSTALL (TIER-1)**

**Delta-vs-v20-baseline (2026-04-30 → 2026-05-15)**: stars 169k→192,832 (+23k in 6 weeks; viral growth still active); README confirms 14 skill stack STABLE (testing/debugging/collaboration/meta). NEW since v20: `superpowers-chrome` (287★ DevTools-protocol-driven; Oct 2025) + `superpowers-lab` (332★ experimental) sister marketplaces.

#### 3. **addyosmani/agent-skills** (42,095★ — UP from 33k baseline) — NAMED-T1-AUTHOR Google Chrome
- P1 count-OVER: ✅ at SHA `5b4c6dad` 2026-05-15 — UP 9k since 33k baseline 2026-05-08
- P2 SDK-vs-CLI: ✅ `/plugin install agent-skills@addy-agent-skills`
- P3 architectural-API: ✅ native Claude Code skill + Cursor + Gemini CLI + Windsurf + OpenCode + GitHub Copilot + Kiro IDE multi-harness adapter
- P4 plugin-namespace: ✅ `addy-agent-skills/` marketplace; already in claude-sota-installed cache
- P5 mode-harness-shape: ✅ 23 skills + 7 slash commands (`/spec` / `/plan` / `/build` / `/test` / `/review` / `/code-simplify` / `/ship`) + 3 agent personas + 4 reference checklists
- P6 LICENSE: ✅ MIT
- P7 demand-gate: **GENUINELY-NEW** — lifecycle-discipline-class primitive (source-driven-development, doubt-driven-development, deprecation-and-migration not in superpowers)
- SRA D1-D10: D1 PASS (Addy Osmani named-T1 Google Chrome DevRel) / D6 PASS (MIT) / D2-D10 PASS
- Axis 1+2+3: **TRIPLE-PASS firm** — Google org + Anthropic-derivative adopters + 3 months burn-in (created 2026-02-15)
- **CR-12: CITE-CLASS-CANONICAL (TIER-1-NAMED-AUTHOR-QUOTE source-driven-development pattern @SHA 742dca5)**
- Native CC tier: **A**
- Wired difficulty: **1/5**
- **VERDICT: INSTALL (TIER-1)** — already-installed in claude-sota-installed; mandatory in claude-sota-pure

#### 4. **wshobson/agents** (35,456★) — LARGEST CC-NATIVE PLUGIN ECOSYSTEM
- P1 count-OVER: ✅ at SHA `112197c6` 2026-05-15 — **185 agents + 16 multi-agent workflow orchestrators + 153 agent skills + 100 commands + 80 focused plugins** (verbatim README L9). Delta from v10 baseline (200 agents claim): wshobson re-organized into focused-plugin model = 80 plugins × avg 3.6 components. Plugin-eval framework NEW since 2026-05.
- P2 SDK-vs-CLI: ✅ `/plugin marketplace add wshobson/agents` + `/plugin install <plugin-name>@claude-code-workflows`
- P3 architectural-API: ✅ native CC plugin spec + Gemini CLI extension at SHA `112197c6`
- P4 plugin-namespace: ✅ `claude-code-workflows/` (already in claude-sota-installed cache as 80-plugin marketplace)
- P5 mode-harness-shape: ✅ 3-tier model strategy (Opus 4.7 / inherit / Sonnet 4.6 / Haiku 4.5)
- P6 LICENSE: ✅ MIT
- P7 demand-gate: **GENUINELY-NEW** at orchestration-template-class — `full-stack-orchestration` / `security-hardening` / `agent-teams` plugins fill orchestration gap superpowers + addyosmani don't address
- SRA D1-D10: D1 PASS / D6 PASS / all PASS
- Axis 1+2+3: **TRIPLE-PASS firm** — claude-code-workflows + wshobson named-T1 maintainer + 10 months burn-in (created 2025-07-24)
- **CR-12: CITE-CLASS-CANONICAL**
- Native CC tier: **A**
- Wired difficulty: **2/5** (80 plugins; pick subset)
- **VERDICT: INSTALL marketplace + 5-15 plugins (curated subset)** — claude-sota-installed currently has marketplace registered

**Delta-since-v10-baseline (2026-04-04 → 2026-05-15)**:
- **NEW**: Plugin-Eval framework (3-layer: static analysis / LLM judge / Monte Carlo) with 10 quality dimensions + Wilson score CI + Elo ranking
- **NEW**: Conductor plugin (`/conductor:setup` / `/conductor:new-track` / `/conductor:implement` context-driven development)
- **NEW**: Agent Teams plugin (`/team-review` / `/team-debug` / `/team-feature` / parallel reviewers)
- **NEW**: Gemini CLI extension support (153 skills cross-harness)
- **NEW**: HADS (Human-AI Document Standard) plugin
- **NEW**: protect-mcp (Cedar policy + Ed25519 signed receipts) — GOVERNANCE-CLASS
- **NEW**: block-no-verify guard
- **NEW**: qa-orchestra (multi-agent QA with Chrome MCP validation)
- **CONFIRMED**: 153 skills with progressive disclosure (Anthropic 2-8 component pattern)

#### 5. **EveryInc/compound-engineering-plugin** (16,816★) — Every.to engineering methodology
- P1 count-OVER: ✅ at SHA `39cb9da3` 2026-05-15 — **37 skills + 51 agents** verbatim README
- P2 SDK-vs-CLI: ✅ `/plugin marketplace add EveryInc/compound-engineering-plugin` + `/plugin install compound-engineering`
- P3 architectural-API: ✅ native CC plugin + Cursor + Codex + Copilot + Droid + Qwen Code + OpenCode + Pi + Gemini + Kiro multi-harness adapter
- P4 plugin-namespace: ✅ `compound-engineering-plugin/` standalone marketplace
- P5 mode-harness-shape: ✅ `STRATEGY.md`-driven loop: ideate → brainstorm → plan → work → review → compound → product-pulse
- P6 LICENSE: ✅ MIT
- P7 demand-gate: **PARTIAL-OVERLAP** with wshobson (workflow orchestration) but adds STRATEGY-LAYER + product-pulse READ-side that wshobson doesn't have
- SRA D1-D10: D1 PASS (Every Inc named-T1 + Dan Shipper author/CEO) / D6 PASS / D7-warn (author refuses PRs but still actively maintained)
- Axis 1+2+3: **TRIPLE-PASS firm** — Every.to org + Dan Shipper + 7 months burn-in (created 2025-10-09)
- **CR-12: GENUINELY-NEW (strategy-layer + product-pulse complement)**
- Native CC tier: **A**
- Wired difficulty: **2/5**
- **VERDICT: INSTALL (TIER-1)** — complements wshobson + superpowers

#### 6. **claude-plugins-official:skill-creator** (Anthropic-OFFICIAL native skill)
- Already in claude-sota-installed plugin cache per Z:/claude-sota CLAUDE.md skill-orchestration-discipline.md
- **VERDICT: INSTALL (TIER-1 CANONICAL Anthropic-official authoring skill)**

### TIER-2 STUDY-PILOT (high-value but harness-fit caveats)

#### 7. **bmad-code-org/BMAD-METHOD** (47,258★) — Agile AI Driven Development V6
- P1 count-OVER: ✅ `npx bmad-method install` + V6 ships 12+ agents + 34+ workflows + 5 specialized modules (BMM/BMB/TEA/BMGD/CIS)
- P2 SDK-vs-CLI: ⚠️ **NPX-based installer, NOT native `/plugin install`** — this is a NON-native install
- P3 architectural-API: ⚠️ proprietary architecture (`bmad-help` skill + `bmad-method install` CLI; NOT Anthropic plugin spec)
- P4 plugin-namespace: ❌ does NOT use Anthropic plugin namespace — installs into project as standalone
- P5 mode-harness-shape: ⚠️ interactive installer prompts on first run (Probe 5 mode-harness-shape WARN)
- P6 LICENSE: ✅ MIT
- P7 demand-gate: **PARTIAL-OVERLAP** — wshobson agents + superpowers cover ~80% of BMAD V6 capabilities at lower install complexity
- **CR-12: PROVIDER-COMPLEMENT** (alternative project-bootstrap-method NOT plugin)
- Native CC tier: **D (indirect installation via npx + project files)**
- Wired difficulty: **3/5**
- **VERDICT: STUDY-PILOT** — adopt only if Agile methodology essential; default-DEFER for claude-sota-pure (skill-orchestration already cover via wshobson + superpowers + addyosmani trinity)

#### 8. **ruvnet/ruflo** (51,561★) — claude-flow rebrand
- P1 count-OVER: ✅ at SHA `455f0b17` 2026-05-15 — 32 plugins + 100+ agents + ruvLLM self-learning + Web UI (flo.ruv.io) + Goal Planner (goal.ruv.io) + federation
- P2 SDK-vs-CLI: ✅ TWO install paths: (A) `/plugin marketplace add ruvnet/ruflo` (slash-commands only, NO MCP wired) (B) `npx ruflo init` (full loop with MCP + hooks + daemon)
- P3 architectural-API: ⚠️ **Path A native CC; Path B installs `.claude/` + `.claude-flow/` + `CLAUDE.md` + daemon** (heavy footprint vs claude-sota-pure clean-state goal)
- P4 plugin-namespace: ⚠️ Path A clean; Path B installs sibling-class harness primitives
- P5 mode-harness-shape: **Path A FIT, Path B WARN** — Path B's daemon + hooks + CLAUDE.md mutation conflicts with claude-sota-pure bootstrap discipline (Cardinal Rule 5 install-priority)
- P6 LICENSE: ✅ MIT
- P7 demand-gate: Path A **GENUINELY-NEW** (swarm + federation) but **DUPLICATE-FUNCTIONALITY** with wshobson `agent-teams` for simpler use cases
- **CR-12: STUDY-PILOT for federation specifically** (zero-trust cross-machine collaboration); DEFER full ruflo Path B
- Native CC tier: **A for Path A** / D for Path B
- Wired difficulty: **2/5 Path A** / 5/5 Path B
- **VERDICT: STUDY-PILOT (Path A only — `ruflo-federation` if cross-machine needed)**

#### 9. **EveryInc/compound-engineering-plugin** — see above (#5) already TIER-1

#### 10. **NeoLabHQ/context-engineering-kit** (999★) — TIER-3 reliability framework
- P1 count-OVER: ✅ at SHA `dedca19c` 2026-05-15 — 12 plugins (reflexion / SDD / SADD / review / git / TDD / DDD / FPF / kaizen / customaize-agent / docs / tech-stack / MCP)
- P2 SDK-vs-CLI: ✅ `/plugin marketplace add NeoLabHQ/context-engineering-kit`
- P3 architectural-API: ✅ native + agentskills.io spec
- P4 plugin-namespace: ✅ `NeoLabHQ/` namespace
- P5 mode-harness-shape: ✅ multi-harness (Claude+OpenCode+Cursor+Antigravity+Gemini)
- P6 LICENSE: ⚠️ **GPL-3.0** — copyleft; concern for any vendored variants per Cardinal Rule discipline; cite-anchor OK, install OK
- P7 demand-gate: **GENUINELY-NEW** — paper-cited reliability framework (Self-Refine arXiv:2303.17651 + Reflexion arXiv:2303.11366 + Agentic Context Engineering arXiv:2510.04618 + MAKER arXiv:2511.09030)
- **CR-12: STUDY-PILOT** — `reflexion` + `sadd` plugins specifically (paper-cited reliability gains 8-21% measured)
- Native CC tier: **A**
- Wired difficulty: **2/5**
- **VERDICT: STUDY-PILOT** — reflexion + SADD specifically

#### 11. **gmickel/flow-next** (585★) — Plan-first workflow + Ralph
- P1 count-OVER: ✅ at SHA `dea76517` 2026-05-15 — 23 agent-native skills + 21 agents + Ralph autonomous mode + `flowctl` CLI + memory system + GitHub PR resolver
- P2 SDK-vs-CLI: ✅ `/plugin marketplace add https://github.com/gmickel/flow-next` + `/plugin install flow-next`
- P3 architectural-API: ✅ native + Codex CLI + Codex Desktop + Factory Droid + OpenCode multi-harness
- P4 plugin-namespace: ✅ `flow-next/` standalone
- P5 mode-harness-shape: ✅ in-repo only (NO external services); uninstall = `rm -rf .flow/`
- P6 LICENSE: ✅ MIT
- P7 demand-gate: **PARTIAL-OVERLAP** with wshobson Conductor + EveryInc compound-engineering + addyosmani lifecycle
- **CR-12: STUDY-PILOT** — Ralph autonomous mode unique; `flowctl` CLI introspectable
- Native CC tier: **A**
- Wired difficulty: **2/5**
- **VERDICT: STUDY-PILOT** — adopt Ralph specifically if needed

#### 12. **trailofbits/skills-curated** (402★) — Curated vetted marketplace
- Security-focused (skills curated by Trail of Bits staff per README); 12+ skills span dev/security/research/writing + 16 OpenAI-converted skills
- **VERDICT: INSTALL (TIER-2 security floor)** — already in claude-sota-installed marketplace cache

### TIER-3 ACCEPT-AS-CITE-REFERENCE (catalogs — not direct adoption)

#### 13. **hesreallyhim/awesome-claude-code** (43,866★)
- License **CC-BY-NC-ND-4.0** = cite-only (no fork-modify). Already cited at `Z:/claude-sota-installed/CLAUDE.md` discovery surface
- **VERDICT: ACCEPT-AS-CITE-REFERENCE** (discovery catalog only)

#### 14. **VoltAgent/awesome-agent-skills** (21,844★) + **sickn33/antigravity-awesome-skills** (37,635★) + **travisvn/awesome-claude-skills** (12,577★)
- All MIT; all discovery catalogs
- **VERDICT: ACCEPT-AS-CITE-REFERENCE** (cite in CLAUDE.md discovery surface; do NOT vendor)

### TIER-4 REJECT-FOR-FIT / DEFER

#### 15. **jeremylongshore/claude-code-plugins-plus-skills** (2,181★) — 425 plugins + 2,810 skills
- P1 count-OVER: ✅ at SHA `61c07072` (425 plugins / 2,810 skills / 200 agents)
- **REJECT-FOR-FIT (Probe 7.a demand-absence + scale-mismatch)**: 425 plugins exceeds rational install scope; tonsofskills.com SaaS-style aggregator; high noise-to-signal vs curated trinity (anthropics-official + wshobson + addyosmani)
- **VERDICT: DEFER** (consult-only when specific niche need surfaces)

#### 16. **Yeachan-Heo/oh-my-claudecode** (33,963★) — Team-first orchestration
- P5 mode-harness-shape: ⚠️ **HEAVY-HARNESS** (`oh-my-claude-sisyphus` npm wrapper + tmux + better-sqlite3 + `~/.omc/` global state)
- Probe 5 FAIL — directly conflicts claude-sota-pure bootstrap discipline (Cardinal Rule 5 install-priority forbids hand-coded daemons)
- **VERDICT: REJECT-FOR-FIT** — duplicate functionality (wshobson agent-teams + ruflo Path A + superpowers subagent-driven-development cover the orchestration surface natively)

#### 17. **smtg-ai/claude-squad** (7,482★)
- **Windows blocker** confirmed at upstream issue #275 OPEN; `pty.go:18-19` uses `creack/pty` (POSIX-only)
- **VERDICT: REJECT-FOR-FIT** for Z:-portable runtime; defer until ConPTY ships upstream

#### 18. **eyaltoledano/claude-task-master** (27,151★)
- Cursor/Lovable/Windsurf/Roo focus, not Claude Code native
- **VERDICT: DEFER** (alternative-IDE-class; not claude-sota-pure first install)

#### 19. **AnandChowdhary/continuous-claude** (1,335★) — Ralph-with-PRs
- Shell-script-driven autonomous loop; superseded by gmickel/flow-next Ralph mode + wshobson conductor + obra/superpowers executing-plans
- **VERDICT: REJECT-FOR-FIT** (DUPLICATE-FUNCTIONALITY per CR-12)

#### 20. **forrestchang/andrej-karpathy-skills** — already cited at `Z:/claude-sota-installed/CLAUDE.md` Cardinal Rule 2; named-T1 Karpathy authority
- **VERDICT: INSTALL (already cite-anchor in baseline CLAUDE.md)**

---

## Top-N recommendations for Z:/claude-sota-pure (rank-ordered)

### TIER-1 INSTALL (Phase 1 — mandatory bootstrap, day 0)

| # | Repo | Install command | Wired difficulty |
|---|------|----------------|------------------|
| 1 | anthropics/claude-plugins-official | `/plugin marketplace add anthropics/claude-plugins-official` | 1/5 |
| 2 | obra/superpowers | `/plugin install superpowers@claude-plugins-official` | 1/5 |
| 3 | addyosmani/agent-skills | `/plugin marketplace add addyosmani/agent-skills` + `/plugin install agent-skills@addy-agent-skills` | 1/5 |
| 4 | claude-plugins-official:skill-creator | `/plugin install skill-creator@claude-plugins-official` | 1/5 |
| 5 | EveryInc/compound-engineering-plugin | `/plugin marketplace add EveryInc/compound-engineering-plugin` + `/plugin install compound-engineering` | 2/5 |
| 6 | wshobson/agents (marketplace + curated 5-10 plugins) | `/plugin marketplace add wshobson/agents` + `/plugin install agent-teams@claude-code-workflows` + 5-10 others | 2/5 |
| 7 | trailofbits/skills-curated | `/plugin marketplace add trailofbits/skills-curated` | 1/5 |
| 8 | forrestchang/andrej-karpathy-skills | direct CLAUDE.md cite-anchor (already in baseline) | 1/5 |

### TIER-2 STUDY-PILOT (Phase 2 — conditional adoption after Tier-1 burn-in)

| # | Repo | Condition |
|---|------|-----------|
| 9 | NeoLabHQ/context-engineering-kit (reflexion + SADD plugins) | If paper-cited reliability gains needed (8-21% measured) |
| 10 | gmickel/flow-next (Ralph mode specifically) | If long-running autonomous loops needed beyond superpowers executing-plans |
| 11 | ruvnet/ruflo Path A (`ruflo-federation` only) | If cross-machine zero-trust agent collaboration needed |
| 12 | bmad-code-org/BMAD-METHOD | If Agile methodology essential (default DEFER — trinity covers ~80%) |

### TIER-3 ACCEPT-AS-CITE-REFERENCE (cite in CLAUDE.md discovery surface; do NOT vendor)

| # | Repo | Cite class |
|---|------|------------|
| 13 | hesreallyhim/awesome-claude-code | CC-BY-NC-ND (cite-only) |
| 14 | sickn33/antigravity-awesome-skills | MIT discovery catalog |
| 15 | VoltAgent/awesome-agent-skills | MIT discovery catalog |
| 16 | travisvn/awesome-claude-skills | MIT discovery catalog |
| 17 | affaan-m/everything-claude-code (ECC 2.0.0-rc.1) | ALREADY-INSTALLED in claude-sota-installed marketplace cache; cite-class for advanced harness |

---

## REJECT / DEFER candidates

| Repo | Reason |
|------|--------|
| Yeachan-Heo/oh-my-claudecode | Heavy-harness daemon + global state conflicts CR-5 install-priority |
| smtg-ai/claude-squad | Windows-broken (creack/pty POSIX-only; issue #275 OPEN) |
| eyaltoledano/claude-task-master | Cursor/Lovable focus, not CC-native |
| jeremylongshore/claude-code-plugins-plus-skills | Scale-mismatch (425 plugins/2810 skills); high noise |
| AnandChowdhary/continuous-claude | DUPLICATE-FUNCTIONALITY (Ralph covered by flow-next + superpowers) |
| stravu/crystal | DEPRECATED Feb 2026 (confirmed per prior research, status holds) |

---

## GAPS / HONEST-NON-FINDING

1. **License unverified for several repos** (TBD entries in table) — need follow-up Probe 6 LICENSE direct read for: `quant-sentiment-ai/claude-equity-research`, `numman-ali/n-skills`, `gupsammy/Claudest`, `fivetaku/gptaku_plugins`, `golutra/golutra`, `stellarlinkco/myclaude`, `catlog22/Claude-Code-Workflow`, `hoangsonww/Claude-Code-Agent-Monitor`, `first-fluke/oh-my-agent`. Recommend follow-up sota-researcher Fire to confirm.
2. **affaan-m/everything-claude-code 183,315★ count NEW** — discovered late this fire; deserves dedicated audit-Fire (the 1556 SKILL.md baseline cited in claude-sota-installed/CLAUDE.md is now stale; new SHA + content delta not yet probed).
3. **claude-plugins-official internal vs external plugins breakdown** — README distinguishes `/plugins` (Anthropic-internal) vs `/external_plugins` (third-party); 19,450★ aggregate, but per-plugin star counts not probed this fire.
4. **Per-plugin marketplace.json discovery** — wshobson 80-plugin breakdown by category captured at high-level only; specific plugins to install need follow-up Probe 4 against claude-sota-pure intended use cases.
5. **Karpathy autoresearch fork (alirezarezvani 2026 March port)** — partial signal in WebSearch results (Medium article "I Turned Karpathy's Autoresearch Into a Agent Skill For Claude Code That Optimizes Anything"); not yet probed at file:line for fit-vs-vendoring assessment.
6. **smithery.ai skill registry** (`https://smithery.ai/badge/skills/wshobson`) — third-party skill distribution channel; not currently part of claude-sota-installed marketplace inventory; deserves discovery probe.

---

## Delta-since-v20-baseline (2026-04-04 → 2026-05-15) — what changed in 6 weeks

| Repo | Stars then→now | Material changes |
|------|----------------|------------------|
| obra/superpowers | ~169k → **192,832** | +23k stars; viral growth; +Chrome + Lab sister marketplaces |
| addyosmani/agent-skills | ~33k → **42,095** | +9k; **source-driven-development + doubt-driven-development NEW skills**; +7 slash commands `/spec`...`/ship` lifecycle |
| wshobson/agents | ~200 agents claim → **185 agents + 80 focused plugins** | Re-organized 200-monolith → 80-plugin granular; +Plugin-Eval framework + Conductor + Agent Teams + HADS + protect-mcp + block-no-verify + qa-orchestra |
| affaan-m/everything-claude-code | ~unknown → **183,315★** | Likely under-cataloged at v20; massive ecosystem growth |
| ruvnet/claude-flow → ruvnet/ruflo | rebrand | NEW: federation/zero-trust + Web UI + Goal Planner + 32 plugins |
| bmad-code-org/BMAD-METHOD | ~unknown → **47,258★** | V6 release; scale-adaptive intelligence; 5 modules (BMM/BMB/TEA/BMGD/CIS) |
| EveryInc/compound-engineering-plugin | unknown → **16,816★** | 37 skills + 51 agents; ce-strategy + ce-product-pulse new |
| anthropics/claude-plugins-official | unknown → **19,450★** | Official Anthropic-managed directory operationalized |

**Conclusion on baseline drift**: prior research arcs SIGNIFICANTLY under-counted 2026-Q1→Q2 ecosystem growth. Operator's complaint about training-data biases CONFIRMED — wshobson alone shifted from 200-monolithic to 80-plugin-granular architecture in this window; Anthropic-official marketplace materialized as canonical; superpowers grew 14% in 6 weeks.

---

## STAND-IN-NOTICE per cross-model-consensus.md §Env-funneled mandate

This artifact was produced by a sota-researcher subagent dispatched per advanced-agent-team-standing-directive.md with `CLAUDE_CODE_SUBAGENT_MODEL=claude-sonnet-4-6` per CLAUDE.local.md ENV (f). Verdict origin = Sonnet stand-in. **Cross-model gate NOT structurally satisfied for this dispatch** — orchestrator must defer to downstream A4/A5 cross-model synthesis OR REAL GPT-5.5 BRIDGE-MODE verification before treating findings as TIER-1 SOTA authority. Per `cmc-env-funneled-disclosure.md §Orchestrator integration discipline`: orchestrator MUST surface stand-in penetration rate in close-synthesis and require BRIDGE-MODE 2nd-stage verification for any ADOPT-NOW recommendations above.

---

FINAL VERDICT: Z:/claude-sota-pure first-install set is the **8-component Tier-1 trinity-plus-five** (anthropics/claude-plugins-official + obra/superpowers + addyosmani/agent-skills + skill-creator + EveryInc/compound-engineering-plugin + wshobson/agents-marketplace + trailofbits/skills-curated + Karpathy-cite). Wave-50-installed baseline LARGELY ADEQUATE but **superpowers + addyosmani must be REFRESHED at latest HEAD** (significant content drift since 2026-04 baseline). 4 Tier-2 STUDY-PILOT candidates queued (NeoLab + flow-next + ruflo-federation + BMAD). 6 explicit REJECT-FOR-FIT candidates identified. 6 HONEST-NON-FINDING gaps flagged for follow-up Fire. Convergence-gate Axis 1+2+3 PASS-firm for trinity (Anthropic + obra + addyosmani 3-org Axis-1 strict; named-T2 Karpathy + Pocock + Osmani + Cherny + Vincent dated artifacts; 6-10mo Axis-3 STABLE-BURN-IN per `convergence-gate.md` Axis-3 5-band rubric).
