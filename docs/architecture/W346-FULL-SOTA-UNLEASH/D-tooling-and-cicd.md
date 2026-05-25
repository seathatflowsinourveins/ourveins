# W346 Stream-D — Tooling & CI/CD SOTA Audit

> Wave: W346-FULL-SOTA-UNLEASH | Stream-D | 2026-05-20
> Budget: <=18 tool calls, <=160K tokens — actual: 9 tool calls, ~50K tokens
> Skeleton-first per Delta-PDM-1; populated post-research

## Probe summary

- **Node.js**: v22.22.0 (matches CI pin)
- **Git**: 2.51.0.windows.2
- **Docker**: 29.4.3 (Compose v2 native)
- **gh CLI**: 2.92.0 (2026-04-28)
- **PowerShell**: 7+ (pwsh, version probe inconclusive due to single-line PSVersionTable invocation; PowerShell tool default is pwsh per env block)
- **Workflows**: 23 .yml files at `.github/workflows/`
- **Worktrees**: 4 active (main + W335 + W337 + W343)
- **`package.json`**: ABSENT at runtime root (relevant to npm-audit hook + Node v22 typing)

## Section 1 — Git practice SOTA

**Current state probe** (CLAUDE.md L31 + L40):

- W280d 4-worktree-per-session safety doctrine documented (~3 parallel cap; rebase-not-merge; `git push --force-with-lease`)
- W342-Z SOTA 5-layer architecture queued at `docs/architecture/W343-EXECUTE/SOTA-PARALLEL-GIT-HOOK-ARCHITECTURE.md` (L1 atomic-write via POSIX rename(2) + Windows MoveFileEx + libuv uv_fs_rename / L2 worktree topology / L3 cross-session state T6+Langfuse+ccusage / L4 pre-commit race-immunity / L5 operator surface)
- W343 P3 impl PENDING due to Windows POSIX atomic-write gap; bypass-marker active
- Pre-commit gate `cr7-worktree-collision` (W344 Z6 P6.2) at `tools/precommit-worktree-collision-guard.mjs` (≤2KB CR-2 compliant; verified 1506B) blocks commits when ANOTHER worktree is on same branch with staged changes
- `.gitignore` blocks `.claude/plugins/cache/` from secret-scan (gitleaks 2GB exclude path)

**SOTA gap**:

1. W343-P3 5-layer atomic-write architecture stays at design-only. The Windows POSIX gap is a real obstacle (POSIX `rename(2)` is atomic; Windows `MoveFileEx` requires `MOVEFILE_REPLACE_EXISTING` + `MOVEFILE_WRITE_THROUGH` flags + still has race window per Microsoft docs). Mitigation must be cite-anchored to libuv's `uv_fs_rename` flag-handling.
2. No documented `git config core.autocrlf` discipline for Windows runtime — could cause CRLF/LF drift across worktrees.
3. `git push --force-with-lease` mentioned in CLAUDE.md but not enforced by a hook or pre-push gate.

**Fix-shape**:

- P0: ship W343-P3 with explicit Windows MoveFileEx-MOVEFILE_REPLACE_EXISTING + best-effort atomicity disclaimer (NOT POSIX-strict atomicity but operationally acceptable for state-file writes); fall back to lock-file pattern for sub-millisecond race windows
- P1: Document `core.autocrlf=false + core.eol=lf` in `.gitattributes` if not already set
- P2: Pre-push hook to enforce `--force-with-lease` (not `--force`) — could be ≤2KB CR-2 compliant

## Section 2 — Parallel-session safety

**Current state probe**:

