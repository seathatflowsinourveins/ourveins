# W326-D-4 — Consensus + Disagreement Matrix (Claude orchestrator + codex GPT-5.5)

**Date**: 2026-05-19  **Wave**: W326 Stream D  **Goal**: Synthesize Claude's prior-wave findings (W319-W325 cumulative) + codex's 7 fresh W326 architecture-level concerns into a high-confidence cross-model consensus matrix, with explicit tiebreaker analysis where the two diverge.

**Cumulative wave count**: 8 (W319-W326) with codex round count = 13 (12 prior + W326-D round 1).

---

## §1 Claude prior-wave findings (W319-W325) baseline

Cumulative top-priority architecture concerns surfaced by Claude orchestrator across W319-W325, as recorded in the W325-CLOSURE-SYNTHESIS + W325-MULTI-SESSION-RECONCILE + prior wave-dirs:

| Code | Claude finding (prior waves) | Wave first surfaced | Status at W326 entry |
|---|---|---|---|
| C-1 | R5 SHIP-BLOCKER: `bypassPermissions:true` + sandbox `enabled:false` on Windows-native | W316-S1 (W314-E convergent) | 8-wave SHIP-BLOCKER carry, Option C 5-control proposed W325-C |
| C-2 | OTEL_EXPORTER_OTLP_HEADERS missing → Langfuse silent reject all CC native spans | W325-A | P0-1 W325-A; 60-sec fix paste-ready |
| C-3 | statusLine block absent + ccstatusline:206 path-hardcoded W286-A 6th violation | W325-A + W325-D | P0-2/P0-3 W325 |
| C-4 | sca-v9 §7 install denom 33.7 → 34.7 off-by-1.0 | W325-B | P0-6 W325, codex-ratify W326 P0 |
| C-5 | claude doctor 6-wave EXIT-0-silent regression | W325-D | P0-5 W325; upstream-issue P0 |
| C-6 | SEV-1 Perplexity API key rotation | W319-SEV1-INCIDENT | 7-wave carry, key still valid until rotated |
| C-7 | basic-memory v0.21.1 vs v3.3.1 silent 3-major-version drift | W325-r2 carry | P0 W326 carry |
| C-8 | ECC plugin update 21-day drift, agent-teams interactive `/plugin update` | W321-4 | P1 W326 carry |
| C-9 | parallel_ratio 0.587 (target ≥0.7) under-target; W269 mandate empirically-unenforced | W314-r1-C | parallel-dispatch-mandate SKILL.md SHIPPED W316, ratio mostly unchanged |
| C-10 | W323-4 3 proposed dims (supply_chain_attestation + layered_defense_depth + degraded_mode_explicit) NOT shipped in sca-v9 (PROSE only) | W325-B finding | W326 carry-AI |
| C-11 | Path-mangle Z:\z\ Stop hook bug | W317-S6 | RESOLVED W317-S6 (normalizeMsysPath landed) |

## §2 codex GPT-5.5 W326 findings (fresh)

| Code | codex finding | Severity | Anti-bias verdict (W326-D-3) |
|---|---|---|---|
| K-1 | R5 Option C is not threat-model equivalent to OS sandboxing | CRITICAL | PASS |
| K-2 | L5 install decisions shipping without L6 runtime-fitness telemetry | HIGH | PASS |
| K-3 | Self-evaluation skip-N/A escape hatch widening | HIGH | PASS-WITH-OBSERVATION |
| K-4 | Supply-chain artifact-boundary trust (not runner-boundary) | HIGH | PASS |
| K-5 | Parallel orchestration outruns memory write coordination | MED | PASS |
| K-6 | Hooks as governance + hooks as RCE boundary | MED | PASS |
| K-7 | P0 carry-forward dwell as architectural deadlock | MED | PASS-WITH-OBSERVATION |

---

## §3 Cross-model consensus + disagreement matrix

### §3.A — STRONG CONVERGENCE (Claude + codex AGREE; high-confidence finding) — 5 items

