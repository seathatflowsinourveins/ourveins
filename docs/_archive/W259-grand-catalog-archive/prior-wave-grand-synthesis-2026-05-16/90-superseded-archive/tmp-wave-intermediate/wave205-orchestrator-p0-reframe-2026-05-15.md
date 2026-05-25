---
title: W205 orchestrator-side P0 reframe — FM-20 cross-runtime claim propagation catch
status: AUTHORITATIVE
date: 2026-05-15
agent: orchestrator
wave: 205
fire: P0-reframe-mid-arc
disposition: P0 NOT-APPLICABLE-TO-PURE; Agent D will return HONEST-NON-FINDING
goal: capture orchestrator-side Mia probe outcome before agent returns merge
---

# W205 P0 reframe — FM-20 cross-runtime stale-claim propagation catch

## ONE-LINE
/goal P0 "Mirror sibling W197 24-rule narrow" is **NOT APPLICABLE to pure runtime** — pure runtime has **0 `.claude/rules/*.md` files** by cardinal-rule-5 install-priority + bootstrap-only files allowlist. Stale context from claude-sota-installed runtime propagated into /goal predicate without cross-runtime state probe.

## Mia probe outcomes (orchestrator-side, pre-agent-return)

| Sub-claim | Probe | Verdict |
|---|---|---|
| /goal P0: "~44% preload" baseline | Read W197 close-synthesis L67-68 | OVER — actual W196-measured baseline was 28.2%; 44% was over-estimate |
| /goal P0: "63/64 rules carry `.claude/rules/**` glob" | Read W197 L67 | REFUTED — "zero files carry that literal glob"; real mechanism = `CLAUDE*.md`-matching `paths:` glob |
| /goal P0: "Mirror sibling W197 24-rule narrow to pure runtime" | `Get-ChildItem Z:\claude-sota-pure\.claude\rules\ -Filter *.md` returned 0 files | NOT-APPLICABLE — pure runtime has NO local rule files to mirror |
| /goal P0: sibling W197 work shipped | Read W197 close-synthesis L15 | VERIFIED — sibling commit 6a21217 (FM-02.c absorbed); 22 STRIP/KEEP + 2 ADD narrow |
| Pure runtime CLAUDE.md size | Get-Item.Length | 5825 bytes (~5.7KB) — minimal cold-load |
| Pure runtime CLAUDE.local.md | TBD | (probe queued) |
| Pure runtime plugin cache size | du -sk | (probe queued) |

## FM-20 sub-class classification

This catch is **FM-20 row 14-class** (per `fm20-path-drift-cascade.md` row 14 + row 16 ENV-state-claim-survives-revert generalization): claim propagated from one RUNTIME's context (claude-sota-installed where rules are large + W193-W197 narrow arc) into ANOTHER runtime's /goal predicate (claude-sota-pure where rules don't exist at all) without runtime probe at the synthesis-vs-Edit boundary.

Mia caught at orchestrator layer BEFORE Agent D's edit phase = ZERO revert cost. Agent D will return HONEST-NON-FINDING per `synthesis-layer-verify.md §Reporting categories` HNF class (the highest-value return shape per discipline: an agent that probes its own brief assumption and finds it wrong saves a wrong-direction ship).

## Revised P0 framing

**P0-REVISED**: Pure runtime preload audit (NOT rules-narrow). Preload sources for pure runtime:
1. CLAUDE.md (~5.7KB hand-coded bootstrap per CR-5 allowlist) — minimal cold-load
2. CLAUDE.local.md (machine-specific env block) — load
3. Plugin caches at `.claude/plugins/cache/` (11 plugins) — hook-driven injection at SessionStart
4. `.mcp.json` (10 MCP servers) — connection-time only, not preload
5. SessionStart hook chain — `context-mode-cache-heal.mjs` + plugin SessionStart hooks (ecc was disabled)
6. UserPromptSubmit hook — `goal-prompt-synthesis` skill + cardinal-rule injections

**P0-REVISED actions**:
- Quantify each preload source size via `Get-ChildItem -Recurse + Measure-Object`
- Identify the dominant preload contributors
- IF total cold-load preload >20% of context window THEN seek narrow opportunities; ELSE HONEST-NON-FINDING (pure runtime is already optimized by-design)

## Implications for /goal P1-P4

- **P1 %SOTA AUDIT**: STILL VALID — pure runtime hooks/skills/agents/MCPs/plugins all need cite-class classification per `citation-discipline.md` rule #8. Agent E in flight.
- **P2 14-REPO LINE-BY-LINE**: STILL VALID — research wave continues independent of P0 reframe.
- **P3 INSTALL POST-W204-B**: STILL VALID — addyosmani/web-quality-skills + kenryu42/safety-net + browser-use queued. Awaiting Agent B C5+C8.
- **P4 SOFT AUTO-COMPACT**: STILL VALID — intelligent-compact PreCompact + Karpathy §5 + CC native /compact at 60-70%. Pure runtime needs same SOFT auto-compact pattern; FM-20 P0-reframe does not affect this scope.
- **`FM-17.e/Mia/compact-remind` replace**: NEEDS-PROBE per Agent E — pure runtime may not have these hooks installed at all (they're claude-sota-installed-specific). If pure has none, replace is N/A; if pure has cite-imports per Section 14.5, they need CR-9 path-rewrite verification.

## Cross-model gate satisfaction (CR-3)

Per `cross-model-consensus.md §The contract`:
- Orchestrator-side Mia pre-apply probe (this memo) satisfies the verify-before-trust discipline at synthesis-vs-Edit boundary
- 3 agents (B + D + E) in flight serve as cross-voice verification when they return
- BRIDGE-MODE GPT-5.5 codex T1 NOT invoked yet — Path P deferred until synthesis-time when agent returns merge

STAND-IN-NOTICE per `cmc-env-funneled-disclosure.md`: agents D + E are Sonnet stand-ins per `CLAUDE.local.md` ENV (f) since deprecated env removed (see (g) DEPRECATED comment); cross-model gate satisfied at synthesis-layer via Mia pre-apply.

## Recovery path

1. Continue 3 agents in flight (B + D + E)
2. When Agent D returns HNF on P0 (expected), absorb HNF + pivot to P0-REVISED scope
3. When Agent E returns layer matrix, evaluate FM-17.e/Mia replace scope against pure-runtime-actual state
4. When Agent B returns C5+C8 candidates, fold into P3 install ladder
5. Atomic ship per FM-20 row 20 single-shell when all 3 return + Mia pre-apply applied

## STOP gate impact

The /goal STOP conditions:
- 5-backend hash verify per sessionstart-preload-discipline.md step 4 (≥4/5 PASS) — STILL APPLICABLE
- Per-layer %SOTA-clean ≥80% — STILL APPLICABLE (P1 Agent E)
- **P0 preload <20% verified** — REVISED to "pure runtime preload sources documented + bounded" (since rules-narrow N/A)
- 14-repo deep-dive done OR HNF per repo — STILL APPLICABLE (P2)
- 3-org Axis-1 PASS on every install decision — STILL APPLICABLE (P3+P4)

Pure runtime may already satisfy P0-REVISED by-design per cardinal-rule-5 (no local rules to narrow ⇒ no preload-from-rules problem). The actual P0 bottleneck for pure runtime is the plugin-cache hook-injection chain at SessionStart, not rules-glob preload.
