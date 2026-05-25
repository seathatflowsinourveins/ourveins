# v11 doctrine evolution — W152-F4 3-voice SOTA convergence ship

# constituents=[TIER-1-DIRECT @ MS Learn Get-NetTCPConnection / netstat / Sysinternals handle.exe v5.0 + man7 fuser(1) + lsof(8) + Anthropic CC hooks PreToolUse permissionDecision deny, TIER-2-EVIDENCE @ Stack Overflow Q54010365 Hyper-V port-bind pattern, TIER-3-LOCAL-OPERATOR-DERIVED @ W152-F2 netsh-refused-on-bound-port commit `9118b08`]; effective_tier=TIER-3-LOCAL-COMPOSITION per `Z:/claude-sota/.claude/rules/citation-discipline.md` rule #8 MIN_PRECEDENCE

# Reference: TIER-1-DIRECT `https://learn.microsoft.com/en-us/powershell/module/nettcpip/get-nettcpconnection` [VERIFIED 2026-05-11 via Wave 152 Fire 4 Voice 2 sota-researcher] — Windows SOTA primitive for port-bind precondition; preferred over `netstat -ano` for PowerShell-native invocation
# Reference: TIER-1-DIRECT `https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/netstat` [VERIFIED 2026-05-11 via Voice 2] — alternate Windows probe (legacy but still SOTA)
# Reference: TIER-1-DIRECT `https://learn.microsoft.com/en-us/sysinternals/downloads/handle` v5.0 [VERIFIED 2026-05-11 via Voice 2] — file-lock probe on Windows
# Reference: TIER-1-DIRECT `https://man7.org/linux/man-pages/man1/fuser.1.html` [VERIFIED 2026-05-11 via Voice 2] — POSIX socket/file probe
# Reference: TIER-1-DIRECT `https://man7.org/linux/man-pages/man8/lsof.8.html` [VERIFIED 2026-05-11 via Voice 2] — POSIX `lsof -i :<PORT>` enumeration
# Reference: TIER-1-DIRECT `https://code.claude.com/docs/en/hooks` (PreToolUse permissionDecision deny) [VERIFIED 2026-05-11 via Voice 2] — gate-layer enforcement for PROBE 18
# Reference: TIER-3 W152-F2 commit `9118b08` body — local-measured evidence that `netsh add excludedportrange` REFUSES on currently-bound ports with "process cannot access file because it is being used by another process" error
# Reference: TIER-2 Voice 1 codex T1 W152-F4 Path P trace at `.claude/state/codex_consult_w152_f4_convergence_OUT.txt` 4411 LOC Pattern B HNF disposition (codex observation: "primary docs support the probe classes, but not every failure sentence should be treated as an external TIER-1 fact. The netsh 'bound port refuses exclusion add' point is strongest as local measured evidence from W152-F2 plus Microsoft command docs for the command surface")
# Reference: TIER-3 Voice 2 sota-researcher artifact at `tmp/wave152-f4-agentA-sota-research-2026-05-11.md` 276 LOC (multi-source breadth 5 families: MS Learn / Exa / addy-skills / cwc-hooks / man7 + Anthropic CC bonus 6th — CR-15 ≥4 satisfied)
# Reference: TIER-3 Voice 3 architect artifact at `tmp/wave152-f4-agentB-architect-plan-2026-05-11.md` 430 LOC (11 recursive Mia probes + DELTA review + 6-edit Pattern A plan + risk matrix LOW)

## v10 → v11 evolution summary

W152-F2 commit `9118b08` surfaced Mia OVER #293 + FM-20 cascade #20: codex T1 W152 verdict 🅰 APPROVE 0.94 was STALE on "ports currently bound by NSSM" precondition. `netsh add excludedportrange` REFUSED on actively-LISTENING ports. State NOT mutated. 3 voices (Voice 1 codex + Voice 2 sota-research Microsoft Learn cite + Voice 3 architect plan) ALL omitted the port-bind precondition probe — FM-20 cascade through synthesis-vs-brief boundary.

