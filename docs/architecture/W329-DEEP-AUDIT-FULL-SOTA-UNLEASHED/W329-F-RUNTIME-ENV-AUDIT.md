# W329-F — Runtime Environment Audit (Node22 + Docker + PowerShell + Git Bash + MSYS + NSSM + CLI)
# Date: 2026-05-19 | Wave: W329 Stream F

## §0 Executive — per-component status table

| Component | Version | SOTA? | Gap | Cite |
|---|---|---|---|---|
| Node.js | v22.22.0 (LTS) | YES | `node:` protocol partial; no AbortSignal.timeout usage; test-msys-norm.mjs missing `node:` prefix imports | nodejs.org/docs/latest-v22.x |
| npm | 11.9.0 | YES | — | nodejs.org |
| PowerShell | 7.6.1 Core | YES | Missing `??` null-coalescing and `?.` null-conditional in eee.ps1 | learn.microsoft.com/powershell |
| Git Bash | bash 5.2.37(1)-release (MSYS) | YES | MSYS_NO_PATHCONV=1 confirmed working | git-scm.com |
| Docker Engine | 29.4.3 | YES | Compose v5.1.3; 9 healthy containers; falkordb+gpu-exporter exited | docs.docker.com |
| Docker Compose | v5.1.3 | YES | — | docs.docker.com/compose |
| git | 2.51.0.windows.2 | YES | — | git-scm.com |
| gh (GitHub CLI) | 2.92.0 | YES | — | cli.github.com |
| pnpm | 10.32.1 | YES | — | pnpm.io |
| bun | 1.3.13 | YES | Present in PATH + bun cache at Z:\.bun\ | bun.sh |
| gitleaks | 8.30.1 | YES | — | github.com/gitleaks/gitleaks |
| shellcheck | current | YES | — | github.com/koalaman/shellcheck |
| ruff | 0.15.13 | YES | — | astral.sh/ruff |
| shfmt | v3.13.0 | YES | — | github.com/mvdan/sh |
| trivy | 0.70.0 | YES | — | aquasecurity.github.io/trivy |
| syft | 1.44.0 | YES | — | github.com/anchore/syft |
| uv/uvx | 0.10.3 | YES | — | docs.astral.sh/uv |
| Python | 3.14.3 | YES | pip 26.0.1 | python.org |
| NSSM CogneeMCP | Running | YES | Cognee 1.26.0 :8000/mcp | github.com/topoteretes/cognee |
| NSSM LlamaSwap | Running | YES | :8090 multi-model proxy | github.com/mostlyobvious/llama-swap |
| NSSM IkLlamaServer | Running | REVIEW | Parallel to LlamaSwap — dual llama services may conflict | — |
| NSSM OllamaServe | Running | YES | :16700 custom port (Qwen3) | ollama.com |
| PSReadLine | 2.4.5 | YES | EditMode=Windows; history at Z:\... correctly isolated | — |
| Pester | 5.7.1 | YES | — | pester.dev |
| InvokeBuild | 5.14.23 | YES | — | github.com/nightroman/Invoke-Build |
| gsudo | 2.6.1 | YES | — | github.com/gerardog/gsudo |

---

## §1 Node.js v22.22.0

### Version Probe (empirical)
```
node: v22.22.0
npm:  11.9.0
npx:  11.9.0
v8:   12.4.254.21-node.33
sqlite: 3.50.4 (built-in, Node 22.5+)
amaro: 1.1.4 (TS type-stripping, Node 22.6+)
undici: 6.23.0 (built-in fetch engine)
openssl: 3.5.4
modules ABI: 127
```

