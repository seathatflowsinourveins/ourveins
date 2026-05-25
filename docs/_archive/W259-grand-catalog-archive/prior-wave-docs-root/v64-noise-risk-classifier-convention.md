# V64 Noise-Risk Classifier — operator convention for advanced-team spawn-time routing

**Status**: ACTIVE (operator-discipline; no runtime hook enforcement yet)
**Origin**: V64-adoption-plan §4 (orchestrator-pivot post Wave 80 Agent B+C FM-17.e failures); ADOPT TOP-4 conf=0.86 verdict
**Cross-model gate**: real GPT-5.5 BRIDGE-MODE via proxy `/v1/chat/completions` (cardinal-rule-3 Phase 1 bootstrap exception)
**Date**: 2026-05-08
**Sister convention**: `docs/v64-child-artifact-lanes-convention.md` (Wave 81 §3 — same fan-out lifecycle, this doc covers spawn-time decision while §3 covers post-spawn artifact contract)

## TIER-1 Cite Anchors (verified by operator pre-write at exact line content)

### Direct cites supporting §4 noise-risk classification

- `Z:/repos/deps/claude-code-best-practice-shan/tips/claude-thariq-tips-16-apr-26.md @ 64fffd53a7c6f8e2e0b1575fdd200b65cda04737` — Subagents & Fresh Context Windows section.
  - L133-135 verbatim: *"Subagents are a form of context management, useful for when you know in advance that a chunk of work will produce a lot of intermediate output you won't need again."*
  - L137 verbatim: *"When Claude spawns a subagent via the Agent tool, that subagent gets its own fresh context window. It can do as much work as it needs to, and then synthesize its results so only the final report comes back to the parent."*
  - L139 verbatim (the mental test): *"will I need this tool output again, or just the conclusion?"*
  - L141 verbatim: *"The exploration noise is garbage-collected when the subagent exits — 20 file reads, 12 greps, 3 dead ends — only the final report returns to the parent context."*
  - L143-148 verbatim (operator-explicit spawn directives): *"While Claude Code will automatically call subagents, you may want to tell it to explicitly do this. For example: 'Spin up a subagent to verify the result of this work based on the following spec file' / 'Spin off a subagent to read through this other codebase and summarize how it implemented the auth flow, then implement it yourself in the same way' / 'Spin off a subagent to write the docs on this feature based on my git changes'"*
  - L167 decision-table verbatim: *"Next step will generate lots of output you'll only need the conclusion from | **Subagent** | Intermediate tool noise stays in the child's context; only the result comes back"*

### Cross-reference cite (from V64-plan §3 sister adoption)

- `Z:/repos/deps/deepagents/libs/deepagents/deepagents/middleware/filesystem.py @ 95f845d29745ece957144d045849f02c667ac711` — anchors the filesystem-offload primitive that pairs with classifier-routed children (§4 + §3 co-design); not direct §4 evidence.

## §1 Four-Class Noise-Risk Classifier (V64-plan §4 step 1 verbatim)

Every advanced-agent-team-spawn decision MUST classify the work into ONE of four labels at brief composition time:

| Class | Definition | Recommended path |
|---|---|---|
| `parent_direct` | Low-noise, low-branch, final edits or direct question answering. The conclusion IS the work; no exploration trail to discard. | Parent context handles directly; NO subagent dispatch. |
| `child_explore` | Broad search/read/probe tasks where parent needs conclusion only. Many file reads, greps, branches that won't matter post-synthesis. | Subagent dispatch via LANE convention (`tmp/v64/waves/<wave>/<agent>/`); only `latest-output.md` returns. |
| `child_adversarial` | Independent critique or red-team work. Parent must NOT be biased by exploration; reviewer needs fresh-context distance. | Subagent dispatch with explicit adversarial brief; cross-model BRIDGE-MODE preferred (real GPT-5.5 via proxy). |
| `child_audit` | Evidence verification against existing artifact lanes (manifest.json + latest-output.md from prior child waves). Read-only by design. | Subagent dispatch with read-only brief; ARTIFACT-INLINE return + cite at file:line + HEAD SHA. |

Classification decision rule (CCBP-tips L139 mental test): *"will I need this tool output again, or just the conclusion?"* — if conclusion-only, prefer `child_*` lane; if intermediate state load-bearing for next-turn synthesis, use `parent_direct`.

## §2 Spawn-Template Enhancement (CLASS slot)

Brief template gains a `CLASS` slot alongside existing TASK / CONTEXT / FILES / CONSTRAINTS / OUTPUT / HANDOFF / TERMINATION / LANE (per Wave 81 §3 + cite-import-AMBER from `Z:/claude-sota/.claude/rules/advanced-agent-team-standing-directive.md`):

