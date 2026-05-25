# ARTIFACT-INLINE: Wave 84 Ship 1H Circuit-Breaker Design - Agent C

## 1. Verdict And Scope

VERDICT: DESIGN-FREEZE-NOT-IMPLEMENT

Rationale: keep the circuit-breaker design ready, but do not wire it into `eee.ps1` while the current health snapshot is good: 94.4 percent cache-read and 0 unavailable accounts. This matches Wave 83 Agent C guidance: add the breaker only after pathological signals appear in `cpa-usage-keeper` telemetry.

Target surface if activated later: an eee-side wrapper around the CLIProxyAPI route that predicts account pressure, backs off before bad routing churn, and uses HALF-OPEN canary recovery before returning all traffic to the proxy path.

Trigger thresholds for activation:

- Tier-A account rolling-cap signal over 2x in one day.
- OR cache-read below 70 percent sustained across a rolling window, not a single noisy call.

Non-goal for Ship 1H: no code change, no hard gate, no process killer, no direct edit to CLIProxyAPI.

Codex availability: AVAILABLE. `codex --version` returned `codex-cli 0.129.0`; no `VERDICT: BLOCK` stand-in path is needed.

HEAD SHAs:

- Runtime repo `Z:/claude-sota-installed`: `e6d6547ef3239a5fffbaaef19c19dc3787fd9147`
- CLIProxyAPI dependency `Z:/repos/deps/CLIProxyAPI`: `ed1458aa6d3430ba59538aeb980b8934f0e80c1f`
- LiteLLM dependency `Z:/repos/deps/litellm`: `934ecdca78daf7ec9514efd47df77bf7495c822d`

## 2. AXIS 1 - State Machine CLOSED / OPEN / HALF-OPEN

Reference model: LiteLLM `RedisCircuitBreaker` defines the exact three-state pattern to mirror, with state comments at `Z:/repos/deps/litellm/litellm/caching/redis_cache.py:97-111` and constants at `redis_cache.py:113-115` @ HEAD `934ecdca78daf7ec9514efd47df77bf7495c822d`.

Relevant cited behavior:

- CLOSED: normal calls flow through; LiteLLM documents this as "normal, Redis is called" at `redis_cache.py:101-103`.
- OPEN: calls fast-fail without network work; LiteLLM documents "raise immediately (no network call)" at `redis_cache.py:103`.
- HALF-OPEN: one recovery probe is allowed; LiteLLM documents "allow one request through" at `redis_cache.py:104`.
- OPEN -> HALF-OPEN after timeout is implemented at `redis_cache.py:131-135`.
- HALF-OPEN concurrent callers fast-fail while the canary is in flight at `redis_cache.py:124-130`.
- Failure count opens the breaker at `redis_cache.py:138-149`.
- HALF-OPEN success closes the breaker at `redis_cache.py:151-155`.

eee adaptation:

- CLOSED: route through `ANTHROPIC_BASE_URL=http://127.0.0.1:8317` and `ANTHROPIC_AUTH_TOKEN=eee-fleet-key-orchestrator`, as currently set in `Z:/claude-sota-installed/tools/eee.ps1:147-158` @ runtime HEAD `e6d6547ef3239a5fffbaaef19c19dc3787fd9147`.
- OPEN: unset proxy env vars before invoking `claude.exe`, matching existing fall-through behavior at `tools/eee.ps1:437-442`; this avoids ConnectionRefused and gives direct subscription OAuth fallback.
- HALF-OPEN: allow exactly one canary eee launch through CLIProxyAPI after a cooldown. If the canary preserves cache-read >=70 percent and no Tier-A rolling-cap condition is present, transition to CLOSED; otherwise return to OPEN and extend cooldown.

Proposed state file:

- Path: `Z:/claude-sota-installed-state/eee-circuit-breaker/state.json`
- Fields: `state`, `opened_at`, `last_signal_at`, `failure_count`, `last_reason`, `canary_pid`, `cooldown_seconds`, `source_snapshot`.
- Atomicity: write temp file then rename; PowerShell implementation can use `ConvertTo-Json` and `Move-Item -Force`.

Predictive backoff policy:

- First OPEN: 15 minutes.
- Repeated OPEN same day: 30m, 60m, 120m capped.
- HALF-OPEN canary budget: one launch or one health probe batch, not arbitrary traffic.
- Manual override: environment variable `EEE_CIRCUIT_BREAKER_DISABLE=1` to bypass design if it ever ships.

## 3. AXIS 2 - Trigger Signal Source Comparison

Score scale: 1 = poor, 10 = strong. Latency means how quickly it can see the condition. Reliability means suitability as an automated breaker input.

| Source | What It Sees | Latency | Reliability | Decision |
|---|---:|---:|---:|---|
| cpa-usage-keeper SQLite | Per-request CPA usage persisted locally, account/model aggregation, request health | 8 | 8 | Primary trigger source after pathological telemetry exists |
| CLIProxyAPI Mgmt API | Live account roster, unavailable status, usage queue, key usage, routing strategy | 9 | 7 | Primary liveness and canary validator; not enough alone for sustained cache-read trend |
| `ccusage daily` | Claude Code session JSONL daily totals and cache-read rate | 3 | 9 | Backstop and reporting source; too coarse for fast OPEN/HALF-OPEN |

