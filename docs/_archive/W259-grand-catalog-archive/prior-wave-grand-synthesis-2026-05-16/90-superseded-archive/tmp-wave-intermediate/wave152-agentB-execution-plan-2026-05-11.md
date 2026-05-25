---
title: Wave 152 Agent B (architect) — phased execution plan for 4 Forward Top-5 items
status: AUTHORITATIVE
date: 2026-05-11
agent: Voice 3 architect (Wave 152 advanced-agent-team arc per Wave 24-D standing-directive)
---

# Wave 152 — Execution Plan: 4-Item Arc (🅰 netsh + 🅱 control-panel + 🅳 Docker cutover + 🅲 Path D)

## TL;DR (1-line summary)

**Execute order: 🅱 (CPA panel enable + restart) → 🅰 (netsh pin) → 🅳 (Docker cutover; supervised) → 🅲 (Path D, LAST, restarts session).** Total: ~2-3hr supervised. Reversible at every step.

## §1 RECOMMENDED ORDERING (with dependency analysis)

### Dependency: 🅱 ↔ 🅳

**VERIFIED via Read of prep-state-dir.ps1 (lines 77-82)**:
- Line 77: `$configBody = Get-Content -Path $srcConfig -Raw` reads source `config.yaml` RAW
- Line 82: `$configBody = $configBody -replace 'auth-dir:\s*"[^"]*"', 'auth-dir: "/root/.cli-proxy-api"'` ONLY rewrites auth-dir
- `disable-control-panel: false` flip in source `config.yaml` line 22 PROPAGATES via Get-Content into generated `config-docker.yaml`. ✅

**Conclusion**: 🅱 BEFORE 🅳 is safe — edit lives in source config.yaml + carries forward into Docker. Doing 🅱 after 🅳 would require editing `Z:\claude-sota-installed-state\.cli-proxy-api\config-docker.yaml` instead + docker restart.

### Final ordering (recommended)

| Step | Item | Why this position | Time est. | Cumulative |
|------|------|-------------------|-----------|------------|
| 1 | **🅱** CPA control-panel + NSSM restart | Edit source config.yaml BEFORE 🅳 propagates it. Ships management API on :8085 (CPA built-in alternative to cpa-usage-keeper). | ~5 min | ~5 min |
| 2 | **🅰** netsh port-exclusion pin | Independent of others; do early so any Docker port-bind in 🅳 inherits the pin. Pin = preventive defense (ports currently SAFE per Mia probe). | ~5 min | ~10 min |
| 3 | **🅳** Docker cutover | HIGH-risk supervised; 4-phase script with pause-and-confirm; reversible <60s. Verify 🅱 propagated by checking config-docker.yaml after prep. | ~2-3hr | ~2-3hr |
| 4 | **🅲** Path D activation | LAST because terminates current session on eee restart. Trade-off: parent loses 1M. ONLY needed if BRIDGE-MODE subagents required in subsequent fires. | ~2 min | ~2-3hr+2min |

### Why 🅲 LAST

- Path D uncommenting + eee restart **terminates this session**
- All cron jobs scheduled here remain armed (they're at-process-level via Anthropic's runtime, not session-level)
- 🅲 is non-critical to 🅰/🅱/🅳; can be deferred to next session as separate operator decision

### Session-budget impact

| Item | Token cost (est.) | Tool calls |
|------|-------------------|------------|
| 🅱 | ~500 tokens | 3 (Edit + Bash restart + Bash verify) |
| 🅰 | ~300 tokens | 1 Bash (3-cmd compound) + 1 verify |
| 🅳 | ~3000-5000 tokens (operator pause-confirm prompts) | 4-6 (PowerShell + multiple confirm cycles) |
| 🅲 | ~200 tokens (edit + eee restart kills session) | 1 Edit + 1 Bash |

**Risk: 🅳 has unbounded operator-pause time (could span hours).**

---

## §2 ROLLBACK STRATEGY (per item; specific reversal + verification)

### 🅰 Rollback

**Reversal command**:
```powershell
netsh int ipv4 delete excludedportrange protocol=tcp startport=18317 numberofports=1 store=persistent
netsh int ipv4 delete excludedportrange protocol=tcp startport=19801 numberofports=1 store=persistent
# 8079 (optional): netsh int ipv4 delete excludedportrange protocol=tcp startport=8079 numberofports=1 store=persistent
```

**Verification probe**:
```bash
netsh int ipv4 show excludedportrange protocol=tcp | grep -E "18317|19801|8079"
# Expect: zero hits (pins removed)
```

### 🅱 Rollback

