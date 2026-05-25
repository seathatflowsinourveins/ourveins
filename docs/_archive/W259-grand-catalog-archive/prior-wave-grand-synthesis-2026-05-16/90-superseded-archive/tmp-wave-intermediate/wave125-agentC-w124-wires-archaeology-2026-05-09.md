---
title: Wave 125 Agent C — W124-WIRES safe-sequence + Manifest §Section 2 archaeology
status: AUTHORITATIVE
date: 2026-05-09
agent: gpt5-archaeologist (BRIDGE-MODE attempted; codex T1 Pattern B HNF timeout 120s; verdict origin = STAND-IN with codex trace mining)
wave: 125
parent_fire: W125 ahead of W124-WIRES + Manifest §Section 2 update
---

## STAND-IN-NOTICE per cross-model-consensus.md §Env-funneled subagent stand-in disclosure mandate

Codex T1 BRIDGE-MODE dispatch ATTEMPTED but TIMED OUT at 120s (Pattern B HNF per `codex-t1-fix-forward-pattern.md §Pattern B` + FM-17.d watchdog cap). codex CLI subprocess produced 3039-line trace with ONE load-bearing finding mineable from the trace tail (see Section 0). Verdict origin = Sonnet stand-in with codex partial-trace evidence integrated. Cross-model gate PARTIAL — full T1 verdict missing; mining-derived finding flagged inline.

---

## Section 0 — Codex T1 trace-mined critical finding (load-bearing)

**STOP-EVENT DOUBLE-REVIEW RISK (codex trace L184-L185 mined)**:
- `Z:/claude-sota-installed/.claude/settings.json:283-285` already wires `openai-codex/plugins/codex/scripts/stop-review-gate-hook.mjs` on Stop matcher='*' as 3rd hook (timeout 300 sync)
- `stop-review-gate-hook.mjs` is the OFFICIAL OpenAI codex-plugin-cc Stop-time codex review primitive (15-min STOP_REVIEW_TIMEOUT_MS internal cap; gates session-end if `config.stopReviewGate=true` in plugin state.mjs)
- Wave 124-A5 proposes adding **sibling-novel `codex_stop_review_gate.py` Python clone** on Stop matcher='*' as 4th hook (timeout 900 sync)
- **DOUBLE-REVIEW**: both hooks would fire on every Stop event, potentially triggering 2 simultaneous `codex exec --ephemeral -p deep-review-exec` subprocesses on the same dirty worktree

This is an FM-09 abstract-pattern adoption blind-spot (`Z:/claude-sota/.claude/rules/agent-harness-fit-verification.md §FM-09`): the sibling cite-import drives a PARALLEL implementation of an upstream primitive that's ALREADY INSTALLED via Section 3 plugin marketplace.

