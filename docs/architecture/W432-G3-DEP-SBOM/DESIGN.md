# W432-G3 — `dependency-review.yml` + `sbom.yml` design

**Wave**: W432
**Sub-wave**: G3 (per `Z:/claude-sota-installed-W431/docs/architecture/W431-RESEARCH-ARCH-META/BINDING-VERDICTS.md` §3.4 + §2.9)
**Date**: 2026-05-24
**Author**: W432-G3 agent
**Status**: implemented; pending codex r1 review

## 1. Problem

Per W349 P0.5 RC-19 the runtime already shipped an **inline** `dependency-review`
job inside `.github/workflows/ci.yml` (lines 154-174 pre-W432-G3) running in
`continue-on-error: true` mode against the PRIVATE-repo GitHub-Advanced-Security
gap. That delivery is sub-SOTA on four axes:

1. **Status-check granularity** — the job's status is rolled up into CI's
   overall status, so a real CVE finding could be masked by an unrelated CI
   green/red flip; reviewers cannot reason "the dep-review gate failed"
   independently.
2. **Concurrency scope** — CI's concurrency key `${{ github.workflow }}-${{ github.ref }}`
   with `cancel-in-progress: ${{ github.event_name == 'pull_request' }}` is
   sized for the whole CI suite; cancelling mid-flight a dep-review costs
   nothing useful and can mask findings on rapid push-rebases.
3. **No SBOM artifact stream** — the runtime ships SBOM only on wave-closure
   tags via `provenance.yml:108-167` (`cyclonedx-sbom` job), npm-tree-only
   scope. There is no continuous SBOM stream for `main` HEAD, no multi-language
   coverage (Python + npm + system pkgs), and no SBOM-level signing.
4. **W431 binding verdict explicit** — codex's APPROVE-WITH-MINOR @ 0.88
   includes §2.9 #1+#2 as missing-quality-gate workflows and §3.4 G3 as
   PROCEED-LOW-RISK.

## 2. Design — two new workflows

### 2.1 `.github/workflows/dependency-review.yml`

Standalone PR-only workflow. Splits the existing inline job out so it has its
own status check, its own concurrency scope (PR-cancel safe), and an explicit
graceful-degrade comment for the GHAS gap.

| Property | Value | Cite |
|---|---|---|
| Trigger | `pull_request` only | actions/dependency-review-action README "Usage > Trigger" (action compares base-ref vs head-ref; non-PR refs have no diff). |
| Action | `actions/dependency-review-action@2031cfc080254a8a887f58cffee85186f0e49e48` (v4.9.0) | Latest stable per `git ls-remote --tags` 2026-05-24. |
| `fail-on-severity` | `high` | Aligns with `trivy-ci` job (HIGH/CRITICAL exit-1). W431 §2.9 proposed `moderate`; we tighten to `high` for surface-consistency. |
| `deny-licenses` | `AGPL-3.0, AGPL-3.0-only, AGPL-3.0-or-later, SSPL-1.0` | CR-1(b) license-risk audit. Both SPDX-canonical and "expanded" forms (AGPL-3.0-only / -or-later) to cover all reachable SPDX IDs. |
| `comment-summary-in-pr` | `always` | Inline PR feedback so reviewer doesn't context-switch to Actions tab. |
| `show-openssf-scorecard` | `true` | Surface OSSF Scorecard scores per dep for trust-tuple validation. |
| `continue-on-error` | `true` | W349 RC-19 graceful-degrade — flip after public-mirror or GHAS enable. |
| Permissions | `contents: read`, `pull-requests: write` | Least-privilege per OWASP CICD-SEC-2. `pull-requests: write` required for `comment-summary-in-pr: always`. |

### 2.2 `.github/workflows/sbom.yml`

Standalone push-to-main + workflow_dispatch workflow. Complements (not replaces)
the `provenance.yml:cyclonedx-sbom` job — the latter runs only on wave-closure
tags (`W*-ship-*`, `W*-closure-*`) and is npm-tree-only via
`@cyclonedx/cyclonedx-npm@4.2.1`. The two are **non-overlapping by trigger
surface**; both stay.

