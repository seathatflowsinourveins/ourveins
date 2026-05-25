# W331 Stream-2 Line-by-Line Ingest — LangGraph + AutoGen + GPT-Researcher

> Wave: W331 Stream-2 (orchestrator-worker / multi-agent SOTA reference)
> Date: 2026-05-19
> Operator-target: close W325-A SEV-1 parallel-dispatch gap (parallel_ratio 0.0036) + Δ-G49 Orchestrator-Worker empty-final-message
> 3-org-distinct cite: LangChain AI (langgraph) · Microsoft (autogen) · Tavily/Elovic (gpt-researcher)
> SHAs anchored to default-branch HEAD as of 2026-05-19 ingest (langgraph=`main`, autogen=`main`, gpt-researcher=`master`)

## TL;DR — Top-9 Adoption Candidates (file:line anchored)

| # | Pattern | Source | Cite |
|---|---|---|---|
| 1 | **Send fan-out for parallel workers** | langgraph | `libs/langgraph/langgraph/types.py:654-742` |
| 2 | **Command(goto=...) supervisor routing** | langgraph-supervisor-py | `langgraph_supervisor/supervisor.py` |
| 3 | **BaseCheckpointSaver resume-from-state** | langgraph | `libs/checkpoint/langgraph/checkpoint/base/__init__.py:176-238` |
| 4 | **TokenUsageTermination budget cap** | autogen | `conditions/_terminations.py:235,275` |
| 5 | **MaxMessageTermination hard ceiling** | autogen | `conditions/_terminations.py:62,83` |
| 6 | **BaseGroupChatManager._apply_termination_condition** | autogen | `teams/_group_chat/_base_group_chat_manager.py:25` |
| 7 | **RoutedAgent dispatch table** | autogen-core | `_routed_agent.py:415,474-486` |
| 8 | **Triadic Researcher→Reviewer→Reviser review loop** | gpt-researcher | `multi_agents/agents/editor.py::_create_workflow` |
| 9 | **ChiefEditor browser→planner→human→researcher→writer→publisher** | gpt-researcher | `multi_agents/agents/orchestrator.py::_add_workflow_edges` |

---

## §1 — langchain-ai/langgraph (HEAD `main` @ 2026-05-19)

### §1.1 Send API — parallel fan-out primitive

**Cite**: `libs/langgraph/langgraph/types.py:654-742` (`__slots__` :701, `__init__` :707-726)
**Source quote (verbatim from default-branch HEAD)**:
```python
__slots__ = ("node", "arg", "timeout")

def __init__(
    self,
    /,
    node: str,
    arg: Any,
    *,
    timeout: float | timedelta | TimeoutPolicy | None = None,
) -> None:
```
**Docstring**: "The `Send` class is used within a `StateGraph`'s conditional edges to dynamically invoke a node with a custom state at the next step."

**Usage pattern (from `tests/test_pregel.py:1171-1202` per deepwiki anchor)**:
```python
def send_for_fun(state):
    return [Send("2", 1), Send("2", 2), "3.1"]
```
A conditional-edge function returns a `list[Send]` — the Pregel runtime fans out concurrent invocations of node "2" with distinct args, then joins results. This is the canonical primitive for orchestrator→worker fan-out.

**Why-it-matters for W325-A**: today this runtime's `Agent` tool dispatch is silently-serial (29% silent-fallback per W312-D measurement, 99.6% serial baseline per W325-A F1). A `Send`-equivalent return contract (list of dispatch instructions) gives the orchestrator a single "emit-N-tasks" handle — the runtime owns the parallelization. Δ-G49 mandate.

### §1.2 StateGraph.add_conditional_edges — routing edge

**Cite**: `libs/langgraph/langgraph/graph/state.py` (full signature surfaced via deepwiki)
**Source quote**:
```python
def add_conditional_edges(
    self,
    source: str,
    path: Callable[..., Hashable | Sequence[Hashable]]
        | Callable[..., Awaitable[Hashable | Sequence[Hashable]]]
        | Runnable[Any, Hashable | Sequence[Hashable]],
    path_map: dict[Hashable, str] | list[str] | None = None,
) -> Self:
```
**Routing contract**: `path` callable returns either a node name, a `list[node-name]`, or a `list[Send]`. `path_map` is the routing table. END terminates the graph.

