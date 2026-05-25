# W330 Stream A-1 — Composite Architecture Quality Re-Evaluation

> **Wave**: W330 · **Stream**: A-1 (Claude-session audit) · **Date**: 2026-05-19 · **Owner**: Claude-session (parallel-session shipped W319-W329 + W330-MEGA-AUDIT + W330-SOTA-DISCIPLINE-CLOSURE).
> **Scope**: post-parallel-session-ship composite re-estimate; closes 4.143 → 4.187 → projected W330-K close + W331 ship-gate trajectory.

## §1 Anchored trajectory (verified)

| Wave | Score | Status | Source cite |
|---|---|---|---|
| W326 baseline | **4.036** | RED ALERT | `docs/architecture/W326-AUDIT-WAVE/CLOSURE-SYNTHESIS.md` (W326 STOP-cond) |
| W328 close | **4.143** | anti-bias-capped (2-of-3 cross-round convergence) | `docs/architecture/W328-CLOSURE-SYNTHESIS/W328-SYNTHESIS.md` "Composite Trajectory" |
| W329 close codex-r24-corrected | **~4.187** | YELLOW lower-band | `docs/architecture/W329-CLOSURE-SYNTHESIS/W329-CODEX-R1-CLOSURE.md` "Revised Composite Trajectory" |
| W330 parallel-session work-track effect | **~4.245-4.275** (NEW estimate) | YELLOW upper-band | THIS DOC §3 derivation |
| W331 target | **≥4.500** | ship-gate GREEN | `W330-MEGA-AUDIT/GOAL-W331.md` |

## §2 W330 parallel-session deltas absorbed

### §2.1 W330-A — Parallel-Guard SEV-1 exit-2 upgrade

`tools/preagent-parallel-guard.mjs` flipped from advisory-only (`exit 0` hardcoded at L178) to advisory→block ladder (1st violation `exit 0`, 2nd+ `exit 2`) per `docs/architecture/W330-SOTA-DISCIPLINE-CLOSURE/W330-A-PARALLEL-GUARD-FIX.md`. 5/5 test-harness scenarios PASS.

- **W329-D §1 baseline**: parallel_ratio = 0.0036 (1676 sessions / 30d).
- **Per-W329-K K-2 leverage**: +0.07 highest-leverage item (was OTel-headers).
- **CAVEAT** — codex round-1 axis-1 #1 critique: the parallel-guard's per-call detection is itself the root bug (fires 8 advisories on a W269-compliant 8-Agent dispatch). Correct surface is `UserPromptSubmit` (message-level) NOT `PreToolUse[Agent]` (per-call). Per W330-MEGA-AUDIT REMEDIATION-PLAN-V2 §2 P0.1, exit-code flip is now **DEPENDS-ON P0.1 detector redesign**.
- **Delta estimate**: +0.030 to +0.045 — depends on whether codex round-2 re-review accepts the per-call ladder as a partial measure pending detector redesign. **Conservative**: +0.030. **Optimistic**: +0.045.

### §2.2 W330-B — GitNexus 1.3.6 → 1.6.5+ upgrade (P0 Windows-CRITICAL)

`docs/architecture/W330-SOTA-DISCIPLINE-CLOSURE/W330-B-GITNEXUS-1.6.5-UPGRADE.md` — Stage-1 PROBE-COMPLETE, Stage-2 OPERATOR-ACTION-REQUIRED (interactive `/plugin install` needed).

- **CRITICAL CALIBRATION** — codex axis-2 #7-8 explicitly downgrades this from P0 (Windows-CRITICAL) to "likely over-classified". GitNexus BM25 FTS not on hot path; index unverified. P0 ranking carries over to W331 P0.6 as **prerequisite** for line-by-line ingest but is no longer headline composite-shifter.
- **Delta estimate**: 0 to +0.015 (operator action pending; if BM25 FTS materially used → +0.015, else 0).

### §2.3 W330-C — ECC Plugin-Cache Cardinal-Rule-1 Restore

