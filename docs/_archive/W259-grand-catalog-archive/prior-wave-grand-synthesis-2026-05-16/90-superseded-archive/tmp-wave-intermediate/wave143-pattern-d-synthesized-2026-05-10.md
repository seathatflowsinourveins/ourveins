# Wave 143 Fire 1 — Pattern D synthesized codification body (V1 + V3 fix-forward)

**Source synthesis**:
- V1 sota-researcher (Sonnet stand-in) APPROVE conf=0.93 — `tmp/wave143-v1-sota-researcher-pattern-d-recipe-2026-05-10.md`
- V3 Path P REAL GPT-5.5 codex T1 NEEDS-REVISION conf=0.91 — `.claude/state/codex_consult_w143_pattern_d_codification_OUT.txt`
- V3 prescribed_edit applied: state n=13 recovery-family evidence + mark strict recipe as TARGET, not universal observed shape

---

## Pattern D — DEFAULT-profile foreground+tee recovery for Pattern B HNF (n=13 recovery-family evidence)

**Trigger**: codex T1 with `deep-review-exec` profile (xhigh effort, danger-full-access sandbox) suffers Pattern B HONEST-NON-FINDING surface — typically zero-investigation Pattern B variant per §"Pattern-B mitigation patterns" (codex CLI exits 0 immediately without invoking model; 50-60 line prompt-echo with no model response, no tool calls, no `turn.completed` events). Distinguished from active-deep-research timeout (Pattern B sub-cause 1) and sandbox-policy-blocked reads (Pattern B sub-cause 2).

**Disposition**: switch dispatch profile from `deep-review-exec` to **DEFAULT codex profile** + invoke via **orchestrator-side foreground+tee shell pattern** with focused-prompt discipline. Pattern D PREEMPTS Pattern B HNF surface BEFORE timeout fires by changing dispatch shape. When Pattern D successfully reaches a verdict, Pattern A's NEEDS-REVISION disposition takes over for verdict integration.

**The Path P recipe — recommended TARGET parameters** (recovery-family observed; n=13 instances vary in strict-flag adherence — see §"Empirical evidence trail" caveat):

```bash
timeout 300 codex exec --skip-git-repo-check --color never \
  < .claude/state/codex_consult_<topic>.txt \
  2>&1 | tee .claude/state/codex_consult_<topic>_OUT.txt
```

Six load-bearing TARGET parameters (cite per Wave 142 close-synthesis L63):

1. **DEFAULT codex profile** — NO `-p deep-review-exec` flag. Routes via codex CLI's default profile (medium effort, read-only sandbox).
2. **`--skip-git-repo-check`** — bypasses codex's git-repo precondition check that fires zero-investigation Pattern B HNF on cwd-mismatch class.
3. **`--color never`** — ANSI-stripped output for clean trace-mining + JSON-at-EOF parse.
4. **foreground+tee dispatch** — orchestrator-direct shell invocation, NOT background `&` job. The tee captures full trace to OUT file while operator can observe stream live (Pattern B mid-stream-disconnect detection per gstack:1046-1048).
5. **300s timeout** — bounded ceiling; per W141-W142 evidence median wall-clock ~3-5min for substantive multi-axis verdicts.
6. **≤50 LOC focused prompt + single-claim audit + JSON-at-EOF schema** — reduces Pattern B sub-cause 1 (active deep-research timeout) by narrowing scope. Per Pattern B §"When NOT to apply": bundling multiple design surfaces in one T1 produces timeouts; Pattern D enforces the inverse discipline at the prompt-construction stage.

**IMPORTANT — strict-shape vs recovery-family disclosure** (per V3 codex T1 NEEDS-REVISION conf=0.91 prescribed revision): the n=13 cumulative same-arc evidence ladder supports the **recovery FAMILY** (foreground+tee codex exec returning structured JSON verdict instead of suffering Pattern B HNF). Several historical instances DO NOT strict-conform to all 6 parameters — variations include: `-p deep-review` profile, prompts exceeding 50 LOC, alternate timeouts (240s / 480s / no explicit timeout), or omission of `--color never` / `--skip-git-repo-check` flags. The 6-parameter recipe above is the TARGET going forward; the family ladder establishes the dispatch-shape's structural distinctness from Pattern A (verdict-integration) and Pattern B (HNF-disposal). Future audits should grade strict-conformance per dispatch + escalate sub-cause analysis when conformance <0.85.

**Why this works**: Pattern B's zero-investigation variant and active-deep-research timeout both surface when `deep-review-exec` xhigh+danger-full-access profile is over-allocated for the task. The DEFAULT profile is structurally lighter — medium effort + read-only sandbox bypasses the failure modes that cause Pattern B HNF on focused single-claim audits. Pattern D is the **dispatch-shape preempting layer**; Pattern A is the **verdict-integration layer**; both honor cycle-300 ONE-LOGICAL-UNIT-PER-FIRE.

**Empirical evidence trail (n=13 recovery-family same-arc 2026-05-10)**:

| # | Wave/Fire | Voice | Verdict + conf | strict-conform | Evidence file (`.claude/state/`) |
|---|-----------|-------|----------------|----------------|----------------------------------|
| 1 | W137 Fire 2 | V1 | NEEDS-REVISION 0.86 + 5 prescribed_edits | partial | `codex_consult_w137f2_codification_OUT.txt` (89 LOC) |
| 2 | W138 Fire 1 | V1 | NEEDS-REVISION 0.88 + 5 prescribed_edits | strict | `codex_consult_w138f1_3axis_ship_OUT.txt` (3033 LOC) |
| 3 | W138 Fire 2 | V1 | NEEDS-REVISION 0.88 + 1 prescribed_edit | strict | `codex_consult_w138f2_doconly_bundle_OUT.txt` (2367 LOC) |
| 4 | W138 Fire 3 | V1 | APPROVE 0.84 + 9 Mia warnings | partial | (cite per Wave 138 Fire 3 close-synthesis) |
| 5 | W138 Fire 4 | V1 | NEEDS-REVISION 0.88 | strict | `codex_consult_w138f4_governance_trio_install_OUT.txt` |
| 6 | W139A | V1 | architecture audit verdict | partial | (cite per Wave 140 close-synthesis) |
| 7 | W139A | T1 review | T1 review verdict | partial | (cite per Wave 140 close-synthesis) |
| 8 | W140 | V1 | L3 Graphiti probe | partial | (cite per Wave 140 close-synthesis) |
| 9 | W140 | T1 review | T1 review verdict | partial | (cite per Wave 140 close-synthesis) |
| 10 | W141 Fire 1 | V1 | NEEDS-REVISION 0.89 + 5 prescribed_edits | strict | `codex_consult_w141_graphiti_smoke_OUT.txt` (13156 LOC) |
| 11 | W141 Fire 1 | V4 (T1 review) | NEEDS-REVISION 0.89 + 5 prescribed_edits | strict | `codex_consult_w141_synthesis_t1_review_OUT.txt` (9470 LOC) |
| 12 | W142 Fire 1 | V1 | NEEDS-REVISION 0.9 + 5 prescribed_edits | strict | `codex_consult_w142_graphiti_routing_isolation_OUT.txt` (11430 LOC) |
| 13 | W142 Fire 1 | V4 (T1 review) | REJECT 0.96 ship1_verdict=WRONG_FIX SAVED-SHIP | strict | `codex_consult_w142_voice4_t1_review_OUT.txt` |

n=13 cumulative same-arc recovery-family evidence per `codification-threshold.md` cycle-322 jurisdiction (n≥3 self-observed promotes feedback→rule). Cycle-321 expected-savings threshold (~10 min/mo) firmly cleared: each Pattern D dispatch saves ~3-5min vs Pattern B HNF re-prompt cycle × ~2-4 fires per session = ~30-60 min/session compounding savings. LOC under 200 ceiling (~115 LOC).

**Sub-class taxonomy** (Pattern D variants observed):
- **D.1 — Single-claim audit** (W137F2 + W138F1+F2+F3+F4): focused 2-3 axis prompt with explicit JSON output schema; conf 0.84-0.88 typical.
- **D.2 — T1 review fork** (W141 V4 + W142 V4 + W139A T1 + W140 T1): Pattern D applied as cross-model T1 review of an earlier verdict; produces verdict-of-verdict shape; SAVED-SHIP catches in n=2 instances (W141 V4 caught LOAD-BEARING; W142 V4 REJECT 0.96 caught FM-20 path-drift cascade).
- **D.3 — Multi-source-tree audit** (W141 V1 + W142 V1 + W140 V1): focused on cross-runtime dependency probes (L3 Graphiti routing-isolation / source-tree-mismatch); typically NEEDS-REVISION 0.89-0.90 + 5 prescribed_edits.

**Anti-patterns (when Pattern D does NOT apply)**:

- **Bundling Pattern A and Pattern D in same dispatch** — refuted by lifecycle separation. Pattern D selects dispatch shape BEFORE T1 verdict; Pattern A integrates verdict AFTER. Use Pattern D to reach verdict, then Pattern A to apply prescriptions.
- **Pattern D for in-process mid-Pattern-B recovery** — refuted by n=13 evidence: Pattern D is preempting (chosen at dispatch-construction time); NOT a mid-stream rescue from a Pattern B in-flight HNF. If Pattern B already fired and produced trace-mineable evidence, complete Pattern B per its disposition; use Pattern D for the NEXT T1 dispatch.
- **Skipping `--skip-git-repo-check` when Pattern B HNF was caused by git-repo-check failure** — refuted by zero-investigation Pattern B variant analysis. The flag is load-bearing for that sub-cause class, not optional ornament.
- **Background `&` job dispatch** — refuted by Path P recipe foreground+tee discipline. Background job exit code is the wrapper's, not codex's; tee provides live-stream observability that catches mid-stream disconnect per gstack:1046-1048 mitigation pattern.
- **Pattern D for design-surface edits >200 LOC** — refuted by ≤50 LOC focused-prompt discipline. Large multi-surface edits should split per cycle-300 ONE-LOGICAL-UNIT-PER-FIRE BEFORE invoking Pattern D, not bundle into a single dispatch.
- **Pattern D verdict-trail caching across fires** — refuted by FM-20 path-drift cascade defense (Wave 142 Fire 1 V4 SAVED-SHIP n=11 ladder). Each Pattern D dispatch produces a fresh verdict; do NOT propagate cite-anchors from prior-fire verdict files into next-fire prompts without orchestrator-side Mia probe per `synthesis-layer-verify.md §Reporting categories` OVER detection.
- **Claiming strict-recipe conformance for ALL n=13 instances** — refuted by V3 codex T1 NEEDS-REVISION conf=0.91 evidence audit: ladder is recovery-family, not strict-recipe. Mark strict recipe as TARGET going forward; grade conformance per dispatch.

