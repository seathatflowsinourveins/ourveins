

## 2026-05-08 Wave 97 — Ship 1J: CLIProxyAPI strategy `fill-first` → `round-robin` (FM-17.b.i 429 root-cause closure)

### Origin

User explicit Wave 97 mandate: "avoid API Error: Server is temporarily limiting requests (not your usage limit) · Rate limited, investigiate the limit and offload ours within limits form our advanced accounts rotation".

### FM-17.b.i fire that motivated this ship

Wave 97 fan-2 Agent fan2-C 429'd at <12s / 1 tool_use / 2 tokens with `API Error: Server is temporarily limiting requests` — wrapper-funneling PRE-FIRE class per `Z:/claude-sota/.claude/rules/fm17-subagent-fleet-depletion.md §FM-17.b.i`. Pivoted to orchestrator-direct investigation per `cross-model-consensus.md §Orchestrator-direct fallback constraints`.

### Root cause identified (orchestrator-direct investigation)

Pool starvation under `fill-first` strategy + 4/7 Claude accounts disabled by Ship 1X cycle-aware rotation:
- `Z:/claude-sota-installed/.cli-proxy-api/config.yaml:70` had `strategy: "fill-first"` (Wave 86 Ship 1Q decision)
- 4 disabled (739955940fc + avantmanifest + dreamweaverhoudini + zfan7@sva.edu — all 7d-capped)
- 3 active: aesthetic9c (P30) + mr.euphoriaincarnate (P20) + nalawowac (P10) — UNEQUAL priorities
- Live poller cycle 2026-05-08T20:39:13Z showed 2/3 active accounts hitting 429 (nalawowac + zfan7 polling)
- fill-first burns the highest-priority account first → burst load (3 parallel agents) all hit P30 (aesthetic9c) until burned → 429 cascades

### Cross-model T1 gate (real GPT-5.5 e2e via codex CLI foreground+tee)

| Round | Verdict | Confidence | Outcome |
|---|---|---|---|
| Round-1 | NEEDS-REVISION | 0.88 | Caught Mia OVER #7: round-robin operates WITHIN priority-bucket FIRST; 3-account burst-distribution claim was FALSE under unequal priorities |
| Round-2 | APPROVE | 0.94 | Pattern A success — all 4 prescribed_edits applied; explicit priority-bucket documentation; deferred-equalization-ship noted |

Verdict files:
- `.claude/state/codex_consult_wave97_ship1j_strategy_flip_OUT.txt` (R1 — 64,356 tokens; codex web-fetched + source-code verified selector.go priority-bucket behavior)
- `.claude/state/codex_consult_wave97_ship1j_round2_OUT.txt` (R2 — 19,411 tokens)

### 4 prescribed_edits applied (Pattern A single atomic apply)

| # | Round-1 finding | Pattern A apply |
|---|---|---|
| F1 | Keep routing.strategy=round-robin + session-affinity=true + 4h TTL | Verified — strategy="round-robin" + session-affinity:true + session-affinity-ttl:"4h" |
| F2 | Equalize active priorities OR document standby-overflow semantic | Took DOCUMENTATION path (priority is operator semantic; equalization deferred to separate ship) — comment block explicitly states "round-robin operates WITHIN highest-priority bucket FIRST" with priority enumeration |
| F3 | Keep disable-cooling=false; do NOT retune session-affinity-ttl | disable-cooling unchanged; ttl 4h preserved |
| F4 | Update note re: priority-bucket behavior | Comment cites `selector.go:26+283 + README:51 + config.example.yaml:114` for round-robin priority-bucket semantic |

### Edit (single file: `.cli-proxy-api/config.yaml` — gitignored runtime state)

```diff
-routing:
-  strategy: "fill-first"
+routing:
+  strategy: "round-robin"
   session-affinity: true
   session-affinity-ttl: "4h"
```

Plus comment block replacement (Wave 86 Ship 1Q comment REPLACED with Wave 97 Ship 1J comment per `port-note-discipline.md §6` forward-only — Wave 86 rationale preserved in Wave 86 Ship 1Q commit body `824523f` history, NOT rewritten).

### Operator-action REQUIRED

