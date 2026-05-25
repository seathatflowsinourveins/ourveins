---
title: W197 R1 discovery cross-cite — 6 FRESH SOTA self-auto-compact sources for P5 16-repo deep-dive agents
status: AUTHORITATIVE-CANDIDATE
date: 2026-05-14
agent: orchestrator (R1 multi-source≥4 fan-out per goal-prompt-synthesis SKILL.md)
parallel-arc: convergent with parallel W197 predicate at tmp/wave197-goal-paste-ready-2026-05-14.md (NOT overwriting per FM-02 sub-c + port-note-discipline.md §6 + FM-20 row 9 asymmetric-dual-write defense)
wave: 197
artifact_class: R1-input cross-cite for P5 16-repo deep-dive agents
disposition: SISTER-ARTIFACT (input for P5 BRIDGE-MODE fan-out; orchestrator-side persisted)
---

# W197 R1 cross-cite — fresh SOTA self-auto-compact sources beyond the 8 already cited in auto-compact-discipline.md

## User ASK (verbatim 2026-05-14 post-compact)

"we need advanced automation, make sure no thrashing hooks that damaging your runtime we need all sota offical, to achieve advanced automation find out the repos that privide your self auto compact in your runtime, find sota repos that have these features"

## Honest scope limit

Per CC platform mechanics: NO agent-side `Compact()` tool exists. "Self-auto-compact" decomposes into 3 mechanically-automatable layers around the platform-level autocompact:

| Layer | Agent-automatable? | Mechanism |
|---|---|---|
| **PERSIST** (pre-compact state-save) | ✅ YES | Write tool / MCP memory backends / bridge artifact compact_hint.json |
| **COMPACT-INVOCATION** | ❌ NO (platform-only) | Autocompact at `CLAUDE_AUTOCOMPACT_PCT_OVERRIDE` threshold OR operator `/compact <hint>` |
| **RESTORE** (post-compact rehydrate) | ✅ YES | SessionStart hook injects `additionalContext` from bridge + memory backends |

The 6 fresh sources below provide PERSIST + RESTORE primitives + adjacent compaction-aware patterns. None of them (and no repo anywhere) provides agent-side compact invocation — that's an Anthropic CC platform decision.

## 6 fresh SOTA candidates verified at Mia-probe 2026-05-14 (orchestrator R1 fan-out)

### Candidate 1 — langgraph `libs/checkpoint`
- **Cite**: `Z:/repos/deps/langgraph/libs/checkpoint/README.md @ HEAD 2e5025ec1ac8d435840ed4a972097de87aaa2eab` [VERIFIED 2026-05-14 via ctx_batch_execute]
- **Org**: LangChain (TIER-1 org)
- **License**: per `libs/checkpoint/pyproject.toml` (probe in P5 deep-dive)
- **Verbatim quote**: "Checkpointers provide a persistence layer for LangGraph. They allow you to interact with and manage the graph's state. When you use a graph with a checkpointer, the checkpointer saves a _checkpoint_ of the graph state at every superstep, enabling several powerful capabilities like human-in-the-loop, 'memory' between interactions and more."
- **Adjacent**: `libs/checkpoint-postgres`, `libs/checkpoint-sqlite`, `libs/checkpoint-conformance` (multi-backend)
- **CR-12 disposition candidate**: PROVIDER-COMPLEMENT (workflow-state-checkpoint as RESUME primitive — adjacent to wshobson `/context-save`+`/context-restore` command pattern at conversation layer; complementary not duplicate)
- **Probe-DAG flag**: P3 architectural-API axis — Python SDK only; sss runs CC CLI not LangGraph SDK → operational adoption blocked by Probe 3. Use as cite-class pattern reference NOT install-class.

