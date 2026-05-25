---
title: Fleet Infra SOTA Audit — Wave 79 (post hooks/settings/configs waves)
status: AUTHORITATIVE
date: 2026-05-08
agent: orchestrator (auto mode, single-agent direct probe)
purpose: Identify infrastructure gaps in Z:/claude-sota-installed/ vs kits-convergence + Anthropic-official references; recommend SOTA-cited installs per cardinal-rule-6 (official native channels) + cardinal-rule-9 (version-pin) + cardinal-rule-12 (upstream-install over sibling-cite).
---

# Fleet Infrastructure SOTA Audit — 2026-05-08

## 1. CLI quality stack (kits-convergence Tier-1)

| Tool | Status | Installed Ver | Latest (verified upstream channel) | Install cmd | Kits cite | TIER |
|---|---|---|---|---|---|---|
| ripgrep (`rg`) | INSTALLED | 15.1.0 | latest @ BurntSushi/ripgrep (cargo or `winget install BurntSushi.ripgrep.MSVC`) | `cargo install ripgrep` OR winget | kits 6/8 | TIER-1-DIRECT |
| fd | INSTALLED | 10.4.2 | latest @ sharkdp/fd | `cargo install fd-find` OR `winget install sharkdp.fd` | kits 6/8 | TIER-1-DIRECT |
| jq | INSTALLED | 1.8.1 | latest @ jqlang/jq | `winget install jqlang.jq` | kits 7/8 | TIER-1-DIRECT |
| yq | INSTALLED | 4.52.4 | latest @ mikefarah/yq | `go install github.com/mikefarah/yq/v4@latest` | kits 5/8 | TIER-1-DIRECT |
| just | INSTALLED | 1.47.1 | latest @ casey/just | `cargo install just` OR winget | kits 5/8 | TIER-1-DIRECT |
| mise | INSTALLED | 2026.3.10 | @ jdx/mise | `cargo install mise` OR official installer | kits 5/8 | TIER-1-DIRECT |
| uv | INSTALLED | 0.10.3 | @ astral-sh/uv | `uv self update` (already self-managed) | kits 8/8 | TIER-1-DIRECT |

**Verdict**: §1 fully INSTALLED. No gaps.

## 2. Modern UX CLI tools (kits Tier-2)

| Tool | Status | Installed Ver | Channel | Kits cite |
|---|---|---|---|---|
| eza | INSTALLED | latest (eza-community/eza) | scoop/winget/cargo | kits 6/8 |
| bat | INSTALLED | 0.26.1 | sharkdp/bat | kits 6/8 |
| fzf | INSTALLED | 0.70.0 | junegunn/fzf | kits 8/8 |
| zoxide | INSTALLED | 0.9.9 | ajeetdsouza/zoxide | kits 7/8 |
| delta | INSTALLED | 0.18.2 | dandavison/delta | kits 6/8 |
| lazygit | INSTALLED | 0.60.0 (2026-03-09) | jesseduffield/lazygit | kits 7/8 |

**Verdict**: §2 fully INSTALLED. No gaps.

## 3. Security stack

| Tool | Status | Installed Ver | Recommended install | Kits cite | Priority |
|---|---|---|---|---|---|
| semgrep | INSTALLED | 1.162.0 | already via uvx/pipx | kits 7/8 | — |
| gitleaks | INSTALLED | 8.30.0 | already via go/gh-release | kits 8/8 | — |
| trufflehog | INSTALLED | 3.95.2 | already via go/gh-release | kits 6/8 | — |
| osv-scanner | INSTALLED | 2.3.6 | already via go/gh-release (google/osv-scanner) | kits 6/8 | — |
| **trivy** | **MISSING** | — | `winget install AquaSecurity.Trivy` (verified avail 0.70.0) | kits 6/8 | **P1** |
| codeql | MISSING | — | `gh release download --repo github/codeql-cli-binaries -p '*win64.zip'` (no winget pkg) | kits 5/8 | P2 |
| scorecard | MISSING | — | `go install github.com/ossf/scorecard/v5@latest` (requires Go env; Go 1.26.1 INSTALLED) | kits 4/8 | P3 |

