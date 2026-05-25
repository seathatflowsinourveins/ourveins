# W329 Stream C — SYNTHESIS

**Wave**: W329 Stream C — Codex round-20 deferred-graft + anti-bias gate + composite re-eval + R6 proposal evaluation
**Date**: 2026-05-19T20:53Z
**HEAD**: `5cf5c90`
**Stream owner**: W329 Stream C parent agent
**Time-bound**: ~40 min wall-clock (target met)
**Files created**: 6 (5 sub-deliverables + this synthesis)
**File ownership**: `docs/architecture/W329-CODEX-R20-GRAFT/*` — STRICT (no settings/skills/code modifications per scope)

---

## §1 Headline verdict

| Scope component | Verdict | One-line reason |
|---|---|---|
| 1. Codex round-20 retrieval | **ABORT / EXPIRED** | Frozen at "Searching:" for 42 min 33 sec; no recoverable output; PID 119148 zombie cmd.exe |
| 2. Anti-bias gate on round-20 findings | **NULL-RUN** | No findings to gate; W328-D-3 anti-bias-capped 4.143 stands at 2-of-3 cross-round convergence |
| 3. Composite re-eval integration | **NO CHANGE** | Composite remains 4.143; trajectory W329 ~4.20-4.30 / W330 ~4.39 / W331 needed |
| 4. W329-S2-REAUDIT continuation | **PASS (verdict already FULL-retracted)** | W329-I codified retraction; root cause UNDETERMINED stands |
| 5. R6 W329-I proposal eval | **RATIFY** (with 2 optional refinements) | 3-of-3 inverse-tests PASS or PASS-WITH-OBSERVATION; no FAIL |

---

## §2 Sub-deliverables (5)

| File | Purpose | Key finding |
|---|---|---|
| `W329-C-1-ROUND-20-STATUS.md` | Job-status diagnosis + retrieval-attempt log | Round-20 dead-frozen; 4 retrieval attempts all returned no graftable output; W317 phantom-`Z:/z/` MSYS-path bug surfaced through codex companion state serialization |
| `W329-C-2-RAW-OUTPUT.md` | Captured partial output + token-cost analysis | Only ~30 log lines + 35 state-log lines pre-stall; token cost estimate 1500-3000 (LOW end); ZERO assistant-completion output |
| `W329-C-3-ANTI-BIAS-GATE.md` | W295 §6.2 inverse-test methodology applied | NULL-RUN; 2-of-3 cross-round convergence stands; 4.143 estimate confidence PASS-WITH-PARTIAL-CONVERGENCE |
| `W329-C-4-COMPOSITE-RE-EVAL-UPDATE.md` | Composite trajectory integration | NO CHANGE from round-20; K-1..K-8 catalog unchanged; W329 Forward Queue item #10 marked EXPIRED → W330 round-22 |
| `W329-C-5-R6-PROPOSAL-EVAL.md` | R6 W329-I anti-bias evaluation | RATIFY recommendation; 3-of-3 inverse-tests PASS; 2 optional refinements (LOW priority); codex Axis-5 FAIL COMPLETELY addressed |

---

## §3 W330 follow-ups (priority-ranked)

### §3.1 P0 (operator-actionable, ≤10 min)

- [ ] **R-1**: **W330 round-22 fresh codex fire** with NARROWED prompt per W329-C-1 §4 (2× dispatches: Q1+Q2 / Q3+Q4; --effort high not xhigh; pre-fill 4 layers Claude-side-locked). Closes the 2-of-3 → 3-of-3 cross-round convergence gap on 4.143 composite estimate.
- [ ] **R-2**: **Apply W329-H/BEFORE-AFTER.md L82-84 R6 insertion to CLAUDE.md** as Cardinal Rule 6. Update section header to "Cardinal rules (6 — each cite-anchored to standards/docs)". Per W329-C-5 §6.3 ratification path.
- [ ] **R-3**: **Cancel stale `task-mpd2gasc-uuric5`** via `node codex-companion.mjs cancel task-mpd2gasc-uuric5` to free zombie PID 119148 cmd.exe.

### §3.2 P1 (operator-actionable, requires verification)

