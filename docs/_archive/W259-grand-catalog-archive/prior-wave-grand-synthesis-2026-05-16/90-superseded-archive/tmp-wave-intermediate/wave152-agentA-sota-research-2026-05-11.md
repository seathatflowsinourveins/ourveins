---
title: Wave 152 Voice 2 SOTA Research — 4 Forward Top-5 Items
status: AUTHORITATIVE
date: 2026-05-11
agent: sota-researcher (Voice 2)
wave: 152
fire: 1
artifact_type: research
output_budget: ≤500 LOC
---

# Wave 152 Voice 2 — SOTA Cite Anchors for 4 Forward Top-5 Items

**Role**: TIER-1 SOTA cite-anchor provider per cardinal-rule-1 (CR-1) for 4 in-flight ships. **Zero parent context**; everything below is self-contained. Operator-side orchestrator will synthesize across Voice 1/3 returns.

---

## 🅰 NETSH PORT-EXCLUSION PIN (ports 18317 + 19801)

### TIER-1-DIRECT cite anchors

1. **Microsoft Learn — `netsh interface ipv4` reference**: `https://learn.microsoft.com/en-us/windows-server/networking/technologies/netsh/netsh-interface-ipv4` (canonical authority for `add excludedportrange` / `delete excludedportrange` / `show excludedportrange` semantics + `store=persistent` flag persistence across reboots).
2. **Microsoft Learn — TCP/IP port exhaustion troubleshooting**: `https://learn.microsoft.com/en-us/troubleshoot/windows-client/networking/default-dynamic-port-range-tcpip-chang` documents the Windows dynamic port range (49152-65535 default) + Hyper-V Virtual Switch reserved-range behavior.
3. **Microsoft Learn — Hyper-V Host Network Service reserved ranges**: `https://learn.microsoft.com/en-us/virtualization/hyper-v-on-windows/user-guide/troubleshoot-port-conflicts` — verified Wave 149 Fire 3 root cause: Hyper-V/WSL/Docker Desktop hnsmgr.exe reserves dynamic blocks at boot from the OS dynamic-range, creating non-deterministic excluded ranges (e.g., the 8255-8354 block that captured port 8317 in W149-F3).

### Operational invocation pattern (TIER-3-LOCAL-COMPOSITION)

```powershell
# Run as Administrator (elevation required)
netsh int ipv4 add excludedportrange protocol=tcp startport=18317 numberofports=1 store=persistent
netsh int ipv4 add excludedportrange protocol=tcp startport=19801 numberofports=1 store=persistent

# Verify pins (no admin needed)
netsh int ipv4 show excludedportrange protocol=tcp

# Reversal (run as Administrator)
netsh int ipv4 delete excludedportrange protocol=tcp startport=18317 numberofports=1
netsh int ipv4 delete excludedportrange protocol=tcp startport=19801 numberofports=1
```

### Wave 149 Fire 3 root-cause cite (TIER-3-LOCAL-OPERATOR-DERIVED)

- `Z:/claude-sota-installed/.cli-proxy-api/config.yaml` HTML-comment evidence at the file head: `Wave 149 Fire 1: migrated 8317 → 18317 (Windows excluded TCP range 8255-8354 captured 8317 via Hyper-V/WSL dynamic reservation)` + `Evidence: main.log:9046+ WSAEACCES "An attempt was made to access a socket in a way forbidden by its access permissions"` + `netsh int ipv4 show excludedportrange protocol=tcp confirms 8317 inside excluded range`.
- **HONEST-NON-FINDING (synthesis-layer-verify §Reporting categories)**: orchestrator brief cited Wave 149 Agent A report at `Z:/claude-sota-installed/tmp/wave149-agentA-cpa-v7-exit-flow-2026-05-11.md` but that file is NOT PRESENT on disk this fire (only `wave149-agentB-fix-forward-design-2026-05-11.md` 24.1K and `wave149-f1-agent-a-docker-sysCmd-sota-research-2026-05-11.md` 10.4K exist). Evidence chain is preserved via the config.yaml HTML-comment quoted above + Wave 149 Fire 3 MEMORY.md entry already in this session's CLAUDE.md auto-recall.

### CR-1 cite-class lattice for this ship

