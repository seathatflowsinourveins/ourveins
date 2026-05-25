# W341-GAP-RESOLUTION — Agent B Deliverable Synthesis

**Agent**: B (discipline-mechanization batch)
**Wave**: W341-GAP-RESOLUTION
**Date**: 2026-05-20
**Prior commit**: `9993945` (W340 wave-close with codex r6 APPROVE)

---

## Executive Summary

All 4 sub-tasks executed. Q8 and Q6 are live mutations applied to the runtime.
Q11 is a no-op finding (already shipped). Q2 is a propose-only doc (operator-sign required).

---

## Q8 — SubagentStop Hook (Δ-G49 Mechanization)

**Status**: COMPLETE — live mutation applied.

**Files created/modified**:
- `tools/subagent-stop-guard.mjs` — new SubagentStop guard (137 lines, ~3.5KB)
- `.claude/settings.json` — `hooks.SubagentStop` entry added

**Hook contract implemented** (post-codex-r1 corrections applied):
- Reads SubagentStop event JSON from stdin
- Extracts final teammate message — field priority: `event.last_assistant_message` (PRIMARY, documented SubagentStop field per Anthropic hooks schema) → `event.message` → `event.output` → `event.content` (array-block concat)
- EXIT 0 if message is non-empty (normal teammate response)
- EXIT 0 if message contains `NO-FINDINGS:` sentinel (explicit no-findings declaration)
- EXIT 2 (blocking) if message is empty and sentinel absent — stderr diagnostic only (SubagentStop does NOT support `hookSpecificOutput` stdout per Anthropic docs)
- Escape hatch: `CLAUDE_SUBAGENT_STOP_GUARD_DISABLE=1`

**Codex r1 HIGH finding resolved**: `extractMessage()` now checks `event.last_assistant_message` as primary field (codex identified this as the documented SubagentStop final-response field; original code missed it, would have false-positively blocked all subagent completions).

**Codex r1 MEDIUM finding resolved**: Removed `emitHookOutput()` call from block path. SubagentStop does not support `hookSpecificOutput.additionalContext` per Anthropic CC hooks docs; blocking is stderr + exit 2 only.

**settings.json verification** (PowerShell `$s.hooks.SubagentStop` output):
```json
{
  "hooks": [
    {
      "type": "command",
      "command": "\"Z:/tools/nodejs/node.exe\" \"Z:/claude-sota-installed/tools/subagent-stop-guard.mjs\"",
      "timeout": 5
    }
  ]
}
```
Exit: `hooks.SubagentStop` key present; JSON parse clean (verified via `ConvertFrom-Json`).

**CR-2 compliance**: `tools/` path is exempt from the `.claude/hooks/**` ≤2KB size constraint per W340 commit precedent (same precedent as `tools/parallel-guard-userpromptsubmit.mjs` and `tools/preagent-parallel-guard.mjs`). Command is a direct-CLI invocation per cardinal-rule-2.

**Cite-anchor**: `https://docs.anthropic.com/en/docs/claude-code/hooks` (SubagentStop event, hookSpecificOutput schema, exit-code-2 blocking semantics).

---

## Q11 — Parallel-Guard Soft-Fail → Binding Flip

**Status**: NO-OP — binding flip ALREADY SHIPPED in W330 P0-A.

**Finding**: Reading `tools/preagent-parallel-guard.mjs` confirms the "proposed P0-A fix" from CLAUDE.md L13 is already implemented:

```
exit(2) call count: 1     (blocking on 2nd consecutive violation)
exit(0) call count: 8     (advisory on 1st, pass-through on all other paths)
state.count >= 1 guard:  True  (the 2nd-violation block condition)
```

The ladder (`count=0 → advisory exit 0` / `count>=1 → block exit 2`) was shipped in W330 P0-A (`tools/preagent-parallel-guard.mjs` header confirms this). CLAUDE.md L13 says "proposed P0-A fix per CLAUDE.md L13: block on 2nd-violation" — that proposal was already executed in W330.

**No file changes made to `tools/preagent-parallel-guard.mjs`.**

**CR-5-exception condition-(b) acknowledgment** (per task spec + W330 r1):
The parallel-guard's advisory-mode (exit 0) for the 1st violation is a SANCTIONED CR-5 exception condition-(b). The 1st-violation advisory path is observability instrumentation that never blocks legitimate work. The 2nd-violation exit-2 path is binding enforcement. This dual-mode design is documented at CLAUDE.md L22 ("advisory ladder + exit-code-2 enforcement") and `tools/preagent-parallel-guard.mjs` header comments. The CR-5 exception is intentional and carries forward unchanged.

---

## Q6 — Repatch Context-Mode Hooks (fnm_multishells Fix)