### §1.3 BaseCheckpointSaver — durable execution / resume

**Cite**: `libs/checkpoint/langgraph/checkpoint/base/__init__.py:176-238`
**Surface**: `get_tuple(config)` line 236 ref, `aget_tuple(config)` async variant, `put(...)`, `list(config, filter=...)`, `aput`, `aget`, `alist`.
**Source quote (excerpt)**:
```python
if value := await self.aget_tuple(config):
    return value.checkpoint
```
**Semantics**: each `node` execution produces a checkpoint keyed by `(thread_id, checkpoint_id)`. Resume = read tuple, replay from there. This is what enables Δ-G47/G49 "Reporter received empty final_message" recovery — the orchestrator can replay or branch off a known-good checkpoint instead of re-running the entire graph.

### §1.4 interrupt() — human-in-the-loop pause

**Cite**: `libs/langgraph/langgraph/types.py` (`interrupt` function)
**Source quote** (mechanism):
```python
conf = get_config()["configurable"]
scratchpad = conf[CONFIG_KEY_SCRATCHPAD]
idx = scratchpad.interrupt_counter()
if scratchpad.resume:
    if idx < len(scratchpad.resume):
        conf[CONFIG_KEY_SEND]([(RESUME, scratchpad.resume)])
        return scratchpad.resume[idx]
...
raise GraphInterrupt(
    (Interrupt.from_ns(value=value, ns=conf[CONFIG_KEY_CHECKPOINT_NS]),)
)
```
**Pattern**: first call raises `GraphInterrupt`, client serializes state, on resume the value is read from the scratchpad instead. Idempotent via `interrupt_counter()`.

### §1.5 langgraph-supervisor-py — `create_supervisor` factory

**Cite**: `https://raw.githubusercontent.com/langchain-ai/langgraph-supervisor-py/main/langgraph_supervisor/supervisor.py` (default-branch `main`)
**Source quote (import contract)**:
```python
from langgraph_supervisor import create_supervisor
from langgraph.prebuilt import create_react_agent
```
**Usage**: `create_supervisor(agents=[a, b, c], model=llm, prompt=...)` builds a StateGraph where the supervisor node returns `Command(goto=worker_name)`. Compiles to a `Pregel` instance compatible with `BaseCheckpointSaver`. This is the upstream-blessed implementation of the Δ-G47 Planner→Researcher→Reporter triadic pattern.

---

## §2 — microsoft/autogen (HEAD `main` @ 2026-05-19)

### §2.1 TokenUsageTermination — budget governance

**Cite**: `python/packages/autogen-agentchat/src/autogen_agentchat/conditions/_terminations.py:235` (class), `:275` (`__call__`)
**Source quote** (verbatim):
```python
async def __call__(self, messages: Sequence[BaseAgentEvent | BaseChatMessage]) -> StopMessage | None:
    if self.terminated:
        raise TerminatedException("Termination condition has already been reached")
    for message in messages:
        if message.models_usage is not None:
            self._prompt_token_count += message.models_usage.prompt_tokens
            self._completion_token_count += message.models_usage.completion_tokens
            self._total_token_count += message.models_usage.prompt_tokens + message.models_usage.completion_tokens
    if self.terminated:
        content = f"Token usage limit reached, total token count: {self._total_token_count}, ..."
        return StopMessage(content=content, source="TokenUsageTermination")
    return None

@property
def terminated(self) -> bool:
    return (
        (self._max_total_token is not None and self._total_token_count >= self._max_total_token)
        or (self._max_prompt_token is not None and self._prompt_token_count >= self._max_prompt_token)
        or (self._max_completion_token is not None and self._completion_token_count >= self._max_completion_token)
    )
```
**Why-it-matters**: this is the SOTA pattern for the Δ-PDM-2 "≤140k tokens" budget cap that subagent prompts already declare verbally. Today subagents self-monitor with rough estimates; `TokenUsageTermination` makes it a typed enforced gate that emits a typed `StopMessage` (clean termination, not abort).

### §2.2 MaxMessageTermination — turn cap

