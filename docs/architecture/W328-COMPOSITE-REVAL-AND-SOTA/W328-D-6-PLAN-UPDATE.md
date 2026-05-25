# W328-D-6 — Plan Update (W329-W330 sequenced plan refresh post R5 unblock)

**Date**: 2026-05-19 **Wave**: W328 Stream D **HEAD**: `2c48b1e`
**Baseline plan**: W327-D-4 v2 sequenced W328-W330 plan (codex round-14 corrected).
**State-change since baseline**: R5 PARTIAL-Path-2A config-level unblock at W327-r3 (`defaultMode: "default"` + `sandbox.failIfUnavailable: true`); composite 4.036 → ~4.136 (anti-bias capped 4.143) per W328-D-4 + W328-D-3.

---

## §1 Plan update summary

| Plan element | W327-D-4 v2 baseline | Post-R5-unblock update | Δ |
|---|---|---|---|
| W328 entry composite | 4.036 | **4.136** (anti-bias 4.143) | +0.100 already realized at W327-r3 |
| W328 close composite (both gates) | ~4.20 | **~4.20-4.25** | +0.00 to +0.05 |
| W329 close composite | ~4.30-4.34 | **~4.32-4.40** | +0.02 to +0.06 |
| W330 close composite (Path 2A) | ~4.40 | **~4.42-4.45** | +0.02 to +0.05 |
| W331 micro-wave needed? | YES (Option α to reach ≥4.5) | **YES (still needed)** | unchanged; 4.45 < 4.5 |
| Path 2A vs 2B path | Path 2A (with W331 micro-wave) | **Path 2A holds** | unchanged |
| K-1 OPERATOR-DECISION carry-forward | UNRESOLVED | **PARTIAL-RESOLVED at config level** | Δ from 8-wave dwell to "in-progress" |
| K-2 Langfuse keys verify | UNRESOLVED | **STILL UNRESOLVED** | unchanged (operator-gate) |

---

## §2 W328 close (in-flight; this Stream D ships now)

**W328 ALREADY-LANDED at HEAD `2c48b1e` (per W327-r3 commit body)**:
- ✅ defaultMode → default (settings.json:92)
- ✅ failIfUnavailable → true (settings.json:431)

**W328 in-flight Streams** (already running per dir-existence + Stream A/B/C/E findings):
- W328 Stream A (R5 verify): in-progress per `docs/architecture/W328-R5-VERIFY/` (empty at Stream D entry — Stream A still composing findings)
- W328 Stream B (K-2 OTel — operator-pending Langfuse key verify): NOT YET STARTED per file-system
- W328 Stream C (K-5 minimal + K-8 verify): SHIPPED per `docs/architecture/W328-K5-MINIMAL-COORD/W328-C-SYNTHESIS.md` (3 deliverables, 3 K-N targets, all DOC-ONLY)
- W328 Stream D (this stream — composite re-eval + SOTA discovery): SHIPPING THIS COMMIT
- W328 Stream E (K-8 provenance-lint v2): per `docs/architecture/W328-PROVENANCE-LINT-V2/` (state TBD)

**W328 close projection (revised)**:
- IF Stream A R5 verify confirms Path 2A acceptance-record + R5 corollary in CLAUDE.md: +0.05 lift → **4.19**
- IF only this Stream D + Stream C SHIPPED (no Stream A signing): **4.143** (anti-bias capped from W328-D-3)
- IF Stream B K-2 OTel ALSO ships (operator unblocks Langfuse keys): +0.07 lift → **~4.21**

**Realistic W328 close**: **4.14 to 4.21** (range; midpoint ~4.18).

---

## §3 W329 sub-wave (REVISED)

### §3.1 W329 Stream A — K-3 + K-4 bundled sca-v11 design (HOLDS from W327-D-4 v2 §4)

**State**: HOLDS. K-3 codification ALREADY SHIPPED at W327-r1 (sca-v11 §5c skip-N/A taxonomy). W329 Stream A pivot to operational external-auditor mode + D-EMP probe + D39+D40+D41 SCORED dims (per W327-D-1 §5 K-4 step 3).

