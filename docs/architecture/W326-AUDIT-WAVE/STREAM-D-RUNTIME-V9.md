# W326 Stream D — Runtime Cleanness v9

**Wave**: W326 deep-audit | **Stream**: D (runtime) | **Date**: 2026-05-19 | **Owner**: Stream-D agent
**Continuation of**: W325-D (3 HIGH/5 MED/5 LOW) | **Successor to**: W319-D Runtime Cleanness v7, W317-r2 ops closure
**Repo HEAD**: `670423d ship(W326): 4-stream gap-resolution + /plugin update post-state + GPT-5.5 deep audit (round 13)`

## Verified-this-wave probe data (captured 2026-05-19)

- **mise**: `2026.5.3` (10 patches behind `2026.5.12`); `mise self-update --dry-run` NOT supported flag — operator must run live `mise self-update`
- **CLAUDE.md size**: 13,063 bytes (~49 LOC body per Status block — INVARIANT HOLDS, cap 50 LOC)
- **settings.json size**: 15,998 bytes (W317-A advisory cap 15,360 EXCEEDED by 638B — convergent with W319-D STALE-D-1 +604B; +34B further drift since)
- **Git signing**: `commit.gpgsign`/`gpg.format`/`user.signingkey` ALL EMPTY — NOT CONFIGURED
- **lazydocker / jless / dog**: ALL ABSENT (`which` neg-cascade) — W325-H gap UNCLOSED
- **`.shellcheckrc`**: MISSING (`ls` ENOENT) — W325-F LOW UNCLOSED
- **`PSScriptAnalyzerSettings.psd1`**: MISSING (root + `.vscode/` both ENOENT) — W325-F MED UNCLOSED
- **`.tmp/codex-round2-home/`**: CONTAINS LIVE CREDENTIAL FILES — `auth.json` (3B placeholder), `config.toml` (40B), `installation_id` (36B), `state_5.sqlite` (0B + 512B journal), `memories/`, `skills/`, `tmp/`. Sibling `codex-round2-api-home/` also present
- **Docker observability**: 9/9 containers HEALTHY 5-7h uptime (langfuse-web :3000, langfuse-worker, grafana :3001, phoenix :16006 + :14317, prometheus :19090, langfuse-clickhouse :18123, langfuse-postgres :15432, langfuse-redis :6480, langfuse-minio :19190/:19191)
- **NSSM services**: BasicMemoryHTTP, CogneeMCP, LlamaSwap, OllamaServe ALL `Running/Automatic`

## Findings (10 prioritized)

