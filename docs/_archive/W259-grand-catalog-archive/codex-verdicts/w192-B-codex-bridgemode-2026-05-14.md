VERDICT: NEEDS-REVISION conf=0.88
prescribed_edits[]:
- P-001: In `tools/eee.ps1:83-85 @ HEAD 8c07ca3f373b1fe7b119713c7bfe67285c0776da` and `tools/eee-backup.ps1:76 @ HEAD 8c07ca3f373b1fe7b119713c7bfe67285c0776da`, remove the launcher-level `CLAUDE_AUTOCOMPACT_PCT_OVERRIDE='85'` or change it to the documented target and cite its authority. Preferred fix-forward: make `.claude/settings.json` the authoritative environment surface because `tools/eee.ps1:11 @ HEAD 8c07ca3f373b1fe7b119713c7bfe67285c0776da` says per-install env additions live in settings/env directives.
- P-002: In `docs/sota-feature-activation.md:25 @ HEAD 8c07ca3f373b1fe7b119713c7bfe67285c0776da`, replace the stale `CLAUDE_AUTOCOMPACT_PCT_OVERRIDE=70` ACTIVE claim with the verified current state: settings does not define the override; `CLAUDE.local.md` only has the 70 line commented; launcher currently sets 85 until P-001 lands.
- P-003: In `.claude/hooks/scripts/userpromptsubmit_compact_threshold.py:6-8 @ HEAD 8c07ca3f373b1fe7b119713c7bfe67285c0776da`, update the docstring from `HIGH >=700k, CRIT >=780k` to `HIGH >=650k, CRIT >=700k`, matching code at `.claude/hooks/scripts/userpromptsubmit_compact_threshold.py:90-92 @ HEAD 8c07ca3f373b1fe7b119713c7bfe67285c0776da` and `.claude/settings.json:25-27 @ HEAD 8c07ca3f373b1fe7b119713c7bfe67285c0776da`.
- P-004: In `.claude/rules/auto-compact-discipline.md:28,63,132,139 @ HEAD 8c07ca3f373b1fe7b119713c7bfe67285c0776da` and any retained operator-local note in `CLAUDE.local.md:86-94`, replace unsupported "autocompact at ~80 default" wording with "local target/assumption"; cite `Z:/repos/deps/claude-code-best-practice-shan/best-practice/claude-settings.md:826 @ HEAD 48f2cebeb88b389b27231c418ceadb65baf813fd`, which says the documented default is roughly 95 unless overridden.
- P-005: Refresh stale inventory counts in `AGENTS.md` and/or `docs/sota-installed-manifest.md` for hooks, agents, commands, and skills: observed values in this audit are 36 top-level hook scripts, 58 wired hook handlers, 11 top-level agent files / 13 recursive agent markdown files, 4 command files, and 22 `SKILL.md` files.
- P-006: Add a compact-remind risk row to the relevant audit/discipline document covering `.claude/hooks/scripts/precompact_hint_emitter.py`, `.claude/hooks/scripts/sessionstart_compact_hint_reader.py`, and `.claude/hooks/scripts/posttooluse_context_monitor.js`: record byte caps, measured post-compact reinflation delta, disable criteria, and the fact that these hooks inject advisory context around compact boundaries.

Mode disclosure: BRIDGE-MODE-FULL. [VERIFIED] I could read local files, run local probes, inspect dependency anchors under `Z:/repos/deps`, obtain the repository HEAD, and write this artifact to the requested path.

Repository HEAD: `8c07ca3f373b1fe7b119713c7bfe67285c0776da` [VERIFIED].

## Executive Summary

