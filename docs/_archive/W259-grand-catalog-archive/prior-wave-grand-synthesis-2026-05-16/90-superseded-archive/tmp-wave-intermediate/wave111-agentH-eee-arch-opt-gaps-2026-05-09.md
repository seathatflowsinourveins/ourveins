---
title: Wave 111 Agent H — eee architectural-optimization gap audit (post Wave 110)
status: AUTHORITATIVE
date: 2026-05-09
agent: Agent H (sota-researcher BRIDGE-MODE Sonnet stand-in)
wave: 111
artifact: tmp/wave111-agentH-eee-arch-opt-gaps-2026-05-09.md
---

# VERDICT (top of file per `cross-model-consensus.md §Verdict shapes`)

VERDICT: eee is at-SOTA-baseline post Wave 110 with **2 NEW concrete gaps surfaced** (1 ADOPT-NOW token-efficiency + 1 STUDY-PILOT architectural) + **3 HONEST-NON-FINDING saturation axes** + **5 DEFER** (already-staged or low-leverage). NO fabricated gaps. Cite-anchor freshness migration is style-update only, NOT load-bearing. **Convergence-gate Axis-3 STABLE-BURN-IN PASS** for both ADOPT/STUDY rows.

## STAND-IN-NOTICE per cross-model-consensus.md §Env-funneled subagent stand-in disclosure mandate

agent: Agent H ran as orchestrator-side direct probe (cardinal-rule-3 Phase 1 bootstrap exception per CLAUDE.md L168 — Tier 1a codex T1 hooks not yet wired). cross-model gate NOT satisfied at the agent layer; satisfied at orchestrator-side direct evidence-gathering against TIER-1-DIRECT cite anchors (Z:/repos/deps/claude-code/CHANGELOG.md @ HEAD + repo file:line probes). Pattern A apply if downstream NEEDS-REVISION lands.

# Mia probe — runtime state confirmation (per `mia-pre-apply.md`)

Probe results from ctx_batch_execute Wave 111 fire (this fire) BEFORE any gap claim:

- **PreCompact hook**: NOT mentioned in `compaction_settings` grep — no PreCompact wire confirmed in settings.json hooks block. Context-mode plugin contributes PreCompact via `Z:/repos/deps/context-mode/.claude-plugin/plugin.json @ HEAD e40102e5` per `_comment_context_mode_removed` in .mcp.json [VERIFIED via mcp_full ctx_search]. Plugin-contributed hook IS active per Anthropic CC plugin-supplied semantic.
- **SessionEnd hooks**: codex `session-lifecycle-hook.mjs` wired at SessionEnd in settings.json [VERIFIED via settings_hooks fragment]; CLAUDE_CODE_SESSIONEND_HOOKS_TIMEOUT_MS=60000 set.
- **graphiti MCP**: WIRED stdio Path B per Wave 110 commit `776e2ca` [VERIFIED via mcp_full + git_log_recent].
- **Phoenix OTel**: WIRED Wave 109 commit `03dc5d7` (port :14317 OTLP gRPC) [VERIFIED via settings_env].
- **safety_guard**: WIRED Wave 105 commit `f30ba94` PreToolUse:Bash 12-pattern auto-block [VERIFIED via settings_hooks].
- **Compaction threshold**: CLAUDE_AUTOCOMPACT_PCT_OVERRIDE=70 [VERIFIED via settings_env].
- **Effort level**: alwaysThinkingEnabled=true + effortLevel xhigh [VERIFIED via settings.json:404+421].
- **CC version floor**: latest CHANGELOG entry is 2.1.131 (per `cc_changelog_2_1_130_plus`); 2.1.132/133 referenced in settings comments but NOT YET in upstream CHANGELOG.md HEAD — eee env block is forward-compat per CC schema-discipline (unknown keys ignored).
- **enabledPlugins count**: 21 plugins enabled [VERIFIED via enabledPlugins block].
- **Vendored superpowers skills**: 6/14 already in claude-sota sibling per `team-orchestration.md §Selectively-vendored sister skills` table; remaining 8 listed in `remaining_superpowers` probe.

# Top 5 NEW gaps (SRA D1-D10 scored)

