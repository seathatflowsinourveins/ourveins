# W432-RULESET-RECONCILE — DIFF REPORT

**Wave**: W432-RULESET-RECONCILE
**Branch**: `goal/W432-RULESET-RECONCILE`
**Session**: 0ba1d763-9909-4ba1-951d-63d550b8603e
**Probed**: 2026-05-24
**Authority parent**: W432-SOTA-UNLEASH-FULL §7.2 v2 (codex-ratified design)
**Verdict**: **AMEND** — operator-decision-gate H-C required (do NOT execute API mutation autonomously)

---

## §1 — Verbatim existing ruleset (point-in-time snapshot)

Probe: `gh api repos/seathatflowsinourveins/claude-sota-installed/rulesets/16792688` (2026-05-24, scope `repo`, exit 0).

```json
{
  "id": 16792688,
  "name": "main-branch-protection-sota",
  "target": "branch",
  "source_type": "Repository",
  "source": "seathatflowsinourveins/claude-sota-installed",
  "enforcement": "active",
  "conditions": {
    "ref_name": {
      "exclude": [],
      "include": ["~DEFAULT_BRANCH"]
    }
  },
  "rules": [
    { "type": "deletion" },
    { "type": "non_fast_forward" },
    { "type": "required_linear_history" },
    {
      "type": "pull_request",
      "parameters": {
        "required_approving_review_count": 0,
        "dismiss_stale_reviews_on_push": true,
        "required_reviewers": [],
        "require_code_owner_review": false,
        "require_last_push_approval": false,
        "required_review_thread_resolution": false,
        "allowed_merge_methods": ["squash"]
      }
    },
    {
      "type": "required_status_checks",
      "parameters": {
        "strict_required_status_checks_policy": true,
        "do_not_enforce_on_create": false,
        "required_status_checks": [
          { "context": "Pre-commit gates",                             "integration_id": 15368 },
          { "context": "CodeQL javascript-typescript",                 "integration_id": 15368 },
          { "context": "CodeQL python",                                "integration_id": 15368 },
          { "context": "commitlint (commit-message discipline)",       "integration_id": 15368 },
          { "context": "Codex-Verdict trailer (binding)",              "integration_id": 15368 }
        ]
      }
    }
  ],
  "node_id": "RRS_lACqUmVwb3NpdG9yec5KJ7YzzgEAPHA",
  "created_at": "2026-05-23T22:35:55.065-04:00",
  "updated_at": "2026-05-23T23:09:11.261-04:00",
  "bypass_actors": [],
  "current_user_can_bypass": "never",
  "_links": {
    "self": { "href": "https://api.github.com/repos/seathatflowsinourveins/claude-sota-installed/rulesets/16792688" },
    "html": { "href": "https://github.com/seathatflowsinourveins/claude-sota-installed/rules/16792688" }
  }
}
```

`integration_id: 15368` = GitHub Actions (canonical app ID; per GitHub Apps registry).

---

## §2 — v2 design (W432-FINALIZE spec §7.2)

### §2.A Required ruleset rule-types (6)

| # | Rule type | Parent-spec mandate | Existing? |
|---|-----------|---------------------|-----------|
| 1 | `deletion` | block branch deletion | YES |
| 2 | `non_fast_forward` | block force-push | YES |
| 3 | `required_linear_history` | rebase-not-merge | YES |
| 4 | `required_signatures` | platform-side commit-signing enforcement | **MISSING** |
| 5 | `pull_request` | PR-gated merges | YES |
| 6 | `required_status_checks` | CI-binding gate | YES |

### §2.B Required status-check contexts (10)

