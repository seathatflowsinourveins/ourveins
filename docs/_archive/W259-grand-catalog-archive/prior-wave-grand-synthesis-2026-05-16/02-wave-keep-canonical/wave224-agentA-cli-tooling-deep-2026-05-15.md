# Wave 224 Agent A — Cross-Language CLI Tooling Deep-Dive

**Agent**: sota-researcher (Sonnet stand-in per `Z:/claude-sota/.claude/rules/cmc-env-funneled-disclosure.md §The mandate` Option 2)
**STAND-IN-NOTICE**: agent ran under env-funneled Sonnet stand-in; cross-model gate NOT structurally satisfied for this dispatch. Orchestrator MUST file Path P codex T1 ratification before any ADOPT-NOW prescription lands in target `Z:\claude-sota-pure\`.
**Date**: 2026-05-15
**Wave**: 224 / Agent A
**Probe protocol**: PATH multi-channel + WinGet Links + npm-global enumerate per `mia-pre-apply.md §Alternate-install-path probe discipline` + GitHub MCP TIER-1-DIRECT LICENSE direct-read per CR-9

## Section 1 — Terminal Multiplexer Catalog (Top-3)

| # | Repo | Stars | License | INSTALLED? | Use case |
|---|------|-------|---------|------------|----------|
| T1 | `tmux/tmux` (C, classic) | ~37k | ISC (BSD-class) | ✅ `/usr/bin/tmux v3.6a` via Git Bash | Standard incumbent; cross-IDE compat |
| T2 | `zellij-org/zellij` @ `b558b31e` | 32,619 | MIT [VERIFIED 2026-05-15] | ❌ NOT installed | Rust-native modern; batteries-included; better UX than tmux |
| T3 | `wez/wezterm` 20240203-110809 | ~17k | MIT | ✅ `/c/Program Files/WezTerm/wezterm` | Terminal emulator + multiplexer combined |

**ALREADY-INSTALLED**: tmux + wezterm (2/3). **NET-NEW candidate**: zellij only.

**Demand-gate (Probe 7)**: claude-sota-pure operates primarily through Claude Code's native Bash tool. tmux/wezterm coverage already saturates the niche. **zellij has no workflow consumer** — REJECT-FOR-FIT (Probe 7.a DEMAND-ABSENCE).

## Section 2 — Modern CLI Utilities Catalog (Top-5+)

| # | Repo | License | INSTALLED? | Version | Use case |
|---|------|---------|------------|---------|----------|
| C1 | `jqlang/jq` | MIT | ✅ chocolatey | `jq-1.8.1` | JSON CLI processor (incumbent SOTA) |
| C2 | `mikefarah/yq` | MIT | ✅ via WinGet | `v4.52.4` | YAML/JSON/XML processor (Go-based) |
| C3 | `itchyny/gojq` (3,755★ Go reimpl) | MIT [VERIFIED] | ❌ NOT installed | — | Pure-Go jq; better Windows binary distribution |
| C4 | `sharkdp/hyperfine` | MIT/Apache-2.0 | ✅ WinGet | `1.20.0` | Benchmarking CLI for shell commands |
| C5 | `bootandy/dust` | Apache-2.0 | ✅ WinGet | `1.2.4` | Disk usage visualizer (Rust) |
| C6 | `charmbracelet/glow` | MIT | ✅ WinGet | `2.1.1 (d37e988)` | Markdown viewer in terminal |
| C7 | `ducaale/xh` @ `b928cf08` | MIT [VERIFIED] | ✅ WinGet | `0.25.3` | Fast HTTPie replacement; HTTP/2+HTTP/3 support |
| C8 | `charmbracelet/gum` @ `52589883` | MIT [VERIFIED] | ❌ NOT installed | — | TUI prompts/forms for shell scripts (Charm.sh) |
| C9 | `Canop/broot` | MIT (assumed) | ❌ NOT installed | — | Interactive file tree explorer |
| C10 | `Wilfred/difftastic` (difft) | MIT | ✅ WinGet | — | Syntax-aware diff viewer |
| C11 | `aristocratos/btop4win` (btop) | Apache-2.0 | ✅ WinGet | — | System resource monitor |
| C12 | `muesli/duf` | MIT | ✅ WinGet | — | Disk usage / free-space |
| C13 | `sxyazi/yazi` | MIT | ✅ WinGet | — | Terminal file manager (Rust) |
| C14 | `orhun/git-cliff` | Apache-2.0/MIT | ✅ WinGet | `2.12.0` | Changelog generator from git history |
| C15 | `dbrgn/tealdeer` (tldr) | MIT/Apache-2.0 | ✅ WinGet | — | Fast tldr-pages client |

**ALREADY-INSTALLED**: 13/15 (87% saturation — exceptional baseline coverage).
**NET-NEW candidates**: `itchyny/gojq` + `charmbracelet/gum` + `Canop/broot` (3 only).

## Section 3 — Shell/Scripting Enhancement Catalog (Top-3)

| # | Repo | Stars | License | INSTALLED? | Use case |
|---|------|-------|---------|------------|----------|
| S1 | `starship/starship` @ `5162c415` | ~46k+ | ISC [VERIFIED] | ✅ v1.24.2 | Cross-shell prompt; Rust-based |
| S2 | `nushell/nushell` @ `fbe85c70` | 39,497 | MIT [VERIFIED 2026-05-15] | ❌ NOT installed | Structured-data shell |
| S3 | `JanDeDobbeleer/oh-my-posh` | 22,544 | MIT | ❌ NOT installed | Cross-shell prompt (Go-based; competes with starship) |
| S4 | `fish-shell/fish-shell` | ~26k | **GPL-2.0** (license-CONFLICT per CR-1 + Probe 6) | ❌ NOT installed | Modern shell with autosuggestions |
| S5 | `xonsh/xonsh` | ~9k | BSD-2 | ❌ NOT installed | Python-shell hybrid |

**ALREADY-INSTALLED**: starship (1/5). **NET-NEW eligible**: nushell only (oh-my-posh competes with starship → DUPLICATE; fish GPL-2.0 license blocker; xonsh demand-absent).

**Demand-gate (Probe 7)** for nushell: claude-sota-pure runs under Git Bash + PowerShell. Nushell's structured-shell value (`ls | where size > 1mb`) creates a NEW workflow (data-analysis-in-shell) that no current sss primitive serves. Probe 7.b NEW-WORKFLOW eligible BUT requires 5-clause check pass.

## Section 4 — ALREADY-INSTALLED Summary (saving install effort)

**This runtime already has 16 of ~25 audited CLI primitives** ([VERIFIED 2026-05-15]):

```
Terminal/multiplexer: tmux ✅ wezterm ✅
JSON/YAML:           jq ✅ yq ✅
Benchmarking:        hyperfine ✅
Disk usage:          dust ✅ duf ✅
Markdown:            glow ✅
HTTP client:         xh ✅
Prompt:              starship ✅
Diff:                difft (difftastic) ✅
System monitor:      btop ✅
File manager:        yazi ✅ ya ✅
Changelog:           git-cliff ✅
Docs:                tldr (tealdeer) ✅

