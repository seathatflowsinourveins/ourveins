# ADVERSARIAL REVIEW W337 SOTA-UNLEASHED

Date: 2026-05-20  
Reviewer: GPT-5.5

## Overall Verdict: BLOCK

The synthesis has multiple material factual errors in P0 actions: it treats already-enabled `wshobson/agents` components as absent, recommends a likely duplicate install, points Langfuse recovery at a missing compose file, and proposes deleting gitnexus skills that are present under the parent directory.

## Executive Summary

The W337 synthesis is directionally useful, but it is not safe to execute as written. The most serious issue is the P0 `wshobson/agents` decision: local config shows `claude-code-workflows` is sourced from `wshobson/agents`, and `plugin-eval`, `agent-teams`, and `conductor` are already installed and enabled, contradicting Stream D and the synthesis. The PluginEval migration claim is also overconfident: Wilson intervals, bootstrap intervals, Clopper-Pearson intervals, and Elo rankings are statistical machinery, not proof of domain fit for this runtime's SOTA-install decisions. The six challenged Anthropic hook events are verified in the live Claude Code hooks reference, but the Stream C file at the requested W337-FULL path is missing, and the synthesis should cite the live hook reference rather than only inherited Stream C claims. Langfuse is not healthy: the requested compose file is absent and the health endpoint fails to connect. `/insights` is real in the live command reference and the installed CLI is 2.1.145, but the exact requested `claude /insights --help` probe only returned generic CLI help, and `claude /insights` timed out with an overloaded API error. The marketplace counts need canonical definitions: 15 cache dirs, 22 known marketplace keys, 23 marketplace directories, 64 installed plugin keys, and 68 settings entries with 59 enabled and 9 disabled. This synthesis should be revised before any P0 install, delete, or CLAUDE.md update is performed.

## Finding 1: wshobson/agents Install Decision Is Factually Wrong

Verdict: BLOCK

Evidence:
- `STREAM-D-AGENT-SKILL-REPOS.md:7-15` claims `wshobson/agents` has 185 agents, 153 skills, PluginEval, and `agent-teams`.
- `STREAM-D-AGENT-SKILL-REPOS.md:19-21` claims runtime state is not installed as a marketplace and recommends `/plugin marketplace add wshobson/agents` plus selective install.
- `SYNTHESIS-SKELETON.md:80` and `SYNTHESIS-SKELETON.md:122` repeat the P0 install recommendation.
- Live probe `claude plugin list` returned `plugin-eval@claude-code-workflows`, `agent-teams@claude-code-workflows`, and `conductor@claude-code-workflows` all `Status: enabled`.
- Live probe `known_marketplaces.json` returned `claude-code-workflows => repo=wshobson/agents`.
- `CLAUDE.md:1-3` establishes the pointer-only root-memory invariant, and `CLAUDE.md:11` already names `wshobson/agents` in the target behavioral discipline set.

Analysis:
The synthesis confuses marketplace aliasing with absence. `claude-code-workflows` is the installed marketplace name, but the known marketplace source is `wshobson/agents`. The recommended P0 action would likely duplicate or re-add an already-present marketplace rather than close a missing-install gap. The context-bloat risk is real if the runtime imports all 185 agents, 153 skills, and 80 plugins wholesale, especially against the pointer-only discipline in `CLAUDE.md:1-3`; however, the local runtime has already taken the narrower path by enabling selected `claude-code-workflows` plugins.

Recommendation:
Delete the P0 bulk install action. Replace it with a reconciliation action: verify whether any desired `wshobson/agents` components are absent from the current `claude-code-workflows` cache, and install only missing named plugins after measuring added command, skill, agent, and hook surfaces.

## Finding 2: PluginEval Adoption Is Overclaimed

Verdict: WARN

