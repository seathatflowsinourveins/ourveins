# W434-GITHUB-CICD — Phase 4 G7 publish-mirror anticipation checklist

> Operator mandate: "The `ourveins` public-mirror Phase 4 G7 needs: SLSA L3 provenance build (slsa-github-generator), SBOM via syft (anchore/sbom-action), Cosign signing of artifacts. Document these as MUST-HAVE for G7 readiness even if not installed in this wave."
> Wave: W434-GITHUB-CICD · Date: 2026-05-24

## §1 — Current PRIVATE → PUBLIC flip prerequisites

When the operator triggers Phase 4 G7 (publish to `seathatflowsinourveins/myvein` public mirror — currently PRIVATE per `gh repo view --json visibility`), the following CI/CD controls MUST be in place AND set to PR-blocking (not advisory).

### 1.1 Already wired — set `continue-on-error: false` at G7

These are already wired and Sigstore-signed, but currently run as advisory because the PRIVATE repo lacks GHAS. At G7 PUBLIC-flip, the `continue-on-error: true` line MUST be removed (or set false) to enforce PR-blocking.

| Workflow | Job | Current state | G7 action |
|---|---|---|---|
| `.github/workflows/ci.yml` | `trivy-ci` (SARIF upload step) | `continue-on-error: true` (W349 RC-18) | remove `continue-on-error: true` from "Upload Trivy SARIF" step |
| `.github/workflows/ci.yml` | `dependency-review` (PRIVATE-repo advisory) | `continue-on-error: true` (W349 RC-19) | remove `continue-on-error: true` from job |
| `.github/workflows/codeql.yml` | `analyze` (Analyze step) | `continue-on-error: true` (W349 RC-25) | remove `continue-on-error: true` from "Analyze" step |
| `.github/workflows/dependency-review.yml` | `review` | `continue-on-error: true` (W349 RC-19) | remove `continue-on-error: true` from job |
| `.github/workflows/provenance.yml` | `attest-build-provenance` | `continue-on-error: true` (this wave W434 — actions/attest needs GHEC on PRIVATE) | remove `continue-on-error: true` from job |
| `.github/workflows/zizmor-action.yml` | `zizmor` (Run zizmor step) | `continue-on-error: true` (W349 RC-16 advisory until W351 SHA-pin sweep — done; can flip now) | remove `continue-on-error: true` from "Run zizmor" step (W351 closure landed; ready to flip) |
| `.github/workflows/scorecard.yml` | `analysis` (Upload SARIF) | unconditional `continue-on-error` not set; should be OK on PUBLIC. Set `publish_results: true`. | `publish_results: false` → `publish_results: true` |

### 1.2 SBOM + Provenance pipeline — already at G7 quality

| Control | Status | Cite |
|---|---|---|
| SLSA L3 build provenance (reusable workflow) | ✓ wired via `slsa-framework/slsa-github-generator/.github/workflows/generator_generic_slsa3.yml@v2.1.0` (SHA `f7dd8c54c2067bafc12ca7a55595d5ee9b75204a`) | `.github/workflows/provenance.yml:69-77` (slsa-provenance job) |
| SLSA L2+ first-party attestation (in-workflow) | ✓ wired via `actions/attest@v4.1.0` (this wave W434) | `.github/workflows/provenance.yml:attest-build-provenance` (new job) |
| CycloneDX v1.6 SBOM | ✓ wired via `@cyclonedx/cyclonedx-npm@4.2.1` (npm-tree) + `anchore/sbom-action@v0.24.0` (multi-lang Syft) | `.github/workflows/provenance.yml:cyclonedx-sbom` + `.github/workflows/sbom.yml:generate` |
| SPDX v2.3 SBOM (NTIA-required for US federal) | ✓ wired via `anchore/sbom-action@v0.24.0` | `.github/workflows/sbom.yml:generate` (second sbom-action step) |
| Sigstore Cosign keyless signing (Fulcio OIDC) | ✓ wired via `sigstore/cosign-installer@v4.1.2` (bundled cosign v3.0.6) | `.github/workflows/provenance.yml:sigstore-tag-sign` + `.github/workflows/sbom.yml:generate` |
| Cosign verify-blob smoke check | ✓ wired with certificate-identity-regexp + Fulcio OIDC issuer binding | `.github/workflows/sbom.yml:152-183` |
| OSSF Scorecard (private read-only) → (public publish) | ✓ wired via `ossf/scorecard-action@v2.4.3`; needs `publish_results: true` flip | `.github/workflows/scorecard.yml:40` |

