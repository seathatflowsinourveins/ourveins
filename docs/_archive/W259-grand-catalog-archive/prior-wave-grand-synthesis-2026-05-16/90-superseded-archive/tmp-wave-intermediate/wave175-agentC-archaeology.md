---
title: W175 Agent C Archaeology Audit
date: 2026-05-13
agent: codex-rescue (GPT-5.5 BRIDGE-MODE substitute for gpt5-archaeologist)
scope: .claude/hooks/scripts/*.py + .claude/rules/*.md
wave: 175
fire: 1
status: AUTHORITATIVE
task_id: a35203c9e976fc551
duration_ms: 194591
total_tokens: 249066
---

### HIGH findings (top risks)
| # | File:Line | Finding type | Excerpt | Blast radius | Fix |
|---|-----------|-------------|---------|-------------|-----|
| 1 | `.claude/rules/audit-action-loop.md:97` | FM-20 PATH-DRIFT / stale ACTIVE claim | `claude_md_count_audit.py` | Audit inventory says ACTIVE, but `scripts/claude_md_count_audit.py` is absent locally; users assume enforcement is live when it is not. | Demote row to FORWARD-REF or port script + settings wiring; verify all ACTIVE rows by `Test-Path scripts/*.py` before edit. |
| 2 | `.claude/rules/audit-action-loop.md:98` | FM-20 PATH-DRIFT / stale ACTIVE claim | `cite_drift_audit.py` | Cite-drift control documented as active while absent; stale cite checks may be assumed covered when they are not. Probe: ABSENT `scripts/cite_drift_audit.py`. | Replace ACTIVE with ABSENT/PORT-PENDING or install the script and update settings anchors. |
| 3 | `.claude/rules/synthesis-layer-verify.md:46` | STALE REFS / missing local hook | `subagent_transcript_mine.py` | Rule directs synthesis checks to a SubagentStop hook not installed locally. Probe: ABSENT `.claude/hooks/scripts/subagent_transcript_mine.py`; sibling copy exists. | Rewrite to installed hook name if superseded, or port `subagent_transcript_mine.py`; add Test-Path proof in note. |
| 4 | `.claude/hooks/scripts/gitleaks_pre_commit_gate.py:290` | SILENT-FALLBACKS / security fail-open | `Last-resort fail-open` | Secrets gate can allow commits on unhandled hook exceptions; bare `pass` on telemetry failure at L294 reduces forensic signal. | Fail closed on scanner/hook exceptions or require explicit documented bypass env with loud stderr + JSONL. |
| 5 | `.claude/hooks/scripts/agent_spawn_gate.py:466` | SILENT-FALLBACKS / dispatch gate fail-open | `except Exception as exc` | Agent spawn policy gate returns `_EXIT_OK` at L468 on stdin read failure, allowing malformed runtime input to bypass dispatch constraints. | Fail closed for parse/read exceptions on Task/Agent gate, or emit DENY JSON with recovery text. |

### MED findings
| # | File:Line | Finding type | Excerpt | Blast radius | Fix |
|---|-----------|-------------|---------|-------------|-----|
| 1 | `.claude/hooks/scripts/auto_proceed_gate.py:9` | SIBLING-BLEED / nonlocal cite | `codex_stop_review_gate.py:533-536` | Hook cites sibling implementation path; local probe found ABSENT `.claude/hooks/scripts/codex_stop_review_gate.py` — line-range recovery cannot be verified in this runtime. | Replace with local installed pattern cite or vendor the referenced hook. |
| 2 | `.claude/hooks/scripts/_observation_writer.py:49` | SIBLING-BLEED / local missing target | `eval_case_compliance_observer.py:42-52` | Atomic append pattern justified by sibling-only hook; local probe found ABSENT `.claude/hooks/scripts/eval_case_compliance_observer.py`. | Cite installed `_atomic_jsonl_append.py` and local callers; move sibling cite to provenance. |
| 3 | `.claude/rules/audit-action-loop.md:100` | FM-20 PATH-DRIFT / stale counts | `23 servers ~1878 tok` | Rule records `.mcp.json` smoke count as 23 servers / 6 disabled; live probe returned `mcpServers=11 disabledMcpjsonServers=0 total=11`. | Refresh count claims or remove exact volatile counts; cite a command instead of snapshot values. |
| 4 | `.claude/rules/fm17-subagent-fleet-depletion.md:152` | FM-20 PATH-DRIFT / contradictory taxonomy | `rule now has 6-sibling taxonomy` | File frontmatter says 7 sub-classes at L3; body at L152 says 6-class — stale taxonomy can misroute FM-17.g recovery. | Update L152 to 7-class taxonomy or mark as historical Wave 130 snapshot. |
| 5 | `.claude/rules/cardinal-rule-11-meta-process-sota.md:19` | SIBLING-BLEED / normative sibling dependency | `Z:/claude-sota/.claude/rules` | Active meta-process rule requires fan-out behavior from sibling absolute paths instead of installed local rules. | Rewrite to `.claude/rules/*` local anchors; leave sibling SHA only as cite-import provenance. |

### LOW findings
| # | File:Line | Finding type | Excerpt | Blast radius | Fix |
|---|-----------|-------------|---------|-------------|-----|
| 1 | `.claude/rules/ahfv-probe-dag.md:136` | SIBLING-BLEED / recovery route | `convergence-gate.md:127-149` | Recovery route points to sibling absolute path while local `.claude/rules/convergence-gate.md` exists. | Convert to local relative cite and refresh line range. |
| 2 | `.claude/rules/fm17-subagent-fleet-depletion.md:101` | FM-17.f BILLING BLOCKER / inferred mechanism | `parent session's [1m]` | Rule labels mechanism INFERRED; risk is documentation overreach, not direct blocker logic. | Keep [INFERRED] explicit near first sentence; prefer observed signature + recovery paths. |
| 3 | `.claude/hooks/scripts/agent_plan_readonly_bash_guard.py:95` | SILENT-FALLBACKS / escape hatch | `AGENT_PLAN_BASH_GUARD_DISABLE=1` | Explicit env disables the plan-mode positive-validation Bash gate; high leverage if set accidentally. | Require loud telemetry when disable env is present; consider time-boxed or session-local disable only. |

### HNF axes (probed, nothing found)
- `[VERIFIED]` File inventory: 34 `.claude/hooks/scripts/*.py` and 63 `.claude/rules/*.md` at repo HEAD `26bdd0843bbcafa5d7ae5f4094972baff373d599`.
- `[VERIFIED]` Sibling target existence for sampled sibling refs confirmed: `codex_stop_review_gate.py`, `eval_case_compliance_observer.py`, `subagent_transcript_mine.py` all exist in sibling; findings are local-runtime bleed, not sibling absence.
- `[VERIFIED]` `scripts/` glob contains only: `__pycache__`, `_atomic_jsonl_append.py`, `cli_path_audit.py`, `codex-plugin-hooks-rewrite.py`, `ecc-plugin-hooks-rewrite.py` — no sampled ACTIVE audit scripts present.
- `[VERIFIED]` No destructive edits or writes performed; read-only archaeology.
- `[INFERRED]` Upstream HEAD SHAs in sampled cite lines not revalidated against every `Z:/repos/deps/*` target; findings rely on local file content and local absence probes.

ARCHAEOLOGY: top-5 HIGH-risk findings summary
1. [`audit-action-loop.md:97`] FM-20 PATH-DRIFT — ACTIVE audit script claim points at absent `scripts/claude_md_count_audit.py` — Pattern A: demote to FORWARD-REF or port+wire script.
2. [`audit-action-loop.md:98`] FM-20 PATH-DRIFT — ACTIVE cite-drift audit claim points at absent `scripts/cite_drift_audit.py` — Pattern A: refresh runtime audit inventory row.
3. [`synthesis-layer-verify.md:46`] STALE REFS — operational SubagentStop hook absent locally — Pattern A: rewrite to installed hook or port missing hook with Test-Path verification.
4. [`gitleaks_pre_commit_gate.py:290`] SILENT-FALLBACKS — secret gate fail-opens on unhandled exceptions — Pattern A: convert to fail-closed or explicit bypass-only recovery with loud stderr.
5. [`agent_spawn_gate.py:466`] SILENT-FALLBACKS — dispatch policy gate fail-opens on stdin read failure — Pattern A: fail closed with DENY JSON for gate parse failures.
