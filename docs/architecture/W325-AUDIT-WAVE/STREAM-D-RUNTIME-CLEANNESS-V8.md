# W325 Stream D — Runtime Cleanness v8

**Wave**: W325 deep-audit (8-agent fan-out; this stream = Runtime + Git practice + Parallel safety)
**Scope**: CLI health · terminal/shell defensive patterns · services · git-practice cookbook · parallel-session safety · CLAUDE.md size · W317/W319/W320 carryover
**Method**: read-only probes (PowerShell + Bash) · Grep on tracked sources · deepwiki/git + Perplexity 2026-May freshness
**Apply set this wave**: NONE (audit-only; W325 P-block recommendations for ratification)

## Service-health table

| Service | Status | Port | W324-impact | W325 P-block recommendation |
|---|---|---|---|---|
| BasicMemoryHTTP (NSSM) | Running/Auto | 8765 | T6 canonical-primary OK | KEEP; rename `BasicMemoryHTTP` → align with `.mcp.json:basic-memory` uvx-stdio (dual-channel doc clarity) |
| CogneeMCP (NSSM) | Running/Auto | 8000 | T3 LIVE per W314-r1 | KEEP; W316-S6 uvx-stdio replacement still blocked on `packages=["src"]` upstream packaging bug |
| LlamaSwap (NSSM) | Running/Auto | 8090 | Local model routing OK | KEEP; W324-P6 mise.toml pinned node@22 already covers runtime deps |
| OllamaServe (NSSM) | Running/Auto | 16700 | RUNNING idle (closes W312-A.6 CLOSED-INTENTIONAL) | KEEP-RUNNING; W325-P-D1: codify "RUNNING-idle" as explicit-OK state in CLAUDE.md L35 |
| NvidiaGpuExporter (NSSM) | Running/Auto | 9835 | GPU observability OK (W317-r2 port-conflict resolved) | KEEP |
| Hindsight | DOWN (no listener) | 9077 (expected) | T1 RETIRED per W317-S1 codex-ratified | NO-ACTION; CLAUDE.md L35 already reflects retirement |
| Langfuse-web (Docker) | Up 4h healthy | 3000 | T5 LIVE v3.170.0 OK | KEEP |
| Grafana (Docker) | Up 4h healthy | 3001 | Observability OK | KEEP |
| Phoenix (Docker) | Up 5h healthy | 16006 | OK | KEEP |
| Prometheus (Docker) | Up 4h healthy | 19090 | OK | KEEP |
| FalkorDB | STOPPED-by-design | 16379 | T4 graphiti RETIRED per W295 | NO-ACTION |

All Docker observability containers healthy 4-5h uptime; NSSM stack 5/5 services Running/Automatic. **Net services healthy: 10/11 expected-up** (Hindsight intentionally down).

## HIGH findings

**H-D1** — `claude doctor` EXIT=124 hang persists 7+ waves (W312-A.2). Evidence: `timeout 30 claude doctor → EXIT=124` this probe. Falsifiable-inverse: file upstream issue at `anthropics/claude-code` with repro + plat=Win11 + version 2.1.144; if Anthropic confirms regression and ships fix, EXIT becomes 0 with non-empty diagnostic stdout. **P-D1**: operator GH-account file issue this wave (W320 P3 carry).

**H-D2** — `tools/migrate-cognee-state.ps1:51,79` hardcodes `C:\Users\42\.cognee` + `C:\Users\42\AppData\Local\Microsoft\WinGet\...\nssm.exe`. Z:-portability violation per CLAUDE.local.md hard-rule. W312-A.7 closure made script likely obsolete but file still in tree. **P-D2**: archive to `tools/_archived/W325/migrate-cognee-state.ps1` via `git mv` (reversible); falsifiable-inverse = if any active wave still needs the migrator, restore from `_archived/`.

**H-D3** — Commits UNSIGNED. `git log -1 --pretty=%G? HEAD → N`. Per Perplexity Sonar 2026-May best practice + git deepwiki `commit.gpgsign`, solo-developer SOTA enforces signing for tamper-evidence. **P-D3**: STAGED operator-decision (not auto-applied — requires GPG/SSH key provisioning); falsifiable-inverse = `git config commit.gpgsign true` + `user.signingkey <id>` → next commit `%G?` returns `G`.

## MED findings

**M-D1** — `mise` 2026.5.3 advisory 2026.5.12 patch (9 patches behind; per CLI probe). **P-D-M1**: `mise self-update` (additive, no breaking changes per mise SemVer).

**M-D2** — `slsa-verifier` NOT INSTALLED (CommandNotFoundException). W324 P8 STAGED but not yet executed. **P-D-M2**: operator `go install github.com/slsa-framework/slsa-verifier/v2/cli/slsa-verifier@v2.7.0` per W324 P8 spec.

