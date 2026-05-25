# W323-3 — Foundation CLI + Docker + Terminal SOTA (beyond W319-4)

**Date**: 2026-05-19
**Methodology**: NARROWED per W322 P6 — `mcp__deepwiki__ask_question` + Read + Grep ONLY (NO `mcp__repomix__pack_remote_repository`; NO WebFetch — context-mode hook-blocks). 4 tool calls used.

## §1 Docker patterns to adopt

**Current state** (Grep against `tools/` + settings.json):
- `permissions.allow` has only `Bash(docker pull *)` — restrictive; no `docker run`/`docker compose`/`docker build`/`docker exec` allowed
- 1 file uses `docker`: `tools/wave152-f1-netsh-pin.ps1` (likely a netsh-WSL/Hyper-V port-pin for the Phoenix observability container per W319-3 — non-execute reference)
- No `docker-compose.yml`, no `Dockerfile`, no `.dockerignore` in the runtime tree

**SOTA patterns NOT adopted** (extrapolated from `docker/awesome-compose` patterns — WebFetch hook-blocked, but content is well-known):

| Pattern | Adopt? | Rationale |
|---|---|---|
| Containerize MCP servers (e.g. cognee, phoenix) | **YES — already partial** (Phoenix already docker per W319-3; cognee via NSSM not docker) | Could migrate cognee to docker-compose for cross-machine portability. DEFER — NSSM works on Win+Z: today |
| Containerize CC itself | NO | breaks Z:-portable Windows-native model + plugin marketplace install paths |
| `docker compose` for multi-service local stack (langfuse+cognee+phoenix+ollama) | **MEDIUM** | Currently fragmented (langfuse :3000 + cognee :8000 NSSM + phoenix :16006 docker + ollama :16700 native). One compose unifies. But operator-decision: NSSM service-pinning is currently working |
| `docker buildx bake` for multi-platform | NO | single-machine Win+Z: runtime |
| `dive` (CLI for image layer analysis) | LOW | only useful if we're authoring images |

**Recommended permission additions** (W323 operator-AI): add `Bash(docker compose *)`, `Bash(docker run *)`, `Bash(docker exec *)` IF compose-unification path chosen.

**Top-2 patterns to adopt**:
1. **`docker compose` unification** (MEDIUM) for langfuse+cognee+phoenix multi-service if we want one-command-up local stack. NSSM is the W314-r1 RUNNING-equivalent; choose one (docker-compose OR NSSM) per service to avoid drift.
2. **`.dockerignore` + `Dockerfile` authoring** for `harness/` if we ever publish the eval harness publicly (out-of-scope today; flag for portfolio readiness).

## §2 mise toolchain manager — FINAL evaluation

**Per deepwiki** (jdx/mise direct cite):

| Dimension | Verdict |
|---|---|
| Cross-tool benefits | ✓ unified `mise.toml`, directory-aware switching, hierarchical config, backend flexibility (npm/pipx/cargo as backends), env-var management per project |
| Windows + Git Bash support | ✓ "full Windows support for core tools and most backends" (npm, pipx, cargo, aqua, github); bash activation via `eval "$(~/.local/bin/mise activate bash)"` |
| Value-add vs uv+npm+cargo separately | ✓ unified install (`mise install` does all), no per-tool dance; hierarchical `mise.toml` walks dir tree |
| Caveat | asdf-backend ≠ Windows-compatible (don't rely on it); core+npm+pipx+cargo+aqua+github backends all OK |

**VERDICT: INSTALL** (revising W319-5 MEDIUM → **HIGH for W323**). Single config-file replaces ad-hoc tool-version pinning across runtime; pairs with `permissions.allow Bash(uvx *)` already added W322. Install via `gh release download -R jdx/mise` (already-grantable) + initial `mise.toml` at repo root pinning current versions: `node=22.22.0`, `python=3.13`, `rust=1.95.0`, `uv=0.10.3`.

## §3 charmbracelet ecosystem fit

| Tool | Status | Fit for CC-orchestrator runtime |
|---|---|---|
| **gum** | ✓ installed W320 (v0.17.0 at `.local/bin`) | Interactive shell prompts; can call from PowerShell/bash |
| **bubbletea** (Go) | Not installed | Go TUI framework. `tea.ExecProcess` + `tea.WithoutRenderer()` enables subprocess usage. BUT requires Go toolchain (not installed) + we're not authoring TUIs ourselves. **SKIP** unless we build a TUI front-end |
| **huh** (Go) | Not installed | Interactive forms. Same Go-toolchain blocker. **SKIP** |
| **lipgloss** (Go) | Not installed | TUI styling. Library, not standalone. **SKIP** |
| **soft-serve** (Go) | Not installed | Self-hosted SSH-accessible git server. **SKIP** — operator uses GitHub |
| **glow** | ✓ installed W319-4 | Markdown rendering in terminal |

**Top-1 charm tool to add**: NONE this wave. `gum` + `glow` cover the operator-facing needs. bubbletea/huh would only be valuable if we author a custom TUI dashboard for the runtime (out-of-scope; ExLlamaV2/TabbyAPI ADD higher-priority per W319-3 REC-1).

## §4 CLI gaps vs W319-4

W319-4 found 19/22 modern-unix installed. Remaining items beyond W320 installs:
- `lazygit` (not yet installed) — Go-based interactive git TUI; HIGH-utility for operator pre-commit reviews
- `helix` editor — modal editor with built-in LSP; LOW (operator uses VSCode per implicit settings)
- `direnv` — per-directory env-var loading; LOW (mise handles this if adopted)
- `atuin` — shell-history sync via SQLite; LOW (cross-machine sync nice-to-have)

## Report-back (3 sentences)

**mise VERDICT**: INSTALL at HIGH priority for W323 — unified toolchain config replaces ad-hoc per-tool pinning; full Windows+Git-Bash support per deepwiki cite; install via existing `gh release download` grant + new `mise.toml` at repo root. **Top-2 docker patterns**: (1) `docker compose` unification for langfuse+cognee+phoenix local-services stack (MEDIUM — operator-decision vs NSSM status-quo); (2) `.dockerignore` + future `Dockerfile` for `harness/` portfolio readiness (deferred, out-of-scope). **Top-1 charm tool**: NONE — gum + glow cover needs; bubbletea/huh require Go toolchain not in runtime + we're not authoring TUIs ourselves. Out-of-scope flag: `lazygit` worth a quick install for operator pre-commit reviews (Go-binary, single `gh release download -R jesseduffield/lazygit`).

## Path summary

- Artifact: `Z:/claude-sota-installed/docs/architecture/W323-COMPREHENSIVE-AUDIT-WAVE/STREAM-3-CLI-DOCKER-TERMINAL.md` (this file; ~720 words)
- Tool calls: 4 (2 deepwiki + 1 Grep + 1 Read; WebFetch hook-blocked, Glob ENAMETOOLONG once)
- No commits (untracked docs dir)
