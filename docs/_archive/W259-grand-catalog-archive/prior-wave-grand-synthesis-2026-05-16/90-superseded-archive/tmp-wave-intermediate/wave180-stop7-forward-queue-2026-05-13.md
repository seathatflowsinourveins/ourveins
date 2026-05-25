---
title: W180 STOP-7of7 Forward Action Queue — Post-Compact Rehydrate
status: AUTHORITATIVE
date: 2026-05-13
wave: 180
fire: F-queue
agent: orchestrator
---

# W180 STOP-7of7 forward action queue (post-compact)

## Mia-verified STOP-gate state

| Priority | Target | Evidence | Status |
|---|---|---|---|
| STOP-1 P0 | Ollama unblock + OAuth recovery | external OS state | **BLOCKED-OPERATOR** |
| STOP-2 P1 | wshobson Top-3 /plugin install | external operator paste | **BLOCKED-OPERATOR** |
| STOP-3 P2 | 3-agent CADP fan-out | not dispatched | **DEFER** — FM-17.f + W180 F1 risk |
| **STOP-4 P3** | F36 denominator-85 manifest | absorbed 97d422a (FM-02.c n=15) | ✅ **FIRM-MET** |
| **STOP-5 P4** | FM-20 row 14 codify | committed bba2405 | ✅ **FIRM-MET** |
| STOP-6 P5 | auto-compact hook (from P2/A) | depends P2 | DEFER |
| STOP-7 P6 | session-preload (from P2/C) | depends P2 | DEFER |

**Net: 2/7 firm-MET** (below 5/7 threshold; Stop hook holds).

## Operator-action queue (sequential)

### Step 1 — Restart Ollama (P0 unblock graphiti)

```powershell
Stop-Process -Id 45628 -Force
Start-Sleep 5
$env:OLLAMA_HOST = "127.0.0.1:11700"
Start-Process ollama serve
Start-Sleep 10
curl -m 60 http://127.0.0.1:11700/v1/chat/completions `
  -H "Content-Type: application/json" `
  -d '{"model":"qwen3.6:judge","messages":[{"role":"user","content":"OK"}],"max_tokens":5,"stream":false}'
```

Verify: HTTP 200 + non-empty `content` field. Then `mcp__graphiti__add_memory group_id=eee` → `get_episodes` verify dual-write per FM-20 row-9 Mia.

### Step 2 — OAuth recovery (W180 F1 critical)

All 8 OAuth accounts 401 + aperant DEAD (exit -1073741510). Manual reauth queue per account. `reset_soonest` writer active but ineffective. Operator must manually re-authenticate each OAuth account.

**Probe**: `python Z:/claude/ccc/tools/status.py | head -40` should show ≥3 accounts `Session 🟢 <50%` BEFORE P2 dispatch per `parallel-agent-wave.md §CADP rule 5`.

### Step 3 — wshobson Top-3 install (P1)

```
/plugin marketplace add wshobson/agents
/plugin install shell-scripting@wshobson protect-mcp@wshobson signed-audit-trails@wshobson
```

Mia 5-probe each per cardinal-rule-9 + `agent-harness-fit-verification.md §6-probe DAG`:
- Probe-1 HEAD@34632bc count verify
- Probe-4 plugin-namespace not-duplicate
- Probe-5 mode-harness-shape compat
- CR-9 REVERT check (sibling claude-sota git log for prior REVERT-AND-REMOVE)
- CR-12 disposition (GENUINELY-NEW vs DUPLICATE-FUNCTIONALITY vs PARTIAL-OVERLAP)

### Step 4 — Dispatch P2 3-agent CADP fan-out

**Pre-conditions** (verify BEFORE dispatch):
- Step 1+2 complete (Ollama HTTP200 + ≥3 accounts <50%)
- Step 3 plugins INSTALLED-not-just-marketplace-added
- Decide [1m] strategy:
  - (a) `$env:CLAUDE_CODE_DISABLE_1M_CONTEXT=1` + restart eee (drops parent to ~200k ceiling; safer subagent dispatch)
  - (b) Keep [1m] + use Path P codex-exec foreground+tee for codex-rescue (avoids FM-17.f BRIDGE-MODE billing blocker)

**3-agent brief (per advanced-agent-team-standing-directive.md invariants 1-8)**:

- **Agent A**: `Agent({subagent_type: "sota-researcher"})` 14-repo line-by-line audit per /goal P1/A
  - Brief includes: 6-Probe-DAG + Axis-1+2+3 + multi-source≥4 + 4-axis pre-adapt
  - Repos: wshobson/agents + abhigyanpatwari/GitNexus + quemsah/awesome-claude-plugins + Shubhamsaboo/awesome-llm-apps + multica-ai/karpathy-skills + mattpocock/skills + hesreallyhim/awesome-claude-code + alirezarezvani/claude-skills + gsd-build + vercel-labs/agent-skills + affaan-m/everything-claude-code + shanraisshan/CCBP + vinta/awesome-python + ComposioHQ/awesome-claude-skills
  - Output: `tmp/wave180-agentA-sota-14repo-2026-05-13.md` (ARTIFACT-INLINE FM-19)
  - OUTPUT_BUDGET: 800 LOC
  - TERMINATION: `on_handoff_to: orchestrator | max_turns: 25 | terminationCondition: on_text_match: "VERDICT:"`

- **Agent B**: `Agent({subagent_type: "codex-rescue"})` BRIDGE-MODE arch-audit-%
  - Per-call codex 90s default / 120s cap / 180s with reason (FM-17.d defense)
  - Enumerate `.claude/{rules,agents,skills,commands,hooks}/` + cite-class % + INSTALLED/FORWARD-REF/PENDING-AUDIT % per manifest §0 denominator-85
  - Target: ≥45% (39/85) per W179 P3
  - Output: `tmp/wave180-agentB-arch-audit-2026-05-13.md` (ARTIFACT-INLINE FM-19)
  - OUTPUT_BUDGET: 600 LOC
  - TERMINATION: `on_handoff_to: orchestrator | max_turns: 20 | terminationCondition: on_subprocess_failure: 3`

- **Agent C**: `Agent({subagent_type: "gpt5-reviewer"})` BRIDGE-MODE adversarial
  - Cross-session memory CR-12: mem0+letta+cognee+agentmemory+openviking-rag vs INCUMBENT graphiti+mcp-memory+sqlite-vec
  - 4-axis pre-adapt per `feedback_extensive_research_compare_before_adapt`
  - Post-compact %-session-left empirical baseline
  - sessionstart-preload-discipline ≥4/5 PASS verify
  - Output: `tmp/wave180-agentC-memory-matrix-2026-05-13.md` (ARTIFACT-INLINE FM-19)
  - OUTPUT_BUDGET: 600 LOC
  - TERMINATION: `on_handoff_to: orchestrator | max_turns: 20`

### Step 5 — Post-fan-out synthesis (orchestrator)

- Mia pre-apply per `mia-pre-apply.md` n=130 on EVERY returned prescription
- Pattern A apply (NEEDS-REVISION conf 0.88-0.93 → single atomic commit) per `codex-t1-fix-forward-pattern.md`
- P5 (auto-compact hook) from Agent A discovery → INSTALL via `/plugin marketplace add` CR-6 official-native (intelligent-compact PreCompact already INSTALLED W164 F38a — verify firing on this fire's compact event)
- P6 (session-preload rule) from Agent C convergence → codify NEW rule if convergence achieved

### Step 6 — 5-surface persist (Karpathy §5)

Per `sessionstart-preload-discipline.md §The contract step 4` + FM-20 row-9 asymmetric-dual-write defense (Mia BOTH backends):

1. MEMORY.md L2 entry ≤150 chars
2. provenance Wave-180 row in `docs/install-provenance.md`
3. mcp-memory hash (verify hash present, not just queued)
4. graphiti episode group=eee (verify `mcp__graphiti__get_episodes` returns this fire's episode)
5. tmp/wave180-* artifacts (this file + agent outputs)

## Discipline anchors

- `Z:/claude-sota-installed/CLAUDE.md` cardinal-rules 1-12 (esp. CR-3 Phase 1→FULL via Tier 1a T1-T7 mechanical W156 F1 manifest §2 + CR-9 install-risk + CR-12 disposition lattice)
- `Z:/claude-sota-installed/.claude/rules/advanced-agent-team-standing-directive.md` invariants 1-8 (ATD n=3 user-trigger)
- `Z:/claude-sota-installed/.claude/rules/fm20-path-drift-cascade.md` row 14 + row 9 asymmetric-dual-write
- `Z:/claude-sota-installed/.claude/rules/parallel-agent-wave.md §CADP` max-3 concurrent / max-5 cumulative
- `Z:/claude-sota-installed/.claude/rules/codex-t1-fix-forward-pattern.md` Pattern A / Pattern B HNF / Pattern D foreground+tee
- `Z:/claude-sota/.claude/rules/fm17-subagent-fleet-depletion.md` sub-class .e (CC-runtime autocompact-thrash) + .f (1M-context billing blocker)

## Recursive dogfood note

This forward queue artifact is itself a 5-surface persist surface (tmp/ artifact). Per `cardinal-rule-11.md` META-process SOTA discipline: queue authoring follows same SOTA-cite-trail conformance as the work it queues. CR-1 + CR-8 satisfied via 10 sister-rule cite anchors above; this artifact is TIER-3-LOCAL-OPERATOR-DERIVED.