**Composite-lift δ** (revised): +0.03 to +0.05 (was +0.04 to +0.06 in v2; minor downward revision since K-3 codification already credited at W327-r3).

### §3.2 W329 Stream B — K-5 FULL wave-coord (HOLDS from W327-D-4 v2 §4)

**State**: HOLDS. K-5 MINIMAL (Stream C of W328) SHIPPED. W329 Stream B pivots to: SessionStart hook + merge-bot policy + redaction test suite per W327-D-4 v2 §4.

**Composite-lift δ** (revised): +0.02 to +0.03 (unchanged from v2).

**Strong SOTA candidate**: **AEGIS arxiv 2603.12621** (per W328-D-5 C10) — vendor-fork the Ed25519 + SHA-256 hash-chain pattern for wave-events.jsonl signing in K-5 SessionStart hook.

### §3.3 W329 Stream C — K-6 signed-audit-trails + protect-mcp + ECC hooks (HOLDS from W327-D-4 v2 §4)

**State**: HOLDS. Re-enable `signed-audit-trails@claude-code-workflows: true` and `protect-mcp@claude-code-workflows: true` in settings.json:257/258; un-disable ECC governance hooks from `ECC_DISABLED_HOOKS`.

**Composite-lift δ** (revised): +0.02 to +0.03 (unchanged from v2).

**Strong SOTA companions**: **C7 sigstore/cosign + C8 in-toto/witness** for hook-chain attest signing (per W328-D-5 §2).

### §3.4 W329 Stream D — codex round-22 consensus ratify (REVISED — round number incremented post-W328 r20 r21)

**State**: codex round-22 expected to ratify sca-v11 + K-3 + K-4 + K-5 full + K-6 hooks.

**Composite-lift δ**: 0 direct (governance signal).

### §3.5 W329 NEW Stream E (CANDIDATE) — K-2 OTel headers (if W328 Stream B did NOT ship K-2)

**State**: NEW carry-forward if W328 Stream B was operator-blocked. Highest-leverage single work-item (per W328-D-4 §3 "Highest-leverage remaining single work-item").

**Composite-lift δ**: **+0.07** (L5 +0.20 + L6 +0.30 layer-mean) — best leverage per wave-hour.

### §3.6 W329 close projection (revised)

| Layer | W328 close | W329 streams | W329 close |
|---|---|---|---|
| L1 | 4.585 | 0 | 4.585 |
| L2 | 3.925 | +0.075 (K-5 full Stream B remainder) | 4.000 |
| L3 | 4.300 | +0.075 (K-5 full Stream B remainder) | 4.375 |
| L4 | 4.460 | +0.150 (K-3 + K-4 sca-v11 SHIP) | 4.610 |
| L5 | 4.300 | +0.200 (K-4 supply-chain + Stream E K-2 if carry-forward) | 4.500 |
| L6 | 3.750 | +0.300 (K-2 OTel via Stream B or Stream E carry) | 4.050 |
| L7 | 3.682 | +0.175 (K-6 hooks + K-4 partial) | 3.857 |
| **Sum (anti-bias capped W328 + revised W329 streams)** | 28.002 | +0.975 | 28.977 |
| **Composite (÷7)** | 4.000 | +0.139 | **4.139** |

**Wait — composite at 4.139 looks LOWER than W328 close 4.143**. Let me re-add:

Corrected sum: 4.585 + 4.000 + 4.375 + 4.610 + 4.500 + 4.050 + 3.857 = **29.977** → ÷7 = **4.282**.

So W329 close projection: **~4.28 to ~4.36** (range; midpoint ~4.32). This matches W327-D-4 v2 §4 projected ~4.30 within Stream D's anti-bias-capped baseline.

---

## §4 W330 sub-wave (HOLDS from W327-D-4 v2 §5)

### §4.1 W330 Stream A — K-1 Path 2A step 5: Control 2 audit-hook + Control 5 drift-audit

**Composite-lift δ**: +0.02 to +0.03 (Control 2 audit-hook ratifies remaining L7 governance lift; Control 5 drift-audit closes K-1 Path 2A).

### §4.2 W330 Stream B — sca-v11 SHIP final

**State**: final ratify + denom math codex-r23 ratify + ledger refresh.

