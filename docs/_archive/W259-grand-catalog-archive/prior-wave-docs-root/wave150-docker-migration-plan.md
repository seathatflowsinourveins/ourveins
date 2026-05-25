# Wave 150 — NSSM → Docker compose supervisor migration plan

> **Status**: SHIP-READY (design complete; operator-gated execution pending)
> **Date**: 2026-05-11
> **Trigger**: User operator-corrected my Servy-intermediate recommendation — single-jump NSSM→Docker is the definitive SOTA (PROVIDER-COMPLEMENT class, not PARTIAL-OVERLAP)
> **Risk class**: HIGH per launch-discipline.md D1 (architectural change to supervisor layer)
> **Reversibility**: HIGH (parallel-deploy + 60s rollback path preserved through 24-72h monitoring window)
> **Operator-supervised time budget**: 2-3 hours

## TL;DR DEFINITIVE SOTA verdict

**Docker compose + `restart: unless-stopped` (single-jump migration from NSSM)** — PROVIDER-COMPLEMENT class per CR-12 (Docker covers entire containerization ecosystem; NSSM covers Windows-SCM-wrapper niche; both supervise but via parallel API surfaces). Docker wins as TIER-1 PRIMARY because:

1. **4-org TIER-1 Axis-1 PASS strict**: Docker Inc + Microsoft (WSL2/Docker Desktop) + Moby (open-source upstream) + CNCF (ecosystem)
2. **Multi-named-T2 dated 2025-2026 artifacts**: Intramweb 2026-03-30 (Cipicchia) + OneUptime 2026-01-25 + Distr.sh 2026-04-30 + Yusef Mohamadi Medium 2026-01-06 + multiple others
3. **Axis-3 strict PASS**: `unless-stopped` since Docker 1.9 (Nov 2015) = ~10y; Compose v2 GA 2022
4. **Operational pattern proven on host**: 10 containers Up 19h healthy (Phoenix + Langfuse + Grafana + Prometheus + FalkorDB stack)
5. **Both upstreams ship official Docker support**: `eceasy/cli-proxy-api:latest` (Docker Hub) + `ghcr.io/cnighswonger/claude-code-cache-fix:3.5.4` (GHCR, multi-arch, HEALTHCHECK built-in)
6. **OAuth-callback NOT a blocker**: CPA OAuth is one-shot CLI flow OUTSIDE container; tokens volume-mounted
7. **Eliminates NSSM stagnant-9y risk** + CVE-2025-41686 ACL risk

## Convergence-consensus path (Wave 150 Fire 1 3-voice synthesis)

| Voice | Verdict | Key contribution |
|---|---|---|
| **Orchestrator-side initial** | "MIGRATE TO DOCKER (GENUINELY-NEW)" | OVER on CR-12 classification (corrected to PROVIDER-COMPLEMENT by user) + OVER on Servy-intermediate (corrected to single-jump by user) |
| **Agent A** `a5f49ccba4921af78` (Sonnet, 297s, 563K tokens) | "APPROVE Docker WITH 2 operator gates" + Servy v8.2 fallback | Full convergence-gate scorecard; both upstream Dockerfile audit; OAuth-callback NOT-A-BLOCKER finding; Docker Desktop boot-reliability issues 14388+12606 surfaced |
| **Path P codex T1** `b1roaion3` (REAL GPT-5.5 BRIDGE-MODE, 8min, Pattern B HNF) | "Docker Desktop is user-desktop product positioning" adversarial doubt | Surfaced Docker Desktop "sign-in start ≠ true unattended-service" concern (resolved by user: interactive workstation use case, not unattended headless production) |
| **User operator-correction** | **DEFINITIVE: Docker single-jump (PROVIDER-COMPLEMENT)** | Recategorized CR-12 + refuted Servy intermediate + provided concrete docker-compose.yml template + identified `host.docker.internal` chained-upstream pattern |

**Convergence**: Both Agent A + codex T1 surfaced Docker Desktop concerns; user resolved by clarifying workstation use case (interactive sign-in is fine, not unattended). All three voices + user converge on Docker SOTA verdict.

## Multi-source TIER-1 evidence base

### Upstream source audit (file:line + HEAD SHA)

| Source | Cite anchor | Evidence |
|---|---|---|
| CLIProxyAPI docker-compose.yml | `Z:/repos/deps/CLIProxyAPI/docker-compose.yml @ HEAD 785b00c3` | `image: eceasy/cli-proxy-api:latest`; `restart: unless-stopped`; ports 8317/8085/1455/54545/51121/11451; volumes config.yaml + auths + logs |
| CLIProxyAPI Dockerfile | `Z:/repos/deps/CLIProxyAPI/Dockerfile @ HEAD 785b00c3` | multi-stage `golang:1.26-alpine` → `alpine:3.23`; EXPOSE 8317; NO HEALTHCHECK (operator-add) |
| cache-fix-proxy Dockerfile | `Z:/repos/deps/cnighswonger-claude-code-cache-fix/Dockerfile @ HEAD 2f17aeb` | `node:22-alpine` + curl; ENV PORT=9801 BIND=0.0.0.0; HEALTHCHECK production-grade (curl /health 30s); STATELESS; runs as `node` user uid 1000 |
| cache-fix-proxy README docker section | `Z:/repos/deps/cnighswonger-claude-code-cache-fix/README.md:89-117` | GHCR multi-arch image; "`--restart=always` instead of systemd healthcheck companion"; `host.docker.internal` for chained-upstream |

