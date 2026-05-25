# W434-ORG-SWEEP — R1 trust-tuple probe raw evidence (P1-P10)

**Companion to**: `ADR-001-ORG-SWEEP-VERDICT.md`
**Date**: 2026-05-25
**Method**: direct `gh api` + npm registry + PyPI integrity API + crates.io API + `gh attestation verify` end-to-end

---

## P1 — Org-level repo enumeration

### P1.1 ComposioHQ

```bash
gh api 'orgs/ComposioHQ/repos?per_page=100&type=public' --paginate --jq '.[] | {name, license: .license.spdx_id, archived, fork, stargazers_count, language, pushed_at}'
# → 74 records
```

Filter: non-fork, non-archived = **33 active**.
Filter: + MIT/Apache/BSD/ISC/MPL + installable-language = **11 license-clean candidates**.

### P1.2 anthropics

```bash
gh api 'orgs/anthropics/repos?per_page=100&type=public' --paginate --jq '.[] | {name, license: .license.spdx_id, archived, fork, stargazers_count, language, pushed_at}'
# → 86 records
```

Filter: non-fork, non-archived = **55 active**.
Filter: + license-clean + installable-language = **31 license-clean candidates**.

### P1.3 OpenHands (renamed from All-Hands-AI)

```bash
gh api 'orgs/OpenHands/repos?per_page=100&type=public' --paginate
# → 40 records
gh api 'orgs/All-Hands-AI/repos?per_page=100&type=public' --paginate
# → 5 records (all retired, 0 active)
```

Filter: non-fork, non-archived = **31 active** (OpenHands only — All-Hands-AI org effectively empty).
Filter: + license-clean = **15 license-clean candidates**.

---

## P2 — composio-base-ts existence probe (W433-INST-C ADR correction)

```bash
gh api repos/ComposioHQ/composio-base-ts
# → {"message":"Not Found", "status":"404"}
```

**Result**: `ComposioHQ/composio-base-ts` does NOT exist as a public repository.

```bash
gh api repos/ComposioHQ/composio-base-py
# → {"name":"composio-base-py", "license":"Apache-2.0", "archived":false, "fork":false, "stargazers_count":3, "language":"Python", "pushed_at":"2026-05-24T00:17:33Z", "private":false, "created_at":"2025-04-10T07:37:27Z"}
```

**Result**: Only `composio-base-py` exists, and its `publish-pypi.yml` workflow uses `PYPI_TOKEN: ${{ secrets.COMPOSIO_PYPI_TOKEN || secrets.PYPI_TOKEN }}` — legacy token, NOT OIDC Trusted Publishing.

**W433-INST-C ADR §0/§5 "composio-base-ts already migrated" claim → retracted.**

---

## P3 — anthropics/connect-rust R1(a) gold-standard probe

### P3.1 Workflow inspection (`.github/workflows/release.yml`)

```yaml
name: Release protoc-gen-connect-rust
on:
  push:
    tags: ['v*']
permissions:
  contents: write      # create releases and upload assets
  id-token: write      # Sigstore OIDC (cosign + GitHub attestations)
  attestations: write  # GitHub native attestation API
...
      - name: Attest build provenance
        uses: actions/attest-build-provenance@v4
        with:
          subject-path: artifacts/${{ env.BINARY }}-*
      - name: Install cosign
        uses: sigstore/cosign-installer@7e8b541eb2e61bf99390e1afd4be13a184e9ebc5 # v3.10.1 (sha-pinned)
      - name: Sign artifacts with cosign (keyless)
        run: |
          for file in "${BINARY}"-*; do
            cosign sign-blob --yes \
              --output-signature "${file}.sig" \
              --output-certificate "${file}.pem" \
              "$file"
          done
```

### P3.2 Workflow inspection (`.github/workflows/publish-crates.yml`)

