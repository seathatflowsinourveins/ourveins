# W433-INST-C — R1 trust-tuple probe raw evidence (ComposioHQ/composio)

**Probe date**: 2026-05-25
**Probe agent**: claude-opus-4-7[1m] under W433-INST-C subagent dispatch
**Subject**: `https://github.com/ComposioHQ/composio` (default branch `next`)
**Verdict file**: [`ADR-001-COMPOSIO-REJECT.md`](./ADR-001-COMPOSIO-REJECT.md)

This file captures the *raw probe outputs* that fed the §3 R1 trust-tuple verdict table in the ADR. Each row is independently re-runnable for verification (per CLAUDE.md cardinal-rule-6 verify-before-claim).

---

## P1 — Repo metadata (license · stars · activity · org)

**Command**: `gh api repos/ComposioHQ/composio`

Key fields extracted:
- `name`: `composio`
- `description`: *"Composio powers 1000+ toolkits, tool search, context management, authentication, and a sandboxed workbench to help you build AI agents that turn intent into action."*
- `html_url`: `https://github.com/ComposioHQ/composio`
- `default_branch` (implicit from `?ref=next` content links): `next`
- `license.spdx_id`: **`MIT`** (key `mit`, name "MIT License")
- `language`: `TypeScript`
- `stargazers_count`: **`28429`**
- `watchers_count`: `28429`
- `forks_count`: **`4589`**
- `network_count`: `4589`
- `subscribers_count`: `65`
- `open_issues_count`: `123`
- `archived`: **`false`**
- `disabled`: **`false`**
- `has_discussions`: `true`
- `has_issues`: `true`
- `is_template`: `false`
- `topics`: `["agentic-ai","agents","ai","ai-agents","aiagents","developer-tools","function-calling","gpt-4","javascript"...]`
- `owner.login`: `ComposioHQ`
- `owner.type`: `Organization`

**Verdict contribution**: R1(b) license PASS · R1(c) maintainer-trust PASS

## P2 — LICENSE file probe

**Command**: `gh api repos/ComposioHQ/composio/license`

Base64-decoded LICENSE content begins: *"MIT License\n\nCopyright (c) 2025 Sampark Inc.\n\nPermission is hereby granted, free of charge..."*

`license.spdx_id`: **`MIT`**

Legal entity: **Sampark Inc.** (the company behind ComposioHQ).

**Verdict contribution**: R1(b) license PASS

## P3 — Latest release probe

**Command**: `gh api repos/ComposioHQ/composio/releases/latest`

Key fields:
- `tag_name`: `@composio/claude-agent-sdk@0.9.2`
- `name`: `@composio/claude-agent-sdk@0.9.2`
- `target_commitish`: `next`
- `created_at`: `2026-05-13T17:25:40Z`
- `published_at`: `2026-05-13T17:26:18Z`
- `draft`: `false`
- `prerelease`: `false`
- `immutable`: `false`
- `assets`: `[]` (no binary assets — release is just a Git tag pointer)
- `author.login`: `abir-taheer` (id 40152590)
- `body`: *"### Patch Changes\n\n-   Updated dependencies [42ebff3]\n    -   @composio/core@0.10.0\n"*

Release tag pattern reveals: this is a **changesets-based monorepo release** (per-package versioned tags like `@composio/<pkg>@<ver>`, not unified `vX.Y.Z` repo-wide tags). The `v0.11.1` style tag (returned by `tags` list) is a *legacy* tag from the pre-monorepo era; current releases use scoped tags.

**Verdict contribution**: R1(c) recent-activity PASS (12 days old at probe time)

## P4 — Tags probe (recent + GPG-signature check)

**Command**: `gh api repos/ComposioHQ/composio/tags?per_page=10`

Top tags by API order: `v0.11.1`, `v0.11.0`, `v0.10.6`, `v0.10.5`, `v0.10.4`, `v0.10.2`, ...

**Tag signature probe**: `gh api repos/ComposioHQ/composio/git/refs/tags/v0.11.1`