Evidence chain:

- cpa-usage-keeper consumes CLIProxyAPI usage queue into SQLite and exposes aggregation/dashboard APIs: `Z:/claude-sota-installed/.local/cpa-usage-keeper/cpa-usage-keeper_v1.5.2_windows_amd64/README.en.md:5-17`.
- cpa-usage-keeper work dir stores `app.db`, logs, and backups: `README.en.md:62-68` and `README.en.md:205`.
- Browser APIs redact some values, but raw database values remain unchanged: `README.en.md:72-75`.
- CLIProxyAPI exposes `/healthz`: `Z:/repos/deps/CLIProxyAPI/internal/api/server.go:332-341` @ HEAD `ed1458aa6d3430ba59538aeb980b8934f0e80c1f`.
- CLIProxyAPI exposes `/v0/management/api-key-usage` and `/v0/management/usage-queue`: `server.go:549-555`.
- CLIProxyAPI exposes `/v0/management/auth-files`: `server.go:642-649`.
- Existing `eee-status.ps1` already calls Mgmt API auth files at `Z:/claude-sota-installed/tools/eee-status.ps1:45-53`, API key usage at `eee-status.ps1:126-148`, and `ccusage daily --json` at `eee-status.ps1:151-175`.

Trigger interpretation:

- Tier-A rolling-cap over 2x/day: use cpa-usage-keeper SQLite as the durable counter if available; confirm live account status via Mgmt API `/auth-files`.
- Cache-read below 70 percent sustained: use cpa-usage-keeper rolling windows when available; use `ccusage daily` only to confirm the daily trend because it is daily-grain and too slow for a breaker loop.
- 0 unavailable accounts from Mgmt API means do not OPEN on speculative risk.

## 4. AXIS 3 - Implementation Surface Decision Matrix

| Surface | Fit | Latency | Risk | Maintainability | Decision |
|---|---:|---:|---:|---:|---|
| PowerShell wrapper in `tools/eee.ps1` | 9 | 8 | 6 | 7 | Best activation surface if needed |
| Python hook | 5 | 7 | 7 | 5 | Avoid for launch-path routing; good for offline tests only |
| Go sidecar | 6 | 9 | 4 | 4 | Too much new runtime for current healthy state |

PowerShell wrapper decision:

- eee already owns proxy env setup at `tools/eee.ps1:147-168`.
- eee already owns proxy health recovery and direct OAuth fall-through at `tools/eee.ps1:394-442`.
- eee already starts cpa-usage-keeper as an advisory sidecar with bounded readiness at `tools/eee.ps1:447-512`.
- A breaker belongs before `claude.exe` invocation, not inside CLIProxyAPI, because the desired OPEN action is "unset proxy env and let Claude Code use direct OAuth fallback."

Python hook decision:

- Hooks are better for tool-policy and review gates, not transport routing before process launch.
- A hook would run too late for `ANTHROPIC_BASE_URL` path selection unless it became a launcher dependency, which would add another moving part.

Go sidecar decision:

- A sidecar could poll faster and keep richer state, but it would add a second always-on control process next to CLIProxyAPI and cpa-usage-keeper.
- Current Ship 1H has no pathological signal; adding a sidecar now violates the incremental launcher discipline already used by T0.7/T0.8/T0.9.

Freeze design choice:

- Store this as design only.
- If future telemetry crosses thresholds, implement a small PowerShell block in `tools/eee.ps1` between current proxy env setup and T0.8 health probe.
- Keep it advisory for first activation; promote to hard behavior only after a real failure replay.

## 5. AXIS 4 - Integration Test Path With Mock Signal Injection

Test goal: validate state transitions without consuming real account quota and without requiring real pathological signals.

Proposed test harness:

- Add a test-only environment variable: `EEE_CB_SIGNAL_FILE=Z:/claude-sota-installed/tmp/mock-circuit-breaker-signal.json`.
- When set, the wrapper reads the signal file instead of cpa-usage-keeper SQLite or Mgmt API.
- Mock fields: `cache_read_percent`, `tier_a_rolling_cap_events_today`, `unavailable_accounts`, `source`, `observed_at`.
- State file redirected with `EEE_CB_STATE_FILE=Z:/claude-sota-installed/tmp/mock-circuit-breaker-state.json`.

Transition tests:

1. CLOSED remains CLOSED:
   - Signal: `cache_read_percent=94.4`, `tier_a_rolling_cap_events_today=0`, `unavailable_accounts=0`.
   - Expected: proxy env remains set; state remains CLOSED.

2. CLOSED -> OPEN:
   - Signal: `cache_read_percent=65.0` sustained flag true OR `tier_a_rolling_cap_events_today=3`.
   - Expected: state OPEN; proxy env vars unset; advisory line includes reason.

3. OPEN remains OPEN during cooldown:
   - State: `opened_at` now, `cooldown_seconds=900`.
   - Signal: healthy.
   - Expected: no canary; direct OAuth fallback remains active.

