# W381 Stream B — SOTA Branch-Protection Ruleset + Repo Security Hardening

**Repo**: `seathatflowsinourveins/claude-sota-installed` (PRIVATE, default branch `main`)
**Date**: 2026-05-23 · **Wave**: W381 · **Stream**: B (GitHub-governance)
**CR-6 evidence discipline**: every claim below cites a reproducible probe (live `gh api` stdout, `gh run list` job names, workflow YAML `name:` fields) or an official-doc URL. Probes were run live against the repo on 2026-05-23.

---

## 0. Live-state ground truth (probed, not assumed)

| Probe | Command | Result |
|---|---|---|
| Current protection | `gh api .../branches/main/protection` | `required_status_checks.contexts = []` (EMPTY — already cleared); `enforce_admins=true`; `required_signatures.enabled=true`; `required_pull_request_reviews{require_code_owner_reviews=true, required_approving_review_count=1, dismiss_stale_reviews=true, require_last_push_approval=false}`; `required_linear_history=true`; `required_conversation_resolution=true`; `allow_force_pushes=false`; `allow_deletions=false` |
| Rulesets | `gh api .../rulesets` | `[]` — NO modern rulesets exist yet (legacy branch protection only) |
| Repo security | `gh api repos/... --jq .security_and_analysis` | `null` → **private repo without GitHub Advanced Security (GHAS)** |
| Merge config | same | `allow_merge_commit=true, allow_squash_merge=true, allow_rebase_merge=true, delete_branch_on_merge=true, allow_auto_merge=false` |
| Commit signing (local) | W350 KB | SSH signing ACTIVE: `commit.gpgsign=true`, `gpg.format=ssh`, key `.ssh/id_ed25519.pub`, allowed_signers present, `tag.gpgsign=true` |

> NOTE: the mission brief said contexts were the 7-item stale list; the live probe shows `contexts:[]`. The unsatisfiable-context bug was evidently *already worked around by clearing all required checks* — which is worse (zero CI gating on merge). This deliverable RESTORES the correct contexts.

---

## 1. THE BUG + EXACT corrected required-status-check contexts

### Root-cause rule (authoritative)

GitHub branch protection matches a required status check by the **check-run name = the job's `name:` value (after matrix expansion)** — NOT the `<workflow> / <job>` label shown in the PR Checks UI. The `<workflow> / <job>` slash-form is matchable ONLY for **reusable (called) workflows**.

- Cite: GitHub Docs "About protected branches" — *"make sure that job names are unique across all workflows. Using the same job name in multiple workflows can cause ambiguous status check results and block pull requests."* (https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches)
- Cite: Terraform `github_branch_protection_v3` resource docs encode GitHub's API behavior verbatim — *"usual value is the job name … For workflows that use matrixes, append the matrix name … For workflows that use reusable workflows, the pattern is `<workflow> / <job>`."* (https://registry.terraform.io/providers/integrations/github/latest/docs/resources/branch_protection_v3)
- Cite: `amannn/action-semantic-pull-request#133` — a check **cannot be made required without a job `name:`**.

### Mapping: stale brief context → reality

Job names extracted live from `.github/workflows/*.yml` (`grep -nE "^\s{2,6}name:"`), cross-checked against `gh run list --event pull_request` workflow-name column. **No duplicate job names exist** → all contexts unambiguous.

| Stale brief context | Workflow `name:` | Job `name:` (= the matchable check-run name) | PR trigger? | Verdict |
|---|---|---|---|---|
| `Pre-commit gates` | `CI` | **`Pre-commit gates`** (ci.yml:17, job `pre-commit`) | yes | **KEEP AS-IS** — bare job name is correct; do NOT prefix `CI / ` (slash-form is reusable-wf-only) |
| `CodeQL javascript-typescript` | `CodeQL (SAST)` | **`CodeQL javascript-typescript`** (codeql.yml:25, matrix-expanded) | yes | **KEEP AS-IS** ✓ |
| `CodeQL python` | `CodeQL (SAST)` | **`CodeQL python`** | yes | **KEEP AS-IS** ✓ |
| `actionlint` | `actionlint` | **`actionlint (GitHub Actions linter)`** (actionlint.yml:47) | yes (paths-filtered) | **FIX → `actionlint (GitHub Actions linter)`** (bare `actionlint` is the WORKFLOW name, not the job name → unsatisfiable) |
| `zizmor static-analysis` | `zizmor (workflow security audit)` | **`zizmor static-analysis`** (zizmor-action.yml:30) | yes (paths-filtered) | **KEEP AS-IS** ✓ |
| `commitlint` | `Conventional Commits (commitlint)` | **`commitlint (commit-message discipline)`** (commitlint.yml:21) | yes | **FIX → `commitlint (commit-message discipline)`** (bare `commitlint` unsatisfiable) |
| `OSSF Scorecard` | `OpenSSF Scorecard` | `Scorecard analysis` | **NO** — triggers = `branch_protection_rule`/`schedule`/`push`/`workflow_dispatch` (scorecard.yml:2-8), no `pull_request` | **DROP** — never produced on a PR → permanently unsatisfiable → this was the merge-blocker |

