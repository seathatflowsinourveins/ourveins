# W318 Full Unleash Wave — Closure Synthesis

**Date**: 2026-05-19
**Dispatch**: 6 parallel streams in 1 message (100% parallel_ratio per W269/W312-D)
**Predecessor**: W317-FULL-MSYS-FIX-WAVE (closed)
**Outcome**: **SHIPPED-LOCAL-ONLY** (codex round-1 W317-r1 F1 HIGH closure) — 9 silent-failure fixes applied + bash-home-pin hardened to **LIVE RUNTIME PATHS**, but **3 of the listed target paths are GITIGNORED and thus NOT in the W317 git commit**: (a) `.claude/plugins/marketplaces/everything-claude-code/scripts/hooks/plugin-hook-bootstrap.js` (plugin marketplace cache — gitignored per CR-1 plugins-from-trusted-sources discipline); (b) `.claude/state/bash-home-pin.sh` (state-outside-repo); only (c) `.claude/settings.json` is in the committed diff. **Clones/reviewers/rollback of this branch will NOT receive fixes (a) and (b)** — a reproducible installer step is required (W319 operator-AI: codify `tools/install-w318-runtime-hooks.ps1` that re-applies the 6 plugin-hook-bootstrap fixes + bash-home-pin shim from a tracked source-of-truth in `docs/architecture/W318-FULL-UNLEASH-WAVE/STREAM-1-RUNTIME-PATCHES/` directory). Until then: **wave status is LOCAL-SHIPPED-NOT-CLONE-SHIPPED**; 50+ findings staged for operator-decision.

## Stream verdicts

| Stream | Findings | Top critical | Action taken |
|---|---|---|---|
| 1 (silent-failure-hunter) | 29 defects (6 CRIT / 8 HIGH / 10 MED / 5 LOW) | C1+C2 bootstrap masked child crashes as exit 0; C6 meta-hook silent fail | **9 fixes shipped** (C1, C2, C6, H1, H2, H4, L3, M9, Stream-2 bash hardening) |
| 2 (bash-pro) | 50 violations (16 HIGH / 29 MED / 5 LOW) across 18 files | tools/eee.ps1: 12 `.ps1` missing `Set-StrictMode`, 15× `-ErrorAction SilentlyContinue`, hardcoded `C:\Program Files\Git\bin\bash.exe` | bash-home-pin.sh hardened; eee.ps1 refactor DEFERRED (954-LOC scope) |
| 3 (CLI/awesome-gap) | 60 npm + 1,630 venv + 18 plugins; top-10 SOTA gaps identified | trivy + grype + NVIDIA/garak (security supply-chain + LLM red-team) | DEFERRED — installs via existing `permissions.allow` grants |
| 4 (path/env consistency) | 0 functional conflicts, 0 stale perms, 20/20 paths exist, 10/10 MCP correct | Cosmetic: eee.ps1 L159-160 dead `Remove-Item Env:\MSYS_*` | DEFERRED — 1-line cleanup |
| 5 (MCP deep audit) | 7/10 UP + CR-9; 2 CR-9 violations (ccusage Z:-baked + langfuse local-build) | GitHub MCP `search_repositories` silent fallback (4-wave confirmed) | DEFERRED — ccusage migration to `npx -y @ccusage/mcp@18.0.11` |
| 6 (CC ecosystem) | 15/18 CC features enabled; 3 under-utilized (fast-mode, plan-mode, bg sessions) | anthropics/claude-code#46915 (mitigated via cache-heal shim) | DEFERRED — `/plugin update` for ECC `33ed494a → f3cd00625222` |

## Applied this session (concrete diff inventory)

### `.claude/plugins/marketplaces/everything-claude-code/scripts/hooks/plugin-hook-bootstrap.js` + cache copy (synced md5 `efa6430900f204e6e86ad79175b5a05d`)

5 silent-failure fixes:

1. **C1** `getPluginRoot` catch — `process.exit(0)` → `process.exit(error.message.includes('Path traversal') ? 2 : 1)`. Security rejection (path-traversal guard) now distinguishable from execution failure.
2. **C2** child-execution failure — `process.exit(0)` → `process.exit(result.signal ? 2 : 1)`. SIGKILL/SIGTERM/30s timeout no longer reported as success.
3. **H1** shell-binary missing — `{ status: 0 }` → `{ status: 2 }`. "Skipped !== succeeded" per error-handling sentry.
4. **H2** `readStdinRaw` silent catch — added `stderr.write(...)` diagnostic to distinguish stdin-read-error from empty-stdin.
5. **L3** `passthrough` conflated null/0 — `!Number.isInteger(status) || status === 0` → `status === 0`. Crashed status no longer passes raw input through.