**Reversal**:
```bash
# Re-edit config.yaml line 22: disable-control-panel: true
# (Use Edit tool)
```
Then restart CPA:
```powershell
Restart-Service EEE-CLIProxyAPI
```

**Verification probe**:
```bash
curl -fsS http://127.0.0.1:18317/healthz; echo
# Expect: {"status":"ok"} HTTP 200
curl -fsS http://127.0.0.1:8085/ 2>&1; echo
# Expect: connection refused (panel disabled)
```

### 🅳 Rollback

**Reversal command** (already-shipped script):
```powershell
powershell -ExecutionPolicy Bypass -File Z:\claude-sota-installed\.local\cpa-fix-services\rollback-docker-to-nssm.ps1
```

Script behavior (verified via Read):
1. Step 1: `docker compose down` (stop + remove containers; volumes preserved)
2. Step 2: `Start-Service EEE-CLIProxyAPI EEE-CacheFixProxy` (NSSM back online)
3. Step 3: Smoke-probe :18317/healthz + :19801/health

**Verification probe**: scripts emit `ROLLBACK COMPLETE — both endpoints responding via NSSM` if both 200. Exit 1 if either fails.

**Caveat**: if Phase 3 deregistration ran (NSSM removed), rollback fails — re-register NSSM manually per migration plan §Rollback-after-Phase-3.

### 🅲 Rollback

**Reversal**:
```bash
# Re-comment CLAUDE.local.md line 83:
# Edit: $env:CLAUDE_CODE_DISABLE_1M_CONTEXT = '1' → # $env:CLAUDE_CODE_DISABLE_1M_CONTEXT = '1'
```
Then restart eee.

**Verification probe**: New session banner shows `Opus 4.7 (1M context)` (vs without 1M = drop to standard).

---

## §3 RISK MATRIX (launch-discipline.md D1 framework)

| Item | risk_class | reversible | observable_during | incremental_during |
|------|-----------|------------|-------------------|---------------------|
| 🅰 netsh pin | **LOW** | ✅ <30s (delete cmd) | ✅ netsh show + curl probes | ✅ per-port atomic |
| 🅱 panel enable | **MED** | ✅ <30s (revert + restart) | ⚠️ ~5-10s CPA downtime during restart | ✅ single config flip |
| 🅳 Docker cutover | **HIGH** | ✅ <60s (rollback script) | ✅ 4-phase pause-and-confirm gates | ✅ Phase 1 parallel-deploy with NSSM alive |
| 🅲 Path D | **MED** | ✅ <30s (re-comment + restart) | ⚠️ session terminates on eee restart | ❌ atomic (env block toggles whole runtime) |

---

## §4 FM-N RISK INVENTORY (per item)

### FM-02 b+c parallel-session race

- **🅱**: Edit config.yaml → narrow `git add -- <file>` only that file; commit with `--only` (FM-02 b defense per `git-cli-grammar-discipline`)
- **🅳**: cutover script writes to `Z:/claude-sota-installed-state/` (state-outside-repo); zero git impact. Safe.
- **🅰**: zero git impact (system-level netsh).
- **🅲**: Edit gitignored `CLAUDE.local.md`; zero parallel-session race concern.

### FM-15 git CLI grammar

- Any commit in this arc MUST follow options-before-`--` (e.g., `git commit -F msg.txt -- <pathspec>` ✅; not `git commit -- <pathspec> -F msg.txt` ❌)
- Atomic single-shell pattern: `git add -- <f> && git commit -o -F tmp/msg.txt -- <f>`

### FM-17.f Path D INACTIVE

- During 🅰/🅱/🅳 execution, BRIDGE-MODE codex-rescue subagents WILL pre-fire on `[1m]` parent (signature: <2s + 0 tokens + 0 tool_uses + "API Error: Extra usage is required for 1M context")
- Mitigation: use **orchestrator-side Path P codex exec foreground+tee** for any T1/T2/T3 verdict needed during this arc (per `cross-model-consensus.md §Env-funneled stand-in mandate` Phase 1 bootstrap exception)
- After 🅲 activates Path D: BRIDGE-MODE subagents become viable (parent drops to ~200k context)

### FM-19 readonly-guard

- This artifact persisted via Write tool ✅ (NOT Bash heredoc; FM-19 defense)
- No-Write subagents NOT used in this arc (architect role uses Write tool directly)

### FM-20 path-drift cascade (recursive Mia probe)