- [VERIFIED] Agent A input `tmp/w192-A-14repo-2026-05-14.md` was absent at start and still absent after a brief recheck, so Axis-1 candidate verification is `HONEST-NON-FINDING`.
- [REFUTED] The requested current state "80% autocompact" is not the active launcher state: `tools/eee.ps1` sets `CLAUDE_AUTOCOMPACT_PCT_OVERRIDE='85'`.
- [VERIFIED] Runtime warning bands are present in `.claude/settings.json` as 600k/650k/700k, but one hook docstring still says 600k/700k/780k.
- [VERIFIED] Hook inventory does not match the request baseline: 36 top-level files were observed under `.claude/hooks/scripts/` versus the requested expectation of 37.
- [VERIFIED] Settings wire 58 hook handlers across lifecycle events, including compact-related context injection and a Stop-time CWC commit delegate.
- [INFERRED] The compact-remind stack is the highest-risk content pattern because it can add context near compact boundaries and after compact rehydration, even though individual hooks are advisory/capped.
- [VERIFIED] External dependency anchors support lower/proactive compacting in general, but no checked external source establishes exact 80% autocompact or 600k/650k/700k thresholds as SOTA.
- [INFERRED] The 600k/650k/700k bands are acceptable as a local NOVEL-DOCUMENTED-EXCEPTION target, but documentation consistency must be fixed before approval.
- [VERIFIED] Manifest CR-8 tagging is partial: 72 status-tagged rows were observed in the Section 0-17 block against 248 heuristic table rows.
- [INFERRED] Overall verdict is NEEDS-REVISION because missing Axis-1 input, contradictory autocompact state, stale docs, and compact-context risk prevent an evidence-bound approval.

## Axis-1 Findings

Input expected: `Z:/claude-sota-installed/tmp/w192-A-14repo-2026-05-14.md`.

Classification: `HONEST-NON-FINDING`.

[VERIFIED] The Agent A artifact was missing on initial `Test-Path` and missing again after a 12-second recheck. Because the upstream artifact was absent, I did not infer any Probe DAG result, Top-3 candidate, or 15-repo verdict from memory.

Agent A dependent checks:

| Check | Status | Finding |
|---|---:|---|
| Read Agent A artifact | HNF | Artifact absent. |
| OVER / UNDER classifications against Agent A claims | HNF | No Agent A claims available to classify. |
| Top-3 ADOPT-NOW candidate gate: Axis-1 has >=3 distinct organizations | HNF | No candidates available. |
| Top-3 ADOPT-NOW candidate gate: Axis-2 named T2 dated artifact | HNF | No candidates available. |
| Top-3 ADOPT-NOW candidate gate: Axis-3 stability cpd-band | HNF | No candidates available. |
| Top-3 ADOPT-NOW candidate gate: Probe DAG D4-D8 file:line@HEAD SHA cites | HNF | No candidates available. |

No OVER/UNDER finding is issued for Axis-1 because `synthesis-layer-verify.md` requires reporting a missing assumed target as HNF rather than inventing a verification result. [VERIFIED: `.claude/rules/synthesis-layer-verify.md` read locally at HEAD.]

## Axis-2 Architecture %-Audited

Audit formula:

- Observed-count percent = `audited observed items / observed items`.
- Baseline percent = `audited observed items / expected baseline`, only where the request or local docs specified an expected baseline.
- CR-8 distribution is evidence-classified from local manifest rows and file content patterns; where a dimension lacks per-file CR-8 rows, the distribution is marked `[INFERRED]`.

| Dimension | Expected | Observed | Audited | Percent Audited | CR-8 Distribution | Notes |
|---|---:|---:|---:|---:|---|---|
| rules | ~36 | 64 top-level files | 64 | 100.0% observed; 177.8% of requested baseline | [INFERRED] mostly ADAPTED-FROM-SOTA / cite-import AMBER, with local NOVEL exceptions present | Request baseline is stale or lower than current tree. CR-8 policy is defined in `CLAUDE.md:70-74 @ HEAD 8c07ca3f373b1fe7b119713c7bfe67285c0776da`. |
| agents | 8 in stale primitive summary | 11 top-level files; 13 recursive markdown files | 13 | 100.0% observed; 162.5% of stale baseline if recursive | [INFERRED] ADAPTED-FROM-SOTA where plugin/upstream-backed; PENDING-AUDIT where no cite trail was visible in this pass | Stale count should be refreshed. |
| hooks | 37 requested | 36 top-level script files; 58 wired handlers in settings | 36 top-level files plus settings wiring | 100.0% observed; 97.3% of requested baseline | [INFERRED] ADAPTED-FROM-SOTA for GSD/CWC-derived hooks; NOVEL-DOCUMENTED-EXCEPTION for local lifecycle gates; PENDING-AUDIT for untracked/unwired guards | Highest-risk dimension. Settings uses `defaultMode=bypassPermissions` at `.claude/settings.json:69 @ HEAD 8c07ca3f373b1fe7b119713c7bfe67285c0776da` and relies on hooks for guardrails. |
| commands | not specified | 4 command files | 4 | 100.0% observed | [INFERRED] ADAPTED-FROM-SOTA / installed runtime commands | Observed `harvest`, `mistake-add`, `mistake-search`, `recall`. |
| skills | not specified | 22 recursive `SKILL.md` files | 22 | 100.0% observed | [INFERRED] mostly ADAPTED-FROM-SOTA; local GitNexus skills likely installed/adapted | External skill patterns checked against Karpathy and Matt Pocock anchors. |
| manifest sections/rows | sections 0-17 requested | 32 section/subsection headings in the 0-17 block; 248 heuristic table rows; 72 CR-8 status-tagged rows | 32 headings and 72 tagged rows | 100.0% headings; 29.0% tagged-row lower bound (`72/248`) | [MEASURED] 64 ADAPTED-FROM-SOTA, 5 NOVEL-DOCUMENTED-EXCEPTION, 3 PENDING-AUDIT | Manifest Section 0 defines status meaning at `docs/sota-installed-manifest.md:64-79 @ HEAD 8c07ca3f373b1fe7b119713c7bfe67285c0776da`. |

