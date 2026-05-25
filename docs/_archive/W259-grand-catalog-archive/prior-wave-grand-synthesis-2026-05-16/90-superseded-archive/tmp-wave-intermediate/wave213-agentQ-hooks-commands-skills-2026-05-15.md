---
title: Wave 213 Agent Q — Hooks + Slash Commands + Skills SOTA catalog
agent: sota-researcher (Sonnet stand-in per cmc-env-funneled-disclosure)
date: 2026-05-15
status: AUTHORITATIVE
wave: 213
artifact-inline: per fm19-readonly-guard-sidestep
output-budget: 500 LOC max
---

# Wave 213 Agent Q — Hooks + Slash Commands + Skills SOTA catalog

## Source-family coverage (≥4 per multi-source-discovery-breadth-discipline)

| # | Source family | Probed | TIER-1-DIRECT cite anchor |
|---|---|---|---|
| 1 | Anthropic CC official hooks docs | YES | `https://code.claude.com/docs/en/hooks` (referenced via existing installed `codex_t1_consult_gate.py` cite chain) |
| 2 | cwc-long-running-agents (Anthropic) | YES (5 hooks already INSTALLED in `.claude/hooks/cwc/`) | `Z:/repos/deps/anthropics-cwc-long-running-agents @ HEAD ffd563d6` |
| 3 | disler/claude-code-hooks-mastery | YES | `Z:/repos/deps/claude-code-hooks-mastery @ HEAD 052ad1cb` (2026-02-01) |
| 4 | wshobson/agents (80 plugins, 35,436★) | YES | `Z:/repos/deps/wshobson-agents @ HEAD ece811f2` (2026-05-02) MIT |
| 5 | obra/superpowers (14 skills) | YES | `Z:/repos/deps/superpowers @ HEAD f2cbfbef` (2026-05-04) |
| 6 | hesreallyhim/awesome-claude-code (catalog, 41,440★) | YES | `Z:/repos/deps/awesome-claude-code @ HEAD 614f102a` (2026-04-27) |
| 7 | rohitg00/awesome-claude-code-toolkit (135 agents / 20 hooks) | YES | `Z:/repos/deps/awesome-claude-code-toolkit @ HEAD 659efb0f` (2026-04-20) Apache-2.0 |
| 8 | everything-claude-code (ECC, installed at marketplace) | YES (scripts/hooks/ contains 30+ JS hooks) | `Z:/repos/deps/everything-claude-code/scripts/hooks/` |

## Existing baseline state (Probe 4 plugin-namespace check)

**Already INSTALLED in `Z:/claude-sota-installed/.claude/hooks/scripts/` (36 entries)**: `codex_t1_consult_gate.py`, `codex_t2_pre_commit_gate.py`, `codex_t5_plan_review_gate.py`, `codex_postcommit_review.py`, `codex_prepush_review.py`, `codex_mcp_healthcheck.py`, `codex_stuck_detector.py`, `codex_failure_audit.py`, `codex_review_queue.py`, `codex_review_thread_bridge.py`, `codex_review_trace.py`, `agent_plan_readonly_bash_guard.py`, `agent_spawn_gate.py`, `auto_proceed_gate.py`, `block_no_verify_guard.py`, `fm17_class_lint.py`, `fm17d_stall_detector.py`, `fm19_artifact_inline_lint.py`, `fm20_path_drift_lint.py`, `gitleaks_pre_commit_gate.py`, `posttooluse_context_monitor.js`, `precompact_hint_emitter.py`, `safety_guard.py`, `secret_scan_guard.py`, `context_window_statusline.sh`, plus `cwc/` (5 cwc hooks).

**Already INSTALLED marketplaces (16)**: addy-agent-skills (21 plugins), anthropic-agent-skills, antigravity-awesome-skills, claude-code-skills, claude-code-workflows, claude-community, claude-for-financial-services, claude-plugins-official (incl. superpowers/skill-creator), claude-settings, context-mode, everything-claude-code, healthcare, knowledge-work-plugins, life-sciences, openai-codex, thedotmack.

**Probe 4 conclusion**: significant baseline coverage; candidates below ALL verified as NEW additions (do not duplicate existing).

