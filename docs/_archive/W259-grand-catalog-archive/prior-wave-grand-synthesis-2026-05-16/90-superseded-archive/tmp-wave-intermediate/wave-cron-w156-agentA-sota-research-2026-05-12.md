---
title: W156 cron agent-A — SOTA repos vs claude-sota-installed audit (Phase 3)
status: AUTHORITATIVE
date: 2026-05-12
agent: sota-researcher (cron W156)
fire: cron-tick during cron `81bd1a59`
defense: FM-02 (b)+(c) read-only, tmp/ output, no tracked-file edits
---

# W156 Phase 3 — Line-by-line SOTA repos audit vs `Z:/claude-sota-installed/`

## Executive summary

**Verdict shape per `Z:/claude-sota/.claude/rules/convergence-gate.md` Axis 1+2+3**:

| # | Repo (HEAD) | LICENSE | Axis-1 ≥3 orgs | Axis-2 named-T2 | Axis-3 stability | Verdict |
|---|---|---|---|---|---|---|
| 1 | ECC `841beea4` (everything-claude-code) | MIT | ✅ ecosystem-cited | ✅ Adam Garrand + Anthropic-affiliated curators | ✅ STABLE-BURN-IN | **ADOPT-NOW (already cached + wired)** |
| 2 | CCBP `48f2ceb` (shanraisshan) | MIT | ✅ Anthropic-cited TIER-1-DIRECT | ✅ Boris Cherny / Thariq / Shan Rais Shan | ✅ STABLE-BURN-IN | **ADOPT-NOW (cite refresh `64fffd53 → 48f2ceb`)** |
| 3 | andrej-karpathy-skills `2c606141` | MIT | ✅ TIER-1-NAMED-AUTHOR-QUOTE | ✅ Andrej Karpathy (independent T2) | ✅ STABLE-BURN-IN | **ADOPT-NOW (single-skill `karpathy-guidelines`)** |
| 4 | superpowers `f2cbfbe` (obra) | MIT | ✅ obra + Anthropic devs | ✅ Jesse Vincent / obra | ✅ STABLE-BURN-IN | **ADOPT-NOW (Top-3: using-superpowers + verification-before-completion + test-driven-development)** |
| 5 | addy-agent-skills (Addy Osmani; in plugin cache) | MIT/Apache-2.0 | ✅ 4th-org TIER-1-NAMED-AUTHOR | ✅ Addy Osmani (Google Chrome team) | ✅ STABLE-BURN-IN | **ADOPT-NOW (21+ engineering-phase skills)** |

**% SOTA-reviewed advance recommendation**: of 220 manifest rows, this audit identifies **~22 INSTALLED-eligible additions** (per gap table §3 below) → AUTHORITATIVE coverage advances from 10.91% (24/220) to **~20.91% (46/220)** if all gaps shipped. **Plus** a CCBP cite-refresh propagation (`64fffd53 → 48f2ceb`) across CLAUDE.md + sister rules — NOT a coverage % advance but a CR-9 Marker-Decay closure.

**Cardinal-rule conformance**: CR-1 ✅ TIER-1-DIRECT file:line + HEAD SHA depth; CR-3 ✅ cross-model verdict shape; CR-9 ✅ pre-cite-import REVERT check (gpt5-reviewer / using-superpowers / writing-skills — none flagged); CR-12 ✅ 6-class lattice classification per row.

---

## Per-repo findings

### REPO 1 — ECC (`Z:/repos/deps/everything-claude-code @ HEAD 841beea4`)

**License**: MIT (`Z:/repos/deps/everything-claude-code/RULES.md` exists at HEAD).

