# W317-B Synthesis — Cross-Candidate Matrix + W318 Install Queue

> Wave: W317 | Stream: B | Decided: 2026-05-19 | rule_version: sca-v7.1
> Mandate scope: 4 SOTA candidates × ≥11-MCP-family cascade × sca-v7.1 path-(b) deep-ingest re-litigation.

## Cross-candidate score matrix

| Candidate | install_score (W315/W316 prior) | install_score (W317-B) | Δ | pattern_score (prior) | pattern_score (W317-B) | Δ | Tier (W317-B) | Cascade families | Stage-0 |
|---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| **Valdecy/pyDecision** | 3.95 (W315) | **4.027** | +0.077 | 4.75 | **4.755** | +0.005 | T2 VENDOR-FORK | **12/11+** | PASS |
| **METR/HCAST + Vivaria** | 4.15 (W315) | **4.161** | +0.011 | 4.65 | **4.538** | -0.112 | T2 VENDOR-FORK | **13/11+** | PASS-WITH-CAVEAT |
| **haizelabs/verdict** | 2.67 (W316 × 0.85 factor = 3.14 raw) | **3.394** raw | +0.254 | 3.37 | **4.458** | +1.088 | T2 VENDOR-FORK / PATTERN-VENDOR HYBRID | **12/11+** | PASS-STRONG |
| **eric-ai-lab/HarnessAudit** | — (no prior) | **N/A (Stage-0 FAIL for repo; T5)** | — | — | **3.49** (paper-anchor only) | — | **T5-CITE-ONLY** (repo) + **T1-PAPER-ANCHOR-PENDING-REPO-RELEASE** (paper) | **9/11+** | PARTIAL (repo FAIL + paper PASS) |

## Cross-candidate Borda ranking (for sca-v7.1 §6.6.1 absorption-stack priority)

Borda count across 6 axes (5-point scale × 4 candidates → max 5 points per axis × 6 axes = 30 max):

| Candidate | Methodology novelty | Cite-anchor strength | Pattern extractability | Cohort overlap (inv) | Code-release availability | Absorption-tightness to sca-v7.1 | **Borda total** | **Rank** |
|---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| pyDecision | 5 | 3 | 5 | 3 | 5 | **5** (EC-PROMETHEE direct §6.6.1 multi-MCP resolver) | **26** | **#1** |
| HCAST/Vivaria | 5 | 5 | 5 | 3 | 4 (Vivaria deprecation) | 4 (D28 anchor sustained) | **26** | **#1-tied** |
| haizelabs/verdict | 4 | 4 | 5 | 3 | 4 (stale Jul 2025) | 5 (D30 META-DIM canonical backend) | **25** | **#3** |
| HarnessAudit | 4 (NOVEL: trajectory-audit) | 4 (multi-institution paper) | 4 | 2 (8-domain taxonomy overlap) | 1 (no code) | 2 (§6.6.2 new sub-section future-work only) | **17** | **#4** |

> **Borda interpretation**: pyDecision and HCAST/Vivaria TIE at #1. pyDecision wins on code-release immediacy + EC-PROMETHEE direct §6.6.1 fit. HCAST wins on cite-anchor authority + multi-institution-adoption breadth. **Recommend BOTH be absorbed in W318 (parallel, non-conflicting absorption-vectors).**

## Eval-axis Borda (HCAST vs verdict)

Per mandate: "Cross-candidate Borda ranking if 2+ compete in same area (e.g., HCAST vs verdict on eval-axis)"

| Eval-axis dim | HCAST anchor | verdict anchor | Winner |
|---|---|---|---|
| Long-running task fitness (D28) | 189 tasks × 1min-8h+ × 140 baseliners | judge-time compute scales with trajectory length | **HCAST** (empirical-baseline-rooted) |
| Judge-on-judge calibration (D30) | indirect (human-baseliner-vs-agent comparison) | DIRECT (Unit/Layer/Block compound judges + MaxPool aggregation) | **verdict** (D30 canonical) |
| Cost-aware methodology (D35 proposed) | $50-$150/hr human baseline | $X-per-LLM-call inference budget | **HCAST** (publicly anchored economic numbers) |
| Cohort consensus (D33) | multi-evaluator-via-METR institutional-evaluation-pattern | multi-LLM-via-MaxPoolUnit-vote | **verdict** (executable; HCAST is methodology not primitive) |
| Trajectory observability | Vivaria trace_entries_t observability | judge-graph dependency-edges Visualizable via Graphviz | **TIE** (both expose trajectory; different abstractions) |