### CORRECTED required-context set (6 contexts — copy/paste exact)

```
Pre-commit gates
CodeQL javascript-typescript
CodeQL python
actionlint (GitHub Actions linter)
zizmor static-analysis
commitlint (commit-message discipline)
```

> ⚠ paths-filter caveat (CR-6 honesty): `actionlint` and `zizmor` only run when their `paths:` match (`.github/workflows/**` etc.). On a PR that touches NO matching path, the check is **never created** → with `strict`+required it can hang "Expected". GitHub treats a never-created required check as pending, blocking merge. **Two safe options**: (a) keep them required ONLY if you add `pull_request` without `paths:` filters (always-run, may emit `skipped` via internal guard — `skipped`/`neutral` satisfy the requirement per "About status checks"); OR (b) leave them OUT of *required* (they still run + report, just non-blocking) and rely on `Pre-commit gates` (the CI workflow mirrors zizmor/actionlint locally via `.pre-commit-config.yaml`). **Recommended: option (a)** — see §2 note. The 6-context set above assumes option (a). If you cannot remove the paths filters, drop `actionlint (GitHub Actions linter)` + `zizmor static-analysis` to a 4-context required set.

---

## 2. SOTA branch-protection — operator-applied JSON (legacy API, immediate fix)

This is the **minimal-blast-radius fix** using the legacy endpoint already in force. Apply via:

```bash
gh api -X PUT repos/seathatflowsinourveins/claude-sota-installed/branches/main/protection \
  --input Z:/claude-sota-installed-W375/tmp/W381-github-hardening/protection-body.json
```

`protection-body.json`:

```json
{
  "required_status_checks": {
    "strict": false,
    "checks": [
      { "context": "Pre-commit gates" },
      { "context": "CodeQL javascript-typescript" },
      { "context": "CodeQL python" },
      { "context": "actionlint (GitHub Actions linter)" },
      { "context": "zizmor static-analysis" },
      { "context": "commitlint (commit-message discipline)" }
    ]
  },
  "enforce_admins": true,
  "required_pull_request_reviews": {
    "dismiss_stale_reviews": true,
    "require_code_owner_reviews": true,
    "required_approving_review_count": 1,
    "require_last_push_approval": true
  },
  "required_signatures": true,
  "required_linear_history": true,
  "required_conversation_resolution": true,
  "allow_force_pushes": false,
  "allow_deletions": false,
  "block_creations": false,
  "lock_branch": false,
  "restrictions": null
}
```

> **`strict:false` is deliberate (SOTA)** — `strict:true` ("require branches up to date before merging") forces a re-run treadmill on every base advance and is the classic single-maintainer foot-gun. The modern replacement for up-to-date enforcement is **merge queue** (GitHub Docs "Managing a merge queue"). For a 1-maintainer repo, `strict:false` + merge-queue-optional is correct. If you enable merge queue later, set `strict:false` and let the queue test the merged result.
> **`require_last_push_approval:true`** is a hardening upgrade over the live `false` — prevents an author from approving their own final push (OpenSSF Code-Review intent). Note: `enforce_admins:true` means YOU (admin) cannot self-merge without satisfying review — for a solo repo this can deadlock; if so, set `enforce_admins:false` OR add a bypass actor via a Ruleset (§3).
> **`required_signatures:true`** is satisfied by the already-active SSH signing. Cite: GitHub Docs "About commit signature verification" + "Telling Git about your signing key" (`git config gpg.format ssh` / `user.signingkey`). Ensure the SSH **signing** key is registered at https://github.com/settings/keys with key-type **"Signing Key"** (separate from auth keys) and the email is in `allowed_signers`.

