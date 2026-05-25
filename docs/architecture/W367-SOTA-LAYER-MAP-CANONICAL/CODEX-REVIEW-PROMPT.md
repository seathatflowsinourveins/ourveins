# Codex GPT-5.5 Review Prompt — W367 SOTA Layer Map Canonical

## Context

You are reviewing the W367 ship: a multi-angle convergence research synthesis producing the canonical SOTA runtime layer-map for the Claude Code architecture. This is the foundational "gold standard grail" guideline that future waves will use to decide what to install / pattern-study / cite.

## Materials under review

- `docs/architecture/W367-SOTA-LAYER-MAP-CANONICAL/LAYER-MAP-CANONICAL.md` — the synthesized guide
- `docs/architecture/W367-SOTA-LAYER-MAP-CANONICAL/STREAM-A-LAYER-TAXONOMY.md` — layer taxonomy + GitHub SOTA
- `docs/architecture/W367-SOTA-LAYER-MAP-CANONICAL/STREAM-B-ANTHROPIC-ECOSYSTEM.md` — Anthropic + peer alternatives
- `docs/architecture/W367-SOTA-LAYER-MAP-CANONICAL/STREAM-C-AWESOME-CONVERGENCE.md` — awesome-list convergence
- `docs/architecture/W367-SOTA-LAYER-MAP-CANONICAL/STREAM-D-ACADEMIC-RESEARCH-GRADE.md` — academic/arxiv-cited
- `docs/architecture/W367-SOTA-LAYER-MAP-CANONICAL/STREAM-E-RUBRIC-V19.md` — extended rubric + top-30 scored
- `docs/architecture/W367-SOTA-LAYER-MAP-CANONICAL/STREAM-F-GAP-ANALYSIS.md` — internal vs SOTA gap-map
- `docs/architecture/W367-SOTA-LAYER-MAP-CANONICAL/STREAM-G-RESEARCH-ARCH-META.md` — research-architecture meta-SOTA

## Authority model

3-org-distinct + Anthropic-docs-anchored hybrid (inherited from V18 §1). Sonnet 4.6 tie-breaker if codex r3↔r4 diverge.

## Review criteria

### (1) COMPLETENESS
- All 18+ layers mapped? Any concerns/dimensions of the CC runtime missing?
- For each layer: at least 5 SOTA candidates ranked? Any layers thin on coverage?
- Per-candidate: 3-org-distinct cites present?
- Anthropic ecosystem fully enumerated (Stream B)? Any anthropics/* repos missed?

### (2) CORRECTNESS
- Multi-dim scores plausible? Spot-check 10 random rows against actual GitHub state.
- Decision-tier verdicts (T0-T5) follow the rubric ladder consistently?
- "SOTA" claims hold up under independent verification (you may sanity-check via web_search or your training data)?
- Any obvious mis-classifications (e.g., abandoned-repo marked T1, or active-SOTA marked T5)?

### (3) BALANCE
- Star-bias check: does the methodology adequately surface low-star high-quality candidates (T3 PATTERN-STUDY)?
- Recency bias check: are 2026-era candidates fairly weighted vs 2024 incumbents?
- Anthropic bias check: are non-Anthropic SOTA peers fairly evaluated (not auto-rejected because they're competitors)?

### (4) ACTIONABILITY
- Section §11 (action plan) → can W368 immediately execute against it without ambiguity?
- Decision-tier verdicts → unambiguous install/study/cite per repo?
- Convergence evidence sufficient to defend each install decision against future challenge?

### (5) META-QUALITY (research-architecture itself)
- Does the methodology improve on sca-v17 → sca-v19? New dimensions justified?
- Stream G meta-recommendations (improving research arch itself) — actionable & well-cited?
- Does this guide ITSELF demonstrate SOTA research-methodology (per Stream G's own bar)?

## Required output

```
VERDICT: APPROVE | REVISE
ROUND: r{N}
FINDINGS:
  - [P0 critical] <finding> · file:line · severity rationale
  - [P1 important] ...
  - [P2 nice-to-have] ...
CONVERGENCE-EVIDENCE-AUDIT:
  - Spot-check rows: <pick 10 random rows, verify cite-anchors hold>
  - Independent-source-count per row: <distribution>
NEXT-ACTION-IF-REVISE:
  - <which streams need re-dispatch>
  - <which synthesis sections need rework>
```

## Cite-anchor discipline

Every finding you raise must cite a specific file:line OR a specific external authority (URL + content). No vague "this seems off" — concrete grounding required per CR-6.

## Max rounds

r10 hard wall per V18 §11 R3. On r10 no-APPROVE → escalate to operator.