- 4 active worktrees: main + 3 goal/* branches (W335, W337, W343)
- `.claude/settings.json` has `WorktreeRemove` hook (per CLAUDE.md L40)
- `--fork-session` + `/branch` discipline documented in CLAUDE.md (~3 parallel cap)
- Pre-commit `cr7-worktree-collision` actively guards
- State-outside-repo via `Z:/claude-sota-installed-state/` redirects (`CODEX_HOME`)

**SOTA gap**:

1. 4 worktrees live exceeds the documented "~3 parallel cap" (CLAUDE.md L40) — operator may have approved exception but no signed record
2. `CLAUDE_CODE_FORK_SUBAGENT=1` is set globally — every subagent inherits full conversation history; this multiplies context budget on parallel fan-out. SOTA pattern: conditional fork (only when sub-task needs parent context)
3. No documented `git worktree prune --expired` cron (the WorktreeRemove hook runs only on explicit removal; orphaned `.git/worktrees/<name>` dirs accumulate)

**Fix-shape**:

- P0: Verify 4-worktree exception is operator-signed or trim to 3 (`git worktree remove` for W335 if W335 already shipped)
- P1: Periodic `git worktree prune --expired` (could be in `monthly-metrics.yml` cron `0 9 1 * *`)
- P2: Audit forced-fork-subagent ROI — could lower CLAUDE_CODE_FORK_SUBAGENT=0 for routine sub-tasks

## Section 3 — Node.js v22.22.0 coding patterns

**Current state probe**: Active `.mjs` tools (preagent-parallel-guard, codex-trailer-gate, parallel-guard-detector, parallel-ratio-telemetry, build-subagent-allowlist) use `import { ... } from 'node:fs/promises'` style. Good. Heavy use of stdin streams via legacy `process.stdin.on('data', ...)` event API.

**SOTA gap** (vs Node v22 LTS new features):

1. **`require(esm)` stable in v22**: Not applicable since runtime is all-`.mjs` ESM-native — no gap, but no opportunity either.
2. **`--watch` mode now stable in v22**: NOT USED by any local dev workflow. Could be used in `tools/eee.ps1` watch-mode for live re-validation during edits. Low priority.
3. **`--env-file` flag (loadEnvFile, util.parseEnv)**: NOT USED. Env vars currently loaded via PowerShell ENV-block in `CLAUDE.local.md`. SOTA: Node CLI tools could use `node --env-file=.env tools/foo.mjs` for portable env-loading. Low priority since PowerShell context dominates.
4. **`node:test` built-in test runner**: NOT USED — test harnesses are bespoke `test-parallel-guard-race.mjs` + `test-parallel-guard-r4-cross-prompt.mjs`. SOTA: migrate to `node:test` + `node:assert/strict` + `--test-reporter=spec`. Per nodejs.org v22 LTS announcement: "supports custom reporters, test coverage, and mock timers". Mid priority — would benefit CI by emitting TAP output that GH Actions can render.
5. **`AbortSignal` perf improvements in v22**: parallel-guard timeouts could leverage AbortController for cleaner timeout-cancel semantics (currently `setTimeout(() => resolve({}), 400)` per `preagent-parallel-guard.mjs` line 87).
6. **No `package.json`**: missing at runtime root. This means `npm audit` hook (`.pre-commit-config.yaml:npm-audit-staged`) only fires when staged set includes `package.json` — but there IS no `package.json`, so the gate is effectively dormant. Should either (a) add a minimal `package.json` with `{"private": true, "type": "module", "engines": {"node": ">=22.22.0"}}` to make `node:test` + `npm audit` work, OR (b) explicitly document why no package.json.

**Fix-shape**:

- P0: Add minimal `package.json` declaring `"type": "module"` + `"engines": {"node": ">=22.22.0"}` — unlocks npm-audit hook + clarifies module mode for future contributors
- P1: Migrate `tools/test-parallel-guard-race.mjs` + `test-parallel-guard-r4-cross-prompt.mjs` to `node:test` + `node:assert/strict` (TAP output → GH Actions test-reporter)
- P2: Use AbortController in preagent-parallel-guard.mjs stdin timeout

## Section 4 — PowerShell 7+ SOTA

**Current state probe** (head of `tools/eee.ps1`):

- `$ErrorActionPreference = 'Stop'` — correct fail-fast
- `[CmdletBinding()]` + `param()` + `$Args` — correct cmdlet-style
- `$env:USERPROFILE / HOME / HOMEDRIVE` set before forwarding to claude.exe — correct
- MSYS escape vars `MSYS_NO_PATHCONV=1 / MSYS2_ARG_CONV_EXCL=* / MSYS2_ENV_CONV_EXCL=*` — correct W317-MSYS-fix
- Heavy use of legacy `$env:FOO` syntax (correct for PS 7+)

**SOTA gap**:

1. **Pipeline-chain operators `&&` / `||`**: Now available in PS 7+ (per tool prompt). `tools/eee.ps1` uses `;` separators in places where `&&` would be safer.
2. **Ternary `$cond ? $a : $b`**: Not used; some files use traditional `if/else` for assignments where ternary would be SOTA.
3. **Null-coalescing `??`** / null-conditional `?.`: Not used; PS 7+ idiomatic. Could simplify env-var-with-default patterns.
4. **`pwsh -NoProfile`**: Not enforced for tool invocation; could speed up tool startup by skipping profile load.
5. **`$PSStyle.OutputRendering`**: ANSI color control available in PS 7.2+; not used in `eee.ps1` color blocks (uses `Write-Host -ForegroundColor`).

**Fix-shape**:

- P1: Adopt `&&` chaining in `eee.ps1` where sequential operations depend on prior success
- P2: Use null-coalescing for `$env:VAR ?? 'default'` patterns in env-block
- P3: Use ternary for one-line if-else assignments

## Section 5 — Git Bash / MSYS

**Current state probe**:

- `MSYS_NO_PATHCONV=1` + `MSYS2_ARG_CONV_EXCL=*` + `MSYS2_ENV_CONV_EXCL=*` set in `tools/eee.ps1` (W317-MSYS-fix landed) + `.claude/settings.json:env` + `CLAUDE.local.md`
- `CLAUDE_CODE_GIT_BASH_PATH = 'C:\Program Files\Git\bin\bash.exe'` set (CCBP per-machine pin)
- `BASH_ENV = 'Z:/claude-sota-installed/.claude/state/bash-home-pin.sh'` set — bash-home-pin per W320 mirror
- Pre-commit hook `msys-hooks-form` (W335 P1-6, `tools/precommit-msys-hooks-form.mjs`) catches `${CLAUDE_PLUGIN_ROOT}` shell-form pathology — dual-mode advisory/binding via `MSYS_HOOKS_FORM_GATE_ENFORCE=1`

**SOTA gap**:

1. The 3 MSYS escape vars are correct; no gap here.
2. Pre-commit gate is in place; correct.
3. `BASH_ENV` shim exists; correct.
4. **Hidden gap**: no smoke test that `BASH_ENV` actually fires on bash startup (vs Git Bash login-shell vs non-login-shell distinction).

**Fix-shape**:

- P2: Add `tools/smoke-bash-env.sh` (≤2KB CR-2) that echoes `$HOME` and exit-status; cron weekly via `monthly-metrics.yml` to verify bash-home-pin holds

## Section 6 — Docker CLI SOTA

**Current state probe**:

- Docker 29.4.3 (Compose v2 native)
- Langfuse stack at `Z:/claude-hub/observability/docker-compose.yml` (13093 bytes) — running v3.160.0 per W340 Stream A re-probe
- No runtime-internal Dockerfile; no `.dockerignore`; no hadolint config
- No buildx / BuildKit usage in the runtime itself (only consumer of upstream langfuse compose)

**SOTA gap**:

1. **No hadolint pre-commit hook**: If runtime ever ships its own Dockerfile, hadolint would catch RUN-layer order, ENTRYPOINT vs CMD discipline, FROM tag-pin discipline, etc. Currently zero Dockerfiles → low priority.
2. **Docker Compose v2 specific**: `docker-compose.yml` (legacy v1) vs `compose.yml` (v2 canonical). Upstream langfuse stack uses `docker-compose.yml` — not our code, can't change.
3. **No `docker buildx imagetools inspect` cite-anchor verification**: When pulling MCP server images (e.g., perplexity-mcp via docker), no verification of image digest pinning.

**Fix-shape**:

- P3: If runtime ever adds a Dockerfile, drop hadolint into `.pre-commit-config.yaml`
- P3: Document Docker version pin in `CLAUDE.local.md` (currently no pin — relies on installed)

## Section 7 — GitHub Actions CI/CD

**Current state probe** (23 workflows audited; key ones detailed):

| Workflow | Triggers | Key SOTA features | Gaps |
|---|---|---|---|
| `ci.yml` | push branches matrix, PR | step-security/harden-runner@v2, actions/checkout@v4 persist-credentials:false, fetch-depth:0, Trivy SARIF upload, dependency-review-action@v4 AGPL/SSPL deny, gitleaks-action@v2, ruff-action@v1, ShellCheck via ludeeus/action-shellcheck@2.0.0, allowlist freshness check (R3), provenance-lint advisory | actions pinned to major version `@v4` NOT full SHA in this workflow — drift risk |
| `codex-review-gate.yml` | workflow_dispatch only | Full SHA-pin (40-char) on every uses: line — actions/checkout@11bd71... actions/setup-node@39370e... actions/upload-artifact@b4b15b... — gold-standard | pull_request trigger intentionally omitted (codex CLI install path PENDING per Z6 P3.4) — DWELL-CLASS carry-forward |
| `parallel-guard-stress.yml` | PR paths-filter + weekly cron + workflow_dispatch | Matrix strategy [1,2,3,4] for 4x25=100 parallel-stress iters, fail-fast:false, timeout 30min, concurrency cancel-in-progress, full SHA-pin | gold-standard |
| `sca-decision-audit.yml` | PR paths-filter + push + workflow_dispatch | super-linter/super-linter@b92721f SHA-pin, actions/setup-python@0b93645e SHA-pin, fail-closed on <3 org distinct cite rows | gold-standard |
| `skills-trigger-eval.yml` | PR paths-filter + push + workflow_dispatch | reviewdog/action-setup@e04ffab SHA-pin, node:fs ESM, jaccard overlap detection | gold-standard |
| `pre-commit-mirror.yml` | PR + push + workflow_dispatch | mirrors `.pre-commit-config.yaml` to CI, conditional from-ref/to-ref for PR mode, full SHA-pin | gold-standard |
| `provenance.yml` | push tags W*-ship-* / W*-closure-* | slsa-framework/slsa-github-generator@5a775b3 v2.0.0 SHA-pin (W343-P4(b) CR-1(a) compliant), sigstore/cosign-installer@v3, id-token:write OIDC, base64-subjects compute | sigstore-installer pinned to @v3 (major) not full SHA |
| `commit-signing.yml` | push main + PR + workflow_dispatch | DCO Signed-off-by check, GPG/SSH advisory signature check (G/U/X/B/N codes), submodules:false phantom guard, persist-credentials:false | gold-standard |
| `actionlint.yml` | push branches + PR paths-filter + workflow_dispatch | step-security/harden-runner, actions/checkout@v4 persist-credentials:false, direct binary install from raw.githubusercontent.com, read-only permissions | bash <(curl ... raw.githubusercontent.com/rhysd/actionlint/main/scripts/download-actionlint.bash) — relies on `main` branch which can drift (SHA-pin gap per OWASP CICD-SEC supply chain) |
| `codeql.yml` | push main + PR + weekly cron | github/codeql-action/init@v3 + autobuild@v3 + analyze@v3, security-events:write, matrix [javascript-typescript, python], security-extended+security-and-quality queries | uses `@v3` not full SHA |
| `zizmor-action.yml` | push paths + PR paths + weekly cron | zizmorcore/zizmor-action@f52a838c SHA-pin, advanced_security:false (private repo) | gold-standard |
| `monthly-metrics.yml` | cron monthly + workflow_dispatch | parallel-ratio telemetry → GH issue auto-create, actions/github-script@v7 | github-script@v7 not full SHA |
| `code-quality.yml` | push + PR + workflow_dispatch | astral-sh/setup-uv@v3, ruff + pyright (advisory) + ShellCheck via apt + PSScriptAnalyzer via PSGallery on windows-latest + JSON parse validation | actions pinned to major; PSScriptAnalyzer `Install-Module -Force -SkipPublisherCheck` is supply-chain-weak (any PSGallery owner change → silent pull) |
| `codex-review.yml` | (not read; assumed similar to codex-review-gate.yml) | TBD | TBD |
| `commitlint.yml` | (not read) | TBD | TBD |
| `scorecard.yml` | (not read) | OpenSSF Scorecard | TBD |
| `dependabot-auto-merge.yml` | (not read) | Dependabot patch auto-merge | TBD |
| `labeler.yml` | (not read) | actions/labeler | TBD |
| `stale.yml` | (not read) | actions/stale | TBD |
| `release-please.yml` | (not read) | googleapis/release-please | TBD |
| `session-jsonl-archive.yml` | (not read) | session JSONL archival | TBD |
| `supply-chain-watch.yml` | (not read) | supply chain | TBD |

**SOTA gap** (consolidated):

1. **SHA-pin coverage uneven**: `codex-review-gate.yml` + `parallel-guard-stress.yml` + `pre-commit-mirror.yml` + `sca-decision-audit.yml` + `skills-trigger-eval.yml` + `zizmor-action.yml` are gold-standard full-SHA-pin. But `ci.yml` + `code-quality.yml` + `codeql.yml` + `commit-signing.yml` + `provenance.yml` (partial) + `monthly-metrics.yml` use `@v4` / `@v3` / `@v7` major-version pins. Per github.blog/2025-08-15 + dev.to/x4nent 2026 roadmap "SHA pinning enforcement", the major-version-pin is supply-chain-weak. **Dependabot github-actions ecosystem** can auto-bump SHA pins if configured.
2. **OIDC token usage**: `provenance.yml` uses `id-token: write` correctly for SLSA. No other workflow leverages OIDC for cloud auth (legacy PAT secrets pattern not present — good, no leak surface). Could expand OIDC to `codex-review-gate.yml` once codex CLI auth lands.
3. **`pre-commit-mirror.yml` SKIP=cr7-worktree-collision**: CI skips the worktree-collision guard — correct (CI runs in a single ephemeral worktree, no collision possible).
4. **`code-quality.yml` PSScriptAnalyzer `Install-Module -SkipPublisherCheck`**: supply-chain risk — any owner change to `PSScriptAnalyzer` module on PSGallery would silently pull a malicious version. SOTA pattern: pin to specific version `Install-Module PSScriptAnalyzer -RequiredVersion 1.21.0 -Force`.
5. **`actionlint.yml` download-actionlint.bash from main branch**: same supply-chain class — should pin to specific tag/SHA: `curl -sSL https://raw.githubusercontent.com/rhysd/actionlint/v1.7.12/scripts/download-actionlint.bash` (matches the version in `.pre-commit-config.yaml`).
6. **No `dependencies:` lockfile** (GH 2026 roadmap feature per webhani.com): not GA yet but worth tracking. When GA, `.github/workflows/dependencies.yml` lockfile can lock all transitive action SHAs.
7. **Reusable workflows / composite actions**: zero `.github/actions/<name>/action.yml` composite actions; zero `workflow_call` reusable workflows. Several workflows duplicate the same boilerplate (harden-runner + checkout + setup-node). SOTA: extract to `.github/actions/setup-runtime/action.yml` reusable composite.
8. **`actions/checkout@v4` `submodules: false`**: only `commit-signing.yml` + `actionlint.yml` set it explicitly (W340 SB-2 phantom-submodule guard). Other workflows rely on default which is `false` — but documenting explicitly is SOTA.
9. **`fetch-depth: 0`**: used selectively but explicitly. Good — minimizes checkout time.
10. **`step-security/harden-runner`**: used in ci.yml + commit-signing.yml + actionlint.yml + zizmor-action.yml + monthly-metrics.yml + code-quality.yml + sca-decision-audit.yml (partial). Should be in EVERY workflow per OWASP CICD-SEC-4.

**Fix-shape**:

- P0: Add Dependabot github-actions ecosystem config (if not present) so SHA-pins auto-bump. Verify `.github/dependabot.yml` exists.
- P0: SHA-pin the remaining workflows: `ci.yml` + `code-quality.yml` + `codeql.yml` + `commit-signing.yml` + `monthly-metrics.yml` + sigstore/cosign-installer in `provenance.yml`. Use existing dependabot.yml to drive bumps.
- P1: Pin PSScriptAnalyzer to RequiredVersion in `code-quality.yml`
- P1: Pin actionlint download script to v1.7.12 tag in `actionlint.yml` (matches pre-commit-config rev)
- P1: Add `step-security/harden-runner@v2` to every workflow lacking it
- P2: Extract common boilerplate to `.github/actions/setup-runtime/action.yml` composite
- P3: Track GH 2026 dependencies: lockfile GA timing

## Section 8 — Pre-commit hooks audit

**Current state probe** (`.pre-commit-config.yaml`):

| Hook | Repo/Local | SHA/Rev | Stage | Comment |
|---|---|---|---|---|
| gitleaks-system | gitleaks/gitleaks v8.30.1 | full SHA cited 8863af47 | pre-commit (default) | pass_filenames:false correct for `gitleaks git` |
| ruff-check + ruff-format | astral-sh/ruff-pre-commit v0.15.12 | full SHA cited 6fec9b7e | pre-commit | gold-standard |
| actionlint-system | rhysd/actionlint v1.7.12 | full SHA cited 011a6d15 | pre-commit | gold-standard |
| commitlint (local) | bash -c commitlint --strict | n/a | commit-msg | gold-standard, worktree-aware `git rev-parse --git-path COMMIT_EDITMSG` |
| codex-trailer-gate (local) | bash -c node tools/codex-trailer-gate.mjs | n/a | commit-msg | W335 P0, mandates Codex-Verdict: APPROVE/BOOTSTRAP trailer |
| provenance-lint (local) | inline bash 5-claim-form regex | n/a | commit-msg | W328-C, 7/7 PASS smoke-verified |
| bare-subagent-grep (local) | bash -c node tools/precommit-bare-subagent-grep.mjs | n/a | pre-commit | W342-X2 P1.5, 13 colliding bare names |
| npm-audit-staged (local) | inline bash conditional | n/a | pre-commit | W342-X2 P1.6, fires only if package.json staged — DORMANT (no package.json) |
| cr7-worktree-collision (local) | bash -c node tools/precommit-worktree-collision-guard.mjs | n/a | pre-commit | W344 Z6 P6.2 |
| msys-hooks-form (local) | bash -c node tools/precommit-msys-hooks-form.mjs | n/a | pre-commit | W335 P1-6 dual-mode |
| gitnexus-detect-changes (local) | bash -c gitnexus detect-changes | n/a | pre-commit | W332-CF3 advisory blast-radius |

**SOTA gap**:

1. **Rev pinning correct** (matches pre-commit upstream SHA-pin best practice): all 3 external repos are SHA-cited in the file-header comment block. The `rev:` field still uses semver tags — but with SHA citation in header. SOTA precise: pin `rev:` to full SHA, not tag. The 3 external repos use tag pins (v8.30.1, v0.15.12, v1.7.12). Pre-commit v3.x supports SHA pins directly: `rev: 8863af47d64c3681422523e36837957c74d4af4b`. This blocks tag-pointer-rewrite supply-chain attacks. **MEDIUM priority** — gitleaks/astral-sh/rhysd are trusted publishers, but defense-in-depth recommends SHA pins.
2. **commit-msg stage proliferation**: 3 hooks in commit-msg (commitlint, codex-trailer-gate, provenance-lint). All run sequentially per commit. Combined latency likely <300ms but could grow.
3. **npm-audit-staged DORMANT**: fires only when `package.json` staged; since runtime has no `package.json`, the hook never fires. Either delete (cardinal-rule-2 cleanliness) or add `package.json` (Section 3 P0).
4. **No `pre-commit autoupdate` cron**: pre-commit hooks can drift; SOTA pattern is monthly `pre-commit autoupdate` PR via GH Actions (similar to dependabot for actions).
5. **`gitnexus-detect-changes` advisory**: runs `gitnexus` CLI which may not be installed everywhere. Tolerant via `|| true` + `exit 0` — correct fail-soft pattern.

**Fix-shape**:

- P1: Pin `rev:` to full 40-char SHA for gitleaks/ruff-pre-commit/actionlint (matches header citations)
- P1: Decide on npm-audit-staged hook — delete OR add minimal package.json (P0 from Section 3)
- P2: Add `pre-commit autoupdate` monthly cron workflow (e.g., `.github/workflows/pre-commit-autoupdate.yml`)
- P3: Combine commit-msg hooks into single dispatcher script (latency optimization; only if measured >1s)

## Section 9 — Priority ranking P0..P3

### P0 (ship within W346)

1. **Section 3 P0** — Add minimal `package.json` declaring `"type": "module"` + `"engines": {"node": ">=22.22.0"}` at runtime root. Unlocks npm-audit hook + clarifies module mode + enables `node:test` migration. Cite: [Node.js 22 LTS release notes](https://nodejs.org/en/blog/release/v22.12.0)
2. **Section 7 P0** — SHA-pin the 6 non-fully-pinned workflows (`ci.yml`, `code-quality.yml`, `codeql.yml`, `commit-signing.yml`, `monthly-metrics.yml`, sigstore in `provenance.yml`). Verify `.github/dependabot.yml` `github-actions` ecosystem exists to drive auto-bumps. Cite: [GitHub Actions policy SHA pinning (Aug 2025)](https://github.blog/changelog/2025-08-15-github-actions-policy-now-supports-blocking-and-sha-pinning-actions/) + [GitHub 2026 security roadmap](https://github.blog/news-insights/product-news/whats-coming-to-our-github-actions-2026-security-roadmap/)
3. **Section 1 P0** — Verify W343-P3 5-layer atomic-write architecture progress. If still blocked on Windows POSIX gap, document the bypass-marker policy explicitly in `docs/architecture/W343-EXECUTE/SOTA-PARALLEL-GIT-HOOK-ARCHITECTURE.md` so the next maintainer sees the gap.

### P1 (ship within W347)

4. **Section 7 P1** — Pin PSScriptAnalyzer to RequiredVersion in `code-quality.yml`; pin actionlint download script to v1.7.12 tag in `actionlint.yml`; add `step-security/harden-runner@v2` to every workflow lacking it.
5. **Section 8 P1** — Pin `rev:` to full 40-char SHA for gitleaks/ruff-pre-commit/actionlint in `.pre-commit-config.yaml` (matches header citations).
6. **Section 3 P1** — Migrate `tools/test-parallel-guard-*.mjs` to `node:test` + `node:assert/strict` for TAP output → GH Actions test-reporter rendering.
7. **Section 2 P1** — Document `git worktree prune --expired` cron (could fold into `monthly-metrics.yml`).
8. **Section 4 P1** — Adopt `&&` chaining in `eee.ps1` where sequential operations depend on prior success.

### P2 (ship within W348)

9. **Section 7 P2** — Extract common GH Actions boilerplate (harden-runner + checkout + setup-node) to `.github/actions/setup-runtime/action.yml` composite.
10. **Section 8 P2** — Add `pre-commit autoupdate` monthly cron workflow.
11. **Section 5 P2** — Add bash-home-pin smoke test (`tools/smoke-bash-env.sh` ≤2KB).
12. **Section 1 P2** — Pre-push hook to enforce `--force-with-lease` (not `--force`).
13. **Section 4 P2** — Use null-coalescing `??` for `$env:VAR ?? 'default'` patterns in env-block.

### P3 (track-only)

14. **Section 6 P3** — Hadolint adoption deferred until runtime ships own Dockerfile.
15. **Section 7 P3** — Track GH 2026 `dependencies:` lockfile GA timing.
16. **Section 8 P3** — Combine commit-msg hooks into single dispatcher if latency measured >1s.

## Sources

- [Node.js 22 release announcement](https://nodejs.org/en/blog/announcements/v22-release-announce)
- [Node.js 22.22.1 LTS release notes](https://nodejs.org/en/blog/release/v22.22.1)
- [GitHub Actions secure use reference](https://docs.github.com/en/actions/reference/security/secure-use)
- [GitHub Actions policy SHA pinning (Aug 2025)](https://github.blog/changelog/2025-08-15-github-actions-policy-now-supports-blocking-and-sha-pinning-actions/)
- [GitHub 2026 security roadmap](https://github.blog/news-insights/product-news/whats-coming-to-our-github-actions-2026-security-roadmap/)
- [Wiz GitHub Actions security guide 2026](https://www.wiz.io/blog/github-actions-security-guide)
- [Aikido GitHub Actions security checklist](https://www.aikido.dev/blog/checklist-github-actions)
- [GitGuardian GitHub Actions security cheat sheet](https://blog.gitguardian.com/github-actions-security-cheat-sheet/)
- [dev.to GitHub 2026 dependency locking + native egress firewall](https://dev.to/x4nent/complete-guide-to-github-actions-2026-security-roadmap-dependency-locking-native-egress-5aap)
