# Wave 82 Agent B — CPA-Manager + capacity_score refresh + CLIProxyAPI auto-disable (codex-rescue BRIDGE-MODE)

**Origin**: 3-agent SOTA team dispatch 2026-05-08 11:00
**Agent**: codex:codex-rescue BRIDGE-MODE → real GPT-5.5 (no STAND-IN-NOTICE in return; cross-model gate satisfied)
**Tool count**: 4 / Duration: 271s

## §1 CPA-Manager unhealthy-account-discovery (seakee/CPA-Manager@4dd704b v1.1.7)
- Unhealthy classification = accounts failed probe/auth + unusable subscription/quota state + disabled/broken auth metadata — NOT based on persisted `capacity_score` field
- One-click cleanup = **DESTRUCTIVE auth-file deletion** via CPA management API (not temporary disable, not quota refresh)
- Cites: README.md@4dd704b:L502-L527

## §2 capacity_score refresh primitive — HONEST-NON-FINDING
- **NO ecosystem tool writes capacity_score back to auth files**
- CPA-Manager displays quota in UI + deletes bad auth files but does NOT mutate auth-file capacity
- CLIProxyAPI's auth model has `Quota`/`Status`/`Unavailable`/`ModelStates` — `capacity_score` is OPERATOR-MAINTAINED legacy snapshot, NOT a runtime metric
- Cite: sdk/cliproxy/auth/conductor.go@785b00c:L471-L513

## §3 CLIProxyAPI auto-disable mechanism (router-for-me/CLIProxyAPI@785b00c v6.10.9)
- 429 responses → COOLDOWN MACHINERY (retry-after), NOT permanent disable
- `disabled` field = intentional operator disable only
- `disable-cooling: false` (current eee config) = **CORRECT** for multi-account pools — prevents hammering exhausted accounts
- Cites: sdk/cliproxy/auth/conductor.go@785b00c:L2388-L2415, config.example.yaml@785b00c:L85-L88

## §4 PRESCRIPTION
1. Run CPA-Manager full Docker mode (`seakee/cpa-manager:latest` on port 18317) for quota/usage visibility (alongside Ship 1B+1C cpa-usage-keeper)
2. Use CPA v6.10.8+ for Usage Service HTTP queue consumption
3. Keep `disable-cooling: false` (already correct)
4. **Do NOT build automation around capacity_score** — ecosystem doesn't reliably refresh it; design-novel sidecar cache would be needed
5. CPA-Manager one-click cleanup appropriate ONLY for broken/unusable Codex accounts, NOT for cooling-down accounts

## §5 ORCHESTRATOR REFRAME of Wave 80 P3 framing
- My Wave 80 P3 "depleted-but-active 429-hammered" concern is OVER (refuted)
- My iter-1 finding "mr.euphoriaincarnate@gmail.com cap=0 = depleted-but-active bug" misclassified the field — capacity_score is operator-maintained snapshot, not runtime metric
- Real fleet-starvation defense: cooldown machinery already in place (disable-cooling: false → cooldown active)
- Wave 80 P3 cache-affinity-routing-lease primitive is STILL the real architectural gap (Agent C in flight on this)

## HANDOFF
verdict_one_line: DONE — capacity_score automation REJECTED; CPA-Manager Docker install candidate (Ship 1E next-fire); cooldown machinery verified working as-configured.
