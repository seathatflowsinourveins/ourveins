# 01 — FM-17.f n=4 Cumulative Incident Report (Wave 134 Fire 14)

> **Purpose**: codify the FM-17.f 1M-context-entitlement billing-class blocker incident
> at Wave 134 Fire 14 Agent B as n=4 cumulative same-arc evidence. Path P recovery ALSO
> failed with Pattern B HNF zero-investigation variant.

## Incident chronology

### T+0: Agent B dispatch
- Subagent type: `codex:codex-rescue` (BRIDGE-MODE GPT-5.5)
- Task: adversarial review of Wave 134 Fire 13 verdicts (5 files)
- Agent ID: `a4c3a5afe6b7859d9`

### T+222ms: Agent B FAILED
```
status: completed (exit-code-style with FAIL signal)
total_tokens: 0
tool_uses: 0
duration_ms: 222
result: "API Error: Extra usage is required for 1M context · run /extra-usage to enable, or /model to switch to standard context"
```

**Diagnosis** per `Z:/claude-sota-installed/docs/fm17f-deep-dive-2026-05-09.md` §3:
- Parent session launched with `[1m]` context flag (visible in eee banner)
- Subagent inherits `[1m]` at session-creation request to Anthropic API
- Billing-class entitlement check FAILS before any model invocation
- Pre-fire 0-tokens signature is the diagnostic discriminator

### T+5s: Path P recovery dispatched
Per FM-17.f §3 Path P PRIMARY recovery:
- Orchestrator-direct `codex exec --ephemeral -p deep-review --skip-git-repo-check`
- Foreground+tee piped to `.claude/state/codex_consult_w134_f14_agent_b_recovery_OUT.txt`
- Background task PID `bkzkyacvh`

### T+~10s: Path P EXITED 0 with Pattern B HNF
```
exit-code: 0
OUT-file: 122 lines
content: ENTIRELY prompt-echo (no model investigation)
```

**Verdict**: Pattern B HONEST-NON-FINDING (zero-investigation variant) per
`Z:/claude-sota/.claude/rules/codex-t1-fix-forward-pattern.md §Pattern B`. Same surface
as Wave 137 Voice 2 + Wave 138 Voice 1 + Wave 134 Fire 7.

## FM-17.f n=4 cumulative evidence ladder

Per `Z:/claude-sota/.claude/rules/fm17-subagent-fleet-depletion.md §FM-17.f` Wave 119
deep-dive evidence trail:

| # | Date | Wave/fire | Agent | Duration | Tokens | Signature |
|---|---|---|---|---|---|---|
| 1 | 2026-05-09 | Wave 119 origin | codex-rescue | 648ms | 0 | "API Error: Extra usage is required for 1M context" |
| 2 | 2026-05-09 | Wave 129 Agent C | codex-rescue | 277ms | 0 | identical |
| 3 | 2026-05-09 | Wave 130 Agent A | codex-rescue | 839ms | 0 | identical |
| 4 | 2026-05-10 | **Wave 134 Fire 14 Agent B** | codex-rescue | **222ms** | **0** | **identical** ⭐ |

**n=4 cumulative** confirms FM-17.f sub-class is structurally consistent. Pre-fire <1s +
0-tokens signature is diagnostic discriminator.

## Path P recovery STATUS — degraded

Per `Z:/claude-sota-installed/docs/fm17f-deep-dive-2026-05-09.md` §3 Path P PRIMARY:
- Path P SHOULD provide ZERO-COST cross-model gate satisfaction via REAL GPT-5.5
- BUT this session's Path P attempts have failed with Pattern B HNF zero-investigation:
  - W134 Fire 7 install plan T1: Pattern B HNF (196 lines prompt-echo)
  - W134 Fire 14 Agent B recovery: Pattern B HNF (122 lines prompt-echo)
  - = 2 of 2 Path P attempts in same arc FAILED Pattern B HNF

