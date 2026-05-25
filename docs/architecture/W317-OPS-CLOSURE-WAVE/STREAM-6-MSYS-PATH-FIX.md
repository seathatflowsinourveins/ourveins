# W317 Stream 6 — Path-Mangle Stop Hook Fix

**Wave**: W317-OPS-CLOSURE-WAVE Stream 6
**Date**: 2026-05-19
**Status**: CLOSURE-READY — codex GPT-5.5 round-2 APPROVE
**Branch**: sota-converge-w310 (pending commit)

## Executive summary

The path-mangle Stop hook fix prescribed by `docs/architecture/W317-MSYS-PATH-BOOTSTRAP-FIX.md` (parallel-session draft) is **already shipped** and **already working** on disk — `normalizeMsysPath()` added to both bootstrap copies (marketplace + cache), 30/30 regression PASS. Stream 6 contribution: (a) confirmed root cause via direct on-host probe; (b) verified Stop-hook fires `EXIT=0` under POSIX-form `CLAUDE_PLUGIN_ROOT=/z/...` (the exact failing input); (c) caught codex GPT-5.5 round-1 REVISE on the test harness — env was not passed to `spawnSync`, so prior "30/30 PASS" was a false-PASS that exercised the SAME process.env CLAUDE_PLUGIN_ROOT for all 5 env-shape cases instead of the 5 distinct shapes; (d) fixed harness per codex F1-F4, added 12 edge-case unit tests for `normalizeMsysPath`; (e) re-ran harness — **12/12 edge + 30/30 regression PASS**; (f) codex round-2 APPROVE.

No new hooks created. No settings.json env changes (already shipped pre-Stream-6 by W317-FULL-MSYS-FIX-WAVE Stream C). Cardinal rules R1-R5 preserved.

## Root-cause analysis (where `Z:\z\` comes from)

Two co-conspirators:

1. **Git Bash inbound POSIX conversion** (per `W317-FULL-MSYS-FIX-WAVE/STREAM-B-GIT-BASH-ROOT-CAUSE.md`): `msys-2.0.dll` v3.6.4 (cygwin runtime) rewrites Windows-form path env vars to POSIX form on every MSYS binary startup. `HOME=Z:\claude-sota-installed` becomes `HOME=/z/claude-sota-installed`. This is **pre-bash** — `bash --noprofile --norc -c 'echo $HOME'` still emits the POSIX form, confirming the conversion sits in the C runtime, not in any user-editable init file. The conversion is **inbound-only** — `MSYS_NO_PATHCONV=1` + `MSYS2_ARG_CONV_EXCL=*` only suppress **outbound** conversion (POSIX → Windows when spawning native Windows children) per msys2.org docs. Neither var prevents the inbound POSIX-ification.

2. **Node `path.resolve()` on win32 misinterpretation** (demonstrated on-host this session):
   ```
   $ node -e "console.log(require('node:path').resolve('/z/claude-sota-installed'))"
   Z:\z\claude-sota-installed
   ```
   Node treats `/z/foo` as **"absolute on the current drive"** — joining the current drive root with `z/foo` yields `Z:\z\foo` rather than the intended `Z:\foo`.

When CC's hook subprocess inherits the POSIX-form `CLAUDE_PLUGIN_ROOT=/z/.../2.0.0-rc.1` (because the parent bash shell has the POSIX form, and CC propagates the env unchanged), and the ECC bootstrap then calls `path.resolve(process.env.CLAUDE_PLUGIN_ROOT)`, the resolved root becomes `Z:\z\...\2.0.0-rc.1`. Joining `scripts/hooks/run-with-flags.js` to that phantom path yields a file that doesn't exist on disk → `MODULE_NOT_FOUND`.