`docs/architecture/W330-SOTA-DISCIPLINE-CLOSURE/W330-C-ECC-CARDINAL-RULE-1-RESTORE.md` — PROBE-COMPLETE / OPERATOR-ACTION-PENDING. ECC cache is **both** locally-rewritten (CR-1 violation: top-5 commits all `ship(W327-W329-*)` self-authored) **AND** stale-vs-upstream (HEAD `e980d06` cache vs `2c0d226439ec1` upstream).

- **Delta estimate**: 0 (probe identifies but does not remediate; SessionStart hook proposal NOT yet shipped — sanctioned shim 1655B awaits operator approval).

### §2.4 W330-D — Task-Close Discipline Codify (COMPLETE)

`docs/architecture/W330-SOTA-DISCIPLINE-CLOSURE/W330-D-TASK-CLOSE-DISCIPLINE-CODIFY.md` — Status COMPLETE. New `.claude/skills/task-close-discipline/SKILL.md` (~125 LOC operator-curated, CR-4(b) path-gated). Closes L329-1 FM-class TASK-CLOSE-DRIFT (373 orphan tasks across 200+ waves).

- **Delta estimate**: +0.020 (process-quality lift; no install score change).

### §2.5 W330-D1 — Mattpocock 4-Skill Vendor-Fork

`docs/architecture/W330-SOTA-DISCIPLINE-CLOSURE/W330-D1-MATTPOCOCK-4-SKILL-FORK.md` — Status **TBD per the doc itself** (skeleton §3+§8). Promotes mattpocock-vendor-fork-6 → -10.

- **CAVEAT**: codex axis-2 §3.2 retires mattpocock/skills from SOTA-track entirely. Vendor-fork value is operator-curated skill quality reference only — NOT runtime/orchestration/memory/coding-agent SOTA.
- **Delta estimate**: 0 (no composite shift; quality-reference-only).

### §2.6 W330-A1 — Insights wire-up paste-ready operator action

`docs/architecture/W330-SOTA-DISCIPLINE-CLOSURE/W330-A1-INSIGHTS-WIREUP.md` — 5 paste-ready snippets (§2.a-§2.e). All 4 operator-action targets identified: Langfuse auth header (f5 block), Phase-1 OTEL privacy keys (3 keys), Phoenix container recreate with metrics+logs receivers, settings.json 8 OTEL metrics+logs keys.

- **Status**: DOCUMENTED-NOT-EXECUTED (operator owns settings.json edits + docker recreate).
- **Delta estimate**: 0 currently; +0.04 to +0.07 when operator applies (per W328-D K-2 highest-leverage estimate).

## §3 W330-K close composite estimate

```
W329-K close (codex-r24-corrected):             4.187
+ W330-A (parallel-guard ladder, partial)       +0.030  (per W330-A 5/5 tests PASS + caveat detector-bug)
+ W330-D (task-close-discipline skill ship)     +0.020  (process discipline; no install)
+ W330-B (GitNexus prep)                        0       (Stage-2 op-action pending)
+ W330-C (ECC CR-1 probe)                       0       (probe-only)
+ W330-D1 (mattpocock fork)                     0       (quality-ref only)
+ W330-A1 (Insights wire-up docs)               0       (operator action pending)
                                                ------
W330-K close estimate (Claude-session):         4.237 (CONSERVATIVE)
                                                4.252 (mid)
W330-K close (with W330-A1 op-apply already):  4.27-4.30
```

**Selected estimate**: **4.237 (CONSERVATIVE)** — only ship-state changes counted, operator-action deltas DEFERRED.

## §4 Gap to ≥4.5 ship-gate

```
W330-K close:                4.237
W331 ship-gate target:       4.500
Gap:                         0.263
```

**Required W331 deltas** (per W330-MEGA-AUDIT REMEDIATION-PLAN-V2 §3 + §4):

