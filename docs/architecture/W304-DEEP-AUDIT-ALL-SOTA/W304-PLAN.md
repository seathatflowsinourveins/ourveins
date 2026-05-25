# W304 Wave — Deep Audit All + W303-A Top-5 Gap Resolution + Broader SOTA Discovery

> **Wave**: W304 (operator: "deep audit all we need all sota repos" + W303-A top-5 gaps + persistent multi-MCP convergence mandate).
>
> **Branch**: `sota-converge-w295` (continued; HEAD `84a9489` post-W302-W303-codex-r1 fix-iterate).
>
> **Operator W304 explicit dimensions**:
> 1. "deep audit all" — comprehensive deep audit across uncovered dimensions
> 2. "we need all sota repos" — discovery comprehensiveness mandate; expand prior catalogues
> 3. (Persistent) multi-MCP convergence + research-arch improvement + decision-quality
>
> **Streams**: 4 parallel + codex r1 e2e to fire post-stream-return

## §0 — Pre-flight state

HEAD `84a9489` (W302-W303-codex-r1 fix-iterate landed). Top-7 cumulative operator-action queue (W300-W303) carried forward. W303-A's top-5 UNCOVERED gaps (IC ranking): settings.json env-audit (3.0) · harness/eval_harness.py Lane-A/B/C (2.5 highest raw impact) · 18 local skills · CI lane · 4 sub-agents.

## §1 — Streams (4 parallel; file-ownership disjoint)

| Stream | Type | Scope | File ownership | Done criteria |
|---|---|---|---|---|
| **A** | deep-audit (highest raw impact) | **`harness/eval_harness.py` sca-v5 deep-audit as a UNIT** (Lane-A inspect_ai + Lane-B promptfoo + Lane-C sota-rubric); coverage + fixture quality + smoke-test design + cardinal-rule-2 compliance + first-party SDK pattern verification. Per W303-A gap #2 + W303-A codex-r1 Q8 narrowing | `W304-STREAM-A-HARNESS-EVAL-DEEP-AUDIT.md` | 887-LOC harness file deep-audited section-by-section + Lane coverage matrix + fixture-quality verdict + cardinal-rule self-check |
| **B** | env-audit (highest IC) | **`settings.json` env-block + `CLAUDE.local.md` per-machine env audit** — 40+ env vars in settings.json:env (W298-E found `MCP_TOOL_TIMEOUT` was dead-code on <2.1.142); identify dead-code / drift / sensitive-leak risks. Per W303-A gap #1 IC=3.0 | `W304-STREAM-B-SETTINGS-ENV-AUDIT.md` | Per-env-var verdict table (KEEP / RETIRE / FIX) + sensitive-leak check + cardinal-rule self-check |
| **C** | broader SOTA discovery | **"Deep audit all + we need all sota repos"** — multi-MCP cascade (≥7 families) targeting UNDISCOVERED dimensions NOT in W288/W291/W293/W296/W297/W298/W299/W300/W301/W302/W303 catalogues. Focus: agentic coding · code-gen quality · agent-eval frameworks · prompt-engineering · production-LLM-ops · agent-OS · plus 2026-MAY new entrants. Target ≥25 NEW candidates across 12+ axes. Lite sca-v5 score. Anti-bias EXCEEDED (≥3 non-USA + ≥3 solo + ≥5 <500★) | `W304-STREAM-C-BROADER-SOTA-DISCOVERY.md` | ≥25 NEW candidates; ≥7 MCP families; Top-10 cross-axis + anti-bias proof |
| **D** | local-skills + sub-agents audit | **18 local skills content-quality + 4 `.claude/agents/*.md` sub-agent prompt-engineering quality** — per W303-A gaps #3 + #5; sca-v5 lite-score each; identify retire/refine/keep verdicts | `W304-STREAM-D-LOCAL-SKILLS-AGENTS-AUDIT.md` | 18+4=22 artifacts audited; per-artifact verdict KEEP/REFINE/RETIRE; cardinal-rule check |

**Coordinator (self)**: synthesis → `W304-AUDIT-2026-05-18.md` → codex r1 e2e proactively per operator persistent gpt5.5 mandate → ship-chain commit.

## §2 — File ownership

- `W304-PLAN.md` — coordinator (this)
- 4 `W304-STREAM-{A,B,C,D}-*.md` files — per-stream
- `W304-AUDIT-2026-05-18.md` — coordinator
- `W304-CODEX-R1.md` — coordinator

NO stream edits: `CLAUDE.md`, `.claude/settings.json`, `.mcp.json`, `.claude/skills/sota-convergence-audit/SKILL.md`, `VERDICT-LEDGER.md`, `harness/eval_harness.py` (Stream A audits but does NOT edit), `.claude/skills/<local>/*` (Stream D audits but does NOT edit), `.claude/agents/*.md` (Stream D audits but does NOT edit) — all operator-approval-gated.

## §3 — Anti-bias mandates (carried)

- sca-v5 multi-MCP cascade (≥6 families per stream; ≥7 for Stream C broader discovery)
- Stars NOT a hardgate
- Honest verdicts — even if politically inconvenient (Stream A may find harness Lane-C fixture-quality lower than expected; Stream B may find sensitive-leak in env vars; Stream D may find local skills should be RETIRED)
- 2026-MAY freshness MANDATE
- Source disagreements MUST surface in `sources_typed.<dim>.disagreement[]`
- Stream C anti-bias EXCEEDED: ≥3 non-USA + ≥3 solo + ≥5 <500★

## §4 — Cite-anchors (cross-stream)

- `W303-STREAM-A-COVERAGE-GAP-AUDIT.md` — top-5 gaps source (W304 closes #1+#2+#3+#5)
- `W302-W303-AUDIT-2026-05-18.md` §3.2 (narrowed wording per codex r1 Q8)
- `harness/eval_harness.py` (887 LOC per W298-D Stream-D audit reference)
- `.claude/settings.json` (40+ env vars; modified state per session-start)
- `.claude/skills/*` × 23 local skills (per W298-F audit)
- `.claude/agents/*.md` × 4 sub-agent files (per W298-D verified PASS frontmatter)
- `CLAUDE.md` + `CLAUDE.local.md` (per-machine env block; W297-PLAN cite)
- `.claude/skills/sota-convergence-audit/SKILL.md` — sca-v5 LIVE rubric

## §5 — Verification-on-completion

Each stream MUST end with:
- File written + LOC
- ≥3 cite-anchors
- Top 3 findings + confidence levels
- Source-disagreement log
- Cardinal-rule self-check
- Items routed to W304-AUDIT synthesis

## §6 — Persistent operator mandates re-asserted (W303→W304 carry)

- "ship with convergence sota insights and e2e with gpt 5.5" — codex r1 fires PROACTIVELY post-stream-return
- "questions your rules, and repos selection" — no rubber-stamp installs; honest tier-routing
- "research and enhance your research architecture itself" — Stream A specifically audits the research-arch-substrate (harness)
- "depth and comprehensiveness of the repos discovery" — Stream C ≥25 NEW + ≥7 MCP families
- "improve your decision making itself" — W304 wave-output validates sca-v5 IN PRODUCTION via 7 waves of execution (W297→W303)
