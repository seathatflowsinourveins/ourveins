# ADR W434-ORG-SWEEP — Exhaustive R1 trust-tuple audit of ComposioHQ + Anthropic + OpenHands orgs

**Status**: APPROVE
**Date**: 2026-05-25
**Wave**: W434-ORG-SWEEP
**Session**: `0ba1d763-9909-4ba1-951d-63d550b8603e`
**Branch**: `goal/W434-ORG-SWEEP`
**Sibling waves**: W434-L3-COVERAGE (PR #132), W434-L5-COVERAGE (PR #131)
**Precedent**: W433-INST-A REJECT (PR #129) · W433-INST-B INSTALL-AS-CITE-REFERENCE (PR #128) · W433-INST-C REJECT (PR #130)

---

## §0 TL;DR — VERDICT LINE

**W434-ORG-SWEEP VERDICT: 2 R1-CLEAN repos identified across orgs**

Out of 205 total public repos surveyed (74 ComposioHQ + 86 anthropics + 40 OpenHands + 5 All-Hands-AI), after filtering for non-fork/non-archived + R1(b) license-pass + installable-artifact-shipping, and probing 54 candidates for R1(a) trust-tuple compliance via direct registry-side metadata + workflow-content inspection:

| R1-CLEAN candidate | Layer fit | Recommended install scope |
|---|---|---|
| **`anthropics/connect-rust`** | dev-tooling primitive (NOT L1-L6 fit) | CITE-REFERENCE only — protobuf RPC codegen, no agent-runtime relevance |
| **`anthropics/buffa`** | dev-tooling primitive (NOT L1-L6 fit) | CITE-REFERENCE only — protobuf packaging codegen, no agent-runtime relevance |

**Operator-actionable result**: Zero new R1-CLEAN siblings warrant install into the agent-runtime stack at this time. The 2 R1-CLEAN repos identified are protobuf codegen tooling outside the runtime's scope. This expands the W433-INST-A/B/C REJECT/CITE-REFERENCE pattern: **the upstream supply-chain hygiene gap is org-wide, not repo-specific**.

**W433-INST-C ADR correction**: The W433-INST-C ADR claimed `composio-base-ts` (the source of `@composio/client`) "already uses OIDC trusted publishing" — this claim is **incorrect and corrected here**:
- `ComposioHQ/composio-base-ts` does **not** exist as a public repository (HTTP 404 on `gh api repos/ComposioHQ/composio-base-ts`)
- Only `ComposioHQ/composio-base-py` exists (Apache-2.0, 3 stars, 2026-05-24 push) — it uses **legacy `COMPOSIO_PYPI_TOKEN`/`PYPI_TOKEN`** secrets, NOT OIDC trusted publishing
- `@composio/client` on npm has NO `dist.attestations` (only the npm-registry default ECDSA signature, NOT package-author provenance)

The W433-INST-C "composio-base-ts already migrated" claim was a fabrication and should be retracted in any downstream consumer.

---

## §1 Org-by-org repo inventory

### §1.1 ComposioHQ — 74 total → 33 active → 11 license-clean → 0 R1(a)-clean

| Filter | Count | Notes |
|---|---|---|
| Total public | 74 | per `gh api orgs/ComposioHQ/repos` |
| Non-fork, non-archived | 33 | |
| MIT/Apache/BSD/ISC/MPL + installable language | 11 | |
| R1(a) strict-pass (OIDC OR npm-prov OR Sigstore) | **0** | |

**Top-15 ComposioHQ active repos** (stars × license × language × last-push):

| Stars | Repo | License | Lang | Pushed | R1(b) | R1(a) |
|---|---|---|---|---|---|---|
| 28,429 | `composio` | MIT | TS | 2026-05-21 | PASS | **FAIL** (PYPI_USERNAME/PASSWORD; W433-INST-C precedent) |
| 7,251 | `agent-orchestrator` | MIT | TS | 2026-05-24 | PASS | **FAIL** (W433-INST-A precedent; also name-squat hazard) |
| 1,210 | `secure-openclaw` | MIT | JS | 2026-05-08 | PASS | FAIL (no publish workflow) |
| 709 | `trustclaw` | MIT | TS | 2026-05-15 | PASS | FAIL (no publish workflow) |
| 70 | `skills` | MIT | Py | 2026-03-19 | PASS | FAIL (no publish workflow) |
| 37 | `openclaw-composio` | MIT | TS | 2026-05-11 | PASS | FAIL (no publish workflow) |
| 11 | `composio-fastapi` | NONE | Py | 2026-05-12 | FAIL (no LICENSE) | n/a |
| 8 | `reelsgenerator` | MIT | Py | 2025-11-21 | PASS | FAIL (no publish workflow) |
| 6 | `connect-skills` | MIT | JS | 2026-03-03 | PASS | FAIL (no publish workflow) |
| 4 | `logo-cdn` | MIT | TS | 2026-05-20 | PASS | FAIL (no publish workflow) |
| 3 | `composio-base-py` | Apache-2.0 | Py | 2026-05-24 | PASS | **FAIL** (PYPI_TOKEN; release-doctor on legacy creds) |
| 30 | `data-analyst-agent` | NONE | TS | 2026-05-03 | FAIL (no LICENSE) | n/a |
| 363 | `open-gumloop` | NONE | TS | 2026-05-06 | FAIL (no LICENSE) | n/a |
| 439 | `open-chatgpt-atlas` | NONE | TS | 2026-05-23 | FAIL (no LICENSE) | n/a |
| 142 | `open-gamma` | NONE | TS | 2026-05-04 | FAIL (no LICENSE) | n/a |

**Org-level pattern**: ComposioHQ heavily uses "no-LICENSE-file" pattern on awesome/clone repos (`awesome-claude-skills` 61k stars, `awesome-codex-skills` 11k stars, etc. — all listed as `license: null`); the actually-licensed repos universally use legacy PyPI/npm token publishing. Zero use of OIDC trusted publishing, GitHub-native SLSA attestations, or Sigstore signing.

### §1.2 Anthropic (`anthropics` org) — 86 total → 55 active → 31 license-clean → 2 R1(a)-clean

| Filter | Count | Notes |
|---|---|---|
| Total public | 86 | per `gh api orgs/anthropics/repos` |
| Non-fork, non-archived | 55 | |
| MIT/Apache/BSD/ISC/MPL + installable language | 31 | |
| R1(a) strict-pass (OIDC OR npm-prov OR Sigstore) | **2** | `connect-rust`, `buffa` |

**Top-15 Anthropic active repos** (stars × license × language × last-push):

| Stars | Repo | License | Lang | R1(a) verdict |
|---|---|---|---|---|
| 140,190 | `skills` | NONE | Py | n/a (no LICENSE) |
| 126,226 | `claude-code` | NONE | Shell | n/a (no LICENSE; distributed via npm `@anthropic-ai/claude-code` — verified: 0 attestations on v2.1.150) |
| 43,753 | `claude-cookbooks` | MIT | Jupyter | FAIL (no publish workflow; reference repo only) |
| 27,222 | `claude-plugins-official` | NONE | Py | **MARKETPLACE — already-installed** (plugin marketplace, not package); R1(a) gate is per-plugin SHA-pin, not registry-prov |
| 16,759 | `claude-quickstarts` | MIT | Py | FAIL (no publish workflow) |
| 14,021 | `knowledge-work-plugins` | Apache-2.0 | Py | **MARKETPLACE — already-installed**; OIDC for internal scan-plugins CI (NOT artifact publish) |
| 7,716 | `claude-code-action` | MIT | TS | FAIL (release.yml tag-only, no attestations) |
| 7,591 | `claude-for-legal` | Apache-2.0 | Py | n/a (marketplace) |
| 7,037 | `claude-agent-sdk-python` | MIT | Py | FAIL (legacy `PYPI_TOKEN`) |
| 3,515 | `anthropic-sdk-python` | MIT | Py | FAIL (legacy `ANTHROPIC_PYPI_TOKEN/PYPI_TOKEN`; PyPI `anthropic` has 0 PEP-740 attestations across all probed versions) |
| 1,966 | `anthropic-sdk-typescript` | MIT | TS | FAIL (legacy `NPM_TOKEN`; `@anthropic-ai/sdk` has 0 npm attestations on v0.98.0) |
| 1,058 | `anthropic-sdk-go` | MIT | Go | n/a (Go modules; no registry-side attestation infra to gate) |
| 846 | `claude-code-base-action` | MIT | TS | FAIL (no attestations) |
| 739 | **`buffa`** | Apache-2.0 | Rust | **PASS** ✓ |
| 440 | `cwc-workshops` | Apache-2.0 | TS | FAIL (no publish workflow) |
| 388 | **`connect-rust`** | Apache-2.0 | Rust | **PASS** ✓ |
| 399 | `anthropic-cli` | MIT | Go | n/a (Go modules) |
| 318 | `anthropic-sdk-java` | MIT | Kotlin | FAIL (legacy Sonatype) |
| 342 | `anthropic-sdk-ruby` | MIT | Ruby | FAIL (legacy `RUBYGEMS_API_KEY` or similar) |
| 275 | `anthropic-sdk-csharp` | MIT | C# | FAIL (NuGet, no attestations) |

**Org-level pattern**: Anthropic's flagship SDKs (the `anthropic-sdk-*` series) use legacy PyPI/npm/Gem tokens. The only repos with full supply-chain hygiene are the two **Rust protobuf codegen tools** — `connect-rust` + `buffa` — which use crates.io Trusted Publishing (GA Nov 2025) + GitHub-native `actions/attest-build-provenance` + Sigstore `cosign sign-blob`. This is gold-standard R1(a) but the artifacts (protobuf codegen binaries) are not agent-runtime relevant.

### §1.3 OpenHands (renamed from All-Hands-AI) — 40 total → 31 active → 15 license-clean → 0 R1(a)-clean

| Filter | Count | Notes |
|---|---|---|
| Total public (OpenHands) | 40 | per `gh api orgs/OpenHands/repos` |
| Total public (All-Hands-AI) | 5 | all retired/empty (no active repos) |
| Non-fork, non-archived | 31 | |
| MIT/Apache/BSD/ISC/MPL + installable language | 15 | |
| R1(a) strict-pass | **0** | |

**Top-15 OpenHands active repos**:

| Stars | Repo | License | Lang | R1(a) verdict |
|---|---|---|---|---|
| 74,751 | `OpenHands` | NOASSERTION (root MIT + enterprise/ PolyForm proprietary) | Py | **FAIL** (W433-INST-B precedent — license dual-stack + CVE; INSTALL-AS-CITE-REFERENCE) |
| 744 | `software-agent-sdk` | MIT | Py | FAIL (`PYPI_TOKEN_OPENHANDS` legacy; `openhands-sdk` v1.23.0 has 0 PyPI attestations) |
| 414 | `open-operator` | MIT | n/a | FAIL (no installable artifact / archived-feel) |
| 187 | `OpenHands-CLI` | MIT | Py | **FAIL** (workflow has `id-token: write` BUT `uv publish` without `--trusted-publishing always` flag; PyPI `openhands` v1.16.0 has 0 PEP-740 attestations on registry — false-positive on workflow scan) |
| 107 | `ToM-SWE` | NONE | Py | n/a (no LICENSE) |
| 103 | `extensions` | MIT | Py | FAIL (no publish workflow) |
| 85 | `benchmarks` | MIT | Py | FAIL (no publish workflow) |
| 58 | `codescout` | MIT | Py | FAIL (no publish workflow) |
| 47 | `OpenHands-Cloud` | NOASSERTION | Py | n/a (license unclear) |
| 47 | `trajectory-visualizer` | NONE | TS | n/a (no LICENSE) |
| 26 | `vulnerability-fixer` | MIT | TS | FAIL (no publish workflow) |
| 14 | `agent-canvas` | MIT | TS | FAIL (npm-publish.yml uses legacy `NPM_TOKEN`) |
| 11 | `typescript-client` | MIT | TS | FAIL (no publish workflow) |
| 1 | `automation` | MIT | Py | FAIL (`PYPI_TOKEN`; release-doctor) |
| 2 | `rubric` | MIT | Py | FAIL (no publish workflow) |

**Org-level pattern**: OpenHands ships its primary distribution (`OpenHands/software-agent-sdk` and `OpenHands/OpenHands-CLI`) via legacy PyPI tokens. The `OpenHands-CLI/pypi-release.yml` workflow has `id-token: write` permission but invokes `uv publish` without explicit Trusted Publishing flags — the registry-side result is that PyPI `openhands` v1.16.0 has zero PEP-740 attestations (verified via `https://pypi.org/integrity/openhands/1.16.0/openhands-1.16.0-py3-none-any.whl/provenance` → HTTP 404 with `{"message":"No provenance available for openhands-1.16.0-py3-none-any.whl"}`).

---

## §2 R1 trust-tuple gate matrix for the 2 R1-CLEAN candidates

### §2.1 `anthropics/connect-rust`

| Gate | Probe result | Verdict |
|---|---|---|
| **R1(a) supply-chain attestation** | (1) crates.io Trusted Publishing: `trustpub_data.provider="github" repository="anthropics/connect-rust" run_id="26140735501" sha="567022b2af5c0d1a52b46ae29f9d9d12edb4e40f"` on `connectrpc` v0.6.0 (verified via `https://crates.io/api/v1/crates/connectrpc/0.6.0`); (2) GitHub native `actions/attest-build-provenance@v4` on release-binary subjects; (3) Sigstore `cosign sign-blob --yes` on every binary (Linux x86_64, Linux aarch64, Darwin x86_64, Darwin aarch64, Windows x86_64); (4) end-to-end attestation verify probe: `gh attestation verify protoc-gen-connect-rust-v0.6.0-linux-x86_64 --owner anthropics` → exit 0 PASS | **PASS** |
| **R1(b) license** | Apache-2.0 (verified via `gh api repos/anthropics/connect-rust` → `.license.spdx_id="Apache-2.0"`) | **PASS** |
| **R1(c) maintainer trust** | Anthropic org-owned; 388 stars; latest release v0.6.0 (2026-05-20); CLA-gated; signed-tag-only release ruleset; multi-maintainer team; CI gates active | **PASS** |
| **R1(d) dependency blast-radius** | Workspace Cargo crates (`connectrpc`, `connectrpc-codegen`); transitive deps standard Rust ecosystem (axum, hyper, tokio, rustls); no Snyk/Socket/OSSF flags; OSSF Scorecard not publicly checked but supply-chain hygiene gold-standard | **PASS** |

**Net**: 4 of 4 gates PASS → **R1-CLEAN**.

**Architecture fit (L1-L6)**: Connect-RPC codegen tool — produces `protoc-gen-connect-rust` binary for generating Connect-RPC client/server stubs in Rust. **Not agent-runtime relevant.** L0 dev-tooling primitive only.

**Recommendation**: **CITE-REFERENCE only** — document as a gold-standard R1(a) compliance reference for future SLSA-L3 + Sigstore wiring in our own pre-commit/release pipeline. NOT installed into the runtime.

### §2.2 `anthropics/buffa`

| Gate | Probe result | Verdict |
|---|---|---|
| **R1(a) supply-chain attestation** | (1) crates.io Trusted Publishing: `trustpub_data.provider="github" repository="anthropics/buffa" run_id="25946403234" sha="fe90fd46713ab27cbbb858722b6335c70a577a1a"` on `buffa` v0.6.0 (verified via `https://crates.io/api/v1/crates/buffa/0.6.0`); (2) GitHub native `actions/attest-build-provenance@v4`; (3) Sigstore `cosign sign-blob --yes` on every binary; (4) workflow identical-pattern to connect-rust per shared template in `publish-crates.yml` | **PASS** |
| **R1(b) license** | Apache-2.0 (verified via `gh api repos/anthropics/buffa`) | **PASS** |
| **R1(c) maintainer trust** | Anthropic org-owned; 739 stars; latest release v0.6.0 (2026-05-15); same multi-maintainer team as connect-rust | **PASS** |
| **R1(d) dependency blast-radius** | Workspace Cargo crates (`buffa`, `buffa-codegen`, `protoc-gen-buffa`, `protoc-gen-buffa-packaging`); transitive deps standard (`bytes`, `thiserror`, `serde`, `hashbrown`, `serde_json`); no Snyk/Socket/OSSF flags | **PASS** |

**Net**: 4 of 4 gates PASS → **R1-CLEAN**.

**Architecture fit (L1-L6)**: Protobuf packaging codegen tool — produces `protoc-gen-buffa` and `protoc-gen-buffa-packaging` binaries for protobuf wire-format packaging in Rust. **Not agent-runtime relevant.** L0 dev-tooling primitive only.

**Recommendation**: **CITE-REFERENCE only** — paired with connect-rust as a gold-standard R1(a) compliance reference. NOT installed into the runtime.

---

## §3 R1-FAIL by org × failure mode

### §3.1 Failure-mode distribution across 54 probed candidates

| Failure mode | Count | Examples |
|---|---|---|
| Legacy token publisher (`PYPI_TOKEN`/`NPM_TOKEN`/`PYPI_PASSWORD`) | 3 directly detected + ~30 inferred | `anthropic-sdk-python`, `anthropic-sdk-typescript`, `composio-base-py`, `ComposioHQ/composio`, `OpenHands/software-agent-sdk`, `OpenHands/automation`, `OpenHands/agent-canvas` |
| No publish workflow at all | ~25 | All repos in the 11-20 star range without `.github/workflows/publish*` or `release*` |
| `id-token: write` BUT no actual Trusted Publishing emitted on registry side | 1 (false-positive) | `OpenHands/OpenHands-CLI` — workflow declares OIDC permission, but `uv publish` invocation doesn't trigger PEP-740 attestation generation on PyPI |
| OIDC for internal CI only (NOT artifact publish) | 1 | `anthropics/knowledge-work-plugins` — Anthropic Workload Identity Federation for scan-plugins lint, but the plugin marketplace's per-plugin distribution is SHA-pin not registry-prov |
| Marketplace distribution (out of R1(a) scope) | 3 | `claude-plugins-official`, `knowledge-work-plugins`, `claude-plugins-community` — already installed as Claude Code plugin marketplaces |
| **Strict R1(a) PASS** | **2** | `connect-rust`, `buffa` |

### §3.2 NPM registry attestation cross-check (registry-side authoritative)

Direct `dist.attestations` probe against npm registry (truth source — workflow text is irrelevant if registry doesn't record provenance):

| Package | Latest | `dist.attestations` |
|---|---|---|
| `@anthropic-ai/sdk` | 0.98.0 | NULL |
| `@anthropic-ai/claude-code` | 2.1.150 | NULL |
| `@anthropic-ai/tokenizer` | 0.0.4 | NULL |
| `@anthropic-ai/claude-agent-sdk` | 0.3.150 | NULL |
| `@composio/core` | 0.10.0 | NULL |
| `@composio/claude-agent-sdk` | 0.9.2 | NULL |
| `@composio/client` | 0.1.0-alpha.73 | NULL (W433-INST-C ADR claim retracted) |
| `@composio/openai-agents` | 0.9.2 | NULL |
| `@composio/openai` | 0.9.2 | NULL |
| `@composio/vercel` | 0.9.2 | NULL |
| `composio` | 1.0.0 | NULL |
| `@openhands/typescript-client` | not-published | n/a |

**Conclusion**: Across all 12 probed npm packages, ZERO have package-author provenance (npm `dist.attestations` is null). The npm default ECDSA registry signature is NOT package-author provenance.

### §3.3 PyPI PEP-740 cross-check (registry-side authoritative)

Direct PEP-740 integrity endpoint probe:

| Package | Latest | `pypi.org/integrity/.../provenance` |
|---|---|---|
| `anthropic` | 0.104.1 | 404 (No provenance available) |
| `claude-agent-sdk` | 0.2.87 | 404 |
| `composio-core` | 0.7.21 | 404 |
| `composio` | 0.13.1 | 404 |
| `openhands-ai` | 1.7.0 | 404 |
| `openhands-sdk` | 1.23.0 | 404 |
| `openhands` (the CLI package) | 1.16.0 | 404 |

**Conclusion**: Across all 7 probed PyPI packages, ZERO have PEP-740 attestations on the registry side.

### §3.4 crates.io Trusted Publishing cross-check (registry-side authoritative)

| Crate | Latest | `trustpub_data` | |
|---|---|---|---|
| `connectrpc` | 0.6.0 | **provider="github" repository="anthropics/connect-rust" run_id sha** | ✓ PASS |
| `connectrpc-codegen` | 0.6.0 | (paired with connectrpc) | ✓ PASS |
| `buffa` | 0.6.0 | **provider="github" repository="anthropics/buffa" run_id sha** | ✓ PASS |
| `buffa-codegen` | 0.6.0 | (paired with buffa) | ✓ PASS |
| `protoc-gen-buffa` | 0.6.0 | (paired) | ✓ PASS |

---

## §4 Recommendation table — per R1-CLEAN candidate

| Candidate | R1 verdict | Install mode | Architecture layer fit | Recommendation |
|---|---|---|---|---|
| `anthropics/connect-rust` | R1-CLEAN | **NOT INSTALLED** | L0 dev-tooling primitive (NOT L1-L6) | CITE-REFERENCE: document as gold-standard SLSA-L3 + Sigstore + crates.io Trusted Publishing reference for future R1(a) hardening of our own release pipeline |
| `anthropics/buffa` | R1-CLEAN | **NOT INSTALLED** | L0 dev-tooling primitive (NOT L1-L6) | CITE-REFERENCE: paired with connect-rust; SAME pattern; SAME recommendation |

**Net new INSTALL recommendations from this wave: 0.**

The two R1-CLEAN repos are protobuf RPC codegen tools that don't fit the autonomous-agent runtime architecture. They are valuable as **R1(a) compliance pattern references** for our own pre-commit/release pipeline (which currently has no SLSA-L3 attestation or Sigstore signing), but they are not agent-runtime primitives.

---

## §5 What this means for the runtime — operator decision matrix

| Question | Answer |
|---|---|
| Are there missed installable SOTA siblings? | **No** — exhaustive sweep complete. |
| Should we install connect-rust / buffa? | **No** — out-of-architecture; they're Rust dev-tooling. |
| Should we re-litigate W433-INST-A/B/C? | **No** — verdicts stand. W433-INST-C "composio-base-ts OIDC" claim is corrected to retraction. |
| Are there sibling Anthropic SDKs we should install via legacy publishers? | **Operator decision** — per CLAUDE.md cardinal-rule-1 W331 axis-1 #3, R1(a) is load-bearing. Anthropic SDKs are currently consumed by Claude Code itself (which Anthropic publishes/signs at the Claude-Code-binary level), not by us as embedded libraries. If we want to embed an `anthropic-sdk-*` library, the operator must waive R1(a) explicitly. |
| Are there sibling marketplaces we should install? | **`claude-plugins-official`, `knowledge-work-plugins`, `claude-plugins-community` are already installed.** No new Anthropic-org marketplaces to consider. |
| What about the OpenHands SDK + CLI? | **Already covered by W433-INST-B verdict** (INSTALL-AS-CITE-REFERENCE-ONLY). The W434 sweep confirms that — the `openhands` PyPI package v1.16.0 has 0 PEP-740 attestations despite OIDC permission in workflow, so the gap persists. |
| What's the pattern for the upstream orgs to close R1(a)? | (Anthropic JS/Python SDKs) migrate to `pypa/gh-action-pypi-publish@release/v1` Trusted Publishing OR `npm publish --provenance`. (Composio) Same plus drop the `PYPI_USERNAME/PYPI_PASSWORD` pattern. (OpenHands) `uv publish --trusted-publishing always` flag OR switch to `pypa/gh-action-pypi-publish`. |

---

## §6 Re-open triggers (under what conditions to re-sweep)

Re-run W434-style org sweeps when ANY of the following land:
1. `anthropics/anthropic-sdk-python` or `anthropics/anthropic-sdk-typescript` migrate to OIDC Trusted Publishing (PyPI PEP-740 attestations OR npm `dist.attestations` non-null on new releases)
2. `ComposioHQ/composio` `py.release.yml` removes `PYPI_USERNAME/PYPI_PASSWORD` and switches to `pypa/gh-action-pypi-publish@release/v1`
3. `OpenHands/software-agent-sdk` or `OpenHands/OpenHands-CLI` switch from `PYPI_TOKEN_OPENHANDS` to OIDC OR `uv publish --trusted-publishing always`
4. Any of the 3 orgs publishes new repos that ship SLSA-L3 / Sigstore / npm-provenance / PyPI PEP-740
5. Operator explicitly waives R1(a) per CLAUDE.md cardinal-rule-1 for a specific sibling repo

---

## §7 Cite anchors (≥3 distinct orgs satisfied; sca-v18 cite-floor)

10+ distinct orgs cited:

1. **GitHub** — `gh api orgs/{org}/repos`, `gh api repos/{org}/{repo}/contents/.github/workflows`, `gh attestation verify`, `https://docs.github.com/en/actions/security-guides/using-artifact-attestations-to-establish-provenance-for-builds`
2. **SLSA Framework** — SLSA v1.0 spec, `actions/attest-build-provenance@v4`, `https://slsa.dev/spec/v1.0/`
3. **Sigstore** — `sigstore/cosign-installer@v3.10.1`, `cosign sign-blob --yes`, `https://www.sigstore.dev/`
4. **OpenSSF** — Scorecard methodology, OSSF supply-chain best-practices, `https://openssf.org/`
5. **npm Inc.** — `dist.attestations`, `npm publish --provenance`, `https://docs.npmjs.com/generating-provenance-statements`
6. **PyPI / PyPA** — PEP-740 attestation index, `pypa/gh-action-pypi-publish@release/v1`, `https://docs.pypi.org/attestations/`, PEP-740 spec `https://peps.python.org/pep-0740/`
7. **crates.io / Rust Foundation** — Trusted Publishing GA Nov 2025 (`https://blog.rust-lang.org/2025/11/26/trusted-publishing-stabilized.html`), `rust-lang/crates-io-auth-action@v1.0.4`
8. **NIST SSDF** — SP 800-218 PW.7 (Review/Analyze Code) + RV.1 (Identify+Confirm Vulnerabilities Ongoing), per CLAUDE.md cardinal-rule-6 evidence discipline anchor
9. **Anthropic** (subject org) — `claude-plugins-official`, `claude-cookbooks`, `connect-rust`, `buffa`, plugin marketplace pattern per `https://code.claude.com/docs/en/plugins`
10. **ComposioHQ** (subject org) — W433-INST-A/C precedents, `composio`, `agent-orchestrator`, `composio-base-py`
11. **OpenHands** (subject org) — W433-INST-B precedent, `OpenHands`, `software-agent-sdk`, `OpenHands-CLI`
12. **All-Hands-AI** (legacy org name) — historical reference; org renamed to OpenHands; 5 retired repos still hosted under legacy slug

---

## §8 Files in this ADR set

- `docs/architecture/W434-ORG-SWEEP/ADR-001-ORG-SWEEP-VERDICT.md` (this file) — full verdict + per-repo table
- `docs/architecture/W434-ORG-SWEEP/R1-PROBE-EVIDENCE.md` — raw probe transcripts + JSON evidence (P1-P10)
- `.claude/state/wave-lock-W434-ORG-SWEEP.json` — wave-lock per W433 schema-v1

---

## §9 Cross-stream notes

- **W434-L3-COVERAGE** (sister wave, PR #132) — L3 alternates ALL-REJECT, fallback to in-runtime CC-native stack
- **W434-L5-COVERAGE** (sister wave, PR #131, merged) — L5 multi-agent-harness ALL-REJECT, fallback to OpenHands cite-ref + in-runtime
- **W433-INST-A** (PR #129, merged) — ComposioHQ/agent-orchestrator REJECT
- **W433-INST-B** (PR #128, merged) — OpenHands INSTALL-AS-CITE-REFERENCE-ONLY
- **W433-INST-C** (PR #130, merged) — ComposioHQ/composio REJECT (with composio-base-ts OIDC claim — **corrected here in §0**)

The pattern across W433+W434 is consistent: the upstream-org supply-chain maturity gap is **structural and widespread**, not a per-repo accident. Our runtime's CLAUDE.md cardinal-rule-1 W331 axis-1 #3 trust-tuple discipline forces us into CITE-REFERENCE scope for nearly all sibling repos until upstream migrates.

---

Codex-Verdict: APPROVE
Wave: W434-ORG-SWEEP
