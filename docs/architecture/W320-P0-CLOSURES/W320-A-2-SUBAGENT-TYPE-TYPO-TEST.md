# W320-A-2 — H3 subagent_type typo empirical test plan + documented behavior

**Wave**: W320 Stream A P0 closure
**Source**: W319-A HIGH-3 (`docs/architecture/W319-ORCHESTRATION-AUDIT/STREAM-A-SYNTHESIS.md:55-63`)
**Constraint**: This Stream A is itself a subagent — CC enforces **no-nested-teams** per W318-A §2. Therefore Stream-A cannot empirically dispatch `Agent(subagent_type=...)` from inside its own context to observe behavior. Empirical test MUST be executed by main-session-lead in a follow-up wave.

**Verdict**: **DOCUMENTED-BEHAVIOR-UNAVAILABLE — main-session test plan codified below.**

## §1 — Documented-behavior search (the part Stream-A CAN do)

### §1.1 — Anthropic CC sub-agents docs

Search of `https://docs.anthropic.com/en/docs/claude-code/sub-agents` (per CLAUDE.md L3 cite-anchor; doc loaded indirectly via `docs/architecture/W289-ORCHESTRATION-RUNBOOK-2026-05-18.md` ingest):

- Doc defines `subagent_type` as a parameter to the `Agent` tool, accepting either `general-purpose` or a plugin-namespaced agent identifier like `agent-teams:team-implementer`.
- **No section explicitly documents behavior on unknown/misspelled `subagent_type`.** Doc does not cover:
  - Hard-error case (CC refuses to dispatch)
  - Silent-fallback case (CC silently substitutes `general-purpose`)
  - Warning case (CC logs warning, proceeds with fallback)

This documentation gap is exactly the operator-facing silent-fallback hazard W319-A HIGH-3 flagged.

### §1.2 — agent-teams plugin (`claude-code-workflows/agent-teams/1.0.2/`) search

Search via `grep -rn "subagent_type" .claude/plugins/cache/claude-code-workflows/agent-teams/1.0.2/`:

| File | Cite |
|------|------|
| `commands/team-debug.md:44` | `subagent_type: "agent-teams:team-debugger"` (canonical hyphen form) |
| `commands/team-feature.md:69` | `subagent_type: "agent-teams:team-implementer"` |
| `commands/team-review.md:32` | `subagent_type: "agent-teams:team-reviewer"` |
| `commands/team-spawn.md:78` | enumerates canonical types: `agent-teams:team-lead`, `agent-teams:team-implementer`, `agent-teams:team-reviewer`, `agent-teams:team-debugger`, or `general-purpose` |
| `skills/team-composition-patterns/references/agent-type-selection.md:3` | "Decision matrix for choosing the right `subagent_type`" |
| `skills/team-composition-patterns/SKILL.md:81` | "When spawning teammates with the `Agent` tool, choose `subagent_type` based on what tools the teammate needs" |
| `skills/team-composition-patterns/SKILL.md:124` | "Change the `subagent_type` to `general-purpose` or an appropriate specialized agent type" |

**Search for typo/unknown/invalid/fallback handling**: grep `unknown subagent | invalid subagent | fallback general-purpose | typo` → **0 hits**. The plugin documents only the happy path. No error/fallback handling is documented within the agent-teams plugin surface.

### §1.3 — anthropic-cookbook `orchestrator_workers.ipynb` cell-2 (the closest documented analogue)

Per W319-A HIGH-2 finding, Anthropic's cookbook cell-2 has explicit handling for a related-but-different failure mode (empty worker response, not unknown subagent type):

```python
if not worker_content or not worker_content.strip():
    print(f"Warning: Worker '{task_info['type']}' returned no content")
    worker_content = f"[Error: Worker '{task_info['type']}' failed to generate content]"
```

**Mapping**: this is a `final_message`-empty trap, not a `subagent_type`-unknown trap. They are **complementary** silent-fallback hazards. The cookbook does not address `subagent_type` typo separately.

## §2 — Why Stream-A cannot empirically test

Per W318-A §2 + Anthropic CC docs: **subagent contexts cannot spawn further Agent calls** (the "no nested teams" architectural constraint). This Stream A is dispatched from main-session-lead as a single subagent; it has access to Bash + Read + Edit + Write + Grep + Glob tools but **not the Agent/Task tool** for further fan-out.

Empirical observation of CC's behavior on `Agent(subagent_type="agent-teams:team_debugger" /* underscore typo */)` requires the **main-session-lead** to:
1. Issue the call with a deliberately misspelled type
2. Observe whether CC returns a tool-result with an error, returns a tool-result with content from `general-purpose`, or some hybrid (warning + content)
3. Confirm via the tool-result `tool_use_id` + result payload structure

## §3 — Test plan for main-session-lead (CANONICAL — execute next session)

### §3.1 — Test cases (4 deliberate typos + 1 control)

| # | `subagent_type` value | Expected (per docs) | Hypothesis |
|---|------------------------|---------------------|------------|
| C1 | `general-purpose` (control) | Valid; CC dispatches | PASS — establishes baseline |
| T1 | `agent-teams:team_debugger` (underscore vs hyphen) | UNDOCUMENTED | Likely silent-fallback to `general-purpose` (operator concern) |
| T2 | `agent-teams:team-debuggerXXX` (suffix garbage) | UNDOCUMENTED | Hypothesis: hard error, but unproven |
| T3 | `claude-code-workflows:team-lead` (marketplace-prefix instead of plugin-prefix) | UNDOCUMENTED | Hypothesis: silent-fallback (W319-A MED-1 prefix-confusion) |
| T4 | `agent-teams:TEAM-LEAD` (case-mismatch) | UNDOCUMENTED | Hypothesis: silent-fallback OR hard error |

