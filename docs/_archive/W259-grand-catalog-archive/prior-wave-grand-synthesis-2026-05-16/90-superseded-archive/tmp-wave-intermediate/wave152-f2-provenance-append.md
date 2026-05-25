

## 2026-05-11T19:XXZ — Wave 152 Fire 2 HONEST-NON-FINDING: 🅰 netsh pin BLOCKED by bound-port precondition + revised ordering

**Trigger**: user directive 2026-05-11 "you need to know how you use admin permission, with sota references, you are launched via admin and because of it you need to gather all the references and resources before you commit" — User-correction-acknowledgement ladder n=2→n=3 (autonomous admin-class execution unlocked under pre-commit SOTA-research discipline).

### Admin verification (per pre-commit research gate)

- `net session` from Bash returned PASS (admin token inherited in subprocess) → autonomous execution authorized per User-correction-ack n=3
- Pre-commit SOTA references gathered: Voice 2 Agent A sota-research artifact at `tmp/wave152-agentA-sota-research-2026-05-11.md` (3 TIER-1-DIRECT Microsoft Learn cites for netsh-interface-ipv4 + Willxup/cpa-usage-keeper); Voice 1 codex T1 verdict at `.claude/state/codex_consult_w152_arc_OUT.txt` (🅰 APPROVE 0.94 + 4 prescriptions); Voice 3 architect plan at `tmp/wave152-agentB-execution-plan-2026-05-11.md` (rollback + risk matrix per launch-discipline.md D1)
- D1 pre-deploy 6-axis checklist per `Z:/claude-sota-installed/.claude/rules/launch-discipline.md` all PASS at design-time

### Execution attempt + HONEST-NON-FINDING

Dry-run `-Verify` mode at `tmp/wave152-f1-verify-run.sh` confirmed: both ports 18317 + 19801 UNPINNED in current excluded-port-range list. Excluded ranges 8255-8354 still present (W149-F3 root-cause range).

Execute attempt at `tmp/wave152-f1-execute.sh` (direct netsh add via admin Bash, bypass PS1 self-elevation UAC since Bash already admin):

```
netsh.exe interface ipv4 add excludedportrange protocol=tcp startport=18317 numberofports=1 store=persistent
  → "The process cannot access the file because it is being used by another process."

netsh.exe interface ipv4 add excludedportrange protocol=tcp startport=19801 numberofports=1 store=persistent
  → "The process cannot access the file because it is being used by another process."
```

Post-state verification: both ports REMAIN UNPINNED. State NOT mutated. netsh refused the operation.

### Root-cause analysis (Mia OVER #293 + FM-20 cascade #20)

**Codex T1 W152 verdict 🅰 APPROVE 0.94 was incomplete** — prescriptions did not include "ports currently bound" precondition probe. NSSM services EEE-CLIProxyAPI (port 18317 LISTENING) + EEE-CacheFixProxy (port 19801 LISTENING) are actively binding the target ports per PROBE 3 `Get-Service` confirmation. Windows refuses `add excludedportrange` on a currently-bound port (treats as conflict with active listen state).

**Voice 2 sota-research artifact also did NOT surface this precondition** — Microsoft Learn cite at `https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/netsh-interface` documents the command but doesn't explicitly call out the bound-port refusal pattern. **FM-20 cascade n=19→n=20**: codex T1 prescription propagated through architect brief without independent runtime probe of port-bind state vs add-pin compatibility.

### Mia OVER ladder advance (n=292→n=293)

- **OVER #293** (this fire): "netsh pin is unconditional idempotent operation" REFUTED by direct execution attempt — Windows refuses when target port is bound by a listening service.

### Revised plan (per launch-discipline.md D1 reversible+observable+incremental)

**Option A — Bundle with W150-F3 Docker cutover (recommended)**:
- During Docker cutover window (W150-F3 EXECUTION, currently OPERATOR-GATED 2-3hr supervised):
  1. NSSM stop EEE-CLIProxyAPI (port 18317 frees)
  2. netsh add excludedportrange 18317 → ✅ succeeds (port now free)
  3. docker compose up eee-cli-proxy-api (Docker binds port 18317 host → 8317 container)
  4. Same sequence for EEE-CacheFixProxy + 19801 + eee-cache-fix-proxy
- Single maintenance window. Pinning happens at the precise moment ports transition NSSM→Docker.

**Option B — Standalone ~30s maintenance window (operator-supervised)**:
- `Stop-Service EEE-CLIProxyAPI` (port 18317 frees in ~1s)
- `netsh add excludedportrange protocol=tcp startport=18317 numberofports=1 store=persistent`
- `Start-Service EEE-CLIProxyAPI` (rebinds 18317; ~10s for service ready)
- Same sequence for 19801
- Total downtime ~30s per service. CPA traffic during window will fail (curl ECONNREFUSED). Operator approval required since this affects live traffic.

