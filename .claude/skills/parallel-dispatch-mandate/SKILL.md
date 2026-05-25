---
name: parallel-dispatch-mandate
description: W269 parallel-Agent-dispatch enforcement. Use when the user prompt contains 2+ independent workstreams, mentions "audit", "review", "research", "sweep", "fan-out", "in parallel", "Stream A/B/C", "investigate", "verify across", "compare", or asks for parallel work on independent files/dimensions. Fires BEFORE any Agent/Task tool call in multi-stream contexts.
---

# W269 Parallel-Dispatch Mandate (auto-fire)

## When this skill activates

Any user prompt where 2+ independent workstreams exist. Heuristic triggers:
- explicit "Stream A", "Stream B" enumeration
- "in parallel", "fan-out", "parallel sweep"
- "audit X across", "review N candidates", "research M sources"
- 2+ independent files / dimensions / repos named for investigation

## Mandatory behavior

When the orchestrator dispatches subagents for >=2 of these streams:
1. MUST issue 2+ Agent (or Task) tool_use blocks in a SINGLE assistant message.
2. MUST NOT issue them across separate assistant messages (silent-serial fallback).
3. Solo serial dispatch is only acceptable when streams have hard sequential dependencies - and the orchestrator MUST explicitly note "single-target dependent stream, parallel impossible".

## Empty / whitespace-only final_message - detection + retry discipline

When an Agent (or Task) call returns a `tool_result` whose `final_message` (or equivalent text content) is empty or whitespace-only, the orchestrator MUST:

1. Treat it as a **TRANSIENT FAILURE on first occurrence** (do NOT silently proceed).
2. Surface explicitly to the operator-visible message stream:
   `WARN: Subagent {subagent_type} returned empty final_message - retrying once.`
3. Re-dispatch the SAME Agent call ONCE with the original prompt + an appended directive:
   `IMPORTANT: respond with a non-empty final assistant message summarizing your work.`
4. If the retry ALSO returns empty: treat as **HARD FAILURE** - surface as:
   `ERROR: Subagent {subagent_type} returned empty final_message after retry - manual escalation required.`
5. NEVER substitute silently. NEVER continue downstream pipeline as if the call succeeded.

This pattern mirrors Anthropic's `orchestrator_workers.ipynb` cell-2 empty-response handler (`if not worker_content or not worker_content.strip(): print warning + sentinel error content`).

## F5 - Anthropic-cookbook empty-final-message detection (codified anti-pattern guard)

W325 Stream-A F5: codify Anthropic's `claude-cookbooks@2eed173a/patterns/agents/orchestrator_workers.ipynb` cell-2 detection guard explicitly into this skill. Parent orchestrators reading Agent tool results MUST perform this check on every `tool_result` before consuming the worker's output downstream:

```python
# Anthropic cookbook canonical pattern (orchestrator_workers.ipynb cell-2):
if not worker_content or not worker_content.strip():
    print("WARN: empty worker response - possible silent fallback")
    # MUST NOT silently substitute synthesized content.
    # MUST surface to operator-visible message stream.
    # MUST retry once with explicit non-empty directive (see Empty / whitespace-only handler above).
```

Mandatory orchestrator behavior:
1. Strip-and-test the worker `tool_result` text content (or `final_message` equivalent) before any consumption.
2. If empty/whitespace-only: surface `WARN: empty Agent response from {subagent_type} - possible silent fallback` to the message stream.
3. Do NOT pipeline-fill, do NOT silently retry without surfacing, do NOT proceed to next downstream step as if the worker produced output.
4. Mirror the retry+escalate ladder documented in the "Empty / whitespace-only final_message" section above.

Anti-pattern (FORBIDDEN):
- Consuming `worker.content[0].text` without first stripping and testing for emptiness.
- Inferring worker intent from absence-of-output (silent synthesis).
- Continuing downstream Agent dispatch chains with empty upstream as if successful.

Cite-anchor: `https://github.com/anthropics/claude-cookbooks` @ `2eed173a533a690eb70ab324614ce5350776a23a` path `patterns/agents/orchestrator_workers.ipynb` cell-2 lines defining the `if not worker_content or not worker_content.strip()` guard (foundation re-verified 2026-05-19 per W325-A freshness probe).

## F4 - NO repomix-pack inside forked subagent prompts (W325 root-cause)

W325 Stream-A F4: when dispatching subagents via `CLAUDE_CODE_FORK_SUBAGENT=1`, the forked subagent INHERITS the parent's full conversation transcript at the fork point. Embedding a `repomix-pack` output (50-200K tokens) into the dispatch prompt body therefore:

