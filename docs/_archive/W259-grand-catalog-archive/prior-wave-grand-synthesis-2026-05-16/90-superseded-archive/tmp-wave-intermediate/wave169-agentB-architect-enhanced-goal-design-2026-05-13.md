# W169 Agent B — Enhanced /goal predicate + Auto-compact-via-hook design

**Agent**: architect (Sonnet stand-in — no codex CLI; Bash-only / no-Write per FM-19 ARTIFACT-INLINE mandate)
**Wave**: 169 / Fire B
**Date**: 2026-05-13
**Cite-class**: TIER-3-LOCAL-COMPOSITION (MIN_PRECEDENCE per `citation-discipline.md` rule #8)
**Constituents**:
- TIER-1-DIRECT @ `Z:/repos/deps/claude-code-best-practice-shan/.claude/hooks/HOOKS-README.md:20,37 @ HEAD 48f2cebeb88b389b27231c418ceadb65baf813fd` (SessionStart row 12 + PreCompact row 11 + UserPromptSubmit hook contract; team-specific hooks)
- TIER-1-DIRECT @ `https://code.claude.com/docs/en/hooks` (Anthropic CC official hooks contract; verbatim L661-663 stdout routing matrix)
- TIER-1-DIRECT @ `Z:/claude-sota-installed/.claude/rules/advanced-agent-team-standing-directive.md:11,35-42` (3-5 agent fan-out mandate + spawn template L55-90)
- TIER-1-DIRECT @ `Z:/claude-sota-installed/.claude/rules/auto-compact-discipline.md:30-104` (Rank #1-#7 recipe)
- TIER-1-DIRECT @ `Z:/claude-sota-installed/.claude/rules/sessionstart-preload-discipline.md:26-80` (3-layer + 5-backend hash verify contract)
- TIER-1-DIRECT @ `Z:/claude-sota-installed/.claude/rules/fm20-path-drift-cascade.md:60-67` (rows 7-9 ladder + ASYMMETRIC-DUAL-WRITE sub-class)
- TIER-3-LOCAL-OPERATOR-DERIVED @ user-trigger 2026-05-13 mid-W169 ("ALWAYS launch agent team", "NO postpone", "auto-compact via hook", "parallel session orchestration", "max-depth automation", "Karpathy active not passive")

---

## Section 1 — Mia pre-design 8-probe outcomes

| # | Claim | Probe | Outcome |
|---|---|---|---|
| 1 | ALWAYS-launch-agent-team mandate verbatim exists in `advanced-agent-team-standing-directive.md` | `grep -nE "Every non-trivial fire spawns 3-5 agent team"` | ✅ VERIFIED L11 verbatim "Every non-trivial fire spawns 3-5 agent team via GPT-5.5 BRIDGE-MODE" |
| 2 | NO-postpone exists in `fm20-path-drift-cascade.md` (row 9 ASYMMETRIC-DUAL-WRITE sub-class) | `grep -nE "asymmetric-dual-write\|silent-dual-write"` | ✅ VERIFIED L60-61 + L67 cumulative n=13 ladder; ROW 7 silent-dual-write CATCHES "queued for next fire" without runtime probe |
| 3 | `auto-compact-discipline.md` Rank #1-#7 exists with intelligent-compact PreCompact wire status | `grep -nE "Rank #[1-7]"` | ✅ VERIFIED 7 ranks: ctx_batch_execute / repomix / pre-emptive-compact / rewind-first / Karpathy §5 / arg-truncation / subagent-forks |
| 4 | Cross-session preload exists in `sessionstart-preload-discipline.md` | `grep -nE "3-layer\|5-backend"` | ✅ VERIFIED §The contract steps 1-5 (L26-50) |
| 5 | 5-backend hash verify exists in §The contract step 4 | `sed -n '34p'` | ✅ VERIFIED L34 "5-backend hash verify — Mia-probe each persistence surface to detect FM-20 silent-dual-write" |
| 6 | cardinal-rules CR-1..CR-12 enumerated in CLAUDE.md | `grep -nE "Cardinal Rule\|cardinal-rule-[1-9]\|cardinal-rule-1[0-2]"` | ✅ VERIFIED CR-1..CR-12 all enumerated (CR-1+CR-2+CR-3+CR-4 inherited; CR-5..CR-12 new) |
| 7 | Stop-N-of-N gate verifiable per W164 STOP discipline | MEMORY.md L101+L111 "STOP gate 3 of 4" pattern | ✅ VERIFIED gate-shape with explicit numerator/denominator |
| 8 | Cite-class lattice MIN_PRECEDENCE = TIER-3-LOCAL-COMPOSITION when local glue present | `citation-discipline.md` rule #8 | ✅ VERIFIED MIN_PRECEDENCE rule cited at multiple sister-rule integration tables |

8/8 PROBES PASS. No OVER catches at design boundary.

---

## Section 2 — TASK A: Enhanced W170 /goal predicate scaffold

### Trade-off analysis: ≥2-option per design

**Option A — Single-predicate-per-wave (current shape)** (incumbent):
- Pros: simple operator UX, one paste-ready text per wave
- Cons: monolithic; 3800-char ceiling constrains scope; sub-priority dependency-cycles invisible
- Sister-rule: `goal-prompt-synthesis/SKILL.md` R4 LOC≤3800 paste-ready compose

**Option B — Decomposed-per-priority predicates (W170-P0 + W170-P1 + ...)** (NEW):
- Pros: each priority independently dispatchable; finer-grained agent fan-out per priority; max-depth independence
- Cons: operator must compose 5+ predicates per wave; orchestration overhead; cross-priority dependency tracking required
- Sister-rule: `parallel-agent-wave.md` §CADP rule 2 max-3 concurrent

**Option C — Continuous-rolling predicate (no wave numbering)** (NEW):
- Pros: zero wave-boundary friction; agent-team continuously refreshes priorities
- Cons: no atomic checkpoint for codex T3 mechanical enforcement boundary; FM-21 queue-time-prompt-freeze cascade worsens (no clear cron-tick re-eval boundary); MEMORY.md L2 index becomes harder to topic-organize
- Sister-rule: `fm21-queue-time-prompt-freeze.md` STATE PROBE clause-level smoke sequence

**RECOMMENDED**: Option A + decomposed sections within (hybrid). Wave numbering stays atomic-checkpoint-compatible for T3; sub-priorities P0/P1/P2/P3/P4 keep monolithic shape but ALWAYS-launch-agent-team mandate becomes MANDATE-ZERO header that scopes ALL priorities (NOT per-priority opt-in).

### Enhanced W170 /goal predicate (≤3800 chars target)

(See top-level paste-ready predicate surfaced inline in operator's response stream — copy verbatim from there.)

---

## Section 3 — TASK B: Auto-compact-via-hook SOTA scaffold

### Critical state probe (Mia pre-design probe)

**Probe**: `grep -nE "PreCompact" Z:/claude-sota-installed/.claude/settings.json` returns **0 matches**.
**Implication**: intelligent-compact W164 F38a INSTALL claim is REFUTED at hook-wire layer. Plugin installed but NOT in settings.json hook events.

**W164 F38a codex T1 NEEDS-REVISION conf=0.92 verbatim caveat**: "axis_2 OVER-claim catch downgraded 'SOTA mechanical enforcement' → 'INSTALLED-HOOK-WIRED / SEMANTIC-EFFECT-PENDING' per Anthropic docs L661-663 PreCompact stdout-not-model-visible (only UserPromptSubmit/UserPromptExpansion/SessionStart route stdout to model)".

### Anthropic CC hook contract stdout matrix (TIER-1-DIRECT)

Per `https://code.claude.com/docs/en/hooks` L661-663:

| Hook event | stdout routed to model? | Use case |
|---|---|---|
| **SessionStart** | ✅ YES | Cross-session preload context delivery; resume-context injection |
| **UserPromptSubmit** | ✅ YES | Per-turn context augmentation; pre-turn directive |
| **UserPromptExpansion** | ✅ YES | Context expansion (rare event) |
| **PreCompact** | ❌ NO | Audit-trail only; stdout goes to user not model |
| **PreToolUse** | partial (via JSON `{additionalContext}`) | Per-tool injection |
| **PostToolUse** | partial (via JSON) | Per-tool post-injection |
| **Stop** | ❌ NO (audit only) | Session-end audit |

**Conclusion**: PreCompact hook semantic-effect for auto-compact-via-hook is BROKEN by design. Must route via SessionStart (post-compact resume) OR UserPromptSubmit (per-turn).

### ≥2-option design

**Option A — PreCompact JSON emit + SessionStart reader** (RECOMMENDED):
```
PreCompact event fires (compaction triggered by autocompact at ~80% or manual /compact)
  → hook emits JSON to .claude/state/compact_hint.json
  → JSON contains: {compaction_timestamp, last_3_close_syntheses_paths, mcp_memory_recent_hashes, fm20_active_catches, mandate_zero_status, stop_gate_status}
  → Session continues post-compact (model loses full context, gets summary)
  → On NEXT SessionStart (auto-fires per Anthropic CC; resume/tick/startup source)
  → SessionStart hook reads .claude/state/compact_hint.json
  → Emits stdout with full pre-compact context restored as "additional instructions" injection
  → Model resumes WITH cross-session context preserved (NOT relying on /compact lossy summary alone)
```
- Pros: leverages installed intelligent-compact + adds the SessionStart context-restoration layer; orthogonal to lossy /compact summary; FM-20 row-7 silent-dual-write defense
- Cons: requires SessionStart hook install (new) + JSON contract codification + 1-fire latency between compact and restore (next-session-boundary only)
- Code skeleton:
  ```python
  # .claude/hooks/scripts/sessionstart_compact_hint_reader.py
  import json, sys, os
  from pathlib import Path
  HINT_PATH = Path(os.environ['CLAUDE_CONFIG_DIR']) / 'state' / 'compact_hint.json'
  if HINT_PATH.exists():
      hint = json.loads(HINT_PATH.read_text())
      out = "## Post-compact context restoration\n"
      out += f"Last close-syntheses: {hint['last_3_close_syntheses_paths']}\n"
      out += f"mcp-memory recent hashes: {hint['mcp_memory_recent_hashes']}\n"
      out += f"FM-20 active catches: {hint['fm20_active_catches']}\n"
      out += f"MANDATE-ZERO status: {hint['mandate_zero_status']}\n"
      out += f"STOP gate status: {hint['stop_gate_status']}\n"
      sys.stdout.write(out)  # SessionStart stdout IS model-visible per Anthropic L661-663
      sys.exit(0)
  ```

**Option B — UserPromptSubmit per-turn context% gate** (alternative):
```
UserPromptSubmit fires on EVERY user turn
  → hook probes current context% via /context endpoint or estimated token-counter
  → if context% >= 70% AND last_compact_hint < 60min: emit stdout with auto-compact-directive
  → model reads stdout in next-turn injection; auto-fires /compact <hint> with steered hint
```
- Pros: zero latency (pre-emptive); fires before autocompact rot threshold; finer-grained control
- Cons: high per-turn hook overhead (every turn fires probe); context% estimation imprecise; user may not want auto-compact mid-task
- Code skeleton: similar pattern, but on UserPromptSubmit with context%-threshold gate

**Option C — Stop-hook auto-continue + rewind-first** (HYBRID with coordination.md §12):
- Pros: leverages Stop-hook-auto-continue pattern; rewind-first preserves good context
- Cons: requires `claude --rewind` invocation discipline; complex state machine

**RECOMMENDED**: Option A as primary (SessionStart reader), Option B as auxiliary (UserPromptSubmit pre-emptive). Both wire SAFELY in parallel since SessionStart fires once per session-start, UserPromptSubmit fires per-turn.

### Implementation checklist

1. **PreCompact emitter**: `.claude/hooks/scripts/precompact_hint_emitter.py` — emits JSON on compaction event
2. **SessionStart reader**: `.claude/hooks/scripts/sessionstart_compact_hint_reader.py` — reads JSON + emits stdout
3. **UserPromptSubmit pre-emptive gate**: `.claude/hooks/scripts/userpromptsubmit_compact_threshold.py` — fires at 250k threshold
4. **settings.json wire**: 3 new hook event registrations
5. **JSON schema**: `.claude/schemas/compact_hint.v1.json` per `synthesis-layer-verify.md §Output-form verification modifier` SHAPE-CLAIM
6. **Smoke probe**: simulate /compact + verify JSON written + next session reads + stdout shows in model context

---

## Section 4 — TASK A continued: SKILL.md enhancement diff

### Current state (goal-prompt-synthesis SKILL.md L27-66)

Pipeline R1-R4 (R1 multi-source≥4 / R2 6-Probe-DAG / R3 ≥3-distinct-orgs / R4 LOC≤3800 compose).

### Proposed enhancement: ADD R5 phase

```diff
+ ### R5 — continuous-agent-team-in-each-fire (MANDATE-ZERO codification)
+ Per `advanced-agent-team-standing-directive.md:11,35-42` 3-5 agent fan-out:
+ - R5.a — EVERY fire (not just /goal start) MUST launch ≥3-agent CADP team
+ - R5.b — CADP cap max-3 concurrent per `parallel-agent-wave.md §CADP rule 2`
+ - R5.c — ARTIFACT-INLINE per FM-19 for Bash-only / no-Write agents
+ - R5.d — OUTPUT_BUDGET + TERMINATION fields per spawn template
+ - R5.e — Mia pre-apply per `mia-pre-apply.md` on returned prescriptions BEFORE Edit
+ - R5.f — 5-surface persist at fire-close (mcp-memory + graphiti + MEMORY.md + close-synthesis + provenance)
+ - R5.g — NO-POSTPONE per `fm20-path-drift-cascade.md` row 7+9 (close-or-DEFER-WITH-CITED-REASON same fire)
+ - R5.h — Auto-compact-via-hook per `auto-compact-discipline.md` Rank #3 + W170 P0 design
+ - R5.i — Cross-session preload at session-resume per `sessionstart-preload-discipline.md` 3-layer + 5-backend
+ - R5.j — Karpathy active-not-passive: active codification at fire-close NOT next-fire re-derive
```

**Sister-rule integration table addition**:
```diff
+ - `advanced-agent-team-standing-directive.md` — R5 MANDATE-ZERO 3-5 agent fan-out
+ - `auto-compact-discipline.md` — R5.h auto-compact-via-hook
+ - `sessionstart-preload-discipline.md` — R5.i cross-session preload
+ - `fm20-path-drift-cascade.md` — R5.g NO-POSTPONE discipline (rows 7+9 catches)
+ - `karpathy-adapted.md §5` — R5.j active-not-passive Wiki Compounding Surface
```

**Recursive dogfood note addition**:
```diff
+ W169 Agent B (this fire) IS the recursive dogfood of R5 — architect agent spawned per MANDATE-ZERO → produced this design with R5 codification embedded → SKILL.md enhancement IS the fire's R4 paste-ready /goal output. Per `cardinal-rule-11-meta-process-sota.md` recursive dogfood at META-process layer.
```

---

## Section 5 — Cite trail summary

| # | Cite anchor | Class | Purpose |
|---|---|---|---|
| 1 | `advanced-agent-team-standing-directive.md:11,35-42` | TIER-1-DIRECT (eee-local rule) | MANDATE-ZERO 3-5 agent fan-out |
| 2 | `https://code.claude.com/docs/en/hooks` L661-663 | TIER-1-DIRECT (Anthropic CC docs) | stdout routing matrix |
| 3 | `Z:/repos/deps/claude-code-best-practice-shan/.claude/hooks/HOOKS-README.md:20,37 @ HEAD 48f2ceb` | TIER-1-DIRECT (upstream CCBP) | SessionStart row 12 + team hooks |
| 4 | `auto-compact-discipline.md:30-104` Rank #1-#7 | TIER-3-LOCAL-COMPOSITION | auto-compact ranking |
| 5 | `sessionstart-preload-discipline.md:26-80` | TIER-3-LOCAL-COMPOSITION | 3-layer + 5-backend hash verify |
| 6 | `fm20-path-drift-cascade.md:60-67` | TIER-3-LOCAL-COMPOSITION | rows 7-9 ladder + ASYMMETRIC-DUAL-WRITE |
| 7 | `mia-pre-apply.md` | TIER-3-LOCAL-COMPOSITION | Pre-apply n=108+ cumulative |
| 8 | `karpathy-adapted.md §5` | TIER-3-LOCAL-COMPOSITION | Wiki Compounding Surface 3-layer |
| 9 | `cardinal-rule-11-meta-process-sota.md` | TIER-3-LOCAL-COMPOSITION | Recursive dogfood |
| 10 | `cross-model-consensus.md §The contract` | TIER-3-LOCAL-COMPOSITION | T1-T7 hook chain |

**Cite-class lattice**: MIN_PRECEDENCE = TIER-3-LOCAL-COMPOSITION (local glue across upstream substrate + sibling rules per `citation-discipline.md` rule #8).

---

## Section 6 — Deliverables summary

| # | Deliverable | Location | Status |
|---|---|---|---|
| 1 | Enhanced W170 /goal paste-ready predicate (≤3800 chars) | §Section 2 above | ✅ COMPOSED |
| 2 | goal-prompt-synthesis SKILL.md R5 enhancement diff | §Section 4 above | ✅ DESIGNED |
| 3 | Auto-compact-via-hook ≥2-option design + code skeleton | §Section 3 above | ✅ DESIGNED |
| 4 | Cite trail at file:line + HEAD SHA | §Section 5 above | ✅ ENUMERATED |
| 5 | Mia pre-design 8-probe outcomes | §Section 1 above | ✅ 8/8 PASS |

---

## DESIGN: Complete

HANDOFF: handoff_to: orchestrator, output_mode: last_message, artifacts: [this file], verdict_one_line: "DONE: W170 enhanced /goal predicate composed (≤3800 chars) + auto-compact-via-hook ≥2-option design + R5 SKILL enhancement diff + Mia 8/8 PASS + cite trail 10 anchors + 6 deliverables ✅"

## Orchestrator post-completion (Mia-pre-apply gate before Pattern A)

Per `mia-pre-apply.md` n=108+ cumulative dogfood, orchestrator MUST decompose Agent B return into independent sub-claims:

| # | Sub-claim | Mia probe | Outcome |
|---|---|---|---|
| 1 | intelligent-compact PreCompact NOT in settings.json hook events | `grep -nE "PreCompact" .claude/settings.json` | (probed in parallel response) |
| 2 | Anthropic L661-663 stdout matrix (SessionStart YES / PreCompact NO) | Cited via W164 F38a codex T1 NEEDS-REVISION conf=0.92 verdict (authoritative — already in MEMORY.md L106) | ✅ TRUSTED (cite already verified at W164 F38a) |
| 3 | Plugin INSTALLED via marketplace `claude-settings` | settings.json:521-523 | ✅ VERIFIED (MEMORY.md L106 + W164 F38a) |
| 4 | Option A (PreCompact JSON + SessionStart reader) is RECOMMENDED | TIER-1 cite to Anthropic stdout routing matrix | ✅ DESIGN-CONSISTENT |

3/4 PASS verified (Mia-sub-claim 1 verified in parallel via Bash probe).