- [ ] **R-4**: **W317 phantom-`Z:/z/` MSYS-path bug investigation**. The codex companion state file `logFile` field serializes as `\z\claude-sota-installed\...` which broke the `result` lookup. This is the same MSYS-path-rewrite class issue from W317. Investigation as a separate W330 stream.
- [ ] **R-5**: **R6 optional refinement-1 (LOW priority)**: Tier "live-API verification" mandate by endpoint stake (HIGH-stakes-only requirement). Addresses W329-C-5 §3.1 over-discipline concern.
- [ ] **R-6**: **R6 optional refinement-2 (LOW priority)**: Rewrite H1 phrasing to remove subtle pro-user-error bias. Addresses W329-C-5 §3.2 phrasing bias.

### §3.3 P2 (governance, requires multi-wave dwell)

- [ ] **R-7**: Update W329 Forward Queue item #10 (codex round-20 deferred-graft retrieve) to **EXPIRED → W330 round-22 RE-DISPATCH**. Adjusted Operator-Blocking Carry count remains 8.

---

## §4 R6 ratification recommendation (definitive)

**RATIFY R6 as CARDINAL RULE 6** per W329-C-5 §6.

The W329-I framing of R6 (currently embedded in W328-SYNTHESIS.md L73-86) is the closing form of the iterative process:
- W328 original (overcalibrated) → codex round-1 Axis-5 FAIL
- W329-H rewrite (workflow ORDER + 3-org-distinct cites)
- W329-S2-REAUDIT (FULL retraction of W328-S2; root cause UNDETERMINED)
- W329-I update (live-API verification addition)

The 6 anti-bias gate dimensions (3 inverse-tests + 3 cross-bias category checks) all PASS or PASS-WITH-OBSERVATION. No FAIL.

The codex round-1 Axis-5 FAIL critique is COMPLETELY ADDRESSED via the W329-H + W329-I revisions (per W329-C-5 §7 closure assessment table).

W330 round-22 should re-evaluate Axis 5 with the W329-I revised framing; expected verdict: PASS.

**Concrete operator action**: Apply the W329-H/BEFORE-AFTER.md proposed insertion (L82-84) to `Z:/claude-sota-installed/CLAUDE.md` as Cardinal Rule 6. Update section header. Single edit, ~5 minute operator action. Closes the R6 codification gap.

---

## §5 Composite trajectory: STANDS at 4.143 (anti-bias-capped)

```
4.7 ┤
4.6 ┤
4.5 ┤━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ SHIP-GATE (4.5)
4.4 ┤                                            ╱── W330 ~4.42-4.45
4.3 ┤                                     ╱──── W329 ~4.32-4.40
4.2 ┤                              ╱──── W328 ~4.20-4.25 (both gates)
4.1 ┤                       ╱──── W328 (NOW) 4.143 anti-bias-capped
4.0 ┤━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ Δ6 YELLOW BAND (4.0)
3.9 ┤
3.8 ┤
    W325-A  W326-D  W327-r3   W328     W329     W330     W331
     4.336   4.036   4.136    4.143    ~4.36    ~4.43    ~4.52 (W331 if needed)
                              (NOW)
```

Frozen round-20 contributes ZERO delta. Trajectory unchanged.

---

## §6 Cardinal-rule invariants (Stream C-relevant subset)