Key local rule surface:

- [VERIFIED] `CLAUDE.md:10-13 @ HEAD 8c07ca3f373b1fe7b119713c7bfe67285c0776da` makes SOTA primary-source citation mandatory for architectural edits.
- [VERIFIED] `CLAUDE.md:64-68 @ HEAD 8c07ca3f373b1fe7b119713c7bfe67285c0776da` documents the current graduated permission posture and says the active runtime state is `bypassPermissions`.
- [VERIFIED] `CLAUDE.md:70-74 @ HEAD 8c07ca3f373b1fe7b119713c7bfe67285c0776da` defines CR-8 status buckets: `ADAPTED-FROM-SOTA`, `NOVEL-DOCUMENTED-EXCEPTION`, or `PENDING-AUDIT`.
- [VERIFIED] `AGENTS.md:14-18 @ HEAD 8c07ca3f373b1fe7b119713c7bfe67285c0776da` says bootstrap-only files are hand-coded and other primitives must come from upstream SOTA installs.
- [VERIFIED] `AGENTS.md:80-83 @ HEAD 8c07ca3f373b1fe7b119713c7bfe67285c0776da` requires cite anchors and evidence markers.

Dependency anchors checked:

- [VERIFIED] `Z:/repos/deps/get-shit-done/hooks/gsd-context-monitor.js:3-19 @ HEAD 3aaed8f5d7c3492678b867e6687d42c88fe227e5` provides the upstream context-monitor pattern: statusline metrics, remaining-context thresholds, debounce, and advisory `additionalContext`.
- [VERIFIED] `Z:/repos/deps/get-shit-done/hooks/gsd-context-monitor.js:132-187 @ HEAD 3aaed8f5d7c3492678b867e6687d42c88fe227e5` also auto-records a breadcrumb on critical state before injecting advice, so mutation-adjacent behavior exists in the upstream pattern.
- [VERIFIED] `Z:/repos/deps/andrej-karpathy-skills/skills/karpathy-guidelines/SKILL.md:23-49 @ HEAD 2c606141936f1eeef17fa3043a72095b4765b9c2` supports simple, surgical, non-speculative changes.
- [VERIFIED] `Z:/repos/deps/mattpocock-skills/skills/engineering/diagnose/SKILL.md:12-31 @ HEAD 733d312884b3878a9a9cff693c5886943753a741` supports tight feedback loops before fixing.
- [VERIFIED] `Z:/repos/deps/mattpocock-skills/skills/productivity/write-a-skill/SKILL.md:16-19 @ HEAD 733d312884b3878a9a9cff693c5886943753a741` supports the `SKILL.md` plus references/scripts/assets structure.

## Axis-2 Content-Pattern Risks

