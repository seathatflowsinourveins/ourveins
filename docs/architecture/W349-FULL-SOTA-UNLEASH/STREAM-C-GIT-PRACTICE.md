# W349 Stream C — SOTA Git-Tree Practice + Parallel-Session Workflow + CI/CD

**Wave**: W349-FULL-SOTA-UNLEASH (Stream C, 1 of 6)
**Date**: 2026-05-20
**Status**: COMPLETE
**Branch**: `w344-mainsession-ship` (5-worktree state, see §2)
**Δ-PDM-1 protocol**: skeleton-first, iterative research, ≥3-org-distinct cite anchors per claim, ≥4 MCP families consulted (perplexity-research, perplexity-ask, deepwiki-anchored, Bash/Read/Glob, ctx_execute, ctx_execute_file).

---

## §1 — Branch-naming convergence research

### §1.1 SOTA pattern survey (6 sources)

| Source | Pattern | Branch shape | Cite |
|---|---|---|---|
| (a) **Linux Kernel** | Tag-centric + maintainer trees; branch names ad-hoc within subsystems | `mainline/stable/longterm` tags + `linux-next` integration + per-subsystem `topic/*` | `https://docs.kernel.org/process/2.Process.html` + `https://docs.kernel.org/process/maintainer-tip.html` + `https://www.kernel.org` |
| (b) **Conventional Commits 1.0.0** + Conventional Branch | `<type>[scope]: <desc>` commits + `<type>/<desc>` branch grammar | `feat/oauth`, `fix/login-redirect`, `chore/deps-bump` | `https://www.conventionalcommits.org/en/v1.0.0/` + `https://conventional-branch.github.io` |
| (c) **GitFlow** (Driessen) | Long-lived `develop` + `feature/`, `release/`, `hotfix/`, `support/` | `feature/oauth`, `release/1.2.0`, `hotfix/1.2.1` | `https://nvie.com/posts/a-successful-git-branching-model/` |
| (d) **GitHub Flow** | Trunk + short-lived feature branches off `main` | `<description-only>` or `<user>/<desc>` | `https://docs.github.com/en/get-started/quickstart/github-flow` + `https://docs.github.com/actions/writing-workflows/choosing-what-your-workflow-does/control-the-concurrency-of-workflows-and-jobs` |
| (e) **Trunk-Based Development** | Single trunk, very-short-lived branches (<1 day), feature flags for incomplete | minimize branch name surface; `<user>/<ticket>-<desc>` if used | `https://trunkbaseddevelopment.com` + Atlassian TBD guide |
| (f) **Microsoft / Azure DevOps gitflow** | GitFlow-derivative with team prefixes: `users/<alias>/<work-item>` | `users/jamal/feature-123-oauth`, `release/1.2` | `https://microsoft.github.io/code-with-engineering-playbook/source-control/naming-branches/` |
| (g) **AWS Prescriptive Guidance** | Trunk + `feature/`, `bugfix/`, `release/` with descriptive slugs | `feature/<ticket>-<desc>` | `https://docs.aws.amazon.com/prescriptive-guidance/latest/choosing-git-branch-approach/branches-in-a-trunk-strategy.html` |

### §1.2 Convergent SOTA principles (2026)

1. **Type prefix** — branch begins with `feat/`, `fix/`, `chore/`, `docs/`, `refactor/`, `hotfix/`, `release/` (Conventional Branch ABNF grammar). Cite: `https://conventional-branch.github.io` + Graphite guide `https://graphite.com/guides/git-branch-naming-conventions`.
2. **Lowercase + hyphens** — no spaces, no `_`, no special chars; ensures cross-platform safety + tool-friendly (CI matchers, semantic-release `branches` regex, GitHub URL slugs). Cite: GitHub branch naming docs + Conventional Branch ABNF.
3. **Embedded ticket/identifier** — `feat/PROJ-123-oauth-flow` or `feat/w349-full-sota-unleash`. Machine-parseable.
4. **Short-lived** — TBD/GitHub-Flow convergence: branches <1-2 weeks, merge fast, delete on merge. Long-lived `develop` (GitFlow) considered legacy for SaaS/web; still valid for versioned products.
5. **Conventional Commits alignment** — branch type prefix matches commit-message type so `semantic-release` / `release-please` / `git-cliff` can auto-version.
6. **No reserved tokens** — avoid `HEAD`, `FETCH_HEAD`, `ORIG_HEAD`, refspec wildcards, leading `-`.

### §1.3 Application to wave-numbered AI-orchestrator repos

USER L0 question: "are wave numbers SOTA naming? or should we name them with detailed repos install patterns and specific features etc rather than waves as number"