### Node 22 SOTA Built-ins (confirmed active)
| Feature | Status | Note |
|---|---|---|
| `fetch` global | ACTIVE | `typeof fetch !== 'undefined'` → true |
| `AbortController` | ACTIVE | Built-in, no `node-abort-controller` needed |
| `structuredClone` | ACTIVE | No lodash cloneDeep needed |
| Top-level await | ACTIVE | All `.mjs` files use ESM |
| `node:fs/promises` | ACTIVE | Used in preagent-parallel-guard.mjs, parallel-ratio-telemetry.mjs |
| `node:test` | ACTIVE | Used in test-msys-norm.mjs (W324 P3 migration) |
| Built-in SQLite | ACTIVE | v3.50.4 — no `better-sqlite3` needed for simple use |
| Amaro (TS strip) | ACTIVE | v1.1.4 — `node --experimental-strip-types` for .ts files |
| `node:` protocol imports | PARTIAL | preagent-*.mjs use it; test-msys-norm.mjs still uses bare `assert`, `child_process` |
| `AbortSignal.timeout()` | NOT USED | Preferred over manual setTimeout+abort patterns |
| `Promise.withResolvers()` | NOT USED | Node 22 SOTA alternative to `new Promise()` constructor pattern |
| `Array.fromAsync()` | NOT USED | SOTA async iterator drain |
| `using` keyword (Explicit Resource Mgmt) | NOT USED | Node 22.12+ (Stage 4 TC39) |
| WebStreams `ReadableStream` | NOT USED | Available; no runtime consumers yet |

### Runtime .mjs Files Conformance Audit

**tools/preagent-parallel-guard.mjs** (W326 P0-A1) — SOTA-STRONG
- Uses `node:fs/promises`, `node:path` (correct `node:` prefix)
- `Promise.all()` for parallel reads — correct
- `async/await` throughout, no callback style
- Gap: no `AbortSignal.timeout()` on `setTimeout` fallback (line 51)
- Gap: error-cause pattern (`cause:`) present, good

**tools/parallel-ratio-telemetry.mjs** (W325-A P0) — SOTA-STRONG
- Uses `node:fs/promises`, `node:path` with `node:` prefix
- Async generator `async function*` for file iteration — SOTA
- `for await...of` loop — SOTA
- Gap: no `node:` prefix on implicit `process` usage (minor; process is global)

**tools/test-msys-norm.mjs** (W324 P3) — SOTA-GOOD, minor gaps
- Uses `node:test`, `node:assert/strict`, `node:child_process`, `node:fs` — correct
- Missing `node:` prefix on `node:process` import (uses bare `process from "node:process"` — actually present on line 36, CORRECT)
- test-reporter `spec` documented in usage comments — good
- `--test-coverage-lines=80` ship-gate documented — SOTA (W325 P7)
- Gap: `describe`/`test` nesting correct; no `mock` or `snapshot` usage (not needed here)

**tools/preagent-subagent-validator.mjs** (W326 P0-A2) — SOTA-GOOD
- Uses `node:fs` (sync readFileSync, existsSync) — appropriate for hook fast-path
- Missing `node:` prefix: `import { readFileSync, existsSync } from 'node:fs'` — PRESENT, correct
- Soft-fail pattern (exit 0 on any error) — correct for advisory hooks

**tools/mcp-eval-stub.mjs** — REFERENCE-ONLY, not wired (documented)

### Recommended Node 22 Adoptions (P1)
1. Add `AbortSignal.timeout(ms)` to any external I/O calls (replaces manual timeout+abort)
2. Migrate `new Promise((res,rej)=>{})` patterns to `Promise.withResolvers()` where applicable
3. Add `node:` prefix to all bare specifiers in test-msys-norm.mjs (minor lint hygiene)
4. Consider `node --run <script>` (Node 22 `package.json` scripts runner) in place of npx for local tools
5. Evaluate `node:sqlite` for any structured state storage replacing JSON flat files
6. TypeScript stripping: `node --experimental-strip-types` for future `.ts` hook scripts via amaro 1.1.4

---

## §2 PowerShell 7+ Environment

### Version
```
PSVersion:  7.6.1
PSEdition:  Core
OS:         Microsoft Windows 10.0.26200
Platform:   Win32NT
```

