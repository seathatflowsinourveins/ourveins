# Architecture Docs

Canonical architecture documents for `claude-sota-installed`. Refresh pointer last touched **2026-05-17 W264** — W258 era superseded by W259→W262→W263, with W264 layer-audit + research-beyond sweep in flight.

## Active deliverables (read these first)

1. **`W263-grand-plan-tracker.md`** — single source of truth for what is done, what's blocked on operator decisions, what is strategic-deferred. **Read this first.**
2. **`W263-final-stack-2026-05-17.md`** — the per-job model + optimization stack (quantization, KV, spec-decode, backend). Convergence of the four W263 sub-audits.
3. **`W262-final-synthesis-2026-05-17.md`** — the runtime-state convergence ledger (23-row verdict matrix; SHIP verdict).
4. **`W259-grand-catalog/W259-SHIP-DECISIONS.md`** + **`W259-ULTIMATE-DECISIONS.md`** — the 99-repo × 23-dimension grand catalog with SHIP decisions per layer.

## Per-layer current state (one doc per layer; deep-dive on demand)

- **Memory stack**: `W259-grand-catalog/03-deepdive/MEMORY-ULTIMATE-ARCHITECTURE-W259v16.md` (4-tier; T3 cognee REMOVED 2026-05-17)
- **Inference + GPU**: `W263-quantization-deepdive-2026-05-17.md` + `W263-speculative-decoding-2026-05-17.md` + `W263-inference-backend-2026-05-17.md` + `W263-newest-models-2026-05-17.md` + `LOCAL-COMPUTE-AUDIT-2026-05-17.md`
- **Models per job**: `W262-sota-models-2026-05-17.md`
- **Observability**: `W262-observability-audit-2026-05-17.md` (Phoenix=load-bearing, Langfuse=DROP)
- **Plugins**: `W262-plugin-gaps-2026-05-17.md` (true gap: tdd-workflows + gitnexus + pydantic-ai)
- **Parallel sessions**: `parallel-sessions/PARALLEL-SESSION-ARCHITECTURE.md` (8.7/10 SOTA fitness) + `W262-parallel-sessions-audit-2026-05-17.md`
- **Codex GPT-5.5 cross-review**: `W262-codex-cross-review-2026-05-17.md`
- **System deep-dive**: `W261-system-deepdive-2026-05-17.md`
- **Hindsight recovery**: `HINDSIGHT-RECOVERY-2026-05-17.md`
- **SOTA-optimization operator sweep**: `SOTA-OPTIMIZATION-2026-05-17.md`

## W264 layer-audits (landing as agents return)

- `W264-research-file-inventory-2026-05-17.md` — 10,855 MD inventory + reorg plan (LANDED)
- `W264-memory-ultimate-2026-05-17.md`, `W264-rag-context-2026-05-17.md`, `W264-agent-orchestration-2026-05-17.md`, `W264-git-sota-2026-05-17.md`, `W264-inference-gpu-2026-05-17.md`, `W264-beyond-research-2026-05-17.md` — in flight

## Historical archive (kept for diff / not active)

- `_archive/W259-grand-catalog-archive/` — pre-W259 waves (well-indexed)
- W258-era docs were superseded by W259→W262→W263 (no current file by that name remains; references in older docs are historical only)

## Methodology

Per `Z:/claude-sota-installed/.claude/skills/sota-convergence-audit/SKILL.md` —
5-phase audit pipeline (R1 multi-source≥4 · R2 7-Probe DAG · R3 ≥3-org Axis-1+2+3 · R4 SRA D1-D10 · R5 CR-12 6-class disposition).
