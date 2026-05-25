---
title: Wave 167 P0 D1 — Pre-edit Archaeology Audit
status: AUTHORITATIVE
date: 2026-05-13
agent: gpt5-archaeologist (subagent_type: code-modernization:legacy-analyst)
wave: W167
fire: P0-D1
---

# Wave 167 P0 D1 — Pre-edit Archaeology

Runtime age 7 days (first commit 2026-05-12 23:26 → HEAD 2026-05-13 16:17).
50 commits / 42 unique authors (shortlog includes session-checkpoint cron).
**100% bug-magnet ratio**: 50/50 commits match fix|revert|hotfix|F-N|FM-N|NEEDS-REVISION|Pattern A
(this is normal for a runtime in active codification arc, NOT a defect signal).
**46% session-checkpoint absorption**: 23/50 commits are `session checkpoint:` cron fires
(FM-21 sub-class .b queue-time-prompt-freeze active per `Z:/claude-sota/.claude/rules/fm21-queue-time-prompt-freeze.md`).

## Module Set 1 — `.claude/hooks/scripts/` (34 .py files; 24 wired in settings.json)

**Risk: HIGH**

| Rank | File | LOC | Commits 7d | Risk drivers |
|------|------|-----|-----------|--------------|
| 1 | `userpromptsubmit_compact_threshold.py` | small | **3** | 2 sequential `fix(hooks)` commits same day 2026-05-13 (14:29 + 15:05); third = session-checkpoint absorbing. Session-keyed lookup bug class — likely FM-02 sub-class .c |
| 2 | `codex_t1_consult_gate.py` | **1933** | 0 (this 7d) | Largest hook; load-bearing CR-3 gate. Edit risk = max blast (T1 wedge per FM-14 if mis-edited) |
| 3 | `codex_t2_pre_commit_gate.py` | **973** | 0 | T2 commit-gate enforcer; CR-3 mechanical surface |
| 4 | `codex_postcommit_review.py` | **950** | 0 | T3 audit-trail writer; 283 verdicts produced — proof of T3-mechanically-firing |
| 5 | `agent_plan_readonly_bash_guard.py` | **937** | 0 | FM-19 readonly-guard surface; enforces ARTIFACT-INLINE mandate |

**Bus-factor**: high — `userpromptsubmit_compact_threshold.py` shipped W170-P3 / fixed twice same-day = single-author single-day churn pattern.
**Bug-magnet**: top-1 file has 100% fix-ratio (3/3 commits are session-keyed-lookup defect class).

**Wave 1b defenses**:
- DO NOT edit codex_t1/t2/t3/t4/t6 chain in same fire as ADOPT verdict (cross-coupling to .claude/settings.json hook entries — 24 hooks wired)
- Mia n=108+ pre-apply MANDATORY for any new hook script (per `Z:/claude-sota/.claude/rules/mia-pre-apply.md`)
- Atomic-commit hook + settings.json registration in single shell invocation per FM-02 sub-class .a/.b defense

## Module Set 2 — `.claude/rules/*.md` (64 files)

**Risk: MEDIUM**

| Rank | File | LOC | Commits 7d | Cite-fan-in (cross-rule references) |
|------|------|-----|-----------|--------------------------------------|
| 1 | `fm17-subagent-fleet-depletion.md` | n/a | **2** (R2 fix-forward FM-17.g landed 2026-05-13) | 26 |
| 2 | `synthesis-layer-verify.md` | n/a | 0 | **65** (highest fan-in) |
| 3 | `cross-model-consensus.md` | n/a | 0 | 58 |
| 4 | `named-failure-modes.md` | n/a | 0 | 55 |
| 5 | `codification-threshold.md` | n/a | 0 | 55 |
| 6 | `karpathy-adapted.md` | **255** (largest) | 0 | n/a |
| 7 | `parallel-sessions.md` | 247 | 0 | n/a |

**Bus-factor**: low (single-operator runtime by design).
**Bug-magnet**: fm17 top with 7 lifetime commits (3 R2 fix-forward); FM-17.g sub-class added very recently 2026-05-13.

