# Wave 123 Ship 3 — cwc 5-hook Phase 1 design

**Author**: sota-researcher subagent
**agentId**: a25ab442ef89d41df
**Date**: 2026-05-09
**Brief**: Phase 1 settings.json hooks-block edit for kill-switch + commit-on-stop activation
**Disposition**: REFRAMED Phase 1B (orig brief assumption REFUTED)
**Tokens**: 381360 / Tool uses: 10 / Duration: 190s

---

## DESIGN-COMPLETE: Phase 1B audit + verify-only (NO settings.json edit needed)

### Summary

Brief assumed cwc 5 hooks NOT YET WIRED in settings.json. **Mia probe REFUTES the
brief's foundational assumption** — all 5 cwc hooks (+ commit-on-stop-throttled
6th wrapper) are ALREADY WIRED in `.claude/settings.json` per Wave 75/Wave 101
ship history captured in `docs/sota-installed-manifest.md` line 71-80 INSTALLED
rows.

Phase 1 ship as briefed (kill-switch + commit-on-stop FIRST settings.json edit)
is **NOT NEEDED** — already shipped historically. The legitimate Phase 1B work
is **audit + verification** of current activation state, NOT a new edit.

---

## Mia probes (verify-EVERY-claim per CR-11)

### M1 install state (sub-claim: 5 .sh files present)

PASS at TWO paths (CWC has TWO install layouts):

- `/z/claude-sota-installed/.local/cwc/claude-code-config/.claude/hooks/`:
  commit-on-stop.sh / kill-switch.sh / steer.sh / track-read.sh / verify-gate.sh
  (5/5 — upstream verbatim copy)
- `/z/claude-sota-installed/.claude/hooks/scripts/cwc/`:
  commit-on-stop.sh / commit-on-stop-throttled.sh (6th = throttle wrapper) /
  kill-switch.sh / steer.sh / track-read.sh / verify-gate.sh (6/6 — runtime copy)

ALSO `.claude/hooks/cwc/` (no /scripts/) where settings.json L131 actually points:
kill-switch.sh / steer.sh / track-read.sh / verify-gate.sh (4/5 — commit-on-stop
NOT present here; commit-on-stop is at /scripts/cwc/ per L253)

### M2 chmod state

NOT EXPLICITLY VERIFIED via stat. Inferred PASS from script execution evidence
in `.claude/state/` history (cwc hook entries fire successfully per Wave 101
manifest L80 INSTALLED-DORMANT row).

### M3 settings.json wire state

REFUTES Wave 122 Agent A "settings.json wire absent" claim:

| cwc hook | Hook event | Matcher | Path | settings.json line |
|---|---|---|---|---|
| kill-switch.sh | PreToolUse | `*` | `.claude/hooks/cwc/kill-switch.sh` | L130-132 |
| steer.sh | PreToolUse | `*` | `.claude/hooks/cwc/steer.sh` | L134-137 |
| track-read.sh | PreToolUse | `Read` | `.claude/hooks/cwc/track-read.sh` | L142-148 |
| verify-gate.sh | PreToolUse | `Write\|Edit\|MultiEdit` | `.claude/hooks/cwc/verify-gate.sh` | L151-158 |
| commit-on-stop-throttled.sh | Stop | `*` | `.claude/hooks/scripts/cwc/commit-on-stop-throttled.sh` | L251-254 |

5/5 cwc hooks ARE WIRED. Plus 6th wrapper (commit-on-stop-throttled per Wave 101
Ship 2Q to address n=5 cwc-bundled-drift evidence).

### M4 cwc README hook event mapping (TIER-1-DIRECT)

Source: `Z:/claude-sota-installed/.local/cwc/README.md @ HEAD ffd563d6`

Verbatim from README "The quality loop" table:

- Default-FAIL contract → `track-read.sh` + `verify-gate.sh` → `PreToolUse` callback
- Operator controls → `kill-switch.sh` (PreToolUse implied — halts every tool call)
- Operator controls → `steer.sh` (PreToolUse implied — surfaces STEER.md)
- Agent-maintained handoff → `commit-on-stop.sh` → Stop callback (backstop)

CONFIRMS settings.json wiring is CORRECT per upstream design.

### M5 sibling reference

`Z:/claude-sota/.claude/settings.json` has ZERO cwc hook entries. claude-sota-installed
is AHEAD of sibling on this primitive (cwc was direct upstream install at Wave 62 fire 6,
not sibling-derived).

### M6 hook event class verification (TIER-1-DIRECT Anthropic CC docs)