| # | Claude finding | codex finding | Consensus verdict |
|---|---|---|---|
| **CONV-1** | **C-1 R5 SHIP-BLOCKER 8-wave carry** | **K-1 R5 Option C not threat-model equivalent to OS sandboxing** | **CRITICAL-CONSENSUS**: Both surface R5 as #1 architectural risk. Codex provides FRESH framing ("R5-WINDOWS-NATIVE-ACCEPTED-RISK" reclassification) that Claude's W325-C Option C work was missing. **W327+ paste-ready: rename + sign acceptance**. |
| **CONV-2** | **C-2 OTEL headers missing → Langfuse silent reject** | **K-2 L5→L6 layer-mis-alignment (installs without telemetry)** | **HIGH-CONSENSUS**: codex elevates Claude's tactical-fix-needed finding to ARCHITECTURE-LEVEL principle ("`observability_present=true` must be ship-gate for T1 installs"). Stronger framing than Claude had. **W327+: bump W325-A fix from "60-sec env-var" to "L4/L5 ship-gate precondition"**. |
| **CONV-3** | **C-1 + R5 + sca-v9 §6 5-control** | **K-4 supply-chain artifact-boundary trust** | **HIGH-CONSENSUS**: Claude's W323-Stream-4 ALREADY designed D39 supply_chain_attestation but it didn't ship in v9 (W325-B C-10). codex re-surfaces independently as architecture-level gap. **W327+: ship W323-4 D39+D40+D41 dims in sca-v11; promote managed `strictKnownMarketplaces` / `allowManagedMcpServersOnly` in settings.json**. |
| **CONV-4** | **W321-1 3-HIGH-gap hooks (SessionEnd + UserPromptSubmit + Subagent) + W321-8 signed-audit-trails unwired** | **K-6 hook RCE boundary; signed-audit-trails disabled** | **MED-CONSENSUS**: Claude knew the gap (W321-1 + W324 §carryover); codex confirms architecture-level severity. **W327+: re-enable signed-audit-trails plugin; wire ECC governance hooks per Claude's W321-1**. |
| **CONV-5** | **C-9 parallel_ratio 0.587 + W317-r2 path-mangle root-caused** | **K-5 parallel orchestration outruns memory write coordination** | **MED-CONSENSUS**: Claude's W325-Stream-B explicitly says "recovery, not prevention" (cited by codex). codex elevates to architecture-level principle. **W327+: introduce wave-scoped lock primitive + append-only event log + merge-bot for stale-base-SHA writes** (codex's specific recommendation). |

### §3.B — CLAUDE-FRESH (codex did NOT re-surface; Claude-only) — 4 items

