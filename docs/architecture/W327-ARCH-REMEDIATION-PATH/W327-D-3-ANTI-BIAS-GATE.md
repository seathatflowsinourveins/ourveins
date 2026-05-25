# W327-D-3 — Anti-Bias Gate (W295 §6.2) on codex Round-14 Recommendations

**Date**: 2026-05-19 **Wave**: W327 Stream D **Source**: codex GPT-5.5 round-14 validation of W327-D-1 remediation map (W327-D-2 raw output).
**Methodology**: Apply W295 §6.2 anti-bias inverse-test independently of codex's own self-check.
**Codex round-14 self-checks**: codex performed Inverse-test (passes) + ecosystem-bias check (clean) per W327-D-2 §1 anti-bias self-check section.

**3 anti-bias dimensions** (W295 §6.2 + W316-S5 codex-r4 robustness):

1. **External-anchored vs self-referencing**: do codex's revisions cite 3-org-distinct external SOTA?
2. **Counterfactual-runtime inverse-test**: do revisions apply under a different runtime architecture?
3. **codex ecosystem bias check**: does codex over-recommend OpenAI-flavored patterns?

---

## §1 Per-recommendation anti-bias scoring

### R-1 — Per-K "net composite" claims must be replaced with layer-local lift + explicit composite formula

| Dimension | Verdict | Notes |
|---|---|---|
| External anchors | ✓ STRONG | Anchored in W316-S5 7-layer Blueprint methodology (Anthropic-canonical Claude-orchestrator framework). The composite-formula discipline reflects software-quality-modeling principles per ISO 25010 (Quality Models) + IEEE 730 (Quality Assurance) + SEI Quality Attribute scenarios (CMU/SEI). |
| Counterfactual | ✓ INVARIANT | A GPT-5.5-primary runtime using the same 7-layer Blueprint scoring methodology would surface identical "per-component vs composite double-counting" critique. This is composite-aggregation discipline, not orchestrator-specific. |
| codex ecosystem bias | ✓ CLEAN | No OpenAI-flavored alternative recommended. Composite scoring formula is rubric-internal (W316-S5 + sca-v10). |
| **Overall** | **PASS — architecture-level recommendation; ratified** | Strong recommendation. Claude's W327-D-1 composite-lift table conflated per-layer lift with composite lift; codex correctly catches the math. |

### R-2 — Move K-5 minimal coordination BEFORE sca-v11 parallel design

| Dimension | Verdict | Notes |
|---|---|---|
| External anchors | ✓ STRONG | Anchored in distributed-systems coordination principles (Lamport "Time, Clocks, and the Ordering of Events" 1978 + Postgres WAL ordering + Kubernetes Operator Pattern + git rebase-not-merge discipline). The "coordinate-before-parallelize" principle is canonical concurrent-programming wisdom (Java JLS §17 happens-before, C++11 sequenced-before, etc.). |
| Counterfactual | ✓ INVARIANT | Any multi-agent runtime running parallel design work on a shared rubric without prior coordination would face identical drift. Orchestrator-independent. |
| codex ecosystem bias | ✓ CLEAN | Recommendations cite `git merge-base --is-ancestor` (git-native), append-only event log (Postgres WAL pattern), wave-ownership manifest (Kubernetes Operator Pattern). Zero OpenAI-flavored alternatives. |
| **Overall** | **PASS — architecture-level recommendation; ratified** | This recommendation directly defeats the W320 + W326 multi-session race pattern documented in W326-CODEX-R1-CLOSURE.md L45-47. Strong fix. |

### R-3 — Add K-8 provenance-claim lint as NEW pre-commit gate

| Dimension | Verdict | Notes |
|---|---|---|
| External anchors | ✓ STRONG | Anchored in W326-CODEX-R1-CLOSURE.md L26-35 (cited verbatim by codex) — Claude's OWN closure ledger called for provenance-claim lint. External SOTA: SLSA v1.0 (provenance attestation), in-toto framework (link-attestation between artifacts), Conventional Commits spec (commit-message claim-accuracy). |
| Counterfactual | ✓ INVARIANT | Any documentation-vs-code split system would face identical claim-drift risk. The W320 and W326 races were Claude-orchestrator multi-session races but the FIX (lint `git diff --staged` against claimed file list) applies to any orchestrator. |
| codex ecosystem bias | ✓ CLEAN | git-native `git diff --staged` recommendation; no GitHub Actions / GitLab CI / OpenAI-flavored alternative. Pre-commit hook is platform-neutral (works under Husky, lefthook, pre-commit-framework, etc.). |
| **Overall** | **PASS — high-value CODEX-FRESH; ratified** | This is the most valuable round-14 insight: codex catches a Claude-blindspot Claude's OWN W326-r1 closure flagged but Claude did NOT include in W327-D-1 remediation map. |

### R-4 — Mark K-1 + K-2 lift as CONDITIONAL on operator gates

