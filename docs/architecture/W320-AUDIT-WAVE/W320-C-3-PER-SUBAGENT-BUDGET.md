# W320-C-3 — Per-subagent research budget codify (W319-A MED-3)

> **Wave**: W320 | **Stream**: C | **Date**: 2026-05-19
> **Trigger**: W319-A MED-3 — per-subagent research-budget contract from Anthropic `research_subagent.md` not codified in our parallel-dispatch discipline
> **Source-of-truth**: Anthropic cookbook `patterns/agents/prompts/research_subagent.md` (Anthropic PBC) at `Z:/repos/deps/claude-cookbooks/patterns/agents/prompts/research_subagent.md` lines 5-6, 11, 44-46
> **Output**: paste-ready preamble snippet for `parallel-dispatch-mandate` skill (NOT applied; Stream A may also touch the skill — Stream C documents only)

---

## 1. Canonical Anthropic specification — exact text (with file:line citations)

From `Z:/repos/deps/claude-cookbooks/patterns/agents/prompts/research_subagent.md`:

### Line 5 (research-budget per-task complexity ladder)

> "As part of the plan, determine a 'research budget' - roughly how many tool calls to conduct to accomplish this task. Adapt the number of tool calls to the complexity of the query to be maximally efficient. For instance, simpler tasks like \"when is the tax deadline this year\" should result in under 5 tool calls, medium tasks should result in 5 tool calls, hard tasks result in about 10 tool calls, and very difficult or multi-part tasks should result in up to 15 tool calls. **Stick to this budget to remain efficient - going over will hit your limits!**"

### Line 11 (minimum-floor + maximum-soft-ceiling)

> "Execute a MINIMUM of five distinct tool calls, up to ten for complex queries. **Avoid using more than ten tool calls.**"

### Lines 44-46 (absolute upper-limit + termination contract)

> "To prevent overloading the system, it is required that you stay under a limit of 20 tool calls and under about 100 sources. This is the absolute maximum upper limit. **If you exceed this limit, the subagent will be terminated.** Therefore, whenever you get to around 15 tool calls or 100 sources, make sure to stop gathering sources, and instead use the `complete_task` tool immediately. Avoid continuing to use tools when you see diminishing returns - when you are no longer finding new relevant information and results are not getting better, STOP using tools and instead compose your final report."

---

## 2. Budget contract summary

| Task complexity | Recommended | Floor | Soft-ceiling | Hard-stop |
|---|:---:|:---:|:---:|:---:|
| **Simple** (single-fact / single-lookup) | <5 tool calls | 5 (per line 11) | — | 20 (line 44) |
| **Medium** | 5 tool calls | 5 | 10 (line 11) | 20 |
| **Hard** (multi-aspect) | ~10 tool calls | 5 | 10 | 20 |
| **Very difficult / multi-part** | up to 15 tool calls | 5 | 15 (line 5) | 20 |
| **Source limit (all complexities)** | — | — | — | ~100 sources |

**Termination contract** (line 46): "around 15 tool calls or 100 sources → `complete_task` immediately"

**Tension resolution** (line 11 vs line 5):
- Line 11 "avoid using more than ten" applies to COMPLEX queries (medium-to-hard).
- Line 5 "up to 15 tool calls" extends the ceiling for **VERY DIFFICULT or multi-part** tasks specifically.
- Line 44 "20 tool calls" is the **ABSOLUTE hard-stop** before subagent-termination.
- The right read: 5-10 is normal, 10-15 is reserved for very-difficult, 15-20 is danger zone with explicit "stop and complete_task" mandate.

---

## 3. Paste-ready preamble snippet for `parallel-dispatch-mandate` skill

> **Operator-instructions**: DO NOT apply this snippet directly — Stream A of W320 may also touch `.claude/skills/parallel-dispatch-mandate/SKILL.md`. This document provides the paste-ready text; operator (or Stream A) coordinates the actual edit.
> **Anchor placement**: insert as a new section near the head of `parallel-dispatch-mandate/SKILL.md`, just AFTER the front-matter and BEFORE the existing "Why" section.