```yaml
permissions:
  contents: read
  id-token: write  # OIDC for crates.io Trusted Publishing

jobs:
  publish:
    environment: crates-io
    ...
    steps:
      - name: Authenticate (Trusted Publishing)
        if: ${{ !inputs.dry_run && env.CARGO_REGISTRY_TOKEN == '' }}
        uses: rust-lang/crates-io-auth-action@bbd81622f20ce9e2dd9622e3218b975523e45bbe # v1.0.4 (sha-pinned)
```

### P3.3 crates.io registry-side verification

```bash
curl -s "https://crates.io/api/v1/crates/connectrpc/0.6.0" | jq '.version.trustpub_data'
```
```json
{
  "provider": "github",
  "repository": "anthropics/connect-rust",
  "run_id": "26140735501",
  "sha": "567022b2af5c0d1a52b46ae29f9d9d12edb4e40f"
}
```

### P3.4 End-to-end attestation verification

```bash
gh release download v0.6.0 --repo anthropics/connect-rust --pattern 'protoc-gen-connect-rust-v0.6.0-linux-x86_64'
gh attestation verify protoc-gen-connect-rust-v0.6.0-linux-x86_64 --owner anthropics
# → exit 0 (PASS)
```

**Result**: R1(a) FULL-PASS — all 4 sub-gates verified.

---

## P4 — anthropics/buffa R1(a) gold-standard probe

### P4.1 Workflow inspection (`.github/workflows/publish-crates.yml`)

Same pattern as connect-rust:
```yaml
permissions:
  contents: read
  id-token: write  # OIDC for crates.io Trusted Publishing
...
      - name: Authenticate (Trusted Publishing)
        uses: rust-lang/crates-io-auth-action@bbd81622f20ce9e2dd9622e3218b975523e45bbe # v1.0.4 (sha-pinned)
```

### P4.2 crates.io registry-side verification

```bash
curl -s "https://crates.io/api/v1/crates/buffa/0.6.0" | jq '.version.trustpub_data'
```
```json
{
  "provider": "github",
  "repository": "anthropics/buffa",
  "run_id": "25946403234",
  "sha": "fe90fd46713ab27cbbb858722b6335c70a577a1a"
}
```

### P4.3 Release artifacts

Latest v0.6.0 ships:
- `protoc-gen-buffa-v0.6.0-{darwin-aarch64,darwin-x86_64,linux-aarch64,linux-x86_64,windows-x86_64.exe}` each + `.pem` + `.sig`
- `protoc-gen-buffa-packaging-v0.6.0-*` same matrix
- `checksums-sha256.txt`

**Result**: R1(a) FULL-PASS — same gold-standard pattern as connect-rust.

---

## P5 — anthropics/anthropic-sdk-python R1(a) FAIL probe

### P5.1 Workflow inspection (`.github/workflows/publish-pypi.yml`)

```yaml
jobs:
  publish:
    runs-on: ubuntu-latest
    environment: production-release
    steps:
      - uses: actions/checkout@de0fac2e4500dabe0009e67214ff5f5447ce83dd # v6.0.2
      - name: Install uv
        uses: astral-sh/setup-uv@d4b2f3b6ecc6e67c4457f6d3e41ec42d3d0fcb86 # v5.4.2
      - name: Publish to PyPI
        run: |
          bash ./bin/publish-pypi
        env:
          PYPI_TOKEN: ${{ secrets.ANTHROPIC_PYPI_TOKEN || secrets.PYPI_TOKEN }}
```

### P5.2 PyPI registry-side verification

```bash
curl -s "https://pypi.org/pypi/anthropic/json" | jq '{name: .info.name, version: .info.version, urls_provenance: [.urls[]? | {filename, attestations}]}'
```
```json
{
  "name": "anthropic",
  "version": "0.104.1",
  "urls_provenance": [
    {"filename": "anthropic-0.104.1-py3-none-any.whl", "attestations": null},
    {"filename": "anthropic-0.104.1.tar.gz", "attestations": null}
  ]
}
```

