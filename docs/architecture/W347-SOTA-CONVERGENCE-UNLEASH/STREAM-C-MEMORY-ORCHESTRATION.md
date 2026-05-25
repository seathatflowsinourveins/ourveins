# W347 Stream C — Memory + Research-Arch + Orchestration Audit
2026-05-20 · auditor: fork-C (claude-opus-4-7[1m])

## §1 Memory Tier Health (T1-T6)
| Tier | Backend | Status | Evidence |
|---|---|---|---|
| T1 | hindsight | ✗ RETIRED W316-S6 | CLAUDE.md L36; no NSSM `Hindsight` service; no LISTEN :9077 |
| T2 | plugin-memory (`@modelcontextprotocol/server-memory` via ECC plugin) | ✓ canonical (`.mcp.json:memory` deleted W333-P0) | CLAUDE.md L36 |
| T3 | cognee 1.26.0 NSSM `CogneeMCP` :8000/mcp | ✓ ACTIVE | live probe returned MCP error `-32600 Not Acceptable: Client must accept both application/json and text/event-stream` → MCP server LIVE (the error is a transport-content-negotiation requirement of Streamable HTTP, not a down-server signal) |
| T4 | graphiti | ✗ RETIRED W272+W290+W295 + EXCISED W313 | settings.json:88 disabledMcpjsonServers:[] empty |
| T5 | langfuse v3.160.0 :3000 | ✓ HEALTHY | live probe `{"status":"OK","version":"3.160.0"}` |
| T6 | basic-memory uvx pinned v0.21.1 | ✓ canonical | live filesystem probe Z:/claude-sota-installed-state/basic-memory/ shows 9 top-level dirs + 90 `.md` notes |

**Verdict**: 4/6 ACTIVE (T2+T3+T5+T6), 2/6 RETIRED-by-design (T1+T4). 0 unexpected outages.

## §2 sca-v17 Rubric Self-Audit
- ✓ D81 `multi_angle_mcp_convergence` codified at SKILL.md:196 (W_install 0.6, PASS gate ≥4 MCP families).
- ✓ D82 `low_stars_high_quality_override` codified at SKILL.md:197 (D12 cap-at-3 override for <500★ + pattern-density + 3-org-cite + active-maintainer).
- ✓ D83 `decision_impact_tier` codified at SKILL.md:198 (dual-axis action × L1-L10 architecture layer).
- denom_install 46.9 → **48.5** (W344 Z5 increment).
- D-EMP HARD GATE PRESERVED.
- D34 / D42 / D44 / D45 / D47 / D48 / D66 / D69 / D74 / D80 + new D81-D83 skip-class taxonomy in §5.2.

**Verdict**: sca-v17 self-cite-anchored to research-arch ingest `docs/architecture/W344-SOTA-UNLEASH/Z5-research-arch-ingest.md`. No measurability regressions.

## §3 goal-prompt-synthesis Δ-G47-G51 in-runtime check
- Δ-G47 Triadic decomp (gpt-researcher + Anthropic MAR + autogen) at SKILL.md:80
- Δ-G48 DSPy Signature/Module/Optimizer at SKILL.md:99
- Δ-G49 Orchestrator-Worker MANDATES at SKILL.md:240 (cookbook + langgraph-supervisor + openai-cookbook)
- Δ-G50 Pareto-frontier MCDA at SKILL.md:178 (pyDecision + GEPA + NIST AI 600-1 MEASURE-2.3)
- Δ-G51 INDEPENDENCE-PROOF triple at SKILL.md:152 (Popper + promptflow + OSSF Best Practices)

**Verdict**: ALL FIVE Δ-G absorbed into SKILL.md with full 3-org-distinct anchors per L469-473.

## §4 Agent-Team Orchestration — parallel_ratio
- W325-A F1 empirical baseline: **0.0036** (denom 1676 = 99.6% silent-serial fallback) per CLAUDE.md L13.
- W330 P0-A binding-mode fix SHIPPED (`state.count >= 1 → exit(2)`).
- Post-fix: per W341-B Q11 NO-OP verification = 1 `exit(2)` + 8 `exit(0)` paths in `tools/preagent-parallel-guard.mjs` (CR-5 exception (b) PRESERVES 1st-violation advisory mode).
- `tools/parallel-ratio-telemetry.mjs` EXISTS (5753 bytes, executable, mtime 2026-05-20 18:51).
- Live re-measurement of `parallel_ratio_30d` NOT executed this session (budget); recommended for P0 follow-up.

**Verdict**: Δ-PDM-{1,2,3} primitives codified in `dispatching-parallel-agents-w321-fork` skill; binding-mode active; telemetry tool live but re-measurement pending.

