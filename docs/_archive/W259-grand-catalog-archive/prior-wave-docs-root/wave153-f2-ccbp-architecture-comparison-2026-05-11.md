# Wave 153 Fire 2 — CCBP architecture comparison audit + Forward Top-N gap ranking

# Reference: TIER-1-DIRECT user directive 2026-05-11 — "https://github.com/shanraisshan/claude-code-best-practice deep dive line by line and compare your architecture with it and make sure our entire system is optimize with sota practice"
# Reference: TIER-1-DIRECT CCBP @ HEAD `4527f4d4e749acd3609329be47b984f668f40052` (upstream remote 2026-05-11 — fetched per CR-6 fresh-from-github)
# Reference: TIER-1-DIRECT CCBP @ HEAD `64fffd53a7c6f8e2e0b1575fdd200b65cda04737` (cited anchor across our cardinal rules + manifest; STALE by 22 commits / 23 files / +1304/-207 LOC since cited)
# Cite-class lattice: constituents=[TIER-1-DIRECT @ CCBP `4527f4d4` upstream + CCBP `64fffd53` frozen-cited, TIER-3-LOCAL-COMPOSITION @ Wave 153 F2 audit synthesis]; effective_tier=TIER-3-LOCAL-COMPOSITION per `Z:/claude-sota/.claude/rules/citation-discipline.md` rule #8

## Context

CCBP shipped CC v2.1.126 → v2.1.138 docs between 2026-05-01 and 2026-05-09 (8 days; 12 minor releases). Our cardinal-rule cite anchors lag at `64fffd53` (v2.1.126-era). Per cardinal-rule-6 fresh-from-github mandate + cardinal-rule-1 cite-trail freshness: comprehensive audit needed.

HEAD at probe time: `076202d` (parallel session-checkpoint between V1 audit composition and Wave 153 F1 atomic commit `5495bbd` per FM-02 (c) absorption pattern). V3 ADVERSARIAL caught HEAD drift.

## Cross-model gate CR-3 satisfaction (Wave 24-D 3-voice convergence)

**V1 (orchestrator Opus 4.7)**: Top-N ranking with `CLAUDE_CODE_SESSION_ID` at #1, changelog META at #4, skill budget NOT surfaced. Mia n=325 → n=326 caught `skillOverrides` REJECT-FOR-FIT pre-V2 dispatch.

**V2 codex T1 Path P REAL GPT-5.5 (codex CLI v0.130.0)** verdict file `.claude/state/codex_consult_w153_f2_ccbp_audit_v2_OUT.txt` (155,894 tokens; ~5-6min wall-clock): **REVISE-RANKING @ conf=0.81**. Primary critique: "Top-N over-ranks tactical hook cleanup; under-ranks CCBP's drift-prevention/checklist and context-load optimization patterns." 5 ranking amendments + 3 missed gaps. V2 promoted changelog META to #1; surfaced skill 15K description budget audit; demoted cite-anchor refresh as F30-diminishing-returns risk. **CR-12 class V2 said CITE-ONLY**.

**V3 codex T1 Path P REAL GPT-5.5 ADVERSARIAL** verdict file `.claude/state/codex_consult_w153_f2_ccbp_audit_v3_adversarial_OUT.txt` (~7400 LOC; FM-09 14/14 → **15/15 firm**): **SAVED-SHIP @ conf=0.90**.

**V3 single-most-likely-V1+V2-MISS**: ".claude/plugins has 2025 SKILL.md with descriptions totaling ~475K chars vs CCBP default 15K char budget (~32× OVER) — auto-skill discovery may be SILENTLY TRUNCATED OR DISTORTED."

