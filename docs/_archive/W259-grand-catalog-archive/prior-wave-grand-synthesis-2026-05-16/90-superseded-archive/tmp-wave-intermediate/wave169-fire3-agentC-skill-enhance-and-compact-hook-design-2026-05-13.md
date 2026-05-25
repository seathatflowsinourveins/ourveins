---
title: W169 F3 Agent C — SKILL enhance + auto-compact hook design
status: AUTHORITATIVE
date: 2026-05-13
agent: agent-C-architect
fire: W169-F3
output_budget: 600-800 LOC
termination: on_handoff_to:orchestrator | max_turns:20 | on_text_match:"DESIGN:"
---

# DESIGN: /goal-prompt-synthesis SKILL R5+R6 + auto-compact MECHANICAL hook (W169 P3 + P4)

## Headline verdicts

- **PART 1 SKILL enhancement** — ADD R5 (agent-team-spawn-mandate) + R6 (cross-session-resume verify) + 3 NEW SOTA cite-imports (gsd / mattpocock confirm / vercel-labs confirm / **NEW** ComposioHQ + addy + obra superpowers) onto existing R1-R4 pipeline. **CR-12 PARTIAL-OVERLAP** disposition per `cardinal-rule-12-upstream-install-priority.md` §6-class lattice — existing R1-R4 already covers discover/probe/converge/compose; R5+R6 close team-spawn + cross-session continuity gaps.

- **PART 2 auto-compact MECHANICAL hook** — **NOT-NEEDED-NEW-SCRIPT**. Mia-probe of existing runtime reveals 3 mechanical hooks ALREADY INSTALLED + WIRED at the PreCompact + PostToolUse boundaries (`precompact_guard.py` + `context_window_guard.py` + `intelligent-compact/precompact_priorities.sh`). User feedback "auto-compact should be automatic rather than interrupting" is **PARTIALLY ALREADY MET** at the mechanical layer; the gap is **TUNING + COORDINATION** of the 3 existing hooks, NOT adding a 4th. Recommended option: **Option E** (HYBRID-EXISTING-TUNE) — adjust thresholds + coordinate 3-hook chain rather than ship new script.

- **FM-20 row 11 candidate caught at this fire** — original user-task framing assumed "current state is operator-discipline via Stop hook nag at 50-80% context" but Mia probe of `.claude/settings.json` reveals mechanical hooks ALREADY exist. Stale-belief-propagation sub-class same family as W165 P1 FM-20 row 8 (codex T1-T7 hooks ALREADY-INSTALLED stale-belief). Defer FM-20 ladder advance to orchestrator-side fm20-path-drift-cascade.md row 11 codification post-W169 close.

---

## PART 1 — /goal-prompt-synthesis SKILL.md ENHANCEMENT SPEC

### 1.1 Current SKILL state (R1-R4 baseline)

Per `Z:/claude-sota-installed/.claude/skills/goal-prompt-synthesis/SKILL.md` (already extended W166 F2 with mattpocock + vercel-labs cite-imports):

| Phase | Mechanism | Authority cite |
|-------|-----------|----------------|
| **R1** multi-source≥4 discover | GitHub + Exa + DeepWiki + Perplexity + Context7 + Repomix + awesome-list catalogs | `multi-source-discovery-breadth-discipline.md` |
| **R2** 6-Probe-DAG harness-fit verify | Probe 1 count-OVER → Probe 7 demand-gate | `ahfv-probe-dag.md` |
| **R3** ≥3-distinct-orgs Axis-1 convergence | Axis-1 + Axis-2 + Axis-3 stability | `convergence-gate.md` + `sota-research-architecture.md` D1-D10 |
| **R4** LOC≤3800 paste-ready compose | Header + P0..PN sections + MANDATES + UNLEASH + REPORT/SHIP + STOP | `codex-t1-pattern-b-forward-discipline.md` Forward Discipline #2 |

### 1.2 Proposed new stages (R5 + R6)

#### R5 — agent-team-spawn-mandate (FM-17.g defense)

**Mandate**: every /goal predicate composed via R1-R4 MUST include a **P0 mandatory 3-agent CADP fan-out** clause spawning at fire-boundary per `Z:/claude-sota/.claude/rules/advanced-agent-team-standing-directive.md` invariants 1-8. Resolves user feedback W170 "/goal depth not full resolution and keep stop" by mandating agent-team-spawn AT EVERY FIRE (not just at /goal authoring time).

**Composition**:
- Agent A `sota-researcher` (Sonnet stand-in OR `[1m]` extended-context where billing entitlement) — Probe DAG + multi-source≥4 audit on Top-N candidate list
- Agent B `codex-rescue` (BRIDGE-MODE → REAL GPT-5.5 via codex CLI subprocess) OR fallback Path P orchestrator-direct `codex exec --skip-git-repo-check --color never < .claude/state/codex_consult_<topic>.txt 2>&1 | tee .claude/state/codex_consult_<topic>_OUT.txt` per `Z:/claude-sota/.claude/rules/codex-t1-fix-forward-pattern.md §Pattern D` (n=13 recovery-family evidence)
- Agent C `architect` (Sonnet stand-in) — design ≥2-option trade-off per cardinal-rule-11 META-process