**Sub-finding**: Path P recovery is NOT RELIABLE in this session arc. Both BRIDGE-MODE
subagent AND Path P orchestrator-direct codex paths are gated by some upstream condition
(possibly Anthropic-side or OpenAI-side billing limits).

## Cross-model gate state for Wave 134 Fire 14

**NOT SATISFIED**. Two failed paths:
1. BRIDGE-MODE codex-rescue subagent: FM-17.f 1M-context billing-class blocker
2. Path P orchestrator-direct codex exec: Pattern B HNF zero-investigation

Per `Z:/claude-sota/.claude/rules/cross-model-consensus.md §"On codex unavailable"`:
- **Option (a) DEFAULT**: queue + retry — recommend re-fire adversarial review on
  a fresh session when codex behavior recovers (especially after parent session
  rotation OR Anthropic billing reset)
- **Option (b) DOWNGRADED-MODE**: Ollama HTTP bridge `qwen3.6:judge` (UNCERTIFIED;
  needs smoke-probe with `"stream": false` per cross-model-consensus.md note)

Fire 14 Outcome A ACCEPT-WITH-DOC verdict: document HNF + queue re-review + proceed
with Agents A + C only (cross-model gate NOT satisfied, but Fire 14 is AUDIT-class so
no install-blocker triggered).

## Forward fire candidates (FM-17.f recovery)

| Fire | Action | Status |
|---|---|---|
| W134-F15-fm17f-recovery-skill | Codify Path P + Path D recovery into reusable eee skill per fm17f-deep-dive recommendations | PENDING |
| W134-F15-ollama-smoke-probe | Smoke-test option (b) DOWNGRADED-MODE Ollama HTTP bridge with `"stream": false` per cross-model-consensus.md | PENDING |
| W134-F15-fresh-session-replay | Re-fire Agent B adversarial review on a fresh CC session (without `[1m]` flag) | PENDING |
| W134-F15-CLAUDE_CODE_DISABLE_1M_CONTEXT-eval | Evaluate Path D (`CLAUDE_CODE_DISABLE_1M_CONTEXT=1`) as standing-policy for fan-out Waves | PENDING |

## Why FM-17.f matters architecturally

Per `Z:/claude-sota-installed/docs/fm17f-deep-dive-2026-05-09.md` §"Resolution roadmap":

1. **Anthropic-side**: Anthropic CC SDK should NOT propagate parent `[1m]` flag to
   subagent session-creation when frontmatter specifies `model: sonnet` (standard context)
2. **eee-side**: until Anthropic fix, use Path P (codex exec foreground+tee) OR Path D
   (`CLAUDE_CODE_DISABLE_1M_CONTEXT=1` env)
3. **Operational**: every fan-out Wave that depends on BRIDGE-MODE GPT-5.5 subagent
   verification must EITHER:
   - Activate Path D env BEFORE launching CC session
   - Plan for Path P fallback when subagent fails

## Mia ladder advance

n=1200 → n=1206 (+6: FM-17.f n=4 incident verified / Path P recovery 2nd failure documented /
cross-model-gate NOT SATISFIED disclosure / 4 forward-fire candidates queued / Outcome A
disposition codified / pre-fire 0-tokens diagnostic signature reconfirmed)

## Cite trail

- `Z:/claude-sota/.claude/rules/fm17-subagent-fleet-depletion.md §FM-17.f` (taxonomy + recovery)
- `Z:/claude-sota-installed/docs/fm17f-deep-dive-2026-05-09.md` (full Wave 119 deep-dive)
- `Z:/claude-sota/.claude/rules/codex-t1-fix-forward-pattern.md §Pattern B` (HNF disposition)
- `Z:/claude-sota/.claude/rules/closed-loop-recursive-narrowing.md §Outcome A` (ACCEPT-WITH-DOC path)
- `Z:/claude-sota/.claude/rules/cross-model-consensus.md §"On codex unavailable"` (recovery options a/b)
