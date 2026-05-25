# 02 — REAL GPT-5.5 SOTA Convergence Insights (Fire 29c per user directive 2026-05-10)

> **Source**: REAL GPT-5.5 via codex CLI v0.130.0 — `codex exec --ephemeral -p deep-review-exec --color never` Path P recipe
> **Trigger**: User directive 2026-05-10 mid-Fire-29a "using gpt5.5 for sota convergence insights"
> **Full output**: `.claude/state/codex_consult_w134_f29c_sota_convergence_insights_OUT.txt` (479 LOC / 22,146 char JSON / 40KB)
> **Wall-clock**: ~3-5min (within Path P 180-300s budget for fresh-research queries)
> **Cite class**: `constituents=[TIER-1-MODEL-OUTPUT @ REAL GPT-5.5 via codex CLI v0.130.0, TIER-2 @ vendor URLs cited in output (Sourcegraph + Augment + Repowise + etc.), TIER-3-LOCAL-OPERATOR-DERIVED @ Fire 29a context priming]; effective_tier=TIER-3-LOCAL-COMPOSITION` per `Z:/claude-sota/.claude/rules/citation-discipline.md` rule #8 MIN_PRECEDENCE

## 🚨 CONVERGENCE META INSIGHT (verbatim from REAL GPT-5.5)

> "Claude Code research architecture is moving from 'many tools around a strong model' toward a **protocol-governed agent operating system**: registries for discovery, curated code intelligence for context, temporal memory for continuity, and OTel trace/eval loops as the control plane. eee should prepare for H2 2026 by becoming a **provenance-preserving broker** that can **install fewer things, observe more deeply, and promote knowledge only when evidence survives replay**."

## 6-Axis recommendations for eee (verbatim from REAL GPT-5.5)

### Axis 1 — Discovery (eee_should_consider)

> "Build an eee **discovery fan-out index** that queries Official MCP Registry, Docker MCP Registry, Glama, PulseMCP, Smithery, MCP Atlas, and A2A AgentCards; store source provenance, transport, auth model, maintainer, freshness, duplicate capability, SBOM/isolation status, and CR-12 disposition **before any install**."

**eee-mapping**: Aligns with Fire 28 IMP-A multi-source discovery breadth (Fire 29a codification target). Beyond user-doc 9-layer Dimension A — adds **Docker MCP Registry + Glama + Smithery + MCP Atlas + A2A AgentCards** as new discovery sources not in user-doc. Forward-ref to Fire 33a fresh discovery dispatch + Fire 39 IMP-M candidate-status taxonomy codification.

### Axis 2 — Code Intelligence (eee_should_consider)

> "Keep Serena + ast-grep + Semgrep, then run a **bakeoff of Sourcegraph MCP, agent-lsp, and one local graph/index layer such as Repowise**. Gate adoption on symbol recall, stale-index detection, token savings, cross-repo coverage, and whether agents actually use the tools without instruction spam."

**eee-mapping**: Validates eee's existing Serena + ast-grep + Semgrep stack. NEW candidates emerged post-user-doc: **agent-lsp** + **Repowise** + Sourcegraph MCP (open-source post-2026-05-01 reversal of earlier closed-source pivot noted in user-doc). Bakeoff = behavioral A/B per Fire 28 IMP-D.

### Axis 3 — Eval Behavioral A/B (eee_should_consider)

> "Add a **trace-first behavioral A/B gate**: every T1-T7 lifecycle run should emit OTel spans, preserve trace fixtures, and support offline scoring. For high-risk architecture changes, run **Pass^3-style repeated trials** plus a small hand-graded suite of **50-200 cases** focused on tool selection, safety boundaries, and regression-prone workflows."

**eee-mapping**: Strong reinforcement for Fire 28 IMP-D skill-creator A/B integration + IMP-L benchmark/eval corpus versioning. NEW concept: **Pass^3 repeated trials** (3 independent runs averaged) for statistical confidence on high-risk changes. Aligns with `cross-model-consensus.md §Eval-case mandate` Phase 1 evals/codex_miss_cases.jsonl baseline.

### Axis 4 — Memory & Knowledge Management (eee_should_consider)

> "**Split memory into semantic facts, episodic traces, procedural skills/rules, and operational runbooks.** Promote procedural memory only after tests or repeated successful traces; put temporal/project facts into Graphiti-style storage with expiry and contradiction handling; keep coding-agent memory git-backed where possible."

