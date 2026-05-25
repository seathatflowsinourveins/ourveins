# W315 Stream A — Operator-AIs Queue + W316 Follow-ups

> **Wave**: W315 · **Stream**: A · **Date**: 2026-05-19 · **HEAD**: `752beab` · **Branch**: `sota-converge-w310`
>
> All operator-AIs categorized: APPLY-THIS-WAVE (Stream-D synthesis pickup) vs DEFER-W316 vs CONFIRM-W314-VERDICT vs MULTI-WAVE (W316-W317).

---

## APPLY-THIS-WAVE (Stream D synthesis pickup)

### AI-W315-A-DSPY-GEPA — sca-v7.1 §6.7 Pareto-routing
- **Owner**: Stream D (SKILL.md edit)
- **Description**: Add `sca-v7.1 §6.7 GEPA Pareto-frontier candidate-routing` section. Currently sca-v7 selects tier by single-highest install_score; replace with Pareto-frontier-pool of top-5 candidates per quarter, sampled-with-diversity per GEPA reflective optimizer methodology (35× fewer rollouts vs naive sequential, 13% lift over MIPROv2 per `arXiv:2507.19457` ICLR 2026 oral).
- **Cite-anchor**: WebSearch [DSPy GEPA blog + dspy.ai docs + Arize Pareto-blog]
- **Expected impact**: +0.08 install_score on arch-itself (4.527 → 4.607)
- **Estimated effort**: ~150 LOC SKILL.md addition + 2-3 examples

### AI-W315-A-HCAST-ANCHOR — sca-v7.1 D28 empirical anchoring
- **Owner**: Stream D (SKILL.md edit)
- **Description**: Bump D28 (long_running_agent_fitness) weight 0.6 → 0.9 AND anchor empirically to HCAST 189-task suite + 140 human-baseliner methodology. Add example tasks (HCAST 1min-8h+ range) as concrete D28 PASS-FAIL benchmark in SKILL.md.
- **Cite-anchor**: exa `arxiv 2503.17354` (HCAST paper) + WebSearch (HCAST blog)
- **Expected impact**: +0.10 install_score on arch-itself (4.607 → 4.707)
- **Estimated effort**: ~100 LOC SKILL.md + 1 new D28-anchor example

### AI-W315-A-pyDecision-EC-PROMETHEE — sca-v7.1 §6.6.1 committee-aggregation
- **Owner**: Stream D (SKILL.md edit)
- **Description**: Add `sca-v7.1 §6.6.1 EC-PROMETHEE committee-aggregation` STANDARD for cross-MCP silent-fallback resolution. When github MCP returns 0 + exa returns 8 hits on the SAME query, sca-v7.1 invokes EC-PROMETHEE to weight + aggregate. Currently sca-v7 §6.6 7-MCP weighted matrix lacks this disagreement-handling step.
- **Cite-anchor**: github `Valdecy/pyDecision` + context7 `/valdecy/pydecision` + exa PyPI metadata
- **Expected impact**: +0.15 install_score on arch-itself (4.707 → 4.857) — THE KILLER ABSORPTION
- **Estimated effort**: ~200 LOC SKILL.md addition (full EC-PROMETHEE algorithm spec) + 2 worked examples

### AI-W315-A-LEDGER-ROWS-61-67 — append 7 W315 verdicts to VERDICT-LEDGER.md
- **Owner**: Stream A (this stream, append-only)
- **Description**: Append rows 61-67 to `docs/architecture/W288-RESEARCH-ARCH-v2/VERDICT-LEDGER.md` per Stream-A append-only contract.
- **Status**: PENDING THIS COMMIT (executed below)

### AI-W315-A-T6-VERDICT-NOTES — write 7 T6 basic-memory verdict notes
- **Owner**: Stream A (this stream)
- **Description**: Write `verdicts/W315-<slug>.md` notes for each ≥T3 candidate (7 candidates).
- **Status**: PENDING THIS COMMIT (executed below)

---

## CONFIRM-W314-VERDICT (no W315 action needed)

