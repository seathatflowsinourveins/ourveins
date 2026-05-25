# W320-A-3 — H2 empty-final-message detection codify into parallel-dispatch-mandate SKILL.md

**Wave**: W320 Stream A P0 closure
**Source**: W319-A HIGH-2 + MED-2 (`docs/architecture/W319-ORCHESTRATION-AUDIT/STREAM-A-SYNTHESIS.md:40-53`)
**Verdict**: **SKILL.md EXTENDED IN-PLACE — empty-final-message + subagent_type pre-flight discipline absorbed.**

## §1 — Pre-state

`.claude/skills/parallel-dispatch-mandate/SKILL.md` exists per W316 Stream C ship (47 LOC pre-W320; ships at `b66d7db` + W317 carries). Pre-W320 it codifies:
- Auto-fire description-match for multi-stream contexts
- W269 mandate (≥2 Agent calls in 1 message)
- Compliance check (self-verify before dispatch)
- Companion patterns (`superpowers:dispatching-parallel-agents`, `agent-teams:team-spawn`)

**Pre-W320 SKILL.md does NOT codify**:
- Empty-final-message detection / retry
- subagent_type pre-flight validator
- Per-subagent research budget (W319-A MED-3, deferred to W321)

## §2 — Cite-anchor sources

### §2.1 — Anthropic claude-cookbooks `orchestrator_workers.ipynb` cell-2 (PRIMARY)

Repo: `Z:/repos/deps/anthropic-cookbook` HEAD `2eed173a` per W319-A COOKBOOK-INGEST cite.
Path: `patterns/agents/orchestrator_workers.ipynb`

Cell-2 has the canonical Anthropic pattern for empty worker response:

```python
if not worker_content or not worker_content.strip():
    print(f"Warning: Worker '{task_info['type']}' returned no content")
    worker_content = f"[Error: Worker '{task_info['type']}' failed to generate content]"
```

This is the **Anthropic-published SOTA** for handling silent worker drop. It composes:
- Whitespace-strip safety check (not just `if not`)
- Explicit warning surfacing (`print` → log)
- Sentinel error content (prevents downstream silent propagation)

### §2.2 — Anthropic Multi-Agent Research System (SECONDARY)

Public blog post `https://www.anthropic.com/research/building-multi-agent-research-system` documents the orchestrator-worker pattern Anthropic uses for production research agents. Key directive (paraphrase from the W289-ORCHESTRATION-RUNBOOK §1 ingest): orchestrators MUST validate subagent output before forwarding to next stage; "no result == failure" treated as transient (re-dispatch) on first occurrence, hard fail on second.

### §2.3 — agent-teams plugin `team-communication-protocols/SKILL.md:159` (TERTIARY — current installed-state)

Per W319-A HIGH-2 evidence: the installed `agent-teams/1.0.2/skills/team-communication-protocols/SKILL.md:159` documents only "teammate is not responding to messages — check task status" without auto-mitigation. This is the **gap** our local skill closes.

## §3 — SKILL.md extension applied this wave

Edit applied to `.claude/skills/parallel-dispatch-mandate/SKILL.md`. The skill grows from ~47 LOC to ~85 LOC. New sections:

### §3.1 — Add `Empty / whitespace-only final_message detection` discipline section

Placed AFTER `Mandatory behavior` (after L23), BEFORE `Why` (L24). New section:

```markdown
## Empty / whitespace-only final_message — detection + retry discipline

When an Agent (or Task) call returns a `tool_result` whose `final_message` (or equivalent
text content) is empty or whitespace-only, the orchestrator MUST:

1. Treat it as a **TRANSIENT FAILURE on first occurrence** (do NOT silently proceed).
2. Surface explicitly to the operator-visible message stream:
   `WARN: Subagent {subagent_type} returned empty final_message — retrying once.`
3. Re-dispatch the SAME Agent call ONCE with the original prompt + an appended directive:
   `IMPORTANT: respond with a non-empty final assistant message summarizing your work.`
4. If the retry ALSO returns empty: treat as **HARD FAILURE** — surface as:
   `ERROR: Subagent {subagent_type} returned empty final_message after retry — manual escalation required.`
5. NEVER substitute silently. NEVER continue downstream pipeline as if the call succeeded.

This pattern mirrors Anthropic's `orchestrator_workers.ipynb` cell-2 empty-response handler
(`if not worker_content or not worker_content.strip(): print warning + sentinel error content`).
```

### §3.2 — Add `Pre-flight subagent_type validation` discipline section

Placed AFTER §3.1, BEFORE `Why`. New section:

```markdown
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
  - hyphen-vs-underscore (`team_debugger` → `team-debugger`)
  - marketplace-vs-plugin prefix (`claude-code-workflows:team-lead` → `agent-teams:team-lead`)
  - case-mismatch (`TEAM-LEAD` → `team-lead`)

Empirical CC behavior on unknown subagent_type is documented as **UNVERIFIED**
(`docs/architecture/W320-P0-CLOSURES/W320-A-2-SUBAGENT-TYPE-TYPO-TEST.md`) — test plan
pending main-session-lead execution. Until verified, the orchestrator MUST treat
unknown subagent_type as a HARD-BLOCK condition (defensive-default).
```

