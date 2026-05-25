---
title: Wave 200 P0.B-C Close Synthesis — SOTA Convergence Replacement
date: 2026-05-14
status: CLOSED / APPROVE-VERDICTS
wave: W200
phase: P0.B-C close-synthesis
orchestrator: Codex
on_handoff_to: orchestrator
---

# Wave 200 P0.B-C Close Synthesis

## 1. Wave Summary

**Status**: CLOSED / APPROVE-VERDICTS  
**Date**: 2026-05-14  
**Scope**: Five-agent W200 SOTA-CONVERGENCE-REPLACEMENT wave, completed with Agents A/B/C only. Agents D/E were not dispatched due to budget constraints.

**Executive finding**: 0/5 target primitives have a clean upstream replacement. All five remain KEEP or HYBRID-CITE-IMPORT-AMBER with CR-12 PARTIAL-OVERLAP or GENUINELY-NEW dispositions. Agent C adversarial review approved Agent A/B verdicts at confidence 0.86 and found no flips.

**Targets assessed**:

| Target | Primitive | Final Verdict |
|---|---|---|
| 1 | FM-17.e codex-rescue blind-spot | KEEP / CR-12 PARTIAL-OVERLAP |
| 2 | Mia pre-apply | HYBRID-CITE-IMPORT-AMBER / CR-12 PARTIAL-OVERLAP |
| 3 | CADP parallel-agent-wave pacing | KEEP / CR-12 PARTIAL-OVERLAP |
| 4 | Path P foreground+tee recovery | KEEP / CR-12 GENUINELY-NEW |
| 5 | FM-20 path-drift cascade | KEEP / CR-12 PARTIAL-OVERLAP |

## 2. Agent Roster

| Agent | Status | Output / Verdict |
|---|---|---|
| Agent A | COMPLETED | 13/21 repos audited locally; 0/5 target primitives replaced; 1 partial augment found: addyosmani `doubt-driven-development` predicate enumeration for Mia-style decision verification. |
| Agent B | COMPLETED | APPROVE-WITH-SCHEDULE, confidence 0.82. Confirmed KEEP/HYBRID dispositions and scheduled W201 cite support for Mia. |
| Agent C | COMPLETED | APPROVE-VERDICTS, confidence 0.86. No target verdict flips. Strengthened FM-20 rationale by naming `get-shit-done` reference/drift overlap as non-replacing. |
| Agent D | NOT-DISPATCHED | Budget constrained. No artifact. |
| Agent E | NOT-DISPATCHED | Budget constrained. No artifact. |

## 3. Probe DAG 1-7 Results

### Target 1: FM-17.e vs `superpowers/subagent-driven-development`

Agent A found `superpowers/skills/subagent-driven-development/SKILL.md` provides a fresh-subagent task loop and two-stage review stack. Agent C confirmed this is orchestration/review prior art, not the FM-17.e detector.

| Probe | Result |
|---|---|
| 1 count-OVER | PASS |
| 2 SDK-vs-CLI | PASS |
| 3 architectural-API | PASS |
| 4 plugin-namespace | PARTIAL: duplicate already-vendored skill under `.claude/plugins/cache/claude-plugins-official/superpowers/5.1.0/skills/subagent-driven-development/` |
| 5 mode-harness-shape | PASS for task/review loop; does not cover codex-rescue wrapper autocompact or harness-fit Probes 4-6 |
| 6 direct-file-blockers | PASS, MIT |
| 7 demand-gate | `.b` DEMAND-CREATES-NEW-WORKFLOW per Agent A |

**Agent C check**: `subagent-driven-development` has fresh subagent plus spec/code-quality review, but no Probes 4-6 harness-fit content and no max-3/max-5 pacing. It cautions against multiple implementation subagents in parallel.

### Target 2: Mia pre-apply vs `superpowers/verification-before-completion`

Confirmed verdict input: `superpowers/verification-before-completion` covers VCS-diff verification but not pre-edit file:line prescription probes.

