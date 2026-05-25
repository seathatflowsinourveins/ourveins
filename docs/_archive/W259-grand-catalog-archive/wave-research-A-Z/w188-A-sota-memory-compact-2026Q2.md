---
title: W188-A SOTA Memory + Auto-Compact 2026-Q2 single-axis research
status: AUTHORITATIVE
date: 2026-05-13
agent: sota-researcher (Sonnet stand-in)
output_budget: 400 LOC
termination: on_handoff_to: orchestrator | max_turns: 20 | on_text_match: "VERDICT-FINAL"
---

# W188-A — SOTA Memory + Auto-Compact 2026-Q2 (single-axis research)

## STAND-IN-NOTICE

Per `cross-model-consensus.md §Env-funneled subagent stand-in disclosure mandate`: this agent runs as Sonnet stand-in (orchestrator-direct, not BRIDGE-MODE to GPT-5.5). No `codex exec` invoked this fire. Cross-model gate NOT structurally satisfied. Orchestrator must file 2nd-stage validation per `agent-harness-fit-verification.md §FM-09` if recommending ADOPT/STUDY beyond research output.

## Scope

Single-axis: SOTA auto-compact + cross-session memory patterns 2026-Q2. 7 candidates × 7 Probes × Axis-1/2/3 + TIER-1 cite anchor synthesis. NO scope creep beyond axis.

## TIER-1-DIRECT cite anchors (verified this fire)

1. **`Z:/repos/deps/learn-claude-code/docs/en/s06-context-compact.md:15-84 @ HEAD 4b95969a03f780e8aa17340a10ff0a6d9512a2c9`** [VERIFIED 2026-05-13 via Read+rev-parse] — 3-layer compression: micro_compact (silent per-turn, tool-result placeholder), auto_compact (token-threshold trigger, transcript-to-disk + LLM summary), manual compact (on-demand same summarization). Transcripts preserve full history on disk; "Nothing is truly lost — just moved out of active context."

2. **`Z:/repos/deps/claude-code-best-practice-shan/tips/claude-thariq-tips-16-apr-26.md:101-125 @ HEAD 48f2cebeb88b389b27231c418ceadb65baf813fd`** [VERIFIED 2026-05-13 via Read+rev-parse] — Thariq named-T2 author 2026-04-16. Verbatim L125: "due to context rot, the model is at its least intelligent point when compacting. With one million context, you have more time to /compact proactively with a description of what you want to do." Compact-vs-clear disjoint use cases: compact=keep-momentum (lossy, cheap); fresh+brief=high-stakes (operator-curated, exact).

3. **`https://github.com/topoteretes/cognee-integrations/tree/main/integrations/claude-code` README:204** [VERIFIED via cognee README:204 grep] — verbatim hook list: "SessionStart initializes memory, PostToolUse captures actions, UserPromptSubmit injects relevant context, PreCompact preserves memory across context resets, and SessionEnd bridges session data into the permanent graph." n=1 distinct upstream PreCompact use citing claude-code lifecycle event name.

## Candidate × Probe-DAG matrix (7 candidates × Probes 1-7 + Axis 1/2/3)

Per `ahfv-probe-dag.md`. Legend: P=PASS / F=FAIL / N=N/A / ?=UNKNOWN.

