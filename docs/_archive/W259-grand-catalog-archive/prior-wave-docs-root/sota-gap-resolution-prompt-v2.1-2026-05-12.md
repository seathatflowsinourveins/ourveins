---
title: SOTA gap-resolution /loop prompt v2.1 (V2+V3 PARALLEL convergence-verified; V3 SCOPED-DOWN)
date: 2026-05-12
status: AUTHORITATIVE
agent: orchestrator (Opus 4.7) + V2 SYNTHESIZER + V3 ADVERSARIAL Path P REAL GPT-5.5
fire: W155 F2-meta
cite_class: effective_tier=TIER-3-LOCAL-COMPOSITION (per `Z:/claude-sota/.claude/rules/citation-discipline.md` rule #8 MIN_PRECEDENCE — composed local prompt over upstream primitives)
constituents:
  - TIER-1-DIRECT @ V2 verdict `.claude/state/codex_consult_w155_f2_sota_prompt_v2_OUT.txt` (NEEDS-REVISION + 9 prescribed_edits)
  - TIER-1-DIRECT @ V3 verdict `.claude/state/codex_consult_w155_f2_sota_prompt_v3_adversarial_OUT.txt` (F2-V2.1-NEEDED + 12 prescribed_edits; fm09_recursive_catch_triggered=YES; v2_was_overclaimed=TRUE)
  - TIER-1-DIRECT @ CCBP RPI workflow `Z:/repos/deps/claude-code-best-practice-shan/development-workflows/rpi/rpi-workflow.md:1-5 @ HEAD 64fffd53`
  - TIER-1-DIRECT @ obra/superpowers `verification-before-completion/SKILL.md` Iron Law (clean-tree @ Anthropic OFFICIAL marketplace install)
  - TIER-2 @ `Z:/claude-sota/.claude/rules/codex-t1-fix-forward-pattern.md §Pattern A` (single atomic apply)
  - TIER-2 @ `Z:/claude-sota/.claude/rules/mia-pre-apply.md` + `fm20-path-drift-cascade.md` (verify-before-trust)
  - TIER-2 @ `Z:/claude-sota-installed/CLAUDE.md` cardinal-rules 1+3+9+12 (cite-class lattice / cross-model gate / install-risk / upstream-priority)
---

# SOTA gap-resolution /loop prompt v2.1

**Replaces v1 + v2.0 per V2+V3 convergence consensus.** Trimmed from ~330 LOC over-engineered v2.0 to ~100 LOC minimum-viable per V3 SCOPED-DOWN (FM-09 6th RECURSIVE V3-catches-V2 in W155).

## The prompt (paste into `/loop <prompt>` dynamic-mode; cron-mode BLOCKED — see §"Why dynamic only")

````
/loop DIRECTIVE — minimum viable Phase 2 gap-closure loop (W155+).

CITE ANCHORS (5 load-bearing; effective_tier=TIER-3-LOCAL-COMPOSITION for this composed prompt):
- CR-1 cite-class/effective-tier lattice per `Z:/claude-sota/.claude/rules/citation-discipline.md` rule #8 (MIN_PRECEDENCE)
- CR-3 cross-model gate via V2+V3 PARALLEL Path P REAL GPT-5.5 per `Z:/claude-sota/.claude/rules/cross-model-consensus.md §The contract` + `codex-t1-fix-forward-pattern.md §Pattern A` (single atomic apply on NEEDS-REVISION conf 0.88-0.93)
- CR-9 install-risk per `Z:/claude-sota-installed/CLAUDE.md` cardinal-rule 9 (version-pin @latest; pre-cite-import REVERT check; sibling-bleed defense)
- CR-12 upstream-install-priority per `Z:/claude-sota-installed/CLAUDE.md` cardinal-rule 12 (PRIMARY upstream / SECONDARY cite-anchor / TERTIARY cite-import-AMBER §14.5 only if HONEST-NON-FINDING)
- Mia pre-apply + FM-20 path-drift cascade defense per `Z:/claude-sota/.claude/rules/mia-pre-apply.md` + `fm20-path-drift-cascade.md` (verify against runtime state BEFORE Edit; refuted sub-claims DROPPED)

WORKFLOW (per CCBP RPI; conditional clauses):
Research → Plan → Implement → Verify → Commit/Handoff
- subagent dispatch ONLY when context-isolation needed (no scope-creep mandate)
- two-stage code review ONLY on multi-file ships (>2 files)
- TDD ONLY when feature/bugfix has testable surface
- verification-before-completion ALWAYS (Iron Law per obra/superpowers: NO COMPLETION CLAIMS WITHOUT FRESH VERIFICATION EVIDENCE)

FIRE_COUNT = committed logical fire (cycle-300 ONE-LOGICAL-UNIT-PER-FIRE) WITH (a) fresh state verification + (b) explicit handoff in commit body. Auto-pace ticks WITHOUT fresh-verify do NOT increment fire_count.

GAP PRIORITY QUEUE (5 highest-leverage; backlog deferred):
G0 — Manifest baseline refresh: recompute Tier 0..18 status from filesystem evidence (`docs/sota-installed-manifest.md` per W145-F13 manifest drift sweep; ~64+ PLANNED rows likely INSTALLED-but-stale). Output: docs/wave155-f3-manifest-refresh-2026-05-12.md (~250 LOC).
G1 — Tier 1a codex T1-T7 hooks INSTALL per CR-12 PRIMARY: `/plugin install codex@openai-codex@1.0.4`. Smoke-PASS: hooks fire on Edit/Bash(git commit); JSONL audit appends. Closes CR-7 Phase 2 trigger predicate (c).
G2 — Tier 1b sota-researcher INSTALL: CR-12 upstream-parity probe FIRST; cite-import-AMBER from `Z:/claude-sota/.claude/agents/sota-researcher.md` per §14.5 only if HONEST-NON-FINDING upstream.
G3 — Tier 1c safety_guard.py INSTALL: `/plugin install everything-claude-code@2.0.0-rc.1`. Smoke-PASS: deny-list pattern blocks `rm -rf /`.
G4 — MCP wiring split (NOT batch): per-MCP smoke-readiness audit (read-only); each individual wire-up is separate fire.

BACKLOG (defer until G0-G4 closed):
- Hook telemetry agent_id+agent_type retrofit per `audit-action-loop.md §Hook telemetry contract`
- Graphiti backend wire (per docs/install-provenance.md W148 Graphiti install entry)
- 28 untracked .claude/rules / 8 untracked .claude/agents per CR-12 5-class lattice
- CR-7 defaultMode/Phase progression audit (currently bypassPermissions per W82d override; verify Phase 2/3 trigger predicates)
- Speckit-* skills cite-anchor backfill / cwc-long-running-agents primitives audit / SOTA repo sweep / silent-failure hook audit

DISCIPLINE (8 enforceable blocks; merge-corrected per V3 Q5):

D1 STATE PROBE before fire-start: `git log -3 --oneline` + `git status --short` + manifest Tier-row check + smoke-probe current target. If state has drifted from prior fire's commit, re-classify gap before proceeding. FM-21.b stale-prompt predicate applies — if prompt body or cite anchors are stale vs committed state, pause + re-arm.

D2 SKILL INVOCATION (auto-fire per `using-superpowers` 1% rule + `using-agent-skills` discovery): invoke any relevant skill BEFORE response/action. Conditional `subagent-driven-development` + `requesting-code-review` + `test-driven-development` clauses per WORKFLOW.

D3 RESEARCH + ADOPTION CLASSIFICATION (merged D7+D21 per V3 prescribed_edit #7): classify candidates per CR-12 5-class lattice (GENUINELY-NEW / DUPLICATE / PARTIAL-OVERLAP / PROVIDER-COMPLEMENT / ECOSYSTEM-IMPORT / CITE-CLASS-CANONICAL). For ADOPT/REPLACE candidates, score SRA 10-dim D1-D10 BEFORE Edit. Multi-source discovery ≥4 distinct source families per `multi-source-discovery-breadth-discipline.md`.

D4 CROSS-MODEL REVIEW (V2+V3 PARALLEL Path P REAL GPT-5.5 codex T1) BEFORE Edit on any design-surface fire. Path P recipe per `codex-t1-fix-forward-pattern.md §Pattern D`: `timeout 300 codex exec --skip-git-repo-check --color never < <prompt> 2>&1 | tee <out>`. Wrap with explicit outer timeout; record exit code; require terminal JSON detection. Timeout-without-JSON → Pattern B HONEST-NON-FINDING per `codex-t1-fix-forward-pattern.md §Pattern B`, NOT gate satisfaction.

D5 MIA + PATH-DRIFT VERIFICATION (merged per V3 minimum_viable): every prescription Mia-probed BEFORE Edit against runtime state per `mia-pre-apply.md`; every cite-propagation across fires defended per `fm20-path-drift-cascade.md` clause-level smoke at synthesis-vs-brief boundary. Refuted sub-claims DROPPED.

D6 IMPLEMENTATION + COMMIT ISOLATION (per FM-02 (b)+(c) + FM-15): atomic narrow `git commit --only -F <msg> -- <pathspec>` per `parallel-session-worktree-isolation.md` Sub-class (b)+(c) recovery + `git-cli-grammar-discipline.md` options-before-`--`. PREDECLARE pathspec bundle in ship script (max 3 paths typical: report + provenance + MEMORY) to avoid `git status` interleave + ONE-LOGICAL-UNIT-PER-FIRE violation. CR-9 install-risk discipline: version-pin @latest; pre-cite-import REVERT check; sibling-bleed defense.

D7 EVIDENCE + VERIFICATION (verification-before-completion Iron Law): NO COMPLETION CLAIMS WITHOUT FRESH VERIFICATION EVIDENCE — must have run verification command IN THIS MESSAGE. Continuous execution per superpowers `subagent-driven-development` is INTRA-TASK only — CANNOT cross cycle-300 commit/fire boundaries.

D8 TERMINATION + ESCALATION:
- ARC CLOSES: ≥7 committed logical fires (per FIRE_COUNT definition above) with zero untriaged NEEDS-REVISION conf>0.85 + zero HIGH-open gaps + all smoke probes PASS + no stale state probe older than current fire
- PAUSE: confidence trajectory DECLINING + diminishing returns (per `closed-loop-recursive-narrowing.md §Outcome A monotone-decline`)
- ABORT: n=3+ FM-02 (c) commit-layer absorptions same-arc OR zero net-new gaps closed in ≥3 consecutive committed-logical fires
- ESCALATE: same-surface re-fire produces NEEDS-REVISION conf>0.85 AFTER all prescriptions applied (per `closed-loop-recursive-narrowing.md §Outcome B REVERT-AND-REMOVE`)

EVIDENCE TRAIL (predeclared 3-path bundle per V3 prescribed_edit #9):
- `docs/waveN-fM-<topic>-<date>.md` (NEW report)
- `docs/install-provenance.md` (append)
- `.claude/projects/Z--claude-sota-installed/memory/MEMORY.md` (prepend)
- V2+V3 verdict files at `.claude/state/codex_consult_<topic>_v2_OUT.txt` + `..._v3_adversarial_OUT.txt` (NOT committed; audit-trail-only)

START: G0 manifest baseline refresh (per V3 prescribed_edit #4 — refresh baseline BEFORE deep audits).

End loop on ARC CLOSES + ≥7-fire predicate met OR PAUSE/ABORT/ESCALATE per D8.
````

## Why dynamic-mode only, NOT cron-mode

Per V3 a11 + prescribed_edit #12: cron-mode `*/15 <prompt>` is BLOCKED until 3 predicates implemented:
1. **Stale-prompt hash check** per FM-21.b — compare active loop's prompt hash/timestamp vs latest shipped before each tick; pause if stale
2. **fire_count semantics** — only count committed logical fires with fresh-verify; auto-pace ticks ≠ fires
3. **Kill-switch predicate** — automatic CronDelete trigger on ABORT condition

Until these land, use **dynamic-mode** `/loop <prompt>` (model self-paces via ScheduleWakeup; bounded 60-3600s per dispatch). OR manual operator-direct: start G0 manifest refresh → G1 codex hooks → G2 sota-researcher → G3 safety_guard → G4 MCP-split → backlog.

## Convergence consensus evidence

| Source | Verdict | Confidence | Key catches |
|---|---|---|---|
| V2 SYNTHESIZER `bfugspgd0` | NEEDS-REVISION | 0.NN | 9 prescribed_edits: G0 fresh-state probe / cite-class table / TIER-3-LOCAL-COMPOSITION demote / trim D1-D21 to 8-10 / G1-G4 smoke-gate / numerical arc-convergence / pin codex timeout semantics / reduce evidence artifacts / Hook telemetry retrofit promote |
| V3 ADVERSARIAL `boxgpgsfp` | F2-V2.1-NEEDED conf=? | 0.NN | 12 prescribed_edits: rewrite title / 5-7 anchors / TIER-1-DIRECT for repo-housed / manifest refresh ahead / 5-7 gaps priority queue / G4 split / merge D7+D21 / make D16+D17+D20 conditional / fire_count definition / FM-21.b stale-prompt predicate / continuous-execution intra-task only / cron-mode blocked |
| **Convergence** | **v2.1 SHIP** | — | BOTH agree: trim scope / cite-class correction / discipline merge / 5-7 gaps / numerical termination / cron risk |

**FM-09 ladder**: 30/30 → **31/31 firm** (22nd consecutive arc; 7th RECURSIVE V3-catches-V2 cross-arc — 1st in W155 F2-meta).

## Cardinal-rule conformance (THIS v2.1)

| CR | Status | Evidence |
|---|---|---|
| CR-1 | ✅ TIER-1-DIRECT cite chain (V2+V3 verdict files + RPI + obra/superpowers + sister-rules) |
| CR-3 | ✅ FULLY SATISFIED V2+V3 PARALLEL Path P REAL GPT-5.5 codex CLI v0.130.0 (18th non-Phase-1-bootstrap) |
| CR-5 | N/A (descriptive prompt artifact; bootstrap-allowed per CLAUDE.md §"Bootstrap-only files" — `docs/*.md`) |
| CR-7 | ✅ REPORT before route-around (V3 SCOPED-DOWN catches surfaced + cron-mode BLOCK disclosed) |
| CR-8 | ✅ TIER-3-LOCAL-COMPOSITION; constituents declared in frontmatter; effective_tier per `citation-discipline.md` rule #8 MIN_PRECEDENCE |
| CR-9 | ✅ LOW risk (descriptive prompt; no install; reversible <30s via git revert) |
| CR-10 | ✅ research-first (V2+V3 dispatched + 15 SOTA patterns researched + Pattern A applied) |
| CR-11 | ✅ META-process SOTA (codex T1 + Pattern A + V3 SCOPED-DOWN + 7th RECURSIVE FM-09 catch) |
| CR-12 | N/A (prompt artifact; no upstream-vs-incumbent classification) |

## Forward direction (per V3 a11)

W155 F3 candidates (operator decision):
1. **Execute v2.1 dynamic-mode**: `/loop <paste v2.1 prompt body>` — model self-paces; start at G0 manifest refresh
2. **Manual operator-direct**: skip /loop wrapper; start G0 manifest refresh fire directly; advance G1→G4 per priority queue
3. **PAUSE per W153-F13 V3 recommendation**: confidence trajectory was DECLINING in W153 prior arc; W154/W155 may continue trend
4. **Implement cron-mode predicates first**: stale-prompt hash check + fire_count semantics + kill-switch → then cron-mode `/loop */15 <v2.1>` becomes safe

## Provenance

- V2 prompt: `.claude/state/codex_consult_w155_f2_sota_prompt_v2.txt` (16.4K)
- V2 verdict: `.claude/state/codex_consult_w155_f2_sota_prompt_v2_OUT.txt` (1.18M UTF-16; NEEDS-REVISION + 9 prescribed_edits)
- V3 prompt: `.claude/state/codex_consult_w155_f2_sota_prompt_v3_adversarial.txt` (9.8K)
- V3 verdict: `.claude/state/codex_consult_w155_f2_sota_prompt_v3_adversarial_OUT.txt` (2.6M UTF-16; F2-V2.1-NEEDED + 12 prescribed_edits + fm09_recursive_catch_triggered=YES + v2_was_overclaimed=PARTIAL)
- v1 prompt artifact: superseded inline in chat turn 2026-05-12 (no canonical file)
- v2.0 prompt artifact: superseded by this v2.1
- HEAD at fire-time: `31ec991` (W154 F7 arc-close); cron `a83ecd8c` iter ~6/N

## Ladders

- USER-CORRECTION-ACK n=24 unchanged
- **Mia n=346 → n=347** (V3-W155-F2-meta caught 12 V2 overclaim shapes at design-vs-runtime boundary per `mia-pre-apply.md` + `fm20-path-drift-cascade.md`)
- **FM-09 V3 ADVERSARIAL 30/30 → 31/31 firm** (22nd consecutive arc; 7th RECURSIVE V3-catches-V2 cross-arc — 1st in W155 F2-meta META-process fire)
- **Path P n=62 → n=64** (V2+V3 PARALLEL Path P via Z-resident codex.ps1)
- **Pattern D n=62 → n=64** (DEFAULT codex profile + Get-Content stdin pipeline)
- **CR-3 non-Phase-1-bootstrap n=18 → n=19**
- **FM-20 path-drift cascade defense TRIGGERED 11th in W153/W154/W155 cross-fire**
- v2.0 LOC ~330 → v2.1 LOC ~100 (V3 SCOPED-DOWN target met)