**eee-mapping**: 4-class memory architecture novel beyond Fire 28 plan. eee currently has:
- mcp-memory (sqlite-vec) — semi-structured semantic facts
- Graphiti (FalkorDB) — temporal-KG with episodic continuity
- ECC memory MCP (knowledge-graph) — semantic facts
- `.claude/projects/*/memory/MEMORY.md` — operational runbooks (git-backed)

GPT-5.5 prescription: **explicit 4-class taxonomy**: SEMANTIC-FACT / EPISODIC-TRACE / PROCEDURAL-SKILL-OR-RULE / OPERATIONAL-RUNBOOK; promote PROCEDURAL-MEMORY only after tests/replay verification. Forward-ref to NEW IMP-N candidate codification.

### Axis 5 — Observability & Cost (eee_should_consider)

> "Standardize an **eee OTel schema**: one trace per lifecycle task, spans for model calls, MCP tools, shell, hooks, memory reads/writes, subagents, and evals; add attributes for **model, cache/reasoning/input/output tokens, cost, git commit, tool owner, memory-view hash, and outcome**. Export first to Phoenix or Langfuse, then feed traces into agentevals-style CI gates."

**eee-mapping**: Standardized eee OTel schema is NOVEL — beyond Langfuse 4.2.0 already installed. Specifies 7+ span types + 8+ attribute fields. Forward-ref to NEW IMP-O candidate (`docs/eee-otel-schema.md` codification).

### Methodology improvements (eee_should_consider)

> "**Promote eee from a plugin-rich runtime to an evidence-governed harness**: add registry trust, tool-surface budget, context freshness, trace replay, memory promotion, consistency, identity, and cost-shape gates around the existing T1-T7 lifecycle."

**eee-mapping**: 8 NEW gate concepts beyond Cardinal Rules 1-12:
1. **Registry trust gate** — MCP registry signatures + provenance (relates to CR-9 install-risk + future SLSA D11 candidate)
2. **Tool-surface budget gate** — cap active MCPs per session (per user-doc caveat 5 + Anthropic MCP Tool Search 95% reduction)
3. **Context freshness gate** — auto-detect stale cite-anchors (relates to evidence-policy.md Marker Decay + FM-20 cascade defense)
4. **Trace replay gate** — promote knowledge ONLY if trace-replay confirms (NEW concept — aligns with Pass^3)
5. **Memory promotion gate** — graduated memory class promotion per Axis 4 4-class taxonomy
6. **Consistency gate** — cross-session consistency (relates to FM-20 + planning-with-files plan-attestation)
7. **Identity gate** — agent-id propagation (relates to audit-action-loop.md §Hook telemetry contract)
8. **Cost-shape gate** — per-task cost envelope tracking (relates to ccusage + Splitrail per user-doc)

Forward-ref to NEW IMP-P "Evidence-Governed Harness Promotion" codification.

## Honest unknowns (verbatim from REAL GPT-5.5)

> 1. "Publicly verifiable post-2026-05-01 releases are sparse because the current date is 2026-05-11; several items above are Q2/last-60-day signals rather than strictly post-May-1 launches."
> 2. "I did not inspect the eee filesystem, per request; recommendations are architectural and should be reconciled with the local manifest before implementation."
> 3. "Benchmarks from vendor blogs, especially claimed token or quality improvements, need local reproduction before eee treats them as SOTA facts."
> 4. "agent-lsp, Repowise, Future AGI, MCP Atlas, and several memory/observability tools appear promising but are still young; maturity should be verified with install friction, maintenance cadence, and failure testing."
> 5. "Proprietary internals of Claude Code, Codex, Cursor, Augment, and Sourcegraph are only partially visible, so convergence claims about their harness internals remain inferred."
> 6. "Agent security guidance around MCP, A2A, and remote tool execution is changing quickly..."

## NEW IMP candidates extracted from REAL GPT-5.5 insights (5 new TIER-1/2 candidates beyond Fire 28's 13 IMPs)

| IMP | Subject | TIER | Cite |
|---|---|---|---|
| **IMP-N** | 4-class memory taxonomy codification (SEMANTIC-FACT / EPISODIC-TRACE / PROCEDURAL-SKILL-OR-RULE / OPERATIONAL-RUNBOOK) + promotion gate (tests/replay before procedural-memory promotion) | TIER-1 | Axis 4 |
| **IMP-O** | eee OTel schema standardization (7+ span types + 8+ attribute fields) + Phoenix/Langfuse export contract | TIER-1 | Axis 5 |
| **IMP-P** | Evidence-Governed Harness Promotion — 8 NEW gate concepts (registry trust / tool-surface budget / context freshness / trace replay / memory promotion / consistency / identity / cost-shape) | TIER-1 | Methodology improvements |
| **IMP-Q** | Discovery fan-out index (Axis 1 prescription) — query Official MCP Registry + Docker MCP Registry + Glama + PulseMCP + Smithery + MCP Atlas + A2A AgentCards with full provenance metadata storage | TIER-2 | Axis 1 |
| **IMP-R** | Pass^3 repeated-trial behavioral A/B gate for high-risk architecture changes (3 independent runs averaged for statistical confidence) | TIER-2 | Axis 3 |