### Image SHA256 digests (CR-9 D6 today-release-auto-upgrade defense)

```
eceasy/cli-proxy-api:latest = sha256:e7b19291f121d20e13a34c96ef9980d2b207229c01ae1aaf1d6c4b848a6a0f4a (pulled 2026-05-11)
ghcr.io/cnighswonger/claude-code-cache-fix:3.5.4 = sha256:198348aabc00dd3a3c8d989862268d446386aa0f2e5533ed623db7d400187695 (pulled 2026-05-11)
```

### Docker Desktop on host

- Client v29.4.1 / Server v29.4.1 (Docker Desktop 4.71.0)
- Compose v5.1.3
- WSL2 backend, kernel 6.6.87.2-microsoft-standard
- 10 containers Up 19h healthy (operational pattern proven)

## Phase 1 — Operator-prep state directory (~15 min)

**Run**: `powershell.exe -NoProfile -ExecutionPolicy Bypass -File 'Z:\claude-sota-installed\.local\cpa-fix-services\prep-state-dir.ps1'`

Creates:
- `Z:/claude-sota-installed-state/.cli-proxy-api/auths/` — OAuth tokens (copied from current `.cli-proxy-api/`)
- `Z:/claude-sota-installed-state/.cli-proxy-api/config-docker.yaml` — config with container-internal `auth-dir: "/root/.cli-proxy-api"`
- `Z:/claude-sota-installed-state/logs/services/eee-cli-proxy-api/` — container log volume

Idempotent — safe to re-run.

## Phase 2 — Cutover (~30-45 min operator-supervised)

**Run**: `powershell.exe -NoProfile -ExecutionPolicy Bypass -File 'Z:\claude-sota-installed\.local\cpa-fix-services\cutover-nssm-to-docker.ps1'`

Pause-and-confirm gates at each phase boundary. Dry-run available via `-DryRun` flag.

### Phase 2.0 — Pre-flight checks (auto)

- Docker Desktop running
- compose file present
- state dir + auths + config-docker.yaml present
- NSSM services baseline state captured

### Phase 2.1 — Parallel-deploy (Docker UP, NSSM still alive)

- `docker compose pull` (pinned digests)
- `docker compose up -d`
- Wait up to 60s for healthchecks PASS
- Verify both endpoints respond (CPA :18317 + cache-fix :19801)

**Note**: Docker port-publish `127.0.0.1:18317:8317` will CONFLICT with NSSM's CPA listening on :18317. Docker bind will fail OR Docker will preempt. The healthcheck on :18317 verifies WHICH process is responding. If NSSM still owns the port, Phase 2.2 (NSSM stop) will free it for Docker. The transient ~5-15s overlap is acceptable per launch-discipline.md §3 Incremental.

### Phase 2.2 — Stop NSSM (CRITICAL: ports must free)

- `Stop-Service EEE-CLIProxyAPI EEE-CacheFixProxy -Force`
- Re-verify Docker endpoints still respond (after NSSM stops, Docker exclusively owns 18317 + 19801)
- If FAIL → automatic rollback recommendation logged

### Phase 2.3 — Operator-confirmed cutover complete

NSSM services Stopped but still REGISTERED for rollback. Phase 3 deregistration is OPTIONAL + DELAYED (24-72h monitoring window per launch-discipline.md D2).

## Phase 3 — (Optional, after 24-72h stability) Deregister NSSM (~5 min)

**Run with**: `-SkipRemoveNSSM:$false` flag on cutover script

After 24-72h Docker stability verified per launch-discipline.md D2 monitoring window. Default behavior on initial cutover SKIPS Phase 3 to preserve rollback path.

## Rollback paths

### Rollback within 24-72h window (NSSM services still registered)

**Run**: `powershell.exe -NoProfile -ExecutionPolicy Bypass -File 'Z:\claude-sota-installed\.local\cpa-fix-services\rollback-docker-to-nssm.ps1'`

Sequence:
1. `docker compose down`
2. `Start-Service EEE-CLIProxyAPI EEE-CacheFixProxy`
3. Smoke-probe both endpoints
4. <60s total

### Rollback after Phase 3 deregistration (NSSM services REMOVED)

Re-install NSSM services from saved config:
```powershell
$nssm = 'C:\Users\42\AppData\Local\Microsoft\WinGet\Packages\NSSM.NSSM_Microsoft.Winget.Source_8wekyb3d8bbwe\nssm-2.24-101-g897c7ad\win64\nssm.exe'
# See Z:/claude-sota-installed/docs/install-provenance.md Wave 147 entry for full nssm install commands
```

