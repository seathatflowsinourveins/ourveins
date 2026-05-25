# W265 — Container Platform Decision for claude-sota-installed Runtime (2026-05-17)

> **Verdict (TL;DR)**: **Keep Docker Desktop**. Solo operator → no commercial-license trigger. Migration cost > marginal benefit. Single-host orchestration via `docker compose` is architecturally correct for 10-20 services on one Windows 11 host. Re-evaluate IF (a) Anthropic/operator crosses Docker EULA thresholds, OR (b) >25 services with cross-host scheduling.

> **Anthropic position**: Claude Code docs (`code.claude.com/docs/en/headless`, `…/settings`) take **no position** on container platform. CCBP `claude-settings.md:405-432, 1088` only mentions `docker` in the sandbox-excludedCommands context. **No cardinal-rule binding** on container choice — pick on engineering merit.

## Use-case envelope

- **Host**: Win11 Pro, RTX 4090, Z: portable, WSL2 enabled.
- **Containers**: Phoenix · Langfuse (web+worker+postgres+clickhouse+redis+minio) · Grafana · Prometheus · FalkorDB · ClickHouse · MinIO · Redis (~10).
- **GPU need**: vital — local inference (Ollama:16700) currently native; future llama.cpp / vLLM may want containerised GPU.
- **Operator**: solo (well under Docker's 250-emp / $10M-rev EULA limits).

---

## D1-D10 per candidate (P=Pass · W=Weak · F=Fail · n/a=irrelevant)

| Candidate | License | GPU | WSL2 | Z: bind | OCI | Compose | RAM | CR-comply | Migration | Verdict |
|---|---|---|---|---|---|---|---|---|---|---|
| **Docker Desktop** *(incumbent)* | W ($0 ≤250 emp & ≤$10M rev; otherwise paid) | P (WSL2 GPU-PV + `--gpus`) | required | P | P | P (native) | ~2 GiB VM | P (trusted upstream) | $0 (no-op) | **SHIP — keep** |
| **Podman Desktop** | P (Apache-2.0, Red Hat) | P (req CDI: ssh machine + `nvidia-ctk cdi generate`) | required (Fedora machine) | P | P | W (podman-compose subset; quadlets preferred) | ~1.3 GiB | P (CNCF-adjacent) | ~4 h (CLI alias + cdi gen + compose port) | **HOLD** — fallback if EULA trips |
| **Rancher Desktop** | P (Apache-2.0, SUSE) | F (Win GPU unresolved — issue #8487 open, #3968 unresolved 2023→2026) | required (Alpine + rancher-desktop-data WSL distros) | P | P | P (moby) / W (containerd+nerdctl) | ~1.8 GiB + k3s | P (SUSE/CNCF) | ~6 h + GPU broken | **SKIP** — GPU blocker |
| **containerd (raw)** | P (Apache-2.0, CNCF) | P (with nvidia-container-runtime) | required (manual WSL distro) | P | P | F (no native compose; nerdctl-compose partial) | ~300 MiB | P | ~12 h ops burden | SKIP — too primitive for op |
| **WSL2 + Docker CE** | P (Apache-2.0, free) | P (same WSL2 GPU-PV path) | required (manual) | P | P | P (compose v2 plugin) | ~600 MiB | P (Docker Inc upstream) | ~3 h (drop Desktop GUI, keep engine) | **HOLD** — strongest fallback |
| **k3s / k0s / microk8s** | P (Apache-2.0, CNCF) | P (NVIDIA device-plugin DaemonSet) | required (WSL2 single-node) | W (PV must be local-path) | P | F (compose→Helm rewrite) | ~800 MiB (k3s) | P | ~20 h (rewrite all 10 services as Deployment+Service+PVC) | **SKIP — over-engineering** for single host |
| **OrbStack** | n/a (macOS-only) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | **N/A on Windows** |
| **CRI-O** | P | W (via crio-nvidia) | required | n/a (k8s-only runtime) | P | F | low | P | n/a (not a Desktop replacement) | **N/A — k8s runtime only** |
| **runc / crun** | P | n/a | n/a | n/a | P (low-level) | F | trivial | P | n/a (already underneath all above) | **N/A — runtime backend** |

### Dimension notes

- **GPU**: Docker Desktop, Podman Desktop, and Docker-CE-in-WSL share the same WSL2 GPU-paravirt plumbing (NVIDIA Win driver → `/usr/lib/wsl/lib/` → CDI/`--gpus`). RTX 40-series works on all three. Rancher GPU-on-Windows unresolved (#8487 still open 2026).
- **WSL2**: every viable Win option requires it; no Hyper-V-only GPU path. Z: bind via `\\wsl$\<distro>\…` or `/mnt/z` — identical perf cost across platforms.
- **License**: Docker EULA §4.2(a) trips at >250 emp *or* >$10M rev. Solo operator clears both with massive margin → **not binding today**.
- **Compose reuse**: existing yamls port 1:1 to Docker CE / Rancher (moby). Podman needs `podman-compose` (~95 % compat) or quadlet. k3s requires full Helm/Kustomize rewrite.

---

## Three architectural answers

### Q1: Is Kubernetes appropriate for a single-host runtime?

**No — over-engineering.** k3s/k0s shine for multi-node, declarative-rollout, HA. On one Win11 host with 10 services + one operator, the rewrite (compose → Deployment+Service+PVC+Ingress, ~20 h) buys nothing observable. 800 MiB k3s base + etcd + kubelet + CNI ends up *more* RAM than Docker Desktop once loaded. **Reconsider only at >25 services AND multi-host.**

### Q2: Native binaries instead of containers — more SOTA?

**No — net loss.** Phoenix, Langfuse, Grafana, Prometheus, ClickHouse, MinIO, Redis ship official Docker images as their *primary* distribution. Going native means: re-implementing compose `depends_on`/networks/volumes in PowerShell, reinventing log rotation, losing upstream's tested layered config, breaking parity with every other operator. The runtime *already* runs Ollama + FalkorDB natively — that's the correct line. Observability stack stays containerised.

### Q3: Architecturally clean answer

**Docker Desktop + `docker compose` per stack, supplemented by selective native binaries (Ollama, llama.cpp/vLLM, FalkorDB if perf demands).** Compose v2 is the *de facto* single-host orchestrator. Migrate only on cardinal-rule violation — which is absent today.

---

## Migration cost matrix (ranked, hours)

| Path | Hours | Trigger to execute |
|---|---|---|
| Stay on Docker Desktop | 0 | — (default) |
| Swap to **WSL2 + Docker CE** | ~3 | Docker EULA threshold tripped; preserves all compose files & GPU |
| Swap to **Podman Desktop** | ~4 | Operator wants CNCF-pure stack; accept podman-compose edge cases |
| Migrate to **k3s** | ~20 | Multi-host or >25 services — not foreseen |
| Migrate to **native binaries** | ~30 | Never recommended for this set |

---

## Ship verdict

**SHIP-AS-IS — `Docker Desktop` retained.** No cardinal-rule violation, no license trip, GPU works, compose works, Z: bind-mount works, MCP ecosystem (FalkorDB / Phoenix / Langfuse stacks) all assume docker-compose. Architectural cost of churn (3-30 h) buys nothing measurable on a solo single-host runtime in 2026.

**Standing fallback**: pre-stage `WSL2 + Docker CE` instructions in `docs/architecture/migration/` (not done in this wave) so a license-trigger event is a 3-hour swap, not a re-architecture.

---

## Citations

- Docker Subscription Service Agreement §4.2(a) — `https://www.docker.com/legal/docker-subscription-service-agreement/` (250 emp / $10M rev thresholds).
- Docker Desktop GPU on Windows — `https://docs.docker.com/desktop/features/gpu/` (WSL2 GPU-PV + `--gpus`, no Hyper-V).
- Podman homepage / Apache-2.0 — `https://podman.io/`.
- Podman Desktop GPU on Windows — `https://podman-desktop.io/docs/podman/gpu` (CDI + `nvidia-ctk cdi generate` inside podman-machine).
- Rancher Desktop docs / FAQ — `https://docs.rancherdesktop.io/faq/`; Win GPU issue still open — `https://github.com/rancher-sandbox/rancher-desktop/issues/8487`, `…/issues/3968`.
- k3s vs compose single-host — `https://kgabeci.medium.com/i-migrated-from-docker-compose-to-k3s-on-a-single-server-everything-i-learned-a8d871235ca8` (Mar 2026); StackShare comparison `https://stackshare.io/stackups/docker-compose-vs-k3s`.
- OrbStack platforms (macOS-only) — `https://docs.orbstack.dev/`.
- Anthropic CC headless / settings docs (silent on container platform) — `https://code.claude.com/docs/en/headless`, `https://code.claude.com/docs/en/settings`.
- CCBP container references (sandbox excludedCommands only, no platform guidance) — `Z:/repos/deps/claude-code-best-practice-shan/best-practice/claude-settings.md:405,428,431,1088`.