**M-D3** — `git-pr-workflows@claude-code-workflows` plugin NOT INSTALLED (cache absent). W324 P4 STAGED only. **P-D-M3**: operator `/plugin install git-pr-workflows@claude-code-workflows` per W324 P4 paste-ready spec.

**M-D4** — `push.useForceIfIncludes=true` ✓ already set in repo gitconfig (verified via `git config --get-regexp`); `pull.rebase=true` ✓. Convergent with deepwiki/git 2026-SOTA. **No action**; positive finding.

**M-D5** — `.claude/settings.json:414-419` `sandbox.enabled:false` + `allowUnsandboxedCommands:true` — 7-wave SHIP-BLOCKER carry-forward (cardinal-rule R5 PARTIAL-HOLD). **P-D-M5**: operator-decision per W324 R5 carryover; falsifiable-inverse = enable sandbox with `excludedCommands` allowlist matching CCBP defaults, validate no autonomous-loop regression.

## LOW findings

**L-D1** — Worktrees: 3 (W287 + W290 + installed); `~3 parallel cap` per CLAUDE.md L23 W280d ✓ AT-CAP. No action; monitor.

**L-D2** — CLAUDE.md = 46,800 bytes / 49 LOC body. >40k char preload-warn. Section breakdown: 4 essential sections (Architecture 3962 + Cardinal-rules 2999 + Pointers 1265 + Runtime-state 2740 ≈ 11KB); **remaining ~36KB = rolling-3 Status appendices** (W320 + W317-A + W316 + W315). Stream E owns the fix; flagging breakdown for their record.

**L-D3** — `tools/eee.ps1:900` mentions `C:\Users\42` in a comment (not executed path). Cosmetic. **P-D-L3**: scrub to `<C-user>` placeholder.

**L-D4** — `tools/sca-v7-prelim.sh` + `tools/gh-search-rest.sh` have `set -e` only (no `-uo pipefail`). Defensive-pattern gap. **P-D-L4**: add `set -euo pipefail` per shell-scripting:bash-defensive-patterns skill.

**L-D5** — `BasicMemoryHTTP` NSSM @:8765 is undocumented in CLAUDE.md L35 alongside `.mcp.json:basic-memory` uvx-stdio entry — dual-channel risk per W319-D SH-1 NEW (still open). **P-D-L5**: 1-line CLAUDE.md L35 disambiguation: "T6 basic-memory canonical via uvx-stdio; BasicMemoryHTTP NSSM @:8765 = HTTP companion service".

## Carryover verification

| Carry-item | W324 source | Status this wave | Action |
|---|---|---|---|
| `bypassPermissions:true` + sandbox `enabled:false` | W324 §P0-P8 R5 | OPEN 7-wave | W325 operator-decision (P-D-M5) |
| W317 STREAM-E 4 upstream PRs | W324 carryover | OPEN | operator GH-account |
| W320 P5 shell defensive long-tail (16 HIGH × 12 .ps1) | W324 carryover | OPEN | bash-pro agent staged W325 |
| W320 P7 CLAUDE.md cite-corrections (OllamaServe + LlamaSwap docs) | W324 carryover | OPEN | this stream surfaces ready 1-line edit (L-D5 + Service-table OllamaServe row) |
| P4 plugin install `git-pr-workflows` | W324 carryover | OPEN | operator interactive (P-D-M3) |
| P8 slsa-verifier install | W324 carryover | OPEN | operator `go install` (P-D-M2) |
| `claude doctor` EXIT=124 upstream issue | W315/W317 | OPEN | P-D1 operator GH-issue |

## Git-practice cookbook integration

- `pull.rebase=true` ✓ + `push.useForceIfIncludes=true` ✓ (matches deepwiki/git + Perplexity 2026-May solo-dev SOTA)
- commitlint ✓ wired (W324 P4 half-shipped; `@commitlint/cli@21.0.1` + `commitlint.config.js` 13-types)
- **Signed commits OPEN** (P-D3 HIGH) — primary git-practice gap
- lazygit v0.60.0 (2026-03-09) ✓ — Perplexity advisory: re-read upstream `Config.md`/`Keybindings.md` for any 0.5x→0.6x breaking schema changes if custom config exists (not currently in tree)

## Falsifiable-inverse summary

Each P-block above includes its own inverse condition; central recovery path = `git revert HEAD` for any apply that ships in W325.

---
**Stream D conclusion**: Runtime largely clean — 5 NSSM + 5 Docker services healthy; cardinal-rule R1-R4 hold; only R5 SHIP-BLOCKER (7-wave) persists. Three HIGH (claude doctor hang + migrate-cognee Z:-violation + unsigned commits) are operator-decision-or-upstream gated. Eight MED/LOW are queue-ready quick-wins for W325 batch ratification.