1. Saturates the ~600K fork context window with the inherited transcript PLUS the embedded pack PLUS the worker's own discoveries.
2. Produces a silent block / silent fallback condition where the worker either:
   - Exits with empty `final_message` (no observable error), OR
   - Truncates mid-thought and emits a partial result the parent mis-reads as complete.
3. Is empirically confirmed by W321 as the root-cause of multiple "agent team orchestration silent fallback" incidents documented in `docs/architecture/W319-ORCHESTRATION-AUDIT/`.

Mandatory orchestrator behavior:
1. NEVER embed `repomix pack_codebase` or `repomix pack_remote_repository` raw output inline in a fork-dispatched Agent prompt.
2. Instead, write the pack to disk in the parent session, pass the FILE PATH to the worker (the worker fetches/reads on-demand via `Read`/`Grep` against the pack file).
3. Prefer scoped Grep/Read in the worker over wholesale pack-ingestion. The fork inheritance already gives the worker the full parent transcript context for free.
4. If a repo-wide read is genuinely needed, instruct the worker to call `mcp__repomix__pack_codebase` ITSELF (its own context budget, not inherited from parent), or use `mcp__repomix__attach_packed_output` + `mcp__repomix__grep_repomix_output` for sliced access.
5. Budget check: parent transcript carry-over typically ranges 50K-300K tokens at fork-time. Adding a 100K+ pack to the prompt body crosses the silent-block threshold reliably.

Anti-pattern (FORBIDDEN):
- Pasting `<xml><file path=...>...</file>...</xml>` repomix output into an Agent prompt body.
- Pasting `cat` / large `Read` output dumps into an Agent prompt body when fork-mode is active.
- Trusting that `CLAUDE_CODE_FORK_SUBAGENT=1` "just works" with arbitrarily large prompt bodies - it does not, the inheritance is additive on top of the prompt, not a replacement.

Cite-anchor: `https://docs.anthropic.com/en/docs/claude-code/sub-agents` (forked subagent transcript-inheritance semantics) + W321 silent-block root-cause analysis + W325 Stream-A F4 codification rationale.

## Δ-PDM-1 — Skeleton-first-write protocol (W328 absorb of W321 P3)

When a subagent task involves >=5 research tool calls (`mcp__*search*`, `WebFetch`, `Read`-many-files) OR specifies a deliverable file path, the dispatch prompt MUST sequence the worker's CRITICAL EXECUTION PROTOCOL as:

1. PowerShell `mkdir` (or `Bash mkdir`) for the deliverable output directory.
2. `Write` a skeleton file with all `§N Section` headers + `TBD` placeholders (≤30 LOC) BEFORE any research tool call.
3. Research-and-`Edit` iteratively against the skeleton (never accumulate findings in scratch and write-once at end).
4. Return summary referencing the deliverable path.

Mandatory orchestrator behavior:
1. For research-heavy worker dispatch, the dispatch prompt MUST include the skeleton-first directive.
2. Verify worker complied by inspecting filesystem AFTER worker reports completion: skeleton file MUST exist even on partial-failure paths.
3. If skeleton-file absent AND the worker reports OK: treat as silent-block failure — re-dispatch with explicit skeleton-first reminder.

**Rationale**: W320 Stream A research-heavy agent died at 184k tokens with empty `final_message` (silent truncation). The retry succeeded SPECIFICALLY because the operator added "Write skeleton FIRST, then research" to the dispatch prompt — turning a binary success/fail into graceful degradation (skeleton survives even if mid-research dies).