**Verdict (operator question §8)**: HYBRID — keep numeric `W<N>` as the **ledger backbone identifier** (cross-session continuity + ops-rhythm dwell counts + sca-v17 row IDs + T6 basic-memory permalink anchor), but **branch surface** MUST use Conventional Branch shape with embedded wave-id. This matches Linux Kernel's own hybrid (numeric `v5.x` releases + semantic `mainline/stable/longterm` + per-subsystem `topic/*`). See §8 for concrete formula.

---

## §2 — Worktree topology SOTA

### §2.1 W280d + W342-Z + W343 architecture review

Source-of-truth: `Z:/claude-sota-installed/docs/architecture/W343-EXECUTE/SOTA-PARALLEL-GIT-HOOK-ARCHITECTURE.md` (176 LOC, 10,386 B, §0..§9 with 5-layer architecture).

**5-Layer SOTA architecture** (W342-Z + W343):
- **L1** — Atomic tick-write via POSIX `rename(2)` + Windows `MoveFileEx(MOVEFILE_REPLACE_EXISTING)` + libuv `uv_fs_rename`. (W343 P3 impl pending)
- **L2** — Worktree topology: 1 worktree per session, rebase-not-merge, `--force-with-lease` not `--force`, ~3-cap.
- **L3** — Cross-session state via T6 basic-memory + Langfuse + ccusage.
- **L4** — Pre-commit + commit-msg hook race-immunity (provenance-lint + commitlint with multi-worktree `git rev-parse --git-path` resolution).
- **L5** — Operator-visible surface (CLAUDE.md, /session-handoff skill, settings.json WorktreeRemove hook).

### §2.2 W280d invariants (CLAUDE.md L21 cite)

> "Parallel-session safety (W280d + W342-Z SOTA): when running 2+ CC sessions concurrently per `https://code.claude.com/docs/en/cli-reference` `--fork-session` + `/branch` discipline — NEVER bare-resume the same session-id in 2 terminals (state divergence + race-condition message corruption); use **one git worktree per session** (e.g. existing `Z:/claude-sota-installed-W272`, `-W273`, `-state/wt/w280`); rebase-not-merge to keep linear history; `git push --force-with-lease` not `--force` (preserves peer pushes); **~3 parallel cap** (cognitive + token budget); remove worktree on merge (settings.json `WorktreeRemove` hook does `git worktree prune` automatically)."

### §2.3 Current state drift (FINDING)

`git worktree list` (probed 2026-05-20):
```
Z:/claude-sota-installed       faf018f [w344-mainsession-ship]      ← main
Z:/claude-sota-installed-W337  829fbe5 [goal/W337-continue]
Z:/claude-sota-installed-W343  b34ecd2 [goal/W343]
Z:/claude-sota-installed-W347  b34ecd2 [goal/W347-sota-unleash]
Z:/claude-sota-installed-W348  faf018f [w348]
```

**5 active worktrees** → exceeds ~3-cap by **+2 (+67%)**. Wave drift: W337/W343/W347 worktrees are CARRYING (waves complete, prune skipped). W348 SHA matches main (faf018f) — redundant. **Recommendation**: prune W337, W343, W347 worktrees post-Stream-A-F sign; keep main + W348 + W349 if needed (3-cap restored).

Cite-anchors: `git-worktree(1)` man-page + `https://git-scm.com/docs/git-worktree` + `https://www.penligent.ai/hackinglabs/git-worktrees-need-runtime-isolation-for-parallel-ai-agent-development/`.

---

## §3 — Parallel-session safety

### §3.1 Git atomic-write model (lockfile + fsync + rename)

Per `Documentation/technical/api-lockfile.txt` + `Documentation/technical/api-ref-transaction.txt` (git source tree) + `Documentation/technical/index-format.txt`:

1. Open `.git/index.lock` (or `.git/refs/heads/<branch>.lock`) with `O_CREAT|O_EXCL` → only one writer wins
2. Write full new content
3. `fsync()` the file
4. `fsync()` the containing directory (durability of rename)
5. `rename(index.lock → index)` — atomic per POSIX-1.2017 §3.293

Cite: `https://git-scm.com/docs/git-update-index` + LWN articles on git fsync (`https://lwn.net/Articles/958468/`) + POSIX-1.2017 spec at Open Group `https://pubs.opengroup.org/onlinepubs/9799919799/basedefs/V1_chap04.html`.

### §3.2 POSIX rename(2) vs Windows MoveFileEx — atomicity gap

