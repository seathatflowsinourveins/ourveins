---
name: empty-final-message-guard
description: Use AUTOMATICALLY when synthesizing results from spawned subagents or agent-teams teammates (Δ-G49 contract). Validates that each completed teammate task has a non-empty final assistant message OR an explicit `NO-FINDINGS:<rationale>` sentinel. Empty completions are NEVER silently accepted — the orchestrator MUST either re-dispatch with stricter output-format reminder OR record OrchestrationError and escalate. Triggers on "synthesize results", "collect findings", "merge teammate outputs", "subagent completed", "team-spawn", "team-debug", "team-review", "team-feature", or when receiving any agent-completion notification. Cite-anchored to Anthropic claude-cookbooks @39a350b6 orchestrator_workers.ipynb cell-2 empty-content stub + Microsoft autogen `_signal_termination_with_error` + LangGraph supervisor `last_message` extraction.
---

# empty-final-message-guard

> **W339-P0b Gap-1 closure** — operator-curated local skill per cardinal-rule-4 (Anthropic-sanctioned local-skills path); plugin-cache patches forbidden as cardinal-rule-1 install-priority would be violated.

## When to fire

Auto-fire on these triggers (per `description` matcher):
- Operator says "synthesize", "merge", "collect findings" after dispatching agents
- Receiving an `<task-notification>` for a completed sub-agent
- Closing a `/team-spawn` lifecycle (Phase 4-5 Collect/Synthesize per `team-lead.md:80-83`)
- Multi-agent fan-out where ≥2 agents may return

## The Δ-G49 contract (cite-anchored)

| Source | Empty-result handling |
|---|---|
| Anthropic `claude-cookbooks @39a350b6 patterns/agents/prompts/orchestrator_workers.ipynb` cell-2 | `if not worker_content or not worker_content.strip(): worker_content = f"[Error: Worker '{worker_type}' returned no content]"` |
| Microsoft `autogen @027ecf0a _base_group_chat_manager.py:165-170` | `except Exception → _signal_termination_with_error → StopMessage` |
| LangChain `langgraph @5d341ac3 supervisor.py:81-91` | Implicit via `output_mode` + `last_message` extraction; supervisor re-routes if empty |

3-org-distinct convergence per sca-v13 + W295 anti-bias gate. Verdict: empty-result silent acceptance is a SEV-1 anti-pattern across the industry.

## Enforcement procedure

When you (the orchestrator) receive notification that a subagent / teammate task has `completed`:

1. **Extract the final assistant message** from the agent's transcript (the task-notification `result` field or `TaskGet` for agent-teams).

2. **Validate non-empty payload**:
   - If `final_message.text.trim()` is non-empty AND contains substantive content (≥20 chars, not just acknowledgement) → ACCEPT.
   - If `final_message.text.trim()` starts with `NO-FINDINGS:` AND has a rationale suffix → ACCEPT (explicit sentinel per Δ-G49).
   - Otherwise → REJECT.

3. **On REJECT** (empty or insufficient final message):
   - **First offense per agent**: re-dispatch the same agent with stricter output-format reminder:
     > "Your previous final assistant message was empty (no text content) or contained only tool_use blocks. Please emit either a substantive findings summary OR the explicit sentinel `NO-FINDINGS:<rationale>` (e.g. `NO-FINDINGS:dimension-not-applicable-to-target`). Empty completions are NOT silently accepted (Δ-G49 contract)."
   - **Second offense**: escalate to operator. Mark the task `FAILED-EMPTY-RESULT` (NOT `completed`) and inject a stub finding `[ORCHESTRATION-ERROR: agent <name> returned empty result after 1 re-dispatch — Δ-G49 guard fired]`. Do NOT include the empty result in synthesis.

4. **On synthesis** (when ALL completed agents have been validated):
   - Merge ONLY validated non-empty payloads.
   - If ≥1 agent escalated, surface the escalation prominently in the final synthesis with the operator's expected next step.

## Concrete examples

### Example 1 — silent-empty accepted (ANTI-PATTERN)
```
Agent reviewer-1 completed.
Synthesis: <merge reviewer-1's findings + reviewer-2's findings>  ← orchestrator ACCEPTS empty reviewer-1
```
This is the W325-A SEV-1 pattern. The guard FORBIDS this.

### Example 2 — empty-detection + re-dispatch (CORRECT)
```
Agent reviewer-1 completed.
Final message: <empty / tool_use only>
Guard fires: REJECT
Re-dispatch reviewer-1 with stricter output-format reminder.
Reviewer-1 now returns: "NO-FINDINGS:security-dimension-not-applicable-to-this-PR (no auth/crypto/network/secret-handling code in diff)"
Guard fires: ACCEPT (explicit sentinel)
Synthesis: merge reviewer-2's findings + record reviewer-1's NO-FINDINGS.
```

### Example 3 — escalation (2nd offense)
```
Agent debugger-3 completed (re-dispatched once already).
Final message: still empty.
Guard fires: ESCALATE.
TaskUpdate(debugger-3, status=FAILED-EMPTY-RESULT).
Surface to operator: "Agent debugger-3 returned empty result twice. Please review the agent's prompt for clarity, OR confirm the task is genuinely outside the agent's competence."
Do NOT include debugger-3 in synthesis.
```

## Anti-patterns the guard prevents

1. **Silent acceptance** — orchestrator merges empty results as if they were valid findings. Δ-G49 forbidden.
2. **Phantom synthesis** — orchestrator generates synthesis text "as if" it had real findings from the empty agent. Hallucination.
3. **"Idle = done"** — treating an unresponsive teammate as legitimately complete when their task-status is `completed` but final message is empty. Anti-pattern explicitly noted in `team-communication-protocols/SKILL.md:159-160`; the guard supersedes that text.

## Provenance

- W325-A F1 root-cause: silent-serial-fallback measurement `parallel_ratio=0.0036` over 1676 sessions / 30d.
- W330-MEGA-AUDIT D-agent-team-verification confirmed silent-fallback in 6 dimensions.
- W339-P0b 3-stream debug (this session): S1 found 5 silent-fallback locations in agent-teams plugin prose; S3 found 3-org-distinct external pattern convergence (Anthropic + Microsoft + LangChain all implement empty-result detection); both streams converge on Gap-1.
- Skill landed via cardinal-rule-4 operator-curated local-skill path per Anthropic-sanctioned `https://code.claude.com/docs/en/skills` retr 2026-05-20.

## Companion skills

- `parallel-dispatch-mandate` — W269 enforcement that 2+ independent workstreams MUST dispatch in parallel.
- `dispatching-parallel-agents-w321-fork` — adds context-budget hard-cap + mid-flight stream-error retry to the dispatch primitive itself.
- `dual-review` — cross-model gate that fires on the synthesized verdict before commit.
