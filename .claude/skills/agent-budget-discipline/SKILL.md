---
name: agent-budget-discipline
description: Mid-loop agent budget guards (max-message/token/time termination, and/or composable) per microsoft/agent-framework v1.0 GA MIT (2026-04-03 successor to retired autogen v0.4 — AutoGen+SemanticKernel merger).
---

# agent-budget-discipline — Operator-Curated Pattern Skill

> **Status**: operator-curated path-gated skill (per cardinal-rule-4(b)).
>
> **Origin**: W338 Stream B vendor-fork (2026-05-20) — pattern extracted from `microsoft/autogen` v0.4+ MIT (module `autogen_agentchat.conditions`). Vendor-Δ = 0 (no source code copied; pattern study only per CR-1 trust-tuple compliance).
>
> **W345 P3 SOTA cite-refresh (2026-05-20)**: per W345 Stream B audit, autogen v0.4 was RETIRED into `microsoft/agent-framework` v1.0 GA (MIT, 10.6k★, 2026-04-03; AutoGen+SemanticKernel merger). The 8 termination-condition patterns documented here are conceptually preserved in MAF 1.0 (UNVERIFIED specific MAF module path — needs probe before claiming `Microsoft.AgentFramework.AgentChat.Conditions` is the canonical successor namespace). Pattern semantics remain valid; cite-anchors at §References below retain autogen v0.4 file:line paths as the historical source-of-truth.
>
> **Honest-state**: REFERENCE-ONLY. This skill documents a *design pattern*. autogen itself is NOT installed in this runtime; this skill captures the budget-discipline contract operators implement against their own agent loops.
>
> **Sibling skill differentiation** (W331 axis-1#6 trigger audit, all <50% overlap):
> - `task-close-discipline` — END-OF-WAVE pre-ship gate (close-or-carry). This skill = MID-LOOP iteration cap.
> - `ops-rhythm` — STRATEGIC wave-level dwell escalation (3/5/8 waves). This skill = TACTICAL per-message/per-token cap.
> - `caveman` — output-style token compression. This skill = loop termination, not output compression.

## When to invoke

- Authoring a subagent dispatch whose loop could run forever absent a hard cap
- Composing multiple budget signals (token + message + time) into one termination contract
- Implementing a stateful callable termination condition (the `__call__(new_messages) -> Optional[StopMessage]` shape)
- Designing the `reset()` lifecycle for budget guards that need to fire once per task
- Mitigating W325-A F1 silent-serial-fallback class fragility (unbounded loop is often the root cause)

## When NOT to invoke

- End-of-wave ship gate (TodoWrite close-or-carry) → use `task-close-discipline`
- Multi-wave P0 dwell-threshold escalation → use `ops-rhythm`
- Compressing OUTPUT text to save tokens → use `caveman`
- Pure observability/tracing (no termination logic) → use `langfuse`

## The 8 built-in termination conditions

autogen `autogen_agentchat.conditions` ships 8 termination conditions. Each is a stateful callable:

| Condition | Trigger | Stateful field |
|---|---|---|
| `MaxMessageTermination(max_messages)` | n messages exchanged | counter |
| `TextMentionTermination(text, *, sources=None)` | exact string mention | none |
| `TokenUsageTermination(max_total_token, max_prompt_token, max_completion_token)` | cumulative tokens | running sums |
| `TimeoutTermination(timeout_seconds)` | wall-clock elapsed | start timestamp |
| `HandoffTermination(target)` | handoff message to `target` | none |
| `SourceMatchTermination(sources)` | message from listed source | none |
| `ExternalTermination()` | externally signaled (`.set()`) | flag |
| `StopMessageTermination()` | explicit StopMessage in stream | none |
| `FunctionCallTermination(function_name)` | named function/tool was called | none |

## The 2-method contract

Every termination condition MUST implement:

```python
class TerminationCondition:
    @property
    def terminated(self) -> bool:
        """True once the condition has fired. Read-only state inspection."""
        ...

    async def __call__(self, messages: Sequence[BaseMessage]) -> Optional[StopMessage]:
        """Inspect new messages since last call. Return StopMessage to halt, None to continue.

        REQUIRED to be idempotent if called with empty messages.
        After returning StopMessage, raises TerminatedException on subsequent calls until reset.
        """
        ...

    async def reset(self) -> None:
        """Reset internal state so the condition can be reused on the next task."""
        ...
```

## Composition via `&` / `|` operators

Conditions are composable as boolean predicates. autogen overloads `__and__` (`&`) and `__or__` (`|`):

```python
from autogen_agentchat.conditions import (
    MaxMessageTermination,
    TokenUsageTermination,
    TimeoutTermination,
)

# Fire when ANY of: 50 messages OR 100k tokens OR 10 min elapsed
budget = (
    MaxMessageTermination(50)
    | TokenUsageTermination(max_total_token=100_000)
    | TimeoutTermination(timeout_seconds=600)
)

# Fire ONLY when BOTH: token cap AND a stop-message present
strict = TokenUsageTermination(max_total_token=50_000) & StopMessageTermination()

# Mix:
gate = MaxMessageTermination(20) | (TokenUsageTermination(max_total_token=200_000) & TimeoutTermination(1800))
```

`&` returns an `AndTerminationCondition` that fires only when ALL sub-conditions have fired (and tracks per-child state). `|` returns an `OrTerminationCondition` that fires when ANY sub-condition fires.

## Declarative serialization

Termination conditions implement `dump_component() -> ComponentModel` and `load_component(model)` so a wave-config can persist budget contracts as JSON:

```python
budget_cfg = budget.dump_component()       # ComponentModel (JSON-serializable)
# ... persist to disk / config file ...
restored = TerminationCondition.load_component(budget_cfg)
```

## Worked recipe (Claude Code parallel-dispatch analog)

```python
# Scenario: Stream B subagent dispatched with hard caps

class StreamBBudget:
    def __init__(self):
        self.messages = 0
        self.tokens = 0
        self.start = time.time()
        self._terminated = False

    @property
    def terminated(self) -> bool:
        return self._terminated

    async def __call__(self, new_messages):
        self.messages += len(new_messages)
        for m in new_messages:
            self.tokens += m.usage.prompt_tokens + m.usage.completion_tokens
        # Cap matches W338 BUDGET-HARD: K <=15 messages, M <=120k tokens
        if self.messages > 15 or self.tokens > 120_000 or time.time() - self.start > 600:
            self._terminated = True
            return StopMessage(content=f"Budget exhausted: msg={self.messages} tok={self.tokens}")
        return None

    async def reset(self):
        self.messages = 0
        self.tokens = 0
        self.start = time.time()
        self._terminated = False
```

## Anti-patterns to avoid

1. **Composing budgets without `reset()` between tasks** — stateful counters leak across runs, causing premature termination
2. **Using `|` when you meant `&`** — `|` fires on FIRST signal; `&` requires ALL signals to have fired (subtly different from "fire when all current states match")
3. **Skipping `terminated` check** — a fired condition will raise `TerminatedException` on subsequent calls; always check before invoking
4. **Token counting from streamed responses** — tokens are NOT reliable until response is fully realized; accumulate ONLY from finalized message usage
5. **One termination per agent dispatch** — every Agent/Task tool call SHOULD declare at least one budget guard (max messages, max tokens, OR max wall-clock)

## When to choose which condition

| Need | Primary | Compose with |
|---|---|---|
| Stop runaway loop | `MaxMessageTermination(N)` | `\|` `TokenUsageTermination` |
| Cost cap | `TokenUsageTermination(max_total_token=M)` | `\|` `TimeoutTermination` |
| SLA | `TimeoutTermination(seconds=T)` | `\|` `MaxMessageTermination` |
| Explicit "stop word" | `TextMentionTermination("DONE")` | `\|` budget caps as safety net |
| Operator-canceled | `ExternalTermination()` | always include as escape hatch |
| Hand-off to specialist | `HandoffTermination(target="specialist")` | task-specific |

## BAIL-on-Handoff Pattern (W343 P1 — VoltAgent vendor-extract)

> **Origin**: W343 Stream D TIER-2-CHERRY-FRONTIER 4.4 pattern-extract from `voltagent/voltagent` MIT (`Agent.onHandoffComplete` hook). Vendor-Δ=0 (pattern-study only). Documented ~79% token-save in supervisor/subagent workflows (~2,650 tokens → ~560 tokens per VoltAgent worked example).

### What

Early-termination "bail" hook on a supervisor agent. When a subagent produces a terminal final output (e.g., a JSON report, a fully-formed answer), the supervisor SKIPS its own continued processing and returns the subagent's result directly to the user. Saves the supervisor-round-trip tokens that would otherwise re-process the subagent payload.

### When-to-use

- Supervisor delegates structured-output task (JSON / report / classification) to a specialist subagent
- The subagent's `result` IS the final answer; supervisor would otherwise re-summarize / re-format it
- Subagent emits a sentinel marker (e.g., `"FINAL_OUTPUT"` or terminal JSON schema) detectable without additional LLM round-trip
- Token-budget is constrained (Agent budget cap nearing the `MaxMessageTermination` / `TokenUsageTermination` threshold)

### Claude Code Agent-tool analog

The Anthropic `Agent` tool with `subagent_type` is the canonical handoff. There's no native `onHandoffComplete` callback, but the orchestrator (this Claude session) implements the pattern by:

```text
1. Dispatch: Agent(subagent_type="<plugin>:<agent>", prompt=...)
2. On notification: read agent's final assistant message + 1-paragraph return summary
3. BAIL check:
   - IF return-summary contains sentinel ("FINAL_OUTPUT", "NO-FURTHER-WORK", explicit JSON answer) → emit subagent return verbatim to user, SKIP synthesis paragraph
   - ELSE → normal synthesis + cite path-to-file
4. Token-save: skip the orchestrator's own re-processing turn (~500-2000 tokens depending on payload size)
```

Operator-side discipline: a subagent's RETURN should include a 1-line BAIL marker (e.g., `BAIL-READY: <path>`) when its output IS the operator-facing final answer.

### Anti-pattern this prevents

- Supervisor re-summarizes a 2K-token JSON report the subagent already produced, doubling token cost without information gain (W325-A F1 SEV-1 class of waste).

### Cite-anchors (3-org-distinct)

1. **VoltAgent canonical** — `voltagent/voltagent` MIT: `OnHandoffCompleteHookArgs` interface (`packages/core/src/agent/agent.ts` per deepwiki); `bail(transformedResult?)` AbortController+BailError implementation; documented ~79% token-save example.
2. **LangChain langgraph** — `supervisor.last_message` short-circuit pattern (supervisor returns last subagent message directly when handoff condition met).
3. **Microsoft autogen** — `GroupChatManager.max_turns` → `StopMessage` early-exit (v0.4 `autogen_agentchat.conditions.StopMessageTermination` complements bail-on-content).

## AGT Observability (no kill — max-quality mode)

> **Origin**: W364 Stream C lift (2026-05-21) — pattern from `microsoft/agent-framework` v1.0 GA MIT AGT (Agent Governance / Telemetry; successor to autogen v0.4, already anchored above). Per umbrella spec `docs/superpowers/specs/2026-05-21-sota-parallel-workflow-design.md` §5.2 (lift target) + §2 (max-quality directive).

### The directive: TRACK, never KILL

Everything above (the 8 termination conditions, BUDGET-HARD caps, `MaxMessageTermination` / `TokenUsageTermination` / `TimeoutTermination`) is the **kill-switch design pattern** operators implement in their *own* agent loops. This runtime, by contrast, operates under the umbrella spec **§2 max-quality directive**: budget signals are **observability-only**. NEITHER the soft-info NOR the soft-warn threshold-cross terminates, throttles, downgrades, or otherwise degrades a session. The runtime never trades answer quality for cost. Termination is **operator-manual ONLY**.

### What gets tracked

| Scope | Source | Surfaces |
|---|---|---|
| Per-task | `mcp__ccusage__blocks` (active 5-hour block) | tokens + cost for the current task's block |
| Per-agent | `mcp__ccusage__blocks` + `claude agents --json` session-id correlation | per-bg-session / per-subagent attribution |
| Org-monthly | `mcp__ccusage__monthly` (rolls up `blocks`) | calendar-month spend trajectory vs plan |

`mcp__ccusage__blocks` is the primary probe — it reports the live 5-hour billing block (token + USD burn). Per-agent attribution joins block data to the `claude agents --json` session inventory (W363 R2, v2.1.145). Org-monthly trajectory rolls up via the monthly aggregate.

### The annotation event: `agt.threshold.cross`

When tracked usage crosses a band, emit a **Langfuse OTEL annotation event** (NOT a termination signal) named `agt.threshold.cross`:

```text
event:    agt.threshold.cross
severity: soft-info  | soft-warn
scope:    per-task | per-agent | org-monthly
attrs:    { fraction, threshold_band, tokens, cost_usd, session_id?, wave? }
action:   ANNOTATE-ONLY   # explicitly NOT a stop; loop continues unchanged
```

Two severity bands — both purely informational:

- **`soft-info` (50% of reference budget)** — early-awareness annotation. Logged to Langfuse OTEL; no operator action implied. Surfaces "you are halfway through a typical block."
- **`soft-warn` (100% of reference budget)** — budget-reached annotation. Logged to Langfuse OTEL; the session **continues at full quality**. Surfaces "this task has reached a full reference block — consider whether the operator wants to checkpoint" — but the runtime takes NO automatic action.

The "reference budget" is the W338 BUDGET-HARD figure (≈15-msg / 120k-token / 10-min) used here ONLY as the annotation denominator, NOT as a cap. Crossing 100% does not raise `TerminatedException`, does not return a `StopMessage`, and does not reset the loop.

### Operator-manual stop only

The session is terminated **exclusively** by the operator, via one of:

- **`ao stop [project]`** — Composio AO project-level stop (halts the named project's agent sessions).
- **`claude stop <id>`** — native CC background-session stop (halts a specific `claude --bg` session by id; pairs with `claude agents` to list ids).

No automatic kill path exists in this runtime. The `agt.threshold.cross` annotation is advisory input to the operator's manual decision, nothing more.

### Why this differs from the kill-switch pattern above

| | §36-§163 termination patterns | This section (AGT observability) |
|---|---|---|
| Purpose | Halt runaway loops in operator's OWN code | Tell the operator about THIS runtime's spend |
| On threshold | Return `StopMessage`, raise `TerminatedException` | Emit `agt.threshold.cross`, continue |
| Authority | The condition kills | Only the operator (`ao stop` / `claude stop`) kills |
| Quality trade-off | May cut a task short to enforce cap | NEVER — max-quality directive (§2) |

Both are valid; they answer different questions. Use the termination patterns when *authoring* a bounded agent loop; this AGT observability layer is how *this* runtime treats its own budget — watch, annotate, never auto-kill.

### Cite-anchors (AGT observability)

1. **Microsoft Agent Framework 1.0 GA** — MIT, AGT (Agent Governance / Telemetry) successor to autogen v0.4 `autogen_agentchat.conditions` (already anchored §References below); telemetry-emit-without-terminate semantics.
2. **Langfuse OTEL** — annotation/event span model (`mcp__plugin_logfire`/Langfuse OTEL exporter); events as non-control-flow observability records.
3. **ccusage** — `mcp__ccusage__blocks` / `mcp__ccusage__monthly` 5-hour-block + monthly billing aggregates (token + USD attribution).

## References

- Detailed Python API contract + 3-org cite-anchors: `references/autogen-conditions.md`

## Cite-anchors (W338 verified)

1. `microsoft/autogen` v0.4+ MIT — `python/packages/autogen-agentchat/src/autogen_agentchat/conditions/_terminations.py` (8 built-in conditions implementation)
2. `microsoft/autogen` v0.4+ MIT — `python/packages/autogen-agentchat/src/autogen_agentchat/base/_termination.py` (`TerminationCondition` abstract base, `__call__`/`reset`/`terminated` contract + `__and__`/`__or__` operators)
3. autogen docs `https://microsoft.github.io/autogen/stable/reference/python/autogen_agentchat.conditions.html` (8-condition enumeration + composition operators)
4. autogen docs `https://microsoft.github.io/autogen/stable/user-guide/agentchat-user-guide/termination.html` (worked composition recipes)
5. Anthropic `claude-cookbooks` MIT — `misc/prompt_caching.ipynb` and `patterns/agents/` (Anthropic-canonical cross-org corroboration that loop-budgets are critical primitive in production agent design)

## Pre-flight invariants

When using this pattern in production code:

- Every parallel Agent dispatch MUST declare AT LEAST one budget guard
- Composed conditions MUST be `reset()` between distinct tasks (do not share instance across reset boundaries)
- Token counters MUST be incremented from finalized message usage, NOT streamed deltas
- `ExternalTermination()` SHOULD be in the OR-chain as operator-cancel escape hatch
- W325-A F1 mitigation: this skill's auto-fire on multi-stream dispatch implicitly converts "no budget" into "default 15-msg / 120k-token / 10-min budget" per W338 Stream B BUDGET-HARD pattern