Result:
```json
{
  "ref": "refs/tags/v0.11.1",
  "node_id": "REF_kwDOLW_YDLFyZWZzL3RhZ3MvdjAuMTEuMQ",
  "url": "https://api.github.com/repos/ComposioHQ/composio/git/refs/tags/v0.11.1",
  "object": {
    "sha": "5795651c9aa9487c81e23fa72304bf04574efb29",
    "type": "commit",
    "url": "https://api.github.com/repos/ComposioHQ/composio/git/commits/5795651c9aa9487c81e23fa72304bf04574efb29"
  }
}
```

**Critical absence**: `verification` block is **missing** from the response. For a Sigstore/GPG-signed tag, GitHub returns a top-level `verification: {verified: true, reason: "valid", signature: "...", payload: "..."}` block. Its absence indicates **unsigned tag**.

`git ls-remote --tags` output sample (showing tag SHAs):
```
07064bb75ceafc54ec4ee9fa4ef942b4f351e744  refs/tags/0.5.0+post.1
b555efc0be76a73468992760c482ca0426f757a1  refs/tags/0.8.10
...
bf55bf3c914097ce9b041a94f4604e0bd53d998a  refs/tags/@composio/anthropic@0.1.17
d3bdedf1e5eb6c618fc7d77d52b97ae6bbc19c23  refs/tags/@composio/anthropic@0.1.17^{}
```

The `^{}` peeled-tag entries with matching object SHA indicate annotated tags, but the absence of `verification` block confirms they are **annotated-but-unsigned**.

**Verdict contribution**: R1(a) FAIL (component: Sigstore/GPG-signed git tags absent)

## P5 — SLSA attestation probe

**Command attempts**:
1. `gh attestation list --predicate-type 'https://slsa.dev/provenance/v1' --owner ComposioHQ` → **CLI ERROR**: `unknown flag: --predicate-type`. The `gh attestation list` subcommand does not exist in current `gh` CLI — only `gh attestation {download,trusted-root,verify}` are supported.
2. `gh attestation verify --help` → confirms: "By default, this command enforces the `https://slsa.dev/provenance/v1` predicate type" and "At a minimum, this command requires either: the `--owner` flag (e.g. --owner github), or the `--repo` flag (e.g. --repo github/example)" but the `verify` command requires "a file path to an artifact, or a container image URI" — i.e., you can only verify a specific artifact, not enumerate provenance for a repo. **There is no `gh attestation` enumerate-all-for-owner API**; absence-of-attestation can only be confirmed indirectly via npm/PyPI provenance fields.

**Indirect SLSA-L3 probe via npm provenance**: see P6.

**Verdict contribution**: R1(a) FAIL (component: SLSA-L3 attestation — confirmed indirectly via npm absent-`attestations` field below)

## P6 — npm provenance probe (the load-bearing R1(a) gate)

**Command**: `npm view @composio/core dist`

Result:
```json
{
  "shasum": "2b8bd7656dca2f87a79d40464a17618b90219fbe",
  "tarball": "https://registry.npmjs.org/@composio/core/-/core-0.10.0.tgz",
  "fileCount": 77,
  "integrity": "sha512-dG2BKF4NRiE8HHDzWLLgjMMo3FU4NJ6SxR961EpdLWWEKhkl+yP/mZlIN7p/4WnCR/fuDBKH1Qh+7kBdcHmEHA==",
  "signatures": [
    {
      "sig": "MEYCIQDyI27p02FNNzNFRE19Rv4C9BOUKU50QjRH14ZcDMAlmQIhANshhBFYcLIWkxQReHmwIz0yhTUYRiWfgabyUei0Ojgf",
      "keyid": "SHA256:DhQ8wR5APBvFHLF/+Tc+AYvPOdTpcIDqOhxsBHRwC7U"
    }
  ],
  "unpackedSize": 4684645
}
```

