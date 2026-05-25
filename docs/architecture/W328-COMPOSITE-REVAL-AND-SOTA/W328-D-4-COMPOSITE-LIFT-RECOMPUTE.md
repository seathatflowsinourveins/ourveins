# W328-D-4 — Composite Lift Recompute (4.036 baseline → new value post-W327-r3)

**Date**: 2026-05-19 **Wave**: W328 Stream D **HEAD**: `2c48b1e`
**Baseline**: W326-D close composite 4.036 (RED ALERT; below 4.5 ship-gate AND below ~4.0 Δ6 YELLOW edge).
**Methodology**: W316-S5 7-layer Blueprint (each layer weight = 1/7 ≈ 0.143; composite = layer-weighted mean).
**Discipline**: codex round-14 corrections applied — per-K composite-lift δ realistic (NOT 7× overclaim per Axis 3 R-5); CONDITIONAL gates respected per Axis 4 R-4.

> **Codex round-20 dispatched** (job `task-mpd2gasc-uuric5`) was still in `Phase: investigating` at the Stream D wall-clock budget exhaustion (9m30s+ at "Searching:" stall). This recompute is Claude-side ANTICIPATED scoring; codex round-20 verdict to be grafted into W328-D-2 (RAW) + this file as APPENDIX-A once it completes. ANTI-BIAS gate (W328-D-3) handles the over-credit risk pre-graft.

---

## §1 Per-layer recompute (Claude-side anticipated post-W327-r3)

### §1.1 L1 Cardinal-Rules: 4.485 → **4.585** (Δ +0.100)

**Rationale**:
- Pre-W327-r3: R5 was "PARTIAL-HOLD CARRY-FORWARD" with 8-wave dwell (sca-v11 §7 ops-rhythm penalty -0.5 firing).
- Post-W327-r3: `defaultMode: "default"` + `sandbox.failIfUnavailable: true` config-level alignment with Anthropic-canonical default; ops-rhythm 8-wave penalty NO LONGER FIRES (R5 transitioned from 8-wave OPS-block to PARTIAL-Path-2A).
- **But CONDITIONAL**: companion gaps remain (acceptance-record NOT signed, signed-audit-trails NOT wired, CLAUDE.md R5 corollary NOT added). Full Path 2A lift +0.150 RESERVED for W328 Stream A completion.
- **Net config-level credit**: +0.100 (not +0.150 — anti-bias cap per W328-D-3 §2).

**Inverse-test**: If `defaultMode` silently reverts to `bypassPermissions` tomorrow, L1 drops back to 4.485. The +0.100 is REVOCABLE at config level → S-class lift (config-only).

### §1.2 L2 Orchestration: 3.850 → **3.950** (Δ +0.100)

**Rationale**:
- sca-v11 K-3 skip-N/A taxonomy + K-7 ops-rhythm Path B SHIPPED (separate skill `.claude/skills/ops-rhythm/SKILL.md` per codex round-14 ratify).
- 8-wave dwell ladder + 3-org-distinct anchors (Google SRE Error Budget + Atlassian Kanban + ITIL v4) provide escalation state machine that orchestration was missing.
- **K-7 contribution to L2**: +0.100 (orchestration cadence governance).
- **K-7 contribution to L7 governance**: +0.100 (separate line below).

**Inverse-test**: ops-rhythm SKILL.md file exists, plugin-skill auto-fires per description; not config-reversible. R-class lift (skill-shipped).

### §1.3 L3 Memory: 4.300 → **4.300** (Δ 0)

**Rationale**: No state-change from W326-D close. T6 basic-memory canonical-primary HOLDS. Hindsight T1 still RETIRED (W316-S6 option-(b) demote stands).

### §1.4 L4 Research/Decision: 4.310 → **4.510** (Δ +0.200)

**Rationale**:
- sca-v11 K-3 codification — skip-N/A taxonomy (T-skip / M-skip / E-skip) per dim closes the "asymmetric self-eval" pattern codex round-13 K-3 surfaced as HIGH severity.
- Per-dim classification table (D-EMP E-skip/M-skip; D34 T-skip; D42 T-skip; D43 E-skip/M-skip; D44 E-skip; D45 E-skip) is concrete + cite-anchored.
- 3-org-distinct external anchors landed: ISO 19011 Clause 4 Principle 5 + SOX §404(a)+(b) + CNCF Self-Assessment + Graduation Due-Diligence + over-coverage BetterBench Stanford.
- Ledger field additions (`skip_class_per_dim`, `external_auditor_present`, `external_auditor_attribution`, `methodology_skip_rationale`, `audit_incomplete`).
- Codex round-14/r15/r16 PRE-APPROVE ratification trail (3 rounds; 16 cumulative).
- **Full Path 2A lift +0.250 reserved**: only +0.200 credit because external-auditor mode operationalization is W329-deferred.