### 1.3 Sigstore identity-binding contract (G7 verify)

The cosign signatures embed an OIDC identity tied to the workflow path. After G7, downstream consumers MUST verify with:

```bash
# Per https://docs.sigstore.dev/cosign/verifying/verify/
cosign verify-blob \
  --signature sbom.cyclonedx.json.sig \
  --certificate sbom.cyclonedx.json.crt \
  --certificate-identity-regexp "https://github.com/seathatflowsinourveins/myvein/.github/workflows/sbom.yml@.*" \
  --certificate-oidc-issuer "https://token.actions.githubusercontent.com" \
  sbom.cyclonedx.json
```

And for the slsa-github-generator provenance:

```bash
# Per https://github.com/slsa-framework/slsa-verifier
slsa-verifier verify-artifact \
  --provenance-path claude-sota-installed-<TAG>.intoto.jsonl \
  --source-uri github.com/seathatflowsinourveins/myvein \
  --source-tag <TAG> \
  artifact.tar.gz
```

And for the actions/attest@v4 attestation:

```bash
# Per https://cli.github.com/manual/gh_attestation_verify
gh attestation verify <artifact> \
  --owner seathatflowsinourveins \
  --predicate-type https://slsa.dev/provenance/v1
```

## §2 — Ruleset upgrades for G7

The current ruleset `main-branch-protection-sota` is good for PRIVATE state. At G7, consider adding these rule types (per `https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets/available-rules-for-rulesets`):

| Rule | G7 setting | Why |
|---|---|---|
| `required_signatures` | enabled | Per CR-6 + W341-Q10; all commits MUST be GPG/SSH-signed once public-contributor surface exists. Currently advisory-only via `commit-signing.yml`. |
| `code_scanning` | enabled with severity threshold = `high` | Once CodeQL SARIF upload flips to PR-blocking (per §1.1), require code-scanning alerts resolved before merge. |
| `commit_message_pattern` | regex enforcement of Conventional Commits + W-wave types | Currently enforced via pre-commit `commitlint` hook (bypass-able by direct API push to main; ruleset enforcement closes the gap). Suggested regex: `^(feat|fix|docs|chore|ci|build|test|refactor|perf|style|revert|deps|ship|wip)(\([^)]+\))?:\s.+\nW[0-9]+`. |
| `workflows` (new 2025 rule type) | DEFER | useful when org-wide rulesets exist; not for single-repo public mirror at G7 launch. |

## §3 — Dependabot adjustments for G7

| Setting | Current (PRIVATE) | G7 (PUBLIC) |
|---|---|---|
| Security updates (Dependabot alerts) | Gated on GHAS for PRIVATE | Free for PUBLIC; enable in repo Security & analysis settings |
| `cooldown.default-days: 5` | enabled | KEEP — defeats event-stream / ua-parser-js attack class |
| `groups` | enabled for npm (mcp-servers + anthropic-sdk) | KEEP |
| `package-ecosystem: github-actions` | weekly | KEEP — auto-PR SHA pin bumps |

## §4 — OIDC trusted-publisher setup (when first npm/PyPI package publishes)

If/when the public mirror publishes any npm or PyPI package:

| Provider | Trusted-publisher OIDC setup | Cite |
|---|---|---|
| npm | npm CLI v9.5+ + `npm publish --provenance --access public` from a workflow with `id-token: write` permissions | `https://docs.npmjs.com/generating-provenance-statements` |
| PyPI | PEP 740 trusted-publisher OIDC; configure publisher in `https://pypi.org/manage/account/publishing/`; workflow uses `pypa/gh-action-pypi-publish@release/v1` with `id-token: write` | `https://docs.pypi.org/trusted-publishers/` |

Neither is needed for the W434 wave (no packages published yet); document for G7.

## §5 — sops-encrypted secrets-at-rest (DEFER unless G7 needs sealed secrets)