CLIProxyAPI restart needed to pick up new strategy. Per `Z:/repos/deps/CLIProxyAPI/internal/api/modules/amp/amp.go:OnConfigUpdated`, hot-reload is documented for: `model-mappings`, `upstream-api-key`, `upstream-url`, `restrict-management-to-localhost`. **`routing.strategy` is NOT in hot-reload list** → restart required.

Operator restart paths:
1. **Next `eee` launch** picks up new config naturally (eee.ps1 manages CLIProxyAPI lifecycle)
2. **Manual restart**: kill cli-proxy-api.exe + relaunch via eee or directly

### TIER-1 SOTA cite chain

- **TIER-1-DIRECT**: `Z:/repos/deps/CLIProxyAPI/sdk/cliproxy/auth/selector.go:26 @ HEAD 785b00c3` (RoundRobinSelector definition)
- **TIER-1-DIRECT**: `Z:/repos/deps/CLIProxyAPI/sdk/cliproxy/auth/selector.go:283 @ HEAD 785b00c3` ("Two-level round-robin: first select a credential group, then pick within it")
- **TIER-1-DIRECT**: `Z:/repos/deps/CLIProxyAPI/README.md:51 @ HEAD 785b00c3` ("Multiple accounts with round-robin load balancing")
- **TIER-1-DIRECT**: `Z:/claude-sota-installed/.cli-proxy-api/config.example.yaml:112-114` ("strategy: round-robin (default), fill-first")
- **TIER-1-DIRECT**: `Z:/repos/deps/CLIProxyAPI/sdk/cliproxy/auth/selector.go:498-535` (session-affinity preserves cache-locality independent of strategy)
- **TIER-1-DIRECT**: `Z:/repos/deps/CLIProxyAPI/internal/api/modules/amp/amp.go:OnConfigUpdated` (hot-reload list — strategy NOT included)
- **TIER-3 evidence**: 2 codex T1 verdict files

### Mia pre-apply (3/3 PASS)

1. Current strategy verified `fill-first` at config.yaml:70 (live read)
2. Round-robin native in upstream (selector.go:26 + README:51)
3. Live priority probe confirmed unequal P30/P20/P10 — Round-1 caught overconfidence; R2 documented correctly

### LAUNCH-DISCIPLINE D1

✅ **REVERSIBLE**: 1-line revert in `.cli-proxy-api/config.yaml` + CLIProxyAPI restart
✅ **OBSERVABLE**: Aperant poller JSONL telemetry at `.claude/state/aperant_poller.jsonl` will show 429 frequency change post-restart
✅ **INCREMENTAL**: 1-line strategy flip; orthogonal to existing session-affinity tuning

### CR-9 install-risk LOW

- Config-only edit; no destructive operations
- Reversible via 1-line revert
- CLIProxyAPI restart timing operator-controlled (not auto-applied)
- Round-robin IS upstream default (NOT custom; NOT deprecated)
- session-affinity:true preserves cnighswonger v3.5.3 cache-prefix benefit independent of strategy

### Cardinal-rule compliance

- **CR-1**: TIER-1-DIRECT cite chain at file:line + HEAD SHA
- **CR-3**: real GPT-5.5 codex T1 e2e BEFORE commit (R1 NEEDS-REV → R2 APPROVE Pattern A)
- **CR-5**: install-priority — round-robin IS upstream-canonical
- **CR-6**: official-native-channel — config.yaml syntax matches upstream config.example.yaml
- **CR-7**: Phase 1 — config edit doesn't change permission scope
- **CR-8**: ADAPTED-FROM-SOTA — round-robin is upstream default + native implementation
- **CR-9**: install-risk LOW (see above)
- **CR-10**: research-first — Mia probed pool state + selector.go source + README + config.example BEFORE proposing edit; Round-1 caught Mia OVER #7 (priority-bucket behavior)
- **CR-11**: META-process SOTA — Wave 97 fan-2 dispatched + root-cause + GPT-5.5 e2e R1+R2 + Pattern A + provenance + atomic commit per cycle-300

### Operational impact (post CLIProxyAPI restart)

