# Item-F — Branch Protection Audit

**Status**: AUDIT-COMPLETE — N/A on this repo + paste-ready remote-wire flow when remote is provisioned.

**Wave**: W331 Stream-GIT P0-5 item (f)
**Cite-anchor**: sca-v11 D19 ≥2-of-N review for high-risk paths.

## Current state

### Repo identity probe

```text
$ git -C Z:/claude-sota-installed remote -v
(empty — no remotes configured)

$ gh repo view
no git remotes found

$ gh auth status
github.com: Logged in to github.com account seathatflowsinourveins (GITHUB_TOKEN)
```

### Verdict

The runtime workspace is a **local-only git repo** with NO GitHub remote wired. As a result:

- **Branch protection N/A** — there is no `repo/branches/main/protection` endpoint to query.
- **Force-push policy N/A** — no remote means no forced-push exposure to peers.
- **Required-reviews N/A** — no PR surface.
- **Signed-commit enforcement** — local-only; the W331-axis-1 CR-1 trust-tuple extension at the LOCAL layer is the relevant control (commit signing via gpg/ssh-sigstore, NOT GitHub branch protection).

The audit therefore answers two operator-actionable questions:

1. **If a remote were wired**, what protection policy is recommended?
2. **What local-only controls compensate** in the meantime?

## Recommended state (when remote is wired)

Per sca-v11 D19 + OSSF Scorecard "Branch-Protection" criterion:

| Field | Recommended | Cite-anchor |
|---|---|---|
| `required_pull_request_reviews.required_approving_review_count` | `2` for high-risk paths (CLAUDE.md, `.claude/hooks/`, `tools/`) | sca-v11 D19 |
| `required_pull_request_reviews.dismiss_stale_reviews` | `true` | OSSF Scorecard Branch-Protection check |
| `required_pull_request_reviews.require_code_owner_reviews` | `true` | OSSF Scorecard |
| `enforce_admins` | `true` | NIST SSDF PO.4 |
| `required_status_checks.strict` | `true` (require branches to be up-to-date) | OSSF Scorecard |
| `required_status_checks.contexts` | `["pre-commit", "provenance-lint", "cr2-2kb-hooks"]` | local pre-commit gates |
| `required_signatures` | `true` (require signed commits) | NIST SSDF PS.2.1 |
| `allow_force_pushes` | `false` | OSSF Scorecard, W280d cite |
| `allow_deletions` | `false` | OSSF Scorecard |
| `required_linear_history` | `true` (matches W280d rebase-not-merge policy) | CLAUDE.md L23 |
| `restrictions` | `null` (no push restrictions; reviews are the gate) | n/a |

## Diff (actual vs recommended)

Currently ALL fields = N/A (no remote). Diff is "100% gap" — none of the recommended fields are enforceable until a remote is wired.

## Paste-ready commands

### Step 1 — Wire remote (operator-side, requires repo creation)

```powershell
# Create a private repo on github.com under seathatflowsinourveins (or operator's preferred org)
gh repo create seathatflowsinourveins/claude-sota-installed `
    --private `
    --source Z:/claude-sota-installed `
    --remote origin `
    --description "Z:-portable SOTA install runtime for Claude Code"

# Verify
gh repo view --json owner,name,visibility
```

### Step 2 — Apply branch protection to `goal/W331-sota-convergence` (and `main` when established)

```powershell
$owner = 'seathatflowsinourveins'
$repo  = 'claude-sota-installed'
$branch = 'goal/W331-sota-convergence'  # or 'main' once established

# Note: branch with `/` in name requires URL-encoding in gh api
$encoded = $branch -replace '/', '%2F'

gh api `
    --method PUT `
    -H "Accept: application/vnd.github+json" `
    "/repos/$owner/$repo/branches/$encoded/protection" `
    --input - <<'JSON'
{
  "required_status_checks": {
    "strict": true,
    "contexts": ["pre-commit", "provenance-lint", "cr2-2kb-hooks"]
  },
  "enforce_admins": true,
  "required_pull_request_reviews": {
    "dismissal_restrictions": {},
    "dismiss_stale_reviews": true,
    "require_code_owner_reviews": true,
    "required_approving_review_count": 2
  },
  "restrictions": null,
  "required_linear_history": true,
  "allow_force_pushes": false,
  "allow_deletions": false,
  "required_signatures": true
}
JSON
```

### Step 3 — Verify protection is applied

```powershell
gh api "/repos/$owner/$repo/branches/$encoded/protection" --jq '{
  required_reviews: .required_pull_request_reviews.required_approving_review_count,
  enforce_admins: .enforce_admins.enabled,
  force_pushes: .allow_force_pushes.enabled,
  signed_commits: .required_signatures.enabled,
  linear_history: .required_linear_history.enabled
}'
```

Expected output:
```json
{"required_reviews":2,"enforce_admins":true,"force_pushes":false,"signed_commits":true,"linear_history":true}
```

## Local-only compensating controls (current state)

Until a remote is wired, the relevant policy lives in:

- **`.pre-commit-config.yaml`** — `gitleaks-system`, `ruff-check`, `ruff-format`, `actionlint-system`, `commitlint`, `provenance-lint`, `cr2-2kb-hooks` (W331-P0.9). Each is a pre-commit blocker.
- **CLAUDE.md L19 cardinal-rule-2** — hook-body ≤2KB enforcement (now mechanized via `cr2-2kb-hooks` pre-commit hook).
- **CLAUDE.md L21 cardinal-rule-4** — operator-curated path-gated SKILL.md only.
- **Operator workflow** — manual review of all CLAUDE.md, `.claude/hooks/`, `tools/` edits before commit (no automated 2-of-N gate).

The compensating-controls posture is acceptable for LOCAL-ONLY workspaces (no peer-push exposure), but the recommendation is to wire a remote + apply the policy above if at any point the work needs to be shared/peer-reviewed.

## Rollback (revert branch-protection PATCH)

```powershell
# Delete protection entirely
gh api --method DELETE "/repos/$owner/$repo/branches/$encoded/protection"

# OR apply a minimal/relaxed protection (e.g. 1 review, no signed commits)
# (use Step 2 template with relaxed fields)
```

## Risk + reversibility

- **Risk**: NONE for current state (no remote). LOW for paste-ready commands — DELETE endpoint reverts cleanly.
- **Reversibility**: FULL — branch protection is a PATCH-able config, no migration.

## Cite anchors

- GitHub branch-protection API: `https://docs.github.com/en/rest/branches/branch-protection` — PUT/GET/DELETE semantics.
- OSSF Scorecard Branch-Protection check: `https://github.com/ossf/scorecard/blob/main/docs/checks.md#branch-protection` — Linux Foundation OpenSSF.
- NIST SSDF (Secure Software Development Framework) PO.4 + PS.2.1: `https://csrc.nist.gov/projects/ssdf` — NIST (US-gov independent).
- sca-v11 D19 ≥2-of-N review for high-risk paths.
- CLAUDE.md L23 W280d — rebase-not-merge, no `--force` pushes.