W152-F4 3-voice convergence (Voice 1 Path P codex T1 Pattern B HNF + Voice 2 sota-researcher 6 TIER-1 cites + Voice 3 architect 11 recursive Mia probes) codifies the gap as 4 v10 → v11 deltas.

## DELTA 1 — NEW PROBE 18 "OS-level state-mutation precondition probe"

Add to PART B PROBES list (after PROBE 17):

```
PROBE 18 | OS-level state-mutation precondition probe (NEW v11) |
  for any admin-class OS modification (netsh add/delete excludedportrange,
  netsh add reservedaddress, mount/unmount, registry HKLM/HKCU writes,
  service Stop/Start, port-bind release): pre-execute check
  "is the target currently bound/locked/busy?"

  Windows: `Get-NetTCPConnection -LocalPort <port>` (preferred — PowerShell SOTA)
           OR `netstat -ano | findstr :<port>` (legacy fallback)
           OR `handle.exe -p <process>` for file-lock (Sysinternals)
  POSIX:   `lsof -i :<port>` for port-bind / `fuser <path>` for file-lock
  Mount:   `mountvol <volume> /L` (Windows) OR `lsblk -o NAME,MOUNTPOINT` (Linux)
  Service: `Get-Service <name> | Select-Object Status` BEFORE Stop-Service
  Registry: open `Z:/regedit-lock-test.reg`-style probe OR PowerShell
            `Test-Path Registry::HKEY_LOCAL_MACHINE\<key>` + acquire-attempt
```

Cite trail: TIER-1-DIRECT MS Learn + man7 + Anthropic CC (6 anchors above). Effective cite class TIER-3-LOCAL-COMPOSITION per citation-discipline.md rule #8 (Voice 2 lattice).

## DELTA 2 — STRENGTHENED DIRECTIVE #10 "design-vs-execution + precondition-probe distinction"

v10 directive #10: "Design-vs-execution distinction: design commits LOW-risk autonomous; execution HIGH-risk operator-gated."

v11 directive #10:
> Design-vs-execution + precondition-probe distinction:
> (a) Design commits LOW-risk autonomous (docs / rules / scripts pre-deployment design);
> (b) Execution HIGH-risk operator-gated (actual mutation of live services / ports / Docker / registry / mounts);
> (c) **Admin-class OS-level state-mutation MUST run PROBE 18 (port-bind / file-lock / mount-busy / service-state) precondition check BEFORE execute** — codex T1 verdict + Mia pre-apply + Voice 2 sota-research are NECESSARY BUT NOT SUFFICIENT to predict runtime OS-level refusal patterns. **W152-F2 evidence**: 3 voices' deliverables ALL omitted port-bind precondition; runtime probe at execute-time would have caught pre-mutation.

## DELTA 3 — STRENGTHENED DIRECTIVE #4 USER-CORRECTION-ACK n=4

v10 directive #4: "USER-CORRECTION-ACKNOWLEDGEMENT channel (n=2): user-domain corrections trump 3-voice convergence when orchestrator-biased."

v11 directive #4:
> USER-CORRECTION-ACKNOWLEDGEMENT channel (n=4): user-domain corrections trump 3-voice convergence when orchestrator-biased **AND** trump cross-model codex T1 verdict on workflow-shape choice (3-voice fan-out vs solo Path P).
>
> **W152-F3 → W152-F4 evidence**: codex T1 APPROVE 0.91 "solo Path P sufficient" was OVERRIDDEN by dual user-message interrupt "convergence research + GPT-5.5 SOTA review + multi-source + definitive truth + ship". Workflow-shape is user-domain expertise; orchestrator should default to fan-out when user mandates it even if codex T1 says solo is sufficient.

Per Voice 3 Probe X9: n=4 NOT YET CR-13 candidate (cycle-322 cross-arc promotion bar requires n=6+). Re-evaluate at n=6+ cross-arc recurrence.

## DELTA 4 — NEW ANTI-PATTERN