`https://code.claude.com/docs/en/hooks` enumerates events:
- PreToolUse — fires before tool call; `decision: "block"` halts execution
- Stop — fires when Claude finishes responding; `decision: "block"` prevents close

`kill-switch.sh` emits `{"decision":"block","reason":"Kill switch engaged: ..."}`
under PreToolUse — verified verbatim at `.claude/hooks/cwc/kill-switch.sh:9-11`.
Correct event class assignment in settings.json L131.

### M7 AGENT_STOP file mechanic

Per `kill-switch.sh:8`: reads `${AGENT_STOP_FILE:-./AGENT_STOP}` at project root.
Default is `./AGENT_STOP` relative to CWD. Convention: `touch AGENT_STOP` to
engage; `rm AGENT_STOP` to resume.

Probe for existing AGENT_STOP convention in claude-sota-installed:
`find /z/claude-sota-installed -maxdepth 2 -name AGENT_STOP` — returned empty.
NO conflict with existing convention.

---

## Phase 1B disposition (audit+verify, NOT new edit)

### Recommended action

NONE. Settings.json is correctly configured. Cardinal-rule-5 install-priority +
cardinal-rule-8 conformance ALREADY satisfied for cwc 5 hooks at INSTALLED state
per `docs/sota-installed-manifest.md` Section 17 rows L75-80.

### What changed in this fire

Brief's stated assumption was based on stale Wave 122 Agent A archaeology that
captured pre-Wave-75 / pre-Wave-101 state. The actual current state has cwc hooks
WIRED + ACTIVE since Wave 75 (initial ship per Wave 75 commit history) and
Wave 101 Ship 2Q (commit-on-stop-throttled wrapper added).

### If brief INTENT was Phase 2/Phase 3 (cwc evaluator subagent + Default-FAIL contract activation)

That's separate work — `track-read.sh` + `verify-gate.sh` require a
`test-results.json` schema at project root which install-only runtime DOES NOT
HAVE per `docs/sota-installed-manifest.md` L75 INSTALLED-DORMANT note: "DORMANT
until activated — install-only runtime doesn't ship feature-tracking workflows;
activate when project-level test-results.json gating wanted." Phase 2/3 work is
out-of-scope per brief ONE-LOGICAL-UNIT-PER-FIRE per cycle-300.

---

## Risk band assessment per CR-9

| Risk | Status |
|---|---|
| Sibling-bleed | NONE — direct upstream install path; no sibling-bleed defense needed |
| Pre-cite-import REVERT check | N/A — no new install |
| Version pin | PASS — manifest L75-80 cite all hooks at HEAD `ffd563d668a97a38d4aa092bf0d5b1507c046629` |
| 2-round fix-forward budget | NOT TRIGGERED — no edit proposed |
| @latest acknowledgment | N/A |

**Overall risk band**: ZERO (no edit shipped this fire)

---

## Smoke probe instructions (for future Phase 2/3 activation)

For Phase 2/3 activation IF user explicitly requests Default-FAIL workflow:

1. Create `test-results.json` schema at `Z:/claude-sota-installed/test-results.json`:
   `{"feature-1": {"passes": false}}`
2. Adjust `.claude/hooks/cwc/track-read.sh` glob pattern (currently expects screenshots)
3. Probe: `touch AGENT_STOP && claude` — verify kill-switch fires
4. Probe: write `STEER.md` with redirect text → verify steer.sh surfaces + clears
5. Probe Stop hook: explicit session-end → verify commit-on-stop-throttled
   creates checkpoint commit per Wave 101 throttle thresholds (3600s + 50 LOC)

---

## Phase 2/3 forward-refs (NOT shipped this fire)

- **Phase 2**: Default-FAIL contract activation requires `test-results.json` schema
  + glob pattern adjustment in `track-read.sh` per cwc README "Before relying on
  them: point RESULTS_FILE at your project's actual results file"
- **Phase 3**: Fresh-context evaluator subagent activation — `evaluator.md` already
  present at `.claude/agents/cwc/evaluator.md` per manifest L76 INSTALLED row;
  invocation requires `claude --agent evaluator -p "<review prompt>"` wrapper
  script; NOT integrated with claude-sota-installed `/loop` workflow yet

---

## SRA D1-D10 convergence verdict

