---
name: issue-mailbox
description: Use when coordinating multi-agent or multi-session work where a durable shared substrate (not ephemeral mailbox) is the right IPC channel — agents leave traces in T6 basic-memory wave-threads + structured `@mention` lines in commit/PR bodies, and peers read the substrate rather than receiving direct messages. Triggers on "issue mailbox", "stigmergic coordination", "shared blackboard", "@mention handoff", "wave-thread", "leave a trace for the next agent", or when SendMessage/agent-teams mailbox is unavailable but cross-session coordination is needed. Do NOT use for in-team real-time coordination (use agent-teams SendMessage) or single-agent work. Anchors multica Squad-as-issue-comments + Anthropic blackboard-pattern + 2026 stigmergic-coordination survey.
---

<!-- Reference: anthropics CC Skills doc `https://code.claude.com/docs/en/skills` (description-match auto-fire semantics). W364 Task C5 — pattern-lift from multica Squad-as-issue-comments stigmergy. Operator-curated path-gated local skill per cardinal-rule-4(b); cardinal-rule-3-compliant (no self-invented subagent). CR-6 verify-before-claim: every "trace left" / "peer read" claim cites a basic-memory permalink or commit SHA. -->

# issue-mailbox — stigmergy-via-shared-substrate coordination

Description-triggered coordination skill. Agents coordinate **indirectly** by leaving durable traces in a **shared substrate** (T6 basic-memory wave-thread + structured `@mention` lines in commit/PR bodies) and **reading** that substrate, rather than sending each other direct messages. This is *stigmergy*: coordination mediated by modifications to a shared environment, the way ants coordinate via pheromone trails — adapted from the multica Squad "agents-as-issue-comments" pattern and Anthropic's blackboard multi-agent pattern.

Companion to `wait-agent` (non-blocking join on background agents) and `dispatching-parallel-agents-w321-fork` (fan-out dispatch). Distinct from both: those orchestrate *live* agent fleets; this skill is the *durable, async, cross-session* coordination substrate for when no live mailbox exists.

## When to invoke

Trigger keywords/contexts (description-match per `https://code.claude.com/docs/en/skills`):

1. "issue mailbox"
2. "stigmergic coordination" / "stigmergy"
3. "shared blackboard" / "blackboard"
4. "@mention handoff"
5. "wave-thread"
6. "leave a trace for the next agent"
7. when **SendMessage / agent-teams mailbox is unavailable** but cross-session coordination is still needed (e.g. agents in different worktrees, different sessions, or separated in time)

(7 distinct trigger phrases — CR-4 ≤8 budget satisfied.)

### Auto-fire rule

When ANY of the above triggers appear in the operator prompt OR the orchestrator recognizes a cross-session/async coordination need with no live agent-teams mailbox active, this skill auto-fires per CC description-match semantics. The orchestrator MUST then route coordination through the shared substrate (wave-thread + `Coord-Mention:` trailer) below, NOT attempt a direct message.

### Do NOT use (NOT-use cases)

- **In-team real-time coordination** — use **agent-teams `SendMessage`** / `team-communication-protocols`. That is the hierarchical-mailbox path and is STRICTLY PREFERRED when a live team exists (see taxonomy caveat below).
- **Single-agent work** — no peer to coordinate with; there is no substrate-reader. Just do the work.
- **Non-blocking join / result collection on live background agents** — use **`wait-agent`** (that skill polls *agent completion*; this skill reads a *durable substrate*, a different concept — "poll agents" ≠ "poll the wave-thread").
- **Synchronous request/response** where the caller must block until a specific peer replies — stigmergy is fire-and-forget; the substrate has no delivery guarantee or ack.

## The substrate (blackboard) — T6 basic-memory wave-thread

The canonical blackboard is a single T6 `basic-memory` note per wave:

- **Permalink convention**: `main/wave-threads/W<n>` (e.g. `main/wave-threads/W364`).
- **Write a trace**: append a structured entry to the wave-thread note via `mcp__basic-memory__write_note` (create on first write) or `mcp__basic-memory__edit_note` (append thereafter). Each trace SHOULD carry: agent/stream identity, timestamp, the claim or hand-off, and a `@mention` of the intended reader (or `@W<n>` for "any agent on this wave").
- **Read the substrate**: `mcp__basic-memory__read_note "main/wave-threads/W<n>"` (full thread) or `mcp__basic-memory__search_notes "Wave-<n> @<my-identity>"` to find traces addressed to you.
- **Why basic-memory**: T6 is the runtime's canonical-primary cross-session memory per W295 (`docs/architecture/W295-AUDIT-2026-05-18.md`). It survives `/clear`, compaction, session-kill, and worktree boundaries — exactly the durability stigmergy needs.