| Probe | Result |
|---|---|
| 1 count-OVER | PARTIAL: generic verify-before-done discipline overlaps with Mia verification intent |
| 2 SDK-vs-CLI | PASS: skill-level discipline is CLI-compatible |
| 3 architectural-API | PARTIAL: completion verification API does not define Mia's pre-apply prescription probe contract |
| 4 plugin-namespace | PASS/PARTIAL: superpowers skill is already plugin-installed/cite-importable |
| 5 mode-harness-shape | PARTIAL: VCS-diff and completion checks do not replace file:line pre-edit probes |
| 6 direct-file-blockers | PASS |
| 7 demand-gate | W201 action: cite support, not replacement |

**Agent C check**: HYBRID-CITE-IMPORT-AMBER stands. Generic completion verification does not replace Mia's narrower pre-edit verification of specific prescriptions and file:line claims.

### Target 3: CADP vs `dispatching-parallel-agents` + `subagent-driven-development`

Agent A found overlap with parallel-agent dispatch mechanics but no cache-aware fleet caps.

| Probe | Result |
|---|---|
| 1 count-OVER | PASS for agent-dispatch overlap |
| 2 SDK-vs-CLI | PASS |
| 3 architectural-API | PARTIAL: dispatch structure overlaps, pacing invariant absent |
| 4 plugin-namespace | PARTIAL: duplicate/adjacent local fan-out decision gate |
| 5 mode-harness-shape | PARTIAL: no max-3-concurrent/max-5-cumulative cap policy |
| 6 direct-file-blockers | PASS |
| 7 demand-gate | `.a` DEMAND-ABSENCE for cap-policy; CADP retained |

**Agent C check**: No candidate supplies max-3-concurrent/max-5-cumulative pacing. `subagent-driven-development` warns against multiple implementation subagents in parallel, so it does not replace CADP.

### Target 4: Path P vs `wshobson-agents`

Confirmed verdict input: Path P remains genuinely new. `wshobson-agents` fails convergence Axis-1 and Axis-2.

| Probe | Result |
|---|---|
| 1 count-OVER | FAIL for replacement: only adjacent orchestration/plugin prior art |
| 2 SDK-vs-CLI | PARTIAL: plugin/agent system is CLI-adjacent but not foreground+tee codex recovery |
| 3 architectural-API | FAIL: no Pattern B HNF foreground+tee shape found |
| 4 plugin-namespace | PASS as source namespace, not replacement |
| 5 mode-harness-shape | FAIL/PARTIAL: Agent A noted wshobson conductor setup has interactive Q&A hard-gate fit concerns |
| 6 direct-file-blockers | PASS |
| 7 demand-gate | No replacement demand satisfied |

**Agent C check**: Targeted search found the `wshobson` namespace and generic maintainer/team wording only, with no second named practitioner in probed surfaces. Axis-2 FAIL stands.

### Target 5: FM-20 vs `get-shit-done`

Agent C strengthened the overlap record: `get-shit-done` has `verify.references`, `verify.schema-drift`, and `verify.codebase-drift`, but these do not replace FM-20 cite-path drift detection.

| Probe | Result |
|---|---|
| 1 count-OVER | PARTIAL: reference/path existence and drift commands overlap with defensive validation |
| 2 SDK-vs-CLI | PASS/PARTIAL: CLI tools exist; semantics differ |
| 3 architectural-API | PARTIAL: structural/reference existence checks, not cite anchor drift |
| 4 plugin-namespace | PASS |
| 5 mode-harness-shape | FAIL for replacement: no file:line anchor validation, content-hash validation, dependency HEAD pin comparison, or stale cite-path replacement policy |
| 6 direct-file-blockers | PASS |
| 7 demand-gate | Supporting prior art only |

**Agent C check**: Agent B under-reported overlap, but verdict does not flip. `verify.references` checks `@` references and backtick file paths via existence checks. `verify.codebase-drift` is structural and non-blocking on failure modes. FM-20 remains KEEP / PARTIAL-OVERLAP.

## 4. Convergence-Gate Assessment