| Cand | P1 count | P2 SDK/CLI | P3 API | P4 plugin-ns | P5 mode-harness | P6 LICENSE/registry | P7 demand-gate | Ax-1 | Ax-2 | Ax-3 (age/cpd) |
|------|----------|------------|--------|--------------|------------------|----------------------|----------------|------|------|----------------|
| **claude-mem v13.2.0** | 75522★/6490 fork [VERIFIED gh API 2026-05-13] | CC plugin (hooks.json 6 lifecycle) | Anthropic CC native (Setup/SessionStart/UserPromptSubmit/PostToolUse/Stop verified) | thedotmack/claude-mem — NOT in sss installed plugin namespaces (12 marketplaces probed, NOT present) | autonomous-loop fit (no HARD-GATE; SQLite + worker daemon @ port 37700+uid) | Apache-2.0 + npm:200 + HEAD 13d5fa71 2026-05-08 | **7.b candidate** — sss has `memory` MCP (mcp-memory-service sqlite_vec) + `graphiti` MCP (FalkorDB temporal-KG) already installed; claude-mem would be 3rd memory backend → DUPLICATE-FUNCTIONALITY OR PARTIAL-OVERLAP per CR-12 6-class lattice | 4-org axis-1 incl Anthropic CC native + addyosmani + ECC + thedotmack | named-author Alex Newman + thedotmack 75K★ | 255d (8.5mo, **<3mo from this cite-date irrelevant**: passes ≥90d burn-in but FAST-CHURN-BAND given 75K★ explosive growth — re-audit at age >180d) |
| **supermemory v4.21.1** | 22551★/2057 fork [VERIFIED] | npm+pypi+MCP server | MCP URL-based (https://mcp.supermemory.ai/mcp) | NOT in sss namespaces | OAuth-gated cloud-API + remote MCP (autonomous-loop incompatible — HARD-GATE on OAuth) | MIT + npm:200 + HEAD 47bd9805 2026-05-08 | **7.a REJECT-FOR-FIT** — OAuth-gated remote service; CR-10 research-first prefers local backend; sss policy at CR-9 install-risk + W181 evidence shows OAuth fleet 0/8 (all 401) | named-org supermemoryai + #1 LongMemEval/LoCoMo/ConvoMem benchmarks (3 benchmark claims) | named-org supermemoryai (Shreyans) + 22K★ | 806d (26.9mo) STABLE-BURN-IN |
| **mem0 v2.0.2** | 55634★/6331 fork [VERIFIED] | pip + MCP via plugin | Cloud-API (m0- API key) OR self-hosted | NOT in sss namespaces | docs/integrations/claude-code.mdx confirms MCP integration; **HARD-GATE** on m0- API key per docs/integrations/claude-code.mdx:21 | Apache-2.0 + pypi:200 + HEAD 54a03cc7 2026-05-09 | **7.a REJECT-FOR-FIT** — API-key gate violates autonomous-loop default + DUPLICATE-FUNCTIONALITY with `memory` MCP already installed per CR-12; self-host path POSSIBLE but adds backend stack | 3-org axis-1 (mem0ai + claude-code + codex/cursor integrations) | named-org mem0ai + 55K★ | 1058d (35.3mo) STABLE-BURN-IN |
| **cognee v1.0.9** | 17215★/1800 fork [VERIFIED] | pip + cognee-mcp + claude-code-plugin | Anthropic CC PreCompact + 5 lifecycle hooks verified at cognee README:204 | NOT in sss namespaces | autonomous-loop fit; **HONEST PreCompact use** (5-hook lifecycle: SessionStart+PostToolUse+UserPromptSubmit+PreCompact+SessionEnd) | Apache-2.0 + pypi:200 + HEAD b0f513b4 2026-05-08 | **7.b STUDY-PILOT-NARROW eligible** — PreCompact event is DEMAND-CREATES-NEW-WORKFLOW (sss currently has NO PreCompact memory-bridge primitive — auto-compact-discipline.md Rank #3 intelligent-compact PreCompact hook is for priority preservation, not memory persistence). 5-clause check: (1) named use case=preserve memory across context-reset; (2) source path=`Z:/claude-sota-installed-state/`; (3) wiring=cognee-mcp install; (4) incumbent=mcp-memory + graphiti DO NOT bridge PreCompact event; (5) reversible <1min via /plugin uninstall | named-org topoteretes + Nous Research integration (Hermes) | named-org topoteretes + 17K★ | 1001d (33.4mo) STABLE-BURN-IN |
| **langgraph v1.x** | 31997★/5424 fork [VERIFIED] | pip + JS SDK (langgraph) | Framework-level (NOT MCP); checkpoint/postgres/sqlite memory backends | NOT in sss namespaces; would be FRAMEWORK swap not memory primitive | DUPLICATE-FUNCTIONALITY with existing Anthropic CC orchestration; **META-HARNESS competing-framework shape** per `docs/verified-avoid.md` Cohort 1 | MIT + pypi:200 + HEAD 2e5025ec 2026-05-08 | **7.a REJECT-FOR-FIT** — competing-framework META-HARNESS per ahfv-probe-dag §Probe 7 hard precondition; sss already uses Anthropic CC orchestration | named-org langchain-ai + 32K★ | named-org langchain-ai + Klarna/Replit/Elastic | 1008d (33.6mo) STABLE-BURN-IN |
| **getzep/graphiti** | 26028★/2592 fork [VERIFIED] | **ALREADY INSTALLED** in sss as `graphiti` MCP per .mcp.json + falkordb backend | Anthropic CC MCP — installed | INCUMBENT — sss has graphiti L3 temporal-KG per memory-stack | sss-native fit | Apache-2.0 + HEAD 2026-05-13 | **N/A — already installed**; this candidate is INCUMBENT not adopt-candidate | named-org getzep | named-org getzep + 26K★ | 643d (21.4mo) STABLE-BURN-IN |
| **memorpy** | PyPI 404 [VERIFIED] | n/a | n/a | n/a | n/a | **PHANTOM-PACKAGE** — pypi.org/pypi/memorpy/json returns 404 | **7.a REJECT-decisive** — package does not exist per Probe 6 direct-registry probe | F (Axis-1 fail at source) | F | F |

## Axis-1+2+3 convergence (per convergence-gate.md)

**Axis-1 ≥3-distinct-orgs PASS for "auto-compact + cross-session memory" pattern as a CATEGORY (not single repo)**:
- Anthropic CC native (PreCompact hook event documented at https://code.claude.com/docs/en/hooks) — org #1
- thedotmack/claude-mem (community plugin, named-author Alex Newman) — org #2
- topoteretes/cognee (named-org) — org #3
- mem0ai (named-org, Apache-2.0) — org #4
- supermemoryai (named-org, MIT, #1 LongMemEval/LoCoMo/ConvoMem benchmarks) — org #5

**Axis-2 ≥2-named-T2 with dated artifact PASS**:
- Thariq named-T2 author 2026-04-16 at `Z:/repos/deps/claude-code-best-practice-shan/tips/claude-thariq-tips-16-apr-26.md:101-125 @ 48f2ceb` ("compact vs clear", "1M context proactive compact")
- Alex Newman (thedotmack/claude-mem) 75K★ MIT/Apache-2.0
- Addy Osmani CITE-CANONICAL per W164 F13 (4th-org Axis-1 reinforcement for source-driven discipline)

**Axis-3 PASS for category (5 of 7 candidates STABLE-BURN-IN >180d)**:
- mem0 35.3mo, langgraph 33.6mo, cognee 33.4mo, supermemory 26.9mo, graphiti 21.4mo all PASS
- claude-mem 8.5mo PASS ≥90d but FAST-CHURN (cpd not measured this fire)
- memorpy phantom

## TOP-3 ADOPT-NOW / STUDY-PILOT-NARROW

### #1 — cognee STUDY-PILOT-NARROW (PreCompact memory bridge — DEMAND-CREATES-NEW-WORKFLOW)

**Verdict**: STUDY-PILOT-NARROW per Probe 7.b 5-clause check (pass).

- **Use case**: bridge claude-sota-installed memory across `/compact` events. sss currently relies on auto-compact-discipline.md Rank #3 PreCompact hook (priority-preservation patches A-F) for ship-critical state, but NO bridge to mcp-memory / graphiti for memory persistence. cognee PreCompact hook fills this gap per README:204 explicit "PreCompact preserves memory across context resets."
- **Cite anchor**: `Z:/repos/deps/cognee/README.md:204 @ HEAD b0f513b43df8cb2d62063e3fb43e673738fd0552 [VERIFIED 2026-05-13]`
- **Install path**: `claude --plugin-dir ./cognee-integrations/integrations/claude-code` per cognee README:194 OR `pip install cognee` + `.mcp.json` cognee-mcp stdio entry
- **Risk per CR-9**: 2-round fix-forward expected; version-pin `cognee==1.0.9` to avoid D6 auto-upgrade
- **Reversibility**: <1min via `/plugin uninstall cognee` OR `.mcp.json` removal
- **DEFER condition**: if Wave 184/185 GraphRAG/RAG audit revisits the broader memory-architecture (cognee is RAG-class), this STUDY-PILOT should consolidate with that decision

### #2 — claude-mem STUDY-PILOT-CITE-REFERENCE (compact-discipline reference only, NOT install)

**Verdict**: CITE-CANONICAL per CR-12 6-class lattice (existing memory primitives cover persistence; claude-mem is compact-pattern reference).

- **Use case**: compact-pattern + 6-lifecycle-hook architecture is the most canonical claude-code-native memory plugin (75K★ in 8.5mo, Anthropic-style 3-layer compression + Bun worker + SQLite + Chroma + viewer-UI).
- **REJECT-AS-INSTALL** because: PARTIAL-OVERLAP with `memory` MCP (sqlite_vec already covers semantic search) + `graphiti` MCP (FalkorDB already covers temporal-KG); CR-12 PARTIAL-OVERLAP class.
- **Adopt-pattern**: cite `claude-mem v13.0.0 CLAUDE.md:1-40 @ HEAD 13d5fa71 [VERIFIED]` for the 6-hook architecture as reference when implementing sss-native PreCompact memory bridge.
- **Cohort**: thedotmack named-author + Apache-2.0 + 75K★ STRONG-PROVENANCE-EXPRESS Axis-3 admissibility predicate

### #3 — Anthropic-native 3-layer compression (`learn-claude-code` s06 ADOPT-CITE-CANONICAL — NOT install)

**Verdict**: CITE-CANONICAL per CR-1 + CR-8 (this is the doctrinal pattern, not an installable repo).

- **Use case**: codify the 3-layer compression discipline (micro_compact silent / auto_compact threshold / manual compact on-demand) as sss-native pattern at `.claude/rules/auto-compact-discipline.md` (Rank #3 already present; this fire's research validates SOTA-anchored authority).
- **Cite anchor**: `Z:/repos/deps/learn-claude-code/docs/en/s06-context-compact.md:15-84 @ HEAD 4b95969a [VERIFIED]`
- **Transcripts-to-disk pattern**: matches Karpathy §5 Wiki Compounding Surface JSONL layer-1 chronological log (sss already has `.claude/state/*.jsonl` per audit-action-loop.md).
- **No install action** — sss already implements Layer-1 (subagent_transcripts.jsonl, codex_consult_*_OUT.txt) and Layer-2 (Anthropic CC `/compact` + ENV (i) at 70% threshold codification W180 F4 + W183 F1 reverted).

## TOP-3 REJECT-FOR-FIT

### #1 — supermemory REJECT-FOR-FIT (OAuth gate, CR-9 install-risk)

- **Probe 7.a DEMAND-ABSENCE**: sss workflow lacks SaaS-cloud-memory consumer; OAuth fleet historically failed (W181 evidence 0/8 OAuth 401).
- **Probe 5 mode-harness-shape FAIL**: HARD-GATE on OAuth incompatible with autonomous /loop mode.
- **Cohort attribution**: SaaS-cloud-memory Cohort (incompatible with CR-5 install-priority + local-backend-preference).

### #2 — mem0 REJECT-FOR-FIT (API-key gate + DUPLICATE per CR-12)

- **Probe 7.a DEMAND-ABSENCE**: requires `m0-` API key per docs/integrations/claude-code.mdx:21; self-host path POSSIBLE but DUPLICATE-FUNCTIONALITY with existing `memory` MCP (sqlite_vec).
- **CR-12 disposition**: DUPLICATE-FUNCTIONALITY (sss already has L1 memory + L3 temporal-KG installed per Memory Stack).
- **Cohort attribution**: SaaS+self-host hybrid memory Cohort.

### #3 — langgraph REJECT-FOR-FIT (META-HARNESS competing-framework shape)

- **Probe 5 + Probe 7 hard precondition FAIL**: framework-level orchestration competes with Anthropic CC native orchestration; META-HARNESS shape per `docs/verified-avoid.md` Cohort 1.
- **Cohort attribution**: META-HARNESS competing-framework Cohort 1.
- **CR-12 disposition**: NOT-COMPLEMENT — sss orchestrator IS Anthropic CC native (cardinal-rule-1 + CR-3).

## Auto-compact SOTA cross-cite synthesis — canonical 2026-Q2 pattern

**Anthropic-canonical pattern (s06)**: 3-layer compression (micro/auto/manual) with transcripts-to-disk preservation. NOT lossy when transcripts preserved; recovery via re-load from disk.

**Thariq named-T2 refinement (2026-04-16)**: model-at-least-intelligent-during-compact problem mitigated by 1M-context proactive compact with description ("/compact focus on auth refactor, drop test debugging"). Compact ≠ clear: compact=lossy-keep-momentum; clear=operator-curated-fresh-brief for high-stakes next step.

**cognee operational extension**: PreCompact hook event (Anthropic CC native lifecycle) bridges in-context memory into permanent knowledge graph BEFORE compression fires. sss `auto-compact-discipline.md` Rank #3 + #3.5 already operates at PreCompact layer for priority-preservation (intelligent-compact); cognee would add memory-graph-persistence at same event.

**claude-mem 6-hook architecture (75K★)**: separates Setup (version-check) + SessionStart (worker-service + claude-code context) + UserPromptSubmit (session-init) + PreToolUse Read (file-context) + PostToolUse (observation) + Stop (summarize). NO explicit PreCompact in hooks.json this verify — claude-mem relies on SessionStart "compact" matcher rather than PreCompact event. Architecturally inferior to cognee for compact-event-driven memory persistence.

**Canonical 2026-Q2 verdict**: Anthropic-native 3-layer compression (s06 doctrinal) + cognee-style PreCompact memory bridge (operational extension) is the SOTA stack. sss already has Layer-1 (transcripts JSONL) + Layer-2 (Anthropic CC auto-compact at 70% via ENV (i) when active) + Rank #3 PreCompact priority-preservation; the gap is Layer-3 cross-session memory bridge — which cognee or sss-native PreCompact hook with `graphiti add_memory` integration could close.

## Decisive ADOPT vs DEFER recommendations

**ADOPT-NOW (subject to 2nd-stage validation per FM-09)**: NONE this fire. cognee STUDY-PILOT-NARROW is closest but needs Path D codex foreground+tee 2nd-stage harness-fit verification per `cmc-t1-t7-lifecycle.md §Profile selection rule` + Probe 7.b 5-clause re-audit before install commit.

**STUDY-PILOT-NARROW**: cognee — pending operator + Pattern A codex T1 verdict on the 5-clause Probe 7.b check.

**CITE-CANONICAL (already adopted as pattern, no install action)**: 
- `learn-claude-code` s06 3-layer compression doctrine
- `claude-code-best-practice-shan/tips/claude-thariq-tips-16-apr-26.md` compact-vs-clear discipline
- claude-mem 6-lifecycle-hook architecture as reference

**REJECT-FOR-FIT**: supermemory (OAuth) + mem0 (API key + duplicate) + langgraph (META-HARNESS) + memorpy (phantom-package)

## Cite-class lattice (per citation-discipline.md rule #8)

`constituents=[TIER-1-DIRECT @ learn-claude-code s06 @ 4b95969a, TIER-1-DIRECT @ shan-tips:101-125 @ 48f2ceb, TIER-1-DIRECT @ cognee README:204 @ b0f513b4, TIER-1-NAMED-AUTHOR-QUOTE @ Thariq named-T2 2026-04-16, TIER-3-LOCAL-OPERATOR-DERIVED @ W188-A research compose]; effective_tier=TIER-3-LOCAL-COMPOSITION` per MIN_PRECEDENCE.

## ARTIFACT-INLINE persist instruction

Orchestrator: this artifact at `tmp/w188-A-sota-memory-compact-2026Q2.md` per ARTIFACT-INLINE per FM-19. Reference in synthesis commit body.

VERDICT-FINAL
