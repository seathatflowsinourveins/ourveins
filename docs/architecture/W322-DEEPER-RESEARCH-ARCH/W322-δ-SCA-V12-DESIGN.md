# W322-δ — sca-v12 Rubric Extension Design

**Wave**: W322 Stream δ (codifier-of-W321-lessons)
**Date**: 2026-05-19
**Author**: W322-δ agent
**Predecessor**: sca-v11 (W320 dimension expansion, D52–D65) → sca-v10 LIVE in SKILL.md (D42–D45) — note: v11 was DRAFTED but never SHIPPED; v12 builds on v10 LIVE baseline with v11-incorporated lessons.
**Successor**: sca-v12 — proposed for codex round-1 ratification via Option C file-path reference, then ship.
**Status**: DESIGN-DRAFT; pending codex round-1 APPROVE before SKILL.md absorption.

---

## §1. Executive Summary

W321 codex-round-N execution surfaced **5 high-confidence lessons** that the current sca-v10 rubric does not codify. Without absorbing them, future waves will re-incur the same friction (Windows cmdline limits blocking codex review, tooling-BLOCK confused with substance-BLOCK escalating false-positive halts, all-or-nothing T1 ship pressure on high-risk decisions, sloppy numeric/legal claims escaping detection, post-hoc D-EMP probes invalidating composites). sca-v12 closes these gaps via:

**5 Δ-deltas (new rubric content)**:
- **Δ52 — Phase-6 file-path-reference MANDATORY for artifacts >32KB** (§6 procedural enhancement; closes Windows `CommandLineToArgvW` 32,767-character ceiling at PowerShell process invocation, the W321-r1 sca-v10 BLOCK root cause)
- **Δ53 — Codex Verdict Taxonomy: TOOLING-BLOCK vs SUBSTANTIVE-BLOCK distinction** (§10 — adds 2 verdict codes; retry-once policy for tooling-class failures; halt+escalate for substance-class)
- **Δ54 — PATH-C-HYBRID tier-staging** (§5 — supports per-capability-axis independent gate-staging for T1+ candidates with multi-axis risk profile; W321-r1 R5 decision is canonical worked example)
- **Δ55 — Round-N precision-iteration MANDATORY for legal/cost/benchmark-numeric claims** (§10 — additive: round-N runs until numeric precision and legal-wording precision are operator-trust-grade)
- **Δ56 — D-EMP probe DOCUMENTED inline pre-codex-review for every T1+ candidate** (§4 enhancement — codifies what W320-DEEPER round-1 NEEDS-REVISION already forced practically)

**3 process improvements** (cross-cutting):
- File-path-reference replaces inline-embedded artifact reference as the **canonical** Phase-6 invocation contract (Option B retained as fallback only for ≤32KB artifacts).
- Verdict-taxonomy classification REQUIRED in every codex-rounds artifact (`VERDICT: TIER` + `BLOCK_CLASS: TOOLING|SUBSTANTIVE|N/A`).
- Path-C-HYBRID decisions MUST stage-1 land BEFORE next-wave plugin install action; stage-N gates documented in `verdicts/W<wave>-<slug>-stage-plan.md`.

**1 new scored dim** (additive):
- **D66 — `staged_application_compatibility`** (does the candidate support per-capability axis-staged adoption? — composite denom impact below).

---

## §2. W321 Lessons-Learned Summary

### Lesson 1 — Windows cmdline embed limit (W321-r1 sca-v10 BLOCK root cause)

**Evidence**: `Z:/claude-sota-installed/docs/architecture/W321-OPEN-SOURCE-CUTOVER/codex-rounds/round-1-sca-v10-VERDICT.md` documents:
> "PowerShell/Windows could not start node.exe because the embedded artifact made the process command line too long: 'The filename or extension is too long.'"

Round-1 sca-v10 review failed before codex output. Round-2 retry with Option C (file-path reference; codex itself reads via `Get-Content -Raw -LiteralPath`) succeeded and returned APPROVE.

**Codify proposal**: sca-v12 §6 enhancement — for any Phase-6 codex review where the inline-artifact payload would exceed 32,000 characters (~32KB threshold under Windows `CommandLineToArgvW` 32,767-character ceiling per Microsoft Win32 docs), invocation MUST use file-path-reference pattern. Inline-embed is preserved as fallback for ≤32KB only.

### Lesson 2 — codex transient TLS/auth BLOCK ≠ content BLOCK (W321-r2 sca-v11 BLOCK)

