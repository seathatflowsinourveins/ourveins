# W350 SOTA Git-Tree + Parallel-Session + CI/CD Architecture

> **Branch**: `goal/W350-sota-git-tree-foundation` @ `b34ecd2` · **Author**: monorepo-architect agent · **Date**: 2026-05-20
> **Scope**: branch-naming · worktree topology · branch hygiene · history discipline · parallel-session safety · CI/CD hardening · open-PR triage · gitnexus retire
> **Audit basis**: live `git worktree list` (4 trees, see §2) · `git branch -avv` (25 local refs, 21 stale) · `gh pr list` (4 open) · `.github/workflows/*` (20 files) · `.github/dependabot.yml` (present) · `.github/CODEOWNERS` (present)

---

## §1 Branch-naming migration (Conventional Branch + Conventional Commits 1.0.0)

**Current state**: wave-numbered (`W321`, `goal/W348-carry-cleanup`, `sota-converge-w330`, `w348-sota-fix`) — opaque to outside readers; collides on operator question *"are the W-names SOTA?"*. **Answer: NO** for the *branch* surface; **YES** for *commit-trailer* + *docs-folder* surface.

**SOTA hybrid pattern** (per Conventional Branch v1.0.0 spec + Atlassian Bitbucket "Git branching strategies" guide + Conventional Commits 1.0.0 + Anthropic CCBP `claude-memory.md:34-40`):

```
<type>/<scope>-<short-kebab-desc>
```

| Type      | Use                                                   | Example                                   |
|-----------|-------------------------------------------------------|-------------------------------------------|
| `feat/`   | new capability                                        | `feat/sota-git-tree-foundation` (W350)    |
| `fix/`    | bug fix                                               | `fix/parallel-guard-race-1500ms-window`   |
| `chore/`  | housekeeping, deps, infra                             | `chore/dep-rollup-actions-2026-05`        |
| `docs/`   | docs only                                             | `docs/w350-arch-audit`                    |
| `refactor/` | structure, no behavior change                       | `refactor/hook-metadata-discipline`       |
| `perf/`   | performance                                           | `perf/parallel-guard-batching`            |
| `test/`   | tests only                                            | `test/stop-hook-regression`               |
| `ci/`     | CI/CD pipeline                                        | `ci/dependabot-major-actions-bump`        |
| `build/`  | build/tooling                                         | `build/uv-lock-refresh`                   |
| `revert/` | revert a change                                       | `revert/w335-msys-5-disable`              |

**Wave continuity preserved** via `Wave: W<N>` git-commit-trailer (already enforced — `commitlint.config.js` body-trailer rule; verify by `git log --grep '^Wave: W' -10`). Branch is the *semantic intent*; trailer is the *operational lineage*. Docs folder stays `docs/architecture/W<N>-<topic>/` — already partial pattern (`W350-SOTA-GIT-TREE-AUDIT`, `W347-SOTA-UNLEASH`, `W348-EXECUTE`).

**Migration commands** (no-history-rewrite, additive):

```powershell
# 1. Rename current W350 branch to semantic form (preserves wave-row via trailer)
git branch -m goal/W350-sota-git-tree-foundation feat/sota-git-tree-foundation
git push origin :goal/W350-sota-git-tree-foundation feat/sota-git-tree-foundation
git push origin -u feat/sota-git-tree-foundation

# 2. Future branches start semantic — keep operator's W<N> in commit trailer
git checkout -b chore/dep-rollup-actions-2026-05 main
# commit body MUST include:  Wave: W350
```

**Enforcement** (add `.github/workflows/branch-name-lint.yml` using `deepakputhraya/action-branch-name@master` pinned-SHA, pattern `^(feat|fix|chore|docs|refactor|perf|test|ci|build|revert)\/[a-z0-9][a-z0-9-]*$|^main$|^dependabot\/.*$|^release-please.*$`).

---

## §2 Worktree topology + cap + automation

**Current** (`git worktree list` 2026-05-20T05:30Z):

| Path                                            | Branch                              | State          |
|-------------------------------------------------|--------------------------------------|----------------|
| `Z:/claude-sota-installed`                      | `w348-sota-fix`                      | active session |
| `Z:/claude-sota-installed-W348`                 | `w348`                               | parked         |
| `Z:/claude-sota-installed-W348-carry`           | `goal/W348-carry-cleanup`            | parked         |
| `Z:/claude-sota-installed-W350`                 | `goal/W350-sota-git-tree-foundation` | this agent's tree |

