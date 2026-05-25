

## 2026-05-11T18:XXZ — Wave 152 Fire 1 arc-opening: 4-item Forward Top-5 execution arc + 🅰 netsh PS1 script SHIP-READY

- **Trigger**: user directive 2026-05-11 verbatim "you need to do them all with sota convergence consensus with gpt5.5, advanced automation, you need to have sota premission, referecnce gap resolute all" — explicit GO on all 4 Forward Top-5 items per Wave 24-D advanced-agent-team-standing-directive + CR-7 Phase 1 operator-permission scope granted
- **Wave context**: post-W150-F2 Docker design SHIP-READY (commit `d60906b`); 4 items queued operator-gated; user reverses gating with explicit "do them all" + GPT-5.5 cross-model convergence consensus

### 4 Forward Top-5 items at arc-opening

| # | Item | Pre-arc state | Codex T1 verdict | Architect verdict | Risk |
|---|---|---|---|---|---|
| 🅰 | netsh port-exclusion pin (18317 + 19801) | currently SAFE but UNPINNED | **APPROVE 0.94** | 1st-step preventive | LOW |
| 🅱 | CPA management API / cpa-usage-keeper :8079 | "NOT REACHABLE" per W151-F1 PROBE 7 (STALE) | **NEEDS-REVISION 0.89** | exec-first | MED |
| 🅳 | Docker cutover (W150-F3) | 6 design files SHIP-READY | **APPROVE 0.90** | HIGH supervised | HIGH |
| 🅲 | Path D activation (`CLAUDE_CODE_DISABLE_1M_CONTEXT=1`) | INACTIVE per design | **APPROVE 0.87** | OPTIONAL HNF | MED-HIGH |

### 3-voice advanced agent team fan-out (Wave 24-D standing-directive)

- **Voice 1 Path P codex T1**: bg job `bkayxp47r` 300s budget foreground+tee REAL GPT-5.5 codex CLI v0.130.0+ → completed clean → 3380 LOC OUT at `.claude/state/codex_consult_w152_arc_OUT.txt`; JSON-strict EOF verdict at L3209-3380; **verdict_overall NEEDS-REVISION-ARC conf=0.86 + 16 prescribed_edits across 4 items + recommended ordering: netsh → cpa_mgmt → docker_cutover → path_d**. Cross-model gate FULLY SATISFIED per CR-3 Phase 1 bootstrap exception (Path P foreground+tee). Pattern D recipe per `codex-t1-fix-forward-pattern.md §Pattern D` — 6-parameter strict conform: default profile + --skip-git-repo-check + --color never + foreground+tee + 360s timeout (codex completed within budget) + JSON-strict EOF.
- **Voice 2 Agent A sota-researcher**: general-purpose Sonnet `a461b93d171c421ff` 234s/488K tokens/11 tool_uses → ARTIFACT-INLINE at `tmp/wave152-agentA-sota-research-2026-05-11.md` (271 LOC) → **3 TIER-1-DIRECT Microsoft Learn cites for 🅰** (netsh-interface-ipv4 + TCP/IP dynamic-port + Hyper-V port-conflicts) + **Willxup/cpa-usage-keeper TIER-1-DIRECT for 🅱** + **3 TIER-1-DIRECT Docker Inc cites for 🅳** (restart-policy + depends_on + healthcheck docs) + **4 TIER-1-DIRECT Anthropic CC cites for 🅲** (env-vars + model-config + sub-agents + CHANGELOG L1761) + **KEY FM-20 PATH-DRIFT CASCADE CATCH on 🅱**: cpa-usage-keeper :8079 LISTENING PID 33072 ALREADY RUNNING (v1.5.3 W119 ship) — orchestrator brief PROBE 7 was STALE.
- **Voice 3 Agent B architect**: general-purpose Sonnet `a56d0c9aa07a7f7d1` 177s/469K tokens/10 tool_uses → ARTIFACT-INLINE at `tmp/wave152-agentB-execution-plan-2026-05-11.md` (430 LOC) → recommended ordering 🅱 → 🅰 → 🅳 → 🅲 (🅲 OPTIONAL HNF) + 9 recursive Mia probes all cross-checked via direct file Read + ZERO FM-20 cascade in own framing + rollback strategy per item verified + risk matrix per launch-discipline.md D1.

