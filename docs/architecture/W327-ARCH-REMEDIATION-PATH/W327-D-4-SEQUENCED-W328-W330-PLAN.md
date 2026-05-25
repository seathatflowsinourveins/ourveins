# W327-D-4 — Sequenced W328-W330 Remediation Plan (REVISED post-codex-round-14)

**Date**: 2026-05-19 **Wave**: W327 Stream D **HEAD at entry**: `569080a`
**Revision**: v2 (post-codex-round-14 NEEDS-REVISION verdict ratified by W327-D-3 anti-bias gate)
**Source**: W327-D-1 K1-through-K7 remediation map + codex round-14 critique (W327-D-2) + anti-bias ratify (W327-D-3)
**Objective**: Sequence the 7 K-N remediations + 1 K-N (K-8 NEW from codex round-14) across 3 sub-waves for realistic composite-quality lift to ≥4.5 ship-gate.

---

## §1 Revision summary (changes from v1)

| Change | Source | Rationale |
|---|---|---|
| **K-5 minimal moves to W328** (was W329) | codex round-14 Axis 2 R-2 | "Coordinate-before-parallelize" — wave-ownership.json + append-only events.jsonl must land BEFORE parallel sca-v11 design in W329 |
| **K-8 NEW provenance-claim lint added W328** | codex round-14 Axis 4 R-3 (CODEX-FRESH) | W326-CODEX-R1-CLOSURE.md L26-35 explicitly named this control; not in W327-D-1 v1 |
| **Per-K composite-lift δ corrected** | codex round-14 Axis 3 R-5 (FAIL) | W316-S5 7-layer Blueprint formula: composite ≈ Σ(layer_lift × layer_weight); each layer-weight ~0.143 |
| **K-1 + K-2 lift marked CONDITIONAL** | codex round-14 Axis 4 R-4 | Operator gates in W327-D-5 §1+§2 must resolve BEFORE lift realized |
| **I9 version-bump in K-3 sca-v11** | codex round-14 Axis 4 R-3 caveat | I9 EXTENDED currently says skip-N/A for D42-D45; revision MUST allow external-auditor scoring |
| **Realistic post-W330 projection: 4.30-4.42** (Path 2A only) | codex round-14 Axis 3 R-5 | NOT 4.55; codex catches Claude's 3x over-claim |

---

## §2 Sequencing principles (updated)

1. **Effort-XS+S + coordination primitives first** (W328): wave-ownership BEFORE parallel design
2. **Effort-M bundled second** (W329): sca-v11 design + K-3+K-4 bundle + K-6 hooks wire
3. **Effort-L finalize third** (W330): Control 2 + 5 hardening + sca-v11 SHIP + ratify
4. **Dependency-respect** (revised):
   - K-3 BLOCKED-BY K-2 (D-EMP probe requires Langfuse spans)
   - K-6 BLOCKED-BY K-1 (signed-audit trust-chain requires R5 ratify)
   - K-3 + K-4 BLOCKED-BY K-5-minimal (parallel design needs coordination primitive)
   - K-8 BLOCKED-BY NONE (independent provenance-lint)
5. **Operator gates** (revised):
   - K-1 lift CONDITIONAL on operator-sign acceptance-record (W327-D-5 §1)
   - K-2 lift CONDITIONAL on Langfuse keys verified ACTIVE (W327-D-5 §2)
   - If gates NOT resolved by W328 entry: W328 composite-lift drops to +0.05-0.08 (K-7 + K-8 + K-5-minimal alone)

---

## §3 W328 Sub-Wave: Coordination + Effort-S items (REVISED)

**Wall-clock budget**: ~4-5h cumulative (5 parallel streams; up from 4 in v1)
**Composite-lift target** (conditional on operator gates):
- IF both gates resolved: **+0.08 to +0.12 → 4.116 to 4.156**
- IF only K-2 gate resolved: **+0.06 to +0.10 → 4.096 to 4.136**
- IF only K-1 gate resolved: **+0.05 to +0.07 → 4.086 to 4.106**
- IF neither gate resolved: **+0.04 to +0.06 → 4.076 to 4.096**

### W328 Stream A — K-1 Path 2A reclassification (CONDITIONAL on operator)

**Effort**: S (1-wave) — paste-ready
**Owner**: Claude orchestrator + operator co-sign
**Composite-lift δ**: **+0.02 to +0.04** (was +0.150 in v1; codex correction)
**Layer-local lift**: L1 +0.150 (only realizes if Stream A LANDS — operator-conditional)