**Gap**: trivy (container/IaC vuln scanner) is highest-leverage missing security tool with kits 6/8 + verified winget package + AquaSecurity-org-canonical native channel.

## 4. gitnexus

**Status**: INSTALLED via npm global at `C:\Users\42\AppData\Roaming\npm\gitnexus` v1.6.3. Native install — NOT sibling cite-import. CR-12 conformant.

## 5. Docker daemon + image inventory

**Daemon**: `com.docker.service` STOPPED (state=1). Docker Desktop installed at `C:\Program Files\Docker\` but not running. CLI present at `C:\Program Files\Docker\Docker\resources\bin\docker`.

**Recommended actions**:
1. Start Docker Desktop (manual — auto-mode prohibits modifying shared system services without confirmation).
2. After daemon up, pull kits-convergent images:
   - `docker pull qdrant/qdrant:latest` — vector store (Memory L2, kits 5/8)
   - `docker pull falkordb/falkordb:latest` — graph DB for graphiti (Memory L3, kits 4/8)
   - `docker pull berriai/litellm:latest` — **AMBER** sibling-bleed risk per Wave 50 fire 4 archaeology; defer until specific need
3. Podman MISSING (kits Tier-3 alternative; not required if Docker active).

**HONEST-NON-FINDING**: no canonical `ghcr.io/anthropic/*` images verified — Anthropic does not publish official runtime images for CC harness. Skip this row from kits-convergence.

## 6. Language runtimes

| Runtime | Status | Version | Notes |
|---|---|---|---|
| Python (system) | INSTALLED | 3.14.3 | C: install |
| Python venv | INSTALLED | 3.13.12 | Z:/venvs/claude — 497 pkgs, **157 outdated** |
| Node | INSTALLED | 22.22.0 | via fnm 1.39.0 |
| npm | INSTALLED | 11.9.0 | 30+ globals (verified) |
| Go | INSTALLED | 1.26.1 | needed for scorecard, yq |
| **Rust** | **MISSING toolchain** | rustup present, NO active toolchain | **`rustup default stable`** required — many cargo-install paths blocked |
| fnm | INSTALLED | 1.39.0 | Node version manager |

**Gaps**:
- **Rust toolchain MISSING** (P0 for §1 cargo-install paths; rustup home at `Z:\claude-sota-installed\.rustup` exists but no toolchain)
- Python venv 157 outdated packages — periodic `uv pip install --upgrade` sweep recommended (low priority — venv is working; outdated ≠ broken)

## 7. MCP server health smoke-test

| Server | Type | Probe | Result |
|---|---|---|---|
| github | http | `curl https://api.githubcopilot.com/mcp/readonly` | **HTTP 401** (expected — auth required; reachable) ✅ |
| context7 | http | `curl https://mcp.context7.com/mcp` | HTTP 405 (method not allowed on GET; reachable) ✅ |
| deepwiki | http | `curl https://mcp.deepwiki.com/mcp` | HTTP 406 (not acceptable on GET; reachable) ✅ |
| playwright | stdio | `npx -y @playwright/mcp@latest --help` | **--help OK in 10s** ✅ |
| serena | stdio | `uvx --from git+https://github.com/oraios/serena serena --help` | **--help OK** ✅ |

**Verdict**: All 5 MCP servers reachable + smoke-clean. No silent failures.

## 8. Anthropic CC integration

| Surface | State |
|---|---|
| claude.exe version | 2.1.132 ✅ |
| `claude doctor` non-interactive | NOT AVAILABLE (interactive only) — version probe substitutes |
| Plugin marketplaces | 3 known: `claude-plugins-official` (last sync 2026-05-08T03:30:58), `openai-codex` (2026-05-06), `everything-claude-code` (2026-05-06) |
| Plugins installed | 5: superpowers@5.1.0, codex@1.0.4, everything-claude-code@2.0.0-rc.1, pyright-lsp@1.0.0, agent-sdk-dev@70d57685d411 |
| CCBP HEAD drift | UPSTREAM AHEAD: `bcaa2cc` (Merge), `4671f03` (chore agent-collections), 3 more commits ahead of pinned `64fffd53`. **Refresh recommended** per cardinal-rule-6. |
| cwc-long-running-agents HEAD | `ffd563d` (matches CLAUDE.md L168 pinned SHA) ✅ |

**Plugin marketplace stale**: `everything-claude-code` last sync 2026-05-06 (~36h old); `openai-codex` same. Refresh via `/plugin marketplace update --all` recommended per cardinal-rule-6.

## 9. Top-10 install priority

| # | Action | Justification |
|---|---|---|
| 1 | `rustup default stable` | Unblocks cargo-install paths for §1 tool refreshes; near-zero risk |
| 2 | `winget install AquaSecurity.Trivy` | Highest kits-cite gap (6/8); fills container/IaC vuln scanner role |
| 3 | Start Docker Desktop (USER ACTION) | Unblocks Memory L2/L3 stack (qdrant + falkordb) per CLAUDE.md Memory Stack section |
| 4 | `/plugin marketplace update --all` (run inside CC session) | Refresh 3 marketplaces past 36h stale per CR-6 |
| 5 | `cd Z:/repos/deps/claude-code-best-practice-shan && git pull` (cite-anchor refresh) | CCBP cite-anchor pinned at `64fffd53` is 5 commits behind upstream; cardinal-rule-6 freshness |
| 6 | `docker pull qdrant/qdrant:latest` (after #3) | Memory L2 vector store install per `docs/sota-installed-manifest.md` Memory section |
| 7 | `docker pull falkordb/falkordb:latest` (after #3) | Memory L3 graph DB for Graphiti |
| 8 | `gh release download --repo github/codeql-cli-binaries` | CodeQL static-analysis gap — no winget pkg, gh release official channel |
| 9 | `go install github.com/ossf/scorecard/v5@latest` | OSSF supply-chain scorecard — Go runtime already INSTALLED |
| 10 | Python venv outdated sweep: `uv pip list --outdated` review + targeted upgrades | 157 outdated; review for security-critical (anthropic, certifi, Authlib, Authlib, requests-class) |

## 10. HONEST-NON-FINDING

- `ghcr.io/anthropic/*` Docker images: NOT PUBLISHED by Anthropic. No kits-convergent image to pull. Drop from install plan.
- `claude doctor` non-interactive flag: not exposed by claude.exe 2.1.132. Use `claude --version` + plugin/marketplace JSON inspection as substitute.
- Podman: kits-Tier-3, not required if Docker Desktop is the canonical container runtime in this environment.
- LiteLLM Docker image: AMBER per Wave 50 fire 4 sibling-bleed archaeology. Defer until specific consumer (e.g., explicit LLM-routing need). Not in priority install list.

## 11. Cite-class summary

- TIER-1-DIRECT cites for tool versions verified at runtime via `<tool> --version` (immediate, falsifiable).
- Kits-convergence citations reference the prior wave's `tmp/fleet-kits-convergence-2026-05-08.md` (sibling fleet report) — TIER-2 cite for kits aggregation.
- Per cardinal-rule-12 upstream-install-priority: ALL recommended installs use upstream native channels (winget, cargo, go install, gh release, uv, npm @latest, docker pull official). Zero sibling cite-imports recommended.
- Per cardinal-rule-9 version-pin: install commands use `@latest` only when the upstream channel is canonical-managed (winget package versioning, cargo registry, go install). Mark as `@latest-acknowledged-D6-risk` in commit body when applied.
