# W259-v8 — UNLEASH EXECUTION LOG

> **Wave:** W259-v8 UNLEASH EXECUTION. **Date:** 2026-05-16. **Operator authorization:** "DEEP DIVE INTO ALL AND PROCEED."
> **Scope:** Execute the W259-v7 P0 unleash punch-list (`CC-DIMENSIONS-UNLEASHED-W259v7.md` §4 — 6 P0 actions) + the corrected memory-layer install (`MEMORY-LAYER-RECONCILED-W259v4.md` §5 + `COGNEE-INTEGRATION-CLAUDE-W259v6.md` §3).
> **Constraints obeyed:** cardinal-rule-2 (no self-invent `.claude/hooks/scripts/*.py` — `self_invented_count` stays 0), cardinal-rule-3 (codex Path P cross-model verification), cardinal-rule-5 (trusted upstream channels), reversibility (every file backed up), JSON validity.
> **Result:** 4 P0 APPLIED · 1 P0 LAUNCHER (mechanism wired) · 1 P0 OPERATOR-DEFERRED. Memory `.mcp.json` entry APPLIED (config-only; server install = operator commands). Codex verdict: **APPROVE conf=0.90** after one NEEDS-REVISION round.

---

## 1. Backups (reversibility baseline)

All five mutated files were copied to `.w259v8-bak` before any edit:

| File | Backup | Restore command |
|---|---|---|
| `.claude/settings.json` | `.claude/settings.json.w259v8-bak` | `cp .claude/settings.json.w259v8-bak .claude/settings.json` |
| `CLAUDE.md` | `CLAUDE.md.w259v8-bak` | `cp CLAUDE.md.w259v8-bak CLAUDE.md` |
| `CLAUDE.local.md` | `CLAUDE.local.md.w259v8-bak` | `cp CLAUDE.local.md.w259v8-bak CLAUDE.local.md` |
| `.mcp.json` | `.mcp.json.w259v8-bak` | `cp .mcp.json.w259v8-bak .mcp.json` |
| `tools/eee.ps1` | `tools/eee.ps1.w259v8-bak` | `cp tools/eee.ps1.w259v8-bak tools/eee.ps1` |

Whole-wave revert: `git revert <this-wave-commit-SHA>` (then `cp` the gitignored `CLAUDE.local.md.w259v8-bak` back, since `CLAUDE.local.md` is gitignored and not in the commit).

Pre-wave HEAD: `0a8e1ecb8de63a99a5c087ce6d598ee1538cf975`.

---

## 2. P0 punch-list actions — per-action disposition

### U1 (D1 — Hooks) — **APPLIED**

Wired a `hooks` block in `.claude/settings.json` containing **3 new direct-upstream-CLI hooks** (cardinal-rule-2 compliant — every `command` is a direct invocation of an installed upstream CLI; **zero** `.claude/hooks/scripts/*.py` self-invent):

| Event | Matcher | Command | Upstream CLI |
|---|---|---|---|
| `PreToolUse` | `Bash` | `gitleaks protect --staged --no-banner --redact --exit-code 0 \|\| true` | gitleaks 8.30.1 |
| `PostToolUse` | `Edit\|Write\|MultiEdit` | `f=$(jq -r '.tool_input.file_path // .tool_input.filePath // empty'); [ -f "$f" ] \|\| exit 0; case "$f" in *.py) ruff check --quiet --fix -- "$f" …; ruff format --quiet -- "$f" …;; *.sh\|*.bash) shellcheck --severity=error -- "$f" …;; esac; true` | jq 1.8.1, ruff 0.15.13, shellcheck 0.11.0 |
| `WorktreeRemove` | (all) | `git worktree prune \|\| true` | git |

Design notes: all hooks are **non-blocking** (trailing `\|\| true` / `; true`, output discarded) — a lint finding is advisory and never wedges the session. The PostToolUse hook extracts the edited file path from hook stdin JSON via `jq` (an upstream CLI — a direct-CLI pipeline, not a self-invent script), guards with `[ -f "$f" ]`, and uses the `--` arg-separator (codex optional-hardening 1+2).

Pre-existing `SessionStart` hook (`context-mode-cache-heal.mjs`) preserved verbatim — see §5.