Evidence:
- `STREAM-D-AGENT-SKILL-REPOS.md:13` describes PluginEval's 10 dimensions, anti-patterns, Wilson CI, bootstrap CI, Clopper-Pearson CI, and Elo ranking.
- `STREAM-D-AGENT-SKILL-REPOS.md:21` says PluginEval replaces hand-rolled `sca-v7..v12`.
- `STREAM-F-RESEARCH-ARCH.md:38-43` ranks `wshobson PluginEval` above `sca-v12` because of Wilson, bootstrap, Clopper-Pearson, and Elo.
- `STREAM-F-RESEARCH-ARCH.md:131` says PluginEval is peer-reviewed and less churn-prone.
- Live probe `claude plugin list` shows `plugin-eval@claude-code-workflows` is already enabled.

Analysis:
The synthesis treats statistical formalism as sufficient validation. Wilson intervals and Clopper-Pearson intervals can improve uncertainty accounting for binomial proportions; bootstrap confidence intervals and Elo can support comparative ranking. None of that proves that PluginEval's dimensions match this runtime's decision domain: install-vs-pattern selection, Windows/Z:-portable constraints, trust-tuple requirements, and context-budget risk. The current hand-rolled `sca-vN` churn is a legitimate smell, but replacing it with PluginEval without a calibration set risks a statistical veneer over a different ad-hoc rubric.

Recommendation:
Adopt PluginEval only after a calibration bakeoff against prior wave decisions. Keep runtime-specific gates for trust, portability, context bloat, and install blast radius. Do not delete `tools/sca-*` until PluginEval reproduces or improves known W330-W337 outcomes with documented disagreements.

## Finding 3: Six Anthropic Hook Events Are Real, But Stability Should Be Cited Live

Verdict: OK

Evidence:
- Requested file missing probe: `MISSING Z:/claude-sota-installed/docs/architecture/W337-FULL-SOTA-UNLEASHED/STREAM-C-ANTHROPIC-CCBP-ECC-COOKBOOK.md`.
- Alternate Stream C file says the six hook gaps are `TaskCreated`, `CwdChanged`, `FileChanged`, `PostCompact`, `ConfigChange`, and `TeammateIdle` at `../W337-SOTA-UNLEASHED/STREAM-C-ANTHROPIC-CCBP-ECC-COOKBOOK.md:25-34`.
- `SYNTHESIS-SKELETON.md:70`, `SYNTHESIS-SKELETON.md:111`, and `SYNTHESIS-SKELETON.md:127` repeat the six-hook gap.
- WebFetch `https://code.claude.com/docs/en/hooks` lists `TaskCreated` at lines 203-204, `TeammateIdle` at line 207, `ConfigChange` at line 209, `CwdChanged` at line 210, `FileChanged` at line 211, and `PostCompact` at lines 214-215.
- WebFetch event sections show `TeammateIdle` behavior at lines 1746-1748, `FileChanged` input/output at lines 1879-1902, and `PostCompact` behavior at lines 2004-2025.
- WebFetch search for `beta` on the hooks page returned no matching text.

Analysis:
The six names are verified in the live Claude Code hook reference and are not merely fabricated Stream C names. The docs page does not label them experimental in the fetched content. That said, the requested Stream C path is absent from the W337-FULL directory, so the synthesis provenance is messy and should be fixed before shipping the architecture packet.

Recommendation:
Keep the hook-event gap as a valid P1, but revise citations to the live hooks reference and the correct local Stream C path. Wire each hook only with an explicit use case and post-hook overhead budget; do not add empty hooks just to improve checklist coverage.

## Finding 4: Langfuse Recovery Path Is Not Ground Truth

Verdict: BLOCK

Evidence:
- `CLAUDE.md:36` claims `T5 langfuse` is live and references W333 recovery.
- Alternate Stream B says Langfuse is dead with `:3000 ECONNREFUSED` at `../W337-DEEP-AUDIT-FULL-SOTA/STREAM-B-NATIVE-CC-FEATURES.md:25-41` and repeats the compose recovery at lines 130-147.
- `SYNTHESIS-SKELETON.md:29`, `SYNTHESIS-SKELETON.md:55`, `SYNTHESIS-SKELETON.md:61`, `SYNTHESIS-SKELETON.md:107`, and `SYNTHESIS-SKELETON.md:123` identify Langfuse as dead and recommend `docker compose -f Z:\claude-hub\observability\docker-compose.yaml up -d --recreate`.
- Required probe `docker compose -f Z:/claude-hub/observability/docker-compose.yaml ps 2>&1` returned: `open Z:\claude-hub\observability\docker-compose.yaml: The system cannot find the file specified.`
- Required probe `curl -s http://127.0.0.1:3000/api/public/health 2>&1` exited 1 with no output; follow-up `curl http://127.0.0.1:3000/api/public/health 2>&1` returned `curl: (7) Failed to connect to 127.0.0.1 port 3000 after 2039 ms: Could not connect to server`.
- `CLAUDE.local.md:50-52` configures Langfuse host/base URL as `http://127.0.0.1:3000`.

