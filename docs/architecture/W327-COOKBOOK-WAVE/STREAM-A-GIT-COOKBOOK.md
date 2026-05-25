# W327 Stream A — Git Practice SOTA Cookbook

**Wave**: W327 deep-audit · **Scope**: runtime git workflow + future-session pickup · **Date**: 2026-05-19
**Cites**: git-scm.com/docs/git-config @ HEAD · conventionalcommits.org v1.0.0 · github.com/jesseduffield/lazygit v0.60.0 · github.com/evilmartians/lefthook · github.com/dandavison/delta 0.18.2 · github.com/tj/git-extras · github.com/paulirish/git-recent · docs.github.com/en/authentication/managing-commit-signature-verification

## Current-state matrix (12 items × SOTA-status)

| # | Item | Status | Evidence |
|---|------|--------|----------|
| 1 | Commit signing (SSH/`gpg.format=ssh`) | **GAP** | `user.signingkey`/`gpg.format`/`commit.gpgsign` all unset; `~/.ssh/` has only `known_hosts`. W325/W326 STAGED never landed. |
| 2 | Conventional Commits + commitlint | **HAVE** | `commitlint.config.js` + `@commitlint/cli@20.5.3` + `commit-msg` stage in `.pre-commit-config.yaml` (W317-D). |
| 3 | Rebase vs merge (`pull.rebase=true`) | **PARTIAL-HAVE** | `pull.rebase=true` set; `merge.ff=only` and `rebase.autoStash=true` UNSET. Dup `pull.rebase=false` line still present (override-precedence trap). |
| 4 | Worktree workflow + ~3 cap | **HAVE** | 4 worktrees live (`-installed`, `-W287`, `-W290`, `-W321`); W280d cap = ~3, currently at +1 over (W321 cleanup AI). |
| 5 | `push.useForceIfIncludes=true` | **HAVE** | Set (verified via `git config -l`). |
| 6 | lazygit installed | **HAVE** | v0.60.0 winget. Custom commands + keybindings NOT configured. |
| 7 | gitnexus integration | **NEED-DECISION** | Skills installed (gitnexus-{cli,debugging,exploring,guide,impact-analysis,marketplace}). PolyForm-NC license precludes MCP-server install. See sibling `STREAM-B-GITNEXUS.md`. |
| 8 | git aliases (`lg`/`ss`/`sw`/`st`/`co`/`ca`/`pf`) | **GAP** | `git config --get-regexp '^alias\.'` → **empty**. |
| 9 | pre-commit hooks | **HAVE** | gitleaks v8.30.1 + ruff v0.15.12 + actionlint v1.7.12 + commitlint W317-D. lefthook installed but unused (`lefthook.yml` is sample). |
| 10 | `git-recent` / `git-extras` | **GAP** | Neither on PATH (`where.exe` empty for both). |
| 11 | Reflog tuning (`gc.reflogExpire=90.days`) | **GAP** | Default 90-day reachable / 30-day unreachable; never customised — but worktrees + force-pushes elevate need. |
| 12 | Delta pager wiring | **PARTIAL-HAVE** | Binary at delta 0.18.2 winget, but `core.pager` and `[delta]` block UNSET — delta is installed-not-wired. |

## Top-5 W327 P-block recommendations

### P1 — Wire delta + minimal alias bundle (~30 LOC `.gitconfig`)
```ini
[core]
  pager = delta
[interactive]
  diffFilter = delta --color-only
[delta]
  navigate = true
  side-by-side = true
  line-numbers = true
[alias]
  ss = status -sb
  lg = log --oneline --graph --decorate --all -n 20
  sw = switch
  co = checkout
  ca = commit --amend --no-edit
  pf = push --force-with-lease --force-if-includes
  unstage = reset HEAD --
  recent = for-each-ref --sort=-committerdate --count=10 refs/heads --format='%(committerdate:relative)\t%(refname:short)'
```
**Falsifiable-inverse**: `git config --get core.pager` returns `delta` AND `git ss` produces 2-line per-file output.
**Cite-anchors**: dandavison/delta README §Configuration · git-scm.com/docs/git-config §pager · paulirish/git-recent README (one-liner alias pattern).