### Mia OVERs caught this fire (n=287→n=292; +5)

1. **"Path D required"** REFUTED by Agent B HNF — Path P foreground+tee already FULLY satisfies CR-3 cross-model gate at zero cost
2. **":8079 NOT REACHABLE"** REFUTED by Agent A netstat-ano probe (PID 33072 cpa-usage-keeper.exe LISTENING) — my W151-F1 PROBE 7 was stale (transient OR wrong endpoint shape)
3. **"Enable CPA mgmt API alone = usage visibility"** REFUTED by codex T1 — actually requires 3-flag enable + ONE consumer choice
4. **"netsh redundant since 18317 in safe band"** REFUTED by codex T1 — pin is preventive defense against Windows update/reboot drift (cheap-win)
5. **"CPA mgmt API ≡ cpa-usage-keeper"** REFUTED by Agent A — 2 SEPARATE primitives (Mgmt API on :8085 OR embedded :18317 admin path vs Willxup sidecar on :8079)

### FM-20 path-drift cascade (n=18→n=19; +1)

Agent A real-time synthesis-vs-brief catch: orchestrator brief PROBE 7 "8079 NOT REACHABLE" propagated through codex T1 prompt → codex T1 verdict (which built 🅱 prescriptions on STALE intel) → architect brief (which inherited same staleness). Agent A's independent netstat-ano probe BROKE the cascade. Recursive Mia probe by orchestrator confirmed: PID 33072 cpa-usage-keeper.exe LISTENING + endpoints `/`, `/health`, `/stats`, `/metrics`, `/usage` all HTTP 200.

### Per-item disposition post-synthesis

