# W156 F1 Close Synthesis — Tier 1a Codex T1-T7 Hooks

## Combined Verdict

VERDICT: F1-BLOCK

confidence: 0.90

a8_risk_class: HIGH

fm09_recursive_catch_triggered: true

v2_status: MISSING

v3_status: LANDED

cr3_cross_model_gate_status: PARTIAL-NOT-SATISFIED-FOR-SHIP

forward_direction: Outcome B/C split. Do not install or status-promote Tier 1a hooks as a single fire. Convert W156 F1 into narrow remediation fires: CR-9 revert-precedent closure, direct-file delta audit, plugin namespace/lifecycle audit, then manifest/provenance reconciliation.

## Evidence Inputs

V1 artifact exists:

`Z:/claude-sota-installed/tmp/wave156-f1-V1-sota-researcher-tier1a-hooks-2026-05-12.md`

Observed filesystem metadata: length 22,768 bytes; last write time `2026-05-12 00:43:45 -0400`.

V2 OUT artifact is missing:

`Z:/claude-sota-installed/.claude/state/codex_consult_w156_f1_tier1a_v2_OUT.txt`

Observed result: file not found. No EOF verdict was available for `wc -l` or tail. Likely cause remains FM-17.b pool-depletion / 429 or background dispatch non-completion; this close cannot treat V2 as landed evidence.

V3 artifact exists:

`Z:/claude-sota-installed/tmp/wave156-f1-V3-adversarial-2026-05-12.md`

Observed V3 verdict: `F1-BLOCK`, confidence `0.90`, `fm09_recursive_catch_triggered=true`, `a8_risk_class=HIGH`, `revert_precedent_check=FOUND_PRECEDENTS`, `v2_was_overclaimed=v2_not_landed`.

Cite-class for this close synthesis:

`constituents=[TIER-1-DIRECT @ Z:/claude-sota-installed/tmp/wave156-f1-V1-sota-researcher-tier1a-hooks-2026-05-12.md filesystem metadata + content, TIER-1-DIRECT @ Z:/claude-sota-installed/tmp/wave156-f1-V3-adversarial-2026-05-12.md tail content, TIER-1-DIRECT @ git -C Z:/claude-sota log/show evidence for 36f8267 and ba04d86, TIER-3-LOCAL-COMPOSITION @ this W156 F1 synthesis]; effective_tier=TIER-3-LOCAL-COMPOSITION`.

## V1/V3 Reconciliation

V1 conclusion: Tier 1a is substantially installed already; true F1 scope is classification, drift audit, and completion-gap remediation rather than fresh install. V1 marks T6 `codex_stop_review_gate.py` as intentionally absent / reject-for-fit due to duplicate stop-review surface and prior revert.

V3 conclusion: F1 must block because V1/V2 evidence was unavailable to the V3 runtime, V2 had not landed, direct-file verification was incomplete, plugin namespace overlap was not proven clean, lifecycle shape was not fully captured, and CR-9 REVERT precedents were found.

Close synthesis: V1 and V3 agree on the most important implementation direction: this should not be a blind install fire. V3 overrides V1's lower risk assessment because V3 found blocking evidence gaps and verified CR-9 precedent risk. The combined state is therefore F1-BLOCK, with the next action narrowed to evidence closure and remediation, not hook installation.

## V1 Timestamp Inconsistency Diagnosis

V3 reported V1 missing, but the filesystem now shows V1 existed with last write time `2026-05-12 00:43:45 -0400`, before V3 artifact time reported in the task context (`2026-05-12 00:51:40 -0400`).

Diagnosis: V3's "V1 missing" claim was likely caused by runtime visibility/path timing rather than actual absence at final close time. The close synthesis treats V1 as available evidence now, but preserves V3's finding as true for V3 runtime context: V3 did not consume V1 and therefore could not validate V1's line anchors or prescriptions.

Cite-class:

`constituents=[TIER-1-DIRECT @ V1 filesystem metadata observed in this close, TIER-1-DIRECT @ V3 artifact "Status: missing" report, TIER-3-LOCAL-COMPOSITION @ timing diagnosis]; effective_tier=TIER-3-LOCAL-COMPOSITION`.