| Target | Axis-1 Independent Cohort | Axis-2 Practitioner Confirmation | Axis-3 CPD / Maintenance | Assessment |
|---|---|---|---|---|
| FM-17.e | PARTIAL PASS: superpowers gives one strong upstream overlap; already integrated locally | PASS for named upstream author context via superpowers, but no FM-17.e-specific second-practitioner parity | PASS/NOT DECISIVE: active repo, but functional criteria fail | KEEP: upstream covers two-stage review, not codex-rescue blind spot detector |
| Mia pre-apply | PASS/PARTIAL: superpowers + addy `doubt-driven-development` + verification-loop form adjacent cohort | PASS/PARTIAL: practitioner-backed adjacent verification ideas exist | PASS/NOT DECISIVE | HYBRID: cite-import upstream verification support, retain Mia pre-edit file:line probes |
| CADP | PARTIAL: dispatching-parallel-agents overlaps with parallel dispatch, not pacing | PARTIAL: no independent cap-policy confirmation | PASS/NOT DECISIVE | KEEP: no max-3/max-5 cache-aware pacing upstream |
| Path P | FAIL: only wshobson org for probed replacement, not 3 distinct orgs | FAIL: only Seth Hobson / `wshobson` namespace found, no second named practitioner confirmed | NOT DECISIVE | KEEP / GENUINELY-NEW |
| FM-20 | PARTIAL: get-shit-done plus atomic-write/reference checks are adjacent | FAIL/PARTIAL: anonymous quotes only for get-shit-done overlap per confirmed input | PASS/NOT DECISIVE: active repo, but functional criteria fail | KEEP: existence/structural drift is not cite-path drift |

Agent C CPD note: `superpowers`, `wshobson-agents`, and `get-shit-done` are active enough that Axis-3 would not rescue a failed functional replacement. `claude-code-best-practice-shan` is lower-activity/stable-burn-in style evidence if used, but not decisive.

## 5. CR-12 6-Class Disposition

| Target | Candidate(s) | CR-12 Class | Final Disposition |
|---|---|---|---|
| FM-17.e | `superpowers/subagent-driven-development` | PARTIAL-OVERLAP | KEEP. Covers two-stage review, not codex-rescue wrapper autocompact or harness-fit Probes 4-6. Already integrated through `cmc-verdict-shapes.md:44` and `team-orch-state-spawning.md:78`. |
| Mia pre-apply | `superpowers/verification-before-completion`; `addyosmani/doubt-driven-development` | PARTIAL-OVERLAP / HYBRID-CITE-IMPORT-AMBER | KEEP local Mia probe contract; add upstream cite support in W201. |
| CADP | `dispatching-parallel-agents`; `subagent-driven-development` | PARTIAL-OVERLAP | KEEP. Upstream covers how to dispatch/review, not cache-aware max-3/max-5 pacing. |
| Path P | `wshobson-agents` | GENUINELY-NEW | KEEP. Fails Axis-1 and Axis-2 for replacement. |
| FM-20 | `get-shit-done`; agent-orchestrator atomic write | PARTIAL-OVERLAP | KEEP. `verify.references` is path existence, not cite-path drift. Atomic-write is cite reinforcement only. |

## 6. Mia n=30 Ladder Summary

**Current ladder count**: n=30 confirmed by task scope.  
**Wave implication**: Mia remains operationally justified. Upstream verification skills support the general discipline but do not replace the specific pre-apply probe mechanism.

**Key catches / retained mechanism**:

| Catch Class | Retained Mia Value |
|---|---|
| Specific file:line prescription claims | Cheap probe before Edit prevents applying stale or false prescriptions |
| `prescribed_edits` claims | Verify that proposed target files, lines, and surrounding context exist before mutation |
| Overconfident review recommendations | Mia remains narrower and earlier than completion-time verification |
| Upstream overlap | `verification-before-completion` and `doubt-driven-development` should be cite-imported as support, not replacement |

**W201 ladder action**: Add cite support from `superpowers/verification-before-completion` and optionally `addyosmani/doubt-driven-development` predicate enumeration, while preserving Mia's n=30 local empirical ladder.

## 7. SOTA-Convergence Assessment

### SOTA-Grounded / Cite-Importable

| Primitive | Grounding |
|---|---|
| Two-stage subagent review | `superpowers/subagent-driven-development` provides implementer/spec-reviewer/code-quality-reviewer prior art and status vocabulary. |
| Verify-before-declaring-done | `superpowers/verification-before-completion` supports the general verification discipline. |
| Fresh-context doubt review | `addyosmani/doubt-driven-development` adds explicit non-trivial-decision predicate enumeration. |
| Parallel dispatch patterning | `dispatching-parallel-agents` supports general fan-out mechanics. |
| Reference/path existence checks | `get-shit-done verify.references` is valid adjacent prior art for structural reference hygiene. |
| Atomic writes / file locks | agent-orchestrator atomic-write/file-lock patterns reinforce mechanical write safety. |

