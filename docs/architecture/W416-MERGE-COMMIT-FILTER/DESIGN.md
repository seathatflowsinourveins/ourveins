# W416 — Binding-gate merge-commit filter (parallel-future-session resilience)

> Phase-0c hardening closing the W402+W403 empirical pain point: GitHub "Update branch" merge commits without trailers blocking otherwise-valid PRs under `strict_required_status_checks_policy: true`. Cite-anchor for live lesson: T6 basic-memory note `main/learnings/w402-w403-strict-policy-update-branch-lesson-force-rebase-fix`.

## §1 Problem (verified empirically W402+W403)

W387 governance shipped (per `docs/architecture/W387-SOTA-GOVERNANCE/DESIGN.md`):

- Ruleset `main-branch-protection-sota` (id 16792688) with `strict_required_status_checks_policy: true` + `allowed_merge_methods: ["squash"]` + `required_linear_history: true`.
- Two binding gates over every PR commit: `Codex-Verdict trailer (binding)` + `commit-signing.yml`'s `DCO sign-off`.

Empirical failure mode observed in W402+W403 (codex consolidated commit `536e83b` 2026-05-24): "BEHIND-state rebases that introduced merge-commits without the required Codex-Verdict trailer."

Sequence:

1. PR's branch goes BEHIND `main` (parallel session lands faster).
2. Strict policy forces branch update before merge.
3. Operator/agent calls `gh api -X PUT .../update-branch`.
4. GitHub creates a default-message merge commit on the PR branch carrying neither `Codex-Verdict:` nor `Signed-off-by:` trailers.
5. Both binding gates fail on the merge commit → merge blocked → operator forced into manual force-rebase recovery (the very loop W403 fixed by rebase rather than auto-update-branch).

## §2 Why filtering SOME merge commits is SAFE here (the W387 r2 P1#1 partial reversal)

W387 codex r2 P1#1 originally rejected `--no-merges` reasoning: "a content-bearing merge commit lacking the trailer must FAIL rather than silently pass". W416 codex r1 (2026-05-24) BLOCKED a naive `--no-merges` proposal for the SAME reason. W416 codex r2 (2026-05-24) BLOCKED a 2-bucket parent-aware proposal because (P1#1) custom merge resolution can introduce tree content not in either parent while still having 2nd-parent on main, and (P1#2) octopus merges with parent2=main + parent3=attacker bypass a `parent_count > 1` check.