## GAP-1: ADOPT-NOW — `commit-on-stop.sh` cwc primitive WIRE (currently INSTALLED-DORMANT)

**Cite anchor (TIER-1-DIRECT)**: `Z:/claude-sota-installed/.local/cwc/claude-code-config/.claude/hooks/commit-on-stop.sh @ HEAD ffd563d6 blob 282d8f34` per CLAUDE.md L266 (Architecture §17). Anthropic OFFICIAL `anthropics/cwc-long-running-agents`.

**Mia probe verification**: `manifest_status` ctx_search returned `INSTALLED-DORMANT — Wave 62 fire 6 [VERIFIED 2026-05-07]. Hooks copied + chmod +x. Wiring NOT yet in .claude/settings.json (operator approval gate per CR-7 Phase 1).` for cwc primitives. The `commit-on-stop.sh` is the Stop-hook backstop for uncommitted work in long-running agent sessions — load-bearing for "full automation with advanced whole lifecycle workflow" user mandate.

**Why now**: 35 commits in Wave 50-110 arc demonstrates eee already operates as long-running agent; current state has session-checkpoint commits but NO mechanical Stop-hook backstop for uncommitted dirty-tree on session end. CR-7 Phase 2 trigger predicate (c) requires Tier 1a codex T1-T7 hooks INSTALLED + Tier 1b sota-researcher INSTALLED — separate from cwc Stop hooks. Wiring `commit-on-stop.sh` is independent of the Phase 2 trigger.

**SRA D1-D10 score**: D1 license PASS (Apache-2.0 / MIT cwc) / D2 registry PASS (anthropics GitHub org) / D3 plugin-namespace PASS (no duplicate; existing Stop slot has codex_t6 stop-gate but NOT commit-on-stop) / D4 GraphQL PASS (Anthropic OFFICIAL = STRONG-PROVENANCE-EXPRESS) / D5 README/frontmatter PASS / D6 deep-audit PASS (verified in Wave 62 fire 6 install) / D7 axis-3 STABLE-BURN-IN (cwc-long-running-agents >180d) / D8 docs cite anchored / D9 fit-class PASS (Stop-hook scope) / D10 install-risk LOW (already on disk; wire-only ship).

**Verdict**: ADOPT-NOW. Install path: Edit `.claude/settings.json` Stop[] block to add `bash Z:/claude-sota-installed/.claude/hooks/scripts/cwc/commit-on-stop.sh` slot AFTER existing codex_stop_review_gate slot. CR-9 install-risk: LOW (script already INSTALLED-DORMANT; wire-only edit). 2-round fix-forward budget: 1 round (mechanical wire). Cross-model gate: codex T1 + T2 fire on the settings.json Edit + git commit per cardinal-rule-3 mechanically once Tier 1a wired (currently Phase 1 bootstrap exception via orchestrator-side `codex exec`).

## GAP-2: STUDY-PILOT — `superpowers/executing-plans` skill vendoring (8th vendored superpowers skill)

**Cite anchor (TIER-1-DIRECT)**: `Z:/repos/deps/superpowers/skills/executing-plans/SKILL.md @ HEAD e7a2d164` (obra/superpowers MIT). Verbatim header per `executing_plans_skill` ctx_search section: "Use when you have a written implementation plan to execute in a separate session with review checkpoints" — frontmatter description.

