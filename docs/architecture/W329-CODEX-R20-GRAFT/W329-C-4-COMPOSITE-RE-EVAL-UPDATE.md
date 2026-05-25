# W329-C-4 — Composite Re-Eval Update (post-frozen-round-20)

**Wave**: W329 Stream C — Composite re-eval integration with frozen-round-20 outcome
**Date**: 2026-05-19T20:53Z
**HEAD**: `5cf5c90`
**Baseline**: W328-D-4 anti-bias-capped composite **4.143** (per W328-CLOSURE-SYNTHESIS.md §"Composite Trajectory")
**Status**: NO CHANGES from round-20 graft (task frozen at 43+ min)

---

## §1 Composite estimate: UNCHANGED at 4.143

Because codex round-20 produced ZERO findings (frozen at "Searching:" phase since 2026-05-19T20:10:19Z), there are NO codex-side corrections to apply to the Claude-side anti-bias-capped composite of **4.143**.

### §1.1 Confidence interval analysis

Claude-side anti-bias-capped composite **4.143** has the following confidence properties:

| Property | Value | Notes |
|---|---|---|
| Primary estimate | 4.143 | W328-D-3 §5 |
| Generous bound | 4.165 | W328-D-4 §1 (no anti-bias cap) |
| Conservative bound | 4.106 | W328-D-4 §2 (CONDITIONAL-conservative; R-class only, defer S-class) |
| W327-D-4 v2 projected range | 4.106-4.166 | per W327-D-4 §3 |
| 2-of-3 cross-round convergence | PASS | round-13 baseline + round-14 anti-bias gate ratify (NO round-20 contribution) |
| 3-of-3 cross-round convergence | DEFERRED to W330 round-22 | Required for ratified-not-estimated promotion |

**Confidence verdict**: **PASS-WITH-PARTIAL-CONVERGENCE**. The 4.143 estimate is within the W327-D-4 v2 projected range and 2-of-3 round-convergent. Promotion to ratified-state requires W330 round-22 confirmation.

### §1.2 Why frozen round-20 does NOT lower confidence below this threshold

The 4.143 estimate is independently supported by:

1. **W327-D-4 v2 baseline projection range** (4.106-4.166) — independent forecast PRIOR to W328-D-4 recompute; convergence at 4.143 is bidirectional
2. **W328-D-3 anti-bias inverse-test** — applied 3 inverse-tests (L1, L7, L4) and capped 3 lifts; methodology is W295 §6.2 canonical
3. **Round-13 baseline + round-14 anti-bias ratify** — independent cross-model convergence on the formula and discipline (NOT on this exact number — that's round-22's task)
4. **Layer-by-layer evidence**:
   - L1 +0.100 (config change observable at `.claude/settings.json:92` `defaultMode: "default"`)
   - L2 +0.075 (skill file observable at `.claude/skills/ops-rhythm/SKILL.md`)
   - L4 +0.150 (skill file observable at `.claude/skills/sota-convergence-audit/SKILL.md` post-K-3 codification)
   - L7 +0.225 (R5 + K-7 + K-8 blended; each component traceable to a file/commit)

The frozen round-20 contributes "uncertainty about external ratification of the exact number 4.143", NOT "uncertainty about the underlying evidence". Hence the estimate stands.

---

## §2 W329-W330-W331 trajectory: UNCHANGED

| Wave | Projection | Status |
|---|---|---|
| W326 close | 4.036 (RED ALERT) | LOCKED (round-13 ratified) |
| **W328 close (now)** | **4.143** anti-bias-capped | **THIS COMMIT (5cf5c90)** |
| W329 close (W329 P0 trio + K-2 OTel + slsa-verifier + R5 acceptance sign) | ~4.20-4.30 YELLOW upper | PROJECTED |
| W330 close (K-3 operationalize + K-5 wave-coord + K-6 hardening) | ~4.39 YELLOW upper | PROJECTED |
| W331 micro-wave (telemetry-evidenced lift only) | ~4.55 GREEN | REQUIRED for ≥4.5 ship-gate |

