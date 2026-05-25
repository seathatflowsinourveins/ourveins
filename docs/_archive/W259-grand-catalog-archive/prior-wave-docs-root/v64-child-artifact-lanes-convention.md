# V64 Child Artifact Lanes — operator convention for eee subagent fan-out

**Status**: ACTIVE (operator-discipline; no runtime hook enforcement yet)
**Origin**: V64-adoption-plan §3 (orchestrator-pivot post Wave 80 Agent B+C FM-17.e failures); ADOPT TOP-4 conf=0.86 verdict
**Cross-model gate**: real GPT-5.5 BRIDGE-MODE via proxy `/v1/chat/completions` (cardinal-rule-3 Phase 1 bootstrap exception)
**Date**: 2026-05-08

## TIER-1 Cite Anchors (3 direct pinned HEAD SHAs for §3 + 2 V64-plan cross-reference SHAs; verified by operator pre-write)

### Direct cites supporting §3 child-artifact-lanes convention

- `Z:/repos/deps/deepagents/libs/deepagents/deepagents/middleware/filesystem.py @ 95f845d29745ece957144d045849f02c667ac711` — `TOO_LARGE_TOOL_MSG` template at `:317-320` (offload tool result + read in chunks via offset/limit) + `TOO_LARGE_HUMAN_MSG` at `:333` + `_FILESYSTEM_SYSTEM_PROMPT_TEMPLATE` "Large Tool Results" guidance + `large_tool_results_prefix='/large_tool_results'` constant. Source verbatim: *"When a tool result is too large, it may be offloaded into the filesystem instead of being returned inline... Offloaded tool results are stored under `{large_tool_results_prefix}/<tool_call_id>`."*
- `Z:/repos/deps/Continuous-Claude-v3/docs/ARCHITECTURE.md @ d07ff4b06b62f43771bc0c927d0211b734d6149e` — Agent Output Location at `:251-255`: *"All agents write their output to: `.claude/cache/agents/<agent-name>/latest-output.md`"*. Pipeline diagram at `:404-424` shows PreToolUse:Task → agent runs → PostToolUse:Task → file-only output.
- `Z:/repos/deps/claude-code-best-practice-shan/tips/claude-thariq-tips-16-apr-26.md @ 64fffd53a7c6f8e2e0b1575fdd200b65cda04737` — Subagents & Fresh Context Windows at `:133-141`: *"Subagents are a form of context management... that subagent gets its own fresh context window... synthesize its results so only the final report comes back to the parent... The exploration noise is garbage-collected when the subagent exits — 20 file reads, 12 greps, 3 dead ends — only the final report returns to the parent context."* Decision table `:165-170` recommends subagent when "Next step will generate lots of output you'll only need the conclusion from".

### V64-plan cross-reference SHAs (not direct §3 evidence; preserved for full V64 cite chain)

- `Z:/repos/deps/CLIProxyAPI @ ed1458aa6d3430ba59538aeb980b8934f0e80c1f` (V64-plan §1 cache-aware multi-account routing cite chain; anchors the multi-account fleet context this convention serves).
- `Z:/repos/deps/awesome-agentic-patterns @ 9a7b5c2e04b0f69df9aee7d395353b807d8f0e9f` (V64-plan §2 stable-prefix fork-subagent cite chain; same cross-reference role).

## §1 Directory Convention

Every advanced-agent-team-spawn fan-out (CADP rule 2 max 3 concurrent) MUST allocate a child artifact lane at:

```
tmp/v64/waves/<wave_id>/<agent_id>/
├── latest-output.md          # human-readable final report (≤OUTPUT_BUDGET LOC)
├── manifest.json             # structured schema (see §2)
└── large_tool_results/       # raw high-volume tool outputs evicted from agent context
    └── <tool_call_id>        # one file per offloaded tool result (deepagents-aligned)
```

`<wave_id>` = monotonic wave number (e.g., `wave80`, `wave81`); `<agent_id>` = agent name + dispatch ID slice (e.g., `agentA-a199824a` or `codex-rescue-abe79382`).

Note: `tmp/` is gitignored per `.gitignore`. The convention is **operator-discipline + file-shape contract**, not committed source. Provenance trail is preserved at `docs/install-provenance.md` per `Z:/claude-sota/.claude/rules/audit-action-loop.md` (cite-import-AMBER) Wire/Surface stage.

## §2 manifest.json Schema (deepagents + Continuous-Claude-v3 derived)