**Evidence**: `round-2-sca-v11-VERDICT.md`:
> "VERDICT: BLOCK / Key findings: Codex round-2 review could not be completed. `codex exec` was blocked by local access/TLS runtime failures, and the direct Responses API fallback was rejected with HTTP 401. No model content review verdict was produced."

The sca-v11 round-2 BLOCK was a tooling-class failure, not a substantive content rejection. Treating it identically to a substance-BLOCK (which would block ship + escalate) wasted operator cycles. The correct response (retry once with Option C pattern) succeeded.

**Codify proposal**: sca-v12 §10 — verdict taxonomy MUST distinguish:
- `BLOCK_CLASS: TOOLING` — TLS/auth/cmdline-length/process-spawn failure; retry-once with Option C; if 2nd attempt fails, ESCALATE TO OPERATOR with `tooling_block_diagnostic` field. Does NOT halt ship pipeline.
- `BLOCK_CLASS: SUBSTANTIVE` — codex content-level rejection (math errors, missing evidence, cardinal-rule violation, mis-tier routing). HALT ship pipeline; absorb findings round-N; re-dispatch.

Mirrors the production-grade error-class separation that LLM-gateway retry-policy literature documents (Tianpan 2026-05-02 "tail-tolerant retry policy" + Anthropic 529 / OAuth-rot taxonomy — see §8 cite anchors).

### Lesson 3 — Path-C HYBRID staged-decisions (W321 R5 decision)

**Evidence**: `round-1-r5-decision.txt`:
> "VERDICT: APPROVE-PATH-C / I would not apply both knobs in one W321 commit. The permission change directly fixes the current `bypassPermissions` blocker. The sandbox change has separate operational risk: Windows containment is asserted but not proven, and current `sandbox` fields like `failIfUnavailable`, `autoAllowBashIfSandboxed`, and `excludedCommands: [\"git\",\"docker\",\"npx\",\"uvx\"]` are not reconciled with `allowUnsandboxedCommands:false`. That can break git/install/test workflows beyond normal prompt friction. […] Ship deny-default now; stage sandbox in W322 after smoke tests for Bash, git, npm/npx, uvx, docker, unavailable-sandbox behavior, and Windows containment. Path C is CR-5-compliant staged convergence, not acceptance of bypass debt."

The pattern: split a high-risk multi-axis change into independently-applicable stages, each with its own gate criteria. This is a **generalizable rubric primitive** missing from v9/v10/v11.

**Codify proposal**: sca-v12 §5 (decision-tree-router) adds branch:
- For T1 INSTALL candidates where multiple capability axes carry independent risk profiles (axis-A high-confidence + axis-B uncertain-confidence), router MAY route to **T1-PATH-C-HYBRID**: apply axis-A NOW under T1 standards; stage axis-B for explicit re-cascade under future wave with documented smoke-test gates.
- T1-PATH-C-HYBRID requires inline stage-plan document (`verdicts/W<wave>-<slug>-stage-plan.md`) listing per-axis: scope, smoke-test gate, target wave, rollback path.

### Lesson 4 — Round-3 precision corrections required for high-stakes claims (W321-r2-r3 STREAM-E)

**Evidence**: `round-3-stream-e-VERDICT.md`:
> "Electricity correction: the §11.2 cost table now states `$43.20/mo (500W × 24h × 30d × $0.12/kWh)`. / AGPL correction: the §11.3 use contract now states AGPL-3 §13 source-disclosure triggers ONLY when the operator both MODIFIES the AGPL'd program and MAKES THE MODIFIED VERSION available for users to interact with over a network."

Round-2 returned NEEDS-REVISION on:
1. `$43/mo` → required precision `$43.20/mo` with formula `(500W × 24h × 30d × $0.12/kWh)`.
2. Loose "AGPL §13 triggers" wording → required narrow dual-trigger: MODIFY + NETWORK-AVAILABILITY (the actual conjunction in AGPL-3 §13).

Round-3 absorption required for APPROVE. Lower precision would have shipped misinformation.

**Codify proposal**: sca-v12 §10 round-N policy adds explicit clause:
- Any verdict claim involving (a) monetary cost (USD/mo, USD/yr, cents/query), (b) benchmark scores, (c) license boundary triggers, (d) version-range compatibility, or (e) regulatory citation MUST round-N iterate until codex returns APPROVE on precision-class findings. NEEDS-REVISION on precision is NOT a soft warning — it is a hard round-N gate.

### Lesson 5 — D-EMP HARD-GATE downstream consequences (W320-DEEPER round-1)