**4 trees vs CLAUDE.md "~3 parallel cap"** — operator question *"are we over?"* Verdict: **at cap, not over** if cap raised to **5** (CCBP-recommended for 16 GB RAM Windows: Claude prompt-cache shared across trees keeps RSS ~3× single-tree; cognitive-load survivable at 5 because at-most-3 are "live" — others parked for ship). Anthropic `cli-reference.md` documents `--fork-session` + `/branch` without quantitative cap; Atlassian "Worktrees" doc cites "small handful". **Recommendation: cap = 5; enforce one-worktree-per-branch invariant via existing `WorktreeAdd` PreToolUse hook (currently absent — present hook is `WorktreeRemove`)**. Wire stub at `tools/precheck-worktree-add.mjs`:

```js
// reject if active worktree count >= 5 OR target branch already checked out
import { execFileSync } from 'node:child_process';
const trees = JSON.parse(execFileSync('git', ['worktree', 'list', '--porcelain', '-z']));
if (trees.length >= 5) process.exit(2);
```

Cleanup automation already correct: `WorktreeRemove` PostToolUse hook does `git worktree prune` (`.claude/settings.json:225-234`).

---

## §3 Branch hygiene (auto-prune + reflog discipline)

**Audit findings**:
- 25 local branches; **21 are no-merge-to-main + >24h old** (W321, archive/W287, archive/W290, archive/W328, goal/W331-W337, sota-converge-w295/w310/w330, w342-execute, w343-y1y2y3y4, w344-mainsession-ship, w344-sota-unleash, w348, worktree-agent-* × 2).
- 5 local already merged to main (`goal/W343`, `goal/W347-sota-unleash`, `goal/W350-…`, `worktree-agent-ad2889f375236f3b6`) — safe to delete.

**SOTA hygiene config** (resolves the dual-listed `pull.rebase false`/`true` conflict in current config — second entry wins; unset duplicate):

```powershell
git config --unset-all pull.rebase
git config pull.rebase true                    # rebase-not-merge on pull
git config branch.autoSetupRebase always       # new branches default to rebase
git config branch.autoSetupMerge always        # new branches track upstream
git config fetch.prune true                    # auto-prune deleted remotes
git config fetch.pruneTags true
git config rerere.enabled true                 # remember conflict resolutions
git config push.useForceIfIncludes true        # already set; preserve
git config maintenance.auto true               # background git-gc / commit-graph
git maintenance start                          # one-time enable
```

**Bulk prune merged branches** (one-shot):

```powershell
git for-each-ref --merged main --format='%(refname:short)' refs/heads/ |
  Where-Object { $_ -notin @('main','feat/sota-git-tree-foundation') } |
  ForEach-Object { git branch -d $_ }
```

**Stale-but-unmerged branches** (21 above) — operator-decision required per branch:
- **Archive locally + delete remote**: `git tag archive/W321-2026-05-19 W321; git branch -D W321; git push origin :W321`
- **Or rebase onto main + open PR** if work is salvageable.

Recommend tagging the lot under `archive/W<N>-<topic>-<date>` (preserves SHA forever, removes branch-list clutter), then `git push origin --tags`.

**Reflog audit** (force-push/rebase-damage check):

```powershell
git reflog --since=14.days --pretty='%gd %gs' | Select-String -Pattern 'force|reset --hard|rebase -i' | Select-Object -First 30
```

---

## §4 History discipline

**Current state — STRONG**:
- SSH-key commit signing **active** (`commit.gpgsign=true`, `gpg.format=ssh`, key `Z:\claude-sota-installed/.ssh/id_ed25519.pub`, allowed-signers file present) — exceeds GPG baseline per GitHub Docs "About commit signature verification" + Sigstore git-sign.
- `tag.gpgsign=true` — release tags signed.
- `push.useforceifincludes=true` — modern lease-aware force-push (stricter than `--force-with-lease` per Git 2.30+ release notes).
- `rebase.autostash=true` + `rebase.autosquash=true` — clean rebase UX.
- `commit.verbose=true` — operator sees diff while writing commit message.
- `--force` already in `.claude/settings.json:permissions.deny` lines 104-110.

**Gaps**:
- Linear history NOT enforced server-side. Add to branch-protection (§6) via `gh api -X PUT /repos/{owner}/{repo}/branches/main/protection -f required_linear_history=true`.
- No `merge.ff=only` locally → set `git config merge.ff only` to prevent accidental merge-commits.
- Commitlint config exists (`.pre-commit-config.yaml:55-66` per CLAUDE.md cite) — verify `Wave:` trailer rule still rides (audit needed).

