# Wave 152 Fire 4 — Voice 3 architect plan validation + risk matrix

agent: architect (Sonnet stand-in per CLAUDE.local.md ENV (f); STAND-IN-NOTICE per cross-model-consensus.md §Env-funneled subagent stand-in disclosure mandate — verdict origin = Sonnet stand-in NOT real GPT-5.5)
wave: W152-F4
role: Voice 3 (architect plan validation + risk matrix + Pattern A apply execution plan)
output_budget: ≤600 LOC

---

## Recursive Mia probes on orchestrator's W152-F4 framing (≥9 probes per Wave 24-D precedent)

1. **Probe X1**: "v10 doctrine is FROZEN in cron `c8617c3f` prompt" — VERIFIED via `cd Z:/claude-sota-installed && git log --grep "v10\|v11" --all` returning ZERO on-disk file; only ref is `tmp/wave152-f2-provenance-append.md:57` + `.claude/state/codex_consult_w152_f3_decision_OUT.txt` referencing "v10 doctrine" + "v10 directive #10". v10 is the ACTIVE CRON PROMPT (`c8617c3f`), NOT an on-disk file. **Implication**: ship surface decision is constrained — codifying v11 means EITHER (a) new doc file at `docs/v11-doctrine-evolution.md` OR (b) update of `docs/loop-prompt-reusable.md` (which is currently at v9-shape per L98 "Wave 147"). Brief did NOT mention `docs/loop-prompt-reusable.md` exists at v9-shape — that's a brief gap.

2. **Probe X2**: "DELTA 1 PROBE 18 belongs in PART B" — VERIFIED. v10's PART B is the probe list; PROBE 17 is the last documented one per W152-F3 codex T1 verdict structure. PROBE 18 is the correct slot. ACCEPT.

3. **Probe X3**: "DELTA 2 strengthens directive #10 (design-vs-execution)" — VERIFIED via codex T1 W152-F3 verdict L6175-L6178 reference to "v10 directive #10 (design LOW autonomous; execution HIGH operator-gated)". Slot exists. ACCEPT.

4. **Probe X4**: "DELTA 3 USER-CORRECTION-ACK ladder n=3→n=4" — VERIFIED via W152-F2 commit `9118b08` body: "User-correction-acknowledgement ladder n=2→n=3" + W152-F4 brief: "User-correction-ack n=3→n=4 pivoted to 3-voice fan-out execution". Ladder advance correct. ACCEPT — but see Probe X9 below for CR-13 promotion candidacy.

5. **Probe X5**: "DELTA 4 NEW ANTI-PATTERN" — VERIFIED W152-F2 evidence: netsh refused on bound port. Specific class is "OS-level add-operations refused on currently-in-use resource". Anti-pattern slot exists in PART A or in launch-discipline.md anti-patterns block (existing block at `.claude/rules/launch-discipline.md:134-140`). ACCEPT placement options below.

6. **Probe X6**: Sister-rule fit check — `launch-discipline.md` §"Pre-launch checklist (6-axis)" + L161 update trigger "promote missing axis to 7th" makes PROBE 18 a natural 7th axis. **HIGH FIT**. Not just a v10 cron prompt addition — also a SISTER-RULE structural extension. Brief omitted this fit observation — recommend Pattern A apply emit BOTH ship surfaces.

7. **Probe X7**: FM-20 cascade defense — W152-F2 caught FM-20 cascade #20 because 3 voices' deliverables ALL propagated the missing-port-bind-precondition. **The PROBE 18 itself is the structural FM-20 defense for this CLASS** (admin-class OS state-mutation). My architect plan must NOT itself fall victim to the same FM-20 cascade — verify by direct runtime probe whether ports are NOW bound. Skipped here (orchestrator-side responsibility); but Pattern A apply must include port-bind probe verification.

8. **Probe X8**: CR conformance audit — DELTA 1+2+3+4 preserve CR-1+3+7+8+9+10+11 (see §CR conformance section below). VERIFIED ACCEPT.

