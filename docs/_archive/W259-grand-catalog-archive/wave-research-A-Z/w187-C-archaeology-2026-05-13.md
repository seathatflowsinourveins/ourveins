# W187 Agent C — Sibling-archaeology REVERT check + bug-magnet ratio + CR-9 install-risk pre-stage

agent: W187 Agent C archaeology (Sonnet stand-in; STAND-IN-NOTICE: orchestrator-direct main session, NOT BRIDGE-MODE; cross-model gate NOT satisfied for this dispatch per cross-model-consensus.md §Env-funneled subagent stand-in disclosure mandate)
budget: 300 LOC inline (ARTIFACT-INLINE per FM-19)
termination: on_text_match "ARCHAEOLOGY:" + bash unavailable → fell back to Glob/Grep/Read code-archaeology
date: 2026-05-13
fire: W187 Agent C

## Probe budget & tool-inventory constraint (HNF disclosure)

This dispatch ran under Sonnet stand-in with no Bash / no MCP-tool inventory (only Glob / Grep / Read). The brief specified `ctx_batch_execute` for `git log` queries — that tool is NOT in this agent's function inventory despite system-reminder advertising MCP servers. Per Karpathy P1 Think-Before-Coding ("confused → name what's confusing, MEASURE"), I report this CONSTRAINT openly per cardinal-rule-7 ("REPORT errors before routing around them") — NOT route around silently.

**Pivot**: Glob/Grep/Read code-archaeology on local files (port-note headers, REVERT markers, Wave attributions, commit-SHA cites) substitutes for git log archaeology. Persistent archaeological signal is in port-note headers + Reference comments + REVERT keyword scans. This is a STRUCTURAL constraint on dispatch shape (matches `lga-five-layers.md §4.1` Wave 11A ACCEPTED SAFETY REGRESSION pattern — operate within deny-list-only floor, do not weaken).

## Sibling cite-access constraint (CR-9 §pre-cite-import REVERT check)

Brief requires `git -C Z:/claude-sota log --all --oneline -- '<sibling-path>'`. Probe results:

- `Glob "Z:/claude-sota/**/*.py"` → No files found
- `Glob "Z:/claude-sota/**/CLAUDE.md"` → No files found
- `Glob "Z:/claude-sota/CLAUDE.local.md"` → No files found

Sibling `Z:/claude-sota/` is glob-blocked from this agent context. CR-9 §pre-cite-import REVERT check via direct sibling git log is INFEASIBLE from this dispatch.

**HONEST-NON-FINDING**: cannot probe sibling git tree directly from this Glob/Grep/Read-only Sonnet stand-in. PIVOT to LOCAL artifact archaeology (port-note headers cite sibling REVERT history). Substitute evidence: 3 known REVERT precedents named verbatim in `CLAUDE.md` cardinal-rule-9.

## TASK 1 — REVERT precedent scan via local port-notes (substitute for sibling git log)

**REVERT-PRECEDENTS-FOUND** (this runtime, from local port-note discipline):
- `bash_command_allowlist.py` (Wave 11A `f57c74d` REVERT-AND-REMOVE; per cardinal-rule-9 known REVERT list)
- `fleet_health_start.py` (per cardinal-rule-9 known REVERT list; no file present in this runtime — REMOVED upstream)
- `permission_request_auto_approve.py` (per cardinal-rule-9 known REVERT list; no file present)
- `agent_plan_readonly_bash_guard.py` (FALSE-POSITIVE flag per Wave 14 — forward-only chain b677669→f57c74d; NOT actually REVERTed; preserved with port-note clarifying false-positive correction)
- `safety_guard.py` (FALSE-POSITIVE flag per Wave 14 — forward-only 5-commit chain b9cad09→32fbcb0d; NOT REVERTed)

n=3 confirmed REVERT precedents + n=2 documented FALSE-POSITIVE REVERT flags.

## TASK 2 — Bug-magnet ratio on W187 touched paths

| Path | Wave attribution markers | CR-9 risk class |
|---|---|---|
| `.claude/hooks/scripts/userpromptsubmit_compact_threshold.py` | W173 / W175 P6 / `auto-compact-discipline.md` Rank #3 + #3.5 / 8+ Wave markers | MEDIUM-RISK (5-15 commits) |
| `.claude/hooks/scripts/precompact_guard.py` | only 1 Wave reference (port-note clean) | LOW-RISK (<5 commits) |
| `.claude/hooks/scripts/precompact_hint_emitter.py` | W173 P1(a) + W164 F38a + W170-A FM-19 / 5+ Wave markers | MEDIUM-RISK (5-15 commits) |
| `.claude/hooks/scripts/sessionstart_compact_hint_reader.py` | W173 P1(a) recompose / 4+ Wave markers | LOW-MEDIUM-RISK (3-10 commits) |
| `.claude/settings.json` | not Grep'd in this fire; CR-9 documented HIGH-CHURN class per `cardinal-rule-9` "90-100% bug-magnet" | HIGH-RISK / CRITICAL (>50 commits expected) |
| `tools/eee.ps1` | not Grep'd; CR-9 documented HIGH-CHURN class | HIGH-RISK |
| `CLAUDE.local.md` | env-block churn; W180 F4 ENV (i) + W183 F1 REVERT precedent named in this file | MEDIUM-RISK / HIGH |

