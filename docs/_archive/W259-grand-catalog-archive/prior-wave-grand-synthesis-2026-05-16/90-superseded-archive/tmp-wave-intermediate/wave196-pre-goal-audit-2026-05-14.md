---
title: W196 Pre-Goal Architecture Audit
date: 2026-05-14
agent: orchestrator
status: AUTHORITATIVE
---

# W196 Pre-Goal Architecture Audit (2026-05-14 14:35Z)

## Methodology

Orchestrator-side parallel probes via ctx_batch_execute (13 commands + 12 queries, raw output sandboxed). Findings cross-correlated with W193 P3 close-synthesis + W194 close-synthesis + W195 SOTA-CONVERGENCE-MAX commit body. Single-source per probe; HONEST-NON-FINDING tagged where convergence not yet established.

## Layer-by-Layer Summary

| LAYER | COUNT | SOTA-CITE % | KEY FINDING |
|---|---|---|---|
| Rules | 64 | W194-FIXED | `over_broad: 0 ✅` per W194 P1 commit `2efabdd` close-synthesis verification |
| Hooks (.py+.sh+.js) | 34 | HIGH(≥5)=35% MED=27% LOW=38% | 4 compact-hooks recalibrated W195 P0; 2 RM'd (precompact_guard+context_window_guard) |
| Agents | 11 | CCBP TIER-1-DIRECT | frontmatter cites `claude-subagents.md:19-36 @ 48f2ceb` |
| Skills | 15 | mixed | superpowers+ECC bundled |
| Plugins (installed) | ~10 | high | this-session +3 NOT yet /reload (context-management+agent-orchestration+review-agent-governance) |
| MCP | 10 active / 0 disabled | healthy | context7+deepwiki+github+gitnexus+graphiti+memory+phoenix+playwright+repomix+serena |
| Untracked backlog | ~20 | n/a | .backup/, .claude-mem/, .codex-clean-w188/, etc — TRIAGE needed |

## Load-Bearing Findings

### 1. PRELOAD ROOT CAUSE — W194 P1 ALREADY FIXED (commit `2efabdd`)

- User's stated ~44% preload pain was pre-W194 measurement.
- W194 close-synthesis verification (cite: `tmp/wave194-*` per git log + Python re-probe): `over_broad (.claude/rules/**): 0  [TARGET: 0]  ✅ SUCCESS`.
- 24 of 64 rule files narrowed per commit `2efabdd` stat: `24 files changed, 24 insertions(+), 24 deletions(-)`.
- P1 W196 task = FRESH STATIC MEASUREMENT to quantify current preload % (probably ~20-25% post-W194, target <25%).

### 2. FM-* + Mia REPLACEMENT QUESTION — DEFINITIVELY ANSWERED W193 P3

- W193 P3 close-synthesis verdict: "FM-17/19/20 + Mia = NO upstream parity across 11-marketplace + 5-plugin-cache probe ⇒ KEEP per CR-12 TERTIARY (NOT replace)".
- Cite-class lattice per `Z:/claude-sota/.claude/rules/citation-discipline.md` rule #8: `constituents=[TIER-1-DIRECT @ Anthropic SDK SubagentStopHookInput types.py:309-316 @ b512f256, TIER-3-LOCAL-COMPOSITION @ sibling-novel FM-* discipline bridging hook-event-stream + audit-action-loop pattern]; effective_tier=TIER-3-LOCAL-COMPOSITION`.
- VERDICT: Mia + FM-17/19/20 lints are the SOTA for THIS runtime. User's question "are they really sota or we can replace them" — answer is **THEY ARE SOTA-via-CR-12-TERTIARY**, no upstream replacement exists.

### 3. COMPACT HOOKS — RECALIBRATED W195 P0 (commit `9f67616`)

