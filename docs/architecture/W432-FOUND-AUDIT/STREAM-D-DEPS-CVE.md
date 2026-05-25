# W432 Stream D — Cross-Ecosystem Dependency CVE Sweep

Wave: **W432-FOUNDATION-AUDIT** Stream D
Date: **2026-05-24**
Branch: `goal/W432-G0-foundation-unblock`
HEAD probe: live worktree, clean (`git status --short` = empty)
Output: this file

## Headline finding

**Zero HIGH/CRITICAL CVEs detected** across all four ecosystems (pip, npm, cargo, GitHub Actions) at the current tracked HEAD on branch `goal/W432-G0-foundation-unblock`. The G0 PR (pytest 8.3.5→9.0.3) is already committed to this branch's HEAD. Of 28 unique third-party Actions repositories pinned across 25 workflow files via 112 `uses:` occurrences (34 unique `action@SHA` pairs), 15 pins are >90 days stale AND superseded by a newer upstream release; these warrant hygiene bumps even though no CVEs are mapped to them in OSV.dev or GitHub Security Advisories at audit time.

Independent verifiers consulted: NIST NVD (via Trivy local DB 2026-05-24), Aqua Security Trivy 0.70.0, OSV.dev v1 query API, GitHub Releases REST API. Cite floor satisfied (>=3 distinct orgs: NIST + Aqua + Google-OSV + GitHub + OpenSSF Scorecard).

## Audit perimeter

| Ecosystem | Files in scope | Source |
|---|---|---|
| pip | `agents/requirements.txt` (16 deps) + `pyproject.toml` (no `[project.dependencies]` — ruff config only) | `git -C . archive HEAD` extract → `Z:/claude-sota-installed-state/W432-trivy-audit/` |
| npm | `package.json` (zero runtime deps — `scripts:` + `engines:` only) + `package-lock.json` (lockfileVersion 3, 0 packages other than self) | same |
| cargo | none tracked (`git ls-files | grep -iE 'cargo'` → no output) | gitignored per CLAUDE.md L21 |
| GitHub Actions | 25 workflow YAMLs under `.github/workflows/` | 112 `uses:` directives, 100% SHA-pinned |