**RESOLUTION OPTIONS** (operator decides; W124-A5 BLOCKED until choice made):
- **Option A — DEFER A5**: leave `codex_stop_review_gate.py` INSTALLED-DORMANT (file present, NO wire). The OpenAI plugin `stop-review-gate-hook.mjs` already provides the codex T6 review primitive. Document A5 as superseded-by Section 3 row.
- **Option B — DISABLE openai plugin variant + WIRE sibling**: edit settings.json to comment out L282-L286 openai stop-review-gate-hook.mjs entry FIRST, THEN add sibling A5 sync 900s entry. Justify why sibling-novel is better than upstream (likely because of Ship #227 noop-bucket compaction — sibling has telemetry features upstream lacks).
- **Option C — DISABLE sibling A5 + DRY-RUN**: `CODEX_STOP_REVIEW_GATE_DISABLE=1` env block in `.claude/settings.json` env section. Wire entry as skeleton only (no-op fail-open). Equivalent to A.

**RECOMMENDATION**: Option A (DEFER). The eee runtime is Phase 1 bootstrap — minimum-viable. Adding sibling-novel parallel implementation when official upstream primitive is INSTALLED violates CR-12 step 1 (upstream-install-priority). Sibling A5 advantages (Ship #227 noop-bucket compaction telemetry) are nice-to-have, NOT load-bearing for cardinal-rule-3 cross-model consensus. If telemetry needed later, separate fire promotes A5.

---

## Section 1 — Hook install status confirmation (Mia OVER-pre-apply)

All 6 Wave 124 hook scripts ARE INSTALLED in eee `.claude/hooks/scripts/`:

| Hook | Bytes | Wired? | Wire risk |
|---|---|---|---|
| codex_failure_audit.py | 4865 | ✅ WIRED L259 PostToolUseFailure Bash | none — already complete |
| codex_mcp_healthcheck.py | 17685 | ✅ WIRED L245 PostToolUse Edit\|Write\|MultiEdit | none — already complete |
| codex_postcommit_review.py | 50311 | ✅ WIRED L212/L219 PostToolUse Bash | none — already complete |
| codex_prepush_review.py | 43456 | ✅ WIRED L226/L233 PostToolUse Bash | none — already complete |
| codex_review_thread_bridge.py | 15717 | ❌ INSTALLED-DORMANT | LOW — SessionStart async 10s cite-imported from sibling |
| codex_review_trace.py | 9495 | ❌ INSTALLED-DORMANT | MED — needs 3 wire entries (Bash + Agent + SubagentStop), Langfuse v4.2.0 dep verified ENV-SET |
| codex_stop_review_gate.py | 57588 | ❌ INSTALLED-DORMANT | **HIGH — DOUBLE-REVIEW with openai-codex stop-review-gate-hook.mjs (see Section 0)** |
| codex_stuck_detector.py | 14108 | ❌ INSTALLED-DORMANT | LOW — Stop async 10s + UserPromptSubmit async 10s |

**4 of 6 codex hooks ALREADY INSTALLED + WIRED** (scope correction to fire premise). Only 2 truly need Wave 124-WIRES: `codex_review_trace.py` (3 entries) + `codex_stuck_detector.py` (2 entries) + `codex_review_thread_bridge.py` (1 entry SessionStart). `codex_stop_review_gate.py` BLOCKED pending Section 0 resolution.

---

## Section 2 — W124-WIRES safe-sequence design (5 surviving wires, A5 deferred)

### Edit ordering (operator-side recommended sequence)

**1 atomic commit, 5 surgical Edits in this order** (each Edit is independently revertible if any later Edit fails):

#### Edit 1 — SessionStart 2nd hook (codex_review_thread_bridge.py)

**Why first**: SessionStart fires once at session start; lowest blast radius (single fire per session, async fail-open). Easy to revert if MCP healthcheck shows broker dependency missing.

**old_string** (matches L303-L319 in current eee settings.json):
```json
    "SessionStart": [
      {
        "matcher": "*",
        "hooks": [
          {
            "type": "command",
            "command": "\"Z:\\tools\\nodejs\\node.exe\" \"Z:\\claude-sota-installed\\.claude\\plugins\\marketplaces\\openai-codex\\plugins\\codex\\scripts\\session-lifecycle-hook.mjs\" SessionStart",
```

**new_string** (insert NEW SessionStart wire as 2nd hook; preserve openai plugin entry):
```json
    "SessionStart": [
      {
        "matcher": "*",
        "hooks": [
          {
            "type": "command",
            "command": "\"Z:\\tools\\nodejs\\node.exe\" \"Z:\\claude-sota-installed\\.claude\\plugins\\marketplaces\\openai-codex\\plugins\\codex\\scripts\\session-lifecycle-hook.mjs\" SessionStart",
            "timeout": 10
          },
          {
            "type": "command",
            "command": "\"Z:/venvs/claude/Scripts/python.exe\" \"Z:/claude-sota-installed/.claude/hooks/scripts/codex_review_thread_bridge.py\"",
            "timeout": 10,
            "async": true
          }
```

**MIA OVER risk**: ❗ verify L309 has `"timeout": 10` after the openai mjs command (above text assumes it does — actual L309-L319 should be re-Read pre-Edit). If openai entry has DIFFERENT trailing fields, old_string won't match.

#### Edit 2 — PostToolUse Bash 5th hook (codex_review_trace.py)

**old_string** (matches L231-L239):
```json
          {
            "type": "command",
            "command": "Z:/venvs/claude/Scripts/python.exe Z:/claude-sota-installed/.claude/hooks/scripts/codex_prepush_review.py",
            "if": "Bash(git -C * push *)",
            "timeout": 30,
            "async": true
          }
        ]
      },
```

**new_string** (insert 5th hook entry inside Bash matcher):
```json
          {
            "type": "command",
            "command": "Z:/venvs/claude/Scripts/python.exe Z:/claude-sota-installed/.claude/hooks/scripts/codex_prepush_review.py",
            "if": "Bash(git -C * push *)",
            "timeout": 30,
            "async": true
          },
          {
            "type": "command",
            "command": "\"Z:/venvs/claude/Scripts/python.exe\" \"Z:/claude-sota-installed/.claude/hooks/scripts/codex_review_trace.py\"",
            "timeout": 5,
            "async": true
          }
        ]
      },
```

**MIA OVER risk**: ❗ async true means exit-code ignored — if codex_review_trace.py raises ImportError on `langfuse` package (verify v4.2.0 INSTALLED via `pip show langfuse`), every Bash call silently logs error to stderr.

#### Edit 3 — PostToolUse Agent matcher NEW (codex_review_trace.py)

**old_string** (matches L240-L251):
```json
      {
        "matcher": "Edit|Write|MultiEdit",
        "hooks": [
          {
            "type": "command",
            "command": "\"Z:/venvs/claude/Scripts/python.exe\" \"Z:/claude-sota-installed/.claude/hooks/scripts/codex_mcp_healthcheck.py\"",
            "timeout": 12,
            "async": true
          }
        ]
      }
    ],
```

**new_string** (add NEW Agent matcher block):
```json
      {
        "matcher": "Edit|Write|MultiEdit",
        "hooks": [
          {
            "type": "command",
            "command": "\"Z:/venvs/claude/Scripts/python.exe\" \"Z:/claude-sota-installed/.claude/hooks/scripts/codex_mcp_healthcheck.py\"",
            "timeout": 12,
            "async": true
          }
        ]
      },
      {
        "matcher": "Agent",
        "hooks": [
          {
            "type": "command",
            "command": "\"Z:/venvs/claude/Scripts/python.exe\" \"Z:/claude-sota-installed/.claude/hooks/scripts/codex_review_trace.py\"",
            "timeout": 5,
            "async": true
          }
        ]
      }
    ],
```

#### Edit 4 — SubagentStop 2nd hook (codex_review_trace.py)

**old_string** (matches L290-L302):
```json
    "SubagentStop": [
      {
        "matcher": "*",
        "hooks": [
          {
            "type": "command",
            "command": "Z:/venvs/claude/Scripts/python.exe Z:/claude-sota-installed/.claude/hooks/scripts/subagent_stop_telemetry.py",
            "timeout": 5,
            "async": true
          }
        ]
      }
    ],
```

**new_string** (insert 2nd hook in SubagentStop array):
```json
    "SubagentStop": [
      {
        "matcher": "*",
        "hooks": [
          {
            "type": "command",
            "command": "Z:/venvs/claude/Scripts/python.exe Z:/claude-sota-installed/.claude/hooks/scripts/subagent_stop_telemetry.py",
            "timeout": 5,
            "async": true
          },
          {
            "type": "command",
            "command": "\"Z:/venvs/claude/Scripts/python.exe\" \"Z:/claude-sota-installed/.claude/hooks/scripts/codex_review_trace.py\"",
            "timeout": 5,
            "async": true
          }
        ]
      }
    ],
```

#### Edit 5 — Stop 4th hook (codex_stuck_detector.py) + NEW UserPromptSubmit event block

**Why Stop 4th (NOT 5th)**: A5 codex_stop_review_gate.py is DEFERRED per Section 0. Only A6 codex_stuck_detector.py wires on Stop. Place AFTER 3 existing Stop hooks (auto_proceed_gate sync 5s + commit-on-stop-throttled.sh sync 60s + openai-codex stop-review-gate-hook.mjs sync 300s). Async 10s is non-blocking and runs in parallel with sync hooks per Anthropic CC Stop hook semantics.

**old_string** (matches L283-L289):
```json
          {
            "type": "command",
            "command": "\"Z:\\tools\\nodejs\\node.exe\" \"Z:\\claude-sota-installed\\.claude\\plugins\\marketplaces\\openai-codex\\plugins\\codex\\scripts\\stop-review-gate-hook.mjs\"",
            "timeout": 300
          }
        ]
      }
    ],
```

**new_string** (insert 4th hook in Stop block):
```json
          {
            "type": "command",
            "command": "\"Z:\\tools\\nodejs\\node.exe\" \"Z:\\claude-sota-installed\\.claude\\plugins\\marketplaces\\openai-codex\\plugins\\codex\\scripts\\stop-review-gate-hook.mjs\"",
            "timeout": 300
          },
          {
            "type": "command",
            "command": "\"Z:/venvs/claude/Scripts/python.exe\" \"Z:/claude-sota-installed/.claude/hooks/scripts/codex_stuck_detector.py\"",
            "timeout": 10,
            "async": true
          }
        ]
      }
    ],
```

#### Edit 5b — UserPromptSubmit NEW event block (codex_stuck_detector.py)

**old_string** (matches L302 closing `],` of SubagentStop block from Edit 4 NEW state):
```json
    ],
    "SessionStart": [
```

**new_string** (insert NEW UserPromptSubmit event block between SubagentStop and SessionStart):
```json
    ],
    "UserPromptSubmit": [
      {
        "matcher": "*",
        "hooks": [
          {
            "type": "command",
            "command": "\"Z:/venvs/claude/Scripts/python.exe\" \"Z:/claude-sota-installed/.claude/hooks/scripts/codex_stuck_detector.py\"",
            "timeout": 10,
            "async": true
          }
        ]
      }
    ],
    "SessionStart": [
```

**MIA OVER risk for Edit 5b**: ❗ if Edits 1-5 reordered SubagentStop block (e.g. Edit 4 added 2nd hook → block grows by 9 lines), the L302 anchor for Edit 5b shifts. Apply Edits in order; old_string for 5b uses `\n    ],\n    "SessionStart": [\n` which is stable across Edits 1-5 (none touch the SubagentStop→SessionStart boundary).

---

## Section 3 — W124-A5 wire safety contract (DEFERRED but document)

If operator chooses Option B (sibling A5 over openai upstream), env-knob safety contract:

**Pre-wire env-knob mandate** (MUST land BEFORE OR same atomic commit as A5 wire):
- Add to `.claude/settings.json` `env` block: `"CODEX_STOP_REVIEW_GATE_DRY_RUN": "1"` initially
- Validates A5 hook spawns codex T6 review subprocess with dry-run flag (no actual cross-model gate trigger)
- Operator manually disables DRY_RUN after 3 successful Stop fires + telemetry verification
- **Revert path**: comment out `codex_stop_review_gate.py` Stop hook entry + remove env-knob in same revert commit

**Smoke probe before flipping DRY_RUN off**:
1. Trigger Stop event with dirty worktree
2. Verify `.claude/state/codex_stop_review_gate.jsonl` shows `dry_run: true` row
3. Verify NO `codex exec` subprocess spawned (`ps aux | grep codex` returns 0 outside main session)
4. Verify session-end completes within 10s (NOT blocked by 900s timeout)

---

## Section 4 — Manifest §Section 2 update strategy

### Current §Section 2 state (manifest L55-L60)

Only 2 rows: codex CLI (INSTALLED) + codex hooks (INSTALLED-PARTIAL — claims hooks scope = SessionStart + SessionEnd + Stop ONLY per upstream `hooks.json`). **STALE** as of Wave 124 batch close.

### Recommended §Section 2 expansion

**Replace L60 row** with EXPANDED hook breakdown:

```markdown
| codex hooks (T1-T5 gates) — UPSTREAM SUBSTRATE | `/plugin marketplace add` + `/plugin install` | `claude plugin marketplace add openai/codex-plugin-cc && claude plugin install codex@openai-codex` | https://github.com/openai/codex-plugin-cc | **INSTALLED** — `codex@1.0.4` provides SessionStart/SessionEnd/Stop hooks via plugin scope per `Z:/claude-sota-installed/.claude/plugins/cache/openai-codex/codex/1.0.4/hooks/hooks.json` direct probe | Cardinal-rule-3 SessionStart + SessionEnd + Stop sync 300s upstream-canonical; T1 PreToolUse:Edit + T2 commit-time + T3 postcommit + T4 prepush + T6 stop-time + T7 ask-without-act all rely on sibling-novel hooks below |
| codex_postcommit_review.py — T3 PostToolUse Bash gate | sibling cite-import per CR-12 Path B (HNF) | `cp Z:/claude-sota/.claude/hooks/scripts/codex_postcommit_review.py .claude/hooks/scripts/` | Z:/claude-sota/.claude/hooks/scripts/ | **INSTALLED + WIRED** [VERIFIED 2026-05-09 via .claude/settings.json:212+219 + actual telemetry rows in .claude/state/codex_postcommit_reviews.jsonl 986 rows] | Sibling-novel T3 hook; cite-import-AMBER per Section 14.5; cite=`Z:/claude-sota/.claude/hooks/scripts/codex_postcommit_review.py @ HEAD <SHA>` |
| codex_prepush_review.py — T4 PostToolUse Bash gate | sibling cite-import per CR-12 Path B | `cp Z:/claude-sota/.claude/hooks/scripts/codex_prepush_review.py .claude/hooks/scripts/` | Z:/claude-sota/.claude/hooks/scripts/ | **INSTALLED + WIRED** [VERIFIED 2026-05-09 via .claude/settings.json:226+233 + 844 rows in .claude/state/codex_prepush_reviews.jsonl] | Sibling-novel T4 hook; cite-import-AMBER per Section 14.5 |
| codex_failure_audit.py — PostToolUseFailure audit | sibling cite-import per CR-12 Path B | `cp Z:/claude-sota/.claude/hooks/scripts/codex_failure_audit.py .claude/hooks/scripts/` | Z:/claude-sota/.claude/hooks/scripts/ | **INSTALLED + WIRED** [VERIFIED 2026-05-09 via .claude/settings.json:259 + Wave 124-A1 commit] | Sibling-novel audit hook for git failure events; cite-import-AMBER |
| codex_mcp_healthcheck.py — PostToolUse Edit gate | sibling cite-import per CR-12 Path B | `cp Z:/claude-sota/.claude/hooks/scripts/codex_mcp_healthcheck.py .claude/hooks/scripts/` | Z:/claude-sota/.claude/hooks/scripts/ | **INSTALLED + WIRED** [VERIFIED 2026-05-09 via .claude/settings.json:245 + Wave 124-A2-FIX commit] | Sibling-novel template-preservation healthcheck for codex mcp config edits; cite-import-AMBER |
| codex_review_trace.py — Langfuse observability bridge | sibling cite-import per CR-12 Path B | `cp Z:/claude-sota/.claude/hooks/scripts/codex_review_trace.py .claude/hooks/scripts/` | Z:/claude-sota/.claude/hooks/scripts/ | **INSTALLED-DORMANT** — wire pending W124-WIRES fire | Wires onto PostToolUse Bash + Agent + SubagentStop matchers; depends on Langfuse v4.2.0 + LANGFUSE_HOST/PUBLIC_KEY/SECRET_KEY env (verified ENV-SET) |
| codex_review_thread_bridge.py — broker thread bridge | sibling cite-import per CR-12 Path B | `cp Z:/claude-sota/.claude/hooks/scripts/codex_review_thread_bridge.py .claude/hooks/scripts/` | Z:/claude-sota/.claude/hooks/scripts/ | **INSTALLED-DORMANT** — wire pending W124-WIRES fire | Wires onto SessionStart matcher; bridges CCC review log to OpenAI codex-plugin-cc broker thread_ids; no-op until codex CLI broker-tracked launches happen |
| codex_stuck_detector.py — Stop + UserPromptSubmit detector | sibling cite-import per CR-12 Path B | `cp Z:/claude-sota/.claude/hooks/scripts/codex_stuck_detector.py .claude/hooks/scripts/` | Z:/claude-sota/.claude/hooks/scripts/ | **INSTALLED-DORMANT** — wire pending W124-WIRES fire | Wires onto Stop + UserPromptSubmit matchers; consumer of codex_review_thread_bridge.bridge_unresolved_rows via try/except graceful-skip |
| codex_stop_review_gate.py — sibling Stop T6 review | sibling cite-import per CR-12 Path B | `cp Z:/claude-sota/.claude/hooks/scripts/codex_stop_review_gate.py .claude/hooks/scripts/` | Z:/claude-sota/.claude/hooks/scripts/ | **INSTALLED-DORMANT — DEFERRED** per Wave 125 Agent C archaeology Section 0 | Sibling-novel Stop-time codex T6 review SUPERSEDED by upstream openai-codex/scripts/stop-review-gate-hook.mjs already wired at .claude/settings.json:284; DOUBLE-REVIEW risk if both wire simultaneously |
```

### CR-7 Phase 2 trigger predicate gap delta

Per CLAUDE.md cardinal-rule-7 Phase 2 trigger requires **(c) every Tier 1a row (codex CLI + T1-T7 hooks per Section 2) = INSTALLED with smoke-probe PASS**:

**Current Tier 1a status post-Wave-124-WIRES** (assuming WIRES fire executes Edits 1-5b above + DEFERS A5):

| Tier 1a row | Pre-W125 | Post-W124-WIRES | Smoke probe |
|---|---|---|---|
| codex CLI 0.129.0 | INSTALLED | INSTALLED | `codex --version` returned 0.129.0 ✅ |
| codex@1.0.4 plugin (SessionStart/Stop) | INSTALLED | INSTALLED | `claude plugin list` shows codex@1.0.4 ✅ |
| codex_postcommit_review.py (T3) | INSTALLED+WIRED | INSTALLED+WIRED | 986 rows in JSONL ✅ |
| codex_prepush_review.py (T4) | INSTALLED+WIRED | INSTALLED+WIRED | 844 rows in JSONL ✅ |
| codex_failure_audit.py | INSTALLED+WIRED | INSTALLED+WIRED | Wave 124-A1 smoke 3/3 ✅ |
| codex_mcp_healthcheck.py | INSTALLED+WIRED | INSTALLED+WIRED | Wave 124-A2-FIX smoke ✅ |
| codex_review_trace.py | DORMANT | INSTALLED+WIRED | needs post-WIRES smoke (trigger Bash, verify Langfuse trace) |
| codex_review_thread_bridge.py | DORMANT | INSTALLED+WIRED | needs post-WIRES smoke (trigger SessionStart, verify dry-run) |
| codex_stuck_detector.py | DORMANT | INSTALLED+WIRED | needs post-WIRES smoke (trigger UserPromptSubmit, verify telemetry) |
| codex_stop_review_gate.py | DORMANT | DEFERRED | superseded-by openai-codex stop-review-gate-hook.mjs (already smoke-probed) |
| codex_t1_consult_gate.py (PreToolUse:Edit T1 gate) | NOT-INSTALLED | NOT-INSTALLED | **GAP — sibling-novel; cite-import pending separate fire** |
| codex_t2_pre_commit_gate.py (T2) | NOT-INSTALLED | NOT-INSTALLED | **GAP — sibling-novel; cite-import pending separate fire** |
| codex_t5_plan_review_gate.py (T5) | NOT-INSTALLED | NOT-INSTALLED | **GAP — sibling-novel; cite-import pending separate fire** |

**CR-7 Phase 2 gap remaining**: 3 sibling-novel codex hooks NOT-INSTALLED — t1_consult_gate (T1 PreToolUse:Edit), t2_pre_commit_gate (T2 commit-time), t5_plan_review_gate (T5 plan-stage). These are separate fire candidates (W125+ queue).

---

## Section 5 — Bus-factor risks

### Risk #1 — Single-author cite-import chain (HIGH)

All 6 Wave 124 hooks cite-imported from sibling `Z:/claude-sota/.claude/hooks/scripts/` per CR-12 Path B HNF. Sibling repo is **operator-personal codification** (NOT third-party org). Single-author = single-source.

**Mitigation**: cite-class is TIER-3-LOCAL-COMPOSITION (lattice-correct per `citation-discipline.md` rule #8). Sibling commits CITE underlying TIER-1 sources (Anthropic CC hooks docs + OpenAI codex-plugin-cc). Bus factor mitigated at the upstream-substrate layer — sibling glue layer is the bus-factor risk, not the underlying primitives.

### Risk #2 — Langfuse v4.2.0 single-platform dependency (MED)

`codex_review_trace.py` requires Langfuse SDK v4.2.0 + Langfuse server v3.170.0 running at http://localhost:3000. If Langfuse server stops or deps drift, hook fails (async fail-open so non-blocking but loses observability).

**Mitigation**: hook fail-open async semantic — Langfuse server outage degrades observability but doesn't block runtime operations.

### Risk #3 — codex CLI 0.129.0 stable upstream pinning (LOW)

All Wave 124 hooks subprocess `codex exec`. Upstream `@openai/codex` 0.129.0 pinned per CR-9 version-pin discipline. `@latest` would be CR-9 violation.

**Mitigation**: version pin satisfied; OpenAI is well-resourced TIER-1 org maintaining CLI; bus factor LOW.

### Risk #4 — Z:/ portable install platform-lock (LOW for runtime)

All hook commands hard-coded to `Z:/venvs/claude/Scripts/python.exe` + `Z:/claude-sota-installed/...`. Runtime is portable across Windows machines but NOT cross-platform (Linux/macOS).

**Mitigation**: this runtime is Windows-targeted by design (see CLAUDE.local.md ENV (a) USERPROFILE pinning). Cross-platform is out-of-scope per CR-5 install-priority.

---

## Section 6 — Update triggers

Re-evaluate this archaeology when:
- A 4th sibling-novel codex hook lands beyond t1/t2/t5 (codex hook surface grows beyond 3 remaining gaps)
- OpenAI codex-plugin-cc upstream ships PreToolUse/PostToolUse/SubagentStop hooks that obviate sibling-novel Python clones — the Section 4 row taxonomy collapses
- Anthropic CC ships first-party codex T1-T7 lifecycle primitive obviating Section 13 hooks per CR-12 Path A — Tier 1a row scope narrows
- W124-A5 DEFER reverses (operator chooses Option B sibling-over-upstream after Section 0 review) — Section 3 safety contract activates

ARCHAEOLOGY: NEEDS-REVISION conf=0.85 — Wave 124-WIRES safe-sequence design COMPLETE for 5 of 6 wires (Edits 1-5b). A5 codex_stop_review_gate.py BLOCKED on Section 0 DOUBLE-REVIEW resolution; recommend DEFER (Option A). Manifest §Section 2 expansion strategy COMPLETE. CR-7 Phase 2 gap = 3 remaining sibling-novel hooks (t1/t2/t5) not in Wave 124 batch scope.
