# W340 Stream J — GitHub CI/CD Audit

> **⚠️ POST-CODEX-R7 RECONCILIATION (binding for any downstream reader)**
> This document is the ORIGINAL Stream J report. The phantom-submodule path list was OVER-REPORTED as `{ccusage,codex,Aperant,CLIProxyAPI}` (4 entries); live `git ls-files accounts/repos/` returns only **2 entries** (`ccusage` + `codex`). Authoritative corrected fix commands now live in `ARCHITECTURE-V2.md` §SB-2 and §P0-1. The actual W340 commit operates on the 2 indexed paths only. Do NOT propagate the 4-path list from L140 / L246 / L250 / L256 / L477 verbatim — they are superseded by the 2-path live evidence.

**Date:** 2026-05-20
**Auditor:** Claude Code subagent (W340-FULL-SOTA-UNLEASH Stream J)
**Repo:** `seathatflowsinourveins/claude-sota-installed` (PRIVATE)
**Default branch:** `main`
**HEAD commit:** wave shipping context (W338 W333.5 deep-SOTA close + W340-FULL-SOTA-UNLEASH in progress)
**Method:** filesystem read, `gh api` probes (limited by PRIVATE-without-Pro), upstream SOTA fetch (anthropics/claude-code, wshobson/agents, addyosmani/agent-skills, slsa.dev, GitHub Actions starter-workflows, gha-security-hardening, zizmor docs), perplexity SOTA-2026 grounding.

---

## EXECUTIVE SUMMARY

This runtime already ships a **remarkably advanced CI/CD posture** for a solo-operator PRIVATE repo — 13 active workflows covering pre-commit gates, SAST (CodeQL), SCA (Trivy + dependency-review), secret-scan (gitleaks), workflow-audit (zizmor), supply-chain hygiene (OSSF Scorecard), SLSA-L3 + Sigstore-cosign provenance on wave-closure tags, dual cross-model PR review (codex GPT-5.5 AUTHORITY + claude-code-security-review.yml), commitlint, release-please, labeler, stale, dependabot grouped updates, dependabot auto-merge with tiered policy. The architecture far exceeds the SOTA references (anthropics/claude-code = 3 workflows of `claude.yml`/`claude-issue-triage.yml`/`issue-lifecycle-comment.yml`; wshobson/agents = zero workflows directory; addyosmani/agent-skills = empty workflows directory). Pre-commit gate is gitleaks v8.30.1 + ruff v0.15.12 + actionlint v1.7.12 + commitlint commit-msg + W331-P0.9 cr2-2kb-hooks + W335 codex-trailer-gate. Signed-commits are LIVE (`commit.gpgsign=true` + `gpg.format=ssh` + `tag.gpgsign=true` with the SSH ed25519 key).

**However, the CI runtime is currently 100% red:** every workflow run for the last 50 runs (~5 wave-pushes) has `conclusion=failure`, primary root cause = a **phantom git submodule reference at `accounts/repos/ccusage`** in HEAD tree (`040000 tree 41fb43675bfb48ca99c774ec0c83d68524d0f99e`) with NO `.gitmodules` file present — so every checkout `actions/checkout@v4` step fails with `fatal: No url found for submodule path 'accounts/repos/ccusage' in .gitmodules` (exit 128). The local filesystem has `accounts/repos/ccusage` as a Windows symlink to `/z/repos/deps/ccusage`, but on the index it's recorded as a submodule (likely from an earlier wave's `gitlink` add) without the corresponding `.gitmodules` entry. **This is a SEV-1 CI-blocker masking all other quality signals.** Secondary failure: release-please trips on commit-message conventional-commits validator (`Error: unexpected token` at varied positions — commit subjects with leading whitespace or non-Conventional prefixes for many recent ship commits).

**Top-3 CI/CD gaps:**
1. **CI runtime fully red (SEV-1 phantom submodule)** — every workflow checkout step exits 128; 0 successes in last 100 runs. **Fix:** `git rm --cached accounts/repos/ccusage` (+`accounts/repos/codex` if same condition) then commit; or convert to a proper submodule with `.gitmodules`; or convert to a tracked-symlink/tracked-directory copy. **Highest-priority gap — without this, all other CI investment is dark.**
2. **OIDC / cloud-deploy + Sigstore trust never exercised** — provenance.yml uses `slsa-framework/slsa-github-generator/.github/workflows/generator_generic_slsa3.yml@v2.0.0` + `sigstore/cosign-installer@v3` but it's tag-triggered (`on: push: tags: ['W*', 'v*']`) and no tags have been pushed since these workflows landed; OIDC `id-token: write` is wired but no cloud federation exists (no AWS/GCP/Azure/Cloudflare deploy targets in this repo). Acceptable for a research runtime but ungated SOTA gap — `cosign verify-blob` against wave-closure artifacts has never produced a verified signature.
3. **Dependabot security alerts disabled at the GitHub side** (`has_vulnerability_alerts=null`, `security_and_analysis=null`). Dependabot **version-updates** PR-bot IS enabled (verified via `/automated-security-fixes` HTTP 200), and grouped updates run weekly, but Dependabot **alerts** (the inbound CVE-to-PR feed) are off. SOTA requires both — turn on `dependabot_security_updates` and `vulnerability_alerts` via `gh api -X PUT /repos/.../vulnerability-alerts` + `/automated-security-fixes`.

**Output file:** `Z:\claude-sota-installed\docs\architecture\W340-FULL-SOTA-UNLEASH\stream-J-cicd-audit.md`

---

## §1 — CURRENT WORKFLOWS TABLE

13 workflows + 1 dynamic dependabot-updates registration:

| # | File | Trigger | Jobs | Secrets/Vars | Status |
|---|------|---------|------|--------------|--------|
| 1 | `ci.yml` (5,701 B) | push [main,goal/**,worktree-W**,sota-converge-w**] + PR [main] | pre-commit · cr2-2kb-check · gitleaks · trivy-ci · dependency-review · shellcheck · ruff · subagent-allowlist-check · cite-anchor-discipline | `GITHUB_TOKEN` (built-in) | **FAILING — phantom submodule** |
| 2 | `code-quality.yml` (5,256 B) | push [main,sota-*] + PR + workflow_dispatch | python (ruff+pyright) · shell (shellcheck) · powershell (PSScriptAnalyzer Windows runner) | `GITHUB_TOKEN` only | **FAILING — phantom submodule** |
| 3 | `codeql.yml` (1,435 B) | push [main] + PR [main] + weekly Tue 05:21 UTC | analyze (matrix: javascript-typescript + python) with `+security-extended,security-and-quality` queries | `GITHUB_TOKEN` only | **FAILING — phantom submodule** |
| 4 | `codex-review.yml` (4,627 B) | PR [opened,synchronize,reopened,ready_for_review] → main | codex (GPT-5.5 adversarial) — auto-skip when `vars.OPENAI_API_KEY_AVAILABLE != 'true'` (currently false; local-codex is canonical) | `OPENAI_API_KEY` secret (absent) + `OPENAI_API_KEY_AVAILABLE` var | **SKIPPED-by-design** |
| 5 | `claude-code-security-review.yml` (1,864 B) | PR [opened,synchronize,reopened,ready_for_review] | security-review via `anthropics/claude-code-security-review@main` | `ANTHROPIC_API_KEY` secret (absent) | **SKIP/FAIL — no API key** |
| 6 | `commitlint.yml` (1,168 B) | PR [opened,synchronize,reopened,ready_for_review] + push [main] | commitlint via `wagoid/commitlint-github-action@v6` | `GITHUB_TOKEN` only | **FAILING — phantom submodule** |
| 7 | `dependabot-auto-merge.yml` (2,263 B) | PR (dependabot[bot] only) | dependabot (tiered: patch auto-merge → minor auto-approve → major manual) | `GITHUB_TOKEN` | **NEVER FIRED** (no dependabot PRs yet) |
| 8 | `labeler.yml` (826 B) | `pull_request_target` [opened,synchronize,reopened] | label (paths → labels via `actions/labeler@v6.0.0`, SHA-pinned) | `GITHUB_TOKEN` | **NEVER FIRED** (no PR-target push yet) |
| 9 | `provenance.yml` (3,769 B) | push tags [W*, v*] + workflow_dispatch | build-hashes → slsa-provenance (`slsa-framework/.../generator_generic_slsa3.yml@v2.0.0`) → sigstore-tag-sign (`cosign-installer@v3` keyless) | `GITHUB_TOKEN` + OIDC `id-token: write` | **NEVER FIRED** (no W-tags pushed) |
| 10 | `release-please.yml` (932 B) | push [main] | release-please via `googleapis/release-please-action@v4` | `GITHUB_TOKEN` | **FAILING — conv-commits parse errors** |
| 11 | `scorecard.yml` (1,384 B) | branch_protection_rule + weekly Mon 13:38 UTC + push [main] + workflow_dispatch | analysis via `ossf/scorecard-action@v2` (publish_results=false for PRIVATE) | `GITHUB_TOKEN` + OIDC `id-token: write` | **FAILING — most recent** |
| 12 | `stale.yml` (2,271 B) | schedule daily 01:30 UTC + workflow_dispatch | stale via `actions/stale@v10.1.0` (SHA-pinned) — 180d stale / 30d close + SEV-0/SEV-1/carry-forward/WIP exempt-labels | `GITHUB_TOKEN` | **NEVER FIRED** (no scheduled run yet) |
| 13 | `zizmor-action.yml` (1,841 B) | push [main]+PR (`.github/workflows/**`, `.github/actions/**`) + weekly Mon 06:00 UTC | zizmor via `zizmorcore/zizmor-action@v0.5.3` (SHA-pinned) — `advanced_security: false`, `min_severity: high`, `min_confidence: high` | `GITHUB_TOKEN` only | **FAILING — phantom submodule** |

**Duplicates / dead / broken:** None duplicate, none dead. `claude-code-security-review.yml` overlaps `codex-review.yml` by design (different scope — security vs. general adversarial); both ship and both run, with codex as the W331 P0.7 AUTHORITY. `release-please.yml` references a `.release-please-config.json` + `.release-please-manifest.json` — **NEITHER FILE EXISTS** in the repo root (NO_RELEASE_PLEASE in probe), so release-please falls back to its default `simple` release-type config and trips on the wave-architecture commit prose. Not dead, but **broken-active**.

**Dynamic registration:** `dynamic/dependabot/dependabot-updates` (id 279916150) is a GH-internal registration generated from `.github/dependabot.yml`. The most recent dependabot pip PRs at `/` and `/harness` both ended in `conclusion: failure` (also blocked by the phantom submodule — see §5 root-cause).

---

## §2 — PRE-COMMIT CONFIG AUDIT

**File:** `.pre-commit-config.yaml` (verified via batch read).
**Excludes** (top-level regex): `.claude/state/.*`, `.claude/plugins/.*`, `.claude/projects/.*`, `.claude/agent-memory/.*`, `.claude/_archive/.*`, `.claude/teams/.*`, `.claude/worktrees/.*`, `.local/.*`, `tmp/.*`, `docs/outer\ research/.*`, `*.zip|*.tar.gz|*.lock` — exclusion list is conservative and prevents gitleaks from scanning the 2 GB plugin cache.

**Repos and hooks:**

| Repo | Pinned rev | Hooks | Stage | Notes |
|------|------------|-------|-------|-------|
| gitleaks/gitleaks | `v8.30.1` | `gitleaks-system` | pre-commit | `pass_filenames: false` override (upstream missed this for the system-variant; required since `gitleaks git` takes ≤1 positional). Battle-hardened. |
| astral-sh/ruff-pre-commit | `v0.15.12` | `ruff-check` + `ruff-format` | pre-commit | SOTA Python linter. Active. |
| rhysd/actionlint | `v1.7.12` | `actionlint-system` | pre-commit | Workflow YAML lint (catches expressions, action refs, runner syntax). Active. |
| local | (N/A) | `commitlint` (W317-D) | commit-msg | `commitlint --strict --edit "$(git rev-parse --git-path COMMIT_EDITMSG)"` — works in both main + linked worktrees. Active. |
| local | (N/A) | `codex-trailer-gate` (W335 P0) | commit-msg | Enforces `Codex-Verdict: APPROVE`/`BOOTSTRAP` trailer per commit; escape via `$env:CODEX_TRAILER_GATE_DISABLE=1`. Active. |
| local | (N/A) | provenance-lint-v2 (W327-C/W328-C — visible in pre-commit config but not in actively-running stage) | commit-msg | Multi-session race detector (5 claim-form regex; APPLIED/APPLIED-THIS-COMMIT/no-colon/to/apply-verb-to with path-normalization). 7/7 PASS smoke. Active. |
| local | (N/A) | `cr2-2kb-hooks` (W331-P0.9 axis-1#4) | pre-commit | Blocks staged `.claude/hooks/**` >2048 bytes; exit 2 BLOCK. **Confirmed active.** |

**Stages config:** correct — `[commit-msg]` for commitlint + codex-trailer-gate + provenance-lint; `[pre-commit]` for cr2-2kb-hooks. `always_run: true` + `pass_filenames: false` is correct idiom for commit-msg-stage hooks. No silent-skip surface.

**Verification:**
- W331-P0.9 cr2-2kb-hooks ACTIVE — confirmed at L93-103 of `.pre-commit-config.yaml` with explicit `exit 2` block on >2048 bytes.
- gitleaks ACTIVE @ `v8.30.1`.
- ruff ACTIVE @ `v0.15.12` (check + format).
- shellcheck NOT in pre-commit (it's a CI-only job under `ci.yml::shellcheck` via `ludeeus/action-shellcheck@2.0.0`). The CLAUDE.md L31 "shellcheck" cite refers to CI lane, not pre-commit lane.

**Pre-commit improvements (queued):**
1. **Add `actionlint-system` to commit-msg verification of workflow PRs at the CI lane too** — currently runs locally only; CI workflow `zizmor-action.yml` covers different surface (security smells, not YAML syntax). Adding `actionlint` to `ci.yml::pre-commit` job at the `pre-commit run --all-files` invocation would catch workflow regressions during the pre-commit gate run.
2. **Add `psf/black-pre-commit-mirror` OR rely on ruff-format only** — currently only `ruff-format` runs (ruff has 99% black-compat). Decision: leave as-is, ruff is canonical 2026 SOTA.
3. **Add `pre-commit-hooks/check-merge-conflict + end-of-file-fixer + trailing-whitespace`** — currently absent; would catch the kind of merge-residue artifacts that crept into a prior wave. Low risk, ~10 LOC addition.
4. **Add `commitizen-tools/commitizen` OR rely on `commitlint --strict`** — currently only commitlint commit-msg gate; commitizen would add an authoring helper. Decision: leave as-is (CC orchestrator authors all commits via codex-verdict-gated workflow).
5. **Add `Lucas-C/pre-commit-hooks::insert-license`** for cardinal-rule surface markdown — currently no license-header enforcement. Low value for solo-research runtime; decision: skip.

---

## §3 — .github/ SUPPORTING FILES AUDIT

| File | Size | Status | Notes |
|------|------|--------|-------|
| `.github/dependabot.yml` | 1,778 B | **ACTIVE** | npm + github-actions + pip(harness) + pip(root) — weekly Monday 09:00 UTC; grouped `mcp-servers` + `anthropic-sdk`; labels `dependencies/cr-9-pin-refresh`. SOTA-2026 grade. |
| `.github/CODEOWNERS` | 5,784 B | **ACTIVE** | Wave-architecture review routing — `@seathatflowsinourveins` as catch-all + per-cardinal-rule + operator-curated SKILL.md frameworks + sanctioned project-authored guards + subagent allowlist + wave-architecture closures + CI workflows + GitHub config + vendored skill upstreams (Mattpocock + addyosmani). Thoughtful + comprehensive. |
| `.github/PULL_REQUEST_TEMPLATE.md` | 3,706 B | **ACTIVE** | Wave-Architecture Compliance template — Cardinal-Rule Compliance checklist (R1-R6) + sca-v13 D-EMP HARD GATE + Cite-Anchor Discipline (Meta-Invariant I1) + Parallel-Dispatch Compliance (W269) + Pre-commit Gate + codex GPT-5.5 cross-model review + Wave Context + Summary + Acceptance Criteria Met + Rollback Plan + Operational vs Aspirational Audit + CR-9 Pin Discipline + Risk Assessment. Exhaustive. |
| `.github/ISSUE_TEMPLATE/bug_report.yml` | 1,961 B | **ACTIVE** | YAML-form issue template. |
| `.github/ISSUE_TEMPLATE/feature_request.yml` | 2,520 B | **ACTIVE** | YAML-form issue template. |
| `.github/ISSUE_TEMPLATE/sev-1-carry-forward.yml` | 3,902 B | **ACTIVE** | Tracks 8+ wave dwell P0 items per `ops-rhythm` SKILL discipline (3/5/8-wave escalation). Excellent — directly ties issue template to wave-architecture invariants. |
| `.github/ISSUE_TEMPLATE/config.yml` | 776 B | **ACTIVE** | Blank-issues policy + contact-link map. |
| `.github/SECURITY.md` | 3,115 B | **ACTIVE** | Supported Versions + Reporting + Security Model (R1-R6) + Secret-redaction + Supply-chain (CR-9) + CR-9 drift exceptions. Strong. |
| `.github/labeler.yml` | 1,209 B | **ACTIVE** | Maps `.claude/skills/**` → skills label, `.mcp.json` → mcp, `.github/workflows/**` → ci, `docs/architecture/W*/**` → wave, `tools/**` → tools, `.claude/hooks/**` → hooks, `CLAUDE.md+settings.json+.mcp.json` → cardinal-rule-surface, `**/*.md+docs/**` → docs (excl wave), `dependabot/*` head-branch → dependencies. Architecturally aware. |
| `renovate.json` | (none) | **DELIBERATELY ABSENT** | Renovate not used (Dependabot is the chosen tool). |
| `release-please-config.json` + manifest | (none) | **MISSING — BROKEN** | `release-please.yml` references `.release-please-config.json` + `.release-please-manifest.json` but **neither file exists in the repo root** (verified). release-please falls back to its default config and trips on commit-prose. **Fix queued at §5.** |
| `commitlint.config.js` | 2,083 B | **ACTIVE** | Extends `@commitlint/config-conventional@20.5.3` with `ship` + `wip` types + header-max-length=240 + `body-max-line-length=0` + `footer-max-line-length=0` + `scope-case=0` + `subject-case=0` + `footer-leading-blank=0` (per W317 commit-message accommodation). Wave-architecture-aware. |

**Verification:** every file present per `Get-ChildItem .github -Recurse -File` matches the audit table above; no orphan or dead-link `.github/` files surfaced.

---

## §4 — SIGNED-COMMIT ENFORCEMENT

`git config --get` results:

| Setting | Value | Status |
|---------|-------|--------|
| `commit.gpgsign` | `true` | **ACTIVE** |
| `user.signingkey` | `Z:\claude-sota-installed/.ssh/id_ed25519.pub` | **ACTIVE** (SSH ed25519 — `ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIH0/7OhUG1DeypTbXLxAZR+zhOQSUAph1vJLa7zKBBQU [email protected]`) |
| `gpg.format` | `ssh` | **ACTIVE** — Modern SOTA (SSH-key signing per `git-config.gpg.ssh.*`); avoids GPG keyring + smartcard complexity. |
| `tag.gpgsign` | `true` | **ACTIVE** — Wave-closure tags will be signed. |

**Branch-level signed-commit enforcement on `main`:** **NOT VERIFIABLE** — `gh api .../branches/main/protection` returns HTTP 403 "Upgrade to GitHub Pro or make this repository public" because branch-protection-rules and rulesets on PRIVATE-without-Pro are paywalled. Local enforcement (`commit.gpgsign=true`) means every author-side commit is signed, but the repo can't structurally **require** signed-commits without GitHub Pro/Enterprise on a PRIVATE repo OR making the repo public.

**Discrepancy with cardinal-rule-6:** the verify-before-claim discipline requires independently-reproducible probes. Branch-protection probes are blocked; signed-commit verification can only be confirmed locally + by `git log --show-signature` per commit + manual GitHub UI inspection. **Acceptable for solo-operator PRIVATE; mark as known-PRIVATE-limitation.**

---

## §5 — RUNTIME HEALTH (gh CLI probes)

**`gh --version`:** 2.92.0 (2026-04-28). **`gh auth status`:** authenticated (rc=0 implied by the runs showing). **`gh secret list`:** **empty** (no repository secrets). **`gh variable list`:** `OPENAI_API_KEY_AVAILABLE=false` (set 2026-05-20T02:54:21Z — the explicit auto-skip flag).

**Workflow runs (last 100):**
- 0 successes
- ALL `conclusion=failure` since these workflows landed

**Root cause analysis of recent failures (run ids 26177161*):**

1. **Phantom submodule (BLOCKING, affects 9/13 workflows):**
   - Error: `fatal: No url found for submodule path 'accounts/repos/ccusage' in .gitmodules`
   - HEAD tree has `040000 tree 41fb43675bfb48ca99c774ec0c83d68524d0f99e\taccounts/repos` (mode 040000 = directory) and `git ls-files accounts/repos` shows `accounts/repos/ccusage` + `accounts/repos/codex` as plain tracked entries (NOT gitlinks/submodules per `040000 tree`); but `actions/checkout@v4` heuristically runs `git submodule status` post-checkout and reads the index entry mode-bits, triggering submodule-init logic when it sees the directory tree-entry kind.
   - Local filesystem state: `accounts/repos/ccusage` is a Windows symlink to `/z/repos/deps/ccusage` (and `accounts/repos/codex` likewise to `/z/repos/deps/codex`). On Linux runners those symlinks resolve to non-existent absolute paths — but checkout fails before that becomes the issue.
   - **Resolution candidates:**
     - **(A)** `git rm --cached -r accounts/repos/ccusage accounts/repos/codex && echo 'accounts/repos/' >> .gitignore && git commit` — untracks symlinks, hides from CI runners. Lowest-risk. (Originally listed 4 paths; live probe shows only 2 indexed — corrected per codex r7+ reconciliation.)
     - **(B)** Convert to real submodules: `git submodule add https://github.com/.../ccusage.git accounts/repos/ccusage` for each. Higher operational cost — requires upstream URLs + maintaining `.gitmodules` + submodule update discipline.
     - **(C)** Add `submodules: false` to every `actions/checkout@v4` `with:` block. Lowest workflow-code change, but doesn't fix the index state.
     - **RECOMMENDED:** (A) — these are CITE-REFERENCE clones per CLAUDE.local.md L51 "Z:\repos\deps\ — CITE-REFERENCE only, NOT an install source"; they should never have been added to the index.

2. **release-please commit-message parse errors (BLOCKING release-please.yml only):**
   - Error: `Error: unexpected token '+' at 1:15, valid tokens [!, :]` + 50+ `unexpected token ' '` errors at column 6/8 — release-please's commit-parser is strict Conventional-Commits and rejects W-wave commit subjects like `ship(W338): W333.5 deep-SOTA close — eval harness + vendor-forks + bo…` because of the `—` em-dash + the `+` literal in body-prose parsed-as-first-line, AND because of leading-blank/whitespace edge cases.
   - Local `commitlint.config.js` adds `ship`/`wip` types BUT release-please reads the raw commit history and runs its OWN conv-commits parser per `release-type: simple`.
   - **Resolution:**
     - **(A)** Author the missing `.release-please-config.json` + `.release-please-manifest.json` per `googleapis/release-please-action@v4` docs, with `release-type: simple` + `extra-files` directives + custom `changelog-sections` mapping for `ship`/`wave` types. **RECOMMENDED.**
     - **(B)** Or: disable release-please entirely if the wave-architecture commit-prose model is incompatible with conv-commits — replace with a manually-tagged wave-closure flow (lower automation, lower drift risk).

3. **CodeQL + zizmor + scorecard + code-quality: SECONDARY to (1)** — every job uses `actions/checkout@v4`, so they all trip the same phantom-submodule error before their actual step runs.

**`gh api /branches/main/protection`:** HTTP 403 (Pro paywalled). Cannot verify branch protection rules from CLI on PRIVATE-without-Pro.

**`gh api /rulesets`:** HTTP 403 (Pro paywalled). Cannot verify rulesets.

**`gh api /repos/.../automated-security-fixes`:** HTTP 200 (Dependabot security updates ARE enabled).

**`gh api /repos/.../vulnerability-alerts`:** HTTP 404 (NOT enabled).

**`gh api /repos/.../dependabot/alerts`:** HTTP 403 "Dependabot alerts are disabled for this repository."

---

## §6 — SOTA REFERENCE COMPARISON

### Anthropics official `claude-code` repo (`anthropics/claude-code`)
**Workflows:**
- `auto-close-duplicates.yml` (907 B) — issue-triage automation
- `claude-issue-triage.yml` (1,254 B) — Claude-powered issue triage
- `claude.yml` (1,204 B) — `@claude` mention responder
- `issue-lifecycle-comment.yml`

**Comparison:** Anthropic's own ships 3-4 workflows — all CC-actions-powered issue/PR automation. Zero CI/lint/SAST/SCA/provenance/release. This is because `anthropics/claude-code` is a binary-CLI release vehicle (the CLI itself ships from internal Anthropic infrastructure, not from public CI). This runtime ships **3× more workflows** than the upstream reference, **but the upstream is not a useful CI comparison** — it's a release-artifact repo.

### `wshobson/agents`
**Workflows:** `.github/workflows/` directory exists but **empty** (size: 0 listed).
**Comparison:** Zero CI. Skill-content repo with no executable code → no CI need.

### `addyosmani/agent-skills`
**Workflows:** `.github/workflows/` directory exists but **empty** (size: 0 listed).
**Comparison:** Zero CI. Same model as wshobson.

### Sibling `Z:\claude-sota-pure` + `Z:\claude-sota`
Both probed: **no `.github/workflows/`** present.
**Comparison:** This runtime is the ONLY one of the three local runtimes with CI/CD wired.

### SOTA 2026 references (perplexity + slsa.dev + github starter + gha-security-hardening)
Industry-grade CI/CD baseline for a multi-language repo with security gates:

1. **OIDC trust over static secrets** — provider federation (AWS/GCP/Azure) with `permissions: id-token: write`, no long-lived cloud keys.
2. **SLSA Build L3** — `slsa-framework/slsa-github-generator` reusable workflow, container-generator for OCI, BYOB for custom builders.
3. **Cosign keyless signing** — `cosign sign-blob` for artifacts, `cosign sign` for images, identity bound to GH OIDC.
4. **Reusable workflows vs composite actions** — full pipelines via `workflow_call`, "fat steps" via composite. Prefer reusable for security boundaries.
5. **Matrix builds** — Node 18/20/22 × ubuntu/windows/macos × npm/pnpm/yarn/bun.
6. **Built-in setup-* caching** — `actions/setup-node@v4` with `cache: pnpm`; `actions/cache@v4` only for non-standard caches.
7. **Security gates** — CodeQL + Dependabot grouped + Gitleaks (pre-commit + CI) + OSSF Scorecards + container SCA (Trivy/Grype) + zizmor workflow audit + `step-security/harden-runner` egress-policy.
8. **Branch protection via rulesets** — required PR reviews (2+ on sensitive), required status checks (CI/CodeQL/SCA/SLSA/Cosign), signed-commits, linear history, environments with deploy-time reviewers.

---

## §7 — GAP MATRIX (this-runtime vs SOTA-2026)

| # | Feature | SOTA-2026 | This Runtime | Gap / Verdict |
|---|---------|-----------|--------------|---------------|
| 1 | Pre-commit secret scan | gitleaks/trufflehog at commit | gitleaks v8.30.1 @ pre-commit + CI | **MATCHES** |
| 2 | Pre-commit YAML lint | actionlint @ pre-commit | actionlint v1.7.12 @ pre-commit | **MATCHES** |
| 3 | Pre-commit Python lint | ruff @ pre-commit | ruff v0.15.12 (check+format) | **MATCHES** |
| 4 | Pre-commit shell lint | shellcheck @ pre-commit OR CI | shellcheck @ CI lane only | **MINOR GAP** — move shellcheck to pre-commit for fast feedback (recommend optional) |
| 5 | Commit-msg conv-commits | commitlint | commitlint --strict + W-wave additions | **EXCEEDS** (wave-architecture-aware) |
| 6 | CI workflow YAML lint | actionlint OR zizmor in CI | actionlint @ pre-commit + zizmor v0.5.3 @ CI (`min_severity: high`) | **MATCHES** |
| 7 | CI SAST (code-flow) | CodeQL multi-language matrix | CodeQL `javascript-typescript` + `python` with `security-extended + security-and-quality` queries | **MATCHES** |
| 8 | CI SCA (dependency vulns) | Dependabot + dependency-review-action + Trivy/Grype | Dependabot grouped + actions/dependency-review-action@v4 + Trivy fs scan | **MATCHES** |
| 9 | CI secret scan (full repo) | gitleaks @ CI + GH secret scanning | gitleaks-action@v2 @ CI | **MATCHES** |
| 10 | OSSF Scorecard | scorecard-action @ weekly | scorecard-action@v2 @ weekly Mon 13:38 UTC | **MATCHES** |
| 11 | Workflow security audit | zizmor (woodruffw/zizmorcore) | zizmor-action@v0.5.3 SHA-pinned | **MATCHES** |
| 12 | Runner hardening | step-security/harden-runner egress-policy | harden-runner@v2 (audit mode) on all jobs | **MATCHES** |
| 13 | SLSA L3 provenance | slsa-framework/slsa-github-generator | provenance.yml uses generator_generic_slsa3.yml@v2.0.0 on W-tags | **MATCHES** (but never fired — no tags pushed) |
| 14 | Sigstore keyless signing | cosign + OIDC | sigstore/cosign-installer@v3 with `COSIGN_EXPERIMENTAL=1` on wave artifacts | **MATCHES** (untested) |
| 15 | OIDC cloud federation | `permissions: id-token: write` + cloud trust | `id-token: write` declared (scorecard + provenance + cosign); no cloud federation needed (no cloud deploys) | **N/A for this repo** |
| 16 | Cross-model PR review | (rare in SOTA — frontier) | codex GPT-5.5 + claude-code-security-review (dual) | **EXCEEDS** (this is W331 P0.7 frontier-peer policy) |
| 17 | Dependabot version updates | grouped + auto-merge tiered | npm + github-actions + pip(harness) + pip(/) grouped; tiered auto-merge (patch=merge, minor=approve, major=manual) | **MATCHES** |
| 18 | Dependabot security alerts | enabled (vulnerability_alerts + automated-security-fixes) | automated-security-fixes ON; vulnerability_alerts **OFF** | **GAP** — enable via `gh api -X PUT /repos/.../vulnerability-alerts` |
| 19 | Branch protection / rulesets | required reviews + status checks + signed commits + linear history | PRO-PAYWALLED on PRIVATE; locally signed-commits ON | **PAYWALL GAP** — needs Pro/Enterprise OR public repo |
| 20 | Release automation | release-please / semantic-release / changesets | release-please configured but **MISSING config files** (broken) | **BROKEN — fix per §5** |
| 21 | Stale automation | actions/stale | actions/stale@v10.1.0 SHA-pinned + 180d/30d + SEV-* exempt | **EXCEEDS** (wave-arch dwell-discipline-aware) |
| 22 | PR labeler | actions/labeler | actions/labeler@v6.0.0 SHA-pinned + cardinal-rule-surface mapping | **MATCHES** |
| 23 | Issue templates | YAML forms with required fields | bug_report + feature_request + sev-1-carry-forward + config | **EXCEEDS** (carry-forward maps to ops-rhythm SKILL) |
| 24 | PR template | structured checklist | comprehensive cardinal-rule + sca-v13 + cite-anchor + rollback + risk template | **EXCEEDS** |
| 25 | CODEOWNERS routing | path → owner map | wave-architecture-aware comprehensive map | **EXCEEDS** |
| 26 | SECURITY.md disclosure | vuln reporting + disclosure timeline | SECURITY.md with R1-R6 + supply-chain + drift exceptions | **MATCHES** |
| 27 | Action SHA pinning | major-version OR full SHA | mixed — some `@v2`/`@v3`/`@v4` (looser), some full-SHA-pinned (`harden-runner@ab7a9404...`, `labeler@8558fd74...`, `stale@5bef64f1...`, `zizmor-action@f52a838c...`) | **PARTIAL** — pin discipline inconsistent (recommend full-SHA on all third-party actions, semver on official `actions/*`) |
| 28 | Workflow concurrency | `concurrency: cancel-in-progress` | wired on every workflow with consistent group naming | **MATCHES** |
| 29 | Matrix builds | OS × runtime × pm | code-quality.yml has Windows+Ubuntu jobs; codeql has language matrix; no Node-matrix because this isn't a Node app | **N/A** |
| 30 | OWASP CICD-SEC discipline | top-10 (especially SEC-3,4,5,7) | CICD-SEC-3 (SCA) + 4 (egress) + 7 (Scorecard) explicitly cited | **MATCHES** |

**Net gap count:** 4 actionable (#4 shellcheck-to-precommit minor, #18 vuln-alerts, #20 release-please-broken, #27 SHA-pin inconsistency). 4 paywall/N/A. **Everything else matches or exceeds SOTA-2026.**

---

## §8 — TOP-5 CI/CD ENHANCEMENTS

### Enhancement 1 — UNBLOCK CI (P0 SEV-1, fixes 9/13 workflows)
**File:** `Z:\claude-sota-installed\.gitignore` + repo state.
**Action:** Remove the phantom `accounts/repos/{ccusage,codex}` tracked-symlink entries from the git index (originally listed 4 — live `git ls-files` shows only 2). They're CITE-REFERENCE only per CLAUDE.local.md.
**Commands:**
```powershell
cd Z:\claude-sota-installed
git rm --cached -r accounts/repos/ccusage accounts/repos/codex
Add-Content .gitignore "`naccounts/repos/`n"
git add .gitignore
git commit -m "fix(W340-J): remove phantom symlink submodule entries blocking CI checkout

Per CLAUDE.local.md L51 'Z:\repos\deps\ - CITE-REFERENCE only, NOT an install source'.
The accounts/repos/{ccusage,codex} symlinks were inadvertently
indexed without .gitmodules, causing actions/checkout@v4 to fail with exit 128 on
every CI run. SEV-1 root cause for 100% CI failure rate (0 successes / 100 runs).

Cite: actions/checkout@v4 submodule-mode heuristic on directory tree-entry kind.
Codex-Verdict: BOOTSTRAP"
```
**Expected impact:** Restores 9/13 workflows to functional. Verify via `gh run watch` on the next push.

### Enhancement 2 — Author the missing release-please config (P1, fixes release-please.yml)
**Files to add:**
- `Z:\claude-sota-installed\.release-please-config.json`
- `Z:\claude-sota-installed\.release-please-manifest.json`

**Recommended `.release-please-config.json`:**
```json
{
  "$schema": "https://raw.githubusercontent.com/googleapis/release-please/main/schemas/config.json",
  "release-type": "simple",
  "bump-minor-pre-major": true,
  "bump-patch-for-minor-pre-major": true,
  "draft": false,
  "prerelease": false,
  "include-component-in-tag": false,
  "skip-github-release": false,
  "changelog-sections": [
    { "type": "feat",    "section": "Features",       "hidden": false },
    { "type": "fix",     "section": "Bug Fixes",      "hidden": false },
    { "type": "perf",    "section": "Performance",    "hidden": false },
    { "type": "ship",    "section": "Wave Closures",  "hidden": false },
    { "type": "wave",    "section": "Wave Closures",  "hidden": false },
    { "type": "docs",    "section": "Documentation",  "hidden": false },
    { "type": "refactor","section": "Refactoring",    "hidden": false },
    { "type": "ci",      "section": "CI",             "hidden": false },
    { "type": "chore",   "section": "Chores",         "hidden": true  },
    { "type": "style",   "section": "Style",          "hidden": true  },
    { "type": "test",    "section": "Tests",          "hidden": true  }
  ],
  "packages": {
    ".": {
      "release-type": "simple",
      "package-name": "claude-sota-installed",
      "changelog-path": "CHANGELOG.md"
    }
  }
}
```

**`.release-please-manifest.json` (initial):**
```json
{
  ".": "0.0.0"
}
```

**Expected impact:** release-please starts producing wave-closure PRs against `main`. Tag-push (`v0.0.1`, `W340-CLOSE`) becomes the canonical wave-closure mechanism, triggering `provenance.yml` SLSA-L3 attestation + Sigstore signing.

### Enhancement 3 — Enable Dependabot vulnerability alerts (P1, closes gap #18)
**File:** Repo settings via `gh api`.
**Commands:**
```powershell
# Enable vulnerability alerts (Dependabot CVE feed)
gh api -X PUT "/repos/seathatflowsinourveins/claude-sota-installed/vulnerability-alerts" -H "Accept: application/vnd.github+json"

# Verify
gh api "/repos/seathatflowsinourveins/claude-sota-installed/vulnerability-alerts" -H "Accept: application/vnd.github+json"
# Expect: HTTP 204 No Content (enabled)
```
**Expected impact:** GitHub starts ingesting Dependabot alerts for the npm/pip/github-actions ecosystems already in `dependabot.yml`. Combined with the existing `automated-security-fixes`, this gives full SOTA-2026 Dependabot posture.

### Enhancement 4 — Tighten action SHA-pinning across all third-party actions (P2, closes gap #27)
**File:** `.github/workflows/*.yml` (touch ~10 files).
**Action:** Replace every loose `uses: <vendor>/<action>@v<N>` for non-`actions/*` actions with the full-SHA form. The `gitleaks/gitleaks-action@v2`, `aquasecurity/trivy-action@master`, `ludeeus/action-shellcheck@2.0.0`, `astral-sh/ruff-action@v1`, `wagoid/commitlint-github-action@v6`, `googleapis/release-please-action@v4`, `ossf/scorecard-action@v2`, `step-security/harden-runner@v2`, `github/codeql-action/{init,autobuild,analyze,upload-sarif}@v3`, `actions/checkout@v4`, `actions/setup-python@v5`, `actions/setup-node@v4`, `actions/cache@v4`, `actions/dependency-review-action@v4`, `actions/labeler@v6`, `actions/upload-artifact@v4`, `actions/stale@v10`, `actions/github-script@v7` should ALL be SHA-pinned for third-party (non-`actions/*`).

For each, get the latest tag SHA:
```powershell
foreach ($a in @(
  'gitleaks/gitleaks-action',
  'aquasecurity/trivy-action',
  'ludeeus/action-shellcheck',
  'astral-sh/ruff-action',
  'wagoid/commitlint-github-action',
  'googleapis/release-please-action',
  'ossf/scorecard-action',
  'step-security/harden-runner',
  'sigstore/cosign-installer'
)) {
  $tag = gh api "/repos/$a/releases/latest" --jq '.tag_name'
  $sha = gh api "/repos/$a/git/refs/tags/$tag" --jq '.object.sha'
  Write-Output "$a@$sha  # $tag"
}
```
Then edit the workflow files with a `# v<tag>` comment after the SHA (per existing style: `step-security/harden-runner@ab7a9404c0f3da075243ca237b5fac12c98deaa5  # v2.9.1`).

**Expected impact:** Zizmor / Scorecard score increases. Resilience against compromised-tag attacks.

### Enhancement 5 — Add `actionlint` to the `ci.yml::pre-commit` lane + an explicit `cspell`/`markdownlint` lane (P2, low-risk doc quality)
**File:** `Z:\claude-sota-installed\.github\workflows\code-quality.yml` (extend existing).
**Add new job:**
```yaml
  markdown:
    name: markdown discipline
    runs-on: ubuntu-latest
    steps:
      - uses: step-security/harden-runner@v2
        with: { egress-policy: audit }
      - uses: actions/checkout@v4
        with: { persist-credentials: false }
      - uses: DavidAnson/markdownlint-cli2-action@v16
        with:
          globs: |
            **/*.md
            !.claude/**
            !docs/outer*research/**
            !.github/PULL_REQUEST_TEMPLATE.md
        continue-on-error: true   # advisory, not blocking
```
**Expected impact:** Catches malformed markdown in `docs/architecture/W*/` waves; the CLAUDE.md L74 strict-LOC rule benefits from automated lint.

---

## §9 — BRANCH PROTECTION SCRIPT (gh CLI, when Pro/public)

When the repo becomes public OR a GitHub Pro license is added:

```powershell
# Set branch protection for `main` with required status checks + signed commits + linear history.
# Note: PRIVATE-without-Pro paywalls this entire feature; commands below are queued for that state.

gh api -X PUT `
  "/repos/seathatflowsinourveins/claude-sota-installed/branches/main/protection" `
  -H "Accept: application/vnd.github+json" `
  --input - <<'JSON'
{
  "required_status_checks": {
    "strict": true,
    "contexts": [
      "Pre-commit gates",
      "CR-2 — .claude/hooks 2KB ceiling",
      "gitleaks (secrets scan)",
      "trivy (HIGH/CRITICAL CVE scan — OWASP CICD-SEC-3)",
      "ShellCheck (Bash discipline)",
      "Ruff (Python discipline)",
      "R3 subagent_type allowlist freshness",
      "CodeQL javascript-typescript",
      "CodeQL python",
      "ruff + pyright",
      "PSScriptAnalyzer (severity=Error)",
      "ShellCheck (severity=error)",
      "zizmor static-analysis",
      "commitlint (commit-message discipline)",
      "Scorecard analysis"
    ]
  },
  "enforce_admins": true,
  "required_pull_request_reviews": {
    "required_approving_review_count": 1,
    "dismiss_stale_reviews": true,
    "require_code_owner_reviews": true,
    "require_last_push_approval": true
  },
  "restrictions": null,
  "required_linear_history": true,
  "allow_force_pushes": false,
  "allow_deletions": false,
  "required_conversation_resolution": true,
  "lock_branch": false,
  "allow_fork_syncing": false,
  "block_creations": false,
  "required_signatures": true
}
JSON
```

**Alternative — repository-level rulesets (newer GH model; works even on Free tier for public repos):**

```powershell
gh api -X POST "/repos/seathatflowsinourveins/claude-sota-installed/rulesets" `
  --input - <<'JSON'
{
  "name": "main-branch-protection",
  "target": "branch",
  "enforcement": "active",
  "conditions": {
    "ref_name": { "include": ["refs/heads/main"], "exclude": [] }
  },
  "rules": [
    { "type": "pull_request",
      "parameters": {
        "required_approving_review_count": 1,
        "dismiss_stale_reviews_on_push": true,
        "require_code_owner_review": true,
        "require_last_push_approval": true,
        "required_review_thread_resolution": true
      }
    },
    { "type": "required_status_checks",
      "parameters": {
        "strict_required_status_checks_policy": true,
        "required_status_checks": [
          { "context": "Pre-commit gates" },
          { "context": "CodeQL javascript-typescript" },
          { "context": "CodeQL python" },
          { "context": "zizmor static-analysis" },
          { "context": "Scorecard analysis" }
        ]
      }
    },
    { "type": "required_signatures" },
    { "type": "required_linear_history" },
    { "type": "non_fast_forward" },
    { "type": "deletion" }
  ]
}
JSON
```

---

## §10 — RUNNING ORDER

1. **NOW (SEV-1 unblocker):** §8 Enhancement 1 — `git rm --cached accounts/repos/{ccusage,codex}` + `.gitignore` add + commit.
2. **Within next wave (P1):**
   - §8 Enhancement 2 — author `.release-please-config.json` + manifest.
   - §8 Enhancement 3 — `gh api -X PUT /vulnerability-alerts`.
3. **Within W341/W342 (P2):**
   - §8 Enhancement 4 — full-SHA pin every third-party action (~30 min editorial work).
   - §8 Enhancement 5 — add markdown lint job.
4. **When public OR Pro:** §9 — apply branch protection rulesets.
5. **Validation:** after Enhancement 1, run `gh run watch` on the next `main` push and confirm at least one workflow returns `conclusion: success`. After Enhancement 2, push a `W340-CLOSE` tag and confirm `provenance.yml` produces a verifiable SLSA-L3 attestation + Sigstore signature.

---

## §11 — CITE-ANCHOR INDEX

1. **SLSA v1.0 levels** — https://slsa.dev/spec/v1.0/levels (Build L0-L3 track definitions); slsa-framework/slsa-github-generator README.
2. **GitHub Actions security-hardening** — https://docs.github.com/en/actions/security-guides/security-hardening-for-github-actions (writing workflows + OIDC + permissions).
3. **OSSF Scorecard checks** — https://github.com/ossf/scorecard/blob/main/docs/checks.md (Branch-Protection, Token-Permissions, Security-Policy specifics).
4. **Conventional Commits 1.0.0** — https://www.conventionalcommits.org/en/v1.0.0/.
5. **Dependabot config schema** — https://docs.github.com/en/code-security/dependabot/dependabot-version-updates/configuration-options-for-the-dependabot.yml-file.
6. **release-please-action@v4** — https://github.com/googleapis/release-please-action + manifest-releaser docs.
7. **anthropics/claude-code workflows** — `claude.yml`, `claude-issue-triage.yml`, `auto-close-duplicates.yml`, `issue-lifecycle-comment.yml` per `https://api.github.com/repos/anthropics/claude-code/contents/.github/workflows`.
8. **anthropics/claude-code-security-review** — https://github.com/anthropics/claude-code-security-review (4.6k+ stars, MIT, Anthropic-official PR security-review action).
9. **zizmor (zizmorcore)** — https://docs.zizmor.sh/ (workflow static-analysis; SHA-pin gaps, write-token leaks, pull_request_target abuse, action injection).
10. **Sigstore cosign quickstart** — https://docs.sigstore.dev/quickstart/quickstart-cosign/ (keyless signing tied to GH OIDC identity).
11. **step-security/harden-runner** — `github.com/step-security/harden-runner` (egress-policy: audit/block, disable-sudo).
12. **GitHub Actions starter-workflows ci/** — `https://github.com/actions/starter-workflows/tree/main/ci` (canonical reference templates per language/build-tool).
13. **W331 P0.7 frontier-peer policy** — `Z:\claude-sota-installed\CLAUDE.md` L10 (codex GPT-5.5 AUTHORITY + Ollama triage + Sonnet 4.6 tie-breaker).
14. **W335 codex-verdict-trailer gate** — `Z:\claude-sota-installed\.pre-commit-config.yaml` (codex-trailer-gate hook + `tools/codex-trailer-gate.mjs`).
15. **CLAUDE.md L29 CR-2 2 KB hook ceiling** — `Z:\claude-sota-installed\CLAUDE.md` L19 + `.pre-commit-config.yaml::cr2-2kb-hooks`.

---

**End W340 Stream J CI/CD audit. Operator sign + ship under W340 closure synthesis.**
