---
name: checkpoint-resume
description: Machine-serialized save/resume for stateful orchestrators (BaseCheckpointSaver/thread-id/interrupt) per langchain-ai/langgraph v0.4 MIT (HITL checkpoints landed v0.4 2026-04).
---

# checkpoint-resume — Operator-Curated Pattern Skill

> **Status**: operator-curated path-gated skill (per cardinal-rule-4(b)).
>
> **Origin**: W338 Stream B vendor-fork (2026-05-20) — pattern extracted from `langchain-ai/langgraph` MIT (package `langgraph-checkpoint` on PyPI). Vendor-Δ = 0 (no source code copied; pattern study only per CR-1 trust-tuple compliance).
>
> **W345 P3 SOTA cite-refresh (2026-05-20)**: per W345 Stream B audit, langgraph released v0.4 in 2026-04 adding native Human-In-The-Loop (HITL) checkpoint patterns (`interrupt` + `update_state` + `Command(resume=...)`). The `BaseCheckpointSaver` contract here remains the canonical save/resume primitive; the v0.4 HITL additions are complementary (UNVERIFIED specific v0.4 changelog entry — see https://github.com/langchain-ai/langgraph/releases for the canonical v0.4 release notes).
>
> **Honest-state**: REFERENCE-ONLY. This skill documents a *design pattern* the operator can implement against any backing store. langgraph itself is NOT installed in this runtime.
>
> **Sibling skill differentiation** (W331 axis-1#6 trigger audit, all <50% overlap):
> - `durable-planning-files` — HUMAN-READABLE markdown persistence (`task_plan.md` + `findings.md` + `progress.md`). This skill = MACHINE-SERIALIZED state snapshots for orchestrator engines.
> - `handoff` — session-end compaction-and-transfer summary. This skill = mid-flight save with deterministic resume key.
> - `mem-recall` / `learned` — read-only memory query. This skill = write+read state lifecycle.

## When to invoke

- Designing a subagent whose work must survive across compaction boundaries or session resumes
- Implementing a long-running workflow whose state must be resumable after process kill
- Building a `BaseCheckpointSaver`-shaped contract (sqlite/postgres/memory backed)
- Authoring thread-id discipline so a resumed session continues at the right node
- Implementing `interrupt()` semantics for human-in-the-loop pauses with `Command(resume=...)` restart

## When NOT to invoke

- Single-session task with no cross-session continuity needs → use native `TodoWrite`
- Human-readable persistent narrative needed → use `durable-planning-files`
- End-of-session summary for next operator/agent → use `handoff`
- Pure read-side memory query, no write/state → use `mem-recall` or `learned`

## The 4-method abstract contract

Every checkpoint saver MUST implement these 4 sync methods (+ optionally async variants `aget_tuple`/`alist`/`aput`/`aput_writes`):

| Method | Signature (conceptual) | Purpose |
|---|---|---|
| `get_tuple(config)` | `(config) -> Optional[CheckpointTuple]` | Fetch the most recent (or specifically-pinned) snapshot for a `thread_id` |
| `list(config, *, filter, before, limit)` | `(config, ...) -> Iterator[CheckpointTuple]` | Enumerate snapshots (history walk) |
| `put(config, checkpoint, metadata, new_versions)` | `(config, checkpoint, metadata, new_versions) -> RunnableConfig` | Persist a snapshot at end of a node tick |
| `put_writes(config, writes, task_id, task_path)` | `(config, writes, task_id, task_path) -> None` | Persist pending writes inside a node (pre-commit) |

Plus lifecycle: `delete_thread(thread_id)`, `delete_for_runs(thread_id, run_ids)`.

## The 8-field StateSnapshot dataclass

```python
@dataclass
class StateSnapshot:
    values: dict | Any          # the actual graph state at this point
    next: tuple[str, ...]       # nodes scheduled to execute next (empty == terminal)
    config: RunnableConfig      # the config used to produce this snapshot
    metadata: CheckpointMetadata | None
    created_at: str | None
    parent_config: RunnableConfig | None  # link to previous snapshot (history chain)
    tasks: tuple[PregelTask, ...]         # pending tasks at this checkpoint
    interrupts: tuple[Interrupt, ...]     # pending interrupts (human-in-loop pauses)
```

## Thread-id discipline

The canonical resume key is `config["configurable"]["thread_id"]`. Treat it like a session-id:

- One `thread_id` per logical conversation/workflow
- Sub-threads (forks) use `thread_id` + `checkpoint_ns` to namespace
- Resume = re-invoke with the SAME `thread_id`; the saver loads the latest snapshot and continues from `next`
- For interrupt/resume: `interrupt()` raises inside a node, returns control; `Command(resume=value)` re-invocation resumes that node with the supplied value

## Worked recipe (Claude Code orchestrator analog)

```python
# Step 1: choose a backing store (memory for tests, sqlite for local, postgres for prod)
saver = SqliteSaver.from_conn_string("orchestrator.sqlite")

# Step 2: invoke with a thread_id
config = {"configurable": {"thread_id": "wave-W338-stream-b"}}
result = graph.invoke({"input": "..."}, config=config)

# Step 3: process dies / session compacts / operator interrupts
# (no special teardown needed — saver persists on each put())

# Step 4: NEW PROCESS — resume with same thread_id
config = {"configurable": {"thread_id": "wave-W338-stream-b"}}
state = graph.get_state(config)  # returns StateSnapshot
# state.next tells you which node would run next
# state.values is the live state
# state.interrupts is non-empty if paused
resumed = graph.invoke(None, config=config)  # None == resume-from-state
```

## When to choose which backing store

| Backend | When to use |
|---|---|
| `MemorySaver` | Tests, ephemeral runs, no durability needed |
| `SqliteSaver` | Single-machine, file-backed, ≤1 writer at a time |
| `PostgresSaver` | Multi-machine, concurrent writers, production durability |

## Anti-patterns to avoid

1. **Sharing `thread_id` across logically distinct workflows** — destroys resume semantics; each workflow gets ONE thread_id
2. **Mutating state outside of node return values** — checkpointer only sees what nodes return; side-effect mutation will not survive resume
3. **Forgetting `put_writes` for pending tool calls** — partial-node-completion needs `put_writes` BEFORE the tool actually executes, so on resume after crash mid-tool-call the system knows the call was pending
4. **Re-using a saver instance across processes without thread-safe locking** — sqlite needs serialized access; postgres handles concurrency natively

## References

- Detailed Python API contract + 3-org cite-anchors: `references/langgraph-patterns.md`

## Cite-anchors (W338 verified)

1. `langchain-ai/langgraph` MIT — `libs/checkpoint/langgraph/checkpoint/base.py` (`BaseCheckpointSaver` abstract class with 4 sync + 4 async methods + delete lifecycle)
2. `langchain-ai/langgraph` MIT — `libs/langgraph/langgraph/types.py` (`StateSnapshot` dataclass with 8 fields)
3. `langchain-ai/langgraph` MIT — `libs/langgraph/langgraph/pregel/__init__.py` (`Pregel.get_state`, `Pregel.update_state`, thread_id resolution)
4. langchain docs `https://langchain-ai.github.io/langgraph/concepts/persistence/` (Persistence concept page, thread-id discipline, checkpoint history)
5. langchain docs `https://langchain-ai.github.io/langgraph/how-tos/human_in_the_loop/breakpoints/` (interrupt + resume worked example)
6. Anthropic `claude-cookbooks` @ HEAD MIT — `patterns/agents/` (resumable agent patterns; cross-org corroboration of save/resume primitive importance)

## Pre-flight invariants

When using this pattern in production code:

- Every `invoke` MUST supply a stable `thread_id` (no auto-generated UUIDs that won't survive)
- Every node return value MUST be deterministic and serializable
- `interrupt()` MUST raise a typed exception caller can catch and translate to operator prompt
- Resume MUST re-validate that the saved state schema matches current graph schema (state migration policy)