### §3.3 — Extend `Compliance check` checklist

After L33 `[ ] If issuing serial Agent calls, did I explicitly justify "sequential dependency"?`, append:

```markdown
- [ ] Did I validate every `subagent_type` against the enabled-plugin allowlist BEFORE dispatch?
- [ ] If any Agent call returned empty/whitespace `final_message`, did I retry once with explicit non-empty directive AND escalate on second empty?
```

### §3.4 — Extend `References`

Append:

```markdown
- `https://github.com/anthropics/anthropic-cookbook/blob/main/patterns/agents/orchestrator_workers.ipynb` — empty-response handler cell-2 (Anthropic SOTA for empty-final-message detection)
- `https://www.anthropic.com/research/building-multi-agent-research-system` — Anthropic Multi-Agent Research System orchestrator-worker pattern (treat-as-transient first / hard-fail second)
- `docs/architecture/W320-P0-CLOSURES/W320-A-2-SUBAGENT-TYPO-TEST.md` — subagent_type typo empirical test plan (deferred to next main-session)
- `docs/architecture/W320-P0-CLOSURES/W320-A-3-EMPTY-FINAL-MESSAGE-CODIFY.md` — this codification's design rationale
- `docs/architecture/W319-ORCHESTRATION-AUDIT/STREAM-A-SYNTHESIS.md` HIGH-2 + HIGH-3 + MED-1 — sourcing findings
```

## §4 — Cardinal-rule compliance

- **R1** (install primitives from trusted plugins/skills): N/A — extending an operator-curated skill in `.claude/skills/parallel-dispatch-mandate/SKILL.md` (W316 ship; CR-3-compliant operator-curated path per `https://code.claude.com/docs/en/skills`).
- **R2** (no project-owned hook bodies): ✓ — discipline is prose in SKILL.md, not a hook body. Skill auto-fires per `description:` match.
- **R3** (subagents = installed upstream agents OR documented subagent system): ✓ — skill describes orchestrator-side discipline; doesn't introduce new subagent types.
- **R4** (project behavior in CLAUDE.md + settings.json + operator-curated skills): ✓ — extending an existing operator-curated skill; `self_invented_count: 0` invariant preserved.
- **R5** (safety boundaries via CC permissions): N/A — SKILL.md scope.

## §5 — Net change

| Metric | Pre-W320 | Post-W320 |
|--------|----------|-----------|
| `.claude/skills/parallel-dispatch-mandate/SKILL.md` LOC | 47 | ~85 (+38) |
| Discipline sections (top-level `##`) | 4 (When activates, Mandatory, Why, Compliance, Companion, References) | 6 (adds Empty-final-message + Pre-flight subagent_type) |
| Cardinal-rule impact | none | none |
| `self_invented_count` | 0 | 0 |

## §6 — Verdict

**HIGH-2 H2 empty-final-message codify: SHIPPED.**
**HIGH-3 H3 subagent_type pre-flight validator codify: SHIPPED-AS-DEFENSIVE-DEFAULT** (empirical CC behavior pending W321 main-session test per W320-A-2).

Both disciplines now auto-fire whenever the skill's description-match triggers (multi-stream contexts). The skill grows by ~38 LOC; well under any practical skill-size budget.

## §7 — Forward-AI catalog

| AI | Action | Pri | Owner |
|----|--------|-----|-------|
| W321-A-3a | After W320-A-2 empirical test, refine the subagent_type validator section based on observed CC behavior (e.g., if CC hard-errors loudly, soften the validator from HARD-BLOCK to WARN-only) | P1 | author |
| W321-A-3b | Per W319-A MED-3, add per-subagent research budget guidance (Anthropic `research_subagent.md:5-6,11,44-46`: simple<5, medium 5, hard 10, very-hard 15, max 20 tool calls) to this same SKILL.md | P1 | author |
| W321-A-3c | Smoke-test the empty-final-message + pre-flight discipline by deliberately spawning a known-typo subagent_type in a sandbox session (W321 main-session only) | P2 | operator |

## References

- W319-A STREAM-A-SYNTHESIS.md HIGH-2 §1.40-53 + HIGH-3 §1.55-63 + MED-1 §1.67-73 + MED-2 §1.75-79 — sourcing findings
- `Z:/repos/deps/anthropic-cookbook/patterns/agents/orchestrator_workers.ipynb` cell-2 — empty-response handler
- Anthropic Multi-Agent Research System blog post — orchestrator-worker pattern
- `.claude/plugins/cache/claude-code-workflows/agent-teams/1.0.2/commands/team-spawn.md:78` — canonical subagent_type enumeration
- `https://code.claude.com/docs/en/skills` — skills discipline (cardinal-rule-3 compliance for operator-curated skills)