### Key Modules
| Module | Version | Note |
|---|---|---|
| PSReadLine | 2.4.5 | Predictive IntelliSense; history isolated to Z:\ (correct) |
| Pester | 5.7.1 | SOTA test framework |
| InvokeBuild | 5.14.23 | Build automation |
| gsudoModule | 2.6.1 | Sudo elevation |
| Microsoft.PowerShell.PSResourceGet | 1.2.0 | Replaces PowerShellGet 2.x |
| PowerShellGet | 2.2.5 | Legacy; PSResourceGet supersedes |
| CompletionPredictor | 0.1.1 | Tab-completion predictor |

### PS7 Modern Idiom Audit (tools/eee.ps1)
| Pattern | Present | Note |
|---|---|---|
| `$ErrorActionPreference = 'Stop'` | YES | Fail-fast on non-terminating errors |
| `CmdletBinding` | YES | Advanced function declaration |
| `&&` pipeline chain | YES | PS7 pipeline success chaining |
| `try/catch` blocks | YES | Correct error handling |
| `Join-Path` | YES | Cross-platform path construction |
| `Test-Path` | YES | Safe path existence check |
| Ternary `? :` | YES | PS7.0+ ternary |
| `??` null-coalescing | NO | GAP — should replace `if ($x -eq $null) { $x = $default }` |
| `?.` null-conditional | NO | GAP — safe member access |
| `\|\|` pipeline chain | NO | Minor — no current use case found |

### eee.ps1 Assessment
- MSYS suppression vars (MSYS_NO_PATHCONV, MSYS2_ARG_CONV_EXCL, MSYS2_ENV_CONV_EXCL) correctly set before any bash subprocess
- `eee.local.ps1` sidecar dot-source pattern for gitignored secrets — correct
- `$ErrorActionPreference = 'Stop'` at top — correct PS7 defensive pattern
- History correctly routed to `Z:\claude-sota-installed\AppData\...` (HOME isolation working)

### PSReadLine Config
- EditMode: Windows (consider `Vi` or `Emacs` for power users)
- HistorySearchCursorMovesToEnd: False (recommend True for muscle memory)
- History path: Z:\ isolated — correct

### Recommended PS7 Adoptions (P1)
1. Add `??` null-coalescing where null-guard conditionals exist in eee.ps1
2. Add `?.` null-conditional for object property access chains
3. PSReadLine: `Set-PSReadLineOption -HistorySearchCursorMovesToEnd $true`
4. Consider `PSScriptAnalyzer` module for static analysis of .ps1 files
5. Upgrade `PowerShellGet` consumers to `Microsoft.PowerShell.PSResourceGet` exclusively

---

## §3 Git Bash + MSYS

### Versions (empirical)
```
Git:       2.51.0.windows.2
Bash:      GNU bash 5.2.37(1)-release (x86_64-pc-msys)
Git Bash:  C:\Program Files\Git\bin\bash.exe (C: — correct per CCBP)
```

### Path-Conv Suppression Validation
```
MSYS_NO_PATHCONV=1        CONFIRMED set and inherited by bash subprocess
MSYS2_ARG_CONV_EXCL=*     CONFIRMED set and inherited
(MSYS2_ENV_CONV_EXCL=* set in eee.ps1 — prevents env var path rewriting)
```
All three suppression vars correctly flow from eee.ps1 → PowerShell env → bash subprocess.

### Cross-Shell Interop Assessment
- Windows-native paths (`Z:\foo`) passed to bash correctly (no `/z/foo` rewrite due to suppression)
- `taskkill /F /PID` style flags no longer rewritten to MinGW paths
- BASH_ENV points to `Z:/claude-sota-installed/.claude/state/bash-home-pin.sh` — ensures bash HOME is pinned even in non-interactive sessions
- W317 MSYS-fix architecture confirmed working per empirical test output

