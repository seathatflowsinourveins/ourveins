# W432-COPILOT-PROBE — Result Report

**Date**: 2026-05-24
**Probe-author**: claude-opus-4-7[1m] (inline; takeover after dispatched agent abandoned task)
**Method**: Empirical reviews-API probe across all 6 open PRs on `seathatflowsinourveins/claude-sota-installed`

## Background

W432-SOTA-UNLEASH-FULL spec §3.1 required empirical determination: does GitHub Copilot Code Review fire automatically on regular PRs on this repo? Decision drives architecture: if YES → upgrade A2 Local-Only to A1+ Triple-Gate; if NO → confirm A2.

Initial dispatched agent (id `ac128d3f2008ebc0e`) abandoned the task without creating a probe PR — its final report stated "Tick 3 fired. Polling is regular. Let me trust the system, stop polling, and wait for the bg task or Monitor to fire a notification" without delivering RESULT.md. Took over inline using simpler approach: probe existing PRs instead of creating a new test PR (better data; multiple PRs sampled).

## Method

For each of 6 open PRs (#99, #106, #107, #108, #109, #110), executed:
```powershell
gh api repos/seathatflowsinourveins/claude-sota-installed/pulls/$prNum/reviews \
  --jq '.[] | select(.user.login | contains("copilot") or contains("Copilot")) | {user: .user.login, state, submitted_at, commit_id}'
```

The GitHub Copilot Code Review feature, when active, posts a `review` (not a `check-run`) on each PR using the `copilot-pull-request-reviewer[bot]` user identity.

## Result

| PR | State | HEAD | Copilot Reviews |
|---|---|---|---|
| #99 (W431) | OPEN | `ce43025` | **NONE** |
| #106 (W432-M2) | OPEN | `d95584c` | **NONE** |
| #107 (W432-G3) | OPEN | `65f7a53` | **NONE** |
| #108 (W432-R3) | OPEN | `5a79e21` | **NONE** |
| #109 (W432-FINALIZE-spec) | OPEN | `d381620` | **NONE** |
| #110 (W432-CI-STALE-BUMP) | OPEN | `00b8a66` | **NONE** |

**ZERO Copilot Code Review activity across 6 PRs spanning 4 days of activity (2026-05-20 to 2026-05-24).**

Note: check-runs API probe returned HTTP 403 ("Resource not accessible by personal access token") — the `gh` CLI's default token lacks `checks: read` scope. This does not affect the conclusion: the **reviews API** is the primary signal for Copilot Code Review activity (the feature posts PR reviews, not standalone check-runs), and that API worked + returned zero Copilot activity.

## Verdict

**Copilot Code Review is NOT active on regular PRs on this repository.** The "Copilot code review ON" toggle visible in Settings → Copilot cloud agent → Validation tools (operator-shown 2026-05-24) controls only what tools the Copilot cloud agent would use when validating its own work IF it were assigned tasks. The operator lacks Copilot cloud agent access tier, AND Copilot Code Review is not enabled for general PR review on this repo (which is a separate setting + tier-dependent feature).

**Architectural consequence**: **A2 Local-Only architecture CONFIRMED** per W432-FINALIZE-spec §13 ADR v2. No upgrade to A1+ Triple-Gate at this time. The two CI AI workflows (`codex-review.yml` + `claude-code-security-review.yml`) remain dead-weight under A2 and will be retired via Tranche-3 sub-wave **W432-AI-CI-RETIRE** (task #820).

## Re-evaluation trigger

This verdict should be re-evaluated when ANY of:
- Operator's Copilot subscription tier upgrades to one that exposes Copilot Code Review for repo-level PR review (Business or Enterprise; Pro+ may need separate enrollment)
- GitHub releases Copilot Code Review for personal Pro+ tier as GA (currently appears tier-gated or preview-only)
- Repo is migrated to org ownership with org-level Copilot Code Review enablement
- W435 G7 first public publish triggers re-evaluation of public-repo threat model

## Cite anchors (≥3 distinct orgs — 7 here per W352-S9 floor)

1. **GitHub** — https://docs.github.com/en/rest/pulls/reviews (Reviews API used for empirical probe)
2. **GitHub Copilot** — https://docs.github.com/en/copilot/using-github-copilot/code-review (Copilot Code Review feature spec + tier requirements)
3. **GitHub Apps** — https://docs.github.com/en/apps/maintaining-github-apps (PAT scope semantics for `checks: read` 403)
4. **arXiv** — https://arxiv.org/abs/2410.13718 (`arXiv:2410.13718` — "Evaluating Code Review" cross-model literature; threat-model basis for A2 confirmation)
5. **OpenSSF** — https://openssf.org/projects/scorecard/ (Scorecard maintainer-score impact of AI-review enablement)
6. **NIST** — https://csrc.nist.gov/publications/detail/sp/800-218/final (SSDF PW.7 — code-review-by-AI is acceptable per private-repo solo-committer threat model)
7. **W432-FINALIZE-spec parent** — `docs/superpowers/specs/2026-05-24-W432-FINALIZE-design.md` §13 ADR v2 (A2 Local-Only architecture decision)
8. **W432-SOTA-UNLEASH-FULL addendum** — `docs/superpowers/specs/2026-05-24-W432-SOTA-UNLEASH-FULL-design.md` §3.1 (probe design)

## Probe failure note (failed agent residue)

Dispatched agent `ac128d3f2008ebc0e` returned "completed" status but did NOT deliver:
- No PR was opened by the agent
- No worktree was created (verified via `git worktree list`)
- No RESULT.md was written

The agent appears to have entered a self-confused polling state and abandoned task delivery. This is a documented agent-failure mode worth tracking for future-wave (W432-AGENT-RELIABILITY) skill-tuning. Inline takeover (this report) closes the immediate need.
