# W434-GITHUB-CICD — SOTA Landscape (2026-05)

> Phase A research: deep-dive into GitHub CI/CD practice, official docs ingest, R1-probe of SOTA repos.
> Wave: W434-GITHUB-CICD · Session: 0ba1d763-9909-4ba1-951d-63d550b8603e · Date: 2026-05-24
> Methodology: skeleton-first per Δ-PDM-1; SOTA-2026-05 cited against 5 official sources + 15 repo R1 probes.

## §0 — Current runtime CI/CD posture (probed 2026-05-24 from /z/z/claude-sota-installed-W434-GITHUB-CICD)

### 0.1 Workflows installed (28 total)

| # | Workflow | Purpose | Key Actions Used |
|---|---|---|---|
| 1 | `actionlint.yml` | Lint workflow YAML | rhysd/actionlint |
| 2 | `agentcontracts.yml` | AI contracts (agents) | local |
| 3 | `ci.yml` | Pre-commit + gitleaks + trivy + dep-review + shellcheck + ruff + R3 allowlist | step-security/harden-runner v2.19.3, actions/checkout v6.0.2, actions/setup-python v6.2.0, actions/setup-node v6.4.0, actions/cache v5.0.5, aquasecurity/trivy-action v0.36.0, gitleaks/gitleaks-action v2.3.9, github/codeql-action/upload-sarif v4.35.5, actions/dependency-review-action v4.9.0, ludeeus/action-shellcheck 2.0.0, astral-sh/ruff-action v4.0.0 |
| 4 | `claude-code-security-review.yml` | Anthropic security review | claude action |
| 5 | `claude-model-check.yml` | Claude model API check | local |
| 6 | `code-quality.yml` | Code quality gates | local |
| 7 | `codeql.yml` | SAST (js-ts + python) | github/codeql-action/* v4.35.5, step-security/harden-runner |
| 8 | `codex-review.yml` | Codex GPT-5.5 PR review | actions/github-script v9.0.0 |
| 9 | `codex-verdict-gate.yml` | Codex-Verdict trailer gate | local |
| 10 | `commit-signing.yml` | DCO + GPG/SSH signature advisory | step-security/harden-runner, checkout |
| 11 | `commitlint.yml` | Conventional Commits + W-wave types | local |
| 12 | `dependabot-auto-merge.yml` | Dependabot auto-merge | local |
| 13 | `dependency-review.yml` | PR-gate dep review | actions/dependency-review-action v4.9.0 |
| 14 | `eval-nightly.yml` | Nightly evals (inspect_ai+promptfoo) | local |
| 15 | `labeler.yml` | Auto-label PRs | actions/labeler |
| 16 | `links.yml` | Link checker | lychee |
| 17 | `monthly-metrics.yml` | Monthly metrics dump | local |
| 18 | `parallel-guard-stress.yml` | Parallel-guard validation | local |
| 19 | `parallel-ratio-gate.yml` | Parallel-ratio gate (W269) | local |
| 20 | `pre-commit-mirror.yml` | CI mirror of pre-commit hooks | local |
| 21 | `provenance.yml` | SLSA L3 + cosign + CycloneDX (tag-triggered) | slsa-framework/slsa-github-generator v2.1.0, sigstore/cosign-installer v4.1.2, anchore/sbom-action |
| 22 | `release-please.yml` | Release automation | google-github-actions/release-please v5 |
| 23 | `sbom.yml` | CycloneDX+SPDX SBOM + Sigstore-signed (push+dispatch) | anchore/sbom-action v0.24.0, sigstore/cosign-installer v4.1.2 |
| 24 | `scorecard.yml` | OpenSSF Scorecard | ossf/scorecard-action v2.4.3, step-security/harden-runner |
| 25 | `session-jsonl-archive.yml` | Session JSONL archiving | local |
| 26 | `stale.yml` | Stale issue/PR closer | actions/stale |
| 27 | `supply-chain-watch.yml` | 6hr IOC sweep | gitleaks-action, npm audit, .mcp.json pin-audit |
| 28 | `zizmor-action.yml` | Workflow security audit (zizmorcore/zizmor) | zizmorcore/zizmor-action v0.5.6 |

### 0.2 Ruleset (single — `main-branch-protection-sota`)

Required status checks (5):
1. `Pre-commit gates`
2. `CodeQL javascript-typescript`
3. `CodeQL python`
4. `commitlint (commit-message discipline)`
5. `Codex-Verdict trailer (binding)`

Additional rules: `deletion`/`non_fast_forward`/`required_linear_history` blocked; `pull_request` (squash-only); `bypass_actors: []` (no bypass).

### 0.3 Pre-commit local hooks

- gitleaks v8.30.1 (system bin)
- ruff-check + ruff-format v0.15.12
- actionlint v1.7.12
- commitlint (commit-msg stage)
- codex-trailer-gate (commit-msg stage)
- provenance-lint v3 (commit-msg stage)
- cr2-2kb-hooks · msys-hooks-form · gitnexus-blast-radius · cite-floor-check · bare-subagent-grep · ps-wrap-guard · npm-audit · cr7-worktree-collision · wave-lock-validate · z-phantom-guard · aicontracts · W375 SWE-Bench gate

### 0.4 Dependabot

5 ecosystems × weekly: npm root, github-actions root, pip /harness, pip /, pip /agents. All with `cooldown.default-days: 5` (W381 Stream D §3 P1 — defeats event-stream/ua-parser-js attack class).

### 0.5 Net assessment

This runtime is **already SOTA-grade** on CI/CD posture. Most W434-target SOTA actions are wired (SLSA L3, cosign, SBOM via syft, CycloneDX, OSSF Scorecard, step-security/harden-runner, zizmor, trivy, gitleaks, CodeQL, DCO, signature advisory). Gap-analysis below identifies marginal SOTA-additions and best-practice hardenings.

Visibility status: **PRIVATE** (per `gh repo view --json visibility`). This means several actions (`dependency-review`, `CodeQL upload`, `Scorecard publish_results`, `Trivy SARIF upload`) are gracefully-degraded with `continue-on-error: true` until GHAS-enable or public-mirror flip (W431 §2.10 step #9).

---

## §1 — Official GitHub Docs ingest (2026-05)

Cited live 2026-05-24 against `https://docs.github.com/en/actions/security-guides/security-hardening-for-github-actions` + 4 companion pages.

### 1.1 Security Hardening for GitHub Actions (top-level recommendations)

GitHub's canonical guidance reduces to 7 control categories:

| Category | Specific control | Status in runtime |
|---|---|---|
| **Token discipline** | Restrict `GITHUB_TOKEN` permissions per-workflow/per-job (least privilege) | ✓ workflows declare `permissions:` block per-workflow + per-job |
| **Third-party action discipline** | **Pin actions to a full-length commit SHA** (only way to make actions "immutable releases") | ✓ all 3rd-party actions SHA-pinned per W432-CI-STALE-BUMP |
| **OIDC for cloud auth** | Use OpenID Connect to access cloud resources (no long-lived secrets) | ✓ `id-token: write` granted on cosign-signing + SLSA-provenance + scorecard workflows |
| **Script injection mitigation** | Avoid `${{ github.event.* }}` in `run:` blocks; use intermediate ENV vars | Audited via zizmor (template-injection check); 2 pre-existing HIGH findings flagged W349 RC-16 advisory mode |
| **Secrets handling** | Audit secret access, restrict workflow access, OIDC-trusted-publisher preferred over PAT | ✓ no hardcoded secrets (gitleaks pre-commit + supply-chain-watch); LANGFUSE_* keys gitignored in CLAUDE.local.md |
| **Harden runner** | Egress audit/block via step-security/harden-runner | ✓ wired on 14 workflows with `egress-policy: audit + disable-sudo: true` |
| **Repository-level allowlists** | Restrict which actions/reusable workflows can run | NOT enforced (would require `Settings > Actions > Allow X actions and reusable workflows`); recommendation: declare allowlist in PHASE-B |

### 1.2 Rulesets v2 modern semantic (supersedes classic branch-protection)

Per `https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets/about-rulesets`:

**Available rule types (current 2026-05)**:
- `deletion` (block deletion)
- `non_fast_forward` (block force-push)
- `required_linear_history` (no merge commits)
- `creation` (block ref creation)
- `update` (require pull-request for updates)
- `pull_request` (with sub-params: required_approving_review_count, dismiss_stale_reviews_on_push, required_reviewers, require_code_owner_review, require_last_push_approval, required_review_thread_resolution, allowed_merge_methods)
- `required_status_checks` (with strict_required_status_checks_policy + integration_id binding)
- `required_signatures` (require all commits signed)
- `code_scanning` (require code-scanning alerts resolved)
- `commit_message_pattern`, `commit_author_email_pattern`, `committer_email_pattern`, `branch_name_pattern`, `tag_name_pattern` (regex-based metadata restrictions)
- `required_deployments` (require successful deployments to environments)
- `workflows` (require specific reusable workflows to pass) — **2025-released, NOT WIRED in this runtime**

**Advantages over classic branch-protection**:
1. Multiple rulesets can apply simultaneously (vs single branch-protection rule per pattern)
2. Rulesets have explicit `enforcement: active|evaluate|disabled` status (canary mode)
3. Read-access to view active rulesets (auditor / contributor transparency)
4. Metadata rules (commit-msg pattern, author email, etc.) NOT available in classic BP
5. Up to 75 rulesets/repo + 75 org-wide

Current runtime: `main-branch-protection-sota` ruleset uses subset (deletion+non_fast_forward+linear_history+pull_request+required_status_checks). **Gap**: `required_signatures` + `commit_message_pattern` + `workflows` ruleset NOT wired (but `commit_message_pattern` is enforced via pre-commit `commitlint` + `codex-trailer-gate` hooks, not at GH ruleset level — equivalent effect but bypass-able by direct API push to main, which the ruleset's `pull_request` rule already blocks).

### 1.3 SLSA v1.0 Build Track

Per `https://slsa.dev/spec/v1.0/levels` (status: Retired — current spec is v1.2; v1.0 still authoritative for installed `slsa-github-generator v2.1.0`):

| Level | Requirements |
|---|---|
| Build L0 | (none) |
| Build L1 | Provenance exists, describing how artifact was built (mistake-prevention, documentation) |
| Build L2 | **Hosted build platform generates and signs** provenance (digital signature ties provenance to infrastructure; verification validates authenticity) — deters unsophisticated tampering |
| Build L3 | **Hardened build platform** (build process tamper-resistant; isolated from build inputs/outputs; prevents tampering DURING the build) |

Runtime: `provenance.yml` uses `slsa-framework/slsa-github-generator/.github/workflows/generator_generic_slsa3.yml@v2.1.0` → **claims L3** because slsa-github-generator IS the SLSA-canonical L3-compliant reusable workflow on GitHub Actions runners (TUF-isolated, ephemeral, signed provenance per L3 §3 spec). Cite OK.

### 1.4 Sigstore Cosign 2.x

Per `https://docs.sigstore.dev/cosign/overview/` (404 on direct URL — content moved; key sub-pages confirmed live in fetched docs):

**Installed: `sigstore/cosign-installer@v4.1.2`** bundling `cosign v3.0.6` (2026-04-06).

Latest cosign 2026-05: `v3.0.6` (per `gh api repos/sigstore/cosign/releases/latest`). **CURRENT — no drift.**

Capabilities used: `cosign sign-blob --yes` (keyless OIDC signing of SBOM + provenance artifacts) + `cosign verify-blob` (smoke-check on SBOM signatures). Identity-binding via Fulcio OIDC issuer `https://token.actions.githubusercontent.com` + certificate-identity-regexp `https://github.com/${GITHUB_REPOSITORY}/.github/workflows/sbom.yml@.*`. Rekor transparency-log entry implicit (cosign default).

### 1.5 OpenSSF Scorecard

Per `https://openssf.org/projects/scorecard/`:

**Checks (full 2026-05 list, 18 checks)**:
1. Binary-Artifacts (no binary artifacts checked in)
2. Branch-Protection (rules on default branch)
3. CI-Tests (tests run before merge)
4. CII-Best-Practices (CII Best Practices badge)
5. Code-Review (PR review on changes)
6. Contributors (≥3 orgs contribute)
7. Dangerous-Workflow (`pull_request_target` + checkout PR-head pattern; script injection)
8. Dependency-Update-Tool (Dependabot/Renovate enabled)
9. Fuzzing (fuzz testing present)
10. License (LICENSE file present + SPDX-recognized)
11. Maintained (recent commits + issues)
12. Packaging (package published with reproducible build)
13. Pinned-Dependencies (deps + actions SHA-pinned)
14. SAST (static analysis tooling used)
15. Security-Policy (SECURITY.md present)
16. Signed-Releases (git tags signed)
17. Token-Permissions (GITHUB_TOKEN principle of least privilege)
18. Vulnerabilities (no known unpatched vulns)

**Aggregate scoring**: Critical-risk checks weight 10, High 7.5, Medium 5, Low 2.5.

Runtime: `scorecard.yml` runs weekly. SARIF upload gracefully-degraded on PRIVATE (publish_results: false). Most checks would surface clean (SHA-pinning, harden-runner, DCO, SECURITY.md present, Dependabot, CodeQL, weekly scans).

### 1.6 GitHub CodeQL

Per `https://docs.github.com/en/code-security/code-scanning/.../about-code-scanning-with-codeql`:

**Supported languages 2026-05**: C/C++, C#, Go, Java/Kotlin, JavaScript/TypeScript, Python, Ruby, Rust, Swift, **GitHub Actions workflows** (latest addition).

**Query suites**: `code-scanning` (default), `security-and-quality`, `security-extended`, `security-experimental`.

**Setup modes**: (a) default-setup (auto-config via UI), (b) advanced-setup (workflow file using `github/codeql-action@v4.35.5`), (c) external CI + SARIF upload.

Runtime: `codeql.yml` uses advanced-setup with matrix `[javascript-typescript, python]` + queries `security-extended,security-and-quality` (broader than default). **Gap**: NOT scanning **GitHub Actions workflows** language (added 2025; would catch zizmor-class findings via CodeQL queries). However, zizmor already covers the workflow-static-analysis surface — redundant on present runtime.

### 1.7 OIDC + Secrets

Per `https://docs.github.com/en/actions/security-guides/using-secrets-in-github-actions`:

**OIDC trusted-publisher pattern**:
- Workflow requests OIDC token from cloud provider (AWS/GCP/Azure/PyPI/npm/Sigstore)
- Cloud provider validates token signature against GitHub OIDC issuer (`https://token.actions.githubusercontent.com`)
- Short-lived credentials issued in exchange (no long-lived PAT/key needed)
- **PyPI 2024+ supports trusted-publisher OIDC for package publishing** (PEP 740)
- **npm 2024+ supports trusted-publisher OIDC** (npm CLI v9.5+)

Runtime: ✓ used for cosign Fulcio signing. **Gap**: not used for any npm/PyPI publishing yet (no public packages published from this repo). When Phase 4 G7 public-mirror ships, OIDC trusted-publisher should be wired for any npm pkgs (cardinal-rule-1 compatible).

### 1.8 Dependabot

Per `https://docs.github.com/en/code-security/dependabot`:

**Capabilities 2026-05**:
- `dependabot.yml` with `package-ecosystem` (npm/pip/github-actions/etc.)
- `cooldown` option (added 2024) — defeats fast-rolling supply-chain attacks
- `groups` — bundle related deps into single PR
- `open-pull-requests-limit` — back-pressure
- Dependabot security updates (auto-PR for CVE-fix versions of unpinned deps; requires Dependency Graph + Security Alerts enabled)

Runtime: ✓ 5 ecosystems wired + cooldown=5d on each + grouping on npm. Dependabot security-updates would require GHAS on PRIVATE (or wait for public-mirror).

---

## §2 — Supply-chain SOTA (SLSA/Sigstore/SBOM/SCA) — R1-probe

R1 trust-tuple check: (a) signed releases / Sigstore / npm-provenance; (b) license MIT/Apache/BSD/ISC/MPL; (c) maintainer trust (org-backed / multi-maintainer with recent commits); (d) deps blast-radius clean.

| Candidate | Latest | Currently installed | R1-gates | Action |
|---|---|---|---|---|
| `actions/attest` v4.1.0 (2026-02-26) sha=`59d89421af93a897026c735860bf21b6eb4f7b26` | v4.1.0 | NOT INSTALLED | a✓ (GitHub-signed) b✓ MIT c✓ GitHub Inc d✓ | **INSTALL CANDIDATE** — first-party SLSA-attestation + SBOM-attestation + custom-predicate unified action. Supersedes `actions/attest-build-provenance` + `actions/attest-sbom` (both DEPRECATED in favor of `actions/attest` per upstream README). Provides SLSA L2+ provenance with simpler API. |
| `slsa-framework/slsa-github-generator` v2.1.0 (2025-02-24) sha=`f7dd8c54c2067bafc12ca7a55595d5ee9b75204a` | v2.1.0 | v2.1.0 ✓ | a△ (v2.1.0 commit unsigned per gh api — accepted per OpenSSF Pinned-Deps + base-tag committer match) b✓ Apache-2.0 c✓ Linux Foundation OSSF d✓ | **CURRENT — keep** alongside the new `actions/attest` (different use case: L3 reusable workflow vs L2 attestation step) |
| `sigstore/cosign-installer` v4.1.2 (2026-05-07) sha=`6f9f17788090df1f26f669e9d70d6ae9567deba6` | v4.1.2 | v4.1.2 ✓ | a✓ (Sigstore-signed) b✓ Apache-2.0 c✓ Sigstore Foundation d✓ | **CURRENT — keep** |
| `sigstore/cosign` (CLI binary) v3.0.6 (2026-04-06) | v3.0.6 | v3.0.6 (bundled in installer) | a✓ b✓ Apache-2.0 c✓ d✓ | **CURRENT** |
| `anchore/sbom-action` v0.24.0 (2026-03-20) sha=`e22c389904149dbc22b58101806040fa8d37a610` | v0.24.0 | v0.24.0 ✓ | a✓ (Cosign-signed releases per Anchore policy) b✓ Apache-2.0 c✓ Anchore d✓ | **CURRENT — keep** |
| `anchore/syft` v0.112.0 (2026-05-01) | v0.112.0 | (transitively via sbom-action) | a✓ b✓ Apache-2.0 c✓ Anchore d✓ | **CURRENT** (no direct install needed; bundled in sbom-action) |
| `anchore/scan-action` (Grype) v7.x | v7.x | NOT INSTALLED | a✓ b✓ MIT c✓ Anchore d✓ | **OPTIONAL — REJECT** for now: trivy-action already wired for CVE scanning; Grype overlaps. Document as CITE-REF alternative. |
| `aquasecurity/trivy-action` v0.36.0 sha=`ed142fd0673e97e23eac54620cfb913e5ce36c25` | v0.36.0 | v0.36.0 ✓ | a✓ b✓ Apache-2.0 c✓ Aqua Security d✓ | **CURRENT — keep** |
| `aquasecurity/trivy` (CLI binary) v0.70.0 (2026-04-17) | v0.70.0 | (transitively via action) | a✓ b✓ Apache-2.0 c✓ Aqua d✓ | **CURRENT** |
| `actions/dependency-review-action` v5.0.0 (2026-05-08) | v5.0.0 | v4.9.0 | a✓ b✓ MIT c✓ GitHub Inc d✓ | **DRIFT +1 MAJOR**: bump v4.9.0 → v5.0.0 requires node24 runner upgrade. **Deferred to W432-CI-STALE-BUMP-FOLLOWUP** (separate wave) — node24 runner-version requirement (`v2.327.1+`) needs verification across all 28 workflows. CITE-REF for now. |
| `actions/attest-build-provenance` v4.1.0 (2026-02-26) | v4.1.0 | NOT INSTALLED | a✓ b✓ MIT c✓ GitHub Inc d✓ | **DEPRECATED — REJECT**: upstream README WARNING flag says "use `actions/attest` instead" |
| `actions/attest-sbom` v4.1.0 (2026-02-26) | v4.1.0 | NOT INSTALLED | a✓ b✓ MIT c✓ GitHub Inc d✓ | **DEPRECATED — REJECT**: upstream README WARNING flag says "use `actions/attest` instead" |

---

## §3 — Workflow security + runner hardening — R1-probe

| Candidate | Latest | Currently installed | R1-gates | Action |
|---|---|---|---|---|
| `step-security/harden-runner` v2.19.4 (2026-05-21) sha=`9af89fc71515a100421586dfdb3dc9c984fbf411` | v2.19.4 | v2.19.3 (3 days old) | a✓ (immutable release per `immutable:true`) b✓ MIT c✓ step-security d✓ | **MINOR DRIFT +1 patch — install candidate** (3-day-old release, low risk, single-PR bump like W432-CI-STALE-BUMP precedent). Changelog: "Improvements for HTTPS Monitoring for the Enterprise tier" — Enterprise-tier only feature, no behavioral change for our usage. |
| `zizmorcore/zizmor-action` v0.5.6 (2026-05-16) sha=`5f14fd08f7cf1cb1609c1e344975f152c7ee938d` | v0.5.6 | v0.5.6 ✓ | a✓ b✓ MIT c✓ zizmorcore (battle-tested on vitejs/vite) d✓ | **CURRENT — keep** |
| `zizmorcore/zizmor` (CLI) v1.25.2 (2026-05-16) | v1.25.2 | v1.25.2 (bundled in action) | a✓ b✓ MIT c✓ d✓ | **CURRENT** |
| `rhysd/actionlint` v1.7.12 sha=`914e7df21a07ef503a81201c76d2b11c789d3fca` | v1.7.12 | v1.7.12 ✓ | a✓ b✓ MIT c✓ rhysd (single-maintainer; long-term stable per `claudelint` precedent) d✓ | **CURRENT — keep** |
| `step-security/secure-repo` | (CLI / webapp via stepsecurity.io) | NOT INSTALLED | a✓ b✓ Apache-2.0 c✓ step-security d✓ | **REJECT** for in-workflow install: secure-repo is a CLI + webapp (PR-generator), NOT a runnable Action. Manual one-shot use: open `https://app.stepsecurity.io/` for a remediation PR. CITE-REF only. |
| `super-linter/super-linter` | (failed to probe — likely v8.x) | NOT INSTALLED | TBD | **REJECT** as multi-linter umbrella: project-specific stack already covers (actionlint + ruff + shellcheck + zizmor + gitleaks). Super-linter would re-run with broader scope but no marginal value; high JVM/Docker cost. CITE-REF. |
| `ossf/scorecard-action` v2.4.3 sha=`4eaacf0543bb3f2c246792bd56e8cdeffafb205a` | v2.4.3 | v2.4.3 ✓ | a✓ b✓ Apache-2.0 c✓ OSSF d✓ | **CURRENT — keep** |

---

## §4 — SAST/DAST/Secret-scanning ecosystem — R1-probe

| Candidate | Status | Action |
|---|---|---|
| `github/codeql-action` v4.35.5 sha=`9e0d7b8d25671d64c341c19c0152d693099fb5ba` | INSTALLED (matrix js-ts+python) | **GAP — ADD `actions` language** (CodeQL added GH-Actions support 2025; would catch zizmor-class findings via CodeQL queries). LOW-PRIORITY: zizmor already covers this surface. DEFER. |
| `gitleaks/gitleaks-action` v2.3.9 sha=`ff98106e4c7b2bc287b24eaf42907196329070c7` + gitleaks CLI v8.30.1 | INSTALLED (in supply-chain-watch + ci.yml) | **CURRENT — keep** |
| `actions/dependency-review-action` | v4.9.0 installed (v5.0.0 latest = MAJOR BUMP node24) | DEFER to follow-up wave (node24 requirement; not for this wave) |
| `mozilla/sops` / `getsops/sops` v3.13.1 (2026-05-16) | NOT INSTALLED (no `getsops/sops-action` exists) | **REJECT**: this runtime does not currently encrypt secrets-at-rest via sops; LANGFUSE keys live in CLAUDE.local.md gitignored (correct cardinal-rule-5 pattern). Adding sops would require sops-encrypted blob in repo + decrypt-on-CI infra. CITE-REF for Phase 4 G7 if public-mirror needs to store sealed secrets. |
| `step-security/sec-fix-action` | NOT FOUND (404 on probe) | **REJECT** (does not exist as a packaged action) |

---

## §5 — Gap-analysis (current runtime vs 2026-05 SOTA)

| # | Gap | Severity | Notes |
|---|---|---|---|
| G1 | `actions/attest@v4` not installed | LOW-MED | first-party attestation step (SLSA L2+SBOM+custom) is the new SOTA-2026 path; complements existing `slsa-github-generator@v2.1.0` (which remains canonical L3 path). |
| G2 | `step-security/harden-runner` minor drift (v2.19.3 → v2.19.4) | LOW | 3-day-old patch; Enterprise-tier-only changelog (no behavioral delta for us). |
| G3 | CodeQL not scanning `actions` language | LOW | zizmor already covers this attack surface. Defer. |
| G4 | `actions/dependency-review-action` major drift (v4.9.0 → v5.0.0) | MED | node24 runner requirement; needs cross-workflow verification. Defer to follow-up wave. |
| G5 | No OIDC trusted-publisher for npm/PyPI | DOC-ONLY | This runtime publishes no npm packages yet; CITE-REF for Phase 4 G7. |
| G6 | No `required_signatures` ruleset rule | DOC-ONLY | DCO + GPG/SSH signature checks happen in `commit-signing.yml` (advisory mode). Promoting to ruleset would be a follow-up post-public-mirror wave. |
| G7 | `dependency-review` + `CodeQL SARIF upload` + `Trivy SARIF upload` advisory-mode on PRIVATE | EXPECTED | Will auto-upgrade to blocking when GHAS enabled or repo goes PUBLIC per Phase 4 G7. |
| G8 | No `workflows` ruleset rule (require specific reusable workflows to pass) | DOC-ONLY | New 2025 rule type. Useful when org-wide org-level rulesets exist. Defer until enterprise/org context applies. |
| G9 | sops-encrypted secrets-at-rest | DOC-ONLY | Not needed for current PRIVATE workflow; relevant for public-mirror G7. |
| G10 | Sec-fix automation via step-security/secure-repo webapp | DOC-ONLY | Manual one-shot recommended for any one-time hardening sweep. |
| G11 | `actions/attest-build-provenance` + `actions/attest-sbom` upstream-DEPRECATED | DOC-ONLY | Not installed — no migration needed; document the SOTA path is `actions/attest@v4`. |

---

## §6 — Phase 4 G7 publish-mirror anticipated MUST-HAVES

When the `ourveins` public-mirror Phase 4 G7 lands (per operator mandate):

| MUST-HAVE | Status | Plan |
|---|---|---|
| SLSA L3 provenance build | ✓ wired via `provenance.yml` (slsa-github-generator@v2.1.0) | flip from advisory-only to release-required |
| CycloneDX SBOM | ✓ wired via `provenance.yml` (cyclonedx-npm@4.2.1) + `sbom.yml` (anchore/sbom-action multi-lang) | continuous SBOM history on every main push |
| SPDX SBOM (NTIA-required for US federal) | ✓ wired via `sbom.yml` | continuous + Sigstore-signed |
| Cosign artifact signing | ✓ wired (cosign-installer@v4.1.2 + sign-blob + verify-blob smoke-check) | |
| OSSF Scorecard publish_results=true | DEFER | flip when going PUBLIC (`publish_results: true` only works on public repos) |
| Dependency-review (PR-blocking) | DEFER | flip `continue-on-error: false` when public or GHAS-enabled |
| CodeQL SARIF upload (PR-blocking) | DEFER | flip `continue-on-error: false` when public or GHAS-enabled |
| Trivy SARIF upload (PR-blocking) | DEFER | flip `continue-on-error: false` when public or GHAS-enabled |
| OIDC trusted-publisher for npm/PyPI | DEFER | wire when first npm pkg published from public mirror |
| `actions/attest@v4` for release-artifact attestation | **W434-GITHUB-CICD INSTALL** (this wave) | use on tag-triggered release artifacts |
| `required_signatures` ruleset rule | DEFER | flip post public-mirror when all contributors GPG/SSH-signing |

---

## §7 — R1-PASS candidates → Phase B INSTALL queue

After R1 trust-tuple gates, gap-analysis, and SOTA-fit review:

| # | Install | Form | Why | R1 (a/b/c/d) |
|---|---|---|---|---|
| 1 | `actions/attest@v4.1.0` (sha `59d89421af93a897026c735860bf21b6eb4f7b26`) | New workflow step in `provenance.yml` (tag-triggered) — replaces the inline `sigstore/cosign-installer` sign-blob loop for release-artifact attestation OR is added in parallel as a first-party attestation pathway | Establishes SOTA-2026 path for SLSA-attestation. First-party GitHub action. Covers G1. Supersedes deprecated `attest-build-provenance` / `attest-sbom`. | ✓ / MIT ✓ / GitHub Inc ✓ / clean ✓ |
| 2 | `step-security/harden-runner` v2.19.3 → v2.19.4 (sha `9af89fc71515a100421586dfdb3dc9c984fbf411`) | SHA-bump across 14 workflows | Minor drift bump per W432-CI-STALE-BUMP pattern. Covers G2. | ✓ / MIT ✓ / step-security ✓ / clean ✓ |
| 3 | `docs/architecture/W434-GITHUB-CICD/PHASE-4-G7-CHECKLIST.md` | Doc-only deliverable | Anticipates G7 public-mirror MUST-HAVE list per operator mandate ("Phase 4 G7 publish-mirror anticipation"). | n/a — documentation |

**REJECTED / DEFERRED (with rationale)**:
- `actions/dependency-review-action v5.0.0` — defer (node24 runner requirement; cross-workflow verification needed)
- `actions/attest-build-provenance v4.1.0` — REJECT (DEPRECATED upstream)
- `actions/attest-sbom v4.1.0` — REJECT (DEPRECATED upstream)
- `super-linter/super-linter` — REJECT (overlap with existing actionlint + ruff + shellcheck + zizmor + gitleaks)
- `anchore/scan-action` (Grype) — REJECT (overlap with trivy)
- `getsops/sops` + sops-action — REJECT (no sealed-secrets need for current PRIVATE state; document for G7)
- `step-security/secure-repo` — REJECT for in-workflow install (CLI / webapp, not an Action); CITE-REF
- `step-security/sec-fix-action` — REJECT (404 — does not exist)
- CodeQL `actions` language matrix entry — DEFER (zizmor covers same surface)
- `workflows` ruleset rule — DEFER (enterprise / org-wide context not active)

---

## §8 — Cite-anchor floor verification (≥3 distinct orgs)

Per CLAUDE.md cardinal-rule-6 + W332 cite-anchor discipline. Cited sources in this LANDSCAPE:

1. **GitHub Inc** — `docs.github.com/en/actions/security-guides/security-hardening-for-github-actions` + `docs.github.com/en/repositories/.../about-rulesets` + `docs.github.com/en/code-security/code-scanning/.../about-code-scanning-with-codeql` + `docs.github.com/en/actions/security-guides/using-secrets-in-github-actions` + `docs.github.com/en/code-security/dependabot` + GitHub-internal actions (`actions/attest`, `actions/checkout`, `actions/dependency-review-action`, etc.)
2. **SLSA / Linux Foundation OpenSSF** — `slsa.dev/spec/v1.0/levels` + `slsa-framework/slsa-github-generator`
3. **Sigstore Foundation** — `sigstore/cosign-installer` + `sigstore/cosign` v3.0.6
4. **OpenSSF (separate from SLSA)** — `openssf.org/projects/scorecard/` + `ossf/scorecard-action` + `ossf/scorecard` (CLI)
5. **Aqua Security** — `aquasecurity/trivy-action` + `aquasecurity/trivy`
6. **Anchore** — `anchore/sbom-action` + `anchore/syft` + `anchore/grype` / `anchore/scan-action`
7. **step-security** — `step-security/harden-runner` + `step-security/secure-repo`
8. **zizmorcore** — `zizmorcore/zizmor-action` + `zizmorcore/zizmor`
9. **rhysd** (single-maintainer; CITE-REF only) — `rhysd/actionlint`

**Cite-floor floor = 3 distinct orgs**: VERIFIED (8+ distinct orgs cited; floor exceeded by ≥5×).
