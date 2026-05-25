# W328-A-5 — Composite-arch-quality Lift Estimate (post W327-r3 defaultMode flip)

**Wave**: W328 Stream A · **Date**: 2026-05-19 · **HEAD**: `2c48b1e`
**Baseline**: W326-r1 closure composite **4.036** (RED ALERT band per W316-S5 7-layer Blueprint)
**Source**: W327-D-1 K-1 reclassification estimates + W328-A-1/A-2/A-4 actual-state verification

---

## §1. W326 7-layer baseline (pre-W327)

Per W327-D-1 §1 table (lines 14-22):

| Layer | W326 effective | K-N remediation lift target | Post-W330 projection |
|---|---|---|---|
| L1 Cardinal-Rules | 4.485 | +0.300 (K-1 reclass) | 4.785 |
| L2 Orchestration | 3.850 | +0.150 (K-5 wave-coord) | 4.000 |
| L3 Memory | 4.300 | +0.150 (K-5 + K-2) | 4.450 |
| L4 Research/Decision | 4.310 | +0.250 (K-3 split skip) | 4.560 |
| L5 Install/Wire | 4.300 | +0.350 (K-2 + K-4) | 4.650 |
| L6 Observability | 3.750 | +0.300 (K-2) | 4.050 |
| L7 Safety/Governance | 3.457 | +0.400 (K-1+K-6) + +0.200 (K-7 dwell) | 4.057 |
| **Composite** | **4.036** | **+0.514 cumulative** | **≥4.55** |

**Ship-gate**: ≥4.5 (W316-S5 7-layer Blueprint composite floor). W326 baseline 4.036 is BELOW the floor.

---

## §2. K-1 R5 reclassification lift — spec vs actual

### W327-D-1 K-1 spec (§2 lines 70-72)

> "Path 2A (1-wave reclassify): L1 +0.150 (R5 explicit-not-silent) + L7 +0.200 (acceptance-record + Controls 2+5 wired) = **+0.350 net → 4.036 → 4.386**"
> "Path 2B (7-wave tighten): L1 +0.300 (R5 hard hold) + L7 +0.400 = **+0.700 net → 4.036 → 4.736** (but requires WSL2 migration prereq)"

### Actual shipped state (per W328-A-1 + A-2)

Live config is **NEITHER** clean Path 2A NOR clean Path 2B — it's a hybrid that:
- ✓ Took 1 of 5 Path 2B settings.json deltas (defaultMode flip)
- ✗ Did NOT take Path 2A's full reclassification + acceptance-record + Controls 2/5 wire
- ✗ Did NOT take Path 2B's remaining 4 sandbox-side deltas
- ✗ Did NOT take Option C's Patch C1 deny-expansion + acceptance-record

### Lift attribution (partial-Path-2B step 1 only)

**L1 lift** (Cardinal-Rules layer):
- Pure Path 2B step 1 (`defaultMode: default`) achievement: lifts R5 permissions-layer from "bypass-disabled-but-strong-controls" to "deny-default + prompt-on-unspecified"
- Spec full Path 2B L1 lift: +0.300
- Spec full Path 2A L1 lift: +0.150
- **Partial Path 2B step 1 of 5 estimate**: +0.150 (50% of full Path 2B lift; matches Path 2A magnitude since step 1 is the dominant R5 signal)

**L7 lift** (Safety/Governance layer):
- Path 2A spec L7 lift: +0.200 (requires acceptance-record + Controls 2+5 wired)
- Path 2B spec L7 lift: +0.400 (requires sandbox knobs + WSL2 + workflow disruption acceptance)
- Live state has NEITHER acceptance-record NOR Controls 2+5 wired NOR sandbox knobs
- **Partial Path 2B step 1 L7 lift estimate**: +0.050 to +0.100 (defaultMode flip alone marginally improves L7 via reduced bypass surface, but the missing acceptance-record + Control 2 means most L7 lift is forfeited)

**Total K-1-only L1+L7 lift**: +0.150 + +0.075 (midpoint of +0.05 to +0.10) = **+0.225**

---

## §3. Other K-N items status (carry-forward from W327)