> **Eval-axis verdict**: COMPLEMENTARY-NOT-COMPETITIVE. HCAST anchors empirical-baselining (D28, D35-proposed); verdict anchors executable-judge-composition (D30, D33). **W318 should absorb BOTH** with explicit cite-distinguishing in sca-v7.1 §6.6.1.

## Top-3 W318 RECOMMENDED INSTALLS (post W317-B deep-ingest)

> Per mandate: "Top-3 W318 RECOMMENDED INSTALLS (after this deep-ingest data)"

Given that all 3 surviving candidates are T2 (not T1), "INSTALL" interpretation = **methodology-absorption** (markdown-spec vendor-fork) + **runtime-library reference** (where applicable), NOT runtime-primitive install.

### #1 — pyDecision EC-PROMETHEE Committee absorption (P0 — W318 ship)

- **Action**: Write `docs/architecture/W318-MCDA-ABSORPTION/EC-PROMETHEE-spec.md` + `CRITIC-DEMATEL-spec.md` + `3MOAHP-spec.md` + `TOPSIS-spec.md` (4 markdown spec files, ~3-5 KB each).
- **Edit-in**: `.claude/skills/sota-convergence-audit/SKILL.md` §6.6.1 → absorb EC-PROMETHEE algorithm as the canonical multi-MCP-cohort disagreement resolver (replaces W316 Δ30 advisory-only).
- **Cite**: arxiv:2404.06370 + Brans+Mareschal PROMETHEE-VI literature.
- **Expected install_score lift on arch-itself**: +0.15 conservative (4.756 → 4.906 path-(b) default).
- **No runtime install**: GPL-3 license blocks binary derivative; spec extraction is fair-use.

### #2 — HCAST methodology re-confirm (P0 — W318 ship)

- **Action**: Re-confirm W315 absorption in sca-v7.1 §D28 (weight 0.6 → 0.9) — no new edit needed; W315 routing remains current.
- **NEW for W318**: queue `UKGovernmentBEIS/inspect_ai` for full sca-v7.1 deep-ingest as T1-INSTALL candidate (Vivaria-successor; UK-government endorsement; likely Apache/MIT).
- **Cite**: arxiv:2503.17354 + metr.org/hcast.pdf + Time Horizon 1.1 blog Jan 2026.
- **Vivaria deprecation flag**: ledger annotation explicit "DO NOT runtime-install Vivaria; methodology-only".

### #3 — verdict DSPy cookbook integration into dspy-integration skill (P1 — W318 optional)

- **Action**: Append Section "judge-time-compute via Verdict library" to `.claude/skills/dspy-integration/SKILL.md` (~50 LOC; operator-gated).
- **Cite**: arxiv:2502.18018 + `docs/cookbook/dspy.md`.
- **Confirm W316 D30 absorption holds**: Verdict remains canonical D30 META-DIM cite-anchor.
- **Re-verify timing**: W316-set W322 re-verify still appropriate; W317 early-re-litigation confirms tier-stable.

### Honourable mention — HarnessAudit code-release-watch (P2 — W319 conditional)

- **Action**: Set explicit watch on arxiv:2605.14271 + github.com/eric-ai-lab/HarnessAudit (canonical) + github.com/UCSB-NLP-Chang/HarnessAudit (alt). Re-litigate in W319 if code lands.
- **Lane-D operator clarification needed**: original /goal mandate referenced "Lane D real-binding (replaces SETUP-PENDING placeholder)" — operator confirmation required whether (a) wait for arxiv code release, (b) bind to ECC `/harness-audit` skill that already exists, or (c) different artifact.
- **Stage-0 vindication**: This is the FIRST W317 concrete catch of Δ33 successfully detecting paper-published-but-code-not-yet-released — sca-v7.1 §1 codification VINDICATED.

## sca-v7.1 absorption-stack lift summary (cumulative)

| Absorption vector | Source | install_score-lift on arch-itself | Status |
|---|---|---:|---|
| EC-PROMETHEE Committee for §6.6.1 multi-MCP resolver | pyDecision (W315 deferred + W317-B re-confirmed) | **+0.15** | P0 W318 ship |
| HCAST D28 empirical anchor (weight 0.6→0.9) | HCAST (W315 absorbed; W317-B re-confirmed) | already applied; +0.10 historically | NO-OP at W318 |
| Verdict D30 META-DIM canonical backend | verdict (W316 absorbed; W317-B re-confirmed + DSPy cookbook lift) | already applied; +0.05 incremental from DSPy cookbook | P1 W318 |
| HarnessAudit trajectory-audit §6.6.2 future-work | HarnessAudit (paper-anchor only — W317-B first consideration) | +0.05 future-work-only at W319+ | P2 W319 conditional |

