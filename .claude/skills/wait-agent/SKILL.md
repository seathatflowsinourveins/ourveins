---
name: wait-agent
description: Use when the orchestrator has dispatched 2+ background agents (Agent tool or `claude --bg`) and wants to continue its own work while waiting, then collect results on first-completion or N-of-M completion rather than blocking-wait-all. Triggers on "wait for agents", "wait_agent", "collect when ready", "first-completed", "non-blocking join", "poll agents", or after a multi-Agent dispatch where the orchestrator has independent work to do. Do NOT use for single-agent dispatch (just await the one notification) or when all results are strictly required before any progress (use blocking collection). Anchors philschmid subagent-patterns-2026 `wait_agent` global-mailbox + Anthropic claude-cookbooks orchestrator-workers async-join.
---

# wait-agent — non-blocking agent-completion mailbox

## What this is

The philschmid 2026 `wait_agent` global-mailbox pattern. The orchestrator
dispatches N agents in **one** message, keeps working on its own
critical-path task, and then performs a **non-blocking join** — collecting
results as soon as the **first** agent completes (or once **N-of-M** have
completed) instead of a `wait-all` that idles the orchestrator until the
slowest agent returns.

This is the POST-dispatch join half of the parallel-work loop. The
PRE-dispatch decomposition + fan-out half lives in
`superpowers:dispatching-parallel-agents` (and the local
`dispatching-parallel-agents-w321-fork`). Those skills decide *what* to
dispatch and fire *before* the Agent calls; this skill decides *how to
collect* and fires *after*. They do not overlap.

## The loop

1. **Dispatch** N independent agents in a single assistant message
   (2+ `Agent` tool calls, or `claude --bg "<task>"` for off-critical-path
   external sessions). This is `dispatching-parallel-agents` territory.
2. **Do your own work.** The orchestrator has a critical-path task it can
   make progress on while the agents run. Do it now — do not idle.
3. **Join non-blocking.** Invoke this skill: poll the completion source
   every N seconds, return the **first-completed** result (or once a
   threshold of **N-of-M** has landed).
4. **Synthesize incrementally.** Fold each completed result in as it
   arrives; re-poll for the remainder; stop when the join condition (first
   / N-of-M / all) is satisfied or a deadline is hit.

## Which completion source

| Agent kind | Completion signal | This skill needed? |
|---|---|---|
| Forked subagent (`Agent` tool, `CLAUDE_CODE_FORK_SUBAGENT=1`) | Harness **auto-notifies** the orchestrator on completion | Rarely — the harness already delivers the notification; just continue work and react to it |
| In-process agent-teams teammate | Mailbox / completion notification delivered in-session | No — use agent-teams collection |
| **`claude --bg` background session** | **External state** — query `claude agents --json` | **Yes** |
| **External CI / `gh run` / remote job** | **External state** — poll the external API | **Yes** |

The harness already notifies on fork/subagent completion, so this skill is
primarily for the **EXTERNAL-state** case: `claude --bg` background sessions
and external CI whose status the in-session notification stream does not
surface.

## Polling external `claude --bg` sessions

Per W363 R2, `claude agents --json` (CC v2.1.145) emits machine-readable
per-agent status. The non-blocking join reads it on an interval:

```bash
# one poll: list background agents as JSON, filter to completed ones
claude agents --json
# -> [{ "id": "...", "status": "completed"|"running"|"failed", ... }, ...]
```

- Poll every N seconds (start ~10s; back off if long-running).
- **first-completed**: return as soon as one entry flips to
  `status: "completed"`.
- **N-of-M**: return once the count of `completed` entries reaches the
  threshold; keep polling for the rest if the orchestrator wants them.
- A `status: "failed"` entry is a completion too — surface it (see
  `worker-failure-termination-guard`); do NOT silently treat failure as
  still-running.
- Honor a deadline: if the join condition is not met by the deadline,
  report partial results + which agents are still outstanding rather than
  polling forever.

## Auto-fire cardinal rule

This skill auto-fires **only POST multi-Agent dispatch, when the
orchestrator has dispatched 2+ background agents AND has independent work it
is doing in parallel.** It does NOT fire pre-dispatch (that is
`dispatching-parallel-agents`), and it does NOT fire for a single dispatched
agent.

## NOT-use cases

- **Single-agent dispatch** — there is nothing to *select-first* among one
  agent; just await the one notification.
- **Strict wait-all-before-progress** — when every result is required
  before the orchestrator can make *any* forward progress, a non-blocking
  first-completed join buys nothing; use ordinary blocking collection.
- **Forked-subagent-only fan-out** with no external state — the harness
  auto-notifies on completion, so an explicit poll loop is redundant.
- **PRE-dispatch decomposition / fan-out shaping** — that is
  `superpowers:dispatching-parallel-agents` /
  `dispatching-parallel-agents-w321-fork`, which fire before the Agent calls.

## Anchors

- philschmid *subagent-patterns-2026* — `wait_agent` global-mailbox
  primitive (orchestrator does own work, non-blocking first/N-of-M join).
- Anthropic *claude-cookbooks* `@39a350b6` orchestrator-workers
  async-join (`patterns/agents/orchestrator_workers.ipynb`) — fan-out then
  collect-as-ready synthesis.
- W363 R2 — `claude agents --json` machine-readable background-agent status
  (CC v2.1.145) is the external-state completion source.

Sister skills: `superpowers:dispatching-parallel-agents` (pre-dispatch
fan-out) · `empty-final-message-guard` (Δ-G49 empty-completion handling) ·
`worker-failure-termination-guard` (Δ-G50 fail-closed worker-exception
handling).