| Layer | Pre-Wave-97-Ship-1J | Post-Wave-97-Ship-1J + restart |
|---|---|---|
| Burst-load distribution (3 parallel agents) | All hit aesthetic9c (P30) until 429 cascade | Within P30 bucket: round-robin ties → currently P30=1 account so still single until P20 fallback |
| Active-account 5h-budget consumption | aesthetic9c burned 1st, mr.euphoriaincarnate 2nd, nalawowac 3rd (sequential) | aesthetic9c primary; mr.euphoriaincarnate fallback; nalawowac last-resort (effectively fill-first within priority tiers — NO change for current unequal-priorities state) |
| Post-7d-reset rebalance | fill-first delays use of newly-available accounts | round-robin immediately rebalances (no burn-first delay) |
| cnighswonger cache-prefix preservation | UNCHANGED — session-affinity:true preserves cache locality | UNCHANGED |

### Honest limitation (per Round-1 catch documented in Round-2 APPROVE)

**Ship 1J does NOT fully solve burst-load 429 fires under current unequal-priorities pool**. The flip enables round-robin within priority-tiers, but with current P30/P20/P10 split + 1 active account per tier, behavior approximates fill-first. **For TRUE 3-account burst-distribution, operator must equalize active accounts to same priority tier (Wave 98 candidate ship)**.

What Ship 1J DOES fix:
- Post-7d-reset auto-rebalance (no fill-first burn-first delay)
- When priorities ARE equal (operator decision), burst-distribution kicks in
- Aligned with upstream default (CLIProxyAPI README:51)

### Next ship in queue

**Ship 1J-followup (operator-decision)**: equalize active Claude accounts to same priority tier (e.g., all 3 active to P30) for TRUE round-robin burst-distribution. This is operator semantic — priorities likely reflect plan-tier or account-quality semantics. Surface to operator.

### Sister-rule integration

- `cross-model-consensus.md` T1: real GPT-5.5 e2e BEFORE commit; R1 NEEDS-REV → R2 APPROVE Pattern A
- `codex-t1-fix-forward-pattern.md §Pattern A`: 4 prescribed_edits applied in single atomic apply
- `closed-loop-recursive-narrowing.md`: Pattern A success shape (different-concern verification, R1 vs R2)
- `port-note-discipline.md §6`: Wave 86 Ship 1Q comment block REPLACED forward-only; Wave 86 commit body `824523f` history NOT rewritten
- `mia-pre-apply.md`: Mia OVER #7 caught by codex T1 R1 (priority-bucket behavior was missed in initial design)
- `fm17-subagent-fleet-depletion.md §FM-17.b.i`: this ship addresses the root cause of FM-17.b.i wrapper-funneling PRE-FIRE 429 fires

### Wave 97 Ship 1J — 14th ship in this session arc

| Wave | Commit | Ship |
|---|---|---|
| 86 | `824523f` | 1Q — CLIProxyAPI 4h session-affinity (now SUPERSEDED by Ship 1J on strategy axis) |
| 89-96 | (8 ships) | (per prior provenance entries) |
| 97-1A | `3c00615` | 1A — claude-md-management plugin enable |
| 97-1B | `a1f19f0` | 1B — gitleaks v8.30.1 install |
| 97-1G | `58be220` | 1G — CLAUDE_CODE_EFFORT_LEVEL=xhigh env-precedence pin |
| 97-1C+1D | `0110a9f` | 1C+1D — gitleaks PreToolUse hook + .gitleaks.toml |
| **97-1J** | **THIS** | **1J — CLIProxyAPI strategy fill-first → round-robin (FM-17.b.i root-cause closure)** |

### Update triggers

Re-evaluate when:
- Active Claude accounts re-equalized to same priority (would unlock TRUE round-robin burst-distribution; remove "no change for unequal-priorities state" caveat)
- 7d resets complete (2026-05-09 03:00Z first; would re-test rebalance behavior)
- CLIProxyAPI ships hot-reload for routing.strategy (would remove restart requirement)
- A 2nd FM-17.b.i fire occurs post-restart with round-robin active (would invalidate the fix and require deeper investigation)
- Operator decides to equalize priorities — Ship 1J-followup