> **Cumulative install_score on arch-itself post W318 (assuming P0+P0 ship)**: 4.756 + 0.15 = **4.906** (margin +0.406 above 4.5 ship-gate).

## Multi-candidate convergence findings

1. **D33 quorum-rule operationalizable now**: pyDecision's `compare_ranks_crisp` + verdict's MaxPoolUnit + HCAST's multi-evaluator-pattern are THREE distinct primitives that can EACH operationalize sca-v7.1 D33 cross-source-consensus from advisory-only to executable. Recommend Stream A (sca-v8 DRAFT) absorb the pyDecision-EC-PROMETHEE variant as canonical (most general for asymmetric-weight cohorts).
2. **Trajectory-audit emerging as cohort theme**: HarnessAudit + Vivaria-trace_entries_t + verdict-pipeline-graph all converge on TRAJECTORY-LEVEL audit primitives (vs output-only). This is a sca-v7.1 D31 silent-fallback-density complement — trajectory observability REDUCES silent-fallback density. Recommend Stream A consider new dim D36 trajectory_audit_coverage.
3. **Paper-vs-code asymmetry caught**: HarnessAudit's Δ33 catch demonstrates that NEW SOTA research (≤30-day-old arxiv papers) needs a "paper-anchor-pending-repo-release" tier (T1-PAPER-ANCHOR-PENDING) distinct from T5-REJECT. Sca-v7.1 §1 currently routes Stage-0-fail to AUTO-REJECT; recommend Stream A introduce explicit T1-PAPER-PENDING tier.

## Cascade-cost final

| Stream | Candidates | $ used | Budget | % |
|---|---:|---:|---:|---:|
| W317-B total | 4 | **~$3.30** | $20.00 | 16.5% |

> **Cascade-cost well under cap**. Per-candidate efficient because: (1) 3-of-4 candidates had prior T6 verdicts surfaced via basic-memory → supersession-chain pre-flight short-circuited needless re-discovery; (2) Context7 indexing on verdict + pyDecision lifted snippet-coverage without 7-call WebFetch chains; (3) deepwiki substantive answers on verdict + Vivaria saved ≥3 WebFetch-each (Vivaria architecture deep-dive alone replaced ~5 WebSearch hits).

## Verdict-ledger rows W317 #73-#76 (to append)

> See `Z:\claude-sota-installed\docs\architecture\W288-RESEARCH-ARCH-v2\VERDICT-LEDGER.md` for append target.

| # | Wave | Decided | Candidate | Verdict | install_score | pattern_score | Hard caps | Status | Re-verify | Notes |
|---:|:---:|:---:|---|:---:|:---:|:---:|---|:---:|:---:|---|
| 73 | W317-B | 2026-05-19 | `Valdecy/pyDecision v4.9.4` | T2 VENDOR-FORK (RE-LITIGATED from W315 — install 3.95 → 4.027) | 4.027 (path-b 28.7) | 4.755 | D16=2 + D24=2 floor (T1 blocked, T2 confirmed); D8=2 GPL-3 limits commercial-binary; ALGORITHM-spec fair-use OK | ACTIVE — pattern-vendor-only via W318 EC-PROMETHEE absorption | W321 | re-litigation 1-wave-past-W315-due; confirms tier; lifts marginal +0.077 install on deep-ingest |
| 74 | W317-B | 2026-05-19 | `METR/HCAST + METR/Vivaria` | T2 VENDOR-FORK (RE-LITIGATED from W315 — install 4.15 → 4.161; Vivaria DEPRECATION FLAG) | 4.161 (path-b 28.7) | 4.538 | D3=2 + D14=2 + D24=2 floor; D7=3 (mixed-signal-deprecation); Vivaria new-feature ramp-down ⇒ methodology-absorption now CANONICAL ceiling | ACTIVE — HCAST methodology-only; do NOT runtime-install Vivaria | W321 | new material signal: Vivaria→Inspect-AI supersession EXPLICIT in repo README+docs/index.md; Time Horizon 1.1 Jan 2026 task suite extended 170→228 |
| 75 | W317-B | 2026-05-19 | `haizelabs/verdict v0.2.7` | T2 VENDOR-FORK + PATTERN-VENDOR HYBRID (RE-LITIGATED from W316 — install raw 3.14 → 3.394 lift +0.254 on deep-ingest evidence) | 3.394 raw (path-b 28.7) | 4.458 | D16=2 + D24=2 floor; D7=2 stale (no activity since Nov 5 2025); D15+D32 staleness drift signal | ACTIVE — D30 META-DIM canonical backend; DSPy cookbook integration optional W318 | W322 | early-re-litigation justified by 3 new-material signals (Context7 391-snippet TOP-TIER + DSPy cookbook + deepwiki substantive) |
| 76 | W317-B | 2026-05-19 | `eric-ai-lab/HarnessAudit (arxiv:2605.14271)` | **T5-CITE-ONLY for github-repo (Stage-0 FAIL per Δ33; repo does NOT exist 2026-05-19); T1-PAPER-ANCHOR-PENDING-REPO-RELEASE for arxiv paper** | N/A (Stage-0 FAIL) | 3.49 (paper-anchor approx) | D3=1 (no code yet); github + WebSearch + deepwiki + context7 all 0-hit on repo path | ACTIVE-WATCH — arxiv:2605.14271 paper exists (2026-05-14, 5 days old at audit time) but code NOT-YET-RELEASED | W319 (code-release-watch) | FIRST W317 concrete catch of Δ33 successful Stage-0 detection of paper-published-but-code-not-yet-released kind; confounder caught (ECC `/harness-audit` skill ≠ UCSB paper); Lane-D operator-clarification needed |

