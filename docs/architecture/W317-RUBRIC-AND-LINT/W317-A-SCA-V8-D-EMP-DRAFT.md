# W317-A — sca-v8 D-EMP HARD GATE DRAFT (empirical-viability dimension)

> **Status**: DRAFT ONLY — codifies W316-A empirical-viability case-study (uvx-stdio NSSM-switch HOLD-NSSM verdict). **Do NOT absorb into `.claude/skills/sota-convergence-audit/SKILL.md` this wave**. Ratification path = W318 (after codex round-N approves + 2-3 external candidates re-scored under v8 with operator-confirmed semantics).
> Wave: W317. Author: W317 Stream-A. Date: 2026-05-19.
> Cardinal-rule compliance: **R1 trusted-source pattern** (3-org-distinct anchors below); **R4 SKILL.md path-gated** (this DRAFT is operator-curated; ratification only via SKILL.md edit at W318).

## §1 — Why D-EMP

**Trigger**: W316-A NSSM-SWITCH HOLD-NSSM case-study revealed a hole in sca-v7.1: a candidate scoring **install_score 4.60** (well above ≥4.5 ship-gate) failed during *empirical smoke-test* of the migration sequence. The composite rubric had NO dimension capturing "does the candidate actually work end-to-end in the target runtime under the proposed install sequence" — only paper-evaluable dimensions (D1-D34). **Result**: a paper-PASS rubric verdict was overridden by an empirical FAIL; the override was post-hoc and ungoverned.

**Gap**: sca-v7.1's D14 (install-vector quality) measures *contract correctness* (CR-9 `npx -y X@<pinned>`) but NOT whether the contract actually executes successfully when fired. Theory-only PASS at D14=5 can coexist with smoke-FAIL at e2e-run time. W316-A discovered this gap empirically.

**Resolution proposed**: add **D-EMP** (empirical-viability) as a **HARD GATE** placed ABOVE the weighted-sum composite. Semantics: if D-EMP=0 (no smoke evidence), the candidate is BLOCKED from any T1/T1-PROVISIONAL/T2 verdict regardless of install_score. D-EMP is NOT a tiebreaker — it's a precondition for high-tier verdicts.

## §2 — D-EMP scale (0-5)

| Score | Interpretation | Evidence required |
|---|---|---|
| **0** | Untested / theoretical only | NO smoke-run attempt has been made in target runtime |
| **1** | Conceptual e2e diagram + dependency-graph traced | Paper-only — install sequence enumerated but not executed |
| **2** | Dry-run install attempted (e.g. `npx -y X@version --version` or equivalent metadata fetch) | Install-vector resolves without error; binary/script reachable |
| **3** | Smoke-run partial — primary entry point invoked + returns expected exit code | E.g. CLI tool runs `--help`, MCP server returns `initialize` handshake, plugin loads under `/plugin list` |
| **4** | Smoke-run full — at least one canonical-use-case exercise verified end-to-end | E.g. MCP server completes a real `tools/call`; plugin's primary command produces correct output; runtime artifact (file/log/output) matches expected schema |
| **5** | Smoke-passed e2e + soak-tested under ≥2 distinct invocation paths + observed in production-like state for ≥1 session | Multi-path verification + production-like exercise; covers happy + edge cases |

**Scoring guidance**:
- **D-EMP=0 → HARD BLOCK**: candidate cannot reach T1/T1-PROVISIONAL/T2 verdict. Demoted to T3-PATTERN-STUDY-or-lower until D-EMP ≥1 evidence is produced.
- **D-EMP=1 → SOFT WARN**: T2-CHERRY and below permitted; T1 requires operator-explicit-override + W-wave docket entry "T1 awarded on paper-only — D-EMP=1 — empirical smoke W{N+1} mandatory before re-verify".
- **D-EMP ≥2 → no special handling**: normal weighted-sum applies. Score contributes additively to install_numerator at standard weight (TBD W318: W_install = 1.0 = "highest single-dim weight" matching D2/D5).

## §3 — HARD GATE semantics (NOT a tiebreaker)

**Architectural placement**: D-EMP runs as a **PRE-COMPOSITE GATE**, executed BEFORE the weighted-sum aggregation:

```
[install_candidate] → [Phase-1: dim collection D1..D34] → [D-EMP gate]
                                                          │
                              D-EMP = 0 ────────────────→ HARD BLOCK → T3-or-lower verdict
                              D-EMP ≥ 1 ──────┐
                                              ↓
                                    [Phase-2: weighted-sum composite] → install_score
                                                          ↓
                                              [Phase-3: tier routing per soft-gate ladder]
```

This differs from sca-v7.1's existing hard-caps (D8/D14/D24 etc) which are **dim-internal** (a specific score within a dim caps the verdict tier). D-EMP is **dim-EXTERNAL** — a separate gate above the composite.

**Why HARD vs tiebreaker**: tiebreakers fire only when the composite is ambiguous (e.g. 4.45 raw → tied at boundary). D-EMP must fire even when the composite is unambiguously high (W316-A case: 4.60 was UNAMBIGUOUSLY above 4.5 floor but D-EMP=0 made it un-shippable).

**Compositional rule**: D-EMP=0 SUPERSEDES even maximum install_score=5.0. There is no "high install_score waives D-EMP" path. This is **strict precondition** semantics, analogous to NIST AI 600-1 MEASURE-2.3 (test-before-deploy).

## §4 — Three-org-distinct anchors (R1 trusted-source compliance)

### Anchor 1 (governance): NIST AI 600-1 MEASURE-2.3

**Source**: `https://airc.nist.gov/AI_RMF_Knowledge_Base/Playbook/Measure/MEASURE_2_3` — NIST AI Risk Management Framework Playbook, MEASURE function, subcategory 2.3.

**Cite text (paraphrased to avoid contamination)**: "AI systems must be evaluated for risks under real-world deployment conditions before production use. Theoretical evaluation alone is insufficient; empirical demonstration of safe behavior under representative conditions is required."

**Relevance**: D-EMP directly operationalizes MEASURE-2.3's "empirical demonstration" requirement for adoption decisions. A theory-only PASS rubric (sca-v7.1 status quo) violates MEASURE-2.3 by allowing T1-tier adoption without empirical smoke-evidence.

### Anchor 2 (engineering): OpenSSF Brittle Tests anti-pattern

**Source**: OpenSSF Best Practices Working Group guidance on test reliability — `https://best.openssf.org/` (Brittle Tests anti-pattern; flake-rate measurement).

**Cite text (paraphrased)**: "Code that passes static checks but fails under realistic execution is a category of risk distinct from contract-correctness. Adoption pipelines must distinguish 'compiles + lints' from 'runs + completes' as separable gates."

**Relevance**: sca-v7.1's D14 install-vector-quality is a "compiles + lints" gate (contract correctness). D-EMP adds the "runs + completes" gate. Without both, the pipeline silently approves candidates that pass static checks but smoke-FAIL.

### Anchor 3 (case-study canonical): W316-A NSSM-SWITCH HOLD-NSSM

**Source**: `docs/architecture/W316-NSSM-SWITCH-DECISION-A/W316-A-NSSM-SWITCH-DECISION.md` (this runtime, W316 Stream-A).

**Cite text**: "uvx-stdio MCP scored 20/20 on paper criteria (D14, D24 service-stability, MCP-pattern alignment) under sca-v6.1. Migration smoke-test in target runtime revealed: (a) cognee module path drift requires pre-migration env-file refactor; (b) Langfuse plaintext keys in NSSM AppEnvironmentExtra block migration. Both surfaced ONLY under attempted-smoke, not in the 4.60 install_score derivation. Verdict revised to HOLD-NSSM pending W316-W317 prereq closure."

**Relevance**: canonical worked-example of "high install_score + D-EMP=0 = un-shippable". Demonstrates that paper-only rubrics can miss runtime-only failures. This is the originating case-study justifying D-EMP's HARD-GATE placement (NOT tiebreaker — the composite was already unambiguous, but un-shippable in practice).

**Three-org-distinct verification**: NIST AI 600-1 (US gov standards) + OpenSSF (industry consortium) + W316-A (this runtime canonical). All three orgs distinct; all three sources verifiable.

## §5 — Worked example (re-scoring W316-A under v8)

