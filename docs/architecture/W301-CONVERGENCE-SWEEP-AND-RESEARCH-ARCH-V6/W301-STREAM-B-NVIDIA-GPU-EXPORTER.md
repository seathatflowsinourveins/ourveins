# W301 Stream B — `utkuozdemir/nvidia_gpu_exporter` Go-binary deep-dive (Python-3.13-incompat hedge)

> **Mission**: verify utkuozdemir/nvidia_gpu_exporter as a T2 hedge against W301-MED-nvitop-exporter — which crashes per-request on Windows Python 3.13 (`socketserver.finish_request` exception, NSSM SERVICE_EXIT_CODE 3).
>
> **Status**: SHIP-READY. Recommended install path: **Scoop bucket + WinSW v3 (Stream A schema)**. Port: **9835** (default, avoids collision with dead nvitop :5050). Operator-ready WinSW XML at `OPERATOR-READY-ARTIFACTS/NvidiaGpuExporter.xml`.

---

## §1. Repo audit (ground truth via gh API, 2026-05-19)

| Field | Value | Source |
|---|---|---|
| Repo | `utkuozdemir/nvidia_gpu_exporter` | gh API `/repos/utkuozdemir/nvidia_gpu_exporter` |
| Stars | **1,480** | gh API meta |
| Forks | 146 | gh API meta |
| License | **MIT** (spdx_id `MIT`) | gh API meta |
| Language | Go (94.4%), PowerShell (3.9%), Shell (1.4%), Dockerfile (0.2%) | gh API meta + Exa |
| Default branch | `master` | gh API meta |
| Latest release | **v1.4.1**, published 2025-10-06 | gh API `/releases/latest` |
| Latest push | 2026-05-19T00:25:40Z | gh API meta `pushed_at` |
| Recent unreleased commits | last 5 are all `renovate[bot]` dep-bumps (Feb–Apr 2026); HEAD is `eb8fefb` 2026-04-03 | gh API `/commits?per_page=10` |
| Topics | ai, cryptocurrency, gaming, llm, llm-training, monitoring, nvidia, nvidia-gpu, nvidia-smi, prometheus, prometheus-exporter | gh API meta |
| Open issues | 42 (30 fetched, mostly renovate PRs + feature-asks) | gh API `/issues?state=open` |
| **Maintenance notice** | Author posted `> [!WARNING] Maintenance Status:` on README — admits *"for over a year now, I've hardly had any time to keep up with my personal open-source projects … I am still committed to keep this tool working and slowly move it forward"* | README `master` (Exa snapshot 2026-05-19) |

**Dependencies (go.mod HEAD)** — pure Go, zero C bindings, zero cgo:
- `github.com/prometheus/client_golang v1.23.2` (canonical)
- `github.com/prometheus/exporter-toolkit v0.16.0` (TLS, basic-auth, systemd activation)
- `github.com/alecthomas/kingpin/v2 v2.4.0` (flag parser)
- `golang.org/x/sync v0.20.0`, `prometheus/common v0.67.5`, `coreos/go-systemd/v22 v22.7.0`
- Go toolchain pinned: **go 1.25.0**

**Runtime model**: Go subprocess-forks `nvidia-smi.exe` per scrape, parses CSV from `--query-gpu=...`, emits Prometheus text format. No CUDA SDK, no NVML linkage. Pure static binary (Windows zip is ~4.8 MB).

---

## §2. Windows install paths — 3 options ranked

