# cosign verify-attestation Discipline (Fire 45 W134-F-IMP-Q-DETAIL codification — Fire 41-G1 detailed; builds on Fire 44 install)

> **Purpose**: codify the operational discipline for `cosign verify-attestation` usage in INSTALL fires. Bridges Fire 44 installed cosign binary (v3.0.6 at `/c/Users/42/go/bin/cosign.exe`) with Fire 41 Gate 1 Registry Trust verdict shape (Tier-A signed-official / Tier-B signed-named-T2 / Tier-C unsigned-named-org / Tier-D unsigned-individual / Tier-E unknown-provenance).
> **Parent framework**: `docs/evidence-governed-harness-8-gate-discipline.md` Gate 1 (Registry Trust) — this rule is the Fire 41-G1 detailed-level codification operationalizing the framework's "Verification mechanism" entry.
> **Prerequisite**: cosign v3.0.6 installed per Wave 134 Fire 44 (verified at `/c/Users/42/go/bin/cosign.exe version → v3.0.6`).
> **Cite class**: `constituents=[TIER-1-DIRECT @ https://docs.sigstore.dev/cosign/verifying/verify-attestation/ + https://github.com/sigstore/cosign v3.0.6 release Apache-2.0, TIER-2 sister-rule cite-import-AMBER @ Z:/claude-sota/.claude/rules/citation-discipline.md rule #8 + Z:/claude-sota-installed/CLAUDE.md cardinal-rule-9 install-risk + Z:/claude-sota-installed/docs/evidence-governed-harness-8-gate-discipline.md Gate 1 + Z:/claude-sota-installed/docs/sota-installed-manifest.md §Section 13.G1 (Fire 44 install) + Z:/claude-sota-installed/docs/4class-memory-taxonomy-discipline.md (Fire 42 Class 1 SEMANTIC-FACT for verdict records) + Z:/claude-sota-installed/.claude/rules/codex-t1-pattern-b-forward-discipline.md (Fire 37 promoted), TIER-3-LOCAL-OPERATOR-DERIVED @ Fire 44 install evidence + Fire 41 Gate 1 PARTIAL status + Fire 44 verify-blob URL-fetch-shape gap]; effective_tier=TIER-3-LOCAL-COMPOSITION` per `Z:/claude-sota/.claude/rules/citation-discipline.md` rule #8 MIN_PRECEDENCE.

## The discipline

When an INSTALL fire targets an artifact that has Sigstore-signed releases (binary releases on GitHub with `.sig` + `.pem` certificate files, OR OCI container images with cosign attestations, OR npm packages with provenance attestations), the operator MUST:

1. **Probe upstream artifact attestation availability** before install (4-step Gate-1-probe)
2. **Fetch sig + cert files locally** (cosign verify-blob does NOT auto-download from URLs)
3. **Invoke `cosign verify-attestation` OR `verify-blob`** with correct OIDC issuer + certificate identity regex
4. **Classify verdict** per Fire 41 Gate 1 Tier-A/B/C/D/E ladder
5. **Persist verdict in install-provenance.md** with `gate-1-verdict:` declaration per Fire 42 Class 1 SEMANTIC-FACT record

## 6-step verify-attestation probe (mechanical; 6 steps post Pattern A fix-forward — added Step 0 per codex T1 #1 prescription)

### Step 0 — Verify cosign binary provenance + version (Pattern A fix-forward edit #1)

Before ANY verify-attestation invocation, confirm the cosign binary itself is the expected version + path:

```bash
# Confirm cosign binary path
which cosign  # OR command -v cosign
# Expected: /c/Users/42/go/bin/cosign

# Confirm version
cosign version 2>&1 | grep GitVersion
# Expected: GitVersion:    v3.0.6
```

If path OR version differs from Fire 44 install-provenance entry (`/c/Users/42/go/bin/cosign.exe` v3.0.6), DO NOT proceed; re-verify cosign binary install per `docs/sota-installed-manifest.md` §Section 13.G1 OR re-run Fire 44-class install. Reuse Fire 44 install-provenance anchor when path + version unchanged (avoids redundant binary-verification per fire).

### Step 1 — Probe attestation availability (cheap; no cosign invocation)

For an INSTALL candidate `<owner>/<repo>@<version>`:

```bash
# Check GitHub release for .sig + .pem assets
gh release view <version> --repo <owner>/<repo> --json assets --jq '.assets[].name' | grep -E '\.(sig|pem|sbom|json)$'

# OR for OCI image
cosign tree <registry>/<image>:<tag>  # lists attestations + signatures associated

# OR for npm package
npm view <package>@<version> --json | jq '.attestations'
```

