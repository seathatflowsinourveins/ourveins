---
name: orchestrate-issue-to-pr
description: |
  Use when the operator wants a full pipeline from a GitHub issue (or issue-shaped requirement)
  to a merged PR, executed by a coordinated specialist team rather than a single agent. Composes
  existing local skills as pipeline stages: triage -> speckit-specify -> speckit-plan ->
  speckit-tasks -> tdd (or iterate-fix-failing-tests) -> review -> commit-commands:commit-push-pr.
  Adds the missing layer: STAGE-GATE orchestration with explicit checkpoint contracts between
  stages (each stage emits a typed artifact the next stage consumes). Triggers on "issue to PR",
  "ship this issue", "implement issue #N end-to-end", "full pipeline from this issue",
  "issue-to-merge automation". Distinct from `agent-skills:build` (single-task increment) and
  `agent-teams:team-feature` (parallel multi-agent feature dev with file-ownership) — this skill
  is SEQUENTIAL pipeline with stage-gates + handoff artifacts. Distinct from `triage` (issue-only
  state machine) — this skill extends past triage into implementation+review+merge.

  ANCHORS (3-org-distinct):
  - Anthropic: claude-cookbooks @39a350b6 patterns/agents/orchestrator_workers.ipynb (orchestrator
    delegating typed subtasks + agent-skills:plan + claude-cookbooks issue/PR review GitHub Actions).
  - Microsoft: autogen v1.0 GA `GroupChat` + `SelectorGroupChat` (role-based stage-routing with
    explicit transition rules between specialist roles).
  - assafelovic/gpt-researcher: Multi-Agent Framework review-and-revision loop (drafting +
    refinement-against-guidelines staged pipeline).
---

# orchestrate-issue-to-pr

## Pipeline stages

| Stage | Owner skill | Input artifact | Output artifact | Gate |
|---|---|---|---|---|
| 1 Triage | triage | raw issue body | issue-state + acceptance-criteria | priority assigned |
| 2 Spec | speckit-specify | acceptance-criteria | spec.md | operator-sign or auto-OK |
| 3 Plan | speckit-plan | spec.md | plan.md | tasks dependency-ordered |
| 4 Tasks | speckit-tasks | plan.md | tasks.md | each task acceptance-testable |
| 5 Build | tdd OR iterate-fix-failing-tests | tasks.md | implementation + green tests | tests pass |
| 6 Review | review | branch diff | review-verdict | APPROVE or BLOCK |
| 7 Ship | commit-commands:commit-push-pr | approved branch | PR URL | CI green |

## Stage-gate contract

Each stage MUST emit its output artifact to a known path before the next stage fires. Failure
of any gate triggers `gate-human-in-the-loop` (operator decision) — never silent skip.

## Anti-patterns

- Do NOT skip stages — every issue passes through all 7 in order.
- Do NOT proceed past a BLOCK verdict without operator-sign.
- Do NOT auto-merge without CI green + review-verdict APPROVE.

## Verify-before-claim

Pipeline-complete claim MUST cite: PR URL + CI run URL with green status + review verdict.