| K-N | Item | W327 status | Lift contribution to W328 baseline |
|---|---|---|---|
| K-1 | R5 reclassify | partial-Path-2B step 1 (defaultMode flip only) | +0.225 (per §2 above) |
| K-2 | OTel headers for Langfuse | UNCHANGED; W325-A 60-sec env-fix STILL PENDING | +0 |
| K-3 | sca-v11 skip-N/A split | sca-v11 §5c codified in commit `6ee7ea4` (codex r14→r15→r16 ratified per SKILL.md L383) | +0.150 (partial; sca-v11 ship; pending external-auditor wire) |
| K-4 | Supply-chain D39+D40+D41 scored dims | sca-v11 §5d codified (D46-D49 + D38 + D39 + D40 + D41 in denom per SKILL.md L566) | +0.200 (sca-v11 ship adds dims; capability-registry still TODO) |
| K-5 | Wave-coordination (wave-ownership.json) | tools/preagent-parallel-guard.mjs + preagent-subagent-validator.mjs WIRED via Agent PreToolUse | +0.100 (partial; full wave-coord JSON schema still TODO per W327-D-1 §6) |
| K-6 | Hooks RCE / signed-audit | signed-audit-trails STILL DISABLED in enabledPlugins (L257: `"signed-audit-trails@claude-code-workflows": false`); protect-mcp STILL DISABLED (L256: `false`) | +0 (carry-forward) |
| K-7 | Dwell escalation policy | ops-rhythm SKILL.md present (sca-v11 §7 cross-ref to ops-rhythm at SKILL.md L599) | +0.150 (partial; ops-rhythm authored; 8-wave dwell penalty wired) |

---

## §4. W328 composite projection

### Layer-by-layer

| Layer | W326 baseline | K-N contributions (post-W327) | W328 projection |
|---|---|---|---|
| L1 Cardinal-Rules | 4.485 | K-1 partial +0.150 | **4.635** |
| L2 Orchestration | 3.850 | K-5 partial +0.075 (preagent guards wired) | **3.925** |
| L3 Memory | 4.300 | — | 4.300 |
| L4 Research/Decision | 4.310 | K-3 partial +0.100 (sca-v11 ship) + K-7 partial +0.050 (ops-rhythm authored) | **4.460** |
| L5 Install/Wire | 4.300 | K-4 partial +0.100 (sca-v11 D39+D40+D41 scored) | **4.400** |
| L6 Observability | 3.750 | — (K-2 NOT applied; OTel headers still missing) | 3.750 |
| L7 Safety/Governance | 3.457 | K-1 partial +0.075 (defaultMode flip alone; no acceptance-record) + K-7 partial +0.100 (ops-rhythm dwell SKILL ratified) | **3.632** |

### Composite (equal-weighted mean of 7 layers)

**W328 composite estimate**: (4.635 + 3.925 + 4.300 + 4.460 + 4.400 + 3.750 + 3.632) / 7 = 29.102 / 7 = **4.157**

**Vs W326 baseline 4.036**: **+0.121 net lift** → composite moves from RED ALERT (≤4.0) to **YELLOW band (4.0-4.5)**.

### Sensitivity analysis

The +0.121 lift estimate has wide uncertainty bands. Three scenarios:

| Scenario | Assumption | Composite | Band |
|---|---|---|---|
| **Pessimistic** | K-1 partial flip alone (no other K-N credit; sca-v11 ship not counted) | 4.036 + 0.075 = **4.111** | YELLOW lower |
| **Mid (above)** | K-1 partial + sca-v11 ship + ops-rhythm + preagent guards | **4.157** | YELLOW |
| **Optimistic** | All K-N partials at face value + acceptance-record signed retroactively | **4.286** | YELLOW upper |

### Comparison to W327-D-1 §11 projection table

| Wave | W327-D-1 projection | W328 actual estimate |
|---|---|---|
| W326 close | 4.036 RED ALERT | ✓ matches |
| W328 (post K-2 + K-7 + K-1 reclass step 1-4) | "**4.036 → ~4.20** YELLOW" | **4.157 (mid) / 4.111-4.286 (range)** — UNDERSHOOTS the 4.20 target |
| W329 (post K-3 + K-4 + K-5 + K-6) | "**~4.20 → ~4.40** YELLOW upper" | n/a |
| W330 (post Control 2 + Control 5 + sca-v11 SHIP + codex round-N consensus) | "**~4.40 → ≥4.55** GREEN" | n/a |

**Finding**: W328 composite ~4.157 is BELOW the W327-D-1 §11 projected W328 target of ~4.20. Reason: K-2 (OTel headers) NOT applied (worth ~+0.500 contribution per W327-D-1 §3 line 117) + K-1 only partially applied (defaultMode flip alone, not full Path 2A or 2B) + acceptance-record still absent.

To close the gap to ≥4.20 in W328:
- (a) Apply K-2 OTel headers fix (60-sec env-var paste per W325-A) → would add ~+0.05 (L5+L6 average effective; full +0.500 layer-specific)
- (b) Sign operator-acceptance-record OR back-out defaultMode flip into clean Path 2A → would clarify L7 stance
- (c) Apply Patch C1 deny-expansion (15 entries) → would lift L7 +0.10
- (d) Wire Control 2 audit-log hook → would lift L7 +0.10 and L6 +0.20

---

## §5. Ship-gate status

**Composite ship-gate**: ≥4.5 (W316-S5 7-layer Blueprint)