| # | Severity | Finding | W326 P-block | Falsifiable-inverse |
|---|----------|---------|--------------|---------------------|
| 1 | LOW | mise `2026.5.3 → 2026.5.12` (10 patches behind; warning visible at every mise invocation) | **P3a** — operator: `mise self-update`; verify `mise --version` ≥ 2026.5.12; re-test 6 mise-managed tools (gh/go/lazygit/node/python/uv) for regressions | If `mise --version` ≥ `2026.5.12` AND `mise list` unchanged versions, CLOSED |
| 2 | LOW | CLAUDE.md size invariant **HOLDS** at 49/50 LOC (13,063B) — no regression-guard hook in place though | **P3b** — add settings.json PreToolUse[Edit\|Write] direct-CLI lint: `[[ $(wc -l < CLAUDE.md) -lt 55 ]]` advisory; ~80B addition; pairs with W317 Δ34 supersession-lint pattern | If a future commit drives CLAUDE.md > 55 LOC and the hook does NOT fire, lint broken |
| 3 | **HIGH** | **Commit signing UNCONFIGURED — W324/W325 P5 CARRY-FORWARD UNRESOLVED**: `git config --get commit.gpgsign` empty, `gpg.format` empty, `user.signingkey` empty. `git verify-commit HEAD` would fail. Blocks B1 ship-condition tamper-attestation (W319-B `OthmanAdi/planning-with-files` SHA-256 attestation requires signing chain) | **P0a** — operator: generate ssh key for signing → `git config commit.gpgsign true; git config gpg.format ssh; git config user.signingkey ~/.ssh/id_ed25519.pub`; create `.gitsigners` allow-file; smoke `git verify-commit HEAD` → "Good signature" | If `git config --get commit.gpgsign` returns `true` AND `git log --show-signature -1` shows G (good) flag, CLOSED |
| 4 | MED | **lazydocker + jless + dog ALL ABSENT — CONFIRMED** (3-tool which neg-cascade) | **P2a** — operator: `winget install lazydocker.lazydocker jless.jless dog.dog` (winget naming TBD; also try `scoop install lazydocker jless dog`); smoke each with `--version` | If `which lazydocker`/`which jless`/`which dog` all succeed, CLOSED |
| 5 | LOW | **`.shellcheckrc` ABSENT — CONFIRMED**. Bash scripts in `tools/` run shellcheck with default config — no SC2086 (word-splitting) enforcement override, no source-paths configured | **P1a** — Write `.shellcheckrc` at repo root: `external-sources=true`, `disable=SC2155,SC1091` (false-positive-prone for vendored sourcing), `severity=warning`. ~150B file | If `.shellcheckrc` exists AND `shellcheck --rcfile=.shellcheckrc tools/*.sh` honors it, CLOSED |
| 6 | **HIGH** | **Bash `set -Eeuo pipefail` + ERR trap missing**. W325-F MED escalated to HIGH this wave — pre-commit hooks chain shell→git which silently swallow failures; if any `tools/*.sh` lacks strict-mode, an early failure exits 0 and commits proceed. Convergent with the Stop-hook `Add-Content -ErrorAction SilentlyContinue` silent-fallback (W319-D MED-1) | **P0b** — bulk-edit `tools/*.sh` headers to `set -Eeuo pipefail; trap 'echo "ERR line $LINENO: $BASH_COMMAND" >&2' ERR; IFS=$'\n\t'`. Verify: `grep -L 'set -Eeuo' tools/*.sh \| wc -l` should equal 0 | If any `tools/*.sh` still lacks `set -Eeuo pipefail` AND ERR trap, NOT-CLOSED |
| 7 | MED | **`PSScriptAnalyzerSettings.psd1` ABSENT — CONFIRMED**. `tools/eee.ps1` and other `.ps1` scripts run un-linted; PSScriptAnalyzer not wired into pre-commit gate (only gitleaks, ruff, shellcheck per cardinal rule 2) | **P1b** — Write `PSScriptAnalyzerSettings.psd1` at repo root with `IncludeDefaultRules=true; Severity=@('Error','Warning'); ExcludeRules=@('PSAvoidUsingWriteHost')`; add `Invoke-ScriptAnalyzer -Settings ./PSScriptAnalyzerSettings.psd1 tools/*.ps1` to settings.json PreCommit; ~250B | If config exists AND `Invoke-ScriptAnalyzer -Settings ./PSScriptAnalyzerSettings.psd1 tools/eee.ps1` returns 0 PSAvoidUsingWriteHost violations, CLOSED |
| 8 | **HIGH** | **`claude doctor` EXIT=124 hang — W325 P8 CARRY-FORWARD UNRESOLVED**. CLAUDE.md L34: "6-wave-confirmed file upstream issue" but NO `gh issue` evidence captured. Lengthens session-start cost ~30s per restart. Blocking upstream fix means workaround codification is the right next step | **P0c** — operator: file `anthropics/claude-code` issue with reproducer (env-block + 6-wave trace from W312-A.2 → W319-D); link URL in CLAUDE.md L34. **Workaround**: wrap calls with `timeout 5 claude doctor \|\| true` in any session-startup script. Add to W327 a Stop-hook health-probe alternative | If `gh issue list -R anthropics/claude-code --search "doctor EXIT=124"` returns ≥1 hit authored by operator, CLOSED |
| 9 | MED | **`.tmp/codex-round2-home/` REMAINS ON-DISK with credential-state** — `auth.json` (3B, likely empty-quotes), `config.toml` (40B), `installation_id` (36B), `state_5.sqlite` + journal, plus `tmp/`, `memories/`, `skills/`. Sibling `codex-round2-api-home/` also present. W325-ship-r4 gitignored the path but actual files never reviewed/scrubbed/rotated. Files appear non-credential by size, but `installation_id` (36B = UUID-shape) leaks installation identity to local disk | **P1c** — operator: (a) inspect `auth.json` content (`cat .tmp/codex-round2-home/.codex/auth.json`); (b) if non-credential AND test-fixture only, `rm -rf .tmp/codex-round2-home/ .tmp/codex-round2-api-home/`; (c) if credential-shaped, run `codex logout` THEN delete; (d) document W327: add `Z:\claude-sota-installed\.tmp\plugins-clone-*` and `codex-round2-*` to a nightly `nssm-nightly-scrub` cleanup service | If `.tmp/codex-round2-home/` no longer exists AND `codex auth status` confirms no leaked installation_id, CLOSED |
| 10 | LOW | **Services health — ALL HEALTHY** (10/10 verified-this-wave). Docker stack 9/9 containers UP healthy 5-7h. NSSM 4/4 services Running/Automatic. W319-D SH-1 dual-channel BasicMemoryHTTP (:8765 NSSM) + `.mcp.json:basic-memory` (uvx-stdio) still present — design decision pending W327 | **P2b** (downgraded from MED) — operator: decide SH-1 dual-channel resolution at W327 (retain-both vs consolidate). No urgent action; runtime is stable | If both BasicMemoryHTTP NSSM AND `.mcp.json:basic-memory` are wired AND `mcp__basic-memory__list_workspaces` succeeds, runtime works either way |