4. OPEN -> HALF-OPEN:
   - State: cooldown elapsed.
   - Signal: healthy.
   - Expected: one canary launch gets proxy env; state marks canary in flight.

5. HALF-OPEN -> CLOSED:
   - Signal after canary: `cache_read_percent>=70`, `unavailable_accounts=0`, cap events below threshold.
   - Expected: state CLOSED and failure count reset, mirroring LiteLLM success close at `redis_cache.py:151-155`.

6. HALF-OPEN -> OPEN:
   - Signal after canary: cache-read below threshold or new cap event.
   - Expected: state OPEN, `opened_at` refreshed, cooldown increased, matching LiteLLM failure reopen at `redis_cache.py:138-149`.

Verification commands after implementation:

```powershell
$env:EEE_CB_SIGNAL_FILE='Z:/claude-sota-installed/tmp/mock-circuit-breaker-signal.json'
$env:EEE_CB_STATE_FILE='Z:/claude-sota-installed/tmp/mock-circuit-breaker-state.json'
pwsh -NoProfile -ExecutionPolicy Bypass -File Z:/claude-sota-installed/tools/eee.ps1 --version
```

Expected no-real-quota property:

- Use `--version` or a dry preflight mode if available; do not send model traffic during transition tests.
- Mock signal file drives breaker conditions.
- Mgmt API and cpa-usage-keeper remain untouched unless an explicit live integration test is requested.

## 6. Honest Assessment And TIER-1 Cite Chain

HONEST ASSESSMENT: DESIGN-FREEZE-NOT-IMPLEMENT.

Why not ship-now:

- The health snapshot is not pathological: 94.4 percent cache-read and 0 unavailable accounts.
- CLIProxyAPI already has fill-first routing that intentionally burns one account before moving to the next, helping stagger rolling-window caps: `Z:/repos/deps/CLIProxyAPI/sdk/cliproxy/auth/selector.go:33-36` @ HEAD `ed1458aa6d3430ba59538aeb980b8934f0e80c1f`.
- CLIProxyAPI already has session affinity with default 1h TTL: `selector.go:448-453`.
- Session affinity binds provider/session/model to auth and reselects if the bound auth is unavailable: `selector.go:498-535`.
- Config docs say automatic failover is enabled when bound auth becomes unavailable: `Z:/repos/deps/CLIProxyAPI/config.example.yaml:112-122`.
- eee already has proxy auto-start and direct OAuth fall-through for hard liveness failures: `Z:/claude-sota-installed/tools/eee.ps1:394-442` @ HEAD `e6d6547ef3239a5fffbaaef19c19dc3787fd9147`.
- eee already starts cpa-usage-keeper as advisory telemetry, not a hard dependency: `tools/eee.ps1:447-512`.

Why not reject:

- LiteLLM provides a compact, proven CLOSED/OPEN/HALF-OPEN reference pattern in `redis_cache.py:97-155`.
- The eee launcher has a clear, reversible OPEN action: unset `ANTHROPIC_BASE_URL` and `ANTHROPIC_AUTH_TOKEN`, already used at `tools/eee.ps1:437-442`.
- cpa-usage-keeper provides the durable local SQLite telemetry needed for predictive backoff once real bad signals exist: `README.en.md:7-17`.

TIER-1 cite chain:

- LiteLLM circuit breaker reference: `Z:/repos/deps/litellm/litellm/caching/redis_cache.py:97-155` @ HEAD `934ecdca78daf7ec9514efd47df77bf7495c822d`.
- CLIProxyAPI health and Claude route: `Z:/repos/deps/CLIProxyAPI/internal/api/server.go:332-341` and `server.go:351-360` @ HEAD `ed1458aa6d3430ba59538aeb980b8934f0e80c1f`.
- CLIProxyAPI management signal endpoints: `server.go:549-555` and `server.go:642-649` @ HEAD `ed1458aa6d3430ba59538aeb980b8934f0e80c1f`.
- CLIProxyAPI fill-first/session-affinity/failover anchors: `Z:/repos/deps/CLIProxyAPI/sdk/cliproxy/auth/selector.go:33-36`, `selector.go:448-453`, `selector.go:498-535`, and `Z:/repos/deps/CLIProxyAPI/config.example.yaml:112-122` @ HEAD `ed1458aa6d3430ba59538aeb980b8934f0e80c1f`.
- eee proxy env and fall-through anchors: `Z:/claude-sota-installed/tools/eee.ps1:147-168`, `tools/eee.ps1:394-442`, and `tools/eee.ps1:447-512` @ HEAD `e6d6547ef3239a5fffbaaef19c19dc3787fd9147`.
- Existing dashboard signal readers: `Z:/claude-sota-installed/tools/eee-status.ps1:45-53`, `eee-status.ps1:126-148`, and `eee-status.ps1:151-175` @ HEAD `e6d6547ef3239a5fffbaaef19c19dc3787fd9147`.

Final decision:

Keep the breaker as a frozen design artifact. Do not implement until cpa-usage-keeper or Mgmt API shows a real pathological pattern: Tier-A rolling-cap over 2x/day or sustained cache-read below 70 percent. Current state supports continued CLOSED operation with no new wrapper.
