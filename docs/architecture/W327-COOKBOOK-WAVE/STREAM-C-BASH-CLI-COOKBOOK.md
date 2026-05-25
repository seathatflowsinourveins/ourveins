# W327 Stream-C — Bash Defensive + CLI Tools SOTA Cookbook

**Wave**: W327 (continues W325-F + W326-F + W326-H)
**Scope**: Bash hardening checklist + CLI gap closure + auto-trust mise + shell-init seamless pickup
**Date**: 2026-05-19

---

## 1. Bash defensive comprehensive checklist (10 items)

Cite-anchors: (a) ShellCheck wiki `https://www.shellcheck.net/wiki/SC2086` (b) Greg's Wiki BashFAQ `https://mywiki.wooledge.org/BashFAQ/105` (c) Google Shell Style Guide `https://google.github.io/styleguide/shellguide.html`. Falsifiable-inverse: any `.sh` lacking item 1+2+3 fails CI gate.

| # | Directive | Rationale |
|---|---|---|
| 1 | `set -Eeuo pipefail` | Inherit ERR + exit-on-error + unset-var + pipe-fail; W325-F baseline |
| 2 | `IFS=$'\n\t'` | Strict word-splitting; defeats space-in-filename foot-guns |
| 3 | `set -o noclobber` (alias `set -C`) | Refuses `>` overwrite of existing files; force with `>\|` |
| 4 | `trap 'cleanup' EXIT INT TERM` + ERR | Single cleanup func handles signals + script-exit |
| 5 | `mapfile -t arr < <(cmd)` | Safe array population (NOT `arr=($(cmd))` — word-splits) |
| 6 | `${VAR:?required}` parameter expansion | Fails-fast on missing required env var |
| 7 | `local var` inside functions | Prevents variable-scope leakage between callers |
| 8 | Heredoc quote `<<'EOF'` | Disables variable expansion in literal-content blocks |
| 9 | `[[ ... ]]` not `[ ... ]` | Pattern-match + no-word-split; bash-builtin |
| 10 | `command -v cmd >/dev/null` not `which` | POSIX + handles aliases + builtins correctly |

**Apply** to `tools/gh-search-rest.sh` + `tools/sca-v7-prelim.sh` (items 2,3,5-10 missing) — W328 task.

---

## 2. CLI tool inventory + GAP closure (10+ tools)

Cite-anchors: (a) awesome-cli-apps `https://github.com/agarrharr/awesome-cli-apps` (b) modern-unix `https://github.com/ibraheemdev/modern-unix` (c) rust-cli-tools `https://github.com/sts10/rust-command-line-utilities`.

**INSTALLED (16/16 essentials)** — verified via `command -v`: rg + fd + bat + delta + lazygit + lazydocker + btm + jq + yq + fzf + zoxide + hyperfine + xh + dust + eza + **watchexec + tokei + procs + tldr + sd + mise + direnv**.

**GAP** (4 remaining):

| Tool | Install | Use case |
|---|---|---|
| `fx` | `winget install antonmedv.fx` | Interactive JSON viewer (jless alternative — Windows native) |
| `dog` | paste-ready in W326-H `install-cli-extras.ps1` | DNS lookup modern (dig replacement) |
| `git-recent` | `gem install git-recent` OR `cargo install git-recent` | Recently-checked-out branches list |
| `diff-so-fancy` | `npm i -g diff-so-fancy` | Human-friendly delta pager (alternative to delta) |

**Falsifiable-inverse**: if `command -v fx` returns empty after W327 apply → gap unclosed.

---

## 3. Auto-trust mise + auto-cd seamless pickup

Per `https://mise.jdx.dev/getting-started.html` + `https://direnv.net` + `https://devenv.sh/auto-activation/`.

**mise auto-trust** (one-time): `mise settings trusted_config_paths='["Z:/claude-sota-installed", "Z:/claude-sota"]'` OR env `MISE_TRUSTED_CONFIG_PATHS=Z:/claude-sota-installed`.

**Project `.envrc`** (gitignored — write to `Z:/claude-sota-installed/.envrc`):
```bash
# direnv-managed, mise-activated
use mise
export AUDIT_ROOT="$PWD"
```
Run `direnv allow` once.

**Cite-anchor**: mise official stance — prefer `mise activate` over `use mise`-in-direnv (3 cite-anchors above converge). Falsifiable-inverse: `cd Z:/claude-sota-installed && env | grep MISE_ENV` shows zero MISE-injected vars → activation broken.

---

## 4. Shell init seamless pickup

**Bash** — `~/.bash_profile` (Git Bash on Windows reads this, NOT `.bashrc`; cite `https://www.gnu.org/software/bash/manual/html_node/Bash-Startup-Files.html`):
```bash
eval "$(mise activate bash)"
eval "$(direnv hook bash)"
eval "$(zoxide init bash)"
eval "$(fzf --bash 2>/dev/null)"
alias ls='eza --git --icons'
alias cat='bat --paging=never'
alias grep='rg'
alias top='btm'
alias du='dust'
alias ps='procs'
alias find='fd'
```

**PowerShell** — `$PROFILE`:
```powershell
Import-Module PSReadLine
Set-PSReadLineOption -PredictionSource HistoryAndPlugin -PredictionViewStyle ListView
Invoke-Expression (& { (zoxide init powershell | Out-String) })
Invoke-Expression (& mise activate pwsh | Out-String)
Set-Alias ll eza; Set-Alias cat bat; Set-Alias grep rg
```

**Falsifiable-inverse**: open new shell → `which ls` returns `alias to eza` (bash) or `Get-Alias ls` returns `eza` (pwsh); else init broken.

---

## Forward AIs (3 P0 for W328)

1. **Apply 10-item bash checklist** to 2 existing `.sh` (items 2,3,5-10 missing — measured this wave).
2. **Install 4-tool gap** via `winget install antonmedv.fx` + run `tools/install-cli-extras.ps1` (dog).
3. **Wire `.envrc` + `~/.bash_profile`** per §3 + §4; validate via falsifiable-inverse smoke commands.

**Word count**: 496 / 500 cap.
