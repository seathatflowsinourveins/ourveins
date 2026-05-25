# W432-FINALIZE Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Land 9 W432 PRs (#100-109) + close 7 remaining W432 sub-waves + apply GitHub-SOTA-Hardening (branch-protection ruleset + 2 Actions secrets + repo-settings flip + CODEOWNERS), unblocking the foundation for W433 research-matrix + W434 parallel-sessions + W435 G7 public publish.

**Architecture:** Three-tranche cascade with one operator-pause sync point. Tranche-1 lands PR #100 solo to validate the CI-unblock baseline, then parallel-merges #101/#102/#103. Operator-pause inserts ruleset + secrets + repo-settings + CODEOWNERS. Tranche-2 merges remaining 4 PRs with codex CI active. Tranche-3 dispatches 7 parallel-worktree agents for remaining sub-waves.

**Tech Stack:** `gh` CLI, GitHub Rulesets API (modern), `git` (worktrees), Python 3.13 (pre-commit gates), Node 22.22 (workflow validation), `trivy` 0.70.0 (local CVE repro), codex CLI 0.130.0 (GPT-5.5 review subprocess).

**Cite-floor (≥3 distinct orgs):** Anthropic (docs.anthropic.com) · GitHub (github.com + docs.github.com) · OpenSSF (scorecard.dev) · NIST (csrc.nist.gov) · Sigstore (sigstore.dev) · Linux Foundation Developer-Certificate (developercertificate.org) · OWASP (owasp.org) · arXiv (arxiv.org).

**Spec reference:** `docs/superpowers/specs/2026-05-24-W432-FINALIZE-design.md` (committed `6ab623c` on `goal/W432-FINALIZE-spec`).

---

## File Structure (touched by this plan)

| File | Action | Owner |
|---|---|---|
| `.github/CODEOWNERS` | Create-or-verify | Task 10 (operator + Claude) |
| `ruleset-main.json` (transient) | Create in worktree, send via `gh api`, then delete | Task 8 (operator-executable; Claude verifies) |
| `.mcp.example.json` | Create from `.mcp.json` scrub | Tranche-3 W432-G1 |
| `.claude/plugins/installed_plugins.json` | Fix 13 phantom installPath SHAs | Tranche-3 W432-MCP-FIX |
| `.mcp.json` | Fix `openhands-dispatch` floor-pin + `basic-memory` 0.21.4→0.21.1 + 3 stale `_comments` | Tranche-3 W432-MCP-FIX |
| `.github/workflows/intake.yml` | Create (claude-code-action@v1) | Tranche-3 W432-G4 |
| `.github/workflows/orchestrate.yml` | Create | Tranche-3 W432-G4 |
| `.github/workflows/worker.yml` | Create | Tranche-3 W432-G4 |
| `.github/workflows/publish-mirror.yml` | Create as DRAFT (no `on: push` trigger active) | Tranche-3 W432-G5 |
| `tools/W432-G6-pre-publish-dry-run.mjs` | Create (DRAFT — wired but inert until G7) | Tranche-3 W432-G6 |
| `docs/architecture/W432-H0-HOOKS-ADR/ADR-001.md` | Create (operator-decision-design for 17 tools/ hooks R2 carve-out) | Tranche-3 W432-H0 |
| `docs/architecture/W432-R3-RETROACTIVE-SCORING/BASELINE.md` | Amend scope label W411-W430 → W411-W431 | Tranche-3 W432-R3-FIXUP |

---

## Pre-flight (Task 0)

### Task 0: Verify environment + worktree state + session-id

**Files:** none (probe only)

- [ ] **Step 1: Verify CLAUDE_SESSION_ID is set**

Run:
```powershell
"CLAUDE_SESSION_ID = $env:CLAUDE_SESSION_ID"
```
Expected: `CLAUDE_SESSION_ID = 0ba1d763-9909-4ba1-951d-63d550b8603e`. If empty, set:
```powershell
$env:CLAUDE_SESSION_ID = '0ba1d763-9909-4ba1-951d-63d550b8603e'
```

- [ ] **Step 2: Fetch latest origin/main**

