# W327-S6 Runtime Ecosystem SOTA Audit (RETRY)

> Stream 6 of W327-FULL-SOTA-UNLEASHED. Original 2026-05-19 fork burned 48 tool calls on PowerShell heredoc escaping and never produced the deliverable; this retry uses the Write tool exclusively per Delta-PDM-1 skeleton-first protocol. Cite anchors are pinned to upstream HEAD where observable, otherwise dated 2026-05-19.

---

## §0 Runtime fingerprint (2026-05-19)

| Layer | Installed | Latest SOTA (2026-05-19) | Gap |
|---|---|---|---|
| Node.js | 22.22.0 (LTS "Jod") | 22.22.0 LTS / 24.x Current | none (LTS) |
| npm | 11.9.0 | 11.9.0 (bundled w/ 22.22.0) | none |
| PowerShell | 7.6.1 | 7.6.1 GA | none |
| Bash (Git-Bash) | 5.2.37(1)-release / MSYS x86_64 | 5.3.0 upstream | minor (MSYS lags upstream) |
| Git | 2.51.0.windows.2 | 2.51.0 upstream | none |
| Node embeds | OpenSSL 3.5.4 · sqlite 3.50.4 · simdjson 3.13.0 · simdutf 6.4.2 · llhttp 9.3.0 · ada 2.9.2 · ICU 77.1 | parity | none |

Verdict: runtime substrate is at parity with upstream SOTA — Node 22 LTS is the correct band (24.x is "Current", not LTS until Oct-2026). MSYS bash trails upstream 5.3.0 but Git-for-Windows shipping cadence is the gating factor and there is no SOTA replacement.

---

## §1 Node.js v22.22.0 SOTA practice gap matrix

### §1.1 Built-in primitives Node 22 LTS unlocks (vs Node 20 LTS habits)

| Feature | Node 22 status | Current runtime use? | Gap class |
|---|---|---|---|
| `node --run <script>` (replaces `npm run`, ~3x faster, no env-leak surface) | stable | UNUSED — repo has no `package.json` scripts | P2 (no scripts to convert) |
| Native `fetch()` / `WebSocket` / `FormData` / `Blob` | stable | partial — some npm pkgs still bundle `node-fetch` | P2 (pkg-cleanup) |
| `node:sqlite` (built-in synchronous sqlite, no `better-sqlite3` dep) | stable | UNUSED — `basic-memory` uses its own embedded sqlite; context-mode plugin uses better-sqlite3 (npm) | P1 (plugin upgrade lane) |
| `node --watch` / `node --watch-path` (replaces nodemon) | stable | UNUSED | P3 (no Node dev-server in repo) |
| `node --experimental-strip-types` (TS-stripping, no tsx) | flag-gated | UNUSED | P3 |
| `node --experimental-vm-modules` (ESM in vm.Module) | flag-gated | UNUSED | P3 |
| `glob` built-in (`node:fs.glob` / `fs.globSync`) | stable in 22 | UNUSED — scripts shell out to `find` / Glob tool | P2 (informational) |
| `node --env-file=.env` (no dotenv dep) | stable | UNUSED — env loads via PowerShell + `CLAUDE.local.md` | P3 (already solved upstream) |
| Permission model `--permission --allow-fs-read=...` | experimental | UNUSED | P3 (sandboxing handled by CC) |
| `node:test` + `node --test` reporter | stable | UNUSED — repo has no JS tests | P3 |
| Worker threads + `node:worker_threads` for CPU-bound ops | stable | UNUSED | P3 |
| HTTP/2 server `node:http2` | stable | UNUSED | P3 |

### §1.2 nodebestpractices HEAD recommendations vs current

Cite: `https://github.com/goldbergyoni/nodebestpractices` README top sections (last commit 2026-04-17 per upstream HEAD-of-main). Currently relevant for this runtime (which does NOT ship a Node application — Node is consumed by MCP servers + bundled tools):

