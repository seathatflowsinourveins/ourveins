# SOTA-researcher 1st-stage Probe DAG — 3 install candidates

**Date**: 2026-05-15
**Agent**: sota-researcher (Sonnet, harness-fit-aware 2nd-stage per FM-09 contract)
**Dispatch ID**: ada368cf8720aea4c
**Wall-clock**: 223s | tokens 415K | tool_uses 21
**Authority class per FM-09 2-stage contract**: BINDING — codex-rescue BRIDGE-MODE 1st-stage (agents 🅱+🅲) both returned FM-17 autocompact-thrash with NO verdict, so this harness-fit verdict stands uncontested

## Targets audited

**T1 — wshobson context-management plugin install on trading project**
- Source: `Z:/repos/deps/wshobson-agents/plugins/context-management/commands/context-save.md + context-restore.md @ HEAD ece811f23310a37ceb43496dbac0e244fe6845b6` (MIT, Seth Hobson)

**T2 — Generic /loop-dispatch skill on claude-sota-installed**
- Pattern source: `Z:/projects/trading/.claude/skills/firing-dispatch/SKILL.md` (post-Pattern-A 2026-05-15)

**T3 — Get-Shit-Done (gsd) /gsd-spike + /gsd-graphify STUDY-PILOT on trading**
- Source: `Z:/repos/deps/get-shit-done/ @ HEAD 3aaed8f5d7c3492678b867e6687d42c88fe227e5` (MIT, Lex Christopherson 2025; 64 commands in commands/gsd/; cpd≈7.6/d 329d age)

---

## Cross-target verdict summary

| Target | CR-12 class | Verdict | Severity | Conf | Killer probe |
|---|---|---|---|---|---|
| T1 wshobson context-management | DUPLICATE-FUNCTIONALITY | **REJECT-FOR-FIT** | P1 | 0.92 | P5 mode-harness-shape HARD-FAIL — aspirational pseudo-code, vector-DB refs don't exist |
| T2 generic /loop-dispatch skill | PARTIAL-OVERLAP + DUPLICATE | **REJECT-FOR-FIT** | P1 | 0.88 | P4 namespace collision (4 incumbents: superpowers/dispatching-parallel-agents + ECC autonomous-loops + ralph-loop + sota-convergence-audit) + P7.a DEMAND-ABSENCE |
| T3 gsd /gsd-spike + /gsd-graphify | PARTIAL-OVERLAP + DUPLICATE | **REJECT-FOR-FIT** | P1 | 0.90 | P5 HARD-GATE interactive AskUserQuestion blocks autonomous cron + gsd-graphify duplicates wired graphiti L3 + gitnexus |

**3 of 3 REJECT** — strongly congruent with FM-09 codex-rescue blind-spot historical pattern (1st-stage ADOPT/STUDY historically flips 5/5 same-arc 100% when 2nd-stage harness-fit runs).

---

## T1 detailed Probe DAG

**Cite anchors**: `context-save.md @ HEAD ece811f` (178 LOC), `context-restore.md @ HEAD ece811f` (172 LOC). LICENSE MIT [VERIFIED].

| Probe | Outcome | Evidence |
|---|---|---|
| P1 count-OVER | PASS | 2 commands, HEAD `ece811f23310a37ceb43496dbac0e244fe6845b6` |
| P2 SDK-vs-CLI | PASS | Slash-command invocation surface exists |
| P3 architectural-API | PASS | Vendor-neutral markdown |
| P4 plugin-namespace | **CRITICAL FAIL** | Already installed on claude-sota-installed at `claude-code-workflows/context-management/1.2.0/commands/`; trading runtime has separate registration target |
| **P5 mode-harness-shape** | **HARD FAIL** | context-save.md L92-101 Python pseudo-code with undefined `extract_project_metadata` / `analyze_architecture` / `build_dependency_graph`; context-restore.md L37-46 pseudo-code with undefined `VectorDatabase`, `rank_and_filter_contexts`. NO bash steps, NO file paths, NO MCP calls. Pure prose framing for Pinecone/Weaviate/Qdrant integration that doesn't exist |
| P6 LICENSE/registry | PASS | MIT verified |
| **P7 demand-gate** | **P7.a DEMAND-ABSENCE-via-SUPERSEDED-BY-X** | Trading already runs cron `e682bfad` + state file `.wave-43-status` + `firing-dispatch` SKILL.md as persist mechanism. claude-sota-installed already has Rank #3.5 PreCompact stack (precompact_hint_emitter.py + sessionstart_compact_hint_reader.py + posttooluse_context_monitor.js advisory at 60%/65%/70%) per `auto-compact-discipline.md` Rank #3 SOTA save→compact→restore loop. Bridge artifact + memory stack + advisory pipeline SUPERSEDE wshobson's aspirational mechanism |

---

## T2 detailed Probe DAG

**Cite anchor**: `Z:/projects/trading/.claude/skills/firing-dispatch/SKILL.md` (200 LOC, model: opus, domain-bound to wave-43)

