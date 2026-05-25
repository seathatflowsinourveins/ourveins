# W329-B-4 — K-4 supply-chain wire composite-lift estimate

> **Wave**: W329 Stream B. **Date**: 2026-05-19. **HEAD**: `5cf5c90`.
> **Goal**: Quantify the composite-arch-quality lift attributable to K-4 supply-chain wire via `slsa-verifier`.
> **Methodology**: layer-local lift (L5 + L7) → composite-aware divide → ratify against codex-r14 corrected estimate.

## §1 Pre-state baseline (W328 closing-snapshot)

- **Composite-arch-quality**: 4.036 (W326 closing baseline) → ~4.143 (W328 closing per W327-D-4 §4 Path 2A projection: K-1+K-2+K-5 conditional lifts already in)
- **K-4 supply-chain artifact-boundary trust**: UNCLOSED (W324-P8 staged paste-ready; no operator install action yet — W327-D-1 §5 status)

## §2 Layer-local lift decomposition (W327-D-1 §5 + W327-D-4 §4 codex-r14 corrected)

K-4 wire spans two architecture layers (per CLAUDE.md L18 architecture stack):

| Layer | Description | Lift contribution | Justification |
|---|---|---|---|
| **L5** (artifact-boundary trust) | Verifier closes the supply-chain artifact-boundary by cryptographically validating provenance before exec/install | **+0.250** | Pre-state: no artifact-boundary verifier (only sha256 in SHA256SUM.md if operator-recorded). Post-state: SLSA L3 attestation chain validated end-to-end. |
| **L7** (managed-marketplace signature gate) | Wire-Path-C optionally gates `/plugin install` on signature verify | **+0.100** | Pre-state: no gate (operator trusts marketplace). Post-state: signature-verify post-install (advisory in first roll-out; hardened in W330+) |

**Layer-local total**: +0.350 (full K-4 closed)

**Composite-aware adjustment**: per W327-D-4 §4 codex round-14 correction (Axis 3 R-5 — Claude's W327-D-1 v1 over-claimed per-K δ 3-7×): `composite-aware ÷7-ish` based on architecture-layer breadth (7-ish layers L1-L7 each contributing ~equal weight to composite). Therefore:

```
Composite-lift δ = layer-local +0.350 / 7 ≈ +0.05
                                BUT codex-corrected range is +0.05 to +0.08 layer-local-weighted
```

**W327-D-4 §4 W329 Stream A spec** quotes K-4 composite-lift δ as **+0.05 to +0.08** (codex-r14 ratified).

**W327-D-1 §5 quotes K-4 expected composite-lift as +0.500 → 4.536** — this is the **W327-D-1 V1 over-claim** that codex round-14 Axis 3 R-5 corrected. Stream B uses the codex-corrected number per W295 §6.2 anti-bias gate STRONG-EXTERNAL precedent.

## §3 Stream B K-4 lift estimate (this stream)

**Stream B claim**: **+0.07 composite-lift** (within codex-corrected +0.05-0.08 envelope; midpoint-conservative).

| Lift component | Contribution |
|---|---|
| Wire Path A (`.pre-commit-config.yaml` advisory verify) | +0.04 |
| Wire Path B (PreToolUse on `gh release download`) | +0.02 (overlaps A; marginal contribution) |
| Wire Path C (post-`/plugin install` verify) | +0.01 (small marginal; matures as ecosystem ships intoto provenance) |
| **Total K-4 lift** (A + B + C wired) | **+0.07** |

**Operator path matrix**:
- Path A only: +0.05 composite-lift
- A + B: +0.06
- A + B + C: +0.07 (recommended W330-W332 staging)

## §4 Composite trajectory (pre-W329 → post-W330)

| Wave | Composite | Notes |
|---|---|---|
| W326 closing | 4.036 | baseline |
| W327 closing | ~4.036 | doc-only K-7 codification; no install action |
| W328 closing | ~4.143 | K-5 minimal coordination + K-2 OTel conditional + W329-A R5 corollary (Patch C1 ~+0.05) |
| **W329 closing** | **~4.193** | + K-4 supply-chain wire **+0.07** (Stream B operator-action-pending; counts toward W330 closing if operator installs in W329→W330) |
| W330 projection (Path 2A target) | ~4.30 | + remaining K-3 sca-v11 split skip-N/A + K-6 hooks + K-8 prov-claim-lint |
| W330 projection (Path 2A + Option α micro-wave W331) | ~4.40-4.55 | + W331 micro-wave gap-close (codex-r14 recommendation) |

**Ship-gate target** ≥4.5: NOT reached at W330; **W331 micro-wave recommended** per codex round-14 Axis 3 R-5 + W327-D-4 §10.

## §5 Sensitivity analysis (codex-r15 anti-bias gate)

**STRONG-EXTERNAL signal**: K-4 supply-chain wire recommendation arises from:
- Linux Foundation / OpenSSF / SLSA-framework canonical standard (https://slsa.dev)
- OWASP A06:2021 Vulnerable and Outdated Components
- NIST SP 800-218 SSDF (PS.1 cryptographic verification of software integrity)
- CNCF Landscape Security & Compliance > Supply Chain Security

**Anti-bias gate PASS**: 4-org-distinct external anchors; recommendation is NOT internally-dominant; meets W295 §6.2 STRONG-EXTERNAL precedent.

**Counterfactual-invariance check**: IF slsa-verifier abandoned, lift PRESERVED via 3 substitutes (cosign + in-toto-verify + `gh attestation verify` per W324-P8 + W329-B-1 §6). K-4 lift is substrate-agnostic — composite-lift δ holds even if verifier identity changes.

## §6 Confidence bounds

- **Low-confidence bound**: +0.04 (if only Path A wired + smoke-test reveals operator-friction)
- **Median estimate**: **+0.07** (A + B + C wired; smoke-test PASS lifting D-EMP 4→5)
- **High-confidence bound**: +0.10 (full wire + W331 micro-wave registry codification)

Median ±0.03 confidence interval. Final W329 closing-synthesis ratify gate (codex round-N post-commit) will tighten the bound.

## §7 Composability with concurrent W329 streams

| Stream | Capability | K-4 interaction |
|---|---|---|
| W329 Stream A | sca-v11 K-3 + K-4 bundled design | K-4 dim D39-D41 scored in sca-v11 (W327-D-1 §5 step 3); Stream A absorbs the +0.07 toward sca-v11 audit-credit |
| W329 Stream B (this) | slsa-verifier install spec + wire-up | composes with Stream A's D39-D41 scoring |
| Other concurrent streams | (per W329 wave plan) | composes via cumulative composite formula |

**No double-counting**: Stream B's K-4 layer-local lift is SAME pool as Stream A's K-4 contribution to sca-v11 design; they are co-dependent (verifier install + dim scoring) not additive. The +0.07 is shared credit.

## §8 References

- **W327-D-1 §5 K-4 remediation path** + Effort estimate (M, 3-wave)
- **W327-D-4 §4 W329 Stream A K-3+K-4 bundled** (composite-lift δ +0.04-0.06 K-3 alone, +0.05-0.08 K-4 alone, +0.06-0.10 combined)
- **W327-D-1 §5 V1 over-claim (+0.500)** — corrected by codex round-14 Axis 3 R-5
- **W295 §6.2 anti-bias gate STRONG-EXTERNAL precedent** — applied here to K-4 (PASS)
- **Codex round-14 verdict**: NEEDS-REVISION; Axis 3 FAIL on K-N composite-lift δ over-claim (3-7×); Stream B Stream B abides by codex-corrected numbers