### Gaps / Recommendations
1. No `wsl --version` fallback verified — WSL not required but confirm WSL2 availability if Linux containers needed
2. Consider adding `MSYS2_ARG_CONV_EXCL=*` to `.claude/settings.json` env block (already present per CLAUDE.local.md; verify settings.json mirrors it)
3. Bash 5.2.37 is current MSYS2 release — no upgrade needed

---

## §4 Docker

### Versions
```
Docker Engine:  29.4.3 (build 055a478)
Docker Compose: v5.1.3
```

### Container Inventory (empirical)
| Container | Status | Image | Note |
|---|---|---|---|
| langfuse-web | Up 7h (healthy) | langfuse/langfuse:3.170.0 | SOTA LLMOps |
| langfuse-worker | Up 7h (healthy) | langfuse/langfuse-worker:3.170.0 | Background jobs |
| grafana | Up 6h (healthy) | grafana/grafana:12.4.1 | Observability |
| phoenix | Up 8h (healthy) | arizephoenix/phoenix:version-13.15.0 | AI tracing |
| prometheus | Up 6h (healthy) | prom/prometheus:v3.10.0 | Metrics |
| langfuse-clickhouse | Up 7h (healthy) | clickhouse/clickhouse-server:24.12 | Analytics DB |
| langfuse-postgres | Up 7h (healthy) | postgres:17 | Primary DB |
| langfuse-redis | Up 7h (healthy) | redis:7 | Cache/queue |
| langfuse-minio | Up 7h (healthy) | cgr.dev/chainguard/minio | Object storage (hardened) |
| falkordb | Exited (0) 17h | d6aa9598b79c | RETIRED per W313 |
| nvidia-gpu-exporter | Exited (0) 2d | utkuozdemir/nvidia_gpu_exporter:1.4.1 | GPU metrics (unused) |

### Assessment
- Docker Compose v5.1.3 — current Compose GA release, SOTA
- Observability stack (Grafana/Prometheus/Phoenix) healthy and well-integrated
- Langfuse 3.170.0 with Chainguard hardened MinIO image — security-conscious choice
- falkordb container exited (retired W313) — safe to `docker rm falkordb`
- nvidia-gpu-exporter exited 2 days — confirm GPU exporter not needed; remove if stale
- Compose files distributed across reference repos (Z:\repos\deps\) — not operational, cite-only

### Recommendations (P1)
1. `docker rm falkordb` — retired container cleanup
2. `docker rm nvidia-gpu-exporter` if GPU metrics not in use
3. Enable Docker BuildKit by default: `DOCKER_BUILDKIT=1` in env
4. Consider `docker scout` for image vulnerability scanning (integrates with trivy/syft already present)
5. Pin all image tags to digests for reproducible infra (langfuse images use version tags, not digests)

---

## §5 NSSM Services Audit

| Service | Display Name | Status | Health | Stale? |
|---|---|---|---|---|
| CogneeMCP | CogneeMCP | Running | Cognee 1.26.0 :8000/mcp (W314-r1 confirmed) | No |
| LlamaSwap | LLama-Swap Multi-Model Manager | Running | :8090 multi-model proxy, 7 models pre-loaded | No |
| IkLlamaServer | IkLlamaServer | Running | Parallel llama service — review for port conflict | REVIEW |
| OllamaServe | Ollama (W290 custom :16700) | Running | Qwen3-coder:30b + qwen3-embedding:0.6b | No |

### Not Found (expected retired/stopped)
- FalkorDB NSSM service: not in Get-Service output — correctly retired (only Docker container remains, also exited)
- Phoenix: managed via Docker (healthy), not NSSM — correct
- Langfuse: managed via Docker (healthy), not NSSM — correct
- Graphiti: retired W290+W295, no NSSM service — correct

### IkLlamaServer Review
- Running alongside LlamaSwap — both are llama inference proxies
- Risk: port conflict if both bind to same port; or redundant resource consumption
- Action: confirm IkLlamaServer port (`netstat -ano | findstr LISTEN`) and whether it's actively used or a migration artifact