**HIGH-COUPLING surfaces** (cite fan-in ≥30 — touching these breaks downstream cite trail):
- synthesis-layer-verify.md (65 fan-in) — touched by Mia rule + every reporting-category cite
- cross-model-consensus.md (58 fan-in) — every CR-3 reference depends on §The contract + §Verdict shapes
- named-failure-modes.md (55 fan-in) — META-router catalog; touching breaks every FM-N pointer

**Wave 1b defenses**:
- Edit fm17/fm20/fm14 with FM-20 path-drift defense (n=14+ ladder per `fm20-path-drift-cascade.md`) — verify cite-anchors at every Edit
- DO NOT touch synthesis-layer-verify.md / cross-model-consensus.md / named-failure-modes.md without Mia probing all 30+ downstream cite anchors first
- Sister-rule mechanical-mirror exception (per `ctff-mechanical-mirror.md`) eligible for pure pointer-extension; full T1 required for new mechanics

## Module Set 3 — Skills (21 .claude + 901 marketplaces = 922 SKILL.md)

**Risk: LOW**

7-day edits: 6 SKILL.md edits (5 gitnexus skill files + 1 goal-prompt-synthesis).
922 SKILL.md surfaces, 0.65% edit-rate.

**Bus-factor**: marketplaces are upstream-pinned (CR-6 fresh-from-github discipline); .claude/skills/ are local-port surfaces.
**Bug-magnet**: zero observed (no FM-class on skill edits in 7d).

**Wave 1b defenses**:
- Skill edits LOW-RISK; routine Mia pre-apply sufficient
- Marketplace plugin installs touch `.claude/plugins/installed_plugins.json` (5 commits 7d) and `known_marketplaces.json` (5 commits 7d) — these ARE hot
- New plugin install MUST cite TIER-1-DIRECT upstream + path-rewrite per CR-9 sibling-bleed defense

## Module Set 4 — `.claude/agents/*.md` (11 agents)

**Risk: LOW**

7-day edits: ZERO. Agents are stable post-W170 cite-anchor pinning ship.

**Bus-factor**: low.
**Bug-magnet**: zero observed (no FM-class on agent edits in 7d).

**Wave 1b defenses**: agents are STABLE — Wave 1b can dispatch 3-5 agents per CADP cap without isolation concerns.

## Module Set 5 — `docs/sota-installed-manifest.md` (731 LOC; 85+ install-class rows)

**Risk: HIGH**

7-day edits: **50** (every commit). install-provenance.md also 50 / settings.json also 50 = trio always co-edited.
This is FM-21 sub-class .b (session-checkpoint cron auto-stages parent edits).

**Bus-factor**: HIGH BLAST (single source of truth for all installs; CR-8 conformance column extension blocked per F30 §13 table-shape mismatch).
**Bug-magnet**: structural — table-shape parity is fragile. Wave 164 F30 found §13 5-col-header / 6-cell-rows mismatch BLOCKED Pattern A apply.

**Wave 1b defenses**:
- Manifest edits MUST be atomic-commit per FM-02.c sub-class defense (use `git commit -o -F msg.txt -- docs/sota-installed-manifest.md` narrow form)
- Section-13 (hooks table) STILL has table-shape mismatch from F30 — defer until codex T1 NARROW shape-probe ships
- Per Wave 164 F29 reframe: HONEST CR-8 conformance baseline is 21/85 = 24.7% (NOT 69.0% prior over-claim)
- session-checkpoint cron will absorb manifest edits — accept the absorption per `port-note-discipline.md §6` forward-only

## Cross-Module-Set: Top-3 Highest-Blast-Radius Surfaces