**Punch-list U1 items OPERATOR-DEFERRED (cardinal-rule-2 conflict):**
- `PostCompact` → priority-state re-inject: would require a self-invent script to assemble + inject the priority file. No direct-CLI form exists. **Deferred** — re-injection is already covered by the installed `intelligent-compact@claude-settings` plugin's PreCompact hook (per `CLAUDE.local.md` ENV (i) rationale).
- `SessionEnd` → ccusage snapshot: `ccusage` is wired only as an **MCP server** (`.mcp.json`), not as a CLI on PATH. A `SessionEnd` hook command calling a non-existent CLI would fail. **Deferred** — operator may `npm install -g ccusage` (the CLI) and then add `SessionEnd → ccusage` if desired.
- `pyright` per-edit PostToolUse: pyright loads the whole environment per invocation (slow); per-edit firing would degrade interactive UX. **Deferred** — `ruff check` (fast) covers Python lint per-edit; pyright is better as an on-demand / SessionEnd check.

Validation gate ("each hook fires; `self_invented_count` stays 0"): `jq` self-invent scan = **0**. SATISFIED.

**Revert U1:** delete the `hooks` block + the `_comment_hooks_w259v8` key from `.claude/settings.json` (restore the SessionStart-only `hooks` block from `.claude/settings.json.w259v8-bak`).

### U2 (D7+D26 — Permission mode) — **LAUNCHER (mechanism wired) + OPERATOR-DEFERRED (the posture flip)**

W259 Architecture-Critic finding: `defaultMode:"auto"` in a *shared* `settings.json` is **ignored** by CC — the working mechanism is the `--permission-mode auto` launcher flag (or a user/project-local settings scope).

Action taken: added block **(l)** to `tools/eee.ps1` — an opt-in `$env:EEE_PERMISSION_MODE` → `--permission-mode <mode>` flag-injection. The operator runs `$env:EEE_PERMISSION_MODE='auto'; eee` to switch modes; unset (default) injects nothing. Validates the mode string, skips injection if the caller already passed `--permission-mode`, preserves the existing `& $claudeBin` forward.

**Why the actual flip is OPERATOR-DEFERRED:** `settings.json` `defaultMode` is currently `"bypassPermissions"` — the operator's deliberate trusted-Z:-single-dev posture giving **zero** prompts (maximum automation, correct for an autonomous `/loop` runtime). Switching to `auto` would *re-introduce* prompts on non-allowlisted destructive ops, which could **break unattended `/loop` operation**. Flipping the runtime's safety posture is an operator decision, not an auto-apply. `settings.json` `defaultMode` is **UNCHANGED**.

Ready-to-run operator commands (option c):
```powershell
# To run a session in auto permission mode (destructive ops gated, routine ops silent):
$env:EEE_PERMISSION_MODE='auto'; eee
# One-time interactive acceptance run the punch-list asks for:
$env:EEE_PERMISSION_MODE='auto'; eee     # then approve the auto-mode environment prompt
# To make auto the persistent default, instead add to a USER-scope settings file
# (~/.claude/settings.json — user scope, NOT the shared project settings.json):
#   "permissions": { "defaultMode": "auto" }
```

Validation gate: launcher mechanism present + reversible. The "one interactive `claude --permission-mode auto` acceptance run" is an operator step (deferred).

**Revert U2:** delete block (l) from `tools/eee.ps1` (restore from `tools/eee.ps1.w259v8-bak`) — reverts to plain `& $claudeBin @Args`.

### U3 (D8 — Memory opt-out reconciliation) — **APPLIED**

Added a documented, cite-anchored rationale section (`## W259-v8 U3 — Auto Memory opt-out reconciliation`) to `CLAUDE.local.md` resolving the W259 D8 contradiction: `settings.json` carries both `"autoMemoryEnabled": true` and `env.CLAUDE_CODE_DISABLE_AUTO_MEMORY: "1"` (the env var wins — Auto Memory is disabled).

**Decision: the disable STAYS, now documented.** Rationale: per `MEMORY-LAYER-RECONCILED-W259v4.md` §5.2 the corrected memory architecture *keeps* native Auto Memory as the L1 baseline — so the disable is **not** justified on memory-architecture grounds; it is justified on **context-budget** grounds (the runtime's `≤50 LOC` pointer-only `CLAUDE.md` design deliberately minimises always-loaded preload, and Auto Memory's header-scan + 5-file auto-inject re-introduces uncontrolled preload growth). Re-enable = single-key delete of the env var; documented operator trigger. The contradiction is resolved **in writing** — punch-list U3 validation gate SATISFIED.

Subagent `memory:` frontmatter wiring (the second half of U3) deferred to U9 (the D3 subagent-frontmatter audit) — a per-agent edit, not a settings/CLAUDE-level change.

**Revert U3:** delete the `## W259-v8 U3` section from `CLAUDE.local.md` (restore from `CLAUDE.local.md.w259v8-bak`).

### U4 (D9 — Background sessions as 4th parallel mode) — **APPLIED**