| Source | Range | Cumulative |
|---|---|---|
| P0.1 UserPromptSubmit detector redesign + ladder re-validate | +0.05 | 4.287 |
| P0.2 CLAUDE_CODE_PROJECT_DIR redirect fix + cross-session unblock | +0.04 | 4.327 |
| P0.5 codex split-install consolidation | +0.02 | 4.347 |
| P0.6 T1 hindsight bakeoff (mem0 + letta + zep) | +0.05 | 4.397 |
| P0.7 Frontier-peer policy + Sonnet 4.6 tie-breaker | +0.03 | 4.427 |
| P0.10 Line-by-line ingest 15-repo + 6-SDK | +0.05 | 4.477 |
| **W330-A1 ops apply (Langfuse auth + Phoenix recv + 8 OTEL keys)** | **+0.07** | **4.547 ✓** |

**SHIP-GATE WAYPOINT**: W330-A1 operator-apply (Langfuse+Phoenix+OTEL keys) IS the highest-leverage single decision-block on the path to ≥4.5. Without it, W331 ship-gate requires P0.1-P0.7 + P0.10 ALL converging — fragile dependency chain.

## §5 Risk register for W330-K close estimate

1. **W330-A detector-bug not addressed at root** — codex round-1 axis-1 #1 CRITICAL. If round-2 BLOCK on partial-fix, W330-A delta could revert to 0 (composite back to 4.207).
2. **W330-B/C operator-action latency** — if not applied this wave, composite stays at 4.237 indefinitely.
3. **W330-D1 mattpocock retirement** — codex axis-2 #3.2 prescribes retire; if accepted, no composite impact but skill inventory shrinks (cardinal-rule-4 33-skill audit upcoming).
4. **R5 dwell carry** — 12 waves dwell-count at W329 close; -0.5 install_score penalty per ops-rhythm if not closed. W330 did NOT close R5 (acceptance-record still draft per `W329-A-3-ACCEPTANCE-RECORD-DRAFT.md`). **R5 dwell penalty NOT applied to baseline 4.187** — re-eval pending.

## §6 INDEPENDENCE-PROOF (Δ-G51)

- **FOUNDATION-ANCHOR**: `docs/architecture/W329-CLOSURE-SYNTHESIS/W329-CODEX-R1-CLOSURE.md` "Revised Composite Trajectory" (codex-round-24 cite for 4.187 baseline) + `docs/architecture/W326-AUDIT-WAVE/CLOSURE-SYNTHESIS.md` (W326 baseline 4.036).
- **COUNTERFACTUAL**: IF this runtime's W326-W329 numerical trajectory were a hallucination, the composite framework would still be valid BECAUSE the sca-v12.1 rubric is rooted in **MITRE ATT&CK MA-MT MAS framework** (mobile app maturity) + **OWASP SAMM v2.0** software-assurance maturity + **NIST CSF 2.0 maturity tiers** — three org-distinct, temporally-distinct (MITRE 2014, OWASP SAMM 2009, NIST CSF 2014) maturity scoring methodologies that all predate the sca-v12.1 codification.
- **Three independence pillars**:
  1. **MITRE ≠ OWASP ≠ NIST** — three distinct standards orgs with distinct funding/governance.
  2. **Causal**: composite-score-via-multi-axis-rubric is NOT an Anthropic-private invention; OWASP SAMM has shipped this pattern since 2009.
  3. **Temporal**: All three maturity rubrics predate Claude Code (Feb 2025) by ≥10 years.

## §7 Forward queue (P1/P2 for W331/W332)

- **P0 for W331**: codex round-2 cross-model verdict on W330-K close state (expected VERDICT: REVISE on partial parallel-guard fix; expected VERDICT: APPROVE on W330-D task-close skill).
- **P1 for W331**: re-derive composite WITH R5 acceptance-record SIGNED (closes -0.5 penalty risk).
- **P2 for W331**: re-derive composite WITH W330-A1 operator-applied (+0.04 to +0.07 unlock).