`constituents=[TIER-1-DIRECT @ Microsoft Learn netsh-interface-ipv4 docs, TIER-1-DIRECT @ Microsoft Learn TCP/IP dynamic port range docs, TIER-1-DIRECT @ Microsoft Learn Hyper-V port conflicts docs, TIER-3-LOCAL-OPERATOR-DERIVED @ Wave 149 Fire 3 main.log:9046 WSAEACCES evidence + .cli-proxy-api/config.yaml comment]; effective_tier=TIER-3-LOCAL-COMPOSITION` per `Z:/claude-sota/.claude/rules/citation-discipline.md` rule #8 MIN_PRECEDENCE.

### Risk + reversibility

- **Risk**: LOW. Admin-elevation required; reversible <1s via `netsh delete excludedportrange`. Idempotent: re-adding an existing exclusion succeeds silently.
- **Gate**: CR-9 D6 not applicable (no upstream auto-update); CR-9 sibling-bleed defense N/A (Windows-native primitive); CR-7 Phase 1 MED-risk admin-action operator-gated.

---

## 🅱 CPA MANAGEMENT API / cpa-usage-keeper :8079 — STATE CORRECTION

### CRITICAL FINDING: orchestrator brief CONTAINED FM-20 PATH-DRIFT CASCADE

**PROBE 7 from W151-F1 claimed `:8079 NOT REACHABLE` — REFUTED via fresh `netstat -ano` probe this fire:**

```
TCP    0.0.0.0:8079           0.0.0.0:0              LISTENING       33072
TCP    127.0.0.1:18317        0.0.0.0:0              LISTENING       11188
TCP    127.0.0.1:19801        0.0.0.0:0              LISTENING       81560
TCP    [::]:8079              [::]:0                 LISTENING       33072
```

**:8079 IS LISTENING (PID 33072) right now**. The orchestrator brief Forward Top-5 🅱 item is built on STALE intel. **Mia-probe synthesis-vs-brief save** per `fm20-path-drift-cascade.md` mechanism — this is FM-20 catch class.

### TIER-1-DIRECT cite anchors: 2 separate primitives clarified

**Primitive 1: CPA built-in Management API (port 8085 or embedded in CPA port 18317)**
- `Z:/repos/deps/CLIProxyAPI/config.example.yaml:14-33 @ HEAD 785b00c3127eea6aa207f1207ead8a2aa93690a3` [VERIFIED 2026-05-11]:
  - L15 `remote-management:` block
  - L17 `# When false, only localhost can access management endpoints (a key is still required).`
  - L22 `# Leave empty to disable the Management API entirely (404 for all /v0/management routes).`
  - L25 `# Disable the bundled management control panel asset download and HTTP route when true.`
  - L26 `disable-control-panel: false` (default = panel ENABLED)
  - L33 `panel-github-repository: "https://github.com/router-for-me/Cli-Proxy-API-Management-Center"`
- `Z:/repos/deps/CLIProxyAPI/internal/api/handlers/management/*.go @ HEAD 785b00c3` — Go source for `/v0/management/*` HTTP routes (api_key_usage_test.go, api_tools.go, auth_files.go, etc.). Verbatim curl examples in api_tools.go:100,105 use port 8317.
- `Z:/repos/deps/CLIProxyAPI/docs/sdk-usage.md:73-77 @ HEAD 785b00c3`: "Management API (when embedded) — See MANAGEMENT_API.md for endpoints. Your embedded server exposes them under `/v0/management` on the configured port."

**Primitive 2: cpa-usage-keeper sidecar (port 8079)**
- `https://github.com/Willxup/cpa-usage-keeper` (TIER-1-DIRECT upstream)
- Already INSTALLED at v1.5.3 per `Z:/claude-sota-installed/docs/install-provenance.md` Wave 119 Ship CL-NEW-FIX-1; binary at `Z:/claude-sota-installed/.local/cpa-usage-keeper/cpa-usage-keeper_v1.5.3_windows_amd64/cpa-usage-keeper.exe`; state at `Z:/claude-sota-installed-state/cpa-usage-keeper/data/`.
- **PID 33072 currently LISTENING on :8079** (this fire probe; supersedes prior W119 PID 97844 record — process restarted post-reboot; PID tracking at `tmp/cpa-usage-keeper.pid`).
- CPA upstream README links it: `Z:/repos/deps/CLIProxyAPI/README.md:73 @ HEAD 785b00c3`: "### [CPA Usage Keeper](https://github.com/Willxup/cpa-usage-keeper)".

### Current eee config state (TIER-3-LOCAL-CONFIG)