**D1 cite-trail**: PASS — TIER-1-DIRECT @ `cwc-long-running-agents @ HEAD ffd563d6`
+ Anthropic CC hooks docs URL
**D2 axis-1 multi-org**: PASS @ Anthropic OFFICIAL (single-org acceptable per
STRONG-PROVENANCE-EXPRESS predicate per `convergence-gate.md` Axis-3 5-band table —
Anthropic-org-as-named-T2-equivalent maintainership)
**D3 license**: PASS — Apache-2.0
**D4 axis-3 stability**: PASS — cwc shipped 2026-05-06; ~3+ days since Wave 62
fire 6 install + multiple fix-forward rounds (Wave 75 + Wave 101) demonstrate
stability under operator load
**D5 plugin-namespace**: N/A — direct repo cite-import not via plugin marketplace
**D6 Probe DAG (P1-P6)**: PASS — Sections 17 manifest rows L75-80 INSTALLED status
**D7 Mia pre-apply**: TRIGGERED — caught Wave 122 Agent A OVER claim ("settings.json
wire absent") before any speculative new edit
**D8 mode-harness-shape**: PASS — install-only runtime IS the long-running-harness
shape cwc was designed for
**D9 demand-absence vs creates-new-workflow**: PARTIAL — kill-switch + steer +
commit-on-stop-throttled ACTIVE; track-read + verify-gate INSTALLED-DORMANT
awaiting test-results.json workflow demand
**D10 HONEST-NON-FINDING**: TRIGGERED — Phase 1 as briefed = HONEST-NON-FINDING
because the assumed gap (settings.json wire absent) does not exist

**Convergence verdict**: HONEST-NON-FINDING. No new ship needed.

---

## Mia OVER catches (per cardinal-rule-11)

### OVER catch #1: Wave 122 Agent A "settings.json wire absent" claim REFUTED

Agent A claim at `tmp/wave122-agentA-outer-research-deep-dive-2026-05-09.md`
captured pre-Wave-75 state OR misread settings.json. Actual state (verified Mia
2026-05-09): all 5 cwc hooks + 6th throttle wrapper WIRED in settings.json L130-160 +
L251-254 since at least Wave 101 Ship 2Q.

### OVER catch #2: Brief path assumption "settings.json hooks-block edit for kill-switch + commit-on-stop"

Brief assumes new edit needed. REFUTED — 5/5 + 1 wrapper hooks already wired correctly.

### OVER catch #3: Brief assumed install path is `.claude/hooks/scripts/cwc/`

PARTIAL REFUTE — kill-switch + steer + track-read + verify-gate live at
`.claude/hooks/cwc/` (no `/scripts/`); commit-on-stop-throttled lives at
`.claude/hooks/scripts/cwc/`. TWO different paths in current settings.json
wiring (L131-156 vs L253). This is a HOUSEKEEPING drift candidate for separate
fire if path-canonicalization desired (but NOT proposed this fire per
ONE-LOGICAL-UNIT-PER-FIRE).

---

## Recommended ship action

NO COMMIT. This fire = audit-only + Mia OVER documentation.

If user wants Phase 1 progress:
- Acknowledge already-shipped state
- Update Wave 123 plan to skip "Phase 1 cwc activation" item
- Move to Wave 123 next item (e.g., addressing path-drift between
  `.claude/hooks/cwc/` and `.claude/hooks/scripts/cwc/` if cleanup desired)

If user wants Phase 2/3 activation:
- Open separate fire with `test-results.json` schema design + glob pattern
  adjustment for track-read.sh

---

## Cite trail

- TIER-1-DIRECT: `Z:/claude-sota-installed/.local/cwc/README.md @ HEAD ffd563d6`
- TIER-1-DIRECT: `Z:/claude-sota-installed/.local/cwc/claude-code-config/.claude/hooks/kill-switch.sh:1-11 @ HEAD ffd563d6`
- TIER-1-DIRECT: `Z:/claude-sota-installed/.claude/hooks/scripts/cwc/commit-on-stop-throttled.sh:1-50 @ Wave 101 Ship 2Q`
- TIER-1-DIRECT: `Z:/claude-sota-installed/.claude/settings.json:130-160,251-254` (live wiring)
- TIER-1-DIRECT: Anthropic CC hooks docs `https://code.claude.com/docs/en/hooks`
- TIER-2: `Z:/claude-sota-installed/docs/sota-installed-manifest.md:71-86` Section 17 rows
- TIER-3-LOCAL: Wave 122 Agent A archaeology at `tmp/wave122-agentA-outer-research-deep-dive-2026-05-09.md` (REFUTED for cwc-wire claim per Mia probe)

---

DESIGN-COMPLETE: Phase 1 audit+verify-only; HONEST-NON-FINDING per SRA D10; no settings.json edit shipped this fire; brief assumption REFUTED via Mia probe.
