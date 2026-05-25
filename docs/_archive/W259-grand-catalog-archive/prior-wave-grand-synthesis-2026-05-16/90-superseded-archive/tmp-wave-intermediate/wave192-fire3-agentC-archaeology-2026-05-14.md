# W192 Fire 3 — Agent C archaeology

Date: 2026-05-14
Role: gpt5-archaeologist stand-in
Inputs:
- `tmp/w192-B-codex-bridgemode-2026-05-14.md`
- `tmp/w192-A-14repo-2026-05-14.md`

## PRESCRIBED_EDITS_EXTRACTED (from Agent B)

Agent B verdict: `NEEDS-REVISION conf=0.88` (`BRIDGE-MODE-FULL`).

Agent A artifact status: PRESENT. Top-3 ADOPT-NOW extracted:
1. R9 `gsd-build/get-shit-done` — direct upstream-install replacement/promotion path for current cite-adapted `posttooluse_context_monitor.js`; closes compact-remind hook-content gap.
2. R10 `vercel-labs/agent-skills` — Vercel-curated React/Next.js/web-design skills; genuinely new frontend-design use case.
3. R6 `mattpocock/skills` — selective cite-import of engineering skills; skip interactive setup due HARD-GATE-FAIL.

Agent B AXIS-1 classifications:
- `HONEST-NON-FINDING` in Agent B because Agent A was absent during B's run.
- No Agent B OVER/UNDER candidate classification issued for Agent A claims.
- Current Fire 3 state differs: Agent A artifact exists and was read.

Prescribed edits:

- P-001: `tools/eee.ps1:83-85 @ HEAD 8c07ca3f373b1fe7b119713c7bfe67285c0776da` and `tools/eee-backup.ps1:76 @ HEAD 8c07ca3f373b1fe7b119713c7bfe67285c0776da` — remove launcher-level `CLAUDE_AUTOCOMPACT_PCT_OVERRIDE='85'` or change it to documented target with authority. Preferred fix-forward: make `.claude/settings.json` authoritative because `tools/eee.ps1:11` says per-install env additions live in settings/env directives.
- P-002: `docs/sota-feature-activation.md:25 @ HEAD 8c07ca3f373b1fe7b119713c7bfe67285c0776da` — replace stale `CLAUDE_AUTOCOMPACT_PCT_OVERRIDE=70` ACTIVE claim with verified current state: settings does not define override; `CLAUDE.local.md` only has 70 commented; launcher currently sets 85 until P-001 lands.
- P-003: `.claude/hooks/scripts/userpromptsubmit_compact_threshold.py:6-8 @ HEAD 8c07ca3f373b1fe7b119713c7bfe67285c0776da` — update docstring from `HIGH >=700k, CRIT >=780k` to `HIGH >=650k, CRIT >=700k`, matching code at lines 90-92 and settings lines 25-27.
- P-004: `.claude/rules/auto-compact-discipline.md:28,63,132,139 @ HEAD 8c07ca3f373b1fe7b119713c7bfe67285c0776da` and retained operator-local note `CLAUDE.local.md:86-94` — replace unsupported "autocompact at ~80 default" wording with "local target/assumption"; cite `Z:/repos/deps/claude-code-best-practice-shan/best-practice/claude-settings.md:826 @ HEAD 48f2cebeb88b389b27231c418ceadb65baf813fd`, which documents default roughly 95 unless overridden.
- P-005: Refresh stale inventory counts in `AGENTS.md` and/or `docs/sota-installed-manifest.md` for hooks, agents, commands, and skills: observed values are 36 top-level hook scripts, 58 wired hook handlers, 11 top-level agent files / 13 recursive agent markdown files, 4 command files, and 22 `SKILL.md` files.
- P-006: Add compact-remind risk row to relevant audit/discipline document covering `.claude/hooks/scripts/precompact_hint_emitter.py`, `.claude/hooks/scripts/sessionstart_compact_hint_reader.py`, and `.claude/hooks/scripts/posttooluse_context_monitor.js`: record byte caps, measured post-compact reinflation delta, disable criteria, and advisory-context injection around compact boundaries.

## MIA_VERIFICATION_RESULTS (GENUINE-GAP vs OVER per prescription)