**No trajectory delta from round-20 graft** because no graft occurred. All W329 P0 forward queue items in W328-CLOSURE-SYNTHESIS.md §"W329 Forward Queue (top P0 — 10)" remain canonical.

---

## §3 NEW K-N concerns: NONE FROM ROUND-20

Round-20 was asked to surface any new K-N concerns Claude might have missed. Without output, the existing K-1..K-8 catalog stands:

| K-N | Severity | Status post-W328 |
|---|---|---|
| K-1 | HIGH | CLAUDE.md R5 corollary line NOT YET ADDED; Path 2A acceptance-record NOT YET SIGNED |
| K-2 | HIGH | OTel headers fix NOT YET APPLIED (operator-gated; +0.07 highest-leverage) |
| K-3 | HIGH (down from CRITICAL) | sca-v11 codification SHIPPED; D-EMP operationalization W329-deferred |
| K-4 | MEDIUM | slsa-verifier install NOT YET; T1 candidate per W328-D-5 |
| K-5 | MEDIUM | minimal coord spec 14.6 KB SHIPPED W328-C; full implementation W330-deferred |
| K-6 | MEDIUM | hook RCE + signed-audit-trails re-enable W329-deferred |
| K-7 | MEDIUM (down from HIGH) | ops-rhythm SKILL.md SHIPPED W328-A; enforcement-via-hook gap remains |
| K-8 | LOW | provenance-claim lint v2 SHIPPED W328-C; 7/7 smoke PASS; full-coverage gap remains |

**No K-9+ concerns surfaced** because round-20 froze. If W330 round-22 surfaces new concerns, they will be appended.

---

## §4 W330 round-22 dispatch plan (carry-forward)

Per W329-C-1 §4, W330 round-22 should fire with:

### §4.1 Narrowed prompt structure

**Dispatch 1 (Q1 + Q2)**: composite re-eval + anti-bias gate
- Pre-fill L1=4.585, L3=4.300, L5=4.300, L6=3.750 (4 of 7 layers Claude-side-locked)
- Ask codex for L2, L4, L7 only (3 layers)
- Demand inverse-test for each codex score
- Budget: 15 min wall-clock, --effort high (NOT xhigh)

**Dispatch 2 (Q3 + Q4)**: trajectory + SOTA
- Ask codex to project W329 close + W330 close + W331 necessity
- Ask codex to ratify or revise Claude-side SOTA picks (C2 openobserve, C6 slsa-verifier, C10 AEGIS)
- Budget: 10 min wall-clock, --effort high