**Steps**: unchanged from v1 (rename across 3 docs + sign acceptance-record + corollary line)
**Blocking-OPS**: operator-decision (W327-D-5 §1) MUST resolve to "Path 2A"

### W328 Stream B — K-2 OTel telemetry fix (CONDITIONAL on Langfuse keys)

**Effort**: S (1-wave) — paste-ready 60-sec env-var + 30-min sca-v11 §6 gate draft
**Owner**: Claude orchestrator (operator pre-verifies keys per W327-D-5 §2)
**Composite-lift δ**: **+0.03 to +0.05** (was +0.500 in v1; codex correction; CONDITIONAL on actual span ingestion 24h verify)
**Layer-local lift**: L5 +0.200 + L6 +0.300 (sum = +0.500 layer-local; composite contribution ÷7 ≈ +0.071)

**Steps**: unchanged from v1
**Blocking-OPS**: operator-confirm Langfuse keys ACTIVE (W327-D-5 §2)

### W328 Stream C — K-7 ops-rhythm dwell policy SKILL.md

**Effort**: S (1-wave; ~30 min skill authorship)
**Owner**: Claude orchestrator
**Composite-lift δ**: **+0.02 to +0.04** (was +0.200 in v1; codex correction)
**Layer-local lift**: L7 +0.200

**Steps**: unchanged from v1
**Blocking-OPS**: NONE

### W328 Stream D (NEW) — K-5 minimal coordination primitive

**Effort**: S (1-wave subset of full K-5; full K-5 still in W329)
**Owner**: Claude orchestrator
**Composite-lift δ**: **+0.02 to +0.04** (subset; full K-5 +0.04 to +0.07 splits across W328+W329)
**Layer-local lift**: L2 +0.075 + L3 +0.075 (subset)

**Steps**:
1. Author `.claude/state/wave-ownership.json` schema FILE-ONLY (no SessionStart hook yet):
   ```json
   {
     "wave_id": "W328",
     "head_at_entry": "<sha>",
     "streams": {
       "A": { "owner": "<agent-id>", "base_sha": "<sha>", "deliverable_paths": ["docs/architecture/.../X.md"], "created_at": "<iso>", "expires_at": "<iso+24h>" }
     }
   }
   ```
2. Append-only `.claude/state/wave-events.jsonl` writer (Bash `>>` append in pre-commit; no PostToolUse hook yet):
   ```bash
   echo "{\"wave_id\":\"W328\",\"stream\":\"<S>\",\"action\":\"commit\",\"paths\":[\"...\"],\"sha\":\"$(git rev-parse HEAD)\",\"ts\":\"$(date -Iseconds)\"}" >> .claude/state/wave-events.jsonl
   ```
3. Defer to W329 Stream B: full SessionStart hook + merge-bot policy + redaction test suite

**Blocking-OPS**: NONE (file authorship + bash append)

### W328 Stream E (NEW) — K-8 provenance-claim lint

**Effort**: S (1-wave; pre-commit hook addition)
**Owner**: Claude orchestrator
**Composite-lift δ**: **+0.02 to +0.04** (new K-8 from codex round-14)
**Layer-local lift**: L2 +0.100 (orchestration governance hardening)

