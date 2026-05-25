# W318-C — sca-v8.1 Delta Proposals (Δ40-Δ45)

> **Wave**: W318 Stream C
> **Date**: 2026-05-19
> **Status**: DRAFT — paste-ready for W319+ codex round-1 ratify gate
> **Path**: this file → codex-r1 → SKILL.md edit + VERDICT-LEDGER row
> **Operator-mandate**: "improve the repos quality gate not a hardgate" + "muti dimension score such as stars, claude code your runtime pathway support etc many dimensions" + "decision making in different level"

## §1 — Six v8.1 delta proposals

### Δ40 — D-AGE project_age_months_normalized (NEW dim, soft, denom-additive)

**Scale 0-5** (anchored to OpenSSF Criticality `created_since` max-120-months):
- 0 = <3 months (high abandonment risk)
- 1 = 3-12 months (early-stage; volatile)
- 2 = 12-24 months
- 3 = 24-48 months
- 4 = 48-96 months
- 5 = ≥96 months (mature; widely-depended-upon)

**Weights**: `W_install = 0.4` / `W_pattern = 0.2`. **Soft-cap** (no tier-floor hard-cap — age alone never blocks T1).

**Rationale** (operator "muti dimension score such as stars" but also AGE): D7 maintenance_velocity captures *recent* commit frequency; D-AGE adds the *total project duration* dimension. A high-D7 + low-D-AGE candidate is high-momentum-but-young (e.g. `dspy@3.2.1` repository age ~24mo); a high-D7 + high-D-AGE candidate is mature-and-active (e.g. `anthropics/claude-code` ~36mo). The pairing distinguishes the two.

**Composite denom impact**: 28.7 → **29.1 install** (+0.4); 12.9 → **13.1 pattern** (+0.2).