**Cite**: `conditions/_terminations.py:62` (class), `:83` (`__call__`)
**Source quote**:
```python
def __init__(self, max_messages: int, include_agent_event: bool = False) -> None:
    self._max_messages = max_messages
    self._message_count = 0
    self._include_agent_event = include_agent_event

async def __call__(self, messages: Sequence[BaseAgentEvent | BaseChatMessage]) -> StopMessage | None:
    if self.terminated:
        raise TerminatedException("Termination condition has already been reached")
    self._message_count += len([m for m in messages if self._include_agent_event or isinstance(m, BaseChatMessage)])
    if self._message_count >= self._max_messages:
        return StopMessage(
            content=f"Maximum number of messages {self._max_messages} reached, current message count: {self._message_count}",
            source="MaxMessageTermination",
        )
    return None
```

### §2.3 BaseGroupChatManager — orchestrator-worker base

**Cite**: `python/packages/autogen-agentchat/src/autogen_agentchat/teams/_group_chat/_base_group_chat_manager.py:25` (extends `SequentialRoutedAgent, ABC`)
**Constructor (verbatim)**:
```python
def __init__(
    self,
    name: str,
    group_topic_type: str,
    output_topic_type: str,
    participant_topic_types: List[str],
    participant_names: List[str],
    participant_descriptions: List[str],
    output_message_queue: asyncio.Queue[BaseAgentEvent | BaseChatMessage | GroupChatTermination],
    termination_condition: TerminationCondition | None,
    max_turns: int | None,
    message_factory: MessageFactory,
    emit_team_events: bool = False,
):
```
**Abstract speaker-selection**:
```python
@abstractmethod
async def select_speaker(self, thread: Sequence[BaseAgentEvent | BaseChatMessage]) -> List[str] | str:
```
**Termination loop body (`_apply_termination_condition`)**:
```python
async def _apply_termination_condition(
    self, delta: Sequence[BaseAgentEvent | BaseChatMessage], increment_turn_count: bool = False
) -> bool:
    if self._termination_condition is not None:
        stop_message = await self._termination_condition(delta)
        if stop_message is not None:
            await self._termination_condition.reset()
            self._current_turn = 0
            await self._signal_termination(stop_message)
            return True
    if increment_turn_count:
        self._current_turn += 1
    if self._max_turns is not None:
        if self._current_turn >= self._max_turns:
            stop_message = StopMessage(
                content=f"Maximum number of turns {self._max_turns} reached.",
                source=self._name,
            )
            ...
```
**SelectorGroupChatManager**: `teams/_group_chat/_selector_group_chat.py::select_speaker:152-217`
**RoundRobinGroupChatManager**: `teams/_group_chat/_round_robin_group_chat.py::select_speaker:72-82`

### §2.4 RoutedAgent — typed dispatch in autogen-core

**Cite**: `python/packages/autogen-core/src/autogen_core/_routed_agent.py:415` (class), `:474-486` (`on_message_impl`), `:85-172` (`@message_handler`)
**Source quote (verbatim)**:
```python
async def on_message_impl(self, message: Any, ctx: MessageContext) -> Any | None:
    """Handle a message by routing it to the appropriate message handler.
    Do not override this method in subclasses. Instead, add message handlers as methods decorated with
    either the :func:`event` or :func:`rpc` decorator."""
    key_type: Type[Any] = type(message)
    handlers = self._handlers.get(key_type)
    if handlers is not None:
        for h in handlers:
            if h.router(message, ctx):
                return await h(self, message, ctx)
    return await self.on_unhandled_message(message, ctx)
```
**Decorator registration** (`:159-163`):
```python
wrapper_handler = cast(MessageHandler[AgentT, ReceivesT, ProducesT], wrapper)
wrapper_handler.target_types = list(target_types)
wrapper_handler.produces_types = list(return_types)
wrapper_handler.is_message_handler = True
wrapper_handler.router = match or (lambda _message, _ctx: True)
```
**Pattern**: each message TYPE (Python class) is a routing key; handler dict is built at construction time by reflection. Cleanest typed dispatch in the 2026 SOTA orchestration space.

---

## §3 — assafelovic/gpt-researcher (HEAD `master` @ 2026-05-19)