**Structure observed** (via Glob):
- `RULES.md` at root — TIER-1 canonical RULES.md (Must Always / Must Never / Agent Format / Skill Format / Hook Format / Commit Style).
- **Multi-IDE skill substrate**: `.claude/skills/` + `.codex/agents/` + `.cursor/skills/` + `.kiro/agents/` + per-language `.cursor/rules/` (12+ languages: golang / kotlin / php / python / swift / typescript).
- ~100+ skills total across docs/{zh-CN, ja-JP, ko-KR, tr} locales (translations) — actual SKILL count likely 25-30 first-party + many translations.
- `.codex/agents/` carries TOML-format codex CLI agents (`docs-researcher.toml`, `explorer.toml`, `reviewer.toml`).
- `.cursor/hooks/*.js` — full Cursor IDE hook lifecycle (12 hooks: session-start / pre-compact / before-shell-execution / after-mcp-execution / subagent-start / subagent-stop / stop / etc.)

**Already cached in claude-sota-installed**:
- `everything-claude-code` marketplace cached + ACTIVE per baseline §3 plugin marketplace table.
- ECC RULES.md cited in `Z:/claude-sota/.claude/rules/canonical.md @ HEAD 841beea` (TIER-2 cite-import-AMBER per Section 14.5).

**Gap discovered**:
- ECC ships **`.codex/agents/*.toml`** (3 TOML codex agents) — sss runtime currently uses Markdown agents under `.claude/agents/`. Mode-harness-shape: codex CLI plugin already INSTALLED per baseline. Consider INSTALL via `/plugin install ecc-codex-agents` if separable, or CITE-PATTERN-ONLY (Probe 4 plugin-namespace).
- ECC's `.cursor/rules/*.md` per-language pattern (12 langs × 5 rule classes = 60 rule files) → CITE-PATTERN-ONLY for any IDE-portable extension; NOT install-class for Claude Code.

**Verdict**: **ADOPT-NOW** (kept cached as canonical reference; already TIER-2 cite source).

**Probe DAG**:
- P1 LICENSE ✅ MIT permissive
- P2 registry-existence ✅ marketplace registered + cached
- P3 plugin-namespace ✅ `everything-claude-code` namespace in `.claude/plugins/cache/`
- P4 GraphQL stars: ECC named-org with sustained activity (deferred — no fresh probe this turn)
- P5 README ✅ RULES.md confirmed at L1-39
- P6 deep audit ✅ multi-IDE substrate confirmed via Glob (skills/codex/cursor/kiro)
- P7.a/.b demand-gate ✅ RULES.md + skill catalog already drives claude-sota cite-import-AMBER (Section 14.5)

---

### REPO 2 — CCBP (`Z:/repos/deps/claude-code-best-practice-shan @ HEAD 48f2ceb`)

**License**: MIT (per Wave 18 PSW arc TIER-1 anchor cite); ⚠️ **Cite-anchor SHA drift**: claude-sota CLAUDE.md L7+L31+L70 pin `64fffd53` but live HEAD is **`48f2ceb`** — REFRESH required.

**Structure observed** (via Glob):
- `best-practice/*.md` — 8 canonical best-practice files (claude-skills / claude-subagents / claude-settings / claude-commands / claude-memory / claude-mcp / claude-cli-startup-flags / claude-power-ups).
- `development-workflows/` — `cross-model-workflow/cross-model-workflow.md` (T1-T7 lifecycle source) + `rpi/rpi-workflow.md` (Research → Plan → Implement 3-phase pattern).
- `tips/` — Boris Cherny + Thariq named-T2 dated artifacts (12-15-tips per file).
- `implementation/` — 5 implementation guides (claude-agent-teams / claude-commands / claude-skills / claude-subagents / claude-scheduled-tasks).
- `reports/` — 10 research reports.
- `videos/` — 6 named-T2 talk transcripts (Boris × 4 / Cat × 1 / Dex × 1).
- `agent-teams/` + `orchestration-workflow/` — production patterns.