If G7 public-mirror needs to store any secret-at-rest (e.g., a Langfuse public-key in a tracked `.env.example`), use `mozilla/sops` (latest v3.13.1 2026-05-16) with `age` or KMS recipients. No `sops-action` exists as a packaged GitHub Action (returns 404 on probe); decrypt-on-CI is a manual `curl + sops decrypt` step. Currently NOT needed — `LANGFUSE_*` keys live in `CLAUDE.local.md` gitignored per cardinal-rule-5.

## §6 — G7 launch checklist (ordered)

1. **Verify** all SHA-pinned actions are at latest stable (run `gh api repos/<owner>/<action>/releases/latest` per Action — W432-CI-STALE-BUMP pattern).
2. **Flip** `continue-on-error: true` → `false` (or remove) on the 7 advisory steps listed in §1.1.
3. **Flip** `publish_results: false` → `true` in `scorecard.yml`.
4. **Add** `required_signatures` rule to ruleset (§2).
5. **Add** `code_scanning` rule with `severity_threshold: high` to ruleset (§2).
6. **Add** `commit_message_pattern` rule with regex enforcement (§2).
7. **Enable** GitHub Security & analysis features: Dependabot alerts, Dependabot security updates, Secret scanning, Push protection (all FREE on PUBLIC repos).
8. **Flip** repo visibility PRIVATE → PUBLIC (operator action via `gh repo edit --visibility public`).
9. **Smoke test** by tagging `W*-ship-2026-MM-DD` and verifying:
   - SLSA L3 provenance reusable workflow succeeds
   - actions/attest@v4 attestation step succeeds (now that we have GHEC OR repo is public)
   - cosign sign-blob + verify-blob loop succeeds
   - Sigstore signatures upload as release assets
   - CycloneDX + SPDX SBOMs upload + signed
10. **Document** the released G7 artifact-attestation verification recipe in `docs/architecture/W434-GITHUB-CICD/G7-CONSUMER-VERIFY-RECIPE.md` (deferred; create when first G7 release tagged).

## §7 — Open questions for operator decision before G7

1. **Repo name** at G7: `seathatflowsinourveins/myvein` (current PRIVATE) → KEEP or rename to `seathatflowsinourveins/claude-sota-installed`?
2. **License** on PUBLIC: current state has no top-level `LICENSE` file; need to add MIT / Apache-2.0 / BSD-3-Clause as canonical project license. CR-1(b) license-risk audit reads `AGPL/SSPL/proprietary case-by-case` — MIT preferred for broadest compatibility with vendored upstream code (most installed plugins are MIT/Apache-2.0).
3. **Contributing & Code of Conduct**: G7 will need `CONTRIBUTING.md` + `CODE_OF_CONDUCT.md` (also boosts OSSF Scorecard).
4. **Branch-naming** for contributors: keep current `goal/W<N>-*` pattern or add `feat/`, `fix/`, etc.? Current pattern is wave-specific (operator workflow).

## §8 — Cite anchors (cardinal-rule-6 verify-before-claim)

- GitHub Inc — `https://docs.github.com/en/actions/security-guides/using-artifact-attestations-to-establish-provenance-for-builds` + `https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets/available-rules-for-rulesets`
- SLSA / Linux Foundation OpenSSF — `https://slsa.dev/spec/v1.0/levels` + `https://github.com/slsa-framework/slsa-verifier`
- Sigstore Foundation — `https://docs.sigstore.dev/cosign/verifying/verify/` + `https://docs.sigstore.dev/cosign/signing/overview/`
- OpenSSF (Scorecard project) — `https://openssf.org/projects/scorecard/`
- NIST SP 800-218 PW.7 — `https://csrc.nist.gov/Projects/ssdf` (SSDF Secure Software Development Framework — review/analyze code)
- NTIA — `https://www.ntia.doc.gov/files/ntia/publications/sbom_minimum_elements_report.pdf` (SBOM minimum elements)
- CycloneDX — `https://cyclonedx.org/docs/1.6/` (v1.6 spec)
- SPDX — `https://spdx.github.io/spdx-spec/v2.3/` (v2.3 spec)
- npm — `https://docs.npmjs.com/generating-provenance-statements` (trusted-publisher)
- PyPI — `https://docs.pypi.org/trusted-publishers/` (PEP 740 trusted-publisher)

**Cite-floor: ≥3 distinct orgs.** VERIFIED — 10 distinct orgs cited.