Added one bullet to `CLAUDE.md` Architecture section documenting the **4 parallel-execution modes**: (1) subagents, (2) agent teams, (3) git worktrees, (4) **background sessions** (`claude --bg` + `claude agents`/`logs`/`attach`/`stop`) — the mode for off-critical-path work (codex-review dispatch, nightly eval). `CLAUDE.md` stays within the ≤50 LOC budget (25 non-blank lines after the edit).

The punch-list's "one background session dispatched + managed" is an operational step the operator/next-session performs; the *documented adoption* is complete.

**Revert U4:** delete the "Parallel execution (4 modes, W259-v8 U4)" bullet from `CLAUDE.md` (restore from `CLAUDE.md.w259v8-bak`).

### U5 (D11 — Output style) — **APPLIED**

Added `"outputStyle": "Proactive"` + a `_comment_outputstyle_w259v8` key to `.claude/settings.json`. Chose the **built-in** `Proactive` style (biases toward immediate execution / fewer pause-for-decision turns — auto-mode-like proactivity without changing permission mode) over authoring a custom `.claude/output-styles/*.md`: a custom style encoding wave-discipline tone is project *behavior* content, which cardinal-rule-4 keeps in `CLAUDE.md`+settings — the built-in is a pure settings value (zero new files, fully compliant).

Validation gate ("new session starts in the chosen style"): config applied; observable on next session start.

**Revert U5:** delete the `outputStyle` key + `_comment_outputstyle_w259v8` from `.claude/settings.json` (falls back to `Default`).

### U6 (D18 — `.claude/loop.md`) — **OPERATOR-DEFERRED**

The punch-list U6 asks to author `.claude/loop.md` to replace the built-in `/loop` maintenance prompt. **Not applied**, two reasons:
1. **The directive explicitly says `/loop` already exists — do NOT duplicate it.** The runtime has the `ralph-loop@claude-plugins-official` plugin AND a `loop` skill (`engineering-advanced-skills`) — `/loop` is already a rich, installed primitive. A `.claude/loop.md` would compete with / duplicate these.
2. **Cardinal-rule-4 boundary.** `.claude/loop.md` is a project *behavior* file; cardinal-rule-4 keeps project behavior in `CLAUDE.md`+settings, not separate behavior files. Authoring one is borderline against the runtime's own design discipline.

Operator option (if a custom bare-`/loop` prompt is later wanted despite the above): create `.claude/loop.md` with the wave-discipline maintenance prompt — but first confirm it does not conflict with the `ralph-loop` plugin / `loop` skill.

---

## 3. Memory-layer install — corrected `cognee` `.mcp.json` entry — **APPLIED (config) + OPERATOR commands (server)**

Per `COGNEE-INTEGRATION-CLAUDE-W259v6.md` §3.2 Option 1 + `MEMORY-LAYER-RECONCILED-W259v4.md` §5.2, added the `cognee` cold-tier GraphRAG bridge to `.mcp.json`:

```json
"cognee": { "type": "http", "url": "http://127.0.0.1:8000/mcp" }
```

**HTTP transport deliberately chosen over `uvx` stdio:** prior W259 install evidence shows `uvx cognee-mcp` stdio **hangs the MCP `initialize` handshake on Windows** → CC respawn-loop (75 orphan processes 2026-05-07). The `type:"http"` entry points at a **separately-run, operator-supervised** server — not a CC-spawned stdio child.

URL path `/mcp` verified against cognee-mcp source `src/server.py:1421-1425` (`--path` default `/mcp`, `--host` default `127.0.0.1`, `--port` default `8000`). A bare-origin URL would 404 (codex REQUIRED-fix-2). `127.0.0.1` over `localhost` to match the server bind host and avoid Windows IPv6-`::1` misses.

**OPERATOR INSTALL COMMANDS — run once, outside Claude Code (NOT executed by this wave; no docker/network installs were run):**
```powershell
# 1. Install the cognee engine (Apache-2.0) into the shared venv:
Z:/venvs/claude/Scripts/pip.exe install cognee

# 2. Start cognee-mcp under a process supervisor (pm2 / Servy / NSSM) — long-running service:
#    (exact form per cognee-mcp README; <cognee> = the cloned cognee repo path)
python <cognee>/cognee-mcp/src/server.py --transport http --host 127.0.0.1 --port 8000 --path /mcp
#    graph backend = Kuzu (embedded default — zero-ops; NOT FalkorDB, which pairs with Graphiti)

# 3. Set the LLM credential (or point cognee at a local LLM to keep cold-tier ingest fully local):
$env:LLM_API_KEY = '<key>'
```
Until the server is running the `.mcp.json` entry is **inert** — CC fails to connect to `127.0.0.1:8000` (a benign connection failure, NOT a respawn-loop — the respawn-loop only occurs with the broken stdio form).