**Where the `\z\` actually appears**: not in any env var the operator set, not in any settings.json value, not in any plugin source. It's a `path.resolve()` artifact created in-flight inside the bootstrap, then surfaced as the missing module path in the error message.

## Fix applied (file:line + diff)

The fix lives in **two on-disk-only** files (not git-tracked because both sit under `.claude/plugins/{marketplaces,cache}/` which the project `.gitignore` excludes):

| File | Status |
|---|---|
| `.claude/plugins/marketplaces/everything-claude-code/scripts/hooks/plugin-hook-bootstrap.js` | Patched (`.pre-w317-msys-norm` backup) |
| `.claude/plugins/cache/everything-claude-code/everything-claude-code/2.0.0-rc.1/scripts/hooks/plugin-hook-bootstrap.js` | Patched (`.pre-w317-msys-norm` backup) — `diff` exit 0 with marketplace copy |

The patch (already on disk per W317-MSYS-PATH-BOOTSTRAP-FIX.md, lines 16-25 of the live bootstrap):

```js
function normalizeMsysPath(input) {
  if (typeof input !== 'string') return input;
  const value = input.trim();
  if (!value || !IS_WIN) return value;
  const cyg = /^\/cygdrive\/([a-zA-Z])(?:\/(.*))?$/.exec(value);
  if (cyg) return `${cyg[1].toUpperCase()}:\\${(cyg[2] ?? '').replace(/\//g, '\\')}`;
  const msys = /^\/([a-zA-Z])(?:\/(.*))?$/.exec(value);
  if (msys) return `${msys[1].toUpperCase()}:\\${(msys[2] ?? '').replace(/\//g, '\\')}`;
  return value;
}
```

Applied at **3 call sites** (bootstrap.js:130, 138, 142):

```js
// line 130 — isUsablePluginRoot existence probe
const value = normalizeMsysPath(candidate);

// line 138 — getPluginRoot env-loop return
return path.resolve(normalizeMsysPath(candidate));

// line 142 — fallback when env unset/invalid
return path.resolve(normalizeMsysPath(__dirname), '..', '..');
```

### Stream-6 contribution: test harness corrections (codex F1-F4)

Codex round-1 caught that `tools/test-msys-norm.mjs:56-60` (pre-Stream-6) built an `env` object but **didn't pass it to `spawnSync`** — every test case actually ran with the same inherited `process.env.CLAUDE_PLUGIN_ROOT`, so the 5 env-shape cases were indistinguishable. The "30/30 PASS" was real (the bootstrap was always finding a usable root via the inherited env), but it wasn't testing what it claimed.

Fix applied to `tools/test-msys-norm.mjs:60`:

```diff
- { input: STOP_EVENT, encoding: "utf8", timeout: 30_000 }
+ { input: STOP_EVENT, encoding: "utf8", env, timeout: 30_000, windowsHide: true }
```

Plus:
- `runOne()` failure predicate hardened to detect `r.error`, `r.signal`, non-integer status, AND non-zero status (not just bootstrap stderr regex)
- Cache `run-with-flags.js` no longer a fatal prerequisite (it's absent on installed plugins; resolver path uses marketplace root)
- Added 12 pure-unit `normalizeMsysPath` edge cases: `/z/foo`, `/z/foo/`, `/z` (root-only), `/Z/Foo Bar` (spaces), `/cygdrive/z/foo`, `/cygdrive/Z/foo/bar`, `/usr/local/bin` (preserved — not single-letter drive), `/mnt/z/foo` (preserved — WSL mount), `//server/share/foo` (UNC preserved), `Z:\already\win` (Windows-native preserved), `Z:/forward` (forward-slash Windows preserved), `""` (empty preserved)

## Test result (Stop hook now fires without MODULE_NOT_FOUND)

### Smoke test — direct Stop-hook invocation with POSIX-form `CLAUDE_PLUGIN_ROOT`

```
$ echo '{"hook_event_name":"Stop","transcript_path":"...","cwd":"...","session_id":"w317-s6-smoke"}' \
    | env CLAUDE_PLUGIN_ROOT='/z/claude-sota-installed/.claude/plugins/cache/everything-claude-code/everything-claude-code/2.0.0-rc.1' \
      "Z:/tools/nodejs/node.exe" \
      "Z:/claude-sota-installed/.claude/plugins/marketplaces/everything-claude-code/scripts/hooks/plugin-hook-bootstrap.js" \
      node scripts/hooks/run-with-flags.js stop:session-end scripts/hooks/session-end.js minimal,standard,strict

[SessionEnd] Transcript not found: Z:/claude-sota-installed/tmp/test.jsonl
[SessionEnd] Updated session file: Z:\claude-sota-installed\.claude\session-data\2026-05-19-claude-sota-installed-session.tmp
EXIT=0
```

**PASS** — no `MODULE_NOT_FOUND`, no phantom `Z:\z\` in any output, exit code 0. Session file written to the correct (un-mangled) path.

### Regression harness — post-fix

```
$ node tools/test-msys-norm.mjs
[info] Z:/...cache/.../2.0.0-rc.1/scripts/hooks/run-with-flags.js absent — harness targets marketplace root (active resolver path)