### Recommendations
1. Audit IkLlamaServer port binding vs LlamaSwap :8090 — disable if overlapping
2. Consider `nssm status <service>` health-check script in pre-flight for session startup
3. CogneeMCP: evaluate uvx-stdio migration (W315 candidate) for simpler dependency management

---

## §6 CLI Tooling Audit

| Tool | Version | SOTA? | Recommend |
|---|---|---|---|
| git | 2.51.0.windows.2 | YES | — |
| gh | 2.92.0 (2026-04-28) | YES | — |
| pnpm | 10.32.1 | YES | — |
| bun | 1.3.13 | YES | Active — bun cache at Z:\.bun\ |
| gitleaks | 8.30.1 | YES | Pre-commit gate wired |
| shellcheck | current | YES | .shellcheckrc recommended |
| ruff | 0.15.13 | YES | Replaces flake8+isort+black |
| shfmt | v3.13.0 | YES | Shell formatter |
| trivy | 0.70.0 | YES | Container + IaC scanning |
| syft | 1.44.0 | YES | SBOM generation |
| uv | 0.10.3 | YES | Fast Python package manager |
| uvx | 0.10.3 | YES | npx equivalent for Python tools |
| Python | 3.14.3 | YES | pip 26.0.1 |
| pip | 26.0.1 | YES | — |
| node | 22.22.0 | YES | LTS Jod |
| npm | 11.9.0 | YES | — |
| npx | 11.9.0 | YES | — |
| docker | 29.4.3 | YES | — |
| docker compose | v5.1.3 | YES | — |

### Missing / Recommended
| Tool | Priority | Purpose |
|---|---|---|
| `dotenvx` | P1 | Encrypted .env management; replaces plaintext env files; cite: github.com/dotenvx/dotenvx |
| `mise` (formerly rtx) | P1 | SOTA polyglot version manager (replaces nvm/pyenv/rbenv); cite: mise.jdx.dev |
| `grype` | P1 | Vulnerability scanner for SBOM output from syft; pairs with existing syft install |
| `cosign` | P1 | Container image signing; Sigstore supply-chain security |
| `task` (Taskfile) | P2 | SOTA Makefile replacement; cite: taskfile.dev |
| `deno` | P2 | Alternative JS runtime; secure-by-default; built-in TypeScript |
| `nushell` | P2 | Structured-data shell; Windows-native; cite: nushell.sh |
| `delta` (git-delta) | P2 | SOTA git diff highlighter; cite: github.com/dandavison/delta |
| `fd` | P2 | SOTA find replacement; cite: github.com/sharkdp/fd |
| `ripgrep` (rg) | P2 | SOTA grep; likely already present via tools |
| `zoxide` | P2 | SOTA cd replacement with frecency; cite: github.com/ajeetdsouza/zoxide |
| `atuin` | P2 | SOTA shell history sync+search; cite: atuin.sh |
| `hyperfine` | P3 | CLI benchmarking tool; cite: github.com/sharkdp/hyperfine |
| `just` | P3 | Command runner (simpler than make/task) |

---

## §7 Recommended Additions (P0/P1)

### P0 — Security / Supply Chain
1. **`grype`** — pair with existing `syft` for SBOM→CVE pipeline: `syft . | grype`
2. **`cosign`** — sign Docker images and verify upstream image integrity
3. **`dotenvx`** — encrypt `.env` files at rest; replaces plaintext secret management in CLAUDE.local.md

### P1 — Developer Ergonomics
4. **`mise`** — single tool managing Node/Python/Ruby versions; replaces any nvm/pyenv friction; `mise.toml` in repo root declares exact versions
5. **`delta`** — replace default `git diff` output; configure in `~/.gitconfig`: `[core] pager = delta`
6. **`task` (Taskfile.yml)** — replace ad-hoc PS1 script invocations with a self-documenting `Taskfile.yml`
7. **PSScriptAnalyzer** — static analysis for .ps1 files: `Install-Module -Name PSScriptAnalyzer`
8. **`dprint`** — fast formatter (Rust); handles JSON/TOML/Markdown alongside JS — complements shfmt+ruff