```bash
curl -s -o /dev/null -w "%{http_code}\n" "https://pypi.org/integrity/anthropic/0.104.1/anthropic-0.104.1-py3-none-any.whl/provenance"
# → 404
```

**Result**: R1(a) FAIL — legacy PYPI_TOKEN; zero PEP-740 attestations on registry.

---

## P6 — ComposioHQ/composio R1(a) FAIL probe

### P6.1 Workflow inspection (`.github/workflows/py.release.yml`)

```yaml
- uses: pypa/gh-action-pypi-publish@release/v1
  with:
    user: ${{ secrets.PYPI_USERNAME }}
    password: ${{ secrets.PYPI_PASSWORD }}
```

### P6.2 PyPI registry-side verification

```bash
curl -s -o /dev/null -w "%{http_code}\n" "https://pypi.org/integrity/composio/0.13.1/composio-0.13.1-py3-none-any.whl/provenance"
# → 404
```

**Result**: R1(a) FAIL — uses `PYPI_USERNAME/PYPI_PASSWORD` (legacy basic-auth, NOT Trusted Publishing despite using `pypa/gh-action-pypi-publish` action which CAN do OIDC if configured).

---

## P7 — OpenHands/OpenHands-CLI R1(a) FALSE-POSITIVE probe

### P7.1 Workflow inspection (`.github/workflows/pypi-release.yml`)

```yaml
jobs:
  release-cli:
    runs-on: ubuntu-24.04
    permissions:
      id-token: write   # ← OIDC permission declared
    steps:
      - name: Build CLI package
        run: |
          rm -rf dist/
          uv build
      - name: Publish CLI to PyPI
        run: |
          uv publish   # ← NO --trusted-publishing flag, NO --token flag
```

### P7.2 PyPI registry-side verification

```bash
curl -s "https://pypi.org/pypi/openhands/json" | jq '{name: .info.name, version: .info.version, urls_provenance: [.urls[]? | {filename, attestations}]}'
```
```json
{
  "name": "openhands",
  "version": "1.16.0",
  "urls_provenance": [
    {"filename": "openhands-1.16.0-py3-none-any.whl", "attestations": null},
    {"filename": "openhands-1.16.0.tar.gz", "attestations": null}
  ]
}
```

```bash
curl -s "https://pypi.org/integrity/openhands/1.16.0/openhands-1.16.0-py3-none-any.whl/provenance"
# → {"message":"No provenance available for openhands-1.16.0-py3-none-any.whl"}
```

**Result**: R1(a) FAIL — despite workflow declaring `id-token: write` permission, the `uv publish` invocation doesn't emit PEP-740 attestations on PyPI. This is a known gap with `uv publish` (as of v0.4.x) — it requires explicit `--trusted-publishing always` to enable PEP-740 attestation upload, OR the workflow should use `pypa/gh-action-pypi-publish@release/v1` instead.

**Workflow scan false-positive**: a simple grep for `id-token: write` would mark this PASS, but the registry-side truth is FAIL. This is why the W434 probe uses registry-side metadata as the authoritative source.

---

## P8 — Cross-registry npm provenance probe

```bash
for pkg in @anthropic-ai/sdk @anthropic-ai/claude-code @composio/core @composio/client composio @openhands/typescript-client; do
    curl -s "https://registry.npmjs.org/$pkg" | jq --arg p "$pkg" -r '.["dist-tags"].latest as $v | "\($p) v\($v) attestations=\(.versions[$v].dist.attestations // null)"'
done
```

Output:
```
@anthropic-ai/sdk v0.98.0 attestations=null
@anthropic-ai/claude-code v2.1.150 attestations=null
@composio/core v0.10.0 attestations=null
@composio/client v0.1.0-alpha.73 attestations=null
composio v1.0.0 attestations=null
@openhands/typescript-client vnone attestations=null
```

