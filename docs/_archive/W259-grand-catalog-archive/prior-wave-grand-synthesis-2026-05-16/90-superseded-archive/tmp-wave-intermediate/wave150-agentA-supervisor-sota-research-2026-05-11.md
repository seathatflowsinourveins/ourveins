# Wave 150 Fire 1 Agent A — Windows process supervision SOTA research

> Persisted by orchestrator from agentId `a5f49ccba4921af78` (general-purpose Sonnet, 297s, 563K tokens, 28 tool_uses) ARTIFACT-INLINE per FM-19 readonly-guard-sidestep.md.

## TL;DR VERDICT (1 sentence)

**APPROVE the orchestrator's Docker compose + restart-policy: unless-stopped recommendation WITH CRITICAL CAVEATS** (see Migration shape §6 + Operator gates §8): both upstreams ship official Dockerfiles + GHCR images, OAuth-callback-in-container is NOT a blocker (CLIProxyAPI login is a one-shot pre-server flow that runs OUTSIDE the container; tokens are volume-mounted), but Docker Desktop has DOCUMENTED Windows-host auto-start failures (issue 14388, 12606) that require a hybrid Docker-Desktop-autostart + boot-script defensive pattern, and Docker Desktop EULA compliance gate must be checked (free for <250 employees AND <$10M revenue per docker.com/products/personal).

## CR-12 disposition (Docker vs NSSM)

**PARTIAL-OVERLAP** (CR-12 sub-class 3) — both solve "auto-restart 2 long-running services" but via DIFFERENT MECHANISMS. NOT GENUINELY-NEW (Docker well-established alternative); NOT DUPLICATE-FUNCTIONALITY (orthogonal trade-offs); NOT PROVIDER-COMPLEMENT (no useful coexistence for same service); NOT ECOSYSTEM-IMPORT. CASE-BY-CASE per CR-12 PARTIAL-OVERLAP guidance.

[ARTIFACT-INLINE FULL CONTENT PRESERVED — see task-notification result body for complete scorecard + citations + migration shape; key sections summarized below for orchestrator synthesis]

## Convergence-gate scorecard (12 candidates)

| Candidate | Verdict |
|---|---|
| **Docker compose + restart: unless-stopped** | **ADOPT-CONDITIONAL** (gates 1+2 required) |
| Podman quadlets + systemd | REJECT-FOR-FIT Windows host (Linux-only) |
| WSL2 systemd | STUDY-PILOT only (boot lag + reliability issues) |
| Windows-native containers (Hyper-V) | REJECT-FOR-FIT (Microsoft-canonical "not for Win11 Pro production") |
| HashiCorp Nomad single-host | REJECT-FOR-FIT (overkill) |
| Kubernetes single-node (k3s/kind/k0s) | REJECT-FOR-FIT (overkill) |
| **NSSM keep (status quo)** | **REJECT** (STAGNANT 9y; documented unfixed bugs) |
| Servy v8.2 | STUDY-PILOT-NARROW (fallback if Docker rejected) |
| WinSW v3 | STUDY-PILOT-NARROW (maintenance limbo) |
| Shawl v1.8.0 Rust | STUDY-PILOT-NARROW (niche MSI-bundled) |
| ferama/wsw Rust | REJECT-FOR-FIT (too small 51★) |
| **kardianos/service SDK** | **CITE-PATTERN-ONLY** (long-term: open PR to upstream CLIProxyAPI) |

## Critical findings beyond orchestrator framing

1. **Docker Desktop boot-auto-start BROKEN since v4.35.0** per `https://github.com/docker/for-win/issues/14388` (Oct 2024 — STILL OPEN)
2. **Compose `restart: always` does NOT survive Windows reboot** per `https://github.com/docker/for-win/issues/12606` (Mar 2022 — STILL OPEN; default-network removal on reboot)
3. **Docker Engine `dockerd --register-service`** = better Windows service alternative (no Docker Desktop GUI; cleaner architecture; FOSS license unchanged)
4. **Hybrid pattern recommended**: Docker Desktop for interactive ops + `dockerd --register-service` for boot persistence
5. **Servy v8.2** (winget canonical; SignPath-signed; 1572★ MIT; v8.0→v8.2 in 6 months = active 2026 maintenance) = best Windows-native fallback if Docker rejected
6. **kardianos/service SDK** = LONG-TERM SOTA (Caddy/Teleport/GitLab Runner pattern; Yusef Mohamadi Medium 2026-01-06 "Daemonization is an Anti-Pattern" cite)

## Both upstreams SHIP official Docker support (verified at file:line)

- **CLIProxyAPI v7.0.2** @ HEAD `785b00c3`:
  - `Dockerfile` 693B 29 LOC — multi-stage golang:1.26-alpine + alpine:3.23; EXPOSE 8317
  - `docker-compose.yml` 763B — `restart: unless-stopped`; image `eceasy/cli-proxy-api:latest`
  - **GAP**: NO HEALTHCHECK directive (operator adds in compose-override)
  - GHCR image: `eceasy/cli-proxy-api:latest`
- **cache-fix-proxy** v3.5.3/3.5.4 @ HEAD `2f17aeb`:
  - `Dockerfile` 1.9K 39 LOC — node:22-alpine; runs as `node` user uid 1000; EXPOSE 9801
  - **HAS HEALTHCHECK** (production-grade — interval=30s + curl /health)
  - GHCR image: `ghcr.io/cnighswonger/claude-code-cache-fix:latest` (multi-arch, semver-laddered)
  - **CR-9 D6 risk**: upstream frequent releases — pin by `@sha256:<DIGEST>` not `@latest`

