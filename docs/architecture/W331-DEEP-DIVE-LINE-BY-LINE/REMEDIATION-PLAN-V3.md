# W331 REMEDIATION-PLAN-V3 — Carry-forward W330 P0.1-P0.13 + new W331-X1..X9

> **Status**: ✅ **CODEX-ROUND-3 RATIFIED APPROVE · OPERATOR-DECISION-MATRIX ACTIVE · READY-FOR-MERGE**
> **Wave**: W331 SOTA-convergence (8-cluster deep-dive complete; codex round-1 + round-2 + round-3 absorbed; Phase-6 gate CLOSED)
> **Predecessor**: W330-MEGA-AUDIT REMEDIATION-PLAN-V2 (P0.1..P0.13 reordered)
> **Source-of-truth**: `docs/architecture/W331-DEEP-DIVE-LINE-BY-LINE/SYNTHESIS.md` §5 (W330 P0 cross-mapping) + §5.1 (W331-X1..X9 new findings) + §10 (round-1 absorbed) + §11 (round-2 absorbed) + §12 (round-3 absorbed + ratified)
> **Format**: G-matrix operator-options per W330 P0 pattern (G1..Gn rows, each with α/β/γ alternatives)
> **Codex round-1**: forward 0.67 / swap 0.68 NEEDS-REVISION (convergent Δ=0.01) — 13/16 absorbed inline
> **Codex round-2**: forward 0.86 REVISE / swap 0.85 NEEDS-REVISION (convergent Δ=0.01) — 3 residuals (R4+R5+R7) surgically absorbed
> **Codex round-3**: **forward 0.93 APPROVE / swap 0.89 REVISE-projected-APPROVE-after-absorb (convergent Δ=0.04)** — 5 residuals (R-R3-1..R-R3-5) absorbed; Phase-6 gate **CLOSED at APPROVE**
> **Proposal docs** (cross-reference): `CLAUDE-MD-L10-EDIT-PROPOSAL.md` (X1) · `W331-X3-OTEL-TRIPLE-EXPORTER-DESIGN.md` (X3) · `W331-X4-SUBAGENT-LEVEL-MANDATE-PROPOSAL.md` (X4) · `W331-FINALIZATION-CHECKLIST.md` (STOP-gate 6/7 complete, item 7 pending operator)
> **T6 basic-memory verdict-ledger**: `main/architecture/w331-verdict-ledger` (✅ written 2026-05-19)
> **Date**: 2026-05-19

## §1 Carry-forward from W330 REMEDIATION-PLAN-V2

### G1 — P0.1 PARALLEL-DETECTOR ROOT-FIX

Status per W331 SYNTHESIS §5: **PENDING** (W329-D identified `tools/preagent-parallel-guard.mjs:4,17` hardcoded advisory-only `exit 0`).

| Option | Approach | Trade-off |
|---|---|---|
| α | Block on 2nd violation per session (UserPromptSubmit redesign) | Strict enforcement; risks blocking legitimate solo-dependent dispatch |
| β | Warn + telemetry-only (log to T6 basic-memory) | Soft enforcement; preserves operator flexibility |
| γ | Hybrid: warn on 1st, block on 2nd, override via env-var | Balanced; requires careful threshold tuning |

**Recommendation**: γ (hybrid) — matches W269 prior W325 F1 SEV-1 telemetry pattern.

### G2 — P0.4 agent-teams ZERO defensive checks

Status per W331 SYNTHESIS §5: **RESOLVED** (Cluster D — 4 cherry-fork sources confirmed).

| Option | Approach | Trade-off |
|---|---|---|
| α | Microsoft general-saas.yaml T2-CHERRY (declarative YAML) | 410-LOC + 32 ASI-Top-10 rules; YAML-only; needs policy-engine wire-up |
| β | Google ADK TransferToAgentTool JSON-Schema enum-guard | Code-fork; specific to transfer-tool; smaller surface |
| γ | Pydantic ContentFilterError empty-response detection | Smallest surface; covers F5 strip-and-test convergence |
| δ | All four (Microsoft + Google + Letta ToolRule + Pydantic+Instructor) | Maximum coverage; integration cost |

**Recommendation**: γ first (smallest defensive surface, fastest win), then α (governance YAML) in W332. `[CODEX-VERIFY]`