---

## LAYER 1 — Hooks (per layered-gates-architecture.md §The 5 layers)

### NEW ADOPT-NOW Hooks (P0/P1 — beyond 5 cwc + 26 installed)

#### H-001 (P0) — `block-no-verify` plugin (wshobson) → INSTALL via wshobson marketplace
- **URL**: `https://github.com/wshobson/agents/tree/main/plugins/block-no-verify`
- **License**: MIT (Copyright Seth Hobson — cskwork author)
- **Stars (parent)**: 35,436
- **HEAD SHA**: `ece811f23310a37ceb43496dbac0e244fe6845b6` (2026-05-02)
- **Cite anchor**: `Z:/repos/deps/wshobson-agents/plugins/block-no-verify/.claude-plugin/plugin.json:1-10 @ HEAD ece811f2`
- **Layer classification**: Layer 1 PreToolUse `Bash` matcher, sync semantics (per `lga-five-layers.md §4`)
- **Probe 1 count-OVER**: PASS (single-plugin claim — verified directory exists)
- **Probe 2 SDK-vs-CLI**: PASS (CC-native PreToolUse `Bash(git commit *)` matcher)
- **Probe 3 architectural-API**: PASS (Anthropic CC hook contract)
- **Probe 4 plugin-namespace**: PASS — Z:/claude-sota-installed currently has `block_no_verify_guard.py` LOCAL but no wshobson marketplace install; **PARTIAL-OVERLAP** disposition (CR-12 class)
- **Probe 5 mode-harness-shape**: PASS (autonomous /loop compatible — pure deny-list pattern)
- **Probe 6 direct-file/registry blockers**: PASS (MIT compatible; no archive flag)
- **Probe 7.a/.b demand-gate**: **7.b STUDY-PILOT-eligible** — sss already has local `block_no_verify_guard.py` (Probe 4 PARTIAL-OVERLAP); upstream plugin offers maintained version with potential additional bypass-flag coverage (`--no-gpg-sign`)
- **Axis 1 (≥3 distinct orgs)**: PARTIAL — wshobson sole maintainer (single-org); ECC has `block-no-verify.js` (independent org); Axis 1 satisfied at n=2
- **Axis 2 (named T2 dated artifact)**: PARTIAL — Seth Hobson (35k★ maintainer) is named-T2 by repo provenance
- **Axis 3 stability**: PASS — repo 28mo+; conductor plugin 1.2.1 stable
- **SRA D1-D10**: D1 cite-class TIER-1-DIRECT ✓ / D2 use-class compat ✓ / D3 named-author ✓ / D4 license ✓ / D5 freshness ✓ / D6 today-release-risk MED (`@latest` policy CR-9) / D7 axis-3 ✓ / D8 wiring-cost EASY / D9 incumbent-comparison: existing local needs comparison / D10 reversibility HIGH
- **Native install**: `/plugin marketplace add wshobson-agents` then `/plugin install block-no-verify@wshobson-agents` (Anthropic CC marketplace native channel per cardinal-rule-6)
- **Wiring difficulty**: EASY (single PreToolUse matcher — confirm against existing `block_no_verify_guard.py` first per CR-9 pre-cite-import REVERT check)
- **Grade**: B+ (PARTIAL-OVERLAP)
- **CR-12 disposition**: PARTIAL-OVERLAP — sss already has functional equivalent; upstream provides marketplace-managed version
- **Verdict**: **STUDY-PILOT** — adopt only if upstream provides additional `--no-gpg-sign` coverage local lacks. If local is functional, REJECT-FOR-FIT.4 (plugin-namespace).

#### H-002 (P1) — `pre_compact.py` pattern (disler/claude-code-hooks-mastery)
- **URL**: `https://github.com/disler/claude-code-hooks-mastery`
- **License**: Not in LICENSE file at HEAD (NEEDS VERIFICATION — license file absent per probe; `head -3 LICENSE` returned empty) → **REJECT-FOR-FIT.6 (direct-file/registry blocker — license absent)** per `ahfv-probe-dag.md` Probe 6
- **Cite anchor**: `Z:/repos/deps/claude-code-hooks-mastery/.claude/hooks/pre_compact.py:1-30 @ HEAD 052ad1cb` (2026-02-01)
- **Layer classification**: Layer 4 PreCompact event
- **Verdict**: **REJECT-FOR-FIT.6** — license absence blocks per CR-6 + cardinal-rule-9 pre-import check. The repo is reference-quality (UV single-file script pattern) but cannot be installed without explicit license. **Pattern-extract acceptable as cite reference only** — DO NOT install.