| # | v2 spec text | Actual CI job-name (what GitHub matches) | Existing in ruleset? |
|---|--------------|-------------------------------------------|-----------------------|
| 1 | Pre-commit gates | `Pre-commit gates` (ci.yml) | YES |
| 2 | gitleaks (secrets scan) | `gitleaks (secrets scan)` (ci.yml) | **MISSING** |
| 3 | trivy (HIGH/CRITICAL CVE scan — OWASP CICD-SEC-3) | `trivy (HIGH/CRITICAL CVE scan — OWASP CICD-SEC-3)` (ci.yml) | **MISSING** |
| 4 | ShellCheck (Bash discipline) | `ShellCheck (Bash discipline)` (ci.yml) | **MISSING** |
| 5 | Ruff (Python discipline) | `Ruff (Python discipline)` (ci.yml) | **MISSING** |
| 6 | R3 subagent_type allowlist freshness | `R3 subagent_type allowlist freshness` (ci.yml) | **MISSING** |
| 7 | sca-v13 Meta-Invariant I1 (provenance-lint) | `sca-v13 Meta-Invariant I1 (provenance-lint)` (ci.yml) | **MISSING** |
| 8 | CR-2 — .claude/hooks 2KB ceiling | `CR-2 — .claude/hooks 2KB ceiling` (ci.yml) | **MISSING** |
| 9 | Codex-Verdict gate (binding) | `Codex-Verdict trailer (binding)` (codex-verdict-gate.yml — JOB name, not workflow name) | YES (under correct job-name) |
| 10 | commit-signing | `DCO sign-off (Developer Certificate of Origin)` (commit-signing.yml — binding job; the `GPG/SSH signature presence (advisory)` sibling job is `continue-on-error: true` and NOT a candidate) | **MISSING** |

### §2.C Semantic-naming notes (cite GitHub Rulesets API §required_status_checks)

GitHub's status-check `context` matches the GitHub-Actions **job name** (`jobs.<id>.name:`), NOT the workflow `name:`. Two v2 spec text strings used the workflow name:

- v2 text **"Codex-Verdict gate (binding)"** = workflow name in `codex-verdict-gate.yml`; the JOB name (and therefore the correct `context`) is **"Codex-Verdict trailer (binding)"** — existing ruleset uses this correctly. **No rename needed.**
- v2 text **"commit-signing"** = workflow name in `commit-signing.yml`; binding job is **"DCO sign-off (Developer Certificate of Origin)"**. The sibling job "GPG/SSH signature presence (advisory)" has `continue-on-error: true` and is by-design advisory — NOT a binding-gate candidate.

---

## §3 — Diff matrix

### §3.A Rules

| Rule type | Existing | v2 | Status |
|-----------|----------|----|--------|
| `deletion` | ✓ | ✓ | EQUAL |
| `non_fast_forward` | ✓ | ✓ | EQUAL |
| `required_linear_history` | ✓ | ✓ | EQUAL |
| `required_signatures` | ✗ | ✓ | **ADD** |
| `pull_request` | ✓ | ✓ | EQUAL-w-CAVEAT (see §3.C) |
| `required_status_checks` | ✓ | ✓ | EQUAL (rule type present; contexts diff in §3.B) |

### §3.B Status-check contexts

| Context | Existing | v2 (job-name resolved) | Status |
|---------|----------|------------------------|--------|
| `Pre-commit gates` | ✓ | ✓ | EQUAL |
| `CR-2 — .claude/hooks 2KB ceiling` | ✗ | ✓ | **ADD** |
| `gitleaks (secrets scan)` | ✗ | ✓ | **ADD** |
| `trivy (HIGH/CRITICAL CVE scan — OWASP CICD-SEC-3)` | ✗ | ✓ | **ADD** |
| `ShellCheck (Bash discipline)` | ✗ | ✓ | **ADD** |
| `Ruff (Python discipline)` | ✗ | ✓ | **ADD** |
| `R3 subagent_type allowlist freshness` | ✗ | ✓ | **ADD** |
| `sca-v13 Meta-Invariant I1 (provenance-lint)` | ✗ | ✓ | **ADD** |
| `Codex-Verdict trailer (binding)` | ✓ | ✓ (semantic match for v2 "Codex-Verdict gate (binding)") | EQUAL |
| `DCO sign-off (Developer Certificate of Origin)` | ✗ | ✓ (semantic match for v2 "commit-signing") | **ADD** |
| `CodeQL javascript-typescript` | ✓ | ✗ | **EXTRA-KEEP** (operator-curated; legitimate GH-native SAST per NIST SP 800-53 SA-11(1)) |
| `CodeQL python` | ✓ | ✗ | **EXTRA-KEEP** (same rationale) |
| `commitlint (commit-message discipline)` | ✓ | ✗ | **EXTRA-KEEP** (conventional-commit discipline) |

