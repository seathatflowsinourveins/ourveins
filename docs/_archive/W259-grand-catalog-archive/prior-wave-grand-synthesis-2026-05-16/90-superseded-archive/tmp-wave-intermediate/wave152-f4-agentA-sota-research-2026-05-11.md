# Wave 152 Fire 4 — Voice 2 sota-researcher SOTA research

**Role**: Agent A sota-researcher (Sonnet) | **Date**: 2026-05-11 | **Brief**: PROBE 18 OS-level state-mutation precondition probe doctrine evolution (v10→v11)

**HANDOFF**: handoff_to: orchestrator, output_mode: last_message, artifacts: [tmp/wave152-f4-agentA-sota-research-2026-05-11.md], verdict_one_line: DONE_WITH_CONCERNS — research complete + 3 Mia OVERs surfaced on orchestrator brief

## Multi-source discovery breadth (≥4 families per CR-15)

| # | Family | Used? | Hits | Notes |
|---|---|---|---|---|
| 1 | **Microsoft Learn** | Y | 6 pages indexed | netstat / Get-NetTCPConnection / handle.exe / netsh-contexts / Test-Connection / netsh-portproxy (1×404 + 2×auth-wall — handle.exe content retrieved from prior-session index) |
| 2 | **GitHub MCP** | N | — | Not needed — local repos (cwc + addy + W152-F1 script) covered the cite-anchor surface |
| 3 | **Exa web_search_exa** | Y | 5 results | Ansible win_firewall_rule + win_dhcp_lease + stack-overflow port-bind precondition + Hyper-V dynamic-reservation patterns |
| 4 | **DeepWiki** | N | — | Not needed — Microsoft Learn TIER-1 + Anthropic CC docs satisfied research questions |
| 5 | **Context7** | N | — | Not needed — no library docs required (this is OS-primitive research, not library API) |
| 6 | **Community catalogs (addy-agent-skills + cwc-long-running-agents)** | Y | 24 skills enumerated | safety-and-hardening + shipping-and-launch + deprecation-and-migration probed; cwc verify-gate.sh evidence-gate pattern probed |
| 7 | **man7.org POSIX docs** | Y | 2 pages | fuser(1) + lsof(8) for Linux equivalent question |

**Breadth verdict**: 5 distinct source families queried (MS Learn / Exa / addy-skills / cwc-hooks / man7 + Anthropic CC docs as bonus 6th) — **CR-15 ≥4-source gate firmly satisfied**.

## TIER-1 cite anchors gathered

### Q1 — netsh excludedportrange precondition behavior

**TIER-1-DIRECT** (Microsoft Learn): URL `https://learn.microsoft.com/en-us/windows-server/networking/technologies/netsh/netsh-contexts` [VERIFIED 2026-05-11 via ctx_fetch_and_index]. Stack-Overflow corroboration (Q54010365 2019-01-02) verbatim: *"It appears that Hyper-V reserves random ports (or something Hyper-V related at least). Use `netsh int ip show excludedportrange protocol=tcp` to confirm... `netsh int ipv4 add excludedportrange protocol=tcp startport=9012 numberofports=2`"*. Verbatim workaround documents adding excluded port range AFTER disabling Hyper-V to ensure target port is unbound — implicit precondition: **target port MUST NOT be currently bound or dynamic-reserved at the moment of add**.

**Cite anchor for v11 PROBE 18**: this Stack Overflow evidence + the W152-F1 script's `Test-PortInExclusions` (only checks "in excluded list" — NOT "currently bound") = the SOTA gap PROBE 18 must close.

### Q2 — netstat -ano TIER-1 cite

**TIER-1-DIRECT** (Microsoft Learn): URL `https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/netstat` [VERIFIED 2026-05-11]. Verbatim parameter table:
- `-a` — *"Displays all active TCP connections and the TCP and UDP ports on which the computer is listening."*
- `-n` — *"Displays active TCP connections, however, addresses and port numbers are expressed numerically and no attempt is made to determine names."*
- `-o` — *"Displays active TCP connections and includes the process ID (PID) for each connection. You can find the application based on the PID on the Processes tab in Windows Task Manager."*

**Cite anchor for v11 PROBE 18**: `netstat -ano | findstr :18317` produces machine-parseable bound-state output. PID column enables follow-up `handle.exe` or `Get-Process` resolution to identify the binding process.