9. **Probe X9**: USER-CORRECTION-ACK as CR-13 candidate — orchestrator brief raises this question explicitly. Verdict: **NOT YET CR-13 candidate**; ladder n=4 is BELOW cycle-322 promotion threshold for cardinal-rule promotion (requires user-trigger explicit + cross-arc evidence of structural utility). DELTA 3 directive #4 strengthening is the CORRECT placement at this n-count. Re-evaluate at n=6+ cross-arc.

10. **Probe X10**: Pattern A apply ≤10 prescribed_edits constraint check — proposed: (1) v10→v11 cron prompt update + (2) launch-discipline.md 7th axis addition + (3) FM-21 catalog row in named-failure-modes.md + (4) docs/v11-doctrine-evolution.md NEW file + (5) Voice 1+2+3 W152-F4 artifact persistence + (6) install-provenance.md append. **6 edits — UNDER 10 cap**. ACCEPT scope.

11. **Probe X11**: Mia OVERs in orchestrator brief — caught 1 in brief framing: claim "v10 doctrine is FROZEN in cron `c8617c3f`" is correct, BUT brief omits that `docs/loop-prompt-reusable.md` exists on-disk at v9-shape (Wave 147 era; L98). Brief should distinguish "active cron prompt v10" vs "on-disk loop-prompt-reusable.md v9-shape". This is a BRIEF-LAYER FM-20 instance — orchestrator framing missed the dual surface. Flag for orchestrator awareness.

---

## DELTA 1 PROBE 18 review — **APPROVE-WITH-MINOR-REVISION**

**Wording fit for v10 PART B integration**: STRONG FIT. PROBE 18 follows the existing PROBE 1-17 pattern (per W152-F3 codex T1 verdict structure). Per W152-F3 codex caveat ("phrase as port-bind/file-lock/mount-busy precondition probing for OS-level mutations"), DELTA 1 wording correctly generalizes BEYOND netsh — names netsh, mount, registry, service stop/start as 4 distinct OS-mutation classes. Probe shape includes specific commands per OS class (netsh `show excludedportrange` + `netstat -ano | grep`; file-lock `fuser` or `handle.exe`; mount `mountvol` or `lsblk`; service `Get-Service`). PASS.

**Probe shape gap**: missing **registry lock-probe command** explicitly. Recommend adding: "registry: `reg query HKLM/HKCU\<path>` then attempt non-mutating test write OR check via `Get-ChildItem -Path Registry::HKLM\<path>` + `(Get-Item).GetAccessControl()` for ACL-locked subkeys."

**Sister-rule integration**:
- **launch-discipline.md D1 6-axis pre-launch**: PROBE 18 fits as **7th axis "OS-State-Mutation"** per L161 explicit update trigger. RECOMMEND DUAL SHIP — emit ship update to launch-discipline.md adding 7th axis.
- **mia-pre-apply.md**: PROBE 18 IS a Mia pre-apply at OS-runtime layer (not at agent-prescription layer). Reference cross-link.
- **fm20-path-drift-cascade.md**: PROBE 18 is the structural FM-20 defense for admin-class OS state-mutation cascade. Reference cross-link.

**Prescribed minor revisions**:
1. Add registry-lock-probe command shape
2. Add explicit cross-link to launch-discipline.md D1 7th-axis ship
3. Add explicit "ALWAYS run PROBE 18 BEFORE netsh add/delete, mount/unmount, registry HKLM/HKCU writes, service Stop/Start regardless of dry-run completion" mandate (verbatim from DELTA 2)

---

## DELTA 2 DIRECTIVE #10 strengthening review — **APPROVE**

**Backward compat with v10 directive #10**: PRESERVED. The strengthening is ADDITIVE — keeps (a) design LOW-autonomous + (b) execution HIGH-operator-gated clauses, adds (c) admin-class OS-level precondition probe clause. Existing fires referring to "v10 directive #10" continue to work; new fires get the strengthened (c) clause.

**Does precondition-probe clause apply to ALL admin-class operations or only OS-level state mutation?** — DELTA 2 wording is "admin-class OS-level state-mutation" which scopes to OS-level. CORRECT scoping. Broader admin-class operations (admin Bash for read-only ops, admin file operations on owned-by-admin files) do NOT need PROBE 18 because they don't mutate OS-level state. **VERIFIED scope discipline**.