**Final approach (codex r2 P1#1 + P1#2 closure)**: 3-condition noise-merge identification:

| Bucket | Definition | Filter behavior |
|---|---|---|
| (a) non-merge commit | exactly 1 parent | Trailer REQUIRED (binding check unchanged) |
| (b) update-branch noise merge | ALL of: (1) `parent_count == 2`, (2) second-parent ancestor of `origin/main`, (3) merge tree == `git merge-tree --write-tree parent1 parent2` (default merge tree) | SKIP — verified content from main, no custom resolution |
| (c) content-bearing merge | any merge failing bucket (b) | Trailer REQUIRED (binding check) |

The (b) bucket exactly matches GitHub's "Update branch" output: parents = [PR_HEAD, main_HEAD], default (non-conflict-resolved) merge tree. Any deviation — extra parents (octopus), non-main second parent, conflict-resolved or hand-edited tree — falls into (c) and requires a trailer.

Supporting invariants:

| Invariant | Guarantee |
|---|---|
| `allowed_merge_methods: ["squash"]` | Merge commits within the PR branch are FLATTENED on merge — the merge OBJECT never lands on `main`. |
| `required_linear_history: true` | Even bypass merge attempts are rejected — `main` is linear. |
| PR-body trailer check | The squash commit message (== PR body) MUST carry the trailer. That is what lands on `main`. |
| Two-app split (TIER-2 future) | Anti-fabrication separation is at the squash-commit level, not the intra-PR-history level. |

## §3 Adversary model (CR-6 verify-before-claim)

- **Attempt 1 (non-main second-parent):** merge commit with malicious content + 2nd parent on attacker branch + no trailer.
- **Outcome:** fails bucket (b) condition 2 (2nd-parent not ancestor of main) → bucket (c) → trailer required → BLOCK. Closed.

- **Attempt 2 (custom merge resolution with main 2nd-parent — codex r2 P1#1):** merge commit with hand-edited tree + 2nd parent on a benign main tag + no trailer.
- **Outcome:** `git merge-tree --write-tree parent1 parent2` computes the default-merge tree; actual tree differs (custom resolution). Bucket (b) condition 3 fails → bucket (c) → trailer required → BLOCK. Closed.

- **Attempt 3 (conflicting merge with main 2nd-parent):** conflicting merge resolved manually.
- **Outcome:** `git merge-tree --write-tree` either fails or returns a tree with conflict markers. Actual differs (clean tree) → bucket (c) → trailer required. Closed.

- **Attempt 4 (octopus — codex r2 P1#2):** 3-parent merge with parent2=main + parent3=attacker branch with malicious tree content.
- **Outcome:** fails bucket (b) condition 1 (`parent_count == 2`) → bucket (c) → trailer required → BLOCK. Closed.

- **Attempt 5 (merge-only PR — codex r1 P1#2):** open a PR containing only a merge commit.
- **Outcome:** workflow explicitly rejects 0-non-merge PRs (`non_merge_count == 0 → fail=1`). Closed.

- **Attempt 6 (`git merge-tree --write-tree` semantic differences across git versions):** rely on edge-case behavior to bypass.
- **Outcome:** GHA `ubuntu-latest` ships git ≥ 2.43 (--write-tree is stable since 2.40, May 2023). Deterministic semantic.

- **HONEST LIMIT (W387 §8 single-identity residual, not lowered by W416):** the single PAT identity can author a real attack PR with the malicious content as a non-merge commit + APPROVE trailer + Signed-off-by trailer + PR body trailer. That is the SAME residual W387 §8 already documents — TIER-2 two-app split is the principled fix. W416 does NOT lower the floor below this residual.

**Conclusion:** the 3-condition filter eliminates the empirical W402+W403 false-positive (GitHub update-branch noise) while passing codex r1+r2 adversarial review of all known evil-merge variants. Closed via codex r1-r3 review trail.

## §4 Design

### §4.1 Codex-trailer-gate commit-msg hook (`tools/codex-trailer-gate.mjs`)

The hook receives `COMMIT_EDITMSG` path as `argv[2]`. At commit-msg stage, `git log -1 --format=%P HEAD` would resolve to the previous HEAD, not the in-flight commit. So we detect merge commits via **two complementary signals**:

1. **Commit-message-line signature** — git auto-generates merge commits with first line `Merge branch '...'`, `Merge pull request #...`, `Merge remote-tracking branch '...'`, or `Merge tag '...'`. Detect via regex on the FIRST non-comment, non-blank line.
2. **MERGE_HEAD presence** — at commit-msg stage during a merge, `$GIT_DIR/MERGE_HEAD` exists. We probe it via `git rev-parse --git-path MERGE_HEAD` and `existsSync`. This catches user-edited merge messages that don't start with "Merge ...".

If EITHER signal fires → SKIP (exit 0 PASS) with a stderr trace line `[codex-trailer-gate] SKIP: merge commit (signal=...)` for auditability.

Cherry-pick + squash + rebase: cherry-picked commits produce non-merge commits with a single parent → caught by normal trailer check (no skip). Rebased commits: same. Squash merges via GitHub's web flow do not invoke local hooks. So coverage is preserved.

### §4.2 DCO workflow (`.github/workflows/commit-signing.yml`)

Replace the naive `git rev-list "${base}..${head}"` loop with the 3-condition noise-merge classification (per §2 bucket assignment). For each commit:
- 1 parent → DCO trailer required.
- 2 parents + 2nd-parent ancestor of `origin/main` + `actual_tree == git merge-tree --write-tree parent1 parent2` → noise merge → skip.
- All other merges → content-bearing → DCO trailer required.
Add explicit 0-non-merge PR rejection (codex r1 P1#2). Use `git fetch origin main:refs/remotes/origin/main` (codex r2 fetch-precision feedback).

Same 3-condition approach for `signature-advisory` job (skip noise merges; preserve advisory behavior on content-bearing).

### §4.3 Codex-Verdict workflow (`.github/workflows/codex-verdict-gate.yml`)

Replace `git rev-list "${BASE_SHA}..${HEAD_SHA}"` loop with the same 3-condition classification:
- Non-merge → trailer required (existing behavior).
- Update-branch noise merge (3-condition match) → SKIP with traceability annotation.
- Content-bearing merge → trailer required (W387 r2 P1#1 intent preserved for the case that matters).
- 0-non-merge PR → REJECT (codex r1 P1#2).
- PR-body trailer check unchanged (the binding gate for `main` content).

## §5 Smoke-test fixtures

`/tmp/W416-smoke-test/` builds 4 fixture commits and runs `tools/codex-trailer-gate.mjs` against each:

| Fixture | Expected |
|---|---|
| Non-merge commit WITH `Codex-Verdict: APPROVE` | PASS exit 0 |
| Non-merge commit WITHOUT trailer | BLOCK exit 2 |
| Merge commit WITHOUT trailer (first line `Merge branch 'main' into ...`) | PASS exit 0 (NEW behavior; previously BLOCK) |
| Merge commit WITH trailer | PASS exit 0 |

Results recorded in commit message body.

## §6 Cardinal-rule compliance

- **R2 hook discipline**: change is logic update to existing pre-commit shim + direct-CLI flag addition (`--no-merges`). No new self-invented hook body. File-size delta to `tools/codex-trailer-gate.mjs` stays within the 2KB bug-patch-shim exception.
- **R5 sandboxing**: unchanged.
- **R6 verify-before-claim**: §5 smoke-test results + post-merge codex r1-r3 review trail required before "shipped" claim.

## §7 Future considerations (deferred)

- TIER-2 two-app split (W387 §5) at `.github/workflows/codex-verdict-gate.yml` makes the per-commit iteration moot because the binding gate moves to the review-gate App posting check-runs against the squash commit. At that point this filter is irrelevant. We are not regressing.
- If a future workflow needs to validate intra-PR-history (e.g., `git-blame`-on-squash audits), it should opt back IN to `--no-merges`-absent and add its own filter logic; the per-commit binding gate is not the right place.

## §8 Cites (sca-v13 3-org-distinct floor)

- T6 basic-memory `main/learnings/w402-w403-strict-policy-update-branch-lesson-force-rebase-fix`
- W387 design `docs/architecture/W387-SOTA-GOVERNANCE/DESIGN.md` §2 + §10 (codex r2 P1#1)
- Git project — `https://git-scm.com/docs/git-rev-list` (`--no-merges` flag semantics)
- Git project — `https://git-scm.com/docs/githooks#_commit_msg` (commit-msg stage)
- Git project — `https://git-scm.com/docs/git-merge-tree` (`--write-tree` tree-identity check)
- Developer Certificate of Origin — `https://developercertificate.org/` (DCO `Signed-off-by:` trailer)
- GitHub docs — `https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets/available-rules-for-rulesets` (`strict_required_status_checks_policy` + `required_linear_history` semantics)
- GitHub docs — `https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/incorporating-changes-from-a-pull-request/keeping-your-pull-request-in-sync-with-the-base-branch` ("Update branch" merge-commit behavior)
- pre-commit.com — `https://pre-commit.com/#commit-msg-stage-hooks` (commit-msg stage hook contract used by `tools/codex-trailer-gate.mjs`)
- OWASP A06:2021 — `https://owasp.org/Top10/A06_2021-Vulnerable_and_Outdated_Components/` (verify-before-claim anti-fabrication discipline per CLAUDE.md cardinal-rule 6)
- NIST SP 800-218 — `https://csrc.nist.gov/publications/detail/sp/800-218/final` PW.7 (Review/Analyze Code) + RV.1 (Identify+Confirm Vulnerabilities Ongoing)
- W402+W403 consolidated commit `536e83b32e447664651b7ffa3b5a21425ce9101d` (empirical pain-point evidence)
- Codex review trail: `tmp/W416-smoke-test/codex-r{1,2,3}-output.txt` (r1 BLOCK → r2 BLOCK @0.93 → r3 APPROVE)
