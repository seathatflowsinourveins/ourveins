## ARTIFACT-INLINE: Z:/claude-sota-installed/tmp/wave83-account-rotation-deepdive-agentC-2026-05-08.md

verdict_origin: Codex/GPT-5.5 deep-dive, local primary-source clones + local eee state, 2026-05-08.
verdict: PASS_WITH_PRESCRIPTION.
scope: ACCOUNT ROTATION strategies beyond CLIProxyAPI fill-first/round-robin + cooldown; 10-account eee fleet; 3-6 parallel agents.

Pinned source SHAs:
- LiteLLM `Z:/repos/deps/litellm` @ `934ecdca78daf7ec9514efd47df77bf7495c822d`.
- Portkey gateway `Z:/repos/deps/portkey-gateway` @ `351692fd9236af222168134b416924fae0bdba23`.
- Helicone `Z:/repos/deps/helicone` @ `3f4bd44b85f9837feb4a696cce4bba6c99fbdc7e`.
- ccusage `Z:/repos/deps/ccusage` @ `1a4bd69b9214ff55f3745d4d864108d662e4dea0`.
- CLIProxyAPI local working HEAD shown by `git rev-parse HEAD`: `ed1458aa6d3430ba59538aeb980b8934f0e80c1f`; eee docs also cite deployed v6.10.9/origin-main `785b00c3127eea6aa207f1207ead8a2aa93690a3` in `docs/eee-launch-design-cliproxyapi.md:14`.

## Sec1 LiteLLM Matrix

| Strategy | Primary code cite | Mechanics | 10-account token/quota efficiency vs fill-first | Score |
|---|---:|---|---|---:|
| `usage-based-routing-v2` | `litellm/router.py:856-864`, `:9659-9669`; `litellm/router_strategy/lowest_tpm_rpm_v2.py:28-43`, `:60-118`, `:565-613` @ `934ecdc` | Tracks per-deployment TPM/RPM keys per minute, pre-call RPM enforcement, batch reads cache/Redis, chooses lowest TPM/RPM available. | Best fit if each account is modeled as a deployment with `rpm`/`tpm`. Prevents top-account burn, smooths quota, and can reject before upstream 429. Needs correct per-account limits and shared cache for multi-process. | 9 |
| `usage-based-routing` | `litellm/router.py:846-854`, `:10072-10075`; `litellm/router_strategy/lowest_tpm_rpm.py:176-248` @ `934ecdc` | Older lowest-TPM/RPM picker using model-group maps. Filters over TPM/RPM limits and picks lower current TPM. | Good in one process, weaker than v2 for fleet concurrency because v2 is explicitly updated for cross-instance/batch/increment behavior. | 8 |
| `simple-shuffle` | `litellm/router.py:9695-9700`; `litellm/router_strategy/simple_shuffle.py:21-64` @ `934ecdc` | Random pick; if `weight`, `rpm`, or `tpm` is present, performs weighted random choice. | Better than fill-first for avoiding 18/19 concentration. With weights matching plan tiers, good enough and cheap. It does not learn remaining quota unless weights are externally rewritten. | 6 |
| `latency-based-routing` | `litellm/router.py:866-874`, `:9683-9694`; `litellm/router_strategy/lowest_latency.py:1-2`, `:262-403`, `:416-450` @ `934ecdc` | Logs latency/time-to-first-token plus TPM/RPM, then selects low-latency deployment. | Optimizes speed, not account quota preservation. Can amplify load on the fastest account unless paired with limits. | 4 |
| `cost-based-routing` | `litellm/router.py:876-884`, `:9671-9681`; `litellm/router_strategy/lowest_cost.py:193-203`, `:250-330` @ `934ecdc` | Filters by TPM/RPM, computes per-token cost from model metadata or overrides, picks cheapest. | For 10 same-provider Claude accounts, account cost is effectively equal, so it does not solve fleet starvation. Useful only for heterogeneous provider fallback. | 3 |

LiteLLM answer: `usage-based-routing-v2` is the only strategy that is structurally beyond fill-first for this fleet. It improves token/quota efficiency by spreading load to the lowest-used deployment while enforcing declared RPM/TPM before upstream. `simple-shuffle` is the pragmatic fallback if eee cannot expose account-level limits into LiteLLM. `latency` and `cost` are secondary objectives, not quota-defense strategies.

## Sec2 Portkey Matrix

HONEST-NON-FINDING: requested paths `src/handlers/services/strategyService.ts` and `src/middlewares/loadBalancer/` were not present in Portkey gateway HEAD `351692f`. Actual strategy code lives in schema/types and `src/handlers/handlerUtils.ts`.

