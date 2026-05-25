"""W376 SandboxSlotSemaphore — host CPU/RAM-aware spawn backpressure (Path B).

Cite: spec §5.9 (codex r1 D4 P3 P0) + plan Task 21 + codex r2 D3-r2-P0-1
(SandboxCapacityExceeded MUST be retryable, not terminal).

Problem (codex r1 D4 P3 P0): the worker configures `max_concurrent_activities=8`,
`mem_limit=2g`, and `nano_cpus=2` per container, but has no *host* capacity model.
On a small host, 8 concurrent 2g/2-core containers can over-subscribe RAM/CPU and
thrash. This semaphore is acquired BEFORE `spawn_agent_server` and denies the spawn
when the next container would push usage past the host headroom budget.

Backpressure contract: `acquire()` raises
`ApplicationError(type="SandboxCapacityExceeded", non_retryable=False)` so the
Temporal retry policy backs off (initial_interval=2s * backoff^n) and re-attempts
once the host frees capacity — a capacity *bounce*, never a terminal failure.
`release()` is idempotent and floors `_active` at 0.

Budget formula (per spec §5.9):
    mem_budget = available_RAM_gb * (1 - headroom_pct)
    cpu_budget = physical_cpu_cores * (1 - headroom_pct)
A spawn is DENIED when either `(_active + 1) * per_container_*` exceeds its budget.
"""

from __future__ import annotations

import asyncio

import psutil
from temporalio.exceptions import ApplicationError


class SandboxSlotSemaphore:
    """Enforce host-capacity backpressure: deny spawn if remaining headroom < per-container budget.

    Args:
        mem_per_container_gb: RAM reserved per agent-server container (default 2.0g,
            matches Docker `mem_limit=2g`).
        cpu_per_container: physical CPU cores reserved per container (default 2.0,
            matches Docker `nano_cpus=2`).
        headroom_pct: fraction of host RAM/CPU held back as safety margin (default
            0.20 → use at most 80% of available capacity).

    The `_active` counter tracks currently-held slots. It is mutated only under
    `_lock` (an `asyncio.Lock`), so concurrent `acquire`/`release` calls on the same
    event loop serialize and the capacity check is race-free.
    """

    def __init__(
        self,
        mem_per_container_gb: float = 2.0,
        cpu_per_container: float = 2.0,
        headroom_pct: float = 0.20,
    ) -> None:
        self.mem_per_container_gb = mem_per_container_gb
        self.cpu_per_container = cpu_per_container
        self.headroom_pct = headroom_pct
        self._active = 0
        self._lock = asyncio.Lock()

    async def acquire(self) -> None:
        """Reserve one sandbox slot, or raise a retryable SandboxCapacityExceeded.

        Reads live host RAM (`psutil.virtual_memory().available`) and physical CPU
        cores (`psutil.cpu_count(logical=False)`), computes the headroom-adjusted
        budgets, and DENIES the spawn if admitting one more container would exceed
        either budget. On admit, increments `_active`.

        Raises:
            ApplicationError: type="SandboxCapacityExceeded", non_retryable=False —
                the host is over capacity; the caller should back off and retry.
        """
        async with self._lock:
            mem_avail_gb = psutil.virtual_memory().available / 1e9
            cpu_count = psutil.cpu_count(logical=False)
            mem_budget = mem_avail_gb * (1.0 - self.headroom_pct)
            cpu_budget = cpu_count * (1.0 - self.headroom_pct)
            if (self._active + 1) * self.mem_per_container_gb > mem_budget:
                raise ApplicationError(
                    f"SandboxCapacityExceeded: mem "
                    f"{(self._active + 1) * self.mem_per_container_gb}g "
                    f"> budget {mem_budget:.1f}g",
                    type="SandboxCapacityExceeded",
                    non_retryable=False,  # retryable — host may free memory
                )
            if (self._active + 1) * self.cpu_per_container > cpu_budget:
                raise ApplicationError(
                    f"SandboxCapacityExceeded: cpu "
                    f"{(self._active + 1) * self.cpu_per_container} "
                    f"> budget {cpu_budget:.1f}",
                    type="SandboxCapacityExceeded",
                    non_retryable=False,  # retryable — host may free CPU
                )
            self._active += 1

    async def release(self) -> None:
        """Release one sandbox slot; idempotent and floored at 0.

        Safe to call even if no slot was acquired (e.g. spawn failed after a
        denied acquire) — `_active` never goes negative.
        """
        async with self._lock:
            self._active = max(0, self._active - 1)