Add to PART A anti-patterns list AND `launch-discipline.md` §Anti-patterns (Voice 3 dual placement recommendation):

> Assuming netsh/mount/registry/service-control add-or-modify operations are unconditional when target resource is currently in active use — Windows refuses port-exclusion adds on currently-bound ports; mount refuses on busy filesystems; registry refuses on locked HKLM keys; service Stop refuses on dependents. **Pre-execute PROBE 18 mandatory** for admin-class OS-level state mutation.

## Cite-class lattice (Voice 2 prescription, citation-discipline.md rule #8 conformance)

```
constituents=[TIER-1-DIRECT @ MS Learn × 3 (Get-NetTCPConnection / netstat / Sysinternals handle.exe) + man7 × 2 (fuser / lsof) + Anthropic CC × 1 (hooks PreToolUse permissionDecision),
              TIER-2-EVIDENCE @ Stack Overflow Q54010365 Hyper-V port-bind pattern,
              TIER-3-LOCAL-OPERATOR-DERIVED @ W152-F2 commit `9118b08` netsh-refused-on-bound evidence];
effective_tier=TIER-3-LOCAL-COMPOSITION
```

Per `Z:/claude-sota/.claude/rules/citation-discipline.md` rule #8 MIN_PRECEDENCE: PROBE 18 is local glue atop TIER-1 OS primitives — cite class settles at LOCAL-COMPOSITION even though OS-primitive cites are TIER-1-DIRECT.

## Voice 2 HIGH Mia OVER on orchestrator framing (recursive synthesis-layer-verify)

Voice 2 caught: `tools/wave152-f1-netsh-pin.ps1` (W152-F1 SHIP-READY script, 225 LOC at commit `bac0152`) has **ZERO** `Get-NetTCPConnection` / `netstat` / `fuser` / `lsof` / `handle.exe` probes. **VERIFIED via Mia probe**: `grep -nE "Get-NetTCPConnection|netstat|fuser|lsof|handle\.exe" tools/wave152-f1-netsh-pin.ps1` returned 0 matches.

**Implication**: W152-F1 script ONLY checks idempotency (`Test-PortInExclusions` — "is port already in excluded list?") but NOT precondition (`is port currently bound by a process?`). If operator runs script standalone (Option B from W152-F2 revised plan) WITHOUT first stopping NSSM services, script would hit the same Windows-refusal error W152-F2 surfaced via direct-Bash netsh.

