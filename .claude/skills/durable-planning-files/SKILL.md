---
name: durable-planning-files
description: Use for complex multi-session tasks that need cross-session memory durability beyond TodoWrite — maintains `task_plan.md` + `findings.md` + `progress.md` in the working directory. Use when the task spans multiple sessions, requires preserving accumulated research findings across compaction boundaries, OR when a discovered pattern/decision needs explicit human-readable persistence. Do NOT use for ordinary single-session work (use native TodoWrite); do NOT use for ledgered architectural decisions (use VERDICT-LEDGER.md + T6 basic-memory).
---

# durable-planning-files — Operator-Curated Pattern Skill

> **Status**: operator-curated path-gated skill (per R4 REVERSAL W308 at commit `609cba0`).
>
> **Origin**: codex r2 (W308 2026-05-19) recommendation following the convergent DEACTIVATE verdict on `OthmanAdi/planning-with-files` (4-of-5 Phase-5 FAIL) and `trailofbits/skills-curated/plugins/planning-with-files` curated fork (T3 PATTERN-STUDY; 3-persona 3/3 REJECT default-install).
>
> **Pattern preservation rationale**: the PLUGIN was rejected (license ambiguity + maintenance unproven + duplication vs TodoWrite + benchmark non-applicable after hook-drop), but the underlying 3-file durable-planning IDEA is operationally valuable. This skill captures the pattern WITHOUT plugin dependency.
>
> **Cite-anchors**: `docs/architecture/W308-PATTERN2-PWF-SOTA-DISCOVERY/W308-CODEX-R2-TRAILOFBITS-AUDIT.md §7 pattern extraction` + `VERDICT-LEDGER.md row 32` + `verdicts/W308 codex r2 — trailofbits-skills-curated PWF.md`.

## When to invoke

Use this skill when:
- The task naturally spans multiple sessions (e.g. multi-day investigation, multi-wave refactor, complex research synthesis)
- TodoWrite-scoped lists would be lost at session compaction OR across `/compact` cycles
- Accumulated findings need a human-readable artifact (not just ledger row)
- Decision-trail discipline is required AND no single existing artifact captures it

Do NOT use this skill when:
- TodoWrite is sufficient (most ordinary work)
- A formal verdict is the goal (use sca-v5 audit + VERDICT-LEDGER.md + T6 basic-memory)
- The work is single-file or single-commit (just commit the change)

## The 3-file pattern

Maintain ALL THREE files at the working directory root OR a wave-scoped subdirectory (e.g. `docs/architecture/W<N>-<topic>/`):

### 1. `task_plan.md` — what we're doing + why

- One-paragraph problem statement
- Numbered task list (≤10 items at any time)
- Per-task: status (TODO / IN-PROGRESS / DONE / BLOCKED), owner (if multi-agent), dependency
- Decision points: explicit fork points with consider-X / decide-Y / record-Z

Example skeleton:
```markdown
# Task plan — <wave/feature name>

## Problem
<1-2 sentences>

## Tasks
1. [DONE] Investigate X — owner: agent-A — output: docs/X.md
2. [IN-PROGRESS] Audit Y — owner: agent-B — depends on (1)
3. [TODO] Decide Z — depends on (2)

## Decision points
- D1 (2026-05-19): chose option B over A because <reason>; cite W306 audit row 4
```

### 2. `findings.md` — what we've learned