`required_status_checks` uses the modern `checks[]` array (objects with `context` [+ optional `app_id`]) rather than the deprecated flat `contexts[]` — per the REST "Update branch protection" schema. To pin the producing app and stop a rogue write-token from satisfying a check, add `"app_id": 15368` (GitHub Actions) to each entry (cite: "About status checks" — *"you can select an app … as the expected source"*).

---

## 3. RECOMMENDED MIGRATION → modern Repository Ruleset (SOTA target)

GitHub recommends **Rulesets** over legacy branch protection: layerable, bypass-actor lists, org-level inheritance, push rulesets, required-workflows, evaluation/insights, and "Active/Evaluate/Disabled" enforcement modes. Cite: GitHub Docs "About rulesets" (https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets/about-rulesets); OpenSSF Scorecard **Branch-Protection** check now accepts *"branch protection OR repository rules"* (https://github.com/ossf/scorecard/blob/main/docs/checks.md).

Create via:
```bash
gh api -X POST repos/seathatflowsinourveins/claude-sota-installed/rulesets \
  --input Z:/claude-sota-installed-W375/tmp/W381-github-hardening/ruleset-main.json
```

`ruleset-main.json`:

```json
{
  "name": "main-protection-W381",
  "target": "branch",
  "enforcement": "active",
  "bypass_actors": [
    { "actor_type": "RepositoryRole", "actor_id": 5, "bypass_mode": "pull_request" }
  ],
  "conditions": {
    "ref_name": { "include": ["~DEFAULT_BRANCH"], "exclude": [] }
  },
  "rules": [
    { "type": "deletion" },
    { "type": "non_fast_forward" },
    { "type": "required_linear_history" },
    { "type": "required_signatures" },
    { "type": "creation" },
    {
      "type": "pull_request",
      "parameters": {
        "required_approving_review_count": 1,
        "require_code_owner_review": true,
        "dismiss_stale_reviews_on_push": true,
        "require_last_push_approval": true,
        "required_review_thread_resolution": true,
        "allowed_merge_methods": ["squash", "rebase"]
      }
    },
    {
      "type": "required_status_checks",
      "parameters": {
        "strict_required_status_checks_policy": false,
        "do_not_enforce_on_create": false,
        "required_status_checks": [
          { "context": "Pre-commit gates", "integration_id": 15368 },
          { "context": "CodeQL javascript-typescript", "integration_id": 15368 },
          { "context": "CodeQL python", "integration_id": 15368 },
          { "context": "actionlint (GitHub Actions linter)", "integration_id": 15368 },
          { "context": "zizmor static-analysis", "integration_id": 15368 },
          { "context": "commitlint (commit-message discipline)", "integration_id": 15368 }
        ]
      }
    }
  ]
}
```

Notes: `integration_id: 15368` pins GitHub Actions as the check producer. `bypass_actors` admin-role (`actor_id:5` = Admin RepositoryRole) with `bypass_mode:pull_request` lets the solo maintainer merge without the self-review deadlock while still requiring a PR — the Ruleset advantage over `enforce_admins`. If you adopt the Ruleset, **delete the legacy protection** (`gh api -X DELETE .../branches/main/protection`) to avoid double-evaluation, OR keep both knowing rules are additive (most-restrictive wins). `~DEFAULT_BRANCH` auto-targets `main`.

---

## 4. Repo-settings hardening checklist (gh api commands)

All endpoints verified against GitHub REST docs (API version `2026-03-10`). `O=seathatflowsinourveins`, `R=claude-sota-installed`.

| # | Control | Command | Notes / GHAS-gating |
|---|---|---|---|
| 1 | Dependabot **alerts** | `gh api -X PUT repos/$O/$R/vulnerability-alerts` (204) | Free on all repos. Verify: `gh api repos/$O/$R/vulnerability-alerts -i` → 204=on. |
| 2 | Dependabot **security updates** (auto-PRs) | `gh api -X PUT repos/$O/$R/automated-security-fixes` (204) | Requires #1 first. Cite: REST "Enable Dependabot security updates". |
| 3 | Dependabot **grouped version-updates** | commit `.github/dependabot.yml` with `groups:` blocks (repo already has dependabot — see PRs #34 etc.) | No API; config-file driven. Add `groups: { all-actions: { patterns: ["*"] } }` per ecosystem to cut PR noise. |
| 4 | **Secret scanning** | `gh api -X PATCH repos/$O/$R -f 'security_and_analysis[secret_scanning][status]=enabled'` | **PRIVATE repo → requires GHAS** (`security_and_analysis:null` today). On a private repo without GHAS this 422s. FREE if repo made public. |
| 5 | Secret scanning **PUSH PROTECTION** | `gh api -X PATCH repos/$O/$R -f 'security_and_analysis[secret_scanning_push_protection][status]=enabled'` | Same GHAS gate as #4. This is the highest-value control (blocks secret commits at push). Cite: REST "Update a repository" → `security_and_analysis`. |
| 6 | **Private vulnerability reporting** | `gh api -X PUT repos/$O/$R/private-vulnerability-reporting` (204) | FREE on public; private repos need the security-features entitlement. Cite: REST "Enable private vulnerability reporting". |
| 7 | **Code scanning default setup** (CodeQL) | `gh api -X PUT repos/$O/$R/code-scanning/default-setup -f state=configured -f 'languages[]=javascript-typescript' -f 'languages[]=python'` | **PRIVATE → GHAS-gated**: SARIF upload to Security tab fails without GHAS (already documented in `codeql.yml` RC-25 `continue-on-error:true`). Advanced setup (the existing `codeql.yml`) is preferred here since it's already wired; do NOT enable default-setup alongside advanced (they conflict). Cite: Docs "Configuring default setup for code scanning". |
| 8 | **Actions: allowed_actions = selected** | `gh api -X PUT repos/$O/$R/actions/permissions -F enabled=true -f allowed_actions=selected` | Then restrict: `gh api -X PUT repos/$O/$R/actions/permissions/selected-actions -F github_owned_allowed=true -F verified_allowed=false -f 'patterns_allowed[]=step-security/harden-runner@*'` (extend patterns to each pinned 3rd-party action). Cite: Docs "Security hardening for GitHub Actions". |
| 9 | **Actions: default GITHUB_TOKEN read-only** | `gh api -X PUT repos/$O/$R/actions/permissions/workflow -f default_workflow_permissions=read -F can_approve_pull_request_reviews=false` | Workflows already set explicit `permissions:` blocks (verified in ci.yml/codeql.yml); this enforces least-privilege as the baseline. Cite: Docs "Automatic token authentication > permissions". |
| 10 | **SHA-pin enforcement** | No single API — enforced by the existing `zizmor` workflow-security-audit + `actionlint` + Dependabot `github_actions` ecosystem. Repo already SHA-pins (e.g. `actions/checkout@34e1148…`, `harden-runner@ab7a940…` per W347 P4b). Keep zizmor required (§1) to gate regressions. Cite: OpenSSF Scorecard **Pinned-Dependencies** + Docs "Using third-party actions". |

**Verify-all one-liner** (CR-6 post-apply probe):
```bash
gh api repos/$O/$R --jq '.security_and_analysis'; \
gh api repos/$O/$R/vulnerability-alerts -i | head -1; \
gh api repos/$O/$R/actions/permissions; \
gh api repos/$O/$R/actions/permissions/workflow; \
gh api repos/$O/$R/branches/main/protection/required_status_checks --jq '.checks[].context'
```

> **GHAS reality (CR-6)**: this is a **private** repo with `security_and_analysis:null`. Controls #4, #5, #7-upload require **GitHub Advanced Security** (paid for private repos) OR making the repo **public** (all free, and would also let OpenSSF Scorecard publish a badge + let CodeQL SARIF upload succeed). Items #1,#2,#3,#6,#8,#9,#10 work today regardless. Recommend the operator decide public-vs-GHAS; flag as the one open decision.

---

## 5. CR-6 cite-anchor (verify-before-claim)

- GitHub Docs: "About protected branches", "About status checks", "About rulesets", "Managing a merge queue", "About commit signature verification", "Security hardening for GitHub Actions", "Configuring default setup for code scanning", REST "Update a repository" / "Enable Dependabot security updates" / "Enable private vulnerability reporting" (API version 2026-03-10).
- OpenSSF Scorecard `docs/checks.md`: **Branch-Protection** (accepts branch-protection OR repository rules), **Code-Review**, **Token-Permissions**, **Pinned-Dependencies** (https://github.com/ossf/scorecard/blob/main/docs/checks.md).
- Live probes 2026-05-23: `gh api .../branches/main/protection` (contexts=[]), `gh api .../rulesets` ([]), `gh api repos/... .security_and_analysis` (null), `gh run list --event pull_request` (job-name ground truth), `.github/workflows/*.yml` `name:` grep (no duplicate job names).
- Terraform `github_branch_protection_v3` provider docs (encodes GitHub context-matching semantics).