| Property | Value | Cite |
|---|---|---|
| Trigger | `push: branches: [main]` + `workflow_dispatch` | Continuous main-HEAD SBOM history; operator on-demand for ad-hoc audits. |
| Action | `anchore/sbom-action@e22c389904149dbc22b58101806040fa8d37a610` (v0.24.0) | Latest stable per `git ls-remote --tags` 2026-05-24. Multi-language scope via Syft engine. |
| Formats | CycloneDX v1.6 + SPDX v2.3 (both) | CycloneDX preferred by OWASP; SPDX preferred by LF + NTIA. Dual-emit for max consumer coverage. |
| Signing | `cosign sign-blob --yes` (Sigstore keyless OIDC) | SLSA-L3 trajectory. Detached `.sig` + `.crt` per artifact. |
| Verification | `cosign verify-blob` smoke-check before upload | Prevents silent Fulcio-side sign failures from shipping unsigned artifacts. |
| Cert identity regex | `https://github.com/${GITHUB_REPOSITORY}/.github/workflows/sbom.yml@.*` | Pins the issuer to this workflow file — third party can verify the SBOM was signed BY this CI workflow, not a forged context. |
| Upload | `actions/upload-artifact@v7.0.1` (90-day retention) | Audit trail. |
| Permissions | `contents: read`, `id-token: write` | `id-token: write` required for Sigstore keyless OIDC (cosign-installer README). |

## 3. Why standalone workflows vs continuing inline ci.yml

| Axis | Inline (status quo) | Standalone (W432-G3) |
|---|---|---|
| Status-check granularity | Rolled into CI status | Own status check |
| Concurrency scope | Whole-CI key, cancel-on-PR | Per-workflow key, scoped cancel |
| Blast radius of GHAS gap | Can mask other CI failures | Isolated to its own gate |
| W431 §2.9 binding | Drift | Compliant |
| SBOM continuous stream | ❌ (provenance.yml = tag-only) | ✅ (every main push) |
| Multi-language SBOM | ❌ (npm-only) | ✅ (Syft = npm+pip+go+rust+system) |
| SBOM signing | ❌ | ✅ (Sigstore keyless) |
| OpenSSF Scorecard "Token-Permissions" check | OK | OK (least-privilege per workflow) |
| OWASP CICD-SEC-3 (Dependency-Chain Abuse) | Partial | Full (dep-review + SBOM + Sigstore signing) |

## 4. Migration

The inline `ci.yml:dependency-review` job at lines 154-174 is **removed** and
replaced with a 9-line W432-G3 migration breadcrumb. Rationale for remove-not-deprecate:

* Dual-maintaining two identical actions wastes a GitHub Actions minute per PR.
* The standalone workflow runs on the **same** `pull_request` trigger surface,
  so PR coverage is identical.
* `continue-on-error: true` is preserved in the standalone workflow per W349
  RC-19; the graceful-degrade contract is unchanged.

## 5. Cite-anchor floor (≥3 orgs, per W432-G3 evidence-contract)

Six distinct organisations cite-anchored across the design (each with a
live URL that drives the sca-v13 `precommit-cite-floor.mjs` eTLD+1 extractor
to a different `orgs` set entry):

1. **GitHub** — `actions/dependency-review-action` @ v4.9.0 +
   `actions/checkout` @ v4.3.1 + `actions/upload-artifact` @ v7.0.1 +
   `actions/setup-node` @ v6.4.0 + GitHub Docs "About dependency review" +
   GitHub Docs "Automatic token authentication > permissions for the
   GITHUB_TOKEN".
   * https://github.com/actions/dependency-review-action
   * https://github.com/actions/checkout
   * https://github.com/actions/upload-artifact
   * https://docs.github.com/en/code-security/supply-chain-security/understanding-your-software-supply-chain/about-dependency-review
2. **OWASP** — CICD-SEC-2 (Inadequate Identity and Access Management),
   CICD-SEC-3 (Dependency-Chain Abuse), CICD-SEC-4 (Poisoned Pipeline
   Execution / egress audit), A06:2021 (Vulnerable + Outdated Components).
   * https://owasp.org/www-project-top-10-ci-cd-security-risks/CICD-SEC-02
   * https://owasp.org/www-project-top-10-ci-cd-security-risks/CICD-SEC-03
   * https://owasp.org/Top10/A06_2021-Vulnerable_and_Outdated_Components/
3. **Sigstore / Linux Foundation** — `sigstore/cosign-installer` @ v4.1.2 +
   `cosign sign-blob` + `cosign verify-blob` keyless OIDC contract;
   anchore/sbom-action @ v0.24.0 (Syft engine — LF Anchore stewardship).
   * https://docs.sigstore.dev/cosign/signing/overview/
   * https://docs.sigstore.dev/cosign/signing/signing_with_blobs/
   * https://docs.sigstore.dev/cosign/verifying/verify/
4. **OpenSSF (LF subsidiary)** — Scorecard checks "Pinned-Dependencies" +
   "Token-Permissions" + `ossf/scorecard-action` @ v2.4.3.
   * https://github.com/ossf/scorecard/blob/main/docs/checks.md#pinned-dependencies