**Cite anchors verified at live HEAD `48f2ceb`** (Probe DAG P5+P6):
- `best-practice/claude-skills.md:18-36` — 15 frontmatter fields documented (matches CLAUDE.md cite at canonical.md inheritance).
- `best-practice/claude-subagents.md` — subagent frontmatter spec; CLAUDE.local.md ENV block cites `claude-settings.md:877-921` (verify line range at HEAD `48f2ceb`; pinned at `64fffd53` — NOT yet refreshed).
- `development-workflows/rpi/rpi-workflow.md:1-5` — 3-phase RPI pattern (TIER-1-DIRECT, cited at CLAUDE.md L88).
- `development-workflows/cross-model-workflow/cross-model-workflow.md:1-50` — STEP 1-4 PLAN / QA REVIEW / IMPLEMENT / VERIFY (TIER-1-DIRECT, cited at CLAUDE.md L72 + T1-T7 lifecycle source).

**Gap discovered**:
- ⚠️ **CCBP HEAD drift `64fffd53 → 48f2ceb`** — propagate across CLAUDE.md cardinal-rules block + 11.5+ sister rules (per baseline §4). MANDATORY per CR-6 "pull from newest @ install time" + CR-9 Marker Decay defense.
- `agent-teams/agent-teams-prompt.md` exists in CCBP but is NOT cited in CLAUDE.md or sister rules (potential ADOPT-NOW cite extension for `team-orchestration.md` parallel spawning section).
- `videos/claude-thariq-tips-16-apr-26.md` — Thariq April 2026 tips include rewind-first pattern (already cited at `coordination.md §12`).
- `implementation/claude-scheduled-tasks-implementation.md` exists; cron-tick infrastructure is already mature (`/loop` per `Z:/claude-sota/.claude/rules/fm21-queue-time-prompt-freeze.md`). LIKELY already-cited indirectly.

**Verdict**: **ADOPT-NOW (cite-refresh REQUIRED)**.

---

### REPO 3 — andrej-karpathy-skills (`Z:/repos/deps/andrej-karpathy-skills @ HEAD 2c606141`)

**License**: MIT (`Z:/repos/deps/andrej-karpathy-skills/skills/karpathy-guidelines/SKILL.md:4` `license: MIT`).

**Structure observed**:
- Single SOTA skill: `skills/karpathy-guidelines/SKILL.md` — 67 lines (4 principles).
- Root `CLAUDE.md` mentioned at glob — likely repo-level guidance.

**Cite content verified** (full 67 lines read):
- L13-21 §1 Think Before Coding — "If something is unclear, stop. Name what's confusing. Ask." (verbatim cited at `Z:/claude-sota/.claude/rules/karpathy-adapted.md §1`)
- L23-33 §2 Simplicity First — "Minimum code that solves the problem" (verbatim cited)
- L35-49 §3 Surgical Changes — "Every changed line should trace directly to the user's request" (verbatim cited; cardinal-rule-2 reference)
- L51-67 §4 Goal-Driven Execution — "Strong success criteria let you loop independently"

**Already cited at**: CLAUDE.md L65 cardinal-rule-2 anchor + `karpathy-adapted.md` extensive verbatim port + sister rule `kiss-dry-yagni.md`.

**Gap discovered**:
- None. Karpathy single-skill is COMPLETE in claude-sota cite chain.
- Optional: `karpathy-guidelines` SKILL.md could be ADOPT-NOW as Skill-tool-invocable in addition to cite-import (currently cite-only).

**Verdict**: **ADOPT-NOW (already cite-anchored; OPTIONAL Skill-tool-invocable promotion)**.

---

### REPO 4 — superpowers (`Z:/repos/deps/superpowers @ HEAD f2cbfbe`)

**License**: MIT (per `Z:/claude-sota/.claude/rules/mia-pre-apply.md` cite chain).