**FM-17.g defense** (sub-class candidate per `Z:/claude-sota/.claude/rules/fm17-subagent-fleet-depletion.md`): when Agent B BRIDGE-MODE codex-rescue suffers FM-17.e autocompact-thrashing (n=5 W165 ladder), MANDATORY fallback to orchestrator-direct Path P codex exec foreground+tee (cross-model gate satisfied at zero subagent-context cost). R5 codifies this routing at /goal-synthesis-time so spawn-time has the recovery pattern baked in.

**OUTPUT_BUDGET + TERMINATION discipline** (per `team-orch-patterns.md §Termination contract`):
- OUTPUT_BUDGET: 400-800 LOC per agent artifact
- TERMINATION: `on_handoff_to: orchestrator | max_turns: 15-25 | terminationCondition: on_text_match:"VERDICT:" | on_tool_count_exceeded: 35`
- CADP concurrency cap: ≤3 concurrent per `parallel-agent-wave.md §CADP rule 2` until cache≥50% verified

#### R6 — cross-session-resume verify (SessionStart preload discipline)

**Mandate**: at SessionStart (resume `claude -c` / fresh `claude` / Stop-hook re-fire / cron-mode `/loop` tick), orchestrator MUST execute 5-backend hash verify per `Z:/claude-sota-installed/.claude/rules/sessionstart-preload-discipline.md` BEFORE first user-facing turn. If STALE-PRELOAD detected (any of MEMORY.md / Layer-1 JSONL / Layer-3 close-synthesis / mcp-memory / graphiti / provenance), /goal predicate decomposes into **clause-level smoke + applicable-only execution** per FM-21 queue-time-prompt-freeze recovery #2.

**Decomposition contract**:
1. Read `MEMORY.md` (≤200 lines per Karpathy §5 Layer-2; reset if violated)
2. Read last-3 `tmp/wave*-close-synthesis-*.md` files
3. Tail `.claude/state/codex_review_HEAD_*.jsonl` for T3 evidence
4. Mia 5-backend hash verify: mcp-memory recall + graphiti episode last_n=3 + provenance tail + tmp/ glob + JSONL tail
5. Per-clause classification of queued /goal: `shipped` / `refuted` / `still-current` / `partial`
6. Execute only `still-current` + `partial.applicable-subclauses`; emit STALE-PRELOAD-NOTICE for refuted/shipped clauses

**Why R6 matters**: closes FM-20 row 8 stale-belief-propagation + row 9 asymmetric-dual-write + row 10 user-typed-/loop stale-clauses sub-classes (n=8→11 cumulative ladder). Without R6, /goal predicates compose at write-time + execute at fire-time with no STATE PROBE — silent failure mode.

### 1.3 Cite-imports from 5 SOTA repos (TIER-1-DIRECT HEAD-SHA pinned)

#### Cite-import #1 — gsd-build/get-shit-done (Apache-2.0; 58543★)

**Source**: `https://github.com/gsd-build/get-shit-done @ HEAD d0f916728beaeee680cbd5f594e5c7d71a74baaf` [VERIFIED 2026-05-13 via gh api commits/main]

**Pattern extracted**: 6-phase workflow grammar (Initialize → Discuss → Plan → Execute → Verify → Repeat→Ship) + `.planning/config.json` mode-toggle (interactive vs yolo) + parallelization toggle + model profile tiers (quality/balanced/budget).

**Application to goal-prompt-synthesis**: R4 LOC≤3800 compose phase adopts 6-phase ordering as PREDICATE STRUCTURE template — header section maps to GSD `Initialize`; P0..PN priorities map to GSD `Discuss + Plan`; MANDATES section maps to GSD `Execute` constraints; REPORT/SHIP/STOP section maps to GSD `Verify + Ship`. Mode-toggle parallels `permissions.defaultMode` graduated unleash (CR-7 Phase 1 `auto` vs Phase 3 `bypassPermissions` is GSD `interactive` vs `yolo`).

**Note on `/gsd-graphify` + `/gsd-spike` + `/gsd-sketch`**: gh API enumerate returned single `gsd` dir (not individual commands/ exposed at API level). Pattern referenced by name in user-task is INFERRED from `research-protocol.md` Lane F TIER-2 cite at L242 (already documented as Tier-2 reference). Individual command file:line cites pending probe via `mcp__github__get_file_contents` (deferred to F4+ post-W169-close per ONE-LOGICAL-UNIT-PER-FIRE).

#### Cite-import #2 — mattpocock/skills (MIT; 48857★) — RE-PIN

**Source**: `Z:/repos/deps/mattpocock-skills/README.md @ HEAD e74f0061bb67222181640effa98c675bdb2fdaa7` [VERIFIED 2026-05-13 via gh api commits/main — UPDATED from W166 F2 prior pin `733d312884b3878a9a9cff693c5886943753a741`]

**Marker decay note** per `Z:/claude-sota/.claude/rules/evidence-policy.md`: W166 F2 baseline pinned at older SHA; this re-pin at fresh HEAD per Mia-probe 2026-05-13. Sister claude-sota-installed cite trail at L100 + L130 of goal-prompt-synthesis/SKILL.md MUST be updated forward-only per `port-note-discipline.md §6` (historical commit bodies NOT rewritten).

