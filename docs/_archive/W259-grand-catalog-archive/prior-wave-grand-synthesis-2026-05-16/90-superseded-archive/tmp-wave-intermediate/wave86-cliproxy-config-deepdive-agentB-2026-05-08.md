# ARTIFACT-INLINE: CLIProxyAPI Config Deep Dive Agent B

Date: 2026-05-08

Scope read:

- Installed config: `Z:/claude-sota-installed/.cli-proxy-api/config.yaml`
- Installed log tail: `Z:/claude-sota-installed/.cli-proxy-api/logs/main.log` last 200 lines
- Sibling config: `Z:/claude-sota/.cli-proxy-api/config.yaml`
- Source checkout/listing: `Z:/repos/deps/CLIProxyAPI`

Cardinal-rule-9 sibling-bleed defense: sibling config path is MISSING, so no sibling values were imported, normalized, copied, or used as defaults. This audit treats the installed config as the only operative config and flags sibling comparison as MISSING.

Runtime facts:

- Today's stated traffic: 921M tokens.
- Today's stated cache-read rate: 94.4%.
- Installed auth inventory: 7 Claude OAuth JSON files, 1 Codex Pro JSON file, 1 Gemini JSON file, 1 Antigravity JSON file.
- Running log banner reports CLIProxyAPI `6.10.9`, commit `785b00c3`, built `2026-05-07T01:37:01Z`.
- Source checkout used for code citations is `ed1458aa6d3430ba59538aeb980b8934f0e80c1f`.
- Audit risk: runtime/source SHA skew exists. Source citations below are exact to checkout SHA `ed1458aa6d3430ba59538aeb980b8934f0e80c1f`, while observed runtime line tags come from the running `785b00c3` binary.

## 1. Current Config Audit

| Area | Current | Label | Notes |
|---|---:|---|---|
| Bind address | `127.0.0.1:8317` | OPTIMAL | Local-only bind is correct for local harness fleet. |
| TLS | disabled | OPTIMAL | Acceptable because host is loopback. |
| Remote management allow-remote | `false` | OPTIMAL | No remote control exposure. |
| Remote management panel | enabled | SUBOPTIMAL | Local-only is acceptable, but panel polling is noisy in logs every ~30s across management endpoints. Consider disabling during harness runs if not needed. |
| Remote management secret | bcrypt-looking value | OPTIMAL | Source hashes plaintext startup values and persists nested scalar if needed. |
| `auth-dir` | `~/.cli-proxy-api` | SUBOPTIMAL | Works if process home resolves to installed fleet dir. For harness reproducibility, prefer explicit `Z:/claude-sota-installed/.cli-proxy-api`. |
| API keys | 4 workload keys | OPTIMAL | Good downstream stratification. |
| `commercial-mode` | `true` | OPTIMAL | Required shape for multi-account production use. |
| file logging | enabled, 1024 MB | OPTIMAL | Good for postmortem of 921M-token day. |
| usage statistics | enabled | OPTIMAL | Needed for fleet telemetry. |
| Redis usage retention | 600s | OPTIMAL | Better than example 60s; below source clamp 3600s. |
| auth refresh workers | 32 | SUBOPTIMAL | Aggressive for 10 auth files. Fine during warmup, but can create refresh bursts; watch provider refresh rate limits. |
| request retry | 5 | SUBOPTIMAL | Aggressive. Logs show repeated reselect loops around 03:48-03:51 before 429. Prefer 3 for steady harness. |
| max retry credentials | 3 | SUBOPTIMAL | With 7 Claude auths, 3 limits fanout during provider-local failure; okay for latency, not max availability. Prefer 4 during fleet waves. |
| max retry interval | 60s | OPTIMAL | Reasonable cap for cooldown wait. |
| disable cooling | `false` | OPTIMAL | Cooldown must remain enabled. |
| quota switch-project | `true` | OPTIMAL | Correct failover posture. |
| quota switch-preview-model | `true` | OPTIMAL | Correct failover posture. |
| quota antigravity credits | `false` | OPTIMAL | Protects paid/credit fallback from accidental Claude spillover. |
| streaming keepalive | 15s | OPTIMAL | Good for Claude Code SSE. |
| streaming bootstrap retries | 1 | OPTIMAL | Avoids duplicate late streaming side effects. |
| nonstream keepalive | 30s | OPTIMAL | Reasonable. |
| routing strategy | `fill-first` | OPTIMAL | Source says fill-first burns one account before moving to next, useful for rolling-window caps. |
| session affinity | enabled | OPTIMAL | Essential for cache locality and account-sticky prompt cache reuse. |
| session affinity TTL | `1h` | SUBOPTIMAL | For long-running harness waves, 1h can expire active threads and lose account locality. Raise to `4h` for cache-read target. |
| ws-auth | `false` | SUBOPTIMAL | If Codex WebSocket path is used, enable it; otherwise leave off. Current comment says Codex WS preference, but value is off. |
| Gemini CLI endpoint | `false` | SUBOPTIMAL | If harness uses Gemini CLI native endpoint, enable it; if not, keep off. |
| force-model-prefix | `false` | OPTIMAL | Correct when accounts span all models. |
| passthrough headers | `false` | OPTIMAL | Reduces accidental provider/header bleed. |
| Antigravity signature cache | commented defaults | OPTIMAL | Defaults are appropriate unless strict bypass testing is needed. |
| Commented config SHA | cites `785b00c3` | SUBOPTIMAL | Running binary matches this, but source checkout is `ed1458aa...`; update comments when source/vendor is pinned. |
| Sibling config comparison | path absent | MISSING | `Z:/claude-sota/.cli-proxy-api/config.yaml` does not exist. No sibling bleed applied. |
| Health endpoint expectation | `/health` returns 404 | SUBOPTIMAL | Log tail has `GET /health` 404. Use `/healthz`, which appears successful in full log. |

