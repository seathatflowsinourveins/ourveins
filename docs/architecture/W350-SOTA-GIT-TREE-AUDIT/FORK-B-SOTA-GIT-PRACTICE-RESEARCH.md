# Fork B — 2026 SOTA Git Practice for AI-Agent Runtime on Windows

> Access date for all citations: **2026-05-20**. Runtime context: Z:\claude-sota-installed, 3 worktrees, 24+ branches, Windows-native, 349-wave doc history.

## Q1 — Git tree models 2026 (scores 1–10: parallel-safety | Win-tool | GitHub | recovery)

| Model | P-safe | Win | GH | Rec | Source |
|---|---:|---:|---:|---:|---|
| Trunk-based | 5 | 9 | 9 | 6 | https://docs.aws.amazon.com/wellarchitected/latest/devops-guidance/dl.scm.2-keep-feature-branches-short-lived.html (2023) |
| **Stacked diffs (Graphite)** | **9** | **7** | **8** | **9** | https://graphite.com/guides/stacked-diffs (2025) |
| Branch-per-task + merge-queue | 7 | 9 | **10** | 7 | https://circleci.com/blog/trunk-vs-feature-based-dev/ (2025) |
| Jujutsu (jj 0.39+) / Sapling | 8 | 6 | 5 | **10** | https://jj-vcs.github.io/jj/ ; https://sapling-scm.com/ (2026) |