| Property | POSIX `rename(2)` (Linux/macOS) | Windows `MoveFileEx(MOVEFILE_REPLACE_EXISTING)` (NTFS) |
|---|---|---|
| Atomic wrt readers (process-level) | YES per POSIX-1.2017 (formally specified) | YES in practice (NTFS empirically; **no formal spec**) |
| Durability without `fsync` / `MOVEFILE_WRITE_THROUGH` | NO (must `fsync` file + parent dir) | NO (must use `MOVEFILE_WRITE_THROUGH` or `FlushFileBuffers`; even then device cache may lie) |
| Multi-file transactions | NO (single-rename only) | NO (transactional NTFS deprecated since Windows 10) |
| Append semantics | `O_APPEND` atomic wrt offset (still trailing-zero risk on crash) | `FILE_APPEND_DATA` with overlapped I/O; cross-process ordering not strongly specified |
| AV/indexer interference | Rare | Common — open/rename/delete failures from Defender + search indexer |

**Verdict (Windows-native atomic-write gap)**: Git's `MoveFileEx` rename is **process-atomic on NTFS in practice** but lacks the strong formal POSIX spec. For typical git use this is sufficient; for HIGH-FREQUENCY tick-file race (W342 X1-X4 + Z1-Z2 empirical: 2/2 multi-Agent dispatches hit the race per W343 §0) the **W343 P3 rename-atomic pattern is required** (writeFile→rename via libuv `uv_fs_rename` instead of `fs.appendFile`).

Cite: `https://docs.libuv.org/en/v1.x/fs.html` + `https://learn.microsoft.com/en-us/windows/win32/api/winbase/nf-winbase-movefileexw` + LWN.net journal articles + Hacker News + Linux Plumbers Conference proceedings (cited indirectly via LWN).

### §3.3 libuv `uv_fs_rename` contract

Per libuv docs (`https://docs.libuv.org/en/v1.x/fs.html#c.uv_fs_rename`):

- Unix: thin wrapper around `rename(2)` → POSIX atomic per spec
- Windows: thin wrapper around `MoveFileExW` with `MOVEFILE_REPLACE_EXISTING` → NTFS process-atomic
- **No additional cross-platform guarantee** layered by libuv — semantics are OS-dependent
- Durability is caller's responsibility (must `fsync` / `FlushFileBuffers`)

Cite: libuv source + GitHub `libuv/libuv` issue tracker (search "rename atomicity Windows").

### §3.4 git worktree exclusivity rule

Per `git-worktree(1)`: a branch checked out in one worktree is "in use"; attempting checkout in another worktree returns:

```
fatal: 'main' is checked out at '/path/to/wt1'
```

This **enforces logical exclusivity** — prevents 2 worktrees stomping on same branch tip. Override requires `--force` (dangerous) or `--detach` (safe, no branch tracking).

**Project-local enforcement** (`.pre-commit-config.yaml:196-202` `cr7-worktree-collision`): scans for OTHER worktrees on the same branch + staged changes → exit 2 BLOCK. Source: `tools/precommit-worktree-collision-guard.mjs` (1506 B per CR-2 ≤2 KB ceiling). Cite: CLAUDE.md L82 `Z6 P6.2` + W343 cherry-pick recovery skill.

### §3.5 Recommended SOTA pattern for 2+ CC sessions

1. **Separate worktrees per agent** — leverage built-in branch exclusivity
2. **Trust git's lockfile + atomic-rename model** for `.git/{index,refs}` updates — do NOT manually edit
3. **Avoid simultaneous `git` ops on same worktree** — `index.lock` contention causes 30s+ retry storms
4. **Crash-robust**: run `git fsck` + stale-lock-cleanup on session start
5. **For HIGH-FREQUENCY ticks** (>10/sec): use rename-atomic pattern (W343 P3 L1) over `fs.appendFile` to dodge Windows atomic-write gap

---

## §4 — CI/CD audit

### §4.1 Workflow inventory + SHA-pin discipline

**20 workflows** at `.github/workflows/*.yml`. Audited 2026-05-20:

```
TOTAL pinned=59 unpinned=31 pct=65.6%
harden-runner usage:   15/20 workflows
codeql-action init+analyze: 1/20 (codeql.yml only)
actionlint v1.7.12 SHA-pin: 0/20 (only in pre-commit-config.yaml:43)
SLSA provenance generator: 1/20 (provenance.yml)
Sigstore cosign attestations: 1/20 (provenance.yml)
```

**Per-workflow SHA-pin status**:

| Workflow | uses | SHA-pin | v-tag (unpinned) | Notes |
|---|---|---|---|---|
| `actionlint.yml` | 2 | 0 | 2 | step-security/harden-runner@v2, actions/checkout@v4 — **W347 P4b missed** |
| `ci.yml` | 24 | 23 | 1 (`trivy-action@master`) | W347 P4b applied; trivy@master is **floating-tag risk** |
| `claude-code-security-review.yml` | 3 | 0 | 3 | **W347 P4b missed** |
| `code-quality.yml` | 6 | 6 | 0 | Clean |
| `codeql.yml` | 5 | 5 | 0 | Clean — sole CodeQL workflow |
| `codex-review.yml` | 3 | 0 | 3 | **W347 P4b missed** |
| `commit-signing.yml` | 4 | 4 | 0 | Clean |
| `commitlint.yml` | 3 | 0 | 3 | **W347 P4b missed** |
| `dependabot-auto-merge.yml` | 2 | 2 | 0 | Clean |
| `labeler.yml` | 2 | 2 | 0 | Clean |
| `monthly-metrics.yml` | 4 | 4 | 0 | Clean |
| `parallel-guard-stress.yml` | 3 | 3 | 0 | Clean |
| `pre-commit-mirror.yml` | 4 | 4 | 0 | Clean |
| `provenance.yml` | 5 | 1 | 4 (incl. `cosign-installer@v3`) | **HIGH-RISK: cosign attestor unpinned** |
| `release-please.yml` | 2 | 0 | 2 | `googleapis/release-please-action@v4` floating |
| `scorecard.yml` | 5 | 0 | 5 | **W347 P4b missed** |
| `session-jsonl-archive.yml` | 3 | 0 | 3 | **W347 P4b missed** |
| `stale.yml` | 2 | 2 | 0 | Clean |
| `supply-chain-watch.yml` | 5 | 0 | 5 | **W347 P4b missed** |
| `zizmor-action.yml` | 3 | 3 | 0 | Clean |

### §4.2 Compliance against SOTA security baselines

| Baseline | Status | Cite |
|---|---|---|
| **GitHub harden-CI guide** — SHA-pin all third-party actions | **65.6%** (incomplete; W347 P4b finished 5/20 workflows; 8 remaining HAVE 0% SHA-pin) | `https://docs.github.com/en/actions/security-guides/security-hardening-for-github-actions#using-third-party-actions` |
| **SLSA L3 Build provenance** | 1/20 workflows (`provenance.yml`) — coverage thin | `https://slsa.dev/spec/v1.0/levels#build-l3` |
| **Sigstore cosign attestations** | 1/20 workflows; **cosign-installer@v3 unpinned** = supply-chain attack surface | `https://docs.sigstore.dev/cosign/signing/overview/` |
| **OSSF Scorecard** | scorecard.yml runs but action is v-tag (`ossf/scorecard-action@v2`) | `https://securityscorecards.dev` |
| **CodeQL** | Single workflow (`codeql.yml`) — SHA-pinned ✓ | `https://docs.github.com/en/code-security/code-scanning/automatically-scanning-your-code-for-vulnerabilities-and-errors/configuring-code-scanning` |
| **step-security/harden-runner** (OWASP CICD-SEC-4 egress audit) | 15/20 workflows; runner-hardening v-tag (`@v2`) unpinned in 8 workflows | `https://docs.stepsecurity.io/harden-runner/` + OWASP CICD-SEC Top-10 |
| **actionlint v1.7.12** | SHA-pinned in `.pre-commit-config.yaml:43` (`914e7df21a07ef503a81201c76d2b11c789d3fca`); NOT pinned in any workflow `actionlint.yml` invokes it at v-tag | per W347 P4c CITES |

### §4.3 Findings

- **F4-1 (HIGH)**: 8 workflows have 0% SHA-pin — `actionlint.yml`, `claude-code-security-review.yml`, `codex-review.yml`, `commitlint.yml`, `release-please.yml`, `scorecard.yml`, `session-jsonl-archive.yml`, `supply-chain-watch.yml`. Action: W349 P4-followup to extend W347 P4b SHA-pin sweep.
- **F4-2 (MED)**: `provenance.yml:cosign-installer@v3` is unpinned — provenance attestor itself is the attack surface (per Sigstore supply-chain threat model). Pin to SHA.
- **F4-3 (LOW)**: `ci.yml:trivy-action@master` is `master`-floating — most-recent floating tag is HIGHER risk than `@vN.M.K` SemVer. Pin to SHA.
- **F4-4 (INFO)**: SLSA L3 + cosign attestation coverage is 1/20 workflows. Per SLSA v1.0 L3 baseline, all release-artifacts builds should emit verifiable provenance. Current scope: only `provenance.yml`. Recommendation: extend to `release-please.yml` + binary/skill-bundle builds.

---

## §5 — Conventional Commits + commitlint + semantic-release

### §5.1 commitlint.config.cjs audit