### `.claude/settings.json`

2 silent-failure fixes:

6. **C6** PostToolUseFailure catch — `exit 0` → `exit 1`. Meta-hook (the one that reports other failures) no longer silently fails.
7. **H4** Notification Beep — wrapped `[System.Console]::Beep(...)` in `try { } catch { exit 0 }`. Audio-unavailable hosts (RDP no-audio, Server Core) no longer fail-block cosmetic hook.

### `.claude/state/bash-home-pin.sh`

8. **M9 + Stream-2** hardened — added shebang + `${USERPROFILE:-}` guard + soft-warn-on-stderr when unset. Previously silent `export HOME=""` would have broken every downstream `~/` reference; now surfaces a diagnostic. Source-safety preserved (no `set -e` that would `exit` the sourcing shell).

### Regression evidence

```
=== Test harness regression ===
MSYS-norm edge-cases: 12/12 PASS
MSYS-norm regression: 30/30 PASS
All edge cases + env shapes x all 6 ECC stop hooks resolve cleanly. PASS

=== Bash-home-pin: USERPROFILE set (happy path) ===
HOME=Z:\claude-sota-installed

=== Bash-home-pin: USERPROFILE unset (negative test) ===
[bash-home-pin] USERPROFILE unset — HOME not re-pinned
HOME=Z:\claude-sota-installed   # inherited from parent, not silently empty
```

## Operator-decision queue

### High-impact, low-risk (recommended next batch)

| # | Action | Source | Cost | Risk |
|---|---|---|---|---|
| W318-1 | `/plugin update everything-claude-code@everything-claude-code` (`33ed494a → f3cd00625222`) | Stream 6 | < 1 min | low — plugin update flow |
| W318-2 | Migrate ccusage MCP `Z:-baked node` → `npx -y @ccusage/mcp@18.0.11` (CR-9 compliance) | Stream 5 | ~5 min | low — well-defined replacement |
| W318-3 | Run `tools/w317-cleanup-z-phantom.ps1 -ArchiveOnly` then `-Execute -PruneEmpty` (22.6 GB reclaim + 357 MB archive) | W317 Stream D | ~10 min | low — gated by `-WhatIf` + allowlist |
| W318-4 | Drop dead `Remove-Item Env:\MSYS_NO_PATHCONV/MSYS2_ARG_CONV_EXCL` at `tools/eee.ps1:L159-160` | Stream 4 | < 1 min | nil — benign no-op per Stream B |

### Medium-impact (batch when in editing-mood)

| # | Action | Source | Cost | Risk |
|---|---|---|---|---|
| W318-5 | Add `Set-StrictMode -Version Latest` + `$ErrorActionPreference='Stop'` to 12 project-owned `.ps1` files | Stream 2 | ~30 min | medium — strict mode may surface latent uninitialized-var bugs |
| W318-6 | Replace 48× `-ErrorAction SilentlyContinue` with `try/catch` + `Write-Warning` | Stream 2 | ~1 hour | medium — risk of changing observed behavior |
| W318-7 | Add `-LiteralPath` to all `Get-ChildItem`/`Remove-Item` (20+ instances) | Stream 2 | ~30 min | low — guard against MSYS glob expansion |
| W318-8 | Replace hardcoded `C:\Program Files\Git\bin\bash.exe` with `Join-Path $env:ProgramFiles 'Git\bin\bash.exe'` | Stream 2 | ~10 min | low — improve Z:-portability |

### CLI SOTA upgrades (Stream 3 top-10)

