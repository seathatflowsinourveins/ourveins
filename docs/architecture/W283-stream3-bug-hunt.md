# W283 Stream 3 — Bug Hunt + Silent-Failure Audit

**Scope**: `Z:/claude-sota-installed/` — code, hooks, configs, runtime state, branch hygiene.
**Date**: 2026-05-17 (W283 deep audit, response to operator "many bugs + low quality").
**Method**: grep probes + git archeology + netstat/tasklist + file-content inspection on the 3 most-suspicious bootstrap files.
**Categories**: REPRODUCED-BUG (P0, observed) · KNOWN-OPEN (P1, documented in tree) · SUSPECTED (P2, smells).

---

## REPRODUCED bugs (P0)

### P0-1. `nul` file checked into worktree (Windows reserved-name redirection leak)
- **File**: `Z:/claude-sota-installed/nul` (untracked, present in working tree).
- **Cause**: A `cmd /c something > nul` or PowerShell `2>nul` was run from a *Git Bash / WSL* shell, where `nul` is NOT the null-device — it's a regular filename. Output got written to a real file named `nul`.
- **Impact**: Confusing artifact on disk; on Windows it cannot be opened/edited/deleted via most tools because `nul` is reserved at the OS level. `git status --porcelain` shows `?? nul`.
- **Fix (1-liner)**: `Remove-Item -LiteralPath .\nul -Force` (PowerShell `-LiteralPath` is required to bypass the reserved-name resolver).
- **Root-cause fix**: audit `eee.ps1` / `bootstrap-runtime.ps1` for `2>nul` (Win-cmd syntax) used while the current shell is bash — should be `2>$null` (pwsh) or `2>/dev/null` (bash).

### P0-2. `bootstrap-runtime.ps1` chronic-fix storm — 13 fix commits for one 363-LOC script
- **Commits** (all on `main` / `sota-converge-w280`): W280-fix1 → fix11, plus a *duplicate* `fix(W280-fix11)` (commits `da07f98` + `20dbcaa`) on parallel branches, never deduplicated. Pattern includes:
  - fix1: revert HINDSIGHT_API_URL env (codex HIGH)
  - fix3: rename bootstrap-hindsight → bootstrap-runtime
  - fix5: reorder PART 1 / PART 2
  - fix6: anchor codex cwd + hindsight HOME
  - fix7: daemon health-check
  - fix8: dynamic plugin-version discovery
  - fix9: chmod +x shims
  - fix10/10b: PowerShell here-string parse errors
  - fix11 (×2): single-quoted shim here-string
- **Smell**: 13 patches on a script that's "idempotent first-run setup" indicates the script was authored without testing on a fresh clone. Every fix is a previously-undetected runtime failure.
- **Reproduction-of-defect**: bootstrap output dirs **don't exist** on this host:
  - `Z:/claude-sota-installed-state/.hindsight/venv/bin` → MISSING (shims promised by W280b never created)
  - `Z:/claude-sota-installed-state/.codex/state` → MISSING (codex review-gate state dir never created)
  - This means **either bootstrap was never run, or it silently failed** despite `$ErrorActionPreference='Stop'`. CLAUDE.md claims "hindsight MCP RECOVERED" but the on-disk evidence is the directory doesn't exist.
- **Fix (1-liner)**: Run `.\tools\bootstrap-runtime.ps1` and verify exit-code 0 + both directories materialize; add a `Test-Path` assertion at end of script that fails-loud on missing artifacts.

### P0-3. Working tree dirty on `main` — modified files never committed
```
 M .claude/plugins/installed_plugins.json
 M .claude/plugins/known_marketplaces.json
 ? accounts/repos/CLIProxyAPI  (new commits, untracked content)
?? nul
```
- **Cause**: Plugin install/refresh writes these two JSONs at runtime; they have been dirty across multiple sessions per prior probes. The CLIProxyAPI submodule has dirty content. The `nul` (P0-1) is gitignore-evading.
- **Impact**: `git stash` / `git rebase` workflows break; "clean tree" claim in CLAUDE.md `Status` is FALSE.
- **Fix (1-liner)**: Add `.claude/plugins/installed_plugins.json` and `.claude/plugins/known_marketplaces.json` to `.gitignore` (they are runtime state, not source); resolve CLIProxyAPI submodule per its README; delete `nul`.

