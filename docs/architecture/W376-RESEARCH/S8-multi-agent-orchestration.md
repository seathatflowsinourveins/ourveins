# S8 — Multi-Agent Orchestration + Cost Discipline

**Wave**: W376
**Stream**: S8 (research-only)
**Source**:
- Anthropic Multi-Agent Research blog (https://www.anthropic.com/research/built-multi-agent-research-system)
- `anthropics/claude-cookbooks/patterns/agents/orchestrator_workers.ipynb`
- `microsoft/AutoGen` `TokenUsageTermination` + `MaxMessageTermination`
**Status**: DONE

## §1 Anthropic 15× token-burn empirical anchor

**Verbatim quote** (Anthropic Engineering blog, "How we built our multi-agent research system", published 2025-06-13, section "Benefits of a multi-agent system"):

> "There is a downside: in practice, these architectures burn through tokens fast. In our data, agents typically use about 4× more tokens than chat interactions, and multi-agent systems use about 15× more tokens than chats. For economic viability, multi-agent systems require tasks where the value of the task is high enough to pay for the increased performance."

**W376 wave-execution burn estimate**: PHASE A dispatches 8 research subagents in parallel (this is one). PHASE B = 6 codex review rounds. PHASE D = N implementer subagents. Naive estimate using Anthropic's 15× multiplier vs single-agent chat baseline:
- PHASE A: 8 streams × ~15× = 120× chat-baseline token-burn IF unbudgeted.
- PHASE B: 6 codex rounds — codex GPT-5.5 subprocess cost separate from CC token budget.
- PHASE D: each implementer also fork-mode inherits parent transcript (~50-300k carry-over per W325 F4); 5-10 implementers × 15× = 75-150× baseline.
- **Total wave ceiling**: ~250-300× single-agent chat-baseline IF every subagent hits its budget. Per-agent budget caps (§5) convert this from uncontrolled growth to deterministic ≤140k × 15 ≈ 2.1M token spend.

Anthropic explicitly identifies the mitigation: "multi-agent systems excel at valuable tasks that involve heavy parallelization, information that exceeds single context windows, and interfacing with numerous complex tools" — i.e. wave-execution research IS the canonical justified workload.

## §2 Orchestrator-worker pattern

**Cookbook source**: `anthropics/claude-cookbooks` `patterns/agents/orchestrator_workers.ipynb` — the `FlexibleOrchestrator` class. Verified via deepwiki 2026-05-22.

Canonical structure (per cookbook cell-1/2):
1. **Orchestrator**: takes `orchestrator_prompt` + `worker_prompt` at init; on `.process(task, context)` it (a) LLM-calls the orchestrator with the task, (b) parses the XML response into `analysis` + `tasks` list, (c) iterates each task → LLM-calls a worker with `worker_prompt` formatted on task-type+description, (d) appends result to `worker_results`, (e) returns `{analysis, worker_results}` dict.
2. **Workers**: stateless single-turn LLM calls; each gets an objective, output format, tool/source guidance, and clear task boundaries (Anthropic blog §"Teach the orchestrator how to delegate" — "Without detailed task descriptions, agents duplicate work, leave gaps, or fail to find necessary information").
3. **Empty-response guard**: between worker call and result-append, the cookbook embeds the canonical detection pattern (see §8 below).

This pattern is the foundation reference for runtime's `parallel-dispatch-mandate` skill F5 + §"Empty/whitespace-only final_message" handler.

## §3 AutoGen TokenUsageTermination

**File:line cite**: `microsoft/autogen` `python/packages/autogen-agentchat/src/autogen_agentchat/conditions/_terminations.py` lines **235-307** (verified via deepwiki 2026-05-22).

Constructor signature:
```python
class TokenUsageTermination(TerminationCondition, Component[TokenUsageTerminationConfig]):
    def __init__(
        self,
        max_total_token: int | None = None,
        max_prompt_token: int | None = None,
        max_completion_token: int | None = None,
    ) -> None:
        if max_total_token is None and max_prompt_token is None and max_completion_token is None:
            raise ValueError(...)
```

Termination logic checks `_total_token_count >= _max_total_token` OR `_prompt_token_count >= _max_prompt_token` OR `_completion_token_count >= _max_completion_token`. Token accumulation reads `message.models_usage.prompt_tokens` + `.completion_tokens` per message. Emits `StopMessage(content=f"Token usage limit reached, total={self._total_token_count}, ...", source="TokenUsageTermination")`.

**Per-agent budget cap pattern**: this is AutoGen's first-class primitive for the runtime's Δ-PDM-2 directive.

## §4 MaxMessageTermination

**File:line cite**: `microsoft/autogen` `python/packages/autogen-agentchat/src/autogen_agentchat/conditions/_terminations.py` lines **62-104** (verified via deepwiki 2026-05-22).

Constructor signature:
```python
class MaxMessageTermination(TerminationCondition, Component[MaxMessageTerminationConfig]):
    def __init__(self, max_messages: int, include_agent_event: bool = False) -> None:
        self._max_messages = max_messages
        self._message_count = 0
        self._include_agent_event = include_agent_event
```

Terminated when `_message_count >= _max_messages`. Emits `StopMessage(content=f"Maximum number of messages {self._max_messages} reached, ...", source="MaxMessageTermination")`.

**Combinable via `&` / `|` operators** — both classes inherit from `TerminationCondition` which defines `__and__` → `AndTerminationCondition` (all must terminate) and `__or__` → `OrTerminationCondition` (any can terminate). Example from AutoGen wiki:
```python
combined_or  = MaxMessageTermination(10) | TokenUsageTermination(max_total_token=140_000)
combined_and = MaxMessageTermination(10) & TokenUsageTermination(max_total_token=140_000)
```

Matches runtime's Δ-PDM-2 directive: "≤K tool calls AND ≤Mk total tokens" — the `&` semantic exactly.

## §5 Per-agent budget hard-cap (W328 Δ-PDM-2)

**Runtime pattern** (per `parallel-dispatch-mandate/SKILL.md` Δ-PDM-2, codified W328):
```
BUDGET: <=K tool calls AND <=Mk total tokens.
If approaching 70% of either: write partial summary to skeleton + RETURN with STATUS: BUDGET-EXHAUST-PARTIAL.
```
Recommended defaults: Research-heavy K=15/M=140k; Narrow K=8/M=80k; Repomix-heavy K=25/M=200k.

**Alignment verification vs Anthropic + AutoGen**:
- vs Anthropic: 140k ceiling preserves headroom below the ~180k effective-truncation cliff (200k soft cap) — matches Anthropic blog's "subagents facilitate compression by operating in parallel with their own context windows" architectural intent.
- vs AutoGen: runtime's K + M correspond exactly to `MaxMessageTermination(max_messages=K) & TokenUsageTermination(max_total_token=M*1000)` — AutoGen ships the combinable primitives, runtime ships the directive-string equivalent (since CC subagents lack a programmatic Termination API).
- **Gap**: AutoGen counts via `models_usage` field on each message (deterministic); runtime relies on subagent self-monitoring "via approximate counter (response-text length + prior turns)" (heuristic). AutoGen-style deterministic counting requires a CC-runtime feature that does not yet exist; the heuristic + 70%-threshold-early-flush is the SOTA-portable workaround.

## §6 Skeleton-first-write protocol (W328 Δ-PDM-1)

**Runtime pattern** (Δ-PDM-1, codified W328, derived from W321 P3): for any subagent dispatch with ≥5 research tool calls OR a deliverable file path, the dispatch prompt sequence:
1. mkdir output directory
2. `Write` skeleton file with all `§N Section` headers + `TBD` placeholders (≤30 LOC) BEFORE any research tool call
3. Research-and-`Edit` iteratively against the skeleton
4. Return summary referencing the deliverable path

**Comparative analysis**:
- **LangChain/LangGraph**: similar pattern via `StateGraph` with intermediate-state checkpointing at each node — but operates on in-memory state, not filesystem skeleton. Runtime's filesystem-skeleton is a SUPERSET (survives subagent process death; LangGraph in-memory state requires LangGraph's Checkpointer for crash-survival).
- **AutoGen**: no direct equivalent — AutoGen agents typically accumulate to memory + final-message. The `pre-write skeleton` discipline must be enforced via prompt-engineering (matches runtime's approach).
- **Anthropic cookbook `orchestrator_workers.ipynb`**: workers are single-turn LLM calls; no skeleton-first concept — runtime's pattern is an Anthropic-cookbook EXTENSION for the long-running multi-tool-call worker case.

**Empirical rationale**: W320 Stream A research-heavy agent died at 184k tokens with empty `final_message` (silent truncation). Adding "Write skeleton FIRST, then research" turned binary success/fail into graceful degradation — skeleton survives even if mid-research dies.

## §7 Mid-flight retry-with-checkpoint (W328 Δ-PDM-3)

**Runtime pattern** (Δ-PDM-3): distinguishes (a) empty-final-message AFTER completion (handled by F5) from (b) mid-flight `stream_error` / network-cut. For (b): NEVER blindly re-dispatch — inspect partial transcript + skeleton-on-disk, then re-dispatch with explicit:
```
RESUME from checkpoint at: {deliverable_path}
Read partial work; do NOT re-run already-completed tools.
Fill REMAINING gaps only.
```

**LangGraph Checkpointer cite-anchor**:
- `https://langchain-ai.github.io/langgraph/concepts/persistence/` — `Checkpointer` saves state at each super-step; on resume, "successfully completed nodes are not re-executed". This is the canonical durable-execution pattern.
- LangGraph provides `MemorySaver`, `SqliteSaver`, `PostgresSaver` implementations; runtime equivalent is the deliverable-file-on-disk + skeleton-section-status markers (the filesystem IS the checkpoint store).

**Anthropic blog cross-reference** (Production reliability section, verified verbatim):
> "Agents are stateful and errors compound. ... When errors occur, we can't just restart from the beginning: restarts are expensive and frustrating for users. Instead, we built systems that can resume from where the agent was when the errors occurred. ... We combine the adaptability of AI agents built on Claude with deterministic safeguards like retry logic and regular checkpoints."

This is the architectural authority for Δ-PDM-3. Runtime + LangGraph + Anthropic Research feature CONVERGE on resume-from-checkpoint semantics.

## §8 Empty-final-message detection (W325 F5)

**Cookbook canonical cite** (verified via deepwiki 2026-05-22): `anthropics/claude-cookbooks` `patterns/agents/orchestrator_workers.ipynb` cell-2, inside `FlexibleOrchestrator.process()`, after worker LLM call and before result-append:

```python
# Validate worker response - handle empty outputs
if not worker_content or not worker_content.strip():
    print(f"⚠️  Warning: Worker '{task_info['type']}' returned no content")
    worker_content = f"[Error: Worker '{task_info['type']}' failed to generate content]"
```

**Runtime application**: codified in `parallel-dispatch-mandate/SKILL.md` F5 section. Mandatory orchestrator behavior:
1. Strip-and-test the worker `tool_result` text content BEFORE any consumption.
2. If empty/whitespace-only: surface `WARN: empty Agent response from {subagent_type} - possible silent fallback`.
3. Retry once with explicit non-empty directive; escalate on second empty.
4. NEVER silently substitute; NEVER pipeline-fill from absent output.

**Anti-pattern (FORBIDDEN)**:
- `worker.content[0].text` consumed without strip-and-test.
- Inferring worker intent from absence-of-output (silent synthesis).
- Continuing downstream Agent chains with empty upstream as if successful.

## §9 Cite-anchor cluster (≥3-org-distinct)

| # | Org | URL | Anchor |
|---|---|---|---|
| 1 | **Anthropic PBC** | `https://www.anthropic.com/engineering/built-multi-agent-research-system` (pub 2025-06-13) | "multi-agent systems use about 15× more tokens than chats" + "regular checkpoints" + orchestrator-worker architecture diagram |
| 2 | **Anthropic PBC** (cookbooks repo) | `https://github.com/anthropics/claude-cookbooks` `patterns/agents/orchestrator_workers.ipynb` cell-2 | `if not worker_content or not worker_content.strip()` canonical guard inside `FlexibleOrchestrator.process()` |
| 3 | **Microsoft** | `https://github.com/microsoft/autogen` `python/packages/autogen-agentchat/src/autogen_agentchat/conditions/_terminations.py` L235-307 | `TokenUsageTermination(max_total_token, max_prompt_token, max_completion_token)` |
| 4 | **Microsoft** | same file L62-104 | `MaxMessageTermination(max_messages, include_agent_event)` + `&`/`|` combinator semantics |
| 5 | **LangChain AI** | `https://langchain-ai.github.io/langgraph/concepts/persistence/` | `Checkpointer` resume-from-state: "successfully completed nodes are not re-executed" |
| 6 | **Rapid Claw** (independent practitioner) | `https://rapidclaw.dev/blog/multi-agent-orchestration-patterns-2026` | "per-crew rate limits ... fan-out is #1 cause of runaway cost" |
| 7 | **Tian Pan** (independent practitioner) | `https://tianpan.co/blog/2026-04-23-mid-flight-steering-agent-redirect-without-restart` | "correct work survives. You do not unwind seven tool calls because the eighth one was headed somewhere wrong" |

**3-org-distinct floor satisfied**: Anthropic (entries 1+2) + Microsoft (entries 3+4) + LangChain AI (entry 5) = 3 distinct orgs. Entries 6+7 add independent-practitioner ground-truth corroboration.

## §10 Implications for W376 wave execution

Apply §1-§8 to the W376 dispatch topology:

**PHASE A — 8-stream parallel research dispatch (current wave)**:
- §1 burn-estimate: 8 × 15× = 120× single-agent chat-baseline IF unbudgeted. Per-stream budget of K=15/M=140k (§5) caps total at 8 × 140k = 1.12M tokens — DETERMINISTIC SPEND.
- §6 skeleton-first: each stream's dispatch prompt MUST include "skeleton file at <path> created BEFORE research" — confirmed compliant for this dispatch (S8 itself wrote skeleton-first per Δ-PDM-1).
- §8 empty-final-message: parent orchestrator MUST strip-and-test all 8 returned `final_message` blobs; retry-once on empty, escalate on second empty.
- §2 + §3 + §4 combination: PHASE A behaves as `AutoGen.OrTerminationCondition(MaxMessageTermination(15) | TokenUsageTermination(140_000))` per worker — exactly the Δ-PDM-2 directive.

**PHASE B — 6-codex review rounds**:
- §1: codex GPT-5.5 cost is OUT-OF-CC-BAND (subprocess) — not counted in CC token-burn, but billed separately.
- §7 checkpoint-resume: each codex round writes verdict to disk (`docs/architecture/W376-RESEARCH/codex/round-N-verdict.md` or similar). Round N+1 reads round N verdict — natural skeleton-on-disk pattern.
- §8: codex output is structured (VERDICT: APPROVE | BLOCK | REQUEST-CHANGES); empty-output detection trivially via grep-for-VERDICT-line. If absent → BLOCK by default.

**PHASE D — N implementer dispatches**:
- §1 burn-cap: each implementer is the highest-cost subagent class (Edit-heavy + multi-file). Recommend K=20-25/M=180k.
- §6 skeleton-first: implementers should write a CHANGELOG.md or progress-tracker skeleton at dispatch start.
- §7 mid-flight: if `stream_error` → re-dispatch with "RESUME from checkpoint at: {tracker_path}; do NOT re-run completed Edit operations" directive. Critical because Edit operations have filesystem side-effects — blind retry duplicates patches.
- §8: implementer final_message MUST include a non-empty completion-summary listing files-edited; missing summary triggers retry.

**Wave-plan budget verification**:
- PHASE A total: 1.12M tokens (8 × 140k cap) — WITHIN soft envelope.
- PHASE B total: ~6 × 50k codex output tokens = ~300k OUT-OF-CC + tee-back cost.
- PHASE D total: variable; 5 implementers × 180k = 900k. Cap PHASE D to ≤6 implementers to stay under 1.1M.
- **Grand total wave ceiling**: ~2.6M CC-side tokens + codex-side separate. Within Anthropic's "valuable task" economic-viability threshold per §1.

**Wave-plan CONFIRMED COMPLIANT** with all 8 §-anchored disciplines IF:
1. Every PHASE A/D dispatch prompt embeds Δ-PDM-1 skeleton-first directive ✓ (S8 verifies own compliance).
2. Every dispatch prompt embeds Δ-PDM-2 BUDGET directive with K + M values ✓ (S8 dispatch prompt did).
3. Parent orchestrator strip-and-tests every `final_message` before consumption (§8 / F5).
4. Mid-flight `stream_error` triggers Δ-PDM-3 resume-from-checkpoint, not blind retry.
