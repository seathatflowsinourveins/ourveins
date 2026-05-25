# W283 Stream 1 — Code-Quality + Static-Analysis Sweep

Date: 2026-05-17
Scope: `Z:/claude-sota-installed/` (excluding plugins cache, tmp, .local, node_modules, .git, .cargo, .bun, .cache)

---

## Findings — P0 (critical)

**None observed.** No crashes, data-loss bugs, or secret leaks surfaced in the probes.

(Caveats:
- gitleaks last-30-commits: 0 leaks (249.12 KB scanned).
- pyright on `harness/` + `scripts/` + audited `tools/`: 0 errors / 0 warnings (13 files).
- `.mcp.json` + `.claude/settings.json`: both parse cleanly; `additionalProperties:true` in schema means unknown keys are valid.
- basic-memory MCP smoke test: returns valid status output (`main: Status` table with `config/ +6 new`).)

---

## Findings — P1 (silent)

### P1-1 — PostToolUse hook is bash-only but `defaultShell:"powershell"`
- **File:** `Z:/claude-sota-installed/.claude/settings.json:115`
- **Detail:** The PostToolUse hook command uses bash syntax exclusively (`f=$(jq -r ...)`, `[ -f "$f" ]`, `case "$f" in *.py)`, `;;`, `esac`), but `.claude/settings.json:152` sets `"defaultShell":"powershell"`. Per claude-code hooks doc, hook `command` strings execute under the configured shell. PowerShell will parse `f=$(...)` as an unrecognized expression and fail silently (the trailing `; true` swallows exit, so ruff/shellcheck never auto-run on edits).
- **Severity rationale:** SILENT FAILURE — ruff auto-format on Python edits + shellcheck on shell edits never fire on Windows where the runtime lives; user thinks lint runs after every Edit/Write/MultiEdit but it does not. Cardinal-rule-2 "direct-CLI invocations declared in `.claude/settings.json`" is intact, but the invocation form is unexecutable in the chosen shell.
- **Fix:** Either (a) keep `defaultShell:"powershell"` and rewrite the hook as PowerShell (use `$Input | ConvertFrom-Json` + `switch -Wildcard`), or (b) set the per-hook `shell` field to `bash`/`sh` (if supported), or (c) inline-prefix `bash -c "..."` so the bash command is forced. Option (c) is the minimal patch.

### P1-2 — `gitleaks protect --exit-code 0 || true` neuters the secret-guard entirely
- **File:** `Z:/claude-sota-installed/.claude/settings.json:104`
- **Detail:** The PreToolUse Bash-matcher hook is `gitleaks protect --staged --no-banner --redact --exit-code 0 || true`. The `--exit-code 0` flag forces gitleaks to ALWAYS return 0 on findings, AND the trailing `|| true` would re-mask any non-zero exit anyway. The hook is a no-op — it scans + prints (redacted) findings but never blocks a Bash action. Combined with the absence of any explicit-block on the result, secrets staged via Bash commands flow through.
- **Severity rationale:** SILENT — the CLAUDE.md "pre-commit security gate runs every commit" claim is partially defended by the actual pre-commit hook elsewhere, but THIS PreToolUse hook is purely cosmetic. A user copy-pasting a secret via Bash will see no warning that registers.
- **Fix:** Change `--exit-code 0` → `--exit-code 1` (gitleaks default) AND drop the `|| true`. To stay non-blocking on policy grounds, use `--exit-code 2 && exit 2 || exit 0` if a soft-warn was intended, OR remove the hook entirely (cardinal-rule-2 says hooks must do real work).

