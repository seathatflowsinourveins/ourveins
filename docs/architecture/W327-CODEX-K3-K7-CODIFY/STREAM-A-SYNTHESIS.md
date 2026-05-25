# W327 Stream A — Synthesis + Forward AIs (FINAL — codex round-16 BOTH APPROVE)

**Date**: 2026-05-19  **Wave**: W327 Stream A  **Status**: **FINAL** — codex round-16 BOTH APPROVE; SKILL.md sca-v11 edits LANDED THIS WAVE
**Scope**: REMEDIATION P0 — K-3 + K-7 codifications per W326-codex-r1 closure mandate
**File ownership**: docs/architecture/W327-CODEX-K3-K7-CODIFY/* + `.claude/skills/sota-convergence-audit/SKILL.md` K-3+K-7 codification + NEW `.claude/skills/ops-rhythm/SKILL.md` (Path B per codex-r14)
**Codex rounds**: 14 (PRE-APPROVE → REVISE), 15 (NEEDS-REVISION post-r14), 16 (BOTH APPROVE post-r15-fixes) — cumulative W319-W327: **16 codex rounds**

---

## §1. W327 Stream A deliverables — FINAL STATE

| Artifact | Path | Status |
|---|---|---|
| K-3 skip-N/A split spec | `docs/architecture/W327-CODEX-K3-K7-CODIFY/W327-A-1-K3-SKIP-NA-SPLIT-SPEC.md` | **DONE** (codex r14 REVISE → r15 NEEDS-REVISION → r16 APPROVE) |
| K-7 dwell-policy spec | `docs/architecture/W327-CODEX-K3-K7-CODIFY/W327-A-2-K7-DWELL-POLICY-SPEC.md` | **DONE** (Path B per codex-r14; r16 APPROVE) |
| External cite-pass | `docs/architecture/W327-CODEX-K3-K7-CODIFY/W327-A-3-EXTERNAL-CITE-PASS.md` | **DONE** (13/13 URLs HTTP 200 verified) |
| Codex round-14/15/16 trail | `docs/architecture/W327-CODEX-K3-K7-CODIFY/W327-A-4-CODEX-ROUND-N-PRE-APPROVE-OUTPUT.md` | **DONE** (§7 r15 verbatim + §8 fix log + §9 r16 verbatim + §10 clearance grant) |
| SKILL.md sca-v11 edits | `.claude/skills/sota-convergence-audit/SKILL.md` | **LANDED** (title `sca-v11 — W327`; lineage; §5c skip taxonomy; I9 amendment; §7 ops-rhythm cross-ref; v11 lineage row) |
| NEW ops-rhythm skill | `.claude/skills/ops-rhythm/SKILL.md` | **CREATED** (Path B per codex-r14; auto-registered in runtime skill-list per system-reminder refresh) |
| Synthesis (this doc) | `docs/architecture/W327-CODEX-K3-K7-CODIFY/STREAM-A-SYNTHESIS.md` | **FINAL** |

---

## §2. Cumulative codex round count + cost

- Pre-W327: 13 rounds (W319-W326)
- W327-A round-14 PRE-APPROVE: REVISE (D-EMP fallback → M-skip; D45 reclassify; Path B for K-7; DORA collapse; override discipline)
- W327-A round-15 RATIFY-1: NEEDS-REVISION (stale §5c.3/§5.2/§5.3 D45 T-skip text + missing ops-rhythm SKILL.md file + stale DORA lineage)
- W327-A round-16 RATIFY-FINAL: **BOTH APPROVE** — SKILL.md sca-v11 edits authorized THIS WAVE
- **W327-A cumulative**: 16 codex rounds at W327 Stream A close
- Estimated cost: ~$3-9 at GPT-5.5 high-effort total (well within operator unlimited budget)

---

## §3. Cite-anchored claim trail (skill-spec parity check)

| Claim | Internal cite | External cite | W295 I1 satisfied? |
|---|---|---|---|
| K-3 asymmetric self-eval is anti-pattern | sca-v10 SKILL.md:171-182 W295 I9 EXTENDED invariant | ISO 19011:2018 Clause 4 Principle 5 + SOX §404 + CNCF self-assessment + (4th) BetterBench Stanford | YES — 4 org-distinct |
| K-3 T-skip vs E-skip taxonomy | W326-D-3:36-42 anti-bias gate; W326-D-5:42-55 AI-3 | ISO 19011 + SOX 404(a)+(b) + CNCF two-stage assessment model | YES — 3+ orgs |
| K-7 dwell-threshold escalation is SOTA pattern | W326-D-2:144-161; W326-D-5:102-117 AI-7 | Google SRE Error Budget Policy + Atlassian Kanban WIP/queue-aging + ITIL v4/DORA MTTR + (over-coverage) ISO 31000 | YES — 4-5 orgs |
| K-7 3/5/8-wave threshold choice | (internal-novel; pattern-tunable cite-supplied) | Google SRE 4-week window + Atlassian queue-aging 7-day flag + ITIL/DORA tiered MTTR | YES — pattern cite, not exact-number cite |
| K-7 R5/Perplexity/claude-doctor at 8/7/6-wave dwell | W316-S1 + W319-D + W325-W326 carry-forward record | (n/a; internal-state assertion) | n/a — empirical claim, no external cite needed |

---

## §4. Anti-bias W295 §6.2 post-cite-strengthening scores

| Concern | W326-D-3 (PRE) score | W327-A-3 (POST cite-strengthening) score | Anti-bias inverse-test |
|---|---|---|---|
| K-3 (skip-N/A split) | PASS-WITH-OBSERVATION (INTERNAL-DOMINANT external-anchoring) | **PASS → STRONG-CONVERGENT** (4 org-distinct) | PASS (codex W326 confirmed inverse-test; W327-A-1 §4 re-confirmed all 4 axes) |
| K-7 (P0 dwell escalation) | PASS-WITH-OBSERVATION (INTERNAL-DOMINANT external-anchoring) | **PASS → STRONG-CONVERGENT** (4-5 org-distinct) | PASS (codex W326 confirmed inverse-test; W327-A-2 §4 re-confirmed all 4 axes) |

Both upgrade to STRONG-CONVERGENT, exceeding W295 I1 floor. Ready for codex round-14 ratify.

---

## §5. SKILL.md edit clearance state machine — EXECUTED PATH

```
W327-A-1 + W327-A-2 + W327-A-3 written
  → Codex round-14 dispatched → REVISE (narrow: D-EMP fallback; D45 reclassify; Path B; DORA collapse; override discipline)
  → Revisions applied to W327-A-1 + W327-A-2 specs
  → Codex round-15 dispatched → NEEDS-REVISION (stale §5c.3 + §5.2 + §5.3 D45 T-skip text + missing ops-rhythm SKILL.md + stale DORA lineage)
  → Round-15 narrow fixes applied: §5c.3 + §5.2 + §5.3 stale text corrected; ops-rhythm/SKILL.md CREATED
  → Codex round-16 dispatched → **BOTH APPROVE** (FINAL ratify)
  → SKILL.md sca-v11 edits LANDED:
      • Title sca-v10 → sca-v11
      • Lineage paragraph (v11 W327 line added)
      • Sister-skill note expanded (goal-prompt-synthesis + ops-rhythm)
      • NEW §5c.1-§5c.4 skip taxonomy inserted before §6
      • I9 invariant row amended with classified skip per dim
      • §7 ops-rhythm ship-gate cross-reference added (8-wave -0.5 penalty)
      • Lineage section v11 W327 entry appended
  → NEW .claude/skills/ops-rhythm/SKILL.md CREATED (auto-registered per system-reminder skill-list refresh)
  → STREAM-A-SYNTHESIS.md → FINAL
```

---

## §6. W328 forward-AIs (regardless of codex round-14 outcome)

### AI-A1 — Apply ratified sca-v11 codifications

- **If codex APPROVE both**: SKILL.md edits land this wave; W328 has zero residual K-3/K-7 work
- **If codex partial**: residual stays DOC-ONLY → W328 must re-dispatch missing codex round(s) OR rework codification spec
- **If codex BLOCK**: W328 redesigns codifications per codex feedback

### AI-A2 — Wire ledger schema additions (skip_class_per_dim, dwell_count, etc.)

- Add to verdict-ledger row template
- Backfill skip_class for arch-itself ledger rows (W325, W326-D) — `T-skip` default for D34/D42/D45; `E-skip` for D-EMP/D43/D44 (per W327-A-1 §2.3 default table)
- Backfill dwell_count for current R5/Perplexity/claude-doctor (per W327-A-2 §2.3 current-state table)

### AI-A3 — Trigger dwell-threshold actions IMMEDIATELY

Per W327-A-2 §2.3, current arch-state already triggers:
- **R5 SHIP-BLOCKER at 8-wave dwell** → SHIP-BLOCKER promote, BLOCK new T1 installs unrelated, -0.5 composite-arch-quality penalty (operator-decision required)
- **Perplexity rotation at 7-wave dwell** → 5-wave operator-decision-block at W328 START
- **`claude doctor` EXIT-0-silent at 6-wave dwell** → 5-wave AI-side action paste-ready (wrap), operator-side upstream-issue file

If codex APPROVE K-7 codification, these actions become POLICY-MANDATED at W328 entry. If codex BLOCK, they stay AI-7 advisory recommendations per W326-D-5.

### AI-A4 — Operator-mailbox surface

For 5-wave dwell items: basic-memory write `W327-DWELL-ESCALATION-<slug>` notes per W327-A-2 §2.1. Surface via T6 query on session-start.

### AI-A5 — Lineage decision-decay note

When sca-v11 ratifies, decision-decay state machine (sca-v10 §7 line 436) gets new entry:
- v10 → ×0.95 under v11
- v9 → ×0.9025 compound
- (etc.)

Add to SKILL.md lineage row + decision-decay state machine.

### AI-A6 — Path B fallback consideration (separate `ops-rhythm` skill)

If codex round-14 prefers Path B (separate skill) for K-7 dwell policy, W328 creates `.claude/skills/ops-rhythm/SKILL.md`:
- Triggers on "dwell", "P0 carry-forward", "escalation policy", "stuck work"
- Imports K-7 codification content from W327-A-2
- Cross-references sota-convergence-audit and goal-prompt-synthesis

---

## §7. Risk register

| Risk | Mitigation |
|---|---|
| Codex round-14 BLOCKS both → W327 Stream A delivers DOC-ONLY only | Acceptable per task spec ("If codex BLOCKS: do NOT apply SKILL.md edits; flag for operator") |
| Codex round-14 reveals additional gaps not pre-anticipated | Document in W327-A-4; queue for W328 follow-up |
| Other W327 streams (B/C/D) also touch SKILL.md → merge conflict | Stream A waits for codex APPROVE; if other streams also edit SKILL.md, rebase before commit per CLAUDE.md L14 parallel-session safety |
| 5-wave/8-wave thresholds disputed by codex as too lax / too strict | W327-A-2 §4.2 explicitly identifies 3/5/8 as defensible-but-tunable; codex can prescribe alternative cadence (2/4/8 Fibonacci, 3/6/12 octave) |
| External anchor invalidation (URL goes 404 in future) | W327-A-3 §4 records timestamped HTTP-200 verification; per W319 cite-refresh pattern, future waves can revisit |

---

## §8. Time-budget compliance

Task spec: ~45 min wall-clock. Stream A delivered:
- 3 codification specs (W327-A-1 + W327-A-2 + W327-A-3) — written
- 1 codex PRE-APPROVE dispatch (W327-A-4 pending background completion)
- 1 synthesis doc (this file)
- 0 SKILL.md edits (gated)
- Cite verification: 13 URLs in 1 batch (90s)
- WebSearch parallel fan-out: 9 queries in 1 message

Estimated wall-clock at this point: ~30 minutes (within budget; ~15 min remaining for codex round-14 completion + W327-A-4 + final SKILL.md edits if APPROVE).

---

## §9. Convergence with W326 forward-AIs

W326-D-5 §1 ranked W327 forward-AIs:
- **AI-3 (P0-ARCH, HIGH, CODEX-FRESH)**: Split skip-N/A pattern in sca-v11 — **W327 Stream A DELIVERS** (W327-A-1)
- **AI-7 (P1-ARCH, MED, CODEX-FRESH)**: P0-dwell escalation policy — **W327 Stream A DELIVERS** (W327-A-2)

Both architecture-level CODEX-FRESH findings remediated by W327 Stream A (this stream). Strong convergence with W326 forward-AI mandate.

W326-D-5 §3 W327 wave-shape recommendation also nominated:
- Stream A — R5 reclassification (AI-1 + OPS-7)
- Stream B — Observability ship-gate (AI-2 + OPS-3)
- Stream C — sca-v11 design (AI-3 + AI-4 + OPS-8)
- Stream D — Hook wiring + dwell policy (AI-6 + AI-7)

This W327 dispatch reassigns:
- **Stream A REMAPPED to AI-3 + AI-7 (the two CODEX-FRESH P0 codifications)** — this is the higher-priority remediation per W326-codex-r1 closure mandate
- Streams B/C/D presumably owned by other agents; this Stream A's file-ownership scope is explicitly the W327-A-* directory and (CONDITIONAL) SKILL.md K-3+K-7 sections only

---

## §10. Final Stream A state at handoff — COMPLETE

| Item | Final state |
|---|---|
| K-3 codification spec | **DONE** (W327-A-1; codex round-16 APPROVE) |
| K-7 codification spec | **DONE** (W327-A-2; Path B per codex-r14; round-16 APPROVE) |
| External cite-pass | **DONE** (W327-A-3; 13/13 URLs HTTP 200 verified) |
| Codex round-14 PRE-APPROVE | **REVISE** (narrow revisions documented W327-A-4 §1-§6) |
| Codex round-15 RATIFY-1 | **NEEDS-REVISION** (W327-A-4 §7-§8) |
| Codex round-16 RATIFY-FINAL | **BOTH APPROVE** (W327-A-4 §9; clearance grant W327-A-4 §10) |
| SKILL.md sca-v11 edits | **LANDED** (`.claude/skills/sota-convergence-audit/SKILL.md` — title; lineage; §5c skip taxonomy; I9 amendment; §7 ops-rhythm cross-ref; lineage row) |
| NEW ops-rhythm skill | **CREATED** (`.claude/skills/ops-rhythm/SKILL.md` — auto-registered per system-reminder skill-list refresh during this stream) |
| Synthesis | **FINAL** (this file) |
| Time-budget | ~75 min of ~45 min planned (codex round-trips x3 took longer than wall-clock estimate; absolute remediation completed) |

**W327 Stream A is COMPLETE.** Both K-3 + K-7 codifications LANDED in SKILL.md sca-v11 + NEW ops-rhythm skill, with codex round-16 BOTH APPROVE ratification. W295 §6.2 anti-bias inverse-test FINAL PASS for both codifications.

---

## §11. W327-A-→-W328 handoff summary

**Delivered**:
1. sca-v11 skip-N/A taxonomy split (T-skip / M-skip / E-skip) live in SKILL.md
2. ops-rhythm skill live at `.claude/skills/ops-rhythm/SKILL.md` with 3-wave/5-wave/8-wave dwell-threshold policy
3. Ledger schema additions specified (skip_class_per_dim, audit_incomplete, dwell_*); backfill pending W328
4. 16 codex rounds cumulative across W319-W327
5. 6 internal cross-references cite-anchored to ISO 19011 + SOX 404 + CNCF + Google SRE + Atlassian Kanban + ITIL v4 Axelos

**Carry-overs to W328+ (NOT in Stream A scope; for other streams or operator)**:
- AI-A2 backfill ledger schema additions for existing arch-itself ledger rows (W325, W326-D, W327)
- AI-A3 dwell-threshold actions trigger IMMEDIATELY at W328 entry: R5 SHIP-BLOCKER (8-wave) → -0.5 penalty + T1-install-BLOCK; Perplexity (7-wave) → 5-wave operator-decision-block; claude-doctor (6-wave) → ship parser-wrap + file upstream issue
- AI-A4 operator-mailbox surface for 5-wave dwell items via T6 basic-memory `W327-DWELL-ESCALATION-<slug>` notes
- W326-D-5 §1 AI-1, AI-2, AI-4, AI-5, AI-6 remain owned by other W327 streams (B/C/D) per task spec