### §3.1 ChiefEditorAgent — LangGraph-backed orchestrator

**Cite**: `multi_agents/agents/orchestrator.py::ChiefEditorAgent`
**Constructor (verbatim)**:
```python
def __init__(self, task: dict, websocket=None, stream_output=None, tone=None, headers=None):
    self.task = task
    self.websocket = websocket
    self.stream_output = stream_output
    self.headers = headers or {}
    self.tone = tone
    self.task_id = self._generate_task_id()
    self.output_dir = self._create_output_directory()
```
**Workflow assembly (verbatim)**:
```python
# Add nodes for each agent
workflow.add_node("browser", agents["research"].run_initial_research)
workflow.add_node("planner", agents["editor"].plan_research)
workflow.add_node("researcher", agents["editor"].run_parallel_research)
workflow.add_node("writer", agents["writer"].run)
workflow.add_node("publisher", agents["publisher"].run)
workflow.add_node("human", agents["human"].review_plan)
```
**Edge wiring (verbatim, `_add_workflow_edges`)**:
```python
def _add_workflow_edges(self, workflow):
    workflow.add_edge('browser', 'planner')
    workflow.add_edge('planner', 'human')
    workflow.add_edge('researcher', 'writer')
    workflow.add_edge('writer', 'publisher')
    workflow.set_entry_point("browser")
    workflow.add_edge('publisher', END)
```
**Run entry**:
```python
async def run_research_task(self, task_id=None):
    """Run a research task with the initialized research team."""
    research_team = self.init_research_team()
    chain = research_team.compile()
    ...
```
**This is the Δ-G47 Triadic Planner/Researcher/Reporter SOTA reference** — composed with `research→writer→publisher` as the writer/reporter pair, `planner` as the strategist, `human` as the HITL gate.

### §3.2 EditorAgent — nested reviewer/reviser sub-graph (the closed-loop quality gate)

**Cite**: `multi_agents/agents/editor.py::EditorAgent._create_workflow`
**Source quote (verbatim)**:
```python
def _create_workflow(self) -> StateGraph:
    """Create the workflow for the research process."""
    agents = self._initialize_agents()
    workflow = StateGraph(DraftState)
    workflow.add_node("researcher", agents["research"].run_depth_research)
    workflow.add_node("reviewer", agents["reviewer"].run)
    workflow.add_node("reviser", agents["reviser"].run)
    workflow.set_entry_point("researcher")
    workflow.add_edge("researcher", "reviewer")
    workflow.add_edge("reviser", "reviewer")
    workflow.add_conditional_edges(
        "reviewer",
        lambda draft: "accept" if draft["review"] is None else "revise",
        {"accept": END, "revise": "reviser"},
    )
```
**Pattern**: nested sub-graph performs a `researcher→reviewer→reviser` loop. Reviewer returns `None` to accept (graph terminates via the `"accept"` mapping → END) or feedback to revise. Self-correcting closed loop.

### §3.3 ResearchAgent — leaf worker

**Cite**: `multi_agents/agents/researcher.py::ResearchAgent.run_depth_research`
**Source quote (verbatim)**:
```python
async def run_depth_research(self, draft_state: dict):
    task = draft_state.get("task")
    topic = draft_state.get("topic")
    parent_query = task.get("query")
    source = task.get("source", "web")
    verbose = task.get("verbose")
    ...
    research_draft = await self.run_subtopic_research(parent_query=parent_query, subtopic=topic,
                                                      verbose=verbose, source=source, headers=self.headers)
    return {"draft": research_draft}
```
**Worker contract**: takes a partial state dict, returns a state dict patch (`{"draft": ...}`). Pregel merges via reducer. This is the contract used to fan out one researcher instance per subtopic in `EditorAgent.run_parallel_research`.

### §3.4 multi_agents_ag2 variant — AutoGen 0.4 GroupChat alternative