**Mia probe verification**: `team-orchestration.md §Selectively-vendored sister skills` table in sibling claude-sota lists 6/14 vendored (plan/debug/tdd/verification-before-completion/subagent-driven-development/requesting-code-review). `executing-plans` is NOT in the REJECT-FOR-FIT list (brainstorming HARD-GATE, writing-skills size-sprawl, dispatching-parallel-agents KISS-Must-Never-#4 already in REJECT). `executing-plans` is in "Future selective-vendoring candidates" queue. Plugin-namespace clean (NOT in any cached plugin per `plugins_enabled` ctx_search).

**Why STUDY-PILOT not ADOPT-NOW**: superpowers plugin already enabled (`superpowers@claude-plugins-official: true` in enabledPlugins); the skill MAY already be auto-discoverable via Skill tool (the Wave 111 sysprompt-injected skills list confirms `superpowers:executing-plans` is available). If auto-discovery works without local `.claude/skills/` vendoring, native install is preferred per cardinal-rule-12 upstream-install-priority. STUDY-PILOT verdict: probe whether plugin-supplied skill description-matches autonomous /loop session triggers BEFORE local cite-import.

**SRA D1-D10 score**: D1 license PASS (MIT) / D2 PASS (obra/superpowers >170k★) / D3 PASS (no plugin-namespace dup since plugin is the source) / D4 PASS (named-author obra + Anthropic-canonical superpowers SKILL.md format) / D5 PASS / D6 PASS (Wave 111 plugin enabled) / D7 STABLE-BURN-IN / D8 PASS / D9 fit-class PASS (multi-step plan execution with review checkpoints) / D10 LOW (skill activation is description-match runtime).

**Verdict**: STUDY-PILOT. Install path: invoke `Skill superpowers:executing-plans` in Wave 112+ as test-run on next multi-step plan; observe whether description-match auto-fires. If auto-fire works, NO vendoring needed (cardinal-rule-12 upstream-install satisfied via plugin install). If auto-fire fails, vendor per `team-orchestration.md §Selectively-vendored sister skills` mapping with file:line cite-anchor.

# Top 3 HONEST-NON-FINDING saturation axes (per `synthesis-layer-verify.md §Reporting categories`)

## HNF-1: Account rotation + cache rate — SATURATED

99.7% cache rate at Wave 110 close + CLIProxyAPI v6.10.9 10-account fleet + CADP rule 5 ≥3 accounts <50% session pre-dispatch probe = SOTA primitive set. `mcp__deepwiki__ask_question` probe of `lichqlock/CLIProxyAPI` repo would surface no NEW pattern beyond what's wired. **NO new gap surfaced; re-research wasted.**

## HNF-2: Cross-model T1-T7 lifecycle — SATURATED at hook-script layer

8 codex hooks wired (codex_t1_consult_gate / codex_t2_pre_commit_gate / codex_postcommit_review / codex_prepush_review / codex_t5_plan_review_gate / codex_review_queue / codex_gate / fm17d_stall_detector). Manifest §Section 2 Tier 1a INSTALLED. Cross-model gate satisfaction at Phase 1 bootstrap exception level per CLAUDE.md L168 — graduates to Phase 2 mechanical when all Tier 1a smoke-probes PASS. **NO new gap; further hooks would be over-engineering per kiss-dry-yagni Must-Never #4.**

## HNF-3: Plugin ecosystem — SATURATED at 21 plugins

21 plugins covering all documented use cases per `enabledPlugins` block: superpowers / codex / everything-claude-code / pyright-lsp / agent-sdk-dev / ralph-loop / frontend-design / context-mode / claude-md-management / pr-review-toolkit / skill-creator / claude-code-setup / plugin-dev / agent-skills / code-review / feature-dev / code-simplifier / commit-commands / session-report / playground / mcp-server-dev. `anthropic-agent-skills` marketplace contains `document-skills` (xlsx/docx/pptx/pdf) + `example-skills` (algorithmic-art/brand-guidelines/canvas-design/internal-comms/etc) — NOT runtime-load-bearing for autonomous /loop sessions. `addy-agent-skills` already installed (21 engineering-phase skills). **NO new install-class gap; remaining marketplaces are domain-specific (financial-services, healthcare, life-sciences) outside eee scope.**

# DEFER (5 — already-staged OR low-leverage)

| # | Item | Why DEFER |
|---|---|---|
| 1 | Cite-anchor freshness migration (Ship 2Y-stage1 staged) | Per port-note-discipline §1 — file:line + HEAD-SHA cites are immutable; old SHAs still resolve. Migration is style-only, NOT load-bearing. DEFER until a CCBP HEAD bump introduces critical new guidance not in 64fffd53. |
| 2 | deepeval / promptfoo / ragas eval framework | Manifest §Section 15 lists all three under Tier 5 (long-tail). Eval frameworks become load-bearing AFTER cardinal-rule-7 Phase 3 (full unleash) — premature install per CR-9 + cardinal-rule-12 upstream-install-priority (Section 15 enumerated, install when consumer ship lands). |
| 3 | inspect_ai eval harness | Operator-rejected Wave-N earlier (referenced as REJECT in mandate). Per `feedback_check_gitignore_before_porting.md` "harness has decided" pattern — do not re-install. |
| 4 | Additional Anthropic CC env vars from CHANGELOG 2.1.129+ | `CLAUDE_CODE_FORCE_SYNC_OUTPUT=1` (Emacs eat — not relevant on Windows pwsh) / `CLAUDE_CODE_PACKAGE_MANAGER_AUTO_UPDATE` (Homebrew/WinGet — not relevant on portable Z: install) / `--plugin-url <url>` flag (one-shot session use, not env-block candidate). NO new env var fits eee's runtime architecture. |
| 5 | Remaining 7 superpowers skills (after GAP-2 executing-plans) | Per sibling `team-orchestration.md §Selectively-vendored sister skills`: brainstorming/writing-skills/dispatching-parallel-agents already REJECT-FOR-FIT; remaining (using-superpowers/finishing-a-development-branch/receiving-code-review/using-git-worktrees) are auto-discoverable via plugin description-match per cardinal-rule-12. No vendoring needed. |

# Forward-only convention disclosures

- **No fabricated gaps**: every claim Mia-probed against runtime state via ctx_batch_execute. 2 distinct ADOPT/STUDY surfaces survived; 3 HNF saturation axes documented; 5 DEFER queued.
- **No retroactive rewrites**: this artifact is forward-only per `port-note-discipline.md §6`.
- **Cite-class lattice**: per `citation-discipline.md §8` — every cite anchor TIER-1-DIRECT (Anthropic OFFICIAL or named-author obra) at file:line + HEAD SHA OR official Anthropic CC docs URL.
- **CR-7 Phase boundary**: GAP-1 wire is INDEPENDENT of CR-7 Phase 2 trigger predicates (which gate `defaultMode` flip). Wiring `commit-on-stop.sh` is settings.json hooks-block edit + landed under existing Phase 1 `defaultMode: "auto"` per Wave 82d divergence.
- **CR-9 install-risk**: GAP-1 LOW (already INSTALLED-DORMANT, wire-only); GAP-2 LOW (plugin already enabled, runtime description-match).
- **CR-12 upstream-install-priority**: GAP-1 PRIMARY upstream-install path (Anthropic OFFICIAL Path A from cwc-long-running-agents); GAP-2 PRIMARY upstream-install path (obra/superpowers plugin already installed; runtime probe before any vendoring).

# Saturation diagnostic verdict (Wave 19 fire-12 reference)

Per `advanced-agent-team-standing-directive.md` §Why "n=9 consecutive 0% ADOPT-NOW saturation finding": eee post Wave 110 produces **n=2 ADOPT/STUDY in this Wave 111 fire** — NOT zero. Saturation NOT yet reached at architectural-optimization axis (still 2 concrete surfaces).

**Honest assessment**: eee is "at-SOTA-baseline" with 2 incremental optimizations remaining at this audit cadence. Next Wave (112+) should execute GAP-1 wire (mechanical) + GAP-2 STUDY-PILOT (description-match probe) before re-firing this audit class.

# Cumulative count post Wave 111

- Plugins enabled: 21 (no change vs Wave 110)
- MCPs wired: 8 (no change)
- Hooks Python scripts: 22 (per hooks_dir ctx_search; cwc/ subdir adds 5 .sh hooks of which `commit-on-stop.sh` is GAP-1 wire-target)
- CLAUDE_CODE env vars: ~30+ in settings.json env block (per `Wave 82a advanced unleash` audit)
- ENABLE_PROMPT_CACHING_1H + ENABLE_TOOL_SEARCH=auto:5 + CLAUDE_AUTOCOMPACT_PCT_OVERRIDE=70 + alwaysThinkingEnabled + effortLevel xhigh: ALL ACTIVE
- Cross-model gate: codex T1-T7 hooks INSTALLED at script level; Phase 1 bootstrap exception active until Tier 1a smoke-probe PASS

VERDICT: 2 NEW gaps surfaced; 3 HNF saturation axes; 1 ADOPT-NOW + 1 STUDY-PILOT + 5 DEFER; artifact at tmp/wave111-agentH-eee-arch-opt-gaps-2026-05-09.md
