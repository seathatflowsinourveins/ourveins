# W314-C — Silent-Fallback v5 Findings (2026-05-19)

> Stream C / W314 ship. v5 sweep across `.claude/hooks/`, `tools/*.ps1`, `harness/*.py`, `.mcp.json`, `.claude/settings.json`, and JSONL evidence trail. Inherits v3/v4 finding-catalog conventions: HIGH = silent error swallow that masks runtime breakage; MED = intentional fallback without log/telemetry; LOW = cosmetic / advisory only.

## HIGH (4)

### F-SS-1 — State-outside-repo PROJECT_DIR silently ignored
**Location**: CLAUDE.local.md L40 vs runtime reality.
**Evidence**:
```
CLAUDE.local.md (f): CLAUDE_CODE_PROJECT_DIR = 'Z:/claude-sota-installed-state/.claude/projects'
ls Z:/claude-sota-installed-state/.claude/projects   →  EMPTY directory
ls Z:/claude-sota-installed/.claude/projects/Z--claude-sota-installed   →  45 JSONLs, 1.1 GB
```
The state-outside-repo invariant for session JSONLs is SILENTLY BROKEN. CC v2.1.144 either (a) is not honoring `CLAUDE_CODE_PROJECT_DIR`, (b) writes both locations but the redirect is dead-code, or (c) the env-var is unset at launch despite CLAUDE.local.md saying it should be set.
**Recommendation**: Stream A re-verify the env-var is exported by `tools/eee.ps1` before `claude.exe` launch. If exported and CC still writes to `$HOME/.claude/projects`, file `anthropics/claude-code` bug. Either way, **either restore the invariant OR delete the CLAUDE.local.md cite** — current state silently misleads any auditor relying on the cite.

### F-SS-2 — CLAUDE.md cite drift: `wshobson-agents/agent-teams@1.0.2` is actually `claude-code-workflows`
**Location**: `CLAUDE.md` L19 + W312 status block.
**Evidence**: physical location is `Z:/claude-sota-installed/.claude/plugins/cache/claude-code-workflows/agent-teams/1.0.2/`. Author email IS `seth@major7apps.com` (Wshobson), but the marketplace slug is `claude-code-workflows`. Any auditor following the CLAUDE.md cite will fail to find the plugin under `wshobson-agents/*`. **Silent because the plugin still loads** (since the runtime resolves via marketplace slug, not the cite) — but the audit trail rots.
**Recommendation**: rename CLAUDE.md L19 to `claude-code-workflows:agent-teams@1.0.2 (author: Wshobson)`.

### F-SS-3 — `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1` is required by /team-spawn pre-flight, but is NOT in `.claude/settings.json:env`
**Location**: `agent-teams/1.0.2/commands/team-spawn.md` L12-14.
**Evidence**: pre-flight gate aborts execution if the env-var is unset. settings.json `env` block has 20+ env-vars but not this one. Sessions trying `/team-spawn` silently get the abort message instead of a team. This explains W312-D F2's "agent-teams-primitive unused since W289" — operator was unable to spawn one without manually exporting the env-var first.
**Recommendation**: Stream A appends to settings.json `env`: `"CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS": "1"`.

### F-SS-4 — W269 parallel-dispatch mandate lives in CLAUDE.md prose (memory-only), NOT in a triggering skill
**Location**: CLAUDE.md L19.
**Evidence**: parallel_ratio is 0.587 post-tightening (unchanged from 0.584 W312 baseline). Reason: the mandate is in pointer-only CLAUDE.md L19 prose, relying on the orchestrator REMEMBERING to apply it on each user prompt. This is exactly the silent-fallback failure mode the mandate is supposed to prevent — and the measurement empirically shows the mandate is being silently violated 41% of the time.
**Recommendation**: lift to a real plugin-loaded skill per `https://code.claude.com/docs/en/skills` with auto-fire `description:` matching multi-stream prompt phrases (see paste-ready refinements doc).

## MED (4)

### F-SS-5 — ECC_DISABLED_HOOKS env list disables 8 hooks silently
**Location**: `.claude/settings.json:env.ECC_DISABLED_HOOKS`.
**Evidence**:
```
pre:edit-write:gateguard-fact-force,post:edit:design-quality-check,pre:observe:continuous-learning,
post:observe:continuous-learning,post:session-activity-tracker,stop:evaluate-session,stop:cost-tracker,
stop:desktop-notify
```
This is the **correct** mechanism for disabling ECC plugin hooks (per ECC plugin design). But: the env-var has NO trail in CLAUDE.md or settings.json `_comment_*` explaining WHY each is disabled. Future auditor cannot tell which disables are intentional vs accidental.
**Recommendation**: add `_comment_w314c_ecc_disables` to settings.json explaining per-entry rationale, OR add it to CLAUDE.md pointers section.

### F-SS-6 — codex Stop-hook silent try/catch swallow on JSON parse failure
**Location**: `Z:/claude-sota-installed/.claude/plugins/cache/openai-codex/codex/1.0.4/scripts/stop-review-gate-hook.mjs:133`.
**Evidence**:
```
try {
  const payload = JSON.parse(result.stdout);
  return parseStopReviewOutput(payload?.rawOutput);
} catch {
  return { ok: false, reason: "...invalid JSON. Run /codex:review --wait manually or bypass the gate." };
}
```
The error is converted to a user-facing reason but the original parse error is **NOT logged anywhere** (no stderr, no telemetry). When codex returns malformed JSON the operator just sees a generic "invalid JSON" message with no diagnostic detail. Plugin-owned per cardinal-rule-2 — out of scope for this runtime to fix — but Stream C flags it as upstream defect to file with openai-codex maintainer.
**Recommendation**: file issue against codex plugin. Logging-only fix; no security impact.