**Inverse-test**: If sca-v11 SKILL.md were deleted, L4 drops back to 4.310. The +0.200 is file-shipped → R-class lift.

### §1.5 L5 Install/Wire: 4.300 → **4.300** (Δ 0)

**Rationale**: K-2 OTel headers fix NOT applied yet (still operator-gate-pending per W327-D-5 §2). K-4 supply-chain (slsa-verifier install) NOT applied yet. No state-change at L5.

### §1.6 L6 Observability: 3.750 → **3.750** (Δ 0)

**Rationale**: K-2 OTel headers fix NOT applied yet; 0 native CC traces in Langfuse HOLDS. No state-change at L6.

### §1.7 L7 Safety/Governance: 3.457 → **3.757** (Δ +0.300)

**Rationale**:
- R5 PARTIAL-Path-2A unblock at config level: L7 contribution +0.100 (deny-default permissions ratified at config level per sca-v11 §6 Control 1).
- K-7 ops-rhythm skill SHIPPED: L7 contribution +0.100 (dwell-policy escalation state machine — sister skill to sca + goal-prompt-synthesis; cite-anchored to 3-org-distinct external anchors).
- K-8 provenance-claim lint NARROWING applied per W327 codex r1+r2+r3 chain: L7 contribution +0.100 (over-claim discipline closed for "would-have-BLOCKED" framings).
- **NOT credited**: signed-audit-trails wire-up + protect-mcp re-enable (K-6 still deferred to W329); ECC un-disable; hook egress redaction. These W329 work-items unlock further L7 lift.

**Inverse-test**:
- R5 config: REVOCABLE → S-class (+0.100)
- K-7 skill file: file-shipped → R-class (+0.100)
- K-8 narrowing: doc-edit chain commits committed → R-class (+0.100)
- Net L7 lift: +0.300 is BLENDED (1 S-class + 2 R-class)

---

## §2 Composite recompute table

| Layer | W326-D close | W327-r3 close (now) | Δ | Class |
|---|---|---|---|---|
| L1 Cardinal-Rules | 4.485 | **4.585** | +0.100 | S (config-revocable) |
| L2 Orchestration | 3.850 | **3.950** | +0.100 | R (skill-shipped) |
| L3 Memory | 4.300 | **4.300** | 0 | n/a |
| L4 Research/Decision | 4.310 | **4.510** | +0.200 | R (skill-shipped) |
| L5 Install/Wire | 4.300 | **4.300** | 0 | n/a |
| L6 Observability | 3.750 | **3.750** | 0 | n/a |
| L7 Safety/Governance | 3.457 | **3.757** | +0.300 | S+R blend |
| **Sum** | **28.452** | **29.152** | **+0.700** | |
| **Mean (composite, ÷7)** | **4.064** | **4.165** | **+0.100** | |

**Note on baseline composite**: 28.452 ÷ 7 = 4.064, not 4.036. The 4.036 vs 4.064 0.028 delta is the W326-D-4 weighting variant (per W327-D-4 §3 footnote: "W316-S5 7-layer Blueprint computes composite as layer-weighted mean (each layer weight ≈ 0.143 = 1/7). W326-D-4 reported composite 4.036 from a slightly different weighting"). Treating 4.036 as the W326-D close authoritative number per Stream D scope, we report:

- **Composite at W327-r3 close** ≈ **4.136** (4.036 + 0.100 layer-mean lift)