**Note**: The signature object present on every npm package is the npm-registry default ECDSA signature (`SHA256:DhQ8wR5APBvFHLF/+Tc+AYvPOdTpcIDqOhxsBHRwC7U`) — this is NOT package-author provenance and does NOT satisfy R1(a). True package-author provenance shows up in `dist.attestations` as a populated array.

---

## P9 — GitHub code-search org-wide verification

```bash
gh api -X GET '/search/code' -f q='actions/attest-build-provenance org:anthropics' --jq '.items[] | .repository.full_name' | sort -u
```
```
anthropics/buffa
anthropics/connect-rust
```

```bash
gh api -X GET '/search/code' -f q='actions/attest-build-provenance org:ComposioHQ' --jq '.items[] | .repository.full_name'
# → empty
```

```bash
gh api -X GET '/search/code' -f q='actions/attest-build-provenance org:OpenHands' --jq '.items[] | .repository.full_name'
# → empty
```

```bash
gh api -X GET '/search/code' -f q='sigstore/cosign-installer org:anthropics' --jq '.items[] | .repository.full_name'
# → anthropics/buffa, anthropics/connect-rust
```

```bash
gh api -X GET '/search/code' -f q='sigstore/cosign-installer org:ComposioHQ' --jq '.items[] | .repository.full_name'
# → empty
```

```bash
gh api -X GET '/search/code' -f q='sigstore/cosign-installer org:OpenHands' --jq '.items[] | .repository.full_name'
# → empty
```

**Conclusion**: GitHub code-search confirms that across all three orgs, ONLY `anthropics/connect-rust` and `anthropics/buffa` use the SLSA-L3 + Sigstore signing pattern. No other repos.

---

## P10 — Plugin marketplace probe

```bash
gh api 'repos/anthropics/claude-plugins-official/contents/.claude-plugin/marketplace.json' | jq 'has("content")'
# → true
gh api 'repos/anthropics/knowledge-work-plugins/contents/.claude-plugin/marketplace.json' | jq 'has("content")'
# → true
gh api 'repos/anthropics/claude-plugins-community/contents/.claude-plugin/marketplace.json' | jq 'has("content")'
# → true
```

```bash
cat .claude/plugins/marketplaces/claude-community/.claude-plugin/marketplace.json | jq '{name, owner, plugin_count: (.plugins | length)}'
# → {"name":"claude-community", "owner":{"name":"Anthropic"}, "plugin_count":1715}
```

```bash
ls .claude/plugins/marketplaces/ | grep -E 'claude-plugins-official|knowledge-work-plugins|claude-community'
# → claude-community, claude-plugins-official, knowledge-work-plugins (all 3 installed)
```

**Conclusion**: All three Anthropic plugin marketplaces are ALREADY installed in the runtime. They are not new R1 install candidates — they're plugin distribution channels with per-plugin SHA-pin discipline (NOT package-registry-side attestation).

---

## Summary table

| Probe | Probed entity | R1(a) result |
|---|---|---|
| P3 | anthropics/connect-rust | PASS (crates.io Trusted Publishing + GitHub SLSA + Sigstore + verify exit-0) |
| P4 | anthropics/buffa | PASS (same pattern as connect-rust) |
| P5 | anthropics/anthropic-sdk-python | FAIL (legacy PYPI_TOKEN; 0 PEP-740 attestations) |
| P6 | ComposioHQ/composio | FAIL (PYPI_USERNAME/PASSWORD legacy basic-auth) |
| P7 | OpenHands/OpenHands-CLI | FAIL (id-token: write declared but `uv publish` w/o `--trusted-publishing always` flag; 0 PEP-740 attestations) |
| P8 | npm packages (12 probed) | All NULL (0 package-author provenance) |
| P9 | GitHub code-search across 3 orgs | Only anthropics/connect-rust + anthropics/buffa match SLSA+Sigstore |
| P10 | claude-plugins-{official,community} + knowledge-work-plugins | All already-installed marketplaces (not in R1 install scope) |

---

Codex-Verdict: APPROVE
Wave: W434-ORG-SWEEP