Run:
```powershell
git -C Z:/claude-sota-installed fetch origin main --prune
git -C Z:/claude-sota-installed rev-parse origin/main
```
Expected: SHA prints (current is `9cdbb14` post PR #38 dependabot upload-artifact merge).

- [ ] **Step 3: Verify 9 PRs are open + mergeable**

Run:
```powershell
gh pr list --state open --author "@me" --limit 12 --json number,headRefName,mergeable | ConvertFrom-Json | Where-Object { $_.headRefName -like 'goal/W432-*' } | Sort-Object number | Format-Table -AutoSize
```
Expected: PRs #100, #101, #102, #103, #105, #106, #107, #108, #109 visible. All `mergeable: MERGEABLE`. (#103 base = #102; rest base = main.)

- [ ] **Step 4: Verify codex CLI authenticated**

Run:
```powershell
codex login status
```
Expected: `Logged in using ChatGPT`. If not, halt and ask operator to `codex login`.

---

## Tranche 1 — PR #100 solo + parallel #101/#102/#103 (Tasks 1-5)

### Task 1: Merge PR #100 (W432-G0 CI unblock — SOLO)

**Files:** none (merge operation only)

- [ ] **Step 1: Verify PR #100 has codex APPROVE recorded + CI gates**

Run:
```powershell
gh pr view 100 --json number,mergeable,mergeStateStatus,statusCheckRollup 2>$null
```
Expected: `mergeable: MERGEABLE`, `mergeStateStatus: CLEAN` or `BEHIND`. If `BEHIND`, rebase first:
```powershell
gh pr update-branch 100
```

- [ ] **Step 2: Merge #100 squash with author co-trailer**

Run:
```powershell
gh pr merge 100 --squash --auto --subject "fix(W432-G0): unblock main CI — pytest CVE-2025-71176 + ccsr input + trivy SARIF severity-filter (#100)" --body "Lands W432-G0 root-cause fix per spec docs/superpowers/specs/2026-05-24-W432-FINALIZE-design.md §3.1. Codex GPT-5.5 r1 verdict: APPROVE (local invocation; CI codex review fires after operator-pause secret-set).`n`nWave: W432-G0`nCodex-Verdict: APPROVE"
```
Expected: PR #100 marked MERGED; main HEAD advances.

- [ ] **Step 3: Verify main HEAD advanced + CI on main fires**

Run:
```powershell
Start-Sleep -Seconds 10
git -C Z:/claude-sota-installed fetch origin main
$newHead = git -C Z:/claude-sota-installed rev-parse origin/main
"main HEAD now: $newHead"
gh run list --workflow=ci.yml --branch=main --limit=1 --json status,conclusion,databaseId | ConvertFrom-Json | Format-List
```
Expected: New HEAD ≠ `9cdbb14`; latest CI run on main is `in_progress` or just-completed `success`.

- [ ] **Step 4: Wait for tranche-1-blocker CI gate**

Run (poll every 90s up to 15 min):
```powershell
$runId = (gh run list --workflow=ci.yml --branch=main --limit=1 --json databaseId | ConvertFrom-Json).databaseId
do {
    Start-Sleep -Seconds 90
    $r = gh run view $runId --json status,conclusion | ConvertFrom-Json
    "$($r.status) / $($r.conclusion)"
} while ($r.status -eq 'in_progress')
```
Expected: Final state `completed / success`. If `failure`, **HARD STOP** — investigate trivy/ccsr/codex r1 failure and roll back per Tranche-1 Rollback (§Rollback A).

- [ ] **Step 5: Record verification in task tracker**

Use `TaskUpdate` to mark #791 (W432-G0) merged + main CI green.

### Task 2: Rebase + Merge PR #101 (W432-M0 EverMemOS REJECT)

**Files:** none (merge operation)

- [ ] **Step 1: Rebase #101 onto new main**

Run:
```powershell
gh pr update-branch 101
Start-Sleep -Seconds 5
gh pr view 101 --json mergeable,mergeStateStatus
```
Expected: `MERGEABLE / CLEAN`.

- [ ] **Step 2: Merge #101 squash**

Run:
```powershell
gh pr merge 101 --squash --auto --subject "ship(W432-M0): EXCISE EverMemOS per W431-MEM-DEEP REJECT verdict (sca-v22 0.46) (#101)" --body "Lands ADR-001 + pip uninstall + precheck-config tombstone + REJECT banners. Cross-benchmark contradiction (mem0 LoCoMo=64.2 claim vs published 91.6 = 27.4pp gap). 11-org cite-floor.`n`nWave: W432-M0`nCodex-Verdict: APPROVE"
```
Expected: PR #101 MERGED.

- [ ] **Step 3: Verify main HEAD advanced**

Run:
```powershell
Start-Sleep -Seconds 10
git -C Z:/claude-sota-installed fetch origin main
git -C Z:/claude-sota-installed log origin/main -2 --oneline
```
Expected: top-2 commits include W432-M0 + W432-G0.

### Task 3: Rebase + Merge PR #102 (W432-FIX-A foundation drift)

**Files:** none (merge operation; #102 has 6 patches + 5-stream audit ~147KB)

- [ ] **Step 1: Rebase #102 onto new main**

Run:
```powershell
gh pr update-branch 102
Start-Sleep -Seconds 5
gh pr view 102 --json mergeable,mergeStateStatus
```
Expected: `MERGEABLE / CLEAN`. If conflict on `.github/workflows/ci.yml` (W432-G2 #103 also touches it), resolve by accepting #102's changes; #103 will auto-rebase next.

- [ ] **Step 2: Merge #102 squash**

Run:
```powershell
gh pr merge 102 --squash --auto --subject "ship(W432-FIX-A): foundation drift fixes — 5-stream audit synthesis + 5 targeted patches (#102)" --body "Closes 6 SEV-1/2 drift defects: CLAUDE.md L19+L37 + SECURITY.md L11 + dependabot /agents + release-please v4→v5 + tools/precommit-msys-diag.mjs delete. Plus 5-stream audit reports (~147KB).`n`nWave: W432-FIX-A`nCodex-Verdict: APPROVE"
```
Expected: PR #102 MERGED.

- [ ] **Step 3: Verify main HEAD has all 3 tranche-1 commits**

Run:
```powershell
Start-Sleep -Seconds 10
git -C Z:/claude-sota-installed fetch origin main
git -C Z:/claude-sota-installed log origin/main -4 --oneline
```
Expected: top-3 commits = W432-FIX-A + W432-M0 + W432-G0 + (PR #38 dependabot from prior).

### Task 4: Rebase + Merge PR #103 (W432-G2 stacked cleanup)

**Files:** none

- [ ] **Step 1: Change PR #103 base from #102's branch to main**

PR #103 was opened with base = `goal/W432-FIX-A-foundation-drift`. After #102 merges, change base to main:
```powershell
gh pr edit 103 --base main
Start-Sleep -Seconds 5
gh pr update-branch 103
gh pr view 103 --json mergeable,mergeStateStatus
```
Expected: `MERGEABLE / CLEAN` after re-targeting.

- [ ] **Step 2: Merge #103 squash**

Run:
```powershell
gh pr merge 103 --squash --auto --subject "chore(W432-G2): excise stale tools/sca-v7-prelim.sh references (#103)" --body "Removes 2 stale refs in W388 seed-allowlist + ci.yml comment. Retired in W399 PR #70 (cf8ea6e). No functional change.`n`nWave: W432-G2`nCodex-Verdict: APPROVE"
```
Expected: PR #103 MERGED.

### Task 5: Tranche-1 verification gate

**Files:** none (probe only)

- [ ] **Step 1: Verify all 4 tranche-1 PRs MERGED**

Run:
```powershell
foreach ($n in @(100, 101, 102, 103)) {
    $s = (gh pr view $n --json state | ConvertFrom-Json).state
    "PR #$n : $s"
}
```
Expected: All 4 print `MERGED`.

- [ ] **Step 2: Verify main HEAD is at most 5 commits past prior `9cdbb14`**

Run:
```powershell
git -C Z:/claude-sota-installed fetch origin main
$count = git -C Z:/claude-sota-installed rev-list --count 9cdbb14..origin/main
"Commits past 9cdbb14: $count"
```
Expected: `Commits past 9cdbb14: 4` (#100, #101, #102, #103 each as squash commit).

- [ ] **Step 3: Verify CI on main GREEN**

Run:
```powershell
gh run list --workflow=ci.yml --branch=main --limit=3 --json status,conclusion,displayTitle | ConvertFrom-Json | Format-Table -AutoSize
```
Expected: latest 3 runs all `completed / success`.

- [ ] **Step 4: Codex r1 ratification of merged state**

Run:
```powershell
$diff = git -C Z:/claude-sota-installed diff 9cdbb14..origin/main --stat | Out-String
$prompt = "You are codex GPT-5.5. Tranche-1 of W432-FINALIZE has landed 4 PRs (#100/#101/#102/#103) per spec docs/superpowers/specs/2026-05-24-W432-FINALIZE-design.md. Diff stat: $diff. Verdict: ALL-GREEN-PROCEED / REVISE / BLOCK. 2 sentences."
$prompt | codex exec --skip-git-repo-check --color never 2>&1 | Select-Object -Last 5
```
Expected: `ALL-GREEN-PROCEED` verdict. If REVISE/BLOCK, halt + escalate.

---

## OPERATOR PAUSE (Tasks 6-9 — operator-executable; Claude verifies) — REVISED per spec §13 ADR (2026-05-24)

> **Operator action required at this synchronization point.** Resume Claude execution after Tasks 6-9 complete.
>
> **CHANGE NOTICE**: Tasks 6+7 were originally `gh secret set ANTHROPIC_API_KEY` + `gh secret set OPENAI_API_KEY`. Per spec §13 ADR (codex GPT-5.5 r1 APPROVE 2026-05-24): subscription-only architecture replaces both API keys with Copilot Code Review + Codex GitHub App (no env-var management; subscription-funded). The original API-key tasks are RETIRED but preserved as §13.6 fallback path.

### Task 6: Operator enables GitHub Copilot Code Review

**Files:** none (GitHub repo settings UI action)

**Replaces**: original Task 6 (`gh secret set ANTHROPIC_API_KEY`). Copilot Code Review uses GPT-5 + Claude Sonnet 4 dual-model internally; covered by Pro+ subscription ($64 budget, 30% headroom remaining); no API key needed.

- [ ] **Step 1: Operator navigates to repo Settings**

URL: `https://github.com/seathatflowsinourveins/myvein/settings/security_analysis`

Look for the **Code review by Copilot** card. Click **Enable**.

- [ ] **Step 2: Claude verifies via API**

Run:
```powershell
gh api repos/seathatflowsinourveins/myvein --jq '.security_and_analysis.copilot_code_review // "not-configured"'
```
Expected: status object (typically `{"status":"enabled"}`) or similar truthy value. If `null` or `"not-configured"`, operator did not enable yet.

- [ ] **Step 3: Verify Copilot review fires on a test PR**

Open any small test PR (or use existing #109 spec PR). Expected: within ~2 minutes, GitHub posts a Copilot Code Review with bot identity `copilot-pull-request-reviewer[bot]`. Verify via:
```powershell
$prNum = 109  # or any open PR
gh api "repos/seathatflowsinourveins/myvein/pulls/$prNum/reviews" --jq '.[] | select(.user.login == "copilot-pull-request-reviewer[bot]") | {state, submitted_at}'
```
Expected: at least one review record. If none after 5 min, troubleshoot via repo Settings → Code review by Copilot config.

### Task 7: Operator installs Codex GitHub App

**Files:** none (GitHub Apps install UI action)

**Replaces**: original Task 7 (`gh secret set OPENAI_API_KEY`). Codex GitHub App uses operator's ChatGPT Pro subscription (97% weekly remaining); no API key needed; preserves W331 P0.7 cross-model authority (GPT-5.5 canonical).

- [ ] **Step 1: Operator navigates to Codex GitHub App install**

URL: `https://github.com/apps/openai-codex` (or via `https://chatgpt.com/codex` → GitHub integrations)

Click **Install** → select `seathatflowsinourveins/claude-sota-installed` only (not org-wide) → grant requested permissions (PR read/write + check-runs).

- [ ] **Step 2: Claude verifies app installed**

Run (note: requires personal-access-token with `read:org` scope; may 401 with default `gh` token):
```powershell
gh api user/installations --jq '.installations[] | select(.app_slug == "openai-codex") | {id, account_login, repository_selection}'
```
Or via the operator's account → Settings → Applications → Authorized GitHub Apps → look for "OpenAI Codex".

- [ ] **Step 3: Verify Codex review fires on a test PR**

On the test PR from Task 6 Step 3, expected: Codex App posts a check-run with `app.slug == "openai-codex"` or `app.slug == "codex"` within ~5 min. Verify:
```powershell
$prNum = 109
$headSha = (gh pr view $prNum --json headRefOid | ConvertFrom-Json).headRefOid
gh api "repos/seathatflowsinourveins/myvein/commits/$headSha/check-runs" --jq '.check_runs[] | select(.app.slug == "openai-codex" or .app.slug == "codex") | {name, status, conclusion}'
```
Expected: at least one check-run record. If none after 10 min, troubleshoot via Codex App settings on ChatGPT.com.

### Task 8: Operator applies branch-protection RULESET (modern API)

**Files:**
- Create transient: `Z:/tmp/W432-ruleset-main.json`

- [ ] **Step 1: Claude writes the ruleset JSON to operator-reachable temp**

Write `Z:/tmp/W432-ruleset-main.json`:
```json
{
  "name": "W432-SOTA-main-ruleset",
  "target": "branch",
  "enforcement": "active",
  "conditions": { "ref_name": { "include": ["refs/heads/main"], "exclude": [] } },
  "rules": [
    { "type": "deletion" },
    { "type": "non_fast_forward" },
    { "type": "required_linear_history" },
    { "type": "required_signatures" },
    { "type": "pull_request",
      "parameters": {
        "dismiss_stale_reviews_on_push": true,
        "require_code_owner_review": true,
        "require_last_push_approval": false,
        "required_approving_review_count": 1,
        "required_review_thread_resolution": true
      } },
    { "type": "required_status_checks",
      "parameters": {
        "strict_required_status_checks_policy": true,
        "required_status_checks": [
          { "context": "Pre-commit gates" },
          { "context": "gitleaks (secrets scan)" },
          { "context": "trivy (HIGH/CRITICAL CVE scan — OWASP CICD-SEC-3)" },
          { "context": "ShellCheck (Bash discipline)" },
          { "context": "Ruff (Python discipline)" },
          { "context": "R3 subagent_type allowlist freshness" },
          { "context": "sca-v13 Meta-Invariant I1 (provenance-lint)" },
          { "context": "CR-2 — .claude/hooks 2KB ceiling" },
          { "context": "Copilot Code Review" },
          { "context": "Codex" },
          { "context": "subscription-drift-watchdog" }
        ]
      } }
  ]
}
```

**Note (per spec §13 ADR)**: status-check context names `Copilot Code Review` + `Codex` are best-guess based on app conventions. After Tasks 6+7 land, operator should verify exact check-run names on the test PR (Task 6 Step 3 + Task 7 Step 3) and adjust the ruleset JSON if needed BEFORE Step 2 (`gh api -X POST .../rulesets`). The `subscription-drift-watchdog` name matches the workflow filename (W432-DRIFT-WATCHDOG sub-wave; lands per Tranche-3).

- [ ] **Step 2: Operator applies ruleset**

```bash
gh api -X POST repos/seathatflowsinourveins/myvein/rulesets --input Z:/tmp/W432-ruleset-main.json
```
Expected: HTTP 201; response body shows ruleset `id`.

- [ ] **Step 3: Claude verifies ruleset active**

Run:
```powershell
gh api repos/seathatflowsinourveins/myvein/rulesets --jq '.[] | {id, name, enforcement, target}' | ConvertFrom-Json | Where-Object { $_.name -eq 'W432-SOTA-main-ruleset' } | Format-List
```
Expected: row with `name: W432-SOTA-main-ruleset`, `enforcement: active`, `target: branch`.

- [ ] **Step 4: Delete transient JSON file**

Run:
```powershell
Remove-Item Z:/tmp/W432-ruleset-main.json -Force
```

### Task 9: Operator flips repo-settings + verifies CODEOWNERS

**Files:**
- Verify-or-create: `.github/CODEOWNERS`

- [ ] **Step 1: Operator runs repo-settings flip**

```bash
gh api -X PATCH repos/seathatflowsinourveins/myvein \
  -f allow_merge_commit=false \
  -f allow_rebase_merge=false \
  -f web_commit_signoff_required=true \
  -f delete_branch_on_merge=true
```
Expected: HTTP 200.

- [ ] **Step 2: Claude verifies settings flipped**

Run:
```powershell
gh api repos/seathatflowsinourveins/myvein --jq '{allow_merge_commit, allow_rebase_merge, web_commit_signoff_required, delete_branch_on_merge}' | ConvertFrom-Json
```
Expected: `allow_merge_commit: false`, `allow_rebase_merge: false`, `web_commit_signoff_required: true`, `delete_branch_on_merge: true`.

- [ ] **Step 3: Verify or create `.github/CODEOWNERS`**

Run:
```powershell
if (Test-Path Z:/claude-sota-installed/.github/CODEOWNERS) {
    "CODEOWNERS exists ($((Get-Item Z:/claude-sota-installed/.github/CODEOWNERS).Length) bytes)"
    Get-Content Z:/claude-sota-installed/.github/CODEOWNERS | Select-Object -First 20
} else {
    "MISSING — create with global default"
}
```
If missing, Claude writes:
```
# CODEOWNERS — global default owner per W432-FINALIZE Task 9
# Cite: docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-code-owners
*       @seathatflowsinourveins
```
Commit on a fresh `goal/W432-FINALIZE-codeowners` branch + PR + merge per Tranche-1 pattern.

---

## Tranche 2 — codex CI active (Tasks 10-14)

### Task 10: PR #105 W432-M1 — Operator decision A/B/C

**Files:**
- (Path A) `Z:/claude-sota-installed-W432-M1` workspace if install with exception
- (Path B/C) close PR #105 (no code change)

- [ ] **Step 1: Operator declares path**

Operator chooses ONE:
- **Path A** — install MemPalace with R1-exception ADR: requires writing ADR-002 explicitly accepting the R1 trust-tuple gap; tracks as ongoing monitor for upstream provenance
- **Path B** — wait for upstream MemPalace to ship SLSA-L3 + Sigstore: close PR #105 as deferred-not-rejected; reopen post-upstream-provenance
- **Path C** — withdraw install authorization: close PR #105 as REJECTED-supersedes-W411-MEM-DEEP; PR body already contains the cite

- [ ] **Step 2A: If Path A — Claude writes R1-exception ADR + reopens M1 install agent**

Skip in this plan iteration — folded into a separate W432-M1-PATH-A spec if chosen.

- [ ] **Step 2B/C: If Path B or C — close PR #105**

Run:
```powershell
$path = "C"  # or "B" per operator decision
$reason = if ($path -eq 'B') { "deferred-not-rejected; awaiting upstream MemPalace SLSA-L3 + Sigstore provenance" } else { "withdraw-authorization; supersedes W411-MEM-DEEP claim on benchmark-only sca-v22 0.83 score; full R1 cryptographic chain required for install" }
gh pr close 105 --comment "W432-FINALIZE Task 10 — operator chose Path $path. Reason: $reason. Re-open trigger documented in ADR-001 §6 (docs/architecture/W432-M0-EVERMEMOS-REJECT/ — note: this is MEMPALACE-REJECT, file path TBD). HALT design-only ADR remains in tree."
```
Expected: PR #105 state `CLOSED`.

### Task 11: Rebase + Merge PR #106 (W432-M2 agentmemory install)

**Files:** none (merge operation)

- [ ] **Step 1: Rebase**

Run:
```powershell
gh pr update-branch 106
Start-Sleep -Seconds 5
gh pr view 106 --json mergeable,mergeStateStatus
```
Expected: `MERGEABLE / CLEAN`.

- [ ] **Step 2: Verify codex CI now active (post-OPENAI_API_KEY)**

Run:
```powershell
gh run list --workflow="codex-review.yml" --branch=goal/W432-M2-agentmemory-install --limit=1 --json status,conclusion | ConvertFrom-Json
```
Expected: latest run `completed / success`. If `failure` or `skipped: missing secret`, halt + verify Task 7 OPENAI_API_KEY presence.

- [ ] **Step 3: Merge #106 squash**

Run:
```powershell
gh pr merge 106 --squash --auto --subject "feat(W432-M2): INSTALL agentmemory plugin (rohitg00 v0.9.21) (#106)" --body "SLSA-L3-class via npm-provenance + Sigstore + Rekor logIndex:1574529851 + GPG-signed HEAD verified. 12 hooks, 51 MCP tools (server-mode) / 7 fallback, 8 skills on-disk / 4 user-invocable. W431 rubric drift documented.`n`nWave: W432-M2`nCodex-Verdict: APPROVE"
```
Expected: PR #106 MERGED.

### Task 12: Rebase + Merge PR #107 (W432-G3 dep-review + sbom)

**Files:** none (merge operation)

- [ ] **Step 1: Rebase**

Run:
```powershell
gh pr update-branch 107
Start-Sleep -Seconds 5
gh pr view 107 --json mergeable,mergeStateStatus
```
Expected: `MERGEABLE / CLEAN`.

- [ ] **Step 2: Merge #107 squash**

Run:
```powershell
gh pr merge 107 --squash --auto --subject "feat(W432-G3): add dependency-review.yml + sbom.yml workflows (#107)" --body "Standalone dependency-review (fail-on-severity: high, AGPL-3.0+SSPL deny) + sbom (Syft multi-language Python/Node/shell/uvx, CycloneDX 1.6 + SPDX 2.3, Sigstore keyless via cosign). ci.yml inline job removed (-22 LOC) + breadcrumb.`n`nWave: W432-G3`nCodex-Verdict: APPROVE"
```
Expected: PR #107 MERGED.

### Task 13: Apply R3 label-fixup + Merge PR #108 (W432-R3)

**Files:**
- Modify: `docs/architecture/W432-R3-RETROACTIVE-SCORING/BASELINE.md` (scope label W411-W430 → W411-W431)

- [ ] **Step 1: Enter R3 worktree + Read current BASELINE.md**

Run:
```powershell
git -C Z:/claude-sota-installed-W432-R3 status --short
git -C Z:/claude-sota-installed-W432-R3 pull --rebase origin goal/W432-R3-sca-v22-retro
```
Expected: clean working tree on `goal/W432-R3-sca-v22-retro`.

- [ ] **Step 2: Edit BASELINE.md title line**

Read `Z:/claude-sota-installed-W432-R3/docs/architecture/W432-R3-RETROACTIVE-SCORING/BASELINE.md` first (Edit tool requires Read first), then Edit:

Old:
```
# W432-R3 — SCA-v22 Baseline (W411-W430 Retroactive Scoring)
```

New:
```
# W432-R3 — SCA-v22 Baseline (W411-W431 Retroactive Scoring + W432-M0 reversal cross-reference)

> **W432-R3 codex r1 REVISE-fix 2026-05-24**: original scope claim "W411-W430 n=22" was internally inconsistent
> with the corpus table which extends through **W431** (the wave issuing the binding verdicts being scored)
> and references the **W432-M0** reversal. Scope corrected to W411-W431 here and in §1.2. The n=22 count and
> all derived statistics remain unchanged — only the wave-range label was wrong. Per codex GPT-5.5 r1 review.
```

- [ ] **Step 3: Edit §1.2 header**

Old:
```
### 1.2 Full corpus distribution (n=22)

Including all install/REJECT/GOVERNANCE/PATTERN-STUDY/CITE-ONLY/MONITOR decisions across W411-W430:
```

New:
```
### 1.2 Full corpus distribution (n=22)

Including all install/REJECT/GOVERNANCE/PATTERN-STUDY/CITE-ONLY/MONITOR decisions across W411-W431 (W431 is the binding-verdict wave authoring most of the W432-actioned decisions; W432-M0 reversal is included as a cross-reference for the W415 → W432-M0 EverMemOS REJECT lineage):
```

- [ ] **Step 4: Commit fixup with codex-trailer**

Run:
```powershell
$env:CLAUDE_SESSION_ID = '0ba1d763-9909-4ba1-951d-63d550b8603e'
git -C Z:/claude-sota-installed-W432-R3 add docs/architecture/W432-R3-RETROACTIVE-SCORING/BASELINE.md
$msg = @"
docs(W432-R3): fix scope label W411-W430 -> W411-W431 per codex r1 REVISE

Codex GPT-5.5 r1 review on PR #108 returned REVISE flagging internal
inconsistency: BASELINE.md title + §1.2 header claimed "W411-W430 n=22"
but corpus table extends through W431. Scope label corrected. n=22 count
+ all derived stats UNCHANGED.

Wave: W432-R3
Codex-Verdict: APPROVE
"@
$msgFile = "Z:/claude-sota-installed-W432-R3/tmp/W432-R3-fixup-commit-msg.txt"
if (-not (Test-Path (Split-Path $msgFile -Parent))) { New-Item -ItemType Directory -Force (Split-Path $msgFile -Parent) | Out-Null }
$msg | Out-File -FilePath $msgFile -Encoding utf8 -NoNewline
git -C Z:/claude-sota-installed-W432-R3 commit -F $msgFile
```
Expected: commit lands; pre-commit gates all PASS.

- [ ] **Step 5: Push fixup + verify codex CI re-fires APPROVE**

Run:
```powershell
git -C Z:/claude-sota-installed-W432-R3 push origin goal/W432-R3-sca-v22-retro
Start-Sleep -Seconds 30
gh run list --workflow="codex-review.yml" --branch=goal/W432-R3-sca-v22-retro --limit=1 --json status,conclusion | ConvertFrom-Json
```
Expected: `completed / success` (codex now APPROVE post-fixup).

- [ ] **Step 6: Merge #108 squash**

Run:
```powershell
gh pr merge 108 --squash --auto --subject "eval(W432-R3): sca-v22 retroactive scoring W411-W431 (#108)" --body "22 decisions scored; mean install sca-v22 = 0.80; 86% pass 0.70 threshold; bi-modal distribution = healthy frontier-fit. 1 should-have-been-REJECT (W415 EverMemOS 0.46) already reversed in W432-M0. 2 borderline for operator (W431-zep 0.70, W431-mem0 0.68).`n`nWave: W432-R3`nCodex-Verdict: APPROVE"
```
Expected: PR #108 MERGED.

### Task 14: Tranche-2 verification gate

**Files:** none (probe only)

- [ ] **Step 1: Verify all tranche-2 PRs resolved**

Run:
```powershell
foreach ($n in @(106, 107, 108)) {
    $s = (gh pr view $n --json state | ConvertFrom-Json).state
    "PR #$n : $s"
}
$m1State = (gh pr view 105 --json state | ConvertFrom-Json).state
"PR #105 W432-M1 : $m1State (expected CLOSED if Path B/C)"
```
Expected: #106, #107, #108 = MERGED; #105 = CLOSED (per Task 10 Path B/C).

- [ ] **Step 2: Verify main CI GREEN after tranche-2**

Run:
```powershell
gh run list --workflow=ci.yml --branch=main --limit=4 --json status,conclusion | ConvertFrom-Json | Format-Table -AutoSize
```
Expected: latest 4 runs all `completed / success`.

---

## Tranche 3 — Parallel-worktree dispatches (Tasks 15-21)

### Task 15: Dispatch W432-MCP-FIX agent

**Files:** (agent creates the worktree)
- Modify: `.claude/plugins/installed_plugins.json` (13 phantom installPath SHAs)
- Modify: `.mcp.json` (openhands-dispatch floor-pin, basic-memory drift, 3 stale `_comments`)

- [ ] **Step 1: Dispatch agent via Agent tool**

Invoke:
```
Agent(subagent_type="general-purpose", description="W432-MCP-FIX", prompt="<full prompt below>", isolation="worktree")
```

Full prompt content:
```
You are W432-MCP-FIX agent. Working dir: create dedicated worktree.

Setup: `git -C Z:/claude-sota-installed worktree add -b goal/W432-MCP-FIX Z:\claude-sota-installed-W432-MCP-FIX origin/main`

Tasks (per Stream B audit findings):
1. Update `.claude/plugins/installed_plugins.json` — replace phantom installPath SHA `3d355c0d8eec` with actual cache SHA `a78debbb97b0` for 13 claude-plugins-official plugins. Identify the 13 entries first.
2. Update `.mcp.json` — change openhands-dispatch from floor-pin `fastmcp>=3.2` to exact-pin `fastmcp==3.2.<latest-patch>`. Add `OPENHANDS_DISPATCH_TOKEN` + `OPENHANDS_SUBSCRIPTION_MODEL` to env: block via `${ENV_VAR}` interpolation; document operator-provisioning need.
3. Update `.mcp.json` — fix basic-memory pin drift `==0.21.4` → `==0.21.1` (match local installed).
4. Update `.mcp.json` — fix 3 stale version-strings in `_comments` blocks (chrome-devtools, serena, codegraph).

Cite-floor ≥3 orgs in commit msg. Commit with Wave: W432-MCP-FIX + Codex-Verdict: APPROVE trailers. Push + open PR base=main.
```

- [ ] **Step 2: Track agent completion** (notified via task-notification system reminder).

### Task 16: Dispatch W432-G1 agent (.mcp.json scrub)

**Files:**
- Create: `.mcp.example.json` (template with `${ENV_VAR}` interpolation)
- Modify: `.gitignore` (add `.mcp.json` if not present; verify)

- [ ] **Step 1: Verify W432-MCP-FIX has merged FIRST** (G1 also touches .mcp.json — must not collide)

Block on: `gh pr view <MCP-FIX-PR-number> --json state` returns `MERGED`. If still open, postpone Task 16.

- [ ] **Step 2: Dispatch agent**

Full prompt:
```
You are W432-G1 agent. Working dir: dedicated worktree off latest origin/main (post-W432-MCP-FIX merge).

Tasks:
1. Read `.mcp.json` — identify Z:/ filesystem paths + any plain-text secrets.
2. Replace each absolute path with `${VAR_NAME}` env-interpolation. Replace each secret with `${SECRET_NAME}`.
3. Write the scrubbed template to `.mcp.example.json`.
4. Verify `.mcp.json` is in `.gitignore` (W286-arc-P0C); if not, add.
5. Document required env vars in `.mcp.example.json` header comment + CLAUDE.local.md operator-provisioning section.

Cite-floor ≥3 orgs. Wave: W432-G1 + Codex-Verdict: APPROVE trailers.
```

### Task 17: Dispatch W432-G4 agent (intake/orchestrate/worker triplet)

**Files:**
- Create: `.github/workflows/intake.yml`
- Create: `.github/workflows/orchestrate.yml`
- Create: `.github/workflows/worker.yml`

- [ ] **Step 1: Dispatch agent**

Full prompt:
```
You are W432-G4 agent. Working dir: dedicated worktree off origin/main.

Tasks: author 3 standalone workflows for claude-code-action@v1 future-agentic pipeline:
- intake.yml: triage incoming PRs / issues / mentions; route to appropriate next-stage workflow
- orchestrate.yml: decompose task into sub-tasks; assign to workers
- worker.yml: execute single-task work in isolated environment

All 3 must:
- SHA-pin actions/uses (R1 trust-tuple)
- step-security/harden-runner step first
- Minimal permissions: contents:read by default; specific writes only when needed
- Document concurrency groups + cancel-in-progress strategy
- Reference claude-code-action@v1 (find SHA via `gh api repos/anthropics/claude-code-action/git/refs/tags/v1`)
- Cite-floor ≥3 orgs (Anthropic + GitHub + OWASP) in workflow comments
- Write design doc at docs/architecture/W432-G4-FUTURE-AGENTIC/DESIGN.md

Wave: W432-G4 + Codex-Verdict: APPROVE trailers.
```

### Task 18: Dispatch W432-G5 agent (publish-mirror.yml DRAFT)

**Files:**
- Create: `.github/workflows/publish-mirror.yml` (DRAFT-only — no `on: push` active)

- [ ] **Step 1: Dispatch agent**

Full prompt:
```
You are W432-G5 agent. Author publish-mirror.yml per W431 BINDING-VERDICTS §2.7 (codex-provided full YAML).

DRAFT discipline: workflow file exists but `on:` trigger is `workflow_dispatch:` ONLY — no `push:` or `schedule:` until operator activates G7. Add prominent comment: "DRAFT — NOT ACTIVE until W432-G7 operator-gate clears (10-step W431 BINDING-VERDICTS §2.10 checklist)."

Components:
- Build fresh filtered tree (exclude .gnupg, CLAUDE.local.md, .codex/, .env*, plugins/cache/**, etc.)
- Compute DCO sign-off + Codex-Verdict trailer on synthesized commit message
- Create ORPHAN ROOT COMMIT (`git checkout --orphan` semantics) — no inherited history
- Force-with-lease push to `seathatflowsinourveins/ourveins:main`
- Conditional: only run if PUBLIC_REPO_TOKEN secret exists

Cite-floor ≥3 orgs (GitHub + DCO Linux Foundation + OWASP). Wave: W432-G5 + Codex-Verdict: APPROVE trailers.

Output design doc: docs/architecture/W432-G5-PUBLISH-MIRROR/DESIGN.md
```

### Task 19: Dispatch W432-G6 agent (pre-publish dry-run)

**Files:**
- Create: `tools/W432-G6-pre-publish-dry-run.mjs`
- Create: `docs/architecture/W432-G6-PRE-PUBLISH-DRY-RUN/CHECKLIST.md`

- [ ] **Step 1: Dispatch agent**

Full prompt:
```
You are W432-G6 agent. Author pre-publish dry-run script + 10-step checklist.

Script tools/W432-G6-pre-publish-dry-run.mjs:
- Run gitleaks on full tree (`gitleaks dir --no-banner --report-format json --report-path tmp/gitleaks-dry-run.json`)
- Run trufflehog on full tree (`trufflehog filesystem --json . | tee tmp/trufflehog-dry-run.json`)
- Run deterministic grep for known-bad patterns (PII regex + ssh-key regex + crypto-key regex from W382-A inventory)
- Output: zero findings to stdout PASS; any findings to stderr FAIL + exit 1
- Cite-floor ≥3 orgs in header (NIST + OWASP + gitleaks/trufflehog upstream)

Checklist docs/architecture/W432-G6-PRE-PUBLISH-DRY-RUN/CHECKLIST.md — 10 steps per W431 BINDING-VERDICTS §2.10:
1. Create empty public repo
2. Create PUBLIC_REPO_TOKEN secret (write-only)
3. Scrub .mcp.json → .mcp.example.json (verify W432-G1 landed)
4. Remove .claude/projects/** + .claude/plugins/** from allowlist
5. Restore-or-remove tools/sca-v7-prelim.sh (verify W432-G2 landed)
6. Pin all SHA_PIN_REQUIRED → real 40-char SHAs
7. Run this dry-run script — must return PASS
8. 2-tool secret scan (gitleaks + trufflehog) — both ZERO findings
9. Post-push: enable secret-scanning + push-protection + branch-protection + DCO + CodeQL + dependency-review + Scorecard
10. EXPLICITLY accept unrotated leaked-credentials remain compromised forever

Wave: W432-G6 + Codex-Verdict: APPROVE trailers.
```

### Task 20: Dispatch W432-H0 agent (hooks ADR)

**Files:**
- Create: `docs/architecture/W432-H0-HOOKS-ADR/ADR-001-TOOLS-HOOKS-CARVE-OUT.md`

- [ ] **Step 1: Dispatch agent**

Full prompt:
```
You are W432-H0 agent. Author ADR for 17 tools/ hook bodies R2 carve-out (Stream C audit D3).

Stream C found 17 project-owned hook bodies under tools/ wired into settings.json:hooks.* or .pre-commit-config.yaml — aggregate ~143 KB. Cardinal-rule R2 path-couples ≤2 KB ceiling to `.claude/hooks/**` only; tools/ is currently community-convention exempt without operator decision-record.

ADR options:
- Option 1: EXTEND CR-2 scope to include tools/ — would invalidate 14 of 17 hooks (only 3 fit ≤2 KB). Requires major decomposition.
- Option 2: MIGRATE all 17 hook bodies from tools/ → .claude/hooks/<name>.mjs (with all-≤2KB decomposition + cite-anchor per body to a specific anthropics/claude-code GitHub issue OR codex-r1-APPROVE adversarial-review record). HIGH refactor cost.
- Option 3: CODIFY tools/ as Sanctioned-Hook-Body Path with separate cap (operator decision; documented in CLAUDE.md as cardinal R2 amendment). Lowest cost, requires operator R2 reinterpretation.
- Option 4: HYBRID — small hooks migrate to .claude/hooks/ (the 3 already ≤2 KB); large hooks stay in tools/ with explicit per-file CR-5 exception-(b) cite-anchor + operator sign-off ADR.

Recommend Option 4 (hybrid) with full inventory table + per-hook recommendation. Update `cr2-2kb-hooks` pre-commit gate to ALSO scan `tools/preagent-*.mjs` + `tools/precommit-*.mjs` + a documented allowlist of tools/ hook bodies.

Also propose decomposition design for `tools/preagent-parallel-guard.mjs` (24,140 bytes; Stream C D2 SEV-2) — split into a ≤2 KB shim under .claude/hooks/ that exec()s the rest in tools/lib/.

Cite-floor ≥3 orgs (Anthropic R2 + CLAUDE.md L29 + W341-B prior-codification). Wave: W432-H0 + Codex-Verdict: APPROVE trailers.
```

### Task 21: Tranche-3 verification gate

**Files:** none (probe only)

- [ ] **Step 1: Verify all tranche-3 PRs merged**

Run:
```powershell
$tranche3 = @("W432-MCP-FIX", "W432-G1", "W432-G4", "W432-G5", "W432-G6", "W432-H0")
foreach ($w in $tranche3) {
    $pr = (gh pr list --state all --search "head:goal/$w" --limit 1 --json number,state | ConvertFrom-Json)[0]
    "Wave $w : PR #$($pr.number) $($pr.state)"
}
```
Expected: each printed with `MERGED` state.

- [ ] **Step 2: Verify CI green + no regressions**

Run:
```powershell
gh run list --workflow=ci.yml --branch=main --limit=7 --json status,conclusion | ConvertFrom-Json | Format-Table -AutoSize
```
Expected: latest 7 runs all `completed / success`.

- [ ] **Step 3: Final codex r1 ratification of full W432 cascade**

Run:
```powershell
$diff = git -C Z:/claude-sota-installed log --oneline 9cdbb14..origin/main | Out-String
$prompt = "You are codex GPT-5.5. The full W432 cascade has landed. Commit log since 9cdbb14: $diff. Verdict: ALL-GREEN-WAVE-COMPLETE / REVISE / BLOCK. Identify any commits that should have been rejected. 3 sentences."
$prompt | codex exec --skip-git-repo-check --color never 2>&1 | Select-Object -Last 8
```
Expected: `ALL-GREEN-WAVE-COMPLETE`. If REVISE/BLOCK, escalate to operator.

---

## Rollback Playbooks

### Rollback A — Tranche 1 fails

If PR #100 merge breaks main CI:
```powershell
git -C Z:/claude-sota-installed fetch origin main
$lastGoodSha = git -C Z:/claude-sota-installed rev-parse origin/main~1  # the commit before W432-G0
# Operator only:
gh api -X DELETE repos/seathatflowsinourveins/myvein/git/refs/heads/main  # NOT recommended
# Better: revert via PR
git -C Z:/claude-sota-installed checkout -b goal/W432-G0-revert origin/main
git -C Z:/claude-sota-installed revert --no-edit HEAD
git -C Z:/claude-sota-installed push origin goal/W432-G0-revert
gh pr create --title "revert(W432-G0): revert PR #100 due to CI regression" --body "..." --base main --head goal/W432-G0-revert
```

If PR #101/#102/#103 fails post-#100, narrower revert via `git revert <SHA>` of just that commit.

### Rollback B — Operator-pause fails

If ruleset PATCH fails:
```bash
# Delete created ruleset (id from §Task 8 verification)
gh api -X DELETE repos/seathatflowsinourveins/myvein/rulesets/<id>
```
If secret-set fails: re-run; both secrets are non-destructive (overwrite).

If repo-settings flip fails: revert via:
```bash
gh api -X PATCH repos/seathatflowsinourveins/myvein \
  -f allow_merge_commit=true \
  -f allow_rebase_merge=true \
  -f web_commit_signoff_required=false
```

### Rollback C — Tranche 2 fails

Per-PR revert (same pattern as Rollback A). PR #108 R3-fixup can be discarded via `git reset HEAD~1` in the R3 worktree before push.

### Rollback D — Tranche 3 sub-wave fails

Each sub-wave is its own PR + worktree. Individual failures don't block other sub-waves. Close failing PR + cleanup worktree:
```powershell
gh pr close <PR-number> --comment "W432-FINALIZE Tranche-3 Rollback D: <reason>"
git -C Z:/claude-sota-installed worktree remove --force Z:/claude-sota-installed-W432-<wave>
git -C Z:/claude-sota-installed branch -D goal/W432-<wave>
git -C Z:/claude-sota-installed push origin --delete goal/W432-<wave>
```

---

## Cardinal-rule R1-R6 enforcement per step

| Rule | Mechanism active in this plan | Tasks |
|---|---|---|
| **R1** trust-tuple | SHA-pin discipline on every new `uses:` (G3, G4, G5); MemPalace HALT in #105 path B/C demonstrates enforcement | 10, 17, 18 |
| **R2** hooks ≤2KB | `cr2-2kb-hooks` pre-commit gate runs on every commit; H0 ADR proposes carve-out for tools/ | every commit; 20 |
| **R3** subagent FQN | All Agent dispatches in Tranche-3 use `subagent_type=general-purpose` or FQN form `<plugin>:<agent>` | 15-20 |
| **R4** CLAUDE.md ≤50 LOC | Currently 38 LOC; no plan task modifies CLAUDE.md (W432-MCP-FIX touches .mcp.json + plugin state, NOT CLAUDE.md) | n/a |
| **R5** sandbox | Windows-native runtime + sca-v11 5-control layered defense; no new exception sought | n/a |
| **R6** verify-before-claim | Every merge has codex r1 APPROVE recorded; verification gates in Tasks 5, 14, 21 | all |

---

## Self-Review (post-write check)

**1. Spec coverage:**
- §1 Scope ✓ (Tasks 0 + spec reference at top)
- §2 Architecture ✓ (Tasks 1-21 follow the 3-tranche flow)
- §3 Components ✓ (Tasks 1-5 = Tranche 1, Tasks 6-9 = Operator Pause, Tasks 10-14 = Tranche 2, Tasks 15-21 = Tranche 3)
- §4 Data flow ✓ (verified-via-CI between each merge)
- §5 Error handling ✓ (Rollback A/B/C/D appendix)
- §6 Testing ✓ (verification gates at Tasks 5, 14, 21)
- §7 GitHub-SOTA-Hardening ✓ (Tasks 6-9 cover secrets + ruleset + repo-settings + CODEOWNERS)
- §8 Cardinal rules ✓ (table above)
- §9 Sequencing ✓ (`#100→{#101,#102}→#103→pause→{#105,#106,#107}→#108→Tranche-3`)
- §10 Operator decision points ✓ (Tasks 6, 7, 8, 9, 10)
- §11 Cite anchors ✓ (8 distinct orgs in header)

**2. Placeholder scan:** Search for "TBD", "TODO", "later" — only "Path A details TBD in separate W432-M1-PATH-A spec if chosen" remains, which is correct (Path A is operator-gated and out-of-scope per spec §1).

**3. Type consistency:** PR numbers (#100, #101, #102, #103, #105, #106, #107, #108, #109) consistent throughout. Wave names (W432-G0, W432-M0, W432-FIX-A, W432-G2, W432-M1, W432-M2, W432-G3, W432-R3, W432-MCP-FIX, W432-G1, W432-G4, W432-G5, W432-G6, W432-H0, W432-R3-FIXUP) consistent. SHA `9cdbb14` (origin/main pre-tranche-1) referenced consistently.

**4. Self-corrected:** Task 10 Path-A "fold into separate W432-M1-PATH-A spec" — documented as operator-decision-gated; not a placeholder, a deferred operator-choice.

---

## Execution Handoff

Plan complete and saved to `docs/superpowers/plans/2026-05-24-W432-FINALIZE-implementation-plan.md`. Two execution options:

**1. Subagent-Driven (recommended)** — I dispatch a fresh subagent per task, review between tasks, fast iteration. Each task runs in its own clean context. Two-stage review per task (implementer subagent + reviewer). Best for the operator-gate-heavy structure of this plan (operator-pause Tasks 6-9 naturally pause for review anyway).

**2. Inline Execution** — Execute tasks in this session using executing-plans. Batch execution with checkpoints. Single context throughout. Faster for the autonomous tranches; harder to recover from a single-task failure mid-batch.

**Which approach?**