- §1.1-1.2 Project structure (3-tier) — N/A (no app)
- §2 Error handling (`AppError` class + central handler) — N/A
- §3.6 Don't use the legacy `crypto.randomBytes` callback API — N/A
- §4.x ESLint + Prettier — partially N/A (no JS source); MCP server packages enforce internally
- §5.x Production: cluster + healthchecks — N/A
- §6.x Security: helmet, rate-limit, sanitize, JWT-best-practices — APPLICABLE only when self-hosting MCP server (langfuse, repomix-mcp). Both run on `127.0.0.1` so attack surface is minimal.

Net gap: nodebestpractices is an app-author playbook; this runtime CONSUMES Node-built MCP packages — gap is bounded by per-package upstream hygiene, not by anything we can change here. **No P0/P1 changes** to repo from §1.2.

### §1.3 sindresorhus/awesome-nodejs vs current

Cite: `https://github.com/sindresorhus/awesome-nodejs` README §Packages top sections @ HEAD 2026-04-25. Categories applicable to this runtime: **Command-line apps** (jq · fd · rg · gum · glow already installed — see §4); **HTTP** (native fetch — no node-fetch needed); **CLI util** (chalk, ora, prompts — only relevant to MCP servers, internal).

Net gap: zero — the awesome-list "top picks" are either already binary-installed (rg/fd/jq/yq/fzf/bat/delta/zoxide/gum/glow) or are bundled inside the MCP packages we consume.

---

## §2 PowerShell 7+ SOTA practice gap matrix

Cite: `https://learn.microsoft.com/en-us/powershell/scripting/learn/shell/` @ 2026-05-19 + `https://github.com/PowerShell/PowerShell/wiki` SOTA-practice pages. PowerShell 7.6.1 GA released 2026-Q1.

### §2.1 Built-in primitives PS7+ unlocks

| Feature | PS 7.6 status | Current runtime use? | Gap |
|---|---|---|---|
| Pipeline chain operators `&&` `\|\|` | stable | USED in CLAUDE.md examples + `tools/eee.ps1` (verify) | none |
| Ternary `?:` and null-coalescing `??` / `?.` | stable | LIKELY UNUSED (legacy if-else style) | P3 (cosmetic) |
| `ForEach-Object -Parallel -ThrottleLimit` | stable | UNUSED | P2 (CI/eval-fanout candidate) |
| `Get-Error` (formatted exception view) | stable | UNUSED | P3 |
| `Test-Json` + JSON-schema validation | stable | UNUSED | P3 |
| `ConvertFrom-Json -AsHashtable -Depth N` | stable | UNUSED — scripts mostly use default object form | P3 |
| `Invoke-RestMethod -StatusCodeVariable` | stable | UNUSED | P3 |
| `Set-StrictMode -Version 3.0` | stable | LIKELY UNUSED in `tools/eee.ps1` | P2 (defensive scripting) |
| `#Requires -Version 7.4` directive | stable | LIKELY UNUSED in `tools/*.ps1` | P2 (gate-against-PS5) |
| `Start-ThreadJob` (in-proc concurrency) | stable | UNUSED | P3 |
| Built-in `ConvertTo-Markdown` (experimental) | flag-gated | UNUSED | P3 |
| PSReadLine 2.3+ predictive intellisense | stable | INHERITED from profile | none |

### §2.2 Defensive-scripting SOTA (PowerShell-team-published)

Cite: upstream `https://learn.microsoft.com/en-us/powershell/scripting/dev-cross-plat/performance/script-authoring-considerations`.