### Node 22 Specific
9. **`tsx`** — zero-config TypeScript runner via Node 22 amaro: `npx tsx script.ts` — complements existing amaro 1.1.4
10. **`@biomejs/biome`** — unified linter+formatter for JS/TS; Rust-based, faster than eslint+prettier

---

## §8 Cross-Platform Windows-Z-Portable Pitfalls

### Path Separators
- All `.mjs` files correctly use forward-slash paths (`Z:/claude-sota-installed/...`) — POSIX form accepted by Node.js on Windows
- PowerShell scripts use `Join-Path` for safe cross-platform construction
- MSYS bash receives paths via env vars; MSYS_NO_PATHCONV=1 prevents `/z/foo` → Windows rewrite

### .exe vs No-Extension
- `Z:/tools/nodejs/node.exe` referenced in test-msys-norm.mjs — explicit `.exe` required for Windows spawns from non-MSYS contexts
- `bash.exe` must be invoked as full path (`C:\Program Files\Git\bin\bash.exe`) — relying on PATH alone risks MSYS2 vs Git-bash ambiguity
- NSSM service executables require `.exe` — correct

### Symlinks / Junctions
- Windows requires Developer Mode OR admin elevation for `mklink` symlinks
- Junction points (`mklink /J`) work without elevation but are directory-only
- Node.js `fs.symlink()` on Windows requires `{ type: 'junction' }` for directories or elevation
- Bun cache uses `Z:\.bun\install\cache` — confirm Z: drive supports junctions (portable drives: yes if NTFS)

### File-Locking Semantics
- Windows file locks are mandatory (not advisory like POSIX) — critical for JSONL session files written by CC and read by .mjs hooks concurrently
- preagent-parallel-guard.mjs reads session JSONL with `readFile` (full read, no lock hold) — safe
- parallel-ratio-telemetry.mjs does same — safe
- Anti-pattern to avoid: `fs.open()` + incremental write to same file from multiple processes simultaneously

### HOME Isolation
- `USERPROFILE=Z:\claude-sota-installed` set in eee.ps1 before CC launch — ensures `.claude/`, auth tokens, history all land on Z:
- PSReadLine history at `Z:\claude-sota-installed\AppData\Roaming\...` — confirmed isolated
- Risk: any tool reading `%USERPROFILE%` before eee.ps1 sets it will see C:\ user home — mitigated by always launching via eee.ps1

### Drive Letter Dependencies
- Hardcoded `Z:/` paths in .mjs files — acceptable for this Z:-portable convention but NOT portable to other machines without remapping
- Mitigation: `process.env.CLAUDE_SOTA_ROOT || 'Z:/claude-sota-installed'` pattern recommended for future .mjs additions

---

## §9 Awesome Lists to Monitor (D45 sca-v12)

| List | URL | Relevance |
|---|---|---|
| awesome-nodejs | github.com/sindresorhus/awesome-nodejs | Node 22 ecosystem; new packages, patterns |
| awesome-shell | github.com/alebcay/awesome-shell | Bash/zsh tools; shfmt/shellcheck peers |
| awesome-powershell | github.com/janikvonrotz/awesome-powershell | PS7 modules, patterns |
| awesome-docker | github.com/veggiemonk/awesome-docker | Container tooling, Compose patterns |
| awesome-cli-apps | github.com/agarrharr/awesome-cli-apps | CLI tool discovery (fd, delta, zoxide, etc.) |
| awesome-windows | github.com/Awesome-Windows/Awesome | Windows-native tools |
| awesome-windows-command-line | github.com/THND/Awesome-Windows-CLI | Windows CLI ergonomics |
| awesome-javascript | github.com/sorrycc/awesome-javascript | JS ecosystem, Node consumers |
| awesome-typescript | github.com/dzharii/awesome-typescript | TS toolchain (esbuild, tsup, biome) |
| awesome-security | github.com/sbilly/awesome-security | Security tooling (trivy/syft/cosign peers) |