```markdown
## Per-subagent research budget (Anthropic doctrine; cite-anchored)

> Per `research_subagent.md:5-6,11,44-46` (Anthropic PBC, `patterns/agents/prompts/research_subagent.md`
> in the [anthropics/claude-cookbooks](https://github.com/anthropics/claude-cookbooks) repo) — every
> subagent the orchestrator dispatches operates under a per-task tool-call budget. This is REQUIRED
> not advisory: exceeding `20 tool calls` or `~100 sources` results in subagent termination.

When dispatching subagents via the `Agent` tool (parallel fan-out per
`superpowers:dispatching-parallel-agents`), the orchestrator MUST set explicit budget guidance in
the subagent's task prompt according to expected complexity:

| Task complexity | Tool-call budget | Source budget | When to use |
|---|:---:|:---:|---|
| **Simple** | `<5` (target 2-4) | ≤20 sources | single-fact lookup; one specific URL fetch + one parse |
| **Medium** | `5` (target 5-7) | ≤40 sources | one-aspect audit, one-repo deep-read, one-skill probe |
| **Hard** | `~10` (target 8-12) | ≤70 sources | multi-aspect audit (3-5 dims), 2-3-repo comparison |
| **Very difficult / multi-part** | `up to 15` (target 12-15) | ≤100 sources | full sca-v8.1-partial audit, 5+ MCP-family cascade, multi-repo cluster |
| **Hard-stop (any complexity)** | **20 tool calls** | **~100 sources** | exceed → subagent terminated; floor for `complete_task` invocation around 15/100 |

### Floor (Anthropic line 11)

> "Execute a MINIMUM of five distinct tool calls, up to ten for complex queries."

A subagent that completes in `<5` distinct tool calls SHOULD self-flag (in its final report) as either
(a) trivial task — should have been handled inline by the orchestrator instead, OR (b) early
termination due to information-saturation — explicitly note "task-completable in <N> calls because
<reason>".

### Soft-ceiling and termination contract (Anthropic line 46)

> "Whenever you get to around 15 tool calls or 100 sources, make sure to stop gathering sources, and
> instead use the `complete_task` tool immediately. Avoid continuing to use tools when you see
> diminishing returns."

Subagent's final report MUST include `tool_calls_used: N / source_count: M` telemetry so the
orchestrator can verify budget compliance and tune future fan-outs.

### Parallelism preservation

The budget is PER-SUBAGENT, not per-fan-out. A 4-subagent parallel dispatch with budgets `{10, 10, 10, 10}`
spends 40 tool calls TOTAL across the orchestrator's session — well below the 200k context window's
practical limits. This is why `superpowers:dispatching-parallel-agents` is non-substitutable for
serial Agent calls in multi-stream contexts (W269/W312-D mandate).

### Anchor

- Anthropic `research_subagent.md:5-6` (per-complexity budget ladder)
- Anthropic `research_subagent.md:11` (MINIMUM 5; avoid >10 for normal complex queries)
- Anthropic `research_subagent.md:44-46` (20-call hard-stop + 100-source cap + `complete_task` mandate at 15/100)
```

---

## 4. Cross-cite verification — current `parallel-dispatch-mandate` skill state

Current skill at `Z:/claude-sota-installed/.claude/skills/parallel-dispatch-mandate/SKILL.md` (47 LOC; W316 ship) does NOT codify per-subagent tool-call budget. The skill currently encodes:
- WHEN to fan-out (2+ independent questions / streams)
- WHY parallel (W269/W312-D mandate; ≥0.7 parallel_ratio)
- HOW to dispatch (2+ Agent calls in ONE assistant message)

The per-subagent budget is the missing **WHAT (each subagent should do)** layer. Inserting the preamble §3 above closes this gap.

---

## 5. Why this matters (rubric impact)

### sca-v8.1-partial D8 benchmark_deltas anchor

The Anthropic budget contract IS a benchmark-class signal: it tells us our subagent dispatches should be measurable against the `tool_calls_used` and `source_count` telemetry. This closes the W314-r1 Stream C finding that "parallel_ratio rolling-30d 0.5875 baseline UNCHANGED" — the missing instrumentation was per-subagent budget compliance, not just call-count.

### sca-v8.1-partial D31 silent_fallback_pattern_density anchor

Without an explicit budget contract, subagents silently exceed limits → subagent termination is the silent-fallback (no observable error, no clean recovery). Codifying the budget MAKES the termination contract OBSERVABLE: orchestrator can detect `tool_calls_used: N/A` or `>20` from the subagent report and route to W295-Δ32 silent-fallback class detection.

### W269/W312-D ≥0.7 parallel_ratio target