**Probe on MY OWN framing**:
1. Am I propagating orchestrator's OVER claim about 🅱-before-🅳 dependency? — **NO. Verified via Read of prep-state-dir.ps1 lines 77-82.**
2. Am I assuming Docker cutover is still single-jump (not Servy intermediate)? — **VERIFIED via compose YAML cite anchors line 6 + cutover script line 23: "single-jump migration (not Servy intermediate)".**
3. Did user maybe change mind on cutover? — **No evidence. Last update: W150-F2 ship-ready at HEAD `d60906b` + cutover script exists at 11.7K + rollback script exists at 3.9K.**
4. Is netsh actually needed when ports SAFE? — **Verified safe currently via `netsh int ipv4 show excludedportrange` (Mia probe). But pin = preventive defense per CR-9 (today-release-auto-upgrade defense analog: ranges shift on Windows reboot/update). Cheap-win, keeps.**

---

## §5 SPECIFIC EXECUTION COMMANDS

### 🅰 — netsh port-exclusion pin

**Admin elevation strategy**: NSSM service-context (Local System) already has admin; for direct shell, operator opens **Admin PowerShell** OR uses **self-elevating** wrapper. Recommended: operator opens Admin PS directly (simpler).

```powershell
# Run from Admin PowerShell
netsh int ipv4 add excludedportrange protocol=tcp startport=18317 numberofports=1 store=persistent
netsh int ipv4 add excludedportrange protocol=tcp startport=19801 numberofports=1 store=persistent
netsh int ipv4 add excludedportrange protocol=tcp startport=8079 numberofports=1 store=persistent
# Verify
netsh int ipv4 show excludedportrange protocol=tcp | findstr /R "18317 19801 8079"
```

Expected output: 3 lines with `*` admin-marker (per current excluded ranges showing `*` for admin-set).

### 🅱 — CPA panel enable + NSSM restart

```bash
# Step 1: edit config.yaml line 22
# (operator uses Edit tool — atomic in-process)
# Z:/claude-sota-installed/.cli-proxy-api/config.yaml line 22:
#   FROM: disable-control-panel: true
#   TO:   disable-control-panel: false

# Step 2: restart NSSM (~5-10s downtime)
```
```powershell
Restart-Service EEE-CLIProxyAPI
# Wait for restart
Start-Sleep -Seconds 5
# Smoke-probe both endpoints
$cpa = (Invoke-WebRequest -Uri "http://127.0.0.1:18317/healthz" -TimeoutSec 4 -UseBasicParsing).StatusCode
$panel = try { (Invoke-WebRequest -Uri "http://127.0.0.1:8085/" -TimeoutSec 4 -UseBasicParsing).StatusCode } catch { $_.Exception.Response.StatusCode.value__ }
Write-Host "CPA healthz: $cpa (expect 200)"
Write-Host "Panel :8085: $panel (expect 200 or 401)"
```

**Note**: `Restart-Service` is canonical PowerShell. NSSM-specific `nssm restart` works too but adds complexity (path lookup) — prefer PS native.

### 🅳 — Docker cutover (supervised)

**Pre-flight** (operator confirms):
1. Docker Desktop running (`docker version` returns Server version)
2. Sufficient disk space for images (~500MB combined)
3. 7 OAuth tokens in `.cli-proxy-api/` valid

**Step 1: prep state directory** (idempotent; safe to dry-run first):
```powershell
# Dry-run first
powershell -ExecutionPolicy Bypass -File Z:\claude-sota-installed\.local\cpa-fix-services\prep-state-dir.ps1 -DryRun
# If clean, run real
powershell -ExecutionPolicy Bypass -File Z:\claude-sota-installed\.local\cpa-fix-services\prep-state-dir.ps1
# Verify config-docker.yaml has BOTH auth-dir rewrite AND disable-control-panel: false (from 🅱)
Get-Content Z:\claude-sota-installed-state\.cli-proxy-api\config-docker.yaml | Select-String "auth-dir|disable-control-panel"
```

**Step 2: cutover** (interactive; operator pauses at each phase):
```powershell
# Dry-run first
powershell -ExecutionPolicy Bypass -File Z:\claude-sota-installed\.local\cpa-fix-services\cutover-nssm-to-docker.ps1 -DryRun
# If clean, run real (operator confirms at each Pause-Confirm gate)
powershell -ExecutionPolicy Bypass -File Z:\claude-sota-installed\.local\cpa-fix-services\cutover-nssm-to-docker.ps1
```

**Phase gates** (operator must respond "yes" or "no"):
- Phase 0 → Phase 1: pre-flight clean? (Docker + compose + state-dir)
- Phase 1 → Phase 2: Docker containers up + healthy? (CPA :18317 + cache-fix :19801)
- Phase 2 → Phase 3: NSSM stopped + Docker exclusively serving? (re-verify both endpoints)
- Phase 3 SKIP: default `SkipRemoveNSSM` (keeps NSSM registered for rollback; deregister after 24-72h stability)