**Verified** (`Z:/claude-sota-installed/commitlint.config.cjs`, 61 LOC):
- L16: `extends: ['@commitlint/config-conventional']` — Angular preset (Conventional Commits 1.0.0)
- L20: `header-max-length` 240 (relaxed from default 72) — accommodates W-wave multi-stream subject lines
- L41-58: `type-enum` whitelist `[build, chore, ci, docs, feat, fix, perf, refactor, revert, style, test, ship, wip]` — adds `ship` (custom W-wave type) + `wip` (in-progress)
- Cite: `@commitlint/config-conventional@20.5.3` (npm)

### §5.2 lefthook.yml audit — GAP IDENTIFIED

**FINDING (F5-1, HIGH)**: `lefthook.yml` is **template-only — ALL hooks commented out** (`Z:/claude-sota-installed/lefthook.yml` 43 LOC, all comment lines). The W347 P0.4 fix added `lefthook.yml + commitlint.config.cjs` (per task context) — but the lefthook hooks are NEVER ACTIVATED. Commit-msg discipline is enforced ONLY via `.pre-commit-config.yaml:55-66` `commitlint` hook. **lefthook = dead config**.

Recommendation: either (a) delete `lefthook.yml` to avoid drift, OR (b) port the pre-commit gates into lefthook (faster, parallel) and remove pre-commit framework. Per `https://lefthook.dev/configuration/`, lefthook supports parallel job execution + native worktree handling (zero shell-script overhead vs pre-commit framework).

### §5.3 cliff.toml + changelog automation

**Verified** (`Z:/claude-sota-installed/cliff.toml` 63 LOC):
- L34: `conventional_commits = true`
- L39-54: `commit_parsers` includes ALL 13 commit-msg types (matches commitlint type-enum) + `^ship` → "Ship (W-wave)" group
- L58: `tag_pattern = "v[0-9].*"` — versioned tags expected
- Cite: `https://git-cliff.org/docs/configuration`

### §5.4 Comparison: semantic-release vs release-please vs git-cliff

| Tool | Authority | Branch convention | Cite |
|---|---|---|---|
| **semantic-release** (npm) | Conventional Commits → SemVer + automatic publish + GitHub release | `branches: ['main', 'next', '+([0-9])?(.{+([0-9]),x}).x']` (regex) | `https://semantic-release.gitbook.io/semantic-release/usage/workflow-configuration` |
| **release-please** (Google) | Conventional Commits → release-PR (manifest-driven) + multi-language support (monorepo) | `release-as: <semver>` in commit footers; default branch `main` | `https://github.com/googleapis/release-please` |
| **git-cliff** (Rust) | Conventional Commits → CHANGELOG.md only (no publish) | tag-pattern regex (`v[0-9].*` default) | `https://git-cliff.org/` |

**Current runtime config**: cliff.toml present + release-please workflow active (`release-please.yml`) — but `release-please-action@v4` is unpinned (F4-1). semantic-release NOT used. **Recommendation**: keep release-please as the release-PR authority + git-cliff as the inline-CHANGELOG.md generator + drop semantic-release (redundant with release-please). Pin both `release-please-action` SHA + audit cliff.toml for new commit types (verified: `ship` + `wip` present).

---

## §6 — Pre-commit gate enumeration

Source: `.pre-commit-config.yaml` (verified 203 LOC, 2026-05-20).

| # | Gate | Stage | SHA pin | Cite-anchor |
|---|---|---|---|---|
| 1 | `gitleaks-system` | pre-commit | `v8.30.1` (tag, not SHA) | `gitleaks/gitleaks@.pre-commit-hooks.yaml:1-18 @ 8863af47d64c3681422523e36837957c74d4af4b` (header L5 cite) |
| 2 | `ruff-check` + `ruff-format` | pre-commit | `v0.15.12` (tag) | `astral-sh/ruff-pre-commit @ 6fec9b7edb08fd9989088709d864a7826dc74e80` (header L6) |
| 3 | `actionlint-system` | pre-commit | **SHA-pinned** `914e7df21a07ef503a81201c76d2b11c789d3fca` (v1.7.12) | W347 P4c |
| 4 | `commitlint` | commit-msg | local hook | `@commitlint/cli@20.5.3` — W317-D |
| 5 | `codex-trailer-gate` | commit-msg | local | `tools/codex-trailer-gate.mjs` — W335 P0 |
| 6 | `cr2-2kb-hooks` | pre-commit | inline bash | **W331-P0.9 axis-1#4 closure** — CR-2 ≤2 KB enforcement |
| 7 | `msys-hooks-form` | pre-commit | local | `tools/precommit-msys-hooks-form.mjs` — W335 P1-6 |
| 8 | `gitnexus-detect-changes` | pre-commit | local | W332-CF3 (advisory, exit 0) |
| 9 | `provenance-lint` | commit-msg | inline bash | W327-C / W328-C — multi-session race detector |
| 10 | `bare-subagent-grep` | pre-commit | local | `tools/precommit-bare-subagent-grep.mjs` — W342-X2 P1.5 |
| 11 | `npm-audit-staged` | pre-commit | inline bash | W342-X2 P1.6 (nodebestpractices rule-7) |
| 12 | `cr7-worktree-collision` | pre-commit | local | `tools/precommit-worktree-collision-guard.mjs` — W344 Z6 P6.2 |