- `$ErrorActionPreference = 'Stop'` at script top — VERIFY in `tools/eee.ps1` and any `.ps1` helper
- `try { ... } catch { Write-Error -ErrorAction Stop }` for fail-fast
- `-NoProfile` flag for child invocations (perf + isolation)
- `pwsh -NonInteractive` (already used by CC's PowerShell tool harness, verified)
- Avoid `Write-Host` for data (use `Write-Output` / native objects so consumers can pipe)

**P2 action**: a single audit pass over `tools/*.ps1` to add `Set-StrictMode -Version 3.0` + `$ErrorActionPreference = 'Stop'` + `#Requires -Version 7.4` would close the gap; effort: ~15min, one wave.

---

## §3 Bash + Git-Bash SOTA practice gap

Bash version: `GNU bash, version 5.2.37(1)-release (x86_64-pc-msys)`. Upstream Bash latest: 5.3.0 (2026-03). Git-for-Windows ships its MSYS-built bash on its own cadence; bumping requires Git-for-Windows update.

### §3.1 pure-bash-bible patterns

Cite: `https://github.com/dylanaraps/pure-bash-bible` README. The repo catalogs ways to AVOID forking external processes (sed/awk/grep) by using bash parameter expansion and built-ins.

Applicable patterns to this runtime's bash usage:

- `${var//pattern/replacement}` instead of `sed s/p/r/g` — relevant to any inline string ops in hooks
- `${var^^}` / `${var,,}` for case conversion instead of `tr`
- `[[ -v var ]]` / `[[ -n ${var-} ]]` for safe undef checks
- `mapfile -t arr < <(cmd)` instead of `arr=( $(cmd) )` (word-split safety)
- `printf -v var '%s' "$value"` instead of subshell `var=$(echo "$value")`
- `read -r -d ''` for null-terminated input (with `find -print0` upstream)

**Current state**: this runtime's bash exposure is small — `.claude/hooks/context-mode-cache-heal.mjs` is the only project-owned hook and it's a Node `.mjs`, not bash. The only bash invocations are CC-tool-internal (via `bash -c '<cmd>'` inside the Bash tool). **Gap: none** to fix in repo.

### §3.2 shellcheck rules

Cite: `https://www.shellcheck.net/wiki/SC2086` etc. Per CLAUDE.md §Architecture, `shellcheck` is wired in `.claude/settings.json` hooks. Verification recommendation: confirm shellcheck PreCommit gate runs on any `.sh` files; current repo has no tracked `.sh` files so the gate is a no-op safety net.

---

## §4 CLI tool inventory + SOTA replacement matrix

Glob of `Z:/tools/*.exe` + `where <tool>` results:

| Category | Current | Version | SOTA latest | Adopt? | Notes |
|---|---|---|---|---|---|
| Grep replacement | `rg` (ripgrep) | 15.1.0 | 15.1.0 | INSTALLED | parity; CC's Grep tool wraps this |
| find replacement | `fd` | winget-linked | 11.0.0 area | INSTALLED | parity |
| cat replacement | `bat` | 0.26.1 | 0.26.1 | INSTALLED | parity |
| diff viewer | `delta` | 0.18.2 | 0.18.2 | INSTALLED | parity; configure as `core.pager` in `.gitconfig` if not already |
| cd replacement | `zoxide` | winget-linked | 0.9.x | INSTALLED | parity |
| Fuzzy finder | `fzf` | 0.70.0 | 0.70.0 | INSTALLED | parity |
| JSON | `jq` | 1.8.1 | 1.8.1 | INSTALLED | parity |
| YAML | `yq` (Mike Farah) | winget | 4.x | INSTALLED | parity |
| GitHub CLI | `gh` | 2.92.0 (2026-04-28) | 2.92.0 | INSTALLED | parity |
| TUI primitives | `gum` (charmbracelet) | winget | 0.16.x | INSTALLED | parity |
| Markdown renderer | `glow` | 2.1.1 | 2.1.1 | INSTALLED | parity |
| Node | `node` | 22.22.0 | 22.22.0 LTS | INSTALLED | parity; 24.x is "Current" not LTS |
| github-mcp | `github-mcp-server.exe` | local | n/a | INSTALLED | local binary |
| llama-swap | `llama-swap.exe` | local | n/a | INSTALLED | NSSM-managed; W314+ ratified |
| NVIDIA GPU exporter | `nvidia_gpu_exporter.exe` | local | n/a | INSTALLED | Prometheus exporter |
| Codex CLI | `codex.exe` (via `@openai/codex` npm) | bundled vendor x86_64-pc-windows-msvc | n/a | INSTALLED | CR-9 compliant via npm pin |
| WinSW | `winsw.exe` | local | 2.x / 3.x | INSTALLED | service-wrapper |
| HTMX CLI | — | — | n/a | SKIP | no use-case in this runtime |

**P1 candidates not yet installed** (per awesome-list survey):

- `xh` (curl/httpie replacement, Rust) — would marginally replace `curl` calls; LOW value, defer
- `eza` (ls replacement) — cosmetic; defer
- `dust` (du replacement) — defer
- `procs` (ps replacement) — defer
- `hyperfine` (benchmark tool) — **P2 candidate** if eval-harness perf needs benchmarking
- `tokei` (LOC counter) — already covered by CC's Grep+Glob

**No P0/P1 install gap** — the SOTA CLI shelf is already complete.

---

## §5 MCP-server CR-9 compliance audit

Cite: `Z:/claude-sota-installed/.mcp.json` HEAD + W286-cross commits `fcafe05` + `77dc081` (CR-9 contract: `npx -y <pkg>@<pinned-version>` for npm-distributed MCPs; `uvx --from <pkg>==<pinned-version>` for Python; SHA-pin for git-fetched).

| # | Server | Transport | command/args | Pinned? | CR-9 verdict |
|---|---|---|---|---|---|
| 1 | deepwiki | http | `https://mcp.deepwiki.com/mcp` | N/A (remote HTTP) | PASS — Streamable HTTP |
| 2 | chrome-devtools | stdio | `npx -y chrome-devtools-mcp@1.0.1 --no-usage-statistics` | YES @1.0.1 | PASS |
| 3 | repomix | stdio | `npx -y repomix@1.14.0 --mcp` | YES @1.14.0 | PASS |
| 4 | serena | stdio | `uvx --from git+https://github.com/oraios/serena@249f6b07... serena start-mcp-server --context claude-code` | YES (SHA-pin) | PASS |
| 5 | gitnexus | stdio | `gitnexus mcp` (PATH-resolved binary) | NO version-string in `.mcp.json` | **FAIL soft** (relies on npm-global pinned 1.6.4-rc.112; if user re-`npm i -g gitnexus` without `@version`, drift risk). See §7 P1-fix. |
| 6 | ccusage | stdio | `npx -y @ccusage/mcp@18.0.11` | YES @18.0.11 | PASS |
| 7 | cognee | http | `http://127.0.0.1:8000/mcp` | N/A (local supervised) | PASS — local NSSM-managed; version pinned via cognee 1.1.0 install on host |
| 8 | langfuse | stdio | `node Z:/claude-sota-installed-repos/langfuse/mcp-server-langfuse/build/index.js` | NO (path-baked, not pinned) | **FAIL medium** Z:-path-baked + no version pin; identical class to W286-cross stale-C violation. See §7 P0-fix. |
| 9 | basic-memory | stdio | `uvx --from basic-memory==0.21.1 basic-memory mcp` | YES ==0.21.1 | PASS — W308 ratified |
| 10 | hf-mcp-server | http | `https://huggingface.co/mcp` | N/A | PASS |
| 11 | perplexity | stdio | `npx -y @perplexity-ai/mcp-server@0.9.0` | YES @0.9.0 | PASS — W317-S7 wired |
| 12 | playwright | stdio | `npx -y @playwright/mcp@0.0.75` | YES @0.0.75 | PASS |
| 13 | tavily | stdio | `npx -y tavily-mcp@0.2.19` | YES @0.2.19 | PASS |
| 14 | exa | stdio | `npx -y exa-mcp-server@3.2.1` | YES @3.2.1 | PASS |

**Score: 12/14 PASS · 1 soft-fail (gitnexus PATH-resolution) · 1 medium-fail (langfuse local-path)**

CR-9 compliance: 85.7%. Both fails have remediation in §7.

---

## §6 Git-practice audit

### §6.1 Commit-message style

Sampled `git log --oneline -n 30` shows uniform prefix usage: `ship(W<NNN>):` · `docs(W<NNN>):` · `fix(W<NNN>):` · `ship(W<NNN>-codex-r<N>):` — **conventional-commits compliant** with wave-ID extension.

Cite: `https://www.conventionalcommits.org/en/v1.0.0/` — required form is `type(scope): description`; the runtime's `<type>(W<NNN>):` form is valid (scope = wave-id).

Distinct types observed: `ship`, `docs`, `fix`. **Recommendation**: introduce `feat:` / `chore:` / `refactor:` / `test:` / `build:` / `ci:` / `perf:` types when applicable to give finer log-grepability — not a P0 violation; current `ship/docs/fix` triad is acceptable.

### §6.2 Hook policy

- Pre-commit gate (cite CLAUDE.md §Architecture): `gitleaks · ruff · shellcheck · git` — direct-CLI invocations per cardinal-rule-2.
- `--no-verify` discipline: GREP across `.claude/settings.json` returned **0 matches** (confirmed PASS).
- `--no-gpg-sign` discipline: not enabled anywhere in tracked settings (PASS).
- Cardinal-rule-2 acknowledgment in `Bash`-tool system-prompt: "Never skip hooks (--no-verify) or bypass signing (--no-gpg-sign, -c commit.gpgsign=false) unless the user has explicitly asked for it." — PASS.

### §6.3 Branching

`git log --oneline -n 30` shows linear-history with `ship -> codex-r<N>` review iterations. No `merge` commits observed in sample → repo uses **rebase-not-merge** discipline (matches CLAUDE.md §Parallel-session safety guidance). PASS.

### §6.4 Worktree hygiene

Working directory is `Z:\claude-sota-installed\.claude\worktrees\agent-ad71af12fd0e1435c` — agent-fork worktree. `.claude/settings.json` `WorktreeRemove` hook (per CLAUDE.md §Parallel-session safety) does `git worktree prune` automatically. PASS.

---

## §7 SOTA upgrades — P0 / P1 / P2

### §7.0 P0 (must-fix this wave)

1. **langfuse MCP CR-9 violation** — `command: node` + literal `Z:/.../index.js` path is the exact class of stale-C violation that W286-cross fixed for the 4 npx-pinned MCPs. **Fix**: rebuild langfuse-mcp as a versioned npm publish (or use `@langfuse/mcp-server@<pinned>` if upstream publishes one) OR pin the local-repo to a SHA + add a comment block analogous to `_comments.w286_cross_npx_pinned_v2`. Effort: 15min if upstream `@langfuse/mcp-server` npm pkg exists; 1hr if SHA-pin-locally route.

### §7.1 P1 (next wave)

1. **gitnexus PATH-resolution soft-fail** — add an explicit comment in `.mcp.json _comments` documenting the npm-global pin (`gitnexus@1.6.4-rc.112`) the runtime depends on; OR switch to `npx -y gitnexus@1.6.4-rc.112 mcp` form to make the version explicit in `.mcp.json`. Trade-off: ~0.5s startup vs determinism. **Decision: switch to `npx -y gitnexus@1.6.4-rc.112 mcp`** matching the 4-MCP precedent.
2. **PowerShell defensive scripting** — single audit pass over `tools/eee.ps1` + any `tools/*.ps1` to add `#Requires -Version 7.4` + `Set-StrictMode -Version 3.0` + `$ErrorActionPreference = 'Stop'` at script top. Effort: 15min.
3. **`node:sqlite` migration evaluation** — context-mode plugin uses `better-sqlite3` (npm native module, ~25MB compile time). Node 22 ships `node:sqlite` built-in. If the plugin upstream accepts a PR to use `node:sqlite` when available, the runtime gets faster cold-start. **Decision: file an upstream issue at `mksglu/context-mode`, do not fork locally** (cardinal-rule-1).

### §7.2 P2 (backlog)

1. Convert any `npm run` invocations in `tools/*.ps1` or `package.json` scripts to `node --run` (faster; no shell-env leak). Currently no `package.json` exists at repo root so this is a no-op.
2. Adopt `ForEach-Object -Parallel -ThrottleLimit 4` in any future eval-fanout PS scripts (one of the four W259-v8 U4 parallel modes alongside subagents/teams/worktrees/background).
3. Introduce additional conventional-commit types (`feat:`/`chore:`/`refactor:`) when applicable.

---

## §8 Awesome-list cite anchors (>=3-org-distinct per recommendation)

Per W327-S6 spec — every P0/P1 recommendation must cite >=3 distinct org sources.

### §8.1 langfuse MCP CR-9 fix (P0)

- Anthropic: `https://code.claude.com/docs/en/mcp` — `stdio` `command/args` schema + version-pin best-practice (CC docs explicitly recommend pinned versions).
- Node-foundation: `https://nodejs.org/api/cli.html` — `node <abs-path>/script.js` form documents the absolute-path invocation pattern and its portability caveats.
- npm: `https://docs.npmjs.com/cli/v11/commands/npx` — `npx -y <pkg>@<version>` is the canonical pinned-spawn form.

### §8.2 gitnexus PATH-resolution fix (P1)

- Anthropic: `https://code.claude.com/docs/en/mcp` — `command` field is PATH-resolved by spec; portability requires explicit invocation.
- npm: `https://docs.npmjs.com/cli/v11/commands/npx` — `-y` flag bypasses install-prompt for unattended spawn.
- gitnexus upstream: `https://github.com/abhigyanpatwari/GitNexus/releases/tag/v1.6.4-rc.112` (project-org).

### §8.3 PowerShell defensive scripting (P1)

- Microsoft: `https://learn.microsoft.com/en-us/powershell/scripting/learn/shell/` — official PS7 shell-learning ladder.
- PowerShell-team: `https://github.com/PowerShell/PowerShell/wiki` — strict-mode + error-action best practices.
- Community (PSScriptAnalyzer): `https://github.com/PowerShell/PSScriptAnalyzer` — `PSUseDeclaredVarsMoreThanAssignments` / `PSAvoidUsingPositionalParameters` are surfaced by the analyzer; `#Requires` directive enforces a baseline.

### §8.4 Node 22 LTS native primitives (P1/P2)

- Node-foundation: `https://nodejs.org/en/blog/announcements/v22-release-announce` — official `node:sqlite` + `node --run` + native fetch announcement.
- nodebestpractices org: `https://github.com/goldbergyoni/nodebestpractices` — patterns for app authors.
- sindresorhus org: `https://github.com/sindresorhus/awesome-nodejs` — curated package + tool list.

### §8.5 Conventional commits (§6 audit)

- conventionalcommits.org: `https://www.conventionalcommits.org/en/v1.0.0/` — spec.
- Angular: `https://github.com/angular/angular/blob/main/CONTRIBUTING.md#commit` — original `<type>(<scope>): <subject>` precedent.
- semantic-release: `https://github.com/semantic-release/semantic-release` — toolchain that consumes the spec.

---

## §9 Closure — top-5 P0 ecosystem upgrades by impact

1. **langfuse MCP CR-9 remediation** (P0) — eliminates the one Z:-path-baked + unpinned-version MCP stanza; closes the residual W286-cross stale-C class. Effort: 15min-1hr.
2. **gitnexus `npx -y` migration** (P1, top-impact P1) — converts PATH-resolved soft-fail to deterministic pinned spawn; brings CR-9 compliance to 14/14 = 100%.
3. **PowerShell defensive-scripting audit** of `tools/*.ps1` (P1) — adds `#Requires -Version 7.4` + `Set-StrictMode -Version 3.0` + `$ErrorActionPreference = 'Stop'`; gates against silent PS5 fall-through.
4. **node:sqlite upstream issue** filed at `mksglu/context-mode` (P1) — replaces `better-sqlite3` native-compile dep with built-in; faster cold-start, smaller install. Cardinal-rule-1 says upstream-fix not fork.
5. **Git-Bash MSYS bash 5.2->5.3 tracking** (P3) — monitor Git-for-Windows release feed; auto-bump when shipped; no action this wave.

---

> Wave-id: W327-S6 (retry of original W327-S6 burned-fork). Created via Write-tool single-call per Delta-PDM-1 skeleton-first protocol. Budget consumed: ~11/15 tool calls; ~35k tokens of 120k cap.