- P-001: GENUINE-GAP.
  - File existence: `tools/eee.ps1`, `tools/eee-backup.ps1`, and `.claude/settings.json` exist.
  - Line-content claim verified: `tools/eee.ps1:83-85` says trigger autocompact at 85 rather than ~95 default and sets `$env:CLAUDE_AUTOCOMPACT_PCT_OVERRIDE = '85'`.
  - Line-content claim verified: `tools/eee-backup.ps1:76` sets `$env:CLAUDE_AUTOCOMPACT_PCT_OVERRIDE = '85'`.
  - Wire-status claim verified: `.claude/settings.json:20-30` includes compact token env vars but no `CLAUDE_AUTOCOMPACT_PCT_OVERRIDE`.
  - Apply note: choose one authority; Agent B's preferred path is settings authority, but launcher comment must not retain unsupported 85/default framing.

- P-002: GENUINE-GAP.
  - File existence: `docs/sota-feature-activation.md` exists.
  - Line-content claim verified: `docs/sota-feature-activation.md:25` claims `CLAUDE_AUTOCOMPACT_PCT_OVERRIDE=70` ACTIVE from `.claude/settings.json`.
  - Wire-status claim verified: `.claude/settings.json` has no autocompact override.
  - Line-content claim verified: `CLAUDE.local.md:86-94` retains 70% override only as commented-out operator-local note.
  - Current active contradiction verified: launchers set 85 until P-001 changes.

- P-003: GENUINE-GAP.
  - File existence: `.claude/hooks/scripts/userpromptsubmit_compact_threshold.py` exists.
  - Line-content claim verified: docstring lines 6-8 say WARN 600k, HIGH 700k, CRIT 780k.
  - Line-content claim verified: code lines 90-92 set WARN 600k, HIGH 650k, CRIT 700k.
  - Wire-status claim verified: `.claude/settings.json:25-27` mirrors 600k/650k/700k.

- P-004: GENUINE-GAP.
  - File existence: `.claude/rules/auto-compact-discipline.md` and `CLAUDE.local.md` exist.
  - Line-content claim verified: `.claude/rules/auto-compact-discipline.md:28,63,132,139` repeats "autocompact at 80%" as if default/current fact.
  - Line-content claim verified: `CLAUDE.local.md:86-94` repeats default ~80 framing while also documenting W183 F1 REVERT of the 70 override.
  - Agent B's external-authority claim remains plausible against local B artifact; Fire 3 did not re-read the dependency file because the prescribed edit is to correct local unsupported wording, already refuted by launcher/settings/local state.
  - Apply note: classify exact 80% as local assumption/target unless backed by checked current official/dependency anchor.

- P-005: GENUINE-GAP.
  - Count claims verified:
    - top-level `.claude/hooks/scripts` files: 36
    - wired hook handlers in `.claude/settings.json`: 58
    - top-level `.claude/agents/*.md`: 11
    - recursive `.claude/agents/**/*.md`: 13
    - recursive `.claude/commands` files: 4
    - recursive `.claude/skills/**/SKILL.md`: 22
  - Stale local docs verified: `AGENTS.md:155-156` still says 644 `SKILL.md` available and 8 agents; `AGENTS.md:179` still says 7 PreToolUse:Bash hooks.
  - Manifest has relevant installed rows but no single fresh inventory summary matching the verified counts.

- P-006: GENUINE-GAP.
  - File existence verified for all three named hooks.
  - Wire-status verified:
    - `posttooluse_context_monitor.js` is wired by settings PostToolUse contexts per Agent B and exists locally.
    - `sessionstart_compact_hint_reader.py` is wired at `.claude/settings.json:496-500` under `SessionStart` matcher `compact`.
    - `precompact_hint_emitter.py` is wired at `.claude/settings.json:527-530` under `PreCompact`.
  - Byte/char caps verified:
    - `precompact_hint_emitter.py:19-20,44,143-145` caps stdout body at 9500 chars.
    - `sessionstart_compact_hint_reader.py:14,45,193-201` caps output at 9500 chars and emits `hookSpecificOutput.additionalContext`.
    - `posttooluse_context_monitor.js:71,150-167` has disable env `POSTTOOLUSE_CONTEXT_MONITOR_DISABLE=1` and emits advisory `additionalContext`.
  - Documentation gap verified: search found W184/W192 compact-hook context but no compact-remind risk row recording all requested fields: byte caps, measured post-compact reinflation delta, disable criteria, and advisory context injection.