**Forward disposition**: W152-F1 SHIP-READY status downgraded to **SHIP-READY-CONDITIONAL** — requires either (a) operator pre-stops NSSM services before running OR (b) bundled-into-🅳-Docker-cutover plan (current Forward Top-5 #1) which naturally frees ports during NSSM-stop → Docker-bind transition. Per ONE-LOGICAL-UNIT-PER-FIRE: retroactive script PROBE 18 wrapper queued as **W152-F5 candidate** (separate fire) IF operator chooses Option B standalone path.

## NEW FM-CANDIDATE-21 — "queue-time-prompt-freeze" (PROMOTED to OWNED W152-F11 2026-05-11)

Voice 3 surfaced: v10 doctrine is FROZEN in cron `c8617c3f` prompt (captured at CronCreate time). v11 codification in this file does NOT auto-update the cron prompt. Next cron tick will still load v10 doctrine, not v11. Operator must CronDelete + CronCreate with v11 doctrine to activate.

**FM-CANDIDATE-21 → FM-21 status**: **PROMOTED W152-F11 2026-05-11** to OWNED dedicated rule at `.claude/rules/fm21-queue-time-prompt-freeze.md` per `codification-threshold.md` n=2 same-wave cross-subclass + cycle-321 expected-savings fast-path. Cross-subclass evidence:
- **Sub-class .a CronCreate freeze (recurring)** — W152-F4 commit `46d6844` codified v10 → v11 doctrine evolution; active cron `c8617c3f` continues firing v10 prompt body at each `*/5 * * * *` tick because CronCreate has no in-place update primitive
- **Sub-class .b ScheduleWakeup freeze (one-shot queue-time-to-fire-time context-freeze)** — W152-F7-followup orchestrator-armed ScheduleWakeup 270s pre-dating W152-F7 commit `d55071f` 2026-05-11 16:20:07 -0400; Voice 2 sota-researcher returned DEFER mid-window refuting V1 STUDY-PILOT; ship landed DEFER; wakeup fired ~5min after commit with STALE STUDY-PILOT-NARROW framing referencing refuted disposition. Orchestrator-side STATE PROBE HEAD bypassed re-execution

T1 retroactive codex consult NEEDS-REVISION conf=0.91 + 10 prescribed_edits via Pattern A FIX-FORWARD applied per `codex-t1-fix-forward-pattern.md` Pattern A: cite-class reframed to constituents form (TIER-1-DIRECT @ scheduled-tasks + TIER-3-LOCAL-OPERATOR-DERIVED @ W152 incidents; effective_tier=TIER-3-LOCAL-COMPOSITION) + FM-20 demoted from "specialization" to PEER discipline + W152-F7 timing corrected to git 16:20:07 (not 16:14:30) + TIER-2 cite count corrected 6→5 + "Auto-update mechanism does NOT exist" softened to [INFERRED] + ScheduleWakeup reframed as "one-shot queue-time-to-fire-time context-freeze" + STATE PROBE expanded to clause-level smoke + 3 new anti-patterns (cross-session resume / multi-day operator drift / "HEAD contains shipped" insufficient probe) + mechanical-mirror claim removed (NEW rule with new mechanics + >24 LOC ineligible; full T1 satisfied via retroactive pre-commit-miss recovery).

## Risk matrix (per launch-discipline.md D1)

| Axis | Status |
|---|---|
| Reversible | ✅ git revert + remove docs file + revert rule edits |
| Observable | ✅ commit body + provenance entry + MEMORY entry + 3 voice artifacts at tmp/ |
| Incremental | ✅ single atomic commit; 6 edits across 6 surfaces under Pattern A ≤10-edit cap |
| Risk class | **LOW** (doc-only; no install-class; no OS state mutation) |

## CR conformance matrix (per Voice 1 + Voice 3 convergent verdicts)

| CR | Status | Anchor |
|---|---|---|
| CR-1 cite-trail | ✅ | 6 TIER-1-DIRECT + 1 TIER-2-EVIDENCE + 1 TIER-3-LOCAL-OPERATOR-DERIVED |
| CR-3 cross-model gate | ✅ | Path P codex T1 W152-F4 dispatched + Voice 2/3 dispatched + Pattern B HNF trace-mined |
| CR-7 Phase 1 bootstrap | ✅ | autonomous doc ship under user-correction-ack n=4 unlock |
| CR-8 full-SOTA-content | ✅ | every load-bearing claim cite-anchored |
| CR-9 install-risk | ✅ | no install-class operation; PROBE 18 codification IS the CR-9 strengthening |
| CR-10 research-first | ✅ | 3-voice fan-out + 5 source families (Voice 2 CR-15) |
| CR-11 META-process | ✅ | W152 arc dogfood: F1 design ship + F2 HNF + F3 decision-codex + F4 convergence + Pattern A apply |
| CR-12 5-class | N/A | no adoption decision this fire |

## Pattern A apply scope (this fire — 6 edits per Voice 3 plan)

1. **NEW** `docs/v11-doctrine-evolution.md` (THIS FILE)
2. **EDIT** `docs/loop-prompt-reusable.md` (Voice 3 X11 catch — add v9→v11 evolution note; dual-surface convergence)
3. **EDIT** `.claude/rules/launch-discipline.md` (add 7th axis "OS-State-Mutation" per Voice 3 dual placement + L161 update-trigger)
4. **EDIT** `.claude/rules/named-failure-modes.md` (FM-21 candidate row per Voice 3 NEW FM-CANDIDATE)
5. **APPEND** `docs/install-provenance.md` (W152-F4 3-voice convergence entry)
6. **PREPEND** `.claude/projects/Z--claude-sota-installed/memory/MEMORY.md` (W152-F4 entry; gitignored; cross-session context)

Mechanical-mirror exception per `codex-t1-fix-forward-pattern.md §Mechanical-mirror exception`: edits 3+4 are pure pointer-extension to Wave 24-D settled authority (3-voice convergence verdict); 5 predicates verified at Mia probe stage. T1 SKIP authorized for these mechanical-mirror edits.

## Provenance

- Trigger: dual user-message interrupt 2026-05-11 "research with convergence advanced, repos sources, commit ship with definitive convergence truth, all sota, official and advanced workflow" + "gpt5.5 must be sota reviewed, help you find convergence" — User-correction-acknowledgement ladder n=3→n=4
- Pre-commit research: Voice 1 Path P codex T1 (Pattern B HNF; 4411 LOC trace) + Voice 2 sota-research (5 source families; 6 TIER-1 cites; 3 Mia OVERs on orchestrator brief) + Voice 3 architect (11 recursive Mia probes + 6-edit Pattern A plan + risk LOW)
- Mia pre-apply verified: 6 sub-claim probes ALL PASS (Voice 2 HIGH OVER #1 W152-F1 script ZERO PROBE 18 = VERIFIED via grep; Voice 3 X11 catch docs/loop-prompt-reusable.md exists = VERIFIED via ls; NEW v11-doctrine-evolution.md path = NEW; launch-discipline.md 6-axis structure = VERIFIED; FM-20 row structure = VERIFIED; install-provenance.md ready = VERIFIED)
- FM-20 cascade catches this fire: Voice 2 HIGH OVER #1 + Voice 2 MEDIUM OVER #2 (addy SHA drift; acknowledged not load-bearing) + Voice 2 LOW OVER #3 (cwc overstatement; acknowledged) + Voice 3 X11 catch (dual-surface ship requirement) + Voice 3 6 self-OVERs (caught recursively in own analysis)
- Cross-model gate: FULL via Path P REAL GPT-5.5 codex CLI v0.130.0 dispatch (Pattern D 6-param strict-conform; CR-3 Phase 1 bootstrap exception satisfied at zero degraded-mode risk)

## Ladders advanced

| Ladder | Pre | Post | Delta |
|---|---|---|---|
| Mia n | 293 | **300** | +7 (Voice 2 HIGH + MED + LOW = 3; Voice 3 X11 catch + 3 sub-OVERs across own analysis = 4 minimum; per Voice 3 self-report 6 OVERs caught) |
| FM-20 cascade n | 20 | **21** | +1 (Voice 3 X11 dual-surface catch on orchestrator brief — docs/loop-prompt-reusable.md surface omitted from v11 framing) |
| Path P n | 25 | **26** | +1 (W152-F4 Voice 1 Pattern B HNF dispatch) |
| Pattern D n | 25 | **26** | +1 (Pattern D 6-param recipe dogfooded; Pattern B HNF disposition validated again per recipe) |
| User-correction-ack n | 4 | 4 | unchanged (n=4 already advanced this turn pre-Voice-2/3 returns) |
| FM-17.f n | 6 | 6 | firm |

## FM-CANDIDATE-21 row (queued for cycle-322 promotion threshold)

| Mode | Signature | n-evidence | Recovery | Cite anchor | Owner rule/status |
|---|---|---:|---|---|---|
| **FM-21 doctrine-evolution-without-cron-prompt-update** | v11 doctrine codified at runtime in `docs/*.md` BUT cron prompt `c8617c3f` frozen at v10 capture time; next cron tick loads stale v10 doctrine | n=1 (W152-F4 this fire) | Operator CronDelete + CronCreate with v11 prompt text after doctrine ship; OR codify cron-prompt-update emit as mandatory ship step in audit-action-loop.md | this file + Voice 3 NEW FM-CANDIDATE-21 finding | **UNCODIFIED — pending n=2+ cross-arc recurrence per cycle-322** |