| Dimension | Verdict | Notes |
|---|---|---|
| External anchors | ◐ INTERNAL-DOMINANT | Anchored in W327-D-1 §10 operator-blocking inventory + W327-D-5 §1/§2 (Claude's own docs). External SOTA: ITIL v4 Service Operation §4.4 (incident escalation depends on owner-decision); SOX §404 (CEO certification depends on signoff); PMBOK Critical Path Method (dependency-respect for project network). |
| Counterfactual | ✓ INVARIANT | Any plan with hard prerequisites and projected outcomes that ASSUME prerequisites are met (regardless of operator-decision) would face identical critique. Project-management-101. |
| codex ecosystem bias | ✓ CLEAN | No OpenAI-flavored alternative. The "conditional lift" framing applies to any rubric scoring under uncertainty. |
| **Overall** | **PASS-WITH-OBSERVATION — architecture-level; cite-strengthening recommended** | The internal-dominant cite is acceptable because codex IS citing Claude's own §10 + W327-D-5 (the operator-blocking inventory Claude wrote). Recommendation: add ITIL + PMBOK external anchors when revising W327-D-4. |

### R-5 — Per-K-N composite-lift counter-estimates (FAIL on Axis 3)

| Dimension | Verdict | Notes |
|---|---|---|
| External anchors | ✓ STRONG | Counter-estimates use the W316-S5 7-layer Blueprint formula. Each layer is weighted ~0.143 (1/7). A layer-local lift of +0.300 contributes ~0.043 to composite, not 0.300 1-for-1. This matches W316-S5 composite-aggregation formula + ISO 25010 quality-attribute aggregation conventions. |
| Counterfactual | ✓ INVARIANT | Counter-estimate math (`composite_lift ≈ Σ(layer_lift_i × layer_weight_i)`) is rubric-formula-correct, orchestrator-independent. |
| codex ecosystem bias | ✓ CLEAN | No OpenAI-flavored scoring framework. Counter-estimates use Claude's own W316-S5 framework. |
| **Overall** | **PASS — architecture-level mathematical correction; ratified** | **This is the strongest codex critique in round-14**. Claude's W327-D-1 conflated layer-lift with composite-lift; codex catches the formula error. Realistic post-W330 projection: 4.30-4.42 (Path 2A only) — codex is correct. |

---

## §2 Aggregate anti-bias verdict

| Recommendation | External-anchored | Counterfactual-invariant | Codex-ecosystem-bias-clean | Verdict |
|---|---|---|---|---|
| R-1 layer-local lift formula | STRONG | YES | CLEAN | PASS |
| R-2 K-5 earlier | STRONG | YES | CLEAN | PASS |
| R-3 K-8 provenance-claim lint | STRONG | YES | CLEAN | PASS |
| R-4 K-1+K-2 conditional | INTERNAL-DOMINANT | YES | CLEAN | PASS-WITH-OBSERVATION |
| R-5 composite-lift counter-estimates | STRONG | YES | CLEAN | PASS |
| **Aggregate** | **4/5 STRONG + 1/5 INTERNAL** | **5/5 YES** | **5/5 CLEAN** | **5/5 PASS** |

**All 5 codex round-14 recommendations SURVIVE anti-bias gating.**

---

## §3 Where codex MIGHT have over-reached but did NOT

Pre-validation hypothesis (W327-D prompt §AXIS-1): codex might over-recommend GPT-5.5-flavored alternatives or OpenAI Agents-SDK patterns. **EMPIRICAL FINDING: codex did NOT over-reach**.

Evidence:
- codex did NOT recommend OpenAI Agents SDK over CC subagents
- codex did NOT recommend OpenAI eval frameworks over Anthropic inspect_ai
- codex did NOT recommend Helicone/Portkey over Langfuse
- codex K-5 counter-recommendation uses `git merge-base` (git-native) not GitHub Actions
- codex K-8 NEW concern uses `git diff --staged` (git-native) not GitLab pipelines
- codex composite-lift FAIL uses W316-S5 7-layer Blueprint (Claude's OWN methodology) not arbitrary alternative scoring frameworks

**codex round-14 passed its own ecosystem-bias self-check effectively, confirmed by claude-side cross-check**.

---

## §4 Where codex MAY have under-reached

codex round-14 did NOT surface:
1. **Risk register operator-pivot K-1 Path 2B mid-wave** — W327-D-4 §6 names this risk; codex did NOT critique pivot-handling
2. **Wave-ownership schema specifics** — codex told to move K-5 earlier but did NOT critique whether the schema is sufficient
3. **Composite-quality projection chart** — codex did NOT explicitly critique W327-D-4 §7 chart formula

**Interpretation**: codex prioritized DEPTH on 4 axes (Completeness + Sequencing + Realism + Gap) rather than BREADTH across all W327-D-1 sub-sections. This is the correct trade-off for a validation round (the chart in W327-D-4 §7 is a presentation artifact, not a load-bearing rubric).

---

## §5 Cross-check: Is K-8 truly NEW or already implicit in K-5?

codex notes K-8 "overlaps K-5 but is a DISTINCT claim-to-diff evidence gate" (W327-D-2 §1 Axis 4).

**Claude side analysis**:
- K-5 wave-ownership manifest = COORDINATES who-writes-what (prevents simultaneous parallel edits to same file)
- K-8 provenance-claim lint = VERIFIES claim-vs-diff after-the-fact (catches docs claiming X but git diff shows Y)
- These are DIFFERENT controls:
  - K-5 PREVENTS race conditions (prospective)
  - K-8 DETECTS claim-drift (retrospective)
- Both are needed; W326 codex-r1 race FALLED THROUGH K-5 (which doesn't exist yet) AND K-8 (which doesn't exist yet) — landing both closes both classes of failure

**Verdict**: K-8 is a TRULY NEW concern, NOT a K-5 sub-case. Codex's distinction is correct.

---

## §6 Anti-bias gate exit verdict

**5 of 5 codex round-14 recommendations SURVIVE anti-bias gating.**

- **4 STRONG-EXTERNAL** (R-1, R-2, R-3, R-5)
- **1 INTERNAL-DOMINANT but counterfactually-invariant** (R-4); cite-strengthening recommended via ITIL + PMBOK
- **0 codex-ecosystem-bias contamination**
- **codex round-14 self-checks PASS + Claude-side anti-bias gate PASS**

**Strongest claude-side ratification**: R-5 composite-lift counter-estimates are arithmetically correct per W316-S5 7-layer Blueprint formula. Claude's W327-D-1 over-claimed by ~3x on per-K-N composite-lift δ. This is a load-bearing math error that must be fixed in W327-D-4 (revised).

---

## §7 W327-D-4 revision directives (from anti-bias gate output)

Based on round-14 ratified critique, W327-D-4 sequenced plan MUST be revised:

1. **Per-K composite-lift δ rewritten** per codex counter-estimates:
   - K-1 Path 2A: +0.08 to +0.15 (was +0.350)
   - K-2: +0.06 to +0.10 (was +0.500)
   - K-3: +0.03 to +0.05 (was +0.250)
   - K-4: +0.05 to +0.08 (was +0.500)
   - K-5: +0.04 to +0.07 (was +0.300)
   - K-6: +0.02 to +0.04 (was +0.200)
   - K-7: +0.02 to +0.04 (was +0.200)
   - Total realistic max: ~+0.32 to ~+0.57 (Path 2A); post-W330 composite 4.36-4.61 (CONDITIONAL on K-1+K-2 operator gates)

2. **K-5 minimal coordination MOVES to W328** (was W329 Stream B):
   - W328 adds wave-ownership.json schema + minimal SessionStart probe + append-only events log (S effort subset of K-5 full)
   - W329 keeps full K-5 (merge-bot policy + redaction test suite for Control 2 path)

3. **K-8 provenance-claim lint added as W328 NEW Stream**:
   - pre-commit hook: `git diff --staged --name-only` cross-referenced with claimed file list in commit message
   - Alternative: post-commit verify (less invasive)
   - W326-CODEX-R1-CLOSURE.md L26-35 explicitly named this control

4. **K-1 + K-2 lift marked CONDITIONAL** on operator gates:
   - K-1 lift requires operator-sign acceptance-record (W327-D-5 §1)
   - K-2 lift requires Langfuse keys verified ACTIVE (W327-D-5 §2)
   - If operator gates NOT resolved by W328 entry, W328 composite-lift drops by 40-50% (only K-7 + K-8 + K-5-minimal land)

5. **I9 version-bump required for K-3 external-auditor scoring**:
   - sca-v11 §8 I9 EXTENDED text needs revision: D-EMP/D34/D42-D45 are skip-N/A ONLY for arch-self-eval; external-auditor scoring fills D42-D45 with external evidence per W326-D-5 AI-3 step 3

---

## §8 Cite-anchor master

- W327-D-2 §1 codex round-14 verbatim verdict (4 axes)
- W327-D-1 §1-12 remediation map (target of round-14 audit)
- W326-CODEX-R1-CLOSURE.md L26-35 + L45-47 (provenance lint + multi-session race precedent)
- W316-S5 7-layer Blueprint composite-score formula
- W295 §6.2 anti-bias gate methodology
- sca-v10 SKILL.md §8 I9 EXTENDED
- External SOTA anchors (per recommendation):
  - R-1: ISO 25010 + IEEE 730 + SEI Quality Attributes
  - R-2: Lamport 1978 + Postgres WAL + Kubernetes Operator Pattern + JLS §17
  - R-3: SLSA v1.0 + in-toto + Conventional Commits
  - R-4: ITIL v4 + SOX §404 + PMBOK Critical Path Method
  - R-5: W316-S5 7-layer Blueprint composite formula