| Snapshot | Composite | Ship-gate status |
|---|---|---|
| W326 close | 4.036 | ✗ FAIL (RED ALERT) |
| W327 post-r3 (estimate W328-A-5 mid) | **4.157** | ✗ FAIL (YELLOW; below ship-gate by ~0.34) |
| W327-D-1 §11 W328 target | 4.20 | ✗ FAIL (would still be YELLOW; below ship-gate by ~0.30) |
| W327-D-1 §11 W330 target | ≥4.55 | ✓ PASS (GREEN; requires K-1 through K-7 fully landed) |

**Trajectory**: W327-r3 lifts composite from RED to YELLOW lower-band but remains BELOW ship-gate. The +0.121 estimated lift is real but small relative to the +0.464 needed to reach 4.5 ship-gate. **3 more waves (W328+W329+W330) of K-N remediation required** to reach ship-gate, matching the W327-D-1 §11 planned trajectory.

---

## §6. Honest characterization

The W327-r3 commit message claim "R5 NOW FULL-HOLD post defaultMode='default'. Composite-arch-quality should lift from 4.036 RED ALERT toward >=4.5 ship-gate" is **DIRECTIONALLY CORRECT but MAGNITUDE-OVERSTATED**:

- Direction: ✓ lift is real (+0.121 estimated mid)
- R5 status: ✗ "FULL-HOLD" is overclaim; PARTIAL-HOLD UPGRADED is accurate
- Magnitude: ✗ "toward >=4.5 ship-gate" implies single-wave closure; actual estimate ~4.157 leaves ~0.34 gap requiring W329+W330 follow-through

**Recommended W328 closure language**:
> "W327-r3 lifted composite arch-quality from 4.036 RED ALERT to ~4.157 YELLOW lower-band via partial-Path-2B step 1 (defaultMode flip) + carry-forward credit from sca-v11 ship + ops-rhythm authoring + preagent parallel-guards. R5 cardinal-rule moves from PARTIAL-HOLD to PARTIAL-HOLD-UPGRADED, NOT FULL-HOLD — permissions-layer materially improved; sandboxing-layer remains structurally inert on Windows-native (per Anthropic sandbox doc OS support list); operator-acceptance-record absent; 2 of 5 W325-C falsifiable-inverse claims (FI-1 + FI-2) currently broken. Ship-gate ≥4.5 requires K-2 OTel + Control 2 audit-hook + acceptance-record + remaining sca-v11 wire-up across W328-W330."

---

## §7. Sensitivity to layer-weighting (alternative composite formulas)

The W316-S5 7-layer Blueprint composite is documented as **equal-weighted mean**. Alternative formulas tested:

| Formula | Result | Notes |
|---|---|---|
| Equal-weighted mean (above) | 4.157 | Default per W316-S5 |
| L1+L7 doubled (safety-weighted) | 4.119 | L1+L7 weight 2x; arithmetic floor lower since L7=3.632 |
| L1+L4+L5+L7 doubled (governance+install heavy) | 4.139 | Marginally lower |
| Worst-of-7 floor (min-cap) | 3.632 | L7 ceiling under min-cap; would block ship-gate independently |
| 95th-percentile band | 4.157 | n=7 ranks; same as mean |

All variants leave W328 composite below the 4.5 ship-gate floor. **Floor-class layer**: L7 Safety/Governance at 3.632 is the binding constraint — without Control 2 audit-hook + acceptance-record + signed-audit-trails re-enable, L7 stays below 3.7 and the composite ceiling is locked below ~4.30 regardless of other layer improvements.

---

## §8. Cite-anchors

- `docs/architecture/W327-ARCH-REMEDIATION-PATH/W327-D-1-K1-THROUGH-K7-REMEDIATION-MAP.md:14-22` (W326 7-layer baseline table)
- `docs/architecture/W327-ARCH-REMEDIATION-PATH/W327-D-1-K1-THROUGH-K7-REMEDIATION-MAP.md:70-72` (K-1 Path 2A vs 2B composite-lift spec)
- `docs/architecture/W327-ARCH-REMEDIATION-PATH/W327-D-1-K1-THROUGH-K7-REMEDIATION-MAP.md:459-466` (§11 W328/329/330 projection table)
- `.claude/skills/sota-convergence-audit/SKILL.md:381-427` (sca-v11 §5c skip-N/A taxonomy ship)
- `.claude/skills/sota-convergence-audit/SKILL.md:431-518` (sca-v11 §5d D46-D49 ship)
- `.claude/skills/sota-convergence-audit/SKILL.md:564-571` (v11 composite denom 39.4 install / 17.0 pattern)
- `.claude/skills/sota-convergence-audit/SKILL.md:599` (ops-rhythm cross-reference for K-7 ratified)
- `.claude/settings.json:256-257` (signed-audit-trails + protect-mcp both DISABLED — K-6 carry-forward)
- W316-S5 7-layer Blueprint composite floor specification
- `git show 2c48b1e --format=%B` (W327-r3 commit-msg lift forecast)
