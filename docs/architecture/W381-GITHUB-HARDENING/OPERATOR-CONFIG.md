# W381 — Operator-Applied GitHub Config (admin-only; the gh PAT lacks these scopes)

> These require repo-admin (the PAT couldn't `--admin`-merge or read checks). Run from your admin-authed
> `gh` session, or via the GitHub UI. Repo: `seathatflowsinourveins/claude-sota-installed`. Full rationale +
> the modern Ruleset alternative: `STREAM-B-branch-protection.md` (this dir). Cite-anchored to GitHub docs + OpenSSF.

```bash
REPO=seathatflowsinourveins/claude-sota-installed
OWNER=seathatflowsinourveins
```

## 🔴🔴 BLOCKER #1 — GitHub Actions fails at startup (OUT OF MINUTES) — gates ALL CI
**This is why every check on every PR is red, and why PR #33 showed "8 failing checks."** W381 Stream-D
diagnosed it on PR #35 (2026-05-23): every CI job fails in exactly **2 seconds**; the downloaded run-log shows
`Job is about to start running on the hosted runner` then **zero step output** (the job dies before `Set up
job`); the log zip is 491 bytes. This is uniform across **all 13 workflows** — including ones W381 never touched
(Broken Link Check, Claude Model Check, parallel-ratio-gate). `actionlint` **succeeded at 15:32**, then
everything startup-fails from ~15:33 — right after Dependabot security-updates were enabled, which opened a
burst of Dependabot PRs (each ~15 workflows) that exhausted the **private-repo GitHub Actions minute allotment**.
The PAT gets HTTP 403 on the billing API, so only you can fix it.

**No PR can pass CI — and `main` cannot merge through its (correctly) required checks — until this is fixed.**
This is the single blocker holding PR #35 (W381) and the W380 scorer PR. The W381 changes are all locally
verified (gitleaks 0-real, actionlint pass, zizmor 0-high, commitlint pass, ruff green, commit signed `sig=G`)
and codex-APPROVED — they need only CI capacity to go green and merge normally.

Resolution (pick one):
1. **Make the repo public** (recommended for a SOTA showcase) — public repos get **unlimited free Actions** AND
   free GitHub Advanced Security (unblocks CodeQL SARIF upload, secret-scanning push-protection,
   dependency-review, which now run advisory). W381 Stream A verified **zero real secrets** in tracked source, so
   this is content-safe. `Settings → General → Danger Zone → Change visibility`.
2. **Raise the Actions spending limit / add a payment method**: `Settings → Billing → Plans and usage` → set an
   Actions spending limit > $0. Verify: `gh api users/$OWNER/settings/billing/actions`.
3. **Wait for the monthly minute reset** (slowest; resets on your billing-cycle date).

After resolving, re-run CI on the open PRs (`gh run rerun --failed <run-id>` or push an empty commit); the W381
and W380 PRs then go green and merge cleanly through the required checks. Optionally reduce burn by closing the
noisy Dependabot PRs first (`gh pr list --author app/dependabot`).

## ✅ DONE this session — `main` required-status-checks RESTORED (kept for reference / re-apply)
W381 Stream B found `required_status_checks.contexts = []` (your "uncheck Require status checks" during the PR
#33 merge had cleared it). **I restored it this session via the gh PAT** (administration:write works) with the
**corrected** contexts below. Re-run only if it gets cleared again. Authoritative rule: branch protection
matches the **job `name:`**, not the `workflow / job` label.

```bash
gh api -X PATCH repos/$REPO/branches/main/protection/required_status_checks \
  -F strict=true \
  -f 'contexts[]=Pre-commit gates' \
  -f 'contexts[]=CodeQL javascript-typescript' \
  -f 'contexts[]=CodeQL python' \
  -f 'contexts[]=actionlint (GitHub Actions linter)' \
  -f 'contexts[]=zizmor static-analysis' \
  -f 'contexts[]=commitlint (commit-message discipline)'
```
Changes vs the old broken list: `actionlint`→`actionlint (GitHub Actions linter)`, `commitlint`→`commitlint (commit-message discipline)` (the bare names were workflow names = unsatisfiable); **dropped `OSSF Scorecard`** (no `pull_request` trigger → never produced on PRs → it was the permanent merge-blocker). Verify:
```bash
gh api repos/$REPO/branches/main/protection/required_status_checks -q .contexts
```

## 🔑 SSH signing key — so commits show "Verified" (no more bypass)
The merge hit "Commits must have verified signatures" because your commits are signed (`sig=G`) but the SSH
signing key isn't registered on your GitHub account. Fix once:
1. GitHub → **Settings → SSH and GPG keys → New SSH key**.
2. **Key type = `Signing Key`** (NOT Authentication — even if the same key is already there as auth, it must be added *again* as a Signing Key).
3. Paste the **public** key: `Z:\claude-sota-installed\.ssh\<key>.pub` (the `ssh-ed25519 AAAA… [email protected]` line).
4. Ensure `[email protected]` (the commit email) is a **verified** email on the account, else commits stay Unverified.

## 🛡️ Repo security settings (gh api; GHAS-gated items noted)
Works today on a private repo:
```bash
# Dependabot security updates + alerts
gh api -X PUT repos/$REPO/automated-security-fixes
gh api -X PUT repos/$REPO/vulnerability-alerts
# Private vulnerability reporting
gh api -X PUT repos/$REPO/private-vulnerability-reporting
# Actions: restrict to selected + require SHA-pinned (UI: Settings → Actions → General)
```
**Requires GHAS (paid on private repos) OR making the repo public** — secret-scanning + **push-protection**, code-scanning SARIF upload (CodeQL/trivy → Security tab), `dependency-review`. Until then those checks correctly run as advisory (`continue-on-error`). Decision: enable GHAS, or go public, or keep advisory.

## 🔒 Full SOTA branch-protection (optional hardening beyond the urgent restore)
Already enabled (verified): `enforce_admins`, `required_signatures`, `required_linear_history`, 1 required review + code-owner, conversation-resolution, no force-push/deletion. Stream B's complete `gh api PUT …/protection` body (with `require_last_push_approval: true` + app_id pinning) and a **modern Ruleset migration** (with a bypass-actor to avoid the solo-admin self-review deadlock you hit) are in `STREAM-B-branch-protection.md`. The modern Ruleset is the SOTA path — recommend migrating when convenient.

## Note on the recurring self-merge deadlock
`required_approving_review_count=1` + `require_code_owner_reviews=true` + you being the PR author = you can't approve your own PRs (GitHub forbids it), and `enforce_admins=true` blocks `--admin` bypass. For a solo repo, the SOTA pattern is a **Ruleset with a bypass-actor** (your account as bypass) — this keeps the gate for any future contributor while letting you merge solo without disabling protection. See STREAM-B for the exact ruleset JSON.

---
Cite-anchors (sca-v13 ≥3-org-distinct, machine-scannable): https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository · https://github.com/ossf/scorecard · https://openssf.org · https://slsa.dev.
