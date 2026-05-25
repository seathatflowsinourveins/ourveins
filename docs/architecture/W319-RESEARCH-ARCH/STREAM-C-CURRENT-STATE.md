# W319 Stream C — Current sca-v7.1 LIVE Summary

> **Wave**: W319 Stream C
> **Date**: 2026-05-19
> **Baseline**: HEAD `d8e9a02` (W318 codex round-1 closure)
> **Scope**: snapshot the rubric structure SKILL.md ships under v7.1 LIVE before any v8.1-partial absorption is attempted.

## §1 — File-level state

| Surface | LOC | Notes |
|---|--:|---|
| `.claude/skills/sota-convergence-audit/SKILL.md` | **1587** | v7.1 LIVE (W316 ship `8c95feb` + W317 P3d cosmetic compression `72d3ad5`) |
| `.claude/skills/goal-prompt-synthesis/SKILL.md` | 319 | unrelated to research-arch rubric |
| `docs/architecture/W288-RESEARCH-ARCH-v2/VERDICT-LEDGER.md` | 594 lines | **87 verdict rows post-W318-B** (latest #87 `alirezarezvani/claude-skills` T2-STAGED) |
| `.claude/settings.json` | 15,351 bytes | Δ34 supersession-chain lint LIVE in PreToolUse[Edit\|Write] (W317-A P0a) |

## §2 — sca-v7.1 LIVE deltas absorbed (Δ30-Δ38) per W316 ship

| Δ | Spec | LIVE in SKILL.md? |
|---|---|---|
| Δ30 | Triangulated MCDA (Borda + ELECTRE I + WSM mandatory for cohorts ≥2) | YES — §4 + W316-B-SHIP confirmed |
| Δ31 | ELECTRE multi-kernel-keep under partial-cherry-pick | YES |
| Δ32 | Disagreement auto-fire D33 quorum_unmet + codex GPT-5.5 mediation | YES — codified in D33 v7.1 extension block |
| Δ33 | Stage-0 existence-probe (auto-REJECT on ≥2-family negative cascade) | YES — §1 cascade preface + T5 routing |
| Δ34 | Supersession-chain pre-flight lint | YES — direct-CLI shipped in settings.json:hooks PreToolUse[Edit\|Write] (W317-A P0a) |
| Δ35 | T1-PROVISIONAL interim verdict (24h re-cascade SLA) | YES — routing thresholds §4.5 |
| Δ36 | T2-CHERRY intermediate tier (partial-vendor-fork) | YES — routing thresholds §4.5 + use-case attestation (wshobson #34, mattpocock #35/#48) |
| Δ37 | D34 cohort_overlap_signal NEW dim (inverted scale 1-5; W_install=0.7 / W_pattern=0.3) | YES — §4 dim catalog L339 + path-(b) composite |
| Δ38 | D1 per-component-licensed sub-scale (T2-CHERRY routing) | YES — §4 dim catalog D1 sub-scale notation |

## §3 — Current composite-denom math (v7.1 LIVE)

**Path-(b) — scored-dim DEFAULT recommended** (per SKILL.md L353-355):
- `install_denom = 28.7` (=28.0 v7 + 0.7 D34 W_install)
- `pattern_denom = 12.9` (=12.6 v7 + 0.3 D34 W_pattern)
- 32 install-relevant dims (D1-D11, D14-D34 minus pattern-only)
- 19 pattern-relevant dims (D2, D5, D6, D8, D9, D12, D13, D19, D20, D21, D22, D23, D24, D28, D29, D30, D31, D33, D34)

**Path-(a) — routing-only operator-override** (per SKILL.md L357-358):
- `install_denom = 28.0` (D34 absorbs as routing rule at decision-tree Q9, NOT scored)
- `pattern_denom = 12.6`
- 31 install-relevant dims / 18 pattern-relevant dims

**Arch-itself self-eval CANONICAL** (per W316-B + W316-codex-r2/r3/r4 closure):
- **Path-(a) routing-only is CANONICAL HEADLINE per W295 invariant I9 self-reference**: arch-itself ALWAYS skip-N/A's D34 because D34 measures install-cohort overlap (undefined for the rubric measuring itself).
- **Headline: install_score = 4.754/5** (margin +0.254 above 4.5 ship-gate); pattern_score = 4.09/5 acceptable-by-design.
- Path-(b) trace-evidence preserved as footnote per W317-A P3d cosmetic compression.

## §4 — Tier ladder (7-tier under v7.1)

T1 INSTALL · T1-PROVISIONAL · T2 VENDOR-FORK · T2-CHERRY · T3 PATTERN-STUDY · T4 CITE-ONLY · T5 REJECT

## §5 — 10 v3 design invariants (all PRESERVED under v7.1)

1. Soft-gate ladder ADDITIVE (T1+T1-PROVISIONAL+T2+T2-CHERRY+T3+T4+T5)
2. Dual composites (install + pattern)
3. Tier-specific hard-caps (D8/D14/D24 etc.)
4. Bayesian author-prior (D6)
5. Typed-evidence (D5)
6. Eval-harness lane (§4.5)
7. EXCEPT clause (T2-CHERRY routing exception)
8. Star-only anti-pattern (D12 scoring unchanged)
9. Decision-decay state machine (×0.95 v7→v7.1)
10. Basic-memory canonical ledger T6 (87 verdicts post-W318-B)

## §6 — Decision-tree (10-node cascade Q1-Q10)

Per v7 SKILL.md §5 codified — Q1 D18 universal-REJECT → Q2 cardinal-rule violation → Q3 D25 agentic-safety floor → Q4 D5 typed-evidence → Q5 D13 pattern-extractability → Q6 quorum-check (D33) → Q7 license/D14/D17/D19/D16/D24 hard-caps → Q8 6-axis A1+A4 HIGH → Q9 6-axis A1 OR A4 HIGH **+ cohort_overlap soft-cap (Δ37 if path-a)** → Q10 D13 fallback.

## §7 — Where Δ42 + Δ45 will be inserted (v8.1-partial absorption plan)

1. **Header preamble blockquote** (SKILL.md L6 + L24-26): add v8.1-partial paragraph between v7.1 paragraph and "## When to use" header.
2. **Dim catalog after D34** (SKILL.md L339-340): insert NEW dim entries for **D35 D-CCRT cc_runtime_pathway_support** (renamed from W318-C Δ45 D-CCRT to D35 per canonical numbering) **+ Pre-composite HARD GATE D-EMP**.
3. **Dual composites block** (SKILL.md L349-358): add v8.1-partial composite denom row alongside v7.1 path-(a)/(b).
4. **Routing thresholds** (SKILL.md L378-383): add D-EMP HARD-GATE-blocks-T1 above T1 INSTALL entry.
5. **Anti-patterns section** (~SKILL.md L939+): add "Paper-PASS smoke-FAIL" anti-pattern entry citing W316-A case-study.
6. **Decision-decay state machine** (~SKILL.md L853+): add `rule_version="sca-v8.1-partial"` entry with v7.1 ×0.95 downweight ladder.

## §8 — Estimated total inserted LOC

| Section | Estimated LOC delta |
|---|--:|
| Header preamble v8.1-partial blockquote | ~12 LOC |
| D35 D-CCRT dim entry | ~10 LOC |
| Pre-composite HARD GATE D-EMP block | ~15 LOC |
| Dual composites v8.1-partial row | ~6 LOC |
| Routing threshold D-EMP HARD-GATE entry | ~4 LOC |
| Anti-pattern "Paper-PASS smoke-FAIL" entry | ~3 LOC |
| Decision-decay v8.1-partial entry | ~3 LOC |
| **Total** | **~53 LOC** |

Projected SKILL.md post-edit: 1587 → ~1640 LOC.

## §9 — Verdict

**State frozen for W319 Stream C ratify gate**: v7.1 LIVE, 87 ledger rows post-W318-B, arch-itself install_score 4.754/5 canonical via W295 I9 path-(a). Ready to draft v8.1-partial spec (Δ42 D-EMP + Δ45 D-CCRT only) per W318-C-SCA-V8-1-DELTAS.md §7 partial-ship recommendation.