### §4.3 W330 Stream C — codex round-24 consensus + composite re-score

**State**: confirms cumulative lift.

### §4.4 W330 close projection

W329 close ~4.32 + Δ ~0.06 to 0.09 (Control 2 hook wire + Control 5 drift-audit + sca-v11 SHIP) → **W330 close ~4.38 to ~4.41**.

Anti-bias-conservative: **~4.36 to ~4.42** (midpoint ~4.39).

**Status at W330 close**: YELLOW upper (4.36-4.42 < 4.5 ship-gate). W331 micro-wave still needed per W327-D-4 §6.

---

## §5 W331 micro-wave (Option α per W327-D-4 §6 — still NEEDED)

**Goal**: close ~4.39 → ~4.50+ (cross 4.5 ship-gate).

**Strategies** (per W327-D-4 §6):
- **Stricter scoring trace**: every K-N lift cite-anchored to actual evidence (no double-count)
- **30-day telemetry evidence**: post K-2 OTel fix, accumulate Langfuse spans + ledger row velocity over 30-day window
- **W316-S5 8-layer extension if needed**: add L8 audit-completeness (sca-v11 §5c E-skip external-auditor scoring path)

**Composite-lift δ**: +0.10 to +0.15 → **W331 close ~4.49 to ~4.55**.

**If W331 falls short of 4.5**: Option β (Path 2B WSL2 pivot; 3-5 wave timeline) becomes the realistic ship-gate-clearing path.

---

## §6 SOTA candidates wired into W329-W330 streams

Per W328-D-5 candidates:

| K-N target | Top candidate | sca-v11 tier ANTICIPATED | W329-W330 wire-point |
|---|---|---|---|
| K-2 L6 observability | C2 openobserve/openobserve | T1-PROV/T2-CHERRY | W329 Stream E (carry-forward) deep-dive cascade |
| K-4 supply-chain | C6 slsa-framework/slsa-verifier | **T1 INSTALL candidate** | W329 Stream A K-4 dim scoring + W330 install |
| K-5 wave-coord pattern | C10 AEGIS arxiv 2603.12621 (Ed25519 + SHA-256) | T3 PATTERN-STUDY (vendor-fork pattern) | W329 Stream B SessionStart hook design |
| K-6 hook attest | C7 sigstore/cosign + C8 in-toto/witness | T2-VENDOR-FORK | W329 Stream C signed-audit-trails re-enable companion |

---

## §7 Critical-path Gantt (REVISED post-W327-r3)

```
W327-r3 (HEAD `2c48b1e`) — R5 CONFIG UNBLOCK already realized; composite 4.143 (anti-bias capped)
  │
  ├─ K-1 OPERATOR-DECISION (W327-D-5 §1) ─── PARTIAL-RESOLVED ──┐
  │                                                              │
  ├─ K-2 LANGFUSE-KEY-VERIFY (§2) ─── STILL OPERATOR-GATED ─────┤
  │                                                              ▼
W328 (this wave — IN-FLIGHT):
  Stream A K-1 reclassify (PARTIAL — defaultMode landed; acceptance-record + corollary pending)
  Stream B K-2 OTel (OPERATOR-GATED)
  Stream C K-5 minimal + K-8 verify (SHIPPED)
  Stream D composite re-eval + SOTA discovery (SHIPPING THIS COMMIT)
  Stream E K-8 provenance-lint v2 (state-TBD)
  W328 close ~4.14-4.21 (range)
  │
  ▼
W329 (4-5 parallel streams):
  Stream A K-3+K-4 sca-v11 operational (D-EMP probe + external-auditor mode + D38-D41 SCORED)
  Stream B K-5 full (SessionStart hook + merge-bot + redaction; vendor-fork AEGIS Ed25519+SHA-256 pattern)
  Stream C K-6 hooks re-enable (signed-audit-trails + protect-mcp + ECC un-disable; cosign companion install)
  Stream D codex round-22 ratify
  Stream E K-2 OTel (carry-forward if W328 Stream B did NOT ship)
  W329 close ~4.28-4.36 (midpoint ~4.32)
  │
  ▼
W330 (3 parallel streams):
  Stream A K-1 final (Control 2 audit-hook + Control 5 drift-audit)
  Stream B sca-v11 SHIP final
  Stream C codex round-24 + composite re-score
  W330 close ~4.36-4.42 (midpoint ~4.39)
  │
  ▼
W331 micro-wave (Option α — still needed):
  Stricter scoring trace + 30-day telemetry evidence + Option α gap closure
  Target composite ~4.49-4.55 (GREEN-band; clears 4.5 ship-gate)
```

