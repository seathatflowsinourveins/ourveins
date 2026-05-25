# W267 — VRAM Saturation Backpressure Alert Wiring (2026-05-17)

> **Status**: SHIPPED. Wired autonomously per codex GPT-5.5's #1 unattended risk (live measured 95.3% VRAM on 4090 24 GiB at task start). All deliverables live in production Prometheus + Grafana stack.

## What landed

### 1. nvidia_gpu_exporter container (utkuozdemir, v1.4.1)

- **Image**: `utkuozdemir/nvidia_gpu_exporter:1.4.1` (v1.2.0 from the brief panicked on modern driver — invalid metric name `nvidia_smi_clocks_event_reasons_counters_sw_power_cap [us]`; v1.4.1 fixed the sanitization).
- **Container**: `nvidia-gpu-exporter`, `--gpus all`, network `observability_observability`, port `127.0.0.1:9835:9835`, `--restart unless-stopped`.
- **Live metrics**: `nvidia_smi_memory_used_bytes=24,595,398,656` / `nvidia_smi_memory_total_bytes=25,757,220,864` = 95.4% at landing.

### 2. Prometheus scrape job

File: `Z:\claude\observability\config\prometheus.yml` — added `nvidia-gpu` job (30s interval, target `nvidia-gpu-exporter:9835`, labels `service=gpu`, `gpu_model=rtx4090`). Prometheus reloaded via `docker restart prometheus`; target health = `up`, value `1`.

### 3. Prometheus alert rules

File: `Z:\claude\observability\prometheus\rules\w267-vram-alerts.yml` — 4 rules, all loaded and evaluating:

| Alert | Expr | For | Severity |
|---|---|---|---|
| `GpuVramSaturated` | `nvidia_smi_memory_used_bytes / nvidia_smi_memory_total_bytes > 0.96` | 30s | warning |
| `GpuVramCritical` | same ratio `> 0.99` | 15s | critical |
| `GpuExporterDown` | `up{job="nvidia-gpu"} == 0` | 2m | warning |
| `HindsightLlmStalledWithBacklog` | `rate(hindsight_llm_calls_total[5m]) == 0 AND hindsight_queue_backlog > 100` | 5m | warning |

Channel label `channel: default` on the VRAM + hindsight rules so any AlertManager default route picks them up. Current VRAM ratio 95.4% (just below the 96% threshold by design — 96% is the actionable point where CUDA OOM becomes imminent, not the steady-state level the operator already accepts).

### 4. Grafana dashboard

- **UID**: `w267-vram-monitor`
- **URL**: http://127.0.0.1:3001/d/w267-vram-monitor/w267-vram-saturation-monitor
- **Panels**: (1) time-series `nvidia_smi_memory_used_bytes` + `nvidia_smi_memory_total_bytes` over last 1h with yellow/red thresholds at 22 GB / 24.8 GB; (2) stat panel showing live VRAM utilization % with background colormode.
- Imported via Grafana API `POST /api/dashboards/db`, response `status: success`.

## Hindsight backpressure rationale

`hindsight_llm_calls_total` rate=0 in isolation just means quiet hindsight, but combined with `hindsight_queue_backlog > 100` it's a saturation signature: items are arriving (backlog growing) but no LLM call is succeeding — most likely root cause is the VRAM saturation upstream (Ollama/llama.cpp can't load), Ollama hung, or LLM provider down. The annotation cross-references `GpuVramSaturated` for triage.

## Operator-coordinated steps

None required — Docker exporter install proceeded autonomously without operator approval prompt. The fallback PowerShell textfile-exporter path was not needed and was not created.

## Files touched

- `Z:\claude\observability\config\prometheus.yml` — added `nvidia-gpu` job (edit).
- `Z:\claude\observability\prometheus\rules\w267-vram-alerts.yml` — 4 alert rules (new).
- `Z:\claude-sota-installed\tmp\w267-dashboard.json` — dashboard payload (kept for re-import / version control).

## Verification commands

```bash
curl -s http://127.0.0.1:19090/api/v1/query?query=up{job=\"nvidia-gpu\"}
curl -s http://127.0.0.1:19090/api/v1/rules | grep GpuVramSaturated
curl -s http://127.0.0.1:9835/metrics | grep nvidia_smi_memory_used_bytes
docker ps --filter name=nvidia-gpu-exporter
```
