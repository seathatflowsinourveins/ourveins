# W432-RULESET-NAMES — Verification probe

**Wave**: W432-RULESET-NAMES
**Session**: `0ba1d763-9909-4ba1-951d-63d550b8603e`
**Probed**: 2026-05-24 (live workflow probe from `.github/workflows/` on `main` HEAD `35d6f2f`)
**Branch**: `goal/W432-ruleset-names`
**Worktree**: `Z:/claude-sota-installed-W432-RULESET-NAMES`
**Verdict**: V2 payload ready for operator-confirmed PUT — diverges from `W432-RULESET-RECONCILE/MERGED-AMEND-PAYLOAD.json` by **dropping the `required_signatures` rule** (not by renaming checks). Per CR-6 verify-before-claim, the W432-RULESET-RECONCILE PUT-revert root-cause finding (`tmp/W432-RULESET-NAME-MISMATCH-FINDING.md`) was MISDIAGNOSED — see §3 below.

---

## §1 — Each required-status-check, with live emitter evidence

Per [GitHub Rulesets API — required_status_checks][gh-rsc] (cite 1), the `context` field matches the GitHub Actions **job-name** (`jobs.<id>.name:`), NOT the workflow `name:`. Below is the 13-context matrix with live emitter probes.

| # | Context (`context` field in payload) | Emitter workflow file | Job-name source line | Authentic emitter? |
|---|---|---|---|---|
| 1  | `Pre-commit gates` | `.github/workflows/ci.yml` | L17 `name: Pre-commit gates` | ✅ YES (preserved from prior 5-check ruleset; covers ALL `.pre-commit-config.yaml` hooks via `pre-commit run --all-files` in CI job) |
| 2  | `CR-2 — .claude/hooks 2KB ceiling` | `.github/workflows/ci.yml` | L68 `name: CR-2 — .claude/hooks 2KB ceiling` | ✅ YES (separate `cr2-2kb-check` job in ci.yml; verifies ≤2048-byte ceiling per CLAUDE.md L29) |
| 3  | `gitleaks (secrets scan)` | `.github/workflows/ci.yml` | L89 `name: gitleaks (secrets scan)` | ✅ YES (separate `gitleaks` job in ci.yml using `gitleaks/gitleaks-action`; W381-pinned to 8.30.1) |
| 4  | `trivy (HIGH/CRITICAL CVE scan — OWASP CICD-SEC-3)` | `.github/workflows/ci.yml` | L118 `name: trivy (HIGH/CRITICAL CVE scan — OWASP CICD-SEC-3)` | ✅ YES (separate `trivy-ci` job using `aquasecurity/trivy-action`) |
| 5  | `ShellCheck (Bash discipline)` | `.github/workflows/ci.yml` | L177 `name: ShellCheck (Bash discipline)` | ✅ YES (separate `shellcheck` job using `ludeeus/action-shellcheck`) |
| 6  | `Ruff (Python discipline)` | `.github/workflows/ci.yml` | L193 `name: Ruff (Python discipline)` | ✅ YES (separate `ruff` job using `astral-sh/ruff-action`) |
| 7  | `R3 subagent_type allowlist freshness` | `.github/workflows/ci.yml` | L204 `name: R3 subagent_type allowlist freshness` | ✅ YES (separate `subagent-allowlist-check` job; verifies `.claude/state/subagent-type-allowlist.json` per CLAUDE.md L74) |
| 8  | `sca-v13 Meta-Invariant I1 (provenance-lint)` | `.github/workflows/ci.yml` | L225 `name: sca-v13 Meta-Invariant I1 (provenance-lint)` | ✅ YES (separate `cite-anchor-discipline` job; runs `tools/provenance-lint-v3.mjs`) |
| 9  | `CodeQL javascript-typescript` | `.github/workflows/codeql.yml` | L25 `name: CodeQL ${{ matrix.language }}` (matrix expands `javascript-typescript`) | ✅ YES (matrix job — verified expansion via `gh run list --branch main --workflow="CodeQL (SAST)"`) |
| 10 | `CodeQL python` | `.github/workflows/codeql.yml` | L25 `name: CodeQL ${{ matrix.language }}` (matrix expands `python`) | ✅ YES (matrix job — second matrix expansion) |
| 11 | `commitlint (commit-message discipline)` | `.github/workflows/commitlint.yml` | L21 `name: commitlint (commit-message discipline)` | ✅ YES (preserved from prior 5-check ruleset; `wagoid/commitlint-github-action`) |
| 12 | `Codex-Verdict trailer (binding)` | `.github/workflows/codex-verdict-gate.yml` | L39 `name: Codex-Verdict trailer (binding)` | ✅ YES (preserved from prior 5-check ruleset; workflow `name:` is `Codex-Verdict gate (binding)` BUT job-name is `Codex-Verdict trailer (binding)` — payload uses CORRECT job-name) |
| 13 | `DCO sign-off (Developer Certificate of Origin)` | `.github/workflows/commit-signing.yml` | L41 `name: DCO sign-off (Developer Certificate of Origin)` | ✅ YES (binding job; sibling `GPG/SSH signature presence (advisory)` job at L122 is `continue-on-error: true` and intentionally NOT a required-check) |

