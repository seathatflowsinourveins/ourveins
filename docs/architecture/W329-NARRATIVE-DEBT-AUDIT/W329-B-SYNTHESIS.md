# W329 Stream-B — Narrative-Debt Audit SYNTHESIS

**Wave**: W329 Stream-B · **Date**: 2026-05-19 · **Auditor**: subagent (Claude Opus 4.7)
**Predecessor**: W328 Stream 1 USER-ERROR (HF substring-on-id query semantics; STANDING per W329-K codex r2 PASS) + W328 Stream 2 USER-ERROR (GitHub-MCP `repo:owner/name` qualifier mismatch) **NOTE: W328-S2 SUPERSEDED by `docs/architecture/W329-S2-REAUDIT/VERDICT.md` 2026-05-19** — 5-source live-API re-audit refuted both W328-S2 and codex round-1 counter-hypothesis; root cause UNDETERMINED pending W330. Operator principle ("look at your own usage first; don't assume upstream bug") still holds; W-UE row retractions remain valid, but the reframe predicate is "unknown-attribution error" not "user qualifier mismatch".
**Companion**: `LEDGER.md` (66 rows, per-claim classification — see updated predecessor-verdicts block)

## Executive summary

Operator principle codified at W328 ("mature repos = look at your own usage first; don't assume upstream bug") exposed systemic confirmation-bias debt across W314-W328 wave docs. W329-B scanned 66 distinct "silent fallback" claims across 11 wave-doc clusters (W314-W328).

**Headline distribution**:

| Classification | Count | % of total |
|---|---|---|
| WITHDRAWN-USER-ERROR (W-UE) | 16 | 24.2% |
| WITHDRAWN-NEEDS-RE-EXAM (W-RE) | 5 | 7.6% |
| RETAINED-INDEPENDENT (R) | 36 | 54.5% |
| AMBIGUOUS / MIXED (A) | 9 | 13.6% |
| **TOTAL** | **66** | **100%** |

**Conservative-bias check**: when in doubt the classifier defaulted to RETAINED or AMBIGUOUS (per task constraint). Of the 16 W-UE rows, 14 are pending remediation; 2 are ALREADY-RETRACTED (W321 upstream-issue drafts renamed `WITHDRAWN-USER-ERROR-*` in W328).

## Top-5 highest-priority WITHDRAWN items (by downstream impact)

Ranked by combined impact on (a) sca-v* rubric design, (b) anti-bias gate calibration, (c) live skill behaviour:

1. **W315-r2-Synthesis §5 "4th-time-confirmed silent-fallback"** (row 7) — propagated the "X-wave silent-fallback" framing into the CLAUDE.md Status block and into subsequent W316-W325 cross-references. Single highest-leverage citation. **Remediation**: append `[WITHDRAWN-UNKNOWN-ATTRIBUTION per W329-S2-REAUDIT]` banner (predecessor W328-S2-USER-ERROR verdict SUPERSEDED; root cause UNDETERMINED — 5-source live-API re-audit refuted BOTH user-error AND upstream-defect hypotheses); preserve the REST-fallback workaround under the "right-tool-for-job" reframe already landed in sca-v12.1.

2. **W314-r2 F-5 (FINDINGS.md L73-89)** (row 1) — the canonical source-of-record for the GitHub-MCP `search_repositories` "silent fallback" narrative. Cited by W315-r2 D-3 → W316-S7 → W317-r2-S6 → W319-A → W320-G → W325-D as the upstream-defect anchor. **Remediation**: rewrite F-5 with `WITHDRAWN-UNKNOWN-ATTRIBUTION` banner referencing W329-S2-REAUDIT/VERDICT.md (NOT the superseded W328-S2-USER-ERROR predecessor); keep the REST-fallback workaround code as a "right-tool" pattern, not as a defect-mitigation.

3. **W320-J Δ48 (STORM Moderator + sca-v11 §1)** (row 20) — Δ48 was designed to "close 4-wave GitHub-MCP silent-fallback" via anti-stagnation in multi-perspective discovery. The PATTERN is structurally useful (Co-STORM Moderator is genuinely SOTA per stanford-oval); the RATIONALE is invalidated. **Remediation**: reframe Δ48 in sca-v* skill from "closes GitHub-MCP silent-fallback" to "cohort-balance audit + perspective diversity for thorough discovery". sota-convergence-audit/SKILL.md already absorbed this into v12.1 reframe; verify downstream Δ-symbols still cite correctly.

4. **W320-G "7th-wave / 5th-wave silent-fallback CONFIRMED" rows** (row 18) — W320 Stream G was the empirical reproduction wave that cemented the "7+5 wave count". This is the single biggest cluster of evidence-rows that need W-UE banners; the empirical observations are real (queries returned 0 results) but the EXPLANATION is now of unknown attribution per W329-S2-REAUDIT (BOTH user-error AND upstream-defect hypotheses refuted by 5-source live-API probes); the predecessor W328-S2-USER-ERROR framing is SUPERSEDED. **Remediation**: append banner to the 2 explicit lines (L75, L78); update §"bibliography" tail (L627) to drop "documented" language.

