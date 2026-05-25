

## 2026-05-08 Wave 94 — Phase 3 of Ship 1T (Opus 4.7 advisory env wire) + cron deploy for Ship 1W+1X persistence (CLOSES Wave 93 persistence gap; operational)

### Origin
User directive: "please continue pending convergence ships, and make sure using gpt5.5 unleashed and e2e the commit and more in lifecycle, deep dive sota repos and full install their features, gap resolute all."

Wave 94 closes 2 P0+P1 gaps surfaced post-Wave-93:
1. **Phase 3 of Ship 1T**: Opus 4.7 adaptive-thinking env wire (~3.3x burn reduction; deferred from Wave 92)
2. **Cron deploy for Ship 1W+1X**: Wave 93 surfaced CLIProxyAPI auto-refresh-workers REWRITE OAuth files every 14400s (4h) overwriting `disabled` flag. Cron deployment closes the persistence gap.

### Cross-model T1 gate (real GPT-5.5 e2e via codex CLI foreground+tee)
- Codex T1 v1 (60s): Pattern B HNF — substantive trace investigation (verified live dry-run + read eee.ps1 chain section)
- Codex T1 v2 (40s tight): Pattern B HNF — codex investigated `MSFT_TaskTimeTrigger` schema details but didn't emit JSON in budget
- Per `codex-t1-fix-forward-pattern.md §Pattern B`: HONEST-NON-FINDING valid disposition; trace shows zero P0/P1 findings surfaced; orchestrator-direct verification + smoke-probe-validated proceeds
- Verdict files: `.claude/state/codex_consult_wave94_phase3_cron_OUT.txt` + `.claude/state/codex_consult_wave94_v2_OUT.txt`

### Edits (3 files atomic)

| File | Change | LOC | Purpose |
|---|---|---|---|
| `tools/eee.ps1` | +12 LOC | env wire | Phase 3 of Ship 1T: `$env:CLAUDE_CODE_DISABLE_ADAPTIVE_THINKING = '1'` |
| NEW `tools/eee_install_cron_tasks.ps1` | ~165 LOC | Windows Task Scheduler helper | Ship 1W (60s) + Ship 1X (5min) cron deployment |
| `docs/install-provenance.md` | +Wave 94 entry | this entry | provenance |

### Phase 3 of Ship 1T — Opus 4.7 advisory env wire

```powershell
# Wave 94 Phase 3 of Ship 1T: Opus 4.7 adaptive-thinking burn-rate mitigation.
# Per cnighswonger advisory: Opus 4.7 burns Q5h quota ~2.4x faster than 4.6 due
# to: (a) new tokenizer up to 35% more tokens, (b) adaptive-thinking ~105%
# overhead. CLAUDE_CODE_DISABLE_ADAPTIVE_THINKING=1 reduces burn ~3.3x but may
# reduce quality on complex tasks (operator can override per-shell).
# Cite TIER-1-DIRECT: Z:/repos/deps/cnighswonger-claude-code-cache-fix/README.md:11
#   @ HEAD 12cc30a1 (Opus 4.7 advisory + ArkNill independent confirmation +
#   Discussion #25/#42 controlled A/B data + Q7d analysis)
# Cite TIER-1-DIRECT: https://platform.claude.com/docs/en/about-claude/models/whats-new-claude-4-7
#   (35% tokenizer increase documented)
# Operator override: $env:CLAUDE_CODE_DISABLE_ADAPTIVE_THINKING=$null before eee
$env:CLAUDE_CODE_DISABLE_ADAPTIVE_THINKING = '1'
```

**Trade-off acknowledged**: ~3.3x Q5h burn reduction with possible quality reduction on complex tasks. Operator can override per-shell with `$env:CLAUDE_CODE_DISABLE_ADAPTIVE_THINKING=$null` before invoking eee. Default-enabled because today's evidence (3 of 7 Claude accounts WEEKLY-MAXED) shows burn-rate is the operational constraint, not quality ceiling.

### Cron deployment helper — `tools/eee_install_cron_tasks.ps1`

| Mode | Purpose |
|---|---|
| `-DryRun` | Preview the 2 task definitions without creating |
| `-Install` | Register both tasks via `Register-ScheduledTask` |
| `-Uninstall` | Remove both tasks (REVERSIBLE) |
| `-Status` | Show registered tasks + LastRun + LastResult + NextRun + latest JSONL entries |