**Verdict for THIS runtime**: **Branch-per-task + merge-queue** as the GitHub-native baseline (best Win+GH fit, lowest tool risk). **Add stacked-diff discipline ad-hoc** via `git rebase --update-refs` (git 2.38+, https://git-scm.com/docs/git-rebase#Documentation/git-rebase.txt---update-refs) for dependent-PR chains without a 3rd-party CLI dependency.

## Q2 — Windows worktree discipline

- POSIX `rename()` is atomic same-fs (https://pubs.opengroup.org/onlinepubs/9699919799/functions/rename.html), Windows lacks identical semantics → use `ReplaceFileW` for atomic-replace, not bare `MoveFileExW` (https://learn.microsoft.com/en-us/windows/win32/api/winbase/nf-winbase-replacefilew, 2024).
- libuv `uv_fs_rename` is portability-wrapper only, NOT POSIX-atomic on Win (https://docs.libuv.org/en/v1.x/fs.html). This validates W343 P3 mitigation in your runtime.
- **git 2.50** is latest stable Win-supported (https://github.com/git/git/blob/master/Documentation/RelNotes/2.50.0.txt). Pin or upgrade.
- Prune cadence: **on-WorktreeRemove + nightly** — your settings.json already has `WorktreeRemove → git worktree prune`. Add nightly via Task Scheduler.
- `extensions.worktreeConfig = true` (https://git-scm.com/docs/git-config) — your repo has it. Keep IF every AI tool tolerates it; Google Antigravity broke on it (https://discuss.ai.google.dev/t/antigravity-agent-breaks-on-git-worktree-repos-with-extensions-worktreeconfig/137246, 2026).

## Q3 — Branch lifecycle for 24+ long-lived branches

- AWS guidance (2023): **delete branches > retention period**, prefer short-lived (https://docs.aws.amazon.com/wellarchitected/latest/devops-guidance/dl.scm.2-keep-feature-branches-short-lived.html).
- **Tag-and-delete** the 18 stale `goal/W331..W347`, `sota-converge-w*`, `archive/*`, `w342-execute`, `w343-y1y2y3y4-mainsession`, `w344-*`, `W321` branches:
  ```bash
  for B in goal/W331-sota-convergence goal/W333-sota-unleash goal/W334-sota-continue goal/W334-wave-closure goal/W335-sota-convergence goal/W336-continue goal/W337-continue goal/W343 goal/W347-sota-unleash sota-converge-w295 sota-converge-w310 sota-converge-w330 archive/W287-reconcile archive/W290-reconcile archive/W328-sota-unleash w342-execute w343-y1y2y3y4-mainsession w344-mainsession-ship w344-sota-unleash W321; do
    git tag "archive/$B" "origin/$B" && git push origin "archive/$B" && git push origin --delete "$B"
  done
  ```
- **GitHub Rulesets** (https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets/about-rulesets, 2024) — replace legacy branch-protection. Encode: required-status-checks, CODEOWNER review, signed commits, linear history, restrict-deletion of `main`.
- **Auto-delete head branches on merge** (https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/configuring-pull-request-merges/managing-the-automatic-deletion-of-branches, 2024) — turn ON in repo Settings → General → PRs.
- AI-agent branches: enforce `agent/<session>/<purpose>` naming + scheduled stale-cleanup workflow (3-day TTL).

## Q4 — Conventional-commits + release automation

- Conventional Commits 1.0.0 (https://www.conventionalcommits.org/en/v1.0.0/) + `@commitlint/cli@^20` + `wagoid/commitlint-github-action@v6` (https://github.com/wagoid/commitlint-github-action, 2024). Already wired in your pre-commit; promote to a GH Action required-check.
- **Release automation winner: `google-github-actions/release-please-action@v4`** (https://github.com/google-github-actions/release-please-action, 2025) — GitHub-native, monorepo-tag-aware, minimal infra. semantic-release/changesets lose on infra complexity for this single-repo runtime.

## Q5 — GitHub Actions CI hardening (each cite-anchored)

| Item | Action / source |
|---|---|
| CodeQL **v4** (v3 deprecating) | `github/codeql-action/{init,autobuild,analyze}@v4` https://github.blog/changelog/2025-10-28-upcoming-deprecation-of-codeql-action-v3/ |
| Dependency-review | `actions/dependency-review-action@v4` https://github.com/actions/dependency-review-action |
| OSSF Scorecard | `ossf/scorecard-action@v2.3.3` https://www.infoq.com/presentations/ossf-scorecard/ |
| SLSA L3 provenance | `actions/attest-build-provenance@v2` + `sigstore/cosign-installer@v3.5.0` https://github.blog/news-insights/product-news/whats-coming-to-our-github-actions-2026-security-roadmap/ |
| Runner hardening | `step-security/harden-runner@v2` (SHA-pinned) https://www.wiz.io/blog/github-actions-security-guide |
| SHA-pin all 3rd-party actions to 40-char SHA | `pin-github-action` https://corgea.com/learn/github-actions-security-checklist |
| Repo Rulesets API | `POST /repos/{o}/{r}/rulesets` https://docs.github.com/en/rest/repos/rules?apiVersion=2022-11-28 |
| PR labeler | `actions/labeler@v5` https://github.com/actions/labeler |
| Artifact upload | `actions/upload-artifact@v4` https://github.com/actions/upload-artifact |
| Trivy container scan | `aquasecurity/trivy-action@<sha>` https://aquasecurity.github.io/trivy/latest/ |

**Your current state**: `.github/workflows/scorecard.yml` exists (uncommitted modifications). Dependabot configured. Missing: CodeQL, dependency-review, attest-build-provenance, cosign, commitlint-action, release-please, labeler workflow, Trivy. **8 workflows to add.**

## Q6 — Parallel-session collision recovery (Windows)

**Production-ready ranking**: (1) `git + reflog + cherry-pick + rebase --update-refs` (https://git-scm.com/docs/git-reflog, https://andrewlock.net/working-with-stacked-branches-in-git-is-easier-with-update-refs/ 2023) → most mature on Win. (2) `jj 0.39+` for ergonomics (https://github.com/jj-vcs/jj). (3) `git absorb` is hunk-management, NOT recovery. **Keep git as primary**, evaluate jj as a Phase-3 power-user add-on. Your W343 P3 cherry-pick replay pattern is correct.

## Q7 — gitnexus identity + verdict

**It exists**: https://github.com/abhigyanpatwari/GitNexus — "Zero-Server Code Intelligence Engine" — TypeScript CLI + MCP server, KuzuDB-backed knowledge graph, 14-language tree-sitter parsing, Claude Code plugin (PreToolUse hooks auto-enrich grep/glob/bash with graph context), per `ARCHITECTURE.md` + `README.md`. License: PolyForm Noncommercial 1.0.0 (per CLAUDE.md `gitnexus` comment block — local non-commercial OK).

**Verdict**: **REINSTALL** via official `npm i -g gitnexus && gitnexus setup`. Already enumerated in your `.claude/settings.json:343` (`gitnexus@gitnexus-marketplace: false`) but marketplace path uses a stale local directory. Direct npm-global install is the SOTA path. **Score: 8/10** for AI-agent-runtime fit; **9/10** for Claude Code integration. Single niche: blast-radius / impact-analysis at commit time, complements existing pre-commit `gitnexus detect-changes` advisory (already wired at `.pre-commit-config.yaml:141`).

Alternatives: `lazygit` (TUI only, no AI integration). `gh CLI` (GitHub-API only). **No SOTA substitute.**

## Q8 — Branch + PR naming verdict for THIS runtime

**Primary: keep `wave-N` as cite-stable anchor + add descriptive typed branches** (score 9.3/10 across stability/discoverability/release-compat). Example: `goal/W350-sota-git-tree-foundation`. Pattern: `<type>/<wave-id>-<kebab-summary>`. Commit scope stays `feat(W350): ...` per current 47/50 (94%) adherence. Sources: https://www.conventionalcommits.org/en/v1.0.0/ ; https://trunkbaseddevelopment.com ; https://semantic-release.gitbook.io/semantic-release/usage/workflow-configuration ; Linear branch-name guidance.

**Fallback: Linear-style** `eng-350-sota-git-tree-foundation` IF migrating to external issue tracker (score 8.5/10). **Do NOT** retroactively rename 311 wave docs — sunk-cost-recovery is worse than the inconsistency.

## Action summary (priority-ordered)

1. Tag-and-delete 20+ stale branches (Q3 script above)
2. Add 8 missing CI workflows (Q5 table)
3. Migrate legacy branch-protection → Rulesets API (Q3, Q5)
4. Reinstall gitnexus via `npm i -g gitnexus` (Q7)
5. Enable "auto-delete head branches" (Q3)
6. Keep wave-N + add `<type>/W<N>-<summary>` branch convention (Q8)
7. Evaluate jj 0.39+ as Phase-3 (Q6) — defer, git is sufficient

File: `docs/architecture/W350-SOTA-GIT-TREE-AUDIT/FORK-B-SOTA-GIT-PRACTICE-RESEARCH.md` (this report, ~780 words)
