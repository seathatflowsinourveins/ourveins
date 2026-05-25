# STREAM-B-mattpocock-skills — W319 Stream B (NEW since vendor-fork-4 only)

## HEAD-SHA-AT-INGEST
- `67bce91c80cd1020a4f068ced32d0281656842ad` @ 2026-05-18 13:21:28 +0100
- 28 SKILL.md files across `engineering/`, `productivity/`, `in-progress/`, `misc/`, `personal/`, `deprecated/`
- Stream A already deep-audited; Stream B scope: NET-NEW SINCE W316 vendor-fork-4

## CITE-DRIFT

| Cite location | Cited value | Current truth | Action |
|---|---|---|---|
| `.claude/skills/{caveman,diagnose,grill-with-docs,tdd}/SKILL.md` line 10 | `67bce91c80cd1020a4f068ced32d0281656842ad` @ 2026-05-18 12:21 UTC | Matches `67bce91c80cd1020a4f068ced32d0281656842ad` | **ZERO DRIFT** |
| CLAUDE.md L30 | `mattpocock-vendor-fork-4: grill-with-docs + tdd + caveman + diagnose` | All 4 still present in repo (caveman in `productivity/`, diagnose+grill-with-docs+tdd in `engineering/`) | none |

ZERO CITE-DRIFT. Vendor-fork SHA matches HEAD exactly; mattpocock has NOT received commits since our 2026-05-18 fork.

## NET-NEW-PATTERNS (since vendor-fork-4 cutoff 2026-05-18 12:21 UTC)

Repo commits in the same day (`67bce91` was the very HEAD at fork time):

| PRIO | Skill / pattern | Cite (path:line) | Why net-new |
|---|---|---|---|
| 1 | `handoff` skill (moved `in-progress/handoff/` → `productivity/handoff/`) | `skills/productivity/handoff/SKILL.md` | NET-NEW skill: compact current conversation into a handoff document for another agent to pick up. Saves to `mktemp -t handoff-XXXXXX.md`. Suggests skills to use next session. **Directly relevant to our `mem-recall` + memory-stack workflow**: handoff captures the volatile session state that doesn't qualify for T6 persistence. **PRIO-1 W320 vendor-fork candidate (CLAUDE.md L34 W314-r2 Stream A AI-r2-4 already queues this).** |
| 1 | `review` skill — two-axis review (Standards + Spec) via parallel sub-agents | `skills/in-progress/review/SKILL.md` | NET-NEW: review HEAD against a fixed-point (commit/branch/tag/merge-base). Parallel sub-agent dispatch matches our W269 `parallel-dispatch-mandate`. Already proposed in CLAUDE.md L42 W314-r2 AI-r2-4 (`review skill vendor-fork`). **PRIO-1 W320 vendor-fork candidate.** |
| 2 | `prototype` skill — interactive design exploration with LOGIC.md + UI.md split | `skills/engineering/prototype/SKILL.md` + `prototype/LOGIC.md` + `prototype/UI.md` | NET-NEW pattern: split a design exploration into "logic" + "UI" artifacts inside the skill dir. Could be vendor-fork candidate; overlaps with our `frontend-ui-engineering` (addyosmani). PRIO-2. |
| 2 | `writing-fragments` skill — captures initial user prompts as fragments | `skills/in-progress/writing-fragments/SKILL.md` | Pattern: capture verbatim user prompts as planning fragments. Could augment our `durable-planning-files`. PRIO-2 informational. |
| 2 | `writing-beats` skill (new in in-progress/) | `skills/in-progress/writing-beats/SKILL.md` | Story-beat pattern for narrative prompts. Niche. PRIO-2. |
| 2 | `writing-shape` skill | `skills/in-progress/writing-shape/SKILL.md` | Companion to writing-beats. PRIO-2. |
| 3 | `CONTEXT.md` clarification commit (`e74f006`): "Clarify purpose of CONTEXT.md to emphasize it as a glossary, removing implementation details" | `CONTEXT.md` | Pattern: CONTEXT.md = glossary at runtime root (W314-r2 Stream A AI-r2-3 already queued). PRIO-3. |
| 3 | `grill-with-docs` (vendored as `grill-with-docs`) had post-fork commit `e74f006` updating CONTEXT.md reference | `skills/engineering/grill-with-docs/SKILL.md` | Our vendored `grill-with-docs` is fork-snapshot — verify it does or doesn't need refresh per CONTEXT.md emphasis. PRIO-3 minor refresh. |
| 4 | `link-skills.sh` script excludes deprecated skills (`494e4b2`) | `scripts/link-skills.sh` | Linking-script pattern. PRIO-4. |
| 4 | `setup-matt-pocock-skills/issue-tracker-gitlab.md` triage clarifications | `skills/engineering/setup-matt-pocock-skills/issue-tracker-gitlab.md` | GitLab-specific issue-tracker pattern. PRIO-4 (not used here). |
| 5 | README.md typo fixes (`67bce91`, `f304057`, `733d312`) | (commit refs) | Doc fixes. PRIO-5. |

## STALE-IN-UPSTREAM
- `improve-codebase-architecture` skill remains in `engineering/` (not deprecated); zoom-out also still present.
- `grill-me` is in `productivity/`, `grill-with-docs` is in `engineering/` (both differ from `addyosmani:interview-me`).
- The PRIO-1 ranking on `review` + `handoff` matches CLAUDE.md L42 W314-r2 AI-r2-4 batch — Stream B confirms both are W320 ready candidates.

## HARNESS-FIT
- Decision: VENDOR-FORK HOLD; vendor-fork-4 still current
- Action W320 candidates (PRIO-1):
  1. Vendor-fork `handoff` skill — fills cross-session-handoff gap; complements mem-recall
  2. Vendor-fork `review` skill — formal two-axis review pattern
- License: MIT

## License
MIT