```json
{
  "wave_id": "wave80",
  "agent_id": "agentA-a199824a",
  "agent_type": "sota-researcher",
  "verdict_origin": "Sonnet stand-in | real GPT-5.5 BRIDGE-MODE | failed",
  "stand_in_notice": null,
  "tool_count": 33,
  "duration_ms": 407264,
  "summary": "...",
  "claims": ["..."],
  "evidence_paths": ["latest-output.md", "large_tool_results/toolu_xxx"],
  "confidence": 0.84,
  "next_action": "...",
  "token_notes": "...",
  "fm17e_mitigation_applied": false
}
```

Parent ingestion contract:
- Read `manifest.json` FIRST (always; bounded ≤2KB)
- Read `latest-output.md` ONLY when needed for synthesis decisions (gated)
- NEVER merge raw `large_tool_results/*` unless Layer 7 verification requests evidence audit (per V64-adoption-plan §3 step 3)

## §3 Spawn-Template Enhancement

Brief template gains a `LANE` slot alongside existing HANDOFF + TERMINATION + OUTPUT_BUDGET (per advanced-agent-team-standing-directive cite-import-AMBER):

```
TASK: ...
CONTEXT: ...
FILES: ...
CONSTRAINTS:
  - OUTPUT_BUDGET: 600 LOC max for the artifact body
  - **READ-CHUNK-SIZE: ≤500 lines per Read call; summarize-then-discard pattern (FM-17.e mitigation)**
  - **NO git-clone of whole repos; use mcp__github__get_file_contents in 500-line chunks**
LANE:
  wave_id: wave81
  agent_id: <agent-name>-<dispatch-id-slice>
  artifact_path: tmp/v64/waves/wave81/<agent-name>-<dispatch>/latest-output.md
  manifest_path: tmp/v64/waves/wave81/<agent-name>-<dispatch>/manifest.json
  large_results_dir: tmp/v64/waves/wave81/<agent-name>-<dispatch>/large_tool_results/
OUTPUT (mandatory; ARTIFACT-INLINE per FM-19):
  Top of return MUST include literally:
  ## ARTIFACT-INLINE: tmp/v64/waves/wave81/<agent-name>-<dispatch>/latest-output.md
HANDOFF: handoff_to: orchestrator | output_mode: last_message | artifacts: [latest-output.md, manifest.json] | verdict_one_line: <X>
TERMINATION: on_handoff_to: orchestrator | max_turns: N | terminationCondition: <predicates>
```

The `LANE` block makes deepagents-style filesystem offload + Continuous-Claude-v3 deterministic output path explicit at brief composition time, BEFORE the agent fires. Operator persists `latest-output.md` from the agent's `<result>` block (FM-19 ARTIFACT-INLINE pattern; readonly Bash guard sidestep when the agent class is no-Write).

## §4 FM-17.e Mitigation Slot (Wave 80 Agents B+C n=2 evidence)

CONSTRAINTS slot now mandates chunk-size discipline for BRIDGE-MODE GPT-5.5 dispatches reading source repos. Pattern hypothesis from n=2 same-arc autocompact-thrashing: tool-result bloat from large file reads (CLIProxyAPI source / awesome-agentic-patterns / deepagents middleware) accumulates faster than /compact reclaims, hits 1M ceiling, recursive compact loops produce 4-tool / <300-token outputs in 13-17min runs.

Mitigation in CONSTRAINTS:
1. **READ-CHUNK-SIZE: ≤500 lines per Read call** (prevents single-Read context-bomb)
2. **summarize-then-discard pattern** (Read → extract → record cite anchor → context-evict the raw text)
3. **NO git-clone of whole repos** (forces incremental discovery via `mcp__github__get_file_contents`)
4. **Per-axis budget: ≤2K tokens output per axis** (per cardinal-rule-3 §Profile selection — micro-prompts beat broad axes)

Per `Z:/claude-sota/.claude/rules/codification-threshold.md` cycle-322 jurisdiction self-observed n>=3 promotion bar: FM-17.e candidate sub-class needs 1 more instance for OWNED-rule promotion. This convention's mitigation slot is the forward-only fix-forward.

## §5 Migration of Existing tmp/wave*-*.md Artifacts

Wave 79 (`tmp/wave-token-opt-synthesis-*.md`) and Wave 80 (`tmp/wave-arch-opt-sota-agentA-*.md`, etc.) are operator-side ARTIFACT-INLINE persisted reports — NOT yet under the `tmp/v64/waves/<wave>/<agent>/` lane structure. They satisfy the FM-19 ARTIFACT-INLINE shape but lack the lane-allocation manifest.

Forward-only migration (per `Z:/claude-sota/.claude/rules/port-note-discipline.md` §6 anti-pattern "Do NOT rewrite historical commit bodies/snapshots"):
- Wave 79 + 80 artifacts STAY at their current paths; provenance.md cite anchors UNCHANGED
- Wave 81+ MUST use `tmp/v64/waves/wave<N>/<agent>/` shape
- The convention's empirical evidence base grows from Wave 81 onward