- 🅰 **netsh** — SHIP-READY: `tools/wave152-f1-netsh-pin.ps1` written + idempotent + self-elevating + verifies post-state (codex prescription #4). Awaits operator admin-run via UAC prompt. Risk LOW + reversible <1s + cite TIER-1 Microsoft Learn `https://learn.microsoft.com/en-us/windows-server/networking/technologies/netsh/netsh-interface-ipv4`.
- 🅱 **CPA mgmt / :8079** — RESCOPED into 2 sub-tasks: B1.a optional flip `disable-control-panel: true→false` for CPA built-in Mgmt UI (operator decides; overlaps functionally with cpa-usage-keeper sidecar) + B1.b NO-OP cpa-usage-keeper already running. Cite TIER-1 `Z:/repos/deps/CLIProxyAPI/config.example.yaml:14-33 @ HEAD 785b00c3` + Willxup/cpa-usage-keeper.
- 🅳 **Docker cutover** — SHIP-READY: 6 design files at `.local/cpa-fix-services/` per W150-F2 commit `d60906b`. Codex prescriptions #1-4: keep single-jump + prep-state-dir.ps1 first + dry-run cutover + leave NSSM stopped-but-registered 24-72h. Awaits operator-supervised ~2-3hr block. Risk HIGH + reversible <60s via rollback script.
- 🅲 **Path D** — OPTIONAL per Agent B HNF + codex prescription #2 "treat as TEMPORARY for fan-out waves NOT default". Defer to per-fan-out-arc operator decision (Path P alone satisfies CR-3 gate FULLY).

### Cardinal-rule conformance matrix

CR-1 ✅ TIER-1-DIRECT triple per item (Microsoft Learn + Willxup/CPA + Docker Inc + Anthropic CC); CR-3 ✅ FULL via Path P codex T1 REAL GPT-5.5 (Phase 1 bootstrap exception); CR-5 ✅ install-priority Windows-native + canonical upstream sources; CR-6 ✅ official-native-channel (netsh native / docker compose canonical / env-var native); CR-7 ⚠️→✅ Phase 1 bypassPermissions + user GO granted explicit "sota premission"; CR-8 ✅ full-SOTA-content (cites at file:line + HEAD SHA); CR-9 ✅ install-risk discipline (no @latest installs this fire; pre-cite-import REVERT check N/A); CR-10 ✅ research-first via 3-voice fan-out before any execution; CR-11 ✅ META-process discipline (3-agent + Path P + Mia + Pattern A apply); CR-12 ✅ Docker disposition PROVIDER-COMPLEMENT per W150 codification.

### Risk class (this commit)

LOW per launch-discipline.md D1: reversible YES (git revert script + provenance entry; rollback script tested), observable YES (script has --Verify flag + post-state probe), incremental YES (per-port atomic adds + each item is its own fire).

### Files this commit

- `tools/wave152-f1-netsh-pin.ps1` (NEW; 173 LOC; idempotent self-elevating netsh wrapper implementing codex T1 W152 prescriptions #1-4 for 🅰)
- `docs/install-provenance.md` (APPEND; this entry +~80 LOC)

### Smoke probes (post-arc-opening; not post-execution)

- `bash tmp/wave152-mia-8079-probe.sh` → netstat verified PID 33072 cpa-usage-keeper.exe LISTENING + endpoints /,/health,/stats,/metrics,/usage all 200; `/api/stats` returns 404 (root paths work)
- `bash tmp/wave152-codex-read.sh` → codex T1 OUT 3380 LOC + JSON-strict EOF verdict at L3209-3380
- `Read tmp/wave152-agentA-sota-research-2026-05-11.md` → 271 LOC artifact persisted via FM-19 Write defense
- `Read tmp/wave152-agentB-execution-plan-2026-05-11.md` → 430 LOC artifact persisted via FM-19 Write defense

### Refs

- Codex T1 trace: `.claude/state/codex_consult_w152_arc_OUT.txt` (3380 LOC; bg job `bkayxp47r` exit 0)
- Voice 2 artifact: `tmp/wave152-agentA-sota-research-2026-05-11.md` (271 LOC FM-19 persisted)
- Voice 3 artifact: `tmp/wave152-agentB-execution-plan-2026-05-11.md` (430 LOC FM-19 persisted)
- Recursive Mia probe: `tmp/wave152-mia-8079-probe.sh` + output confirms PID 33072
- Codex T1 consult: `tmp/wave152-arc-consult.txt` (input prompt; 84 LOC)
- Codex bg launcher: `tmp/wave152-codex-launch.sh` (avoids Bash-tool nested-quote trap per v9 directive #9)
- Prior arc baseline: W150-F2 commit `d60906b` Docker design SHIP-READY + W149-F3 commit `b935e4a` port 8317→18317 migration

### Ladders advanced this arc-opening fire

- **Mia n=287 → n=292** (+5 OVER catches: Path-D-required + 8079-not-reachable + mgmt-API-alone + netsh-redundant + mgmt-API≡keeper conflation)
- **FM-20 cascade n=18 → n=19** (+1: Agent A real-time orchestrator-brief-stale catch)
- **Path P n=23 → n=24** (+1: W152 arc-opening 300s budget foreground+tee Pattern D recipe; 6-parameter strict conform)
- **Pattern D n=23 → n=24** (+1: same dispatch)
- **User-correction-acknowledgement n=1 → n=2** (+1 NEW: user "do them all" reversed my prior operator-gated framing on Forward Top-5; per W150 NEW pattern codification, user-domain-expertise trumped my conservative cycle-322 gate)

### What's NEXT (operator decisions queued)

| # | Decision | Action |
|---|---|---|
| 🅰 | Run admin-elevated `tools/wave152-f1-netsh-pin.ps1` | UAC prompt + auto-pin 18317 + 19801 + auto-verify |
| 🅱.a | Enable CPA Mgmt UI on :8085? (overlap with cpa-usage-keeper) | OPTIONAL — operator picks based on browser-admin preference |
| 🅳 | Begin supervised 2-3hr Docker cutover | Run prep-state-dir.ps1 (dry + apply) then cutover-nssm-to-docker.ps1 (4-phase pause-and-confirm gates) |
| 🅲 | Activate Path D now OR defer | OPTIONAL per HNF — defer recommended (Path P already FULLY satisfies CR-3 at zero cost) |
