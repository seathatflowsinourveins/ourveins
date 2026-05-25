# W327 FULL-SOTA-UNLEASHED — Master Index

> 15-stream parallel research wave + 3 synthesis artifacts. Bottom-line: **SHIP-GATE BLOCK** (4 P0 BLOCK findings cross-fork convergent). See `17-W327-OPERATOR-HANDOFF.md` for action checklist.

## Wave metadata

- **Date**: 2026-05-19
- **Branch**: `sota-converge-w310` (uncommitted; do not lose this work)
- **Wave-status integration**: builds on W326 RED ALERT (4.036) per `docs/architecture/W326-RESEARCH-ARCHITECTURE-OVERHAUL/`
- **Parallel dispatch**: 15 Agent tool_use blocks in 1 assistant message (W269 compliance ✓)
- **F5/Δ-PDM-3 retries**: S6 + S10 (both `wshobson-*` subagent_type → retried with `general-purpose`)

## Deliverable index

| # | Stream | Title | Size | Status |
|---|---|---|---|---|
| 00 | Master | **This index** | — | — |
| 01 | S1 | Insights features audit (38% not 14%) | 24 KB | ✓ |
| 02 | S2 | anthropics + CCBP + ECC line-by-line ingest | 34 KB | ✓ |
| 03 | S3 | wshobson + agent-team silent-fallback hunt | 20 KB | ✓ |
| 04 | S4 | Skills vendor-fork (addy + matt + ali) | 38 KB | ✓ |
| 05 | S5 | Sister-tooling (context-mode + planning-with-files + GitNexus) | 17 KB | ✓ |
| 06 | S6 | Runtime ecosystem SOTA (Node 22 + PS + Bash + CLI) | 14 KB | ✓ (retried) |
| 07 | S7 | Runtime-wide silent-fallback hunt (21 findings) | 32 KB | ✓ |
| 08 | S8 | CC CLI parity + file-org consolidation | 36 KB | ✓ |
| 09 | S9 | Codex GPT-5.5 e2e rule-questioning (BLOCK=4) | 12 KB | ✓ |
| 10 | S10 | SOTA monitoring + observability stack | (TBD) | ✓ (retried) |
| 11 | S11 | Research-arch adversarial revalidate (6/2/1 verdict) | 19 KB | ✓ |
| 12 | S12 | Security + secrets full audit (2 P0 leaks · R5=1.5/5) | 17 KB | ✓ |
| 13 | S13 | Memory-stack SOTA (T1 stays retired · Δ55 schema) | 22 KB | ✓ |
| 14 | S14 | arXiv + OpenAlex MCP install verdict (G1 closure) | 16 KB | ✓ |
| 15 | S15 | Insights 14%→100% wire-up runbook (18 commands) | 19 KB | ✓ |
| 16 | — | **Executive synthesis** (cross-stream convergence) | — | ✓ |
| 17 | — | **Operator handoff** (BLOCK-gate critical-path) | — | ✓ |

## Quick navigation

### For operator action NOW
→ `17-W327-OPERATOR-HANDOFF.md` — 4 P0 OP items + 6 P0 AI items + sequence recommendation

### For technical understanding
→ `16-W327-EXECUTIVE-SYNTHESIS.md` — cross-stream convergence, mutual-dependency graph, F4/F5 self-audit

### For specific deep-dives
- Insights wire-up details: `01` (audit) → `15` (runbook)
- Silent-fallback root causes: `03` (wshobson) → `07` (runtime-wide)
- Architecture critiques: `11` (adversarial)
- Security blockers: `09` (codex) → `12` (security)
- New installs ready: `14` (arxiv+openalex)

## Headline findings (≤5 bullets)

1. **SHIP-GATE BLOCK** — 4 P0 BLOCKs converge across S9+S12: CR-9 MCP non-compliance · CR-5 R5 partial enforcement · W269 advisory-only · 2 P0 secret leaks
2. **Insights coverage is 38% not 14%** (operator brief was wrong) — Phoenix UP on :16006 not :6006; statusLine LIVE; OTEL_HEADERS missing is the one-env-var fix
3. **21 silent-fallback findings runtime-wide** (5 P0) — confirms W329-D root cause + extends it; codex stop-review-gate fail-OPENS when codex unavailable
4. **Architecture design over-engineered in 2 places per S11** — Δ54 N=3 (should be N=1) and RRF k=60 (should be k=10); merge L2→L3 Phase-0a (6→5 layers)
5. **Path to GREEN (≥4.5) is more conservative than W326 projected** — but Insights wire-up alone delivers 4.036→4.35 (RED→GREEN); rest of trajectory needs inspect_ai EvalLog grounding

## Codex Phase-6 ratification expected at session-end Stop-hook
Per `openai-codex/1.0.4/hooks/hooks.json:24-37` (timeout 900s). Expected verdict: REVISE (multiple BLOCK-class findings need operator-action before sca-v13 absorb-wave). Round-2 next session after P0 actions close.

## Cross-references
- W326 prior wave: `docs/architecture/W326-RESEARCH-ARCHITECTURE-OVERHAUL/00-INVENTORY.md` ... `09-TARGET-ARCHITECTURE-DESIGN.md`
- VERDICT-LEDGER: project-root `VERDICT-LEDGER.md` (append W327 row)
- Wave history archive: `docs/architecture/CLAUDE-MD-ARCHIVE/`