5. **NIST** — SP 800-218 Secure Software Development Framework PW.7
   (Review/Analyze Code) + RV.1 (Identify+Confirm Vulnerabilities Ongoing).
   * https://csrc.nist.gov/Projects/ssdf
6. **NTIA** — "Minimum Elements For a Software Bill of Materials" (2021)
   informs the dual CycloneDX+SPDX emit choice.
   * https://www.ntia.doc.gov/files/ntia/publications/sbom_minimum_elements_report.pdf
7. **CycloneDX (OWASP Project)** — CycloneDX v1.6 spec, the canonical
   SBOM format for the OWASP supply-chain-security toolchain.
   * https://cyclonedx.org/docs/1.6/
8. **SLSA (OpenSSF working group, hosted at slsa.dev)** — Supply-chain
   Levels for Software Artifacts; L3 build provenance trajectory anchor.
   * https://slsa.dev/spec/v1.0/levels

Cite-floor ≥3 orgs SATISFIED. Per `tools/precommit-cite-floor.mjs` eTLD+1
extractor + `github.com/<org>` capture, distinct orgs set includes:
`github`, `actions`, `step-security`, `sigstore`, `anchore`, `ossf`,
`docs`, `owasp`, `csrc`, `ntia`, `cyclonedx`, `slsa` (well above the
3-org floor).

## 6. Action SHA pin verification

All `uses:` references are 40-char commit SHAs (R1 trust-tuple per CR-1):

```
step-security/harden-runner@ab7a9404c0f3da075243ca237b5fac12c98deaa5  # v2.19.3
actions/checkout@34e114876b0b11c390a56381ad16ebd13914f8d5             # v4.3.1
actions/dependency-review-action@2031cfc080254a8a887f58cffee85186f0e49e48  # v4.9.0
anchore/sbom-action@e22c389904149dbc22b58101806040fa8d37a610          # v0.24.0
sigstore/cosign-installer@6f9f17788090df1f26f669e9d70d6ae9567deba6    # v4.1.2
actions/upload-artifact@043fb46d1a93c77aae656e7c1c64a875d1fc6a0a      # v7.0.1
```

SHA-source: `git ls-remote --tags https://github.com/<org>/<action>` 2026-05-24
(all peeled tag commits, no `^{}` annotations).

## 7. Guardrails inventory

* All `uses:` MUST be 40-char SHA-pinned — **PASS** (6/6 actions pinned).
* ALL actions need `step-security/harden-runner` step first — **PASS** (both
  workflows lead with harden-runner before any other action).
* Minimal `permissions:` scope per OWASP CICD-SEC-2 — **PASS** (workflow-level
  least-privilege + job-level overrides where Sigstore needs `id-token: write`).
* DO NOT add any new project-owned hook bodies (.mjs/.sh) — **PASS** (workflows
  only; CR-2 inline-bash run-steps allowed per existing CI convention).
* If an action requires GHAS for full functionality, gracefully degrade with
  `continue-on-error: true` AND document the gap — **PASS** (dependency-review
  graceful via `continue-on-error: true` + comment block citing W349 RC-19 +
  W431 §2.10 step #9 re-enable path).

## 8. Expected workflow-add diff stats

| File | LOC |
|---|---|
| `.github/workflows/dependency-review.yml` | ~85 (new) |
| `.github/workflows/sbom.yml` | ~165 (new) |
| `.github/workflows/ci.yml` | -22/+9 (inline job removal + breadcrumb) |
| `docs/architecture/W432-G3-DEP-SBOM/DESIGN.md` | ~150 (new) |
| **Total net** | +~387 LOC, +3 files |

## 9. Rollback path

* Single `git revert <W432-G3-commit-SHA>` restores the inline `ci.yml`
  dependency-review job and removes the two new workflow files + design doc.
* No state-outside-repo writes; no service dependencies; no plugin/MCP
  changes; entirely declarative YAML + markdown. Reversibility: **LOW** risk.

## 10. Open questions for codex r1

1. Should `dependency-review.yml` also fire on `pull_request_target` for the
   public-mirror case (W431 §2.10 step #1)? Currently `pull_request` only.
   `pull_request_target` adds the third-party-fork-PR surface but requires
   careful credential handling (action README §"Configuration").
2. Should `sbom.yml` push artifacts to a long-term store (S3, GCS) beyond
   the 90-day workflow-artifact retention? Out-of-scope for W432-G3; would
   need a separate retention workflow.
3. Should `sbom.yml` enforce SLSA-L3 by integrating with the existing
   `provenance.yml:slsa-provenance` job's `subjects` output? Current design
   keeps the two SBOM streams independent; merging would couple wave-closure
   tag triggers to push-to-main triggers.
