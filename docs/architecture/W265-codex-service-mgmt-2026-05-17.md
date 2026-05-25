---
date: 2026-05-17
author: codex-gpt-5.5-adversarial
word_count_estimate: 459
---

## 1. Heterogeneous Mix Verdict

[OBSERVED] The estate uses NSSM, Docker Desktop, Windows SCM, a plugin hook, and embedded pg0. Acceptable as transition; unacceptable as target. Four lifecycle models mean four restart policies, log paths, env injection paths, health semantics, and upgrade procedures. NSSM is valid because its docs cover restart behavior and stdout/stderr redirection (<https://www.nssm.cc/usage>), but validity is not standardization.

## 2. Consolidation Target

Recommendation: consolidate to a two-platform split. Use Windows service wrappers for latency-sensitive or host-bound services; use OCI Compose for CPU/network services where reproducibility matters. Single-platform Docker is rejected because Docker Desktop is under the Subscription Service Agreement and needs paid subscription outside free categories (<https://docs.docker.com/subscription/desktop-license/>). Single-platform NSSM/WinSW is rejected because it discards OCI portability. Podman is license-attractive, but Windows still uses WSL or Hyper-V machines (<https://podman.io/docs/installation>), so the VM boundary remains.

## 3. GPU Services

Keep the 35B LLM and embedder native Windows services for now. Move from NSSM to WinSW only if wrapper standardization justifies migration. [HYPOTHESIS] Native Windows should have less scheduling, filesystem, and networking indirection than Docker Desktop over WSL2 for inference. Microsoft documents CUDA in WSL with ML frameworks and NVIDIA Docker (<https://learn.microsoft.com/windows/ai/directml/gpu-cuda-in-wsl>); NVIDIA documents CUDA-on-WSL (<https://developer.nvidia.com/cuda/wsl>). Containerizing is feasible, not optimal, until p50/p95 token latency, cold start, VRAM visibility, and model-load tests prove parity.

## 4. Python MCP Daemons

For Hindsight and cognee, NSSM is serviceable but not optimal. Standardize Python MCP daemons on WinSW unless Docker packaging already exists and the daemon is not host-path sensitive. WinSW’s repo describes it as a wrapper for running executables as Windows services and states MIT licensing (<https://github.com/winsw/winsw>). Compared with plugin SessionStart, a real Windows service gives explicit boot, restart, account, logs, and failure visibility. Hooks should trigger client-local behavior, not own daemon lifetime.

## 5. Non-Obvious Risks

The hidden risk is inconsistent authority. A service can look healthy in one supervisor while its dependency is dead in another. Z: portability is fragile when WSL-backed Docker/Podman crosses Windows/Linux path semantics. GPU availability can differ across native, WSL, and container contexts. Docker Desktop licensing can become a governance defect even on a working solo box. Plugin-managed daemons couple availability to Claude Code startup rather than machine startup. Backup/restore and incident response degrade when logs, env vars, secrets, volumes, and restart policies live in unrelated control planes.

| service-class | current | recommended | rationale |
|---|---|---|---|
| GPU LLM/embedder | NSSM | Native Windows service | Avoid VM/WSL indirection unless benchmarks prove parity |
| Python MCP daemons | NSSM/plugin | WinSW service | Explicit lifecycle, logs, restart, MIT wrapper |
| OCI-friendly CPU/network apps | Docker Desktop | Compose, with license review; consider Podman only after Windows tests | Portability where VM boundary is harmless |
| Ollama | Windows SCM | Leave SCM | Already native service authority |
| Embedded pg0 | Embedded | Promote only if shared/critical | Avoid hidden dependency if it becomes operational state |