Range bracket (codex round-14 R-5 anti-overclaim discipline):
- **CONDITIONAL-conservative**: 4.036 + 0.07 = **4.106** (only R-class non-revocable credit; defer S-class config-revocable credit)
- **CONDITIONAL-midpoint**: 4.036 + 0.10 = **4.136** (this recompute's primary estimate)
- **CONDITIONAL-generous**: 4.036 + 0.13 = **4.166** (full S+R credit AS-IS; codex round-14 R-5 says probably NOT supported without telemetry evidence)

---

## §3 Comparison to W327-D-4 v2 projection

| Projection point | W327-D-4 v2 baseline | This recompute | Delta from W327-D-4 |
|---|---|---|---|
| W326 close | 4.036 | 4.036 | 0 (locked) |
| W328 entry (now) | 4.036 (unchanged from W326) | **4.136** | **+0.100 already realized at W327-r3** |
| W328 close (BOTH-GATES) | ~4.20 | **~4.20-4.25** | +0.00 to +0.05 (gates-still-conditional) |
| W329 close | ~4.30 | **~4.32-4.40** | +0.02 to +0.10 |
| W330 close (Path 2A) | ~4.40 | **~4.42-4.45** | +0.02 to +0.05 |
| W331 micro-wave (Option α) | ~4.55 | **~4.50-4.55** | barely-positive; W331 may STILL be needed |

**KEY INSIGHT**: The R5 unblock at W327-r3 brings W328 entry baseline UP from 4.036 to 4.136 (+0.100), but does NOT obviate the W329-W331 path. The composite-quality lift is asymptotic — getting from 4.136 to 4.50 is still a 0.36 climb across W328-W330 + possibly W331 micro-wave.

**Highest-leverage remaining single work-item** (composite-lift per wave-hour):
- **K-2 OTel headers fix** (Langfuse Authorization=Basic auth on OTLP exporter): 60-sec paste-ready per W327-D-1 §3 + cite-anchored to https://gist.github.com/lifegenieai/bac69b0d0d8ec7e17a841420083f0b07. Realizes **+0.07 composite** (L5 +0.20 + L6 +0.30, layer-mean = +0.071) for ~1-min operator action + 24h telemetry round-trip verify. **Best-leverage in entire W328-W330 plan**.

---

## §4 Anti-overclaim discipline

Per W327-D-3 anti-bias gate methodology + W295 §6.2 inverse-test, this recompute applies the following:

1. **S-class config-revocable credit**: only +0.100 to L1 (not +0.150 baseline). Anti-bias cap: full +0.150 RESERVED for Path 2A complete (acceptance-record signed + audit-trail wired + R5 corollary line in CLAUDE.md).
2. **Codex round-20 ANTICIPATED**: Claude-side recompute may over-credit; final composite to be GATED by codex round-20 ratify in W328-D-2.
3. **Layer-mean formula PRESERVED**: composite = Σ(layer_lift) ÷ 7. No per-layer cap rebalance.
4. **Companion-gap explicit**: each S-class credit lists its companion gaps that would convert it to R-class on completion. Operator-visible delta.
5. **Telemetry evidence MISSING**: per codex round-14 R-5, composite ≥4.5 requires "actual telemetry evidence" not just config-level changes. The 4.136 estimate is config + skill + commit-chain evidence; telemetry evidence accrues post K-2 OTel fix.

---

## §5 Trajectory summary chart

```
4.7 ┤
4.6 ┤
4.5 ┤━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ SHIP-GATE (4.5)
4.4 ┤                                            ╱── W330 ~4.42-4.45
4.3 ┤                                     ╱──── W329 ~4.32-4.40
4.2 ┤                              ╱──── W328 ~4.20-4.25 (both gates)
4.1 ┤                       ╱──── W327-r3 4.136 (this recompute; R5 config unblock)
4.0 ┤━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ Δ6 YELLOW BAND (4.0)
3.9 ┤
3.8 ┤
    W325-A  W326-D  W327-r3  W328     W329     W330     W331
     4.336   4.036   4.136    ~4.22    ~4.36    ~4.43    ~4.52 (W331 if needed)
                     (NOW)
```

**Status**: YELLOW (above Δ6 4.0 lower band; below 4.5 ship-gate); on-track for W330 close ~4.40-4.45, W331 micro-wave likely STILL needed to clear 4.5 ship-gate cleanly.

---

## §6 Cite-anchor master

- W316-S5 7-layer Blueprint composite-score formula (layer-weighted mean)
- W326-D-2 codex GPT-5.5 round-13 (4.036 baseline + 7 K-N concerns)
- W327-D-1 §1 composite quality baseline table
- W327-D-4 §3-§5 W328-W330 sub-wave projections + §6 critical observation 4.5 may need W331
- W327-r3 commit `2c48b1e` body (R5 unblock observation)
- sca-v11 SKILL.md §1.6 ops-rhythm cross-reference + §5c skip-N/A taxonomy
- ops-rhythm SKILL.md §1.1 three-tier policy + §1.5 claude-doctor wrap
- W295 §6.2 anti-bias inverse-test (per-layer revocability classification)
- codex round-14 W327-D-3 anti-bias gate ratify of 5/5 recommendations
- Langfuse OTel docs (60-sec env-var fix anchor): https://langfuse.com/integrations/native/opentelemetry
- W325-A P0-1 (OTel headers fix paste-ready)

## §7 Appendix-A (TBD): codex round-20 graft

When codex round-20 (job `task-mpd2gasc-uuric5`) completes, this section will be filled with:
- codex's per-layer score table
- codex's composite recompute
- codex's verdict (APPROVE | REVISE | NEEDS-REVISION | BLOCK) on Claude-side anticipated 4.136
- Delta analysis (Claude vs codex; ≥0.05 composite delta triggers W328-D-3 anti-bias gate inverse-test)
