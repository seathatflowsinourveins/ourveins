# Wave 148 Fire 1 Agent A — Untracked Safety-Floor Hooks Audit

**Fire**: Wave 148 Fire 1 Agent A
**Agent type**: sota-researcher (Sonnet stand-in)
**Task ID**: afa3b1d6f0c9a279f
**Duration**: 127s wall-clock | 414K tokens | 8 tool_uses
**Status**: COMPLETE
**Verdict**: DISPOSITION: A conf=0.94

## A. Executive Summary

Both untracked hooks are **Wave 14b verbatim cite-imports** (May 7) from sibling SOTA at PINNED SHAs with FULL CR-9 provenance headers (HONEST-NON-FINDING gate documented; Probe DAG all-PASS; REVERT-precedent cleared). Sibling-bleed reduces to **7/7 occurrences = CLASS (a) cite-anchor comments in provenance header** — zero runtime path dependencies. Both import-clean; both wired in settings.json; defense-in-depth IRREPLACEABLE (safety_guard 12-destructive-pattern auto-block; agent_plan_readonly per-subagent OPERATIONAL read-only enforcement under bypass parent).

**Recommend DISPOSITION A: COMMIT-CURRENT-AS-STABLE** — locks the Wave 14b cite-import work into git, eliminates "untracked safety floor" audit risk, zero behavioral change, 0 LOC modification.

## B. Diff (installed vs sibling current)

| File | Sibling LOC | Installed LOC | Delta | Content-class divergence |
|---|---|---|---|---|
| `safety_guard.py` | 303 | 337 | +34 | +34 provenance header (Wave 14b cite-import block: Source SHA + tier + HNF evidence + Probe DAG + CR-9 sub-rules). Body identical to sibling SHA `32fbcb0d` (Wave 29 Ship 29.A.2 fail-closed). NO sibling commits unported beyond pin SHA. |
| `agent_plan_readonly_bash_guard.py` | 892 | 937 | +45 | +45 provenance header (Wave 14b cite-import block). Body identical to sibling SHA `f57c74d` (Wave 11A REVERT-AND-REMOVE bash_command_allowlist). NO sibling commits unported beyond pin SHA. |

**Sibling commits post-pin (NOT yet ported)**: 0 — both files at sibling current HEAD as of installed-port date 2026-05-07.

## C. Sibling-bleed (Z:/claude-sota path refs)

| File | Line | Context | Class |
|---|---|---|---|
| safety_guard | 4 | `# Source: Z:/claude-sota/.claude/hooks/scripts/safety_guard.py` | **(a) cite-anchor** — provenance Source field |
| safety_guard | 6 | `# Target: Z:/claude-sota-installed/.claude/hooks/scripts/safety_guard.py` | **(a) cite-anchor** — provenance Target field |
| safety_guard | 15 | `#  Z:/claude-sota/.claude/rules/citation-discipline.md rule #8)` | **(a) cite-anchor** — tier-class rule reference |
| safety_guard | 39 | `# @ Wave 10 ... — all present in Z:/claude-sota-installed/.claude/rules/).` | **(a) cite-anchor** — provenance verification note |
| agent_plan | 5 | `# Source: Z:/claude-sota-installed/.claude/hooks/scripts/agent_plan_readonly_bash_guard.py` | **(a) cite-anchor** — (self-referential Target field in port header) |
| agent_plan | 12 | `#  per Z:/claude-sota/.claude/rules/citation-discipline.md rule #8)` | **(a) cite-anchor** — tier-class rule reference |
| agent_plan | 27 | `#     - 6-class strict pattern grep: 0 hits on Z:/claude-sota[^-]/, Z:\claude-sota\, Z--claude-sota[^-]...` | **(a) cite-anchor** — HNF audit evidence in port header |

**Verdict**: 7/7 occurrences = CLASS (a) cite-anchor comments in provenance headers. **ZERO** Class (b) runtime path dependencies. **ZERO** Class (c) docstring examples. CR-9 sibling-bleed defense FULLY SATISFIED.

## D. REVERT-precedent (CR-9 mandatory check)

**Sibling git log for safety_guard.py** (5 forward commits, ZERO REVERT):
- `32fbcb0` fix(security): Wave 29 Ship 29.A.2 — fail-closed corruption attack vectors
- `07d2e16` fix(security): Wave 29 Ship 29.A.1 — SAFETY_GUARD_BYPASS env exploit removal
- `b26bc70` chore(pins): Ship 54 — ECC iter refresh
- `35fec73` fix(cite-quality): Wave B autonomous edit-rescue
- `b9cad09` feat(hook): Wave 5 P0 convergence — port safety guard from parent CCC

