# W329-C-3 — Anti-Bias Gate Application (W295 §6.2) on Codex Round-20

**Wave**: W329 Stream C — Anti-bias gate on retrieved codex round-20 findings
**Date**: 2026-05-19T20:53Z
**Status**: NULL-RUN — no codex round-20 findings to anti-bias-gate (task frozen)
**Reference**: see W329-C-1-ROUND-20-STATUS.md for retrieval-attempt log

---

## §1 Methodology

W295 §6.2 anti-bias inverse-test (per the canonical methodology already applied in W328-D-3): for each codex recommendation, classify EXTERNAL-DOMINANT vs INTERNAL-DOMINANT, apply inverse-test ("If the inverse claim were true, would the codex evidence still support it?"), and identify codex-ecosystem-bias (OpenAI-flavored vs Anthropic-canonical patterns).

This methodology is well-established. The only block to running it on round-20 is that round-20 produced NO findings to test.

---

## §2 What WOULD have been anti-bias-gated (placeholder for W330 round-22 graft)

When the W330 round-22 fresh-fire produces a verdict, the following 6 dimensions will be evaluated:

### Dim-A: Per-layer score anti-bias

For each layer L1-L7 where codex round-22 awards a score, classify:

| Classification | Definition | Action |
|---|---|---|
| EXTERNAL-DOMINANT | Score driven by Anthropic/OWASP/ISO/NIST/external source-anchored evidence | High trust; PASS |
| INTERNAL-DOMINANT | Score driven by codex's internal heuristics or OpenAI-canonical patterns | LOW trust; apply inverse-test |
| CODEX-OVER-CAUTIOUS | Codex assigns conservative score below Claude-side primary by ≥0.05 | PASS-WITH-OBSERVATION; conservative gain |
| CODEX-OVER-CREDIT | Codex assigns generous score above Claude-side anti-bias-cap by ≥0.05 | TRIGGER per-layer re-litigation; demand cite |
| INVERSE-FAIL | Inverse test refutes codex's own evidence (e.g. score depends on assumption that fails at the inverse) | DOWNGRADE codex score by 0.05-0.10 |

### Dim-B: Composite score anti-bias

If codex composite ≠ Claude-side 4.143 ± 0.05:
- Above 4.193: CODEX-OVER-CREDIT; demand layer-specific cites
- Below 4.093: CODEX-OVER-CAUTIOUS; accept as conservative bound
- Within 4.093-4.193: PASS

### Dim-C: SOTA-candidate anti-bias

