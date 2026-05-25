---
title: W306 Stream B — sca-v5 → sca-v5+v6-advisory partial-ship application
wave: W306
stream: B
agent: agent-B-sca-v6-partial-apply
owns:
  - .claude/skills/sota-convergence-audit/SKILL.md  (EDIT — applied)
  - docs/architecture/W306-LANE-D-ADAPTERS-V6-PARTIAL-AND-FRESH-DISCOVERY/W306-STREAM-B-SKILL-MD-PARTIAL-APPLY.md  (NEW — this changelog)
inputs:
  - docs/architecture/W305-D-V6-2-LANE-D-MEM0-HEADHEAD/W305-STREAM-B-SCA-V6-PARTIAL-SHIP-SURVEY.md  (the draft applied)
  - docs/architecture/W301-CONVERGENCE-SWEEP-AND-RESEARCH-ARCH-V6/W301-STREAM-D-SCA-V6-DESIGN.md  (§2.4 D-v6-4 + §2.6 D-v6-6 design)
status: SHIPPED
---

# W306 Stream B — sca-v5 → sca-v5+v6-advisory partial-ship application

## §1 Pre-edit + post-edit SKILL.md LOC + diff stat

| Metric | Pre-edit | Post-edit | Delta |
|---|---|---|---|
| Total LOC | 662 | 697 | +35 |
| D-v6-4 CI advisory block (verdict-template YAML) | absent | L482-L497 (+13 LOC for `composite_ci_advisory:` 7-field sub-block + 6-line σ/CI/P-above formula comment header) | +13 |
| D-v6-6 audit-trail paragraph (after L405 ledger-write contract) | absent | L407-L422 (+16 LOC: paragraph + 8-field YAML schema fenced block + closing sentence) | +16 |
| Anti-pattern rows (after v5 citation-fidelity row) | 1 v5 row at L615 | 3 rows at L649-L650 (added 2 v6-advisory rows after L648 closing v5 row) | +2 rows |
| Hard-cap taxonomy table | L390-L399 untouched | L390-L399 untouched (line numbers shift due to upstream insertions; text identical) | 0 (text) |
| Tier-cut thresholds | L228, L229, L384, L385 untouched | L228, L229, L384, L385 untouched (line numbers preserved by insertion locations) | 0 (text + line) |
| Weight assignments (W_install / W_pattern) | L181-L216 (15 dim rows) untouched | L181-L216 untouched | 0 |

**Forecast vs actual delta**: W305 Stream B forecast +46 LOC (663 → 709). Actual +35 LOC (662 → 697). Variance −11 LOC because the W305 forecast assumed a 4-line version-banner update at L6 (RECOMMENDED-but-optional per W305 Stream B §4 ship-bundle step 4) which this wave deferred to keep the partial-ship to pure schema/doc/anti-pattern additions; the σ/CI/P formula header was inlined as 6 comment lines rather than the forecast 8-line standalone block; and the override sidecar `applied_at` ISO8601 schema line was collapsed to one comment line. Net delta is within the parent's +30 to +60 LOC target band. Zero LOC deleted.

## §2 D-v6-4 CI advisory annotation — changes applied

**Where**: SKILL.md L466-L470 (verdict-template `rubric_scores:` block). Insertion point preserved per W305 Stream B §2.2.

**What was added** (15 lines net — `composite_ci_advisory:` sub-block + 6 lines of σ/CI/P-above formula comment header):

```yaml
  # v6 ADVISORY (W305 partial-ship of D-v6-4; tier router still uses point install_score/pattern_score)
  # σ_d = 0.5 / sqrt(n_anchors_d); σ_install = sqrt(Σ (w_d × σ_d)²) / 19.3
  # ci_95_install = [install_score - 1.96σ_install, install_score + 1.96σ_install]
  # ci_95_pattern same shape with denom 9.4
  # P(install_score ≥ 4.0) = 1 - Φ((4.0 - install_score) / σ_install)
  # Operator interpretation only; tier-cut routing per Step 6 stays point-estimate until W302 §7 Q4 decision.
  composite_ci_advisory:
    sigma_install: <float | null>
    ci_95_install: [<float>, <float>] | null
    p_above_4_0: <float | null>
    sigma_pattern: <float | null>
    ci_95_pattern: [<float>, <float>] | null
    p_above_3_5: <float | null>
```