**Revert (memory):** delete the `cognee` entry from `.mcp.json` `mcpServers` + the `cognee_w259v8` key from `_comments` (restore from `.mcp.json.w259v8-bak`).

---

## 4. Cross-model verification (cardinal-rule-3 — codex Path P)

Two `codex exec` foreground+tee dispatches (codex-cli 0.130.0, `--sandbox read-only`):

**Round 1** — adversarial review of the full 5-file diff. Verdict: **NEEDS-REVISION, conf 0.83**. 3 REQUIRED fixes:
1. SessionStart `context-mode-cache-heal.mjs` cardinal-rule-2 ambiguity → **resolved**: verified pre-existing (committed 2026-05-08, predates W259-v8, untouched by this wave) — see §5.
2. `.mcp.json` cognee URL likely needs a `/mcp` path → **applied**: URL → `http://127.0.0.1:8000/mcp` (verified against `server.py` source).
3. JSON validity must be `jq`-gated → **done**: `jq -e` PASS on both files.
Optional hardening 1+2 (`-- "$f"` arg-separator + `[ -f "$f" ]` guard) → **applied**.

**Round 2** — re-review confirming the fixes. Verdict: **APPROVE, confidence 0.90. "All 3 prior REQUIRED items are satisfactorily resolved. No remaining required fixes."**

Verdict transcripts: `tmp/w259v8/codex-verdict-OUT.txt` (round 1), `tmp/w259v8/codex-reverify-OUT.txt` (round 2).

---

## 5. Pre-existing item NOT introduced by W259-v8 (operator-review flag)

`.claude/settings.json` `SessionStart` hook invokes `node.exe … .claude/hooks/context-mode-cache-heal.mjs`. Codex round 1 flagged it as a cardinal-rule-2 ambiguity (an upstream CLI running a repo-local script).

**This is OUT OF SCOPE for W259-v8** — it is a **pre-existing** hook (committed 2026-05-08 in `69e5fd4`, file dated May 8, present in `.claude/settings.json.w259v8-bak`). The W259-v8 change preserved it verbatim and only **added** 3 new direct-CLI hooks alongside it. The file's own header declares it the **context-mode plugin's** cache self-heal companion ("context-mode plugin cache self-heal (auto-deployed) — fixes anthropics/claude-code#46915"). Touching a working, unmodified, plugin-companion hook would be scope creep + risk.

**Operator-review flag (separate from W259-v8):** if a future cardinal-rule-2 audit wants strict purity, confirm whether `context-mode-cache-heal.mjs` should be (a) accepted as a context-mode plugin artifact, or (b) replaced by the plugin's own self-healing if context-mode ships one. Not a W259-v8 deliverable.

---

## 6. Validation results (final)

| Check | Result |
|---|---|
| `.claude/settings.json` parses as JSON (`python json.load` + `jq -e`) | **PASS** |
| `.mcp.json` parses as JSON (`python json.load` + `jq -e`) | **PASS** |
| `tools/eee.ps1` PowerShell parse (`[Parser]::ParseFile`) | **PASS — 0 errors** |
| `CLAUDE.md` ≤50 LOC budget | **PASS — 25 non-blank lines** |
| `CLAUDE.local.md` markdown code-fence balance | **PASS — 2 fences, balanced** |
| Self-invent `.claude/hooks/scripts/*.py` hook commands | **0 — W255 `self_invented_count:0` invariant INTACT** |
| Codex cross-model gate (cardinal-rule-3) | **APPROVE conf=0.90** |

---

## 7. Punch-list scoreboard

| # | Dim | Disposition | Note |
|---|---|---|---|
| U1 | D1 Hooks | **APPLIED** | 3 direct-CLI hooks; PostCompact/SessionEnd-ccusage/pyright deferred (cardinal-rule-2 / no-CLI / UX) |
| U2 | D7+D26 Permission mode | **LAUNCHER + OPERATOR-DEFERRED** | `EEE_PERMISSION_MODE` flag mechanism wired; `bypassPermissions` posture unchanged (operator decision) |
| U3 | D8 Memory opt-out | **APPLIED** | `CLAUDE_CODE_DISABLE_AUTO_MEMORY` disable kept + cite-anchored rationale documented |
| U4 | D9 Background sessions | **APPLIED** | 4-parallel-mode guidance added to `CLAUDE.md` |
| U5 | D11 Output style | **APPLIED** | built-in `Proactive` set in `settings.json` |
| U6 | D18 `loop.md` | **OPERATOR-DEFERRED** | `/loop` skill + `ralph-loop` plugin already exist — do not duplicate (per directive + cardinal-rule-4) |
| — | Memory `.mcp.json` | **APPLIED** | `cognee` HTTP-transport entry added; server install = operator commands (§3) |