- Append-only log of empirical findings
- Each entry: date + 1-line claim + cite-anchor (file:line OR URL)
- Surface contradictions (don't overwrite; add new entry with `SUPERSEDES <prior-date>` tag)

Example skeleton:
```markdown
# Findings — <wave/feature name>

## 2026-05-19
- F1: Phoenix MCP backend DOWN at :16006 (curl returns 000); Langfuse :3000 healthy (HTTP 200). Cite: live probe + W308-CODEX-R1 §1.3.
- F2: basic-memory uvx works in bash; codex sandbox env-specific failure on `sdists-v9/.git` ACL. Cite: W308-CODEX-R1 §1.1.

## 2026-05-20 [SUPERSEDES 2026-05-19 F1]
- F1-rev: Phoenix backend confirmed restart-failed (operator attempt); recommend DEACTIVATE permanently. Cite: <operator-note-cite>.
```

### 3. `progress.md` — what's left

- Snapshot of the queue (carry-over items + new operator-actions)
- Owner-decision items vs autonomous-action items
- Reverify-due timestamps (e.g. "W310 wave-end" for default-deactivate triggers)

Example skeleton:
```markdown
# Progress — <wave/feature name>

## Operator-decisions pending
1. PWF DEACTIVATE/RATIFY — default DEACTIVATE if W310 no decision (W308-Stream-B verdict)
2. OpenSpace HYBRID-pilot — codex DEFER; operator confirm

## Autonomous-action queue
1. APPLY het-ensemble diff (codex r4 ratified) — done at HEAD <SHA>
2. Author durable-planning-files SKILL.md — done at HEAD <SHA>

## Reverify-due
- W310: PWF default-deactivate trigger if no operator decision
- W312: OpenSpace re-litigation
```

## Lifecycle

1. **Create**: when task starts, write all 3 files in the working dir.
2. **Maintain**: update on EVERY meaningful state change (every codex pass / every commit / every operator-decision).
3. **Reference**: subsequent sessions read these 3 files FIRST before continuing.
4. **Retire**: when task completes, MERGE into the wave-AUDIT.md synthesis OR a basic-memory T6 verdict OR a VERDICT-LEDGER row. Delete the 3 files (their content is preserved in the merged artifact + git history).

## Compaction / session-boundary discipline

When `/compact` fires OR a new session starts:
- The 3 files persist on disk (gitignored only if scratch; tracked if shippable)
- Next session reads them via `Read` tool to bootstrap context
- This pattern survives WHERE TodoWrite does not (TodoWrite is in-session state)

## Anti-patterns

- **Don't auto-create for every task** — overhead exceeds benefit for single-session work
- **Don't duplicate VERDICT-LEDGER** — ledger captures sca-v5 audit decisions; this captures IN-FLIGHT working state
- **Don't capture secrets** — these files may be committed; treat as public-readable
- **Don't let `findings.md` grow unbounded** — at >500 LOC, retire to a wave-AUDIT synthesis
- **Don't use as a TodoWrite replacement** for atomic in-session work

## Comparison vs alternatives

| Alternative | When to use | When this skill wins |
|---|---|---|
| TodoWrite (native) | Single-session ordinary work | Multi-session OR survives /compact |
| OthmanAdi/planning-with-files plugin | (REJECTED W308 — see VERDICT-LEDGER row 31) | Always — this skill avoids plugin dependency |
| Trail of Bits curated PWF fork | (REJECTED W308 — see VERDICT-LEDGER row 32) | Always — this skill drops hook complexity |
| VERDICT-LEDGER.md row | Final sca-v5 audit decisions | In-flight working state |
| T6 basic-memory note | Per-verdict canonical record | Working state across many verdicts |

## Cardinal-rule conformance

- R1 ✓ (no plugin install; no MCP server)
- R2 ✓ (no hook bodies; pure pattern)
- R3 ✓ (no subagent invocation)
- R4 REVERSED W308 ✓ (this is operator-curated path-gated; SKILL.md activation explicit)
- R5 ✓ (no custom guard scripts)
- W286 P0C ✓ (no MCP version pin needed)
- `self_invented_count: 0` invariant: this skill DOES count as an operator-authored artifact, but it's R4-whitelisted (path-gated via SKILL.md activation + R4 reversal). NOT an auto-fire prompt body.

## Tags

#W308 #operator-curated #pattern-skill #PWF-replacement #durable-planning #multi-session #R4-reversed