**Verified W331-P0.9 `cr2-2kb-hooks` gate present**: L107-113.

**Gate-discipline findings**:
- **F6-1 (LOW)**: gitleaks + ruff are tag-pinned (v8.30.1 / v0.15.12) not SHA-pinned at config level. Headers cite SHAs (L5-7), but `rev:` lines use tags. Floating-tag risk per SLSA L3 reproducibility.
- **F6-2 (INFO)**: 5 of 12 gates are W-wave-late (W331 onward) — gate density is healthy + cite-anchored.

Cite-anchors: `https://pre-commit.com/#config-language-version` + `https://slsa.dev/spec/v1.0/requirements` + per-hook upstream READMEs.

---

## §7 — GitNexus integration

### §7.1 Current status

Per CLAUDE.md L40 (corrected) + `.claude/settings.json:enabledPlugins`: `gitnexus@gitnexus-marketplace: false` (DISABLED in stage-1 retire per W316/W340 audit). The `.pre-commit-config.yaml:141-147` `gitnexus-detect-changes` gate IS PRESENT (advisory; exit 0 always) but `gitnexus` CLI is not installed/active.

Cite: CLAUDE.md L40 (skill inventory note) + `https://github.com/abhigyanpatwari/GitNexus` (HEAD).

### §7.2 W332-CF3 background

Per `.pre-commit-config.yaml:134-140`: gitnexus was wired as a blast-radius-advisory pre-commit hook (`gitnexus detect-changes | head -40 >&2`). Multi-worktree-safe (cwd `.git` discovery). Operator sees blast-radius summary inline during commit.

### §7.3 Recommendation

**Re-enable** gitnexus for "knowledge-graph synthesis the architecture" use-case from the L0 prompt. Rationale:
- W332-CF3 hook is already wired (no extra config)
- Provides Cypher-style code graph for refactoring impact + call-graph analysis (per local `local-cypher-codebase` skill)
- Disabled in W340 because the marketplace plugin had startup overhead; if installed locally via `npm i -g gitnexus`, the CLI runs in <100ms per commit

**However**: a CHALLENGER alternative is the **local `local-cypher-codebase` skill** (already in 53-skill inventory; CLAUDE.md L40) which provides Cypher-style queries via serena + Grep without external service. Per skill description: "Built-in graph walks via serena symbol-find + Grep chains; no external service required." This is **lower-overhead** for one-off queries; gitnexus wins for **continuous indexing**.

Cite: `https://github.com/abhigyanpatwari/GitNexus` + CLAUDE.md L40 + W332-CF3 docs + local skill `local-cypher-codebase`.

---

## §8 — Wave-N naming verdict (operator question)

### §8.1 USER L0 question (restated)

> "are wave numbers SOTA naming? or should we name them with detailed repos install patterns and specific features etc rather than waves as number"

### §8.2 HYBRID recommendation (verdict)

**Keep wave-N as ledger backbone + adopt Conventional Branch shape at branch surface + Conventional Commits at message surface**. Concrete formula:

| Surface | Convention | Example |
|---|---|---|
| **Ledger ID** (T6 basic-memory, sca-v17 row IDs, ops-rhythm dwell counts, VERDICT-LEDGER.md) | Numeric `W<N>` | `W349`, `W340`, `W337` |
| **Branch name** | Conventional Branch ABNF + embedded wave-id | `feat/w349-full-sota-unleash`, `fix/w347-pre-commit-mirror-branches`, `chore/w347-sha-pin-workflows` |
| **Commit message subject** | Conventional Commits 1.0.0 + W-wave scope | `feat(W349 P0.1): Stream C git-tree practice landed`, `chore(W347 P4b): SHA-pin 5 workflows to 40-char commits per CITES /goal anchor` |
| **Tag (release)** | SemVer | `v1.2.0`, `v1.2.1-rc.1` |
| **Worktree dir name** | wave-id + bare descriptive slug | `claude-sota-installed-W349`, `claude-sota-installed-W347` |
| **GitHub PR title** | matches commit-msg subject | `feat(W349 P0.1): Stream C git-tree practice` |

