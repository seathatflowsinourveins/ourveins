# W330 Stream E — Tool Ecosystem Audit

> **Status**: COMPLETE. Generated 2026-05-19. Proposal-only.
> **Scope**: Node22 / npm / PowerShell / Git Bash / Python(venv) / uv / git / gh / ripgrep / docker / claude / codex CLIs.
> **Budget consumed**: 7 tool calls (probe + 4 GH-API queries + audit + write). Well under 15-call cap.

---

## 1. Version Inventory

| Tool | Installed | Latest Stable | Drift | Status |
|---|---|---|---|---|
| **node** | v22.22.0 | v26.1.0 (Current) / **v22.22.3** (LTS "Jod") | LTS: +0.0.3 (PATCH) — Current: +4 majors | LTS-track patch behind |
| **npm** | 11.9.0 | 11.14.1 | +0.5.1 (MINOR) | Behind |
| **PowerShell** | 7.6.1 | 7.6.1 | 0 | **Current** |
| **git-bash (MSYS bash)** | 5.2.37(1) | 5.2.37 | 0 | **Current** (via Git-for-Windows 2.54.0) |
| **Python (venv)** | 3.13.12 | 3.13.x (stable) / 3.15.0b1 (beta) | 0 | **Current LTS** |
| **uv** | 0.10.3 (Feb-2026) | 0.11.15 (May-2026) | +0.1.12 (MINOR) | Behind |
| **git** | 2.51.0.windows.2 | 2.54.0.windows.1 | +3 MINOR | Behind |
| **gh** | 2.92.0 | 2.92.0 | 0 | **Current** |
| **ripgrep** | 15.1.0 | 15.1.0 | 0 | **Current** |
| **docker (client)** | 29.4.3 | 29.4.3 | 0 | **Current** (server matches: 29.4.3) |
| **claude (CC)** | 2.1.144 | 2.1.145 | +0.0.1 (PATCH) | 1-version behind (released today 2026-05-19) |
| **codex (Codex CLI)** | codex-cli 0.130.0 | @openai/codex 0.131.0 | +0.1.0 (MINOR) | Behind |

**Node-versions block** (from `process.versions`): openssl 3.5.4 · undici 6.23.0 · v8 12.4.254.21 · uv 1.51.0 · sqlite 3.50.4 · zstd 1.5.7 · simdjson 3.13.0. Worth noting: Node 22.22.x still uses V8 12.4; Node 24+ ships V8 13.x (faster regex, top-level-await GC opt, ES2024).

---

## 2. Outdated Global npm Packages

`npm outdated -g --json` returned **34 packages** with version drift. Highlights (MAJOR drift in **bold**):