**Sibling git log for agent_plan_readonly_bash_guard.py** (5 forward commits, ZERO REVERT):
- `f57c74d` refactor(safety)!: Wave 11A REVERT-AND-REMOVE bash_command_allowlist (NOTE: reverts SISTER file, not this one)
- `18586c8` fix(hooks): close pytest --basetemp env-var bypass + over-deny
- `f7cc1f6` fix(hooks): close pytest --basetemp path-traversal + tilde bypass
- `89fe24b` fix(hooks): close 2-class safety-critical bypass — shell-substitution + subprocess-spawning
- `b677669` feat(hooks): Ship #279 Path F Iter A — agent_plan_readonly + 198 security tests

**CR-9 actual REVERT list** (from `CLAUDE.md`): `bash_command_allowlist.py` + `fleet_health_start.py` + `permission_request_auto_approve.py` — **NEITHER audit target is on REVERT list**. CR-9 sub-rule "DO NOT re-install" does NOT apply. PASS.

## E. Integrity (import-clean)

| File | Result |
|---|---|
| `safety_guard.py` | **IMPORT OK** |
| `agent_plan_readonly_bash_guard.py` | **IMPORT OK** |

Both modules load cleanly under Python 3.13 venv. No SyntaxError / ImportError / circular-deps.

## F. Disposition

| Option | Risk × Reward | CR conformance | Verdict |
|---|---|---|---|
| **A** COMMIT-CURRENT-AS-STABLE | LOW × HIGH | CR-1 ✅ (TIER-3-LOCAL-COMPOSITION cite-class properly documented in headers) / CR-5 ✅ (install-class via cite-import; not novel) / CR-8 ✅ (full HNF evidence in header) / CR-9 ✅ (REVERT clear, sibling-bleed=class-a-only, version-pinned to sibling SHAs) / CR-12 ✅ (TERTIARY cite-import-AMBER properly invoked w/ HNF gate documented) | **RECOMMEND** |
| **B** REFRESH-FROM-SIBLING | MED × LOW | Same CR matrix BUT introduces regression risk (sibling may have post-Wave-14b changes; would invalidate the pinned port-attribution headers; CR-9 mandates 2-round fix-forward budget) | REJECT |
| **C** CITE-IMPORT-AMBER (defer track) | LOW × LOW | Same conformance BUT leaves "untracked safety floor" as recurring audit signal across future fires; defers same Option-A work indefinitely | REJECT |

**Rationale for A**:
1. **Wave 14b work already DONE**: full HNF gate, Probe DAG, sibling-bleed scrub, REVERT check were all performed at port-time (May 7); provenance headers document the evidence.
2. **ROI**: tracking eliminates a recurring "why are these untracked?" audit per future fire (~5min × ~N fires = compounding); 1-shot `git add` + commit = ~30s.
3. **Behavioral change**: ZERO. Files are byte-identical to current installed runtime.
4. **CR-9 conformance**: version-pinned (sibling SHA documented), REVERT-precedent clear, sibling-bleed defense satisfied (class-a-only), 2-round fix-forward budget = not needed (0 LOC changes).
5. **Sibling SHA pins remain valid**: sibling has no further commits to these files post-pin date; refresh-from-sibling would be a no-op except provenance-header drift.

## G. Next Fire Scope (chosen disposition A)

**Edits**:
- `git add Z:/claude-sota-installed/.claude/hooks/scripts/safety_guard.py Z:/claude-sota-installed/.claude/hooks/scripts/agent_plan_readonly_bash_guard.py`
- Commit body: `feat(hooks): Wave 148 Ship 1 — track Wave 14b cite-import safety-floor hooks (safety_guard.py 337 LOC + agent_plan_readonly_bash_guard.py 937 LOC; 0 LOC content change; CR-9 conformance preserved per provenance headers)`
- Append `docs/install-provenance.md` row: "Wave 148 Ship 1 — track 2 untracked safety-floor hooks as-is; CR-9 audit clean; sibling SHA pins remain valid"

**LOC estimate**: 0 content LOC + ~3 lines provenance + commit body. **Risk class**: LOW. **Cardinal-rule conformance**: CR-1+5+7+8+9+10+11+12 all PASS (no novel content; install-class via Wave 14b cite-import). **Cross-model gate**: Phase 1 bootstrap exception — orchestrator-side foreground+tee Path P OR REAL GPT-5.5 BRIDGE-MODE codex T1 PRE-EDIT consult.

**VERDICT (final line)**: DISPOSITION: A conf=0.94