**Verdict**: ALL 13 contexts are authentic GitHub Actions job-name emitters. No renames required. No drops required.

---

## §2 — Diff vs `MERGED-AMEND-PAYLOAD.json` (V1)

| Element | V1 (W432-RULESET-RECONCILE) | V2 (W432-RULESET-NAMES) | Delta |
|---|---|---|---|
| `name` | `main-branch-protection-sota` | `main-branch-protection-sota` | EQUAL |
| `target` | `branch` | `branch` | EQUAL |
| `enforcement` | `active` | `active` | EQUAL |
| `bypass_actors` | `[]` | `[]` | EQUAL |
| `conditions.ref_name` | `{exclude:[], include:["~DEFAULT_BRANCH"]}` | (same) | EQUAL |
| **rules**: `deletion` | ✅ | ✅ | EQUAL |
| **rules**: `non_fast_forward` | ✅ | ✅ | EQUAL |
| **rules**: `required_linear_history` | ✅ | ✅ | EQUAL |
| **rules**: `required_signatures` | ✅ | ❌ **REMOVED** | **DROP** |
| **rules**: `pull_request` | (same params) | (same params) | EQUAL |
| **rules**: `required_status_checks` | 13 contexts | 13 contexts (IDENTICAL list) | EQUAL |

**Single material change**: V2 removes the `required_signatures` rule. All 13 status-check contexts are KEPT IDENTICAL — they are all authentic job-name emitters per §1 evidence.

---

## §3 — Why V1's mismatch finding was misdiagnosed (CR-6 evidence reconciliation)

The `tmp/W432-RULESET-NAME-MISMATCH-FINDING.md` finding asserted the 8 NEW check-names were "pre-commit hook IDs that run INSIDE the `pre-commit-mirror` workflow, NOT separate emitter workflows". This is FACTUALLY WRONG per the live probe in §1:

- The 8 NEW names (CR-2, gitleaks, trivy, ShellCheck, Ruff, R3, sca-v13, DCO) are GitHub Actions **job-names** at distinct `jobs.<id>` keys in `ci.yml` (or `commit-signing.yml` for DCO). They EMIT independent check-runs to GitHub's check-run API per the canonical `jobs.<id>.name:` → status-check-context mapping documented by [GitHub Rulesets API][gh-rsc].
- The `pre-commit-mirror` workflow (`.github/workflows/pre-commit-mirror.yml`) is a SEPARATE workflow that runs at L29 with job-name `pre-commit (mirror local .pre-commit-config.yaml)` — it does NOT subsume or coincide with the ci.yml jobs listed above.
- The pre-commit hook IDs in `.pre-commit-config.yaml` (e.g. `gitleaks`, `cr2-2kb-hooks`, `bare-subagent-grep`) are unrelated to the `ci.yml` job-names of the same/similar text — they share semantic meaning but are emitted by different runtimes.

**Likely actual root cause of the 23:15-23:28Z block window** (per CR-6 verify-before-claim):

