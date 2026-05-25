# W369 — Pattern-Study Cluster + Memory Reranker + MCP Dedup

**Wave:** W369
**Date:** 2026-05-22 (auto-executes on W368 APPROVE)
**Status:** SPEC-DRAFT
**Source:** W367 LAYER-MAP-CANONICAL.md §11 W369 entries
**Branch:** `feat/W369-pattern-study-cluster` (in-place, strategy c)

## §0. Context

W368 shipped immediate T1 installs (DSPy, inspect_ai, docling MCP, etc.). W369 advances to medium-leverage adoption: pattern-study from T3 candidates + cross-cutting infrastructure.

## §1. Acceptance bar (6 P1 items)

- [ ] **P1.1** Pattern-study `gepa-ai/gepa` Pareto-frontier routing → augment local `dspy-integration` skill with Pareto-as-primitive (W367 Stream G meta-pattern #1)
- [ ] **P1.2** Pattern-study `haizelabs/verdict` Jury-on-Demand → augment local `citations-agent` skill with instance-reliability weighting (W367 Stream G meta-pattern #3)
- [ ] **P1.3** Cross-encoder reranker integration: bge-reranker-v2-m3 via Ollama; add reranker step to basic-memory + cognee retrieval (W367 Stream F gap #3, +17% Recall@5 evidence)
- [ ] **P1.4** Run `sota-convergence-audit:eval` against current 17-MCP fleet — execute OD-6 dedup audit (likely retire codegraph or brave-search per redundancy)
- [ ] **P1.5** Add RAGAS + DeepEval evaluation lanes to `harness/eval_harness.py` (W367 Stream F gap #6)
- [ ] **P1.6** Adopt 5 G-meta-patterns into sca-v20 increment: Pareto-frontier-as-primitive (D101), Chain-of-Verification (D102), Jury-on-Demand instance-weighting (in citations-agent), Plan-executor-publisher separation (research-workflow pattern), Judge-human Cohen's-κ (plugin-eval methodology)

## §2. Components

| C# | Path | Action |
|----|------|--------|
| C1 | `.claude/skills/dspy-integration/SKILL.md` | EDIT to add Pareto-frontier-routing pattern (from gepa) |
| C2 | `.claude/skills/citations-agent/SKILL.md` | EDIT to add Jury-on-Demand instance-reliability pattern (from verdict) |
| C3 | `tools/memory-reranker.mjs` (NEW) | Cross-encoder reranker bge-reranker-v2-m3 via Ollama HTTP |
| C4 | `.claude/skills/sota-convergence-audit/SKILL.md` | EDIT to sca-v20 with G meta-patterns (D101-D105) |
| C5 | `harness/eval_harness.py` | EDIT to add RAGAS + DeepEval lanes |
| C6 | `docs/architecture/W369-PATTERN-STUDY-CLUSTER/MCP-DEDUP-AUDIT.md` (NEW) | sota-convergence-audit:eval output on 17-MCP fleet |
| C7 | `docs/architecture/W369-PATTERN-STUDY-CLUSTER/EXECUTION-LOG.md` (NEW) | Per-task ship record |
| C8 | `docs/architecture/W369-PATTERN-STUDY-CLUSTER/CODEX-VERDICT.md` (NEW) | Codex r1→rN verdict |

## §3. Execution order (sequential)

1. C1 + C2: pattern-study augment skills (Pareto + Jury) — 1h
2. C4: sca-v20 increment with G meta-patterns — 1h
3. C3: memory-reranker.mjs + integration test on basic-memory query — 1h
4. C5: RAGAS + DeepEval lanes in harness — 1h
5. C6: MCP dedup audit (P1.4) — 30 min
6. C7 + C8: ship record + codex r1 + final commit + tag `w369-ship`

## §4. Codex review

r1→rN APPROVE per V18 §11 (max r10).

## §5. T6 verdict write

On APPROVE: `mcp__basic-memory__write_note` to `verdicts/w369/`.

## §6. Out of scope (deferred)

- W370: W366 substrate carry-forward + parallel-ratio CI gate + hybrid retrieval BM25+dense+RRF
- W371: multi-agent pattern-study pass (NO INSTALL per L12 design) + Live-SWE-agent investigation
- W372: Anthropic-gap-filling cluster + OD-2/3/10/11 resolutions

## §7. Success criteria

- [ ] All 6 P1 items closed with cite-evidence
- [ ] Codex r1→rN APPROVE
- [ ] Final commit gpg-signed + `Wave: W369` + `Codex-Verdict: APPROVE` trailers
- [ ] sca-v20 ships (extends v19 to D105)
- [ ] dspy-integration skill has gepa Pareto pattern (verified by grep)
- [ ] citations-agent skill has verdict Jury-on-Demand pattern (verified by grep)
- [ ] memory-reranker.mjs operable (smoke test)
- [ ] MCP dedup audit recommends concrete retire-candidates from 17-MCP fleet

## §8. References

- W367 canonical: `docs/architecture/W367-SOTA-LAYER-MAP-CANONICAL/LAYER-MAP-CANONICAL.md` §7 + §11 W369
- gepa: https://github.com/gepa-ai/gepa (ICLR 2026 Oral)
- verdict: https://github.com/haizelabs/verdict
- bge-reranker-v2-m3: https://huggingface.co/BAAI/bge-reranker-v2-m3
- RAGAS: https://github.com/explodinggradients/ragas
- DeepEval: https://github.com/confident-ai/deepeval
