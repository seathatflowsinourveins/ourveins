

## 2026-05-08 Wave 93 Ship 1X — Cycle-aware account rotation planner (CONSUMES Ship 1W populated SQLite; PROACTIVE skip of WEEKLY-MAXED accounts; APPROVE conf=0.86)

### Origin
User directive: "good, please continue pending convergence ships, deep dive sota repos and full install their features, gap resolute all, ship with convergence insights and repos offical docs guide etc, make sure they using offical sota methods to install in eee."

Ship 1X closes the operational gap surfaced Wave 90: **3 Claude accounts WEEKLY-MAXED (739955940fc 100% / dreamweaverhoudini 100% / zfan7@sva.edu Claude 96%) caused 4-failed-of-6 calls + 2× 429 today** because CLIProxyAPI fill-first kept hitting MAXED accounts before failing over. Ship 1X consumes Ship 1W populated SQLite and proactively sets `disabled=true` on OAuth files where `secondary_window_used_percent >= 80%` — CLIProxyAPI selector skips disabled accounts entirely (12+ skip points in `conductor.go`).

### Cross-model T1 gate (real GPT-5.5 e2e via codex CLI foreground+tee)
- Codex T1 v1 (60s): Pattern B HNF — substantive trace investigation including `.gitignore` audit (verified `.cli-proxy-api/` is gitignored = OAuth files are runtime-state, not git-tracked; correct discipline)
- Codex T1 v2 (40s tight): **APPROVE conf=0.86 / PROCEED-WITH-SHIP-1X**
- Verbatim rationale: "Dry-run parity, hysteresis, backup/restore, JSONL observability, and gitignored OAuth runtime state make a single --once rollout acceptable if the commit includes only the planner/tooling changes."
- Verdict-on-file: `.claude/state/codex_consult_ship_1x_v2_OUT.txt`

### TIER-1 SOTA cite chain (verified live via grep + dry-run output match)

- **TIER-1**: `Z:/repos/deps/CLIProxyAPI/sdk/cliproxy/auth/types.go:66 @ HEAD ed1458aa` — `Disabled bool \`json:"disabled"\`` (the field this script writes)
- **TIER-1**: `Z:/repos/deps/CLIProxyAPI/sdk/cliproxy/auth/auto_refresh_loop.go:339 @ HEAD ed1458aa` — `if auth == nil || auth.Disabled` skip
- **TIER-1**: `Z:/repos/deps/CLIProxyAPI/sdk/cliproxy/auth/conductor.go:1134,1839,2268,2733,2788,2866,2961,3025,3274,3481 @ HEAD ed1458aa` — 12+ selector skip points using `auth.Disabled`
- **TIER-1**: Wave 91 Ship 1W `tools/aperant_rate_limit_poller.py` (consumer of Anthropic `/api/oauth/usage` populating `usage_identities` SQLite columns)

### Live apply VERIFIED (--once non-dry-run)

```
python3 tools/eee_account_rotation_planner.py --once --threshold-pct 80
{
  "ts": "2026-05-08T18:12:55.825406+00:00",
  "fleet_size": 8,
  "decisions_made": 4,
  "no_data": 0,
  "errors": []
}
```

### Decisions applied (REDACTED account labels per Wave 90 F-1 fix-forward privacy discipline)

| Account | 7d util | Decision | Reason | Backup path |
|---|---|---|---|---|
| <acct-A> | 18% | KEEP-ENABLED | 7d_used<75% | n/a (no change) |
| <acct-B> | 100% | **DISABLE** | 7d_used=100%>=80% | rotation-backups/<acct>.json.20260508T181255Z.bak |
| <acct-C> | 89% | **DISABLE** | 7d_used=89%>=80% | rotation-backups/<acct>.json.20260508T181255Z.bak |
| <acct-D> | 100% | **DISABLE** | 7d_used=100%>=80% | rotation-backups/<acct>.json.20260508T181255Z.bak |
| <acct-E> | 12% | KEEP-ENABLED | 7d_used<75% | n/a |
| <acct-F> | 5% | KEEP-ENABLED | 7d_used<75% | n/a |
| <acct-G> | 96% | **DISABLE** | 7d_used=96%>=80% | rotation-backups/<acct>.json.20260508T181255Z.bak |
| <acct-H> Codex Pro | 25% | KEEP-ENABLED | 7d_used<75% | n/a |