## Files written this wave (final list)

- `docs/architecture/W317-DEEP-INGEST/W317-B-CASCADE-FIRE-LOG.md` ✓ written
- `docs/architecture/W317-DEEP-INGEST/W317-B-PYDECISION-DEEP-AUDIT.md` ✓ written
- `docs/architecture/W317-DEEP-INGEST/W317-B-HCAST-VIVARIA-DEEP-AUDIT.md` ✓ written
- `docs/architecture/W317-DEEP-INGEST/W317-B-HAIZELABS-VERDICT-DEEP-AUDIT.md` ✓ written
- `docs/architecture/W317-DEEP-INGEST/W317-B-HARNESSAUDIT-DEEP-AUDIT.md` ✓ written
- `docs/architecture/W317-DEEP-INGEST/W317-B-SYNTHESIS.md` ✓ this file
- `docs/architecture/W288-RESEARCH-ARCH-v2/VERDICT-LEDGER.md` (append rows #73-#76 — next step)
- T6 verdicts via basic-memory MCP × 4 (next step)

## Cumulative W317-B operator-AIs forwarded W318+

1. **AI-W317-B-pyDecision-EC-PROMETHEE-COMMITTEE-SCA-v7-2-DRAFT** (P0 W318 — Stream A SKILL.md edit + W318-MCDA-ABSORPTION/ folder create)
2. **AI-W317-B-pyDecision-MCDA-ABSORPTION-FOLDER-CREATE** (P0 W318 — 4 markdown specs)
3. **AI-W317-B-pyDecision-DEEPWIKI-INDEX-REQUEST** (P3 W319 optional)
4. **AI-W317-B-HCAST-ANCHOR-REINFORCE** (P0 W318 — sustains W315 routing; no edit)
5. **AI-W317-B-VIVARIA-DEPRECATION-FLAG** (P0 W318 — ledger annotation)
6. **AI-W317-B-INSPECT-AI-T1-CANDIDATE-QUEUE** (P0 W318 — new candidate audit)
7. **AI-W317-B-VERDICT-D30-CITE-CONFIRM** (NO-OP — W316 routing holds)
8. **AI-W317-B-VERDICT-DSPY-COOKBOOK-CITE** (P1 W318 — dspy-integration SKILL.md edit)
9. **AI-W317-B-VERDICT-RE-VERIFY-W322** (P3 W322 — scheduled re-verify)
10. **AI-W317-B-VERDICT-STALENESS-WATCH** (P2 — auto-watch trigger setup)
11. **AI-W317-B-HARNESSAUDIT-CODE-RELEASE-WATCH** (P1 W319 — arxiv code-release watch trigger)
12. **AI-W317-B-LANE-D-OPERATOR-CLARIFICATION** (P0 — operator-input required for Lane D binding)
13. **AI-W317-B-LANE-D-ALT-CANDIDATE** (P2 W318 — queue `aimingsys/AutoHarness` deep-ingest)
14. **AI-W317-B-DELTA-33-VINDICATION** (P0 — Stream A documents this as first concrete Δ33 catch in sca-v7.1 SKILL.md or sca-v8 DRAFT)

## Rollback (full)

`git rm -r docs/architecture/W317-DEEP-INGEST/` (markdown-only deliverables; no runtime artifacts created this wave).