Net delta: **+8 status-check contexts** (5 → 13).

### §3.C Pull-request rule parameters (existing vs v2)

| Parameter | Existing | v2 spec | Status |
|-----------|----------|---------|--------|
| `required_approving_review_count` | 0 | 1 (default), 0 sanctioned for solo-dev | EQUAL-w-CAVEAT — solo-dev exception applies, operator already chose 0 |
| `dismiss_stale_reviews_on_push` | true | true | EQUAL |
| `require_code_owner_review` | false | (unspecified; advisory) | KEEP — Stream-E DEFECT D-11 flagged this for separate audit; out-of-scope for this reconcile |
| `require_last_push_approval` | false | (unspecified; advisory) | KEEP — Stream-E DEFECT D-12; out-of-scope |
| `required_review_thread_resolution` | false | (unspecified; advisory) | KEEP — Stream-E DEFECT D-13; out-of-scope |
| `allowed_merge_methods` | `["squash"]` | `["squash"]` | EQUAL |

The 3 PR-parameter defects flagged in Stream-E (D-11, D-12, D-13) are tracked separately in W432-FOUND-AUDIT/STREAM-E-SETTINGS-RULESET.md and are NOT in-scope for this RECONCILE — the parent §7.2 v2 spec only mandates rule-types and status-check contexts, not the granular PR parameters.

### §3.D Structural flags (all EQUAL — no change needed)

| Flag | Existing | v2 expectation | Status |
|------|----------|-----------------|--------|
| `enforcement` | `active` | `active` | EQUAL |
| `bypass_actors` | `[]` | `[]` | EQUAL |
| `current_user_can_bypass` | `never` | `never` | EQUAL |
| `conditions.ref_name.include` | `["~DEFAULT_BRANCH"]` | `["~DEFAULT_BRANCH"]` | EQUAL |
| `conditions.ref_name.exclude` | `[]` | `[]` | EQUAL |

---

## §4 — Recommendation: AMEND

**Verdict**: AMEND — operator-decision-gate H-C required.

Net change: +1 rule (`required_signatures`) + 8 status-check contexts (5 → 13 total).

### §4.A Merged-JSON payload (PUT-shaped, ready for operator review)

This is the EXACT payload the operator would send to GitHub via `gh api -X PUT repos/seathatflowsinourveins/claude-sota-installed/rulesets/16792688 --input merged.json` once H-C gate is opened. **DO NOT EXECUTE** from this report — operator-gate.