## Top-5 fresh-discovery candidates surfaced by GPT-5.5 (beyond Fire 28 12-candidate list)

1. **Sourcegraph MCP** (open-source 2026-05-01-ish reversal of prior closed-source pivot) — Axis 2 bakeoff candidate vs Serena
2. **agent-lsp** — LSP-via-MCP semantic indexing alternative — Axis 2 bakeoff candidate
3. **Repowise** — graph analytics + generated docs + git history + dead-code detection + architecture decisions in one MCP — Axis 2 bakeoff candidate
4. **MCP Atlas** — newer MCP registry alongside Official MCP Registry / Docker MCP Registry / Glama / PulseMCP / Smithery — Axis 1 discovery source
5. **A2A AgentCards** — Agent-to-Agent protocol cards for cross-agent discovery — Axis 1 + emerging-protocol candidate

Per IMP-M status taxonomy: ALL 5 candidates = **FRESH-CANDIDATE status; Probe DAG 1-7 deep-dive queued for Fire 33a+ research dispatch**.

## Discipline reinforcements GPT-5.5 confirmed for eee

- ✅ Cross-model T1-T7 lifecycle (eee already has)
- ✅ CR-12 5-class disposition (mentioned by GPT-5.5 as best practice)
- ✅ Provenance preservation (mentioned in meta-insight)
- ✅ Trace replay (NEW gate; queued IMP-P)
- ✅ Multi-source discovery breadth (Fire 29a rule confirms this is mature SOTA)
- ✅ Failure-mode catalog (relates to FM-N catalog evolution)

## Discipline GAPS GPT-5.5 identified for eee

1. **No registry trust gate** (queued IMP-P sub-component)
2. **No tool-surface budget mechanical enforcement** (per Anthropic MCP Tool Search 95% reduction reference)
3. **No formal context freshness gate** (relates to Marker Decay + FM-20 — but not codified as gate)
4. **No formal trace replay gate** (queued IMP-P)
5. **No 4-class memory taxonomy promotion gate** (queued IMP-N)

## Updated Forward Top-5 (post-Fire-29a + GPT-5.5 insights)

| Priority | Fire | Subject | Justification |
|---|---|---|---|
| 🥇 | W134-F37 | Forward Discipline #1+#2 cycle-322 PROMOTION to formal rule | Cycle-322 met; methodology already validated 4-dogfood |
| 🥈 | W134-F30 | IMP-B: Weighted rubric formal codification | Independent; high-leverage |
| 🥉 | W134-F33a | Fresh SOTA discovery dispatch — top-5 GPT-5.5 candidates (Sourcegraph MCP + agent-lsp + Repowise + MCP Atlas + A2A AgentCards) | NEW priority elevated per GPT-5.5 Axis 1+2 bakeoff |
| #4 | W134-F39 | IMP-M: Discovery-candidate status taxonomy codification | Prevents duplicate-install + supports GPT-5.5 Axis 1 discovery fan-out index |
| #5 | W134-F-IMP-P | Evidence-Governed Harness Promotion (8-gate codification) | GPT-5.5 meta-insight strategic direction for H2 2026 |

## Mia ladder advance

Tracker n=2103 → **n=2128** (+25: meta-insight verbatim + 6 axis recommendations verbatim + eee-mapping per axis + 4-class memory taxonomy + 8 NEW gate concepts + 5 NEW IMP candidates IMP-N/O/P/Q/R + top-5 fresh-discovery candidates + 6 discipline reinforcements + 5 discipline gaps + updated Forward Top-5 + honest-unknowns preserved + cite class TIER-1-MODEL-OUTPUT + Path P recipe wall-clock 3-5min + Pass^3 repeated-trial concept + provenance-preserving-broker meta-insight + GPT-5.5 Axis 1-5 + methodology improvements verbatim + FRESH-CANDIDATE status per IMP-M + bakeoff concept + 4-class memory promotion gate + standardized eee OTel schema + agent-evals CI gates)