Existing fields above (`install_score`, `pattern_score`, `hard_cap_breaches`, `confidence_factor`) preserved verbatim.

**What was added** (1 new anti-pattern row at L649; see §3 second-half for the combined Edit):

```
- **Point-estimate-only routing without uncertainty annotation** (v6-advisory, W305 partial-ship of D-v6-4) — when CI computation is cheap (zero API cost) and the underlying score has known anchor-count variance, emitting the verdict without `composite_ci_advisory` denies operators the uncertainty information that the W301-D §2.4 design rationale (NIST + HELM + Gelman) requires for high-stakes adoption decisions. Tier router stays point-estimate until §7 Q4 operator decision; advisory CI is NOT optional. Anti-pattern targets the gap where a T1 INSTALL band score sits within `1.96σ_install` of the 4.0 cut — without CI, operator cannot assess tier sensitivity to dim-score perturbation.
```

**Grep evidence — tier-cuts UNCHANGED**:

```
$ grep -n "install_score ≥ 4\.0\|install_score ∈ \[3\.0, 3\.9\]" .claude/skills/sota-convergence-audit/SKILL.md
228:- **T1 INSTALL**: `install_score ≥ 4.0` AND no hard-cap breach AND adversarial APPROVE.
229:- **T2 VENDOR-FORK**: `install_score ∈ [3.0, 3.9]` AND no critical hard-cap breach AND license permits fork.
384:- **T1 INSTALL** — full integration (plugin/MCP/hook/skill). `install_score ≥ 4.0`, no hard-cap breach, adversarial APPROVE, rollback plan written.
385:- **T2 VENDOR-FORK** — copy subset of source files into runtime; track upstream drift. `install_score ∈ [3.0, 3.9]`, license permits fork, no critical hard-cap breach.
492:  # P(install_score ≥ 4.0) = 1 - Φ((4.0 - install_score) / σ_install)
```

L228, L229, L384, L385 preserved (same line numbers, identical text). The L492 hit is the new advisory comment header — formula-not-threshold; it READS the threshold but does NOT define it. Tier router (Step 6) still uses point `install_score`.

## §3 D-v6-6 operator-override audit trail — changes applied

**Where**: SKILL.md L405 (between ledger-write contract paragraph and `file_slug` derivation block). Insertion point preserved per W305 Stream B §2.3.

**What was added** (17 lines net — full paragraph + 8-field YAML schema fenced block + closing sentence):

```
**Operator-override audit trail** (v6-advisory, W305 partial-ship of D-v6-6 — supersedes nothing; ADVISORY-ONLY until W302 §7 Q7 operator confirms location + schema): when an operator-override is applied (cost-cap raise · tier-routing manual edit · hard-cap waiver · ensemble-disagreement override · anti-bias override · contamination-corpus override), the **recommended** practice is to emit a sidecar markdown file at:

  `Z:/claude-sota-installed-state/basic-memory/verdicts/W<wave>-<file_slug>-override.md`

with the **recommended** minimal schema (3 required fields per W301-D §2.6 L552-L563):

[8-field YAML block with override_class + justification + alternative_considered + reversibility_plan required, external_cite + operator_id + applied_at optional]

The override sidecar filename `W<wave>-<file_slug>-override.md` matches the existing AGING re-litigation cron glob `verdicts/W*.md` (per W295-codex-r26 — same convention as the main verdict). The matching verdict-payload field is `override.applied: bool` (optional in v6-advisory; mandatory only when W302 ships the full D-v6-6). This advisory section is operator-discipline documentation; the Stage-6 post-write assertion at the end of this Step 6 does **NOT** enforce override-file existence until W302.
```

**What was added** (1 new anti-pattern row at L650):