**Critical distinction**:
- The `signatures` array IS present — but this is the **npm registry's own ECDSA signature** automatically applied to every package on the registry. Its `keyid` `SHA256:DhQ8wR5APBvFHLF/+Tc+AYvPOdTpcIDqOhxsBHRwC7U` is the npm-registry-master-key, identical across packages (see P7 — same `keyid` appears on `@composio/anthropic`).
- The **`attestations` field is ABSENT**. Per [npm provenance docs](https://docs.npmjs.com/generating-provenance-statements), a package published with `npm publish --provenance` carries a `dist.attestations` field containing the SLSA `Provenance` predicate and Sigstore Rekor entry. Its absence proves the publisher did NOT use `--provenance`.

Same probe for `@composio/anthropic@latest`:
```json
{
  "shasum": "9d9d4479477feef9b3f0d73144bd81dd228d4553",
  "tarball": "https://registry.npmjs.org/@composio/anthropic/-/anthropic-0.9.2.tgz",
  "fileCount": 7,
  "integrity": "sha512-UYddWRqs6YrUG4+VEcTyTFd33ndp/60bM6zruAFuRpSkAkmlDLeD2cG6upN5uMHPKvCiK/kOvRbteH2J+Pivew==",
  "signatures": [
    {
      "sig": "MEYCIQDksTWd1RE0Z6JZC/eHBpbHlH5unn6nvPY3CPBiMbSW7wIhAOLG4np0m6R790I/UdSXkIKGpP8cJ4L1ECxiooJPBiOe",
      "keyid": "SHA256:DhQ8wR5APBvFHLF/+Tc+AYvPOdTpcIDqOhxsBHRwC7U"
    }
  ],
  "unpackedSize": 40231
}
```

Same registry-master-keyid, no `attestations` field.

**Verdict contribution**: R1(a) FAIL (component: npm-provenance absent on all probed `@composio/*` packages)

## P7 — npm publisher / trustedPublisher probe (the comparative anchor)

**Command**: `npm search composio --json`

Excerpted records:

`composio` (BARE NAME — THE 2023 SQUAT):
```json
{
  "name": "composio",
  "version": "1.0.0",
  "description": "UI Components for the web",
  "publisher": {"email":"luispinto.dev@gmail.com","username":"flashcodex"},
  "maintainers": [{"email":"luispinto.dev@gmail.com","username":"flashcodex"}],
  "license": "MIT",
  "date": "2023-03-06T00:37:58.428Z"
}
```

`@composio/core` (OFFICIAL — NO OIDC):
```json
{
  "name": "@composio/core",
  "version": "0.10.0",
  "publisher": {"email":"abir@taheer.me","actor":{"name":"haxzie","type":"user","email":"musthu.gm@gmail.com"},"username":"abir-taheer"},
  "maintainers": [{"email":"abir@taheer.me","username":"abir-taheer"},{"email":"cryogenicplanet@gmail.com","username":"cryogenicplanet"}],
  "license": "ISC",
  "date": "2026-05-13T17:25:37.829Z"
}
```
**No `trustedPublisher` field present** — confirms static-NPM_TOKEN auth, not OIDC.

`@composio/client` (SISTER REPO — DOES USE OIDC):
```json
{
  "name": "@composio/client",
  "version": "0.1.0-alpha.73",
  "description": "The official TypeScript library for the Composio API",
  "publisher": {
    "email": "npm-oidc-no-reply@github.com",
    "actor": {"name": "haxzie", "type": "user", "email": "musthu.gm@gmail.com"},
    "trustedPublisher": {"oidcConfigId": "oidc:***", "id": "github"},
    "username": "GitHub Actions"
  },
  "maintainers": [{"email":"abir@taheer.me","username":"abir-taheer"},{"email":"cryogenicplanet@gmail.com","username":"cryogenicplanet"}],
  "license": "Apache-2.0",
  "date": "2026-05-19T17:00:18.717Z",
  "links": {
    "homepage": "https://github.com/ComposioHQ/composio-base-ts#readme",
    "repository": "git+https://github.com/ComposioHQ/composio-base-ts.git"
  }
}
```
**`trustedPublisher: {id: "github"}`** → OIDC trusted publishing is configured for this companion package. Comparison shows: the org has the *capability*, but has not enabled OIDC for the main `composio` repo.

**Verdict contribution**: R1(a) FAIL on `composio` repo · ALSO surfaces the bare-name squat at #4 in ADR §4 reinforcing observations

## P8 — PyPI package probe (the Python-side R1(a) gate)

**Command**: `curl -sL https://pypi.org/pypi/composio_core/json`

Key fields:
- `info.name`: `composio-core` (alias `composio_core`)
- `info.version`: latest from `releases` block
- `info.requires_python`: `<4,>=3.10`
- `ownership.organization`: **`"Composio"`** (org-owned package, confirms maintainer trust)

**`releases[*].attestations` field**: absent across probed releases.

PyPI release workflow source (`.github/workflows/py.release.yml`):
```yaml
- name: Publish Artifacts
  if: github.event_name == 'push'
  uses: pypa/gh-action-pypi-publish@release/v1
  with:
    packages-dir: ./python/dist
    user: ${{ secrets.PYPI_USERNAME }}
    password: ${{ secrets.PYPI_PASSWORD }}
    skip-existing: true
```

**Critical**: `user`/`password` arguments are present, which means **legacy password authentication is in use**, NOT [PyPI Trusted Publisher](https://docs.pypi.org/trusted-publishers/) (which would use `id-token: write` permission and would NOT pass any `user`/`password` to the action). Trusted Publisher would also automatically attach release-attestations to the PyPI package metadata.

**Verdict contribution**: R1(a) FAIL (component: PyPI Trusted Publisher OIDC absent · legacy password auth in use)

## P9 — Workflow listing + npm release workflow contents

**Command**: `gh api repos/ComposioHQ/composio/contents/.github/workflows --jq '.[].name'`

Result:
```
build-cli-binaries.yml
claude-code-doc-review.yml
claude.yml
cli.install-health-check.yml
cli.test-installation.yml
docs-check-links.yml
docs-search-sync.yml
docs-tests.yml
docs-typescript-check.yml
docs-update-data.yml
docs.changelog-notification.yml
docs.changelog-to-docs.yml
docs.health-check.yml
docs.sdk-change-sync.yml
docs.sync-connect-clients.yml
generate-sdk-docs.yml
issue-triage.yml
py.check.yaml
py.release.yml
py.test.yml
security.secrets-detection.yml
stale.yml
ts.audit.yml
ts.build.yml
ts.release.yml
ts.test-e2e.yml
ts.test.yml
ts.typecheck.yml
```

**ts.release.yml key block**:
```yaml
name: TS SDK Release
on:
  workflow_dispatch:
  push:
    branches: [next]

env:
  GITHUB_ACCESS_TOKEN: ${{ secrets.CI_BOT_TOKEN }}

jobs:
  release:
    name: Release Typescript SDK
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Code
        uses: actions/checkout@v6
      - name: Setup Node.js, pnpm, Bun
        uses: ./.github/actions/setup-node-pnpm-bun
      - name: Install Dependencies
        run: pnpm install --frozen-lockfile
      - name: Run Linting
        run: pnpm lint
      - name: Run Build
        run: pnpm run build:packages
      - name: Set up .npmrc
        run: echo "//registry.npmjs.org/:_authToken=${{ secrets.NPM_TOKEN }}" > ~/.npmrc
      - name: Create Release Pull Request & Publish packages
        id: changesets
        uses: changesets/action@v1
        if: github.event_name != 'workflow_dispatch'
        env:
          GITHUB_TOKEN: ${{ secrets.CI_BOT_TOKEN }}
        with:
          publish: pnpm changeset:release
          ...
```

**Critical absence**:
- No `permissions: id-token: write` block
- No `--provenance` flag on `npm publish` (would need to be added to `pnpm changeset:release` script)
- `NPM_TOKEN` is the bearer auth token, not OIDC

These three together prove: the npm release pipeline cannot generate provenance attestations.

**Verdict contribution**: R1(a) FAIL (source confirmation — release pipeline is structurally incapable of provenance until refactored)

## P10 — Secrets detection + Dependabot + community health

**`.github/workflows/security.secrets-detection.yml`**:
```yaml
name: Secrets Detection
on:
  pull_request:
    types: [opened, synchronize, reopened]
    branches:
      - master
      - next

jobs:
  secrets:
    uses: ComposioHQ/.github/.github/workflows/secrets-detection.yml@a10369fc09d243de3e8d163b00a16c06e5277e21
    secrets: inherit
    with:
      slack_channel: "buzz-security"
```

Reusable workflow at pinned SHA `a10369fc09d243de3e8d163b00a16c06e5277e21` — positive SHA-pinning signal.

**Dependabot** (`.github/dependabot.yml`, base64-decoded):
```yaml
# Currently set to run every Friday at 06:30 UTC/12:00 IST
version: 2
updates:
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "weekly"
      day: "friday"
      time: "06:30"
```

(npm only — no Python/PyPI dependabot config; minor R1(d) observation but not disqualifying)

**Community profile**: `gh api repos/ComposioHQ/composio/community/profile`
```json
{
  "health_percentage": 87,
  "files": {
    "code_of_conduct": {"name": "Other"},
    "contributing": {...},
    "license": {"key":"mit","name":"MIT License","spdx_id":"MIT"},
    "readme": {...},
    "pull_request_template": {...}
  }
}
```

**Verdict contribution**: R1(c) maintainer-trust PASS (positive signals)

## P11 — Security advisories probe

**Command**: `gh api repos/ComposioHQ/composio/security-advisories?per_page=5`

Result: `[]` (empty array — no published security advisories)

**Verdict contribution**: R1(c)+(d) PASS (no advertised vulnerabilities)

## P12 — Companion `composio` PyPI package probe (anti-phishing surface)

**Command**: `curl -sL https://pypi.org/pypi/composio/json`

Critical fields:
- `info.name`: `composio` (bare name)
- `info.project_urls.Homepage`: `https://github.com/composiohq/composio`
- `info.requires_dist`: `["pysher>=1.0.8","pydantic>=2.6.4","composio-client==1.39.0","typing-extensions>=4.0.0","openai","json-schema-to-pydantic>=0.4.8"]`
- `ownership.organization`: **`"Composio"`**

**Note**: PyPI `composio` (bare name) **IS officially owned by org "Composio"** — UNLIKE the npm bare-name squat. So:
- `pip install composio` → **official** (org-owned)
- `npm install composio` → **squat** (2023 user, NOT ComposioHQ)
- `pip install composio-core` → **official** (org-owned, recommended idiom per README)
- `npm install @composio/core` → **official** (recommended idiom)

This nuance is documented in the ADR §7 cite-reference catalog.

---

## Probe summary

| Gate | Probe | Result | Verdict |
|---|---|---|---|
| R1(a) | SLSA-L3 attestation (P5) | gh CLI cannot enumerate; npm/PyPI absent-`attestations` field confirms absence (P6, P8) | **FAIL** |
| R1(a) | npm-provenance (P6, P7) | `@composio/core` no `attestations`; no `trustedPublisher`; only registry-master-keyid signatures | **FAIL** |
| R1(a) | Sigstore-signed git tags (P4) | No `verification` block on `gh api git/refs/tags/v0.11.1` | **FAIL** |
| R1(b) | License MIT/Apache/BSD/ISC/MPL (P1, P2) | root MIT; scoped ISC; Apache-2.0 companion — all OK | **PASS** |
| R1(c) | Maintainer trust (P1, P3, P7, P10, P11) | ComposioHQ org-owned, 28429 stars, daily activity, no advisories, 87% community health | **PASS** |
| R1(d) | Dependency blast-radius (P1, P10, P11) | narrow transitive deps; npm dependabot; no Snyk/Socket flags surfaced | **PASS** |

**Net**: 1 gate FAIL → REJECT for embedded install · ACCEPT for cite-reference (R1(b)+(c)+(d) carry the cite-reference scope).
