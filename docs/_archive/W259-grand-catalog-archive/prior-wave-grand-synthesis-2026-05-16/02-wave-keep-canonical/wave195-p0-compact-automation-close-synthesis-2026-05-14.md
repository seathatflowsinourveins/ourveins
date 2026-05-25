---
title: W195 P0 — COMPACT-AUTOMATION WIRE — close-synthesis
status: AUTHORITATIVE
date: 2026-05-14
agent: worktree-agent-a403a2487d4b84768
---

# W195 P0 — COMPACT-AUTOMATION WIRE — close-synthesis

## Verdict

**DONE** — recalibrated `auto-compact-discipline.md` Rank #3 from stop-and-handoff to SOTA save→compact→restore loop (ADVISORY, never blocking). codex T1 NEEDS-REVISION → Pattern A 6-prescription apply; codex T2 1 valid P2 → fixed. Single atomic commit. /plugin install: ALREADY DONE.

## Root-cause confirmed (grounding from R1-R3, not re-researched)

The "compact hooks pose a hard limit" complaint is NOT mechanical. `userpromptsubmit_compact_threshold.py` + `posttooluse_context_monitor.js` + `precompact_hint_emitter.py` + `sessionstart_compact_hint_reader.py` are ALL advisory (additionalContext/systemMessage/exit-0, NO `decision:block`). The blocking behavior was RULE-LAYER: `auto-compact-discipline.md` Rank #3 + checklist step 6 ("At ~300k context: STOP planning new work; ship current Bundle + commit + /clear") trained a STOP-and-handoff. Fix = the rule.

## Sources read (file:line + HEAD SHA)

| Source | HEAD SHA | What |
|---|---|---|
| GSD `docs/context-monitor.md` + `hooks/gsd-context-monitor.js:158-191` | `3aaed8f5d7c3492678b867e6687d42c88fe227e5` | statusline→bridge-file→PostToolUse monitor→additionalContext advisory; "never use imperative commands"; "Silent fail — never block tool execution" |
| ECC `scripts/hooks/pre-compact.js:24-31,41-47` | `841beea45cb25ba51f29fa45b7e272938d19b80a` | PreCompact state-save (compaction-log.txt + session note); `process.exit(0)` never blocks |
| wshobson `plugins/context-management/commands/context-save.md` + `context-restore.md` + `plugin.json` | `ece811f23310a37ceb43496dbac0e244fe6845b6` | `/context-save` + `/context-restore` persist/rehydrate command pattern; MIT, Seth Hobson, v1.2.0 |
| CCBP `best-practice/claude-settings.md:826,967` | `48f2cebeb88b389b27231c418ceadb65baf813fd` | `CLAUDE_AUTOCOMPACT_PCT_OVERRIDE` + `CLAUDE_CODE_AUTO_COMPACT_WINDOW` env vars (NOT the local WARN/CRIT levels) |
| LOCAL `compact_hint.v1.json` schema + 3 installed hooks | runtime | bridge artifact already exists — 8 `required` fields; `precompact_hint_emitter.py:39` writer + `sessionstart_compact_hint_reader.py:38` reader hard-wired to `compact_hint.json`; `posttooluse_context_monitor.js:65-66` thresholds |

## codex T1 verdict (pre-edit)

`.claude/state/codex_consult_w195_p0_compact_recalibration_OUT.txt` — **NEEDS-REVISION conf~0.88**, 6 prescribed_edits (Pattern A — apply ALL in single atomic commit):
1. Use existing `compact_hint.json` / `compact_hint.v1` schema — do NOT invent `compact_bridge_<session>.json` (would be unimplemented mechanism). ✅ applied
2. "active agent treats advisory threshold as trigger" — NOT "the runtime executes" (implies gate/daemon). ✅ applied
3. Threshold attribution: cite local hook lines for WARN/CRIT (TIER-3-LOCAL-COMPOSITION), NOT CCBP; no HIGH level. ✅ applied
4. Explicit Rank #3 (operational discipline) vs Rank #3.5 (hook behavior exit-0) boundary sentence. ✅ applied
5. Narrow wshobson claim to "cite-adapt the persist/restore command pattern" — commands don't prove a fully-automated loop. ✅ applied
6. Anti-pattern = "Stop-and-handoff at threshold as a mandatory halt" — do NOT refute "wrap up current logical unit" (GSD warning text still advises avoiding new complex work). ✅ applied

