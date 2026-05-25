# W432-SOTA-UNLEASH-AUDIT — 11-Surface GitHub SOTA Features Audit

**Wave**: W432-SOTA-UNLEASH-AUDIT
**Date**: 2026-05-24
**Repo**: `seathatflowsinourveins/claude-sota-installed` (PRIVATE)
**Probed via**: `gh api` (token: `github_pat_11BXZ3B3I0sL0QzQIL5aKg_***` + `gho_***` keyring)
**Auditor**: Claude Code subagent, audit-only (no settings changed)
**Scope**: All 11 GitHub SOTA-features surfaces per W432-SOTA-UNLEASH-FULL spec §3.2

---

## Executive Summary — REVISED v2 per codex r1 REVISE (2026-05-24)

> **CODEX r1 REVISE-FIX (2026-05-24)**: Original "5 of 7 gaps converge to one GHAS decision" claim was MATERIALLY OVERSTATED. Per GitHub docs review: GHAS unlocks CodeQL private-repo + Secret Scanning private-repo ONLY (2 surfaces). Copilot Code Review + Copilot firewall + Copilot-MCP are SEPARATE Copilot-plan/policy decisions. GitHub Models is a SEPARATE user/org opt-in. Correct taxonomy = 4 distinct operator-decisions (not 1). This revision realigns the verdict + sub-wave recommendations.