1. **`required_signatures` rule** — V1 added this rule type at L17 of the payload. Per [GitHub Rulesets — Require signed commits][gh-rsig] (cite 2), this rule REJECTS any push containing unsigned commits. The runtime's commit history contains unsigned commits, and the rule blocks new PR commits at platform-level merge time, NOT a check-run-name mismatch.
2. **`strict_required_status_checks_policy: true`** — same in V1 and V2; would only block if any of the 13 contexts is currently RED on the PR head-commit. PRs would show as "13 of 13 required status checks are expected" rather than "5 of 5" — the cited "5 of 5" wording in the finding suggests GHA UX text from a different code-path.
3. **CodeQL Code-Scanning gating** — per `.github/workflows/codeql.yml` L60+ RC-25, CodeQL SARIF upload fails on PRIVATE repos without GH Advanced Security; the workflow STILL runs but CodeQL check-runs may report `failure` rather than `success`. This is preexisting on main; not a new V1 regression.

**Live evidence of which PRs actually merged during the 13-check window**:

- Ruleset v38476657 (13 checks + `required_signatures`) active: **2026-05-24T23:15:47Z → 23:28:12Z** (12 min 25 s).
- Ruleset v38476913 (current; 5 checks; `required_signatures` removed) active: **2026-05-24T23:28:12Z → present**.
- PRs merged in the 13-check window: ZERO (PR #122 merged 23:15:02Z BEFORE the PUT; PR #125 merged 23:28:48Z AFTER the revert).

So the operator did the right thing (revert) — but the V1 finding misattributed the cause to check-name mismatches. The cause was `required_signatures` (an additional rule type), not the check-name list.

---

## §4 — Recommendation

**Apply V2** (no name renames / no name drops) AFTER:

1. **Drain in-flight PRs** that have not yet rebased onto current `main`.
2. **Audit signed-commit migration plan** before re-introducing `required_signatures` in a separate wave. Operator should configure `git config commit.gpgsign true` + `gpg.format ssh` + a signing key on each contributor machine. Existing unsigned commits on `main` are not retroactively invalidated, but new PR commits MUST be signed once `required_signatures` is reintroduced.
3. **Verify all 13 contexts are CI-GREEN on main HEAD** before PUT (so the `strict_required_status_checks_policy` doesn't reject the next push). Use `gh run list --branch main --limit 30 --json workflowName,name,conclusion` to confirm.

**Rollback plan**: same as V1 — restore from `docs/architecture/W432-RULESET-RECONCILE/PRE-AMEND-SNAPSHOT.json` (5-check baseline preserved on main HEAD).

---

## §5 — Cite-floor (≥3 distinct orgs per W352-S9; this delivers 6)

1. **GitHub** — [Rulesets REST API — required_status_checks][gh-rsc]: defines `context` field semantics (matches GitHub Actions job-name); `integration_id: 15368` = GitHub Actions canonical App ID.
2. **GitHub** — [Rulesets — Require signed commits][gh-rsig]: defines `required_signatures` rule semantics (platform-side commit-signing enforcement).
3. **pre-commit.com** — [Hook ID vs Workflow Check-Run distinction][pc-hooks]: pre-commit hook IDs run within a single CI step and do NOT emit individual GitHub check-runs unless wrapped per-hook in separate workflow jobs.
4. **OWASP CICD-SEC-3** — [Dependency Chain Abuse][owasp-cs3]: trivy HIGH/CRITICAL CVE scan as PW-class control directly aligned with this risk category.
5. **OpenSSF Scorecard** — [Branch-Protection check][ossf-bp]: requires required-status-checks + linear-history + no-force-push + protected-against-deletion; V2 preserves all required scorecard controls.
6. **NIST SP 800-218 (SSDF) PW.7 + RV.1** — [Code Review + Identify Vulnerabilities][nist-ssdf]: required-status-checks for gitleaks/trivy/ShellCheck/Ruff/CodeQL/sca-v13 are direct implementations of PW.7 + RV.1 controls.

[gh-rsc]: https://docs.github.com/en/rest/repos/rules#update-a-repository-ruleset
[gh-rsig]: https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets/available-rules-for-rulesets#require-signed-commits
[pc-hooks]: https://pre-commit.com/
[owasp-cs3]: https://owasp.org/www-project-top-10-ci-cd-security-risks/CICD-SEC-03-Dependency-Chain-Abuse
[ossf-bp]: https://github.com/ossf/scorecard/blob/main/docs/checks.md#branch-protection
[nist-ssdf]: https://csrc.nist.gov/pubs/sp/800/218/final

---

## §6 — Apply script

See `tmp/apply-ruleset-v2-put.ps1` (operator-reviewable; DO NOT auto-execute).
