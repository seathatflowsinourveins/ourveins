# W317 — Full MSYS / Git-Bash Cross-Platform Path Fix Wave

**Date launched**: 2026-05-19
**Trigger**: Stop-hook `MODULE_NOT_FOUND` (resolved in W317-MSYS-PATH-BOOTSTRAP-FIX.md), revealing systemic MSYS POSIX-form path bug across multiple plugins that write to `$HOME`-derived locations on Windows + Git Bash.

## Problem statement

Git Bash auto-converts `HOME` to POSIX form (`/z/claude-sota-installed`) on shell startup, regardless of the PowerShell-set `$env:HOME='Z:\claude-sota-installed'`. Plugins that read `HOME` or `os.path.expanduser('~')` on Windows then write to a literal `Z:\z\<rest>` path → 19.3 GB of phantom state has accumulated under `Z:\z\` (still actively growing as of this session). The Stop-hook failure was the visible tip; the data-writer leak is the iceberg.

## Wave structure (6 parallel streams)

| Stream | Owner-fork | File | Scope |
|---|---|---|---|
| A | w317-stream-a | `STREAM-A-PLUGIN-WRITER-AUDIT.md` | Find every plugin script that reads `HOME`/`expanduser` on Win32 |
| B | w317-stream-b | `STREAM-B-GIT-BASH-ROOT-CAUSE.md` | Identify exact mechanism of Git Bash `HOME` POSIX conversion + fix options |
| C | w317-stream-c | `STREAM-C-ENV-OVERRIDE-ARCHITECTURE.md` | Design 3-layer env overrides (settings.json + ps1 + CLAUDE.local.md) |
| D | w317-stream-d | `STREAM-D-FORENSIC-DIFF.md` | Diff `Z:\z\X\` vs `Z:\X\` per dir → safe-delete + archive manifest + PS1 cleanup |
| E | w317-stream-e | `STREAM-E-UPSTREAM-PRS.md` | Draft 3-5 upstream PRs/issues (ECC, anthropics/claude-code, others) |
| F | w317-stream-f | `STREAM-F-SOTA-PATH-PATTERNS.md` | Survey npm path libraries + Node 22 built-ins; adoption-vs-hand-roll verdict |

## Constraints (forks honor these)

- **Read-only on `Z:\z\`** — D produces a script; doesn't run it
- **No code mods to plugin sources outside the already-patched bootstrap** — A audits, doesn't fix
- **All findings cite file:line + authoritative source** (Anthropic docs, Git for Windows docs, npm pkg READMEs)
- **Word limits** per stream prompt to keep synthesis tractable

## Post-fork synthesis

When all 6 forks return, the parent orchestrator:
1. Verifies each fork's written artifact exists at the expected path
2. Cross-checks Stream B's root-cause hypothesis against Stream C's env overrides (they must be consistent)
3. Applies Stream C's settings.json + ps1 changes if they pass review
4. Reviews Stream D's cleanup script; user confirms before any `Z:\z\` modification
5. Stages Stream E's PR drafts for operator-approved upstream submission
6. Reconciles Stream F's verdict (adopt npm pkg or harden hand-roll) and applies any P0 edge-case fix to `normalizeMsysPath`
7. Writes `CLOSURE-SYNTHESIS.md` summarizing what shipped + what's deferred

## Cardinal-rule compliance

- **Parallel-dispatch mandate (W269/W312-D)**: 6 Agent calls in 1 assistant message = 100% parallel_ratio for this dispatch ✓
- **Cardinal rule 2 (hooks-only-from-upstream-plugins)**: Bootstrap patch already documented in W317-MSYS-PATH-BOOTSTRAP-FIX.md as a bug-patch shim, upstream PR queued (Stream E) ✓
- **`self_invented_count: 0`**: No new `.claude/rules/` or `.claude/hooks/scripts/` files introduced

## Stream-6 closure addendum (W317-OPS-CLOSURE-WAVE)

A follow-up Stream 6 (`docs/architecture/W317-OPS-CLOSURE-WAVE/STREAM-6-MSYS-PATH-FIX.md`) ran adversarial verification of the shipped fix via codex GPT-5.5 (round-1 REVISE → round-2 APPROVE). Net findings:

- **Test harness silent-PASS caught**: `tools/test-msys-norm.mjs` pre-S6 built an `env` object but never passed it to `spawnSync` — all 5 env-shape cases were exercising the same inherited `process.env.CLAUDE_PLUGIN_ROOT`. Fixed in S6 (line 60: added `env` argument); 12 pure-unit `normalizeMsysPath` edge cases added; failure predicate hardened (signal/error/status/stderr).
- **Re-verification post-fix**: 12/12 edge + 30/30 regression PASS; live Stop-hook smoke with POSIX-form `CLAUDE_PLUGIN_ROOT=/z/...` returned EXIT=0.
- **Codex round-2 APPROVE** with single caveat: CR-2 status for `bash-home-pin.sh` shim is PROVISIONAL until upstream issue/PR URL exists (W318-S6-2).
- 5 operator-AIs forwarded to W318 (upstream PR submission, anthropics issue filing, harness upstream-ization, active-writer leak investigation, Z:\z\ cleanup execution).