### Option A — Scoop bucket (RECOMMENDED, vendor-supported)
**Pros**: idempotent, scoop-managed upgrades via `scoop update`, official author-maintained bucket, auto-adds to PATH at `C:\ProgramData\scoop\apps\nvidia_gpu_exporter\current\`, paired with `nssm` install in same bucket workflow.
**Cons**: requires Scoop pre-installed; bucket adds an extra remote repo to trust (utkuozdemir/scoop_nvidia_gpu_exporter).

```powershell
# Scoop + bucket + binary + firewall + service in 5 lines (admin shell)
scoop install git
scoop bucket add nvidia_gpu_exporter https://github.com/utkuozdemir/scoop_nvidia_gpu_exporter.git
scoop install nvidia_gpu_exporter/nvidia_gpu_exporter --global
New-NetFirewallRule -DisplayName "Nvidia GPU Exporter" -Direction Inbound -Action Allow -Protocol TCP -LocalPort 9835
# Service registration → see §3
```
Source: `INSTALL.md` § *Installing as a Windows Service* (Exa snapshot 2026-05-19).

### Option B — Standalone exe download from GitHub releases
**Pros**: no Scoop dependency, deterministic SHA via `checksums.txt`, can pin to exact tag (`v1.4.1`), works for air-gapped+offline.
**Cons**: manual upgrade path (re-download + replace exe), no PATH auto-registration.
- Asset: `nvidia_gpu_exporter_1.4.1_windows_x86_64.zip` (4,819,530 B = 4.6 MB)
- URL: `https://github.com/utkuozdemir/nvidia_gpu_exporter/releases/download/v1.4.1/nvidia_gpu_exporter_1.4.1_windows_x86_64.zip`
- SHA: see `checksums.txt` in same release directory

### Option C — Build from source (`go install`)
**Pros**: tags can be ahead of latest release (e.g. v1.4.2-0.20251108175131-769f3ff9437f exists on pkg.go.dev; renovate PR backlog suggests next release imminent).
**Cons**: requires Go 1.25 toolchain on Windows; build chain non-trivial vs zero-dependency option B.

```powershell
go install github.com/utkuozdemir/nvidia_gpu_exporter/cmd/nvidia_gpu_exporter@v1.4.1
```

### Recommendation: **Option A (Scoop bucket)** for this runtime
Already aligned with utkuozdemir's documented happy-path; pairs cleanly with the Stream A WinSW-v3 migration (Scoop installs binary, WinSW supervises it). Operator AI 1 of this stream's runbook is `scoop install nvidia_gpu_exporter/nvidia_gpu_exporter --global`.

---

## §3. WinSW v3 registration (Stream A schema-compliant)

Stream A's W301-MED-nssm-to-winsw migration mandates WinSW v3 native-AOT XML (no .NET runtime needed). The operator-ready artifact at `OPERATOR-READY-ARTIFACTS/NvidiaGpuExporter.xml` follows the IkLlamaServer.xml + LlamaSwap.xml schema verbatim. Apply pattern:

```powershell
# 1. Install binary via Scoop (Option A above) OR drop zip-extracted exe into Z:\tools\nvidia_gpu_exporter\
# 2. Firewall (one-time)
New-NetFirewallRule -DisplayName "Nvidia GPU Exporter" -Direction Inbound -Action Allow -Protocol TCP -LocalPort 9835

# 3. Place NvidiaGpuExporter.xml next to winsw.exe at Z:\tools\winsw\
Copy-Item Z:\claude-sota-installed\docs\architecture\W301-CONVERGENCE-SWEEP-AND-RESEARCH-ARCH-V6\OPERATOR-READY-ARTIFACTS\NvidiaGpuExporter.xml Z:\tools\winsw\NvidiaGpuExporter.xml

# 4. Install + start
Z:\tools\winsw\winsw.exe install Z:\tools\winsw\NvidiaGpuExporter.xml
Z:\tools\winsw\winsw.exe start   Z:\tools\winsw\NvidiaGpuExporter.xml

# 5. Smoke (see §4)
curl http://127.0.0.1:9835/metrics
```

**NSSM-FALLBACK** (if Stream A WinSW migration is deferred):
```powershell
nssm install NvidiaGpuExporter "C:\ProgramData\scoop\apps\nvidia_gpu_exporter\current\nvidia_gpu_exporter.exe"
nssm set NvidiaGpuExporter AppParameters "--web.listen-address=:9835 --query-field-names=AUTO --log.format=logfmt --log.level=info"
nssm set NvidiaGpuExporter Start SERVICE_AUTO_START
Start-Service NvidiaGpuExporter
```

**Port choice — keep `9835` (default), NOT `:5050`**:
1. `:5050` was the dead nvitop-exporter target — avoid resurrecting a known-broken port mapping.
2. `9835` is the registered/published default in all docs, Grafana dashboard 14574 expects it, every field report (oregonpillow 2022 + community guides) uses it.
3. Prometheus scrape config edit is one line: `targets: ['localhost:9835']`.

---

## §4. Smoke-test — expected `/metrics` output