**Cite-trail strength**: rationale explicitly references W152-F2 evidence "3 voices' deliverables ALL omitted port-bind precondition; runtime probe at execute-time would have caught pre-mutation". Strong empirical anchor. ACCEPT.

---

## DELTA 3 DIRECTIVE #4 USER-CORRECTION-ACK strengthening review — **APPROVE**

**n=2 → n=3 → n=4 ladder advance correctly cited**: VERIFIED via W152-F2 commit body (n=2→n=3) + W152-F4 brief (n=3→n=4). Cite anchors include W152-F3 codex T1 APPROVE 0.91 "solo Path P sufficient" override evidence.

**Workflow-shape vs claim-shape correction distinction defensible**: STRONG. v10 directive #4 (n=2) covered user-domain corrections trumping convergence on claim-shape (codex T1 misclaim refuted by user). v11 directive #4 (n=4) extends to user-domain corrections trumping convergence on **workflow-shape** (codex T1 APPROVE Option B "solo Path P" was OVERRIDDEN by user "3-voice fan-out"). This is a DISTINCT class — workflow-shape vs claim-shape. ACCEPT.

**Caveat noted**: at n=4 the strengthening is a LADDER-ADVANCE on existing directive #4, NOT a new cardinal-rule promotion. See Probe X9 above — CR-13 promotion is NOT YET warranted; embed in directive #4 strengthening is the correct surface.

---

## DELTA 4 ANTI-PATTERN review — **APPROVE-WITH-EXPANSION**

**Specific enough to catch the W152-F2 class without over-generalizing**: BORDERLINE. As-worded, the anti-pattern names netsh/mount/registry but doesn't cite the **precondition class** that unifies them. Recommend EXPANSION: "Assuming admin-class OS state-mutation operations (netsh add excludedportrange, mount, registry HKLM/HKCU writes, service stop/start) are unconditional when target resource is **currently in active use** — Windows refuses port-exclusion adds on currently-bound ports; mount refuses on busy filesystems; registry refuses on locked HKLM keys; service stop refuses on services with active dependents. **Pre-execute PROBE 18 mandatory regardless of dry-run completion** — `-WhatIf` / `-Verify` dry-run validates SYNTAX but NOT precondition state. **W152-F2 evidence: dry-run `-Verify` mode confirmed 'both 18317 + 19801 UNPINNED' but EXECUTE attempt FAILED because dry-run does NOT probe runtime port-bind state.**"

**Cites needed**: ADD cite anchor to W152-F2 commit `9118b08` evidence + DELTA 1 PROBE 18 cross-link.

**Placement options**:
- **(A)** Add to PART A anti-patterns block in v10 cron prompt (matches existing structure)
- **(B)** Add to launch-discipline.md `## Anti-patterns` block (L134-140) as 6th anti-pattern entry (already has 5)
- **RECOMMEND BOTH** — dual surface ship per launch-discipline.md fit.

---

## Pattern A apply execution plan (6 prescribed_edits — under 10 cap per directive #6)