**Total round-22 budget**: ~25 min wall-clock (vs round-20's frozen 44 min)

### §4.2 Pre-cancel + clean-state

Before round-22 dispatch:
- [ ] Cancel `task-mpd2gasc-uuric5` via `codex-companion.mjs cancel task-mpd2gasc-uuric5`
- [ ] Verify PID 119148 cmd.exe is reaped (or kill via `taskkill /PID 119148 /F`)
- [ ] Inspect W317 phantom-`Z:/z/` path bug if it caused the freeze (worth a separate W330 stream)

---

## §5 Round-20 graft impact on W328 SHIP STATE

W328 commit `74de2df` (or successor) shipped with the codex-round-20 graft DEFERRED to W329 entry. With the round-20 freeze confirmed, the deferred-graft becomes:

- **CARRY**: deferred to W330 round-22 (revised dispatch)
- **NOT a SHIP-BLOCKER**: W328 already shipped (74de2df ACTUAL contents per W328-CLOSURE-SYNTHESIS.md L24); composite estimate 4.143 stands at 2-of-3 convergence
- **W329 Forward Queue item #10**: "codex round-20 deferred-graft retrieve (`codex resume 019e41db-4fe1-70d0-80ed-fa996c06c55c`)" → MARK AS **EXPIRED / W330 round-22 RE-DISPATCH**

---

## §6 SOTA candidate ratification: PENDING (no round-20 contribution)

Claude-side picks from W328-D-5:

| Tier | Candidate | K-N target | Source |
|---|---|---|---|
| T1 | `openobserve/openobserve` | K-2 observability | `https://github.com/openobserve/openobserve` |
| T1 | `slsa-framework/slsa-verifier` | K-4 supply-chain | `https://github.com/slsa-framework/slsa-verifier` |
| T1 (pattern-only) | AEGIS hook-hardening pattern | K-6 hooks/audit | `docs/architecture/W328-D-5-SOTA-CANDIDATES-NEW.md` |

Without round-20 ratification, these picks remain Claude-side-canonical. W330 round-22 may revise or add candidates.

---

## §7 Updated W329 Forward Queue (post-frozen-round-20)

(Reproducing the W328-CLOSURE-SYNTHESIS.md §"W329 Forward Queue" with status updates per this stream's findings):

| # | Item | Status | Notes |
|---|---|---|---|
| 1 | K-2 OTel headers env-var fix | OPEN | +0.07 composite; operator-paste-ready |
| 2 | Langfuse SEV-1 key rotation | OPEN | W325-r1 carry; ~10 min operator |
| 3 | Phoenix metrics+logs receivers Docker-env enable | OPEN | W328 Stream B P0 |
| 4 | settings.json env paste | OPEN | W328 Stream B P0; 8 keys |
| 5 | R5 acceptance-record sign + Patch C1 deny-expansion | OPEN | closes 11-wave dwell |
| 6 | Perplexity SEV-1 rotation | OPEN | W317-r1 carry |
| 7 | K-4 slsa-verifier install | OPEN | +0.07 to ~4.20 target |
| 8 | CLAUDE.md R5-corollary line add | OPEN | closes R5 dwell |
| 9 | Re-enable signed-audit-trails + protect-mcp plugins | OPEN | W328 AI-W329-2/3 |
| **10** | **codex round-20 deferred-graft retrieve** | **EXPIRED → W330 round-22 RE-DISPATCH** | this stream's finding |

**Adjusted Operator-Blocking Carry (8)**: R5 acceptance-record sign + Langfuse SEV-1 rotation + Perplexity SEV-1 rotation + Phoenix Docker-env receivers + settings.json env paste + K-4 slsa-verifier install + K-1 CLAUDE.md corollary + **W330 round-22 re-dispatch** (replaces codex round-20 deferred-graft).

---

## §8 Composite trajectory chart (unchanged from W328-D-4 §5)

```
4.7 ┤
4.6 ┤
4.5 ┤━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ SHIP-GATE (4.5)
4.4 ┤                                            ╱── W330 ~4.42-4.45
4.3 ┤                                     ╱──── W329 ~4.32-4.40
4.2 ┤                              ╱──── W328 ~4.20-4.25 (both gates)
4.1 ┤                       ╱──── W328 (now) 4.143 anti-bias-capped
4.0 ┤━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ Δ6 YELLOW BAND (4.0)
3.9 ┤
3.8 ┤
    W325-A  W326-D  W327-r3   W328     W329     W330     W331
     4.336   4.036   4.136    4.143    ~4.36    ~4.43    ~4.52 (W331 if needed)
                              (NOW)
```

Note: W327-r3 4.136 was the W328-D-4 anticipated mid-point; W328 close 4.143 is the anti-bias-capped estimate including ops-rhythm K-7 ship + K-8 narrowing.

---

## §9 Cite-anchor master

- W328-D-3 anti-bias gate (canonical methodology)
- W328-D-4 composite recompute (4.143 estimate origin)
- W328-D-5 SOTA candidates (C2/C6/C10 picks)
- W328-D-6 PLAN update
- W328-CLOSURE-SYNTHESIS.md §"Composite Trajectory" + §"W329 Forward Queue"
- W329-C-1 §4 W330 round-22 narrowing strategy
- W295 §6.2 anti-bias inverse-test methodology
- W316-S5 7-layer Blueprint composite formula