### Trace entry shape (recommended)

```markdown
## [W<n>] @<reader-or-wave> ← @<author>  (<ISO-8601 timestamp>)
- claim: <what you did / decided>  (evidence: <basic-memory permalink | commit SHA | test exit>)
- handoff: <what the next agent should pick up>
- status: OPEN | CONSUMED
```

A reader marks `status: CONSUMED` (via `edit_note`) once it has acted on the trace — this is the stigmergic equivalent of erasing a pheromone trail so peers don't re-process it.

## The `@mention` convention — commit / PR bodies

For coordination that should ride along with the code change itself (so a peer grepping git history finds it without opening basic-memory):

- **Commit trailer**: add a `Coord-Mention: @<agent-or-wave>` trailer line to the commit body. Multiple trailers allowed (one per intended reader).

  ```
  feat(W364): land issue-mailbox skill

  <body>

  Coord-Mention: @W364-integration
  Coord-Mention: @stream-C6
  ```

- **PR body**: include the same `@mention` tokens inline in the PR description so GitHub's native mention/notification surface (and any peer reading the PR) picks them up.

- **Read recent trailers** (substrate poll over git):

  ```bash
  git log -n 50 --format='%H %s%n%b' | grep -B2 'Coord-Mention:'
  ```

  A reader scans for `Coord-Mention: @<my-identity>` (or `@W<n>`) and acts on the referenced commit.

## Reader loop (how peers consume the substrate)

A coordinating agent, instead of awaiting a direct message:

1. **Poll the wave-thread**: `read_note "main/wave-threads/W<n>"`; filter for `@<my-identity>` or `@W<n>` traces with `status: OPEN`.
2. **Grep recent commit trailers**: scan `git log` for `Coord-Mention:` tokens addressed to it.
3. **Act**, then **mark CONSUMED** (edit the trace) so peers don't double-handle.
4. Repeat at natural checkpoints (after each task, before ship). There is no blocking wait — readers re-check the substrate when they next have a decision point.

## Contrast: agent-teams SendMessage vs issue-mailbox

| Axis | agent-teams `SendMessage` | issue-mailbox (this skill) |
|---|---|---|
| Channel | Live in-team mailbox | Durable shared substrate (T6 + commit trailers) |
| Timing | Real-time, synchronous-ish | Async, fire-and-forget |
| Scope | Within one running team/session | Cross-session, cross-worktree, cross-time |
| Delivery | Directed, addressed, ack-able | Indirect — peer reads when ready, no ack |
| Lifetime | Ephemeral (dies with the team) | Durable (survives `/clear`, kill, compaction) |
| Pattern | Hierarchical mailbox | Stigmergy / blackboard |

## Taxonomy caveat (2026 multi-agent coordination survey)

Per the 2026 multi-agent coordination taxonomy, **stigmergic coordination ranks BELOW hierarchical (mailbox/orchestrator-directed) coordination for production reliability** — indirect substrate-mediated coordination has weaker delivery guarantees, no built-in ack, and is harder to reason about than a directed mailbox. **Use issue-mailbox ONLY when a hierarchical mailbox is unavailable** (agents separated across sessions/worktrees/time, or no live agent-teams instance). When a live team exists, prefer `agent-teams:team-communication-protocols` + `SendMessage`.

## Anchors

- **multica Squad** — "agents-as-issue-comments" stigmergy: agents coordinate by leaving structured comments on a shared issue rather than messaging each other directly (W364 pattern-lift source).
- **Anthropic blackboard pattern** — multi-agent coordination via a shared, agent-readable/writable workspace (Anthropic effective-agents / multi-agent research-system writeups).
- **2026 stigmergic-coordination survey** — taxonomy ranking stigmergy below hierarchical coordination for production; documents pheromone-trail / shared-environment IPC for agent fleets.
