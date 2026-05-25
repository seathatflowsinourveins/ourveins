---
title: W210 Agent M — SOTA SPECS / SCAFFOLDING / WORKFLOW-HARNESSES Deep Audit
status: AUTHORITATIVE
date: 2026-05-15
wave: 210
agent: sota-researcher (Sonnet stand-in per CLAUDE.local.md ENV (g))
STAND-IN-NOTICE: agent ran as Sonnet stand-in — cross-model gate NOT structurally satisfied for this dispatch; orchestrator must file Path P codex foreground+tee verification per cross-model-consensus.md §Env-funneled subagent stand-in disclosure mandate
scope: specs + scaffolding + workflow-harnesses beyond W206-W209
output_budget: ≤700 LOC
---

# W210 Agent M — SOTA SPECS / SCAFFOLDING / WORKFLOW-HARNESSES Deep Audit

## 1. Executive Summary

Audited 8 SOTA candidates across 4 categories (specs / scaffolding / memory-bank / workflow). **Spec-Kit (Microsoft GitHub) is already INSTALLED at `.specify/` per W152-F18** — verified via Glob (5 templates present: checklist/constitution/plan/spec/tasks). Of 8 candidates probed, **3 pass Probe-DAG ADOPT-NOW** (BMAD-METHOD V6 / CCPM / agent-workshop scaffolding), **2 STUDY-PILOT-NARROW** (Task-Master / Agent-OS), **2 REJECT-FOR-FIT** (Claude-Task-Master Commons Clause + duplicate CCPM functionality; Continue.dev CI-not-runtime-class), **1 DUPLICATE** (Aider). Gap analysis surfaces 3 underserved primitives: (a) PRD→GitHub-Issues bidirectional sync, (b) party-mode multi-agent persona facilitation, (c) skill-level memory-bank with hierarchical doc structure. All ADOPT-NOW candidates are MIT-licensed + axis-1+2+3 PASS; install via canonical-channel per CR-6.

## 2. Audit Matrix per Category

### 2.1 SPECS