### TIER-3-LOCAL / Retained Sibling-Novel

| Primitive | Reason Retained |
|---|---|
| FM-17.e codex-rescue blind-spot | No upstream covers codex-rescue wrapper autocompact or harness-fit Probes 4-6. |
| Mia pre-apply file:line prescription probes | Upstream checks occur at completion/doubt-review levels, not pre-edit prescription verification. |
| CADP max-3/max-5 pacing | No upstream cache/fleet depletion cap-policy found. |
| Path P foreground+tee Pattern B HNF recovery | No wshobson or other upstream equivalent found; convergence axes fail. |
| FM-20 cite-path drift cascade | Existing upstream overlap checks path existence or structural drift, not file:line/content/HEAD cite drift. |

**Net SOTA-CONVERGENCE result**: The local primitives are not isolated folklore; they are partially grounded by upstream adjacent disciplines. However, the replacement gate fails because the local rules encode incident-specific operational semantics absent from upstream sources.

## 8. W201 Action Items

| Priority | Action | Owner / Notes |
|---|---|---|
| P0 | Add cite support to `mia-pre-apply.md` from `superpowers/verification-before-completion` (`SKILL.md:19,32,49,71,104` per confirmed verdict input). | W201 |
| P0 | Add explicit `get-shit-done` overlap note to FM-20 rationale: `verify.references`, `verify.schema-drift`, and `verify.codebase-drift` are PARTIAL-OVERLAP but non-replacing. | W201 |
| P1 | Clarify FM-17.e rationale: `subagent-driven-development` covers two-stage review only; no codex-rescue autocompact/harness-fit Probes 4-6. | W201 |
| P1 | Clarify CADP rationale: upstream dispatch skills are prior art for fan-out, not cache-aware max-3/max-5 pacing. | W201 |
| P1 | Add CPD-band field to future Agent B tables or state Axis-3 is not outcome-determinative where functional criteria fail first. | W201 |
| P2 | Consider optional Mia augment from `addyosmani/doubt-driven-development`: non-trivial-decision predicate enumeration. | W201/W202 |

## 9. Commit SHAs Referenced

| SHA | Reference |
|---|---|
| `abc29c4` | FM-20 row 20 |
| `6a21217` | W197 paths narrowing |
| `f2cbfbefebbfef77321e4c9abc9e949826bea9d7` | Agent A cited `superpowers` HEAD for `subagent-driven-development` |
| `ece811f` | Agent C cited `wshobson-agents` latest local commit snapshot |
| `3aaed8f5` | Agent C cited `get-shit-done` latest local commit snapshot |
| `48f2ceb` | Agent C cited `claude-code-best-practice-shan` latest local commit snapshot |

## 10. Deliverables Checklist

| Deliverable | Status |
|---|---|
| Read Agent A artifact `tmp/wave200-agentA-sota-repo-audit-2026-05-14.md` | COMPLETE |
| Read Agent C artifact `tmp/wave200-agentC-adversarial-review-2026-05-14.md` | COMPLETE |
| Consolidate Agent A/B/C verdicts | COMPLETE |
| Mark Agents D/E as not dispatched | COMPLETE |
| Include Probe DAG 1-7 results per target | COMPLETE |
| Include convergence-gate Axis-1/2/3 assessment | COMPLETE |
| Include CR-12 disposition per target | COMPLETE |
| Include Mia n=30 ladder summary | COMPLETE |
| Include SOTA-CONVERGENCE assessment | COMPLETE |
| Include W201 action items | COMPLETE |
| Include referenced commit SHAs | COMPLETE |
| Produce `tmp/wave200-close-synthesis-2026-05-14.md` | COMPLETE |

## Handoff

handoff_to: orchestrator  
output_mode: artifact_written  
artifact: `tmp/wave200-close-synthesis-2026-05-14.md`  
verdict_one_line: W200 P0.B-C closed with APPROVE-VERDICTS; 0/5 clean upstream replacements; five local primitives retained with cite-import/support actions scheduled for W201.