If 0 attestations available → candidate is **Tier-D (unsigned-individual)** OR **Tier-E (unknown-provenance)** per Fire 41 Gate 1; skip Steps 2-3 and apply Tier-D/E verdict directly.

### Step 2 — Fetch sig + cert files locally (CRITICAL — cosign URL-fetch limitation)

Per Fire 44 verify-blob URL-fetch-shape gap: `cosign verify-blob --signature <URL> --certificate <URL>` does NOT work when URLs return HTML (GitHub release asset URLs require Accept: application/octet-stream headers; cosign just PEM-decodes whatever the URL returns).

CORRECT pattern (Pattern A fix-forward for Fire 44 verify-blob smoke probe):

```bash
# PRIMARY path: gh release download (handles GitHub auth + headers)
gh release download <version> --repo <owner>/<repo> \
  --pattern '<artifact>*.sig' --pattern '<artifact>*.pem' \
  --output-dir tmp/sigstore-verify-<artifact>

# FALLBACK path (Pattern A fix-forward edit #2 per codex T1 #2 prescription):
# Use when `gh` is unavailable OR fails to fetch the asset (e.g., private fork without gh auth scope)
curl -L -H "Accept: application/octet-stream" \
  -o tmp/sigstore-verify-<artifact>/<artifact>.sig \
  https://github.com/<owner>/<repo>/releases/download/<version>/<artifact>.sig
curl -L -H "Accept: application/octet-stream" \
  -o tmp/sigstore-verify-<artifact>/<artifact>.pem \
  https://github.com/<owner>/<repo>/releases/download/<version>/<artifact>.pem

# Verify against local files (REQUIRED for both PRIMARY + FALLBACK paths — local-file verification mandatory)
cosign verify-blob \
  --certificate tmp/sigstore-verify-<artifact>/<artifact>.pem \
  --signature tmp/sigstore-verify-<artifact>/<artifact>.sig \
  --certificate-identity-regexp '^https://github\.com/<owner>/<repo>/\.github/workflows/release\.yml@' \
  --certificate-oidc-issuer 'https://token.actions.githubusercontent.com' \
  <local-artifact-path>
```

Per Fire 44 install: WinGet's PRIMARY install succeeded for cosign artifact (hash-verified by WinGet); this Step 2 pattern is for INSTALL fires beyond cosign that need to verify-attestation themselves. The `--certificate-identity-regexp` example above shows the TIGHTENED form (workflow-path anchored to `release.yml@` per Pattern A fix-forward edit #5 expanded anti-pattern + regexp caveat below).

### Step 3 — Invoke `cosign verify-attestation` (for OCI attestations) OR `verify-blob` (for detached binary signatures)