### §3.2 — Execution protocol

For each test case, the main-session-lead dispatches **one single-purpose Agent call** with a trivially-completable task (e.g., "Reply `OK` and stop"). The test observes:

1. **Tool-result presence**: did the Agent call return a `tool_result` block?
2. **Tool-result content**: if returned, did the body show evidence of which `subagent_type` ran?
   - `general-purpose`-fallback fingerprint: replies in default style; no plugin-specific preamble
   - typed-agent fingerprint: replies with role-specific framing (e.g., `team-debugger` opens with "Let me investigate this bug...")
3. **Error path**: did the Agent call surface a `tool_use_failed` or equivalent error event?
4. **JSONL trace**: post-test, inspect `Z:\claude-sota-installed-state\.claude\projects\<session>.jsonl` for the matching `tool_use` + `tool_result` pair to confirm raw structure (note: W319-D STALE-D-7 + W314-r1-C F-SS-1 PROJECT_DIR state-redirect SILENTLY BROKEN — actual JSONL may be at in-tree `.claude/projects/<session>.jsonl` instead).

### §3.3 — Expected outcomes matrix

| Outcome | T1 | T2 | T3 | T4 | Mitigation needed |
|---------|----|----|----|----|--------------------|
| Hard error (loud failure) | LOUD | LOUD | LOUD | LOUD | None — already loud, operator sees the typo |
| Silent fallback to `general-purpose` | SILENT | SILENT | SILENT | SILENT | **Pre-flight validator MANDATORY** in `parallel-dispatch-mandate` skill |
| Mixed (some hard-error, some silent) | varies | varies | varies | varies | Pre-flight validator MANDATORY |
| Warning + fallback | SOFT | SOFT | SOFT | SOFT | Pre-flight validator RECOMMENDED |

### §3.4 — Pre-flight validator design (codify in `parallel-dispatch-mandate` SKILL.md regardless of test outcome)

Per W319-A operator-AI #3 (P0): regardless of CC's actual behavior, the **belt-and-suspenders** approach is to validate `subagent_type` BEFORE issuing the Agent tool call. Validator algorithm:

```
1. allowlist = {"general-purpose"} ∪ {
    "{plugin-name}:{agent-name}" for each
    (plugin-name, agent-name) ∈ scan_agents()
  }
2. scan_agents():
    a. read .claude/plugins/installed_plugins.json — extract enabled plugin names
    b. for each enabled plugin in cache:
       - list .claude/plugins/cache/{marketplace}/{plugin}/{version}/agents/*.md
       - extract front-matter `name:` field for each
       - emit ("{plugin-name}:{name}", path)
3. on Agent(subagent_type=X):
    if X not in allowlist:
        # Surface to orchestrator (this skill is auto-fire context)
        log_warning: "subagent_type '{X}' not in allowlist; nearest matches: {fuzzy_top3(X)}"
        BLOCK the call (return early) UNLESS operator explicitly overrides
```

**Design notes**:
- The validator is a **pre-flight check at the orchestrator-prompt level**, NOT a project-owned hook body (cardinal-rule-2 compliant).
- Codify as a skill-level **discipline directive** in `parallel-dispatch-mandate/SKILL.md`, augmenting the existing `Compliance check` section.
- Fuzzy matching (`fuzzy_top3`) suggests likely typos: e.g., `team_debugger` → suggests `team-debugger` based on hyphen/underscore swap.

## §4 — Recommended W320 closure (this wave)

**Action**: Document this test plan (this file) + extend `parallel-dispatch-mandate/SKILL.md` with the pre-flight validator discipline (covered by W320-A-3 alongside empty-final-message detection).

**Empirical test**: deferred to next main-session opportunity (next operator-driven session window where main-session-lead can dispatch a 5-call empirical test in one turn). Recommended placement: at the start of W321 session, before any other work.

**Cost**: 5 single-purpose Agent calls + JSONL inspection. ~15 min wall-clock.

## §5 — Forward-AI catalog

| AI | Action | Pri | Owner |
|----|--------|-----|-------|
| W321-A-2a | Main-session-lead executes the §3 test plan (5 cases) and records results in `docs/architecture/W321-*/STREAM-A-SUBAGENT-TYPO-EMPIRICAL.md` | P0 | parent |
| W321-A-2b | Based on §3 outcomes, finalize the pre-flight validator in `parallel-dispatch-mandate/SKILL.md` (extend the W320-A-3 placement with concrete allowlist-scan steps) | P1 | author |
| W321-A-2c | Optional: file upstream Anthropic CC doc-gap issue requesting documentation of unknown-subagent-type behavior | P3 | operator |

## §6 — Verdict

**HIGH-3 H3 subagent_type typo trap: TEST-PLAN-CODIFIED, EMPIRICAL-DEFERRED.** The pre-flight validator design is ready to absorb into the skill regardless of test outcome (defensive design). Stream-A's no-nested-teams constraint is the **correct** architectural reason for deferring — not a stream failure.

## References

- W319-A STREAM-A-SYNTHESIS.md HIGH-3 §1.55-63 — original finding
- W318-A §2 — no-nested-teams architectural constraint
- agent-teams plugin v1.0.2 `commands/team-spawn.md:78` — canonical type enumeration
- `https://docs.anthropic.com/en/docs/claude-code/sub-agents` — CC sub-agent docs (doc-gap: unknown-type behavior unspecified)
- W319-D STALE-D-7 — PROJECT_DIR state-redirect silently broken (affects JSONL trace location)