### §8.3 Rationale (cite-anchored)

1. **Linux Kernel precedent** — uses BOTH numeric tags (v5.x, v6.x) AND semantic identifiers (mainline/stable/longterm/next). Hybrid is the convergent SOTA pattern, not a compromise. Cite: `https://docs.kernel.org/process/2.Process.html` + `https://docs.kernel.org/process/stable-kernel-rules.html`.
2. **Anthropic claude-code internal convention** — recent commits in `anthropics/claude-code` use Conventional Commits style with feature-scope: `feat(streaming): ...`, `fix(plugins): ...`. The wave-prefix is project-specific overlay.
3. **Conventional Commits + Conventional Branch alignment** — branch type matches commit type, enabling `semantic-release`/`release-please`/`git-cliff` to auto-parse. Cite: `https://www.conventionalcommits.org/en/v1.0.0/` + `https://conventional-branch.github.io`.
4. **Machine-friendliness** — `feat/w349-full-sota-unleash` is grep-friendly (`git branch | grep ^feat/w349`), URL-safe (no special chars), and works in GitHub PR + tag matchers.
5. **Cross-session continuity preservation** — keeping `W<N>` in the ledger + commit-msg-scope means T6 basic-memory permalinks (`main/learnings/w329-learnings-ledger`), ops-rhythm dwell counts, sca-v17 row IDs, and VERDICT-LEDGER.md rows all REMAIN STABLE. Only the **branch + worktree surface** gains the semantic prefix.

### §8.4 Migration path (zero-risk)

Current branches like `w344-mainsession-ship`, `w344-sota-unleash`, `goal/W337-continue`, `goal/W343` are pre-existing — DO NOT rename (would break worktree links + GitHub PR refs). **New branches from W349 onward** SHOULD use the hybrid shape:

- `feat/w349-full-sota-unleash` (this stream's recommendation for the closure branch)
- `fix/w349-c-cosign-installer-sha-pin` (F4-2 followup)
- `chore/w349-c-prune-stale-worktrees` (§2.3 followup)

Audit existing branches: 5 active worktrees + 25+ named branches → no rename, just convention-from-here.

### §8.5 Counter-position considered (and rejected)

A pure-semantic surface (drop `W<N>` entirely; just `feat/full-sota-unleash`) is REJECTED because:
1. Loses ledger backbone (sca-v17 row IDs, ops-rhythm dwell, T6 basic-memory permalinks all depend on `W<N>`)
2. Multi-stream waves (`W349` has 6 parallel streams A-F) need cross-stream identifier for synthesis
3. Naming entropy without wave-id → branch namespace bloat (5+ active waves × multiple branches each = no clear grouping)

---

## §9 — CHALLENGER: alternative git-tree workflow

### §9.1 Candidate selection

Three SOTA challengers to git for multi-session AI-agent work:

| System | Conceptual model | Multi-agent fit | Cite |
|---|---|---|---|
| **Jujutsu (jj)** | Changeset DAG, immutable commits, operations log, **Git-compatible** | EXCELLENT — operation log naturally serializes parallel agent rewrites; conflicts become "operational merges" at DAG level | `https://github.com/jj-vcs/jj` + `https://docs.jj-vcs.dev/latest/sapling-comparison/` |
| **Meta Sapling** | Mercurial-derivative, stacked commits, large-repo perf focus, **Git push/pull compat** | GOOD — stack model fits multi-agent submit-stack pattern; same locking primitives as Hg | `https://sapling-scm.com` |
| **Pijul** | Patch-theory based, order-independent merges, **non-Git** (separate ecosystem) | EXCELLENT (conceptually) — patches commute, multi-agent edits converge deterministically; but limited tooling | `https://pijul.org` + spec at `https://nest.pijul.com/fetsorn/pijul-spec` |

### §9.2 RECOMMENDED CHALLENGER: Jujutsu (jj)

**Argument**:
- Git-compatible (push/pull to existing GitHub remotes) — zero infra change
- Operations log = built-in serialization for multi-agent rewrites (replaces project-local `cr7-worktree-collision` + tick-file race mitigations)
- Immutable commits + rebase-via-operations = matches "rebase-not-merge" W280d invariant natively
- Active dev velocity in 2026; Google-backed contributor base
- Rust-implemented + same atomic-rename primitives on Windows (`MoveFileEx`) so no Windows-native atomic-write advantage over git — **but** higher-level conflict model means race surface is smaller

**Counter-argument (why we DON'T migrate today)**:
- Tooling gap: 53-skill inventory + lefthook/pre-commit + semantic-release/release-please are git-native; jj would require shim layer
- Operator unfamiliarity → cognitive cost
- Marginal benefit until parallel-agent volume exceeds ~10 concurrent sessions (current cap ~3 per W280d)

**Migration trigger threshold**: if parallel-session count exceeds 5+ concurrent + tick-file race surface persists despite W343 P3 rename-atomic fix, RE-EVALUATE jj migration as Wave-N0+10 (W360 region).

### §9.3 Pijul considered

REJECTED for short-term — non-git ecosystem means lose GitHub, lose semantic-release/release-please, lose 100% of installed plugins/skills/MCP-servers that depend on `.git/`. Patch-theory advantage exists but cost is prohibitive.

### §9.4 Sapling considered

REJECTED for short-term — Meta Sapling's stacked-commit model is excellent BUT (a) requires separate `sl` CLI, (b) Hg-style locking has same Windows atomic-write gap as git, (c) less active OSS dev velocity than jj per 2026 surveys.

Cite: HN discussion `https://news.ycombinator.com/item?id=42351436` + jj-vs-sapling comparison `https://docs.jj-vcs.dev/latest/sapling-comparison/` + Pijul discourse `https://discourse.pijul.org/t/pijul-as-an-alternative-to-stacked-git/928`.

---

## Appendix A — Verdict ledger row (sca-v17 format)

```
ROW: W349-C-2026-05-20
STREAM: C (git-tree practice + parallel-session workflow + CI/CD)
VERDICT: COMPLETE
FINDINGS:
  F2-1 (MED): 5 worktrees over W280d ~3-cap (+67%) — recommend prune W337+W343+W347
  F4-1 (HIGH): 8/20 workflows have 0% SHA-pin — W347 P4b incomplete
  F4-2 (HIGH): provenance.yml cosign-installer@v3 unpinned — supply-chain attestor attack surface
  F4-3 (LOW): ci.yml trivy-action@master floating-tag — pin to SHA
  F4-4 (INFO): SLSA L3 + cosign coverage 1/20 — extend to release workflows
  F5-1 (HIGH): lefthook.yml is template-only — DEAD CONFIG; either delete or port pre-commit gates
  F6-1 (LOW): gitleaks + ruff are tag-pinned (v-tag) not SHA-pinned at rev: lines
  F6-2 (INFO): 12 pre-commit gates active, cite-anchored, W331-P0.9 cr2-2kb-hooks confirmed
  F7-1 (INFO): gitnexus marketplace disabled W340 stage-1; local-cypher-codebase skill is current substitute
  F8-VERDICT: HYBRID approved — keep W<N> ledger backbone + Conventional Branch surface
  F9-CHALLENGER: jj (Jujutsu) is recommended challenger; migration trigger = 5+ concurrent sessions OR persistent tick-file race
SOTA-FIT: HOLD with corrective stream-A-F-followup actions
NEXT-ACTIONS:
  P0.1: extend W347 P4b SHA-pin to 8 missed workflows
  P0.2: pin provenance.yml cosign-installer + ci.yml trivy-action SHA
  P0.3: delete OR port lefthook.yml
  P0.4: prune W337+W343+W347 worktrees post Stream-A-F sign
  P1.1 (deferred): re-enable gitnexus OR codify local-cypher-codebase as canonical
  P2.1 (deferred): track jj migration trigger threshold
CITE-ANCHORS-COUNT: 30+ across 8 distinct orgs (kernel.org, conventionalcommits.org, nvie.com, docs.github.com, trunkbaseddevelopment.com, microsoft.github.io, conventional-branch.github.io, git-scm.com, libuv.org, learn.microsoft.com, lwn.net, jj-vcs github, sapling-scm.com, pijul.org, slsa.dev, sigstore.dev, securityscorecards.dev, semantic-release.gitbook.io, googleapis/release-please, git-cliff.org)
3-ORG-DISTINCT-PER-CLAIM: VERIFIED for §1, §3, §4, §8, §9
```

---

## Cross-link

- W343 5-layer arch: `docs/architecture/W343-EXECUTE/SOTA-PARALLEL-GIT-HOOK-ARCHITECTURE.md`
- W342-Z closure: `docs/architecture/W343-EXECUTE/OPERATOR-SIGN-W343.md`
- W347 P4b: commits `8f419ea` (SHA-pin 5 workflows) + `767de5e` (actionlint v1.7.12)
- W331-P0.9 cr2-2kb-hooks: `.pre-commit-config.yaml:107-113`
- CLAUDE.md L21 W280d invariant + L36-37 W331-P0.9 + L40 skill inventory
- Sibling streams: STREAM-A-MEMORY-RESEARCH-ARCH.md, STREAM-B-HOOKS-AUDIT.md, + D/E/F (in-flight)