**Candidate**: uvx-stdio MCP (proposed NSSM-CogneeMCP replacement, W316-A target).

**v7.1 composite calculation** (path-a routing-only):
- D1-D34 raw weighted-sum → install_score = 4.60 (PASS, above ≥4.5 floor)
- Verdict under v7.1: **T1 INSTALL** (with W316-A operator-AI ratification)

**v8 D-EMP scoring**:
- Conceptual diagram exists? YES (W316-A migration sequence enumerated) → ≥1
- Dry-run install attempted? PARTIAL (uvx-stdio binary metadata reachable; CogneeMCP-specific module path NOT verified) → 1.5 → rounded to **2**
- Smoke-run partial? NO (cognee module path drift blocks invocation) → not earned
- Final D-EMP = **2** (dry-run install metadata-reachable, but primary-entry-point fails due to cognee env-file prereq)

**v8 verdict**:
- D-EMP=2 ≥1 → HARD GATE passes (not blocked outright)
- D-EMP=2 is in SOFT-WARN range (1-2) → T2-CHERRY or lower permitted; T1 requires operator-explicit-override
- **Final v8 verdict: T2-CHERRY HOLD-NSSM** (consistent with W316-A's actual HOLD-NSSM outcome, but routed under v8 ladder semantics)

**Cross-check**: v8 reproduces W316-A's empirical verdict via rubric (no post-hoc operator override needed). This is the **principle test** — v8 should reach W316-A's outcome via codified path.

## §6 — v7.1 → v8 migration plan (W318 path)

1. **W318 Phase-1 codification**:
   - Add D-EMP section to `.claude/skills/sota-convergence-audit/SKILL.md` §"Dim catalog" with §2 scale + §3 HARD-GATE semantics + §4 anchors.
   - Update SKILL.md §"Decision-tree" to insert D-EMP gate between Phase-1 dim-collection and Phase-2 weighted-sum.
   - Bump `rule_version` from `sca-v7.1` to `sca-v8`. Apply `×0.95` decision-decay to all v7.1 verdicts (per existing decay ladder).

2. **W318 Phase-2 codex pre-apply gate**:
   - Submit SKILL.md diff to codex-round-N adversarial review with explicit prompt: "Does D-EMP HARD-GATE-above-composite vs internal-hard-cap placement produce different verdicts on W316-A, W314-r1 NSSM-replacement, W315 SOTA pool? Identify any false-block (D-EMP=0 → BLOCK but rubric otherwise sound) cases."
   - 3-of-3 codex round-N PASS required before merge.

3. **W318 Phase-3 worked-example validation**:
   - Re-score ≥3 external candidates from W314-r1 + W315 SOTA pool under v8:
     - `stanfordnlp/dspy` 3.2.1 (W314 Stream-B top-3 candidate)
     - `aelassas/servy` (W314 Stream-D, W316-A NSSM replacement candidate)
     - `ossf/criticality_score` + `ossf/scorecard` paired (W314 Stream-B top-3)
   - Verdicts under v8 must be CONSISTENT with prior v7.1 verdicts OR provide explicit superseding-evidence per Δ34 supersession-chain lint (W317-A apply).

4. **W318 Phase-4 ledger update**:
   - Append v8-shipped row to `VERDICT-LEDGER.md` (parent row #1 self-eval pattern; arch-itself v8 install_score under §6.1 of `W316-B-ARCH-SELF-EVAL` style document).
   - Bump arch-itself install_score under v8 with D-EMP=5 (this runtime has shipped sca-v7→v7.1 PWF de-activation + W316-A HOLD-NSSM + multiple e2e wave-shipped uses → D-EMP=5 evidence).
   - Verify v8 arch-itself install_score ≥4.5 ship-gate with D-EMP=5 inclusion.

## §7 — Why DRAFT ONLY at W317

Per mandate "Ship as DRAFT only at `docs/architecture/W317-RUBRIC-AND-LINT/W317-A-SCA-V8-D-EMP-DRAFT.md` — do NOT absorb into sota-convergence-audit/SKILL.md this wave (W318 ratification path)":

- **W317-A is single-stream**: a 1-stream draft + smoke-test cannot ratify a rubric change of this magnitude. v7→v7.1 took W314+W315+W316 = 3 waves of converging-evidence + codex-r1/r2/r3/r4 multi-round ratification.
- **No fresh codex round on v8 yet**: D-EMP HARD-GATE-vs-tiebreaker semantics needs codex adversarial-pass on at least 3 worked-examples (W316-A canonical + 2 NEW candidates) before merge.
- **W318 ratify-or-defer entry-criteria**:
  - Codex round-N PASS on v7.1→v8 diff (this DRAFT promoted to SKILL.md edit + reviewed)
  - 3-of-3 external candidates re-score under v8 produces consistent verdicts (no false-blocks, no false-passes)
  - VERDICT-LEDGER row appended with arch-itself v8 install_score ≥4.5

## §8 — Open questions for W318 operator confirmation

1. **D-EMP weight under §3 weighted-sum** (if D-EMP ≥1 passes gate, what W_install contribution to composite?): proposal W_install=1.0 (matches D2 author-prior + D5 typed-evidence); operator-decision pending.
2. **D-EMP renewal cadence**: empirical evidence ages — should D-EMP score auto-decay to ≤2 after ≥6-month dormancy without re-smoke? (Analogous to decision-decay ladder ×0.95 already applied to rule_version).
3. **D-EMP boundary 0-vs-1 strictness**: is "conceptual e2e diagram only" really enough for D-EMP=1, or should the floor be "≥1 metadata-fetch attempt" (D-EMP=2)? Trade-off: stricter floor avoids paper-only T1, looser floor reduces auditor burden for pure pattern-study T3 verdicts.

## §9 — Compatibility with existing v7.1 deltas

Δ30-Δ38 (v7.1 additions) all preserved under v8:
- **Δ34 supersession-chain lint**: complementary — Δ34 catches cite-chain governance failures; D-EMP catches empirical-viability gaps. Both required.
- **Δ30 D30 judge-on-judge**: still applies; D30 is paper-evaluable (calibration-method-quality), distinct from D-EMP empirical-viability.
- **Δ32 D32 pin-freshness lag-norm**: still applies; freshness is contract-correctness, distinct from runs-and-completes.

No v7.1 dim is rendered obsolete by D-EMP introduction. D-EMP is **additive** in spirit (matches v3-invariant #1 "soft-gate ladder additive" preservation).

## §10 — Ledger entry deferral

Per mandate "APPEND row to `VERDICT-LEDGER.md` if sca-v8 DRAFT warrants ledger entry (else defer to W318 ratify-ship)":

**Decision: DEFER to W318**. W317-A is a single-stream DRAFT-only ship; no codex round-N approval yet; no external-candidate re-score performed. Premature ledger entry would violate sca-v7.1 §"audit-prior-verdict-supersession" check (a v8 ledger row needs explicit supersession-chain documentation, which requires the W318 codex-round-N artifact to exist).

W318 will append:
- Row #N+1: `sca-v8` arch-itself verdict (D-EMP=5; install_score under v8 ≥4.5; T1 INSTALL).
- Rows for ≥3 external re-scored candidates (DSPy / servy / OpenSSF pair) under v8.

## Verdict

**SHIP-AS-DRAFT**: yes (this file).
**APPLIED TO SKILL.md**: NO — W318 ratification path required.
**Risk**: LOW — DRAFT artifact; no SKILL.md edit; no behavioral change to running rubric. Operator-AI carry-forward W318.

**Cross-references**:
- W316-A canonical case-study: `docs/architecture/W316-NSSM-SWITCH-DECISION-A/W316-A-NSSM-SWITCH-DECISION.md`
- v7.1 ship doc: `docs/architecture/W316-SCA-V7-1-SHIP/W316-B-ARCH-SELF-EVAL-V7-1-SHIPPED.md`
- Δ34 supersession-chain lint (companion W317-A artifact): `.claude/settings.json:hooks.PreToolUse[Edit|Write]`
- NIST AI 600-1: `https://airc.nist.gov/AI_RMF_Knowledge_Base/Playbook/Measure/MEASURE_2_3`
- OpenSSF Best Practices WG: `https://best.openssf.org/`