**Steps**:
1. Author pre-commit shim (≤2KB CR-2 sanctioned-exception per CLAUDE.md §Cardinal-rule-2 exception clause):
   ```bash
   # .claude/hooks/provenance-claim-lint.sh (≤2KB)
   # Verify: any "APPLIED THIS COMMIT" claim in staged docs matches git diff --staged --name-only
   set -euo pipefail
   STAGED=$(git diff --staged --name-only)
   CLAIMED=$(grep -E "APPLIED THIS COMMIT:|paste-ready landed:|wired this commit" -A1 $(git diff --staged --name-only --diff-filter=A docs/architecture/W*.md 2>/dev/null) 2>/dev/null | grep -oE '`[^`]+`' | tr -d '`' || true)
   for c in $CLAIMED; do
     if ! echo "$STAGED" | grep -q "^$c$"; then
       echo "PROVENANCE-LINT FAIL: claim '$c' NOT in git diff --staged" >&2
       exit 1
     fi
   done
   ```
2. Wire into `.claude/settings.json` `hooks.PreCommit` (or use `git config core.hooksPath` if plugin-shipped hook surface preferred)
3. Test on W328 commit: claim-list verified against `git diff --staged --name-only`; expect PASS

**Blocking-OPS**: NONE (≤2KB CR-2 sanctioned-exception; Claude-authority hook authorship)

### W328 close: composite projection (REVISED)

| Layer | W326 effective | W328 streams (conditional on gates) | W328 projected (BOTH-GATES-RESOLVED) |
|---|---|---|---|
| L1 Cardinal-Rules | 4.485 | +0.150 (K-1 Stream A) | 4.635 |
| L2 Orchestration | 3.850 | +0.075 (K-5 minimal Stream D) + +0.100 (K-8 Stream E) | 4.025 |
| L3 Memory | 4.300 | +0.075 (K-5 minimal Stream D) | 4.375 |
| L4 Research/Decision | 4.310 | 0 | 4.310 |
| L5 Install/Wire | 4.300 | +0.200 (K-2 Stream B sca gate amend) | 4.500 |
| L6 Observability | 3.750 | +0.300 (K-2 Stream B OTel headers) | 4.050 |
| L7 Safety/Governance | 3.457 | +0.100 (K-1 partial) + +0.200 (K-7 Stream C) | 3.757 |
| **Layer-local sum** | **28.452** | **+1.200 total layer-local** | **29.652** |
| **Composite (mean of 7 layers)** | **4.064** | **+0.171 layer-local mean** | **4.236** |

**NOTE on composite formula**: W316-S5 7-layer Blueprint computes composite as **layer-weighted mean** (each layer weight ≈ 0.143 = 1/7). W326-D-4 reported composite 4.036 from a slightly different weighting (4.336 → 4.036 = -0.300 across 7 layers ≈ -0.043/layer). With this formula:
- W326 composite 4.036 = Σ(layer_score × 0.143)
- W328 lift = Σ(layer_lift × 0.143) ≈ +0.171
- W328 projected composite ≈ 4.207 (conditional on BOTH operator gates RESOLVED)

**REALISTIC CONDITIONAL** (codex range):
- Both gates resolved: **+0.08 to +0.12 → 4.116 to 4.156** (codex midpoint estimate; assumes partial layer-lift realization)
- One gate resolved: **+0.06 to +0.09 → 4.096 to 4.126**
- Neither resolved: **+0.04 to +0.06 → 4.076 to 4.096** (K-5 minimal + K-7 + K-8 alone)

**Status**: YELLOW (above Δ6 YELLOW band 4.0, below 4.5 ship-gate); on track if K-1 + K-2 operator-gates resolve.

---

## §4 W329 Sub-Wave: Effort-M bundled (REVISED)

**Wall-clock budget**: ~5-6h cumulative (4 parallel streams)
**Composite-lift target**: ~+0.10 to ~+0.15 → 4.21 to 4.31 (conditional)

### W329 Stream A — K-3 + K-4 bundled sca-v11 design

**Effort**: M (3-wave; bundled saves time vs serial)
**Owner**: Claude orchestrator + codex round-N ratify
**Composite-lift δ**: **+0.04 to +0.06** (K-3 +0.03-0.05 + K-4 +0.05-0.08 = combined +0.06-0.10 layer-local; composite-aware ÷7-ish)
**Layer-local lift**: L4 +0.250 (K-3) + L5 +0.250 (K-4) + L7 +0.100 (K-4 supply-chain attest)

**Steps**: unchanged from v1 EXCEPT:
- **NEW**: sca-v11 §8 I9 version-bump text: "I9 EXTENDED — skip-N/A for D-EMP/D34/D42-D45 applies ONLY when arch-self-evaluating; under EXTERNAL-AUDITOR scoring path (operator OR codex acting as cross-model peer), D42-D45 fill with external evidence; D-EMP fills with operational-probe data" (per codex round-14 R-3 caveat + W326-D-5 AI-3 step 3)

**Blocking-OPS**: operator-confirm W323-4 dims-absorb Option A (W327-D-5 §4)
**Blocking-Claude**: K-5 minimal MUST be landed in W328 Stream D (per codex Axis 2 R-2)

### W329 Stream B — K-5 FULL wave-coord (SessionStart hook + merge-bot + redaction)

**Effort**: M (3-wave; remaining K-5 work post W328 minimal)
**Owner**: Claude orchestrator
**Composite-lift δ**: **+0.02 to +0.03** (remaining K-5 fraction after W328 minimal already landed)
**Layer-local lift**: L2 +0.075 + L3 +0.075 (remaining after W328 split)

**Steps**:
1. SessionStart hook authorship (plugin-shipped if available; else CR-2 ≤2KB sanctioned-exception) — emit wave-ownership manifest + check stale entries
2. Merge-bot policy doc + paste-ready operator workflow: `git merge-base --is-ancestor <base_sha> HEAD || REJECT`
3. Redaction test suite for hook stdout/stderr egress (precondition for K-6 Stream C step 4)

**Blocking-OPS**: NONE
**Blocking-Claude**: K-5 minimal W328 Stream D MUST be landed first

### W329 Stream C — K-6 signed-audit-trails + protect-mcp + ECC hooks

**Effort**: M (3-wave)
**Owner**: Claude orchestrator + operator co-sign for settings.json edits
**Composite-lift δ**: **+0.02 to +0.03** (codex correction; was +0.200 in v1)
**Layer-local lift**: L7 +0.200

**Steps**: unchanged from v1
**Blocking-OPS**: K-1 W328 Stream A MUST have LANDED (signed-audit trust-chain depends on R5 ratify)

### W329 Stream D — codex round-16 consensus ratify

**Effort**: S (auto-fire Stop-hook + Claude synthesis)
**Owner**: codex@openai-codex plugin
**Composite-lift δ**: 0 direct (governance signal)

**Steps**: codex round-16 expected APPROVE if sca-v11 denom math + K-3 I9 version-bump + K-4 dims land clean

**Blocking-OPS**: NONE

### W329 close: composite projection (REVISED)

| Layer | W328 projected | W329 streams | W329 projected |
|---|---|---|---|
| L1 | 4.635 | 0 | 4.635 |
| L2 | 4.025 | +0.075 (K-5 full Stream B remainder) | 4.100 |
| L3 | 4.375 | +0.075 (K-5 full Stream B remainder) | 4.450 |
| L4 | 4.310 | +0.250 (K-3 Stream A) | 4.560 |
| L5 | 4.500 | +0.250 (K-4 Stream A) | 4.750 |
| L6 | 4.050 | 0 | 4.050 |
| L7 | 3.757 | +0.200 (K-6 Stream C) + +0.100 (K-4 partial) | 4.057 |
| **Composite** | **~4.207** (BOTH-GATES) | **+0.135 layer-local mean** | **~4.34** |

**REALISTIC CONDITIONAL** (codex range): **4.20-4.31** (Path 2A; both gates resolved by W328 entry)

**Status**: YELLOW upper; on track for W330 final lift.

---

## §5 W330 Sub-Wave: Finalize + Control 2 + 5 (REVISED)

**Wall-clock budget**: ~4-5h cumulative (3 parallel streams)
**Composite-lift target**: ~+0.06 to ~+0.10 → 4.30 to 4.42 (Path 2A only)

### W330 Stream A — K-1 Path 2A step 5: Control 2 audit-hook + Control 5 drift-audit

**Effort**: L (multi-session; ≤2KB CR-2 sanctioned-exception hook)
**Owner**: Claude orchestrator + operator approval for hook deployment
**Composite-lift δ**: **+0.02 to +0.03** (codex correction; was +0.100 in v1)
**Layer-local lift**: L7 +0.100

**Steps**: unchanged from v1

**Blocking-OPS**: NONE

### W330 Stream B — sca-v11 SHIP

**Effort**: L (final ratify + denom math codex-r17 ratify + ledger refresh)
**Owner**: Claude orchestrator + codex round-17 ratify
**Composite-lift δ**: 0 direct (methodology shipped W329; W330 confirms no regression)

**Steps**: unchanged from v1

**Blocking-OPS**: NONE

### W330 Stream C — codex round-18 consensus + composite re-score

**Effort**: M (codex high-effort + composite re-score per W316-S5)
**Owner**: codex@openai-codex plugin + Claude synthesis
**Composite-lift δ**: confirms cumulative lift (no direct add)

**Steps**: unchanged from v1

**Blocking-OPS**: NONE

### W330 close: composite projection (REVISED)

| Layer | W329 projected | W330 streams | W330 projected |
|---|---|---|---|
| L1 | 4.635 | +0.100 (K-1 Stream A final Control 2/5 wire) | 4.735 |
| L2 | 4.100 | 0 | 4.100 |
| L3 | 4.450 | 0 | 4.450 |
| L4 | 4.560 | 0 | 4.560 |
| L5 | 4.750 | 0 | 4.750 |
| L6 | 4.050 | 0 | 4.050 |
| L7 | 4.057 | +0.100 (K-1 final + Control 5 drift-audit) | 4.157 |
| **Composite** | **~4.34** | **+0.029 layer-local mean** | **~4.40** |

**REALISTIC CONDITIONAL** (codex range R-5): **4.30-4.42** (Path 2A only; both gates resolved + actual telemetry evidence + no double-counting)

**Status**: YELLOW upper (above Δ6 4.0; close to but BELOW 4.5 ship-gate)

---

## §6 Critical observation: 4.5 ship-gate may need W331 micro-wave

**Codex round-14 Axis 3 R-5 explicit critique**: "4.30-4.42 if Path 2A only; **4.5+ plausible only with stricter scoring trace, actual telemetry evidence, AND no double-counted L7 lift**".

**Gap analysis**: To reach ≥4.5 composite from 4.40 (W330 projection):
- **Option α — W331 micro-wave**: tighten scoring trace (no double-count L7), full telemetry evidence collected over 30-day window, additional supply-chain attest sources → est +0.10-0.15 composite lift
- **Option β — Path 2B pivot**: WSL2 migration unlocks K-1 +0.300 L1 lift (was +0.150) + L7 +0.200 lift (was +0.100) → est +0.20-0.30 composite lift, total 4.70-4.80; but 3-5 wave WSL2 prereq
- **Option γ — Accept 4.40 GREEN-MARGINAL**: revise sca-v11 ship-gate from 4.5 → 4.4 with operator-acceptance-record signed; T1 INSTALL floor lifts from 4.5 → 4.4 for self-evaluation only (preserves external candidate evaluation at 4.5)

**Claude recommendation**: Option α (W331 micro-wave). Composite quality is an asymptote-approach; getting from 4.40 to 4.55 is harder than 4.04 to 4.40. Plan a W331 micro-wave (~2h wall-clock) targeting:
- Stricter scoring trace doc (every K-N lift cite-anchored to actual evidence)
- 30-day telemetry evidence accrual post-K-2 (cumulative Langfuse spans + ledger row velocity)
- Composite re-score with W316-S5 8-layer extension if needed (add L8 audit-completeness)

---

## §7 Critical-path Gantt (REVISED post-codex)

```
W327-D (NOW)
  │
  ├─ K-1 OPERATOR-DECISION (W327-D-5 §1) ─────┐
  │                                            │
  ├─ K-2 LANGFUSE-KEY-VERIFY (§2) ─────────────┤
  │                                            ▼
W328 (5 parallel streams):
  Stream A K-1 reclassify (CONDITIONAL on §1)
  Stream B K-2 OTel (CONDITIONAL on §2)
  Stream C K-7 dwell
  Stream D K-5 minimal coordination (NEW)
  Stream E K-8 provenance-claim lint (NEW)
  │
  │    ┌───────────────────────────────────────┐
  │    │                                       │
  │    ▼                                       ▼
  │  K-3 needs K-2 D-EMP probe             K-6 needs K-1 ratify
  │  K-3+K-4 need K-5 minimal              K-5 full builds on W328 minimal
  │                                            │
  ▼                                            ▼
W329 (4 parallel streams):
  Stream A K-3+K-4 sca-v11 bundle (includes I9 version-bump for external-auditor scoring)
  Stream B K-5 full (SessionStart hook + merge-bot + redaction)
  Stream C K-6 hooks re-enable (signed-audit + protect-mcp + ECC un-disable)
  Stream D codex round-16
  │
  ▼
W330 (3 parallel streams):
  Stream A K-1 final (Control 2 audit-hook + Control 5 drift-audit)
  Stream B sca-v11 SHIP
  Stream C codex round-18 + composite re-score
  │
  ▼
Composite ~4.40 (YELLOW upper; below 4.5 ship-gate)
  │
  ▼
W331 micro-wave (optional):
  Stricter scoring trace + 30-day telemetry evidence + Option α gap closure
  Target composite ~4.55 (GREEN)
```

**Total wall-clock**: 3 sub-waves × ~4-5h each + W331 ~2h = **~14-17h** cumulative to ≥4.5 composite (Path 2A only).

---

## §8 Risk register (REVISED post-codex)

| Risk | Severity | Mitigation |
|---|---|---|
| Operator delays K-1 decision past W328 entry | HIGH | W328 Stream A blocked; lift drops to +0.05-0.07; W329 W330 cascade slips by 1 wave each |
| Langfuse keys fail to verify K-2 round-trip | MED | 24h wait for first span; if 0 spans → debug headers / project ID / firewall; W329 W330 sca-v11 §6 gate cannot ship |
| W328 Stream D K-5 minimal SCHEMA insufficient | MED | Codex round-14 did NOT critique schema specifics; round-16 will validate during W329 ratify |
| W328 Stream E K-8 provenance-lint shim ≤2KB exceeds budget | LOW | Pre-commit hook authorship: count chars; if >2KB, split into 2 shims |
| sca-v11 codex round-17 fires NEEDS-REVISION (I9 version-bump drift) | MED | Pre-commit `git diff --staged` verification (K-8 catches it now!); codex-r17 round-1 may NEEDS-REVISION; round-2 should APPROVE |
| K-1 Path 2B chosen mid-wave (operator pivots) | HIGH | W328-W330 plan re-sequenced to add WSL2 migration as W330+1 prereq; composite lift higher (4.70-4.80) but timeline 3-5 weeks |
| 4.5 ship-gate NOT reached post-W330 (codex R-5 critique) | HIGH | Option α: W331 micro-wave (recommended); Option β: Path 2B pivot; Option γ: revise ship-gate to 4.4 with acceptance-record |
| Multi-session race during W328-W330 | LOW (was MED) | K-5 minimal + K-8 BOTH ship in W328; double-defense against W320 + W326 race pattern |

---

## §9 Composite-quality projection chart (REVISED)

```
4.7 ┤
4.6 ┤
4.5 ┤━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ SHIP-GATE
4.4 ┤                                              ╱── W331 ~4.55 (Option α)
4.3 ┤                                       ╱──── W330 ~4.40
4.2 ┤                              ╱──── W329 ~4.30
4.1 ┤                       ╱──── W328 ~4.20 (BOTH gates)
4.0 ┤━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ Δ6 YELLOW BAND
3.9 ┤
3.8 ┤
3.7 ┤
3.6 ┤
3.5 ┤
3.4 ┤
3.3 ┤
3.2 ┤
    W325-A  W326-D  W327-D  W328     W329    W330    W331   GREEN
     4.336   4.036   (DOC)  ~4.12    ~4.20   ~4.40   ~4.55
                            (cnd.)   (cnd.)
```

**Note**: W328-W330 projections are CONDITIONAL on operator gates resolving by entry-time. W331 GREEN-band is contingent on Option α micro-wave (recommended).

---

## §10 Stop-criteria for plan execution

Plan execution MUST PAUSE and trigger operator-decision-cycle if:
1. W328 Stream A operator-decision (§1) returns "STAY-PARTIAL-HOLD" or "Path 2B" — re-sequence per Option β WSL2 migration path
2. W328 Stream B Langfuse keys fail verify after 24h — debug + rotate keys + re-attempt
3. Any K-N sub-wave triggers a codex round NEEDS-REVISION at session-end Stop-hook — investigate + remediate before next wave
4. Multi-session race detected (K-8 provenance-lint FIRES on commit) — investigate base_sha drift + retry

---

## §11 Cite-anchor master (REVISED)

- W327-D-1 §11 composite-lift projection (PRE-REVISION; codex round-14 corrected)
- W327-D-2 §1 codex round-14 verbatim 4-axis verdict
- W327-D-3 anti-bias gate ratify of 5/5 codex recommendations
- W316-S5 7-layer Blueprint composite-score formula (LAYER-LOCAL vs COMPOSITE)
- W326-D-2 §Summary statistics (codex round-13 7 concerns)
- W326-CODEX-R1-CLOSURE.md L26-35 (provenance lint precedent) + L45-47 (multi-session race lessons)
- W325-R5-UNBLOCK-EXPLORE Stream C full 6 docs (R5 Option C wire-up + Path 2A vs 2B vs STAY)
- sca-v10 SKILL.md §5b D42-D45 + §6 Controls 1-5 + §8 I9 EXTENDED (revision target)
- External SOTA per K-N: NIST 800-53, OWASP, ISO 19011, SOX §404, COBIT 5, SLSA v1.0, in-toto, Conventional Commits, CNCF, ITIL v4, PMBOK Critical Path Method, Google SRE, DORA, OpenTelemetry CNCF spec, Lamport 1978, JLS §17
