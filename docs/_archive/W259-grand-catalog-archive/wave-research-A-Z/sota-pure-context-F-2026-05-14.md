# Agent E — Narrow-Scope SOTA Extension Research

Date: 2026-05-14

Target runtime: `Z:\claude-sota-pure\`

Research surface: missed SOTA repos for four Agent D gaps.

Output budget: <=500 LOC.

---

## Executive Verdict

VERDICT: NEEDS-REVISION conf=0.91

Reason:

- Gap 1 is real: no checked upstream repo wires a full Codex-labelled T1-T7 lifecycle.
- `codex@openai-codex` wires SessionStart, SessionEnd, and Stop only.
- ECC wires broad Claude hooks and useful Stop/quality/compact hooks, but not Codex T1 pre-edit, T2 pre-commit, T3 post-commit.
- CCBP has broad hook event coverage, but as sound/notification infrastructure, not a Codex gate chain.
- wshobson plugins gate PreToolUse/PostToolUse only for policy/receipts/review surfaces.
- Gap 2 has a viable permissive alternative: `everything-claude-code` strategic compact + PreCompact state preservation under MIT.
- Gap 3 is confirmed: `obra/superpowers` has no root `marketplace.json` or root `plugin.json`; Claude metadata lives under `.claude-plugin/`, and README points to official marketplace or `obra/superpowers-marketplace`.
- Gap 4 should be solved by combining CCBP env-var authority with Matt Pocock smart-zone discipline and ECC strategic compact hooks.

---

## Repository SHAs

- `claude-code-best-practice-shan` HEAD `48f2cebeb88b389b27231c418ceadb65baf813fd`
- `everything-claude-code` HEAD `841beea45cb25ba51f29fa45b7e272938d19b80a`
- `codex-plugin-cc` HEAD `807e03ac9d5aa23bc395fdec8c3767500a86b3cf`
- `wshobson-agents` HEAD `ece811f23310a37ceb43496dbac0e244fe6845b6`
- `superpowers` HEAD `f2cbfbefebbfef77321e4c9abc9e949826bea9d7`
- `awesome-agentic-patterns` HEAD `9c40e10042254ab896fed6953267b119711bae40`

---

## Scope And Method

Checked local dependency repos only.

No network authority was required for this narrow pass.

Commands run:

- `git -C <repo> rev-parse HEAD`
- `rg -n "codex|T1|T2|T3|T6|pre.?commit|post.?commit|PreCompact|Stop|SessionStart|SessionEnd|hook" ...`
- `rg -n "compact|compaction|CLAUDE_AUTOCOMPACT|context window|handoff|smart zone" ...`
- `Get-ChildItem -Force Z:/repos/deps/superpowers`
- `Test-Path Z:/repos/deps/superpowers/{marketplace.json,plugin.json,.claude-plugin/marketplace.json,.claude-plugin/plugin.json}`

Evidence style:

- `[VERIFIED]` direct file:line evidence.
- `[INFERRED]` conclusion from absent matches plus positive nearby evidence.
- `[HONEST-NON-FINDING]` explicit non-discovery after scoped search.

---

## Gap 1 — T1-T7 Hook Coverage

Question:

Find upstream repos/plugins that wire Codex T1 pre-edit, T2 pre-commit, T3 post-commit, T6 stop-gate hooks.

Checked:

- `Z:/repos/deps/claude-code-best-practice-shan/`
- `Z:/repos/deps/everything-claude-code/`
- `Z:/repos/deps/codex-plugin-cc/`
- `Z:/repos/deps/wshobson-agents/`

### Gap 1 Finding A — `codex-plugin-cc` Does Not Wire T1/T2/T3

`codex-plugin-cc` hook manifest:

- Description says optional stop-time review gate.
- Hooks object includes `SessionStart`.
- Hooks object includes `SessionEnd`.
- Hooks object includes `Stop`.
- No `PreToolUse`.
- No `PostToolUse`.
- No `PreCompact`.
- No git pre-commit/post-commit hook.

Citations:

- `Z:/repos/deps/codex-plugin-cc/plugins/codex/hooks/hooks.json:2 @ HEAD 807e03ac9d5aa23bc395fdec8c3767500a86b3cf` — optional stop-time review gate.
- `Z:/repos/deps/codex-plugin-cc/plugins/codex/hooks/hooks.json:4-14 @ HEAD 807e03ac9d5aa23bc395fdec8c3767500a86b3cf` — `SessionStart`.
- `Z:/repos/deps/codex-plugin-cc/plugins/codex/hooks/hooks.json:15-25 @ HEAD 807e03ac9d5aa23bc395fdec8c3767500a86b3cf` — `SessionEnd`.
- `Z:/repos/deps/codex-plugin-cc/plugins/codex/hooks/hooks.json:26-37 @ HEAD 807e03ac9d5aa23bc395fdec8c3767500a86b3cf` — `Stop`.
- `Z:/repos/deps/codex-plugin-cc/README.md:210-222 @ HEAD 807e03ac9d5aa23bc395fdec8c3767500a86b3cf` — `/codex:setup` manages optional review gate; enabled gate uses a `Stop` hook and can block the stop.
- `Z:/repos/deps/codex-plugin-cc/plugins/codex/scripts/stop-review-gate-hook.mjs:83-87 @ HEAD 807e03ac9d5aa23bc395fdec8c3767500a86b3cf` — `BLOCK:` review output becomes a blocking decision.
- `Z:/repos/deps/codex-plugin-cc/plugins/codex/scripts/stop-review-gate-hook.mjs:169 @ HEAD 807e03ac9d5aa23bc395fdec8c3767500a86b3cf` — emits `decision: "block"`.

Conclusion:

- `[VERIFIED]` Codex plugin supplies T6-like Stop review gate only.
- `[VERIFIED]` It does not supply T1 pre-edit, T2 pre-commit, or T3 post-commit.
- `[INFERRED]` Any pure runtime claiming T1-T7 Codex gate coverage must add local hooks or compose with other repos.

### Gap 1 Finding B — `everything-claude-code` Wires Broad Hooks But Not Codex T1/T2/T3

ECC hook manifest includes:

- `PreToolUse`
- `PreCompact`
- `SessionStart`
- `PostToolUse`
- `Stop`

Useful gate-like entries:

- `pre:edit-write:suggest-compact`
- `pre:config-protection`
- `pre:edit-write:gateguard-fact-force`
- `post:quality-gate`
- `post:edit:accumulator`
- `stop:format-typecheck`
- `stop:session-end`
- `stop:evaluate-session`
- `stop:cost-tracker`

Citations:

- `Z:/repos/deps/everything-claude-code/hooks/hooks.json:4 @ HEAD 841beea45cb25ba51f29fa45b7e272938d19b80a` — `PreToolUse`.
- `Z:/repos/deps/everything-claude-code/hooks/hooks.json:35-36 @ HEAD 841beea45cb25ba51f29fa45b7e272938d19b80a` — manual compact suggestion hook id.
- `Z:/repos/deps/everything-claude-code/hooks/hooks.json:72-73 @ HEAD 841beea45cb25ba51f29fa45b7e272938d19b80a` — config protection hook.
- `Z:/repos/deps/everything-claude-code/hooks/hooks.json:95-96 @ HEAD 841beea45cb25ba51f29fa45b7e272938d19b80a` — GateGuard fact-force pre-edit/write hook.
- `Z:/repos/deps/everything-claude-code/hooks/hooks.json:99 @ HEAD 841beea45cb25ba51f29fa45b7e272938d19b80a` — `PreCompact`.
- `Z:/repos/deps/everything-claude-code/hooks/hooks.json:108-109 @ HEAD 841beea45cb25ba51f29fa45b7e272938d19b80a` — save state before compaction.
- `Z:/repos/deps/everything-claude-code/hooks/hooks.json:125 @ HEAD 841beea45cb25ba51f29fa45b7e272938d19b80a` — `PostToolUse`.
- `Z:/repos/deps/everything-claude-code/hooks/hooks.json:149-150 @ HEAD 841beea45cb25ba51f29fa45b7e272938d19b80a` — quality gate checks after file edits.
- `Z:/repos/deps/everything-claude-code/hooks/hooks.json:172-173 @ HEAD 841beea45cb25ba51f29fa45b7e272938d19b80a` — accumulate edited JS/TS files for Stop-time format/typecheck.
- `Z:/repos/deps/everything-claude-code/hooks/hooks.json:237-248 @ HEAD 841beea45cb25ba51f29fa45b7e272938d19b80a` — Stop-time format/typecheck.
- `Z:/repos/deps/everything-claude-code/hooks/hooks.json:271-272 @ HEAD 841beea45cb25ba51f29fa45b7e272938d19b80a` — persist session state on Stop.
- `Z:/repos/deps/everything-claude-code/hooks/hooks.json:284-285 @ HEAD 841beea45cb25ba51f29fa45b7e272938d19b80a` — evaluate session for extractable patterns.
- `Z:/repos/deps/everything-claude-code/hooks/hooks.json:297-298 @ HEAD 841beea45cb25ba51f29fa45b7e272938d19b80a` — token/cost tracking.

Conclusion:

- `[VERIFIED]` ECC is the best upstream source for hook breadth and phase-adjacent quality gates.
- `[VERIFIED]` ECC does not wire Codex T1/T2/T3/T6 as a named chain.
- `[INFERRED]` ECC can supply scaffolding/patterns for T1/T3/T6, but T2 commit-time Codex gate remains a pure-runtime local addition.

### Gap 1 Finding C — CCBP Wires Many Claude Hook Events, Not Codex Gates

CCBP `.claude/settings.json` contains broad hook event coverage.

It sets `CLAUDE_AUTOCOMPACT_PCT_OVERRIDE` to `80`.

It wires a generic `hooks.py` for events including:

- `PreToolUse`
- `PostToolUse`
- `Stop`
- `SubagentStop`
- `PreCompact`
- `PostCompact`
- `SessionStart`
- `SessionEnd`
- `StopFailure`

Citations:

- `Z:/repos/deps/claude-code-best-practice-shan/.claude/settings.json:83 @ HEAD 48f2cebeb88b389b27231c418ceadb65baf813fd` — `CLAUDE_AUTOCOMPACT_PCT_OVERRIDE=80`.
- `Z:/repos/deps/claude-code-best-practice-shan/.claude/settings.json:87-99 @ HEAD 48f2cebeb88b389b27231c418ceadb65baf813fd` — `PreToolUse`.
- `Z:/repos/deps/claude-code-best-practice-shan/.claude/settings.json:113-125 @ HEAD 48f2cebeb88b389b27231c418ceadb65baf813fd` — `PostToolUse`.
- `Z:/repos/deps/claude-code-best-practice-shan/.claude/settings.json:165-177 @ HEAD 48f2cebeb88b389b27231c418ceadb65baf813fd` — `Stop`.
- `Z:/repos/deps/claude-code-best-practice-shan/.claude/settings.json:191-203 @ HEAD 48f2cebeb88b389b27231c418ceadb65baf813fd` — `SubagentStop`.
- `Z:/repos/deps/claude-code-best-practice-shan/.claude/settings.json:204-217 @ HEAD 48f2cebeb88b389b27231c418ceadb65baf813fd` — `PreCompact`.
- `Z:/repos/deps/claude-code-best-practice-shan/.claude/settings.json:218-230 @ HEAD 48f2cebeb88b389b27231c418ceadb65baf813fd` — `PostCompact`.
- `Z:/repos/deps/claude-code-best-practice-shan/CLAUDE.md:43 @ HEAD 48f2cebeb88b389b27231c418ceadb65baf813fd` — documented hook event list.
- `Z:/repos/deps/claude-code-best-practice-shan/CLAUDE.md:45 @ HEAD 48f2cebeb88b389b27231c418ceadb65baf813fd` — git commits trigger `pretooluse-git-committing` sound.

Conclusion:

- `[VERIFIED]` CCBP is hook-event coverage evidence.
- `[VERIFIED]` The CCBP hooks are generic/notification-oriented, not Codex T1-T7.
- `[INFERRED]` CCBP can justify the event surface and auto-compact env knobs, but not satisfy Agent D's Codex gate gap.

### Gap 1 Finding D — `wshobson-agents` Has Policy Hooks, Not Codex Gates

`protect-mcp`:

- Wires `PreToolUse`.
- Wires `PostToolUse`.
- Evaluates Cedar policy before tool use.
- Signs receipts after tool use.

`review-agent-governance`:

- Wires `PreToolUse`.
- Wires `PostToolUse`.
- Gates review-surface actions behind approval and signed receipts.

Citations:

- `Z:/repos/deps/wshobson-agents/plugins/protect-mcp/hooks/hooks.json:3-13 @ HEAD ece811f23310a37ceb43496dbac0e244fe6845b6` — `PreToolUse` Cedar evaluate.
- `Z:/repos/deps/wshobson-agents/plugins/protect-mcp/hooks/hooks.json:14-24 @ HEAD ece811f23310a37ceb43496dbac0e244fe6845b6` — `PostToolUse` sign receipt.
- `Z:/repos/deps/wshobson-agents/plugins/review-agent-governance/hooks/hooks.json:3-13 @ HEAD ece811f23310a37ceb43496dbac0e244fe6845b6` — review governance `PreToolUse`.
- `Z:/repos/deps/wshobson-agents/plugins/review-agent-governance/hooks/hooks.json:14-24 @ HEAD ece811f23310a37ceb43496dbac0e244fe6845b6` — review governance `PostToolUse`.
- `Z:/repos/deps/wshobson-agents/plugins/review-agent-governance/README.md:27-36 @ HEAD ece811f23310a37ceb43496dbac0e244fe6845b6` — two hooks run around every Claude Code tool call.
- `Z:/repos/deps/wshobson-agents/plugins/review-agent-governance/README.md:44-56 @ HEAD ece811f23310a37ceb43496dbac0e244fe6845b6` — review-surface scope.
- `Z:/repos/deps/wshobson-agents/plugins/review-agent-governance/.claude-plugin/plugin.json:9 @ HEAD ece811f23310a37ceb43496dbac0e244fe6845b6` — MIT license.

Conclusion:

- `[VERIFIED]` wshobson has good policy/audit hooks.
- `[VERIFIED]` It does not provide Codex T1/T2/T3/T6.
- `[INFERRED]` It is optional hardening for dangerous review surfaces, not a replacement for cross-model Codex gates.

### Gap 1 Prescribed Fix

Pattern A fix-forward shape:

1. Keep `codex@openai-codex` for slash commands and optional Stop review gate.
2. Add a pure-runtime local hook chain rather than claiming upstream coverage.
3. T1 pre-edit:
   - `PreToolUse` matcher `Edit|MultiEdit|Write`.
   - Invoke local `codex_t1_pre_edit_consult` only for architectural/design-surface changes.
   - Use ECC `pre:edit-write:gateguard-fact-force` as optional adjacent gate, not as Codex evidence.
4. T2 pre-commit:
   - Use a git pre-commit hook or Claude `PreToolUse` Bash matcher for `git commit`.
   - Run Codex review against staged diff.
   - Block commit on NEEDS-REVISION unless Pattern B HNF is explicitly logged.
5. T3 post-commit:
   - Use git post-commit hook to run bounded Codex verification and append result to handoff/state.
   - Do not block already-created commit; create follow-up task if failed.
6. T6 stop-gate:
   - Enable `codex-plugin-cc` review gate only for monitored sessions.
   - Or implement a thinner Stop hook with a local timeout and clear bypass policy.
7. T7 handoff:
   - Use ECC Stop `session-end`/`evaluate-session` pattern to persist state.
   - Add Codex verdict pointer to handoff artifacts.

Recommended report wording for Option B plan:

- "No permissive upstream repo currently supplies complete Codex T1-T7 hook coverage. Pure runtime must compose upstream Codex Stop gate plus local T1/T2/T3/T7 hooks."

---

## Gap 2 — Permissive-License Auto-Compact Alternative

Question:

Find permissive-license alternative to mksglu/context-mode for intelligent compaction.

Checked:

- `everything-claude-code`
- `claude-code-best-practice-shan`
- `awesome-agentic-patterns`
- `superpowers`

### Gap 2 Finding A — ECC Strategic Compact Is The Best Permissive Alternative

ECC license:

- `package.json` declares MIT.
- `LICENSE` is MIT.

Citations:

- `Z:/repos/deps/everything-claude-code/package.json:34 @ HEAD 841beea45cb25ba51f29fa45b7e272938d19b80a` — `"license": "MIT"`.
- `Z:/repos/deps/everything-claude-code/LICENSE:1 @ HEAD 841beea45cb25ba51f29fa45b7e272938d19b80a` — MIT License.
- `Z:/repos/deps/everything-claude-code/LICENSE:7-9 @ HEAD 841beea45cb25ba51f29fa45b7e272938d19b80a` — broad rights to use/copy/modify/distribute/sublicense/sell.

Strategic compact skill:

- Suggests manual context compaction at logical intervals.
- Explicitly prefers logical phase boundaries over arbitrary auto-compaction.
- Provides decision table.
- Advises writing important context to files or memory before compacting.

Citations:

- `Z:/repos/deps/everything-claude-code/skills/strategic-compact/SKILL.md:2-3 @ HEAD 841beea45cb25ba51f29fa45b7e272938d19b80a` — skill name/description.
- `Z:/repos/deps/everything-claude-code/skills/strategic-compact/SKILL.md:9 @ HEAD 841beea45cb25ba51f29fa45b7e272938d19b80a` — suggests manual `/compact`.
- `Z:/repos/deps/everything-claude-code/skills/strategic-compact/SKILL.md:13-17 @ HEAD 841beea45cb25ba51f29fa45b7e272938d19b80a` — long sessions, multi-phase tasks, milestones, coherence pressure.
- `Z:/repos/deps/everything-claude-code/skills/strategic-compact/SKILL.md:21-29 @ HEAD 841beea45cb25ba51f29fa45b7e272938d19b80a` — auto-compaction failure mode and logical boundaries.
- `Z:/repos/deps/everything-claude-code/skills/strategic-compact/SKILL.md:65-76 @ HEAD 841beea45cb25ba51f29fa45b7e272938d19b80a` — compaction decision guide.
- `Z:/repos/deps/everything-claude-code/skills/strategic-compact/SKILL.md:92-97 @ HEAD 841beea45cb25ba51f29fa45b7e272938d19b80a` — best practices including write before compacting and custom `/compact` summary.
- `Z:/repos/deps/everything-claude-code/scripts/hooks/suggest-compact.js:7-13 @ HEAD 841beea45cb25ba51f29fa45b7e272938d19b80a` — hook suggests logical compaction and explains manual-over-auto rationale.
- `Z:/repos/deps/everything-claude-code/scripts/hooks/suggest-compact.js:30 @ HEAD 841beea45cb25ba51f29fa45b7e272938d19b80a` — `COMPACT_THRESHOLD` default 50.
- `Z:/repos/deps/everything-claude-code/scripts/hooks/suggest-compact.js:64-71 @ HEAD 841beea45cb25ba51f29fa45b7e272938d19b80a` — suggestions after threshold/checkpoints.

PreCompact state preservation:

- Captures compaction event before Claude compacts.
- Appends compaction note to active session file.

Citations:

- `Z:/repos/deps/everything-claude-code/scripts/hooks/pre-compact.js:3 @ HEAD 841beea45cb25ba51f29fa45b7e272938d19b80a` — PreCompact hook saves state.
- `Z:/repos/deps/everything-claude-code/scripts/hooks/pre-compact.js:7-8 @ HEAD 841beea45cb25ba51f29fa45b7e272938d19b80a` — preserves important state that might be lost in summarization.
- `Z:/repos/deps/everything-claude-code/scripts/hooks/pre-compact.js:28-41 @ HEAD 841beea45cb25ba51f29fa45b7e272938d19b80a` — logs compaction event and active session marker.

Conclusion:

- `[VERIFIED]` ECC is a permissive MIT compact alternative.
- `[VERIFIED]` It is not the same as context-mode virtualization.
- `[INFERRED]` For pure runtime, ECC strategic compact plus CCBP auto-compact env controls is sufficient to replace context-mode in a permissive-license-only plan.

### Gap 2 Finding B — `superpowers` Helps Context Discipline, Not Auto-Compact

Superpowers subagent-driven development reduces context pressure by using fresh subagents.

Citations:

- `Z:/repos/deps/superpowers/skills/subagent-driven-development/SKILL.md:8-12 @ HEAD f2cbfbefebbfef77321e4c9abc9e949826bea9d7` — fresh subagent per task, isolated context, preserves coordinator context.
- `Z:/repos/deps/superpowers/skills/subagent-driven-development/SKILL.md:36-39 @ HEAD f2cbfbefebbfef77321e4c9abc9e949826bea9d7` — no context switch, fresh subagent per task, no context pollution.
- `Z:/repos/deps/superpowers/skills/subagent-driven-development/SKILL.md:63-85 @ HEAD f2cbfbefebbfef77321e4c9abc9e949826bea9d7` — implementation/review loop with dispatch per task.

Conclusion:

- `[VERIFIED]` Superpowers is useful context-pressure mitigation.
- `[HONEST-NON-FINDING]` No Superpowers auto-compact skill/hook was found in scoped search.
- `[INFERRED]` Use Superpowers for task isolation, not as the compact replacement.

### Gap 2 Finding C — `awesome-agentic-patterns` Provides Patterns, Not Installable Compact Primitive

Useful pattern evidence:

- Progressive tool discovery prevents tool-related context bloat.
- Filesystem-based agent state externalizes memory across sessions.
- Progressive disclosure avoids loading large files wholesale.

Representative citations:

- `Z:/repos/deps/awesome-agentic-patterns/research/progressive-tool-discovery-report.md:526-530 @ HEAD 9c40e10042254ab896fed6953267b119711bae40` — auto-compaction is reactive; progressive discovery is proactive.
- `Z:/repos/deps/awesome-agentic-patterns/research/filesystem-based-agent-state-report.md:156 @ HEAD 9c40e10042254ab896fed6953267b119711bae40` — filesystem as memory near context limits.
- `Z:/repos/deps/awesome-agentic-patterns/research/progressive-disclosure-large-files-report.md:13-18 @ HEAD 9c40e10042254ab896fed6953267b119711bae40` — lazy loading to avoid overwhelming context.

Conclusion:

- `[VERIFIED]` Useful conceptual patterns exist.
- `[HONEST-NON-FINDING]` No installable permissive compact hook/skill comparable to ECC strategic compact was found in scoped search.

### Gap 2 Prescribed Fix

Pattern A fix-forward shape:

1. Remove `mksglu/context-mode` from pure runtime if permissive-only policy is hard.
2. Install/use ECC `strategic-compact` skill and its hook scripts as the permissive compact discipline.
3. Wire ECC `pre:edit-write:suggest-compact` in `PreToolUse` for `Edit|MultiEdit|Write`.
4. Wire ECC `pre:compact` in `PreCompact` to persist state before compaction.
5. Add `CLAUDE_AUTOCOMPACT_PCT_OVERRIDE=50` or `80` based on selected policy.
6. Add `CLAUDE_CODE_AUTO_COMPACT_WINDOW=500000` when using 1M context but treating 500K as the compaction basis.
7. Use Superpowers subagent-driven development for context isolation during long implementation arcs.
8. State explicitly that ECC is not context virtualization; it is strategic compaction and state-preservation discipline.

---

## Gap 3 — `obra/superpowers` Marketplace Metadata

Question:

Verify whether `Z:/repos/deps/superpowers/` contains a `marketplace.json` or `plugin.json` at root for `/plugin marketplace add`.

### Gap 3 Finding

Root directory listing includes:

- `.claude-plugin/`
- `.codex-plugin/`
- `.cursor-plugin/`
- `.opencode/`
- `hooks/`
- `skills/`
- `package.json`
- `README.md`

Root directory does not include:

- `marketplace.json`
- `plugin.json`

Command evidence:

- `Test-Path Z:/repos/deps/superpowers/marketplace.json` returned `False`.
- `Test-Path Z:/repos/deps/superpowers/plugin.json` returned `False`.
- `Test-Path Z:/repos/deps/superpowers/.claude-plugin/marketplace.json` returned `True`.
- `Test-Path Z:/repos/deps/superpowers/.claude-plugin/plugin.json` returned `True`.

Metadata citations:

- `Z:/repos/deps/superpowers/.claude-plugin/marketplace.json:1-20 @ HEAD f2cbfbefebbfef77321e4c9abc9e949826bea9d7` — Claude marketplace metadata exists under `.claude-plugin/`.
- `Z:/repos/deps/superpowers/.claude-plugin/marketplace.json:10-13 @ HEAD f2cbfbefebbfef77321e4c9abc9e949826bea9d7` — plugin name `superpowers`, version `5.1.0`, source `./`.
- `Z:/repos/deps/superpowers/.claude-plugin/plugin.json:1-12 @ HEAD f2cbfbefebbfef77321e4c9abc9e949826bea9d7` — plugin metadata and MIT license under `.claude-plugin/`.
- `Z:/repos/deps/superpowers/.codex-plugin/plugin.json:1-24 @ HEAD f2cbfbefebbfef77321e4c9abc9e949826bea9d7` — Codex plugin metadata and skills path.
- `Z:/repos/deps/superpowers/README.md:35-45 @ HEAD f2cbfbefebbfef77321e4c9abc9e949826bea9d7` — official Claude plugin marketplace install: `/plugin install superpowers@claude-plugins-official`.
- `Z:/repos/deps/superpowers/README.md:47-60 @ HEAD f2cbfbefebbfef77321e4c9abc9e949826bea9d7` — Superpowers marketplace path: `/plugin marketplace add obra/superpowers-marketplace`, then `/plugin install superpowers@superpowers-marketplace`.
- `Z:/repos/deps/superpowers/hooks/hooks.json:3-15 @ HEAD f2cbfbefebbfef77321e4c9abc9e949826bea9d7` — only SessionStart hook for startup/clear/compact.

Conclusion:

- `[VERIFIED]` `obra/superpowers` checkout does not have root `marketplace.json` or root `plugin.json`.
- `[VERIFIED]` Claude plugin metadata lives under `.claude-plugin/`.
- `[VERIFIED]` README says to use official marketplace install or `obra/superpowers-marketplace`.
- `[INFERRED]` `/plugin marketplace add obra/superpowers` is suspect for Claude Code marketplace registration.

### Gap 3 Prescribed Fix

Pattern A fix-forward shape:

1. Do not prescribe `/plugin marketplace add obra/superpowers` for Claude Code.
2. Prefer official marketplace:
   - `/plugin install superpowers@claude-plugins-official`
3. If using the Superpowers marketplace:
   - `/plugin marketplace add obra/superpowers-marketplace`
   - `/plugin install superpowers@superpowers-marketplace`
4. If installing from local clone, point tooling at `.claude-plugin/` metadata explicitly and verify plugin discovery after install.
5. For Codex, use `.codex-plugin/plugin.json` and Codex plugin marketplace/search flow rather than Claude plugin marketplace assumptions.

---

## Gap 4 — SOTA Auto-Compact Discipline

Question:

Find best upstream authority for when/how to trigger auto-compact in long-arc sessions.

Checked:

- CCBP `best-practice/claude-settings.md`
- CCBP `CLAUDE.md`
- CCBP Matt Pocock transcript
- CCBP Karpathy transcript
- ECC strategic compact skill/hook

### Gap 4 Finding A — CCBP Documents Auto-Compact Controls

CCBP setting authority:

- `CLAUDE_AUTOCOMPACT_PCT_OVERRIDE` sets auto-compact threshold percentage.
- Default is ~95%.
- Lower values like `50` trigger earlier compaction.
- Values above 95 have no effect.
- `/context` monitors current usage.
- `CLAUDE_CODE_AUTO_COMPACT_WINDOW` decouples auto-compact threshold from full model context, useful on 1M context.
- `DISABLE_AUTO_COMPACT` disables automatic compaction.
- `DISABLE_COMPACT` disables automatic and manual compaction.

Citations:

- `Z:/repos/deps/claude-code-best-practice-shan/best-practice/claude-settings.md:673-676 @ HEAD 48f2cebeb88b389b27231c418ceadb65baf813fd` — statusline context window fields.
- `Z:/repos/deps/claude-code-best-practice-shan/best-practice/claude-settings.md:725 @ HEAD 48f2cebeb88b389b27231c418ceadb65baf813fd` — tip: use `/compact` at ~50% context.
- `Z:/repos/deps/claude-code-best-practice-shan/best-practice/claude-settings.md:826 @ HEAD 48f2cebeb88b389b27231c418ceadb65baf813fd` — `CLAUDE_AUTOCOMPACT_PCT_OVERRIDE` semantics.
- `Z:/repos/deps/claude-code-best-practice-shan/best-practice/claude-settings.md:967 @ HEAD 48f2cebeb88b389b27231c418ceadb65baf813fd` — `CLAUDE_CODE_AUTO_COMPACT_WINDOW`.
- `Z:/repos/deps/claude-code-best-practice-shan/best-practice/claude-settings.md:968-969 @ HEAD 48f2cebeb88b389b27231c418ceadb65baf813fd` — disable flags.
- `Z:/repos/deps/claude-code-best-practice-shan/CLAUDE.md:98-101 @ HEAD 48f2cebeb88b389b27231c418ceadb65baf813fd` — manual compact around 50%, keep subtasks under 50%.

Conclusion:

- `[VERIFIED]` CCBP is best local upstream authority for Claude Code compact knobs.
- `[VERIFIED]` CCBP recommends earlier/manual compaction around 50% for discipline, while settings default auto-compact is ~95%.

### Gap 4 Finding B — Matt Pocock Transcript Provides Timing Discipline

Matt Pocock guidance:

- Coding quality degrades around 40% or roughly 100K tokens.
- Big contexts are good for retrieval but less good for coding.
- Prefer small tasks that fit the smart zone.
- Compacting repeatedly through long tasks accumulates sediment.
- Prefer clear/fresh context and destination documents.
- Review should run in fresh/smart-zone context after implementation.

Citations:

- `Z:/repos/deps/claude-code-best-practice-shan/videos/claude-matt-pocock-24-apr-26.md:37-41 @ HEAD 48f2cebeb88b389b27231c418ceadb65baf813fd` — smart zone/dumb zone and degradation around 40%/100K.
- `Z:/repos/deps/claude-code-best-practice-shan/videos/claude-matt-pocock-24-apr-26.md:45-49 @ HEAD 48f2cebeb88b389b27231c418ceadb65baf813fd` — repeated compact loop is weak; break into smaller phase-n work.
- `Z:/repos/deps/claude-code-best-practice-shan/videos/claude-matt-pocock-24-apr-26.md:55-63 @ HEAD 48f2cebeb88b389b27231c418ceadb65baf813fd` — session phases, clear vs compact, written record.
- `Z:/repos/deps/claude-code-best-practice-shan/videos/claude-matt-pocock-24-apr-26.md:125-129 @ HEAD 48f2cebeb88b389b27231c418ceadb65baf813fd` — summarize valuable planning context into destination document.
- `Z:/repos/deps/claude-code-best-practice-shan/videos/claude-matt-pocock-24-apr-26.md:151 @ HEAD 48f2cebeb88b389b27231c418ceadb65baf813fd` — 1M context gives more retrieval room, but about 100K remains smart zone for coding.
- `Z:/repos/deps/claude-code-best-practice-shan/videos/claude-matt-pocock-24-apr-26.md:247-249 @ HEAD 48f2cebeb88b389b27231c418ceadb65baf813fd` — review in fresh/smart-zone context, not after implementation has consumed context.

Conclusion:

- `[VERIFIED]` Matt Pocock provides the strongest discipline for timing: do not wait for near-full context.
- `[INFERRED]` Auto-compact should be a backstop; planned manual compaction/clear at phase boundaries is the primary discipline.

### Gap 4 Finding C — Karpathy Transcript Is General Context Authority, Not Compact Timing

Karpathy transcript confirms context as the primary lever in software 3.0.

Citation:

- `Z:/repos/deps/claude-code-best-practice-shan/videos/claude-karpathy-ai-engineer-02-may-26.md:45 @ HEAD 48f2cebeb88b389b27231c418ceadb65baf813fd` — context window is the lever over the LLM interpreter.

Conclusion:

- `[VERIFIED]` Useful conceptual support.
- `[HONEST-NON-FINDING]` No specific compact timing rule found there in the scoped search.

### Gap 4 Prescribed Fix

Pattern A fix-forward shape:

1. Add compact policy to pure runtime docs:
   - "Manual `/compact` at logical phase boundaries, usually around 40-50% or 100K effective coding context."
2. Set auto-compact as backstop:
   - `CLAUDE_AUTOCOMPACT_PCT_OVERRIDE=50` for aggressive smart-zone discipline, or `80` if preserving longer retrieval context.
3. On 1M context:
   - `CLAUDE_CODE_AUTO_COMPACT_WINDOW=500000` if using 500K as operational cap.
4. Add ECC strategic compact:
   - `PreToolUse` suggests compaction after threshold and phase changes.
   - `PreCompact` persists compaction event/state.
5. Require destination documents:
   - Research/design context must be summarized into PRD/spec/issue files before compaction.
6. Review phase:
   - Start review in fresh context or subagent, not after implementation consumes the session.
7. Explicitly document non-goal:
   - Do not depend on context-mode due Elastic-2.0 if pure runtime policy is permissive-only.

---

## Cross-Gap Fix-Forward Plan

For `Z:\claude-sota-pure\`, apply the following in one plan revision:

1. Replace "install context-mode" with "install ECC strategic compact and PreCompact state saver".
2. Add CCBP compact env knobs:
   - `CLAUDE_AUTOCOMPACT_PCT_OVERRIDE`
   - optional `CLAUDE_CODE_AUTO_COMPACT_WINDOW`
3. Correct Superpowers install:
   - official: `/plugin install superpowers@claude-plugins-official`
   - marketplace: `/plugin marketplace add obra/superpowers-marketplace`
4. Change Codex gate claim:
   - from "codex plugin wires T1-T7"
   - to "codex plugin provides slash commands plus optional T6 Stop gate; pure runtime adds local T1/T2/T3/T7 hooks."
5. If using ECC hooks:
   - cite ECC as general hook/quality/compact source, not as Codex gate source.
6. If using wshobson:
   - cite it as optional policy/audit hardening for PreToolUse/PostToolUse.
7. Add honest non-finding:
   - "No checked upstream repo provides complete Codex T1-T7 hook chain."

---

## Risk Notes

- T2 pre-commit Codex gate is not supplied by Claude plugin marketplace artifacts checked here.
- Git hook implementation must be local to pure runtime or sourced from a different upstream not in this scoped pass.
- Codex Stop gate can run up to 15 minutes and README warns about loops/usage drain.
- ECC compact alternative is MIT and practical, but weaker than true context virtualization.
- Superpowers install path was materially wrong if previous plan used `/plugin marketplace add obra/superpowers`.

---

## Final Recommendation

Revise the Option B pure runtime plan before shipping.

Minimum acceptable revision:

- Use ECC strategic compact as permissive compact layer.
- Correct Superpowers marketplace/install instructions.
- Treat Codex plugin as T6 Stop gate only.
- Add pure local T1/T2/T3/T7 hook implementation or mark those gates as planned work.
- Adopt CCBP auto-compact knobs and Matt Pocock phase-boundary compact discipline.

VERDICT: NEEDS-REVISION conf=0.91
