# W362c — Phase 0 Contract Validation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use `superpowers:subagent-driven-development` (recommended) or `superpowers:executing-plans` to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Empirically validate the 4 contracts (P0.1 WorktreeCreate semantics · P0.2 Composio AO yaml schema · P0.3 codex_gate_passed predicate viability · P0.4 inactivity/observability sink shape) from the umbrella spec §3.5 before W363/W365/W366 design freezes, producing a verdict report at `docs/architecture/W362c-PHASE-0-CONTRACT-VALIDATION.md` that updates the umbrella spec.

**Architecture:** Pure research + decision-making wave. No code changes to runtime. Each P0 contract gets a probe (read upstream docs / fetch GitHub examples) → decide → record verdict + cite-anchor in a single report. Outcomes feed back into the umbrella spec as r6 edits unlocking W363 / W365 / W366.

**Tech Stack:** WebFetch (Anthropic docs + Composio AO GitHub), Read (umbrella spec), Edit (umbrella spec status update + r6 row), Write (W362c report). No new tooling. No git worktree (runs in current `w348-sota-fix-p5b` checkout; ~0.5 day).

**Reference:** Umbrella spec `docs/superpowers/specs/2026-05-21-sota-parallel-workflow-design.md` (r5 APPROVED 2026-05-21, commit `10f8f2f`).

---

## File Structure

Files created or modified by this plan:

| File | Action | Responsibility |
|---|---|---|
| `docs/architecture/W362c-PHASE-0-CONTRACT-VALIDATION.md` | Create | Verdict report — one section per P0 with evidence + decision + cite-anchor |
| `docs/superpowers/specs/2026-05-21-sota-parallel-workflow-design.md` | Modify (r6 edits) | Update status line, footer, review-history table with W362c verdict; update §3.5 P0.1–P0.4 with "RESOLVED" markers + decisions; update §6.2 (yaml + bridges) if P0.2/P0.3 outcomes require Path A vs Path B switching |

No new tools, scripts, or skills. No runtime config changes. No new MCP servers. No git worktree changes.

---

## Task 1: P0.1 — `hooks.WorktreeCreate` semantics validation

