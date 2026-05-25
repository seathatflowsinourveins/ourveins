# W187 Agent B BRIDGE-MODE Hooks Audit — 2026-05-13

## Executive Verdict

**VERDICT: NEEDS-REVISION conf=0.91**

Reason: the core Codex/security hook stack is mostly SOTA-cited or documented as a local exception, but the compact-threshold family is stale for the current 1M Opus 4.7 operating target and has prior remove-candidate evidence. The requested inventory total is **36**, but the live non-recursive glob `Z:/claude-sota-installed/.claude/hooks/scripts/*.py` returns **34** Python files. I preserve the requested denominator for audit percentage and mark the two absent inventory slots as `PENDING-AUDIT / INVENTORY-GAP`.

**COMPACT-FIX recommendation:** update `userpromptsubmit_compact_threshold.py` defaults to the current 1M policy target `WARN=600000`, `HIGH=700000`, `CRIT=780000`; change CRIT behavior below 80% utilization from `decision:block` to visible WARN/HIGH advisory. If the hook remains unwired, either remove it with the other compact-context scripts or explicitly mark it `DORMANT-NOT-WIRED`.

## Counts

- Total hooks audited: **36 requested / 34 live `*.py` found**
- `SOTA-CITED`: **16 / 36 = 44.4%**
- `NOVEL-DOCUMENTED-EXCEPTION`: **12 / 36 = 33.3%**
- `PENDING-AUDIT`: **3 / 36 = 8.3%** including 2 inventory gaps
- `REMOVE-CANDIDATE`: **5 / 36 = 13.9%**

## Compact Threshold Specific Verdict

`userpromptsubmit_compact_threshold.py` currently hardcodes 200k-era defaults:

- body defaults: `WARN=250000`, `HIGH=300000`, `CRIT=350000`
- live environment: `WARN=350000`, `HIGH=500000`, `CRIT=600000`
- `CLAUDE.local.md` ENV(j) target: `WARN=600000`, `HIGH=700000`, `CRIT=780000`
- autocompact target context in docs: around 80% for 1M, with ENV(j) keeping `CRIT=780000` below 800k.

Verdict: **update body defaults to ENV(j)** if the script is retained. Defaults should represent the current supported runtime, not the legacy 200k context assumption. The old defaults can still be preserved in comments as historical rationale.

Blocking verdict: **downgrade `CRIT decision:block` below 80% utilization to advisory WARN/HIGH**. A hard block at 600k or 780k on a 1M model can interrupt automated BRIDGE-MODE workflows before the actual hard ceiling. Below 80%, emit `additionalContext` + `systemMessage`; reserve `decision:block` for `>=800000` or a separate emergency ceiling such as `>=900000`, if a hard stop is still wanted.

Operational note: the script is not currently wired in `.claude/settings.json` `UserPromptSubmit`; the only active UserPromptSubmit Python hook found is `codex_stuck_detector.py`. So the threshold bug is a latent/dormant risk unless registered elsewhere.

## REMOVE-CANDIDATE List

1. `userpromptsubmit_compact_threshold.py`
2. `context_window_guard.py`
3. `precompact_guard.py`
4. `precompact_hint_emitter.py`
5. `sessionstart_compact_hint_reader.py`

## Top-5 REMOVE-CANDIDATE Recommendations

1. **Remove or quarantine `userpromptsubmit_compact_threshold.py`** unless updated to 1M defaults and advisory-only below 80%. It is stale by default and duplicates broader compact machinery.
2. **Remove `context_window_guard.py`** from active/dormant hook inventory unless there is a current wire plan. Prior W184 audit classified it with the compact-context remove cohort.
3. **Remove `precompact_guard.py`** as a hard-blocking compact intervention unless a verified PreCompact contract test proves it improves compact quality.
4. **Remove `precompact_hint_emitter.py`** unless the PreCompact stdout-to-summary behavior is reverified. Its own header admits docs ambiguity.
5. **Remove `sessionstart_compact_hint_reader.py`** unless a compact-only SessionStart registration is restored and measured useful. Otherwise it is unowned dormant complexity.