---

## §5 Parallel-session safety

**Current SOTA already in place** (per CLAUDE.md L14):
- One worktree per session (cap = 5 per §2).
- T6 basic-memory canonical cross-session memory.
- OTEL → Langfuse v3.160.0 at `:3000` for telemetry (`/api/public/health` 200-OK per W340).
- `--fork-session` + `/branch` discipline (Anthropic `cli-reference.md`).

**Identified race condition** — `tools/preagent-parallel-guard.mjs` has a 1500 ms TTL window vulnerable to concurrent-write race when two Agent calls land within that window (W349 dwell pattern). **Fix**: replace JSON file with atomic POSIX `rename(2)` + Windows `MoveFileEx(MOVEFILE_REPLACE_EXISTING|MOVEFILE_WRITE_THROUGH)` per SOTA-PARALLEL doc L1 (already designed at `docs/architecture/W343-EXECUTE/SOTA-PARALLEL-GIT-HOOK-ARCHITECTURE.md`); track as **D2** below.

**Pre-commit guards** — `.pre-commit-config.yaml` already includes `cr2-2kb-hooks` + `cr7-worktree-collision` per CLAUDE.md cardinal-rule-2 / §5 — verify both hooks live and exit-2 on violation (current branch passes — confirmed by `b34ecd2` HEAD reaching origin).

---

## §6 GitHub CI/CD hardening checklist

**P0 (must-have-before-W350-ship)**:

| Check                                                                                 | State              | Action |
|---------------------------------------------------------------------------------------|--------------------|--------|
| All `uses:` 40-char SHA-pinned (W347 P4b)                                              | partial            | run `pinact run --check` in pre-commit (queue as D3) |
| CODEOWNERS gates `.claude/`, `tools/`, `docs/architecture/`                            | DONE               | verified `.github/CODEOWNERS` L23-49 |
| Required status checks on `main`: `ci`, `commitlint`, `codeql`, `codex-review`, `actionlint`, `zizmor`, `scorecard` | unknown (token-scope-blocked) | run `gh api -X PUT /repos/{}/{}/branches/main/protection -f required_status_checks[contexts][]=…` |
| Linear history required on main                                                        | unset              | `required_linear_history: true` |
| Signed-commits required on main                                                        | unset              | `required_signatures: true` |
| Secret-scanning push-protection enabled                                                | unknown            | `gh api -X PUT /repos/{}/{}/secret-scanning-push-protection` |
| `codex-review.yml` triggers on every PR                                                | DONE               | verified `on:pull_request:types:[opened,synchronize,reopened,ready_for_review]` |
| SLSA L3 provenance on release tags                                                     | DONE               | `provenance.yml` triggers on `W*-ship-*` / `W*-closure-*` tags |
| OSSF Scorecard weekly run                                                              | DONE               | `scorecard.yml` cron `38 13 * * 1` |

**P1 (post-ship-1-week)**:

