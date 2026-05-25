---
title: Agent G — SOTA CLI + foundation-tools research for claude-sota-pure (Option B)
status: AUTHORITATIVE
date: 2026-05-14
agent: agent-g-cli-foundation
wave: option-b-parallel-evaluation
output_budget: 500 LOC
---

# Agent G — SOTA CLI + Foundation Tools (Option B `Z:\claude-sota-pure\`)

## Methodology + cite discipline

All recommendations verified 2026-05-14 via WebFetch against canonical upstream GitHub repos (cardinal-rule-6 freshness compliance). Cite shape per claim: repo-URL + license + stars + latest-release@date. Marker Decay sensitive — re-verify at install time per `evidence-policy.md` Marker Decay corollary.

**Cite-anchor probe failures (HONEST-NON-FINDING)**:
- `Z:/repos/deps/ibraheemdev-modern-unix/README.md` — NOT-PRESENT on this disk (brief assumed it; absent at probe). Pivoted to direct upstream WebFetch per cardinal-rule-6 "pull-from-newest-GitHub".
- `Z:/repos/deps/agarrharr-awesome-cli-apps/README.md` — NOT-PRESENT. Same pivot.

**Channel preference for Windows-Z:-portable** (per cardinal-rule-6 official-native-channel):
1. **winget** (Microsoft canonical; user-scope by default; doesn't pollute system PATH)
2. **scoop** (Z:-portable-compatible; installs to `$env:USERPROFILE\scoop\` — relocate via `scoop bucket add` + env)
3. **cargo / npm / pip-via-uv** (toolchain-native; Z:-portable when venv/cargo home redirected)
4. **direct binary release download** (last resort; cardinal-rule-9 install-risk: manual SHA-pin discipline required)

---

## 1. Executive summary — top-10 must-install for Option B bootstrap

| Rank | Tool | Category | Why must-install |
|------|------|----------|------------------|
| 1 | **ripgrep (rg)** | file search | Every code search MCP / Grep tool routes through this; cardinal-rule-1 cite-verify needs rg |
| 2 | **fd** | file find | Glob tool parity + .gitignore-aware traversal |
| 3 | **jq 1.8.1** | JSON | `.mcp.json` / `settings.json` / verdict-file parsing |
| 4 | **yq 4.53.2** | YAML | `manifests/services.yaml` / GitHub Actions / k8s configs |
| 5 | **gh 2.92.0** | GitHub CLI | cardinal-rule-6 release-download primitive + `mcp__github__*` complement |
| 6 | **uv 0.11.14** | Python | SOTA Python toolchain 2026 (10-100x pip; see SOTA verdict §2.6) |
| 7 | **bun 1.3.14** | JS runtime | Fastest install + cold-start; mcp install workflows |
| 8 | **lazygit 0.61.1** | Git TUI | Commit/rebase workflows when codex T2/T3 verdicts land |
| 9 | **ast-grep 0.42.2** | Code intel | Structural code search beyond grep regex |
| 10 | **typos 1.46.1** | QA | Pre-commit spell-check on rules/docs/agents |

**Total install footprint**: ~150-200 MB (mostly Rust/Go static binaries; uv adds ~30 MB; bun adds ~60 MB).

---

## 2. SOTA winners per category

### 2.1 File search / grep

| Pick | Tool | License | Stars | Release | Install (winget preferred) | Cite |
|------|------|---------|---|---------|----------------------------|------|
| WINNER | **ripgrep** | MIT/UNLICENSE | 63.8k | v15.1.0 @ 2025-10-22 | `winget install BurntSushi.ripgrep.MSVC` | https://github.com/BurntSushi/ripgrep |
| runner-up | sd, sift | — | — | — | (niche; rg covers 99%) | — |

Runner-up alternatives (`ack`, `ag` the-silver-searcher) are unmaintained or slower. **No tie**.

### 2.2 File find

| Pick | Tool | License | Stars | Release | Install | Cite |
|------|------|---------|---|---------|---------|------|
| WINNER | **fd** | MIT+Apache-2.0 | 43k | v10.4.2 @ 2026-03-10 | `winget install sharkdp.fd` | https://github.com/sharkdp/fd |

GNU `find` works but verbose syntax. fd is .gitignore-aware + parallelized. **No tie**.

### 2.3 Structured data (JSON/YAML/XML)

| Pick | Tool | License | Stars | Release | Install | Cite |
|------|------|---------|---|---------|---------|------|
| JSON | **jq** | MIT | 34.7k | 1.8.1 @ 2025-07-01 | `winget install jqlang.jq` (verify channel) OR `scoop install jq` OR `choco install jq` | https://github.com/jqlang/jq |
| YAML | **yq** (mikefarah) | MIT | 15.4k | v4.53.2 @ 2026-04-17 | `winget install --id MikeFarah.yq` | https://github.com/mikefarah/yq |
| Multi | **dasel v3** | MIT | 7.9k | v3.10.1 @ 2026-05-13 | `go install github.com/tomwright/dasel/v3/cmd/dasel@master` OR direct binary | https://github.com/TomWright/dasel |

**Note**: jq official README does NOT publish winget/scoop commands (HONEST-NON-FINDING in upstream docs); both packages exist in community-maintained repos. Verify channel ID via `winget search jq` before install per cardinal-rule-6 official-native-channel discipline.

### 2.4 GitHub CLI

| Pick | Tool | License | Stars | Release | Install | Cite |
|------|------|---------|---|---------|---------|------|
| WINNER | **gh** | MIT | 44.4k | v2.92.0 @ 2026-04-28 | `winget install --id GitHub.cli` | https://github.com/cli/cli |
| ext | **gh-dash** | MIT | 11.6k | v4.24.1 @ 2026-05-13 | `gh extension install dlvhdr/gh-dash` (post-gh-install) | https://github.com/dlvhdr/gh-dash |

Auth: `gh auth login --hostname github.com --git-protocol https --web` (one-time). Complements `mcp__github__*` (gh = scripted ops; MCP = research queries).

### 2.5 Docker + container observability

| Pick | Tool | License | Stars | Release | Install | Cite |
|------|------|---------|---|---------|---------|------|
| base | **docker-cli + compose v2** | Apache-2.0 | — | v5.1.3 @ 2026-04-15 | Docker Desktop installer (bundles compose v2) | https://github.com/docker/compose |
| TUI | **lazydocker** | MIT | 51k | v0.25.2 @ 2026-04-19 | `scoop install lazydocker` OR `choco install lazydocker` | https://github.com/jesseduffield/lazydocker |
| image | **dive** | MIT | 53.9k | v0.13.1 @ 2025-03-29 | `winget install --id wagoodman.dive` | https://github.com/wagoodman/dive |
| optional | **k9s** | Apache-2.0 | 33.6k | v0.50.18 @ 2026-01-11 | `winget install k9s` | https://github.com/derailed/k9s |

k9s is Kubernetes-only — DEFER unless Option B grows a k8s deployment surface.

### 2.6 Python toolchain — SOTA VERDICT

**WINNER: `uv` (Astral)** — clear consensus 2026 (see §7 Sources).

| Pick | Tool | License | Stars | Release | Install | Cite |
|------|------|---------|---|---------|---------|------|
| WINNER | **uv** | Apache-2.0+MIT | 84.9k | 0.11.14 @ 2026-05-12 | `powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 | iex"` | https://github.com/astral-sh/uv |
| niche | poetry | MIT | — | 2.3.2 @ 2026-02 | (library-publish workflow only) | — |
| baseline | pip | MIT | — | (Python-bundled) | `python -m pip` | — |

**Verdict rationale**: uv = 10-100x faster than pip; subsumes pip+virtualenv+pyenv+pip-tools+twine; ~3s install vs Poetry 11s vs pip-tools 33s (per scopir.com 2026 benchmark). Poetry retains edge for PyPI library publishing only; for app/runtime dependency mgmt → uv is undisputed.

### 2.7 Node / JS runtime — SOTA VERDICT (qualified)

**NO SINGLE WINNER** — task-dependent (HONEST-NON-FINDING for "one runtime to rule them all"):

| Pick | Tool | License | Stars | Release | Install | Best-for |
|------|------|---------|---|---------|---------|----------|
| speed | **bun** | MIT | 90.3k | v1.3.14 @ 2026-05-13 | `powershell -c "irm bun.sh/install.ps1 | iex"` | MCP server installs, package install (1s vs npm 20s), cold-start <15ms |
| security | **deno** | MIT | 107k | v2.7.14 @ 2026-04-28 | `winget install --id=DenoLand.Deno` | Built-in TS, secure-by-default, REPL, linter, formatter, test runner |
| baseline | **node** | MIT | — | v22 LTS | (already installed by CC) | 100% npm compat; enterprise baseline |

**Recommendation for Option B**: install **bun** for `npm install -g <pkg>` superset (1s vs npm 20s install time saves hours over Option B's 30+ npm installs). Keep node as baseline for max-compat MCP servers. **Skip deno** unless Option B grows TypeScript-native primitives.

Per Better Stack 2026 ranking: Bun 52k req/s > Deno 22k req/s > Node 13k req/s.

### 2.8 Modern Unix replacements

| Pick | Tool | Replaces | License | Stars | Release | Install | Cite |
|------|------|----------|---------|---|---------|---------|------|
| sys-mon | **btop** | top, htop | Apache-2.0 | 32.2k | v1.4.7 @ 2026-05-01 | NOT-Windows-supported (use `btop4win` fork) | https://github.com/aristocratos/btop |
| disk | **dust** | du | Apache-2.0 | 11.7k | v1.2.4 @ 2026-01-08 | `scoop install dust` OR `cargo install du-dust` | https://github.com/bootandy/dust |
| ps | **procs** | ps | MIT | 6k | v0.14.11 @ 2026-02-27 | `winget install procs` | https://github.com/dalance/procs |
| net | bandwhich | iftop | MIT | 11.7k | v0.23.1 @ 2024-10-08 | (needs npcap on Win) | https://github.com/imsnif/bandwhich |

**HONEST-NON-FINDING for btop on Windows**: upstream doesn't ship Windows binaries; community fork `btop4win` exists but stale. Use Windows native Task Manager + procs for now.

### 2.9 HTTP client (for testing MCP endpoints)

| Pick | Tool | License | Stars | Release | Install | Cite |
|------|------|---------|---|---------|---------|------|
| modern | **xh** | MIT | 7.8k | v0.25.3 @ 2025-12-16 | `winget add ducaale.xh` | https://github.com/ducaale/xh |
| baseline | curl | MIT-like | — | (Win11 bundled) | (already on PATH via Windows 11) | — |
| ergo | httpie | BSD | — | — | `pip install httpie` (via uv) | — |

**Recommendation**: keep `curl` (built-in Win11) + add `xh` for ergonomic HTTPie-like CLI without Python dep. Use cases: MCP healthcheck probes, codex CLI auth verification.

### 2.10 Git ecosystem

| Pick | Tool | License | Stars | Release | Install | Cite |
|------|------|---------|---|---------|---------|------|
| TUI | **lazygit** | MIT | 77.9k | v0.61.1 @ 2026-04-13 | `winget install -e --id=JesseDuffield.lazygit` | https://github.com/jesseduffield/lazygit |
| diff | **delta** | MIT | 30.8k | v0.19.2 @ 2026-03-28 | `cargo install git-delta` OR direct binary (no winget) | https://github.com/dandavison/delta |
| changelog | **git-cliff** | Apache-2.0+MIT | 11.8k | v2.13.1 @ 2026-04-26 | `cargo install git-cliff` | https://github.com/orhun/git-cliff |
| dash | **gh-dash** | MIT | 11.6k | v4.24.1 @ 2026-05-13 | `gh extension install dlvhdr/gh-dash` | https://github.com/dlvhdr/gh-dash |

Configure delta as git pager: `git config --global core.pager delta` + `git config --global interactive.diffFilter "delta --color-only"`.

### 2.11 Code intelligence CLIs

| Pick | Tool | License | Stars | Release | Install | Cite |
|------|------|---------|---|---------|---------|------|
| struct | **ast-grep (sg)** | MIT | 13.8k | v0.42.2 @ 2026-05-10 | `npm install --global @ast-grep/cli` OR `scoop install main/ast-grep` | https://github.com/ast-grep/ast-grep |
| parser | **tree-sitter** | MIT | 25.4k | v0.26.8 @ 2026-03-31 | `cargo install tree-sitter-cli` (winget/scoop not in README) | https://github.com/tree-sitter/tree-sitter |
| spell | **typos** | Apache-2.0+MIT | 3.9k | v1.46.1 @ 2026-05-08 | `cargo install typos-cli --locked` | https://github.com/crate-ci/typos |
| shell | **shellcheck** | GPL-3.0 | 39.4k | v0.11.0 @ 2025-08-04 | `winget install --id koalaman.shellcheck` | https://github.com/koalaman/shellcheck |

**License caveat**: shellcheck is GPL-3.0 — cite-only fair-use per `port-note-discipline.md §4`; do NOT bundle binary into Option B redistribution. CLI invocation from a permissive runtime is fine.

### 2.12 JSON streaming / pipe-friendly

| Pick | Tool | License | Stars | Release | Install | Cite |
|------|------|---------|---|---------|---------|------|
| cmd-out->JSON | **jc** | MIT | 8.6k | 1.25.6 @ 2025-10-13 | `winget install jc` OR `uv tool install jc` | https://github.com/kellyjonbrazil/jc |
| JSON->greppable | **gron** | MIT | 14.4k | v0.7.1 @ 2022-04-13 | `go install github.com/tomnomnom/gron@latest` OR `brew install gron` | https://github.com/tomnomnom/gron |

**gron release age caveat**: v0.7.1 from 2022 — still works, but no winget/scoop primary channel. Use direct binary download from releases page OR install via Go toolchain. Marker Decay flag: gron may be effectively abandoned; if cardinal-rule-6 freshness matters, prefer jq's `paths(scalars)` recipe as substitute.

### 2.13 PowerShell 7+ / Windows-native SOTA

| Pick | Tool | License | Stars | Release | Install | Cite |
|------|------|---------|---|---------|---------|------|
| prompt | **oh-my-posh** | MIT | 22.5k | v29.13.1 @ 2026-05-07 | `winget install JanDeDobbeleer.OhMyPosh` | https://github.com/JanDeDobbeleer/oh-my-posh |
| baseline | **PowerShell 7.6** | MIT | — | (release-stable) | `winget install --id Microsoft.PowerShell` | https://github.com/PowerShell/PowerShell |

oh-my-posh is OPTIONAL prompt aesthetics — defer unless operator wants prompt theming.

---

## 3. Windows-Z:-portable install playbook

**Pre-flight check** (run from PowerShell 7+):

```powershell
# 0. Verify package managers present
winget --version          # Should be v1.7+ (built into Windows 11)
scoop --version 2>$null   # Optional; install if missing per below

# Install scoop if absent (one-time, user-scope, Z:-portable-compatible)
if (-not (Get-Command scoop -ErrorAction SilentlyContinue)) {
    Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
    Invoke-RestMethod -Uri https://get.scoop.sh | Invoke-Expression
    scoop bucket add main
    scoop bucket add extras
}
```

**Top-10 bootstrap install** (run as user, NOT admin):

```powershell
# 1. ripgrep
winget install --id BurntSushi.ripgrep.MSVC --accept-source-agreements --accept-package-agreements

# 2. fd
winget install --id sharkdp.fd --accept-source-agreements --accept-package-agreements

# 3. jq
winget install --id jqlang.jq --accept-source-agreements --accept-package-agreements
# (verify channel ID; fallback: scoop install jq)

# 4. yq
winget install --id MikeFarah.yq --accept-source-agreements --accept-package-agreements

# 5. gh
winget install --id GitHub.cli --accept-source-agreements --accept-package-agreements
gh auth login --hostname github.com --git-protocol https --web

# 6. uv (Astral installer; auto-detects Python; Z:-portable when UV_TOOL_DIR set)
$env:UV_TOOL_DIR = 'Z:/claude-sota-pure/.local/uv-tools'
powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 | iex"

# 7. bun (Z:-portable via BUN_INSTALL env)
$env:BUN_INSTALL = 'Z:/claude-sota-pure/.local/bun'
powershell -c "irm bun.sh/install.ps1 | iex"

# 8. lazygit
winget install --id JesseDuffield.lazygit --accept-source-agreements --accept-package-agreements

# 9. ast-grep (npm-global; requires bun OR node)
bun install -g @ast-grep/cli
# OR: npm install -g @ast-grep/cli

# 10. typos (cargo-installed; requires rustup — defer if no Rust toolchain)
cargo install typos-cli --locked
```

**Verification probe** (post-install):

```powershell
$tools = @('rg', 'fd', 'jq', 'yq', 'gh', 'uv', 'bun', 'lazygit', 'sg', 'typos')
foreach ($t in $tools) {
    $found = Get-Command $t -ErrorAction SilentlyContinue
    if ($found) {
        Write-Host "[OK]   $t => $($found.Source)" -ForegroundColor Green
    } else {
        Write-Host "[MISS] $t NOT on PATH" -ForegroundColor Red
    }
}
```

---

## 4. HONEST-NON-FINDINGS

| Category | Why no clear SOTA winner |
|----------|---------------------------|
| **JS runtime** | bun/deno/node task-dependent — recommend bun for speed-critical install workflows, keep node for max-compat |
| **System monitor (Windows)** | btop is best on *nix but not Windows-native; btop4win fork is stale; fall back to Task Manager + procs |
| **JSON->greppable** | gron last released 2022-04-13 (4y stale); still works but Marker Decay risk; jq `paths(scalars)` is acceptable substitute |
| **HTTP client** | curl (builtin Win11) + xh (ergonomic) both valid; httpie is Python-dep heavy; pick one — recommend xh |
| **dasel** | TIER-2 tool — jq+yq cover 95% of use cases; dasel is multi-format unifier (DEFER) |
| **bandwhich** | Last release 2024-10-08 (~18mo stale per convergence-gate Axis-3); needs npcap on Windows; DEFER |
| **cite-anchor repos missing** | `Z:/repos/deps/ibraheemdev-modern-unix/` and `Z:/repos/deps/agarrharr-awesome-cli-apps/` NOT on disk at probe time — brief assumption was wrong; pivoted to direct upstream WebFetch per cardinal-rule-6 |

---

## 5. Integration with Option B launcher (`tools/eee-pure.ps1`)

**Recommendation**: launcher should perform a **5-tier pre-flight gate** before launching `claude.exe`:

### Tier 1 — Hard-fail-without (BLOCK if missing)

```powershell
# These tools are LOAD-BEARING for cardinal-rule discipline; missing them blocks launch.
$tier1 = @('git', 'gh', 'rg', 'jq')
foreach ($t in $tier1) {
    if (-not (Get-Command $t -ErrorAction SilentlyContinue)) {
        Write-Error "[T0-BLOCK] Missing required tool: $t — install per docs/sota-installed-manifest.md"
        exit 1
    }
}
```

**Rationale**:
- `git` — required for every workflow
- `gh` — cardinal-rule-6 release-download primitive
- `rg` — Grep tool routes through this; cite-verification depends on it
- `jq` — `.mcp.json` / `settings.json` / verdict parsing

### Tier 2 — Warn-if-missing (proceed with stderr warning)

```powershell
$tier2 = @('fd', 'yq', 'uv', 'bun')
foreach ($t in $tier2) {
    if (-not (Get-Command $t -ErrorAction SilentlyContinue)) {
        Write-Warning "[T0-WARN] Recommended tool missing: $t — install per docs/sota-installed-manifest.md §CLI Tools"
    }
}
```

### Tier 3 — Optional-but-encouraged (silent inventory log)

```powershell
$tier3 = @('lazygit', 'ast-grep', 'typos', 'shellcheck', 'delta', 'xh')
$inventory = @{}
foreach ($t in $tier3) {
    $cmd = Get-Command $t -ErrorAction SilentlyContinue
    $inventory[$t] = if ($cmd) { $cmd.Version } else { 'NOT-INSTALLED' }
}
# Append to .claude/state/cli_tool_inventory.jsonl per audit-action-loop.md
```

### Tier 4 — Deferred (do not check)

dive / k9s / lazydocker / btop / bandwhich / gron / dust / procs / oh-my-posh / git-cliff — install on-demand only.

### Tier 5 — Forbidden

— None. Avoid `node` global-install pollution if `bun` is present; both can coexist.

---

## 6. Optional deferred tools (post-bootstrap)

Install these LATER, after Option B's first 3 plugin installs land + 5+ workflow days of operator usage surface specific gaps:

| Tool | Defer trigger |
|------|----------------|
| **dive** | When Docker image workflows land |
| **k9s** | When Kubernetes deployment surface exists |
| **lazydocker** | When Docker Compose workflows accumulate |
| **delta** | After first 10 codex T2/T3 verdicts ship; install when diff readability becomes annoying |
| **git-cliff** | When first release / CHANGELOG ship lands |
| **oh-my-posh** | Aesthetic — pure operator preference |
| **dust / procs** | When disk-space / process-debug needs surface |
| **dasel v3** | If jq+yq combo proves insufficient (rare) |
| **bandwhich** | Network debugging — niche |
| **jc** | When `cmd -> JSON pipeline` patterns accumulate |
| **tree-sitter CLI** | When custom grammar work emerges |

---

## 7. Cite trail summary

All cites are **TIER-1-DIRECT** upstream repo URLs verified 2026-05-14:

- ripgrep: https://github.com/BurntSushi/ripgrep v15.1.0 @ 2025-10-22 MIT/UNLICENSE 63.8k stars
- fd: https://github.com/sharkdp/fd v10.4.2 @ 2026-03-10 MIT+Apache-2.0 43k stars
- jq: https://github.com/jqlang/jq 1.8.1 @ 2025-07-01 MIT 34.7k stars
- yq: https://github.com/mikefarah/yq v4.53.2 @ 2026-04-17 MIT 15.4k stars
- gh: https://github.com/cli/cli v2.92.0 @ 2026-04-28 MIT 44.4k stars
- uv: https://github.com/astral-sh/uv 0.11.14 @ 2026-05-12 Apache-2.0+MIT 84.9k stars
- bun: https://github.com/oven-sh/bun v1.3.14 @ 2026-05-13 — 90.3k stars
- deno: https://github.com/denoland/deno v2.7.14 @ 2026-04-28 MIT 107k stars
- lazygit: https://github.com/jesseduffield/lazygit v0.61.1 @ 2026-04-13 MIT 77.9k stars
- lazydocker: https://github.com/jesseduffield/lazydocker v0.25.2 @ 2026-04-19 MIT 51k stars
- dive: https://github.com/wagoodman/dive v0.13.1 @ 2025-03-29 MIT 53.9k stars
- k9s: https://github.com/derailed/k9s v0.50.18 @ 2026-01-11 Apache-2.0 33.6k stars
- ast-grep: https://github.com/ast-grep/ast-grep 0.42.2 @ 2026-05-10 MIT 13.8k stars
- tree-sitter: https://github.com/tree-sitter/tree-sitter v0.26.8 @ 2026-03-31 MIT 25.4k stars
- typos: https://github.com/crate-ci/typos v1.46.1 @ 2026-05-08 Apache-2.0+MIT 3.9k stars
- shellcheck: https://github.com/koalaman/shellcheck v0.11.0 @ 2025-08-04 GPL-3.0 39.4k stars
- delta: https://github.com/dandavison/delta v0.19.2 @ 2026-03-28 MIT 30.8k stars
- xh: https://github.com/ducaale/xh v0.25.3 @ 2025-12-16 MIT 7.8k stars
- jc: https://github.com/kellyjonbrazil/jc 1.25.6 @ 2025-10-13 MIT 8.6k stars
- gron: https://github.com/tomnomnom/gron v0.7.1 @ 2022-04-13 MIT 14.4k stars (stale)
- dust: https://github.com/bootandy/dust v1.2.4 @ 2026-01-08 Apache-2.0 11.7k stars
- procs: https://github.com/dalance/procs v0.14.11 @ 2026-02-27 MIT 6k stars
- bandwhich: https://github.com/imsnif/bandwhich v0.23.1 @ 2024-10-08 MIT 11.7k stars (stale)
- btop: https://github.com/aristocratos/btop v1.4.7 @ 2026-05-01 Apache-2.0 32.2k stars (no Windows)
- git-cliff: https://github.com/orhun/git-cliff v2.13.1 @ 2026-04-26 Apache-2.0+MIT 11.8k stars
- gh-dash: https://github.com/dlvhdr/gh-dash v4.24.1 @ 2026-05-13 MIT 11.6k stars
- dasel: https://github.com/TomWright/dasel v3.10.1 @ 2026-05-13 MIT 7.9k stars
- oh-my-posh: https://github.com/JanDeDobbeleer/oh-my-posh v29.13.1 @ 2026-05-07 MIT 22.5k stars
- docker compose: https://github.com/docker/compose v5.1.3 @ 2026-04-15 Apache-2.0

**SOTA verdict sources** (TIER-2 third-party analyses):
- Python 2026 SOTA: https://scopir.com/posts/best-python-package-managers-2026/ + https://www.danilchenko.dev/posts/uv-vs-pip-vs-poetry/ + https://tutorials.technology/tutorials/tutorials/uv-python-package-manager-2026/.html
- JS runtime 2026: https://betterstack.com/community/guides/scaling-nodejs/nodejs-vs-deno-vs-bun/ + https://dev.to/pockit_tools/deno-2-vs-nodejs-vs-bun-in-2026-the-complete-javascript-runtime-comparison-1elm

---

## END — Agent G report

Path: `Z:/claude-sota-installed/tmp/sota-pure-cli-tools-G-2026-05-14.md`
LOC target met (~430 LOC).