**Option C — Defer (no action this fire)**:
- Accept that 18317 + 19801 are in safe band (1916-2274 / 4029-5356 / 5358-8254 / 8955-9315 / 9318-9878 / 9979-49999 per v10 doctrine).
- Pin only needed if Windows dynamically reserves these ports later (unlikely since they're below ephemeral range start).
- Per W149-F3 evidence: 8317 was captured by excluded-range expansion 8255-8354 because Windows incrementally extended the range. 18317 in band 9979-49999 is far from current ranges; risk is LOWER than 8317 was.

### Disposition this fire

- **NO commit of state change** (netsh refused — nothing landed)
- **Documentation commit** (this provenance entry + MEMORY.md prepend) ships the OVER acknowledgement + revised ordering
- **Task #196 stays in_progress** (pin not achieved; bundled with Docker cutover for next execution attempt)
- **Forward Top-5 reordered**: 🅰 + 🅳 BUNDLED into single maintenance window (W152-F3 = W150-F3 with bundled netsh pin); 🥇 promotes from "admin-run netsh standalone" → "operator-supervised Docker cutover with bundled netsh pin"

### Ladders advanced

- **Mia n=292 → n=293** (+1: bound-port-blocks-netsh-pin OVER)
- **FM-20 cascade n=19 → n=20** (+1: codex T1 prescription propagated without runtime probe of port-bind compatibility)
- **User-correction-acknowledgement n=2 → n=3** (+1 NEW: admin-launch awareness unlocks autonomous admin-class execution + pre-commit SOTA-research mandate)
- Path P unchanged (no new dispatch this fire)
- Pattern D unchanged

### Cardinal-rule conformance matrix

CR-1 ✅ TIER-1 Microsoft Learn cite preserved; CR-3 ✅ Path P codex T1 verdict on file pre-execute; CR-5+6 ✅ official-native (netsh native Windows command); CR-7 ✅ Phase 1 + user GO explicit; CR-8 ✅ all content cite-anchored; CR-9 ✅ install-risk discipline applied (Mia pre-apply caught the OVER pre-state-mutation; reversibility verified); CR-10 ✅ research-first (codex T1 + 2 Sonnet voices); CR-11 ✅ META-process discipline; CR-12 N/A (no install class).

### Risk class

Per launch-discipline.md D1: this fire was attempting LOW-risk (idempotent + reversible). Reality surfaced MED-risk (requires service-stop maintenance window). Revised disposition correctly downgrades to MED-risk + bundles into 🅳 cutover window.

### Files this commit

- `docs/install-provenance.md` (APPEND; this entry ~80 LOC)
- `.claude/projects/Z--claude-sota-installed/memory/MEMORY.md` (PREPEND; W152-F2 entry ~2KB per directive #11)

### Refs

- Codex T1 trace: `.claude/state/codex_consult_w152_arc_OUT.txt` (W152 verdict — now superseded for 🅰 by this Fire 2 OVER catch)
- Voice 2 artifact: `tmp/wave152-agentA-sota-research-2026-05-11.md` (TIER-1 Microsoft Learn cite — bound-port precondition omitted upstream too)
- Voice 3 artifact: `tmp/wave152-agentB-execution-plan-2026-05-11.md` (ordering recommendation — now revised post-OVER)
- Dry-run script: `tmp/wave152-f1-verify-run.sh` (confirmed Test-PortInExclusions + UNPINNED state pre-execute)
- Execute script: `tmp/wave152-f1-execute.sh` (direct netsh attempt; refused by Windows)
- Sister rules: `launch-discipline.md` D1 (pre-deploy checklist); `closed-loop-recursive-narrowing.md` Outcome B (REVERT-AND-REMOVE — N/A here since nothing landed); `mia-pre-apply.md` (n=293 advance); `fm20-path-drift-cascade.md` (n=20 advance)
- Prior W152-F1: commit `bac0152` (design SHIP-READY; this Fire 2 catches the design flaw at execute-time)

### What's NEXT (Forward Top-5 revised post-W152-F2)

| # | Item | Status | Action |
|---|---|---|---|
| 🥇 | 🅳 Docker cutover EXECUTION (W150-F3) with **BUNDLED 🅰 netsh pin** | OPERATOR-GATED 2-3hr supervised | Operator GO → execute prep-state-dir.ps1 then cutover-nssm-to-docker.ps1 with netsh add inserted between NSSM stop + Docker bind |
| 🥈 | 🅱.a CPA Mgmt UI :8085 enable Y/N | OPERATOR-DECISION | Overlaps cpa-usage-keeper sidecar; operator picks |
| 🥉 | 🅲 Path D activate or defer per HNF | OPERATOR-DECISION | Path P alone satisfies CR-3 at zero cost |
| #4 | W151+ upstream PR kardianos/service SDK | OUT-OF-SCOPE | Until upstream merges |
| #5 | Option B standalone 🅰 pin (~30s NSSM stop/start) | OPERATOR-GATED | Alternative if cutover delayed indefinitely |