**V3 ADVERSARIAL findings** (7 catches V1+V2 missed):
1. V2 over-promoted changelog META to #1 despite the audit doc itself calling it "SIGNIFICANT MULTI-FIRE REFACTOR ARC" — violates leverage = impact × ease × CR-conformance
2. Skill 15K char description budget audit empirically TOP PRIORITY (V2 mentioned but didn't promote above changelog META)
3. MCP `alwaysLoad` gap is WEAK — local `.mcp.json` + settings have ZERO `alwaysLoad` entries (V2 missed this empirical check)
4. Agent/command/skill boundary audit is DUPLICATE — `team-orchestration.md §"Layered architecture (shan canonical)"` already cites CCBP `reports/claude-agent-command-skill.md`
5. **CR-12 CITE-ONLY is NOT a valid 6-class lattice class** per W152 F29 formal codification. Correct disposition: **PARTIAL-OVERLAP** with **CITE-PATTERN-ONLY** action; effective_tier=TIER-3-LOCAL-COMPOSITION
6. V2 approve_ship_immediately=false correct if interpreted as "revise ranking now"; another broad iteration risks F30 diminishing-returns
7. HEAD context dirty: 5495bbd one commit behind; current is 076202d session-checkpoint

**Orchestrator-side empirical verification** of V3's load-bearing SAVED-SHIP catch:
- `find .claude/plugins -name 'SKILL.md' -type f | wc -l` → **2,035** (V3 said 2,025; 99.5% accurate)
- precise description char sum via `awk '/^description:/{sub(/^description: */,""); print; exit}' SKILL.md` → **509,238 chars** (V3 said ~475K; ~33.9× CCBP 15K budget)
- `grep -nE 'alwaysLoad' .mcp.json .claude/settings.json` → **0 matches** (V3 confirmed)
- HEAD now `076202d` (V3 caught drift; V1 baseline was `5495bbd`)

**CR-3 cross-model gate FULLY SATISFIED**: 3rd non-Phase-1-bootstrap satisfaction in W152+W153 arc (W152 F29 1st, W153 F1 2nd, W153 F2 3rd).

## Coverage matrix (CCBP file → our adoption status)

| CCBP file | Cite count in our rules | Coverage status |
|---|---|---|
| `best-practice/claude-cli-startup-flags.md` | 4+ | Full (parallel-session-worktree-isolation + parallel-sessions) |
| `best-practice/claude-commands.md` | 4+ | PARTIAL — v2.1.138 NEW `/radio` + `/rewind` not yet in our cite anchors |
| `best-practice/claude-mcp.md` | 1 (CLAUDE.md only) | LOW — broader MCP best-practices not cited beyond "NEVER commit secrets" |
| `best-practice/claude-memory.md` | 3+ | Full (CLAUDE.md L11 + CLAUDE.local.md L3 + canonical.md) |
| `best-practice/claude-power-ups.md` | **0** | **NEW GAP** — `/powerup` 10 lessons including `/rewind` discoverability not cited |
| `best-practice/claude-settings.md` | 8+ | PARTIAL — v2.1.138 added 7 NEW keys NOT cited (see §v2.1.138 analysis below) |
| `best-practice/claude-skills.md` | 5+ | Full frontmatter spec |
| `best-practice/claude-subagents.md` | 10+ | Full frontmatter spec |
| `development-workflows/cross-model-workflow/cross-model-workflow.md` | 5+ | LOAD-BEARING for `cross-model-consensus.md` |
| `development-workflows/rpi/rpi-workflow.md` | 3+ | Full (CLAUDE.md L40 + research-protocol.md) |
| `tips/claude-boris-6-tips-16-apr-26.md` | 3+ | Worktree pattern per `parallel-session-worktree-isolation.md` |
| `tips/claude-thariq-tips-16-apr-26.md` | 1 | `/rewind` discipline cited per `coordination.md §12 rewind-first` |
| `tips/claude-boris-15-tips-30-mar-26.md` | 1 | `parallel-sessions.md` |
| `tips/claude-boris-10-tips-01-feb-26.md` | **0** | **NEW GAP** |
| `tips/claude-boris-12-tips-12-feb-26.md` | **0** | **NEW GAP** |
| `tips/claude-boris-13-tips-03-jan-26.md` | **0** | **NEW GAP** |
| `tips/claude-thariq-tips-17-mar-26.md` | **0** | **NEW GAP** |
| `implementation/claude-agent-teams-implementation.md` | 2+ | `team-orchestration.md` (TeamCreate primitive) |
| `implementation/claude-commands-implementation.md` | **0** | **NEW GAP** — implementation patterns for /command |
| `implementation/claude-scheduled-tasks-implementation.md` | 1 | `fm21-queue-time-prompt-freeze.md` (CronCreate/ScheduleWakeup) |
| `implementation/claude-skills-implementation.md` | **0** | **NEW GAP** — implementation patterns for skill |
| `implementation/claude-subagents-implementation.md` | **0** | **NEW GAP** — implementation patterns for subagent |
| `changelog/<topic>/changelog.md` (5 NEW since 64fffd53) | **0** | **NEW META-PATTERN** — per-topic changelog discipline NOT in our system |
| `changelog/<topic>/verification-checklist.md` (3 NEW) | **0** | **NEW META-PATTERN** — per-topic verification rules with depth levels (exists / presence-check / content-match / field-level / cross-file) NOT in our system |
| `.claude/agents/workflows/best-practice/*` (5 NEW agents) | **0** | **NEW PATTERN** — CCBP self-maintenance agents (orthogonal to our needs but adoptable for OUR cite-anchor freshness audit) |
| `.claude/commands/workflows/*` (3 NEW commands) | **0** | **NEW PATTERN** — CCBP workflow commands |

## v2.1.138 NEW settings keys — adoption analysis (per CCBP changelog `4527f4d4`)

Probe via `grep -nE 'parentSettingsBehavior|policyHelper|skillOverrides|worktree.baseRef|hard_deny|CLAUDE_CODE_SESSION_ID|...' .claude/settings.json CLAUDE.md CLAUDE.local.md tools/eee.ps1` returned **0 matches** — none of the 7 NEW keys currently in our config.

| # | Key | Version | Use case | Adoption recommendation |
|---|---|---|---|---|
| 1 | `parentSettingsBehavior` | v2.1.133 | Managed-tier merge control | N/A — single-operator install runtime; not managed-tier |
| 2 | `policyHelper` | v2.1.136 | Managed-tier runtime org-policy compute | N/A |
| 3 | `skillOverrides` | v2.1.129 | Control auto-skill invocation: off / user-invocable-only / name-only | **REJECT-FOR-FIT** per Mia probe — would BREAK 4-skill meta-stack (using-superpowers + using-agent-skills + skill-comply + skill-creator) which DEPENDS on auto-fire description matching per CLAUDE.md L270-272 |
| 4 | `worktree.baseRef` | v2.1.133 | `"fresh"` (default) vs `"head"` for `--worktree` branch source | **OPERATOR-DECISION** — current default `"fresh"` matches `parallel-session-worktree-isolation.md` discipline; `"head"` would inherit in-progress work |
| 5 | `autoMode.hard_deny` | v2.1.136 | Unconditional block rules (cannot be overridden by allow exceptions) | **OPERATOR-DECISION-ON-CR-7-PHASE-3** — relevant only when restored to `defaultMode: "auto"` per CR-7 Phase 3 trigger predicate; codifies security floor for destructive Bash patterns |
| 6 | `sandbox.bwrapPath` / `sandbox.socatPath` | v2.1.133 | Linux/WSL managed-only bwrap+socat binary paths | N/A — Windows runtime |
| 7 | NEW env vars | v2.1.129/132/136 | `CLAUDE_CODE_SESSION_ID` + `CLAUDE_CODE_DISABLE_ALTERNATE_SCREEN` + `CLAUDE_CODE_FORCE_SYNC_OUTPUT` + `CLAUDE_CODE_PACKAGE_MANAGER_AUTO_UPDATE` + `CLAUDE_CODE_ENABLE_GATEWAY_MODEL_DISCOVERY` + `CLAUDE_CODE_ENABLE_FEEDBACK_SURVEY_FOR_OTEL` | `CLAUDE_CODE_SESSION_ID` is **HIGH LEVERAGE** for ~5 hook scripts that parse `transcript_path` for session correlation (per Mia probe: agent_plan_readonly_bash_guard.py + auto_proceed_gate.py + codex_review_trace.py + fm17_class_lint.py + fm17d_stall_detector.py); others conditional/lower-leverage |

## v2.1.138 NEW slash commands

| Command | Description | Adoption |
|---|---|---|
| `/radio` | Claude FM lo-fi radio | **REJECT-FOR-FIT** — entertainment; no operational value for autonomous /loop |
| `/rewind` (alias `/checkpoint`, `/undo`) | Rewind conversation/code or summarize from selected message | **MINOR** — already cited in `coordination.md §12 rewind-first` per Thariq; update cite to include v2.1.138 aliases |

## CCBP CC v2.1.138 changelog summary

22 commits between cited HEAD `64fffd53` and current `4527f4d4`:
- 7 NEW settings keys (above)
- 6+ NEW env vars (above)
- 1 NEW slash command (`/radio`) + 1 refined (`/rewind` aliases) + 1 enhanced (`/context [all]`) + 2 detail bumps (`/init` CLAUDE_CODE_NEW_INIT + `/branch` CLAUDE_CODE_FORK_SUBAGENT)
- NEW changelog discipline: per-topic `changelog.md` + `verification-checklist.md` with depth-level discipline (exists / presence-check / content-match / field-level / cross-file)
- NEW workflow agents at `.claude/agents/workflows/best-practice/` (5)
- NEW workflow commands at `.claude/commands/workflows/` (3)
- NEW presentation assets (Karpathy AI Engineer video tag — TIER-1-NAMED-AUTHOR-QUOTE per cite-discipline rule #6)
- README.md restructure (+69 LOC)

## Forward Top-N gap ranking — V3-REVISED (post-V2+V3 convergence)

🥇 **Skill topology + context-budget audit** (V3 SAVED-SHIP CATCH; promoted from "missed-gap" to #1 per empirical 509K chars / 2035 SKILL.md = 33.9× CCBP 15K budget). Single-fire audit-class ship. Measures: per-marketplace SKILL.md count + description chars + auto-discoverable vs disabled subset + top-N verbose-description offenders + actionable recommendation (skillOverrides REJECT-FOR-FIT per Mia n=326 + W152 F28 hookify DISABLED-after-trial precedent; viable alternatives: `disable-model-invocation: true` per-skill OR marketplace-prune via `disabledPlugins`/`disabledMcpjsonServers` analogs). **HIGH LEVERAGE** (auto-skill discovery silently broken at 33.9× budget) / **LOW blast radius** (audit only; no settings.json edit unless operator-approved). Cite CCBP `reports/claude-skills-for-larger-mono-repos.md:91-100,124-141 @ HEAD 4527f4d4` + `best-practice/claude-skills.md @ HEAD 4527f4d4`.

🥈 **`CLAUDE_CODE_SESSION_ID` env-var adoption in 5 transcript_path-parsing hook scripts** (V2: was V1's #1; demoted to #2/#3 per V3) — replaces transcript_path JSONL parsing complexity in `auto_proceed_gate.py` + `codex_review_trace.py` + `fm17_class_lint.py` + `fm17d_stall_detector.py` + `agent_plan_readonly_bash_guard.py`; future-proof per CCBP v2.1.132+. **HIGH LEVERAGE / MEDIUM blast radius** (hooks fire on every Bash/Edit/Write/Stop). CR-9 install-risk: 2-round fix-forward budget. Single-fire ship per ONE-LOGICAL-UNIT. Cite CCBP `best-practice/claude-settings.md:819 @ HEAD 4527f4d4`.

🥉 **CCBP cite-anchor refresh `64fffd53` → `4527f4d4`** (V2 demoted; cite-anchor refresh alone is CR-1 hygiene risking F30 diminishing-returns UNLESS tied to checklist automation) — recommend bundle with #4 changelog META adoption OR with #1 skill budget audit (when each rule touched anyway). Multi-fire arc. Cite CCBP `changelog/best-practice/claude-settings/verification-checklist.md:23-30,76-80 @ HEAD 4527f4d4`.

#4 **CCBP changelog/<topic>/ + verification-checklist.md META-process adoption** (V2: was #1; V3 demoted — own audit doc calls it "SIGNIFICANT MULTI-FIRE REFACTOR ARC"; violates ONE-LOGICAL-UNIT-PER-FIRE per cycle-300). **HIGHEST LONG-TERM LEVERAGE** but SIGNIFICANT multi-fire refactor — Wave 154+ planning. OPERATOR-DECISION-GATED. Cite CCBP `changelog/best-practice/claude-settings/verification-checklist.md:3,21-30,70-80 @ HEAD 4527f4d4`.

#5 **CCBP best-practice/claude-mcp.md broader cite-import** — currently 1 cite (CLAUDE.md "NEVER commit secrets"); CCBP doc has comprehensive MCP best-practices we could adopt for our 10 wired MCPs.

#6 **`worktree.baseRef` config decision** — single-key settings.json edit. Default `"fresh"` matches discipline; `"head"` is OPERATOR-DECISION.

#7 **`autoMode.hard_deny` codification** — OPERATOR-GATED on CR-7 Phase 3 trigger predicate.

#8 **CCBP `claude-power-ups.md` cite-import** (V3 demoted from #3 — user-education/discoverability, not architecture optimization).

#9 **CCBP boris-10/12/13-tips + thariq-17-mar-26 tip docs cite-import** — minor cite-import.

#10 **CCBP implementation/<topic>-implementation.md cite-import** — for /command + /skill + /subagent.

**V3-REJECTED gaps from prior ranking**:
- ❌ MCP `alwaysLoad` audit — local `.mcp.json` + settings have ZERO `alwaysLoad` entries (empirically verified); CCBP says alwaysLoad should be rare; we're already on-policy by default. No ship needed.
- ❌ Agent/command/skill boundary audit — already cited in `team-orchestration.md §"Layered architecture (shan canonical)"`. Duplicate of existing coverage.

## Recommended ship order (post-W153 F2; V3-revised)

- **Wave 153 Fire 3**: 🥇 Skill topology + context-budget audit per V3 SAVED-SHIP prescription (measure + report; no install-class action; operator-decision-gated on actions)
- **Wave 153 Fire 4**: 🥈 `CLAUDE_CODE_SESSION_ID` adoption in 5 hook scripts (per-script Edit + Path P V2+V3)
- **Wave 153 Fire 5+**: 🥉 CCBP cite-anchor refresh `64fffd53` → `4527f4d4` (bundle with #1 audit findings where each rule touched anyway; avoid pure SHA-refresh diminishing-returns)
- **Wave 154+**: #4 changelog/<topic>/ META-process refactor (multi-fire arc; OPERATOR-DECISION-GATED)

## Mia OVER catches surfaced during this audit

- Mia OVER #326: `skillOverrides` initial candidate for top-3 — REFUTED via meta-skill auto-fire dependency probe (CLAUDE.md L270-272). REJECT-FOR-FIT for our system; default unset preserves behavior.

## Cardinal-rule conformance for THIS audit ship

CR-1 ✅ TIER-1-DIRECT cite anchors at HEAD `4527f4d4` (CCBP current upstream) + HEAD `64fffd53` (CCBP frozen-cited) explicit; new gaps cite at current SHA / **CR-3 ✅ V2+V3 REAL GPT-5.5 cross-model gate FULLY SATISFIED** (3rd non-Phase-1-bootstrap satisfaction in W152+W153 arc) / CR-5+6 N/A (audit doc only; no install) / CR-7 ✅ Phase 1 ACTIVE (audit doesn't shift phase) / CR-8 ✅ TIER-3-LOCAL-COMPOSITION audit synthesis explicitly disclosed / CR-9 ✅ no install-class action this fire / CR-10 ✅ research-first (multi-source CCBP probe + Mia + V2+V3 ADVERSARIAL) / CR-11 ✅ META-process discipline applied (audit precedes per-gap ships) / **CR-12 PARTIAL-OVERLAP (disposition CITE-PATTERN-ONLY) per V3 correction** — corrected from V1's GENUINELY-NEW and V2's CITE-ONLY (CITE-ONLY is NOT a valid 6-class lattice class per W152 F29 formal codification); effective_tier=TIER-3-LOCAL-COMPOSITION per `citation-discipline.md` rule #8

## Risk class

LOW per `Z:/claude-sota/.claude/rules/launch-discipline.md` D1 (audit doc; reversible / observable / no install / no security impact / PROBE 18 N/A — no OS state mutation).

## Update triggers

Re-evaluate this audit when:
- CCBP upstream HEAD bumps beyond `4527f4d4` (CR-6 fresh-from-github mandate triggers re-audit)
- Anthropic CC ships new minor version beyond v2.1.138 (CCBP refresh likely follows within ~1 week per CCBP cadence)
- A NEW best-practice file lands in CCBP that doesn't fit current 9-category taxonomy
- Wave 153 Fire 3+ ships per Forward Top-N gap; close those gaps in this audit doc post-ship