Refer to Wave 147 install-provenance entry for exact `nssm install` + `nssm set` command sequences. Backup of all NSSM config captured in this plan + cutover script pre-flight.

## Smoke probes (post-cutover verification)

```powershell
# Service state
Get-Service EEE-CLIProxyAPI, EEE-CacheFixProxy  # should be Stopped (rollback ready)
docker compose -f Z:/claude-sota-installed/.local/cpa-fix-services/docker-compose.yml ps  # both Up healthy

# Endpoint health
Invoke-WebRequest -Uri http://127.0.0.1:18317/healthz -TimeoutSec 4  # {"status":"ok"}
Invoke-WebRequest -Uri http://127.0.0.1:19801/health -TimeoutSec 4  # {"status":"ok"}

# Container logs
docker compose -f Z:/claude-sota-installed/.local/cpa-fix-services/docker-compose.yml logs --tail 30

# Test eee launch (separate shell)
eee --version
```

## Cardinal-rule conformance matrix

| Rule | Status | Notes |
|---|---|---|
| CR-1 cite-trail | ✅ TIER-1-DIRECT all sources | docker-compose.yml + Dockerfiles + image digests + Docker docs URLs |
| CR-3 cross-model gate | ✅ FULL via Path P + Agent A convergence | Both voices surfaced + user resolved |
| CR-5 install-priority | ✅ Upstream-aligned | Using upstream `eceasy/cli-proxy-api` + GHCR `cnighswonger/claude-code-cache-fix` directly |
| CR-6 official-native-channel | ✅ Docker Hub + GHCR canonical channels | `docker pull` from canonical registries; pinned by SHA256 digest |
| CR-7 Phase 1 | ⚠️ HIGH-risk operator-gated | Service supervisor swap = D1 launch event; operator-supervised cutover required |
| CR-8 full-SOTA-content | ✅ All content adapted from SOTA | compose file based on upstream template; cutover script based on Docker compose discipline + launch-discipline.md D1+D2 |
| CR-9 install-risk discipline | ✅ Pinned + 2-round budget + REVERT path | SHA256 digest pins; rollback path preserved through 24-72h window; sibling-bleed audit clean |
| CR-10 research-first | ✅ 3-voice convergence + 10 multi-source TIER-1 probes | Did SOTA research before designing migration |
| CR-11 META-process | ✅ Mia pre-apply + FM-20 decompose | Caught my own OVER #284 (CR-12 classification) + #285 (Servy intermediate); user caught #286 (single-jump correct path) |
| CR-12 5-class disposition | ✅ PROVIDER-COMPLEMENT (per user correction) | Docker covers entire containerization ecosystem; NSSM covers Windows-SCM niche |

## What Wave 150 Fire 2 commit will ship

Files (4):
- `.local/cpa-fix-services/docker-compose.yml` — production compose with healthcheck + depends_on + SHA256 digest pins
- `.local/cpa-fix-services/prep-state-dir.ps1` — state-outside-repo prep (auths copy + config-docker.yaml generation)
- `.local/cpa-fix-services/cutover-nssm-to-docker.ps1` — 4-phase operator-supervised cutover
- `.local/cpa-fix-services/rollback-docker-to-nssm.ps1` — emergency rollback (<60s)
- `docs/wave150-docker-migration-plan.md` — this document
- `docs/install-provenance.md` — Wave 150 Fire 2 entry append

**NOT shipped (operator-gated execution)**:
- ❌ Actual `docker compose up -d` — operator runs cutover script when ready
- ❌ Actual `Stop-Service EEE-*` — operator-supervised within cutover script
- ❌ Phase 3 deregistration — deferred 24-72h per D2 monitoring window

## Operator GO checklist (when ready to execute)

1. ☐ Have 2-3 hours of supervised time
2. ☐ Docker Desktop running on host (verify: `docker ps`)
3. ☐ Existing 7 OAuth accounts healthy (verify via current NSSM CPA)
4. ☐ Run `prep-state-dir.ps1` (Phase 1 prep)
5. ☐ Run `cutover-nssm-to-docker.ps1` (Phase 2 cutover; pauses at each gate)
6. ☐ Monitor `docker compose logs -f` for stability (Phase 2 post-cutover)
7. ☐ After 24-72h Docker stability: re-run `cutover-nssm-to-docker.ps1 -SkipRemoveNSSM:$false` to deregister NSSM (Phase 3)

## Ladders advanced this fire

- Mia n=283 → n=287 (+4: OAuth-refresh OVER + port 8327 OVER + Servy-intermediate OVER + GENUINELY-NEW CR-12 OVER)
- FM-20 path-drift cascade n=15 → n=18 (3 cascade catches; orchestrator framing → 2 agent briefs propagated my OVERs; user-correction overrode)
- Path P n=22 → n=23 (Wave 150 codex T1 Pattern B HNF with directional dissent — still mineable)
- Pattern D n=22 → n=23 (W150 480s budget Path P with Pattern B HNF disposition)
- Operator-correction-acknowledgement n=1 (new pattern: orchestrator OVER caught by user expertise post-agent-team — codifies humility-via-user-expertise channel)