**Status**: COMPLETE — two-part fix applied.

**Part 1**: Ran `tools/repatch-context-mode-hooks-json.ps1` (existing script).
- Script output: `patched=13 already=1`
- Script patched 13 version-prefix refs in `1.0.141/hooks/hooks.json`
- `1.0.146/hooks/hooks.json` was already patched for version-prefix (already=1)

**Part 2**: Directly patched `fnm_multishells` node.exe paths (separate issue not covered by the existing script).
The repatch script only targets the version-path prefix pattern. The `fnm_multishells` node binary paths are a distinct ephemeral-path problem. Applied regex replacement:
```
Pattern:     C:/Users/[^"]+/fnm_multishells/[^"]+/node\.exe
Replacement: Z:/tools/nodejs/node.exe
```

**Post-patch verification**:
```
1.0.146: fnm_multishells=0  Z:/tools/nodejs/node.exe=13  (CLEAN)
1.0.141: fnm_multishells=0  Z:/tools/nodejs/node.exe=13  (CLEAN)
```

**Script updated**: `tools/repatch-context-mode-hooks-json.ps1` now handles BOTH the version-prefix pattern AND the fnm_multishells node binary pattern in a single idempotent pass (W341-Q6 extension). Future re-runs after plugin updates will patch both issues automatically.

**CR-6 evidence**: `fnm_multishells=0` confirmed via PowerShell `([regex]::Matches($c, 'fnm_multishells')).Count` on post-patch file content.

---

## Q2 — Plugin SHA Drift Proposal

**Status**: PROPOSE-ONLY doc written. NO execution performed (operator-sign required).

**Doc written**: `docs/architecture/W341-GAP-RESOLUTION/Q2-PLUGIN-DRIFT-PROPOSAL.md`

**Summary of proposal**:
- 3 plugins with silent SHA drift: `everything-claude-code` (`8148340a`≠`1e8c7e79`), `superpowers` (`f2cbfbef`≠`647ca50f`), `context-mode` (`6bbcb443`≠`4dcbd451`)
- Proposal includes: pre-snapshot commands, per-plugin Remove-Item + /plugin install sequence, post-verification SHA probes, rollback procedure
- Risk: MEDIUM — requires closing all active CC sessions before execution
- Special note: context-mode reinstall requires immediate `repatch-context-mode-hooks-json.ps1` re-run (new install will regenerate fnm_multishells paths)

---

## Files Changed This Wave

| File | Action | Q |
|---|---|---|
| `tools/subagent-stop-guard.mjs` | CREATED (137 lines) | Q8 |
| `.claude/settings.json` | MODIFIED — added `hooks.SubagentStop` block | Q8 |
| `tools/repatch-context-mode-hooks-json.ps1` | MODIFIED — added fnm_multishells patch (Part 2) | Q6 |
| `.claude/plugins/cache/context-mode/context-mode/1.0.146/hooks/hooks.json` | MODIFIED — fnm_multishells → Z:/tools/nodejs/node.exe (13 refs) | Q6 |
| `.claude/plugins/cache/context-mode/context-mode/1.0.141/hooks/hooks.json` | MODIFIED — version-prefix → ${CLAUDE_PLUGIN_ROOT} (13 refs, repatch script) | Q6 |
| `docs/architecture/W341-GAP-RESOLUTION/Q2-PLUGIN-DRIFT-PROPOSAL.md` | CREATED | Q2 |
| `docs/architecture/W341-GAP-RESOLUTION/B-deliverable.md` | CREATED (this file) | synthesis |

---

## Cardinal Rule Compliance

| Rule | Status |
|---|---|
| CR-1 (install from trusted sources) | Q8 uses `tools/` path (operator-curated, same precedent as existing guards) |
| CR-2 (hooks = direct-CLI invocations) | `"Z:/tools/nodejs/node.exe" "...subagent-stop-guard.mjs"` — direct invocation |
| CR-3 (subagents = installed upstream) | Not applicable to this wave |
| CR-4 (behavior in settings.json) | SubagentStop entry in `hooks` block of `settings.json` |
| CR-5 (safety via permissions, not guard scripts) | Q11 CR-5(b) acknowledged (1st-violation advisory exit-0 is sanctioned). Q8 guard is purely binding (exit-2 on empty message) — CR-5 applies via the operator escape hatch `CLAUDE_SUBAGENT_STOP_GUARD_DISABLE=1` as safety valve |
| CR-6 (verify-before-claim) | All claims cite PowerShell output/exit codes in this document |

---

## Anti-Δ-G49 Contract

This message is non-empty. All 4 sub-tasks have substantive deliverables or documented findings. No `NO-FINDINGS:` sentinel needed.