## codex T2 verdict (uncommitted review)

`.claude/state/codex_review_w195_p0_t2.txt` — **2 P2 findings, no P0/P1**:
- P2-1 `sessions/` untracked transcript — NOT in my commit scope; only `auto-compact-discipline.md` committed. Orchestrator note: root `sessions/` not in `.gitignore` (only `.claude/sessions/`) — separate gitignore-hygiene ship, out of W195 P0 scope.
- P2-2 (valid) `compact_hint.v1.json` marks `commands_run` as required; my PERSIST field list omitted it. ✅ FIXED — field list now enumerates all 8 `required` fields verbatim from schema.

## Recalibration diff summary

`.claude/rules/auto-compact-discipline.md` (+35 / -16, 1 file):
- **Rank #3 heading** L65: "Pre-emptive /compact <hint>" → "SOTA save→compact→restore loop (ADVISORY automation, never blocking)"
- **Rank #3 body** L67-81: added Scope-discipline sentence (Rank #3 = operational agent discipline; Rank #3.5 = hooks exit-0, never `decision:block`); 3-step loop (PERSIST to memory stack + `compact_hint.json` 8-field bridge / SELF-/COMPACT with hint = agent CHOOSES / RESTORE via SessionStart reader + wshobson `/context-save`+`/context-restore` cite-adapt); GSD bridge-file advisory pattern paragraph
- **Checklist step 5/6** L~130-135: step 5 "finish current logical unit then execute Rank #3 loop"; step 6 "execute loop and CONTINUE — `/clear` only on genuinely-new task" (was "STOP planning new work + /clear")
- **Anti-patterns** L~140: added "Stop-and-handoff at threshold as a mandatory halt" + "Hook `decision:block` for compaction"; kept "let autocompact fire blind"
- **Cite-class lattice header / Cite anchors / Update triggers / Promotion threshold**: added 4 SOTA cites (GSD + ECC + wshobson + CCBP); 8 distinct upstream cites total

## /plugin install status — ALREADY DONE

wshobson `context-management` v1.2.0 is **ALREADY INSTALLED**: `.claude/plugins/cache/claude-code-workflows/context-management/1.2.0/.in_use` present + marketplace `claude-code-workflows` registered at `.claude/plugins/marketplaces/`. `/context-save` + `/context-restore` commands are available. No install action needed. (Had it not been installed, the official non-interactive path is `/plugin marketplace add wshobson/agents` then `/plugin install context-management@claude-code-workflows` — both non-interactive slash commands.)

## No new hook needed

The 3 supporting hooks (`posttooluse_context_monitor.js` GSD-pattern advisory / `precompact_hint_emitter.py` PreCompact bridge-writer / `sessionstart_compact_hint_reader.py` SessionStart bridge-reader) ALL already exist + are advisory-only. The `compact_hint.json` bridge artifact + `compact_hint.v1.json` schema already exist. P0 part 2 (cite-adapt GSD bridge-file) is satisfied by referencing the existing installed surface — NO new hook or rule section added. Zero `decision:block` introduced anywhere.

## Honest limits — orchestrator MUST verify before merge

1. **codex T1 conf is INFERRED** as ~0.88 — the 1.1MB codex output had no explicit `conf=` line; verdict was clearly NEEDS-REVISION with 6 numbered prescribed_edits at EOF. Orchestrator: spot-check `.claude/state/codex_consult_w195_p0_compact_recalibration_OUT.txt` tail (~L6480-6539).
2. **P2-1 deferred, not fixed** — root `sessions/` not in `.gitignore`. Out of W195 P0 scope (only `auto-compact-discipline.md` committed). Orchestrator may queue a gitignore-hygiene ship.
3. **wshobson RESTORE-step is "cite-adapt the command pattern"** — `/context-save`+`/context-restore` invocation path NOT verified end-to-end this fire (plugin cached + `.in_use`, but live invocation untested). Rule update-trigger records the promotion gate. Mia note for orchestrator: this is a deliberate codex-prescribed narrowing, not an OVER.
4. **No runtime test of the loop** — recalibration is rule-text; the save→compact→restore loop is operational agent discipline, not mechanically testable. Verification is the codex T1+T2 gate + Mia pre-apply at merge.
5. Commit scope = `auto-compact-discipline.md` ONLY. `git status` shows large untracked tree (pre-existing, not mine) — orchestrator verify `git show --stat <commit>` = 1 file.
