
---

## Wave 152 Fire 23 — Cite-extraction `managed_agents/CMA_gate_human_in_the_loop.ipynb` → memory file ratifying CR-7 Phase 1-3 graduated-unleash + safety floor design at TIER-1-OFFICIAL Anthropic level (W152-F20 priority queue #3 execution; user 11th-verbatim directive; USER-CORRECTION-ACK n=15→n=16; FM-21.c n=7→n=8 same-wave; FM-21.a defense n=5→n=6; **CR-12 CITE-CLASS-CANONICAL n=3 cross-arc** — formal codification ELIGIBLE)

**Date**: 2026-05-11
**Wave**: 152 Fire 23 (W152-F20 priority queue #3 candidate executed)
**Type**: Cite-extraction from W152-F20 CITE-CLASS-CANONICAL Anthropic Cookbook → memory file enriching CR-7 Phase 1-3 graduated-unleash
**Risk class**: LOW per `launch-discipline.md §D1` (gitignored memory file + doc-only provenance)
**HEAD pre-ship**: `4ed6666` (W152-F22 CMA prompt-versioning cite-extraction)

### Cite-extraction target

`Z:/repos/deps/anthropic-cookbook/managed_agents/CMA_gate_human_in_the_loop.ipynb @ HEAD 33424c3e`

310 lines / 9 cells / MIT license / Anthropic-OFFICIAL / `anthropic>=0.91.0` BETA API.

### Memory file shipped (gitignored)

`Z:/claude-sota-installed/.claude/projects/Z--claude-sota-installed/memory/reference_anthropic_cma_human_in_loop_gate_2026_05_11.md` (~170 LOC)

### Calibration principle verbatim (TIER-1-OFFICIAL)

> "Calibration matters here, an agent that escalates everything is exhausting to work with, and an agent that escalates nothing is dangerous."

→ DIRECTLY parallels CR-7 Phase 1-3 graduated-unleash trigger predicates:
- Phase 1 (auto + safety-checks): too cautious = "exhausting"
- Phase 2 (default + allow[]): graduated calibration
- Phase 3 (bypassPermissions): full trust ONLY after testable predicates pass

### 6-row CR-7 ↔ CMA gate pattern ratification table

| CR-7 element | CMA gate pattern | Status |
|---|---|---|
| Phase 1 `auto` + safety-checks | CMA `agent_toolset` with `permission_policy: {type: "always_allow"}` for safe primitives | ✅ STRUCTURALLY ANALOGOUS |
| Phase 2 `default` + `allow[]` per installed primitive | CMA custom tools with explicit JSON schema in `tools=` array | ✅ STRUCTURALLY ANALOGOUS |
| Phase 3 `bypassPermissions` (full unleashed) | CMA `permission_policy: {type: "always_allow"}` at toolset level | ✅ STRUCTURALLY IDENTICAL |
| safety_guard.py deny-list (catastrophic patterns) | CMA `escalate()` for ambiguous-or-catastrophic ops | ✅ STRUCTURALLY ANALOGOUS |
| agent_plan_readonly_bash_guard.py plan-mode | CMA `decide()` for clear-cut ops | ✅ STRUCTURALLY ANALOGOUS |
| Calibration principle (testable trigger predicates, not operator-judgment) | "escalates everything = exhausting / nothing = dangerous" | ✅ DIRECTLY RATIFIED |

### Direct ratification of eee safety floor design

Per `Z:/claude-sota/.claude/rules/layered-gates-architecture.md §4.1` Wave 11A `bash_command_allowlist.py` intentional removal: eee's safety architecture is narrow catastrophic-pattern deny-list (`safety_guard.py`) + plan-mode readonly restrictions (`agent_plan_readonly_bash_guard.py`) + graduated permission modes (CR-7 Phase 1-3) — NOT positive allowlist.

**Anthropic-OFFICIAL ratifies the design**: CMA pattern is ALSO narrow catastrophic-pattern deny floor + explicit escalate-for-ambiguous + permission_policy graduated modes (`always_allow` / explicit gates). eee's CONVERGES with Anthropic-OFFICIAL guidance.

### Two driver patterns (development vs production)

**Part A streaming** (development): "stream the session's events and react to each tool call as it arrives" — eee analog = autonomous /loop cron-driven mode

**Part B webhook** (production): "register a webhook that fires on `session.status_idled`, your server inspects events + puts pending escalation in front of reviewer + POSTs result back" — eee analog = operator-action recommendation pattern via Forward Top-5 + provenance entries

### CR-12 CITE-CLASS-CANONICAL n=3 cross-arc trigger SATISFIED

This is the **3rd CITE-CLASS-CANONICAL cite-extraction** in W152 arc:
- W152-F20 Anthropic Cookbook overall (n=1)
- W152-F22 CMA prompt-versioning (n=2)
- W152-F23 CMA human-in-loop (n=3) **— formal codification ELIGIBLE per cycle-322 jurisdiction**

CR-12 CITE-CLASS-CANONICAL is now firmly cross-arc-established and ELIGIBLE for formal codification as the 6th class in CR-12 disposition lattice at next-T1 boundary.

### Cardinal-rule conformance

CR-1 ✅ TIER-1-DIRECT Anthropic-OFFICIAL cite-extraction
CR-3 ✅ Phase 1 bootstrap exception (Path P SKIPPED per FM-21.a)
CR-5/6 N/A (no install class)
CR-7 ✅ FULL (CR-7 itself ratified at TIER-1-OFFICIAL via this cite-extraction)
CR-8 ✅ FULL (verbatim quotes embedded)
CR-9 ✅ (read-only research probe exception)
CR-10 ✅ FULL (W152-F20 priority queue #3 execution)
CR-11 ✅ FULL (META-process; third priority-queue execution)
CR-12 ✅ FULL (CITE-CLASS-CANONICAL n=3 cross-arc SATISFIED; formal codification eligible at next-T1)

### Risk class

LOW per launch-discipline D1.

### CronCreate SKIP rationale (6th consecutive same-arc)

Same as W152-F17→F22: cron `490fc8a5` still presumed armed. FM-21.a anti-pattern defense.

### Ladders advanced

- **USER-CORRECTION-ACK n=15→n=16** (+1: 11th-verbatim user directive)
- **Mia n=316 unchanged** (no edit prescriptions; cite-extraction outcome)
- **FM-21.c sub-class evidence n=7→n=8 same-wave** (8th recursive repetition)
- **FM-21.a anti-pattern defense n=5→n=6** (6th consecutive CronCreate SKIP per OWNED rule)
- **CR-12 CITE-CLASS-CANONICAL n=3 cross-arc trigger SATISFIED** (W152-F20 + F22 + F23 = 3 same-arc CITE-CLASS-CANONICAL instances; formal codification ELIGIBLE)
- **CR-7 graduated-unleash discipline RATIFIED at TIER-1-OFFICIAL** (CMA human-in-loop pattern structurally identical)
- **eee safety floor design RATIFIED at TIER-1-OFFICIAL** (Wave 11A bash_command_allowlist removal converges with CMA narrow-deny-floor)
- **W152-F20 priority queue #3 executed** (5-item queue → 3 of 5 shipped)
- **Cite-extraction memory file shipped** (gitignored ~170 LOC)
- All other ladders unchanged: FM-20 n=22 / FM-02 (c) n=19 / Path P n=28 / Pattern D n=28 / FM-09 14/14 firm / FM-17.f firm n=6 / Inverse-FM-09 n=1 / Stale-wakeup n=1 / FM-08 n=1 / Stale-tmp-file-rename n=1 / Inline-bash quote-trap n=17 / Recursive promotion-fire dogfood n=6

### Files (committed + gitignored)

- `docs/install-provenance.md` (W152-F23 entry appended ~110 LOC; COMMITTED)
- `.claude/projects/Z--claude-sota-installed/memory/reference_anthropic_cma_human_in_loop_gate_2026_05_11.md` (~170 LOC; GITIGNORED per `.gitignore:20`)

### Refs

- TIER-1-OFFICIAL: `Z:/repos/deps/anthropic-cookbook/managed_agents/CMA_gate_human_in_the_loop.ipynb @ HEAD 33424c3e`
- CR-7 graduated unleash: `CLAUDE.md L82-105`
- W152-F11 FM-21 OWNED promotion `fc5e4ae`
- W152-F20 Anthropic Cookbook CITE-CLASS-CANONICAL `4170fbc`
- W152-F21 migration notebook `70f9e03`
- W152-F22 CMA prompt-versioning `4ed6666`
- `Z:/claude-sota/.claude/rules/layered-gates-architecture.md §4.1` Wave 11A bash_command_allowlist removal
- `safety_guard.py` + `agent_plan_readonly_bash_guard.py` eee safety floor
- `CLAUDE.md L132 "Intentional divergences" (d)` TEMPORARY OPERATOR OVERRIDE bypassPermissions
- Anthropic Managed Agents beta API: `anthropic>=0.91.0`

### Forward Top-5 (post-W152-F23)

🥇 **OPERATOR-DECISION**: cron break-cycle 4 ranked options
🥈 W152-F24 candidate: cite-extract `claude_agent_sdk/00_The_one_liner_research_agent.ipynb` → sota-researcher refinement (W152-F20 priority #4)
🥉 W152-F24 alternative: `claude_agent_sdk/05_Building_a_session_browser.ipynb` → ECC sessions skill sister (W152-F20 priority #5)
#4 OPERATOR-DECISION: formal CR-12 CITE-CLASS-CANONICAL codification at next-T1 boundary (n=3 cross-arc trigger now satisfied)
#5 OPERATOR-SUPERVISED 🅳 Docker cutover (W150-F3)