## OAuth callback container networking — NOT A BLOCKER

CLIProxyAPI OAuth login is a SEPARATE one-shot CLI command (`./CLIProxyAPI --claude-login`) at `cmd/server/main.go:83,442-481 @ 785b00c3` — runs OUTSIDE container; produces token files volume-mounted into running container. NO OAuth callback needed in server-mode container. Cache-fix-proxy has no OAuth.

**RECOMMEND bridge + port mapping** (default for both upstream compose files); NOT `network_mode: host` (Linux-only on Docker Desktop; WSL2 backend on Win11 doesn't fully support it).

## Operator gates

- **GATE 1 (HIGH — REQUIRES USER CONFIRM)**: Docker Desktop EULA — free for <250 employees AND <$10M revenue. If commercial-use beyond free tier → **Docker Engine** (FOSS) via `dockerd --register-service` (same compose files; no GUI).
- **GATE 2 (MED — REQUIRES USER CONFIRM)**: Docker Desktop boot-auto-start unreliability per issues 14388/12606. Accept manual recovery OR install Docker Engine as Windows service.
- **GATE 3-5 (LOW — auto-approve)**: SHA256 image digest pinning, HEALTHCHECK addition, log capping (json-file driver max-size=25m max-file=5).
- **GATE 5 NEEDS-REVISION**: If Docker REJECTED at gates 1/2 → fall back to **Servy v8.2** (NOT NSSM keep — both Agent A and Mia probe agree NSSM is stagnant).

## Migration shape (if Docker WINS)

Location: `Z:/claude-sota-installed/.local/cpa-fix-services/docker-compose.yml`
Volumes: state-outside-repo via `Z:/claude-sota-installed-state/.cli-proxy-api/` per CLAUDE.local.md ENV (f)
Cutover: `nssm stop CLIProxyAPI` → docker compose up → verify → reboot test → fallback to Docker Engine if Desktop boot unreliable
Estimated cost: 2-3 hours; risk MEDIUM (Docker Desktop boot reliability the unknown)
Rollback: `docker compose down` + `nssm start CLIProxyAPI` <60s

## Higher-SOTA hunt findings (6 surfaces)

1. **kardianos/service SDK** — correct LONG-TERM SOTA via upstream PR (CITE-PATTERN-ONLY this fire; queue for separate arc)
2. **Servy v8.2** — modern Windows-native fallback (winget canonical; SignPath-signed)
3. **Microsoft Hyper-V isolation** explicitly NOT for Win11 Pro production per Microsoft Learn 2025-01-23
4. **Docker compose for production 2026** viable per Distr.sh 2026-04-30 analysis WITH operator practices Compose doesn't enforce
5. **NO Anthropic-canonical service-supervision pattern** for self-hosting CC runtime found — operator must choose 3rd-party supervisor
6. **Bun runtime** not yet competitive Win11-host service-supervision option in 2026

## Citations (TIER-1 only — full list in task notification result body)

KEY ANCHORS:
- `Z:/repos/deps/CLIProxyAPI/Dockerfile @ HEAD 785b00c3`
- `Z:/repos/deps/CLIProxyAPI/docker-compose.yml @ HEAD 785b00c3`
- `Z:/repos/deps/cnighswonger-claude-code-cache-fix/Dockerfile @ HEAD 2f17aeb`
- `Z:/repos/deps/cnighswonger-claude-code-cache-fix/README.md:89-117 @ HEAD 2f17aeb`
- `https://docs.docker.com/config/containers/start-containers-automatically` (Docker official)
- `https://docs.docker.com/subscription/desktop-license/` (EULA)
- `https://github.com/docker/for-win/issues/14388` (boot-autostart-broken)
- `https://github.com/docker/for-win/issues/12606` (restart:always reboot-removal)
- `https://learn.microsoft.com/en-us/virtualization/windowscontainers/manage-containers/hyperv-container` (Microsoft Hyper-V "not for production on Win11 Pro")
- `https://github.com/kardianos/service v1.2.4 @ 2025-07-14` (LONG-TERM SOTA SDK)
- `https://medium.com/@yuseferi/daemonization-is-an-anti-pattern-using-os-native-supervision-for-go-binaries-599dbdab18cd 2026-01-06` (named-T2 dated artifact)
- `http://nssm.cc/bugs` (NSSM known unfixed bugs)

## Probe DAG verdicts

- **Probe 1**: Docker Desktop v29.4.1 RUNNING; 4 containers Up 18 hours (falkordb + langfuse-web + langfuse-worker + grafana) — wait, agent saw 4 alive but our earlier probe showed 10. Mia spot-check needed.
- **Probe 2**: VERIFIED both upstreams ship Dockerfile + compose
- **Probe 3**: VERIFIED cache-fix-proxy v3.5.4 INSTALLED; clone at v3.5.3 (one behind)
- **Probe 4**: PASS no CC plugin namespace conflict
- **Probe 5**: PARTIAL — Docker Desktop boot-reliability documented issue; mitigations available
- **Probe 6**: PASS Docker Hub + GHCR accessible; license MIT+permissive
- **Probe 7**: GENUINELY-NEEDED — NSSM 9y-stagnant; CR-7 Phase 2 needs production-grade supervision