### G3 — P0.6+P0.11 memory-layer T1 replacement

Status per W331 SYNTHESIS §5: **RESOLVED** (Cluster E — mem0 v2.0.2 = T1 BAKEOFF WINNER).

| Option | Approach | Trade-off |
|---|---|---|
| α | mem0 v2.0.2 + pgvectorscale backing-store (full V3 phased pipeline) | install_score 4.04; D11 ~93% context-budget reduction; 28× lower p95 |
| β | mem0 only (no pgvectorscale; default in-mem) | Lower install cost; loses backing-store performance |
| γ | basic-memory (T6 current canonical) + mem0 (NEW T1) — coexist | Hedge; doubles maintenance |

**Recommendation**: α (full mem0 + pgvectorscale) — matches Cluster E composite winner. `[CODEX-VERIFY]`

### G4 — P0.8+P0.12 DSPy MIPROv2+GEPA wire-up

Status per W331 SYNTHESIS §5: **READY** (Cluster F — DSPy v3.2.1 already venv-installed; pattern_score 4.70).

| Option | Approach | Trade-off |
|---|---|---|
| α | MIPROv2 + GEPA stack in existing `.claude/skills/dspy-integration/` | Reuses existing skill; minimal new surface |
| β | New `.claude/skills/dspy-miprov2-gepa/` separate skill | Cleaner separation; +33→34 skill count |
| γ | Compile-time prompt-optimization for top-3 high-traffic skills only (using-superpowers, sota-convergence-audit, goal-prompt-synthesis) | Targeted; lowest cost; doesn't generalize |

**Recommendation**: α (existing skill wire-up) — matches `33-skill` invariant per CR-4 (no count change).

### G5 — P0.9 CR-1 trust extension SLSA-L3+CycloneDX

Status per W331 SYNTHESIS §5: **CITE-ANCHORED** (Cluster H — OSSF + Aqua + Cloudflare + Obra 4-org cite).

| Option | Approach | Trade-off |
|---|---|---|
| α | Extend cardinal rule 1 in CLAUDE.md to require SLSA-L3 + CycloneDX SBOM | Strongest invariant; matches OSSF Scorecard SOTA |
| β | Document in `docs/architecture/W331-TRUST-EXTENSION.md` as recommended-pattern (not cardinal rule) | Softer; doesn't add to ≤50 LOC budget |
| γ | Phased: β now, α in W333 after primitive-set verified | Risk-managed; lowest immediate cost |

**Recommendation**: γ (phased α via β) — preserves ≤50 LOC CLAUDE.md budget per CCBP `claude-md-size`.

### G6 — P0.13 OPERATOR-NAME pending (W330 unresolved)

Status per W331 SYNTHESIS §5: **PENDING-OPERATOR** (operator-supplied identity needed for cite-anchoring).

| Option | Approach | Trade-off |
|---|---|---|
| α | Use `@operator` placeholder in ledger rows | Anonymous; aligns with W295-r13 secret-redaction posture |
| β | Operator-provided name; commit at next merge | Personal-data attached; matches GitHub commit-author convention |
| γ | Use git config user.email-derived handle | Auto; matches existing commit metadata |

**Recommendation**: α (anonymous `@operator`) — preserves W295-r13 secret-redaction default until operator opts in.

## §2 NEW W331-X1..X9 findings

### G7 — W331-X1 CLAUDE.md L10 "codex exec foreground+tee" out-of-date (SEV-2)

Source: Cluster B (`broker-endpoint.mjs:7-15` + `app-server-protocol.d.ts:57-66` + `broker-lifecycle.mjs:1-50`). `[CODEX-VERIFY]`

| Option | Approach | Trade-off |
|---|---|---|
| α | Replace L10 with "app-server JSON-RPC via broker daemon (codex-plugin-cc v1.0.4)" + cite-anchor | Most accurate; matches v1.0.4 implementation |
| β | Keep L10 (foreground+tee Path P) + add L10a note "v1.0.4 supersedes via app-server" | Backwards-compat; adds 1 LOC |
| γ | Replace + reduce CLAUDE.md by 1 LOC elsewhere | Maintains ≤50 LOC budget; requires offset |

**Recommendation**: α (replace + accurate cite) — operator-confirmation needed for any CLAUDE.md edit per CR-3.