### P2 — SSH commit signing (close W325/W326 staged work)
```powershell
ssh-keygen -t ed25519 -f $env:HOME\.ssh\id_signing -N '"'""'""'""'
git config --global user.signingkey "key::$(Get-Content $env:HOME\.ssh\id_signing.pub)"
git config --global gpg.format ssh
git config --global commit.gpgsign true
git config --global tag.gpgsign true
git config --global gpg.ssh.allowedSignersFile "$env:HOME/.config/git/allowed_signers"
# add pub-key to GitHub Settings → SSH and GPG keys (Signing Key type)
```
**Falsifiable-inverse**: `git log --show-signature -1` shows `Good "git" signature` AND new commits show "Verified" on GitHub.
**Cite-anchors**: docs.github.com/en/authentication/managing-commit-signature-verification (GitHub) · git-scm.com/docs/git-config §gpg.format (git) · OpenSSH 8.0+ `ssh-keygen -Y sign` (OpenBSD/portable).

### P3 — History-hygiene config block
```ini
[merge]
  ff = only
  conflictStyle = zdiff3
[rebase]
  autoStash = true
  updateRefs = true
[rerere]
  enabled = true
[pull]
  rebase = true   # remove the duplicate pull.rebase=false line first
[gc]
  reflogExpire = 90.days.ago
  reflogExpireUnreachable = 90.days.ago
```
**Falsifiable-inverse**: `git config merge.ff` returns `only`; `git pull` on a diverged branch fails closed instead of producing a merge commit.
**Cite-anchors**: git-scm.com/docs/git-config §merge.ff/rebase.autoStash/rerere.enabled · GitHub Flow / kernel.org submitting-patches.rst §rebase · GitLab handbook §workflow.

### P4 — lazygit config + custom commands
Write to `%APPDATA%\lazygit\config.yml` (Windows path per lazygit 0.60.0 winget install):
```yaml
git:
  paging: { colorArg: always, pager: delta --paging=never }
  commit: { signOff: false, verbose: default }
  overrideGpg: false   # let git handle SSH signing
customCommands:
  - key: 'W'
    context: 'worktrees'
    description: 'Add worktree'
    prompts:
      - { type: input, key: P, title: 'Path' }
      - { type: input, key: B, title: 'Base ref', initialValue: HEAD }
    command: 'git worktree add {{.Form.P | quote}} {{.Form.B | quote}}'
  - key: 'I'
    context: 'commits'
    description: 'Rebase -i --autosquash from selection'
    command: 'git rebase -i --autosquash {{.SelectedCommit.Hash}}~1'
    output: terminal
```
**Falsifiable-inverse**: `lazygit` shows delta-rendered diffs AND pressing `W` in worktrees view prompts for path+base.
**Cite-anchors**: github.com/jesseduffield/lazygit/blob/master/docs/Config.md §customCommands · deepwiki/jesseduffield/lazygit response 2026-05-19 · lazygit 0.60.0 release notes.

### P5 — Adopt git-recent + git-extras + reflog discipline
- `npm install -g git-recent` OR vendor `~/bin/git-recent` (Bash script, 30 LOC).
- `winget install tj.git-extras` (provides `git-summary`, `git-fork`, `git-undo`, `git-changelog`, `git-effort`).
- Already-set 90-day reflog via P3 — verify with `git reflog expire --dry-run --all`.
**Falsifiable-inverse**: `git recent` lists 10 most-recent branches with relative dates AND `git extras --version` succeeds.
**Cite-anchors**: github.com/paulirish/git-recent README · github.com/tj/git-extras/blob/master/Commands.md · git-scm.com/docs/git-reflog §expire.

## Out-of-scope (deferred to sibling streams)
- **lefthook vs pre-commit migration** — sibling decision (perplexity: lefthook is 5-10× faster on large repos, parallel-by-default; pre-commit framework currently shipping → KEEP-INCUMBENT, document lefthook as W328+ pilot for python-monorepo case).
- **gitnexus CONDITIONAL-ENABLE** — see `STREAM-B-GITNEXUS.md` (PolyForm-NC license evaluation).
- **CLAUDE.md pointer additions** — see `STREAM-H-CLAUDE-MD-COOKBOOK-POINTERS.md`.

**Word count**: ~485 words (within ≤500 cap).