## 2. Recommended SOTA Config Diff

Conservative diff only; does not rotate secrets or mutate auth JSON.

```yaml
# recommended patch over Z:/claude-sota-installed/.cli-proxy-api/config.yaml

auth-dir: "Z:/claude-sota-installed/.cli-proxy-api"

remote-management:
  allow-remote: false
  secret-key: "$2a$10$BSkoCXcRXMH/rO5dVhlks.l.t1hL./e3rHoCIQXbGakAMIg6oKW4S"
  disable-control-panel: true
  panel-github-repository: "https://github.com/router-for-me/Cli-Proxy-API-Management-Center"

auth-auto-refresh-workers: 16
request-retry: 3
max-retry-credentials: 4
max-retry-interval: 60
disable-cooling: false

routing:
  strategy: "fill-first"
  session-affinity: true
  session-affinity-ttl: "4h"

# Enable only if the harness actually uses Codex WS auth.
ws-auth: true

# Enable only if Gemini CLI traffic should hit the native Gemini CLI endpoint.
enable-gemini-cli-endpoint: true
```

Rationale:

- The cache-read improvement lever is not more breakpoints; CLIProxyAPI already auto-injects and caps them. The lever is fewer account rebindings for the same session plus fewer retry storms that evict sticky routes.
- `auth-dir` should be absolute to avoid home-directory drift between service launch, shell launch, and harness launch.
- `disable-control-panel: true` removes the 30s management polling noise from the active fleet log during harness waves.
- `request-retry: 3` plus `max-retry-credentials: 4` trades a little retry breadth for less hot-looping. Current logs show repeated reselect attempts against unavailable auths before 429.
- `session-affinity-ttl: 4h` keeps long harness conversations on the same auth and model for cache locality beyond a one-hour wave segment.

## 3. Cache-Affinity Strategy To Reach 96%+

Source cites use `Z:/repos/deps/CLIProxyAPI` at SHA `ed1458aa6d3430ba59538aeb980b8934f0e80c1f`.

Relevant implementation facts:

- `internal/runtime/executor/claude_executor.go:174-182+ed1458aa` auto-injects cache control only when none exist, then enforces the max 4 breakpoint limit.
- `internal/runtime/executor/claude_executor.go:1843-1864+ed1458aa` injects in the order: last tool, last system prompt element, second-to-last user turn.
- `internal/runtime/executor/claude_executor.go:1997-2013+ed1458aa` removes excess cache blocks with lower-value-first priority and preserves last tool/last system as high-value blocks.
- `internal/runtime/executor/claude_executor.go:2176-2233+ed1458aa` adds message cache control to the second-to-last user turn only when there are at least two user turns and no existing message cache control.
- `internal/runtime/executor/claude_executor.go:2263-2292+ed1458aa` places cache control on the last tool only if no tool already has it.
- `internal/runtime/executor/claude_executor.go:2301-2331+ed1458aa` places cache control on the last system element only if no system element already has it.
- `sdk/cliproxy/auth/selector.go:498-535+ed1458aa` keys session affinity by `provider::session::model`, refreshes cache hits, and reselects when the bound auth is unavailable.
- `internal/config/config.go:232-242+ed1458aa` documents universal session affinity and TTL parsing.