```
CLASS: child_explore | child_adversarial | child_audit
  rationale: <one-line — why this class, citing CCBP-tips L139 mental test>
  parent_payload_contract:
    - summary: <bounded char/LOC limit>
    - decision_relevant_findings: <list shape>
    - evidence_paths: <pointers to LANE artifact paths>
    - dead_ends_omitted: true (operator-discipline; child MUST GC its exploration)
    - confidence: 0.0-1.0
  forbidden:
    - raw transcript merge into parent context
    - mid-wave context-bloat dumps (per FM-17.e mitigation)
    - parent re-reading large_tool_results/* unless Layer 7 audit requested
TASK: ...
CONTEXT: ...
FILES: ...
CONSTRAINTS:
  - OUTPUT_BUDGET: <max LOC for latest-output.md>
  - READ-CHUNK-SIZE: ≤500 lines per Read call (operator threshold; FM-17.e mitigation)
  - summarize-then-discard pattern (Read → extract cite → context-evict raw)
LANE:
  wave_id: ...
  agent_id: ...
  artifact_path: tmp/v64/waves/<wave>/<agent>/latest-output.md
  manifest_path: tmp/v64/waves/<wave>/<agent>/manifest.json
HANDOFF: handoff_to: orchestrator | verdict_one_line: <X>
TERMINATION: on_handoff_to: orchestrator | max_turns: N | terminationCondition: ...
```

`parent_direct` work skips this template entirely — no spawn occurs.

## §3 Classification Decision Aids

Operator-side checklist when scoping a fan-out:

1. **Is the answer concrete + bounded?** (e.g., "What's the value at file:line?" / "Apply this 3-line edit")
   → `parent_direct`. Don't spawn.
2. **Will this read 5+ files / grep 10+ patterns / probe multiple repos?**
   → `child_explore`. Spawn with LANE allocation.
3. **Does this need an adversarial second opinion / red-team review of a verdict?**
   → `child_adversarial`. Spawn with explicit "do not be biased by parent's prior conclusions" brief; prefer real GPT-5.5 BRIDGE-MODE.
4. **Does this verify existing claims/artifacts at file:line + HEAD SHA?**
   → `child_audit`. Spawn read-only with cite-trail discipline.

Composite waves (e.g., 3-agent advanced-team) MAY mix classes (typical: 1 explore + 1 adversarial + 1 audit) per the advanced-agent-team-standing-directive shape.

## §4 Layer-1 Admission Predicates (V64-plan §4 step 1-2 derived)

Pre-spawn predicates the orchestrator runs at brief composition time:

```
classify_noise_risk(brief) → {parent_direct, child_explore, child_adversarial, child_audit}

P1: brief specifies ≤3 reads + ≤1 edit + no fan-out                → parent_direct
P2: brief mentions "deep dive", "research beyond", ≥5 axes        → child_explore
P3: brief mentions "adversarial", "critique", "challenge", "red"  → child_adversarial
P4: brief mentions "verify cite", "audit claim", "check at SHA"   → child_audit
P5: brief specifies cross-model gate (BRIDGE-MODE GPT-5.5)        → upgrade to child_adversarial
P6: brief size > 600 LOC OR axes > 5                              → split into N children
```

These predicates are operator-side today; promotion to mechanical hook (e.g., `tools/v64_noise_risk_classifier.py` or a `PreToolUse:Agent` gate) is FORWARD-REF for Wave 82+ if convention sees ≥3 same-arc adoptions.

## §5 Parent-Context Pollution Defense (V64-plan §4 step 3-4)

Forbid raw child transcript merge into parent context. Allowed parent return payload (verbatim from V64-plan §4 step 3):

```json
{
  "agent_id": "...",
  "summary": "...",
  "decision_relevant_findings": [],
  "evidence_paths": [],
  "dead_ends_omitted": true,
  "confidence": 0.0
}
```

Layer 6 garbage collection MUST explicitly discard at child-exit:
- repeated `rg`/grep output once summarized;
- failed search branches;
- exploratory file reads not used in final evidence;
- intermediate reasoning that does not affect the decision.

This pairs with Wave 81 §3 LANE convention: GC happens at child level (per CCBP-tips L141 *"exploration noise is garbage-collected when the subagent exits"*) AND parent ingests only manifest.json + latest-output.md (per Wave 81 §3 step 3).

## §6 Forward-Compatibility With FM-17.e Mitigation

The Wave 80 FM-17.e candidate sub-class (autocompact-thrashing n=2 same-arc) was a **`child_explore`-class failure** — agents tried broad-axis investigation without context discipline. The classifier's `child_explore` predicates MUST mandate the FM-17.e mitigation slot from Wave 81 §3:

- READ-CHUNK-SIZE: ≤500 lines per Read call
- summarize-then-discard pattern
- NO git-clone of whole repos
- Per-axis budget: ≤2K tokens output per axis

`child_adversarial` and `child_audit` classes inherit the same mitigation by default. `parent_direct` is exempt (no fan-out, no chunked read pressure).