### Q3 — Get-NetTCPConnection (PowerShell SOTA native, supersedes netstat)

**TIER-1-DIRECT** (Microsoft Learn): URL `https://learn.microsoft.com/en-us/powershell/module/nettcpip/get-nettcpconnection` [VERIFIED 2026-05-11]. **Strongly preferred over netstat for PowerShell scripts** — native PowerShell primitive returns typed objects (not string-parsing).

Verbatim parameters:
- `-LocalPort` — *"Specifies an array of local ports. The cmdlet gets connections for the ports that you specify."* (UInt16[])
- `-State` — accepted values include `Bound`, `Listen`, `Established`, `TimeWait`, etc.
- `-OwningProcess` — *"Specifies the PID of the owning process of a TCP connection."*

Verbatim example: `Get-NetTcpConnection -OwningProcess 18948` (Example 4 — Get Owning Process).

**Cite anchor for v11 PROBE 18 (Windows precondition probe RECOMMENDED PRIMITIVE)**:
```powershell
$bound = Get-NetTCPConnection -LocalPort 18317 -State Listen -ErrorAction SilentlyContinue
if ($bound) {
  # PRECONDITION FAILS: port currently bound by PID $bound.OwningProcess
  # Resolution: Stop-Service / handle.exe / refuse-and-report-to-operator
}
```

### Q4 — handle.exe Sysinternals (file-lock precondition + port-owner forensics)

**TIER-1-DIRECT** (Microsoft Learn): URL `https://learn.microsoft.com/en-us/sysinternals/downloads/handle` [VERIFIED 2026-05-09 prior-session — fresh fetch 2026-05-11 hit Microsoft auth-wall]. Authority anchor: **Handle v5.0 by Mark Russinovich**, Published October 26, 2022. Distribution: `https://download.sysinternals.com/files/Handle.zip` (729 KB).

**Cite anchor for v11 PROBE 18 (Windows file-lock precondition probe)**:
```bash
handle.exe -accepteula -nobanner <path-to-file>
# Output enumerates PIDs holding handles to the named file
```

Use-case for v11 PROBE 18: when state-mutation targets a file (e.g., editing config that NSSM/Docker has open), handle.exe surfaces the locking process BEFORE the mutation refuses.

### Q5 — Linux fuser + lsof equivalents

**TIER-1-DIRECT** (man7.org / POSIX manual pages):

**fuser(1)** — `https://man7.org/linux/man-pages/man1/fuser.1.html` [VERIFIED 2026-05-11]. Verbatim NAME: *"fuser - identify processes using files or sockets"*. RESTRICTIONS section verbatim: *"fuser may only be able to gather partial information unless run with privileges. As a consequence, files opened by processes belonging to other users may not be listed..."* + *"The most common time this problem occurs is when looking for TCP or UDP sockets when running fuser as a non-root user."*

**lsof(8)** — `https://man7.org/linux/man-pages/man8/lsof.8.html` [VERIFIED 2026-05-11]. EXAMPLES verbatim: *"To list all open IPv4 network files in use by the process whose PID is 1234, use: `lsof -i 4 -a -p 1234`"* + *"To list all files using any protocol on ports 513, 514, or 515 of host wonderland.cc.purdue.edu, use: `lsof -i @wonderland.cc.purdue.edu:513-515`"*.

**Cite anchor for v11 PROBE 18 (Linux/POSIX precondition probe)**:
```bash
# Port-bind precondition
lsof -i :18317 -t   # outputs PIDs holding port 18317
# File-lock precondition
fuser /path/to/config.yaml   # outputs PIDs holding file
```

### Q6 — Anthropic CC docs precondition-probe guidance

**TIER-1-DIRECT** (Anthropic CC official docs): URL `https://code.claude.com/docs/en/hooks` [VERIFIED 2026-05-11]. **SOTA mechanism for pre-execute precondition probes = PreToolUse `permissionDecision: "deny"` with `hookSpecificOutput`**.

Verbatim mechanism table:
```
permissionDecision | "allow" skips the permission prompt. "deny" prevents the tool call. "ask" prompts the user to confirm. "defer" exits gracefully so the tool can be resumed later.
permissionDecisionReason | For "allow" and "ask", shown to the user but not Claude. For "deny", shown to Claude. For "defer", ignored
```