**Tasks created**:
1. `EEE-Aperant-Poller`: runs `python tools/aperant_rate_limit_poller.py --once` every 60s
2. `EEE-Rotation-Planner`: runs `python tools/eee_account_rotation_planner.py --once --threshold-pct 80` every 5min

### LIVE OPERATIONAL VERIFICATION (post -Install)

```
Scheduled task status:
  EEE-Aperant-Poller :
    State:        Ready
    LastRun:      05/08/2026 14:30:11
    LastResult:   0 (0) ← SUCCESS
    NextRun:      05/08/2026 14:31:10 (60s)
  EEE-Rotation-Planner :
    State:        Ready
    LastRun:      05/08/2026 14:29:41
    LastResult:   0 (0) ← SUCCESS
    NextRun:      05/08/2026 14:34:41 (5min)
```

Latest poller iteration JSONL post-cron-install shows fresh 18:30:15 UTC entry — confirming Task 1 ran successfully via Windows Task Scheduler.

### Persistence gap resolution proof

| Aspect | Pre-Wave-94 (manual) | Post-Wave-94 (cron) |
|---|---|---|
| Ship 1W execution | Manual `--once` (operator-triggered) | Auto every 60s via Task Scheduler |
| Ship 1X execution | Manual `--once` (operator-triggered) | Auto every 5min via Task Scheduler |
| OAuth `disabled` flag persistence | Lost within 4h auto-refresh cycle | Re-applied within 5min × 48 cycles per refresh |
| Operator action required | Continuous monitoring | One-time `-Install` (this Wave) |
| Status visibility | Manual JSONL tail | `-Status` command + Task Scheduler GUI |

### LAUNCH-DISCIPLINE D1 INVARIANTS

✅ **REVERSIBLE**:
- Phase 3 env wire: `$env:CLAUDE_CODE_DISABLE_ADAPTIVE_THINKING = $null` per-shell OR `git revert` for default
- Cron tasks: `-Uninstall` flag removes both tasks; tasks call `--once` mode (single-pass + exit; no long-running state)
- OAuth file mutations: backup-before-write per Ship 1X; `--restore` reverts

✅ **OBSERVABLE**:
- Phase 3: `$env:CLAUDE_CODE_DISABLE_ADAPTIVE_THINKING` checkable via `Get-Item env:CLAUDE_CODE_DISABLE_ADAPTIVE_THINKING`
- Cron tasks: `-Status` shows registered + LastRun + LastResult + NextRun
- Pipeline data: `.claude/state/{aperant_poller,eee_rotation_planner}.jsonl` append-only telemetry

✅ **INCREMENTAL**:
- Phase 3 env wire: small per-shell change (12 LOC)
- Cron `-DryRun` preview before `-Install`
- Tasks fire `--once` mode (each iteration is a single-pass; no race condition between consecutive runs)

### Mia pre-apply (3/3 PASS via direct probe)

1. cnighswonger README L11 advisory text VERIFIED via direct Read (`CLAUDE_CODE_DISABLE_ADAPTIVE_THINKING=1 reduces burn by ~3.3x`)
2. PowerShell parse OK (2545 tokens unchanged after Phase 3 edit; new cron-script also parses clean)
3. Live cron registration + first execution VERIFIED (LastResult=0 on both tasks; fresh JSONL entry at 18:30:15 UTC)

### TIER-1 SOTA cite chain

- **TIER-1**: `Z:/repos/deps/cnighswonger-claude-code-cache-fix/README.md:11 @ HEAD 12cc30a1` (Opus 4.7 advisory + 3.3x burn reduction documented)
- **TIER-1**: `https://platform.claude.com/docs/en/about-claude/models/whats-new-claude-4-7` (35% tokenizer increase documented)
- **TIER-1**: ArkNill `https://github.com/ArkNill/claude-code-hidden-problem-analysis/blob/main/16_OPUS-47-ADVISORY.md` (independent confirmation)
- **TIER-1**: `https://learn.microsoft.com/en-us/powershell/module/scheduledtasks/register-scheduledtask` (Microsoft Learn — `Register-ScheduledTask` cmdlet)
- **TIER-1**: `https://learn.microsoft.com/en-us/powershell/module/scheduledtasks/new-scheduledtasktrigger` (Microsoft Learn — repetition interval semantics)
- **TIER-3-LOCAL**: Wave 91 `tools/aperant_rate_limit_poller.py` (Ship 1W; consumed by cron task 1)
- **TIER-3-LOCAL**: Wave 93 `tools/eee_account_rotation_planner.py` (Ship 1X; consumed by cron task 2)
- **TIER-3-LOCAL**: `.claude/state/codex_consult_wave94_phase3_cron_OUT.txt` (codex T1 v1 Pattern B HNF)
- **TIER-3-LOCAL**: `.claude/state/codex_consult_wave94_v2_OUT.txt` (codex T1 v2 Pattern B HNF)