**Explicit subcommand distinction (Pattern A fix-forward edit #3 per codex T1 #3 prescription)**:
- `cosign verify-attestation` — for **OCI container image attestations** (in-toto attestations attached to OCI images via cosign attach attestation; types: slsaprovenance / sbom / vulnerability scan / custom)
- `cosign verify-blob` — for **detached binary signatures** (sig+cert files alongside non-OCI binary releases on GitHub)
- `cosign verify` — for **OCI image signatures** (not attestations; legacy cosign signing)

ALWAYS use `--output json` wherever supported (per Fire 41 Gate 9 Output Validation composition; structured-output enables mechanical Schema validation).

### Step 3 sub-rule: Identity patterns — common patterns observed so far (non-exhaustive; Fire 47 V2 + V3 patches per Fire 46 LOAD-BEARING finding #1 + codex T1 #1 expansion)

Sigstore-signed candidates use ONE of MANY possible OIDC identity patterns. The list below is **NON-EXHAUSTIVE** — operator MUST discover the actual identity from the certificate/bundle BEFORE picking verification flags. The 3 patterns below are common cases observed; new patterns emerge as Sigstore ecosystem expands.

| Identity pattern | Certificate subject (SAN) | OIDC issuer | Use case |
|---|---|---|---|
| **(a) GitHub Actions workflow** | `https://github.com/<owner>/<repo>/.github/workflows/<workflow>.yml@refs/tags/<version>` | `https://token.actions.githubusercontent.com` | Most modern OSS releases (npm packages with provenance / GitHub release assets signed via reusable workflows / SLSA L3+ provenance) |
| **(b) Google Cloud KMS-backed service account** | `<account>@<project>.iam.gserviceaccount.com` (e.g., `keyless@projectsigstore.iam.gserviceaccount.com`) | `https://accounts.google.com` (Google Cloud KMS) | Long-lived project release infrastructure (Sigstore project itself uses pattern (b)) |
| **(c) Generic OIDC CI/provider** (Pattern A fix-forward edit #2 per codex T1 #2 prescription) | Discovered from certificate/bundle — DO NOT ASSUME format; varies per CI (GitLab CI workflow path, CircleCI build URL, Buildkite pipeline URL, custom enterprise OIDC subject claims) | Discovered from certificate/bundle — common: `https://gitlab.com` (GitLab CI), `https://oauth2.sigstore.dev/auth` (Sigstore federated OIDC), `https://login.microsoftonline.com/<tenant>` (Azure AD), custom enterprise OIDC issuer URLs | All non-GitHub-Actions, non-Google-KMS releases (GitLab projects, enterprise CI, Azure-hosted release pipelines, federated identity providers); **identity + issuer MUST be discovered from cert/bundle**, NEVER assumed |

**Azure-specific clarification (Pattern A fix-forward edit #3 per codex T1 #3 prescription)**: Azure KMS/service identities DO NOT use the Google-style `<account>@<project>.iam.gserviceaccount.com` SAN format. Azure identities typically use Azure AD object IDs OR Service Principal client IDs as SAN; issuer is `https://login.microsoftonline.com/<tenant>`. Always discover Azure SAN format from the actual cert; do NOT extrapolate from Google format.

**Discovery flow** (do BEFORE picking verification flags; Pattern A fix-forward edit #6 per codex T1 #6 prescription — adds OCI cosign tree path):
1. For **OCI container images**: `cosign tree <registry>/<image>:<tag>` — lists all signatures + attestations attached to the image; reveals identity + issuer per signature
2. For **detached binary signatures with bundle**: inspect bundle JSON directly — `jq '.verificationMaterial.certificate.rawBytes' <bundle.sigstore.json>` extracts cert; pipe to `openssl x509 -noout -subject -text` to read SAN + issuer
3. For **detached binary signatures with separate cert**: `openssl x509 -in <cert>.pem -noout -subject -text -ext subjectAltName` reveals SAN
4. Map discovered SAN + issuer to pattern (a), (b), (c), OR document NEW pattern observed
5. Apply correct verification flags per the discovered identity

**Cite anchors (Pattern A fix-forward edits #4 + #5 per codex T1 #4 + #5 prescriptions — official Sigstore docs)**:
- `--bundle` verification flag + bundle format: `https://docs.sigstore.dev/quickstart/quickstart-cosign/` + `https://docs.sigstore.dev/cosign/verifying/verify/`
- Bundle mediaType `application/vnd.dev.sigstore.bundle.v0.3+json` + cosign tree OCI discovery: `https://docs.sigstore.dev/cosign/signing/signing_with_containers/`
- Cite class for these is TIER-1-DIRECT Sigstore official documentation (upgraded from TIER-3-LOCAL-COMPOSITION-only per codex T1 cite-class correction)

**Empirical evidence**: Fire 46 dogfood discovered Sigstore project uses pattern (b) — sigstore/cosign v3.0.6 release signed by `keyless@projectsigstore.iam.gserviceaccount.com` via `https://accounts.google.com` OIDC issuer, NOT a GitHub Actions workflow. Initial attempt with GitHub-Actions regex failed; pivot to pattern (b) succeeded with `Verified OK`. See install-provenance.md Fire 46 entry for full trace.

### Step 3 sub-rule: Bundle-first modern format (Fire 47 V2 + V3 patches per Fire 46 LOAD-BEARING finding #3 + codex T1 #7 backward-compat addition)

Modern Sigstore release format is **single JSON bundle file** containing cert + sig + Rekor log entry + (optional) timestamp authority response:
- File extension: `.sigstore.json`
- Bundle mediaType (current SOTA): `application/vnd.dev.sigstore.bundle.v0.3+json` (verify via `jq '.mediaType' <bundle>`)
- Older bundle mediaTypes (backward-compat tolerance): `application/vnd.dev.sigstore.bundle+json;version=0.1` (v0.1) / `application/vnd.dev.sigstore.bundle+json;version=0.2` (v0.2)
- Invocation flag: `--bundle <file>.sigstore.json` (replaces separate `--certificate <pem>` + `--signature <sig>`)

**SOTA-pin order of preference**:
1. `--bundle <file>.sigstore.json` v0.3 (current SOTA; single-file fetch; full Rekor + TSA evidence captured) ✅ PREFERRED
2. `--bundle <file>.sigstore.json` v0.2 OR v0.1 (older bundle versions; still supported by cosign; **inspect mediaType deliberately** rather than silently downgrading) ⚠️ COMPAT
3. `--certificate <pem> --signature <sig>` (legacy; separate files; predates bundle format) ❌ LEGACY

When BOTH formats are available for the same release, choose bundle. When ONLY legacy format available (some pre-2024 releases), fallback to separate files per Step 2 legacy path. When bundle version is older (v0.1/v0.2), confirm via `jq '.mediaType' <bundle>` and verify cosign version supports that bundle version (cosign v3.0.x supports all 3 versions).

**Discovery flow**: `gh release view <version> --repo <owner>/<repo> --json assets --jq '.assets[].name' | grep -E '\.(sigstore\.json|sig|pem)$'` — if `.sigstore.json` present, use bundle path; else use separate files. Inspect bundle mediaType BEFORE invocation: `jq '.mediaType' <bundle.sigstore.json>`.

**Cite anchor**: bundle format SOTA-pin per `https://docs.sigstore.dev/cosign/signing/signing_with_containers/` (Sigstore official docs; TIER-1-DIRECT cite class upgrade per codex T1 #4+#5 prescription).

```bash
# OCI image attestation verification
cosign verify-attestation \
  --type slsaprovenance \
  --certificate-identity-regexp '^https://github\.com/<owner>/<repo>/' \
  --certificate-oidc-issuer 'https://token.actions.githubusercontent.com' \
  <registry>/<image>:<tag>

# Returns:
# Verification for <image>:<tag> --
# The following checks were performed on each of these signatures:
#   - The cosign claims were validated
#   - Existence of the claims in the transparency log was verified offline
#   - The code-signing certificate was verified using trusted certificate authority certificates
# Certificate subject: https://github.com/<owner>/<repo>/.github/workflows/<workflow>.yml@refs/tags/<version>
# Certificate issuer URL: https://token.actions.githubusercontent.com
# Predicate type: https://slsa.dev/provenance/v1
```

### Step 4 — Classify verdict per Fire 41 Gate 1 Tier-A/B/C/D/E ladder

Map cosign verify result + maintainer-provenance probe to Gate 1 verdict. **Tier-A and Tier-B require BOTH conditions** (Pattern A fix-forward edit #4 per codex T1 #4 prescription — AND semantics, NOT OR semantics):

| cosign verify result + maintainer tier | Gate 1 verdict |
|---|---|
| Signature VALID **AND** cert identity matches official-org workflow **AND** TIER-1-OFFICIAL maintainer (Anthropic / OpenAI / Microsoft / Google / Apache / Linux Foundation / etc) | **Tier-A signed-official** |
| Signature VALID **AND** cert identity matches named-T2 practitioner workflow **AND** TIER-2-NAMED-PRACTITIONER maintainer (Karpathy / Osmani / Cherny / verified-publisher) | **Tier-B signed-named-T2** |
| NO signature available **AND** named-org maintainer (TIER-3-NAMED-ORG) | **Tier-C unsigned-named-org** |
| NO signature available **AND** named-individual maintainer (TIER-4-NAMED-INDIVIDUAL) | **Tier-D unsigned-individual** |
| Signature INVALID OR identity mismatch OR Tier-5 anonymous OR signed-but-named-T2-missing | **Tier-E unknown-provenance** |

**Critical AND semantic**: an UNSIGNED named-T2 artifact (e.g., Karpathy repo with no Sigstore signatures) does NOT promote to Tier-B; it falls to Tier-D (unsigned-individual) per the maintainer-tier-only assessment. Tier-B requires BOTH signed AND named-T2 verified identity match.

### Step 5 — Persist verdict in install-provenance.md (Pattern A fix-forward edit #6 — extended fields for auditability)

Per Fire 42 4-class memory taxonomy: verdict is **Class 1 SEMANTIC-FACT** — write to install-provenance.md under the install row. **Extended fields** ensure verdict is INDEPENDENTLY AUDITABLE later:

```markdown
- **Gate 1 verdict** (per docs/cosign-verify-attestation-discipline.md): **Tier-A signed-official**
  - Certificate subject: `https://github.com/<owner>/<repo>/.github/workflows/<workflow>.yml@refs/tags/<version>`
  - Certificate issuer: `https://token.actions.githubusercontent.com`
  - Certificate fingerprint (SHA-256): `<hex-digest-of-cert-DER>` (extract via `openssl x509 -in <cert>.pem -fingerprint -noout -sha256`)
  - Rekor log entry index: `<integer>` OR Rekor UUID: `<uuid>` (extract from `cosign verify --output json` field `optional.Bundle.Payload.logIndex`)
  - Artifact digest (SHA-256): `<hex-digest>` (compute via `sha256sum <artifact>`)
  - Identity match rationale: "Matches expected upstream `<owner>/<repo>` release workflow at tag `<version>`"
  - Verified at: 2026-MM-DD via `cosign verify-attestation --output json` against `<artifact>`
```

The extended fields enable post-hoc audit by any operator/agent that re-verifies the candidate WITHOUT needing to re-fetch from upstream: certificate fingerprint pins cert authenticity; Rekor log index allows independent transparency-log lookup; artifact digest binds the verdict to the exact bytes verified.

## Composition with Fire 41 Gate 10 (Side-Effect/Permission Boundary Audit)

`cosign verify-attestation` does NOT have side-effects on the local filesystem BEYOND:
- Reading sig + cert files
- Reading the local artifact being verified
- Querying Sigstore transparency log at `https://rekor.sigstore.dev` (READ network call)
- Querying Sigstore Fulcio CA at `https://fulcio.sigstore.dev` (READ network call)

Per Fire 41 Gate 10 (Side-Effect/Permission Boundary Audit): cosign verify is **WITHIN-BOUNDARY** for filesystem (read-only on cert/sig/artifact files); **WITHIN-BOUNDARY** for network (read-only Sigstore-public-infrastructure queries). No Gate 10 BOUNDARY-VIOLATION concerns.

## Composition with Fire 41 Gate 9 (Output Validation / Schema Conformance)

cosign verify-attestation OUTPUT is structured text (not JSON by default). For Gate 9 compliance, use `--output json` flag:

```bash
cosign verify-attestation --output json --type slsaprovenance \
  --certificate-identity-regexp '...' --certificate-oidc-issuer '...' \
  <image> > tmp/cosign-verdict-<artifact>.json
```

JSON output schema:
```json
{
  "critical": {
    "identity": {"docker-reference": "<image>"},
    "image": {"docker-manifest-digest": "sha256:..."},
    "type": "cosign container image signature"
  },
  "optional": {
    "Subject": "https://github.com/<owner>/<repo>/.github/workflows/<workflow>.yml@refs/tags/<version>",
    "Issuer": "https://token.actions.githubusercontent.com"
  }
}
```

Per Fire 41 Gate 9 SCHEMA-VALID verdict shape: validate the JSON structure has `critical.identity.docker-reference` + `optional.Subject` + `optional.Issuer` fields before proceeding to Gate 1 verdict classification.

## When this discipline applies

ANY of these triggers fires this rule:

1. INSTALL fire targets a candidate with Sigstore-signed releases (npm provenance / GitHub release attestations / OCI cosign attestations)
2. Fire 41 Gate 1 Registry Trust verdict needs to be elevated from PARTIAL → MOSTLY-WIRED on a specific candidate
3. CR-9 install-risk discipline + CR-12 PRIMARY install path require cryptographic provenance verification before INSTALL commit
4. Operator manually probes a candidate for SOTA-research D4 maintainer-provenance tier verification (per SRA D4 lattice)

## When this discipline does NOT apply

- INSTALL fires targeting candidates without Sigstore-signed releases (most npm packages pre-2024 + most non-GitHub-Actions-built binaries) — apply Tier-C/D/E verdict directly per Step 1 quick-probe
- READ-ONLY research probes (per cardinal-rule-9 exception)
- Sibling cite-imports per CR-12 tertiary path (sibling has its own verification discipline; cite-import-AMBER carries cite-trail at SHA without re-verification)
- Bootstrap files (CLAUDE.md / CLAUDE.local.md / tools/eee.ps1 / .gitignore / etc per CLAUDE.md "Bootstrap-only files" table)

**Pre-release / Release-candidate handling note (Pattern A fix-forward edit #9 per codex T1 #9 prescription)**: pre-release artifacts (alpha / beta / rc / nightly / -SNAPSHOT) are NOT categorically excluded from this discipline. Apply Steps 0-5 normally; the verdict still classifies per Tier-A/B/C/D/E ladder based on signature + maintainer-provenance evidence. SEPARATE install-risk policy (per CR-9 install-risk discipline + Fire 43 Band 6 pre-burn-in maturity) determines whether the operator should INSTALL the verified pre-release OR defer to stable. This discipline ESTABLISHES TRUST; install-risk policy DETERMINES ADOPTION.

## Anti-patterns

- **Skip Step 2 (fetch sig + cert files locally)** — refuted by Fire 44 verify-blob smoke probe failure ("loading verifier from key opts: loading cert: error during PEM decoding"). cosign verify-blob's URL handling does NOT fetch raw bytes from GitHub release asset URLs; the HTML response gets PEM-decoded and fails. ALWAYS fetch local copies first via `gh release download`.
- **Use generic `--certificate-identity` instead of `--certificate-identity-regexp`** — exact-match identity rarely works because Sigstore certificate subjects encode workflow path + ref + version; use regexp `^https://github\.com/<owner>/<repo>/` to match the org-repo prefix, accepting any workflow/ref/version variation. **CAVEAT**: leaving the regexp open-ended also matches forked workflows from the same owner-org; tighten when the workflow path is known (e.g., `^https://github\.com/<owner>/<repo>/\.github/workflows/release\.yml@`).
- **Trust cosign output without JSON schema validation** — Gate 9 composition mandates JSON output + schema check; raw text output is human-readable but susceptible to parse errors in automation.
- **Skip Step 4 verdict classification + persistence** — per Fire 42 Class 1 SEMANTIC-FACT discipline: cosign verdict IS a stable fact about the candidate; MUST persist to install-provenance.md for future-session recall via mcp-memory + cross-fire verification per FM-20 cascade defense.
- **Use cosign verify-attestation for SLSA provenance when candidate publishes only signed-blob releases** — wrong subcommand. Use verify-blob for non-OCI artifacts; verify-attestation requires attestation type (slsaprovenance / sbom / vulnerability). Per Sigstore docs: `verify-blob` for files; `verify` for image signatures; `verify-attestation` for image attestations.
- **Treat Gate 1 Tier-A as transitive trust for downstream dependencies** — signed-official only verifies THE ARTIFACT ITSELF, not its dependency chain. For deep supply-chain verification, use SBOM attestation + `cosign verify-attestation --type sbom` to walk the dependency tree.
- **Accept a valid Sigstore signature WITHOUT checking artifact digest + cert identity against expected upstream** (Pattern A fix-forward edit #7 per codex T1 #7 prescription) — refuted: Sigstore signatures only attest "this artifact was signed by this identity at this time"; they do NOT validate the artifact is FROM your expected upstream/repo/workflow. Verification logic MUST cross-check: (a) artifact SHA-256 digest matches expected hash, (b) certificate subject matches `^https://github\.com/<expected-owner>/<expected-repo>/` regex, (c) workflow path matches `.github/workflows/<expected-workflow>.yml@` when known. Missing any cross-check = effectively unsigned.
- **Use broad `--certificate-identity-regexp` matching forks / unrelated workflows / user-controlled refs when tighter identity is knowable** (Pattern A fix-forward edit #8 per codex T1 #8 prescription) — refuted: open regexp like `^https://github\.com/<owner>/<repo>/` matches ALL workflows in repo including PR-checks workflows, dependabot workflows, fork-rebased workflows (if attacker submits a PR with malicious release workflow). When the expected workflow path IS known (e.g., `.github/workflows/release.yml`), MANDATE tightening: `^https://github\.com/<owner>/<repo>/\.github/workflows/release\.yml@refs/tags/v\d+\.\d+\.\d+$`. Forbid org-only OR unanchored regexps unless explicit provenance documentation justifies (e.g., multi-workflow release strategy intentionally varies workflow path).
- **Assume ALL Sigstore-signed candidates use GitHub Actions workflow identity** (Fire 47 W134-F-IMP-Q-DISCIPLINE-V2 codification per Fire 46 LOAD-BEARING finding #1) — refuted by Fire 46 empirical dogfood: Sigstore project's OWN release uses KMS-backed service account identity (`keyless@projectsigstore.iam.gserviceaccount.com` via `https://accounts.google.com` OIDC issuer). Per §Step 3 sub-rule Identity pattern split: ALWAYS discover identity first (via deliberate-failure probe OR by inspecting bundle/cert directly with `jq '.verificationMaterial.certificate'` on bundle JSON), THEN apply correct verification flags. Hard-coded GitHub-Actions assumption silently FAILS on KMS-backed releases AND on enterprise Azure-KMS variants.
- **Use legacy `--certificate <pem> --signature <sig>` flags when modern bundle format is available** (Fire 47 W134-F-IMP-Q-DISCIPLINE-V2 codification per Fire 46 LOAD-BEARING finding #3) — refuted by SOTA-pin discipline: modern `.sigstore.json` bundle format (mediaType `application/vnd.dev.sigstore.bundle.v0.3+json`) captures cert + sig + Rekor log entry + (optional) TSA in single file. Bundle is the SOTA-pin going forward; legacy separate-file flags are FALLBACK only when bundle not available. Using legacy flags when bundle exists loses Rekor log evidence + adds operator fetch-multiple-files complexity.
- **Treat GitHub Actions AND KMS-backed service account as the ONLY possible keyless identities** (Fire 47 V3 codex T1 #7 prescription) — refuted by §Step 3 sub-rule "Identity patterns — non-exhaustive": Sigstore ecosystem accepts ANY OIDC-issued identity (GitLab CI, CircleCI, Buildkite, Azure AD, federated enterprise OIDC, etc). Verification MUST be DRIVEN BY DISCOVERED cert/bundle issuer and identity — NEVER pattern-matched against a 2-pattern OR 3-pattern allowlist. The 3 patterns in the §Step 3 sub-rule table are COMMON CASES, not an exhaustive enumeration; new patterns emerge as ecosystem expands.
- **Use bundle artifacts without checking mediaType or verification material shape** (Fire 47 V3 codex T1 #8 prescription) — refuted by §Step 3 sub-rule "Bundle-first modern format" backward-compat tolerance: bundle versions v0.1 / v0.2 / v0.3 have different verificationMaterial shapes; ecosystem-specific provenance bundles (npm provenance, GitHub Actions attestation bundles, custom enterprise variants) may use different mediaType structure. ALWAYS inspect `jq '.mediaType' <bundle>` BEFORE invocation; do NOT assume v0.3 structure when older OR ecosystem-specific bundles appear. Silent downgrade-on-mediaType-mismatch is a Gate-9 SCHEMA-DRIFTED verdict per Fire 41 framework composition.

## Sister-rule integration

- `Z:/claude-sota-installed/docs/evidence-governed-harness-8-gate-discipline.md` Gate 1 — parent framework
- `Z:/claude-sota-installed/docs/evidence-governed-harness-8-gate-discipline.md` Gate 9 (Output Validation) — JSON schema validation composition
- `Z:/claude-sota-installed/docs/evidence-governed-harness-8-gate-discipline.md` Gate 10 (Side-Effect Audit) — boundary verification
- `Z:/claude-sota-installed/CLAUDE.md` cardinal-rule-9 install-risk — verify-attestation extends CR-9 sibling-bleed defense with cryptographic provenance
- `Z:/claude-sota-installed/CLAUDE.md` cardinal-rule-6 official-native-channel — cosign verify confirms candidate IS from official source
- `Z:/claude-sota-installed/docs/sota-installed-manifest.md` §Section 13.G1 — Fire 44 cosign binary install row
- `Z:/claude-sota-installed/docs/4class-memory-taxonomy-discipline.md` Class 1 SEMANTIC-FACT — verdict persistence
- `Z:/claude-sota/.claude/rules/sota-research-architecture.md` D4 maintainer-provenance tier — Step 4 verdict classification
- `Z:/claude-sota/.claude/rules/named-failure-modes.md` — FM-N cross-ref for known supply-chain failure modes
- `Z:/claude-sota-installed/.claude/rules/codex-t1-pattern-b-forward-discipline.md` (Fire 37 promoted) — Forward Discipline #2 applied (10th recursive dogfood)

## Status (current eee implementation)

| Component | Status |
|---|---|
| cosign binary | ✅ INSTALLED Fire 44 (v3.0.6 at `/c/Users/42/go/bin/cosign.exe`) |
| Step 1 attestation availability probe | ⚠️ PARTIAL — `gh release view --json assets` available; OCI `cosign tree` available; npm `npm view --json | jq .attestations` available |
| Step 2 fetch sig+cert locally | ⚠️ PARTIAL — `gh release download` available; not yet codified as mechanical hook |
| Step 3 cosign invoke | ✅ AVAILABLE post Fire 44 install |
| Step 4 verdict classification | ⚠️ PARTIAL — operator-side discipline codified in this doc; mechanical hook NOT-YET-WIRED |
| Step 5 verdict persistence | ⚠️ PARTIAL — install-provenance.md convention exists; `gate-1-verdict:` declaration format NEW per this rule |
| Mechanical enforcement hook | ❌ NOT-YET-WIRED — future Fire 45-mechanical detailed codification ship |

**Cumulative**: cosign binary + 3 of 5 steps AVAILABLE; 2 of 5 steps PARTIAL; mechanical hook NOT-YET-WIRED. Operator-side discipline ACTIVE post Fire 45.

## Promotion threshold (this discipline's own cycle-322 promotion path)

This rule is codified as **TIER-3-LOCAL-COMPOSITION discipline doc** at n=1 (Fire 45 = 1st dogfood; builds on Fire 44 install). Per cycle-322 jurisdiction:
- n=1 (this fire) → discipline doc shipped at `docs/cosign-verify-attestation-discipline.md`
- n=2+ (future INSTALL fires applying Steps 1-5) → evidence ladder accumulates
- n=3+ same-arc OR user-trigger explicit → promote to formal `.claude/rules/cosign-verify-attestation-discipline.md` rule-tier
- Mechanical hook codification = separate W134-F-IMP-Q-MECHANICAL Forward candidate (PostToolUse `Bash(* install *)` audit that auto-runs Steps 1-5 + emits `gate-1-verdict:` JSONL record per `audit-action-loop.md`)

**Promotion-deferred** until n=3 dogfood evidence accumulates from real INSTALL fires applying this discipline.

## How to apply (operator-side workflow)

For every INSTALL fire targeting a Sigstore-signed candidate:

1. Run **Step 1 probe** to check attestation availability (~5s)
2. If 0 attestations → apply Tier-D/E verdict directly + record in install-provenance.md `gate-1-verdict: Tier-D unsigned-individual` + proceed with INSTALL per CR-9 install-risk discipline (lower-trust install path)
3. If attestations available → run **Steps 2-3** (~30-60s)
4. **Step 4** classify verdict per Tier-A/B/C/D/E ladder
5. **Step 5** persist verdict + cite in install-provenance.md
6. If Tier-E → BLOCK INSTALL pending maintainer verification (per Fire 41 Gate 1 hard-fail)
7. If Tier-C/D → proceed with CR-9 install-risk discipline (lower-trust install path; document caveats)
8. If Tier-A/B → proceed with HIGH-trust install path (mechanical-enforcement-ready when hook wires)

## Update triggers

Re-evaluate this discipline when:
- cosign CLI version bumps beyond v3.0.6 — re-verify Steps 2-3 command flags
- Sigstore changes OIDC issuer URL OR Fulcio CA URL — update Step 3 examples
- A 6th step emerges (e.g., transparency-log entry verification beyond default cosign verify checks)
- Mechanical hook ships (W134-F-IMP-Q-MECHANICAL) — flip §Status table mechanical-enforcement row from NOT-YET-WIRED to ✅
- A new attestation type emerges (e.g., vulnerability-scan attestations for OCI images) — extend Step 3 examples
- cycle-322 n=3 dogfood evidence accumulates → promote to formal `.claude/rules/`
- Anthropic CC ships native Sigstore verification primitive — flip from operator-discipline to mechanical-CC-runtime
- A Sigstore CT log compromise OR Fulcio CA compromise event occurs — re-evaluate trust-root reliance

## Cite class for this discipline

`constituents=[TIER-1-DIRECT @ https://docs.sigstore.dev/cosign/verifying/ + https://github.com/sigstore/cosign v3.0.6 Apache-2.0, TIER-2 sister-rule cite-import-AMBER @ 8 sister docs, TIER-3-LOCAL-OPERATOR-DERIVED @ Fire 44 install + Fire 41 Gate 1 PARTIAL]; effective_tier=TIER-3-LOCAL-COMPOSITION` per `Z:/claude-sota/.claude/rules/citation-discipline.md` rule #8 MIN_PRECEDENCE.

## Recursive dogfood note

This Fire 45 codification is the 10th Forward Discipline #2 recursive dogfood instance (post-cycle-322 promotion ladder advance n=9→n=10). The discipline doc itself classifies as Class 3 PROCEDURAL-SKILL-OR-RULE per Fire 42 4-class taxonomy; ships at n=1 (discipline-doc tier); promotion-to-formal-rule deferred to cycle-322 cross-arc evidence accumulation via real INSTALL fires that apply Steps 1-5 in practice.