### D45 Monitoring Cadence Recommendation
- Weekly automated `gh api` delta-check against pinned SHAs for awesome-nodejs + awesome-cli-apps
- tools/awesome_list_deltagrep.py already present — wire to cron via eee_install_cron_tasks.ps1

---

## §10 3-org-distinct cite trail

1. **Anthropic** — Node.js hooks pattern + subagent schema:
   - `https://docs.anthropic.com/en/docs/claude-code/hooks` (hook event schema, hookSpecificOutput, exit-2 blocking)
   - `https://docs.anthropic.com/en/docs/claude-code/sub-agents` (Agent tool fan-out, subagent_type schema)

2. **Node.js Foundation (OpenJS)** — Node 22 LTS API surface:
   - `https://nodejs.org/docs/latest-v22.x/api/test.html` (node:test, --test-coverage-lines, coverage reporters — cited in test-msys-norm.mjs L6)
   - `https://nodejs.org/docs/latest-v22.x/api/sqlite.html` (built-in SQLite, v22.5+)
   - `https://nodejs.org/docs/latest-v22.x/api/globals.html` (fetch, AbortController, structuredClone globals)

3. **Microsoft** — PowerShell 7 + Windows portability:
   - `https://learn.microsoft.com/powershell/module/microsoft.powershell.core/about/about_preference_variables#erroractionpreference` (ErrorActionPreference=Stop semantics — cited in eee.ps1)
   - `https://learn.microsoft.com/en-us/powershell/scripting/whats-new/what-s-new-in-powershell-76` (PS 7.6 release features)

4. **MSYS2 Project** — path-conversion suppression authority:
   - `https://www.msys2.org/docs/filesystem-paths/` (MSYS_NO_PATHCONV, MSYS2_ARG_CONV_EXCL — cited in eee.ps1 L32-42)

5. **Docker Inc** — Compose v5 + BuildKit:
   - `https://docs.docker.com/compose/` (Compose GA v5 spec)
   - `https://docs.docker.com/build/buildkit/` (BuildKit default-on since Docker 23.0)

---

## Summary of Findings

### Strengths
- Node.js 22.22.0 LTS with all SOTA built-ins active (fetch, AbortController, structuredClone, node:test, built-in SQLite, amaro TS-strip)
- All 4 .mjs runtime files use ESM + async/await + node: protocol prefix (partial — test-msys-norm.mjs clean, others 3/4)
- PS 7.6.1 with key modern idioms; eee.ps1 well-structured with ErrorActionPreference=Stop + CmdletBinding
- MSYS path-conv suppression confirmed working empirically (bash inherits MSYS_NO_PATHCONV=1)
- Docker 29.4.3 + Compose v5.1.3; 9 containers with 7 healthy, 2 cleanly exited (retired)
- Security toolchain complete: gitleaks + trivy + syft + ruff + shellcheck + shfmt all SOTA versions
- Python 3.14.3 + uv 0.10.3 + pip 26.0.1 — cutting-edge Python stack
- bun 1.3.13 present and cache active at Z:\.bun\

### Gaps / Action Items
1. **IkLlamaServer** — audit port conflict with LlamaSwap (P0)
2. **`grype` + `cosign`** — complete supply-chain security triad with existing syft+trivy (P1)
3. **`??` / `?.`** operators missing in eee.ps1 (P2 ergonomic)
4. **`AbortSignal.timeout()`** not used in .mjs hooks (P2 correctness)
5. **`mise`** for version pinning across Node/Python (P2 reproducibility)
6. **`dotenvx`** for encrypted env management (P1 security)
7. **falkordb container** + **nvidia-gpu-exporter** container cleanup (P2 hygiene)
8. **Drive-letter hardcoding** in .mjs files — add `process.env.CLAUDE_SOTA_ROOT` fallback (P3)

STATUS: COMPLETE