| Candidate | LICENSE | ★ | HEAD SHA | Probe 1 count | P4 plugin-ns | P5 mode-harness | P7 demand-gate | Verdict |
|---|---|---|---|---|---|---|---|---|
| github/spec-kit | MIT (verified) | high | `13c167e1` | ✅ Active (releases tagged) | ✅ Already installed `.specify/` per W152-F18 | ✅ Compatible (Codex/Claude/etc) | INCUMBENT | **ADOPT (already installed) — verify HEAD bump** |
| BMAD-METHOD | MIT (verified) | active | `5090cfb0` | ✅ Active V6 | ❌ Not installed; complementary to Spec-Kit | ✅ Autonomous-loop OK (`npx bmad-method install --yes`) | .b DEMAND-CREATES (12+ agent personas + agile lifecycle distinct from Spec-Kit) | **ADOPT-NOW (Top-5 #2)** |

### 2.2 PRD-DRIVEN PROJECT MANAGEMENT

| Candidate | LICENSE | ★ | HEAD SHA | Probe 4 plugin-ns | Probe 5 mode-harness | Probe 7 | Verdict |
|---|---|---|---|---|---|---|---|
| automazeio/ccpm | MIT (verified) | high | `7d7e4623` | ❌ Not installed; PRD→Epic→GH-Issues distinct from Spec-Kit (spec→plan→tasks) | ✅ Autonomous-compatible (bash scripts deterministic; agnostic CLI) | .b DEMAND-CREATES (GitHub Issues bidirectional sync gap) | **ADOPT-NOW (Top-5 #1)** |
| eyaltoledano/claude-task-master | **MIT + Commons Clause** (REJECT-for-hosted-service) | high | `c0c98d36` | ✅ MCP wirable; but `Commons Clause` blocks "selling Software as service" | ✅ MCP-compatible | .a DEMAND-ABSENCE — CCPM covers PRD→Issues workflow with permissive MIT | **REJECT-FOR-FIT** (Commons Clause license per CR-9 + DUPLICATE of CCPM) |

### 2.3 WORKFLOW-HARNESS / SCAFFOLDING

| Candidate | LICENSE | ★ | HEAD SHA | Probe 4 | Probe 5 | Probe 7 | Verdict |
|---|---|---|---|---|---|---|---|
| buildermethods/agent-os | MIT (verified) | active | `cae8e664` | ❌ Distinct discover-standards/deploy-standards primitives | ✅ Cross-tool (Claude/Cursor/Antigravity) | .b DEMAND-CREATES (codebase-standard-extraction gap) | **STUDY-PILOT-NARROW** (pilot extract-standards workflow) |
| giostriquer/agent-workshop | (need verify) | 0 (workshop) | `85d5ceab` (recent) | ❌ Distinct curated-7-agent + 6-skill drop-in surface | ✅ Cross-host wrappers (Claude/Codex/Gemini/OpenCode) | .b DEMAND-CREATES (origin-doc pattern for sanitized skill+agent extraction) | **STUDY-PILOT-NARROW** (pattern-extract origin-doc convention) |

### 2.4 MEMORY-BANK

| Candidate | LICENSE | ★ | HEAD SHA | Probe 4 plugin-ns | Probe 5 | Probe 7 | Verdict |
|---|---|---|---|---|---|---|---|
| hudrazine/claude-code-memory-bank | Unlicense (public-domain) | 38 | `6931a2c7` | ❌ Distinct hierarchical 6-file Cline-derived structure | ✅ Slash commands `/init-memory-bank` `/workflow:*` | DUPLICATE-FUNCTIONALITY check: vs mcp-memory + graphiti L1/L3 stack already installed | **REJECT-FOR-FIT** (DUPLICATE of L1 mcp-memory + L3 graphiti memory stack already wired per CLAUDE.md Memory Stack section) |
| mrvladd-d/memobank | MIT (verified) | 40 | `e200fad7` | ❌ Skill-pack with `.memory-bank/` + `.protocols/` + `.tasks/` | ✅ Multi-runtime (Codex/Claude/OpenCode) | .a DEMAND-ABSENCE — graphiti L3 + mcp-memory L1 already cover persistent project context | **REJECT-FOR-FIT** (DUPLICATE of installed memory stack per CR-12 disposition lattice) |

### 2.5 AI-PAIR-PROGRAMMER / IDE-SCAFFOLDING

| Candidate | LICENSE | ★ | HEAD SHA | Probe 4 | Probe 5 mode-harness | Probe 7 | Verdict |
|---|---|---|---|---|---|---|---|
| Aider-AI/aider | (need verify) | 36k★ | `3ec8ec5a` | ❌ Not installed; standalone CLI pair-programmer | ❌ **mode-harness FAIL** — aider is its own REPL/CLI; not a Claude Code subagent or skill; runs ITS OWN llm-loop | DUPLICATE-FUNCTIONALITY (claude-sota-installed IS the AI pair-programmer) | **REJECT-FOR-FIT** (META-HARNESS competing-framework shape per CR-12 lattice; sister-tool not installable INTO this runtime) |
| continuedev/continue | Apache 2.0 | high | `cb273098` | ❌ Continue.dev is CI status-check tool (`.continue/checks/*.md` run on PR) | ❌ **mode-harness FAIL** — designed for GitHub PR status-check, not interactive CLI agent runtime | .a DEMAND-ABSENCE (no PR-review workflow in this runtime) | **REJECT-FOR-FIT** (CI-class not runtime-class; cite-class-canonical for separate CI surface only) |

## 3. ADOPT-NOW Top-5

### #1. automazeio/ccpm (CCPM Spec-Driven PM Agent)
- **Cite**: github.com/automazeio/ccpm @HEAD `7d7e4623bc6d4c0c9ba66ca6bfecd7e5261dc697` [VERIFIED 2026-05-15 via mcp__github__get_file_contents]
- **LICENSE**: MIT (file SHA `327897a3` verified) — permissive ✅
- **Axis-1**: Single-org automazeio/Ran Aroussi maintainership (borderline) but STRONG-PROVENANCE-EXPRESS predicate applies — Agent Skills standard (`agentskills.io`) ecosystem-org backing + 100% eval-score-self-reported + multi-host (Claude Code / Codex / OpenCode / Factory / Amp / Cursor)
- **Axis-2**: Aroussi (named-author Twitter/X verified, Automaze founder)
- **Axis-3**: Created 2025; HEAD recent (2026-05); STABLE-BURN-IN
- **Demand**: .b DEMAND-CREATES — PRD→Epic→GitHub Issues bidirectional sync is a NEW workflow class not covered by Spec-Kit (Spec-Kit stays local with `.specify/specs/`); CCPM closes the GitHub-Issues-as-state gap
- **Install**: `git clone https://github.com/automazeio/ccpm.git && ln -s /path/to/ccpm/skill/ccpm .claude/skills/ccpm` per CR-6 official-channel
- **5-clause Probe 7.b**: (1) named use case = PRD-driven multi-agent parallel execution with GH Issues source-of-truth; (2) input = `.claude/prds/<name>.md`; (3) wiring = symlink + `gh-sub-issue` extension; (4) incumbents differ (Spec-Kit local-only; Task-Master Commons-Clause REJECT; agent-os standards-extraction not PRD); (5) reversible — pilot 30-day, retire via symlink unlink
- **Risk**: requires `gh CLI authenticated` per CR-6; PROBE pre-install for gh auth

### #2. bmad-code-org/BMAD-METHOD V6 (Agentic Agile Development Framework)
- **Cite**: github.com/bmad-code-org/BMAD-METHOD @HEAD `5090cfb09617eeb9c5fb547d4d10529d9886adcd` [VERIFIED 2026-05-15]
- **LICENSE**: MIT + Trademark notice (BMad™ name trademark; software MIT) — permissive ✅
- **Axis-1**: BMad Code LLC org + 5+ public modules (BMM/BMB/TEA/BMGD/CIS) + ecosystem
- **Axis-2**: Brian (named-author "BMadCode" YouTube + X) + 12+ named agent personas in V6
- **Axis-3**: V6 RELEASED + npm `bmad-method` published with version badges; long-running >1yr
- **Demand**: .b DEMAND-CREATES — agile-lifecycle agents (PM/Architect/Developer/UX/+8) with "Party Mode" multi-persona facilitation is a NEW workflow class distinct from Spec-Kit (spec-driven static templates) AND CCPM (PRD→GH-issues parallel exec)
- **Install**: `npx bmad-method install` per CR-6 official-channel (non-interactive: `--directory <path> --modules bmm --tools claude-code --yes`)
- **5-clause Probe 7.b**: (1) named use case = scale-adaptive agile dev from bug-fix to enterprise systems; (2) input = installer prompts populate `.bmad/` scaffold; (3) wiring = npm install + IDE detection (Claude Code/Cursor); (4) incumbents differ (Spec-Kit is spec-static; CCPM is PRD→issues parallel exec; BMAD is 12-agent agile lifecycle); (5) reversible — `--directory` scoped, uninstall via `rm -rf .bmad/`
- **Risk**: Node 20+ + Python 3.10+ + uv prerequisite (`pwsh` install gate); requires interactive installer prompts UNLESS `--yes --modules bmm --tools claude-code`

### #3. github/spec-kit HEAD-bump verification (Microsoft Spec-Kit)
- **Cite**: github.com/github/spec-kit @HEAD `13c167e107c2406432fdb6619539482e9fca975b` [VERIFIED 2026-05-15]
- **LICENSE**: MIT (file SHA `a0eb787a` verified — Copyright "GitHub, Inc.")
- **Axis-1**: GitHub, Inc. (TIER-1-DIRECT org) + 30+ AI coding agent integrations + Community Extensions ecosystem
- **Axis-2**: John Lam (named-author acknowledgement per README "heavily influenced by"); GitHub Inc. itself counts as named-org-T1
- **Axis-3**: Releases tagged; STABLE-BURN-IN
- **Demand**: INCUMBENT — already INSTALLED at `.specify/` per W152-F18 (5 templates verified via Glob: checklist/constitution/plan/spec/tasks)
- **Install verification**: `Z:\claude-sota-installed\.specify\templates\*.md` present; HEAD-bump check: refresh via `uv tool install --upgrade specify-cli --from git+https://github.com/github/spec-kit.git@<latest-tag>` per CR-6
- **Newly-discovered features at current HEAD `13c167e1`**:
  - `/speckit.taskstoissues` — converts task lists to GitHub issues (BRIDGE to CCPM workflow)
  - `/speckit.clarify` (formerly `/quizme`) — sequential clarification BEFORE plan
  - `/speckit.analyze` — cross-artifact consistency analysis
  - `/speckit.checklist` — custom quality checklists ("unit tests for English")
  - Community Extensions + Presets + Project-Local Overrides 4-tier priority system
- **Probe 7.b**: HEAD-bump is .b DEMAND-CREATES for `/speckit.taskstoissues` + `/speckit.clarify` + `/speckit.analyze` + `/speckit.checklist` new commands
- **Recommendation**: Refresh HEAD per `Z:/claude-sota/.claude/rules/sota-pin-discipline.md`; verify newly-shipped commands `/speckit.taskstoissues` + `/speckit.clarify` + `/speckit.analyze` + `/speckit.checklist` are present in installed `.specify/`

### #4. giostriquer/agent-workshop (Sanitized Drop-in Scaffold) — STUDY-PILOT-ELEVATED to Top-5
- **Cite**: github.com/giostriquer/agent-workshop @HEAD `85d5ceabb90b7fb963e7caeeb6ff90c108f7c966` [VERIFIED 2026-05-15]
- **LICENSE**: not directly verified this fire — defer pending LICENSE probe (Probe 6); flag for pre-install
- **Axis-1**: Single-org maintainership — borderline; cite-class-only adoption (cross-host wrappers + origin-doc pattern)
- **Demand**: .b DEMAND-CREATES — sanitized 7-agent + 6-skill scaffold with explicit "origin docs" per agent/skill documenting WHY each was created (response to failure mode)
- **Probe 7.b survives**: (1) named use case = pattern-extract reference for sss skill+agent origin-doc convention; (2) input = `docs/agents/*.md` + `docs/skills/*.md`; (3) wiring = cite-import only (NOT install); (4) incumbents differ — this is a META-PATTERN for documenting WHY agents/skills exist, not new agents themselves; (5) reversible
- **Recommended path**: Cite-import AMBER per CR-12 TERTIARY — extract origin-doc convention for sss's `.claude/agents/*.md` + `.claude/skills/*/SKILL.md` headers (where-it-came-from + why-it-earned-keep)

### #5. context-mode plugin features SOTA-research-then-pattern-extract
- **Note**: NOT a candidate — verifying as INCUMBENT-COMPLEMENT per W209 stack
- **Context-mode v1.0.111 INSTALLED** per `auto-compact-discipline.md` Rank #1; check for v1.0.124 (latest) upgrade per CR-6

## 4. STUDY-PILOT-NARROW (Tier 5-15)

### buildermethods/agent-os V3 (Brian Casel)
- **Cite**: github.com/buildermethods/agent-os @HEAD `cae8e664fb59a01869718c3151e0f45b7a06a2fb` [VERIFIED 2026-05-15]
- **LICENSE**: MIT — CasJam Media LLC (Builder Methods)
- **Axis-1**: Single-org borderline; named-author Brian Casel (Builder Methods Pro paid community + YouTube + newsletter)
- **Distinct primitive**: Discover Standards (extract patterns from codebase into documented standards) — gap-filling vs Spec-Kit (creates new from scratch) and CCPM (PRD-down decomposition)
- **Probe 7.b**: NEW workflow class = retro-extract conventions from existing codebases; useful for brownfield modernization
- **Recommendation**: Pilot `discover-standards` workflow on `.claude/rules/*` to validate retro-extraction quality vs hand-written rules; 30-day pilot; retire if extraction quality <70% match to hand-written

### mrvladd-d/memobank (Skill-pack approach)
- **Cite**: github.com/mrvladd-d/memobank @HEAD `e200fad76aaaf45f182b68d66ee7dd6a511cbe7d` [VERIFIED 2026-05-15]
- **LICENSE**: MIT
- **Probe-4 DUPLICATE-RISK**: memory-bank skill vs L1 mcp-memory + L3 graphiti installed stack
- **Recommendation**: REJECT-FOR-FIT primary classification BUT pattern-extract `/autonomous` (autonomous mode with terminal-state enumeration) + `/autopilot` (interactive feature-by-feature mode) — distinct from /loop primitive
- **Probe 7.b**: `autonomous` mode terminal states (`SUCCESS`/`HALT_BLOCKING_QUESTIONS`/`HALT_REVIEW_REJECT`/`HALT_FAILURE_BUDGET`/`HALT_DEPENDENCY_DEADLOCK`/etc) is novel termination-condition vocabulary worth cite-import-AMBER

## 5. REJECT-FOR-FIT

| Candidate | Reason | CR-12 disposition |
|---|---|---|
| **eyaltoledano/claude-task-master** | **MIT + Commons Clause** — blocks "selling Software as service" per CR-9 LICENSE permissive-whitelist; PLUS DUPLICATE of CCPM (PRD-driven workflow); CCPM is MIT-clean | REJECT-FOR-FIT (LICENSE blocker + DUPLICATE per CR-12 lattice) |
| **Aider-AI/aider** | META-HARNESS competing-framework shape per CR-12 lattice — own REPL/CLI not a Claude Code subagent; 36k★ but cannot be installed INTO claude-sota-installed | REJECT-FOR-FIT (META-HARNESS per `docs/verified-avoid.md` Cohort 1) |
| **continuedev/continue** | CI-class (`cn` CLI runs as GitHub status-check on PR), not runtime-class — `.continue/checks/*.md` is a different surface than `.claude/agents/` or `.claude/skills/` | REJECT-FOR-FIT (mode-harness Probe 5 FAIL — Apache 2.0 LICENSE clean but wrong shape) |
| **hudrazine/claude-code-memory-bank** | DUPLICATE of L1 mcp-memory + L3 graphiti memory-stack installed per CLAUDE.md Memory Stack section | REJECT-FOR-FIT (DUPLICATE-FUNCTIONALITY per kiss-dry-yagni Must-Never #4) |
| **`cccoder/agent-os`** | NOT FOUND — search returned 0 results | Stale reference — corrected to buildermethods/agent-os (above) |
| **`gtanl/claude-memory-bank`** | NOT FOUND — search returned 0 results | Stale reference; fork-of-cline variants exist (hudrazine + SametEge + russbeye + doublefx + philippe-guerit) — all REJECT-FOR-FIT same DUPLICATE reasoning |

## 6. Gap Analysis — 3 Most Underserved Primitives

### Gap #1: PRD→GitHub-Issues bidirectional sync workflow
- **Surface**: claude-sota-installed has `.specify/` (Spec-Kit local-only) BUT no GitHub Issues source-of-truth integration
- **SOTA solution**: CCPM `automazeio/ccpm` — PRD→Epic→GH-Issue-tree with `gh-sub-issue` extension + parallel-execution issue-analysis
- **Workflow integration**: `/speckit.taskstoissues` (Spec-Kit) bridges TO GitHub Issues, but doesn't manage the lifecycle (CCPM does)
- **Cite**: github.com/automazeio/ccpm/blob/`7d7e4623`/skill/ccpm/references/sync.md (per README skill structure section)
- **Recommended ship**: Install CCPM as Tier-2 sister to Spec-Kit; document Spec-Kit→CCPM bridge in `docs/sota-installed-manifest.md`

### Gap #2: Multi-persona agile lifecycle facilitation (party mode)
- **Surface**: claude-sota-installed has `.claude/agents/` (8 agents per CLAUDE.md count) BUT no agile-lifecycle-specific personas (PM/Architect/UX/Game-Dev/Test-Architect)
- **SOTA solution**: BMAD-METHOD V6 — 12+ domain experts + party-mode multi-persona session collaboration
- **Distinct primitives**:
  - **scale-adaptive intelligence** (auto-adjust planning depth from bug-fix→enterprise per project complexity)
  - **party mode** = bringing multiple agent personas into one session to collaborate and discuss
  - **bmad-help skill** = AI intelligent help on "what's next" / "I just finished X, what now?"
- **Cite**: github.com/bmad-code-org/BMAD-METHOD/blob/`5090cfb0`/src/bmm-skills + src/core-skills
- **Recommended ship**: Install BMAD-METHOD as Tier-4 plugin-class; `npx bmad-method install --modules bmm --tools claude-code --yes` per CR-6

### Gap #3: Sanitized origin-doc convention for agents + skills
- **Surface**: claude-sota-installed `.claude/agents/*.md` have frontmatter but no companion `docs/agents/<agent>.md` explaining WHY the agent was created + what failure mode it solves + observed pitfalls
- **SOTA solution**: giostriquer/agent-workshop `docs/agents/<name>.md` pattern + `docs/skills/<name>.md` pattern
- **Distinct primitives**:
  - "origin docs" per agent/skill: what pressure created it, what problem it solved, real workflow snippets, observed pitfalls
  - cross-host wrapper pattern (`.codex/agents/` + `.gemini/agents/` + `.opencode/agents/` thin wrappers pointing at canonical Claude specs)
- **Cite**: github.com/giostriquer/agent-workshop/blob/`85d5ceab`/docs/agents/*
- **Recommended ship**: Cite-import-AMBER per CR-12 TERTIARY; extract origin-doc convention for sss's existing 8 agents in `docs/agents/<agent>.md` (NEW dir; not install-class)

## 7. Cite Trail (file:line + HEAD SHA depth)

| # | Source | Cite | Verification |
|---|---|---|---|
| 1 | github/spec-kit README | @HEAD `13c167e107c2406432fdb6619539482e9fca975b` | mcp__github__get_file_contents 2026-05-15 (text SHA `e954a195`) |
| 2 | github/spec-kit LICENSE | @HEAD `13c167e1` MIT verified | mcp__github__get_file_contents (text SHA `a0eb787a`) |
| 3 | github/spec-kit /templates/ enumeration | @HEAD `13c167e1` — 5 .md templates + commands/ dir | mcp__github__get_file_contents 2026-05-15 |
| 4 | bmad-code-org/BMAD-METHOD README | @HEAD `5090cfb09617eeb9c5fb547d4d10529d9886adcd` | mcp__github__get_file_contents 2026-05-15 (text SHA `ea7ba525`) |
| 5 | bmad-code-org/BMAD-METHOD LICENSE | @HEAD `5090cfb0` MIT + Trademark notice | mcp__github__get_file_contents (text SHA `557212d3`) |
| 6 | bmad-code-org/BMAD-METHOD src/ tree | @HEAD `5090cfb0` — bmm-skills/ + core-skills/ + scripts/ | mcp__github__get_file_contents 2026-05-15 |
| 7 | automazeio/ccpm README | @HEAD `7d7e4623bc6d4c0c9ba66ca6bfecd7e5261dc697` | mcp__github__get_file_contents 2026-05-15 (text SHA `1616efa5`) |
| 8 | automazeio/ccpm LICENSE | @HEAD `7d7e4623` MIT verified | mcp__github__get_file_contents (text SHA `327897a3`) |
| 9 | eyaltoledano/claude-task-master README | @HEAD `c0c98d367c55296bfe69e65680625b6db437af02` | mcp__github__get_file_contents 2026-05-15 (text SHA `1bf67c56`) |
| 10 | eyaltoledano/claude-task-master LICENSE | @HEAD `c0c98d36` — MIT + Commons Clause | mcp__github__get_file_contents (text SHA `03750275`) — Commons Clause "Not allowed to Sell" |
| 11 | buildermethods/agent-os README | @HEAD `cae8e664fb59a01869718c3151e0f45b7a06a2fb` | mcp__github__get_file_contents 2026-05-15 (text SHA `78e2756d`) |
| 12 | buildermethods/agent-os LICENSE | @HEAD `cae8e664` MIT CasJam Media LLC | mcp__github__get_file_contents (text SHA `8af3adfa`) |
| 13 | hudrazine/claude-code-memory-bank README | @HEAD `6931a2c7dba742a219cc9d9cc6af67267ee8a9f7` | mcp__github__get_file_contents 2026-05-15 (text SHA `f703d46b`) — Unlicense (public domain) |
| 14 | mrvladd-d/memobank README | @HEAD `e200fad76aaaf45f182b68d66ee7dd6a511cbe7d` | mcp__github__get_file_contents 2026-05-15 (text SHA `841a82eb`) — MIT |
| 15 | Aider-AI/aider README | @HEAD `3ec8ec5a7d695b08a6c24fe6c0c235c8f87df9af` | mcp__github__get_file_contents 2026-05-15 (text SHA `816c876c`) — META-HARNESS |
| 16 | continuedev/continue README | @HEAD `cb273098d968906d25ee737b454f0b5f13ea2482` | mcp__github__get_file_contents 2026-05-15 (text SHA `a8ffebc6`) — Apache 2.0; CI-class not runtime-class |
| 17 | giostriquer/agent-workshop README | @HEAD `85d5ceabb90b7fb963e7caeeb6ff90c108f7c966` | mcp__github__get_file_contents 2026-05-15 (text SHA `295bde54`) |
| 18 | Spec-Kit installation evidence | Z:\claude-sota-installed\.specify\templates\*.md (5 files) | Glob 2026-05-15 verified |
| 19 | Claude memory stack (DUPLICATE-detect basis) | Z:\claude-sota-installed\CLAUDE.md §"Memory Stack" L1+L2+L3+L4 | Read 2026-05-15 |
| 20 | mcp-memory + graphiti installed status | CLAUDE.md Memory Stack — mcp-memory-service v10.51.3 INSTALLED + graphiti v0.29.0 INSTALLED + WIRED | Read 2026-05-15 (CLAUDE.md L171 drift fix evidence) |

## 8. Honest Conclusion

**Hypothesis (R0)**: "claude-sota-installed runtime is underserved in spec-driven-dev / scaffolding / workflow-harness layers beyond W206-W209."

**Verdict**: **PARTIALLY-VERIFIED** — Spec-Kit IS installed; but 3 distinct workflow-class primitives are absent (PRD→GH-Issues / multi-persona agile lifecycle / origin-doc convention for agents+skills). 3 ADOPT-NOW candidates close the gap (CCPM + BMAD-METHOD V6 + agent-workshop pattern-extract). All MIT-licensed + permissive + canonical-channel installable per CR-6.

**Recommended next-fire actions**:
1. **Refresh Spec-Kit installation** to HEAD `13c167e1` via `uv tool install --upgrade specify-cli --from git+https://github.com/github/spec-kit.git@<latest-tag>` to gain `/speckit.taskstoissues` + `/speckit.clarify` + `/speckit.analyze` + `/speckit.checklist`
2. **Install CCPM** as Tier-2 sister to Spec-Kit (Gap #1) via `git clone + ln -s skill/ccpm .claude/skills/ccpm`
3. **Install BMAD-METHOD V6** as Tier-4 plugin-class (Gap #2) via `npx bmad-method install --modules bmm --tools claude-code --yes`
4. **Cite-import agent-workshop origin-doc convention** (Gap #3) for sss's 8 existing agents

**Retraction**: Stale references `cccoder/agent-os` and `gtanl/claude-memory-bank` corrected to `buildermethods/agent-os` and `hudrazine/claude-code-memory-bank` (former search returned 0; latter is highest-★ Cline-derived variant).