MSYS-norm edge-cases: 12/12 PASS
MSYS-norm regression: 30/30 PASS

All edge cases + env shapes x all 6 ECC stop hooks resolve cleanly. PASS
EXIT=0
```

### BASH_ENV shim verification

```
$ BASH_ENV="Z:/claude-sota-installed/.claude/state/bash-home-pin.sh" \
    USERPROFILE='Z:\claude-sota-installed' \
    bash -c 'echo "HOME=$HOME"; echo "ECC_HOME=$ECC_HOME"'
HOME=Z:\claude-sota-installed
ECC_HOME=Z:\claude-sota-installed
```

PASS — the 58-byte shim re-pins `HOME`/`ECC_HOME` to the Windows-form `USERPROFILE` value in every subshell, defending downstream Python tools that call `os.path.expanduser('~')`.

## Codex GPT-5.5 verbatim verdict

### Round 1 — REVISE

> **VERDICT: REVISE**
>
> Architecture is directionally sound, but I would not APPROVE closure as stated because the local verification evidence is not currently reproducible.
>
> Findings:
> - `normalizeMsysPath()` is safe for WSL `/usr/local/...` ... Under Windows Node launched from Git Bash, `/usr/local/...` also does not match the single-letter drive regex, so it is not falsely converted to `U:\...`
> - UNC paths are preserved by the current regex because `//server/share` does not match `^/([a-zA-Z])(?:/...)`, so no false conversion there.
> - The `BASH_ENV` shim is operationally reasonable and tiny: ... However, strict CR-2 text in `CLAUDE.md` says bug-patch shims need an Anthropic issue anchor. ... acceptable as an emergency shim, but not fully CR-2-closed until the upstream issue/PR cite is added or the rule text explicitly allows the MSYS upstream cite.
> - The claimed `30/30 PASS` does not reproduce here. ... `run-with-flags.js` is missing.
> - The test harness also builds an env object but does not pass it into `spawnSync`, so the five `CLAUDE_PLUGIN_ROOT` shapes are not actually being tested.
>
> Required revisions before APPROVE:
> 1. Fix `tools/test-msys-norm.mjs` to pass `env` into `spawnSync`.
> 2. Point the harness at the active ECC root, or make marketplace/cache roots explicit and skip/label missing inactive copies.
> 3. Treat `status !== 0`, timeout, signal, and bootstrap stderr as failures if the claim is "EXIT=0".
> 4. Add direct edge cases for `/usr/local`, `/mnt/z/foo`, `//server/share/foo`, `/z/foo/`, `/z`, lowercase drive, spaces, and extended/UNC-like prefixes.
> 5. Add the upstream issue/PR cite for the `BASH_ENV` shim, or mark CR-2 status as provisional.

### Round 2 — APPROVE

> **APPROVE**
>
> No remaining closure blocker for Stream 6.
>
> I verified the round-2 fixes in `tools/test-msys-norm.mjs`: env is passed to `spawnSync`, cache `run-with-flags.js` is no longer a fatal prerequisite, status/signal/error/null-status are now failure conditions, and the 12 edge cases are present. The bootstrap patch also applies `normalizeMsysPath()` before resolving env roots and `__dirname`.
>
> F5 is acceptable as **provisional** for closure because the upstream queue is documented at `docs/architecture/W317-FULL-MSYS-FIX-WAVE/STREAM-E-UPSTREAM-PRS.md`, including the `anthropics/claude-code` issue draft, and Stream B documents the MSYS root cause. Do not promote CR-2 from provisional to full until the upstream issue/PR URL exists.
>
> Residual verification note: my local rerun could not reproduce your PASS because this Codex sandbox blocks nested `spawnSync` of `Z:/tools/nodejs/node.exe` with `EPERM`; the harness correctly treats that as failure. Given your operator rerun shows `12/12` and `30/30` PASS, closure-ready.

## Cross-reference with W317-MSYS-PATH-BOOTSTRAP-FIX.md (parallel-session draft alignment)