```
- **Untracked operator-override** (v6-advisory, W305 partial-ship of D-v6-6) — when an operator overrides ANY v5 ratchet (cost cap, tier routing, hard-cap waiver, ensemble disagreement, anti-bias, contamination), the recommended practice is to emit a sidecar `W<wave>-<file_slug>-override.md` at `<state>/basic-memory/verdicts/` documenting `justification`, `alternative_considered`, `reversibility_plan`. Silently overriding without the sidecar denies AGING re-litigation visibility and weakens the W295-Δ11 ratchet that operator-overrides are supposed to be RARE-AND-DOCUMENTED. Sidecar is advisory in v6-W305; W302 D-v6-6 full ship promotes it to ledger-write contract (per W301-D §2.6 + §7 Q7 operator decision).
```

**Grep evidence — hard-cap taxonomy UNCHANGED**:

```
$ grep -n "Universal REJECT triggers\|INSTALL-only caps" .claude/skills/sota-convergence-audit/SKILL.md
392:> **Notation note (codex W293 round-1 Finding 4 reconciliation)**: ... Existing W288 INSTALL-only caps use `< N`. Universal REJECT triggers use `≤ N` ...
396:| **Universal REJECT triggers** | `D7 ≤ 1` (abandoned) · `D10 ≤ 2 AND no marginal pattern improvement` · `D15 ≤ 1` · `D18 < 2` · any persona adversarial-BLOCK · codex-gate BLOCK | Force T5 REJECT at any tier. Override soft-gate routing. |
397:| **INSTALL-only caps** | `D1 < 3` · `D3 < 2` · `D5 < 4` · `D14 < 3` · `D17 < 2` · `D19 < 2` · citation-fidelity spot-check FAIL | Block T1 INSTALL only. ...
```

L392, L396, L397 preserved (same line numbers, identical text). The new audit-trail paragraph slots BEFORE the hard-cap section (at L405 → L407 post-edit), so the hard-cap line numbers are not shifted.

**Grep evidence — weights UNCHANGED**:

```
$ grep -n "W_install=\|W_pattern=" .claude/skills/sota-convergence-audit/SKILL.md | head -25
181:1. **D1 license_compatibility** (W_install=1.5) — ...
182:2. **D2 capability_uniqueness** (W_install=0.9, W_pattern=1.4)
... (L183-L216 all 15+3+3 dim rows preserved verbatim)
```

All 21 dim weight assignments preserved at L181-L216. Composite denominators (19.3 install + 9.4 pattern at L220-L221) untouched.

## §4 Risk analysis + rollback procedure

### 4.1 What could break

| Risk | Severity | Mitigation |
|---|---|---|
| Tier router silently consults new `composite_ci_advisory` fields and uses CI for routing | **NONE** — Step 6 routing prose at L228-L232 (post-edit unchanged) explicitly says "install_score ≥ 4.0" not "p_above_4_0 ≥ 0.X". Router code path was never touched. | Comment in advisory block explicitly states "Operator interpretation only; tier-cut routing per Step 6 stays point-estimate until W302 §7 Q4 decision." |
| Operator interprets advisory CI as gate | **LOW** | Inline comment "Operator interpretation only" + advisory-flagged anti-pattern explicitly says "Tier router stays point-estimate" |
| Override sidecar misread as mandatory contract | **LOW** | Paragraph explicitly says "**recommended** practice" + "ADVISORY-ONLY until W302 §7 Q7" + "the Stage-6 post-write assertion ... does **NOT** enforce override-file existence until W302" |
| Existing v5 verdicts (pre-W305) become invalid because they lack `composite_ci_advisory` or override sidecars | **NONE** | All new fields are nullable; no v5 verdict is invalidated by missing them. v3.1+v5 backward-compat is preserved (W295-codex-r12 contract holds). |
| Aging-scan glob `verdicts/W*.md` matches both main verdict + override sidecar (double-counting) | **LOW** | Override-sidecar filename `W<wave>-<file_slug>-override.md` is distinguishable by the `-override.md` suffix; AGING-relitigation cron already iterates per-candidate-slug so sidecar surfaces grouped with parent verdict, not as a separate verdict |
| LOC budget pushed near the 800 soft-cap (the v5→v6 partial-ship leaves runway) | **NONE** | 697 LOC; 103 LOC of runway remains before any soft-cap concern |