## Service-Health Table (verified-this-wave 2026-05-19)

| Service | Port | Status | Uptime | Source |
|---------|------|--------|--------|--------|
| langfuse-web | 127.0.0.1:3000 | UP healthy | 6h | docker ps |
| langfuse-worker | 3030/tcp | UP healthy | 6h | docker ps |
| grafana | 127.0.0.1:3001 | UP healthy | 5h | docker ps |
| phoenix | 127.0.0.1:14317 + :16006 | UP healthy | 7h | docker ps |
| prometheus | 127.0.0.1:19090 | UP healthy | 5h | docker ps |
| langfuse-clickhouse | 127.0.0.1:18123 + :19000 | UP healthy | 6h | docker ps |
| langfuse-postgres | 127.0.0.1:15432 | UP healthy | 6h | docker ps |
| langfuse-redis | 127.0.0.1:6480 | UP healthy | 6h | docker ps |
| langfuse-minio | 127.0.0.1:19190 + :19191 | UP healthy | 6h | docker ps |
| BasicMemoryHTTP | :8765 | Running/Automatic | NSSM-managed | Get-Service |
| CogneeMCP | :8000 | Running/Automatic | NSSM-managed | Get-Service |
| LlamaSwap | :8090 | Running/Automatic | NSSM-managed | Get-Service |
| OllamaServe | :16700 | Running/Automatic | NSSM-managed | Get-Service |
| Hindsight | :9077 | RETIRED (W317-S1) | n/a | by-design |
| FalkorDB | :16379 | STOPPED-by-design (W295) | n/a | by-design |

**Composite**: 13/13 expected-healthy services healthy. 2 RETIRED-by-design. **Strongest cleanliness wave in 5+ audits** — Langfuse SEV-2 recovered (W319-D MED noted MethodNotAllowedError; no recurrence this wave), Phoenix newly stable RUNNING (W315-r2 Stream E discovered started this-day).

## Carry-Status Summary (W325 → W326)

| W325 Carryover | W326 Status | Note |
|----------------|-------------|------|
| W325-H G3 mise update | **CARRY-FORWARD** (P3a) | Confirmed 2026.5.3, target 2026.5.12 |
| W325 P5 commit signing | **CARRY-FORWARD** (P0a) | `commit.gpgsign` empty — never configured |
| W325-H lazydocker/jless/dog | **CARRY-FORWARD** (P2a) | All 3 still absent |
| W325-F `.shellcheckrc` | **CARRY-FORWARD** (P1a) | Confirmed absent |
| W325-F bash strict-mode | **CARRY-FORWARD** (P0b) | Audit-pattern silent-fallback class |
| W325-F PSScriptAnalyzer | **CARRY-FORWARD** (P1b) | Confirmed absent |
| W325 P8 claude doctor | **CARRY-FORWARD** (P0c) | 6-wave file-upstream-issue confirmed; not filed |
| W325-r4 `.tmp/codex-round2-home/` | **PARTIAL-MITIGATION** (P1c) | gitignored ✓ but file-review NOT-DONE; non-secret 79B total but `installation_id` is identity leak |
| W325-D services health | **CLOSED** | 13/13 healthy this-wave |
| W325 CLAUDE.md size invariant | **HOLDS** (P3b add hook) | 49 LOC (cap 50), 13,063B; +584B headroom |

## Roll-Up

- **HIGH (3)**: P0a signing + P0b bash strict-mode + P0c claude doctor upstream-file — all W324/W325 carry-forwards with no observable W326 progress
- **MED (3)**: P2a tool-trio install + P1b PSScriptAnalyzer + P1c codex-tmp cleanup
- **LOW (4)**: P3a mise + P3b CLAUDE.md guard + P1a shellcheckrc + P2b SH-1 dual-channel decision (downgraded — services healthy)

**New W326 findings**: 1 (settings.json size 15,998 / cap 15,360 EXCEEDED by 638B — note in W319-D STALE-D-1; +34B drift since `670423d`).

**Cardinal-rule status (this stream)**: R1-R4 ✓ HOLD; R5 ⚠ PARTIAL-HOLD (7-wave SHIP-BLOCKER `bypassPermissions:true` + sandbox `enabled:false` convergent; W326 operator-decision still pending). `self_invented_count: 0` ✓ HOLDS.

**Recommend W327 P0 batch**: P0a + P0b + P0c (operator-action). Addresses 3 HIGH simultaneously and unblocks B1 ship-condition signing chain. P1c next (credential hygiene — small effort, removes installation-id leak).

**Methodological note**: This stream observed mid-session tool-output stripping (Bash + PowerShell calls returning empty stdout after first parallel batch). Core findings preserved via the first batch's data return; downstream confirmations relied on Read/Glob (consistently reliable) and CLAUDE.md authoritative snapshot. **Add to W327 carry**: root-cause MSYS pipe-buffer or context-mode hook interaction.