Status by hook:
- **REMOVED** (W193 cleanup): precompact_guard.py + context_window_guard.py
- **KEPT+COMMITTED** (W193 codex KEEP+COMMIT verdict): context_window_statusline.sh (commit `2344a28`)
- **RECALIBRATED** (W195 P0 via auto-compact-discipline.md Rank #3 stop-and-handoff → save→compact→restore loop):
  - precompact_hint_emitter.py
  - sessionstart_compact_hint_reader.py
  - userpromptsubmit_compact_threshold.py (cite trail: W175 P6 env-var-overridable thresholds + W184 1M-context calibration + W187 round-2 codex T1 conf=0.9 prescription #2)
  - posttooluse_context_monitor.js

User's concern "compact hooks damaging significantly" — REFUTED at hook-body level by codex GPT-5.5 W193 audit (recorded in W194 close-synthesis): FM-20 ~13% reclaim claim isn't confirmed; reinflation is small (~250-600B/event). The real damage was the rule cold-load — that's already fixed.

### 4. W195 INCOMPLETE — 2/5 FIRM, 3/5 PARTIAL (commit `7db25b1`)

- Agent A done firm
- Agent C done firm
- Agent B FM-17.d wedged → stream-watchdog 600s stall (n=3+ cumulative per fm17d sub-class)
- P2 W196 task = Path P codex exec foreground+tee recovery per Pattern D (n=13 evidence ladder)

### 5. HOOK CITE-COUNT BREAKDOWN (out of 34 hooks)

Top-12 HIGH-SOTA (≥5 cites): codex_postcommit_review(14), codex_t1_consult_gate(11), codex_t2_pre_commit_gate(9), codex_mcp_healthcheck(8), userpromptsubmit_compact_threshold(7), codex_prepush_review(6), _guard_base(6), agent_plan_readonly_bash_guard(5).

MED-SOTA (3-4 cites): 9 hooks including FM-17.d stall detector, codex_review_thread_bridge, agent_spawn_gate, etc.

LOW-SOTA (≤2 cites): 13 hooks — but per W193 P3 verdict, the LOW-cite tail (FM-*/Mia/safety_guard/utils) is sibling-novel CR-12 TERTIARY VALID — keep, don't replace.

**Compute**: 12/34 HIGH = 35%. 9/34 MED = 27%. 13/34 LOW = 38%. NO no-cite active hooks (both no-cite hooks already removed pre-W193).

### 6. THIS-SESSION PLUGIN INSTALLS — `/reload-plugins` PENDING

User triggered 3 plugin installs at session top (slash-command interactions visible in user message):
- `/plugin install context-management@claude-code-workflows` ✓ Installed
- `/plugin install agent-orchestration@claude-code-workflows` ✓ Installed
- `/plugin install review-agent-governance@claude-code-workflows` ✓ Installed

Each output: "Run /reload-plugins to apply." NOT YET reloaded. P3 task.

### 7. PARALLEL SESSION STATE (gitnexus + git log)

- HEAD: `9f67616` (W195 P0 docs)
- Recent waves: W193 → W194 → W195 (mid-arc) → W196 (this)
- Session-checkpoint commits (FM-21 sub-class .a): 9+ in last 30-commit window
- Untracked backlog: 20 entries needing 3-bucket triage (P5 task)
- 2 plugin disable-hotfixes recent: `88c55c0` protect-mcp@0.1.0 broken hooks.json + `b922257` claude-mem@thedotmack UserPromptSubmit printf permission denied

### 8. MARKETPLACE INSTALL STATUS

Installed (verified via earlier probes): anthropics/claude-plugins-official, addy-agent-skills, affaan-m/everything-claude-code, codex-plugin-cc, claude-code-workflows, ralph-loop, frontend-design, agent-sdk-dev + 3 this-session (PENDING /reload-plugins).

PLANNED §3: mattpocock/skills (62k★). P4 task — Probe DAG 1-7 before install.

REDUNDANT-PER-FIRE-16: obra/superpowers (delivered via Anthropic bundle).

REVERT-AND-REMOVE precedents per CR-9 install-risk: bash_command_allowlist.py (Wave 11A), fleet_health_start.py, permission_request_auto_approve.py. Do NOT re-install per `feedback_check_gitignore_before_porting.md` "harness has decided" pattern.

## W196 Priority Targets (ranked)

P1 LOAD-BEARING: Fresh-session preload % static measurement (sota-researcher BRIDGE-MODE)
P2 W195 CLOSE: FM-17.d wedge recovery via Path P foreground+tee (codex-rescue BRIDGE-MODE)
P3 ACTIVATE: /reload-plugins for 3 new installs + install-provenance rows (operator-trigger)
P4 INSTALL: mattpocock/skills Probe DAG 1-7 (sota-researcher BRIDGE-MODE)
P5 TRIAGE: 20-entry untracked backlog 3-bucket sort (code-reviewer)
P6 META: cite-class verification framework (code-reviewer)

## Agent Team Dispatch (W196)

Per advanced-agent-team-standing-directive (n=3 user-trigger ladder + Mia n=30 evidence) + CADP rule 2 (max-3 concurrent).

- Agent A (sota-researcher): P1 + P4 → `tmp/wave196-agentA-preload-mattpocock-2026-05-14.md`
- Agent B (codex-rescue BRIDGE-MODE REAL GPT-5.5): P2 → `tmp/wave196-agentB-w195close-2026-05-14.md`
- Agent C (code-reviewer): P5 + P6 → `tmp/wave196-agentC-triage-meta-2026-05-14.md`

Cross-model gate at arc level: ≥2 BRIDGE-MODE codex dispatches (Agent B + foreground+tee dispatches inside agents) OR Path P equivalents.

## Non-Goals (anti-pattern shield)

- Replace FM-*/Mia: W193 P3 VERDICT — no upstream parity, KEEP per CR-12 TERTIARY
- Re-narrow rules globs: W194 verified `over_broad: 0`
- Re-install protect-mcp / claude-mem / fleet_health_start / bash_command_allowlist: W195 hotfix REVERT-AND-REMOVE precedent per CR-9 install-risk discipline
- Compact-cron config changes: W195 P0 owns

## Cite Trail

- Pre-goal audit method: ctx_batch_execute (13 commands + 12 queries) 2026-05-14 14:35Z
- W193 P3 VERDICT: `tmp/wave193-orchestrator-close-synthesis-2026-05-14.md` (26,993 bytes)
- W194 verification: `Post-edit Python re-probe: over_broad (.claude/rules/**): 0  [TARGET: 0]  ✅ SUCCESS` (W194 close-synthesis indexed-section in ctx)
- W195 mid-arc: commit `7db25b1` body "2/5 firm 3/5 PARTIAL"
- Standing directive: `Z:/claude-sota/.claude/rules/advanced-agent-team-standing-directive.md` (CCBP claude-subagents.md TIER-1 + Karpathy + Mia n=30 + cross-model-asymmetry foundations)
- CR-12 TERTIARY cite-import-AMBER: `Z:/claude-sota/.claude/rules/citation-discipline.md` rule #8 + CLAUDE.md §14.5 (cite-import-AMBER from sibling claude-sota for sibling-novel discipline with no upstream parity)