**Why:** Umbrella spec §3.5 P0.1 must conclusively determine whether `hooks.WorktreeCreate` fires for manual `git worktree add` (which would let it copy `.worktreeinclude` automatically) OR only for `claude --worktree` / subagent worktree isolation (which means manual worktree creation can't use it). Current spec stance (§5.1) assumes the latter and gives eee.ps1 full ownership; this task confirms or refutes that assumption with cited evidence.

**Files:**
- Create section: `docs/architecture/W362c-PHASE-0-CONTRACT-VALIDATION.md` → §P0.1
- Reference only: `docs/superpowers/specs/2026-05-21-sota-parallel-workflow-design.md:§3.5` (umbrella spec P0.1 row), `:§5.1` (eee.ps1-owned worktree-creation flow)

- [ ] **Step 1: Fetch Anthropic hooks documentation**

Run:
```
WebFetch url=https://code.claude.com/docs/en/hooks prompt="Quote the WorktreeCreate hook section in full. What triggers it: only `claude --worktree` flag and subagent worktree isolation, or also manual `git worktree add` from outside CC? Does it REPLACE default git behavior (i.e. when configured, CC does not run `git worktree add` itself and expects the hook to do it)? Capture exact wording."
```

Expected: hook section text with trigger conditions + replace-default semantics.

- [ ] **Step 2: Fetch Anthropic worktrees documentation**

Run:
```
WebFetch url=https://code.claude.com/docs/en/worktrees prompt="Quote any section discussing `.worktreeinclude`. When is .worktreeinclude processed: is it ONLY when `--worktree` flag is used and the default git behavior is in effect, or is it also applied for manual `git worktree add`? Quote any caveat about WorktreeCreate hook making .worktreeinclude inert."
```

Expected: `.worktreeinclude` semantics text + WorktreeCreate-inert caveat (or absence thereof).

- [ ] **Step 3: Write §P0.1 of the W362c report**

Edit / create `docs/architecture/W362c-PHASE-0-CONTRACT-VALIDATION.md` and append:

```markdown
## P0.1 — hooks.WorktreeCreate semantics

**Question:** Does `hooks.WorktreeCreate` fire for manual `git worktree add`, or only `claude --worktree` / subagent worktree isolation? Does it REPLACE default git creation behavior?

**Evidence:**
- Anthropic hooks doc (https://code.claude.com/docs/en/hooks) — quoted in this section.
- Anthropic worktrees doc (https://code.claude.com/docs/en/worktrees) — quoted in this section.

**Quoted excerpts:**

> [paste verbatim hook trigger conditions from Step 1]

> [paste verbatim .worktreeinclude semantics from Step 2]

**Verdict:** [WorktreeCreate-only-for-`claude --worktree`-and-subagents AND replaces-default-git ] / [WorktreeCreate-also-for-manual-git-worktree-add AND does-not-replace-default-git ] — pick ONE based on the evidence quoted.

**Decision for umbrella spec:** [If verdict is "only-claude-worktree-and-replaces-default" → §5.1 stance HOLDS (eee.ps1-owned creation, no hook). If verdict is "also-fires-for-manual" → re-open §5.1 design.]
```

- [ ] **Step 4: Verify §P0.1 is internally consistent**

Run:
```
Grep pattern="Verdict:|Decision for umbrella spec:" path="docs/architecture/W362c-PHASE-0-CONTRACT-VALIDATION.md"
```

Expected: 1 verdict line + 1 decision line for §P0.1.

- [ ] **Step 5: Commit P0.1**

```bash
git add docs/architecture/W362c-PHASE-0-CONTRACT-VALIDATION.md
git commit -m "docs(W362c): P0.1 WorktreeCreate semantics validated

Per umbrella spec §3.5 P0.1, validated WorktreeCreate hook
semantics against upstream Anthropic docs. Quoted source
excerpts inline. Verdict + umbrella-spec decision recorded.

Codex-Verdict: BOOTSTRAP"
```

Note: trailer is `BOOTSTRAP` because this commit is a research artifact establishing W362c, not implementation code subject to W331 adversarial-review gate.

---

## Task 2: P0.2 — Composio AO `agent-orchestrator.yaml` schema validation

**Why:** Umbrella spec §6.2 currently uses an illustrative yaml that codex round 1 flagged as schema-invalid. P0.2 must capture the REAL schema from the Composio AO public example before W365/W366 freeze the bridge config. Determines whether `reactions[].if: <predicate>` is a supported extension point (Path A) or fixed shape (Path B).

**Files:**
- Append section: `docs/architecture/W362c-PHASE-0-CONTRACT-VALIDATION.md` → §P0.2
- Reference only: `docs/superpowers/specs/2026-05-21-sota-parallel-workflow-design.md:§6.2`

- [ ] **Step 1: Fetch Composio AO README**

Run:
```
WebFetch url=https://github.com/ComposioHQ/agent-orchestrator prompt="Quote the README section describing agent-orchestrator.yaml configuration. List the top-level keys (port, defaults, projects, notifiers, reactions, etc.). Identify the reaction-map shape: does it support `reactions[].if: <predicate>` for custom predicates, or only named reactions like `approved-and-green.auto/action`?"
```

Expected: README text with top-level yaml keys + reaction shape.

- [ ] **Step 2: Fetch the canonical example yaml**

Run:
```
WebFetch url=https://raw.githubusercontent.com/ComposioHQ/agent-orchestrator/main/agent-orchestrator.yaml.example prompt="Return the full yaml file contents verbatim. Do not summarize."
```

Expected: full yaml example with real schema. If the URL 404s, try alternatives:
- `https://github.com/ComposioHQ/agent-orchestrator/blob/main/agent-orchestrator.yaml.example`
- `https://github.com/ComposioHQ/agent-orchestrator/blob/main/examples/agent-orchestrator.yaml`
- `https://github.com/ComposioHQ/agent-orchestrator/blob/main/packages/core/agent-orchestrator.yaml.example`

If none work, capture the README's inline yaml block instead.

- [ ] **Step 3: Fetch SETUP.md (plugin slots table)**

Run:
```
WebFetch url=https://github.com/ComposioHQ/agent-orchestrator/blob/main/SETUP.md prompt="Quote the Plugin Slots table — list each of the 8 slots (Runtime, Agent, Workspace, Tracker, SCM, Notifier, Terminal, Lifecycle) and their valid values."
```

Expected: 8-slot table with allowed values per slot.

- [ ] **Step 4: Write §P0.2 of the W362c report**

Append to `docs/architecture/W362c-PHASE-0-CONTRACT-VALIDATION.md`:

```markdown
## P0.2 — Composio AO agent-orchestrator.yaml schema

**Question:** What is the real schema of `agent-orchestrator.yaml`? Does `reactions[].if: <predicate>` (custom predicate) exist, or only named reactions like `approved-and-green.auto/action`?

**Evidence:**
- README quote (Step 1) — top-level keys + reaction-map shape.
- Canonical example yaml (Step 2) — full content embedded below.
- SETUP.md plugin-slots table (Step 3) — 8-slot taxonomy.

**Top-level yaml keys (actual):**

[paste verbatim list from Step 1 / Step 2]

**Reaction-map shape:**

[paste verbatim reaction syntax from README/example]

**Canonical example yaml (verbatim, full content):**

```yaml
[paste full yaml from Step 2]
```

**Plugin slots (verbatim from SETUP.md):**

| Slot | Allowed values |
|---|---|
[paste table from Step 3]

**Verdict on custom predicates:** [SUPPORTED → Path A in umbrella §6.2 viable] / [NOT SUPPORTED → Path B required: AO auto-merge DISABLED, bridge owns merge after codex PASS].

**Decision for umbrella spec:** [If SUPPORTED → §6.2 yaml updated with real schema + reactions[].if path preserved. If NOT SUPPORTED → §6.2 yaml updated with real schema + reactions[].if line removed + Path B made explicit default.]
```

- [ ] **Step 5: Verify §P0.2 is internally consistent**

Run:
```
Grep pattern="Verdict on custom predicates:|Decision for umbrella spec:" path="docs/architecture/W362c-PHASE-0-CONTRACT-VALIDATION.md"
```

Expected: 1 verdict + 1 decision line for §P0.2 (in addition to §P0.1's pair).

- [ ] **Step 6: Commit P0.2**

```bash
git add docs/architecture/W362c-PHASE-0-CONTRACT-VALIDATION.md
git commit -m "docs(W362c): P0.2 Composio AO yaml schema captured

Per umbrella spec §3.5 P0.2, fetched Composio AO public README +
canonical example yaml + SETUP.md plugin-slots table. Embedded
verbatim. Verdict on custom-predicate support recorded; umbrella
spec §6.2 yaml will be rewritten with real schema in Task 5.

Codex-Verdict: BOOTSTRAP"
```

---

## Task 3: P0.3 — `codex_gate_passed` predicate viability decision

**Why:** Umbrella spec §6.2 ships TWO paths (Path A custom-predicate / Path B bridge-owned merge); only one survives based on P0.2 outcome. P0.3 records the explicit choice + the workflow contract for whichever path wins.

**Files:**
- Append section: `docs/architecture/W362c-PHASE-0-CONTRACT-VALIDATION.md` → §P0.3
- Reference only: `docs/superpowers/specs/2026-05-21-sota-parallel-workflow-design.md:§6.2` (bridges table Path A/Path B description)

- [ ] **Step 1: Read §P0.2 verdict from the W362c report**

Run:
```
Read file_path="docs/architecture/W362c-PHASE-0-CONTRACT-VALIDATION.md" offset=<P0.2 section line>
```

Capture the verbatim verdict line from §P0.2.

- [ ] **Step 2: Write §P0.3 of the W362c report**

Append to `docs/architecture/W362c-PHASE-0-CONTRACT-VALIDATION.md`:

```markdown
## P0.3 — codex_gate_passed predicate viability

**Question:** Given P0.2's verdict on custom predicates, does the codex Stop-gate use Path A (AO predicate) or Path B (bridge-owned merge)?

**Input:** P0.2 verdict — [quote verbatim from §P0.2 verdict line].

**Decision tree:**

- IF P0.2 verdict = SUPPORTED → **Path A wins**:
  - Stop-hook writes `.claude/state/codex-gate-W<wave>.json` with `{verdict: "APPROVE"|"BLOCK", round_1_findings: [...], round_2_findings: [...], timestamp}`.
  - AO config uses `reactions: approved-and-green: { if: codex_gate_passed, action: auto-merge }` (real schema syntax from §P0.2).
  - Bridge `tools/composio-bridge.mjs` exposes the predicate by reading the verdict file via daemon-token-scoped read.
  - AO auto-merge fires only when both `pr.review.green` AND `codex_gate_passed=true`.

- IF P0.2 verdict = NOT SUPPORTED → **Path B wins**:
  - AO config's `approved-and-green` reaction is DISABLED entirely (or its `action: auto-merge` removed).
  - Bridge `tools/composio-bridge.mjs` subscribes to BOTH the `pr.review.green` webhook AND watches `.claude/state/codex-gate-W<wave>.json` PASS-verdict file.
  - On BOTH-conditions-true, the bridge invokes `gh pr merge --merge --auto <pr-url>` itself.
  - Stop-hook output schema same as Path A.
  - Operator can manually `gh pr merge` if codex-gate is stuck.

**Verdict:** [Path A] / [Path B] — pick based on §P0.2 input.

**Workflow contract for the chosen path:** [Restate the chosen path's mechanics in 3-5 sentences using exact filenames, env vars, and webhook events.]

**Decision for umbrella spec:** §6.2 bridges table "codex Stop-hook → merge gate" row updated; §6.2 yaml example updated; if Path B wins, the `approved-and-green` reaction in §6.2 yaml is excised.
```

- [ ] **Step 3: Verify §P0.3 is internally consistent**

Run:
```
Grep pattern="Verdict:.*\[Path [AB]\]|Workflow contract for the chosen path:" path="docs/architecture/W362c-PHASE-0-CONTRACT-VALIDATION.md"
```

Expected: 1 Verdict line referencing Path A or Path B, 1 Workflow contract section header.

- [ ] **Step 4: Commit P0.3**

```bash
git add docs/architecture/W362c-PHASE-0-CONTRACT-VALIDATION.md
git commit -m "docs(W362c): P0.3 codex_gate_passed predicate path chosen

Per umbrella spec §3.5 P0.3, chose Path A (custom predicate) or
Path B (bridge-owned merge) based on §P0.2 verdict. Workflow
contract recorded with exact filenames + env vars + webhook
events. Updates §6.2 bridges table + yaml in Task 5.

Codex-Verdict: BOOTSTRAP"
```

---

## Task 4: P0.4 — Inactivity-threshold tuning + observability sink shape

**Why:** Per max-quality directive in umbrella spec §2, no budget kill-switch. P0.4 finalizes (a) the default `inactivity_threshold` value, (b) the observability data shape (ccusage events → Langfuse trace → operator surface, no termination), (c) whether AO ships an optional `ao session kill <id>` for operator-initiated manual stop.

**Files:**
- Append section: `docs/architecture/W362c-PHASE-0-CONTRACT-VALIDATION.md` → §P0.4
- Reference only: `docs/superpowers/specs/2026-05-21-sota-parallel-workflow-design.md:§2 Design Principles, §6.3 Observability + inactivity`

- [ ] **Step 1: Confirm `inactivity_threshold` default**

The umbrella spec §6.3 lists `60m default` (relaxed from 30m); P0.4 records final value + rationale. Decision points:
- Does AO ship a per-session pty-activity heartbeat? If yes, 60m is fine.
- If long codex round 1+2 reasoning waits could exceed 60m without pty activity, raise to 90m.
- Cite umbrella spec §2 (max-quality, no premature termination) as rationale.

Capture the decision below.

- [ ] **Step 2: Confirm observability data shape**

The umbrella spec §6.3 + bridges table specify ccusage MCP → bridge → Langfuse OTEL + operator surface, NO kill action. P0.4 records:
- The ccusage probe interval (1 min default suggested; tune via operator ENV).
- The Langfuse annotation event name (suggested: `agt.threshold.cross`).
- The threshold-cross severity levels (soft-info / soft-warn — both NEVER kill).

Capture the design below.

- [ ] **Step 3: Confirm manual-stop API**

From §P0.2 schema captured in Task 2, identify whether AO exposes `ao session kill <id>` or equivalent. If yes, document the CLI shape; if no, document `claude stop <id>` as the fallback operator action.

- [ ] **Step 4: Write §P0.4 of the W362c report**

Append to `docs/architecture/W362c-PHASE-0-CONTRACT-VALIDATION.md`:

```markdown
## P0.4 — Inactivity-threshold tuning + observability sink shape

**Inputs:** Umbrella spec §2 (max-quality, no budget kill). §6.3 (observability + inactivity).

**Decisions:**

1. **`inactivity_threshold` default = [60m | 90m]** — chosen because [pty-activity heartbeat available / long-codex-reasoning-waits unsafe at 60m / max-quality directive forbids premature kill]. Override via AO env `AO_INACTIVITY_THRESHOLD=90m`.

2. **Observability data shape:**
   - Probe: `mcp__ccusage__blocks` every 60s (configurable via `AGT_OBSERVER_INTERVAL_S` env; default 60).
   - Langfuse event name: `agt.threshold.cross`.
   - Threshold-cross severity levels: `soft-info` (50% of monthly cap), `soft-warn` (100% of monthly cap). Both emit Langfuse annotation + operator-surface soft alert. NEITHER kills the session. Per max-quality directive (§2).

3. **Manual-stop API:**
   - AO: [`ao session kill <id>` confirmed in §P0.2 / NOT present — operator falls back to `claude stop <id>` directly].
   - Bridge: does NOT auto-invoke kill on threshold cross; only documented for operator use.

**Verdict:** All 3 sub-decisions recorded; §6.3 of umbrella spec is consistent with this resolution.

**Decision for umbrella spec:** §6.3 + §6.2 yaml `lifecycle.inactivity_threshold` lock at the chosen default; bridges table reflects the manual-stop API; no further §6.x edits required if observability shape was already drafted in r1.5 PIVOT.
```

- [ ] **Step 5: Verify §P0.4 is internally consistent**

Run:
```
Grep pattern="inactivity_threshold default|Langfuse event name|Manual-stop API" path="docs/architecture/W362c-PHASE-0-CONTRACT-VALIDATION.md"
```

Expected: 3 sub-decision headings present.

- [ ] **Step 6: Commit P0.4**

```bash
git add docs/architecture/W362c-PHASE-0-CONTRACT-VALIDATION.md
git commit -m "docs(W362c): P0.4 inactivity + observability sink finalized

Per umbrella spec §3.5 P0.4, recorded final inactivity_threshold
default (60m or 90m), ccusage observability probe interval +
Langfuse event name, threshold-cross severity levels (soft-info /
soft-warn — neither kills), and manual-stop API.

Codex-Verdict: BOOTSTRAP"
```

---

## Task 5: Synthesize report header + roll W362c outcomes into umbrella spec (r6)

**Why:** All 4 P0 verdicts now live in the W362c report. This task adds a TL;DR header summarizing the verdicts + rolls each decision into the umbrella spec as an r6 revision so W363/W365/W366 can start.

**Files:**
- Modify: `docs/architecture/W362c-PHASE-0-CONTRACT-VALIDATION.md` (add header above §P0.1)
- Modify: `docs/superpowers/specs/2026-05-21-sota-parallel-workflow-design.md` (r6 edits: §3.5 P0.1–P0.4 marked RESOLVED with cite to W362c; §6.2 yaml + bridges updated per P0.2/P0.3; §6.3 inactivity locked per P0.4; status header → r6 APPROVED-r5+r6; review-history table gets r6 row)

- [ ] **Step 1: Write the W362c report header**

Edit `docs/architecture/W362c-PHASE-0-CONTRACT-VALIDATION.md` and prepend above §P0.1:

```markdown
# W362c — Phase 0 Contract Validation Report

**Date:** [today's date YYYY-MM-DD]
**Author:** Claude Code (Opus 4.7, 1M ctx)
**Wave:** W362c (umbrella spec §3.5 Phase 0 — Contract Validation Gate)
**Status:** COMPLETE — 4/4 P0 contracts validated.

## TL;DR Verdicts

| Contract | Verdict | Path forward |
|---|---|---|
| P0.1 WorktreeCreate semantics | [from §P0.1] | [from §P0.1 decision-for-umbrella] |
| P0.2 AO yaml schema | [from §P0.2] | [from §P0.2 decision-for-umbrella] |
| P0.3 codex_gate_passed predicate | [Path A or Path B from §P0.3] | [from §P0.3 decision-for-umbrella] |
| P0.4 inactivity + observability | [from §P0.4] | [from §P0.4 decision-for-umbrella] |

## Umbrella spec r6 edits queued

- §3.5 P0.1 row → RESOLVED with cite to §P0.1.
- §3.5 P0.2 row → RESOLVED with cite to §P0.2.
- §3.5 P0.3 row → RESOLVED with cite to §P0.3.
- §3.5 P0.4 row → RESOLVED with cite to §P0.4.
- §6.2 yaml → updated with real schema captured in §P0.2.
- §6.2 bridges table "codex Stop-hook → merge gate" row → pinned to Path A or Path B per §P0.3.
- §6.3 → pinned to inactivity_threshold value per §P0.4.
- Status header + footer + review-history → r6 row added.

---

```

- [ ] **Step 2: Apply r6 edits to umbrella spec — §3.5 P0.1–P0.4 RESOLVED**

For each of P0.1–P0.4 rows in the umbrella spec §3.5 Pass-criterion column, append `→ **RESOLVED** at W362c §P0.<n> (see docs/architecture/W362c-PHASE-0-CONTRACT-VALIDATION.md)` to the existing text.

Use `Edit` 4 times — one per row.

- [ ] **Step 3: Apply r6 edits to umbrella spec — §6.2 yaml**

If P0.2 captured a different top-level shape (e.g. `port` / `defaults` / `projects` / `notifiers` instead of the current illustrative top-level keys), replace the §6.2 yaml block with the real schema from §P0.2. Use `Edit` once.

If P0.3 chose Path B, also remove or comment out the `approved-and-green` reaction in the yaml (Path B disables it).

- [ ] **Step 4: Apply r6 edits to umbrella spec — §6.2 bridges table**

The bridges table row "codex Stop-hook → merge gate (Path A or Path B, per Phase 0.3)" currently describes BOTH paths. Per the §P0.3 verdict, edit that row to describe ONLY the chosen path (Path A custom-predicate OR Path B bridge-owned merge). Use `Edit` once.

- [ ] **Step 5: Apply r6 edits to umbrella spec — §6.3 inactivity locked**

If P0.4 raised the inactivity_threshold above 60m, update §6.3 + §6.2 yaml + §6.2 Component #5 row to use the new value. Use `Edit` 2-3 times.

- [ ] **Step 6: Apply r6 edits to umbrella spec — status header / footer / review history**

Edit the spec's three status locations:
- Line ~5 header `**Status:** APPROVED r5 (codex GPT-5.5 round 5: APPROVE, 2026-05-21) → user review → writing-plans` → change to `**Status:** APPROVED r6 (W362c contracts validated 2026-05-22) → W363 design freeze unblocked`.
- Footer `**Spec status**: APPROVED r5 ...` → change to `APPROVED r6 ...`.
- §12 Review History table → add r6 row:

```
| r6 | W362c Phase 0 contract validation | **APPROVE** | All 4 P0 contracts resolved via empirical probes (Anthropic docs + Composio AO public README + canonical example yaml). | §3.5 P0.1–P0.4 marked RESOLVED with cites; §6.2 yaml replaced with real schema; bridges row pinned to Path [A|B]; §6.3 inactivity locked at [60m|90m]. W363 design freeze unblocked. |
```

- [ ] **Step 7: Verify spec r6 edits land**

Run:
```
Grep pattern="APPROVED r6|RESOLVED at W362c" path="docs/superpowers/specs/2026-05-21-sota-parallel-workflow-design.md"
```

Expected: ≥5 matches (status header + footer + 4 P0.1–P0.4 RESOLVED markers).

- [ ] **Step 8: Fire codex round 6 review on the r6 umbrella spec**

Run:
```bash
node ".claude/plugins/cache/openai-codex/codex/1.0.4/scripts/codex-companion.mjs" task --effort high "Round 6 review of docs/superpowers/specs/2026-05-21-sota-parallel-workflow-design.md. Round 5 was APPROVE. r6 edits land W362c Phase 0 contract validation outcomes: §3.5 P0.1-P0.4 rows marked RESOLVED with cites to docs/architecture/W362c-PHASE-0-CONTRACT-VALIDATION.md; §6.2 yaml replaced with real Composio AO schema from canonical example; §6.2 bridges 'codex Stop-hook → merge gate' row pinned to Path A or Path B (codex picks based on which path is described); §6.3 inactivity_threshold locked at chosen value; status promoted r5 → r6. Verify: no contradictions; no orphan Path-A-AND-B language; max-quality directive (§2) preserved; W342-Z spine intact. Verdict: APPROVE or BLOCK."
```

Expected: APPROVE. If BLOCK, fix findings inline and re-fire; if still BLOCK after 2 rounds, surface to operator.

- [ ] **Step 9: Commit r6 + W362c report header**

```bash
git add docs/architecture/W362c-PHASE-0-CONTRACT-VALIDATION.md docs/superpowers/specs/2026-05-21-sota-parallel-workflow-design.md
git commit -m "docs(W362c): Phase 0 contract validation complete → spec r6 APPROVED

All 4 P0 contracts resolved with empirical evidence + codex round 6
verdict. Umbrella spec advanced from r5 → r6; §3.5 rows marked
RESOLVED with cites; §6.2 yaml replaced with real Composio AO
schema; §6.2 bridges row pinned to chosen path; §6.3 inactivity
locked. W363 design freeze unblocked.

W362c report: docs/architecture/W362c-PHASE-0-CONTRACT-VALIDATION.md

Codex-Verdict: APPROVE"
```

- [ ] **Step 10: Record W362c verdict in T6 basic-memory**

Use `mcp__basic-memory__write_note` with title `W362c-Phase-0-Contract-Validation-Verdict` and folder `main/verdicts`. Content:

```markdown
# W362c — Phase 0 Contract Validation Verdict

- Date: [today's date]
- Wave: W362c
- Status: COMPLETE
- Codex verdict: APPROVE (round 6)
- Commit: [hash from Step 9]

## Verdicts

- P0.1 WorktreeCreate semantics: [from §P0.1]
- P0.2 AO yaml schema: [from §P0.2]
- P0.3 codex_gate_passed predicate: [Path A or Path B]
- P0.4 inactivity + observability: [from §P0.4]

## Unblocks

- W363 (foundation gap closure) — design freeze unblocked.
- W365 (Composio AO T3 audit) — design freeze unblocked.
- W366 (Composio AO T2 pilot) — design freeze unblocked once W363 + W364 + W365 complete.

## Cite

- Report: `docs/architecture/W362c-PHASE-0-CONTRACT-VALIDATION.md`
- Umbrella spec: `docs/superpowers/specs/2026-05-21-sota-parallel-workflow-design.md` (r6)
```

Expected: T6 write succeeds; permalink returned.

---

## Self-Review

After this plan is executed, the reader (you or a fresh subagent) should be able to verify:

**1. Spec coverage:** Each of umbrella spec §3.5's P0.1, P0.2, P0.3, P0.4 has a corresponding task (1, 2, 3, 4) producing a verdict + decision. Task 5 rolls outcomes into r6 of the umbrella spec. **Covered.**

**2. Placeholder scan:** Every step has actual content. WebFetch prompts are full sentences with explicit ask. Commit messages are complete. T6 write template is filled in. **No placeholders detected.**

**3. Type consistency:** File paths used consistently — `docs/architecture/W362c-PHASE-0-CONTRACT-VALIDATION.md` for the report; `docs/superpowers/specs/2026-05-21-sota-parallel-workflow-design.md` for the spec; `tools/composio-bridge.mjs` cited per umbrella spec contract. Section names §P0.1–§P0.4 used consistently. **Consistent.**

**4. Risk:** P0.1 / P0.2 outcomes drive subsequent task content. If P0.2 captures unexpected schema shape (e.g. AO yaml uses YAML 1.2 anchors / refs / templating that current spec doesn't model), the report should note it as a "scope expansion" flag for W365 instead of inflating Task 5. **Mitigation in plan.**

---

## Execution Handoff

Plan complete and saved to `docs/superpowers/plans/2026-05-21-W362c-phase-0-contract-validation.md`. Two execution options:

**1. Subagent-Driven (recommended)** — I dispatch a fresh subagent per task (5 subagents total), review between tasks, fast iteration.

**2. Inline Execution** — Execute tasks in this session using `superpowers:executing-plans`, batch execution with checkpoints for review.

Choose option after writing-plans handoff.