| Strategy | Primary code cite | Mechanics | Auto usage-telemetry weight adjustment? | Score |
|---|---:|---|---|---:|
| Strategy schema | `src/middlewares/requestValidator/schema/config.ts:14-28`, `:77-79` @ `351692f`; `src/types/requestBody.ts:22-31`, `:45-53` | Allows `single`, `loadbalance`, `fallback`, `conditional`; target has optional static `weight`. | No evidence in OSS HEAD. | 5 |
| `loadbalance` weighted | `src/handlers/handlerUtils.ts:693-723` @ `351692f`; helper at `:195-230` | Defaults missing `weight` to `1`, sums weights, uses `Math.random() * totalWeight`, selects bucket. | No. Static random weighted selection only. No observed closed-loop decrement on 429, latency, cost, or usage. | 5 |
| `fallback` | `src/handlers/handlerUtils.ts:663-691`; schema `config.ts:28` | Ordered attempts; optional `onStatusCodes`; breaks when response ok or status not in fallback codes. | No telemetry adjustment; deterministic ordered chain. | 7 for failover, 3 for quota balance |
| `conditional` | `src/handlers/handlerUtils.ts:725-760`; `src/services/conditionalRouter.ts:32-62`, `:64-155` | Rule-based routing over metadata, params, and URL using operators like `$eq`, `$gt`, `$in`, `$regex`. | No telemetry adjustment. Useful for explicit routing lanes: agent class, model, account tier, user, cost class. | 6 |
| Built-in circuit-breaker hint | `src/handlers/handlerUtils.ts:646-658`, `:792-793` @ `351692f` | If inherited config has an id, filters targets where `isOpen` is true before strategy selection. | There is circuit-breaker plumbing, but no confirmed auto-weight learning from usage telemetry in this source slice. | 6 |

Portkey answer: Portkey OSS HEAD has weighted loadbalance, fallback, conditional routing, and some circuit-breaker plumbing. I did not find weighted auto-adjustment based on usage telemetry. If you need adaptive weights, treat Portkey as a static policy executor and feed it externally computed weights.

## Sec3 Starvation Patterns

| Pattern | Primary cite | What it gives eee when all 10 accounts 429 | Caveat | Score |
|---|---:|---|---|---:|
| Existing CLIProxyAPI cooldown | `sdk/cliproxy/auth/selector.go:200-227`, `:392-415`; `sdk/cliproxy/auth/conductor.go:2134-2156`, `:2258-2309`, `:2560-2583`, `:2592-2607`; config `config.example.yaml:94`, `:107-109` @ local `ed1458a`/deployed cite `785b00c` | Per-account/model `NextRetryAfter`, quota state, exponential quota cooldown, and switch-project behavior. If all accounts cool, selector returns 429 with Retry-After based on earliest/longest availability. | Reactive. It protects after 429, not before. | 8 |
| Predictive backoff via Helicone telemetry/rate headers | `docs/gateway/overview.mdx:21-33`; `docs/features/advanced-usage/custom-rate-limits.mdx:10-19`, `:23-47`, `:51-70`, `:226-236`; `docs/gateway/provider-routing.mdx:51-59`, `:129-135` @ `3f4bd44` | Put a policy above the fleet: throttle before upstream 429 using remaining quota headers and observed usage/cost/error metrics. When remaining falls below threshold, shrink agent concurrency and delay new dispatch. | Helicone controls Helicone policy quotas; it does not know Anthropic OAuth hidden quota unless you map eee telemetry into policy/headers. | 7 |
| Circuit breaker | Portkey OSS circuit hint `handlerUtils.ts:646-658`, `:792-793` @ `351692f`; Hystrix-style pattern by inference: open breaker on rolling failures, sleep window, half-open probe | When all accounts 429/529, open a global `claude_fleet` breaker and stop launching new agents. Let one canary probe after sleep; if success, half-open to limited concurrency. | Need implement in eee/keeper; do not rely on provider cooldown alone. | 9 |
| Quota-aware throttling from ccusage | `ccusage README.md:24-34`, `:91-96`, `:117`; `apps/ccusage/src/data-loader.ts:543-547`, `:756-804`, `:1350-1451`; `apps/ccusage/src/commands/blocks.ts:120-178`, `:227-284`; Codex support `apps/codex/README.md:52-82` @ `1a4bd69` | ccusage can report Claude Code daily/session/block JSONL usage and active 5-hour blocks. Use it as a host-side demand signal: if current block burn rate exceeds budget, reduce CADP fan-out and prefer lower-cost/provider lanes. | HONEST-NON-FINDING: ccusage itself is JSONL-based, not SQLite-based. eee can persist derived ccusage snapshots into local SQLite keeper, but that SQLite layer is eee-owned, not ccusage-native. | 6 |
| Provider failover: Gemini/Codex | CLIProxyAPI config `config.example.yaml:131-134`; Gemini executor `internal/runtime/executor/gemini_executor.go:197-198`, `:296-300`; Codex executor `internal/runtime/executor/codex_executor.go:826-839`, WebSocket retry parsing `codex_websockets_executor.go:1032-1050`; docs `docs/eee-launch-design-cliproxyapi.md:383`, `:824-846` | If Claude fleet is fully starved, route non-Claude-critical work to Gemini or Codex. Keep task-class rules: review/synthesis can often fail over; Claude-specific tool/agent runs may not. | Quality/behavior changes. Must tag outputs as fallback-provider and avoid mixing cache/session lanes. | 8 |

