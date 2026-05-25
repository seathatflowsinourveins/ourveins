# W352-RULESETS-AND-AUTOMATION — Synthesis

> **Wave**: W352 · **Date**: 2026-05-20 · **Branch**: `goal/W352-rulesets-and-automation` · **Worktree**: `Z:/claude-sota-installed-W352`
> **Predecessor**: W351-CI-HARDENING-AND-AUTOMATION (commit `eead5d9`; PR #23 → main)

## §1 Scope

Closes 3 of the W351-deferred items via repo-automation + tooling fixes:
1. **msys-hooks-form gate**: split ENFORCE vs ADVISORY scopes (CR-2 alignment — upstream-cache hooks were over-enforced, requiring bypass on every commit)
2. **GitHub repo automation**: enable `delete_branch_on_merge`, `allow_update_branch`, PR-title/PR-body for squash + merge commits
3. **Documented operator-pending items** that require Pro/public-repo (Rulesets, classic branch-protection, auto-merge, secret-scanning)

## §2 What landed

### §2.1 `tools/precommit-msys-hooks-form.mjs` — ENFORCE/ADVISORY split + dedup

**Problem**: gate previously scanned both `.claude/hooks/**` (project-owned) AND `.claude/plugins/cache/**` (upstream-vendored) with ENFORCE=1, causing every commit to require `MSYS_HOOKS_FORM_GATE_DISABLE=1` bypass when ANY upstream plugin had shell-form `${CLAUDE_PLUGIN_ROOT}` pathology (134 instances observed across active cache as of 2026-05-20). Codex r1 also flagged a dedup miss: when `CLAUDE_CODE_PLUGIN_CACHE_DIR/cache` resolves to the same path as `.claude/plugins/cache`, the original code walked the tree twice, doubling advisory counts.

**Fix**: split into 2 scan-root lists:
- `ENFORCE_ROOTS = [.claude/hooks]` — project-owned hooks (CR-2 enforcement target)
- `ADVISORY_ROOTS = [.claude/plugins/cache, $CLAUDE_CODE_PLUGIN_CACHE_DIR/cache]` — upstream-vendored (CR-2 EXEMPT per CLAUDE.md L19; cardinal-rule-2 explicitly allows upstream-plugin hooks)

**Behavior**:
- Project-owned violation → ENFORCE mode blocks (exit 2) when `MSYS_HOOKS_FORM_GATE_ENFORCE=1`
- Upstream-cache violation → ADVISORY only (always exit 0; stderr report with first 10 + count of remainder)
- Both clean → PASS

**Result**: Smoke-test 2026-05-20 returns "PASS: 0 project-owned hook violations (upstream-cache advisory above is non-blocking)" — bypass env var no longer required for ordinary commits.

### §2.2 GitHub repo automation enabled

Applied via `gh api -X PATCH repos/{owner}/{repo}`:

| Field | Before | After | Effect |
|---|---|---|---|
| `delete_branch_on_merge` | `false` | **`true`** | PR head-branches auto-delete on merge (Fork B Q3 #5 closure) |
| `allow_update_branch` | `false` | **`true`** | GitHub UI exposes "Update branch" button on stale PRs |
| `squash_merge_commit_title` | `COMMIT_OR_PR_TITLE` | **`PR_TITLE`** | Squash commits use PR title (cleaner main history) |
| `squash_merge_commit_message` | `COMMIT_MESSAGES` | **`PR_BODY`** | Squash commits use PR body (preserves context) |
| `merge_commit_title` | `MERGE_MESSAGE` | **`PR_TITLE`** | Merge commits use PR title |
| `merge_commit_message` | `PR_TITLE` | **`PR_BODY`** | Merge commits use PR body |

Verified post-PATCH via `gh api repos/{owner}/{repo} --jq` returning expected values.

## §3 Remaining items by entitlement class

Per codex r1+r2 absorption — entitlement classes corrected. **Free + applied** items moved out of "Deferred". **Free + unapplied** items remain operator-actionable. **Paywall-gated** items genuinely deferred to post-Student-Pack-Pro (72h cooldown ends ~2026-05-23).

### §3.1 Free + APPLIED this wave (no operator action needed)
| Feature | Method | Verified |
|---|---|---|
| `delete_branch_on_merge: true` | `gh api -X PATCH` with JSON body | read-back ✓ |
| `allow_update_branch: true` | same | read-back ✓ |
| `squash_merge_commit_title: PR_TITLE` + `..._message: PR_BODY` | same | read-back ✓ |
| `merge_commit_title: PR_TITLE` + `..._message: PR_BODY` | same | read-back ✓ |
| **Dependabot security updates** | `gh api -X PATCH ... --input '{"security_and_analysis":{"dependabot_security_updates":{"status":"enabled"}}}'` | read-back: `dependabot_security_updates.status: enabled` ✓ |

### §3.2 Paywall-gated — deferred to post-Student-Pack-Pro
| Feature | Requires | Empirical state |
|---|---|---|
| GitHub Rulesets API | Free-public OR Pro/Team/Enterprise on private | HTTP 403 on free-private |
| Classic branch protection | Same | HTTP 403 on free-private |
| `allow_auto_merge: true` | Same | PATCH accepted; read-back shows `false` (silent no-op) |
| Secret scanning (Secret Protection) | Free-public OR GitHub Secret Protection (Team/Enterprise+ for private) | disabled; Student Pack Pro may NOT enable for private repo — likely needs Team tier |
| Secret scanning push protection | Same as above | disabled |

**Recommended W353 (post-Student-Pack-72h)**: enable Rulesets via REST API with the following config (drafted but not applied):

```json
{
  "name": "main-protection-W353",
  "target": "branch",
  "enforcement": "active",
  "conditions": {
    "ref_name": { "include": ["refs/heads/main"], "exclude": [] }
  },
  "rules": [
    { "type": "deletion" },
    { "type": "non_fast_forward" },
    { "type": "required_linear_history" },
    { "type": "required_signatures" },
    { "type": "pull_request",
      "parameters": {
        "required_approving_review_count": 0,
        "dismiss_stale_reviews_on_push": true,
        "require_code_owner_review": false,
        "require_last_push_approval": false,
        "required_review_thread_resolution": true
      }
    },
    { "type": "required_status_checks",
      "parameters": {
        "strict_required_status_checks_policy": false,
        "required_status_checks": [
          { "context": "CodeQL javascript-typescript" },
          { "context": "CodeQL python" },
          { "context": "gitleaks (secrets scan)" },
          { "context": "trivy (HIGH/CRITICAL CVE scan — OWASP CICD-SEC-3)" },
          { "context": "commitlint (commit-message discipline)" },
          { "context": "ShellCheck (Bash discipline)" },
          { "context": "Pre-commit gates" },
          { "context": "Claude Code Security Review" },
          { "context": "Codex GPT-5.5 adversarial review" }
        ]
      }
    }
  ]
}
```

## §4 Cite-anchors (3-org-distinct)

- **GitHub Inc.** — Rulesets API spec (https://docs.github.com/en/rest/repos/rules?apiVersion=2022-11-28); auto-merge / delete-on-merge / update-branch settings (https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository)
- **MITRE** — CWE-829 Inclusion-of-Functionality-from-Untrusted-Control-Sphere v4.16 (https://cwe.mitre.org/data/definitions/829.html) — frames upstream-cache exemption as risk-acceptance via operator-managed enable/disable
- **Anthropic** — CLAUDE.md cardinal-rule-2 + hooks.json schema (https://docs.anthropic.com/en/docs/claude-code/hooks) — defines project-owned vs upstream-vendored scope split

## §5 Verdict-ledger row

```yaml
slug: w352-rulesets-and-automation
verdict: T1-INSTALL
install_score: 4.4
d_emp: 3   # repo-PATCH applied + verified via gh api read-back + msys gate smoke-tested
d_ccrt_d35: 5
rule_version: sca-v17
ship_blocker_count: 0
p0_count: 0
p1_count: 5   # Rulesets-API + classic-protection + secret-scanning + push-protection + auto-merge (all genuinely paywall-gated; W353 post-Student-Pack-Pro 72h cooldown ends 2026-05-23). Dependabot-security removed — applied this wave per §3.1.
wave: W352
date: 2026-05-20
rollback_plan: |
  - msys gate: git revert <SHA> (single-file rollback)
  - repo settings: gh api -X PATCH with original values:
    delete_branch_on_merge=false, allow_update_branch=false,
    squash_merge_commit_title=COMMIT_OR_PR_TITLE, etc.
predecessor: W351-CI-HARDENING-AND-AUTOMATION (commit eead5d9, PR #23)
permalink: main/verdicts/w352-rulesets-and-automation
```

---
End-of-synthesis.