### F-SS-7 — Python try/pass swallow in 4 tool scripts
**Location**:
- `tools/codex_verdict_normalizer.py:147-148, 151-152`
- `tools/process_hygiene_audit.py:97-98`
- `tools/sca_status_dashboard.py:184-185`
- `harness/eval_harness.py:115-116`
- `harness/fixtures/smoke_mem0ai_mem0.py:104-105`

**Evidence**: bare `except ... : pass`. All 5 are intentional fallbacks (e.g., probe-fails-then-skip in dashboard) but **NONE log the swallowed error**. A future debugging session will not know why the dashboard's row is blank or why a probe was skipped.
**Recommendation**: add `logging.debug(f"swallowed: {e}")` inside each `except` body. ~5 lines total. Cardinal-rule-neutral — these scripts already exist.

### F-SS-8 — 5 PowerShell scripts in `tools/` missing `$ErrorActionPreference='Stop'`
**Location**:
- `tools/eee-backup.ps1`
- `tools/eee-status.ps1`
- `tools/eee.local.ps1`
- `tools/eee.ps1`  ← launcher, highest impact
- `tools/hindsight-queue-janitor.ps1`

**Evidence**: `grep "ErrorActionPreference" $f` returns nothing. Without `Stop`, PowerShell silently continues on non-terminating errors. `eee.ps1` IS the launcher — silent error during launch could mask a misconfigured env-var.
**Recommendation**: add `$ErrorActionPreference = 'Stop'` as first non-comment line in each. ~5-LOC fix total. Cardinal-rule-neutral.

## LOW (3)

### F-SS-9 — `.mcp.json` cites cognee data-dir as `C:/Users/42/.cognee` but actual lives at `Z:/claude-sota-installed-state/cognee/`
**Location**: per CLAUDE.md W312 status block L40 + `.mcp.json:14`.
**Evidence**: `C:/Users/42/.cognee` MISSING on disk. Actual data: `Z:/claude-sota-installed-state/cognee/{data,databases,logs,models,tmp}`. NSSM service IS running (handshake returns serverInfo `Cognee 1.26.0` — verified via low-cost HTTP POST). CLAUDE.md L40 already flags this as operator-AI-W312-A-7 "pending".
**Recommendation**: close the AI in W314 — refresh the cite to `Z:/claude-sota-installed-state/cognee/`.

### F-SS-10 — Pre-W80 codex broker scripts retained as `.pre-wave80-*` backup files (5 stale copies in plugin cache)
**Location**: `openai-codex/codex/1.0.4/scripts/lib/broker-lifecycle.mjs.pre-wave80-245`.
**Evidence**: stale backup file in active plugin cache directory. Not loaded by runtime (suffix excludes it), but a future codex auto-update could be confused. Plugin-owned; out of scope for runtime to touch.
**Recommendation**: cosmetic only. Note for upstream openai-codex maintainer.

### F-SS-11 — `harness/fixtures/smoke_mem0ai_mem0.py:104` uses `# noqa: BLE001` to suppress lint warning
**Location**: line 104.
**Evidence**: explicit suppression of broad-except lint rule. Intentional for a smoke-test (we want to swallow anything that fails). Not a bug — flagged for completeness.
**Recommendation**: none. Documented suppression is acceptable.

## Summary

| Severity | Count | List |
|----------|-------|------|
| HIGH     | 4     | F-SS-1 (PROJECT_DIR drift), F-SS-2 (cite drift), F-SS-3 (env-var missing), F-SS-4 (mandate in prose not skill) |
| MED      | 4     | F-SS-5 (ECC disables undocumented), F-SS-6 (codex Stop-hook silent catch), F-SS-7 (try/pass in 5 py), F-SS-8 (5 ps1 missing EAP) |
| LOW      | 3     | F-SS-9 (cognee cite drift), F-SS-10 (pre-W80 backup), F-SS-11 (deliberate noqa) |
| **TOTAL** | **11** | (4 paste-ready fixes are in `W314-C-PASTE-READY-MANDATE-REFINEMENTS.md`) |

## Cardinal-rule conformance

All findings respect:
- R1 (trusted sources only)
- R2 (no project-owned hook bodies — only sanctioned `context-mode-cache-heal.mjs` @ 1656 bytes ≤ 2 KB)
- R3 (cite-anchored subagents)
- R4 (no `.claude/rules/*.md`)
- R5 (settings.json deny[] secrets covered)

No finding requires creating a self-invented hook script. All HIGH fixes are settings.json env-block additions OR CLAUDE.md cite refreshes OR a skill creation. **`self_invented_count: 0` invariant preserved.**

## Cross-references

[AMBIGUOUS per W329-B + W329-S2-REAUDIT: GH-MCP/HF sub-claim WITHDRAWN per W329-S2-REAUDIT; other sub-claims (hook-channel, parallel-dispatch, transport) RETAIN]

- W309 silent-fallback-v2 findings: closed under sca-v6.1.
- W310-EXT δ (silent-fallback-v3): 5 OPEN findings closed pre-W314.
- W312-D (silent-fallback-v4 orchestration): 5 findings, 3 closed in W312, F4/F2 deferred to W315.
- W314-C (this doc, silent-fallback-v5): 4 HIGH + 4 MED + 3 LOW. F-SS-1/2/3/4 = paste-ready in companion doc.
