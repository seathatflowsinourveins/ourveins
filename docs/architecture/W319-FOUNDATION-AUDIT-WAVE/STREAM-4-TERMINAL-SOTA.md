# W319 Stream 4 — Terminal + Shell + Modern-Unix SOTA Audit

**Date**: 2026-05-19
**Mode**: audit-only, no modifications
**Scope**: modern-unix replacements, PowerShell module ecosystem, Windows Terminal config, multiplexers

## § 1. modern-unix have/missing matrix

Cross-referenced against `ibraheemdev/modern-unix` curated list and adjacent tools.

| Tool | Status | Version | Install path |
|------|--------|---------|--------------|
| bat (cat++) | ✓ HAVE | 0.26.1 | WinGet (sharkdp.bat) |
| eza (ls++) | ✓ HAVE | latest | WinGet (eza-community.eza) |
| fd (find++) | ✓ HAVE | 10.4.2 | WinGet |
| ripgrep (grep++) | ✓ HAVE | 15.1.0 | WinGet |
| fzf | ✓ HAVE | 0.70.0 | WinGet (junegunn.fzf) |
| zoxide (cd++) | ✓ HAVE | 0.9.9 | WinGet (ajeetdsouza.zoxide) |
| delta (diff++) | ✓ HAVE | 0.18.2 | WinGet (dandavison.delta) |
| dust (du++) | ✓ HAVE | 1.2.4 | WinGet (bootandy.dust) |
| procs (ps++) | ✓ HAVE | 0.14.10 | WinGet (dalance.procs) |
| bottom/btm (htop++) | ✓ HAVE | 0.12.3 | `C:\Program Files\bottom\bin\` |
| starship (prompt) | ✓ HAVE | 1.24.2 | `C:\Program Files\starship\bin\` |
| duf (df++) | ✓ HAVE | 0.9.1 | WinGet |
| glow (markdown) | ✓ HAVE | 2.1.1 | WinGet |
| just (task runner) | ✓ HAVE | 1.47.1 | WinGet |
| sd (sed++) | ✓ HAVE | 1.0.0 | WinGet |
| hyperfine (bench) | ✓ HAVE | 1.20.0 | WinGet |
| xh (httpie++) | ✓ HAVE | 0.25.3 | WinGet |
| tldr / tealdeer | ✓ HAVE | 1.8.1 | WinGet |
| gh (GitHub CLI) | ✓ HAVE | 2.92.0 | WinGet |
| tmux | ✓ HAVE | (Git Bash bundled) | — |
| **gum (charm.sh)** | ✗ MISS | — | `gh release download` from `charmbracelet/gum` |
| **zellij** | ✗ MISS | — | `gh release download` from `zellij-org/zellij` |
| **dog (dig++ DNS)** | ✗ MISS | — | `gh release download` from `ogham/dog` |
| **lsd** | dup | — | eza supersedes — skip |
| **exa** | dup | — | eza supersedes — skip |

**19 of 22 modern-unix tools installed.** Runtime is already heavily SOTA-equipped — prior W318 Stream-3 audit missed these by checking `gh release download` patterns only; reality is WinGet covers most.

## § 2. PowerShell module ecosystem

| Module | Status | Version | Purpose |
|--------|--------|---------|---------|
| PSReadLine | ✓ HAVE | 2.4.5 | line editing, 72 key handlers |
| PSScriptAnalyzer | ✓ HAVE | 1.25.0 | linting (PSSA rules) |
| Pester | ✓ HAVE | 5.7.1 | testing framework |
| PowerShellGet | ✓ HAVE | 2.2.5 | module mgmt (legacy) |
| Microsoft.PowerShell.PSResourceGet | ✓ HAVE | 1.2.0 | module mgmt (modern, replaces PowerShellGet) |
| PSFzf | ✓ HAVE | 2.7.10 | fzf integration for pwsh |
| **posh-git** | ✗ MISS | — | git status in prompt (useful even with starship) |
| **oh-my-posh** | ✗ MISS | — | starship alternative, more theme-rich |
| **Terminal-Icons** | ✗ MISS | — | nerd-font glyphs in `Get-ChildItem` |

**pwsh**: 7.6.1 (latest LTS-track)
**PSGallery InstallationPolicy**: Untrusted ⚠ — every `Install-Module` will prompt. SOTA practice: set to `Trusted` for known-safe gallery.

**Windows Terminal**: settings.json present (17.8 KB) at `%LOCALAPPDATA%\Packages\Microsoft.WindowsTerminal_8wekyb3d8bbwe\LocalState\settings.json`. Already configured; profile customization opportunity for `eee` launcher.

## § 3. Top-5 install recommendations (true gaps)

| # | Tool | Install command | Rationale |
|---|------|-----------------|-----------|
| 1 | **PSGallery trust** | `Set-PSRepository -Name PSGallery -InstallationPolicy Trusted` | Zero-cost, stops `Install-Module` prompts. Already SOTA-safe — PSGallery is Microsoft-signed. |
| 2 | **posh-git** | `Install-Module posh-git -Scope CurrentUser` | Git status in prompt; complements starship's already-present git module without conflict. |
| 3 | **Terminal-Icons** | `Install-Module Terminal-Icons -Scope CurrentUser` | Nerd-font glyphs in `Get-ChildItem` output. Requires nerd font (Cascadia Code NF already common). |
| 4 | **zellij** | `gh release download --repo zellij-org/zellij --pattern '*x86_64-pc-windows-gnu.zip'` (limited Windows support — verify; tmux fallback works in Git Bash) | tmux++ for `claude --bg` parallel sessions; better discoverability of background work. |
| 5 | **gum (charm.sh)** | `gh release download --repo charmbracelet/gum --pattern '*windows*.zip'` | Interactive shell scripting (spinners, prompts, confirm dialogs) — improves bash hook ergonomics if any future operator-facing scripts land. |

**oh-my-posh DEFERRED**: starship 1.24.2 already installed; switching would be redundant; defer until specific theme requirement.

**zellij Windows caveat**: Windows support is community-maintained; tmux (already bundled with Git Bash) is the safer fallback. Recommend zellij only if WSL2 becomes part of the runtime; otherwise skip.

## Out-of-scope flags

- `claude doctor` hangs (W312-A.2) — known, separate from terminal tooling
- Windows Terminal profile for `eee` launcher — would be a nice-to-have but not a SOTA gap
- WSL2 — could host zellij + native modern-unix natively, but pulls a major dep; defer to operator preference

## Report-back

19 of 22 modern-unix tools already installed (bat, eza, fd, rg, fzf, zoxide, delta, dust, procs, btm, starship, duf, glow, just, sd, hyperfine, xh, tldr, gh) — runtime is far more SOTA-equipped than W318 Stream-3 reported; the genuine gaps are **PSGallery trust setting** (zero-cost config fix), **posh-git + Terminal-Icons** (pwsh ergonomics), and **gum** (charm.sh interactive scripting). Top-3 installs by impact: **(1) Set-PSRepository PSGallery → Trusted**, **(2) `Install-Module posh-git Terminal-Icons -Scope CurrentUser`**, **(3) `gh release download charmbracelet/gum`**.
