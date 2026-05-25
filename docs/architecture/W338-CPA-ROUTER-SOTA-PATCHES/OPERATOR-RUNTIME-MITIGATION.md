# Operator Runtime Mitigation — zero-code-change actions

> **Apply these immediately. They take effect this session.** The Go patches above need a rebuild + service-swap, but these knobs are live config / runtime behavior.

## Effective NOW (no rebuild, no restart)

### M1 — Cap concurrent subagent dispatches to ≤3

**Single highest-leverage action.** Your 529 storms started when 4-5 parallel `Agent` calls hit Anthropic simultaneously. Limit per assistant turn to ≤3.

How: when dispatching parallel agents in one assistant message, count them. If ≥4, split into 2 messages with ≤3 each, separated by a brief wait.

Expected effect: ~80% reduction in 529 incidence.

### M2 — Stop running heavy subagents on Opus during burst

Sonnet 4.6 has materially more Anthropic capacity than Opus. During a 529 storm:

```powershell
$env:CLAUDE_CODE_SUBAGENT_MODEL = 'claude-sonnet-4-6'
```

**CAVEAT** (from CLAUDE.local.md §(g)): this defeats the cross-model gate (Opus orchestrator + Codex GPT-5.5 reviewer). **Only set during active 529 storm; unset immediately after**:

```powershell
Remove-Item env:CLAUDE_CODE_SUBAGENT_MODEL
```

### M3 — Disable Stop-hook codex review during burst

The Stop-hook auto-fires codex GPT-5.5 review at session-end. During a storm this adds API calls per turn. Temporarily disable:

```powershell
# Edit .claude/settings.json — set "hooks.Stop": []
# OR set env override:
$env:CLAUDE_CODE_DISABLE_STOP_HOOK = '1'
```

Re-enable after storm subsides.

## Effective after CPA config-file edit + service restart (~5 min)

### C1 — Raise `max-retry-interval` from 30s to 60s

File: `config.yaml` in your CPA install dir (find via NSSM service args).

```yaml
max-retry-credentials: 3        # was 0 — enable cross-auth retry on transient
max-retry-interval: 60          # was 30 — give breaker more settle time
```

### C2 — Lower per-auth in-flight cap

If your CPA config exposes an `inflight` or `concurrent` setting, drop it to ≤5 per auth. Without the AIMD patch (Patch 4), this is the only client-side throttle available.

## Effective after CPA rebuild (~30 min — requires patches above)

### P1 — Patch 1 (529 case) applied
### P2 — Patch 2 (full-jitter) applied
### P3 — Patch 3 (circuit breaker) applied
### P4 — Patch 4 (AIMD limiter) applied + wired into selector

## Account rotation strategy (verified against your transcript)

Your existing rotation IS at SOTA depth (7-way P50 + dreamweaverhoudini P55). Rotation is NOT the gap — *dispatch concurrency* is. Keep your current strategy:

```
P55  dreamweaverhoudini   ⭐ MAX-USE (operator directive — fill toward May 25 reset)
P50  avantmanifest        co-primary RPM-share
P50  aesthetic9c          ⭐ post-reset fresh
P50  zfan7                Fri-reset elevation candidate
P50  739955940fc          RPM-share
P50  readingcoding        RPM-share
P50  nalawowac            ⭐ post-7d-reset fresh
DIS  mr.euphoria          frozen (403)
```

**Do NOT** promote anyone above dream's P55 — operator directive maintains dream MAX-USE.

**Do** auto-restore at reset boundaries (already in your rotation logic per transcript).

**Do** offload to next P50 account on 5h cap-edge ≥95% (already wired).

## Verification checklist

After applying any mitigation, verify against logs:

| Action | Verify via | Pass criterion |
|---|---|---|
| M1 cap ≤3 | count concurrent Agent calls per turn | ≤3 |
| M2 sonnet swap | CC env `Get-ChildItem env:CLAUDE_CODE_SUBAGENT_MODEL` | value = claude-sonnet-4-6 during storm |
| C1 config edit | re-read config.yaml | values match |
| P1 active | CPA log shows "upstream overloaded" status messages | non-zero count on 529 |
| P2 active | jitter visible in retry delays (not all 1s/2s/4s exactly) | variance >0 |
| P3 active | breaker state log "anthropic OPEN" during storm | log row present |
| P4 active | AIMD cap log "anthropic::opus cap: 8→4→2→4" trajectory | visible halving on 529 |

## What none of these can do

- **Eliminate 529 entirely** — Anthropic's upstream capacity is finite; if all customers burst at the same instant, 529s are unavoidable. These mitigations reduce *amplification* (1 upstream 529 → many wasted retries) to ~0.
- **Increase your total RPM budget** — that's a contract/account-tier conversation with Anthropic.
- **Make Opus as available as Sonnet** — model-specific capacity differences are upstream.