Exit code 2 fallback (verbatim): *"For most hook events, only exit code 2 blocks the action... If your hook is meant to enforce a policy, use exit 2."* + per-event behavior: PreToolUse exit 2 = "Blocks the tool call".

**Cite anchor for v11 PROBE 18 (hook-level precondition enforcement)**: when a system-modifying operation (Bash `netsh add` / `docker run` / `Stop-Service`) is about to fire, a PreToolUse hook can run the precondition probe (Get-NetTCPConnection / fuser / handle.exe) and emit `permissionDecision: "deny"` + `permissionDecisionReason` describing the bound-state. This MECHANICALLY ENFORCES PROBE 18 at the gate layer.

### Q7 — cwc-long-running-agents precondition-probe primitives

**TIER-1-DIRECT** (anthropics/cwc-long-running-agents): `Z:/claude-sota-installed/.local/cwc/` @ HEAD `ffd563d668a97a38d4aa092bf0d5b1507c046629` [VERIFIED 2026-05-11 via `git rev-parse HEAD`].

Hook scripts probed:
- `verify-gate.sh` — **evidence-gate pattern** (NOT precondition-probe class). Reads `$VERIFY_READ_LOG` to detect prior-Read evidence; emits `decision: "block"` when evidence absent. Verbatim L8: *"This is a teaching example, not a security boundary."*
- `kill-switch.sh` / `steer.sh` / `track-read.sh` / `commit-on-stop.sh` — control-plane / read-tracking / commit-on-Stop patterns; **none explicitly model OS-level state-mutation precondition**.

**Cite anchor verdict**: cwc primitives are NOT a direct PROBE 18 reference. The cwc `verify-gate.sh` pattern (block-until-evidence-Read) is **conceptually adjacent** — same "verify before mutate" shape — but applied to test-result authoring, NOT OS state. For PROBE 18, cwc is **structurally similar (block-before-mutate)** but **functionally distinct (evidence vs. OS-state)**.

### Q8 — addyosmani/agent-skills precondition patterns

**TIER-1-DIRECT** (addyosmani/agent-skills): `Z:/claude-sota-installed/.claude/plugins/marketplaces/addy-agent-skills/` @ HEAD `3ff4b518b3cd3077ca27cf883aa21d21faf53802` [VERIFIED 2026-05-11 via `git rev-parse HEAD`].

Skills probed for precondition/safety:
- `security-and-hardening/SKILL.md` — surfaces "validate at boundary" patterns (input validation / SQL parameterization / secrets) but **NO OS-level state-mutation precondition mechanic**
- `shipping-and-launch/SKILL.md` — Reversible/Observable/Incremental + 6-axis pre-launch checklist (already cite-imported into `Z:/claude-sota-installed/.claude/rules/launch-discipline.md`); **NO explicit OS-state precondition probe**
- `deprecation-and-migration/SKILL.md` — 5-question gate + 4-stage migration pattern (already cite-imported into `Z:/claude-sota-installed/.claude/rules/deprecation-discipline.md`); **NO OS-state precondition**

**Cite anchor verdict**: addy `shipping-and-launch` §Reversible invariant 1 is **conceptually adjacent** — "Every launch ships WITH a tested rollback path" implies pre-mutation observable-state verification. The Reversible invariant + Observable invariant could be promoted to support PROBE 18 with file:line cite anchor `shipping-and-launch/SKILL.md:10 @742dca5` (already established by `launch-discipline.md`).

## Recommended cite additions to v11 PROBE 18 doctrine

Per CR-1 cite-class lattice + multi-source discovery breadth findings:

### TIER-1-DIRECT primary cites (for v11 PROBE 18 cite header)