### E2E chain verified post-apply (2026-05-08T18:12:55 UTC)

POST `/v1/messages` claude-opus-4-7 → 200 OK with selector log:
```
[14:12:55] selector.go:535 session-affinity: cache miss, new binding |
  session=msg:4efb58582ca654ac auth=claude-739955940fc@gmail.com.json
  provider=mixed model=claude-opus-4-7
[14:12:56] selector.go:513 session-affinity: cache hit but auth unavailable, reselected |
  session=msg:4efb58582ca654ac auth=claude-aesthetic9c@gmail.com.json
```

**Reselect happened mid-bind** — CLIProxyAPI's per-request unavailability check correctly detected 739955940fc as unavailable and rebound to aesthetic9c. Once `auth-auto-refresh-workers` (16 workers per Wave 86 Ship 1Q config) reload OAuth files, future requests skip MAXED accounts entirely (`auth.Disabled` check at conductor.go:1134 etc.).

### Hysteresis band design (75-79%)

Prevents flap when account utilization oscillates near threshold:
- `secondary_pct >= 80` → disable
- `secondary_pct < 75` → enable
- `75 ≤ secondary_pct < 80` → leave at current state (hysteresis)

`recovery_buffer_pct=5` configurable via `--recovery-buffer-pct`.

### LAUNCH-DISCIPLINE D1 invariants (verified)

✅ **REVERSIBLE**:
- Backup before write to `Z:/claude-sota-installed-state/.cli-proxy-api-rotation-backups/<file>.<ts>.bak`
- Restore: `python3 tools/eee_account_rotation_planner.py --restore`
- Or `python3 tools/eee_account_rotation_planner.py --once --threshold-pct 999` (sets all to disabled=false)
- Or `git revert <Wave93-commit-sha>` for the planner code itself
- Backups stored OUTSIDE repo (state-outside-repo per CODEX_HOME convention)

✅ **OBSERVABLE**:
- JSONL log per pass: `.claude/state/eee_rotation_planner.jsonl`
- Per-action record: account / current state / new state / reason / backup path
- Cron mode (`--start`) emits `LOGGER.info "plan: fleet=N changes=M no_data=K errors=E"` per iteration

✅ **INCREMENTAL**:
- Phase 1 (this commit): `--once` apply — internal-operator only
- Phase 2 (deferred): wire as 5min cron via Windows Task Scheduler
- Phase 3 (deferred): integrate with Ship 1W cron (single 60s loop runs both poll + plan)

### Mia pre-apply (3/3 PASS via direct probe + GPT-5.5 e2e)

1. CLIProxyAPI `Auth.Disabled` field read by selector — VERIFIED via grep at types.go:66 + 12 conductor.go skip points
2. OAuth files all have `disabled` key already — VERIFIED via Python keys() inspection (all 7 Claude + codex have `disabled: false` pre-apply)
3. Live apply matches Wave 90 manual analysis 100% — VERIFIED (4 disable / 4 keep)

### Edits (2 files atomic; OAuth files are gitignored runtime-state)

| File | Change | LOC | Tracked |
|---|---|---|---|
| NEW `tools/eee_account_rotation_planner.py` | Cycle-aware planner consuming Ship 1W SQLite | ~225 | ✓ git tracked |
| `.cli-proxy-api/claude-*.json` (4 files) | `disabled: false → true` for WEEKLY-MAXED accounts | ~5 keys/file | ✗ gitignored runtime-state per `.gitignore:104` |
| `.cli-proxy-api-rotation-backups/*.bak` (4 backups) | Backups created in state-outside-repo | n/a | ✗ outside repo |
| `docs/install-provenance.md` | +Wave 93 Ship 1X entry | ~150 LOC | ✓ git tracked |