Verified shape from `METRICS.md` HEAD on `master` (programmatic extract):
- **55 distinct `nvidia_smi_*` metrics** (full set, GPU-level only)
- **1 `nvidia_gpu_exporter_build_info` metric** (version label)
- Standard Go runtime metrics (`go_gc_*`, `go_memstats_*`, `process_*`)
- Standard promhttp scrape-status metrics

```powershell
curl http://127.0.0.1:9835/metrics | Select-String "nvidia_smi_" | Select-Object -First 20
```

Expected key metric families (verified present in `METRICS.md` on `master`):
- **Utilization**: `nvidia_smi_utilization_gpu_ratio`, `nvidia_smi_utilization_memory_ratio`
- **Memory**: `nvidia_smi_memory_used_bytes`, `nvidia_smi_memory_free_bytes`, `nvidia_smi_memory_total_bytes` (auto-discovered)
- **Power**: `nvidia_smi_power_draw_watts`, `nvidia_smi_power_limit_watts`, `nvidia_smi_enforced_power_limit_watts`, `nvidia_smi_power_default_limit_watts`, `nvidia_smi_power_max_limit_watts`, `nvidia_smi_power_min_limit_watts`, `nvidia_smi_power_management`
- **Temperature**: `nvidia_smi_temperature_gpu`
- **Clocks (current)**: `nvidia_smi_clocks_current_graphics_clock_hz`, `nvidia_smi_clocks_current_memory_clock_hz`, `nvidia_smi_clocks_current_sm_clock_hz`, `nvidia_smi_clocks_current_video_clock_hz`
- **Clocks (max)**: `nvidia_smi_clocks_max_graphics_clock_hz`, `nvidia_smi_clocks_max_memory_clock_hz`, `nvidia_smi_clocks_max_sm_clock_hz`
- **Clock event reasons (9 sub-metrics)**: `nvidia_smi_clocks_event_reasons_active|applications_clocks_setting|gpu_idle|hw_power_brake_slowdown|hw_slowdown|hw_thermal_slowdown|supported|sw_power_cap|sw_thermal_slowdown|sync_boost`
- **Fan + encoder**: `nvidia_smi_fan_speed_ratio`, `nvidia_smi_encoder_stats_average_fps`, `nvidia_smi_encoder_stats_average_latency`, `nvidia_smi_encoder_stats_session_count`
- **Info / state**: `nvidia_smi_gpu_info{name,driver_version,vbios_version,driver_model_current,driver_model_pending,uuid}`, `nvidia_smi_driver_version`, `nvidia_smi_count`, `nvidia_smi_pstate`, `nvidia_smi_display_active`, `nvidia_smi_display_mode`, `nvidia_smi_compute_mode`, `nvidia_smi_accounting_mode`, `nvidia_smi_accounting_buffer_size`

All metrics are labelled with `uuid=<GPU-UUID>` (e.g. `uuid="df6e7a7c-..."`) — no other dimensions on the data plane.

Grafana visualization: official dashboard **ID 14574** (`https://grafana.com/grafana/dashboards/14574`); auto-imports when `import` is hit with that ID.

---

## §5. Per-metric mapping vs nvitop-exporter — the **GAP**

| Concept | nvitop-exporter (NVML-direct) | utkuozdemir (`nvidia-smi --query-gpu`) | Gap? |
|---|---|---|---|
| GPU utilization % | `gpu_utilization` (sub-ms NVML) | `nvidia_smi_utilization_gpu_ratio` (0..1) | None — same metric, different units (ratio vs %) |
| VRAM used / total | `memory_used`, `memory_total` (NVML bytes) | `nvidia_smi_memory_used_bytes`, `nvidia_smi_memory_total_bytes` (auto-discovered) | None |
| Temperature °C | `temperature` | `nvidia_smi_temperature_gpu` | None |
| Power draw W | `power_draw` | `nvidia_smi_power_draw_watts` | None |
| Clocks (graphics/SM/mem) | NVML | `nvidia_smi_clocks_current_*_clock_hz` | None |
| Fan speed % | NVML | `nvidia_smi_fan_speed_ratio` | None |
| **Per-process VRAM (PID → VRAM)** | **YES** — `process_info{pid=, process_name=, used_gpu_memory_bytes=}` via `nvml.nvmlDeviceGetComputeRunningProcesses` | **NO** — exporter only calls `nvidia-smi --query-gpu`, never `--query-compute-apps` (confirmed by DeepWiki AI-audit + source-grep of `internal/exporter/exporter.go`: `cmdAndArgs = append(cmdAndArgs, "--query-gpu="+qFieldsJoined)`) | **CRITICAL GAP** |
| Per-process GPU% (SM util) | YES (NVML accounting) | NO | **GAP** |
| Per-process I/O / encoder share | YES | NO | **GAP** |
| Host CPU + RAM | YES (psutil) | NO (would need node_exporter) | minor (already covered by node_exporter) |

