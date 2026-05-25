# Wave 80 Agent B — CLIProxyAPI 8-acct cache-locality SOTA (codex-rescue BRIDGE-MODE)

**Origin**: 3-agent parallel wave dispatch (CADP rule 2 max 3 concurrent)
**Brief**: BRIDGE-MODE GPT-5.5 deep-dive on CLIProxyAPI v6.10.9 source + comparable smart-routing-proxy SOTA + multi-agent fleet starvation defense
**Verdict origin**: FAILED (FM-17.b/d-class autocompact-thrashing)
**Tool count**: 4 / Duration: 792s (13.2min) / Total tokens: 261 (suspiciously low — most work consumed by compact loops, not productive tool-use)

## Failure classification

Per `Z:/claude-sota/.claude/rules/fm17-subagent-fleet-depletion.md` (cite-import-AMBER):
- **NOT FM-17.a** (no truncated `<result>` body — agent emitted self-diagnostic instead)
- **NOT FM-17.b** (no 429 cooling-down message in error text)
- **NOT FM-17.c.i** (codex-rescue BRIDGE-MODE wrapper successfully returned; not bg-job state miss)
- **NOT FM-17.c.ii** (no Windows cert-store ACL signature)
- **NOT FM-17.d** (no 600s stream-watchdog stall — agent ran 792s and explicitly returned)
- **NEW SUB-CLASS candidate FM-17.e — autocompact-thrashing**: agent's context filled to limit within 3 turns of /compact firing, 3× consecutive. Likely cause: agent tried to mcp__github__get_file_contents on large CLIProxyAPI source files OR Read large kit zips/MD files without chunking; tool-result bloat exceeded 1M context faster than /compact could reclaim.
- **n=1 candidate sub-class** — single instance; per `codification-threshold.md` cycle-322 jurisdiction n>=3 self-observed bar, NOT yet promotion-eligible. Document for re-evaluation if pattern recurs.

## Recovery disposition

Per `synthesis-layer-verify.md §Reporting categories`: HONEST-NON-FINDING.

**Options for Agent B work surface coverage**:
1. **Re-dispatch with mitigation**: explicit chunk-size bounds (`mcp__github__get_file_contents --line-start N --line-count 500`) + read 1 file at a time + summarize-then-discard pattern. Risk: same agent type may exhibit same failure under SAME brief shape.
2. **Orchestrator-side pivot** (recommended per CR-3 Phase 1 bootstrap exception): direct `codex exec` foreground+tee OR proxy `/v1/chat/completions` POST with focused per-axis prompts (3 separate calls, each <2K tokens output). Cross-model gate satisfied via real GPT-5.5 BRIDGE-MODE without subagent context-bloat risk.
3. **HONEST-NON-FINDING + scope reduction**: Wave 80 ships without Agent B's CLIProxyAPI source-mining axis. Re-spawn in Wave 80B if cross-model coverage is deemed essential.

## Default disposition (orchestrator decision pending Agent C return)

**OPTION 2 recommended** — pivot to orchestrator-side direct proxy dispatch with 3 focused micro-prompts:
- Prompt 1 (≤500 tokens): "What does CLIProxyAPI's session-affinity 1h actually do for cache_read preservation under round-robin?" + cite shape
- Prompt 2 (≤500 tokens): "List 3 distinct features in BerriAI/litellm router.py and Portkey-AI/gateway src/handlers that map to CLIProxyAPI gaps"
- Prompt 3 (≤500 tokens): "Multi-agent fleet starvation defense — name 3 patterns from named-org SOTA repos applicable to round-robin proxy"

Each call satisfies per-call codex 90-180s budget. Aggregate cost ≤6K input + ≤3K output tokens.

## Honesty disclosures

- Cross-model gate **NOT satisfied** for this axis until orchestrator pivot fires
- Agent B's brief was bounded (OUTPUT_BUDGET 800 LOC + max_turns 22 + per-call codex 90-180s budget) but agent appears to have exceeded context-budget on tool-result accumulation BEFORE producing artifact body
- Suggest brief-template enhancement for future BRIDGE-MODE agents: explicit "read source files in 500-line chunks max; summarize after each Read; do NOT git-clone whole repos" mitigation in CONSTRAINTS slot

## HANDOFF
verdict_one_line: BLOCKED — autocompact-thrashing class; orchestrator-side pivot OR re-dispatch with chunk-size mitigation required for cross-model coverage on CLIProxyAPI source-mining + Layer-2 proxy SOTA + fleet-starvation-defense axes.