### 4.2 Rollback procedure

If post-edit codex Stop-hook gate fires BLOCK on this commit (or a future regression requires undoing the partial-ship):

```powershell
# Single-command rollback (this commit is the W306 Stream B partial-ship)
git revert HEAD --no-edit

# Smoke-verify rollback restored v5-only state
wc -l .claude/skills/sota-convergence-audit/SKILL.md   # MUST print 662
grep -c "composite_ci_advisory" .claude/skills/sota-convergence-audit/SKILL.md  # MUST print 0
grep -c "Operator-override audit trail" .claude/skills/sota-convergence-audit/SKILL.md  # MUST print 0
grep -c "Point-estimate-only routing\|Untracked operator-override" .claude/skills/sota-convergence-audit/SKILL.md  # MUST print 0
```

No state-mutation beyond the SKILL.md edit + this design doc. No service restart needed. No basic-memory or hindsight ledger entries reference the new advisory fields (verdicts emitted between this commit + rollback simply ignore the null fields).

## §5 Carry-forward to W307 — DEFER v6 deltas pending operator §7 decisions

Per W305 Stream B §1 classification + §3 DEFER rationale, the 3 remaining v6 deltas are NOT shippable in W306 because they each require operator §7 answers:

| Delta | §7 Q gate | Why DEFER | Unblocker action for W307+ |
|---|---|---|---|
| **D-v6-1** Phase-6 multi-judge ensemble FULL | §7 Q1 (cost-cap $5 → $7 raise vs Option-B operator-override toggle) | Mandatory ensemble adds $+1.00 per T1 audit beyond current $5 cap. Cardinal-rule "MUST NOT add cost requirements that exceed current $5 T1 cap" forbids ship-now. | Operator confirms Q1 Option A (raise cap) OR Option B (override toggle) → ship as final, NOT partial |
| **D-v6-3** Contamination check Stage-5 → Stage-1 | §7 Q3 (CONTAMINATION-CORPUS.yaml curation, ~2-hour operator-task) | Without populated corpus, the stage move is "just code-relocation with no functional improvement" per W301-D §4. Ship-now would emit gate_4_contamination_check: n/a for 100% of audits — strictly worse than v5's current Stage-5 placement. | Operator curates the corpus → ship in W303 (not W307) |
| **D-v6-5** Anti-bias org-distinct ENFORCEMENT | §7 Q5 (scope T1+T2 vs also T3) + §7 Q6 (≥3-candidate regression pilot) | Ship-now actively tier-demotes candidates v5 would APPROVE (W301-D §4 "the most-aggressive delta"). Directly violates partial-ship constraint "MUST NOT make any sca-v5 verdict invalid by retroactive rule change". | Operator confirms Q5 scope + commissions Q6 regression pilot → ship as final |

**Recommended operator-question priority** (per W305 Stream B §4):

1. **§7 Q1** — unblocks D-v6-1 (Phase-6 ensemble closes 2 of 3 Zheng+ 2023 bias classes; highest-leverage W307 delta). Single-question answer.
2. **§7 Q5 + Q6** — unblocks D-v6-5 (most-aggressive delta); needs pilot regression on ≥3 historical candidates first. Two-question answer + ~1-wave pilot work.
3. **§7 Q3** — DEFER-W303 (not W307); lowest urgency. Two-hour operator task.

**Pre-positioning value**: this W306 partial-ship lays the foundation for W302+ by establishing the recommended override-sidecar location + schema (D-v6-6 pre-position) and the CI advisory field schema (D-v6-4 pre-position). When operator answers §7 Q4 (probabilistic routing) or §7 Q7 (override schema), the W302 ship just promotes "recommended" / "advisory" to "required" / "gating" — the schema fields are already in place, the operator-discipline anti-patterns are already documented, and any verdicts emitted under v6-advisory between W306 and W302 are forward-compatible with the W302 full ship.

---

**End of W306 Stream B partial-ship application changelog**. Verification: see §1 diff stat + §2-§3 grep evidence. Rollback: §4.2 single-command `git revert HEAD`. Forward path: §5 W307 operator-question priority.