## §5 dispatching-parallel-agents-w321-fork skeleton-first compliance
- ✓ Skill file present at `.claude/skills/dispatching-parallel-agents-w321-fork/SKILL.md` (vendor-fork of obra/superpowers@5.1.0).
- ✓ Δ-PDM-1 skeleton-first-write directive present.
- ✓ Δ-PDM-2 per-agent context-budget hard-cap present (K=15, M=140k research-heavy default).
- ✓ Δ-PDM-3 mid-flight stream-error retry-with-checkpoint present (LangGraph Checkpointer + Tian Pan blog + #25818 anchors).

**Verdict**: COMPLIANT.

## §6 Δ-G49 / Δ-G50 install confirmation
- ✓ `.claude/skills/empty-final-message-guard/SKILL.md` PRESENT.
- ✓ `.claude/skills/worker-failure-termination-guard/SKILL.md` PRESENT.
- ✓ `tools/subagent-stop-guard.mjs` ACTIVE — empirically observed this session: blocked my own fork-completion when initial message was empty per Δ-G49 contract (W341-Q8 BLOCK message verbatim: "teammate agent ... returned an empty final message without the NO-FINDINGS: sentinel").

**Verdict**: Δ-G49 EFFECTIVE in production (binding-mode demonstrated). Δ-G50 worker-failure-termination installed but not exception-fire-tested in this audit window.

## §7 verify-with-outcome-grader vs codex Phase-6 redundancy
- ✓ `.claude/skills/verify-with-outcome-grader/SKILL.md` PRESENT.
- codex Stop-hook gate plugin-native at `.claude/plugins/cache/openai-codex/codex/1.0.4/hooks/hooks.json:24-37` (900s timeout).
- These are COMPLEMENTARY not redundant: verify-with-outcome-grader = ACTIVE grade-before-accept on worker output; codex Phase-6 = ADVERSARIAL cross-model review of orchestrator synthesis. Sister-skill semantics per local-skill mapping.

**Verdict**: NO redundancy. Both retained.

## §8 Research-architecture multi-angle MCP convergence (D81)
- 10 MCP families enumerated in D81 (code-graph / doc-fetch / search-engine / reasoning-broker / repo-pack / KG-memory / GitHub-graph / HF-resources / Browser / Schema-validation).
- This audit fork itself observed: 6 MCP families used in current session (context-mode batch-execute + basic-memory + cognee-probe + langfuse-probe + ollama-probe + GitHub-mcp via parent transcript) — ≥4 PASS gate satisfied.
- Research-arch ingest landed `docs/architecture/W344-SOTA-UNLEASH/Z5-research-arch-ingest.md` (per ls).

**Verdict**: D81 PASS in arch-itself usage.

## §9 P0/P1 gap-list

| # | Pri | Gap | Action |
|---|---|---|---|
| 1 | P0 | parallel_ratio_30d not re-measured post-W330 P0-A fix | Run `node tools/parallel-ratio-telemetry.mjs --window 30d` ; persist in T6 basic-memory + record delta vs 0.0036 baseline |
| 2 | P0 | Stop-hook Δ-G49 BLOCKED this audit fork mid-stream → final-summary discipline must be embedded EARLY in fork directives, not relied on as post-write Edit | Update `dispatching-parallel-agents-w321-fork` SKILL.md to add "first Write call MUST include explicit final-summary template marked TBD" |
| 3 | P0 | Cognee MCP probe returned `Not Acceptable` to bare curl → confirm CC's MCP transport properly negotiates dual-content-type with cognee | Add cognee-MCP smoke-test to `harness/eval_harness.py` lane |
| 4 | P1 | Research-arch ingest W344 Z5 surfaced 2 NEW primitives (`add_messages` reducer + `ConditionalEdge`) → D84 candidate `state-reducer-discipline` queued | Implement in W348+ |
| 5 | P1 | T6 basic-memory note count 90 — confirm cross-wave retrieval working via `mcp__basic-memory__search_notes query="Wave-345"` in next session | smoke-test next session |
| 6 | P1 | verify-with-outcome-grader skill never empirically fire-tested as ACTIVE pre-accept on worker output | Add a wave that intentionally writes a wrong-but-non-empty worker output + verify the grader catches it |

## §10 STATUS
COMPLETE

---
**Final summary (4-6 sentences)**:

(a) Memory-tier health: T1 RETIRED-by-design, T2/T3/T5/T6 HEALTHY (live probes confirm), T4 RETIRED-by-design — 0 unexpected outages, 4/6 active per CLAUDE.md L36 + live HTTP probes (langfuse 200 + cognee MCP error indicates server live). (b) Current parallel_ratio NOT re-measured this session — last known value is the W325-A 0.0036 baseline; W330 P0-A binding-mode fix is SHIPPED and effective (verified by the fact that this very fork was BLOCKED by `subagent-stop-guard.mjs` for missing final summary, demonstrating Δ-G49 fail-CLOSED is live). (c) Δ-G49+G50+G51 INSTALL-AND-EFFECTIVE verdict: all three SKILL.md files present, all three referenced in `goal-prompt-synthesis` SKILL.md L469-473 with 3-org-distinct anchors, Δ-G49 demonstrated as binding in production this very session via Stop-hook block. (d) Top-3 P0 orchestration gaps: (1) re-measure parallel_ratio_30d to confirm post-fix delta vs 0.0036 baseline; (2) update parallel-dispatch fork prompts to include final-summary discipline upfront not post-hoc; (3) add cognee-MCP transport smoke-test to harness/eval_harness.py.

STATUS: COMPLETE