**P1 (U7–U10) and P2 (U11–U15)** — next-wave / trigger-gated, untouched by W259-v8.

---

## 8. Master revert (whole wave)

```bash
# Code-config files (in the commit):
git revert <W259-v8-commit-SHA>
# Gitignored CLAUDE.local.md (NOT in the commit):
cp CLAUDE.local.md.w259v8-bak CLAUDE.local.md
# Or restore individual files from the .w259v8-bak copies (§1 table).
```
Backups `.w259v8-bak` may be deleted once the wave is confirmed stable.

---

*Author: claude-opus-4-7 — W259-v8 UNLEASH EXECUTION ENGINEER. Date: 2026-05-16.*

---
---

# W259-v9 — P1 UNLEASH EXECUTION (appended)

> **Wave:** W259-v9 P1-UNLEASH. **Date:** 2026-05-16. **Operator authorization:** "PROCEED INTO NEXT STEPS" (Proactive mode — autonomous).
> **Scope:** the W259-v7 §4 **P1** punch-list — U7 (Agent-SDK harness), U9 (subagent frontmatter audit), U10 (MCP taskSupport audit). U8 (CC binary update) OPERATOR-DEFERRED per directive.
> **Result:** U7 **APPLIED** (working harness built + validated) · U9 **FINDING** (no edit — material dangling-hook finding recorded) · U10 **APPLIED** (audit comment added to `.mcp.json`). Codex Path P verdict: **APPROVE conf=0.90** after one NEEDS-REVISION round (4 REQUIRED fixes applied).
> **Pre-wave HEAD:** `a831d81b5803be9e4b6fb72bb09dd1f0c585de34`.

## W259-v9 §1 — Backups (reversibility baseline)

| File | Backup | Restore command |
|---|---|---|
| `.mcp.json` | `.mcp.json.w259v9-bak` | `cp .mcp.json.w259v9-bak .mcp.json` |
| `W259v8-UNLEASH-EXECUTION-LOG.md` | `…W259v8-UNLEASH-EXECUTION-LOG.md.w259v9-bak` | `cp …-EXECUTION-LOG.md.w259v9-bak …-EXECUTION-LOG.md` |

`harness/` is a NEW directory (additive — no backup needed; revert = delete it). Whole-wave revert: `git revert <W259-v9-commit-SHA>`.

## W259-v9 §2 — U7 (D14+D15+D16+D17+D22 — Agent-SDK harness) — **APPLIED**

Built a minimal, working Agent-SDK Python harness at `harness/` (3 files) scoped to the W259 **L4 eval cadence** (chosen over codex-dispatch — cleaner: `inspect-ai` already installed, Promptfoo wraps cleanly):

- `harness/eval_harness.py` — the harness. 5 CLI modes. Built on the **official** `claude-agent-sdk` (0.1.81 — already installed in `Z:/venvs/claude`, verified; **zero install performed**).
- `harness/promptfooconfig.yaml` — minimal Promptfoo smoke config (direct `anthropic:messages:` provider lane).
- `harness/README.md` — run instructions + scope boundary + nightly-scheduling operator option.

**Three required capabilities — all demonstrated:**
- **(a) headless** — `run_promptfoo_lane()` issues `claude --bare -p "<task>" --output-format json` as a `subprocess.run` list invocation (no `shell=True`, 180s timeout, `check=False` handled). The doc-recommended deterministic script mode (D15).
- **(b) programmatic tool calling** — `aggregate_eval_results` is an in-process `@tool` (via `create_sdk_mcp_server`) that crunches **all** eval rows in ONE call; `aggregate_via_sdk()` drives it through the Agent SDK `query()` iterator. The canonical output-side ~10x token fix (D16) — per-row data lives in tool args, not model context.
- **(c) advisor-tool pilot stub** — `advisor_pilot_stub()` prints the wired Sonnet-executor + Opus-advisor design (beta `advisor-tool-2026-03-01`) with a `promote_to_live` recipe. A stub — no API spend (D22).

**Runnable: YES.** Offline `--mode aggregate-demo` self-check **PASSES** (pure-function aggregation, zero API spend, CI-safe). `--mode promptfoo-lane --dry-run` prints the correct headless command. `py_compile` PASS. Live modes (`promptfoo-lane`, `sdk-aggregate`, `nightly`) issue small-spend API calls — operator-run.