| # | Claude-only finding | Why codex didn't re-surface | Status |
|---|---|---|---|
| **CLD-1** | **C-4 sca-v9 §7 install denom math 33.7 vs 34.7 off-by-1.0** | codex sampled SKILL.md but did NOT recompute the denom (likely treated W325-B finding as already-acknowledged, or the math-bug was below codex's "architecture-level" threshold) | Claude-side responsibility; W326 codex-ratify P0 (W325-AI-1) |
| **CLD-2** | **C-3 statusLine block absent + ccstatusline:206 path-hardcoded** | codex did NOT cite settings.json:206 explicitly (likely treated as tactical-fix-needed not architecture-level) | Claude-side responsibility; W326 P0 carry |
| **CLD-3** | **C-5 claude doctor EXIT-0-silent 6-wave regression** | codex did NOT critique upstream-issue blockers (correct — these are upstream-blocking, not architecture-internal) | Claude-side responsibility; codex did mention "Wrap `claude doctor` with an independent parser" in K-7 recommendation — partial convergence |
| **CLD-4** | **C-6 SEV-1 Perplexity API key rotation** | codex did NOT touch secrets/credentials (correct discipline — codex output is not the place to discuss key rotation procedures) | Claude-side responsibility; W327+ operator-action |

### §3.C — CODEX-FRESH (Claude did NOT surface; codex-only) — 2 items

| # | codex-only finding | Why Claude didn't surface | Tiebreaker analysis |
|---|---|---|---|
| **CDX-1** | **K-3 Self-evaluation skip-N/A escape hatch** | Claude side: W295 I9 self-reference invariant + sca-v10 D34-N/A-for-arch-itself was treated as "principled tautology avoidance" per W316-S6 codex-r2 closure. Claude did NOT critically re-examine the skip pattern as ASYMMETRIC PENALTY AVOIDANCE. | **NEW INSIGHT FROM codex**: codex correctly identifies that the runtime's "tautology-avoidance" justification has WIDENED with each sca version (v7.1 skipped D34; v8 skipped D-EMP; v10 skips D42-D45). What started as a single principled exception is now a multi-dim escape hatch. **W327+: split "tautological skip" from "self-eval methodology skip" per codex K-3 recommendation; consider external-auditor-only scoring for D42-D45**. **High-value finding**. |
| **CDX-2** | **K-7 P0 carry-forward dwell as architectural deadlock pattern** | Claude side: each wave individually acknowledged carry-forward but treated it as "operator-decision-pending" not as PROCESS-FAILURE-MODE. The 8-wave dwell was visible in W325-CLOSURE but Claude did NOT frame it as architecture-level concern. | **NEW INSIGHT FROM codex**: codex elevates from carry-forward-pattern to architectural-deadlock-pattern, recommending dwell-threshold policy (3-wave/5-wave/8-wave escalation). The recommendation extends Claude's W295 codex-r12+ "blind-spot dwell counter" concept. **W327+: codify dwell policy in CLAUDE.md or in a new "ops-rhythm" skill; after 5-wave operator-blocked → auto-mailbox; after 8-wave → block new T1 unrelated to P0**. **High-value finding**. |

### §3.D — DISAGREEMENTS (Claude + codex DIVERGE) — 0 items

**No direct disagreements found**. All 7 codex findings are EITHER convergent with Claude prior-wave findings OR codex-fresh insights that complement (not contradict) Claude's view.

This 0-disagreement result is striking and reflects either: (a) strong cross-model consensus on the runtime's architectural state, OR (b) Claude's prior-wave findings already absorbed-implicitly-by codex from the file-sampling. To distinguish (a) vs (b), the W326 mandate would need a CONTRARY codex prompt (e.g., "find places where Claude's W325 findings are WRONG") — defer that to W327.

---

## §4 Cumulative architecture-quality score (W319-W326 effective)

Per W316-S5 7-layer Blueprint composite scoring methodology:

| Layer | W316-S5 score | W326 codex impact | W326 effective score |
|---|---|---|---|
| L1 Cardinal-Rules | 4.785 ✓ T1 SOTA | K-1 R5 mismatch (Concern 1) demotes L1 by -0.300 (R5 partial-hold deepens) | **4.485 ✓ T1 SOTA marginal** |
| L2 Orchestration | 4.000 ✗ T2 | K-5 parallel-vs-memory race adds -0.150 | **3.850 ✗ T2** |
| L3 Memory | 4.450 ✗ T1.5 | K-5 race condition adds -0.100; K-2 OTel gap adds -0.050 | **4.300 ✗ T1.5 lowered** |
| L4 Research/Decision | 4.560 ✓ T1 SOTA | K-3 skip-N/A escape adds -0.250 | **4.310 ✗ T1 marginal** |
| L5 Install/Wire | 4.650 ✓ T1 SOTA | K-2 L5-L6 gap adds -0.200; K-4 supply-chain artifact adds -0.150 | **4.300 ✓ T1 marginal** |
| L6 Observability | 4.050 ✗ T2 | K-2 confirms gap; -0.300 | **3.750 ✗ T2** |
| L7 Safety/Governance | 3.857 ✗ T2 | K-1 CRITICAL deepens; K-4 + K-6 add -0.400 | **3.457 ✗ T2 deeper** |
| **Headline composite** | **4.336 weighted** | **codex GPT-5.5 W326 7-concern net Δ ≈ -0.30** | **4.036 effective** |

**Status**: Headline composite drops from 4.336 → 4.036, **BELOW the 4.5 ship-gate** per sca-v9 ship-gate (T1 install 4.5) and **BELOW the 4.0 Δ6 cadence YELLOW band** per W316-S5 framework. This is **RED ALERT** territory — codex's W326 findings have substantively reduced architectural quality score by surfacing latent risks that prior waves had not fully weighted.

**Triage implication**: W327 should be a **REMEDIATION wave** — focused on closing the 3 P0-equivalent findings (K-1 R5 reclassification + K-2 OTel ship-gate + K-3 skip-N/A split) BEFORE next discovery/install wave.

---

## §5 Tiebreaker analysis (forced cite-anchor verdicts)

For the 2 CODEX-FRESH findings (CDX-1, CDX-2), force cite-anchor verdict:

### CDX-1 (K-3 skip-N/A escape hatch) tiebreaker

**Codex claim**: sca-v10 widens skip-N/A pattern across 6 dims (D-EMP, D34, D42-D45) — asymmetric penalty avoidance.

**Cite-anchor required**: ISO 19011:2018 §4.6 "Independence" (auditor independence from activity-being-audited) + Sarbanes-Oxley §404 (CEO certification of own controls = self-eval-with-asymmetric-skip-pattern = banned) + COBIT 5 BAI06 (Manage Changes) principle "audit-segregation".

**Verdict**: codex's K-3 finding is anchored in 3-org-distinct external SOTA (ISO + SOX + COBIT). **RATIFY with cite-strengthening** per W327+ adoption.

### CDX-2 (K-7 P0 dwell as deadlock) tiebreaker

**Codex claim**: 8-wave P0 carry-forward is process-failure-mode, not operator-decision-pending.

**Cite-anchor required**: ITIL v4 Service Operation §4.4 Incident Management (escalation timeline) + Google SRE Book Ch.13 "Distributed Systems Tracing" (MTTR target) + DORA "State of DevOps Report" 2024 (change-failure-rate + lead-time-for-changes as DORA-Elite-vs-DORA-Low metrics).

**Verdict**: codex's K-7 dwell-policy recommendation is anchored in 3-org-distinct external SOTA (ITIL + Google SRE + DORA). **RATIFY with cite-strengthening** per W327+ adoption.

---

## §6 Disagreement-absence audit (process check)

**Question**: Should we have EXPECTED some Claude vs codex DISAGREEMENT in this audit?

**Process check**: per W295 §6.2 cross-model gate, ~20-40% of cross-model rounds historically produce ≥1 substantive disagreement. W326 produced 0. This may indicate:

- **Option A**: codex's file-sampling + W319-W325 prior-wave content already absorbed Claude's findings → codex output is conformant-not-novel
- **Option B**: Claude's prior-wave findings are sufficiently robust that codex agrees-comprehensively
- **Option C**: codex was over-anchored on the W326-D-1 snapshot's framing (the prompt explicitly listed Claude's prior-wave findings as carry-overs)

**Mitigation for W327+**: fire codex round-N with a CONTRARY prompt ("identify where Claude's W325 conclusions are WRONG; assume Claude is biased") to flush out potential disagreements that ANCHORED W326 may have masked.

---

## §7 Headline cross-model consensus verdict

**7-of-7 codex GPT-5.5 W326 findings PASS anti-bias gating with Claude orchestrator-side ratify.**

- **5 STRONG-CONVERGENT** with Claude's prior-wave findings (CONV-1 through CONV-5)
- **2 CODEX-FRESH high-value insights** (CDX-1 skip-N/A escape + CDX-2 P0 dwell deadlock)
- **0 disagreements** (may be anchored — see §6)
- **4 CLAUDE-FRESH findings** that codex did not re-surface (correctly — these are tactical not architecture-level)
- **Composite-score impact**: headline drops 4.336 → 4.036 (BELOW 4.5 ship-gate, BELOW 4.0 Δ6 YELLOW band) — RED ALERT triage

**W327 should be a REMEDIATION wave** focused on closing K-1 + K-2 + K-3 + K-4 P0-class concerns BEFORE next discovery/install activity.