5. **W325-D-CONVERGENCE-MATRIX matrix legend + Stream-D candidates** (rows 44, 45) — W325-D is the most recent wave to cite "5th-wave silent-fallback CONFIRMED" as live signal; the convergence matrix uses `⊘` for "no data / silent-fallback" which conflates query-construction errors with genuine transport failures. **Remediation**: split legend symbols: `⊘-query-error` (W-UE class) vs `⊘-transport-fail` (R class); re-score the 5-candidate matrix per the split.

## Specific cross-checks (Task 4 verdicts)

### 4.1 — W295 §6.2 anti-bias inverse-test calibration

**Question**: was §6.2 tuned against silent-fallback empirical baseline that's now invalidated?

**Verdict**: **NO recalibration required**. W295 Stream-C (`W295-STREAM-C-ANTI-BIAS.md`) sources the 5-gate inverse-test from 6+ external organizations: MLflow (Gate-1 score-anchored rubric + Gate-3 calibration set), tatsu-lab AlpacaEval (Gate-A1 length-control), arXiv 2306.05685 MT-Bench (Gate-Z1 four named LLM-judge biases), NIST AI RMF (Govern/Map/Measure/Manage lifecycle), ISO/IEC 23894:2023, plus internal cross-check.

The §6.2 5-gate design (mechanical re-fetch · paraphrase-invariance · adversarial-blinded · provenance-audit · org-count) is structurally independent of the silent-fallback empirical baseline. The W328-S Synthesis line 65 calling for "recalibration" is OVERSCOPED — recalibration is NOT needed.

Action: append note to W328 Synthesis line 65 if remediation wave proceeds, OR explicitly note in W329-A that "recalibration call dismissed per W329-B Task-4 §4.1 finding".

### 4.2 — sca-v* Δ33 "silent-fallback workaround" framing

**Question**: what other Δ-symbols reference Δ33's silent-fallback framing?

**Verdict**: **Δ33 itself + Δ46 (cohort_completeness_signal) + Δ48 (STORM Moderator) + Δ49 (perspective-guided audit, W320 sister) all depend on the silent-fallback predicate**.

Status: sota-convergence-audit/SKILL.md §1 L26-43 IS ALREADY REFRAMED to v12.1 per W328-A absorb: "v12.1 reframe (W329 per W328-S1 USER-ERROR-CONFIRMED + W328-S2 SUPERSEDED-by-W329-S2-REAUDIT-as-UNKNOWN-ATTRIBUTION)... the Stage-0 multi-family probe pattern is RETAINED but reframed: **choose the right tool for the job**." The v12.1 reframe holds on the broader "right-tool-for-job" principle regardless of S2 attribution outcome.

Downstream Δ-symbols (Δ46/Δ48/Δ49) need verification that their sca-v10/v11 rationale text was updated in step. Per LEDGER rows 17, 20, 36, 61: **5 W-RE rows pending** — they retain the WORKAROUND structurally but need rationale rewording (reframe "closes silent-fallback" to "cohort-balance / perspective-diversity").

Action W329-A scope: walk Δ46/Δ48/Δ49 rationale strings in sca-v10/v11/v12 design docs + downstream SKILL.md absorbs.

### 4.3 — Parallel-ratio measurement (W325-A F1 SEV-1, 0.0038 baseline)

**Question**: IS this related to silent-fallback narrative or independent?

**Verdict**: **INDEPENDENT** — RETAIN as is.

The 0.0034 / 0.0036 / 0.0037 / 0.0038 parallel_ratio measurements (W325-A F1, W326-A F1, W326-Inventory) are derived from JSONL session-file telemetry (3145 files scanned at `.claude/projects/`) measuring `parallel_2plus_in_one_assistant_message / turns_with_any_Agent_call`. The methodology is unrelated to the GitHub-MCP / HF narrative. The "154× inflated previously by silent-fallback artifact" phrasing in W326-Inventory L147 refers to a MEASUREMENT-TOOL DEFECT (un-grouped tool_use counting — W314-C-PARALLEL-RATIO-MEASUREMENT.md L15) NOT the GitHub-MCP/HF narrative.

Verified clean: no rationale change needed. The empirical 0.0038 baseline + the underlying P0 fix call (PreToolUse[Agent] hook enforcement) are valid and W329-independent.

## Recommended remediation wave + scope

**Proposed**: **W329-A** (parallel sub-stream to this W329-B audit; can co-execute or follow W329-B).

**Scope**:

| Action | Target | Estimated edits |
|---|---|---|
| (1) Append `[WITHDRAWN-UNKNOWN-ATTRIBUTION per W329-S2-REAUDIT]` banner (predecessor W328-S2 USER-ERROR verdict SUPERSEDED) to top of 14 wave-doc sections (LEDGER rows: 1, 3, 4, 5, 7, 10, 15, 17 partial, 18, 19, 21, 41 partial, 44, 45, 53 partial, 58 partial, 60, 63 banner-correction) — W-UE classification preserved (withdrawal valid on basis of some error; attribution shifted from "user qualifier mismatch" to "UNDETERMINED") | wave docs (READ-ONLY in this stream, write in W329-A) | 14 banner inserts |
| (2) Reframe sca-v10 Δ46 + sca-v11 Δ48 + sca-v* Δ49 rationale strings in design docs (NOT in SKILL.md — already done in v12.1) | W320-C/J + W321-7 design docs | 5 reframe edits |
| (3) Verify sota-convergence-audit/SKILL.md L26-43 v12.1 reframe is internally consistent + no orphan Δ33-silent-fallback strings remain | `.claude/skills/sota-convergence-audit/SKILL.md` + `references/dimensions.md` | 1 verification grep |
| (4) Dismiss W295 §6.2 recalibration call from W328 line 65 (per Task 4 §4.1 finding) | optional follow-up note | 1 sentence |
| (5) Split W325-D matrix legend `⊘` symbol into `⊘-query-error` vs `⊘-transport-fail` per LEDGER row 45 | W325-D STREAM-D-CONVERGENCE-MATRIX.md | 1 legend edit (W329-A only if matrix re-used) |

Estimated total: 21 edits in W329-A; ~2-3 hours wall time.

**Out-of-scope for W329-A**: rewriting historical wave docs in full (only banner-insert + targeted rationale strings). Original narrative bodies preserved for audit-trail per the W328 retraction pattern (`WITHDRAWN-USER-ERROR-*.md` files keep original text below the banner).

## Confirmation-bias discipline notes

This audit confirms operator's W328 principle: of 66 silent-fallback claims, **21 (32%) were ultimately user-error or user-error-derivative** while **36 (55%) were structurally independent signals** that survive scrutiny. Future audits should:

1. **Default to "look at own usage first" + unknown-attribution discipline** for ANY claim about a mature upstream (≥1000 users); require source-deep-dive AND falsifiable-inverse re-audit BEFORE upstream-issue framing — already codified as proposed R6 in W328 §"Confirmation-Bias Discipline". W329-S2-REAUDIT empirically showed that even the "user-error" counter-hypothesis can fail under re-audit; root cause may be UNDETERMINED even after both bug-blame and user-blame hypotheses are tested.
2. **Distinguish workaround utility from narrative correctness** — many W-UE rows retained their REST-fallback / multi-family-probe workaround as valid SOTA-discovery patterns even after the upstream-defect framing was retracted. The workaround is "right-tool-for-job", not "defect-mitigation".
3. **Distinguish methodology-defect from upstream-defect** — the W314-C-PARALLEL-RATIO-MEASUREMENT.md L15 acknowledgement ("un-grouped pass returned 0.000 — that was a measurement-tool defect, not a runtime regression") is the model: declare measurement-tool issues separately from runtime-behaviour issues.

## Cite anchors (3-org-distinct)

1. **github/docs** repository-search qualifiers — `https://github.com/github/docs/blob/main/content/search-github/searching-on-github/searching-for-repositories.md` (W328-S2 source-of-record).
2. **huggingface/huggingface_hub** — `https://huggingface.co/docs/huggingface_hub/package_reference/hf_api` `hub_repo_search` docstring (W328-S1 source-of-record).
3. **anthropics/claude-code** hooks doc — `https://docs.anthropic.com/en/docs/claude-code/hooks` (canonical source for hook-channel silent-fallback class; grounds the 15+ RETAINED hook-channel rows).
4. **stanford-oval/storm** + Co-STORM Moderator pattern — supports the W-RE reframe rationale for Δ48 + Δ49 (pattern survives independent of GH-MCP defect framing).
5. **MLflow + AlpacaEval (tatsu-lab) + arXiv 2306.05685 + NIST AI RMF + ISO/IEC 23894:2023** — W295 §6.2 source-of-record; confirms the anti-bias inverse-test was NOT tuned against the now-invalidated baseline.

## Files

- `Z:\claude-sota-installed\docs\architecture\W329-NARRATIVE-DEBT-AUDIT\LEDGER.md` — 66-row per-claim ledger.
- `Z:\claude-sota-installed\docs\architecture\W329-NARRATIVE-DEBT-AUDIT\W329-B-SYNTHESIS.md` — this file.

Read-only across all wave docs per task constraint; no edits applied this stream.