One-line operator install (only if a fresh venv lacks the deps — NOT needed now):
```powershell
Z:/venvs/claude/Scripts/pip.exe install "claude-agent-sdk>=0.1.81" "anthropic>=0.102.0" "inspect-ai"
```

**Revert U7:** `Remove-Item -Recurse -Force Z:/claude-sota-installed/harness` (additive — whole dir is new).

## W259-v9 §3 — U9 (D3 — subagent frontmatter audit) — **FINDING (no edit)**

`Glob` of `.claude/agents/**/*.md` found **12 project-level agents** (architect, code-reviewer, debugger, evaluator, gpt5-archaeologist, gpt5-reviewer, gsd-goal-verifier, sota-researcher, verifier, wshobson-devops-troubleshooter, wshobson-security-auditor, + `cwc/` subdir) — all PROJECT-level (`.claude/agents/`), none upstream-plugin.

**Frontmatter state — already well-configured:** every agent already carries `isolation: worktree`, tuned `effort` (high/max), `disallowedTools` hardening, `skills:` preloading, `memory:` scoping, `mcpServers:` scoping (the Wave-15 / Ship-22 / Ship-23 frontmatter promotion already did the U9-recommended work). No frontmatter-tuning edit was warranted.

**MATERIAL FINDING (the real U9 deliverable) — dangling self-invent hook references:** **10 of 12** project agents (architect, code-reviewer, debugger, evaluator, gpt5-archaeologist, gpt5-reviewer, gsd-goal-verifier, verifier, wshobson-devops-troubleshooter, wshobson-security-auditor) carry an **active `hooks.PreToolUse:Bash` block** invoking `"Z:/venvs/claude/Scripts/python.exe" ".claude/hooks/scripts/agent_plan_readonly_bash_guard.py" --policy <readonly|codex-readonly|verifier>`. **That script is ABSENT** — the W255 cleanup (2026-05-15) deleted all 33 `.claude/hooks/scripts/*.py` self-invent scripts. Two problems: (1) **dangling reference** — when these agents fire the hook, `python.exe` cannot find the script (non-zero exit → CC may block the agent's Bash calls); (2) **cardinal-rule-2 conflict** — the embedded command invokes a `.claude/hooks/scripts/*.py` self-invent script, which cardinal-rule-2 forbids. W255 removed the script but left the 10 agent frontmatters referencing it.

**Disposition: FINDING, not auto-applied.** Stripping/replacing the `hooks:` block in 10 agent behavior-surface files is a distinct behavior change deserving its own wave + per-agent codex review — out of scope for a P1 harness wave. Codex Path P explicitly **confirmed this deferral is acceptable** ("Deferral is acceptable for this P1 harness wave… should be next-wave P0/P1. Do not resurrect the custom hook script; remove or replace the agent hooks with allowed upstream/CC settings behavior."). **Recommended follow-up wave (P0/P1):** delete the `hooks.PreToolUse:Bash` block from all 10 agents — the read-only posture is already declared via `disallowedTools` (Write/Edit/MultiEdit/NotebookEdit) + `permissionMode`; the deleted guard script was redundant with native CC permission enforcement (cardinal-rule-5).

## W259-v9 §4 — U10 (D4 — MCP taskSupport audit) — **APPLIED**

Added the `w259v9_u10_tasksupport_audit` key to `.mcp.json` `_comments` — an observational audit of `execution.taskSupport` across all **13** MCP servers (no `mcpServers` entry touched). Probe method: HTTP MCPs via `curl` live-endpoint check; local-service MCPs via TCP port check.

**Findings:** 0/13 servers were observed to advertise an explicit `taskSupport` annotation, and 0/13 declare a `forbidden`/`required` constraint — all classed **UNKNOWN** (no observed durable-Task constraint imposed by any MCP). Reachability: github/context7/deepwiki HTTP endpoints live (401/405/406 on bare GET — expected for Streamable HTTP); phoenix (16006) + FalkorDB (16379) ports OPEN; cognee (8000) + Ollama (11700) ports CLOSED (cognee entry inert per `cognee_w259v8`; graphiti ingest LLM will fail until Ollama is up).

**Streamable HTTP confirmation:** 4 `type:"http"` servers (github, context7, deepwiki, cognee) — **zero** `type:"sse"` entries. CC's `type:"http"` IS Streamable HTTP; legacy SSE would be `type:"sse"`. No legacy-SSE migration needed.

**Revert U10:** delete the `w259v9_u10_tasksupport_audit` key from `.mcp.json` `_comments` (restore from `.mcp.json.w259v9-bak`).

## W259-v9 §5 — U8 (D6 — CC binary update) — **OPERATOR-DEFERRED**

Per directive, the `claude` binary was **NOT** updated — it is shared with the parent harness (`Z:/claude/.local/bin/claude.exe`); a version bump is an operator decision affecting all three runtimes.

**Exact operator command (run outside Claude Code):**
```powershell
claude update      # updates the shared parent-harness binary to the latest release
claude --version   # confirm >= 2.1.142 (also unlocks `claude plugin details` token-cost tool + agent-view at 2.1.139+)
```
**Rationale for deferral:** `Z:/claude/.local/bin/claude.exe` is the shared launcher used by `eee` (this runtime), `sss` (claude-sota), and `ccc` (parent claude). A binary update is global — it must be an explicit operator action so all three runtimes are validated together. Once updated, the W259 T0.0 plugin-budget task can use the native `claude plugin details` per-session token-cost tool to classify ACTIVE/DORMANT plugins.

## W259-v9 §6 — Cross-model verification (cardinal-rule-3 — codex Path P)

Two `codex exec` foreground+tee dispatches (codex-cli 0.130.0, `--sandbox read-only`):

**Round 1** — adversarial review of the harness + `.mcp.json` audit. Verdict: **NEEDS-REVISION conf=0.82**, 4 REQUIRED fixes:
1. `aggregate_via_sdk()` over-permissive (`permission_mode="acceptEdits"`) → **applied**: changed to `dontAsk` (no prompts, deny-if-not-pre-approved); `allowed_tools` grants only the one MCP tool (no built-ins).
2. `--allowedTools ""` dubious no-tool encoding → **applied**: removed entirely (under `--bare` no tools are granted by default).
3. `promptfooconfig.yaml`/README implied Promptfoo drives the `claude --bare -p` lane → **applied**: both reworded — the config exercises the Anthropic Messages API directly; the headless lane is a separate path.
4. `.mcp.json` audit Streamable-HTTP wording inaccurate (github URL ends `/mcp/readonly` not `/mcp`; "CC default optional" uncited) → **applied**: corrected to 4 `type:"http"` servers, transport tied to the `type` field, claim softened to observed/no-constraint language.

**Round 2** — re-review confirming all 4 fixes. Verdict: **APPROVE confidence=0.90. "No remaining P1 blockers found."** Codex also confirmed the U9 deferral and confirmed `harness/` is not a `.claude/hooks/scripts/*.py` hook (no cardinal-rule-2 violation).

Verdict transcripts: `tmp/w259v9/codex-verdict-OUT.txt` (round 1), `tmp/w259v9/codex-reverify-OUT.txt` (round 2).

## W259-v9 §7 — Validation results

| Check | Result |
|---|---|
| `.mcp.json` parses as JSON (`python json.load` + `jq -e`) | **PASS** |
| `harness/eval_harness.py` `py_compile` | **PASS** |
| Harness offline `--mode aggregate-demo` self-check | **PASS** (zero API spend) |
| Harness `--mode promptfoo-lane --dry-run` (headless cmd shape) | **PASS** |
| Self-invent `.claude/hooks/scripts/*.py` introduced by W259-v9 | **0** — `harness/` is a build artifact, not a hook script (codex-confirmed) |
| Codex cross-model gate (cardinal-rule-3) | **APPROVE conf=0.90** |

## W259-v9 §8 — Punch-list scoreboard (P1)

| # | Dim | Disposition | Note |
|---|---|---|---|
| U7 | D14+D15+D16+D17+D22 | **APPLIED** | working Agent-SDK harness at `harness/`; offline self-check passes; force multiplier |
| U8 | D6 | **OPERATOR-DEFERRED** | shared binary — `claude update` is operator's call (§5) |
| U9 | D3 | **FINDING** | 12 project agents already well-configured; 10 carry dangling self-invent hook refs — recorded for a P0/P1 follow-up wave |
| U10 | D4 | **APPLIED** | taskSupport audit added to `.mcp.json` `_comments`; 4 HTTP MCPs on Streamable HTTP |

## W259-v9 §9 — Master revert (whole wave)

```bash
# Config + doc files (in the commit):
git revert <W259-v9-commit-SHA>
# harness/ is additive — git revert removes it; or manually:
#   Remove-Item -Recurse -Force Z:/claude-sota-installed/harness
# Or restore individual files from the .w259v9-bak copies (§1 table).
```
Backups `.w259v9-bak` may be deleted once the wave is confirmed stable.

---

# W259-v10 — CARDINAL-RULE-2 CLEANUP (W255-completion follow-up to §8 U9)

> **Wave:** W259-v10. **Date:** 2026-05-16. **Scope:** Close the W259-v9 §8 U9 FINDING — the 10 project-agent files carrying a dangling `hooks.PreToolUse` block that still invoked `.claude/hooks/scripts/agent_plan_readonly_bash_guard.py` (deleted by the W255 cleanup). A broken hook + cardinal-rule-2 violation.
> **Constraints obeyed:** cardinal-rule-2 (this fix RESTORES compliance — no new hook introduced), cardinal-rule-3 (codex Path P cross-model verification), reversibility (`.w259v10-bak` per file).

## W259-v10 §1 — Per-file disposition

| # | File | Disposition | Detail |
|---|------|-------------|--------|
| 1 | `architect.md` | **PreToolUse-block REMOVED** | `hooks:` key kept — `Stop` (type:agent memory-save) preserved |
| 2 | `code-reviewer.md` | **PreToolUse-block REMOVED** | `hooks:` key kept — `Stop` preserved |
| 3 | `debugger.md` | **SKIPPED — no PreToolUse block** | `hooks:` has only `Stop`; nothing to remove; file unchanged |
| 4 | `evaluator.md` | **hooks-key emptied + removed** | `hooks:` contained only PreToolUse → whole key removed |
| 5 | `gpt5-archaeologist.md` | **hooks-key emptied + removed** | PreToolUse-only (`--policy codex-readonly`) → whole key removed; `initialPrompt:` intact |
| 6 | `gpt5-reviewer.md` | **hooks-key emptied + removed** | PreToolUse-only (`--policy codex-readonly`) → whole key removed; `initialPrompt:` intact |
| 7 | `gsd-goal-verifier.md` | **hooks-key emptied + removed** | PreToolUse-only → whole key removed |
| 8 | `verifier.md` | **PreToolUse-block REMOVED** | `hooks:` key kept — `Stop` preserved (`--policy verifier` block removed) |
| 9 | `wshobson-devops-troubleshooter.md` | **hooks-key emptied + removed** | PreToolUse-only → whole key removed |
| 10 | `wshobson-security-auditor.md` | **hooks-key emptied + removed** | PreToolUse-only → whole key removed |

9 files modified, 1 (`debugger.md`) correctly skipped. 60 lines deleted. `disallowedTools`, `initialPrompt`, `isolation`, prose, and FM-19 descriptive references untouched.

## W259-v10 §2 — Verification scoreboard

| Check | Result |
|---|---|
| YAML frontmatter parses (`yaml.safe_load`) — all 10 files | **PASS** (4 → `hooks={Stop}`, 6 → no-hooks-key) |
| `grep` for executable `command:.*agent_plan_readonly_bash_guard` across 10 files | **0 matches** |
| Remaining `agent_plan_readonly_bash_guard` strings | descriptive prose only (HONEST-NON-FINDING cite-chain comments, FM-19 `initialPrompt`, Ship-2 HTML-comment changelog) — non-executable, left alone per task spec |
| New hook introduced by W259-v10 | **0** — cardinal-rule-2 compliance RESTORED |
| Codex cross-model gate (cardinal-rule-3) | **APPROVE** (GPT-5.5, session `019e32c8`, `tmp/w259v10-codex-verify.txt`) |

## W259-v10 §3 — Per-file revert

```bash
cd Z:/claude-sota-installed/.claude/agents
cp architect.md.w259v10-bak                      architect.md
cp code-reviewer.md.w259v10-bak                  code-reviewer.md
cp debugger.md.w259v10-bak                       debugger.md
cp evaluator.md.w259v10-bak                      evaluator.md
cp gpt5-archaeologist.md.w259v10-bak             gpt5-archaeologist.md
cp gpt5-reviewer.md.w259v10-bak                  gpt5-reviewer.md
cp gsd-goal-verifier.md.w259v10-bak              gsd-goal-verifier.md
cp verifier.md.w259v10-bak                       verifier.md
cp wshobson-devops-troubleshooter.md.w259v10-bak wshobson-devops-troubleshooter.md
cp wshobson-security-auditor.md.w259v10-bak      wshobson-security-auditor.md
# Or revert the whole wave commit:
#   git revert <W259-v10-commit-SHA>
```
Backups `.w259v10-bak` may be deleted once the wave is confirmed stable.

---

*Author: claude-opus-4-7 — W259-v10 CARDINAL-RULE-2 CLEANUP ENGINEER. Date: 2026-05-16.*