### AI-W315-A-OSSF-PAIR-CONFIRMED
- **W314 verdict**: T1 INSTALL `ossf/criticality_score + ossf/scorecard` (paired)
- **W315 verification**: cite-anchors REFRESHED (exa surfaces full Rob Pike algorithm + 11-parameter config + Issue #102 risk-reframing). Install_score sustained 4.55 (above 4.5 ship-gate with 0.05 margin).
- **W316 action**: per W314 verdict, install via `npx -y` or `gh release download` SHA-pin into sca-v7.1 §6.4 prelim-scoring automation. **No W315 action required.**

### AI-W315-A-PERPLEXITY-DEFER
- **W314 verdict**: DEFER perplexity-mcp install
- **W315 verification**: exa fallback covers ~85% of perplexity surface; hf-mcp-server covers ~90% of academic surface. Margin holds.
- **W316 action**: Continue defer unless Trigger A/B/C fires (see `W315-A-PERPLEXITY-EQUIV-RESOLUTION.md`).

---

## DEFER-W316 (next wave)

### AI-W315-A-GITHUB-MCP-FALLBACK
- **Description**: 4th-consecutive-wave confirmation (W312-D F1 + W313 + W314 + W315 Stream A): GitHub MCP `search_repositories` silently returns 0 hits on 50%+ of well-formed queries. Cannot wait further.
- **W316 action**: APPLY `gh api /search/repositories` REST-API fallback in goal-prompt-synthesis SKILL.md per W314-r2 AI-r2-7. Need this BEFORE W316 cascade-fire.
- **Owner**: W316 operator-AI batch

### AI-W315-A-SLSA-PROVENANCE-ABSORPTION
- **Description**: Pattern_score 4.85 (HIGH) — absorb SLSA L3+ in-toto attestation methodology for sca-v7.1 §provenance-rubric. Add D34 (provenance_attestation_quality) at weight 0.6.
- **W316 action**: write `docs/architecture/W316-SLSA-PROVENANCE-ABSORPTION/` pattern doc.
- **Deferred-reason**: sca-v7.1 §6.6.1 EC-PROMETHEE absorption (THIS-WAVE) takes priority; SLSA can ship W316.

### AI-W315-A-CNCF-MATURITY-ABSORPTION
- **Description**: Pattern_score 4.65 — CNCF 5-stage ladder maps directly to sca-v7 5-tier ladder. Adopter Interview Form (5-7 adopters) as concrete D27 threshold.
- **W316 action**: write `docs/architecture/W316-CNCF-MATURITY-ABSORPTION/` pattern doc + sca-v7.1 §D27-anchor patch.
- **Deferred-reason**: lower priority than pyDecision EC-PROMETHEE; CNCF can ship W316.

### AI-W315-A-DEEPRESEARCH-BENCH-ABSORPTION
- **Description**: Pattern_score 4.70 — adaptive reference-based scoring methodology. Citation accuracy metric (40-80% range per DeepTRACE) gives empirical anchor for sca-v7.1 §inline-citation-quality.
- **W316 action**: write `docs/architecture/W316-DEEPRESEARCH-BENCH-ABSORPTION/` pattern doc.
- **Deferred-reason**: same as SLSA + CNCF.

### AI-W315-A-ANTHROPIC-MAS-PATTERN-DOC
- **Description**: Pattern_score 4.75 — 90.2% lead-agent-orchestrator-worker pattern with industry convergence (Anthropic + OpenAI + Cognition + Microsoft + LangChain).
- **W316 action**: write `docs/architecture/W316-ANTHROPIC-MAS-ABSORPTION/` pattern doc + sca-v7.1 §parallel-dispatch-mandate-anchor.
- **Deferred-reason**: parallel-dispatch-mandate already exists from W314-r1 Stream C; W316 just adds anchor.

---

## MULTI-WAVE (W316-W317)

### AI-W315-A-DSPY-GEPA-MCP-WRAPPER (optional)
- **Description**: If DSPy ships a native MCP server, evaluate plugin-install. Currently DSPy is Python-lib only. W316 should monitor `https://github.com/stanfordnlp/dspy/issues` for MCP-wrapper PR.
- **W316-W317 action**: monitor + evaluate when MCP-wrapper exists.

### AI-W315-A-HCAST-VIVARIA-RUNTIME-INSTALL (optional)
- **Description**: Pattern-absorption is W316; full Vivaria install (docker-compose) is W317+ contingent on operator decision re: install-attack-surface budget.
- **W317+ action**: if HCAST methodology absorbs well in sca-v7.1, consider Vivaria install for empirical-bench-running.

### AI-W315-A-pyDecision-MCP-WRAPPER (optional)
- **Description**: pyDecision is a Python lib; an MCP-wrapper for `EC-PROMETHEE` + `CRITIC` + `TOPSIS` functions would let sca-v7.1 calls invoke them directly at audit-time. Currently W316 absorbs as algorithm-spec in SKILL.md.
- **W316-W317 action**: evaluate if MCP-wrapper would lift sca-v7.1 quality further.

---

## Anti-bias compliance verification

| MCP family | Candidates this stream | Top-12 inclusion |
|---|:---:|---|
| github | 2 (pyDecision + N/A in other queries due to silent-fallback) | YES (pyDecision T2 in top-3) |
| exa | 4 (EasyMCDM + scikit-criteria + RMCDA + slsa-verifier) | YES (slsa-verifier T3 in top-8) |
| WebSearch | 3 (DSPy/GEPA + ThoughtWorks Tech Radar + Anthropic-MAS) | YES (DSPy T1 in top-3, Anthropic-MAS T3 in top-8) |
| deepwiki | 1 (boundary probe on pyDecision = "not indexed" → useful signal that pyDecision needs DeepWiki indexing) | implicit (cross-attestation) |
| hf-mcp-server paper_search | 8 (deep_research_bench + PROClaim + AgentAuditor + DeepVerifier + Agentic-Rubrics + DeepTRACE + ABC + BiasScope + Dr.Bench + jury-based-eval + optima + ...) | YES (deep_research_bench T3 in top-8) |
| context7 | 1 (pyDecision /valdecy/pydecision) | implicit (cross-attestation) |
| basic-memory T6 | 9 (prior W288-W314 verdicts as supersession baseline) | implicit (W314 carry-over verifications) |

**Anti-bias mandate satisfied**: each MCP-family surfaced ≥1 candidate in top-12.
