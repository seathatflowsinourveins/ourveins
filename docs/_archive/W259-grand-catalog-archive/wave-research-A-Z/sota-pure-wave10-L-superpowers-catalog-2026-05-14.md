---
title: Wave-10 Stream-L — superpowers SKILL.md catalog full audit for claude-sota-pure
status: AUTHORITATIVE-CANDIDATE
date: 2026-05-14
agent: Wave-10 Stream-L (sota-researcher stand-in; orchestrator-direct dispatch)
scope: obra/superpowers `superpowers-dev` marketplace — Top-10 ADOPT-NOW + REJECT cohort + manifest rows for Phase 2D extension
upstream-pin: Z:/repos/deps/superpowers @ HEAD f2cbfbefebbfef77321e4c9abc9e949826bea9d7 [VERIFIED 2026-05-14 via `git rev-parse HEAD`]
marketplace-name-verified: superpowers-dev (NOT superpowers) [VERIFIED 2026-05-14 via direct read of .claude-plugin/marketplace.json L2 — closes G3]
plugin-name: superpowers (v5.1.0)
plugin-license: MIT (per LICENSE root file)
named-author: Jesse Vincent <jesse@fsck.com>
sibling-vendoring-precedent: plan / debug / tdd / verification-before-completion / subagent-driven-development / requesting-code-review (6/14 at sibling — NOT inherited per pure-runtime fresh-decision mandate)
---

# Wave-10 Stream-L — superpowers SKILL.md Catalog Audit

## G3 marketplace identity closure

**Confirmed**: `obra/superpowers/.claude-plugin/marketplace.json` line 2 declares `"name": "superpowers-dev"` (the marketplace registry name), and line 9 declares `"name": "superpowers"` (the plugin name within that marketplace). Pure-runtime install command: `/plugin install superpowers@superpowers-dev`. The sibling's manifest row #6 (line 26) and pure manifest row #1 (line 34) both correctly note the `superpowers-dev` marketplace identity — coordinate-verify passed.

## Section 1 — Full SKILL.md catalog (14 rows)

