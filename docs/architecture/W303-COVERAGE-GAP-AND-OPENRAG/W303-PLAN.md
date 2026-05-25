# W303 Wave — Coverage-Gap Analysis + OpenRAG Layer SOTA Discovery

> **Wave**: W303 (operator's W303 explicit new dimensions: "any missing part we did not cover?" + "openrag layers"). Dispatched in parallel with W302 streams A+B (file-ownership disjoint).
>
> **Branch**: `sota-converge-w295` (continued).
>
> **Streams**: 2 parallel (A=coverage-gap audit · B=OpenRAG SOTA discovery). Post-stream → synthesize → codex r1 e2e.

## §0 — Operator's W303-specific asks (new vs W297-W302 persistent body)

1. **"any missing part we did not cover?"** — gap analysis on all W288-W302 deliverables
2. **"openrag layers"** — RAG infrastructure as distinct from memory layers
3. (Persistent) "ship with convergence sota insights and e2e with gpt 5.5"

## §1 — Streams

| Stream | Type | Scope | File ownership | Done criteria |
|---|---|---|---|---|
| **A** | gap-audit | **Coverage-gap analysis across W288-W302**. Review wave-by-wave deliverables; identify covered dimensions (memory/orchestration/SOTA-repos/local-inference/research-arch/decision-quality/etc.) vs UNCOVERED dimensions per the architecture layer-stack. Output: gap matrix + ≥5 UNCOVERED dimensions ranked by impact-per-cost | `W303-STREAM-A-COVERAGE-GAP-AUDIT.md` | Gap matrix (covered vs uncovered) + ≥5 gaps ranked + W304+ wave-planning |
| **B** | discovery | **OpenRAG layer SOTA discovery 2026-MAY** via multi-MCP cascade. ≥15 candidates: RAGFlow · QAnything · LightRAG · GraphRAG (microsoft) · NaiveRAG · h2oai/h2oGPT · Verba (Weaviate) · Cognita · LinkedIn/Liger · NebulaGraph-RAG · vanna · pgvecto.rs · supabase-vecs · llama-index variants · langroid · Open-RAG · plus 2026-MAY new entrants. Anti-bias mandates per sca-v5 (≥1 non-USA + ≥1 solo-maintainer + ≥1 <500★). Lite sca-v5 score (10 dims). Top-5 ranked + tier verdict per candidate | `W303-STREAM-B-OPENRAG-SOTA-DISCOVERY.md` | ≥15 candidates · ≥6 MCP families · Top-5 ranked · anti-bias proof · per-candidate tier |

**Coordinator (self)**: synthesis → `W303-AUDIT-2026-05-18.md` (may include W302 streams as inputs if they return mid-W303) → codex r1 e2e → ship-chain commit.

## §2 — File ownership (no overlap with W302)

- `W303-PLAN.md` — coordinator (this)
- `W303-STREAM-A-COVERAGE-GAP-AUDIT.md` — Stream A
- `W303-STREAM-B-OPENRAG-SOTA-DISCOVERY.md` — Stream B
- `W303-AUDIT-2026-05-18.md` — coordinator
- `W303-CODEX-R1.md` — coordinator

W302 owns separate `W302-*` paths. No conflicts.

## §3 — Anti-bias mandates (carried)

- sca-v5 multi-MCP cascade Stage-1 (≥6 families per Stream B; ≥4 for Stream A audit-of-audits)
- Stars NOT a hardgate
- 2026-MAY freshness MANDATE
- Honest gap-audit — Stream A should surface gaps even if politically inconvenient (e.g. "we never audited X")
- Source disagreements MUST surface in `sources_typed.<dim>.disagreement[]`

## §4 — Cite-anchors

- All W288-W302 audit deliverables (~14 wave docs)
- `.claude/skills/sota-convergence-audit/SKILL.md` — sca-v5 LIVE
- `docs/architecture/W288-RESEARCH-ARCH-v2/VERDICT-LEDGER.md` — 18 historical verdicts
- `CLAUDE.md` — current 6-tier memory + cardinal rules

## §5 — Verification-on-completion

Each stream MUST end with:
- File written + LOC
- ≥3 cite-anchors
- Top findings + confidence levels
- Source-disagreement log
- Cardinal-rule self-check
- Items routed to W303-AUDIT
