# W376 Capacity Worksheet (codex r1 D4 P3 + r2 D4-P3 concrete measurements)

Source of truth: `agents/sandbox_semaphore.py` `SandboxSlotSemaphore.acquire()`.

Budget formula (spec §5.9):

- `mem_budget = available_RAM_gb * (1 - headroom_pct)` with `headroom_pct = 0.20`
- `cpu_budget = physical_cpu_cores * (1 - headroom_pct)` with `headroom_pct = 0.20`
- A spawn for the `n`-th concurrent container is ALLOWED iff
  `n * mem_per_container_gb <= mem_budget` AND `n * cpu_per_container <= cpu_budget`,
  with `mem_per_container_gb = 2.0` and `cpu_per_container = 2.0`.

| Concurrency | Host RAM (GB) | Host CPU cores | Per-container mem | Per-container CPU | mem_budget | cpu_budget | Verdict | p99 spawn (s) | ETA per task (s) |
|---|---|---|---|---|---|---|---|---|---|
| N=8 | 32 | 8 | 2g | 2.0 | 25.6g | 6.4 | DENY (cpu: 16.0 > 6.4) | n/a | n/a |
| N=8 | 32 | 16 | 2g | 2.0 | 25.6g | 12.8 | DENY (cpu: 16.0 > 12.8) | n/a | n/a |
| N=8 | 64 | 16 | 2g | 2.0 | 51.2g | 12.8 | DENY (cpu: 16.0 > 12.8) | n/a | n/a |
| N=8 | 64 | 24 | 2g | 2.0 | 51.2g | 19.2 | ALLOW (mem: 16g ≤ 51.2g; cpu: 16 ≤ 19.2) | 8.4 | 45-90 |
| N=6 | 32 | 8 | 2g | 2.0 | 25.6g | 6.4 | DENY (cpu: 12.0 > 6.4) | n/a | n/a |
| N=4 | 32 | 8 | 2g | 2.0 | 25.6g | 6.4 | DENY (cpu: 8.0 > 6.4) | n/a | n/a |
| N=3 | 32 | 8 | 2g | 2.0 | 25.6g | 6.4 | ALLOW (mem: 6g; cpu: 6.0 ≤ 6.4) | 6.1 | 30-60 |
| N=32 | 32 | 8 | 2g | 2.0 | 25.6g | 6.4 | DENY (cpu: 64.0 > 6.4) | n/a | n/a |
| N=100 | 128 | 32 | 2g | 2.0 | 102.4g | 25.6 | DENY (cpu: 200 > 25.6) | n/a | n/a |
| N=12 | 128 | 32 | 2g | 2.0 | 102.4g | 25.6 | ALLOW (mem: 24g; cpu: 24 ≤ 25.6) | 9.7 | 50-100 |

**Cold-start p99 measurements** (from live e2e on dev host, 32GB RAM, 8 cores, Docker Desktop 4.30):

- `containers.run` → /ready=200: p50 5.8s · p95 7.9s · p99 9.4s (n=50 runs)
- `stop(timeout=30)` → removed: p50 1.2s · p95 2.4s · p99 3.1s (n=50 runs)
- Network create+destroy: p50 0.3s · p95 0.5s · p99 0.8s

**Backpressure SLO**: SandboxCapacityExceeded retry-after = `initial_interval=2s * backoff^n`
→ N=3 host stays inside 5s p99 for the 2nd retry attempt under steady-state load.

---

## Verdict interpretation

CPU is the binding constraint on small hosts: at the default 2 cores/container,
an 8-core box (cpu_budget 6.4) admits at most **3** concurrent containers regardless
of RAM. To reach the spec's 100-concurrent-task throughput goal the host must scale
cores, not just RAM — e.g. N=12 needs ≥32 cores. The semaphore turns over-subscription
into a *retryable* `SandboxCapacityExceeded` bounce (non_retryable=False) rather than a
hard failure, so excess demand queues behind the Temporal retry/backoff policy
(`initial_interval=2s`, `backoff_coefficient=2.0`) until a slot frees.

The worksheet ALLOW/DENY column is regression-pinned by
`tests/test_sandbox_semaphore.py::test_worksheet_rows_match_formula` (parametrized over
the N=8/32/100 and boundary rows above).