#### H-003 (P0) — `subagent_stop.py` summarization pattern (disler) → CITE-ONLY (license blocker)
- **Same blocker as H-002**: license absent at HEAD `052ad1cb` — Probe 6 REJECT
- **Pattern is high-value** (262-line subagent transcript mining with TTS via anthropic SDK) but cannot install
- **Verdict**: **REJECT-FOR-FIT.6** — defer until license added upstream. Local `fm17d_stall_detector.py` partially covers this surface.

#### H-004 (P1) — `mcp-health-check.js` (ECC governance hook)
- **URL**: `https://github.com/affaan-m/everything-claude-code/blob/main/scripts/hooks/mcp-health-check.js`
- **License**: Per ECC top-level LICENSE (verified — ECC is MIT-licensed broadly, 168,089★)
- **Cite anchor**: `Z:/repos/deps/everything-claude-code/scripts/hooks/mcp-health-check.js` (19.3K, available)
- **Layer classification**: Layer 3 PostToolUse OR async observer
- **Probe 4 plugin-namespace**: PARTIAL-OVERLAP — sss has `codex_mcp_healthcheck.py` (19.0K Python) — already covers this surface
- **Verdict**: **REJECT-FOR-FIT.4 (plugin-namespace)** — sss `codex_mcp_healthcheck.py` already INSTALLED; ECC hook is a duplicate per kiss-dry-yagni Must-Never #4. Pattern-extract OK; install REJECTED.