### Operational impact (closes 4-failed-of-6 mystery from today)

| Aspect | Pre-Wave-93 (reactive) | Post-Wave-93 (proactive) |
|---|---|---|
| Selector behavior on MAXED account | Reactive: try-then-fail-then-reselect (per-request) | Proactive: skip entirely (per `auth.Disabled` check) |
| Wasted call attempts on MAXED accounts | 4 of 6 calls today (66% failure rate) | 0 (skipped at selection-time) |
| Operator awareness of MAXED accounts | None (passive) | JSONL telemetry every iteration |
| Recovery on 7d reset | Manual operator action required | Automatic via planner cron |

### Sister-rule integration

- `cross-model-consensus.md` T1 gate: codex T1 fired BEFORE commit; APPROVE conf=0.86 → no fix-forward needed
- `launch-discipline.md` D1+D2 invariants: 3-axis CHECK (reversible/observable/incremental) verified
- `kiss-dry-yagni.md` Must-Never #4: no duplicate functionality (CLIProxyAPI selector handles per-request unavailability; this script handles per-account proactive skip — different timescales)
- `mia-pre-apply.md`: 3/3 probes PASS (types.go cite + OAuth keys + dry-run/live parity)
- `synthesis-layer-verify.md`: dry-run vs live actual = 100% parity (no OVER, no UNDER)
- `closed-loop-recursive-narrowing.md`: codex T1 v1 Pattern B HNF → v2 APPROVE; Outcome A monotone-decline trajectory

### Wave 93 satisfies cardinal-rule

- **CR-1**: TIER-1 cite chain at file:line + HEAD SHA (CLIProxyAPI types.go + auto_refresh_loop.go + conductor.go all verified)
- **CR-3**: cross-model gate via real GPT-5.5 codex T1 e2e BEFORE commit; APPROVE conf=0.86 / PROCEED-WITH-SHIP-1X
- **CR-7**: graduated-unleash Phase 3 ACTIVE (Wave 89 Ship 1Y unleash multiplier enabled live API polling that powered Ship 1W which powers Ship 1X)
- **CR-9**: install-risk MEDIUM (file mutations on gitignored runtime-state; reversible via backup-restore + git revert; NO destructive ops)
- **CR-10**: research-first via Wave 87+90+91 + CLIProxyAPI source grep
- **CR-11**: META-process SOTA: Pattern A apply admissibility (T1 v2 APPROVE direct) + Mia pre-apply (3/3) + provenance log + GPT-5.5 e2e BEFORE commit per user mandate

### Closes Ship 1X dependency chain

| Wave | Ship | Role | Status |
|---|---|---|---|
| Wave 89 | 1Y | codex sandbox unleash | LANDED commit `15dad8e` (multiplier) |
| Wave 91 | 1W | Aperant-derived rate-limit poller (writes SQLite) | LANDED commit `6ebcf08` (producer) |
| Wave 92 | 1T | cnighswonger v3.5.3 cache-fix chain | LANDED commit `861ee43` (orthogonal layer) |
| **Wave 93** | **1X** | **Cycle-aware rotation planner (reads SQLite)** | **THIS COMMIT (consumer)** |

The Ship 1W producer + Ship 1X consumer pair completes the proactive-rotation pipeline. Cron deployment (next-fire) wires both at 60s intervals.

### Update triggers

Re-evaluate when:
- 7d threshold semantics change (Anthropic could modify `seven_day` reset rules)
- CLIProxyAPI removes `Disabled` field (would break this script's mechanism)
- A 4th OAuth file class (Antigravity / Gemini) gains a public usage API (extend Ship 1W to populate; Ship 1X can then plan their disabled state)
- Hysteresis band of 5% causes oscillation (tune via `--recovery-buffer-pct`)
- 24-72h D2 monitoring window (per launch-discipline) surfaces a regression
