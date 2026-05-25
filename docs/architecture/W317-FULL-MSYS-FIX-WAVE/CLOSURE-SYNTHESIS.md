# W317 Full MSYS Fix Wave — Closure Synthesis

**Wave**: W317-FULL-MSYS-FIX-WAVE
**Dispatch**: 6 parallel forks in 1 message (100% parallel_ratio per W269/W312-D mandate)
**Date**: 2026-05-19
**Status**: SHIPPED (env overrides) + STAGED (upstream PRs) + DEFERRED-OPERATOR-DECISION (Z:\z\ cleanup)

## Verdict per stream

| Stream | Output | Headline finding | Action taken |
|---|---|---|---|
| A — plugin-writer audit | `STREAM-A-PLUGIN-WRITER-AUDIT.md` | 2 vectors: (1) CC injects `CLAUDE_PLUGIN_DATA` POSIX-form; (2) CC hook input `cwd` POSIX-form. Top-5 hot writers identified. SOTA pattern = thedotmack `cygpath -w`. | Patched via env overrides (consumer-side patches DEFERRED to upstream PRs) |
| B — Git Bash root cause | `STREAM-B-GIT-BASH-ROOT-CAUSE.md` | `msys-2.0.dll` v3.6.4 inbound conversion at MSYS-binary startup. Cannot be disabled via env vars. | Confirmed direction: consumer-side normalize + per-plugin Windows-form env vars |
| C — env-override architecture | `STREAM-C-ENV-OVERRIDE-ARCHITECTURE.md` | 7 net env vars + BASH_ENV shim across 3 enforcement layers (settings.json + eee.ps1 + CLAUDE.local.md) | APPLIED (settings.json + eee.ps1 + shim); CLAUDE.local.md flagged for operator-AI |
| D — forensic diff | `STREAM-D-FORENSIC-DIFF.md` + `tools/w317-cleanup-z-phantom.ps1` | 22.61 GB safe-delete, 357 MB unique-to-phantom (must archive), 1 PHANTOM-NEWER active write today (codex broker state.json) confirms ongoing leak | DRY-RUN ready; operator must `-Execute` |
| E — upstream PRs | `STREAM-E-UPSTREAM-PRS.md` | 4 paste-ready submissions (ECC × 2, anthropics/claude-code, hindsight); codex deferred (clean) | STAGED — operator pastes to GitHub |
| F — SOTA patterns | `STREAM-F-SOTA-PATH-PATTERNS.md` | Keep hand-rolled `normalizeMsysPath`. No npm pkg handles MSYS→Win32. Node 22 built-ins don't either. No P0 edges. | No change — current bootstrap patch is canonical |

## Changes applied this wave (concrete diff inventory)

### 1. Bootstrap patch (already shipped pre-wave, recap)

- `plugin-hook-bootstrap.js` × 2 copies (marketplace + cache) — added `normalizeMsysPath()` + 3 call-sites in `isUsablePluginRoot`/`getPluginRoot`/fallback
- Backups: `.pre-w317-msys-norm` × 2
- Doc: `docs/architecture/W317-MSYS-PATH-BOOTSTRAP-FIX.md`

### 2. settings.json env block (10 net entries appended)

After `NODE_OPTIONS` line:

```json
"HOME": "Z:\\claude-sota-installed",
"USERPROFILE": "Z:\\claude-sota-installed",
"CLAUDE_PLUGIN_DATA": "Z:\\claude-sota-installed\\.claude\\plugins\\data",
"GATEGUARD_STATE_DIR": "Z:\\claude-sota-installed\\.claude\\state\\gateguard",
"AUDIT_ROOT": "Z:\\claude-sota-installed",
"CLAUDE_MEM_DATA_DIR": "Z:\\claude-sota-installed\\.claude\\plugins\\data\\claude-mem",
"ECC_SESSION_RECORDING_DIR": "Z:\\claude-sota-installed\\.claude\\session-data\\recordings",
"BASH_ENV": "Z:/claude-sota-installed/.claude/state/bash-home-pin.sh"
```

CC propagates these to every hook subprocess.

### 3. `tools/eee.ps1` (f3) block

Inserted between (f) dropped-setter section and (g) Claude Code binary discovery. Mirrors the data-dir env vars at PowerShell parent level + creates the dirs if missing.

### 4. New shim: `.claude/state/bash-home-pin.sh` (≤60 bytes)

```bash
export HOME="$USERPROFILE"
export ECC_HOME="$USERPROFILE"
```

**Cardinal-rule-2 compliance**: ≤2 KB bug-patch shim cite-anchored to Git for Windows MSYS issue (Stream B root cause) — `msys-2.0.dll` inbound conversion is upstream, no GitHub anthropics/claude-code issue exists for it (Stream E queued the filing).

### 5. New test harness: `tools/test-msys-norm.mjs`

30 tests (5 env shapes × 6 ECC stop hooks). Currently **30/30 PASS**. Run anytime: `node tools/test-msys-norm.mjs`.

## Verification probes (post-apply)

```bash
# Probe 1 — BASH_ENV shim works in subprocess bash
BASH_ENV="Z:/claude-sota-installed/.claude/state/bash-home-pin.sh" \
  USERPROFILE="Z:\\claude-sota-installed" \
  bash -c 'echo "HOME=$HOME"'
# Expected: HOME=Z:\claude-sota-installed
# Actual:   HOME=Z:\claude-sota-installed  ✓

# Probe 2 — Node.js sees Win32 homedir post-shim
BASH_ENV="..." bash -c '"Z:/tools/nodejs/node.exe" -e "console.log(require(\"os\").homedir())"'
# Expected: Z:\claude-sota-installed
# Actual:   Z:\claude-sota-installed  ✓

# Probe 3 — Regression harness all-pass
node tools/test-msys-norm.mjs
# Expected: 30/30 PASS
# Actual:   30/30 PASS  ✓
```