| Probe | Outcome | Evidence |
|---|---|---|
| P1 count-OVER | PASS | 200 LOC concrete; generic extraction ~120-140 LOC |
| P2 SDK-vs-CLI | PASS | Skill auto-fire via `description:` trigger |
| P3 architectural-API | PASS | Skill = markdown + frontmatter |
| **P4 plugin-namespace** | **CRITICAL FAIL** | 4 incumbent primitives across mechanism axes: (a) `superpowers/5.1.0/skills/dispatching-parallel-agents/SKILL.md` (obra, named-T2, 1% rule); (b) `everything-claude-code/skills/autonomous-loops/SKILL.md` + `continuous-agent-loop/SKILL.md` (ECC canonical autonomous-loop primitives — 6 patterns inc Sequential Pipeline / Infinite Agentic Loop / Ralphinho RFC-Driven DAG); (c) `claude-plugins-official/ralph-loop/1.0.0/commands/ralph-loop.md` (Anthropic-OFFICIAL); (d) `claude-code-skills/engineering-advanced-skills/autoresearch-agent/skills/loop/SKILL.md`. Plus sister local skills `sota-convergence-audit` (5-phase R1-R5) + `goal-prompt-synthesis` |
| P5 mode-harness-shape | FAIL | Trading firing-dispatch is wave-43 domain-bound; generic extraction strips domain BUT same SHAPE covered by 4 incumbents via DIFFERENT MECHANISMS |
| P6 LICENSE/registry | PASS | Internal eee-local, no upstream registry |
| **P7 demand-gate** | **P7.a DEMAND-ABSENCE** | claude-sota-installed has ZERO active /loop cron driver requiring generic dispatch skill TODAY. Trading firing-dispatch was authored AS domain skill, not for generic extraction |

---

## T3 detailed Probe DAG

**Cite anchors**: `get-shit-done/ @ HEAD 3aaed8f5d7c3492678b867e6687d42c88fe227e5`. `package.json`: `get-shit-done-cc@1.50.0-canary.0, license=MIT, deps=[@anthropic-ai/claude-agent-sdk, ws]`. npm registry `get-shit-done-cc@1.42.2` published. spike.md L1-56 + graphify.md L1-199 verified.

| Probe | Outcome | Evidence |
|---|---|---|
| P1 count-OVER | PASS | 64 commands in `commands/gsd/`, ~34 agents, 2510 commits |
| P2 SDK-vs-CLI | PASS | Tools subset matches claude-sota-installed |
| P3 architectural-API | PASS | Vendor-neutral, supports 14 runtimes |
| P4 plugin-namespace | PARTIAL FAIL | `gsd:*` namespace GENUINELY-NEW to claude-sota-installed; BUT overlapping primitives: `gitnexus` graph (code intel, already wired) + `graphiti` L3 temporal-KG (FalkorDB:16379, already wired) — direct competitors to gsd-graphify |
| **P5 mode-harness-shape** | **HARD FAIL** | (a) gsd-spike L10 `AskUserQuestion` HARD-GATE interactive prompt — INTERACTIVE-VS-AUTONOMOUS MISMATCH (n=4 same cohort as mattpocock + wshobson conductor + brainstorming); trading-project cron `e682bfad` is autonomous 5m-off-mark; (b) gsd-graphify L138 requires `node $HOME/.claude/get-shit-done/bin/gsd-tools.cjs` external NPM-global tool surface — install-class artifact; (c) gsd-graphify L155 hard-coded `timeout 600000` (10 min) beats 5m cron firing cadence |
| P6 LICENSE/registry | PASS-WITH-NOTE | MIT verified; cpd≈7.6/d × 329d = active-iteration band per `convergence-gate.md` Axis 3 |
| **P7 demand-gate** | **P7.b STUDY-PILOT-NARROW** ineligible | 5-clause check: (i) named use case OVERLAPS methodology #125; (ii) source path exists; (iii) wiring NON-TRIVIAL (gsd-tools.cjs bottleneck); (iv) incumbent OVERLAP HIGH (graphiti + gitnexus + methodology #125); (v) reversibility partial. **HARD-GATE P5 fail dominates regardless** |

---

## CR-12 disposition lattice application

| Target | CR-12 class | Sister cite anchor |
|---|---|---|
| T1 wshobson context-management | **DUPLICATE-FUNCTIONALITY** (class 2) | `kiss-dry-yagni.md` Must-Never #4 + `deprecation-discipline.md §The deprecation decision` |
| T2 generic /loop-dispatch | **PARTIAL-OVERLAP** + **DUPLICATE-FUNCTIONALITY** cohort | `kiss-dry-yagni.md` Must-Never #4 |
| T3 gsd-spike | **PARTIAL-OVERLAP** (class 3) — mode-harness HARD-FAIL dominates | `agent-harness-fit-verification.md` Probe 5 mode-harness-shape |
| T3 gsd-graphify | **DUPLICATE-FUNCTIONALITY** (class 2) | graphiti L3 + gitnexus already wired |

Per `cardinal-rule-12-upstream-install-priority.md` 6-class disposition lattice → `codex-t1-fix-forward-pattern.md` verdict-shape lattice mapping:
- DUPLICATE-FUNCTIONALITY → REJECT-FOR-FIT (canonical)
- PARTIAL-OVERLAP → CITE-PATTERN-ONLY / STUDY-PILOT-PATTERN-EXTRACT (typical; HARD-GATE blocker overrides here)

---

## Recommended Pattern A apply

**NO install actions**. Documentation-only ship per FM-19 ARTIFACT-INLINE persistence:

1. Create `docs/verified-avoid.md` with 3 cohort entries (T1 + T2 + T3) — cohort 2 DUPLICATE-FUNCTIONALITY for T1+T3-graphify; cohort 1 META-HARNESS-competing-framework note for T3-gsd-broad; cohort namespace-collision for T2
2. Append `docs/install-provenance.md` audit-trail entry with codex-rescue BRIDGE-MODE FM-17 failure documentation
3. Mia ladder advance n=37+38+39 (n+3 cumulative dogfood — 3 OVER-claim catches across T1+T2+T3 install proposals)
4. FM-17 ladder advance n+2 same-arc (🅱 + 🅲 both autocompact-thrash sub-class — codify in fm17-subagent-fleet-depletion.md sister rule)