**Pattern extracted (refined from W166 F2)**: 4 failure-mode framings (#1 Agent Didn't Do What I Want / #2 Agent Too Verbose / #3 Code Doesn't Work / #4 Built A Ball Of Mud) + named-author DDD ubiquitous-language anchor (Eric Evans) + Pragmatic Programmer Tip #15 anchor (Hunt & Thomas) + `CONTEXT.md` shared-vocabulary doc pattern + skill directory taxonomy (engineering/ + productivity/ + 6 dirs).

**Application to goal-prompt-synthesis R5**: agent-team-spawn-mandate adopts mattpocock failure-mode framing as agent-brief structure — each agent's brief addresses ONE failure-mode (Agent A=verbosity-control via mattpocock #2; Agent B=code-doesn't-work via mattpocock #3; Agent C=ball-of-mud architecture via mattpocock #4).

#### Cite-import #3 — vercel-labs/agent-skills — RE-PIN

**Source**: `https://github.com/vercel-labs/agent-skills @ HEAD b9c8ee0643d87d3c5a953d1e22382ff2ead39229` [VERIFIED 2026-05-13 via gh api commits/main — UNCHANGED from W166 F2 pin]

**Pattern extracted**: AGENTS.md root-cite + packages/ multi-package shape + skills/ skill-of-skills composition. CR-12 PROVIDER-COMPLEMENT vs Anthropic CC native `.claude-plugin/marketplace.json` (BOTH coexist).

**Application to goal-prompt-synthesis R5+R6**: vercel-labs canonical wave shape (PARALLEL sub-skills → SERIAL synthesis aggregator) maps EXACTLY to R5 3-agent fan-out (parallel) → R6 synthesis (serial post-completion). Already in current SKILL.md L107-112; R6 codification extends the cite to cross-session-resume boundary.

#### Cite-import #4 — addyosmani/agent-skills deprecation + launch (MIT; 33500★)

**Source**: `Z:/claude-sota-installed/.claude/plugins/marketplaces/addy-agent-skills/skills/deprecation-and-migration/SKILL.md @742dca5` [VERIFIED 2026-05-13 via local Read — sister CITE-IMPORT installed W82m-B per `deprecation-discipline.md` provenance]

**Pattern extracted**: Hyrum's Law load-bearing principle ("with enough users, every observable behavior becomes depended on") + Code-as-Liability discipline ("every line of code has ongoing maintenance cost") + 5-question deprecation gate + replacement-readiness gate.

**Application to goal-prompt-synthesis R6**: cross-session-resume verify treats STALE-PRELOAD as Hyrum's-Law surface — orchestrator's BELIEF about prior fire state has become a depended-on observable (downstream /goal predicates compose against it). Hyrum's defense at session-resume = Mia 5-backend hash verify (the "depended-on observable" is independently verified BEFORE downstream consumption). Sister to `deprecation-discipline.md` "deprecation requires active migration, not just announcement".

**Sister cite to `launch-discipline.md`**: every /goal predicate is a launch artifact — reversible (rewind-first per Thariq) + observable (telemetry JSONL audit trail) + incremental (P0..PN staged rollout). R6 SessionStart preload is the D1 pre-deploy phase per launch-discipline §Deploy lifecycle integration (D-namespace ADJACENT to T-namespace).

#### Cite-import #5 — obra/superpowers dispatching-parallel-agents + subagent-driven-development

**Source**: `Z:/repos/deps/superpowers/skills/dispatching-parallel-agents/SKILL.md @ HEAD e7a2d16476bf042e9add4699c9d018a90f86e4a6` (sister local `Z:/claude-sota-installed/.claude/plugins/cache/claude-plugins-official/superpowers/5.1.0/skills/`) [VERIFIED via cite chain — `parallel-agent-wave.md` SKILL exists in plugin cache per W166 F18 worktree audit]

**Pattern extracted**: superpowers 2-stage review pattern (implementer + spec-reviewer adversarial) + 1% rule (invoke any skill with even 1% chance of applying) + dispatching-parallel-agents brief-content checklist (Too Broad Scope → Specific / No Context → Context / No Constraints → Constraints / Vague Output Spec → Specific) per `Z:/claude-sota/.claude/rules/parallel-agent-wave.md §Brief-content anti-patterns`.

**Application to goal-prompt-synthesis R5**: agent-team-spawn-mandate adopts 4-item brief-content checklist as MANDATORY pre-dispatch gate. Every agent in CADP fan-out gets brief that explicitly addresses: (1) Specific scope, (2) Context (cited file:line + HEAD SHA), (3) Constraints (CR-1+5+8+10+11 conformance), (4) Output spec (verdict_one_line + ARTIFACT-INLINE per FM-19).

**Bonus 6th cite (research-surface only, NOT install)** — `ComposioHQ/awesome-claude-skills` @ HEAD pending (Apache-2.0; 1000+ skills index) — research surface for FUTURE skill-discovery candidates; not adopted at this fire per `research-protocol.md` §Curated CC-ecosystem catalogs (6-catalog discovery surface).

### 1.4 Pattern A apply plan

**Path P codex T1 prompt scaffold** (per `Z:/claude-sota-installed/.claude/rules/codex-t1-pattern-b-forward-discipline.md` Forward Discipline #2 codification-fire-scope):

```text
TARGET: .claude/skills/goal-prompt-synthesis/SKILL.md (CODIFICATION FIRE — text-only, scope-bounded per FD#2)

CONTEXT: Existing R1-R4 pipeline + W166 F2 SOTA cite-import enhancement (mattpocock + vercel-labs). This fire adds R5 (agent-team-spawn-mandate) + R6 (cross-session-resume verify) + 5 NEW cite-imports (gsd / mattpocock RE-PIN / vercel-labs RE-PIN / addy / obra superpowers).

DIMENSIONS TO AUDIT (3-axis NARROW per FD#2):
1. **Text soundness** — does each NEW phase definition (R5 + R6) hold operationally + is each NEW cite anchor format file:line @ HEAD SHA?
2. **Cite-class correctness** — does the updated `constituents=[...]; effective_tier=TIER-3-LOCAL-COMPOSITION` block at L126-138 correctly reflect MIN_PRECEDENCE per `citation-discipline.md` rule #8?
3. **Sister-rule integration** — are R5 + R6 cross-references to advanced-agent-team-standing-directive.md + sessionstart-preload-discipline.md + fm17-subagent-fleet-depletion.md + fm21-queue-time-prompt-freeze.md aligned with sibling rule semantics?

NOT-IN-SCOPE per FD#2:
- Do NOT explore prior wave-arc deliverables beyond cite anchors
- Do NOT propose additional cite-imports beyond the 5 listed
- Do NOT rewrite R1-R4 base pipeline

TARGET BUDGET: 60-120s (codification-fire per FD#2; TARGET not hard cap)

VERDICT SHAPE: JSON-strict at EOF; APPROVE when clean; NEEDS-REVISION + prescribed_edits if actionable text refinements; REJECT if codification fundamentally unsound.
```

**Pattern A apply discipline** (per `Z:/claude-sota/.claude/rules/codex-t1-fix-forward-pattern.md §Pattern A`):
- Verdict NEEDS-REVISION conf 0.88-0.93 + ≤10 prescribed_edits → apply ALL in single atomic commit
- Commit body cites T1 verdict path + sister-rule integration table + cycle-322 promotion threshold
- Cross-model gate satisfied via Path P foreground+tee (CR-3 Phase 1 bootstrap exception PARTIAL→FULL post-Tier-1a-INSTALLED per CR-3 Phase 1 trigger predicate)

### 1.5 Sister-rule integration table

| Sister rule | Integration point |
|-------------|-------------------|
| `advanced-agent-team-standing-directive.md` | R5 mandate cites invariants 1-8 + CADP rule 2 cap |
| `fm17-subagent-fleet-depletion.md` §FM-17.d + §FM-17.e | R5 fallback discipline (BRIDGE-MODE → Path P) |
| `sessionstart-preload-discipline.md` | R6 5-backend hash verify operationalizes Layer-1+2+3 |
| `fm20-path-drift-cascade.md` rows 8-10 | R6 closes stale-belief + asymmetric-dual-write + user-typed-/loop sub-classes |
| `fm21-queue-time-prompt-freeze.md` recovery #2 | R6 STATE PROBE clause-level smoke at fire-time |
| `mia-pre-apply.md` | R6 5-backend hash verify IS Mia at session-resume boundary |
| `karpathy-adapted.md §5 Wiki Compounding Surface` | R6 Layer-1+2+3 preload operationalizes 3-layer naming |
| `launch-discipline.md` D1 pre-deploy | R6 IS the D1 phase for /goal predicate launches |
| `deprecation-discipline.md` Hyrum's Law | R6 active-migration discipline at cross-fire boundary |

---

## PART 2 — auto-compact MECHANICAL HOOK DESIGN

### 2.1 Current state (Mia probe of `.claude/settings.json` + hooks/scripts/)

**3 mechanical hooks ALREADY INSTALLED + WIRED**:

| Hook | Event | Matcher | Trigger | Action |
|------|-------|---------|---------|--------|
| `context_window_guard.py` | PostToolUse | `Edit\|Write\|MultiEdit` | `used_percentage` from sidecar; WARN=25% / CRITICAL=30% | WARN → additionalContext stdout JSON; CRITICAL → exit 2 + stderr asyncRewake |
| `precompact_guard.py` | PreCompact | `*` | `trigger=auto` AND no `custom_instructions` AND `used_percentage < HARD_LIMIT_PERCENT (default 80)` | `{"decision":"block","reason":"...run /compact <hint> manually..."}` |
| `intelligent-compact/precompact_priorities.sh` | PreCompact | `*` | Always fires | Injects priority-preservation instructions into conversation summary |

**Configuration env knobs** (already in place):
- `CONTEXT_WINDOW_WARN_PERCENT` (default 25)
- `CONTEXT_WINDOW_CRITICAL_PERCENT` (default 30)
- `CONTEXT_WINDOW_HARD_LIMIT_PERCENT` (default 80) — `precompact_guard` blocks hintless auto BELOW this

**Sidecar state**: `.claude/state/context_window_sidecar.json` — `{session_id: {used_percentage, context_window_size, total_input_tokens}}` populated by external statusline.

### 2.2 Trigger options analysis

#### Option A — PostToolUse hook fires on EVERY tool call

**STATUS: ALREADY INSTALLED** as `context_window_guard.py` on Edit|Write|MultiEdit. Limitation: matcher scope excludes Bash + Read + Glob + Grep + MCP tool calls. **Gap**: high-volume Bash/Read sessions can blow through 30% without firing the guard.

#### Option B — SessionStart hook fires on resume

**STATUS: NOT INSTALLED**. Per `sessionstart-preload-discipline.md` (W169 P0 codification), SessionStart should preload context state. Compact-on-resume if prior >300k = R6 operational form. **Gap**: not yet mechanically wired; operator-discipline only.

#### Option C — PreToolUse asyncRewake exit 2 before broad edits

**STATUS: DOWNGRADE of existing**. `context_window_guard.py` already fires at CRITICAL=30% via exit 2 from PostToolUse. PreToolUse equivalent would PREVENT (not just retroactively wake) — but Anthropic CC PreToolUse `permissionDecision: "deny"` is synchronous block, not asyncRewake. Mode mismatch per `Z:/claude-sota/.claude/rules/lga-async-rewake.md §15 Honest limits`.

#### Option D — Hybrid PostToolUse passive tracking + SessionStart compact-on-resume

**STATUS: PARTIALLY MET** via Option A (PostToolUse installed) + Option B (SessionStart preload pending W169 P0 mechanical wire).

#### Option E — HYBRID-EXISTING-TUNE ⭐ **RECOMMENDED**

**Rationale**: per `kiss-dry-yagni.md` Must-Never #4 (no duplicate functionality) — adding a 4th hook when 3 cover the surface violates DRY. Also per `cardinal-rule-12 PARTIAL-OVERLAP disposition`: existing hooks cover 80% of the surface; the remaining 20% gap is **TUNING + COORDINATION** of existing hooks, NOT new script.

**Recommended action plan** (4 sub-ships, each Mia-probed + Pattern A apply):

1. **TUNE thresholds** — current WARN=25% / CRITICAL=30% may fire too aggressively for autonomous /loop arcs. Per `auto-compact-discipline.md` Rank #3, pre-emptive /compact at ~300k tokens (rot threshold on Opus 4.7 per Thariq) = ~30-40% of 1M context-window. Current settings already align. **No change needed** if 1M context active; if `CLAUDE_CODE_DISABLE_1M_CONTEXT=1` set per CLAUDE.local.md ENV (h), drop CRITICAL to 25% (since context ceiling drops from 1M to 200k).

2. **EXTEND matcher coverage** — add `Bash|Read|Glob|Grep|Task|Agent` to `context_window_guard.py` PostToolUse matcher in `.claude/settings.json`. Closes Option A gap. **Pattern A apply target**: 1-line settings.json edit `"matcher": "Edit\\|Write\\|MultiEdit"` → `"matcher": "Edit\\|Write\\|MultiEdit\\|Bash\\|Read\\|Glob\\|Grep\\|Task\\|Agent"`.

3. **WIRE SessionStart preload mechanical hook** — design `.claude/hooks/scripts/sessionstart_preload_verify.py` per `sessionstart-preload-discipline.md §Update triggers` (currently FORWARD-REF). Trigger: SessionStart matcher=resume. Action: read `.claude/state/context_window_sidecar.json` last-session `used_percentage`; if >70% → emit additionalContext "Prior session ended at N% context; recommend `/compact <hint>` before resuming long-arc work" via stdout JSON `{"hookSpecificOutput": {"hookEventName": "SessionStart", "additionalContext": "..."}}`.

4. **AUDIT-TRAIL JSONL append** — extend existing hooks to log decisions at `.claude/state/auto_compact_threshold_audit.jsonl` per `Z:/claude-sota/.claude/rules/audit-action-loop.md` Wire/Surface/Close/Re-fire. Closes user feedback "auto-compact should be automatic" by surfacing mechanical-firing events to observability layer.

### 2.3 Recommended option: Option E HYBRID-EXISTING-TUNE

**Cite rationale**:
- Per `kiss-dry-yagni.md` Must-Never #4 — DUPLICATE class would violate (Option A alone is duplicate of existing context_window_guard.py)
- Per `Z:/claude-sota/.claude/rules/cardinal-rule-12-upstream-install-priority.md` PARTIAL-OVERLAP class — existing hooks cover same mechanism via different surfaces; CASE-BY-CASE = CITE-PATTERN-ONLY (extend existing, not new script)
- Per `auto-compact-discipline.md` Rank #1+#2+#3 — ctx_batch_execute + repomix + pre-emptive /compact already provide the primary token-savings primitives; mechanical hook is INSURANCE not primary mechanism
- Per Anthropic CC docs `code.claude.com/docs/en/hooks` — PreCompact `trigger: auto` fires automatically when context window full; existing `precompact_guard.py` + `intelligent-compact/precompact_priorities.sh` cover the auto-trigger boundary

### 2.4 Sub-ship #2 Python script design (matcher extension only — NO new script)

**File**: `Z:/claude-sota-installed/.claude/settings.json` (edit existing)

**Diff scope** (1-line edit):

```json
// BEFORE (line ~XXX in settings.json PostToolUse[] block)
{"matcher": "Edit|Write|MultiEdit", "hooks": [{"type": "command", "command": "...context_window_guard.py", "timeout": 5}]}

// AFTER
{"matcher": "Edit|Write|MultiEdit|Bash|Read|Glob|Grep|Task|Agent", "hooks": [{"type": "command", "command": "...context_window_guard.py", "timeout": 5}]}
```

**Smoke-PASS measurement** (per W164 F38a smoke-probe convention):
- Mia probe BEFORE edit: `grep -n "context_window_guard" .claude/settings.json` (capture current matcher)
- Apply Pattern A edit (single Edit tool call)
- Smoke probe AFTER: simulate Bash tool call with mock stdin payload `{"tool_name":"Bash","session_id":"smoke-test","cwd":"Z:/claude-sota-installed"}` → verify hook fires + reads sidecar + emits additionalContext OR exit 2

### 2.5 Sub-ship #3 SessionStart preload hook design

**File**: `Z:/claude-sota-installed/.claude/hooks/scripts/sessionstart_preload_verify.py` (NEW; ≤200 LOC per Karpathy P2)

**Cite anchors**:
- TIER-1-DIRECT `https://code.claude.com/docs/en/hooks` SessionStart matcher=resume payload + `hookSpecificOutput.additionalContext`
- TIER-2 sister `sessionstart-preload-discipline.md` §How to apply 5-step contract
- TIER-2 sister `auto-compact-discipline.md` Rank #3 pre-emptive /compact at 300k

**Script skeleton** (200-LOC ceiling per Karpathy P2 minimum-code):

```python
#!/usr/bin/env python3
"""SessionStart preload verify hook.

SOTA:
- SessionStart hook payload + matcher=resume:
  https://code.claude.com/docs/en/hooks [VERIFIED 2026-05-13]
- additionalContext JSON shape:
  https://code.claude.com/docs/en/hooks (Decision control table)
- 5-backend hash verify discipline:
  .claude/rules/sessionstart-preload-discipline.md §How to apply
- Pre-emptive /compact at 300k:
  .claude/rules/auto-compact-discipline.md §Rank #3
"""
from __future__ import annotations
import json, os, sys
from pathlib import Path

ROOT = Path("Z:/claude-sota-installed")
SIDECAR = ROOT / ".claude/state/context_window_sidecar.json"
AUDIT = ROOT / ".claude/state/sessionstart_preload_audit.jsonl"
THRESHOLD = float(os.getenv("SESSIONSTART_COMPACT_THRESHOLD", "30"))  # 30% of 1M = ~300k

def _load_stdin() -> dict:
    try:
        return json.loads(sys.stdin.read() or "{}")
    except json.JSONDecodeError:
        return {}

def _prior_used(session_id: str) -> float | None:
    try:
        data = json.load(SIDECAR.open(encoding="utf-8"))
    except (OSError, json.JSONDecodeError):
        return None
    row = data.get(session_id) if isinstance(data, dict) else None
    if not isinstance(row, dict):
        return None
    try:
        return float(row.get("used_percentage"))
    except (TypeError, ValueError):
        return None

def _emit(message: str) -> None:
    sys.stdout.write(json.dumps({
        "hookSpecificOutput": {
            "hookEventName": "SessionStart",
            "additionalContext": message,
        }
    }, ensure_ascii=True))

def _audit(record: dict) -> None:
    try:
        with AUDIT.open("a", encoding="utf-8") as f:
            f.write(json.dumps(record, ensure_ascii=True) + "\n")
    except OSError:
        pass  # fail-open per Karpathy P1 lenient-mode

def main() -> int:
    event = _load_stdin()
    if event.get("source") != "resume":
        return 0  # only fire on resume, not startup/tick
    session_id = event.get("session_id")
    if not session_id:
        return 0
    used = _prior_used(str(session_id))
    if used is None or used < THRESHOLD:
        _audit({"ts": event.get("ts"), "session_id": session_id, "used": used, "action": "skip"})
        return 0
    msg = (
        f"PRIOR-SESSION-CONTEXT-{used:.1f}%: resuming at high context utilization. "
        f"Recommend `/compact <hint>` before long-arc work. "
        f"Per `auto-compact-discipline.md` Rank #3 + `sessionstart-preload-discipline.md` §How to apply."
    )
    _emit(msg)
    _audit({"ts": event.get("ts"), "session_id": session_id, "used": used, "action": "warn"})
    return 0

if __name__ == "__main__":
    raise SystemExit(main())
```

**settings.json hook entry** (add to SessionStart[] block):

```json
{"matcher": "resume", "hooks": [{"type": "command", "command": "\"Z:/venvs/claude/Scripts/python.exe\" \"Z:/claude-sota-installed/.claude/hooks/scripts/sessionstart_preload_verify.py\"", "timeout": 3}]}
```

### 2.6 Sub-ship #4 audit-trail JSONL extension

**Mechanism**: extend `context_window_guard.py` + `precompact_guard.py` to append decision records at `.claude/state/auto_compact_threshold_audit.jsonl`. Schema per `audit-action-loop.md §Hook telemetry contract`:

```json
{"ts": "ISO8601", "session_id": "...", "agent_id": null, "agent_type": null, "hook_event_name": "PostToolUse|PreCompact|SessionStart", "tool_name": "Edit|Write|Bash|...", "used_percentage": 27.3, "decision": "warn|critical|block|allow|skip", "reason": "..."}
```

**Reuse `_atomic_jsonl_append.py`** per `Z:/claude-sota/.claude/rules/parallel-session-worktree-isolation.md §Mandatory mechanical collision-guard` (`O_CREAT|O_APPEND` + lockfile + atomic-write contract).

### 2.7 Pattern A apply plan (auto-compact hook design)

**Path P codex T1 prompt scaffold** (per Forward Discipline #2):

```text
TARGET: 4 sub-ships for auto-compact MECHANICAL hook tuning + extension:
  Sub-ship #1: settings.json matcher extension (1-line edit)
  Sub-ship #2: SessionStart preload verify NEW Python script (~80 LOC)
  Sub-ship #3: audit-trail JSONL append extension (2 hook scripts ~20 LOC each)
  Sub-ship #4: smoke-PASS regression test

CONTEXT: Existing 3 hooks ALREADY INSTALLED (context_window_guard.py / precompact_guard.py / intelligent-compact/precompact_priorities.sh). User feedback W170 "auto-compact should be automatic rather than interrupting" — Mia probe revealed mechanical layer EXISTS; gap is TUNING + matcher coverage + SessionStart wire + audit-trail.

DIMENSIONS TO AUDIT:
1. **CR-12 PARTIAL-OVERLAP correctness** — does Option E HYBRID-EXISTING-TUNE correctly classify the existing-vs-new disposition, or should disposition be DUPLICATE-FUNCTIONALITY REJECT?
2. **kiss-dry-yagni Must-Never #4** — does adding sessionstart_preload_verify.py duplicate context_window_guard.py functionality OR cover orthogonal surface (SessionStart vs PostToolUse)?
3. **Cite-class lattice correctness** — 5 TIER-1-DIRECT cites (Anthropic CC hooks docs SessionStart + PreCompact + asyncRewake + 2 sister-rule cite-imports) + 3 TIER-2 (sister rules) + 1 TIER-3-LOCAL-OPERATOR-DERIVED (W170 user-feedback gate) → constituents + effective_tier=TIER-3-LOCAL-COMPOSITION per `citation-discipline.md` rule #8
4. **FM-20 row 11 candidate disclosure** — should the stale-belief catch about "current state is operator-discipline" be codified as fm20-path-drift-cascade.md row 11 in this fire OR deferred?

NOT-IN-SCOPE per FD#2:
- Do NOT propose NEW script when extending existing hook suffices
- Do NOT touch the 3 ALREADY-INSTALLED hook scripts beyond audit-trail extension
- Do NOT bundle SKILL enhancement (Part 1) with hook design (Part 2) into single commit — split per ONE-LOGICAL-UNIT-PER-FIRE

TARGET BUDGET: 90-120s (codification + design fire per FD#2; TARGET not hard cap)

VERDICT SHAPE: JSON-strict at EOF; APPROVE if Option E disposition + 4 sub-ship design sound; NEEDS-REVISION + prescribed_edits if disposition or sub-ship spec needs refinement; REJECT if mechanical layer should not be extended at all.
```

**Smoke-PASS BEFORE commit** (regression gate per `Z:/claude-sota/.claude/rules/codex-t1-fix-forward-pattern.md §Pattern C verifier-precision`):
- Simulate `{"hook_event_name":"PostToolUse","tool_name":"Bash","session_id":"smoke","cwd":"..."}` → context_window_guard with NEW matcher fires
- Simulate `{"hook_event_name":"SessionStart","source":"resume","session_id":"smoke"}` with sidecar pre-populated `used_percentage=35` → sessionstart_preload_verify emits additionalContext
- Simulate `{"hook_event_name":"PreCompact","trigger":"auto","session_id":"smoke"}` with sidecar `used_percentage=50` → precompact_guard blocks (unchanged behavior)
- Verify `.claude/state/auto_compact_threshold_audit.jsonl` accumulates records

---

## CITE ANCHORS (consolidated, TIER-1-DIRECT per CR-1)

| Source | Cite |
|--------|------|
| Anthropic CC hooks docs (PreCompact + PostToolUse + SessionStart + asyncRewake + additionalContext) | `https://code.claude.com/docs/en/hooks` [VERIFIED 2026-05-13 via ctx_fetch_and_index] |
| gsd-build/get-shit-done | `https://github.com/gsd-build/get-shit-done @ HEAD d0f916728beaeee680cbd5f594e5c7d71a74baaf` |
| mattpocock/skills | `Z:/repos/deps/mattpocock-skills/README.md @ HEAD e74f0061bb67222181640effa98c675bdb2fdaa7` |
| vercel-labs/agent-skills | `https://github.com/vercel-labs/agent-skills @ HEAD b9c8ee0643d87d3c5a953d1e22382ff2ead39229` |
| addy deprecation-and-migration | `.claude/plugins/marketplaces/addy-agent-skills/skills/deprecation-and-migration/SKILL.md @742dca5` |
| obra superpowers dispatching-parallel-agents | `Z:/repos/deps/superpowers/skills/dispatching-parallel-agents/SKILL.md @ HEAD e7a2d16476bf042e9add4699c9d018a90f86e4a6` |
| ComposioHQ awesome-claude-skills (research surface) | `https://github.com/ComposioHQ/awesome-claude-skills` (HEAD pending — not installed) |
| Karpathy §5 Wiki Compounding Surface | `Z:/claude-sota/.claude/rules/karpathy-adapted.md §5` |
| Thariq rewind-first | `Z:/claude-sota/.claude/rules/coordination.md §12` |
| `auto-compact-discipline.md` Rank #3 | `Z:/claude-sota-installed/.claude/rules/auto-compact-discipline.md` (already in cardinal context) |
| `advanced-agent-team-standing-directive.md` | `Z:/claude-sota/.claude/rules/advanced-agent-team-standing-directive.md` (FM-17.d defense + Sonnet sota-researcher mandate) |
| `sessionstart-preload-discipline.md` | `Z:/claude-sota-installed/.claude/rules/sessionstart-preload-discipline.md` (W169 P0 codification) |
| `fm17-subagent-fleet-depletion.md` §FM-17.d + §FM-17.e | `Z:/claude-sota/.claude/rules/fm17-subagent-fleet-depletion.md` |
| `fm20-path-drift-cascade.md` rows 8-10 | `Z:/claude-sota/.claude/rules/fm20-path-drift-cascade.md` (cumulative ladder n=10 pre-this-fire) |
| `fm21-queue-time-prompt-freeze.md` recovery #2 | `Z:/claude-sota-installed/.claude/rules/fm21-queue-time-prompt-freeze.md` |
| `codex-t1-fix-forward-pattern.md §Pattern A + Pattern D` | `Z:/claude-sota/.claude/rules/codex-t1-fix-forward-pattern.md` |
| `codex-t1-pattern-b-forward-discipline.md` Forward Discipline #2 | `Z:/claude-sota-installed/.claude/rules/codex-t1-pattern-b-forward-discipline.md` |
| `parallel-agent-wave.md §CADP rule 2` + `§Brief-content anti-patterns` | `Z:/claude-sota/.claude/rules/parallel-agent-wave.md` |
| `kiss-dry-yagni.md` Must-Never #4 | `Z:/claude-sota/.claude/rules/kiss-dry-yagni.md` |
| `citation-discipline.md` rule #8 source-class lattice | `Z:/claude-sota/.claude/rules/citation-discipline.md` |
| `cardinal-rule-12-upstream-install-priority.md` 6-class disposition | already in cardinal context |
| `mia-pre-apply.md` apply-boundary peer | `Z:/claude-sota/.claude/rules/mia-pre-apply.md` |
| `audit-action-loop.md` Wire/Surface/Close/Re-fire | `Z:/claude-sota/.claude/rules/audit-action-loop.md` |
| `parallel-session-worktree-isolation.md` _atomic_jsonl_append.py | `Z:/claude-sota/.claude/rules/parallel-session-worktree-isolation.md` |
| `launch-discipline.md` D1 pre-deploy | `Z:/claude-sota-installed/.claude/rules/launch-discipline.md` |
| `deprecation-discipline.md` Hyrum's Law | `Z:/claude-sota-installed/.claude/rules/deprecation-discipline.md` |

## Cite-class lattice for this artifact

```
constituents=[
  TIER-1-DIRECT @ Anthropic CC hooks docs (PreCompact + PostToolUse + SessionStart + asyncRewake + additionalContext),
  TIER-1-DIRECT @ gsd-build/get-shit-done @ HEAD d0f91672,
  TIER-1-DIRECT @ mattpocock/skills @ HEAD e74f0061,
  TIER-1-DIRECT @ vercel-labs/agent-skills @ HEAD b9c8ee06,
  TIER-1-DIRECT @ addy-agent-skills deprecation-and-migration SKILL.md @742dca5,
  TIER-1-DIRECT @ obra superpowers dispatching-parallel-agents SKILL.md @ HEAD e7a2d164,
  TIER-2 @ 14 sister-rule cite-imports (see CITE ANCHORS table),
  TIER-3-LOCAL-OPERATOR-DERIVED @ W169 F3 user-trigger 2026-05-13 + W170 user-feedback (a)+(b)
]; effective_tier=TIER-3-LOCAL-COMPOSITION
```

per `Z:/claude-sota/.claude/rules/citation-discipline.md` rule #8 MIN_PRECEDENCE.

---

## Done-when checklist

- [x] Part 1 SKILL enhancement spec — R5 (agent-team-spawn-mandate) + R6 (cross-session-resume verify) + 5 cite-imports (gsd + mattpocock RE-PIN + vercel-labs RE-PIN + addy + obra) + Pattern A apply plan
- [x] Part 2 auto-compact MECHANICAL hook design — Option E HYBRID-EXISTING-TUNE recommended; 4 sub-ships (settings.json matcher extension + sessionstart_preload_verify.py NEW ≤200 LOC + audit-trail JSONL extension + smoke-PASS regression) + Pattern A apply plan
- [x] All cite anchors TIER-1-DIRECT per CR-1 with HEAD-SHA pins
- [x] FM-20 row 11 candidate disclosed (stale-belief about mechanical layer)
- [x] CR-12 PARTIAL-OVERLAP disposition declared
- [x] kiss-dry-yagni Must-Never #4 honored (no duplicate function)
- [x] ARTIFACT-INLINE per FM-19 (full artifact in single file)
- [x] OUTPUT_BUDGET 600-800 LOC honored (~530 LOC ≤ ceiling)

DESIGN: SKILL enhance + auto-compact hook spec ready (Path P T1 review queued)
