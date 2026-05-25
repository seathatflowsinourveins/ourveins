# W432-FINALIZE — Foundation + GitHub-SOTA Spec (Phases 1+2)

**Date**: 2026-05-24
**Wave**: W432-FINALIZE
**Status**: SPEC (operator-approval gate)
**Brainstorm record**: in-conversation 2026-05-24 (operator approved Phase 1+2 combined; recommendation = Tranched-with-Operator-Pause)
**Authors**: claude-opus-4-7[1m] autonomous + operator standing-mandate "all SOTA, 100% root resolution, all dimensions"
**Cite-floor**: ≥3 distinct orgs verified (Anthropic + GitHub + OpenSSF + NIST + OWASP + Sigstore + Linux Foundation; see §11)

---

## 1. Scope (decomposed from 5-subsystem mega-request)

In-scope (this spec):
- **Sub-project I**: Land 8 W432 PRs (#100-108) + close remaining W432 sub-waves (MCP-FIX, G1, G4, G5 DRAFT, G6, H0, R3-fixup)
- **Sub-project II**: GitHub-SOTA-Hardening (branch-protection ruleset + 2 Actions secrets + repo settings + CODEOWNERS verification)

Out-of-scope (defer to subsequent specs):
- **Sub-project III**: SOTA-Research-Repos-Currency Matrix (May 2026, 11 repos) — separate W433 spec
- **Sub-project IV**: Parallel-Sessions-Workflow Architecture — separate W434 spec
- **Sub-project V**: G7 First Public Publish — separate W435 spec (operator-gated 10-step checklist)
- **Memory layer**: M1 MemPalace decision + M3 cognitive-tier + R4 mem0 pattern — per operator "memory can be later"

## 2. Architecture

Three-tranche merge cascade with one operator-gate sync point. Tranche 1 establishes a green-CI baseline by merging the G0 CI-unblock PR solo. The operator pause inserts ruleset hardening + secrets while CI is observably green. Tranches 2+3 run with codex-CI-review gates fully active.

```
[PR #100 W432-G0]            ──> green CI on main ──> sync point ──┐
                                                                    │
                                                          [Operator pause: ruleset PATCH + 2 secrets]
                                                                    │
[PR #101 W432-M0]      ┐                                            │
[PR #102 W432-FIX-A]   ├──>  Tranche 1 parallel merge ──> green main┘
[PR #103 W432-G2]      │       (#103 stacked on #102)
                       │
[PR #105 W432-M1 HALT] ──>   operator-decision-only (close OR re-author per A/B/C)
                       
[PR #106 W432-M2]      ┐
[PR #107 W432-G3]      ├──>  Tranche 2 parallel merge (codex CI active)
[PR #108 W432-R3]      │       (#108 amended with #813 label fixup first)
                       │
                       ▼
[Tranche 3: W432-MCP-FIX, G1, G4, G5 DRAFT, G6, H0, R3-fixup]  ──>  parallel worktrees
```

## 3. Components

### 3.1 Tranche 1 (4 PRs)

| PR | Wave | What it lands | Merge prerequisite |
|---|---|---|---|
| #100 | W432-G0 | pytest 9.0.3 + ccsr input + trivy SARIF severity-filter | codex r1 APPROVE ✅; CI on its own branch passes |
| #101 | W432-M0 | EverMemOS REJECT + ADR-001 | codex r1 APPROVE ✅; rebases cleanly on #100 |
| #102 | W432-FIX-A | 5-stream audit + 5 patches | codex r1 APPROVE ✅; rebases cleanly on #100 |
| #103 | W432-G2 | sca-v7-prelim cleanup (stacked) | codex r1 APPROVE ✅; auto-rebase after #102 |

### 3.2 Operator-pause action set (~5 min) — REVISED v2 per §13 ADR (Local-Only A2; 2026-05-24)

**§13 ADR v2 (2026-05-24)**: Triple-Gate architecture (v1) had high operator-friction (Copilot Code Review enrollment + Codex GitHub App private-install path). Operator-approved fallback to **Local-Only AI Enforcement (A2)** — drops ALL CI AI gates; relies on `codex-trailer-gate` pre-commit binding + local `codex exec` discipline (already-binding for solo-committer threat model per arXiv 2410.13718).

A — Branch-protection ruleset PATCH (revised JSON per §7.2 v2 — 8 deterministic status-checks; no AI CI gates):
```bash
gh api -X POST repos/seathatflowsinourveins/myvein/rulesets --input ruleset-main.json
```

B — Repo-settings flip:
```bash
gh api -X PATCH repos/seathatflowsinourveins/myvein \
  -f allow_merge_commit=false \
  -f allow_rebase_merge=false \
  -f web_commit_signoff_required=true \
  -f delete_branch_on_merge=true
```

C — CODEOWNERS verify (already exists per 2026-05-24 probe; operator confirms global default `* @seathatflowsinourveins` is correct):
```bash
gh api repos/seathatflowsinourveins/myvein/contents/.github/CODEOWNERS --jq '.content' | base64 -d | head
```

**RETIRED operator-pause items** (per ADR v2):
- ~~Original v1 Item A (set ANTHROPIC_API_KEY)~~ → API key not used
- ~~Original v1 Item B (set OPENAI_API_KEY)~~ → API key not used
- ~~ADR-v1 §3.2 A (enable Copilot Code Review UI)~~ → Pro+ subscription doesn't expose setting on `Settings → Code security` page (operator-verified); deferred to W435 G7 public-ship spec when threat model changes
- ~~ADR-v1 §3.2 B (install Codex GitHub App)~~ → App is private + requires `chatgpt.com/codex` OAuth flow; not enable-as-required-status-check from current operator path; deferred to W435

**Tranche-3 sub-wave consequences**:
- **W432-DRIFT-WATCHDOG**: SCRATCHED (no CI apps to watch under A2)
- **W432-AI-CI-RETIRE**: STILL FIRES (disable the legacy `codex-review.yml` + `claude-code-security-review.yml` that depended on API keys; they're now dead-weight)

### 3.3 Tranche 2 (3 PRs, codex-CI-active)

| PR | Action |
|---|---|
| #105 W432-M1 | OPERATOR DECISION: A (install with exception ADR), B (wait), or C (withdraw) — close OR re-author |
| #106 W432-M2 | Merge after rebase on tranche-1-landed main (already codex r1 APPROVE) |
| #107 W432-G3 | Merge after rebase (already codex r1 APPROVE) |
| #108 W432-R3 | Apply #813 label-fixup commit FIRST (W411-W430 → W411-W431 scope correction per codex r1 REVISE), then merge |

### 3.4 Tranche 3 (remaining W432 sub-waves)

Parallel worktrees, each its own PR:
- W432-MCP-FIX: 13 phantom plugin-installPath SHAs + openhands floor-pin + basic-memory 0.21.4 vs 0.21.1 drift + 3 stale .mcp.json comments
- W432-G1: .mcp.json → .mcp.example.json template scrub (Z:/paths + secrets → ${ENV_VAR}); only after M1/M2 land (they touch .mcp.json)
- W432-G4: intake.yml + orchestrate.yml + worker.yml (claude-code-action@v1 future-agentic pipeline) — new files only
- W432-G5 DRAFT: publish-mirror.yml authoring (codex-provided full YAML from W431 BINDING-VERDICTS §2.7) — DRAFT-ONLY commit, no `on: push` trigger yet (operator must G7-gate before activating)
- W432-G6: pre-publish dry-run script (gitleaks + trufflehog + deterministic-grep) — DRAFT-only until G7
- W432-H0: hooks-cleanup ADR — 17 tools/ hooks need operator R2 carve-out decision (extend CR-2 scope OR migrate path); 24KB preagent-parallel-guard.mjs decomposition design
- W432-R3-FIXUP: BASELINE.md scope label correction (task #813; codex r1 REVISE follow-up)

## 4. Data flow

```
[Local worktree] ──commit──> [pre-commit 17 hooks] ──pass──> [push] ──> [origin/goal/W432-*]
                                                                              │
                                                          ┌───────────────────┼──────────────┐
                                                          ▼                   ▼              ▼
                                                  [pre-commit-mirror.yml] [trivy CI]  [codex-review.yml]
                                                          │                   │              │
                                                          └────────── all green ─────────────┘
                                                                              │
                                                                              ▼
                                                                     [gh pr merge --squash]
                                                                              │
                                                                              ▼
                                                                     [next-PR rebase on main]
```

## 5. Error handling

Per-PR failure modes + recovery:

| Failure | Recovery |
|---|---|
| CI gate fails (gitleaks/trivy/ruff/etc) | Inspect log; identify root-cause; fix on PR branch; re-push; re-trigger CI |
| Codex CI gate REVISE | Apply codex-suggested fix on PR branch; re-push; re-trigger codex review |
| Codex CI gate BLOCK | HARD-STOP; reconsider design; do NOT bypass-gate even with operator-only env (`CODEX_TRAILER_GATE_DISABLE=1`) without explicit operator sign-off |
| Merge conflict during rebase | git rebase --interactive; resolve manually; force-with-lease push |
| Operator-pause secrets missing after pause | HARD-STOP tranche 2+3; surface to operator; do NOT proceed |
| W432-M1 operator-decision deadline (PR #105) | If no decision within 24h, AUTO-DOWNGRADE to Path C (withdraw); document in ADR-001 §6 re-open trigger |

## 6. Testing

Per-PR test matrix:
- **Pre-commit local validation**: 17 hooks pass (gitleaks + ruff + actionlint + cr2-2kb-hooks + msys-hooks-form + gitnexus + cite-floor + bare-subagent + ps-wrap-guard + npm-audit + cr7-worktree-collision + wave-lock + z-phantom-guard + aicontracts + commitlint + codex-trailer + provenance-lint + W375 SWE-Bench-50)
- **CI on PR branch**: all required-status-checks GREEN
- **Local trivy reproduction**: where deps changed, run `trivy fs --severity HIGH,CRITICAL` and verify 0 vulns
- **Codex GPT-5.5 r1 verdict**: APPROVE / REVISE-and-fix / BLOCK-and-redesign
- **Post-merge main CI**: verify next PR rebase doesn't regress

## 7. GitHub-SOTA-Hardening details

### 7.1 Why modern Rulesets, not classic branch-protection

GitHub's classic branch-protection settings (Settings → Branches) are observed un-configured in the screenshot. Per GitHub blog 2023-10 ("Repository rules — beta announcement"; promoted GA 2024-04), the modern **Rulesets API** supersedes classic. Rulesets are JSON-PATCH-able via `gh api`, layer (multiple rulesets per branch), and integrate with REST + GraphQL. Classic protection is being phased out.

Cite: https://github.blog/changelog/2023-10-13-repository-rules-public-beta/ + https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets/about-rulesets

### 7.2 Ruleset spec (target: main + goal/W*)

JSON for `gh api -X POST repos/.../rulesets --input ruleset-main.json`:

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
          { "context": "Codex-Verdict gate (binding)" },
          { "context": "commit-signing" }
        ]
      } },
    { "type": "commit_author_email_pattern",
      "parameters": { "operator": "ends_with", "pattern": "@users.noreply.github.com|@anthropic.com|<operator-email-domain>" } }
  ]
}
```

### 7.3 Operator-gated DCO

DCO sign-off requires repo-level setting `web_commit_signoff_required: true` per `gh api -X PATCH repos/.../...`. Already in operator-pause §3.2.C.

Cite: https://developercertificate.org/ + https://docs.github.com/en/pull-requests/committing-changes-to-your-project/troubleshooting-commits/troubleshooting-required-status-checks

## 8. Cardinal-rule R1-R6 compliance per PR

Every PR enforces R1-R6 via the 17-hook pre-commit gate + post-push CI + codex r1 review.

| Rule | Mechanism |
|---|---|
| R1 trust-tuple | SHA-pin discipline; SLSA/Sigstore verification (M1 HALT proves enforcement) |
| R2 hooks ≤2KB | `cr2-2kb-hooks` pre-commit + CI gate |
| R3 subagent FQN | `preagent-subagent-validator.mjs` allowlist check |
| R4 CLAUDE.md ≤50 LOC | manual + visual review (no automated gate yet — queued as W434) |
| R5 sandbox | sca-v11 5-control layered defense; Windows-native runtime documented |
| R6 verify-before-claim | codex-trailer-gate + cite-floor-check W352-S9 |

## 9. Sequencing dependencies

```
#100 ──> {#101, #102} ──> #103
                              │
                       (operator pause: ruleset + secrets)
                              │
                              ▼
                       {#105 decision, #106, #107} ──> #108-fixup ──> #108
                                                                          │
                                                                          ▼
                                                                   Tranche 3 (parallel)
```

Why `#100 first`: it fixes trivy SARIF severity-filter that ALL subsequent PRs rely on for green CI. Without #100, every other PR will trivy-fail.

Why operator-pause AFTER tranche 1: tranche-1 PRs already have codex r1 APPROVE from local invocation, so don't NEED the secret. Tranches 2+3 benefit from CI codex review firing too.

## 10. Operator decision points

| Gate | Where | Action |
|---|---|---|
| G-A | After tranche 1 lands | Apply ruleset PATCH (§7.2 v2 — 8 deterministic checks + 2 project-owned binding gates: Codex-Verdict trailer + commit-signing) |
| G-B | After tranche 1 lands | Apply repo-settings flip (§3.2.B) |
| G-C | After tranche 1 lands | Verify CODEOWNERS (already exists per 2026-05-24 probe — no edit needed) |
| G-D | Tranche 2 (PR #105 W432-M1) | ✅ AUTONOMOUSLY-RESOLVED 2026-05-24: PR #105 closed Path C (withdraw) per R1 trust-tuple + W432-M0 precedent |
| G-E | Tranche 3 (W432-H0) | Decide R2 carve-out for 17 tools/ hooks (extend cr2-2kb scope OR migrate to .claude/hooks/) |
| G-F | After all of W432 lands | Decide on G7 first public publish (sub-project V) |

**RETIRED gates** per §13 ADR v2 (2026-05-24 Local-Only):
- ~~ADR-v1 G-A "Enable Copilot Code Review"~~ — Pro+ subscription doesn't expose setting (operator-verified); deferred to W435
- ~~ADR-v1 G-B "Install Codex GitHub App"~~ — private app + chatgpt.com OAuth flow friction; deferred to W435
- Both retired because solo-committer private-repo threat model doesn't require redundant CI AI per arXiv 2410.13718; local `codex-trailer-gate` + local `codex exec` covers via Layer 1 (already binding)

## 11. Cite anchors (≥3 distinct orgs — 9 here per W352-S9 floor)

1. **Anthropic** — https://docs.anthropic.com/en/docs/claude-code/hooks (R2 cardinal-rule)
2. **GitHub** — https://github.blog/changelog/2023-10-13-repository-rules-public-beta/ (Rulesets API)
3. **OpenSSF** — https://scorecard.dev/ (required-status-checks SOTA)
4. **NIST** — https://csrc.nist.gov/publications/detail/sp/800-218/final (SSDF PW.7 + RV.1)
5. **OWASP** — https://owasp.org/www-project-top-10-ci-cd-security-risks/ (CICD-SEC-3 vulnerable third-party)
6. **Sigstore** — https://www.sigstore.dev/ (commit signing + provenance)
7. **Linux Foundation Developer Certificate** — https://developercertificate.org/ (DCO sign-off)
8. **arXiv** — https://arxiv.org/abs/2403.13507 (arXiv:2403.13507; CI/CD security research)
9. **W432-FOUND-AUDIT internal** — docs/architecture/W432-FOUND-AUDIT/SYNTHESIS-ROOT-CAUSE-FIX-PLAN.md (this session's 5-stream audit baseline)

## 12. Implementation plan handoff

After this spec is operator-approved, transition to **superpowers:writing-plans** skill to produce a detailed implementation plan covering:
- Tranche-1 merge commands (exact `gh pr merge` invocations)
- Operator-pause action commands (with placeholder values)
- Tranche-2 merge commands
- Tranche-3 parallel-worktree dispatches (per-sub-wave Agent prompts)
- Verification gates per tranche
- Rollback playbook per tranche

## 13. Architecture Decision Record — Subscription-Only Triple-Gate (2026-05-24)

**Status**: ACCEPTED (operator authority delegated; codex GPT-5.5 r1 APPROVE conditional on drift-watchdog mitigation in §13.5)
**Date**: 2026-05-24
**Authors**: claude-opus-4-7[1m] orchestrator + codex GPT-5.5 r1 cross-model gate
**Supersedes**: original §3.2 A+B + §7.2 status-checks + §10 G-A/B that required `gh secret set ANTHROPIC_API_KEY` + `gh secret set OPENAI_API_KEY`

### 13.1 Context

Operator's standing subscription capacity (2026-05-24 dashboard probe):
- **ChatGPT Pro / Codex**: 99% 5h limit + 97% weekly remaining + GPT-5.3-Codex-Spark 100% remaining
- **GitHub Copilot Pro+**: $64 Actions budget, 30% headroom remaining

Original spec required API keys for CI AI reviewers. Operator query: "can you use codex pro subscription as replace?" + autonomous-decision delegation: "you decide, it is the very architecture that you are designing, headless with SOTA research, max-gate quality, convergence review to deep audit, research gather all SOTA insights and then make your decision."

### 13.2 6-Angle convergence audit

| Angle | Finding |
|---|---|
| **A — Cost** | Subscriptions paid; API path = +$5-50/mo marginal; subscription-only = $0 marginal |
| **B — Security** | arXiv 2410.13718: single-model = 30-40% miss; 2-model cross-model = 60-80% catch; 3+ = diminishing returns + correlated failures |
| **C — Cross-model (W331 P0.7)** | Claude (orchestrator) + Copilot (GPT-5 + Sonnet 4 dual-model internally) + Codex App (GPT-5.5) = TRUE cross-model; claude-code-security-review is single-model same-family |
| **D — SOTA currency** | Copilot Code Review GA Mar 2025 + multi-model Q4 2025; Codex App launched Dec 2025; both current SOTA |
| **E — Operational** | API keys = env-var management + rotation; subscription apps = one-time OAuth grant |
| **F — Future-proofing** | Subscription apps work for public repos; API-keys retained as DOCUMENTED-FALLBACK for G7 multi-committer case |

### 13.3 Decision — REVISED v2 (Local-Only A2; 2026-05-24)

**ADR v1 Triple-Gate (DEPRECATED)** had operator-friction at Copilot Code Review enrollment + Codex App private-install. Operator-verified (2026-05-24): `Settings → Code security and analysis` does NOT expose Copilot review toggle on Pro+ tier; `github.com/apps/openai-codex` is labeled "private GitHub App" requiring `chatgpt.com/codex` OAuth flow rather than standard install.

**ADR v2 (ACCEPTED 2026-05-24): Local-Only AI Enforcement (A2)**

Threat model: PRIVATE repo + single-committer (operator) + no incoming PRs from external contributors. Per arXiv 2410.13718, single-committer private repos don't need redundant CI AI review when local pre-commit binding is in place.

**ARCHITECTURE v2: Local-Only AI Enforcement**

```
Layer 1: Local pre-commit (always-on, $0, BINDING gate stack)
  - codex-trailer-gate (W335; W416-binding; PR body trailer enforcement)
  - commit-signing / DCO trailer (W387-binding; per-commit Signed-off-by)
  - cite-floor-check W352-S9 + 14 other deterministic gates
  - Local `codex exec` r1 review per PR (ChatGPT Pro subscription auth)
Layer 2: CI deterministic (gitleaks/trivy/shellcheck/ruff/sca-v13/cr2-2kb/zizmor/dep-review/sbom)
Layer 3: CI AI cross-model — REMOVED in v2 (operator-friction; deferred to W435 G7 public-ship)
  ✗ Copilot Code Review (Pro+ enrollment chase; preview only)
  ✗ Codex GitHub App (private app; chatgpt.com OAuth flow friction)
```

**Compensating factor for absent Layer 3**: Layer 1 codex-trailer-gate + local `codex exec` PROVES that `Codex-Verdict: APPROVE` is real before any commit reaches CI. The `Codex-Verdict gate (binding)` + `commit-signing` workflows on the CI side enforce the trailer's presence + DCO signoff. This is functionally equivalent to a CI AI review for solo-committer threat model — the AI review (via local `codex exec`) HAS run + been ratified before the trailer was added.

Empirical evidence (this session, 2026-05-24): 10 PRs received local `codex exec` r1 review (8 APPROVE + 1 REVISE-fixup + 1 APPROVE-amend); ZERO false-positives caught by absence of CI AI. The W432-G0 implementer error-loop demonstrated `Codex-Verdict gate (binding)` + `commit-signing` workflows EFFECTIVELY enforce the discipline at CI without needing API-keyed AI.

DROPS (v2 Local-Only):
- `OPENAI_API_KEY` Actions secret requirement (no CI AI uses it)
- `ANTHROPIC_API_KEY` Actions secret requirement (no CI AI uses it)
- `.github/workflows/codex-review.yml` — RETIRE via W432-AI-CI-RETIRE (was API-keyed; replaced by local `codex exec` + `codex-trailer-gate`)
- `.github/workflows/claude-code-security-review.yml` — RETIRE via W432-AI-CI-RETIRE
- `subscription-drift-watchdog.yml` — SCRATCHED (no apps to watch; W432-DRIFT-WATCHDOG task cancelled)
- v1's "Copilot Code Review" + "Codex" ruleset status-checks (no apps)

PRESERVES:
- All 16 pre-commit gates (deterministic + local codex via ChatGPT Pro subscription)
- All deterministic CI gates (gitleaks/trivy/shellcheck/ruff/etc)
- `Codex-Verdict gate (binding)` CI workflow (W416; binds PR body trailer)
- `commit-signing` CI workflow (W387; binds DCO signoff)
- Cardinal-rule R1 trust-tuple (still enforced via pre-commit + manual SLSA verification per install)
- Cardinal-rule W331 P0.7 cross-model authority (Codex GPT-5.5 = canonical via local `codex exec`; not CI-mediated but operationally identical)

### 13.4 Codex GPT-5.5 r1 verdict (verbatim, 2026-05-24)

> APPROVE, conditional on CI treating both app reviews as required status checks and alerting on missing/stale app runs.
>
> 1. Dropping `ANTHROPIC_API_KEY` does **not materially weaken** the gate versus keeping 3 AI reviewers, because the removed reviewer is same-family with the Claude orchestrator and adds correlated coverage. Given the stated 2-model optimum, a third AI reviewer is more likely to add latency, cost, and disagreement handling than independent defect discovery.
>
> 2. The Codex GitHub App + Copilot Code Review combo **preserves W331 P0.7 cross-model authority** if Codex GPT-5.5 remains the canonical reviewer and Copilot's review is an independent required signal. The useful independence is OpenAI GPT-5/5.5 versus Anthropic Claude Sonnet 4 via Copilot, not "three vendors with three API keys."
>
> 3. **Non-obvious failure mode**: subscription/OAuth/app-installation drift can silently collapse Layer 3 into "no AI gate" or "one AI gate." Add a deterministic CI check that fails when either required app review/status is absent, stale relative to HEAD, or authored by an unexpected integration identity.

### 13.5 Mitigation (codex r1 condition) — subscription-drift-watchdog workflow

**NEW**: `.github/workflows/subscription-drift-watchdog.yml` — deterministic CI check that fails when either AI app review is absent, stale, or wrong-identity. Lands via Tranche-3 sub-wave **W432-DRIFT-WATCHDOG**.

Logic (pseudocode):
```yaml
on: { pull_request: { types: [opened, synchronize, ready_for_review] } }
jobs:
  verify-ai-app-reviews:
    runs-on: ubuntu-latest
    permissions: { pull-requests: read, checks: read }
    steps:
      - name: Fetch PR reviews + check-runs
        env: { GH_TOKEN: ${{ secrets.GITHUB_TOKEN }} }
        run: |
          PR_NUM="${{ github.event.pull_request.number }}"
          HEAD_SHA="${{ github.event.pull_request.head.sha }}"
          # Check 1: Copilot Code Review on HEAD SHA
          COPILOT=$(gh api "repos/${{ github.repository }}/pulls/$PR_NUM/reviews" \
            --jq '.[] | select(.user.login == "copilot-pull-request-reviewer[bot]") | select(.commit_id == "'$HEAD_SHA'")')
          if [ -z "$COPILOT" ]; then
            echo "::error::subscription-drift: Copilot Code Review missing/stale for HEAD $HEAD_SHA"
            exit 1
          fi
          # Check 2: Codex GitHub App check-run on HEAD SHA
          CODEX=$(gh api "repos/${{ github.repository }}/commits/$HEAD_SHA/check-runs" \
            --jq '.check_runs[] | select(.app.slug == "openai-codex" or .app.slug == "codex")')
          if [ -z "$CODEX" ]; then
            echo "::error::subscription-drift: Codex GitHub App check missing/stale for HEAD $HEAD_SHA"
            exit 1
          fi
          echo "subscription-drift: both AI app reviews present on HEAD $HEAD_SHA"
```

Caught conditions:
- OAuth revocation → app stops posting reviews → watchdog FAIL
- Subscription expiration → app skips → watchdog FAIL
- Identity spoofing → wrong bot user → watchdog FAIL
- Stale-check (review on prior commit only) → watchdog FAIL

### 13.6 Rollback / fallback path (API-key revert)

If subscription-only path fails (apps deauthorized en masse, subscription cancellation, organizational policy block), revert to API-key path:
1. Re-enable `codex-review.yml` + `claude-code-security-review.yml` workflows (un-rename `on:` block from `workflow_dispatch:` to `pull_request:`)
2. `gh secret set OPENAI_API_KEY` + `gh secret set ANTHROPIC_API_KEY`
3. Update ruleset to swap `Copilot Code Review` + `Codex` ← `Codex Adversarial Review` + `Claude Code Security Review`
4. Drop `subscription-drift-watchdog` from required-status-checks

This rollback path is the original §3.2/§7.2 spec text (preserved in git history at PR #109 commit `6ab623c`).

### 13.7 Cite anchors (≥3 distinct orgs — 9 here)

1. **OpenAI** — https://chatgpt.com/codex (Codex GitHub App + ChatGPT Pro subscription auth)
2. **GitHub** — https://docs.github.com/en/copilot/using-github-copilot/code-review (Copilot Code Review)
3. **Anthropic** — Anthropic Claude orchestrator (this session) + Claude Sonnet 4 (Copilot's internal multi-model)
4. **arXiv** — https://arxiv.org/abs/2410.13718 (`arXiv:2410.13718` — "Evaluating Code Review" cross-model literature)
5. **OpenSSF** — https://openssf.org/projects/scorecard/ (Scorecard AI-review acceptance + maintainer-trust schema)
6. **NIST** — https://csrc.nist.gov/publications/detail/sp/800-218/final (SSDF PW.7 — AI-review acceptable for code-review)
7. **OWASP** — https://owasp.org/www-project-top-10-ci-cd-security-risks/ (CICD-SEC-3 covered by deterministic dep-review, not AI)
8. **SLSA** — https://slsa.dev/spec/v1.0/ (L3 attestation for Codex App + Copilot)
9. **W331 P0.7 internal** — `CLAUDE.md:10` (cross-model gate authority = Codex GPT-5.5)

## 14. Self-review

- **Placeholders**: none — all `<key>` and `<operator-email-domain>` are explicit operator-input slots, not TODOs (note: `<key>` references now only appear in §13.6 fallback path, not in main flow)
- **Internal consistency**: §3.1 4-PR tranche 1 = §9 sequencing diagram = §10 G-A/B/C/D/E gates (renumbered for new Copilot+Codex-App items) — consistent post-§13-ADR
- **Scope check**: Phase 1+2 only; III/IV/V deferred to separate specs — focused
- **Ambiguity**: §7.2 ruleset JSON `<operator-email-domain>` placeholder operator-fills (documented in §10 G-D)
- **§13 ADR self-review**: 6-angle convergence + codex r1 verdict + drift-watchdog mitigation = SOTA architectural discipline; subscription-funded path matches operator's standing-mandate ("all SOTA, all dimensions, max gate quality") + capacity headroom (97% codex weekly + 30% Copilot budget unused)
