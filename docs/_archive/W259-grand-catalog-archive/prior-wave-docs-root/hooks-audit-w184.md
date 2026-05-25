---
title: W184 Hooks audit — cite-class table + SOTA conformance
status: AUTHORITATIVE
date: 2026-05-13
agent: orchestrator
wave: 184
---

# W184 Hooks audit — cite-class table

**Mia-probed 2026-05-13 via ctx_batch_execute + Grep + Read.** Inventory: 36 `.py` hooks at `.claude/hooks/scripts/` = 13,605 LOC; 18 wired in `.claude/settings.json`.

## Cite-class lattice per CLAUDE.md CR-1 + citation-discipline.md rule #8

| Class | Count | % | Hooks |
|---|---|---|---|
| **TIER-1-DIRECT** (Anthropic CC docs / SDK / git-scm / gitleaks / OpenAI codex) | 14 | 38.9% | block_no_verify_guard, codex_failure_audit, codex_t1_consult_gate, codex_t2_pre_commit_gate, codex_t5_plan_review_gate, gitleaks_pre_commit_gate, agent_plan_readonly_bash_guard, agent_spawn_gate, auto_proceed_gate, codex_stuck_detector, subagent_stop_telemetry, fm17d_stall_detector, codex_mcp_healthcheck, codex_postcommit_review |
| **TIER-2** (ECC / CCBP / codex-plugin-cc / mattpocock named-author) | 8 | 22.2% | codex_postcommit_review, codex_prepush_review, codex_review_queue, codex_review_thread_bridge, codex_review_trace, codex_gate, _codex_preflight, _codex_plugin_root |
| **TIER-3-LOCAL-SIBLING** (cites `Z:/claude-sota/` — **VIOLATES feedback_no_sibling_claude_sota_cite_2026_05_13**) | 9 | 25.0% | precompact_guard, precompact_hint_emitter, sessionstart_compact_hint_reader, userpromptsubmit_compact_threshold, context_window_guard, safety_guard, _guard_base, _observation_writer, utils |
| **TIER-3-LOCAL-DISCIPLINE** (local FM-* lint or local policy, no upstream) | 5 | 13.9% | fm17_class_lint, fm19_artifact_inline_lint, fm20_path_drift_lint, secret_scan_guard, fm17d_stall_detector (dual-class) |
| **NOVEL/NO-CITE** | 0 | 0% | (all hooks carry some Reference header) |

**Non-SOTA-direct (TIER-3-LOCAL-SIBLING + TIER-3-LOCAL-DISCIPLINE)** = 14/36 ≈ **38.9%**.
**SOTA-direct (TIER-1 + TIER-2)** = 22/36 ≈ **61.1%**.

## High-leverage cleanup targets (Wave 184 P0 scope — 5 COMPACT hooks)

| Hook | LOC | Class | Violation | Action |
|---|---|---|---|---|
| precompact_guard.py | 77 | TIER-3-LOCAL-SIBLING | cites Z:/claude-sota/ | REMOVE from settings.json + mv to .backup/wave184/ |
| precompact_hint_emitter.py | 169 | TIER-3-LOCAL-SIBLING | cites Z:/claude-sota/ | REMOVE + mv |
| sessionstart_compact_hint_reader.py | 219 | TIER-3-LOCAL-SIBLING | cites Z:/claude-sota/ | REMOVE + mv |
| userpromptsubmit_compact_threshold.py | 280 | TIER-3-LOCAL-SIBLING | cites Z:/claude-sota/ | REMOVE + mv |
| context_window_guard.py | 102 | TIER-3-LOCAL-SIBLING | cites Z:/claude-sota/ | REMOVE + mv |
| **TOTAL** | **847** | | 5 sibling-bleed violators | replace with fcakyon intelligent-compact@claude-settings (already ENABLED settings.json L572) |

## SOTA replacement (P1)

- **fcakyon/claude-codex-settings → intelligent-compact** — VERIFIED ENABLED `.claude/settings.json:572` `"intelligent-compact@claude-settings": true`; plugin source `.claude/settings.json:651` `{"source": "github", "repo": "fcakyon/claude-codex-settings"}`. INSTALLED W164 F38a per CLAUDE.local.md ENV (i) note. **Confirms P1 NO-OP install — only need to remove the 5 shim hooks from PreCompact/SessionStart/UserPromptSubmit slots.**

## Preserved 4 FM-* lint hooks (TIER-3-LOCAL-DISCIPLINE)

| Hook | LOC | Why preserve |
|---|---|---|
| fm17_class_lint.py | 141 | local discipline enforcer; backup-only |
| fm17d_stall_detector.py | 306 | TIER-1 codex-CLI watchdog ALSO; backup-only |
| fm19_artifact_inline_lint.py | 191 | ARTIFACT-INLINE FM-19 enforcer; backup-only |
| fm20_path_drift_lint.py | 124 | path-drift cascade defense; backup-only |

Backed up to `.backup/wave184/` as preservation copies; **NOT removed from settings.json** (local discipline enforcers, no SOTA replacement available).

## settings.json hook registration targets (predicate 2 — destructive, gated on Agent verdicts)

Hooks to REMOVE from settings.json (after Agent A/B/C return verdicts):
- `PreCompact` slot (L519+) — remove precompact_guard, precompact_hint_emitter
- `SessionStart` slot (L466+) — remove sessionstart_compact_hint_reader
- `UserPromptSubmit` slot (L448+) — remove userpromptsubmit_compact_threshold
- `PreToolUse`/`PostToolUse` — remove context_window_guard registrations if present

## Audit verification queries

```bash
# Confirm hooks present:
ls Z:/claude-sota-installed/.claude/hooks/scripts/precompact_*.py Z:/claude-sota-installed/.claude/hooks/scripts/sessionstart_compact_hint_reader.py Z:/claude-sota-installed/.claude/hooks/scripts/userpromptsubmit_compact_threshold.py Z:/claude-sota-installed/.claude/hooks/scripts/context_window_guard.py

# Confirm backup:
ls Z:/claude-sota-installed/.backup/wave184/ | wc -l    # expect 9

# Confirm fcakyon intelligent-compact wired:
grep -n "intelligent-compact" Z:/claude-sota-installed/.claude/settings.json
```

## Cite-class for this audit doc itself

constituents=[
  TIER-1-DIRECT @ ctx_batch_execute output (hooks-headers section) 2026-05-13,
  TIER-1-DIRECT @ Grep output Z:/claude-sota-installed/.claude/settings.json:519,572,651 2026-05-13,
  TIER-3-LOCAL-OPERATOR-DERIVED @ feedback_no_sibling_claude_sota_cite_within_installed_runtime_2026_05_13.md (user-trigger W183 F1)
]; effective_tier=TIER-3-LOCAL-COMPOSITION per citation-discipline.md rule #8 MIN_PRECEDENCE
