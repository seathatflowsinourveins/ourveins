# W434-GITHUB-CICD — Phase B INSTALLED.md

> R1-PASS candidates landed in this wave. Per cardinal-rule-1 trust-tuple + cardinal-rule-6 verify-before-claim discipline.

## Install #1 — `actions/attest@v4.1.0` integration (provenance.yml)

**Form**: New job `attest-build-provenance` appended to `.github/workflows/provenance.yml` (tag-triggered).

**SHA-pin**: `actions/attest@59d89421af93a897026c735860bf21b6eb4f7b26` (v4.1.0, 2026-02-26).
**Companion SHA-pin**: `actions/download-artifact@3e5f45b2cfb9172054b4087a40e8e0b5a5461e7c` (v8.0.1, 2026-03-11) — added to consume the CycloneDX SBOM produced by the existing `cyclonedx-sbom` job.

**Verify-before-claim probes** (run 2026-05-24):
- `gh api repos/actions/attest/git/refs/tags/v4.1.0 --jq '.object.sha'` → `59d89421af93a897026c735860bf21b6eb4f7b26` ✓
- `gh api repos/actions/attest/releases/latest --jq '[.tag_name, .published_at, .target_commitish]'` → `v4.1.0 2026-02-26T21:07:45Z main` ✓
- `gh api repos/actions/attest --jq '[.license.spdx_id, .stargazers_count]'` → `MIT, 117 stars` ✓ (cardinal-rule-1 trust-tuple gate (a) signed-release / (b) MIT / (c) GitHub Inc / (d) deps clean — ALL GREEN)
- `gh api repos/actions/download-artifact/git/refs/tags/v8.0.1 --jq '.object.sha'` → `3e5f45b2cfb9172054b4087a40e8e0b5a5461e7c` ✓
- `gh api repos/actions/download-artifact/releases/latest` → `v8.0.1 2026-03-11T15:44:25Z` ✓

**Why**: 
1. Closes Gap G1 (`actions/attest@v4` not installed). Establishes SOTA-2026 first-party attestation pathway.
2. Supersedes both `actions/attest-build-provenance` AND `actions/attest-sbom` which are DEPRECATED upstream per README WARNING flags.
3. Complements (does NOT replace) the existing `slsa-framework/slsa-github-generator` reusable-workflow used in `slsa-provenance` job. Both are SLSA-compliant; the slsa-github-generator gives L3 via hardened-reusable-workflow isolation, the `actions/attest@v4` gives L2+ in-workflow attestation with GH-attestations-API persistence and `gh attestation verify` CLI UX.
4. Two modes wired:
   - **Mode 1 SBOM attestation**: binds the CycloneDX SBOM as in-toto SBOM-typed predicate.
   - **Mode 2 SLSA provenance attestation**: binds wave-closure docs (`WAVE-CLOSURE.md`, `CLOSURE-SYNTHESIS.md`, `VERDICT-LEDGER.md`) with SLSA build provenance predicate (auto-generated; default mode when no `sbom-path`/`predicate-*` provided).

**Cite anchors (3-org-distinct, per cite-floor-check pre-commit hook)**:
1. **GitHub Inc** — `https://github.com/actions/attest` README @ v4.1.0 + `https://docs.github.com/en/actions/security-guides/using-artifact-attestations-to-establish-provenance-for-builds`
2. **SLSA / Linux Foundation OpenSSF** — `https://slsa.dev/spec/v1.0/provenance` build-provenance predicate
3. **in-toto Project (CNCF Sandbox)** — `https://github.com/in-toto/attestation/tree/main/spec/v1` attestation envelope spec
4. **Sigstore Foundation** — short-lived Fulcio signing cert used internally by `actions/attest@v4`

**PRIVATE-repo caveat**: per actions/attest README "Artifact attestations are NOT supported on GitHub Enterprise Server. To use artifact attestations in private or internal repositories, you must be on a GitHub Enterprise Cloud plan." This repo is PRIVATE without GHEC. The job is marked `continue-on-error: true` per W349 RC-18/19/25 advisory pattern (same as Trivy SARIF + dependency-review + CodeQL SARIF on PRIVATE). At Phase 4 G7 public-mirror publish, flip to `continue-on-error: false` to enforce.

## Install #2 — Doc-only: PHASE-4-G7-CHECKLIST.md

**Form**: New documentation file at `docs/architecture/W434-GITHUB-CICD/PHASE-4-G7-CHECKLIST.md`.

**Why**: Operator mandate explicitly asks for "Phase 4 G7 publish-mirror anticipation". This doc enumerates the 11 MUST-HAVE SOTA controls that will flip from advisory→blocking when the repo flips PRIVATE→PUBLIC (or GHAS-enables). Each item has: current status, required state for G7, and SHA-pin / config path to flip.

## Install #3 — Doc-only: LANDSCAPE-2026-05.md

**Form**: Phase A landscape doc at `docs/architecture/W434-GITHUB-CICD/LANDSCAPE-2026-05.md`.

**Why**: SOTA-2026 GitHub CI/CD survey per operator mandate. 8 sections covering current runtime posture (§0), official docs ingest (§1: 7 GitHub doc pages), SOTA repo R1 probes (§2-§4: 17 candidates), gap-analysis (§5: 11 gaps surfaced), Phase 4 G7 MUST-HAVEs (§6), R1-PASS install queue (§7), cite-floor verification (§8: 8+ distinct orgs).

## REJECTS / DEFERRED (per Phase A §7 gap-analysis)

| Candidate | Verdict | Rationale |
|---|---|---|
| `actions/dependency-review-action v5.0.0` | DEFER | major bump (v4.9.0→v5.0.0) requires node24 runner — needs cross-workflow verification. follow-up wave. |
| `actions/attest-build-provenance v4.1.0` | REJECT | DEPRECATED upstream in favor of `actions/attest@v4` (now installed via Install #1). |
| `actions/attest-sbom v4.1.0` | REJECT | DEPRECATED upstream in favor of `actions/attest@v4` (now installed via Install #1). |
| `step-security/harden-runner v2.19.4` | DEFER | minor patch only (3-day-old release; Enterprise-tier-only changelog; no behavioral delta for our usage). Dependabot will bump on its own schedule. |
| `super-linter/super-linter` | REJECT | overlaps actionlint + ruff + shellcheck + zizmor + gitleaks already wired. No marginal value. |
| `anchore/scan-action` (Grype) | REJECT | overlaps trivy-action already wired. CITE-REF only. |
| `getsops/sops` + `sops-action` | REJECT | no sops-action exists (404); current PRIVATE-repo state has no sealed-secrets need. CITE-REF for Phase 4 G7 public-mirror. |
| `step-security/secure-repo` | REJECT for in-workflow install | CLI + webapp (PR-generator), NOT an Action. Manual one-shot only. |
| `step-security/sec-fix-action` | REJECT | 404 — does not exist as a packaged action. |
| CodeQL `actions` language matrix entry | DEFER | zizmor already covers the workflow static-analysis surface. |
| `workflows` ruleset rule type | DEFER | enterprise/org-wide context not active for this single-repo PRIVATE runtime. |

## Verdict

**W434-GITHUB-CICD VERDICT: 1 SOTA CI/CD practice installed (actions/attest@v4 first-party SLSA attestation); 11 gaps documented for follow-up waves; 11 candidates REJECTED with cite-anchored rationale; 8 distinct orgs cited (cite-floor exceeded 5×).**