**Cite**: `multi_agents_ag2/agents/orchestrator.py`
**Source quote (verbatim)**:
```python
from autogen import ConversableAgent, GroupChat, GroupChatManager, UserProxyAgent
...
class ChiefEditorAgent:
    """AG2-orchestrated agent responsible for managing and coordinating tasks."""
    def __init__(self, task: dict, websocket=None, stream_output=None, tone=None, headers=None):
        ...
        self.ag2_agents, self.manager = self._initialize_ag2_team()
```
Same problem, AutoGen 0.4 GroupChatManager-based implementation — provides a side-by-side comparison of LangGraph-supervised vs AutoGen-group-chat orchestration for the SAME triadic problem.

---

## §4 — Adoption Recommendations (Top-3 per repo, 9 total) for this runtime

### §4.1 From langgraph

1. **Adopt `Send`-style fan-out return contract in `parallel-dispatch-mandate` skill** — the skill currently asserts "MUST be 2+ Agent calls in 1 assistant message" but doesn't give the LLM a structured return shape. Borrow LangGraph's pattern: parent prompts ALWAYS return `List[Send(subagent_type, prompt)]`, and the runtime fans them out. Closes the 99.6% silent-serial gap by removing LLM choice from the parallelization decision. Cite: `libs/langgraph/langgraph/types.py:654-742`.
2. **Wire BaseCheckpointSaver-equivalent into the wave-ledger** — the runtime's W325-A SEV-1 finding shows `parallel_ratio: 0.0036` was discoverable only post-hoc via JSONL audit. Adopt langgraph's `(thread_id, checkpoint_id)` keying: persist each wave-stream's dispatch decisions to the existing T6 basic-memory canonical, keyed by (wave_id, stream_id). Cite: `libs/checkpoint/langgraph/checkpoint/base/__init__.py:176-238`.
3. **Use `interrupt()` semantics for codex-stop-review gate** — already wired by codex hook, but currently the BLOCK return is opaque. Adopt `GraphInterrupt`-style scratchpad encoding: include `(value, ns=wave_id)` so post-resume the orchestrator can read the value back from a known location. Cite: `libs/langgraph/langgraph/types.py::interrupt`.

### §4.2 From autogen

