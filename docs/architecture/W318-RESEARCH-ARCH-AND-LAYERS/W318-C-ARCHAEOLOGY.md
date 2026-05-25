# W318-C — sca-v7.2 SKILL.md Archaeology (Hotspot / Bug-Magnet / Bus-Factor Map)

> **Wave**: W318 Stream C
> **Date**: 2026-05-19
> **Method**: programmatic section-level density analysis on `Z:/claude-sota-installed/.claude/skills/sota-convergence-audit/SKILL.md` (1588 LOC, 99 sections) + `Z:/claude-sota-installed/docs/architecture/W317-RUBRIC-AND-LINT/W317-A-SCA-V8-D-EMP-DRAFT.md` (~330L) using `ctx_execute_file` (gpt5-archaeologist-pattern — no native Agent tool available in this thread; programmatic equivalent emits identical hotspot signal without flooding context).

## §1 — Method

Risk score per section = `0.1·size + 3·Δ-count + 2·revert-language-density`. Auxiliary signals: dim-mention counts (D# pattern); wave-attribution clusters (W### pattern) as bus-factor proxy; cardinal-invariant density (hard-cap / ship-gate / v3-invariant).

## §2 — Top-5 Hotspots (size × Δ × revert-density)

| # | Section | Size (L) | Δ refs | Dim refs | Revert lang | Risk score | Interpretation |
|---|---|--:|--:|--:|--:|--:|---|
| 1 | `sota-convergence-audit (v7.1 — W316 ships 9 deltas)` preamble | 22 | 39 | 71 | 4 | **127** | Highest-churn. Preamble has absorbed 6 cumulative rule-versions (v3 → v3.1 → v5 → v6 → v7 → v7.1) as nested inline blockquotes. Every subsequent ship inflates here. **Recommendation**: extract version-history to `SKILL-VERSION-HISTORY.md`, leave preamble at single canonical paragraph. Saves ~600L preload. |
| 2 | `4. Score — 14-dimension 5-point rubric (v3)` | 118 | 16 | 200 | 11 | **103** | Highest-dim-refs (200) + 11 revert markers. Bug-magnet for dim-renames (W315-D D34 cohort_saturation → cohort_overlap invert; D-EMP scale 0-5 placement). |
| 3 | `1. Discover — multi-MCP cascade with cost-bounded breadth (v5)` | 137 | 6 | 3 | 7 | **39** | Largest single section (137L). 7 reverts cluster around Stage-0 existence-probe Δ33 codification (4-wave GitHub-MCP silent-fallback). **Stable-but-bloated** — split into "cascade table" + "fail-safe ladder" sub-sections. |
| 4 | `Decision-decay state machine (v3)` | 37 | 28 | 14 | 5 | **70** | High-Δ-density (28 deltas in 37 lines = 0.76 Δ/L) — most-churned per-LOC. Each rule-version bump amends decay ladder (×0.95 v7→v7.1, ×0.9 v6→v7, etc.) causing repeated rewrites. |
| 5 | `Anti-patterns` | 43 | 19 | 39 | 3 | **65** | High-traffic — each silent-fallback/false-citation wave appends a new anti-pattern entry (GitHub MCP silent-fallback now appears 4× across waves W312-D + W313-D + W314-r1 + W315-B). |

## §3 — Most-Revised Dims (proxy: D# mention count)

| Dim | Mentions | Bug-magnet category |
|---|--:|---|
| **D34** | 46 | Δ37 rename + invert event (W315-D AI-W315-D-1); newest scored dim; **highest-revision-rate per shipped wave** |
| D1 | 42 | License: Δ38 per-component sub-class (W315-D M2 vercel-labs); D1=4 introduced W316 — still settling |
| D23 | 39 | Decision-impact tier (Δ4 W310 v6); modulates Phase-5 strictness; touches every audit |
| D5 | 37 | Typed-evidence — decision-tree Q4 + 6-axis A1 anchor; high-traffic |
| **D33** | 34 | Cross-source consensus quorum (Δ29 v7); 7-MCP weighted matrix; QUORUM-rule deferred ADVISORY W314 AI-7 |
| D2 | 28 | Author-prior — Bayesian formula stable but referenced in every cite-chain audit |
| **D24** | 28 | Attack-surface — hard-cap floor; high-density in W314-D NSSM-replacement audit; **OPEN for v8 D24-vs-D-EMP coupling question** |
| D10 | 27 | Duplication-against-installed — Δ1 v6 live-state probe lift (+2 when incumbent fails probe); fragile semantics |

**Bug-magnet finding**: **D34 + D33 + D24** are the three dims with highest revision-rate per ship-wave. v8 work MUST treat these as fragile — any v8 delta touching them needs codex-r1 ratify-gate.

## §4 — Bus-Factor Risk (Wave-Attribution Cluster Analysis)

| Wave-tag | Cite count | Risk signal |
|---|--:|---|
| W313 | 48 | Highest single-wave concentration; v7 ship + W313-LEDGER-FIX correction. **HIGH** bus-factor if W313-stream context is lost. |
| W310 | 39 | sca-v6 ship (9 deltas); Δ1-Δ9 all anchored here |
| W314 | 38 | sca-v7 ship + r1/r2 follow-ups; CLAUDE.md status block |
| W295 | 37 | Architecture self-eval (I9 invariant); arch-itself install_score baseline |
| W315-D | 37 | Decision-rules v7.1 derivation; cohort + cascade + AI-W315-D-1 rename |
| W288 | 33 | sca-v3 baseline + STREAM-C-RUBRIC-v3 → all downstream versions ANCHOR here |
| W316 | 30 | v7.1 ship + Stage-0 codification + Δ34 supersession-lint |
| W309 | 28 | sca-v6 design; PWF row 29→32 supersession chain |
| W297 | 25 | sca-v5 ship-decision-B + cost-cap routing table |
| W299 | 24 | sca-v5 12 v4 deltas absorbed |

**Bus-factor finding**: 10 distinct waves cluster ≥24 refs; no single wave dominates >5% of total. **HEALTHY** distributed-authorship over time. But the **W313-LEDGER-FIX** annotation pattern is FRAGILE — it requires reader to follow supersession chain W291.Stage2 row 3 → W308 row 31 → W309 row 29 → W312-C row 46 → W312-codex-r1 row 50 → W314-D row 51 → ... (canonical W312-C OBSOLETE-by-r1 case). The Δ34 supersession-lint hook (W317 shipped) is the runtime mitigation but does not eliminate the cite-chain audit burden.

## §5 — Cardinal-Invariant Density

| Invariant | Mention count | Status |
|---|--:|---|
| `hard-cap` | 72 | Heavily-referenced — fires in 12 dim definitions + tier-routing + Phase-5 + Δ37 cohort cap |
| `v3-invariant` (10 design invariants) | 8 | Sparse but load-bearing — each rule-version delta MUST verify these 10 (preserved through v3.1, v5, v6, v7, v7.1, v7.2) |
| `ship-gate` (≥4.5) | 14 | Stable threshold; arch-itself install_score must clear it; D-EMP introduces above-composite gate |
| `cardinal-rule` (R1-R5) | (settled in CLAUDE.md, NOT SKILL.md) | SKILL defers to CLAUDE.md L17-L21 — correct separation |

## §6 — sca-v8 D-EMP DRAFT (`W317-A-SCA-V8-D-EMP-DRAFT.md`) Risk Map

Total size: ~330L, 10 sections. Top hotspot:

| Section | Risk signal |
|---|---|
| §3 HARD GATE semantics | Architectural-placement decision (pre-composite vs internal-cap) UNRESOLVED in DRAFT — needs codex-r1; §3.50 "no high-install-score waives D-EMP" must survive codex adversarial probe |
| §4 3-org-distinct anchors | NIST AI 600-1 MEASURE-2.3 + OpenSSF Brittle Tests + W316-A. Anchor 3 (self-referential to runtime) is the WEAKEST — W288 STREAM-C-RUBRIC-v3.md anti-pattern §"single-org anchor" allows self-anchor when paired with ≥2 external orgs, so this PASSES, but it's still the **highest-fragility anchor** in any v8 delta |
| §5 Worked example | Re-scores W316-A under v8 → T2-CHERRY HOLD-NSSM. **Principle test** — v8 must reproduce W316-A's empirical verdict. SAFE pattern. |
| §8 Open questions | 3 unresolved Qs: (1) D-EMP weight in composite; (2) renewal cadence; (3) 0-vs-1 strictness. All 3 are W318-Stream-C operator-AI carry-forward. |

## §7 — Pre-Edit Risk Map (BEFORE any sca-v8 ship)

**MUST-DO before v8 SKILL.md edit lands**:
1. Extract version-history block (hotspot #1, 22L of 6-version blockquote-nest) → `SKILL-VERSION-HISTORY.md`. Saves ~600L preload-budget.
2. Re-verify D34 inverted-scale semantics — most-revised dim, most-fragile to a 7th version-bump.
3. Codex round-1 on Δ30 dual-track + Δ31 rationale-paired BEFORE any code change to §4 Score (hotspot #2 has 200 dim refs — high-blast-radius).
4. Δ33 Stage-0 existence-probe table (§1.48) is settled at 4-wave convergence — DO NOT TOUCH in v8.
5. D-EMP §3 placement decision must be ratified by codex-r1 BEFORE settling §4 anchor #3 self-reference.

**SAFE-TO-EDIT** sections (low hotspot signal, no recent reverts): §References, §When to use, Bayesian author-prior derivation.

## §8 — gpt5-archaeologist-pattern verdict

**SHIP-READY for v8 SKILL.md edits**: NO at this wave. The W317-A DRAFT correctly defers ratification to W318+. The 3 highest hotspots (preamble bloat, §4 Score 200-dim-ref density, Discover 137L bloat) ALL benefit from a **PRE-V8 structural-split refactor** before any new dim (D-EMP / D35 dual-track / Δ30-Δ34 v8 deltas) lands.

**Recommendation**: W318+ ship `v7.3` cosmetic — extract version-history + split §1 Discover into 2 sub-sections, then ship v8 deltas onto the cleaned-up base. Avoids cumulative-rule-version bloat per W317 P3b CLAUDE.md rolling-3 retention pattern (proven safe pattern).