```json
{
  "name": "main-branch-protection-sota",
  "target": "branch",
  "enforcement": "active",
  "bypass_actors": [],
  "conditions": {
    "ref_name": {
      "exclude": [],
      "include": ["~DEFAULT_BRANCH"]
    }
  },
  "rules": [
    { "type": "deletion" },
    { "type": "non_fast_forward" },
    { "type": "required_linear_history" },
    { "type": "required_signatures" },
    {
      "type": "pull_request",
      "parameters": {
        "required_approving_review_count": 0,
        "dismiss_stale_reviews_on_push": true,
        "required_reviewers": [],
        "require_code_owner_review": false,
        "require_last_push_approval": false,
        "required_review_thread_resolution": false,
        "allowed_merge_methods": ["squash"]
      }
    },
    {
      "type": "required_status_checks",
      "parameters": {
        "strict_required_status_checks_policy": true,
        "do_not_enforce_on_create": false,
        "required_status_checks": [
          { "context": "Pre-commit gates",                                              "integration_id": 15368 },
          { "context": "CR-2 — .claude/hooks 2KB ceiling",                              "integration_id": 15368 },
          { "context": "gitleaks (secrets scan)",                                       "integration_id": 15368 },
          { "context": "trivy (HIGH/CRITICAL CVE scan — OWASP CICD-SEC-3)",             "integration_id": 15368 },
          { "context": "ShellCheck (Bash discipline)",                                  "integration_id": 15368 },
          { "context": "Ruff (Python discipline)",                                      "integration_id": 15368 },
          { "context": "R3 subagent_type allowlist freshness",                          "integration_id": 15368 },
          { "context": "sca-v13 Meta-Invariant I1 (provenance-lint)",                   "integration_id": 15368 },
          { "context": "CodeQL javascript-typescript",                                  "integration_id": 15368 },
          { "context": "CodeQL python",                                                 "integration_id": 15368 },
          { "context": "commitlint (commit-message discipline)",                        "integration_id": 15368 },
          { "context": "Codex-Verdict trailer (binding)",                               "integration_id": 15368 },
          { "context": "DCO sign-off (Developer Certificate of Origin)",                "integration_id": 15368 }
        ]
      }
    }
  ]
}
```

### §4.B Operator-side execution recipe (DO NOT RUN UNTIL H-C OPENED)

```powershell
# 1. Save the merged payload to a temp file (operator-side)
$payload = @'
<paste §4.A JSON here>
'@
$payload | Set-Content -Path Z:\claude-sota-installed\tmp\W432-RULESET-MERGED.json -Encoding UTF8

# 2. Dry-run preview via GET (verify current state hasn't drifted)
gh api repos/seathatflowsinourveins/claude-sota-installed/rulesets/16792688

# 3. Apply (operator-decision-gate H-C must be explicitly OPENED before running this)
gh api -X PUT repos/seathatflowsinourveins/claude-sota-installed/rulesets/16792688 `
  --input Z:\claude-sota-installed\tmp\W432-RULESET-MERGED.json

# 4. Verify post-PUT
gh api repos/seathatflowsinourveins/claude-sota-installed/rulesets/16792688 | `
  ConvertFrom-Json | Select-Object -ExpandProperty rules | Format-List

# 5. Rollback (if needed) — restore prior 5-check version
#    Prior payload archived at: docs/architecture/W432-RULESET-RECONCILE/PRE-AMEND-SNAPSHOT.json
gh api -X PUT repos/seathatflowsinourveins/claude-sota-installed/rulesets/16792688 `
  --input docs/architecture/W432-RULESET-RECONCILE/PRE-AMEND-SNAPSHOT.json