## REVERT_ARCHAEOLOGY (per target file)

Method:
- Ran `git log --all --oneline -- '<target-path>'` for each target file.
- Ran subject-level REVERT scan with `git log --all --format='%h %s' -- '<target-path>' | Select-String -Pattern 'revert'`.
- Cross-referenced known CR-9 REVERT precedents from `CLAUDE.md`: `bash_command_allowlist.py`, `fleet_health_start.py`, `permission_request_auto_approve.py`.

Per target:

- `tools/eee.ps1`
  - Recent history includes launcher/cpa fixes and one NEEDS-REV fix-forward (`861ee43`), but no subject-level REVERT for this file.
  - No match to known CR-9 REVERT precedent file names.

- `tools/eee-backup.ps1`
  - Only baseline tracked commit observed (`69e5fd4`).
  - No subject-level REVERT.
  - No match to known CR-9 REVERT precedent file names.

- `docs/sota-feature-activation.md`
  - History: initial codification (`2f97159`) and stale SHA-pin fix (`7cb64a0`).
  - No subject-level REVERT.
  - No match to known CR-9 REVERT precedent file names.

- `.claude/hooks/scripts/userpromptsubmit_compact_threshold.py`
  - History includes `c11db54` W187 compact-remind Pattern A round-2 and `02f72fd` estimator over-count fix.
  - No subject-level REVERT.
  - No match to known CR-9 REVERT precedent file names.

- `.claude/rules/auto-compact-discipline.md`
  - History includes initial codification (`fee8e68`) and W177 Pattern A Rank #3.5 apply (`6b41cc3`).
  - No subject-level REVERT.
  - No match to known CR-9 REVERT precedent file names.

- `CLAUDE.local.md`
  - No tracked git history returned for the file path; operator-local surface.
  - The file content itself records W183 F1 REVERT of the commented 70% override, so edits here should preserve that history and not re-enable the override accidentally.
  - No match to known CR-9 REVERT precedent file names.

- `AGENTS.md`
  - History includes multiple docs updates and `1ac2919` subject containing `wrapper-revert`; this is not a REVERT of `AGENTS.md` itself, but it is a nearby cautionary precedent for wrapper/runtime documentation churn.
  - No match to known CR-9 REVERT precedent file names.

- `docs/sota-installed-manifest.md`
  - Heavy history with many Pattern A/fix-forward/forward-correction commits.
  - Subject-level REVERT terms found in historical status-correction commits:
    - `d20a496` status flip to `REVERTED-POST-INSTALL;CACHED-ORPHANED-NOT-INSTALLED`
    - `b4e7bbf` "3 INSTALLED + 1 REVERTED + 2 REJECTED-FOR-FIT"
    - `1ac2919` wrapper-revert mention
  - These are manifest-recorded status/reconciliation precedents, not a direct revert of the manifest file.
  - No match to known CR-9 REVERT precedent file names.

- `.claude/hooks/scripts/precompact_hint_emitter.py`
  - History includes `02f72fd` compact threshold estimator fix bundle.
  - No subject-level REVERT.
  - No match to known CR-9 REVERT precedent file names.

- `.claude/hooks/scripts/sessionstart_compact_hint_reader.py`
  - History includes `c11db54` W187 compact-remind Pattern A round-2 and `02f72fd` estimator fix bundle.
  - No subject-level REVERT.
  - No match to known CR-9 REVERT precedent file names.

- `.claude/hooks/scripts/posttooluse_context_monitor.js`
  - History includes `f4d92d6` W189 dormant compact-advisory wire/cite-adapt gsd monitor.
  - No subject-level REVERT.
  - No match to known CR-9 REVERT precedent file names.

Known REVERT precedent cross-reference:
- `bash_command_allowlist.py`: documented in `CLAUDE.md:81` and `.claude/rules/lga-five-layers.md` as Wave 11A intentional removal / accepted safety regression. Not a W192 target.
- `fleet_health_start.py`: documented in `CLAUDE.md:81` as known REVERT list. Not a W192 target.
- `permission_request_auto_approve.py`: documented in `CLAUDE.md:81` and related rule docs as known REVERT/safety precedent. Not a W192 target.