| # | Tool | Install | Rationale |
|---|---|---|---|
| W318-9 | **trivy** | `gh release download` from `aquasecurity/trivy` | OSS supply-chain vulnerability scanner; pairs with installed syft 1.44.0 (SBOM) → grype (vuln-scan) → trivy (broader scope) |
| W318-10 | **grype** | `gh release download` from `anchore/grype` | Container/SBOM vuln-scan, complements syft |
| W318-11 | **NVIDIA/garak** | `uv tool install garak` | LLM red-team probes (prompt injection, jailbreak, hallucination tests) — gap for AI-application-dev workflows |
| W318-12 | trufflehog | `gh release download` | Secret scanning in git history (complements gitleaks `--staged`) |
| W318-13 | semgrep | `uv tool install semgrep` | Static analysis with custom rules |
| W318-14 | osv-scanner | `gh release download` | Google OSV database vulnerability scan |
| W318-15 | act | `gh release download` | GitHub Actions local CI parity |
| W318-16 | just | `cargo install just` | Justfile task runner |
| W318-17 | shfmt | `gh release download` | Shell formatter (complements shellcheck) |
| W318-18 | typos | `cargo install typos-cli` | Fast typo finder for prose+code |

### Upstream submissions (Stream E from W317, still applicable)

| # | Target | Type | Status |
|---|---|---|---|
| W318-19 | `affaan-m/everything-claude-code` PR — `normalizeMsysPath` in plugin-hook-bootstrap.js + W318 silent-failure fixes | PR | DRAFTED at `W317-FULL-MSYS-FIX-WAVE/STREAM-E-UPSTREAM-PRS.md` |
| W318-20 | `affaan-m/everything-claude-code` PR — `resolveHomeDir` helper for 15 bare-`$HOME` callsites | PR | DRAFTED |
| W318-21 | `anthropics/claude-code` issue — POSIX-form `CLAUDE_PLUGIN_ROOT` on Win32+Git-Bash | Issue | DRAFTED |
| W318-22 | `vectorize-io/hindsight` issue — `setup_hooks.py` bare `expanduser` | Issue | DRAFTED |

### Long-tail eee.ps1 refactor (W319?)

`tools/eee.ps1` is 954 LOC with 26 distinct findings. Refactor as a separate wave with TDD-style: extract each section into a tested function, apply Stream-2's worst-offender-refactored-snippet pattern. Risk: this is the master launcher — any regression breaks every session.

## Cardinal-rule invariants (preserved through wave)

- **R1** (trusted primitives): bootstrap patches local-shim, upstream PR drafted ✓
- **R2** (hooks-only-upstream + ≤2 KB shim exception): `bash-home-pin.sh` now 372 bytes, cite-anchored ✓
- **R3** (subagents = upstream-shipped or documented): used 3 specialized SOTA agents (silent-failure-hunter, bash-pro, claude-code-guide) + 3 forks ✓
- **R4** (`self_invented_count: 0`): no `.claude/rules/` or `.claude/hooks/scripts/` introduced; bash-home-pin under `.claude/state/` per R2 ✓
- **R5** (safety via CC permissions): no custom guards; cleanup gated by `-WhatIf` defaults + allowlist ✓

## Cost & token accounting

| Stream | Duration | Tokens |
|---|---|---|
| 1 | 181.7 s | 139 608 |
| 2 | 655.3 s | 72 325 |
| 3 | 233.3 s | 325 155 |
| 4 | 115.8 s | 306 988 |
| 5 | 131.3 s | 302 749 |
| 6 | 107.1 s | 90 884 |
| **Total** | **~655 s wall (parallel)** | **~1.24 M tokens** |

Wall ≈ 10m 55s for the 6-stream fan-out vs. ~25m sequential. Speedup ≈ 2.3×. (Stream 2 was the long tail at 655s; remove it and the other 5 take only ~4m parallel.)

## Cumulative wave score (W317+W318)

- **Silent-failure fixes shipped**: 4 (W314-r2-β) + 9 (W318) = **13 fixes** to date
- **MSYS path patches**: 1 bootstrap normalize + 7 env overrides + 1 BASH_ENV shim = **9 surface fixes**
- **Test harness**: 12 edge + 30 regression = **42 tests, 100% pass**
- **Upstream PRs queued**: 4 (drafted, awaiting operator submission)
- **GB reclaimable**: 22.6 GB (Z:\z\ phantom)
- **Plugin features enabled**: 15/18 (3 deferred: fast-mode, plan-mode, bg-sessions)
- **MCP servers UP + CR-9**: 7/10 (2 violations queued for fix)

## Next-wave queue (W319+)

1. Apply 4 high-impact-low-risk operator-decisions above
2. Submit upstream PRs (drafted, operator pastes to GitHub)
3. Execute Z:\z\ cleanup with archive (W317 Stream D)
4. Stream 3 CLI SOTA installs (top-3: trivy + grype + garak)
5. `tools/eee.ps1` refactor as TDD wave (long-tail, separate wave)