## §6 Layer-7 Verification Predicates (V64-adoption-plan §3 step 5)

For any accepted child claim ingested into orchestrator context, verify:
- (a) every claim has either an inline cite (TIER-1 file:line + HEAD SHA) OR an artifact path in the manifest
- (b) `evidence_paths[]` files exist on filesystem (no phantom)
- (c) `large_tool_results/*` referenced by tool_call_id resolve to actual files when audit requested
- (d) `verdict_origin` honestly discloses Sonnet-stand-in / failed status (per cardinal-rule-3 §Env-funneled subagent stand-in disclosure mandate)
- (e) child summary ≤OUTPUT_BUDGET ratio (mechanical token-count check via `wc -l` or `wc -w`)

These predicates are operator-discipline today; promotion to mechanical hook (e.g., `tools/v64_lane_verify.py`) is FORWARD-REF for Wave 82+ if convention sees ≥3 same-arc adoptions.

## §7 Operator Workflow

When dispatching a 3-agent advanced-team wave:

1. **Pre-dispatch**: assign `wave_id` (monotonic) + create `tmp/v64/waves/<wave_id>/` directory (if not exists)
2. **Dispatch**: include LANE block in each agent's brief; mandate ARTIFACT-INLINE return shape pointing to `tmp/v64/waves/<wave_id>/<agent_id>/latest-output.md`
3. **On agent return**: write the `<result>` body to `latest-output.md`; emit `manifest.json` with bounded summary fields
4. **Synthesis**: read all `manifest.json` files first; read `latest-output.md` files only when synthesis-claim requires deeper context; ignore `large_tool_results/*` unless audit requested
5. **Provenance**: append wave entry to `docs/install-provenance.md` citing `tmp/v64/waves/<wave_id>/` lane root + manifest summaries (NOT raw outputs — provenance is bounded summary)

## §8 Anti-patterns

- **Skipping LANE block in brief** — agent has no canonical artifact path; falls back to ad-hoc `<result>` block which the readonly Bash guard may truncate (FM-19 risk)
- **Allowing parent context to ingest raw `large_tool_results/*`** — defeats the deepagents/Continuous-Claude-v3 filesystem-offload primitive; reintroduces FM-17.e autocompact-thrashing at parent layer
- **Relying on verdict-on-`<result>` alone** — without `manifest.json` schema enforcement, parent can't grep across waves for `confidence` or `tool_count` aggregations
- **Mixing wave artifacts in one directory** — agent_id slicing prevents cross-agent overwrite races (FM-02 sub-class b/c sister concern at file-system layer)
- **Migration churn on Wave 79/80 historical artifacts** — refuted by `port-note-discipline.md` §6; forward-only convention starts Wave 81+

## §9 Cite Chain (TIER-1 → TIER-3 lattice)

- TIER-1: 3 pinned HEAD SHAs above (deepagents + Continuous-Claude-v3 + CCBP-tips), all verified at exact line content pre-write
- TIER-2 (cite-import-AMBER per CLAUDE.md Section 14.5): `Z:/claude-sota/.claude/rules/{advanced-agent-team-standing-directive,fm17-subagent-fleet-depletion,fm19-readonly-guard-sidestep,codex-t1-fix-forward-pattern,cross-model-consensus,audit-action-loop,port-note-discipline,codification-threshold}.md`
- TIER-3-LOCAL: `tmp/wave-subagent-context-v64-adoption-plan-2026-05-08.md` (V64-adoption-plan ADOPT TOP-4 conf=0.86 source artifact); `docs/install-provenance.md` Wave 80 entry (audit trail anchor)

## §10 Update Triggers

Re-evaluate this convention when:
- Wave 81+ produces ≥3 distinct fan-out instances using the new lane shape — promote `manifest.json` schema to enforced contract via `tools/v64_lane_verify.py` hook
- FM-17.e candidate sub-class reaches n=3 (Wave 81+) — promote to OWNED-rule per cycle-322 jurisdiction
- Anthropic CC ships a native subagent-output filesystem-offload primitive (would obviate operator-discipline; flip to native call)
- A 4th distinct artifact-lane primitive surfaces in TIER-1 SOTA (≥4-org Axis-1 firm convergence) — extend the schema
- Operator runs >5 concurrent teammates per `Z:/claude-sota/.claude/rules/team-orchestration.md §"Team-Lifecycle Hygiene"` token-budget threshold — convention costs scale; revisit lane GC discipline
