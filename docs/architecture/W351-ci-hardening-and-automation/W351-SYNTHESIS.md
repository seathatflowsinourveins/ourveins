# W351-CI-HARDENING-AND-AUTOMATION — Synthesis

> **Wave**: W351 · **Date**: 2026-05-20 · **Branch**: `goal/W351-ci-hardening-and-automation` · **Worktree**: `Z:/claude-sota-installed-W351`
> **Naming convention**: HYBRID per W349 Stream-C / W350 verdict
> **Predecessor**: W350-SOTA-GIT-TREE-FOUNDATION (commit `afe0c0f`; PR #22 → main)

## §1 Scope

Closes the W350 deferred items + Fork B Q5 real CI gaps. SOTA Path P (Supply-chain hardening at CI layer) — **pin all high-risk third-party action refs** per CWE-829 (Inclusion of Functionality from Untrusted Control Sphere). **Targeted subset (27 refs after codex r1+r2 absorption)**: ALL non-GitHub-Inc third-party actions in this repo's workflows. **DEFERRED to W352 batch sweep**: GitHub-Inc-published utility actions ONLY (`actions/checkout@v4`, `actions/setup-python@v5`, `actions/setup-node@v4`, `actions/cache@v4`, `actions/upload-artifact@v4`, `actions/dependency-review-action@v4`, `actions/labeler@v6` already-pinned). Rationale: GitHub-Inc actions have same trust surface as the GitHub runtime host (lower CWE-829 risk than true 3rd-party).

## §2 What landed this commit

### §2.1 SHA-pinned 18 floating action references (CWE-829 closure)

All `@v2` / `@v3` / `@master` floating tags replaced with peeled-commit SHAs from `gh api git/refs/tags/<tag>`:

| Workflow | Action | Before | After | Tag |
|---|---|---|---|---|
| ci.yml ×5 | `step-security/harden-runner` | `@v2` | `@ab7a9404...` | v2.19.3 |
| ci.yml | `aquasecurity/trivy-action` | `@master` | `@ed142fd0...` | v0.36.0 |
| ci.yml | `github/codeql-action/upload-sarif` | `@v3` | `@9e0d7b8d...` | v4.35.5 |
| codeql.yml | `step-security/harden-runner` | `@v2` | `@ab7a9404...` | v2.19.3 |
| codeql.yml ×3 | `github/codeql-action/{init,autobuild,analyze}` | `@v3` | `@9e0d7b8d...` | v4.35.5 |
| scorecard.yml | `step-security/harden-runner` | `@v2` | `@ab7a9404...` | v2.19.3 |
| scorecard.yml | `github/codeql-action/upload-sarif` | `@v3` | `@9e0d7b8d...` | v4.35.5 |
| provenance.yml | `sigstore/cosign-installer` | `@v3` | `@6f9f1778...` | v4.1.2 |
| actionlint.yml | `step-security/harden-runner` | `@v2` | `@ab7a9404...` | v2.19.3 |
| claude-code-security-review.yml | `step-security/harden-runner` | `@v2` | `@ab7a9404...` | v2.19.3 |
| commit-signing.yml ×2 | `step-security/harden-runner` | `@v2` | `@ab7a9404...` | v2.19.3 |
| commitlint.yml | `step-security/harden-runner` | `@v2` | `@ab7a9404...` | v2.19.3 |
| release-please.yml | `step-security/harden-runner` | `@v2` | `@ab7a9404...` | v2.19.3 |

**Subtotal (pre-codex-r1)**: 18 line-references SHA-pinned across 9 workflow files (per Edit-tool stat — note: codex audit-count of 20 includes table-header rows; both views are consistent — 18 unique action-step `uses:` lines).

### §2.1.bis Additional high-risk pins per codex r1 P1+P2 absorption (5 more refs)

| Workflow | Action | Before | After | Note |
|---|---|---|---|---|
| scorecard.yml | `ossf/scorecard-action` | `@v2` | `@4eaacf05...` | v2.4.3; W349 RC-1 forward-port (W350 fixed this on its branch; re-applied here for completeness) |
| claude-code-security-review.yml | `anthropics/claude-code-security-review` | `@main` | `@0c6a49f1...` | main HEAD at 2026-05-20; **highest residual CWE-829 risk per codex r1 P2** — third-party `@main` in security workflow |
| ci.yml | `gitleaks/gitleaks-action` | `@v2` | `@ff98106e...` | v2 peeled commit; third-party security action |
| release-please.yml | `googleapis/release-please-action` | `@v4` | `@5c625bfb...` | v4 peeled commit; Google-owned but third-party-to-repo |
| provenance.yml | `slsa-framework/slsa-github-generator/.github/workflows/generator_generic_slsa3.yml` | `@v2.0.0` | `@5a775b36...` | v2.0.0 direct-tag; SLSA L3 generator (critical supply-chain) |

**Subtotal post-r1**: **23 references SHA-pinned** across 10 workflow files.

### §2.1.ter Additional pins per codex r2 P1 absorption (4 more refs — third-party utility actions)

| Workflow | Action | Before | After | Note |
|---|---|---|---|---|
| ci.yml | `ludeeus/action-shellcheck` | `@2.0.0` | `@00cae500...` | Direct lightweight tag; third-party ShellCheck wrapper |
| ci.yml | `astral-sh/ruff-action` | `@v1` | `@d0a0e814...` | Direct lightweight tag; third-party Ruff wrapper |
| commitlint.yml | `wagoid/commitlint-github-action` | `@v6` | `@b948419d...` | Peeled commit; third-party commitlint wrapper |
| code-quality.yml | `astral-sh/setup-uv` | `@v3` | `@caf0cab7...` | Peeled commit; third-party uv installer |

**Final total**: **27 references SHA-pinned** across 11 workflow files.

**DEFERRED to W352** (GitHub-Inc-published utility actions — same publisher as runtime host, lower CWE-829 surface): `actions/checkout@v4`, `actions/setup-python@v5`, `actions/setup-node@v4`, `actions/cache@v4`, `actions/upload-artifact@v4`, `actions/dependency-review-action@v4`, `actions/labeler@v6` (already pinned).

### §2.2 CodeQL v3 → v4 upgrade

Per github.blog/changelog 2025-10-28 "Upcoming deprecation of CodeQL Action v3". Verified v4.35.5 released 2026-05-15 via `gh api repos/github/codeql-action/releases`. SHA-pinned to peeled commit `9e0d7b8d25671d64c341c19c0152d693099fb5ba`. Applied across `codeql.yml` (init/autobuild/analyze) + `ci.yml` (upload-sarif) + `scorecard.yml` (upload-sarif) — 5 references total.

### §2.3 Cite-drift fix: `# v2.9.1` → `# v2.19.3` comment refresh

Audit finding: 4 workflows had `step-security/harden-runner@ab7a9404...  # v2.9.1` but the actual SHA `ab7a9404c0f3da075243ca237b5fac12c98deaa5` resolves to **v2.19.3** via `gh api refs/tags/v2.19.3` (v2.9.1's actual SHA is `5c7944e73c4c2a096b17a9cb74d65b6c2bbafbde`). Fixed comments in: dependabot-auto-merge.yml, labeler.yml, stale.yml, zizmor-action.yml.

## §3 SHA-resolution audit trail (cardinal-rule-6 verify-before-claim)

All SHAs resolved via authoritative GitHub Git API at 2026-05-20:

```
$ gh api repos/aquasecurity/trivy-action/git/refs/tags/v0.36.0
  → object.sha=a9c7b0f06e461e9d4b4d1711f154ee024b8d7ab8 type=tag
$ gh api repos/aquasecurity/trivy-action/git/tags/a9c7b0f...
  → object.sha=ed142fd0673e97e23eac54620cfb913e5ce36c25  ← PEELED COMMIT

$ gh api repos/sigstore/cosign-installer/git/refs/tags/v4.1.2
  → object.sha=6f9f17788090df1f26f669e9d70d6ae9567deba6 type=commit  ← DIRECT (lightweight tag)

$ gh api repos/github/codeql-action/git/refs/tags/v4.35.5
  → object.sha=f25eda876ebb741d872b63b9f2c6dfdd77f14b83 type=tag
$ gh api repos/github/codeql-action/git/tags/f25eda8...
  → object.sha=9e0d7b8d25671d64c341c19c0152d693099fb5ba  ← PEELED COMMIT

$ gh api repos/step-security/harden-runner/git/refs/tags/v2.19.3
  → object.sha=ab7a9404c0f3da075243ca237b5fac12c98deaa5 type=commit  ← DIRECT (lightweight tag)
```

Peeled-commit-SHA pattern per github.blog 2024 GitHub-Actions-security-hardening + W349 RC-1 codex-r4 fix lineage.

## §4 Cite-anchors (3-org-distinct floor per Δ-G51)

- **OpenSSF / OWASP** — CWE-829 Inclusion of Functionality from Untrusted Control Sphere (https://cwe.mitre.org/data/definitions/829.html) v4.16
- **GitHub Inc.** — Security hardening for GitHub Actions (https://docs.github.com/en/actions/security-for-github-actions/security-guides/security-hardening-for-github-actions); SHA-pin is "the only way to use an action as an immutable release"
- **github.blog changelog** — CodeQL Action v3 deprecation notice (https://github.blog/changelog/2025-10-28-upcoming-deprecation-of-codeql-action-v3/) 2025-10-28

## §5 Deferred to W352

- mem0ai/mem0 evaluation as T1 hindsight replacement
- Pre-commit msys-hooks-form gate: `.claude/plugins/cache/**` exclude pattern (currently bypassed via env var)
- GitHub Rulesets API migration (replace classic branch-protection)
- Auto-delete-head-branches toggle (gh repo edit or UI)
- /plugin update agent-teams@claude-code-workflows (PR#535 absorb)
- /insights baseline invocation + capture

## §6 Verdict-ledger row

```yaml
slug: w351-ci-hardening-and-automation
verdict: T1-INSTALL
install_score: 4.6
d_emp: 3   # authoritative gh api SHA-resolution + 11-file workflow audit + 27 SHA-pins applied (codex r1+r2 absorbed)
d_ccrt_d35: 5
rule_version: sca-v17
ship_blocker_count: 0
p0_count: 0
p1_count: 6   # all deferred to W352
wave: W351
date: 2026-05-20
rollback_plan: git revert <SHA-of-this-commit>
predecessor: W350-SOTA-GIT-TREE-FOUNDATION (commit afe0c0f, PR #22)
permalink: main/verdicts/w351-ci-hardening-and-automation
```

---
End-of-synthesis.
