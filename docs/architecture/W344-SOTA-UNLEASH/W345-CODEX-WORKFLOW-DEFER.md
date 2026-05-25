# W345 carry-forward — codex-review-gate.yml deferral

**DWELL-CLASS**: P3.4_CODEX_WORKFLOW_DEFER
**Filed**: 2026-05-20 (W344 closure)

## Why deferred

`.github/workflows/codex-review-gate.yml` (originally W344 Z6 P3.4 #1) ELECTED OUT of W344 ship commit. After R1-R4 codex closures (workflow_dispatch-only + branch + SHA + merge-base + exact-status diff-guard), R5 review STALLED at 22min (vs typical 1-2min cadence). The workflow's design is sound but iterative codex hardening on a workflow_dispatch-only file (not active as PR gate) has diminishing returns until W345 runner-proving.

## Root cause for deferral

- Codex CLI is NOT pre-installed on `ubuntu-latest` GitHub-hosted runners
- No `@anthropics/codex` npm package currently published to public registry
- Auth wiring (OAuth flow used locally) likely incompatible with GH Actions context
- Without proven install + auth path, the workflow would be an always-failing required check OR dead workflow_dispatch button

## R1-R4 closures already applied (preserved in working tree on side branch)

| Round | Finding | Closure |
|---|---|---|
| R1 | `command -v codex` fails on ubuntu-latest | workflow_dispatch-only (no pull_request trigger) |
| R2 F3 | Empty diff possible on dispatch from main | Branch-range name-level guard |
| R3 | Branch guard bypassable for distinct names same SHA | SHA-level + diff-range tightening |
| R4 | git diff --quiet fatal exit treated as diff present | set +e + exact status capture + case-branch on 0/1/* |

## W345 actions

1. Prove codex CLI install path on GH runner (custom action OR self-hosted runner via actions-runner-controller)
2. Wire codex auth (operator-managed secret OR self-hosted runner with local auth)
3. Re-add `pull_request` trigger AFTER one successful workflow_dispatch run
4. Add `actionlint` workflow-syntax CI check
5. Add unrelated-history regression test for diff-range guard
6. Run codex final-round APPROVE on the workflow file alone (smaller diff = less codex-thrashing)
7. Mark as branch-protection required-check

## Other 2 workflows SHIP this wave

- `pre-commit-mirror.yml` — runs .pre-commit-config.yaml on CI (proven via local pre-commit)
- `parallel-guard-stress.yml` — runs both race + R4 cross-prompt tests (proven 50/50 stress)

These 2 don't require codex CLI and are runner-portable with deterministic scope. They are the ONLY workflows that ship in W344. All 3 calibration workflows below are DEFERRED to W345.

## ALSO DEFERRED: skills-trigger-eval.yml

`.github/workflows/skills-trigger-eval.yml` ELECTED OUT after codex R9-R10 calibration issues — trigger-extract regex doesn't recognize `Triggers on` form used by session-handoff skill; would fail-open. Pattern same as sca-decision-audit deferral.

**W345 actions (DWELL-CLASS: P3.4_SKILLS_EVAL_PARSER_DEFER)**:
1. Extend trigger extractor to all SKILL.md forms: `Use when` / `Trigger when` / `Triggers on:` / `Fires when` / `When the operator says`
2. Add fixture: session-handoff (10+ triggers) + new-skill-with-Triggers-on style (>8) → assert exit 2 unless allowlisted
3. Re-run codex final-round APPROVE on tightened parser alone

## ALSO DEFERRED: sca-decision-audit.yml

`.github/workflows/sca-decision-audit.yml` (Z6 P3.4 #4) ALSO ELECTED OUT of this commit. After R5 F6 (advisory-vs-binding flip), R6 F8 (parser scope), and R7 F9+F10 (cite-required-or-fail + TBD-section vs TBD-row), codex review continued to find legitimate parser edge cases. Root cause: heading-section scanning conflates wave-closure ledgers (with TBD scaffolding) and sca-rubric decision rows (which require strict 3-org cite floor).

**W345 actions (DWELL-CLASS: P3.4_SCA_AUDIT_PARSER_DEFER)**:
1. Reshape workflow scope to ONLY scan sca-rubric files (e.g. `.claude/skills/sota-convergence-audit/**` + designated `**/sca-decisions-*.md` pattern), NOT generic VERDICT-LEDGER files
2. Row-level parser (markdown table OR fenced YAML) instead of heading-section split
3. Add fixture tests: mixed TBD/completed rows + decision rows without cite
4. Re-run codex final-round APPROVE on tightened workflow alone

## Cite-anchors (3-org-distinct)

1. actions-runner-controller (Actions org / OpenSSF) — self-hosted runner pattern
2. GitHub Actions docs (GitHub Inc) — workflow_dispatch + required-check semantics
3. Anthropic codex doc (CCBP `claude-memory.md @ a28cd96b` + codex@openai-codex plugin v1.0.4)
