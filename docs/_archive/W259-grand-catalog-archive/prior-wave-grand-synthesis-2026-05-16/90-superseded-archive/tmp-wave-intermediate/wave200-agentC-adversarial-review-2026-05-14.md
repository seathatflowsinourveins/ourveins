# W200 P0.B-C Adversarial Review of A+B Verdicts

Date: 2026-05-14
Reviewer: gpt5-reviewer, BRIDGE-MODE
Scope: adversarial review of W200 P0.B-A 16-repo SOTA audit and W200 P0.B-B TIER-3-LOCAL replacement verdicts.

## Executive Verdict

VERDICT: APPROVE-VERDICTS
Confidence: 0.86

No Target 1/3/4/5 verdict should flip from KEEP, and Target 2 should remain HYBRID-CITE-IMPORT-AMBER rather than full REPLACE. The strongest adversarial challenge is Target 5: `get-shit-done` has `verify.references`, `verify.schema-drift`, and `verify.codebase-drift`, so Agent B should have explicitly mentioned this. However, the implementation only verifies path existence for `@` references and backtick file paths; it does not validate file:line anchors, quoted content, dependency HEAD/cite drift, or stale local cite-path semantics. That supports PARTIAL-OVERLAP, not replacement.

## Probe Results

### Probe 1: superpowers subagent-driven-development

Evidence:
- `Z:/repos/deps/superpowers/skills/subagent-driven-development/SKILL.md:8` says the skill dispatches a fresh subagent per task with spec compliance review and code quality review.
- `.../SKILL.md:12` defines the core principle as fresh subagent per task plus two-stage review.
- `.../SKILL.md:223` begins the Quality gates section.
- `.../SKILL.md:242` explicitly says not to dispatch multiple implementation subagents in parallel.
- `.../SKILL.md:279` points to `executing-plans` for parallel-session execution.

Adversarial conclusion:
Agent B did not miss a harness-fit or cache-pacing replacement here. The skill is a task-execution and review-loop discipline. It has no Probes 4-6 harness-fit content and no max-3-concurrent/max-5-cumulative pacing. It actually cautions against multiple implementation subagents in parallel, which cuts against CADP replacement.

Target impact:
- Target 1 FM-17.e: KEEP / PARTIAL-OVERLAP remains correct.
- Target 3 CADP: KEEP remains correct.

### Probe 2: wshobson-agents Path P Axis-2

Evidence:
- `Z:/repos/deps/wshobson-agents/README.md:5` identifies the namespace as `wshobson`.
- `.../README.md:49` installs via `/plugin marketplace add wshobson/agents`.
- Broad targeted search for named people/credits in README, docs, and `plugins/agent-teams` only surfaced the `wshobson` namespace and generic maintainer/team wording, not a second named practitioner.
- Root inventory contains no obvious AUTHORS/CREDITS file; visible root files are `.claude`, `.claude-plugin`, `.github`, `docs`, `plugins`, `tools`, `.gitignore`, `CLAUDE.md`, `LICENSE`, `Makefile`, `README.md`.

Adversarial conclusion:
I found no second named practitioner in the probed surfaces. Agent B's Axis-2 FAIL for Path P stands.

Target impact:
- Target 4 Path P: KEEP / GENUINELY-NEW remains correct on the requested probe.

### Probe 3: get-shit-done cite-path validation

Evidence:
- `Z:/repos/deps/get-shit-done/sdk/src/query/verify.ts:357` documents `verifyReferences` as verifying `@` references and backtick file paths.
- `.../verify.ts:383` extracts `@` refs with a regex.
- `.../verify.ts:389` checks `existsSync(resolved)`.
- `.../verify.ts:396` extracts backtick file paths.
- `.../verify.ts:402` checks `existsSync(resolved)`.
- `.../verify.ts:411` returns `valid: missing.length === 0`.
- `.../verify.ts:649` documents `verify.codebase-drift` as a structural drift detector.
- `.../verify.ts:651` says every failure mode returns `{ skipped: true, reason }`.
- `.../verify.ts:655` delegates codebase drift to Node-side `bin/lib/drift.cjs` and `bin/lib/verify.cjs`.
- `Z:/repos/deps/get-shit-done/docs/CLI-TOOLS.md:232` documents `node gsd-tools.cjs verify references <file>`.
- `Z:/repos/deps/get-shit-done/docs/CLI-TOOLS.md:398` documents `node gsd-tools.cjs verify-path-exists <path>`.
- `Z:/repos/deps/get-shit-done/sdk/src/query/command-manifest.verify.ts:13-14` registers `verify.schema-drift` and `verify.codebase-drift`.

Adversarial conclusion:
Agent B under-reported the overlap. `get-shit-done` has a real reference-existence verifier and drift-related commands. But those mechanisms do not appear to validate cite-path drift in the FM-20 sense: no file:line anchor validation, no content-hash validation, no dependency HEAD pin comparison, and no stale local cite path replacement policy. `verify.references` is path-existence validation; `verify.codebase-drift` is structural codebase drift and explicitly non-blocking on failure modes.