## BUG_MAGNET_ANALYSIS (risk tier per file)

Top target surfaces by edit frequency/churn relevance:

- `docs/sota-installed-manifest.md` — HIGH.
  - Reason: very dense recent history with repeated Pattern A, NEEDS-REVISION, forward-correction, stale-claim, and status-flip commits. Subject scan returned many W155/W188/W189/W191 correction commits.
  - Risk: high chance of stale denominator/count drift or accidental historical-row rewrite. Prefer a narrow current-state note or single-row forward addition, not broad table normalization.

- `.claude/hooks/scripts/userpromptsubmit_compact_threshold.py` — MED.
  - Reason: compact threshold logic changed recently in W187 Pattern A round-2 (`c11db54`) and earlier estimator over-count bug fix (`02f72fd`).
  - Risk: docstring-only correction is low mechanical risk, but any code threshold change would be medium/high because it can affect prompt blocking/advisory behavior.

- `.claude/rules/auto-compact-discipline.md` — MED.
  - Reason: compact discipline is young and already had W177 Pattern A modification (`6b41cc3`) after initial codification (`fee8e68`).
  - Risk: wording correction is manageable, but exact compact/default claims are volatile and should be framed as local assumption unless externally anchored.

Additional file notes:
- `tools/eee.ps1` — MED: launcher is runtime-critical and has multiple historical fix commits, but the prescribed env-line change is small and reversible.
- `tools/eee-backup.ps1` — LOW/MED: backup launcher has minimal history but should mirror canonical launcher authority to avoid future drift.
- `docs/sota-feature-activation.md` — LOW/MED: stale doc surface; small table edits, but active-state claims decay quickly.
- `AGENTS.md` — MED: cross-agent contract with stale primitive counts; doc-only, but widely consumed by tools.
- Compact-remind hook files (`precompact_hint_emitter.py`, `sessionstart_compact_hint_reader.py`, `posttooluse_context_monitor.js`) — MED: injection/advisory surfaces around compact boundaries; P-006 is documentation-only, but the underlying behavior is sensitive.

## PATTERN_A_APPLY_QUEUE (surviving verified prescriptions ready for atomic commit)

All six prescriptions survive Mia verification:

1. P-001 APPLY: normalize `CLAUDE_AUTOCOMPACT_PCT_OVERRIDE` authority. Preferred: remove launcher-level active 85 override or move/update authority into `.claude/settings.json`; update both `tools/eee.ps1` and `tools/eee-backup.ps1` consistently.
2. P-002 APPLY: fix `docs/sota-feature-activation.md:25` active-state claim from stale 70/settings assertion to current verified state, with a note that launcher 85 remains active until P-001 lands.
3. P-003 APPLY: docstring-only update in `userpromptsubmit_compact_threshold.py` from 600/700/780 to 600/650/700.
4. P-004 APPLY: change `auto-compact-discipline.md` and retained `CLAUDE.local.md` note from unsupported default-80 framing to local target/assumption framing; preserve W183 F1 revert history.
5. P-005 APPLY: refresh inventory counts in `AGENTS.md` and/or manifest: 36 top-level hook scripts, 58 wired handlers, 11 top-level agents / 13 recursive agent markdown files, 4 command files, 22 repo-local `SKILL.md` files.
6. P-006 APPLY: add compact-remind risk row to a relevant audit/discipline document. Minimum row fields: named hooks, 9500-char caps for precompact/sessionstart hooks, `POSTTOOLUSE_CONTEXT_MONITOR_DISABLE=1`, advisory `additionalContext` injection, measured reinflation delta currently UNKNOWN/TO-MEASURE unless runtime telemetry is available, and disable criteria.

Atomicity recommendation:
- Apply as one Pattern A fix-forward bundle only if the orchestrator wants Agent B's <=10-prescription Pattern A path followed exactly.
- Keep code behavior changes minimal. P-003 is docstring-only; P-006 is documentation-only; P-001 is the only runtime-behavior-affecting edit and should be explicit about the authority decision.

## ARCHAEOLOGY: All six Agent B prescriptions are GENUINE-GAP; no direct CR-9 known REVERT target collision found; highest hotspot risk is `docs/sota-installed-manifest.md`, with compact-threshold and auto-compact rule surfaces at MED churn risk.