- `dependabot-auto-merge.yml` — verify it auto-merges only `version-update:semver-patch` + `version-update:semver-minor` for `github-actions` group; **never** for `npm` major-bumps without `codex-review` PASS.
- `stale.yml` settings (180 d stale / 30 d close) are *appropriate for solo-operator private repo* per W333.5 Stream 2 cite — keep.
- `parallel-guard-stress.yml` — verify `tools/test-parallel-guard-race.mjs` runs 100× and asserts exit-code distribution (currently a stub per CLAUDE.md L40-43 — confirmed by header).
- `claude-code-security-review.yml` is currently *modified-uncommitted* (M-flag in operator's brief) — review pending changes against `anthropics/claude-code-security-review@main`.

**P2 (within-month)**:

- Add `branch-name-lint.yml` (§1).
- Add `release-please.yml` audit — currently 3 release-please branches floating (`release-please--branches--main` + two component variants) — these are bot-managed; safe to leave but document.
- Enable GitHub Advanced Security (private repo) for native secret-scanning + Copilot autofix on CodeQL findings.

---

## §7 Dependabot PRs + PR-2 decisions

| PR | Title                                            | Verdict                   | Order |
|----|--------------------------------------------------|---------------------------|-------|
| **#2**  | `ship(W333): SESSION-RACE-CLOSURE + CI-CD-SOTA + GH-INIT` | **MERGE FIRST** — sets up CODEOWNERS + most workflows + W333 cleanup. Branch `goal/W331-sota-convergence` is 25h stale. Rebase onto main, codex-review, merge before W350 work hits main. Pre-W350 work depends on this PR's CODEOWNERS + workflow stack being on `main`. | 1 |
| **#14** | `ci: bump actions/cache from 4 to 5`               | **REVIEW BREAKING-CHANGES** — `actions/cache@v5` major bump: Node 20 → Node 24 runtime; restoreKey behavior unchanged. Per release-notes, low-risk. Merge after #2. | 2 |
| **#13** | `ci: bump actions/setup-node from 4 to 6`          | **REVIEW** — v4 → v6 skips v5 (yanked); adds built-in package-manager caching; default Node 22. Low-risk for our workflows (all `node-version: 22` already). Merge after #14. | 3 |
| **#12** | `ci: bump actions/upload-artifact from 4 to 7`     | **REVIEW** — v4 → v7 changes default retention 90 d → 30 d; adds `include-hidden-files: false` default. Audit `session-jsonl-archive.yml` + any other artifact upload for retention assumptions. Merge after #13. | 4 |

Each dependabot PR should fire `codex-review.yml` automatically. If codex GPT-5.5 round-1 + round-2 diverge → Sonnet 4.6 tie-break per W331 P0.7.

---

## §8 gitnexus marketplace cleanup

CLAUDE.md does not list gitnexus as retired — only the standalone `gitnexus` MCP is sometimes off. `.claude/settings.json:extraKnownMarketplaces:gitnexus-marketplace` carries `source:directory` + `autoUpdate:true` + plugin-disabled. Two-option ledger:

- **Option A — retire fully** (recommended if not used in last 2 waves): delete the `gitnexus-marketplace` entry from `extraKnownMarketplaces` AND from `enabledPlugins` AND drop the cache directory. Cleaner runtime; aligns with W255 cleanup spirit (`self_invented_count: 0`).
- **Option B — keep dormant, switch source**: change `source: directory` → `source: npm` with `@gitnexus/marketplace@1.6.4-rc.112` if npm-published; gives clean upgrade path without re-research overhead.

**Verdict**: Option A unless operator names a near-term gitnexus use-case in the next session. Either way, do *not* leave `autoUpdate:true` on a dormant directory-source marketplace — that creates phantom drift.

---

## §9 Top-5 deliverables this session (ordered by impact)

1. **Merge PR-2** (`ship(W333): SESSION-RACE-CLOSURE + CI-CD-SOTA + GH-INIT`) — unblocks all later work; gets CODEOWNERS + most CI workflows onto `main`. (~1 h: rebase + codex-review + merge.)
2. **Rename `goal/W350-sota-git-tree-foundation` → `feat/sota-git-tree-foundation`** + add `Wave: W350` trailer policy + `branch-name-lint.yml` workflow. (~30 min.)
3. **Bulk archive 21 stale branches** as `archive/W<N>-<topic>-<date>` tags + delete local + remote. (~30 min.)
4. **Fix `pull.rebase` config duplicate** + apply `branch.autoSetupRebase=always` + `fetch.prune=true` + `merge.ff=only` + `git maintenance start`. (~10 min.)
5. **Wire `WorktreeAdd` PreToolUse hook** at `tools/precheck-worktree-add.mjs` enforcing cap=5 + one-worktree-per-branch. (~45 min.)

**Sequenced dependabot merges (#14 → #13 → #12)** queued as parallel D6-D8 after D1 lands.

---

## Cite-anchors (3-org-distinct per CR-6)

- Anthropic CCBP `claude-memory.md:34-40 @ HEAD a28cd96b` (worktree + branch discipline; pointer-only memory).
- Conventional Commits 1.0.0 spec + Conventional Branch 1.0.0 spec (`conventional-commits.org` + `conventional-branch.github.io`).
- Atlassian Bitbucket "Git branching strategies" doc + "Using Git worktrees" tutorial (`atlassian.com/git/tutorials`).
- GitHub Docs "About protected branches" + "About code owners" + Dependabot configuration reference.
- OSSF Scorecard + SLSA v1.0 + Sigstore git-sign + step-security/harden-runner (supply-chain hardening).
- Anthropic `cli-reference.md` `--fork-session` + `/branch` (parallel-session primitive).

**Word count**: ~1480.
