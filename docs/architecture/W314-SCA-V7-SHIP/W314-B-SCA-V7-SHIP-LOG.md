# W314-B — sca-v7 SHIP-LOG (changelog)

**Stream**: W314-B (sca-v6.1 → sca-v7 promotion; ship of W312-deferred-draft).
**Date**: 2026-05-19.
**Branch / HEAD**: `sota-converge-w310` (working tree).
**Subject**: promote sca-v7 from W312-DEFERRED-DRAFT to SHIP per W313 Stream-C ship-readiness verdict.
**File-ownership invariant**: WRITES (a) this file; (b) `W314-B-ARCH-SELF-EVAL.md`; (c) `W314-B-AI-CLOSURE.md`; EDITS `.claude/skills/sota-convergence-audit/SKILL.md`. Does NOT edit `CLAUDE.md`, `settings.json`, `.mcp.json`, `verdicts/*`, or `VERDICT-LEDGER.md`.

---

## 0. Provenance chain — W312 → W313 → W314

- **W312-B blueprint** (`docs/architecture/W312-RUNTIME-MATURITY/W312-B-RESEARCH-ARCH-V7.md` — 709 lines, ~41 KB): canonical v7 source. 13 deltas Δ17-Δ29 + 9 new dims D25-D33 + 7-MCP weighted-domain matrix + 6-axis convergence + 10-node decision-tree + Stage-6.7 ship-gate.
- **W312 ship-deferral rationale** (CLAUDE.md L67-83 + W312-B:§9): "v7 SHIP DEFERS to W313 pending AI-W312-B-1 quarterly judge-on-judge activation + AI-W312-B-2 SBOM formalization + AI-W312-B-3 chrome-devtools-mcp drift closure".
- **W313 Stream-C ship-readiness** (`docs/architecture/W313-V7-SHIP-READINESS/STREAM-C-V7-SHIP-ASSESSMENT.md` — 186 lines): SHIP-WITH-CONDITIONS verdict; 8 ship-conditions (W313-Stream-C-AI-1 through AI-8) absorbed in-line into v7.
- **W314 ship-trigger**: W313 (commit `eb5828e`) DID NOT close the W312 deferral. Operator W314 mandate: "promote sca-v7 from W312-deferred-draft to SHIP". This Stream executes that promotion.

---

## 1. Files edited

### 1.1 `.claude/skills/sota-convergence-audit/SKILL.md` (substantive edit)

Net `+~250` lines across 5 edit blocks:

| Edit block | Section | Delta |
|---|---|---|
| 1 | Decision-decay state machine (L836-844) | Updated `rule_version` ladder: sca-v5 0.81× / sca-v6 0.855× / sca-v6.1 0.9× / sca-v7 1.0× under v7 (was: sca-v5 0.9× / sca-v6 1.0× under v6) |
| 2 | Anti-patterns section (L928 onward) | +10 NEW anti-pattern entries: agentic-safety-floor · quorum-unmet · 6-axis-convergence · silent-fallback-density · pin-freshness · single-judge · MCP-domain-weight · 5-NEW-discovery · decision-tree-skip · cross-source-disagreement |
| 3 | References section (L1000 onward) | +3 NEW reference blocks: W310-EXT 5-stream sweep · W312 runtime-maturity 4-stream · W313 ship-readiness · W314 ship-wave |
| 4 | NEW section: `## v7 ship — 13 deltas / 9 new dims (W314)` | Appended after v6.1 partial-ship refinements: 13 Δ-paragraphs (Δ17/Δ18/Δ19/Δ20/Δ21/Δ25/Δ26/Δ27/Δ28/Δ29-trio) + 7-MCP matrix table + 6-axis convergence + 10-node decision-tree pseudocode + Stage-1.5/Stage-6.7 codex integration + composite denom math (28.0/12.6 ratification) + arch-itself self-eval pointer (4.527/5) + 10-row anchors table (3-org-distinct per delta) |
| 5 | (Already in place pre-W314) | Header L6 + v7 changes block L20 + D25-D33 dim entries L295-311 + dual-composites v7 block L321-327 — verified preserved unchanged |