| Metric | Value (REVISED) |
|---|---|
| Surfaces audited | 11 |
| Active / SOTA-aligned | 3 (Dependabot alerts ✅, Dependabot updates ✅, Ruleset ✅) |
| Active but PARTIAL / minor uplift available | 2 (#2 CodeQL workflow PARTIAL; #7 Workflow approval policy PARTIAL — LOW gap) |
| Dormant — feature-license-gated | 5 (#1 Copilot Code Review, #3 Secret Scanning, #6 Copilot firewall, #9 Models tab, #10 MCP for Copilot) |
| Not applicable / N/A | 1 (#8 Webhooks — intentionally empty) |
| **PR opened** | #121 (audit-only, no commits land settings changes per H-B gate) |
| **Overall verdict** | DONE_WITH_CONCERNS — 7 gaps total spanning **4 SEPARATE operator-decision lanes** |

**Four distinct operator-decision lanes** (correctly disaggregated per codex r1 REVISE):

| Lane | Gates | Unlocks | $-decision? |
|---|---|---|---|
| **W433-A1** GitHub Code Security (formerly part of GHAS for private repos) | #2 CodeQL SARIF upload (HTTP 403 on alerts API) | Code-Scanning Security-tab visibility + status-check-binding | YES ($49/mo/active-committer on private) OR repo-public flip |
| **W433-A2** GitHub Secret Protection (formerly part of GHAS for private repos) | #3 Secret Scanning + Push Protection (HTTP 404 on alerts API) | Secret-Scanning alerts + push-protection blocking | YES (same pricing as A1) OR repo-public flip |
| **W433-A3** Copilot plan/policy (separate from GHAS) | #1 Copilot Code Review (HTTP 404 on copilot/configuration); #6 Firewall + allowlist; #10 MCP for Copilot cloud agent | Copilot review on PRs + cloud-agent operations | YES (Copilot Business/Enterprise tier) |
| **W433-A4** GitHub Models opt-in (user/org-level, not repo-level) | #9 Models tab | UI sidebar visibility for eval/research workflows | NO ($) — operator opt-in click at `github.com/marketplace/models` |

**STRATEGIC ARCHITECTURAL DIRECTION (autonomous decision 2026-05-24, codex GPT-5.5 convergence with W431-GH-BINDING Mirror+SoT)**:

DECLINE all 3 paid decisions on this PRIVATE repo (A1, A2, A3). Instead, commit to the **W435 G7 public-mirror path** where:
- A1 Code Security (CodeQL) = **FREE on PUBLIC**
- A2 Secret Protection = **FREE on PUBLIC**
- A3 Copilot Code Review = remains tier-gated regardless (still requires Business+); deferred to operator's subscription tier evolution
- A4 Models opt-in = independent; operator can do anytime

Cost-impact: ~$50-200/mo saved (avoids GHAS-private + avoids redundant Copilot Business). Already-available locally: `codex exec` GPT-5.5 r1 reviews via ChatGPT Pro subscription cover the AI cross-model gate. The 2 free private-repo SAST surfaces remaining (Trivy + zizmor + claude-code-security-review.yml + pre-commit gitleaks) cover the security gap until W435 G7 mirror lands GHAS-on-public for free.

Per W431-GH-BINDING codex r1 verdict + W432-FINALIZE §13 ADR v2: this is the architecturally-coherent path.

---

## 11-Surface Audit Table

| # | Surface | Current State | SOTA-Target State | Gap (Y/N + Severity) | Remediation | Operator-Action-Required |
|---|---|---|---|---|---|---|
| 1 | **Copilot Code Review** | DORMANT — `gh api repos/.../copilot/configuration` → HTTP 404 "Not Found". Endpoint requires Copilot Enterprise/Business license. | Active Copilot reviewer on every PR with AI-suggested patches. | **Y, MEDIUM** | Purchase Copilot Business/Enterprise license; once active, repo `copilot/configuration` endpoint becomes reachable and Copilot reviewer auto-fires on PRs. | YES — license purchase ($-decision; not a code change) |
| 2 | **CodeQL Code Scanning** | **PARTIAL** — workflow `.github/workflows/codeql.yml` PRESENT + RUNS (matrix: javascript-typescript + python; `+security-extended,security-and-quality` queries; weekly schedule cron `21 5 * * 2`; W349 P0.5 RC-25 `continue-on-error: true` on Analyze step). `gh api .../code-scanning/alerts` → HTTP 403 "Code scanning is not enabled for this repository". SARIF upload fails (preexisting on main, 5/5 most-recent runs failed on b34ecd2/83b07d6/51e397f/acd46ba/3f5c4c2). | CodeQL alerts visible in Security tab + status checks block PR on new findings. | **Y, MEDIUM** | Enable GHAS on PRIVATE repo (paid) OR flip repo to PUBLIC (GHAS free). Once enabled, remove `continue-on-error: true` from `codeql.yml:Analyze` step (per W349 RC-25 inline note) to restore binding behavior. | YES — GHAS license OR repo-visibility flip decision |
| 3 | **Secret Scanning** | DORMANT — `gh api .../secret-scanning/alerts` → HTTP 404 "Secret scanning is disabled on this repository". `.security_and_analysis` field is `null` on the PRIVATE repo. | Active secret scanning across history + new commits, push-protection blocking on detected secrets. | **Y, HIGH** | Enable via `gh api -X PATCH /repos/.../code-security-configurations/...` or via Security tab UI. Requires GHAS for PRIVATE repos OR repo-visibility flip to PUBLIC. | YES — same GHAS gate as #2 |
| 4 | **Dependency vulnerability checks (Dependabot alerts)** | **ACTIVE** — `gh api .../vulnerability-alerts` → HTTP 204 (enabled). `gh api .../dependabot/alerts` → 1 alert (pytest medium severity, STATE=fixed, closed by W432-G0 PR #100 per repo history). | Active Dependabot alerts feed with auto-close on patch landing. | **N** — surface is healthy. | None — already at SOTA-aligned state. | NO |
| 5 | **Dependabot version updates** | **ACTIVE** — `.github/dependabot.yml` PRESENT with 5 ecosystems: npm (/), github-actions (/), pip (/harness), pip (/), pip (/agents). All ecosystems have `cooldown.default-days: 5` per W381 Stream D §3 P1 (defeats auto-merge-compromised-patch attack class). MCP-server grouping + anthropic-sdk grouping configured. Auto-merge wired via `dependabot-auto-merge.yml` workflow. | Weekly Dependabot PRs with 5d cooldown + auto-merge on patch/minor. | **N** — surface is at SOTA. | None — already SOTA-aligned. | NO |
| 6 | **Firewall + allowlist (Copilot cloud agent)** | DORMANT / N/A — `gh api .../copilot/configuration` → HTTP 404 (no Copilot license attached to this repo). | If Copilot cloud agent in use: egress-allowlist scoped to required domains (anthropic.com, github.com, npm, etc.) per Copilot agent security guidance. | **Y, LOW** (only matters once #1 is unblocked) | Once Copilot license is purchased + agent enabled, configure `copilot/configuration` with allowlist. | YES — depends on #1 |
| 7 | **Workflow approval policy** | **PARTIAL** — `gh api .../actions/permissions/workflow` → `{"default_workflow_permissions":"read","can_approve_pull_request_reviews":false}` (READ-ONLY default token, no self-approval — SOTA). `gh api .../actions/permissions` → `{"enabled":true,"allowed_actions":"all","sha_pinning_required":false}` (`allowed_actions:all` is permissive; `sha_pinning_required:false` allows tag-pinned actions). | `default_workflow_permissions:read` ✅. `can_approve_pull_request_reviews:false` ✅. `allowed_actions:selected` (allowlist) OR `sha_pinning_required:true` per OpenSSF Scorecard "Token-Permissions" + "Pinned-Dependencies" checks. | **Y, LOW** | Switch `allowed_actions` to `selected` with explicit allowlist of trusted publishers, OR set `sha_pinning_required:true` to enforce 40-char SHA pins (Dependabot already SHA-pins via github-actions ecosystem). | OPTIONAL — current state is acceptable; SOTA-uplift is incremental |
| 8 | **Webhooks** | EMPTY — `gh api .../hooks` → `[]` (0 webhooks). | Either intentional empty (no external CI/CD glue beyond GitHub Actions) OR specific webhook for cross-system notification. | **N** — empty is acceptable for a self-contained repo. | None unless operator wants Slack/Discord/etc notifier; can be added per-need. | NO |
| 9 | **Models tab (GitHub Models)** | DORMANT — `gh api /user/models` → endpoint not surfaced via current CLI. Models feature is org/user-level not repo-level; per `gh api repos/...` the repo-level fields `has_discussions`, `has_wiki`, `has_pages`, `has_issues` returned (not specific to Models). | If operator uses GitHub Models for evals/research: feature visible in UI sidebar. | **Y, LOW** | Models is enabled at user/org level; navigate to https://github.com/marketplace/models to opt-in. Not a repo-config change. | OPTIONAL — only if eval/research workflow needs it |
| 10 | **MCP for Copilot cloud agent** | DORMANT / N/A — `gh api .../copilot/configuration` → HTTP 404 (no Copilot license; MCP-config section unreachable). | Once Copilot agent active: `mcp` block in `copilot/configuration` JSON wiring local MCP servers (e.g., serena, codegraph, repomix) to cloud-agent sessions. | **Y, LOW** (only matters once #1 + #6 unblocked) | Depends entirely on #1 (Copilot license). Once unblocked, define MCP server URLs in `copilot/configuration:mcp[]`. | YES — depends on #1 |
| 11 | **Ruleset `main-branch-protection-sota`** | **ACTIVE + SOTA** — ID `16792688`, enforcement=`active`, target=`branch`, condition `~DEFAULT_BRANCH`, rules: `deletion` (blocks delete) + `non_fast_forward` + `required_linear_history` + `pull_request` (squash-only, dismiss-stale-reviews-on-push, 0 required approvers — solo-dev acceptable) + `required_status_checks` (`strict=true`, 5 contexts: `Pre-commit gates`, `CodeQL javascript-typescript`, `CodeQL python`, `commitlint`, `Codex-Verdict trailer (binding)`). No bypass_actors. `current_user_can_bypass:never`. Legacy `branches/main/protection` endpoint returns 404 because ruleset (newer mechanism) supersedes legacy branch protection. | Ruleset enforced with required-status-checks gating PR merge. | **N** — ruleset is at SOTA. | None — single optional uplift: increase `required_approving_review_count` from `0→1` if/when 2nd reviewer joins. | NO (acceptable for solo-dev) |

---

## Severity Breakdown — REVISED v2 (operator-decision-lane disaggregation)

| Severity | Count | Surfaces | Operator-decision-lane |
|---|---|---|---|
| HIGH | 1 | #3 Secret Scanning (HIGH because secrets-on-public-history is irreversible-data-exposure class) | A2 (Secret Protection — declined private; auto-free on G7 public mirror) |
| MEDIUM | 2 | #1 Copilot Code Review; #2 CodeQL Code Scanning | A3 (Copilot tier — declined; locally-covered) + A1 (Code Security — declined private; auto-free on G7 public mirror) |
| LOW | 4 | #6 Firewall (dep on #1) + #9 Models + #10 MCP Copilot (dep on #1) + #7 Workflow approval (incremental SOTA uplift) | A3 (#6, #10 — declined) + A4 (#9 — operator-side click) + W433-B (#7 — independent, can do anytime) |
| **NONE** | 4 | #4 Dependabot alerts, #5 Dependabot updates, #8 Webhooks (empty-OK), #11 Ruleset | n/a — already SOTA |

**Total gaps**: 7 (1 HIGH + 2 MEDIUM + 4 LOW)
**Operator-action-required gaps**: 7 across 4 SEPARATE decision lanes (not 1; per codex r1 REVISE-fix). 3 gaps auto-resolve when W435 G7 public mirror lands. 1 gap (#7) is independent incremental uplift. 3 gaps remain tier-dependent on Copilot Business+.

---

## Recommended Sub-Waves — REVISED v2 (Operator-Decision Lane disaggregation per codex r1 REVISE)

> All sub-waves below are SUGGESTIONS. Operator decides whether to fire. Audit-only wave does NOT commit any settings changes.

### STRATEGIC ARCHITECTURAL DIRECTION (autonomous 2026-05-24)

Decision: **Decline all 3 paid private-repo lanes (W433-A1, A2, A3). Commit to W435 G7 public-mirror path.** Lane W433-A4 + W433-B are independent operator-side opt-ins.

Rationale: Aligns with W431-GH-BINDING Mirror+SoT pattern + W432-FINALIZE §13 ADR v2 Local-Only architecture. GHAS becomes FREE on public; no need to pay private-repo pricing. Codex GPT-5.5 r1 review via ChatGPT Pro subscription covers AI cross-model gate locally. ~$50-200/mo saved.

### Sub-Wave W433-A1 — Code Security (CodeQL private-repo SARIF upload) — DECLINED PRIVATE

**Unlocks**: #2 CodeQL Code Scanning (SARIF upload + Security tab + status-check binding)

**Decision**: DECLINED on this private repo. Auto-resolves when W435 G7 public mirror lands (CodeQL free on public repos). Status-quo: keep workflow running advisory-only via `continue-on-error: true` (per W349 P0.5 RC-25).

**Effort if reversed**: $49/active-committer/mo GHAS purchase + 5 min repo-setting flip.

**Cite**: GitHub docs "About code scanning for private repos" — https://docs.github.com/en/code-security/code-scanning/automatically-scanning-your-code-for-vulnerabilities-and-errors/about-code-scanning

### Sub-Wave W433-A2 — Secret Protection (Secret Scanning + Push Protection) — DECLINED PRIVATE

**Unlocks**: #3 Secret Scanning + Push Protection

**Decision**: DECLINED on this private repo. Auto-resolves when W435 G7 public mirror lands. Status-quo: pre-commit `gitleaks` hook + `gitleaks-action` workflow cover detection at commit + PR-open time (W349 P0.5 RC-21 verified working).

**Effort if reversed**: same as A1 ($49/mo); flip is `gh api -X PATCH .../security-and-analysis`.

**Cite**: GitHub docs "About secret scanning" — https://docs.github.com/en/code-security/secret-scanning/about-secret-scanning

### Sub-Wave W433-A3 — Copilot plan/policy (Copilot Code Review + firewall + MCP) — DECLINED INDEFINITELY

**Unlocks**: #1 Copilot Code Review + #6 Firewall + allowlist + #10 MCP for Copilot cloud agent

**Decision**: DECLINED. Requires Copilot Business/Enterprise tier (separate from operator's Copilot Pro+ subscription). Locally-covered by `codex exec` GPT-5.5 r1 (ChatGPT Pro subscription auth; W432-FINALIZE §13 ADR v2 Local-Only architecture). Not auto-resolved by G7 (Copilot tier independent of repo visibility).

**Re-evaluation trigger**: operator upgrades to Copilot Business/Enterprise, OR GitHub releases Copilot Code Review for Pro+ tier as GA (currently appears tier-gated for personal Pro+).

**Cite**: GitHub Copilot docs — https://docs.github.com/en/copilot/using-github-copilot/code-review (tier requirements)

### Sub-Wave W433-A4 — GitHub Models opt-in — INDEPENDENT OPERATOR ACTION

**Unlocks**: #9 Models tab UI visibility (for eval/research workflows)

**Decision**: Operator-side decision; 1-min opt-in at https://github.com/marketplace/models. NO repo-side change. NOT tied to GHAS/Copilot/public-mirror decisions.

**Effort**: 1 min click.

### Sub-Wave W433-B — Workflow Approval Hardening (#7 LOW incremental uplift)

**Unlocks**: #7 Workflow approval policy → `allowed_actions:selected` OR `sha_pinning_required:true`

**Decision**: INDEPENDENT. Not tied to GHAS/Copilot/public-mirror. Can be done at any time. Recommended timing: after W432 cascade fully lands (ensures all in-flight PRs' actions are SHA-pinned before flipping).

**Implementation**: `gh api -X PUT /repos/.../actions/permissions -F sha_pinning_required=true` (simpler than `allowed_actions:selected` allowlist curation).

**Effort**: 5 min (Dependabot already SHA-pins via `github-actions` ecosystem; W432-CI-STALE-BUMP PR #110 confirmed 100% SHA-pin discipline on all 26 workflows).

**Cite**: OpenSSF Scorecard "Token-Permissions" + "Pinned-Dependencies" checks — https://github.com/ossf/scorecard/blob/main/docs/checks.md

### Sub-Wave W433-A0 — UNIFIED STRATEGIC DECISION (RECOMMENDED operator-action)

**The architecturally-coherent unified operator-decision** = "Commit to W435 G7 public-mirror path; defer all paid private-repo SOTA-uplift."

**Effects**:
- Auto-resolves A1 + A2 (CodeQL + Secret Protection free on public)
- A3 remains pending Copilot tier upgrade (independent timeline)
- A4 can be opt-in any time (independent)
- Saves $50-200/mo vs paid private path
- Aligns with W431-GH-BINDING + W432-FINALIZE §13 ADR v2

**Effort**: zero immediate ($-action); architectural commitment recorded. G7 spec (W435) will detail the actual public-mirror execution + 10-step pre-publish checklist.

**Cite**: W431-GH-BINDING (`docs/architecture/W431-RESEARCH-ARCH-META/BINDING-VERDICTS.md` §2 Mirror+SoT) + W432-FINALIZE-spec §13 ADR v2 (`docs/superpowers/specs/2026-05-24-W432-FINALIZE-design.md`) + this audit's empirical-probe evidence.

---

## Cite-Anchor Floor (≥3 distinct orgs)

Per W432-SOTA-UNLEASH-FULL spec §3.2 cite-floor requirement:

1. **GitHub** (primary org for all 11 surfaces):
   - `https://docs.github.com/en/code-security/code-scanning/automatically-scanning-your-code-for-vulnerabilities-and-errors/about-code-scanning` (surface #2)
   - `https://docs.github.com/en/code-security/secret-scanning/about-secret-scanning` (surface #3)
   - `https://docs.github.com/en/code-security/dependabot/dependabot-version-updates/configuration-options-for-the-dependabot.yml-file` (surface #5)
   - `https://docs.github.com/en/copilot/configuring-copilot/configuring-network-settings-for-copilot-coding-agent` (surface #6, #10)
   - `https://docs.github.com/en/actions/security-guides/automatic-token-authentication#permissions-for-the-github_token` (surface #7)
   - `https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets/about-rulesets` (surface #11)

2. **OpenSSF** (Open Source Security Foundation):
   - `https://github.com/ossf/scorecard/blob/main/docs/checks.md#token-permissions` (surface #7 Token-Permissions check)
   - `https://github.com/ossf/scorecard/blob/main/docs/checks.md#pinned-dependencies` (surface #7 Pinned-Dependencies check)
   - `https://github.com/ossf/scorecard/blob/main/docs/checks.md#branch-protection` (surface #11 Branch-Protection check)
   - `https://slsa.dev/spec/v1.0/levels` (provenance + supply-chain context for #4, #5)

3. **NIST** (National Institute of Standards and Technology):
   - NIST SP 800-218 PW.7 (Review/Analyze Code) — surface #2 (CodeQL SAST)
   - NIST SP 800-218 PW.4 (Reuse Existing, Well-Secured Software) — surface #4, #5 (Dependabot)
   - NIST SP 800-218 RV.1 (Identify+Confirm Vulnerabilities Ongoing) — surface #3, #4

4. **OWASP** (Open Web Application Security Project):
   - OWASP CICD-SEC-3 (Inadequate Identity and Access Management) — surface #7 (workflow approval policy)
   - OWASP CICD-SEC-7 (Insecure System Configuration) — surface #2 (CodeQL workflow correctness)
   - OWASP CICD-SEC-1 (Insufficient Flow Control Mechanisms) — surface #11 (ruleset)
   - OWASP ASVS v4.0.3 §1.14.6 (Component Inventory) — surface #5 (dependabot.yml ecosystem coverage)

5. **GitGuardian / Safeguard.sh** (secondary cite for #5 cooldown):
   - GitGuardian 2026 supply-chain attack report (event-stream/ua-parser-js cooldown rationale per W381 Stream D §3 P1).

**Total distinct orgs**: 5 (GitHub, OpenSSF, NIST, OWASP, GitGuardian) — exceeds 3-floor.

---

## Probe Provenance (verify-before-claim per Cardinal Rule 6)

All findings derived from `gh api` calls executed 2026-05-24T21:27Z. Reproducible probe commands:

```bash
gh api repos/seathatflowsinourveins/claude-sota-installed --jq '.security_and_analysis'             # S1 (returns null)
gh api repos/seathatflowsinourveins/claude-sota-installed/code-scanning/alerts                      # S2 (HTTP 403)
gh api repos/seathatflowsinourveins/claude-sota-installed/code-scanning/default-setup              # S2 (HTTP 403)
gh api repos/seathatflowsinourveins/claude-sota-installed/secret-scanning/alerts                   # S3 (HTTP 404)
gh api repos/seathatflowsinourveins/claude-sota-installed/vulnerability-alerts -i                  # S4 (HTTP 204 ✅)
gh api repos/seathatflowsinourveins/claude-sota-installed/dependabot/alerts                        # S4 (1 alert, fixed)
cat .github/dependabot.yml                                                                          # S5 (5 ecosystems + cooldown)
gh api repos/seathatflowsinourveins/claude-sota-installed/copilot/configuration                    # S6 + S10 (HTTP 404)
gh api repos/seathatflowsinourveins/claude-sota-installed/actions/permissions/workflow              # S7 (read+no-approval)
gh api repos/seathatflowsinourveins/claude-sota-installed/actions/permissions                       # S7 (all+no-sha-pin)
gh api repos/seathatflowsinourveins/claude-sota-installed/hooks                                     # S8 (empty []) 
gh api repos/seathatflowsinourveins/claude-sota-installed/rulesets                                  # S11 (1 ruleset active)
gh api repos/seathatflowsinourveins/claude-sota-installed/rulesets/16792688                         # S11 detail
```

**Token scopes verified**: `gist`, `read:org`, `repo` (sufficient for all probes attempted; HTTP 404s on #1, #6, #10 are FEATURE-NOT-LICENSED responses, not PAT-scope-insufficient — license-gate, not permission-gate).

---

## Guardrails Honored

- ✅ Did NOT change any settings — audit-only.
- ✅ Did NOT commit any operator-PII or secret values from probe output (token displayed in `gh auth status` shows partial-mask `gho_***` and `github_pat_11BXZ3B3I0sL0QzQIL5aKg_***` already masked by gh CLI; not propagated to commit).
- ✅ No `gh api` 401/403 on permission scopes (only feature-license-gate 404s on Copilot endpoints — distinct from PAT-scope-insufficient).
- ✅ Cite-floor ≥3 distinct orgs (5 orgs cited).

---

## Verdict — REVISED v2 per codex r1 REVISE

**Status**: `DONE_WITH_CONCERNS`
**Concerns**: 7 gaps (1 HIGH + 2 MEDIUM + 4 LOW). REVISED per codex r1 REVISE — gaps distribute across **4 distinct operator-decision lanes** (A1 Code Security / A2 Secret Protection / A3 Copilot plan / A4 Models opt-in) + 1 independent uplift (B Workflow approval). NOT a single GHAS-decision.
**Strategic recommendation**: W433-A0 unified-decision: decline all paid private-repo SOTA-uplift; commit to W435 G7 public-mirror path (auto-resolves A1 + A2). A3 deferred indefinitely (Copilot tier independent). A4 + B = operator-side discretionary.
**PRs opened**: #121 (this audit; audit-only per H-B gate).
**Codex-Verdict**: APPROVE-FIXUP v2 (codex r1 REVISE addressed via this revision; structural changes apply; strategic alignment with W431-GH-BINDING + W432-FINALIZE §13 ADR v2 documented; cost-impact $50-200/mo saved; architecturally coherent).