1. Compact-remind / compact rehydration stack: NEEDS-REVISION.

   [VERIFIED] `.claude/settings.json:446-461 @ HEAD 8c07ca3f373b1fe7b119713c7bfe67285c0776da` wires a `UserPromptSubmit` compact-threshold hook. `.claude/settings.json:465-504 @ HEAD 8c07ca3f373b1fe7b119713c7bfe67285c0776da` wires `SessionStart` compact hint reading. `.claude/settings.json:518-530 @ HEAD 8c07ca3f373b1fe7b119713c7bfe67285c0776da` wires `PreCompact` priority and hint emitters.

   [VERIFIED] `.claude/hooks/scripts/precompact_hint_emitter.py:4-20 @ HEAD 8c07ca3f373b1fe7b119713c7bfe67285c0776da` says PreCompact stdout is not directly model-visible and uses a SessionStart compact matcher as the primary rehydrate path; it caps output around 10K. `.claude/hooks/scripts/sessionstart_compact_hint_reader.py:4-18 @ HEAD 8c07ca3f373b1fe7b119713c7bfe67285c0776da` says it emits additional context after compact and caps at 9500 chars. `.claude/hooks/scripts/sessionstart_compact_hint_reader.py:179-203 @ HEAD 8c07ca3f373b1fe7b119713c7bfe67285c0776da` constructs and emits that body.

   [INFERRED] The user flag "compact-remind damaging" is plausible: even capped advisory context can re-inflate a compacted session with stale or irrelevant reminders. This is not a REJECT finding because the hooks are capped and mostly advisory, but it needs measured reinflation and disable criteria.

2. PostToolUse context monitor: PASS with risk notes.

   [VERIFIED] `.claude/hooks/scripts/posttooluse_context_monitor.js:4-18 @ HEAD 8c07ca3f373b1fe7b119713c7bfe67285c0776da` declares adaptation from GSD and cites the upstream context monitor. `.claude/hooks/scripts/posttooluse_context_monitor.js:150-169 @ HEAD 8c07ca3f373b1fe7b119713c7bfe67285c0776da` writes advisory `additionalContext`; `.claude/hooks/scripts/posttooluse_context_monitor.js:170-172 @ HEAD 8c07ca3f373b1fe7b119713c7bfe67285c0776da` silently fails open.

   [INFERRED] Advisory context injection is SOTA-backed by GSD, but local threshold choices and message size remain local policy.

3. Stop-time mutation risk: NEEDS-REVISION documentation.

   [VERIFIED] `.claude/settings.json:386-411 @ HEAD 8c07ca3f373b1fe7b119713c7bfe67285c0776da` wires Stop hooks, including `auto_proceed_gate.py`, a CWC commit-on-stop wrapper, and codex lifecycle gates. [VERIFIED] `.claude/hooks/scripts/cwc/commit-on-stop-throttled.sh:1-6 @ HEAD 8c07ca3f373b1fe7b119713c7bfe67285c0776da` describes itself as a wrapper for upstream CWC commit-on-stop. `.claude/hooks/scripts/cwc/commit-on-stop-throttled.sh:27-65 @ HEAD 8c07ca3f373b1fe7b119713c7bfe67285c0776da` checks dirtiness/throttle thresholds and then delegates to the upstream commit script if present.

   [INFERRED] This is intentional automation, not hidden prompt rewriting, but it is a mutation-capable Stop hook and should be documented in the high-risk hook inventory.

4. Permission posture depends on hooks: PASS with monitoring.

   [VERIFIED] `.claude/settings.json:69 @ HEAD 8c07ca3f373b1fe7b119713c7bfe67285c0776da` sets `defaultMode` to `bypassPermissions`. [VERIFIED] `.claude/settings.json:73-240 @ HEAD 8c07ca3f373b1fe7b119713c7bfe67285c0776da` wires PreToolUse gates including codex lifecycle, agent spawn guard, safety, gitleaks, codex T2, and RTK.

   [INFERRED] Bypass mode is not itself a fail because the local cardinal rules document it, but hook drift now has a high blast radius.