**Net byte count**: SKILL.md grew from ~130 KB (pre-edit) to ~141 KB (post-edit). Lazy-loaded skill body (NOT in CLAUDE.md preload budget) per `https://code.claude.com/docs/en/skills`.

### 1.2 NEW files (under `docs/architecture/W314-SCA-V7-SHIP/`)

- `W314-B-SCA-V7-SHIP-LOG.md` (this file) — changelog + edit map + ship-evidence.
- `W314-B-ARCH-SELF-EVAL.md` — architecture-itself self-eval row under v7 (install_score 4.527 / pattern_score 4.09).
- `W314-B-AI-CLOSURE.md` — W312-B-1/2/3 AI closure status report.

---

## 2. 13 deltas applied — Δ17-Δ29 mapping

| Delta | Source stream | Dim added | W_install / W_pattern | Hard-cap | Anchor 3-org-distinct |
|---|---|---|---|---|---|
| Δ17 | α (W310-EXT) | D25 agentic_safety_owasp_coverage | 0.9 / 0 | <2 for T1+T2 | OWASP Foundation + NIST + Anthropic |
| Δ18 | α (W310-EXT) | D26 content_provenance + incident_disclosure | 0.7 / 0 | None | NIST + OpenSSF + OWASP |
| Δ19 | α (W310-EXT) | D27 independent_adopter_floor | 0.8 / 0 | <2 for T1 | CNCF + ThoughtWorks + OpenAI (W313-AI-1 refresh) |
| Δ20 | α (W310-EXT) | D28 long_running_agent_fitness | 0.7 / 0.5 | None | Anthropic + METR + CNCF |
| Δ21 | α (W310-EXT) | D29 browse_and_retrieval_quality | 0.5 / 0.3 | None | OpenAI + HuggingFace + Miro |
| Δ25 | α (W310-EXT) | D30 judge_on_judge_calibration_score | 0.4 / 0.2 | None (META-DIM) | Google + McGill/Mila/SN + LMSys |
| Δ26 | δ (W310-EXT) | D31 silent_fallback_pattern_density | 0.6 / 0.3 | <2 for T1 | Google SRE + OpenSSF + NIST (W313-AI-2 refresh) |
| Δ27 | δ (W310-EXT) | D32 pin_freshness_lag_norm | 0.5 / 0 | <2 for T1 if upstream-origin | OpenSSF + ThoughtWorks + CNCF (W313-AI-3 refresh) |
| Δ28 | design (W312-B) | (design — 7-MCP weighted matrix) | n/a | n/a | Anthropic + Perplexity + HuggingFace |
| Δ29 | design (W312-B) | D33 cross_source_consensus_quorum | 0.8 / 0.4 | <2 for T1+T2 (ADVISORY-only per W313-AI-7) | Wikimedia/FAIR + Anthropic + Perplexity (W313-AI-4 refresh) |

**Net additions**: 9 new dims (D25-D33) + 1 design pattern (Δ28 7-MCP matrix) + 3 design elements within Δ29 (D33 dim + Discovery surface expansion + Decision-tree codification).

---

## 3. Composite denominator math (verified)

```
v7 install_denom:
  v6.1 install_denom = 22.1
  + 0.9 (D25) + 0.7 (D26) + 0.8 (D27) + 0.7 (D28) + 0.5 (D29)
  + 0.4 (D30) + 0.6 (D31) + 0.5 (D32) + 0.8 (D33)
= 22.1 + 5.9 = 28.0 ✓

v7 pattern_denom:
  v6.1 pattern_denom = 10.9
  + 0 + 0 + 0 + 0.5 (D28) + 0.3 (D29)
  + 0.2 (D30) + 0.3 (D31) + 0 (D32) + 0.4 (D33)
= 10.9 + 1.7 = 12.6 ✓
```

Operator brief stated target "install ~24.7, pattern ~11.3" was the α-only preliminary projection. v7 ships with **28.0/12.6** absorbing α + δ + Δ29 deltas per W312-B:461,476 corrected math. W313-Stream-C-AI-8 ratifies this denominator delta.