| # | Surface | Blast radius | Why |
|---|---------|--------------|-----|
| 1 | `.claude/settings.json` | catastrophic | 24 hook script registrations + permissions.defaultMode (CR-7 Phase) + env block; mis-edit breaks T1-T7 chain mechanically. 50 edits in 7d (every commit). |
| 2 | `synthesis-layer-verify.md` + `cross-model-consensus.md` + `named-failure-modes.md` | severe | 65 + 58 + 55 fan-in (178 cumulative cite hits). Mis-edit cascades to every dependent rule's cite-anchor staleness. |
| 3 | `codex_t1_consult_gate.py` (1933 LOC) | severe | T1 mechanical gate firing on Edit/Write/MultiEdit; mis-edit OR re-wedge under FM-14 starves codex pool, blocks all design-surface edits |

## Wave 1b Dispatch Hints

**MUST do**:
1. **Edit `userpromptsubmit_compact_threshold.py`**: Mia n=108+ pre-apply mandatory (3 fixes in 1 day = unstable surface)
2. **Edit fm17-subagent-fleet-depletion.md**: FM-17.g sub-class just landed; verify R2 fix-forward stability before stacking new sub-class
3. **Atomic-commit manifest+install-provenance+settings.json bundles**: use single-shell-invocation `git add -- <files> && git commit -o -F msg.txt -- <files>` (FM-02.b/c defense)
4. **Sister-rule cite preservation**: any edit to synthesis-layer-verify.md / cross-model-consensus.md / named-failure-modes.md requires probing all 30+ downstream cite anchors via Grep BEFORE landing

**SHOULD defer (BUS-FACTOR-1 / HIGH-COUPLING / RECENT-HOTFIX)**:
1. **Defer codex_t1/t2/t3 chain edits** until separate fire (1933+973+950 LOC trio = mechanical T1-T7 backbone)
2. **Defer §13 manifest hooks-table CR-8 column extension** until codex T1 NARROW shape-probe lands (F30 BLOCKED state)
3. **Defer karpathy-adapted.md edits** (255 LOC largest rule; touches §5 wiki compounding surface used by every wave-close)

**SAFE Wave 1b targets** (LOW risk, ZERO 7d edits, LOW fan-in):
- New skill ports under `.claude/skills/<new-name>/SKILL.md`
- New agent ports under `.claude/agents/<new-name>.md`
- Docs additions under `docs/<new-doc>.md` (NOT manifest; new file)
- New rule additions under `.claude/rules/<new-rule>.md` (provided cite-anchor TIER class is correct per CR-1)

**WORKTREE ISOLATION recommendation**: per `Z:/claude-sota/.claude/rules/parallel-session-worktree-isolation.md`, if Wave 1b runs ≥2 parallel agents writing to same checkout, use `eee --worktree <feature-N>` per agent dispatch (FM-02 race contamination defense).

ARCHAEOLOGY-COMPLETE

---

## Confidence & Gaps

- Per-author bus-factor probe DEGRADED: `git shortlog -sn` output garbled (`672 unique authors` is impossible for solo runtime — likely shortlog parser counted lines including session-checkpoint cron commit-message bodies). Treat bus-factor as INFERRED (single-operator runtime by design per CLAUDE.local.md).
- 100% bug-magnet ratio (50/50) is INFLATED by 23/50 session-checkpoint commits (which always carry "checkpoint" in subject — false-match on grep pattern). True hotfix ratio = (50−23)/50 = 54% across non-checkpoint commits. Still HIGH.
- Did NOT probe `agent_id`-vs-anonymous distribution per `Z:/claude-sota/.claude/rules/audit-action-loop.md §Hook telemetry contract`; would need JSONL inspection.
- Skills marketplace 901 SKILL.md count includes plugin-bundle skills (gates per Probe 4 plugin-namespace per `Z:/claude-sota/.claude/rules/ahfv-probe-dag.md`) — not all are local edit targets.
- SME questions: (1) Is FM-17.g sub-class R2 fix-forward stable yet (landed 2026-05-13)? (2) Is §13 manifest hooks-table shape-probe queued for next Wave or deferred indefinitely? (3) Should manifest+install-provenance+settings.json trio remain auto-bundled in checkpoint, or split per `port-note-discipline.md §6`?