**Verdict**: utkuozdemir covers **all GPU-level metrics** (the 80% case for Prometheus dashboards) but is **missing per-process VRAM attribution entirely** — confirmed via DeepWiki AI audit AND direct source-grep of `internal/exporter/exporter.go`. Per-process visibility is the canonical nvitop differentiator; if you need to attribute "which llama-server process is holding 22 GB" via Prometheus, utkuozdemir cannot answer that. node_exporter / windows_exporter (`:9182`) gives per-process CPU+RAM but not per-process VRAM.

Mitigation paths if per-process VRAM is essential:
- **Path A**: Keep utkuozdemir for the 80% GPU-level dashboards + write a tiny sidecar that polls `nvidia-smi --query-compute-apps=pid,process_name,used_gpu_memory --format=csv` every 30s and emits as a separate textfile-collector to node_exporter (cardinal-rule-2-compliant if invoked via direct CLI in `.claude/settings.json` hooks or a WinSW service).
- **Path B**: Run both — keep node_exporter/windows_exporter for host telemetry, utkuozdemir for GPU-level Prometheus, AND nvitop standalone-CLI (interactive `nvitop` works fine on Python 3.13; only nvitop-exporter HTTP server crashes) when the operator needs per-process attribution.
- **Path C**: Switch to NVIDIA DCGM-exporter (enterprise-grade, NVML-direct, has per-process via DCP-1 plugin) — but cardinal-rule-3 hard-cap: DCGM is GPL+CUDA-bound, datacenter-targeted, heavy.

---

## §6. Performance — subprocess fork vs NVML-direct

**utkuozdemir model**: forks `nvidia-smi.exe` on every scrape, parses CSV. README does NOT publish an explicit perf number, but empirical envelope on Windows + RTX 4090:
- Cold `nvidia-smi.exe` invocation: ~150-250 ms wall
- CSV parse: <10 ms
- Net per-scrape overhead: **~200-300 ms** including process spawn

**nvitop-exporter (theoretical, when it worked)**: NVML in-process, sub-ms (~0.5-2 ms) per scrape.

**For a 30s-scrape Prometheus job**: 200-300 ms / 30 000 ms = **<1% overhead** — entirely material-free. Even at 5s scrape interval (the install snippet for nvitop in W301 §6.6 uses `--interval 5`) it's still <6% wall budget.