---

## 4. 8 W313-Stream-C-AI ship-conditions — absorption status

| AI | Description | Status under W314 |
|---|---|---|
| **AI-1** | D27 3rd anchor — OpenAI PaperBench replaces Linux-Foundation-shared OpenSSF | **ABSORBED** in-line in SKILL.md D27 entry + W314 ship-section §Δ19 |
| **AI-2** | D31 3rd anchor — Google SRE blast-radius replaces δ-stream-internal | **ABSORBED** in-line in SKILL.md D31 entry + W314 ship-section §Δ26 |
| **AI-3** | D32 3rd anchor — ThoughtWorks Radar + CNCF Best-Practices Badge replaces commercial Renovate | **ABSORBED** in-line in SKILL.md D32 entry + W314 ship-section §Δ27 |
| **AI-4** | D33 anchor set — REMOVE AdaRubrics 9★, KEEP WP:RS + KILT, ADD Anthropic Multi-Agent + Perplexity Sonar | **ABSORBED** in-line in SKILL.md D33 entry + W314 ship-section §Δ29 |
| **AI-5** | §4.2 wording — 6-axis ladder ADDITIVE to hard-caps, NOT REPLACEMENT | **ABSORBED** in v7 changes block L20 + new Anti-pattern entry |
| **AI-6** | 4th arch-itself lift D16 4→5 (foundation-or-≥5-org governance) → margin 4.527 | **ABSORBED** in v7 changes block L20 + W314-B-ARCH-SELF-EVAL.md |
| **AI-7** | D33 quorum-rule ENFORCEMENT deferred to ADVISORY-only | **ABSORBED** in SKILL.md D33 entry + Anti-pattern entry |
| **AI-8** | composite_denom 28.0/12.6 ratification (operator 24.7/11.3 was α-only preliminary) | **ABSORBED** in dual-composites v7 block L321-327 |

All 8 ship-conditions resolved without operator intervention required.

---

## 5. 10 v3 design invariants preserved

Per W313 Stream-C invariant check (`STREAM-C-V7-SHIP-ASSESSMENT.md:56-80`) + W288 STREAM-C-RUBRIC-v3.md §7 + W312-α audit §3.B (STREAM-ALPHA:301-319):

1. **Soft-gate ladder** — preserved (Stage-6 5-tier T1-T5 ladder unchanged; v7 ADDS 6-axis convergence as ADDITIVE pre-condition).
2. **Dual composites** — preserved (install_score + pattern_score; denominators advance to 28.0/12.6).
3. **Tier-specific hard-caps** — preserved (D1<3 T1-block / D18<2 universal REJECT / etc.); v7 ADDS D25<2 T1+T2-cap + D27<2 T1-cap + D31<2 T1-cap + D32<2 T1-cap (if upstream) + D33<2 T1+T2-cap (ADVISORY).
4. **Bayesian author-prior** — preserved unchanged in §"Bayesian author-prior" block.
5. **Typed-evidence** — preserved; v7 RAISES the bar via 7-MCP weighted-domain matrix (Δ28).
6. **Eval-harness lane** — preserved in §4.5; v7 adds D8 benchmark-deltas modulation only via discovery cost-cap routing.
7. **EXCEPT clause** — preserved (T3 PATTERN-STUDY remains open even when T1-hard-caps trigger if D13≥3 + D2≥4).
8. **Star-only anti-pattern** — preserved + STRENGTHENED (v7 §4.1 confirms with 3 cases: Submersible 19★ T3 / daymade <500★ T3 / AdaRubrics 9★ T3).
9. **Decision-decay state machine** — preserved + EXTENDED (sca-v6.1 + sca-v7 added to rule_version ladder; v6.1 → 0.9× under v7).
10. **basic-memory canonical ledger** — preserved; v7 ADDS Stage-6.7 codex ship-gate as PRE-LEDGER-WRITE step (W312-B:633-665).

**Verdict**: zero v3 invariants broken by v7 ship.

---

## 6. Backwards-compat — v6.1 verdicts under v7