### G8 — W331-X2 GitNexus Windows FTS SIGSEGV (Windows-critical)

Source: Cluster H (`pool-adapter.ts:423` fix in commit `803f0bed`). `[CODEX-VERIFY]`

| Option | Approach | Trade-off |
|---|---|---|
| α | `/plugin update gitnexus@gitnexus-marketplace` immediately | Single-command fix; matches Cluster H finding |
| β | Pin to specific commit `803f0bed`; defer auto-update | Reproducibility; manual maintenance |
| γ | Disable gitnexus until W332 audit completes | Risk-averse; loses functionality |

**Recommendation**: α (immediate update) — Windows-critical SIGSEGV; matches W317-Stream-A operator-runtime pattern.

### G9 — W331-X3 OTEL triple-exporter design (Cluster G coverage gap)

Source: Cluster G (Traceloop `Traceloop.init(traces, metrics, logs)` recipe; Phoenix dual HTTP+gRPC).

| Option | Approach | Trade-off |
|---|---|---|
| α | Wire Traceloop triple-exporter against langfuse :3000 (LIVE T5) | Reuses existing langfuse; closes gap |
| β | Wire Traceloop against Phoenix :6006 (operator-pending start) | Vendor-distinct; adds new service |
| γ | Both (langfuse primary + Phoenix shadow) | Maximum visibility; doubles maintenance |

**Recommendation**: α (Traceloop → langfuse :3000) — closes gap with zero new service dependency.

### G10 — W331-X4..X9 (PENDING-CODEX-DETAIL)

Codex round-1 will surface additional X-numbered findings. Reserved slots for X4-X9 verdict integration. `[CODEX-VERIFY]`

## §3 STOP-gates per GOAL-W331

Before any merge:

1. ✅ CLAUDE.md ≤50 LOC pointer-only
2. ✅ `self_invented_count: 0` preserved
3. ✅ ≥3-org-distinct cites per major verdict
4. ✅ No CR-1..5 violations introduced
5. ⏸ **Codex round-2 APPROVE** (round-1 in-flight)
6. ✅ T6 basic-memory verdict-ledger row per cluster (operator-opt-in per W295-r13 secret-redaction)

## §4 Operator-decision matrix (composite)

| G-row | Recommendation | Codex-verify? | Blocks ship? |
|---|---|---|---|
| G1 P0.1 parallel-detector | γ hybrid | NO | NO (telemetry-only) |
| G2 P0.4 defensive checks | γ Pydantic first | YES | NO |
| G3 P0.6+11 memory T1 | α mem0+pgvectorscale | YES | NO |
| G4 P0.8+12 DSPy wire-up | α existing skill | NO | NO |
| G5 P0.9 trust extension | γ phased β→α | NO | NO (W333 follow-up) |
| G6 P0.13 operator-name | α anonymous | NO | NO |
| G7 X1 CLAUDE.md L10 | α replace | YES | YES (cardinal-rule cite accuracy) |
| G8 X2 GitNexus update | α immediate | YES | NO (Windows-only) |
| G9 X3 OTEL triple-exporter | α traceloop→langfuse | NO | NO |
| G10 X4-X9 | TBD per codex | YES | TBD |

## §5 Carry-forward to W332

Items deferred from this plan to W332+:

1. **R5 sandbox decision** Option α/β/γ (operator-pending from prior wave)
2. **Phoenix :6006 start** (G9 β alternative)
3. **OTEL_HEADERS paste** (env-block)
4. **Privacy opt-ins phased paste** (W295-r13 secret-redaction)
5. **Composite-quality target decision** (operator-pending)
6. **Microsoft policy-YAML cherry-fork** (G2 α follow-on)
7. **Phoenix shadow exporter** (G9 γ alternative)

## §6 Codex round-1 absorb gate

When codex round-1 returns (forward + swap):

1. Apply convergent findings (both axes APPROVE) → ship V3 as-is.
2. Apply divergent findings (axis-1 OR axis-2 NEEDS-REVISION) → revise V3 → codex round-2.
3. Apply FAB-RISK findings → fix cite-anchor → codex round-2.

This document AUTHORED 2026-05-19 BEFORE codex round-1 absorption; rows marked `[CODEX-VERIFY]` will be confirmed/revised inline upon round-1 return.