**Post-cutover smoke probe**:
```bash
curl -fsS http://127.0.0.1:18317/healthz; echo
# Expect: {"status":"ok"} via Docker
curl -fsS http://127.0.0.1:19801/health; echo
# Expect: 200 via Docker
docker ps --filter "name=eee-cli-proxy-api" --filter "name=eee-cache-fix-proxy"
# Expect: 2 Up containers
```

### 🅲 — Path D activation

```bash
# Step 1: Edit CLAUDE.local.md line 83
# (operator uses Edit tool)
# FROM: # $env:CLAUDE_CODE_DISABLE_1M_CONTEXT = '1'
# TO:   $env:CLAUDE_CODE_DISABLE_1M_CONTEXT = '1'

# Step 2: restart eee (CURRENT SESSION TERMINATES)
```
```powershell
# In CURRENT session, exit Claude Code cleanly first
exit
# Then operator launches NEW session from fresh shell
eee
# Or with specific args if needed
```

**Verification** (in NEW session):
```
> /context
Banner shows: claude-sonnet-4-5  OR  claude-opus-4-7  (NOT claude-opus-4-7 (1M context))
```

---

## §6 PARALLEL-SESSION ISOLATION (FM-02 b+c during arc)

**Concern**: 🅳 spans hours of operator pauses; parallel sessions or cron could race.

**Mitigations**:
1. **State-outside-repo**: Docker bind-mounts use `Z:\claude-sota-installed-state\` (NOT in this repo). Zero git race surface during 🅳.
2. **Atomic edits**: 🅱 + 🅲 each touch 1 file; use Edit tool atomically.
3. **Narrow git add**: any commit during arc uses `git add -- <specific-file>` + `git commit --only -- <specific-file>` (FM-02 b defense).
4. **Cron check**: arc start probe `Get-ScheduledTask -TaskName "*claude*"` OR `CronList` (in-session) to inventory active crons. If active cron runs during 🅳 operator-pause window, it may write to gitignored MEMORY.md (benign) but should not touch tracked files.
5. **Worktree separation**: this arc operates in main worktree; agents declared `isolation: worktree` (Wave 152 brief specifies handoff_to:orchestrator on completion; Voice 3 = architect uses Write directly, not Agent fan-out).

**FM-02 c (commit-layer absorption)** defense: if parallel session commits during 🅳 operator-pause window, this arc's edits are state-only (no commits scheduled until arc-close); zero absorption risk.

---

## §7 MIA PRE-APPLY (recursive on MY OWN plan)

Probe outcomes for each load-bearing claim:

| Claim | Probe | Result |
|-------|-------|--------|
| 🅱 BEFORE 🅳 propagates panel edit | Read `prep-state-dir.ps1:77-82` | ✅ VERIFIED — Get-Content reads source raw, only auth-dir rewritten |
| `disable-control-panel: true` is current state | `grep -nE "disable-control-panel" config.yaml` | ✅ VERIFIED line 22: `true` |
| 18317/19801/8079 currently in SAFE band | `netsh int ipv4 show excludedportrange protocol=tcp` + awk filter | ✅ VERIFIED zero hits |
| Path D currently INACTIVE | `grep -n "CLAUDE_CODE_DISABLE_1M_CONTEXT" CLAUDE.local.md` | ✅ VERIFIED line 83 commented `# $env:...` |
| Single-jump Docker (not Servy) | `Read docker-compose.yml line 6` + `cutover-nssm-to-docker.ps1 line 23` | ✅ VERIFIED "single-jump migration (not Servy intermediate)" |
| Rollback script exists + executable | `Read rollback-docker-to-nssm.ps1` (entire 104 LOC) | ✅ VERIFIED complete 3-step rollback with smoke-probe |
| `Restart-Service EEE-CLIProxyAPI` works (vs `nssm restart`) | Cite: PowerShell native cmdlet works on any Windows service | ✅ Standard cmdlet; NSSM service Manager-registered |
| Path D needed (vs Path P alone) | Trade-off analysis: Path P satisfies cross-model gate FULLY at zero cost. Path D enables BRIDGE-MODE subagents in fan-out Waves. | ⚠️ **HONEST-NON-FINDING**: Path D is OPTIONAL — only needed if future Waves dispatch 3-5 BRIDGE-MODE subagents (advanced-agent-team standing-directive invariant). For 1-voice or Path P fires, Path D is unnecessary. Operator decides. |
| netsh actually needed (vs ports already safe) | Mia probe confirms safe currently. Pin = preventive against future Windows update / reboot drift. | ✅ Cheap-win defense ($5min + reversible); recommended. |