Recommended cache-affinity operating rules:

1. Keep `routing.strategy: fill-first`.
   Source `sdk/cliproxy/auth/selector.go:33-36+ed1458aa` describes fill-first as deterministic and useful for staggering rolling-window caps. That determinism helps stable cache routing.

2. Raise session affinity TTL from `1h` to `4h`.
   The cache key includes model and session. A one-hour TTL is adequate for short sessions but weak for 921M-token daily harness waves. Longer TTL prevents a still-active thread from rebinding to a different Claude account mid-wave.

3. Preserve stable client session IDs.
   CLIProxyAPI extracts session IDs from headers/metadata and message-derived fallbacks per `internal/config/config.go:232-237+ed1458aa`. Harness should send a durable `X-Session-ID` or client-native session ID per logical thread. Avoid random per-request IDs.

4. Avoid client-side cache-control overproduction.
   If the client sends any tool/system/message cache controls, CLIProxyAPI often leaves that category alone. For 96%+, either let CLIProxyAPI inject, or ensure client-injected breakpoints match the same last-tool/last-system/second-to-last-user pattern.

5. Reduce auth-unavailable reselect loops.
   Log lines 655-689 and 701-704 show sticky session rebinding repeatedly before two 429s. Every rebind risks losing provider-side prompt cache locality. The config should lower retry thrash and increase sticky TTL, while harness should stop flooding a hot session after the first unavailable/reselect burst.

6. Segment harness lanes by provider and model.
   Affinity key includes provider and model, so model churn splits cache locality. Keep long Claude waves on one exact model ID where possible.

Expected outcome:

- Current 94.4% cache-read rate is already strong. The remaining gain to 96%+ most likely comes from preventing account churn and session-ID churn, not from adding cache-control blocks.
- The observed problematic pattern is not missing cache injection; it is session-affinity reselect under unavailable auths, especially around the 03:48-03:51 burst.

## 4. Fleet Fanout Matrix

The request calls this an 8-account fleet, but the installed auth directory contains 10 auth files: 7 Claude, 1 Codex Pro, 1 Gemini, 1 Antigravity. Matrix below reflects installed truth while grouping by lane.

| Lane | Auth file | Provider role | Primary traffic | Fanout policy | Cache posture |
|---:|---|---|---|---|---|
| 1 | `claude-739955940fc@gmail.com.json` | Claude OAuth | Claude Sonnet/Opus/Haiku | hot fill-first lane | sticky sessions, high cache reuse |
| 2 | `claude-aesthetic9c@gmail.com.json` | Claude OAuth | Claude Sonnet/Opus/Haiku | failover/hot lane | sticky sessions after reselect |
| 3 | `claude-avantmanifest@gmail.com.json` | Claude OAuth | Claude Sonnet/Opus/Haiku | failover/hot lane | sticky sessions after reselect |
| 4 | `claude-dreamweaverhoudini@gmail.com.json` | Claude OAuth | Claude Sonnet/Opus/Haiku | failover lane | preserve model-specific sessions |
| 5 | `claude-mr.euphoriaincarnate@gmail.com.json` | Claude OAuth | Claude Sonnet/Opus/Haiku | failover lane | preserve model-specific sessions |
| 6 | `claude-nalawowac@gmail.com.json` | Claude OAuth | Claude Sonnet/Opus/Haiku | reserve lane | avoid unnecessary churn |
| 7 | `claude-zfan7@sva.edu.json` | Claude OAuth | Claude Sonnet/Opus/Haiku | reserve lane | avoid unnecessary churn |
| 8 | `codex-zfan7@sva.edu-pro.json` | Codex Pro | GPT/Codex bridge | dedicated model lane | cache independent from Claude |
| 9 | `gemini-739955940fc@gmail.com-gen-lang-client-0557279342.json` | Gemini | Gemini CLI/API | dedicated model lane | cache independent from Claude |
| 10 | `antigravity-739955940fc@gmail.com.json` | Antigravity | Antigravity/Gemini-style | fallback/specialized lane | keep credits fallback disabled for Claude |