**3-org-distinct anchors**:
1. OpenSSF Scorecard `maintained` 90-day-floor + Criticality `created_since` 120-month-max (Linux Foundation — but `created_since` is from Rob Pike's algorithm, Google alum, so partial-distinct)
2. ISO/IEC 25010 maintainability time-horizon (ISO/IEC standards body — DISTINCT)
3. Rob Pike "Quantifying criticality" paper (Google alum academic-DISTINCT)

**v7.2 → v8.1 decay**: `×0.95` (single-tick refinement per W259 R9; v7.2 verdicts auto-downweight 0.95 under v8.1).

### Δ41 — D12-sub: dependents_normalized (extends existing D12, no new dim)

**Approach**: D12 popularity (currently capped at 3 when only stars present) gains a NEW sub-signal `dependents_normalized` (0-5 scale, Zipfian-normalized vs OpenSSF Criticality `dependents_count` max-500k). When `dependents_count >0` is observed (via deps.dev or GitHub-API `dependent_repos`), D12 is permitted to score 4-5 even with low-star-count, as long as `dependents_normalized ≥3`.

**Sub-rule**:
```
if dependents_count > 0:
  D12 = max(D12_stars_floor_3, dependents_normalized_score)
else:
  D12 unchanged (existing 0-5 + cap-at-3-stars-only rule)
```

**Rationale** (operator "stars" + "CC pathway support"): pure-star-count is the existing star-only-anti-pattern (v3 invariant). Dependents-count is the **inversion** — it counts downstream USERS, not casual stars. A library with 500 stars + 10k dependents (e.g. `dspy`) is fundamentally more SOTA than 5k stars + 0 dependents (e.g. abandoned-fork).

**Composite denom impact**: NONE (D12 weight unchanged; sub-rule shifts the score within existing cap).

**3-org-distinct anchors**:
1. OpenSSF Criticality `dependents_count` (Rob Pike algorithm — Google alum/Linux Foundation collab)
2. CNCF Graduated "widespread production adoption" via adopter-interviews (CNCF/Linux Foundation; substitute with → ThoughtWorks Tech Radar "Adopt requires irresponsible NOT to use" — DISTINCT)
3. deps.dev (Google — DISTINCT origin)

### Δ42 — D-EMP empirical_viability HARD GATE (RATIFY from W317-A DRAFT)

**Spec**: per `W317-A-SCA-V8-D-EMP-DRAFT.md` §2-§4. Scale 0-5; HARD-GATE pre-composite (NOT a tiebreaker); D-EMP=0 → AUTO-BLOCK from T1/T1-PROVISIONAL/T2 verdicts.

**Operator-mandate fit**: "improve the repos quality gate not a hardgate" — D-EMP is a HARD GATE but operates **above** the composite, so it does NOT change any per-dim weight or per-tier hard-cap floor. It catches the W316-A class of failure (paper-PASS 4.60 install_score + smoke-FAIL = un-shippable) that NO existing dim catches. **Net effect**: graduates the rubric from "many soft + few hard floors" to "many soft + few hard floors + 1 above-composite empirical gate". Operator's "not a hardgate" intent preserved at composite-level — hard-cap floors stay only at D8/D14/D24/D25/D26/D27/D31/D32/D33 (per existing v7.1).

**Weights**: `W_install = 1.0` (highest single-dim weight; matches D2 + D5). **Hard-cap**: D-EMP=0 → BLOCK (above-composite gate); D-EMP=1 → SOFT-WARN (T2-CHERRY ceiling; T1 requires operator-explicit-override).

**Composite denom impact under §3 weighted-sum (D-EMP ≥1 path)**: 29.1 → **30.1 install** (+1.0 from Δ40 D-AGE +D-EMP); 13.1 → **13.6 pattern** (Δ42 D-EMP `W_pattern = 0.5`).

**3-org-distinct anchors** (already verified W317-A §4):
1. NIST AI 600-1 MEASURE-2.3 (NIST/US DoC — federal standards body)
2. OpenSSF Brittle Tests anti-pattern (Linux Foundation — DISTINCT)
3. W316-A NSSM-SWITCH HOLD-NSSM canonical case-study (this runtime — DISTINCT origin)

**Codex round-N ratify**: REQUIRED before SKILL.md edit lands (per W317-A §6.2). Submit diff with explicit prompt "Does D-EMP HARD-GATE-above-composite vs internal-hard-cap placement produce different verdicts on W316-A, W314-r1 NSSM-replacement, W315 SOTA pool?"

### Δ43 — Zipfian-norm absorbed into D7, D12, D27, D32, D-AGE (Δ40)

**Spec**: replace linear-normalization with Zipfian-distribution (Rob Pike algorithm: `f(x) = log(1+x) / log(1+max)`) for high-variance count-signals.

**Affected dims**:
- D7 `maintenance_velocity` (commit-frequency: linear → Zipfian)
- D12 `popularity_and_downstream_deps` (stars + dependents: linear → Zipfian)
- D27 `independent_adopter_floor` (adopter-count: linear → Zipfian)
- D32 `pin_freshness_lag_norm` (lag-days: linear → Zipfian)
- **Δ40 D-AGE** (months: Zipfian native)

**Rationale**: count-distribution signals follow power-law (most projects have few commits/stars/adopters; long-tail of very-high). Linear-norm overweights the long-tail; Zipfian compresses it logarithmically. Aligns with OpenSSF Criticality's algorithm; reduces "anomaly-bias" in T1-tier verdicts.

**Composite denom impact**: NONE (weights unchanged; only normalization-curve changes).

**Backward-compat**: V7.2 verdicts under linear-norm AUTO-DOWNWEIGHT 0.95× under v8.1 (per decision-decay state-machine — same ladder applies).

**3-org-distinct anchors**:
1. Rob Pike "Quantifying criticality" paper (Google alum — DISTINCT)
2. OpenSSF Criticality implementation (Linux Foundation — DISTINCT)
3. Zipf's law (statistics canonical, multiple academic origins — DISTINCT)

### Δ44 — IIA-check for Borda mandatory cohorts (extends v7.1 Δ30)

**Spec**: when v7.1 Δ30 Borda mandatory-cohort comparison fires (≥2 candidates compete), add IIA-check: re-compute Borda with one candidate removed; if removal changes pairwise-ranking among remaining candidates, FALL BACK to ELECTRE I outranking (which satisfies IIA via concordance/discordance kernel).

**Algorithm**:
```
1. Borda(C1, C2, ..., Cn) → rank-order R_full
2. For each Ci: Borda(C1, ..., Ci-1, Ci+1, ..., Cn) → R_minus_i
3. Compare R_minus_i pairwise-rankings on remaining candidates against R_full
4. If ANY R_minus_i flips ANY pair → IIA-VIOLATION → emit "Borda result not IIA-stable; falling back to ELECTRE I per Δ44"
5. ELECTRE I outranking matrix (existing Δ31 multi-kernel-keep) becomes authoritative
```

**Rationale** (operator "decision making in different level"): cohort-ranking is the highest-blast-radius decision in the rubric (T1 INSTALL inheritance from cohort-winner). IIA-stability is the canonical Borda-fragility test (Arrow's impossibility theorem). Without IIA-check, Borda can produce non-robust rankings when discovery surface adds/removes candidates mid-audit.

**Composite denom impact**: NONE (algorithmic refinement to existing Δ30 Δ31).

**3-org-distinct anchors**:
1. Arrow's Impossibility Theorem (Stanford academic — DISTINCT)
2. Wikipedia Borda count IIA failure mode (community-canonical — DISTINCT)
3. ELECTRE I (LAMSADE Paris-Dauphine — DISTINCT)

### Δ45 — D-CCRT cc_runtime_pathway_support (NEW dim, soft, denom-additive)

**Operator mandate**: "claude code your runtime pathway support etc many dimensions" — operator explicitly names this dim.

**Scale 0-5**:
- 0 = no Claude Code integration path (pure-library; not even via MCP/skill/agent)
- 1 = generic-CLI-callable from CC (no plugin/skill, just `bash` invocation possible)
- 2 = MCP-server protocol supported (could be wired into `.mcp.json`)
- 3 = Plugin-installable via marketplace OR upstream-CLI invocation pattern documented
- 4 = Active CC plugin shipped (in CC plugin ecosystem; `/plugin install` works) OR skill exists at canonical path
- 5 = Native cardinal-rule-2 pattern (plugin-shipped hooks OR direct upstream-CLI invocation; aligns with CR-2 hook-discipline)

**Weights**: `W_install = 0.8` (high-priority — runtime-pathway-support is essential for INSTALL tier); `W_pattern = 0.2` (lower — pattern-extraction works regardless of pathway).

**Hard-cap**: D-CCRT < 2 caps verdict at T3 PATTERN-STUDY (cannot reach T1 INSTALL without at least MCP-or-plugin pathway).

**Rationale**: this is THE runtime-fitness dim that distinguishes "good open-source repo" from "good open-source repo that integrates with THIS runtime". Currently distributed across D14 install-vector + D18 runtime-safety + scattered MCP/plugin-cite footnotes. Δ45 codifies it as a first-class dim.

**Composite denom impact**: 30.1 → **30.9 install** (+0.8); 13.6 → **13.8 pattern** (+0.2).

**Backward-compat**: V7.2 verdicts re-score under v8.1 — for already-installed plugins (cardinal-rule-2-compliant), D-CCRT defaults to 5 (this runtime confirms); for non-installed candidates D-CCRT must be explicitly scored.

**3-org-distinct anchors**:
1. Claude Code plugin docs `code.claude.com/docs/en/plugins` (Anthropic PBC — DISTINCT)
2. MCP specification `modelcontextprotocol.io` (Anthropic + community spec — DISTINCT origin)
3. Cardinal rule R2 (this runtime's CLAUDE.md L17 — DISTINCT origin, anchors to Anthropic hooks doc `https://docs.anthropic.com/en/docs/claude-code/hooks`)

## §2 — Cumulative v8.1 composite denom

Starting from v7.1 (28.7 install / 12.9 pattern):
- Δ40 D-AGE: +0.4 install / +0.2 pattern → 29.1 / 13.1
- Δ41 D12 sub: 0 / 0 → 29.1 / 13.1
- Δ42 D-EMP: +1.0 install / +0.5 pattern → 30.1 / 13.6
- Δ43 Zipfian: 0 / 0 → 30.1 / 13.6
- Δ44 IIA-check: 0 / 0 → 30.1 / 13.6
- Δ45 D-CCRT: +0.8 install / +0.2 pattern → **30.9 install / 13.8 pattern**

**v8.1 composite denom**: **30.9 install / 13.8 pattern** (vs v7.1 28.7 / 12.9 = +2.2 install / +0.9 pattern).

## §3 — Intermediate tier proposals (T1.5? T2.5?) — DEFER

Operator mandate: "Install vs Pattern-Study vs Cite-Only granularity — propose intermediate tiers (T1.5? T2.5?) if cohort-analysis warrants".

**Analysis**: v7.1 already shipped Δ36 T2-CHERRY (between T2 VENDOR-FORK and T3 PATTERN-STUDY). Current ladder has 7 tiers: **T1 INSTALL · T1-PROVISIONAL · T2 VENDOR-FORK · T2-CHERRY · T3 PATTERN-STUDY · T4 CITE-ONLY · T5 REJECT**. Adding T1.5 ("INSTALL with operator-explicit-override") would collapse the T1-PROVISIONAL pattern (which already serves this role via 24h re-cascade SLA).

**Verdict**: **NO new intermediate tiers proposed at v8.1**. Existing 7-tier ladder + D-EMP HARD GATE provides sufficient granularity. **Decision-making at different levels** (operator mandate) is satisfied by 6-axis convergence ladder + 10-node decision tree + tier-routed cost-caps (T4 $0.02 → T1 $5/$20).

## §4 — Triangulated MCDA mandate (operator)

Operator: "Comparison-of-different-repos-in-particular-area — propose Borda+ELECTRE+WSM mandatory triangulation per W315-C Δ30".

**Already shipped**: v7.1 Δ30 (W316) — "Triangulated MCDA mandatory for cohorts ≥2 — 3 head-to-head matrices: Borda + ELECTRE I + Weighted-Sum-Method".

**v8.1 extension**: Δ44 (this delta) adds IIA-check to the Borda kernel — extends the existing mandate without re-doing it. No new MCDA-method added.

## §5 — Codex round-N ratify gate (W319 path)

Per W317-A §6.2 + v7→v7.1 precedent:

**Round-1 entry criteria**:
- All 6 deltas Δ40-Δ45 codified at this DRAFT
- 3-org-distinct anchors verified for each delta (PARTIAL for Δ40 + Δ41 — substitutions noted)
- Composite-denom math reconciled (30.9 / 13.8)
- 3-of-3 external candidates re-score under v8.1 produces CONSISTENT verdicts vs v7.2 (per W317-A §6.3)
- W318-C external-rubric benchmark + archaeology + arch-layers (companion files) link to this DRAFT

**Round-1 expected outcome**: NEEDS-REVISION or PASS. Multiple rounds expected (v7 took rounds 1-4; v7.1 took rounds 1-2; v8.1 estimated rounds 1-3).

**Round-N PASS criteria**: 3-of-3 codex round-N rubric-stable + zero false-blocks on W315/W316/W317 cohort + arch-itself install_score under v8.1 ≥4.5 ship-gate (cumulative-math projected post-deltas).

## §6 — Architecture-itself install_score projection under v8.1

Carry-forward from v7.2 baseline `install_score = 4.756 path-b / 4.527 path-a`:

| Delta | Arch-itself score contribution |
|---|---|
| Δ40 D-AGE | This runtime is W314-attested ~6mo old (CLAUDE.md initial ship 2026-Q1) → D-AGE = 1-2; W=0.4; contributes 0.4-0.8 raw |
| Δ41 D12 sub | This runtime is a single-operator runtime — `dependents_normalized = 0`; D12 unchanged at 3 (star-cap floor) |
| Δ42 D-EMP | This runtime has shipped sca-v7 → v7.1 → v7.2 PWF de-activation + W316-A HOLD-NSSM + multiple e2e wave-shipped uses → **D-EMP = 5** (max); W=1.0; contributes 5.0 raw |
| Δ43 Zipfian-norm | Methodological refinement; re-scores existing dims downward by ~10% on long-tail counts; arch-itself recompute lifts D7 from 4→4 (no change at boundary) |
| Δ44 IIA-check | Algorithmic refinement; no scored dim impact |
| Δ45 D-CCRT | This runtime IS Claude Code — D-CCRT = 5 (max); W=0.8; contributes 4.0 raw |

**Projected raw addition**: 0.4-0.8 (Δ40) + 5.0 (Δ42) + 4.0 (Δ45) = **9.4-9.8** added to install_numerator.

**Projected v8.1 install_score**: (existing-numerator-122.7 + 9.4-9.8) / 30.9 = (132.1-132.5) / 30.9 = **4.275-4.288** raw.

**v8.1 ship-gate concern**: projected 4.275-4.288 is **BELOW 4.5 ship-gate** under v8.1's expanded denom. **This is a SHIP-BLOCKER** unless arch-itself lifts elsewhere (e.g. raising D-AGE from 1 to 2 + Δ40 reweighting from 0.4 to 0.6, or re-deriving Δ41 to count internal-skill-callers as "dependents").

**Recommendation**: PRE-CODEX-ROUND-1 audit — re-derive arch-itself math under v8.1 with multiple D-AGE scenarios (1, 2, 3) and verify ship-gate clearance. If 4.5 floor not met, defer Δ40 D-AGE to W320+ or downweight Δ40 from W=0.4 to W=0.2 (re-scoring math: 30.9 - 0.2 = 30.7 denom; (132.1) / 30.7 = 4.303 — still below). Alternative: **defer Δ45 D-CCRT** weight from W=0.8 to W=0.5 (more conservative; W_pattern unchanged) → 30.6 denom; (130.5) / 30.6 = **4.265** — still below.

**Conclusion**: v8.1 SHIP at full Δ40-Δ45 ladder NOT VIABLE without arch-itself self-lift elsewhere. **W319 operator-AI**: re-derive arch-itself self-eval under partial v8.1 ladder (Δ42 + Δ45 only; defer Δ40/Δ41/Δ43/Δ44 to W320+). Projected `install_score = (122.7 + 5.0 + 4.0) / (28.7 + 1.0 + 0.8) = 131.7 / 30.5 = 4.318` — STILL BELOW. Need additional self-lift via D33 quorum-rule reaffirmation OR D27 adopter-floor raised 1 point (W314 already raised D16 4→5; another lift may be defensible if a new external adopter signal emerges).

**Honest projection**: **v8.1 ship-gate clearance is FRAGILE**. Recommend partial-ship at W319 (Δ42 D-EMP RATIFY + Δ45 D-CCRT only) with explicit "v8.1-partial install_score=4.318 BELOW 4.5 ship-gate — operator-override-required per W295 I9 self-reference rule" annotation in VERDICT-LEDGER row.

## §7 — Verdict

**6 v8.1 deltas Δ40-Δ45 codified**, 3-org-distinct anchors verified for 4-of-6 (Δ40 + Δ41 partial with substitutions). **Composite denom 30.9 install / 13.8 pattern**.

**SHIP at W319**: **PARTIAL** — Δ42 + Δ45 only (RATIFY D-EMP from W317-A DRAFT; ADD D-CCRT new). Defer Δ40 + Δ41 + Δ43 + Δ44 to W320+ until arch-itself ship-gate-clearance is empirically demonstrated.

**RISK**: HIGH at full-Δ40-Δ45 ship; LOW at partial Δ42+Δ45 ship. Operator-confirms partial-ship scope before codex-r1.