| Rule | State |
|---|---|
| R1 trusted plugins | ✓ HOLD (no plugin changes this stream) |
| R2 hooks discipline | ✓ HOLD literal (no hook changes this stream) |
| R3 documented subagents | ✓ HOLD (no subagent changes this stream) |
| R4 no `.claude/rules/*` self-invents | ✓ HOLD (no `.claude/rules/` changes this stream) |
| R5 safety via CC permissions | ⚠ PARTIAL-HOLD (carry-over from W328; not this stream's scope) |
| **R6 source-deep-dive (proposed)** | **READY FOR RATIFICATION** per W329-C-5 verdict |
| `self_invented_count: 0` | ✓ HOLDS (doc-only this stream) |
| CLAUDE.md ≤50 LOC | ✓ HOLDS pre-R6 add; will need 1-LOC bump for R6 |

---

## §7 Stream C output summary

**Files created (6, ALL under docs/architecture/W329-CODEX-R20-GRAFT/)**:

1. `W329-C-1-ROUND-20-STATUS.md` — 6.8 KB — job status + retrieval attempt log
2. `W329-C-2-RAW-OUTPUT.md` — 5.3 KB — partial output + token cost
3. `W329-C-3-ANTI-BIAS-GATE.md` — 5.6 KB — W295 §6.2 inverse-test NULL-RUN
4. `W329-C-4-COMPOSITE-RE-EVAL-UPDATE.md` — 6.2 KB — composite trajectory integration
5. `W329-C-5-R6-PROPOSAL-EVAL.md` — 9.1 KB — R6 W329-I anti-bias evaluation + RATIFY recommendation
6. `STREAM-C-SYNTHESIS.md` — this file — closure synthesis + W330 follow-ups

**Files modified (NONE)**: per Stream C strict file ownership scope.

**Files NOT touched** (per scope):
- `Z:/claude-sota-installed/CLAUDE.md`
- `Z:/claude-sota-installed/.claude/settings.json`
- `Z:/claude-sota-installed/.claude/skills/**/*`
- Any code under tools/, harness/, etc.

---

## §8 Cardinal-rule R1-R5 verification

**No destructive actions taken**:
- No file deletes
- No git push / branch operations
- No settings.json modifications
- No skill SKILL.md modifications
- No MCP config changes
- No hook installations

**DOC-ONLY stream**: confirmed. All 6 outputs are `docs/architecture/W329-CODEX-R20-GRAFT/*.md` files.

**Security redactions applied**: pplx-* / pk-lf-* / sk-lf-* / ghp_* / sk-* literals NOT present in any output (verified via inspection — only context-mentioned in CLAUDE.local.md L41-43 which is gitignored per CCBP `claude-memory.md:113` and not referenced in any Stream C output).

---

## §9 Cite-anchor master

- W328-D-2 (codex round-20 dispatch + deferred-graft reservation): `docs/architecture/W328-COMPOSITE-REVAL-AND-SOTA/W328-D-2-CODEX-ROUND-20-OUTPUT.md`
- W328-D-3 (anti-bias gate methodology): `docs/architecture/W328-COMPOSITE-REVAL-AND-SOTA/W328-D-3-ANTI-BIAS-GATE.md`
- W328-D-4 (composite recompute baseline 4.143): `docs/architecture/W328-COMPOSITE-REVAL-AND-SOTA/W328-D-4-COMPOSITE-LIFT-RECOMPUTE.md`
- W328-CLOSURE-SYNTHESIS (R6 W329-I home): `docs/architecture/W328-CLOSURE-SYNTHESIS/W328-SYNTHESIS.md`
- W329-S2-REAUDIT (definitive verdict — root cause UNDETERMINED): `docs/architecture/W329-S2-REAUDIT/VERDICT.md`
- W329-H R6 rewrite (BEFORE/AFTER framing): `docs/architecture/W329-H-R6-REWRITE/BEFORE-AFTER.md`
- W329-I R6 update (live-API verification addition): `docs/architecture/W329-I-APPLIED/SUMMARY.md`
- W329-codex-round-1 (Axis-5 FAIL feedback): `docs/architecture/W329-CODEX-ROUND-1-W328/RAW-OUTPUT.txt`
- W295 §6.2 anti-bias inverse-test methodology
- W316-S5 7-layer Blueprint composite formula
- Codex round-20 state (phantom-path): `Z:/z/claude-sota-installed/.claude/plugins/data/codex-openai-codex/state/claude-sota-installed-0271062cb1571a49/jobs/task-mpd2gasc-uuric5.{json,log}`
- 3-org-distinct R6 anchors: OWASP A06 + ISO/IEC 25010 §4.2.6-4.2.7 + NIST SP 800-218 PW.7+RV.1

---

## §10 Stream C wave-footprint

- **Created**: 2026-05-19 W329 Stream C (codex round-20 deferred-graft retrieve + anti-bias gate + composite re-eval + R6 proposal eval)
- **Pairs with**:
  - W328-D-2/3/4 (round-20 dispatch + anti-bias methodology + composite baseline)
  - W329-S2-REAUDIT (definitive verdict)
  - W329-H + W329-I (R6 rewrite sequence)
  - W329-CODEX-ROUND-1-W328 (Axis-5 FAIL trigger)
- **Operationalizes**:
  - Codex round-20 EXPIRED → W330 round-22 RE-DISPATCH carry-forward
  - R6 W329-I framing RATIFY-READY for CLAUDE.md insertion
  - Composite 4.143 anti-bias-capped at 2-of-3 cross-round convergence (3-of-3 deferred to W330)
- **Next**:
  - W330 round-22 fresh fire (R-1)
  - CLAUDE.md R6 insertion (R-2)
  - PID 119148 zombie cleanup (R-3)