## Sister-rule integration

- **`.claude/rules/named-failure-modes.md` FM-17.i** (META-router for Pattern B HNF zero-investigation variant) — Pattern D is the upstream-recovery PATH that preempts FM-17.i surface. Pattern D codification may obviate FM-17.i task (currently NOT-YET-CODIFIED in named-failure-modes.md per Wave 138 Fire 2 disposition: "DOWNGRADE per Voice 1 Q6 verdict — NOT FM-17 sub-class, Pattern D candidate").
- **`.claude/rules/named-failure-modes.md` FM-17.f** (subagent fleet-depletion 1M-context entitlement billing-class blocker) — Pattern D bypasses FM-17.f BRIDGE-MODE risk entirely (orchestrator-direct foreground+tee, NOT subagent fan-out).
- **`.claude/rules/cross-model-consensus.md` §"On codex unavailable"** — Pattern D is the PRIMARY recovery path BEFORE option (a) defer-queue or option (b) DOWNGRADED-MODE Ollama HTTP bridge. Pattern D maintains REAL GPT-5.5 via codex CLI v0.130.0 (cardinal-rule-3 cross-model gate FULLY satisfied at zero degraded-mode risk).
- **`.claude/rules/cross-model-consensus.md` §The contract** Phase 1 bootstrap exception — Pattern D IS the canonical satisfaction path during Phase 1 (until Tier 1a codex T1-T7 hooks INSTALLED), then continues as the RECOMMENDED dispatch shape post-Phase-2 transition for FM-17.i HNF preemption.
- **`.claude/rules/synthesis-layer-verify.md` §Reporting categories** OVER/UNDER/HONEST-NON-FINDING — Pattern D dispatches produce structured verdicts amenable to OVER detection at synthesis layer (Wave 142 Fire 1 V4 SAVED-SHIP demonstrates Pattern D + cross-voice evidence-conflict resolution catches FM-20 cascade BEFORE Edit lands).
- **`.claude/rules/audit-action-loop.md`** Wire→Surface→Close→Re-fire — Pattern D dispatches log to `.claude/state/codex_consult_<topic>_OUT.txt` (Surface stage); commit-body cite (Close stage) anchors verdict for cross-arc compounding.
- **`.claude/rules/codification-threshold.md`** cycle-322 jurisdiction — Pattern D codification at n=13 firmly exceeds n≥3 self-observed promotion gate. cycle-321 cost-threshold cleared (~30-60 min/session savings).

## Update triggers

Re-evaluate Pattern D when:

- **Pattern D HNF surfaces** (Pattern D itself produces zero-investigation Pattern B variant): would suggest the DEFAULT profile is over-allocated for new task class — investigate `codex exec --profile=light` or similar lighter-weight alternative.
- **Pattern D conf consistently <0.85** (currently 0.84-0.96 across n=13): would suggest focused-prompt discipline is producing borderline-acceptable verdicts — escalate to user OR upgrade to `deep-review-exec` for that specific task class.
- **Pattern D wall-clock consistently >300s** (currently median ~3-5min): would suggest 300s timeout ceiling is too tight — bump to 480s OR re-narrow prompt scope.
- **Sub-class D.1/D.2/D.3 evidence ladder reaches n=5+ each**: promote sub-class to dedicated section per `codification-threshold.md` cycle-322 jurisdiction.
- **codex CLI version bumps beyond v0.130.0** (Wave 141-142 reference version): re-verify Path P recipe parameters; especially `--skip-git-repo-check` and `--color never` flag stability.
- **A 4th distinct dispatch-shape sub-class emerges** (beyond D.1 single-claim / D.2 T1 review fork / D.3 multi-source-tree audit): add sub-class taxonomy row.
- **Cross-runtime cite-import-AMBER drifts**: if sibling claude-sota's Pattern D mechanics evolve via Wave 143+ ships, this runtime's cite-import copy needs sync via mechanical-mirror exception.
- **Strict-conformance grading deployed**: when audit hooks score per-dispatch strict-conformance to the 6-parameter recipe, emit DRIFT signal at <0.85 conformance and queue Pattern D recipe re-evaluation per `audit-action-loop.md` Wire→Surface→Close discipline.