Analysis:
Ground truth is not "recreate the stack at `Z:/claude-hub/observability/docker-compose.yaml`"; that compose file is missing. Ground truth is: local config points to port 3000, port 3000 is not accepting connections, and the documented recovery path is invalid in this filesystem. The synthesis should not instruct an operator to run a missing compose file.

Recommendation:
Block the Langfuse P0 until the actual compose location is found. Search known compose files, verify the intended stack name, then update `CLAUDE.md:36` only after `docker compose ps` and `/api/public/health` both pass.

## Finding 5: `/insights` Is Real, But The Probe Results Are Weaker Than The Claim

Verdict: WARN

Evidence:
- Alternate Stream B claims native `/insights` is available in CLI and missing from CLAUDE.md at `../W337-DEEP-AUDIT-FULL-SOTA/STREAM-B-NATIVE-CC-FEATURES.md:14-23`.
- `SYNTHESIS-SKELETON.md:60`, `SYNTHESIS-SKELETON.md:109`, `SYNTHESIS-SKELETON.md:124`, and `SYNTHESIS-SKELETON.md:150` recommend `/insights` now plus monthly cadence.
- Required probe `claude /insights --help 2>&1` returned generic Claude CLI help, not `/insights`-specific help.
- Follow-up probe `claude --version` returned `2.1.145 (Claude Code)`.
- Follow-up probe `claude /insights 2>&1` timed out after 61 seconds with `API Error: Overloaded`.
- WebFetch `https://code.claude.com/docs/en/commands` lists `/insights` at line 110: it generates a report analyzing Claude Code sessions, project areas, interaction patterns, and friction points.

Analysis:
The command is real in current official docs, so Stream B did not hallucinate it. But the exact runtime probe did not demonstrate a successful report generation. The help command's generic output is not evidence of `/insights` behavior, and the direct run failed due to API overload. The monthly cadence is plausible, but the synthesis should mark the runtime execution as unverified.

Recommendation:
Keep `/insights` as a candidate cadence, but revise the evidence: official docs verify command existence; local runtime execution remains blocked by API overload. Add cadence only after one successful run produces the expected report artifact.

## Finding 6: `.claude/state/sota-decisions.jsonl` Risks Double-Bookkeeping

Verdict: WARN

Evidence:
- `STREAM-F-RESEARCH-ARCH.md:16` identifies missing machine-readable decision log as a weakness.
- `STREAM-F-RESEARCH-ARCH.md:83-103` proposes `.claude/state/sota-decisions.jsonl` and a schema.
- `STREAM-F-RESEARCH-ARCH.md:126`, `STREAM-F-RESEARCH-ARCH.md:160`, and `STREAM-F-RESEARCH-ARCH.md:171` make it a carry-forward action.
- `SYNTHESIS-SKELETON.md:96`, `SYNTHESIS-SKELETON.md:115`, and `SYNTHESIS-SKELETON.md:128` repeat the decision-log action.
- `CLAUDE.md:47` already defines per-wave `docs/architecture/W<N>-*/VERDICT-LEDGER.md` rows plus T6 basic-memory as the cumulative verdict ledger.

Analysis:
The JSONL proposal has value if it becomes the canonical machine-readable index. As written, it is additive to the existing per-wave verdict ledger and basic-memory ledger, which creates reconciliation burden. The synthesis does not specify which source wins when JSONL and `VERDICT-LEDGER.md` disagree, nor how backfill, schema migration, and wave closure hooks work.