**Total wall-clock**: 4 sub-waves × ~4-6h each + W331 ~2h = **~18-26h cumulative** to ≥4.5 composite (Path 2A only; was ~14-17h in W327-D-4 v2).

---

## §8 Risk register (REVISED post-R5-unblock)

| Risk | Severity | Status change | Mitigation |
|---|---|---|---|
| Operator delays K-1 Path 2A step 4-5 (acceptance-record + R5 corollary) | MED (was HIGH) | DOWNGRADED post W327-r3 config-level unblock | Stream A R5 verify Stream finalizes; if operator-pending, S-class +0.05 carry-forward |
| Langfuse keys fail to verify K-2 round-trip | HIGH (unchanged) | Still operator-bound | 24h wait after K-2 env-var fix; if 0 spans → debug headers / project ID / firewall |
| W329 Stream A sca-v11 operational external-auditor mode not implementable | MED | unchanged | sca-v11 §5c E-skip schema already designed; D-EMP probe needs K-2 telemetry round-trip first |
| C2 openobserve does NOT smoke-test fit in-runtime (D-EMP=0) | MED | NEW from W328-D-5 | T1 INSTALL ratification BLOCKED per sca-v11 §4 HARD GATE; fallback to C1 grafana/tempo (Docker dependency) OR fix Phoenix root cause via OTEL_EXPORTER_OTLP_HEADERS |
| C6 slsa-verifier Windows binary fails to verify Sigstore Rekor over Z:-portable env | LOW | NEW | deepwiki confirmed Windows AMD64 + ARM64 in releases; CI verify likely clean |
| Anti-bias gate retrospective fires after codex round-20 graft | MED | NEW (Stream D ships codex-round-20-PENDING) | W328-D-3 §6 carries forward retrospective check; per-layer Δ > 0.05 triggers re-litigation |
| 4.5 ship-gate NOT reached post-W330 + W331 (codex R-5 critique) | HIGH (was HIGH in v2) | unchanged | Option β: Path 2B pivot (WSL2 migration; 3-5 wave); Option γ: ship-gate revise to 4.4 with acceptance-record |

---

## §9 Stop-criteria for plan execution

Plan execution MUST PAUSE and trigger operator-decision-cycle if:
1. W328 Stream B Langfuse keys fail verify after 24h — debug + rotate keys + re-attempt
2. W329 Stream A sca-v11 operational mode triggers codex round-22 NEEDS-REVISION twice in a row — re-design external-auditor scoring path
3. K-2 OTel headers fix yields 0 spans over 7-day soak — pivot to C2 openobserve drop-in
4. C2 openobserve cascade reveals D-EMP=0 in-runtime — fallback to fix-Phoenix-root-cause path
5. Codex round-20 retrospective reveals composite over-credit > 0.05 — re-litigate W328-D-4 numbers + ship corrections

---

## §10 Cite-anchor master

- W327-D-4 v2 sequenced W328-W330 plan (baseline being revised)
- W327-r3 commit `2c48b1e` body (R5 unblock observation)
- W328-D-4 composite-lift recompute (Claude-side anticipated 4.136; anti-bias capped 4.143)
- W328-D-3 anti-bias gate (per-layer inverse-test on Claude recompute)
- W328-D-5 SOTA candidates (C2 openobserve / C6 slsa-verifier / C10 AEGIS top picks)
- sca-v11 §5c skip-N/A taxonomy (K-3 codification)
- ops-rhythm SKILL.md (K-7 codification)
- W316-S5 7-layer Blueprint composite-score formula
- AEGIS arxiv 2603.12621 (Ed25519 + SHA-256 hash-chain pattern for K-5)