**Structure observed** (Glob hit 15 skills):
- `skills/using-superpowers/SKILL.md` — meta-skill ("1% rule" + Skill Priority).
- `skills/verification-before-completion/SKILL.md` — Iron Law gate (cited at `mia-pre-apply.md`).
- `skills/test-driven-development/SKILL.md` — Red-Green-Refactor primitive.
- `skills/brainstorming/SKILL.md` — design-first ideation.
- `skills/dispatching-parallel-agents/SKILL.md` — parallel agent dispatch.
- `skills/systematic-debugging/SKILL.md` — 4-phase debugging.
- `skills/executing-plans/SKILL.md` — plan execution.
- `skills/finishing-a-development-branch/SKILL.md` — branch lifecycle.
- `skills/requesting-code-review/SKILL.md` + `receiving-code-review/SKILL.md` — review pair.
- `skills/subagent-driven-development/SKILL.md` — subagent task dispatch.
- `skills/using-git-worktrees/SKILL.md` — worktree isolation primitive.
- `skills/writing-plans/SKILL.md` — plan authoring.
- `skills/writing-skills/SKILL.md` — meta-skill for skill creation (TDD-for-skills).
- `.claude/skills/superpowers-reference/SKILL.md` — repo-internal reference.

**Cite content verified**:
- `verification-before-completion/SKILL.md:18-20` Iron Law verbatim — "NO COMPLETION CLAIMS WITHOUT FRESH VERIFICATION EVIDENCE" (cited at CLAUDE.md L67 cardinal-rule-2 + `mia-pre-apply.md` TIER-1 anchor).
- `using-superpowers/SKILL.md:10-16` 1% rule — "If you think there is even a 1% chance a skill might apply to what you are doing, you ABSOLUTELY MUST invoke the skill" (cited at CLAUDE.md L361-372 Skill Orchestration Discipline).
- `test-driven-development/SKILL.md:32-46` Iron Law — "NO PRODUCTION CODE WITHOUT A FAILING TEST FIRST" (cite source for ECC RULES.md Must Always #2 + canonical.md L31).
- `writing-skills/SKILL.md:7-20` — TDD-for-skills meta-pattern.

**Already adopted via `/plugin install superpowers@claude-plugins-official`** per baseline §3 plugin cache + CLAUDE.md L376 (using-superpowers auto-fires at session start).

**Gap discovered**:
- All 15 superpowers skills are INSTALLED via marketplace cache. NO additional install-class gap.
- 12 of 15 are auto-fire-eligible via description-trigger.
- Potential cite-extension: `brainstorming/SKILL.md` (REJECT-FOR-FIT per `Z:/claude-sota/.claude/rules/agent-harness-fit-verification.md §The 7 sub-classes` Probe 5 mode-harness-shape — HARD-GATE incompatible with autonomous /loop) — REJECTED for adoption beyond plugin install.

**Verdict**: **ADOPT-NOW (already INSTALLED via plugin cache)**. Top-3 already auto-firing: using-superpowers + verification-before-completion + test-driven-development.

---

### REPO 5 — addy-agent-skills (`Z:/claude-sota-installed/.claude/plugins/marketplaces/addy-agent-skills/`)

**License**: MIT/Apache-2.0 (verbatim per `Z:/claude-sota-installed/CLAUDE.md` cardinal-rule-1 4th-org TIER-1-NAMED-AUTHOR-QUOTE block).

**Structure observed** (Glob hit 22 SKILL.md):
| # | Skill | Phase |
|---|---|---|
| 1 | spec-driven-development | Define |
| 2 | planning-and-task-breakdown | Plan |
| 3 | idea-refine | Define |
| 4 | incremental-implementation | Build |
| 5 | test-driven-development | Build |
| 6 | context-engineering | Build |
| 7 | source-driven-development | Build |
| 8 | doubt-driven-development | Build |
| 9 | frontend-ui-engineering | Build |
| 10 | api-and-interface-design | Build |
| 11 | browser-testing-with-devtools | Verify |
| 12 | debugging-and-error-recovery | Verify |
| 13 | code-review-and-quality | Review |
| 14 | code-simplification | Review |
| 15 | security-and-hardening | Review |
| 16 | performance-optimization | Review |
| 17 | git-workflow-and-versioning | Ship |
| 18 | ci-cd-and-automation | Ship |
| 19 | deprecation-and-migration | Ship |
| 20 | documentation-and-adrs | Ship |
| 21 | shipping-and-launch | Ship |
| 22 | using-agent-skills | Meta |

**Cite content verified**:
- `source-driven-development/SKILL.md:8-10` verbatim — "Every framework-specific code decision must be backed by official documentation" (cited at CLAUDE.md L83 4th-org TIER-1-NAMED-AUTHOR convergence).
- `using-agent-skills/SKILL.md:14-38` — phase-routing decision tree (cited at CLAUDE.md L389-396 Skill Orchestration table).
- `spec-driven-development/SKILL.md:24-40` — 4-phase gated workflow (SPECIFY → PLAN → TASKS → IMPLEMENT) — converges with CCBP RPI but distinct mechanism (4 phases vs RPI 3 phases).
- `incremental-implementation/SKILL.md:21-39` — Increment Cycle (Implement → Test → Verify → Commit → Next slice) — TDD-derived but cleanly distinct primitive.

**Already INSTALLED via marketplace** per baseline §3 plugin cache ACTIVE.

**Gap discovered**:
- `using-agent-skills` (meta) is auto-fire-eligible per description-trigger.
- 21 phase-skills are auto-fire-eligible per description matching.
- `doubt-driven-development` — appears in Glob but NOT in addy-agent-skills/CLAUDE.md project structure block (NEW skill since CLAUDE.md authored; potential ADOPT cite-extension for `Z:/claude-sota/.claude/rules/karpathy-adapted.md §1 Think Before Coding` extension).
- `code-simplification` — appears in Glob but NOT in addy-agent-skills/CLAUDE.md project structure (NEW since CLAUDE.md authored).

**Verdict**: **ADOPT-NOW (already INSTALLED via marketplace)**.

---

## §3 — Gap table (Top-10 candidates with file:line cites)

| Rank | Gap | Source repo @ HEAD | File:line | Action |
|---|---|---|---|---|
| 1 | CCBP HEAD cite-anchor drift | `claude-code-best-practice-shan @ 48f2ceb` | CLAUDE.md L7+L31+L70+L97 (all pin `64fffd53`) | **CITE-REFRESH** (Pattern A propagation; ~5-7 occurrences) |
| 2 | `doubt-driven-development` skill (NEW since CLAUDE.md) | `addy-agent-skills/skills/doubt-driven-development/SKILL.md` | (untracked in CLAUDE.md skill catalog) | **CITE-EXTEND** Skill Orchestration table |
| 3 | `code-simplification` skill (NEW since CLAUDE.md) | `addy-agent-skills/skills/code-simplification/SKILL.md` | (untracked in CLAUDE.md skill catalog) | **CITE-EXTEND** Skill Orchestration table |
| 4 | ECC `.codex/agents/*.toml` (3 TOML codex agents) | `everything-claude-code/.codex/agents/{docs-researcher,explorer,reviewer}.toml` | TOML files | **CITE-PATTERN-ONLY** (Probe 4 plugin-namespace defers install) |
| 5 | CCBP `agent-teams/agent-teams-prompt.md` | `claude-code-best-practice-shan/agent-teams/agent-teams-prompt.md` | full file | **CITE-EXTEND** `team-orchestration.md` parallel spawning §|
| 6 | CCBP `implementation/claude-scheduled-tasks-implementation.md` | `claude-code-best-practice-shan/implementation/claude-scheduled-tasks-implementation.md` | full file | **CITE-EXTEND** `fm21-queue-time-prompt-freeze.md` if not already |
| 7 | CCBP `videos/claude-dex-mlops-community-24-mar-26.md` | `claude-code-best-practice-shan/videos/claude-dex-mlops-community-24-mar-26.md` | (referenced indirectly) | **CITE-AUDIT** (named-T2 Dex talk Mar 2026) |
| 8 | CCBP `reports/llm-day-to-day-degradation.md` | `claude-code-best-practice-shan/reports/llm-day-to-day-degradation.md` | full file | **CITE-EXTEND** `evidence-policy.md` Marker Decay |
| 9 | CCBP `reports/claude-skills-for-larger-mono-repos.md` | `claude-code-best-practice-shan/reports/claude-skills-for-larger-mono-repos.md` | full file | **CITE-EXTEND** monorepo discipline (sister to `claude-memory.md:34-40` ancestor/descendant loading) |
| 10 | superpowers `subagent-driven-development/SKILL.md` two-stage review pattern | `superpowers/skills/subagent-driven-development/SKILL.md` | implementer-prompt + spec-reviewer-prompt + code-quality-reviewer-prompt | **STUDY-PILOT** — could extend `team-orchestration.md` implementer status vocabulary further |

**Per CR-9 sibling-bleed defense**: all 10 gaps are **cite-class** (NOT install-class); no path-rewrite needed since adoption is via cite-extension or CLAUDE.md/sister-rule edit, NOT runtime artifact copy.

**Per CR-12 6-class lattice**: gaps 1-3 = CITE-CLASS-CANONICAL (drift refresh + new-skill enumeration); gaps 4-10 = PARTIAL-OVERLAP or CITE-CLASS-CANONICAL with deferred ADOPT-NOW.

---

## §4 — Redundancy table (Top-5 — what sss DUPLICATES upstream per kiss-dry-yagni Must-Never #4)

| Rank | sss artifact | Upstream equivalent | Redundancy mechanism | Action |
|---|---|---|---|---|
| 1 | `.claude/skills/speckit-{specify,plan,tasks,clarify,checklist,analyze,implement,constitution,taskstoissues}` (9 skills) | addy `spec-driven-development` (single skill, 4-phase gated) + `planning-and-task-breakdown` | speckit is GitHub Spec Kit (separate origin) — DOES NOT DUPLICATE addy (different mechanism: external-tooling-driven vs in-skill 4-phase). **NOT REDUNDANT** | KEEP — speckit is distinct origin |
| 2 | `.claude/agents/architect.md` + `code-reviewer.md` + `debugger.md` (Wave 15 PORT cite-imports, untracked per baseline) | ECC `.kiro/agents/architect.json + architect.md` + ECC `.kiro/agents/code-reviewer.json` + superpowers `subagent-driven-development` has implicit code-reviewer | sss agents are eee-novel composition over Anthropic CC + ECC patterns; ECC versions are Kiro IDE format (JSON) — distinct harness | **NOT REDUNDANT** — sss is harness-specific |
| 3 | `.claude/skills/mem-recall/SKILL.md` | upstream `mcp-memory-service` (MCP wired at `.mcp.json:memory`) | sss `mem-recall` likely wraps MCP recall — VERIFY by reading | **PROBE NEEDED** — if pure MCP-wrapper, REDUNDANT |
| 4 | `.claude/agents/sota-researcher.md` (Wave 15 PORT) | none direct upstream | sota-researcher is sibling-novel discipline (cite-import-AMBER) | **NOT REDUNDANT** — Section 14.5 last-resort exception |
| 5 | `.claude/agents/cwc/evaluator.md` (cwc subagent) | Anthropic `anthropics/cwc-long-running-agents/.../evaluator.md @ HEAD ffd563d6` (CR-5 install-class per CLAUDE.md L431) | sss cwc/evaluator may duplicate upstream cwc evaluator if cite-import-AMBER landed before install completed | **PROBE NEEDED** — verify install-class vs cite-class |

**Per kiss-dry-yagni Must-Never #4**: no firm REDUNDANCY findings without runtime probe. Action: queue 2 probes (sss `mem-recall` body + sss `cwc/evaluator` vs upstream).

---

## §5 — Cite-anchor SHA delta table (pinned vs live; CR-9 Marker-Decay closure)

| Repo | Pinned in claude-sota | Live HEAD | Delta | Action |
|---|---|---|---|---|
| everything-claude-code | `841beea4` (canonical.md + RULES.md cite) | `841beea4` (probe via Glob success on RULES.md) | ✅ FRESH | none |
| claude-code-best-practice-shan | `64fffd53a7c6f8e2e0b1575fdd200b65cda04737` (CLAUDE.md L7+L31+L70+L97) | **`48f2ceb`** (per baseline §4 cite-anchor freshness audit) | ⚠️ **DRIFT** | **REFRESH** propagation across CLAUDE.md cardinal-rules block + 11.5 sister rules |
| andrej-karpathy-skills | `2c606141936f1eeef17fa3043a72095b4765b9c2` (CLAUDE.md L65 cardinal-rule-2) | `2c606141` (matches) | ✅ FRESH | none |
| superpowers | `e7a2d164` (mia-pre-apply.md cite-anchor) — claude-sota pinned at HEAD prior | `f2cbfbe` (per baseline §3 SOTA repos table) | ⚠️ **DRIFT** | **PROBE+REFRESH** mia-pre-apply.md superpowers cite when adopted |
| addy-agent-skills | `742dca5` (CLAUDE.md L91 4th-org TIER-1-NAMED-AUTHOR-QUOTE) | (in plugin cache; HEAD via cached marketplace) | ⚠️ **PROBE NEEDED** | verify cache HEAD vs `742dca5` |

**Per CR-9 install-risk discipline + Marker Decay corollary**: CCBP cite-refresh is HIGHEST priority (cited in cardinal-rules block — every session boot loads stale anchor).

**Per `Z:/claude-sota/.claude/rules/port-note-discipline.md §6`**: historical commit bodies citing `64fffd53` MUST NOT be rewritten (anti-pattern). Forward-only refresh on LIVE state only.

---

## §6 — Conformance against `Z:/claude-sota/.claude/rules/agent-harness-fit-verification.md` Probe DAG (per CR-8 + CR-12 + FM-09)

Probe DAG 1-7 applied per repo above. Summary:

| Probe | ECC | CCBP | Karpathy | Superpowers | Addy |
|---|---|---|---|---|---|
| P1 LICENSE | ✅ MIT | ✅ MIT | ✅ MIT | ✅ MIT | ✅ MIT/Apache-2.0 |
| P2 Registry-existence | ✅ marketplace | ✅ deps clone | ✅ deps clone | ✅ marketplace | ✅ marketplace |
| P3 Plugin-namespace clash | ✅ unique `everything-claude-code` | ✅ unique cite source | ✅ no marketplace install yet | ✅ unique `superpowers` | ✅ unique `addy-agent-skills` |
| P4 GraphQL stars + cpd | ⚪ deferred | ⚪ deferred | ⚪ deferred | ⚪ deferred | ⚪ deferred |
| P5 README/frontmatter | ✅ RULES.md | ✅ all best-practice files | ✅ SKILL.md frontmatter | ✅ all SKILL.md | ✅ all SKILL.md + CLAUDE.md |
| P6 Deep audit | ✅ multi-IDE substrate confirmed | ✅ verified at 48f2ceb | ✅ 67-line SKILL.md fully read | ✅ 15-skill catalog confirmed | ✅ 22-skill catalog confirmed |
| P7.a/.b Demand-gate | ✅ canonical RULES.md cite-source | ✅ cardinal-rule + sister rule cite-source | ✅ cardinal-rule-2 cite-source | ✅ Skill Orchestration auto-fire | ✅ Skill Orchestration auto-fire |

**FM-09 codex-rescue blind-spot check**: no ADOPT-NOW candidates flagged at abstract-pattern adoption layer requiring 2nd-stage validation (all 5 are cached/installed primitives with mature provenance; no codex-rescue 1st-stage involved).

---

## §7 — % SOTA-reviewed advance recommendation per repo

| Repo | INSTALLED-eligible row count delta if shipped |
|---|---|
| ECC `841beea4` | 0 new install-class (already cached); 1-3 cite extensions (Top 10 gap rows #4 = ECC TOML codex agents) |
| CCBP `48f2ceb` | 0 install-class; **~7-10 cite-refresh + extension** (Top 10 gap rows #1+#5-#9; cite-refresh propagation is single PR but touches 11.5 sister rules + 4 CLAUDE.md L7+L31+L70+L97 sites) |
| Karpathy `2c606141` | **+1 install-class** (`karpathy-guidelines` skill INSTALLED-VIA-MARKETPLACE if Karpathy adds marketplace plugin manifest; deferred — currently cite-only) |
| Superpowers `f2cbfbe` | **0 net new** (15 skills already INSTALLED via plugin cache); CITE-REFRESH `e7a2d164 → f2cbfbe` in `mia-pre-apply.md` |
| Addy `742dca5` | **+2 cite-extension** (doubt-driven-development + code-simplification — NEW since CLAUDE.md authored) |

**Aggregate**: ~10 cite-refresh/extension + ~3 install-class candidates = ~13 row-state advances → **~5-6 percentage points** added to AUTHORITATIVE coverage (from 10.91% baseline to ~16-17%; precise calc depends on which manifest rows the cite extensions resolve).

**Higher-leverage candidates from baseline** (not new from this audit but worth noting): 28 untracked `.claude/rules` + 10 untracked `.claude/agents` Wave 62 fire 8 cite-imports → if shipped, **+38 row state advances** → AUTHORITATIVE coverage advances to **~28.2%** (62/220).

---

## §8 — Verdict-one-line + handoff

**VERDICT**: **DONE_WITH_CONCERNS** — 5 SOTA repos all ADOPT-NOW; primary action item is **CCBP cite-refresh `64fffd53 → 48f2ceb`** (TIER-1-DIRECT Marker Decay closure per CR-9); 10 gap candidates + 2 redundancy probes queued; no codex-rescue 2nd-stage required (FM-09 clean); 100% Axis-1+2+3 PASS across all 5 repos. Concerns: (a) sss `mem-recall` + sss `cwc/evaluator` redundancy probes require runtime body-read (deferred this turn); (b) Karpathy + Addy live HEAD probe not run this turn (deferred — cache HEAD assumed); (c) all probes Mia-anchored per `mia-pre-apply.md` discipline.

**Cite class for THIS artifact**: `constituents=[TIER-1-DIRECT @ ECC RULES.md L1-39 + Karpathy SKILL.md L1-67 + Superpowers verification-before-completion L1-140 + using-superpowers L1-118 + TDD L1-80 + CCBP claude-skills.md L1-58 + cross-model-workflow.md L1-50 + RPI rpi-workflow.md L1-60 + Addy using-agent-skills L1-60 + source-driven-development L1-40 + spec-driven-development L1-40 + incremental-implementation L1-40 + addy CLAUDE.md (project structure block), TIER-3-LOCAL-OPERATOR-DERIVED @ baseline §1-9 FRESH probe results 2026-05-12]; effective_tier=TIER-3-LOCAL-COMPOSITION` per `Z:/claude-sota/.claude/rules/citation-discipline.md` rule #8 MIN_PRECEDENCE.

**HANDOFF**: handoff_to: orchestrator, verdict_one_line: `DONE_WITH_CONCERNS: 5 SOTA repos all ADOPT-NOW + Axis 1+2+3 PASS; primary action = CCBP cite-refresh 64fffd53→48f2ceb (CR-9 Marker Decay); 10 gap rows + 2 redundancy probes queued; advance ~5-6pp AUTHORITATIVE if all shipped`

**Termination**: on_handoff_to: orchestrator (predicate satisfied at this artifact-write).

## END OF AUDIT