Recommendation:
Do not add a second ledger casually. Either generate JSONL from existing verdict ledgers, or define JSONL as the canonical source and render markdown ledgers from it. Add a `decision_id`, `supersedes`, and `source_wave` field if adopted.

## Finding 7: gitnexus Orphan Drop Is Based On A Shallow Filesystem Read

Verdict: BLOCK

Evidence:
- `STREAM-E-PLANNING-GITNEXUS-ALIREZAREZVANI.md:39-41` claims only one parent index exists and seven child skills do not exist on disk.
- `STREAM-E-PLANNING-GITNEXUS-ALIREZAREZVANI.md:56-62` recommends repair-or-drop, with drop as the recommended path.
- `SYNTHESIS-SKELETON.md:88`, `SYNTHESIS-SKELETON.md:112`, and `SYNTHESIS-SKELETON.md:126` repeat the orphan-drop action.
- Required probe equivalent `ls Z:/claude-sota-installed/.claude/skills/gitnexus*` returned one parent directory: `gitnexus`.
- Deeper probe of `Z:/claude-sota-installed/.claude/skills/gitnexus` returned seven child directories plus parent `SKILL.md`: `gitnexus-cli`, `gitnexus-debugging`, `gitnexus-exploring`, `gitnexus-guide`, `gitnexus-impact-analysis`, `gitnexus-pr-review`, `gitnexus-refactoring`, and `SKILL.md`.
- `CLAUDE.md:52` incorrectly describes paths as `.claude/skills/gitnexus-{guide,...}/`, but the actual child paths are nested under `.claude/skills/gitnexus/`.

Analysis:
Stream E's "children dangling" conclusion is wrong. The shallow glob only matched the parent directory; it did not inspect children under that directory. The correct issue is path documentation drift, not absent child skills. Deleting the parent skill would delete the seven child skills that actually exist.

Recommendation:
Do not drop gitnexus. Update `CLAUDE.md:52` and W337 synthesis language to say the child skills are nested under `.claude/skills/gitnexus/<child>/`. If gitnexus remains retired, disable auto-fire by metadata or archival move after a separate impact review, not because the children are missing.

## Finding 8: mattpocock Refresh Is Low Urgency

Verdict: WARN

Evidence:
- `STREAM-D-AGENT-SKILL-REPOS.md:33-35` reports the runtime fork is five commits behind.
- `STREAM-D-AGENT-SKILL-REPOS.md:52` includes one rebuild commit.
- `STREAM-D-AGENT-SKILL-REPOS.md:62-65` frames the value as `/handoff`, progressive disclosure, and related patterns.
- `STREAM-D-AGENT-SKILL-REPOS.md:71` recommends a P1 refresh.
- `SYNTHESIS-SKELETON.md:81`, `SYNTHESIS-SKELETON.md:129`, and `SYNTHESIS-SKELETON.md:155` repeat the refresh action.

Analysis:
The refresh appears useful but not urgent. The cited deltas are mostly discipline, glossary, redaction, ICA, and generated bundle rebuilds. There is no evidence of a security fix, runtime breakage, or major release. Given the synthesis has P0 factual errors, spending attention on a stylistic fork refresh before correcting the core action list is not justified.

Recommendation:
Hold until the next routine vendor-refresh batch unless a major release, security fix, or directly-needed `/handoff` behavior appears. Keep it P2/P3, not P1.

## Finding 9: Marketplace Count Drift Needs Canonical Terms

Verdict: BLOCK

Evidence:
- `SYNTHESIS-SKELETON.md:12-16` lists plugin cache dirs as 18 expected vs 15 actual, marketplaces defined as 22, marketplaces unused as 6/7, and enabledPlugins anomaly.
- `SYNTHESIS-SKELETON.md:63`, `SYNTHESIS-SKELETON.md:108`, and `SYNTHESIS-SKELETON.md:125` repeat plugin cache drift.
- `CLAUDE.md:35` claims 68 plugins declared, 64 installed, 47 enabled, 16 marketplaces, 22 defined, 6 unused, and cache dir count 18.
- Probe `.claude/plugins/cache` returned 15 cache dirs.
- Probe `.claude/plugins/known_marketplaces.json` returned 22 keys.
- Probe `.claude/plugins/marketplaces` returned 23 directories.
- Probe `.claude/plugins/installed_plugins.json` returned `plugins` keys = 64.
- Probe `.claude/settings.json enabledPlugins` returned 68 keys, 59 true, 9 false.
- Probe `claude plugin list` showed `everything-claude-code@everything-claude-code` failed to load even though settings marks it enabled.