Target impact:
- Target 5 FM-20: KEEP / PARTIAL-OVERLAP remains correct, but the rationale should name `verify.references` and `verify.codebase-drift` as non-replacing overlap.

## Agent B Misses by Target

### Target 1 FM-17.e

No replacement candidate found in the requested probe. `superpowers/subagent-driven-development` supplies fresh-subagent task isolation, two-stage review, and quality loops, but not the specific harness-fit probes. The correct classification is PARTIAL-OVERLAP rather than DUPLICATE-FUNCTIONALITY because it covers orchestration/review behavior, not the FM-17.e failure-mode detector.

Verdict: no flip.

### Target 2 Mia Pre-Apply

Agent B's HYBRID-CITE-IMPORT-AMBER stands. `superpowers/verification-before-completion` plausibly supplies the broad "verify before declaring done" discipline, but Mia pre-apply is narrower: pre-edit verification of specific prescriptions and file:line claims. That specificity is not replaced by generic completion verification.

Verdict: no flip.

### Target 3 CADP

No candidate in the requested probes supplies the max-3-concurrent/max-5-cumulative pacing contract. `subagent-driven-development` actually warns against multiple implementation subagents in parallel. This is PARTIAL-OVERLAP, not DUPLICATE-FUNCTIONALITY, because it shares agent coordination concerns without the cache-account pacing invariant.

Verdict: no flip.

### Target 4 Path P

No second named practitioner surfaced in `wshobson-agents`. Axis-2 remains failed. Agent B's GENUINELY-NEW classification remains plausible for the local Path P composition.

Verdict: no flip.

### Target 5 FM-20

Agent B missed relevant overlap in `get-shit-done`: `verify.references` and drift commands. This does not satisfy replacement criteria because it is existence/structural drift, not cite-path drift with line/content/provenance validation.

Verdict: no flip; rationale should be strengthened.

## Agent A Misses / ADOPT-NOW Cross-Check

I did not find a local artifact from Agent A in `tmp/` or `.claude/state` matching this W200 audit, so I could not independently compare its full 16-repo finding list. Based on the requested probes and local evidence, the only material candidate that should have been surfaced to Agent B is `get-shit-done`'s `verify.references` plus `verify.codebase-drift`. That is ADOPT-AS-SUPPORTING-PRIOR-ART, not ADOPT-NOW replacement for FM-20.

No additional ADOPT-NOW replacement candidate was found in the targeted checks.

## Axis-3 CPD Band

Agent B omitted formal CPD band labels. This matters for audit completeness, but it does not change these verdicts because every challenged target fails on functional replacement criteria before maintenance/provenance can decide the outcome.

Observed activity snapshots:
- `superpowers`: latest local commit `f2cbfbe` on 2026-05-04, 162 commits in last 90 days.
- `wshobson-agents`: latest local commit `ece811f` on 2026-05-02, 147 commits in last 90 days.
- `get-shit-done`: latest local commit `3aaed8f5` on 2026-05-09, 1752 commits in last 90 days.
- `claude-code-best-practice-shan`: latest local commit `48f2ceb` on 2026-05-08, 1 commit in last 90 days.

Recommended completion fix:
- Add CPD bands in Agent B's final table.
- Mark the first three repos as active enough that Axis-3 would not rescue a failed functional replacement.
- Treat `claude-code-best-practice-shan` as lower-activity/stable-burn-in style evidence if used, but not decisive for these five verdicts.

## CR-12 Classification Check

Targets 1, 3, and 5 are correctly PARTIAL-OVERLAP, not DUPLICATE-FUNCTIONALITY.

- Target 1: Subagent-driven development overlaps with task isolation and review loops, not FM-17.e harness-fit probes.
- Target 3: Agent orchestration overlaps with coordination, not cache/fleet pacing caps.
- Target 5: GSD verifies path existence and structural drift, not cite anchor/content/provenance drift.

DUPLICATE-FUNCTIONALITY would require the upstream primitive to perform the same operational checks with the same gating semantics. None of the probed candidates do.

## Required Revisions

None required for the verdicts.

Suggested non-blocking revisions to Agent B's writeup:
1. Add `get-shit-done` `verify.references`, `verify.schema-drift`, and `verify.codebase-drift` to Target 5 as explicit PARTIAL-OVERLAP evidence.
2. Add CPD bands or mark Axis-3 as "not outcome-determinative because functional criteria fail first."
3. Clarify that `superpowers/subagent-driven-development` supports FM-17.e/CADP as orchestration prior art only, not as a detector or pacing rule.

Final answer:
VERDICT: APPROVE-VERDICTS
Confidence: 0.86