5. Hook count and untracked drift: NEEDS-REVISION.

   [MEASURED] Top-level `.claude/hooks/scripts/` has 36 files, not the requested baseline of 37. [MEASURED] `git ls-files -- .claude/hooks/scripts/*` shows tracked/untracked divergence including untracked `context_window_statusline.sh` and `precompact_guard.py` in the top-level script directory.

   [VERIFIED] `.claude/hooks/scripts/precompact_guard.py:20-23 @ HEAD 8c07ca3f373b1fe7b119713c7bfe67285c0776da` defines an 80 percent hard-limit policy, but [VERIFIED] `.claude/settings.json:518-530 @ HEAD 8c07ca3f373b1fe7b119713c7bfe67285c0776da` does not wire this guard in PreCompact. That makes it insufficient evidence for active 80% enforcement.

## Axis-3 Auto-Compact Target Recalibration

Current local state:

| Surface | Verified State | Verdict |
|---|---|---|
| `.claude/settings.json` | [VERIFIED] `CONTEXT_WINDOW_COMPACT_WARN_TOKENS=600000`, `HIGH=650000`, `CRIT=700000` at `.claude/settings.json:25-27 @ HEAD 8c07ca3f373b1fe7b119713c7bfe67285c0776da`; no `CLAUDE_AUTOCOMPACT_PCT_OVERRIDE` in settings. | Bands present; override absent. |
| `tools/eee.ps1` | [VERIFIED] sets `CLAUDE_AUTOCOMPACT_PCT_OVERRIDE='85'` at `tools/eee.ps1:83-85 @ HEAD 8c07ca3f373b1fe7b119713c7bfe67285c0776da`. | Refutes active 80% claim. |
| `tools/eee-backup.ps1` | [VERIFIED] sets `CLAUDE_AUTOCOMPACT_PCT_OVERRIDE='85'` at `tools/eee-backup.ps1:76 @ HEAD 8c07ca3f373b1fe7b119713c7bfe67285c0776da`. | Same drift. |
| `CLAUDE.local.md` | [VERIFIED] documents W183 F1 revert/default and leaves a 70 override commented at `CLAUDE.local.md:86-94`; defines 600k/650k/700k at `CLAUDE.local.md:159-161`. | Operator-local and not authoritative; also conflicts with active launcher 85. |
| `userpromptsubmit_compact_threshold.py` | [VERIFIED] code defaults are 600k/650k/700k at `.claude/hooks/scripts/userpromptsubmit_compact_threshold.py:90-92`, but docstring still says 600k/700k/780k at lines 6-8. | Needs doc fix. |
| `posttooluse_context_monitor.js` | [VERIFIED] uses WARN/CRIT defaults 600k/700k at `.claude/hooks/scripts/posttooluse_context_monitor.js:45-49,65-68`. | No HIGH band there; acceptable if documented as two-tier advisory monitor. |
| `docs/sota-feature-activation.md` | [REFUTED] claims `CLAUDE_AUTOCOMPACT_PCT_OVERRIDE=70` ACTIVE from `.claude/settings.json` at `docs/sota-feature-activation.md:25`. | Stale and false against settings/launcher. |

External SOTA basis:

- [VERIFIED] `Z:/repos/deps/claude-code-best-practice-shan/best-practice/claude-settings.md:826 @ HEAD 48f2cebeb88b389b27231c418ceadb65baf813fd` documents `CLAUDE_AUTOCOMPACT_PCT_OVERRIDE`, says the default is roughly 95, and says lower values such as 50 compact earlier.
- [VERIFIED] `Z:/repos/deps/claude-code-best-practice-shan/best-practice/claude-settings.md:967 @ HEAD 48f2cebeb88b389b27231c418ceadb65baf813fd` documents context capacity and override as a percentage of the window.
- [VERIFIED] `Z:/repos/deps/claude-code-best-practice-shan/tips/claude-thariq-tips-16-apr-26.md:28 @ HEAD 48f2cebeb88b389b27231c418ceadb65baf813fd` says context rot is task-dependent and can appear around 300k-400k for the 1M model.
- [VERIFIED] `Z:/repos/deps/claude-code-best-practice-shan/tips/claude-thariq-tips-16-apr-26.md:101-125 @ HEAD 48f2cebeb88b389b27231c418ceadb65baf813fd` supports steering or proactively compacting because compact summaries can be lossy.

W187 local T1 basis:

- [VERIFIED] `.claude/state/codex_consult_w187_hooks_OUT.txt:2170-2172 @ HEAD 8c07ca3f373b1fe7b119713c7bfe67285c0776da` reports codex T1 concern that a 780k critical threshold violates a >=100k buffer.
- [VERIFIED] `.claude/state/codex_consult_w187_hooks_OUT.txt:2185-2192 @ HEAD 8c07ca3f373b1fe7b119713c7bfe67285c0776da` prescribes WARN=600000, HIGH=650000, CRIT=700000 and settings mirroring.

Axis-3 decisions:

- `CLAUDE_AUTOCOMPACT_PCT_OVERRIDE=80`: NEEDS-REVISION. [REFUTED] It is not the active launcher value; [UNKNOWN] no checked external SOTA source establishes exact 80 as the correct target; [VERIFIED] the external CCBP anchor says default is roughly 95 unless overridden.
- 600k/650k/700k warning bands: APPROVE for runtime target, NEEDS-REVISION for documentation consistency. [VERIFIED] settings and current hook code match W187 T1 prescriptions; [VERIFIED] stale doc surfaces still cite 700k/780k or 70%.
- SOTA-cited target recommendation: no true external exact target exists. Treat any exact autocompact percentage and token bands as `NOVEL-DOCUMENTED-EXCEPTION` until graduated.

Minimum evidence required to graduate exact thresholds out of NOVEL-DOCUMENTED-EXCEPTION:

- An official or dependency-anchor citation establishing current default compact behavior for this model/runtime with file:line@HEAD SHA.
- Live telemetry over multiple sessions showing token count at warning, high, critical, manual compact, automatic compact, and post-compact reinflation.
- A named dated T2 artifact confirming the target and failure modes.
- At least three distinct organization anchors or an explicit local exception explaining why cross-org adoption is not applicable.
- A stability cpd-band showing the target did not churn across the audit window.

## Commands Run

- `git rev-parse HEAD`
- `Test-Path -LiteralPath 'Z:\claude-sota-installed\tmp\w192-A-14repo-2026-05-14.md'`
- `Start-Sleep -Seconds 12; Test-Path -LiteralPath 'Z:\claude-sota-installed\tmp\w192-A-14repo-2026-05-14.md'`
- `Get-Content` on `.claude/rules/synthesis-layer-verify.md`, `.claude/rules/codex-t1-fix-forward-pattern.md`, `.claude/rules/mia-pre-apply.md`, `.claude/rules/evidence-policy.md`, `CLAUDE.md`, and `AGENTS.md`
- `Get-ChildItem` inventory probes for `.claude/hooks/scripts`, `.claude/rules`, `.claude/agents`, `.claude/commands`, and `.claude/skills`
- `rg` probes for compact thresholds, autocompact override, CR-8 status tags, manifest headings, and hook mutation/injection terms
- PowerShell JSON parsing of `.claude/settings.json` to count wired hook handlers by event
- `git status --short`
- `git ls-files -- '.claude/hooks/scripts/*'`
- `git -C Z:/repos/deps/get-shit-done rev-parse HEAD`
- `git -C Z:/repos/deps/andrej-karpathy-skills rev-parse HEAD`
- `git -C Z:/repos/deps/mattpocock-skills rev-parse HEAD`
- `git -C Z:/repos/deps/claude-code-best-practice-shan rev-parse HEAD`
- Line-numbered reads of dependency-anchor files cited above
- Broad `rg` under `Z:/repos/deps` for compact-related terms; noisy/broken-path hits were not used as proof
- `Test-Path` for this output artifact before writing

## Residual Risks and HNF Items

- Axis-1 remains HNF until `tmp/w192-A-14repo-2026-05-14.md` exists.
- Candidate-by-candidate Top-3 verification remains HNF because no Agent A candidate list was available.
- Hook CR-8 distribution is partly inferred from manifest/status patterns rather than a complete per-hook provenance column.
- Manifest row denominator is heuristic because the 0-17 block contains active, historical, expansion, and deprecated rows.
- `CLAUDE.local.md` is operator-local/untracked; it is still relevant to runtime claims but not a canonical committed source.
- Some exact line numbers in untracked files are cited as observed local evidence at current HEAD, but they are not immutable committed evidence until tracked or otherwise preserved.
- External SOTA evidence supports proactive compact discipline in general, not exact local threshold values.

VERDICT: NEEDS-REVISION conf=0.88