### P0-4. 24 stranded commits across 4 branches (no merge path to `main`)
- `goal/W272-sota` → 7 commits ahead, 0 merged
- `goal/W273` → 10 commits ahead, 0 merged
- `sota-converge-w280` → 1 commit ahead (`fix(W280-fix11) — single-quoted shim`)
- `parallel-sessions-arch` → 7 commits ahead
- **Total**: ~24 unique stranded commits including non-trivial features (W272-P0..P5 service restoration, W272-P3 git-foundation, W273-P1 mcp-memory-service wire, W273-P0b cleanup, parallel-sessions architecture docs).
- **Smell**: These branches contain real shipped work; if `main` has diverged, the merge-conflict cost grows daily. The pattern in `parallel-sessions-arch` HEAD doc says "two writers, one branch, ad-hoc integration — textbook anti-pattern" — exactly the bug the operator is paying for now.
- **Fix (1-liner per branch)**: `git rebase main goal/W272-sota && git checkout main && git merge --ff-only goal/W272-sota`; repeat for each.

### P0-5. `context-mode-cache-heal.mjs` has silent `try{}catch{}` swallow at top level
- **File**: `Z:/claude-sota-installed/.claude/hooks/context-mode-cache-heal.mjs` (28 lines).
- **Line 8 / 28**: Outer `try{ ... }catch{}` swallows *all* failures.
- **Line 21**: Inner `try{if(lstatSync(p).isSymbolicLink())unlinkSync(p)}catch{}` swallows.
- **Line 25**: Inner `try{symlinkSync(...)}catch{}` swallows the actual cache-heal action.
- **Impact**: When the heal fails (e.g., Windows symlink privilege denied; junction creation racing CC's plugin auto-update), the SessionStart hook returns success and CC enters the broken context-mode state silently. This is the documented anthropics/claude-code#46915 bug — and the workaround itself fails silently.
- **Fix (1-liner)**: Replace `}catch{}` with `}catch(e){process.stderr.write('[cache-heal] '+e.message+'\n')}` on lines 21, 25, 28. The hook prints to CC's debug log instead of going dark.

---

## KNOWN-OPEN issues (P1) — documented in tree

### P1-1. Langfuse trace-export silently no-ops (per `settings.json:352` `_comment_w278e`)
> "CAVEAT: Langfuse server at :3000 IS DOWN (probe HTTP 000 timeout, no listener); MCP-side trace export will still no-op until operator starts the docker stack (task #367 [OPERATOR-INPUT] pending)."
- **Status NOW**: Port :3000 IS LISTENING (netstat confirms `127.0.0.1:3000 LISTENING 56528`). The "DOWN" claim in the W278e comment is **stale** — operator likely started the stack but the comment was never updated. Verify with `curl http://127.0.0.1:3000/api/public/health`.
- **Net-effect**: false-negative in self-reported state.

### P1-2. `mcp-memory-service@mcp-memory-service` plugin DISABLED (line 202)
- `settings.json:202`: `"mcp-memory-service@mcp-memory-service": false,` — feature regression per W278 disable.
- W273 branch commit `feebac1` shipped this plugin enabled; main has it disabled. The W273 work is partly stranded BECAUSE of this disable.

### P1-3. `autoresearch-agent@claude-code-skills` plugin DISABLED (line 201) AND ships shell=True subprocess
- `settings.json:201`: `false`. Probably correct — but the *reason* is in `.claude/plugins/cache/.../autoresearch-agent/2.2.2/evaluators/*.py` which uses `subprocess.run(BUILD_CMD, shell=True, ...)` (5 occurrences). If plugin is ever re-enabled with attacker-influenced `BUILD_CMD`, this is command-injection. KEEP DISABLED until upstream removes `shell=True`.

### P1-4. Hindsight bootstrap promised state NEVER materialized (see P0-2)
- CLAUDE.md says hindsight is "✓ RECOVERED" with Windows shims at `~/.hindsight/venv/bin/`. Direct disk check shows that directory **does not exist**. Self-reported state contradicts ground truth.

### P1-5. `_comment_w278b` mentions hardcoded path `C:/Users/42/...` was *fixed*
- `settings.json:_comment_w278b_2026_05_17_sessionstart_node_shim`: "replaced hardcoded fnm-shim absolute path `C:/Users/42/...`". Worth grepping the rest of the tree for survivors — preliminary grep found no other `C:\Users\42` references in `scripts/ harness/ tools/ .claude/`. Single instance fixed; no residual.

---

## SUSPECTED smells (P2)

### P2-1. 14 `bash.exe` processes resident
- `tasklist | findstr bash` → 14 hits. Most are likely legitimate Git-Bash hook spawns, but if any are orphaned beyond CC lifetime they leak handles + memory. Worth `taskkill /F /IM bash.exe` once CC is fully closed and re-checking.

### P2-2. 3 `except Exception` swallows in `harness/eval_harness.py`
- Lines 223, 262, 745 — all `# noqa: BLE001` annotated with "cadence must not crash" rationale. Acceptable BUT each one prints `exc` to where? Verify they at least log to `harness/logs/eval-*.log` rather than vanishing.

### P2-3. 2 bare `pass$` in `tools/codex_verdict_normalizer.py` (lines 145, 149) and 1 in `tools/process_hygiene_audit.py` (line 98)
- These swallow `ValueError` / `OSError` silently. Forgivable in defensive parsers, but a single sentinel log line would dramatically improve diagnose-ability when normalizer output looks wrong.

### P2-4. `_comment_w282c_hygiene` says "ECC_DISABLED_HOOKS dropped 1 stale + re-enabled 5"
- Re-enabling 5 hooks at once is a *change-many* operation. No record visible of *which* 5 hooks were re-enabled and whether each was tested in isolation. Recommend per-hook smoke-test before next CC session.

### P2-5. `tools/eee.ps1` calls Fire 46 + Wave 52 pre-claude.exe REWRITERS on every launch
- Per snippet found, the launcher invokes `codex-plugin-hooks-rewrite.py` and an "ECC rewriter" with `--check` before forwarding args. Adds 2 subprocess + Python startup costs to every `eee` invocation. If either rewriter exits non-zero, the launcher hard-fails (`exit 2`) — could be a startup-blocking issue if rewriters drift relative to upstream plugin formats.

### P2-6. Top-level `try{}catch{}` in `context-mode-cache-heal.mjs` line 8/28 (covered in P0-5)
- Already counted P0; same root cause.

---

## Net-new bugs (found by this audit, not previously tracked)

1. **`nul` file leak** (P0-1) — not in any prior W28x comment.
2. **Bootstrap promised state directories MISSING** (P0-2 / P1-4) — CLAUDE.md says ✓; disk says ✗. Direct contradiction not previously surfaced.
3. **Working tree dirty on `main`** (P0-3) — installed_plugins.json + known_marketplaces.json should be gitignored runtime state. Previously asserted "clean tree" in CLAUDE.md Status is FALSE.
4. **24 stranded commits across 4 branches** (P0-4) — explicit tally + per-branch counts.
5. **Top-level swallow in `context-mode-cache-heal.mjs`** (P0-5) — known silent-failure pattern in a deliberately self-installed hook.
6. **`_comment_w278e` Langfuse DOWN claim is stale** (P1-1) — port :3000 is now UP.
7. **W280-fix chronic-fix storm** (P0-2 secondary) — single script accumulated 13 patches; smells like missing test harness.

---

## Aggregate counts
- **REPRODUCED-BUG (P0)**: 5
- **KNOWN-OPEN (P1)**: 5
- **SUSPECTED (P2)**: 6
- **Net-new (not previously tracked)**: 7 — most consequential being P0-2 (bootstrap missing state) and P0-3 (dirty tree on main).

## Ports + services verification (all DOCUMENTED ports respond LISTENING)
| Port | Service | Status |
|---|---|---|
| 3000 | Langfuse | UP (refutes W278e "IS DOWN" comment) |
| 5432 | Postgres (Langfuse) | UP |
| 8000 | cognee-mcp HTTP | UP |
| 8080 | llama.cpp llama-server (hindsight LLM) | UP |
| 9077 | hindsight-embed daemon | UP |
| 14317 | OTLP/gRPC Phoenix | UP |
| 16006 | Phoenix UI | UP |
| 16379 | FalkorDB | UP |
| 16700 | Ollama (graphiti) | UP |
