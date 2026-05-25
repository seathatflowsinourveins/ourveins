# W325 Stream D — Runtime Cleanness V8 (Silent-Fallback + Stale-Ref + Terminal-Error Scan)

**Wave**: W325 Stream D · **Date**: 2026-05-19 · **HEAD**: `1360aeb` (W320-codex-r2 sca-v8.1→sca-v9 correction)
**Scope**: incremental scan over W319-D + W320-D + W321-W324 docs deltas (under sca-v9 lens with D38-D41 dims)
**Owner**: docs/architecture/W325-RUNTIME-V8-SOTA-SWEEP/* — STRICT-FILE-OWNERSHIP
**Time**: ~12 min wall-clock for scan portion

---

## §0 — Executive summary

Runtime is in **GOOD-WITH-CARRY-FORWARDS** state at HEAD `1360aeb`. 4 confirmed findings, 3 carry-forward, 6 net-new patterns over W320-D baseline. **0 SHIP-BLOCKER level findings net-new this wave** (the `bypassPermissions:true` SHIP-BLOCKER from W317-r2-S1 + W316-S4 remains a carry-forward — see §3 F-C-3). The `Z:/z/` MSYS path-mangle (W316-r2 path-mangle SHIP-BLOCKER, closed in W317 MSYS-FIX-WAVE) **HOLDS-FIXED** — 0 mangled paths in tracked files.

**1 terminal error material**: `claude doctor` regression continues for the **6th consecutive wave** — exit-0-silent (was EXIT=124 hang, now exits 0 with EMPTY output). This means runtime diagnostics are effectively bricked.

**1 stale-cite HIGH net-new this wave**: `.claude/settings.json:206` hardcodes `C:/Users/42/AppData/Roaming/npm/node_modules/ccstatusline/...` user-profile path — W286-A flagged "5 HIGH violations" but missed this one. Z:-portability broken: clone on another machine = ccstatusline silently fails.

---

## §1 — Method

Scanned across 4 surfaces:
1. `Z:/claude-sota-installed/.claude/settings.json` (15,755 bytes / 15,360 cap = OVER by 395B)
2. `Z:/claude-sota-installed/tools/` (26 files: 18 .ps1 + 4 .py + 2 .mjs + 1 .sh + 1 README)
3. `Z:/claude-sota-installed/harness/` (4 memory_recall adapters + eval_harness.py)
4. `Z:/claude-sota-installed/.claude/hooks/` (1 file: context-mode-cache-heal.mjs — sanctioned exception per CR-2)

Pattern probes:
- `|| true` — bare-fallback that swallows stderr
- `exit 0` (no preceding rc capture) — pre-mature success
- `2>/dev/null` (silent error suppression)
- `set -e` / `set -o pipefail` / `PIPESTATUS` (positive: rc-propagation)
- `TODO|FIXME|XXX|HACK` (debt markers)
- `Z:/z/`, `Z:\\z\\`, `\z\` (W316-r2 MSYS path-mangle pattern)
- `C:/Users/`, `AppData/` (non-portable user-profile paths)
- Dead/retired references (graphiti / falkordb / hindsight / `disabledMcpjsonServers` content)
- JSON validity of settings.json + .mcp.json (parse-with-strict)
- `claude doctor` terminal behavior

---

## §2 — Findings — Confirmed (4)

### F-W325-D-CLEAN-1 — `claude doctor` exit-0-silent regression (HIGH carry-forward, 6th wave)

- **Wave 1st seen**: W312-A.2 (EXIT=124 hang ≥30s)
- **W325 status**: `claude doctor` returns **EXIT=0** with **EMPTY stdout** (empirically confirmed twice this session at `timeout 35 claude doctor` and at long-timeout under background process)
- **Severity**: HIGH — diagnostics tool is silently bricked; operator believing the runtime is healthy may be misled
- **Why**: unknown root cause. Hangs prior to W317; now exits cleanly. Likely a regression in claude-code 2.1.144 doctor implementation or interaction with non-TTY stdin in the Bash tool subprocess. Out-of-band reports (cited at https://github.com/anthropics/claude-code/issues/29845-adjacent) suggest broader doctor instability.
- **Action W326**: file `anthropics/claude-code` upstream issue with reproducer (claude doctor under MSYS+Git-Bash subprocess, no TTY, EXIT=0 + zero output). Cite W312-A.2 → W315-r2 Stream E → W316-S4 → W317-r2 → W325-D consistent reproduction across 6+ waves on 2 different CLI versions.
- **Workaround**: parse `.claude/state/cc-runtime-info.json` if claude exposes it; otherwise rely on direct CLI probes (`claude --version`, `claude --help`, `npm view @anthropic-ai/claude-code version`).

### F-W325-D-CLEAN-2 — ccstatusline user-profile path (HIGH net-new this wave, W286-A-recurrence)

- **Location**: `Z:/claude-sota-installed/.claude/settings.json:206`
- **Content**: `"command": "node C:/Users/42/AppData/Roaming/npm/node_modules/ccstatusline/dist/ccstatusline.js --config Z:/claude-sota-installed/.claude/ccstatusline/settings.json"`
- **Severity**: HIGH — breaks Z:-portability invariant cited at `CLAUDE.local.md§Z-portable install ENV block` and W286-A "5 HIGH violations" finding-class. **A 6th violation slipped through.**
- **Verification**: the path **DOES** resolve on this machine — `ls 'C:/Users/42/AppData/Roaming/npm/node_modules/ccstatusline/dist/' → ccstatusline.js`. But fresh-clone on a machine where `42` isn't the user OR where npm root is elsewhere = silent fail (status line just won't render; CC keeps running).
- **Action W326**: replace with one of:
  - (a) `npx -y ccstatusline@<pinned-ver> --config ...` (CR-9 compliant, npm-cache-hit fast path per W286-cross precedent)
  - (b) `node Z:/tools/nodejs/node_modules/ccstatusline/dist/ccstatusline.js ...` if cache exists at Z:
  - (c) Vendor-copy `ccstatusline.js` into `Z:/claude-sota-installed/tools/vendor/ccstatusline/` (CR-12 secondary)
- **Reversibility**: 1-line edit; revert path string.

### F-W325-D-CLEAN-3 — `_comments` block bloating .mcp.json (LOW carry-forward, 25.9 KB)

- **Location**: `Z:/claude-sota-installed/.mcp.json:9-105` (the `_comments` object)
- **Severity**: LOW (compliance) — `_comments` is well-formed JSONC-equivalent (single top-level key alongside `mcpServers`) and CC tolerates it; not preload-budget-sensitive (this file is not loaded into context like CLAUDE.md). However the volume (≈26 KB raw / 65% of file) is dense audit-trail across 80+ wave annotations going back to W286-cross etc.
- **Action**: no action — operator-curated audit trail per cardinal-rule-2 invariant ("audit-action-loop maintained"). Could be sectioned to a sibling file (`.mcp.json.audit-trail.md`) for archival if file size becomes a problem, but no functional issue. **NOT a finding requiring fix.**

### F-W325-D-CLEAN-4 — settings.json size 15,755B vs 15,360B cap (LOW)

- **Location**: `Z:/claude-sota-installed/.claude/settings.json` total size
- **Severity**: LOW — was last enforced at the 15,360B cap in W317-Stream-A (15,944 → 15,351, margin 9B). Current state is **OVER cap by 395B**. Cap is operator-defined preload budget guideline, not a hard CC limit.
- **Likely cause**: W319-W324 added new fields without corresponding offset trims
- **Action W326**: re-trim with W317-Stream-A approach (remove dead `_comment_*` if any remain, OTEL logging vars no longer used, etc.). Could also raise the cap to 16 KB if operator chooses.

---

## §3 — Carry-forward findings (3) — NOT-net-new but still open

### F-C-1 — `bypassPermissions:true` + `allowUnsandboxedCommands` SHIP-BLOCKER (R5 PARTIAL-HOLD)

- **Status**: carry-forward from W316-S1 + W314 Stream E + W316-S4 + W316-S5 L7 + W317-S1 (5+ convergent findings)
- **CLAUDE.md L41 explicit**: "R5 ⚠ PARTIAL-HOLD carry-forward (`bypassPermissions:true` + sandbox `enabled:false` SHIP-BLOCKER convergent 5+ findings now ... W318 operator-decision required)"
- **W325 status**: STILL OPEN — `.claude/settings.json:permissions.defaultMode` = `"bypassPermissions"`. No sandbox block.
- **Why not closed**: operator-decision pending (W318 backlog); not Stream D's authority to modify settings.json under file ownership rules.

### F-C-2 — SEV-1 perplexity API key UNROTATED (W317-r2-SEV1-1 carry)

- **Status**: leak occurred W317-r2-S7 line 124 (REDACTED inline that synthesis), operator-AI for rotation queued
- **W325 status**: `.mcp.json:perplexity` env block uses `${PERPLEXITY_API_KEY}` interpolation; key lives in `CLAUDE.local.md` (gitignored). The W317 leak was in a DOC, not in tracked code/config — the leak is on the historical doc artifact, not in the .mcp.json. **Per operator instruction: I do NOT echo any `pplx-*` literal in this report.**
- **Action**: operator W326 rotation per W290-F2 incident-response pattern — revoke leaked key + issue new key + ensure CLAUDE.local.md updated.
- **Note**: Stream D does NOT have permission to read CLAUDE.local.md (`Read(./CLAUDE.local.md)` is in settings.json `permissions.deny` list line 199-228); cannot self-verify rotation status. Operator must confirm.

### F-C-3 — gitleaks `|| exit 2` HOLDS (W314-r2-F1 closure preserved)

- **W314-r2-F1**: settings.json:106 gitleaks `--exit-code 0 || true` → `|| exit 2` (security-CRITICAL fix)
- **W325 verify**: confirmed `gitleaks protect --staged --no-banner --redact || exit 2` still present in PreToolUse[Bash] (audited line is in current settings.json content)
- **Status**: HOLDS-FIXED ✓

---

## §4 — Net-new patterns observed W325 (6)

### N-1 — `harness/adapters/memory_recall/` `exit 0` in `_baseline_mock` / `agentmemory.py` etc.

- 4 adapter files (`alma_memory.py`, `agentmemory.py`, `mem0.py`, `_baseline_mock.py`) reference `exit 0` in docstrings describing expected wave-308 dry-run behavior ("`exit 0`, VERDICT: PARTIAL recall_precision@5 = 0.550")
- **Severity**: LOW (FALSE-POSITIVE for grep — these are docstring assertions about expected behavior, not actual code paths)
- **Action**: none — documentation of contract, not silent-failure

### N-2 — `tools/sca-v7-prelim.sh` 2>/dev/null pattern proliferation (12 occurrences)

- `gh auth token 2>/dev/null || true` at L61 (FALSE-POSITIVE — gh auth token failure is expected on unauth-CI)
- `${SCORECARD_BIN} ... 2>/dev/null || echo '{}'` at L70 (LOW — silently substitutes empty JSON on scorecard fail; should at least log to stderr)
- 10× `if [[ "$v" -lt N ]] 2>/dev/null` shell-arithmetic suppressions (FALSE-POSITIVE — standard bash idiom for guarding non-numeric input)
- **Action**: 1 substantive fix queued — L70 should `>&2 echo "scorecard failed"` before substituting `{}`
- **Severity**: LOW

### N-3 — `tools/migrate-cognee-state.ps1:79` hardcoded NSSM winget AppData path (LOW, W314-r2-δ carry)

- **Content**: `$wingetPath = 'C:\Users\42\AppData\Local\Microsoft\WinGet\...'`
- **Severity**: LOW (W314-r2-δ flagged 1 HIGH at L51 hardcoded `C:\Users\42\.cognee`)
- **W325 update**: cognee data-dir was migrated to `Z:/claude-sota-installed-state/cognee` per W312-A.7 closure; script is **likely obsolete** (CLAUDE.md L35 confirms "data-dir at `Z:/claude-sota-installed-state/cognee/{data,databases,logs,models,tmp}`"). Migration done = script can be retired.
- **Action W326**: move `migrate-cognee-state.ps1` to `tools/archive/` or delete; archival history in git is sufficient.

### N-4 — `tools/eee_install_cron_tasks.ps1` × 5 `exit 0` and `tools/wave152-f1-netsh-pin.ps1` × 3

- Both are bootstrap/install scripts where `exit 0` is correct idempotency signal (task already exists / pin already applied / etc.)
- **Severity**: LOW (FALSE-POSITIVE for silent-fallback scan)
- **Action**: none — these match the W255 "idempotent-OK exit 0" pattern, not silent-failure

### N-5 — `tools/test-msys-norm.mjs:136-143` asserts `exit 0`

- Test assertion script confirming the W317 MSYS-fix Stop-hook normalization passes
- **Severity**: NONE — POSITIVE PATTERN (this is the regression test)

### N-6 — `disabledMcpjsonServers: []` (empty array, W295/W308/W313 graphiti retirement state)

- **W325 verify**: `.claude/settings.json:228` `"disabledMcpjsonServers": []`
- Per CLAUDE.md L35 "T4 `graphiti` ✗ RETIRED (W272+W290+W295 AI-5; block excised from `.mcp.json` in W313 Stream A `5a350d1`; `disabledMcpjsonServers: []`)"
- **Status**: clean — no orphan disabled entries

---

## §5 — Positive findings (rc-propagation discipline preserved)

- ✓ `gitleaks ... || exit 2` (settings.json:106) — F-C-3 above
- ✓ `set -e` and `set -o pipefail` are used in pre-commit hook chains per W286-A audit (verified at settings.json PostToolUse Bash matcher)
- ✓ ruff/shellcheck `exit $rc` rc-propagation HOLDS (W314-r2-F3)
- ✓ context-mode-cache-heal.mjs:28 top-catch `exit 1` HOLDS (W314-r2-F6 — corrupt installed_plugins.json surfaces)
- ✓ WorktreeRemove diagnostic-non-silent HOLDS (W314-r2-F9)

---

## §6 — JSON validity gate

- `Z:/claude-sota-installed/.claude/settings.json` — VALID_JSON; 5 top-level keys (`$schema`, `cleanupPeriodDays`, `env`, `permissions`, `disabledMcpjsonServers`, `hooks`)
- `Z:/claude-sota-installed/.mcp.json` — VALID_JSON; 14 mcpServers + 1 `_comments` audit-trail object

---

## §7 — Forward-AIs (W326 queue, 7 ops)

| # | ID | Priority | Description | Source |
|---|----|----|-------------|--------|
| 1 | W326-D-1 | P0 | File `claude doctor` upstream issue (anthropics/claude-code) w/ 6-wave reproducer | F-W325-D-CLEAN-1 |
| 2 | W326-D-2 | P0 | Fix `.claude/settings.json:206` ccstatusline path (npx-pinned-version) | F-W325-D-CLEAN-2 |
| 3 | W326-D-3 | P1 | Re-trim settings.json from 15,755B back ≤15,360B (or raise cap to 16KB) | F-W325-D-CLEAN-4 |
| 4 | W326-D-4 | P1 | Operator-decision R5 SHIP-BLOCKER (`bypassPermissions` + sandbox) — convergent 6+ findings | F-C-1 |
| 5 | W326-D-5 | P1 | Confirm perplexity API key rotation completed | F-C-2 |
| 6 | W326-D-6 | P2 | Improve `tools/sca-v7-prelim.sh:70` scorecard failure to log stderr (CR-2 inline rc-propagate) | N-2 |
| 7 | W326-D-7 | P2 | Retire `tools/migrate-cognee-state.ps1` (W312-A.7 closure makes it obsolete) | N-3 |

---

## §8 — Convergence with W319-D + W320-D baseline

W319-D: documented 4-stream parallel sweep (W319 forward-queue execution).
W320-D: applied W319 codex-r1-r2 corrections including sca-v8.1 → sca-v9 stale-claim reversal.

W325-D-incremental confirms:
- **PRE-W325 finding-class HOLDS** ("R5 SHIP-BLOCKER convergent 5+ findings" persists at 6 with this wave's reconfirmation)
- **NET-NEW W325 only**: ccstatusline AppData path (F-W325-D-CLEAN-2) — was not flagged in W286-A's "5 HIGH violations" finding-set
- **NEUTRAL**: settings.json cap drift (F-W325-D-CLEAN-4) — known regression-prone metric

`self_invented_count: 0` invariant HOLDS (W255 cleanup ratification preserved; 5 addyosmani vendor-fork skills + 4 mattpocock vendor-fork skills + operator-curated commands per W316-D codex policy are all CR-4 compliant operator-curated paths, not self-invented).

---

## §9 — Decision: ship-gate posture for W325 Stream D

**SHIP-CLEAN-WITH-CARRY-FORWARDS** — no Stream D-introduced regressions; F-C-1 (R5) ratchets to **6 convergent findings** demanding W326 operator decision.

cardinal-rule-2 violations: 0 (no project-owned hook bodies introduced; sanctioned context-mode-cache-heal.mjs only).
cardinal-rule-3 violations: 0 (no self-invented subagents).
cardinal-rule-9 violations: 0 (all installed packages pinned per W286-cross).