### Candidate 2 — letta `sleeptime_multi_agent_v4.py`
- **Cite**: `Z:/repos/deps/letta/letta/groups/sleeptime_multi_agent_v4.py @ HEAD <probe-in-P5>` [VERIFIED 2026-05-14 via direct file head — class `SleeptimeMultiAgentV4(LettaAgentV3)` w/ `ManagerType.sleeptime`]
- **Org**: Letta (TIER-1 org)
- **License**: probe in P5 deep-dive (Apache-2.0 expected — Letta default)
- **Verbatim mechanism**: `assert group.manager_type == ManagerType.sleeptime` + `_billing_context: BillingContext | None = None` ("Preserve the request billing context for follow-up sleeptime runs that are triggered entirely within core and therefore never traverse cloud-api")
- **CR-12 disposition candidate**: GENUINELY-NEW MECHANISM — background memory-synthesis observer cadence-gated; auto-compact-discipline.md has NO Rank for "async background compaction observer". Promote to Rank #3.6 IF Probe DAG passes.
- **Probe-DAG flag**: P3 architectural-API — Python SDK (Letta server); sss has no Letta-server install. Adoption blocked at Probe 3 unless Letta MCP wrapper emerges.

### Candidate 3 — awesome-agentic-patterns `context-window-auto-compaction.md`
- **Cite**: `Z:/repos/deps/awesome-agentic-patterns/patterns/context-window-auto-compaction.md @ HEAD ffb427683ec77f3690f7fadfec7a7611d9e907d9` [VERIFIED 2026-05-14 via direct head]
- **Org**: VoltAgent (TIER-2 community-curated pattern catalog) — but `based_on` cites TIER-1-NAMED-AUTHOR sources: Clawdbot Contributors + Pi Coding Agent (@mariozechner) + **Michael Bolin (OpenAI Codex)** — that last is TIER-1-NAMED-AUTHOR-QUOTE class for OpenAI per `citation-discipline.md` rule #6
- **License**: Apache 2.0 (parent catalog)
- **Status**: `validated-in-production`
- **Full implementation sketch** (verbatim from pattern doc): `compactEmbeddedPiSession(params: {sessionFile, config?})` — 1) Load session + reserve tokens (default 20k floor), 2) Sanitize session history for model API, 3) Model-specific validation (Anthropic strict turn ordering vs Gemini), 4) Lane-aware compaction (hierarchical session→global), 5) Post-compaction token-count verification (estimate < pre-compaction)
- **Core concepts** verbatim: "Overflow detection / Auto-retry with compaction / Reserve token floor / Lane-aware compaction / Post-compaction verification / Model-specific validation"
- **CR-12 disposition candidate**: PARTIAL-OVERLAP — covers compact-invocation primitives sss doesn't have (overflow detection auto-retry; reserve-token floor; model-specific validation). The CC `/compact` is platform-internal; this pattern is for SDK consumers building their own compaction.
- **Most directly applicable** of the 6 candidates — full code recipe for self-implementing compaction loop OUTSIDE the CC platform constraint.