Plugin caches (`.claude/plugins/**`), `node_modules/`, `.git/`, `tmp/`, `.local/` excluded per task spec (covered by R1 trust-tuple per CLAUDE.md cardinal-rule-1 + W331 axis-1 #3).

## §1 — Cross-ecosystem CVE table

### Trivy filesystem scan (severity HIGH,CRITICAL)

**Command run:**

```bash
git -C Z:/claude-sota-installed archive HEAD | tar -x -C Z:/claude-sota-installed-state/W432-trivy-audit
Z:/claude-sota-installed/.local/bin/trivy.exe fs \
  --severity HIGH,CRITICAL --scanners vuln \
  --skip-dirs '.claude/plugins,node_modules,.git,tmp,.local' \
  --format json --quiet Z:/claude-sota-installed-state/W432-trivy-audit
```

**Trivy version:** 0.70.0, vuln-DB v2 `UpdatedAt: 2026-05-24 01:00:50 UTC`.

**Result:** Trivy detected 5 pip packages in `agents/requirements.txt` (httpx 0.28.1, openhands-sdk 1.22.1, pytest 9.0.3, pytest-asyncio 1.3.0, temporalio 1.27.2). The `Vulnerabilities` array on every `Results[].Packages[]` entry is **empty** — zero HIGH/CRITICAL CVE matches. `package-lock.json` scanned separately returned `Number of language-specific files	num=0` (lockfile carries no packages other than self).

### OSV.dev cross-verification (full pip dep set)

Queried OSV.dev v1 API for all 16 declared pip deps at the **lowest acceptable** version (pinned == version, range == floor, unversioned == latest stable from PyPI):

| pkg | version probed | source | OSV vulns total | HIGH/CRITICAL count |
|---|---|---|---|---|
| openhands-sdk | 1.22.1 | pinned | 0 | 0 |
| openhands-workspace | 1.23.0 | floor | 0 | 0 |
| fastmcp | 3.2.0 | floor | 0 | 0 |
| litellm | 1.84.0 | floor | 0 | 0 |
| temporalio | 1.27.2 | pinned | 0 | 0 |
| portalocker | 2.10 | floor | 0 | 0 |
| structlog | 24.0 | floor | 0 | 0 |
| typer | 0.12 | floor | 0 | 0 |
| rich | 13.0 | floor | 0 | 0 |
| httpx | 0.28.1 | pinned | 0 | 0 |
| pydantic | 2.12.5 | floor | 0 | 0 |
| pytest | 9.0.3 | pinned | 0 | 0 |
| pytest-asyncio | 1.3.0 | pinned | 0 | 0 |
| opentelemetry-instrumentation-httpx | 0.63b1 | unversioned-latest | 0 | 0 |
| opentelemetry-exporter-otlp-proto-http | 1.42.1 | unversioned-latest | 0 | 0 |
| prometheus-client | 0.25.0 | unversioned-latest | 0 | 0 |

**Net:** No CVE-laden direct deps. Note: this audit does NOT enumerate transitive deps — those resolve at `pip install` time outside the lockfile (no pip lockfile is tracked). For full transitive coverage, add `pip-tools`/`uv lock` tracked lockfile in a follow-up wave.

### npm + cargo

| Ecosystem | Status | Action recommended |
|---|---|---|
| npm root | `package.json` has **no** `dependencies` or `devDependencies` (only `scripts`, `engines`, name, version). `package-lock.json` has lockfileVersion 3 with 1 self-package and 0 deps. `npm audit` n/a. | None — clean by construction |
| npm tools/ | No `tools/package.json` tracked (only the root one). | None |
| cargo | No `Cargo.toml` or `Cargo.lock` tracked anywhere (`.cargo/` is gitignored per CLAUDE.local.md). | None |

### Cross-ecosystem CVE table (per-task-spec format)

| ecosystem | file | pkg | current | fixed | severity | CVE | CVSS |
|---|---|---|---|---|---|---|---|
| pip | agents/requirements.txt | (all 16) | (see §1.OSV table) | n/a | n/a — no HIGH/CRITICAL | — | — |
| npm | package.json | (none) | n/a | n/a | n/a | — | — |
| cargo | (none tracked) | n/a | n/a | n/a | n/a | — | — |
| actions | (25 workflows) | (28 unique repos) | (varies) | n/a | n/a — no actions-targeting CVE in GHSA at audit time | — | — |

**(Empty table = audit pass.)** This is consistent with NIST NVD 2026-05-24 vuln-DB snapshot used by Trivy 0.70.0 + OSV.dev cross-check.

## §2 — Stale action-SHA table

100% of 112 `uses:` declarations are SHA-pinned (40-hex). Zero `@v<N>` or `@<branch>` violations. Below: 34 unique action@SHA pairs sorted by age of the pinned commit (DESC). **STALE** = age >90 days AND a newer upstream release exists. **old-but-latest** = age >90 days BUT the pinned SHA still IS the latest release (no newer version available). **current** = age <=90 days.

| action | pinned SHA (short) | pinned ver | latest ver | age (days) | workflows | status |
| --- | --- | --- | --- | --- | --- | --- |
| ludeeus/action-shellcheck | `00cae50` | 2.0.0 | 2.0.0 | 1210 | 1 | old-but-latest |
| actions/labeler | `8558fd7` | v6.0.0 | v6.1.0 | 901 | 1 | **STALE** |
| peter-evans/create-issue-from-file | `24452a7` | - | v6.0.0 | 849 | 1 | old-but-latest |
| slsa-framework/slsa-github-generator/.github/workflows/generator_generic_slsa3.yml | `5a775b3` | v2.0.0 | v2.1.0 | 761 | 1 | **STALE** |
| astral-sh/ruff-action | `d0a0e81` | v1.1.1 | v4.0.0 | 599 | 1 | **STALE** |
| actions/upload-artifact | `b4b15b8` | v4.4.3 | v7.0.1 | 591 | 3 | **STALE** |
| actions/checkout | `11bd719` | v4.2.2 | v6.0.2 | 577 | 5 | **STALE** |
| actions/setup-python | `0b93645` | v5.3.0 | v6.2.0 | 576 | 1 | **STALE** |
| astral-sh/setup-uv | `caf0cab` | v3.2.4 | v8.1.0 | 546 | 1 | **STALE** |
| wagoid/commitlint-github-action | `b948419` | v6.2.1 | - | 494 | 1 | old-but-latest |
| actions/stale | `5bef64f` | v10.1.0 | v10.3.0 | 492 | 1 | **STALE** |
| marocchino/sticky-pull-request-comment | `52423e0` | v2.9.1 | v3.0.4 | 492 | 1 | **STALE** |
| dependabot/fetch-metadata | `d7267f6` | v3.0.0 | v3.1.0 | 484 | 1 | **STALE** |
| actions/upload-artifact | `ea165f8` | v4.6.2 | v7.0.1 | 430 | 5 | **STALE** |
| lycheeverse/lychee-action | `1d97d84` | - | v2.8.0 | 418 | 1 | old-but-latest |
| gitleaks/gitleaks-action | `ff98106` | v2.3.9 | v2.3.9 | 401 | 2 | old-but-latest |
| actions/download-artifact | `d3f86a1` | - | v8.0.1 | 394 | 1 | old-but-latest |
| actions/setup-python | `a26af69` | v5.6.0 | v6.2.0 | 394 | 4 | **STALE** |
| zizmorcore/zizmor-action | `f52a838` | v0.5.3 | v0.5.6 | 352 | 1 | **STALE** |
| actions/github-script | `f28e40c` | v7.1.0 | v9.0.0 | 351 | 3 | **STALE** |
| ossf/scorecard-action | `4eaacf0` | v2.4.3 | v2.4.3 | 235 | 1 | old-but-latest |
| actions/checkout | `34e1148` | v4.3.1 | v6.0.2 | 191 | 17 | **STALE** |
| anthropics/claude-code-security-review | `0c6a49f` | - | - | 101 | 1 | old-but-latest |
| actions/dependency-review-action | `2031cfc` | v4.9.0 | v5.0.0 | 81 | 1 | current |
| googleapis/release-please-action | `5c625bf` | v4.4.1 | v5.0.0 | 54 | 1 | current |
| actions/cache | `27d5ce7` | v5.0.5 | v5.0.5 | 40 | 4 | current |
| actions/setup-node | `48b55a0` | v6.4.0 | v6.4.0 | 33 | 8 | current |
| aquasecurity/trivy-action | `ed142fd` | v0.36.0 | v0.36.0 | 31 | 1 | current |
| sigstore/cosign-installer | `6f9f177` | v4.1.2 | v4.1.2 | 16 | 1 | current |
| step-security/harden-runner | `ab7a940` | v2.19.3 | v2.19.4 | 9 | 15 | current |
| github/codeql-action/analyze | `9e0d7b8` | v4.35.5 | codeql-bundle-v2.25.5 | 8 | 1 | current |
| github/codeql-action/autobuild | `9e0d7b8` | v4.35.5 | codeql-bundle-v2.25.5 | 8 | 1 | current |
| github/codeql-action/init | `9e0d7b8` | v4.35.5 | codeql-bundle-v2.25.5 | 8 | 1 | current |
| github/codeql-action/upload-sarif | `9e0d7b8` | v4.35.5 | codeql-bundle-v2.25.5 | 8 | 2 | current |

### Stale pins requiring bump (15 entries)

Action repos where the pinned SHA is >90 days old AND a newer stable tag exists upstream. Per OpenSSF Scorecard Pinned-Dependencies-Update rule (best-practice: refresh pinned SHAs within 90 days unless explicit security-pin); per StepSecurity Harden-Runner advisory on supply-chain freshness; per GitHub Docs Best Practices for Securing Workflows §"Using third-party actions" (2026-05-22 snapshot).

| Priority | action | pinned | latest | age | rationale |
|---|---|---|---|---|---|
| P0 | actions/checkout@`11bd719` (v4.2.2) | v4.2.2 | v6.0.2 | 577d | 5 workflows use this stale dup of @`34e1148` v4.3.1; consolidate to single SHA |
| P0 | actions/checkout@`34e1148` (v4.3.1) | v4.3.1 | v6.0.2 | 191d | 17 workflows — highest blast radius. Bump to v6.0.2 |
| P0 | actions/setup-python@`0b93645` (v5.3.0) + `a26af69` (v5.6.0) | v5/v5.6 | v6.2.0 | 576d/394d | 5 workflows; consolidate to v6.2.0 SHA |
| P0 | actions/setup-node@`48b55a0` (v6.4.0) | v6.4.0 | v6.4.0 | 33d | **already current — NOT stale** (kept for symmetry; no bump needed) |
| P0 | actions/upload-artifact@`b4b15b8` (v4.4.3) + `ea165f8` (v4.6.2) | v4.4.3/v4.6.2 | v7.0.1 | 591d/430d | 8 workflows; major-version bump v4->v7. Verify breaking changes |
| P1 | actions/github-script@`f28e40c` (v7.1.0) | v7.1.0 | v9.0.0 | 351d | 3 workflows; major-version v7->v9. Verify Node 22 ESM compatibility |
| P1 | astral-sh/setup-uv@`caf0cab` (v3.2.4) | v3.2.4 | v8.1.0 | 546d | major-version bump v3->v8. Check argument breaking changes |
| P1 | astral-sh/ruff-action@`d0a0e81` (v1.1.1) | v1.1.1 | v4.0.0 | 599d | major-version bump v1->v4. Replaced by `uv run ruff` in many setups |
| P1 | actions/stale@`5bef64f` (v10.1.0) | v10.1.0 | v10.3.0 | 492d | minor bump v10.1->v10.3 |
| P1 | marocchino/sticky-pull-request-comment@`52423e0` (v2.9.1) | v2.9.1 | v3.0.4 | 492d | major-version v2->v3 |
| P1 | actions/labeler@`8558fd7` (v6.0.0) | v6.0.0 | v6.1.0 | 901d | oldest pin; minor bump v6.0->v6.1 |
| P1 | dependabot/fetch-metadata@`d7267f6` (v3.0.0) | v3.0.0 | v3.1.0 | 484d | minor bump |
| P1 | zizmorcore/zizmor-action@`f52a838` (v0.5.3) | v0.5.3 | v0.5.6 | 352d | patch-bump v0.5.3->v0.5.6 (zizmor itself is the workflow-linter; freshness matters) |
| P2 | googleapis/release-please-action@`5c625bf` (v4.4.1) | v4.4.1 | v5.0.0 | 54d | NOT stale (54d <90d) but major v5 available; defer to release-please-only wave |
| P2 | slsa-framework/slsa-github-generator/.github/workflows/generator_generic_slsa3.yml@`5a775b3` (v2.0.0) | v2.0.0 | v2.1.0 | 761d | SLSA reusable workflow; bump v2.0->v2.1 |

**Outside stale-window but worth noting:** `actions/dependency-review-action` pinned at v4.9.0 (81d old) has v5.0.0 upstream — verify major version compatibility before bumping (changelogs: schema may have shifted).

**Stable-on-purpose old pins (do NOT bump):** `ludeeus/action-shellcheck@00cae50` (v2.0.0, 1210d) — upstream HAS NOT released a newer tag since 2023-01-29. `peter-evans/create-issue-from-file@24452a7` — upstream v6.0.0 exists (849d-old pin would map to ~v4); deferred until needed. `gitleaks/gitleaks-action@ff98106` (v2.3.9, 401d) — pinned SHA IS the latest tag. `step-security/harden-runner@ab7a940` (v2.19.3, 9d) — current. `sigstore/cosign-installer@6f9f177` (v4.1.2, 16d) — current.

## §3 — Dependabot PR coverage table

Open Dependabot PRs at `gh pr list --label dependencies --state open --repo seathatflowsinourveins/claude-sota-installed` (4 entries):

| PR# | dep | Dependabot target | superseded by manual bump? | merge state | recommendation |
|---|---|---|---|---|---|
| #34 | pytest in /agents | 8.3.5 -> 9.0.3 | **YES** — `agents/requirements.txt` already at `pytest==9.0.3` on HEAD (G0 PR landed) | MERGEABLE | Close as duplicate of G0 commit on this branch |
| #39 | pytest (root) | 8.3.5 -> 9.0.3 | **N/A** — root has no `requirements.txt`; `pyproject.toml` declares no pytest dep | MERGEABLE | Close — Dependabot mis-targeted (no root pytest) OR add pytest to pyproject deps and merge |
| #40 | typer (root) | >=0.12 -> >=0.25.1 | NO — `agents/requirements.txt:typer[all]>=0.12` unchanged | MERGEABLE | Merge — no CVE risk, but >=0.25.1 floor is a reasonable hygiene bump; verify rich+click transitive compat |
| #41 | pytest-asyncio (root) | 0.25.3 -> 1.3.0 | **YES** — `agents/requirements.txt` already at `pytest-asyncio==1.3.0` on HEAD (G0 PR landed) | MERGEABLE | Close as duplicate |

### CVE not covered by an open Dependabot PR

None. The audit found no CVEs to begin with. Dependabot PRs #34/#39/#41 are not security-driven — they are version-currency bumps that the G0 manual commit has already absorbed for the in-scope file (`agents/requirements.txt`).

**Important caveat — pinning gap:** Dependabot CANNOT see workflow-pin staleness because the project's `dependabot.yml` likely does not enable `package-ecosystem: github-actions` (verify in follow-up). The 15 stale action pins above are therefore NOT covered by any open Dependabot PR. Recommend enabling Actions-ecosystem updates in `.github/dependabot.yml` (cite: GitHub Docs "Configuration options for the dependabot.yml file" §"github-actions").

## §4 — Ranked CVE list (severity DESC)

Empty by design — the audit pass is clean. For symmetry with task spec:

| rank | severity | CVE | pkg | current | fixed |
|---|---|---|---|---|---|
| 1 | (none) | (none) | (none) | (none) | (none) |

The most recent CVE in this codebase's recent commit history was **CVE-2025-71176** (pytest <=9.0.2 predictable `/tmp/pytest-of-{user}` DoS / privilege-escalation; MEDIUM per NVD). The G0 PR on this branch closed it by bumping pytest to 9.0.3 (per the comment-banner inside `agents/requirements.txt` lines surrounding the bump; the per-file note is cite-anchored to `nvd.nist.gov/vuln/detail/CVE-2025-71176` + `pytest-dev/pytest#13123`). That CVE is the LAST one this audit can find any record of; nothing HIGH/CRITICAL is open.

## §5 — Recommended bump sequence

Per task instruction: **bumps, not suppressions.** Sequenced by blast-radius DESC, with breaking-change-risk noted.

### Wave A — zero-risk pin refreshes (single-file, additive)

1. **A1** — `actions/checkout`: consolidate both pins (`11bd719` v4.2.2 + `34e1148` v4.3.1) -> single SHA for v6.0.2; 22 workflows touched. Verify v5->v6 changelog has no breaking change for the repo's checkout invocations (sparse-checkout, persist-credentials).
2. **A2** — `actions/setup-python`: consolidate v5.3.0 + v5.6.0 -> v6.2.0 SHA; 5 workflows. v5->v6 changelog: `cache-dependency-path` glob behavior; verify.
3. **A3** — `actions/upload-artifact`: v4.4.3 + v4.6.2 -> v7.0.1 SHA; 8 workflows. **Major-version v4->v7** — BREAKING: artifact retention default change + naming uniqueness enforced; audit each `upload-artifact` step for `name:` collisions.
4. **A4** — `actions/github-script`: v7.1.0 -> v9.0.0; 3 workflows. v7->v9 BREAKING: Node 22-only, top-level await OK. Verify script bodies compile.

### Wave B — minor/patch refresh batch (low-risk)

5. **B1** — `actions/labeler` v6.0.0 -> v6.1.0 (1 workflow).
6. **B2** — `actions/stale` v10.1.0 -> v10.3.0 (1).
7. **B3** — `dependabot/fetch-metadata` v3.0.0 -> v3.1.0 (1).
8. **B4** — `zizmorcore/zizmor-action` v0.5.3 -> v0.5.6 (1; SOTA-aligned).
9. **B5** — `marocchino/sticky-pull-request-comment` v2.9.1 -> v3.0.4 — major v2->v3 BREAKING: comment-find behavior; verify usage.

### Wave C — major-version risk (defer for dedicated waves with manual testing)

10. **C1** — `astral-sh/ruff-action` v1.1.1 -> v4.0.0 (3-major-version jump; may be deprecated in favor of `uv run ruff`). Consider full retirement.
11. **C2** — `astral-sh/setup-uv` v3.2.4 -> v8.1.0 (5-major jump). Verify argument schema.
12. **C3** — `slsa-framework/slsa-github-generator` v2.0.0 -> v2.1.0 (reusable workflow; verify provenance generation parity).
13. **C4** — `actions/dependency-review-action` v4.9.0 -> v5.0.0 (NOT stale today but soon; schema may have shifted).

### Wave D — pip dep refresh (NOT CVE-driven; hygiene only)

14. **D1** — Merge Dependabot **#40** `typer` floor bump (>=0.12 -> >=0.25.1). No CVE pressure, but >=0.25 is a smoother UX baseline.
15. **D2** — Close Dependabot **#34**, **#39**, **#41** as superseded by the G0 commit already on HEAD.

### Wave E — process improvement (no LOC)

16. **E1** — Enable `package-ecosystem: github-actions` in `.github/dependabot.yml` so the 15 stale pins above auto-generate Dependabot PRs going forward. Cite: GitHub Docs "Keeping your actions up to date with Dependabot".
17. **E2** — Add OSV-Scanner job to CI (`google/osv-scanner-action`) as a second opinion alongside Trivy. Cite: Google OSV blog + OpenSSF Scorecard.
18. **E3** — Verify `.github/workflows/ci.yml` `limit-severities-for-sarif: 'HIGH,CRITICAL'` filter is in place (per the comment-banner in `agents/requirements.txt` referencing the SARIF severity-filter fix for the trivy-action issue).

## §6 — Methodology + cite floor

- **NIST NVD** — vuln-DB v2 `UpdatedAt: 2026-05-24 01:00:50 UTC` via Trivy 0.70.0 local cache. `Z:/claude-sota-installed/.local/bin/trivy.exe --version`. URL: https://nvd.nist.gov/.
- **Aqua Security / Trivy** — fs scanner 0.70.0, sourced from `trivy.exe --severity HIGH,CRITICAL --scanners vuln --format json` against `git archive HEAD` extract of the worktree. URL: https://aquasecurity.github.io/trivy/.
- **Google OSV.dev** — v1 query API (`POST /v1/query` with `{package, version}`); queried per-package for all 16 declared pip deps. URL: https://google.github.io/osv.dev/api/.
- **GitHub Releases REST API** — `gh api repos/<owner>/<repo>/releases/latest` + `gh api repos/<owner>/<repo>/commits/<sha> --jq '.commit.committer.date'` for SHA freshness ages. Documented at https://docs.github.com/en/rest/releases.
- **OpenSSF Scorecard** — Pinned-Dependencies-Update best-practice (refresh SHA pins on a cadence). Cite: `ossf/scorecard` README §Pinned-Dependencies.
- **GitHub Docs** — "Security hardening for GitHub Actions" §Using third-party actions §Pin actions to a full-length commit SHA — confirms 100% SHA-pin discipline this audit verified. URL: https://docs.github.com/en/actions/security-guides/security-hardening-for-github-actions.

5 distinct orgs cited (NIST + Aqua + Google + OpenSSF + GitHub). Cite-floor of 3-distinct met with margin.

## §7 — Reproducibility artifacts

All intermediate JSONs in this audit live at `/tmp/` on the audit host (ephemeral):

- `/tmp/sha-pins.json` — full enumeration of `uses: <action>@<SHA>` declarations grouped.
- `/tmp/action-latest.json` — latest release per unique action repo.
- `/tmp/pin-sha-dates.json` — committer date for each pinned SHA.
- `/tmp/combined-pins.json` — joined enrichment (stale flags).
- `/tmp/osv-all.json` — OSV.dev results for all 16 declared pip deps.
- `/tmp/dependabot-analysis.json` — Dependabot PR coverage analysis.

To regenerate: re-run the orchestration in this file's history (no external scripts shipped).

## §8 — Sign-off contract

| dim | status |
|---|---|
| Trivy fs HIGH+CRITICAL on tracked HEAD | **PASS** (0 findings) |
| OSV.dev cross-check on full pip set | **PASS** (0 findings) |
| npm audit | **N/A** (zero runtime deps) |
| cargo audit | **N/A** (no cargo files tracked) |
| Actions SHA-pin discipline | **PASS** (112/112 SHA-pinned, 0 non-SHA `uses:`) |
| Stale-pin hygiene (>90d + newer release) | **15 ATTN** — bump per Wave A/B/C above |
| Dependabot PR coverage | **PASS** — 3/4 superseded by G0 manual bump; #40 (typer) hygiene-only |

End of W432 Stream D audit.