## V2 Status and CR-3

V2 OUT remains missing at close. Therefore:

- No V2 EOF verdict is available.
- No V2 `APPROVE` / `NEEDS-REVISION` / `BLOCK` result can be counted.
- No V2 independent verification can be credited.
- V3's `v2_was_overclaimed=v2_not_landed` remains upheld.

CR-3 cross-model gate status: not satisfied for a ship/status-promotion decision. V3 provides one real codex exec/adversarial gate, but the requested V2+V3 parallel evidence set did not land. Treat this as Phase-1/bootstrap evidence only for blocking and narrowing, not as approval to mutate/install.

Cite-class:

`constituents=[TIER-1-DIRECT @ missing V2 OUT path check, TIER-1-DIRECT @ V3 artifact cross-model gate section, TIER-3-LOCAL-COMPOSITION @ CR-3 gate status synthesis]; effective_tier=TIER-3-LOCAL-COMPOSITION`.

## V3 Saved-Ship Catches

1. P1 Probe 4: Plugin namespace was not proven clean. `openai-codex` already supplies SessionStart/SessionEnd/Stop hooks while `.claude/settings.json` also wires `stop-review-gate-hook.mjs`; adding/importing more stop-review behavior risks duplicate review loops.

2. P1 Probe 5: Runtime lifecycle shape was not fully captured. Actual settings include T1 sync timeout 5, T5 async timeout 5, T2 sync timeout 180, T3/T4 async timeout 30, Stop sync timeout 300, and no asyncRewake evidence.

3. P1 Probe 6: Direct-file verification is incomplete. Only `codex_review_queue.py` was byte-identical to sibling among six observability scripts; five installed copies differ and need explicit content-delta proof before status promotion.

4. P1 Probe 6: Sibling source pin is not HEAD-clean. Sibling HEAD was reported as `034e8c1e5b1593d71fbe21ddae9eb53570ecdab0`, while installed headers cite older per-file touch commits such as `66ad862`, `35fec739`, and `258a40b`; manifest still had pending SHA text for the T1 bridge row.

5. P2 Probe 7: Demand is not fully established as an install gap. The runtime already has codex T1/T2/T5/postcommit/prepush/stuck/trace hooks physically wired and CR-3 also operates via foreground+tee Phase-1 bootstrap. F1 is mostly manifest/provenance closure unless a specific missing hook is named.

6. P1 Mia: V1 and V2 were absent to V3 runtime, so V3 had no evidence that cited line anchors were freshly probed against sibling HEAD or that V2 independently verified V1 rather than echoing it.

7. P1 CR-9: REVERT-AND-REMOVE precedent exists in sibling codex hook history: `36f8267` runner_crash consumer and `ba04d86` BYPASS+REASON surface. F1 cannot claim clean revert history.

8. P1 CR-9: Two-round fix-forward budget and per-row copy-time full SHA disclosure were not evidenced in the missing V2/W156 plan-verdict path; manifest rows 242-243 remained PLANNED rather than four-evidence-cell installed rows.

9. P2 FM-02: Atomic narrow `--only` defense was not demonstrated for W156 F1. Current worktree had unrelated dirty manifest edit for `fm17d_stall_detector.py`; Tier 1a hook ship must isolate files before commit.

10. P1 CR-8: Cite-class lattice was incomplete for Tier 1a manifest rows. Cite-import-AMBER rows need explicit `constituents=[...]` plus `effective_tier=TIER-3-LOCAL-COMPOSITION`; row 242 still contained pending SHA text.

## REVERT Precedent Verification

Command evidence confirmed V3's REVERT precedent claim:

- `36f82676917f875f9a8a93d233a4338b6d9fa29b`, dated `2026-05-05 04:23:30 -0400`, subject `revert(hooks+scripts): Arc 1 runner_crash consumer — Outcome B REVERT-AND-REMOVE (T3 R3 escalation 0.78→0.82)`.
- `ba04d868b8d0b326d1a5408f479cf649fdfa1724`, dated `2026-05-03 08:44:05 -0400`, subject `revert(hooks): REVERT-AND-REMOVE Ship #300 + #300.1 BYPASS+REASON surface — Outcome B per closed-loop confidence escalation R1 0.82 → R2 0.88`.

Verification result: FOUND_PRECEDENTS. This is a P1 CR-9 blocker before any install/status promotion. The next pass must treat revert history as present, not clean, and must explicitly document why the new action is not reintroducing the reverted failure class.

Cite-class:

`constituents=[TIER-1-DIRECT @ git -C Z:/claude-sota log --all --oneline for scoped codex hook paths, TIER-1-DIRECT @ git -C Z:/claude-sota show --no-patch for 36f8267 and ba04d86, TIER-3-LOCAL-COMPOSITION @ CR-9 blocker classification]; effective_tier=TIER-3-LOCAL-COMPOSITION`.

## Ladder Advances

FM-09: Advanced. V3 caught recursive overclaim risk and forced the close to distinguish "substantially installed" from "safe to promote/install."

Mia: Advanced. Any prescribed edits or file:line claims from V1 must be cheap-probed before edit, especially sibling-bleed references, hash deltas, and settings lifecycle rows.

Path P: Advanced but incomplete. V3 codex exec path landed; V2 did not. Path P can support block/narrowing, not approval.

Pattern D: Advanced. The correct next shape is decomposition: separate CR-9 precedent closure, plugin/lifecycle overlap audit, direct-file delta audit, and docs/provenance reconciliation.

CR-3 non-Phase-1-bootstrap: Not complete for ship. The missing V2 means this remains below the requested V2+V3 parallel gate threshold.

## META-Process SOTA Discipline (CR-11)

Do not introduce new hand-coded hook primitives in W156 F1. Per CR-11 and CR-12 discipline, first prove upstream/plugin surfaces, installed local adaptations, sibling provenance, and revert history. Treat the hook layer as high-risk lifecycle infrastructure: cite constituents, effective tier, exact source SHA, lifecycle event/matcher/timeout, and smoke-probe evidence before status promotion.

Cite-class:

`constituents=[TIER-1-DIRECT @ V1 CR-12/HONEST-NON-FINDING disposition, TIER-1-DIRECT @ V3 saved-ship catches, TIER-3-LOCAL-COMPOSITION @ close-synthesis process directive]; effective_tier=TIER-3-LOCAL-COMPOSITION`.

## Forward Direction

Outcome B if the next pass confirms any reintroduced reverted failure class, duplicate Stop review loop, runtime sibling path, or unbounded bypass surface: remove/reject that surface and document the revert-precedent avoidance.

Outcome C if the next pass finds installed hooks are valid but evidence is incomplete: keep code unchanged, complete the evidence cells, and ship only manifest/provenance reconciliation with narrow pathspec isolation.

Recommended next fires:

1. W156 F1.B: CR-9 revert-precedent and sibling-bleed audit. Verify every `Z:/claude-sota` reference in T1/T2/T3/T7 scripts is cite-only or rewrite it.

2. W156 F1.C: Direct-file delta audit. Hash/diff installed scripts against sibling sources at pinned HEAD; document every intentional runtime adaptation.

3. W156 F1.D: Plugin namespace and lifecycle matrix. Enumerate all active SessionStart/SessionEnd/Stop/PreToolUse/PostToolUse codex surfaces and prove no duplicate Stop loop.

4. W156 F1.E: Manifest/provenance reconciliation only after F1.B-F1.D evidence cells are closed.

## Close

ARTIFACT-INLINE: tmp/wave156-f1-close-synthesis-2026-05-12.md

Combined close: F1-BLOCK. V1 exists and is useful for narrowing; V2 remains missing; V3's 10 saved-ship catches are confirmed as the controlling blocker set. REVERT precedents at `36f8267` and `ba04d86` are verified and must be handled before any Tier 1a hook install/status promotion.