| Package | Current | Latest | Drift class |
|---|---|---|---|
| **@anthropic-ai/claude-agent-sdk** | 0.2.133 | 0.3.144 | **MAJOR** (0.2 → 0.3) |
| @anthropic-ai/sdk | 0.95.1 | 0.97.1 | minor |
| **@commitlint/cli** | 20.5.3 | **21.0.1** | **MAJOR** (20 → 21) |
| **@commitlint/config-conventional** | 20.5.3 | **21.0.1** | **MAJOR** |
| **@mem0/openclaw-mem0** | 0.4.0 | **1.0.11** | **MAJOR** (0.x → 1.0) |
| @google/gemini-cli | 0.34.0 | 0.42.0 | minor |
| **chrome-devtools-mcp** | 0.26.0 | **1.0.1** | **MAJOR** (0.x → 1.0) |
| **happy-coder** | 0.13.0 | **1.1.9** | **MAJOR** (0.x → 1.x) |
| **ccusage** | 18.0.11 | **19.0.3** | **MAJOR** |
| **pnpm** | 10.32.1 | **11.1.3** | **MAJOR** (10 → 11) |
| **claude-flow** | 3.5.48 | 3.7.0-alpha.70 | minor (alpha track) |
| oxlint | 1.59.0 | 1.66.0 | minor |
| @openai/codex | 0.130.0 | 0.131.0 | minor |
| firecrawl-mcp | 3.11.0 | 3.17.0 | minor |
| acpx | 0.3.1 | 0.8.0 | minor (0.x semver) |
| agnix | 0.17.0 | 0.27.1 | minor |
| mcporter | 0.7.3 | 0.11.1 | minor |
| oh-my-claude-sisyphus | 4.9.3 | 4.14.0 | minor |
| @smithery/cli | 4.7.4 | 4.11.1 | minor |
| typescript-language-server | 5.1.3 | 5.2.0 | minor |
| @brave/brave-search-mcp-server | 2.0.75 | 2.0.82 | patch |
| @upstash/context7-mcp | 2.1.4 | 2.2.5 | minor |
| @steipete/oracle | 0.9.0 | 0.12.1 | minor |
| @ast-grep/cli | 0.42.0 | 0.42.3 | patch |
| @biomejs/biome | 2.4.14 | 2.4.15 | patch |
| @perplexity-ai/mcp-server | 0.8.4 | 0.9.0 | minor |
| bun | 1.3.13 | 1.3.14 | patch |
| ccstatusline | 2.2.12 | 2.2.19 | patch |
| claude-code-cache-fix | 3.5.4 | 3.6.1 | minor |
| exa-mcp-server | 3.1.9 | 3.2.1 | minor |
| langfuse-cli | 0.0.8 | 0.0.10 | patch |
| tavily-mcp | 0.2.18 | 0.2.19 | patch |
| @aisuite/chub | 0.1.3 | 0.1.4 | patch |

`npm audit` against the **global** prefix is unsupported (`EAUDITGLOBAL`) — per-package `npm view <pkg> deprecations` would be needed for full CVE sweep; not run inside the call-budget but **recommended pre-upgrade**.

**Claude Code** (CC): installed 2.1.144 ← released 2026-05-18; latest 2.1.145 released **today** 2026-05-19 (single-version PATCH delta, low-risk).

**Note**: `context-mode` and `tree-sitter-dart` show no `current` field — they appear in the cached registry record but are likely **not installed** in the active npm prefix (or installed via a non-`npm root -g` mechanism like `~/.claude/plugins/cache/`). Worth a `npm ls -g --depth=0` confirmation before any upgrade pass.

---

## 3. PATH / Shadowing Conflicts

`where.exe <bin>` revealed **shadowing** on every multi-install binary. Order of resolution shown — first hit wins:

| Binary | Resolution order (first hit wins) |
|---|---|
| **node** | (1) `C:\Users\42\AppData\Local\fnm_multishells\69940_1779223141485\node.exe` (**fnm-pinned shim — v22.22.0**) → (2) `C:\Program Files\nodejs\node.exe` (Windows installer copy — version drift risk) |
| **gh** | (1) `Z:\claude-sota-installed\.local\bin\gh.exe` (**Z:-portable copy, 2.92.0**) → (2) `C:\Program Files\GitHub CLI\gh.exe` (system installer) |
| **rg** | (1) `C:\Users\42\AppData\Local\Microsoft\WinGet\Links\rg.exe` (**winget — 15.1.0**) only |
| **codex** | (1) `Z:\claude-sota-installed\.local\npm\codex` + `.cmd` (**Z:-portable npm prefix, 0.130.0**) → (2) `C:\Users\42\AppData\Roaming\npm\codex` (user-global npm prefix — **also 0.130.0**, but PATH-order means upgrades to the user prefix wouldn't be picked up) |
| **claude** | (1) `Z:\claude-sota-installed\.local\bin\claude.exe` (**Z:-portable, 2.1.144**) → (2) `Z:\claude-sota-pure\.local\bin\claude.exe` (sibling) → (3) `C:\Users\42\.local\bin\claude.exe` (user) |
| **docker** | (1) `C:\Program Files\Docker\Docker\resources\bin\docker.exe` (single instance, Docker Desktop) |

### Findings

1. **Codex split-install risk**: PATH has both `Z:\claude-sota-installed\.local\npm\codex` AND `C:\Users\42\AppData\Roaming\npm\codex`. Running `npm i -g @openai/codex@latest` writes to **`%APPDATA%\npm`** (per `npm root -g` = `C:\Users\42\AppData\Roaming\npm\node_modules`) — but PATH resolves to the **`Z:\.local\npm`** copy first. **An upgrade via `npm -g` would silently NOT take effect.** This is a SEV-2-style stealth-staleness trap.
2. **node** has two installed copies but the fnm shim wins. If `Program Files\nodejs` ever drifts (system Windows installer), running `where.exe node` shows it but it would be unreachable except via absolute path. Cosmetic only today.
3. **Three claude.exe** locations on PATH — Z:-portable runtime, sibling clean-baseline runtime (`claude-sota-pure`), and user-home fallback. Operator already manages this deliberately; not a defect.
4. **PATH duplicates**: `C:\Program Files\PowerShell\7` appears **3 times**; `C:\Users\42\go\bin` appears **twice**. Cosmetic, but pollutes PATH length (Windows 8191-char ceiling — current ≈4700 chars, headroom OK).
5. `Z:\claude\.local\bin` (parent CCC harness, per CLAUDE.local.md "untouched") is on PATH — explicitly fine, but a place to look if "wrong claude binary" symptoms ever surface.

---

## 4. SOTA Gaps — Features Available, Not Used

### Node.js 22.22.x LTS ("Jod") — features the runtime under-uses

Per `https://nodejs.org/api/` and Node 22 release notes:

| Feature | Status in CC-runtime use | Recommendation |
|---|---|---|
| `node --test` native runner | Some tests still use jest/vitest harnesses despite Node 22 native `node --test` going stable | Migrate plugin/hook tests to native runner for zero-dep CI |
| `--experimental-strip-types` (TypeScript w/o transpile) | Stable in Node 22.6+ as `--experimental-strip-types`; **22.18+ ON BY DEFAULT** | Hook scripts could be authored in TS without ts-node/tsx |
| `--env-file` (.env loader) | Stable in Node 22.10+ | Replace dotenv dep in hook scripts |
| Native `fetch` + `WebStreams` | Stable since Node 18 | Already widely used; verify no `node-fetch` lingering in plugins |
| `node --watch` (built-in nodemon) | Stable | Replace any `nodemon` dev-deps |
| `AbortSignal.timeout(ms)` | Stable | Replace ad-hoc setTimeout-cancel patterns |
| **Permission model** `--experimental-permission` | Experimental, security-critical | NOT to be enabled by default but worth evaluating for hook sandbox |
| `import.meta.dirname` / `import.meta.filename` | Stable Node 21.2+ | Replaces `__dirname` polyfills in ESM |

### Node 26.x Current — not recommended for this runtime

Node 26.1.0 is the **Current** line — not LTS. Per `https://nodejs.org/en/about/previous-releases` LTS-only policy; **22.x LTS ("Jod") is the right pin** until 24.x enters LTS (Oct 2026). No action needed; stay on 22.x line.

### Critical patch — Node 22.22.0 → 22.22.3

Current LTS head is **22.22.3** (2026-05-13). We're on **22.22.0** = 3 patch versions behind. Patch releases typically carry crypto/openssl/undici security fixes. **Highest-priority upgrade in this audit** (low-risk patch, security-relevant).

### npm 11.9.0 → 11.14.1

5-minor delta. npm changelog at `https://github.com/npm/cli/releases` lists workspace bug fixes + provenance improvements. Bundled with Node install — upgrade by reinstalling Node 22.22.3 (which ships npm 11.x), or `npm i -g npm@latest`.

### Git 2.51 → 2.54

3-minor delta. `git switch -c` / `git restore` already stable. 2.52+ adds `git replay`, 2.53 improved `git maintenance`, 2.54 includes additional reftable improvements and security patches (per `https://github.com/git/git/blob/master/Documentation/RelNotes/`). Worth scheduling.

### uv 0.10.3 → 0.11.15

12 minor versions behind. uv evolves fast; 0.11.x adds workspace improvements, pylock.toml support, more lockfile flags. `uv self update` upgrades in place.

### Codex 0.130.0 → 0.131.0

Single-minor delta. Per OpenAI codex release-notes pattern (small increments, fast cadence). Operator's `codex@openai-codex` plugin pin should track this.

### Claude Code 2.1.144 → 2.1.145

Single-patch delta, released today. Self-update via `claude /update` per Anthropic docs.

### PowerShell, ripgrep, gh, Docker — all current

No upgrade work. PowerShell 7.6.1 is the May-2026 latest. ripgrep 15.1.0 is the Oct-2025 latest (slow cadence, that's normal). gh 2.92.0 is current. Docker 29.4.3 client/server match.

---

## 5. Upgrade Plan (Proposal Only — Ranked by Risk-Adjusted Value)

| Priority | Tool | Action | Risk | Rationale |
|---|---|---|---|---|
| **P0** | **Node 22.22.0 → 22.22.3** | fnm install 22.22.3 && fnm use 22.22.3 | Low (patch within LTS line) | Security patches; foundational |
| **P0** | **Claude Code 2.1.144 → 2.1.145** | `claude /update` | Low (1 PATCH) | Trivial; runtime tooling |
| **P1** | **codex 0.130.0 → 0.131.0** | `npm i -g @openai/codex@latest` **into BOTH** Z:-portable npm prefix AND `%APPDATA%\npm`, OR consolidate to one prefix first | Medium (PATH-shadow trap §3.1) | Reviewer-model CLI; staleness compounds |
| **P1** | **npm 11.9.0 → 11.14.1** | `npm i -g npm@latest` | Low | Comes free with Node 22.22.3 reinstall |
| **P1** | **uv 0.10.3 → 0.11.15** | `uv self update` | Low (additive minors) | Many features queued behind |
| **P2** | **Git 2.51 → 2.54** | Git-for-Windows installer (interactive) | Medium (Windows installer, signs Git Bash) | Worth a wave; not urgent |
| **P2** | **MAJOR npm globals** (commitlint 20→21, pnpm 10→11, chrome-devtools-mcp 0.x→1.0, ccusage 18→19, mem0 0.x→1.0, happy-coder 0.x→1.x, claude-agent-sdk 0.2→0.3) | Per-package after reading each CHANGELOG/BREAKING.md | Medium-High (MAJORs ship breaking changes) | Stage one-at-a-time; don't bulk |
| **P3** | **Minor/Patch npm globals** (~25 packages) | `npm update -g` (npm's built-in bulk update — only touches semver-compat) | Low | Sweeps patches/minors safely |
| **P4** | **Consolidate codex install paths** | Delete `Z:\claude-sota-installed\.local\npm\codex*` OR delete `%APPDATA%\npm\codex*`; pick one prefix; document in CLAUDE.local.md | Low | Prevents §3.1 stealth-staleness |
| **P5** | **De-duplicate PATH** | Remove redundant `PowerShell\7` (×3 → ×1) and `go\bin` (×2 → ×1) entries via System Properties → Env Vars | Low | Cosmetic; PATH-length hygiene |
| **P6** | **Adopt Node 22 native test runner / `--env-file` / `--strip-types`** | Refactor hook scripts case-by-case | Low (additive) | Reduces dep surface (drop dotenv, tsx, jest in tooling paths) |

**Bundle suggestion**: P0+P1 in one upgrade-wave (Node patch + CC patch + codex minor + npm minor + uv minor = ~15 min). P2 MAJORs need their own wave with per-package CHANGELOG review.

---

## 6. Cite Anchors

- **Probe outputs** (this session, 2026-05-19):
  - `node --version` → `v22.22.0` · `node -e "console.log(process.versions)"` → full version block
  - `npm --version` → `11.9.0` · `npm root -g` → `C:\Users\42\AppData\Roaming\npm\node_modules`
  - `$PSVersionTable` → `PSVersion=7.6.1, PSEdition=Core`
  - `& 'C:/Program Files/Git/bin/bash.exe' --version` → `GNU bash, version 5.2.37(1)-release (x86_64-pc-msys)`
  - `& 'Z:/venvs/claude/Scripts/python.exe' --version` → `Python 3.13.12`
  - `uv --version` → `uv 0.10.3 (c75a0c625 2026-02-16)`
  - `git --version` → `git version 2.51.0.windows.2`
  - `gh --version` → `gh version 2.92.0 (2026-04-28)` (cite: `https://github.com/cli/cli/releases/tag/v2.92.0`)
  - `rg --version` → `ripgrep 15.1.0 (rev af60c2de9d)` PCRE2+SIMD
  - `docker --version` / `docker info --format '{{.ServerVersion}}'` → client 29.4.3 / server 29.4.3
  - `claude --version` → `2.1.144 (Claude Code)`
  - `codex --version` → `codex-cli 0.130.0`

- **GitHub Releases API queries** (this session, via `gh api`):
  - `repos/nodejs/node/releases/latest` → `v26.1.0` (Current, 2026-05-07)
  - `repos/nodejs/node/releases` filtered `v22.*` → **`v22.22.3 'Jod' (LTS)`** (2026-05-13) ← canonical LTS head
  - `repos/npm/cli/releases/latest` → `v11.14.1` (2026-05-08)
  - `repos/cli/cli/releases/latest` → `v2.92.0` (2026-04-28)
  - `repos/BurntSushi/ripgrep/releases/latest` → `15.1.0` (2025-10-22)
  - `repos/PowerShell/PowerShell/releases/latest` → `v7.6.1` (2026-04-21)
  - `repos/git-for-windows/git/releases/latest` → `v2.54.0.windows.1` (2026-04-20)
  - `repos/astral-sh/uv/releases/latest` → `0.11.15` (2026-05-18)
  - `npm view @anthropic-ai/claude-code version` → `2.1.144` cached / `2.1.145` released 2026-05-19T17:40:52Z
  - `repos/nodejs/node/security-advisories?per_page=5` → `[]` (no current open advisories on node repo's GHSA list — does **not** mean no historical CVEs; check `https://nodejs.org/en/blog/vulnerability` for the canonical advisory feed before any production upgrade)

- **Anthropic & official docs**:
  - Node 22 LTS schedule: `https://nodejs.org/en/about/previous-releases` (LTS "Jod" line)
  - Node 22 `--experimental-strip-types` default-on (22.18+): `https://nodejs.org/api/typescript.html`
  - Node 22 native test runner: `https://nodejs.org/api/test.html`
  - npm CLI changelog: `https://github.com/npm/cli/releases`
  - gh 2.92.0 release notes: `https://github.com/cli/cli/releases/tag/v2.92.0`
  - PowerShell 7.6 changelog: `https://github.com/PowerShell/PowerShell/releases/tag/v7.6.1`
  - Git release notes: `https://github.com/git/git/tree/master/Documentation/RelNotes`
  - uv release notes: `https://github.com/astral-sh/uv/releases`
  - Claude Code release cadence (npm view time tail): patch every ~1-2 days

- **CLAUDE.md / CLAUDE.local.md anchors**:
  - CLAUDE.md L36: Docker observation (com.docker.backend.exe :17040) — corroborated here by `docker info` returning 29.4.3 server
  - CLAUDE.local.md "Environment" block: Python venv at `Z:\venvs\claude` Py 3.13.12 ← confirmed by probe
  - CLAUDE.local.md "Shell" block: Git Bash at `C:\Program Files\Git\bin\bash.exe` ← confirmed by probe (Git 2.51 + bash 5.2.37)