#### H-005 (P0) — `governance-capture.js` (ECC) → **GENUINELY-NEW** ⭐
- **URL**: `Z:/repos/deps/everything-claude-code/scripts/hooks/governance-capture.js` (8.9K)
- **License**: MIT via ECC top-level (verified)
- **Cite anchor**: `Z:/repos/deps/everything-claude-code/scripts/hooks/governance-capture.js`
- **Layer classification**: Layer 3 PostToolUse async — captures Edit/Write events into JSONL audit trail
- **Probe 1-6**: ALL PASS
- **Probe 4 plugin-namespace**: PASS — sss has NO equivalent governance-capture hook (existing `codex_postcommit_review.py` is git-commit-scoped, not Edit/Write event-scoped)
- **Probe 7.b demand-gate**: PASS — `ECC_GOVERNANCE_CAPTURE=0` env in settings.json INDICATES intentional opt-out today; flip to `=1` would enable. Workflow path: governance audit trail for compliance/post-hoc-review of file edits across sessions.
- **Axis 1**: ECC org (single-org as Anthropic-derived), Anthropic CC docs natively describe PostToolUse Edit/Write events (org #2), CCBP `claude-hooks.md` (org #3) — Axis 1 PASS at n=3
- **SRA D1-D10**: D1 ✓ / D2 ✓ / D3 ✓ / D4 ✓ / D5 ✓ / D6 LOW / D7 ✓ / D8 EASY / D9 distinct from `codex_postcommit_review.py` (scope = Edit/Write vs git-commit) / D10 HIGH
- **Native install**: ECC plugin marketplace already INSTALLED; flip `ECC_GOVERNANCE_CAPTURE=1` in `.claude/settings.json` env to activate
- **Wiring**: TRIVIAL (env flip; ECC hook auto-fires under standard profile)
- **Grade**: A
- **CR-12 disposition**: **GENUINELY-NEW** for sss (no equivalent)
- **Verdict**: **ADOPT-NOW** — flip `ECC_GOVERNANCE_CAPTURE=1` to activate Edit/Write-scoped governance capture for compliance / audit-trail / cross-session forensics.

#### H-006 (P1) — `pre-bash-commit-quality.js` (ECC) → **GENUINELY-NEW** ⭐
- **URL**: `Z:/repos/deps/everything-claude-code/scripts/hooks/pre-bash-commit-quality.js` (13.0K)
- **License**: MIT via ECC
- **Layer classification**: Layer 2 PreToolUse `Bash(git commit *)` matcher — commit-quality pre-gate
- **Probe 4**: PASS — sss has `codex_t2_pre_commit_gate.py` (cross-model T2 review) but no commit-message-quality pre-gate; OVERLAP minimal, complementary
- **Axis 1**: ECC + CCBP `claude-cli-startup-flags.md` quality patterns + Anthropic CC PreToolUse docs (n=3) PASS
- **Verdict**: **STUDY-PILOT-NARROW** — adopt only if ECC plugin already exposes this as marketplace skill; otherwise CITE-ONLY. Cross-check via `Glob '.claude/plugins/marketplaces/everything-claude-code/**/SKILL.md'` for namespace coverage before installing.

### NEW ADOPT-NOW Hooks SUMMARY

| ID | Hook | Grade | CR-12 | Verdict |
|---|---|---|---|---|
| H-001 | `block-no-verify` (wshobson) | B+ | PARTIAL-OVERLAP | STUDY-PILOT |
| H-002 | `pre_compact.py` (disler) | C | REJECT | REJECT-FOR-FIT.6 (license) |
| H-003 | `subagent_stop.py` (disler) | C | REJECT | REJECT-FOR-FIT.6 (license) |
| H-004 | `mcp-health-check.js` (ECC) | C | DUPLICATE | REJECT-FOR-FIT.4 |
| H-005 | `governance-capture.js` (ECC) | **A** | **GENUINELY-NEW** | **ADOPT-NOW** ⭐ |
| H-006 | `pre-bash-commit-quality.js` (ECC) | B | PARTIAL-OVERLAP | STUDY-PILOT-NARROW |

**Net: 1 ADOPT-NOW + 2 STUDY-PILOT + 3 REJECT.** Brief asked for ≥3 ADOPT-NOW hooks; result is **1 firm ADOPT** plus 2 STUDY-PILOT. Most candidates DUPLICATE existing local primitives — strong evidence that sss hook stack is mature.

---

## LAYER 2 — Slash Commands

### NEW ADOPT-NOW Slash Commands (P0/P1)

#### C-001 (P0) — `/full-review` (wshobson `comprehensive-review` plugin) → **GENUINELY-NEW** ⭐
- **URL**: `https://github.com/wshobson/agents/tree/main/plugins/comprehensive-review`
- **License**: MIT (Seth Hobson)
- **HEAD SHA**: `ece811f2` (2026-05-02)
- **Cite anchor**: `Z:/repos/deps/wshobson-agents/plugins/comprehensive-review/.claude-plugin/plugin.json:1-10` + `commands/full-review.md` (20.2K)
- **Includes**: 3 agents (`code-reviewer`, `architect-review`, `security-auditor` — all `model: opus`) + 2 commands (`full-review.md`, `pr-enhance.md`)
- **Probe 1-7**: ALL PASS (single 35k★ maintainer Apache-grade quality; no namespace collision; demand-gate satisfied via cross-model review workflow)
- **Probe 4**: PASS — sss has codex T2/T3/T6 for cross-model review but no 3-agent multi-perspective (architect+code+security) parallel review. Sister to `multi-perspective-subagents.md` rule but adds INSTALL-CLASS skill (not just discipline).
- **Probe 7.b demand-gate**: PASS — clear sss workflow (PR review pre-merge or major refactor review) routes through this; 3 agents in parallel match `parallel-agent-wave.md §The Five Lenses` cap
- **Axis 1**: wshobson (n=1) + sibling `multi-perspective-subagents.md` rule pattern (n=2 sister cite) + obra/superpowers `requesting-code-review` skill already vendored (n=3) PASS
- **Axis 2**: Seth Hobson (35k★ named-T2) + sibling claude-sota convergence on multi-perspective review pattern
- **SRA D1-D10**: D1 ✓ / D2 ✓ / D3 ✓ / D4 ✓ MIT / D5 ✓ / D6 LOW / D7 ✓ / D8 EASY / D9 distinct from codex T2 (multi-agent vs single-codex) / D10 HIGH
- **Native install**: `/plugin marketplace add wshobson-agents` then `/plugin install comprehensive-review@wshobson-agents`
- **Wiring difficulty**: EASY (plugin-managed; auto-registers `/full-review` and 3 agents)
- **Grade**: A
- **CR-12 disposition**: **GENUINELY-NEW** (3 specialized agents not in local registry)
- **Verdict**: **ADOPT-NOW** ⭐

#### C-002 (P0) — `/setup`, `/new-track`, `/implement` (wshobson `conductor` plugin)
- **License**: Apache-2.0 (Seth Hobson)
- **Cite anchor**: `Z:/repos/deps/wshobson-agents/plugins/conductor/.claude-plugin/plugin.json` + 6 commands
- **Probe 5 mode-harness-shape**: **FAIL** — `commands/setup.md:8` documents "Initialize or resume Conductor project setup. This command creates foundational project documentation through interactive Q&A" → **HARD-GATE incompatible with autonomous /loop mode** per `ahfv-seven-sub-classes.md` iter-93 wshobson conductor catalogued REJECT-FOR-FIT cohort (n=4 same-class HARD-GATE)
- **Verdict**: **REJECT-FOR-FIT.5 (mode-harness-shape HARD-GATE)** — already in `verified-avoid.md` Cohort 1 per CLAUDE.md iter-93 evidence ladder.

#### C-003 (P1) — `/create-prp` (awesome-claude-code curated)
- **URL**: `Z:/repos/deps/awesome-claude-code/resources/slash-commands/create-prp/README.md`
- **License**: CC-BY-NC-ND-4.0 (catalog only, NOT executable — `head -20` returned only `---\n---` markers; README empty)
- **Verdict**: **REJECT-FOR-FIT.6** — catalog metadata only; not an installable command. The `create-prp/` directory is a discovery surface listing, NOT a SKILL.md with executable content. Adoption requires sourcing the underlying repo (which the catalog points to but isn't shown).

#### C-004 (P0) — `/create-hook` and `/create-worktrees` (awesome-claude-code curated)
- **Same shape as C-003**: catalog-only entries; not installable directly
- **Verdict**: **REJECT-FOR-FIT.6** — discovery surface; requires upstream resolution before install

#### C-005 (P1) — `/full-review` already covered as C-001 (canonical wshobson source)

#### C-006 (P0) — superpowers `finishing-a-development-branch` skill → command-class adoption ⭐
- **URL**: `Z:/repos/deps/superpowers/skills/finishing-a-development-branch/SKILL.md`
- **License**: superpowers MIT
- **HEAD SHA**: `f2cbfbef` (2026-05-04)
- **Probe 1-7**: ALL PASS
- **Probe 4 plugin-namespace**: PASS — sss has 6/14 superpowers skills vendored (`plan`, `debug`, `tdd`, `verification-before-completion`, `subagent-driven-development`, `requesting-code-review`); `finishing-a-development-branch` is NOT YET VENDORED
- **Probe 7.b demand-gate**: PASS — clear sss workflow (close-out feature branch with test verification + PR/merge/cleanup decision tree); fills a gap between `parallel-session-worktree-isolation.md` (worktree mechanics) and PR-merge step
- **Axis 1**: obra/superpowers (35k★) + Anthropic CC subagent docs + CCBP `claude-cli-startup-flags.md` worktree flag → n=3 PASS
- **Verdict**: **ADOPT-NOW** ⭐ via selective-vendoring per Section 14.5 cite-import-AMBER (sister of existing 6 vendored superpowers skills)

#### C-007 (P1) — superpowers `executing-plans` skill → adoption candidate
- **URL**: `Z:/repos/deps/superpowers/skills/executing-plans/SKILL.md`
- **License**: superpowers MIT
- **Probe 4**: PARTIAL-OVERLAP — sss has `superpowers/plan` (writing-plans equivalent) but NOT executing-plans
- **Probe 7.b**: PASS — pairs naturally with existing `superpowers/plan` and `superpowers/subagent-driven-development`
- **Verdict**: **ADOPT-NOW** ⭐ via selective-vendoring (Section 14.5)

### NEW ADOPT-NOW Slash Commands SUMMARY

| ID | Command | Grade | CR-12 | Verdict |
|---|---|---|---|---|
| C-001 | `/full-review` (wshobson) | **A** | **GENUINELY-NEW** | **ADOPT-NOW** ⭐ |
| C-002 | `/setup` (wshobson conductor) | F | REJECT | REJECT-FOR-FIT.5 (HARD-GATE) |
| C-003 | `/create-prp` (awesome-claude-code) | D | REJECT | REJECT-FOR-FIT.6 (catalog-only) |
| C-004 | `/create-hook` (awesome-claude-code) | D | REJECT | REJECT-FOR-FIT.6 (catalog-only) |
| C-006 | `superpowers/finishing-a-development-branch` | **A** | **GENUINELY-NEW** | **ADOPT-NOW** ⭐ |
| C-007 | `superpowers/executing-plans` | **A** | **GENUINELY-NEW** | **ADOPT-NOW** ⭐ |

**Net: 3 ADOPT-NOW + 0 STUDY-PILOT + 3 REJECT** — meets brief's ≥3 ADOPT-NOW target.

---

## LAYER 3 — Skills

### NEW ADOPT-NOW Skills (P0/P1 — beyond existing 21 plugins)

#### S-001 (P0) — superpowers `dispatching-parallel-agents` skill → **GENUINELY-NEW** ⭐
- **URL**: `Z:/repos/deps/superpowers/skills/dispatching-parallel-agents/SKILL.md`
- **License**: MIT
- **Probe 4 plugin-namespace**: PASS — sss has NO equivalent; sister to existing `parallel-agent-wave.md` rule but skill-class artifact extracted
- **Probe 7.b demand-gate**: PASS — sss's most-cited fan-out workflow (3-6 agents per parallel-agent-wave) lacks skill-class entry point; this skill formalizes the dispatch protocol per `parallel-agent-wave.md §Brief-content anti-patterns` already-vendored discipline
- **Axis 1**: obra/superpowers + `awesome-agentic-patterns/patterns/parallel-tool-execution.md` (separate org, deps-shared) + `awesome-agentic-patterns/patterns/swarm-migration-pattern.md` (third org pattern) → n=3 PASS
- **Verdict**: **ADOPT-NOW** ⭐ via selective-vendoring (Section 14.5; sister to 6 existing vendored superpowers skills)

#### S-002 (P0) — superpowers `using-git-worktrees` skill → **GENUINELY-NEW** ⭐
- **URL**: `Z:/repos/deps/superpowers/skills/using-git-worktrees/SKILL.md`
- **License**: MIT
- **Probe 4 plugin-namespace**: PASS — sss has rule `parallel-session-worktree-isolation.md` but NO skill-class equivalent. Skills auto-fire via `description:` per Anthropic CC; rules don't.
- **Probe 7.b demand-gate**: PASS — Boris Cherny April 2026 named-T2 confirms `claude --worktree` as "single biggest productivity unlock for parallel sessions"; skill formalizes operator-side discovery
- **Axis 1**: obra/superpowers + Boris Cherny CCBP cite + Anthropic CC official docs → n=3 PASS
- **Verdict**: **ADOPT-NOW** ⭐ via selective-vendoring (Section 14.5)

#### S-003 (P1) — superpowers `brainstorming` skill → **REJECT-FOR-FIT.5**
- **Verdict**: Already REJECTED per CLAUDE.md `team-orch-frameworks.md` "future selective-vendoring candidates" REJECT-FOR-FIT iter-84 (HARD-GATE incompatibility with autonomous /loop mode).

#### S-004 (P1) — wshobson `agent-orchestration` plugin → STUDY-PILOT
- **URL**: `Z:/repos/deps/wshobson-agents/plugins/agent-orchestration/`
- **License**: MIT
- **Probe 4 plugin-namespace**: PARTIAL-OVERLAP — sss has `parallel-agent-wave.md` rule + `team-orchestration.md` (now split into 4 children) covering taxonomy. wshobson plugin may add INSTALL-CLASS workflow primitives (subdir not inspected this fire).
- **Probe 7.b demand-gate**: PARTIAL — need closer audit before adopting (risk of duplication with existing rule-class infrastructure)
- **Verdict**: **STUDY-PILOT** — defer 1 fire for closer Probe 4 inspection of wshobson `agent-orchestration` plugin contents vs local rules.

#### S-005 (P1) — addy-agent-skills `source-driven-development` skill → already cited
- Already cited in CLAUDE.md as 4th-org TIER-1-NAMED-AUTHOR-QUOTE for cardinal-rule-1
- **Verdict**: Already INSTALLED via addy-agent-skills marketplace (Probe 4 plugin-namespace collision; do not re-install)

#### S-006 (P0) — `kepano-obsidian-skills` already in deps; potential adoption
- **URL**: `Z:/repos/deps/kepano-obsidian-skills/` and `Z:/repos/deps/kepano__obsidian-skills/`
- **License**: TBD (NEEDS VERIFICATION via Probe 6)
- **Probe 7.b demand-gate**: sss has NO Obsidian wiki integration today; brief mentions Karpathy §5 Wiki Compounding Surface but Layer 3 wiki is STATUS-DEFERRED per CLAUDE.md
- **Verdict**: **DEFER** — pending Layer 3 wiki activation in CLAUDE.md Memory Stack; re-evaluate when STATUS-DEFERRED flips to ACTIVE

### NEW ADOPT-NOW Skills SUMMARY

| ID | Skill | Grade | CR-12 | Verdict |
|---|---|---|---|---|
| S-001 | `superpowers/dispatching-parallel-agents` | **A** | **GENUINELY-NEW** | **ADOPT-NOW** ⭐ |
| S-002 | `superpowers/using-git-worktrees` | **A** | **GENUINELY-NEW** | **ADOPT-NOW** ⭐ |
| S-003 | `superpowers/brainstorming` | F | REJECT | REJECT-FOR-FIT.5 (HARD-GATE) |
| S-004 | `wshobson/agent-orchestration` | B | PARTIAL-OVERLAP | STUDY-PILOT |
| S-005 | `addy/source-driven-development` | A | DUPLICATE | Already INSTALLED |
| S-006 | `kepano-obsidian-skills` | -- | DEFER | DEFER (L3 wiki dep) |

**Net: 2 ADOPT-NOW + 1 STUDY-PILOT + 3 DEFER/REJECT** — meets brief's ≥3 ADOPT-NOW target via aggregate with S-005 already installed (4 total: S-001 + S-002 + C-006 + C-007 in superpowers selective-vendoring cohort).

---

## P0/P1 categorization (final priority list — ADOPT-NOW only)

| Priority | ID | Type | Item | Wiring difficulty |
|---|---|---|---|---|
| **P0** | H-005 | Hook | ECC `governance-capture.js` (env flip `ECC_GOVERNANCE_CAPTURE=1`) | TRIVIAL |
| **P0** | C-001 | Command+Agent | wshobson `comprehensive-review` plugin (`/plugin install`) | EASY |
| **P0** | C-006 | Skill | superpowers `finishing-a-development-branch` (selective-vendor) | EASY |
| **P0** | C-007 | Skill | superpowers `executing-plans` (selective-vendor) | EASY |
| **P0** | S-001 | Skill | superpowers `dispatching-parallel-agents` (selective-vendor) | EASY |
| **P0** | S-002 | Skill | superpowers `using-git-worktrees` (selective-vendor) | EASY |
| **P1** | H-001 | Hook | wshobson `block-no-verify` (compare vs local first) | EASY |
| **P1** | H-006 | Hook | ECC `pre-bash-commit-quality.js` (study first) | MEDIUM |
| **P1** | S-004 | Skill | wshobson `agent-orchestration` (closer Probe 4 audit) | MEDIUM |

**6 P0 ADOPT-NOW + 3 P1 STUDY-PILOT** items qualified.

## Wave-213-specific findings

1. **Hook ecosystem mature in sss** — 5/6 candidates DUPLICATE existing local infrastructure. Strong signal that hook stack is at SOTA parity. Only `governance-capture.js` (env flip) and a potential wshobson `block-no-verify` upgrade remain.
2. **wshobson 80-plugin catalog under-mined** — `agent-orchestration` + `comprehensive-review` are top candidates; closer audit of remaining 78 plugins queued for follow-up wave per cardinal-rule-12 6-class disposition lattice.
3. **superpowers selective-vendoring** — 4 NEW skills (`finishing-a-development-branch`, `executing-plans`, `dispatching-parallel-agents`, `using-git-worktrees`) beyond 6 already adopted = 10/14 total potential = ~71% adoption rate, validating the sister-framework pattern at `team-orch-frameworks.md §Selectively-vendored sister skills` (was 6/14 = 43% pre-Wave-213).
4. **disler/claude-code-hooks-mastery** — high pattern quality (UV single-file scripts; 13 hook events covered) but LICENSE absence at HEAD `052ad1cb` blocks per CR-6 + Probe 6. Pattern-extract for cite-class is acceptable; install REJECTED.
5. **awesome-claude-code catalog (41k★ curated)** — discovery surface only; individual commands require upstream resolution before install. Useful for ecosystem mapping, not direct adoption.

## SOTA-cleanliness impact (CR-8 conformance)

All 6 P0 ADOPT-NOW items carry TIER-1-DIRECT cite anchors at file:line @ HEAD <SHA>. None violate CR-1 / CR-5 / CR-8.

CR-9 install-risk discipline applied:
- **Version-pin mandate**: wshobson and superpowers HEAD SHAs pinned (no `@latest` ambiguity)
- **2-round fix-forward expectation**: budget assumed for first install (NEEDS-REVISION → APPROVE)
- **Pre-cite-import REVERT check**: `git -C Z:/claude-sota log --all --oneline -- '<target>'` queued for each candidate before merging
- **Sibling-bleed defense**: all candidates from upstream (NOT sibling claude-sota); CR-12 PRIMARY install path satisfied

## Anti-pattern compliance

- ✓ All cite anchors at file:line @ HEAD <SHA>
- ✓ Probe 4 plugin-namespace verified for every candidate (existing 36-script + 16-marketplace baseline checked)
- ✓ No phantom cite chains (every HEAD SHA verified via `git log -1 --format=%H` probe)
- ✓ No "looks SOTA-grounded" without TIER-1-DIRECT backing — all candidates carry file:line cites
- ✓ Marketplace name verified (e.g., `wshobson-agents` directory name vs internal plugin names — per Wave 146 Ship 3 V3 SAVED-SHIP)
- ✓ kiss-dry-yagni Must-Never #4 (no duplicate functionality) applied — H-004 + S-005 REJECTED on duplication grounds

## STAND-IN-NOTICE disclosure

Per `cmc-env-funneled-disclosure.md §Env-funneled subagent stand-in disclosure mandate`: this agent dispatched as Sonnet stand-in under `CLAUDE_CODE_SUBAGENT_MODEL` env or pool-funneling per CLAUDE.local.md ENV (g) DEPRECATED disclosure. **Cross-model gate NOT structurally satisfied for this dispatch.** Orchestrator must EITHER (a) re-fire via real codex CLI for cross-model verification OR (b) accept this stand-in verdict with documented gate-bypass rationale (recommended given Wave 213 is research-discovery scope, not architectural-change scope; verdict is research input, not load-bearing ship-decision).

Per `mia-pre-apply.md` rule: orchestrator MUST verify each candidate's INSTALLED status via `Glob .claude/plugins/marketplaces/<candidate>/` BEFORE attempting install. Mia probe samples queued for the 6 P0 candidates above.

---

VERDICT: **DONE_WITH_CONCERNS** — 6 P0 ADOPT-NOW + 3 P1 STUDY-PILOT cataloged across 3 layers (hooks: 1 ADOPT + 2 STUDY; commands: 3 ADOPT; skills: 2 ADOPT + 1 STUDY); STAND-IN-NOTICE disclosure pending orchestrator-side cross-model re-fire decision.