For each codex-recommended SOTA candidate:
- Check cite-anchor URL is non-OpenAI-ecosystem (OpenAI Cookbook, OpenAI's own SDKs)
- Cross-reference Claude-side picks (openobserve, slsa-verifier, AEGIS) — convergence = STRONG; divergence = require source-deep-dive

### Dim-D: K-N concern coverage anti-bias

Existing K-1..K-8 concern set is Claude-side-derived from W326-D-2 codex round-13 deep audit. Round-22 may surface NEW K-9+, K-10+ concerns:
- NEW concerns get added to the queue
- Inverse-test: would these concerns be flagged under different runtime architecture? If YES → genuine architectural issue, INTERNAL-DOMINANT framing flagged
- Codex-ecosystem-bias check: does the concern reflect OpenAI patterns that don't translate to Anthropic-canonical CC architecture?

### Dim-E: Trajectory projection anti-bias

Round-22 will project W329 close, W330 close, W331 micro-wave necessity. Compare to Claude-side projections (4.20-4.30 / 4.39 / W331 needed):
- |Δ| > 0.07 per wave triggers projection-method re-litigation
- Direction of bias: codex tends OVER-cautious on projection (consistent with adversarial role); accept as conservative bound

### Dim-F: Highest-leverage remaining work anti-bias

Round-20 prompt asked for "SINGLE-HIGHEST-LIFT remaining work for W328-W330". Claude-side answer: K-2 OTel headers fix (+0.07 composite for 1-min operator action). Codex round-22 might suggest:
- AGREE (K-2) → strong convergence; PASS
- DIVERGE (e.g. K-4 or K-5) → require cite of why per-wave-hour lift is higher; apply inverse-test

---

## §3 Cross-round convergence check (W326 round-13 + W327 round-14 + frozen round-20)

Without round-20 output to test, this section compares Claude-side estimates against codex round-13 (W326-D-2 baseline) and round-14 (W327-D-3 anti-bias precedent) to validate the W328-D-3 estimate of 4.143.

### §3.1 Round-13 baseline (W326-D)

Codex round-13 produced the 4.036 baseline + 7 K-N concerns catalog. The composite formula (7-layer mean, each layer weight ≈ 1/7) is preserved through round-14 and Claude-side W328 recompute. **Convergence**: PASS.

### §3.2 Round-14 anti-bias precedent (W327-D-3)

Codex round-14 ratified 5/5 Claude-side recommendations PASS the anti-bias gate per W327-D-3 §1. The R-5 anti-overclaim discipline (don't credit telemetry-evidence-required lift without actual telemetry) was applied per round-14 R-5. Claude-side W328-D-3 §1.4 applied this discipline by capping L1 at +0.100 (not +0.150). **Convergence**: PASS.

### §3.3 Frozen round-20: contribution NIL

Round-20 should have produced:
- (a) Per-layer table (compare to Claude-side primary 29.152 sum / 4.165 composite)
- (b) Anti-bias-capped composite (compare to Claude-side anti-bias-capped 4.143)
- (c) Trajectory projection (compare to ~4.39 by W330)
- (d) Top SOTA candidate list (compare to C2/C6/C10 picks)

**Contribution to cross-round convergence: NIL**. This is the operator-visible cost of the round-20 freeze.

### §3.4 Mitigation: 2-of-3-round convergence

In the absence of round-20, the W328-D-3 anti-bias gate retroactively relies on 2-of-3-round convergence (round-13 + round-14 → 4.036 baseline + 5/5 recommendations PASS). This is BELOW the 3-of-N convergence threshold per W295 I1 3-org-distinct standards but ABOVE the 1-of-1 threshold. **Operator decision required** on whether to accept 2-of-3 as sufficient ratification of the 4.143 estimate.

**Claude-side recommendation**: ACCEPT 2-of-3 with the explicit caveat that W330 round-22 will close the gap. The 4.143 estimate is within the W327-D-4 v2 baseline range (4.106-4.166), so the lower bound is robust regardless of round-20.

---

## §4 Codex-ecosystem-bias check (preemptive)

Even though there is no round-20 output, the round-20 prompt itself was designed to minimize codex-ecosystem-bias:

| Prompt design choice | Bias mitigation |
|---|---|
| Q1: "Apply the W316-S5 7-layer Blueprint" | Anchors codex to the Claude-side methodology; prevents drift to OpenAI evaluation frameworks |
| Q2: "anti-bias inverse-test (W295 §6.2 methodology)" | Forces codex to apply Claude-side anti-bias gate to its own scoring |
| Q4: "Anthropic CC OTel exporter contract per code.claude.com/docs/en/monitoring-usage" | Anchors SOTA candidates to Anthropic-canonical observability path |
| "Cite-anchor every claim to a file path / SHA / URL" | Forces external grounding; reduces codex-internal-heuristic dominance |

When round-22 fires, the same prompt structure should be preserved (with the §4 narrowing per W329-C-1 §4 W330 follow-up).

---

## §5 NULL-RUN verdict

**Anti-bias gate verdict on round-20**: NULL-RUN (no findings to gate).

**Anti-bias gate verdict on Claude-side 4.143 estimate without round-20 ratification**: PASS-WITH-PARTIAL-CONVERGENCE.
- Methodology PASS (W295 §6.2 inverse-test applied correctly in W328-D-3)
- Cross-round convergence: 2-of-3 (round-13 + round-14 vs Claude-side W328-D-4)
- Operator-decision item: accept 2-of-3 OR require W330 round-22 graft before promoting 4.143 from estimate to ratified

**Action this stream**: Document the NULL-RUN. Forward to W330 round-22 graft. No composite re-eval delta this stream.

---

## §6 Carry-forward to W330

When W330 round-22 fires, apply this anti-bias gate methodology (§2 Dim-A through Dim-F). Specific actions:

- [ ] Compare codex per-layer table to Claude-side anti-bias-capped table (W328-D-3 §5)
- [ ] Compare codex composite to 4.143 ± 0.05
- [ ] Cross-reference codex SOTA candidates to Claude-side C2/C6/C10
- [ ] Surface any NEW K-9+ concerns
- [ ] Validate codex trajectory projection vs ~4.39 by W330
- [ ] Confirm or revise highest-leverage work-item (Claude-side: K-2 OTel headers fix)

---

## §7 Cite-anchor master

- W295 §6.2 anti-bias inverse-test methodology
- W328-D-3 anti-bias gate retrospective methodology (3 layer inverse-tests applied)
- W326-D-2 codex GPT-5.5 round-13 baseline (4.036 + 7 K-N)
- W327-D-3 codex round-14 5/5 recommendations PASS anti-bias
- W328-D-4 §5 trajectory chart (4.06 → 4.13 → ~4.20 → ~4.36 → ~4.43 → 4.52 W331)
- W329-C-1 §4 W330 round-22 narrowing strategy
- W316-S5 7-layer Blueprint composite formula
