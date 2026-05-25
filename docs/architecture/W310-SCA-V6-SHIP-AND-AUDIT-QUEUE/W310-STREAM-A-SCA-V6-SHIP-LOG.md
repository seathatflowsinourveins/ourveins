# W310 Stream A — sca-v6 SKILL.md ship log

**Wave**: W310  
**Stream**: A (solo)  
**Date**: 2026-05-19  
**Branch**: `sota-converge-w310` @ predecessor `ece2d97` (W310 wave-start)  
**SKILL.md before**: 739 LOC (sca-v5)  
**SKILL.md after**: 953 LOC (sca-v6; +214 LOC growth; below projected +510 LOC because deltas were applied compactly via Edits rather than verbatim-block insertions)

## 9 deltas applied

| Δ | Name | SKILL.md anchor | Applied |
|---|---|---|---|
| **Δ1** | LIVE STATE PROBE Stage-1.5 | new §1.5 between §1 and §2 | ✓ — 7-row probe-protocol table; D10 +2 lift; 3-org-distinct anchors (ThoughtWorks Radar + AWS OPS-11 + ISO/IEC 25010); first-catch citation to mattpocock W309 row #35 supersession |
| **Δ2** | `re_enable_phase5_gate` governance flag | new §6.5 between §6 ledger block and §"Decision-decay state machine" | ✓ — EXTENDED with W309-COMMIT-PROVENANCE symmetric DEACTIVATE-without-mention rule; 3-org anchors (NIST 800-53 CM-3 + ISO/IEC 27001 A.8.32 + OWASP ASVS V14.1) |
| **Δ3** | D22 `discovery_cascade_breadth` | inserted after D21 in §4 + composite denom update | ✓ — W_install=0.8, W_pattern=0.6; hard_cap<2 INSTALL-only; 1-5 scale anchored to HF Papers + Perplexity Sonar + Anthropic Deep Research |
| **Δ4** | D23 `decision_impact_tier` | inserted after D22 + Phase-5/6 modulator clauses | ✓ — W_install=1.0, W_pattern=0.5; Tier-A FOUNDATIONAL→Tier-E DOC-ONLY 5-tier mapping; modulates Phase-5/6 strictness; 3-org anchors (Google SRE + ThoughtWorks + ITIL 4) |
| **Δ5** | Cascade-coverage tier-floor | new floor table in §1 (after coverage matrix) | ✓ — T1≥11 + ≥2 non-github primary; T2≥9 + paper-search-class + perplexity-equiv; T3≥7; T4≥3; auto-tier-demote on breach |
| **Δ6** | Architecture-itself re-eval cadence | new section after "Decision-decay state machine" | ✓ — every 4 waves mandatory; RED/YELLOW/PASS thresholds; W310 ship arch-self-eval 4.545→4.72 preview; 3-org anchors (NIST AI RMF + ISO 9001 + Google SRE) |
| **Δ7** | Cross-candidate Borda ranking matrix | new §6.6 in Decide section | ✓ — opt-in via `/sca compare`; Borda + z-score; 3-org anchors (MT-Bench/LMSYS + HELM + Borda voting-theory) |
| **Δ8** | Deepwiki + Repomix Stage-2.5 mandatory deep-ingest | new §2.5 between §2 and §3 | ✓ — T1/T2 mandatory; caps D5/D8/D9 at 3 if skipped; fallback ladder; 3-org anchors (Anthropic skill spec + Cognition Labs + Repomix maintainer) |
| **Δ9** | Perplexity-MCP routing mandatory T1/T2 | new clause inside §1 (after coverage matrix + before Δ5 floor table) | ✓ — perplexity-mcp OR exa-web-search OR multi-vendor WebSearch; 3-org anchors (Perplexity Sonar + Exa Labs + Anthropic WebSearch) |

## Composite denominator update

- **install_score**: 19.3 (sca-v5) → **21.1 (sca-v6)** (+1.8 from W_install D22=0.8 + D23=1.0)
- **pattern_score**: 9.4 (sca-v5) → **10.5 (sca-v6)** (+1.1 from W_pattern D22=0.6 + D23=0.5)
- 21 install-relevant dims (D1-D11, D14, D15, D16, D17, D18, D19, D20, D21, D22, D23)
- 12 pattern-relevant dims (D2, D5, D6, D8, D9, D12, D13, D19, D20, D21, D22, D23)

## Multi-version downweighting (sca-v6 active)