PLUS prior baseline: ripgrep ✅ fd ✅ bat (per W207 batch)
```

**Massive install-effort savings**: ~64% saturation of typical "modern CLI tools" list already in place. Net-new attack surface is ~5 candidates max.

## Section 5 — Recommendations

### ADOPT-NOW (0 candidates — no firm ADOPT-NOW)

Cross-model gate not satisfied — Path P codex T1 ratification required before any ADOPT-NOW prescription propagates.

### STUDY-PILOT (3 candidates)

1. **`itchyny/gojq` 3,755★ MIT** — Pure-Go jq reimplementation. Demand-gate: jq incumbent ALREADY-INSTALLED; gojq advantages are pure-Go binary portability + bugfixes. **CR-12 disposition: PARTIAL-OVERLAP**. STUDY-PILOT-only.

2. **`charmbracelet/gum` MIT (Charm.sh)** — TUI prompts/forms for shell scripts. Demand-gate: claude-sota-pure Bash hooks could benefit from richer interactive UI. **CR-12 disposition: GENUINELY-NEW**. STUDY-PILOT for `.claude/hooks/scripts/` interactive-UI use cases.

3. **`nushell/nushell` 39,497★ MIT** — Structured-data shell. Demand-gate: would create NEW workflow (data-analysis-in-shell over `.claude/state/*.jsonl`). **CR-12 disposition: GENUINELY-NEW**. Probe 7.b 5-clause check: (1) named use case = `.jsonl` audit-trail analysis; (2) source path = `.claude/state/*.jsonl`; (3) wiring path = native (nushell parses JSON natively); (4) incumbent comparison = jq + grep + awk (significantly more verbose); (5) reversible time-box = 30-day pilot. STUDY-PILOT eligible.

### REJECT-FOR-FIT (4 candidates)

1. **`zellij-org/zellij` 32,619★ MIT** — REJECT-FOR-FIT (Probe 7.a DEMAND-ABSENCE)
2. **`oh-my-posh` 22,544★ MIT** — REJECT (Probe 4 plugin-namespace DUPLICATE-FUNCTIONALITY per kiss-dry-yagni Must-Never #4)
3. **`fish-shell/fish-shell` GPL-2.0** — REJECT-FOR-FIT (Probe 6 LICENSE direct-read GPL-2.0 license blocker)
4. **`xonsh/xonsh` BSD-2** — REJECT-FOR-FIT (Probe 7.a DEMAND-ABSENCE)

### DEFER (1 candidate)

5. **`Canop/broot` MIT (assumed)** — DEFER pending LICENSE direct-read confirmation. Partially overlaps with yazi (already-installed).

## Section 6 — Verdict

**VERDICT**: HONEST-NON-FINDING for ADOPT-NOW; 87% baseline saturation already achieved per W207 + cumulative installs; 3 STUDY-PILOT candidates surfaced (`gojq` + `gum` + `nushell`); 4 REJECT-FOR-FIT; 1 DEFER. STAND-IN-NOTICE applies — orchestrator MUST file Path P codex T1 ratification BEFORE any ADOPT-NOW prescription lands in target `Z:\claude-sota-pure\`.