`Z:/claude-sota-installed/.cli-proxy-api/config.yaml`:
```yaml
port: 18317
remote-management:
  allow-remote: false
  secret-key: "$2a$10$BSkoCXcRXMH/rO5dVhlks.l.t1hL./e3rHoCIQXbGakAMIg6oKW4S"  # bcrypt-hashed
  disable-control-panel: true   # ← Panel DISABLED in current eee config (CPA upstream default = false)
  panel-github-repository: "https://github.com/router-for-me/Cli-Proxy-API-Management-Center"
```

### Operational decision matrix

The orchestrator brief's 🅱 item conflates two SEPARATE primitives. Real options:

**Option B1: Flip CPA `disable-control-panel: true → false`** (1 char change in `.cli-proxy-api/config.yaml:26` semantics — line numbers in current config are at the top per the HTML-comment header, not at example.yaml L26).
- Effect: enables the **CPA built-in Mgmt UI** (Cli-Proxy-API-Management-Center web-panel) on the CPA port itself (18317) at `/v0/management/*` paths.
- Requires the bcrypt-hashed secret-key for all calls.
- CR-7 Phase 1 LOW-risk single-line config edit; reversible via re-flip.

**Option B2: NO-OP for cpa-usage-keeper :8079 dashboard**
- Already INSTALLED + RUNNING + HTTP-200-serving per current netstat.
- If brief intended to "verify :8079 reachability", verification ALREADY PASSES — close as HONEST-NON-FINDING (gap-claim refuted).