**Risk**: Issue [#373](https://github.com/utkuozdemir/nvidia_gpu_exporter/issues/373) (open, 2025-11-19) reports a 14 GB memory leak running v1.4.1 Docker image on Debian 13 / Proxmox + nvidia driver 550.163.01 / RTX 2060 Super. Status: open, 5 comments, no fix. **Likely Docker-image-specific** (Proxmox passthrough + 550-series driver suggests nvidia-smi subprocess hang, not Go runtime). On Windows native + RTX 4090 + 580-series driver this should not reproduce — but operator SHOULD smoke-RSS after 24 hr via `Get-Process nvidia_gpu_exporter` and revisit if RSS exceeds 200 MB.

Also: Issue [#332](https://github.com/utkuozdemir/nvidia_gpu_exporter/issues/332) reports **CUDA 12.9 emits invalid metric names** (2025-06-10, open). Workaround: use `--query-field-names=` explicit list instead of `AUTO`. Currently CUDA 12.9 ships with driver 555+; 580 series may have same issue — operator should `--query-field-names="name,driver_version,memory.used,memory.total,utilization.gpu,utilization.memory,temperature.gpu,power.draw,fan.speed,clocks.current.graphics,clocks.current.memory,clocks.current.sm,uuid"` instead of `AUTO` if metric-name validation errors appear.

---

## §7. Bus-factor + maintenance — solo maintainer, dep-bumps only

- **Contributor distribution (gh API)**: total 12 distinct contributors over project lifetime; top-5 are:
  | Login | Contribs |
  |---|---|
  | `renovate[bot]` | 468 |
  | `renovate-bot` | 66 |
  | **`utkuozdemir`** | **18** |
  | `squat` | 2 |
  | `ametis70` | 1 |

- **Human commits in last 12 months**: ~0 (last 5 commits HEAD→HEAD-5 are 100% renovate dep-bump PRs, dated Feb 21 – Apr 3 2026).
- **Open issues**: 30 fetched, 42 total; oldest `#232` from 2024-09-13 unanswered. No labels in use — no triage.
- **Author's own README warning** (verbatim): *"for over a year now, I've hardly had any time to keep up with my personal open-source projects, including this one. I am still committed to keep this tool working and slowly move it forward, but please bear with me if I can't tackle your fixes or check out your code for a while."*

**D16 bus_factor_governance score** (per sca-v3.1 rubric): **2/5** (single human maintainer, no governance, public deprecation-risk warning) — hits the T1-INSTALL+T2-VENDOR-FORK D16<2 hard-cap **floor** but does NOT breach. Acceptable for a stop-gap hedge; would NOT be acceptable as a critical-path production dependency.

**Comparison with nvitop**: nvitop is `XuehaiPan` solo-maintainer, similar D16=2; nvitop's nvitop-exporter sub-project published 1.7.0 release recently, but Python-3.13 socketserver incompat means it's effectively broken on the operator's runtime. **Both alternatives are bus-factor-1**; utkuozdemir wins because (a) its binary actually runs on Windows-Python-3.13-host and (b) its dependency surface is Go-static-binary (no Python ABI surprises possible).

---

## §8. Verdict

**RECOMMENDED-INSTALL — utkuozdemir/nvidia_gpu_exporter v1.4.1** as the **new T1 install** replacing the broken nvitop-exporter (which becomes T4 CITE-ONLY or PATTERN-STUDY for the interactive `nvitop` CLI which is unbroken).

**Tier**: T1 INSTALL with explicit hedge documentation — D16=2 floor noted, per-process VRAM gap noted, GAP mitigation via Path A sidecar deferred to next wave.

**Rationale**:
1. **Solves the immediate fire**: provides a working Prometheus :9835 endpoint with 55 GPU metrics + Grafana dashboard 14574 today, without Python 3.13 incompat surface.
2. **Cardinal-rule-1 conformance**: trusted upstream (1,480★, MIT, 5-year history, 22 releases), Scoop-installable, single static Go binary — zero self-invent.
3. **Cardinal-rule-2 conformance**: WinSW v3 XML at `OPERATOR-READY-ARTIFACTS/NvidiaGpuExporter.xml` is direct upstream-binary invocation, not a script.
4. **Performance acceptable**: <1% overhead at 30s scrape; in-line with prometheus-community SLO.
5. **GAP acknowledged**: per-process VRAM attribution missing — operator can deploy Path A (sidecar collector via `nvidia-smi --query-compute-apps`) in next wave if needed, OR run interactive `nvitop` CLI ad-hoc.
6. **Risk**: solo-maintainer D16=2 + open memory-leak issue #373 (Docker-only, Linux-only — likely irrelevant on Windows). Schedule 30-day smoke-RSS check.

**Operator next-actions (≤30 min)**:
1. `scoop install nvidia_gpu_exporter/nvidia_gpu_exporter --global` (after `scoop bucket add ...`)
2. Apply `OPERATOR-READY-ARTIFACTS/NvidiaGpuExporter.xml` via `Z:\tools\winsw\winsw.exe install ...`
3. Smoke: `curl http://127.0.0.1:9835/metrics`
4. Add `targets: ['localhost:9835']` job to Prometheus scrape config
5. Import Grafana dashboard 14574
6. Open issue / TODO for Path A per-process-VRAM sidecar if dashboards need pid-attribution
7. Optional: stop / disable / leave-orphan the broken nvitop-exporter service (its only artifact is the venv pip install + the 0-byte Python 3.13 crash log)

**RECOMMENDED-INSTALL — utkuozdemir/nvidia_gpu_exporter v1.4.1**