Operational matrix view:

| Traffic class | API key | Preferred account set | Failover | Notes |
|---|---|---|---|---|
| Orchestrator | `eee-fleet-key-orchestrator` | Claude lanes 1-3 | Claude lanes 4-7 | Send stable session ID per wave/thread. |
| Research | `eee-fleet-key-research` | Claude lanes 1-7 | Gemini if model-routed | Avoid changing exact Claude model ID mid-thread. |
| Codex bridge | `eee-fleet-key-codex-bridge` | Codex Pro lane 8 | none or Claude translation only if intentional | Enable `ws-auth` if WS path is active. |
| Eval | `eee-fleet-key-eval` | isolated by model/provider | reserve lanes | Good place for lower concurrency or synthetic probes. |

## 5. 429 Cooldown Patterns From Logs

Requested last-200-line tail:

- No 429s are present in the last 200 lines.
- Tail is dominated by management polling every ~30s: `/v0/management/auth-files`, `/gemini-api-key`, `/claude-api-key`, `/codex-api-key`, `/vertex-api-key`, `/openai-compatibility`.
- One `/health` request returned 404 at 12:25:29; use `/healthz`.
- Tail contains one session-affinity miss followed immediately by unavailable reselect at lines 1912-1913, then a 200 at line 1914.

Full `main.log` pattern, included for context:

- Two 429 responses appear:
  - line 689: `2026-05-08 03:50:19`, request `af6e2d64`, `429`, POST `/v1/messages?beta=true`, 837ms.
  - line 704: `2026-05-08 03:51:36`, request `c79b869d`, `429`, POST `/v1/messages?beta=true`, 850ms.
- Both are preceded by multiple `session-affinity: cache hit but auth unavailable, reselected` events on the same truncated `claude:e...` session for `claude-sonnet-4-6`.
- Lines 655-671 show a burst of reselects across `claude-739955940fc`, `claude-aesthetic9c`, `claude-avantmanifest`, and `claude-dreamweaverhoudini`.
- Lines 676-680 repeat the pattern before the first 429 at line 689.
- Lines 701-704 repeat the pattern before the second 429 at line 704.

Cooldown source facts:

- `sdk/cliproxy/auth/selector.go:101-113+ed1458aa` maps model cooldown to HTTP 429 and emits `Retry-After`.
- `sdk/cliproxy/auth/scheduler.go:430-461+ed1458aa` returns model cooldown only when all known candidates are cooling and computes reset from the earliest recovery.
- `internal/config/config.go:687-689+ed1458aa` clamps negative `max-retry-credentials` to 0, so current positive values are honored.

Interpretation:

- The 429s are not random isolated failures. They follow sticky-session auth unavailability and rapid reselects.
- Current `request-retry: 5` likely amplifies these bursts under high concurrency.
- Longer affinity TTL helps steady-state cache locality, but unavailable-auth reselects still happen by design. Harness should treat first 429 or repeated reselect burst as a lane backpressure signal.

## 6. Harness-Fit Notes

- Use absolute proxy URL `http://127.0.0.1:8317`.
- Health probe should call `/healthz`, not `/health`.
- Send stable `X-Session-ID` per logical conversation/wave. Do not generate a new session ID per request.
- Keep exact model IDs stable inside each harness thread; affinity key includes model.
- Prefer long-lived Claude lanes for multi-turn work and avoid opportunistic model/provider fallback inside a single logical thread.
- Keep Antigravity credit fallback disabled unless the runbook explicitly wants paid/credit last-resort behavior.
- Disable control panel during benchmark/harness runs to reduce log noise and management polling.
- Record runtime commit from startup banner in every harness artifact. Current runtime is `785b00c3`; current source checkout is `ed1458aa...`, so cite both until reconciled.
- If Codex WS is in the harness, set `ws-auth: true`; otherwise the current off setting is acceptable but the config comment should stop claiming "Codex WS preference."
- If Gemini native CLI endpoint is in scope, set `enable-gemini-cli-endpoint: true`; otherwise keep off and route only explicit Gemini/OpenAI-compatible paths.

## Verdict

VERDICT: ADOPT-NOW

Adopt with the conservative diff above before the next 921M-token-class wave. The installed config is mostly sound, but the 96%+ cache-read push needs longer sticky routing, less retry thrash, absolute auth-dir hygiene, and quieter management polling. Do not import anything from the missing sibling config.