## Hook Inventory Table

| # | Hook | Class | Status | Audit note |
|---:|---|---|---|---|
| 1 | `_codex_plugin_root.py` | SOTA-CITED | library | Cites codex-plugin-cc root resolution and SemVer sorting; helper for Codex plugin discovery. |
| 2 | `_codex_preflight.py` | SOTA-CITED | library | Cites gstack Codex probe + codex-plugin-cc setup JSON; used by Codex review hooks. |
| 3 | `_guard_base.py` | NOVEL-DOCUMENTED-EXCEPTION | library | Shared local guard scaffold; cites Anthropic hook docs but implementation is local/ported harness infrastructure. |
| 4 | `_observation_writer.py` | NOVEL-DOCUMENTED-EXCEPTION | library | Local observation pipeline helper with ECC continuous-learning cite; not a standalone upstream hook. |
| 5 | `agent_plan_readonly_bash_guard.py` | NOVEL-DOCUMENTED-EXCEPTION | wired | HNF-gated sibling-novel read-only Bash guard for plan-mode agents. |
| 6 | `agent_spawn_gate.py` | SOTA-CITED | wired | Cites Anthropic hooks/subagents docs and CCBP subagent constraints; local threshold heuristic disclosed. |
| 7 | `auto_proceed_gate.py` | NOVEL-DOCUMENTED-EXCEPTION | wired | Stop-hook mechanics cite official docs; auto-proceed policy is local user/harness policy. |
| 8 | `block_no_verify_guard.py` | SOTA-CITED | wired | Cites ECC block-no-verify hook and git hook bypass surface. |
| 9 | `codex_failure_audit.py` | SOTA-CITED | wired | Cites Anthropic SDK PostToolUseFailure schema; sibling-novel observability wrapper documented. |
| 10 | `codex_gate.py` | NOVEL-DOCUMENTED-EXCEPTION | called-by-hooks | Local fail-closed data-boundary classifier; OWASP background only, exact policy is local. |
| 11 | `codex_mcp_healthcheck.py` | SOTA-CITED | wired | Cites Codex MCP config/schema and Anthropic hook surface; installed as Codex observability enrichment. |
| 12 | `codex_postcommit_review.py` | SOTA-CITED | wired | Cites CCBP/OpenAI Codex review workflow and codex CLI/plugin primitives; active T3 path. |
| 13 | `codex_prepush_review.py` | SOTA-CITED | wired | Same Codex review substrate as postcommit; active prepush async review path. |
| 14 | `codex_review_queue.py` | NOVEL-DOCUMENTED-EXCEPTION | called-by-hooks | Durable local queue for gated/failed Codex reviews; support module, not directly wired. |
| 15 | `codex_review_thread_bridge.py` | SOTA-CITED | dormant/called-by-stuck-detector | Bridges local review logs to codex-plugin-cc broker/tracked-job primitives. |
| 16 | `codex_review_trace.py` | SOTA-CITED | wired | Cites hooks + Langfuse + codex-plugin-cc invocation path; active tracing hook. |
| 17 | `codex_stuck_detector.py` | SOTA-CITED | wired | Cites codex-plugin-cc process/tracked-job primitives plus Stop/UserPromptSubmit hook semantics. |
| 18 | `codex_t1_consult_gate.py` | NOVEL-DOCUMENTED-EXCEPTION | wired | PreToolUse Edit/Write T1 gate is documented Path-B HNF; upstream substrate exists but exact bridge is local. |
| 19 | `codex_t2_pre_commit_gate.py` | SOTA-CITED | wired | Cites CCBP cross-model workflow, Codex `review --uncommitted`, and Anthropic PreToolUse deny contract. |
| 20 | `codex_t5_plan_review_gate.py` | SOTA-CITED | wired | Cites Anthropic ExitPlanMode/PreToolUse semantics and local T5 plan-review discipline. |
| 21 | `context_window_guard.py` | REMOVE-CANDIDATE | not wired | Compact-context cohort; W184 remove candidate; stale 250k/300k compact assumptions for 1M runtime. |
| 22 | `fm17_class_lint.py` | NOVEL-DOCUMENTED-EXCEPTION | wired | Local FM-17 subclass classifier; cites local failure-mode taxonomy and SDK schema. |
| 23 | `fm17d_stall_detector.py` | NOVEL-DOCUMENTED-EXCEPTION | dormant | HNF-confirmed sibling-novel detector; prior schema-rot/dormancy history. Keep only if revalidated. |
| 24 | `fm19_artifact_inline_lint.py` | NOVEL-DOCUMENTED-EXCEPTION | wired | Local FM-19 lint based on local ARTIFACT-INLINE discipline; advisory. |
| 25 | `fm20_path_drift_lint.py` | NOVEL-DOCUMENTED-EXCEPTION | wired | Local FM-20 path-drift lint; advisory DRY-RUN with official hook schema cite. |
| 26 | `gitleaks_pre_commit_gate.py` | SOTA-CITED | wired | Cites gitleaks v8.30.1 `git --staged` and Anthropic PreToolUse deny contract. |
| 27 | `precompact_guard.py` | REMOVE-CANDIDATE | not wired | Compact-context hard-block script; no active PreCompact registration; remove unless retested. |
| 28 | `precompact_hint_emitter.py` | REMOVE-CANDIDATE | not wired | Compact-context hint emitter; header notes ambiguous PreCompact stdout semantics. |
| 29 | `safety_guard.py` | NOVEL-DOCUMENTED-EXCEPTION | wired | HNF-gated sibling cite-import; safety policy is local even though pattern overlaps ECC safety hooks. |
| 30 | `secret_scan_guard.py` | SOTA-CITED | wired | Cites awesome-claude-code-toolkit secret scanner and AWS git-secrets pattern. |
| 31 | `sessionstart_compact_hint_reader.py` | REMOVE-CANDIDATE | not wired | Compact-context rehydration script; no live compact-only SessionStart registration found. |
| 32 | `subagent_stop_telemetry.py` | SOTA-CITED | wired | Cites Anthropic SDK SubagentStop schema and hook semantics; active telemetry path. |
| 33 | `userpromptsubmit_compact_threshold.py` | REMOVE-CANDIDATE | not wired | Stale defaults and hard-block behavior conflict with current 1M ENV(j) target; see compact verdict. |
| 34 | `utils.py` | PENDING-AUDIT | library | Shared helper has Python-doc cites and local policy; should be explicitly reclassified as private helper or SOTA-cited utility. |
| 35 | `<inventory gap: expected hook missing from live glob>` | PENDING-AUDIT | missing | Requested total is 36, but live non-recursive `*.py` inventory found only 34. |
| 36 | `<inventory gap: expected hook missing from live glob>` | PENDING-AUDIT | missing | Same inventory mismatch; reconcile against W187 canonical list before claiming 36 live hooks. |

## Evidence Probes Run

- `Get-ChildItem .claude/hooks/scripts -Filter *.py` returned **34** Python files.
- `Get-ChildItem Env:CONTEXT_WINDOW_COMPACT_*` returned live `WARN=350000`, `HIGH=500000`, `CRIT=600000`.
- `.claude/settings.json` env block also contains `WARN=350000`, `HIGH=500000`, `CRIT=600000`.
- `CLAUDE.local.md` ENV(j) contains target `WARN=600000`, `HIGH=700000`, `CRIT=780000`.
- `.claude/settings.json` `UserPromptSubmit` currently wires `codex_stuck_detector.py`, not `userpromptsubmit_compact_threshold.py`.