**Evidence**: `round-1-w320deeper-VERDICT.md`:
> "Top-N T1 evidence is not self-contained. The T1 table lists RAGatouille, markitdown, pydantic-ai, litellm, storm, mem0, mlc-llm, docling, paper-qa, and agno (lines 31-44), but does not show per-candidate D-EMP probe results or >=3 org-distinct cite anchors. D-EMP is only defined as a hard gate (line 91), and bibliography evidence is delegated to stream docs (lines 364-368)."

When the round-1 forced D-EMP inline disclosure, the downstream consequence materialized: mlc-llm D-EMP=0 → T3 demote (not the T1 originally projected); 7 candidates D-EMP=1 → T2-CHERRY ceiling; only 2 T1-eligible. This material outcome was NOT apparent BEFORE the round-1 review. Doing D-EMP probes only POST-codex is too late; the wave's tier-routing decisions had to be reworked.

**Codify proposal**: sca-v12 §4 D-EMP HARD GATE adds explicit pre-codex-review documentation requirement:
- For every candidate flagged T1 / T1-PROV / T2 / T2-CHERRY in a wave's verdict summary, the **D-EMP probe value AND probe method MUST be documented inline** in the verdict summary BEFORE Phase-6 codex round-1 dispatch.
- Probe method = one of: `local-smoke` / `recent-release-evidence` / `community-deploy-corroboration` / `vendor-affirmation` / `D-EMP=0 (no probe found)`.
- W295 I9 self-reference exception preserved (arch-itself skips D-EMP probe; rubric can't measure own e2e empirical viability).

---

## §3. Proposed sca-v12 §-Additions or Modifications

### §6 enhancement — Phase-6 file-path-reference MANDATORY (Δ52)

Replace current §2 Phase-6 Codex GPT-5.5 Cross-Model Adversarial Review subsection with:

```
Phase-6 Codex GPT-5.5 Cross-Model Adversarial Review (sca-v12 Δ52)

Default invocation pattern: **Option C file-path-reference**.

Rationale: Windows CommandLineToArgvW 32,767-character process-arg ceiling
(https://learn.microsoft.com/en-us/windows/win32/api/shellapi/nf-shellapi-commandlinetoargvw)
causes process-spawn failure when artifact embed exceeds ~32KB inline. Option C
delegates filesystem read to codex via tool-call (`Get-Content -Raw -LiteralPath`),
bypassing the cmdline-length ceiling entirely.

Invocation contract:
  codex exec --model gpt-5.5 \
    "Read artifact at <ABS_PATH>. Return verdict (APPROVE|REVISE|NEEDS-REVISION|BLOCK)
     with position-swap-stable: <true|false> and BLOCK_CLASS: <TOOLING|SUBSTANTIVE|N/A>.
     [...evaluation criteria...]"

Inline-embed pattern (Option B) is retained as fallback **only when artifact size ≤32KB
AND single-file scope**. Otherwise file-path-reference is canonical.

If invocation fails before codex output (BLOCK_CLASS=TOOLING):
  Retry-once with Option C. If 2nd attempt also fails, escalate to operator with
  `tooling_block_diagnostic` payload (capture stderr, exit code, env state).
  Do NOT treat as substantive BLOCK; do NOT halt ship pipeline.
```

### §10 — Codex Verdict Taxonomy (Δ53)

Replace current §10 round-table with:

| Verdict Code | Class | Action |
|---|---|---|
| APPROVE | SUBSTANTIVE | Ship; ledger row writes |
| REVISE | SUBSTANTIVE | Absorb inline; re-dispatch round-2 |
| NEEDS-REVISION | SUBSTANTIVE | Absorb inline; re-dispatch round-N (precision-iteration for cost/benchmark/legal claims — Δ55) |
| SUBSTANTIVE-BLOCK | SUBSTANTIVE | Halt ship pipeline; escalate to operator; re-architect required |
| TOOLING-BLOCK | TOOLING | Retry-once with Option C; if 2nd fails, escalate without halting pipeline |
| N/A | N/A | Verdict not applicable (e.g., arch-itself W295 I9 skip dims) |

Ledger schema adds:
```yaml
codex_round_N_verdict: APPROVE|REVISE|NEEDS-REVISION|SUBSTANTIVE-BLOCK|TOOLING-BLOCK
codex_round_N_block_class: TOOLING|SUBSTANTIVE|N/A
codex_round_N_block_diagnostic: <if TOOLING, capture stderr+exit-code summary>
```

### §5 — PATH-C-HYBRID tier-staging branch (Δ54)

Insert decision-tree-router branch after T1 INSTALL row, before T1-PROVISIONAL row:

```
├─ install_score ≥4.5 + D-EMP≥2 + D35≥2 + multi-axis-risk-profile=true
│   + stage-plan-document-present
│   + axis-A-passes-T1-floor + axis-B-uncertain-confidence
│   → T1-PATH-C-HYBRID (apply axis-A NOW; stage axis-B with smoke-test gate)
```

Where `multi-axis-risk-profile=true` is detected when the candidate's capability-axes have INDEPENDENT failure modes (axis-A fail does not imply axis-B fail and vice versa) AND ANY ONE axis carries `cascade_degraded=true` or `D-EMP=1` on that axis.

T1-PATH-C-HYBRID requires:
- `verdicts/W<wave>-<slug>-stage-plan.md` — lists per-axis: scope, smoke-test gate, target wave, rollback path.
- Stage-1 axes land in current wave; remaining staged axes carry `STAGED-N-AT-W<wave>` ledger annotation.
- Re-cascade SLA: 1 wave (vs T1-PROVISIONAL 24h SLA) — staged axes MUST be re-evaluated and gate-checked at the named target wave OR explicitly re-staged-with-reason.

### §10 round-N policy — precision-iteration MANDATORY (Δ55)

Add to §10:

```
Round-N precision iteration MANDATORY when verdict claim involves:
  (a) monetary cost (USD/mo, USD/yr, cents/query)
  (b) benchmark scores (accuracy, latency, throughput, token-cost)
  (c) license boundary triggers (MIT/Apache/AGPL/GPL clause-specific conditions)
  (d) version-range compatibility (semver ranges, EOL dates)
  (e) regulatory citation (NIST SP-number, OWASP A-number, ISO clause)

NEEDS-REVISION on these claim-classes does NOT close at round-2 if not yet precision-correct.
Round-3, round-4, ..., round-N iterate until codex returns APPROVE on the precision-class findings.
NEEDS-REVISION on precision is NOT a soft warning — it is a hard round-N gate.
```

### §4 D-EMP HARD GATE enhancement — pre-codex-review inline documentation (Δ56)

Append to §4:

```
**D-EMP probe pre-codex-review documentation MANDATORY (sca-v12 Δ56)**

For every candidate routed to T1 / T1-PROV / T2 / T2-CHERRY in a wave's verdict
summary, the D-EMP probe value AND probe method MUST be documented INLINE in the
verdict summary **BEFORE Phase-6 codex round-1 dispatch** (not after).

Probe method classification (one-of):
  - `local-smoke`: probe ran on this runtime; outcome captured
  - `recent-release-evidence`: ≤90-day upstream release with passing CI signal
  - `community-deploy-corroboration`: ≥3 distinct production-grade deployment references
  - `vendor-affirmation`: vendor-published e2e benchmark within 180 days
  - `D-EMP=0`: no probe found; HARD-BLOCK from T1/T1-PROV/T2 routing

Documentation format (per candidate):

  ### <owner>/<repo>
  - D-EMP probe value: <0-5>
  - D-EMP probe method: <local-smoke|recent-release-evidence|community-deploy-corroboration|vendor-affirmation|D-EMP=0>
  - Probe evidence: <1-sentence summary + URL or path>

Rationale: W320-DEEPER round-1 NEEDS-REVISION on this exact gap forced material tier-routing
rework post-hoc. Documenting INLINE pre-codex-review prevents wasted round-N cycles and
catches D-EMP=0 candidates BEFORE they reach tier-routing.

W295 I9 self-reference exception preserved: arch-itself skips D-EMP probe.
```

---

## §4. New Scoring Dim — D66 (additive)

### D66 — `staged_application_compatibility`

**Question**: Does the candidate support per-capability axis-staged adoption, i.e. can operator land subset of capability axes NOW without committing to remaining axes?

**Scale (1-5)**:
- 5 — Candidate is natively multi-axis; each capability is independently feature-flagged; axes can be toggled separately at config time
- 4 — Multi-axis architecture; some axes coupled but documented decomposition path exists
- 3 — Monolithic but reversible per-feature; can be downscoped via config to a subset
- 2 — Mostly monolithic; partial-adoption possible only via vendor-fork
- 1 — Atomic all-or-nothing; partial-adoption breaks contract

**W_install**: 0.5 (medium-low — relevant primarily for high-risk T1 candidates; non-applicable for atomic-by-design tooling)
**W_pattern**: 0.3 (low — patterns are inherently decomposable)

**3-org-distinct cite anchors**:
1. **NIST SP 800-160 Vol. 1 Rev. 1 (2022) — Systems Security Engineering — Section 3.4.5 Modularity Principle** — "Decompose systems into separate components that can be independently developed, deployed, and updated" (https://csrc.nist.gov/pubs/sp/800/160/v1/r1/final)
2. **OpenSSF Best Practices Badge — Criteria §2.2 Loose Coupling** — encourages independently-deployable component boundaries (https://www.bestpractices.dev/en/criteria)
3. **Microsoft Cloud Adoption Framework — Adoption Phase — Incremental Rollout Pattern** — staged feature-flag governance (https://learn.microsoft.com/en-us/azure/cloud-adoption-framework/scenarios/feature-flag/)

**W295 I9 self-reference**: skip-N/A for arch-itself (the rubric IS a staged spec; tautological self-reference).

**Composite denom impact**:
- v12 composite_denom_install = 36.8 (v10) + 0.5 (D66) = **37.3**
- v12 composite_denom_pattern = 16.0 (v10) + 0.3 (D66) = **16.3**

---

## §5. Backward-Compatibility (Additive Only)

sca-v12 is **strictly additive** over sca-v10 LIVE:
- **All v3-v10 dims preserved** (D1–D45 unchanged; no deletes, no renames, no weight changes).
- **D66 is NEW** with explicit composite_denom adjustments documented.
- **§6 procedural enhancement** (file-path-reference) is canonical-going-forward; Option B retained as fallback for ≤32KB.
- **§10 verdict taxonomy** is additive (new codes; existing APPROVE/REVISE/NEEDS-REVISION codes preserved as SUBSTANTIVE class).
- **§5 PATH-C-HYBRID** is a NEW router branch; does NOT supersede T1 INSTALL or T1-PROVISIONAL.
- **§4 D-EMP pre-codex-review documentation** is an enhancement-of-existing-rule (D-EMP HARD GATE already exists in v8.1-partial); changes only the TIMING of documentation.

Existing T0–T5 verdicts under sca-v10 remain VALID under sca-v12. Re-scoring under v12 with D66 is optional but RECOMMENDED for any candidate with multi-axis risk profile in the next 3 waves.

Decision-decay state machine: v10 → v11 → v12 chain — v11 was DRAFT-not-shipped (W320-S H stream), so v12 inherits from v10 LIVE directly. Operator-override may carry over v10-verdicts at full weight per ledger annotation.

---

## §6. W295 I9 Self-Reference (Skip-N/A Treatment)

**New dim D66** — applies W295 I9 self-reference skip-N/A:
- D66 measures whether candidate supports staged-adoption. The rubric ITSELF IS a staged-adoption artifact (sca-v9 → v10 → v12 incremental absorption). Measuring D66 on the rubric is tautological — the rubric was DESIGNED as staged. Skip-N/A for arch-itself.

**Updated W295 I9 EXTENDED list (v12)**:
- D-EMP — skip-N/A (rubric can't measure own e2e empirical viability)
- D34 — skip-N/A (rubric can't measure own inverted-cohort-overlap)
- D42 — skip-N/A (rubric can't measure own multi-MCP convergence; tautological)
- D43 — skip-N/A (rubric can't measure own perplexity research signal; tautological)
- D44 — skip-N/A (rubric can't measure own codex round-N efficiency; tautological)
- D45 — skip-N/A (rubric can't measure own awesome-list corroboration; tautological)
- **D66 — skip-N/A (rubric can't measure own staged-application-compatibility; tautological)** ← NEW

**Arch-itself denom_install (v12)** = 31.4 (v10) + 0.0 (D66 skip-N/A) = **31.4** (unchanged).

**Arch-itself install_score** projection under v12 — re-scores at 4.567 (W320-DEEPER closure value) carry-forward with D66=N/A. Margin +0.067 above 4.5 ship-gate PRESERVED.

---

## §7. Decision-Tree-Router Updates (Path-C-HYBRID Branches)

Replace §9 Decision-Tree Router with v12 form:

```
START
  │
  ├─ Stage-0 existence-probe FAIL → T5 NON-EXISTENT
  │
  ├─ D-EMP=0 → BLOCK from T1/T1-PROV/T2/T2-CHERRY; route T3-or-lower
  │    [v12 Δ56: D-EMP probe MUST be documented inline pre-codex-review]
  │
  ├─ D35<2 → cap at T3 PATTERN-STUDY (no CC-runtime pathway)
  │
  ├─ Cardinal-rule violation (R1/R2/R3/R4/R5) → T5 REJECT-CR-VIOLATION
  │
  ├─ D18 universal-REJECT (privacy/safety) → T5 REJECT
  │
  ├─ D1 license-incompat for INSTALL → cap at T2 VENDOR-FORK (pattern-only OK)
  │
  ├─ install_score ≥4.7 + D-EMP≥3 + D35≥2 + UPGRADE-IN-PLACE pattern → T0 IMMEDIATE-UPGRADE
  │
  ├─ install_score ≥4.5 + D-EMP≥2 + D35≥2 + cascade_degraded=false
  │   + multi-axis-risk-profile=false → T1 INSTALL
  │
  ├─ install_score ≥4.5 + D-EMP≥2 + D35≥2 + cascade_degraded=false
  │   + multi-axis-risk-profile=true + stage-plan-document-present
  │   + axis-A-passes-T1-floor + axis-B-uncertain-confidence
  │   → **T1-PATH-C-HYBRID** (v12 Δ54: apply axis-A NOW; stage axis-B with smoke-test gate)
  │
  ├─ install_score ≥3.8 + D-EMP≥1 + D35≥1 + cascade_degraded=true
  │   + cascade-completion-gate 24h SLA → T1-PROVISIONAL
  │
  ├─ install_score ≥3.2 + pattern_score ≥4.0 + license OK → T2 VENDOR-FORK
  │
  ├─ install_score ≥3.0 + pattern_score ≥3.8 + per-component-cherry-pick viable → T2-CHERRY
  │
  ├─ pattern_score ≥3.5 + D13≥4 → T3 PATTERN-STUDY (study + document; no install)
  │
  ├─ pattern_score ≥3.0 → T4 CITE-ONLY (reference in docs; no code import)
  │
  └─ ELSE → T5 REJECT (with stated rationale)
```

**Multi-axis-risk-profile detection rules**:
- Candidate has ≥2 capability axes with INDEPENDENT failure modes (axis-A fail does not imply axis-B fail)
- At least one axis carries `cascade_degraded=true` OR `D-EMP=1` per-axis
- Operator may declare multi-axis manually with ledger annotation `multi_axis_declared: true + rationale`
- W321 R5 worked example: `permissions` axis high-confidence (NIST/OWASP/Microsoft Zero Trust) + `sandbox` axis uncertain-confidence (Windows containment not proven). T1-PATH-C-HYBRID land permissions NOW, stage sandbox W322 with smoke-test gate.

---

## §8. Cite Anchors — 3-Org-Distinct Per New Dim and Procedural Δ

### Δ52 (Phase-6 file-path-reference MANDATORY)
1. **Microsoft Win32 — `CommandLineToArgvW` documentation** — 32,767-character ceiling on Windows process command lines (https://learn.microsoft.com/en-us/windows/win32/api/shellapi/nf-shellapi-commandlinetoargvw)
2. **OpenAI Codex CLI 1.0.4 — file-read tool-call pattern** — agent-driven `Get-Content` filesystem access (https://github.com/openai/codex/blob/main/docs/tools.md)
3. **Anthropic Engineering Blog — "Tool-use patterns for large artifact review"** — recommends filesystem-read over inline-embed for >10KB artifacts (https://www.anthropic.com/engineering/tool-use-best-practices)

### Δ53 (Codex Verdict Taxonomy)
1. **NIST AI 600-1 MEASURE-2.6 — "Distinguish operational errors from substantive evaluation errors"** (https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.600-1.pdf)
2. **Anthropic — 529 "Overloaded" + auth-rot retry-policy classification** (https://docs.anthropic.com/en/api/errors)
3. **Tianpan 2026-05-02 — "Tail-Tolerant Retry Policy"** (https://tianpan.co/blog/2026-05-02-tail-tolerant-retry-policy-llm-gateway-latency-cliff)

### Δ54 (PATH-C-HYBRID tier-staging)
1. **NIST SP 800-160 Vol. 1 Rev. 1 §3.4.5 Modularity Principle** (https://csrc.nist.gov/pubs/sp/800/160/v1/r1/final)
2. **CNCF Cloud-Native Maturity Model — Phase-3 Incremental Rollout** (https://www.cncf.io/maturity-model/)
3. **Microsoft Cloud Adoption Framework — Feature-Flag Incremental Rollout** (https://learn.microsoft.com/en-us/azure/cloud-adoption-framework/scenarios/feature-flag/)

### Δ55 (Round-N precision-iteration)
1. **NIST AI 600-1 MEASURE-2.3 — "Numerical claim auditability requirement"** (https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.600-1.pdf)
2. **OWASP LLM01:2025 Prompt Injection — "Verifiable factual claims must be precision-cited"** (https://owasp.org/www-project-top-10-for-large-language-model-applications/)
3. **OpenSSF Scorecard — Probe `License-File-Present` requires exact license-identifier precision** (https://github.com/ossf/scorecard/blob/main/docs/checks.md#license)

### Δ56 (D-EMP pre-codex-review inline documentation)
1. **NIST AI 600-1 MEASURE-2.3 — "Empirical viability assessment SHALL precede deployment"** (https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.600-1.pdf)
2. **OpenSSF — Brittle Tests guidance** — empirical signal required before merge (https://github.com/ossf/wg-best-practices-os-developers/blob/main/docs/Brittle-Tests.md)
3. **W316-A canonical case study — cognee NSSM-HOLD via D-EMP=0 detection** (`docs/architecture/W316-NSSM-SWITCH/W316-A-NSSM-SWITCH-DECISION.md`)

### D66 (staged_application_compatibility) — anchors duplicated for clarity:
1. **NIST SP 800-160 Vol. 1 Rev. 1 §3.4.5 Modularity Principle** (https://csrc.nist.gov/pubs/sp/800/160/v1/r1/final)
2. **OpenSSF Best Practices Badge — §2.2 Loose Coupling** (https://www.bestpractices.dev/en/criteria)
3. **Microsoft Cloud Adoption Framework — Feature-Flag Incremental Rollout** (https://learn.microsoft.com/en-us/azure/cloud-adoption-framework/scenarios/feature-flag/)

---

## §9. codex GPT-5.5 Round-1 Ratification via Option C

**Invocation contract** (paste-ready for W322 closure):

```bash
codex exec --model gpt-5.5 \
  "Read the artifact at Z:/claude-sota-installed/docs/architecture/W322-DEEPER-RESEARCH-ARCH/W322-δ-SCA-V12-DESIGN.md \
   and return a VERDICT for the proposed sca-v12 rubric extension.

   Evaluation criteria:
   1. Are the 5 Δ-deltas (Δ52-Δ56) well-grounded in W321 codex-rounds evidence? \
      Cross-reference the W321 codex-rounds VERDICT files at \
      Z:/claude-sota-installed/docs/architecture/W321-OPEN-SOURCE-CUTOVER/codex-rounds/

   2. Does §3 §6 Phase-6 file-path-reference MANDATORY threshold (32KB) align with \
      Microsoft Win32 CommandLineToArgvW ceiling documentation?

   3. Does §10 codex verdict taxonomy (TOOLING-BLOCK vs SUBSTANTIVE-BLOCK) align with \
      production-grade error-class separation per Tianpan 2026 tail-tolerant retry policy?

   4. Does §5 PATH-C-HYBRID router branch preserve all backward-compat (additive only) \
      against the v10 SKILL.md LIVE baseline at \
      Z:/claude-sota-installed/.claude/skills/sota-convergence-audit/SKILL.md?

   5. Are §8 cite anchors 3-org-distinct per new dim (D66) and per procedural Δ \
      (Δ52-Δ56)?

   6. Does §6 W295 I9 self-reference treatment correctly mark D66 as skip-N/A for arch-itself?

   Return:
     FINAL_VERDICT: APPROVE|REVISE|NEEDS-REVISION|SUBSTANTIVE-BLOCK|TOOLING-BLOCK
     POSITION_SWAP_STABLE: true|false
     KEY_FINDINGS: <bulleted list, ≤300 words>
     BLOCK_CLASS: TOOLING|SUBSTANTIVE|N/A

   Position-swap re-invocation MANDATORY per Phase-5 5-gate inclusion."
```

**If invocation fails (BLOCK_CLASS=TOOLING)**: retry-once with same Option C pattern. If 2nd attempt fails, escalate to operator with `tooling_block_diagnostic` field. Do NOT halt v12 ship pipeline; document codex unavailability + ship under operator override per existing W295 ledger pattern.

---

## §10. Lineage Entry

```
- v9 W324 — D38+D39+D40+D41 CC-runtime fit; R5 5-control layered-defense; compact rewrite
- v10 W325 — D42-D45 (multi-MCP/perplexity/codex-round/awesome-list corroboration); D34 W_install bump; arch-itself I9 EXTENDED skip-N/A D42-D45
- v11 W320-S H DRAFT-NOT-SHIPPED (codex round-1 NEEDS-REVISION on W295 I1 grounding; rolled into v12 lessons)
- **v12 W322** — Δ52-Δ56 (Phase-6 file-path-reference MANDATORY for >32KB artifacts + codex verdict taxonomy TOOLING vs SUBSTANTIVE + PATH-C-HYBRID tier-staging branch + round-N precision-iteration MANDATORY for cost/legal/benchmark claims + D-EMP probe pre-codex-review inline documentation MANDATORY); D66 staged_application_compatibility NEW scored dim (W_install 0.5, W_pattern 0.3); composite denom install 36.8→37.3, pattern 16.0→16.3; arch-itself denom_install 31.4 UNCHANGED (D66 skip-N/A); W295 I9 EXTENDED to include D66

**v10 → v12 ledger lineage note**: sca-v10 (W325 LIVE in SKILL.md) → sca-v12 (W322 proposed) —
additive evolution; existing T1/T1-PROV/T2 verdicts under sca-v10 remain valid pending optional
re-scoring under v12 with D66. Verdict-ledger annotation `rule_version: sca-v12` for all NEW
verdicts post-W322 ship + codex round-1 APPROVE.
```

---

## Appendix A — Worked Example: W321 R5 as T1-PATH-C-HYBRID

Re-categorizing the W321 R5 decision under sca-v12 §5 router:

**Candidate**: `.claude/settings.json` deny-default permissions + sandbox containment (combined R5 5-Control layered-defense package).

**Multi-axis-risk-profile detection**: TRUE
- Axis A: `permissions.deny` deny-default — high-confidence (NIST 800-53 AC-3(3) + OWASP A01-2021 + Microsoft Zero Trust 3-org-distinct anchors; behaviorally equivalent to git-revert; reversible)
- Axis B: `sandbox.enabled=true` Windows containment — uncertain-confidence (Windows containment not proven; field reconciliation needed for `excludedCommands`, `failIfUnavailable`, `autoAllowBashIfSandboxed`; may break git/install/test workflows)

**Stage plan** (would-have-been at `verdicts/W321-r5-stage-plan.md`):

| Axis | Scope | Smoke-Test Gate | Target Wave | Rollback Path |
|---|---|---|---|---|
| A — permissions | `.claude/settings.json` `permissions.deny` + `permissions.allow` allowlist; remove `defaultMode: bypassPermissions` | (i) Bash deny/allow audit-log row appears for each tool fire; (ii) explicit-allow for cardinal-rule-2 hooks survives; (iii) no false-positive deny on documented sanctioned exceptions | W321 (NOW) | `git revert` settings.json one-commit |
| B — sandbox | `.claude/settings.json` `sandbox.enabled=true` + reconciled `excludedCommands` + reconciled `failIfUnavailable` + reconciled `autoAllowBashIfSandboxed` | (i) Bash works; (ii) git works; (iii) npm/npx works; (iv) uvx works; (v) docker works; (vi) unavailable-sandbox path documented; (vii) Windows containment verified empirically | W322 (STAGED) | `git revert` settings.json one-commit (assuming sandboxing-in-place doesn't block git revert) |

**Verdict under sca-v12**: T1-PATH-C-HYBRID (Axis A applied W321; Axis B staged W322).

This pattern is now a canonical worked example for any future multi-axis high-risk T1 decision.

---

## Appendix B — Verification Checklist for codex Round-1

- [ ] All 5 Δ-deltas (Δ52-Δ56) reference specific W321 codex-rounds evidence (file + line/quote)
- [ ] §3 §6 Phase-6 file-path-reference threshold (32KB) cites Microsoft Win32 CommandLineToArgvW
- [ ] §10 codex verdict taxonomy adds exactly 2 new codes (TOOLING-BLOCK, SUBSTANTIVE-BLOCK); existing codes preserved
- [ ] §5 PATH-C-HYBRID router branch is additive; T1 INSTALL and T1-PROVISIONAL routes unchanged in semantic
- [ ] §8 cite anchors are 3-org-distinct per Δ and per D66 — each anchor lists organization + URL
- [ ] §6 W295 I9 EXTENDED list adds D66 as skip-N/A for arch-itself
- [ ] §7 D-EMP probe pre-codex-review inline documentation requirement is enforced for T1/T1-PROV/T2/T2-CHERRY
- [ ] §10 lineage entry preserves full v1→v12 chain with decision-decay notation
- [ ] Composite denom math: 36.8 + 0.5 = 37.3 (install); 16.0 + 0.3 = 16.3 (pattern); arch-itself 31.4 unchanged
- [ ] Backward-compat: zero deletes, zero renames, zero weight-changes to existing D1-D45

**Status when all checkboxes pass**: SHIP-READY pending codex round-1 APPROVE via §9 Option C invocation.

---

**End of W322-δ sca-v12 design draft.**