## Operator decisions deferred

### D1. `Z:\z\` cleanup (22.64 GB safe-delete + 357 MB archive)

`tools/w317-cleanup-z-phantom.ps1` is ready in 4 modes (DRY-RUN default → `-ArchiveOnly` → `-Execute` → `-Execute -PruneEmpty`). The allowlist gates active writers by mtime so the in-flight codex broker state file is protected until upstream codex state-redirect lands.

**Recommended operator sequence**:
1. Open a new bash session (verifies BASH_ENV shim works in fresh shells)
2. Run `pwsh tools/w317-cleanup-z-phantom.ps1 -ArchiveOnly` — copies 357 MB unique-to-phantom to `Z:\claude-sota-installed-state\W317-z-phantom-archive\`
3. Verify archive integrity
4. Run `pwsh tools/w317-cleanup-z-phantom.ps1 -Execute -PruneEmpty` — reclaims 22.64 GB
5. Monitor `Z:\z\` over next 24 h. If new writes appear, env overrides aren't winning over CC's POSIX injection → escalate to consumer-side patches at Stream A's top-5 file:line locations.

### D2. CLAUDE.local.md (gitignored, Read-denied here)

Operator must manually mirror the (f3) block from `tools/eee.ps1` into `CLAUDE.local.md` per Stream C's Layer 3 design. Section to add (paste after the existing `(f2) W268 codex T3` block):

```powershell
# (f3) W317 — plugin data-dir overrides preventing phantom Z:\z\.
$env:CLAUDE_PLUGIN_DATA        = 'Z:\claude-sota-installed\.claude\plugins\data'
$env:GATEGUARD_STATE_DIR       = 'Z:\claude-sota-installed\.claude\state\gateguard'
$env:AUDIT_ROOT                = 'Z:\claude-sota-installed'
$env:CLAUDE_MEM_DATA_DIR       = 'Z:\claude-sota-installed\.claude\plugins\data\claude-mem'
$env:ECC_SESSION_RECORDING_DIR = 'Z:\claude-sota-installed\.claude\session-data\recordings'
$env:BASH_ENV                  = 'Z:/claude-sota-installed/.claude/state/bash-home-pin.sh'
```

### D3. Upstream PR submissions

Stream E doc has 4 paste-ready bodies. Operator opens GitHub web UI, creates branch/issue per submission, pastes. Sequencing recommendation:
1. `affaan-m/everything-claude-code` bootstrap PR (already-tested fix, easy review)
2. `affaan-m/everything-claude-code` bare-$HOME PR (broader scope, may want maintainer discussion first)
3. `anthropics/claude-code` issue (doc + behavior request)
4. `vectorize-io/hindsight` issue (cosmetic; lowest urgency)

### D4. Stream-C-flagged eee.ps1 doc-drift

Stream C identified a conflict: `eee.ps1` Wave-50-Fire-42 block `Remove-Item Env:\MSYS_NO_PATHCONV` + `Remove-Item Env:\MSYS2_ARG_CONV_EXCL` actively UNSETS vars that `.claude/settings.json:env` SETS. **Status**: deferred — Stream B proved those vars don't affect HOME conversion anyway, so the contradiction is benign. But cleanup recommended W318 (drop the `Remove-Item` calls in eee.ps1 since they no-op).

## Cardinal-rule invariants (all preserved)

- **R1 (trusted-source primitives)**: Bootstrap patch is in upstream-managed file paths; backup + upstream PR queued for permanent resolution ✓
- **R2 (hooks-only-from-upstream-plugins, ≤2 KB shim exception)**: `bash-home-pin.sh` is 60 bytes, cite-anchored to Stream B root-cause analysis + Git for Windows MSYS subsystem behavior ✓
- **R3 (subagents = upstream-shipped)**: 6 parallel forks are CC-native Agent dispatches with no `subagent_type` (inherit-context model per docs) ✓
- **R4 (`self_invented_count: 0`)**: No new `.claude/rules/` or `.claude/hooks/scripts/` files; `bash-home-pin.sh` is under `.claude/state/` and is a documented bug-patch shim per R2 exception ✓
- **R5 (safety via permissions, not custom guards)**: `cleanup-z-phantom.ps1` defaults to `-DryRun`, gates Z:\z\ modification behind explicit `-Execute` flag ✓

## Cost & token accounting

| Stream | Tool uses | Duration (ms) | Tokens |
|---|---|---|---|
| A | 14 | 260 150 | 241 679 |
| B | 8 | 195 155 | 241 458 |
| C | 17 | 237 392 | 268 193 |
| D | 7 | 286 765 | 222 251 |
| E | 5 | 94 861 | 220 071 |
| F | 3 | 149 598 | 231 895 |
| **Total** | **54** | **~max(286.7s wall)** | **~1 425 547 tokens** |

Wall-clock ≈ 4m 47s for the 6-stream fan-out (parallel) vs. ~22 m sequential. Speedup ≈ 4.6×.

## Next-wave queue (W318)

1. Apply Stream D cleanup (operator-confirmed)
2. Land Stream E upstream PRs (ECC + anthropics/claude-code + hindsight)
3. Mirror (f3) block to `CLAUDE.local.md` (operator-AI)
4. Drop Wave-50-Fire-42 `Remove-Item` calls in `eee.ps1` (Stream-C-flagged cleanup)
5. Monitor 24-h burn-in for new `Z:\z\` writes — confirm env-override architecture suppresses leak
6. If new writes appear, apply Stream A top-5 consumer-side `cygpath -w` patches as fallback (with backups + upstream PRs)