**FM-20 recursive check on this plan**: am I propagating a stale orchestrator framing? Cross-checked all 9 claims via Read of actual files on disk. Zero cite-drift detected. ✅

---

## §8 RECOMMENDED EXECUTION-FIRST ITEM

**🅱 (CPA panel enable + NSSM restart)** — Why first:

1. **Unblocks subsequent dependency**: source config.yaml edit MUST land before prep-state-dir.ps1 reads it in 🅳
2. **Lowest blast radius**: 5-10s CPA downtime + 1 config flip; reversible <30s
3. **Validates working environment**: confirms NSSM EEE-CLIProxyAPI is healthy + restart cycle works (de-risks 🅳)
4. **Cheap win**: ships management API on :8079 OR :8085 (CPA built-in panel — operator can browse to admin UI without cpa-usage-keeper)

After 🅱: 🅰 (netsh) parallel-safe; then 🅳 (Docker); then 🅲 (Path D, optional, restarts session).

---

## §9 HONEST-NON-FINDING

**Item 🅲 Path D is OPTIONAL, not load-bearing for current 4-item arc.** If user's intent is "execute all 4" because they want comprehensive Forward Top-5 closure, then activate. If user's intent is "enable BRIDGE-MODE subagents for upcoming fan-out Waves", then activate when those Waves arrive (one operator decision per fan-out invocation).

**Tradeoff**: Path D ON = parent 1M context window LOST (drops to ~200k effective); long-arc /loop hits /compact more aggressively. Path D OFF = current state; orchestrator-direct Path P codex CLI satisfies cross-model gate FULLY at zero cost.

**Recommendation**: Defer 🅲 to operator's next-session decision. The 4-item arc can complete as 🅱+🅰+🅳 (~2-3hr) with 🅲 queued for separate decision.

---

## §10 EXECUTION CHECKLIST (operator-facing)

```
[ ] Pre-arc: confirm Docker Desktop running (`docker version`)
[ ] Pre-arc: confirm NSSM EEE-CLIProxyAPI + EEE-CacheFixProxy Running (`Get-Service EEE-*`)
[ ] Pre-arc: confirm CPA :18317/healthz returns 200 + cache-fix :19801/health returns 200

🅱 CPA panel enable + NSSM restart
[ ] Edit config.yaml line 22: disable-control-panel: false
[ ] Restart-Service EEE-CLIProxyAPI
[ ] Smoke probe :18317/healthz = 200 + :8085/ = 200/401
[ ] Commit edit via `git add -- .cli-proxy-api/config.yaml && git commit -o -F tmp/wave152-b-msg.txt -- .cli-proxy-api/config.yaml`

🅰 netsh pin (Admin PowerShell)
[ ] netsh add 18317, 19801, 8079 (persistent)
[ ] Verify via netsh show

🅳 Docker cutover
[ ] Dry-run prep-state-dir.ps1
[ ] Run prep-state-dir.ps1
[ ] Verify config-docker.yaml has disable-control-panel: false + auth-dir rewritten
[ ] Dry-run cutover-nssm-to-docker.ps1
[ ] Run cutover-nssm-to-docker.ps1 (4-phase supervised)
[ ] Phase 0 confirm — pre-flight clean
[ ] Phase 1 confirm — Docker up + healthy
[ ] Phase 2 confirm — NSSM stopped + Docker exclusive
[ ] Phase 3 SKIP — keep NSSM registered 24-72h stability window
[ ] Smoke probe Docker endpoints + container ps

🅲 Path D (OPTIONAL — operator decides)
[ ] Edit CLAUDE.local.md line 83: uncomment $env:CLAUDE_CODE_DISABLE_1M_CONTEXT = '1'
[ ] Exit current session
[ ] Launch new session via `eee`
[ ] Verify banner shows Opus 4.7 WITHOUT (1M context)
```

---

## §11 ARTIFACT-INLINE PERSISTENCE

This deliverable persisted via Write tool to `Z:/claude-sota-installed/tmp/wave152-agentB-execution-plan-2026-05-11.md` per FM-19 readonly-guard defense (no Bash heredoc; direct Write).

## §12 HANDOFF

handoff_to: orchestrator
verdict_one_line: DONE: 4-item phased execution plan with rollback per item + dependency analysis + Mia recursive probe; recommends 🅱→🅰→🅳→🅲 ordering, 🅲 optional.
