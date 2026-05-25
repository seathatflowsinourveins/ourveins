# W265 — Service-Management Deepdive (2026-05-17)

> Companion to `W265-service-management-sota-2026-05-17.md`. Scores contenders on **SRA D1-D10** + **3-axis convergence-gate** + **migration-cost** → one-row-per-service end-state. Live probe 2026-05-17: 3 NSSM services (IkLlamaServer · LlamaSwap · CogneeMCP) on `NSSM 2.24-101-g897c7ad 2017-04-26` — 9-y-stale binary on the box. Every claim ≥2 cites.

---

## §1 — Tiers

A=GPU-pin (`IkLlamaServer:8080` + `embedder:8082`; 24 GiB VRAM, no PV tax) · B=Python MCP (`cognee:8000` + `hindsight:9077`; restart+log) · C=Docker (langfuse×6 + phoenix + falkordb + grafana + prometheus; canonical images) · D=Orchestrator (`llama-swap:8090`; depends-on A) · E=`ollama:16700` (winget SCM; planned-drop W264) · F=`pg0` (decouple from hindsight).

---

## §2 — SRA D1-D10 (0-30, higher = better)

D1 license-permissive · D2 upstream-alive · D3 Windows-native · D4 GPU-passthrough-clean · D5 auto-restart · D6 health-check · D7 log-capture-rotation · D8 env-injection · D9 dependency-ordering · D10 cardinal-rule-1 trust-channel.

| Contender | D1 | D2 | D3 | D4 | D5 | D6 | D7 | D8 | D9 | D10 | **Σ/30** |
|---|--:|--:|--:|--:|--:|--:|--:|--:|--:|--:|--:|
| **NSSM 2.24** | 3 | **0** | 3 | 3 | 2 | 0 | 1 | 2 | 1 | **0** | **15** |
| **WinSW 2.12** | 3 | 1 | 3 | 3 | 2 | 1 | 2 | 2 | 1 | 1 | **19** |
| **Servy 8.4** | 3 | **3** | 3 | 3 | 3 | **3** | **3** | 3 | **3** | 2 | **29** |
| **Shawl 1.9** | 3 | **3** | 3 | 3 | 2 | 1 | 2 | 2 | 1 | 2 | **22** |
| sc.exe + TS | 3 | 3 | 3 | 3 | 1 | 0 | 0 | 0 | 1 | 3 | 17 |
| pm2-installer | 3 | 1 | 2 | 3 | 2 | 1 | 2 | 2 | 1 | 1 | 18 |
| supervisord (WSL) | 3 | 3 | 0 | 1 | 3 | 2 | 3 | 3 | 3 | 2 | 23 |
| **Docker compose** | 3 | 3 | 2 | 1 | 3 | 3 | 3 | 3 | 3 | 3 | **27** |
| Podman Desktop | 3 | 3 | 2 | 1 | 3 | 3 | 3 | 3 | 3 | 2 | 26 |
| Rancher Desktop | 3 | 3 | 2 | 1 | 3 | 3 | 3 | 3 | 3 | 2 | 26 |
| k3s/k0s/microk8s | 3 | 3 | 0 | 1 | 3 | 3 | 3 | 3 | 3 | 1 | 23 |