All-10-accounts-429 action sequence:
1. Open global fleet breaker immediately; stop new agent spawns for Claude lane.
2. Preserve existing in-flight streams; do not retry them aggressively if byte 1 has passed.
3. Sleep until max observed Retry-After plus jitter, or a configured 60/120/300s exponential ladder when Retry-After is absent.
4. Half-open with one canary request on the least-recently-used/highest-remaining account.
5. Resume at reduced CADP concurrency: 1, then 2, then 3-6 only after success streak.
6. Spill eligible work to Codex/Gemini with explicit provider-fallback marking.

## Sec4 PRESCRIPTION

Recommended architecture beyond fill-first:

1. Keep CLIProxyAPI cooldown enabled. Do not set `disable-cooling: true` except emergency, because all-account 429 otherwise loops.
2. Add an eee fleet governor above CLIProxyAPI:
   - Maintain per-account counters: last success, last 429, Retry-After, rolling requests, rolling estimated tokens, active sessions, provider.
   - Compute `capacity_score = tier_weight * freshness * not_cooling * burn_headroom`.
   - Dispatch only when fleet breaker is closed and `sum(capacity_score)` exceeds a threshold.
3. Replace strict fill-first for high-fan-out agent waves with one of:
   - Best: LiteLLM-style `usage-based-routing-v2` semantics in eee/CLIProxyAPI: pick lowest rolling TPM/RPM within current priority tier.
   - Simpler: weighted random by priority/headroom, with session-affinity for continuing sessions.
4. Split routing lanes:
   - `interactive/session-affinity`: preserve cache and conversation continuity.
   - `parallel-agent-bulk`: usage-weighted spread; no 18/19 concentration.
   - `review/fallback-ok`: Codex/Gemini failover allowed.
   - `Claude-only`: no provider fallback.
5. Add global breaker states:
   - CLOSED: normal.
   - SOFT_LIMIT: remaining headroom low; cap agents to 1-2 and delay nonurgent.
   - OPEN: all accounts 429/529 or rolling error threshold exceeded; return/hold with Retry-After.
   - HALF_OPEN: one canary only; no wave dispatch.
6. Feed observability:
   - Helicone or eee logs for request/error/cost/latency.
   - ccusage JSONL-derived block burn rate for demand shaping.
   - CLIProxyAPI management auth state for actual cooldown and quota state.

Concrete eee policy:
- For CADP 3-6 parallel agents, require at least `N+2` non-cooling Claude accounts in the target model lane.
- If available accounts < active agents, queue new agents instead of letting retries collapse into 429.
- If any priority-30 account exceeds 50% of requests in a 10-minute window during multi-agent mode, force weighted spread within the same priority tier.
- If all priority-30 cool, drop to priority-20; if all Claude cool, open breaker and offer Codex/Gemini fallback only for eligible task classes.

## Sec5 18/19 Concentration Honest Assessment

The 18/19 top-priority-account concentration is expected under fill-first + session-affinity, but it is not healthy for 3-6 parallel-agent waves.

Why it happened:
- Fill-first is designed to exhaust the highest-priority usable account before moving down.
- Session-affinity for 1h reinforces concentration once a session binds.
- With 7 Claude tier priorities `30/30/20/20/20/10/10`, top-tier accounts are preferred by design.
- Cooldown at `conductor.go` only reacts after upstream says no.

When it is good:
- Single interactive session where cache/session locality matters.
- Deliberate quota-staggering when you want a clear active/recovery account boundary.

When it is bad:
- Parallel agents generating independent work.
- Long-context requests that can burn a tier account rapidly.
- Any workload where 429 on one account causes synchronized retries or follow-on agent failures.

Verdict on concentration: acceptable as a deliberate default for interactive cache affinity, but not acceptable as the only policy for bulk multi-agent dispatch. The missing layer is not another cooldown; it is pre-429 admission control plus usage-weighted spreading for parallel waves.