Analysis:
The numbers are not interchangeable. "15" is cache directories. "22" is known marketplace registry keys. "23" is marketplace directories on disk. "64" is installed plugin records. "68" is settings enablement entries. "59" is the current enabled-true count, but one enabled plugin fails to load, so "effective enabled" requires CLI status parsing. The synthesis should stop using "plugins", "marketplaces", "cache dirs", and "enabled" as loose synonyms.

Recommendation:
Create a canonical count table in the synthesis and update `CLAUDE.md:35` only after deciding which count is meant. Include a separate "load failures" row, currently including `everything-claude-code@everything-claude-code`.

## Finding 10: alirezarezvani Re-litigation Cadence Is Too Slow For Active Upstream

Verdict: WARN

Evidence:
- `STREAM-E-PLANNING-GITNEXUS-ALIREZAREZVANI.md:68` reports upstream activity on 2026-05-19.
- `STREAM-E-PLANNING-GITNEXUS-ALIREZAREZVANI.md:77-86` restates the W330 retire verdict for the 313-skill bundle and recommends pattern-only adoption.
- `STREAM-E-PLANNING-GITNEXUS-ALIREZAREZVANI.md:86` sets re-verification at W345, every eight waves.
- `SYNTHESIS-SKELETON.md:90` says W334-P1 retire stands and re-litigate W345.
- `CLAUDE.md:21` encodes the trigger-overlap standard used to retire the bundle: description trigger cardinality <=8 and no sibling overlap >50%.

Analysis:
The retire rationale still looks sound for wholesale install: 313 skills creates trigger overlap and context-discovery risk. But an eight-wave delay is too blunt when upstream is active as of 2026-05-19 and the synthesis itself recommends cherry-picking 5-10 skills if a use-case gap appears. This is not a case for bulk enablement; it is a case for narrower, event-driven re-litigation.

Recommendation:
Keep W334-P1 retire for wholesale install. Replace W345-only re-litigation with a two-trigger policy: re-check on major upstream packaging changes, or when an operator identifies a concrete gap in `engineering/`, `orchestration/`, or `research/`. Use W345 as the backstop, not the earliest reconsideration point.

## Final Disposition Table

| finding | verdict | action-required | owner |
|---|---|---|---|
| 1. wshobson install decision | BLOCK | Remove duplicate P0 install; reconcile existing `claude-code-workflows` source and enabled components | W337 synthesis owner |
| 2. PluginEval adoption | WARN | Calibrate PluginEval against prior wave decisions before retiring `sca-vN` | SOTA evaluation owner |
| 3. six hook events | OK | Fix missing Stream C path/citations; wire only use-case-backed hooks | Hook owner |
| 4. Langfuse recovery | BLOCK | Find real compose path; verify `docker compose ps` and health endpoint before claiming live | Observability owner |
| 5. `/insights` cadence | WARN | Mark command existence verified, runtime execution unverified due API overload | Runtime workflow owner |
| 6. decision JSONL | WARN | Define ledger precedence or generate JSONL from existing verdict ledgers | Documentation owner |
| 7. gitnexus orphan drop | BLOCK | Do not delete; correct path documentation for nested child skills | GitNexus/runtime owner |
| 8. mattpocock refresh | WARN | Demote unless a security/major-release reason appears | Vendor-refresh owner |
| 9. marketplace counts | BLOCK | Canonicalize count terminology and include load failures | Plugin inventory owner |
| 10. alirezarezvani cadence | WARN | Keep wholesale retire; make re-check event-driven with W345 as backstop | Skill inventory owner |

Sign-off: GPT-5.5 adversarial review complete. Verdict BLOCK until factual corrections land and P0 actions are rewritten.