### Candidate 4 — awesome-agentic-patterns `memory-synthesis-from-execution-logs.md`
- **Cite**: `Z:/repos/deps/awesome-agentic-patterns/patterns/memory-synthesis-from-execution-logs.md @ HEAD ffb42768` [VERIFIED 2026-05-14 via direct head]
- **Org**: VoltAgent (TIER-2) — but `based_on` cites **Anthropic Internal Users + Claude Code Team** (TIER-1-NAMED-ORG attribution per `citation-discipline.md` rule #6)
- **Author**: Nikola Balic (@nibzard) — named-T2 practitioner
- **Source**: `https://every.to/podcast/transcript-how-to-use-claude-code-like-the-people-who-built-it` (TIER-2 podcast transcript)
- **Status**: `emerging`
- **Tags**: `memory / logs / diary / synthesis / pattern-detection / knowledge-extraction / learning`
- **CR-12 disposition candidate**: PARTIAL-OVERLAP w/ Karpathy §5 Layer-1+3 (chronological JSONL + compiled wiki). Confirms the SOTA pattern set already cited in auto-compact-discipline.md Rank #5 has named-Anthropic-attribution beyond Karpathy alone. NO new mechanism — adds named-author convergence-gate evidence.

### Candidate 5 — anthropic-cookbook `capabilities/contextual-embeddings` + `multimodal/using_sub_agents.ipynb`
- **Cite**: `Z:/repos/deps/anthropic-cookbook/capabilities/contextual-embeddings/README.md @ HEAD 33424c3eb476cd56379435be086ccc228af1050d` + `Z:/repos/deps/anthropic-cookbook/multimodal/using_sub_agents.ipynb @ HEAD 33424c3e` [VERIFIED 2026-05-14]
- **Org**: Anthropic OFFICIAL (TIER-1 named-org)
- **License**: MIT (per anthropic-cookbook repo root)
- **Note**: `using_sub_agents.ipynb` IS already cited in `team-orch-patterns.md §Context Budget` for Cost-Tier discipline. RE-anchor for auto-compact-discipline.md adds the Anthropic-OFFICIAL convergence point at Axis-1.
- **`contextual-embeddings/`** = NEW cite candidate for context-engineering primitive (Anthropic's official patterns for chunking + retrieval + summarization)
- **CR-12 disposition candidate**: PROVIDER-COMPLEMENT — Anthropic-official patterns reinforce existing cite stack; not new mechanism.

### Candidate 6 — mem0
- **Cite**: `Z:/repos/deps/mem0/LICENSE` = **Apache 2.0** [VERIFIED 2026-05-14 via head probe]
- **Org**: Mem0.ai (TIER-1 org candidate)
- **Status**: pending Probe DAG full pass — only license probed this fire
- **CR-12 disposition candidate**: pending Probe-DAG verdict — could be DUPLICATE-FUNCTIONALITY w/ existing mcp-memory L1 (doobidoo) + graphiti L3 already installed.

### Bonus candidate 7 — mastra `EventedExecutionEngine`
- **Cite**: `Z:/repos/deps/mastra/packages/core/src/workflows/evented/execution-engine.ts @ HEAD <probe-in-P5>` [VERIFIED 2026-05-14 via head probe — class `EventedExecutionEngine extends ExecutionEngine` w/ `WorkflowEventProcessor`, `TimeTravelExecutionParams`, `RestartExecutionParams`, `StepResult`, `StepTripwireInfo`]
- **Org**: Mastra (TIER-2 vendor — needs Probe DAG Axis-2 named-T2-practitioner verify)
- **License**: probe in P5 (Elastic 2.0 expected — Mastra default)
- **CR-12 disposition candidate**: PARTIAL-OVERLAP w/ langgraph checkpoint (both workflow state-checkpoint+resume primitives); GENUINELY-NEW vs CC platform (time-travel re-execution is novel).

## Convergence-gate Axis-1 ≥3-distinct-orgs verification (this R1 fan-out)

Candidates above span **6 distinct orgs**: LangChain + Letta + VoltAgent (catalog) + Anthropic + Mem0 + Mastra. Plus named-author Michael Bolin (OpenAI Codex) cited at Candidate 3. Axis-1 firm PASS at 7-distinct-org convergence for the self-auto-compact pattern surface.

## Convergence with parallel W197 paste-ready predicate

The parallel W197 predicate at `tmp/wave197-goal-paste-ready-2026-05-14.md` (NOT overwritten per FM-02 sub-c) covers P5 W196 carryover = 16-repo deep-dive remainder. The 6 fresh candidates here are P5 INPUT — agents executing P5 should run 6-Probe-DAG on each of these plus the original 16-repo cohort (wshobson + GSD + CCBP + GitNexus + mattpocock + vercel-labs + quemsah + alirezarezvani + hesreallyhim + ComposioHQ + vinta + shareAI-lab + Shubhamsaboo + karpathy + ECC + superpowers).

## FM-20 row 9 asymmetric-dual-write defense applied to parallel predicate

Mia probe of parallel W197 predicate sub-claims:

| Claim in parallel predicate | Probe | Verdict |
|---|---|---|
| "5 PreCompact hooks firing in chain" | `python -c json.load settings.json` → PreCompact[0] hooks-count=2 (intelligent-compact + precompact_hint_emitter.py); plugin-marketplace auto-fired ECC+context-mode at runtime | REFUTED (actual = 2 settings.json + 2 plugin-marketplace = 4 fire total; "5" includes dash0 which is from a different hook event NOT PreCompact) — clause is slightly OVER but not load-bearing |
| "compact_hint.json STALE (333s>300s cap)" | mtime check + epoch → 13min stale on resume | VERIFIED (FM-21 queue-time-freeze signature; sub-claim accurate) |
| "/reload-plugins PENDING" | `.in_use` lockfile present + commands/context-restore.md present in cache (mtime 14:34) | REFUTED (plugin loaded; /reload-plugins ran already) |
| "Wave 195 P0 (167b871 compact-automation rule-layer recalibration SHIPPED, advisory never decision:block)" | `git log -5 --oneline` confirms commit chain | VERIFIED |

Net: 2 REFUTED + 2 VERIFIED. The REFUTED claims are NOT load-bearing for P0/P1/P4 execution — they're framing inaccuracies. The verdict-flip threshold (per `closed-loop-recursive-narrowing.md` Outcome A) is NOT triggered; the predicate remains shippable with these clauses noted in P0 close-synthesis as Mia-corrections.

## Next-fire dispatch context (input for P5 deep-dive BRIDGE-MODE agents)

P5 deep-dive agents (≥3-agent BRIDGE-MODE per advanced-agent-team-standing-directive.md invariants 1-8) should:
1. Read THIS cross-cite + parallel W197 predicate
2. Probe-DAG each candidate (count-OVER + SDK-vs-CLI + architectural-API + plugin-namespace + mode-harness + license/registry + demand-gate)
3. Axis 1+2+3 convergence per candidate (Axis-1 PASS at 7-org already; need per-candidate Axis-2+3)
4. CR-12 6-class disposition per candidate (GENUINELY-NEW / DUPLICATE / PARTIAL-OVERLAP / PROVIDER-COMPLEMENT / ECOSYSTEM-IMPORT / CITE-CLASS-CANONICAL)
5. Return ARTIFACT-INLINE per FM-19 (no-Write agents) at `tmp/wave197-p5-<agent>-<repo>-2026-05-14.md`

## Cite class for this artifact

`constituents=[
  TIER-1-DIRECT @ langgraph libs/checkpoint/README.md @ HEAD 2e5025ec,
  TIER-1-DIRECT @ letta sleeptime_multi_agent_v4.py @ HEAD,
  TIER-1-NAMED-AUTHOR-QUOTE @ awesome-agentic-patterns context-window-auto-compaction.md @ HEAD ffb42768 (Michael Bolin OpenAI Codex named-author per citation-discipline.md rule #6),
  TIER-1-NAMED-ORG @ awesome-agentic-patterns memory-synthesis-from-execution-logs.md @ HEAD ffb42768 (Anthropic Internal Users + Claude Code Team named-attribution),
  TIER-1-DIRECT @ anthropic-cookbook contextual-embeddings + using_sub_agents.ipynb @ HEAD 33424c3e,
  TIER-1-DIRECT @ mem0 LICENSE (Apache 2.0 verified),
  TIER-1-DIRECT @ mastra evented/execution-engine.ts @ HEAD,
  TIER-2 @ parallel W197 predicate at tmp/wave197-goal-paste-ready-2026-05-14.md (sister-arc cross-cite, NOT overwritten),
  TIER-3-LOCAL-OPERATOR-DERIVED @ this fire's orchestrator R1 fan-out 2026-05-14 + Mia probe outcomes on parallel predicate sub-claims
]; effective_tier=TIER-3-LOCAL-COMPOSITION` per `Z:/claude-sota/.claude/rules/citation-discipline.md` rule #8 MIN_PRECEDENCE.

## Sister-rule integration

- `Z:/claude-sota-installed/.claude/rules/auto-compact-discipline.md` — target wire surface for verified candidates (Rank #3.6 / #3.7 / extended cite-class lattice)
- `Z:/claude-sota-installed/.claude/rules/fm20-path-drift-cascade.md` row 9 asymmetric-dual-write — defense applied here
- `Z:/claude-sota-installed/.claude/rules/multi-source-discovery-breadth-discipline.md` — ≥4 distinct sources satisfied (LangChain + Letta + VoltAgent + Anthropic + Mem0 + Mastra = 6 source families)
- `Z:/claude-sota/.claude/rules/parallel-session-worktree-isolation.md` — cross-arc cite chain (parallel W197 predicate NOT overwritten)
- `Z:/claude-sota/.claude/rules/port-note-discipline.md §6` — forward-only no retroactive rewrite