Per W259 R9 per-dim version-bump rule: v6.1 verdicts auto-downweight **×0.9** under v7. Active rule_version downweights:

- sca-v1 → 0.45× (compound)
- sca-v2 → 0.6× (compound)
- sca-v3 → 0.7× (compound)
- sca-v3.1 → 0.7× (compound)
- sca-v5 → 0.81× (compound)
- sca-v6 → 0.855× (compound)
- sca-v6.1 → 0.9× (single)
- sca-v7 → 1.0× (current)

**Re-litigation queue**: no AGING/STALE verdicts trigger automatic re-litigation under v7 promotion alone. Verdicts produced under v6.1 retain validity at 0.9× weight until their own `decision_wave + 6` AGING threshold fires (per Decision-decay state machine § + W291 G4 AGING re-litigation queue).

---

## 7. Codex GPT-5.5 cross-model gate

Per CLAUDE.md L19 + W280a Stop-hook codex review-gate: this v7 promotion ships as a SKILL.md substantive edit. Post-commit, the Stop-hook auto-fires `codex:adversarial-review --wait` on the commit per W286 PreCompact-class codex gating. Plugin-native `.claude/plugins/cache/openai-codex/codex/1.0.4/hooks/hooks.json:24-37` with `stopReviewGate:true` enforces.

**Expected codex round-1 verdicts**:

- APPROVE — v7 SKILL.md edits cite-anchored to W312-B + W313-C; 8 ship-conditions absorbed; 10 v3 invariants preserved; denom math verified; 3-org-distinct anchors per delta.
- POTENTIAL HIGH — none anticipated; W313-C ratified the 4.527 self-eval with margin 0.027.
- POTENTIAL MEDIUM — codex may flag (a) AI-7 ADVISORY-only deferral for D33 enforcement as needing W315 ratification, or (b) CLAUDE.md status-row update belonging to Stream A's domain (this Stream did NOT edit CLAUDE.md per file-ownership invariant).

---

## 8. Out-of-scope / W315 follow-ups

- Stream A operator-AI **W315-V7-A**: CLAUDE.md L20-21 status block update to reflect v7 SHIP (currently shows W313 status; needs W314 v7-SHIP-LOG row).
- Stream A operator-AI **W315-V7-B**: VERDICT-LEDGER.md row 50+ append for "architecture-itself W314 self-eval install_score=4.527 verdict=T1-HOLD".
- Stream D operator-AI **W315-V7-C**: `Z:/claude-sota-installed-state/basic-memory/verdicts/architecture-itself-W314.md` write (basic-memory T6 canonical ledger entry — outside this Stream's file-ownership).
- Operator-AI **W315-V7-D**: chrome-devtools-mcp pin-bump from 0.26.0 → 1.0.1 (D32 4→5 in next arch-itself self-eval) — Stream A pin-bump in `.mcp.json` carries forward from W312-B-3 per AI-CLOSURE.md.
- Operator-AI **W315-V7-E**: D33 quorum-rule ENFORCEMENT promotion from ADVISORY-only to HARD-precondition pending anchor-quorum fully resolves to ≥3-published-external-rubric bar (W313-AI-7 carry-forward).
- Operator-AI **W316-ARCH-RE-EVAL**: per v6 Δ6, architecture-itself re-eval cadence triggers next at W316 (4-wave window). Current re-eval row at W314 SHOULD reset the AGING clock.

---

## 9. STREAM-W314-B-RETURN

**VERDICT**: **SHIP-v7** under W313 Stream-C ship-readiness ratification + 8 AI absorption + 4-lift arch-itself self-eval 4.527/5 (margin 0.027 above 4.5 ship-gate) + 10 v3 invariants preserved + 13 deltas Δ17-Δ29 applied + 9 new dims D25-D33 commissioned + composite denom 22.1→28.0 install / 10.9→12.6 pattern + 3-org-distinct anchor coverage on each delta + v6.1 → 0.9× downweight pre-set under v7.

Post-commit codex Stop-hook NEEDS-CODEX-RATIFICATION on the SKILL.md substantive edit per W280a + W286 PreCompact-class gating.
