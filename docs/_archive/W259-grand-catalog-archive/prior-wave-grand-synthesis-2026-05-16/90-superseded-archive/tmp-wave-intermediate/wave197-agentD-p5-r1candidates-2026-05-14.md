---
title: W197 Agent D — Probe-DAG of 6+1 fresh R1 SOTA candidates + goal-prompt-synthesis R8/R9 verification
status: AUTHORITATIVE-CANDIDATE
date: 2026-05-14
agent: sota-researcher (Agent D, W197 P5 scoped — fresh candidates + R8/R9 verify ONLY; NOT 16-repo cohort)
wave: 197
artifact_class: P5 Probe-DAG verdict + R8/R9 SKILL.md verification
disposition: ARTIFACT-INLINE per FM-19 (orchestrator persisted post-completion)
---

# Agent D scope close — 6+1 fresh candidate verdicts + R8/R9 verification

## (a) 7-row candidate verdict table

| candidate | cite resolves? | Probe 3 (architectural-API) | Probe 5 (mode-harness-shape) | Probe 6 (LICENSE/registry) | CR-12 disposition | verdict |
|---|---|---|---|---|---|---|
| **C1 langgraph `libs/checkpoint`** | [VERIFIED] resolves; HEAD `2e5025ec` MATCHES current | BLOCKED — Python SDK; `BaseCheckpointSaver` needs LangGraph runtime; this runtime is CC CLI | MISFIT — `thread_id`/`checkpoint_id` superstep model needs a `StateGraph`; no /loop or hook surface consumes it | MIT (`libs/checkpoint/pyproject.toml`); no blocker | PROVIDER-COMPLEMENT — workflow-state checkpoint as RESUME primitive, adjacent to Rank #3 loop | **CITE-CLASS-ONLY** — cite checkpoint/thread/pending-writes pattern; do NOT install (Probe 3 SDK-bound) |
| **C2 letta `sleeptime_multi_agent_v4.py`** | [VERIFIED] resolves; HEAD now pinned `bb52a8900a79cf1378e6e9cdecf244b673a13a72` | BLOCKED — `SleeptimeMultiAgentV4` needs Letta server + `letta.*` packages; no Letta-server install | MISFIT — `ManagerType.sleeptime` + `BillingContext` Letta-cloud-internal; no MCP wrapper | Apache-2.0 (`letta/LICENSE`); no blocker | GENUINELY-NEW MECHANISM at surface (async background memory-synthesis observer) BUT ECOSYSTEM-IMPORT at dependency level | **CITE-CLASS-ONLY** — cite the async-background-observer cadence-gate pattern; ECOSYSTEM-IMPORT footprint disproportionate → do NOT install |
| **C3 awesome-agentic-patterns `context-window-auto-compaction.md`** | [INFERRED] resolves; **R1 cite-drift: pinned `ffb42768` != current `9c40e10042254ab896fed6953267b119711bae40`** — content present + matches R1 quote | N/A — doc-only pattern (TypeScript SKETCH for SDK consumers); Probe 3 does not gate cite-class doc | FITS as cite-class — reactive-compaction + reserve-token-floor + lane-aware + post-compaction-verification primitives | Apache-2.0; `based_on` cites named-author Michael Bolin (OpenAI Codex) = TIER-1-NAMED-AUTHOR-QUOTE per citation-discipline.md rule #6 | PARTIAL-OVERLAP — covers compact-invocation primitives (overflow auto-retry, 20k reserve-token floor, model-specific validation) the incumbent Rank #3-#3.5 stack lacks | **CITE-CLASS-ONLY** — **most directly applicable of the 7**; candidate to cite-extend `auto-compact-discipline.md` lattice. SHA must be `9c40e100` (FM-20 fix) |
| **C4 awesome-agentic-patterns `memory-synthesis-from-execution-logs.md`** | [INFERRED] resolves; same R1 cite-drift `ffb42768` != `9c40e100`; content matches | N/A — doc-only pattern | FITS as cite-class — task-diary + periodic-synthesis-agent maps to Karpathy §5 Layer-1+3 (Rank #5) | Apache-2.0; `based_on` cites Anthropic Internal Users + Claude Code Team = TIER-1-NAMED-ORG | PARTIAL-OVERLAP w/ Karpathy §5 Layer-1+3 (Rank #5); NO new mechanism | **CITE-CLASS-ONLY** — cite-extend Rank #5 lattice with named-Anthropic-attribution (Cat Wu + Boris Cherny). Adds Axis-1 evidence, not a new rank. SHA → `9c40e100` |
| **C5 anthropic-cookbook `contextual-embeddings` + `using_sub_agents.ipynb`** | [VERIFIED] both resolve; HEAD `33424c3e` MATCHES | N/A — educational/reference (`using_sub_agents.ipynb` ALREADY cited in `team-orch-patterns.md §Context Budget`) | FITS as cite-class — context-engineering reference + Cost-Tier discipline reference | MIT (`anthropic-cookbook/LICENSE`); no blocker | CITE-CLASS-CANONICAL — Anthropic-OFFICIAL reference material already operating as TIER-1 cite | **CITE-CLASS-ONLY** — ACCEPT-AS-CITE-REFERENCE per CR-12 class 6; re-anchor Axis-1 with the Anthropic-OFFICIAL convergence point. No install |
| **C6 mem0** | [VERIFIED] LICENSE resolves; Apache-2.0; HEAD `54a03cc7217c22afdc6153a9e61cc6413416001f` | BLOCKED for install — Python SDK (`pip install mem0ai`); memory layer already wired (mcp-memory L1 + graphiti L3); no MCP-native path verified | MISFIT as install — no /loop or hook surface consumes mem0; would need MCP wrapper | Apache-2.0; no blocker | DUPLICATE-FUNCTIONALITY — mem0 (fact-extraction memory) parallels installed mcp-memory L1 + graphiti L3; per W134-F27-C precedent STUDY-PILOT-PATTERN-EXTRACT — same memory layer different mechanism; marginal-value absent for L1+L3-installed runtime → kiss-dry-yagni Must-Never #4 | **REJECT-FOR-FIT** — memory layer already covered; mem0 adds a 3rd mechanism with no demand-gate workflow |
| **C7 (bonus) mastra `EventedExecutionEngine`** | [VERIFIED] resolves; HEAD now pinned `a78d13fc8de4f4cb84dd164ec9d72fa55a838f2a` | BLOCKED — `EventedExecutionEngine extends ExecutionEngine` needs Mastra runtime + `@mastra/core`; this runtime is CC CLI | MISFIT — time-travel/restart params assume Mastra `Workflow` registry; no /loop or hook surface | Apache-2.0 — `evented/execution-engine.ts` is OUTSIDE the `ee/` dir | PARTIAL-OVERLAP w/ C1 (workflow state-checkpoint+resume); GENUINELY-NEW vs CC platform but ECOSYSTEM-IMPORT at dependency level | **CITE-CLASS-ONLY** — cite the time-travel re-execution + restart-params pattern; ECOSYSTEM-IMPORT footprint → do NOT install |

### Verdict summary
- **INSTALL: 0 of 7** — every candidate is SDK-bound (C1/C2/C6/C7), already-cited educational reference (C5), or doc-only pattern (C3/C4). None has an MCP-native or CC-CLI-native install path fitting the autonomous /loop + PreCompact/SessionStart hook surface.
- **CITE-CLASS-ONLY: 6 of 7** — C1, C2, C3, C4, C5, C7.
- **REJECT-FOR-FIT: 1 of 7** — C6 mem0 (DUPLICATE-FUNCTIONALITY w/ installed mcp-memory L1 + graphiti L3).
- **STUDY-PILOT: 0** — no candidate creates a genuinely-new non-duplicative workflow that survives Probe 3 + Probe 5.
- **Highest-value cite-extension**: C3 `context-window-auto-compaction.md` — the only candidate with compact-invocation primitives (reserve-token floor, post-compaction verification, model-specific validation) the incumbent stack lacks.
- **Honest scope confirmation** [VERIFIED]: R1 doc's "Honest scope limit" is correct — NO candidate provides agent-side compact INVOCATION; that is an Anthropic CC platform decision. All 7 are PERSIST/RESTORE/adjacent-pattern primitives only.

## (b) goal-prompt-synthesis R8/R9 ENHANCE verification

**Result: ABSENT** [VERIFIED]

`.claude/skills/goal-prompt-synthesis/SKILL.md` (202 lines, read in full) contains phases **R1–R7 only** (R1 multi-source discover / R2 6-Probe-DAG / R3 Axis-1 convergence / R4 LOC<=3800 compose / R5 Agent-team conformance / R6 SessionStart preload gate / R7 Parallel-worktree predicate). After R7 the file goes directly to `## Cite class` + `## Recursive dogfood note` — **NO `### R8` and NO `### R9` heading anywhere** (`Grep` for R8/R9 returns zero matches).

The W196 forward-queue / goal predicate reference "Verify goal-prompt-synthesis R8/R9 ENHANCE landed at SKILL.md" describes a SHIP that **did not land**. Disposition: GENUINE-GAP per `synthesis-layer-verify.md §Reporting categories`. Orchestrator should either (i) carry R8/R9 ENHANCE forward to a W197+ fire, or (ii) confirm whether R8/R9 was descoped. Agent D scope is verification-only — cannot self-classify which.

## (c) FM-20 cite-drift found in the W197 R1 doc

| Drift | R1 doc claim | Actual (probed 2026-05-14) | Severity |
|---|---|---|---|
| **C3 + C4 SHA drift** | Both pinned `@ HEAD ffb427683ec77f3690f7fadfec7a7611d9e907d9` | Current HEAD of `Z:/repos/deps/awesome-agentic-patterns` = `9c40e10042254ab896fed6953267b119711bae40` | **MEDIUM** — content present + consistent; stale-pin not phantom-cite. Any cite-extension to `auto-compact-discipline.md` MUST use `9c40e100`, not `ffb42768` |
| C2 letta SHA unpinned | `@ HEAD <probe-in-P5>` placeholder | Now pinned `bb52a8900a79cf1378e6e9cdecf244b673a13a72` | LOW — resolved this fire |
| C7 mastra SHA unpinned | `@ HEAD <probe-in-P5>` placeholder | Now pinned `a78d13fc8de4f4cb84dd164ec9d72fa55a838f2a` | LOW — resolved this fire |
| C5 anthropic-cookbook | `@ HEAD 33424c3e...` | MATCHES | NONE |
| C1 langgraph | `@ HEAD 2e5025ec...` | MATCHES | NONE |
| C6 mem0 | LICENSE-only, no SHA | HEAD `54a03cc7217c22afdc6153a9e61cc6413416001f` | NONE |

**Net FM-20 finding**: 1 MEDIUM cite-drift (C3/C4 stale `ffb42768` → must be `9c40e100` in any downstream cite) + 2 LOW deferred-placeholder resolutions.

## Honesty notes (Agent D)
- Probe 3 assessed against this runtime's actual mode — CC CLI + autonomous /loop + PreCompact/SessionStart hooks, NOT a Python/TS SDK runtime. All 4 SDK-bound candidates (C1/C2/C6/C7) fail Probe 3 for INSTALL but pass as CITE-CLASS.
- Probe 4: none of the 7 are plugin-marketplace artifacts; no `<plugin>:<skill>` collision — implicitly PASS.
- Probe 1 (count-OVER): N/A — no count claims. Probe 7 (demand-gate): folded into verdict — no candidate survives Probe 3+5 to reach Probe 7.b STUDY-PILOT eligibility.
- Scope adherence [VERIFIED]: probed ONLY the 6+1 fresh candidates + R8/R9; did NOT touch the 16-repo cohort (parallel arc owns it).

ARTIFACT-INLINE complete — handed off to orchestrator for persistence.