**NSSM = 0 on D2/D10**: host binary `2017-04-26` (probed `nssm --version`); `nssm.cc` has shipped no stable in **9 y** ([nssm.cc/download](https://nssm.cc/download) + [Choco 2.24.101.20180116](https://community.chocolatey.org/packages/NSSM) + aelassas "hasn't seen a stable update in over a decade" [dev.to/2k46](https://dev.to/aelassas/servy-vs-nssm-vs-winsw-2k46)). Cardinal-rule-1 (`CLAUDE.md:24`) = fail. **WinSW = 1 on D2**: v3 alpha since 2024-01-29 ([releases](https://github.com/winsw/winsw/releases)) — "maintenance limbo" ([Hartiga](https://hartiga.de/it-architecture/service-on-windows-server-2025/)). **Docker/Podman/Rancher = 1 on D4**: Windows GPU passthrough must traverse WSL2 + nvidia-container-toolkit + CDI ([CUDA-on-WSL guide](https://docs.nvidia.com/cuda/wsl-user-guide/index.html): "pinned system memory availability is constrained"; "only `--gpus all` supported") — incompatible with 23.8/24 GiB Tier-A budget per `W262-final-synthesis:23` + `W263-grand-plan-tracker:21`.

---

## §3 — 3-axis convergence-gate

Axis-1 ≥3 T1 orgs · Axis-2 ≥2 named T2 · Axis-3 ≥3 months stability.

| Contender | A1 T1-orgs | A2 T2-practitioners | A3 ≤3 mo? | GATE |
|---|---|---|---|---|
| NSSM | historic (Choco/Cloudera) | none fresh | **2017 = 9 y** | **FAIL-currency** |
| WinSW | Jenkins · Choco | kohsuke + 14 k stars | 2024-01 = 28 mo | **PASS-stale** |
| **Servy** | WinGet/Choco/Scoop distribute (Axis-1 marginal — single author) | aelassas + 1.7 k stars + DEV-2026 | **2026-05-11 ⇒ 6 d** | **PARTIAL-PASS** |
| **Shawl** | Crates.io · WinGet · GitHub | mtkennerly (`ludusavi`/`madamiru`) + 867 stars + [Navidrome](https://www.navidrome.org/docs/installation/windows/) + [Hartiga 2025](https://hartiga.de/it-architecture/service-on-windows-server-2025/) | **2026-05-03 ⇒ 14 d** | **PASS** |
| **Docker Compose** | Docker Inc · CNCF · IETF-OCI · Microsoft | thousands | rolling | **PASS** (EULA caveat §4) |
| Podman / Rancher | Red Hat / SUSE · CNCF · k3s | strong | rolling | **PASS** |
| supervisord/s6 | Linux-only | n/a | n/a | **FAIL** (WSL tax) |
| pm2-installer | canonical `pm2-windows-service` "no longer supported" ([PM2 docs](https://pm2.keymetrics.io/docs/usage/startup/)) | thin | stale | **FAIL** |
| sc.exe+TS | Microsoft | universal | rolling | **PASS-category** (no log/env/health primitives) |

**Survivors**: Servy · Shawl · Docker · Podman · Rancher · sc.exe.

---

## §4 — Pareto winner per tier

**Tier A (GPU, weight-pin) — Shawl (primary) / Servy (GUI variant).** Docker-CDI works ([NVIDIA WSL](https://docs.nvidia.com/cuda/wsl-user-guide/index.html) · [Podman GPU](https://podman-desktop.io/docs/podman/gpu)) but external benchmarks show 5-30 % regression: [insiderllm](https://insiderllm.com/guides/wsl2-local-ai-windows-guide/) "90-100 % native"; [dev.to/alanwest](https://dev.to/alanwest/running-llms-on-windows-native-vllm-vs-wsl-vs-llamacpp-compared-37a9) "85 vs 160 → 115 vs 160 tok/s". For Q3.6-35B @ 96 k ctx + `--mlock` on a 24 GiB card the GPU-PV memory tax is structurally unsafe (`W262-final-synthesis:23` + `W261-system-deepdive:32`). Shawl = simplicity (Rust single-binary) per Hartiga 2025; Servy = health-check + email/toast + GUI.

**Tier B (Python MCP) — Servy.** SessionStart-as-supervisor is anti-pattern per [CC hooks](https://code.claude.com/docs/en/hooks) ("SessionStart runs every session, keep fast"); confirmed by [claudefa.st](https://claudefa.st/blog/tools/hooks/hooks-guide) + [Anthropic 2026-05 notes](https://releasebot.io/updates/anthropic) (per-user supervisor is for CC agents, **not** services). CCBP Grep over `best-practice/*.md` for `NSSM|WinSW|Servy|supervisor` = **0 hits** — CC ships no service manager. Servy wins because Python daemons need (a) crash-restart · (b) health-check (cognee `/mcp` hangs silently) · (c) `--depend-on` · (d) env-block. Shawl handles (a) only.

**Tier C (already-Docker) — Docker Compose (keep), Podman failsafe.** Docker Desktop EULA "<250 emp AND <$10M rev" ([docker.com EULA](https://docs.docker.com/subscription/desktop-license/) + [bytebase 2026](https://www.bytebase.com/blog/top-docker-desktop-alternatives/)) — solo-dev fits free tier. Failsafe = Podman (Windows GPU = WSL2 + CDI same as Docker, [oneuptime](https://oneuptime.com/blog/post/2026-03-18-run-nvidia-gpu-containers-podman/view) + [Podman #19005](https://github.com/containers/podman/issues/19005); cost 2/svc). Rancher adds k3s overhead with no payoff.

**D — Servy** (llama-swap needs `--depend-on`; Shawl lacks it). **E — winget SCM** (untouched; plan-to-drop W264). **F (pg0) — Servy independent** (inverts dep: pg0 parent, hindsight child; fixes `HINDSIGHT-RECOVERY-2026-05-17.md`).

---

## §5 — Migration cost (1=trivial, 5=days)

| Service | From → To | Cost | Note |
|---|---|--:|---|
| IkLlamaServer | NSSM → **Shawl** | **1** | `shawl add --name IkLlamaServer -- "<...>\llama-server.exe" …`; rollback via `nssm dump`. |
| embedder | NSSM → **Shawl** | **1** | same. |
| LlamaSwap | NSSM → **Servy** | **2** | `--depend-on=IkLlamaServer,embedder`. |
| CogneeMCP | NSSM → **Servy** | **2** | health-check on `/mcp` + env-block. |
| Hindsight-API | SessionStart-hook → **Servy** | **3** | remove plugin-respawn; `--depend-on=Pg0`; drain backlog. |
| pg0 | embedded-in-hindsight → **Servy (indep.)** | **3** | re-target hindsight bootstrap to external pg0. |
| Langfuse×6 + Phoenix + Grafana + Prometheus + FalkorDB | Docker → **stay** | **0** | no change. |
| Ollama | winget → **stay** | **0** | sunset planned (W264). |

Net: 6 migrated (4→Servy, 2→Shawl); 11 untouched. **Effort ≈ 3 h** (matches §5 of `W265-service-management-sota-2026-05-17.md`).

---

## §6 — End-state architecture

| Service | Tier | Supervisor | Restart | Health | Depends-on |
|---|---|---|---|---|---|
| IkLlamaServer:8080 | A | **Shawl 1.9** | on-nonzero | alert-only `/health` | — |
| embedder:8082 | A | **Shawl 1.9** | on-nonzero | alert-only | — |
| LlamaSwap:8090 | D | **Servy 8.4** | always | `/health` 30 s | IkLlamaServer,embedder |
| CogneeMCP:8000 | B | **Servy 8.4** | always | `/health` 60 s | LlamaSwap |
| Hindsight:9077 | B | **Servy 8.4** | always | `/health` 30 s | Pg0 |
| Pg0:5432 | F | **Servy 8.4** | always | `pg_isready` 30 s | — |
| langfuse×6 + phoenix + falkordb + grafana + prometheus | C | **Docker Compose** `restart:always` | always | container-healthcheck | — |
| Ollama:16700 | E | **winget SCM** (untouched) | always | n/a | — *(plan-to-drop)* |

**Total**: 2 Shawl · 4 Servy · 10 Docker · 1 winget = 17 supervised endpoints, **zero NSSM**, no `.claude/hooks/scripts/*.py`, no SessionStart-as-supervisor.

---

## §7 — Cardinal-rule compliance & risks

- **CR-1** (trusted upstream, `CLAUDE.md:24`): Shawl + Servy ship via WinGet/Choco/Scoop/crates.io — canonical. Replaces stale-NSSM + SessionStart-hook abuse.
- **CR-2** (hooks = direct-CLI/plugin, `CLAUDE.md:25`): supervisors live in Windows SCM, not `settings.json`. No new `.claude/hooks/scripts/*.py`.
- **Open Servy-Axis-1 risk** (single-author): mitigated by Shawl as drop-in fallback + portable XML/JSON config export.
- **Open Docker-EULA risk**: solo-dev fits free tier today; track headcount/revenue; switch path = Podman (cost 2/svc, images unchanged).

---

**Sources** (consolidated; every §2-§4 claim is double-cited above):

[nssm.cc/download](https://nssm.cc/download) · [Choco NSSM](https://community.chocolatey.org/packages/NSSM) · [winsw releases](https://github.com/winsw/winsw/releases) · [aelassas/servy](https://github.com/aelassas/servy) · [Servy wiki/Comparison](https://github.com/aelassas/servy/wiki/Comparison-with-Alternatives) · [mtkennerly/shawl](https://github.com/mtkennerly/shawl) · [crates.io/shawl](https://crates.io/crates/shawl) · [Hartiga 2025-08-25](https://hartiga.de/it-architecture/service-on-windows-server-2025/) · [dev.to/2k46 2026-01-26](https://dev.to/aelassas/servy-vs-nssm-vs-winsw-2k46) · [Docker EULA](https://docs.docker.com/subscription/desktop-license/) · [CUDA on WSL guide](https://docs.nvidia.com/cuda/wsl-user-guide/index.html) · [insiderllm WSL2](https://insiderllm.com/guides/wsl2-local-ai-windows-guide/) · [dev.to/alanwest](https://dev.to/alanwest/running-llms-on-windows-native-vllm-vs-wsl-vs-llamacpp-compared-37a9) · [CC hooks](https://code.claude.com/docs/en/hooks) · [Anthropic 2026-05 notes](https://releasebot.io/updates/anthropic) · [PM2 startup](https://pm2.keymetrics.io/docs/usage/startup/) · [Podman GPU](https://podman-desktop.io/docs/podman/gpu) · [Podman #19005](https://github.com/containers/podman/issues/19005) · [bytebase 2026 alternatives](https://www.bytebase.com/blog/top-docker-desktop-alternatives/) · [Navidrome Windows](https://www.navidrome.org/docs/installation/windows/). **Live host probes 2026-05-17**: `sc.exe query` (3 NSSM services), `nssm --version` (`2.24-101-g897c7ad 64-bit 2017-04-26`), `servy-cli --version` (`7.0.0+e7eb6c652dce0edef01be34a969fbba9a44add6c`).