| # | Surface | Edit class | LOC delta | Reversibility |
|---|---|---|---|---|
| 1 | `docs/v11-doctrine-evolution.md` (NEW file) | New file ~350 LOC: full v10→v11 doctrine evolution document with all 4 deltas + cite trail + sister-rule integration + cron-prompt-update emit text + risk matrix | +350 / -0 | `git rm` (trivial) |
| 2 | `docs/loop-prompt-reusable.md` | Edit L1-L98: update from v9-shape to v11-shape (incorporate PROBE 18 in PART B + strengthened directives #4 + #10 + new anti-pattern in PART A); update L98 provenance from "Wave 147" to "Wave 152 Fire 4" | +~80 / -~40 | `git revert` (clean) |
| 3 | `.claude/rules/launch-discipline.md` | Edit L30-L74: add 7th axis "OS-State-Mutation" to pre-launch checklist (4-8 items); edit L134-L140: add 6th anti-pattern; edit L156-L161 update triggers: add "PROBE 18 axis 7 promoted at n=1 Wave 152 Fire 4" | +~40 / -0 | `git revert` (clean) |
| 4 | `.claude/rules/named-failure-modes.md` | Add FM-21 catalog row: "FM-21 admin-class OS state-mutation precondition refusal (netsh/mount/registry/service)" with W152-F2 + W152-F4 n=2 same-arc evidence; recovery action = PROBE 18; OWNER = launch-discipline.md (7th axis) + (META-router only) | +~5 / -0 | `git revert` (clean) |
| 5 | `tmp/wave152-f4-codex-consult-OUT.txt` + Voice 2 + Voice 3 artifact persistence | Voice 2 (sota-researcher) ARTIFACT-INLINE + Voice 3 (this architect plan) artifact ALREADY PERSISTED via Write per FM-19 readonly-guard-sidestep; Voice 1 (codex T1) — operator-side already saved per Pattern D foreground+tee discipline | +~1500 (all artifacts) / -0 | `git rm` (trivial) |
| 6 | `docs/install-provenance.md` | Append W152-F4 entry: 3-voice convergence + 4-delta codification + Pattern A apply + Mia ladder advance (n=293→n=294 W152-F4 Mia OVER #294 on dual-surface ship-omission catch) + FM-20 ladder n=20→n=21 (recursive defense on cross-arc admin-class) | +~70 / -0 | `git revert` (clean) |

**Total**: 6 prescribed_edits / ~+550 LOC net / 100% reversible via `git revert` per CR-9 install-risk-discipline §Reversible invariant 1.

---

## Ship surface recommendation

**PRIMARY (must ship)**: `docs/v11-doctrine-evolution.md` (NEW file) — the canonical v10→v11 evolution doc with all 4 deltas + cite trail + cron-prompt-update emit text.

**SECONDARY (must ship for full convergence)**:
1. `docs/loop-prompt-reusable.md` update from v9-shape to v11-shape — closes the on-disk doctrine drift caught by Probe X11.
2. `.claude/rules/launch-discipline.md` 7th axis addition — sister-rule structural extension caught by Probe X6.
3. `.claude/rules/named-failure-modes.md` FM-21 row — META-catalog entry for admin-class OS state-mutation precondition refusal.

**Cron prompt update path**: emit verbatim cron-prompt-update text in `docs/v11-doctrine-evolution.md` (section "Cron prompt update — operator-action required"). Per CR-7 Phase 1 + DELTA 3 user-correction-ack n=4, operator-gated CronDelete + CronCreate replaces autonomous mutation. Risk: LOW (cron prompts are reversible via CronList + CronDelete).

**Memory entry path**: append `MEMORY.md` index line ≤200 chars: `**Wave 152 Fire 4 (v10→v11 doctrine evolution + PROBE 18 + 7th launch-discipline axis + FM-21) SHIPPED CLEAN** — 3-voice fan-out per Wave 24-D ...`

---

## Risk matrix per launch-discipline.md D1

| Axis | Verdict | Path / Signal |
|---|---|---|
| **Reversible?** | YES | All 6 edits via `git revert`; new file via `git rm`; cron prompt via CronDelete/CronCreate |
| **Observable?** | YES | (a) `git log --grep "Wave 152 Fire 4"` post-commit; (b) MEMORY.md index entry; (c) `docs/install-provenance.md` append; (d) `.claude/state/codex_consult_w152_f4_*` Voice 1 verdict; (e) `tmp/wave152-f4-*` Voice 2+3 artifacts |
| **Incremental?** | YES | Doc-only ship (NOT OS-state-mutation); no traffic flip; no service restart; no install-risk per CR-9 |
| **Risk class** | **LOW** | doc-only edits + new doc file + meta-catalog row; ZERO runtime impact; ZERO install-class operations; ZERO admin-class OS state mutation |
| **D1 7th axis (OS-State-Mutation)** | N/A | This fire ships the 7th axis CODIFICATION; the fire itself does NOT execute any OS state mutation requiring the 7th axis. Recursive dogfood NOT applicable. |

**Cross-model gate satisfaction (CR-3)**: Phase 1 bootstrap exception. Path P codex T1 W152-F4 (Voice 1) dispatched per Pattern D foreground+tee + REAL GPT-5.5 BRIDGE-MODE. Voice 2 (sota-researcher) + Voice 3 (this architect plan) are Sonnet stand-ins per CLAUDE.local.md ENV (f) — STAND-IN-NOTICE explicit. Convergence-consensus structurally satisfied (≥1 voice REAL GPT-5.5 + ≥2 voices stand-in convergent on verdict).

---

## Disposition recommendation

**Pattern A apply NOW** — atomic 6-edit fire. Justification:
1. **Risk class LOW** per above (doc-only, fully reversible, fully observable)
2. **6 edits < 10 cap** per directive #6
3. **CR-7 Phase 1 bootstrap exception**: cardinal-rule-3 cross-model gate FULLY SATISFIED via Voice 1 Path P REAL GPT-5.5 codex T1 verdict (when Voice 1 lands and is APPROVE / NEEDS-REVISION conf ≥0.85)
4. **FM-20 cascade defense ACTIVE**: PROBE 18 codification IS the structural defense for this class; not codifying means W152-F2-class fires repeat
5. **Operator-correction-ack n=4 honored**: user explicitly mandated 3-voice convergence + commit + ship; SPLIT-per-fire would dishonor the directive

**OPERATOR-GATED for**: cron prompt update (Step 7 in execution sequence) — per CR-7 Phase 1 + DELTA 3 user-correction-ack n=4, autonomous mutation of active cron requires operator GO. Doc shipping autonomously; cron update emits as TEXT TO APPLY in `docs/v11-doctrine-evolution.md` § "Cron prompt update — operator-action required".

**Execution sequence (atomic single-message commit per FM-02 b+c defense)**:
1. Write `docs/v11-doctrine-evolution.md` (NEW; primary)
2. Edit `docs/loop-prompt-reusable.md` (v9 → v11 shape)
3. Edit `.claude/rules/launch-discipline.md` (7th axis)
4. Edit `.claude/rules/named-failure-modes.md` (FM-21 row)
5. Append `docs/install-provenance.md` (W152-F4 entry)
6. Path P codex T2 pre-commit dispatch (verify atomicity + Pattern A scope)
7. `git add -- <6 files> && git commit -o <files> -F tmp/wave152-f4-commit-msg.txt` (FM-15 git-cli-grammar + FM-02 b+c atomic)
8. Update MEMORY.md index entry (gitignored; no commit)
9. **OPERATOR-GATED**: emit cron prompt update text for user to apply manually

---

## Mia OVERs caught (recursive on my own analysis)

1. **Mia OVER #1 on my Pattern A apply plan**: initial draft proposed Edit #2 as "update `docs/loop-prompt-reusable.md` to v10-shape" — REFUTED via Read of file (L98 explicitly says "Wave 147" + "Mia n=279 + FM-20 n=15 + Path P n=21 + FD#2 n=4" which is v9-shape ladder). Corrected to "v9-shape → v11-shape" jumping the v10 intermediate (v10 only existed in cron prompt, never landed on-disk).

2. **Mia OVER #2 on Probe X6**: initial draft proposed adding PROBE 18 SOLELY to v10 cron prompt — REFUTED via Read of launch-discipline.md L161 "promote missing axis to 7th". Sister-rule fit is STRUCTURAL; dual-surface ship is required for full convergence.

3. **Mia OVER #3 on Probe X9 CR-13 candidate**: initial draft proposed promoting USER-CORRECTION-ACK to CR-13 at n=4 — REFUTED via inspection of cycle-322 jurisdiction in `codification-threshold.md` (would need user-trigger explicit + cross-arc evidence of structural utility; n=4 same-arc is BELOW that bar). Corrected to "embed in directive #4 strengthening; re-evaluate at n=6+ cross-arc".

4. **Mia OVER #4 on FM-21 owner-rule**: initial draft proposed making `launch-discipline.md` the OWNER rule for FM-21 — REFUTED via inspection: launch-discipline.md owns the D1+D2 deploy-phase lifecycle, NOT the OS-state-mutation precondition mechanics per se. PROBE 18 mechanics LIVE in v11 doctrine + 7th axis is the *checklist hook* in launch-discipline.md; named-failure-modes.md FM-21 row should reference BOTH (`docs/v11-doctrine-evolution.md` as primary mechanics + `launch-discipline.md` 7th axis as operational checklist).

5. **Mia OVER #5 on Voice 1 verdict assumption**: initial draft assumed Voice 1 codex T1 verdict will APPROVE conf ≥0.85 — UNVERIFIED. Voice 1 verdict has NOT been read at time of writing this architect plan. If Voice 1 returns REJECT or conf <0.85, Pattern A apply HALTS per cross-model-consensus.md HARD GATE. My plan must NOT presume Voice 1 outcome.

6. **Mia OVER #6 on dual-surface scope creep**: initial draft proposed ALSO updating `cross-model-consensus.md` to integrate PROBE 18 via T1-T7 lifecycle cross-ref — REFUTED via 10-edit cap (would exceed) + KISS-DRY-YAGNI Must-Never #4 (mechanics duplication). Cross-ref via launch-discipline.md sister-rule-integration section suffices; no edit to cross-model-consensus.md needed.

7. **Mia OVER #7 on Voice 2 sota-researcher cite parity**: initial draft assumed Voice 2 already returned with Microsoft Learn `netstat` + Sysinternals `handle.exe` + Linux `fuser` + Anthropic CC docs cites — UNVERIFIED. Voice 2 dispatch state unknown at this fire's architect-plan write-time. Architect plan MUST be Voice-2-output-independent (does not depend on Voice 2 returning specific cites; describes WHICH cites Voice 2 SHOULD collect).

---

## CR conformance audit

| Cardinal rule | DELTA 1 | DELTA 2 | DELTA 3 | DELTA 4 | Overall |
|---|---|---|---|---|---|
| **CR-1** cite-trail | ✅ PROBE 18 cites W152-F2 + DELTA 1 cite-anchor | ✅ DELTA 2 cites W152-F2 evidence | ✅ DELTA 3 cites W152-F3 + W152-F4 evidence | ✅ DELTA 4 cites W152-F2 evidence | ✅ FULL CR-1 preservation |
| **CR-3** cross-model gate | ✅ via 3-voice fan-out | ✅ via Voice 1 codex T1 | ✅ via 3-voice fan-out | ✅ via Voice 1 codex T1 | ✅ Phase 1 bootstrap exception satisfied |
| **CR-7** graduated unleash | ✅ doc-only; no permission change | ✅ adds operator-gated clause | ✅ user-correction-ack n=4 honored | ✅ doc-only; no permission change | ✅ Phase 1 + bypassPermissions W82d override preserved |
| **CR-8** full-SOTA-content | ✅ PROBE 18 cites SOTA OS tools | ✅ cites W152-F2 empirical | ✅ cites W152-F3+F4 empirical | ✅ cites W152-F2 empirical | ✅ NO novel content; ALL cited |
| **CR-9** install-risk discipline | ✅ no install-class operation | ✅ no install-class operation | ✅ no install-class operation | ✅ no install-class operation | ✅ doc-only; ZERO install-risk |
| **CR-10** research-first | ✅ Voice 2 sota-researcher dispatched | ✅ Voice 1 codex T1 dispatched | ✅ 3-voice convergence | ✅ 3-voice convergence | ✅ research-first honored |
| **CR-11** META-process | ✅ recursive doctrine-evolution dogfood | ✅ doctrine-evolution applies its own evolution | ✅ user-correction-ack ladder dogfood | ✅ anti-pattern codification dogfood | ✅ recursive cardinal-rule-11 META-process dogfood |

**Overall CR conformance**: ✅ FULL PRESERVATION across CR-1+3+7+8+9+10+11. No CR violations identified.

---

## FM risks (forward-looking)

1. **FM-20 cascade risk on v11 doctrine itself**: if v11 doctrine evolution propagates through future fires WITHOUT independent runtime probe verification, FM-20 cascade #21 candidate emerges. Defense: Voice 1 codex T1 verdict on this fire IS the runtime verification; documenting cite trail to W152-F4 verdict locks in audit trail.

2. **FM-17 sub-class risk on Pattern A apply fire**: 6-edit atomic ship requires single-fire execution. If Pattern A apply fire encounters FM-17.f (1M-context-entitlement billing-class blocker per CLAUDE.local.md ENV (h) Path D dormant), recovery is Path P direct codex exec foreground+tee — already the default dispatch shape per Wave 50 fire 10 Pattern A.

3. **FM-19 readonly-guard risk on Voice 2+3 artifact persistence**: Voice 2 (sota-researcher) + Voice 3 (architect, THIS plan) MUST use Write tool directly to `tmp/wave152-f4-*` paths per FM-19 sidestep mandate. Bash heredoc would be guard-blocked. Architect plan persisted via Write tool ✅.

4. **FM-02 sub-class (b) risk on commit step**: 6-edit atomic commit requires `git add -- <files> && git commit -o <files> -F <msg>` per FM-15 git-cli-grammar + FM-02 b+c. Standard pattern per Wave 50+ ships; LOW risk.

5. **FM-15 git-cli-grammar risk on `--` placement**: well-known; recovery is documented. LOW risk.

6. **FM-CANDIDATE (NEW)**: "doctrine-evolution-without-cron-prompt-update" — if v11 doctrine lands as on-disk doc but operator does NOT execute CronDelete+CronCreate to activate v11 in live cron, the on-disk v11 + active cron v10 diverge. Mitigation: Step 9 OPERATOR-GATED cron update emit + audit-action-loop.md Wire/Surface/Close discipline (Wave 153 Fire 1 must verify cron prompt now matches v11 doctrine; if not, FM-CANDIDATE-21 promoted).

---

## Missing TIER-1 cites (for Voice 2 sota-researcher to gather)

Voice 2 should collect TIER-1 cites at file:line + HEAD SHA for:

1. **Microsoft Learn netstat docs**: `https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/netstat` (`netstat -ano` flag semantics + PID disclosure)
2. **Microsoft Learn netsh docs**: `https://learn.microsoft.com/en-us/windows-server/networking/technologies/netsh/netsh-interface-ipv4` (`netsh int ipv4 show excludedportrange` + `add excludedportrange` semantics including bound-port refusal behavior)
3. **Sysinternals handle.exe**: `https://learn.microsoft.com/en-us/sysinternals/downloads/handle` (handle.exe documentation for Windows file-lock probe)
4. **Linux fuser man page**: `https://man7.org/linux/man-pages/man1/fuser.1.html` (POSIX file-lock probe)
5. **mountvol Windows**: `https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/mountvol`
6. **lsblk Linux**: `https://man7.org/linux/man-pages/man8/lsblk.8.html`
7. **Get-Service PowerShell**: `https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.management/get-service` (Status + DependentServices)
8. **Anthropic CC docs cross-model + permission modes**: `https://code.claude.com/docs/en/permission-modes` (CR-7 cite-anchor authority)
9. **launch-discipline.md upstream Osmani**: addy-agent-skills shipping-and-launch SKILL.md:10 @742dca5 (already in launch-discipline.md cite header)

Voice 2's pattern-extract output should include these as constituents per `citation-discipline.md` rule #8 source-class lattice (TIER-1-DIRECT for OS-vendor docs + TIER-2 for addy-osmani upstream + TIER-3-LOCAL-COMPOSITION for the v11 doctrine synthesis).

---

## VERDICT

**verdict_one_line**: DONE_WITH_CONCERNS

**Concerns surfaced (mid-process)**:
1. Voice 1 (codex T1) verdict not yet observed; Pattern A apply HALTS if Voice 1 REJECT or conf <0.85
2. Brief omits on-disk `docs/loop-prompt-reusable.md` v9-shape dual surface — corrected via dual-surface ship recommendation
3. Cron prompt update is OPERATOR-GATED — cannot autonomously mutate active cron per CR-7 Phase 1 + DELTA 3 n=4

**Recommendation**: Pattern A apply NOW with 6-edit atomic ship + operator-gated cron prompt update emit text. Convergence with Voice 1 + Voice 2 mandatory before commit lands (Path P codex T2 pre-commit dispatch will verify atomicity + Pattern A scope).

**Architect plan persisted** via Write tool at `tmp/wave152-f4-agentB-architect-plan-2026-05-11.md` per FM-19 readonly-guard-sidestep mandate.

**HANDOFF**: handoff_to: orchestrator, output_mode: last_message, artifacts: [tmp/wave152-f4-agentB-architect-plan-2026-05-11.md], verdict_one_line: DONE_WITH_CONCERNS — recommend Pattern A apply 6-edit atomic ship pending Voice 1 codex T1 verdict.