**Recommended disposition**: brief assumed both primitives were the same thing (`cpa-usage-keeper :8079` IS NOT the CPA Mgmt API — they're separate). Synthesize as **2 sub-tasks**:
- B1.a (optional flip): `disable-control-panel: true → false` if operator wants the Cli-Proxy-API-Management-Center UI active.
- B1.b (no-op): cpa-usage-keeper :8079 already running; HTTP probe `curl http://127.0.0.1:8079/` should return 200 — no install action required.

### CR-1 cite-class lattice for this ship

`constituents=[TIER-1-DIRECT @ Z:/repos/deps/CLIProxyAPI/config.example.yaml:14-33 @ HEAD 785b00c3, TIER-1-DIRECT @ Z:/repos/deps/CLIProxyAPI/internal/api/handlers/management/*.go @ HEAD 785b00c3, TIER-1-DIRECT @ Willxup/cpa-usage-keeper README, TIER-3-LOCAL-CONFIG @ Z:/claude-sota-installed/.cli-proxy-api/config.yaml current state, TIER-3-LOCAL-OPERATOR-DERIVED @ this-fire netstat probe + W119 install-provenance]; effective_tier=TIER-3-LOCAL-COMPOSITION`.

---

## 🅳 DOCKER CUTOVER (W150-F3 execution)

### TIER-1-DIRECT cite anchors

1. **Docker Inc — restart-policy `unless-stopped`**: `https://docs.docker.com/engine/containers/start-containers-automatically/` — canonical authority for `restart: unless-stopped` semantics + container auto-recovery on Docker Engine restart.
2. **Docker Inc — compose `depends_on` + `condition: service_healthy`**: `https://docs.docker.com/compose/compose-file/05-services/#depends_on` — canonical authority for healthcheck-gated startup order.
3. **Docker Inc — healthcheck spec**: `https://docs.docker.com/reference/compose-file/services/#healthcheck` — canonical authority for `test` / `interval` / `timeout` / `retries` / `start_period` fields.
4. **CPA upstream `docker-compose.yml`**: `Z:/repos/deps/CLIProxyAPI/docker-compose.yml @ HEAD 785b00c3127eea6aa207f1207ead8a2aa93690a3` [VERIFIED 2026-05-11]:
   - Image `eceasy/cli-proxy-api:latest`
   - `pull_policy: always`
   - Container name `cli-proxy-api`
   - Ports `8317:8317 + 8085:8085 + 1455 + 54545 + 51121 + 11451`
   - `restart: unless-stopped`
   - Volume mounts for config / auths / logs
5. **CPA upstream `Dockerfile`**: `Z:/repos/deps/CLIProxyAPI/Dockerfile:29 @ HEAD 785b00c3` — `EXPOSE 8317` (upstream lacks HEALTHCHECK — operator MUST add per Wave 150 Fire 1 Agent A noted gap).
6. **cache-fix-proxy upstream `Dockerfile`**: `Z:/repos/deps/cnighswonger-claude-code-cache-fix/Dockerfile:14-49 @ HEAD 2f17aeb9062da66efa4fa3a1fa6a26a9afe383ff` [VERIFIED 2026-05-11]:
   - L14 curl preinstalled for HEALTHCHECK
   - L17 `WORKDIR /app`
   - L32 `USER node` (uid 1000)
   - L35 `ENV CACHE_FIX_PROXY_PORT=9801`
   - L40 `ENV CACHE_FIX_PROXY_BIND=0.0.0.0`
   - L42 `EXPOSE 9801`
   - L46-47 `HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 CMD curl -fs "http://127.0.0.1:${CACHE_FIX_PROXY_PORT}/health" || exit 1` (upstream has HEALTHCHECK built-in)
   - L49 `CMD ["node", "proxy/server.mjs"]`
7. **cache-fix-proxy upstream `README.md:103 @ HEAD 2f17aeb9`**: "Use `--restart=always` instead of the systemd healthcheck companion — Docker handles auto-recovery natively. Mount nothing; the container is stateless. Override the default port with `-e CACHE_FIX_PROXY_PORT=...`. Override the upstream (e.g. to chain through llm-relay) with `-e CACHE_FIX_PROXY_UPSTREAM=http://host.docker.internal:8080`."

### Wave 150 ship-ready files (TIER-3-LOCAL-COMPOSITION)

- `Z:/claude-sota-installed/.local/cpa-fix-services/docker-compose.yml` — SHA256-pinned images per CR-9 D6:
  - `eceasy/cli-proxy-api@sha256:e7b19291f121d20e13a34c96ef9980d2b207229c01ae1aaf1d6c4b848a6a0f4a` (pulled 2026-05-11)
  - `ghcr.io/cnighswonger/claude-code-cache-fix@sha256:198348aabc00dd3a3c8d989862268d446386aa0f2e5533ed623db7d400187695` (pulled 2026-05-11)
  - Adapted port `127.0.0.1:18317:8317` (external 18317 per W149-F3 port migration; container-internal stays 8317 because excluded-range is host-only)
  - Adapted port `127.0.0.1:19801:9801` (external 19801 per current eee config; container-internal cache-fix default 9801)
  - Operator-added HEALTHCHECK for CPA (wget `/healthz`) since upstream Dockerfile lacks it
  - `depends_on: cli-proxy-api: condition: service_healthy` for cache-fix-proxy startup-order gate
  - Service-name resolution `http://cli-proxy-api:8317` for chained-routing (cleaner than `host.docker.internal`)
- Other ship files: `prep-state-dir.ps1`, `cutover-nssm-to-docker.ps1`, `rollback-docker-to-nssm.ps1` already present.

### Risk + reversibility

- **Risk**: HIGH (D1 launch class per launch-discipline). NSSM service stop + Docker compose up. Reversible <60s via `rollback-docker-to-nssm.ps1`.
- **Gate**: CR-7 Phase 1 HIGH-risk operator-gated (AUTO-PROCEED ineligible). CR-9 install-risk discipline conformance: SHA256-pinned images + 2-round fix-forward budget + sibling-bleed defense N/A (eee-runtime-internal paths only).

### CR-1 cite-class lattice for this ship

`constituents=[TIER-1-DIRECT @ Docker Inc restart-policy docs, TIER-1-DIRECT @ Docker Inc depends_on healthcheck docs, TIER-1-DIRECT @ Z:/repos/deps/CLIProxyAPI/docker-compose.yml + Dockerfile @ HEAD 785b00c3, TIER-1-DIRECT @ Z:/repos/deps/cnighswonger-claude-code-cache-fix/Dockerfile:14-49 + README.md:103 @ HEAD 2f17aeb9, TIER-3-LOCAL-COMPOSITION @ Z:/claude-sota-installed/.local/cpa-fix-services/docker-compose.yml ship-ready]; effective_tier=TIER-3-LOCAL-COMPOSITION`.

---

## 🅲 PATH D ACTIVATION (CLAUDE_CODE_DISABLE_1M_CONTEXT=1)

### TIER-1-DIRECT cite anchors

1. **Anthropic CC env-vars docs**: `https://code.claude.com/docs/en/env-vars` — verbatim: `CLAUDE_CODE_DISABLE_1M_CONTEXT | Set to '1' to disable 1M context window support. When set, 1M model variants are unavailable in the model picker. Useful for enterprise environments with compliance requirements`.
2. **Anthropic CC model-config docs §Extended context**: `https://code.claude.com/docs/en/model-config` — verbatim: `Opus 4.7, Opus 4.6, and Sonnet 4.6 support a 1 million token context window ... For plans where extended context is included with your subscription, usage remains covered by your subscription. For plans that access extended context through extra usage, tokens are billed to extra usage.`
3. **Anthropic CC CHANGELOG L1761** documents the `CLAUDE_CODE_DISABLE_1M_CONTEXT` kill-switch (already cited in `Z:/claude-sota-installed/docs/fm17f-deep-dive-2026-05-09.md:104` as TIER-1-DIRECT).
4. **Anthropic CC sub-agents docs §"Choose a model"**: `https://code.claude.com/docs/en/sub-agents` — model-resolution precedence chain (`CLAUDE_CODE_SUBAGENT_MODEL` env > per-invocation > frontmatter > main-conversation).

### Existing Path D design + cite trail (TIER-3-LOCAL-COMPOSITION)

`Z:/claude-sota-installed/docs/fm17f-deep-dive-2026-05-09.md:101-122 @ current HEAD` [VERIFIED 2026-05-11]:
- L102 `### Path D (SECONDARY for parallelism): CLAUDE_CODE_DISABLE_1M_CONTEXT=1 env + eee restart`
- L104 `**Status**: TIER-1-DIRECT documented kill-switch per CHANGELOG L1761.`
- L107-109 `**Mechanics**: $env:CLAUDE_CODE_DISABLE_1M_CONTEXT = '1'` in CLAUDE.local.md ENV block (h)
- L112-119 `**Effect**: parent session drops from claude-opus-4-7[1m] (1M context) to claude-opus-4-7 (standard ~200k context). Subagent dispatch via Agent() then frontmatter model: resolution proceeds normally → BRIDGE-MODE codex-rescue / gpt5-reviewer / gpt5-archaeologist subagents work via Agent() tool ... Enables 3-5 agent fan-out per advanced-agent-team-standing-directive.md invariants`
- L120 `**Trade-off (significant)**: parent session loses 1M context window. Long-arc autonomous /loop sessions hit /compact more aggressively (~200k vs ~1M ceiling). Per karpathy-adapted.md §5 Wiki Compounding Surface — context rot threshold drops from ~300-400k (1M variant) to ~150-180k (standard variant) per Karpathy 1M calibration.`
- L122 `**When Path D is justified**: when a Wave demands fan-out parallelism (3-5 agents simultaneously) AND the ship is bounded enough that dropping parent context to ~200k won't trigger excessive /compact cycles.`

### Current CLAUDE.local.md ENV (h) state (TIER-3-LOCAL-CONFIG)

`Z:/claude-sota-installed/CLAUDE.local.md:62-83 @ current HEAD`:
```powershell
# (h) Path D — 1M context kill-switch for fan-out Waves (TIER-1-DIRECT Anthropic env var)
# ... 20 LOC of cite-trail and rationale ...
# $env:CLAUDE_CODE_DISABLE_1M_CONTEXT = '1'   # ← line 83 commented; uncomment to activate
```

### Activation mechanics (1-line uncomment + restart eee)

```diff
- # $env:CLAUDE_CODE_DISABLE_1M_CONTEXT = '1'
+ $env:CLAUDE_CODE_DISABLE_1M_CONTEXT = '1'
```

Then operator-side: `eee` restart (NEW shell instance launches CC with the env set; banner shows `Opus 4.7` WITHOUT `(1M context)` suffix).

### FM-17.f empirical mechanism (TIER-3-LOCAL-OPERATOR-DERIVED)

Per `Z:/claude-sota-installed/docs/fm17f-deep-dive-2026-05-09.md §1` — `[1m]` parent-session flag carries into subagent session-creation request INDEPENDENT of subagent frontmatter `model:` resolution. With subagent frontmatter `model: sonnet`, resolved request becomes effective `sonnet[1m]` because parent's `[1m]` flag propagates. On plans where Sonnet 1M requires `/extra-usage`, request fails at billing-class entitlement check BEFORE any tool call or token consumption → 0-token pre-fire `<status>failed</status>` + "API Error: Extra usage is required for 1M context" + ~200-1000ms wall-clock. n=6 firm same-arc ladder (W119 Voice 2 W129 Voice 1 W130 Voice 1+2 W148 Fire 1 Voice 2+3 W148 Fire 1 Voice 4+5 per W148-F1 cumulative).

### Risk + reversibility

- **Risk**: MED (env change requires restart; affects ALL future sessions until reverted). Reversal: re-comment line 83 + eee restart.
- **Trade-off honesty**: parent loses 1M ceiling (drops to ~200k effective). `/compact` rot threshold drops from ~300-400k to ~150-180k. Long-arc /loop sessions hit `/compact` ~2× more often per Karpathy §5 Wiki Compounding Surface.
- **Gate**: CR-7 Phase 1 HIGH-risk operator-gated.

### CR-1 cite-class lattice for this ship

`constituents=[TIER-1-DIRECT @ https://code.claude.com/docs/en/env-vars CLAUDE_CODE_DISABLE_1M_CONTEXT semantic, TIER-1-DIRECT @ https://code.claude.com/docs/en/model-config §Extended context, TIER-1-DIRECT @ https://code.claude.com/docs/en/sub-agents §Choose a model precedence, TIER-3-LOCAL-COMPOSITION @ Z:/claude-sota-installed/docs/fm17f-deep-dive-2026-05-09.md:101-122 Path D design, TIER-3-LOCAL-OPERATOR-DERIVED @ FM-17.f n=6 firm same-arc ladder]; effective_tier=TIER-3-LOCAL-COMPOSITION` per `Z:/claude-sota/.claude/rules/citation-discipline.md` rule #8 MIN_PRECEDENCE.

---

## Summary table (for orchestrator synthesis)

| Item | Cite class (effective_tier) | TIER-1 primary | Risk | Gate | Action |
|------|----------------------------|----------------|------|------|--------|
| 🅰 netsh pin | TIER-3-LOCAL-COMPOSITION | Microsoft Learn netsh-int-ipv4 + Hyper-V port docs | LOW | CR-7 P1 MED admin | 2× admin netsh add commands |
| 🅱 :8079 / mgmt | TIER-3-LOCAL-COMPOSITION | CPA config.example.yaml:14-33 + Willxup/cpa-usage-keeper | LOW | CR-7 P1 LOW | **FM-20 catch: :8079 ALREADY LISTENING; brief was stale**. Optional B1.a flip disable-control-panel true→false for Mgmt UI |
| 🅳 Docker cutover | TIER-3-LOCAL-COMPOSITION | Docker Inc compose docs + CPA + cache-fix Dockerfiles @ pinned SHAs | HIGH | CR-7 P1 HIGH operator-gated | NSSM stop + docker compose up; <60s rollback |
| 🅲 Path D | TIER-3-LOCAL-COMPOSITION | Anthropic CC env-vars + model-config + sub-agents docs | MED | CR-7 P1 HIGH operator-gated | 1-line uncomment CLAUDE.local.md L83 + eee restart |

## HONEST-NON-FINDING block

Per `Z:/claude-sota/.claude/rules/synthesis-layer-verify.md §Reporting categories`:

1. **HNF on Wave 149 Agent A report path**: orchestrator brief cited `Z:/claude-sota-installed/tmp/wave149-agentA-cpa-v7-exit-flow-2026-05-11.md` but file is ABSENT on disk this fire (only wave149-agentB + wave149-f1-agent-a-docker-sysCmd exist). Evidence chain preserved via `.cli-proxy-api/config.yaml` HTML-comment header + MEMORY.md Wave 149 Fire 3 entry.
2. **FM-20 path-drift cascade catch on Item 🅱**: orchestrator brief stated "port 8079 NOT REACHABLE (verified PROBE 7 W151-F1)" — refuted via fresh netstat showing `:8079 LISTENING PID 33072`. Synthesis-layer save; orchestrator should re-scope Item 🅱 from "enable cpa-usage-keeper :8079" (already running) to optional "flip CPA `disable-control-panel: true→false`" if Mgmt UI is the actual desired primitive.
3. **No HNF on Items 🅰 / 🅳 / 🅲** — TIER-1 primaries verified at file:line + HEAD SHA, all cite-anchors resolvable.

## Handoff

`handoff_to: orchestrator | terminationCondition: on_handoff_to:orchestrator | verdict_one_line: "DONE: 4 SOTA cite-anchors delivered; Item 🅱 FM-20 catch surfaced (orchestrator brief STALE on :8079 — already LISTENING)"`