| Draft prescription | Stream-6 status | Notes |
|---|---|---|
| `normalizeMsysPath()` added to bootstrap | SHIPPED pre-S6 | Confirmed on disk at marketplace + cache copies; backups carry pre-fix baseline |
| Applied to `isUsablePluginRoot()` + `getPluginRoot()` + fallback | SHIPPED pre-S6 | 3 call sites verified (bootstrap.js:130, 138, 142) |
| 5 regression tests (POSIX, cygdrive, win-back, win-fwd, unset) | SHIPPED + HARDENED | Harness env-passing bug fixed in S6; tests now actually exercise the 5 shapes |
| 6 ECC Stop hooks invoked without `MODULE_NOT_FOUND` | VERIFIED LIVE | Smoke test EXIT=0 with POSIX-form `CLAUDE_PLUGIN_ROOT` |
| Cross-plugin audit (codex/hindsight/claude-mem/ralph-loop unaffected) | RE-CONFIRMED S6 | `openai-codex/1.0.4/hooks/hooks.json:31` uses `"Z:\\tools\\nodejs\\node.exe" "Z:\\claude-sota-installed\\..."` hardcoded Windows abs paths (Wave 50 Fire 46) — already immune |
| Upstream PR to `affaan-m/everything-claude-code` queued | DOCUMENTED | Body paste-ready at `W317-FULL-MSYS-FIX-WAVE/STREAM-E-UPSTREAM-PRS.md` §1 |
| `Z:\z\` phantom inventory (19.3 GB) | DOCUMENTED + DEFERRED | Cleanup script `tools/w317-cleanup-z-phantom.ps1` ready in 4 modes (DRY-RUN default); operator confirmation gate |

**Net delta from S6**: harness correctness + edge-case coverage (codex F1-F4 closed). No new architectural change.

## Side-effects audit (does the fix affect other hooks? Other MCP invocations?)

| Surface | Impact | Evidence |
|---|---|---|
| ECC Stop hooks (6 of 6) | Fixed (no more MODULE_NOT_FOUND) | Smoke test EXIT=0 with phantom-prone POSIX input |
| ECC PreToolUse / PostToolUse hooks | Unaffected (Stream-A audit: these use shell `bash -c` paths or process.cwd() not CLAUDE_PLUGIN_ROOT) | Bootstrap only loaded by hooks that route through `plugin-hook-bootstrap.js` per ECC's hooks.json |
| codex Stop hook | Already immune via hardcoded Windows abs paths | `openai-codex/1.0.4/hooks/hooks.json:31` — Wave 50 Fire 46 patch |
| hindsight-memory hook | Already immune via hardcoded Windows abs paths | Per W317 cross-plugin audit table |
| ralph-loop hooks | Already immune (uses bash that handles POSIX natively) | Per W317 cross-plugin audit |
| MCP server invocations | Untouched | MCP servers run from `.mcp.json` `npx -y <pkg>` commands; do not invoke ECC bootstrap |
| Pre-commit gitleaks gate | Untouched | gitleaks runs from `.pre-commit-config.yaml` via system PATH; no env-path coupling |
| Settings.json env block | Already applied at W317-FULL-MSYS-FIX-WAVE | 10 net entries shipped pre-S6 (HOME, USERPROFILE, CLAUDE_PLUGIN_DATA, GATEGUARD_STATE_DIR, AUDIT_ROOT, CLAUDE_MEM_DATA_DIR, ECC_SESSION_RECORDING_DIR, BASH_ENV, etc.) |
| BASH_ENV shim (`.claude/state/bash-home-pin.sh`, 58 bytes) | Re-pins HOME/ECC_HOME=USERPROFILE in every bash subshell | Verified — defends downstream Python `os.path.expanduser('~')` callers |

**Conclusion**: Fix is surgical to ECC bootstrap. No co-dependent system is degraded. No new failure modes introduced (edge-case tests confirm `/usr/local/...`, `/mnt/z/...`, `//server/share/...` all preserved).

## Rollback runbook

If the fix needs to be reverted (e.g., upstream ships a different normalization that diverges):