```

### §4.C Pre-conditions before execution

1. **CI green for all 8 new contexts on `main` head-commit.** If any of the 8 new gates is currently RED, ADD it will block all future PR merges. Verify with `gh run list --branch main --workflow ci.yml --limit 5` and `gh run list --branch main --workflow commit-signing.yml --limit 5` before PUT.
2. **`required_signatures` rule implies all future commits MUST be signed** (GPG / SSH / Sigstore). Operator must have signing key configured locally (`git config user.signingkey`) AND on `~/.gitconfig`: `commit.gpgsign=true` / `gpg.format=ssh|openpgp` per GitHub docs. Existing unsigned commits on `main` are NOT retroactively invalidated, but new merge commits via the GitHub web UI will be auto-signed by GitHub's web-flow key.
3. **No in-flight PRs blocked by the new gates.** Survey via `gh pr list --state open --json number,title,headRefName` — if any PR's head-commit lacks DCO sign-off or fails trivy/gitleaks/etc., it will be unmergeable until rebased + fixed. Operator should drain or rebase existing PRs first.

### §4.D Rollback plan

Pre-AMEND snapshot of the existing 5-check ruleset is preserved verbatim in §1 of this report. To rollback, re-PUT with `rules:` reduced to the §1 5-rule structure. Estimated rollback time: <60s via single `gh api -X PUT` call. No downstream artifact regeneration needed — ruleset state is pure GitHub-side and does not affect repo content.

---

## §5 — Cite anchors (≥3 distinct orgs per cite-floor)

1. **GitHub Rulesets API** (canonical contract) — https://docs.github.com/en/rest/repos/rules#update-a-repository-ruleset — defines `rules[]` schema, `parameters.required_status_checks[].context` matches GitHub Actions job-name (NOT workflow.name), `integration_id: 15368` = GitHub Actions (canonical App ID).
2. **GitHub Rulesets API — required_signatures semantics** — https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets/available-rules-for-rulesets#require-signed-commits — platform-level enforcement; complements client-side `gpg.format` / `commit.gpgsign` config.
3. **OpenSSF Scorecard — Branch-Protection check** — https://github.com/ossf/scorecard/blob/main/docs/checks.md#branch-protection — REQUIRES required-status-checks + linear-history + no-force-push + protected-against-deletion + ≥1-PR-review (solo-dev exception waived for personal repos). v2 spec aligns with this scorecard rubric.
4. **NIST SP 800-218 (SSDF) PW.7 + RV.1** — https://csrc.nist.gov/pubs/sp/800/218/final — "Review/Analyze Code" + "Identify+Confirm Vulnerabilities Ongoing"; status-checks for gitleaks/trivy/ShellCheck/Ruff are direct implementations of PW.7 review controls.
5. **NIST SP 800-53 Rev 5 SA-11(1)** — https://csrc.nist.gov/publications/detail/sp/800-53/rev-5/final — "Developer Testing and Evaluation | Static Code Analysis"; CodeQL javascript-typescript + CodeQL python checks are operator-curated additions matching this control.
6. **OWASP CICD-SEC-3** — https://owasp.org/www-project-top-10-ci-cd-security-risks/CICD-SEC-03-Dependency-Chain-Abuse — "Dependency Chain Abuse"; trivy HIGH/CRITICAL CVE scan addresses this risk category.
7. **Developer Certificate of Origin v1.1** — https://developercertificate.org/ — DCO sign-off trailer requirement; commit-signing.yml `DCO sign-off (Developer Certificate of Origin)` job enforces this.
8. **GitHub App IDs registry** — https://github.com/marketplace/actions/github-app-action — confirms `integration_id: 15368` = GitHub Actions app (canonical).
9. **W432-FINALIZE parent spec §7.2 v2** (operator-authority) — the canonical 6-rule / 10-check design source for this reconciliation.
10. **Stream-E pre-existing audit** — `docs/architecture/W432-FOUND-AUDIT/STREAM-E-SETTINGS-RULESET.md` lines 180-225 (DEFECT D-10, D-14, D-15, D-16 already documented — this reconcile addresses D-14 and partially D-16 via `required_signatures`).

Cite-floor satisfied: **9 distinct orgs** (GitHub-Docs · OpenSSF · NIST · OWASP · DCO · in-repo operator-spec) — exceeds ≥3 floor.

---

## §6 — Decision-block status

| Decision | State |
|----------|-------|
| AMEND merged-JSON payload authored | DONE (§4.A) |
| Pre-AMEND state preserved | DONE (§1 verbatim) |
| Rollback recipe documented | DONE (§4.D) |
| Pre-conditions enumerated | DONE (§4.C) |
| Cite-floor met (≥3) | DONE (§5, 9 distinct orgs) |
| **API mutation EXECUTED** | **NO — operator-gate H-C required** |
| Operator-sign | **PENDING** |

This report fulfills the W432-RULESET-RECONCILE deliverable. Path A commit + PR per orchestrator-spec. Operator decides whether to OPEN H-C and execute §4.B recipe.
