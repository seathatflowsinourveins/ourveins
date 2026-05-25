# W370 — Substrate Carry-Forward + Parallel-Ratio CI Gate + Hybrid Retrieval

**Wave:** W370
**Date:** 2026-05-22 (auto-executes on W369 APPROVE)
**Status:** SPEC-DRAFT
**Source:** W367 LAYER-MAP-CANONICAL.md §11 W370 entries + W366 carry-forward
**Branch:** `feat/W370-substrate-carryforward` (strategy c)

## §0. Context

W366 (L3 Git Substrate Hardening) was checkpointed at `0f8b891` after P0 completion. W370 finishes the substrate work + adds 2 high-leverage cross-cutting items: parallel-ratio CI gate (validates agent dispatch hygiene) + hybrid retrieval (BM25+dense+RRF on basic-memory).

## §1. Acceptance bar (3 P2 items + W366 carry-forward)

- [ ] **P2.1 (W366 P1-P7 carry-forward)** Execute remaining W366 phases:
  - P1: RESCUE F1/F2 unpushed work (verify if still needed post-W367-W368 ships)
  - P2-P5: ship branch-name-lint.yml + commitlint wave-trailer (warn→enforce)
  - P3: 19-row branch reconciliation matrix + operator-sign
  - P4: F-A5/A6/A7/A8/A9 + F6 SEV-3 cleanup
  - P6: execute branch reconciliation per signed verdicts
  - P7: codex r1→rN + ship
- [ ] **P2.2 Parallel-ratio CI gate** GitHub Action validating per-PR parallel-guard metric vs 0.7 baseline (W367 Stream F gap #9, leverage 18.7)
- [ ] **P2.3 Hybrid retrieval (BM25 + dense + RRF) for basic-memory** extend basic-memory query API (W367 Stream F gap #10, leverage 14.0)

## §2. Components

| C# | Path | Action |
|----|------|--------|
| C1-C9 | per W366 SPEC §3 | execute remaining W366 P1-P7 components |
| C10 | `.github/workflows/parallel-ratio-gate.yml` (NEW) | per-PR action parsing parallel-guard JSONL + comparing to 0.7 baseline |
| C11 | `tools/basic-memory-hybrid-retrieval.mjs` (NEW) | BM25 + dense + RRF reranker overlay for basic-memory |
| C12 | `docs/architecture/W370-SUBSTRATE-CARRYFORWARD/CODEX-VERDICT.md` | codex r1→rN record |

## §3. Execution order

1. W366 P1-P7 carry-forward execution (per its SPEC.md task list) — 4-8h
2. C10 parallel-ratio CI gate (2h)
3. C11 hybrid retrieval (3-4h)
4. C12 codex r1→rN
5. Ship + tag w370-ship + push + T6 verdict write

## §4. Out of scope (W371+)

- W371: multi-agent pattern-study pass + Live-SWE-agent ~100-LOC investigation
- W372: Anthropic-gap-filling cluster

## §5. References

- W366 spec: `docs/superpowers/specs/2026-05-22-W366-L3-git-substrate-hardening-design.md`
- W366 plan: `docs/architecture/W366-L3-GIT-SUBSTRATE/PLAN.md` (P0 checkpointed `0f8b891`)
- W367 §11 W370 row
- bge-reranker-v2-m3 (already integrated W369 P1.3): https://huggingface.co/BAAI/bge-reranker-v2-m3
- BM25 reference: https://en.wikipedia.org/wiki/Okapi_BM25
- RRF (Reciprocal Rank Fusion): Cormack 2009 paper