```bash
# 1. Restore pre-W317 bootstrap from backups (both copies)
cp "Z:/claude-sota-installed/.claude/plugins/marketplaces/everything-claude-code/scripts/hooks/plugin-hook-bootstrap.js.pre-w317-msys-norm" \
   "Z:/claude-sota-installed/.claude/plugins/marketplaces/everything-claude-code/scripts/hooks/plugin-hook-bootstrap.js"

cp "Z:/claude-sota-installed/.claude/plugins/cache/everything-claude-code/everything-claude-code/2.0.0-rc.1/scripts/hooks/plugin-hook-bootstrap.js.pre-w317-msys-norm" \
   "Z:/claude-sota-installed/.claude/plugins/cache/everything-claude-code/everything-claude-code/2.0.0-rc.1/scripts/hooks/plugin-hook-bootstrap.js"

# 2. Verify revert (regression harness should now FAIL on posix-msys / cygdrive shapes)
"Z:/tools/nodejs/node.exe" "Z:/claude-sota-installed/tools/test-msys-norm.mjs"
# Expected: FAILS on 2 env shapes × 6 hooks = 12/30 FAIL

# 3. Optional: revert harness improvements (preserves pre-S6 test signature)
cd "Z:/claude-sota-installed" && git checkout HEAD -- tools/test-msys-norm.mjs

# 4. Stop hooks will resume emitting MODULE_NOT_FOUND under POSIX-form HOME — visible in stderr after next Stop event
```

**Effective rollback time**: <60 seconds. No data migration. No external service impact.

**Note on backups**: `.pre-w317-msys-norm` is the W317-direct backup. `.pre-wave52-ecc-fix` (older) is from Wave 52 — do NOT restore from it as it predates Wave-50-Fire-46 hardening.

## Operator-AIs forwarded W318

| ID | Description | Severity |
|---|---|---|
| AI-W318-S6-1 | Submit `affaan-m/everything-claude-code` PR per `W317-FULL-MSYS-FIX-WAVE/STREAM-E-UPSTREAM-PRS.md` §1; capture PR URL into bootstrap.js header comment | MEDIUM |
| AI-W318-S6-2 | File `anthropics/claude-code` issue documenting MSYS HOME inbound-conversion behavior + recommended env-block pattern per `STREAM-E §3`; URL becomes the CR-2 cite-anchor for `bash-home-pin.sh` shim, promotes CR-2 status from PROVISIONAL → FULL | MEDIUM |
| AI-W318-S6-3 | Promote `tools/test-msys-norm.mjs` improvements (env-passing + signal/status hardening + 12 edge cases) into upstream ECC test suite as `tests/hooks/plugin-hook-bootstrap.test.js` | LOW |
| AI-W318-S6-4 | Investigate `Z:\z\claude-sota-installed\` last-modified 2026-05-19 09:41 (per W317-FULL-MSYS-FIX-WAVE/STREAM-D-FORENSIC-DIFF.md) — confirms an active writer still uses raw `$HOME` despite the BASH_ENV shim; identify which subprocess and patch (S6 fix covers ECC bootstrap only; data-writer leak per Stream-A top-5 hot writers remains) | HIGH |
| AI-W318-S6-5 | Once 24-h burn-in with the S6-confirmed harness shows zero new `Z:\z\` writes, execute `tools/w317-cleanup-z-phantom.ps1 -ArchiveOnly` then `-Execute -PruneEmpty` to reclaim 22.64 GB | MEDIUM |

## Cardinal-rule invariants (all preserved)

- **R1 (trusted-source primitives)**: Patch lives in upstream-managed file paths (`.claude/plugins/marketplaces/everything-claude-code/...`); backups carry pre-patch baseline; upstream PR queued at Stream E ✓
- **R2 (hooks-only-from-upstream-plugins, ≤2 KB shim exception)**: `bash-home-pin.sh` is 58 bytes; cite-anchor is **PROVISIONAL** pending W318-S6-2 upstream issue filing — codex APPROVE explicitly accepted provisional status given STREAM-E queue ✓
- **R3 (subagents = upstream-shipped)**: This Stream-6 work runs in a CC-native subagent context (W317 parallel dispatch); no custom subagent class ✓
- **R4 (`self_invented_count: 0`)**: No new `.claude/rules/` or `.claude/hooks/scripts/` files; harness improvements live at `tools/test-msys-norm.mjs` (operator tool, not auto-fire hook) ✓
- **R5 (safety via permissions, not custom guards)**: Rollback uses native `cp` + `git checkout`; no custom guard script ✓

## Verdict

**SHIP** — codex GPT-5.5 round-2 APPROVE; 12/12 edge + 30/30 regression PASS; live Stop-hook smoke EXIT=0 with POSIX-form `CLAUDE_PLUGIN_ROOT` (the exact failing input); cardinal-rule invariants preserved; side-effects contained to ECC bootstrap; rollback runbook tested via backup-file path. Stream 6 closes.

Outstanding items are upstream-PR-filing follow-ups (W318) and the unrelated data-writer leak captured at W318-S6-4 (Stream-A scope, not Stream-6).