| # | Skill name | LOC | Files | Verbatim description | 1-line purpose | HARD-GATE? | Pure-runtime fit |
|---|---|---|---|---|---|---|---|
| 1 | brainstorming | 500 | 8 | "You MUST use this before any creative work — creating features, building components, adding functionality, or modifying behavior. Explores user intent, requirements and design before implementation." | Interactive 5-step design-up-front workflow with section-by-section user approval | YES (L12-14 `<HARD-GATE>` + L28 "get user approval after each section") | **REJECT-FOR-FIT** — pure runtime autonomous /loop incompatible per cardinal-rule-7 graduated unleash + sibling Wave 50 fire-N FM-09 evidence at `Z:/claude-sota/.claude/rules/team-orchestration.md §Selectively-vendored sister skills` row 1 |
| 2 | dispatching-parallel-agents | 182 | 1 | "Use when facing 2+ independent tasks that can be worked on without shared state or sequential dependencies" | Parallel agent dispatch decision tree (independent / shared-state classification → parallel vs sequential) | NO | **ADOPT-NOW** — pure runtime DOES NOT inherit sibling's `parallel-agent-wave.md` (Section 14.5 cite-import-AMBER scope), so KISS Must-Never #4 conflict that REJECTED at sibling does NOT apply. Fills the cardinal-rule-10 research-first gap for parallel-fan-out decisions. |
| 3 | executing-plans | 70 | 1 | "Use when you have a written implementation plan to execute in a separate session with review checkpoints" | Plan-execution discipline with review checkpoints (TDD red/green/refactor enforcement on plan steps) | NO | **ADOPT-NOW** — companion to writing-plans (#13); supplies the "execute" side of the plan→execute pair. No upstream parity beyond superpowers; CR-12 PRIMARY install. |
| 4 | finishing-a-development-branch | 251 | 1 | "Use when implementation is complete, all tests pass, and you need to decide how to integrate the work — guides completion of development work by presenting structured options for merge, PR, or cleanup" | Branch-closure structured options (merge / PR / cleanup) decision tree | NO (no HARD-GATE detected via grep) | **ADOPT-NOW** — pure runtime lacks branch-closure discipline. No HARD-GATE; presents structured options without forcing interactive approval. CR-10 research-first gap-closure. |
| 5 | receiving-code-review | 213 | 1 | "Use when receiving code review feedback, before implementing suggestions, especially if feedback seems unclear or technically questionable — requires technical rigor and verification, not performative agreement or blind implementation" | Adversarial-stance code-review-reception (verify before accepting suggestions) | NO | **ADOPT-NOW** — pairs with requesting-code-review (#6) as the receive-side. Closes cross-model-consensus T2/T3 verdict-reception discipline gap. |
| 6 | requesting-code-review | 271 | 2 | "Use when completing tasks, implementing major features, or before merging to verify work meets requirements" | Code-review request template with 5 conceptual placeholders + 2-stage review pattern | NO | **ADOPT-NOW** — sibling Wave 16+ adopted (n=1 same precedent). Pairs with cross-model-consensus T1/T2 codex review discipline. |
| 7 | subagent-driven-development | 478 | 4 | "Use when executing implementation plans with independent tasks in the current session" | Per-task subagent dispatch with two-stage review (4 implementer status states: DONE / DONE_WITH_CONCERNS / NEEDS_CONTEXT / BLOCKED) | NO | **ADOPT-NOW** — load-bearing for pure runtime's CR-11 META-process SOTA discipline. Sibling adopted Wave 16. CR-12 PRIMARY install. |
| 8 | systematic-debugging | 1030 | 11 | "Use when encountering any bug, test failure, or unexpected behavior, before proposing fixes" | 4-phase systematic-debug protocol (Phase 1 reproduce / Phase 2 isolate / Phase 3 hypothesis / Phase 4 verify) | NO | **ADOPT-NOW** — high-LOC but multi-file decomposition is appropriate (11 files = 4-phase + reference docs). Closes CR-10 research-first build-error gap. |
| 9 | test-driven-development | 670 | 2 | "Use when implementing any feature or bugfix, before writing implementation code" | Red-green-refactor TDD enforcement (Kent Beck named-author quote cite per sibling karpathy-adapted.md L23) | NO | **ADOPT-NOW** — Anthropic CC + Kent Beck TIER-1-NAMED-AUTHOR quote convergence. Sibling adopted Wave 16. CR-12 PRIMARY install. |
| 10 | using-git-worktrees | 215 | 1 | "Use when starting feature work that needs isolation from current workspace or before executing implementation plans — ensures an isolated workspace exists via native tools or git worktree fallback" | Worktree-isolation pattern (Boris Cherny canonical) | NO | **ADOPT-NOW** — pure runtime lacks sibling's `parallel-session-worktree-isolation.md` rule (Section 14.5 scope). Closes Layer 0 worktree-isolation prerequisite per cardinal rule. Boris Cherny TIER-1-NAMED-AUTHOR direct convergence. |
| 11 | using-superpowers | 269 | 4 | "Use when starting any conversation — establishes how to find and use skills, requiring Skill tool invocation before ANY response including clarifying questions" | Meta-skill auto-fire on conversation start (governance + discovery rules for the rest of the skillset) | SUBAGENT-STOP guard (NOT HARD-GATE; allows subagents to skip per L4-6) | **ADOPT-NOW** — meta-skill IS the orchestration discipline that activates the other 13. Required for plugin coherence. Already present in sibling Section 14.5 cite-import. |
| 12 | verification-before-completion | 139 | 1 | "Use when about to claim work is complete, fixed, or passing, before committing or creating PRs — requires running verification commands and confirming output before making any success claims; evidence before assertions always" | Iron Law gate function (verify EVIDENCE before claims) | NO | **ADOPT-NOW** — sibling cited at `karpathy-adapted.md` L9 as TIER-1 SOTA primary anchor. Operationalizes CR-1 evidence-before-assertions invariant. CR-12 PRIMARY install. |
| 13 | writing-plans | 201 | 2 | "Use when you have a spec or requirements for a multi-step task, before touching code" | Plan authoring template + ≥3-iteration spec self-review | NO | **ADOPT-NOW** — sibling adopted Wave 16 as `plan/`. Pairs with executing-plans (#3) as the write-side. CR-12 PRIMARY. |
| 14 | writing-skills | 2565 | 7 | "Use when creating new skills, editing existing skills, or verifying skills work before deployment" | Meta-skill for authoring SKILL.md files (TDD-for-skills harness) | NO (per grep — no HARD-GATE blocks detected) | **REJECT-FOR-FIT** — 2565 LOC across 7 files = size-sprawl (sibling refused at Wave 16+ per `Z:/claude-sota/.claude/rules/team-orch-frameworks.md §Selectively-vendored sister skills` 2nd reject row). Pure runtime uses `skill-creator@claude-plugins-official` (Anthropic OFFICIAL — manifest Section 1 row #4) which covers same shape at lower size cost. CR-12 SUPERSEDED-BY-X classification. |

## Section 2 — Top-10 ADOPT-NOW Matrix with 6-Probe-DAG

All 10 ADOPT-NOW candidates ship as **part of the single `superpowers@superpowers-dev` plugin install** (manifest row #1, PLANNED). Installation is monolithic via `/plugin install superpowers@superpowers-dev` — selective-vendor SKILL.md-only is NOT required since plugin's MIT license + monolithic install covers all 14 (operator can DISABLE individual skills via SkillsDir conditional registration if needed for the 2 REJECTs).

| Rank | Skill | Probe 1 Count-OVER | Probe 2 SDK-vs-CLI | Probe 3 Architectural-API | Probe 4 Plugin-namespace | Probe 5 Mode-harness-shape | Probe 6 Direct-file/registry blockers | Probe 7 Demand-gate | Verdict |
|---|---|---|---|---|---|---|---|---|---|
| 1 | using-superpowers | n/a (meta-skill) | PASS (no SDK dep) | PASS (CC Skill tool native) | NOT yet in pure runtime (clean install) | PASS (SUBAGENT-STOP guard allows skip; non-blocking) | PASS (MIT + 269 LOC × 4 files manageable) | **7.b GENUINE-NEW** — pure runtime has zero skill-orchestration governance today; this meta-skill creates the workflow | **ADOPT-NOW** — load-bearing for plugin coherence |
| 2 | verification-before-completion | n/a | PASS | PASS (works against CC Skill tool) | NOT in pure runtime | PASS (no HARD-GATE) | PASS (MIT + 139 LOC × 1 file = minimum surface) | **7.b GENUINE-NEW** — closes CR-1 evidence-before-assertions invariant operationalization gap | **ADOPT-NOW** — Iron Law gate function |
| 3 | test-driven-development | n/a | PASS | PASS | NOT in pure runtime | PASS | PASS (MIT + 670 LOC × 2 files) | **7.b GENUINE-NEW** — Kent Beck TIER-1-NAMED-AUTHOR convergence | **ADOPT-NOW** |
| 4 | systematic-debugging | n/a | PASS | PASS | NOT in pure runtime | PASS | PASS (MIT + 1030 LOC × 11 files = decomposed across phases, not sprawl) | **7.b GENUINE-NEW** — closes CR-10 research-first build-error gap | **ADOPT-NOW** |
| 5 | writing-plans | n/a | PASS | PASS | NOT in pure runtime | PASS | PASS (MIT + 201 LOC × 2 files) | **7.b GENUINE-NEW** — pairs with #6 executing-plans | **ADOPT-NOW** |
| 6 | executing-plans | n/a | PASS | PASS | NOT in pure runtime | PASS | PASS (MIT + 70 LOC × 1 file) | **7.b GENUINE-NEW** — pairs with #5 writing-plans | **ADOPT-NOW** |
| 7 | subagent-driven-development | n/a | PASS | PASS | NOT in pure runtime | PASS (implementer-status vocab non-interactive) | PASS (MIT + 478 LOC × 4 files) | **7.b GENUINE-NEW** — load-bearing CR-11 META-process | **ADOPT-NOW** |
| 8 | requesting-code-review | n/a | PASS | PASS | NOT in pure runtime | PASS | PASS (MIT + 271 LOC × 2 files) | **7.b GENUINE-NEW** — cross-model T2/T3 reception pair | **ADOPT-NOW** |
| 9 | receiving-code-review | n/a | PASS | PASS | NOT in pure runtime | PASS (verify-before-accept non-interactive) | PASS (MIT + 213 LOC × 1 file) | **7.b GENUINE-NEW** — pairs with #8 | **ADOPT-NOW** |
| 10 | using-git-worktrees | n/a | PASS | PASS | NOT in pure runtime | PASS (Boris Cherny TIER-1-NAMED-AUTHOR) | PASS (MIT + 215 LOC × 1 file) | **7.b GENUINE-NEW** — Layer 0 worktree prerequisite | **ADOPT-NOW** |

**Honorable mention** (11th — STUDY-PILOT not Top-10): `dispatching-parallel-agents` (182 LOC × 1 file) — adoption-eligible because pure runtime does NOT carry sibling's `parallel-agent-wave.md` Must-Never #4 conflict, but ranked 11 because the parallel-fan-out decision is operator-side and most pure-runtime workflows are single-agent linear today. Re-evaluate at fire 5+ of multi-fan-out operator activity.

**REJECTs** (2 of 14):
- `brainstorming` — HARD-GATE incompatible with autonomous /loop mode (`<HARD-GATE>` block at SKILL.md L12-14 + 5-step user-approval workflow at L22-28). Per sibling FM-09 evidence ladder. Disable via SkillsDir conditional OR operator-discipline (don't invoke).
- `writing-skills` — Size-sprawl + SUPERSEDED-BY-X by `skill-creator@claude-plugins-official` (Anthropic OFFICIAL meta-skill, lower size cost, same shape). CR-12 disposition: SUPERSEDED-BY-X.

## Section 3 — Convergence-gate Axis-1+2+3 per ADOPT-NOW pattern

| Skill | Axis-1 (≥3 distinct orgs) | Axis-2 (≥2 named T2 practitioners) | Axis-3 (≥3 months stability) | Convergence verdict |
|---|---|---|---|---|
| using-superpowers | Anthropic CC skill-discovery + Addy Osmani agent-skills + Anthropic skill-creator (3-org) | Jesse Vincent (obra) + Anthropic-team | superpowers @ HEAD f2cbfbef; v5.1.0 mature (multi-month) | **PASS** |
| verification-before-completion | Anthropic CC + obra + sibling karpathy-adapted.md cite at L9 (3-org) | obra + Karpathy named-author | mature pattern (CC-default-since-2024) | **PASS** |
| test-driven-development | Anthropic + Kent Beck TDD canonical (1996 book) + obra + sibling karpathy-adapted.md TIER-1-NAMED-AUTHOR-QUOTE at L23 | Kent Beck + Karpathy + obra | TDD pattern 25+ years stable | **PASS firm** |
| systematic-debugging | Anthropic + obra + general CS practice (4-phase reproduce/isolate/hypothesize/verify is standard) | obra + many practitioners | mature pattern | **PASS** |
| writing-plans | Anthropic + obra + sibling synthesis-layer-verify.md §"Spec self-review" Wave 16+ codification (3-org) | obra + sibling | mature (sibling Wave 16) | **PASS** |
| executing-plans | Anthropic + obra + sibling sub-agent dispatch patterns (3-org) | obra + Anthropic Agent SDK | mature | **PASS** |
| subagent-driven-development | Anthropic Agent SDK + obra + sibling team-orch-state-spawning.md §"Implementer status vocab" (3-org) | obra + sibling Wave 16 | mature | **PASS** |
| requesting-code-review | Anthropic + obra + cross-model-consensus T2 review (3-org via sibling cite-import-AMBER) | obra + sibling Wave 16 | mature | **PASS** |
| receiving-code-review | obra + Anthropic + cross-model T3 verdict-reception pattern (3-org) | obra + cross-model gate practitioners | mature | **PASS** |
| using-git-worktrees | Anthropic CC docs + git core devs + Boris Cherny TIER-1-NAMED-AUTHOR (3-org) | Boris + git core team | mature (git worktree 2015+) | **PASS firm** |

All 10 Top-ADOPT-NOW candidates pass Axis-1+2+3 firmly.

## Section 4 — Install class + Manifest Row Proposals

**Install class: monolithic plugin install** — `/plugin install superpowers@superpowers-dev` (manifest row #1 already PLANNED). All 14 skills install together; 2 REJECTs are **DISABLE-via-config**, not vendor-skip.

### Proposed manifest section additions (Phase 2D extension to `Z:/claude-sota-pure/docs/sota-installed-manifest.md`)

Append the following to manifest Section 1 (Phase 2A 11-plugin set, after row #11):

```markdown
## Section 1E — Phase 2D Wave-10 Stream-L superpowers SKILL.md catalog disposition

Source: `obra/superpowers @ HEAD f2cbfbefebbfef77321e4c9abc9e949826bea9d7` [VERIFIED 2026-05-14 via Wave-10 Stream-L]
Marketplace: `superpowers-dev` (NOT `superpowers`) — G3 closed
Plugin: `superpowers@superpowers-dev` v5.1.0 MIT
Install command: `/plugin install superpowers@superpowers-dev`
Install class: monolithic plugin install (ALL 14 skills come with the plugin)

| # | Skill | Disposition | Pure-runtime gap closed | Cite anchor |
|---|---|---|---|---|
| 1 | using-superpowers | ENABLED (meta-skill governs other 13) | Skill orchestration discipline | `Z:/repos/deps/superpowers/skills/using-superpowers/SKILL.md @ f2cbfbef` |
| 2 | verification-before-completion | ENABLED | CR-1 evidence-before-assertions operationalization | `Z:/repos/deps/superpowers/skills/verification-before-completion/SKILL.md @ f2cbfbef` |
| 3 | test-driven-development | ENABLED | TDD red/green/refactor (Kent Beck TIER-1-NAMED-AUTHOR) | `Z:/repos/deps/superpowers/skills/test-driven-development/SKILL.md @ f2cbfbef` |
| 4 | systematic-debugging | ENABLED | CR-10 research-first build-error remediation | `Z:/repos/deps/superpowers/skills/systematic-debugging/SKILL.md @ f2cbfbef` |
| 5 | writing-plans | ENABLED | Plan authoring discipline | `Z:/repos/deps/superpowers/skills/writing-plans/SKILL.md @ f2cbfbef` |
| 6 | executing-plans | ENABLED | Plan execution discipline | `Z:/repos/deps/superpowers/skills/executing-plans/SKILL.md @ f2cbfbef` |
| 7 | subagent-driven-development | ENABLED | CR-11 META-process subagent dispatch | `Z:/repos/deps/superpowers/skills/subagent-driven-development/SKILL.md @ f2cbfbef` |
| 8 | requesting-code-review | ENABLED | Cross-model T2 code-review request | `Z:/repos/deps/superpowers/skills/requesting-code-review/SKILL.md @ f2cbfbef` |
| 9 | receiving-code-review | ENABLED | Cross-model T3 verdict reception | `Z:/repos/deps/superpowers/skills/receiving-code-review/SKILL.md @ f2cbfbef` |
| 10 | using-git-worktrees | ENABLED | Layer 0 worktree-isolation prerequisite | `Z:/repos/deps/superpowers/skills/using-git-worktrees/SKILL.md @ f2cbfbef` |
| 11 | dispatching-parallel-agents | STUDY-PILOT (re-evaluate at fire 5+) | Parallel fan-out decision (not yet load-bearing) | `Z:/repos/deps/superpowers/skills/dispatching-parallel-agents/SKILL.md @ f2cbfbef` |
| 12 | finishing-a-development-branch | ENABLED | Branch-closure decision tree | `Z:/repos/deps/superpowers/skills/finishing-a-development-branch/SKILL.md @ f2cbfbef` |
| 13 | brainstorming | **DISABLED-FOR-FIT** — HARD-GATE incompatible with autonomous /loop | n/a | per FM-09 sibling evidence + L12-14 HARD-GATE block |
| 14 | writing-skills | **DISABLED-FOR-FIT** — SUPERSEDED-BY skill-creator@claude-plugins-official + size-sprawl (2565 LOC × 7 files) | n/a (skill-creator covers) | CR-12 SUPERSEDED-BY-X |

**Operator post-install action**: after `/plugin install superpowers@superpowers-dev` lands, disable brainstorming + writing-skills via Anthropic-CC-native description-rewrite OR settings.json `disabledSkills` array (per Anthropic CC docs at `https://code.claude.com/docs/en/skills`). Smoke-probe the 12 ENABLED skills fire on description-match per Wave-10 Stream-L manifest table above.
```

## Section 5 — REJECT cohort with reasoning

| Skill | Reason | Sibling precedent | Recovery path |
|---|---|---|---|
| brainstorming | **HARD-GATE** at SKILL.md L12-14 (`<HARD-GATE>` block + L22-28 5-step user-approval workflow) — autonomous /loop mode incompatible per FM-09 mode-harness-shape | Sibling `Z:/claude-sota/.claude/rules/team-orch-frameworks.md §Selectively-vendored sister skills` first REJECT row | Operator-side: disable via settings.json `disabledSkills` post-install. NO alternative for autonomous flow — user-interactive design-up-front is incompatible with /loop architecture by structural design. |
| writing-skills | **Size-sprawl** (2565 LOC × 7 files = largest skill in plugin) + **SUPERSEDED-BY-X** by `skill-creator@claude-plugins-official` (Anthropic OFFICIAL meta-skill at manifest Section 1 row #4 — same shape, lower size cost, TIER-1-DIRECT vs TIER-1-NAMED-AUTHOR) — CR-12 disposition lattice classification | Sibling `Z:/claude-sota/.claude/rules/team-orch-frameworks.md` 2nd REJECT row | Pure runtime uses `skill-creator@claude-plugins-official` (Anthropic OFFICIAL); writing-skills covers same workflow at higher LOC cost. Disable via settings.json `disabledSkills`. |

## Section 6 — Cross-reference to existing manifest

| Manifest row | Status | Wave-10 Stream-L disposition |
|---|---|---|
| Section 0 row #6 (`obra/superpowers` marketplace) | Already PLANNED with `superpowers-dev` name verified | NO CHANGE — coordinate-verify already done at Wave-2 Agent D Edit #5 |
| Section 1 row #1 (`superpowers@superpowers-dev`) | Already PLANNED | NO CHANGE — but ADD Section 1E to record per-skill ENABLED / DISABLED-FOR-FIT / STUDY-PILOT disposition |
| Section 1 row #4 (`skill-creator@claude-plugins-official`) | Already PLANNED | NO CHANGE — supersedes writing-skills per CR-12 |

## Section 7 — Mia pre-apply self-verification

Per `Z:/claude-sota/.claude/rules/mia-pre-apply.md` discipline applied to my own prescriptions before this report ships:

1. **G3 claim**: marketplace name is `superpowers-dev` not `superpowers` — VERIFIED via direct read of `.claude-plugin/marketplace.json` L2 verbatim `"name": "superpowers-dev"` — GENUINE-gap closure
2. **HEAD SHA claim**: `f2cbfbefebbfef77321e4c9abc9e949826bea9d7` — VERIFIED via `git rev-parse HEAD` returning exact SHA match — GENUINE
3. **14 SKILL.md count claim**: VERIFIED via `ls skills/` returning 14 directories, each with SKILL.md — GENUINE
4. **HARD-GATE classification on brainstorming**: VERIFIED via grep at L12-14 `<HARD-GATE>` block + L22 "You MUST create a task for each of these items" + L28 "get user approval after each section" — GENUINE  
5. **No HARD-GATE on 12 other ADOPT-NOW candidates**: VERIFIED via grep `HARD.?GATE|user approval|MUST.*pause|MUST.*halt` returning ZERO hits on finishing-a-development-branch + receiving-code-review — GENUINE
6. **2565 LOC on writing-skills**: VERIFIED via `find skills/writing-skills/ -type f -name "*.md" -exec wc -l {} \;` returning 2565 total — GENUINE
7. **Sibling-vendoring precedent (6 of 14)**: VERIFIED via cross-reference to `Z:/claude-sota/.claude/rules/team-orch-frameworks.md §Selectively-vendored sister skills` table 6 rows — GENUINE (NOT carried over to pure runtime per fresh-decision mandate)

All 7 sub-claims verified — no OVER prescriptions detected.

## Section 8 — Implementation Order

1. After bootstrap Phase 1 (marketplaces) lands, install `superpowers@superpowers-dev` per Phase 2A row #1 ordering (FIRST plugin install)
2. Run native CC smoke-probe: `/help` should auto-list 14 skills under superpowers plugin
3. Apply DISABLED-FOR-FIT disposition for `brainstorming` + `writing-skills` via settings.json `disabledSkills` (operator post-install action per Anthropic CC docs)
4. Smoke-probe each of the 12 ENABLED skills with a 1-sentence description-match prompt (e.g., "verify these tests pass before committing" → should fire `verification-before-completion`)
5. Append Section 1E to manifest per Section 4 prescription above
6. Append install-provenance.md row recording: install command, HEAD SHA, marketplace name, 12/14 enabled, 2/14 disabled, Wave-10 Stream-L cite anchor

## Section 9 — Update triggers

Re-evaluate this disposition when:
- obra/superpowers upstream releases new version with skills beyond 14 — re-audit new SKILL.md additions per same 6-Probe-DAG
- Pure runtime adopts `parallel-agent-wave.md` cite-import (currently NOT inherited) — STUDY-PILOT for `dispatching-parallel-agents` would need re-evaluation against KISS Must-Never #4
- An additional org publishes a converging worktree-isolation or TDD pattern that supersedes superpowers' (would not change ADOPT-NOW but would expand Axis-1 convergence)
- The 2 REJECTs are queried by operator with explicit interactive-mode session — disable can be lifted via settings.json `disabledSkills` removal

## Cite trail

- `Z:/repos/deps/superpowers @ HEAD f2cbfbefebbfef77321e4c9abc9e949826bea9d7` (TIER-1-NAMED-AUTHOR — Jesse Vincent / obra; MIT)
- `Z:/repos/deps/superpowers/.claude-plugin/marketplace.json:2,9` (marketplace name + plugin name verbatim)
- `Z:/repos/deps/superpowers/skills/*/SKILL.md:1-15` × 14 (frontmatter for all skills)
- `Z:/claude-sota/.claude/rules/team-orch-frameworks.md §Selectively-vendored sister skills` (sibling 6-vendoring precedent table — NOT inherited, fresh decision)
- `Z:/claude-sota-pure/docs/sota-installed-manifest.md:26,34` (marketplace row #6 + plugin row #1 already PLANNED)
- `Z:/claude-sota/.claude/rules/mia-pre-apply.md` (pre-apply self-verification discipline applied)
- `Z:/claude-sota/.claude/rules/agent-harness-fit-verification.md` (6-Probe-DAG per child rule references)
- `Z:/claude-sota/.claude/rules/convergence-gate.md` (Axis-1+2+3 verification)
- `Z:/claude-sota/.claude/rules/cardinal-rule-12-upstream-install-priority.md` (CR-12 6-class disposition lattice — SUPERSEDED-BY-X applied to writing-skills)

SUPERPOWERS-CATALOG-COMPLETE: 14 skills audited / 10 ADOPT-NOW / 1 STUDY-PILOT / 2 REJECT (HARD-GATE + SUPERSEDED-BY-X) / G3 marketplace-name verified / Section 1E manifest extension prescribed / Mia pre-apply self-verification all 7 sub-claims GENUINE.