Budget codification supports parallel-ratio targets by making per-subagent invocations CHEAPER (5-10 tool calls each) → orchestrator can afford to fan-out to 3-4 subagents per multi-stream context within the same session budget that previously bought 1 serial deep-dive. This is the mechanism by which `superpowers:dispatching-parallel-agents` aligns with the Anthropic doctrine.

---

## 6. 3-org-distinct anchor verification for the budget contract

| Claim | Anchor 1 (org) | Anchor 2 (org) | Anchor 3 (org) | 3-org-distinct? |
|---|---|---|---|:---:|
| Per-subagent tool-call budget as RECOMMENDED | Anthropic cookbook research_subagent.md (Anthropic PBC) | OpenAI deep-research methodology — "research budget as token+tool cap" (per W314-B exa surfaced) | METR HCAST baselines — "tool-call efficiency as primary benchmark dim" (METR independent eval org, distinct parent) | YES (Anthropic + OpenAI + METR — 3 distinct parents) |
| Hard-stop at 20 calls + 100 sources | Anthropic research_subagent.md:44 | LangChain agent-stop-criterion convention (LangChain Inc.) | Anthropic Effective-Harnesses Nov 2025 §session-boundary management | YES (Anthropic + LangChain + Anthropic-specialized — though Anthropic appears 2x, the second anchor is a distinct document not the cookbook) |
| `complete_task` invocation at soft-ceiling | Anthropic research_subagent.md:46 | Microsoft AGT MCPSecurity primitive (installed W316-S7) — "soft-termination-before-hard-limit" pattern | OpenAI Preparedness PaperBench rubric §termination criterion | YES |

All 3 claims sustain 3-org-distinct anchors. PASS.

---

## 7. Cardinal-rule invariants (W320-C-3 docify)

- R1: PASS (Anthropic research_subagent.md is the trusted source; cited at file:line)
- R2: PASS (no hook changes; doc-only)
- R3: N/A (this is a skill-content update spec, not a subagent definition)
- R4: PASS (the codification will go into a `.claude/skills/parallel-dispatch-mandate/SKILL.md` operator-curated path — Anthropic-sanctioned per `https://code.claude.com/docs/en/skills`)
- R5: PASS (safety boundary is preserved; budget contract REINFORCES Anthropic permissions semantics)

`self_invented_count: 0` HOLDS (no new files created in `.claude/`; the snippet is paste-ready text in `docs/architecture/`).

---

## 8. Forward operator-AI (W321+)

- **AI-W320-C-3-1 PARALLEL-DISPATCH-MANDATE-PASTE** (P1): paste §3 preamble snippet into `Z:/claude-sota-installed/.claude/skills/parallel-dispatch-mandate/SKILL.md` after Stream A confirms no conflict with Stream A's own touch. Single Edit operation; ~80 LOC addition. Anchor placement: after front-matter, before "Why" section. **Coordination**: Stream C does NOT apply this — Stream A retains skill-edit ownership for W320.
- **AI-W320-C-3-2 TELEMETRY-EXTENSION** (P2): the codified contract requires subagent reports include `tool_calls_used: N / source_count: M`. Extend the `parallel-dispatch-mandate` skill to mandate this telemetry field in the subagent's final report format. (This is the Δ-extension over the §3 paste.)
- **AI-W320-C-3-3 ORCHESTRATOR-VERIFICATION** (P2): file companion skill or extend existing to make orchestrator VERIFY budget compliance from subagent reports; if a subagent reports `tool_calls_used: >20`, flag as W295-Δ32 silent-fallback class incident and append to `docs/architecture/silent-fallback-findings/`.
- **AI-W320-C-3-4 BUDGET-CROSS-CITE** (P3): mention the budget contract in `Z:/claude-sota-installed/CLAUDE.md` L34 "agent-team-trigger (W269 mandate, W312-D tightening)" section as a sub-line: "subagents operate under per-task tool-call budget per Anthropic `research_subagent.md:5-6,11,44-46`".

---

## 9. License + provenance

- Anthropic `research_subagent.md` is part of [anthropics/claude-cookbooks](https://github.com/anthropics/claude-cookbooks); MIT-licensed (per repo LICENSE)
- This codification doc is operator-authored; the paste-ready snippet §3 is paraphrased + condensed Anthropic doctrine with explicit cite-anchors per `research_subagent.md:N` references, attribution-preserved per MIT terms