**3-org-distinct cite-anchors**:
- `https://github.com/anthropics/claude-cookbooks/blob/main/patterns/agents/orchestrator_workers.ipynb` cell-2 — Anthropic PBC empty-response detection pattern
- `https://docs.crewai.com/concepts/processes#hierarchical-process` — CrewAI Inc `expected_output` schema mandate
- `https://github.com/anthropics/claude-code/issues/22143` — community-reported parallel-agent context-exhaust empirical evidence (closed dup of #16209)

## Δ-PDM-2 — Per-agent context-budget hard-cap (W328 absorb of W321 P3)

Every `Agent` (or `Task`) dispatch prompt MUST include an explicit budget directive:

```
BUDGET: <=K tool calls AND <=Mk total tokens.
If approaching 70% of either: write partial summary to skeleton + RETURN with STATUS: BUDGET-EXHAUST-PARTIAL.
```

Recommended defaults:
- Research-heavy:   K=15, M=140k
- Narrow-scope:     K=8,  M=80k
- Repomix-heavy:    K=25, M=200k

Anthropic's effective truncation cliff begins ~180k (200k soft cap); the 140k recommended ceiling preserves headroom for the final summary turn.

Mandatory orchestrator behavior:
1. Worker MUST self-monitor cumulative tokens via approximate counter (response-text length + prior turns).
2. On budget approach: abort research, flush partial findings to skeleton, return early with STATUS marker.
3. Orchestrator detects STATUS marker in `final_message` and treats as soft-failure → may retry with smaller scope OR accept partial-result.

**Rationale**: Anthropic Multi-Agent Research blog explicitly notes multi-agent systems use ~15× tokens of single-agent chat. Per-agent budget cap converts uncontrolled cost growth into deterministic spend. Aligns with `superpowers:subagent-driven-development` budget discipline.

**3-org-distinct cite-anchors**:
- `https://github.com/microsoft/autogen` — Microsoft AutoGen `TokenUsageTermination` + `MaxMessageTermination` (combinable via `&`/`|`); tracking via `_total_token_count` / `models_usage` field
- `https://www.anthropic.com/research/built-multi-agent-research-system` — Anthropic PBC 15× token-burn empirical anchor
- `https://rapidclaw.dev/blog/multi-agent-orchestration-patterns-2026` — Rapid Claw independent practitioner: "per-crew rate limits ... fan-out is #1 cause of runaway cost"

## Δ-PDM-3 — Mid-flight stream-error retry-with-checkpoint (W328 absorb of W321 P3)

Distinguish TWO failure modes:

| Mode | Detection | Retry semantics |
|---|---|---|
| (a) Empty `final_message` AFTER completion | length < 50 chars OR whitespace-only | Existing F5 handler covers — full re-dispatch with stricter directive |
| (b) Mid-flight `tool_result` interruption | `stream_error` / network-cut / API-interruption | NEW — resume from checkpoint, do NOT re-run completed tools |

For (b), the worker's already-executed tool calls may include expensive side-effects (file writes, MCP-server state mutations). The retry MUST:

1. Inspect the partial transcript / skeleton-on-disk for what completed.
2. Re-dispatch with EXPLICIT directive:

```
RESUME from checkpoint at: {deliverable_path}
Read partial work; do NOT re-run already-completed tools.
Fill REMAINING gaps only.
```

3. NEVER blindly re-dispatch with the original prompt unchanged (= duplicated tool-cost + potentially conflicting side-effects).

**Rationale**: W320 Stream D had a mid-flight `stream-error`. Without resume-from-checkpoint logic, the retry would have redundantly re-issued already-completed `pack_remote_repository` calls (~70% cost waste).

**3-org-distinct cite-anchors**:
- `https://langchain-ai.github.io/langgraph/concepts/low_level/#send` + `https://langchain-ai.github.io/langgraph/concepts/persistence/` — LangChain AI `Checkpointer` resume-from-state: "successfully completed nodes are not re-executed"
- `https://tianpan.co/blog/2026-04-23-mid-flight-steering-agent-redirect-without-restart` — Tian Pan independent: "correct work survives. You do not unwind seven tool calls because the eighth one was headed somewhere wrong"
- `https://github.com/anthropics/claude-code/issues/25818` — Anthropic community-reported orchestrator-treats-crashed-as-completed silent-PASS empirical evidence

## Pre-flight subagent_type validation

Before issuing any Agent (or Task) tool_use, validate `subagent_type` against the runtime allowlist:

- `general-purpose` (always valid)
- `{plugin-name}:{agent-name}` for every enabled plugin's agents:
  - source: `.claude/plugins/installed_plugins.json` (enabled-plugins list)
  - per plugin: `.claude/plugins/cache/{marketplace}/{plugin}/{version}/agents/*.md` front-matter `name:`

On unknown / misspelled `subagent_type`:
- DO NOT dispatch.
- Surface explicitly: `WARN: subagent_type '{X}' not in allowlist; nearest matches: {fuzzy_top3(X)}`.
- Common typo traps to detect by fuzzy-match:
  - hyphen-vs-underscore (`team_debugger` -> `team-debugger`)
  - marketplace-vs-plugin prefix (`claude-code-workflows:team-lead` -> `agent-teams:team-lead`)
  - case-mismatch (`TEAM-LEAD` -> `team-lead`)

Empirical CC behavior on unknown subagent_type is documented as **UNVERIFIED** (`docs/architecture/W320-P0-CLOSURES/W320-A-2-SUBAGENT-TYPE-TYPO-TEST.md`) - test plan pending main-session-lead execution. Until verified, the orchestrator MUST treat unknown subagent_type as a HARD-BLOCK condition (defensive-default).

## Why

- W312-D 1586-JSONL audit measured 29% silent-serial-fallback failure rate.
- W314 re-measurement (post W269-tightening in CLAUDE.md prose only) cited parallel_ratio 0.587 vs 0.584 baseline - no improvement from prose alone.
- **W325 Stream-A F1 SEV-1 (2026-05-19)**: empirical re-measurement via `tools/parallel-ratio-telemetry.mjs` exposed the 0.587 claim as a silent-fallback artifact - ACTUAL parallel_ratio_30d = **0.0038** (denom 1579, parallel turns 6). The cited 0.587 was ~154x inflated. Target >=0.30 floor per W325, with >=0.70 W269 ideal.
- W319-A HIGH-2 + HIGH-3 (empty-final-message silent drop + subagent_type typo trap) surface 2 NEW silent-fallback hazards beyond serial-fallback.
- **W325 F4 (NO repomix-pack inside fork) + F5 (empty-final-message detection codified)** address 2 additional silent-block failure modes traced to fork-context-saturation and missing cookbook-canonical empty-response handling.

## Compliance check (self-verify before any Agent dispatch)

- [ ] Does the prompt contain 2+ independent workstreams?
- [ ] If yes, am I issuing all Agent calls in ONE assistant message?
- [ ] If issuing serial Agent calls, did I explicitly justify "sequential dependency"?
- [ ] Did I validate every `subagent_type` against the enabled-plugin allowlist BEFORE dispatch?
- [ ] If any Agent call returned empty/whitespace `final_message`, did I retry once with explicit non-empty directive AND escalate on second empty?
- [ ] **F4**: Does any Agent prompt body embed `repomix-pack` raw output or other 50K+ token dumps? If yes, switch to disk-path passing or in-worker pack invocation.
- [ ] **F5**: Am I stripping-and-testing every worker `tool_result` for empty/whitespace content BEFORE consuming it downstream?

## Companion patterns

When this skill fires, ALSO consult:
- `superpowers:dispatching-parallel-agents` (Anthropic-shipped, identical pattern with different trigger surface)
- `agent-teams:team-spawn` (multi-stream preset like research|security|review|debug|feature|fullstack|migration)

## References

- `https://code.claude.com/docs/en/skills` - auto-fire description-match
- `https://docs.anthropic.com/en/docs/claude-code/sub-agents` - Agent tool fan-out semantics
- CLAUDE.md L19 - operator mandate
- `docs/architecture/W314-SILENT-FALLBACK-V5-AGENT-TEAM/W314-C-PARALLEL-RATIO-MEASUREMENT.md` - empirical baseline (0.587 measured, >=0.7 target)
- `docs/architecture/W314-SILENT-FALLBACK-V5-AGENT-TEAM/W314-C-PASTE-READY-MANDATE-REFINEMENTS.md` §Refinement #1 - paste-ready source
- `https://github.com/anthropics/anthropic-cookbook/blob/main/patterns/agents/orchestrator_workers.ipynb` cell-2 - Anthropic SOTA empty-response handler
- `https://www.anthropic.com/research/building-multi-agent-research-system` - Anthropic Multi-Agent Research System orchestrator-worker pattern
- `docs/architecture/W319-ORCHESTRATION-AUDIT/STREAM-A-SYNTHESIS.md` HIGH-2 + HIGH-3 - sourcing findings
- `docs/architecture/W320-P0-CLOSURES/W320-A-2-SUBAGENT-TYPE-TYPO-TEST.md` - subagent_type empirical test plan
- `docs/architecture/W320-P0-CLOSURES/W320-A-3-EMPTY-FINAL-MESSAGE-CODIFY.md` - this codification's design rationale
- `tools/parallel-ratio-telemetry.mjs` - W325-A telemetry tool computing parallel_ratio from session JSONLs (F1 SEV-1 empirical baseline = 0.0038)
- `https://github.com/anthropics/claude-cookbooks` @ `2eed173a533a690eb70ab324614ce5350776a23a` `patterns/agents/orchestrator_workers.ipynb` cell-2 - F5 canonical anti-pattern guard source
- `docs/architecture/W325-STREAM-A/` (when W325 ships) - F4 NO-repomix-in-fork + F5 codify rationale + F1 SEV-1 silent-fallback exposure