## §7 Migration of Existing Spawn Briefs

Forward-only per `Z:/claude-sota/.claude/rules/port-note-discipline.md` §6 anti-pattern "Do NOT rewrite historical commit bodies/snapshots":
- Wave 79/80/81 historical agent dispatches STAY at their current brief shape
- Wave 82+ MUST include `CLASS` slot in brief
- The convention's empirical evidence base grows from Wave 82 onward

## §8 Anti-patterns

- **Skipping CLASS classification at brief time** — agent has no canonical role; orchestrator can't predict noise budget; FM-17.e risk reintroduced
- **Misclassifying `child_explore` as `parent_direct`** — common cause of context-bloat (operator under-estimates exploration cost)
- **Routing `child_adversarial` through Sonnet stand-in instead of BRIDGE-MODE GPT-5.5** — defeats cross-model independence per cardinal-rule-3 + advanced-agent-team-standing-directive invariant #1 (≥2 BRIDGE-MODE)
- **Routing `child_audit` with write tools** — audit class is read-only by definition; write access defeats verification-without-bias
- **Allowing parent to ingest raw `large_tool_results/*`** — breaks deepagents/Continuous-Claude-v3 filesystem-offload primitive (Wave 81 §3 sister concern)
- **Compositing classes without rationale** — every CLASS choice MUST cite the L139 mental-test answer

## §9 Sister-Convention Integration

- `docs/v64-child-artifact-lanes-convention.md` (Wave 81 §3) — handles post-spawn artifact persistence; this doc handles pre-spawn classification. Together they form the V64 child-fan-out lifecycle contract.
- `Z:/claude-sota/.claude/rules/advanced-agent-team-standing-directive.md` (cite-import-AMBER per CLAUDE.md Section 14.5) — invariant #1 ≥2 BRIDGE-MODE GPT-5.5 + invariant #5 ARTIFACT-INLINE per FM-19 + Mia pre-apply on returned prescriptions; this convention's `child_adversarial` class enforces the BRIDGE-MODE invariant
- `Z:/claude-sota/.claude/rules/parallel-agent-wave.md §Cache-Aware Dispatch Pacing` (cite-import-AMBER) — CADP rule 2 max 3 concurrent + rule 5 ≥3 accounts <50% session pre-dispatch fleet probe; this convention SCOPES the rule with class-aware capacity (child_audit is cheaper than child_explore which is cheaper than child_adversarial BRIDGE-MODE)

## §10 Cite Chain (TIER-1 → TIER-3 lattice)

- TIER-1 direct: `Z:/repos/deps/claude-code-best-practice-shan/tips/claude-thariq-tips-16-apr-26.md @ 64fffd53a7c6f8e2e0b1575fdd200b65cda04737:133-148,165-170` (5 verbatim quotes; verified by operator pre-write)
- TIER-1 cross-reference (sister §3 anchor): `Z:/repos/deps/deepagents/libs/deepagents/deepagents/middleware/filesystem.py @ 95f845d29745ece957144d045849f02c667ac711:317-320,333,FILESYSTEM_SYSTEM_PROMPT` (Wave 81 §3 cite chain; not direct §4 evidence)
- TIER-2 (cite-import-AMBER per CLAUDE.md Section 14.5): `Z:/claude-sota/.claude/rules/{advanced-agent-team-standing-directive,parallel-agent-wave,fm17-subagent-fleet-depletion,fm19-readonly-guard-sidestep,codex-t1-fix-forward-pattern,cross-model-consensus,audit-action-loop,port-note-discipline,codification-threshold}.md`
- TIER-3-LOCAL: `tmp/wave-subagent-context-v64-adoption-plan-2026-05-08.md` (V64-adoption-plan ADOPT TOP-4 conf=0.86); `docs/v64-child-artifact-lanes-convention.md` (Wave 81 sister convention); `docs/install-provenance.md` Wave 80 entry (audit trail anchor)

## §11 Update Triggers

Re-evaluate this convention when:
- Wave 82+ produces ≥3 distinct fan-out instances using the new CLASS slot — promote to enforced contract via `tools/v64_noise_risk_classifier.py` or `PreToolUse:Agent` hook
- A 5th class emerges (e.g., `child_compute_intensive` for code-generation work; `child_human_loop` for interactive debugging) — extend table; honor at n=2 same-arc evidence
- FM-17.e candidate sub-class reaches n=3 (Wave 82+) — promote to OWNED-rule per cycle-322 jurisdiction
- Anthropic CC ships native subagent classification primitive (would obviate operator-discipline; flip to native call)
- A 4th distinct classifier surfaces in TIER-1 SOTA (≥4-org Axis-1 firm convergence) — extend predicates
- L139 CCBP-tips mental-test produces ambiguous results in n=2 same-arc instances — refine decision aids