```
# Reference: TIER-1-DIRECT https://learn.microsoft.com/en-us/powershell/module/nettcpip/get-nettcpconnection [VERIFIED 2026-05-11 via ctx_fetch_and_index] — Windows native PowerShell primitive for TCP port-bind state probe; LocalPort + State + OwningProcess parameters enable typed precondition check.
# Reference: TIER-1-DIRECT https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/netstat [VERIFIED 2026-05-11] — netstat -ano flag table; alternate Windows precondition probe (string-parse output; less preferred than Get-NetTCPConnection).
# Reference: TIER-1-DIRECT https://learn.microsoft.com/en-us/sysinternals/downloads/handle [VERIFIED 2026-05-09 prior-session index — Mark Russinovich Handle v5.0 2022-10-26] — Windows file-lock precondition probe.
# Reference: TIER-1-DIRECT https://man7.org/linux/man-pages/man1/fuser.1.html [VERIFIED 2026-05-11] — POSIX fuser(1) for file-lock + socket-bind precondition probe; "identify processes using files or sockets".
# Reference: TIER-1-DIRECT https://man7.org/linux/man-pages/man8/lsof.8.html [VERIFIED 2026-05-11] — POSIX lsof(8); lsof -i :PORT -t enumerates PIDs holding port.
# Reference: TIER-1-DIRECT https://code.claude.com/docs/en/hooks [VERIFIED 2026-05-11] — Anthropic CC PreToolUse permissionDecision deny mechanism; SOTA hook-layer enforcement of precondition probes.
```

### TIER-3-LOCAL-COMPOSITION cite (for v11 PROBE 18 cite header per `citation-discipline.md` rule #8)

```
# Cite class: constituents=[TIER-1-DIRECT @ MS Learn Get-NetTCPConnection + netstat + handle + Anthropic CC hooks, TIER-1-DIRECT @ man7 fuser + lsof, TIER-2-EVIDENCE @ Stack Overflow Q54010365 Hyper-V dynamic-reservation pattern, TIER-3-LOCAL-OPERATOR-DERIVED @ W152-F2 evidence netsh REFUSED on bound ports]; effective_tier=TIER-3-LOCAL-COMPOSITION per Z:/claude-sota/.claude/rules/citation-discipline.md rule #8 MIN_PRECEDENCE (local composition glue introduced).
```

### PROBE 18 doctrine text recommendation (SAMPLE — orchestrator decides final wording)

```markdown
## PROBE 18 — OS-level state-mutation precondition probe (v11)

When a SOTA verdict prescribes OS-level state-mutating operations (netsh / docker run / Stop-Service / fs writes), prepend a precondition probe BEFORE the mutation fires:

| Mutation class | Windows probe (SOTA primitive) | POSIX probe | Refusal action |
|---|---|---|---|
| TCP port reservation | `Get-NetTCPConnection -LocalPort N -State Listen` | `lsof -i :N -t` | REFUSE + report bound PID to operator |
| File modification | `handle.exe -accepteula -nobanner <path>` | `fuser <path>` | REFUSE + report locking PIDs |
| Service start | `Get-Service <name>` State check | `systemctl status <name>` | SKIP-IDEMPOTENT if already Running |
| Docker container | `docker ps --filter name=<n> --format '{{.Names}}'` | (same) | SKIP-IDEMPOTENT if already up |

Per Anthropic CC `https://code.claude.com/docs/en/hooks` PreToolUse semantic: precondition refusal should emit `permissionDecision: "deny"` + `permissionDecisionReason` describing the conflict, OR exit code 2 with stderr feedback for non-PreToolUse contexts.

**Anti-pattern**: idempotent-check (e.g. `Test-PortInExclusions`) is INSUFFICIENT — it only verifies the DESIRED state isn't already present; it does NOT verify the PRECONDITION (target unbound) is satisfied. Bound-state mutation refusal is a DISTINCT class.