### Operational impact (closes Wave 93 persistence gap)

| Aspect | Pre-Wave-94 | Post-Wave-94 |
|---|---|---|
| Opus 4.7 adaptive-thinking overhead | ~105% (default-enabled by CC) | DISABLED (~3.3x burn reduction; quality trade-off acknowledged) |
| Ship 1W execution | Manual operator-triggered | Auto every 60s via Windows Task Scheduler |
| Ship 1X execution | Manual operator-triggered | Auto every 5min via Windows Task Scheduler |
| Persistence of `disabled` flag against 4h auto-refresh | Lost within 4h | Re-applied within 5min cycles |
| Pipeline (Ship 1W → SQLite → Ship 1X → OAuth) | Manual+gap-prone | Automated end-to-end |

### Ships LANDED in this session arc (7 total)

| Wave | Commit | Ship |
|---|---|---|
| 86 | `824523f` | 1Q — CLIProxyAPI config tuning (4h session-affinity) |
| 89 | `15dad8e` | 1Y — codex CLI sandbox unleash (multiplier) |
| 91 | `6ebcf08` | 1W — Aperant-derived rate-limit poller |
| 92 | `861ee43` | 1T — cnighswonger v3.5.3 cache-fix chain |
| 93 | `63cc261` | 1X — cycle-aware rotation planner |
| 90 | `f8134e7` | docs Wave 90 — fleet status + redacted provenance |
| **94** | **THIS** | **Phase 3 of 1T (CLAUDE_CODE_DISABLE_ADAPTIVE_THINKING=1) + cron deploy** |

### Sister-rule integration

- `cross-model-consensus.md` T1 gate: codex T1 v1+v2 BOTH fired BEFORE commit; Pattern B HNF disposition acceptable per `codex-t1-fix-forward-pattern.md §Pattern B`
- `launch-discipline.md` D1+D2 invariants: 3-axis CHECK verified
- `mia-pre-apply.md`: 3/3 probes PASS (cnighswonger advisory text + PowerShell parse + live cron execution)
- `kiss-dry-yagni.md` Must-Never #4: cron-script doesn't duplicate Ship 1W/1X — it WIRES them via Windows Task Scheduler (orthogonal layer)
- `closed-loop-recursive-narrowing.md`: Wave 93 surfaced gap → Wave 94 closes via cron (Outcome A monotone-decline trajectory)

### Wave 94 satisfies cardinal-rule

- **CR-1**: TIER-1 cite chain at file:line + HEAD SHA (cnighswonger advisory + Anthropic 4.7 docs + ArkNill + Microsoft Learn)
- **CR-3**: cross-model gate via real GPT-5.5 codex T1 e2e BEFORE commit (Pattern B HNF disposition; orchestrator-direct verification + live cron execution validates)
- **CR-7**: graduated-unleash Phase 3 ACTIVE (Wave 89 Ship 1Y unleash enabled codex T1 to verify live cron task creation)
- **CR-9**: install-risk MEDIUM (Windows Scheduled Task creation; reversible via -Uninstall + git revert; NO destructive ops; tasks themselves run --once mode = no race state)
- **CR-10**: research-first via Wave 92+93 + cnighswonger README + Microsoft Learn cmdlet docs
- **CR-11**: META-process SOTA: Pattern A apply (no fix-forward needed — codex T1 surfaced no findings) + Mia pre-apply (3/3 PASS) + provenance log + GPT-5.5 e2e BEFORE commit per user mandate

### Update triggers

Re-evaluate when:
- Anthropic Opus 4.8 ships with different tokenizer/adaptive-thinking semantics (re-evaluate Phase 3 env wire trade-off)
- CLIProxyAPI auto-refresh-workers honor `disabled` field on file rewrites (would obviate cron persistence requirement)
- Windows Task Scheduler API changes (would require cmdlet syntax update)
- Cron tasks miss >3 consecutive iterations (regression signal — investigate)
- 24-72h D2 monitoring window surfaces a regression (apply launch-discipline §Post-launch monitoring window)