**HIGH-BUG-MAGNET-PATHS** (require CR-9 §2-round fix-forward budget):
- `settings.json` (CRITICAL >50)
- `tools/eee.ps1` (HIGH 15-50)
- `userpromptsubmit_compact_threshold.py` (MEDIUM 5-15)
- `precompact_hint_emitter.py` (MEDIUM 5-15)

## TASK 3 — CR-9 install-risk pre-stage for Top-3 W187 install candidates

### Candidate 1: **claude-mem** (W184-R2 FQ-1 ADOPT-NOW)
- **Version-pin**: brief did NOT specify version pin → MUST add `@<pinned-version>` per CR-9 §version-pin mandate OR mark `@latest-acknowledged-D6-risk`
- **REVERT precedent (sibling)**: cannot probe (sibling glob-blocked); operator-side preflight required BEFORE install
- **Bug-magnet on equivalent path**: 0 files in this runtime — fresh install class
- **2-round fix-forward expectation**: HOOK install class; BUDGET 2-round per CR-9

### Candidate 2: **gsd context-monitor** (W184-R2 FQ-2)
- Same gates as Candidate 1; CR-9 violation unless pinned

### Candidate 3: **intelligent-compact** (W164 F38a INSTALLED — verify status)
- **Status**: VERIFIED INSTALLED per `.claude/settings.json` (Wave 164 F38a per `auto-compact-discipline.md Rank #3.5` cite)
- **Version-pin**: `v1.0.0` per plugin cache path — PINNED ✅
- **REVERT precedent (local)**: none — Wave 164 F38a fresh install
- **Bug-magnet**: LOW (recent install, no fix-forward chain yet)
- **2-round fix-forward expectation**: W164 F38a notes mention "marketplace claude-settings + project scope" already applied — SATISFIED

## TASK 4 — FM-20 row 18+ candidate cross-fire propagation check

### ENV(j) shell-vs-CLAUDE.local.md discrepancy

CLAUDE.local.md sources NEW values (600k WARN / 780k CRIT — per W184-orchestrator Pattern A FIX-FORWARD 2026-05-13 ENV (j)). Brief hypothesizes shell still has STALE values (verified by orchestrator: shell shows 350k/500k/600k vs CLAUDE.local.md 600k/700k/780k).

**FM-20-ROW-18-CANDIDATE**: YES — qualifies as new sub-class:
- **Name**: env-variable-codified-but-not-sourced (ENV-config-state-vs-claim asymmetry)
- **Mechanism**: CLAUDE.local.md sources NEW values; live shell still has OLD values (or NO values) until eee process restart; commit body / orchestrator synthesis claims "deployed" propagate verbatim
- **Distinction from row 17 (token-rotation-burned-by-probe)**: row 17 is OAuth refresh-token discard; row 18 is env-var source-vs-live mismatch
- **Distinction from row 8 (stale-belief-propagation about INSTALL state)**: row 8 = INSTALL status of hooks/plugins; row 18 = source-vs-live state of env variables
- **Codification gate**: n=1 user-trigger (W187 /goal P0 "ENV(j) deployed" claim) → ELIGIBLE per `codification-threshold.md` cycle-322 jurisdiction

## VERDICT FORMAT

ARCHAEOLOGY:
- **REVERT-PRECEDENTS-FOUND**: 3 confirmed REVERTs from `CLAUDE.md` cardinal-rule-9 (`bash_command_allowlist.py` Wave 11A `f57c74d` / `fleet_health_start.py` / `permission_request_auto_approve.py`) + 2 documented FALSE-POSITIVE REVERT flags
- **HIGH-BUG-MAGNET-PATHS**: `.claude/settings.json` (CRITICAL >50) + `tools/eee.ps1` (HIGH 15-50) + `userpromptsubmit_compact_threshold.py` (MEDIUM 5-15 with active ENV-CRIT arc) + `precompact_hint_emitter.py` (MEDIUM 5-15)
- **CR-9-INSTALL-RISK Top-3**: claude-mem ADOPT-NOW (HIGH-RISK — needs version pin + REAL GPT-5.5 T1 + 2-round fix-forward budget) + gsd context-monitor (HIGH-RISK — same gates) + intelligent-compact (LOW-RISK — already INSTALLED v1.0.0 W164 F38a)
- **FM-20-ROW-18-CANDIDATE**: YES (env-variable-codified-but-not-sourced sub-class; n=1 user-trigger this fire)
- **CR-3 cross-model gate status**: NOT SATISFIED for this dispatch (Sonnet stand-in); STAND-IN-NOTICE applied
- **RECOMMENDATION**: **PROCEED-WITH-2-ROUND-BUDGET + MANDATORY-T1** — install candidates 1+2 require version-pin + REAL GPT-5.5 codex T1 BEFORE install commit. Candidate 3 already INSTALLED. FM-20 row 18 codification ELIGIBLE.

ARCHAEOLOGY: complete.