**Empirical anchor**: W152-F2 netsh REFUSED to add excluded-port-range on currently-bound ports 18317 + 19801 despite codex T1 W152 APPROVE 0.94 — codex verdict was STALE on bound-port precondition. PROBE 18 forward-only prevents recurrence.
```

## Mia OVERs caught during research (recursive on orchestrator brief)

**Mia probe shape**: do ANY orchestrator brief assumptions look stale/wrong?

### Mia OVER #1 (HIGH severity) — W152-F1 script does NOT implement PROBE 18 precondition probe

Brief claims W152-F1 ships SHIP-READY script. **VERIFIED via `Grep "netstat|Get-NetTCPConnection|in use|bound|LISTENING|Test-NetConnection" tools/wave152-f1-netsh-pin.ps1` returned ZERO MATCHES**. The script only implements `Test-PortInExclusions` (idempotency check against excluded-port-range list — NOT bound-state check). This **confirms the v11 PROBE 18 doctrine gap** the brief proposes to close — the brief's own empirical anchor is the OVER instance.

Implication: PROBE 18 codification should be applied retroactively to W152-F1 script (add pre-add `Get-NetTCPConnection -LocalPort` check + handle bound-state refusal). Otherwise the W152-F1 script will inherit the exact failure mode v11 PROBE 18 claims to prevent.

### Mia OVER #2 (MEDIUM severity) — addy-agent-skills HEAD SHA drift

Brief assumes addy skills at `@742dca5` (cite anchor format used by deprecation-discipline.md L9 + launch-discipline.md L10). **VERIFIED via `git -C Z:/claude-sota-installed/.claude/plugins/marketplaces/addy-agent-skills rev-parse HEAD` returned `3ff4b518b3cd3077ca27cf883aa21d21faf53802`** — NOT `742dca5`.

Per MEMORY.md entry W148-F2 (line cited): "HEAD `2b66405` vs prescribed `3ff4b518` minor cite-precision (upstream branch movement OR pull-via-merge-parent semantics; substantive refresh achieved doubt-driven-development install + bug fixes)". The `@742dca5` SHA in deprecation-discipline.md + launch-discipline.md is **STALE** (predates W148-F2 refresh) but the SHA WAS captured by content-SHA convention not commit-SHA per `port-note-discipline.md §1 Discipline 1`.

Implication: v11 PROBE 18 should NOT depend on addy-skill cites (none load-bearing for PROBE 18 per Q8 research finding). If orchestrator decides to add addy `shipping-and-launch/SKILL.md:10` as conceptually-adjacent cite, use **current HEAD `3ff4b518b3cd3077ca27cf883aa21d21faf53802`** + acknowledge content-SHA convention.

### Mia OVER #3 (LOW severity) — Brief overstates cwc-long-running-agents relevance

Brief lists 5 cwc hook scripts (track-read.sh + verify-gate.sh + kill-switch.sh + steer.sh + commit-on-stop.sh) as Q6 research target for PROBE 18 cite anchor. **VERIFIED via direct Read of verify-gate.sh**: pattern is **evidence-gate (verify-before-write)** NOT **OS-level state-mutation precondition** class. cwc primitives are conceptually adjacent but functionally distinct.

Implication: v11 PROBE 18 should NOT cite cwc hooks as load-bearing. The cwc evidence-gate pattern IS already cite-imported elsewhere (CLAUDE.md §17 cwc-long-running-agents 5 primitives). PROBE 18 stays MS Learn TIER-1 + man7 TIER-1 + Anthropic CC TIER-1 — cwc is parallel discipline, not authority.

## HONEST-NON-FINDING

**Q6 cwc + Q7 addy precondition-probe primitives**: HONEST-NON-FINDING — neither upstream ships an OS-level state-mutation precondition mechanic. Both have conceptually-adjacent patterns (cwc evidence-gate + addy reversible-invariant) but PROBE 18 doctrine is **eee-local composition glue** atop TIER-1-DIRECT OS primitives. Per `citation-discipline.md` rule #8 effective_tier=TIER-3-LOCAL-COMPOSITION. This is the correct cite-class verdict — NOT a gap requiring further research.

## Verdict

**DONE_WITH_CONCERNS** — research complete, ≥4-source breadth satisfied, 6 TIER-1-DIRECT cite anchors gathered for v11 PROBE 18 doctrine. 3 Mia OVERs surfaced on orchestrator brief (1 HIGH = W152-F1 script lacks PROBE 18 implementation — confirms doctrine gap; 2 MEDIUM/LOW = SHA drift + cwc/addy relevance overstated).

**Concerns surfaced for orchestrator synthesis**:
1. v11 PROBE 18 codification should include **retroactive Pattern A apply** to `tools/wave152-f1-netsh-pin.ps1` (add `Get-NetTCPConnection -LocalPort N -State Listen` pre-check before `netsh add`)
2. If orchestrator decides to add addy cite as conceptually-adjacent reference, use current HEAD `3ff4b518b3cd3077ca27cf883aa21d21faf53802` not stale `@742dca5`
3. PROBE 18 cite-class lattice: TIER-3-LOCAL-COMPOSITION over TIER-1-DIRECT MS Learn + man7 + Anthropic CC primitives — eee-local composition glue, NOT TIER-1 promotion

**Token usage**: ~150K input + ~3K output (well under 200K budget per TERMINATION on_token_budget_exceeded:200000)