| rule_version | downweight under sca-v6 |
|---|---|
| sca-v1 | 0.5× |
| sca-v2 | 0.7× |
| sca-v3 | 0.85× |
| sca-v3.1 | 0.85× |
| sca-v5 | **0.9× (default)**; 0.85× cascade-floor breach (Δ5); 0.8× T1 no-deep-ingest (Δ8); 0.85× T1/T2 no-perplexity-equiv (Δ9) |
| sca-v6 | **1.0× (current)** |

## Anti-patterns added (8 new v6 entries)

- Docs-only D10 firing without live-state-probe (Δ1 mandate)
- Silent enabledPlugins flip without Phase-5 token (Δ2 mandate, both flip directions)
- Cascade-breadth single-source claim (Δ3 D22)
- Decision-impact-tier ignored on cardinal-rule changes (Δ4 D23)
- Cascade-floor breach silently shipped (Δ5)
- Deep-ingest skipped for T1/T2 (Δ8)
- Perplexity-equivalent missing for T1/T2 (Δ9)
- Architecture-itself re-eval cadence missed (Δ6)

## References section additions

- W309-PLAN.md + W309-STREAM-A/B/C/D-* + W309-SYNTHESIS.md + W309-COMMIT-PROVENANCE.md (full W309 wave artifacts)
- W310-PLAN.md + this file (W310-STREAM-A-SCA-V6-SHIP-LOG.md)

## "Don't break" invariants verified (all 10 W292 list intact)

- [x] Soft-gate ladder preserved (T1-T5 ladder unchanged; v6 adds tier-demotion mechanics but not new tiers)
- [x] Dual composites preserved (`install_score` + `pattern_score` both retained; denoms updated)
- [x] Tier-specific hard-caps preserved (existing intact; D22<2 INSTALL-only added; D23 is meta-modulator not hard-cap)
- [x] Bayesian author-prior preserved (D6 unchanged)
- [x] Typed-evidence preserved (sources_typed schema unchanged; deep-ingest populates code_reading)
- [x] Eval-harness lane preserved (Lane A/B/C unchanged)
- [x] EXCEPT clause preserved (D10 ≤ 2 pattern-improvement carve-out unchanged; Δ1 adds D10 lift mechanism, doesn't remove carve-out)
- [x] Star-only anti-pattern preserved (D12 stars-cap-at-2 unchanged; D22 is independent)
- [x] Decision-decay state machine preserved (ACTIVE/AGING/STALE/RE-LITIGATED/RETIRED states unchanged; Δ2 adds `false→true flip` event without removing existing states)
- [x] Basic-memory canonical ledger preserved (T6 + VERDICT-LEDGER.md pair unchanged; schema EXTENDED with live_state_probe + re_enable_phase5_history + cascade.mcp_family_count_distinct + cross_candidate_matrix)

## Architecture-itself self-eval under sca-v6 (preview from W309 Stream B)

- **install_score**: 4.545 (sca-v5) → **4.72 (sca-v6)** — improvement from D22=5 + D23=5 (architecture-itself is Tier-A FOUNDATIONAL); denom 19.3→21.1
- **pattern_score**: 4.51 → **4.73**
- **T1 INSTALL holds with margin** (4.72 > 4.0 + sufficient sigma headroom)
- **Hard-caps cleared**: D1=5, D3=5, D5=5, D14=5, D17=5, D18=5, D19=5, D22=5
- **Phase-5 5-gate pass**, **Phase-6 position-swap pass**, **D23=5 triggers strictest gates** (auto-passed)
- **No rubric-evolution PRD triggered**

## Risk assessment

- **LOW**: Δ1, Δ3, Δ4, Δ6, Δ7 — additive; no existing rule modified
- **MED**: Δ2 — requires settings.json comment-discipline + pre-commit hook coordination (advisory v6; v7 pre-commit-blocking)
- **MED**: Δ5 — many sca-v5 verdicts will hit AGING queue (operator-discretion re-litigation)
- **MED**: Δ8, Δ9 — adds cost to T1/T2 audits; budget already accounts for it

## Next steps (W310 remaining)

- **Stream B** (operator-confirm-required AI-1/2/3) — paste-ready snippets in `W310-STREAM-B-SHIP-BLOCKER-AI-CHECKLIST.md`
- **Stream C** (governance AI-4..AI-8 + M7) — applied where reversible inline; defer others to operator
- **Stream D** (4 parallel Agents) — Agent 1 ✓ DONE (hal-harness T2 + researchrubrics T3); Agent 2/3/4 in-flight
- Synthesis: W310-SYNTHESIS.md + VERDICT-LEDGER rows 37-44 appends + per-stream codex `/codex:adversarial-review --wait` gates