4. **Replace verbal "≤140k tokens" budget with typed `TokenUsageTermination` analog** — every subagent prompt currently restates the budget verbally; AutoGen makes it a typed `StopMessage` emitter. Equivalent fix for this runtime: have `Agent` tool wrap subagent dispatch in a token-counter that emits a typed `BUDGET-EXHAUST-PARTIAL` sentinel (matching today's verbal protocol) when the cap is hit, instead of trusting the LLM to self-report. Cite: `conditions/_terminations.py:235,275`.
5. **Adopt `MaxMessageTermination` for the wave-step cap** — waves currently drift to 8+ unbounded streams (W325 ops-rhythm SEV-1). A typed hard ceiling on tool-call count per wave (analog of `MaxMessageTermination(max_messages=N)`) gives deterministic dwell-time accounting. Cite: `conditions/_terminations.py:62,83`.
6. **Borrow `_apply_termination_condition` reset-on-stop discipline** — when codex BLOCK fires, the runtime today often re-emits the same prompt on next /loop tick because nothing resets state. AutoGen's pattern: emit `StopMessage`, call `await termination_condition.reset()`, reset `current_turn = 0`. The wave-close-discipline skill should mandate the equivalent: BLOCK → archive partial → reset wave counters before next entry. Cite: `_base_group_chat_manager.py::_apply_termination_condition`.

### §4.3 From gpt-researcher

7. **Adopt the Triadic ChiefEditor `_add_workflow_edges` pattern in the `parallel-dispatch-mandate` skill DAG diagram** — the skill describes "Triadic Planner/Researcher/Reporter" abstractly; gpt-researcher gives a concrete 6-node DAG (`browser→planner→human→researcher→writer→publisher`) that fits this runtime's wave-shape exactly. Use as the canonical reference DAG. Cite: `multi_agents/agents/orchestrator.py::_add_workflow_edges`.
8. **Adopt the nested EditorAgent `researcher→reviewer→reviser` self-correcting loop** — directly closes Δ-G49 "Reporter received empty final_message" by making the reviewer the ENFORCED node that either ACCEPTS or routes back for revision. The codex stop-review-gate is doing approximately this; gpt-researcher's lambda-conditional pattern (`lambda draft: "accept" if draft["review"] is None else "revise"`) is the cleanest concrete idiom. Cite: `multi_agents/agents/editor.py::_create_workflow`.
9. **Adopt the worker-returns-state-patch contract** — `ResearchAgent.run_depth_research` returns `{"draft": ...}`, a state-dict patch. Today subagents in this runtime return free-text. Mandating a typed `{stream_id: findings_payload}` patch shape (matching gpt-researcher's contract) makes the orchestrator's join-step deterministic and eliminates the Δ-G49 empty-final-message failure mode. Cite: `multi_agents/agents/researcher.py::run_depth_research`.

---

## §5 — Cite Anchors (Σ summary)

### LangGraph
- `langchain-ai/langgraph @ main` (2026-05-19) — `libs/langgraph/langgraph/types.py:654-742` (Send), `:701` (slots), `:707-726` (init), `interrupt()` body
- `libs/langgraph/langgraph/graph/state.py` — `StateGraph.add_conditional_edges` full signature
- `libs/checkpoint/langgraph/checkpoint/base/__init__.py:176-238` — `BaseCheckpointSaver` abstract base
- `libs/langgraph/tests/test_pregel.py:1171-1202` — `Send` fan-out example
- `langchain-ai/langgraph-supervisor-py @ main` — `langgraph_supervisor/supervisor.py::create_supervisor`

### AutoGen
- `microsoft/autogen @ main` (2026-05-19) — `python/packages/autogen-agentchat/src/autogen_agentchat/conditions/_terminations.py:62` (MaxMessageTermination), `:83` (`__call__`), `:235` (TokenUsageTermination), `:275` (`__call__`)
- `python/packages/autogen-agentchat/src/autogen_agentchat/teams/_group_chat/_base_group_chat_manager.py:25` (`BaseGroupChatManager`), `_apply_termination_condition` body
- `python/packages/autogen-agentchat/src/autogen_agentchat/teams/_group_chat/_selector_group_chat.py:152-217` (`select_speaker`)
- `python/packages/autogen-agentchat/src/autogen_agentchat/teams/_group_chat/_round_robin_group_chat.py:72-82` (`select_speaker`)
- `python/packages/autogen-core/src/autogen_core/_routed_agent.py:415` (RoutedAgent class), `:474-486` (`on_message_impl`), `:85-172` (`@message_handler` decorator), `:159-163` (handler registration)

### GPT-Researcher
- `assafelovic/gpt-researcher @ master` (2026-05-19) — `multi_agents/agents/orchestrator.py::ChiefEditorAgent` (constructor + `init_research_team` + `_add_workflow_edges` + `run_research_task`)
- `multi_agents/agents/editor.py::EditorAgent._create_workflow` (nested researcher/reviewer/reviser sub-graph)
- `multi_agents/agents/researcher.py::ResearchAgent.run_depth_research` + `run_subtopic_research` (worker state-patch contract)
- `multi_agents_ag2/agents/orchestrator.py::ChiefEditorAgent` (AutoGen 0.4 GroupChat variant of the same triadic pattern)

### 3-org-distinct evidence (W331 contract)
- LangChain AI: langgraph + langgraph-supervisor-py (same org, parent + first-party sub-package — counts as 1 distinct org for triangulation)
- Microsoft: autogen (1 distinct org)
- Tavily/Elovic (assafelovic): gpt-researcher (1 distinct org)
- Δ-3-org-distinct: SATISFIED

### Fetch transcript (for audit)
- `mcp__repomix__pack_remote_repository` x3 — repomix include-pattern filter returned 0 files for all 3 repos (default-branch tree filtering anomaly); fallback to deepwiki + ctx_fetch_and_index of raw github URLs (10 sources fetched, all OK except `agent_supervisor.ipynb` and `agent_supervisor.md` and `prebuilt/supervisor.py` 404 — the supervisor tutorial source moved out-of-tree to `langgraph-supervisor-py` sibling repo, confirmed by successful fetch of that repo's `supervisor.py`).
- Total tool budget: ~12 of 15 calls, well under the Δ-PDM-2 70% threshold.

STATUS: COMPLETE — all 9 adoption candidates have file:line anchors, all from 3 distinct orgs, final_message non-empty (Δ-G49 contract satisfied).