### P1-3 — `_resolve_promptfoo_cmd()` uses `npx --no-install` but assumes promptfoo is globally installed
- **File:** `Z:/claude-sota-installed/harness/eval_harness.py:89-101`
- **Detail:** `shutil.which("promptfoo")` is checked first, falling back to `npx --no-install promptfoo`. The fallback returns a 4-element argv `[npx, --no-install, promptfoo]` but in `cmd = [*pf_cmd, "eval", "-c", ...]` (L427) `npx --no-install` will hard-fail with `npm ERR! could not determine executable` if promptfoo is not in the local `node_modules/.bin`. The error surfaces as `"promptfoo invocation failed: ..."` row (L457-466), so the promptfoo lane SILENTLY fails on a clean machine where promptfoo is only globally installed via npm-install-g (the documented install path at L40).
- **Severity rationale:** SILENT — `npx --no-install` does NOT consult the global npm prefix (per npm docs: it only looks in `./node_modules/.bin` and the npm cache). On any fresh-clone or non-PATH-augmented shell where `shutil.which("promptfoo")` fails but the user did `npm install -g promptfoo`, the lane reports failure with no actionable message.
- **Fix:** Drop `--no-install` and let npx download/cache promptfoo, OR add a `npm root -g` lookup, OR check `Get-Command promptfoo.cmd` on Windows (since `which` doesn't always find `.cmd` wrappers on Windows by default before npm v9).

---

## Findings — P2 (warning)

### P2-1 — `tools/process_hygiene_audit.py:31` unused import `timedelta`
- ruff F401 — `from datetime import datetime, timedelta, timezone` — `timedelta` never referenced.
- Fix: `ruff check --fix` autofix.

### P2-2 — `tests/test_w130_fire6_git_verb_matches_shell_prefixes.py:269,275,277` f-string without placeholders
- ruff F541 (3 occurrences) — `print(f"strip_decorations: PASS")` etc., no `{...}` interpolation.
- Fix: `ruff check --fix` autofix.

### P2-3 — `.specify/scripts/bash/common.sh` + `create-new-feature.sh` — SC2155 (12 occurrences) + SC2221/SC2222 (1 pair)
- `local x=$(cmd)` masks return value of `cmd`; convention is `local x; x=$(cmd)`.
- SC2221/SC2222 in `common.sh:511` — pattern `/*|*../*|../*` has overlapping cases (the leading `/*` ALWAYS matches before `*../*` can). Likely intended `./*|*../*|../*` or `[/]*|*../*|../*`.
- Severity: warning-only; not a runtime defect on the happy path, but the SC2221 case-pattern overlap is a real branch dead-code that could mis-handle relative-paths-with-`..` (worth fixing).

### P2-4 — `.claude/hooks/context-mode-cache-heal.mjs` — silent error-swallowing
- Lines 21 (`try{...}catch{}`), 25 (`try{...}catch{}`), 28 (outer `try{...}catch{}` covering entire body).
- Race-condition observation: `existsSync(p)` at L17 followed by `unlinkSync(p)` at L21 is TOCTOU, but the silent catch makes it benign on Windows (junction-create race between parallel CC sessions). The OUTER catch on L28 swallows ALL errors including JSON parse failures and FS errors — diagnostic value zero. The cardinal-rule-2 placement (direct upstream-CLI invocation declared in settings.json) is intact, but if the heal genuinely fails, the operator has no signal until the next plugin-load failure cascades.
- Severity: low — the file is intentionally a defensive self-heal per the W280-fix series; silent failure is the design intent.
- Recommendation: add a single `process.stderr.write` on the outer catch for ops visibility (does not break cardinal-rule-2).

### P2-5 — `tools/bootstrap-runtime.ps1` — Windows-portability + idempotency audit
- Idempotency: PASSES — every write is gated by `Test-Path`/`needsWrite` checks; re-runs are no-ops on already-correct state.
- Windows-portability: PASSES — explicit `[System.Console]::Beep` avoided; uses `Resolve-Path`, `Join-Path`, `Set-Content -Encoding UTF8 -NoNewline` consistently. Shim here-strings are single-quoted (W280-fix11) so no PS variable expansion risk.
- Secret-leak risk: NONE — script writes only `enableKnowledgeTools:true` flag + bash-shim wrappers; no secrets touched.
- Minor: PS regex on L88 `'"reviewGateEnabled"\s*:\s*true'` does NOT anchor to "stopReviewGate" — and the state-file check at L112 inspects `stateObj.config.stopReviewGate` — different fields, both verified by the script. This is correct (one is the setup-CLI JSON shape, one is the state-file shape), but worth a 1-line comment for the next maintainer.

### P2-6 — `.claude/settings.json:235` non-standard `theme` key
- Schema allows `additionalProperties:true`, so this is valid, but `theme` is not in the documented top-level schema (`https://json.schemastore.org/claude-code-settings.json`). Also `_comment_provenance_trail` + `_comment_w282c_hygiene` — operator-intended provenance hooks, harmless.

---

## Tool summary

| Tool                     | files scanned | errors | warnings |
|--------------------------|---------------|--------|----------|
| pyright (harness)        | 6             | 0      | 0        |
| pyright (scripts/tools)  | 7             | 0      | 0        |
| ruff (harness)           | 2             | 0      | 0        |
| ruff (scripts)           | 4             | 0      | 0        |
| ruff (tools+tests+evals) | ~15           | 4      | 0        |
| shellcheck (--severity=warning) | 5      | 13     | 0        |
| gitleaks (30 commits)    | 249.12 KB     | 0      | 0        |
| schema-check .mcp.json   | 1             | 0      | 0        |
| schema-check settings.json | 1           | 0      | 0 (3 non-standard keys; additionalProperties:true) |
| basic-memory smoke test  | 1             | 0      | 0 (returns valid `Status` table) |
| TODO/FIXME/XXX/HACK grep | harness+scripts+tools | 0 | 0 (clean) |
| context-mode-cache-heal.mjs audit | 1    | 0      | 1 (silent outer catch) |
| bootstrap-runtime.ps1 audit | 1          | 0      | 1 (1-line comment recommended) |

---

## Closing

No P0 critical. The P1 findings are concentrated in **hook-execution semantics** (shell mismatch + gitleaks no-op) and **CI-path fragility** (npx fallback). All three P1s are sub-30-min fixes. The codebase is otherwise clean for static analysis: zero pyright errors, zero gitleaks findings on the last 30 commits, no secrets in tracked files, no TODO/FIXME debt in harness/scripts/tools. The bootstrap-runtime.ps1 surface (the most-touched recovery script per W280 commit cadence) is well-audited and Windows-safe.
